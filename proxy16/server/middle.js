var _ = require('lodash');
var useragent = require('express-useragent');
var f = require('../functions');

var Middle = function(){

    var self = this

    var countlogs = 15000
    var logs = []

    var requestcountFinished = 0
    var requestcountTotal = 0

    var addLogs = function(parameters, ip, status, pathname, start){
		
		logs.push({
			//p : _.clone(parameters),
			ip : ip,
			s : status,
			pn : pathname,
			date : new Date(),
            start : start
		})

        requestcountFinished++

		var d = logs.length - countlogs

		if (d > countlogs / 10){
			logs = logs.slice(d)
		}
    }

    self.clear = function(){
        logs = []
    }

    var countLast5Seconds = function(){

        var eventschecktime = 5000

        var s = f.date.addseconds(new Date(), - eventschecktime / 1000)
        var l = logs.length
        var c = 0

        if(l){
            while (l && logs[l - 1].date > s){
                c++
                l--
            }
        }

        return c
    }

    var rate = function(){

        var eventschecktime = 10000

        var s = f.date.addseconds(new Date(), - eventschecktime / 1000)
        var l = logs.length
        var c = 0

        if(l){
            while (l && logs[l - 1].date > s){
                c++
                l--
            }
        }

        return c / (eventschecktime / 1000)
    }

    self.printstats = function(){

        return

        console.log("")
        console.log("_____________________________________")
        console.log("Total Requests count:", requestcountTotal)
        console.log("Finished Requests count:", requestcountFinished)
        console.log("5 Sec. Finished Requests count:", countLast5Seconds())
        console.log(rate() + ' RPS')
    }
    
    self.info = function(compact){
        
        var requestsIp = _.toArray(f.group(logs, function(l){
            return l.ip
        })).length

        var byCodes = {}

        var rpclogs = _.filter(logs, function(l){
            if(l.pn && l.pn.indexOf('rpc/') > -1){
                return true
            }
        })        


        _.each(f.group(rpclogs, function(l){
            return l.s
        }), function(lc, code){

            byCodes[code] = {
                length : lc.length,
                code : code
            }

        })

        var signatures = {}

        _.each(f.group(logs, function(l){
            if( l.p && l.p.signature){
                return 'exist'
            }
            else{
                return 'empty'
            }
        }), function(lc, code){

            signatures[code] = {
                length : lc.length,
                code : code
            }

        })

        var data = {
            requestsIp : requestsIp,
            responses : byCodes,
            signatures : signatures,
            rate : rate()
        }

        if(!compact) data.logs = _.clone(logs)

        return data
    }

    self.getlogs = function(){
        return logs
    }

  
    self.headers = function(request, result, next){

        result.setHeader('Access-Control-Allow-Origin', '*');
        result.setHeader('Access-Control-Max-Age', '7200');
        result.setHeader('Strict-Transport-Security', 'max-age=31536000');
        result.setHeader("Access-Control-Allow-Methods", "GET, POST");
        result.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        result.set('Cache-control', 'public, max-age=20')

        
        if (next) 
            next(null)
    }

    self.extendlight = function(request, result, next){
        
        result._success = function(data, code){
            if(!code) code = 200
            result.status(code).jsonp({
                result : 'success',
                data : data
            })
        }
    
        result._fail = function(error, code){

            if(!code) code = 500
            if(code < 100) code = 500

            result.status(code).jsonp({
                error : error,
                code : code
            })
        }
    
        if (next)
            next(null)
    
    }

    var clearreq = function(request, result){

        delete result._success
        delete result._fail
        delete request.clientIP

        request.data = {}

    }

    self.extend = function(request, result, next){
        var start = new Date()

        result._success = function(data, code, s, formatdata){

            if(!code) code = 200

            var jsonp = formatdata ? formatdata(data) : {
                result : 'success',
                data : data
            }

            if (s && s.node && s.node.key){
                jsonp.node = s.node.key
            }

            if (s && s.time){
                jsonp.time = s.time
            }
           
            try{
                result.status(code).jsonp(jsonp)

                addLogs(request.data, request.clientIP, code, request.baseUrl + request.path, start)
            }  
            
            catch(e){
                result.status(500).jsonp({
                    code : 500
                })
            }

            
            clearreq(request, result)
        }
    
        result._fail = function(error, code){

            if(!code) code = 500

            if(code < 100) code = 500

            try{
                result.status(code).jsonp({
                    error : error,
                    code : code
                })

                addLogs(request.data, request.clientIP, code, request.baseUrl + request.path, start)
            }  
            
            catch(e){

                result.status(500).jsonp({
                    code : 500
                })

            }

            clearreq(request, result)
        }
    
        if (next)
            next(null)
    
    }
    
    self.data = function(request, result, next){
     
        request.data = _.merge(request.query, request.body)
        
        /*_.each(request.data, function(v, key){
    
            if(v && v[0] && (v[0] == "{" || v[0] == "[")){
                try{
                    console.log("PARSE")
                    request.data[key] = JSON.parse(v)
                }
                catch(e){
                    
                }
            }
        })*/

        request.data.ip = request.clientIP
        //request.data.ua = request.clientUA || {}


        delete request.data.U
        delete request.data.A

        if (next)
            next(null)
    }
    
    self.bearer = function(request, result, next){
    
        if (request.headers){
            var s = request.headers['authorization'] || '';
            var apikey = s.replace('Bearer ', '') || ''
    
            if(!request.data) request.data = {}
    
            if (apikey){
                request.data.apikey = apikey  
            }
        }
    
        if (next) 
            next(null)
    }
    
    self.uainfo = function(request, result, next){
    
        if(!request.headers) return

        /*var ua = {}
    
        var source = request.headers['user-agent'];

        if (source){
            ua = useragent.parse(source);
        }*/
    
        var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || "::1";
    
        request.clientIP = ip
        //request.clientUA = ua
    
        if (next) 
            next(null)
    }

    self.lightnext = function(request, result, next){

        var n = false
        
        if(request){
            n = request.originalUrl ==  '/ping'
        }

        if(n) {

            self.extendlight(request, result)
            self.headers(request, result)
            next(null)
        }

        return n
    }
    
    self.prepare = function(request, result, next){

        requestcountTotal++

        if (requestcountTotal >= 500000) {
            requestcountTotal = 0
            requestcountFinished = 0
        }

        if(self.lightnext(request, result, next)) return

        self.headers(request, result)
        self.uainfo(request, result)
        self.data(request, result)
        self.extend(request, result)
        self.bearer(request, result)
    
        if (next) 
            next(null)
    }

    

    return self
}

module.exports = Middle