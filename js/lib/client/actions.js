var ActionOptions = {
    pcTxFee : 1 / 100000000,
    amountC : 100000000,
    clearRejected : true,
    clearCompleted : true,
    objects : {
        transaction : {
            calculateFee : true,
            rejectedAsk : true,
            donotexport : true,
            amount : function(action){
                return _.reduce(action.object.reciever.v, (m, dn) => {
                    return m + dn.amount
                }, 0)
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
        userInfo : {

            change : function(action, account){

                if (action.transaction){
                    //account.willChange = true
                }

                if (action.complete){
                    //account.willChange = false
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
            amount : function(action){
                return action.object.amount.v
            },

            destination : function(action){
                return []
            }
        },

        comment : {
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

            calculateFee : true
        },
    }
}

var Action = function(account, object, priority){

    var options = ActionOptions.objects[object.type] || {}
        
    var self = this

    self.object = object
    self.priority = priority || options.priority || 3
    self.added = new Date()
    self.until = (new Date()).addSeconds(60 * 60 * 12)

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

        options = ActionOptions.objects[object.type] || {}

    }

    var getBestInputs = function(unspents, value){

        if(value == 0) value = 0.000000001

        var added = 0

        return _.filter(_.sortBy(unspents, (u) => {

            return Math.abs(u.amount - value)

        }), (u) => {
            if (added < value){

                added += u.amount
                return true
            }
            
        })
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
        var fee = calculatedFee || (options.calculateFee ? 0 : ActionOptions.pcTxFee)
    
        var changeAddresses = options.addresses ? options.addresses(self, account) : [account.address]

        if(!changeAddresses.length) changeAddresses = [account.address]


        if(!unspents.length || retry){
            try{
                await account.loadUnspents().then((clearUnspents) => {

                    if(!clearUnspents.length && !account.unspents.willChange){
                        return Promise.reject('actions_noinputs')
                    }

                    clearUnspents = filterUnspents(clearUnspents)

                    if(!clearUnspents.length && !account.unspents.willChange){
                        return Promise.reject('actions_noinputs_on_address')
                    }
    
                    unspents = account.getActualUnspents(true)
        
                })
            }
            catch(e){
                return Promise.reject(e)
            }
            
        }

        

        //options.addresses ? options.addresses() : null


        if(!unspents.length){
            return Promise.reject('actions_noinputs_wait')
        }

        var amount = (options.amount ? options.amount(self) : 0) + (options.feemode && options.feemode(self, account) == 'include' ? 0 : fee)

        var inputs = getBestInputs(unspents, amount)


        var totalInputAmount = _.reduce(inputs, (m, u) => {
            return m + u.amount
        }, 0) - fee

        if (totalInputAmount <= 0) return Promise.reject('actions_totalAmountZero')

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

            if(unspents.length < 50){

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
                amount : totalInputAmount - totalOutputAmount
            })
        }

        var tx = null
        
        try{
            tx = buildTransaction({inputs, outputs, opreturnData})
        }
        catch(e){
            console.error(e)
            return Promise.reject(e)
        }


        
        if (options.calculateFee && !calculatedFee){
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

        return account.parent.api.rpc(method, parameters).then(transaction => {

            self.transaction = transaction
            
            self.checkConfirmationUntil = (new Date()).addSeconds(35)

            delete self.sending

            self.sent = new Date()

            trigger()

            return Promise.resolve()


        }).catch((e = {}) => {

            delete self.inputs
            delete self.outputs
            delete self.sending

            trigger()

            var code = e.code

            if(!retry && (code == -26 || code == -25 || code == 16 || code == 261)){
                return makeTransaction(true, calculatedFee, send)
            }

            if (options.rejectedAsk){

            }

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

                    console.log("CHECK", data)

                    if (error.code == -5 || error.code == -8){ /// check codes (transaction not apply, resend action)
                        self.sent = null
                        self.transaction = null

                        self.attempts || (self.attempts = 0)
                        self.attempts ++ 

                        if (self.attempts > 2){
                            self.rejected = 'actions_rejectedFromNodes'

                            if(options.change) options.change(self, account)

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

        if (self.object.canSend){

            if (self.checkedUntil && self.checkedUntil > new Date()){
                return Promise.reject('actions_alreadyCheck')
            }

            self.checkedUntil = (new Date()).addSeconds(45)

            return new Promise((resolve, reject) => {
                self.object.canSend(app, (r) => {

                    self.checkedUntil = null

                    if(r){
                        makeTransaction(false, null, true).then(resolve).catch(reject)
                    }
                    else{
                        reject('actions_checkFail')
                    }
    
                })
            })

        }

        return makeTransaction(false, null, true)

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

        if(!alias.txid) { alias.txid = self.id; alias.relay = true }
        if (alias.txid && !self.completed && !self.rejected) { alias.temp = true }

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

            if (self.unspents.willChange){
                if (self.unspents.willChange.transaction == out.txid){
                    self.unspents.willChange = null
                }
            }
        })

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

                if(action.change) action.change(action, self)

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


    self.setWaitCoins = function(value){
        self.unspents.willChange = value ? true : false
    }

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

    var cleanOutputs = function(){
        self.unspents.value = _.uniq(self.unspents.value, (v) => {
            return v.txid + ";" + v.vout
        })
    }

    self.setWaitCoins = function(transaction){
        self.unspents.willChange = {
            transaction,
            until : (new Date()).addSeconds(60)
        }

        self.unspents.value.push(transaction)
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

        _.each(e.actions.value, (exported) => {

            if (exported.until < new Date()) return


            //withcompleted
            if (flag != 'withcompleted' && ((exported.completed && ActionOptions.clearCompleted) || (exported.rejected && ActionOptions.clearRejected))){

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
                console.log('exported', exported)
                console.error(e)
            }

            
        })

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

    self.updateUnspents = function(){

        if (temps.unspents){
            return temps.unspents
        }

        if (self.unspents.updated){
            var until = self.unspents.updated.addSeconds(600)

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

            if(onlyReady && onlyReady != 'withUnconfirmed'){
                if (u.amount < 0.0001){
                    return false
                }
            }
           
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

    self.processing = async function(){

        if(!self.isCurrentNetwork()) return

        var sorted = _.sortBy(self.actions.value, (action) => {
            return action.priority
        })

        for(let index in sorted){

            var action = sorted[index]

            try{
                await action.processing()
            }
            catch(e){

                if(e != 'completed' && e != 'rejected') console.error(e)
            }

        }
        
    }

    self.checkAccountReadySend = function(account){
        if (self.status.value && self.unspents.value.length && self.isCurrentNetwork()){
            return true
        }
    }

    self.addAction = function(object, priority){
        var action = new Action(self, object, priority)
        
        if (action.options.collision){

            _.each(self.actions.value, (obj2) => {

                if(!obj2.transaction && !obj2.sent && !obj2.completed){
                    if(!action.options.collision(action, obj2)){
                        obj2.rejected = 'actions_collision'
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

    self.getTempActions = function(type, filter){

        return _.map(self.getActions(type, (action) => {

            if(filter && !filter(action)) return false
            
            return !action.completed && !action.rejected
        }), (action) => {
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

    self.addAction = function(address, object /* object/alias? */, priority){

        /*if(object.export){
            var copy = object.export(true)

            if (kits.c[copy.type]){
                var al = new kits.c[copy.type]()
                    al.import(copy)

                object = al
            }
        }*/

        if(!address) return Promise.reject('address')
        if(!object) return Promise.reject('object')

        var account = self.addAccount(address)

        var action = account.addAction(object, priority)

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

        var action = self.addAction(address, object, priority)

        if (accounts[address].checkAccountReadySend()){

            return action.makeTransaction(null, p.calculateFee || null, true).then(() => {
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
                    console.error(e)
                }

                

            });

            self.processing()

            processInterval = setInterval(() => {
                self.processing()
            }, 3000)
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