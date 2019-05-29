var scheduler = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var tasks = [];

		var pack;

		var interval = null;

		var helpers = {
			find : function(id){
				return _.find(tasks, function(t){
					return t.id == id
				})
			},

			index : function(id){
				return findIndex(tasks, function(t){
					return t.id == id
				})
			}
		}

		var actions = {

			postInterval : function(){
				interval = setInterval(function(){

					var posts = actions.taskForTime();

					renders.time();
					

					if (posts.length){

						lazyEach({
							array : posts,
							sync : true,
							action : function(p){

								var post = p.item;

								self.app.platform.sdk.node.transactions.get.unspent(function(){

									actions.post(post, function(){
										p.success();
									})


								}, null, true)

							}
						})

					}

				}, 60000)
			},

			missed : function(missed){
				dialog({
					html : "You have <b>"+missed.length+"</b> missed posts. Do you want to share it?",

					btn1text : "Yes",
					btn2text : "No",

					success : function(){
						_.each(missed, function(task){

							actions.post(task)
						
						})
					},

					fail : function(){

						_.each(missed, function(task){
							task.time = null;
							renders.task(task, null, true)

						})

					}
				})
			},

			taskForTime : function(){

				var t = new Date();

				return _.filter(tasks, function(task){

					if(task.time && task.ready && t > task.time && !task.remove){
						return true
					}

				})
			},

			post : function(task, clbk){

			

				if(task.share){
					var error = task.share.validation();

					if(!error){

						self.app.platform.sdk.pool.dumpKey(pack, task.address, function(privateKey){

							

							if(!privateKey){
								sitemessage('noprivateley')

								return
							}

							var keys = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))

							var type = 'p2pkh'


							var address = bitcoin.payments[type]({ pubkey: keys.publicKey })

							task.module.post(function(r, e){

								if(r){

									actions.successPost(task.id);

								}

								else
								{
									sitemessage(e)
									actions.failPost(task.id)
								}

								if (clbk){
									clbk(r)
								}

							}, {

								address : address,
								keys : keys

							})
						})
					}
					else{
						sitemessage(error);
						actions.failPost(task.id)

						if (clbk){
							clbk(false)
						}
					}
				}
				else
				{
					sitemessage('error');
					actions.failPost(task.id)

					if (clbk){
						clbk(false)
					}
				}				
			},
			add : function(){
				var task = {

					time : null,

					id : makeid(),

					share : new Share(),

					address : self.app.platform.sdk.address.pnet().address,

					ready : false

				}

				task.share.on.change.scheduler = function(){
					state.save()
				}

				tasks.push(task)

				renders.task(task)
				
				state.save()
			},

			remove : function(id){
				var index = helpers.index(id)

					tasks.splice(index, 1);

					state.save();

					el.c.find('.shareAppendWrapper[t="'+id+'"]').remove()
			},

			failPost : function(id){
				var task = helpers.find(id);


					task.time = null;
			

					renders.task(task, function(){
						renders.ready()



						var r = el.c.find('.shareAppendWrapper[t="'+id+'"] .result');
							r.html('<i class="fas fa-exclamation-circle"></i>')
							r.addClass('bad')
					}, true)
			},

			successPost : function(id){

				var task = helpers.find(id);

				task.remove = true

				var r = el.c.find('.shareAppendWrapper[t="'+id+'"] .result');
					r.html('<i class="far fa-check-circle"></i>')
					r.addClass('good')

				renders.ready()

				state.save();
			}
		}

		var events = {
			remove : function(){
				var _el = $(this).closest('.shareTimeWrapper')

				var id = _el.attr('task');

				var task = helpers.find(id)

				var clbk = function(){

					actions.remove(id)

				}

				if (task){
					if(!task.share.validation()){

						dialog({
							html : "Do you really want to remove this task?",

							btn1text : "Yes",
							btn2text : "No",

							success : clbk
						})

					}
					else
					{
						clbk()
					}
				}
			}
		}

		var renders = {
			tasks : function(clbk){
				lazyEach({
					array : tasks,

					action : function(p){
						var task = p.item

						renders.task(task, p.success)
					},		

					sync : true,

					all : {
						success : clbk
					}
				})
			},
			task : function(task, clbk, re){

				if(!re){
					el.tasks.append('<div class="shareAppendWrapper" t="'+task.id+'">')					
				}

				_el = el.tasks.find('.shareAppendWrapper[t="'+task.id+'"]')
				

				self.shell({

					name :  'task',
					el :   _el,

					data : {
						task : task
					},

				}, function(p){

					p.el.find('.remove').on('click', events.remove)

					var _el = p.el.find('.shareTimeWrapper[task="'+task.id+'"] .shareContainer')

					self.nav.api.load({

						open : true,
						id : 'share',
						el : _el,
						animation : false,

						_id : task.id,

						essenseData : {

							daddress : task.address || self.app.platform.sdk.address.pnet().address,
							dtype : task.ready,
							share : task.share,
							exoprtByTime : true,
							pack : pack || {},

							time : task.time,

							notClear : true,

							changeArrange : function(){
								state.save();
							},

							selectTime : function(date){
								task.time = date

								renders.ready();

								state.save();
							},

							address : function(address){
								task.address = address

								renders.ready();

								state.save();
							},

							type : function(type){

								if(type == 'p'){

									actions.post(task, function(){
										//actions.remove(task.id)
									})
									
								}

								if(type == 't'){

									task.ready = true;

								}

								if(type == 'w'){
									task.ready = false;
								}

								renders.time()
								renders.ready();

								state.save();

							}
						},
						
						clbk : function(e, p){

							task.module = p;

							if (clbk)
								clbk();

						}

					})

					
				})
			},

			time : function(){
				var n = new Date();

				el.c.find('.timeCellWrapper .time').html( n.getHours() + ":" + n.getMinutes())
			},

			ready : function(){
				var n = new Date();

				var t = _.filter(tasks, function(task){

					if(task.time && task.ready && n < task.time && !task.remove){
						return true
					}

				})


				el.c.find('.activeTasks .count').html(t.length)
			}
		}

		var state = {
			save : function(){

				var ftasks = _.filter(tasks, function(task){
					if(!task.remove) return true
				})

				var _tasks = _.map(ftasks, function(task){

					var t = null;

					if(task.time) t = dateToStr(task.time)

					return {
						time : t,
						id : task.id,
						share : task.share.export(true),
						address : task.address,
						ready : task.ready
					}

				})

				localStorage['tasks'] = JSON.stringify(_tasks);
			},
			load : function(){
				var _tasks = JSON.parse(localStorage['tasks'] || '[]');

				tasks = _.map(_tasks, function(task){

					var s = new Share();

						s.import(task.share)

						s.on.change.scheduler = function(){
							state.save()
						}

					var t = null;

					if (task.time){
						t = strToDate(task.time)
					}

					return {
						time : t,
						id : task.id,
						share : s,
						address : task.address,
						ready : task.ready || false
					}
				})
			}
		}

		var initEvents = function(){
			
			el.add.on('click', actions.add)
		}

		var make = function(){
			var address = self.app.platform.sdk.address.pnet().address;

			var pa = self.app.platform.sdk.pool.getPack(address);

			var packClbk = function(){
				renders.tasks()
			
				var missed = actions.taskForTime();

				renders.time()
				renders.ready();

				if (missed.length){
					actions.missed(missed);
				}
			}

			if (pa){
				pack = pa[0]

				self.app.platform.sdk.pool.info(pack, function(){
					packClbk()
				})
			}
			else
			{
				packClbk()
			}

			

		}

		return {
			primary : primary,

			getdata : function(clbk){



				state.load()

				var data = {
					tasks : tasks
				};

				clbk(data);

			},

			destroy : function(){
				el = {};

				if (interval)
					clearInterval(interval)

				interval = null;
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.tasks = el.c.find('.shares')

				el.add = el.c.find('.addshare')

				initEvents();

				actions.postInterval()

				make();

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = scheduler;
}
else{

	app.modules.scheduler = {};
	app.modules.scheduler.module = scheduler;

}