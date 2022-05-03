const { zip } = require('underscore');
var f = require('./functions');

var Exchanges = function(){
    var self = this
    var hasdata = false

    var history = {
        prices : {}
    }

    var keys = {
        //'mercatox' : 'last_price',
        //'bilaxy' : 'close',
        'bitforex' : 'last',
        'digifinex' : 'last'
    }

    var apis = {
        //'mercatox' : 'https://mercatox.com/api/public/v1/ticker',
        //'bilaxy' : 'https://newapi.bilaxy.com/v1/ticker/24hr',
        'bitforex' : 'https://www.bitforex.com/server/market.act?cmd=searchTickers&type=all',
        'digifinex' : 'https://openapi.digifinex.vip/v3/ticker'
    }

    var followInterval = null

    self.api = {
        price : {
            bilaxy : function(){
                return self.transports.axios.get(apis.bilaxy).then(function(response) {

                    return f.getPkoinPrice(response.data, 'close')

                }).catch(e => {

                    //console.log('bilaxy error', e)

                    return Promise.reject('notfound')
                })
            },

            /*mercatox : function(){
                return self.transports.axios.get(apis.mercatox).then(function(response) {

                    return f.getPkoinPrice(response.data, 'last_price')

                }).catch(e => {


                    return Promise.reject('notfound')
                })
            },*/

            digifinex : function(){
                return self.transports.axios.get(apis.digifinex).then(function(response) {

                    var converted = {}

                    _.each(f.deep(response, 'data.ticker') || [], function(c){
                        if (c.symbol && c.symbol.toUpperCase)
                            converted[c.symbol.toUpperCase()] = c
                    })

                    return f.getPkoinPrice(converted, 'last')

                }).catch(e => {

                    //console.log('digifinex error', e)

                    return Promise.reject('notfound')
                })
            },

            bitforex : function(){
                 return self.transports.axios.post(apis.bitforex).then(function(response) {


                    var formatted_data = f.formatExchageKeys(response.data)

                    var pkoinusdt = formatted_data.DATA['coin-usdt-pkoin']

                    if(!pkoinusdt){
                        return reject('notfound')
                    }

                    formatted_data = {
                        'PKOIN_USDT' : pkoinusdt
                    }

                    return f.getPkoinPrice(formatted_data, 'last')

                 }).catch(e => {


                     return Promise.reject('notfound')
                 })
            },
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

                    history.prices[i].push(slice)
                    history.prices[i] = f.lastelements(history.prices[i], 100)



                    return Promise.resolve()

                }).catch(e => {

                    return Promise.resolve()
                })

            })

            return Promise.all(promises).then(r => {

                var common = {
                    date : f.now(),
                    prices : {
                    }
                }

                var m = {}

                _.each(history.prices, function(v, i){
                    if (i == 'common') return

                    if (v.length) {
                        var pr = v[v.length - 1]

                        _.each(pr.prices, function(p, i){

                            if(p && p.data && p.data.last && p.currency){
                                m[i] || (m[i] = 0)

                                m[i] ++

                                common.prices[i] || (common.prices[i] = {
                                    currency : p.currency,
                                    data : {}
                                })

                                common.prices[i].data.last || (common.prices[i].data.last = 0)

                                common.prices[i].data.last += Number(p.data.last)
                            }

                        })
                    }
                })

                _.each(common.prices, function(p, i){
                    if(m[i]){
                        p.data.last = p.data.last / m[i]
                    }
                })

                if(!history.prices.common) history.prices.common = []

                history.prices.common.push(common)

                hasdata = true

                return Promise.resolve()


            }).catch(e => {
                return Promise.resolve()
            })
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

                return f.pretry(function(){
                    return hasdata
                }, 50, 35000).then(r => {

                    return Promise.resolve(history)
                })


            }
        }
    }


    return self
}

module.exports = Exchanges
