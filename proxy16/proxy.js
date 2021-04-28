
var _ = require('underscore')
var fs = require('fs');
var path = require('path');


////////////
var f = require('./functions');
var svgCaptcha = require('svg-captcha');
/*
var WSS = require('./wss.js');
const Firebase = require('../proxy/firebase');
*/

var Server = require('./server/https.js');
var WSS = require('./server/wss.js');
var Firebase = require('./server/firebase.js');
var NodeControl = require('./node/control.js');
var NodeManager = require('./node/manager.js');
var Pocketnet = require('./pocketnet.js');
var Wallet = require('./wallet/wallet.js');
var Remote = require('./remote.js');
var Proxies = require('./proxies.js');
var Exchanges = require('./exchanges.js');
var Peertube = require('./peertube.js');
var Bots = require('./bots.js');
//////////////


var Proxy = function (settings, manage) {

    var self = this;

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

    self.userDataPath = null    

    f.mix({ 
        wss, server, pocketnet, nodeControl, 
        remote, firebase, nodeManager, wallet,
        proxies, exchanges, peertube, bots,

        proxy : self
    })


    var stats = [];
    var statcount = 5000;
    var statInterval = null;

    var captchas = {};
    var captchaip = {};

    var addStats = function(){

		var ws = {};

		var data = {
            time : f.now(),
            info : self.kit.info(true)
		}

        stats.push(data)


		var d = stats.length - statcount

		if (d > 100){
			stats = stats.slice(d)
		}
    }
    
    var getStats = function(n){

        if (n){
            return f.lastelements(stats, 500)
        }

        return stats
    }

    var ini = {
        ssl: function () {
            var s =  settings.server.ssl || {}
            var sslsettings = {}
            
            sslsettings.key = s.keypath || s.key
            sslsettings.cert = s.certpath || s.cert
            sslsettings.passphrase = s.passphrase

            var options = {};


            if(!sslsettings.key || !sslsettings.cert || typeof sslsettings.passphrase == 'undefined') return {

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
        
        dummy : function(){
            return true
        },

        signature : function(data){

            delete data.A
            delete data.U

            if (data.signature){
                var authorized = self.pocketnet.kit.authorization.signature(data.signature)

                if (authorized){

                    data.U = data.signature.address

                    if(_.indexOf(settings.admins, data.U) > -1) data.A = true

                    return true
                }
            }

            return false
        

        },

        signaturelight : function(data){

            delete data.A
            delete data.U

            if (data.signature){
                var authorized = self.pocketnet.kit.authorization.signature(data.signature)

                if (authorized){

                    data.U = data.signature.address

                    if(_.indexOf(settings.admins, data.U) > -1) data.A = true

                    return true
                }
            }

            return true
        

        }
    }


    self.users = function(){

        var i = self.kit.info()

        var count = Math.max(f.deep(i, 'wss.users.length') || 1, f.deep(i, 'server.middle.requestsIp') || 1)

        if (count < 1) count = 1

        return count

    }

    self.server = {

        init: function () {


            if (settings.server.enabled) {


                return server.init({
                    ssl : ini.ssl(),
                    port : f.deep(settings, 'server.ports.https')
                });

            }

            return Promise.resolve()

        },

        destroy: function () {
            return server.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        rews : function(){
            return self.server.re().then(r => {
                return self.wss.re()
            }).then(r => {

                return self.firebase.re()

            }).catch(e => {

                return Promise.reject(e)
            })
        },

        info : function(compact){
            return server.info(compact)
        },

        get export(){
            return server.export()
        },

    }

    self.bots = {
        add : function(address){
            return bots.add(address)
        },
        remove : function(address){
            return bots.remove(address)
        },
        get : function(){
            return bots.get()
        },
        init : function(){
            return bots.init()
        }
    }


    self.wallet = {

        events : function(){
            wallet.clbks.error.queue.main = function(e, p){
                //console.log("ERROR QUEUE", e, p)
            }

            wallet.clbks.error.ini.main = function(e, p){
                //console.log("ERROR INI", e, p)
            }
        },

        init: function () {
            return wallet.init()
        },

        inited : function(){
            return wallet.init()
        },

        addqueue : function(key, address, ip){
            return wallet.kit.addqueue(key, address, ip)
        },
        

        destroy: function () {
            return wallet.destroy()
        },
        removeKey : function(key){
            return wallet.kit.removeKey(key)
        },
        setPrivateKey : function(key, private){
            return wallet.kit.setPrivateKey(key, private)
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        info : function(){
            return wallet.info()
        },


        sendwithprivatekey : function({address, amount, key}){
            return wallet.kit.sendwithprivatekey(address, amount, key)
        }
    }

    self.wss = {
        
        init: function () {

            if (settings.server.enabled) {

                return wss.init({
                    ssl : ini.ssl(),
                    port : f.deep(settings, 'server.ports.wss')
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

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },



        info : function(compact){
            return wss.info(compact)
        },

        wssdummy : function(wssdummy){
            wss.wssdummy(wssdummy)
        }
    }

    self.nodeControl = {

        enable : function(v){
            return nodeControl.kit.enable(v)
        },

        init: function () {
            return nodeControl.init()
        },

        destroy: function () {
            return nodeControl.destroy()
        },

        start: function() {
            return nodeControl.kit.start()
        },

        stop: function() {
            return nodeControl.kit.stop()
        },

        check : function(){
            return nodeControl.kit.check()
        },

        canstop : function() {
            return nodeControl.kit.canstop()
        },
        
        detach : function() {
            return nodeControl.kit.detach()
        },

        re : function(){
            return this.destroy().then(r => {
                return this.init()
            })
        },

        get request(){
            return nodeControl.request
        },

        get kit(){
            return nodeControl.kit
        },

        info : function(){
            return nodeControl.info()
        },


    }
    ///
    self.nodeManager = {
        init : function () {
            return nodeManager.init()
        },

        inited : function(){
            return nodeManager.info().inited
        },

        destroy : function () {
            return nodeManager.destroy()
        },

        reservice : function(){
            return nodeManager.reservice()
        },  

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },
        info : function(compact){
            return nodeManager.info(compact)
        }
    }

    self.firebase = {
        init: function () {
            return firebase.init(settings.firebase)
        },

        destroy: function () {
            return firebase.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        info : function(compact){
            return firebase.info(compact)
        }
    }

    self.exchanges = {
        init: function () {
            return exchanges.init()
        },

        destroy: function () {
            return exchanges.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        get kit(){
            return exchanges.kit
        },
    }

    self.peertube = {
        init: function () {
            return peertube.init()
        },

        destroy: function () {
            return peertube.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        get kit(){
            return peertube.kit
        },
    }

    self.kit = {
        service : function(){
            var w = self.wss.info(true)
            var s = self.server.info(true)

            var service = {
                addr : 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq',
            }

            /*if (s.listening && w.listening && settings.server.domain){ 
                service.mainport = Number(s.listening)
                service.wssport = Number(w.listening)
                service.service = true
                service.addr = settings.server.domain

            }*/

            return service
        },
        stats : function(n){
            return getStats(n)
        },
        info : function(compact){

            var mem = process.memoryUsage()

            _.each(mem, function(v, i){
                mem[i] = v / (1024 * 1024)
            })

            return {
                status: status,

                nodeManager: self.nodeManager.info(compact),
                nodeControl: self.nodeControl.info(compact),
                firebase : self.firebase.info(compact),
                server: self.server.info(compact),
                wss : self.wss.info(compact),
                wallet : self.wallet.info(compact),
                remote : remote.info(compact),
                admins : settings.admins,

                captcha : {
                    ip : _.toArray(captchaip).length,
                    all : _.toArray(captchas).length
                },

                memory : mem
            }
        },

        initlist : function(list){
            var catchError = function(key){
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

        sinit : function(){
            var wrks = []

            if(!self.nodeManager.inited()) wrks.push('nodeManager')
            if(!self.wallet.inited()) wrks.push('wallet')

            if(!wrks.length){
                return Promise.resolve({})
            }
            else{
                return self.kit.initlist(wrks).then(r => {
                    
                    return Promise.resolve({
                        refresh : true
                    })
                })
            }
        },

        init: function () {

            status = 1

            return this.initlist(['server', 'wss', 'nodeManager', 'wallet', 'firebase', 'nodeControl', 'exchanges', 'peertube', 'bots']).then(r => {

                status = 2

                if(!statInterval)
                    statInterval = setInterval(addStats, 10000)

                return Promise.resolve()
            })

        },

        candestroy : function(){

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

            if (statInterval){
                clearInterval(statInterval)
                statInterval = null
            }

            var catchError = function(key){
                return (e) => {
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

        safedestroy : function(){
            return self.kit.candestroy().then(rs => {

                if (rs.length){
        
                    console.clear()
                    console.log("Do you want to detach: "+rs.join(', ')+"?")
        
                    return Promise.reject('detach')
                }
        
                return Promise.resolve()
        
            })
        },

        detach : function(modules){

            if(!modules) modules = ['nodeControl']

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

    self.apibypath = function(path){
        var result = null


        _.find(self.api, function(pack){
            return _.find(pack, function(object){

                if(object.path == path) {

                    result = object

                    return true
                }

            })
        })

        return result
    }

    self.api = {
        node : {
            rpc : {
                path : "/rpc/*",
                authorization : 'signaturelight',
                action : function({method, parameters, options, U}){

                    if(!method) {
                        return Promise.reject({
                            error : 'method',
                            code : 400
                        })
                    }
                    
        
                    if(!options) options = {}
                    if(!parameters) parameters = []
        
                    var node = null;

                    return new Promise((resolve, reject) => {

                        server.cache.wait(method, parameters, function(waitstatus){
                            resolve(waitstatus)
                        })

                    }).then(waitstatus => {

                       

                        var cached = server.cache.get(method, parameters)
        
                        if (cached){
                            return Promise.resolve({
                                data : cached,
                                code : 208
                            })
                        }

                        //var cachwaitng = server.cache.waitng(method, parameters)
            
                        /// ????
                        if (options.locally && options.meta){
                            node = nodeManager.temp(options.meta)
                        }
            
                        if (options.node){
                            node = nodeManager.nodesmap[options.node]

                        }
            
                        if(!node || options.auto) 
                            node = nodeManager.selectProbability() //nodeManager.selectbest()
            

                            
                        if(!node) {
                            return Promise.reject({
                                error : "node",
                                code : 502
                            })
                        }


                        if (method == 'sendrawtransactionwithmessage'){


                            if(!bots.check(U)){
                                return new Promise((resolve, reject) => {
                                    setTimeout(function(){

                                        resolve({
                                            data : '319f9e3f40e7f82ee7d32224fe2f7c1247f7f8f390930574b8c627d0fed3c312',
                                            code : 200,
                                            node : node.exportsafe()
                                        })

                                    }, f.rand(120, 1000))
                                })
                            }

                        }
                  

                        return node.checkParameters().then(r => {

                            
                            return node.rpcs(method, parameters)

                        }).then(data => {
        
                            server.cache.set(method, parameters, data, node.height())
            
                            return Promise.resolve({
                                data : data,
                                code : 200,
                                node : node.exportsafe()
                            })
            
                        })

                    }).catch(e => {
                        return Promise.reject({
                            error : e,
                            code : e.code,
                            node : node ? node.export() : null
                        })
                    })
                }
            }
        },

        nodeManager : {
            revoke : {
                path : '/nodes/revoke',
                authorization : 'signature',
                action : function({node, A}){
                    return nodeManager.revoke(node, A).then(r => {

                        return Promise.resolve({data : r})

                    })
                }
            },
            update : {
                path : '/nodes/update',
                authorization : 'signature',
                action : function({node, A}){
                    return nodeManager.update(node, A).then(r => {

                        return Promise.resolve({data : r})

                    })
                }
            },

            create : {
                path : '/nodes/update',
                authorization : 'signature',
                action : function({node, A, U}){

                    node.addedby = U

                    return nodeManager.create(node).then(r => {

                        return Promise.resolve({data : r})

                    })
                }
            },

            canchange: {
                path : '/nodes/canchange',
                action : function({node}){

                    var _node = nodeManager.nodesmap[node]

                    if(!_node){
                        var nnode = nodeManager.selectProbability()

                        if (nnode) return Promise.resolve({
                            node : nnode.exportsafe()
                        })

                        else return Promise.reject('none')
                    }

                    var nnode = _node.changeNodeUser(null, _node.needToChange())

                    if(!nnode){
                        return Promise.resolve({})
                    }

                    return Promise.resolve({data : {
                        node : nnode.exportsafe()
                    }})

                }
            },

            select : {
                path : '/nodes/select',
                action : function({fixed}){


                    return nodeManager.waitbest(3000).then(r => {

                        var node = null

                        if (fixed){
                            node = nodeManager.select(fixed)
                        }

                        if(!node)
                            node = nodeManager.selectProbability() || nodeManager.selectbest() || nodeManager.select()

                        if(!node){
                            return Promise.reject('cantselect')
                        }

                        return Promise.resolve({data : {
                            node : node.exportsafe()
                        }})
                    }).catch(e => {

                        return Promise.reject(e)
                    })

                    

                }
            },

            test : {
                path : '/nodes/test',
                authorization : 'signature',
                action : function({node, scenario, A}){

                    return Promise.reject('err')

                    if(!A) return Promise.reject()

                    var _node = nodeManager.nodesmap[node]

                    if(!_node){
                        return Promise.reject('cantselect')
                    }

                    return _node.test(scenario)

                }
            },

            get : {
                path : '/nodes/get',
                action : function(){

                    return Promise.resolve({data : {
                        nodes : nodeManager.getnodes()
                    }})

                }
            }
        },

       
        remote : {
            bitchute : {
                path : '/bitchute',
                action : function({url}){

                    return new Promise((resolve, reject) => {
                        remote.make(url, function(err, data, html, $){
	
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
                                
                                resolve({data})
                            }
                            else
                            {
                                reject(err)
                            }	
            
            
                        })
                    })

                    
                }
            },

            url : {
                path : '/url',
                action : function({url}){
                    return new Promise((resolve, reject) => {
                        remote.make(url, function(err, data, html){
        
                            if(!err){
                                data.html = html
                                resolve({data})
                            }
                            else
                            {
                                reject(err)
                            }	
        
                        })
                    })
                }
            },

            urlPreview : {
                path : '/urlPreview',
                action : function({url}){
                    return new Promise((resolve, reject) => {
                        remote.nmake(url, function(err, data){
        
                            if(!err){
                                resolve({
                                    data : {
                                        og : data
                                    }
                                })
                            }
                            else
                            {
                                reject(err)
                            }	
        
                        })
                    })
                }
            }
        },

        common : {
            /*use : {
                path : '/use',
                action : function(){
                    return self.kit.sinit()
                }
            },*/
            info : {
                path : '/info',
                action : function(){
                    
                    return Promise.resolve({data : {
                        info : self.kit.info(true)
                    }})

                }
            },
            logs : {
                path : '/logs',
                action : function(){

                    var data = {
                        logs : server.middle.getlogs(),
                        /*ws : wss.info(),
                        iplimiter : iplimiter.info()*/
                    }
                    
                    return Promise.resolve({data})

                }
            },
            stats : {
                path : '/stats',
                action : function(){
                    
                    return Promise.resolve({data : {
                        stats : self.kit.stats(500)
                    }})

                }
            },
            ping : {
                path : '/ping',
                action : function(){
                    
                    return Promise.resolve({data : {
                        time : f.now()
                    }})

                }
            },

            nodes : {
                path : '/nodes',
                action : function(){
                    
                    return Promise.resolve({data : {
                        stats : nodeManager.info()
                    }})

                }
            }
        },

        firebase : {
            set : {
                authorization : 'signature',
                path : '/firebase/set',
                action : function(data){
                    
                    return self.firebase.kit.addToken(data).then(r => {
                        return Promise.resolve({data : r})
                    })

                }
            },

            revokedevice: {
                path : '/firebase/revokedevice',
                action : function(data){
                    
                    return self.firebase.kit.removeDevice(data).then(r => {
                        return Promise.resolve({data : r})
                    })

                }
            },
        },

        exchanges : {
            history : {
                path : '/exchanges/history',
                action : function(){
                    return self.exchanges.kit.get.history().then(d => {
                        return Promise.resolve({
                            data : d
                        })
                    })
                }
            }
        },

        peertube : {
            servers : {
                path : '/peertube/servers',
                action : () => self.peertube.kit.getBestServer().then(res => Promise.resolve({
                    data: res,
                })).catch(err => Promise.reject({
                    data: err,
                })),
            },
            video : {
                path : '/peertube/video',
                action : (info) => self.peertube.kit.getVideoinfo(info).then(res => Promise.resolve({
                    data: res,
                })).catch(err => Promise.reject({
                    data: err,
                })),
            },
            listVideos: {
                path : '/peertube/listVideos',
                action : (info) => self.peertube.kit.getListVideos(info).then(res => Promise.resolve({
                    data: res,
                })).catch(err => Promise.reject({
                    data: err,
                    code: 400,
                })),
            }


        },

        captcha : {
            get : {
                authorization : 'signature',
                path : '/captcha',

                action : function({captcha, ip}){
                    if (captcha && captchas[captcha] && captchas[captcha].done){
                        return Promise.resolve({
                            data : {
                                id : captchas[captcha].id,
                                done : true,
                                result : captchas[captcha].text
                            }
                        })
                    }

                    captchaip[ip] || (captchaip[ip] = 0);
                    captchaip[ip]++

                    var captcha = svgCaptcha.create({
                        size : 4,
                        noise : 12,
                        color : false,
                        ignoreChars: '0o1liy',
                        width : 250
                    });
                    
                    captcha.id = f.makeid();
    
                    captchas[captcha.id] = {
                        text : captcha.text.toLocaleLowerCase(),
                        id : captcha.id,
                        done : false,
                        time : f.now()
                    }

                    return Promise.resolve({
                        data : {
                            id : captcha.id,
                            img : captcha.data,
                            result : captcha.text, ///
                            done : false
                        }
                    })
                }
            },

            make : {
                authorization : 'signature',
                path : '/makecaptcha',

                action : function({captcha, ip, text}){
                    var captcha = captchas[captcha];

                    if(!captcha){

                        return Promise.reject('captchanotexist')

                     
                    }

                    if (captcha.done){

                        return Promise.resolve({
                            data : {
                                id : captcha.id,
                                done : true
                            }
                        })

                       
                    }

                    if (captcha.text == text.toLocaleLowerCase()){

                        captcha.done = true

                        delete captchaip[ip]

                        return Promise.resolve({
                            data : {
                                id : captcha.id,
                                done : true
                            }
                        })

                    }

                    captcha.shot || (captcha.shot = 0)
                    captcha.shot++;

                    var currentTime = f.now()

                    if (
                        captcha.shot >= 5 || 

                        f.date.addseconds(captcha.time, 120) < currentTime ||
                        f.date.addseconds(captcha.time, 2) > currentTime
                    ){

                        delete captchas[request.data.captcha];


                        return Promise.reject('captchashots')

                    }

                    return Promise.reject('captchanotequal')

                }
            }
        },

        wallet : {
            sendwithprivatekey : {
                path : '/wallet/sendwithprivatekey',
                authorization : false,
                action : function(p){

                    return self.wallet.sendwithprivatekey(p).then(r => {

                        return Promise.resolve({
                            data : r
                        })

                    }).catch(e => {

                        return Promise.reject(e)
                    })

                }
            },
            freeregistration : {
                path : '/free/registration',
                authorization : 'signature',
                action : function({captcha, key, address, ip}){

                    if (settings.server.captcha){

                        if((!captcha || !captchas[captcha] || !captchas[captcha].done)){

                            return Promise.reject('captcha')
    
                        }

                    }

                    return self.wallet.addqueue(key || 'registration', address, ip).then(r => {


                        return Promise.resolve({
                            data : r
                        })

                    }).catch(e => {

                        return Promise.reject(e)
                    })

                }
            },
            freeregistrationfake : {
                path : '/free/registrationfake',
                action : function({}){  

                    return Promise.reject('disabled')

                    var addresses = ['PP582V47P8vCvXjdV3inwYNgxScZCuTWsq']

                    var promises = _.map(addresses, function(a){
                        return self.wallet.addqueue('registration', a, "::1")
                    })

                    return Promise.all(promises).then(r => {
                        return Promise.resolve({
                            data : r
                        })
                    })
                    

                }
            }
        },

        manage : {
            all : {
                path : '/manage',
                authorization : 'signature',
                action : function(message){


                    if(!message.A) 
                        return Promise.reject({error : 'Unauthorized', code : 401})

                    var kaction = f.deep(manage, message.action)


                    if(!kaction) {
                        return Promise.reject({error : 'unknownAction', code : 502})
                    }

                    return kaction(message.data).then(data => {
                        return Promise.resolve({data})
                    }).catch(e => {
                        return Promise.reject(e)
                    })
                }
            }
        }
     
    }

    self.wallet.events()

    return self

}

module.exports = Proxy

/*
const swaggerDocument = require('./docs/api/v1.json');

app.use('/api/v1/help', swaggerUi.serve, swaggerUi.setup(swaggerDocument));*/


