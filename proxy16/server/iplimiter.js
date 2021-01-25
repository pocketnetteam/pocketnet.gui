var f = require('../functions');

var Iplimiter = function(p){
    if(!p) p = {};

    if(!p.interval) p.interval = 30000
    
    var limiter = require('lambda-rate-limiter')({
        interval: p.interval,
        uniqueTokenPerInterval: 500 
    });

    var self = this;

    var count = p.count || 500;
    var blacklistcount = p.blacklistcount || 3;

    var temp = {
        black : {}
    }

    var lists = {
        black : {},
        white : {
            '::ffff:127.0.0.1' : true,
        }
    }

    self.check = function(ip){

        if(!ip){
            return Promise.reject()
        }

        if (lists.white[ip]){
          
            return Promise.resolve()
        }

        if (lists.black[ip]){

            if (lists.black[ip].until > new Date()){
                return Promise.reject()
            }
            else{
                delete lists.black[ip]
            }

        }

        return limiter.check(count, ip).catch(() => {

            temp.black[ip] || (temp.black[ip] = {
                c : 1,
                until : f.addSeconds(new Date(), p.interval / 1000)
            });

            if (temp.black[ip].until < new Date()){
                temp.black[ip].c++
                temp.black[ip].until = f.addSeconds(new Date(), p.interval / 1000)
            }            

            if (temp.black[ip].c >= blacklistcount){
                lists.black[ip] = {
                    until : f.addSeconds(new Date(), 7 * 24 * 60 * 60)
                }

                delete temp.black[ip]
            }

            return Promise.reject()
        })
        .then(() => {
            return Promise.resolve()
        });
    
    }

    self.info = function(){
        return {
            black : _.toArray(lists.black).length,
            tblack : _.toArray(temp.black).length,
        }
    }
    
    self.init = function(){

        return self
    }

    /*self.info = function(){
        return lists.black
    }*/

		
    return self.init();
}

module.exports = Iplimiter