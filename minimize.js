fs = require('fs');
_ = require('underscore');
var package = require('./package.json');

require('./js/functions.js');
var uglifyJS = require("uglify-js");
var uglifycss = require('uglifycss');
var ncp = require('ncp').ncp;
const _path = require('path');
ncp.limit = 16;

var args = {
	test : false,
	prodaction : true,
	vendor : 89,
	path : '/'
}

var uglify = true


var argcli = _.filter(process.argv, function(a){
	return a.indexOf('-') == 0
})

_.each(argcli, function(a){
	var prs = a.replace('-', '').split('=')

	if(!prs[0]) return

	if(!prs[1]) return

	try{
		args[prs[0]] = JSON.parse(prs[1])
	}
	catch(e){
		args[prs[0]] = prs[1]
	}
	
})

var mapJsPath = './js/_map.js';

console.log("run")
console.log(args)

var tpls = ['embedVideo.php', 'index_el.html', 'index.html', 'index.php', 'indexcordova.html', 'openapi.html', /*'.htaccess',*/ 'service-worker.js', 'manifest.json']
	

var vars = {
	test : {
		proxypath : '"https://test.pocketnet.app:8899/"',
		domain : 'test.pocketnet.app',
		test : '<script>window.testpocketnet = true;</script>',
		path : args.path
	},
	prod : {
		proxypath : '"https://pocketnet.app:8899/"',
		domain : 'pocketnet.app',
		test : '',
		path : args.path
	}
}


var VARS = args.test ? vars.test : vars.prod

fs.exists(mapJsPath, function (exists) { 
	if(exists) {

		var m = require(mapJsPath);

		var modules = {
			data : "",
			path : './js/mdls.js'
		}

		var join = {
			data : "",
			path : './js/join.min.js',
			append : "\n /*_____*/ \n ; window.pocketnetJoinLoaded = true;"
		}

		var joinfirst = {
			data : "",
			path : './js/joinfirst.min.js'
		}

		var joinlast = {
			data : "",
			path : './js/joinlast.min.js'
		}

		var vendor = {
			data : "",
			path : './js/vendor.min.js'
		}

		var tempates = {
			data : ""
		}

		var cssmaster = {
			data : "",
			path : './css/master.css'
		}

		var exported = {
			data : "",
			path : '../matrix/src/components/events/event/metaMessage/exported.less'
			// path : './css/exported.less'
		}

		var cordova = {
			path : './cordova/www',
			copy : ['chat', 'components', 'css', 'images', 'img', 'js', 'localization', 'peertube', 'res', 'sounds', 'browserconfig.xml', 'crossdomain.xml', 'favicon.svg', 'indexcordova.html']
		}

		var cordovaiosfast = {
			path : './cordova/platforms/ios/www',
			copy : ['chat', 'components', 'css', 'images', 'img', 'js', 'localization', 'peertube', 'res', 'sounds', 'browserconfig.xml', 'crossdomain.xml', 'favicon.svg', 'indexcordova.html']
		}


		var _modules = _.filter(m, function(_m, mn){
			if(mn != "__sources" && mn != "__css" && mn != '__vendor' && mn != '__templates'  && mn != '__sourcesfirst' && mn != '__sourceslast') return true;
			
		})

	

		/*JOIN MODULES*/

		var makePocketnet = function(_clbk){
			lazyEach({
				syncCallbacks : true,
				array : _modules,
				action : function(p){
	
					var module = p.item;
	
					var path = module.path || './';
	
					var _csspath = (module.csspath || module.path) || './';
	
					if(module.csspath) _csspath = "." + _csspath
	
					path = path.replace("..", '.')
					_csspath = _csspath.replace("..", '.')
				
					var modulepath = path + 'components/' + module.uri + '/index.js';
					var csspath = _csspath + 'components/' + module.uri + '/index.css';
	
					fs.exists(modulepath, function (exists) {
						if(exists){
	
	
							fs.readFile(modulepath, function read(err, data) {
								if (err) {
									throw err;
								}
	
								var minified = uglifyJS.minify(data.toString(), {
									compress: {
										passes: 2
									}
								})
	
								
								
	
								if(!minified.error && uglify){
									data = minified.code
								}
								else
								{
									console.log('UglifyJS Fail: ' + minified.error, modulepath)
								}
								
	
								modules.data = modules.data + "\n /*_____*/ \n" + data;
	
								fs.exists(csspath, function (exists) {
									if(exists){
	
										console.log(csspath)
	
										fs.readFile(csspath, function read(err, data) {
											if (err) {
												throw err;
											}
	
											data = data.toString().replaceAll("../..", "..");
	
											cssmaster.data = cssmaster.data + "\n" + "/*" + csspath +"*/\n" + data;
											exported.data = exported.data + "\n" + "/*" + csspath +"*/\n" + data;
	
											p.success();
										})
									}
	
									else
									{
										throw "notexist (CSS) " + module.csspath + ": " + csspath
										p.success();
									}
								})
	
	
								
							});
	
						}
						else
						{
							console.log('module.uri', module.uri)
							throw "notexist (CSS) " + module.uri
						}
					})
	
				},
				
				all : {
					success : function(){
	
						console.log(modules.path)
				
						fs.writeFile(modules.path, modules.data, function(err) {
	
							if(err) {
	
								throw "Access not permitted " + modules.path
							}
	
							//console.log("Access permitted", item)
	
							var arf = _.clone(m.__sourcesfirst || []);
	
							var arl = _.clone(m.__sourceslast || []);
	
							var ar = _.clone(m.__sources || []);
	
							ar.push(modules.path.replace('./', ''));
	
							var ver = _.clone(m.__vendor || []);
	
							joinVendor(ver, function(){
	
								console.log("joinVendor DONE")
	
								joinScripts(arf, joinfirst, function(){
	
									console.log("joinScriptsFirst DONE")
	
									
	
									joinTemplates(function(d){
	
										join.data = join.data + "\n /*_____*/ \n" + d;
	
										joinScripts(ar, join, function(){
	
											console.log("joinScripts DONE")
	
											joinScripts(arl, joinlast, function(){
	
												console.log("joinScriptsLast DONE")
	
												joinCss(function(){
	
													console.log("joinCss DONE")
	
													createTemplates().catch(e => {
														
													}).then( r => {
														if(_clbk) _clbk()
													})
												})
	
											})
											
										});
	
									})
	
								})
								
							});
	
							
													
						});
					}
				}
			})
		}

		var joinCss = function(clbk){
			if(m.__css)
			{

				var currentcssdata = ''

				lazyEach({
					sync : true,
					array : m.__css,
					action : function(p){

						var filepath = p.item;

						var path;

						if(filepath.indexOf("..") == -1) path = './'+ filepath;
						else path = filepath.replace("..", '.');				  				

						fs.exists(path, function (exists) {
						
							if(exists){

								console.log(path)

								fs.readFile(path, function read(err, data) {
									if (err) {
										throw err;
									}

									currentcssdata = currentcssdata + "\n" + "/*" + path +"*/ \n" + data;

									p.success();
								});

							}
							else
							{
								throw "notexist (CSS) " + module.uri + ": " + path

							}
						})

					},
					
					all : {
						success : function(){
							cssmaster.data = currentcssdata + '\n' + cssmaster.data;

							exported.data = currentcssdata + '\n' + exported.data;
							exported.data = '.pocketnet_iframe{' + exported.data + '}'
							exported.data = exported.data.split('\n')

							exported.data = exported.data.map(item => {
								return item.replace(/\(max-width:640px\)|\(max-width:768px\)|\(max-width:1024px\)/g, '(max-width:1920px)')
							})

							exported.data = exported.data.join('\n')

							var pre = uglifycss.processString(cssmaster.data, {
								cuteComments : true
							})

							fs.writeFile(cssmaster.path, pre, function(err) {

								if(err) {
									throw "Access not permitted (CSS) " +  cssmaster.path
								}
										
								clbk();				
							});

							/*fs.writeFile(exported.path, exported.data, function(err) {

								if (err) {

									console.log("Access not permitted (LESS) " +  exported.path) 
								}
										
							});*/
						}
					}
				})
			}

			else
			{
				throw "m.__css"
			}
		}

		var joinScripts = function(ar, join, clbk){
			if(ar && ar.length)

				lazyEach({
					sync : true,
					array : ar,
					action : function(p){

						var filepath = p.item;

						var path;

						if(filepath.indexOf("..") == -1) path = './'+ filepath;
						else path = filepath.replace("..", '.');				  				

						fs.exists(path, function (exists) {
							
							if(exists){

								console.log(path)

								fs.readFile(path, function read(err, data) {
									if (err) {
										throw err;
									}

									var minified = uglifyJS.minify(data.toString(), {
										compress: {
											passes: 2
										}
									})

									if(!minified.error && uglify){
										data = minified.code
									}
									else
									{
										console.log('UglifyJS Fail: ' + minified.error, path)
									}
									

									join.data = join.data + "\n /*_____*/ \n" + data;

									p.success();
								});

							}
							else
							{
								throw "File doesn't exist " +  path
							}
						})

					},
					
					all : {
						success : function(){
							console.log(join.path)


							if (join.append){
								join.data = join.data + join.append
							}

							fs.writeFile(join.path, join.data, function(err) {
								if(err) {

									throw "Access not permitted (JS) " +  join.path
								}
										
								clbk();				
							});

						
							
						}
					}
				})

			else
				throw "Access not permitted (JS) " +  join.path
		}

		var joinTemplates = function(clbk){
			if(m.__templates){

				tempates.data = ''

				var scripted = {}

				lazyEach({
					sync : true,
					array : m.__templates,
					action : function(p){

						var i = p.item

						var filepath = 'components/' + i.c + '/templates/' + i.n + '.html';

						var path;

						if(filepath.indexOf("..") == -1) path = './'+ filepath;
						else path = filepath.replace("..", '.');		
						
						
						console.log('path', path, i)

						fs.exists(path, function (exists) {
							//
							if(exists){

								console.log(path)

								fs.readFile(path, function read(err, data) {
									if (err) {
										throw err;
									}

									if(!scripted[i.c]) scripted[i.c] = {}

									scripted[i.c][i.n] = data.toString()

									p.success();
								});

							}
							else
							{
								throw "File doesn't exist " +  path
							}
						})

					},
					
					all : {
						success : function(){

							tempates.data = 'window.pocketnetTemplates = ' + JSON.stringify(scripted)

							clbk(tempates.data);	
						}
					}
				})
			}
		}

		var joinVendor = function(ar, clbk){
			if(m.__vendor)

				lazyEach({
					sync : true,
					array : ar,
					action : function(p){

						var filepath = p.item;

						var path;

						if(filepath.indexOf("..") == -1) path = './'+ filepath;
						else path = filepath.replace("..", '.');				  				

						fs.exists(path, function (exists) {
							//
							if(exists){

								console.log(path)

								fs.readFile(path, function read(err, data) {
									if (err) {
										throw err;
									}

									if(path.indexOf('min.') == -1){
										var minified = uglifyJS.minify(data.toString())

										if(!minified.error){
											data = minified.code
										}
										else
										{
											console.log('UglifyJS Fail: ' + minified.error, path)
										}
									}
									else{
										console.log("SKIP MINIFY", path)
									}

									vendor.data = vendor.data + "\n /*_____*/ \n" + data;
									p.success();
								});

							}
							else
							{
								throw "File doesn't exist " +  path
							}
						})

					},
					
					all : {
						success : function(){

							console.log(vendor.path)

							vendor.data = vendor.data + "\n /*_____*/ \n ; window.pocketnetVendorLoaded = true;"

							fs.writeFile(vendor.path, vendor.data, function(err) {

								if(err) {

									throw "Access not permitted (JS) " +  vendor.path

								}
										
								clbk();				
							});
						}
					}
				})

			else{
				throw "File doesn't exist m.__vendor"
			}
		}

		var createTemplatedFile = function(tplname){
			/*WORK WITH INDEX*/
			var pth = './tpls/' + tplname + '.tpl'

			console.log("CREATING TEMPLATE: ", tplname)

			return new Promise((resolve, reject) => {

				fs.exists(pth, function (exists) {

					if(exists){
	
						fs.readFile(pth, {encoding: 'utf-8'}, function read(err, index) {
							if (err) {
								return reject(err)
							}
							var JSENV = "";
							var JS = "";
							var CSS = "";
							var VE = "";
							var CACHED_FILES = "";
	
							if(args.test){
								JSENV += '<script>window.testpocketnet = true;</script>';
							}

							if(args.path){
								JSENV += '<script>window.pocketnetpublicpath = "'+args.path+'";</script>';
							}

							console.log("___ _args.domain", VARS.domain)

							if(VARS.domain){
								JSENV += '<script>window.pocketnetdomain = "' + VARS.domain + '";</script>';
							}
	
							if(args.prodaction)
							{

								JS += '<script type="text/javascript">'+joinfirst.data+'</script>';
								JS += '<script async join src="js/join.min.js?v='+rand(1, 999999999999)+'"></script>';
								JS += '<script async join src="js/joinlast.min.js?v='+rand(1, 999999999999)+'"></script>';
	
								VE = '<script async join src="js/vendor.min.js?v='+args.vendor+'"></script>';
	
								CSS = '<link rel="stylesheet" href="css/master.css?v='+rand(1, 999999999999)+'">';
	
								index = index.replace(new RegExp(/\?v=([0-9]*)/g), '?v=' + rand(1, 999999999999));
							}
							else
							{
	
								JSENV += '<script>window.design = true;</script>';

								_.each(m.__sourcesfirst, function(source){
									JS += '<script  join src="'+source+'?v='+rand(1, 999999999999)+'"></script>\n';
									CACHED_FILES += `'${source}',\n`;
								})
								
								_.each(m.__sources, function(source){
									JS += '<script  join src="'+source+'?v='+rand(1, 999999999999)+'"></script>\n';
									CACHED_FILES += `'${source}',\n`;
								})

								_.each(m.__sourceslast, function(source){
									JS += '<script  join src="'+source+'?v='+rand(1, 999999999999)+'"></script>\n';
									CACHED_FILES += `'${source}',\n`;
								})
	
								_.each(m.__css, function(source){
									CSS += '<link rel="stylesheet" href="'+source+'?v='+rand(1, 999999999999)+'">\n';
									CACHED_FILES += `'${source}',\n`;
								})	
	
								_.each(m.__vendor, function(source){
									VE += '<script  join src="'+source+'?v='+args.vendor+'"></script>\n';
									CACHED_FILES += `'${source}',\n`;
								})			            		
							}
							index = index.replace("__JSENV__" , JSENV);
							index = index.replace("__VE__" , VE);
							index = index.replace("__JS__" , JS);
							index = index.replace("__CSS__" , CSS);
							index = index.replace("__CACHED-FILES__", CACHED_FILES);
							index = index.replace("__PACKAGE-VERSION__", package.version);

							_.each(VARS, function(v, i){
								index = index.replaceAll("__VAR__." + i, v);
							})
	
							fs.writeFile('./' + tplname, index, function(err) {

								if (err) {
									return reject(err)
								}

								resolve()
								
							})
	
						});
	
					}
					else
					{
						return reject("not index tpl: " + pth)
					}
				})

			})	

			
		}

		var createTemplates = function(){
			var promises = _.map(tpls, function(t){
				return createTemplatedFile(t)
			})

			return Promise.all(promises)
		}


		makePocketnet(function(){

			copycordova(cordova, function(){
				copycordovaios(cordovaiosfast)
			})
			

		})

		/**/
	}
	else
	{
		
	}
});



var regForjs = function(modulename, c)
{
	var ex = '<script join src=\"([\/.a-zA-Z0-9]*'+modulename+'.js)\?v=([0-9]*)\"><\/script>';
	if(c) ex = '<\!--' + ex + '-->';

	return ex;
}

rand = function(min, max)
{
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}


var helpers = {
	clearfolder : function(directory, clbk){

		try{
			fs.rmdirSync(directory, {
				recursive : true
			})
		}
		catch(e){}
		try{
			if (!fs.existsSync(directory)){
				fs.mkdirSync(directory);
			}
		}
		catch(e){}

		

		if(clbk) clbk()

	}
}

var copycordova = function(options, clbk){
	helpers.clearfolder(options.path, function(){
		lazyEach({
			sync : true,
			array : options.copy,
			action : function(p){
	
	
				ncp(p.item, options.path + '/' + p.item, function (err) {
	
					if (err) {
					  console.error(err);
					}
	
					p.success();
					
				});
	
			},
			
			all : {
				success : function(){
	
					console.log('cordova ready')
	
					if(clbk) clbk()
	
				}
			}
		})
	})
	
}

var copycordovaios = function(options, clbk){

	fs.exists(options.path, function (exists) { 
		if(exists) {
			console.log('cordova ios exists')

			lazyEach({
				sync : true,
				array : options.copy,
				action : function(p){
		
					ncp(p.item, options.path + '/' + p.item, function (err) {
		
						if (err) {
						  console.error(err);
						}
		
						p.success();
						
					});
		
				},
				
				all : {
					success : function(){
		
						console.log('cordova ready')
		
						if(clbk) clbk()
		
					}
				}
			})
		}
		else
		{
			console.log('cordova ios skip')
			if(clbk) clbk()
		}

	})
	
}


String.prototype.replaceAll=function(a,b){return a?this.split(a).join(b):this};