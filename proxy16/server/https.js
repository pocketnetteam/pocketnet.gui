var https = require('https');
var http = require('http');
var express = require('express');
var Middle = require('./middle.js');
var Cache = require('./cache.js');
var Iplimiter = require('./iplimiter.js');
var compression = require('compression')



var f = require('../functions');

var Server = function(settings, admins, manage){    

    var self = this;

    var app = null;
    var server = null;
    var httpserver = null;
    var middle = new Middle()
    var iplimiter = new Iplimiter(settings.iplimiter)

    var startedDate = null
    var printstatsInterval = null

    self.cache = new Cache({ dontCache: settings.dontCache})
    self.listening = false;
    self.httplistening = false;

    var shouldCompress = function (req, res) {

        if (req.headers['x-no-compression']) {
          return false
        }
      
        return compression.filter(req, res)
    }

    self.authorization = {

        dummy : function(request, result, next){
            next()
        },

        signature : function(request, result, next){

            var authorized = self.proxy.authorization.signature(request.data || {})

            if (authorized){
                next()
            }
            else{
                result._fail('Unauthorized', 401)
            }
        },

        signaturelight : function(request, result, next){

            var authorized = self.proxy.authorization.signaturelight(request.data || {})
     
            next()
        
        }
    }
    
    self.init = function(_settings){

        app = express();
        app.use(express.json({limit: '5mb'})) 
        app.use(express.urlencoded({ extended: true, limit: '5mb' }))
        app.use(compression({ filter: shouldCompress }))

        startedDate = new Date()

        self.cache.init()

        app.use(async (request, result, next) => {

            if (request && request.method && request.method == "OPTIONS"){
                next()
                return
            }

            middle.prepare(request, result, function(){

                

                if (settings.iplimiter && request.clientIP){

                    return iplimiter.check(request.clientIP).then(r => {
                        next()
                    }).catch(e => {
                        result._fail('iplimiter')
                    })
                }

                next()
            })

            
        });

        app.options("*", function(req, res, next){

            middle.headers(req, res, function(){
                res.sendStatus(200)
            })
            
        });

        if(!printstatsInterval)
            printstatsInterval = setInterval(function(){
                middle.printstats()
            }, 60000)

        self.link()

        return self.http(_settings).then(r => {
            return  self.https(_settings)
        })

    }

    self.http = function(settings){
9
        var port = (settings.port || 8899) - 1

        return new Promise((resolve, reject) => {

            //app.use(express.static(f.path('static')))

            httpserver = http.createServer(app)
            
            httpserver.on('listening',function(){

                console.log('listening', port)

                self.httplistening = port

                resolve()
            });

            httpserver.on('error',function(e){
                reject(e) 
            });

            httpserver.on('connection', function(socket) {
                socket.setNoDelay();
            });

            httpserver.listen(port);

            resolve()

        })
       
    }       

    self.https = function(settings){
        return new Promise((resolve, reject) => {
            try{

                if (_.isEmpty(settings.ssl)){
                    reject('sslerror')

                    return
                }

                var cloned = _.clone(settings.ssl)

                if (cloned.passphrase === "*") delete cloned.passphrase

                server = https.createServer(cloned, app)

                server.on('listening',function(){

                    self.listening = settings.port || 8899

                    

                    resolve()
                });

                server.on('error',function(e){
                    reject(e) 
                });

                server.on('connection', function(socket) {
                    socket.setNoDelay();
                });

                server.listen(settings.port || 8899);

                console.log('listen', settings.port || 8899)

            }
            catch(e) {
                console.log("E", e)
                reject(e)
            }

        })
    }

    self.destroy = function(){

        if (server){
            server.close()
            server = null
        }

        if (httpserver){
            httpserver.close()
            httpserver = null
        }

        if(!printstatsInterval){
            clearInterval(printstatsInterval)
            printstatsInterval = null
        }
        
        app = null
        startedDate = null

        middle.clear()

        self.cache.destroy()

        self.listening = false
        self.httplistening = false

        return Promise.resolve()
        
    }

    self.link = function(){

        if(!app) return

        _.each(links, function(link){

            if(typeof link == 'function'){
                link()
            }
            else{
                self.install(link)
            }
            
        })

    }

    self.info = function(compact){
        return {
            iplimiter : iplimiter.info(),
            middle : middle.info(compact),
            cache : self.cache.info(),
            listening : self.listening,
            httplistening : self.httplistening,
            startedDate
        }
    }

    var links = {
        all : function(){

            _.each(self.proxy.api, function(pack){
                _.each(pack, function(meta){

                    app.all(meta.path, self.authorization[meta.authorization || 'dummy'], function(request, result){

                        if(!self.listening){
                            result._fail('stopped', 500)
    
                            return
                        }

                        meta.action(request.data, request).then(d => {

                            result._success(d.data, d.code, d, meta.formatdata)

                        }).catch(e => {
                            result._fail(e, e.code)
                        })
                    
                    })

                })
            })

        }
    }

    self.middle = middle

    return self
}

module.exports = Server