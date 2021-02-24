
const axios = require('axios');
var f = require('./functions');

var Exchanges = function(){
    var self = this

    var history = {
        prices : {}
    }

    var apis = {
        'mercatoxPrices' : 'https://mercatox.com/api/public/v1/ticker'
    }

    var followInterval = null

    self.api = {
        price : {
            mercatox : function(){
                return axios.get(apis.mercatoxPrices).then(function(response) {

                    var d = response.data
                    var slice = {
                        prices : {},
                        date : f.now()
                    }

                    

                    _.each(d, function(pair, i){

                        if(i.indexOf("PKOIN_") > -1){

                            var currency = i.split("_")[1]

                            slice.prices[currency] = {
                                currency : currency,
                                data : pair
                            }
                        }
                    })
        
                    if(!_.isEmpty(slice.prices)) return Promise.resolve(slice)
        
                    Promise.reject('notfound')
                })

                
            }
        }
       
    }

    self.history = {
        prices : function(){
            var promises = _.map(self.api.price, function(r, i){

                return r().then(slice => {

                    if(!history.prices[i]) history.prices[i] = []

                    history.prices[i].push(slice)

                    history.prices[i] = f.lastelements(history.prices[i], 500)

                }).catch(e => {})

            })

            return Promise.all(promises).catch(e => {})
        }
    }

    self.destroy = function(){
        if(followInterval) {
            clearInterval(followInterval)
            followInterval = null
        }
    }

    self.init = function(){

        self.history.prices()

        if(!followInterval){
            followInterval = setInterval(function(){
                self.history.prices()
            }, 360000)
        }

        return Promise.resolve()
    }

    self.kit = {
        get : {
            path : function(path){

                var action = f.deep(self.api, path)

                if(!action){
                    return action() 
                }
                else{
                    return Promise.reject('epmty')
                }

            },
            history : function(){
                return Promise.resolve(history)
            }
        }
    }


    return self
}

module.exports = Exchanges