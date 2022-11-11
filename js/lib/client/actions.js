var ActionOptions = {
    pcTxFee : 1,
    amountC : 100000000,
    objects : {
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

            changeAccount : function(action, account){

                if (action.transaction){
                    account.willChange = true
                }

                if (action.complete){
                    account.willChange = false
                    account.status = true
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

        contentBoost : {
            amount : function(obj){
                return obj.object.amount.v
            },

            destination : function(obj){
                return []
            }
        },

        comment : {
            destination : function(obj){
                return obj.object.donate.v
            },
            amount : function(obj){
                return _.reduce(obj.object.donate.v, (m, dn) => {
                    return m + dn.amount
                }, 0)
            },

            calculateFee : true
        },
    }
}

Action = function(account, object, priority){

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

        txb.addNTime(account.actions.app.platform.timeDifference || 0)

        _.each(inputs, (i, index) => {
            txb.addInput(input.txid, input.vout, null, Buffer.from(input.scriptPubKey, 'hex'))

            account.signInput(txb, input, index)
        })

        if(opreturnData){

            var embed = bitcoin.payments.embed({ data: opreturnData });
            txb.addOutput(embed.output, 0);

        }

        _.each(outputs, (out) => {
            txb.addOutput(out.address, Math.round(out.amount));
        })


        var tx = txb.build()
        
        return tx
    }

    var sendTransaction = async function(retry, calculatedFee){

        var unspents = account.getReadyUnspents()
        var fee = calculatedFee || (options.calculateFee ? 0 : ActionOptions.pcTxFee)
        
        if(!unspents.length || retry){
            try{
                await account.loadUnspents().then((clearUnspents) => {

                    if(!clearUnspents.length && !account.unspents.willChange){
                        return Promise.reject('noinputs')
                    }
    
                    unspents = account.getReadyUnspents()
        
                })
            }
            catch(e){
                return Promise.reject(e)
            }
            
        }

        if(!unspents.length){
            return Promise.reject('noinputs_wait')
        }

        var amount = options.amount ? options.amount(self) : 0

        var inputs = getBestInputs(unspents, amount)

        var totalInputAmount = _.reduce(inputs, (m, u) => {
            return m + u.amount
        }, 0) - fee

        if (totalInputAmount <= 0) return Promise.reject('totalAmountZero')

        var outputs = []

        var optype = null
        var optstype = null
        var opreturnData = null

        //////////////

        if (self.object.serialize){
            var data = Buffer.from(bitcoin.crypto.hash256(self.object.serialize()), 'utf8');

            optype = self.object.typeop ? self.object.typeop() : self.object.type
            optstype = self.object.optstype && self.object.optstype() ? self.object.optstype() : optype
            opreturnData = [Buffer.from(optype, 'utf8'), data];

            if (self.object.opreturn) {
                opreturnData.push(Buffer.from(self.object.opreturn()))
            }
        }

        if (options.destination){
            _.each(options.destination(), (d) => {
                outputs.push(_.clone(d))
            })
        }
        else{

            if(unspents.length < 50){

                var divi = totalInputAmount / 2

                outputs.push({
                    address : account.address,
                    amount : divi
                })
                
                outputs.push({
                    address : account.address,
                    amount : totalInputAmount - divi
                })
            }
            else{
                outputs.push({
                    address : account.address,
                    amount : totalInputAmount
                })
            }
            
        }

        var totalOutputAmount = _.reduce(outputs, (m, u) => {
            return m + u.amount
        }, 0)

        if (totalOutputAmount < totalInputAmount){
            outputs.push({
                address : account.address,
                amount : totalInputAmount - totalOutputAmount
            })
        }

        var tx = null
        
        try{
            tx = buildTransaction({inputs, outputs, opreturnData})
        }
        catch(e){
            return Promise.reject(e)
        }
        
        if (options.calculateFee && !calculatedFee){
            var feerate = await account.actions.estimateFee()

            return sendTransaction(false, Math.min(tx.virtualSize() * feerate, 0.0999))
        }

        var hex = tx.toHex();

        var parameters = [hex]

        if (self.object.export){
            parameters.push(obj.export())
        }

        if (optstype){
            parameters.push(optstype)
        }

        self.sent = true

        return self.app.api.rpc('sendrawtransactionwithmessage', parameters).then(transaction => {

            self.transaction = transaction
            self.inputs = inputs
            self.outputs = outputs

            var alias = null

            if (self.object.export){
                
                alias = self.object.export(true)
                alias.txid = transaction;
                alias.address = account.address;
                alias.type = self.object.type
                alias.time = account.actions.app.platform.currentTime()
                alias.timeUpd = alias.time
                alias.optype = optype
                alias.temp = true
                
            }

        }).catch((e = {}) => {

            var code = e.code

            if(!retry && (code == -26 || code == -25 || code == 16)){
                return sendTransaction(true, calculatedFee)
            }

            self.rejected = e

            return Promise.reject(self.rejected)
            
        })
       
    }

    var checkTransaction = function(){

        return new Promise((resolve, reject) => {

            account.actions.app.platform.sdk.node.transactions.get.tx(self.transaction, (data = {}, error = {}) => {

                if (error.code == -5 || error.code == -8){ /// check codes (transaction not apply, resend action)
                    self.sent = null
                    self.transaction = null

                    self.attempts || (self.attempts = 0)
                    self.attempts ++ 

                    if (self.attempts > 2){
                        self.rejected = 'rejectedFromNodes'

                        return reject(self.rejected)
                    }

                    return reject('newAttempt')
                }

                if (data.height > 0){
                    self.completed = true

                    return resolve()

                }

                return reject('waitConfirmation')


            })
        })
    }

    self.processing = async function(){

        if (self.completed){
            return Promise.reject('completed')
        }

        if (self.rejected){
            return Promise.reject(self.rejected)
        }

        if (self.transaction){
            
            /// temps/wait confirmation

            if (self.checkConfirmationUntil && self.checkConfirmationUntil < new Date()){
                return Promise.reject('alreadyCheckConfirmation')
            }

            self.checkConfirmationUntil = (new Date()).addSeconds(65)

            return checkTransaction()
        }

        if (self.sent){
            return Promise.reject('alreadySent')
        }

        if (!account.status.value){
            if(!options.sendWithNullStatus) {
                return Promise.reject('waitUserStatus')
            }
        }

        if (self.until > new Date()){
            self.rejected = 'rejectedByTime'

            return reject(self.rejected)

        }

        if (self.object.checkloaded && self.object.checkloaded()){
            return Promise.reject('resourses')
        }

        if (self.object.canSend){

            if (self.checkedUntil && self.checkedUntil < new Date()){
                return Promise.reject('alreadyCheck')
            }

            self.checkedUntil = (new Date()).addSeconds(45)

            return new Promise((resolve, reject) => {
                self.object.canSend(app, (r) => {

                    if(r){
                        sendTransaction().then(resolve).catch(reject)
                    }
                    else{
                        reject('checkFail')
                    }
    
                })
            })

        }

        return sendTransaction()

    }

    self.options = options

    return self
}

Account = function(address, actions){
    var self = this

    self.address = address

    self.status = {
        value : null,
        updated : null,
        willChange : false
    }

    self.unspents = {
        willChange : false, /// date, wait free coins
        value : [],
        updated : null
    }

    self.actions = {
        value : [],
        updated : null
    }

    var temps = {
        unspents : null
    }

    var checkTransactionByUnspents = function(){

        //var changed = false

        _.each(self.unspents.value, (u) => {
            var action = _.find(self.actions.value, (action) => {

                var out = _.find(action.outputs, (out) => {
                    return out.txid == u.txid && out.vout == u.vout
                })

                if (out){
                    return true
                }

            })

            if (action){
                action.completed = true

                changed = true

                actions.emit('changeAction', action)
            }
        })

        if(changed){
            actions.emit('changeAccount', self)
            /// emit accounts
        }

    }

    self.signInput = function(txb, input, indexOfInput){

        if (input.address.indexOf("T") == 0 || input.address.indexOf("P") == 0) {

            if(actions.app.user.address.value != input.address) {
                throw 'unableSign'
            }

            var keyPair = actions.app.user.keys()

            txb.sign(indexOfInput, keyPair);

            return
        }

        if (input.type == 'htlc'){

            if(actions.app.user.address.value != input.address) {
                throw 'unableSign'
            }

            var keyPair = actions.app.user.keys()

            txb.sign({
                prevOutScript: Buffer.from(input.scriptPubKey, 'hex'),
                prevOutScriptType: 'htlc',
                vin: indexOfInput,
                keyPair
            });


            return
        }

        if (input.address.indexOf("Z") == 0 || input.address.indexOf("Y") == 0) {

            var index = _.indexOf(actions.app.platform.sdk.addresses.storage.addresses, i.address);

            if (index > -1) {

                var p2sh = actions.app.platform.sdk.addresses.storage.addressesobj[index];
                var dumped = actions.app.platform.sdk.address.dumpKeys(index)

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

    self.loadUnspents = function(){

        if (temps.unspents){
            return temps.unspents
        }

        var promise = actions.api.rpc('txunspent', [[self.address], 1, 9999999]).then(unspents => {

            checkTransactionByUnspents(unspents)

            self.unspents.value = unspents

            delete temps.unspents

            return Promise.resolve(unspents)
        })

        temps.unspents = promise

        return promise
        
    }

    self.getReadyUnspents = function(){

        return _.filter(self.unspents.value, (u) => {

            var wait = 0

            if (u.confirmations <= 11 && u.pockettx) {

                wait = 11 - tx.confirmations

            }

            if (tx.confirmations == 0 && !tx.coinbase && !tx.coinstake) {

                wait = 1

            }

            if (tx.confirmations < 100 && (tx.coinbase || tx.coinstake)) {

                wait = 100 - tx.confirmations

            }

            if(wait) return false


            var action = _.find(self.actions.value, (action) => {

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

        var sorted = _.sortBy(self.actions.value, (action) => {
            return action.priority
        })

        for(let action in sorted){
            
            try{
                await action.processing()
            }
            catch(e){

            }

            self.save()

            actions.emit('changeAction', action)

        }

        
    }

    self.checkAccountReadySend = function(account){
        if (account.status.value && account.unspents.value.length){
            return true
        }
    }

    self.addAction = function(object, priority){
        var action = new Action(self, object, priority)
        
        if (action.options.collision){

            _.each(self.actions.value, (obj2) => {
                if(!action.options.collision.collision(action, obj2)){
                    obj2.rejected = 'collision'
                }
            })

        }

        self.actions.value.push(action)
    }

    self.setWaitCoins = function(value){
        self.unspents.willChange = value ? true : false
    }

    return self
}

Actions = function(app, api){
    var self = this
     
    var key = 'actions_v0'

    var accounts = {}
    var events = {}

    var data = {
        feerate : 0
    }

    


    var processInterval = null

    
    
    var exports = function(){
        return {}
    }

    var imports = function(value){
        accounts = value

    }

    var emit = function(key, data){
        _.each(events[key] || [], function(e){
            e({data : data})
        })
    }

    self.estimateFee = function(){

        if(feerate){
            return Promise.resolve(feerate)
        }

        data.feerate = 0.00001

        return api.rpc('estimateSmartFee', [1]).catch(e => {
            return Promise.resolve({})
        }).then(d => {

            data.feerate = d.feerate || 0.00001

            return Promise.resolve(feerate)
        })
    }


    self.processing = function(){
        _.each(accounts, (account) => {
            account.processing()
        })
    } 

    self.addAction = function(address, object /* object/alias? */, priority){

        if(!address) return Promise.reject('address')
        if(!action) return Promise.reject('action')

        var account = self.addAccount(address)

        var action = account.addAction(object, priority)

        return action
    }

    self.addActionAndSendIfCan = function(address, object, priority){
        var action = self.addAction(address, object, priority)

        if (accounts[address].check()){
            return action.checkAccountReadySend()
        }
    }

    self.cancelAction = function(address, actionId){
        if(!address) return Promise.reject('address')
        if(!actionId) return Promise.reject('actionId')
    }

    self.addAccount = function(address){

        if(!accounts[address]){
            accounts[address] = new Account(address, self)
        }

        return accounts[address] 

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

    self.save = function(){
        try{
            localStorage[key] = exports()
        }
        catch(e){
        }
    }

    self.load = function(){
        try{
            imports(localStorage[key] || "{}")
        }
        catch(e){
        }
    }

    self.init = function(){
        app.platform.sdk.syncStorage.on('change', key, function(e){
            imports(e.newValue || "{}")
        });

        processInterval = setInterval(() => {
            self.processing()
        })
    }

    self.destroy = function(){
        events = {}
        accounts = {}

        if(processInterval){
            clearInterval(processInterval)
        }

        processInterval = null
    }

    self.api = api
    self.app = app
    self.emit = emit
    
    return self
}

if (typeof module != "undefined") {
    module.exports = Actions;
}