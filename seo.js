process.setMaxListeners(0);

require('events').EventEmitter.defaultMaxListeners = 0;

var jsdom  		= require('jsdom');
var fs     		= require('fs');
var map = require('./js/_map');
var lazyEach 	= require('lazyEach');

var jquery = fs.readFileSync("./js/vendor/jquery-1.11.3.min.js").toString();
var _html = fs.readFileSync("index.html").toString();

//GLOBAL
	
	_Node = true;
	_SEO = true;
	_SEOuri = '';
	_ = require("underscore");

	request = require('request');

var destination = 'snapshots';

var environment = function(clbk){

	var html = function(clbk){

		jsdom.env({
			html: _html,
			src: [
				jquery
			],
			done: function(errors, _window) {

				window = _window;

			  	$ = window.$;
			  	jQuery = $;

			  	document = window.document;
			  	navigator = window.navigator;

				
				if (clbk)
					clbk();
			}
		});

	}

	var scripts = function(clbk){		

		require("./js/vendor/tooltipster.core.js");
        require("./js/vendor/tooltipster.bundle.js");
        require("./js/vendor/jquery-ui.min.js");
        require("./js/vendor/sha1.js");
        require("./js/vendor/pbkdf2.js");
        require("./js/vendor/timer.js");

        _.each(map.__sources, function(src){
			require('./' + src);
		})

		

		if (typeof Application != 'undefined')
		{
			app = new Application();

			app.initClbk = clbk;

			app.deviceReadyInit();
		}

		else

			if (clbk)
				clbk();
	}

	html(function(){
		scripts(clbk)
	})
	
}

var crawl = {
	load : function(link, clbk){

		console.log("LOAD PAGE", link)

		_SEOuri = link;

		app.nav.api.go({
			clbk : function(){

				if (clbk)
					clbk();
			},

			href : link,
			open : true,
			history : true

		})

	},	
	page : function(clbk, link){

		if(!link)
			link = ''

		var html = crawl.takeHtml(link);

		if(!link){
			html = html.replace('<meta name="fragment" content="!">', '')
		}

		save.page(crawl.path(link), html, function(err){

			var links = find.links();

			clbk(links)

		})

	},

	takeHtml : function(link){
		var html = $('#content').html();

		if(!link)
			html = $('html').html();

		return clearScripts(html);
	},

	process : function(links, clbk){
		lazyEach({
			array : links,
			sync : true,
			action : function(p){
				var link = p.item;

				crawl.check(link, function(exists){

					if (exists){

						p.success();
					}

					else
					{
						crawl.load(link, function(){

							crawl.page(function(newLinks){

								crawl.process(newLinks, p.success)

							}, link)

						})

						
					}	

				})
			},

			all : {
				success : clbk
			}
		})
	},

	path : function(link){

		return 'snap_' + encodeSeoLinks(link) + '.html'

	},

	check : function(link, clbk){

		var path = destination + "/" + crawl.path(link);

		fs.exists(path, function (exists) { 

			clbk(exists)

		})
	}
}

var find = {
	links : function(){

		var links = [];

		$('html a').each(function(){

			var href = $(this).attr('href')

			var href = decodeSeoLinks(href);

			if (href.indexOf("#!") > -1){
				links.push(href.replace("#!", ""));
			}

		})

		console.log(links)

		return links;
	}
}

var helpers = {
	deleteFolder : function(path) {

		if (fs.existsSync(path)) {
		    fs.readdirSync(path).forEach(function(file, index){

		    	var curPath = path + "/" + file;

		    	if (fs.lstatSync(curPath).isDirectory()) {

		    		helpers.deleteFolder(curPath);

		    	} else {

		    		fs.unlinkSync(curPath);

		    	}

		    });

	    fs.rmdirSync(path);

	  	}
	}

}

var save = {

	prepare : function(folderPath, clbk){
		fs.exists(folderPath, function (exists) { 

			if(exists){
				if (clbk)
					clbk();
			}

			else
			{
				fs.mkdir(folderPath, function() {
					if (clbk)
						clbk();
				})
			}

		});
	},

	clear : function(clbk){

		helpers.deleteFolder(destination);

		clbk()
	},

	page : function(path, html, clbk){

		path = destination + "/" + path;

		fs.writeFile(path, html, clbk);

	}
}

var run = function(){

	environment(function(){

		crawl.page(function(links){

			crawl.process(links, function(){
				console.log("ALLSUCCESS")
			})

		});

	});

}

save.clear(function(){
	save.prepare(destination, run)
})
