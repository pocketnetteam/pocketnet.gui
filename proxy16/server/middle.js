var _ = require('lodash');
var useragent = require('express-useragent');
var f = require('../functions');

var Middle = function(){

    var self = this

    var countlogs = 100000
    var logs = []

    var addLogs = function(parameters, ip, status, pathname){
		
		logs.push({
			p : _.clone(parameters),
			ip : ip,
			s : status,
			pn : pathname,
			date : f.now()
		})

		var d = logs.length - countlogs

		if (d > countlogs / 1000){
			logs = logs.slice(d)
		}
    }

    self.clear = function(){
        logs = []
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
            if(f.deep(l, 'p.signature')){
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
            signatures : signatures
        }

        if(!compact) data.logs = logs

        return data
    }

    self.getlogs = function(){
        return logs
    }

  
    self.headers = function(request, result, next){
        result.setHeader('Access-Control-Allow-Origin', '*');
        result.setHeader("Access-Control-Allow-Methods", "GET, POST");
        result.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (next) 
            next(null)
    }

    self.extend = function(request, result, next){
        
        result._success = function(data, code){

            if(!code) code = 200

            result.status(code).jsonp({
                result : 'success',
                data : data
            })

            addLogs(request.data, request.clientIP, code, request.baseUrl + request.path)
    
        }
    
        result._fail = function(error, code){

            

            if(!code) code = 500

            if(code < 100) code = 500

            result.status(code).jsonp({
                error : error,
                code : code
            })

            addLogs(request.data, request.clientIP, code, request.baseUrl + request.path)
    
        }
    
        if (next)
            next(null)
    
    }
    
    self.data = function(request, result, next){
        request.data = _.merge(request.query, request.body)
        
        _.each(request.data, function(v, key){
    
            if(v && v[0] && (v[0] == "{" || v[0] == "[")){
                try{
                    request.data[key] = JSON.parse(v)
                }
                catch(e){
                    
                }
            }
        })

        request.data.ip = request.clientIP
        request.data.ua = request.clientUA
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
    
        var source = request.headers['user-agent'],
            ua = useragent.parse(source);
    
        var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    
        request.clientIP = ip
        request.clientUA = ua
    
        if (next) 
            next(null)
    }
    
    self.prepare = function(request, result, next){


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