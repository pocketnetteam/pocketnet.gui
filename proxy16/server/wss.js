const https       = require('https');
const WebSocket   = require('ws');
var f = require('../functions');

var WSS = function(){
    var self = this;

        self.listening = false;

    var wss = null, server = null;

    var users = {}

    var create = {
        user : function(address){
            var user = {
    
                devices : {
                    ws : {},
                    fb : {}
                },
    
                address: address,
                firebase : {},
    
                clients: {},
                nodes : {}
            }
    
            return user
        },

        node : function(p){

            var node = null
            var auto = true

            if (p){
                node = self.nodeManager.temp(p)
                auto = false
            }
            else{
                node = self.nodeManager.selectbest()
            }


            if(!node) return null

            return {
                instance : node,
                ini : {},
                auto : auto,
                key : node.wskey
            }

        }
    }

    var connectNode = function(user, node) {

        var ws = node.instance.wss.add(user)

        ws.on('open', () => {})
        ws.on('disconnected', () => {

            if (node.auto) {
                disconnectNode(user)
                node = create.node()
            }

            connectNode(user, node)
        })

        ws.on('block') = (data) => {
            if (self.server.cache){
                self.server.cache.block(data)    
            }
        }

        ws.on('message') = (data) => {
           
            var fbdata = {}; 

            _.each(data, (d, k) => { fbdata[k] = d.toString() })
                      
            _.each(node.ini, function(client){

                if (client.type == 'firebase'){

                    if(data.msg == 'new block') return     

                    if (self.firebase){
                        self.firebase.send(fbdata, client.device, user.address) 
                    }

                }
                else{

                    sendMessage(data, client.ws)
                }

            })
            
        };

        ws.on('error') = (e) => {
            console.log(e)
        }

    }

    var disconnectNode = function(user){
        var clearNodes = []

        _.each(user.nodes, function(node, key){

            if (_.isEmpty(node.ini)){

                node.instance.ws.disconnect(user)
                clearNodes.push(key)

            }
        })

        _.each(clearNodes, function(key){
            delete user.nodes[key] 
        })
    }

    var disconnectClient = function(ws) {

        var wsusers = _.filter(users, function(user){
            return user.clients[ws.id]
        })
        
        
        var clearUsers = []

        _.each(wsusers, function(user){
            delete user.clients[ws.id]
            delete user.devices.ws[ws.id]

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

    }

    var sendMessage = function(message, ws){

        return new Promise((resolve, reject) => {

            ws.send(JSON.stringify(message), (err) => {
                if (err) reject(err)
                else resolve()
            });

        })
       
    }

    var messages = {
        registration : function(message, ws){
            
            var address = message.addr;
            var signature = message.sgn;
            var device = message.id;

            if(!address || !device) return

            var user = null

      
            var authorized = self.pocketnet.kit.authorization.signature(signature, address)

            if(!authorized) {
                return false
            }


            if(!users[address]) users[address] = create.user(address)

            user = users[address]

            user.clients[ws.id] = ws
            user.devices.ws[ws.id] = device

            var node = create.node(message.node)

            sendMessage({
                msg : node ? "registered" : 'registererror',
                addr : user.addr,
                node : node.instance.export()
            }, ws)

            if(!node) return

            user.nodes[node.key].ini[ws.id] = {
                type : 'ws',
                ws : ws,
                ip : ws.ip
            }

            //if(!user.nodes[node.key].ws){
                connectNode(user, node);
            //}
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
        }
    }

    

    self.init = function(settings){
        
        
        return new Promise((resolve, reject) => {

            try{
            
                server = new https.createServer(settings.ssl);

                wss = new WebSocket.Server({
                    server: server
                });

                wss.on('connection', (ws, req) => {

                    ws.id = f.makeid();
                    ws.ip = req.connection.remoteAddress

                    ws.on('message', (msg) => {
                        handleMessage(msg, ws)
                    })

                    ws.on('close', (code, reason) => {
                        disconnectClient(ws)
                    });
            
                    ws.on('error', (err) => {
                        disconnectClient(ws)
                    });
                })

                wss.on('listening',function(){

                    self.listening = true

                    resolve()
                });

                wss.on('error',function(e){
                    reject(e) 
                });

                server.listen(settings.port || 8088);

            }

            catch(e) {
                reject(e)
            }

        })
    }

    self.destroy = function(){
        wss.clients.forEach((socket) => {
            socket.close();
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                wss.clients.forEach((socket) => {
                    if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
                        socket.terminate();
                    }
                });

                server.close(function(){
                    resolve()
                })
    
               
    
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

                if(!p.address || !p.device) return

                var id = 'fb_' + p.device

                if(!users[p.address]) users[p.address] = create.user(p.address)

                user = users[address]

                user.devices.fb[id] = p.device

                var node = create.node(p.node)

                if(!node) return

                if(!user.node[node.key]){
                    user.node[node.key] = node
                }

                user.nodes[node.key].ini[id] = {
                    type : 'firebase',
                    device : p.device
                }

                //if(!user.nodes[node.key].ws){
                    connectNode(user, node);
                //}
                

            },

           
        }
    }

    self.info = function(){
        return {

            listening : self.listening,
            users : _.map(users, function(user){

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
        } 
    }

    self.users = users;

    return self
}

module.exports = WSS;
