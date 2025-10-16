var _ = require('lodash');
var f = require('../functions');
const axios = require('redaxios');

var Edjs = function () {

	var encdec = {
		header: function (data, fu) {

			return {
				level: data.level,
				text: fu(data.text)
			}

		},

		paragraph: function (data, fu) {

			return {
				text: fu(data.text)
			}

		},

		list: function (data, fu) {

			var n = function (e) {


				if (!e.content && !e.items) return fu(e)

				var nd = { ...e }

				if (nd.content)
					nd.content = fu(nd.content)

				if (nd.items) {
					nd.items = _.map(nd.items, function (i) {
						return n(i)
					})
				}

				return nd
			}

			return n(data)

		},

		carousel: function (data, fu) {


			return _.map(data, function (i) {
				var nd = { ...i }


				if (nd.caption) nd.caption = fu(nd.caption)

				return nd
			})

		},

		image: function (data, fu) {

			var nd = { ...data }

			if (nd.caption) nd.caption = fu(nd.caption)

			if (data.file) {
				nd.file = { ...data.file }
			}

			return nd

		},

		quote: function (data, fu) {

			return {
				caption: fu(data.caption),
				text: fu(data.text)
			}

		},

		code: function (data, fu) {
			return {
				code: fu(data.code)
			}
		},

		warning: function (data, fu) {

			return {
				title: fu(data.title),
				message: fu(data.message),
			}

		},

		linkTool: function (data, fu) {

			var nd = { ...data }

			nd.link = fu(nd.link)

			if (data.meta) {
				nd.meta = { ...data.meta }
				nd.meta.title = fu(nd.meta.title)
				nd.meta.description = fu(nd.meta.description)

				if (data.meta.image) {
					nd.meta.image = { ...data.meta.image }
				}
			}

			return nd

		},

		embed: function (data, fu) {

			var nd = { ...data }

			if (nd.caption) nd.caption = fu(nd.caption)

			return nd
		}
	}

	var r = function (n) {

		void 0 === n && (n = {});

		return {

			apply: function (_e, fu) {

				if (!fu) fu = (f) => f

				var e = { ..._e };

				if (e.blocks) {
					e.blocks = e.blocks.map((function (e) {

						return {
							type: e.type,
							id: e.id,
							data: encdec[e.type] ? encdec[e.type](e.data, fu) : _.clone(e.data)
						}

					}))
				}

				return e
			}
		}
	};
	return r
}();


var TranslateApi = function(p = {}){
    var self = this

    self.texts = {}
    self.storage = {}
    self.symbols = {}

    var errors = []
    var success = 0
    var error = 0

    
    var errorTime = 60
    var edjs = new Edjs()

    //var db = new Datastore(f.path(p.dbpath));

    self.info = function(compact){

        var meta = {
            storages : {},
            enabled : self.enabled(),
            texts : _.toArray(self.texts).length,

            api : _.map(settings.apis, (v, i) => {
                return i
            }).join(','),

            symbols : self.symbols,
            lasterror : errors.length ? errors[errors.length - 1] : null,
            successCount : success,
            errorCount : error
        }

        _.each(self.storage, function(stor, key){

            var length = _.toArray(stor || {}).length /// ???

            meta.storages[key] = {
                length : length,
            }

        })

        if(compact){
            delete meta.api
            delete meta.lasterror
        }

        return {
            meta : meta,
        }
    }

    self.enabled = function(){
        return settings.apis.libre && settings.apis.libre.key && (!settings.apis.yandex || settings.apis.yandex.key) ? true : false
    }

    self.translate = {
        article : function(id, article, l, dl){

            var chunks = []

            edjs.apply(article, (text) => {
                chunks.push({
                    i : chunks.length,
                    v : f.trydecode(text)
                })
            })

            return translateChunks(chunks, l, dl, id + '_a_body', 'libre').then((result) => {

                var i = -1

                var e = edjs.apply(article, (text) => {
                    i++
                    return result[i]
                })

                return Promise.resolve(e)

            })

        },
        share : function(txid, dl, txidEdit){

            var id = txidEdit || txid

            self.storage.share || (self.storage.share = {})
            self.storage.share[id] || (self.storage.share[id] = {})
            self.storage.share[id][dl] || (self.storage.share[id][dl] = {})

            if(self.storage.share[id][dl].action) return self.storage.share[id][dl].action
            if(self.storage.share[id][dl].result) return Promise.resolve(self.storage.share[id][dl].result)

            var promise = self.proxy.api.node.rpc.action({
                method : 'getrawtransactionwithmessagebyid',
                parameters : [[txid]]
            }).then(re => {

                if (re.data && re.data[0]){

                    var c = re.data[0]

                    var chunks = []

                    var sys = 'libre'

                    if(c.scoreCnt > 10) sys = 'yandex'

                    if (c.c){
                        chunks.push({
                            i : 'c',
                            v : f.trydecode(c.c)
                        })
                    }

                    if (c.s && c.s.v == 'a') {

                        if (c.s.version >= 2) {

                            if(!_.isObject(c.m)){
                                ///article

                                try{
                                    var article = JSON.parse(c.m)
                                }catch(e){
                                    return Promise.reject('translate:article:jsonparse:error')
                                }

                                return Promise.all([
                                    translateChunks(chunks, c.l, dl, id + '_a_caption', sys),

                                    self.translate.article(id, article, c.l, dl)
                                ]).then((results) => {

                                    var result = {...results[0]}

                                    try{
                                        result.m = JSON.stringify(results[1])
                                    }catch(e){
                                        return Promise.reject('translate:article:jsonstringify:error')
                                    }

                                    result.s = c.s

                                    return Promise.resolve(result)

                                })
                                
                            }
                                
                        }
                        else{
                            return Promise.reject('translate:article:v1:notsupported')
                        }
                    }
                    else{
                        chunks.push({
                            i : 'm',
                            v : f.trydecode(c.m)
                        })
                    }

                    return translateChunks(chunks, c.l, dl, id, sys).then((result) => {

                        result.s = c.s

                        return Promise.resolve(result)

                    })

                }

                return Promise.reject('translate:getrawtransactionwithmessagebyid:empty')
            }).then((r) => {
                
                if (self.storage.share[id][dl]){
                    self.storage.share[id][dl].result = r
                }

                return Promise.resolve(r)

            }).finally(() => {
                if (self.storage.share[id][dl])
                    delete self.storage.share[id][dl].action
            })

            self.storage.share[id][dl].action = promise

            return promise
        },

        comment : function(txid, dl, txidEdit){
            var id = txidEdit || txid

            self.storage.comment || (self.storage.comment = {})
            self.storage.comment[id] || (self.storage.comment[id] = {})
            self.storage.comment[id][dl] || (self.storage.comment[id][dl] = {})

            if(self.storage.comment[id][dl].action) return self.storage.comment[id][dl].action
            if(self.storage.comment[id][dl].result) return Promise.resolve(self.storage.comment[id][dl].result)

            var promise = self.proxy.api.node.rpc.action({
                method : 'getcomments',
                parameters : ['','','',[txid]]
            }).then(re => {

                if (re.data && re.data[0]){

                    var c = re.data[0]

                    var chunks = []
                    var message = {}

                    try{
                        message = JSON.parse(c.msg)
                    }
                    catch(e){
                        return Promise.reject('translate:comment:jsonparse:error')

                    }

                    if (message.message){
                        chunks.push({
                            i : 'message',
                            v : f.trydecode(message.message)
                        })
                    }
                  
                    return translateChunks(chunks, null, dl, id).then(r => {
                        message.message = r.message
                        var result = {}

                        try{
                            result.m = JSON.stringify(message)
                        }catch(e){
                            return Promise.reject('translate:article:jsonstringify:error')
                        }

                        return Promise.resolve(result)

                    })

                }

                return Promise.reject('translate:getcomments:empty')
            }).then((r) => {
                
                if (self.storage.comment[id][dl]){
                    self.storage.comment[id][dl].result = r
                }

                return Promise.resolve(r)

            }).finally(() => {
                if (self.storage.comment[id][dl])
                    delete self.storage.comment[id][dl].action
            })

            self.storage.comment[id][dl].action = promise

            return promise
        }
    }
   

    var translateChunks = function(chunks, sl, dl, cacheid, api){

        if(!chunks || !chunks.length) return Promise.resolve({})

        var texts = _.map(chunks, (v) => {
            return v.v
        })
        var result = {}

        return translateCached(texts, sl, dl, cacheid, api).then(r => {
            _.each(r, (v, i) => {

                result[chunks[i].i] = v.text

            })

            return Promise.resolve(result)
        })
    }

    var translateCached = function(text, sl, dl, cacheid, api){
        //if(!sl) return Promise.reject('translate:!sourselanguage')
        if(!dl) return Promise.reject('translate:!direction')
        if(!text) return Promise.reject('translate:!text')
        if(!cacheid) return Promise.reject('translate:!cacheid')

        self.texts[cacheid] || (self.texts[cacheid] = {})

        var tobject = self.texts[cacheid]

            tobject.created || (tobject.created = new Date())
            tobject.l || (tobject.l = {})


        if(sl){
            tobject.l[sl] || (tobject.l[sl] = {
                text
            })
        }
           
        tobject.l[dl] || (tobject.l[dl] = {})

        if(tobject.l[dl].text) return Promise.resolve(tobject.l[dl].text)

        tobject.l[dl].request || (tobject.l[dl].request = new Promise((resolve, reject) => {

            if (tobject.l[dl].error){

                var t = f.date.addseconds(tobject.l[dl].error.date, errorTime)

                if (t > new Date()){
                    return reject(tobject.l[dl].error.e)
                }
                else{
                    delete tobject.l[dl].error
                }

            }

            translate(text, sl, dl, api).then(text => {

                tobject.l[dl].text = text

                if(!sl){
                    sl = getautocode(text)

                    if (sl){
                        tobject.l[sl] || (tobject.l[sl] = {
                            text
                        })
                    }
                }

                success++

                return resolve(text)

            }).catch(e => {

                tobject.l[dl].error = {
                    e,
                    date : new Date()
                }

                errors.push(tobject.l[dl].error)

                error++

                if (errors.length > 1100){
                    errors = errors.slice(100)
                }

                reject(e)

            }).finally(() => {
                delete tobject.l[dl].request
            })

        }))

        return tobject.l[dl].request
    }

    var getautocode = function(restxt){
        var detectedLanguageCode = null

        _.find(restxt, (t) => {
            if(t.detectedLanguageCode) 
            {
                detectedLanguageCode = t.detectedLanguageCode
                return true
            }
        })

        return detectedLanguageCode
    }

    var translate = function(text, sl, dl, api){
        if(!self.enabled()) return Promise.reject('translate:notenabled')

        var ak = api && apis[api] ? api : 'libre'

        if(!apis[ak]){
            return Promise.reject('translate:settings')
        }

        try{

            return apis[ak].translate(text, sl, dl)
        }catch(e){
            return Promise.reject(e)
        }
        
    }

    var apis = {
        libre : {
            translate : function(text, sl, dl){

                if(!settings.apis.libre || !settings.apis.libre.key) return Promise.reject('translate:libre:missingkey')


                if(!_.isArray(text)) text = [text]

                if(!self.symbols['libre']) self.symbols['libre'] = { c : 0 }

                var textmap = _.map(text, (t) => {
                    return (t)
                }).join('<blo />')

                var data = {
                    q: textmap,
                    source: sl || 'auto',
                    target: dl,
                    format: "html",
                    api_key: settings.apis.libre.key
                }

                if(sl) data.sourceLanguageCode = sl
                //self.proxy.transports.
                return axios('https://translate.bastyon.com/translate', {
                    method: 'post',
                    data : JSON.stringify(data),
                    headers : {
                        "Content-Type": "application/json"
                    }
                }).then(response => {

                    if(!response.data || !response.data.translatedText || !response.data.translatedText.length){
                        return Promise.reject({
                            status : 500,
                            data : 'emptyresponse'
                        })
                    }

                    _.each(text, (t) => {
                        self.symbols['libre'].c += t.length
                    })

                    var chunks = response.data.translatedText.split('<blo></blo>')

                    var result = _.map(chunks, (v) => {
                        return {
                            text : v,
                            detectedLanguageCode : response.data.detectedLanguage ? response.data.detectedLanguage.language : null
                        }
                    })

                    return Promise.resolve(result)
                }).catch(response => {

                    console.log('response', response)

                    return Promise.reject({
                        code : response.status || 500,
                        text : 'translate:libre:' + (response.data ? response.data.error : (response.statusText || 'error'))
                    })
                })
            }
        },
        yandex : {
            translate : function(text, sl, dl){


                if(!settings.apis.yandex || !settings.apis.yandex.key) return Promise.reject('translate:yandex:missingkey')

                if(!_.isArray(text)) text = [text]

                if(!self.symbols['yandex']) self.symbols['yandex'] = { c : 0 }

                var textmap = _.map(text, (t) => {
                    return t
                })

                var data = {
                    "targetLanguageCode": dl,
                    "texts": textmap,
                    "speller": true
                }

                if(sl) data.sourceLanguageCode = sl
                //self.proxy.transports.
                return axios('https://translate.api.cloud.yandex.net/translate/v2/translate', {
                    method: 'post',
                    data : data,
                    headers : {
                        'Authorization': `Api-Key ${settings.apis.yandex.key}`
                    }
                }).then(response => {

                    if(!response.data || !response.data.translations || !response.data.translations.length){
                        return Promise.reject({
                            status : 500,
                            data : 'emptyresponse'
                        })
                    }


                    _.each(text, (t) => {
                        self.symbols['yandex'].c += t.length
                    })

                    return Promise.resolve(response.data.translations)
                }).catch(response => {

                     console.log('response', response)

                    return Promise.reject({
                        code : response.status || 500,
                        text : 'translate:yandex:' + ((response.data ? (response.data.error || response.data.code || response.data) : '') || response.statusText ||  'error')
                    })
                })
            }
        }
    }

    self.clear = function(){
        self.texts = {}

        errors = []
        success = 0
        error = 0
    }

    self.settingChanged = function(p){
        settings = {
            apis : {}
        }

        var keys = (p.key || '').split(',') || []
        var apis = (p.api || '').split(',') || []

        _.each(apis, (a, i) => {
            settings.apis[a] = {
                sys : a,
                key : keys[i] || ''
            }
        })

        settings.api = p.api
        
    }

    /*self.test = function(){

        

        try{
            translate(['this is a test', 'test two'], null, 'ru').catch(e => {
                console.error(e)
            })
        }catch(e){
            console.error(e)
        }

        self.translate.share('76381037151a6f07ae78700c0c64d27a91d19fb78545acdf0d7959a329ecba14', 'ru').then(r => {
            console.log("R", r)
        }).catch(e => {
            console.log("Translate api error")
            console.log(e)
        })

        self.translate.share('691ccc5dabf3e33383fa8f8fe6701925da17f71fa2a5d5be563160fa34427ad5', 'ru').then(r => {
            console.log("R", r)
        }).catch(e => {
            console.log("Translate api error")
            console.log(e)
        })

        self.translate.comment('8dd39a1c9a04f251fc41cd60252e8c29ff39e5a39ac6e078329858e341dc283d', 'ru').then(r => {
            console.log("R", r)
        }).catch(e => {
            console.log("Translate api error")
            console.log(e)
        })
    }

    setTimeout(() => {

        self.test()
       
        
    }, 3000)*/

    self.settingChanged(p)
    
    return self
}

module.exports = TranslateApi
