var userslist = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
			cnt = 50,
			scnt = null,
			end = false,
			extra = null,
			sort = null,
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
			loadmorescroll : function(){

				if (

					(el.c.height() - scnt.scrollTop() < 1000) 

					&& !loading && !end) {

					makepage()

				}
			},
			unblocking : function(){
				var address = $(this).closest('.user').attr('address')

				actions.unblocking(address)
			},
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
			info : function(addresses, clbk){
				if(loading) return

				loading = true;

				topPreloader(80);

				el.c.addClass('loading')


				self.sdk.users.get(addresses, function(){

					el.c.removeClass('loading')

					loading = false;

					topPreloader(100);

					if (clbk)
						clbk()
				}, true)
			}
		}

		var makepage = function(clbk){

			var newadresses = _.filter(addresses, function(a, i){
				if(i >= (page * cnt) && i < ((page + 1) * cnt)){
					return true;
				}
			})	

			if(newadresses.length){

				load.info(newadresses, function(){
					renders.page(newadresses, clbk)
				})

				page++
			}
			else
			{
				end = true;
			}

			

		}

		var state = {
			save : function(){

			},
			load : function(){
				
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
			el.c.on('click', '.unblocking', events.unblocking)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			
		}

		var make = function(){
			makepage(function(){
				scnt.on('scroll', events.loadmorescroll)
			})
		}

		var sorting = function(addresses, type){

			if(!type) return addresses

			if (type == 'commonuserrelation'){

				var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value)

				return _.sortBy(addresses, function(address){

					return -self.app.platform.sdk.users.commonuserpoint(address, me)
				})

			}	

			return addresses
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				end = false;
				page = 0;
				loading = false;

				var data = {};

				sort = deep(p.settings, 'essenseData.sort') || null;

				addresses = sorting(deep(p.settings, 'essenseData.addresses') || [], sort)

				data.addresses = addresses

				data.empty = deep(p.settings, 'essenseData.empty');
				data.caption = deep(p.settings, 'essenseData.caption');

				extra = deep(p.settings, 'essenseData.extra');

				//scnt = deep(p.settings, 'essenseData.cnt') || $(window);

				clbk(data);

			},

			destroy : function(){

				scnt.off('scroll', events.loadmorescroll)
				//scnt.removeEventListener('scroll', events.loadmorescroll)

				delete self.app.platform.clbks.api.actions.subscribe.userlist
				delete self.app.platform.clbks.api.actions.subscribePrivate.userlist
	
				delete self.app.platform.clbks.api.actions.unsubscribe.userlist
	
				delete self.app.platform.clbks.api.actions.blocking.userlist

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.users')


				scnt = el.c.closest('.customscroll:not(body)') 
				if(!scnt.length) scnt = $(window);

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
	module.exports = userslist;
}
else{

	app.modules.userslist = {};
	app.modules.userslist.module = userslist;

}