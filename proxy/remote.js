process.setMaxListeners(0);

require('events').EventEmitter.defaultMaxListeners = 0


var fs     	= require('fs');
var request = require('request');
var jsdom  	= require('jsdom');

var path = require("path");
var jquery = path.resolve(__dirname, "./js/vendor/jquery-1.11.3.min.js")


//const phantom = require('phantom');
var iconv = require('iconv-lite');
const fetch = require('node-fetch'); 
const autoenc = require('node-autodetect-utf8-cp1251-cp866');

var Remote = function(app){

	var self = this;


	var cache = [];

	var phlinks = [];

	var loading = {};
	var errors = {};

	var load = {
		fetch : function(uri, clbk, dontdecoding, options){

			var error = function(err){

				if (clbk)
					clbk(null, false)
			}

			var result = function(r){

				if(r.length > 1000000){
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

					var size = 1.5 *  1024 * 1024

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
		/*
			phantom : function(link, clbk){

				phlinks.push(link);

				var _clbk = function(d){

					instance.exit();

					var i = _.findIndex(phlinks, function(f){
						return f == link
					})

					phlinks.splice(i,1);

					if (clbk)
						clbk(d)
				}
			
			
				var nolog = function(){}

				var make = function(page, instance){

					var opened = false;
					
					page.property('content').
					
					then(content => {

						if(!opened){

							opened = true;

							instance.exit();

							if(content)
							{

								var domloaded = false;

								setTimeout(function(){

									if(!domloaded){

										domloaded = true;

										instance.exit();

										_clbk(null);

									}


								}, jsdomtimeout)

								try{
									jsdom.env({
										html: content,
										src: [
											jquery
										],
										done: function(errors, window) {


											if(!domloaded){
												domloaded = true;

												if(!window)
												{
													_clbk(null)
												}
												else
												{
													_clbk(window);
												}
											}

										}
									})
								}
								catch (e)
								{
									
								}
								

								
							}

							else
							{
								_clbk(null);
							}	
						}

						

					})
					.catch(error => {

						if(!opened){

							opened = true;

							instance.exit();

							_clbk(null);

						}
						
					});

					setTimeout(function(){

						if(!opened){

							opened = true;

							instance.exit();

							_clbk(null);

						}


					}, getcontentTimeout)

				}

				var timeout = 20000;
				var jsdomtimeout = 5000;
				var loadTimeout = 40000;
				var getcontentTimeout = 10000;
				var linterval = null;
				var opened = false;

				var instance,
					page;

				var requestsArray = [];

				var waitResourses = function(page, instance){
					var intervalTime = 500;

					var interval = setInterval(function () {

						if (requestsArray.length === 0 || timeout <= 0) {

							clearInterval(interval);	

							make(page, instance);	
								
						}

						timeout = timeout - intervalTime;

					}, intervalTime);
				}

				const phinstance = phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'], {
					logLevel : 'error',
					logger: { warn: nolog, debug: nolog, error: nolog }
				}).

				then(_instance => {

					instance = _instance;

					return instance.createPage();
				})

				.catch(error => {

					if(!opened){
						opened = true;

						instance.exit();

						_clbk(null);
					}
				}).

				then(_page => {				

					page = _page;

					_page.on('onResourceRequested', function (requestData, networkRequest) {

						requestsArray.push(requestData.id)
					});

					_page.on('onResourceReceived', function (requestData, networkRequest) {
						var index = requestsArray.indexOf(requestData.id);
						requestsArray.splice(index, 1);
					});			

					return _page.open(link)

				})

				.catch(error => {

					if(!opened){
						opened = true;


						instance.exit();

						_clbk(null);
					}

					
				})

				.then(status =>{


					if(!opened){
						opened = true;

						if(status != 'success'){

							_clbk(null);
						}

						else
						{

							waitResourses(page, instance);			
							
						}
					}

				})
					
				.catch(error => {

					if(!opened){

						opened = true;

						instance.exit();

						_clbk(null);
					}
				});
				

				setTimeout(function(){

					if(!opened){

						opened = true;

						instance.exit();

						_clbk(null);

					}


				}, loadTimeout)

			},

		*/

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

					retry(function(){

						return !loading[link]

					}, function(){

						var html = load.cache(link);

						if (html){
							if (clbk)
								clbk(html)	
						}
						else
						{
							if (clbk)
								clbk(null)	
						}

					}, 100)
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
		}
	}

	self.charset = function(window, html, clbk){
		var charset = window.$('meta[charset]').attr('charset');

		if (clbk)
				clbk(window, html)

		return

		if (charset != 'utf-8'){

			var body = new Buffer(html, 'binary');

	        var conv = iconv.encode(iconv.decode(body, 'win1251'), 'utf8');

	        self.jsdom(conv, clbk)
		}
		else
		{
			if (clbk)
				clbk(window, html)
		}
	}

	self.jsdom = function(html, clbk){
		try{
			jsdom.env({
			    html: html,
			    src: [
			      	jquery
			    ],
			    done: function(errors, window) {

			    	if(!window)
			   		{
			   			if (clbk)
							clbk(null)
			   		}
			   		else
			   		{
			   			clbk(window, html);
			   		}
			    	

			    }
			})
		}

		catch (e){

			if (clbk)
				clbk(null)
		}
	}

	self.get = function(url, clbk){

		load.all(url, function(html){

			if(html){

				cache = lastEls(cache, 1000);

				cache.push({
					url : url,
					html : html
				})

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

		var charset = $('meta[charset]').attr('charset');

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

			/*if(charset && charset != 'utf-8'){

				var input = charset;

				if (charset == 'windows-1251') input = "win1251"

				_.each(og, function(v,k){

					if (v)

						og[k] = iconv.decode(v, input);

				})
			}*/

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

			}, 100)
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
		var meta = app.platform.parseUrl(url);

		self.get(url, function(window, html){

			var err = null;

			if(html && window.$){

				self.charset(window, html, function(){

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

					

				})

				
			}
			else
			{
				if (clbk)
					clbk('Remote content Fail', {})
			}

		})
	}

	return self;
}


module.exports = Remote;

