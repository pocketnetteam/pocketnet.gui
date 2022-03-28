
var _ = require('lodash')
var fs = require('fs');
var path = require('path');

const { performance } = require('perf_hooks');
////////////
var f = require('./functions');
var svgCaptcha = require('svg-captcha');
/*
var WSS = require('./wss.js');
const Firebase = require('../proxy/firebase');
*/
var os = require('os');
var Server = require('./server/https.js');
var WSS = require('./server/wss.js');
var Firebase = require('./server/firebase.js');
var NodeControl = require('./node/control.js');
var NodeManager = require('./node/manager.js');
var Pocketnet = require('./pocketnet.js');
var Wallet = require('./wallet/wallet.js');
var Remote = require('./remotelight.js');
var Proxies = require('./proxies.js');
var Exchanges = require('./exchanges.js');
var Peertube = require('./peertube/index.js');
var Bots = require('./bots.js');
var SystemNotify = require('./systemnotify.js');

process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//////////////
/*
if (process.platform === 'win32') expectedExitCodes = [3221225477];

console.log('expectedExitCodes' , expectedExitCodes)*/

var Proxy = function (settings, manage, test, logger) {

	var self = this;

		self.test = test
	var server = new Server(settings.server, settings.admins, manage);
	var wss = new WSS(settings.admins, manage);
	var pocketnet = new Pocketnet();
	var nodeControl = new NodeControl(settings.node);
	var nodeManager = new NodeManager(settings.nodes);
	var firebase = new Firebase(settings.firebase);
	var wallet = new Wallet(settings.wallet);
	var remote = new Remote();
	var proxies = new Proxies(settings.proxies)
	var exchanges = new Exchanges()
	var peertube = new Peertube()
	var bots = new Bots(settings.bots)
	var systemnotify = new SystemNotify(settings.systemnotify)

	var dump = {}

	self.userDataPath = null
	self.session = 'pocketnetproxy' //f.makeid()

	logger.setapp(self)

	f.mix({
		wss, server, pocketnet, nodeControl,
		remote, firebase, nodeManager, wallet,
		proxies, exchanges, peertube, bots,
		systemnotify,
		logger,
		proxy: self
	})


	var stats = [];
	var statcount = 100;
	var statInterval = null;

	var captchas = {};
	var captchaip = {};

	var addStats = function () {

		var data = {
			time: f.now(),
			info: self.kit.info(true)
		}

		stats.push(data)

		var d = stats.length - statcount

		if (statcount / d > 10) {
			stats = stats.slice(d)
		}
	}

	var getStats = function (n) {

		if (n) {
			return f.lastelements(stats, 500)
		}

		return stats
	}

	var ini = {
		ssl: function (def) {
			var s = settings.server.ssl || {}
			var sslsettings = {}

			sslsettings.key = s.keypath || s.key
			sslsettings.cert = s.certpath || s.cert
			sslsettings.passphrase = s.passphrase


			////default
			if (def){
				sslsettings.key = s.key
				sslsettings.cert = s.cert
				sslsettings.passphrase = 'password'
			}

			var options = {};

			if (!sslsettings.key || !sslsettings.cert || typeof sslsettings.passphrase == 'undefined') return {

			}

			try {
				options = {
					key: fs.readFileSync(f.path(sslsettings.key)),
					cert: fs.readFileSync(f.path(sslsettings.cert)),
					passphrase: sslsettings.passphrase || ''
				}
			}
			catch (e) {
				options = {}
			}

			return options;

		}
	}

	self.authorization = {

		dummy: function () {
			return true
		},

	

		parsesignature : function(nonce){
			var ch = nonce.split(',')
			var obj = {}

			_.each(ch, function(p){
				var ch2 = p.split('=')

				if(!ch2[1] || !ch2[0]) return

				obj[ch2[0]] = ch2[1]
			})

			return obj
		},

		signatureid : function(signature){
			if (signature.v){
				var sn = this.parsesignature(signature.nonce)

				if(!sn.date || !sn.exp || !sn.s) return false

				if(f.now().getTime() > f.date.addseconds(new Date(Number(sn.date)), sn.exp).getTime()){
					return false
				}
				
				var s = f.hexDecode(sn.s)

				if (s != self.session) return false
			}

			return true
		},

		signature: function (data) {

			delete data.A
			delete data.U

			if (data.signature) {

				if(!self.authorization.signatureid(data.signature)) return false

				var authorized = self.pocketnet.kit.authorization.signature(data.signature)

				if (authorized) {

					data.U = data.signature.address

					if (_.indexOf(settings.admins, data.U) > -1 && data.signature.v) data.A = true

					return true
				}
			}

			return false


		},

		signaturelight: function (data) {

			delete data.A
			delete data.U

			if (data.signature) {

				if(!self.authorization.signatureid(data.signature)) return false

				var authorized = self.pocketnet.kit.authorization.signature(data.signature)

				if (authorized) {

					data.U = data.signature.address

					if (_.indexOf(settings.admins, data.U) > -1) data.A = true

					return true
				}
			}

			return true


		}
	}


	self.users = function () {

		var i = {
			wss: self.wss.info(true)
		}

		var count = Math.max(f.deep(i, 'wss.users') || 1)

		if (count < 1) count = 1

		return count

	}

	self.server = {

		init: function () {

			if (settings.server.enabled) {

				return server.init({

					ssl: ini.ssl(),
					port: f.deep(settings, 'server.ports.https')

				}).catch(e => {

					logger.w('system', 'warn', 'SSL Settings Error', e)

				
					return server.init({
						ssl: ini.ssl('default'),
						port: f.deep(settings, 'server.ports.https')
					})

				})

			}

			return Promise.resolve()

		},

		destroy: function () {
			return server.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		rews: function () {
			return self.server.re().then(r => {
				return self.wss.re()
			}).then(r => {

				return self.firebase.re()

			}).catch(e => {

				return Promise.reject(e)
			})
		},

		info: function (compact) {
			return server.info(compact)
		},

		get export() {
			return server.export()
		},

	}

	self.bots = {
		add: function (address) {
			return bots.add(address)
		},
		remove: function (address) {
			return bots.remove(address)
		},
		get: function () {
			return bots.get()
		},
		init: function () {
			return bots.init()
		}
	}


	self.wallet = {

		testkey: function (i) {
			return manage.get.testkey(i)
		},

		events: function () {
			wallet.clbks.error.queue.main = function (e, p) {
			}

			wallet.clbks.error.ini.main = function (e, p) {
			}
		},

		init: function () {
			return wallet.init()
		},

		inited: function () {
			return wallet.init()
		},

		addqueue: function (key, address, ip) {
			return wallet.kit.addqueue(key, address, ip)
		},


		destroy: function () {
			return wallet.destroy()
		},
		removeKey: function (key) {
			return wallet.kit.removeKey(key)
		},
		setPrivateKey: function (key, private) {
			return wallet.kit.setPrivateKey(key, private)
		},

		clearexecuting: function () {
			return wallet.kit.clearexecuting()
		},

		apply: function (key) {
			return wallet.kit.apply(key)
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		info: function () {
			return wallet.info()
		},


		sendwithprivatekey: function ({ address, amount, key }) {
			return wallet.kit.sendwithprivatekey(address, amount, key)
		}
	}

	

	self.systemnotify = {

		init: function () {

			if (!settings.systemnotify) return Promise.reject('settings.systemnotify')

			return systemnotify.init(settings.systemnotify.bot).then(r => {
				return systemnotify.setparameters(settings.systemnotify.parameters)
			})

		},

		destroy: function () {
			return systemnotify.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		info: function (compact) {
			return systemnotify.info(compact)
		}
	}

	self.wss = {

		init: function () {

			if (settings.server.enabled) {

				return wss.init({
					ssl: ini.ssl(),
					port: f.deep(settings, 'server.ports.wss')
				})

			}

			return Promise.resolve()
		},

		sendtoall: function (message) {
			return wss.sendtoall(message)
		},

		destroy: function () {
			return wss.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		info: function (compact) {
			return wss.info(compact)
		},

		wssdummy: function (wssdummy) {
			wss.wssdummy(wssdummy)
		},

		sendlogs: function(d){
			wss.sendlogs(d)
		},

		closeall : function(){
			var e = wss.closeall()

			if (e){
				return Promise.reject(e)
			}

			return Promise.resolve('success')
		}
	}

	self.nodeControl = {

		enable: function (v) {
			return nodeControl.kit.enable(v)
		},

		init: function () {
			return nodeControl.init()
		},

		destroy: function () {
			return nodeControl.destroy()
		},

		start: function () {
			return nodeControl.kit.start()
		},

		stop: function () {
			return nodeControl.kit.stop()
		},

		check: function () {
			return nodeControl.kit.check()
		},

		canstop: function () {
			return nodeControl.kit.canstop()
		},

		detach: function () {
			return nodeControl.kit.detach()
		},

		re: function () {
			return this.destroy().then(r => {
				return this.init()
			})
		},

		get request() {
			return nodeControl.request
		},

		get kit() {
			return nodeControl.kit
		},

		info: function () {
			return nodeControl.info()
		},


	}
	///
	self.nodeManager = {
		init: function () {
			return nodeManager.init()
		},

		inited: function () {
			return nodeManager.info().inited
		},

		destroy: function () {
			return nodeManager.destroy()
		},

		reservice: function () {
			return nodeManager.reservice()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},
		info: function (compact) {
			return nodeManager.info(compact)
		},

		chain : function(){
			return nodeManager.currentChainCommon2()
		}
	}

	self.firebase = {
		init: function () {

			return firebase.init(settings.firebase)
		},

		destroy: function () {
			return firebase.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		info: function (compact) {
			return firebase.info(compact)
		},

		get kit() {
			return firebase.kit
		},
	}

	self.exchanges = {
		init: function () {
			return exchanges.init()
		},

		destroy: function () {
			return exchanges.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		get kit() {
			return exchanges.kit
		},
	}


	self.peertube = {
		init: function () {
			var ins = {
				1: [
				  { host: 'pocketnetpeertube1.nohost.me', ip: '188.0.15.28' },
				  { host: 'pocketnetpeertube2.nohost.me', ip: '94.73.223.24' },
				],
				5: [
				  {
					host: 'pocketnetpeertube5.nohost.me',
					cantuploading: true,
					ip: '95.217.209.217',
				  },
				  {
					host: 'pocketnetpeertube7.nohost.me',
					cantuploading: true,
					ip: '188.187.45.218',
				  },
				],
				6: [
				  {
					host: 'pocketnetpeertube4.nohost.me',
					cantuploading: true,
					ip: '135.181.108.193',
				  },
				  {
					host: 'pocketnetpeertube6.nohost.me',
					cantuploading: true,
					ip: '159.69.127.9',
				  },
				],
				8: [
				  {
					host: 'pocketnetpeertube8.nohost.me',
					cantuploading: true,
					ip: '192.236.161.131',
				  },
				  {
					host: 'pocketnetpeertube9.nohost.me',
					cantuploading: true,
					ip: '178.154.200.50',
				  },
				],
		
				10: [
				  {
					host: 'pocketnetpeertube10.nohost.me',
					cantuploading: true,
					ip: '23.254.226.253',
				  },
				  {
					host: 'pocketnetpeertube11.nohost.me',
					cantuploading: true,
					ip: '84.252.138.108',
				  },
				],
		
				12: [
				  {
					host: 'bastyonmma.pocketnet.app',
					cantuploading: true,
					ip: '88.99.34.74',
				  },
				  {
					host: 'bastyonmma.nohost.me',
					cantuploading: true,
					ip: '49.12.231.72',
				  },
				],
		
				13: [
				  { host: '01rus.nohost.me', ip: '178.217.159.227' },
				  { host: '02rus.pocketnet.app', ip: '31.184.215.67' },
				],
		
				14: [
				  { host: 'pocketnetpeertube12.nohost.me', ip: '104.168.248.113' },
				  { host: 'pocketnetpeertube13.nohost.me', ip: '62.84.115.93' },
				],

				15: [
					{
						host: 'peertube14.pocketnet.app',
						ip: '178.154.251.235',
					},
					{
						host: 'peertube15.pocketnet.app',
						ip: '192.236.199.174',
					},
				],

				16: [
					{
						host : 'poketnetpeertube.space',
						cantuploading: true,
						ip: '178.217.155.168',
					},
					{
						host : 'poketnetpeertube.ru',
						cantuploading: true,
						ip: '178.217.159.224',
					}
				],

				17: [
					{
						host : 'bastynode.ru',
						//cantuploading: true,
						ip: '81.23.152.91',
					},
					{
						host : 'storemi.ru',
						//cantuploading: true,
						ip: '93.100.117.108',
					},
				],

				18: [
					{
						host : 'bastynode1.ru',
						cantuploading: true,
						ip: '81.23.151.94',
					},
					{
						host : 'gf110.ru',
						cantuploading: true,
						ip: '46.175.123.16',
					},
				],

				19: [
					{
						host : 'bastyonpeertube.ru',
						cantuploading: true,
						ip: '178.217.155.169',
					},
					{
						host : 'bastyonpeertube.site',
						cantuploading: true,
						ip: '178.217.155.170',
					},
					
				],

				20: [
					{
						host : 'peertube17.pocketnet.app',
						ip: '51.250.104.218',
					}
				],
				
				21: [
					{
						host : 'peertube18.pocketnet.app',
						ip: '51.250.41.252',
					}
				],
				
				22: [
					{
						host : 'peertube19.pocketnet.app',
						ip: '51.250.73.97',
					}
				],
      		};

			if (test){
				ins = {0 : [
					{ host: 'test.peertube.pocketnet.app', ip: '65.108.83.132' },
					{ host: 'test.peertube2.pocketnet.app', ip: '95.216.212.153' },
				]}
			}

			return peertube.init({
				roys : ins
			})
		},

		destroy: function () {
			return peertube.destroy()
		},

		re: function () {
			return this.destroy().then(r => {
				this.init()
			})
		},

		info: function (compact) {
			return peertube.info(compact)
		},

		get kit() {
			return peertube.kit
		},
	}

	self.kit = {

		service: function () {
			var w = self.wss.info(true)
			var s = self.server.info(true)

			var service = {
				addr: 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq',
			}

			/*if (s.listening && w.listening && settings.server.domain){ 
				service.mainport = Number(s.listening)
				service.wssport = Number(w.listening)
				service.service = true
				service.addr = settings.server.domain
	  
			}*/

			return service
		},
		stats: function (n) {
			return getStats(n)
		},
		info: function (compact) {

			var mem = process.memoryUsage()
			
			var loads = os.loadavg();

			_.each(mem, function (v, i) {
				mem[i] = v / (1024 * 1024)
			})

			return {
				status: status,
				test : self.test,
				
				nodeManager: self.nodeManager.info(compact),
				nodeControl: self.nodeControl.info(compact),
				firebase: self.firebase.info(compact),
				server: self.server.info(compact),
				wss: self.wss.info(compact),
				wallet: self.wallet.info(compact),
				remote: remote.info(compact),
				admins: settings.admins,
				peertube : self.peertube.info(compact),
				captcha: {
					ip: _.toArray(captchaip).length,
					all: _.toArray(captchas).length
				},

				memory: mem,
				loadavg : {
					'1' : loads[0],
					'5' : loads[1],
					'15' : loads[2]
				}
			}
		},

		initlist: function (list) {
			var catchError = function (key) {
				return (e) => {

					return Promise.resolve()
				}
			}

			var promises = _.map(list, (i) => {
				return self[i].init().catch(catchError(i)).then(() => {
					return Promise.resolve()
				})
			})

			return Promise.all(promises)
		},

		sinit: function () {
			var wrks = []

			if (!self.nodeManager.inited()) wrks.push('nodeManager')
			if (!self.wallet.inited()) wrks.push('wallet')

			if (!wrks.length) {
				return Promise.resolve({})
			}
			else {
				return self.kit.initlist(wrks).then(r => {

					return Promise.resolve({
						refresh: true
					})
				})
			}
		},

		init: function () {

			status = 1

			return this.initlist(['server', 'wss', 'nodeManager', 'wallet', 'firebase', 'nodeControl', 'exchanges', 'peertube', 'bots']).then(r => {

				status = 2

				if (!statInterval)
					statInterval = setInterval(addStats, 30000)

				return Promise.resolve()
			})

		},

		candestroy: function () {

			var cantstopped = []

			var promises = _.map(['nodeControl'], (i) => {
				return self[i].canstop().catch(e => {

					cantstopped.push(i)

					return Promise.resolve()
				})
			})

			return Promise.all(promises).catch(e => { return Promise.resolve(); }).then(r => {
				return Promise.resolve(cantstopped)
			})
		},

		destroy: function () {

			if (statInterval) {
				clearInterval(statInterval)
				statInterval = null
			}

			var catchError = function (key) {
				return (e) => {

					logger.w('system', 'error', 'Proxy '+key+' Error', e)

					return Promise.resolve()
				}
			}

			var promises = _.map(['server', 'wss', 'nodeManager', 'wallet', 'firebase', 'nodeControl', 'exchanges', 'peertube', 'bots'], (i) => {
				return self[i].destroy().catch(catchError(i)).then(() => {
					return Promise.resolve()
				})
			})

			return Promise.all(promises).then(r => {
				status = 0
				return Promise.resolve()
			}).catch(e => {
				return Promise.resolve()
			})

		},

		safedestroy: function () {
			return self.kit.candestroy().then(rs => {

				if (rs.length) {

					console.clear()
					console.log("Do you want to detach: " + rs.join(', ') + "?")

					return Promise.reject('detach')
				}

				return Promise.resolve()

			})
		},

		detach: function (modules) {

			if (!modules) modules = ['nodeControl']

			var promises = _.map(modules, (i) => {
				return self[i].detach().catch(e => {
					return Promise.resolve()
				})
			})

			return Promise.all(promises).catch(e => { return Promise.resolve(); }).then(r => {
				return Promise.resolve()
			})
		}
	}

	self.apibypath = function (path) {
		var result = null


		_.find(self.api, function (pack) {
			return _.find(pack, function (object) {

				if (object.path == path) {

					result = object

					return true
				}

			})
		})

		return result
	}

	self.rpcscenarios = {
		'gethierarchicalstrip' : function({ method, parameters, options, U }){
			var rpc = self.api.node.rpc.action
			var videosapi = self.api.peertube.videos.action


			var users = []
			var videos = []

			var result = null

			return rpc({ method, parameters, options, U }).then(r => {


				var posts = r.data.contents || []

					result = r

				var withvideos = _.filter(posts, p => {
					return p.type == 'video' && p.u
				})

				videos = _.map(withvideos, function(p){
					return decodeURIComponent(p.u)
				})

				users = _.map(posts, function(p){
					return f.deep(p, 'lastComment.address') 
				})

				users = _.filter(users, u => {return u && !_.find(posts, function(p){
					return p.address == u
				})})

				return Promise.resolve()

			}).then(() => {

				var userPr = rpc({
					method : 'getuserprofile',
					parameters : [users, '1'],
					options, U
				}).then(users => {


					result.data.users = users.data

					return Promise.resolve()
				})

				var videosPr = videosapi({
					urls : videos,
					fast : true
				}).then(videos => {


					result.data.videos = videos.data

					return Promise.resolve()
				}).catch(e => {
					return Promise.resolve()
				})

				users = null
				videos = null

				return Promise.all([userPr, videosPr])

			}).then(videos => {

				return Promise.resolve(result)
			}).catch(e => {

				return Promise.reject(e)
			})
		}
	}

	self.api = {
		node: {
			rpcex : {
				path: '/rpc-ex/*',
				authorization: 'signaturelight',
				action: function ({ method, parameters, options, U }) {
					if (!method) {
						return Promise.reject({
							error: 'method',
							code: 400,
						});
					}

					

					if(!self.rpcscenarios[method]){
						return self.api.node.rpc.action({ method, parameters, options, U })
					}

					return self.rpcscenarios[method]({ method, parameters, options, U })
					
				},
			},
			rpc: {
				path: '/rpc/*',
				authorization: 'signaturelight',
				action: function ({ method, parameters, options, U, cachehash, internal }, request) {
					if (!method) {
						return Promise.reject({
							error: 'method',
							code: 400,
						});
					}

					if (!options) options = {};
					if (!parameters) parameters = [];

					var node = null;
					var noderating = 0
					var timep = performance.now()

					var time = {
						preparing : 0,
						cache : 0,
						start : 0,
						ready : 0,
						
					}

					var _waitstatus = 'un'
					var direct = true
					var smartresult = null

					var cparameters = _.clone(parameters)

					self.logger.w('rpc', 'debug', 'RPC REQUEST')

				

					return new Promise((resolve, reject) => {

						if((options.locally && options.meta)){
							resolve()

							return
						}

						return nodeManager.waitreadywithrating().then(resolve).catch(reject)
						
					}).then(() => {

						self.logger.w('rpc', 'debug', 'AFTER WAITING NODEMANAGER')

						time.preparing = performance.now() - timep

						/// ????
						if (options.locally && options.meta) {
							node = nodeManager.temp(options.meta);
						}

						if (options.node) {
							node = nodeManager.nodesmap[options.node];

							if (node) 
								direct = false
						}

						if (!node || options.auto){

							node = nodeManager.selectProbability();

							if(!node && nodeManager) 
								node = nodeManager.nodesmap[nodeManager.bestnode]

							direct = false
						}
						
						if (!node) {
							return Promise.reject({
								error: 'node',
								code: 502,
							});
						}

						if(method == 'getnodeinfo') {
							cparameters.push(node.key)
							cachehash = null
						}

						noderating = node.statistic.rating()

						return new Promise((resolve, reject) => {

							self.logger.w('rpc', 'debug', 'BEFORE CACHE')
							
							if(!noderating) {
								
								resolve('nocaching')

								return
							}

							server.cache.wait(method, cparameters, function (waitstatus, smartdata) {

								if (waitstatus == 'smart'){
									smartresult = smartdata
								}
								

								resolve(waitstatus);

							}, cachehash);

						})

					})
					.then((waitstatus) => {

						self.logger.w('rpc', 'debug', 'AFTER CACHE:' + waitstatus)

						time.cache = performance.now() - timep

						_waitstatus = waitstatus

						if (waitstatus == 'smart' && smartresult){
			
							return Promise.resolve({
								data: smartresult,
								code: 207,
								time : time
							});
						}

						var cached = server.cache.get(method, cparameters, cachehash);


						if (typeof cached != 'undefined') {
							return Promise.resolve({
								data: cached,
								code: 208,
								time : time
							});
						}

						if(waitstatus == 'attemps'){
							return Promise.reject({
								code: 408,
								time : time
							});
						}

						if (method == 'sendrawtransactionwithmessage') {
							if (!bots.check(U)) {
								return new Promise((resolve, reject) => {
									setTimeout(function () {
										resolve({
											data: '319f9e3f40e7f82ee7d32224fe2f7c1247f7f8f390930574b8c627d0fed3c312',
											code: 200,
											node: node.exportsafe(),
										});
									}, f.rand(120, 1000));
								});
							}
						}

						self.logger.w('rpc', 'debug', 'BEFORE QUEUE')

						return new Promise((resolve, reject) => {

							time.start = performance.now() - timep
							time.node = {
								b : timep
							}

							self.logger.w('rpc', 'debug', 'ADD TO QUEUE')
							
							nodeManager.queue(node, method, parameters, direct, {resolve, reject}, time.node)
								
						})

						.then((data) => {

							if (noderating){
								server.cache.set(method, cparameters, data, node.height());
							}

							//console.log("SUCCESS", method)

							time.ready = performance.now() - timep

							if(time.node) delete time.node.b

							return Promise.resolve({
								data: data,
								code: 200,
								node: node.exportsafe(),
								time : time
							});
						});
					})
					.catch((e) => {

						//console.log("E", e, method)

						if (_waitstatus == 'execute'){
							server.cache.remove(method, cparameters);
						}

						return Promise.reject({
							error: e,
							code: e.code,
							node: node ? node.export() : null,
						});
					});
				},
			},
		},

		nodeManager: {
			pendingstatus: {
				path: '/nodes/pendingstatus',
				action: function () {

					var data = nodeManager.pendingstatus()

					return Promise.resolve({ data });

				},
			},

			clearnodesstats : {
				path: '/nodes/clearnodesstats',
				authorization: 'signature',
				action: function ({ A }) {

					if(!A) return Promise.reject('none')

					nodeManager.api.clearAlltimeNodesStats()

					return Promise.resolve({ data: 'success' });

				},
			},
		
			revoke: {
				path: '/nodes/revoke',
				authorization: 'signature',
				action: function ({ node, A }) {
					return nodeManager.revoke(node, A).then((r) => {
						return Promise.resolve({ data: r });
					});
				},
			},
			update: {
				path: '/nodes/update',
				authorization: 'signature',
				action: function ({ node, A }) {
					return nodeManager.update(node, A).then((r) => {
						return Promise.resolve({ data: r });
					});
				},
			},

			create: {
				path: '/nodes/update',
				authorization: 'signature',
				action: function ({ node, A, U }) {
					node.addedby = U;

					return nodeManager.create(node).then((r) => {
						return Promise.resolve({ data: r });
					});
				},
			},

			canchange: {
				path: '/nodes/canchange',
				action: function ({ node }) {
					var _node = nodeManager.nodesmap[node];

					if (!_node) {
						var nnode = nodeManager.selectProbability();

						if (nnode)
							return Promise.resolve({
								node: nnode.exportsafe(),
							});

						else 
							return Promise.reject('none');
					}

					var nnode = _node.changeNodeUser(null, _node.needToChange());

					if (!nnode) {
						return Promise.resolve({});
					}

					return Promise.resolve({
						data: {
							node: nnode.exportsafe(),
						},
					});
				},
			},

			addfromtemp: {
				path: '/nodes/addfromtemp',
				authorization: 'signature',
				action: function ({ keynode , A }) {

					if (!A) return Promise.reject('admin');

					return nodeManager.addfromtemp(keynode)

						.then((node) => {

							return Promise.resolve({
								data: {
									node: node.exportsafe(),
								},
							});
						})
						.catch((e) => {
							//console.log("e", e)
							return Promise.reject(e);
						});
				},
			},

			select: {
				path: '/nodes/select',
				action: function ({ fixed }) {
					return nodeManager
						.waitbest(10000)
						.then((r) => {

							var node = null;

							if (fixed && fixed != 'null') {
								node = nodeManager.select(fixed);
							}

							if (!node)
								node =
									nodeManager.selectProbability() ||
									nodeManager.selectbest() ||
									nodeManager.select();

							if (!node) {
								return Promise.reject('cantselect');
							}

							return Promise.resolve({
								data: {
									node: node.exportsafe(),
								},
							});
						})
						.catch((e) => {
							return Promise.reject(e);
						});
				},
			},

			test: {
				path: '/nodes/test',
				authorization: 'signature',
				action: function ({ node, scenario, A }) {

					if (!test) return Promise.reject('err');

					if (!A) return Promise.reject('admin');

					var _node = nodeManager.nodesmap[node];

					if (!_node) {
						return Promise.reject('cantselect');
					}

					return _node.test(scenario).then(r => {
						return Promise.resolve({
							data: {
								success: true,
							},
						});
					}).catch(e => {

						return Promise.reject('err')
					})

				},
			},

			extendedstats: {
				path: '/nodes/extendedstats',
				action: function () {

					var data = nodeManager.extendedStats()

					return Promise.resolve({
						data: data,
					}).catch(e => {

						return Promise.reject(e)
					});
				},
			},

			get: {
				path: '/nodes/get',
				action: function () {
					return Promise.resolve({
						data: {
							nodes: nodeManager.getnodes(),
						},
					});
				},
			},

			chain : {
				path: '/nodes/chain',
				action: function () {
					return Promise.resolve({
						data: {
							chain: self.nodeManager.chain(),
						},
					});
				},
			},
		},

		remote: {
			bitchute: {
				path: '/bitchute',
				action: function ({ url }) {


					return Promise.reject({
						error : 'deprecated'
					})

				},
			},

			url: {
				path: '/url',
				action: function ({ url }) {

					return Promise.reject({
						error : 'deprecated'
					})

				},
			},

			urlPreview: {
				path: '/urlPreview',
				action: function ({ url }) {
					return new Promise((resolve, reject) => {
						remote.nmake(url, function (err, data) {
							if (!err) {
								resolve({
									data: {
										og: data,
									},
								});
							} else {
								reject(err);
							}
						});
					});
				},
			},

			urlPreviewFormatted: {
				path: '/urlPreviewFormatted',
				
				action: function ({ url }) {

					return new Promise((resolve, reject) => {

						remote.nmake(url, function (err, data) {

							if (!err) {

								resolve({

									data : {
										"success" : 1,
										"meta": {
											"title" : data.title || data.site_name,
											"description" : data.description,
											"image" : {
												"url" : data.image
											}
										}
									}

								});

							} else {
								reject(err);
							}
						});
					});

				},
			}
		},

		common: {
			/*use : {
					path : '/use',
					action : function(){
						return self.kit.sinit()
					}
				},*/
			info: {
				path: '/info',
				action: function (message) {
					return Promise.resolve({
						data: {
							info: self.kit.info(true),
						},
					});
				},
			},
			logs: {
				path: '/logs',
				/*authorization: 'signature',*/
				action: function (message) {

					/*if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });*/

					var data = {
						logs: server.middle.getlogs()
					};

					return Promise.resolve({ data });
				},
			},
			heapdump: {
				path: '/heapdump',
				authorization: 'signature',
				action: function (message) {

					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });
						
					var dumpdata = _.clone(dump)

					if (dump.stared){
						return Promise.resolve({
							message : "started yet",
							data : dump
						})
					}

					if (dump.error){

						dump = {}

						return Promise.resolve({
							status : "dump error / refresh for start new dump",
							data : dumpdata
						})
					}

					if (dump.success){

						dump = {}

						return Promise.resolve({
							status : "dump success / refresh for start new dump",
							data : dumpdata
						})
					}

					logger.w('system', 'info', 'Heapdump start')

					var filename = f.path('heapdump/' + Date.now() + '.heapsnapshot')
					var heapdump = require('heapdump');

					dump.filename = filename
					dump.stared = Date.now()

					try{

						remote.clear()
						server.cache.clear()

						f.createfolder(filename)

						heapdump.writeSnapshot(filename, function(err, filename) {

							dump._started = dump.stared
							dump.end = Date.now()
							dump.name = filename
	
							delete dump.stared
	
							if (err){
	
								dump.error = err.toString ? err.toString() : err
	
								logger.w('system', 'error', 'Dump Error', dump.error)
							}
							else{

								logger.w('system', 'info', 'Dump written to ' + filename)

								dump.success = true
							}
							
						});

						return Promise.resolve('started');
					}
					catch(err){	

						logger.w('system', 'error', 'Dump Error', err)

						return Promise.reject({
							result : 'error',
							error :  err.toString ? err.toString() : err
						});
					}
					

					
				},
			},

			clearlogs : {
				path: '/clearlogs',
				authorization: 'signature',
				action: function (message) {

					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });
						
						server.middle.clear()

					return Promise.resolve('success');
					
				},
			},

			wsscloseall : {
				path: '/closeallwss',
				authorization: 'signature',
				action: function (message) {

					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });
						
					return self.wss.closeall()
					
				},
			},

			clearcache: {
				path: '/clearcache',
				authorization: 'signature',
				action: function (message) {

					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });
						
						server.cache.clear()

					return Promise.resolve('success');
					
				},
			},

			clearrmt: {
				path: '/clearrmt',
				authorization: 'signature',
				action: function (message) {

					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });
						
						remote.clear()

					return Promise.resolve('success');
					
				},
			},

			stats: {
				path: '/stats',
				action: function () {
					return Promise.resolve({
						data: {
							stats: self.kit.stats(500),
						},
					});
				},
			},
			ping: {
				path: '/ping',
				action: function () {
					var node = nodeManager.bestnode

					/*if (nodeManager.bestnodes.length){
						node = nodeManager.bestnodes[f.rand(0, nodeManager.bestnodes.length - 1)]
					}*/
	
					return Promise.resolve({
						data: {
							time: f.now(),
							session : self.session,
							v : '0807',
							node : node || ''
						},
					});
				},
			},

			nodes: {
				path: '/nodes',
				action: function () {
					return Promise.resolve({
						data: {
							stats: nodeManager.info(),
						},
					});
				},
			},
		},

		firebase: {
			set: {
				authorization: 'signature',
				path: '/firebase/set',
				action: function (data) {
					return self.firebase.kit.addToken(data).then((r) => {
						return Promise.resolve({ data: r });
					}).catch(e => {
						console.error(e)

						return Promise.reject(e)
					})
				},
			},

			test: {
				path: '/firebase/test',
				action: function (data) {

					var _data = {
						addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
						addrFrom: "PJorG1HMRegp3SiLAFVp8R5Ef6d3nSrNxA",
						mesType: "upvoteShare",
						msg: "event",
						node: "51.174.99.18:38081:8087",
						posttxid: "12d6425dc5d23c0a4b28cc3605e95d7edaeae1e321ce835d29c89f30aa340cf0",
						time: '1625658811',
						txid: "af5a60167933ab5194bdbc0b08404cb20c0b40aa546f60e21f0d9f955f99ae22",
						upvoteVal: "5"
					}

					return firebase.sendToDevice(_data, 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM').catch(e => {
						console.error(e)

						return Promise.reject(e)
					})

				},
			},

			revokedevice: {
				path: '/firebase/revoke',
				action: function (data) {
					return self.firebase.kit.revokeToken(data).then((r) => {
						return Promise.resolve({ data: r });
					}).catch(e => {
						console.error(e)

						return Promise.reject(e)
					});
				},
			},

			revokedevice: {
				path: '/firebase/revokedevice',
				action: function (data) {
					return self.firebase.kit.removeDevice(data).then((r) => {
						return Promise.resolve({ data: r });
					}).catch(e => {
						console.error(e)

						return Promise.reject(e)
					});
				},
			},

			info: {
				path: '/firebase/info',
				action: function (data) {
					
					return self.firebase.kit.info({}).then((r) => {
						return Promise.resolve({ data: r });
					});
				},
			},

			mytokens: {
				authorization: 'signature',
				path: '/firebase/mytokens',
				action: function (data) {

					
					return self.firebase.kit.mytokens({address : data.U}).then((r) => {
						return Promise.resolve({ data: r });
					});
				},
			},
		},

		exchanges: {
			history: {
				path: '/exchanges/history',
				action: function () {
					return self.exchanges.kit.get.history().then((d) => {
						return Promise.resolve({
							data: d,
						});
					});
				},
			},
		},

		peertube: {
			
		},

		captcha: {
			get: {
				authorization: 'signaturelight',
				path: '/captcha',

				action: function ({ captcha, ip }) {
					if (captcha && captchas[captcha] && captchas[captcha].done) {
						return Promise.resolve({
							data: {
								id: captchas[captcha].id,
								done: true,
								result: captchas[captcha].text,
							},
						});
					}

					captchaip[ip] || (captchaip[ip] = 0);
					captchaip[ip]++;

					var captcha = svgCaptcha.create({
						size: 4,
						noise: 12,
						color: false,
						ignoreChars: '0o1liy',
						width: 250,
					});

					captcha.id = f.makeid();

					captchas[captcha.id] = {
						text: captcha.text.toLocaleLowerCase(),
						id: captcha.id,
						done: false,
						time: f.now(),
					};

					return Promise.resolve({
						data: {
							id: captcha.id,
							img: captcha.data,
							result: self.test ? captcha.text : null, ///
							done: false,
						},
					});
				},
			},

			make: {
				authorization: 'signaturelight',
				path: '/makecaptcha',

				action: function ({ captcha, ip, text }) {

					var _captcha = captcha

					var captcha = captchas[captcha];

					if (!captcha) {
						return Promise.reject('captchanotexist');
					}

					if (captcha.done) {
						return Promise.resolve({
							data: {
								id: captcha.id,
								done: true,
							},
						});
					}

					if (captcha.text == text.toLocaleLowerCase()) {
						captcha.done = true;

						delete captchaip[ip];

						return Promise.resolve({
							data: {
								id: captcha.id,
								done: true,
							},
						});
					}

					captcha.shot || (captcha.shot = 0);
					captcha.shot++;

					var currentTime = f.now();

					if (
						captcha.shot >= 5 ||
						f.date.addseconds(captcha.time, 120) < currentTime ||
						f.date.addseconds(captcha.time, 2) > currentTime
					) {
						delete captchas[_captcha];

						return Promise.reject('captchashots');
					}

					return Promise.reject('captchanotequal');
				},
			},
		},

		wallet: {
			sendwithprivatekey: {
				path: '/wallet/sendwithprivatekey',
				authorization: false,
				action: function (p) {
					return self.wallet
						.sendwithprivatekey(p)
						.then((r) => {
							return Promise.resolve({
								data: r,
							});
						})
						.catch((e) => {
							return Promise.reject(e);
						});
				},
			},
			freeregistration: {
				path: '/free/registration',
				authorization: self.test ? false : 'signature',
				action: function ({ captcha, key, address, ip }) {

					if (settings.server.captcha && !self.test) {
						if (!captcha || !captchas[captcha] || !captchas[captcha].done) {
							return Promise.reject('captcha');
						}
					}

					return self.wallet
						.addqueue(key || 'registration', address, ip)
						.then((r) => {

							if (settings.server.captcha) {
								if (captcha) {
									delete captchas[captcha]
								}
							}

							return Promise.resolve({
								data: r,
							});
						})
						.catch((e) => {
							return Promise.reject(e);
						});
				},
			},

			clearexecuting: {
				path: '/wallet/clearexecuting',
				authorization: 'signature',

				action: function ({ A }) {

					if (!A) return Promise.reject('admin');

					return self.wallet.clearexecuting()
						.then((r) => {
							return Promise.resolve({
								data: 'done',
							});
						})
						.catch((e) => {
							return Promise.reject(e);
						});
				},
			},

			

			freeregistrationfake: {
				path: '/free/registrationfake',
				action: function ({ }) {
					return Promise.reject('disabled');

					var addresses = ['PP582V47P8vCvXjdV3inwYNgxScZCuTWsq'];

					var promises = _.map(addresses, function (a) {
						return self.wallet.addqueue('registration', a, '::1');
					});

					return Promise.all(promises).then((r) => {
						return Promise.resolve({
							data: r,
						});
					});
				},
			},
		},

		manage: {
			all: {
				path: '/manage',
				authorization: 'signature',
				action: function (message) {
					if (!message.A)
						return Promise.reject({ error: 'Unauthorized', code: 401 });

					var kaction = f.deep(manage, message.action);

					if (!kaction) {
						return Promise.reject({ error: 'unknownAction', code: 404 });
					}

					return kaction(message.data)
						.then((data) => {
							return Promise.resolve({ data });
						})
						.catch((e) => {
							return Promise.reject(e);
						});
				},
			},
		},
	};

	peertube.extendApi(self.api.peertube, server.cache)

	self.wallet.events()

	
		
	return self

}

module.exports = Proxy


