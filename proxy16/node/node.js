
var RpcClient = require('./rpc');
var f = require('../functions');
const { performance } = require('perf_hooks');
var Test = require('./testnode.js');
var Wss  = require('./wss.js');

var Node = function(options, manager){

    const notactualevents = 360000 //mult
    const getinfointervaltime = 120000 
    const maxevents = 10000
    const maxeventsHistory = 30 /// 5min
    const eventschecktime = 10000

    var self = this
    var lastinfo = null
    var cachedrating = null
    var chain = [];

    self.updating = ['rpcuser', 'rpcpass', 'ws', 'name']

    self.host = options.host
    self.port = options.port
    self.rpcuser = options.rpcuser || ""
    self.rpcpass = options.rpcpass || ""
    self.ws = options.ws
    self.name = options.name || "Pocketnet Node"
    self.stable = options.stable || false
    self.addedby = options.addedby || ''
    self.peer = options.peer || false
    self.local = options.local || false
    self.testing = false
    self.id = f.makeid()

    var statisticInterval = null
    var changeNodeUsersInterval = null
    var lastinfoTime = null
    var eventscheckInterval = null

    var test = new Test(self, manager)

    var wss = {
        service : null,
        users : {},
        changing : {}
    }

    var penalty = {
        k : 0,

        reason : null,
        timer : null,
        time : null,
        started : null,

        set : function(_k, time, reason){

            if(_k < 0 || _k > 1) return
            if(penalty.k || !time || !reason || !_k) return

            penalty.reason = reason
            penalty.started = new Date()
            penalty.time = time
            penalty.k = _k

            penalty.timer = setTimeout(function(){
                penalty.clear()
            }, time)
        },

        clear : function(){
            
            penalty.clearTimer()

            penalty.k = 0;
            penalty.time = null;
            penalty.started = null;
            penalty.reason = null;

        },

        clearTimer : function(){

            if (penalty.timer){

                clearTimeout(penalty.timer)
                penalty.timer = null

            }
        },

        getk : function(){
            return 1 - penalty.k
        },

        get : function(){

            return {
                k : penalty.k,
                reason : penalty.reason,
                time : penalty.time,
                started : penalty.started,
            }

        }
    }


    var serviceConnection = function(){
        if(!wss.service && manager){
     
            wss.service = (new Wss(self, manager.proxy.kit.service())).connect()

            wss.service.on('disconnected', function(){
                wss.service = null
                serviceConnection()
            })

        }
    }

    var closeService = function(){
        if (wss.service){
            wss.service.disconnect()
            wss.service = null
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
    
    self.penalty = function(){
        return penalty.get()
    }

    self.height = function(){
        var lastblock = self.lastblock() || {}

        return lastblock.height || 0
    }   

    self.lastblock = function(){
        if(chain.length) return chain[chain.length - 1]

        return null
    }

    self.getchain = function(){
        return chain
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

            chain = f.lastelements(chain, 150, 10)

        }
    }

    self.chain = function(){
        return chain
    }

    self.chainStatus = function(){
        if(!manager || !chain.length) return {}

        var cs = manager.currentChainCommon2()
        var lastblock = self.lastblock()

        if(!cs || !lastblock) return {}

        var d = lastblock.height - cs.commonHeight

        var counter = 0
        var dcounter = 0

        _.each(cs.lasttrustblocks, function(tblock){
            var bc = _.find(chain, function(c){
                return c.height == cs.tblock
            })

            if (bc){
                counter++

                if(bc.blockhash != tblock.blockhash) dcounter++
            }   
        })

        return {
            fork : dcounter / counter < 0.5,
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

                    if(err.code == 521) penalty.set(0.8, 120000, '521')
                    if(err.code == 408) penalty.set(0.5, 30000, '408')
                    if(err.code == 429) penalty.set(0.3, 10000, '429')
    
                }	

                self.statistic.add({
                    code : code,
                    difference : difference,
                    method : method
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

    var statistic = {
        events : null,
        bymethods : null,
        history : [],
        historyslice : null
    }

    self.statistic = {

        clear : function(){
            self.events = []
            self.eventsCount = 0

            statistic = {
                events : null,
                bymethods : null,
                history : [],
                historyslice : null
            }
        },

        add : function(p){


            var push = _.clone(p)

                push.time = new Date()

            self.events.push(push)

            if(!self.inited){
                var d = self.events.length - maxevents

                if (d > 100){
                    self.events = self.events.splice(0, d)
                }
            }

            self.eventsCount ++

        },

        mixeventsArray : function(objs){

            var common = {
                success : 0,
                failed : 0,
                count : 0,
                time : 0,
                rate : 0,
                percent : 0
            }

            _.each(objs, function(obj){
                common.success += obj.success || 0
                common.failed += obj.failed || 0
                common.count += obj.count || 0
            })

            if (common.count){

                _.each(objs, function(obj){
                    common.time += (obj.time || 0) * (obj.count || 0)
                    common.rate += (obj.failed || 0) * (obj.count || 0)
                    common.percent += (obj.percent || 0) * (obj.count || 0)
                })    

                common.time = common.time / common.count
                common.rate = common.rate / common.count
                common.percent = common.percent / common.count

            }
            else{
                common.time = 0; common.rate = 0; common.percent = 0;
            }

            common.date = new Date()

            return common

        },

        mixevents : function(obj1, obj2){


            var common = {}


            if(!obj1) obj1 = {}
            if(!obj2) obj2 = {}

            common.success = (obj1.success || 0) + (obj2.success || 0)
            common.failed = (obj1.failed || 0) + (obj2.failed || 0)
            common.count = (obj1.count || 0) + (obj2.count || 0)    

            if (common.count){
                common.time = ((obj1.time || 0) * (obj1.count || 0) + (obj2.time || 0) * (obj2.count || 0)) / common.count
                common.rate = ((obj1.rate || 0) * (obj1.count || 0) + (obj2.rate || 0) * (obj2.count || 0)) / common.count
                common.percent = ((obj1.percent || 0) * (obj1.count || 0) + (obj2.percent || 0) * (obj2.count || 0)) / common.count
            }
            else{
                common.time = 0; common.rate = 0; common.percent = 0;
            }

            common.date = obj2.date || obj1.date || new Date()

            return common

        },

        gethistory : function(){
            return statistic.history
        },

        fixhistory : function(e){
            statistic.history.push(e)

            var d = statistic.history.length - maxeventsHistory

            if (d > maxeventsHistory / 10){
                statistic.history = statistic.history.splice(0, d)
            }

            statistic.historyslice = self.statistic.mixeventsArray(statistic.history)

        },

        eventsfix : function(){

            var groupedByMethods = self.statistic.getGroupedByMethods()
            var events = self.statistic.get()


            statistic.events = self.statistic.mixevents(statistic.events, events)

            var emap = {}

            statistic.bymethods || (statistic.bymethods = {})

            _.each(groupedByMethods, function(v,i){emap[i] = i})
            _.each(statistic.bymethods, function(v,i){emap[i] = i})

            _.each(emap, function(i){
                statistic.bymethods[i] = self.statistic.mixevents(statistic.bymethods[i], groupedByMethods[i])
            })

            self.statistic.fixhistory(events)

            self.events = []
        },

        rate : function(method){
            var s = f.date.addseconds(new Date(), - eventschecktime / 1000)
            var l = self.events.length
            var c = 0

            if(l){
                while (l && self.events[l - 1].time > s){

                    if(!method || self.events[l - 1].method == method){
                        c++
                    }

                    l--
                }
            }

            return c / (eventschecktime / 1000)
        },

        getGroupedByMethods : function(){
            var ms = {}

            _.each(self.events, function(e){
                
                if(e.method && !ms[e.method]) {
                    ms[e.method] = self.statistic.get(e.method)
                }

            })


            return ms
        },

        getst : function(){
            if(!statistic.events) self.statistic.eventsfix()

            return statistic.events
        },

        get5min : function(){
            if(!statistic.events) self.statistic.eventsfix()

            return statistic.historyslice
        },

        get : function(method){

            var evt = _.filter(self.events, function(l){
                if (method && l.method != method) return false

                return true
            })
            
            var r = {
                success : 0,
                failed : 0,
                time : 0,
                count : evt.length,
                rate : self.statistic.rate(method),
                date : lastinfoTime || null
            }

            _.each(evt, function(l){

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

        events : function(){
            return self.events
        },

        calcAvailability : function(s){

            if(!s.count) return 0.01

            var time = s.time;
            var rate = (s.rate || 0) + 1

            if (time && time > 0 && time <= 200) time = 200
            if (time && time > 200 && time <= 400) time = 300
            if (time && time > 400 && time <= 700) time = 500
            if (time && time > 700 && time <= 1300) time = 1000
            if (time && time > 1300 && time <= 2300) time = 1700
            if (time && time > 2300 && time <= 4000) time = 3100
            if (time && time > 4000 && time <= 7000) time = 5300
            if (time && time > 7000 && time <= 15000) time = 10000
            if (time && time > 15000) time = 30000

            if (rate <= 2) rate = 1.5
            if (rate > 2 && rate <= 4) rate = 3
            if (rate > 4 && rate <= 8) rate = 6
            if (rate > 8 && rate <= 16) rate = 12
            if (rate > 16 && rate <= 30) rate = 23
            if (rate > 30 && rate <= 50) rate = 40
            if (rate > 50 && rate <= 100) rate = 75

            return (s.percent / (rate * time))

        },

        rating : function(){

            if(cachedrating){
            
                if(f.date.addseconds(cachedrating.time, 10) > new Date()){
                    return cachedrating.result
                }
            }

            

            var lastblock = self.lastblock() || {}
            var result = 0;

            if(
                (!lastblock.height) || (self.testing)
                || (!self.inited)
            ){

            }
            else{

                var status = self.chainStatus()

                var difference = status.difference || 0

                if (difference > 0) difference = 0
                    difference = -difference
                if (
                    (status.fork && difference > 5 || difference > 50)
                ){

                }
                else{

                    var s = self.statistic.getst()
                    var slice = statistic.historyslice


                    var availabilityAllTime = self.statistic.calcAvailability(s)
                    var availability5Minutes = self.statistic.calcAvailability(slice)
                    ///
        
        
                    var usersl = _.toArray(wss.users).length + 1
                    var userski = 1
        
                    if (usersl > 0 && usersl <= 10) userski = 1
                    if (usersl > 10 && usersl <= 100) userski = 10
                    if (usersl > 100 && usersl <= 500) userski = 100
                    if (usersl > 500 && usersl <= 1000) userski = 500
                    if (usersl > 1000) userski = 1000
        
                    result = penalty.getk() * (Math.sqrt(availabilityAllTime * availability5Minutes) * ((lastblock.height || 1) / (userski) * (difference + 1)))
                }
            }

            ///
    
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

        
        

        interval : function(){
            if(!statisticInterval){


                self.info().catch(e => {})

                statisticInterval = setInterval(function(){

                    //self.statistic.clearOld()

                    if (
                        
                        /*self.events.length < 1 + checkEventsLength ||*/
                        
                        !lastinfoTime || f.date.addseconds(lastinfoTime, notactualevents / 1000) < new Date()){

                        self.info().catch(e => {})

                    }

                }, getinfointervaltime)
            }
        },

        clearinterval : function(){
            if (statisticInterval){
                clearInterval(statisticInterval)
                statisticInterval = null
            }
        },

        clearOld : function(){

            var timecheck = f.date.addseconds(new Date(), -notactualevents / 1000)

            self.events = _.filter(self.events, function(e){

                if(e.time < timecheck) return false

                return true
            })

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

        if(e) return Promise.reject(e)
        
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
        }).then(r => {

            if(!self.bchain){
                return Promise.reject('bchain')
            }

            var bchain = 'main'

            if(f.deep(manager,'proxy.test')) bchain = 'test'
            if(self.bchain != bchain) Promise.reject('bchain')

            return Promise.resolve(r)

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

        lastinfoTime = new Date()

        return self.rpcs('getnodeinfo').then(info => {

            lastinfo = info

            self.bchain = info.chain

            if (info.proxies){

                //self.proxies.kit.addlist(info.proxies || [])

                //manager.proxy.kit.addproxies(info.proxies || [])
            }

            self.addblock(info.lastblock)
            
            /*timedifference(info.time)*/

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

        var s = self.statistic.getst()

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
            wssusers : _.toArray(wss.users).length,
            bchain : self.bchain
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
        closeService()
        serviceConnection()
    }

    self.forget = function(){
        self.destroy()
    }

    self.init = function(){

        self.statistic.interval()

        serviceConnection()

        if(!changeNodeUsersInterval)
            changeNodeUsersInterval = setInterval(changeNodeUsers, 10000)

        self.inited = true
        self.initedTime = new Date()

        if(!eventscheckInterval)
            eventscheckInterval = setInterval(self.statistic.eventsfix, eventschecktime)

        return self
    }

    self.destroy = function(){
        self.statistic.clearinterval()

        if(changeNodeUsersInterval){
            clearInterval(changeNodeUsersInterval)
            changeNodeUsersInterval = null
        }

        if(eventscheckInterval){
            clearInterval(eventscheckInterval)
            eventscheckInterval = null
        }

        closeService()

        self.inited = false
        self.initedTime = null
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