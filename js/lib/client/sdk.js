var pSDK = function(app, api){
    var self = this

    var storage = {}
    var temp = {}

    var prepareStorage = function(key){
        if(!storage[key]) storage[key] = {}
        if(!temp[key]) temp[key] = {}
    }

    self.userState = 


    return self
}

if(typeof module != "undefined"){ module.exports = {pSDK}; } 
else { window.pSDK = pSDK;}