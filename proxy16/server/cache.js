var f = require('../functions');

var Cache = function(p){
    var self = this;

    var storage = {}
    var ckeys = {
        getlastcomments : {
            time : 120,
            block : 0
        },
       
        gettags : {
            time : 82000
        },

        getnodeinfo : {
            time : 120,
            block : 0
        },
        
        getrawtransactionwithmessage: {
            time : 120,
            block : 0
        },
        
        getuserprofile: {
            time : 120,
            block : 0
        },
        
        getpagescores: {
            time : 120,
            block : 0
        },
        
        getcontents: {
            time : 120,
            block : 0
        }
    }

    self.set = function(key, params, data, block){
        
        if (ckeys[key]){

            var k = f.hash(JSON.stringify(params))

            if(!storage[key])
                storage[key] = {}

            storage[key][k] = {
                data : data,
                time : f.now()
            }

            ckeys[key].block = block

        }
    }

    self.get = function(key, params){
        if (ckeys[key]){

            var k = f.hash(JSON.stringify(params))

            var sd = f.deep(storage, key + "." + k)

            if (sd){
                var t = f.date.addseconds(sd.time, ckeys[key].time)

                if (t > f.now()){
                    return sd.data
                }
            }

        }
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

            var size = JSON.stringify(storage[key] || "").length / 1024;
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