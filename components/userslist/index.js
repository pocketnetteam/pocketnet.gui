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

		var emodule = null


		var mid = p.mid || ''

		var ed = {}

		var loading;

		var actions = {
			
			showprofile : function(address){

				if (self.app.mobileview){
					self.nav.api.load({
						open : true,
						id : 'channel',
						inWnd : true,
						history : true,
	
						essenseData : {
							id : address,
							openprofilebutton : true
						}
					})
				}
			},
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

					

					window.rifticker.add(() => {
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
			showprofile : function(){
				var address = $(this).attr('profile')

				actions.showprofile(address)
			},

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

			if (newadresses.length){

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
			
			el.c.find('.showmore').on('click', function(){

				self.nav.api.load({

					open : true,
					id : 'userslist',
					animation : false,
					inWnd: true,
					history: true,
					essenseData : {
						...ed,
						preview : false
					},
					
					clbk : function(e, p){
						emodule = p
					}

				})

			})

			self.app.platform.actionListeners[userslist + mid] = function({type, alias, status}){

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

			el.c.on('click', '[profile]', events.showprofile)
			
		}

		var make = function(){
			makepage(function(){

				if(ed.preview) return

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

			if (type == 'random'){

				return _.sortBy(addresses, (a) => {
					return rand(0, 1000)
				})

			}	

			return addresses
		}

		return {
			primary : primary,
			id : mid,
			getdata : function(clbk, p){

				end = false;
				page = 0;
				loading = false;

				var data = {};

				ed = deep(p.settings, 'essenseData') || {}

				sort = deep(p.settings, 'essenseData.sort') || null;

				addresses = sorting(deep(p.settings, 'essenseData.addresses') || [], sort)

				data.addresses = addresses
				data.count = ed.count || 0


				data.empty = deep(p.settings, 'essenseData.empty');
				data.caption = deep(p.settings, 'essenseData.caption');

				extra = deep(p.settings, 'essenseData.extra');
				data.ed = ed

				cnt = ed.preview ? 10 : 50

				//scnt = deep(p.settings, 'essenseData.cnt') || self.app.el.window;

				clbk(data);

			},

			destroy : function(){

				scnt.off('scroll', events.loadmorescroll)
				delete self.app.events.scroll['userlist']
				delete self.app.platform.actionListeners[userslist + mid]
				//scnt.removeEventListener('scroll', events.loadmorescroll)

				/*delete self.app.platform.clbks.api.actions.subscribe.userlist
				delete self.app.platform.clbks.api.actions.subscribePrivate.userlist
				delete self.app.platform.clbks.api.actions.unsubscribe.userlist
				delete self.app.platform.clbks.api.actions.blocking.userlist*/

				if (emodule){
					emodule.destroy()
					emodule = null
				}

				el = {};
				ed = {};
				addresses = []
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.users')

				scnt = el.c.closest('.customscroll:not(body)') 
				if(!scnt.length) scnt = self.app.el.window;

				initEvents();

				make();

				p.clbk(null, p);
			},

			wnd : {
				close : function(){
				},
				class : "userlistwindow normalizedmobile maxheight showbetter"
			},
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
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