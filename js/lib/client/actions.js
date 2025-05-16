var ActionOptions = {
    pcTxFee : 1 / 100000000,
    amountC : 100000000,
    dustValue : 700 / 100000000,
    optimizeUnspentsMin : 80,
    optimizeUnspentsMax : 300,
    clearRejected : true,
    clearCompleted : true,
    testWithoutSend : false, ///
    objects : {
        transaction : {
            calculateFee : function(){
                return true
            },
            rejectedAsk : true,
            donotexport : true,
            amount : function(action){
                return _.reduce(action.object.reciever.v, (m, dn) => {
                    return m + dn.amount
                }, 0)
            },
            validation : function(action){
                return action.object.reciever.v && action.object.reciever.v.length
            },
            destination : function(action){
                return _.clone(action.object.reciever.v)
            },
            opreturn : function(action, account){
                if (action.object.message.v){
                    return action.object.message.v
                }
            },

            addresses : function(action){
                return _.clone(action.object.source.v)
            },

            feemode : function(action, account){
                
                if (action.object.feemode.v){
                    return action.object.feemode.v
                }
            },

            //saveTxToStorage : true

         
        },
        upvoteShare : {
            collision : function(obj, obj2){

                if (obj.object.type == obj2.object.type && obj2.object.share.v == obj.object.share.v){
                    if(obj2.added < obj.added) return false
                }

                return true

            },
        },

        subscribePrivate : {
            collision : function(obj, obj2){

                if ((obj2.object.type == 'unsubscribe' || obj2.object.type == 'subscribe') && obj2.object.address.v == obj.object.address.v){
                    if(obj2.added < obj.added) return false
                }

                return true

            },
        },

        subscribe : {
            collision : function(obj, obj2){

                if ((obj2.object.type == 'unsubscribe' || obj2.object.type == 'subscribePrivate') && obj2.object.address.v == obj.object.address.v){
                    if(obj2.added < obj.added) return false
                }

                return true

            },
        },

        unsubscribe : {
            collision : function(obj, obj2){

                if ((obj2.object.type == 'subscribe' || obj2.object.type == 'subscribePrivate') && obj2.object.address.v == obj.object.address.v){
                    if(obj2.added < obj.added) return false
                }

                return true

            },
        },


        userInfo : {
            rejectedAsk : false, /// orfens
            sendAgain : true,   /// orfens
            attentionIfReJectCodes : [18],
            change : function(action, account){

                if (action.transaction){
                    account.willChange = true
                }

                if (action.completed){
                    account.willChange = false
                    account.status.value = true

                }
            },
            sendWithNullStatus : true,

            collision : function(obj, obj2){

                if (obj.object.type == obj2.object.type){
                    if(!obj2.sent){
                        if(obj2.added < obj.added) return false
                    }
                }

                return true

            },

            priority : 1
        },

        share : {
            rejectedAsk : true,
            priority : 2,
            delayedNtime : function(action){
                if (action.object.settings.t > 1){
                    return action.object.settings.t
                }

                return 0
            }
        },

        contentBoost : {
            rejectedAsk : true,
            amount : function(action){
                return action.object.amount.v
            },

            destination : function(action){
                return []
            },

            burn : true
        },

        miniapp : {
            rejectedAsk : true,
            amount : function(action){
                return (window.testpocketnet || action.object.hash) ? 0 : 50
            },

            destination : function(action){
                return []
            },

            burn : true
        },

        comment : {
            rejectedAsk : true,
            destination : function(action){


                if(action.object.typeop() != 'comment') return []


                return _.clone(action.object.donate.v)
            },
            amount : function(action){



                if(action.object.typeop() != 'comment') return 0


                return _.reduce(action.object.donate.v, (m, dn) => {
                    return m + dn.amount
                }, 0)
            },

            calculateFee : function(action){
                return action.object.donate.v > 0
            },

            collision : function(obj, obj2){

                if (obj.object.typeop() == obj2.object.typeop() && obj.object.typeop() == 'commentEdit' && obj2.object.id == obj.object.id){

                    if(obj2.added < obj.added) {
                        return false
                    }
                }

                return true

            },
        },

        modVote : {
            keep : 800
        }
    }
}

var errorCodesAndActionsExecutors = {
    wait : function(action){
        
        if(!action.rejectWait)
            action.rejectWait = (new Date()).addSeconds(60 * 2)

        return Promise.resolve()
    },

    useraction : function(action){
    },

    limit : function(action, error){
        ///TODO LIMIT (example question: send in 1 h)
        return Promise.reject(error)
    }
}

var errorCodesAndActions = {
    '1'  : errorCodesAndActionsExecutors.wait,
    '261'  : errorCodesAndActionsExecutors.wait,
    '2'  : errorCodesAndActionsExecutors.limit,
    '3'  : errorCodesAndActionsExecutors.limit,
    '15' : errorCodesAndActionsExecutors.limit,
    '29' : errorCodesAndActionsExecutors.limit,
    '31' : errorCodesAndActionsExecutors.limit,
    '49' : errorCodesAndActionsExecutors.limit,
    '61' : errorCodesAndActionsExecutors.limit,
    '65' : errorCodesAndActionsExecutors.limit,
    '18' : errorCodesAndActionsExecutors.useraction,
    '28' : errorCodesAndActionsExecutors.wait,
    '37' : errorCodesAndActionsExecutors.wait
}

var Action = function(account, object, priority, settings){

    var options = ActionOptions.objects[object.type] || {}
    var updatehash = ''

    var self = this


    self.object = object
    self.priority = priority || options.priority || 3
    self.added = new Date()
    self.until = (new Date()).addSeconds(60 * 60 * 12)
    self.settings = settings || {}
    self.rejectWait = null
    self.updated = null
    self.keep = options.keep || false

    self.sent = null
    self.checkedUntil = null
    self.checkConfirmationUntil = null

    self.inputs = []
    self.outputs = []
    self.attempts = 0
    self.alias = null
    self.transaction = null

    self.completed = false
    self.rejected = null
    self.tryingsend = null

    self.id = makeid()

    self.export = function(){
        var e = {}

        e.id = self.id

        e.priority = self.priority
        e.added = self.added
        e.until = self.until
        e.sent = self.sent
        e.sending = self.sending
        e.ttxid = self.ttxid
        e.checkedUntil = self.checkedUntil
        e.checkConfirmationUntil = self.checkConfirmationUntil
        e.inputs = _.clone(self.inputs)
        e.outputs = _.clone(self.outputs)
        e.attempts = self.attempts
        e.transaction = self.transaction
        e.settings = self.settings
        e.rejectWait = self.rejectWait

        e.rejected = self.rejected
        e.completed = self.completed
        e.tryingsend = self.tryingsend
        e.updated = self.updated
        e.keep = self.keep

        if (self.object.export){
            e.expObject = self.object.export(true)
        }
        else{
            e.object = _.clone(self.object)
        }

        return e
    }

    self.import = function(e){

        if (e.updated){
            var updated = new Date(e.updated)

            if (updated < self.updated) return
        }

        self.priority = e.priority

        if (e.added)
            self.added = new Date(e.added)

        if (e.until)
            self.until = new Date(e.until)

        if (e.sent)
            self.sent = new Date(e.sent)

        if (e.sending)
            self.sending = new Date(e.sending)

        if (e.ttxid)
            self.ttxid = e.ttxid

        if (e.rejectWait) 
            self.rejectWait = new Date(e.rejectWait)

        if (e.checkedUntil)
            self.checkedUntil = new Date(e.checkedUntil)

        if (e.tryingsend)
            self.tryingsend = new Date(e.tryingsend)

        if (e.updated)
            self.updated = new Date(e.updated)

        self.id = e.id || makeid()

        if (e.checkConfirmationUntil)
            self.checkConfirmationUntil = new Date(e.checkConfirmationUntil)

        self.inputs = _.clone(e.inputs)
        self.outputs = _.clone(e.outputs)
        self.attempts = e.attempts
        self.transaction = e.transaction
        self.settings = e.settings || {}

        if (e.object){
            self.object = e.object
        }

        if (e.completed){
            self.completed = e.completed
        }

        if (e.keep){
            self.keep = e.keep
        }

        if (e.rejected){
            self.rejected = e.rejected
        }

        if (e.expObject){

            var alias = new kits.c[e.expObject.type]()
                alias.import(e.expObject)

            self.object = alias
        }

        options = ActionOptions.objects[self.object.type] || {}
        self.options = options

        updatehash = getinternalhash()
    }

    self.logerror = function(data){

        try{
            account.parent.app.Logger.error({
                err: 'TRANSACTION_ERROR',
                code: 802,
                payload: data,
            });
        }

        catch(e){
            console.error('cant send error log')
        }

    }

    var getBestInputs = function(unspents, value){

        var optimizeUnspents = false

        if (value == 0) {
            value = 0.00000001
        }

        if (value < 0.0000001) {

            if (unspents.length > ActionOptions.optimizeUnspentsMax){
                optimizeUnspents = true

            }
        }

        var added = 0
        var addedUnspents = {}
        var dustValue = ActionOptions.dustValue

        if(_.reduce(unspents, (m, u) => {
            return m + u.amount
        }, 0) < dustValue){
            console.error("DUST: Unable sent")

            dustValue = 0
        }


        while ((added < dustValue || added < value || (optimizeUnspents && _.toArray(addedUnspents).length < 5)) && unspents.length){
            var diff = Math.max(Math.max(value, dustValue) - added, 0)

            var iterationUnspents = _.first(_.sortBy(unspents, (u) => {

                return Math.abs(u.amount - diff)
    
            }), 5)

            var unspent = iterationUnspents[rand(0, iterationUnspents.length - 1)]

            addedUnspents[unspent.txid + ':' + unspent.vout] = unspent
            added += unspent.amount

            if(dustValue > added){
            }


            unspents = _.filter(unspents, (unspent) => {
                return !addedUnspents[unspent.txid + ':' + unspent.vout]
            })

        }
        

        return _.toArray(addedUnspents)

        
    }

    var buildTransaction = function({inputs, outputs, opreturnData, delayedNtime}){
        var txb = new bitcoin.TransactionBuilder();
        var seqnumber = 0 
        //delayedNtime

        if (delayedNtime){
            txb.setLockTime(delayedNtime + (account.parent.app.platform.timeDifference || 0))
            txb.setNTime(delayedNtime)
        }


        txb.addNTime(account.parent.app.platform.timeDifference || 0)

        _.each(inputs, (input, index) => {
            seqnumber++
            txb.addInput(input.txid, input.vout, delayedNtime ? 4294967294 : null, Buffer.from(input.scriptPubKey, 'hex'))
        })

        if(opreturnData){

            var embed = bitcoin.payments.embed({ data: opreturnData });
            txb.addOutput(embed.output, 0);

        }

        _.each(outputs, (out) => {

            txb.addOutput(out.address, Math.floor(out.amount * ActionOptions.amountC));
        })

        _.each(inputs, (input, index) => {
            account.signInput(txb, input, index)
        })

        var tx = txb.build()
        
        return tx
    }
    

    var save = function(){

        if(setUpdated()) account.save()
    }

    var trigger = function(){

        if(setUpdated()) account.trigger(self)

    }

    var getinternalhash = function(){
        var e = self.export()

        delete e.updated
        //delete e.checkConfirmationUntil

        return rot13(JSON.stringify(e))
    }

    var setUpdated = function(){

        var hash = getinternalhash()

        if (updatehash != hash){
            self.updated = new Date()
            updatehash = hash

            return true
        }
        
    }

    var filterUnspents = function(unspents){

        if (options.addresses){
            var addresses = options.addresses(self, account)

            unspents = _.filter(unspents, (u) => {
                return _.indexOf(addresses, u.address) > -1
            })
        }

        else{
            unspents = _.filter(unspents, (u) => {
                return u.address == account.address
            })
        }

        return unspents
    }

    var makeTransaction = async function(retry, calculatedFee, send){


        var changeAddresses = options.addresses ? options.addresses(self, account) : [account.address]
        if(!changeAddresses.length) changeAddresses = [account.address]

        var unspents = filterUnspents(account.getActualUnspents(self.object.type == 'userInfo' ? 'withUnconfirmed' : true, changeAddresses))
        var fee = calculatedFee || ((options.calculateFee && options.calculateFee(self)) ? 0 : ActionOptions.pcTxFee)
    
        

        self.estimatedFee = fee

        if(!unspents.length || retry){
            try{
                await account.updateUnspents(retry ? 0 : 60).then((clearUnspents) => {


                    clearUnspents = filterUnspents(clearUnspents)

                    if(!clearUnspents.length && !account.unspents.willChange && account.actualBalance().total <= 0){

                        if(!account.unspents.updated){
                            return Promise.reject('actions_inputs_not_updated')
                        }

                        return Promise.reject('actions_noinputs')
                    }
    
                    unspents = account.getActualUnspents(self.object.type == 'userInfo' ? 'withUnconfirmed' : true, changeAddresses)

        
                })
            }
            catch(e){
                return Promise.reject(e)
            }
            
        }


        if(!unspents.length){
            return Promise.reject('actions_noinputs_wait')
        }

        var amount = (options.amount ? options.amount(self) : 0) 
        var feeIncludedinAmount = false

        if(!options.burn){
            amount += (options.feemode && options.feemode(self, account) == 'include' ? 0 : fee)
            feeIncludedinAmount = true
        }

        var inputs = getBestInputs(unspents, amount)

        var totalInputAmountWithFee = toFixed(_.reduce(inputs, (m, u) => {
            return m + u.amount
        }, 0), 8)

        var totalInputAmount = toFixed(totalInputAmountWithFee - fee, 8)


        if (amount && totalInputAmountWithFee < amount) {


            if(!feeIncludedinAmount){
                if (account.actualBalance(changeAddresses).total < amount){
                    return Promise.reject('actions_totalAmountSmaller_amount')
                }
    
                return Promise.reject('actions_totalAmountSmaller_amount_wait')
            }

            else{
                if (account.actualBalance(changeAddresses).total < amount){
                    return Promise.reject('actions_totalAmountSmaller_amount_fee')
                }
    
                return Promise.reject('actions_totalAmountSmaller_amount_fee_wait')
            }

            
        }

        if (totalInputAmount <= 0) {

            return Promise.reject('actions_totalAmountZero')
        }

        var outputs = []

        var optype = null
        var optstype = null
        var opreturnData = null
        var method = 'sendrawtransaction'

        //return Promise.reject('deprecated')

        //////////////

        if (self.object.serialize){

            method = 'sendrawtransactionwithmessage'

            var data = Buffer.from(bitcoin.crypto.hash256(self.object.serialize()), 'utf8');

            optype = self.object.typeop ? self.object.typeop() : self.object.type
            optstype = self.object.optstype && self.object.optstype() ? self.object.optstype() : optype
            opreturnData = [Buffer.from(optype, 'utf8'), data];

            if (self.object.opreturn) {
                opreturnData.push(Buffer.from(self.object.opreturn()))
            }
        }
        else{
            if (options.opreturn){

                var opreturn = options.opreturn(self, account)

                if (opreturn){
                    opreturnData = [Buffer.from(opreturn, 'utf8')];
                }
                
            }
        }

        if (options.destination){
            _.each(options.destination(self, account), (d) => {
                outputs.push(_.clone(d))
            })
        }
        else{

            if(unspents.length < ActionOptions.optimizeUnspentsMin && totalInputAmount > 0.001){

                var spcount = 2

                if(totalInputAmount > 0.5 && !account.wasdvii){
                    spcount = 10
                    account.wasdvii = true
                }

                var divii = toFixed(totalInputAmount / spcount, 8)
                var added = 0

                for(var i = 0; i < spcount; i++){
                    if(i == spcount - 1){

                        let v = toFixed(totalInputAmount - added, 8)

                        outputs.push({
                            address : changeAddresses[0],
                            amount : v
                        })

                        added += v
                    }
                    else{
                        added += divii

                        outputs.push({
                            address : changeAddresses[0],
                            amount : divii
                        })
                    }
                    
                }

            }
            else{
                outputs.push({
                    address : changeAddresses[0],
                    amount : totalInputAmount
                })
            }
            
        }

        if(options.feemode && options.feemode(self, account) == 'include'){
            var dfee = fee / outputs.length

            _.each(outputs, (out) => {
                out.amount = toFixed(out.amount - dfee, 8)
            })
        }

        //(options.feemode && options.feemode(self, account) == 'include' ? 0 : fee)

        var totalOutputAmount = toFixed(_.reduce(outputs, (m, u) => {
            return m + u.amount
        }, 0), 8)


        if (totalOutputAmount < totalInputAmount){

            var v =  toFixed(totalInputAmount - totalOutputAmount - (options.burn ? amount : 0), 8)


            if (v > 1 / ActionOptions.amountC){
                outputs.push({
                    address : changeAddresses[0],
                    amount : v
                })
            }
        }

        var delayedNtime = 0

        if(options.delayedNtime){
            var ntime = options.delayedNtime(self)
            var now = (new Date()).getTime() / 1000

            if (ntime && ntime > now){
                delayedNtime = ntime
            }
        }


        var tx = null
        
        try{
            tx = buildTransaction({inputs, outputs, opreturnData, delayedNtime})
        }
        catch(e){
            return Promise.reject(e)
        }


        
        if ((options.calculateFee && options.calculateFee(self)) && !calculatedFee){
            var feerate = await account.parent.estimateFee()

            return makeTransaction(false, Math.min(tx.virtualSize() * Math.min(feerate, 0.00002499 / 2), 0.0999), send)
        }

        var hex = tx.toHex();
        var ttxid = tx.getId()

        console.log('ttxid', ttxid)

            

        if(!send){
            return Promise.resolve({tx, calculatedFee})
        }

        var parameters = [hex]

        if (self.object.export && !options.donotexport){
            parameters.push(self.object.export())
        }

        if (optstype){
            parameters.push(optstype)
        }

        self.sending = new Date()
        self.ttxid = ttxid

        self.inputs = inputs
        self.outputs = outputs

        trigger()

        var sendPromise = new Promise((resolve) => {
            return resolve(makeid())
        }) 

        if(!ActionOptions.testWithoutSend)
            sendPromise = account.parent.api.rpc(method, parameters)
        

        return sendPromise.catch(e => {

            var code = e.code

            if (code == 2000 && method == 'sendrawtransaction'){

                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        account.parent.app.platform.sdk.node.transactions.get.tx(ttxid,  (data, error) => {

                            console.log('error', error, e, ttxid)

                            if(error){
                                reject(e)
                            }
                            else{
                                resolve(ttxid)
                            }

                        })

                    }, 10000)
                })
                
                return Promise.resolve(ttxid)
            }

            return Promise.reject(code)

        }).then(transaction => {

            console.log("THEN")

            self.transaction = transaction

            if (options.saveTxToStorage){
                account.parent.saveTxToStorage(transaction, tx)
            }

            self.checkConfirmationUntil = (new Date()).addSeconds(35)

            if (delayedNtime){
                self.checkConfirmationUntil = (new Date(delayedNtime * 1000)).addSeconds(35)
                self.until = (new Date(delayedNtime * 1000)).addSeconds(60 * 60 * 12)
            }

            delete self.sending
            delete self.ttxid

            self.sent = new Date()

            trigger()


            return Promise.resolve()


        }).catch((e = {}) => {

            var code = e.code
            
            delete self.inputs
            delete self.outputs
            delete self.sending
            delete self.ttxid

            if((code == -26 || code == -25 || code == 16 || code == 261)){

                if(!retry){
                    save()
                    return makeTransaction(true, calculatedFee, send)
                }

                else{
                    self.logerror({
                        method, parameters, error : e
                    })
                }
                
            }

            if (code == 26){
                self.logerror({
                    method, parameters, error : e
                })
            }

            /*if (options.rejectedAsk){

            }*/


            self.rejected = code || (e.toString ? e.toString() : 'actions_rejected')

            trigger()

            return Promise.reject(self.rejected)
            
        })
       
    }

    var checkTransaction = function(){

        return new Promise((resolve, reject) => {


            retry(function(){
                return account.parent.app.platform.currentBlock
            }, function(){

                var getfun = account.parent.app.platform.sdk.node.transactions.get.tx

                if(ActionOptions.testWithoutSend){
                    getfun = function(t, clbk){
                        clbk({
                            confirmations : rand(0, 10) < 2 ? 1 : 0
                        })
                    }
                }

                getfun(self.transaction, (data, error = {}) => {

                    data || (data = {})

                    console.log('error.code', error)

                    if (error.code == -5 || error.code == -8){

                        self.attempts || (self.attempts = 0)
                        self.attempts ++ 

                        if (self.attempts > 2){

                            if (options.rejectedAsk || options.sendAgain){
                                self.rejected = 'actions_rejectedFromNodes'
                            }
                            else{
                                self.sent = null
                                self.transaction = null
                                self.rejected = 'actions_rejectedFromNodes_ignore'
                            }

                            if (options.change) options.change(self, account)

                            trigger(self)

                            return reject(self.rejected)
                        }

                        return reject('newAttempt')
                    }

                    if (data.confirmations > 0){
                        self.completed = true

                        if(options.change) options.change(self, account)

                        account.addUnspentFromTransaction(data)
                        account.removeInputsFromTransaction(data)

                        trigger(self)

                        return resolve()

                    }

                    return reject('actions_waitConfirmation')

                }, {}, true)

            })
        })
    }

    self.controlReject = function(error){

        if(!error) error = self.rejected

        if(!error) return true

        if (error && self.options.attentionIfReJectCodes){
            if(_.indexOf(self.options.attentionIfReJectCodes, error) > -1) return true
        }

        if (error && errorCodesAndActions[error]){
            return true
        }

        return false
    }

    self.checkTransactionWide = async function(){

        var rs = 0
        
        return account.parent.app.platform.sdk.node.transactions.get.txwide(self.transaction, (results = {}) => {

            _.each(results, result => {

                if(result.data){
                    if(result.data.confirmations > 0){
                        rs++
                    }
                }

                if(result.error){
                    if(result.error.code == -5 || result.error.code == -8){
                        rs--
                    }
                }
                
            })
           
        }).then(() => {

            if(rs > 0) return 1
            if(rs == 0) return 0
            if(rs < 0) return -1

        })
    }

    self.sendAgain = function(){
        delete self.rejected

        trigger(self)
    }

    self.rejectedByUser = function(){
        self.rejected = 'actions_rejectedByUser'

        trigger(self)
    }

    self.setCompleted = function(){
        delete self.rejected
        self.completed = true

        trigger(self)
    }

    self.trysend = function(a){
        self.tryingsend = a ? (new Date()).addSeconds(45) : null
        save()
    }

    self.processing = async function(){

        if (self.completed){
            return Promise.reject('actions_completed')
        }

        if (self.rejected){

            if (self.rejectWait){
                if (self.rejectWait > new Date()){
                
                }
                else{
                    
                    self.rejectWait = null
                    self.rejected = null
                }
            }
            

            if (self.rejected)
                return Promise.reject(self.rejected)
        }

        if (self.transaction){
            
            /// temps/wait confirmation

            if (self.checkConfirmationUntil && self.checkConfirmationUntil > new Date()){
                return Promise.reject('actions_alreadyCheckConfirmation')
            }

            self.checkConfirmationUntil = (new Date()).addSeconds(65)

            return checkTransaction()
        }

        

        if (self.sent){
            return Promise.reject('actions_alreadySent')
        }


        if (self.sending && (new Date()).addSeconds(-120) < self.sending){
            return Promise.reject('actions_alreadySending')
        }

        if (self.ttxid){
            return new Promise((resolve, reject) => {
            
                account.parent.app.platform.sdk.node.transactions.get.tx(self.ttxid,  (data, error) => {

                    if (error){
                        delete self.ttxid

                        reject()
                    }
                    else{
                        checkTransaction().then(resolve).catch(reject)
                    }

                })

            })
        }

        if (self.tryingsend && self.tryingsend > new Date()){
            return Promise.reject('actions_tryingsend')
        }

        if (self.until < new Date()){
            self.rejected = 'actions_rejectedByTime'

            return Promise.reject(self.rejected)
        }

        if (!account.status.value){
            if(!options.sendWithNullStatus) {
                return Promise.reject('actions_waitUserStatus')
            }
        }

        if (self.object.checkloaded && self.object.checkloaded()){
            return Promise.reject('actions_resourses')
        }

        if (self.object.validation){
            var error = self.object.validation();

            if (error) {
                self.rejected = error
                return Promise.reject(self.rejected)
            }
        }

        if (options.validation && !options.validation(self)){
            self.rejected = 'validation'
            return Promise.reject(self.rejected)
        }

        self.trysend(true)

        if (self.object.canSend){

            if (self.checkedUntil && self.checkedUntil > new Date()){
                return Promise.reject('actions_alreadyCheck')
            }

            self.checkedUntil = (new Date()).addSeconds(45)

            return new Promise((resolve, reject) => {
                self.object.canSend(app, (r) => {

                    if(r){

                        self.checkedUntil = null

                        makeTransaction(false, (self.settings || {}).calculateFee || null, true).then(resolve).catch(reject)
                    }
                    else{
                        reject('actions_checkFail')
                    }
    
                })
            }).then(() => {
                self.trysend()
            }).catch((e) => {
                self.trysend()

                return Promise.reject(e)
            })

        }

        return makeTransaction(false, (self.settings || {}).calculateFee || null, true).then(() => {
            self.trysend()

        }).catch((e) => {
            self.trysend()

            return Promise.reject(e)
        })

    }

    self.processingWithIteractions = async function(rejectIfError){

        var error = null
        var tryresolve = false

        

        try{
            await self.processing()
        }
        catch(e){


            if (
                e == 'actions_rejectedFromNodes' || 
                e == 'actions_noinputs' || 
                self.controlReject(e)
                ){
                    tryresolve = true
                
            }

            self.currentState = e

            error = e

            //console.error(e)
            
        }

        
        if (error && tryresolve){
            error = await account.actionRejectedWithTriggers(self, error)
        }
        else{

            if(rejectIfError){
                if(
                    error == 'actions_inputs_not_updated' ||
                    //error == 'actions_noinputs_wait' || 
                    error == 'actions_userInteractive' || 
                    error == 'actions_waitUserInteractive' || 
                    error == 'actions_waitUserStatus' || 
                    error == 'actions_tryingsend' || 
                    error == 'actions_checkFail' || 

                    (_.isArray(rejectIfError) && rejectIfError.indexOf(error) > -1)
                    
                    // || errorCodesAndActions[error]

                ){

                }
                else{
                    self.rejected = error
                }
            }

            trigger()
        }

        if(error) throw error
        
    }

    self.prepareTransaction = function(fee = 0){
        return makeTransaction(false, fee, false)
    }

    self.get = function(){
        var exported = self.export()

        var alias = {}// exported.expObject || exported.object

        if (self.object.alias){
            alias = self.object.alias()
        }
        else{
            if (exported.expObject){

                alias = new kits.c[exported.expObject.type]()
                alias.import(exported.expObject)
    
            }
            else{
                alias = _.clone(exported.object)
            }
        }

        alias.txid = exported.transaction

        if (alias.txid && !self.completed && !self.rejected) { alias.temp = true }
        if(!alias.txid) { alias.txid = self.id; alias.relay = true }
        

        alias.actor = account.address;
        alias.type = self.object.type

        if(!alias.id)
            alias.id = alias.txid

        if(!alias.address) alias.address = account.address

        alias.time = self.added || new Date()
        alias.timeUpd = alias.time
        alias.optype = self.object.typeop ? self.object.typeop() : self.object.type

        alias.inputs = exported.inputs
        alias.outputs = exported.outputs


        if (alias.txidEdit){
            alias.txid = alias.txidEdit
            alias.editing = true
        }


        if(self.checkedUntil){
            alias.checkSend = true
        }


        alias.actionId = self.id

        if(self.rejected) alias.rejected = self.rejected

        alias.__action = self

        return alias
    }

    self.options = options
    self.makeTransaction = makeTransaction
    self.setUpdated = setUpdated
    return self
}

var Account = function(address, parent){
    var self = this

    var willChangeTime = 280 
    var waitUserActionComponent = null
    var thisWaitUserAction = null
    self.waitUserAction = null
    self.address = address

    self.status = {
        value : null,
        updated : null,
        willChange : false
    }

    self.unspents = {
        willChange : null, /// date, wait free coins
        value : [],
        updated : null,
        height : 0
    }

    self.actions = {
        value : [],
        updated : null
    }

    var emitted = {
        completed : {},
        rejected : {},
        sent : {},
        relay : {},
        relayorsent : {}
    }

    self.keyPair = null

    var temps = {
        unspents : null
    }

    var setWaitUserAction = function(v){
        self.waitUserAction = v
        thisWaitUserAction = v
        self.trigger()
    }

    self.clearThisWaitUserAction = function(){
        if(thisWaitUserAction){
            setWaitUserAction(null)
        }
    }

    var checkTransactionById = function(ids){

        var actions = []

        _.each(ids, (txid) => {
            var action = _.find(self.actions.value, (action) => {

                if(action.rejected || action.completed) return

                if(action.transaction == txid){
                    return true
                }
            })

            if (action){
                action.completed = true

                actions.push(action)

                if(action.options.change) action.options.change(action, self)

                self.trigger(action)
            }

            if (self.unspents.willChange){
                if (self.unspents.willChange.transaction == txid){
                    self.unspents.willChange = null
                }
            }
        })

        return actions
    }

    var cleanOutputs = function(){
        self.unspents.value = _.uniq(self.unspents.value, (v) => {
            return v.txid + ";" + v.vout
        })
    }

    var checkTransactionByUnspents = function(){

        _.each(self.unspents.value, (u) => {
            var action = _.find(self.actions.value, (action) => {

                if(action.completed || action.rejected) return

                if(action.transaction == u.txid){
                    return true
                }
            })

            if (action){
                action.completed = true

                if(action.change) action.change(action, self)

                self.trigger(action)

            }

            /*if (self.unspents.willChange){
                if (self.unspents.willChange.transaction == out.txid){
                    self.unspents.willChange = null
                }
            }*/
        })

    }

    var checkUnspentReadyBlockChain = function(u){
        var wait = 0

        

        if (u.confirmations <= 11 && u.pockettx) {

            wait = 11 - u.confirmations

        }

        if (u.confirmations == 0 && !u.coinbase && !u.coinstake && !u.pockettx) {

            wait = 1

        }

        if (u.confirmations < 100 && (u.coinbase || u.coinstake)) {

            wait = 100 - u.confirmations

        }

        if(wait) return false


        return true
    }

    var getActionById = function(id){
        return _.find(self.actions.value, (a) => {
            return a.id == id
        })
    }

    self.releaseCheckInAnotherSession = function(){
        _.each(self.actions.value, (a) => {
            delete a.checkInAnotherSession
        })

        self.checkRequestUnspentsInAnotherSession = false
    }

    self.cancelAction = function(id){
        var action = getActionById(id)

        if (!action){
            return Promise.reject('actions_noAction')
        }

        action.rejected = 'actions_rejectedByUser'

        self.trigger(action)

        return Promise.resolve()
    }

    self.isCurrentAccount = function(){
        var account = parent.getCurrentAccount()

        if(!account) return false

        return account.address == self.address
    }
    ///promise

    self.actionRejectedWithTriggers = async function(action, error){


        try{
            await self.actionRejected(action, error)

            self.trigger(action)

            error = null
        }
        catch(e){

            if (e == 'actions_rejectedByUser'){
                self.rejected = 'actions_rejectedByUser'
                self.trigger(action)
            }

            error = e
        }

        return error
    }

    self.actionRejected = async function(action, error){


        //// use getActionById(in clbk)

        if(action.checkInAnotherSession) return Promise.reject(error)


        if(error == 'actions_noinputs'){

            if(self.checkRequestUnspentsInAnotherSession) return Promise.reject(error)

            var parameters = {
                reason : ""
            }

            if (action.object.type == 'userInfo' && self.getStatus() != 'registered'){
                parameters.reason = 'registration'
            }else{
                parameters.reason = 'balance'
            }

            return await self.userInteractive(action, error, 'requestUnspents', parameters).catch(e => {

                action.checkInAnotherSession = true

                self.checkRequestUnspentsInAnotherSession = true

                if(e == 'support'){
                    
                }

            })

            //checkBalance on account in blockchain, calc reason, and maybe show captcha
            
        }

        if(error == 'actions_rejectedFromNodes'){

            if (action.options.sendAgain || action.options.rejectedAsk){
                ////check Node Block(compare with other) and send Again now or ask
                /// and maybe wait 10 minutes

                if(!action.sent || !action.transaction){
                  
                    return
                }

                if (action.sent > (new Date()).addSeconds(- 60 * 20)){
                    return
                }

                else{

                    try{
                        var result = await action.checkTransactionWide()

                        if (result > 1){
                            action.setCompleted()
                            ///completed
                            return
                        }

                        if(result == 0){
                            action.checkInAnotherSession = true
                            /// undefined
                            return
                        }

                        if(result < 0){
                            
                        }
                    }
                    catch(e){
                        action.checkInAnotherSession = true

                        /// undefined
                        return
                    }
                    
                }

                
            }
            else{
                action.rejectedByUser()
                return
            }


            if (action.options.sendAgain) {

                //// update action status

                action.sendAgain()

                return
            }

            if (action.options.rejectedAsk) {

                return self.userInteractive(action, error, 'sendTransactionAgainQuestion', {}).then(() => {

                    action.sendAgain()

                }).catch(e => {

                    if (e == 'actions_rejectedByUser' || e == 'todo'){
                        action.rejectedByUser()
                    }

                    else{
                        action.checkInAnotherSession = true
                    }
                    

                })

            }

        }

        if(action.controlReject(error)){

            if (action.object.type == 'userInfo' && error == 18){

                //action.rejected = 'actions_rejectedFromNodes'
                //// ask change user name

                return await self.userInteractive(action, error, 'changeUserName', {}).then(() => {
                    //// new action instead (collisions)
                    //action.rejectedByUser()
                }).catch(e => {

                    if (e == 'actions_rejectedByUser'){
                        action.rejectedByUser()
                    }

                    else{
                        action.checkInAnotherSession = true
                    }

                })

            }


            if(errorCodesAndActions[error]){
                return errorCodesAndActions[error](action, error).then(() => {

                    return Promise.resolve()
                    
                })
                
                /*.catch(e => {
                    action.rejectedByUser()
                })*/
            }
        }

        return Promise.reject(error)

        //// actionRejected
    }

    self.userInteractive = function(action, error, type, parameters){


        if(!self.isCurrentAccount()) return Promise.reject('actions_userInteractive')

        if (self.waitUserAction) return Promise.reject('actions_waitUserInteractive')

        setWaitUserAction({action : action.id, error})

        if(type == 'requestUnspents'){
            return self.requestUnspents(parameters).then(() => {
                return Promise.resolve()
            }).finally(() => {

                setWaitUserAction(null)
            })
        }

        if(type == 'sendTransactionAgainQuestion'){
            setWaitUserAction(null)
            return Promise.reject('todo')
            return self.ui.sendTransactionAgainQuestion(action, (component) => {

                waitUserActionComponent = component

            }).finally(() => {
                setWaitUserAction(null)
            })
        }


        if(type == 'changeUserName'){
           
            return parent.app.platform.ui.edituserinfo(type, (component) => {

                waitUserActionComponent = component

            }).then(newaction => {
                return Promise.resolve(newaction)
            }).catch(e => {

                
                if (self.getStatus() == 'registered'){
                    return Promise.reject('actions_rejectedByUser')
                }
                
                return Promise.reject(e)
            }).finally(() => {
                setWaitUserAction(null)
            })
  
        }

        setWaitUserAction(null)
    }

    self.solveCaptcha = function(parameters = {}, proxyOptions){

        
        return parent.app.platform.ui.captcha(parameters.reason, (component) => {
            waitUserActionComponent = component
        }, proxyOptions)
    }

    self.support = function(parameters, error, proxyOptions){

        var ps = {
            ...parameters,
            error,
            ...proxyOptions
        }

        return parent.app.platform.ui.support(parameters.reason, ps)
    }

    self.willChangeUnspentsCallback = function(actionId, proxy){


        self.unspents.willChange = {
            transaction : null,
            id : actionId,
            until : (new Date()).addSeconds(willChangeTime),
            proxy
        }

        self.trigger()
    }

    self.checkWillChangeUnspents = function(){


        if (self.unspents.willChange){
            if((new Date()) > self.unspents.willChange.until){
                self.unspents.willChange = null

                self.trigger()
            }
        }
        
    }

    self.requestUnspents = function(parameters, proxyoptions){
        

        return new Promise((resolve, reject) => {

            if (proxyoptions){
                return resolve(proxyoptions)
            }

            parent.api.get.proxywithwalletls().then(proxy => {

                proxyoptions = {
                    proxy : proxy.id
                }

            }).then(resolve).catch(reject)

        }).then(() => {

            return self.solveCaptcha(parameters, proxyoptions)

        }).then((captcha) => {

            return parent.api.fetchauth('free/balance', {
                                
                address: self.address,
                captcha: captcha.id,
                key : parameters.reason
    
            }, proxyoptions)

            //// TODO
        }).then((action) => {


            self.willChangeUnspentsCallback(action, proxyoptions.proxy)

            return Promise.resolve({
                action,
                proxy : proxyoptions.proxy
            })

        }).catch(e => {

            console.error(e)

            if(e == 'captcha'){
                return self.requestUnspents(parameters, proxyoptions)
            }

            if(e == 'noproxywithwallet' || e == 'error' || e == 'iplimit' || e == 'uniq'){
                //moneyfail to support

                self.support(parameters, e, proxyoptions)

                return Promise.reject(e)
            }

            return Promise.reject(e)
        }).catch(e => {

            return Promise.reject(e)

        })
    }

    /*self.setWaitCoins = function(value){
        self.unspents.willChange = value ? true : false
    }*/

    self.setStatus = function(value){
        self.status.value = value ? true : false
    }

    self.setKeys = function(keyPair){
        self.keyPair = keyPair
    }

    self.checkTransactionById = function(ids){
        var actions = checkTransactionById(ids)

        if(actions.length){
            self.loadUnspents()
        }
    }

    self.removeInputsFromTransaction = function(transaction){


        self.unspents.value = _.filter(self.unspents.value, (u) => {
            var intransaction = _.find(transaction.vin, (input) => {
                return u.txid == input.txid && u.vout == input.vout
            })

            if(!intransaction) return true
        })

    }

    self.addUnspentFromTransaction = function(transaction){

       
        var outs = _.map(transaction.vout, (out) => {
            return {
                address : deep(out, 'scriptPubKey.addresses.0'),
                amount : out.value,
                vout : out.n,
                height : transaction.height,
                scriptPubKey : deep(out, 'scriptPubKey.hex'),
                confirmations : Math.max(transaction.confirmations || (transaction.height && parent.app.platform.currentBlock ? parent.app.platform.currentBlock - transaction.height : 0), 0),
                pockettx : deep(transaction, 'vout.0.scriptPubKey.addresses.0') == "",
                coinbase : false,
                txid : transaction.txid
            }
        })
        

        var alladdresses = (parent.app.platform.sdk.addresses.storage.addresses || []).concat(self.address)

        outs = _.filter(outs, (out) => {
            if(!out.address) return false
            return _.find(alladdresses, (a) => {return a == out.address})
        })

        _.each(outs, (out) => {

            if (self.unspents.willChange){
                if (self.unspents.willChange.transaction == out.txid){
                    self.unspents.willChange = null
                }
            }

            self.unspents.value.push(out)
        })

        cleanOutputs()
    }
    


    self.isCurrentNetwork = function(){
        if(self.address.indexOf("T") == 0 &&  window.testpocketnet) return true
        if(self.address.indexOf("P") == 0 && !window.testpocketnet) return true

        return false
    }

    self.clear = function(){
    
        self.unspents = {
            willChange : null, /// date, wait free coins
            value : [],
            updated : null
        }

        self.actions.value = _.filter(self.actions, (a) => {
            if((a.completed && !a.keep) || a.rejected) return false

            return true
        })

        _.each(self.actions.value, (action) => {
            action.rejectedByUser()
        })
    
        /*self.actions = {
            value : [],
            updated : null
        }*/

        self.save()
    }

    self.export = function(){
        var e = {}

        e.status = _.clone(self.status)
        e.unspents = _.clone(self.unspents)
        e.waitUserAction = _.clone(self.waitUserAction)

        e.actions = {
            updated : self.actions.updated,
            value : []
        }

        _.each(self.actions.value, (action) => {

            //if( (!action.completed || !ActionOptions.clearCompleted) && (!action.rejected || !ActionOptions.clearRejected) ){
                e.actions.value.push(action.export())
            //}   
           
        })

        return e
    }

    self.import = function(e, flag){
        
        self.status = e.status

        if(e.unspents.updated && (self.unspents.updated || !self.unspents.updated)){
            if(!self.unspents.updated || (new Date(e.unspents.updated) > self.unspents.updated)){
                self.unspents = e.unspents
                self.unspents.updated = new Date(e.unspents.updated)
            }
        }

        e.actions.updated ? self.actions.updated = new Date(e.actions.updated) : null
        
        self.waitUserAction = e.waitUserAction || null

        if (self.unspents.willChange){
            self.unspents.willChange.until = new Date(self.unspents.willChange.until)
        }


        //self.actions.value = []


        _.each(e.actions.value, (exported) => {

            if (new Date(exported.until) < new Date()) return

            if ((exported.completed && !exported.keep) && self.emitted.completed[exported.id]){
                return
            }


            //withcompleted
            if ((flag != 'withcompleted' && (((exported.completed && !exported.keep) && ActionOptions.clearCompleted)) || 
            
            (exported.rejected && exported.rejected != 'actions_rejectedFromNodes' && exported.rejected != 'actions_checkFail' && exported.rejected != 'newAttempt' && !errorCodesAndActions[exported.rejected] && ActionOptions.clearRejected))
            
            ){

                _.each(self.emitted, (category) => {
                    if(exported.id && category[exported.id]){
                        delete category[exported.id]
                    }
                })

                return
            }

            try{

                var prevaction = _.find(self.actions.value, (a) => {
                    return a.id == exported.id
                })

                if (prevaction && prevaction.completed && !exported.completed) return


                var action = (prevaction || new Action(self, {}))
                    action.import(exported)


                if(!prevaction)
                    self.actions.value.push(action)
            }
            catch(e){
                console.error(e)
            }

            
        })

        if (self.waitUserAction){
            self.actionRejectedWithTriggers(self.waitUserAction.action, self.waitUserAction.error).catch(e => {

            })
        }
        else{

            if (waitUserActionComponent){
                waitUserActionComponent.destroy()
                waitUserActionComponent = null
            }

        }

    }

    self.signInput = function(txb, input, indexOfInput){

        if (input.address.indexOf("T") == 0 || input.address.indexOf("P") == 0) {

            var keyPair = parent.app.user.address.value != input.address ? self.keyPair : parent.app.user.keys()

            if(!keyPair) {
                throw 'unableSign:1'
            }

            txb.sign(indexOfInput, keyPair);

            return
        }

        if (input.type == 'htlc'){

            var keyPair = parent.app.user.address.value != input.address ? self.keyPair : parent.app.user.keys()

            if(!keyPair) {
                throw 'unableSign:2'
            }

            txb.sign({
                prevOutScript: Buffer.from(input.scriptPubKey, 'hex'),
                prevOutScriptType: 'htlc',
                vin: indexOfInput,
                keyPair
            });


            return
        }

        if (input.address.indexOf("Z") == 0 || input.address.indexOf("Y") == 0) {

            if (parent.app.user.address.value != self.address) {
                throw 'unableSign:3'
            }


            var index = _.indexOf(parent.app.platform.sdk.addresses.storage.addresses, input.address);

            if (index > -1) {

                var p2sh = parent.app.platform.sdk.addresses.storage.addressesobj[index];
                var dumped = parent.app.platform.sdk.address.dumpKeys(index)

                

                try{
                    txb.sign({
                        prevOutScriptType: 'p2sh-p2wpkh',
                        redeemScript : p2sh.redeem.output,
                        vin: indexOfInput,
                        keyPair : dumped,
                        witnessValue : Number((ActionOptions.amountC * input.amount).toFixed(0))
                    });
                }

                catch(e){
                    
                    throw 'unableSign:5'
                }

                
            }
            else{
                throw 'unableSign:4'
            }

            return
        }

    }

    self.updateUnspents = function(time){

        if(typeof time == 'undefined') time = 600

        if (temps.unspents){
            return temps.unspents
        }

        if (self.unspents.updated){

            var until = self.unspents.updated.addSeconds(time)

            if (until > new Date()){
                return Promise.resolve(self.unspents.value)
            }
        }

        return self.loadUnspents()

    }

    self.loadUnspents = function(){


        if(!self.isCurrentNetwork()){
            return Promise.reject('otherNetwork')
        }

        if (temps.unspents){
            return temps.unspents
        }

        var zAddresses = (self.address == app.user.address.value) ? (parent.app.platform.sdk.addresses.storage.addresses || []) : []

        var promise = parent.api.rpc('txunspent', [[self.address].concat(zAddresses), 1, 9999999]).then(unspents => {
            delete temps.unspents

            //// FIX NODE BUG:
            if(!unspents.length && self.unspents.value && self.unspents.value.length > 2 && (!self.unspents.buganswer || self.unspents.buganswer < 50)){

                self.unspents.buganswer || (self.unspents.buganswer = 0)
                self.unspents.buganswer ++

                return Promise.resolve(self.unspents.value)
            }

            delete self.unspents.buganswer

            checkTransactionByUnspents(unspents)

            self.unspents.value = unspents
            self.unspents.updated = new Date()
            self.unspents.height = app.platform.currentBlock || 0

            cleanOutputs()

            self.trigger()

            return Promise.resolve(unspents)

        }).catch(e => {
            console.error('action', e)
            delete temps.unspents
        })

        temps.unspents = promise

        return promise
        
    }

    self.ws = {
        transaction : function(transaction){


            //if(transaction.addr != self.address) return

            if (transaction.height < self.unspents.height) return

            parent.app.platform.sdk.node.transactions.get.tx(transaction.txid, (data, error = {}) => {

                self.addUnspentFromTransaction(data)
                self.removeInputsFromTransaction(data)

                checkTransactionById([transaction.txid])

                self.trigger()

            })


        },

        block : function(block){

            _.each(self.unspents.value, (u) => {

                if (block.difference > 0){
                    u.confirmations = u.confirmations + block.difference
                }
                else{
                    u.confirmations ++
                }

                
            })
        }
    }
    

    self.getActualUnspents = function(onlyReady, adresses){

        var unspents = self.unspents.value

        if (adresses) {

            if(!_.isArray(adresses)) adresses = [adresses]

            unspents = _.filter(unspents, (u) => {
                return _.indexOf(adresses, u.address) > -1
            })
        }

        

        return _.filter(unspents, (u) => {
            
            if(onlyReady && onlyReady != 'withUnconfirmed'){
                if(!checkUnspentReadyBlockChain(u)) return false
            }

            ///// TODO_CHECK

           /* if(onlyReady && onlyReady != 'withUnconfirmed'){
                if (u.amount < 0.0001){
                    return false
                }
            }*/
           
            var action = _.find(self.actions.value, (action) => {

                if(action.rejected || action.completed) return false

                var out = _.find(action.inputs, (inp) => {
                    return inp.txid == u.txid && inp.vout == u.vout
                })

                if (out){
                    return true
                }

            })

            if(!action) return true

        })
    }

    var  processing = null

    self.processing = async function(){


        if(processing) return

        self.checkWillChangeUnspents()

        if(self.waitUserAction) {
            return
        }

        if(!self.isCurrentNetwork()) return

        var sorted = _.sortBy(self.actions.value, (action) => {
            return action.priority
        })

        processing = processArray(sorted, (action) => {

            return action.processingWithIteractions().catch(e => {
                return Promise.resolve()
            })

        }).finally(() => {

            setTimeout(() => {
                processing = null
            }, 1000)
            
        })

        
    }

    self.checkAccountReadySend = function(account){
        if (self.status.value && self.unspents.value.length && self.isCurrentNetwork()){
            return true
        }
    }

    self.addAction = function(object, priority, p){
        var action = new Action(self, object, priority, p)
        
        if (action.options.collision){

            _.each(self.actions.value, (obj2) => {

                if(action.object.type != obj2.object.type) {
                    return
                }

                if(!obj2.transaction && !obj2.sent && !obj2.completed && (!obj2.rejected && !obj2.rejectWait)){
                    if(!action.options.collision(action, obj2)){
                        obj2.rejected = 'actions_collision'

                        /*if(action.options.collisionRemove && action.options.collisionRemove(action, obj2)){
                            action.rejected = 'actions_collision'
                        }*/

                        self.trigger()
                    }
                }
            })

        }

        self.actions.value.push(action)

        return action
    }

    self.prepareAction = function(object, priority){
        return new Action(self, object, priority)
    }

    self.getActions = function(type, filter){
        return _.map(_.filter(self.actions.value, (action) => {

            if(filter && !filter(action)) return false

            return !type || action.object.type == type
        }), (action) => {
            return action
        })
    }

    self.getTempActions = function(type, filter, clear){

        return _.map(self.getActions(type, (action) => {

            if(filter && !filter(action)) return false
            
            return (!action.completed || action.keep) && (!action.rejected || action.controlReject())
        }), (action) => {

            if(clear) return action

            return action.get()
        })
    }

    self.getTempUserInfo = function(){
        var actions = self.getTempActions('userInfo', null, true)

        if(!actions.length) return null

        return actions[0]
    }

    self.triggerGlobal = function(){
        parent.emit('change', {
            account : self
        })

        _.each(self.actions.value, (action) => {
            emitFilteredAction(action)
        })
    }   

    var emitFilteredAction = function(action){
        var status = action.rejected ? 'rejected' : (action.completed ? 'completed' : (action.transaction ? 'sent' : 'relay'))
        var estatus = (status == 'relay' || status == 'sent') ? 'relayorsent' : status


        if (status && action.id){
            

            if(!emitted[estatus][action.id]){

                parent.emit('actionFiltered', {
                    action,
                    address : self.address,
                    status
                })

                emitted[estatus][action.id] = true

                return true
            }
        }
    }

    self.save = function(){
        parent.save()
    }

    self.trigger = function(action){

        parent.emit('change', {
            action,
            account : self
        })

        if (action){
            parent.emit('action', {
                action,
                address : self.address
            })

            emitFilteredAction(action)
            
        }

        parent.save()

    }

    self.getStatus = function(){
        if (self.status.value) return 'registered'

        var userInfoTransactions = self.getActions('userInfo')

        var completed = _.filter(userInfoTransactions, (action) => {
            return action.completed
        })

        var processing = _.filter(userInfoTransactions, (action) => {
            return !action.completed && !action.rejected
        })

        if (completed.length) {
            return 'undefined_status'
        }

        if (processing.length){
            var pr = processing[0]

            if (pr.transaction){
                return 'in_progress_transaction'
            }

            if (self.unspents.value.length){
                return 'in_progress_hasUnspents'
            }
    
            if (self.unspents.willChange){
                return 'in_progress_wait_unspents'
            }

            return 'not_in_progress'
        }

        return 'not_in_progress_no_processing'

    }

    var unspentsAmount = function(unspents){
        return _.reduce(unspents, (m, unspent) => {
            return unspent.amount + m
        }, 0)
    }

    self.allAddresses = function(){
        var alladdresses = (parent.app.platform.sdk.addresses.storage.addresses || []).concat(self.address)

        return alladdresses
    }

    self.actualBalance = function(adresses){

        if(!adresses) adresses = [self.address]

        var balance = {
            total : 0,
            actual : 0,
            tempbalance : 0
        }


        //if(!self.unspents.value.length) return balance

        var tempbalance = _.reduce(self.actions.value, (m, action) => {

            if(action.completed || action.rejected) return m

            var validInput = true

            if( _.find(action.inputs, (i) => {

                if(! _.find(self.unspents.value, (u) => {
                    return u.txid == i.txid && u.vout == i.vout
                })) return true

            })) validInput = false


            if(!validInput) return m

            var toThisAddress = _.reduce(action.outputs, (m, output) => {
                
                
                if(_.find(adresses, (a) => {return a == output.address})){
                    return m + output.amount
                }

                return m

            }, 0)

            return m + toThisAddress

        }, 0)

        var totalUnspents = self.getActualUnspents(null, adresses)
        var unspents = self.getActualUnspents('withUnconfirmed', adresses)

        balance.total = Number((unspentsAmount(totalUnspents) + tempbalance).toFixed(8))

        balance.actual = Number((unspentsAmount(unspents) + tempbalance).toFixed(8))
        
        balance.tempbalance = Number((tempbalance + unspentsAmount(_.filter(unspents, (u) => {
            return !checkUnspentReadyBlockChain(u)
        } ))).toFixed(8))

      
        return balance
    }

    self.parent = parent
    self.getActionById = getActionById

    return self
}

var Actions = function(app, api, storage = localStorage){
    var self = this
     
    var key = 'actions_v0'

    var accounts = {}
    var events = {}
    var namedEvents = {}

    var data = {
        feerate : 0
    }

    var inited = false

    var processInterval = null
    
    
    var exports = function(){
        var e = {}

        _.each(accounts, (account, address) => {
            e[address] = account.export()
        })

        return e
    }

    var imports = function(value){

        accounts = {}

        _.each(value, (data, address) => {

            accounts[address] = new Account(address, self)
            accounts[address].import(data)
        })


    }

    var update = function(value){
        _.each(value, (data, address) => {

            if(!accounts[address]){
                accounts[address] = new Account(address, self)
            }
                
            accounts[address].import(data, 'withcompleted')
            accounts[address].triggerGlobal()
            
        })
    }

   
    var emit = function(key, data){
        _.each(events[key] || [], function(e){
            e(data)
        })

        _.each(namedEvents[key] || {}, function(e){

            e(data)
        })
    }

    self.clbk = function(key, name, f){
        if(!namedEvents[key]){
            namedEvents[key] = {}
        }

        if(f){
            namedEvents[key][name] = f
        }
        else{
            if (namedEvents[key][name])
                delete namedEvents[key][name]
        }
        
    }

    self.on = function(key, f){
        if(!events[key]){
            events[key] = []
        }

        events[key].push(f)
    }

    self.off = function(key, f){
        if(!events[key]){
            events[key] = []
        }

        events[key] = _.filter(events[key], function(k){
            return k != f
        })
    }

    self.txStorage = {}

    self.saveTxToStorage = function(hash, tx){
        self.txStorage[hash] = tx
    }

    self.estimateFee = function(){

        if (data.feerate){
            return Promise.resolve(data.feerate)
        }

        data.feerate = 0.00001

        return api.rpc('estimateSmartFee', [1]).catch(e => {
            return Promise.resolve({})
        }).then(d => {

            data.feerate = Math.max(d.feerate || 0.00001, 0.00001)

            

            return Promise.resolve(data.feerate)
        })
    }

    self.ws = {
        transaction : function(transaction){
            _.each(accounts, (account) => {
                account.ws.transaction(transaction)
            })
        },
        block : function(block){
            _.each(accounts, (account) => {
                account.ws.block(block)
            })
        }
    }

    self.processing = function(){

        _.each(accounts, (account) => {
            account.processing()
        })

    } 

    self.addAction = function(address, object, priority, p = {}){

    
        if(!address) return Promise.reject('address')
        if(!object) return Promise.reject('object')

        var account = self.addAccount(address)

        var action = account.addAction(object, priority, p)

        self.save()

        return action
    }

    self.addActionAndSendIfCan = function(object, priority, address, p = {}){

        if(!address){
            address = app.user.address.value
        }

        if(!address) {
            return Promise.reject('actions_address')
        }
        

        var action = self.addAction(address, object, priority, p)

        if (accounts[address].checkAccountReadySend()){

            ////processing

            return action.processingWithIteractions(true).then(() => {
                return Promise.resolve(action)
            }).catch(e => {

                if (p.rejectIfError && !action.rejected){
                    action.rejected = 'cantsendnow'
                    return Promise.reject(e)
                }
                
                if (action.rejected){
                    return Promise.reject(e)
                }

                return Promise.resolve(action)

                if(e == 'actions_checkFail' /*|| errorCodesAndActions[e]*/) return Promise.resolve(action)

                return Promise.reject(e)

            })
        }
        else{
            return Promise.resolve(action)
        }
    }

    self.cancelAction = function(address, actionId){
        if(!address) return Promise.reject('actions_noAddress')
        if(!actionId) return Promise.reject('actions_actionId')

        if (accounts[address]){
            return accounts[address].cancelAction(actionId)
        }

        else{
            return Promise.reject('actions_noAccount')
        }
    }

    self.addAccount = function(address){

        if(!accounts[address]){
            accounts[address] = new Account(address, self)
        }

        return accounts[address] 
    }

    self.getCurrentAccount = function(){
        if (app.user && app.user.address && app.user.address.value){
            return accounts[app.user.address.value] || undefined
        }
    }


    self.save = function(){
        try{
            storage[key] = JSON.stringify(exports())
        }
        catch(e){
        }
    }

    self.load = function(){
        try{
            imports(JSON.parse(storage[key] || "{}"))
        }
        catch(e){
        }
    }

    self.getActionById = function(id){
        var action = null

        _.find(accounts, (account) => {
            var _a = account.getActionById(id)

            if (_a){
                action = _a
                return true
            }
        })

        return action
    }

    self.getActionsByApp = function(application){
        var actions = []

        var account = self.getCurrentAccount()

        if(!account) return actions

        _.each(account.actions.value, (a) => {
            if(a.settings.application == application) actions.push(a)
        })

        return actions
    }

    

    self.init = function(){

        if(!inited){
            inited = true

            self.load()

            app.platform.sdk.syncStorage.on('change', key, function(e){

                if(e.newValue == e.oldValue) return

                try{
                    update(JSON.parse(e.newValue || "{}"))
                }
                catch(e){
                }

            });

            self.processing()

            var rif = null

            if(processInterval){
                clearInterval(processInterval)
            }
    
            processInterval = setInterval(() => {

                self.processing()

                return

                if (rif){
                    window.cancelAnimationFrame(rif)
                }
                

                rif = window.requestAnimationFrame(() => {

                    rif = null

                    self.processing()
                })
                
            }, 3000)

            window.addEventListener('beforeunload', () => {
                _.each(accounts, (account) => {
                    account.clearThisWaitUserAction()
                })
            })
        }

        
    }


    //// for satolist
    self.prepare = function(clbk){
        self.init()

        if(clbk) clbk()
    }

    self.destroy = function(){
        events = {}
        accounts = {}

        if(processInterval){
            clearInterval(processInterval)
        }

        processInterval = null

        inited = false
    }

    self.getAccounts = function(){
        return accounts
    }

    self.api = api
    self.app = app
    self.emit = emit
    
    return self
}

if(typeof module != "undefined"){ module.exports = {Actions, Account, Action}; } 
else { window.Actions = Actions; window.Account = Account; window.Action = Action;}