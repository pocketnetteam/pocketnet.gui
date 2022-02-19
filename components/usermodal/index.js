var usermodal = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
			essenseData,
			cnt = 50,
			end = false,
			extra = null,
			page = 0;

		var loading;

		var actions = {
			
			
			unblocking : function(address){

				dialog({
					html : self.app.localization.e('e13023'),
					btn1text : self.app.localization.e('unblock'),
					btn2text : self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unblocking(address, function(tx, error){
							if(!tx){
								self.app.platform.errorHandler(error, true)	
							}
						})

					}
				})

				

			},
			unsubscribe : function(address){

				dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, err){

							if(tx){

								self.app.platform.errorHandler(err, true)	
							
							}

		
						})

					}
				})

				
			},
			subscribe : function(address){
				self.app.platform.api.actions.subscribeWithDialog(address, function(tx, err){

					if(!tx){
								
						self.app.platform.errorHandler(err, true)

					}

				})
			},
			subscribePrivate : function(address, off){

				var f = 'notificationsTurnOn'

				if(off){

					f = 'notificationsTurnOff'
					
				}

				self.app.platform.api.actions[f](address, function(tx, err){

					if(!tx){
			
						self.app.platform.errorHandler(err, true)
						
					}


				})
			}
		}

		var events = {

			unsubscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.unsubscribe(address)
			},
			subscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.subscribe(address)
			},

			subscribePrivate : function(){
				var address = $(this).closest('.user').attr('address')

				var off = $(this).hasClass('turnon')
				

				actions.subscribePrivate(address, off)
			}
		}

		var renders = {

		}

		var load = {

		}


		var state = {
			save : function(){

			},
			load : function(clbk){

			}
		}

		var initEvents = function(){

			self.app.platform.clbks.api.actions.subscribe.usermodal = function(address){

				el.c.addClass('following')
			}

			self.app.platform.clbks.api.actions.subscribePrivate.usermodal = function(address){

				el.c.addClass('following')

			}

			self.app.platform.clbks.api.actions.unsubscribe.usermodal = function(address){

				el.c.removeClass('following')

			}


			el.c.on('click', '.subscribe', events.subscribe)
			el.c.on('click', '.unsubscribe', events.unsubscribe)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			
		}

		var make = function(){

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				end = false;
				page = 0;
				loading = false;
				essenseData = p.settings.essenseData || {};

				var data = {
					u: essenseData.share
				};

				clbk(data);

			},

			destroy : function(){

				window.removeEventListener('scroll', events.loadmorescroll)

				delete self.app.platform.clbks.api.actions.subscribe.usermodal
				delete self.app.platform.clbks.api.actions.subscribePrivate.usermodal
	
				delete self.app.platform.clbks.api.actions.unsubscribe.usermodal
	
				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.users');
				el.loader = el.c.find('.loader');

				state.load();


				initEvents();

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
	module.exports = usermodal;
}
else{

	app.modules.usermodal = {};
	app.modules.usermodal.module = usermodal;

}