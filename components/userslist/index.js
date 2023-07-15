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

				new dialog({
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

				new dialog({
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
			},

			statusClass : function(address){
				var element = el.c.find('.user[address="'+address+'"]')

				if (element.length){
					var me = self.psdk.userInfo.getmy() 

					if(!me) return

					var r = me.relation(address, 'subscribes')
					var rb = me.relation(address, 'blocking')

					

					window.requestAnimationFrame(() => {
						element.find('.notificationturn').removeClass('turnon')
						element.find('.subscribebuttonstop').removeClass('following')
						element.find('.subscribebuttonstop').removeClass('blocking')				
						element.removeClass('userblocking')

						if(r){

							element.find('.subscribebuttonstop').addClass('following')

							if (r.private == 'true' || r.private === true){
								element.find('.notificationturn').addClass('turnon')
							}
						}

						if (rb){
							element.find('.subscribebuttonstop').addClass('blocking')				
							element.addClass('userblocking')
						}
					})

					

					
				}
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
			
			/*self.app.platform.clbks.api.actions.subscribe.userlist = function(address){

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
				el.c.find('.user[address="'+address+'"]').addClass('userblocking')	
				el.c.find('.user[address="'+address+'"] .notificationturn').removeClass('turnon')			
			}

			self.app.platform.clbks.api.actions.unblocking.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('blocking')				
				el.c.find('.user[address="'+address+'"]').removeClass('userblocking')	
			}*/

			self.app.platform.actionListeners.userslist = function({type, alias, status}){

				if(type == 'unblocking'){
					actions.statusClass(alias.address.v)
				}

				if(type == 'blocking'){
					actions.statusClass(alias.address.v)
				}

				if(type == 'subscribe'){
					actions.statusClass(alias.address.v)
				}

				if(type == 'unsubscribe'){
					actions.statusClass(alias.address.v)
				}

				if(type == 'subscribePrivate'){
					actions.statusClass(alias.address.v)
				}
				
			}

			el.c.on('click', '.subscribe', events.subscribe)
			el.c.on('click', '.unsubscribe', events.unsubscribe)
			el.c.on('click', '.unblocking', events.unblocking)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			
		}

		var make = function(){
			makepage(function(){

				if(scnt.hasClass('applicationhtml')){
					self.app.events.scroll['userlist'] = events.loadmorescroll
				}
				else{
					scnt.on('scroll', events.loadmorescroll)
				}
				
			})
		}

		var sorting = function(addresses, type){

			if(!type) return addresses

			if (type == 'commonuserrelation'){

				var me = self.psdk.userInfo.getmy() 

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
				delete self.app.events.scroll['userlist']
				delete self.app.platform.actionListeners.userslist
				//scnt.removeEventListener('scroll', events.loadmorescroll)

				/*delete self.app.platform.clbks.api.actions.subscribe.userlist
				delete self.app.platform.clbks.api.actions.subscribePrivate.userlist
				delete self.app.platform.clbks.api.actions.unsubscribe.userlist
				delete self.app.platform.clbks.api.actions.blocking.userlist*/

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

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