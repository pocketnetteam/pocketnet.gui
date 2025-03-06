
var f = require('../functions');
const WebSocket   = require('ws');

var Wss = function(node, service){

    var self = this
    
    var attempt = 0;
    var ws = null

    self.closed = false;
    

    var authorize = function(user){

        var msg = {}

        if(!user && service){

            msg = _.clone(service)
        }
        else{
            msg = {
                addr: user.address
            };
        }

        msg.nonce = '0'
        msg.signature = '0'
        msg.pubkey = '0'

        return sendMessage(msg)
    }

    var sendMessage = function(message){
        return new Promise((resolve, reject) => {

            ws.send(JSON.stringify(message), (err) => {
           
                if (err){
                    reject(err)
                }
                else{
                    resolve()
                }
            });

        })
       
    }

    var emitting = {}

    var emit = function(action, data){
        _.each(emitting[action] || [], function(action){
            action(data)
        })
    }

    self.emit = emit

    self.send = function(message){

        if(!ws) return Promise.reject('disconnected')

        return sendMessage(message)

    }

    self.disconnect = function(){

        self.closed = true

        if (ws){
            ws.onerror = () => {};
            ws.onclose = () => {};
            ws.close();
        }

        emitting = {}

        ws = null
    }

    self.connect = function(user){
        let wsprotocol = 'ws';
        let wsport = node.ws;

        if (global.USE_TLS_NODES_ONLY && !node.portPrivate) {
            wsprotocol = 'wss';
            wsport = node.sws;
        }

        var path = `${wsprotocol}://${node.host}:${wsport}/ws`;

        if(!ws){
            /*if(user)
                console.log('new ws', path, user.address, f.rand(0, 100))
            else{
                console.log('new ws', path, 'noaddress', f.rand(0, 100))
            }*/
            ws = new WebSocket(path);        

            attempt++

            ws.onopen = (e) => {

                attempt = 0

                authorize(user)

                emit('open')
                
            };

            ws.onclose = (e) => {

                ws = null

                if (self.closed) return

                emit('close')

                if (attempt > 2){

                    emit('disconnected')
                }
                else{
                  
                    self.connect(user)
                }
            };

            ws.onmessage = (e) => {


                var data = {};

                try{ data = JSON.parse(e.data) } catch(e){}

                if(_.isEmpty(data)){
                    return
                }

                if (data.msg == 'new block' && service){
                
                    emit('block', data)

                    node.addblock(data)

                    node.notification(data)

                }

                emit('message', data)

            };

            ws.onerror = (e, msg) => {
                emit('error', e)
            };
        }

        

        return self

    }

    self.on = function(emitted, action){
        if(!emitted) return

        if(!emitting[emitted]) emitting[emitted] = []

        emitting[emitted].push(action)
    }

    self.off = function(emitted){
        delete emitting[emitted]
    }

    return self

}


module.exports = Wss