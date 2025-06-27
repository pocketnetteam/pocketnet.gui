var electron = null

if(typeof _Electron != 'undefined'){
	electron = require('electron');

	window.electron = electron
}

if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
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

	if (history.scrollRestoration) {
		history.scrollRestoration = "manual";
	}

	var hostname = window.location.hostname

	var electronopen = false
	var blockclick = false

	var defaultpathname = 'index'

	if (_OpenApi){
		defaultpathname = 'openapi.html'
	}

	self.initialHistoryLength = history.length

	var protocol = null;

	if (typeof window != 'undefined'){
		protocol = window.location.protocol.replace(":",'');

		if(window.cordova) {
			protocol = 'file'

			if(isios()) protocol = 'bstn'
		}
		
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
	self.prepared = false

	var externalexclusions = ['blockexplorer', 'embedVideo.php', 'docs/', 'pocketnet-crypto-challenge']

	var module = {
		find : function(href){

			return _.find(app.map, function(mdl, index){
				return (mdl.href == href);
			})

		},
		run : function(p){

			p.module.nav = self;
			p.module.app = app;
			p.module.sdk = app.platform.sdk;
			p.module.psdk = app.platform.psdk;
			p.module.user = app.user;
			p.module.ajax = app.ajax;
			p.module.componentsPath = options.path;
			p.module.data = p.data || {};
			p.module.essenseData = p.essenseData || {};
			p.module.run(p);


		}
	}

	var indexpage = 'index'

	var backManager = {

		getindex : function(){
			return indexpage
		},

		chain : [{
			href : indexpage,
			scroll : 0
		}],

		clearAll : function(){
			
			var nchain = [{
				href : indexpage,
				scroll : 0
			}]

			backManager.chain = nchain

			this.save()
		},

		clear : function(){
			
			var nchain = [{
				href : indexpage,
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

				href = khref /*+ collectParameters(np, ['back', 'ref', 'pc']);*/

				if(np.video || np.read || np.audio || np.r || np.fx || np.id){
					href = khref + collectParameters({
						fx : np.fx, video : np.video, audio : np.audio, r : np.r, read : np.read, id : np.id
					})
				}

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

				if (khref == indexpage && !np.fx && !np.video && !np.audio && !np.read && !np.r && !np.fx){
					//// 
					backManager.clearAll()
				}
				else{


					if(deep(backManager, 'chain.0.href') == href) return

					var needadd = this.mapSearch(khref, firstEl(backManager.chain)) || (np.video || np.read || np.audio || np.r || np.fx || np.id);

					if (needadd){
	
						var riobj = removeEqualRIObj(backManager.chain, {
							href : href
						})

						if(!riobj && np.fx && backManager.chain.length > 1){
							var c0 = backManager.chain[0]

							if (c0.href.split('?')[0] == khref){
								riobj = {
									el : c0,
									index : 1
								}
							}
						}

	
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

			if(!bp){

				if (self.dynamic && !module.find(lhref)){
					bp = deep(app, 'backmap.authorn') 
				}
			}

			if (bp){
				if(bp.childrens.indexOf(href) > -1) return true

				if (self.dynamic && !module.find(href)){
					if(bp.childrens.indexOf('authorn') > -1) return true
				}
			}
			else{
				
			}
		}

		
	}

	var historyManager = {
		removeParametersFromHref : function(href, ids){

			if(!href) return href

			var _p = parameters(href, true) || {};

			_.each(ids || [], function(id){
				delete _p[id]
			})

			href = href.split('?')[0];

			return href + collectParameters(_p);
		},
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

			var href = (current.href || self.get.pathname()) + collectParameters(currentParameters);


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

				app.mobile.reload.initdestroyparallaxAuto()
			

				return
			}

			if (options.history === true && !_Node && !_OpenApi)
			{	


				if(!p.removefromback){
					p.goback = backManager.add(href, p.lastScroll, p.back)
				}

				if (history.state && history.state.href == href){
					return
				}

				if (self.addParameters){
					href = self.addParameters(href)
				}

				if (p.replaceState){

					history.replaceState({

						href : href,
						lfox : true
	
					}, 'Bastyon', href);
					
				}
				else{

					history.pushState({

						href : href,
						lfox : true
	
					}, 'Bastyon', href);

				}

				if (electron)
					electron.ipcRenderer.send('electron-url-changed', href);

			}

		},

		changes(href1, href2){

		},	

		openCurrent : function(){

			if (history.state && history.state.lfox) { 

				core.removeWindows(history.state.href)
				core.removeChat(history.state.href)

				if(!_.isEmpty(self.wnds)){
					_.each(self.wnds, function(w){


						if (w.independent) return

						if (w.module.parametersHandler){
							w.module.parametersHandler()
						}
					})
				}


				if(history.state.href.split('?')[0] != current.href || current.map.exhandler){

					self.api.load({
		        		href : history.state.href,
		        		open : true,
						loadDefault : true,
						replaceState : true,
						handler : true
		        	}); 

				}
				else
				{
					if (current.module && current.module.parametersHandler){
						current.module.parametersHandler(function(){})
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

		removeChat : function(href){
			if(!app.mobileview) return
 
			var p = parameters(href, true)

			if(!p['pc']){
				return app.platform.matrixchat.backtoapp()
			}
		},

		removeWindows : function(href){
			var p = parameters(href, true)

			var deleted = [];

			_.each(self.wnds, function(pa, id){
				if(!p['m' + id]){

					if (pa.independent) return

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

			app.mobile.reload.initdestroyparallaxAuto()

			
		},
		
		open : function(p){
			
			if(!p) p = {};

				p.clbk || (p.clbk = emptyFunction);

			var run = true;

			if((p.history || p.loadDefault) && options.history)
			{

				if(p.href == current.href && !p.map.exhandler && !p.force){

					if (current.module && current.module.parametersHandler && p.handler){
						
						run = false;
						historyManager.add(p.completeHref, p);

						current.completeHref = p.completeHref;
						

						if(!p.goback && !p.noscroll){
							app.actions.scrollToTop()

							app.mobile.removescrollmodedown()
						}
							

						current.module.parametersHandler(function(){							

							p.clbk(null, p);

							core.removeWindows(p.completeHref)
							core.removeChat(p.completeHref)

							//p = {}

						})

						_.each(self.clbks.history, function(c){
							c(p.href);
						})

						return;
					}
				}


				if(p.completeHref == current.completeHref && !p.loadDefault && !p.force)
				{
					run = false;
				}
				else
				{

					p.lastScroll = app.lastScrollTop // $(window).scrollTop();

					if(!p.reload){
						historyManager.add(p.completeHref, p);

						p.fail = function(){
							sitemessage('<i class="fas fa-wifi"></i>')
						}
					}
					

					if (current.module && !p.inWnd){

						try{

							var stop = current.module.stop(p.href, p);

							if (stop && _.isObject(stop)){

								if (stop.action){
									stop.action(function(){
										core.open(p)

										//p = {}
									})
								}

								return
							}

							if (stop && typeof stop == 'function'){
								p.preshell = stop;
							}

							app.actions.scrollToTop()

							app.mobile.removescrollmodedown()

						}
						catch(e){
							console.error(e)
						}
					}
					

					if (p.href && !p.inWnd){

						current.href = p.href;
						current.completeHref = p.completeHref;
						current.module = p.module;	
						current.essenseData = p.essenseData;	
						current.map = p.map

						var c = p.clbk;

						p.clbk = function(a, b, d){

							if(!p.loadDefault){
								core.removeWindows(p.completeHref)
								core.removeChat(p.completeHref)
							}
							

							/*if (p.goback){
								console.log("GOBACKSCROLL")
								app.actions.scroll(p.goback.scroll)
							}*/

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
				app.actions.scrollToTop()

				app.mobile.removescrollmodedown()

				p.clbk(null, p);
			}

			//p = {}

		},
		
		loadSource : function(map, clbk){

			var cashed = app.module(map.id);

			
			if(loading[map.id]) {

				return loading[map.id].then(() => {
					clbk(app.module(map.id));
				})
				
			}

			//loading[map.id] = true;

			var path = map.path || "";

			var src =  path + options.path + map.uri + "/index.js"; 


			loading[map.id] = new Promise((resolve, reject) => {

				core.loadRelations(map, function(){

					if (window.design || map.ignoreMinimize)
					{
	
						if(!cssimported[map.uri])
						{
							importCss( (map.uri.csspath || path) + options.path + map.uri + "/index.css");
							cssimported[map.uri] = true
						}
					}
					
	
					if(options.cashe && cashed)
					{

						core.loadTemplates(map, function(){
							clbk(app.module(map.id));
							resolve()
						})
					}
					else
					{
	
						importScript(src, function(){

							core.loadTemplates(map, function(){
								clbk(app.module(map.id));
								resolve()
							})
	
						}, null, app, map.id);
					}
	
					
	
				})

			}).finally(() => {
				delete loading[map.id]
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

			if (_OpenApi){
				clbk()

				return
			}

			var map = _.filter(_map || app.map, function(map){
				if(map.now === true) return true;
			})	
			

			lazyEach({
				array : map,
				sync : false,
				action : function(p){
					var obj = p.item;

					if(obj.dontwait){
						if (p.success)
							p.success();
					}

					core.load({
						href : obj.href,
						open : true,
						clbk : function(error)
						{

							if(error)
							{
								
							}

							if (p.success && !obj.dontwait)
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

			if(typeof p.animation == 'undefined' && !isMobile())
				p.animation = 'fadeIn'

			if(p.href){

				p.completeHref || (p.completeHref = p.href)
				p.href = p.href.split("?")[0];

				if (p.saveparameters){

					var currentParameters = parameters(),
						hrefParameters = parameters(p.completeHref, true);
					var filteredParameters = {}

					_.each(p.saveparameters, (i) => {
						if(currentParameters[i]) filteredParameters[i] = currentParameters[i]
					})

					currentParameters = _.extend(filteredParameters, hrefParameters);

					p.completeHref = p.href + collectParameters(currentParameters);

				}

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

					if (err){
						
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

					p = {}

				})

				
				
				return
			}

			if(p.inWnd){

				p.globalpreloaderTimer = setTimeout(function(){
					globalpreloader(true)
				}, 400)
				
			}

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

						p = {}

					})
					

					
				}
				
			})

		},
		externalLink : function(link){

			var href = link.attr('href').toLowerCase(),
				external = link.attr('external');


			var host = self.get.hostname()

			if (host == 'localhost/' || electron || window.cordova) host = app.options.url + '/'

				host = 'https://' + host
		
			var ex = _.find(externalexclusions, function(ex){
				return href.indexOf(ex) != -1
			})

			var e = _OpenApi || external || (
				
			(!href 
				
				|| href.indexOf("mailto") > -1
				|| href.indexOf("skype:") > -1 
				|| href.indexOf('/') > -1 
				//|| href.indexOf('.') > -1
				|| href == "#")
				
				
				&& (href.indexOf(host) == -1) && !thislink(href)
			)

			if (!e && ex) e = true; 


			if (!e) return true;
		},
		externalTarget : function(link){
			var href = link.attr('href');

			var e = href && (href.indexOf('/') > -1 || href.indexOf('.') > -1) || _OpenApi

			if (href.indexOf('http') == -1 && href.indexOf('mailto:') == -1){

				if(_OpenApi) {
					href = app.options.url + '/' + href

					if (app.ref)
						href = self.api.history.addParametersToHref(href, {
							ref : app.ref
						})
				}

				link.attr('href', 'https://' + href)
			}

			if (e)
			{
				link.attr('target', '_blank')
			}


			if(typeof window != 'undefined' && typeof window.cordova != 'undefined' && cordova.InAppBrowser){

				link.off('click').on('click', function(){
	
					var ref = cordova.InAppBrowser.open(href, link.attr('cordovalink') || '_system');
					
					return false
					
				})

			}

			if(typeof _Electron != 'undefined' && electron && electron.shell && electron.shell.openExternal){

				link.off('click').on('click', function(event){
					event.preventDefault();
					
					
					electron.shell.openExternal(this.href);

					return false
					
				})

			}
		},

		thisSiteLink : function(href){

			var host = self.get.hostname()

			if (host == 'localhost/' || electron || window.cordova) host = app.options.url + '/'

				host = 'https://' + host

			var c = href.split(host)

			if (c.length > 1){

				return  c[1]

			}
			else
			{

				var protocol = ((window.project_config || {}).protocol || 'bastyon')

				if (href.indexOf(protocol + '://') == 0){
					href = href.replace(protocol + '://', '')
				}

				return href
			}
		},

		links : function(action, _el, additionalActions){

			if(!options.links) return;	

			var _links = null;

			if(_el) _links = _el.find('a'); else {
				console.error("GLOBAL LINKS")

				return
				//_links = $('a');		
			}

			if(!_links.length) return

			_links.each(function(){

				var link = $(this)

				if(!link.attr('href')) return

				var external = core.externalLink(link);


				if(!external)
				{
			
					if (link.attr('donottrust')){
						link.off('click').on('click', function(e){
							var href = $(this).attr('href');	

							app.mobile.vibration.small()

							var openanother = function(){
								self.api.load({
									open : true,
									id : 'anothersite',
									inWnd : true,

									essenseData : {
										link : href
									}
								})
							}

							app.apps.get.applicationsSearchOld(href).then(apps => {

								if(href.indexOf('http') == -1) href = 'https://' + href

								if(apps.length == 0){
									openanother()
								}
								else{
									var application = apps[0]
									var scope = application.manifest.scope.replace('https://', '')

									var newpath = href.replace('https://', '').replace('http://', '').replace(scope, '')

									if (newpath[0] == '/') newpath = newpath.substring(1)

									var pth  = 'application?id=' + application.manifest.id + (newpath.length ? '&p=' + hexEncode(newpath): '')

									if(app.apps.get.applicationExternalLink(scope)){
										sitemessage(app.localization.e('redirectminiappsuccess', application.manifest.name))

										//app.apps.openInWnd(application, null, hexEncode(newpath))
										self.api.go({
											href : pth,
											history : true,
											open : true
										})

										return
									}
									

									new dialog({
										header: app.localization.e('askdefaultapplink', application.manifest.name),
										btn1text: app.localization.e('dyes'),
										btn2text: app.localization.e('dno'),
										nomoreask : app.localization.e('nomoreaskdefaultapplink', {name : application.manifest.name, scope : scope}),
										class: 'zindex',
						
										success: function (d) {

											if(d.nomoreask){
												app.apps.set.applicationExternalLink(scope, application.manifest.id)
											}

											//app.apps.openInWnd(application, null, hexEncode(newpath))


											self.api.go({
												href : pth,
												history : true,
												open : true
											})

											
										},
						
										fail: function () {
											openanother()
										}
									})

									

									////dialog

									

									


									//

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
				
					var eve = function(e){

						if(blockclick) return false

						blockclick = true

						setTimeout(function(){
							blockclick = false
						}, 800)

						var href = core.thisSiteLink( $(this).attr('href') ) || '';
						var handler = $(this).attr('handler') || null;
						var replace = $(this).attr('replace') || false;
						var force = $(this).attr('replace') || false;
						var mobilepreview = $(this).attr('mobilepreview') || null;

						var arrHref = href.split("?");

						if (arrHref && arrHref[0] === 'welcome' && app.user.address && app.user.address.value){

							const params = new URLSearchParams('?' + arrHref[1]);

							app.platform.matrixchat.connectWith = params.get('connect');
			
							app.platform.matrixchat.joinRoom = params.get('publicroom');
			
							app.platform.matrixchat.connect();
			
							return false;
						}


						if (arrHref && arrHref[0] === 'index'){

							const params = new URLSearchParams('?' + arrHref[1]);

							var ext = params.get('ext');

							if (ext){
								app.platform.ui.externalFromCurrentUrl()
								return false;
							}
							
						}

						if (mobilepreview && app.mobileview){

							try{

								mobilepreview = JSON.parse(mobilepreview)

								self.api.load({
									open : true,
									id : mobilepreview.id,
									inWnd : true,
									history : true,
				
									essenseData : mobilepreview.essenseData || {}
								})

								return false
							}
							catch(e){
								console.log("E", e)
							}

							
						}

						if (additionalActions){
							additionalActions(e);
						}	

						app.mobile.vibration.small()

						core.go({
							action : action,
							href : href,
							history : true,
							open : true,
							handler : handler,
							replaceState : replace,
							force : force,
							fade : app.el.content
						})

						

						return false
					}
					
						
					link.off('click').on('click', eve)
					
				}

			})

			_links = null

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
				if (window.cordova)
				{

					
					switch (device.platform) {
						case "Android":
							storageLocation = 'file:///storage/emulated/0/';
							break;
						case "iOS":
							storageLocation = cordova.file.dataDirectory;
							break;
					}
					
					if(device.platform == 'iOS'){
						var arr = pathname.split('/');
						arr.splice(arr.length-1, 1);
						options.navPrefix = arr.join('/') + '/';
					}
					else{

						if(pathname == '/indexcordova.html'){
							options.navPrefix = '/'
						}
						else{
							var arr = pathname.split("/");
							arr.splice(arr.length-1, 1);
							options.navPrefix = arr.join("/") + "/";
						}

					}

				}
				else {
					options.navPrefix = pathname;
				}

			},

			pathnameSearch : function(){
				var loc =  window.location; 

				return protocolActions.file.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				if (electron){
					var splitted = loc.pathname.split('/')

					return splitted[splitted.length - 1].replace(options.navPrefix, '').replace(".html", "").replace("index_el", "index")
				}

				return loc.pathname.replace(options.navPrefix, '').replace(".html", "").replace('.cordova', "").replace('indexcordova', "index")
			}

		},
		bstn : {
			prefix : function(){

				options.navPrefix = '/'

			},

			pathnameSearch : function(){
				var loc =  window.location; 

				

				return protocolActions.bstn.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				return loc.pathname.replace("bstn://bastyon", "").replace(".html", "").replace(options.navPrefix, '').replace('indexcordova', "index")
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
		changedclbks : function(){
			_.each(self.clbks.history, function(c){
				c(history.state.href);
			})
		},
		history : historyManager,
		links : core.links,
		go : core.go,
		ini : core.openInitialModules,
		backChainIndex : function(){
			return backManager.getindex()
		},
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
					e = true;
				}

				if (clbk)
					clbk(e, r);

			}

			if (p.timeout){
				setTimeout(function(){
					core.load(p)
				}, p.timeout)
			}
			else

				core.load(p)
		},
		
		loadDefault : function(p){
			if(!p) p = {};

			if(!p.href)
				p.href = self.get.pathnameSearch() || defaultpathname;


			var fpt = p.href.split("?")[0]

			if (p.href == 'blank' || !fpt)
				p.href = defaultpathname



			if (fpt == defaultpathname){
				backManager.clearAll()	
			}

			backManager.add(p.href)

			historyManager.add(p.href, { replaceState : true })

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
				animation : p.animation,
				independent : p.independent
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
				pathname = defaultpathname

			return decodeSeoLinks(pathname).replace("#!", "");
		},

		pathnameSearch : function(){
			var pathnameSearch = protocolAction('pathnameSearch')

			if (pathnameSearch == 'blank')
				pathnameSearch = defaultpathname

			return decodeSeoLinks(pathnameSearch).replace("#!", "");
		},
		hostname : function(){
			return hostname + '/'
		}
	}

	self.init = function(p, clbk){

		if(!p) p = {};

		if(typeof window != 'undefined'){

			backManager.load()

			protocolAction('prefix');
			protocolAction('seoRedirect');

			if (window.cordova && backManager.chain.length){
				var href = backManager.chain[0].href || ''

				history.replaceState({

					href : href,
					lfox : true

				}, 'Bastyon', href);
			}
		
			if (options.history === true && !_OpenApi)
			{
				window.onpopstate = function(event)
				{
					try{
						historyManager.openCurrent();
					}
					catch(e){
						sitemessage(app.localization.e('errorreload'))
					}

					if (electron && history.state)
						electron.ipcRenderer.send('electron-url-changed', history.state.href);
					
				};
			}

			core.openInitialModules(function(){

				p.open = true;
				p.history = true;
				p.loadDefault = true;

				var path = parameters().path

				if (path){
					p.href = hexDecode(path)

				}

				if(_OpenApi){
					if(p.clbk) p.clbk()

					return
				}

				self.api.loadDefault(p);

				//////
				var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

				var electronprotocol = ((window.project_config || {}).electron || {}).protocol || ""

				if (!electron && !window.cordova && !electronopen && !app.platform.sdk.usersettings.meta.openlinksinelectron.value && !isMobile() && !isTablet() && !isFirefox && electronprotocol){

					var currentHref = self.get.href();
					var pathname = self.get.pathname();

					var mpobj = app.map[pathname] || _.find(app.map, function(mp){
						return mp.href == pathname
					}) || {};

					var electronDontOpen = false

					if (mpobj.electronDontOpen && !parameters().ext) {

						if(typeof mpobj.electronDontOpen == 'function'){
							electronDontOpen = mpobj.electronDontOpen()
						}
						else{
							electronDontOpen = mpobj.electronDontOpen
						}
					}

					if (!electronDontOpen) {
						var electronHrefs = JSON.parse(localStorage['electron_hrefs'] || "[]");
				
						if (electronHrefs.indexOf(currentHref) == -1 ){

							electronHrefs.push(currentHref)

							try{

								window.location = electronprotocol + '://electron/' + currentHref;
								localStorage['electron_hrefs'] = JSON.stringify(electronHrefs.slice(electronHrefs.length - 100))
								
							}
							catch(e){

								localStorage['electron_hrefs'] = '[]'
							}
						
						} 
					}

					

				}


				electronopen = true
				

				if(clbk) clbk()

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
	self.thisSiteLink = core.thisSiteLink
	self.backManager = backManager

	return self;
}
	

if(typeof module != "undefined")
{
	module.exports = Nav;
}

