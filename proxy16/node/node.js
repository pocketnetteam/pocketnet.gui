
var RpcClient = require('./rpc');
var f = require('../functions');
const { performance } = require('perf_hooks');
var Test = require('./testnode.js');
var Wss  = require('./wss.js');

var Node = function(options, manager){

    var self = this

    self.updating = ['rpcuser', 'rpcpass', 'ws', 'name']

    self.host = options.host
    self.port = options.port
    self.rpcuser = options.rpcuser || ""
    self.rpcpass = options.rpcpass || ""
    self.ws = options.ws
    self.name = options.name || "Pocketnet Node"
    self.stable = options.stable || false
    self.addedby = options.addedby || ''
    //self.currentBlock = 0
    self.peer = options.peer || false

    var statisticInterval = null

    var test = new Test(self)

    var wss = {
        service : null,
        users : {}
    }

    var chain = [];

    var serviceConnection = function(){
        if(!wss.service){
     
            wss.service = (new Wss(self, true)).connect()

            wss.service.on('disconnected', function(){
                wss.service = null
                serviceConnection()
            })
        }
    }

    var timedifference = function(time){ //nodetime
        self.time = time || 0
        self.timeDifference = 0

        if(self.time){
            var d = new Date()

            self.timeDifference = self.time - Math.floor((d.getTime()) / 1000)
            self.timeDifferenceTimeZone = self.time - Math.floor((d.getTime() + (d.getTimezoneOffset() * 60000)) / 1000);
        }
    }

    self.height = function(){
        var lastblock = self.lastblock() || {}

        return lastblock.height || 0
    }   

    self.lastblock = function(){
        if(chain.length) return chain[chain.length - 1]

        return null
    }

    self.addblock = function(block){

        if (block.blockhash && block.time && block.height){

            var lastblock = self.lastblock()

            if(!lastblock || lastblock.height < block.height){

                chain.push({
                    blockhash : block.blockhash,
                    time : block.time,
                    height : block.height
                })
    
                timedifference(block.time)

            }

            chain = f.lastelements(chain, 100, 10)

        }
    }

    self.chain = function(){
        return chain
    }

    self.chainStatus = function(){
        if(!manager || !chain.length) return {}

        var cs = manager.currentChainCommon()
        var lastblock = self.lastblock()

        if(!cs || !lastblock) return {}

        var d = lastblock.height - cs.commonHeight

        var hascommonblock = _.find(chain, function(c){
            return c.blockhash == cs.commonBlockHash
        })


        return {
            fork : !hascommonblock,
            difference : d
        }
        
    }

    self.key = self.host + ":" + self.port
    self.wskey = self.host + ":" + self.ws
    self.ckey = self.host + ":" + self.port + ":" + self.ws


    self.rpc = new RpcClient({
        protocol: 'http',
        user: self.rpcuser,
        pass: self.rpcpass,
        host: self.host,
        port: self.port,
    })

    self.rpcs = function(method, parsed){

        if(!self.checkParameters()) return Promise.reject('nodeparameters') 
        if(!self.rpc[method]) return Promise.reject('method')
        

        if(!parsed) parsed = []
        if(!_.isArray(parsed)) parsed = [parsed]

        var err = null
        var time = performance.now()

        return self.rpc[method](parsed).catch(e => {

            err = e

            return Promise.resolve(null)

        }).then(data => {

            var difference = performance.now() - time;
            var code = 200;
           
            if (err) {

                code = 500;

                if(!err.code || err.code == -28){
                    code = 521
                }

            }	

            self.statistic.add({
                code : code,
                difference : difference
            })

            if(!err){
                return Promise.resolve(data.result)
            }

            return Promise.reject(err)

        })
    }
    
    self.events = []
    self.eventsCount = 0

    self.statistic = {

        clear : function(){
            self.events = []
            self.eventsCount = 0
        },

        add : function(p){

            self.events.push(p)

            var d = self.events.length - 10000

            if (d > 100){
                self.events = self.events.splice(0, d)
            }

            self.eventsCount++

        },

        rating : function(){
            var s = self.statistic.get() 

            var lastblock = self.lastblock() || {}

            return (s.count) * (s.percent / (s.time || 5000)) * (lastblock.height || 1)
        },

        get : function(){
            
            var r = {
                success : 0,
                failed : 0,
                time : 0,
                count : self.events.length,
                allcount : self.eventsCount
            }

            _.each(self.events, function(l){

                if (l.code == 200){
                    r.success++
                }
                else
                {
                    r.failed++
                }

                r.time += l.difference

            })

            r.percent = (r.success / (r.count || 1)) * 100

            r.time = r.time / (r.count || 1)

            return r
        },

        interval : function(){
            if(!statisticInterval){
                statisticInterval = setInterval(function(){
                    if (self.events.length < 1000){
                        self.info().catch(e => {})
                    }

                }, 60000)
            }
        },

        clearinterval : function(){
            if (statisticInterval){
                clearInterval(statisticInterval)
                statisticInterval = null
            }
        }

    }

    self.checkParameters = function(){
        if(!f.validateHost(self.host)) return Promise.reject('validateHost')
        if(!self.port) return Promise.reject('port')
        if(!self.ws) return Promise.reject('ws')
        
        return Promise.resolve()
    }

    self.check = function(){

        return self.checkParameters().then(r => {
            return self.info()
        })
       
    }

    self.localhost = function(){
        if(self.host == 'localhost' || self.host == '127.0.0.1'|| self.host == '0.0.0.0') 
        
        return true
    }

    self.peers = function(){

        return self.rpcs('getPeerInfo').then(result => {

            var nodes = _.map(result || [], function(peer){

                var pr = peer.addr.split(":")

                var node = new Node({
                    host : pr[0],
                    port : 38081, //// TODO
                    ws : 8087, //// TODO
                    peer : true
                }, manager)  

                return node

            })

            nodes = _.uniq(nodes, function(n){
                return n.key
            })

            return Promise.resolve(nodes)

        }).catch(e => {
            return Promise.reject(e)
        })
        
    }

    self.info = function(){
        return self.rpcs('getnodeinfo').then(info => {

            self.addblock(info.lastblock)
            
            /*self.currentBlock = info.lastblock.height
            
            timedifference(info.time)*/

            return Promise.resolve(info)
        })  
    }

    self.update = function(options){

        var updated = {}

        _.each(self.updating, function(k){
            if(options[k]){
                updated[k] = self[k] = options[k];
            }
        })

        return options
    }

    self.export = function(){

        var s = self.statistic.get()

        var lastblock = self.lastblock() || {}

        return {
            host : self.host,
            port : self.port,
            rpcuser : self.rpcuser,
            rpcpass : self.rpcpass,
            ws : self.ws,
            name : self.name,
            addedby : self.addedby,
            key : self.key,

            canuse : (s.success > 0 && lastblock.height) ? true : false
        }
    }

    self.getbyws = function(host, ws){
        return _.find(self.nodes, function(node){
            return node.host = host && node.ws == ws
        })
    }

    self.exportsafe = function(){

        var e = self.export()

        delete e.rpcuser
        delete e.rpcpass

        return e
    }

    

    self.init = function(){
        
        self.statistic.interval()

        serviceConnection()

        return self
    }

    self.destroy = function(){
        self.statistic.clearinterval()

        if (wss.service) {
            wss.service.disconnect()

            
        }
    }

    self.wss = {

        add : function(user){
            var old = wss.users[user.address]

            if (old) {
                if(old.closed) old.disconnect()
            }

            wss.users[user.address] = (new Wss(self)).connect(user)

            return wss.users[user.address]
        },

        disconnect : function(user){
            if (wss.users[user.address]){
                wss.users[user.address].disconnect()

                delete wss.users[user.address]
            }
        }

    }

    return self
}

module.exports = Node