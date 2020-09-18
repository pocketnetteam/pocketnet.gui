var Bonus = require("./objects/bonus");
var Refbonus = require("./objects/refbonus");

var processes = function(p){

    var self = this;
    var app = p.app;

    self.inited = false;


    var processes = {
        reputationpay : {

            test : true,

            time : 30000,
            max : 30,
            key : '',
            id : 'reputationpay',
            action : function(){                

                var round = [];
                var index = 0;
                var max = this.max;

                var insesrtBonus = function(item, txid, clbk){

                    var bonus = new objects[item.object](item, p)

                    bonus.create(txid, function(err, data){

                        if(err){
                            console.log("INSERT FAIL", item.address, item.level)
                        }

                        delete processes.reputationpay.queue[item.address + "_" + item.level + "_" +item.object]
                        
                    })
                }

                _.each(this.queue, function(q){

                    if (q.adding) return

                    if (index > max) return

                        index++

                    round.push(q)
                })

                var objects = {
                    bonus : Bonus,
                    refbonus : Refbonus
                }

                if (round.length > 0){                    

                    lazyEach({
                        array : round,
                        synk : true,
                        action : function(_p){

                            _p.item.adding = true;

                            if (processes.reputationpay.test){

                                insesrtBonus(_p.item, 'test', function(){

                                    _p.item.adding = false;

                                    _p.success()

                                });

                                

                            }   
                            else{

                                app.platform.sdk.wallet.sendmanyoutputs(

                                    processes.reputationpay.key,
                                    _p.item.address,
                                    _p.item.amount,    
                                    1,
    
                                    function(err, d){
                                        
                                        if(!err){                                       
                                            
                                            insesrtBonus(_p.item, d, function(){
                                                _p.item.adding = false;    
                                                _p.success()
                                            })
                                        }
                                        else{
    
                                            _p.item.adding = false;
    
                                            console.log('err', err)
                                            _p.success()
                                        }
                                        
                                    },
    
                                    _p.item.message
    
                                )
                            }

                        }
                    })

                }

            },

            init : function(){

                var key = '';

                try{

                    if(pageYOffset.refkey){
                        key = p.refkey
                    }
                    else{	

                        if (p.kran)
                            key = fs.readFileSync(p.kran);
                    }

                    
                }

                catch(e){

                }
				if(!key){
				}
				else
				{	
					key = key.toString().split(" / ")

					if (key.length){
                        processes.reputationpay.key = key[1]

                        return true
                    }
                }

                return false

            },

            queue : {}
        },
        reputationfill : {
            levels : [
                {
                    reputation : 0,
                    bonus : 0,
                    level : 0
                },
                {
                    reputation : 20,
                    bonus : 5,
                    level : 1,

                    message : "Congratulations! You have reached reputation 20 on Pocketnet!"
                },
                {
                    reputation : 50,
                    bonus : 12.5,
                    level : 2,

                    message : "Congratulations! You have reached reputation 50 on Pocketnet!"
                },
                {
                    reputation : 100,
                    bonus : 25,
                    level : 3,

                    message : "Congratulations! You have reached reputation 100 on Pocketnet!"
                }
            ],

            getlevels : function(reputation){
                var levels = this.levels;

                return _.filter(levels, function(l, i){
                    if(reputation >= l.reputation) return true
                })  
            },

            getlevel : function(reputation){

                var levels = this.levels;

                return _.find(levels, function(l, i){
                    if(reputation >= l.reputation && (typeof levels[i + 1] == 'undefined' || levels[i + 1].reputation > reputation)) return true
                })  
            },

            time : 360000,
            id : 'reputationfill',
            action : function(){                

                app.ajax.rpc({
                    method : 'getreputations',
                    parameters : [],
                    success : function(d){

                        var bonus = new Bonus({}, p)

                        var r = _.filter(d || [], function(ar){
                            if(ar.reputation > 0) return true
                        })


                        bonus.best(function(err, payed){

                            if(err) return

                            var payedmap = {}

                            _.each(payed || [], function(p){

                                payedmap[p.address] = p

                            })

                            _.each(r, function(ar){

                                var payed = payedmap[ar.address];
                                var lvl = 0;

                                if (payed){
                                    lvl = payed.level
                                }


                                var levels = processes.reputationfill.getlevels(Number(ar.reputation))

                                _.each(levels, function(level){

                                    if (lvl < level.level && level.level){

                                        var ch = processes.reputationpay.queue[ar.address + "_" + level.level + "_bonus"]
    
                                        if (ch && ch.processing){
                                            return;
                                        }

                                        else{
                                            processes.reputationpay.queue[ar.address + "_" + level.level + "_bonus"] = {
                                                level : level.level,
                                                amount : level.bonus,
                                                address : ar.address,
                                                reputation : Number(Number(ar.reputation).toFixed(0)),
                                                message : level.message,
                                                object : 'bonus'
                                            }

                                            /*if(ar.referrer){
                                                var refbonus = new Refbonus({}, p)

                                                refbonus.check(ar.address, level.level, function(err, res){
                                                    if(!err && !res){

                                                        processes.reputationpay.queue[ar.address + "_" + level.level + "_refbonus"] = {
                                                            level : level.level,
                                                            amount : level.bonus,
                                                            address : ar.address,
                                                            referrer : ar.referrer,
                                                            reputation : Number(ar.reputation),
                                                            message : '',
                                                            object : 'refbonus'
                                                        }


                                                    }
                                                })
                                            }*/
                                            
                                        }

                                        
                                       
                                    }

                                })

                                
                            
                            })

                        })

                    },
                    fail : function(){

                       

                    }
                })

            }
        }
    };
    
    self.init = function(){

        if(p.db){

            _.each(processes, function(process){

                if(process.init && !process.init()) return

                process.action()

                process.interval = setInterval(function(){

                    process.action()

                }, process.time)

            })

            self.inited = true;

        }
        
    }

    self.check = function(){
        return processes.reputationpay.key && p.db && self.inited
    }

    self.destroy = function(){
        _.each(processes, function(process){

            if (process.interval){
                clearInterval(process.interval);

                delete process.interval;
            }

        })
    }

    self.info = function(){
        
        return {
            fill : processes.reputationfill.levels,
            inited : self.inited
        }

    }

    return self
}

module.exports = processes