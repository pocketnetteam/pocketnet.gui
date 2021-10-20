var f = require('../functions');

var Cache = function(p){
    var self = this;

    var storage = {}
    var waiting = {}
    var smart = {}

    var softclearInterval = null
    var softclearTime = 10000

    var workerInterval = null
    var workerTime = 200
    var waittime = 6500

    var ckeys = {}

    var worker = function(){

        _.each(waiting, function(w){
            _.each(w, function(k, key){
                executingWatcher(k, key)
            })
        })
    }

    var executingWatcher = function(k, key){

        var itemswithattemp = []
        var now = new Date()

        _.each(k.clbks, function(c, waitid){

            if (c.date < now){
                itemswithattemp.push([c,waitid])
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
                time : 260,
                block : 0
            },

            // node +
            getrawtransactionwithmessagebyid: {
                time : 460,
                block : 0
            },
            
            // node +
            getrawtransactionwithmessage: {
                time : 460,
                block : 0
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
                block : 0
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

                executingWatcher(waiting[key][k], k)

                /*_.each(waiting[key][k].clbks, function(c){
                    c.action('waitedmake')
                })

                delete waiting[key][k]*/
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
                    c.action('waitedmake')
                })

                delete waiting[key][k]
            }

        }
     
    }

    self.get = function(key, params, cachehash){
        if (ckeys[key]){


            /*if (ckeys[key].smart){
                return self.getsmart(key, params)
            }*/

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

        }
    }


    /// fail

    self.getsmart = function(key, params){

        var c = ckeys[key]

        var ids = _.map(f.deep(params, c.idin), (r)=>{return r})

        if(!smart[key]) smart[key] = {}

    }

    self.wait = function(key, params, clbk, cachehash){

        if (!ckeys[key]){
            clbk('nocache')

            return
        }

        if (self.get(key, params, cachehash)){
            clbk('hascache')
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

            clbk('execute')

            return 
        }

        console.log('setwait', k)

        waiting[key][k].clbks[waitid] = {
            action : clbk,
            date : f.date.addseconds(new Date(), waittime / 1000)
        }

        /*setTimeout(function(){

            if (waiting[key] && waiting[key][k] && waiting[key][k].clbks[waitid]){

                waiting[key][k].clbks[waitid].action('waitedtimeout')

                delete waiting[key][k].clbks[waitid]
            }

        }, 6500)*/

        
    }

    self.block = function(block){

        console.log("BLOCK")

        _.each(ckeys, function(k, key){
            if (typeof k.block != undefined){

                if (k.block < block.height)
                    storage[key] = {}
            }
        })
    }

    self.info = function(){

        var meta = {}

        _.each(ckeys, function(c, key){

            var size = 0;
            
            
            try{
                size = JSON.stringify(storage[key] || "").length / 1024;
            }
            catch(e){}

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

                    var t = f.date.addseconds(sd.time, 2 * (sd.ontime || c.time))

                    if (t < date){
                        removekeys.push(lkey)
                    }
                    
                }
                
            })

            _.each(removekeys, function(key){
                delete s[key]
            })
        })
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