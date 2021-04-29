
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
                    //ключи всех пар валют в объекте ответа и все, где упомянут PKOIN
                    var response_keys = Object.keys(response.data)

                    var pkoin_pairs = response_keys.filter(item => {
                        item.includes('PKOIN_') && !item.includes('_USDT') && !item.includes('_BTC')
                    })

                    var btc_usd_price = response.data['BTC_USDT'].last_price

                    var pkoin_usd_price = response.data['PKOIN_USDT'].last_price
                    var pkoin_btc_price = response.data['PKOIN_BTC'].last_price * btc_usd_price

                    var highest_price = pkoin_usd_price > pkoin_btc_price ? pkoin_usd_price : pkoin_btc_price

                    //Берем пары с PKOIN, переводим цену за них из других валют в доллары
                    if(pkoin_pairs) {
                        pkoin_pairs.forEach(item => {
                            var currency = item.split('_')[1]
                            var pair = response.data[item].last_price  // наивысшая цена в паре валют
                            var price
    
                            if (response.data[currency + '_USDT']) price = response.data[currency + '_USDT'].last_price * pair
                            else if (response.data[currency + '_BTC']) price = response.data[currency + '_BTC'].last_price * btc_price * pair
                            
                            if(price) highest_price = highest_price < price ? price : highest_price
                        })
                    }

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
                    
                    //делаем объект для USD на основе USDT
                    var usd = _.clone(response.data['PKOIN_USDT'])

                    if (typeof highest_price !== Number) {
                        highest_price = parseFloat(highest_price, 10).toFixed(2)
                    } 
                    
                    usd.last_price = highest_price

                    slice.prices['USD'] = {
                        currency : 'USD',
                        data : usd
                    }
        
                    if(!_.isEmpty(slice.prices)) return Promise.resolve(slice)
        
                    return Promise.reject('notfound')
                }).catch(e => {

                    return Promise.reject('notfound')
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

                    return Promise.resolve()

                }).catch(e => {

                    return Promise.resolve()
                })

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
            }, 160000)
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