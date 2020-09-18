var Joi = require("joi");
var fs = require('fs');
var exhandles = require('./exhandles.js').exhandles;
const { performance } = require('perf_hooks');

var Handles = function(p){

	var self = this;

	var schemas = {
		rpc : {
			method : Joi.string().required(),
			parameters : Joi.string().allow(''),
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			Token :  Joi.string(),
			node : Joi.string(),
			nodelocally : Joi.string(),
		},
		url : {
			url : Joi.string().required(),
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			Token :  Joi.string(),
			node : Joi.string(),
		},
		address : {
			address : Joi.string().required(),
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			Token :  Joi.string(),
			node : Joi.string(),
		},
		referalreferrer : {
			referal : Joi.string().required(),
			referrer : Joi.string().required(),
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			Token :  Joi.string(),
			node : Joi.string(),
		},
		send : {
			address : Joi.string().required(),
			private : Joi.string().required(),
			value : Joi.string().required()
		},
		address: {
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			address : Joi.string().required()
		},
		empty : {
			system : Joi.string(),
			fingerPrint :  Joi.string()
		},

		emptySignature : {
			system : Joi.string(),
			fingerPrint :  Joi.string(),
			signature : Joi.string().required(),
		},
	
		nodecreate : {
			host : Joi.string().required(),
			port : Joi.string().required(),
			ws : Joi.string().required(),
			nodename :  Joi.string().required(),
			signature : Joi.string().required(),
		},
	
		noderevoke: {
			host : Joi.string().required(),
			signature : Joi.string().required(),
		},
	
	}	
	
	var response = function(err, results, p)
	{
		if(err)
		{
			p.data = results;
	
			p.responseFail(err.status || err, p);
		}
		else
		{
			p.data = results;
	
			if (p.data && p.data.token) 
				p.token = p.data.token
	
			p.responseSuccess(p)
		}
	}
	
	
	var handles = {
	
		rpc : {
			action : function(connect){
	
				var node = '';
				var rpc = null;
				var time = performance.now()

	
				if(!connect.parameters.nodelocally){
	
					node = connect.parameters.node || 'auto';
	
					if(!connect.nodeManager.validateHost(node)) node = 'auto'
	
					if (node == 'auto'){
						node = connect.nodeManager.select(node)
					}
	
					if(!node || !connect.nodeManager.rpc[node]){
	
						response(523, '', connect)
						return
	
					}
	
					rpc = connect.nodeManager.rpc[node]
				}
				else
				{
	
					var nodelocally = JSON.parse(connect.parameters.nodelocally)
	
					if(!connect.nodeManager.rpc[nodelocally.host]){
	
						rpc = connect.nodeManager.addLocally(nodelocally)
	
					}
					else{
						rpc = connect.nodeManager.rpc[nodelocally.host]
					}
				}		
	
				if(!deep(connect, 'parameters.method') || !rpc[connect.parameters.method]){
					response(404, '', connect)
	
					return
				}
	
				var parsed = [];
	
				try{
					parsed = JSON.parse(hexDecode(connect.parameters.parameters)) || []
				}
	
				catch (e){
					//console.log("PARSE FAIL",hexDecode (connect.parameters.parameters))
				}

 
				if (self.cache){
					var data = self.cache.get(connect.parameters.method, parsed)

					if (data){
						response(null, data, connect)

						return
					}
				}
	
				rpc[connect.parameters.method](
	
					parsed,
	
					function(err, data){

						var difference = performance.now() - time;
						var code = 200;
	
						if(!err){

							if (self.cache){
								self.cache.set(connect.parameters.method, parsed, data)
							}	

							response(null, data, connect)
						}
						else
						{
							code = 500;
	
							err || (err = {});

							console.log(err)
	
							if(!err.code || err.code == -28){
								code = 521
							}
	
							response(code, err, connect)
						}	


						if (node && connect.nodeManager){
							connect.nodeManager.statistic.add(node, {
								code : code,
								difference : difference
							})
						}
					}
				)
			},
			schema : schemas.rpc,
			authorization : false,
			private : false,
		},
	
		bitchute : {
			action : function(connect){
	
				connect.remote.make(hexDecode(connect.parameters.url), function(err, data, html, $){
	
					if(!err){
	
						data.magnet = $('[title="Magnet Link"]').attr('href')
	
						if(data.magnet && data.magnet.indexOf("magnet") == 0){
	
							var sp = parameters(data.magnet, true);
							
							data.video = sp;
	
							if(data.og){
								data.video.title = data.og.titlePage
								data.video.preview = data.og.image
							}
	
						}

						else{

							var src = $('#player source').attr('src')

							if (src){
								data.video = {
									as : src
								}

								if(data.og){
									data.video.title = data.og.titlePage
									data.video.preview = data.og.image
								}
							}

						}
	
						response(null, data, connect)
					}
					else
					{
						response(500, err, connect)
					}	
	
	
				})
	
							
			},
			schema : schemas.url,
			authorization : false,
			private : false,
		},
	
		url : {
			action : function(connect){
	
				connect.remote.make(hexDecode(connect.parameters.url), function(err, data, html){
	
					if(!err){
	
						data.html = html
	
						response(null, data, connect)
					}
					else
					{
						response(500, err, connect)
					}	
	
	
				})
	
							
			},
			schema : schemas.url,
			authorization : false,
			private : false,
		},
	
		urlPreview : {
			action : function(connect){
	
				connect.remote.make(hexDecode(connect.parameters.url), function(err, data){
	
					if(!err){
						response(null, data, connect)
					}
					else
					{
						response(500, err, connect)
					}	
	
	
				})
	
	
				
			},
			schema : schemas.url,
			authorization : false,
			private : false,
		},
	
		send : {
			action : function(connect){
	
				connect.app.platform.sdk.wallet.send(connect.parameters.address, connect.parameters.private, connect.parameters.value,
	
				function(err, data){
	
					if(!err){
	
						response(null, data, connect)
					}
					else
					{
						response(500, err, connect)
					}
	
				})
	
			},
			schema : schemas.send,
			authorization : false,
			private : false,
		},
	
		nodes : {
	
			revoke : {
				action : function(connect){
	
					if(!connect.db){
	
						response(510, {}, connect)
	
						return
					}
	
					connect.nodeManager.revoke(connect.parameters, function(err, node){
	
						if(err){
							response(500, err, connect)
						}
						else{
							response(null, node, connect)
						}	
						
					})
					
					
				},
				schema : schemas.noderevoke,
				authorization : 'signature',
				private : false,
			},
	
			update : {
				action : function(connect){
	
					if(!connect.db){
	
						response(510, {}, connect)
	
						return
					}
	
					connect.nodeManager.update(connect.parameters, function(err, node){
	
						if(err){
							response(500, err, connect)
						}
						else{
							response(null, node, connect)
						}	
						
					})
					
					
				},
				schema : schemas.nodecreate,
				authorization : 'signature',
				private : false,
			},
	
			create : {
				action : function(connect){
	
					if(!connect.db){
	
						response(510, {}, connect)
	
						return
					}
	
					connect.nodeManager.create(connect.parameters, function(err, node){
	
						if(err){
							response(500, err, connect)
						}
						else{
							response(null, node, connect)
						}	
						
					})
					
					
				},
				schema : schemas.nodecreate,
				authorization : 'signature',
				private : false,
			},
			
			get : {
				action : function(connect){
		
					response(null, {
						nodes : connect.nodeManager.getnodes() || []
					}, connect)
		
				},
				schema : schemas.empty,
				authorization : false,
				private : false,
			}
	
			
		},
	
		info : {
			action : function(connect){
				
	
				response(null, {
					info : {
						version : 1,
						money : (connect.handles.freeMoney && connect.kran) ? true : false,
						processes : connect.processes && connect.processes.check() ? true : false,
						db : connect.db ? true : false,
						firebase : connect.firebase ? true : false,

						repost : true
					},
				}, connect)
	
			},
			schema : schemas.empty,
			authorization : false,
			private : false,
		},

		logs : {
			action : function(connect){

				var ws = {}

				if(self.ws) ws = self.ws.info();

				var data = {
					logs : connect.logs,
					ws : ws
				}

				if (connect.iplimiter) {
					data.iplimiter = connect.iplimiter.info()
				}
	
				response(null, data, connect)
	
			},
			schema : schemas.emptySignature,
			authorization : 'signature',
			addresses : ['PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'P9jDYvkXHw4FtRZof661ddzmMyFRqGUjwN'],
			private : false,
		},

		stats : {
			action : function(connect){

				var data = {
					stats : self.router.stats()
				}
	
				response(null, data, connect)
	
			},
			schema : schemas.emptySignature,
			authorization : 'signature',
			addresses : ['PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'P9jDYvkXHw4FtRZof661ddzmMyFRqGUjwN'],
			private : false,
		},
	
		
	}
	
	if (typeof exhandles != 'undefined'){

		p.schemas = schemas;
		p.response = response;

		exhandles(handles, p)
	}

	self.handles = handles;

	self.info = function(){

		var h = {}

		var schemaToJson = function(schema){
			var s = {}

			_.each(schema, function(v, i){
				s[i] = v.type 
			})
		} 

		var rec = function(obj, i, to){

			if(obj.action){
				to[i] = {
					authorization : obj.authorization,
					schema : schemaToJson(obj.schema)
				}
			}

			else{

				to[i] = {}

				_.each(obj, function(k, v){
					rec(k, v, to[i])
				})
			}

		}

		rec(self.handles, 'handles', h)

		return h

	}

	return self;
}


module.exports = Handles