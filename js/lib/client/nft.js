
var NFT = {}
var iv = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]; // random

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
            var mypbkdf2 = new PBKDF2(str, 'NFT.crypto.aeswc', 64, 128);

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
        size : 0,
        name : ''
    };

    var data = null;
    var decrypted = null;
    var encryption = false;
    var hash = ''

    self.clbks = {
        encryption : {}
    }

    self.emit = function(key){
        _.each(content.clbks[key], function(f){f(self)})
    }

    self.destroy = function(){
        _.each(content.clbks, function(cs, i){
            content.clbks[i] = {}
        })

        meta = {
            type : null,
            size : 0,
            name : ''
        };
        
        data = null;
        decrypted = null;
        encryption = false;
        hash = ''
    }
    
    self.export = function(finalize){

        if(!data) return null

        return {
            data : data,
            decrypted : finalize ? '' : (encryption ? decrypted : ''),
            meta : _.clone(meta),
            encryption : encryption,
            hash : hash
        }
    }

    self.data = function(){
        return data
    }

    self.hash = function(){
        return hash
    }

    self.encrypted = function(){
        return encryption
    }

    self.decrypted = function(){
        return decrypted
    }

    self.import = function(exported){

        meta = _.clone(meta)

        hash = exported.hash

        if (exported.decrypted) {
            decrypted = exported.decrypted
        }
        
        data = exported.data

        encryption = exported.encryption

        if(!encryption) decrypted = data
        
        return 
    }

    self.decrypt = function(secret){
        if(decrypted) return Promise.resolve()

        return NFT.crypto.content.decrypt(data, secret).then(_data => {
            decrypted = _data

            self.emit('decryption')

            return Promise.resolve(decrypted)
        })
    }

    self.add = function(_data, _meta, _e){

        if(!_meta) _meta = {}

        if(!_data) return Promise.reject('emptydata')
        if(!_meta.type) return Promise.reject('emptytype')

        decrypted = _data

        meta.size = _meta.size || 0
        meta.type = _meta.type || null
        meta.name = _meta.name || ""

        hash = NFT.crypto.multisha(decrypted, 10) 
        
        return self.setEncryption(_e)
    }

    self.checkhash = function(){
        var  _hash = NFT.crypto.multisha(decrypted, 10) 

        return _hash == hash
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

                self.emit('encryption')

                return Promise.resolve(encryption)
            })
        }
        else{
            data = decrypted

            self.emit('encryption')

            return Promise.resolve(encryption)
        }
    }

    return self
}

NFT.content = function(instance){
    var self = this

    var items = []

    var meta = {
        name : "",
        description : "",
        author : ""
    }

    self.import = function(){

    }

    return self
}

NFT.create = function(instance){


    var self = this

    var items = []

    var meta = {
        name : "",
        description : "",
        author : ""
    }

    var hash = ''
        meta.author = instance.address()

    self.set = function(metakey, value){
        if(typeof meta[metakey] == 'undefined'){
            return Promise.reject('metakey')
        }

        meta[metakey] = encodeURI(value)

        return self.reencrypt()
    }

    self.addtoitems = function(item){
        self.removefromitems(item.content.hash())

        items.push(item)

        item.content.clbks.encryption.parent =  self.reencrypt
    }

    self.removefromitems = function(hash){

        var removed = null

        items = _.filter(items, function(item){

            if(hash == item.content.hash()){
                removed = item
                return false
            }
            else{
                return true
            }

        })
    }

    self.find = function(hash){
        return _.find(items, function(item){
            return hash == item.content.hash()
        })
    }

    self.add = function(data, meta, encryption){

        var content = new NFT.contentItem(instance)

        return content.add(data, meta, encryption).then(r => {

            if(!content.data) return Promise.reject('dataempty')

            self.addtoitems({
                content : content,
                encryptedSecret : null
            })

            return Promise.resolve()

        }).then(r => {
            return self.reencrypt()
        })
        
    }

    self.remove = function(hash){

        var removed = self.removefromitems(hash)

        if (removed) removed.destroy()

        return self.reencrypt()
    }

    self.commonhash = function(){

        var h = meta.name + meta.description + meta.author

        _.each(items, function(item, i){
            h += i
        })

        if(!h) return ''

        return  NFT.crypto.multisha(h, 100)
    }

    self.commonhashcalc = function(){
        hash = self.commonhash()

        _.each(items, function(i){
            i.secret = null
        })
    }

    self.reencrypt = function(){

        self.commonhashcalc()

        return self.encryptallsecrets()
    }

    self.encryptallsecrets = function(){

        var promises = _.map(items, function(item){
            return self.encryptsecret(item.content).then(secret => {
                item.encryptedSecret = secret

                return Promise.resolve(item)
            })
        })

        return Promise.all(promises)
    }

    self.encryptsecret = function(content){

        if(!hash){
            return Promise.reject('hash')
        }

        if(!content.encrypted()) return Promise.resolve(null)
        
        var secret = instance.secret(content.hash())

        return NFT.crypto.content.encrypt(secret, instance.secret(hash)).then(decryptedSecret => {
            return Promise.resolve(decryptedSecret)
        })
    }

    self.destroy = function(){
        meta = {
            name : "",
            description : "",
            author : ""
        }

        items = []

        self.reencrypt()
    }

    self.decryptsecret = function(encryptedSecret, key){

        if(!hash){
            return Promise.reject('hash')
        }

        if(!decryptedSecret){
            return Promise.resolve(null)
        }
        
        return NFT.crypto.content.decrypt(encryptedSecret, key || instance.secret(hash)).then(secret => {
            return Promise.resolve(secret)
        })
    }

    self.export = function(finalize){

        var error = self.validation()
        
        if (error && finalize) 
            return Promise.reject(error)

        var D = {
            meta : {
                name : meta.name,
                description : meta.description,
                author : meta.author
            },

            hash : hash,

            items : _.map(items, function(item){
                return {
                    content : item.content.export(finalize),
                    encryptedSecret : item.encryptedSecret
                }
            })
        } 

        return Promise.resolve(D)

    }

    self.addImport = function(exported){

        var content = new NFT.contentItem(instance)

            content.import(exported.content)

            self.addtoitems({
                content : content,
                encryptedSecret : exported.encryptedSecret || null
            })
        
    }

    self.import = function(D){

        self.destroy()
        
        meta = {
            name : D.meta.name,
            description : D.meta.description,
            author : D.meta.author
        }

        hash = D.hash

        _.each(D.items, self.addImport)

    }

    self.decrypt = function(key){

        if (meta.author == instance.address()){
            key = instance.secret(hash)
        }

        var promises = _.map(items, function(item){

            if(item.encryptedSecret){
                return self.decryptsecret(item.encryptedSecret, key).then(secret => {
                    return item.content.decrypt(secret)
                }).then(r => {
                    return Promise.resolve()
                })
            }

            if(item.content.encrypted()){ return Promise.reject('encryptedSecret')}

            return Promise.resolve()
            
        })

        return Promise.all(promises)

    }

    self.validation = function(){
        if(!meta.name) return 'meta.name'
        if(!meta.description) return 'meta.description'
        if(!meta.author) return 'meta.author'

        var errorItem = _.find(items, function(item){

            if(!item.content) return true

            var exported = item.content.get()

            if(!exported.data) return true
            if(!exported.hash) return true

            if(exported.encryption && !item.secret) return true
            if(!exported.encryption && item.secret) return true
        })

        if (errorItem) return 'item'

        return false
    }

    return self
}

NFT.instance = function(platform){
    var self = this
    var privatekey = self.app.user.keys().privateKey.toString('hex')

    self.platform = platform
    self.address = function(){

        var a = self.sdk.address.pnet()

        if(!a) return ''

        return a.address
    }

    self.secret = function(hash){

        if (hash){
            return NFT.crypto.secret(privatekey, hash)
        }
        
        return null
            
    }

    self.create = function(){
        return new NFT.create(self)
    }

    self.content = function(){
        return new NFT.content(self)
    }

    return self
}

if(typeof module != "undefined"){ module.exports = {NFT}; } 
else { window.NFT = NFT; }