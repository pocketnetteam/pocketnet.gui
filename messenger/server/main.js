// require

    //external
       
        var fs = require("fs");
        var https = require("https");
        var webSocket = require('ws');
        var url =       require("url");

         _ = require('underscore')

    // internal
        require('./functions.js')

        var Chat = require('./chat.js')
        var Address = require('./address.js')
        var User = require('./user.js')

        var route = require('./route.js')
        var handles = require('./handles.js')

// global

    var users = {};
    var devices = {};
    var usersList = [];
    var addresses = {};
    var chats = {};
    var relay = {};

    var rtc = {
        users : users,
        addresses : addresses,
        chats : chats,
        relay : relay,
        devices : devices
    }

// settings 
    
    var maxRelayCount = 3;
    var optionskey = 'options' 

    var options = function(key){

        var options = {};

        if (key == 'localoptions'){
            options = {
                key: fs.readFileSync('cert/key.pem'),
                cert: fs.readFileSync('cert/cert.pem'),
                passphrase: 'Vjoysq47'
            }
        }

        if (key == 'options'){
            options = {
                key: fs.readFileSync('C:/Utils/pocketnet.app/key.pem'),
                cert: fs.readFileSync('C:/Utils/pocketnet.app/cert.pem'),
                passphrase: 'dfktynby1'
            }
        }

        return options;

    }

    var settings = {
        headers : {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "application/json"
        },
        errors : {
            "400" : function(p){
                return "Broken Parameters"
            },      
            "401" : function(p){
                return "Incorrect login or password"
            },
            "402" : function(p){
                return "Incorrect payment details"
            },
            "403" : function(p){
                return "Unathorizated"
            },
            "404" : function(p){
                return "No request handler found for " + p.pathname
            },
            "500" : function(p){
                return "Internal Error"
            },
        }
    }
  
// wss part


    var server = new https.createServer(options(optionskey));

    var wss = new webSocket.Server({ server }); 

        server.listen(9090)

    wss.on('connection', function(connection) {

        connection.others = {};
      
        var user = null;
        
        //when server gets a message from a connected user
        connection.on('message', function(message) { 
        
            var data; 
          //accepting only JSON messages 
            try {
                data = JSON.parse(message); 
            }
            catch (e) { 
                console.log("Invalid JSON"); 
                data = {}; 
            } 
            
            //switching type of the user message 
            switch (data.type) { 
                
                case "login": 

                    if(!data.id || !data.address || users[data.id]) { 

                        //data.id = address * fingerprint

                        send.s({ 
                            type: "login", 
                            success: false,
                            error : 'User exist' 
                        }); 

                    } else { 
                        //save user connection on the server 
                        user = users[data.id] = new User({

                            connection : connection,
                            address :  data.address,
                            id : data.id,
                            device : data.device

                        })

                        devices[user.device] || (devices[user.device] = {})
                        devices[user.device][user.id] = user.id

                        user.usersListIndex = usersList.push(user.id) - 1

                        console.log('user.usersListIndex', user.usersListIndex, user.id)

                        addresses[data.address] || (addresses[data.address] = new Address({
                            address : data.address
                        }))
                        
                        addresses[data.address].devices.add(user)

                        connection.id = user.id; 
                            
                        send.s({ 
                            type: "login", 
                            success: true 
                        }); 
                    } 
                        
                    break; 

                case 'messages_readed': 

                    if(!data.chatid || !user || !chats[data.chatid]) {
                        send.to(connection, { 
                            type: "messages_readed", 
                            success: false,
                            error : "User or Chat doesn't exist" 
                        }); 
                    }

                    else
                    {
                        var c = chats[data.chatid]

                        c.messages.readAll(data.id)

                        var userid = [];

                        _.each(c.users, function(user, userid){
                            if(!connection.others[data.id]){
                                usersid.push(userid)
                            }
                        })

                        var _addresses = _.map(chat.get.allAddresses(), function(index, address){
                            return address;
                        })

                        var r = send.ex(_addresses, function(p){

                            var m = null;

                            if(!p.this){

                                if(p.self){
                                    m = { 
                                        type: "messages_readed_device",
                                        success: true,
                                        chatid : data.chatid
                                    }
                                }
                                else
                                {

                                    if(!p.direct){

                                    }

                                    m = { 
                                        type: "messages_readed",
                                        success: true,
                                        chatid : data.chatid,
                                        id : user.id
                                    }
                                }

                            }

                            return m;

                        })
                        
                    }

                    break;

                case 'message' : 

                    if(!data.chatid || !user || !chats[data.chatid]) {
                        send.s({ 
                            type: "message", 
                            success: false,
                            error : "User or Chat doesn't exist" 
                        }); 
                    }
                    else
                    {

                        var chat = chats[data.chatid]

                            chat.messages.count[user.address] || (chat.messages.count[user.address] = 0);  
                            chat.messages.count[user.address] ++;
                            //chat.messages.read(user.id)

                        var _addresses = _.map(chat.get.allAddresses(), function(index, address){
                            return address;
                        })

                        console.log("ADDRESSES", _addresses)

                        var r = send.ex(_addresses, function(p){

                            if(!p.this && !p.direct){

                                var m = { 

                                    type: "message",
                                    success: true,
                                    chatid : chat.id,
                                    address : user.address
                                }

                                if (addresses[p.user.address] && !addresses[p.user.address].chats.find(chat.id)){

                                    m.addresses = chat.allow
                                    m.type = "message_newchat"

                                    addresses[p.user.address].chats.add(chat)

                                }

                                return m;

                            }

                        }, {

                            ignore : {
                                self : true,
                                direct : true
                            },

                        })

                        if (r.offline.length){

                            var online = helpers.getRelayCandidates(user.id)


                            console.log('online candidates', online)

                            send.exu(online, function(p){

                                return {
                                    type: "relay", 
                                    success: true,
                                    
                                    offline : r.offline,
                                    id : user.id,
                                    device : user.device

                                }


                               
                            }) 

                            send.s({ 
                                type: "message_offline", 
                                success: true,
                                offline : r.offline,
                                online : online,
                                chatid : chat.id,
                                id : data.id
                            }); 

                        }

                        console.log(r);
                        
                    }

                    break;

                case 'exit' :  
                    /*
                    if(!data.chatid || !user || !chats[data.chatid]) { 

                        sendTo(connection, { 
                            type: "chat", 
                            success: false,
                            error : "User or Chat doesn't exist" 
                        }); 

                    }
                    else
                    {
                        var c = chats[data.chatid]

                        addresses[address].chats[c.addresses[user.address]] = null;

                        delete c.users[user.info.id]
                        delete c.addresses[user.address];


                        sendToAddress(user.address, { 

                            type: "exit", 
                            success: true,
                            chatid : data.chatid

                        })
                        
                    }*/

                    break;

                case "chat" : 

                    if(!user || !users[user.id] || !data.chatid) { 

                        send.s({ 
                            type: "chat", 
                            success: false,
                            error : "User doesn't exist" 
                        }); 

                    }

                    else
                    {

                        chats[data.chatid] || (chats[data.chatid] = new Chat({
                            addresses : data.addresses,
                            ini : user.address,
                            id : data.chatid
                        }))

                        var chat = chats[data.chatid];

                        if (chat.users.add(user))
                        {
                            console.log("ADD USER IN CHAT", user.address, user.id)

                            //forever
                            addresses[user.address].chats.add(chat)

                            //online
                            chat.addresses.add(user.address) 

                            send.ex(user.address, function(p){

                                if(p.this){
                                    return { 
                                        type: "chat", 
                                        success: true,
                                        chatid : data.chatid,
                                        addresses : chat.allow
                                    }
                                }
                                else
                                {
                                    return {

                                        type: "chat_newdevice", 
                                        success: true,
                                        chatid : chat.id,
                                        addresses : chat.allow

                                    }
                                }

                            })      

                            send.exu(chat.users.get, function(p){

                                if(!p.this && !p.direct){

                                    return {
                                        type: "chat_newuser", 
                                        success: true,
                                        id : user.id,
                                        chatid : data.chatid,
                                        address : user.address
                                    }

                                }
                                

                            })                 

                        }
                        else
                        {
                            send.s({ 
                                type: "chat", 
                                success: false,
                                error : "User can't be in this chat" 
                            });
                        }

                  
                    }

                    break;  
                        
                case "offer": 
                    //for ex. UserA wants to call UserB 
                    

                    var conn = deep(users, data.id + '.connection')

                    if(!conn/* || !helpers.commonChat(user.address, deep(users, data.id + '.address'))*/ ){
                        send.s({ 
                            type: "offer", 
                            success: false,
                            error : "Chat doesn't exist or users haven't common chats" 
                        }); 
                    }

                    else
                    {
                        //if UserB exists then send him offer details 
                            
                        if (conn != null) { 
                           //setting that UserA connected with UserB
                            
                            connection.others[data.id] = users[data.id]

                            var message = { 
                                success: true,
                                type: "offer", 
                                offer: data.offer, 
                                id: user.id,
                                address : user.address,
                                
                            }

                            if (data.chatid){
                                message.chatid = data.chatid
                            }

                            if (data.relay){
                                message.relay = data.relay                                
                            }

                            if (data.get){
                                message.get = data.get
                            }

                            send.to(conn, message); 
                        } 
                    }
                        
                    
                        
                    break;

                case "answer": 
                    
                    //for ex. UserB answers UserA 
                    var conn = deep(users, data.id + '.connection')

                    if(!conn/* || !helpers.commonChat(user.address, deep(users, data.id + '.address'))*/ ){
                        send.s({ 
                            type: "chat", 
                            success: false,
                            error : "Chat doesn't exist or users haven't common chats" 
                        }); 
                    }
                    else
                    {

                        console.log("Sending answer to: ", data.id); 

                        connection.others[data.id] = users[data.id]

                        send.to(conn, { 
                            success: true,
                            type: "answer", 
                            answer: data.answer,
                            id : user.id
                        }); 
                    }
                        
                    break;  
                        
                case "candidate": 
                    
                    var conn = deep(users, data.id + '.connection')
                        
                    if (conn != null) { 

                        console.log("Sending candidate to:", data.id); 

                        send.to(conn, { 
                            success: true,
                            type: "candidate", 
                            candidate: data.candidate,
                            id : user.id 
                        });
                    } 
                        
                    break;  
                        
                case "leave": 
                    console.log("LEAVE")
                    var conn = deep(users, data.id + '.connection')
                        
                    if (conn != null) { 

                        delete conn.others[user.id]; 
                        delete connection.others[data.id]; 

                        send.to(conn, { 
                            type: "leave",
                            id : user.id
                        }); 

                    }  
                        
                    break;  

                case "haveRelay": 

                    _.each(data.forUsers, function(u){

                        relay[u] || (relay[u] = {})

                        relay[u][data.from] || (relay[u][data.from] = {})
                        relay[u][data.from][data.chatid] || (relay[u][data.from][data.chatid] = {})
                        relay[u][data.from][data.chatid][user.device] || (relay[u][data.from][data.chatid][user.device] = 0)


                        relay[u][data.from][data.chatid][user.device]++;
                    })
                   

                    console.log("relay", relay)

                    break;  
              
                        
                default: 

                    send.s({ 
                       type: "error", 
                       message: "Command not found: " + data.type 
                    }); 
                        
                break; 
            }  
        });  
        
        //when user exits, for example closes a browser window 
        //this may help if we are still in "offer","answer" or "candidate" state 
        connection.on("close", function() { 
        
            if(connection.id) { 

                console.log('close', connection.id)

                var address = addresses[user.address]


                    //remove from online
                    address.devices.remove(connection.id)
                    

                console.log('usersList', usersList)

                usersList.splice(user.usersListIndex, 1) 

                delete users[connection.id];
                delete user;

                delete devices[user.device][user.id]

                if(_.isEmpty(devices[user.device])) delete devices[user.device]

                _.each(connection.others, function(i, id){

                    var conn = deep(users, connection.id + '.connection')

                    if (conn){
                        delete conn.others[connection.id]

                        send.to(conn, { 
                            type: "leave" 
                        });
                    }
                })
            } 
        });  

        var send = {

            s : function(message){
                send.to(connection, message)
            },

            to : function(connection, message){
                connection.send(JSON.stringify(message)); 
            },

            exu : function(_users, m, p){
                if(!p) p = {};

                p.ignore || (p.ignore = {})

                var userid = [];

                _.each(_users, function(_user){

                    if(p.ignore.self && _user.address == user.address) return

                    if(connection.others[_user.id] && p.ignore.direct) return
                  

                    var message = m;

                    if (typeof m == 'function'){

                        message = m({
                            self : _user.address == user.address,
                            direct : !!connection.others[_user.id],
                            this : _user.id == user.id,

                            user : _user
                        })
                    }

                    if (message){

                        send.to(users[_user.id].connection, message)

                        userid.push(_user.id)
                    }

                       

                })

                return {
                    users : userid,
                    offline : []
                }
            },

            ex : function(_addresses, m, p){

                if(!p) p = {};

                p.ignore || (p.ignore = {})

                var userid = [];
                var offline = [];

                if(!_.isArray(_addresses)) _addresses = [_addresses]

                _.each(_addresses, function(address){


                    if(p.ignore.self && address == user.address) return

                    if(!addresses[address] || _.isEmpty(addresses[address].devices.get)){

                        offline.push(address)

                    }

                    else
                    {
                        _.each(deep(addresses,  address + '.devices.get') || {}, function(_user){

                            if(connection.others[_user.id] && p.ignore.direct) return                        

                            var message = m;

                            if (typeof m == 'function'){

                                message = m({
                                    self : address == user.address,
                                    direct : !!connection.others[_user.id],
                                    this : _user.id == user.id,

                                    user : _user
                                })
                            }

                            if (message){

                                send.to(users[_user.id].connection, message)

                                userid.push(_user.id)
                            }

                         
                        })
                    }

                })

                return {
                    users : userid,
                    offline : offline
                }

            }
        }
        
    });  

    

// https part
    function onhttps(request, response) {

        var p = {};

        var u = url.parse(request.url);

        
        p.rtc = rtc;
        p.helpers = helpers;

        p.pathname = u.pathname.substr(1).replace(/\//g, ".");
        p.parameters = parameters(decodeURIComponent(u.search || ''), true);

        p.request = request;
        p.response = response;      
        p.handles = handles;
        p.settings = settings;

        p.data = "";
        p.request.setEncoding("utf8");

        p.request.addListener("data", function(data) {
            p.data += data;
        });

        p.request.addListener("end", function() {
            
            p.parameters = _.extend(p.parameters, parameters(decodeURIComponent(p.data) || ''));
            
            route(p);

        });

    } 

    var httpsserver = new https.createServer(options(optionskey), onhttps);
        httpsserver.listen(9091)


// helpers

    var helpers = {
        getLastDevice  : function(address){
            var max = null;

            _.each(addresses.devices, function(user){
                if(!max || user.activity > max.activity){
                    max = user
                }
            })

            return max
        },

        commonChat : function(address1, address2){

            if(!address1 || !address2) return null;

            var c2 = deep(addresses, address2 + '.chats') || {}

            return _.find(deep(addresses, address1 + '.chats') || {}, function(c,i){
                return c2[i]
            })
        },

        getRelayCandidates : function(id){

            var candidates = [];
            var added = {}
            var ul = usersList.length

            console.log('usersList getRelayCandidates', usersList)

            for(var i = 0; i < maxRelayCount; i++){
                var index = rand(0, ul - 1)

                var candidate = usersList[index]

                if (candidate != id && users[candidate] && !added[candidate]){

                    added[candidate] = true

                    candidates.push({
                        id : candidate,
                        device : users[candidate].device,
                        address : users[candidate].address,
                    })
                }
                
            }

            return candidates;
        }
    }

     
//