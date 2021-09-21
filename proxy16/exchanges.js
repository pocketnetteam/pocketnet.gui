
const axios = require('axios');
const { zip } = require('underscore');
var f = require('./functions');

var Exchanges = function(){
    var self = this

    var hasdata = false

    var history = {
        prices : {}
    }

    // {
    //     'mercatox': [
    //         {
    //             prices: { BTC: {}, USDT: {}, USD: {}},
    //             date: ''
    //         },
    //         {
    //             prices: { BTC: {}, USDT: {}, USD: {}},
    //             date: ''
    //         }
    //     ],
    //
    //     'bilaxy': [
    //         {
    //             prices: { USDT: {}, USD: {} },
    //             date: ''
    //         },
    //         {
    //             prices: { USDT: {}, USD: {} },
    //             date: ''
    //         },
    //     ]
    // }

    var keys = {
        'mercatox' : 'last_price',
        'bilaxy' : 'close',
        'bitforex' : 'last'
    }

    var apis = {
        'mercatoxPrices' : 'https://mercatox.com/api/public/v1/ticker',
        'bilaxy' : 'https://newapi.bilaxy.com/v1/ticker/24hr',
        'bitforex' : 'https://www.bitforex.com/server/market.act?cmd=searchTickers&type=all',
        'digifinex' : 'https://openapi.digifinex.vip/v3/ticker'
    }

    var followInterval = null

    self.api = {
        price : {
            bilaxy : function(){
                return axios.get(apis.bilaxy).then(function(response) {

                    return f.getPkoinPrice(response.data, 'close')

                }).catch(e => {

                    //console.log('bilaxy error', e)

                    return Promise.reject('notfound')
                })
            },

            mercatox : function(){
                return axios.get(apis.mercatoxPrices).then(function(response) {

                    return f.getPkoinPrice(response.data, 'last_price')
                
                }).catch(e => {


                    return Promise.reject('notfound')
                })
            },

            digifinex : function(){
                return axios.get(apis.digifinex).then(function(response) {

                    var converted = {}
                    
                    _.each(f.deep(response, 'data.ticker') || [], function(c){
                        if (c.symbol && c.symbol.toUpperCase)
                            converted[c.symbol.toUpperCase()] = c
                    })

                    return f.getPkoinPrice(converted, 'last')

                }).catch(e => {

                    //console.log('bilaxy error', e)

                    return Promise.reject('notfound')
                })
            },

            /*bitforex : function(){
                 return axios.post(apis.bitforex).then(function(response) {

                     
                     const formatted_data = f.formatExchageKeys(response.data)

                     console.log("formatted_data", formatted_data)
                    
                     return f.getPkoinPrice(formatted_data, 'last')
                
                 }).catch(e => {

                    console.log("EE", e)

                     return Promise.reject('notfound')
                 })
            },*/
        }
       
    }

    self.getAveragePrice = function(market, prices, key) {
        if(history.prices[market].length === 0) return

        const price_keys = Object.keys(prices.prices)

        const price_history = history.prices[market]
        const history_length = history.prices[market].length

        let first_price
        if(price_history[history_length - 1]) {
            first_price = price_history[history_length - 1]? price_history[history_length - 1].prices :  null
        }

        let second_price
        if(price_history[history_length - 2]) {
            second_price = price_history[history_length - 2] ?  price_history[history_length - 2].prices : null
        }

        price_keys.forEach(item => {
            let current_price_value = parseFloat(prices.prices[item].data[key])
            let first_price_value = parseFloat(first_price[item].data[key])

            let second_price_value
            if(second_price) {
                second_price_value = parseFloat(second_price[item].data[key])
            }

            first_price_value = first_price_value ? first_price_value : current_price_value
            second_price_value = second_price_value ? second_price_value : current_price_value
            
            prices.prices[item].data[key] = ((current_price_value + first_price_value + second_price_value) / 3)

        })

        return prices
    }

    self.getHighestPrice = function() {
        const markets = Object.keys(keys)
        let currencies
        let currencies_length
        let prices = {}

        markets.forEach(item => {
            currencies_length = history.prices[item].length
            currencies = Object.keys(history.prices[item][currencies_length - 1])
            prices[item] =  history.prices[item][currencies_length - 1].data
        })

        
    },

    self.history = {
        prices : function(){
            var promises = _.map(self.api.price, function(r, i){
                return r().then(slice => {
                    if(!slice) return Promise.resolve()


                    if(!history.prices[i]) history.prices[i] = []

                    // let new_slice = self.getAveragePrice(i, slice, keys[i])

                    // if(!new_slice) {
                    //     history.prices[i].push(slice)
                    // } else {
                    //     history.prices[i].push(new_slice)
                    // }

                    history.prices[i].push(slice)
                    

                    history.prices[i] = f.lastelements(history.prices[i], 500)

                    hasdata = true

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
            }, 60000)
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

                return f.pretry(function(){
                    return hasdata
                }, 50, 10000).then(r => {
                    return Promise.resolve(history)
                })

                
            }
        }
    }


    return self
}

module.exports = Exchanges