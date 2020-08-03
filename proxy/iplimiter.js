

var Iplimiter = function(p){
    if(!p) p = {};


    var limiter = require('lambda-rate-limiter')({
        interval: p.interval || 30000,
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

    var date = new Date();

    

    self.check = function(ip, clbk){

        var er = false

        if (lists.white[ip]){
            if (clbk) 
                clbk(er)

            return
        }

        if (lists.black[ip]){

            if(lists.black[ip].until > date){
                er = true

                if (clbk) 
                    clbk(er)

                return
            }
            else{
                delete lists.black[ip]
            }

        }


        limiter.check(count, ip) 

        .catch(() => {
            

            temp.black[ip] || (temp.black[ip] = {
                c : 1,
                until : (new Date()).addSeconds(p.interval / 1000)
            });

            if (temp.black[ip].until < date){

                temp.black[ip].c++
                temp.black[ip].until = (new Date()).addSeconds(p.interval / 1000)

            }            

            if (temp.black[ip].c >= blacklistcount){


                lists.black[ip] = {
                    until : (new Date()).addDays(7)
                }

                delete temp.black[ip]
            }

            er = true
        })
        .then(() => {

            if (clbk) 
                clbk(er)
        });
        
    
    }

    self.stat = function(){
        return {
            black : _.toArray(lists.black).length,
            tblack : _.toArray(temp.black).length,
        }
    }
    
    self.init = function(){

        setInterval(function(){
            date = new Date();
        }, 1000)


        return self
    }

    self.info = function(){
        return lists.black
    }

		
    return self.init();
}

module.exports = Iplimiter