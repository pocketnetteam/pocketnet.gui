process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0

var f = require('./functions');
var request = require('request');
var jsdom  	= require('jsdom');
var _ = require('underscore')
var jquery = {}
var ogParser = require("./lib/og-parser-edited.js");
var iconv = require('iconv-lite');
const autoenc = require('node-autodetect-utf8-cp1251-cp866');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var nremotelink = 'https://1.pocketnet.app/opengraph/parse'

var Remote = function(app){

	var self = this;
	var cache = [];
	
	var loading = {};
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
		fetch : function(uri, clbk, dontdecoding, options){

			var error = function(err){

				if (clbk)
					clbk(null, false)
			}

			var result = function(r){

				if(r.length > 100000){
					throw new Error('size limit');
				}

				if (!dontdecoding){

					var applyencoding = {
						//'cp1251' : true
					}
					
					var encoding = autoenc.detectEncoding(r).encoding;
	
					if (encoding && applyencoding[encoding]){

						//r = iconv.decode(r, encoding).toString();

						r = iconv.encode(iconv.decode(r, encoding), "utf8").toString();
					}
					else{


						r = r.toString();
					}

				}


				if (clbk)
					clbk(r)
			}

			fetch(uri, options || {})
			  .then(res => res.buffer())
			  .then(res => result(res))
			  .catch(err => error(err));
		},
		url : function(uri, clbk){
	    
			request({
				url : uri,
				timeout: 30000

			}, function (error, response, body) {

				var ishtml = response && response.headers && response.headers['content-type'] && response.headers['content-type'].indexOf('html') > -1;

			  
				if(!error)
				{
					var size = 1 *  1024 * 1024

					if(ishtml && (!response.headers['content-length'] || response.headers['content-length'] < size) && body.length < size)
						clbk(body)
					else
						clbk(null, false)
				}

				else
				{
					if (clbk)
						clbk(null, true)
				}

			});


		},

		all : function(link, clbk){

			if(errors[link]){

				if (clbk)
					clbk(null)	

				return
			}

			var html = load.cache(link);

			if (html){

				if (clbk)
					clbk(html.html)		
			}
			else
			{

				if(loading[link]){

					f.retry(function(){

						return !loading[link]

					}, function(){

						var html = load.cache(link);

						if (html){
							if (clbk)
								clbk(html, true)	
						}
						else
						{
							if (clbk)
								clbk(null)	
						}

					}, 100, 10000)
				}
				else
				{
					loading[link] = true

					load.fetch(link, function(html, ishtml){

						delete loading[link]

						if(html)
						{
							if(html.length > 500)
							{
								if (clbk)
									clbk(html)						
							}
							else{
								if (clbk)
									clbk(null)
							}				

						}
						else
						{
							
							if (clbk)
								clbk(null)
						}
					})
				}


				
			}

			
		},

		cache : function(url){
			return _.find(cache, function(c){
				return c.url == url
			})
		},

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

		og : function(uri, clbk){


			load.url(uri, function(r){

				if(r){

					try{


						ogParser(gethead(r), function(error, data) {


		
							if (error){
								errors[uri] = error

								if(_.toArray(errors[uri]).length > 1000) {
									errors = {}
								}

								if(clbk) clbk({})

								return
							}
			
							if(!data) data = {}
			
			
							var og = {}		
			
							if (data.og){
								og.type = data.og.type
								og.image = f.deep(data.og, 'image.url')
								og.video = data.og.video
								og.title = data.og.title
								og.description = data.og.description
							}
			
							
							if (data.meta){
								og.descriptionPage = data.meta.description
			
								if(!og.image){
									og.image = f.deep(data.meta, 'thumbnail.url') || data.meta.thumbnailUrl
								}
			
								if(!og.title){
									og.title = data.meta.name
								}
								
							}
			
							og.titlePage = data.title || ""
			
			
							/*if(!og.video){
								og.video = $('meta[property="og:video:url"]').attr('content')
							}*/
			
							if (og.type || og.image || og.video || og.title || og.description || og.descriptionPage || og.titlePage){
			
								if(clbk) clbk(og)
			
								return
							}
			
							if(clbk) clbk({})
			
						})
					}

					catch(e){
						errors[uri] = 'nc'

						if(clbk) clbk({})
					}

					
				}

				else{
					errors[uri] = 'nc'

					if(clbk) clbk({})
				}

				
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
						if (k.split(':').length)
							dn[k.split(':')[1]] = v
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

	self.charset = function(window, html, clbk){
		var charset = window.$('meta[charset]').attr('charset');

		if (clbk)
			clbk(window, html)

		
	}

	
	self.jsdom = function(html, clbk){
		try{

			jsdom.env(html, [jquery], function(errors, window) {


				if(!window)
				{
					if (clbk)
						clbk(null)
				}
				else
				{
					clbk(window, html);
				}
				

			
			})
		}

		catch (e){

			self.logger.w('remote', 'error', 'JSDOM', e)

			if (clbk)
				clbk(null)
		}
	}

	self.get = function(url, clbk){

		load.all(url, function(html, fromcache){


			if(html){

				if(!fromcache){

					if (cache.length > 3500){
						cache = _.last(cache, 3000)
					}

					cache.push({
						url : url,
						html : html
					})
				}
				
				self.jsdom(html, clbk)
			}

			else
			{

				errors[url] = true

				if (clbk)
					clbk(null)
			}


			

		})
	}

	self.og = function($){

		var og = {}		

		og.type = $('meta[property="og:type"]').attr('content')
		og.image = $('meta[property="og:image"]').attr('content')
		og.video = $('meta[property="og:video"]').attr('content')
		og.title = $('meta[property="og:title"]').attr('content')
		og.description = $('meta[property="og:description"]').attr('content')
	
		og.descriptionPage = $('meta[name="description"]').attr('content')
		og.titlePage = $('title').html()

		if(!og.video){
			og.video = $('meta[property="og:video:url"]').attr('content')
		}

		if (og.type || og.image || og.video || og.title || og.description || og.descriptionPage || og.titlePage){

			return og;
		}



	}

	self.corsajax = function(link, clbk, options){
		var response = load.cache(link);

		if (response) {
			if (clbk)
				clbk(response)
				
			return
		}

		if(loading[link]){

			retry(function(){

				return !loading[link]

			}, function(){

				var response = load.cache(link);

				if (response){
					if (clbk)
						clbk(response)	
				}
				else
				{
					if (clbk)
						clbk(null)	
				}

			}, 100, 10000)
		}
		else
		{
			loading[link] = true

			load.fetch(link, function(response, ishtml){

				delete loading[link]

				clbk(response || null)

				
			}, false, options)
		}


	}

	self.make = function(url, clbk){

		self.get(url, function(window, html){
		
			if(html && window.$){
				if(window.$){
					var og = self.og(window.$)

					var result = {
						og : og
					};

					if (clbk)
						clbk(null, result, html, window.$)
				}

				else
				{
					if (clbk)
						clbk('Remote content Fail', {})
				}
			}
			else
			{
				if (clbk)
					clbk('Remote content Fail', {})
			}

		})
	}

	self.nmake = function(url, clbk){
		load.ogcache(url, function(og){


			if (clbk){
				clbk(null, og)
			}

		})
	}

	self.clear = function(){
		cache = [];
		loading = {};
		errors = {};
		ogcache = [];
		ogloading = {};
	}


	self.info = function(){
		return {
			size : JSON.stringify(cache).length +  JSON.stringify(ogcache).length + 
				JSON.stringify(errors).length + 
				JSON.stringify(loading).length + 
				JSON.stringify(ogloading).length
				
		}
	}

	return self;
}


module.exports = Remote;

