ResoursesDB = function(name, version){
    var self = this

    var storage = {
        name,
        version,
        data : {}
    }

    var getHourUnixtime = function() {
        return Math.floor(Date.now() / 1000);
    }

    var ls_storage = null

    try{
        localStorage['t'] = 1

        ls_storage = localStorage
    }catch(e){
        ls_storage = sessionStorage
    }

    if(!ls_storage){
        try{
            sessionStorage['t'] = 1
            ls_storage = sessionStorage
        }catch(e){
        }
    }

    var clearOld = function(key){

        const unixtime = getHourUnixtime();

        _.each(storage.data[key], (item, id) => {
            
            if (unixtime >= item.cachedTo) {
                self.clear(key, id)
            }

        })

    }

    var updatePromise = null

    var update = function(){
        if (updatePromise){
            return updatePromise
        }

        updatePromise = new Promise((resolve, reject) => {

            setTimeout(() => {

                try{
                    ls_storage[name] = JSON.stringify(storage)
                }
                catch(e) {

                }

                resolve()


            }, 5000)


        }).finally(() => {
            updatePromise = null
        })
    }

    self.set = function(key, time, id, message){
        const unixtime = getHourUnixtime();

        try{

            const item = {
                id,
                message : JSON.stringify(message),
                cachedTo: unixtime + time,
            };

            storage.data[key] || (storage.data[key] = {})

            storage.data[key][id] = item

            update()

            return Promise.resolve()

        }catch(e){
            return Promise.reject(e)
        }
    }

    self.clear = function(key, id){
        if (storage.data[key] && storage.data[key][id]){
            delete storage.data[key][id]

            update()

        }


        return Promise.resolve()
    }

    self.clearAll = function(key){

        storage.data[key] = {}

        update()

        return Promise.resolve()
    }

    self.clearMany = function(key, ids){
        return Promise.all(ids, id => {
            return self.clear(key, id)
        })
    }

    self.get = function(key, id){

        var time = getHourUnixtime()

        if (storage.data[key] && storage.data[key][id]){
            var item = storage.data[key][id]


            if(!item.message){

                self.clear(key, id)

                return Promise.reject('empty1')
            }

            if (time >= item.cachedTo) {

                self.clear(key, id)

                return Promise.reject('delete');
            }

            try{
                var data = JSON.parse(item.message)

                return Promise.resolve(data)

            }catch(e){

                self.clear(key, id)

                return Promise.reject('empty2')
            }

            
        }

        return Promise.reject('empty3')
    }

    self.getdb = function(){

        try{
            var data = JSON.parse(ls_storage[name] || "{}")
        }
        catch(e){

        }

        if (storage.version == data.version){
            storage = data
        }

        if(!storage.data) storage.data = {}
        if (storage.name != name) storage.name = name
        if (storage.version != version) storage.version = version

        _.each(storage.data, (v, k) => {
            clearOld(k)
        })

        return Promise.resolve()

    }
    

    return self
}