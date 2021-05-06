
var NFT = {}
var iv = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

NFT.crypto = {
    multisha : function(str, count){

        if(!count) count = 100

        var h = Buffer.from(str)

        for (var i = 0; i < count; i++){
            h = bitcoin.crypto.sha256(h)
        }

        return h.toString('hex')
    },

    secret : function(key, itemhash){
        return this.multisha(this.multisha(key) + '_' + itemhash, 10)
    },

    content : {
        encrypt : function(data, secret, p){
            return NFT.crypto.aeswc.encrypt(data, secret, p)
        },
        decrypt : function(data, secret, p){
            return NFT.crypto.aeswc.decrypt(data, secret, p)
        }
    },

    aeswc : {
        keys : function(str){
            var mypbkdf2 = new PBKDF2(key, 'NFT.crypto.aeswc', 64, 128);

            return new Promise((resolve, reject) => {
                
                mypbkdf2.deriveKey(null, function(key){
                    resolve(key)
                });
            })

            
        },

        encrypt : function(str, secret, p){

            if(!str || !secret) return Promise.reject('data')

            if (!p) p = {};

            p.charsetEnc = (p.charsetEnc || 'utf8')
            p.charsetDec = (p.charsetDec || 'hex')

            var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

            return NFT.crypto.aeswc.keys(secret).then(key => {

                return crypto.subtle.encrypt({
                    name: "AES-CBC",
                    iv: new Uint8Array(iv)
                }, key, strBytes)
                    
            }).then(function (encrypted) {
                return Promise.resolve(aesjs.utils[p.charsetDec].fromBytes(new Uint8Array(encrypted)))
            })
        },

        decrypt: function (str, secret, p) {

            if(!str || !secret) return Promise.reject('data')

            if (!p) p = {};

            p.charsetEnc = (p.charsetEnc || 'utf8')
            p.charsetDec = (p.charsetDec || 'hex')

            var encryptedBytes = new Uint8Array(aesjs.utils[p.charsetDec].toBytes(str));

            return NFT.crypto.aeswc.keys(secret).then(key => {
                if(!crypto.subtle) return Promise.reject('crypto.subtle')

                return crypto.subtle.decrypt({
                    name: "AES-CBC",
                    iv: new Uint8Array(iv)
                }, akey, encryptedBytes)
                    

            }).then(function (decrypted) {
                return Promise.resolve(aesjs.utils[p.charsetEnc].fromBytes(new Uint8Array(decrypted)))
            })

        }
    }
}

NFT.contentItem = function(instance){
    var self = this

    var meta = {
        type : null,
        size : null
    };
    var data = null;
    var encrypted = null;
    var encryption = false;
    var hash = ''

    self.get = function(){

        if(!data) return null

        return {
            data : data,
            meta : _.clone(meta),
            encryption : encryption,
            hash : hash
        }
    }

    self.hash = function(){
        return hash
    }

    self.add = function(_data, _meta, _e){

        if(!_meta) _meta = {}

        if(!_data) return Promise.reject('emptydata')
        if(!_meta.type) return Promise.reject('emptytype')
        //var blob = new Blob(data, {type : _meta.type});

        decrypted = _data

        meta.size = _meta.size
        meta.type = _meta.type

        hash = bitcoin.crypto.sha256(decrypted).toString('hex')
        
        return self.setEncryption(_e)
        
    }
    
    self.setEncryption = function(_e){

        encryption = _e ? true : false
        data = null

        if(!decrypted || !hash) {

            encryption = false
            return Promise.reject('unable')

        }

        if (encryption){

            return NFT.crypto.content.encrypt(decrypted, instance.secret(hash)).then(_data => {
                data = _data

                return Promise.resolve(encryption)
            })
        }
        else{
            data = decrypted

            return Promise.resolve(encryption)
        }
    }

    return self
}

NFT.content = function(instance){
    var self = this

    var items = {}

    var meta = {
        name : "",
        description : ""
    }

    self.add = function(data, meta, encryption){
        var item = new NFT.contentItem(instance)

        return item.add(data, meta, encryption).then(r => {

            items[item.hash()] = {
                data : item,
                secret : ''
            }

            return Promise.resolve()

        })
        
    }

    self.remove = function(hash){
        delete items[hash]
    }

    return self
}

NFT.instance = function(platform){
    var self = this
    var privatekey = self.app.user.keys().privateKey.toString('hex')

    self.platform = platform

    self.secret = function(hash){

        if (hash){
            return NFT.crypto.secret(privatekey, hash)
        }
        
        return null
            
    }

    return self
}

if(typeof module != "undefined"){ module.exports = {NFT}; } 
else { window.NFT = NFT; }