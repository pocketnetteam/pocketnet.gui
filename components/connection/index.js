var connection = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var check = {
			proxy : function(proxy, clbk){
				var bkp = self.app.platform.apiproxy;

				self.app.platform.apiproxy = proxy;

				self.app.platform.sdk.proxy.info(function(info, error){

					if (clbk){
						clbk(!error)
					}

				})

				self.app.platform.nodeid = bkp;
			},

			node : function(node, clbk){

				var bkp = self.app.platform.nodeid;

				self.app.platform.nodeid = node;

				self.app.platform.sdk.node.get.time(function(t, error){

					if (clbk){
						clbk(!error)
					}

				})

				self.app.platform.nodeid = bkp;
			}
		}

		var dcheck = {
			proxy : function(proxy, clbk){
				check.proxy(proxy, function(res){
					if(!res){

						dialog({
							html : "Unable connect to proxy",
							class : 'one zindex'
						})

						if (clbk)
							clbk(false)
					}

					else{
						if (clbk)
							clbk(true)
					}
				})
			},
			node : function(node, clbk){
				check.node(node, function(res){
					if(!res){

						dialog({
							html : "Unable connect to node",
							class : 'one zindex'
						})

						if (clbk)
							clbk(false)

					}

					else{
						if (clbk)
							clbk(true)
					}
				})
			}
		}

		var actions = {

			preloader : function(l){
				if(l){
					el.c.addClass('loading')
				}
				else{
					el.c.removeClass('loading')
				}
			},

			addproxy : function(_proxy, clbk){
				var editing = false;
				var method = 'create'
				var header = 'Add Proxy'
				var buttontext = 'Add'

				if(_proxy) {
					editing = true;
					method = 'update'
					header = 'Edit Proxy'
					buttontext = 'Save'

				}

				_proxy || (_proxy = {})

				var ap = {

					host : new Parameter({

						type : "STRING",
						name : "Node Host",
						id : 'host',

						defaultValue : _proxy.host || '',
						placeholder : "0.0.0.0",
						require : true
					
					}),

					port : new Parameter({

						type : "STRING",
						name : "RPC Port",
						id : 'port',
						defaultValue : _proxy.port || '8888',
						placeholder : "8888",
						require : true
					
					}),

					ws : new Parameter({

						type : "STRING",
						name : "WS Port",
						id : 'ws',
						defaultValue : _proxy.ws || '8088',
						placeholder : "8088",
						require : true
					
					})

				}

				var wndbuttons = {
					close : {
						class : 'close',
						html : '<i class="fas fa-times"></i> Close',
						fn : function(wnd, wndObj){
							wndObj.close();
						}
					},

					success : {
						class : 'success',
						html : '<i class="fas fa-check"></i> ' + buttontext,
						fn : function(wnd, wndObj){

							var newproxy = {}

							var f = true;

							_.each(ap, function(p){
								newproxy[p.id] = p.value || _proxy[p.id]

								if(!p.value) f = false;
							})
							
							
							if(!f){
								sitemessage("Please fill all fields")

								return
							}

							newproxy.user = true;
							newproxy.id = self.app.platform.sdk.proxy.makeid(newproxy)

							var proxies = self.app.platform.sdk.proxy.all()

							var d = _.find(proxies, function(p){
								return p.id == newproxy.id
							})

							if (d){
								sitemessage("You alredy have this proxy in list.")

								return
							}

							wnd.find('.addproxy').addClass('loading')

							dcheck.proxy(newproxy, function(r){

								wnd.find('.addproxy').removeClass('loading')

								if(r){

									var change = self.app.platform.sdk.proxy[method](newproxy, _proxy.id)

									if(!editing){
										
										self.app.platform.apiproxy = newproxy;
										change = true;
									}

									if (clbk){
										clbk(newproxy, change)
									}

									wndObj.close()

								}

							})

							
						}
					},
				}

				if (editing){

					wndbuttons.delete = {

				
						class : 'delete ghost',
						html : '<i class="fas fa-trash"></i> Delete',
						fn : function(wnd, wndObj){

							dialog({
								class : 'zindex',
								html : "Do you really want to delete this proxy from list?",
								success : function(){

									var change = self.app.platform.sdk.proxy.remove(_proxy.id)

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

			
			proxieslist : function(el, _wnd){

				var apply = function(_wnd){
					_wnd.close();

					actions.connectproxy();
				}

				var proxies = self.app.platform.sdk.proxy.all()

				var buttons = {
					close : {
						class : 'close',
						html : '<i class="fas fa-times"></i> Close',
						fn : function(wnd, wndObj){

							console.log('close')

							wndObj.close();
						}
					},

					success : {
						class : 'success',
						html : '<i class="fas fa-plus"></i> Add Proxy',
						fn : function(wnd, wndObj){

							console.log('ADDDD')
							
							actions.addproxy(null, function(proxy, change){

								if (change){
									apply(wndObj);
								}
								else{
									renders.proxieslist(wnd, wndObj)
								}
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
						proxy : self.app.platform.apiproxy,
						ele : actions.ele()
					},

					wnd : {
						
						header : "Proxies list",
						noInnerScroll : true,
						class : 'proxieslistwnd',

						buttons : buttons

					},

				}
				
				if (el){
					p.el = el;	
				}
				else{
					p.insert = 'wnd';
				}

				self.shell(p, function(_p){


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

							if (pid == 'none'){

								dialog({
									html : "Do you really want to stop use Proxy. It is usafe (Http connection)",
									class : 'zindex',
									success : function(){
										actions.using(true)

										renders.active();	

										(_p.container || _wnd).close();
									}
								})

								
							}
							else{

								var proxy = self.app.platform.sdk.proxy.find(pid)

								_p.el.find('.proxieslist').addClass('loading')

								dcheck.proxy(proxy, function(r){

									_p.el.find('.proxieslist').removeClass('loading')

									if(r){

										self.app.platform.sdk.proxy.changeWithDialog(proxy, function(){
											(_p.container || _wnd).close();
		
											renders.proxy();
											renders.active();	
										})

									}

								})

								
								
							}

							
						}
					})

					_p.el.find('.edit').on('click', function(){
						var pid = $(this).closest('.proxy').attr('pid')

						var proxy = self.app.platform.sdk.proxy.find(pid)

						if (proxy){

							actions.addproxy(proxy, function(proxy, change){

								if (change){
									apply(_p.container || _wnd)
								}
								else{
									actions.proxieslist(p.el)
								}
								
							})

						}
					})

				})
			},

			addnode : function(_node, clbk){

				var editing = false;
				var method = 'create'
				var header = 'Add Node'
				var buttontext = 'Add'

				if(_node) {
					editing = true;
					method = 'update';
					header = 'Edit Node';
					buttontext = "Save"
				}

				_node || (_node = {})

				var ap = {

					saveto : new Parameter({

						type : "VALUES",
						name : "Save",
						id : 'saveto',
						defaultValue : 'proxy',

						possibleValues : ['proxy', 'locally'],
						possibleValuesLabels : ['On Proxy', 'Locally'],
						
						require : true
					
					}),

					host : new Parameter({

						type : "STRING",
						name : "Node Host",
						id : 'host',

						defaultValue : _node.host || '',
						placeholder : "0.0.0.0",
						require : true
					
					}),

					port : new Parameter({

						type : "STRING",
						name : "RPC Port",
						id : 'port',
						defaultValue : _node.port || '38081',
						placeholder : "38081",
						require : true
					
					}),

					ws : new Parameter({

						type : "STRING",
						name : "WS Port",
						id : 'ws',
						defaultValue : _node.ws || '8087',
						placeholder : "8087",
						require : true
					
					}),
					
					nodename : new Parameter({

						type : "STRING",
						name : "Name Of Node",
						id : 'nodename',
						defaultValue : (_node.nodename || ((self.app.platform.api.clearname(deep(app, 'platform.sdk.user.storage.me.name')) || "New") + ' node')).replace(/\+/g, ' '),
						placeholder : "Please enter Node Name",
						require : true
					
					}),

					rpcuser : new Parameter({

						type : "STRING",
						name : "RPC login",
						id : 'rpcuser',
						placeholder : "Login for PRC authorization",
						defaultValue : _node.rpcuser || '',
						require : true
					
					}),


					rpcpwd : new Parameter({

						type : "STRING",
						name : "RPC password",
						id : 'rpcpwd',

						defaultValue : _node.rpcpwd ||'', /*'pockettest',*/
						placeholder : "Password for PRC authorization",
						require : true
					
					}),

				}

				if (self.app.platform.dontuseapiproxy || !self.app.platform.apiproxy){
					ap.saveto = new Parameter({
						type : "VALUES",
						name : "Save",
						id : 'saveto',
						defaultValue : 'locally',
						possibleValues : ['locally'],
						possibleValuesLabels : ['Locally'],						
						require : true					
					})
				}


				/*if(!actions.ele()){

					ap.rpcpwd.hidden = true
					ap.rpcuser.hidden = true
					
				}*/

				console.log('ap', ap)


				var wndbuttons = {

					close : {
						class : 'close',
						html : '<i class="fas fa-times"></i> Close',
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
								sitemessage("Please fill all fields")

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
					
					ap.host.disabled = true
					ap.saveto.hidden = true

					if(_node.locally)
						ap.saveto.value = 'locally'
					else{
						ap.saveto.value = 'proxy'
					}

					wndbuttons.delete = {

				
						class : 'delete ghost',
						html : '<i class="fas fa-trash"></i> Delete',
						fn : function(wnd, wndObj){

							dialog({
								class : 'zindex',
								html : "Do you really want to delete this node from list?",
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

					var prsave = function(){
						_p.el.find('.addnode').attr('saveto', ap.saveto.value)
					}

					prsave()

					ap.saveto._onChange = function(){
						prsave()	
					}

				})

			},

			connectproxy : function(clbk){
				
				self.app.platform.nodeid = null;
				self.app.platform.nodes = null;	

				self.app.errors.clear()

				self.app.platform.state.save();

				/*renders.proxy();
				renders.active();	*/

				self.app.platform.restart(function(){

					app.reload(function(){

					})

					if (clbk)
						clbk()
				})
			},

			connectnode : function(node, clbk){

				actions.preloader(true)

				dcheck.node(node, function(r){

					if(!r){
						actions.preloader(false)
						return
					}

					self.app.platform.nodeid = node
					self.app.platform.state.save();
					renders.active();

					self.app.errors.clear()


					self.app.platform.restart(function(){

						actions.preloader(false)

						app.reload(function(){

						})

						if(clbk)
							clbk()
					})

				})

				
			},

			ele : function(){
				return typeof _Electron != 'undefined'
			},

			using : function(s){

				self.app.platform.dontuseapiproxy = s;
				
				self.app.platform.sdk.proxy.save();

				renders.proxy();

				actions.connectproxy();

			}
		}

		var events = {

			using : function(){

				if(!self.app.platform.dontuseapiproxy){
					dialog({
						html : "Do you really want to stop use Proxy. It is usafe (Http connection)",
						class : 'zindex',
						success : function(){
							actions.using(!self.app.platform.dontuseapiproxy)
						}
					})
				}

				else
				{
					actions.using(!self.app.platform.dontuseapiproxy)
				}

			},

			proxieslist : function(){
				actions.proxieslist()
			},

			addnode : function(){
				actions.addnode()
			},

			editnode : function(){
				var host = $(this).closest('.node').attr('host')
				var locally = $(this).closest('.node').attr('locally')

				if(locally == 'true') locally = true
				else locally = false

				var node = _.find(self.app.platform.nodes, function(n){
					return n.host == host && n.locally == locally
				})

				if (node){
					actions.addnode(node)
				}
			},

			connectnode : function(){

				var e = $(this).closest('.node');

				if (e.hasClass('active')) return

				var host = e.attr('host')
				var locally = e.attr('locally')

				if(locally == 'true') locally = true
				else locally = false

				var node = _.find(self.app.platform.nodes, function(n){
					return n.host == host && n.locally == locally
				})

				actions.connectnode(node)
			}
		}

		var renders = {
			nodes : function(nodes, clbk){
				self.shell({

					inner : append,
					name : 'nodes',
					data : {
						nodes : nodes
					},

					el : el.list

				},
				function(){
					renders.empty();
					renders.active();

					

					if (clbk)
						clbk()
				})
			},

			empty : function(){
				if (el.list.find('.node').length){
					el.nodes.removeClass('empty')
				}

				else{
					el.nodes.addClass('empty')
				}
				
			},

			active : function(){
				el.list.find('.node').removeClass('active')

				if (self.app.platform.nodeid){

					el.list.find('.node[host="'+self.app.platform.nodeid.host+'"][locally="'+(self.app.platform.nodeid.locally || 'false')+'"]').addClass('active')
				}
			},

			proxy : function(){

				if (self.app.platform.dontuseapiproxy){

					el.cc.removeClass('useproxy')
					el.cc.addClass('shownodes')
					el.currentproxy.html("Don't use proxy")
					
				}
				else{

					el.cc.addClass('useproxy')

					if(!self.app.platform.apiproxy){

					
						el.cc.removeClass('shownodes')		
						el.currentproxy.html("Not selected")
	
					}
	
					else{
						el.cc.addClass('shownodes')						
						el.currentproxy.html('https://' + app.platform.apiproxy.host + ":" + app.platform.apiproxy.port + "; wss:" + app.platform.apiproxy.ws)	
	
					}
				}

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.add.on('click', events.addnode)

			el.c.on('click', '.edit', events.editnode)

			el.c.on('click', '.connectnode', events.connectnode)
			
			el.c.find('.openproxielist').on('click', events.proxieslist)

			el.c.find('.usingproxy').on('click', events.using)
		}

		var load = {
			users : function(clbk){
				var u = _.map(self.app.platform.nodes, function(m){
					return m.addedby
				})	

				self.app.platform.sdk.users.get(u, clbk)
			}
		}

		var make = function(){

			renders.proxy()

			el.nodes.addClass('loading')

			self.app.platform.sdk.system.get.nodes(true, function(){

				el.nodes.removeClass('loading')

				//load.users(function(){
				renders.nodes(self.app.platform.nodes)
				//})
				
			}) 

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {
					ele : actions.ele()
				};

				if(window.cordova && 1 == 0){

					self.nav.api.load({
						open : true,
						href : 'userpage?id=test',
						history : true
					})

				}
				else{
					clbk(data);
				}

				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.list = el.c.find('.list')
				el.add = el.c.find('.addnewNode')
				el.nodes = el.c.find('.nodespart')
				el.cc = el.c.find('.connection')

				el.currentproxy = el.c.find('.current')

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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = connection;
}
else{

	app.modules.connection = {};
	app.modules.connection.module = connection;

}