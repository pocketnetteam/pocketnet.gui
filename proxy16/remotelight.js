
var f = require('./functions');
var request = require('request');
var _ = require('underscore')

var nremotelink = 'https://1.pocketnet.app/opengraph/parse'

var Remote = function(app){

	var self = this;
	var errors = {};
	var ogcache = [];
	var ogloading = {};

	var hexEncode = function(text)
	{
	    var ch = 0;
	    var result = "";

		if(!text || !text.length) return ""

	    for (var i = 0; i < text.length; i++)
	    {
	        ch = text.charCodeAt(i);
	        if (ch > 0xFF) ch -= 0x350;
	        ch = ch.toString(16);
	        while (ch.length < 2) ch = "0" + ch;
	        result += ch;
	    }
	    return result;
	}

	var gethead = function(body){

		if(!body) return ''
		
		var match = body.toLowerCase().match(/<head>[\s\S]*?<\/head>/gi)


		if(match && match[0]){
			return "<!DOCTYPE html><html>" + match[0] + "<body>abs</body></html>"
		}

		return ''
	}

	var load = {
		



		ogcache : function(uri, clbk){
			if(errors[uri]){

				if (clbk)
					clbk({})	

				return
			}

			var dt = load.fromogcache(uri);

			if (dt){
				if (clbk)
					clbk(dt.og)	

				return
			}

			if(ogloading[uri]){

				f.retry(function(){

					return !ogloading[uri]

				}, function(){

					var dt = load.fromogcache(uri) || {}

					if (clbk)
						clbk(dt.og || {})	

				
				}, 100, 10000)
			}
			else{
				ogloading[uri] = true

				load.ogs(uri, function(og){
					if(_.isEmpty(og)){
						load.ogf(uri, function(og){

							if (ogcache.length > 3500){
								ogcache = _.last(ogcache, 3000)
							}
		
							delete ogloading[uri]
		
							ogcache.push({
								url : uri,
								og : og
							})
		
							if (clbk)
								clbk(og)	
						})
					}
					else{

						if (ogcache.length > 3500){
							ogcache = _.last(ogcache, 3000)
						}
		
						delete ogloading[uri]
	
						ogcache.push({
							url : uri,
							og : og
						})

						
						if (clbk)
							clbk(og)
					}
				})

				
			}
		},

		fromogcache : function(uri){
			return _.find(ogcache, function(c){
				return c.url == uri
			})
		},

		ogs : function(uri, clbk){

			if(!uri){
				
				if (clbk){
					clbk({})
				}

				return
			}

			request({
				uri : nremotelink + '?url=' + uri + '&validate=false',
				timeout : 30000,
				type : "POST"
			}, function(error, response, body){

				if (error){
					errors[uri] = 'nc'

					if (clbk){
						clbk({})
					}

					return
				}

				var d = {}
				var dn = {}

				try{
					d = JSON.parse(body || "{}")

					_.each(d, function(v, k){
						
						if (k.split(':').length > 1)
							dn[k.split(':')[1]] = v

						else
							dn[k] = v
					})
					//d = d.data || {}
				}
				catch(e){
				}




				if (clbk){
					clbk(dn || {})
				}
			})
		},

		ogf : function(uri, clbk){

			if(!uri){

				if (clbk){
					clbk({})
				}

				return
			}

			request({
				uri : 'https://pocketnet.app:8888/urlPreview?url=' + hexEncode(uri),
				timeout : 30000,
				type : "POST"
			}, function(error, response, body){

				if (error){
					errors[uri] = 'nc'

					if (clbk){
						clbk({})
					}

					return
				}

				var d = {}

				try{
					d = JSON.parse(body || "{}")
					d = d.data || {}
				}
				catch(e){
				}

				if (clbk){
					clbk(d.og || {})
				}
			})
		}
	}


	self.nmake = function(url, clbk){
		load.ogcache(url, function(og){

			if (clbk){
				clbk(null, og)
			}

		})
	}

	self.clear = function(){
		errors = {};
		ogcache = [];
		ogloading = {};
	}


	self.info = function(){
		return {

			size : ogcache.length,
			loading : _.toArray(ogloading).length,
			errors : _.toArray(errors).length
				
		}
	}

	return self;
}


module.exports = Remote;

