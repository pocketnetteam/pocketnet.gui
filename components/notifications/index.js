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

						console.log('inv.length', inv.length) */

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

				//console.log('self.app.platform.sdk.notifications.storage.notifications', self.app.platform.sdk.notifications.storage.notifications)

				if(!p) p = {};

				var _notifications = p.notifications || self.app.platform.sdk.notifications.storage.notifications;

				console.log("SADDSAADSDSA1111", _notifications.length)
				
				p.el = el.new;

				if(!p.el) return

				var time = self.app.platform.currentTime()
				var timedif = 86400

				

				if(p.seenFilter){
					_notifications = _.filter(_notifications, function(n){
						if(!n.seen || time - n.seen < timedif){
							return true
						}
					})
					
				}

				var watched = - _notifications.length + (p.notifications || self.app.platform.sdk.notifications.storage.notifications).length
					
				
				_notifications = _.sortBy(_notifications, function(n){
					return Number(-n.nblock)
				})

				console.log("SADDSAADSDSA", _notifications.length)

				self.shell({
					name :  'notifications',
					el :   p.el,
					data : {
						notifications : _notifications,
						ws : self.app.platform.ws,
							},
					inner : prepend

				}, function(_p){



					var f = 'fadeOut'
					var s = '.empty'

					if(watched){
						el.c.find('.more').html('('+ watched +')')

					}

					if(self.app.platform.sdk.notifications.storage.notifications.length){

						s = '.emptyNew'

						if(p.el.find('.notification').length == 0){
							f = 'fadeIn'
						}

					}
					else
					{
						f = 'fadeIn'
					}

					_.each(_notifications, function(n){
						var e = self.app.platform.ws.messages[n.msg].fastMessageEvents

						if (e){

							e(n, {
								el : _p.el.find('.notification[notification="'+n.txid+'"]')
							})
						}
					})

					if (el.c)
						el.c.find(s)[f](1);


					actions.seen()
					
				})
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

		}

		var make = function(){

			console.log(p, "PPPP")

			renders.notifications({
				seenFilter : p.inTooltip
			});
		}

		var addWSClbk = function(){
			self.app.platform.sdk.notifications.clbks.added['notifications' + t] = function(notifications){
				renders.notifications({
					notifications : notifications
				})
			}
		}

		var removeWSClbk = function(){
			delete self.app.platform.sdk.notifications.clbks.added['notifications' + t]
		}

		return {
			primary : primary,

			getdata : function(clbk){

				

				var data = {};

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
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				
				el.new = el.c.find('.newWrapper')

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
					functionPosition: function(instance, helper, position){
				        position.coord.top = 15;
				        position.coord.left += 10;

				        return position;
				    }
				},
				event : 'click'
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