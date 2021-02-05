
var system16 = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, api = null, proxy = null, info = null, stats = [], system = null;

		var graphs = {}

		var colors = ['#F0810F', '#011A27', '#4897D8', '#E6DF44', '#063852', '#486824']

		var settings = {
			charts : {
				nodes : {
					type : 'rating'
				},
				server : {
					type : 'connections'
				},
				wallets : {
					type : 'distribution'
				},
			}
		}

		var systemsettings = {
			'nodeenabled' : function(){

				if (system.node.enabled){

					var items = [{
						text : "Disable Pocketnet Node",
						action : function (clbk) {

							return proxy.system.request('set.node.enabled', {enabled : false}).then(r => {
								clbk()
							})
						}
					}]

					menuDialog({
						items: items
					})

				}
				else{

					return proxy.system.request('set.node.enabled', {enabled : true}).then(r => {

						//renders.allsettings()
					})

				}
				console.log('sd')
			}
		}

		var actions = {
			admin : function(){

				var address = self.app.platform.sdk.address.pnet()

				if (proxy && info){
					return proxy.direct || _.indexOf(info.admins, address.address) > -1
				}
			},

			ticksettings : function(settings, s, changed){


				if (changed){
					system = settings

					renders.allsettings()
				}
			},

			tick : function(state){

				info = state


				var laststate = stats[stats.length - 1]

				if(!laststate || (new Date(laststate.time)).addSeconds(10) < utcnow() ){
					stats.push({
						info : info,
						time : utcnow()
					})

					stats = lastEls(stats, 1000)
				}

				if (el.c){
					renders.nodecontentstate(el.c)
					renders.nodescontenttable(el.c)
				}

				

				//updateall

				//makers.proxycurrent()

				setTimeout(function(){
					makers.stats(true)
				}, 200)
			},

			addnode : function(_node, clbk){

				var editing = false;
				var method = 'create'
				var header = self.app.localization.e('e13044')
				var buttontext = self.app.localization.e('add')

				if(_node) {
					editing = true;
					method = 'update';
					header = self.app.localization.e('e13062');
					buttontext = self.app.localization.e('save')
				}

				_node || (_node = {})

				var ap = {

					host : new Parameter({

						type : "STRING",
						name : self.app.localization.e('nodehost'),
						id : 'host',

						defaultValue : _node.host || '',
						placeholder : "0.0.0.0",
						require : true
					
					}),

					port : new Parameter({

						type : "STRING",
						name : self.app.localization.e('e13063'),
						id : 'port',
						defaultValue : _node.port || '38081',
						placeholder : "38081",
						require : true
					
					}),

					ws : new Parameter({

						type : "STRING",
						name : self.app.localization.e('e13064'),
						id : 'ws',
						defaultValue : _node.ws || '8087',
						placeholder : "8087",
						require : true
					
					}),
					
					nodename : new Parameter({

						type : "STRING",
						name : self.app.localization.e('e13065'),
						id : 'nodename',
						defaultValue : (_node.nodename || ((self.app.platform.api.clearname(deep(app, 'platform.sdk.user.storage.me.name')) || "New") + ' node')).replace(/\+/g, ' '),
						placeholder : self.app.localization.e('e13066'),
						require : true
					
					})

				}

				var wndbuttons = {

					close : {
						class : 'close',
						html : '<i class="fas fa-times"></i> ' + self.app.localization.e('close'),
						fn : function(wnd, wndObj){
							wndObj.close();
						}
					},

					success : {
						class : 'success',
						html : '<i class="fas fa-check"></i> ' + buttontext,
						fn : function(wnd, wndObj){

							var bkp = _.clone(_node)

							var f = true;

							_node.host = ap.host.value
							_node.port = ap.port.value
							_node.ws = ap.ws.value
							_node.nodename = ap.nodename.value

							_node.rpcuser = ''
							_node.rpcpwd = ''

							if (ap.saveto.value == 'locally'){

								//if(actions.ele()){
									_node.rpcuser = ap.rpcuser.value || ''
									_node.rpcpwd = ap.rpcpwd.value || ''
								//}

								_node.locally = true

								f = _node.host && _node.port && _node.ws && _node.nodename
							}

							else{
								delete _node.rpcuser
								delete _node.rpcpwd

								f = _node.host && _node.port && _node.ws && _node.nodename
							}
							

							if(!f){
								sitemessage( self.app.localization.e('e13071') )

								return
							}

							var d = _.clone(_node);

							delete d.addedby
							delete d.date

							if(!d.locally)
								delete d.locally

							self.app.platform.sdk.node.sys[method + ap.saveto.value](d, function(err, node){

								if(!err){										

									if (editing){

										el.list.html('')
										renders.nodes(self.app.platform.nodes)

									}
									else{

										if(!self.app.platform.nodes) 
											self.app.platform.nodes = []

										self.app.platform.nodes.push(node)
										renders.nodes([node])

									}

									if(!self.app.platform.nodeid || self.app.platform.nodeid.host == d.host){

										actions.connectnode(d, function(){
											wndObj.close();
										})
									}

									else{
										wndObj.close();
									}
									
									renders.active();
									
								}

								else{

									_node = _.clone(bkp);

									sitemessage(err)
								}

							})
						}
					},
				}

				if (editing){
					

					wndbuttons.delete = {
				
						class : 'delete ghost',
						html : '<i class="fas fa-trash"></i> ' + self.app.localization.e('delete'),
						fn : function(wnd, wndObj){

							dialog({
								class : 'zindex',
								html : self.app.localization.e('e13072'),
								success : function(){

									var revoke = 'revoke';

									if(_node.locally) revoke = 'revokelocally'
									else revoke = 'revokeproxy'

									self.app.platform.sdk.node.sys[revoke]({
										host : _node.host
									}, function(err, node){

										if(!err){		
											
											

											el.list.find('.node[host="'+_node.host+'"]').closest('.nodewrapepr').remove();

											renders.empty()


											if(_node.host == self.app.platform.nodeid.host){

												actions.connectnode(null, function(){
													wndObj.close();
												})


											}

											else{
												wndObj.close();
											}

											
										}
		
										else{
											sitemessage(err)
										}

									})

									
								}
							})
							
						}
				
	
					}
				}


				self.shell({
					destroy : function(){

					},
					insert : 'wnd',
					name : 'addnode',
					data : {
						parameters : ap
					},

					wnd : {
						
						header : header,
						buttons : wndbuttons,	

						noInnerScroll : true,
						class : 'addnodewnd'
					},

				}, function(_p){

					ParametersLive(_.toArray(ap), _p.el)

					/*var prsave = function(){
						_p.el.find('.addnode').attr('saveto', ap.saveto.value)
					}

					prsave()

					ap.saveto._onChange = function(){
						prsave()	
					}*/

				})

			},

			settings : function(el){
				el.find('[sys]').on('click', function(){
					var sys = $(this).attr('sys')


					if (sys){
						var s = deep(systemsettings, sys)


						if (s) s()
					}
				})
			}
		}

		var cpsub = {
			nodes : {
				responsetime : {
					caption : "Nodes Response Time",

					series : [
						{
							name : "Median Response Time",
							path : "statistic.time",
							id : 'ct'
						}
					]
				},

				rate : {
					caption : "Nodes Rate",

					series : [
						{
							name : "Requestes per seconds",
							path : "statistic.rate",
							id : 'cr'
						}
					]
				},

				probability : {
					caption : "Probability",

					series : [

						{
							name : "Probability to select",
							path : "probability",
							id : 'spr'
						}
						
					]
				},
				

				difference: {
					caption : "Block Height Difference",

					series : [
						{
							name : "Difference",
							path : "status.difference",
							id : 'cd'
						}
					]
				},

				rating : {
					caption : "Nodes Rating",

					series : [
						{
							name : "Rating",
							path : "rating",
							id : 'cr'
						}
					]
				},

				allcount : {
					caption : "Count of requestes to nodes",

					series : [
						{
							name : "Count of requestes",
							path : "statistic.allcount",
							type : 'spline',
							id : 'cr'
						},
						{
							name : "Success Count",
							path : "statistic.success",
							type: 'areaspline',
							id : 'cp'
						}
					]
				}
			},

			server : {
				connections : {
					caption : "Connections",

					series : [
						{
							path : 'wss.users',
							name : "Websocket Connections",
							id : 'wss'
						},
	
						{
							path : 'server.middle.requestsIp',
							name : "Https requests IP",
							id : 'requests'
						}
					]
				},

				cache : {
					caption : "Cache Size",
					objects : 'server.cache.meta',
					series : [
						{
							path : 'size',
							name : "Size",
							id : 'size'
						}
					]
				},
			},

			wallets : {
				distribution : {
					caption : "Registration Address Distribution",

					series : [
						{
							path : 'wallet.registration.queue',
							name : "Users Queue Size",
							id : 'queue'
						},
	
						{
							path : 'wallet.registration.unspents',
							name : "Unspents Count",
							id : 'unspents'
						},
					]
				},

				balance : {
					caption : "Registration Address Balance",

					series : [
						{
							path : 'wallet.registration.balance',
							name : "Address Balance",
							id : 'balance'
						}
					]
				},
			}
		}

		var cp = {
			server : function(data){

				var subtype = settings.charts.server.type

				var meta = cpsub.server[subtype]

				var lmeta = {
					type : 'spline',
					xtype : 'datetime',
					caption : meta.caption
				}

				var series = {}
				var i = 0

				var objects = [info]

				if (meta.objects){
					objects = deep(info, meta.objects)
				}

				_.each(objects, function(object, key){

					var ekey = key ? key + "." : ''

					if(meta.objects) ekey = meta.objects + '.' + ekey

					_.each(meta.series, function(smeta){
						series[smeta.id + key] = {

							name : smeta.name + ": " + key,
							path : ekey + smeta.path,
							color : colors[ i % colors.length ],
							type : smeta.type
	
						}
	
						i++
					})

					
				})



				return {
					meta : lmeta,
					series : series
				}
			},

			nodes : function(data){

				var subtype = settings.charts.nodes.type

				var meta = cpsub.nodes[subtype]

				var lmeta = {
					type : 'spline',
					xtype : 'datetime',
					caption : meta.caption
				}


				var series = {}
				var i = 0

				_.each(info.nodeManager.nodes, function(node, key){

					_.each(meta.series, function(smeta){
						series[smeta.id + key] = {

							name : smeta.name + ": " + key,
							path : "nodeManager.nodes.'" + key + "'." + smeta.path,
							color : colors[ i % colors.length ],
							type : smeta.type
	
						}
	
						i++
					})

					
				})

				return {
					meta : lmeta,
					series : series
				}
			},
			
			wallets : function(data){

				var subtype = settings.charts.wallets.type

				var meta = cpsub.wallets[subtype]

				var lmeta = {
					type : 'spline',
					xtype : 'datetime',
					caption : meta.caption
				}

				var series = {}
				var i = 0

				var objects = [info]

				if (meta.objects){
					objects = deep(info, meta.objects)
				}

				_.each(objects, function(object, key){

					var ekey = key ? key + "." : ''

					if(meta.objects) ekey = meta.objects + '.' + ekey

					_.each(meta.series, function(smeta){
						series[smeta.id + key] = {

							name : smeta.name + ": " + key,
							path : ekey + smeta.path,
							color : colors[ i % colors.length ],
							type : smeta.type
	
						}
	
						i++
					})

					
				})


				return {
					meta : lmeta,
					series : series
				}
			}
		}

		var helpers = {
			type : function(type, data){
				if(typeof cp[type] == 'function') return cp[type](data)

				return cp[type]
			},
			chart : function(type){
				return _.clone(type.meta);
			},
			series :  function(type, data){
				var s = [];

				var _cp = type.series

				_.each(_cp, function(m){

					var serie = {
						color : m.color,
						data : [],
						name : m.name,
						type : m.type || type.meta.type
					}

					_.each(data, function(d){
						var v = deep(d.info, m.path) || 0;

						serie.data.push({
							y : v,
							x : new Date(d.time),
						})
					})

					s.push(serie)
				})

				return s
			}
		}

		var chart = {
			prepare : function(type, data, el){

				var t = helpers.type(type, data)

				var chart = helpers.chart(t)
				var series = helpers.series(t, data);


				var graph = new self.app.platform.objects.graph({
					el : el,
					shell : self.shell,
					chart : chart,
					
				})

				graph.series = series; 

				return graph
			},
			graph : function(type, data, _el, clbk){
				
				var graph = chart.prepare(type, data, _el)

				var t = helpers.type(type, data)

				graph.render({
					height : 250,
					maxPointsCount : 50
				}, function(){

					if (settings.charts[type].showed){
						_el.find('.graphWrapper').addClass('showed')
					}

					_el.find('.showgraphwrapper').on('click', function(){
						_el.find('.graphWrapper').toggleClass('showed')

						settings.charts[type].showed = _el.find('.graphWrapper').hasClass('showed')

						graph.chart.reflow()
					})

					_el.find('.subcaptiongraph').on('click', function(){

						var items = []

						_.each(cpsub[type], function(s, key){
							items.push({
								text : key,
								action : function (clbk) {

									settings.charts[type].type = key

									chart.make(type, stats)

									clbk()
	
								}
							})
						})

						

						menuDialog({

							items: items
						})

					})

					if (clbk)
						clbk(graph, _el);

				});
			},

			make : function(type, stats, clbk, update){

				if (graphs[type] && update){

					var t = helpers.type(type, stats)
					var series = helpers.series(t, stats);

					series = graphs[type].rarefied(series, 50)

					graphs[type].chart.update({
						series: series
					});

					return 
				}

				var _el = el.c.find('.' + type + 'chart')

				var d = $('<div></div>', {
					class : 'chartWrapper'
				})

				_el.html(d)

				chart.graph(type, stats, d, function(graph){
					graphs[type] = graph

					if(clbk) clbk()

				}, update)
					
			}
		}

		var events = {
			
		}

		var renders = {
			allsettings : function(){
				if (el.c)
					renders.nodecontentmanage(el.c)
			},
			proxycurrent : function(clbk){

				self.shell({

					inner : html,
					name : 'proxycurrent',
					data : {
						proxies : api.get.proxies(),
						current : proxy,
						admin : actions.admin()
					},

					el : el.proxycurrent

				},
				function(){

					if (clbk)
						clbk()
				})
			},
			proxycontent : function(clbk){

				self.shell({

					inner : html,
					name : 'proxycontent',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin()
					},

					el : el.proxycontent

				},
				function(p){

					renders.servercontent(p.el)
					renders.nodescontent(p.el)
					renders.nodecontent(p.el)

					if (clbk)
						clbk()
				})
			},
			servercontent : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'servercontent',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.serverWrapper')

				},
				function(){

					renders.webservercontent(elc)
					renders.webadminscontent(elc)
					renders.webdistributioncontent(elc)
					if (clbk)
						clbk()
				})
			},
			webservercontent : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'webservercontent',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.webServerWrapper')

				},
				function(){

					if (clbk)
						clbk()
				})
			},
			webadminscontent : function(elc, clbk){
				
				self.app.platform.sdk.users.get(info.admins, function(){

					self.shell({
						inner : html,
						name : 'webadminscontent',
						data : {
							admins : info.admins,
							info : info,
							proxy : proxy,
							admin : actions.admin()
						},
	
						el : elc.find('.webAdminsWrapper')
	
					},
					function(){
	
						if (clbk)
							clbk()
					})
				})

			},
			webdistributioncontent : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'webdistributioncontent',
					data : {
						wallets : info.wallet,
						info : info,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.webDistributionWrapper')

				},
				function(){

					if (clbk)
						clbk()
				})
				
			},
			nodescontent : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'nodescontent',
					data : {
						info : info,
						manager : info.nodeManager,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.nodesWrapper')

				},
				function(){

					elc.find('.addnode').on('click', function(){
						actions.addnode()
					})

					renders.nodescontenttable(elc)

					if (clbk)
						clbk()
				})
			},
			nodescontenttable : function(elc, clbk){

				self.shell({
					inner : html,
					name : 'nodescontenttable',
					data : {
						info : info,
						manager : info.nodeManager,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.nodesWrapper .nodes')

				},
				function(){

					if (clbk)
						clbk()
				})
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

						renders.nodecontentstate(elc)
	
						if (clbk)
							clbk()
					})

				}
				else{
					if(clbk) clbk()
				}

				
			},
			nodecontentmanage : function(elc, clbk){
				if(actions.admin()){

					console.log('system', system)

					self.shell({
						inner : html,
						name : 'nodecontentmanage',
						data : {
							info : info,
							manager : info.nodeManager,
							nodestate : info.nodeControl.state,
							proxy : proxy,
							admin : actions.admin(),
							system : system
						},

						el : elc.find('.localnodeWrapper .manage')

					},
					function(p){

						actions.settings(p.el)

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
							proxy : proxy,
							admin : actions.admin()
						},

						el : elc.find('.localnodeWrapper .state')

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

		var makers = {

			stats : function(update){

				if (stats){
					chart.make('server', stats, null, update)
					chart.make('nodes', stats, null, update)
					chart.make('wallets', stats, null,  update)
				}

			},

			proxycurrent : function(){
				renders.proxycurrent(function(){
					makers.proxycontent()
				})
			},

			proxycontent : function(){
				renders.proxycontent(function(){
						
				})
			}
		}

		var initsettings = function(){

			if(info.server.listening && info.wss.listening){
				settings.charts.server.showed = true
			}

		
		}

		var make = function(prx){

			if (proxy) {
				delete proxy.clbks.tick.components
				delete proxy.system.clbks.tick.components
			}

			proxy = prx//api.get.current()

			proxy.clbks.tick.components = actions.tick
			proxy.system.clbks.tick.components = actions.ticksettings

			info = null
			stats = []

			graphs = {}

			if (proxy){

			
				proxy.get.info().then(r => {

					info = r.info

					initsettings()
					
					stats = [{
						info : info,
						time : utcnow()
					}]
					

					makers.proxycurrent()

					return proxy.get.stats()

				}).then(data => {

					stats = data.stats
					setTimeout(function(){
						makers.stats()
					},500)	

					if (actions.admin()){

						return proxy.system.request('get.settings').then(r => {
							system = r

							renders.allsettings()
						})

					}
					
						
				}).catch(e => {

				})
			}

			else{
				renders.proxycurrent()
			}
			

			
		}

		return {
			primary : primary,

			getdata : function(clbk){

				api = self.app.api

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.proxycurrent = el.c.find('.proxycurrentWrapper')
				el.proxycontent = el.c.find('.proxycontentWrapper')

				initEvents();
				make(api.get.current());

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
	module.exports = system16;
}
else{

	app.modules.system16 = {};
	app.modules.system16.module = system16;

}