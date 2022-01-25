var recommendedusers = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
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
								
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}
		
						})

					}
				})

				
			},
			subscribe : function(address){

				self.app.platform.api.actions.subscribeWithDialog(address, function(tx, err){

					if(tx){

						el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
						el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')	
					}
					else
					{
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

					if(tx){
						
						el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
						el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')	
					}
					else
					{
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
			page : function(addresses, clbk){

				el.loader.fadeOut();
				
				self.shell({

					name :  'users',
					el :   el.users,
					data : {
						addresses : addresses,
						extra : extra
					},

					inner : append

				}, function(_p){
					if (clbk)
						clbk()
				})
			}
		}

		var load = {

		}


		var state = {
			save : function(){

			},
			load : function(clbk){

				console.log('addresses', addresses)

				
				var shuffle = function(array) {
					let currentIndex = array.length,  randomIndex;
				  
					while (currentIndex != 0) {
				  
					  randomIndex = Math.floor(Math.random() * currentIndex);
					  currentIndex--;
				  
					  [array[currentIndex], array[randomIndex]] = [
						array[randomIndex], array[currentIndex]];
					}
				  
					return array;
				}

				if (addresses.length){

					if (clbk){
						clbk(shuffle(addresses).slice(0, 3));
					}

				} else {

					self.app.platform.sdk.users.getBestUsers(function(c, error){

						addresses = c;
	
						if (clbk){
							clbk(shuffle(addresses).slice(0, 3))
						}
					})

				}

			}
		}

		var initEvents = function(){

			self.app.platform.clbks.api.actions.unsubscribe.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('following')
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')
			}

						
			self.app.platform.clbks.api.actions.subscribe.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')		
			}

			self.app.platform.clbks.api.actions.subscribePrivate.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')	
				el.c.find('.user[address="'+address+'"] .notificationturn').addClass('turnon')	
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

				var data = {};

				clbk(data);

			},

			destroy : function(){

				window.removeEventListener('scroll', events.loadmorescroll)

				delete self.app.platform.clbks.api.actions.subscribe.userlist
				delete self.app.platform.clbks.api.actions.subscribePrivate.userlist
	
				delete self.app.platform.clbks.api.actions.unsubscribe.userlist
	
				delete self.app.platform.clbks.api.actions.blocking.userlist

				el = {};
			},
			
			init : function(p){


				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.usersWrapper');
				el.loader = el.c.find('.loader');

				state.load(renders.page);


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
	module.exports = recommendedusers;
}
else{

	app.modules.recommendedusers = {};
	app.modules.recommendedusers.module = recommendedusers;

}