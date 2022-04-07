nModule = function(){
	var self = this;

	var loading = {
		templates : {}
	}

	self.storage = {
		els : {},
		templates : {} 
	} 

	self.options = {};

	self.api = {};

	self.map = {};

	self.essenses = {};

	self.iclbks = {

	}

	self.inserts = {
		wnd : {
			obj : wnd,
			storageKey : 'wnd',
			after : true
		},
		tooltip : {
			obj : tooltip,
			storageKey : 'tooltip',
			after : true
		}
	}

	self.anonimus = function(clbk, p){

	
		if(!self.map.anonimus)
		{
			self.user.isState(

				function(state){

					if(state)
					{
						if(!self.user.validate()){
							var href = deep(self, "map.redirect.validate");

							if (href){

								self.redirect(p, href)

								clbk(false)

								return

							}

						}
						

						clbk(true)
					}
					else
					{


						var href = deep(self, "map.redirect.auth");

						if (href){

							self.redirect(p, href)

						}

						clbk(false)
					}

				}
			)
		}

		else
		{
			clbk(true)
		}
	}



	self.shell = function(p, clbk, fromModule){

		if(!p) p = {};

		delete p.animation

		
		var completeClbk = function(p){

			if(p.el && !p.ignorelinksandimages)
			{
				self.nav.api.links(null, p.el, p.additionalActions || null);
				bgImages(p.el, p.bgImages)
			}

			if (typeof clbk  === 'function'){
				clbk(p);
			}
			
		}

		p.completeClbk = completeClbk;

		self.loadTemplate(p, function(template){

			self.renderTemplate(template, function(html){


				var inserted = false;

				if(!_.isObject(p.el) || p.insert)
				{

					var insert = self.inserts[p.insert];

					if (insert)
					{
						var options = p[insert.storageKey] || {};

							options.content = html;
							options.el = p.el;
							options.app = self.app

						if (insert.after)
						{
							options.clbk = function(_p){

								if(!_p) _p = {};

								p = _.extend(p, _p)

								completeClbk(p)

							}
							
						}

						options.destroy = function(key){

							var r = null

							if (p){

								if (key != 'auto'){
									
									if(p.history)
										self.app.nav.api.history.removeParameters(['m' + p.id].concat(p.clearparameters || []))
									
									try{
										self.app.nav.api.changedclbks()
									}
									catch(e){
										console.error(e)
									}

								}
								
								if (p.destroy) {
									r = p.destroy(key)
								}
							}

							console.log("CLEAR P", p)

							if (p.inWnd){
								delete self.app.nav.wnds[p.id]
							}

							//p = null

							return r

						};

						var type = p.essenseData && p.essenseData.type

						if (type){

							options.type = type;

						}

						self .container = new insert.obj(options);
							p.container = self.container;

						self.container.essenseDestroy = options.destroy

						if (insert.after) 
						{
							topPreloader(100);
							return;
						}

						if (self.container && self.container.el ){
							p.el = self.container.el;
						}

						inserted = true;

					}
					else
					{
						if (self.app.el[p.el]) p.el = self.app.el[p.el];
					}

				}

				if(typeof p.el == 'function') p.el = p.el();
			
				if(!inserted)
				{
					if (p.el) {
						self.insertTemplate(p, html);
					}
				}

				if(!p.animation)
				{
					completeClbk(p);
				}

			} ,p)

		})

	}

	self.insertTemplate = function(p, _html){

		p.inner || (p.inner = html);	

		p.inner(p.el, _html);

		if (p.display){
			p.el.css("display", p.display)
		}

		if (p.postAnimation)
			p.postAnimation();
	}

	self.renderTemplate = function(template, clbk, p){
		if(!p) p = {};

		self.user.isState(function(state){	

			p.data || (p.data = {});

			p.data.app = self.app;	
			p.data.e = self.app.localization.e;
			p.data.state = state;
			p.data.module = self;	
			p.data.user	= self.user;
			p.data.essenseData = p.essenseData || {};

			try{
				p.rendered = template(p.data);
			}
			catch(e){
				console.log(p)
				console.error(e)
				p.rendered = ''
			}
			

			if (p.clear)
				p.rendered = "";

			if (clbk)
				clbk(p.rendered)

		})
	}

	self.loadTemplate = function(p, clbk){

		if(!p) p = {};

		p.name || (p.name = 'index');

		if(loading.templates[p.name]){

			retry(
				function(){
					return !loading.templates[p.name];
				},
				function(){
					self.loadTemplate(p, clbk)
				}
			)

			return
		}

		if (self.storage.templates[p.name] || p.clear)
		{			
			if (clbk)
				clbk(self.storage.templates[p.name]);
		}
		else
		{

			if (self.map && self.map.id){
				var pretemplate = deep(window, 'pocketnetTemplates.' + (p.turi || self.map.uri) + '.' + p.name)

				if (pretemplate){

					try{
						self.storage.templates[p.name] = _.template(pretemplate);
					}
					catch(e){
						console.error(e)
					}
					
	
					if (clbk)
						clbk(self.storage.templates[p.name] || '');
		
					return
				}

				
			}

			loading.templates[p.name] = true;

			var url;
			var appPath = (self.map.pathtpl || self.map.path || "");	

			if (_Node){
				appPath = 'https://bastyon.com/'
			}		

			if(p.common){

				url = appPath + 'common';

			}
			else
			{
				url = appPath + (self.componentsPath || "") + (p.turi || self.map.uri)
			}

			var vs = '131'

			if (typeof numfromreleasestring != 'undefined'){
				vs = numfromreleasestring(window.packageversion)
			}

			url += '/templates/' + p.name + '.html?v=' + vs;

			
			self.ajax.run({
				url : url,
				type : 'GET',
				dataType : 'html',
				success : function(tpl){

					try{
						self.storage.templates[p.name] = _.template(tpl);
						loading.templates[p.name] = false;
					}

					catch(e){
						console.log('p.name', p.name, url)
						console.error(e)
					}

					if (clbk) clbk(self.storage.templates[p.name]);
					

				},
				fail : function(){

					if (p.fail){
						p.fail()
					}

				}
			});
		}
	}

	self.fastTemplate = function(name, clbk, data, turi){
		self.loadTemplate({
			name : name,
			turi : turi || "",
		}, function(template){

			self.renderTemplate(template, function(html){

				if (clbk)
					clbk(html, template)

			}, {
				
				data : (data || null)
			})
		})
	}

	var primary = function(p){
		return p.history && p.el
	}

	var beforegetdata = function(settings, clbk){

		if (self.map.preshell && settings.el && isMobile()){

			self.shell({

				name :  'preshell',
				el :   settings.el,
				data : {},

				animation: settings.animation,
				fast : settings.fast

			},

			function(p){

				if (primary(settings) && !settings.inWnd && !settings.noscroll && !settings.goback) {
					self.app.actions.scrollToTop()
				}

				delete settings.animation

				settings.fast = true

				if (clbk)
					clbk()

			}, true)

		}
		else{

			if (clbk)
				clbk()

		}
	}

	self.add = function(_settings, p){

		topPreloader(10);

		var settings = _.clone(_settings);

		var add = self.map.add;
		var frommodule = true;
		var globalpreloaderTimer = p.globalpreloaderTimer || null


		if (p.restartModule) frommodule = false

		if (typeof add == 'function')

			add = add(settings, p);

		settings = _.extend(settings, add);
		settings = _.extend(settings, p);	

		/*if(p.inWnd){

			globalpreloaderTimer = setTimeout(function(){
				globalpreloader(true)
			}, 100)
			
		}*/

		beforegetdata(settings, function(){
			self.user.isState(function(state){	
				
				
				settings.getdata(function(data){

					topPreloader(45);

					settings.data = data || {};

					if(p.preshell) p.preshell();

					self.shell(settings, function(p){

						if(globalpreloaderTimer){

							globalpreloader(false)

							clearTimeout(globalpreloaderTimer)
						}

						topPreloader(100);	

						p.clbk = addToFunction(p.clbk, function(){

							if (primary(p) && !p.inWnd && !p.noscroll && !p.goback) {
								self.app.actions.scrollToTop()
							}

							if (settings.auto){
								settings.auto(p)
							}

							//p = null

						})				


						if (settings.init)
							settings.init(p)

					}, frommodule)

				}, {
					state : state,
					settings : settings
				});	

			})
		})

	}

	self.init = function(settings, p){

		p || (p = {});
		settings || (settings = {});

		self.anonimus(function(result){

			if(result){

				self.inited = true;

				self.add(settings, p);

			}
			else{

				if (p.globalpreloaderTimer){

					globalpreloader(false)
					
					clearTimeout(p.globalpreloaderTimer)
				}

				if (p.el) p.el.html('')

				if (p.clbk)
					p.clbk('anonimus')
			}

			p = null

		}, p)
	}

	self.redirect = function(p, href){

		var _p = {};

			_p.href = href;
			_p.history = true;
			_p.open = true;
			_p.replaceState = true
			_p.preshell = p.preshell;
			_p.clbk = p.clbk;

		self.nav.api.load(_p)


	}

	self.restart = function(p){

		if (self.user){
			if(!p) p = {};

			p.restartModule = true

			self.stop(p);
			self.run(p);
		}	
		
	}

	self.addEssense = function(essenses, Essense, p){
		////// ??
		self.essenses = essenses

		var essense = new Essense(p);

		var id = essense.id || p.eid || 'secondary';

		if (p.primary || p.loadDefault) essense.primary = true;

		if (essense.primary) id = 'primary';

		if(!essenses[id]){

			essenses[id] = essense;

		}
		else
		{
			delete essense;
		}

		essenses[id].destroyed = false;

		p.clearessense = essense.clearessense = function(){
			self.removeEssense(essenses, id)
		}

		return essenses[id];
	}

	self.removeEssense = function(essenses, id){
		if (essenses[id])
		{
			essenses[id].destroy();

			delete essenses[id];
		}
	}

	self.closeContainer = function(key){

		var close = deep(self, 'container.close')

		if (close){

			close(null, key);

			return true
		}
	}

	self.clearCanvas = function(p){

		p.clear = true;

		self.shell(p)

	}

	self.parametersHandler = function(){
		_.each(self.essenses, function(e){

			if (e.parametersHandler)
				e.parametersHandler()
		})
	}

	

	return self;
}

if(typeof module != "undefined")
{
	module.exports = nModule;
}
