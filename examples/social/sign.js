var sign = {};
var gun = require('../../test/shotgun');

sign.user = {}
sign.user.create = function(form, cb, shell){ // TODO: REDO THIS TO MATCH GUN
	sign.crypto(form, function(err, user){
		if(err || !user){ return cb(err) }
		user = {key: user.key, salt: user.salt};
		user.account = {email: form.email, registered: new Date().getTime()};
		gun.set(user).key('email/' + user.account.email);
		cb(null, user);
	});
};

/*
gun.load('email/mark@accelsor.com')
	.path('friends')
	.match({name: "David Oliveros"})
	.path('friends')
	.match({activity: 'surfer'})
	.get(function(surfer){
		sendEmail("Mark wants to leanr how ot surf, and you are a friend of a friend");
	});
*/
	
sign.server = function(req, res){
	console.log("sign.server", req.headers, req.body);
	/*res.emit('data', {ok: 1});
	res.emit('data', {ok: 2});
	res.emit('data', {ok: 3});
	res.emit('data', {ok: 4});
	setTimeout(function(){
		res.emit('end', {ok: 5});
	}, 5000);
	return;*/
	if(!req.body || !req.body.email){ return res.emit('end', {err: "That email does not exist."}) }
	var user = gun.load('email/' + req.body.email, function(data){ // this callback is called the magazine, since it holds the clip
		console.log("data from key", data);
		if(!req.body.password){
			return res.emit('end', {ok: 'sign in'});
		}
		crypto({password: req.body.password, salt: data.salt }, function(error, valid){
			if(error){ return res.emit('end', {err: "Something went wrong! Try again."}) }
			if(data.key === valid.key){ // authorized
				return res.emit('end', {ok: 'Signed in!'});
			} else { // unauthorized
				return res.emit('end', {err: "Wrong password."});
			}
		});
	}).blank(function(){
		if(!req.body.password){
			return res.emit('end', {ok: 'sign up'});
		}
		return sign.user.create(req.body, function(err, user){
			if(err || !user){ return res.emit('end', {err: "Something went wrong, please try again."}) }
			console.log('yay we made the user', user);
			res.emit('end', {err: "Registered!"});
		}, user);
	});
}

;var crypto = function(context, callback, option){
	option = option || {};
	option.hash = option.hash || 'sha1';
	option.strength = option.strength || 10000;
	option.crypto = option.crypto || require('crypto');
	if(!context.password){
		option.crypto.randomBytes(8,function(error, buffer){
			if(error){ return callback(error) } 
			context.pass = buffer.toString('base64');
			crypto(context, callback);
		}); return callback;
	}
	if(!context.salt){
		option.crypto.randomBytes(64, function(error, buffer){
			if(error){ return callback(error) }
			context.salt = buffer.toString('base64');
			crypto(context, callback);
		}); 
		return callback;
	} 
	option.crypto.pbkdf2(context.password, context.salt, option.strength, context.salt.length, function(error, buffer){
		if(!buffer || error){ return callback(error) }
		delete context.password;
		context.key = buffer.toString('base64');
		callback(null, context);
	}); 
	return callback;
};
sign.crypto = crypto;

module.exports = sign;