var bitcoin = require('./lib/btc16.js');

var Pocketnet = function(){
    var self = this

    self.kit = {
        keyPair : function(privateKey){
            var keyPair = null
            
            try{
                keyPair = bitcoin.ECPair.fromWIF(privateKey)//(Buffer.from(privateKey, 'hex'))
            }catch(e){

                //console.log("ERROR", e)

            }

            return keyPair
        },

        addressByPublicKey : function(pubkey){
            return bitcoin.payments.p2pkh({ pubkey: pubkey }).address
        },

        authorization : {
            signature : function(signature, addresses){

                if(!signature) signature = {}

                if(!signature.pubkey) return false
                if(!signature.nonce) return false
                if(!signature.address) return false


                try{

                    var pkbuffer = Buffer.from(signature.pubkey, 'hex')

                    var keyPair = bitcoin.ECPair.fromPublicKey(pkbuffer)
                    var hash = Buffer.from(signature.nonce, 'utf8')

                    var verify = keyPair.verify(hash, Buffer.from(signature.signature, 'hex')) && signature.address == self.kit.addressByPublicKey(pkbuffer);


                    if(!addresses) addresses = signature.address

                    if(!_.isArray(addresses)) addresses = [addresses]

                    return verify && _.indexOf(addresses, signature.address) > -1
                }

                catch(e) {

                    //console.error(e)

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
    
    self.lib = bitcoin

    return self
}

module.exports = Pocketnet
