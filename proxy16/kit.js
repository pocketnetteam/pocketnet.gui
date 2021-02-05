var Proxy = require("./proxy");
var Datastore = require('nedb');

var deepExtend = require('deep-extend');
var cloneDeep = require('clone-deep');
var tcpPortUsed = require('tcp-port-used');
_ = 	require("underscore");
var fs = require('fs');

////
var f = require('./functions');
////
var db = null;
var proxy = null;
var nedbkey = 'settings';
var settingsPath = 'data/settings'
////
var settings = {};

var nodes = [

	{
		host : '216.108.231.40',
		port : 38081,
		ws : 8087,
		nodename : 'Cryptoserver',
		stable : true,
		rpcuser : 'pocketbot',
		rpcpass : 'pFxcRujDHBkg7kcc',
	},
	{
		host : '64.235.45.119',
		port : 38081,
		ws : 8087,
		nodename : 'CryptoserverSP',
		stable : true,
		rpcuser : 'pocketbot',
		rpcpass : 'pFxcRujDHBkg7kcc',
	},

	{
		host : '64.235.35.173',
		port : 38081,
		ws : 8087,
		nodename : 'CryptoserverSP4',
		stable : true,
		rpcuser : 'pocketbot',
		rpcpass : 'pFxcRujDHBkg7kcc',
	},
	{
		host : '64.235.33.85',
		port : 38081,
		ws : 8087,
		nodename : 'CryptoserverSP5',
		stable : true,
		rpcuser : 'pocketbot',
		rpcpass : 'pFxcRujDHBkg7kcc',
	},
	
	{
		host : '188.187.45.218',
		port : 38081,
		ws : 8087,
		nodename : 'Cryptoserver',
		stable : true,
		rpcuser : 'pocketbot',
		rpcpass : 'pFxcRujDHBkg7kcc',
	}
]

var defaultSettings = {

	admins : ['PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82'],
	
	nodes : {
		dbpath : 'data/nodes'
	},

	server : {
		enabled : true,

		captcha : true,
		
		iplimiter : {
			interval : 30000,
			count  : 500,
			blacklistcount : 3
		},
		
		ports : {
			https : 8899,
			wss : 8099
		},
		
		ssl : {
			key : 'cert/key.pem',
			cert : 'cert/cert.pem',
			passphrase: 'password'
		},
	},

	firebase : {
		key : "",
		dbpath : 'data/firebase',
		id : 'app.pocketnetcustom'
	},

	wallet : {
		dbpath : 'data/wallet',
		addresses : {
			registration : {
				privatekey : "",
				amount : 0.0002,
				outs : 10,
				check : 'uniqAddress'
			}
		}
	},

    node: {
		dbpath : 'data/node',
        enabled: true,
        binPath: '',
		dataPath: '',

		stacking : []
    },
	
}


var state = {

	export : function(view){

		var exporting = {
			server : settings.server,
			firebase : {
				key : settings.firebase.key || "",
				id : settings.firebase.id
			},
			wallet : {
				addresses : settings.wallet.addresses
			},
			node : {
				enabled : settings.node.enabled,
				binPath : settings.node.binPath,
				dataPath: settings.node.dataPath,
				stacking : settings.node.stacking
			},
			admins : settings.admins
		}

		exporting = cloneDeep(exporting)

		if(view) {
			if (exporting.server.ssl.passphrase)
				exporting.server.ssl.passphrase = "*"

			if (exporting.firebase.key)
				exporting.firebase.key = "*"

			if (exporting.wallet.addresses.registration.privatekey)
				exporting.wallet.addresses.registration.privatekey = "*"
		}

		return exporting
	},

	

	apply : function(cds){
		settings = cds
		settings.nodes.stable = nodes
	},

	expand : function(_settings, defaultSettings){
		var cds = cloneDeep(defaultSettings)

        deepExtend(cds, _settings)

		return cds
	},

	remove : function(){

        return new Promise((resolve, reject) => {
            db.remove({ nedbkey : nedbkey }, {}, function (err, numRemoved) {

                if(err){
                    reject(err)
                }
                else{
                    resolve()
                }
            });
        })

		
	},

	rewrite : function(){
        return state.remove().then(r => {
            return state.savedb()
        })
	},

	savedb : function(){
        return new Promise((resolve, reject) => {

			var saving = state.export()
				saving.nedbkey = nedbkey

            db.insert(saving, function (err, newDoc) {
                if(err){
                    reject(err)
                }
                else{
                    resolve()
                }
            });
        })
	},

	save : function(){
		return state.rewrite()
	},

	saverp : function(){
		return state.rewrite().then(r => {
			return kit.proxy()
		})
	}
}



var kit = {

	manage : {
		set : {

			server : {
				ports : function(httpsws){
	
					var ch = {
						https : false,
						wss : false
					}
		
					return tcpPortUsed.check(httpsws.https, '127.0.0.1')
		
					.then(function(inUse) {
		
						ch.https = inUse
		
						return tcpPortUsed.check(httpsws.wss, '127.0.0.1')
		
					})
		
					.then(function(inUse) {
		
						ch.wss = inUse
		
						return Promise.resolve()
		
					})
		
					.then(function(){
						if(!ch.https && !ch.wss){
		
							if(settings.server.ports.https == httpsws.https && settings.server.ports.wss == httpsws.wss){
								return Promise.reject('nothingchanged') 
							}
		
							settings.server.ports = {
								https : httpsws.https,
								wss  : httpsws.wss
							}
		
							return state.saverp().then(proxy => {
								return proxy.server.rews()
							})
						}
						
						return Promise.reject('portsused')
		
					})
				},
	
				iplimiter : function(v){
	
					var st = settings.server.iplimiter
	
					if (v.interval) st.interval = interval
					if (v.count) st.count = count
					if (v.blacklistcount) st.blacklistcount = blacklistcount
		
				
					return kit.save()
					
				},
	
				captcha : function(v){
	
					if (settings.server.captcha == v) return Promise.resolve()
						settings.server.captcha = v
		
					return kit.save()
					
				},
	
				enabled : function(v){
	
					if (settings.server.enabled == v) return Promise.resolve() 
						settings.server.enabled = v
		
						return state.saverp().then(proxy => {
							return proxy.server.rews()
						})
					
				},
	
				ssl : function(sslobj){
	
					if(sslobj.key && sslobj.cert && sslobj.passphrase){
		
						var d = {
							passphrase : sslobj.passphrase
						}
	
						var keypath = 'cert/keyl.pem'
						var certpath = 'cert/certl.pem'
		
						return f.saveFile(keypath, sslobj.key).then(() => {
							d.keypath = keypath
		
							return f.saveFile(certpath, sslobj.cert)
						}).then(() => {
							d.certpath = certpath
		
							return Promise.resolve(d)
						}).then(() => {
		
							settings.server.ssl = d
		
							return state.saverp()
	
						}).then(proxy => {
							return proxy.server.rews()
						})
					}
		
					else{
		
						return Promise.reject('bad format')
		
					}
					
				},
	
				firebase : {
					id : function(id){
	
						settings.firebase.id = id
						return state.save()
						
					},
					key : function(fbkjsonfile){
	
						var path = 'private/pocketnet-firebase-adminsdk.json'
			
						return f.saveFile(path, fbkjsonfile).then(() => {
			
							settings.firebase.key = path
			
							return state.saverp()
		
						}).then(proxy => {
							return proxy.firebase.re()
						})
						
					}
				}
			},
	
			wallet : {
				addresses : function(addresses){
	
					if(f.hash(settings.addresses.addresses) == f.hash(addresses)) return Promise.resolve()
	
					settings.addresses.addresses = addresses
	
					return state.saverp().then(proxy => {
						return proxy.wallet.re()
					})
					
				}
			},
	
			node : {
	
				enabled : function({enabled}){


					if(settings.node.enabled == enabled) return Promise.resolve()

					settings.node.enabled = enabled ? true : false
	
					return state.saverp().then(proxy => {

						proxy.nodeControl.enable(settings.node.enabled)

						return Promise.resolve(settings.node.enabled)

						
					})
					
				},
	
				binPath : function(v){
					if(settings.node.binPath == v) return Promise.resolve()
	
					return state.saverp().then(proxy => {
	
						return proxy.nodeControl.re()
					})
					
				},
	
				dataPath : function(v){
					if(settings.node.dataPath == v) return Promise.resolve()
	
					return state.saverp().then(proxy => {
						return proxy.nodeControl.re()
					})
					
				},
	
			},
	
			admins : {
				add : function(v){
					if(_.indexOf(settings.admins, v) > -1){
						return Promise.resolve()
					}
	
					settings.admins.push(v)
	
					return state.save()
				},
	
				remove : function(v){
	
					var i = _.indexOf(settings.admins, v)
	
					if (i == -1) return Promise.resolve()
	
					settings.admins.splice(i, 1)
	
					return state.save()
				}
			}
		},
	
		get : {
			settings : function(){
				return Promise.resolve(state.export(true))
			},
			state : function(compact){
				return kit.proxy().then(proxy => {
					return proxy.kit.info(compact)
				})
			}
		},

		node : {
			update : function(message){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.update().then(data => {
						send(message.id, null, data)
					})
				})
			},
			checkupdate : function(message){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.checkupdate().then(update => {
						send(message.id, null, update)
					})
				})
			},
			request : function(message){
				
				return kit.proxy().then(proxy => {

					if(!message.data[0]) return Promise.reject('methodname')

					if(!proxy.nodeControl.request[message.data[0]]){
						return proxy.nodeControl.kit.rpc(message.data[0], message.data[1])
					}

					return proxy.nodeControl.request[message.data[0]](message.data[1])
					
				}).then(data => {
					send(message.id, null, data)
				})
			}
		},

		proxy : {
			detach : function(modules){
				return kit.proxy().then(proxy => {
					return proxy.kit.detach(modules)
				})
			}
		}
	},

	gateway : function(message){
		return this.proxy().then(proxy => {
			var api = proxy.apibypath(message.path)

			if(!api) return Promise.reject('api')

			proxy.authorization[api.authorization || 'dummy'](message.data)

			message.data.U = true //// IPC CONNECTION BACKDOOR

			if(!message.data.A) message.data.A = 'ipcconnection'

			return api.action(message.data).then(r => {
				return Promise.resolve(r.data)
			})

		})
	},
	
	startproxy : function(){

		if(!proxy){
			proxy = new Proxy(settings, kit.manage)
			
			return proxy.kit.init()
		}

		return Promise.reject('inited')

	},

	proxy : function(){
		if(proxy) return Promise.resolve(proxy)

		return Promise.reject('proxynull')
	},

	init : function(environmentDefaultSettings, hck){

		var settings = defaultSettings;

		if(!environmentDefaultSettings) 
			environmentDefaultSettings = {}

		if(!hck) hck = {}

		settings = state.expand(environmentDefaultSettings, settings)

		db = new Datastore(f.path(settingsPath));

		return new Promise((resolve, reject) => {

			var start = function(){

				kit.startproxy().then(r => {

					return kit.proxy()

					
				}).then(proxy => {

					if (hck.wssdummy){
						proxy.wss.wssdummy(hck.wssdummy)
					}

					resolve()

				}).catch(e => {
					reject(e)
				})
			}

			db.loadDatabase(function(err) {   

				console.log('err', err)
		
				if(!err){
					db.find({ nedbkey : nedbkey }).exec(function (err, docs) {
			
						var savedSettings = !err? docs[0] || {} : {}
			
						state.apply(state.expand(savedSettings, settings))
			
						start()
					});
				}
			
				else{
					state.apply(state.expand({}, settings))

					start()
				}


			});

		})
	},

	/////

	destroy : function(){

		return kit.proxy().then(proxy => {
	
			return proxy.kit.safedestroy()
	
		}).catch(e => {
	
			if(e == 'detach') return Promise.reject(e)
	
			return Promise.resolve()
	
		}).then(r => {

			return Promise.resolve()
			//process.exit(0)
		})
	},

	candestroy : function(){
		return kit.proxy().then(proxy => {
			return proxy.kit.candestroy()
		})
	},

	
}





module.exports = kit

