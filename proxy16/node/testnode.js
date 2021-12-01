var f = require('../functions');
const { performance } = require('perf_hooks');
var addresses = require('./addresses.json');


var Testnode = function(node, manager){

    var self = this;

    var h = {
        getrandomstring : function(){

            var length = 3

            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
                charactersLength));
            }

            return result;

        },
        getrandomaddress : function(){
            return addresses[f.rand(0, addresses.length - 1)]
        },
        getrandomaddress1 : function(){
            return [this.getrandomaddress()]
        },
        getrandomaddress2 : function(){
            return [this.getrandomaddress(), this.getrandomaddress()]
        },
        getrandomaddress10 : function(){
            return [this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress(),this.getrandomaddress()]
        }
    }

    var langs = ['ru', 'en']

    var tags = {

        en : [
            {
                name : "Memes/Funny",
                tags : ['funny', 'memes'],
                id : 'c2'
            },
            {
                name : "Politics",
                tags : ['politics'],
                id : 'c3'
            },
            {
                name : "Crypto",
                tags : ['crypto'],
                id : 'c4'
            },
            {
                name : "Technology/Science",
                tags : ['technology', 'science'],
                id : 'c5'
            },
            {
                name : "Faith/Religion",
                tags : ['faith', 'religion'],
                id : 'c55'
            },
            {
                name : "Investing/Finance",
                tags : ['investing', 'finance'],
                id : 'c6'
            },
            {
                name : "Auto/Racing",
                tags : ['auto', 'racing'],
                id : 'c7'
            },
            {
                name : "Sports",
                tags : ['sports'],
                id : 'c8'
            },
            {
                name : "Gaming",
                tags : ['gaming'],
                id : 'c9'
            },
            {
                name : "Space",
                tags : ['space'],
                id : 'c10'
            },
            
            {
                name : "Art/Music",
                tags : ['art', 'music'],
                id : 'c11'
            },
            
            {
                name : "News/Commentary",
                tags : ['news', 'commentary'],
                id : 'c12'
            },
            
            {
                name : "History",
                tags : ['history'],
                id : 'c13'
            },
            {
                name : "Story time",
                tags : ['storytime'],
                id : 'c14'
            },
            
            {
                name : "Film/Animation",
                tags : ['film', 'animation'],
                id : 'c15'
            },
            
            {
                name : "Nature/Animals",
                tags : ['nature', 'animals'],
                id : 'c16'
            },
            
            {
                name : "Travel/Architecture",
                tags : ['travel', 'architecture'],
                id : 'c17'
            },
            
            {
                name : "DIY",
                tags : ['diy'],
                id : 'c18'
            }
        ],
        ru : [
            {
                name : "Мемы/Юмор",
                tags : ['мемы', 'юмор'],
                id : 'c2'
            },
            {
                name : "Политика",
                tags : ['политика'],
                id : 'c3'
            },
            {
                name : "Криптовалюта",
                tags : ['Криптовалюта'],
                id : 'c4'
            },
            {
                name : "Наука/Технологии",
                tags : ['технологии', 'наука'],
                id : 'c5'
            },
            {
                name : "Вера/Религия",
                tags : ['вера', 'религия'],
                id : 'c55'
            },
            {
                name : "Финансы/Инвестиции",
                tags : ['финансы', 'инвестиции'],
                id : 'c6'
            },
            {
                name : "Автомобили/Гонки",
                tags : ['auto', 'racing'],
                id : 'c7'
            },
            {
                name : "Спорт",
                tags : ['спорт'],
                id : 'c8'
            },
            {
                name : "Игры",
                tags : ['игры'],
                id : 'c9'
            },
            {
                name : "Космос",
                tags : ['космос'],
                id : 'c10'
            },
            
            {
                name : "Искусство/Музыка",
                tags : ['искусство', 'музыка'],
                id : 'c11'
            },
            
            {
                name : "Новости/Комментарии",
                tags : ['новости', 'комментарии'],
                id : 'c12'
            },
            
            {
                name : "История",
                tags : ['история'],
                id : 'c13'
            },
            {
                name : "Время историй",
                tags : ['истории'],
                id : 'c14'
            },
            
            {
                name : "Кино/Анимация",
                tags : ['кино', 'анимация'],
                id : 'c15'
            },
            
            {
                name : "Природа/Животные",
                tags : ['Природа', 'животные'],
                id : 'c16'
            },
            
            {
                name : "Путешествия/Архитектура",
                tags : ['путешествия', 'архитектура'],
                id : 'c17'
            },
            
            {
                name : "Сделай сам",
                tags : ['сделайсам'],
                id : 'c18'
            }
        ],

    }
    
    var methods = {
        gettime: [],
        //getmissedinfo: ['getrandomaddress', 1020798],
        getrawtransactionwithmessage : ["getrandomaddress", "1", "", 10, ""],
        getuserstate : ['getrandomaddress'],
        getrawtransactionwithmessagebyid : [["87b22ba285cf0c89ea23ceaf0aa6d77a481b975481511b96e1395278edf4ca75"]],
        txunspent : ['getrandomaddress2',1,9999999],
        getuserprofile : ['getrandomaddress1'],
        getuserprofiles : ['getrandomaddress10'],
        getrawtransaction : ['adcd8bfa4695d02d00a9260b0a773d6334edd64c421b8b76335ff2a05c073302', 1],
        getuseraddress : ['maxtest'],
        gettags : function(){

            var lang = langs[f.rand(0, langs.length - 1)]

            return ["", "50", "1130718", lang]
        },
        gethotposts : function(){

            var lang = langs[f.rand(0, langs.length - 1)]

            return ["200", "2592000", "", "en"]
        }, 
        getlastcomments : function(){

            var lang = langs[f.rand(0, langs.length - 1)]

            return ["50", "", "en"]
        },
        gethierarchicalstrip : function(){

            var lang = langs[f.rand(0, langs.length - 1)]

            var _tagsc = tags[lang]

            var _tags = _tagsc[f.rand(0, _tagsc.length - 1)]

            var t = _.map(_tags.tags, function(t){
                return encodeURIComponent(t)
            })

            return [0, "", 30, lang, t]
        },
        getnodeinfo : [],
        getcontentsstatistic :  ['getrandomaddress2', "video"],
        search : ["getrandomstring", "users", 946114, "0", "10"],
        getcontents : ["getrandomaddress"],
        getcomments : ["bc592f816fe7514a6cd23bf6230cd01e8e8fd5e407c3d7301a742d3a1eab916f","","getrandomaddress"],
        getpostscores: ["27904ded808c8a183b06783a3a671d050e80e442085d22a4f1a5facd21d51741"],
        getpagescores: [["27904ded808c8a183b06783a3a671d050e80e442085d22a4f1a5facd21d51741","9aa6fc1b134834f716486b13b41ef796eee894de0e1ed9ef4fc3dbb6a00b11c5","bc592f816fe7514a6cd23bf6230cd01e8e8fd5e407c3d7301a742d3a1eab916f","54fe81a1c864814e0a7c96e99e568e0edb2f11c5422c251c9a0b7bf068cc664c","ea9ea91e8baf69f752470f55d146f4638bab0960ef55753a3c44df02c645798c","e368d85ac8ea07f6ebb0eed9fe5c957864e04cef3df4d56d908655a0cb8497d8","d8f0f05aca8e5ab0a9f5becc0f0cce54c92e8f131780e2e984ea00bd989bdd72","5b298e614cf5b1ec16816478cf46908730fcee5d1df73ae9e9227ce2eac606e7","da7980b190a276cc766b0abb5f93aee4ca0f233ee648259cf9b6ea38d3ef418a","e156d31d3fc705062037ba12e9c8e4b3ad847038b4f5f0c076265fb4a3d8ad7b"],"getrandomaddress",["ecfc8fb6ac6408090e12f2bd1010816e459ca5173d1df3919e0998fcc5cf30e4","331bc66644f5dbc716ecb9c4e8f8e63e3950dc34e870c21fe16f5bb08f42df15","ca0d27710bdbc52b50cb51679d904f8956d6c04dc774ffccbacada74892982bc","0fa25c7362535e9b0c00be4e1949a6f690db6efc1235dfb85979bd019c01a82e"]],
    }
    
    

    var getmethods = function(){
        return _.map(methods, function(i, k){
            return k
        })
    }

    var request = function(method, p){

        var prms = p || methods[method] || []

        if (typeof prms == 'function'){
            prms = prms()
        }

        var parameters = _.map(_.clone(prms), function(p, i){

            
            if (!_.isArray(p))
                if(h[p]) return h[p]()

            return p
        })


        return f.delay(f.rand(3, 100)).then(() => {
            return node.rpcs(method, parameters)
        })

        .catch(e => {
            return Promise.resolve()
        })
    }

    var requestes = function(method, count, p){

        if(!count) count = 500

        var promises = [];

        for(var i = 0; i < count; i++){
            promises.push(request(method, p))
        }

        return Promise.all(promises)
    }

    var log = function(){
        //console.log(node.statistic.get())
    }



    self.scenariosmeta = {
        allmethods : function(count, waittime){

            waittime || (waittime = 60000)

            var methods = getmethods()

            return f.processArrayWithDelay(methods, waittime, function(m){

                return requestes(m, count).then(r => {

                    log()

                    return f.delay(waittime)

                }).then(r => {

                    log()

                })
            }).catch(e => {

                return Promise.resolve()

            })

        },

        getuserprofileone : function(){

            setInterval(function(){
                log()
            }, 1000)


            return requestes('getuserprofile', 5000).then(r => {
                log()

                return Promise.resolve()
            })
        },

        parallellMethods : function(count, methodkeys){

            if(!count) count = 1;

            var promises = []
            var waittime = 200
            
            for(var i = 0; i < count; i++){
                promises.push(
                    f.processArrayWithDelay(methodkeys, waittime, function(m){

                        request(m)

                        //return request(m).then(r => {
                            return Promise.resolve()
                       // })

                    }).catch(e => {

                        return Promise.resolve()
                    })
                )
            }


            return Promise.all(promises).catch(e => {

                return Promise.reject(e)
            })
        },

        parallellMethodsLong : function(count, methodkeys, time){


            if(!time) time = 0

            console.log('time', time)

            if (time <= 0) {
                return Promise.resolve()
            }

            var ctime = performance.now()


            return self.scenariosmeta.parallellMethods(count, methodkeys).catch(e => {

                return Promise.resolve()

            }).then(r => {

                var difference = (performance.now() - ctime);

                time = time - difference
                
                return this.parallellMethodsLong(count, methodkeys, time)

            })
        },

        actions : function(count, actions){

            if(!count) count = 1;

            var promises = []
            var waittime = 200
            
            for(var i = 0; i < count; i++){
                promises.push(
                    f.processArrayWithDelay(actions, waittime, function(m){

                        console.log("PROCESSPART", m)

                        return m().then(r => {
                            return Promise.resolve()
                        })

                    }).catch(e => {

                        return Promise.resolve()
                    })
                )
            }


            return Promise.all(promises).catch(e => {

                return Promise.reject(e)
            })
        },

        actionsLong : function(count, actions, time){
            if(!time) time = 0
            if (time <= 0) {
                return Promise.resolve()
            }

            var ctime = performance.now()

            return self.scenariosmeta.actions(count, actions).catch(e => {

                return Promise.resolve()

            }).then(r => {

                var difference = (performance.now() - ctime);

                time = time - difference

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.actionsLong(count, actions, time).then((r) => {
                            resolve(r)
                        }).catch(e => {
                            reject(e)
                        })
                    }, 200)
                })

            })
        }
    }

    self.kit = {
        preparekey : function(index){
            var privatekey = manager.proxy.wallet.testkey(index)

            if(!privatekey) return Promise.reject('privatekey')

            var ao = manager.wallet.kit.addressobj({
                privatekey
            })


            if(!ao.keys) return Promise.reject('privatekeyao')

            return manager.wallet.unspents.getc(ao, true).then(r => {
                return Promise.resolve(ao)
            })
        },

        getlastcomments : function(){
            return request('getlastcomments')
        },

        getposts : function(){
            return request('gethotposts')
        },
        
        makecomment : function(address, txid, message){

            if(!message) message = this.randomtext()

            var comment = manager.wallet.pocketnet.pobjects.comment(txid, message)

            console.log('makecomment')

            return manager.wallet.transactions.common(address, comment, {}).then(() => {

                console.log('makecommentsuccess')

                return Promise.resolve()
            }).catch(e => {

                console.log('makecommentfailed', e)

                return Promise.reject(e)
            })
        },

        makeupvoteShare : function(address, txid, txaddress){

            var upvote = manager.wallet.pocketnet.pobjects.upvoteShare(txid, txaddress, f.rand(1, 5) + '')

            console.log('makeupvoteShare')

            return manager.wallet.transactions.common(address, upvote, {}).then(() => {
                console.log('makeupvoteShareSuccess')
                return Promise.resolve()
            }).catch(e => {
                console.log('makeupvoteShareFailed', e)
                return Promise.reject(e)
            })
        },

        makeUserAction : function(address, action, uaddress){

            if(!manager.wallet.pocketnet.pobjects[action]){
                return Promise.reject('action')
            }

            var action = manager.wallet.pocketnet.pobjects[action](uaddress)

            console.log('actionBegin', action)

            return manager.wallet.transactions.common(address, action, {}).then(() => {
                console.log('actionSuccess', action)
                return Promise.resolve()
            }).catch(e => {
                console.log('actionFailed', action)
                return Promise.reject(e)
            })
        },

        makeupvoteComment : function(address, commentid, txaddress){

            console.log('commentid, txaddress', commentid, txaddress)

            var upvote = manager.wallet.pocketnet.pobjects.upvoteComment(commentid, txaddress, f.rand(1, 5) + '')
            console.log('makeupvoteComment')
            return manager.wallet.transactions.common(address, upvote, {}).then(() => {
                console.log('makeupvoteCommentSuccess')
                return Promise.resolve()
            }).catch(e => {
                console.log('makeupvoteCommentFailed', e)
                return Promise.reject(e)
            })
        },

        makeshare : function(address, message){

            if(!message) message = this.randomtext()

            var share = manager.wallet.pocketnet.pobjects.share("en")
            share.message.set(message)
            share.tags.set(['test'])

            console.log('makeshare')

            return manager.wallet.transactions.common(address, share, {}).then(() => {

                console.log('makeshareSuccess')

                return Promise.resolve()
            }).catch(e => {
                console.log('makeshareSuccess', e)
                return Promise.reject(e)
            })
        },

        randomtext : function(l){
            return 'time: ' + f.now() + ", text: "  + f.randomString(l || f.rand(10, 100))
        }
    }


    self.scenarios = {
        pageload : function(){
            var count = 100,
                //methodkeys = ['getlastcomments']

                methodkeys = _.map(methods, function(m, i){
                    return i
                })

                methodkeys = _.filter(methodkeys, function(i){

                    /*if(i == 'getcontents') return false
                    if(i == 'getlastcomments') return false
                    if(i == 'txunspent') return false
                    if(i == 'getcomments') return false
                    if(i == 'gethotposts') return false
                    if(i == 'gethierarchicalstrip') return false*/
                    /*if(i == 'gettags') return false*/
                    if(i == 'getrawtransaction') return false
                    
                    
                    return true
                })
            
                console.log("testing", methodkeys)

            return self.scenariosmeta.parallellMethodsLong(count, methodkeys, 6000000).catch(e => {

                console.log("E testing", e)

                return Promise.reject(e)
            })
        },

        limits : function(){

            return self.scenarios.limitsChank('share').then(r => {
                return self.scenarios.limitsChank('comment')
            }).then(r => {
                return self.scenarios.limitsChank('upvoteComment')
            }).then(r => {
                return self.scenarios.limitsChank('upvoteShare')
            }).then(r => {
                return self.scenarios.limitsChank('userAction')
            })

        },

        limitsChank : function(action){

            var promises = []

            for(var i = 0; i < 3; i++){
                promises.push(self.scenarios.limit(i, action))
            }

            return Promise.all(promises)
        },

        limit : function(pkindex, action){

            if(!pkindex) pkindex = 0

            var address = null
            var posts = []
            var comments = []
            var count = 2
            var time = 60000

            if(!action) action = 'comment'

            var acts = {
                comment : function(){
                    return new Promise((resolve, reject) => {

                        if(!posts.length) return resolve()

                        var post = posts[f.rand(0, posts.length - 1)]

                        self.kit.makecomment(address, post.txid).then(r => {
                            resolve()
                        }).catch(e => {
                            reject(e)
                        })

                    })
                },

                share : function(){
                    return new Promise((resolve, reject) => {

                        self.kit.makeshare(address).then(r => {
                            resolve()
                        }).catch(e => {
                            console.log("E", e)
                            resolve()
                        })

                    })
                },

                upvoteComment : function(){
                    return new Promise((resolve, reject) => {

                        if(!posts.length) return resolve()

                        if(!comments.length) return resolve()

                        var comment = comments[f.rand(0, comments.length - 1)]

                        self.kit.makeupvoteComment(address, comment.id, comment.address).then(r => {
                            resolve()
                        }).catch(e => {
                            resolve()
                        })

                    })
                },

                upvoteShare : function(){
                    return new Promise((resolve, reject) => {

                        var post = posts[f.rand(0, posts.length - 1)]

                        self.kit.makeupvoteShare(address, post.txid, post.address).then(r => {
                            resolve()
                        }).catch(e => {
                            console.log("E", e)
                            resolve()
                        })

                    })
                },

                userAction : function(){
                    return new Promise((resolve, reject) => {

                        var post = posts[f.rand(0, posts.length - 1)]

                        var actions = ['unsubscribe', 'subscribe', 'subscribePrivate', 'blocking']

                        var action = actions[f.rand(0, actions.length - 1)]

                        self.kit.makeUserAction(address, action, post.address).then(r => {
                            resolve()
                        }).catch(e => {
                            console.log("E", e)
                            resolve()
                        })

                    })
                }
            }

            return self.kit.preparekey(pkindex).then(a => {

                address = a

                return self.kit.getposts()

            }).then(_posts => {

                posts = _posts
                
                return self.kit.getlastcomments()

            }).then(_comments => {

                comments = _comments

                var actions = [
                    acts[action]
                ]

                return self.scenariosmeta.actionsLong(count, actions, time)
            })

        }

    }

    return self
}

module.exports = Testnode