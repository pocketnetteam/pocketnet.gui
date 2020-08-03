var Proxy = require("./proxy");
var Datastore = require('nedb');
var path = require('path');
var deepExtend = require('deep-extend');
var cloneDeep = require('clone-deep');
var DB = require('./db');
var tcpPortUsed = require('tcp-port-used');

_ = 	require("underscore");
		require("./pocketnet/functions");
		require("./pocketnet/satolist");
		require("./pocketnet/kit");
		require("./pocketnet/user");
     
		require("./pocketnet/timer")
		require("./pocketnet/pbkdf2")

var settings = {}
var defaultSettings = {

	nedbkey : 'settings',

	nedbpath : {
		settings : './data/settings'
	},

	nodes : {

		defaults : {
			port : 38081,
			ws : 8010,
			rpcuser : 'login',
			rpcpass : 'password',
		},
		
		stable : [

			{
                host : '185.148.147.15',
                port : 38081,
                ws : 8087,
                nodename : 'Cryptoserver',
                stable : true,
                rpcuser : '',
                rpcpass : '',
            }
	
		],

	},

	/////////////////////////////////////////////

	server : true,

    ports : {
        https : 8888,
        wss : 8088
	},
	
    ssl : {
        key : './cert/key.pem',
        cert : './cert/cert.pem',
        passphrase: 'password'
	},
	//remove firebase

	fbk : "./private/pocketnet-firebase.json",

	//remove db

	dbEnable : true,

	//dbp : './private/db.json', //// not actual
    
	db : {		
		host: 'localhost',
		port: 5432,
		max: 10,
		idleTimeoutMillis: 30000,

		/////////////
		user: 'postgres', 
		database: 'login',
		password: 'password'
	},

	//kran : "C:/Utils/pocketnet.app/pocketnetKRAN.txt",

	refkey : '',

	captcha : true,

    iplimiter : true,

    node: {
        Enable: true,
        Host: '127.0.0.1',
        Port: 38081,
        BinPath: '',
        ConfigPath: 'pocketcoin.conf',
        DataPath: 'data',
    },
	
}



var proxy = null;


var kit = {

	set : {
		ports : function(httpsws, clbk){

			var ch = {
				https : false,
				wss : false
			}

			tcpPortUsed.check(httpsws.https, '127.0.0.1')

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

					settings.ports = {
						https : httpsws.https,
						wss  : httpsws.wss
					}

					kit.saveAndRestart(clbk)

					return
				}

				if (clbk){
					clbk('portsused', ch)
				}
			})
		},

		db : function(obj, clbk){

			var db = new DB(obj);
				db.init();
				
			db.check(function(err){

				db.destroy()

				if(!err){
					settings.db = {}

					settings.db.host = obj.host
					settings.db.port = obj.port
					settings.db.max = obj.max
					settings.db.idleTimeoutMillis = obj.idleTimeoutMillis
					settings.db.user = obj.user
					settings.db.database = obj.database
					settings.db.password = obj.password

					settings.dbEnable = obj.dbEnable

					kit.saveAndRestart(clbk)
				}

				else{

					clbk(err)

				}

			})
			
		},

		refkey : function(v, clbk){

			if (settings.refkey == v) 
				return

			settings.refkey = v

			kit.saveAndRestart(clbk)
			
		},

		iplimiter : function(v, clbk){

			if (settings.iplimiter == v) 
				return

			settings.iplimiter = v

			kit.saveAndRestart(clbk)
			
		},

		captcha : function(v, clbk){

			if (settings.captcha == v) 
				return

			settings.captcha = v

			kit.saveAndRestart(clbk)
			
		},

		server : function(v, clbk){

			if (settings.server == v) 
				return

			settings.server = v

			kit.saveAndRestart(clbk)
			
		},

		fbk : function(fbkjsonfile, clbk){
			helpers.saveFile('private/pocketnet-firebase-adminsdk.json', fbkjsonfile, function(err, fbkpath){

				if(err){
					if(clbk) clbk(err)

					return
				}

				settings.fbk = fbkpath

				kit.saveAndRestart(clbk)

			})
		},

		ssl : function(sslobj, clbk){

			if(sslobj.key && sslobj.cert && sslobj.passphrase){
				helpers.saveFile('cert/keyl.pem', sslobj.key, function(err, keypath){

					if(err){
						if(clbk) clbk(err)

						return
					}

					helpers.saveFile('cert/certl.pem', sslobj.cert, function(err, certpath){

						if(err){
							if(clbk) clbk(err)
	
							return
						}

						settings.ssl.key = keypath
						settings.ssl.cert = certpath
						settings.ssl.passphrase = passphrase

						kit.saveAndRestart(clbk)
	
					})

				})
			}

			else{

				if(clbk) clbk('bad format')

			}

			
		}
	},

	start : function(clbk){

		if(!proxy){

			proxy = new Proxy(settings)

			proxy.kit.start(function(){

				if(clbk) clbk()

			})

		}
		else
		{
			if(clbk) clbk()
		}

	},

	stop : function(){
		if (proxy){
			proxy.kit.stop()
			proxy = null
		}
	},

	saveAndRestart : function(clbk){
		helpers.rewriteSettings()

		kit.restart(clbk)
	},

	restart : function(clbk){

		this.stop()
		this.start(clbk)

	},

	settings : function(){

		if(proxy) return proxy.kit.settings()

		return settings

    },

}

var helpers = {
	expSettings : function(_settings){
		var cds = cloneDeep(defaultSettings)

			deepExtend(cds, _settings)

			settings = cds
	},

	removeSettings : function(clbk){
		db.remove({ nedbkey : 'settings' }, {}, function (err, numRemoved) {
			if(clbk) clbk()
		});
	},

	saveSettings : function(clbk){
		db.insert(settings, function (err, newDoc) {   // Callback is optional
			if(clbk) clbk()
		});
	},

	rewriteSettings : function(clbk){
		this.removeSettings(function(){
			this.saveSettings(function(){
				if(clbk) clbk()
			})	
		})
	},

	saveFile : function(filepath, buffer, clbk){

		var _path = path.resolve(__dirname, './' + filepath)

		fs.writeFile(path, buffer, (err) => {
			if (clbk)
				clbk(err, './' + filepath)

		})

	}
}

db = new Datastore({ filename: defaultSettings.nedbpath.settings });

db.loadDatabase(function (err) {   

	if(!err){
		db.find({ nedbkey : 'settings' }).exec(function (err, docs) {

			var _settings = {}

			if(!err){
				_settings = docs[0] || {}
			}

			helpers.expSettings(_settings)

			console.log(settings)

			kit.start()
		});
	}

	else{
		helpers.expSettings({})
	}
});

var ipcInterface = function(ipc, wc){
	var self = this;

	var tickInterval = function(){

	}

	var send = function(id, error, p, key){

		wc.send(key || 'proxy-message', {
			error : error,
			id : id || '0',

			data : p
		})
	}

	var actions = {

		set : function(message){
			if(!message.set || !kit.set[message.set]){

				send(message.id, 'unknown')

				return
			}

			kit.set[message.set](message.data, function(err, r){
				send(message.id, err || null, r)
			})

		},

		start : function(message){
			kit.start(function(){

				send(message.id, null, proxy.kit.status())

			})
		},
		stop : function(message){
			kit.stop(function(){

				send(message.id, null, {
					status : 0
				})

			})
		},
		restart : function(message){
			kit.restart(function(){

				send(message.id, null, proxy.kit.status())

			})
		},

		settings : function(message){
			send(message.id, null, proxy.kit.settings())
		},

		// todobr: 
		node : {
			start: function (message) {
				console.log('----', proxy.nodeControl.instance)
				send(message.id, null, proxy.nodeControl.instance.kit.start())
			},
			stop: function (message) {
				send(message.id, null, proxy.nodeControl.instance.kit.stop())
			}
		}
    }

	var handleMessage = function(e, message) {
		
		if(!message.action) return
		if(!message.id) message.id = makeid()

		//node.exist

		deep(actions, message.action)(message)

	}

	var tick = function(){

		var message = {
			settings : settings,
			state : {},
			node : {
				//state: proxy ? proxy.nodeControl.instance.kit.state : {}
            },
			proxyReady : proxy ? true : false
		}

		send('state', null, message, 'proxy-message-tick')
	}


	self.init = function(){
		ipc.on('proxy-message', handleMessage)

		tickInterval = setInterval(tick, 2500)
	}

	self.destroy = function(){
		ipc.off('proxy-message', handleMessage)	

		if(tickInterval){
			clearInterval(tickInterval)

			tickInterval = null
		}
	}

	return self
}


module.exports = ipcInterface