
var Datastore = require('nedb');
var f = require('../functions');
var EmailValidator = require("email-validator");
var nodemailer = require('nodemailer');
var EmailCreator = require('./emailcreator.js');
const { pullAt } = require('lodash');

var Emails = function(p){
    var self = this

    var transporter = null
    var inited = false

    var db = new Datastore(f.path(p.dbpath));

    var emailCreator = new EmailCreator()

    self.destroy = function(){

        if (unspentsInterval){
            clearInterval(unspentsInterval)
            unspentsInterval = null
        }

        if (processInterval){
            clearInterval(processInterval)
            processInterval = null
        }

        return Promise.resolve()
    }

    self.init = function(){

        if(!p || !p.emailshost)
            return Promise.reject('params')


        var emails = {	
            host: p.emailshost,
            port: p.post,
            secure: p.secure,
            from: p.login, // true for 465, false for other ports
            auth: {
                user: [p.login], // generated ethereal user
                pass: p.password // generated ethereal password
            },
        }

        inited = true;


        transporter = nodemailer.createTransport(emails);

        return new Promise((resolve, reject) => {

            db.loadDatabase(err => {

                resolve()

            })

        })

    }

    self.dbapi = {
        insert : function(email, code){

            return new Promise((resolve, reject) => {

                var object = {
                    email : email,
                    id : f.makeid(),
                    executed : '-',
                    date : f.now(),
                    check : false,
                    code : code
                } 

                db.insert(object, function (err, docs) {
                    if(err) {

                        return reject(err)
                    }

                    resolve(object.id)
                });

                

            })
        },

        checkcode : function(email, code){

            return new Promise((resolve, reject) => {

                return db.find({email, code}, function (err, docs) {
                    
                    if (err){

                        return reject(err);
                    }

                    if (docs && docs.length){

                        var lastHour = docs.find(function(i){
                            return Date.parse(f.now()) - Date.parse(i.date) < 3600000;
                        })
                        

                        return resolve({code: Boolean(lastHour)})
                    } 

                    return resolve({code: false})

                })

            })

        },

        check : function(email){

            return new Promise((resolve, reject) => {

                return db.find({email, check: true}, function (err, docs) {
                    
                    if (err){

                        return reject(err);
                    }

                    if (docs && docs.length){

                        return resolve({newEmail: false})
                    } 

                    return resolve({newEmail: true})

                })

            })
        },

        update : function(email, code){

            return new Promise((resolve, reject) => {

                return db.find({email: email, check: true}, function (err, docs) {
                    
                    if (err){

                        return reject(err);
                    }

                    if (!docs && docs.length){

                        return resolve({newEmail: true})

                    } 

                    return db.update({email: email, code: code}, {$set: { check: true }}, function(err, docs){

                        return db.remove({email: email, check: false}, {multi: true}, function(err, numRemoved){

                            return resolve({updated: true})

                        })
                    })



                })

            })   

        }


    }

    self.kit = {

        makecode : function() {
            return Math.floor(100000 + Math.random() * 900000)
        },

        check : function(email){

            if (!EmailValidator.validate(email)) return Promise.reject();

            return self.dbapi.check(email);

        },

        verify : function(email){

            if (!EmailValidator.validate(email)) return Promise.reject();

            var code = self.kit.makecode()

            var exdata = {
                code: code,
                from: {name: 'Pocketnet'},
                to: {name: 'User'}
            };

            var template = 'sendgiftcode';
            
            return self.email.send(template, exdata, email).then(function(result){

                self.dbapi.insert(email, code);

                return Promise.resolve(result);

            })
            .catch((err) => {

                console.log('sendcode err!!!', err);
                return Promise.reject(err);
            })

        },

        checkcode : function(email, code){

            return self.dbapi.checkcode(email, code);
        },


        update : function(email, code){

            
            return self.dbapi.update(email, code);
        },

        


    }

    
    self.email = {
        send : function(template, data, to){

            var exdata = _.clone(data)

            // console.log('exdata', exdata, p);

            var created = emailCreator.create(template, exdata).then(t => {
                t.from = p && p.login 
                t.to = [to]

                return Promise.resolve(transporter.sendMail(t));
            }).catch(e => {
                console.log("EMAIL SEND ERROR", e.code);
                return Promise.reject(e)
            })

            return created;
           
        },
        
        sendPlain : function(data){

            var plainText = data.html.replace(/<[^>]*>?/gm, '');
            
            var message = {
                from: p.from,
                to: data.to,
                subject: data.subject,
                text: plainText,
                html: data.html
            };

            return transporter.sendMail(message)
            .catch(e => {
                console.log("EMAIL SEND ERROR PLAIN", e)
                return Promise.reject(e)
            })
            
           
        }
    }


    self.info = function(){

        var info = {
            inited : inited,
        }

        return info
    }

    self.inited = function(){
        return inited
    }

    self.stats = function(){

    }

    return self
}

module.exports = Emails
