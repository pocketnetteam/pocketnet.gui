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
    var workerTime = 400
    var waittime = 8500

    var ckeys = {}

    var worker = function(){

        for(var key in waiting) {
            let w = waiting[key]

            var removing = []

            for(var key2 in w) {
                let k = w[key2]

                if(executingWatcher(k)){
                    removing.push(key2)
                    //delete w[key2]
                }
            }

            _.each(removing, (key2) => {
                delete w[key2]
            })
        }
    }

    var executingWatcher = function(k, ignoredate){

        var itemswithattemp = []
        var now = Date.now()

        _.each(k.clbks, function(c, waitid){

            if (ignoredate || c.date < now){

                if (c.action)
                    itemswithattemp.push([c,waitid])

                if (k.executor == waitid){
                    delete k.clbks[k.executor]
                    delete k.executor
                }
            }
        })

        if (itemswithattemp.length){

            k.attemp++

            if (k.attemp >= 3){

                k.attemp = 0

                _.each(itemswithattemp, function(ce){
                    ce[0].action('attemps')
                    delete k.clbks[ce[1]]
                })

                if(_.isEmpty(k.clbks)){
                    return true
                }
            }
            else{

                var newexecutor = itemswithattemp[f.rand(0, itemswithattemp.length - 1)]

                _.each(itemswithattemp, function(ce){
                    ce[0].date = ce[0].date + waittime// f.date.addseconds(ce[0].date, waittime / 1000)
                })
                
                k.executor = newexecutor[1]
                newexecutor[0].action('execute')

                delete k.clbks[k.executor]

            }

        }

        if(_.isEmpty(k.clbks)){
            return true
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


            getuseraddress : {
                time : 82000,
                stats : true
            },

            // node +
            search: {
                time : 2000
            },

            searchusers: {
                time : 2000,
                block : 0
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
                stats : true
            },
            
            // node +
            getrawtransactionwithmessage: {
                time : 460,
                block : 0,
                stats : true
            },

            // ?
            getrawtransaction: {
                time : 460,
                block : 0,
                stats : true
            },

            

            // node +
            getusercontents: {
                time : 760,
            },

            // node +
            gethierarchicalstrip: {
                time : 460,
                block : 0,
            },  

            getprofilecollections: {
                time : 460,
                block : 0,
            },  

            getboostfeed: {
                time : 1460,
            }, 

            getprofilefeed: {
                time : 460,
                block : 0,
            }, 

            getsubscribesfeed: {
                time : 460,
                block : 0,
            }, 

            gethistoricalstrip: {
                time : 460,
                block : 0,
                stats : true
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

            getmostcommentedfeed: {
                time : 460,
                block : 0
            },

            // node +

            getusersubscribes: {
                time : 560,
                block : 0,
            },

            getusersubscribers: {
                time : 560,
                block : 0,
            },

            getuserblocking: {
                time : 560,
                block : 0,
            },
            getuserprofile: {
                time : 560,
                block : 0,
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
            getcontent: {
                time : 82000,
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
                stats : true
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

            getstatisticcontentbyhours : {
                time : 560,
                block : 0,
            },


            gettopfeed : {
                time : 3600
            },

            gettopaccounts : {
                time : 3600
            },

            getcontentactions : {
                time : 3600
            },

            getrecommendedcontentbyaddress : {
                time : 3600
            },

            getrecomendedaccountsbysubscriptions : {
                time : 3600
            },

            getrecommendedaccountbyaddress : {
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
            },

            getaccountearning: {
                time : 460,
                block : 0,
            }, 

            //Jury
            getalljury: {
                time : 460,
                block : 0,
            }, 

            getjuryassigned: {
                time : 460,
                block : 0,
            }, 

            getjurymoderators: {
                time : 460,
                block : 0,
            }, 

            getbans: {
                time : 460,
                block : 0,
            },
            
            getstatisticcontentbydays : {
                time : 3600
            },

            getstatisticbydays : {
                time : 3600
            },

            getcoininfo: {
                time : 460,
                block : 0,
            },

            getfromtotransactions : {
                time : 460,
                block : 0,
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
                if(executingWatcher(waiting[key][k], true)){

                    delete waiting[key][k]
                }
                
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
                time : Date.now()
            }

            self.setsmart(key, data)

            if (ontime){
                storage[key][k].ontime = ontime
            }

            if (block && typeof ckeys[key].block != 'undefined'){
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

            var sd = storage[key] ? (storage[key][k] || null) : null

            if (sd){
                var t = sd.time + 1000 * (sd.ontime || ckeys[key].time) //f.date.addseconds(sd.time, sd.ontime || ckeys[key].time)

                if (t > Date.now()){
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
                date : Date.now()
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
                date : Date.now() + waittime
            }

            clbk('execute')

            return 
        }

        waiting[key][k].clbks[waitid] = {
            action : clbk,
            date : Date.now() + waittime
        }

        
    }

    self.block = function(block){


        _.each(ckeys, function(k, key){
            if (k.block){

                if (k.block && k.block < block.height){
                    storage[key] = {}
                    

                    if (k.smart){
                        smart[key] = {}
                    }

                    k.block = block.height
                }
                    
            }
        })

        f.gcwrapper()
    }

    self.info = function(compact){

        var meta = {}
        var wt = {}

        if(!compact){
            _.each(waiting, (w, k) => {
                wt[k] = _.toArray(w).length
            })
        }
        

        _.each(ckeys, function(c, key){

            if(compact && !c.stats) return

            var size = 0;
            
            var length = _.toArray(storage[key] || {}).length
            var wl = 0

            if(waiting[key]){
                wl = _.toArray(waiting[key]).length
            }

            meta[key] = {
                block : c.block,
                length : length,
                size : size,
                waiting : wl
            }

        })

        return {
            meta : meta,
            wt : wt
        }
    }
    
    self.clear = function(){
        storage = {}

        f.gcwrapper()
    }

    var softclear = function(){

        var date = Date.now()

        _.each(storage, function(s, key){

            var c = ckeys[key]

            if(!c.time){
                return
            }

            var removekeys = []

            _.each(s, function(sd, lkey){

                if(sd.time){

                    var t = sd.time + 3 * (sd.ontime || c.time) * 1000// f.date.addseconds(sd.time, 3 * (sd.ontime || c.time))

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

                    var t = sd.time + 3 * (time) * 1000 ///f.date.addseconds(sd.time, 3 * (time))

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