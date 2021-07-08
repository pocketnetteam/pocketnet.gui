var f = require('./functions');
var Datastore = require('nedb');

////temporarily until a consensus algorithm appears

var Bots = function(p){
    var self = this
    var inited = false
    var db = new Datastore(f.path(p.dbpath));

    var addresses = [];


    self.add = function(address){

        return new Promise((resolve, reject) => {

            if (self.check(address)){

                addresses.push(address)

                db.insert({
                    address : address
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

    self.remove = function(address){

        return new Promise((resolve, reject) => {

            if(!self.check(address)){
                
                addresses = _.filter(addresses, function(a){
                    return a != address
                })

                db.remove({ address }, {}, function (err) {

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

                    addresses = _.map(docs || [], function(obj){
                        return obj.address
                    })

                    inited = true

                    resolve()

                })

                
            })

        })
    }

    self.destroy = function(){
        addresses = []
        inited = false
    }

    self.check = function(address){
        if(!_.find(addresses, function(a){
            return a == address
        })) return true
    }

    self.get = function(){
        return addresses
    }

    return self
}

module.exports = Bots