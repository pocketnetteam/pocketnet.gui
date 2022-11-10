Actions = function(app){
    var self = this
     
    var key = 'actions_v0'
    var accounts = {}
    var events = {}
    
    var exports = function(){
        return {}
    }

    var imports = function(value){
        accounts = value

        emit('change', accounts)
    }

    var emit = function(key, data){
        _.each(events[key] || [], function(e){
            e({data : data})
        })
    }

    self.on = function(key, f){
        if(!events[key]){
            events[key] = []
        }

        events[key].push(f)
    }

    self.off = function(key, f){
        if(!events[key]){
            events[key] = []
        }

        events[key] = _.filter(events[key], function(k){
            return k != f
        })
    }

    self.save = function(){
        try{
            localStorage[key] = exports()
        }
        catch(e){
        }
    }

    self.load = function(){
        try{
            imports(localStorage[key] || "{}")
        }
        catch(e){
        }
    }

    self.init = function(){
        app.platform.sdk.syncStorage.on('change', key, function(e){

            imports(e.newValue || "{}")

            
        });
    }

    self.destroy = function(){
        events = {}
        accounts = {}
    }
    
    return self
}

if (typeof module != "undefined") {
    module.exports = Actions;
}