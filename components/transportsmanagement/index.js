var transportsmanagement = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, releaseTimeout = null, proxy, info = null, system = null;

		/*
		
		
		
		*/

		var changes = {}

		var systemsettings = {
			'torenabled2' : function(_el){
				var values = ['neveruse', 'auto', 'always']
				changes.torenabled2 = nextElCircle(values, _el.attr('value'))

				if(changes.torenabled2 == system.tor.enabled2) delete changes.torenabled2
			},
			'useSnowFlake' : function(_el){
				changes.useSnowFlake = !JSON.parse(_el.attr('value'))
				if(changes.useSnowFlake == system.tor.useSnowFlake) delete changes.useSnowFlake

			},
		}

		var actions = {
			settings : function(el){
				el.find('[sys]').on('click', function(){
					var sys = $(this).attr('sys')
                    var path = $(this).attr('path')

					if (sys){
						var s = deep(systemsettings, sys)

						if (s) s($(this), path)

						renders.settings()
					}
				})
			},

			admin : function(){

				var address = self.app.platform.sdk.address.pnet()

				if(!address) return false
				if (proxy && info){
					return proxy.direct || _.indexOf(info.admins, address.address) > -1
				}
			},
			directProxy : function(){

				return proxy.direct ? true : false
			},

			candirect : function(){
				return typeof _Electron != 'undefined'
			},

			history : function(){
				return self.app.platform.sdk.broadcaster.history
			},

			lastHistoryEvent : function(){
				return _.last(actions.history()) || {}
			},

			loadProxyData : function(){

				info = null

				return proxy.get.info().then(r => {
					info = r.info
				}).catch(() => {
					return null
				}).then(() => {
					if (actions.admin()) {
						return proxy.system.request('get.settings').catch(() => {
							return null
						})
					}

					return null
				}).then(s => {
					system = s
				})
					
			}
		}

		var events = {
			receiveNetworkStats : function(data){
				renders.stats(data)
			}
		}

		var renders = {
			settings : function(initial){

				if(system && info && actions.directProxy()){
					self.shell({
						name : 'settings',
						data : {
							changes,
							system : system,// tmp
							info : info // tmp
						},
						insertimmediately : initial,
						el : el.c.find('.settingsContent')
	
					},
					
					function(p){
						actions.settings(p.el)
	
						p.el.find('[remove]').on('click', function(){
							var s = $(this).attr('remove')
	
							if (s) delete changes[s]
	
							renders.settings()
						})
	
						p.el.find('.discard').on('click', function(){
							changes = {}
	
							renders.settings()
						})
	
						p.el.find('.save').on('click', function(){
							
							var _make = function(){
								globalpreloader(true)
								
								proxy.fetchauth('manage', {
									action: 'set.server.settings',
									data: {
										settings: changes
									}
								}).then(r => {
	
									changes = {}
		
									remake();
		
								}).catch(e => {
									console.error(e)
								}).finally(() => {
	
									setTimeout(() => {
										globalpreloader(false)
				
										topPreloader(100);
									}, 500)
									
								})
							}
							
							_make()
	
						})
					})
				}

				else{
					el.c.find('.settingsContent').html('')
				}

				
			},
			stats : function(stats, initial){

				self.shell({
					name : 'stats',
					data : {
						initial,
						stats : stats ///actions.directProxy() ? stats : {}
					},
					insertimmediately : initial,
					el : el.c.find('.statsWrapper')

				},
				
				function(p){
					if (releaseTimeout){
						clearTimeout(releaseTimeout)
					}

					if(!initial){
						releaseTimeout = setTimeout(() => {
							p.el.find('.current').removeClass('failed')

							p.el.find('.current .value span').html(formatBytes(0))
						}, 2000)
					}
				})

				
			},
			state : function(){

				var directProxy = actions.directProxy()
				var candirect = actions.candirect()

				self.shell({
					name : 'state',
					data : {
						directProxy,
						candirect,
						history : directProxy ? history : [],
						lastHistoryEvent : directProxy ? actions.lastHistoryEvent() : {},
						proxy : app.api.get.current(),
						system,
						info
					},

					el : el.c.find('.stateWrapper')

				},
				function(p){
					renders.stats(actions.lastHistoryEvent(), true)
					renders.settings(true)

					p.el.find('.change button').on('click', () => {

						new dialog({
							class : 'zindex',
							html : self.app.localization.e("torusing_proxychangequestion"),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
							success : function(){

								var promise = null

								if (actions.directProxy()){
									promise = self.app.api.changeProxyRandomWithoutPing()
								}

								else{
									promise = new Promise((resolve, reject) => {
										var d = self.app.api.get.direct()

										if (d){
											self.app.api.set.current(d.id).then(resolve).catch(reject)
										}

										else{
											reject()
										}
									})
								}

								if(promise){
									globalpreloader(true)

									promise.then(() => {
										remake()
									}).catch(e => {
										sitemessage(self.app.localization.e('error'))
									}).finally(() => {
										globalpreloader(false)
									})
								}

							}
						})

						
					})
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
			self.sdk.broadcaster.clbks['transportsmanagement'] = function(data){
				events.receiveNetworkStats(data)
			}

		}

		var remake = function(){
			proxy = app.api.get.current()

			actions.loadProxyData().then(() => {
				make()
			})
		}

		var make = function(){
			renders.state()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				proxy = app.api.get.current()

				ed = p.settings.essenseData

				changes = {}

				var data = {
					ed
				};

				actions.loadProxyData().then(() => {
					clbk(data);
				})

				

			},

			destroy : function(){
				ed = {}
				el = {};

				delete self.sdk.broadcaster.clbks['transportsmanagement']

				if (releaseTimeout){
					clearTimeout(releaseTimeout)
					releaseTimeout = null
				}
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
				class : 'withoutButtons transportsmanagementwindow normalizedmobile maxheight',
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
	module.exports = transportsmanagement;
}
else{

	app.modules.transportsmanagement = {};
	app.modules.transportsmanagement.module = transportsmanagement;

}