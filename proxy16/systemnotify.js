
//const TelegramBot = require('node-telegram-bot-api');
var _ = require('underscore')
var f = require('./functions');


////settings

var SystemNotify = function(){
    var self = this
    var bot = null

    var chat = null;

    var sent = {}

    var parameters = {
        test : {
            notify : true
        },
        default : {
            notmoreoften : 21600,
            notify : true
        }
    }

    self.setparameters = function(p){
        parameters = _.extend(parameters, p || {}) 

    }   

    self.init = function({
        chatid,
        token
    }){

        if(!chatid || !token) return Promise.reject('chatId, token')

        bot = new TelegramBot(token, { polling: false });
        chat = chatid
    }

    var send = function(message){
        return bot.sendMessage(chat, message);
    }
  
    self.send = function(message, type){

        if(!type) type = 'default'

        var typeparameters = f.deep(parameters, type) || {}

        if(!typeparameters.notify) return Promise.reject('notnotify')

        var hash = f.hash(message)
        var now = f.now()

        if(!sent[type]) sent[type] = {}

        if (typeparameters.notmoreoften){

            if (sent[type][hash] && sent[type][hash].date){

                var s = f.date.addseconds(f.now(), - typeparameters.notmoreoften)

                if (s < sent[type][hash].date) return Promise.reject('time')
                
            }
        }

        return send(message).then(r => {
            sent[type][hash] = {
                date : now
            }

            return Promise.resolve()
        })
    }

    return self
}


module.exports = SystemNotify