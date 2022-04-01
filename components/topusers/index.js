var topusers = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
			cnt = 50,
			end = false,
			extra = null,
			page = 0,
			onlytags = false;

		var loading;

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

		var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

		var filterSubscribes = function(u){

			return !(me && me.relation(u.address, 'subscribes'));
		}

		var actions = {

			getRecommendedAccountsByTags : function(clbk){

				self.app.platform.sdk.users.getRecommendedAccountsByTags(function(c, error){


					onlytags = true;

					self.app.platform.sdk.categories.clbks.excluded.topusers =
					self.app.platform.sdk.categories.clbks.tags.topusers =
					self.app.platform.sdk.categories.clbks.selected.topusers = function(data){

						el.c.hide();
						el.users.empty();
						addresses = [];
						state.load(renders.page);
						
					}

					if (!error && c.length){

						el.c.show();

						addresses = c;

						if (clbk){
							clbk(shuffle(addresses).filter(filterSubscribes).slice(0, 5))
						}

					}

				})

			},
			
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

					self.app.platform.clbks.api.actions.subscribe.topusers = function(address){

						el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
						el.c.find('.user[address="'+address+'"] .modal .subscribeWrapper').addClass('following')	
						el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')		
					}
		
					self.app.platform.clbks.api.actions.subscribePrivate.topusers = function(address){
		
						el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
						el.c.find('.user[address="'+address+'"] .modal .subscribeWrapper').addClass('following')		
						el.c.find('.user[address="'+address+'"] .notificationturn').addClass('turnon')	
					}
		
					self.app.platform.clbks.api.actions.unsubscribe.topusers = function(address){
		
						el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('following')
						el.c.find('.user[address="'+address+'"] .modal .subscribeWrapper').removeClass('following')	
						el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')
					}
		
		
					el.c.on('click', '.subscribe', events.subscribe)
					el.c.on('click', '.unsubscribe', events.unsubscribe)
					el.c.on('click', '.notificationturn', events.subscribePrivate)
					
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


				if (addresses.length){

					el.c.show();

					if (clbk){
						clbk(shuffle(addresses).slice(0, 5));
					}

				} else {

					if (onlytags){

						actions.getRecommendedAccountsByTags(clbk);
							
					} else {

						self.app.platform.sdk.users.getBestUsers(function(c, error){

							if (!(c && c.length)){
	
								actions.getRecommendedAccountsByTags(clbk);
	
							} else {
	
								console.log('getrecomendedaccountsbyscoresfromaddress executed')
	
								el.c.show();
	
								addresses = c;
		
								if (clbk){
									clbk(shuffle(addresses).filter(filterSubscribes).slice(0, 5))
								}
	
							}
	
						})
						
					}

				}

			}
		}

		var initEvents = function(){

			
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

				delete self.app.platform.clbks.api.actions.subscribe.topusers
				delete self.app.platform.clbks.api.actions.subscribePrivate.topusers
	
				delete self.app.platform.clbks.api.actions.unsubscribe.topusers
	
				delete self.app.platform.clbks.api.actions.blocking.topusers

				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.users');
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
	module.exports = topusers;
}
else{

	app.modules.topusers = {};
	app.modules.topusers.module = topusers;

}