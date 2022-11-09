Actions = function(app){
    var self = this
     
    var key = 'actions_v0'
    var accounts = {}
    
    var exports = function(){
        return {}
    }

    var imports = function(value){
        accounts = value

        
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

    }
    
    return self
}

if (typeof module != "undefined") {
    module.exports = Actions;
}