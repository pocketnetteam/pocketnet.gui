var HTLS = function(){
    var self = this
    var bitcoin = window.bitcoin;

    var sign = function(key, input, secret){

    }

    var clearscript = function(asm){
        return trim(asm.replace(/\n\t/g).replace(/\s{2,}/g, ' '))
    }

    var signatureScript = function(sig, pub, secret){
        if(!secret) secret = '0'


    }

    var unlockscript = function({reciever, sender, hash}){

        var senderhash = bitcoin.address.fromBase58Check(sender).hash
        var recieverhash = bitcoin.address.fromBase58Check(reciever).hash

        // <sig> <pub> <secret>
       
        var asm2 = clearscript(`
            OP_IF
                OP_SHA256 ${hash} OP_EQUALVERIFY
                OP_DUP 
                OP_HASH160 ${senderhash.toString('hex')}
            OP_ELSE
                OP_DROP
                OP_DUP 
                OP_HASH160 ${recieverhash.toString('hex')}
            OP_ENDIF
            OP_EQUALVERIFY
            OP_CHECKSIG
        `)


        var script = bitcoin.script.fromASM(asm2)
   
        return script

    } 

    var lockscript = function({reciever, sender, hash, lock}){

        var senderhash = bitcoin.address.fromBase58Check(sender).hash
        var recieverhash = bitcoin.address.fromBase58Check(reciever).hash
        var lockbuf = bitcoin.script.number.encode(lock)

        // <sig> <pub> <secret>

        var asm2 = clearscript(`
            OP_IF
                OP_SHA256 ${bitcoin.crypto.sha256(hash).toString('hex')} OP_EQUALVERIFY
                OP_DUP 
                OP_HASH160 ${recieverhash.toString('hex')}
            OP_ELSE
                ${lockbuf.toString('hex')} OP_CHECKLOCKTIMEVERIFY 
                OP_DROP 
                OP_DUP 
                OP_HASH160 ${senderhash.toString('hex')}
            OP_ENDIF
            OP_EQUALVERIFY
            OP_CHECKSIG
        `)

       
        /*var asm2 = clearscript(`
            OP_DUP 

            OP_HASH160 ${recieverhash.toString('hex')} OP_EQUAL
            OP_IF 
                OP_CHECKSIGVERIFY OP_DROP OP_SHA256 ${bitcoin.crypto.sha256(hash).toString('hex')} OP_EQUALVERIFY 
            OP_ELSE 
                OP_DUP OP_HASH160 ${senderhash.toString('hex')} OP_EQUALVERIFY OP_CHECKSIGVERIFY 
                ${lockbuf.toString('hex')} OP_CHECKLOCKTIMEVERIFY 
            OP_ENDIF
        `)*/

        console.log('asm2', asm2)
        console.log('asm2cc', bitcoin.script.toASM(bitcoin.script.fromASM(asm2)) )
        var script = bitcoin.script.fromASM(asm2)
   
        return script

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

    self.hash = function(key, txid){
        return createhash(key, txid)
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