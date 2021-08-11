var https = require('https');
var http = require('http');
var express = require('express');
var swaggerUi = require('swagger-ui-express');
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

    

    self.cache = new Cache()
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
    
    self.init = function(settings){

        app = express();
        app.use(express.json({limit: '5mb'})) 
        app.use(express.urlencoded({ extended: true, limit: '5mb' }))
        app.use(compression({ filter: shouldCompress }))

        app.use(async (request, result, next) => {

            middle.prepare(request, result, function(){


                if (settings.iplimiter){

                    return iplimiter.check().then(r => {
                        next()
                    }).catch(e => {

                        result._fail('iplimiter')
                    })
                }

                next()
            })

            
        });

        app.options("/*", function(req, res, next){
            res.sendStatus(200)
        });

        self.link()

        return self.http().then(r => {
            return  self.https(settings)
        })

    }

    self.http = function(){

        var port = 80


        return Promise.resolve()

        return new Promise((resolve, reject) => {

            app.use(express.static(f.path('static')))

            httpserver = http.createServer(app)
            
            httpserver.listen(port);

            httpserver.on('listening',function(){
                self.httplistening = port
            });

            httpserver.on('error',function(e){});

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


                server = https.createServer(settings.ssl, app)

                server.on('listening',function(){

                    self.listening = settings.port || 8899

                    resolve()
                });

                server.on('error',function(e){


                    reject(e) 
                });

                server.listen(settings.port || 8899);

            }
            catch(e) {

          
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

        app = null

        middle.clear()

        self.listening = false

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
            httplistening : self.httplistening
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

                        meta.action(request.data).then(d => {
                            result._success(d.data, d.code)
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