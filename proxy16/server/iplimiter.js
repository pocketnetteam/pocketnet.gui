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
            '::ffff:178.217.159.224' : true,
            '::ffff:178.217.155.170' : true,
            '::ffff:46.175.123.16' : true,
            '::ffff:95.216.212.153' : true,
            '::ffff:192.236.199.174' : true,
            '::ffff:178.154.251.235' : true,
            '::ffff:88.99.34.74' : true,
            '::ffff:49.12.231.72' : true,
            '::ffff:62.84.115.93' : true,
            '::ffff:104.168.248.113' : true,
            '::ffff:84.252.138.108' : true,
            '::ffff:23.254.226.253' : true,
            '::ffff:178.154.200.50' : true,
            '::ffff:192.236.161.131' : true,
            '::ffff:188.187.45.218' : true,
            '::ffff:159.69.127.9' : true,
            '::ffff:135.181.108.193' : true,
            '::ffff:65.108.83.132' : true,
            '::ffff:94.73.223.24' : true,
            '::ffff:188.0.15.28' : true
        }
    }

    self.check = function(ip){

        
        if(!ip){
            return Promise.reject()
        }

        if (lists.white[ip]){
          
            return Promise.resolve()
        }

        var date = new Date()

        if (lists.black[ip]){

            if (lists.black[ip].until > date){
                return Promise.reject()
            }
            else{
                delete lists.black[ip]
            }

        }

        return limiter.check(count, ip).catch(() => {

            temp.black[ip] || (temp.black[ip] = {
                c : 1,
                until : f.addSeconds(date, p.interval / 1000)
            });

            if (temp.black[ip].until < date){
                temp.black[ip].c++
                temp.black[ip].until = f.addSeconds(date, p.interval / 1000)
            }            

            if (temp.black[ip].c >= blacklistcount){
                lists.black[ip] = {
                    until : f.addSeconds(date, 7 * 24 * 60 * 60)
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