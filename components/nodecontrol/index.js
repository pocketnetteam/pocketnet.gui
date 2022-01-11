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
						text : "Disable "+self.app.meta.fullname+" Node",
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
						text : "Enable "+self.app.meta.fullname+" Node",
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
                        sitemessage(`Your wallet saved to ${r.filename}`, null, 5000) // self.app.localization.e('successcopied')

				}).catch(e => {
                    if (e.code && e.message)
                        sitemessage(`(Code ${e.code}): ${e.message}`, null, 5000)
                    else
                        sitemessage(`Unknown error`)
				})
			},
            'importWallet' : function(caller, defaultPath){
				return proxy.system.request('set.node.importWallet', {}).then(r => {

                    sitemessage(`Your wallet imported to node`, null, 5000) // self.app.localization.e('successcopied')

				}).catch(e => {
                    if (e.code && e.message)
                        sitemessage(`(Code ${e.code}): ${e.message}`, null, 5000)
                    else
                        sitemessage(`Unknown error`)
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
			installNode : function(){

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

		var renders = {
			all : function(){

				if (el.c){

					renders.nodecontentmanage(el.c, function(){
						renders.nodecontentstate(el.c)
						renders.nodecontentmanagestacking(el.c)
						renders.nodecontentmanagewallet(el.c)
					})
					
				}
			},
			nodecontent : function(elc, clbk){

				if(actions.admin()){

					self.shell({
						inner : html,
						name : 'nodecontent',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							proxy : proxy,
							admin : actions.admin()
						},
	
						el : elc.find('.localnodeWrapper')
	
					},
					function(){

						if (clbk)
							clbk()
					})

				}
				else{
					if(clbk) clbk()
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
                                    html : "Your new address " + r,
                                    btn1text : self.app.localization.e('Copy to ClipBoard'),
                                    btn2text : self.app.localization.e('Cancel'),
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
								caption : "Input Address and Amount for transfer PKOIN",
								class : 'addressdialog',
								wrap : true,
								values : [
                                    {
                                        defValue : '',
                                        validate : 'empty',
                                        placeholder : "Address",
                                        label : "Destination Address"
                                    },
                                    {
                                        defValue : 0,
                                        validate : 'empty',
                                        placeholder : "Amount",
                                        label : "Amount (PKOIN)"
                                    }
                                ],
								success : function(v){
                                    topPreloader(30)

                                    // TODO (brangr): test send transaction or create - after OK send
                                    proxy.fetchauth('manage', {
                                        action : 'set.node.wallet.',
                                        data : {}
                                    }).then(r => {

                                        dialog({
                                            class : 'zindex',
                                            html : "Your new address " + r,
                                            btn1text : self.app.localization.e('Copy to ClipBoard'),
                                            btn2text : self.app.localization.e('Cancel'),
                                            success : function(){
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
			nodecontentmanage : function(elc, clbk){
				if(actions.admin()) {

					var timestamp = deep(info, 'nodeControl.state.timestamp')
					var dis = false

					if (timestamp && info.nodeControl.hasbin){
						dis = (new Date()) < ((new Date(timestamp)).addSeconds(5))
					}

					console.log('info', dis, (new Date()), ((new Date(timestamp)).addSeconds(5)),
					
					
					(new Date()) > ((new Date(timestamp)).addSeconds(5)))

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
							dis : dis,
							showdirect : true
						},

						el : elc.find('.manage')

					},
					function(p){

						var lock = function(){
							p.el.find('.nodecontentmanage').addClass('lock')
						}

						actions.settings(p.el)

						p.el.find('.updatenode').on('click', function(){
							dialog({
								class : 'zindex',
								html : "Do you really want to Stop "+self.app.meta.fullname+" Node and Update It?",
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
								html : "<b>Attention!</b><br><br>Make a wallet backup:<br><b>wallet.dat</b><br><b>wallets/</b><br><br>Do you really want to remove "+self.app.meta.fullname+" Node and All Blockchain Data?",
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
								html : "Do you really want to remove "+self.app.meta.fullname+" Node Daemon?",
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
								html : "Do you really want to install "+self.app.meta.fullname+" Node?",
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){
									lock()
									actions.installNode()
									
								}
							})

							

						})

						p.el.find('.toDefaultPath').on('click', function(){
							dialog({
								class : 'zindex',
								html : "Do you really want to set "+self.app.meta.fullname+" Node Path to Default path?",
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
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			

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

			
		}

		return {

			primary : primary,

			getdata : function(clbk, p){

				api = self.app.api

				var data = {};

				proxy = deep(p, 'settings.essenseData.proxy') || api.get.current()

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

				make(api.get.current());


				initEvents();

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
	module.exports = nodecontrol;
}
else{

	app.modules.nodecontrol = {};
	app.modules.nodecontrol.module = nodecontrol;

}