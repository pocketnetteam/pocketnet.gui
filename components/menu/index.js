var menu = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var el = {},
			authorForSearch = null,
			menusearch = null,
		    torIntervalId = null,
			controlTorElem = null,
			networkStatsListenerId = null;


		var updateNew = function(){

			var s = self.app.platform.sdk.newmaterials.storage

			window.rifticker.add(() => {

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

				window.rifticker.add(() => {
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

			receiveNetworkStats : function(stats) {
				if (stats.torUsed && controlTorElem) {
					controlTorElem.addClass(stats.status);

					setTimeout(() => {
						controlTorElem.removeClass(stats.status);
					}, 300);
				}
			}
		}

		var searchlickaction = function(link){
			
			var href = link.replace('https://', '').replace('http://', '').replace('bastyon://', '').replace('https//', '').replace('http//', '').replace('bastyon//', '').replace('pocketnet/', '').replace('localhost/', '').replace('bastyon.com/', '').replace('pocketnet.app/', '')


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

					
					if (self.app.platform.matrixchat)
						actions.ahnotify(el, self.app.platform.matrixchat.getNotificationsCount(), 'chat')


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
									else if (k == 'audio'){
										k = 'index?audio=1'
									}
									else{
										k = 'index?r=' + k
									}

								
								}
								
							}

							if(!state) k = 'index'

							if(k == self.app.nav.current.completeHref) k = 'index'

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
									handler : parameters().video && parameters().v,
									fade : self.app.el.content
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

						window.rifticker.add(() => {

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
							
							/*var tpl = m.fastMessage(notification)

							if(!tpl) {
								return false
							}
							else{
							}*/


							return true
						})

					}

					self.app.platform.sdk.notifications.clbks.inited.menu =
					self.app.platform.sdk.notifications.clbks.added.menu =
					self.app.platform.sdk.notifications.clbks.seen.menu = function(){
						actions.ahnotify(el, unseen().length, 'notifications')
					}

					setTimeout(function(){

						if(!isTablet() && !self.app.television){
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
					
					if(self.app.television){

						self.nav.api.go({
							open : true,
							href : 'notifications',
							history : true,
							essenseData : {
							}
						})

					}

				}
			},

			activities : {
				init : function(el){

						var gca = function(){
							var account = self.app.platform.actions.getCurrentAccount()
							var c = 0
	
							if (account){
								c = account.getTempActions().length
							}
	
							actions.ah(el, c)
						}
	
						self.app.platform.actionListeners['menu_activies'] = function({type, alias, status}){
							gca()
						}
	
						gca()

					

				},

				click : function(el){
					self.app.mobile.vibration.small(true)


					self.nav.api.go({
						open : true,
						href : 'activities',
						inWnd : true,
						history : true,
						essenseData : {
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
						window.rifticker.add(() => {
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

					controlTorElem = _el.find('.control-tor-state');
					const controlTorStatusText = _el.find('.tor-progress-text');

					self.sdk.broadcaster.clbks['menu'] = function(data){
						actions.receiveNetworkStats(data)
					}

					let proxyData;

					if (torIntervalId) {
						clearInterval(torIntervalId);
					}

					torIntervalId = setInterval(async () => {

						if(app.hasTor){

							if(window.cordova){

								var d = window.cordova?.plugins?.torRunner.getSettings()

                                if (d.torMode == 'UNDEFINED') {
                                    try{
                                        const locale = Intl.DateTimeFormat().resolvedOptions().locale
                                        const st = {
                                            torMode: 'AUTO'
                                        }
                                        if (locale == 'ru-RU' || locale == 'fa-IR') {
                                            st.bridgeType = 'SNOWFLAKE'
                                        } else {
                                            st.bridgeType = 'NONE'
                                        }
                                        window.cordova?.plugins?.torRunner.configure(st)
                                        d = window.cordova?.plugins?.torRunner.getSettings()
                                    } catch(e) {}
                                }

								if (d.torMode === 'NEVER' || d.torState === 'STOPPED') {
									controlTorElem.removeClass(['on', 'loading', 'failed']);
									controlTorElem.addClass('off');
									controlTorElem.attr('title', app.localization.e('torHintStateDisabled'));
									controlTorStatusText.removeClass('visible');

								} else if (d.torState === 'RUNNING') {
									controlTorElem.removeClass(['off', 'loading', 'failed']);
									controlTorElem.addClass('on');
									controlTorElem.attr('title', app.localization.e('torHintStateRunning')); ///

									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateEnabled'));

								} else if (d.torState === 'STARTING') {
									controlTorElem.removeClass(['on', 'off', 'failed']);
									controlTorElem.addClass('loading');
									controlTorElem.attr('title', app.localization.e('torHintStateStarting')); ///
									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateLoading'));
								} else if (d.torState === 'FAILED') {
									controlTorElem.removeClass(['on', 'loading', 'off']);
									controlTorElem.addClass('failed');
									controlTorElem.attr('title', '');
									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateDisabled'));
								}



							}
							else{
								const currentProxy = app.api.get.current();

								if (!currentProxy.direct) {
									controlTorElem.removeClass(['on', 'loading']);
									controlTorElem.addClass('off');
									controlTorStatusText.removeClass('visible');
									controlTorElem.attr('title', app.localization.e('torHintStateDisabled'));

									return;
								}

								proxyData = await currentProxy.get.info();

								if (proxyData?.info.tor.state.status === 'stopped'
									|| proxyData?.info.tor.enabled3 === 'neveruse') {
									controlTorElem.removeClass(['on', 'loading', 'failed']);
									controlTorElem.addClass('off');
									controlTorElem.attr('title', app.localization.e('torHintStateDisabled'));
									controlTorStatusText.removeClass('visible');
								} else if (proxyData?.info.tor.state.status === 'started') {
									controlTorElem.removeClass(['off', 'loading', 'failed']);
									controlTorElem.addClass('on');
									controlTorElem.attr('title', proxyData?.info.tor.state.info);
									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateEnabled'));
								} else if (proxyData?.info.tor.state.status === 'install'
									|| proxyData?.info.tor.state.status === 'running') {
									controlTorElem.removeClass(['on', 'off', 'failed']);
									controlTorElem.addClass('loading');
									controlTorElem.attr('title', proxyData?.info.tor.state.info);
									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateLoading'));
								} else if (proxyData?.info.tor.state.status === 'failed') {
									controlTorElem.removeClass(['on', 'loading', 'off']);
									controlTorElem.addClass('failed');
									controlTorElem.attr('title', '');
									controlTorStatusText.addClass('visible');
									controlTorStatusText.text(app.localization.e('torHintStateDisabled'));
								}
							}

							

						}
					}, 2000);

					controlTorElem.on('click', () => {

						self.nav.api.go({
							open : true,
							href : 'transportsmanagement',
							inWnd : true,
						})
					});
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

								bgImagesCl(el)

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
										href : name ? name.toLowerCase() : 'authorn?address=' + r,
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
						mobileSearch : self.app.width <= 768 || self.app.mobileview || self.app.television,


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

											if(counts[v.type] >= 6) return

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

									r = _.filter(r, (a) => {
										return a.type != 'video'
									})

									var apps = self.app.apps.get.forsearch()

									r = apps.concat(r)


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
									//composeresult('address', frommap, frommap.length)

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
								

								window.rifticker.add(() => {
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
						window.rifticker.add(() => {
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

						window.rifticker.add(() => {
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
	
										window.rifticker.add(() => {
											target.text(self.app.platform.mp.coin(number));
										})
	
									},
	
								}, rand(400, 1200), function(){
									window.rifticker.add(() => {
										el.removeClass(c)
									})
								});
							}
						})

					}

					var setValue = function(){	
						var account = self.app.platform.actions.getCurrentAccount()

						if(!account){
							set(0,0)
						}
						else{
							var balance = account.actualBalance(account.allAddresses())

							var add = balance.actual - current;

							if (first) {
								add = 0;
								current = balance.actual
							}

							if(!first && current == balance.actual) return


							first = false;

							set(current, add)

							current = balance.actual

							self.app.platform.sdk.wallet.drawSpendLineActions(el.find('.numberWrp'), balance)
						}

						

					}

					self.app.platform.actions.clbk('change', 'menu', setValue)


					setValue()
					
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

			self.app.nav.clbks.history.menunavigation = function(href){
				renders.menunavigation()
			}

			self.app.platform.sdk.registrations.clbks.menunavigation = function(){
				renders.menunavigation()
			}

			self.app.events.resize.menu = function(){
				/*if(self.app.width <= 768 && menusearch){
					events.searchinit.init()
				}

				if(self.app.width > 768 && !menusearch){
					events.searchinit.init()
				}*/
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

			self.app.platform.actionListeners['menu'] = function({type, alias, status}){

				if (type == 'userInfo'){
					renders.userinfo()
				}

				if (type == 'accDel'){
					renders.userinfo()
				}
				
			}

			//ParametersLive([loc], el.c);
		}

		var renders = {
			menunavigation : function(clbk){

				if(self.app.mobileview && app.nav.current){

					var pathname = app.nav.current.href

					self.shell({
						name :  'navicon',
						data : {
							pathname,
							path : app.nav.current.completeHref
						},

						el : el.c.find('.naviconwrapper')

					}, function(_p){

						_p.el.find('.item').on('click', function(){
							if (pathname == 'index'){

								self.nav.api.go({
									open : true,
									href : 'share',
									inWnd : true,
									history : true,
									
									essenseData : {
										rmhistory : true
									}
								})

							}
							else{
								self.app.platform.ui.goback()
							}
						})

						


						if(clbk) clbk()
					})

				}
				else{
					if(clbk) clbk()
				}


			},
			results : function(results, value, clbk, p){

				if(!p) p = {}

				var frommap = _.map(_.filter(self.app.map, (m) => {
					return m.insearch && value == m.href
				}), (m) => {
					return ":" + m.href
				})

				self.shell({
					name :  'results',
					data : {
						results : results,
						value : (frommap.length ? ":" : "") + value,
						counts : p.counts || {},
					},

				}, function(_p){

					if (clbk)
						clbk(_p.rendered);
				})
			},

			userinfo: function(clbk){

				self.shell({
					name :  'userinfo',
					data : {
						
					},

					el : el.userinfoWrapper

				}, function(_p){
					if(clbk) clbk()
				})
			},

			
		}

		var make = function(){

			renders.userinfo()
			renders.menunavigation()

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

					//loc.value = app.localization.current().name;

					//data.loc = loc;
					data._SEO = _SEO;
					data.lkey = app.localization.current()
					data.theme = self.app.platform.sdk.theme.current == "white" ? 'white' : 'black'

					data.haschat = true ///self.app.platform.matrixchat.core || self.app.platform.matrixchat.inited || self.app.platform.matrixchat.initing

				if(p.state){

					var addr = self.app.user.address.value

					//if (self.app.platform.sdk.registrations.showprivate()){
						data.key = true
					//}

					self.app.platform.sdk.users.getone(addr, function(){
				
						clbk(data)

					}, true)
					

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

				delete self.app.platform.actionListeners['menu']

				delete self.app.nav.clbks.history.menunavigation
	
				delete self.app.platform.sdk.registrations.clbks.menunavigation


				self.app.platform.actions.clbk('change', 'menu', null)


				delete self.app.platform.sdk.notifications.clbks.seen.menu
				delete self.app.platform.sdk.notifications.clbks.added.menu

				delete self.app.errors.clbks.menu
				delete self.app.platform.sdk.registrations.clbks.menu

				delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu
				delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.menu2

				delete self.app.platform.actionListeners['menu_activies']


				_.each(events, function(e){

					delete e.el

					if (e.destroy)
						e.destroy()
				})

				clearInterval(torIntervalId);

				torIntervalId = null;
				controlTorElem = null;
				networkStatsListenerId = null;

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
				window.rifticker.add(() => {
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


				el.postssearch =  el.c.find('.postssearch')
				el.userinfoWrapper = el.c.find('.userinfoWrapper')
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

			window.rifticker.add(() => {
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