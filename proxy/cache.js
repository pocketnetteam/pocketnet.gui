var Cache = function(p){
    var self = this;

    var storage = {}
    var ckeys = {
        getlastcomments : {
            time : 120,
            block : true
        },
        getlastcomments2 : {
            time : 120,
            block : true
        },
        gettags : {
            time : 120,
            block : true
        },

        /*getnodeinfo : {
            time : 120,
            block : true
        }*/
    }

    self.set = function(key, params, data){
        if (ckeys[key]){

            var k = MD5(JSON.stringify(params))

            if(!storage[key])
                storage[key] = {}

            storage[key][k] = {
                data : data,
                time : new Date()
            }

        }
        else{
            return null;
        }
    }

    self.get = function(key, params){
        if (ckeys[key]){

            var k = MD5(JSON.stringify(params))

            var sd = deep(storage, key + "." + k)

            if (sd){
                var t = sd.time.addSeconds(ckeys[key].time)

                if (t > new Date()){


                    return sd.data

                }
            }

        }
    }

    self.block = function(){
        _.each(ckeys, function(k, key){
            if (k.block){
                storage[key] = {}
            }
        })
    }

    return self;
}

module.exports = Cache