var application = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata, curpath;

		var actions = {
			gotohome : function(){
				self.app.nav.api.load({
					open : true,
					href : 'home',
					history : true,
				})
			},
			openinfo : function(){
				app.nav.api.load({
                    open : true,
                    id : 'applicationmeta',
                    inWnd : true,

                    essenseData : {
                        application : application.manifest.id,

						onremove : function(){
							actions.gotohome()
						}
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

		var events = {
			pageevents : function(p){
				p.el.find('.settings .icon').on('click', function(){
					renders.menu($(this))
				})

				var chatel = p.el.find('.chatDoubleRow')

				chatel.on('click', events.chats.click)
				events.chats.init(chatel)
			},

			loaded : function(p){

				if(!application) return

				if (p.application == application.manifest.id){
					el.c.find('.iframewrapper').addClass('loaded')
				}

				if (el.c)
					el.c.find('.captionRow').addClass('notactive')
			},

			changestate : function(p = {}){
				if(!p.data) return
				if(!application) return


				if (p.application == application.manifest.id/* && p.data.encoded*/){

					self.app.nav.api.history.addRemoveParameters([], {
						p: p.data.encoded
					}, {
						replaceState: p.data.replace
					})

					curpath = actions.getpath()
					
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

			error : function(error, clbk){

				self.shell({

					name :  'error',
					el :   el.c,
					data : {
						application,
						error
					},

				}, function(p){

					events.pageevents(p)
					
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

					if (clbk)
						clbk();
				})
			},
			frameremote : function(clbk){
				var src = application.manifest.scope + '/' + (actions.getpath() || application.manifest.start || '')
				curpath = actions.getpath()

				/*if(window.testpocketnet){
					src = src + '?testnetwork=true'
				}*/

				self.shell({

					name :  'frameremote',
					el :   el.c,

					data : {
						application,
						src 
					},

				}, function(p){

					events.pageevents(p)

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
		}

		var make = function(){

			if(!application || !appdata){
				renders.error('application_notexist')
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

					application = null
					appdata = null

					self.app.apps.get.application(id).then((f) => {

						if (f){
							application = f.application
							appdata = f.appdata
						}

						make()

					}).catch(e => {
						make()
					})

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
				
				window.rifticker.add(() => {
					self.app.el.html.addClass('allcontent_application')
					self.app.mobile.reload.destroyparallax()
				})

				var id = parameters().id

				application = null
				appdata = null

				self.app.apps.get.application(id).then((f) => {

					if (f){
						application = f.application
						appdata = f.appdata
					}
					
	
					ed = p.settings.essenseData
	
					var data = {
						ed
					};
	
					clbk(data);

				}).catch(e => {

					ed = p.settings.essenseData

					var data = {
						ed
					};
	
					clbk(data);

					/*console.error(e)

					setTimeout(() => {

						self.app.nav.api.load({
							open : true,
							href : 'page404',
							history : true,
							replaceState : true,
							fade : self.app.el.content
						})

					}, 200)*/
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

				delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.application

			},
			
			init : function(p){

				state.load();

				curpath = ''

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

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