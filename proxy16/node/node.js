
var RpcClient = require('./rpc');
var f = require('../functions');
const { performance } = require('perf_hooks');
var Test = require('./testnode.js');
var Wss  = require('./wss.js');
const { map } = require('lodash');

var Node = function(options, manager){

    var self = this
    var lastinfo = null
    var cachedrating = null

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
    self.local = options.local || false
    self.testing = false

    var statisticInterval = null
    var changeNodeUsersInterval = null


    var notactualevents = 360000 //mult
    var checkEventsLength = 100 
    var getinfointervaltime = 60000 
    var lastinfoTime = f.now()
    var maxevents = 10000

    var test = new Test(self, manager)

    var wss = {
        service : null,
        users : {},
        changing : {}
    }

    var chain = [];

    var serviceConnection = function(){
        if(!wss.service && manager){
     
            wss.service = (new Wss(self, manager.proxy.kit.service())).connect()

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


        if ((block.hash || block.blockhash) && block.time && block.height){

            var lastblock = self.lastblock()

            if(!lastblock || lastblock.height < block.height){

                chain.push({
                    blockhash : block.hash || block.blockhash,
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
            fork : !d && !hascommonblock,
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

        if(!self.rpc[method]) return Promise.reject('method')

        if(!parsed) parsed = []
        if(!_.isArray(parsed)) parsed = [parsed]

        var err = null
        var time = performance.now()

        return self.checkParameters().then(r => {

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

            var push = _.clone(p)

                push.time = f.now()

            self.events.push(push)

            var d = self.events.length - maxevents

            if (d > 100){
                self.events = self.events.splice(0, d)
            }

            self.eventsCount++

        },

        events : function(){
            return self.events
        },

        rating : function(){
            var s = self.statistic.get() 

            var lastblock = self.lastblock() || {}

            var status = self.chainStatus()

            console.log("rating")

            if(cachedrating){

                if(f.date.addseconds(cachedrating.time, 5) > new Date()){
                    return cachedrating.result
                }
            }

            console.log("ratingCalc")

            ///

            var difference = status.difference || 0
            if (difference > 0) difference = 0
                difference = -difference

            ///

            if (status.fork && difference > 5 || difference > 100) return 0
            if(!s.success || !lastblock.height) return 0
            if (self.testing) return 0
            ///

            var time = s.time;
            var rate = (self.statistic.rate() || 0) + 1

            if (time && time > 0 && time <= 200) time = 200
            if (time && time > 200 && time <= 400) time = 300
            if (time && time > 400 && time <= 700) time = 500
            if (time && time > 700 && time <= 1300) time = 1000
            if (time && time > 1300 && time <= 2300) time = 1700
            if (time && time > 2300 && time <= 4000) time = 3100
            if (time && time > 4000 && time <= 7000) time = 5300
            if (time && time > 7000 && time <= 15000) time = 10000

            if (rate <= 2) rate = 1.5
            if (rate > 2 && rate <= 4) rate = 3
            if (rate > 4 && rate <= 8) rate = 6
            if (rate > 8 && rate <= 16) rate = 12
            if (rate > 16 && rate <= 30) rate = 23
            if (rate > 30 && rate <= 50) rate = 40
            if (rate > 50 && rate <= 100) rate = 75

            var userski = 1 //_.toArray(wss.users).length + 1

            var result = (s.percent  * (lastblock.height || 1) ) / 
            ( userski * rate * (time) * (difference + 1) )
    
            cachedrating = {
                result : result,
                time : new Date()
            }

            return  result
        },

        better : function(){
            var nodes = []
            var rating = this.rating()
            var status = self.chainStatus()

            var difference = status.difference || 0

            if (manager){
                nodes = _.filter(manager.nodes, function(node){

                    if(node.key == self.key) return false

                    var nodestatus = node.chainStatus()
                    var nodedifference = nodestatus.difference || 0

                    return node.statistic.rating() > rating && nodedifference >= difference
                })
            }

            return nodes
        },

        probabilityNodes : function(nodes){
            var total = 0

            _.each(nodes, function(node){

                total += node.statistic.rating()
            })

            if(!total) {

                if(!nodes.length) return 1

                return 1 / nodes.length
            }

            return (self.statistic.rating() / total)
        },

        probability : function(){

            if(!manager) return 1

            return this.probabilityNodes(manager.nodes)

        },

        rate : function(){
            var s = f.date.addseconds(f.now(), -10)
            var l = self.events.length
            var c = 0

            while (l && self.events[l - 1].time > s){

                
                c++
                l--
            }

            return c / 10


        },

        get : function(){
            
            var r = {
                success : 0,
                failed : 0,
                time : 0,
                count : self.events.length,
                allcount : self.eventsCount,
                rate : self.statistic.rate()
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


                self.info().catch(e => {})

                statisticInterval = setInterval(function(){

                    self.statistic.clearOld()


                    if (self.events.length < 1 + checkEventsLength || f.date.addseconds(lastinfoTime, notactualevents / 1000) < f.now()){

                        self.info().catch(e => {})

                    }

                }, getinfointervaltime * 10)
            }
        },

        clearinterval : function(){
            if (statisticInterval){
                clearInterval(statisticInterval)
                statisticInterval = null
            }
        },

        clearOld : function(){

            var timecheck = f.date.addseconds(f.now(), -notactualevents / 1000)

            self.events = _.filter(self.events, function(e){

                if(e.time < timecheck) return false

                return true
            })

            self.eventsCount = self.events.length
        }
    }

    self.needToChange = function(){
        var betterNodes = self.statistic.better()


        if(!betterNodes.length) return false

        betterNodes.push(self)

        var np = _.map(betterNodes, function(node){
            return {
                node : node,
                probability : node.statistic.probabilityNodes(betterNodes)
            }
        })

        var current = np[np.length - 1];

        var total = 0;

        _.each(np, function(nn, i){
            nn.probability = nn.probability - current.probability

            if(i != np.length - 1){
                total += nn.probability
            }
        })

        np[np.length - 1].probability = 1 - total

        return np
    }

    self.changeNodeUser = function(address, np){
        //if(address && wss.changing[address]) return null

        var r = f.randmap(np)

        if(!r) return null

        if(r.node.key == self.key) return null

        return r.node
    }

    var changeNodeUsers = function(){
        var np = self.needToChange()

        if(!np) return 


        _.each(wss.users, function(user, address){
            var change = self.changeNodeUser(address, np)


            if (change && wss.users[address]){

                wss.users[address].emit('changenode', {
                    node : change.exportsafe()
                })
            
                wss.changing[address] = true
            }
        })
    }

    self.checkParameters = function(){

        var e = self.checkParametersS()

        if(e) return Promise.reject('validateHost')
        
        return Promise.resolve()
    }

    self.checkParametersS = function(){
        if(!self.hostchecked){
            if(!self.host || !f.validateHost(self.host)) { return 'validateHost'}
        }

        self.hostchecked = true

        if(!self.port) return 'port'
        if(!self.ws) return 'ws'
        
        return null
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

            nodes = _.filter(nodes, function(node){
                return !node.checkParametersS()
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

        if (self.testing){
            return Promise.resolve(lastinfo || {})
        }


        return self.rpcs('getnodeinfo').then(info => {


            lastinfo = info
            lastinfoTime = f.now()

            if (info.proxies){

                //self.proxies.kit.addlist(info.proxies || [])

                //manager.proxy.kit.addproxies(info.proxies || [])
            }


            self.addblock(info.lastblock)
            
            /*self.currentBlock = info.lastblock.height
            
            timedifference(info.time)*/

            return Promise.resolve(info)
        })  
    }

    self.update = function(options){

        var updated = {}

        _.each(self.updating, function(k){
            if (options[k]){
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
            testing : self.testing,
            stable : self.stable,
            canuse : (s.success > 0 && lastblock.height) ? true : false,
            local : self.local || false,
            peer : self.peer,
            wssusers : _.toArray(wss.users).length
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

    self.test = function(scenario){

        self.testing = scenario

        self.statistic.clear()


        return test.scenarios[scenario]().then(r => {

            self.testing = false

            return Promise.resolve(r)

        })

    }

    self.reservice = function(){
        if (wss.service){
            wss.service.disconnect()
        }
        else{
            serviceConnection()
        }
    }

    self.init = function(){

        
        self.statistic.interval()

        serviceConnection()

        if(!changeNodeUsersInterval)
            changeNodeUsersInterval = setInterval(changeNodeUsers, 10000)

        return self
    }

    self.destroy = function(){
        self.statistic.clearinterval()

        if(changeNodeUsersInterval){
            clearInterval(changeNodeUsersInterval)
            changeNodeUsersInterval = null
        }

        if (wss.service) {
            wss.service.disconnect()

            
        }
    }

    self.wss = {
        count : function(){
            return _.toArray(wss.users).length
        },
        add : function(user){
            var old = wss.users[user.address]

            if (old) {
                if(old.closed) old.disconnect()
            }

            delete wss.changing[user.address]

            

            if(!wss.users[user.address]){
                wss.users[user.address] = (new Wss(self)).connect(user)


                return wss.users[user.address]
            }
            
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