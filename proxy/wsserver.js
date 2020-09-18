const https       = require('https');
const WebSocket   = require('ws');

var WSN = function(_p){

    if(!_p) _p = {}

    var self = this;

    var firebase = _p.firebase || null;

    var devices = {};
    var users = {};
    var server;
    var wss;

    var nodes = _p.nodeManager;
   
    //--------------------------------------------
    var connectNode = function(user, key) {

        console.log('connectNode', key)

        var ws_node = user.ws_nodes[key]

        if(!ws_node.ws_node_host && !ws_node.locally){

            _.each(ws_node.ini, function(client){
                
                client.ws.send(JSON.stringify({

                    msg : "connectionfailed",
                    reason : 'ws_node_host'
                
                }), err => {                    
                });
            })

            return;
        }

        var ws_nodepath = nodes.path(ws_node)


        if(!ws_nodepath){
            _.each(ws_node.ini, function(client){
                client.ws.send(JSON.stringify({

                    msg : "connectionfailed",
                    addr : ws_node.ws_node_host || ws_node.locally.host,
                    reason : 'ws_nodepath'
                
                }), err => {                    
                });
            })

            return;
        }

        console.log('ws_nodepath', ws_nodepath)
        
        // Try connect to node
        ws_node.ws_node_attempt += 1;
        ws_node.ws_node = new WebSocket(ws_nodepath);        

        
        ws_node.ws_node.onopen = (e) => {
            let msg = JSON.stringify({
                addr: user.addr,

                nonce: '0',
                signature: '0',
                pubkey: '0',   
                /*
                nonce: user.options.nonce,
                signature: user.options.signature,
                pubkey: user.options.pubkey,*/
            });
            
            ws_node.ws_node.send(msg, err => {
            });
        };

        ws_node.ws_node.onclose = (e) => {

            if (ws_node.close) return

            if (ws_node.ws_node_auto) 
                ws_node.ws_node_host = nodes.select();
                
            connectNode(user, key);
        };

        // Relay new message from node to client
        ws_node.ws_node.onmessage = (e) => {

            var data = null;

            try{
                data = JSON.parse(e.data)

               
            }

            catch(e){

            }

            if(data.msg == 'new block'){

                if (self.cache){
                    self.cache.block()    
                }

            }
            
            if(!ws_node.ini || _.isEmpty(ws_node.ini)){

                console.log("EMPTY")

            }
                      
            _.each(ws_node.ini, function(client, ininkey){

                if(client.type == 'firebase'){

                    /* var connectedws = _.find(user.devices.ws, function(device){
                        return client.device == device
                    })*/

                    //if(!connectedws){                        

                        if(data){

                            
                

                            if(data.msg == 'new block') return     
                            
                            var fbdata = _.clone(data);

                            _.each(fbdata, function(d, k){

                                fbdata[k] = d.toString()
                
                            })

                            firebase.send({
                                data : fbdata,
                                device : client.device,
                                address : user.addr
                            })
                        }                        

                    //}

                }
                else{
                    client.ws.send(e.data, err => {
                    
                    });
                }

                

            })
        

            
        };

        ws_node.ws_node.onerror = (err, msg) => {
           console.log(err, msg)
        };
    }


  

    var checkToken = function(userid, nonce, signature, pubkey) {
        return true;
    }

    var createWsNodeLocally = function(nodelocally){
        return {
            ws_node: null,
            ws_node_attempt: 0,
            key : nodelocally.host + ':' +  nodelocally.ws,
            ini : {},
            locally : nodelocally
        }
    }

    var createWsNode = function(nodehost){

        var auto = false;
        var key = nodehost


        if(!nodehost || nodehost == 'auto') {
            auto = true;
            key = 'auto';
            nodehost = nodes.select()
        }

        return {
            ws_node_auto: auto,
            ws_node_host: nodehost,
            ws_node: null,
            ws_node_attempt: 0,
            key : key,
            ini : {}

        }

    }
 
    var createUser = function(p){
        var user = {

            devices : {
                ws : {},
                fb : {}
            },
            addr: p.userid,

            firebase : {},

            ws_clients: {},

            ws_nodes : {}

           /*,*/

        }

        return user
    }

    //--------------------------------------------

    self.start = function(){
    
        // Configure HTTPS & WS Servers
        server = new https.createServer(_p.https_options);
        wss = new WebSocket.Server({
            server: server
        });
        //--------------------------------------------
        wss.on('connection', (ws, req) => {
            //ws.id = req.headers['sec-websocket-key'];

            var connectionid = makeid();
            var user = null;
            
            ws.on('open', () => {
    
                //console.log('users.length', _.toArray(users).length)
    
            });
    
            ws.on('message', (msg) => {

                var data = JSON.parse(msg);    

                var userid = data.addr;
                var nonce = data.nonce;
                var signature = data.sgn;
                var pubkey = data.pub;
                var device = data.id;

                if(!userid || !nonce) return;
                
                if(!checkToken(userid, nonce, signature, pubkey)) return

                user = users[userid]

                if(!user) user = createUser({
                    userid : userid,
                    
                    /*nonce : nonce,
                    signature : signature,
                    pubkey : pubkey,
                    device : device*/
                });

                if (user.ws_clients[connectionid]) return;
                
                user.ws_clients[connectionid] = ws

                user.devices.ws[connectionid] = device

                users[userid] = user;

                devices[device] || (devices[device] = {})
                devices[device][userid] = user


                user.ip = req.connection.remoteAddress;

                var wsnode = null;
                
                if (data.node)
                    wsnode = createWsNode(data.node)

                if (data.nodelocally){

                    try{
                        data.nodelocally = JSON.parse(data.nodelocally)
                        wsnode = createWsNodeLocally(data.nodelocally)
                    }
                    catch(e){

                    }
                    
                }

                if(!data.node && !data.nodelocally){
                    wsnode = createWsNode('auto')    
                }


                var message = {
                    msg : "registered",
                    addr : user.addr
                }

                if(!wsnode){
                    message.msg = 'registererror'
                }

                ws.send(JSON.stringify(message), (err) => {
                        
                });


                if(!wsnode) return
                

                if(!user.ws_nodes[wsnode.key]){
                    user.ws_nodes[wsnode.key] = wsnode
                }

                user.ws_nodes[wsnode.key].ini[connectionid] = {
                    type : 'ws',
                    ws : ws
                }

                if(!user.ws_nodes[wsnode.key].ws_node){
                    connectNode(user, wsnode.key);
                }
            
            });
    
            function disconnect(user) {

                try{
                    delete user.ws_clients[connectionid]
                    delete devices[user.devices.ws[connectionid]][user.addr]

                    if(_.isEmpty(devices[user.devices.ws[connectionid]])) 
                        delete devices[user.devices.ws[connectionid]]


                    delete user.devices.ws[connectionid]
                    

                    _.each(user.ws_nodes, function(ws_node, key){
                        delete ws_node.ini[connectionid]

                        if (_.isEmpty(ws_node.ini)){


                            if (ws_node.ws_node){
                                ws_node.ws_node.onerror = () => {};
                                ws_node.ws_node.onclose = () => {};
                                ws_node.close = true
                                ws_node.ws_node.close();
                            }

                            delete user.ws_nodes[key]

                        }
                    })
                    
                    if (_.isEmpty(user.devices.ws) && _.isEmpty(user.devices.fb)){
                        delete users[user.addr]
                    }
                }

                catch(e){
                   
                }

                

            }
    
            ws.on('close', (code, reason) => {

                if (user)
                    disconnect(user);
                    
            });
    
            ws.on('error', (err) => {

                if (user)
                    disconnect(user);

            });
        });

        //commonUsers()

        //--------------------------------------------
        // Start listening
        server.listen(_p.port || 8088);
    }

    self.destroy = function(clbk){
        wss.clients.forEach((socket) => {
            socket.close();
        });
          
        setTimeout(() => {

            wss.clients.forEach((socket) => {
                if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
                    socket.terminate();
                }
            });

            if(clbk) clbk()

        }, 10000);
    }
    
    self.users = users;

    self.clbks = {
        firebase : {

            removeUser : function(p){

                var connectionid = 'fb_' + p.device

                var user = users[p.address];

                if (devices[p.device] && devices[p.device][p.address]){
                    delete devices[p.device][p.address]
                }

                if(_.isEmpty(devices[p.device])) delete devices[p.device]


                if (user){

                    delete user.devices.fb[connectionid]

                    _.each(user.ws_nodes, function(ws_node, key){
                        delete ws_node.ini[connectionid]
    
                        if (_.isEmpty(ws_node.ini)){
                            
                            if (ws_node.ws_node){
                                ws_node.ws_node.onerror = () => {};
                                ws_node.ws_node.onclose = () => {};
                                ws_node.ws_node.close();
                            }
    
                            delete user.ws_nodes[key]    
                        }
                    })

                    if (_.isEmpty(user.devices.ws) && _.isEmpty(user.devices.fb)){
                        delete users[user.addr]
                    }
                }
            },
            
            addUser : function(p){

                var connectionid = 'fb_' + p.device

                var user = users[p.address]

                if(!user) user = createUser({
                    userid : p.address
                });

                users[p.address] = user;

                devices[p.device] = user

                devices[p.device] || (devices[p.device] = {})
                devices[p.device][p.address] = user

                user.devices.fb[connectionid] = p.device

                var wsnode = createWsNode('auto')

                if(!user.ws_nodes[wsnode.key]){
                    user.ws_nodes[wsnode.key] = wsnode
                }

                user.ws_nodes[wsnode.key].ini[connectionid] = {
                    type : 'firebase',
                    device : p.device
                }

                if(!user.ws_nodes[wsnode.key].ws_node){
                    connectNode(user, wsnode.key);
                }
                

            },

            addUsers : function(ps){

                _.each(ps, self.clbks.firebase.addUser)
            }
        }
    }

    self.info = function(){
        return _.map(users, function(user){

            return {
                devices : {
                    ws : _.toArray(user.devices.ws).length,
                    fb : _.toArray(user.devices.fb).length,
                },

                address : user.addr,
                
                firebase : _.toArray(user.firebase).length,
                ws_clients : _.toArray(user.ws_clients).length,
                ws_nodes : _.toArray(user.ws_nodes).length,

                ip : user.ip || ''
            }

        }) 
    }

    self.stat = function(){
        return _.toArray(users).length
    }

    return self;

}


module.exports = WSN;