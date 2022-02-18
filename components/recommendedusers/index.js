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

						el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
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
						
						el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
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

				el.c.show();

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

						if (!c.length){

							self.app.platform.sdk.users.getRecommendedAccountsByTags(function(c, error){

								if (!error && c.length){

									el.c.show();

									addresses = c;
	
									if (clbk){
										clbk(shuffle(addresses).slice(0, 3))
									}

								}

							})

						} else {

							el.c.show();

							addresses = c;

							if (clbk){
								clbk(shuffle(addresses).slice(0, 3))
							}

						}
						

					})

				}

			}
		}

		var initEvents = function(){


			self.app.platform.clbks.api.actions.unsubscribe.recommendedusers = function(address){

				el.c.find('.user[address="'+address+'"] .subscribeWrapper').removeClass('following')
			}

						
			self.app.platform.clbks.api.actions.subscribe.recommendedusers = function(address){

				el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
			}

			self.app.platform.clbks.api.actions.subscribePrivate.recommendedusers = function(address){

				el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')	
			}


			el.c.on('click', '.subscribeButton', events.subscribe);
			el.c.on('click', '.unsubscribeButton', events.unsubscribe);
			el.c.on('click', '.subscribeButton', events.subscribePrivate);
			el.hide.on('click', function(){
				el.c.hide();
			})

			
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

				delete self.app.platform.clbks.api.actions.subscribe.recommendedusers
				delete self.app.platform.clbks.api.actions.subscribePrivate.recommendedusers
	
				delete self.app.platform.clbks.api.actions.unsubscribe.recommendedusers
	
				el = {};
			},
			
			init : function(p){


				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.usersWrapper');
				el.loader = el.c.find('.loader');
				el.hide = el.c.find('.hide');

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