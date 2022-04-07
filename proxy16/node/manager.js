
var Node = require('./node');
var Datastore = require('nedb');
var _ = require('lodash');
var f = require('../functions');
const { performance } = require('perf_hooks');
const queuemethods = {
    getcontents: true,
    getlastcomments: true,
    gettags: true,
    getrawtransactionwithmessage: true,
    getuserprofile: true,
    getuserstate: true,
    getaddressregistration: true,
    getrecommendedposts: true,
    gethotposts: true,
    getuseraddress: true,
    search: true,
    searchlinks: true,
    getcomments: true,
    getaddressscores: true,
    getaccountsetting : true,
    getpostscores: true,
    getpagescores: true,
    gethierarchicalstrip : true,
    getusercontents : true,
    getcontentsstatistic : true
}

const exepmethods = {
    getnodeinfo : true
}

var Nodemanager = function(p){
    if(!p) p = {};


    var self = this;
    var inited = false;
    var cachedchain = null

    self.askedpeers = {};
    self.peers = {}
    self.bestnode = ''
    self.bestnodes = []

    //// using
    self.nodes = [];
    self.nodesmap = {};
  
    var statscalculationInterval = null
    var statscalculationTime = 5000
    var findInterval = null
    var safetimeout = 1000
    var peernodesCheckTime = 1000000
    var usersfornode = 30
    var commonnotinitedInterval = null
    var queue = []
    var queueInterval = null

    var minnodescount = global.MIN_NODES_COUNT || 1

    var db = new Datastore(f.path(p.dbpath));
   
    self.remap = function(){
        self.nodesmap = {};

        _.each(self.nodes, function(node){
            self.nodesmap[node.key] = node
        })
    }

    self.revoke = function(_p, admin){
        var unode = new Node(_p, self)

        var node = self.nodesmap[unode.key]

        if (node && node.addedby && (node.addedby == unode.addedby || admin)){

            self.remove(unode.key)

            self.remap()

            return new Promise((resolve, reject) => {
                db.remove({ key: unode.key }, { multi: true }, function (err, numRemoved) {
                    if(err) return reject(err)
                    resolve(node)
                });
            })
        }

        else
        return Promise.reject('cantremove')


    }

    self.update = function(_p, admin){

        var unode = new Node(_p)

        var node = self.nodesmap[unode.key]

        return unode.check().then(r => {

            if (node && node.addedby && (node.addedby == unode.addedby || admin)){

                var updated = node.update(unode)

                node.statistic.clear()
                
                return new Promise((resolve, reject) => {
                    db.update({ key: unode.key }, { $set: { data: updated } }, {}, function (err) {
                        if(err) return reject(err)
                        resolve(node)
                    });
                })
            }
    
            else{
                return Promise.reject('cantupdate')
            }

        })
        
    }

    self.temp = function(_p){

        var node = new Node(_p, self)

        return node
        
    }

    self.remove = function(key){
        var node = self.nodesmap[key]

        if (node){
            node.destroy()

            node.removed = true

            self.nodes = _.filter(self.nodes, function(node){
                return !node.removed
            })

            self.remap()
        }
        
    }

    self.getNotinitedInfo = function(){
        var notinitednodes = _.filter(self.nodes, function(node){
            return !node.inited
        })

        _.each(notinitednodes, function(node){
            node.info().catch(e => {})
        })
    }

    self.find = function(){

        var notinitednodes = _.filter(self.nodes, function(node){
            return !node.inited
        })

        _.each(_.shuffle(notinitednodes), function(node){
            self.initIfNeed(node)
        })
        _.each(_.shuffle(self.nodes), function(node, i){

            if(i < 5){
                self.api.peernodesTime(node).then(r => {}).catch(e => {})
            }
            
        })

        forgetIfNotUsing()

    }

    self.similarnodes = function(node, count){
        var withrating = _.shuffle(self.initednodeswithrating())
        var i = 0
        var mylastblock = node.lastblock()
        

        if(!mylastblock) return []

        var similar = _.filter(withrating, function(_node){
            
            if(i >= count) return
            
            if (_node.key != node.key){

                var lastblock =  _node.lastblock()

                if(lastblock) {
                    if(lastblock.hash == mylastblock.hash){
                        i++
                        return true
                    }
                }
            }
        })

        return similar
    }

    self.rpcs = function(node, method, parameters, clbks, time){

        if (time){
            time.rpcsstart = performance.now() - time.b
        }

        return node.rpcs(method, _.clone(parameters), time).then(r => {

            if (time){
                time.rpcsend = performance.now() - time.b
            }

            clbks.resolve(r)

        }).catch(clbks.reject)

    }

    var runrpcswideclbks = function(e, r, clbks, responses, need, result, error, fromadd, time){
        if (responses >= need){
            return responses
        }

        if (e){
            
            responses++

        }

        if (typeof r != 'undefined'){
            responses = need
        }

        if (time){
            if(!time.runrpcswideclbks) time.runrpcswideclbks = []

            time.runrpcswideclbks.push({
                t : performance.now() - time.b,
                e : e ? 1 : 0,
                r : r ? 1 : 0,
                a : fromadd ? 1 : 0
            })
        }

        if (responses >= need){

            if(fromadd){
            }
            else{
            }
            
            if(typeof result != 'undefined') clbks.resolve(result)

            else clbks.reject(error || {
                code : 500,
                text : "rpcswide"
            })
        }

        return responses

    }

    self.rpcswide = function(node, method, parameters, clbks, time){

        var similarnodes = self.similarnodes(node, 1)

        var responses = 0
        var need = Math.min(similarnodes.length + 1, 2) ///race Promise method

        var result = undefined
        var error = undefined


        if (time){
            time.rpcswidestart = performance.now() - time.b
        }

        node.rpcs(method, _.clone(parameters)).then(r => {

            result = r

            responses = runrpcswideclbks(undefined, r, clbks, responses, need, result, error, false, time)
           

        }).catch(e => {

            error = e

            responses = runrpcswideclbks(e, undefined, clbks, responses, need, result, error, false, time)

        })


        if (similarnodes.length)

            setTimeout(function(){

                if(responses < need){

                    Promise.race(_.map(similarnodes, function(n){


                        return n.rpcs(method, _.clone(parameters))

                    })).then(r => {


                        if(typeof result == 'undefined') result = r

                        responses = runrpcswideclbks(undefined, result, clbks, responses, need, result, error, true, time)

                    }).catch(e => {


                        if(typeof error == 'undefined') error = e

                        responses = runrpcswideclbks(e, undefined, clbks, responses, need, result, error, true, time)

                    })

                }

            }, safetimeout)
            

    }

    self.exepmethod = function(node, method, parameters, clbks, time){

        node.checkParameters().then((r) => {

            if(!node.exepmethod[method]){
                return Promise.reject('exepmethod')
            }

            return node.exepmethod[method](method, parameters);

        }).then(clbks.resolve).catch(clbks.reject)

    }

    self.queue = function(node, method, parameters, direct, clbks, time){
        if(!clbks) clbks = {}

        if (exepmethods[method]){

            self.exepmethod(node, method, parameters, clbks, time)

            return
        }

        if (direct || !queuemethods[method]){

            self.rpcs(node, method, parameters, clbks, time)
        }

        else{

            addqueue({
                node, method, parameters, clbks, time
            })
        }
    }

    var addqueue = function(p){

        if (p)
            queue.push(p)

    }

    var worker = function(){


        var now = performance.now()

        for (var i = 0; i < queue.length; i++){

            var rpcs = queue[i]

            self.rpcswide(rpcs.node, rpcs.method, rpcs.parameters, rpcs.clbks, rpcs.time)
        }

        var dif = performance.now() - now


        queue = []
    }

    var getnodeinfo = function(){
        
    }

    var saveNodes = function(nodes){

        _.map(nodes, function(node){

            var exp = node.export()

            if (exp.bchain)
                db.find({key : node.key}).exec(function (err, docs) {

                    if(!err){
                        if (docs.length){
                            
                        }
                        else{
                            db.insert(exp, function(err, docs) {})
                        }
                    }

                })
           
        })

       
    }

    self.addfromtemp = function(nodekey){

        var notinitednodes = _.filter(self.nodes, function(node){
            return !node.inited
        })

        var node = _.find(notinitednodes, function(node){
            return node.key == nodekey
        })

        if(!node){
            return Promise.reject('nodenotfound')
        }

        node.init()

        return Promise.resolve(node)
    }

    var getWorkingNodes = function(){

        return _.filter(self.nodes, function(n){

            if(!n.inited) return false

            var s = n.statistic.get5min()
            var r = n.statistic.rating()

            var time = 2400

            if (n.wss.count() < 5) time = 7000

            if (s.success > 0 && s.success > s.failed && s.time < time && r && n.penalty().k < 0.8){
                return true
            }
        })
    }

    self.initIfNeed =  function(node){

        if(!node.eventsCount) return

        var workingNodes = getWorkingNodes()


        if (workingNodes.length < minnodescount || !usersfornode || self.proxy.users() / usersfornode >= workingNodes.length){


            node.init()
        }
        
    }

    var forgetIfNotUsing = function(){

        var workingNodes = getWorkingNodes()


        if (workingNodes.length < minnodescount || !usersfornode || self.proxy.users() / usersfornode >= workingNodes.length || workingNodes.length <= 1){

        }else{

            _.each(self.nodes, function(n){

                if(n.inited){

                    if(!n.wss.count()){

                        if(f.date.addseconds(n.initedTime, 60) > new Date()){
                        }
                        else{
                            n.forget()
                        }
                        

                    }
                    else{
                    }
                }

            })
           
        }
    }

    /// add to main
    self.add = function(node){

        if(!self.nodesmap[node.key]){
            self.nodes.push(node);
            self.remap()
        }
    }
    
    self.create = function(p){

        //// n/u

        if(!p.addedby) return Promise.reject('unathorized')

        var node = new Node(p)

        if(node.localhost()) return Promise.reject('localhost')

        return node.check().then(r => {

            self.add(node);

            return new Promise((resolve, reject) => {
                db.insert(node.export()).exec(function (err, docs) {
                    if(err) return reject(err)
                    resolve(docs)
                })
            })
             
        })
        
    }

    /*self.currentChainCommon = function(){

        if(!self.nodes.length) return null

        if(cachedchain){
            if(f.date.addseconds(cachedchain.time, 60) > new Date()){
                return cachedchain.result
            }
        }

        var commonHeight = 0,
            commonBlockHash = '',
            maxHeight = 0;

        var lastblocks = _.filter(_.map(self.nodes, function(node){
            return node.lastblock()
        }), lb => {return lb})
        
        if(!lastblocks.length) return null

        maxHeight = _.maxBy(lastblocks, function(r){ return r.height }).height

        var hlastblocks = f.group(lastblocks, function(lb){ return lb.height })

        var kmc = 0

        _.each (hlastblocks, function(b, i){
            if (b.length > kmc || (b.length >= kmc && commonHeight < i) ) {
                kmc = b.length
                commonHeight = i
            }
        })

        var halastblocks = f.group(lastblocks, function(lb){ return lb.blockhash })

        var hmc = 0

        _.each (halastblocks, function(b, i){
            if (b.length > hmc || (b.length >= hmc && commonHeight < i) ) {
                hmc = b.length
                commonBlockHash = i
            }
        })

        var c = _.reduce(self.nodes, function(s, n){
            return s + (n.chain() || []).length
        }, 0) / self.nodes.length

        var result = {
            commonHeight : commonHeight,
            maxHeight : maxHeight,
            commonBlockHash : commonBlockHash,
            chainlength : c
        }

        cachedchain = {
            result : result,
            time : new Date()
        }

        return result

    }*/

    self.currentChainCommon2 = function(){

        if(!self.nodes.length) return null

        if(cachedchain){
            if(f.date.addseconds(cachedchain.time, 30) > new Date()){
                return cachedchain.result
            }
        }

        var chains = _.map(self.nodes, function(node){
            return node.getchain()
        })

        var heightmap = {}
        var chainmap = {}
        var commonchain = {};
        var commonchainArray = []
        var heightpoint = 1
        var hashpoint = 1
        var hashmap = {}

        _.each(chains, function(chain){

            _.each(chain, function(chainlink, i){
                if(!heightmap[chainlink.height]) 
                    heightmap[chainlink.height] = 0; 
                    heightmap[chainlink.height] ++

                if(!chainmap[chainlink.height]) 
                    chainmap[chainlink.height] = {}

                if(!chainmap[chainlink.height][chainlink.blockhash]) 
                    chainmap[chainlink.height][chainlink.blockhash] = 0; 
                    chainmap[chainlink.height][chainlink.blockhash] ++;

                //if(!hashmap[chainlink.blockhash]) hashmap[chainlink.blockhash] = {}

                if(i){
                    hashmap[chainlink.blockhash] = chain[i - 1].blockhash
                }
            })
            
        })

        heightpoint = _.max(_.toArray(heightmap), function(r) {return r})

        _.each(chainmap, function(blockhashes, height){

            var maxhash = null

            _.each(blockhashes, function(count, blockhash){
                if(!maxhash || count > blockhashes[maxhash]) maxhash = blockhash
            })

            if(hashpoint < maxhash) hashpoint = maxhash

            commonchain[height] = {
                blockhash : maxhash,
                actual : blockhashes[maxhash] / hashpoint >= 0.5
            }
            
        })
        
        commonchainArray = _.map(commonchain, function({blockhash, actual}, height){

            return {
                blockhash, 
                height,
                actual_h : heightmap[height] / heightpoint >= 0.5,
                actual_b : actual
            }

        })

        commonchainArray = _.sortBy(commonchainArray, function(v){
            return Number(v.height)
        })

        if(!commonchainArray.length){
            return {}
        }

        var lastchain = commonchainArray[commonchainArray.length - 1]
        var maxHeight = lastchain.height

        var commonBlockHash = null
        var commonHeight = 0
        var lasttrustblocks = []

        for(var i = commonchainArray.length - 1; i >= 0; i--){
            var chainlink = commonchainArray[i]

            if(!commonBlockHash && chainlink.actual_b) commonBlockHash = chainlink.blockhash
            if(!commonHeight && chainlink.actual_h) commonHeight = chainlink.height

            if (commonBlockHash && lasttrustblocks.length < 6){
                lasttrustblocks.push(chainlink)
            }
        }

        var bestHeight = 0
        for (let key in commonchainArray) {
            let h = Number(commonchainArray[key].height)
            if (h > bestHeight)
                bestHeight = h
        }

        var result = {
            commonHeight,
            maxHeight,
            commonBlockHash,
            lasttrustblocks,
            commonchain : commonchainArray,
            chainmap,
            hashmap,
            chains,
            bestHeight
        }

        cachedchain = {
            result : result,
            time : new Date(),
        }

        return result

    }

    self.getnodes = function(filter){

        var nodes = {}
        var totalpending = self.totalpending()

        _.each(_.filter(self.nodes, filter || function(){return true}), function(node){

            var pending = node.statistic.pending()
            var probability = node.statistic.probability()
            var pendingpercent = totalpending ? pending / totalpending : 0
            var pendingpercentdifference = totalpending ? (pendingpercent - probability) : 0

            nodes[node.key] = {
                node : node.exportsafe(),
                statistic : node.statistic.getst(),
                slice : node.statistic.get5min(),
                /*history : node.statistic.gethistory(),*/
                penalty : node.penalty(),
                status : node.chainStatus(),
                rating : node.statistic.rating(),
                
                users : node.wss.count(),

                probability : probability,
                pending : pending,
                pendingpercent : pendingpercent,
                pendingpercentdifference : pendingpercentdifference
            }
            
        })

        return nodes

    }

    self.totalpending = function(){
        return _.reduce(self.initednodes(), function(r, node){
            return r + node.statistic.pending()
        }, 0)
    }

    self.pendingstatus = function(){
        var totalpending = self.totalpending()

        var nodes = _.map(self.initednodes(), function(node){

            var pending = node.statistic.pending()
            var probability = node.statistic.probability()
            var pendingpercent = totalpending ? pending / totalpending : 0
            var pendingpercentdifference = totalpending ? (pendingpercent - probability) : 0

            return {
                probability : probability,
                pending : pending,
                pendingpercent : pendingpercent,
                pendingpercentdifference : pendingpercentdifference
            }


        })

        return {
            totalpending : totalpending,
            nodes : nodes
        }
    }

    self.extendedStats = function(){

        var r = {}
        var commonStats = {}

        _.each(self.nodes, function(node){
            r[node.key] = node.statistic.getGroupedByMethods()
        })

        return {
            nodes : r
        }
    }

    self.info = function(compact){

        var chaininfo = self.currentChainCommon2()
        var _ch = null

        if(chaininfo){
            var _ch = {
                commonHeight : chaininfo.commonHeight,
                maxHeight : chaininfo.maxHeight,
                bestHeight : chaininfo.bestHeight,
                commonBlockHash : chaininfo.commonBlockHash,
                lasttrustblocks : chaininfo.lasttrustblocks,
            }
        }

        var stats = {
            count : self.nodes.length,
            inited : inited,
            queuelength : queue.length,

            countuse : _.filter(self.nodes, function(node){
                return node.inited && node.export().canuse
            }).length,

            nodes : self.getnodes(function(n){
                return n.inited
            }),

            chain : _ch,
            peers : self.askedpeers,
            tmp : self.getnodes(function(n){
                return !n.inited
            }),

        }

        return stats
    }


    self.init = function(){

        inited = false

        return new Promise((resolve, reject) => {
            db.loadDatabase(err => {

                db.ensureIndex({ fieldName: 'key', unique: true });

                var bchain = 'main'

                if (self.proxy.test) bchain = 'test'

                db.find({bchain}).exec(function (err, docs) {



                    self.nodes = []

                    var haslocal = self.nodeControl.kit.hasbin()

                    var c = []


                    if (haslocal) c = [{
                        host : '127.0.0.1',
                        port : 38081,
                        ws : 8087,
                        name : 'Local Proxy Pocketnet Node',
                        local : true
                    }]

                    docs = _.filter(_.shuffle(docs), function(d, i){
                        if(i < 5) return true
                    })


                    //// remove
                    //docs = []

                   // console.log('docs', docs, p.stable)

                    var nodes = _.map(c.concat(p.stable, docs || []) , function(options){

                        var node = new Node(options, self)

                        self.add(node)

                        return node
                        
                    })

                    self.api.connected(nodes, function(nodes){
                        saveNodes(nodes)
                    })

                    setTimeout(function(){
                        self.find()
                    }, 2000)
                    
                    if(!findInterval)
                        findInterval = setInterval(self.find, 10000)

                    if(!commonnotinitedInterval)
                        commonnotinitedInterval = setInterval(self.getNotinitedInfo, 1000 * 60 * 60 * 2) 

                    if(!queueInterval)
                        queueInterval =  setInterval(worker, 10) 

                    if(!statscalculationInterval)
                        statscalculationInterval = setInterval(function(){
                            self.bestapply()
                            self.bestnodesapply()
                        }, statscalculationTime) 

                    setTimeout(function(){
                        self.bestapply()
                        self.bestnodesapply()
                    }, 2000)

                    inited = true

                    

                    resolve()

                })
            })
        })  
        
    }

    

    self.waitbest = function(timeout){
        return f.pretry(function(){

            return self.selectbest()

        }, 50, timeout)
    }

    self.destroy = function(){

        _.each(self.nodes, function(node){
            node.destroy()
        })

        self.nodes = []
        self.remap()

        cachedchain = null

        if (findInterval) {
            clearInterval(findInterval)

            findInterval = null
        }

        if(!queueInterval){
            clearInterval(queueInterval)
            queueInterval = null
        }

        if(commonnotinitedInterval){
            clearInterval(commonnotinitedInterval)
            commonnotinitedInterval = null
        }

        if(statscalculationInterval){
            clearInterval(statscalculationInterval)
            statscalculationInterval = null
        }
        
    }

    self.initednodes = function(){
        return _.filter(self.nodes, function(n){
            return n.inited
        })
    }

    self.initednodeswithrating = function(){
        return _.filter(self.nodes, function(n){
            return n.inited && n.statistic.rating() > 0
        })
    }


    self.bestlist = function(){
        var nodes = _.sortBy(self.initednodes(), function(node){
            return -node.statistic.probability()
        })

        var ns = _.filter(nodes, function(n, i){
            return i < 3
        })

        return ns
    }

    self.bestnodesapply = function(){

        self.bestnodes = _.map(self.bestlist(), function(n){

            return n.key
        })

    }

    self.bestapply = function(){
        var node = self.selectProbability()

        if (node) {
            self.bestnode = node.key
        }
    }

    self.selectProbability = function(){

        var np = _.map(self.initednodes(), function(node){
            return {
                node : node,
                probability : (Number(node.statistic.probability()) || 0) + Math.random() / 10000
            }
        })

        var r = f.randmap(np)

        if (r && r.node){
            return r.node
        }


        return null
    }

    self.selectbest = function(){

        var canuse = _.filter(self.initednodes(), function(node) { return node.export().canuse })

        var best = _.max(canuse, function(node){
            return node.statistic.rating()
        })
        
        if(!best || !best.statistic.rating()){
            best = _.find(self.initednodes(), function(node){
                return true //node.inited /*&& node.stable*/
            })
        }


        return best
    }

    self.reservice = function(){
        _.each(self.nodes, function(node){

            if (node.inited)
                node.reservice()

        })

        return Promise.resolve()
    }
    //// ??
    self.select = function(n){

        if(!self.initednodes().length){
            return null
        }

        var i = f.rand(1, self.initednodes().length) - 1

        if(!n || n == 'auto'){
            
            return self.nodes[i]
        }

        return self.nodesmap[n]

    }

    self.waitreadywithrating = function(){

        return f.pretry(()=>{
            return inited && self.initednodeswithrating().length
        }, 30, 10000)
    }

    self.waitready = function(){

        return f.pretry(()=>{
            return inited && self.initednodes().length
        }, 30, 10000)

    }

    self.request = function(method, parameters){

        return self.waitready().then(() => {

            var node = self.selectbest()
    
            if(!node) return Promise.reject('node')

            return node.rpcs(method, parameters)
        })
    }

    self.requestprobnew = function(method, parameters){

        return self.waitready().then(() => {

            var node = self.selectProbability();
    
            if(!node && self.bestnode) 
                node = self.nodesmap[self.nodeManager.bestnode]
    
            return node.rpcs(method, parameters)

        })
    }
    
    self.api = {
        ///
        connected : function(nodes){
            var connected = []

            var promises = _.map(nodes, function(node){

                return node.info().then(r => {

                    var bchain = 'main'

                    if (self.proxy.test) bchain = 'test'

                    if(node.bchain != bchain){
                        return Promise.reject('bchain')
                    }

                    connected.push(node)

                }).catch(e => {

                    return Promise.reject({
                        e : e,
                        node : node
                    })
                })
            })

            return Promise.all(promises).catch(en => {
                return Promise.resolve(connected)
            }).then(r => {
                return Promise.resolve(connected)
            })

        },  

        clearAlltimeNodesStats : function(){
            _.each(self.nodes, function(n){
                n.statistic.clearAlltime()
            })
        },
        
        peernodesTime : function(node){

            var last = self.askedpeers[node.key]

            if(!last || f.date.addseconds(last, peernodesCheckTime / 1000) < new Date()){

                self.askedpeers[node.key] = new Date()

                return self.api.peernodes(node).then(r => {
                    return Promise.resolve(r)
                })
            }   

            return Promise.resolve()
        },
       
        peernodes : function(node){

            //return Promise.resolve()
  
            return node.peers().then(nodes => {
                

                nodes = _.filter(nodes, function(n){
                    return !self.nodesmap[n.key] && !self.peers[n.key]
                })

                _.each(nodes, function(n){
                    if(!self.peers[n.key])
                        self.peers[n.key] = n
                })

                return self.api.connected(nodes)
                
            }).then(connected => {

                _.each(connected, function(node){
                    self.add(node)
                })

                saveNodes(connected)

                self.remap()

                return Promise.resolve(connected)
            })
        },
    
    }

   
		
    return self;
}

module.exports = Nodemanager