var makeid = function(){

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

    return  s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
   
}

var BastyonSdk = function(){
    var self = this
    var clbks = {}
    var listenid = makeid()
    var listeners = {}

    window.addEventListener('popstate', (event) => {
        
        send({
            event : 'popstate',
            data : {
                value : document.location.pathname + document.location.pathname.search
            }
        })

    });

    window.addEventListener("message", (event) => {
        if (event.data){

            if(event.data.response){
                if (clbks[event.data.response]){
                    clbks[event.data.response](event.data)

                    delete clbks[event.data.response]
                }
            }

            if(event.data.listener && event.data.listener == listenid){
                on(event.data.key, event.data.data)
            }

        }
        //console.log('application:event:inapp', event)
    })

    var on = function(key, data){
        (listeners[key] || []).forEach(f => {
            f(data)
        });
        
    }

    var send = function(message){
        window.parent.postMessage(message, "*")
    }

    var action = function(action, data){

        return new Promise((resolve, reject) => {

            var id = makeid()

            send({
                id,
                data,
                action
            })
    
            clbks[id] = function({data = {}, error}){

                console.log('application:', data, error)

                //delete clbks[id]

                if(error){
                    return reject(error)
                }

                return resolve(data)
            }

        })

        
    }

    var listen = function(){
        return new Promise((resolve, reject) => {

            var id = makeid()

            send({
                id,
                listener : listenid
            })
    
            clbks[id] = function({data = {}, error}){

                if(error){
                    return reject(error)
                }

                return resolve(data)
            }

        })
    }

    self.rpc = function(method, parameters = []){
        return action('rpc', {
            method,
            parameters
        })
    }

    self.get = {
        account : function(){
            return action('account', {})
        }
    }

    self.payment = function(data){
        return action('payment', data)
    }

    self.on = function(key, action){
        if(!listeners[key]) listeners[key] = []

        listeners[key].push(action)
    }

    self.off = function(key, action){
        if(!listeners[key]) listeners[key] = []

        listeners[key] = listeners[key].filter((a) => {
            return a != action
        })
    }

    listen()

    return self
}

console.log("SDK_READY")


if(typeof module != "undefined"){ module.exports = {BastyonSdk}; } 
else { window.BastyonApps = BastyonSdk; }