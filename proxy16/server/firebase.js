var Datastore = require('@seald-io/nedb');
var f = require('../functions');
var dictionary = require('../node/notificationsDictionary');
const admin = require("firebase-admin");
const errorCodeList = ['messaging/registration-token-not-registered']

var Fbtoken = function({
    token, device, address, id, app, date, settings
}){
    var self = this;

    var key = function(){
        return f.hash(token + device + address + id)
    }

    self.check = function(){
        return token && device && address && id && date
    }

    self.export = function(){
        return {
            token,
            device,
            address,
            id : id,
            date : date,
            settings: settings,
            key : key()
        }
    }

    return self;
}

var Firebase = function(p){
    if(!p) p = {};

    var self = this;

    var admin = require('firebase-admin');
    var serviceAccount = null;
    var db = new Datastore({
        filename: f.path(p.dbpath),
    });

    self.users = [];
    self.query = [];
    self.pushStatus = []
    self.processInterval = null
    self.inited = false;
    self.useNotifications = true;


    const addStatus = (token, address, isError, message, code)=>{
        const firebasePushStratus = {token, address, isError, message, code}
        self.pushStatus.unshift(firebasePushStratus)
        if(self.pushStatus.length > 1000)
            self.pushStatus.pop()
        return firebasePushStratus
    }

    var loaddb = function(){

        return new Promise((resolve, reject) => {

            db.loadDatabase(err => {

                db.ensureIndex({ fieldName: 'key', unique: true });

                resolve()

            })

        }).then(r => {

            return self.getall()

        }).then(users => {

            _.each(users, adduser)

            return Promise.resolve()
        })
    }

    var getuser = function(address, device){
        return _.find(self.users, function(user){
            return user.address === address && (!device || device === user.device)
        })
    }

    var getusers = function(address, device){
        return _.filter(self.users, function(user){
            return user.address === address && (!device || device === user.device)
        })
    }

    var getAllUsers = function(){
        return _.filter(self.users, function(user){
            return user.address !== undefined
        })
    }

    var getUsersByAddresses = function(addresses){
        return _.filter(self.users, function(user){
            return addresses.some(el=>el===user.address)
        })
    }

    var finduser = function(_user){
        return _.find(self.users, function(user){
            return user.address === _user.address && user.device === _user.device
        })
    }

    var adduser = function(user){

        if(!finduser(user) && self.inited){

            self.users.push(user)

            setTimeout(function(){

                try{
                    self.wss.clbks.firebase.addUser(user)
                }
                catch(e){
                    self.logger.w('firebase', 'warn', 'Firebase. Add User', e)
                }
                
            }, f.rand(500, 5000))

          
        }
        
    }

    var removeuserclbk = function(user){
        self.wss.clbks.firebase.removeUser(user)
    }

    self.getall = function(){
        return new Promise((resolve, reject) => {
            db.find({}).exec(function (err, docs) {
                var keys = docs || []

                var apps = (self.id || "").split(',')

                    docs = _.sortBy(docs, function(d){
                        return - Number(d.date || '0')
                    })

                    docs = _.uniq(_.uniq(_.filter(docs, function(d){
                        return apps.indexOf(d.id) > -1
                    }), function(d){
                        return d.token
                    }), function(d){
                        return d.address + d.device
                    })


    
                var users = _.map(keys, function(options){
                    return new Fbtoken(options).export()
                })

                resolve(users)
            })
        })
        
    }

    self.kit = {
        addToken : function({
            token, device, U, id, settings
        }){
            var date = f.time()
            var fbtoken = new Fbtoken({token, device, address : U, id, date, settings})
            if(!fbtoken.check()) return Promise.reject('checkToken')

            return new Promise((resolve, reject) => {

                db.insert(fbtoken.export(), function (err, docs) {
                    if(err) {

                        return reject(err)
                    }

                    adduser(fbtoken.export())

                    resolve(docs)
                });

            })
        },

        setSettings : function({device, settings}){
            return new Promise((resolve, reject) => {
                    const userIndex = self.users.findIndex(el=>el.device===device)
                    if(userIndex >=0){
                        db.update({ device: device }, { $set: { settings: settings } }, {}, function (err) {
                            if(err) return reject(err)
                            resolve()
                        });
                        self.users[userIndex].settings = settings
                        resolve(self.users[userIndex])
                    }
                }
            )
        },

        revokeOtherTokens : function({device, token}){
            var address = U
            var removed = []

            self.users = _.filter(self.users, function(user){
                if (user.device == device && user.token != token){
                    removed.push(user)
                    return false
                }
                return true
            })

            return new Promise((resolve, reject) => {

                db.remove(_.map(removed, r => {

                    return {token : r.token}

                }), function(err, docs) {
                    if(err) return reject(err)

                    _.each(removed, function(user){
                        removeuserclbk(user)
                    })

                    resolve(docs)
                })
            })
        },

        revokeToken : function({token}){

            var removed = []

            self.users = _.filter(self.users, function(user){
                if (user.token === token){
                    removed.push(user)
                    return false
                }
                return true
            })

            return new Promise((resolve, reject) => {

                db.remove({token}, function(err, docs) {
                    if(err) return reject(err)

                    _.each(removed, function(user){
                        removeuserclbk(user)
                    })

                    resolve(docs)
                })
            })
        },

        removeDevice : function({device}){

            var removed = []

            self.users = _.filter(self.users, function(user){
                if (user.device === device){
                    removed.push(user)
                    return false
                }
                return true
            })

            return new Promise((resolve, reject) => {

                db.remove({device}, function(err, docs) {
                    if(err) return reject(err)

                    _.each(removed, function(user){
                        removeuserclbk(user)
                    })

                    resolve(docs)
                })
            })
        },

        mytokens : function({address, device}){

            return new Promise((resolve, reject) => {


                db.find({address : address, device: device}).exec(function (err, docs) {

                    if(err){
                        return reject(err)
                    }

                    var keys = docs || []
        
                    var tokens = _.map(keys, function(options){
                        return new Fbtoken(options).export()
                    })
        
                    resolve(tokens)
                })

            })

        },

        info : function(){
            return Promise.resolve({id : self.id})
        }
    }

    self.checkPermissions = function (type, settings) {
        switch (type) {
            case 'money':
                return settings?.transactions || settings?.t
            case 'winPost':
                return settings?.win || settings?.w
            case 'winComment':
                return settings?.win || settings?.w
            case 'winCommentref':
                return settings?.win || settings?.w
            case 'winPostref':
                return settings?.win || settings?.w
            case 'comment':
                return settings?.comments || settings?.c
            case 'privatecontent':
                return true
            case 'commentDonate':
                return settings?.comments || settings?.c || settings?.transactions || settings?.t
            case 'answer':
                return settings?.answers|| settings?.a
            case 'answerDonate':
                return settings?.answers || settings?.a || settings?.transactions || settings?.t
            case 'subscriber':
                return settings?.followers || settings?.f
            case 'contentscore':
                return settings?.upvotes || settings?.u
            case 'commentscore':
                return settings?.commentScore || settings?.cs
            default:
                return true
        }
    }

    self.send = async function({
        data, users, block
    }){
        for(const user of users){
            if(!self.checkPermissions(data.type, user?.settings)){
                block.pushStatus.unshift(addStatus(user.token, user.address, true, "Disable notification in settings", 0))
                users = users.filter(el=>el.token !== user.token)
            }
        }

        if(!data || !users?.length) {
            self.logger.w('system', 'warn', `Notification: User list is empty`)
            return
        }

        if(!self.app) {
            self.logger.w('system', 'error', `Firebase: Application not inited`)
            return
        }

        if (data.header){
            delete data.outputs;
            delete data.inputs;
            delete data?.relatedContent?.description;
            delete data?.description;

            var message = {
                data: {json: JSON.stringify(data)},
                android: {
                    notification: {
                        priority: "MAX",
                        visibility: "PUBLIC",
                        icon: 'notification_icon',
                        color: '#00A3F7',
                        defaultSound: "true",
                        defaultVibrateTimings: "true",
                        ticker: "Pocketnet"
                    }
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                            'content-available': '1'
                        }
                    }
                }
            };
            block.pushEvents.push(message)
            const sendPush = async (message, tokens, users)=>{
                const resendTokens = [];
                for(let i = 0; i < tokens.length; i += 499) {
                    message.tokens = tokens.slice(i, 499);
                    try {
                        const response = await admin.messaging().sendMulticast(message)
                        for (const responseIndex in response.responses) {
                            const addresses = users.filter(el=>el.token === message?.tokens[responseIndex]).map(el=>el.address)
                            for(const address of addresses) {
                                if (!response.responses[responseIndex]?.success) {
                                    block.pushStatus.unshift(addStatus(message?.tokens[responseIndex], address, true, response.responses[responseIndex]?.error?.errorInfo?.message, response.responses[responseIndex]?.error?.errorInfo?.code))
                                    if (message?.tokens[responseIndex] && errorCodeList.includes(response.responses[responseIndex]?.error?.errorInfo?.code)) {
                                        this.logger.w('system', 'error', `Firebase: Token is inactive, delete token - Message:${response.responses[responseIndex]?.error?.errorInfo?.message} Token: ${message?.tokens[responseIndex]}`)
                                        self.kit.revokeToken({token: message?.tokens[responseIndex]})
                                    } else if (message?.tokens[responseIndex]) {

                                        self.logger.w('system', 'error', `Firebase: Send push (resend after 35s): Message:${response.responses[responseIndex]?.error?.errorInfo?.message} Token: ${message?.tokens[responseIndex]}`)
                                        resendTokens.push(message?.tokens[responseIndex])
                                    }
                                }else {
                                    block.pushStatus.unshift(addStatus(message?.tokens[responseIndex], address, false, "Success", 0))
                                }
                            }
                        }
                    }catch (e) {
                        self.logger.w('system', 'error', `Firebase: Multicast response error (resend after 35s): ${e?.message || e}`)
                        await new Promise(resolve => setTimeout(resolve, 35000))
                        resendTokens.push(tokens.slice(i, 499))
                    }
                }
                return resendTokens
            }

            const resend = [];

            var tokens = users?.filter?.(el=>el?.settings?.web===false).map(el=>el.token) || []
            if (tokens.length) {
                message.notification = data.header;
                const resendTokens = await sendPush(message, tokens, users);
                resend.push(...resendTokens)
            }


            var tokensWeb = users?.filter?.(el=>el?.settings?.web===true).map(el=>el.token) || []
            if (tokensWeb.length) {
                delete message.notification;
                const resendTokens = await sendPush(message, tokensWeb, users)
                resend.push(...resendTokens)
            }

            if(resend?.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 35000))
                await self.send({data, users: users.filter(el=>resend?.includes(el.token)), block})
            }
        }
        return true

    }

    self.sendToDevice = function(data, device, address){
        var user = getuser(address, device)
        if(user)
            return self.send({data, users:[user]})
    }

    self.sendToDevices = function(data, device, address){
        var users = getusers(address, device)
        if(users?.length)
            return self.send({data, users})
    }

    self.sendToAll = async function(data, block){
        var users = getAllUsers()

        if (users?.length) return await self.send({data, users, block})
    }
     
    self.sendEvents = async function(events, block){
        for(const event of events) {
            var users = getUsersByAddresses(event.addresses)
            if (users?.length) await self.send({data: event.notification, users, block})
        }
    }

    self.addEvents = function(events){

        self.query = self.query.concat(events)

    }

    var process = function(){

    }

    self.init = function(p){

        self.destroy()
        
        if (p.key){

            try{
                serviceAccount = require(f.path(p.key));
            } catch (e){ 

                self.logger.w('firebase', 'error', 'Firebase. Init Service Account', e)

            }
        }

        self.id = p.id

        if (serviceAccount){
            self.app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })

            self.inited = true

            return loaddb().then(() => {

                self.processInterval = setInterval(() => {
                    process()
                }, 2000)

            })
        }

        return Promise.resolve()
    }

    self.destroy = function(){

        _.each(self.user, removeuserclbk)

        self.inited = false;
        self.users = [];

        if(self.app) {

            return self.app.delete().then(r => {
                self.app = null

                return Promise.resolve()
            }).catch(e => {
                self.app = null

                admin = require('firebase-admin');

                return Promise.resolve()
            })
        }

        if(self.processInterval){
            clearInterval(self.processInterval)
            self.processInterval = null
        }

        return Promise.resolve()
    }

    self.info = function(){
        return {
            inited : self.inited,
            users : self.users.length,
            useNotifications: self.useNotifications,
        }
    }

    return self;
}

module.exports = Firebase