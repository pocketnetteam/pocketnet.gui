var makeid = function(){

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

    return  s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
   
}

var actionHelper = function(action){


    if(!action.transaction) { action.relay = true }
    if (action.transaction && !action.completed && !action.rejected) { action.temp = true }

    return action
}

var hexEncode= function(text)
{
    var ch = 0;
    var result = "";
    for (var i = 0; i < text.length; i++)
    {
        ch = text.charCodeAt(i);
        if (ch > 0xFF) ch -= 0x350;
        ch = ch.toString(16);
        while (ch.length < 2) ch = "0" + ch;
        result += ch;
    }
    return result;
}

var BastyonSdk = function(){
    var self = this
    var clbks = {}
    var listenid = makeid()
    var listeners = {}
    var currentState = (document.location.pathname + document.location.search).replace('/', '');

    const popstateEventHandler = function() {
        onChangeState()
    }

    window.addEventListener('popstate', popstateEventHandler);

    const onChangeState = (state, title, url, isReplace) => { 

        setTimeout(() => {
            var link = (document.location.pathname + document.location.search).replace('/', '');

            if(currentState == link) return
    
            currentState = link

            send({
                event : 'changestate',
                data : {
                    value : currentState,
                    replace : true
                }
            })
        })
        

    }
    
    ['pushState', 'replaceState'].forEach((changeState) => {
        // store original values under underscored keys (`window.history._pushState()` and `window.history._replaceState()`):
        window.history['_' + changeState] = window.history[changeState]
        
        window.history[changeState] = new Proxy(window.history[changeState], {
            
            apply (target, thisArg, argList) {
                console.log('changeState', changeState)
                const [state, title, url] = argList
                onChangeState(state, title, url, changeState === 'replaceState')
                
                return target.apply(thisArg, argList)
            },
        })
    })

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

        try{
            if(key == 'action') actionHelper(data)


            if (listeners[key]){
                listeners[key].forEach(f => {
                    f(data)
                });
            }
        }
        catch(e){
            console.error(e)
        }
        
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

                /*if(error){
                    return reject(error)
                }

                return resolve(data)*/
            }

        })
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

    self.emit = function(type, data){
        send({
            event : type,
            data
        })
    }

    //////////////////

    self.rpc = function(method, parameters = []){
        return action('rpc', {
            method,
            parameters
        })
    }

    self.get = {
        account : function(){
            return action('account', {})
        },

        balance : function() {
            return action('balance', {})
        },

        geolocation : function(){
            return action('geolocation', {})
        },

        currency : function(){
            return action('currency', {})
        },

        imageFromMobileCamera : function(){
            return action('mobile.camera', {})
        },

        appinfo : function(){
            return action('appinfo', {})
        },

        applink : function(path){
            if(!self.project) return path
            if(!self.applicationInfo) return path
            
            return self.project.protocol + "://application?id=" + self.applicationInfo.id + (path ? (path ? '&p=' + hexEncode(path) : '') :  (currentState ? '&p=' + hexEncode(currentState) : ''))
        },

        action : function(){
            return action('getaction', {})
        },
        
        actions : function(){
            return action('getactions', {})
        }
    }

    self.permissions = {
        check : function({permission}){
            return action('checkPermission', {permission})
        },

        request : function(permissions){
            return action('requestPermissions', {permissions})
        }
    }

    self.payment = function(data){
        return action('payment', data).then(action => {
            return actionHelper(action)
        })
    }

    self.barteron = {
        account : function(data){
            return action('barteron.account', data)
        },

        offer : function(data){
            return action('barteron.offer', data)
        },

        comment : function(data){
            return action('barteron.comment', data)
        },

        vote : function(data){
            return action('barteron.vote', data)
        }
    }

    self.images = {
        upload : function(data){
            return action('images.upload', data)
        }
    }

    self.chat = {
        getOrCreateRoom : function({users, parameters}){
            return action('chat.getOrCreateRoom', {users, parameters}).then(room => {
                return room
            }).catch(e => {
                console.error(e)
                return Promise.reject(e)
            })
        },

        send : function({roomid, content}){
            return action('chat.send', {roomid, content}).then(message => {
                return message
            }).catch(e => {
                console.error(e)
                return Promise.reject(e)
            })
        },

        openRoom : function(roomid){

            return action('chat.openRoom', {roomid}).catch(e => {
                console.error(e)
                return Promise.reject(e)
            })

        }
    }

    self.fetch = function(url, data = {}){

        return action('authFetch', {url, data}).catch(e => {
            console.error(e)
            return Promise.reject(e)
        })

    }

    self.helpers = {
        alert : function(message){
            return action('alert', {message})
        },

        opensettings: function(){
            return action('opensettings', {})
        },

        registration: function(){
            return action('registration', {})
        },

        userstate : function(){
            return action('userstate', {})
        },

        share: function(data){

            /*
            
            data.path
            data.sharing
            
            */

            if (data.path){
                data.url = self.get.applink(data.path)
            }

            

            return action('share', data)
        },
    }

    self.getroute = function(data){
        return '/' + data.route
    }

    self.init = function(){

        self.on('keyboard', ({height}) => {
            document.documentElement.style.setProperty('--keyboardheight', `${height}px`);
		})

        self.on('changestate', (data) => {
            currentState = data.route
		})

        return new Promise((resolve, reject) => {
            
            self.get.appinfo().then(({margintop, theme, application, project, production}) => {

                self.applicationInfo = application
                self.project = project
                self.test = !production

                if (document.documentElement.hasAttribute('theme')){
                    document.documentElement.removeAttribute('theme');
                }
    
                document.documentElement.setAttribute('theme', theme.rootid);
    
                document.documentElement.style.setProperty('--app-margin-top', `${margintop}`);

                resolve(application)
            })

        })

    }

    self.inbastyon = function(){
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }


    listen()

    return self
}



if(typeof module != "undefined"){ module.exports = {BastyonSdk}; } 
else { window.BastyonSdk = BastyonSdk; }