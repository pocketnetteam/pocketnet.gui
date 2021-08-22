var f = require('../functions');

var Cache = function(p){
    var self = this;

    var storage = {}
    var waiting = {}
    var smart = {}


    var ckeys = {
        getlastcomments : {
            time : 960,
            block : 0
        },

        getcomments : {
            time : 360,
            block : 0
        },

        getuseraddress : {
            time : 82000
        },

        search: {
            time : 6000
        },
       
        gettags : {
            time : 82000
        },

        getnodeinfo : {
            time : 160,
            block : 0
        },

        getrawtransactionwithmessagebyid: {
            time : 460,
            block : 0
        },
       
        getrawtransactionwithmessage: {
            time : 460,
            block : 0
        },

        getrawtransaction: {
            time : 460,
            block : 0
        },
        getusercontents: {
            time : 760,
        },
        gethierarchicalstrip: {
            time : 460,
            block : 0
        },

        gethotposts: {
            time : 460,
            block : 0
        },
        
        getuserprofile: {
            time : 560,
            block : 0,

            /*smart : {
                idin : '0',
                idout : 'address',
                type : 'collect'
            }*/
        },

        getuserstate : {
            time : 560,
            block : 0
        },
        
        getpagescores: {
            time : 460,
            block : 0
        },
        
        getcontents: {
            time : 82000,
        },

        getmissedinfo: {
            time : 160,
            block : 0,
        },

        peertubevideo: {
            time : 300,
        },

        estimatesmartfee: {
            time : 1600
        },
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
                time : f.now()
            }

            if(ontime){
                storage[key][k].ontime = ontime
            }

            if (typeof ckeys[key].block != undefined){
                ckeys[key].block = block
            }
            

            if(!waiting[key])
                waiting[key] = {}

            if (waiting[key][k]){

                _.each(waiting[key][k].clbks, function(c){
                    c('waitedmake')
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

                    console.log('stringify error', params)

                    return
                }
            }

            

            var k = cachehash || f.hash(ks)

            var sd = f.deep(storage, key + "." + k)

            if (sd){
                var t = f.date.addseconds(sd.time, sd.ontime || ckeys[key].time)

                if (t > f.now()){
                    return sd.data
                }
            }

        }
    }

    self.getsmart = function(key, params){

        var c = ckeys[key]

        var ids = _.map(f.deep(params, c.idin), (r)=>{return r})

        if(!smart[key]) smart[key] = {}

        _.each()
    }

    self.wait = function(key, params, clbk, cachehash){

        if (!ckeys[key]){
            clbk('nocache')

            return
        }

        if(self.get(key, params, cachehash)){
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
                executor : null
            }

        if(!waiting[key][k].executor){
            waiting[key][k].executor = waitid

            clbk('execute')

            return 
        }

        waiting[key][k].clbks[waitid] = clbk

        setTimeout(function(){

            if(waiting[key] && waiting[key][k] && waiting[key][k].clbks[waitid]){

                waiting[key][k].clbks[waitid]('waitedtimeout')

                delete waiting[key][k].clbks[waitid]
            }

        }, 6500)

        
    }

    self.block = function(block){

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

    return self;
}

module.exports = Cache