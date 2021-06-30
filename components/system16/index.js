
var system16 = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, api = null, proxy = null, info = null, stats = [], system = null, bots = [];

		var graphs = {}

		var colors = ['#F0810F', '#011A27', '#4897D8', '#E6DF44', '#063852', '#486824']

		var stacking = null

		var changes = {
			server : {},
			emails: {}
		}


		var settings = {
			charts : {
				nodes : {
					type : 'rating'
				},
				server : {
					type : 'responses'
				},
				wallets : {
					type : 'distribution'
				},

				peertube : {
					type : 'allcount'
				},
			}
		}

		var errors = {
			'unableProxyConnect' : {
				icon : '<i class="fas fa-wifi"></i>',
				text : "Unable to Connect to Proxy"
			},
			'undefinedError' : {
				icon : '<i class="fas fa-exclamation-triangle"></i>',
				text : "Undefined Error"
			}
		}

		var systemsettings = {
			'firebase' : function(){
				var v = changes.server.firebase || system.firebase;

				var d = inputDialogNew({
					caption : "Proxy Firebase Parameters",
					wrap : true,
	        		values : [{
	        			defValue : '',
	        			validate : 'empty',
	        			label : "Upload New Firebase Admin SDK",
						placeholder : "Upload file with .json extension",
						upload : {
							ext : ['json']
						}
	        		},{
	        			defValue : v.id,
	        			validate : 'empty',
	        			label : "Application Id",
						placeholder : "Application Id",
	        		}],

	        		success : function(v){

						var ch = {}

						ch.key = deep(v, '0.base64')
						ch.id = v[1]


						if (ch.key || ch.id){

							changes.server.firebase = ch

							renders.webserveremails(el.c)
							renders.webserveradmin(el.c)

							return true
						}

						sitemessage("Please Upload All files")

						return false
	        		}
	        	})
			},
			'certificate' : function(){
				var v = changes.server.ssl || {};
				var ch = {}

				var d = inputDialogNew({
					caption : "Proxy SSL Parameters",
					wrap : true,
	        		values : [{
	        			defValue : '',
	        			validate : 'empty',
	        			label : "Certificate",
						placeholder : "Upload file with .pem extension",
						upload : {
							ext : ['pem']
						}
	        		},{
	        			defValue : '',
	        			validate : 'empty',
						placeholder : "Upload file with .pem extension",
	        			label : "Certificate Key",
						upload : {
							ext : ['pem']
						}
	        		},{
	        			defValue : '',
	        			validate : 'empty',
	        			label : "Password",
						placeholder : "Certificate Password",
	        		}],

	        		success : function(v){

						ch.cert = deep(v, '0.base64')
						ch.key = deep(v, '1.base64')
						ch.passphrase = v[2]
						ch.name = deep(v, '0.file.name')


						if (ch.cert && ch.key && ch.passphrase && ch.name){

							changes.server.ssl = ch

							renders.webserveremails(el.c)
							renders.webserveradmin(el.c)

							return true
						}

						sitemessage("Please Upload All files")

						return false
	        		}
	        	})
			},
			'serverenabled' : function(_el){
				
				changes.server.enabled = !JSON.parse(_el.attr('value'))
				if(changes.server.enabled == system.server.enabled) delete changes.server.enabled

				renders.webserveradmin(el.c)
			},
			'emailssecure' : function(_el){

				var secure = true;

				var secureValue = _el.attr('value');

				if (secureValue === 'Yes'){

					secure = false;

				}

				changes.emails.secure = secure;
				if(changes.emails.secure === system.emails.secure) delete changes.emails.secure;

				renders.webserveremails(el.c)
			},
			'nodeenabled' : function(){

				if (system.node.enabled){

					var items = [{
						text : "Disable Pocketnet Node",
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
						text : "Enable Pocketnet Node",
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
			
			'binPath' : function(){

				globalpreloader(true)

				return proxy.system.request('set.node.binPath', {}).then(r => {

					actions.refresh().then(r => {
						actions.refreshsystem()

						globalpreloader(false)
					})
					
				}).catch(e => {

					globalpreloader(false)

				})
			},

			'ndataPath' : function(){

				globalpreloader(true)

				return proxy.system.request('set.node.ndataPath', {}).then(r => {


					globalpreloader(false)

					actions.refresh().then(r => {
						actions.refreshsystem()
					})
					
				}).catch(e => {

					globalpreloader(false)

				})
			}
		}

		var actions = {
			convertTime : function(stats){
				_.each(stats, function(s){
					s.time = fromutc(new Date(s.time))
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
			admin : function(){

				var address = self.app.platform.sdk.address.pnet()

				if(!address) return false
				if (proxy && info){
					return proxy.direct || _.indexOf(info.admins, address.address) > -1
				}
			},

			removeBot : function(address){
				topPreloader(30);

				proxy.fetchauth('manage', {
					action : 'bots.remove',
					data : {
						address : address
					}
				}).then(r => {

					bots = _.filter(bots, function(b){
						return b != address
					})

					renders.botscontent(el.c)

					topPreloader(100);

				}).catch(e => {


					sitemessage(self.app.localization.e('e13293'))

					topPreloader(100);

				})
			},

			removeAdmin : function(address){
				topPreloader(30);

				proxy.fetchauth('manage', {
					action : 'set.admins.remove',
					data : {
						address : address
					}
				}).then(r => {

					actions.refresh()

					topPreloader(100);

				}).catch(e => {


					sitemessage(self.app.localization.e('e13293'))

					topPreloader(100);

				})
			},

			dust : function(pk, address, value, clbk){
				self.app.platform.sdk.wallet.sendmanyoutputs(pk, address, value, 2, function(err , data){

					if(err){
						self.app.platform.errorHandler(err, true)	
					}
					else{

					}

					clbk(err)

				})	
			},

			ticksettings : function(settings, s, changed){

				if (changed){
					system = settings
				}

				renders.allsettings()
			},

			refreshsystem : function(){
				return proxy.system.api.get.settings().then(s => {
					system = s

					if (el.c){
						renders.allsettings()
					}
				})
				
			
			},

			refresh : function(){
				return proxy.get.info().then(r => {
					this.tick(r.info)

					return Promise.resolve()
				})
			},

			tick : function(state){

				info = state


				var laststate = stats[stats.length - 1]

				if(!laststate || (new Date(laststate.time)).addSeconds(10) < new Date() ){
					stats.push({
						info : info,
						time : new Date()
					})

					stats = lastelements(stats, 1000)

					if (el.c){
						renders.nodecontentstate(el.c)
						renders.nodescontenttable(el.c)
						renders.peertubeinstancestable(el.c)
						renders.webadminscontent(el.c)
						renders.webdistributionwallets(el.c)
						renders.webserverstatus(el.c)
					}
	
					setTimeout(function(){
						makers.stats(true)
					}, 200)
				}

				
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

						if (s) s($(this))
					}
				})
			},

			node : {
				test : function(node){

					var scenarios = [{
						name : "Pageload",
						key : 'pageload'
					}, {
						name : "Limits",
						key : 'limits'
					}]

					var items = _.map(scenarios, function(scenario){
						return {
							text : scenario.name,
							action : function(clbk){
								proxy.fetchauth('nodes/test', {
									scenario : scenario.key,
									node : node.key
								}).catch(e => {
									sitemessage(e)
								})

								clbk()
							}
						}
					})

					menuDialog({
						items: items
					})

				}
			},

			proxy : {
				selectWatch : function(){

					windows.proxieslist(proxy, "Watch Proxy", function(selected){

						make(selected)
					})
				},

				selectUsing : function(){

					var use = api.get.current()


					windows.proxieslist(use, "Select Proxy that using Interface", function(selected){

						api.set.current(selected.id, true).then(r => {
							make(api.get.current())
						})

					})
				},

				add : function(clbk){
					windows.addproxy(null, function(selected){
						if(clbk) clbk()
					})
				},
				edit : function(proxy, clbk){
					windows.addproxy(proxy, function(selected){
						if(clbk) clbk()
					})
				}
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
					caption : "Rate",

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
					caption : "Rating",

					series : [
						{
							name : "Rating",
							path : "rating",
							id : 'cr'
						}
					]
				},

				wsc : {
					caption : "Websocket Connections",

					series : [
						{
							name : "Websocket",
							path : "users",
							id : 'wsc'
						}
					]
				},

				allcount : {
					caption : "Count of requestes",

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

			peertube : {
				responsetime : {
					caption : "Instance Median Response Time",

					series : [
						{
							name : "Median Response Time",
							path : "stats.averageTime",
							id : 'sa'
						}
					]
				},
				
				allcount : {
					caption : "Count of requestes",

					series : [
						{
							name : "Count of requestes",
							path : "stats.count",
							type : 'spline',
							id : 'sc'
						},
						{
							name : "Success Count",
							path : "stats.success",
							type: 'areaspline',
							id : 'ss'
						}
					]
				},

				total : {
					caption : "Total count of videos",

					series : [
						{
							name : "Videos count",
							path : "stats.total",
							type : 'spline',
							id : 'sc'
						}
					]
				},
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

				memory : {
					caption : "Memory",


					series : [

						{
							path : 'memory.rss',
							name : "RSS",
							id : 'rss'
						}
					]
				},
				

				signatures : {
					caption : "Signed requests",
					objects : 'server.middle.signatures',
					series : [
						{
							path : 'length',
							namePath : 'code',
							name : "Signature",
							id : 'count'
						}
					]
					//method : 'fromarray'
				},

				responses : {
					caption : "Responses",
					objects : 'server.middle.responses',
					series : [
						{
							path : 'length',
							namePath : 'code',
							name : "Code",
							id : 'count'
						}
					]
					//method : 'fromarray'
				},

				rmts : {
					caption : "RMTS",
					series : [

						{
							path : 'remote.size',
							name : "RMTS",
							id : 'rmts'
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
							path : 'wallet.addresses.registration.queue',
							name : "Users Queue Size",
							id : 'queue'
						},
	
						{
							path : 'wallet.addresses.registration.unspents',
							name : "Unspents Count",
							id : 'unspents'
						},
					]
				},

				balance : {
					caption : "Registration Address Balance",

					series : [
						{
							path : 'wallet.addresses.registration.balance',
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

				if (info.nodeManager){
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
				}
				

				return {
					meta : lmeta,
					series : series
				}
			},

			peertube : function(data){

				var subtype = settings.charts.peertube.type

				var meta = cpsub.peertube[subtype]

				var lmeta = {
					type : 'spline',
					xtype : 'datetime',
					caption : meta.caption
				}


				var series = {}
				var i = 0

				if (info.peertube){
					_.each(info.peertube, function(instance, key){

						_.each(meta.series, function(smeta){
							series[smeta.id + key] = {
	
								name : smeta.name + ": " + key,
								path : "peertube.'" + key + "'." + smeta.path,
								color : colors[ i % colors.length ],
								type : smeta.type
		
							}
		
							i++
						})
	
						
					})
				}

				console.log('series', series)
				

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
								text : s.caption,
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

				if(!el.c) return


				if (graphs[type] && update){

					var t = helpers.type(type, stats)
					var series = helpers.series(t, stats);

					series = graphs[type].rarefied(series, 50)

					if(self.app.platform.focus){
						console.log("focus")
						graphs[type].chart.update({
							series: series
						});
					}

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

		var windows = {
			addproxy : function(_proxy, clbk){
				var editing = false;
				var method = 'create'
				var header = self.app.localization.e('e13054')
				var buttontext = self.app.localization.e('add')

				if(_proxy) {
					editing = _proxy.id;
					method = 'update'
					header = self.app.localization.e('e13055')
					buttontext = self.app.localization.e('save')

				}

				_proxy || (_proxy = {})

				var ap = {

					host : new Parameter({

						type : "STRING",
						name : self.app.localization.e('e13056'),
						id : 'host',

						defaultValue : _proxy.host || '',
						placeholder : "0.0.0.0",
						require : true
					
					}),

					port : new Parameter({

						type : "STRING",
						name : "RPC Port",
						id : 'port',
						defaultValue : _proxy.port || '8899',
						placeholder : "8899",
						require : true
					
					}),

					ws : new Parameter({

						type : "STRING",
						name : "WS Port",
						id : 'wss',
						defaultValue : _proxy.wss || '8099',
						placeholder : "8099",
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

							var meta = {}

							var f = true;

							_.each(ap, function(p){
								meta[p.id] = p.value || _proxy[p.id]

								if(!p.value) f = false;
							})
							
							
							if(!f){
								sitemessage(self.app.localization.e('e13057'))

								return
							}


							meta.user = true;


							var newproxy = new Proxy16(meta, self.app)

							if (self.app.api.get.byid(newproxy.id)){
								sitemessage(self.app.localization.e('e13058'))

								return
							}

							wnd.find('.addproxy').addClass('loading')


							newproxy.api.ping().then(r => {

								var prx = null;
								
								if(!editing)
									prx = self.app.api.addproxy(newproxy.export())
								else{
									prx = self.app.api.editproxy(editing, newproxy.export())
								}


								if (prx){

									if (clbk){
										clbk(prx)
									}
	
									wndObj.close()
								}
								else{
									sitemessage("Unable to add Proxy")
								}

								wnd.find('.addproxy').removeClass('loading')
								

							}).catch(e => {

								wnd.find('.addproxy').removeClass('loading')

								sitemessage("Unable to connect")

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
								html : self.app.localization.e('e13059'),
								success : function(){


									var change = editing.id == api.get.current().id

									self.app.api.removeproxy(_proxy.id)

									if (clbk){
										clbk(null, change)
									}

									wndObj.close()
									
								}
							})
							
						}
				
	
					}
				}

				self.shell({
					destroy : function(){

					},
					insert : 'wnd',
					name : 'addproxy',
					data : {
						parameters : ap
					},

					wnd : {
						
						header : header,
						buttons : wndbuttons,	
						noInnerScroll : true,
						class : 'addproxywnd'

					},

				}, function(_p){

					ParametersLive(_.toArray(ap), _p.el)

					_p.el.find('.host input').focus()

				})
			},
			proxieslist : function(selected, header, clbk){

				if(!selected) selected = {}

				var apply = function(_wnd){
					_wnd.close();

					actions.connectproxy();
				}

				var proxies = self.app.api.get.proxies()

				var buttons = {
					close : {
						class : 'close',
						html : '<i class="fas fa-times"></i> ' + self.app.localization.e('close'),
						fn : function(wnd, wndObj){
							wndObj.close();
						}
					},

					success : {
						class : 'success',
						html : '<i class="fas fa-plus"></i> ' + self.app.localization.e('e13054'),
						fn : function(wnd, wndObj){
							
							actions.proxy.add(function(proxy){

								wndObj.close();

								windows.proxieslist(selected, header, clbk)

								
							})
							
						}
					},
				}

				var p = {
					destroy : function(){

					},
				
					name : 'proxieslist',
					data : {
						proxies : proxies,
						proxy : selected
					},

					wnd : {
						
						header : header,
						noInnerScroll : true,
						class : 'proxieslistwnd',

						buttons : buttons

					},

				}
				
				p.insert = 'wnd';
				

				self.fastTemplate('proxieslist', function(d){


					var _wnd = new wnd({
						content : d,
						app : self.app,
						header : header,
						noInnerScroll : true,
						class : 'proxieslistwnd',

						buttons : buttons,

						clbk : function(_p){


							var empty = function(){
								if (_p.el.find('.proxy').length){
									_p.el.find('.proxieslist').removeClass('empty')
								}
								else{
									_p.el.find('.proxieslist').addClass('empty')
								}
							}
		
							empty()
		
							_p.el.find('.name').on('click', function(){
		
								var active = $(this).closest('.proxy').hasClass('active')
		
								var pid = $(this).closest('.proxy').attr('pid')
		
		
								if (active){
									
								}
								else
								{
		
									var proxy = self.app.api.get.byid(pid)
		
									if(!proxy){
										sitemessage("Error")
		
										return
									}
		
									if (clbk){
										clbk(proxy)
		
										_p.close();
									}
									
								}
							})
		
							_p.el.find('.delete').on('click', function(){
								var pid = $(this).closest('.proxy').attr('pid')
		
								var proxy = self.app.api.get.byid(pid)
		
								var change = api.get.current().id == pid

								if (proxy){

									dialog({
										class : 'zindex',
										html : self.app.localization.e('e13059'),
										success : function(){
		
											self.app.api.removeproxy(proxy.id)
		
											if (change)
												make(api.get.current());
				
											_p.close();
											windows.proxieslist(selected, header, clbk)
											
										}
									})
									
									
								}
							})
		
							_p.el.find('.edit').on('click', function(){
								var pid = $(this).closest('.proxy').attr('pid')
		
								var proxy = self.app.api.get.byid(pid) ///self.app.platform.sdk.proxy.find(pid)
								var change = api.get.current().id == pid
		
								
		
								if (proxy){
		
									actions.proxy.edit(proxy, function(proxy){
		
										if (change)
											make(api.get.current());
		
											_p.close();
											windows.proxieslist(selected, header, clbk)
										
										
									})
		
								}
							})
						}

					})

				}, p.data)

				
			},
			addbotlist: function(){
				console.log("addbots")
				var d = inputDialogNew({
					caption : "Add Address to Proxy Bot List",
					class : 'addressdialog',
					wrap : true,
	        		values : [{
	        			defValue : '',
	        			validate : 'empty',
	        			placeholder : "Pocketnet Addresses",
	        			label : "Bots addresses",
						text : true
	        		}],

	        		success : function(v){

						var addresses = v[0].split(/[ \t\n\r]+/g)

						addresses = _.filter(addresses, function(address){
							var valid = true;

							try{
								bitcoin.address.fromBase58Check(address)
							}

							catch (e){
								valid = false;
							}

							console.log('address', address, valid)

							return valid
						})


						if(!addresses.length){
							sitemessage("Addresses is not valid")

							return false
						}

	        			topPreloader(30);

						proxy.fetchauth('manage', {
							action : 'bots.addlist',
							data : {
								addresses : addresses
							}
						}).then(r => {
							_.each(addresses, function(address){
								bots.push(address)
							})

							renders.botscontent(el.c)

							d.destroy();

	        				topPreloader(100);

						}).catch(e => {
							console.log("E", e)
							sitemessage(self.app.localization.e('e13293'))

							topPreloader(100);

						})


	        		}
	        	})
			},
			addbot : function(){
				console.log("addbots")
				var d = inputDialogNew({
					caption : "Add Address to Proxy Bot List",
					class : 'addressdialog',
					wrap : true,
	        		values : [{
	        			defValue : '',
	        			validate : 'empty',
	        			placeholder : "Pocketnet Address",
	        			label : "Bot address"
	        		}],

	        		success : function(v){

						var address = v[0]

						if (address){
							var valid = true;

							try{
								bitcoin.address.fromBase58Check(address)
							}

							catch (e){
								valid = false;
							}

							
						}

						if(!valid){
							sitemessage("Address is not valid")

							return false
						}

	        			topPreloader(30);

						proxy.fetchauth('manage', {
							action : 'bots.add',
							data : {
								address : address
							}
						}).then(r => {

							bots.push(address)

							renders.botscontent(el.c)

							d.destroy();

	        				topPreloader(100);

						}).catch(e => {
							console.log("E", e)
							sitemessage(self.app.localization.e('e13293'))

							topPreloader(100);

						})


	        		}
	        	})
			},

			addadmin : function(){
				var d = inputDialogNew({
					caption : "Add Admin to Proxy",
					class : 'addressdialog',
					wrap : true,
	        		values : [{
	        			defValue : '',
	        			validate : 'empty',
	        			placeholder : "Pocketnet Address",
	        			label : "Admin address"
	        		}],

	        		success : function(v){

						var address = v[0]

						if (address){
							var valid = true;

							try{
								bitcoin.address.fromBase58Check(address)
							}

							catch (e){
								valid = false;
							}

							
						}

						if(!valid){
							sitemessage("Address is not valid")

							return false
						}

	        			topPreloader(30);

						proxy.fetchauth('manage', {
							action : 'set.admins.add',
							data : {
								address : address
							}
						}).then(r => {

							actions.refresh()

							d.destroy();

	        				topPreloader(100);

						}).catch(e => {

							sitemessage(self.app.localization.e('e13293'))

							topPreloader(100);

						})

	        			




	        		}
	        	})
			}
		}

		var renders = {
			allsettings : function(){
				if (el.c){
					renders.nodecontentmanage(el.c)
					renders.nodecontentstate(el.c)
				}
			},
			proxycurrent : function(clbk){

				var use = api.get.current()
				
				self.shell({

					inner : html,
					name : 'proxycurrent',
					data : {
						proxies : api.get.proxies(),
						current : proxy,
						using : use,
						admin : actions.admin()
					},

					el : el.proxycurrent

				},
				function(p){

					p.el.find('.current').on('click', actions.proxy.selectWatch)
					p.el.find('.selectusing').on('click', actions.proxy.selectUsing)

					if (clbk)
						clbk()
				})

				
			},

			error : function(error, el, clbk){

				self.shell({

					inner : html,
					name : 'error',
					data : {
						error : errors[error] || errors['undefinedError']
					},

					el : el

				},
				function(p){

					p.el.find('.refreshpage').on('click', function(){
						make(proxy)
					})

					if (clbk)
						clbk()
				})
			},
			proxycontent : function(clbk){
				

				if(!info){
					renders.error('unableProxyConnect', el.proxycontent)
				}
				else{

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
						renders.peertubecontent(el.c)
						renders.nodecontent(p.el)
						renders.bots(p.el)
	
						if (clbk)
							clbk()
					})
				}

				
			},
			bots : function(elc, clbk){

				if(actions.admin()){

				
				
					self.shell({
						inner : html,
						name : 'webbots',
						data : {
							admin : actions.admin()
						},
						el : elc.find('.botsWrapper')

					},
					function(p){

						p.el.find('.addbot').on('click', windows.addbot)
						p.el.find('.addbotlist').on('click', windows.addbotlist)

						renders.botscontent(elc)

						if (clbk)
							clbk()
					})

				}
			},

			botscontent : function(elc, clbk){

				self.app.platform.sdk.users.get(bots || [], function(){

					self.shell({
						inner : html,
						name : 'webbotsContent',
						data : {
							admin : actions.admin(),
							bots : bots
						},

						el : elc.find('.webbotsContentWrapper')

					},
					function(p){

						p.el.find('.exportlist').on('click', function(){
							

							text = bots.join('\r\n')

							copycleartext(text)

							sitemessage(self.app.localization.e('successcopied'))
						})

						p.el.find('.removefromlist').on('click', function(){
							var address = $(this).attr('bot')

							if (address){


								var t = 'Do you really want to remove selected bot from Proxy server bot list?'

								dialog({
									class : 'zindex',
									html : t,
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										actions.removeBot(address)
									}
								})
								
							}
						})

						if (clbk)
							clbk()
					})

				})
			},
			servercontent : function(elc, clbk){

				if(!info){
					if(clbk) clbk()

					return
				}

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
			webserverstatus : function(elc, clbk){

				if(!info){
					if(clbk) clbk()

					return
				}

				self.shell({
					inner : html,
					name : 'webserverstatus',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin()
					},

					el : elc.find('.webserverstatusWrapper')

				},
				function(p){
					if (clbk)
						clbk()
				})
			},
			webservercontent : function(elc, clbk){

				if(!info){
					if(clbk) clbk()

					return
				}

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
				function(p){
					renders.webserverstatus(p.el)
					renders.webserveradmin(p.el)
					renders.webserveremails(p.el)


					if (clbk)
						clbk()
				})
			},

			webserveremails : function(elc, clbk){

				if(actions.admin() && system){

					self.shell({
						inner : html,
						name : 'webserveremails',
						data : {
							system : system,
							proxy : proxy,
							emails : changes.emails,
							results : system.emails.results || []
						},

						el : elc.find('.emailsPanelWrapper')

					},
					function(p){

						actions.settings(p.el)

						p.el.find('.todefaultcert').on('click', function(){
							dialog({
								class : 'zindex',
								html : "Do you really want to cancel Certificate changes and set Default self-signed Certificate?",
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){	

									proxy.fetchauth('manage', {
										
										action : 'set.server.defaultssl',
										data : {}
		
									}).catch(e => {
										
										return Promise.resolve()
			
									}).then(r => {
			
										make(proxy || api.get.current());
					
										topPreloader(100);
			
									})

								}
							})
						})

						p.el.find('.save').on('click', function(){

							var _make = function(){

								globalpreloader(true)

											
								for (var ekey in system.emails){

									if (changes.emails[ekey] == undefined){

										changes.emails[ekey] = system.emails[ekey];
									}
								}

								proxy.fetch('manage', {
									action : 'set.emails',
									data : {
										emails: changes.emails
									}
	
								}).catch(e => {

									globalpreloader(false)
									return Promise.resolve()
		
								}).then(r => {

									// actions.emails();		
									// make(proxy || api.get.current());

									system.emails = changes.emails;
									changes.emails = {}

									make(proxy || api.get.current());
				
									topPreloader(100);

									globalpreloader(false)

		
								})
							}

							if(typeof changes.emails.emailshost != 'undefined' || changes.emails.port || changes.emails.secure || changes.emails.login || changes.emails.password){


								dialog({
									class : 'zindex',
									html : "Do you really want to change this settings?",
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										_make()
									}
								})

							}
							else{
								_make()
							}
							

						})

						
						p.el.find('.discard').on('click', function(){

							changes.emails = {}

							renders.webserveremails(elc)

						})

						p.el.find('[remove]').on('click', function(){
							var s = $(this).attr('remove')

							if(s) delete changes.emails[s]

							renders.webserveremails(elc)
						})

						p.el.find('.port').on('change', function(){
							var port = $(this).val()

							console.log('port', port);

							$(this).val(port)

							if (port == changes.emails.port){
								delete changes.emails.port
							}
							else{
								changes.emails.port = port;
							}

							renders.webserveremails(elc)
						})

						p.el.find('.login').on('change', function(){

							var login = $(this).val()

							$(this).val(login)

							if (login == changes.emails.login){
								delete changes.emails.login
							}
							else{
								changes.emails.login = login
							}

							renders.webserveremails(elc)
						})

						p.el.find('.password').on('change', function(){

							var password = $(this).val()

							$(this).val(password)

							if (password == changes.emails.password){
								delete changes.emails.password
							}
							else{
								changes.emails.password = password
							}

							renders.webserveremails(elc)
						})


						
						p.el.find('.emailshost').on('change', function(){

							var emailshost = $(this).val()

							$(this).val(emailshost)

							if (emailshost == changes.emails.emailshost){
								delete changes.emails.emailshost
							}
							else{
								changes.emails.emailshost = emailshost
							}

							renders.webserveremails(elc)
						})
																
						if (clbk)
							clbk()
					})

				}
				else{
					if (clbk)
						clbk()
				}
			},
			webserveradmin : function(elc, clbk){

				if(actions.admin() && system){

					self.shell({
						inner : html,
						name : 'webserveradmin',
						data : {
							admin : actions.admin(),
							system : system,
							proxy : proxy,
							changes : changes.server
						},

						el : elc.find('.adminPanelWrapper')

					},
					function(p){

						actions.settings(p.el)

						p.el.find('.todefaultcert').on('click', function(){
							dialog({
								class : 'zindex',
								html : "Do you really want to cancel Certificate changes and set Default self-signed Certificate?",
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){	

									proxy.fetch('manage', {
										
										action : 'set.server.defaultssl',
										data : {}
		
									}).catch(e => {
										
										return Promise.resolve()
			
									}).then(r => {
			
										make(proxy || api.get.current());
					
										topPreloader(100);
			
									})

								}
							})
						})

						p.el.find('.save').on('click', function(){

							if(changes.server.https || changes.server.wss){
								changes.server.ports = {
									https : changes.server.https,
									wss : changes.server.wss
								}
							}

							console.log(' changes.server',  changes.server);

							var _make = function(){

								globalpreloader(true)

								proxy.fetch('manage', {
									action : 'set.server.settings',
									data : {
										settings : changes.server,
									}
	
								}).catch(e => {
									globalpreloader(false)
									return Promise.resolve()
		
								}).then(r => {
									changes.server = {}
		
									make(proxy || api.get.current());

									globalpreloader(false)
				
									topPreloader(100);
		
								})
							}

							if(typeof changes.server.enabled != 'undefined' || changes.server.https || changes.server.wss || changes.server.ssl){

								console.log('inside')

								dialog({
									class : 'zindex',
									html : "Do you really want to change this settings?",
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										_make()
									}
								})

							}
							else{

								console.log('outside')
								_make()
							}
							

						})

						p.el.find('[remove]').on('click', function(){
							var s = $(this).attr('remove')

							if(s) delete changes.server[s]

							renders.webserveradmin(elc)
						})

						p.el.find('.discard').on('click', function(){
							changes.server = {}

							renders.webserveradmin(elc)
						})

						p.el.find('.domain').on('change', function(){
							var domain = $(this).val()

							$(this).val(domain)

							if (domain == system.server.domain){
								delete changes.server.domain
							}
							else{
								changes.server.domain = domain
							}

							renders.webserveradmin(elc)
						})

						p.el.find('.httpsport').on('change', function(){
							var port = $(this).val()

							if(port < 0) port = 0
							if(port > 9999) port = 9999

							$(this).val(port)

							if(port == system.server.https){
								delete changes.server.https
							}
							else{
								changes.server.https = port
							}


							renders.webserveradmin(elc)
						})

						p.el.find('.wsssport').on('change', function(){
							var port = $(this).val()

							if (port < 0) port = 0
							if (port > 9999) port = 9999

							$(this).val(port)

							if (port == system.server.wss){
								delete changes.server.wss
							}
							else{
								changes.server.wss = port
							}

							renders.webserveradmin(elc)
						})

						

						if (clbk)
							clbk()
					})

				}
				else{
					if (clbk)
						clbk()
				}
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
					function(p){

						p.el.find('.addadmin').on('click', windows.addadmin)

						p.el.find('.remove').on('click', function(){
							var address = $(this).attr('address')

							if (address){


								var t = 'Do you really want to remove selected admin from Proxy server admin list?'

								if(address == self.app.platform.sdk.address.pnet().address){
									t = 'Do you really want to remove Your account from Proxy server admin list?'
								}

								dialog({
									class : 'zindex',
									html : t,
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										actions.removeAdmin(address)
									}
								})
								
							}
						})
	
						if (clbk)
							clbk()
					})
				})

			},
			webdistributionwallets : function(elc, clbk){

				var registration = system.wallet.addresses.registration;
				var dropdownCheck = new Parameter({
					type: "VALUES",
					name: 'checkUnique',
					id: 'telegram',
					placeholder: '',
					value: registration.check,
					possibleValues: ['uniqAddress', 'uniqEmails'],
					possibleValuesLabels: ['addresses', 'addresses and emails'],
					defaultValue: registration.check,

					_onChange: function (value) {


						globalpreloader(true)


						proxy.fetch('manage', {
							action : 'set.wallet.setcheck',
							data : {
								key: 'registration',
								check: value
							}

						}).catch(e => {

							
							actions.refresh();

							d.destroy();

							globalpreloader(false)
							return Promise.resolve()

						}).then(r => {


							globalpreloader(false)


						})
					}
				});


				self.shell({
					inner : html,
					name : 'webdistributionwallets',
					data : {
						wallets : info.wallet,
						info : info,
						proxy : proxy,
						check: system.wallet.addresses.registration.check,
						admin : actions.admin(),
						dropdownCheck: dropdownCheck
					},

					el : elc.find('.webdistributionwalletsWrapper')

				},
				function(p){

					ParametersLive([dropdownCheck], elc)

					p.el.find('.coins').on('click', function(){
						var key = $(this).closest('.wallet').attr('key')

						if (key){
							var address = deep(info.wallet, key + '.address')

							if (address){

								dialog({
									class : 'zindex',
									html : 'Do you really want to send 1 PKOIN to this coin distribution address?',
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										topPreloader(30);

										var pk = self.app.user.private.value.toString('hex')

										actions.dust(pk, address, 2, function(err){

											actions.refresh()
							
											topPreloader(100);

											if(!err){
												dialog({
													class : 'one',
													html : 'Pocketcoins sent to address. They will be available in several minutes',
												})
											}

										})
				
										
									}
								})

								
							}



						}
					})

					p.el.find('.settings').on('click', function(){
						var key = $(this).closest('.wallet').attr('key')

						if (key){
							var d = inputDialogNew({
								caption : "Add Private Key To Coins Distribution",
								class : 'addressdialog',
								wrap : true,
								values : [{
									defValue : '',
									validate : 'empty',
									placeholder : "Private Key (WIF Format)",
									label : "Private Key"
								}],
			
								success : function(v){
			
									var pk = v[0]
			
									topPreloader(30);
			
									proxy.fetchauth('manage', {
										action : 'set.wallet.setkey',
										data : {
											key : key,
											privatekey : pk
										}
									}).then(r => {
			
										actions.refresh()
			
										d.destroy();
			
										topPreloader(100);
			
									}).catch(e => {
			
										sitemessage(self.app.localization.e('e13293'))
			
										topPreloader(100);
			
									})
			
								}
							})
						}
					})

					p.el.find('.remove').on('click', function(){
						var key = $(this).closest('.wallet').attr('key')

						if (key){
						
							dialog({
								class : 'zindex',
								html : 'Do you really want to remove this private key from coins distribution process?',
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){	
									topPreloader(30);
			
									proxy.fetchauth('manage', {
										action : 'set.wallet.removeKey',
										data : {
											key : key
										}
									}).then(r => {
			
										actions.refresh()
						
										topPreloader(100);
			
									}).catch(e => {
			
										sitemessage(self.app.localization.e('e13293'))
			
										topPreloader(100);
			
									})
								}
							})
						}
					})

					if (clbk)
						clbk()
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
				function(p){

					renders.webdistributionwallets(p.el)

					if (clbk)
						clbk()
				})
				
			},


			peertubecontent : function(elc, clbk){

				if(!info){
					if(clbk) clbk()

					return
				}

				self.shell({
					inner : html,
					name : 'peertubecontent',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin(),
						
					},

					el : elc.find('.peertubeWrapper')

				},
				function(){


					renders.peertubeinstancestable(elc)

					if (clbk)
						clbk()
				})
			},
			peertubeinstancestable : function(elc, clbk){

				console.log("info", info)

				self.shell({
					inner : html,
					name : 'peertubeinstancestable',
					data : {
						info : info,
						proxy : proxy,
						admin : actions.admin(),
						fixedinstance : null,
						currentinstance : null
					},

					el : elc.find('.peertubeWrapper .instances')

				},
				function(p){


					if (clbk)
						clbk()
				})
			},


			nodescontent : function(elc, clbk){

				if(!info){
					if(clbk) clbk()

					return
				}

				

				self.shell({
					inner : html,
					name : 'nodescontent',
					data : {
						info : info,
						manager : info.nodeManager,
						proxy : proxy,
						admin : actions.admin(),
						
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

				var use = api.get.current() 
				var currentnode = null

				if (use.id == proxy.id && proxy.current){
					currentnode = proxy.current.key
				}

				self.shell({
					inner : html,
					name : 'nodescontenttable',
					data : {
						info : info,
						manager : info.nodeManager,
						proxy : proxy,
						admin : actions.admin(),
						currentnode : currentnode,
						fixednode : api.get.fixednode()
					},

					el : elc.find('.nodesWrapper .nodes')

				},
				function(p){

					var find = function(key){
						return _.find(info.nodeManager.nodes, function(n){
							return n.node.key == key
						})
					}

					p.el.find('.use').on('click', function(){
						var key = $(this).closest('.node').attr('node')
						var node = find($(this).closest('.node').attr('node'))

						var pkey = $(this).closest('.nodeWrapper').attr('key')

						if(pkey == 'tmp') return

						if(!node) return

						if (key == currentnode) {

							var f = api.get.fixednode()

							if (f == key){
								api.set.fixednode(null)
								renders.nodescontenttable(elc)	
							}
							else{
								dialog({
									class : 'zindex',
									html : "Do you really want to fix selected Pocketnet Node?",
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
	
										api.set.fixednode(key)
										renders.nodescontenttable(elc)								
									}
								})
							}

							

						}
						else{

							dialog({
								class : 'zindex',
								html : "Do you really want reconnect to selected Pocketnet Node?",
								btn1text : self.app.localization.e('dyes'),
								btn2text : self.app.localization.e('dno'),
								success : function(){	
									api.set.fixednode(null)
									proxy.changeNode(node.node)
									renders.nodescontenttable(elc)								
								}
							})

						}

						

					})

					p.el.find('.name').on('click', function(){

						return

						var key = $(this).closest('.node').attr('node')


						if(!key || !find(key)){

							sitemessage('Unable to find node')

							return
						}

						var node = find(key)

						var items = [
							{
								text : "Test",
								action : function(clbk){
									actions.node.test(node.node)

									clbk()
								}
							}
						]

						menuDialog({
							items: items
						})

					})

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
			nodecontentmanagestacking : function(elc, clbk){
				if (actions.admin() && stacking){

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
							stacking : stacking
						},

						el : elc.find('.stacking')

					},
					function(p){

						p.el.find('.copyaddress').on('click', function(){
							copyText($(this))

							sitemessage(self.app.localization.e('successcopied'))
						})

						if (clbk)
							clbk()
					})
				}
			},
			nodecontentmanage : function(elc, clbk){
				if(actions.admin()){

					var timestamp = deep(info,'nodeControl.state.timestamp')
					var dis = false

					if (timestamp){
						dis = (new Date()) < fromutc((new Date(timestamp)).addSeconds(60))

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
							dis : dis
						},

						el : elc.find('.localnodeWrapper .manage')

					},
					function(p){

						var lock = function(){
							p.el.find('.nodecontentmanage').addClass('lock')
						}

						makers.stacking()

						actions.settings(p.el)
						
						p.el.find('.refreshstacking').on('click', function(){
							makers.stacking(true)
						})

						p.el.find('.addstacking').on('click', function(){

							var d = inputDialogNew({
								caption : "Add Private Key To Address Stacking",
								class : 'addressdialog',
								wrap : true,
								values : [{
									defValue : '',
									validate : 'empty',
									placeholder : "Private Key (WIF Format)",
									label : "Private Key"
								}],
			
								success : function(v){
			
									var pk = v[0]

									var destroyed = false

									var ds = function(){

										if(destroyed) return

										clearTimeout(dds)

										destroyed = true
										makers.stacking(true)
			
										d.destroy();
			
										topPreloader(100);
									}

									var dds = setTimeout(function(){
										ds()

										sitemessage('Stacking address will be added soon')

									}, 2000)
			
									topPreloader(30);
			
									proxy.fetchauth('manage', {

										action : 'set.node.stacking.import',
										data : {
											privatekey : pk
										}

									}).then(r => {

										ds()
			
									}).catch(e => {

										if(destroyed) return

										clearTimeout(dds)
										
										sitemessage(deep(e, 'message') || self.app.localization.e('e13293'))
			
										topPreloader(100);
			
									})
									

									return false
								}
							})

						})

						p.el.find('.updatenode').on('click', function(){
							dialog({
								class : 'zindex',
								html : "Do you really want to Stop Pocketnet Node and Update It?",
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
								html : "Do you really want to remove Pocketnet Node and All Blockchain Data?",
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
								html : "Do you really want to remove Pocketnet Node Daemon?",
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
								html : "Do you really want to install Pocketnet Node?",
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
								html : "Do you really want to set Pocketnet Node Path to Default path?",
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

					
						/*if(!info.nodeManager.chain){

							setTimeout(function(){
								renders.allsettings()
							}, 2000)

						}*/
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
			
			el.c.on('click', '.collapsepart .subcaption', function(){
				$(this).closest('.collapsepart').toggleClass('expanded')
			})

		}

		var makers = {

			stacking : function(update){
				if(actions.admin() && (!stacking || update)){

					proxy.fetchauth('manage', {

						action : 'set.node.stacking.addresses',
						data : {}

					}).then(r => {

						stacking = r

						renders.nodecontentmanagestacking(el.c)

						topPreloader(100);

					}).catch(e => {

						if (update)
							sitemessage(deep(e, 'message') || self.app.localization.e('e13293'))

						topPreloader(100);

					})

				}
				else{
					renders.nodecontentmanagestacking(el.c)
				}
			},

			panel : function(){
				renders.nodecontentmanage(el.c)
				renders.nodecontentstate(el.c)
				renders.nodescontenttable(el.c)
				renders.peertubeinstancestable(el.c)
				renders.webadminscontent(el.c)
				renders.webdistributionwallets(el.c)
				renders.webserveradmin(el.c)
				renders.webserveremails(el.c)
				
			},

			stats : function(update){

				if (stats){
					chart.make('server', stats, null, update)
					chart.make('nodes', stats, null, update)
					chart.make('wallets', stats, null,  update)
					chart.make('peertube', stats, null, update)
					
				}

			},

			proxycurrent : function(){
				renders.proxycurrent(function(){
					makers.proxycontent()
				})
			},

			proxycontent : function(){

				renders.proxycontent(function(){})
			}
		}

		var initsettings = function(){

			if(info.server.listening && info.wss.listening){
				settings.charts.server.showed = true
			}

			if (actions.admin()){
				settings.charts.nodes.showed = true
			}

		
		}

		var destroy = function(){
			if (proxy) {
				delete proxy.clbks.changednode.components
				delete proxy.clbks.changed.components
				delete proxy.clbks.tick.components
				delete proxy.system.clbks.tick.components
			}
		}

		var make = function(prx){

			destroy()

			proxy = prx//api.get.current()


			info = null
			stats = []
			bots = []

			graphs = {}

			if (proxy){

				proxy.clbks.changed.components = () => {
					make(api.get.current())
				}

				proxy.clbks.changednode.components = () => {
					renders.nodescontenttable(el.c)
				}

				proxy.clbks.tick.components = actions.tick
				proxy.system.clbks.tick.components = actions.ticksettings

			
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

					stats = lastelements(stats, 1000)

					actions.convertTime(stats)

					setTimeout(function(){
						makers.stats()
						makers.panel()

						renders.webserveradmin(el.c)
					},500)	

					if (actions.admin()){

						return proxy.system.request('get.settings').then(r => {

							system = r

							renders.allsettings()

							return Promise.resolve()
						}).then(r => {
							return proxy.system.request('bots.get')

						}).then(r => {
							bots = r.bots || []
							renders.bots(el.c)
						})

					}
					
						
				}).catch(e => {
					makers.proxycurrent()
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

				destroy()

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

				self.app.errors.clbks.system16 = function(){

					if(!info && !self.app.errors.state.proxy && proxy){
						make(proxy);
					}
				
				}
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