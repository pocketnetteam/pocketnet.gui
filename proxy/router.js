var Router = function(p){
	var self = this;
	var Joi = require("joi");

	var logs = [];
	var stat = [];
	var countlogs = 2000;
	var statcount = 5000;
	var statInterval = null;

	var headers = {
		"Access-Control-Allow-Origin" : "*",
		"Content-Type" : "application/json"
	}

	var errors = {
		"400" : function(p){
			return "Broken Parameters"
		},		
		"401" : function(p){
			return "Not Authorizated"
		},
		"402" : function(p){
			return "Incorrect payment details"
		},
		"403" : function(p){
			return "Unathorizated"
		},
		"404" : function(p){
			return "No request handler found for " + p.pathname
		},
		"523" : function(p){
			return "Node not found"
		},
		"500" : function(p){
			return "Internal Error"
		},
		"521" : function(p){
			return "Node Error"
		},
	}

	var addLogs = function(parameters, ip, status, pathname){
		
		logs.push({
			p : _.clone(parameters),
			ip : ip,
			s : status,
			pn : pathname,
			date : new Date()
		})


		var d = logs.length - countlogs

		if (d > 100){
			logs = logs.slice(d)
		}
	}

	var addStats = function(){

		var ws = {};

		if(self.ws) ws = self.ws.stat();

		var data = {
			ws : ws,
			time : new Date()
		}

		data.requestsIp = _.toArray(group(logs, function(l){
			return l.ip
		})).length

		if (p.iplimiter) {
			data.iplimiter = p.iplimiter.stat()
		}

		stat.push(data)

		var d = stat.length - statcount

		if (d > 100){
			stat = stat.slice(d)
		}
	}

	var validation = function(handle, p, clbk){

		if(typeof handle.schema == 'undefined')
		{	
			clbk();
		}
		else
		{
			var val = function(jObj, clbk){
				Joi.validate(p.parameters, jObj, {}, (err, val) => {

					clbk(err);
				});
			}

			actionsByType(handle.schema, {

				array : function(array){

					var validate = false;
					var _err = null

					lazyEach({
						array : array,
						action : function(p){
							var schema = p.item;

							var jObj = Joi.object().keys(schema);

							val(jObj, function(err){

								if(!err) validate = true;
								else _err = err;

								p.success();

							})

						},
						all : {
							success : function(){
								
								if(validate)
								{
									clbk();
								}
								else

									clbk(_err);
								
							}
						}
					})
				},

				object : function(schema){

					var jObj = Joi.object().keys(schema);

					val(jObj, clbk)
				}

			})


			
		}
	} 

	

	var authorization = function(handle, p, clbk){

		if(handle.authorization){

			if(handle.authorization == 'signature'){

				if(!p.parameters.signature){
					clbk({
						status : 401
					});
				}
				else{

					p.parameters.signature = JSON.parse(p.parameters.signature)

					var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(p.parameters.signature.pubkey, 'hex'))
					var hash = Buffer.from(p.parameters.signature.nonce, 'utf8')
					var verify = keyPair.verify(hash, Buffer.from(p.parameters.signature.signature, 'hex')) && 

						p.parameters.signature.address == p.app.platform.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;


					if (handle.addresses && handle.addresses.length){

						if(_.indexOf(handle.addresses, p.parameters.signature.address) == -1) verify = false;

					}

					if(!verify){
						clbk({
							status : 401
						});
					}
					else{
						clbk();
					}
				}

				return;
			}

			clbk();
		}
		else{
			clbk();
		}

		

		

	}

	var zip = function(status, data, p){
		if(!data) data = {};


		var error = errors[status];

		if (typeof error == "function") error = error(p)

		var result = {
			statusCode : status,
			status : '',
			data : data,
			token : p.token || null,
			error : error || null
		};

		if(status == 200){
			result.status = "success";
		}
		else
		{
			if(status == 521 || status == 523){
				result.status = "node";
			}
			else{
				result.status = "fail";
			}

		}


		return  JSON.stringify(result);
	}

	var iplimiter = function(_p, clbk){

		if (p.iplimiter){

			p.iplimiter.check(_p.ip, clbk)

		}
		else{

			if (clbk)
				clbk()

		}
	}

	var route = function(p) {

		if(!p) p = {};

		p.responseFail = function(status, p){
			p.response.writeHead(status.toString(), headers);

			console.log("FAIL", zip(status, p.data || "", p))

			p.response.write(zip(status, p.data || "", p));

			p.response.end();

			addLogs(p.parameters, p.ip, status, p.pathname)
		}

		p.responseSuccess = function(_return){

			_return.status 	|| (_return.status = 200);			
			_return.headers || (_return.headers = {});
			_return.headers = _.extend(headers, _return.headers);

			p.response.writeHead(_return.status.toString(), _return.headers);
			p.response.write(zip(_return.status, _return.data, p));
			p.response.end();	   

			
			addLogs(p.parameters, p.ip, _return.status, p.pathname)
		}

		iplimiter(p, function(error){

			if (error){

				p.responseFail(429, p);
			}

			else{

				var handle = deep(p.handles, p.pathname.split('-')[0])
		
				if (typeof handle === 'object' && handle.action) {
			
					p.handle = handle;
			
					validation(p.handle, p, function(err){
			
						if(err)
						{
							p.data = err;
							p.responseFail(400, p);
			
							return;
						}
			
						authorization(p.handle, p, function(err){
			
							if(err)
							{
								p.responseFail(err.status, p);
			
								return;
							}
			
							if(p.user)
			
								p.user.createToken(function(token){
									p.token = token;
									p.handle.action(p)
								})
			
							else
							{
								p.logs = logs;
								p.handle.action(p);
							}
			
							
						})
					})
			
				} 
				else 
				{
					p.responseFail(404, p);		
				}
			}
			
		
		

		})

	}

	self.init = function(){

		if (statInterval)
			clearInterval(statInterval)

		statInterval = null;

		statInterval = setInterval(function(){
			addStats()
		}, 10000)

		return self
	}

	self.stats = function(){
		return stat;
	}

	self.route = route

	

	return self.init();
}



module.exports = Router;