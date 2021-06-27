
var Datastore = require('nedb');
var f = require('../functions');

var compensation = [

]

var Wallet = function(p){

    var self = this

    var addresses = {}

    var processInterval = null,
        unspentsInterval = null

    var inited = false

    self.kit = {
        
    }

    self.patterns = {
        ip : function(queueobj, all){
            if(!queueobj.ip) return Promise.reject('ip')

            var allips = _.filter(all, function(obj){
                return obj.ip == queueobj.ip
            })

            if (allips.length > 5 && f.now(allips[allips.length - 1].date) > f.date.addseconds(f.now(), -10 * 24 * 60 * 60)){
                return Promise.reject('iplimit')
            }

            return Promise.resolve()

        },

        uniqAddress : function(queueobj, all){

            conosle.log('uniqaddress!!!', queueobj, all)
            if(!queueobj.address) return Promise.reject('address')

            var f = _.find(all, function(obj){
                return obj.address == queueobj.address
            })

            if (f) return Promise.reject('uniq')
            
            
            return Promise.resolve()
        },

        ipAndUniqAddress : function(queueobj, all){
            return self.patterns.ip(queueobj, all).then(r => {
                return self.patterns.uniqAddress(queueobj, all)
            })
        }
    }

    self.checking = function(queueobj){

        var addressobj = addresses[queueobj.key]

        if(!addressobj) return Promise.resolve()

        var all = addressobj.all || []


        if (addressobj.check && self.patterns[addressobj.check]){
            return self.patterns[addressobj.check](queueobj, all)
        }

        return Promise.resolve()
    }

    var db = new Datastore(f.path(p.dbpath));

    var initProcess = function(){

        var mk = function(){
            _.each(addresses, function(a, k){
                self.kit.makequeueE(k).catch(e => {})
            })
        }

        var us = function(){
            _.each(addresses, function(a, k){
                self.unspents.getc(a, true).catch(e => {})
            })
        }

        if(!processInterval)
            processInterval = setInterval(function(){

                mk();

            }, 10000)

        if(!unspentsInterval)
            unspentsInterval = setInterval(function(){

                us();

            }, 100000)
            
    }

    self.destroy = function(){
        addresses = {}

        if (unspentsInterval){
            clearInterval(unspentsInterval)
            unspentsInterval = null
        }

        if (processInterval){
            clearInterval(processInterval)
            processInterval = null
        }

        return Promise.resolve()
    }

    self.init = function(){
        _.each(p.addresses, function(options, key){

            var kp = null
            
            try{
                kp = self.pocketnet.kit.keyPair(options.privatekey)
            }
            catch(e){
                
            }
          
            addresses[key] = {
                amount : options.amount,
                outs : options.outs || 1,
                keys : kp,
                address : kp ? self.pocketnet.kit.addressByPublicKey(kp.publicKey) : null,
                unspents : null,
                queue : [],
                all : [],
                key : key,
                check : options.check
            }

            if(!kp){
                _.each(self.clbks.error.ini, function(c){
                    c('privatekey', {
                        key : key
                    })
                })
            }
            else{


               

                self.unspents.getc(addresses[key]).catch(e => {
                })
            }

                
                

        })

        initProcess()
        inited = true

        return new Promise((resolve, reject) => {

            db.loadDatabase(err => {


                db.find({}).exec(function (err, docs) {
                    _.each(docs || [], function(obj){

                        if (obj.key && addresses[obj.key]){
                            addresses[obj.key].all.push(obj)
                        }

                    })

                   /* _.each(p.addresses, function(options, key){

                        

                        if(options.source == 'compensation'){

                            _.each(compensation, function(tobj){
                                self.kit.addqueue('compensation', tobj[0], "::1", tobj[2] / 100000000).catch(e => {
                                })
                            })
                        }

                    })*/
                })

                db.find({executed : '-'}).exec(function (err, docs) {
                    _.each(docs || [], function(obj){
                        if (obj.key && addresses[obj.key]){
                            addresses[obj.key].queue.push(obj)
                        }

                        else{
                            _.each(self.clbks.error.queue, function(c){
                                c('key', obj)
                            })
                        }
                    })

                    resolve()

                })

            })

        })

    }

    self.unspents = {
        waitSpend: function (unspent) {
            if (unspent.confirmations <= 11 && unspent.pockettx) {
                return 11 - unspent.confirmations
            }

            if (unspent.confirmations == 0 && !unspent.coinbase && !unspent.coinstake) {
                return 1
            }

            if (unspent.confirmations < 100 && (unspent.coinbase || unspent.coinstake)) {
                return 100 - unspent.confirmations
            }

            return 0
        },

        release : function (unspents) {
            _.each(unspents, function (unspent) {
                delete unspent.cantspend
            })
        },

        canSpend: function (unspent) {
            return !unspent.cantspend && !self.unspents.waitSpend(unspent) && unspent.amount
        },

        total : function(unspents){
            return Number(_.reduce(unspents || [], (m, u) => {
                return m + Number(u.amount)
            }, 0).toFixed(9))
        },

        available: function(unspents){
            return _.filter(unspents, function(unspent){
                return self.unspents.canSpend(unspent)
            })
        },

        get : function(address){
            return self.nodeManager.request('txunspent', [[address], 1, 9999999])
        },

        getc : function(addressobj, upd){

            if(!addressobj.address) return Promise.resolve([])

            if(!addressobj.unspents || upd){
    
                return self.unspents.get(addressobj.address).then(r => {
                
                    addressobj.unspents = r

                    return Promise.resolve(addressobj.unspents)
                })
            }

            return Promise.resolve(addressobj.unspents)
        }
    }

    self.helpers = {
        outputs : {
            tos : function(key, to){
                if(!_.isArray(to)) to = [to]

                var outputs = []

                _.each(to, function(tobj){
                    outputs = outputs.concat(self.helpers.outputs.to(key, tobj))
                })

                return outputs
            },
            to : function(key, tobj){
                var a = addresses[key]     
                var outs = []

                if(!a) return outs;

                for(var i = 0; i < a.outs; i++){
                    outs.push({
                        amount : ((a.amount || tobj.amount) / (a.outs || 1)),
                        address : tobj.address
                    })
                }

                return outs
            }
        },

       
    }

    self.kit = {
        sendwithprivatekey : function(address, amount, key){

            if(!address) return Promise.reject('address')
            if(!amount) return Promise.reject('amount')
            if(!key) return Promise.reject('key')

            if(amount > 100000) return Promise.reject('100000 Maximum Value')

            var kp = null
            
            try{
                kp = self.pocketnet.kit.keyPair(key)
            }
            catch(e){
                return Promise.reject('keyPair')
            }

            var temp = {
                keys : kp,
                address : kp ? self.pocketnet.kit.addressByPublicKey(kp.publicKey) : null,
                unspents : null,
                key : key
            }

            var outputs = [{
                amount : amount,
                address : address
            }]

            var meta = null

            return self.unspents.getc(temp).then(unspents => {
                return self.transactions.txfees(unspents, outputs, 'exclude', temp)
            }).then(_meta => {

                meta = _meta

                _.each(meta.inputs, function(input){
                    input.cantspend = true
                })

                return self.transactions.send(meta.tx)
                
            }).catch(e => {


                if (meta){
                    self.unspents.release(meta.inputs)
                }

                if((e == -26 || e == -25 || e == 16)){
                    return Promise.reject('sync')
                }

                return Promise.reject(e)

            })

        },
        send : function(key, tos){

            if(!addresses[key]) return Promise.reject('key')

            var outputs = self.helpers.outputs.tos(key, tos)
            var meta = null

            return self.unspents.getc(addresses[key]).then(unspents => {
                return self.transactions.txfees(unspents, outputs, 'exclude')
            }).then(_meta => {

                meta = _meta


                _.each(meta.inputs, function(input){
                    input.cantspend = true
                })

                return self.transactions.send(meta.tx)
                
            }).catch(e => {

                if (meta){
                    self.unspents.release(meta.inputs)
                }
                   

                if((e == -26 || e == -25 || e == 16)){
                    return Promise.reject('sync')
                }

                return Promise.reject(e)

            })


        },

        addqueue : function(key, to, ip, amount){
            
            if(!to) return Promise.reject('to')
            if(!addresses[key]) return Promise.reject('key')

            var queue = addresses[key].queue
            var all = addresses[key].all

            if(_.find(queue, function(object){ return object.address == to && !object.executing})) return Promise.resolve()

            

            var object = {
                address : to,
                key : key,
                id : f.makeid(),
                executed : '-',
                ip : ip || '',
                date : f.now(),
                amount : amount || undefined
            } 



            return self.checking(object).then(r => {
                return new Promise((resolve, reject) => {


                    queue.push(object)
                    all.push(object)

                    db.insert(object, function (err, docs) {
                        if(err) {

                            addresses[key].queue = _.filter(addresses[key].queue, function(q){
                                return object.id != q.id
                            })

                            addresses[key].all = _.filter(addresses[key].all, function(q){
                                return object.id != q.id
                            })

                            return reject(err)
                        }
    
                        resolve(object.id)
                    });

                    
    
                })
            })

            
        },

        makequeueE : function(key){
            return self.kit.makequeue(key).catch(e => {
                return Promise.reject(e)
            })
        },

        makequeue : function(key){
            if(!addresses[key]) return Promise.reject('key')

            var queue = _.filter(addresses[key].queue, function(object, l){
                return !object.executing & l < 50
            })



            if(!queue.length) return Promise.resolve()

            if(!addresses[key].keys){
                return Promise.reject('privateKeyMissed')
            }
            
            var executingId = f.makeid()

            var tos = _.map(queue, function(object){

                object.executing = executingId

                return {
                    address : object.address,
                    amount : object.amount
                }
            })



            return self.kit.send(key, tos).then(r => {


                addresses[key].queue = _.filter(addresses[key].queue, function(object){

                    if (object.executing != executingId) return true

                    return false
                })

                var date = f.now()

                var promises = _.map(queue, function(object){

                    return new Promise((resolve, reject) => {

                        db.update({ id: object.id }, { $set: { executed: date } }, {}, function (err) {
                            if(err) return reject(err)
                            resolve()
                        });

                    })
                    
                })

                return Promise.all(promises)

               
            }).catch(e => {


                var catchederror = false

                _.each(addresses[key].queue, function(object){
                    if (object.executing && (object.executing == executingId)) delete object.executing
                })


                if(e == 'sync'){
                    addresses[key].unspents = null
                    catchederror = true
                }

                if(!catchederror){

                    _.each(self.clbks.error.queue, function(c){
                        c(e, {
                            key : key
                        })
                    })

                }


                return Promise.reject(e)
            })
        },

        removeKey : function(key){
            if(!addresses[key]) return Promise.reject('fail')


            delete addresses[key].keys
            delete addresses[key].address

            addresses[key].unspents = null
            return Promise.resolve()
        },

        setPrivateKey : function(key, private){

            var kp = null
            
            try{
                kp = self.pocketnet.kit.keyPair(private)
            }
            catch(e){
                
            }

            if(!kp || !addresses[key]){
                
                return Promise.reject('fail')

            }
            else{


                addresses[key].keys = kp
                addresses[key].address = self.pocketnet.kit.addressByPublicKey(kp.publicKey) 

                return self.unspents.getc(addresses[key])
            }
        
        }
    }

    self.transactions = {
        txbase : function(unspents, outputs, fee, feeMode){

            var outputs = _.clone(outputs)

            if (!fee) fee = 0;
            if (!feeMode) feeMode = 'include'

            var total = _.reduce(outputs, function (m, o) {
                return m + Number(o.amount)
            }, 0)

            if (feeMode != 'include') {
                total = total + fee;
            }

            if (total <= 0) {
                return Promise.reject('total')
            }

            unspents = self.unspents.available(unspents)

            var totalHave = self.unspents.total(unspents)

            if (totalHave < total) {
                return Promise.reject('money')
            }

            unspents = _.shuffle(unspents)

            unspents = _.sortBy(unspents, function (u) {
                return Math.abs(u.amount - total)
            })

            var inputs = [];
            var totalTemp = 0;

            _.find(unspents, (unspent) => {
                if (totalTemp < total) {
                    inputs.push(unspent)
                    totalTemp = totalTemp + unspent.amount;
                }
                else{
                    return true
                }
            })

            if ((totalTemp - total).toFixed(8) > 0) {
                outputs.push({
                    address: inputs[0].address,
                    amount: (totalTemp - total).toFixed(8)
                })
            }

            if (feeMode == 'include') {
                outputs[0].amount = outputs[0].amount - fee;


                if (outputs[0].amount <= 0) {
                    return Promise.reject('fee')
                }
            }

            return Promise.resolve({
                inputs : inputs,
                outputs : outputs
            })
        },
        txfees : function(unspents, outputs, feeMode, keyPair){


            var inputs = []
            var feerate = 0.000000011;

            return self.transactions.txbase(unspents, outputs, 0, feeMode).then(r => {

                return self.transactions.build(r.inputs, r.outputs, keyPair)

            }).then(tx => {


                var totalFees = Math.max(tx.virtualSize() * feerate, 0.0002);
                return self.transactions.txbase(unspents, outputs, totalFees, feeMode)

            }).then(r => {

                inputs = r.inputs

                return self.transactions.build(r.inputs, r.outputs, keyPair)

            }).then(tx => {
                return Promise.resolve({
                    tx,
                    inputs
                })
            })
        },
        build : function(inputs, outputs, keyPair){

            //var amount = 0;
            var k = 100000000;
            var node = self.nodeManager.selectbest();

            if(!node) return Promise.reject('timeDifference')
            
            var txb = new self.pocketnet.lib.TransactionBuilder();

                txb.addNTime(node.timeDifference || 0)
                

            _.each(inputs, function (i) {
                txb.addInput(i.txid, i.vout)
            })

            _.each(outputs, function (o) {
                txb.addOutput(o.address, Number((k * o.amount).toFixed(0)));
            })

            _.each(inputs, function (i, inputindex) {

                if(!keyPair)
                    keyPair = _.find(addresses, function(a){
                        return a.address == i.address
                    })

                if (keyPair){
                    txb.sign(inputindex, keyPair.keys);
                }

            })

            var tx = null 
            
            try{
                tx = txb.build()

            } catch(e){
                return Promise.reject(e)
            }

            return tx;
        },
        send : function(tx){
            return self.nodeManager.request('sendrawtransaction', [tx.toHex()])
        }
    }

    self.clbks = {
        error : {
            ini : {},
            queue : {}
        },

        
    }

    self.info = function(){

        var info = {
            inited : inited,
            addresses : {}
        }

        _.each(addresses, function(r){
            info.addresses[r.key] = {
                key : r.key,
                unspents : r.unspents ? r.unspents.length : 0,
                balance : self.unspents.total(r.unspents),
                queue : r.queue.length,
                ready : r.keys ? true : false,
                address : r.address || null
            }
        })

        return info
    }

    self.inited = function(){
        return inited
    }

    self.stats = function(){

    }

    return self
}

module.exports = Wallet
