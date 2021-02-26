var electron = null

if(typeof _Electron != 'undefined'){
	electron = require('electron');
}

Nav = function(app)
{	
	var self = this;

	var options = {
		navPrefix : '/',
		path: 'components/',

		cashe: true,
		history : true,
		links : true,
	}

	var protocol = null;

	if (typeof window != 'undefined'){
		protocol = window.location.protocol.replace(":",'');
	}

	if (protocol == "http" || protocol == "https" || _Node)
	{
		protocol = "web"
	}

	var current = {
		href : null
	}

	var loading = {

	}

	var cssimported = {};

	var relations = {}

	self.wnds = {};

	var externalexclusions = ['blockexplorer']

	var module = {
		find : function(href){

			return _.find(app.map, function(mdl, index){
				return (mdl.href == href);
			})

		},
		run : function(p){

			p.clbk = addToFunction(p.clbk, function(){

				core.links(null, p.el);

			})

			p.module.nav = self;
			p.module.app = app;
			p.module.sdk = app.platform.sdk;
			p.module.user = app.user;
			p.module.ajax = app.ajax;
			p.module.componentsPath = options.path;
			p.module.data = p.data || {};
			p.module.essenseData = p.essenseData || {};
			p.module.run(p);


		}
	}

	var backManager = {

		chain : [{
			href : 'index',
			scroll : 0
		}],

		clearAll : function(){
			
			var nchain = [{
				href : 'index',
				scroll : 0
			}]

			backManager.chain = nchain

			this.save()
		},

		clear : function(){
			
			var nchain = [{
				href : 'index',
				scroll : 0
			}]

			if (backManager.chain.length > 1){
				nchain.unshift(firstEl(backManager.chain))

				nchain[0].scroll = 0
			}

			backManager.chain = nchain

			this.save()
		},
		load : function(){
			this.chain = JSON.parse(localStorage['backchain'] || "[]");


			if(!this.chain.length){
				this.clearAll()
			}

		},
		save : function(){
			localStorage['backchain'] = JSON.stringify(this.chain || [])
		},	

		add : function(href, scroll, back){

			var khref = href.split('?')[0];

			var np = parameters(href, true)

				href = khref + collectParameters(np, ['back', 'ref', 'r']);

			var wb = false;

			if (np.back || back){

				var index = findIndex(backManager.chain, function(c){
					if(c.href == href) return true;
				})

				//if (back) index++

				backManager.chain.splice(0, index);

				wb = backManager.chain[0]
			}

			else{	

				if (khref == 'index'){
					backManager.clearAll()
				}
				else{

					if(deep(backManager, 'chain.0.href') == href) return


					var needadd = this.mapSearch(khref, firstEl(backManager.chain));

	
					if (needadd){
	
						var riobj = removeEqualRIObj(backManager.chain, {
							href : href
						})

						//if (riobj && riobj.index == 0) return
	
						if (riobj && riobj.index == 1 && backManager.chain.length > 1){
							backManager.chain.splice(0, 1);
	
							wb = riobj.el;
						}
						else{
							backManager.chain[0].scroll = scroll || 0
						}
	
						backManager.chain.unshift({
							href : href,
							scroll : 0
						})
					
						
					}
					else{
						backManager.clearAll()
					}
				}	

			}

			this.save()


			return wb;
		},

		get : function(){

			if(backManager.chain.length > 1){
				return backManager.chain[1]
			}
			else{
				return null
			}
		},

		mapSearch : function(href, last){

			var lhref = last.href.split('?')[0];

			var bp = deep(app, 'backmap.' + lhref) 

			if (bp){
				if(bp.childrens.indexOf(href) > -1) return true
			}
		}

		
	}

	var historyManager = {
		addParametersToHref : function(href, p){

			if(!href) return href

			var _p = parameters(href, true);

				_p = _.extend(_p, p);

			href = href.split('?')[0];

			return href + collectParameters(_p);
		},
		addParameters : function(p, _p){

			if(!_p) _p = {}

			var currentParameters = parameters();

			var previousParameters = parameters();

				currentParameters = _.extend(currentParameters, p);

			if(_.isEqual(previousParameters, currentParameters)) return;

			delete currentParameters.back;

			var href = current.href + collectParameters(currentParameters);


			if(typeof _p.removefromback == 'undefined') _p.removefromback = true

			this.add(href, _p);
		},

		addRemoveParameters : function(ids, p, _p){
			if(!_p) _p = {}
			if(!_.isArray(ids)) ids = [ids];

			var pathname = self.get.pathname();

			var previousParameters = parameters();

			var currentParameters = parameters();

				currentParameters = _.extend(currentParameters, p);

				_.each(ids, function(id){
					delete currentParameters[id]
				})

			if(_.isEqual(previousParameters, currentParameters)) return;


			var href = current.href + collectParameters(currentParameters);

			if(typeof _p.removefromback == 'undefined') _p.removefromback = true

			this.add(href, _p);
		},

		removeParameters : function(ids, _p){
			if(!_p) _p = {}
			if(!_.isArray(ids)) ids = [ids];

			var pathname = self.get.pathname();

			var currentParameters = parameters();

			var removed = false;

			_.each(ids, function(id){

				if(currentParameters[id]){
					removed = true
				}

				delete currentParameters[id]
			})

			if(removed){

				var href = current.href + collectParameters(currentParameters);

				if(typeof _p.removefromback == 'undefined') _p.removefromback = true

				this.add(href, _p);

			}

			
		},
		add : function(href, p){


			if(!p) p = {}

			

			if (p.inWnd){

				var pa = parameters(href, true);
					pa['m' + p.id] = true

				historyManager.addParameters(pa)
				self.wnds[p.id] = p

				return
			}

			if (options.history === true && !_Node)
			{	

				if(!p.removefromback){
					p.goback = backManager.add(href, p.lastScroll, p.back)
				}

				if(history.state && history.state.href == href){
					return
				}


				if (self.addParameters){
					href = self.addParameters(href)
				}

				history.pushState({

					href : href,

					lfox : true

				}, null, href);

				
				
			}

		},

		changes(href1, href2){

		},	

		openCurrent : function(){

			if (history.state && history.state.lfox) { 

				core.removeWindows(history.state.href)


				if(history.state.href.split('?')[0] != current.href){

					self.api.load({
		        		href : history.state.href,
		        		open : true,
			   			//history : true,
						loadDefault : true,
						back : true
						//removefromback : firsttime
		        	}); 

				}
				else
				{
					core.removeWindows(history.state.href)


					if(!_.isEmpty(self.wnds)){
						_.each(self.wnds, function(w){
							if (w.module.parametersHandler){
								w.module.parametersHandler()
							}
						})
					}
					else{
	
						if (current.module && current.module.parametersHandler){
	
							current.module.parametersHandler(function(){	
	
							})
						}
					}
					
				}

	    	}
		}
		
	}

	var core = {

		dynamicmap : function(p, clbk){
			if (self.dynamic){
				self.dynamic(p, clbk)
			}
			else{
				if (clbk)
				    clbk()
			}
		},	

		removeWindows : function(href){
			var p = parameters(href, true)

			var deleted = [];

			_.each(self.wnds, function(pa, id){
				if(!p['m' + id]){

					var c = deep(pa, 'module.closeContainer');

					if (c){

						deleted.push(id)


						c('auto')
					}

				}
			})

			_.each(deleted, function(id){
				delete self.wnds[id]
			})
		},
		
		open : function(p){

			if(!p) p = {};

				p.clbk || (p.clbk = emptyFunction);

			var lastHref = current.href;

			var run = true;

		

			if((p.history || p.loadDefault) && options.history)
			{

				if(p.href == current.href){

					if (current.module && current.module.parametersHandler && p.handler){
						
						run = false;

						historyManager.add(p.completeHref, p);

						current.completeHref = p.completeHref;

						if(!p.goback){
							_scrollTop(0, null, 50);
						}
							

						current.module.parametersHandler(function(){							

							p.clbk(null, p);

							core.removeWindows(p.completeHref)

						})

						_.each(self.clbks.history, function(c){
								
							c(p.href);
							
						})

						return;
					}
				}

				
				

				if(p.completeHref == current.completeHref && !p.loadDefault)
				{
					run = false;
				}
				else
				{


					p.lastScroll = $(window).scrollTop();

					

					if(!p.reload)
						historyManager.add(p.completeHref, p);

					

					if (current.module && !p.inWnd){

						var stop = current.module.stop(p.href);

						if (stop && _.isObject(stop)){

							if (stop.action){
								stop.action(function(){
									core.open(p)
								})
							}

							return
						}

						if (stop && typeof stop == 'function'){
							p.preshell = stop;
						}
					}

					if (p.href && !p.inWnd){

						current.href = p.href;
						current.completeHref = p.completeHref;
						current.module = p.module;		

						var c = p.clbk;

						p.clbk = function(a, b, d){
							core.removeWindows(p.completeHref)

							if (p.goback){
								_scrollTop(p.goback.scroll);
							}
							

							c(a, b, d)
						}

						
					}	



					p.module.active = true;

					_.each(self.clbks.history, function(c){
						
						c(p.href);
						
					})
				}
			}


			if(p.restart)
			{
				run = true;
			}

			if (run)
			{
				module.run(p)
			}

			else
			{
				p.clbk(null, p);
			}
		},
		
		loadSource : function(map, clbk){

			var cashed = app.module(map.id);

			var importScriptClbk = function(){
				topPreloader(50)

				core.loadTemplates(map, function(){

					topPreloader(100)

					loading[map.id] = false;

					clbk(app.module(map.id));

				})
			}

			if(loading[map.id]) {

				retry(
					function(){
						return !loading[map.id];
					},
					function(){
						core.loadSource(map, clbk)
					}
				)
			
				return;
			}

			loading[map.id] = true;

			var path = map.path || "";

			var src =  path + options.path + map.uri + "/index.js"; 

			topPreloader(20)
			

			core.loadRelations(map, function(){

				topPreloader(40)

				if (window.design)
				{

					if(!cssimported[map.uri])
					{
						importCss( (map.uri.csspath || path) + options.path + map.uri + "/index.css");
						cssimported[map.uri] = true
					}
				}
				

				if(options.cashe && cashed)
				{
					importScriptClbk()
				}
				else
				{



					importScript(src, function(){

						importScriptClbk()

					}, null, app, map.id);
				}

				

			})

				
		},
		loadTemplates : function(map, clbk){

			lazyEach({
				array : map.templates,
				action : function(p){


					app.module(map.id).loadTemplate({
						name : p.item
					}, p.success);
					
				},
				all : {
					success : clbk
				}
			})
		},
		loadRelations : function(map, clbk){

			var rel = _.filter(map.relations, function(r){

				if(!r.if || r.if()) return true 
			})


			if(!map.relationsSunc)
			{

				lazyEach({
					array : rel,
					action : function(p){

						var relation = p.item

						if(!relations[relation.src] && (!_Node || !relation.nodeIgnore))
						{
							if(relation.f == 'js')
							{
								importScript(relation.src, function(){

									relations[relation.src] = true;

									p.success();

								}, null, app, null, relation.require);
							}

							if(relation.f == 'css')
							{
								relations[relation.src] = true;
								
								importCss(relation.src);

								p.success();
							}
						}
						else
						{
							p.success();
						}
						
					},

					all : {
						success : function(){
							clbk();
						}
					}
					
				})
			}
			else
			{

				var cssRelations =  _.filter(rel, function(relation){
					if(relation.f == 'css') return true;
 				})

 				_.each(cssRelations, function (relation) {
 					importCss(relation.src); 
 				});

				var jsRelations = _.filter(rel, function(relation){

					if(_Node && relation.nodeIgnore) return false;

					if(relation.f == 'js') return true;
 				})

 				jsRelations = _.map(jsRelations, function(relation){
 					return {
 						src : relation.src,
 						require : relation.require
 					};
 				})


				importScripts(jsRelations, relations, function(){

					clbk();

				}, null, null, app);
			}
		},
		openInitialModules : function(clbk, _map){

			var map = _.filter(_map || app.map, function(map){
				if(map.now === true) return true;
			})	
			
			
			lazyEach({
				array : map,
				sync : false,
				action : function(p){
					var obj = p.item;

					core.load({
						href : obj.href,
						open : true,
						clbk : function(error)
						{
							if(error)
							{
								
							}

							if (p.success)
								p.success();
						}
					})
				},

				all : {
					success : clbk
				}
			})
		},
		load : function(p){
			if(!p) p = {};



			if(!p.href && !p.id) {
				p.clbk("href and id aren't exist");

				return;
			}

			p.clbk || (p.clbk = emptyFunction);

			if(typeof p.animation == 'undefined')
				p.animation = 'fadeIn'

			if(p.href){

				p.completeHref || (p.completeHref = p.href)

				p.href = p.href.split("?")[0];

				p.map = module.find(p.href);


			}

			if (p.id)
				p.map = app.map[p.id];

			else
			{
				if (p.map)
					p.id = p.map.id
			}


			if(!p.map)
			{

				core.dynamicmap(p, function(err, res){

					if(err){
						p.clbk("map for module isn't exist")
						p.href = 'page404'
						p.map = module.find(p.href);

						core.load(p)
					}

					else{

						p.id = res.id;
						p.essenseData = _.extend(p.essenseData || {}, res.extra || {})

						//delete p.href;


						core.load(p)

					}

				})

				
				
				return
			}

			/*if(p.history){
				app.el.content.addClass("navtransition")
			}*/

			core.loadSource(p.map, function(module){

				if(!module)
				{
					p.clbk("module haven't been loaded");

					return;
				}
				else
				{
					p.module = module;
					p.module.map = p.map;

					var prms = parameters();
					
					app.localization.set(prms.loc, function(){

						if(!p.open)
						{
							p.clbk(null, p);
						}
						else
						{
							core.open(p)
						}

					})
					

					
				}
				
			})
		},
		externalLink : function(link){

			var href = link.attr('href').toLowerCase(),
				external = link.attr('external');


			var host = self.get.hostname()

			if (host == 'localhost/' || electron || window.cordova) host = 'pocketnet.app/'

				host = 'https://' + host
		
			var ex = _.find(externalexclusions, function(ex){
				return href.indexOf(ex) != -1
			})
			
			
			var e = external || (
				
			(!href 
				
				|| href.indexOf("mailto") > -1
				|| href.indexOf("skype:") > -1 
				|| href.indexOf('/') > -1 
				|| href.indexOf('.') > -1
				|| href == "#")
				
				
				&& (href.indexOf(host) == -1)
			)

			if (!e && ex) e = true; 


			if (!e) return true;
		},
		externalTarget : function(link){
			var href = link.attr('href');

			var e = href && (href.indexOf('/') > -1 || href.indexOf('.') > -1)

			if (href.indexOf('http') == -1){
				link.attr('href', 'https://' + href)
			}

			if (e)
			{
				link.attr('target', '_blank')
			}


			if(typeof window != 'undefined' && typeof window.cordova != 'undefined' && cordova.InAppBrowser){

				link.off('click').on('click', function(){
	
					var ref = cordova.InAppBrowser.open(href, link.attr('cordovalink') || '_blank');

					return false
					
				})

			}
		},

		thisSiteLink : function(href){

			var host = self.get.hostname()

			if (host == 'localhost/' || electron || window.cordova) host = 'pocketnet.app/'

				host = 'https://' + host

			var c = href.split(host)

			if (c.length > 1){

				return  c[1]

			}
			else
			{
				return href
			}
		},

		links : function(action, _el, additionalActions){

			if(!options.links) return;	

			var _links = null;

			if(_el) _links = _el.find('a');

			else _links = $('a');		

			if(!_links.length) return

			_links.each(function(){

				var link = $(this)

				if(!link.attr('href')) return

				var external = core.externalLink(link);

				if(!external)
				{
					if(link.attr('donottrust'))
					{

						link.off('click')
							.on('click', function(){
								var href = $(this).attr('href');	

								

								if (href.indexOf('http') == -1) href = 'http://' + href						

								self.api.load({
									open : true,
									id : 'anothersite',
									inWnd : true,

									essenseData : {
										link : href
									}
								})

								return false;
							})
					}
					else
					{
						core.externalTarget(link)
					}
					
				}
				else
				{


					if (_SEO){

						var _href = link.attr('href');
							_href = decodeSeoLinks(_href).replace("#!", "");

						var hrefParameters = parameters(_href, true);

							hrefParameters.loc || (hrefParameters.loc = app.localization.key);

							_href = _href.split("?")[0];

							_href = _href + collectParameters(hrefParameters);

							_href = "#!" + _href;

							link.attr('href', encodeSeoLinks(_href));
					}

					var eve = function(e){
						var href = core.thisSiteLink($(this).attr('href'));

						var handler = $(this).attr('handler') || null

						if (additionalActions){
							additionalActions(e);
						}	

						core.go({
							action : action,
							href : href,
							history : true,
							open : true,
							handler : handler
						})

						

						return false
					}

					if (link.attr('fast')){
						link.swipe({
							tap : eve
						})

						link.off('click')
							.on('click', function(){

								return false;
							})
					}

					else{
						link.off('click').on('click', eve)
					}

					

				
					
				}

			})

			/*var p = {};

				p.href = $(this).attr('href');*/
		},
		go : function(p){
			if(!p) p = {};

			if(!p.href) return;

			if(!p.action) p.action = core.load;

			if (p.href[0] == "?"){

				var currentParameters = parameters(),
					hrefParameters = parameters(p.href.substr(1));

				currentParameters = _.extend(currentParameters, hrefParameters);

				p.href = current.href + collectParameters(currentParameters, p.exclude);

			}

			p.action(p);
		},
	}

	var protocolActions = {
		file : {
			prefix : function(){
				var pathname = window.location.pathname;

				if (pathname.indexOf('android') > -1)
				{
					options.navPrefix = '/android_asset/www/';
				}
				else
				{
					options.navPrefix = pathname
				}
			},

			pathnameSearch : function(){
				var loc =  window.location; 

				return protocolActions.file.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				return loc.pathname.replace(options.navPrefix, '').replace(".html", "")
			}

		},
		web : {

			pathnameSearch : function(){
				var loc =  window.location; 

				return protocolActions.web.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				return loc.pathname.replace(options.navPrefix, '')
			},

			seoRedirect : function(){
				var loc =  window.location; 

				var href = decodeSeoLinks(loc.href.replace("#!", "").replace(/&amp;/g, '&'))

				if (href != loc.href){
					historyManager.add(href);
				}
			}
		}
	}

	var protocolAction = function(actionName){

		var action = deep(protocolActions, protocol + "." + actionName)

		var args = [];

		for (var i = 1; i < arguments.length; i++) {
		    args.push(arguments[i])
		}

		if (action)
			return action.apply(this, args);

		else
		{
			if(args.length == 1) return args[0];
		}
	}

	self.api = {
		history : historyManager,
		links : core.links,
		go : core.go,
		ini : core.openInitialModules,

		backChainGet : function(){
			return backManager.get()
		},
		backChainClear : function(){
			backManager.clear()
		},

		load : function(p){
			var clbk = p.clbk;

			p.clbk = function(error, r){

				var e = false;

				if(error)
				{
					console.log(p, error);
					e = true;
				}

				if (clbk)
					clbk(e, r);

			}

			core.load(p)
		},
		
		loadDefault : function(p){
			if(!p) p = {};

			if(!p.href)
				p.href = self.get.pathnameSearch() || 'index';

			if (p.href == 'blank')
				p.href  = 'index'


			if(p.href.split("?")[0] == 'index'){
				backManager.clearAll()	
			}

			backManager.add(p.href)

			self.api.load(p);
		},

		loadSameThis : function(href, p){

			if(p.container) p.container.close();

			var loadParameters = {
        		open : true,
				href : href,
				essenseData : p.essenseData,
				history : p.history,
				inWnd : p.inWnd,
				inTooltip : p.inTooltip,
				animation : p.animation
        	}

        	this.load(loadParameters)

		},

		loadRelations : core.loadRelations
	}

	self.get = {
		href : function(){
			var loc =  window.location;  

			var pathname = protocolAction('pathname')
			
			return decodeSeoLinks(pathname + loc.search).replace("#!", "");
		},
		pathname : function(){

			var pathname = protocolAction('pathname')

			if (pathname == 'blank')
				pathname = 'index'

			return decodeSeoLinks(pathname).replace("#!", "");
		},

		pathnameSearch : function(){
			var pathnameSearch = protocolAction('pathnameSearch')

			if (pathnameSearch == 'blank')
				pathnameSearch = 'index'

			return decodeSeoLinks(pathnameSearch).replace("#!", "");
		},
		hostname : function(){

			//return 'pocketnet.app/'

			return window.location.hostname + '/'
		}
	}

	self.init = function(p){

		if(!p) p = {};

		if(typeof window != 'undefined'){

			backManager.load()

			protocolAction('prefix');
			protocolAction('seoRedirect');

			if (options.history === true)
			{
				window.onpopstate = function(event)
				{
					historyManager.openCurrent();
				};
			}

			core.openInitialModules(function(){

				p.open = true;
				p.history = true;
				p.loadDefault = true;

				self.api.loadDefault(p);

			});

		}

		
	}

	self.clbks = {
		history : {}
	}

	if(app.options.nav){
		options = _.extend(options, app.options.nav)
	}

	self.relations = relations;
	self.current = current

	return self;
}
	

if(typeof module != "undefined")
{
	module.exports = Nav;
}


topPreloader(45);
	