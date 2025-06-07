var PaymentHash = (function () {
    function adler32(str) {
        var MOD_ADLER = 65521,
            a = 1,
            b = 0;
        for (var i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % MOD_ADLER;
            b = (b + a) % MOD_ADLER;
        }
        return ((b << 16) | a) >>> 0;
    }

    function hexEncode(text) {
        var ch = 0,
            result = "";
        for (var i = 0; i < text.length; i++) {
            ch = text.charCodeAt(i);
            if (ch > 0xff) ch -= 0x350;
            ch = ch.toString(16);
            while (ch.length < 2) ch = "0" + ch;
            result += ch;
        }
        return result;
    }

    function makeURLParameters(payment) {
        var o = {
            a: "p"
        };
        if (payment.s_url) o.s = payment.s_url;
        if (payment.shipmentValue) o.sv = payment.shipmentValue;
        if (payment.c_url) o.c = payment.c_url;
        if (payment.c_url_type && payment.c_url_type !== "fetch") o.ct = payment.c_url_type;
        if (payment.address) o.ad = payment.address;
        if (payment.email) o.e = 1;
        if (payment.phone) o.p = 1;
        if (payment.anonimus) o.an = 1;
        if (payment.payload) o.pl = payment.payload;
        if (payment.date) o.d = payment.date;
        if (payment.expired) o.ex = payment.expired;
        if (payment.value) o.v = payment.value;
        if (payment.description) o.de = payment.description;
        if (payment.saltValue) o.sav = payment.saltValue;
        if (payment.discount) o.di = payment.discount;
        if (payment.tax) o.ta = payment.tax;
        if (payment.store) {
            o.st = {};
            if (payment.store.name) o.st.n = payment.store.name;
            if (payment.store.site) o.st.s = payment.store.site;
        }
        if (payment.items && payment.items.length) {
            o.i = [];
            for (var i = 0; i < payment.items.length; i++) {
                var it = payment.items[i];
                if (it) {
                    var itl = {};
                    if (it.image) itl.i = it.image;
                    if (it.name) itl.n = it.name;
                    if (it.value) itl.v = it.value;
                    if (it.count) itl.c = it.count;
                    o.i.push(itl);
                }
            }
        }
        return o;
    }

    function getAdlerHash(payment) {
        var prts = [];
        prts.push(payment.address);
        if (payment.items) prts.push(JSON.stringify(payment.items));
        else prts.push(payment.value || 0);
        if (payment.description) prts.push(payment.description);
        if (payment.saltValue) prts.push(payment.saltValue);
        if (payment.discount) prts.push(payment.discount);
        if (payment.tax) prts.push(payment.tax);
        if (payment.s_url) prts.push(payment.s_url);
        if (payment.shipmentValue) prts.push(payment.shipmentValue);
        if (payment.store) prts.push(JSON.stringify(payment.store));
        if (payment.payload) prts.push(JSON.stringify(payment.payload));
        else prts.push(JSON.stringify(payment.date));
        var h = adler32(prts.join("_"));
        if (h < 0) h = -h;
        return String(h);
    }

    function makeURLHash(payment = {}) {
        var params = makeURLParameters(payment);
        params.h = getAdlerHash(payment);
        var hex = hexEncode(JSON.stringify(params));
        return "_" + hex;
    }

    return {
        makeURLHash
    };
})();

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

var BastyonSdk = function(settings = {}){
    var self = this
    var clbks = {}
    var listenid = makeid()
    var listeners = {}
    var currentState = (document.location.pathname.replace(settings.publicPath || '', '') + document.location.search).replace('/', '');

    const popstateEventHandler = function() {
        onChangeState()
    }

    window.addEventListener('popstate', popstateEventHandler);

    const onChangeState = (state, title, url, isReplace) => { 

        setTimeout(() => {
            var link = (document.location.pathname.replace(settings.publicPath || '', '') + document.location.search).replace('/', '');

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

    self.rpc = function(method, parameters = [], options){

        /*
        options = {
            rpc : {
                fnode : '65.21.252.135:38081'
            }
        } 

        options = {
            fnode : '65.21.252.135:38081'
        }
        
        */

        return action('rpc', {
            method,
            parameters,
            options
        })
    }

    self.sign = function(string){
        return action('sign', {string})
    }

    self.get = {
        videos : function(urls, update = false){
            const data = {
                urls, 
                update
            };
            return action('get.videos', data)
        },
        videosWithShares : function(options = {}){
            return action('get.videosWithShares', options)
        },
        feed : function(options = {}){
            return action('get.feed', options)
        },
        account : function(){
            return action('account', {})
        },

        balance : function() {
            return action('balance', {})
        },

        zaddress : function() {
            return action('zaddress', {}).then(R => {
                return Promise.resolve(R)
            })
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

    self.open = {
        post : function(txid){
            return action('open.post', {txid})
        },
        donation : function(receiver){
            return action('open.donation', {receiver})
        },
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

    self.ext = function(payment){

        if(!payment || typeof payment != 'object') return Promise.reject('wrongPayment')
    
        return action('ext', {
            ext : PaymentHash.makeURLHash(payment)
        })
    }

   
    self.openExternalLink = function(url){
        return action('openExternalLink', {url})
    }
 
    self.registerForNotifications = function(){
        return action('registerForNotifications')
    }

    self.barteron = {
        account : function(data){
            return action('barteron.account', data)
        },

        offer : function(data){
            return action('barteron.offer', data)
        },

        removeOffer : function(data){
            return action('barteron.removeOffer', data)
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

    self.videos = {
        opendialog : function(data){
            return action('videos.opendialog', data)
        },

        remove : function(data){
            return action('videos.remove', data)
        },
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
      
        channel: function(address){
            return action('channel', {address})
        },

        userstate : function(){
            return action('userstate', {})
        },

        share: function(data, options = { shareOnBastyon: false }){

            /*
            
            data.path
            data.sharing
            options.shareOnBastyon

            */

            if (data.path){
                data.url = self.get.applink(data.path)
            }

            const actionName = options?.shareOnBastyon ? 'shareOnBastyon' : 'share';

            return action(actionName, data)
        },

        shareOnBastyon: function(data){
            self.helpers.share(data, { shareOnBastyon: true })
        },

        complain: function(data){
            return action("complain", data)
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
                document.documentElement.setAttribute('bastyon', 'bastyon');
    
                document.documentElement.style.setProperty('--app-margin-top', `${margintop}`);

                resolve(application)
            })

        })

    }

    self.manageBastyonImageSrc = function(src = ''){
        if(!self.project) return null
        if(!src) return src

        var srcNew = src;

        self.project.archivedPeertubeServers.map(server => {
            if (srcNew.includes(server)) srcNew = srcNew.replace(server, 'peertube.archive.pocketnet.app');
        });

        return srcNew.replace('bastyon.com:8092', 'pocketnet.app:8092').replace('test.pocketnet', 'pocketnet').replace('https://http://', 'http://');
    }

    self.inbastyon = function(){
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    self.extendMetamaskOptions = function(options){
        
        if(self.applicationInfo.device == 'application_electron'){
            options.shouldShimWeb3 = false
        }

        options.openDeeplink = function(url){
            self.openExternalLink(url)
        }

        return options
    }


    listen()

    return self
}



if(typeof module != "undefined"){ module.exports = {BastyonSdk}; } 
else { window.BastyonSdk = BastyonSdk; }
