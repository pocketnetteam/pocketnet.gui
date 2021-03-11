var RpcClient = require('./rpc');
var f = require('../functions');
const { performance } = require('perf_hooks');
var addresses = require('./addresses.json');


var Testnode = function(node){

    var self = this;

    var address = "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82"

    var h = {
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
    
    var methods = {
        gettime: [],
        //getmissedinfo: ['getrandomaddress', 1020798],
        getrawtransactionwithmessage : ["", "", "", 10, "en"],
        getuserstate : ['getrandomaddress'],
        getrawtransactionwithmessagebyid : [["f32822a02b0fb2614c4dcc43841fd95731e32c78ff2523e39575f7c2089134d1"]],
        txunspent : ['getrandomaddress2',1,9999999],
        getuserprofile : ['getrandomaddress1'],
        getuserprofiles : ['getrandomaddress10'],
        getuseraddress : ['maxim'],
        gettags : ["","150","-19999"],
        getlastcomments : ["7"],
        getcontents : ["PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM"],
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


        var parameters = _.map(_.clone(p || methods[method] || []), function(p, i){
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
            var waittime = 400
            
            for(var i = 0; i < count; i++){
                promises.push(
                    f.processArrayWithDelay(methodkeys, waittime, function(m){

                        return request(m).then(r => {
                            return Promise.resolve()
                        }).catch(e => {
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

        parallellMethodsLong : function(count, methodkeys, time){


            if(!time) time = 0

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
        }
    }

    self.scenarios = {
        pageload : function(){
            var count = 200,
                methodkeys = ['getuserprofile', 'getrawtransactionwithmessage', 'getuserstate', 'getrawtransactionwithmessagebyid', 'txunspent']
            


            return self.scenariosmeta.parallellMethodsLong(count, methodkeys, 60000)
        }
    }

    return self
}

module.exports = Testnode