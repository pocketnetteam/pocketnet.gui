var menu = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var el = {},
			authorForSearch = null,
			menusearch = null;

		var logotime = 180000, changeLogoInterval = null

		var loc = new Parameter({

			type : "VALUES",
			name : "Localization",
			id : 'localization',
			defaultValue : app.localization.current().name,
			possibleValues : app.localization.availableMap('name'),
			format : {
				right : true
			},

			_onChange : function(value){
				var a = app.localization.findByName(value);

				if (a && a.key != app.localization.key)
				{
					app.localization.set(a.key);
				}
			}

		})

		var updateNew = function(){

			var s = self.app.platform.sdk.newmaterials.storage

			window.requestAnimationFrame(() => {

				if(!el.c) return
				

				_.each(s, function(v, k){

					var _el = el.c.find('.lentaunseen[key="'+k+'"]')

					if(v > 99) v = '99'

					_el.html(v)

					if(v) _el.addClass('hasunseen')
					else _el.removeClass('hasunseen')

				})

			})
		}

		var notifications = {}

		var actions = {
			
		
			ahnotifyclear : function(){
				notifications = {}

				actions.ahnotify(null)
			},
			ahnotify : function(el, c, type){


				if(!c) c = 0

				if(type) notifications[type] = c

				var cnt = _.reduce(notifications, function(s, i){
					return s + (i || 0)
				}, 0)

				var cordovabadge = null;
					
				if(typeof cordova != 'undefined'){
					cordovabadge = deep(cordova, 'plugins.notification.badge')
				}

				if (el)
					actions.ah(el, notifications[type])

				if (cordovabadge) cordovabadge.set(cnt)

				self.app.platform.api.electron.notifications(cnt, 'notifications')

			},

			ah : function(el, c){

				window.requestAnimationFrame(() => {
					if (c > 0){
						el.addClass('amountHave')
					}
					else
					{
						el.removeClass('amountHave')
					}

					el.find('.amount').html(c)
				})
			},

			
		}

		var searchlickaction = function(link){
			
			var href = link.replace('https://', '').replace('http://', '').replace('bastyon://', '').replace('pocketnet/', '').replace('localhost/', '').replace('bastyon.com/', '').replace('pocketnet.app/', '')


			var p = {
				href : href,
				history : true,
				open : true
			}

			self.nav.api.go(p)

			var w = parameters(href, true).connect
			var cr = parameters(href, true).publicroom
			var ps =  parameters(href, true).ps
			var ref =  parameters(href, true).ref

			self.app.user.isState(function (state) {
				if(state){
					self.app.platform.matrixchat.connectWith = w || null
					self.app.platform.matrixchat.joinRoom = cr || null


					if(!ps && !cr && !w && !app.curation()){
						self.app.platform.matrixchat.backtoapp()
					}

					self.app.platform.matrixchat.wait().then(r => {
						self.app.platform.matrixchat.connect()
					})
				}
			})

			
		}

		var events = {


			chats : {
				click : function(){

					var show = deep(self, 'app.platform.matrixchat.core.apptochat')

					if (show) {
						self.app.mobile.vibration.small()
						show()
					}

				},

				init : function(el){

					self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu = function(count){
						actions.ahnotify(el, count, 'chat')
					}
				},

			},

			sitename : {

				click : function(){

					self.app.user.isState(function(state){

						//if(self.app.nav.get.pathname() != 'index'){

							var k = 'index';
							try {
								k = localStorage['lentakey'] || 'index'
							}
							catch (e) { }
							

							if (parameters().r == k) k = 'index'

							if (k != 'index') {

								if (k == 'video'){
									k = 'index?video=1'
								}
								else{

									if (k == 'read'){
										k = 'index?read=1'
									}
									else{
										k = 'index?r=' + k
									}

								
								}
								
							}

							if(!state) k = 'index'

							if(self.app.curation()){
								if(!state){
									k = 'welcome'
								}
								else{
									k = 'userpage'
								}
								
							}

							self.app.actions.scrollToTop()

							setTimeout(function(){
								self.nav.api.go({
									href : k,
									history : true,
									open : true,
									handler : parameters().video && parameters().v
								})
							}, 50)

							
						//}

					})

					
				},

				

			},

			activate : {
				click : function(){

					new dialog({
						header : self.app.localization.e('id167'),
						html : self.app.localization.e('id168'),
						class : "one",
						btn1text : self.app.localization.e('id169'),

						success : function(){
							self.app.platform.sdk.user.activateWithDialogs(function(result){

							})
						}
					})

				}
			},

			keyexport : {
				click : function(){
					self.app.mobile.vibration.small()
					self.app.platform.ui.showmykey({
						showsavelabel : true
					})

				},

				init : function(el){

					self.app.platform.sdk.registrations.clbks.menu = function(){

						window.requestAnimationFrame(() => {

							if (!self.app.platform.sdk.registrations.showprivate()){
								
								el.closest('.keyexportWrapper').addClass('hidden')

							}
							else
							{
								el.closest('.keyexportWrapper').removeClass('hidden')
							}

						})

						
					}

				}
			},

			notifications : {
				init : function(el){

					var unseen = function(){

						return _.filter(self.app.platform.sdk.notifications.storage.notifications, function(notification){
							if(notification.seen) return false

							var m = null;

							if (notification.mesType) m = self.app.platform.ws.messages[notification.mesType]
							if (notification.msg && !m) m = self.app.platform.ws.messages[notification.msg]


							if(!m) return false
							
							var tpl = m.fastMessage(notification)

							if(!tpl) return false


							return true
						})

					}

					self.app.platform.sdk.notifications.clbks.inited.menu =
					self.app.platform.sdk.notifications.clbks.added.menu =
					self.app.platform.sdk.notifications.clbks.seen.menu = function(){
						actions.ahnotify(el, unseen().length, 'notifications')
					}

					setTimeout(function(){

						if(!isTablet()){
							self.nav.api.load({
								eid : 'menu',
								open : true,
								id : 'notifications',
								el : el,
								inTooltip : true
							})
						}
						
					},2000)

					actions.ahnotify(el, unseen().length, 'notifications')

					
				},

				click : function(el){
					self.app.mobile.vibration.small(true)

					if(isTablet()){


						self.nav.api.go({
							open : true,
							href : 'notifications',
							inWnd : true,
							history : true,
							essenseData : {
							}
						})

					}

				}
			},

			
			savecross : {
				init : function(el){

					/*var n = deep(self.app, 'platform.sdk.user.storage.me.rc') || 0

					actions.ah(el, n)

					self.app.platform.ws.messages.event.clbks.menusave = function(d){
						if(d.mesType == 'userInfo'){

							var n = deep(self.app, 'platform.sdk.user.storage.me.rc') || 0

							actions.ah(el, n)
							
						}
					}*/


					

				},
				click : function(){


					self.nav.api.load({
						open : true,
						href : 'socialshare',
						history : true,
						inWnd : true,

						essenseData : {
							rescue : true
						}
					})
				}
			},

			search : {
				fast : true,
				click : function(){

					self.app.mobile.vibration.small()

					//el.c.addClass('searchactive')

					if (menusearch) {
						menusearch.setactive(true)
						window.requestAnimationFrame(() => {
							menusearch.focus()

						})
					}

					

				}
			},

			controlApp : {
				init : function(_el){
					_el.find('.control-app-back').on('click',()=>{
						if (history.length) {
							history.back()
						}
					})

					_el.find('.control-app-next').on('click',()=>{
						if (history.length) {
							history.forward() 
						}
					})

					_el.find('.control-app-refresh').on('click',()=>{

						var electron = require('electron');

						if (electron)
							electron.ipcRenderer.send('electron-refresh');
					})
					
				},
				fast : true,
			},
			
			searchinit : {
				init : function(_el){

					var close = function(cl){

						var pn = self.app.nav.current.href

						if (cl){

							if (menusearch)
								menusearch.setvalue('')
							closesearch()

						}
						
					}

				
					var render = function(results, value, clbk, p){

						renders.results(results, value, function(tpl){

							clbk(tpl, function(el, helpers){

								bgImages(el)

								self.app.nav.api.links(null, el, function(){

									helpers.closeResults()

									if (menusearch)
										menusearch.setactive(false)

								});

								el.find('.gotopage').on('click', function(){
									var r = $(this).attr('link')


									searchlickaction(r)

									helpers.closeResults()

									if (menusearch)
										menusearch.setactive(false)
								})


								el.find('.user').on('click', function(){

									var r = $(this).attr('address')
									var name = $(this).attr('name')

									self.nav.api.go({
										href : name ? name.toLowerCase() : 'author?address=' + r,
										history : true,
										open : true
									})

									helpers.closeResults()

									if (menusearch)
										menusearch.setactive(false)

									close()

									if (name){
										close(true)
									}

								})
							})

						}, p)
					}

					if (menusearch) {
						menusearch.destroy()

						menusearch = null
					}



					menusearch = mobsearch(el.postssearch, {
						placeholder : self.app.localization.e('e13139'),
						icon : '<i class="fas fa-search"></i>',
						app : self.app,
						mobileSearch : self.app.width <= 768,


						id : 'searchOnBastyon',

						right : true,

						clbk : function(_el){


						},

						last : {
							get : function(){

								var getresults = function(){
									
									var r = []

									var counts = {

									}

									_.each(self.sdk.activity.latest, function(c, k){

										_.each(c, function(v){
											counts[v.type] || (counts[v.type] = 0)

											if(counts[v.type] >= 7) return

											counts[v.type]++

											r.push(v)
										})
										
									})

									r = _.uniq(r, function(d){
										return d.type + d.index
									})

									r = _.sortBy(r, function(r){
										return -Number(r.date)
									})

									return r
								}

								return getresults();

							},

							tpl : function(result, clbk){
								render(result, '', clbk)
							}
						},

						events : {
							fastsearch : function(value, clbk){

								var result = {};
								var counts = {}

								var composeresult = function(type, results, count){

									result[type] = _.map(results, function(r){

										var vi = {
											type : type,
											data : r
										}

										if (type == 'user'){

											vi.id = r.address
											vi.index = r.name

											self.app.platform.sdk.users.nameaddressstorage[r.name.toLowerCase()] = r.address

										}

										return vi
									})

									counts[type] = count
								}

								var getresults = function(){
									var mp = ['user', 'tag']
									var r = []

									_.each(mp, function(k){
										r = r.concat(result[k] || [])
									})

									return r
								}

								//authorForSearch

								self.app.platform.sdk.search.get(value, 'users', null, 7, 0, function(r){

									composeresult('user', r.data, r.count)

									render(getresults(), value, clbk, {
										counts : counts
									})
								}, 'pocketnet', true)

								

							},

							search : function(value, clbk, e, helpers){


								if(menusearch && !menusearch.active){

									if (clbk) clbk(true)

									if (menusearch){
										menusearch.setactive(true)
									
										menusearch.focus()
									}

									

									return
								}

								if(value && self.app.thislink(value)){

									if (menusearch)
										menusearch.clear()

									if (clbk)
										clbk(true)

									return searchlickaction(value)
								}

								var href = '';

								if (value.indexOf('#') > -1){

									var wordsRegExp = /[,.!?;:() \n\r]/g

									var words = _.uniq(_.filter(value.replace(/#/g, '').split(wordsRegExp), function(r){
										return r
									}));

									href = 'index?sst=' + words.join(' ')
								}
								else{
									href = 'index?ss=' + value
								}

								var p = {
									href : href,
									history : true,
									open : true
								}

								if (authorForSearch) p.handler = true

								self.nav.api.go(p)


								if (menusearch)
									menusearch.clear()

								if (clbk)
									clbk(true)
								
							},

							clear : function(value){
								

								if(isTablet() && menusearch){
									menusearch.setactive(false)
								}

								
							},

							blank : function(){
								events.search.click()
							},

							active : function(a){

								window.requestAnimationFrame(() => {
									if (a){
										el.c.addClass('searchactive')
									}
									else{
										el.c.removeClass('searchactive')
									}
								})

							},

							blur : function(value){
								setTimeout(function(){
									if(!isTablet() && menusearch){
										menusearch.setactive(false)
									}
								}, 300)
							}
						}
						
					})

					
				}
			},

			application : {
				init : function(el){
					/*var calculateMarketingLogo = function(currentLogo) {
						var logosArr = ['fa-windows', 'fa-apple', 'fa-google-play'];
			
						return logosArr[(_.indexOf(logosArr, currentLogo) + 1) % logosArr.length];
					}
			
					var changeLogo = function() {
						var element = el.find('.changing-app-icon');

						element.css('opacity', '1')
			
						var iconLogoClasses = _.find((element.attr('class') || '').split(' '), function(elem) {
							return elem.indexOf('fa-') > -1;
						});

						element.removeClass(iconLogoClasses);
						element.addClass(calculateMarketingLogo(iconLogoClasses));
			
						setTimeout(function() {
							element.css('opacity', '0')
						}, logotime - 1500)
					}

					changeLogoInterval = setInterval(changeLogo, logotime);

					setTimeout(function(){
						el.find('.changing-app-icon').css('opacity', '0')
					}, logotime - 1000)*/

				},

				click : function(){

					var wnd = isMobile() || isTablet()

					self.nav.api.go({
						open : true,
						href : 'applications',
						inWnd : wnd,
						history : !wnd
					})

				}
			},
	
			state : {
				init : function(el){
					
					var action = function(){
						window.requestAnimationFrame(() => {
							if(!_.isEmpty(self.app.errors.state)){
								el.removeClass('hidden')
							}

							else{
								el.addClass('hidden')	
							}
						})
					}

					action()

					self.app.errors.clbks.menu = function(){
						action()
					}
				},


				click : function(){

					var state = self.app.user.getstate()

					var href = 'system16'

					if(state && !self.app.mobileview){
						href = 'userpage?id=system16'
					}

					self.app.platform.appstateclbk(function(){

						self.nav.api.go({
							open : true,
							href : href,
							history : true
						})
						
					})

				}
			},

		
			changeaccount : {
				click : function(){
					self.nav.api.go({
						open : true,
						href : 'accounts',
						inWnd : true,
						
						essenseData : {
							href : history.state.href || 'index'
						}
					})
					
				}
			},
			wallets : {
				click : function(){

					
					self.nav.api.go({
						open : true,
						href : self.app.mobileview ? 'wallet' : 'userpage?id=wallet',
						history : true,
						inWnd : self.app.mobileview
					})
					
				},

				init : function(el){

					var al = el.find('.number');
					var first = true;
					var current = 0;

					var set = function(value, add){

						var c = 'good';

						el.removeClass('hidden')

						if (add == 0){
							al.text(self.app.platform.mp.coin(value))

						}
						else
						{
							al.animateNumber({
						    	number: add,

						    	numberStep: function(now, tween) {

						        	var number = Number(value + now).toFixed(8),
						            	target = $(tween.elem);

						    		target.text(self.app.platform.mp.coin(number));

						    	},

						    }, rand(400, 1200), function(){
						    	el.removeClass(c)
						    });
						}
						
					}

					var setValue = function(){						

						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

							var t = self.app.platform.sdk.node.transactions.tempBalance()

							amount = amount + t

							var add = amount - current;

							if (first) {
								add = 0;
								current = amount
							}

							first = false;

							set(current, add)

							current = amount;

							self.app.platform.sdk.wallet.drawSpendLine(el.find('.numberWrp'))
						})

					}

					var act = function(){

						setValue()
						
					}

					self.app.platform.sdk.node.transactions.clbks.menu = act;

					act(0)
					
				}
			},
			signout : {
				click : function(){
					self.app.user.signout();

					self.app.reload({
						href : 'authorization'
					});
				}
			},
			signin : {
				init : function(element){

				},
				click : function(){
					self.app.mobile.vibration.small()
					self.app.platform.sdk.registrations.getredirectFromCurrentPage()
					self.nav.api.go({
						href : 'authorization',
						history : true,
						open : true
					})	
				}
			},

			signup : {
				init : function(element){

				},
				click : function(){
					self.app.mobile.vibration.small()
					self.app.platform.sdk.registrations.getredirectFromCurrentPage()
					self.nav.api.go({
						href : 'registration',
						history : true,
						open : true
					})	
				}
			},

		
		}

		var initEvents = function(){

			self.app.events.resize.menu = function(){
				if(self.app.width <= 768 && menusearch){
					events.searchinit.init()
				}

				if(self.app.width > 768 && !menusearch){
					events.searchinit.init()
				}
			}

			self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu2 = function(count){
				actions.ahnotify(null, count, 'chat')
			}

			el.c.find('.localization').on('click', function(){
				self.app.mobile.vibration.small()
				var items = []

				_.each(self.app.localization.available, function(a){
					items.push({
						text : a.name,
						action : function (clbk) {

							var na = app.localization.findByName(a.name);


							if (na && na.key != self.app.localization.key){
								self.app.mobile.vibration.small()
								self.app.localization.set(na.key);
							}

							clbk()

						}
					})
				})

				menuDialog({

                    items: items
				})
				
			})

			if (self.app.platform.sdk.newmaterials.clbks)
				self.app.platform.sdk.newmaterials.clbks.update.menu = updateNew

			el.c.find('[events]').each(function(){

				var element = $(this);

				var ekey = element.attr('events');

				if (events[ekey]){

					events[ekey].el = element

					_.each(events[ekey], function(action, event){

						if(typeof action == 'function'){
							if (event == 'init')
							{
								action(element)
							}
							else
							{

								if(event == 'click' && events[ekey].fast){
									element.on(clickAction(), action)
								}
								else{
									element.on(event, action)
								}

								
							}
						}

					})

				}

			})

			ParametersLive([loc], el.c);
		}

		var renders = {
			results : function(results, value, clbk, p){

				if(!p) p = {}

				self.shell({
					name :  'results',
					data : {
						results : results,
						value : value,
						counts : p.counts || {}
					},

				}, function(_p){

					if (clbk)
						clbk(_p.rendered);
				})
			}
		}

		var make = function(){

			self.app.user.isState(function(state){

				
			})

		}


		var closesearch = function(){
			if (el.c) el.c.removeClass('searchactive')

			if (menusearch){
				menusearch.blur()
				menusearch.hide()
			}
				
		}

		return {

			getdata : function(clbk, p){

				var data = {};

					loc.value = app.localization.current().name;

					data.loc = loc;
					data._SEO = _SEO;
					data.lkey = app.localization.current()
					data.theme = self.app.platform.sdk.theme.current == "white" ? 'white' : 'black'

					data.haschat = true ///self.app.platform.matrixchat.core || self.app.platform.matrixchat.inited || self.app.platform.matrixchat.initing

				if(p.state){

					var addr = self.sdk.address.pnet().address

					if (self.app.platform.sdk.registrations.showprivate()){
						data.key = true
					}

					self.app.platform.sdk.users.getone(addr, function(){
				
						clbk(data)

					})
					

				}
				else
				{
					clbk(data);
				}

				

			},

			destroy : function(){

				actions.ahnotifyclear()

				if (menusearch) 
					menusearch.destroy()

					menusearch = null

				delete self.app.events.resize.menu

				delete self.app.platform.sdk.newmaterials.clbks.update.menu

				delete self.app.platform.sdk.node.transactions.clbks.menu
				delete self.app.platform.ws.messages.event.clbks.menusave

				delete self.app.platform.sdk.notifications.clbks.seen.menu
				delete self.app.platform.sdk.notifications.clbks.added.menu

				delete self.app.errors.clbks.menu
				delete self.app.platform.sdk.registrations.clbks.menu

				delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu
				delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu2

				if (changeLogoInterval){
					clearInterval(changeLogoInterval)
					changeLogoInterval = null
				}

				_.each(events, function(e){

					delete e.el

					if (e.destroy)
						e.destroy()
				})

				//if (el.c) el.c.empty()

				el = {};
			},

			closesearch : function(){

				closesearch()
					
			},

			blursearch : function(){

				if (menusearch) {
					menusearch.blur()

					if(!menusearch.getvalue() && isTablet()){

						menusearch.setactive(false)
					}
				}
					
			},

			showsearch : function(v){
				window.requestAnimationFrame(() => {
					if (el.c){
						if (v){
							el.c.addClass('searchactive')
						}
						else{
							el.c.removeClass('searchactive')
						}
					}
				})

				

				if(menusearch) menusearch.setvalue(v.replace('tag:', "#"))

				
			},

			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cart = el.c.find('.cart');
				el.likes = el.c.find('.favorites');

				el.messagesCount = el.c.find('.dialogs .count');
				el.notificationsCount = el.c.find('.notifications .count');

				el.walletsAmount = el.c.find('.wallets .amount');
				el.notactive = el.c.find('.notactive');
				el.currency = el.c.find('.currencyWrapper');
				el.postssearch =  el.c.find('.postssearch')
				el.nav = el.c.find('.menutoppanel')

				actions.ahnotifyclear()

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

	self.blursearch = function(){
		_.each(essenses, function(essense){
			essense.blursearch();
		})
	}

	self.closesearch = function(){
		_.each(essenses, function(essense){

			essense.closesearch();

		})
	}

	self.showsearch = function(v){
		_.each(essenses, function(essense){

			essense.showsearch(v);

		})
	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = menu;
}
else{

	app.modules.menu = {};
	app.modules.menu.module = menu;

}