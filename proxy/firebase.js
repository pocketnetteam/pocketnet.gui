var Firebasetoken = require("./objects/firebasetoken");

var Firebase = function(p){
    if(!p) p = {};

    var self = this;

        self.ws = null;

    

    var admin = require('firebase-admin');
    var serviceAccount = null;
    

    var getNotification = function(data, user, clbk){


        var m = null;

        if (data.msg == 'transaction'){
            data.type = data.mesType
            delete data.mesType
        }
        
        if (data.mesType) m = self.wsn.messages[data.mesType]
        if (data.msg && !m) m = self.wsn.messages[data.msg]

        if(!m) m = {}



        var loadclbk = function(){
            var notification = m.notificationData(data, user)

            if (clbk)
                clbk(notification)
        }

        if (m.notificationData){
            if (m.loadMore)
            {
                m.loadMore(data, loadclbk, true);
            }
    
            else
            {
                loadclbk();
            }
        }

        else{
            if (clbk)
                clbk(null)
        }

       

    }

    self.app = null;

    self.users = {
        val : [],

        dev : {},

        removeDevice : function(device){
            this.remove(this.dev[device])  
        },

        revokeOtherTokens : function(token, device){

            if(this.dev[device] && this.dev[device].token != token){
                this.remove(this.dev[device])  
            }

            
        },

        remove : function(user){
            if(user){
                removeEqual(this.val, user);

                delete this.dev[user.device];

                var wsclbk = deep(self, 'ws.clbks.firebase.removeUser')

                if (wsclbk){
                    wsclbk(user)
                }
            }
        },  

        add : function(user){

            if(_.find(this.val, function(u){
                return u.device == user.device && u.token == user.token && u.address == user.address
            })) return

            this.val.push(user);

            this.dev[user.device] = user

            var wsclbk = deep(self, 'ws.clbks.firebase.addUser')

            if (wsclbk){
                wsclbk(user)
            }
        }   
    };

    self.send = function(p){

        var user = self.users.dev[p.device]

        if (user){

            var originalData = _.clone(p.data)


            getNotification(p.data, user, function(ndata){
                var message = {

                    data: originalData,    
                    token: user.token

                };

                if(ndata){

                    message.notification = {
                       
                        title: ndata.caption,
                        body: ndata.text,
                        
                    }

                    message.android = { 

                        notification: {
                            icon: 'notification_icon',
                            sound : 'default',
                            color : '#00A3F7',
                            click_action:  "FCM_PLUGIN_ACTIVITY",
                        },
                    }

                    
                }

                else{



                }

                admin.messaging().send(message)
                .then((response) => {
                    //console.log('Successfully sent message:', response);
                })
                .catch((error) => {

                    if  (deep(error,'errorInfo.code') == 'messaging/registration-token-not-registered' 
                      || deep(error,'errorInfo.code') == 'messaging/invalid-argument'){
                        self.revokeToken(user)
                    }

                });
            })

            

        }

    }

    self.init = function(){

        if(serviceAccount){

            self.app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                //databaseURL: 'https://pocketnet.firebaseio.com'
            });
    
    
            self.wsn = new p.app.platform.WSn(p.app.platform)

        }

    }

    self.revokeToken = function(user, clbk){
        var firebasetoken = new Firebasetoken(user, p)

            firebasetoken.revokeToken(function(err){

                if(!err){

                    self.users.remove(user)

                    if (clbk)
                        clbk(null)
                }

                else{
                    if (clbk)
                        clbk(err)
                }

                
            })
    }

    self.revokeOtherTokens = function(_p, clbk){
        var firebasetoken = new Firebasetoken(_p, p)

            firebasetoken.revokeOtherTokens(function(err){

                if(!err){

                    self.users.revokeOtherTokens(_p.token, _p.device)

                    if (clbk)
                        clbk(null)
                }

                else{
                    if (clbk)
                        clbk(err)
                }

                
            })
    }

    self.revokeDevice = function(_p, clbk){
        var firebasetoken = new Firebasetoken(_p, p)

            firebasetoken.revokeDevice(function(err){

                if(!err){

                    self.users.removeDevice(_p.device)

                    if (clbk)
                        clbk(null)
                }

                else{
                    if (clbk)
                        clbk(err)
                }

                
            })
    }
    
    self.addToken = function(_p, clbk){
        var firebasetoken = new Firebasetoken(_p, p)

            firebasetoken.create(function(err, me){
                

                if(!err){

                    self.revokeOtherTokens(_p, function(err){

                        if(err){
                            //nsole.log("ERROR ADDTOKEN REVOKE")
                        }

                        self.users.add(me);

                        if (clbk)
                            clbk(null, me)
                    })
                    
                }

                else{
                    if (clbk)
                        clbk(err, me)
                }

                
            })
    }

    self.getUsers = function(clbk){


        var firebasetoken = new Firebasetoken(null, p)

        firebasetoken.all(function(err, tokens){


            if(err){
                if (clbk){
                    clbk(self.users.val)
                }
            }

            else{
                self.users.val = tokens

                
                _.each(tokens, function(t){

                    self.users.dev[t.device] = t

                })

                var wsclbk = deep(self, 'ws.clbks.firebase.addUsers')

                if (wsclbk){
                    wsclbk(tokens)
                }

                if (clbk){
                    clbk(tokens)
                }
            }

            

        })
    

    }

    self.prepare = function(fbk){
        serviceAccount = null;
        
        if(fbk){
            try{
                serviceAccount = require(fbk);
            }
            catch (e){
            }
        }

        if(serviceAccount) return true;

        else return false
    }

    self.admin = admin;

    return self;
}

module.exports = Firebase