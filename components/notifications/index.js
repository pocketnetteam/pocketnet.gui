var notifications = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, seenTimer, inel, t = '';

		var actions = {
			open : function(id, type){

				self.closeContainer();
			},

			seen : function(){
				var els = el.c.find('.notification:not(.seen)')

				var f = 'offset'


				if(inel) f = 'position'

				if (els.length){


					seenTimer = slowMade(function(){

						self.app.platform.sdk.notifications.seenall()
						
						/*var inv = inView(els, {
							inel : inel,
							offset : 100,
							mode : 'part',
							f : f
						})

						
						*/

						if (els.length > 0){

							var ids = [];

							els.addClass('seen')

							/*els.each(function(){

								ids.push($(this).attr('notification'))
							})*/

							//self.app.platform.sdk.notifications.seen(ids)
							
						}


					}, seenTimer, 50)
				}
			},

			getnotifications : function(p){
				var _notifications = self.app.platform.sdk.notifications.storage.notifications || [];

				_notifications = _.filter(_notifications, function(notification){
					var m = null;

					if (notification.mesType) m = self.app.platform.ws.messages[notification.mesType]
					if (notification.msg && !m) m = self.app.platform.ws.messages[notification.msg]

					if(!m) return false
					
					return true
				})

				return _notifications
			}
		}

		var events = {
			open : function(){
				var type = $(this).attr('type')
				var id = $(this).attr('id')

				actions.open(id, type);
			},

			showAll : function(){
				self.nav.api.go({
					href : 'userpage?id=notifications&report=notifications',
					history : true,
					open : true
				})


				self.closeContainer();
			},

			seen : function(){
				actions.seen()
			}
		}

		var renders = {
			
			notifications : function(p, clbk){

				renders.loadingAndEmpty()
				if(!p) p = {};

				
				var rnow = false;
				
				p.el = el.new;

				if(!p.el) return

				var time = self.app.platform.currentTime()
				var timedif = 286400
				var inr = html

				if(p.notifications) inr = prepend

				var _notifications = p.notifications || self.app.platform.sdk.notifications.storage.notifications || [];

				var watched = - _notifications.length + (p.notifications || self.app.platform.sdk.notifications.storage.notifications || []).length
				
				_notifications = _.sortBy(_notifications, function(n){
					return -Number(n.time || n.nTime)
				})

				var currentDate = new Date();

				_notifications = _.filter(_notifications, function(notification){
					var m = null;

					if (notification.mesType) m = self.app.platform.ws.messages[notification.mesType]
					if (notification.msg && !m) m = self.app.platform.ws.messages[notification.msg]

					if(!m) return false

					return true
				})

				var grou = group(_notifications, function(n){

					if (p.now) return 'ntnow';

					var d = new Date( (n.time || n.nTime)  * 1000);

					if (d.addMinutes(60) > currentDate) return 'ntlasthour';

					if (d.addMinutes(1440) > currentDate) return 'nttoday';
					if (d.addMinutes(2880) > currentDate) return 'ntyesterday';

					if (d.getFullYear().toString() + (d.getMonth() + 1).toString() == currentDate.getFullYear().toString() + (currentDate.getMonth() + 1).toString()) return 'ntmounth';

					return 'ntearlier';

				})

				if(p.now){

					var ntnow = p.el.find('.group[index="ntnow"]')

					if (ntnow.length) p.el = ntnow.find('.groupContent')

					rnow = true

				}

				self.shell({
					name :  'notifications',
					el :   p.el,
					data : {
						notifications : _notifications,
						ws : self.app.platform.ws,
						now : p.now,
						grou : grou,
						rnow : rnow
					},
					inner : inr

				}, function(_p){


					renders.loadingAndEmpty()

					if(watched){
						el.c.find('.more').html('('+ watched +')')
					}

					var ws = self.app.platform.ws
					

					_.each(_notifications, function(n){

						var e = null;

						

						if (n.mesType) e = ws.messages[n.mesType]
						if (n.msg && !e) e = ws.messages[n.msg]

						if (e && e.fastMessageEvents){

							e.fastMessageEvents(n, {
								el : _p.el.find('.notification[notification="'+n.txid+'"]')
							})
						}
					})

					

					self.app.nav.api.links(null, el.c, function(){
						self.closeContainer()
					})


					actions.seen()
					
				})
			},

			loadingAndEmpty : function(){

				if(!el.c) return

				if(self.app.errors.connection()){

					el.loader.addClass('hidden')
					el.empty.addClass('hidden')
					el.error.removeClass('hidden')

					return
				}

				el.error.addClass('hidden')
				el.empty.removeClass('hidden')

				if (!self.app.platform.sdk.notifications.inited || self.app.platform.sdk.notifications.loading){
					el.loader.removeClass('hidden')
				}
				else{
					el.loader.addClass('hidden')

					if (actions.getnotifications().length){
						el.empty.addClass('hidden')
					}
					else{
						el.empty.removeClass('hidden')
					}
				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.c.find('.showAll').on('click', events.showAll)

			inel.addEventListener('scroll', events.seen);
			
			el.c.find('.closecontainer').on('click', function(){
				self.closeContainer()
			})

			self.iclbks.lenta = function(){
				console.log("HERE&")
				renders.loadingAndEmpty()
			}

			if(isMobile()){

				var cc = el.c.find('.circularprogress');
				var maxheight = 220;

				var progress = new CircularProgress({
					radius: 30,
					strokeStyle: '#00A3F7',
					lineCap: 'round',
					lineWidth: 1,
					font: "100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",
					fillStyle : "#00A3F7",
					text : {						
						value : ""
					},
					initial: {
						strokeStyle: '#fff',
						lineWidth: 1
					}
				});

				progress.update(70);

				el.c.find('.circularprogressWrapper').html(progress.el);

				var trueshold = 90

				var w = el.c.closest('.customscroll')

				/*var parallax = new SwipeParallaxNew({

					el : el.c.find('.ntf'),

					allowPageScroll : 'vertical',
	
					directions : {
						down : {
							cancellable : true,						

							positionclbk : function(px){
								var percent = Math.abs(px) / trueshold;

								if (px >= 0){

									progress.options.text = {
										value: ''
									};

									progress.update(percent * 100);


									cc.height((maxheight * percent)+ 'px')								

									//tp.css('opacity', 1 -  (4 * percent))

								}

							},

							constraints : function(){
								if(w.scrollTop() == 0){
									return true;
								}
							},

							restrict : true,
							trueshold : trueshold,
							clbk : function(){

								el.loader.removeClass('hidden')

								self.app.platform.sdk.notifications.getNotifications(100).catch(e=>{
									return Promise.resolve()
								}).then(r => {

									if(!el.c) return

									el.loader.addClass('hidden')

									renders.notifications()
								})
	
							}
	
						}
					}
					
	
				}).init()*/
			}

		}

		var make = function(){

			setTimeout(function(){
				renders.notifications({
					seenFilter : p.inTooltip
				});
			}, 200)

			
		}

		var addWSClbk = function(){
			self.app.platform.sdk.notifications.clbks.added['notifications' + t] = function(notifications, now){

				renders.notifications({
					notifications : notifications,
					now : now
				})

			}

			self.app.platform.sdk.notifications.clbks.inited['notifications' + t] = function(notifications, now){
				renders.notifications()

			}
		}

		var removeWSClbk = function(){
			delete self.app.platform.sdk.notifications.clbks.added['notifications' + t]
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				var _notifications = p.notifications || self.app.platform.sdk.notifications.storage.notifications;

				clbk(data);

			},

			destroy : function(){
				el = {};

				t = ''

				if (seenTimer)
					clearTimeout(seenTimer)

				seenTimer = null

				inel.removeEventListener('scroll', events.seen);

				removeWSClbk();

				delete self.iclbks.lenta
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				
				el.new = el.c.find('.newWrapper')
				el.loader = el.c.find('.loader')
				el.empty = el.c.find('.empty')
				el.error = el.c.find('.error')

				if(p.insert == 'tooltip'){
					inel = el.c.find('.nabsContentWrapper')[0]

					t = 'tt'
				}
				else
				{
					t = ''
					inel = window
				}

				jinel = $(inel)

				renders.loadingAndEmpty()

				initEvents();

				make(p.insert);

				addWSClbk();

				p.clbk(null, p);
				
			},

			tooltip : {
				options : {
					theme : "lighttooltip notificationTolltip",
					position : 'left',
					zIndex : 50,
					distance : -47,
					functionPosition: function(instance, helper, position){
				        position.coord.top = 0;
						position.coord.left = 0;

				        return position;
					},
					arrow : false,

					trigger : 'custom',
					triggerOpen : {
						click: true
					},
					triggerClose : {
					}
				},
				//event : 'click'
			},

			wnd : {
				//header : "notifications",
				class : 'wndnotifications normalizedmobile maxheight',
				parallaxselector : '.wndback,.wndheader'
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
	module.exports = notifications;
}
else{

	app.modules.notifications = {};
	app.modules.notifications.module = notifications;

}