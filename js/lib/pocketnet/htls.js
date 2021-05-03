var HTLS = function(){
    var self = this
    var bitcoin = window.bitcoin;

    var sign = function(key, input, secret){

    }

    var lockscript = function({reciever, sender, hash, lock}){

        //'<sig> <pubkey> <sercet>'
   
        var script = `   
            OP_DUP 
            OP_HASH160 ${reciever} OP_EQUAL
            OP_IF OP_SHA256 ${bitcoin.crypto.sha256(hash)} OP_EQUALVERIFY
            OP_ELSE OP_DUP OP_HASH160 ${sender} OP_EQUALVERIFY OP_DROP ${lock} OP_CHECKLOCKTIMEVERIFY
            OP_ENDIF
            OP_DROP
            OP_CHECKSIG`

        return bitcoin.script.fromASM(script)

    }

    var multisha = function(str, count){

        if(!count) count = 100

        var h = Buffer.from(str)

        for (var i = 0; i < count; i++){
            h = bitcoin.crypto.sha256(h)
        }

        return h.toString('hex')
    }

    var createhash = function(key, seed){

        var str = multisha(multisha(key) + '_' + seed, 10)

        return str
    }

    self.createPayment = function(key, txid, lock, reciever, sender){
        var redeemScript = lockscript({
            hash : createhash(key, txid),
            reciever,
            sender,
            lock
        })

        var payment = bitcoin.payments.p2sh({redeem:{output:redeemScript}});


        return payment
    }

    return self
}


if(typeof module != "undefined"){ module.exports = {HTLS}; } 
else { window.HTLS = HTLS;}