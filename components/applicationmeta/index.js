var applicationmeta = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata;

		var actions = {
			managePermission : function(permission){

				var appsinfo = self.app.apps.info()

				var meta = appsinfo.permissions[permission]
            
				var status = _.find(appdata.permissions, function(_permission){
					return _permission.id == permission
				})

				var pr = Promise.resolve()


				if((!status && !meta.auto) || (status && status.state == 'forbid')){
					if(meta.auto || meta.level > 5){

						var r = self.app.apps.givePermission(application, permission)

						if(!r){
							console.error('permissions:unableGive:error')
							return
						}
						/// give
					}
					else{
						// ask

						if(self.app.apps.clearPermission(application, permission)){
							pr = self.app.apps.requestPermissions(application, [permission], {}, {
								noonce : true
							}).catch(e => {
								console.error(e)
								return Promise.resolve()
							})
						}

						else{
							console.error('permissions:unableRemove:error')
							return Promise.resolve()
						}
					}
				}

				else{

					var r = self.app.apps.removePermission(application, permission)

					if(!r){
						console.error('permissions:unableRemove:error')
						return
					}
					
				}

				pr.then(() => {
					renders.permissions()
				})
			},
			complain : function(id){
			
				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,

					essenseData : {
						item : 'miniapp',
						obj : application,

						success : function(){
							
						}
					},

					clbk : function(){
						
					}
				})
			},
		}

		var events = {
			installed : function(p = {}){
				if (p.application.manifest.id == application.manifest.id){
					self.closeContainer()
				}
			},

			removed : function(p = {}){
				if (p.application.manifest.id == application.manifest.id){
					self.closeContainer()
				}
			},
		}

		var renders = {
			author: function(clbk){

				if(!application.author){
					if(clbk) clbk()

					return
				}

				self.sdk.users.get([application.author], function () {

                    var user = self.psdk.userInfo.get(application.author)
                    
                    if (user){

                        self.shell({

							name :  'author',
							el :   el.c.find('.author'),
							data : {
								application,
								profile : user
							},
		
						}, function(p){
							if(clbk) clbk()
						})

                    }
					else{
						if(clbk) clbk()
						
						return
					}

                })

				
			},
			permissions : function(clbk){

				if(!appdata || !application){
					if (clbk)
						clbk()

					return
				}

				var appsinfo = self.app.apps.info()

				var permissions = _.filter(application.manifest.permissions, (permission) => {
					var meta = appsinfo.permissions[permission]

					if (meta) {

						if(meta.uniq) return false

						return true
					}

				})

				self.shell({

					name :  'permissions',
					el :   el.c.find('.permissions'),
					data : {
						application,
						appdata,
						appsinfo,
						permissions
					},

				}, function(p){

					p.el.find('.permission').on('click', function(){
						var permission = $(this).attr('permission')

						actions.managePermission(permission)
					})

					if (clbk)
						clbk()

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

			self.app.apps.on('installed', events.installed)
			self.app.apps.on('removed', events.removed)

			el.c.find('.install').on('click', () => {

				globalpreloader(true)

				var pr = self.app.apps.install({...application, version : numfromreleasestring(application.version)})
				
				pr.promise.then(() => {
					successCheck()
				}).catch(e => {

					console.error(e)

					sitemessage(JSON.stringify(e), null, 5000)
				}).finally(() => {
					globalpreloader(false)
				})

			})
			
			el.c.find('.report').on('click', () => {
	        actions.complain()
			})
			
			el.c.find('.remove').on('click', () => {

				new dialog({
                    html: self.app.localization.e(application.develop ? 'deleteapplicationQuestionDevelop' : 'deleteapplicationQuestion'),
                    btn1text: self.app.localization.e('dyes'),
                    btn2text: self.app.localization.e('dno'),

                    success: function () {
						
						self.app.apps.remove(application.manifest.id).then(() => {
							if(ed.onremove) ed.onremove()

							successCheck()

							setTimeout(() => {
								self.closeContainer()
							}, 300)

						}).catch(e => {
							sitemessage(JSON.stringify(e), null, 5000)
						})
						
                    },

                    fail: function () {
                    }
                })
			})

		}

		var make = function(){
			renders.permissions(() => {
				el.c.addClass('permissionsRendered')
			})

			renders.author()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}


				self.app.apps.get.applicationall(ed.application).then(f => {
					if(f) {
						return Promise.resolve(f)
					}


					///// TODO GET

					return Promise.resolve()

				}).then((f) => {
	
					application = f.application
					appdata = f.appdata
					userAddress = self.app.user.address.value;
	
					var data = {
						application,
						appdata,
						canReport: userAddress && userAddress !== appdata.address && Boolean(application.hash)
					};
	
					clbk(data);

				})

			

			},

			destroy : function(){
				ed = {}
				el = {};

				self.app.apps.off('installed', events.installed)
				self.app.apps.off('removed', events.removed)
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				class : 'applicationmetaWindow normalizedmobile maxheight withoutButtons',
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
	module.exports = applicationmeta;
}
else{

	app.modules.applicationmeta = {};
	app.modules.applicationmeta.module = applicationmeta;

}