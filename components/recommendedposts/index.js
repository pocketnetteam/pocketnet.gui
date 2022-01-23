var recommendedposts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var shares = [],
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
			page : function(shares, clbk){

				el.loader.fadeOut();
				
				self.shell({

					name :  'posts',
					el :   el.posts,
					data : {
						shares : shares,
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

				if (shares.length){

					if (clbk){
						clbk(shuffle(shares).slice(0, 5));
					}

				} else {

					self.app.platform.sdk.posts.getRecommendedPosts(function(c, error){

						var postIds = c.map(function(post){
							return post.contentid;
						})

						self.app.platform.sdk.node.shares.getbyid(postIds, function(c, error){
		
							shares = c
	
							if (clbk){
								clbk(shuffle(shares).slice(0, 5))
							}
						})


					})



				}

			}
		}

		var initEvents = function(){
			
			self.app.platform.clbks.api.actions.subscribe.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')		
			}

			self.app.platform.clbks.api.actions.subscribePrivate.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')	
				el.c.find('.user[address="'+address+'"] .notificationturn').addClass('turnon')	
			}

			self.app.platform.clbks.api.actions.unsubscribe.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('following')
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')
			}

			self.app.platform.clbks.api.actions.blocking.userlist = function(address){
				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('blocking')		
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')			
			}

			self.app.platform.clbks.api.actions.unblocking.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('blocking')				
				el.c.find('.user[address="'+address+'"]').removeClass('userblocking')	
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
				el.posts = el.c.find('.posts');
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
	module.exports = recommendedposts;
}
else{

	app.modules.recommendedposts = {};
	app.modules.recommendedposts.module = recommendedposts;

}