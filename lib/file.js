// This was written by the wonderful Forrest Tait
// modified by Mark to be part of core for convenience
// twas not designed for production use
// only simple local development.
var Gun = require('../gun'),
<<<<<<< HEAD
		file = {};
=======
fs = require('fs');

Gun.on('opt', function(ctx){
	this.to.next(ctx);
	var opt = ctx.opt;
	if(ctx.once){ return }
	if(process.env.AWS_S3_BUCKET){ return }
	opt.file = String(opt.file || 'data.json');
	var graph = ctx.graph, acks = {}, count = 0, to;
	var disk = Gun.obj.ify((fs.existsSync || require('path').existsSync)(opt.file)? 
		fs.readFileSync(opt.file).toString()
	: null) || {};

	Gun.log.once(
		'file-warning',
		'WARNING! This `file.js` module for gun is ' +
		'intended for local development testing only!'
	);
	
	ctx.on('put', function(at){
		this.to.next(at);
		Gun.graph.is(at.put, null, map);
		if(!at['@']){ acks[at['#']] = true; } // only ack non-acks.
		count += 1;
		if(count >= (opt.batch || 10000)){
			return flush();
		}
		if(to){ return }
		to = setTimeout(flush, opt.wait || 1);
	});

	ctx.on('get', function(at){
		this.to.next(at);
		var lex = at.get, soul, data, opt, u;
		//setTimeout(function(){
		if(!lex || !(soul = lex[Gun._.soul])){ return }
		//if(0 >= at.cap){ return }
		if(Gun.obj.is(soul)){ return match(at) }
		var field = lex['.'];
		data = disk[soul] || u;
		if(data && field){
			data = Gun.state.to(data, field);
		}
		ctx.on('in', {'@': at['#'], put: Gun.graph.node(data)});
		//},11);
	});
>>>>>>> 95280b8... v0.9.x ! Try S3 again?

Gun.on('opt').event(function(gun, opts) {
	if ((opts.file === false) || (opts.s3 && opts.s3.key)) {
		return; // don't use this plugin if S3 is being used.
	}
	console.log("WARNING! This `file.js` module for gun is intended only for local development testing!")
	opts.file = opts.file || 'data.json';
	var fs = require('fs');
	file.raw = file.raw || (fs.existsSync || require('path').existsSync)(opts.file) ? fs.readFileSync(opts.file).toString() : null;
	var all = file.all = file.all || Gun.obj.ify(file.raw || {
		nodes: {},
		keys: {}
	});
	all.keys = all.keys || {};
	all.nodes = all.nodes || {};

	// queue writes, adapted from https://github.com/toolness/jsondown/blob/master/jsondown.js
	var isWriting = false, queuedWrites = [];
	function writeFile(cb) {
		if(isWriting) return queuedWrites.push(cb);
		isWriting = true;
		var contents = JSON.stringify(all, null, 2);
		fs.writeFile(opts.file, contents, function(err) {
			var batch = queuedWrites.splice(0);
			isWriting = false;
			cb(err);
			if(batch.length)
				writeFile( function(err) {
					batch.forEach( function(cb) { cb(err); } )
		    });
		});
  }

	gun.opt({hooks: {
		get: function get(key, cb, o){
			var graph, soul;
			if(soul = Gun.is.soul(key)){
				if(all.nodes[soul]){
					(graph = {})[soul] = all.nodes[soul];
					cb(null, graph);
					(graph = {})[soul] = Gun.union.pseudo(soul);
					cb(null, graph); // end.
				}
				return;
			}
			Gun.obj.map(all.keys[key], function(rel){
				if(Gun.is.soul(rel)){ get(soul = rel, cb, o) }
			});
			return soul? cb(null, {}) : cb(null, null);
		},
		put: function(graph, cb, o){
			for (key in gun.__.graph) all.nodes[key]=gun.__.graph[key];
			writeFile(cb);
		},
		key: function(key, soul, cb, o){
			var meta = {};
			meta[Gun._.soul] = soul = Gun.is.soul(soul) || soul;
			((all.keys = all.keys || {})[key] = all.keys[key] || {})[soul] = meta;
			writeFile(cb);
		},
		all: function(list, opt, cb) {
			opt = opt || {};
			opt.from = opt.from || '';
			opt.start = opt.from + (opt.start || '');
			if(opt.end){ opt.end = opt.from + opt.end }
			var match = {};
			cb = cb || function(){};
			Gun.obj.map(list, function(soul, key){
				var end = opt.end || key;
				if(key.indexOf(opt.from) === 0 && opt.start <= key && (key <= end || key.indexOf(end) === 0)){
					if(opt.upto){
						if(key.slice(opt.from.length).indexOf(opt.upto) === -1){
							yes(soul, key);
						}
					} else {
						yes(soul, key);
					}
				}
			});
			function yes(soul, key){
				cb(key);
				match[key] = {};
				match[key][Gun._.soul] = soul;
			}
			return match;
		}
	}}, true);
	gun.all = gun.all || function(url, cb) {
		url = require('url').parse(url, true);
		var r = gun.__.opt.hooks.all(all.keys, {
				from: url.pathname,
				upto: url.query['*'],
				start: url.query['*>'],
				end: url.query['*<']
		});
		console.log("All please", url.pathname, url.query['*'], r);
		cb = cb || function() {};
		cb(null, r);
	}
});
