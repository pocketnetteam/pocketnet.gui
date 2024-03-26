var f = require('./functions');
var Datastore = require('@seald-io/nedb');

////temporarily until a consensus algorithm appears

var ATransactions = function(p){
    var self = this
    var inited = false
    var db = new Datastore({
        filename: f.path(p.dbpath),
    });

    var txids = [];


    self.add = function(txid){

        return new Promise((resolve, reject) => {

            if (self.check(txid)){

                txids.push(txid)

                db.insert({
                    txid : txid
                }, function (err) {

                    if(err) {
                        return reject(err)
                    }

                    resolve()
                });
            }

            else{
                resolve()
            }
        })
    }

    self.remove = function(txid){

        return new Promise((resolve, reject) => {

            if(!self.check(txid)){
                
                txids = _.filter(txids, function(a){
                    return a != txid
                })

                db.remove({ txid }, {}, function (err) {

                    if(err){
                        return reject(err)
                    }

                    resolve()
                });

             
            }

            else{
                resolve()
            }
        })
    }

    self.init = function(){
        return new Promise((resolve, reject) => {

            db.loadDatabase(err => {
                db.find({}).exec(function (err, docs) {

                    txids = _.map(docs || [], function(obj){
                        return obj.txid
                    })

                    inited = true

                    resolve()

                })

                
            })

        })
    }

    self.destroy = function(){
        txids = []
        inited = false
    }

    self.check = function(txid){
        if(!_.find(txids, function(a){
            return a == txid
        })) return true
    }

    self.get = function(){
        return txids
    }

    return self
}

module.exports = ATransactions