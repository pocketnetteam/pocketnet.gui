var nodecontrol = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');


		var el, api = null, proxy = null,  info = null, system = null;

		var systemsettings = {
		
			'nodeenabled' : function(){

				if (system.node.enabled){

					var items = [{
						text : self.app.localization.e('easyNode_e10039'),
						action : function (clbk) {

							return proxy.system.request('set.node.enabled', {enabled : false}).then(r => {
								clbk()

								actions.refresh().then(r => {
									actions.refreshsystem()
								})
								
							})
						}
					}]

					menuDialog({
						items: items
					})

				}
				else{

					var items = [{
						text : self.app.localization.e('easyNode_e10040'),
						action : function (clbk) {

							return proxy.system.request('set.node.enabled', {enabled : true}).then(r => {
								actions.refresh().then(r => {
									actions.refreshsystem()
								})

								clbk()
							})

						
						}
					}]

					menuDialog({
						items: items
					})

					

				}
			},
			
			'binPath' : function(caller, defaultPath){
				return proxy.system.request('set.node.binPath', {defaultPath: defaultPath}).then(r => {
					actions.refresh().then(r => {
						actions.refreshsystem()
					})
				}).catch(e => {

				})
			},
			'ndataPath' : function(caller, defaultPath){
				return proxy.system.request('set.node.ndataPath', {defaultPath: defaultPath}).then(r => {
					actions.refresh().then(r => {
						actions.refreshsystem()
					})
				}).catch(e => {
				})
			},
            'dumpWallet' : function(caller, defaultPath){
				return proxy.system.request('set.node.dumpWallet', {}).then(r => {

                    if (r.filename)
                        sitemessage(`${self.app.localization.e('easyNode_e10041')} ${r.filename}`, null, 5000) // self.app.localization.e('successcopied')

				}).catch(e => {
                    if (e.code && e.message)
                        sitemessage(`(${self.app.localization.e('dcode')} ${e.code}): ${e.message}`, null, 5000)
                    else
                        sitemessage(`Unknown error`)
				})
			},
            'importWallet' : function(caller, defaultPath){
				return proxy.system.request('set.node.importWallet', {}).then(r => {

                    sitemessage(`${self.app.localization.e('easyNode_e10042')}`, null, 5000) // self.app.localization.e('successcopied')

				}).catch(e => {
                    if (!e.cancel) {
                        if (e.code && e.message)
                            sitemessage(`(${self.app.localization.e('dcode')} ${e.code}): ${e.message}`, null, 5000)
                        else
                            sitemessage(`Unknown error`)
                    }
				})
			},
		}

		var actions = {
			refreshsystem : function(){
				return proxy.system.api.get.settings().then(s => {
					system = s

					renders.all()
				})
			},
			refresh : function(){
				return proxy.get.info().then(r => {

					this.tick(r.info)

					renders.all()

					return Promise.resolve()
				})
			},
			allsettings: function(){
				renders.all()
			},
			tick : function(state){

				//var laststate = info

					info = state

				//if(!laststate || (new Date(laststate.time)).addSeconds(10) < new Date() ){
				
				//}
				
			},
			ticksettings : function(settings, s, changed){

				if (changed){
					system = settings
				}

				renders.all()
			},
			admin : function(){

				var address = self.app.platform.sdk.address.pnet()

				if(!address) return false

				if (proxy && info){
					return proxy.direct || _.indexOf(info.admins, address.address) > -1
				}

			},
			settings : function(el){
				el.find('[sys]').on('click', function(){
					var sys = $(this).attr('sys')
                    var path = $(this).attr('path')

					if (sys){
						var s = deep(systemsettings, sys)

						if (s) s($(this), path)
					}
				})
			},
			updateNode : function(){

				proxy.fetchauth('manage', {
					action : 'node.update',
					data : {
						all : 'all'
					}
				}).then(r => {

					actions.refresh().then(r => {
						renders.allsettings()
					})

					topPreloader(100);

				}).catch(e => {

					sitemessage(self.app.localization.e('e13293'))

					actions.refresh().then(r => {
						renders.allsettings()
					})

					topPreloader(100);

				})
			},
			installNode : function() {

				proxy.fetchauth('manage', {
					action : 'node.install',
					data : {}
				}).then(r => {

                    proxy.system.request('set.node.enabled', {enabled : true}).then(r => {

                        actions.refresh().then(r => {
                            renders.allsettings()
                            topPreloader(100);
                        })
                        
                    })

				}).catch(e => {

					sitemessage(self.app.localization.e('e13293'))

					actions.refresh().then(r => {
						renders.allsettings()
					})

					topPreloader(100);

				})
			},
			removeNode : function(all){

				proxy.fetchauth('manage', {
					action : 'node.delete',
					data : {
						all : all
					}
					
				}).then(r => {


					actions.refresh().then(r => {
						renders.allsettings()
					})

					topPreloader(100);

				}).catch(e => {

					sitemessage(self.app.localization.e('e13293'))

					actions.refresh().then(r => {
						renders.allsettings()
					})

					topPreloader(100);

				})
			},
		}

		var events = {
			
		}

		var lock = function(){
			el.c.find('.nodecontentmanage').addClass('lock')
		}

		var renders = {
			all : function(){

				if (el.c){

					
						renders.nodelanding(el.c)
						renders.electronfornode()

						renders.nodecontentmanage(el.c, function(){
							renders.nodecontentstate(el.c)
							renders.nodecontentmanagestacking(el.c)
							renders.nodecontentmanagewallet(el.c)
						})


					
					
				}
			},
		    nodecontentmanagestacking : function(elc, clbk) {
				if (actions.admin() && info.nodeControl.state.staking){

					self.shell({
						inner : html,
						name : 'nodecontentmanagestacking',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							nc : info.nodeControl,
							proxy : proxy,
							admin : actions.admin(),
							system : system,
						},

						el : elc.find('.stakingWrapper')

					},
					function(p){

						if (clbk)
							clbk()
					})
				}
			},
			nodecontentmanagewallet : function(elc, clbk){
				if (actions.admin() && info.nodeControl.state.wallet) {

					self.shell({
						inner : html,
						name : 'nodecontentmanagewallet',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							nc : info.nodeControl,
							proxy : proxy,
							admin : actions.admin(),
							system : system,
						},

						el : elc.find('.walletWrapper')

					},
					function(p) {

                        actions.settings(p.el)

						p.el.on('click', '.nodebalancedeposit', function() {
                            topPreloader(30);

                            proxy.fetchauth('manage', {
                                action : 'set.node.wallet.getnewaddress',
                                data : {}
                            }).then(r => {

                                dialog({
                                    class : 'zindex',
                                    html : `${self.app.localization.e('easyNode_e10043')} ${r}`,
                                    btn1text : self.app.localization.e('dcopyToClipboard'),
                                    btn2text : self.app.localization.e('dcancel'),
                                    success : function(){
                                        copycleartext(r)
                                        sitemessage(self.app.localization.e('successcopied'))
                                    }
                                })
    
                            }).catch(e => {
                                sitemessage(deep(e, 'message') || self.app.localization.e('e13293'))
                            })
						})

                        p.el.on('click', '.nodebalancewithdraw', function(){

							inputDialogNew({
								caption : self.app.localization.e('easyNode_e10044'),
								class : 'addressdialog',
								wrap : true,
								values : [
                                    {
                                        defValue : '',
                                        validate : 'empty',
                                        placeholder : "Address",
                                        label : self.app.localization.e('easyNode_e10045')
                                    },
                                    {
                                        defValue : 0,
                                        validate : 'empty',
                                        placeholder : "Amount",
                                        label : `${self.app.localization.e('easyNode_e10046')} (PKOIN)`
                                    }
                                ],
								success : function(v){
                                    topPreloader(30)

                                    if (v.length < 2) {
                                        sitemessage(self.app.localization.e('easyNode_e10047'))
                                        return false
                                    }

                                    if (v[0].length != 34) {
                                        sitemessage(self.app.localization.e('easyNode_e10048'))
                                        return false
                                    }

                                    if (isNaN(Number(v[1]))) {
                                        sitemessage(self.app.localization.e('easyNode_e10049'))
                                        return false
                                    }

                                    proxy.fetchauth('manage', {
                                        action : 'set.node.wallet.sendtoaddress',
                                        data : {
                                            address: v[0],
                                            amount: Number(v[1])
                                        }
                                    }).then(r => {

                                        dialog({
                                            class : 'zindex',
                                            html : `${self.app.localization.e('easyNode_e10050')} {r}`,
                                            btn1text : self.app.localization.e(self.app.localization.e('dcopyToClipboard')),
                                            btn2text : self.app.localization.e('dcancel'),
                                            success : function() {
                                                copycleartext(r)
                                                sitemessage(self.app.localization.e('successcopied'))
                                            }
                                        })
            
                                    }).catch(e => {
                                        sitemessage(deep(e, 'message') || self.app.localization.e('e13293'))
                                    })
								}
							})

						})

						if (clbk)
							clbk()
					})
				}
			},
			nodelanding : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'landing',
					data : {
						nc : info.nodeControl,
						admin : actions.admin(),
						system : system,
					},

					el : elc.find('.landing')

				},
				function(p){

					p.el.find('.learnmore').on('click', function(){
						

						self.nav.api.go({
							href : 'easynode',
							history : true,
							open : true,
							inWnd : true,

							essenseData : {
								action : function(){

									globalpreloader(true)

									setTimeout(function(){

										dialog({
											class : 'zindex',
											html : self.app.localization.e('easyNode_e10054'),
											btn1text : self.app.localization.e('dyes'),
											btn2text : self.app.localization.e('dno'),
											success : function(){
			
												lock()
												actions.installNode()
												
											}
										})

										globalpreloader(false)

									}, 600)

									

								}
							}
						})	

					})

					if (clbk)
						clbk()
				})

			},
			nodecontentmanage : function(elc, clbk){
				if(actions.admin()) {

					var timestamp = deep(info, 'nodeControl.state.timestamp')
					var dis = false

					if (timestamp && info.nodeControl.hasbin){
						dis = (new Date()) < ((new Date(timestamp)).addSeconds(5))
					}

					self.shell({
						inner : html,
						name : 'nodecontentmanage',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							nc : info.nodeControl,
							proxy : proxy,
							admin : actions.admin(),
							system : system,
							dis : false,
							showdirect : true
						},

						el : elc.find('.manage')

					},
					function(p){

						actions.settings(p.el)

						p.el.find('.updatenode').on('click', function(){
							dialog({
								class : 'zindex',
								html : self.app.localization.e('easyNode_e10051'),
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){

									lock()

									actions.updateNode()
									
								}
							})
						})

						p.el.find('.removenodeall').on('click', function(){
							dialog({
								class : 'zindex',
								html : self.app.localization.e('easyNode_e10052'),
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){
									lock()
									actions.removeNode(true)
									
								}
							})
						})

						p.el.find('.removenode').on('click', function(){
							dialog({
								class : 'zindex',
								html : self.app.localization.e('easyNode_e10053'),
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){
									lock()
									actions.removeNode()
									
								}
							})
						})

						p.el.find('.install').on('click', () => {

							topPreloader(20);

							dialog({
								class : 'zindex',
								html : self.app.localization.e('easyNode_e10054'),
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){

									lock()
									actions.installNode()
									
								}
							})

						})

                        p.el.find('.stopInstall').on('click', () => {
                            proxy.fetchauth('manage', {
                                action : 'node.breakInstall',
                                data : {}
                            })
						})

						p.el.find('.toDefaultPath').on('click', function(){
							dialog({
								class : 'zindex',
								html : self.app.localization.e('easyNode_e10055'),
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){

									globalpreloader(true)

									proxy.fetchauth('manage', {

										action : 'set.node.defaultPaths',
										data : {}

									}).then(r => {

										actions.refresh().then(r => {
											actions.refreshsystem()

											globalpreloader(false)
										})
			
									}).catch(e => {

										globalpreloader(false)
										
										sitemessage(self.app.localization.e('e13293'))
			
									})
								}
							})
						})

						p.el.find('.refreshother').on("click", function(){

							globalpreloader(true)

							proxy.fetchauth('manage', {

								action : 'set.node.check',
								data : {}

							}).then(r => {

								actions.refresh().then(r => {
									actions.refreshsystem()

									setTimeout(function(){
										globalpreloader(false)
									}, 300)
									
								})
	
							}).catch(e => {

								setTimeout(function(){
									globalpreloader(false)
								}, 300)
								
								sitemessage(self.app.localization.e('e13293'))
	
							})
						})

						if (clbk)
							clbk()
					})

				}
			},
			nodecontentstate : function(elc, clbk){
				if(actions.admin()){

					self.shell({
						inner : html,
						name : 'nodecontentstate',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							nc : info.nodeControl,
							proxy : proxy,
							admin : actions.admin(),
						},

						el : elc.find('.nodestateWrapper')

					},
					function(){
						if (clbk)
							clbk()
					})

				}
			},
			electronfornode : function(clbk){
				if(!actions.admin() && !(typeof _Electron != 'undefined' && _Electron)) {

					self.shell({
						inner : html,
						name : 'electronfornode',
						data : {
							
						},

						el : el.c.find('.downloadelectron')

					},
					function(p){

						self.nav.api.load({
							id : 'applications',
							open : true,
							el : p.el.find('.applicationscontainer'),

							essenseData : {
								filter : function(os){
									return os.node
								}
							}
						})

						if (clbk)
							clbk()
					})

				}
				else{
					el.c.find('.downloadelectron').html('')
				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function() {
            
			el.c.on('click', '.collapsepart .subcaption', function(){
				$(this).closest('.collapsepart').toggleClass('expanded')
			})

		}

		var destroy = function(){
			if (proxy) {
				delete proxy.system.clbks.tick.components_nodecontrol
				delete proxy.clbks.tick.components_nodecontrol
			}
		}

		var make = function(){
			destroy()

			info = null

			if (proxy) {

				proxy.system.clbks.tick.components_nodecontrol = actions.ticksettings
				proxy.clbks.tick.components_nodecontrol = actions.tick
			
				proxy.get.info().then(r => {

					info = r.info

					if (actions.admin()) {

						return proxy.system.request('get.settings').then((r) => {
							system = r;

							return Promise.resolve();
						})
					}
				}).then(() => {
					renders.all()
				})
			}

			else{
				info = {}
				renders.all()
			}

			
		}

		return {

			primary : primary,

			getdata : function(clbk, p){

				api = self.app.api

				var data = {};

				proxy = deep(p, 'settings.essenseData.proxy')
				
				if(!proxy){
					proxy = typeof _Electron != 'undefined' && _Electron ? self.app.api.get.direct() : null// : api.get.current()
				}
				
				clbk(data);

			},

			destroy : function(){
				el = {};

				destroy()
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				make(proxy);


				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				class : 'wndnodecontrol withoutButtons normalizedmobile',
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
	module.exports = nodecontrol;
}
else{

	app.modules.nodecontrol = {};
	app.modules.nodecontrol.module = nodecontrol;

}