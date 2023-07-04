var ActionOptions = {
    pcTxFee : 1 / 100000000,
    amountC : 100000000,
    clearRejected : true,
    clearCompleted : true,
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

         
        },
        upvoteShare : {
            collision : function(obj, obj2){

                if (obj.object.type == obj2.object.type && obj2.object.share.v == obj.object.share.v){
                    if(!obj2.sent){
                        if(obj2.added < obj.added) return false
                    }
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
            priority : 2
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
            }
        },
    }
}

var errorCodesAndActionsExecutors = {
    wait : function(action){

    },

    limit : function(action){

    }
}

var errorCodesAndActions = {
    '1'  : errorCodesAndActionsExecutors.wait,
    '2'  : errorCodesAndActionsExecutors.limit,
    '3'  : errorCodesAndActionsExecutors.limit,
    '15' : errorCodesAndActionsExecutors.limit,
    '26' : errorCodesAndActionsExecutors.limit,
    '29' : errorCodesAndActionsExecutors.limit,
    '30' : errorCodesAndActionsExecutors.limit,
    '31' : errorCodesAndActionsExecutors.limit,
    '49' : errorCodesAndActionsExecutors.limit,
    '61' : errorCodesAndActionsExecutors.limit,
    '65' : errorCodesAndActionsExecutors.limit,
    '18' : errorCodesAndActionsExecutors.wait
}

var Action = function(account, object, priority, settings){

    var options = ActionOptions.objects[object.type] || {}

    var self = this

    self.object = object
    self.priority = priority || options.priority || 3
    self.added = new Date()
    self.until = (new Date()).addSeconds(60 * 60 * 12)
    self.settings = settings || {}

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

    self.id = makeid()

    self.export = function(){
        var e = {}

        e.id = self.id

        e.priority = self.priority
        e.added = self.added
        e.until = self.until
        e.sent = self.sent
        e.sending = self.sending
        e.checkedUntil = self.checkedUntil
        e.checkConfirmationUntil = self.checkConfirmationUntil
        e.inputs = _.clone(self.inputs)
        e.outputs = _.clone(self.outputs)
        e.attempts = self.attempts
        e.transaction = self.transaction
        e.settings = self.settings

        e.rejected = self.rejected
        e.completed = self.completed

        if (self.object.export){
            e.expObject = self.object.export(true)
        }
        else{
            e.object = _.clone(self.object)
        }

        return e
    }

    self.import = function(e){
        self.priority = e.priority

        if (e.added)
            self.added = new Date(e.added)

        if (e.until)
            self.until = new Date(e.until)

        if (e.sent)
            self.sent = new Date(e.sent)

        if (e.sending)
            self.sending = new Date(e.sending)

        if (e.checkedUntil)
            self.checkedUntil = new Date(e.checkedUntil)

        self.id = e.id || makeid()

        self.checkConfirmationUntil = e.checkConfirmationUntil
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
    }

    var getBestInputs = function(unspents, value){

        if(value == 0) value = 0.000000001

        var added = 0
        var addedUnspents = {}

        while (added < value && unspents.length){
            var diff = value - added

            var iterationUnspents = _.first(_.sortBy(unspents, (u) => {

                return Math.abs(u.amount - diff)
    
            }), 5)

            var unspent = iterationUnspents[rand(0, iterationUnspents.length - 1)]

            addedUnspents[unspent.txid + ':' + unspent.vout] = unspent
            added += unspent.amount

            unspents = _.filter(unspents, (unspent) => {
                return !addedUnspents[unspent.txid + ':' + unspent.vout]
            })
        }


        return _.toArray(addedUnspents)

        /*return _.filter(_.sortBy(unspents, (u) => {

            return Math.abs(u.amount - value)

        }), (u) => {
            if (added < value){

                added += u.amount
                return true
            }
            
        })*/
    }

    var buildTransaction = function({inputs, outputs, opreturnData}){
        var txb = new bitcoin.TransactionBuilder();

        txb.addNTime(account.parent.app.platform.timeDifference || 0)

        _.each(inputs, (input, index) => {
            txb.addInput(input.txid, input.vout, null, Buffer.from(input.scriptPubKey, 'hex'))
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

    var trigger = function(){
        
        //if(options.change) options.change(action, account)

        account.trigger(self)

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

        var unspents = filterUnspents(account.getActualUnspents(true))
        var fee = calculatedFee || ((options.calculateFee && options.calculateFee(self)) ? 0 : ActionOptions.pcTxFee)
    
        var changeAddresses = options.addresses ? options.addresses(self, account) : [account.address]

        if(!changeAddresses.length) changeAddresses = [account.address]

        
        

        if(!unspents.length || retry){
            try{
                await account.updateUnspents(retry ? 0 : 60).then((clearUnspents) => {

                    clearUnspents = filterUnspents(clearUnspents)

                    if(!clearUnspents.length && !account.unspents.willChange){
                        return Promise.reject('actions_noinputs')
                    }
    
                    unspents = account.getActualUnspents(true)

        
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

        if(!options.burn){
            amount += (options.feemode && options.feemode(self, account) == 'include' ? 0 : fee)
        }

        var inputs = getBestInputs(unspents, amount)


        var totalInputAmount = _.reduce(inputs, (m, u) => {
            return m + u.amount
        }, 0) - fee

        if (totalInputAmount <= 0) {
            
            return Promise.reject('actions_totalAmountZero')
        }

        var outputs = []

        var optype = null
        var optstype = null
        var opreturnData = null
        var method = 'sendrawtransaction'

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

            if(unspents.length < 50 && totalInputAmount > 0.001){

                var divi = totalInputAmount / 2

                outputs.push({
                    address : changeAddresses[0],
                    amount : divi
                })
                
                outputs.push({
                    address : changeAddresses[0],
                    amount : totalInputAmount - divi
                })
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
                out.amount = out.amount - dfee
            })
        }

        //(options.feemode && options.feemode(self, account) == 'include' ? 0 : fee)

        var totalOutputAmount = _.reduce(outputs, (m, u) => {
            return m + u.amount
        }, 0)

        if (totalOutputAmount < totalInputAmount){

            outputs.push({
                address : changeAddresses[0],
                amount : totalInputAmount - totalOutputAmount - (options.burn ? amount : 0)
            })

            
        }

        var tx = null
        
        try{
            tx = buildTransaction({inputs, outputs, opreturnData})
        }
        catch(e){
            //console.error(e)
            return Promise.reject(e)
        }

        
        if ((options.calculateFee && options.calculateFee(self)) && !calculatedFee){
            var feerate = await account.parent.estimateFee()

            return makeTransaction(false, Math.min(tx.virtualSize() * feerate, 0.0999), send)
        }

        var hex = tx.toHex();

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
        self.inputs = inputs
        self.outputs = outputs
        ///sendrawtransaction

        trigger()

        /*return new Promise((resolve, reject) => {
            setTimeout(() => {
                delete self.inputs
                delete self.outputs
                delete self.sending
                self.rejected = 'actions_rejected_disabled'
        
                trigger()
        
        
                reject(self.rejected)
            }, 1300)
        })*/

        

        return account.parent.api.rpc(method, parameters).then(transaction => {

            self.transaction = transaction

            self.checkConfirmationUntil = (new Date()).addSeconds(35)

            delete self.sending

            self.sent = new Date()

            trigger()

            return Promise.resolve()


        }).catch((e = {}) => {

            var code = e.code

            delete self.inputs
            delete self.outputs
            delete self.sending

            trigger()

            if(!retry && (code == -26 || code == -25 || code == 16 || code == 261)){
                
                return makeTransaction(true, calculatedFee, send)
            }

            /*if (options.rejectedAsk){

            }*/

            console.error(e)

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

                account.parent.app.platform.sdk.node.transactions.get.tx(self.transaction, (data, error = {}) => {

                    data || (data = {})

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

                })

            })
        })
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

    self.processing = async function(){

        if (self.completed){
            return Promise.reject('actions_completed')
        }

        if (self.rejected){
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

        if (self.sending && (new Date()).addSeconds(-65) < self.sending){
            return Promise.reject('actions_alreadySending')
        }

        if (!account.status.value){
            if(!options.sendWithNullStatus) {
                return Promise.reject('actions_waitUserStatus')
            }
        }

        if (self.until < new Date()){
            self.rejected = 'actions_rejectedByTime'

            return Promise.reject(self.rejected)

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

        if (self.object.canSend){

            if (self.checkedUntil && self.checkedUntil > new Date()){
                return Promise.reject('actions_alreadyCheck')
            }

            self.checkedUntil = (new Date()).addSeconds(45)

            return new Promise((resolve, reject) => {
                self.object.canSend(app, (r) => {

                    self.checkedUntil = null

                    if(r){
                        makeTransaction(false, (self.settings || {}).calculateFee || null, true).then(resolve).catch(reject)
                    }
                    else{
                        reject('actions_checkFail')
                    }
    
                })
            })

        }

        return makeTransaction(false, (self.settings || {}).calculateFee || null, true)

    }

    self.processingWithIteractions = async function(rejectIfError){

        var error = null
        var tryresolve = false

        try{
            await self.processing()
        }
        catch(e){

            console.error(e)

            if (
                e == 'actions_rejectedFromNodes' || 
                e == 'actions_noinputs' || 
                (self.options.attentionIfReJectCodes && _.indexOf(self.options.attentionIfReJectCodes, e) > -1)
                ){
                    tryresolve = true
                
            }

            self.currentState = e

            error = e
            
        }

        if (error && tryresolve){
            error = await account.actionRejectedWithTriggers(self, error)
        }
        else{

            if(rejectIfError){
                if(error == 'actions_noinputs_wait' || error == 'actions_userInteractive' || error == 'actions_waitUserInteractive' || error == 'actions_waitUserStatus'){

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

        alias.time = new Date()
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


        return alias
    }

    self.options = options
    self.makeTransaction = makeTransaction

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
        updated : null
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

        if (u.confirmations == 0 && !u.coinbase && !u.coinstake) {

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

            if (action.type == 'userInfo' && self.getStatus() != 'registered'){
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
                    console.error("!action.sent || !action.transaction", action)
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
                        console.error(e)
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

        if(action.options.attentionIfReJectCodes && _.indexOf(action.options.attentionIfReJectCodes, error) > -1){
            
            if (action.type == 'userInfo' && error == 18){

                action.rejected = 'actions_rejectedFromNodes'
                //// ask change user name

                return await self.userInteractive(action, error, 'changeUserName', {}).then(() => {
                    //// new action instead
                    action.rejectedByUser()
                }).catch(e => {

                    if (e == 'actions_rejectedByUser'){
                        action.rejectedByUser()
                    }

                    else{
                        action.checkInAnotherSession = true
                    }
                    

                })

            }
        }

        

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

            return self.ui.edituserinfo(type, (component) => {

                waitUserActionComponent = component

            }).then(newaction => {
                return Promise.resolve(newaction)
            }).catch(e => {
                
                if (self.getStatus() != 'registered'){
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

            console.error("E", e)

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
            console.error(e)

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
                pockettx : deep(transaction, 'vout.0.addresses.0') == "",
                coinbase : false,
                txid : transaction.txid
            }
        })

        outs = _.filter(outs, (out) => {
            return out.address && out.address == self.address
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
        self.unspents = e.unspents
        
        self.unspents.updated ? self.unspents.updated = new Date(self.unspents.updated) : null
        self.actions.updated ? self.actions.updated = new Date(e.actions.updated) : null

        self.actions.value = []
        self.waitUserAction = e.waitUserAction || null

        if (self.unspents.willChange){
            self.unspents.willChange.until = new Date(self.unspents.willChange.until)
        }

        _.each(e.actions.value, (exported) => {

            if (exported.until < new Date()) return


            //withcompleted
            if (flag != 'withcompleted' && ((exported.completed && ActionOptions.clearCompleted) || 
            
            (exported.rejected && exported.rejected != 'actions_rejectedFromNodes' && exported.rejected != 'newAttempt' && !errorCodesAndActions[exported.rejected] && ActionOptions.clearRejected))
            
            ){

                _.each(self.emitted, (category) => {
                    if(exported.id && category[exported.id]){
                        delete category[exported.id]
                    }
                })

                return
            }

            try{
                var action = new Action(self, {})
                    action.import(exported)


                self.actions.value.push(action)
            }
            catch(e){
                //console.log('exported', exported)
                //console.error(e)
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
                throw 'unableSign'
            }

            txb.sign(indexOfInput, keyPair);

            return
        }

        if (input.type == 'htlc'){

            var keyPair = parent.app.user.address.value != input.address ? self.keyPair : parent.app.user.keys()

            if(!keyPair) {
                throw 'unableSign'
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
                throw 'unableSign'
            }


            var index = _.indexOf(parent.app.platform.sdk.addresses.storage.addresses, i.address);

            if (index > -1) {

                var p2sh = parent.app.platform.sdk.addresses.storage.addressesobj[index];
                var dumped = parent.app.platform.sdk.address.dumpKeys(index)

                txb.sign({
                    prevOutScriptType: 'p2sh-p2wpkh',
                    redeemScript : p2sh.redeem.output,
                    vin: indexOfInput,
                    keyPair : dumped,
                    witnessValue : Number((k * i.amount).toFixed(0))
                });
            }
            else{
                throw 'unableSign'
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

            checkTransactionByUnspents(unspents)

            self.unspents.value = unspents
            self.unspents.updated = new Date()

            cleanOutputs()

            delete temps.unspents

            self.trigger()

            return Promise.resolve(unspents)
        })

        temps.unspents = promise

        return promise
        
    }

    self.ws = {
        transaction : function(transaction){

            if(transaction.addr != self.address) return

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
            processing = null
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

                if(!obj2.transaction && !obj2.sent && !obj2.completed && !obj2.rejected){
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
            
            return !action.completed && !action.rejected
        }), (action) => {

            if(clear) return action

            return action.get()
        })
    }

    self.getTempUserInfo = function(){
        var actions = self.getTempActions('userInfo')

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
        }

        if (self.unspents.value.length){
            return 'in_progress_hasUnspents'
        }

        if (self.unspents.willChange){
            return 'in_progress_wait_unspents'
        }

        return 'not_in_progress'

    }

    var unspentsAmount = function(unspents){
        return _.reduce(unspents, (m, unspent) => {
            return unspent.amount + m
        }, 0)
    }

    self.actualBalance = function(adresses){


        var balance = {
            total : 0,
            actual : 0,
            tempbalance : 0
        }

        if(!self.unspents.value.length) return balance

        var tempbalance = _.reduce(self.actions.value, (m, action) => {

            if(action.completed || action.rejected) return m

            var toThisAddress = _.reduce(action.outputs, (m, output) => {
                
                if(output.address == self.address){
                    return m + output.amount
                }

                return m

            }, 0)

            return m + toThisAddress

        }, 0)

        var totalUnspents = self.getActualUnspents(null, adresses)
        var unspents = self.getActualUnspents('withUnconfirmed', adresses)

        balance.total = unspentsAmount(totalUnspents) + tempbalance

        balance.actual = unspentsAmount(unspents) + tempbalance
        
        balance.tempbalance = tempbalance + unspentsAmount(_.filter(unspents, (u) => {
            return !checkUnspentReadyBlockChain(u)
        } ))

      
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

        if(accounts[address]){
            accounts[address].cancelAction(actionId)
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
                    //console.error(e)
                }

            });

            self.processing()

            var rif = null

            processInterval = setInterval(() => {

                if (rif){
                    cancelAnimationFrame(rif)
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