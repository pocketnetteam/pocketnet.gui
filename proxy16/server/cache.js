var f = require('../functions');
var _ = require('lodash');

var Cache = function(p){
    var self = this;

    var storage = {}
    var waiting = {}
    var smart = {}

    var softclearInterval = null
    var softclearTime = 10000

    var workerInterval = null
    var workerTime = 200
    var waittime = 8500

    var ckeys = {}

    var worker = function(){

        _.each(waiting, function(w){
            _.each(w, function(k, key){
                executingWatcher(k, key)
            })
        })
    }

    var executingWatcher = function(k, key, ignoredate){

        var itemswithattemp = []
        var now = new Date()

        _.each(k.clbks, function(c, waitid){

            if (ignoredate || c.date < now){

                if (c.action)
                    itemswithattemp.push([c,waitid])

                if (k.executor == waitid){
                    delete k.executor
                }
            }
        })

       
        
        if (itemswithattemp.length){

            k.attemp++

            if (k.attemp >= 3){

                _.each(itemswithattemp, function(ce){
                    ce[0].action('attemps')
                    delete k.clbks[ce[1]]
                })

                if(_.isEmpty(k.clbks)){
                    delete k[key]
                }

                k.attemp = 0

            }
            else{

                var newexecutor = itemswithattemp[f.rand(0, itemswithattemp.length - 1)]

                _.each (itemswithattemp, function(ce){
                    ce[0].date = f.date.addseconds(ce[0].date, waittime / 1000)
                })
                
                k.executor = newexecutor[1]
                newexecutor[0].action('execute')

                delete k.clbks[k.executor]


            }

        }

    }
    
    if (!p.dontCache)
    {
        ckeys = {
            /*getuserstatistic: {
                time : 960,
            },*/
            // node +
            getlastcomments : {
                time : 960,
                block : 0
            },

            // node +
            getcomments : {
                time : 360,
                block : 0
            },

            // node + , add block
            getuseraddress : {
                time : 82000
            },

            // node +
            search: {
                time : 6000
            },
            
            // node +
            gettags : {
                time : 82000
            },

            // node -
            getnodeinfo : {
                time : 360,
                block : 0
            },

            // node +
            getrawtransactionwithmessagebyid: {
                time : 460,
                block : 0,
                /*smart : {
                    idin : '0',
                    idou : 'txid',
                    storage : 'shares',
                    get : true
                }*/
            },
            
            // node +
            getrawtransactionwithmessage: {
                time : 460,
                block : 0,
                /*smart : {
                    idin : '0',
                    idou : 'txid',
                    storage : 'shares'
                }*/
            },

            // ?
            getrawtransaction: {
                time : 460,
                block : 0
            },

            // node +
            getusercontents: {
                time : 760,
            },

            // node +
            gethierarchicalstrip: {
                time : 460,
                block : 0,
                /*smart : {
                    idin : '0',
                    idou : 'txid',
                    storage : 'shares'
                }*/
            },  

            // node +
            gethotposts: {
                time : 460,
                block : 0
            },

            // node +
            getuserprofile: {
                time : 560,
                block : 0,
                /*smart : {
                    idin : '0',
                    idou : 'address',
                    storage : 'getuserprofile',
                    get : true
                }*/
            },

            getuserstate : {
                time : 560,
                block : 0
            },

            // node +
            getpagescores: {
                time : 460,
                block : 0
            },
            
            // node +
            getcontents: {
                time : 82000,
            },

            // node +
            getmissedinfo: {
                time : 560,
                block : 0,
            },

            // node -
            peertubevideo: {
                time : 600,
            },

            // node ?
            estimatesmartfee: {
                time : 1600 //
            },

            // node +
            getcontentsstatistic: {
                time : 3600
            },

            searchlinks : {
                time : 560,
                block : 0,
            },

            getaccountsetting : {
                time : 560,
                block : 0,
            },

            getstatisticbyhours : {
                time : 560,
                block : 0,
            },

            getstatisticbydays : {
                time : 5600,
                block : 0,
            },

            getstatisticcontentbyhours : {
                time : 560,
                block : 0,
            },

            getstatisticcontentbydays : {
                time : 5600,
                block : 0,
            },

            getrecomendedcontentsbyscoresonsimilarcontents : {
                time : 3600
            },

            getrecomendedaccountsbysubscriptions : {
                time : 3600
            },

            getrecomendedaccountsbyscoresonsimilaraccounts : {
                time : 3600
            },

            getrecomendedaccountsbyscoresfromaddress : {
                time : 3600
            },

            getrecomendedcontentsbyscoresfromaddress : {
                time : 3600
            }
        }
    }


    self.remove = function(key, params, cachehash){
        if (ckeys[key]){

            var ks = null

            if(!cachehash){

                try{
                    ks = JSON.stringify(params)    
                }catch(e){
                    return
                }
            }

            var k = cachehash || f.hash(ks)

            if(!storage[key])
                storage[key] = {}

            delete storage[key][k] 

            if(!waiting[key])
                waiting[key] = {}

            if (waiting[key][k]){   
                executingWatcher(waiting[key][k], key, true)
            }

        }
    }

    self.set = function(key, params, data, block, ontime, cachehash){
        
        if (ckeys[key]){

            var ks = null

            if(!cachehash){

                try{
                    ks = JSON.stringify(params)    
                }catch(e){
                    return
                }
            }

            var k = cachehash || f.hash(ks)

            if(!storage[key])
                storage[key] = {}

            storage[key][k] = {
                data : data,
                time : new Date()
            }

            self.setsmart(key, data)

            if (ontime){
                storage[key][k].ontime = ontime
            }

            if (block && typeof ckeys[key].block != undefined){
                ckeys[key].block = block
            }

            if(!waiting[key])
                waiting[key] = {}


            if (waiting[key][k]){

                _.each(waiting[key][k].clbks, function(c){
                    if (c.action)
                        c.action('waitedmake')
                })

                delete waiting[key][k]
            }

        }
     
    }

    self.get = function(key, params, cachehash){
        if (ckeys[key]){


            if (ckeys[key].smart){
                return self.getsmart(key, params)
            }

            if(!cachehash){
                var ks = null

                try{
                    ks = JSON.stringify(params)    
                }
                catch(e){

                    return
                }
            }


            var k = cachehash || f.hash(ks)

            var sd = f.deep(storage, key + "." + k)

            if (sd){
                var t = f.date.addseconds(sd.time, sd.ontime || ckeys[key].time)

                if (t > new Date()){
                    return sd.data
                }
                else{
                  
                }
            }

            return undefined

        }
    }

    self.setsmart = function(key, data){

        var c = ckeys[key]

        if(!c.smart) return

        var storagekey = c.smart.storage

        if(!smart[storagekey]) smart[storagekey] = {}

        _.each(data, function(d){

            smart[storagekey][d[c.smart.idou]] = {
                data : d,
                date : new Date()
            }

        })
    }

    self.getsmart = function(key, params){


        var c = ckeys[key]

        if(!c.smart || !c.smart.get) return

        var storagekey = c.smart.storage

        var ids = _.map(f.deep(params, c.smart.idin), (r)=>{return r})

        if(!smart[storagekey]) smart[storagekey] = {}

        var result = []

        var notall = _.find(ids, function(id){
            var data = smart[storagekey][id]

            if(!data) {
                return true
            }
            else{
                result.push(data.data)
            }
        })

        if(!notall){
            return result
        }

    }

    self.wait = function(key, params, clbk, cachehash){

        if (!ckeys[key]){
            clbk('nocache')

            return
        }

        if (typeof self.get(key, params, cachehash) != 'undefined'){
            clbk('hascache')
            return
        }

        var smart = self.getsmart(key, params)

        if (smart){
            clbk('smart', smart)
            return
        }

        var waitid = f.makeid()

        if(!cachehash){
            var ks = null

            try{
                ks = JSON.stringify(params)    
            }catch(e){
                clbk('stringify')
    
                return
            }
        }

        var k = cachehash || f.hash(ks)

        if(!waiting[key])
            waiting[key] = {}

        if(!waiting[key][k])
            waiting[key][k] = {
                clbks : {},
                executor : null,
                attemp : 0
            }


        if(!waiting[key][k].executor){
            waiting[key][k].executor = waitid

            waiting[key][k].clbks[waitid] = {
                date : f.date.addseconds(new Date(), waittime / 1000)
            }

            clbk('execute')

            return 
        }

        waiting[key][k].clbks[waitid] = {
            action : clbk,
            date : f.date.addseconds(new Date(), waittime / 1000)
        }

        
    }

    self.block = function(block){


        _.each(ckeys, function(k, key){
            if (typeof k.block != undefined){

                if (k.block < block.height){
                    storage[key] = {}

                    if (k.smart){
                        smart[key] = {}
                    }
                    //console.log("Invalidate cache", key, block.height)
                }
                    
            }
        })

        f.gcwrapper()
    }

    self.info = function(){

        var meta = {}

        _.each(ckeys, function(c, key){

            var size = 0;
            
            
            /*try{
                size = JSON.stringify(storage[key] || "").length / 1024;
            }
            catch(e){}*/

            var length = _.toArray(storage[key] || {}).length /// ???

            meta[key] = {
                block : c.block,
                length : length,
                size : size
            }

        })

        return {
            meta : meta,
        }
    }
    
    self.clear = function(){
        storage = {}

        f.gcwrapper()
    }

    var softclear = function(){

        var date = new Date()

        _.each(storage, function(s, key){

            var c = ckeys[key]

            if(!c.time){
                return
            }

            var removekeys = []

            _.each(s, function(sd, lkey){

                if(sd.time){

                    var t = f.date.addseconds(sd.time, 3 * (sd.ontime || c.time))

                    if (t < date){
                        removekeys.push(lkey)
                    }
                    
                }
                
            })

            _.each(removekeys, function(key){
                delete s[key]
            })
        })

        _.each(smart, function(s, key){

            var time = 460

            var c = ckeys[key]

            if (c && c.time){
                time = c.time
            }

            var removekeys = []

            _.each(s, function(sd, lkey){

                if(sd.time){

                    var t = f.date.addseconds(sd.time, 3 * (time))

                    if (t < date){
                        removekeys.push(lkey)
                    }
                    
                }
                
            })

            _.each(removekeys, function(key){
                delete s[key]
            })
        })

        f.gcwrapper()
    }

    self.init = function(){
        if(!softclearInterval)
            softclearInterval = setInterval(softclear, softclearTime)

        if(!workerInterval)
            workerInterval = setInterval(worker, workerTime)
    }

    self.destroy = function(){
        if(softclearInterval){
            clearInterval(softclearInterval)
            softclearInterval = null
        }

        if(workerInterval){
            clearInterval(workerInterval)
            workerInterval = null
        }
    }

    return self;
}

module.exports = Cache