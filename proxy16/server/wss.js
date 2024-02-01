const https       = require('https');
const http       = require('http');
const WebSocket   = require('ws');
var f = require('../functions');
var _ = require('underscore')

var WSS = function(admins, manage){
    var self = this;
        self.listening = false;
        self.httplistening = false

    var wss = null, server = null, ws = null, httpserver = null;

    var users = {}

    var allwss = {}
    var allws = {}

    var terminated = 0,
        edisconnect = 0,
        econnect = 0;

    var gcinfointerval = null

    var subscribers = {
        logs : {}
    }

    var create = {
        user : function(address){

            var admin = _.indexOf(admins, address) > -1

            var user = {
    
                devices : {
                    ws : {},
                    fb : {}
                },
    
                address: address,
                firebase : {},
    
                clients: {},
                nodes : {},
                ticks : {},

                admin
            }
    
            return user
        },

        node : function(p){

            var node = null
            var auto = true

            return self.nodeManager.waitready().then(r => {
                if (p){

                    if(_.isObject(p)){
                        node = self.nodeManager.temp(p)
                    }
                    else
                    {
                        node = self.nodeManager.nodesmap[p]
                    }
                    
                    auto = false
                }
                else{
                     // || self.nodeManager.select(0)
                }
    
                if(!node){
    
                    return f.pretry(function(){
                        node = self.nodeManager.selectProbability()
    
                        if (node)
                            auto = true
    
                        return Promise.resolve(node)
                    }, 100, 10000).then(r => {
    
                        if(node){

                            return Promise.resolve({
                                instance : node,
                                ini : {},
                                auto : auto,
                                key : node.wskey
                            })

                        }
                        else
                        {
                            return Promise.reject('empty')
                        }
    
                    })
                    
                }
    
                return Promise.resolve({
                    instance : node,
                    ini : {},
                    auto : auto,
                    key : node.wskey
                })
            })

            

        }
    }

    var connectNode = function(user, node) {

        var ws = node.instance.wss.add(user)

        if(!ws) return

        ws.on('open', () => {})
        ws.on('disconnected', () => {

            if (node.auto) {
                disconnectNode(user)

                create.node().then(node => {

                    connectNode(user, node)

                }).catch(e => {})

                return
            }

            connectNode(user, node)
        })

        ws.on('changenode', (data) => {

            _.each(node.ini, function(client){

                if (client.type == 'firebase'){

                    /*disconnectNode(user)

                    create.node(data.node).then(node => {
                        connectNode(user, node)
                    }).catch(e => {})*/


                }
                else{

                    sendMessage({

                        type : 'changenode',
                        data : data

                    }, client.ws).catch(e => {})

                }

            })

        })

        ws.on('message', (data) => {
           
            var fbdata = {}; 

            data.node = node.instance.ckey

            _.each(data, (d, k) => { fbdata[k] = (d || "").toString() })

            
                      
            _.each(node.ini, function(client){


                if (client.type == 'firebase'){

                    if (data.msg == 'new block') return     

                    if (self.firebase){

                        self.firebase.sendToDevice(fbdata, client.device, client.address).catch(e => {
                            console.error(e)
                        })

                    }

                }
                else{
                    sendMessage(data, client.ws).catch(e => {})
                }

            })
            
        });

        ws.on('error', (e) => {
            //console.log(e)
        })

    }

    var disconnectNode = function(user){
        var clearNodes = []

        _.each(user.nodes, function(node, key){

            if (_.isEmpty(node.ini)){

                node.instance.wss.disconnect(user)
                clearNodes.push(key)

            }
        })

        _.each(clearNodes, function(key){
            delete user.nodes[key] 
        })
    }

    var disconnectClient = function(ws) {

       

        delete allwss[ws.id]
        delete allws[ws.id]

        var wsusers = _.filter(users, function(user){
            return user.clients[ws.id] || user.devices.ws[ws.id]
        })
        
        var clearUsers = []

        _.each(wsusers, function(user){
            delete user.clients[ws.id]
            delete user.devices.ws[ws.id]

            if (user.ticks[ws.id]){
                clearInterval(user.ticks[ws.id])
                delete user.ticks[ws.id]
            }

            _.each(user.nodes, function(node, key){
                delete node.ini[ws.id]
            })

            disconnectNode(user)

            if (_.isEmpty(user.devices.ws) && _.isEmpty(user.devices.fb)){
                clearUsers.push(user.address)
            }

        })

        _.each(clearUsers, function(key){
            delete users[key] 
        })

        //console.log('disconnectClient', ws.id, _.toArray(users).length, Object.keys(allwss), Object.keys(allws))

        edisconnect++
    }


    self.sendtoall = function(message){

        _.each(allwss, function(ws){
            sendMessage(message, ws).catch(e => {})
        })

        _.each(allws, function(ws){
            sendMessage(message, ws).catch(e => {})
        })

        return Promise.resolve()
    }

    self.sendlogs = function(info){

        /*var m = {
            level : info.level,
            message : info.message,
            meta : info.meta,
            label : info.label,
            timestamp : info.timestamp
        }*/
  
    }

    var sendMessage = function(message, ws){

        return new Promise((resolve, reject) => {

            var str = null

            try{
                str = JSON.stringify(message)
            }
            catch(e){

                return
            }

            ws.send(str, (err) => {
                if (err) reject(err)
                else resolve()
            });

        })
       
    }

    var tick = function(ws) {

		manage.get.settings().then(settings => {

            manage.get.state(true).then(state => {

                sendMessage({
                    type : 'proxy-message-tick',
                    data : {
                        state : state,
                        settings : settings
                    }
                }, ws).catch(e => {})
    
            })
			
		})

		
        
	}

    var messages = {
        signout : function(message, ws){
            disconnectClient(ws)
        },

        subscribelogs : function(message, ws){
            var admin = _.find(users, function(user){
                return user.clients[ws.id] && user.admin
            })

            if (admin) {

            }
        },

        registration : function(message, ws){
            
            var address = message.address;
            var signature = message.signature;
            var device = message.device;
            var block = message.block || 0;

            if(!address || !device) {
                sendMessage({
                    msg : 'address, device'
                }, ws).catch(e => {
                    
                })

                return
            }

            var user = null
      
            var authorized = self.pocketnet.kit.authorization.signature(signature, address)

            if(!authorized) {
                sendMessage({
                    msg : 'notauthorized'
                }, ws).catch(e => {
                    
                })

                return
            }

            if(!users[address]) 
                users[address] = create.user(address)

            user = users[address]

            user.clients[ws.id] = ws
            user.devices.ws[ws.id] = device

            create.node(message.node).then(node => {

                sendMessage({
                    msg : node ? "registered" : 'registererror',
                    addr : user.addr,
                    node : node.instance.export()
                }, ws).catch(e => {})
    
                user.nodes[node.key] || (user.nodes[node.key] = node)
    
                user.nodes[node.key].ini[ws.id] = {
                    type : 'ws',
                    ws : ws,
                    ip : ws.ip
                }
    
                if (user.admin){
                    user.ticks[ws.id] = setInterval(() => {tick(ws)}, 30000)
                }
    
                connectNode(user, user.nodes[node.key]);
               
            }).catch(e => {

                sendMessage({
                    msg : 'registererror',
                    addr : user.addr,
                    node : message.node
                }, ws).catch(e => {

                })

                setTimeout(function(){
                    if (ws.close)
                        ws.close()
                }, 2000)

            })

        }
    }

    var handleMessage = function(msg, ws){
        //// 
        var message = {}
        
        try{
            message = JSON.parse(msg)
        } catch(e){}


        if(!message.action) {
            messages.registration(message, ws)
            return
        }

        if (messages[message.action]){
            messages[message.action](message, ws)
        }

    }

    self.newconnection = function(ws, all){
        ws.id = f.makeid();

        var disc = false

        ws.on('message', (msg) => {
            handleMessage(msg, ws)
        })

        ws.on('close', (code, reason) => {
            if (disc) return
                disc = true

            disconnectClient(ws)
        });

        ws.on('error', (err) => {

            if (disc) return
                disc = true

            disconnectClient(ws)
        });

        all[ws.id] = ws

        econnect++
        
    }

    self.wssdummy = function(wssdummy){
        self.newconnection(wssdummy, allwss)
    }

    

    self.init = function(settings){

        terminated = 0
        edisconnect = 0
        econnect = 0

        var port = settings.port || 8099
        
        return new Promise((resolve, reject) => {

            try{
            
                if (_.isEmpty(settings.ssl)){
                    reject('sslerror')

                    return
                }

                if(!gcinfointerval) {
                    gcinfointerval = setInterval(self.gc, 10000)
                }

                createWss(port, settings).then(() => {

                    return createWs(port - 1, settings)

                }).then(resolve).catch(e => {
                    console.log('init wss', e)
                    reject(e)
                })

            }

            catch(e) {
                reject(e)
            }

        })
    }

    var createWss = function(port, settings){

        return new Promise((resolve, reject) => {

            server = new https.createServer(settings.ssl);

            wss = new WebSocket.Server({
                server: server
            });

            wss.on('connection', (ws, req) => {

                if(!self.listening) return
                
                ws.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
                
                self.newconnection(ws, allwss)

            })

            wss.on('listening',function(){

                self.listening = port

                resolve()
            });

            wss.on('error',function(e){
                reject(e) 
            });

            server.listen(port);

        })
        
    }

    var createWs = function(port, settings){

        return new Promise((resolve, reject) => {

            httpserver = new http.createServer();

            ws = new WebSocket.Server({
                server: httpserver
            });

            ws.on('connection', (ws, req) => {

                if(!self.listening) return
                
                ws.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
                
                self.newconnection(ws, allws)

            })

            ws.on('listening',function(){

                self.httplistening = port


                resolve()
            });

            ws.on('error',function(e){
                reject(e) 
            });

            httpserver.listen(port);

        })
    }

    var _gc = function(_wss){
        try{

            if (_wss && _wss.clients)
                _wss.clients.forEach((socket) => {

                    if ([socket.CLOSED].includes(socket.readyState)) {

                        if (allwss[socket.id]){
                            disconnectClient(socket)
                        }

                        if(allws[socket.id]){
                            disconnectClient(socket)
                        }

                    }

                    if(!allwss[socket.id] && !allws[socket.id]){
       
                        terminated++
                        socket.terminate();
                    }

                });

        }
        catch(e){
            console.error('_gc', e)
        }
    }

    var _closeall = function(_wss){

        try {
            if (_wss && _wss.clients){
                _wss.clients.forEach((socket) => {

                    if (socket) socket.terminate();

                });
            }
        }
        catch (e) {
        }

    }

    var _terminate = function(_wss){
        try {

            if (_wss && _wss.clients){
                _wss.clients.forEach((socket) => {
                    if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
                        terminated++
                        socket.terminate();
                    }
                });
            }
                
        }
        catch (e) {
        }
    }

    self.gc = function(){

        _gc(wss)
        _gc(ws)
        
    }

    

    self.closeall = function(){

        _closeall(wss)
        _closeall(ws)

    }

    self.destroy = function(){

        self.listening = false

        if (gcinfointerval){
            clearInterval(gcinfointerval)
            gcinfointerval = null
        }

        self.closeall()

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                try {

                    _terminate(wss)
                    _terminate(ws)


                    if (server)
                        server.close(function(){
                            if (httpserver)
                                httpserver.close(function(){
                                    resolve()
                                })

                            else{
                                resolve()
                            }

                        })

                    else{
                        resolve()
                    }
                }
                catch (e) {
                    resolve()
                }

                
    
            }, 3000);
        })
          
       
    }

    self.clbks = {
        firebase : {

            removeUser : function(p){


                if(!p.address || !p.device) return

                var id = 'fb_' + p.device

                var user = users[p.address];

                var clearUsers = []

                if (user){

                    delete user.devices.fb[id]

                    _.each(user.nodes, function(node, key){
                        delete node.ini[id]
                    })
                    
                    disconnectNode(user)

                    if (_.isEmpty(user.devices.ws) && _.isEmpty(user.devices.fb)){
                        clearUsers.push(user.address)
                    }

                }

                _.each(clearUsers, function(key){
                    delete users[key] 
                })

               
            },
            
            addUser : function(p){

                return

                if(!p.address || !p.device) return

                var id = 'fb_' + p.device

                if(!users[p.address]) users[p.address] = create.user(p.address)

                user = users[p.address]

                user.devices.fb[id] = p.device

                create.node(p.node).then(node => {

                    if(!user.nodes[node.key]){
                        user.nodes[node.key] = node
                    }
    
                    user.nodes[node.key].ini[id] = {
                        type : 'firebase',
                        device : p.device,
                        address : p.address
                    }
    
                    connectNode(user, node);
                    
                }).catch(e => {

                    console.error("ERROR", e)

                })


                
                

            },

           
        }
    }

    self.info = function(compact){

        var clients = 0
        var open = 0

        if(wss && wss.clients){

            wss.clients.forEach(socket => {
                clients++

                if ([socket.OPEN].includes(socket.readyState)) {
                    open++
                }
            })

        }

        if(ws && ws.clients){

            ws.clients.forEach(socket => {
                clients++

                if ([socket.OPEN].includes(socket.readyState)) {
                    open++
                }
            })

        }


        var data = {
            listening : self.listening,
            httplistening : self.httplistening,
            clients : clients,
            open : open,
            terminated,
            edisconnect,
            econnect
        }

        if(!compact) data.users = _.map(users, function(user){

            return {
                devices : {
                    ws :    _.toArray(user.devices.ws).length,
                    fb :    _.toArray(user.devices.fb).length,
                },
                address :   user.address,
                firebase :  _.toArray(user.firebase).length,
                clients :   _.toArray(user.clients).length,
                nodes :     _.toArray(user.nodes).length
                //ip : user.ip || ''
            }

        }) 

        else{
            data.users = _.toArray(users).length
        }

        return data
    }

    self.users = users;

    return self
}

module.exports = WSS;
