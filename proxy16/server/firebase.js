var Datastore = require('nedb');
var f = require('../functions');

var Fbtoken = function({
    token, device, address, id, app, date
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
    var db = new Datastore(f.path(p.dbpath));
    
    self.users = [];
    self.inited = false;

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

    var finduser = function(_user){
        return _.find(self.users, function(user){
            return user.address == _user.address && user.device == _user.device
        })
    }

    var adduser = function(user){
        console.log("Login user: ", user)
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

    var messages = {

        // comment : function(data){
        //
        //     if (data.reason == 'post') {
        //         n.body = data.username + " commented your post."
        //         n.title = "New Comment"
        //     }
        //
        //     if (data.reason == 'answer' && data.comment && data.share && data.user) {
        //         n.body = data.username + " answered on your comment."
        //         n.title = "New Comment"
        //     }
        //
        //     return m
        // },


        commentscore : function(data){

            var m = {
                title : "New Comment Rate",
                body : data?.account?.name + " is your new referral!"
            }

            return m
        },

        answer : function(data){

            var m = {
                body : data?.account?.name + " answered on your comment.",
                title : "New answer"
            }

            return m
        },

        comment : function(data){

            var m = {
                body : data?.account?.name + " commented your post.",
                title : "New Comment"
            }

            return m
        },

        subscriber : function(data){

            var m = {
                body : data?.account?.name + ' followed you',
                title : "New Follower"
            }

            return m
        },

        contentscore : function(data){

            var m = {
                title : "New Content Rate",
                body : data?.account?.name + " is your new referral!"
            }

            return m
        },


        boost : function(data){

            var m = {
                title : "New boost",
                body : data?.account?.name + " is your new boost!"
            }

            return m
        },

        privatecontent : function(data){

            var m = {
                title : "New private content",
                body : data?.account?.name + " sent you the content"
            }

            return m
        },
        

        referal : function(data){

            var m = {
                title : "You have a new referral",
                body : data?.account?.name + " is your new referral!"
            }

            return m
        },

        repost : function(data){

            var m = {
                title : "New Post Reshare",
                body : data.username + " reshared your post!"
            }

            return m
        },

        pocketnetteam: function (data){
            var m = {
                title : "New post from the team",
                body : data?.description
            }

            return m
        },

        postfromprivate : function(data){

            var m = {
                title : "New Post From Pocketnet User",
                body : data.account?.name + " has a brand new post!"
            }

            return m
        },

        sharepocketnet : function(data){

            var m = {
                title : "New Post From Pocketnet Team",
                body : "Pocketnet team has a brand new post!"
            }
            
            return m
        },

        money : function(data){

            var m = {}
                m.body = (data?.account?.name || "User") + " replenished coins!"
                m.title = 'Congrats!'
            return m

        },

        event : function(data){

            var m = {}

            if (data.mesType == 'userInfo') {
                m.body = "You rescued someone from the censored web!"
                m.title = 'Congrats!'
            }

            if (data.mesType == 'subscribe') {
                m.body = data.username + ' followed you'
                m.title = "New Follower"
            }

            if (data.mesType == 'upvoteShare') {

                if (data.upvoteVal > 2) {
                    m.body = data.username + " upvoted your post, " + data.upvoteVal + ' ★'
                    m.title = "New Upvote"
                }
                else{
                    return null
                }
            }

            return m
         
        },
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
            token, device, U, id
        }){
            console.log("Change token user: ", token)
            var date = f.time()
            var fbtoken = new Fbtoken({token, device, address : U, id, date})
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

        revokeToken : function(token){

            var removed = []

            self.users = _.filter(self.users, function(user){
                if (user.token == token){
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
                if (user.device == device){
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

        mytokens : function({address}){


            return new Promise((resolve, reject) => {

            
                db.find({address : address}).exec(function (err, docs) {

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

    self.send = function({
        data, users
    }){


        if(!data || !users?.length) return Promise.reject()

        if(!self.app) return Promise.reject('app')

        if (data.nameFrom) data.username = data.nameFrom

        if(!data.username){

            data.username = 'Somebody'

            //return Promise.reject('username')
        }

        var m = null;

        if (data.msg == 'transaction' && data.mesType) {
            data.type = data.mesType
            delete data.mesType
        }

        if (data.mesType) m = messages[data.mesType]
        if (data.msg && !m) m = messages[data.msg]
        if (data.type && !m) m = messages[data.type]

        if (m){
            var notification = m(data)
            var tokens = users?.map(el=>el.token) || []
            if (notification && tokens.length) {
                for (let i = 0; i < tokens.length; i += 999) {
                    const maxSizeTokens = tokens.slice(i, 999);

                    var message = {
                        tokens: maxSizeTokens,
                        data: {json: JSON.stringify(data)},
                        notification: notification,
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
                    return admin.messaging().sendMulticast(message).then((response) => {
                        for(const responseIndex in response.responses) {
                            if(!response.responses[responseIndex].success && users[responseIndex]){
                                    self.kit.revokeToken(users[responseIndex].token)
                            }
                        }
                        return Promise.resolve(response)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    });
                }
            }
        }

        return Promise.resolve()

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

    self.sendToAll = function(data){
        var users = getAllUsers()
        if(users?.length)
            self.send({data, users})
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

            return loaddb()
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

        return Promise.resolve()
    }

    self.info = function(){
        return {
            inited : self.inited,
            users : self.users.length
        }
    }

    return self;
}

module.exports = Firebase