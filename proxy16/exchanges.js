
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
                    var pkoin_pairs = response_keys.filter(item => item.includes('PKOIN_'))

                    //ищет наибольшую цену в паре
                    function highestPrice(obj) {
                        return obj.high24hr > obj.last_price ? obj.high24hr : obj.last_price
                    }

                    //цена битка в долларах, массив разных цен PKOIN в долларах, наивысшая цена PKOIN в конкретной паре
                    var btc_price = response.data['BTC_USDT'].high24hr
                    var pkoin_prices = []
                    var highest_price = 0

                    //Берем пары с PKOIN, переводим цену за них из других валют в доллары
                    pkoin_pairs.forEach(item => {
                        var currency = item.split('_')[1]
                        var pair = highestPrice(response.data[item])  // наивысшая цена в паре валют
                        var price

                        if(currency === 'USDT') price = highestPrice(response.data['PKOIN_USDT'])
                        else if (currency === 'BTC') price = highestPrice(response.data['PKOIN_BTC']) * btc_price
                        else if (response.data[currency + '_USDT']) price = highestPrice(response.data[currency + '_USDT']) * pair
                        else if (response.data[currency + '_BTC']) price = highestPrice(response.data[currency + '_BTC']) * btc_price * pair
                        
                        if(price) highest_price = highest_price < price ? price : highest_price
                        console.log('!!!!!', highest_price)
                    })

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

                        if(i.indexOf('BTC_USDT') > -1) {

                            slice.prices['USD'] = {
                                currency : 'USD',
                                data : pair
                            }
                        }
                    })

                    // console.log('@@@', slice)
        
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