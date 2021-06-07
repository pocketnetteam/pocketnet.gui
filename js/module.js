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

		var completeClbk = function(p){

			if(p.el)
			{

				if(!fromModule){

					self.nav.api.links(null, p.el, p.additionalActions || null);
					
				}


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

							if(p){
								if(!key != 'auto'){

									self.app.nav.api.history.removeParameters(['m' + p.id].concat(p.clearparameters || []))

								}
								
								if (p.destroy)

									return p.destroy(key)
							}

							

						};

						self .container = new insert.obj(options);
							p.container = self.container;

						self.container.essenseDestroy = options.destroy

						if (insert.after) 
						{
							topPreloader(100);
							return;
						}

						var el = deep(self, 'container.el')

						if (el){
							p.el = el;
						}

						inserted = true;

					}
					else
					{
						var el = self.app.el[p.el];

						if (el)
							p.el = el;
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

		var animationElHtml = "<div class='animation'></div>";

		var clbk = function(){
			if (p.completeClbk)
				p.completeClbk(p);
		}

		var prepareEl = function(){

			var position = p.el.css('position');
			var overflow = p.el.css('overflow');
			var cssheight = p.el.css('height');
			var csswidth = p.el.css('width');
			var height = p.el.height();
			var width = p.el.width();

			p.el.height(height);
			p.el.width(width);
			p.el.wrapInner(animationElHtml)
			p.el.find(".animation").height(height + "px");
			p.el.find(".animation").width(width + "px");

			p.el.css('overflow', 'hidden')

			if(position != 'absolute' && position != 'fixed')
			{
				p.el.css('position', 'relative');
			}

			return {
				height : height,
				width : width,
				position : position,
				overflow : overflow,
				cssheight : cssheight,
				csswidth : csswidth
			}

		}

		var restoreEl = function(properties){
			p.el.find('.animation').contents().unwrap();
			p.el.css('position', properties.position);
			p.el.height('');
			p.el.width('');
			/*p.el.css('height', properties.cssheight);
			p.el.css('height', properties.csswidth);*/
			p.el.css('overflow', properties.overflow);
			
		}

		p.inner || (p.inner = html);	


		if(p.animation)
		{

			if(!p.animation.timeouts)
				p.animation.timeouts = 100;

			if(p.animation == 'fadeIn')
			{
				
				p.el.fadeOut(100);

				setTimeout(function(){

					p.inner(p.el, _html);
					p.el.fadeIn(200);

					clbk();

					setTimeout(function(){

						if (p.postAnimation)
							p.postAnimation(p);

					}, 200)

				}, 100)

				return;
			}

			if(_.isObject(p.animation))
			{

				if (p.animation.hideOnAnimationPeriod)
				{
					p.animation.hideOnAnimationPeriod.fadeOut(p.animation.timeouts);
				}

				setTimeout(function(){

					var properties = prepareEl()

					var animationEl = p.el.find('.animation')

					if (p.animation.id == 'slide'){

						p.inner = html;

						p.animation.direction || (p.animation.direction = 'onright')

						animationEl.addClass([p.animation.direction, p.animation.id, 'leave'].join(" "))

						animationEl.on('transitionend', function() {

							p.el.html(animationElHtml)

							animationEl = p.el.find('.animation')

							animationEl.addClass([p.animation.direction, p.animation.id, 'enter'].join(" "))

							///
					    	p.inner(animationEl, _html);
					    	clbk();
					    	///

							p.el.height(animationEl.height() + "px");
							p.el.width(animationEl.width() + "px");

							setTimeout(function(){

								animationEl.addClass('original')

						    	animationEl[0].addEventListener('transitionend', function() {
						    		
						    		restoreEl(properties);

						    		if (p.animation.hideOnAnimationPeriod)
									{
										p.animation.hideOnAnimationPeriod.fadeIn(2 * p.animation.timeouts);
									}

						    		if (p.postAnimation)
										p.postAnimation();

						    	})

					    	}, p.animation.timeouts)

					  	});

					}

					if (p.animation.id == 'fadeInByElement'){

						p.inner = html;

						p.animation.selector || (p.animation.selector = ".fadeInByElement");

						var _els = [];

							animationEl.find(p.animation.selector).each(function(){
								_els.unshift($(this));
							})

						var i = 1;

						lazyEach({
							array : _els,
							sync : true,
							action : function(_p){
								var el = _p.item;

									el.fadeOut(p.animation.timeouts / i);

									i = i + 0.333;

								setTimeout(function(){

									_p.success();

								}, p.animation.timeouts / i)
							},
							all : {
								success : function(){
									p.el.html(animationElHtml)

									animationEl = p.el.find('.animation')

									animationEl.addClass([p.animation.direction, p.animation.id, 'enter'].join(" "))

									///
							    	p.inner(animationEl, _html);
							    	animationEl.find(p.animation.selector).fadeOut(1);
							    	clbk();
							    	///

									p.el.height(animationEl.height() + "px");
									p.el.width(animationEl.width() + "px");

									var _els = [];

										animationEl.find(p.animation.selector).each(function(){
											_els.push($(this));
										})

									var i = 0;

									lazyEach({
										array : _els,
										sync : true,
										action : function(_p){
											var el = _p.item;

												el.fadeIn(p.animation.timeouts / i)

												i = i + 0.333;

											setTimeout(function(){

												_p.success();

											}, p.animation.timeouts / i)
										},
										all : {
											success : function(){

												animationEl.addClass('original')

												restoreEl(properties);

												if (p.postAnimation)
													p.postAnimation();

											}
										}
									})
								}
							}
						})

					}

				}, p.animation.timeouts)
			}
		}
		else
		{

			p.inner(p.el, _html);


			if(!p.notdisplay){
				p.display || (p.display = "block")
				p.el.css("display", p.display)
			}


			if (p.postAnimation)
				p.postAnimation();
		}	
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

			p.rendered = template(p.data);

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

		
		
		if(self.storage.templates[p.name] || p.clear)
		{			
			if (clbk)
				clbk(self.storage.templates[p.name]);
		}
		else
		{

			if (self.map && self.map.id){
				var pretemplate = deep(window, 'pocketnetTemplates.' + (p.turi || self.map.uri) + '.' + p.name)

				if(pretemplate){
					self.storage.templates[p.name] = _.template(pretemplate);
	
					if (clbk)
						clbk(self.storage.templates[p.name]);
		
					return
				}

				
			}

			loading.templates[p.name] = true;

			var url;
			var appPath = (self.map.pathtpl || self.map.path || "");	

			if (_Node){
				appPath = 'https://pocketnet.app/'
			}		

			if(p.common){

				url = appPath + 'common';

			}
			else
			{
				url = appPath + (self.componentsPath || "") + (p.turi || self.map.uri)
			}

				url += '/templates/' + p.name + '.html?v=122';
			
			self.ajax.run({
				url : url,
				type : 'GET',
				dataType : 'html',
				success : function(tpl){

					self.storage.templates[p.name] = _.template(tpl);

					if (clbk)
						clbk(self.storage.templates[p.name]);

					loading.templates[p.name] = false;

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

	self.add = function(_settings, p){

		topPreloader(10);

		var settings = _.clone(_settings);

		var add = self.map.add;
		var frommodule = true;

		if (p.restartModule) frommodule = false

		if (typeof add == 'function')

			add = add(settings, p);

		settings = _.extend(settings, add);
		settings = _.extend(settings, p);	


		self.user.isState(function(state){	
			
			settings.getdata(function(data){

				topPreloader(45);

				settings.data = data || {};

				if(p.preshell) p.preshell();

				self.shell(settings, function(p){

					topPreloader(100);	

					p.clbk = addToFunction(p.clbk, function(){

						if (primary(p) && !p.inWnd && !p.noscroll && !p.goback) {


							_scrollTop(0, null, 50);
						}

						if (settings.auto){
							settings.auto(p)
						}

					})				


					if (settings.init)
						settings.init(p)

				}, frommodule)

			}, {
				state : state,
				settings : settings
			});	

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

				if(p.el) p.el.html('')

				if (p.clbk)
					p.clbk('anonimus')
			}

			

		}, p)
	}

	self.redirect = function(p, href){

		var _p = {};

			_p.href = href;
			_p.history = true;
			_p.open = true;
			_p.preshell = p.preshell;
			_p.clbk = p.clbk;

		self.nav.api.load(_p)


	}

	self.restart = function(p){

		if(!p) p = {};

		p.restartModule = true

		self.stop(p);
		self.run(p);
	}

	self.addEssense = function(essenses, Essense, p){

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