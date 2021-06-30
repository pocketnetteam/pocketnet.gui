var Proxy = require("./proxy");
var Datastore = require('nedb');

var deepExtend = require('deep-extend');
var cloneDeep = require('clone-deep');
var tcpPortUsed = require('tcp-port-used');
_ = 	require("underscore");
var fs = require('fs');

var Pocketnet = require('./pocketnet.js');
const { base64encode, base64decode } = require('nodejs-base64');
////
var f = require('./functions');
const { deep } = require("./functions");
////
var db = null;
var proxy = null;
var nedbkey = 'settings';
var settingsPath = 'data/settings'
////
var settings = {};

var pocketnet = new Pocketnet()
var test = _.indexOf(process.argv, '--test') > -1


var testnodes = [

	/*{
		host : '188.187.45.218',
		port : 36061,
		ws : 6067,
		name : 'CryptoserverTest',
		stable : true
	},

	{
		host : '65.21.56.203',
		port : 36061,
		ws : 6067,
		name : 'CryptoserverTest2',
		stable : true
	}*/

	{
		host : '216.108.231.28',
		port : 36061,
		ws : 6067,
		name : 'CryptoserverTest',
		stable : true
	},

	{
		host : '64.235.46.85',
		port : 36061,
		ws : 6067,
		name : 'CryptoserverTest2',
		stable : true
	}
	
]

var activenodes = [
	{
		host : '64.235.45.119',
		port : 38081,
		ws : 8087,
		name : 'CryptoserverSP',
		stable : true
	},

	{
		host : '216.108.231.40',
		port : 38081,
		ws : 8087,
		name : 'CryptoserverSP5',
		stable : true
	},

	/*{
		host : '64.235.35.173',
		port : 38081,
		ws : 8087,
		name : 'CryptoserverSP4',
		stable : true
	},*/

	{
		host : '185.148.147.15',
		port : 38081,
		ws : 8087,
		name : 'Cryptoserver',
		stable : true
	},

	{
		host : '135.181.196.243',
		port : 38081,
		ws : 8087,
		name : 'Cryptoserver243',
		stable : true
	}
	
]

var nodes = activenodes

if (test) nodes = testnodes

console.log('nodes', nodes)

var defaultSettings = {

	admins : [],

	testkeys : [],
	
	nodes : {
		dbpath : 'data/nodes'
	},

	server : {
		enabled : false,

		captcha : true,
		host : '',
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
			name : "Default",
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
				check : 'uniqAddress',
			}
		}
	},

	emails : {
		dbpath : 'data/emails',
		from : ''
	},

    node: {
		dbpath : 'data/node',
        enabled: false,
        binPath: '',
		dataPath: '', //// deleted
		ndataPath : ''
    },
	
	bots : {
		dbpath : 'data/bots',
	},

	proxies : {
		dbpath : 'data/proxies',
		explore : true
	},

	systemnotify : {
		token : '',
		chatid : '',
		parameters : {}
	}

	/*rsa : {
		private : '',
		public : ''
	}*/
}


var state = {

	exportkeys : function(){
		return _.filter(settings.testkeys, function(key){

			var kp = null

			try{
                kp = pocketnet.kit.keyPair(key)

				return true
            }
            catch(e){
                return false
            }

		})
	},

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
			emails : settings.emails,
			node : {
				enabled : settings.node.enabled,
				binPath : settings.node.binPath,
				ndataPath: settings.node.ndataPath,
				dataPath: settings.node.dataPath,
			},
			admins : settings.admins,
			proxies : {
				explore : settings.proxies.explore
			},
			testkeys : state.exportkeys(),
			systemnotify : settings.systemnotify
			//rsa : settings.rsa
		}

		exporting = cloneDeep(exporting)

		if(view) {

			exporting.testkeys = []

			if (exporting.systemnotify.token)
				exporting.systemnotify.token = "*"

			if (exporting.systemnotify.chatid)
				exporting.systemnotify.chatid = "*"

			if (exporting.server.ssl.passphrase)
				exporting.server.ssl.passphrase = "*"

			if (exporting.firebase.key)
				exporting.firebase.key = "*"

			if (exporting.wallet.addresses.registration.privatekey)
				exporting.wallet.addresses.registration.privatekey = "*"

			// if (exporting.emails.transporter.auth.user)
			// 	exporting.emails.transporter.auth.user = "*"
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
			
			console.log('saving', saving);

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
				
				settings : function({
					settings = {}
				}){

					var ctx = kit.manage.set.server
					var notification = {}

					if(typeof settings.domain != 'undefined') notification.domain = settings.domain
					if(settings.ports) notification.ports = settings.ports
					if(typeof settings.enabled) notification.enabled = settings.enabled
					if(deep(settings, 'firebase.id')) notification.firebase = deep(settings, 'firebase.id')
                    if(settings.ssl) notification.ssl = true

					return kit.proxy().then(proxy => {

						return proxy.wss.sendtoall({
							type : 'proxy-settings-changed',
							data : notification
						}).catch(e => {
							return Promise.resolve()
						})

					}).then(() => {
						var promises = []

						if (settings.firebase && settings.firebase.id) 
							promises.push(ctx.firebase.id(settings.firebase.id).catch(e => {
								console.error(e)

								return Promise.resolve('firebase.id error')
							}))

						if (settings.firebase && settings.firebase.key) 
							promises.push(ctx.firebase.key(settings.firebase.key).catch(e => {
								console.error(e)

								return Promise.resolve('firebase.key error')
							}))

						if (settings.ssl) 
							promises.push(ctx.ssl(settings.ssl).catch(e => {
								console.error(e)

								return Promise.resolve('ssl error')
							}))

						if (settings.ports) 
							promises.push(ctx.ports(settings.ports).catch(e => {
								console.error(e)

								return Promise.resolve('ports error')
							}))

						if (typeof settings.domain != 'undefined') 
							promises.push(ctx.domain(settings.domain).catch(e => {
								console.error(e)

								return Promise.resolve('domain error')
							}))

						if (typeof settings.enabled != 'undefined')  
							promises.push(ctx.enabled(settings.enabled).catch(e => {
								console.error(e)

								return Promise.resolve('enabled error')
							}))
							

						if(!promises.length) 
							return Promise.reject('nothingchanged')

						return Promise.all(promises)
					})

					

				},
				domain : function(domain){
					if (settings.server.domain != 'domain'){
						settings.server.domain = domain

						var prx = null

						return state.saverp().then(proxy => {
							
							prx = proxy
							return proxy.server.rews()

						}).then(r => {

							prx.nodeManager.reservice().catch(e => {})

							return Promise.resolve(r)
						})
					}

					return Promise.reject('nothingchanged') 
				},
				ports : function(httpsws){
	
					var ch = {
						https : false,
						wss : false
					}


					if(!httpsws.https) httpsws.https = settings.server.ports.https
					if(!httpsws.wss) httpsws.wss = settings.server.ports.wss
		
					return tcpPortUsed.check(Number(httpsws.https), '127.0.0.1').then(function(inUse) {
		
						ch.https = inUse
		
						return tcpPortUsed.check(Number(httpsws.wss), '127.0.0.1')
		
					}).then(function(inUse) {
		
						ch.wss = inUse
		
						return Promise.resolve()
		
					}).then(function(){
						if(!ch.https && !ch.wss){
		
							if(settings.server.ports.https == httpsws.https && settings.server.ports.wss == httpsws.wss){
								return Promise.reject('nothingchanged') 
							}
		
							settings.server.ports = {
								https : httpsws.https,
								wss  : httpsws.wss
							}
		
							var prx = null

							return state.saverp().then(proxy => {

								prx = proxy

								return proxy.server.rews()
							}).then(r => {

								prx.nodeManager.reservice().catch(e => {})

								return Promise.resolve(r)
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

					if(typeof v == 'undefined') return Promise.reject('emptyargs')
	
					if (settings.server.captcha == v) return Promise.resolve()
						settings.server.captcha = v
		
					return kit.save()
					
				},
	
				enabled : function(v){

					if(typeof v == 'undefined') return Promise.reject('emptyargs')
	
					if (settings.server.enabled == v) return Promise.resolve() 
						settings.server.enabled = v
		
						return state.saverp().then(proxy => {
							return proxy.server.rews()
						})
					
				},

				defaultssl : function(){
					settings.server.ssl = defaultSettings.server.ssl

					return kit.proxy().then(proxy => {

						return proxy.wss.sendtoall({
							type : 'proxy-settings-changed',
							data : {
								ssl : true
							}
						})

					}).then(r => {
						return state.saverp()
					}).then(proxy => {
						return proxy.server.rews()
					})

					

				},
	
				ssl : function(sslobj){
	
					if(sslobj.key && sslobj.cert && typeof sslobj.passphrase != 'undefined'){
		
						var d = {
							passphrase : sslobj.passphrase || '',
							name : sslobj.name || 'Default'
						}
	
						var keypath = 'cert/keyl.pem'
						var certpath = 'cert/certl.pem'

						sslobj.key = sslobj.key.split(',')[1]
						sslobj.cert = sslobj.cert.split(',')[1]
		
						return f.saveFile(keypath, Buffer.from(base64decode(sslobj.key), 'utf8')).then(() => {
							d.keypath = keypath
		
							return f.saveFile(certpath, Buffer.from(base64decode(sslobj.cert), 'utf8'))

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

						return state.saverp().then(proxy => {
							return proxy.firebase.re()
						})
						
					},

					key : function(fbkjsonfile){

						if(!fbkjsonfile) return Promise.reject('empty')
	
						var path = 'data/pocketnet-firebase-adminsdk.json'

						fbkjsonfile = fbkjsonfile.split(',')[1]
			
						return f.saveFile(path, Buffer.from(base64decode(fbkjsonfile), 'utf8')).then(() => {
			
							settings.firebase.key = path
			
							return state.saverp()
		
						}).then(proxy => {
							return proxy.firebase.re()
						})
						
					}
				}
			},
	
			wallet : {
				removeKey: function({key, privatekey}){

					if(!settings.wallet.addresses[key]) return Promise.reject('key')

					settings.wallet.addresses[key].privatekey = ''
					return state.saverp().then(proxy => {
						return proxy.wallet.removeKey(key)
					})

				},
				setkey : function({key, privatekey}){

					if(!settings.wallet.addresses[key]) return Promise.reject('key')

					if(settings.wallet.addresses[key].privatekey == privatekey) return Promise.resolve()

					settings.wallet.addresses[key].privatekey = privatekey

					return state.saverp().then(proxy => {
						return proxy.wallet.setPrivateKey(key, privatekey)
					})

				},


				setcheck : function({key, check}){

					if(!settings.wallet.addresses[key]) return Promise.reject('key')

					if(settings.wallet.addresses[key].check == check) return Promise.resolve()

					settings.wallet.addresses[key].check = check

					return state.saverp().then(proxy => {
						Promise.resolve()
					})

				},



			},

			emails :  function(transporter){

				if (transporter.emails){

					settings.emails = transporter.emails

					return state.saverp().then(proxy => {

						return Promise.resolve()

					})
				}
			},

			emailsresults : function({result}){

				var results = settings.emails.results

				if (!results || !results.length){
				
					results = [result];

				} else {

					results.push(result);

				}

				results = results.slice(results.length - 1000); 

				return state.saverp().then(proxy => {

					return Promise.resolve()

				})
			},
	
			node : {

				check : function(){
					return kit.proxy().then(proxy => {

						return proxy.nodeControl.check()

					}).then(r => {
						return Promise.resolve()
					})
				},
	
				enabled : function({enabled}){


					if(settings.node.enabled == enabled) return Promise.resolve()

					settings.node.enabled = enabled ? true : false
	
					return state.saverp().then(proxy => {

						proxy.nodeControl.enable(settings.node.enabled)

						return Promise.resolve(settings.node.enabled)

						
					})
					
				},
				defaultPaths : function({}){
					settings.node.binPath = ''
					settings.node.ndataPath = ''
					settings.node.enabled = false

					return state.saverp().then(proxy => {
						return proxy.nodeControl.re()
					})
				},
				binPath : function({binPath}){

					if(settings.node.binPath == binPath) return Promise.resolve()

					settings.node.binPath = binPath
					settings.node.enabled = false
	
					return state.saverp().then(proxy => {
	
						return proxy.nodeControl.re()
					})
					
				},
	
				ndataPath : function({ndataPath}){
					if(settings.node.ndataPath == ndataPath) return Promise.resolve()

					settings.node.ndataPath = ndataPath
					settings.node.enabled = false
	
					return state.saverp().then(proxy => {
						return proxy.nodeControl.re()
					})
					
				},
				
				stacking : {

					import : function({privatekey}){

						var r = null

						return kit.proxy().then(proxy => {

							r = proxy.nodeControl.request

							return proxy.nodeControl.request.getNodeAddresses()

						}).then(addresses => {


							return r.importPrivKey(privatekey)
						}).catch(e => {

							return Promise.reject(e)
						})

					},

					addresses : function(){

						return kit.proxy().then(proxy => {
							return proxy.nodeControl.request.getNodeAddresses()
						}).then(addresses => {
							return Promise.resolve(addresses)
						})

					}

				}
			},

			testkeys : {
				add : function({
					key
				}){

					if(!key) return Promise.reject("key")

					var kp = pocketnet.kit.keyPair(key)

					if(!kp) return Promise.reject("notvalidkey")

					if(_.indexOf(settings.testkeys, key) > -1){
						return Promise.resolve()
					}
	
					settings.testkeys.push(key)
	
					return state.save()
				},
	
				remove : function({
					index
				}){
	
					if (index < 0 || index > settings.testkeys.length - 1) return Promise.resolve()
	
					settings.testkeys.splice(index, 1)
	
					return state.save()
				}
			},
	
			admins : {
				add : function({
					address
				}){

					if(!address) return Promise.reject("address")

					if(!pocketnet.kit.address.validation(address)) return Promise.reject("notvalidaddress")


					if(_.indexOf(settings.admins, address) > -1){
						return Promise.resolve()
					}
	
					settings.admins.push(address)
	
					return state.save()
				},
	
				remove : function({
					address
				}){
	
					var i = _.indexOf(settings.admins, address)
	
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
			},

			testkey : function(index){
				return settings.testkeys[index]
			}
		},

		node : {
			install : function(message){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.install()
				}).then(r => {


					return Promise.resolve(r)
				})
			},

			delete : function({all}){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.delete(all)
				}).then(r => {

					return Promise.resolve(r)
				})
			},


			//// ?
			update : function(message){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.update()
				}).then(r => {

					return Promise.resolve(r)
				})
			},
			/*checkupdate : function(message){
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.checkupdate().then(update => {
						send(message.id, null, update)
					})
				})
			},*/
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
		},

		help : {
			commands : function(){

				var list = [];

				var rec = function(obj, key){

					if (typeof obj == 'function'){

						list.push(key)

					}
					else{
						_.each(obj, (obj, i) => {
							rec(obj, key ? key + '.' + i : i )
						})
					}

				}

				rec(kit.manage)

				return Promise.resolve(list.join("\n"))
			}
		},

		bots : {
			get : function(){
				return kit.proxy().then(proxy => {
					return Promise.resolve({
						bots : proxy.bots.get()
					})
				})
			},

			add: function({address}){
				return kit.proxy().then(proxy => {
					return proxy.bots.add(address)
				})
			},

			addlist : function({addresses}){
				return kit.proxy().then(proxy => {

					var promises = _.map(addresses, function(address){
						return proxy.bots.add(address)
					})

					return Promise.all(promises)
				})
			},

			remove: function({address}){
				return kit.proxy().then(proxy => {
					return proxy.bots.remove(address)
				})
			}
		},

		emails : {
			init : function(){
				return kit.proxy().then(proxy => {
					return Promise.resolve({
						emails : proxy.emails.init()
					})
				})
			},

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
	
	startproxy : function(hck){

		if(!proxy){
            
			proxy = new Proxy(settings, kit.manage, test)

			if (hck.userDataPath){
				proxy.userDataPath = hck.userDataPath
			}
			
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

				kit.startproxy(hck).then(r => {

					return kit.proxy()
					
				}).then(proxy => {

					if (hck.wssdummy){
						proxy.wss.wssdummy(hck.wssdummy)
					}

					

					resolve()

				}).catch(e => {
                    console.log(e)
					reject(e)
				})
			}

			db.loadDatabase(function(err) {   

		
				if(!err){
					db.find({ nedbkey : nedbkey }).exec(function (err, docs) {
			
						var savedSettings = !err? docs[0] || {} : {}
			
						state.apply(state.expand(savedSettings, settings))

						state.save()
			
						start()
					});
				}
			
				else{
					state.apply(state.expand({}, settings))

					state.save()

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

	destroyhard : function(){

		return kit.manage.proxy.detach().then(r => {
			return this.destroy()
		})
		
	},

	candestroy : function(){
		return kit.proxy().then(proxy => {
			return proxy.kit.candestroy()
		})
	},

	
}





module.exports = kit

