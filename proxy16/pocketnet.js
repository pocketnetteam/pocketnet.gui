var bitcoin = require('./lib/btc16.js');
var pkit = require('./lib/kit.js');
var Pocketnet = function(){
    var self = this

    self.kit = {
        keyPair : function(privateKey){
            var keyPair = null
            
            try{
                keyPair = bitcoin.ECPair.fromWIF(privateKey)//(Buffer.from(privateKey, 'hex'))
            }catch(e){
                //console.log("E", e)
            }

            return keyPair
        },

        addressByPublicKey : function(pubkey){
            return bitcoin.payments.p2pkh({ pubkey: pubkey }).address
        },

        authorization : {
            verifyhash : function(keyPair, signature, hash){

                if(signature && hash){

                    var sbuf = Buffer.from(signature, 'hex')

                    try{
                        var v = keyPair.verify(hash, sbuf)
    
                        return v
                    }
                    catch(e){
                        
                        return false
                    }
                }

                return false
                
            },
            signature : function(signature, addresses){

                if(!signature) signature = {}

                if(!signature.pubkey) return false
                if(!signature.nonce) return false
                if(!signature.address) return false


                try{

                    var pkbuffer =  Buffer.from(signature.pubkey, 'hex')
                    var keyPair = bitcoin.ECPair.fromPublicKey(pkbuffer)
                    var hash =      Buffer.from(signature.nonce, 'utf8')
                    var hashtrue = bitcoin.crypto.sha256(Buffer.from(signature.nonce, 'utf8'))
                    var verify = false

                    if(!signature.v){
                        var verify = (

                            self.kit.authorization.verifyhash(keyPair, signature.signature, hash)
                            
                        ) && signature.address == self.kit.addressByPublicKey(pkbuffer);
                    }

                    else{
                        
                        var verify = (

                            self.kit.authorization.verifyhash(keyPair, signature.signature, hashtrue) 
                            
                        ) && signature.address == self.kit.addressByPublicKey(pkbuffer);
                    }   


                    if(!addresses) addresses = signature.address

                    if(!_.isArray(addresses)) addresses = [addresses]

                    delete pkbuffer
                    delete hash
                    delete hashtrue

                    return verify && _.indexOf(addresses, signature.address) > -1
                }

                catch(e) {

                    return false
                }

                

            }
        },

        address : {
            validation : function(address){
                var valid = true;

                try{
                    bitcoin.address.fromBase58Check(address)
                }

                catch (e){
                    valid = false;
                }

                
                return valid
            }
        },

        node : {
            defaults : function(){
                return {
                    port : 38081,
                    ws : 8087,
                    rpcuser : '',
                    rpcpass : '',
                }
            }
        }
    }

    self.pobjects = {
        comment : function(txid, message){
            var comment = new pkit.c.comment(txid)

                comment.message.set(message)

            return comment
        },

        share : function(lang){
            var share = new pkit.c.share(lang)

            return share
        },

        blocking : function(address){
            var blocking = new pkit.c.blocking()

            blocking.address.set(address)

            return blocking
        },

        unsubscribe : function(address){
            var unsubscribe = new pkit.c.unsubscribe()

            unsubscribe.address.set(address)

            return unsubscribe
        },

        subscribe : function(address){
            var subscribe = new pkit.c.subscribe()

            subscribe.address.set(address)

            return subscribe
        },

        subscribePrivate : function(address){
            var subscribePrivate = new pkit.c.subscribePrivate()

            subscribePrivate.address.set(address)

            return subscribePrivate
        },

        upvoteShare : function(txid, address, value){
            var upvoteShare = new pkit.c.upvoteShare()

            upvoteShare.address.set(address)
            upvoteShare.value.set(value)
            upvoteShare.share.set(txid);

            return upvoteShare
        },

        upvoteComment: function(commentid, address, value){
            var upvoteComment = new pkit.c.cScore()

            upvoteComment.address.set(address)
            upvoteComment.value.set(value)
            upvoteComment.comment.set(commentid);

            return upvoteComment
        },
    }
    
    self.lib = bitcoin
    self.pkit = pkit

    return self
}

module.exports = Pocketnet
