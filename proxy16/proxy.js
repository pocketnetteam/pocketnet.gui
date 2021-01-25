
var _ = require('underscore')
var fs = require('fs');
var path = require('path');


////////////
var f = require('./functions');

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

//////////////


var Proxy = function (settings, manage) {

    var self = this;

    var server = new Server(settings.server, manage);
    var wss = new WSS();
    var pocketnet = new Pocketnet();
    var nodeControl = new NodeControl(settings.node);
    var nodeManager = new NodeManager(settings.nodes);
    var firebase = new Firebase(settings.firebase);
    var wallet = new Wallet(settings.wallet);
    var remote = new Remote();

    f.mix({ 
        wss, server, pocketnet, nodeControl, 
        remote, firebase, nodeManager, wallet,

        proxy : self
    })


    var stats = [];
    var statcount = 5000;
    var statInterval = null;

    var addStats = function(){

		var ws = {};

		if(self.wss) ws = self.wss.info();

		var data = {
			ws : ws,
            time : new Date(),
            info : self.kit.info()
		}

        stats.push(data)

        //console.log(data)

		var d = stats.length - statcount

		if (d > 100){
			stats = stats.slice(d)
		}
    }
    
    var getStats = function(){
        return stats
    }

    var ini = {
        ssl: function () {

            var sslsettings = settings.server.ssl || {}

            var options = {};

            if(!sslsettings.key || !sslsettings.cert || !sslsettings.passphrase) return {}

            try {
                options = {
                    key: fs.readFileSync(path.resolve(__dirname, sslsettings.key)),
                    cert: fs.readFileSync(path.resolve(__dirname, sslsettings.cert)),
                    passphrase: sslsettings.passphrase
                }
            }
            catch (e) {
                options = {}
            }

            return options;

        }
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
            })
        },

        info : function(){
            return server.info()
        }

    }

    self.wallet = {

        events : function(){
            wallet.clbks.error.queue.main = function(e, p){
                console.log("ERROR QUEUE", e, p)
            }

            wallet.clbks.error.ini.main = function(e, p){
                console.log("ERROR INI", e, p)
            }
        },

        init: function () {
            return wallet.init()
        },

        destroy: function () {
            return wallet.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        info : function(){
            return wallet.info()
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

        destroy: function () {
            return wss.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        info : function(){
            return wss.info()
        }
    }

    self.nodeControl = {

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

        canstop : function() {
            return nodeControl.kit.canstop()
        },
        
        detach : function() {
            return nodeControl.kit.detach()
        },

        re : function(){
            return this.destroy().then(r => {
                return this.stop()
            }).then(r => {
                return this.init()
            }).then(r => {
                return this.start()
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
        }

    }
    ///
    self.nodeManager = {
        init : function () {
            return nodeManager.init()
        },

        destroy : function () {
            return nodeManager.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },
        info : function(){
            return nodeManager.info()
        }
    }

    self.firebase = {
        init: function () {
            return firebase.init()
        },

        destroy: function () {
            return firebase.destroy()
        },

        re : function(){
            return this.destroy().then(r => {
                this.init()
            })
        },

        info : function(){
            return firebase.info()
        }
    }

    self.kit = {

        info : function(){
            return {
                status: status,

                nodeManager: self.nodeManager.info(),
                nodeControl: self.nodeControl.info(),
                firebase : self.firebase.info(),
                server: self.server.info(),
                wss : self.wss.info(),
                wallet : self.wallet.info(),
                remote : remote.info()
            }
        },

        init: function () {

            var catchError = function(key){
                return (e) => {
                    console.log('init', key, e)
                    return Promise.resolve()
                }
            }

            status = 1

            var promises = _.map(['server', 'wss', 'nodeManager', 'wallet', 'firebase', 'nodeControl'], (i) => {
                return self[i].init().catch(catchError(i)).then(() => {
                    return Promise.resolve()
                })
            })

            return Promise.all(promises).then(r => {

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
                    console.log('destroy', key, e)
                    return Promise.resolve()
                }
            }

            var promises = _.map(['server', 'wss', 'nodeManager', 'wallet', 'firebase', 'nodeControl'], (i) => {
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

    self.wallet.events()

    return self

}

module.exports = Proxy

/*
const swaggerDocument = require('./docs/api/v1.json');

app.use('/api/v1/help', swaggerUi.serve, swaggerUi.setup(swaggerDocument));*/


