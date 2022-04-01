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
			page = 0,
			parallax,
			progress,
			onlytags = false;

		var loading;

		var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

		var filterSubscribes = function(u){

			return !(me && me.relation(u.address, 'subscribes'));
		}


						
		var shuffle = function(array) {
			let currentIndex = array.length,  randomIndex;
		  
			while (currentIndex != 0) {
		  
			  randomIndex = Math.floor(Math.random() * currentIndex);
			  currentIndex--;
		  
			  [array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
			}

			console.log('p.essense.', array, p.essenseData.recommendedUsersCount)
		  
			return array.slice(0, p.essenseData.recommendedUsersCount || 3);
		}

		var actions = {
			
			getRecommendedAccountsByTags : function(clbk){

				self.app.platform.sdk.users.getRecommendedAccountsByTags(function(c, error){

					onlytags = true;

					

					if (!error && c.length){

						el.c.show();

						addresses = c;

						if (clbk){
							clbk(shuffle(addresses).filter(filterSubscribes))
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


				if (addresses.length){

					if (clbk){
						clbk(shuffle(addresses));
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
	
								addresses = shuffle(c).filter(filterSubscribes);

		
								if (clbk){
									clbk(addresses)
								}
	
							}
	
						})
						
					}

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

			/*console.log("ASD")

			self.app.platform.sdk.categories.clbks.excluded.recommendedusers =
			self.app.platform.sdk.categories.clbks.tags.recommendedusers =
			self.app.platform.sdk.categories.clbks.selected.recommendedusers = function(data){

				console.log("recommendedusers")

				if (el.users)
					el.users.empty();

				addresses = [];
				state.load(renders.page);
				
			}*/

			
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

				console.log("DESTROY")

				window.removeEventListener('scroll', events.loadmorescroll)

				delete self.app.platform.clbks.api.actions.subscribe.recommendedusers
				delete self.app.platform.clbks.api.actions.subscribePrivate.recommendedusers
				delete self.app.platform.clbks.api.actions.unsubscribe.recommendedusers

				delete self.app.platform.sdk.categories.clbks.excluded.recommendedusers
				delete self.app.platform.sdk.categories.clbks.tags.recommendedusers
				delete self.app.platform.sdk.categories.clbks.selected.recommendedusers
	
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