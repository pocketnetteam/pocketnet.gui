fs = require('fs');
_ = require('underscore');

require('./js/functions.js');
var uglifyJS = require("uglify-js");
//var ClosureCompiler = require('google-closure-compiler').compiler;
var compressor = require('yuicompressor');
 
var path = ".",
	prodaction = process.argv[2] ? false : true;

var vendorversion = process.argv[3] || '4';

if(prodaction === 'false') prodaction = false; 



var mapJsPath = './js/_map.js';
var indexPathTpl = './index.tpl';
var indexPath = './index.php';

var mapJs2Path = './js/_mapv2.js';

console.log("run")


fs.exists(mapJsPath, function (exists) { 
	if(exists) {

		var m = require(mapJsPath);

		var modules = {
			data : "",
			path : './js/_modules.js'
		}

		var join = {
			data : "",
			path : './js/join.min.js'
		}

		var vendor = {
			data : "",
			path : './js/vendor.min.js'
		}

		var cssmaster = {
			data : "",
			path : './css/master.css'
		}

		var _modules = _.filter(m, function(_m, mn){
			if(mn != "__sources" && mn != "__css" && mn != '__vendor') return true;
			
		})


		/*JOIN MODULES*/

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

							var minified = uglifyJS.minify(data.toString())
							

							if(!minified.error){
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

										p.success();
									})
								}

								else
								{
									console.log('notexist', module.csspath, csspath)
									p.success();
								}
							})


							
						});

					}
					else
					{
							console.log("notexist (CSS) " + module.uri)
							
							p.success();
					}
				})

			},
			
			all : {
				success : function(){

					console.log(modules.path)
			
					fs.writeFile(modules.path, modules.data, function(err) {

						if(err) {
							console.log("Access not permitted", err)
							return
						}

						//console.log("Access permitted", item)

						var ar = _.clone(m.__sources || []);

						ar.push(modules.path.replace('./', ''));

						var ver = _.clone(m.__vendor || []);

						joinVendor(ver, function(){

							joinScripts(ar, function(){

								joinCss(createIndexFile)
								
							});
							
						});

						
												
					});
				}
			}
		})

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

									currentcssdata = currentcssdata + '\n' + data;

									//cssmaster.data = cssmaster.data + '\n' + data;
									p.success();
								});

							}
							else
							{
								console.log("notexist (CSS) " + module.uri + ": " + path)

								//p.success();
							}
						})

					},
					
					all : {
						success : function(){

							cssmaster.data = currentcssdata + '\n' + cssmaster.data;
							console.log(cssmaster.path)
							fs.writeFile(cssmaster.path, cssmaster.data, function(err) {

								if(err) {
									console.log("Access not permitted (CSS) ", cssmaster.path)
									return
								}
										
								clbk();				
							});
						}
					}
				})
			}

			else
			{
				clbk()
			}
		}

		var joinScripts = function(ar, clbk){
			if(m.__sources)

				lazyEach({
					sync : true,
					array : ar,
					action : function(p){

						var filepath = p.item;

						var path;

						if(filepath.indexOf("..") == -1) path = './'+ filepath;
						else path = filepath.replace("..", '.');				  				

						fs.exists(path, function (exists) {
							//console.log(path)
							if(exists){

								console.log(path)

								fs.readFile(path, function read(err, data) {
									if (err) {
										throw err;
									}

									var minified = uglifyJS.minify(data.toString())

									if(!minified.error){
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
								console.log("File doesn't exist " +  path)
							}
						})

					},
					
					all : {
						success : function(){
							console.log(join.path)
							fs.writeFile(join.path, join.data, function(err) {

								if(err) {
									console.log("Access not permitted (JS)", join.path)
									return
								}
										
								clbk();				
							});
						}
					}
				})

			else
				clbk();
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

									var minified = uglifyJS.minify(data.toString())

									if(!minified.error){
										data = minified.code
									}
									else
									{
										console.log('UglifyJS Fail: ' + minified.error, path)
									}
									

									vendor.data = vendor.data + "\n /*_____*/ \n" + data;
									p.success();
								});

							}
							else
							{
								console.log("File doesn't exist " +  path)
							}
						})

					},
					
					all : {
						success : function(){
							console.log(vendor.path)
							fs.writeFile(vendor.path, vendor.data, function(err) {

								if(err) {
									console.log("Access not permitted (JS)", vendor.path)
									return
								}
										
								clbk();				
							});
						}
					}
				})

			else
				clbk();
		}

		var createIndexFile = function(clbk){
			/*WORK WITH INDEX*/

			fs.exists(indexPathTpl, function (exists) {
				if(exists){
					fs.readFile(indexPathTpl, {encoding: 'utf-8'}, function read(err, index) {
						if (err) {
							throw err;
						}

						var JS = "";
						var CSS = "";
						var VE = ""

						if(prodaction)
						{
							JS = '<script join src="js/join.min.js?v='+rand(1, 999999999999)+'"></script>';

							VE = '<script join src="js/vendor.min.js?v='+vendorversion+'"></script>';

							CSS = '<link rel="stylesheet" href="css/master.css?v='+rand(1, 999999999999)+'">';

							index = index.replace( 
									new RegExp(/\?v=([0-9]*)/g), 

									'?v=' + rand(1, 999999999999)
								);
						}
						else
						{

							JS += '<script>window.design = true;</script>';

							
							
							_.each(m.__sources, function(source){
								JS += '<script join src="'+source+'?v='+rand(1, 999999999999)+'"></script>\n';
							})

							_.each(m.__css, function(source){
								CSS += '<link rel="stylesheet" href="'+source+'?v='+rand(1, 999999999999)+'">\n';
							})	

							_.each(m.__vendor, function(source){
								VE += '<script join src="'+source+'?v='+vendorversion+'"></script>\n';
							})			            		
						}

						index = index.replace("__VE__" , VE);
						index = index.replace("__JS__" , JS);
						index = index.replace("__CSS__" , CSS);

						fs.writeFile(indexPath, index, function(err) {
							
						})

					});

				}
				else
				{
					console.log("not index tpl")
				}
			})
		}

		

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

String.prototype.replaceAll=function(a,b){return a?this.split(a).join(b):this};