var application = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata, curpath, userAddress, isUserAuthor, grantedPermissions;

		var actions = {
			install : function(){
				

				globalpreloader(true)

				self.app.apps.install({
					...application,
					develop: true,
					version: numfromreleasestring(application.version || '1.0.0')
				}).then(() => {
					successCheck()
				}).catch(e => {
					console.error(e)
					sitemessage(self.app.localization.e('miniApp_installErrorMessage'), null, 5000)
				}).finally(() => {
					globalpreloader(false)
				})
	
			},
			gotohome : function(){

				if(self.container){
					self.closeContainer()
				}
				else{
					self.app.platform.ui.goback('index')
					/*self.app.nav.api.load({
						open : true,
						href : 'index',
	
						///href : 'home',
						history : true,
					})*/
				}

				
			},
			openinfo : function(){
				app.nav.api.load({
                    open : true,
                    id : 'applicationmeta',
                    inWnd : true,

                    essenseData : {
                        application : application.manifest.id,

						/*onremove : function(){
							actions.gotohome()
						}*/
                    }
                })
			},

			getpath : function(){
				var p = parameters().p || ''
				var decoded = ''

				if (p){

					try{
						decoded = hexDecode(p)
					}
					catch(e){
	
					}
				}

				return decoded


			}
		}

		const iframePermissionMap = {
			mobilecamera: "camera",
			geolocation: "geolocation",
			notifications: "notifications",
			microphone: "microphone",
		};

		var events = {
			pageevents : function(p, s){

				var sl = '.settings .icon'

				//if(isMobile() && !s) sl = '.abssettings .icon'

				p.el.find(sl).on('click', function(){
					renders.menu($(this))
				})

				p.el.find('.info').on('click', function(){
					actions.openinfo()
				})

				var chatel = p.el.find('.chat')

				chatel.on('click', events.chats.click)
				events.chats.init(chatel)
			},

			loaded : function(p){
				
				if(!application || !appdata) return
				
				if (p.application == appdata.id){
					el.c.find('.iframewrapper').addClass('loaded')
				}

				setTimeout(() => {
					if (el.c)
						el.c.find('.captionRow').addClass('notactive')
				}, 2000)
				
			},

			changestate : function(p = {}){
				if(!p.data) return
				if(!application || !appdata) return


				if (p.application == appdata.id/* && p.data.encoded*/){

					self.app.nav.api.history.addRemoveParameters([], {
						p: p.data.encoded
					}, {
						replaceState: p.data.replace
					})

					curpath = actions.getpath()
					
				}
			},

			permissionsChanged: function (p = {}) {
				const allowedStates = ['granted', 'forbid'];
				if (!allowedStates.includes(p.state)) return;

				if (!application || !appdata) return;
				if (p.application !== appdata.id) return;

				if (iframePermissionMap[p.permission]) {
					grantedPermissions = grantedPermissions || [];

					if (p.state === 'granted') {
						if (!grantedPermissions.find(perm => perm.id === p.permission)) {
							grantedPermissions.push({
								id: p.permission,
								state: 'granted'
							});
						}
					} else {
						grantedPermissions = grantedPermissions.filter(perm => perm.id !== p.permission);
					}

					renders.frameremote();
				}
			},

			installed : function(p = {}){				
				if (p.application?.id == application?.id){
					remake(p.application.id)
				}
			},

			removed : function(p = {}){

				if (p.application.manifest.id == application.manifest.id){
					remake(p.application.manifest.id)
				}
			},


			chats : {
				click : function(){

					var show = deep(self, 'app.platform.matrixchat.core.apptochat')

					if (show) {
						self.app.mobile.vibration.small()
						show()
					}

				},

				init : function(el){

					var setH = function(c){
						if(c){
							el.addClass('amountHave')
						}else{
							el.removeClass('amountHave')
						}

						el.find('.amount').html(c)
					}

					self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.application = function(count){
						setH(count)
					}

					setH(self.app.platform.matrixchat.getNotificationsCount())
				},

			},
		}

		var renders = {

			menu : function(el){

				var d = {application}

				self.fastTemplate('metmenu', (rendered, template) => {

					self.app.platform.api.tooltip(el, function(){

						return template(d);

					}, function(el, f, close){

						el.find('.settings').on('click', function(){
							actions.openinfo()

							close()
						})

						el.find('.close').on('click', function(){
							actions.gotohome()

							close()
						})

					})

				}, d)
		  
				
			},

			install : function(clbk){

				self.shell({

					name :  'install',
					el :   el.c,
					data : {
						application
					},

				}, function(p){


					p.el.find('.installButton button').on('click', function(){
						actions.install()
					})

					p.el.find('.back').on('click', function(){
						actions.gotohome()
					})

					events.pageevents(p, true)
					
					if (clbk)
						clbk();
				})
			},

			error : function(error, clbk){

				self.shell({

					name :  'error',
					el :   el.c,
					data : {
						application,
						error
					},

				}, function(p){

					events.pageevents(p, true)
					
					if (clbk)
						clbk();
				})
			},
			frame : function(html, clbk){

				/// unsafe, no use

				/*var blb = new Blob([html], {type: "text/html"});

				var src = URL.createObjectURL(blb)*/

				self.shell({

					name :  'frame',
					el :   el.c,

					data : {
						application
					},

				}, function(p){

					//iframeElem.contentDocument.documentElement.appendChild(m);

					var frame = p.el.find('iframe')[0]

					frame.contentWindow.document.open();
					frame.contentWindow.document.write(html);
					frame.contentWindow.document.close();

					events.pageevents(p)

					p.el.find('.back').on('click', function(){
						actions.gotohome()
					})

					if (clbk)
						clbk();
				})	
			},
			frameremote : function(scope, clbk){	
				let _scope = scope;
				const tscope = appdata.tscope 				

				if(!_scope) {
					const hasTestScope = Boolean(tscope);
					
					_scope = isUserAuthor && hasTestScope ? tscope : appdata.scope;
				}			

				var src = self.app.apps.normalizeScopeUrl(_scope + '/' + (actions.getpath() || application.manifest.start || ''))
				curpath = actions.getpath()

				/*if(window.testpocketnet){
					src = src + '?testnetwork=true'
				}*/

				const buildIframeAllowAttr = (permissions = []) => {					

          return permissions
            .map((p) => iframePermissionMap[p?.id])
            .filter(Boolean)
            .join("; ");
        };

				self.app.el.miniapps.hide();

        const iframeAllowAttr = buildIframeAllowAttr(grantedPermissions || []);

				
				self.shell({

					name :  'frameremote',
					el :   el.c,
					
					data : {
						application,
						iframeAllowAttr,
						isInDevMode: _scope === tscope,
						tscope: isUserAuthor && tscope,
						scope: appdata.scope,
						src
					},

				}, function(p){

					events.pageevents(p)

					p.el.find('.back').on('click', function(){
						if(self.app.electronview && history.length){
							history.back()
						}
						else{
							actions.gotohome()
						}
					})

					p.el.find('.forward').on('click', function(){
						if (history.length) {
							history.forward() 
						}
					})
					
					p.el.find('#domain-switch')?.on('change', function () {
						const isDevMode = this.checked;
						renders.frameremote(isDevMode ? tscope : appdata.scope);
					})

					p.el.find('.refresh').on('click',()=>{

						var electron = require('electron');

						if (electron)
							electron.ipcRenderer.send('electron-refresh');
					})

					if (clbk)
						clbk();
				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			self.app.apps.on('loaded', events.loaded)
			self.app.apps.on('changestate', events.changestate)

			self.app.apps.on('installed', events.installed)
			self.app.apps.on('permissions:changed', events.permissionsChanged)
			self.app.apps.on('removed', events.removed)


		}

		var remake = function(id){

			application = null
			appdata = null

			self.app.apps.get.application(id).then((f) => {

				if (f){
					application = f.application
					appdata = f.appdata?.data
				}

				make()

			}).catch(e => {
				make()
			})
		}

		var make = function(){

			if(!application){
				renders.error('application_notexist')
				return
			}

		if(!application.installed){
				renders.install()
				return
			}

			renders.frameremote()

			/*if (application.develop && !application.production){
				renders.frameremote()
			}
			else{

				self.app.apps.get.output(application.manifest.id).then((html) => {

					renders.frame(html)

				}).catch(e => {
					console.error(e)
					renders.error(e)
				})
				
			}*/

		}

		return {
			primary : primary,

			parametersHandler : function() {
				var id = parameters().id,
					p = parameters().p;

				if (id && (!application || application.manifest.id !== id)){

					remake(id)

					return
				}

				if (application && application.manifest.id == id) {

					var decoded = actions.getpath()

					if (decoded == curpath) return

						curpath = decoded

						self.app.apps.emit('changestate', {
							route : decoded
						}, application.manifest.id)

				
				}
			},
			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}
				
				window.rifticker.add(() => {
					self.app.el.html.addClass('allcontent_application')
					self.app.mobile.reload.destroyparallax()
				})

				var id = ed.application || parameters().id

				var path = ed.path || ''

				application = null
				appdata = null

      			userAddress = self.app.user.address.value;
				self.app.apps.get.application(id).then((f) => {

					if (f){
						
						application = f.application
						
						appdata = f.appdata?.data
						grantedPermissions = f.appdata?.permissions?.filter(permission => permission.state === 'granted')
						isUserAuthor = appdata && appdata.address === userAddress;

						if (ed.application){

							var ps = {}

							if(path) ps.p = path

							if(!ed.inWnd)
								ps.id = id

							self.app.nav.api.history.addRemoveParameters([], ps, {
								replaceState: true
							})
						}
					}
					
					
					
	
					var data = {
						ed
					};
	
					clbk(data);

				}).catch(e => {

					if(e == 'missing:application'){

					}

					console.error(e)

					ed = p.settings.essenseData

					var data = {
						ed
					};
	
					clbk(data);
					
				})

			},

			destroy : function(){
				ed = {}
				el = {};

				window.rifticker.add(() => {
					self.app.el.html.removeClass('allcontent_application')
					self.app.mobile.reload.initparallax()
				})

				self.app.apps.off('loaded', events.loaded)
				self.app.apps.off('changestate', events.changestate)

				self.app.apps.off('permissions:changed', events.permissionsChanged)
				
				self.app.el.miniapps.show();

				self.app.apps.off('installed', events.installed)
				self.app.apps.off('removed', events.removed)

					delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.application
			},
			
			init : function(p){

				state.load();

				curpath = ''

				el = {};
				el.c = p.el.find('#' + self.map.id + "fx");

				initEvents();

				make()

				p.clbk(null, p);

			
			},

			clearparameters: ['id', 'p'],

			wnd : {			
				class : 'appwindow',
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

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = application;
}
else{

	app.modules.application = {};
	app.modules.application.module = application;

}
