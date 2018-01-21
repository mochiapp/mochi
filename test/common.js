(function(env){
	root = env.window? env.window : root;
	env.window && root.localStorage && root.localStorage.clear();
	root.Gun = root.Gun || require('../gun');
}(this));
Gun.log.squelch = true;

describe('Gun', function(){
	var t = {};
	
	describe('Utility', function(){
		var u;
		/* // causes logger to no longer log.
		it('verbose console.log debugging', function(done) {

			var gun = Gun();
			var log = root.console.log, counter = 1;
			root.console.log = function(a,b,c){
				--counter;
				//log(a,b,c);
			}
			Gun.log.verbose = true;
			gun.put('bar', function(err, yay){ // intentionally trigger an error that will get logged.
				expect(counter).to.be(0);

				Gun.log.verbose = false;
				gun.put('bar', function(err, yay){ // intentionally trigger an error that will get logged.
					expect(counter).to.be(0);

					root.console.log = log;
					done();
				});
			});
		});
		*/

		describe('Type Check', function(){
			it('binary', function(){
				expect(Gun.bi.is(false)).to.be(true);
				expect(Gun.bi.is(true)).to.be(true);
				expect(Gun.bi.is(u)).to.be(false);
				expect(Gun.bi.is(null)).to.be(false);
				expect(Gun.bi.is('')).to.be(false);
				expect(Gun.bi.is('a')).to.be(false);
				expect(Gun.bi.is(0)).to.be(false);
				expect(Gun.bi.is(1)).to.be(false);
				expect(Gun.bi.is([])).to.be(false);
				expect(Gun.bi.is([1])).to.be(false);
				expect(Gun.bi.is({})).to.be(false);
				expect(Gun.bi.is({a:1})).to.be(false);
				expect(Gun.bi.is(function(){})).to.be(false);
			});
			it('number',function(){
				expect(Gun.num.is(0)).to.be(true);
				expect(Gun.num.is(1)).to.be(true);
				expect(Gun.num.is(Infinity)).to.be(true);
				expect(Gun.num.is(u)).to.be(false);
				expect(Gun.num.is(null)).to.be(false);
				expect(Gun.num.is(NaN)).to.be(false);
				expect(Gun.num.is('')).to.be(false);
				expect(Gun.num.is('a')).to.be(false);
				expect(Gun.num.is([])).to.be(false);
				expect(Gun.num.is([1])).to.be(false);
				expect(Gun.num.is({})).to.be(false);
				expect(Gun.num.is({a:1})).to.be(false);
				expect(Gun.num.is(false)).to.be(false);
				expect(Gun.num.is(true)).to.be(false);
				expect(Gun.num.is(function(){})).to.be(false);
			});
			it('text',function(){
				expect(Gun.text.is('')).to.be(true);
				expect(Gun.text.is('a')).to.be(true);
				expect(Gun.text.is(u)).to.be(false);
				expect(Gun.text.is(null)).to.be(false);
				expect(Gun.text.is(false)).to.be(false);
				expect(Gun.text.is(true)).to.be(false);
				expect(Gun.text.is(0)).to.be(false);
				expect(Gun.text.is(1)).to.be(false);
				expect(Gun.text.is([])).to.be(false);
				expect(Gun.text.is([1])).to.be(false);
				expect(Gun.text.is({})).to.be(false);
				expect(Gun.text.is({a:1})).to.be(false);
				expect(Gun.text.is(function(){})).to.be(false);
			});
			it('list',function(){
				expect(Gun.list.is([])).to.be(true);
				expect(Gun.list.is([1])).to.be(true);
				expect(Gun.list.is(u)).to.be(false);
				expect(Gun.list.is(null)).to.be(false);
				expect(Gun.list.is(0)).to.be(false);
				expect(Gun.list.is(1)).to.be(false);
				expect(Gun.list.is('')).to.be(false);
				expect(Gun.list.is('a')).to.be(false);
				expect(Gun.list.is({})).to.be(false);
				expect(Gun.list.is({a:1})).to.be(false);
				expect(Gun.list.is(false)).to.be(false);
				expect(Gun.list.is(true)).to.be(false);
				expect(Gun.list.is(function(){})).to.be(false);
			});
			it('obj',function(){
				expect(Gun.obj.is({})).to.be(true);
				expect(Gun.obj.is({a:1})).to.be(true);
				expect(Gun.obj.is(u)).to.be(false);
				expect(Gun.obj.is(null)).to.be(false);
				expect(Gun.obj.is(0)).to.be(false);
				expect(Gun.obj.is(1)).to.be(false);
				expect(Gun.obj.is('')).to.be(false);
				expect(Gun.obj.is('a')).to.be(false);
				expect(Gun.obj.is([])).to.be(false);
				expect(Gun.obj.is([1])).to.be(false);
				expect(Gun.obj.is(false)).to.be(false);
				expect(Gun.obj.is(true)).to.be(false);
				expect(Gun.obj.is(function(){})).to.be(false);
			});
			it('fns',function(){
				expect(Gun.fns.is(function(){})).to.be(true);
				expect(Gun.fns.is(u)).to.be(false);
				expect(Gun.fns.is(null)).to.be(false);
				expect(Gun.fns.is('')).to.be(false);
				expect(Gun.fns.is('a')).to.be(false);
				expect(Gun.fns.is(0)).to.be(false);
				expect(Gun.fns.is(1)).to.be(false);
				expect(Gun.fns.is([])).to.be(false);
				expect(Gun.fns.is([1])).to.be(false);
				expect(Gun.fns.is({})).to.be(false);
				expect(Gun.fns.is({a:1})).to.be(false);
				expect(Gun.fns.is(false)).to.be(false);
				expect(Gun.fns.is(true)).to.be(false);
			});
			it('time',function(){
				t.ts = Gun.time.is();
				expect(13 <= t.ts.toString().length).to.be.ok();
				expect(Gun.num.is(t.ts)).to.be.ok();
				expect(Gun.time.is(new Date())).to.be.ok();
			});
		});
		describe('Text', function(){
			it('ify',function(){
				expect(Gun.text.ify(0)).to.be('0');
				expect(Gun.text.ify(22)).to.be('22');
				expect(Gun.text.ify([true,33,'yay'])).to.be('[true,33,"yay"]');
				expect(Gun.text.ify({a:0,b:'1',c:[0,'1'],d:{e:'f'}})).to.be('{"a":0,"b":"1","c":[0,"1"],"d":{"e":"f"}}');
				expect(Gun.text.ify(false)).to.be('false');
				expect(Gun.text.ify(true)).to.be('true');
			});
			it('random',function(){
				expect(Gun.text.random().length).to.be(24);
				expect(Gun.text.random(11).length).to.be(11);
				expect(Gun.text.random(4).length).to.be(4);
				t.tr = Gun.text.random(2,'as'); expect((t.tr=='as'||t.tr=='aa'||t.tr=='sa'||t.tr=='ss')).to.be.ok();
			});
		});
		describe('List', function(){
			it('slit',function(){
				(function(){
					expect(Gun.list.slit.call(arguments, 0)).to.eql([1,2,3,'a','b','c']);
				}(1,2,3,'a','b','c'));
			});
			it('sort',function(){
				expect([{i:9},{i:4},{i:1},{i:-3},{i:0}].sort(Gun.list.sort('i'))).to.eql([{i:-3},{i:0},{i:1},{i:4},{i:9}]);
			});
			it('map',function(){
				expect(Gun.list.map([1,2,3,4,5],function(v,i,t){ t(v+=this.d); this.d=v; },{d:0})).to.eql([1,3,6,10,15]);
				expect(Gun.list.map([2,3,0,4],function(v,i,t){ if(!v){ return } t(v*=this.d); this.d=v; },{d:1})).to.eql([2,6,24]);
				expect(Gun.list.map([true,false,NaN,Infinity,'',9],function(v,i,t){ if(i===3){ return 0 }})).to.be(0);
			});
		});
		describe('Object', function(){
			it('del',function(){
				var obj = {a:1,b:2};
				Gun.obj.del(obj,'a');
				expect(obj).to.eql({b:2});
			});
			it('has',function(){
				var obj = {a:1,b:2};
				expect(Gun.obj.has(obj,'a')).to.be.ok();
			});			
			it('empty',function(){
				expect(Gun.obj.empty()).to.be(true);
				expect(Gun.obj.empty({a:false})).to.be(false);
				expect(Gun.obj.empty({a:false},'a')).to.be(true);
				expect(Gun.obj.empty({a:false},{a:1})).to.be(true);
				expect(Gun.obj.empty({a:false,b:1},'a')).to.be(false);
				expect(Gun.obj.empty({a:false,b:1},{a:1})).to.be(false);
				expect(Gun.obj.empty({1:1},'danger')).to.be(false);
			});
			it('copy',function(){
				var obj = {"a":false,"b":1,"c":"d","e":[0,1],"f":{"g":"h"}};
				var copy = Gun.obj.copy(obj);
				expect(copy).to.eql(obj);
				expect(copy).to.not.be(obj);
			});
			it('ify',function(){
				expect(Gun.obj.ify('[0,1]')).to.eql([0,1]);
				expect(Gun.obj.ify('{"a":false,"b":1,"c":"d","e":[0,1],"f":{"g":"h"}}')).to.eql({"a":false,"b":1,"c":"d","e":[0,1],"f":{"g":"h"}});
			});
			it('map',function(){
				expect(Gun.obj.map({a:'z',b:'y',c:'x'},function(v,i,t){ t(v,i) })).to.eql({x:'c',y:'b',z:'a'});
				expect(Gun.obj.map({a:'z',b:false,c:'x'},function(v,i,t){ if(!v){ return } t(i,v) })).to.eql({a:'z',c:'x'});
				expect(Gun.obj.map({a:'z',b:3,c:'x'},function(v,i,t){ if(v===3){ return 0 }})).to.be(0);
			});
		});
		describe('Functions', function(){
			it('sum',function(done){
				var obj = {a:2, b:2, c:3, d: 9};
				Gun.obj.map(obj, function(num, key){
					setTimeout(this.add(function(){
						this.done(null, num * num);
					}, key), parseInt((""+Math.random()).substring(2,5)));
				}, Gun.fns.sum(function(err, val){
					expect(val.a).to.eql(4);
					expect(val.b).to.eql(4);
					expect(val.c).to.eql(9);
					expect(val.d).to.eql(81);
					done();
				}));
			});
		});

		describe('Gun Safety', function(){
			var gun = Gun();
			it('is',function(){
				expect(Gun.is(gun)).to.be(true);
				expect(Gun.is(true)).to.be(false);
				expect(Gun.is(false)).to.be(false);
				expect(Gun.is(0)).to.be(false);
				expect(Gun.is(1)).to.be(false);
				expect(Gun.is('')).to.be(false);
				expect(Gun.is('a')).to.be(false);
				expect(Gun.is(Infinity)).to.be(false);
				expect(Gun.is(NaN)).to.be(false);
				expect(Gun.is([])).to.be(false);
				expect(Gun.is([1])).to.be(false);
				expect(Gun.is({})).to.be(false);
				expect(Gun.is({a:1})).to.be(false);
				expect(Gun.is(function(){})).to.be(false);
			});
			it('is value',function(){
				expect(Gun.is.value(false)).to.be(true);
				expect(Gun.is.value(true)).to.be(true);
				expect(Gun.is.value(0)).to.be(true);
				expect(Gun.is.value(1)).to.be(true);
				expect(Gun.is.value('')).to.be(true);
				expect(Gun.is.value('a')).to.be(true);
				expect(Gun.is.value({'#':'somesoulidhere'})).to.be('somesoulidhere');
				expect(Gun.is.value({'#':'somesoulidhere', and: 'nope'})).to.be(false);
				expect(Gun.is.value(Infinity)).to.be(false); // boohoo :(
				expect(Gun.is.value(NaN)).to.be(false);
				expect(Gun.is.value([])).to.be(false);
				expect(Gun.is.value([1])).to.be(false);
				expect(Gun.is.value({})).to.be(false);
				expect(Gun.is.value({a:1})).to.be(false);
				expect(Gun.is.value(function(){})).to.be(false);
			});
			it('is soul',function(){
				expect(Gun.is.soul({'#':'somesoulidhere'})).to.be('somesoulidhere');
				expect(Gun.is.soul({'#':'somethingelsehere'})).to.be('somethingelsehere');
				expect(Gun.is.soul({'#':'somesoulidhere', and: 'nope'})).to.be(false);
				expect(Gun.is.soul({or: 'nope', '#':'somesoulidhere'})).to.be(false);
				expect(Gun.is.soul(false)).to.be(false);
				expect(Gun.is.soul(true)).to.be(false);
				expect(Gun.is.soul('')).to.be(false);
				expect(Gun.is.soul('a')).to.be(false);
				expect(Gun.is.soul(0)).to.be(false);
				expect(Gun.is.soul(1)).to.be(false);
				expect(Gun.is.soul(Infinity)).to.be(false); // boohoo :(
				expect(Gun.is.soul(NaN)).to.be(false);
				expect(Gun.is.soul([])).to.be(false);
				expect(Gun.is.soul([1])).to.be(false);
				expect(Gun.is.soul({})).to.be(false);
				expect(Gun.is.soul({a:1})).to.be(false);
				expect(Gun.is.soul(function(){})).to.be(false);
			});
			it('is node',function(){
				expect(Gun.is.node({_:{'#':'somesoulidhere'}})).to.be(true);
				expect(Gun.is.node({_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}})).to.be(true);
				expect(Gun.is.node({_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}, g: Infinity})).to.be(false);
				expect(Gun.is.node({_:{'#':'somesoulidhere'}, a:0, b: 1, z: NaN, c: '', d: 'e'})).to.be(false);
				expect(Gun.is.node({_:{'#':'somesoulidhere'}, a:0, b: 1, y: {_: 'cool'}, c: '', d: 'e'})).to.be(false);
				expect(Gun.is.node({_:{'#':'somesoulidhere'}, a:0, b: 1, x: [], c: '', d: 'e'})).to.be(false);
				expect(Gun.is.node({})).to.be(false);
				expect(Gun.is.node({a:1})).to.be(false);
				expect(Gun.is.node({_:{}})).to.be(false);
				expect(Gun.is.node({_:{}, a:1})).to.be(false);
				expect(Gun.is.node({'#':'somesoulidhere'})).to.be(false);
			});
			it('is graph',function(){
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}}})).to.be(true);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(true);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(true);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}})).to.be(true);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}, foo: 1, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}, foo: {}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}, foo: {_:{'#':'FOO'}}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}}, foo: {_:{}}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: Infinity, c: '', d: 'e', f: {'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({'somesoulidhere': {_:{'#':'somesoulidhere'}, a:0, b: Infinity, c: '', d: 'e', f: {'#':'somethingelsehere'}}, 'somethingelsehere': {_:{'#':'somethingelsehere'}}})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}, a:0, b: 1, c: '', d: 'e', f: {'#':'somethingelsehere'}, g: Infinity})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}, a:0, b: 1, z: NaN, c: '', d: 'e'})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}, a:0, b: 1, y: {_: 'cool'}, c: '', d: 'e'})).to.be(false);
				expect(Gun.is.graph({_:{'#':'somesoulidhere'}, a:0, b: 1, x: [], c: '', d: 'e'})).to.be(false);
				expect(Gun.is.graph({})).to.be(false); // Empty graph is not a graph :(
				expect(Gun.is.graph({a:1})).to.be(false);
				expect(Gun.is.graph({_:{}})).to.be(false);
				expect(Gun.is.graph({_:{}, a:1})).to.be(false);
				expect(Gun.is.graph({'#':'somesoulidhere'})).to.be(false);
			});
		});
	});

	describe('ify', function(){
		var test, gun = Gun();
		
		it('null', function(done){
			Gun.ify(null)(function(err, ctx){
				expect(err).to.be.ok(); 
				done();
			});
		});
		
		it('basic', function(done){
			var data = {a: false, b: true, c: 0, d: 1, e: '', f: 'g', h: null};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.not.be.ok();
				expect(ctx.err).to.not.be.ok();
				expect(ctx.root).to.eql(data);
				expect(ctx.root === data).to.not.ok();
				done();
			});
		});
		
		it('basic soul', function(done){
			var data = {_: {'#': 'SOUL'}, a: false, b: true, c: 0, d: 1, e: '', f: 'g', h: null};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.not.be.ok();
				expect(ctx.err).to.not.be.ok();
				
				expect(ctx.root).to.eql(data);
				expect(ctx.root === data).to.not.be.ok();
				expect(Gun.is.soul.on(ctx.root) === Gun.is.soul.on(data));
				done();
			});
		});
		
		it('arrays', function(done){
			var data = {before: {path: 'kill'}, one: {two: {lol: 'troll', three: [9, 8, 7, 6, 5]}}};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.be.ok();
				expect(err.err.indexOf("one.two.three")).to.not.be(-1);
				done();
			});
		});
		
		it('undefined', function(done){
			var data = {z: undefined, x: 'bye'};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('NaN', function(done){
			var data = {a: NaN, b: 2};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('Infinity', function(done){ // SAD DAY PANDA BEAR :( :( :(... Mark wants Infinity. JSON won't allow.
			var data = {a: 1, b: Infinity};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('function', function(done){
			var data = {c: function(){}, d: 'hi'};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('extraneous', function(done){
			var data = {_: {'#': 'shhh', meta: {yay: 1}}, sneak: true};
			Gun.ify(data)(function(err, ctx){
				expect(err).to.not.be.ok(); // extraneous metadata needs to be stored, but it can't be used for data.
				done();
			});
		});
		
		return; // TODO! Fix GUN to handle this!
		data = {};
		data.sneak = false;
		data.both = {inside: 'meta data'};
		data._ = {'#': 'shhh', data: {yay: 1}, spin: data.both};
		test = Gun.ify(data);
		expect(test.err.meta).to.be.ok(); // TODO: Fail: this passes, somehow? Fix ify code!
	});
	
	describe('Event Promise Back In Time', function(){ return; // TODO: I think this can be removed entirely now.
		/*	
			var ref = gun.put({field: 'value'}).key('field/value').get('field/value', function(){
				expect()
			});
			setTimeout(function(){
				ref.get('field/value', function(){
					expect();
				});
			}, 50);
			
			A) Synchronous
				1. fake (B)
			B) Asychronous
				1. In Memory
					DONE
				2. Will be in Memory
					LISTEN to something SO WE CAN RESUME
						DONE
				3. Not in Memory
					Ask others.
						DONE
		*/
		it('A1', function(done){ // this has behavior of a .get(key) where we already have it in memory but need to fake async it.
			var graph = {};
			var keys = {};
			graph['soul'] = {foo: 'bar'};
			keys['some/key'] = graph['soul'];
			
			var ctx = {key: 'some/key'};
			if(ctx.node = keys[ctx.key]){
				console.log("yay we are synchronously in memory!");
				setTimeout(function(){
					expect(ctx.flag).to.be.ok();
					expect(ctx.node.foo).to.be('bar');
					done();
				},0);
				ctx.flag = true;
			}
		});
		
		it('B1', function(done){ // this has the behavior a .val() where we don't even know what is going on, we just want context.
			var graph = {};
			var keys = {};
			
			var ctx = {
				promise: function(cb){
					setTimeout(function(){
						graph['soul'] = {foo: 'bar'};
						keys['some/key'] = graph['soul'];
						cb('soul');
					},50);
				}
			};
			if(ctx.node = keys[ctx.key]){
				// see A1 test
			} else {
				ctx.promise(function(soul){
					if(ctx.node = graph[soul]){
						expect(ctx.node.foo).to.be('bar');
						done();
					} else {
						// I don't know
					}
				});
			}
		});
		
		it('B2', function(done){ // this is the behavior of a .get(key) which synchronously follows a .put(obj).key(key) which fakes async.
			var graph = {};
			var keys = {};
			
			var ctx = {};
			(function(data){ // put
				setTimeout(function(){
					graph['soul'] = data;
					fn();
				},10);
				
				ctx.promise = function(fn){
					
				}
			}({field: "value"}));
			
			(function(key){ // key
				keys[key] = true;
				ctx.promise(function(){
					keys[key] = node;
				})
			}('some/key'));
			
			(function(ctx){ // get
				if(get.node = keys[get.key]){
					
				} else 
				if(get.inbetweenMemory){
					
				} else {
					loadFromDiskOrPeers(get.key, function(){
						
					});
				}
			}({key: 'some/key'}));
		});
	});
	
	describe('Schedule', function(){
		it('one', function(done){
			Gun.schedule(Gun.time.is(), function(){
				expect(true).to.be(true);
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('many', function(done){
			Gun.schedule(Gun.time.is() + 50, function(){
				done.first = true;
			});
			Gun.schedule(Gun.time.is() + 100, function(){
				done.second = true;
			});
			Gun.schedule(Gun.time.is() + 200, function(){
				done.third = true;
				expect(done.first).to.be(true);
				expect(done.second).to.be(true);
				expect(done.third).to.be(true);
				done(); //setTimeout(function(){ done() },1);
			});
		});
	});
	
	describe('Union', function(){
		var gun = Gun();
		
		it('fail', function(){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						a: 'cheating'
					}},
					a: 0
				}
			}

			expect(gun.__.graph['asdf']).to.not.be.ok();
			var ctx = Gun.union(gun, prime);
			expect(ctx.err).to.be.ok();
		});
		
		it('basic', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						a: Gun.time.is()
					}},
					a: 0
				}
			}

			expect(gun.__.graph['asdf']).to.not.be.ok();
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['asdf'].a).to.be(0);
				done();
			});
		});
		
		it('disjoint', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						b: Gun.time.is()
					}},
					b: 'c'
				}
			}

			expect(gun.__.graph['asdf'].a).to.be(0);
			expect(gun.__.graph['asdf'].b).to.not.be.ok();
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['asdf'].a).to.be(0);
				expect(gun.__.graph['asdf'].b).to.be('c');
				done();
			});
		});
		
		it('mutate', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						b: Gun.time.is()
					}},
					b: 'd'
				}
			}

			expect(gun.__.graph['asdf'].b).to.be('c');
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['asdf'].b).to.be('d');
				done();
			});
		});
		
		it('disjoint past', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						x: 0 // beginning of time!
					}},
					x: 'hi'
				}
			}
			expect(gun.__.graph['asdf'].x).to.not.be.ok();
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['asdf'].x).to.be('hi');
				done();
			});
		});

		it('past', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						x: Gun.time.is() - (60 * 1000) // above lower boundary, below now or upper boundary.
					}},
					x: 'hello'
				}
			}

			expect(gun.__.graph['asdf'].x).to.be('hi');
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['asdf'].x).to.be('hello');
				done();
			});
		});
		
		it('future', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						x: Gun.time.is() + (200) // above now or upper boundary, aka future.
					}},
					x: 'how are you?'
				}
			}

			expect(gun.__.graph['asdf'].x).to.be('hello');
			var now = Gun.time.is();
			var ctx = Gun.union(gun, prime, function(){
				expect(Gun.time.is() - now).to.be.above(100);
				expect(gun.__.graph['asdf'].x).to.be('how are you?');
				done();
			});
		});
		var to = 5000;
		it('disjoint future', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						y: Gun.time.is() + (200) // above now or upper boundary, aka future.
					}},
					y: 'goodbye'
				}
			}
			expect(gun.__.graph['asdf'].y).to.not.be.ok();
			var now = Gun.time.is();
			var ctx = Gun.union(gun, prime, function(){
				expect(Gun.time.is() - now).to.be.above(100);
				expect(gun.__.graph['asdf'].y).to.be('goodbye');
				done();
			});
		});
		
		it('disjoint future max', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						y: Gun.time.is() + (2), // above now or upper boundary, aka future.
						z: Gun.time.is() + (200) // above now or upper boundary, aka future.
					}},
					y: 'bye',
					z: 'who'
				}
			}

			expect(gun.__.graph['asdf'].y).to.be('goodbye');
			expect(gun.__.graph['asdf'].z).to.not.be.ok();
			var now = Gun.time.is();
			var ctx = Gun.union(gun, prime, function(){
				expect(Gun.time.is() - now).to.be.above(100);
				expect(gun.__.graph['asdf'].y).to.be('bye');
				expect(gun.__.graph['asdf'].z).to.be('who');
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('future max', function(done){
			var prime = {
				'asdf': {
					_: {'#': 'asdf', '>':{
						w: Gun.time.is() + (2), // above now or upper boundary, aka future.
						x: Gun.time.is() - (60 * 1000), // above now or upper boundary, aka future.
						y: Gun.time.is() + (200), // above now or upper boundary, aka future.
						z: Gun.time.is() + (50) // above now or upper boundary, aka future.
					}},
					w: true,
					x: 'nothing',
					y: 'farewell',
					z: 'doctor who'
				}
			}

			expect(gun.__.graph['asdf'].w).to.not.be.ok();
			expect(gun.__.graph['asdf'].x).to.be('how are you?');
			expect(gun.__.graph['asdf'].y).to.be('bye');
			expect(gun.__.graph['asdf'].z).to.be('who');
			var now = Gun.time.is();
			var ctx = Gun.union(gun, prime, function(){
				expect(Gun.time.is() - now).to.be.above(100);
				expect(gun.__.graph['asdf'].w).to.be(true);
				expect(gun.__.graph['asdf'].x).to.be('how are you?');
				expect(gun.__.graph['asdf'].y).to.be('farewell');
				expect(gun.__.graph['asdf'].z).to.be('doctor who');
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('two nodes', function(done){ // chat app problem where disk dropped the last data, turns out it was a union problem!
			var state = Gun.time.is();
			var prime = {
				'sadf': {
					_: {'#': 'sadf', '>':{
						1: state
					}},
					1: {'#': 'fdsa'}
				},
				'fdsa': {
					_: {'#': 'fdsa', '>':{
						msg: state
					}},
					msg: "Let's chat!"
				}
			}

			expect(gun.__.graph['sadf']).to.not.be.ok();
			expect(gun.__.graph['fdsa']).to.not.be.ok();
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['sadf'][1]).to.be.ok();
				expect(gun.__.graph['fdsa'].msg).to.be("Let's chat!");
				done();
			});
		});
		
		it('append third node', function(done){ // chat app problem where disk dropped the last data, turns out it was a union problem!
			var state = Gun.time.is();
			var prime = {
				'sadf': {
					_: {'#': 'sadf', '>':{
						2: state
					}},
					2: {'#': 'fads'}
				},
				'fads': {
					_: {'#': 'fads', '>':{
						msg: state
					}},
					msg: "hi"
				}
			}

			expect(gun.__.graph['sadf']).to.be.ok();
			expect(gun.__.graph['fdsa']).to.be.ok();
			var ctx = Gun.union(gun, prime, function(){
				expect(gun.__.graph['sadf'][1]).to.be.ok();
				expect(gun.__.graph['sadf'][2]).to.be.ok();
				expect(gun.__.graph['fads'].msg).to.be("hi");
				done();
			});
		});
		
		it('pseudo null', function(){
				var node = Gun.union.pseudo('pseudo');
				expect(Gun.is.soul.on(node)).to.be('pseudo');
		});
		
		it('pseudo node', function(){
			
			var graph = {
				'asdf': {
					_: {'#': 'asdf', '>': {
						x: Gun.time.is(),
						y: Gun.time.is()
					}},
					x: 1,
					y: 2
				}
			}
			var node = Gun.union.pseudo('soul', graph);
			expect(node).to.not.be.ok();
		});
		
		it('pseudo graph', function(){
			
			var graph = {
				'asdf': {
					_: {'#': 'asdf', '>': {
						a: Gun.time.is() - 2,
						z: Gun.time.is() - 2
					}},
					a: 1,
					z: 1
				},
				'fdsa': {
					_: {'#': 'fdsa', '>': {
						b: Gun.time.is() - 1,
						z: Gun.time.is() - 1
					}},
					b: 2,
					z: 2
				},
				'sadf': {
					_: {'#': 'sadf', '>': {
						c: Gun.time.is(),
						z: Gun.time.is() - 100
					}},
					c: 3,
					z: 3
				}
			}
			var node = Gun.union.pseudo('soul', graph);
			expect(Gun.is.soul.on(node)).to.be('soul');
			expect(node.a).to.be(1);
			expect(node.b).to.be(2);
			expect(node.c).to.be(3);
			expect(node.z).to.be(2);
		});
	});
	
	describe('API', function(){
		var gun = Gun();
		
		it('put', function(done){
			gun.put("hello", function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('put node', function(done){
			gun.put({hello: "world"}, function(err, ok){
				expect(err).to.not.be.ok();
				done();
			});
<<<<<<< HEAD
		});
		
		it('put node then value', function(done){
			var ref = gun.put({hello: "world"});
			
=======

			it('kitty puppy', function(done){
				var g3 = gun.put({hey: 'kitty'}).key('timeywimey/kitty/puppy');

				var g4 = gun.put({hi: 'puppy'}).key('timeywimey/kitty/puppy');

				var g5 = gun.get('timeywimey/kitty/puppy').on(function(val){
					//delete val._;
					//console.log("puppy?", val);
					expect(val.hey).to.be('kitty');
					expect(val.hi).to.be('puppy');
					if(done.c){ return }
					done(); done.c = 1;
				});
			});

			it('hello', function(done){
				gun.get('timeywimey/hello').on(function(val){
					//delete val._;
					//console.log("hello?", val);
					expect(val.hello).to.be('world');
					if(done.c){ return }
					done(); done.c = 1;
				});

				gun.put({hello: 'world'}).key('timeywimey/hello');
			});

			it('hello foo', function(done){
				gun.get('timeywimey/hello/foo').on(function(val){
					//delete val._;
					expect(val.hello).to.be('world');
					if(val.foo){
						expect(val.foo).to.be('bar');
						if(done.c){ return }
						done(); done.c = 1;
					}
				});

				gun.put({hello: 'world'}).key('timeywimey/hello/foo');

				gun.put({foo: 'bar'}).key('timeywimey/hello/foo');
			});

			it('all', function(done){
				gun.put({hey: 'kitty'}).key('timeywimey/all');

				gun.put({hi: 'puppy'}).key('timeywimey/all');

				gun.get('timeywimey/all').on(function(val){
					// console.log('all', done.c, val);
					expect(val.hey).to.be('kitty');
					expect(val.hi).to.be('puppy');
					if(val.hello){
						expect(val.hello).to.be('world');
						done.hello = true;
					}
					if(val.foo){
						expect(val.foo).to.be('bar');
						if(done.c || !done.hello){ return }
						done(); done.c = 1;
					}
				});

				gun.put({hello: 'world'}).key('timeywimey/all');

				gun.put({foo: 'bar'}).key('timeywimey/all');
			});

		});

		describe('plural chains', function(){
			this.timeout(5000);
			it('uncached synchronous map on', function(done){
				/*
					Biggest challenges so far:
					 - Unsubscribe individual mapped next. !
					 - Performance deduplication on asking relation's next. !
					 - Replying immediately to parent cached contexts.
					 - Performant read lock on write contexts.
					 - Proxying event across maps.
				*/
				var s = Gun.state.map();s.soul = 'u/m';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {
						age: 26,
						name: "Alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob!",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m').map().on(function(v,f){
					check[f] = v;
					count[f] = (count[f] || 0) + 1;
					//console.log("***********", f, v);
					if(check.alice && check.bob){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice.age).to.be(26);
							expect(check.alice.name).to.be('Alice');
							expect(Gun.val.rel.is(check.alice.pet)).to.be.ok();
							//expect(count.alice).to.be(1);
							expect(check.bob.age).to.be(29);
							expect(check.bob.name).to.be('Bob!');
							expect(Gun.val.rel.is(check.bob.pet)).to.be.ok();
							//expect(count.bob).to.be(1);
							done();
						},10);
					}
				});
			});

			it('uncached synchronous map get on', function(done){
				var s = Gun.state.map();s.soul = 'u/m/p';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {
						age: 26,
						name: "alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/p').map().get('name').on(function(v,f){
					//console.log("*****************", f, v);
					check[v] = f;
					count[v] = (count[v] || 0) + 1;
					if(check.alice && check.bob){
						clearTimeout(done.to);
							done.to = setTimeout(function(){
							expect(check.alice).to.be('name');
							expect(check.bob).to.be('name');
							//expect(count.alice).to.be(1);
							//expect(count.bob).to.be(1);
							done();
						},10);
					}
				});
			});

			it('uncached synchronous map get on node', function(done){
				var s = Gun.state.map();s.soul = 'u/m/p/n';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {
						age: 26,
						name: "alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/p/n').map().get('pet').on(function(v,f){
					//console.log("********************", f,v);
					check[v.name] = v;
					count[v.name] = (count[v.name] || 0) + 1;
					if(check.Fluffy && check.Frisky){
						clearTimeout(done.to);
							done.to = setTimeout(function(){
							expect(check.Fluffy.a).to.be(1);
							expect(check.Frisky.b).to.be(2);
							//expect(count.Fluffy).to.be(1);
							//expect(count.Frisky).to.be(1);
							//expect(count['undefined']).to.not.be.ok();
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
			});

			it('uncached synchronous map get on node get', function(done){
				var gun = Gun();
				var s = Gun.state.map();s.soul = 'u/m/p/n/p';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {
						age: 26,
						name: "alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				//console.debug.i=1;console.log('-------------------');
				gun.get('u/m/p/n/p').map().get('pet').get('name').on(function(v,f){
					check[v] = f;
					count[v] = (count[v] || 0) + 1;
					//console.log("*****************", f, v);
					if(check.Fluffy && check.Frisky){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.Fluffy).to.be('name');
							expect(check.Frisky).to.be('name');
							//console.log("????", gun._.graph);
							Gun.obj.map(gun._.graph, function(n,s){
								if('u/m/p/n/p' === s){ return }
								var a = Gun.obj.map(n, function(v,f,t){t(v)});
								expect(a.length).to.be(2); // make sure that ONLY the selected properties were loaded, not the whole node.
							});
							//expect(count.Fluffy).to.be(1);
							//expect(count.Frisky).to.be(1);
							done();
						},10);
					}
				});
			});

			it('uncached synchronous map on mutate', function(done){
				var s = Gun.state.map();s.soul = 'u/m/mutate';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {
						age: 26,
						name: "Alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/mutate').map().get('name').get(function(at,ev){
					var e = at.err, v = at.put, f = at.get;
					//console.log("****************", f,v);
					check[v] = f;
					count[v] = (count[v] || 0) + 1;
					if(check.Alice && check.Bob && check['undefined']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							//expect(count.Alice).to.be(1);
							//expect(count.Bob).to.be(1);
							//expect(count['undefined']).to.be(1);
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('u/m/mutate').get('alice').put(7);
				}, 300);
			});

			it('uncached synchronous map on mutate node', function(done){
				var s = Gun.state.map();s.soul = 'u/m/mutate/n';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {_:{'#':'umaliceo'},
						age: 26,
						name: "Alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/mutate/n').map().get('name').get(function(at,ev){
					var e = at.err, v = at.put, f = at.get;
					check[v] = f;
					count[v] = (count[v] || 0) + 1;
					//console.log("************", f,v);
					if(check.Alice && check.Bob && check['undefined'] && check['Alice Zzxyz']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(done.last).to.be.ok();
							expect(check['Alice Aabca']).to.not.be.ok();
							//expect(count.Alice).to.be(1);
							//expect(count.Bob).to.be(1);
							//expect(count['undefined']).to.be(1);
							//expect(count['Alice Zzxyz']).to.be(1);
							done();
						},200);
					}
				});
				setTimeout(function(){
					gun.get('u/m/mutate/n').get('alice').put({
						_:{'#':'u/m/m/n/soul'},
						name: 'Alice Zzxyz'
					});
					setTimeout(function(){
						gun.get('umaliceo').put({
							name: 'Alice Aabca'
						});
						done.last = true;
					}, 10);
				}, 300);
			});

			it('uncached synchronous map on mutate node uncached', function(done){
				var s = Gun.state.map();s.soul = 'u/m/mutate/n/u';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {_:{'#':'umaliceo1'},
						age: 26,
						name: "Alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/mutate/n/u').map().on(function(v,f){
					check[v.name] = f;
					count[v.name] = (count[v.name] || 0) + 1;
					//console.log("*****************", f,v);
					if(check.Alice && check.Bob && check['Alice Zzxyz']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(done.last).to.be.ok();
							//expect(check['Alice Aabca']).to.not.be.ok();
							//expect(count['Alice']).to.be(1);
							//expect(count['Bob']).to.be(1);
							//expect(count['Alice Zzxyz']).to.be(1);
							if(done.c){ return } done.c = 1;
							done();
						},200);
					}
				});
				setTimeout(function(){
					var s = Gun.state.map();s.soul = 'u/m/m/n/u/soul';
					gun.on('put', {gun: gun, put: Gun.graph.ify({
						name: 'Alice Zzxyz'
					}, s)});
					//console.debug.i=1;console.log("---------------");
					gun.get('u/m/mutate/n/u').put({
						alice: {'#':'u/m/m/n/u/soul'},
					});
					/*
						{
							users: {_:#users
								alice: {#newalice}
							}
						}
					*/
					setTimeout(function(){
						gun.get('umaliceo1').put({
							name: 'Alice Aabca'
						});
						done.last = true;
					}, 10);
				}, 300);
			});

			it('uncached synchronous map on get mutate node uncached', function(done){
				var s = Gun.state.map();s.soul = 'u/m/p/mutate/n/u';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {_:{'#':'umaliceo2'},
						age: 26,
						name: "Alice",
						pet: {a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/p/mutate/n/u').map().get('name').on(function(v,f){
					check[v] = f;
					count[v] = (count[v] || 0) + 1;
					//console.log("*************", f,v);
					if(check.Alice && check.Bob && check['Alice Zzxyz']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							var a = Gun.obj.map(gun._.graph['u/m/p/m/n/u/soul'], function(v,f,t){t(v)});
							expect(a.length).to.be(2);
							expect(done.last).to.be.ok();
							expect(check['Alice Aabca']).to.not.be.ok();
							//expect(count.Alice).to.be(1);
							//expect(count.Bob).to.be(1);
							//expect(count['Alice Zzxyz']).to.be(1);
							done();
						},200);
					}
				});
				setTimeout(function(){
					var s = Gun.state.map();s.soul = 'u/m/p/m/n/u/soul';
					gun.on('put', {gun: gun, put: Gun.graph.ify({
						name: 'Alice Zzxyz', age: 34
					}, s)});
					gun.get('u/m/p/mutate/n/u').put({
						alice: {'#':'u/m/p/m/n/u/soul'},
					});
					setTimeout(function(){
						gun.get('umaliceo2').put({
							name: 'Alice Aabca'
						});
						done.last = true;
					}, 10);
				}, 300);
			});

			it('uncached synchronous map on get node mutate node uncached', function(done){
				var s = Gun.state.map();s.soul = 'u/m/p/n/mutate/n/u';
				gun.on('put', {gun: gun, put: Gun.graph.ify({
					alice: {_:{'#':'umaliceo3'},
						age: 26,
						name: "Alice",
						pet: {_:{'#':'sflufso'},a:1, name: "Fluffy"}
					},
					bob: {
						age: 29,
						name: "Bob",
						pet: {b:2, name: "Frisky"}
					}
				}, s)});
				var check = {}, count = {};
				gun.get('u/m/p/n/mutate/n/u').map().get('pet').on(function(v,f){
					check[v.name] = f;
					count[v.name] = (count[v.name] || 0) + 1;
					//console.log("*****************", f,v);
					if(check.Fluffy && check.Frisky && check.Fuzzball){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(done.last).to.be.ok();
							expect(check['Fluffs']).to.not.be.ok();
							//expect(count.Fluffy).to.be(1);
							//expect(count.Frisky).to.be(1);
							//expect(count.Fuzzball).to.be(1);
							done();
						},200);
					}
				});
				setTimeout(function(){
					var s = Gun.state.map();s.soul = 'alice/fuzz/soul';
					gun.on('put', {gun: gun, put: Gun.graph.ify({
						name: 'Alice Zzxyz', age: 34,
						pet: {c:3, name: "Fuzzball"}
					}, s)});
					gun.get('u/m/p/n/mutate/n/u').put({
						alice: {'#':'alice/fuzz/soul'},
					});
					setTimeout(function(){
						gun.get('sflufso').put({
							name: 'Fluffs'
						});
						done.last = true;
					}, 10);
				}, 300);
			});

			it("get before put in memory", function(done){
				var gun = Gun();
				var check = {};
				var count = {};
				gun.get('g/n/m/f/l/n/r').map().on(function(v,f){
					//console.log("***********", f,v);
					check[f] = v;
					count[f] = (count[f] || 0) + 1;
					if(check.alice && check.bob && check.alice.PhD){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice.age).to.be(24);
							expect(check.bob.age).to.be(26);
							expect(check.alice.PhD).to.be(true);
							//expect(count.alice).to.be(2);
							//expect(count.bob).to.be(1);
							if(done.c){return}
							done();done.c=1;
						},50);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/r'},
					alice: {_:{'#':'GALICE1'},
						name: "alice",
						age: 24,
						spouse: {
							name: "carl",
							age: 25,
							work: {
								name: "GUN INC"
							}
						},
						bout: {huh:1}
					},
					bob: {
						name: "bob",
						age: 26,
						spouse: {
							name: "diana",
							age: 27,
							work: {
								name: "ACME INC"
							}
						}
					}
				});
				setTimeout(function(){
					gun.get('GALICE1').put({PhD: true});
				},300);
			});

			it("in memory get after", function(done){
				var gun = Gun();
				gun.put({_:{'#':'g/n/m/f/l/n'},
						alice: {_:{'#':'GALICE2'},
							name: "alice",
							age: 24,
							spouse: {
								name: "carl",
								age: 25,
								work: {
									name: "GUN INC"
								}
							},
							bout: {huh:1}
						},
						bob: {
							name: "bob",
							age: 26,
							spouse: {
								name: "diana",
								age: 27,
								work: {
									name: "ACME INC"
								}
							}
						}
				});
				var check = {};
				//gun.get('g/n/m/f/l/n').get('bob.spouse.work').on(function(v,f){ console.log("!!!!!!!!!", f, v);});return;
				gun.get('g/n/m/f/l/n').map().on(function(v,f){
					check[f] = v;
					//console.log("*******************", f, v);
					if(check.alice && check.bob && check.alice.PhD){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice.age).to.be(24);
							expect(check.bob.age).to.be(26);
							expect(check.alice.PhD).to.be(true);
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('GALICE2').put({PhD: true});
				},300);
			});

			it("in memory get before map get", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/p').map().get('name').on(function(v,f){
					check[v] = f;
					//console.log("****************", f,v);
					if(check.alice && check.bob && check.Alice){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice).to.be('name');
							expect(check.bob).to.be('name');
							expect(check.Alice).to.be('name');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/p'},
						alice: {_:{'#':'GALICE3'},
							name: "alice",
							age: 24,
							spouse: {
								name: "carl",
								age: 25,
								work: {
									name: "GUN INC"
								}
							},
							bout: {huh:1}
						},
						bob: {
							name: "bob",
							age: 26,
							spouse: {
								name: "diana",
								age: 27,
								work: {
									name: "ACME INC"
								}
							}
						}
				});
				setTimeout(function(){
					gun.get('GALICE3').put({name: 'Alice'});
				},300);
			});

			it("in memory get after map get", function(done){
				var gun = Gun();
				gun.put({_:{'#':'g/n/m/f/l/n/m/p'},
						alice: {_:{'#':'GALICE4'},
							name: "alice",
							age: 24,
							spouse: {
								name: "carl",
								age: 25,
								work: {
									name: "GUN INC"
								}
							},
							bout: {huh:1}
						},
						bob: {
							name: "bob",
							age: 26,
							spouse: {
								name: "diana",
								age: 27,
								work: {
									name: "ACME INC"
								}
							}
						}
				});
				var check = {};
				gun.get('g/n/m/f/l/n/m/p').map().get('name').on(function(v,f){
					check[v] = f;
					//console.log("*****************", f,v);
					if(check.alice && check.bob && check.Alice){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice).to.be('name');
							expect(check.bob).to.be('name');
							expect(check.Alice).to.be('name');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('GALICE4').put({name: 'Alice'});
				},300);
			});

			it("in memory get before map get get", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/p/p/p').map().get('spouse').get('work').on(function(v,f){
					check[v.name] = f;
					if(check['GUN INC'] && check['ACME INC'] && check['ACME INC.']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check['GUN INC']).to.be('work');
							expect(check['ACME INC']).to.be('work');
							expect(check['ACME INC.']).to.be('work');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/p/p/p'},
						alice: {
							name: "alice",
							age: 24,
							spouse: {
								name: "carl",
								age: 25,
								work: {
									name: "GUN INC"
								}
							},
							bout: {huh:1}
						},
						bob: {
							name: "bob",
							age: 26,
							spouse: {
								name: "diana",
								age: 27,
								work: {_:{'#':'CCINEMA1'},
									name: "ACME INC"
								}
							}
						}
				});
				setTimeout(function(){
					gun.get('CCINEMA1').put({name: 'ACME INC.'});
				},300);
			});

			it("in memory get after map get get", function(done){
				var gun = Gun();
				gun.put({_:{'#':'g/n/m/f/l/n/b/p/p/p/a'},
						alice: {
							name: "alice",
							age: 24,
							spouse: {
								name: "carl",
								age: 25,
								work: {
									name: "GUN INC"
								}
							},
							bout: {huh:1}
						},
						bob: {
							name: "bob",
							age: 26,
							spouse: {
								name: "diana",
								age: 27,
								work: {_:{'#':'CCINEMA2'},
									name: "ACME INC"
								}
							}
						}
				});
				var check = {};
				gun.get('g/n/m/f/l/n/b/p/p/p/a').map().get('spouse').get('work').on(function(v,f){
					check[v.name] = f;
					if(check['GUN INC'] && check['ACME INC'] && check['ACME INC.']){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check['GUN INC']).to.be('work');
							expect(check['ACME INC']).to.be('work');
							expect(check['ACME INC.']).to.be('work');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('CCINEMA2').put({name: 'ACME INC.'});
				},300);
			});

			it("in memory get before map map", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/a/m/m').map().map().on(function(v,f){
					check[f] = v;
					//console.log("****************", f,v);
					if(check.alice && check.bob && check.GUN && check.ACME && check.ACME.corp){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice.name).to.be('alice');
							expect(check.alice.age).to.be(24);
							expect(Gun.val.rel.is(check.alice.spouse)).to.be.ok();
							expect(check.bob.name).to.be('bob');
							expect(check.bob.age).to.be(26);
							expect(Gun.val.rel.is(check.bob.spouse)).to.be.ok();
							expect(check.GUN.name).to.be('GUN');
							expect(check.ACME.name).to.be('ACME');
							expect(check.ACME.corp).to.be('C');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				//console.debug.i=1;console.log("------------------------");
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN"
							},
							ACME: {_:{'#':"CCINEMA3"},
								name: "ACME"
							}
						}
				});
				setTimeout(function(){
					gun.get('CCINEMA3').put({corp: "C"});
				},300);
			});

			it("in memory get after map map", function(done){
				var gun = Gun();
				gun.put({_:{'#':'g/n/m/f/l/n/b/m/m'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN"
							},
							ACME: {_:{'#':"CCINEMA4"},
								name: "ACME"
							}
						}
				});
				var check = {};
				gun.get('g/n/m/f/l/n/b/m/m').map().map().on(function(v,f){
					check[f] = v;
					//console.log("***************", f,v);
					if(check.alice && check.bob && check.GUN && check.ACME && check.ACME.corp){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice.name).to.be('alice');
							expect(check.alice.age).to.be(24);
							expect(Gun.val.rel.is(check.alice.spouse)).to.be.ok();
							expect(check.bob.name).to.be('bob');
							expect(check.bob.age).to.be(26);
							expect(Gun.val.rel.is(check.bob.spouse)).to.be.ok();
							expect(check.GUN.name).to.be('GUN');
							expect(check.ACME.name).to.be('ACME');
							expect(check.ACME.corp).to.be('C');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('CCINEMA4').put({corp: "C"});
				},300);
			});

			it("in memory get before map map get", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/m/m/p').map().map().get('name').on(function(v,f){
					check[v] = f;
					//console.log("***********", f,v);
					if(check.alice && check.bob && check.GUN && check.ACME && check.ACMEINC){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice).to.be('name');
							expect(check.bob).to.be('name');
							expect(check.GUN).to.be('name');
							expect(check.ACME).to.be('name');
							expect(check.ACMEINC).to.be('name');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/m/m/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN"
							},
							ACME: {_:{'#':"CCINEMA5"},
								name: "ACME"
							}
						}
				});
				setTimeout(function(){
					gun.get('CCINEMA5').put({name: "ACMEINC"});
				},300);
			});

			it("in memory get after map map get", function(done){
				var gun = Gun();
				var check = {};
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN"
							},
							ACME: {_:{'#':'CCINEMA6'},
								name: "ACME"
							}
						}
				});
				gun.get('g/n/m/f/l/n/b/a/m/m/p').map().map().get('name').on(function(v,f){
					check[v] = f;
					//console.log("************", f,v);
					if(check.alice && check.bob && check.GUN && check.ACME && check.ACMEINC){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.alice).to.be('name');
							expect(check.bob).to.be('name');
							expect(check.GUN).to.be('name');
							expect(check.ACME).to.be('name');
							expect(check.ACMEINC).to.be('name');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('CCINEMA6').put({name: "ACMEINC"});
				},300);
			});

			it("in memory get before map map get get", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/m/m/p/p').map().map().get('address').get('state').on(function(v,f){
					check[v] = f;
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
							done.to = setTimeout(function(){
							expect(check.QR).to.be('state');
							expect(check.NY).to.be('state');
							expect(check.CA).to.be('state');
							expect(check.TX).to.be('state');
							expect(check.MA).to.be('state');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/m/m/p/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {_:{'#':'QUANGO'},
									state: "MA"
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: "TX"
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: "CA"
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: "NY"
								}
							}
						}
				});
				setTimeout(function(){
					gun.get('QUANGO').put({state: 'QR'});
				},300);
			});

			it("in memory get after map map get get", function(done){
				var gun = Gun();
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m/p/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {_:{'#':'QUANGO1'},
									state: "MA"
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: "TX"
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: "CA"
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: "NY"
								}
							}
						}
				});
				var check = {};
				gun.get('g/n/m/f/l/n/b/a/m/m/p/p').map().map().get('address').get('state').on(function(v,f){
					check[v] = f;
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.QR).to.be('state');
							expect(check.NY).to.be('state');
							expect(check.CA).to.be('state');
							expect(check.TX).to.be('state');
							expect(check.MA).to.be('state');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('QUANGO1').put({state: 'QR'});
				},300);
			});

			it("in memory get before map map get get get", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/m/m/p/p/p').map().map().get('address').get('state')
					.get('code')
					.on(function(v,f){
					check[v] = f;
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.QR).to.be('code');
							expect(check.NY).to.be('code');
							expect(check.CA).to.be('code');
							expect(check.TX).to.be('code');
							expect(check.MA).to.be('code');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/m/m/p/p/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {
									state: {_:{'#':'HIPPOM'},
										code: "MA",
										county: {
											MA1: "First"
										}
									}
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: {
										code: "TX",
										county: {
											TX1: "First"
										}
									}
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: {
										code: "CA",
										county: {
											CA1: "First"
										}
									}
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: {
										code: "NY",
										county: {
											NY1: "First"
										}
									}
								}
							}
						}
				});
				setTimeout(function(){
					gun.get('HIPPOM').put({code: 'QR'});
				},300);
			});

			it("in memory get before after map map get get get", function(done){
				var gun = Gun();
				var check = {};
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m/p/p/p'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {
									state: {_:{'#':'HIPPOM1'},
										code: "MA",
										county: {
											MA1: "First"
										}
									}
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: {
										code: "TX",
										county: {
											TX1: "First"
										}
									}
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: {
										code: "CA",
										county: {
											CA1: "First"
										}
									}
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: {
										code: "NY",
										county: {
											NY1: "First"
										}
									}
								}
							}
						}
				});
				gun.get('g/n/m/f/l/n/b/a/m/m/p/p/p').map().map().get('address').get('state')
					.get('code')
					.on(function(v,f){
					check[v] = f;
					//console.log("***********", f,v);
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.QR).to.be('code');
							expect(check.NY).to.be('code');
							expect(check.CA).to.be('code');
							expect(check.TX).to.be('code');
							expect(check.MA).to.be('code');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('HIPPOM1').put({code: 'QR'});
				},300);
			});

			it("in memory get before map map get get node", function(done){
				var gun = Gun();
				var check = {};
				gun.get('g/n/m/f/l/n/b/m/m/p/p/n').map().map().get('address').get('state').on(function(v,f){
					check[v.code] = f;
					//console.log("************", f, v);
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.QR).to.be('state');
							expect(check.NY).to.be('state');
							expect(check.CA).to.be('state');
							expect(check.TX).to.be('state');
							expect(check.MA).to.be('state');
							if(done.c){return}done.c=1;
							done();
						},10);
					}
				});
				gun.put({_:{'#':'g/n/m/f/l/n/b/m/m/p/p/n'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {
									state: {_:{'#':'HIPPOM3'},
										code: "MA",
										county: {
											MA1: "First"
										}
									}
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: {
										code: "TX",
										county: {
											TX1: "First"
										}
									}
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: {
										code: "CA",
										county: {
											CA1: "First"
										}
									}
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: {
										code: "NY",
										county: {
											NY1: "First"
										}
									}
								}
							}
						}
				});
				setTimeout(function(){
					gun.get('HIPPOM3').put({code: 'QR'});
				},300);
			});

			it("in memory get before after map map get get node", function(done){
				var gun = Gun();
				var check = {};
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m/p/p/n'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {
									state: {_:{'#':'HIPPOM4'},
										code: "MA",
										county: {
											MA1: "First"
										}
									}
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: {
										code: "TX",
										county: {
											TX1: "First"
										}
									}
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: {
										code: "CA",
										county: {
											CA1: "First"
										}
									}
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: {
										code: "NY",
										county: {
											NY1: "First"
										}
									}
								}
							}
						}
				});
				gun.get('g/n/m/f/l/n/b/a/m/m/p/p/n').map().map().get('address').get('state').on(function(v,f){
					check[v.code] = f;
					//console.log("**********", f, v);
					if(check.QR && check.NY && check.CA && check.TX && check.MA){
						clearTimeout(done.to);
						done.to = setTimeout(function(){
							expect(check.QR).to.be('state');
							expect(check.NY).to.be('state');
							expect(check.CA).to.be('state');
							expect(check.TX).to.be('state');
							expect(check.MA).to.be('state');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('HIPPOM4').put({code: 'QR'});
				},300);
			});

			it("in memory get after map map get get get map", function(done){
				var gun = Gun();
				var check = {};
				gun.put({_:{'#':'g/n/m/f/l/n/b/a/m/m/p/p/p/n'},
						users: {
							alice: {
								name: "alice",
								age: 24,
								address: {
									state: {
										code: "MA",
										county: {
											MA1: "First"
											,MA2: "Second"
										}
									}
								},
								spouse: {
									name: "carl",
									age: 25
								},
								bout: {huh:1}
							},
							bob: {
								name: "bob",
								age: 26,
								address: {
									state: {
										code: "TX",
										county: {
											TX1: "First"
											,TX2: "Second"
										}
									}
								},
								spouse: {
									name: "diana",
									age: 27
								}
							}
						},
						companies: {
							GUN: {
								name: "GUN",
								address: {
									state: {
										code: "CA",
										county: {
											CA1: "First"
											,CA2: "Second"
										}
									}
								}
							},
							ACME: {
								name: "ACME",
								address: {
									state: {
										code: "NY",
										county: {_:{'#':'NYCOUNT'},
											NY1: "First"
											,NY2: "Second"
										}
									}
								}
							}
						}
				});
				gun.get('g/n/m/f/l/n/b/a/m/m/p/p/p/n').map().map().get('address').get('state').get('county').map().on(function(v,f){
					check[f] = v;
					//console.log("****************", f,v);
					if(check.MA1 && check.MA2 && check.TX1 && check.TX2 && check.CA1 && check.CA2 && check.NY1 && check.NY2 && check.NY3){
						clearTimeout(done.to);
							done.to = setTimeout(function(){
							expect(check.MA1).to.be('First');
							expect(check.TX1).to.be('First');
							expect(check.CA1).to.be('First');
							expect(check.NY1).to.be('First');
							expect(check.MA2).to.be('Second');
							expect(check.TX2).to.be('Second');
							expect(check.CA2).to.be('Second');
							expect(check.NY2).to.be('Second');
							expect(check.NY3).to.be('Third');
							done();
						},10);
					}
				});
				setTimeout(function(){
					gun.get('NYCOUNT').put({NY3: "Third"});
				},300);
			});
		});

		it('get node after recursive field', function(done){
			var s = Gun.state.map();s.soul = 'node/circle';
			var bob = {age: 29, name: "Bob!"};
			var cat = {name: "Fluffy", species: "kitty"};
			var user = {bob: bob};
			bob.pet = cat;
			cat.slave = bob;
			gun.on('put', {gun: gun, put: Gun.graph.ify(user, s)});
			gun.get(s.soul).get('bob').get('pet').get('slave').val(function(data){
				//clearTimeout(done.to);
				//setTimeout(function(){
					//console.log("*****************", data);
					expect(data.age).to.be(29);
					expect(data.name).to.be("Bob!");
					expect(Gun.val.rel.is(data.pet)).to.ok();
					done();
				//},300);
			});
		});

		it('recursive put', function(done){
			//localStorage.clear();
			var gun = Gun();

			var parent = gun.get('parent');
			var child = gun.get('child');
			
			child.put({
				way: 'down'
			});
			
			parent.get('sub').put(child);
			
			parent.get('sub').on(function(data){
				//console.log("sub", data);
				done.sub = data;
			});
			child.on(function(data){
				done.child = data;
				//console.log("child", data);
			});
			parent.on(function(data){
				done.parent = data;
				//console.log("parent", data);
				if(done.c){ return } done.c = 1;
				done(); // TODO: Add more meaningful checks!
			});
		});

		it('empty val followed', function(done){
			var gun = Gun();

			gun.get('val/follow').val(function(data){
				//console.log("val", data);
			}).get(function(at){
				//console.log("?????", at);
				if(done.c){ return } done.c = 1;
				done();
			});

		});

		it('map val get put', function(done){
			var gun = Gun().get('chat/asdf');

			var check = {}, count = {};
			gun.map().val(function(v,f){
				check[f] = v;
				count[f] = (count[f] || 0) + 1;
				//console.log("**************", f, v);
				if(check['1-1'] && check['2-2']){
					clearTimeout(done.to);
					done.to = setTimeout(function(){
						expect(check['1-1'].what).to.be('hi');
						expect(check['2-2'].what).to.be('you.');
						expect(count['1-1']).to.be(1);
						expect(count['2-2']).to.be(1);
						done();
					},50);
				}
			});
			setTimeout(function(){
				//console.debug.i=1;console.log("-----------------");
				gun.get('1-1').put({what: "hi"});
				setTimeout(function(){
					gun.get('2-2').put({what: "you."});
				},40);
			},40);
		});

		it('get list set map val', function(done){

			var gun = Gun();

			var list = gun.get('list');

			list.set(gun.get('alice').put({name: "Alice", group: "awesome", married: true}));
			list.set(gun.get('bob').put({name: "Bob", group: "cool", married: true}));
			list.set(gun.get('carl').put({name: "Carl", group: "cool", married: false}));
			list.set(gun.get('dave').put({name: "Dave", group: "awesome", married: true}));

			var check = {}, count = {};
			list.map().val(function(data, id){
				//console.log("***************", id, data);
				check[id] = data;
				count[id] = (count[id] || 0) + 1;
				if(check.alice && check.bob && check.carl && check.dave){
					clearTimeout(done.to);
					done.to = setTimeout(function(){
						expect(count.alice).to.be(1);
						expect(check.alice.name).to.be('Alice');
						expect(check.alice.group).to.be('awesome');
						expect(check.alice.married).to.be(true);
						expect(count.bob).to.be(1);
						expect(check.bob.name).to.be('Bob');
						expect(check.bob.group).to.be('cool');
						expect(check.bob.married).to.be(true);
						expect(count.carl).to.be(1);
						expect(check.carl.name).to.be('Carl');
						expect(check.carl.group).to.be('cool');
						expect(check.carl.married).to.be(false);
						expect(count.dave).to.be(1);
						expect(check.dave.name).to.be('Dave');
						expect(check.dave.group).to.be('awesome');
						expect(check.dave.married).to.be(true);
						done();
					},50);
				}
			});
			/*
				Have we asked for this yet? No.
				Do we have it cached? No.
				Is its parent cached? Yes.
				Reply immediately with that cache for map to process.
			*/

			/*
				chain has a root // all
				an ID // all
				a back // all
				inputs // all
				and outputs // all
				acks // any
				echo // any
				next // any
				cache or map of many ones // only a one can have a cache, only a map can have many, and they must be ones. However any chain might have neither. By default a chain is a many, unless it is designated as a one.

				gun.get('alice').also('bob').path('name').on(cb);
				gun.get('users').map().path('friends').map().on(cb);

				friends is a map, it has an echo
				{name: "alice", friends: []}
					{name: "xavier"}
					{name: "yara"}
					{name: "zack"}
				{name: "bob", friends: []}
					{name: "xavier"}
					{name: "yara"}
					{name: "zack"}
				{name: "carl", friends: []}
					{name: "xavier"}
					{name: "yara"}
					{name: "zack"}
			*/
		});

		it('get get get set root get put', function(done){
			var gun = Gun().get('app');
			gun.get('alias').get('mark').set(
				gun.back(-1).get('pub').put({
					alias: 'mark',
					auth: 'encrypt', // oops
					born: 1,
					pub: 'pub',
					salt: 'random'
				})
			);
			//return;
			setTimeout(function(){
				gun.get(function(at){
					//console.log('*', at.put);
					done.app = done.app || at.put.alias;
				});
				gun.back(-1).get('pub').get(function(at){
					//console.log("**", at.put);
					done.pub = done.pub || at.put.auth;
				});
				gun.get('alias').get(function(at){
					//console.log("***", at.put);
					done.alias = done.alias || at.put.mark;
					//!console.debug.i&&(console.debug.i=1)&&console.log("---------------------");
				}).get('mark').get(function(at){
					//console.log("************", at.put);//return;
					setTimeout(function(){
						done.mark = done.mark || at.put.pub;
						expect(Gun.val.rel.is(done.mark)).to.be('pub');
						expect(done.app).to.be.ok();
						expect(done.pub).to.be.ok();
						expect(done.alias).to.be.ok();
						if(done.c){ return } done.c = 1;
						done();
					},100);
				})
			},100);
		});

		it('get put get get put reload get get then get', function(done){
			this.timeout(6000);
			var gun = Gun();

			gun.get('stef').put({name:'Stef'});
			var address = {
			  country: 'Netherlands',
			  zip:'999999'
			};
			gun.get('stef').get('address').put(address);

			// reload
			setTimeout(function(){
				var gun2 = Gun();
				//console.log(require('fs').readFileSync('./radata/!').toString());
				gun2.get('stef').get('address').val(function(data){ // Object {_: Object, country: "Netherlands", zip: "1766KP"} "adress"
					//console.log("******", data);
					done.a = true;
					expect(data.country).to.be('Netherlands');
					expect(data.zip).to.be('999999');
					if(!done.s){ return }
					if(done.c){ return } done.c = 1;
					done();
				});
				gun2.get('stef').val(function(data){ //Object {_: Object, address: Object} "stef"
					//console.log("**************", data);
					//return;
					done.s = true;
					expect(data.name).to.be('Stef');
					expect(data.address).to.be.ok();
					if(!done.a){ return }
					if(done.c){ return } done.c = 1;
					done();
				});
			},5000);
		});

		it('get get get any parallel', function(done){
			var s = Gun.state.map();s.soul = 'parallel';
			gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!"
				}
			}, s)});
			gun.get('parallel').get('bob').get('age').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("***** age", data, at.gun._.ack);//return;
				expect(data).to.be(29);
				expect(field).to.be('age');
				done.age = true;
			});
			gun.get('parallel').get('bob').get('name').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("*********** name", data, at.gun._.ack);//return;
				expect(data).to.be('Bob!');
				expect(field).to.be('name');
				done.name = true;
				expect(done.age).to.be.ok();
				if(done.c){ return } done.c = 1;
				done();
			});
		});

		it('get get get any later', function(done){
			var s = Gun.state.map();s.soul = 'parallel/later';
			gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {_:{'#':'ddfsa'},
					age: 29,
					name: "Bob!"
				}
			}, s)});
			gun.get('parallel/later').get('bob').get('age').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("***** age", data);
				expect(data).to.be(29);
				expect(field).to.be('age');
				done.age = true;
			});
			setTimeout(function(){
				gun.get('parallel/later').get('bob').get('name').get(function(at, ev){
					var err = at.err, data = at.put, field = at.get;
					//console.log("*********** name", data);
					expect(data).to.be('Bob!');
					expect(field).to.be('name');
					done.name = true;
					expect(done.age).to.be.ok();
					if(done.c){ return } done.c = 1;
					done();
				});
			},400);
		});

		it('get get get any not', function(done){
			gun.get('parallel/not').get('bob').get('age').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("***** age", data);
				expect(data).to.be(undefined);
				expect(field).to.be('age');
				done.age = true;
			});
			gun.get('parallel/not').get('bob').get('name').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("*********** name", data);
				expect(data).to.be(undefined);
				expect(field).to.be('name');
				done.name = true;
				expect(done.age).to.be.ok();
				if(done.c){return}done.c=1;
				done();
			});
		});

		it('get get get any not later', function(done){
			gun.get('parallel/not/later').get('bob').get('age').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("***** age", data);
				expect(data).to.be(undefined);
				expect(field).to.be('age');
				done.age = true;
			});
			setTimeout(function(){
				//console.debug.i=1;console.log('---------------');
				gun.get('parallel/not/later').get('bob').get('name').get(function(at, ev){
					var err = at.err, data = at.put, field = at.get;
					//console.log("*********** name", field, data);
					expect(data).to.be(undefined);
					expect(field).to.be('name');
					done.name = true;
					expect(done.age).to.be.ok();
					if(done.c){ return } done.c = 1;
					done();
				});
			},400);
		});

		it('get any any', function(done){
			var s = Gun.state.map();s.soul = 'full';
			gun.on('put', {gun: gun, put: Gun.graph.ify({
				hello: 'world',
				goodbye: 'mars'
			}, s)});
			gun.get('full').get(function(at, ev){
				var err = at.err, data = at.gun._.put || at.put, field = at.get;
				//console.log("*****1", data);
				expect(data.hello).to.be('world');
				expect(data.goodbye).to.be('mars');
			});
			gun.get('full').get(function(at, ev){
				var err = at.err, data = at.gun._.put || at.put, field = at.get;
				//console.log("*****1", data);
				expect(data.hello).to.be('world');
				expect(data.goodbye).to.be('mars');
				if(done.c){ return } done.c = 1;
				done();
			});
		});

		it('get any any later', function(done){
			var s = Gun.state.map();s.soul = 'full/later';
			gun.on('put', {gun: gun, put: Gun.graph.ify({
				hello: 'world',
				goodbye: 'mars'
			}, s)});
			gun.get('full/later').get(function(at, ev){
				var err = at.err, data = at.gun._.put || at.put, field = at.get;
				//console.log("*****", data);
				expect(data.hello).to.be('world');
				expect(data.goodbye).to.be('mars');
			});
			setTimeout(function(){
				gun.get('full/later').get(function(at, ev){
					var err = at.err, data = at.gun._.put || at.put, field = at.get;
					//console.log("*****2", field, data);
					expect(data.hello).to.be('world');
					expect(data.goodbye).to.be('mars');
					if(done.c){ return } done.c = 1;
					done();
				});
			},400);
		});

		it('multiple times map', function(done){
			var gun = Gun();

			gun.get('usersMM').put({
				'mark': {
					fdsa: {
						pub: 'fdsa',
						name: "mark"
					}
				},
				'amber': {
					asdf: {
						pub: 'asdf',
						name: "amber"
					}
				}
			});

			var check = {A: {}, B: {}};
			setTimeout(function(){
				gun.get('usersMM').map().map().val(function(data){
					//console.log('A', data);
					check.A[data.pub] = true;
				})
			}, 900);

			setTimeout(function(){
				gun.get('usersMM').map().map().val(function(data){
					//console.log('B', data, check);
					check.B[data.pub] = true;
					if(check.A['asdf'] && check.A['fdsa'] && check.B['asdf'] && check.B['fdsa']){
						if(done.c){ return } done.c = 1;
						done();
					}
				})
			}, 1200);

		});

		it('multiple times', function(done){
			var gun = Gun();
			var app = gun.get('mult/times');

			app.get('alias').get('mark').set(gun.get('ASDF').put({
				pub: 'ASDF',
				alias: 'mark',
				born: 1
			}));

			app.get('alias').map().map().get('pub').on(function(data){
				done.one = data;
				//console.log("pub 1!", data);
			});

			setTimeout(function(){
				app.get('alias').map().map().get('alias').on(function(data){
					done.two = data;
					//console.log("alias 2!", data);
					expect(done.one).to.be("ASDF");
					expect(done.two).to.be("mark");
					if(done.c){ return } done.c = 1;
					done();
				});
			},100);
		});

		it('multiple times partial', function(done){
			var gun = Gun();

			var s = Gun.state.map();s.soul = 'mult/times/part';
			gun.on('put', {gun: gun, put: Gun.graph.ify({
				alias: {
					mark: {
						pub: {_:{'#':'PUB'},
							pub: 'asdf',
							alias: 'mark',
							born: 1
						}
					}
				}
			}, s)});

			var app = gun.get(s.soul);
			
			//console.debug.i=1;console.log("===================");
			app.get('alias').get('mark').map().val(function(alias){
				//console.log("***", alias);
				done.alias = alias;
			});

			setTimeout(function(){
				app.get('alias').map().map().get('born').on(function(data){
					//console.log("*******", data);
					expect(data).to.be(1);
					expect(done.alias.pub).to.be("asdf");
					expect(done.alias.alias).to.be("mark");
					expect(done.alias.born).to.be(1);
					if(done.c){ return } done.c = 1;
					done();
				});
			},400);
		});

		it('put on a put', function(done){
			try{
			var gun = Gun();
			var foo = gun.get('put/on/put').get('a').get('b');
			var bar = gun.get('put/on/put/ok').get('a').get('b');

			bar.put({a:1});

			bar.on(function(data){
				if(1 === data.a && 3 === data.c){
					if(done.c){ return } done.c = 1;
					done();
				}
			});

			foo.on(function(ack){
				bar.put({c:3});
			});
			foo.put({b:2});
			}catch(e){ console.log("!!!!!!!!!!!", e)}
		});

		it('map with map function', function(done){
			var gun = Gun(), s = 'map/mapfunc', u;
			var app = gun.get(s);
			var list = app.get('list');

			var check = {};
			list.map(function(user){ /*console.log("****", user);*/ return user.age === 27? user.name + "thezombie" : u }).on(function(data){
				//console.log('+++++', data);
				check[data] = true;
				if(check.alicethezombie && check.bobthezombie){
					if(done.c){return}done.c=1;
					done();
				}
			});
			list.set({name: 'alice', age: 27}); // on put, table-scan flag doesn't get set, but is needed for initial!??
			list.set({name: 'bob', age: 27});
			list.set({name: 'carl', age: 29});
			list.set({name: 'dave', age: 25});
		});

		it('val and then map', function(done){
			var gun = Gun(), s = 'val/then/map', u;
			var list = gun.get(s);

			list.set(gun.get('alice').put({name: 'alice', age: 27}));
			list.set(gun.get('bob').put({name: 'bob', age: 27}));
			list.set(gun.get('carl').put({name: 'carl', age: 29}));
			list.set(gun.get('dave').put({name: 'dave', age: 25}));

			var check = {};
			list.val().map().on(function(data, key){
				check[key] = data;
				clearTimeout(done.to);
				done.to = setTimeout(function(){
					if(check.alice && check.bob && check.carl && check.dave && done.last){
						expect(check.alice.age).to.be(27);
						expect(check.bob.age).to.be(28);
						expect(check.carl.age).to.be(29);
						expect(check.dave.age).to.be(25);
						expect(check.eve).to.not.be.ok();
						if(done.c){return}done.c=1;
						done();
					}
				},600);
			});
			setTimeout(function(){
				list.set(gun.get('eve').put({name: 'eve', age: 30}));
				gun.get('bob').get('age').put(28);
				done.last = true;
			},300);
		});

		it('check null on map', function(done){
			var list = gun.get('myList');
			list.map(function(value, id){
				if("hello world" === value){
					done.one = true;
				}
				if(null === value){
					done.two = true;
				}
				if(done.one && done.two){
					if(done.c){ return } done.c = 1;
					done();
				}
			});
			list.get('message').put('hello world'); // outputs "message: hello world"
			list.get('message').put(null); // throws Uncaught TypeError: Cannot read property '#' of null
		});

		it('Check multi instance message passing', function(done){
			try{ require('fs').unlinkSync('bdata') }catch(e){}
			try{ require('fs').unlinkSync('ddata') }catch(e){}
			Gun.on('opt', function(ctx){
				ctx.on('out', function(msg){
					this.to.next(msg);
					var onGun = ctx;
					if(onGun.gun === b) {
						if(d){
							//console.log("b can send to d....", Gun.obj.copy(msg));
							d.on("in", msg);
						}
					} else if(onGun.gun === d){
						//console.log("d sends to b....", Gun.obj.copy(msg));
						b.on("in", msg);
					}
				});
			});

			var b = Gun({file: "bdata"});
			var d = null;

			var bb = b.get("key");
			bb.put({msg: "hello"});
				
			d = Gun({file: "ddata"});
			var db = d.get("key");
			db.map().on(function(val,field){
				expect(val).to.be('hello');
				if(done.c){ return } done.c = 1;
				setTimeout(function(){
					done();
				},1700);
			});
		});

		it('val should now get called if no data is found', function(done){
			var gun = Gun();

			gun.get('nv/foo').get('bar').get('baz').val(function(val, key){
				//console.log('*******', key, val);
				expect(val).to.be(undefined);
				done.fbb = true;
			});

			gun.get('nv/totesnothing').val(function(val, key){
				//console.log('***********', key, val);
				expect(val).to.be(undefined);
				done.t = true;
			});

			gun.get('nv/bz').get('lul').val(function(val, key){
				//console.log('*****************', key, val);
				expect(val).to.be(undefined);
				done.bzl = true;
				if(done.fbb && done.t && done.bzl){
					if(done.c){ return } done.c = 1;
					done();
				}
			});
		});

		it('Callbacks should have database safe data copies', function(done){
			var gun = Gun();

			gun.get('ds/safe').put({a: 1});
			
			gun.get('ds/safe').on(function(data){
				data.b = 2;
			});
			
			gun.get('ds/safe').val(function(data){
				expect(gun._.root._.graph['ds/safe'].b).to.not.be.ok();
				if(done.c){ return } done.c = 1;
				done();
			});
		});

		it('If chain cannot be called, ack', function(done){
			var gun = Gun(), u;

			gun.on('put', {gun: gun, put: Gun.graph.ify({
				wat: 1,
				a: true
			}, 'nl/app')});

			var app = gun.get('nl/app');

			app.get(function(d){
				expect(d.put.wat).to.be(1);
				expect(d.put.a).to.be(true);
				done.a = 1;
			});

			app.get('a').get('b').get(function(d){
				expect(d.put).to.be(u);
				expect(done.a).to.be.ok();
				if(done.c){ return }
				done(); done.c = 1;
			});
		});

		it('Chain on known nested object should ack', function(done){
			var gun = Gun(), u;

			gun.on('put', {gun: gun, put: Gun.graph.ify({
				bar: {
					wat: 1
				}
			}, 'nl/app')});

			var app = gun.get('nl/app').get('bar');

			app.get(function(d){
				//console.log("!!", d.put);
				if(!d || !d.put || !d.put.wat){ return }
				expect(d.put.wat).to.be(1);
				done.a = 1;
				if(!done.u){ return }
				expect(done.u).to.be.ok();
				if(done.c){ return } done.c = 1;
				done();
			});

			app.get('a').get('b').get(function(d){
				//console.log("????", d.put);
				expect(d.put).to.be(u);
				done.u = true;
				if(!done.a){ return }
				expect(done.a).to.be.ok();
				if(done.c){ return } done.c = 1;
				done();
			});
		});

		it('Soul above but not beneath', function(done){
			var gun = Gun();

			var a = gun.get('sabnb');

			a.get('profile').put({_:{'#': 'sabnbprofile'}, name: "Plum"});

			setTimeout(function(){
				a.get('profile').get('said').get('asdf').put('yes');
				setTimeout(function(){
					a.val(function(data){
						expect(data.profile).to.be.eql({'#': 'sabnbprofile'});
						if(done.c){ return } done.c = 1;
						done();
					})
				}, 100);
			}, 100);

		});

		it('users map map who said map on', function(done){
			this.timeout(1000 * 60 * 5);
			var gun = Gun();

			gun.get('users').put({
				alice: {_:{'#':'alias/alice'},
					'pub/asdf': {_:{'#':'pub/asdf'},
						pub: 'asdf'
					}
				},
				bob: {_:{'#':'alias/bob'},
					'pub/fdsa': {_:{'#':'pub/fdsa'},
						pub: 'fdsa'
					}
				}
			});

			var check = {}, c = 0, end;
			//console.log(check);
			gun.get('users').map().map()
				.get('who').get('said').map().on(function(msg){
					if(check[msg.num]){
						//console.log("!!!!", msg.num, "!!!!");
					}
					check[msg.num] = false;
					c++;
					clearTimeout(end); end = setTimeout(function(){
						//console.log("?", c, check);
						if(Gun.obj.map(check, function(v){ if(v){ return v } })){ return }
						done();
					},100);
			});

			var said = gun.get('pub/asdf').get('who').get('said');

			function run(i){

				//console.log("----", i, "----");
				//2 === i && (console.debug.i = 1) && console.debug(1, '======= what happens?');
				said.set({
					what: i + " Hello world!",
					num: i,
					who: 'asdf',
					id: 'alice',
				});

			}

			var i = 0, m = 9, to = setInterval(function frame(){
				if(m <= i){
					clearTimeout(to);
					return;
				}
				i++;
				check[i] = true;
				run(i);
			}, 1);

		});
		return;
		it('Nested listener should be called', function(done){
			
			var gun = Gun();
			/*
			var app = gun.get('nl/app').get('bar');

			app.on(function(d){
				console.log("!!", d);
			})

			app.put({wat: 1});

			console.debug.i=1;console.log("------------");
			console.log(gun._.now);
			app.put({a: {b:2}});
			console.log('_______________________');
			return;*/

			var app = gun.get('nl/app');
			var node = app.get('watcher/1').put({"stats":{"num":3},"name":"trex"});

			app.get('watcher/1').get('stats').on(function (v, k) {
			  console.log('v:', k, v);
			});

			setTimeout(function(){
			  
			  console.log("Huh?");
			  app.get('watcher/1').put({"stats":{"num":4},"name":"trexxx"});
			  
			},100);
		});
		return;
		it.only('Memory management', function(done){
			this.timeout(9999999);
			var gun = Gun(), c = 100000, big = "big";
			while(--c){big += "big"}
			c = 0;
			setInterval(function(){
				var key = Gun.text.random(5);
				gun.get(key).put({data: big});
				setTimeout(function(){
					gun.get(key).off();
				},10);
				if(typeof process === 'undefined'){ return }
				var mem = process.memoryUsage();
				console.log(((mem.heapUsed / mem.heapTotal) * 100).toFixed(0) + '% memory');
				console.log(Object.keys(gun._.graph).length, 'item in memory graph:', Object.keys(gun._.graph));
			},25);
		});

		return;
		it.only('Custom extensions are chainable', function(done){
			Gun.chain.filter = function(filter){
			  var chain = this.chain();
			  var context = this;
			  var _tags;
			  context.val(function(obj, key){
			    if(!obj.tags){
			      console.warn('Not tagged to anything!');
			      context._.valid = false;
			      chain._.on('in', {get: key, gun: this});
			      return false;
			    } else { 
			     _tags = Gun.obj.ify(obj.tags);
			      if(Array.isArray(filter)){
			        context._.valid = filter.every(function(f){ return ( _tags[f] && _tags[f]==1) });
			        if(context._.valid){
			          chain._.on('in', {get: key, put: obj, gun: this});
			          return context;
			        } else {
			          console.log("that was wrong");
			          chain._.on('in', {get: key, put: undefined, gun: this});
			        }
			        return false;
			      } else {
			        console.warn('filter should be an Array');
			        return false;
			      }
			    }
			  });
			  return chain;
			}

			var gun = Gun();

			var fake1 = gun.get('fake1').put({name:'faker1',tags:JSON.stringify({a:1,b:0,c:1})});
			var fake2 = gun.get('fake2').put({name:'faker2',tags:JSON.stringify({a:1,b:1,c:1})});
			var list = gun.get('list');
			list.set(fake1);
			list.set(fake2);

			gun.get('fake1')//.map()
			      .filter(['a','b'])  // Gun.chain.filter = function(tags){ .... }
			      .get(function(no){console.log("NO!", no)})
			      .val(function(yes){console.log("YES!", yes)})
		});

		it.only('Check that events are called with multiple instances', function(done){
			var gunA = Gun( { file : "A.json" } );
			var gunB = Gun( { file : "B.json" });
			var gunC = Gun( { file : "C.json" });

			gunA.get( "some path A" ).map(function(v,f){ console.log( "event on A: ", f, v ) } );
			gunB.get( "some path B" ).map(function(v,f){ console.log( "event on B: ", f, v ) } );
			gunC.get( "some path C" ).map(function(v,f){ console.log( "event on C: ", f, v ) } );

			gunA.get( "some path A" ).put( { simple:"message" } );
			gunB.get( "some path B" ).put( { simple:"message" } );
			gunC.get( "some path C" ).put( { simple:"message" } );
		});

		it.only('Make sure circular contexts are not copied', function(done){
			/* let's define an appropriate deep default database... */
			var dfltSansUsers = { 1: { name : "org1", sites : { 1: {name : "site1"} } } };

			var alice =  {name: "alice" }

			var gun = Gun();

			var root = gun.get( "root" );
			root.put( dfltSansUsers );

			var alice = gun.get( "alice" ).put( { name: "alice" } );
			console.log( "Failed after this" );
			root.path( "1.sites.1.users" ).put( { 1: alice } );
			console.log( "Failed before this" );
		});

		it.only('get any any none', function(done){
			gun.get('full/none').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				console.log("*****", data);
				expect(data).to.be(undefined);
			});
			gun.get('full/none').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				console.log("*****2", data);
				expect(data).to.be(undefined);
				done();
			});
		});

		it('get any any none later', function(done){
			gun.get('full/none/later').get(function(at, ev){
				var err = at.err, data = at.put, field = at.get;
				//console.log("*****", data);
				expect(data).to.be(undefined);
			});
			setTimeout(function(){
				gun.get('full/none/later').get(function(at, ev){
					var err = at.err, data = at.put, field = at.get;
					//console.log("*****2", data);
					expect(data).to.be(undefined);
					done();
				});
			},400);
		});return;

		it('get get any parallel', function(done){
			var s = Gun.state.map();s.soul = 'parallel/get/get';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!"
				}
			}, s)});
			gun.get('parallel/get/get').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 1", data);
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
			});
			gun.get('parallel/get/get').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 2", data);
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
				done();
			});
		});

		it('get get any parallel later', function(done){
			var s = Gun.state.map();s.soul = 'parallel/get/get/later';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!"
				}
			}, s)});
			gun.get('parallel/get/get/later').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 1", data);
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
			});
			setTimeout(function(){
				gun.get('parallel/get/get/later').path('bob').any(function(err, data, field, at, ev){
					//console.log("***** 2", data);
					expect(data.age).to.be(29);
					expect(data.name).to.be('Bob!');
					done();
				});
			},400);
		});

		it('get get any none', function(done){
			var s = Gun.state.map();s.soul = 'get/get/none';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				alice: {
					age: 31,
					name: "alice"
				}
			}, s)});
			var c = 0, s = 0;
			gun.get('get/get/none').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 1", data);
				c++;
				s = 0;
				expect(data).to.be(undefined);
			});
			s = 1;
			gun.get('get/get/none').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 2", data);
				c++;
				//if(s){ c++ } // TODO: Talk to Jesse about this.
				expect(data).to.be(undefined);
				if(2 === c){ // We want 2 replies for each `any`, once from LS replying with the soul (but not the field), and once from WSP replying that the soul couldn't be found.
					// Wrong! I think we've changed this, such that lS handles it alone and not WSP.
					done();
				}
			});
		});

		it('get get any none later', function(done){
			var s = Gun.state.map();s.soul = 'get/get/none/later';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				alice: {
					age: 31,
					name: "alice"
				}
			}, s)});
			var c = 0;
			gun.get('get/get/none/later').path('bob').any(function(err, data, field, at, ev){
				//console.log("***** 1", data);
				c++;
				expect(data).to.be(undefined);
			});
			setTimeout(function(){
				gun.get('get/get/none/later').path('bob').any(function(err, data, field, at, ev){
					//console.log("***** 2", data);
					c++;
					expect(data).to.be(undefined);
					//if(3 === c){ // Because we already have active listeners cached waiting for data to pipe in, BUT we have already received multiple responses that the data isn't found, the "not found" is cached and so we get an immediate response just from cache. If later data does get piped in, this will still get called.
						done();
					//}
				});
			},400);
		});

		it('get get primitive get any', function(done){
			var s = Gun.state.map();s.soul = 'get/get/prim';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: "is awesome"
			}, s)});
			gun.get('get/get/prim').path('bob').path('age').any(function(err, data, field, at, ev){
				//console.log("***** 1", data);
				expect(data).to.be(undefined);
			});
			gun.get('get/get/prim').path('bob').path('age').any(function(err, data, field, at, ev){
				//console.log("***** 2", data);
				expect(data).to.be(undefined);
				done();
			});
		});

		it('get put any', function(done){
			var s = Gun.state.map();s.soul = 'get/put/any';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				here: "we go"
			}, s)});
			//console.debug.i=1;console.log("---------------");
			gun.get('get/put/any')
				.put({})
				.any(function(err, data, field, at, ev){
					//console.log("***** 1", data);
					done();
			});
		});
		return;
		it('get any, get put any', function(done){
			var s = Gun.state.map();s.soul = 'get/any/get/put/any';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				here: "we go"
			}, s)});
			gun.get('get/any/get/put/any')
				.any(function(err, data, field, at, ev){
					if(done.first){ return } // it is okay for `any` to get called multiple times.
					//console.log("***** 1", data);
					expect(data.here).to.be('we go');
					if(done.first){
						expect(data.yes).to.be('please');
					}
					done.first=1;
			});
			setTimeout(function(){
				gun.get('get/any/get/put/any')
					.put({yes: 'please'})
					.any(function(err, data, field, at, ev){
						if(done.second){ return } // it is okay for `any` to get called multiple times.
						//console.log("***** 2", data);
						expect(data.here).to.be('we go');
						expect(data.yes).to.be('please');
						done();
						done.second = 1;
				});
			},400);
		});

		it('mutate pointer to primitive deep on', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			gun.get('change/pointer').path('bob').path('pet').any(function(err, data, f, at, ev){
				//console.log("***", data);return setTimeout(function(){asdf},500);
				if(done.c){
					expect(data).to.be(undefined);
					return;
				}
				expect(data.name).to.be('Fluffy');
				expect(data.species).to.be('kitty');
				done.c = 1;
			});
			setTimeout(function(){
				gun.get('change/pointer').put({
					bob: null
				});
				setTimeout(function(){
					gun.get('change/pointer').put({
						bob: "hello!"
					});
				},400);
			},400);
			gun.get('change/pointer').any(function(err, data){
				//console.log("****************", data);
				if(2 <= done.e && data.bob){
					expect(data.bob).to.be('hello!');
					done();
					return;
				}
				if(1 <= done.e){
					expect(data.bob).to.be(null);
					done.e = 2;
					return;
				}
				expect(Gun.val.rel.is(data.bob)).to.be.ok();
				done.e = 1;
			});
		});

		it('get only soul', function(done){
			var s = Gun.state.map();s.soul = 'only/soul';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			gun.get('only/soul')/*.path('bob')*/.any(function(err, data){
				expect(Gun.obj.empty(data, '_')).to.be.ok();
				done();
			}, {'.': null});
		});

		it('get path only soul', function(done){
			var s = Gun.state.map();s.soul = 'only/p/soul';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			gun.get('only/p/soul').path('bob').any(function(err, data){
				//console.log("*********", err, data);
				expect(Gun.val.rel.is(data)).to.be.ok();
				//expect(Gun.obj.empty(data, '_')).to.be.ok();
				done();
			}, {'.': null});
		});

		it('mutate pointer to self', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer/point';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			gun.get('change/pointer/point').path('bob').any(function(err, data){
				if(done.c){
					expect(data.age).to.be(30);
					expect(data.name).to.be('Bob!');
					expect(Gun.val.rel.is(data.pet)).to.be.ok();
					expect(done.c).to.be(1);
					done();
					done.c = 2;
					return;
				}
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
				expect(Gun.val.rel.is(data.pet)).to.be.ok();
				done.c=1;
			});
			setTimeout(function(){
				gun.get('change/pointer/point').path('bob').put({age: 30});
			},400);
		});
		it('mutate pointer to self deep', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer/point/deep';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			gun.get('change/pointer/point/deep').path('bob').any(function(err, data){
				//console.log("***", data);
				if(done.c){
					expect(data.age).to.be(30);
					expect(data.name).to.be('Bob!');
					expect(Gun.val.rel.is(data.pet)).to.be.ok();
					done();
					return;
				}
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
				expect(Gun.val.rel.is(data.pet)).to.be.ok();
				done.c=1;
			});
			setTimeout(function(){
				gun.get('change/pointer/point/deep').path('bob').path('age').put(30);
			},400);
		});

		it('mutate pointer to primitive after any', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer/to/prime';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {_: {'#': 'asdffdsa'},
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			var bob = gun.get('asdffdsa').any(function(err, data){
				//console.log("***", data);
			});
			gun.get('change/pointer/to/prime').path('bob').any(function(err, data, f, at){
				//console.log("***********", data);
				if(!Gun.obj.is(data)){
					expect(data).to.be(3);
					if(done.c){return}
					done();done.c=1;
					return;
				}
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
				expect(Gun.val.rel.is(data.pet)).to.be.ok();
			});
			setTimeout(function(){
				gun.get('change/pointer/to/prime').path('bob').put(3);
				setTimeout(function(){
					bob.put({age: 30});
				},100);
			},400);
		});

		it('mutate pointer to primitive after any deep', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer/to/prime/deep';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {_: {'#': 'sadffads'},
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			var cat = gun.get('sadffads').any(function(err, data){
				//console.log("***", data);
			});
			gun.get('change/pointer/to/prime/deep').path('bob').path('pet').any(function(err, data){
				//console.log("*********", data);
				if(!Gun.obj.is(data)){
					expect(data).to.be(undefined);
					if(done.c){return}
					done();done.c=1;
					return;
				}
				expect(data.species).to.be('kitty');
				expect(data.name).to.be('Fluffy');
			});
			setTimeout(function(){
				gun.get('change/pointer/to/prime/deep').path('bob').put(3);
				setTimeout(function(){
					cat.put({laser_eyes: true});
				},100);
			},400);
		});
		return;
		it.only('mutate pointer to another pointer after any', function(done){
			var s = Gun.state.map();s.soul = 'change/pointer/to/pointer';
			Gun.on('put', {gun: gun, put: Gun.graph.ify({
				bob: {_: {'#': 'dafssfad'},
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			}, s)});
			var bob = gun.get('dafssfad').any(function(err, data){
				console.log("***", data);
			});
			console.debug.i=1;console.log("--------------------");
			gun.get('change/pointer/to/pointer').path('bob').any(function(err, data){
				console.log("*********", data);return;
				if(done.soul && done.soul !== Gun.node.soul(data)){
					expect(Gun.node.soul(data)).to.be('fsdaadsf');
					expect(data.cat).to.be(true);
					expect(data.age).to.not.be.ok();
					expect(data.name).to.not.be.ok();
					expect(data.pet).to.not.be.ok();
					if(done.c){return}
					done();done.c=1;
					return;
				}
				expect(done.soul = Gun.node.soul(data)).to.be('dafssfad');
				expect(data.age).to.be(29);
				expect(data.name).to.be('Bob!');
				expect(Gun.val.rel.is(data.pet)).to.be.ok();
			});
			return;
			setTimeout(function(){
				gun.get('change/pointer/to/pointer').path('bob').put(Gun.node.ify({cat: true}, 'fsdaadsf'));
				setTimeout(function(){
					bob.put({age: 30});
				},100);
			},400);
		});
		return;
		it.only('deep freeze put', function(done){
			gun.get('deep/freeze').put({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			});
			gun.get('deep/freeze').path('bob').path('pet').any(function(err, data){
				console.log("********************", data);
				expect(data.name).to.be('Fluffy');
				expect(data.species).to.be('kitty');
				setTimeout(function(){
					done();
				},100);
			});
		});

		it('deep freezing put', function(done){
			gun.get('deep/freeze/ing').put({
				bob: {
					age: 29,
					name: "Bob!",
					pet: {
						name: "Fluffy",
						species: "kitty"
					}
				}
			});
			gun.get('deep/freeze/ing').path('bob').path('pet').any(function(err, data){
				//console.log("******** bob's pet", data);
				if(done.c){
					expect(data).to.be(undefined);
					return;
				}
				expect(data.name).to.be('Fluffy');
				expect(data.species).to.be('kitty');
				done.c=1;
			});
			gun.get('deep/freeze/ing').put({bob: 'lol'});
			gun.get('deep/freeze/ing').path('bob').path('pet').any(function(err, data){
				//console.log("********* 2 bob's pet", data);return;
				expect(data).to.be(undefined);
				done();
			});
		});
		return;
		it('put put put put', function(){
			var gun = Gun();
			var get = gun.get('put/put/put/put');
			get.put({});
			get.put({
				all: {
					the: {
						way: 'down'
					}
				}
			});
			get.put({foo: 'bar'});
			get.any(function(err,data){
				//console.log("data", data);
				expect(Gun.val.rel.is(data.all)).to.be.ok();
				expect(data.foo).to.be('bar');
			});
		});

		it('perf put', function(done){
			var gun = Gun();
			var hey = gun.get('heylo');
			hey.put({hello: "world"});
			hey.any(function(err, data){
				expect(data.hello).to.be('world');
				done();
			});
		});

		it('put', function(done){
			gun.put("hello", function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});

		it('put NaN', function(done){
			gun.put({num: NaN}, function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});

		it('put date', function(done){
			gun.put({date: new Date()}, function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});

		it('put regex', function(done){
			gun.put({reg: /regex/i}, function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});

		it('put node', function(done){
			gun.put({hello: "world"}, function(err, ok){
				expect(err).to.not.be.ok();
				done();
			});
		});

		it('put node then value', function(done){
			var ref = gun.put({hello: "world"});
			//console.log("---------");
>>>>>>> 95280b8... v0.9.x ! Try S3 again?
			ref.put('hello', function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('put node then put', function(done){
			gun.put({hello: "world"}).put({goodbye: "world"}, function(err, ok){
				expect(err).to.not.be.ok();
				done();
			});
		});
		
		it('put node key get', function(done){
			gun.put({hello: "key"}).key('yes/key', function(err, ok){
				expect(err).to.not.be.ok();
			}).get('yes/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return done(), true }
					expect(node.hello).to.be('key');
				});
			});
		});
		
		it('put node key gun get', function(done){
			gun.put({hello: "a key"}).key('yes/a/key', function(err, ok){
				expect(err).to.not.be.ok();
			});
			
			gun.get('yes/a/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return done(), true }
					expect(node.hello).to.be('a key');
				});
			});
		});
		
		it('gun key', function(){ // Revisit this behavior?
			try{ gun.key('fail/key') }
			catch(err){
				expect(err).to.be.ok();
			}
		});
		
		it('get key', function(done){
			gun.get('yes/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return }
					expect(node.hello).to.be('key');
				});
			}).key('hello/key', function(err, ok){
				expect(err).to.not.be.ok();
				done.key = true;
				if(done.yes){ done() }
			}).key('yes/hello', function(err, ok){
				expect(err).to.not.be.ok();
				done.yes = true;
				if(done.key){ done() }
			});
		});
		
		it('get key null', function(done){
			gun.get('yes/key').key('', function(err, ok){
				expect(err).to.be.ok();
				done();
			});
		});
		
		it('get node put node merge', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					done.soul = Gun.is.soul.on(node);
				});
			}).put({hi: 'you'}, function(err, ok){
				expect(err).to.not.be.ok();
				var node = gun.__.graph[done.soul];
				expect(node.hello).to.be('key');
				expect(node.hi).to.be('you');
				done();
			});
		});
		
		it('get null put node never', function(done){ // TODO: GET returns nothing, and then doing a PUT?
			gun.get(null, function(err, ok){
				expect(err).to.be.ok();
				done.err = true;
			}).put({hi: 'you'}, function(err, ok){
				done.flag = true;
			});
			setTimeout(function(){
				expect(done.err).to.be.ok();
				expect(done.flag).to.not.be.ok();
				done();
			}, 500);
		});
		
		/* // not sure what this is suppose to do. Review later
		it('get key no data put', function(done){
			gun.get('this/key/definitely/does/not/exist', function(err, data){
				expect(err).to.not.be.ok();
				expect(data).to.not.be.ok();
			}).put({testing: 'stuff'}, function(err, ok){
				console.log("what?", err, ok);
				expect(err).to.not.be.ok();
				var node = gun.__.graph[done.soul];
				expect(node.hello).to.be('key');
				expect(node.hi).to.be('overwritten');
				done();
			});
		});
		*/
		
		it('get node put node merge conflict', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return true }
					expect(node.hi).to.be('you');
					done.soul = Gun.is.soul.on(node);
				});
			}).put({hi: 'overwritten'}, function(err, ok){
				expect(err).to.not.be.ok();
				var node = gun.__.graph[done.soul];
				expect(node.hello).to.be('key');
				expect(node.hi).to.be('overwritten');
				done();
			});
		});
		
		it('get node path', function(done){
			gun.get('hello/key').path('hi', function(err, val){
				if(done.end){ return } // it is okay for path's callback to be called multiple times.
				expect(err).to.not.be.ok();
				expect(val).to.be('overwritten');
				done(); done.end = true;
			});
		});
		
		it('get node path put value', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return true }
					expect(node.hi).to.be('overwritten');
					done.soul = Gun.is.soul.on(node);
				});
			}).path('hi').put('again', function(err, ok){
				expect(err).to.not.be.ok();
				var node = gun.__.graph[done.soul];
				expect(node.hello).to.be('key');
				expect(node.hi).to.be('again');
				done();
			});
		});
		
		it('get node path put object', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return true }
					expect(node.hi).to.be('again');
					done.soul = Gun.is.soul.on(node);
				});
			}).path('hi').put({yay: "value"}, function(err, ok){
				expect(err).to.not.be.ok();
				var root = gun.__.graph[done.soul];
				expect(root.hello).to.be('key');
				expect(root.yay).to.not.be.ok();
				expect(Gun.is.soul(root.hi)).to.be.ok();
				expect(Gun.is.soul(root.hi)).to.not.be(done.soul);
				done();
			});
		});
		
		it('get node path put object merge', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return true }
					expect(done.ref = Gun.is.soul(node.hi)).to.be.ok();
					done.soul = Gun.is.soul.on(node);
				});
			}).path('hi').put({happy: "faces"}, function(err, ok){
				expect(err).to.not.be.ok();
				var root = gun.__.graph[done.soul];
				var sub = gun.__.graph[done.ref];
				expect(root.hello).to.be('key');
				expect(root.yay).to.not.be.ok();
				expect(Gun.is.soul.on(sub)).to.be(done.ref);
				expect(sub.yay).to.be('value');
				expect(sub.happy).to.be('faces');
				done();
			});
		});
		
		it('get node path put value conflict relation', function(done){
			gun.get('hello/key', function(err, data){
				expect(err).to.not.be.ok();
				var c = 0;
				Gun.is.graph(data, function(node){
					expect(c++).to.be(0);
					if(Gun.obj.empty(node, Gun._.meta)){ return true }
					expect(done.ref = Gun.is.soul(node.hi)).to.be.ok();
					done.soul = Gun.is.soul.on(node);
				});
			}).path('hi').put('crushed', function(err, ok){
				expect(err).to.not.be.ok();
				var root = gun.__.graph[done.soul];
				var sub = gun.__.graph[done.ref];
				expect(root.hello).to.be('key');
				expect(root.yay).to.not.be.ok();
				expect(Gun.is.soul.on(sub)).to.be(done.ref);
				expect(sub.yay).to.be('value');
				expect(sub.happy).to.be('faces');
				expect(root.hi).to.be('crushed');
				done();
			});
		});
		
		/* // Future feature!
		it('put gun node', function(done){
			var mark = gun.put({age: 23, name: "Mark Nadal"});
			var amber = gun.put({age: 23, name: "Amber Nadal"});
			mark.path('wife').put(amber, function(err){
				expect(err).to.not.be.ok();
				expect(false).to.be.ok(); // what whatttt???
			});
		});
		*/
		
		it('put val', function(done){
			gun.put({hello: "world"}).val(function(val){
				expect(val.hello).to.be('world');
				done();
			});
		});
		
		it('put key val', function(done){
			gun.put({hello: "world"}).key('hello/world').val(function(val){
				expect(val.hello).to.be('world');
				done();
			});
		});
		
		it('get', function(done){
			gun.get('hello/world').val(function(val){
				expect(val.hello).to.be('world');
				done();
			});
		});
		
		it('get path', function(done){
			gun.get('hello/world').path('hello').val(function(val){
				expect(val).to.be('world');
				done();
			});
		});
		
		it('get put path', function(done){
			gun.get('hello/world').put({hello: 'Mark'}).path('hello').val(function(val){
				expect(val).to.be('Mark');
				done();
			});
		});
		
		it('get path put', function(done){
			gun.get('hello/world').path('hello').put('World').val(function(val){
				expect(val).to.be('World');
				done();
			});
		});
		
		it('get path empty put', function(done){
			gun.get('hello/world').path('earth').put('mars').val(function(val){
				expect(val).to.be('mars');
				done();
			});
		});
		
		it('get path val', function(done){
			gun.get('hello/world').path('earth').val(function(val){
				expect(val).to.be('mars');
				done();
			});
		});
		
		/* // CHANGELOG: This behavior is no longer allowed! Sorry peeps.
		it('key put val', function(done){
			gun.key('world/hello').put({world: "hello"}).val(function(val){
				expect(val.world).to.be('hello');
				done();
			});
		});
		
		it('get again', function(done){
			gun.get('world/hello').val(function(val){
				expect(val.world).to.be('hello');
				done();
			});
		});
		*/
		
		it('get not kick val', function(done){
			gun.get("some/empty/thing").not(function(){ // that if you call not first
				return this.put({now: 'exists'}).key("some/empty/thing"); // you can put stuff
			}).val(function(val){ // and THEN still retrieve it.
				expect(val.now).to.be('exists');
				done();
			});
		});
		
		it('get not kick val when it already exists', function(done){
			gun.get("some/empty/thing").not(function(){
				return this.put({now: 'THIS SHOULD NOT HAPPEN'});
			}).val(function(val){
				expect(val.now).to.be('exists');
				done();
			});
		});
		
		it('put path val sub', function(done){
			gun.put({last: {some: 'object'}}).path('last').val(function(val){
				expect(val.some).to.be('object');
				done();
			});
		});
		
		it('get put null', function(done){
			gun.put({last: {some: 'object'}}).path('last').val(function(val){
				expect(val.some).to.be('object');
			}).put(null).val(function(val){
				expect(val).to.be(null);
				done();
			});
		});
		
		it('Gun get put null', function(done){ // flip flop bug
			var gun = Gun();
			gun.put({last: {some: 'object'}}).path('last').val(function(val, field){
				done.some = true;
				//console.log("*******************************", field, val);
				expect(val.some).to.be('object');
			}).put(null).val(function(val, field){
				//console.log("***************null****************", field, val);
				expect(val).to.be(null);
				expect(done.some).to.be.ok();
				done();
			});
		});
		
		it('var put key path', function(done){ // contexts should be able to be saved to a variable
			var foo = gun.put({foo: 'bar'}).key('foo/bar');
			foo.path('hello.world.nowhere'); // this should become a sub-context, that doesn't alter the original
			setTimeout(function(){
				foo.path('foo').val(function(val){ // and then the original should be able to be reused later
					expect(val).to.be('bar'); // this should work
					done();
				});
			}, 500);
		});
		
		it('var get path', function(done){ // contexts should be able to be saved to a variable
			var foo = gun.get('foo/bar');
			foo.path('hello.world.nowhere'); // this should become a sub-context, that doesn't alter the original
			setTimeout(function(){
				foo.path('foo').val(function(val){ // and then the original should be able to be reused later
					expect(val).to.be('bar'); // this should work
					done();
				});
			}, 500);
		});
		
		it('get not put val path val', function(done){
			gun.get("examples/list/foobar").not(function(){
				return this.put({
					id: 'foobar',
					title: 'awesome title',
					todos: {}
				}).key("examples/list/foobar");
			}).val(function(data){
				expect(data.id).to.be('foobar');
			}).path('todos').val(function(todos){
				expect(todos).to.not.have.property('id');
				done();
			});
		});
		
		it('put circular ref', function(done){
			var data = {};
			data[0] = "DATA!";
			data.a = {c: 'd', e: 1, f: true};
			data.b = {x: 2, y: 'z'};
			data.a.kid = data.b;
			data.b.parent = data.a;
			gun.put(data, function(err, ok){
				expect(err).to.not.be.ok();
			}).val(function(val){
				var a = gun.__.graph[Gun.is.soul(val.a)];
				var b = gun.__.graph[Gun.is.soul(val.b)];
				expect(Gun.is.soul(val.a)).to.be(Gun.is.soul.on(a));
				expect(Gun.is.soul(val.b)).to.be(Gun.is.soul.on(b));
				expect(Gun.is.soul(a.kid)).to.be(Gun.is.soul.on(b));
				expect(Gun.is.soul(b.parent)).to.be(Gun.is.soul.on(a));
				done();
			});
		});

		it('put circular deep', function(done){
			var mark = {
				age: 23,
				name: "Mark Nadal"
			}
			var amber = {
				age: 23,
				name: "Amber Nadal",
				phd: true
			}
			mark.wife = amber;
			amber.husband = mark;
			var cat = {
				age: 3,
				name: "Hobbes"
			}
			mark.pet = cat;
			amber.pet = cat;
			cat.owner = mark;
			cat.master = amber;
			gun.put(mark, function(err, ok){
				expect(err).to.not.be.ok();
			}).val(function(val){
				expect(val.age).to.be(23);
				expect(val.name).to.be("Mark Nadal");
				expect(Gun.is.soul(val.wife)).to.be.ok();
				expect(Gun.is.soul(val.pet)).to.be.ok();
			}).path('wife.pet.name').val(function(val){
				expect(val).to.be('Hobbes');
			}).back.path('pet.master').val(function(val){
				expect(val.name).to.be("Amber Nadal");
				expect(val.phd).to.be.ok();
				expect(val.age).to.be(23);
				expect(Gun.is.soul(val.pet)).to.be.ok();
				done();
			});
		});
		
		it('put partial sub merge', function(done){
			var mark = gun.put({name: "Mark", wife: { name: "Amber" }}).key('person/mark').val(function(mark){
				expect(mark.name).to.be("Mark");
			});

			mark.put({age: 23, wife: {age: 23}});
			
			setTimeout(function(){
				mark.put({citizen: "USA", wife: {citizen: "USA"}}).val(function(mark){
					expect(mark.name).to.be("Mark");
					expect(mark.age).to.be(23);
					expect(mark.citizen).to.be("USA");
					this.path('wife').val(function(Amber){
						expect(Amber.name).to.be("Amber");
						expect(Amber.age).to.be(23);
						expect(Amber.citizen).to.be("USA");
						done();
					});
				});
			}, 500);
		});
		
		it('path path', function(done){
			var deep = gun.put({some: {deeply: {nested: 'value'}}});
			deep.path('some.deeply.nested').val(function(val){
				expect(val).to.be('value');
			});
			deep.path('some').path('deeply').path('nested').val(function(val){
				expect(val).to.be('value');
				done();
			});
		});
		
		it('context null put value val error', function(done){
			gun.put("oh yes", function(err){
				expect(err).to.be.ok();
				done();
			});
		});
		
		var foo;
		it('context null put node', function(done){
			foo = gun.put({foo: 'bar'}).val(function(obj){
				expect(obj.foo).to.be('bar');
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('context node put val', function(done){
			// EFFECTIVELY a TIMEOUT from the previous test. NO LONGER!
			foo.put('banana', function(err){
				expect(err).to.be.ok();
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('context node put node', function(done){
			// EFFECTIVELY a TIMEOUT from the previous test. NO LONGER!
			foo.put({bar: {zoo: 'who'}}).val(function(obj){
				expect(obj.foo).to.be('bar');
				expect(Gun.is.soul(obj.bar)).to.ok();
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('context node and field put value', function(done){
			// EFFECTIVELY a TIMEOUT from the previous test. NO LONGER!
			var tar = foo.path('tar');
			tar.put('zebra').val(function(val){
				expect(val).to.be('zebra');
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		var bar;
		it('context node and field of relation put node', function(done){
			// EFFECTIVELY a TIMEOUT from the previous test. NO LONGER!
			bar = foo.path('bar');
			bar.put({combo: 'double'}).val(function(obj){
				expect(obj.zoo).to.be('who');
				expect(obj.combo).to.be('double');
				done(); //setTimeout(function(){ done() },1);
			});
		});
		
		it('context node and field, put node', function(done){
			// EFFECTIVELY a TIMEOUT from the previous test. NO LONGER!
			bar.path('combo').put({another: 'node'}).val(function(obj){
				expect(obj.another).to.be('node');
				bar.val(function(node){
					expect(Gun.is.soul(node.combo)).to.be.ok();
					expect(Gun.is.soul(node.combo)).to.be(Gun.is.soul.on(obj));
					done(); //setTimeout(function(){ done() },1);
				});
			});
		});
		
		it('val path put val', function(done){
			var gun = Gun();
			
			var al = gun.put({gender:'m', age:30, name:'alfred'}).key('user/alfred');
			var beth = gun.put({gender:'f', age:22, name:'beth'  }).key('user/beth');
			
			al.val(function(a){
				beth.path('friend').put(a).val(function(aa){
					expect(Gun.is.soul.on(a)).to.be(Gun.is.soul.on(aa));
					done();
				});
			});
			
		});
		
		it('val path put val key', function(done){ // bug discovered from Jose's visualizer
			var gun = Gun(), s = Gun.time.is(), n = function(){ return Gun.time.is() }
			this.timeout(5000);
			
			gun.put({gender:'m', age:30, name:'alfred'}).key('user/alfred');
			gun.put({gender:'f', age:22, name:'beth'  }).key('user/beth');
			gun.get('user/alfred').val(function(a){
				gun.get('user/beth').path('friend').put(a); // b - friend_of -> a
				gun.get('user/beth').val(function(b){
					gun.get('user/alfred').path('friend').put(b).val(function(beth){ // a - friend_of -> b
						gun.get('user/beth').path('cat').put({name: "fluffy", age: 3, coat: "tabby"}).val(function(cat){
							
							gun.get('user/alfred').path('friend.cat').key('the/cat');
							
							gun.get('the/cat').val(function(c){
								expect(c.name).to.be('fluffy');
								expect(c.age).to.be(3);
								expect(c.coat).to.be('tabby');
								done();
							});
						});
					});
				});
			});
		});
		
		it('map', function(done){
			var c = 0, set = gun.put({a: {here: 'you'}, b: {go: 'dear'}, c: {sir: '!'} });
			set.map(function(obj, field){
				c++;
				if(field === 'a'){
					expect(obj.here).to.be('you');
				}
				if(field === 'b'){
					expect(obj.go).to.be('dear');	
				}
				if(field === 'c'){
					expect(obj.sir).to.be('!');
				}
				if(c === 3){
					done();
				}
			})
		});
		
		it('key soul', function(done){
			var gun = Gun();
			gun.key('me', function(err, ok){
				expect(err).to.not.be.ok();
				expect(gun.__.key.s['me']).to.be.ok();
				Gun.is.graph(gun.__.key.s['me'], function(node, soul){ done.soul = soul });
				expect(done.soul).to.be.ok('qwertyasdfzxcv');
				done();
			}, 'qwertyasdfzxcv');
		});
		
		it('no false positive null emit', function(done){
			var gun = Gun({hooks: {get: function(key, cb){
				var g = {};
				g[soul] = {_: {'#': soul, '>': {'a': 0}},
					'a': 'b'
				};
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul, '>': {'c': 0}},
					'c': 'd'
				};
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul }};
				cb(null, g);
				cb(); // false trigger!
			}}}), soul = Gun.text.random();
			
			gun.get('me').not(function(){
				done.fail = true;
			}).val(function(val){
				setTimeout(function(){
					expect(val.a).to.be('b');
					expect(val.c).to.be('d');
					expect(done.fail).to.not.be.ok();
					done();
				},5);
			});
		});
		
		it('unique val on stream', function(done){
			var gun = Gun({hooks: {get: function(key, cb){
				var g = {};
				g[soul] = {_: {'#': soul, '>': {'a': 0}},
					'a': 'b'
				};
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul, '>': {'c': 0}},
					'c': 'd'
				}; 
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul }};
				cb(null, g);
			}}}), soul = Gun.text.random();
			
			gun.get('me').val(function(val){
				done.count = (done.count || 0) + 1;
				setTimeout(function(){
					expect(val.a).to.be('b');
					expect(val.c).to.be('d');
					expect(done.count).to.be(1);
					done();
				},5);
			});
		});
		
		it('unique path val on stream', function(done){
			var gun = Gun({hooks: {get: function(key, cb){
				var g = {};
				g[soul] = {_: {'#': soul, '>': {'a': 0}},
					'a': 'a'
				};
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul, '>': {'a': 1}},
					'a': 'b'
				};
				cb(null, g);
				g = {};
				g[soul] = {_: {'#': soul }};
				cb(null, g);
			}}}), soul = Gun.text.random();
			
			gun.get('me').path('a').val(function(val){
				done.count = (done.count || 0) + 1;
				setTimeout(function(){
					expect(val).to.be('b');
					expect(done.count).to.be(1);
					done();
				},5);
			});
		});
		
		it('double not', function(done){ // from the thought tutorial
			var gun = Gun().get('thoughts').not(function(key){
				return this.put({}).key(key);
			});
			
			setTimeout(function(){
				gun.not(function(){
					console.log("DOUBLE NOT!!!!!!");
					done.not = true;
				}).val(function(){
					expect(done.not).to.not.be.ok();
					done();
				})
			}, 10);
		});

		it('set', function(done){
			done.c = 0;
			var gun = Gun();
			gun.get('set').set().set().val(function(val){
				done.c += 1;
				expect(Gun.obj.empty(val, Gun._.meta)).to.be.ok();
				setTimeout(function(){ 
					expect(done.c).to.be(1);
					done() 
				},10)
			});
		});
		
		it('set multiple', function(done){ // kinda related to flip flop?
			var gun = Gun().get('sets').set(), i = 0;
			gun.val(function(val){
				expect(done.soul = Gun.is.soul.on(val)).to.be.ok();
				expect(Gun.obj.empty(val, Gun._.meta)).to.be.ok();
			});
			
			gun.set(1).set(2).set(3).set(4); // if you set an object you'd have to do a `.back`
			gun.map().val(function(val, field){
				i += 1;
				expect(val).to.be(i);
				if(i % 4 === 0){
					setTimeout(function(){
						done.i = 0;
						Gun.obj.map(gun.__.graph, function(){ done.i++ });
						expect(done.i).to.be(1); // make sure there isn't double.
						Gun.log.verbose = false;
						done() 
					},10);
				}
			});
		});
		
		it('peer 1 get key, peer 2 put key, peer 1 val', function(done){
			var hooks = {get: function(key, cb, opt){
				cb();
			}, put: function(nodes, cb, opt){
				//console.log("put hook", nodes);
				Gun.union(gun1, nodes);
				cb();
			}, key: function(key, soul, cb, opt){
				//console.log("key hook", key, soul);
				gun1.key(key, null, soul);
				cb();
			}},
			gun1 = Gun({hooks: {get: hooks.get}}).get('race')
			, gun2 = Gun({hooks: hooks}).get('race');
			
			setTimeout(function(){
				gun2.put({the: 'data'}).key('race');
				setTimeout(function(){
					gun1.on(function(val){
						expect(val.the).to.be('data');
						done();
					});
				},10);
			},10);
		});
		
		it('get pseudo merge', function(done){
			var gun = Gun();
			
			gun.put({a: 1, z: -1}).key('pseudo');
			gun.put({b: 2, z: 0}).key('pseudo');
			
			gun.get('pseudo').val(function(val){
				expect(val.a).to.be(1);
				expect(val.b).to.be(2);
				expect(val.z).to.be(0);
				done();
			});
		});
		
		it('get pseudo merge on', function(done){
			var gun = Gun();
			
			gun.put({a: 1, z: -1}).key('pseudon');
			gun.put({b: 2, z: 0}).key('pseudon');
			
			gun.get('pseudon').on(function(val){
				if(done.val){ return } // TODO: Maybe prevent repeat ons where there is no diff? (may not happen to after 1.0.0) 
				done.val = val;
				expect(val.a).to.be(1);
				expect(val.b).to.be(2);
				expect(val.z).to.be(0);
				done();
			});
		});
		
		it('get pseudo merge across peers', function(done){
			Gun.on('opt').event(function(gun, o){
				if(connect){ return }
				gun.__.opt.hooks = {get: function(key, cb, opt){
					var other = (o.alice? gun2 : gun1);
					if(connect){
						//console.log('connect to peer and get', key);
						other.get(key, cb);
					} else {
						cb();
					}
				}, put: function(nodes, cb, opt){
					var other = (o.alice? gun2 : gun1);
					if(connect){
						Gun.union(other, nodes);
					}
					cb();
				}, key: function(key, soul, cb, opt){
					var other = (o.alice? gun2 : gun1);
					if(connect){
						other.key(key, null, soul);
					}
					cb();
				}}
			});
			var connect, gun1 = Gun({alice: true}).get('pseudo/merge').not(function(){
				return this.put({hello: "world!"}).key('pseudo/merge');
			}), gun2;
			
			gun1.val(function(val){
				expect(val.hello).to.be('world!');
			});
			setTimeout(function(){
				gun2 = Gun({bob: true}).get('pseudo/merge').not(function(){
					return this.put({hi: "mars!"}).key('pseudo/merge');
				});
				gun2.val(function(val){
					expect(val.hi).to.be('mars!');
				});
				setTimeout(function(){
					// CONNECT THE TWO PEERS
					connect = true;
					gun1.get('pseudo/merge', null, {force: true}); // fake a browser refersh, in real world we should auto-reconnect
					gun2.get('pseudo/merge', null, {force: true}); // fake a browser refersh, in real world we should auto-reconnect
					setTimeout(function(){
						gun1.val(function(val){
							expect(val.hello).to.be('world!');
							expect(val.hi).to.be('mars!');
							done.gun1 = true;
						});
						gun2.val(function(val){
							expect(val.hello).to.be('world!');
							expect(val.hi).to.be('mars!');
							expect(done.gun1).to.be.ok();
							Gun({});
							done();
						});
					},10);
				},10);
			},10);
		});
				
		it("get map val -> map val", function(done){ // Terje's bug
			var gun = Gun(); // we can test GUN locally.
			var passengers = gun.get('passengers'); // this is now a list of passengers that we will map over.
			var ctx = {n: 0, d: 0, l: 0};
			passengers.map().val(function(passenger, id){
				this.map().val(function(change, field){
					//console.log("Passenger", passenger.name, "had", field, "change to:", change, '\n\n');
					if('name' == field){ expect(change).to.be(passenger.name); ctx.n++ }
					if('direction' == field){ expect(change).to.be(passenger.direction); ctx.d++ }
					if('location' == field){
						delete change._; ctx.l++;
						if('Bob' == passenger.name){
							expect(change).to.eql({'lat': '37.6159', 'lng': '-128.5'}); 
						} else {
							expect(change).to.eql({'lat': 'f37.6159', 'lng': 'f-128.5'}); 
						}
					}
					if(ctx.n == 2 && ctx.d == 2 && ctx.l == 2){ done() }
				});
			});
			var bob = passengers.set({
				name: "Bob",
				location: {'lat': '37.6159', 'lng': '-128.5'},
				direction: '128.2'
			});
			var fred = passengers.set({
				name: "Fred",
				location: {'lat': 'f37.6159', 'lng': 'f-128.5'},
				direction: 'f128.2'
			});
		});
				
		it("get map map val", function(done){ // Terje's bug
			var gun = Gun(); // we can test GUN locally.
			var passengers = gun.get('passengers/map'); // this is now a list of passengers that we will map over.
			var ctx = {n: 0, d: 0, l: 0};
			passengers.map().map().val(function(val, field){
				if('name' == field){ expect(val).to.be(!ctx.n? 'Bob' : 'Fred'); ctx.n++ }
				if('direction' == field){ expect(val).to.be(!ctx.d? '128.2' : 'f128.2'); ctx.d++ }
				if('location' == field){
					delete val._;
					if(!ctx.l){
						expect(val).to.eql({'lat': '37.6159', 'lng': '-128.5'}); 
					} else {
						expect(val).to.eql({'lat': 'f37.6159', 'lng': 'f-128.5'}); 
					}
					ctx.l++;
				}
				if(ctx.n == 2 && ctx.d == 2 && ctx.l == 2){ done() }
			});
			var bob = passengers.set({
				name: "Bob",
				location: {'lat': '37.6159', 'lng': '-128.5'},
				direction: '128.2'
			});
			setTimeout(function(){
				var fred = passengers.set({
					name: "Fred",
					location: {'lat': 'f37.6159', 'lng': 'f-128.5'},
					direction: 'f128.2'
				});
			},100);
		});
				
		it("get map path val", function(done){ // Terje's bug
			var gun = Gun();
			var ctx = {l: -1, d: 0};
			var passengers = gun.get('passengers/path');
			passengers.map().path('location.lng').val(function(val, field){
				expect(field).to.be('lng');
				if(ctx.l){
					expect(val).to.be('-128.5'); 
				} else {
					expect(val).to.eql('f-128.5'); 
				}
				ctx.l++;
				if(ctx.l){ done() }
			});
			var bob = passengers.set({
				name: "Bob",
				location: {'lat': '37.6159', 'lng': '-128.5'},
				direction: '128.2'
			});
			setTimeout(function(){
				var fred = passengers.set({
					name: "Fred",
					location: {'lat': 'f37.6159', 'lng': 'f-128.5'},
					direction: 'f128.2'
				});
			},100);
		});
		
		it("put path deep val -> path val", function(done){ // Terje's bug
			var gun = Gun();
			gun.put({you: {have: {got: {to: {be: {kidding: "me!"}}}}}}).path('you.have.got.to.be').val(function(val, field){
				expect(val.kidding).to.be('me!');
				this.path('kidding').val(function(val){
					expect(val).to.be('me!');
					done();
				});
			});
		});
		
		it("get set path put, map path val -> path val", function(done){ // Terje's bug
			var gun = Gun();
			var ctx = {l: -1, d: 0};
			var passengers = gun.get('passengers/set/path');
			passengers.set({name: 'Bob'}).path('direction').put({lol: {just: 'kidding', dude: '!'}}, function(err, ok){});
			passengers.map().path('direction.lol').val(function(val){
				this.path('just').val(function(val){
					expect(val).to.be('kidding');
				}).back.path('dude').val(function(val){
					expect(val).to.be('!');
					done();
				});
			})
		});
		
		it("gun get on, later gun put key", function(done){
			var gun = Gun();
			
			var keyC = gun.get('keyC').on(function(val){ 
				expect(val.hello).to.be('world');
				if(done.done){ return }
				done.done = true;
				done();
			});
			
			setTimeout(function(){
				gun.put({hello: 'world'}).key('keyC');
			}, 100);
		});
		/* // TODO: BUG! UNDO!
		it.only('gun get put, sub path put, original val', function(done){ // bug from Jesse working on Trace
			var gun = Gun().get('players');
			
			gun.put({
			  taken: true,
			  history: {0: {}, 1: {}}
			});

			gun
				.path('history')
				.put(null)
				.back
				.path('taken')
				.put(false)
			
			// TODO: BUG! There is a variation of this, where we just do `.val` rather than `gun.val` and `.val` by itself (chained off of the sub-paths) doesn't even get called. :(
			console.log('------------------');
			console.log("do we have a flag?", gun._.putFlag);
			gun.on(function(players){ // this val is subscribed to the original put and therefore does not get any of the sub-path listeners, therefore it gets called EARLY with the original/old data rather than waiting for the sub-path data to "finish" and then get called.
				console.log("LOOK HERE!!!!", players);
				expect(players.taken).to.be(false);
				expect(players.history).to.be(null);
				done();
			});
			console.log('------------------');
			
		});
		*/
		
		it.skip("gun put recursive path slowdown", function(done){
			this.timeout(20000);
			var gun = Gun(); //.get('bug').put({});
			console.log('wat the hook?', gun.__.opt.hooks.put);
			gun.__.opt.hooks.put = null;
			function put(num, t) {
				Gun.log.debug = 0;
				var now = new Date().getTime();
				var cb;
				for (var i = 1; i <= num; i++) {
					if (i === num) {
						cb = function (err, ok) {
							console.log(num + 'ops: ' + (new Date().getTime() - now)/1000 + 's');
						}
					}
					Gun.ify({   //hello: 'world'}, cb);
						deeply: {
							nested: i
						}
					})(cb);
				}
				return new Date().getTime() - now;
			}
			
			put(1);
			put(2);
			put(10);
			put(50);
			put(100);
			put(1000);
			put(5000);
			put(10000, true);
			/*
				ALL AT 10k OPS:
				IFY directly comes in at 1s
				IFY wrapped around a chain takes 2s
				IFY wrapped with a chain and IFY X takes 4s
				IFY wrapped with a chain and IFY X plus if checks 5s
				^ that + union takes 7s
				^ that + map pseudo takes 9s
				^ that + emit takes 11s ~ 16s
				^ that + hook sometimes takes + 10s. YIPES.
			*/
			
			var gun2 = Gun();//.get('bug').put({});
			//gun.path('example').put('string to be replaced');
			gun2.__.opt.hooks.put = null;
			function put2(num, t) {
				var now = new Date().getTime();
				var cb;
				for (var i = 1; i <= num; i++) {
					if (i === num) {
						cb = function () {
							console.log(num + ' API ops: ' + (new Date().getTime() - now)/1000 + 's', Gun.log.debug);
							t && done();
						}
					}
					gun2.put({  hello: 'world'}, cb);
						/*deeply: {
							nested: i
						}
					}, cb);*/
				}
				return new Date().getTime() - now;
			}
			Gun.log.start = Gun.time.is();
			put2(1);
			put2(10000);
			put2(1, true);
			//put2(2);
			//put2(10);
			//put2(50);
			//put2(100, true);
			//put2(5000, true);
		});
		it.skip("test timeout", function(done){ return done();
			var i = 1000, start = Date.now();
			while(i--){
				setTimeout(function(){
					console.log("ended in", (Date.now() - start)/1000);
				},0);
				/*
				Gun.schedule(start, function(){
					console.log("ended in", (Date.now() - start)/1000);
				});
				setImmediate(function(){
					console.log("ended in", (Date.now() - start)/1000);
				});
				process.nextTick(function(){
					console.log("ended in", (Date.now() - start)/1000);
				});
				*/
			}
		});
		it.skip("test assignment", function(done){
			var env = {graph: {}};
			function speed(other){			
				var i = 10000;
				while(i--){
					var $ = {soul: Gun.text.random()};
					var at = {node: {_: {}}};
					var obj = {
						deeply: {
							nested: 'lol'
						}
					}
					env.graph[at.node._[Gun._.soul] = at.soul = $.soul] = at.node
				}
			}
			var start = Date.now();
			speed();
			console.log('wat', (Date.now() - start)/1000);
		});
		it.skip("test fn call", function(done){
			function speed(i, cb){
				var r = 0;
				while(i--){
					if(cb){
						cb(i);
					} else {
						r += i;
					}
				}
			}
			var start = Date.now();
			speed(100000000);
			console.log('no fn', (Date.now() - start)/1000);
			var start = Date.now(), r = 0;
			speed(100000000, function(i){ r += i });
			console.log('w/ fn', (Date.now() - start)/1000);
			var start = Date.now(), r = 0;
			function foo(i){ r += i }
			speed(100000000, foo);
			console.log('w/ named fn', (Date.now() - start)/1000);
		});
		it.skip("gun put recursive path slowdown MUTANT TEST", function(done){
			this.timeout(30000);
			
			Gun.chain.put = function(val, cb, opt){
				var gun = this.chain(), obj;
				var drift = Gun.time.now(), call = {};
				cb = cb || function(){};
				gun._.at('soul').event(
				//(
				function($){
					var chain = $.gun || gun; 
					var ctx = {}, obj = val, $ = Gun.obj.copy($);
					var hash = $.field? $.soul + $.field : ($.from? $.from + ($.at || '') : $.soul);
					if(call[hash]){ return }
					gun.__.meta($.soul).put = true;
					call[hash] = true;
					if(Gun.is.value(obj)){
						if($.from && $.at){
							$.soul = $.from;
							$.field = $.at;
						} // no else!
						if(!$.field){
							return cb.call(gun, {err: Gun.log("No field exists for " + (typeof obj) + "!")});
						} else
						if(gun.__.graph[$.soul]){
							ctx.tmp = {};
							ctx.tmp[ctx.field = $.field] = obj;
							obj = ctx.tmp;
						} else {
							return cb.call(gun, {err: Gun.log("No node exists to put " + (typeof obj) + " in!")});
						}
					}
					if(Gun.obj.is(obj)){
						if($.field && !ctx.field){
							ctx.tmp = {};
							ctx.tmp[ctx.field = $.field] = obj;
							obj = ctx.tmp;
						}
						Gun.ify(obj || val, function(env, cb){
							var at;
							if(!env || !(at = env.at) || !env.at.node){ return }
							if(!at.node._){
								at.node._ = {};
							}
							if(!Gun.is.soul.on(at.node)){
								if(obj === at.obj){
									env.graph[at.node._[Gun._.soul] = at.soul = $.soul] = at.node;
									cb(at, at.soul);
								} else {
									function path(err, data){
										if(at.soul){ return }
										at.soul = Gun.is.soul.on(data) || Gun.is.soul.on(at.obj) || Gun.roulette.call(gun); // TODO: refactor Gun.roulette!
										env.graph[at.node._[Gun._.soul] = at.soul] = at.node;
							//var start = performance.now();
										cb(at, at.soul);
							//first = performance.now() - start;(first > .05) && console.log('here');
									};
									($.empty && !$.field)? path() : chain.back.path(at.path || [], path, {once: true, end: true}); // TODO: clean this up.
								}
								//var diff1 = (first - start), diff2 = (second - first), diff3 = (third - second);
								//(diff1 || diff2 || diff3) && console.log(diff1, '    ', diff2,  '    ', diff3);
							}
							if(!at.node._[Gun._.HAM]){
								at.node._[Gun._.HAM] = {};
							}
							if(!at.field){ return }
							at.node._[Gun._.HAM][at.field] = drift;
						})(function(err, ify){
							//console.log("chain.put PUT <----", ify.graph, '\n');
							if(err || ify.err){ return cb.call(gun, err || ify.err) }
							if(err = Gun.union(gun, ify.graph).err){ return cb.call(gun, err) }
							if($.from = Gun.is.soul(ify.root[$.field])){ $.soul = $.from; $.field = null }
							Gun.obj.map(ify.graph, function(node, soul){ Gun.union(gun, Gun.union.pseudo(soul)) });
							gun._.at('soul').emit({soul: $.soul, field: $.field, key: $.key, PUT: 'SOUL', WAS: 'ON'}); // WAS ON
							//return cb(null, true);
							if(Gun.fns.is(ctx.hook = gun.__.opt.hooks.put)){
								ctx.hook(ify.graph, function(err, data){ // now iterate through those nodes to a persistence layer and get a callback once all are saved
									if(err){ return cb.call(gun, err) }
									return cb.call(gun, null, data);
								}, opt);
							} else {
								//console.Log("Warning! You have no persistence layer to save to!");
								cb.call(gun, null); // This is in memory success, hardly "success" at all.
							}
						});
					}
				})
				gun._.at('soul').emit({soul: Gun.roulette.call(gun), field: null, empty: true});
				return gun;
			}
			
			var gun = Gun(); //.get('bug').put({});
			gun.__.opt.hooks.put = null;
			function put(num, t) {
				Gun.log.debug = 0;
				var now = new Date().getTime();
				var cb;
				for (var i = 1; i <= num; i++) {
					if (i === num) {
						cb = function (err, ok) {
							console.log(num + 'MUTANT ops: ' + (new Date().getTime() - now)/1000 + 's');
							t && done();
						}
					}
					gun.put({   //hello: 'world'}, cb);
						deeply: {
							nested: i
						}
					}, cb);
				}
				return new Date().getTime() - now;
			}
			
			//put(1, true);
			/*put(2);
			put(10);
			put(50);
			put(100);
			put(1000);
			put(5000);
			*/
			put(10000, true);
		});
		it("gun get empty set, path not -> this put", function(done){ // Issue #99 #101, bug in survey and trace game.
			var test = {c: 0}, u;
			var gun = Gun();
			var game = gun.get('some/not/yet/set/put/thing').set();
			var me = game.path('alias').val(function(val){
				expect(val).to.not.be(u);
				expect(val.a).to.be('b');
				var meid = Gun.is.soul.on(val);
				var self = this;
				expect(self === game).to.not.be.ok();
				expect(self === me).to.be.ok();
				done();
			});
			setTimeout(function(){
				me.put({a: 'b'});
			},100);
		});
		
		it("gun get empty set path empty later path put multi", function(done){ // Issue #99 #101, bug in survey and trace game.
			done.c = 0;
			var gun = Gun();
			var data = gun.get('some/not/yet/set/put/thing/2').set();
			var path = data.path('sub');
			function put(d, t, f){				
				setTimeout(function(){
					path.put(d, function(err, ok){
						expect(err).to.not.be.ok();
						done.c++;
						if(f && done.c >= 3){
							done();
						}
					});
				},t || 10);
			};
			put({on: 'bus', not: 'transparent'});
			put({on: null, not: 'torrent'}, 200);
			put({on: 'sub', not: 'parent'}, 250, true);
		});
		
		it("ToDo", function(done){ // Simulate ToDo app!
			var gun = Gun().get('example/todo/data');
			gun.on(function renderToDo(val){
				if(done.done){ return }
				if(done.clear){
					done.done = true;
					expect(val[done.id]).to.not.be.ok();
					return done();
				}
				delete val._;
				Gun.obj.map(val, function(val, field){ return done.id = field; });
				expect(val[done.id]).to.be('groceries');
			});
			setTimeout(function(){ // form submit
				gun.set("groceries");
				setTimeout(function(){ // clear off element
					done.clear = true;
					gun.path(done.id).put(null);
				},100);
			},200);
		});
		
		it("gun put null path on put sub object", function(done){ // consensus4's bug
			done.c = 1;
			var gun = Gun();
			//Gun.log.verbose = true;
			var game = gun.put({board: null, teamA: null, teamB: null, turn: null}).key('the/game');
			game.path('board').on(function(board, field){
				expect(field).to.be('board');
				if(done.c === 1){
					expect(board).to.not.be.ok();
				}
				if(done.c === 2){
					if(!board[11] || !board[22] || !board[33]){ return }
					done.c++;
					delete board._;
					expect(board).to.be.eql({11: ' ', 22: ' ', 33: 'A'});
					done();
				}
			});
			setTimeout(function(){
				done.c++;
				game.put({board: {11: ' ', 22: ' ', 33: 'A'}});
			},100);
		});
		
		it("get set put map -> put, foreach gun path map", function(done){ // replicate Jesse's Trace game bug
			done.c = 0;
			gun = Gun()
			.get('players').set()
			.put({
				0: {
					num: 0
				},
				1: {
					num: 1
				},
				2: {
					num: 2
				},
				3: {
					num: 3
				}
			}, function(err,ok){
				expect(done.c++).to.be(0);
			}).val(function(p){
				done.p = Gun.is.soul.on(p);
				done.m = Gun.is.soul(p[0]);
				expect(Gun.is.soul(p[0])).to.be.ok();
				expect(Gun.is.soul(p[1])).to.be.ok();
				expect(Gun.is.soul(p[2])).to.be.ok();
				expect(Gun.is.soul(p[3])).to.be.ok();
			})
			
			var players = [], me;
			gun.map(function (player, number) {
				players[number] = player;
				players[number].history = [];
				if (!player.taken && !me) {
					this.put({
						taken: true,
						history: {
							0: {x: 1, y: 2}
						}
					}, function(err,ok){});
					me = number;
				}
			});
			
			 Gun.list.map([0, 1, 2, 3], function (player, number) {
				number = number - 1;
				gun
					.path(number + '.history')
					.map(function (entry, logNum) {
						done.c++;
						players[number].history[logNum] = entry;
						expect(entry.x).to.be(1);
						expect(entry.y).to.be(2);
						setTimeout(function(){
							expect(done.c).to.be(2);
							done();
						},100);
					});
			});
		});
		
		it("gun get path empty val", function(done){ // flip flop bug
			done.c = 0;
			var u;
			var gun = Gun();
			var game = gun.get('game1/players').set();
			var me = game.path('player1').val(function(val){
				if(!done.c){ done.fail = true }
				expect(val).to.not.be(u);
				expect(val.x).to.be(0);
				expect(val.y).to.be(0);
				expect(done.fail).to.not.be.ok();
				done();
			});
			setTimeout(function(){
				done.c++;
				expect(done.fail).to.not.be.ok();
				me.put({x: 0, y: 0});
			},10);
		});
		
		it("gun get path empty on", function(done){
			done.c = 0;
			var u;
			var gun = Gun();
			var game = gun.get('game2/players').set();
			var me = game.path('player2').on(function(val){
				if(!done.c){ done.fail = true }
				expect(done.fail).to.not.be.ok();
				expect(val).to.not.be(u);
				if(done.done || !val.x || !val.y){ return } // it is okay if ON gets called many times, this protects against that.
				// TODO: although it would be nice if we could minimize the amount of duplications. (may not happen to after 1.0.0) 
				expect(val.x).to.be(1);
				expect(val.y).to.be(1);
				done.done = true;
				done();
			});
			setTimeout(function(){
				done.c++;
				expect(done.fail).to.not.be.ok();
				me.put({x: 1, y: 1});
			},10);
		});
		
		it("gun get path empty not", function(done){
			var u;
			var gun = Gun();
			var game = gun.get('game3/players').set();
			var me = game.path('player3').not(function(field){
				expect(field).to.be('player3');
				done();
			});
		});
		
		it("gun get path empty set", function(done){
			var u;
			var gun = Gun();
			var game = gun.get('game4/players').set();
			var me = game.path('player4').set().path('alias').put('awesome').val(function(val, field){
				expect(val).to.be('awesome');
				expect(field).to.be('alias');
				done();
			})
		});

		it("no invalid graph", function(done){
			var gun = Gun({wire:{
				put: function(graph){
					expect(Gun.is.graph(graph)).to.be.ok();
					if(done.c){ return } if(done.on){ done(); done.c = 1 }
				}
			}}).get('example/todo/data/graph');
			gun.on(function renderToDo(val){
				done.on = true; 
			});
			setTimeout(function(){
				gun.path(Gun.text.random()).put('hoorah');
			},100)
		});

		it("no undefined field", function(done){
			var gun = Gun();
			var chat = gun.get('example/chat/data/graph/field').not(function(key){
				gun.put({1: {who: 'Welcome', what: "to the chat app!", when: 1}}).key(key);
			});
			chat.map().val(function renderToDo(val, field){
				expect(field).to.be.ok();
				expect(val.who).to.be.ok();
				expect(val.when).to.be.ok();
				expect(val.what).to.be.ok();
				if(done.c >= 2){ return }
				if(done.c === 1){ done() }
				done.c = done.c || 0;
				done.c += 1;
			});
			setTimeout(function(){
				var msg = {};
				msg.when = Gun.time.is();
				msg.what = "lol!";
				msg.who = "Alice";
				chat.path(msg.when + '_' + Gun.text.random(4)).put(msg);
			},100);
		});
		/* // This test didn't work for what I was wanting to test :(, will either remove it or modify it if I think of a clever solution to test what I want to test.
		it.only("simulate json app", function(done){
			var peers = {};
			peers.server = Gun();
			function wipeServer(){
				peers.server = Gun();
			}
			var gopt = {wire:{
				put: function(graph, cb){
					Gun.union(peers.server, graph);
					cb(null);
				}
				,get: function(lex, cb){
					setTimeout(function(){
						var soul = lex[Gun._.soul];
						if(peers.localStorage){
							var g = peers.localStorage;
							console.log("VIA LOCALSTORAGE!", lex, g[soul]);
							if(g[soul]){
								var n = g[soul];
								cb(null, n);
								cb(null, Gun.is.node.ify({}, soul));
								cb(null, {});
							}
						}
						setTimeout(function(){
							var graph = peers.server.__.graph;
							console.log("VIA the SERVER!!", lex, graph[soul]);
							if(!graph[soul]){
								cb(null);
								cb(null, {});
								return;
							}
							var node = graph[soul];
							cb(null, node);
							cb(null, Gun.is.node.ify({}, soul));
							cb(null, {});
						},5);
					},5);
				}
			}}
			peers.gun = Gun(gopt);
			function reload(){
				peers.localStorage = Gun.obj.copy(peers.gun.__.graph);
				peers.gun2 = Gun(gopt);
			}
			var ref = peers.gun.get('example/json/data/test');
			setTimeout(function(){
				ref.path('hello').put("value");
				setTimeout(function(){
					wipeServer();
					reload();
					setTimeout(function(){
						Gun.log.debug = 1; console.log("~~~~~~~~~~~~~~~~~~~");
						var ref = peers.gun2.get('example/json/data/test');
						ref.on(function(data){
							console.log("on!", data);
						});
					},100);
				},100);
			},100);
		});
		*/
		it("simulate chat app", function(done){
			var server = Gun();
			var gopt = {wire:{
				put: function(graph, cb){
					Gun.union(server, graph);
					cb(null);
				}
				,get: function(lex, cb){
					setTimeout(function(){
						var soul = lex[Gun._.soul];
						var graph = server.__.graph;
						//console.log('server replying', soul, graph);
						if(!graph[soul]){
							//console.log("replying to Alice...", null);
							cb(null);
							cb(null, {});
							return;
						}
						var node = graph[soul];
						//console.log("replying to Bob...", node);
						cb(null, node);
						cb(null, Gun.is.node.ify({}, soul));
						cb(null, {});
					},5);
				}
			}}
			var gun = Gun(gopt);
			var chat = gun.get('example/chat/data/graph/field').not(function(key){
				gun.put({1: {who: 'Welcome', what: "to the chat app!", when: 1}}).key(key);
			});
			chat.map().val(function renderToDo(val, field){
				//console.log("ALICE", field, val);
				expect(field).to.be.ok();
				expect(val.who).to.be.ok();
				expect(val.when).to.be.ok();
				expect(val.what).to.be.ok();
			});
			setTimeout(function(){
				var gun2 = Gun(gopt);
				//Gun.log.debug =1; console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				var chat2 = gun2.get('example/chat/data/graph/field').not(function(key){
					//console.log("BOB's key", key);
					gun2.put({1: {who: 'Welcome', what: "to the chat app!", when: 1}}).key(key);
				});
				chat2.map().val(function renderToDo(val, field){
					//console.log("BOB", field, val);
					expect(field).to.be.ok();
					expect(val.who).to.be.ok();
					expect(val.when).to.be.ok();
					expect(val.what).to.be.ok();
					done();
				});
			},100);
		});

		it.skip("gun path via gun path", function(done){ // TODO: Future feature?
			var gun = Gun();
			var book = gun.put({ name: 'Potato Cooking' });
			var author = gun.put({ name: 'Bob Bobson' });
			author.path(book.path('name')).put(book);
		});

		it("gun set", function(done){
			var gun = Gun();
			var users = gun.get('users');
			var alice = gun.put({name: 'alice', birth: Math.random()}).key('person/alice');
			var bob = gun.put({name: 'bob', birth: Math.random()}).key('person/bob');
			var carl = gun.put({name: 'carl', birth: Math.random()}).key('person/carl');
			var dave = gun.put({name: 'dave', birth: Math.random()}).key('person/dave');

			users.set(alice).set(bob).set(carl).set(dave);

			alice.path('friends').set(bob).set(carl);
			bob.path('friends').set(alice);
			dave.path('friends').set(alice).set(carl);

			var team = gun.get('team/lions').put({name: "Lions"});
			team.path('members').set(alice).set(bob);

			alice.path('team').put(team);
			bob.path('team').put(team);

			dave.path('friends').map().path('team.members').map().val(function(member){
				//console.log("Dave's friend is on a team that has", member.name, "on it.");
				if('alice' === member.name){
					done.alice = true;
				} else
				if('bob' === member.name){
					done.bob = true;
				} else {
					expect(member).to.not.be.ok();
				}
				if(done.alice && done.bob){
					setTimeout(function(){
						done();
					},10);
				}
			});
		});

		it("localStorage", function(done){
			var localStorage = localStorage || {clear:function(){}};
			localStorage.clear();
			var gun = Gun();


			var text = Gun.text.random(1024 * 1024 * 6);
			gun.put({i: text}, function(err, ok){
				if(done.c){ return }
				if(!err){ return done() }
				var text = "If you are seeing this message, it means the localStorage error was caught successfully rather than it crashing and stopping replication to peers. Also, the error is now reported back to you via the put callback. Here it is!";
				localStorage.clear();
				done(); done.c = 1;
			});
		});

		it("get context", function(done){
			var gun = Gun();
			var ref = gun.get('lol').get('foo').put({hello: 'world'});
			gun.get('lol').val(function(implicit){
				done.fail = true;
				expect(implicit).to.not.be.ok();
			});
			gun.get('lol').not(function(){
				done.please = true;
			});
			gun.get('foo').val(function(data){
				expect(data.hello).to.be('world');
				expect(done.fail).to.not.be.ok();
				expect(done.please).to.be.ok();
				done();
			});
		});

		it.only("chaining val", function(done){
			var gun = Gun();
			gun.get('users').set(gun.put({name: 'alice'}));
			gun.get('users').set(gun.put({name: 'bob'}));;
			gun.get('users').val().map(function(person){
				if(person.name === 'alice'){
					done.alice = true;
				}
				if(person.name === 'bob'){
					done.bob = true;
				}
				if(person.name === 'carl'){
					done.carl = true;
				}
			});
			gun.get('users').set(gun.put({name: 'carl'}));
			setTimeout(function(){
				console.log('wha?', done.alice, done.bob, done.carl);
				expect(done.alice).to.be.ok();
				expect(done.bob).to.be.ok();
				expect(done.carl).to.not.be.ok();
				done();
			},10);
		});
	});
		
	describe('Streams', function(){
		var gun = Gun(), g = function(){
			return Gun({hooks: {get: ctx.get}});
		}, ctx = {gen: 9, extra: 100, network: 2};
		
		it('prep hook', function(done){
			this.timeout(ctx.gen * ctx.extra);
			var peer = Gun(), ref;
			ctx.get = function(key, cb){
				var c = 0;
				cb = cb || function(){};
				if('big' !== key){ return cb(null, null) }
				setTimeout(function badNetwork(){
					c += 1;
					var soul = Gun.is.soul.on(ref);
					var graph = {};
					var data = graph[soul] = {_: {'#': soul, '>': {}}};
					if(!ref['f' + c]){ 
						return cb(null, graph), cb(null, {});
					}
					data._[Gun._.HAM]['f' + c] = ref._[Gun._.HAM]['f' + c];
					data['f' + c] = ref['f' + c];
					cb(null, graph);
					setTimeout(badNetwork, ctx.network);
				},ctx.network);
			}
			ctx.get.fake = {};
			for(var i = 1; i < (ctx.gen) + 1; i++){
				ctx.get.fake['f'+i] = i;
				ctx.length = i;
			}
			var big = peer.put(ctx.get.fake).val(function(val){
				ref = val;
				ctx.get('big', function(err, graph){
					if(Gun.obj.empty(graph)){ done() }
				});
				gun.opt({hooks: {get: ctx.get}});
			});
		});
		
		it('map chain', function(done){
			var set = gun.put({a: {here: 'you'}, b: {go: 'dear'}, c: {sir: '!'} });
			set.map().val(function(obj, field){
				if(obj.here){
					done.a = obj.here;
					expect(obj.here).to.be('you');
				}
				if(obj.go){
					done.b = obj.go;
					expect(obj.go).to.be('dear');	
				}
				if(obj.sir){
					done.c = obj.sir;
					expect(obj.sir).to.be('!');
				}
				if(done.a && done.b && done.c){
					done();
				}
			});
		});
		
		it('map chain path', function(done){
			var set = gun.put({
				a: {name: "Mark",
					pet: {coat: "tabby", name: "Hobbes"}
				}, b: {name: "Alice",
					pet: {coat: "calico", name: "Cali"}
				}, c: {name: "Bob",
					pet: {coat: "tux", name: "Casper"}
				} 
			});
			set.map().path('pet').val(function(obj, field){
				if(obj.name === 'Hobbes'){
					done.hobbes = obj.name;
					expect(obj.name).to.be('Hobbes');
					expect(obj.coat).to.be('tabby');
				}
				if(obj.name === 'Cali'){
					done.cali = obj.name;
					expect(obj.name).to.be('Cali');
					expect(obj.coat).to.be('calico');
				}
				if(obj.name === 'Casper'){
					done.casper = obj.name;
					expect(obj.name).to.be('Casper');
					expect(obj.coat).to.be('tux');
				}
				if(done.hobbes && done.cali && done.casper){
					done();
				}
			});
		});
		
		it('get big on', function(done){
			this.timeout(ctx.gen * ctx.extra);
			var test = {c: 0, last: 0};
			g().get('big').on(function(val){
				if(test.done){ return console.log("hey yo! you got duplication on your ons!"); }
				delete val._;
				if(val['f' + (test.last + 1)]){ 
					test.c += 1;
					test.last += 1;
				}
				var obj = {};
				for(var i = 1; i < test.c + 1; i++){
					obj['f'+i] = i;
				}
				expect(val).to.eql(obj);
				if(test.c === ctx.length){
					test.done = true;
					done();
				}
			});
		});
		
		it('get big on delta', function(done){
			this.timeout(ctx.gen * ctx.extra);
			var test = {c: 0, seen: {}};
			g().get('big').on(function(val){
				delete val._;
				if(test.seen['f' + test.c]){ return }
				test.seen['f' + test.c] = true;
				test.c += 1;
				var obj = {};
				obj['f' + test.c] = test.c;
				expect(val).to.eql(obj);
				if(test.c === ctx.length){
					done();
				}
			}, true);
		});
		
		it('get val', function(done){
			this.timeout(ctx.gen * ctx.extra);
			g().get('big').val(function(obj){
				delete obj._;
				expect(obj.f1).to.be(1);
				expect(obj['f' + ctx.length]).to.be(ctx.length);
				expect(obj).to.be.eql(ctx.get.fake);
				done();
			});
		});
		
		it('get big map val', function(done){
			this.timeout(ctx.gen * ctx.extra);
			var test = {c: 0, seen: {}};
			g().get('big').map().val(function(val, field){
				if(test.seen[field]){ return }
				test.seen[field] = true;
				delete val._;
				expect(field).to.be('f' + (test.c += 1));
				expect(val).to.be(test.c);
				if(test.c === ctx.length){
					done();
				}
			});
		});
		
		it('val emits all data', function(done){ // bug in chat app
			var chat = Gun().get('example/chat/data').not(function(){
				return this.put({1: {who: 'Welcome', what: "to the chat app!", when: 0}}).key('example/chat/data');
			});
			chat.set({who: 'mark', what: "1", when: 1});
			chat.set({who: 'mark', what: "2", when: 2});
			chat.set({who: 'mark', what: "3", when: 3});
			chat.set({who: 'mark', what: "4", when: 4});
			chat.set({who: 'mark', what: "5", when: 5});
			var seen = {1: false, 2: false, 3: false, 4: false, 5: false}
			setTimeout(function(){				
				chat.map(function(m){ }).val(function(msg, field){
					var msg = Gun.obj.copy(msg);
					if(msg.what){
						expect(msg.what).to.be.ok();
						seen[msg.when] = true;
					}
					if(!Gun.obj.map(seen, function(boo){ if(!boo){ return true } })){
						done();
					}
				});
			}, 100);
		});
	});
});
describe('On', function(){
	it('emits to former subscribers', function() {
		var recv = null;
		Gun.on('on-test-1').event(function(val) {
			recv = val;
		});
		Gun.on('on-test-1').emit('foo');
		expect(recv).to.be('foo');
	});
	it('does not emit to future subscribers', function() {
		var recv = null;
		Gun.on('on-test-1').emit('foo');
		Gun.on('on-test-1').event(function(val) {
			recv = val;
		});
		expect(recv).to.be(null);
	});
	it('on subscriptions can unsubscribe', function() {
		var gun = Gun();
		var recv;
		gun.get('on-test-3').put({v: 'foo'});
		var sub = gun.get('on-test-3').on(function(o) {
			recv = o.v;
		});
		expect(recv).to.be('foo');
		gun.get('on-test-3').put({v: 'bar'});
		expect(recv).to.be('bar');
		sub.off();
		gun.get('on-test-3').put({v: 'off'});
		expect(recv).to.be('bar');
	});
	it('map subscriptions can unsubscribe', function() {
		var gun = Gun();
		var recv;
		gun.get('on-test-4').put({v: 'foo'});
		var sub = gun.get('on-test-4').map(function(v, k) {
			if (v == 'off') throw new Error('unexpected');
			recv = v;
		});
		expect(recv).to.be('foo');
		gun.get('on-test-4').put({v: 'bar'});
		expect(recv).to.be('bar');
		sub.off();
		gun.get('on-test-4').put({v: 'off'});
		expect(recv).to.be('bar');
	});
});
