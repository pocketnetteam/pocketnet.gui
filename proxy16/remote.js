process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0
var f = require('./functions');
var request = require('request');
var jsdom  	= require('jsdom');
var _ = require('underscore')

var path = require("path");
var jquery = path.resolve(__dirname, "lib/jquery-1.11.3.min.js")


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
								clbk(html, true)	
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


			if (clbk)
				clbk(null)
		}
	}

	self.get = function(url, clbk){

		load.all(url, function(html, fromcache){


			if(html){

				if(!fromcache){
					cache = _.last(cache, 3000)

					cache.push({
						url : url,
						html : html
					})
				}
				

				console.log("JSDOV")

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

	self.info = function(){
		return {
			size : f.roughSizeOfObject(cache)
		}
	}

	return self;
}


module.exports = Remote;

