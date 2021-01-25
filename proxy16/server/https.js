var https = require('https');
var express = require('express');
var swaggerUi = require('swagger-ui-express');
var Middle = require('./middle.js');
var Cache = require('./cache.js');
var Iplimiter = require('./iplimiter.js');

const { performance } = require('perf_hooks');
var svgCaptcha = require('svg-captcha');

var f = require('../functions');

var Server = function(settings, manage){    

    var self = this;

    var app = null;
    var server = null;
    var middle = new Middle()
    var iplimiter = new Iplimiter(settings.iplimiter)

    

    var captchas = {};
    var captchaip = {};

    self.cache = new Cache()
    self.listening = false;

    self.authorization = {
        signature : function(request, result, next){

            if(!request.data.signature){
                var authorized = self.pocketnet.kit.authorization.signature(request.data.signature)

                if (authorized){

                    request.data.U = request.data.signature.address //User Address

                    if(_.indexOf(settings.admins, request.data.U) > -1) request.data.A = true //User is proxy Admin

                    next()

                    return
                }
            }

            result._fail('Unauthorized', 401)
        

        }
    }
    
    self.init = function(settings){

        app = express();
        app.use(express.json({limit: '5mb'})) 
        app.use(express.urlencoded({ extended: true, limit: '5mb' }))

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

        self.link()

       

        return new Promise((resolve, reject) => {
            try{

                server = https.createServer(settings.ssl, app)

                server.on('listening',function(){

                    self.listening = true

                    resolve()
                });

                server.on('error',function(e){
                    reject(e) 
                });

                server.listen(settings.port || 8888);

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
            app = null
        }

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

    self.info = function(){
        return {
            iplimiter : iplimiter.info(),
            middle : middle.info(),
            cache : self.cache.info(),

            captcha : {
                ip : _.toArray(captchaip).length,
                all : _.toArray(captchas).length
            }
        }
    }

    var links = {
        node : function(){
            app.all('/rpc-*', function(request, result){
                
                var parsed = [];
                var node = null;
	
				try{
					parsed = JSON.parse(request.data.parameters) || []
                } catch(e){}
                
                var err = null

                var cached = self.cache.get(request.data.method, parsed)

                if (cached){
                    result._success(cached, 208)
                    return
                }

                if (request.data.nodelocally){
                    node = self.nodeManager.temp(request.data.nodelocally)
                }

                if(request.data.node){
                    if(request.data.node == 'auto') node = self.nodeManager.selectbest()

                    else{
                        node = self.nodeManager.nodesmap[request.data.node]

                        if(!node) {
                            result._fail("node", 502)
                            return
                        }
                    }
                }

                if(!node) node = self.nodeManager.selectbest()

                if(!node) {
                    result._fail('node', 502)

                    return
                }

                node.checkParameters().then(r => {
                    return node.rpcs(request.data.method, parsed).then(data => {

                        self.cache.set(request.data.method, parsed, data, node.height())

                        result._success(data)
    
                        return Promise.resolve()
                    })
                }).catch(e => {
                    result._fail(e, e.code)
                })

        
            
            })
        },

        nodeManager : function(){
            app.all('/nodes/revoke', self.authorization.signature, function(request, result){
                var node = _.clone(request.data.node)

                self.nodeManager.revoke(node, request.data.A).then(r => {
                    result._success(r)
                }).catch(e => {
                    result._fail(e)
                })
            })

            app.all('/nodes/update', self.authorization.signature, function(request, result){
                var node = _.clone(request.data.node)

                self.nodeManager.update(node, request.data.A).then(r => {
                    result._success(r)
                }).catch(e => {
                    result._fail(e)
                })
            })

            app.all('/nodes/create', self.authorization.signature, function(request, result){
                var node = _.clone(request.data.node)

                node.addedby = request.data.U

                self.nodeManager.create(node).then(r => {
                    result._success(r)
                }).catch(e => {
                    result._fail(e)
                })
            })

            app.all('/nodes/get', function(request, result){

                result._success({
                    nodes : self.nodeManager.getnodes()
                })
            })
        },

        remote : function(){
            app.all('/bitchute', function(request, result){

                self.remote.make(request.data.url, function(err, data, html, $){
	
					if(!err){
	
						data.magnet = $('[title="Magnet Link"]').attr('href')
	
						if(data.magnet && data.magnet.indexOf("magnet") == 0){
	
							var sp = parameters(data.magnet, true);
							
							data.video = sp;
	
							if(data.og){
								data.video.title = data.og.titlePage
								data.video.preview = data.og.image
							}
	
						}

						else{

							var src = $('#player source').attr('src')

							if (src){
								data.video = {
									as : src
								}

								if(data.og){
									data.video.title = data.og.titlePage
									data.video.preview = data.og.image
								}
							}

                        }
                        
                        result._success(data)
					}
					else
					{
                        result._fail(err)
					}	
	
	
				})
            })

            app.all('/url', function(request, result){

                connect.remote.make(request.data.url, function(err, data, html){
        
                    if(!err){
                        data.html = html
                        result._success(data)
					}
					else
					{
                        result._fail(err)
					}	

                })

            })

            app.all('/urlPreview', function(request, result){

                connect.remote.make(request.data.url, function(err, data, html){
        
                    if(!err){
                        result._success(data)
					}
					else
					{
                        result._fail(err)
					}	

                })

            })

            
        },

        info : function(){
            app.all('/info', function(request, result){

                result._success({
                    info : self.info()
                })

            })

            app.all('/logs', function(request, result){

                var data = {
					logs : middle.getlogs(),
                    ws : self.wss.info(),
                    iplimiter : iplimiter.info()
				}

                result._success(data)

            })

            app.all('/stats', function(request, result){

                result._success({
                    stats : self.proxy.stats()
                })

            })

            app.all('/nodes', function(request, result){

                result._success({
                    stats : self.nodeManager.info()
                })

            })

                 
        },

        captcha : function(){
            app.all('/captcha', function(request, result){

                var captcha = request.data.captcha
                var ip = request.clientIP

                if (captcha && captchas[captcha] && captchas[captcha].done){

					result._success({
						id : captchas[connect.parameters.captcha].id,
						done : true,
						result : captchas[connect.parameters.captcha].text

					})

					return
                }

                captchaip[ip] || (captchaip[ip] = 0);
                captchaip[ip]++
                
                var captcha = svgCaptcha.create({
					size : 4,
					noise : 12,
					color : false,
					ignoreChars: '0o1liy',
					width : 250
				});
				
				captcha.id = f.makeid();

				captchas[captcha.id] = {
					text : captcha.text.toLocaleLowerCase(),
					id : captcha.id,
					done : false,
					time : new Date()
                }
                
                result._success({

					id : captcha.id,
					img : captcha.data,
					result : captcha.text, ///
					done : false

				})
                
            })

            app.all('/makecaptcha', function(request, result){

                var captcha = captchas[request.data.captcha];

				if(!captcha){

                    result._fail('captchanotexist')

					return
				}

				if (captcha.done){
					result._success({
						id : captcha.id,
						done : true
                    })
                    
					return
				}

				if (captcha.text == connect.parameters.text.toLocaleLowerCase()){

					captcha.done = true

					delete captchaip[connect.ip]

					result._success({

						id : captcha.id,
						done : true

                    })
                    
                    return
				}

                captcha.shot || (captcha.shot = 0)
                captcha.shot++;

                var currentTime = new Date()

                if (
                    captcha.shot >= 5 || 

                    f.date.addseconds(captcha.time, 120) < currentTime ||
                    f.date.addseconds(captcha.time, 2) > currentTime
                ){

                    delete captchas[request.data.captcha];

                    result._fail('captchashots')

                    return
                }

                result._fail('captchanotequal')
                
            })
        },

        firebase : function(){
            app.all('/firebase/set', function(request, result){

                if(!self.firebase){
                    result._fail('firebase')
                }

                self.firebase.kit.addToken(request.data).then(result._success).catch(result._fail)

            })

            app.all('/firebase/revokedevice', function(request, result){
                if(!self.firebase){
                    result._fail('firebase')
                }

                self.firebase.kit.removeDevice(request.data.device).then(result._success).catch(result._fail)
            })
        },

        wallet : function(){

            app.all('/free/registration', function(request, result){

                var captcha = request.data.captcha

                if(!settings.captcha){
                    if((!captcha || !captchas[captcha] || !captchas[captcha].done)){

                        result._fail('captcha')
    
                        return
                    }
                }

                self.wallet.kit.addqueue(request.data.key || 'registration', request.data.address, request.clientIP).then(result._success).catch(result._fail)
            })

        },

        manage : function(){
            app.all('/manage', function(request, result){

                var message = request.data

                var authorized = self.pocketnet.kit.authorization.signature(message.signature, settings.admins || [])

                if(!authorized){
                    return result._fail('Unauthorized', 401) 
                }

                var kaction = f.deep(manage, message.action)

                if(!kaction) {
                    return result._fail('unknownAction', 502) 
                }

                return kaction(message.data).then(data => {
                    result._success(data)
                }).catch(e => {
                    result._fail(e, e.code)
                })


            })
        }

    }

    return self
}

module.exports = Server