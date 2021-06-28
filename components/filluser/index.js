var filluser = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ext, essenseData, initialParameters, fm;

		var scrollel = null;

		var networkInterval = null;

		var getrefname = function(clbk){
			if (self.app.ref){
				self.sdk.users.get(self.app.ref, function(){

					var name = deep(self, 'sdk.users.storage.' + self.app.ref + '.name');

					if (clbk)
						clbk(name)
				})
			}
			else{
				if (clbk)
					clbk(null)	
			}
		}

		var needcaptcha = false;
		var gliperror = false;

		var gettype = function(){
			var fref = self.app.ref || '';


			var type = 'Overall'

			if(fref.indexOf('author') > -1) type='Account'
			if(fref.indexOf('&s=') > -1 || fref.indexOf('&v=') > -1) type='Post'

			return type
		}

		var steps = {

			captcha : {
				id : 'captcha',
				render : 'captcha',

				nextindex : 'email',

				prev : function(clbk){

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";

					if (requested){
						actions.next()

						return
					}


					balance.check(function(result){

						if (result){
							actions.next()
						}
						else
						{
							self.sdk.captcha.get(function(captcha, error){

								if (error){

									actions.to('network')

									return
								}

								
								if (captcha.done){

									actions.next()

									balance.request()

								}
								else{

									steps.captcha.current = captcha

									clbk()
								}

							}, true)
						}

					}, true)

				},

				after : function(el, pel){

					var input = el.find('.ucaptchainput');
					var redo = el.find('.redo')
					var save = el.find('.addCaptcha')
					var text = '';

					setTimeout(function(){
						input.focus()
					}, 150)
						

					var validate = function(v){

						if(/^[a-zA-Z0-9]{4,}$/.test(v)){
							return true;
						}
						else
						{
							return false;
						}
					}

					input.on('keyup', function(){
						text = $(this).val()

						if(validate(text)){
							save.removeClass('disabled')
						}
						else
						{
							save.addClass('disabled')
						}
					})

					save.on('click', function(){

						var text = input.val()

						if (validate(text)){
							
							self.sdk.captcha.make(text, function(error, captcha){

								if (error == 'captchashots'){

									sitemessage(self.app.localization.e('e13118'))

									actions.redo()

									return
								}

								if (error){
									sitemessage(self.app.localization.e('e13118'))

									return 
								}
							
								if (captcha.done){
									actions.next()

									balance.request()
								}
						
							}, true)

						}
					})

					redo.one('click', function(){


						actions.redo()
					})
				}
			},
			email : {

				id : 'email',

				nextindex : 'money',

				prev : function(clbk){

					log.referral()
					
					if (localStorage['uei']){
						actions.next()
					}	
					else
					{
						clbk()	
					}
					
				},

				render : 'email',
				after : function(el, pel, time){

					var save = function(email, clbk){

						topPreloader(20)						

						var _p = {
							Email : email,
							Lang : self.app.localization.key || 'en',
						}

						_p.Action || (_p.Action = 'ADDTOMAILLIST');
						_p.TemplateID = '1005'

						_p.ref = ''
						
			
						getrefname(function(name){
			
							var body = ''

							_p.ref += gettype()
			
							if (name) {
								
								_p.ref += ', ' + name
			
								body += '<p><a href="https://'+self.app.options.url+'/author?address='+self.app.ref+'">Referrer: '+name+'</a></p>'
							}							
			
							var r = deep(document, 'referrer')
			
							if (r) {
								body += '<p><a href="'+r+'">From: '+r+'</a></p>'
							}
			
							_p.body = encodeURIComponent(body)
			
							$.ajax({
								type: 'POST',
								url: 'https://'+self.app.options.url+'/Shop/AJAXMain.aspx',
								data: _p,
								dataType: 'json',
								success : function(){
				
									topPreloader(100)
				
									if (clbk)
										clbk();
				
								}
							});
						})
					}

					var validate = function(v){


						if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v)){
							return true;
						}
						else
						{
							return false;
						}
					}

					var input = el.find('.uemailinput');
					var skip = el.find('.skip')
					var addEmail = el.find('.addEmail')

					var email = '';

					input.focus()

					input.on('keyup', function(){
						email = $(this).val()

						if(validate(email)){
							addEmail.removeClass('disabled')
							skip.addClass('hidden')

							addEmail.html(self.app.localization.e('e13119'))
						}
						else
						{
							addEmail.addClass('disabled')
							skip.removeClass('hidden')

							addEmail.html(self.app.localization.e('e13113'))
						}
					})

					addEmail.on('click', function(){

						var email = input.val()

						if(validate(email)){


							actions.next()
							localStorage['uei'] = true;

							save(email, function(){
								
							})

						}
					})

					skip.one('click', function(){


						localStorage['uei'] = true

						actions.next()
					})
					
				}


			},
			money : {

				id : 'money',
				nextindex : 'settings',

				prev : function(clbk){

					balance.check(function(result){

						if (result){
							actions.next()
						}
						else
						{

							if (needcaptcha){
								actions.to('captcha')
		
								return
							}
		
							if (gliperror){
								actions.to('moneyfail')
								return
							}

							clbk()
						}

					})
					
				},

				ret : false,

				render : 'money',

				after : function(el, pel, time){

					actions.timer(el.find('.time'), time || 59, function(){

						balance.check(function(result){

							if (result && (current == 'money' || current =='captcha')){


								actions.next()

							}

							else{

								el.find('.subcaption').html(self.app.localization.e('wesentmoneydelay'))

								steps.money.after(el, pel, 30)
							}

						}, true)

						
					})
				}


			},
			settings : {
				id : 'settings',
				nextindex : 'welcome',

				prev : function(clbk){

					clbk()


					/*self.app.platform.sdk.ustate.me(function(mestate){
						if(!mestate){
							actions.to('network')
						}
						else
						{

							

							clbk()
						}
					})	*/				
				},

				render : 'settings',

				after : function(el, pel){

					
				},

				next : true
				
			},
			welcome : {

				id : 'welcome',

				prev : function(clbk){

					clbk()
				},

				render : 'welcome',

				after : function(el){


					setTimeout(function(){

						self.nav.api.go({
							href : 'index?r=recommended',
							history : true,
							open : true
						})

					}, 1500)

					el.find('.welcome').on('click', function(){


						if (deep(essenseData, 'successHref') == '_this'){


							var close = deep(initialParameters, 'container.close')

							if (close)
								close();
								
							if (essenseData.signInClbk)
								essenseData.signInClbk();
					

						}
						else
						{

							self.nav.api.go({
								href : 'index?r=recommended',
								history : true,
								open : true
							})	

						}


						
					})
				}


			},
			network : {

				id : 'network',

				prev : function(clbk){


					clbk()
				},

				render : 'network',

				after : function(el){


					self.app.errors.clbks.filluser = function(){

						if(app.errors.state.proxy || app.errors.state.proxymain)  return

						if (current == 'network' && !self.app.platform.loadingWithErrors){
							actions.to('captcha')
						}

						delete self.app.errors.clbks.filluser
					}

					/*if (networkInterval)
						clearInterval(networkInterval)

					var networkInterval = setInterval(function(){

						self.app.platform.sdk.ustate.me(function(mestate){

							if(mestate){


								clearInterval(networkInterval)
								actions.to('money')
							}

						})

					}, 5000)*/
				}


			},
			moneyfail : {

				id : 'moneyfail',
	
				prev : function(clbk){
	
					clbk()
				},
	
				render : 'moneyfail',
	
				after : function(el){

					var b = function(){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							el.find('.balance').html('Balance: ' + self.app.platform.mp.coin(amount) + " PKOIN")
						})
					}
					
					b()

					
	
					el.find('.check').on('click', function(){
	
						topPreloader(20);
	
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							
							topPreloader(100);
	
							if(amount > 0){
	
								if (current == 'moneyfail')
									actions.to('settings');
	
								delete self.app.platform.sdk.node.transactions.clbks.moneyfail
							}
	
							b()
	
						})	
	
						self.app.platform.sdk.node.transactions.clbks.moneyfail = function(){
	
							self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
	
								if (amount > 0){
	
									if (current == 'moneyfail'){
										actions.to('settings');
									}
	
									delete self.app.platform.sdk.node.transactions.clbks.moneyfail
								}
							})
							
						}
					})
				}
	
			}

		}

		

		var current = null;

		var arrange = _.map(steps, function(s, i){
			return i;
		})

		var getindex = function(current){
			return _.findIndex(arrange, function(s){
				return s == current
			})
		}

		var log = {
			referral : function(){

				getrefname(function(name){
					var type = gettype()
					var r = deep(document, 'referrer')



					
				})

			}
		}

		var balance = {

			request : function(clbk){

				self.sdk.users.requestFreeMoney(function(res, err){

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";

					if(!res && !requested){

						if (err == 'captcha'){

							needcaptcha = true;

							if (current == 'money' || current == 'captcha'){
								actions.to('captcha')
							}

						}

						if (err == 'error'){
							gliperror = true

							if (current == 'money' || current == 'captcha'){
								actions.to('captcha')
							}

						}

						if (clbk)
							clbk(false, 'err')
						
					}	
					
					else{

						self.app.settings.set(address, 'request', 'true')

						balance.follow()

						if (clbk)
							clbk(true)
					}
					
				})	
			},

			check : function(clbk, update){

				self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

					if (clbk)
						clbk(amount > 0)
					
				}, update)

			},

			follow : function(){
				self.app.platform.sdk.node.transactions.clbks.filluser || (
				self.app.platform.sdk.node.transactions.clbks.filluser = function(){

					delete self.app.platform.sdk.node.transactions.clbks.filluser

					balance.check(function(result){

						if (result){							

							if(current == 'money'){				

	
								actions.next()
	
							}

						}	
						
						else{

							balance.follow()

						}

					})
					
				})
			}

		}

		var actions = {
			to : function(step, clbk){
				current = step;
				actions.makeStep(clbk)
			},

			redo : function(clbk){
				actions.makeStep(function(){

				})
			},

			next : function(clbk){

				if (current) {
					current = steps[current].nextindex
				}
				else{
					current = steps.captcha.id
				}



				if(!current) return

				actions.makeStep(function(){

				})
			},

			makeStep : function(clbk){

				var step = steps[current];


				if (step){			

					step.prev(function(){

						if(!el.c){

							return
						}

						el.c.attr('step', step.id)

						renders.panel(step, function(pel){
							renders.step(step, function(el){

								_scrollTop(el, scrollel)

								pel.find('.elpanel').addClass('active')
							
								step.after(el, pel)

							})

						})

					})

				}
				else
				{
				}

					
			},

			timer : function(el, time, clbk){

				var progress = new CircularProgress({
					radius: 120,
					strokeStyle: '#00A3F7',
					lineCap: 'round',
					lineWidth: 1,
					font: "100 56px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",
					fillStyle : "#5D5D5D",
					text : {						
						value : ""
					},
					initial: {
						strokeStyle: '#fff',
						lineWidth: 1
					}
				});

				el.find('.circle').html(progress.el);

				var update = function(_time){

					var ms = secInTime(_time / 1000).split(":");

					el.find('.t .min').html(ms[0])
					el.find('.t .sec').html(ms[1])

					progress.options.text = {
						value: ''
					};

					var p = (1 - (_time / (time * 1000))) * 100;

					if (p < 0) p = 0;

					progress.update(p);

				}

				var end = function(){

					if (clbk)
						clbk()
				}

				timer = new Timer({

					ontick : function(){
				    
						update(timer.getDuration())
						
					},

					onend : end

				});

				timer.start(time);

				update(timer.getDuration());	
	
			},
			
		}

		var events = {
			width : function(){


				if(!current) return

				var activestep = steps[current]

				var _el = el.c.find('.step[step="'+activestep.id+'"] .stepBody');
				var s = _el.closest('.step');
				var line = el.c.find('.stepsWrapperLine');

				var w = s.closest('.stepsWrapper').width()

				el.c.find('.step').width(w)




				line.css('margin-left', '-' + ((getindex(current)) * w) + 'px')

				line.width(w * _.toArray(steps).length)
			
			}
		}

		var renders = {

			step : function(step, clbk){

				el.c.find('.step').removeClass('active');

				var _el = el.c.find('.step[step="'+step.id+'"] .stepBody');
				var s = _el.closest('.step');
				var line = el.c.find('.stepsWrapperLine');

				renders[step.render](_el, function(_el){

					var w = s.closest('.stepsWrapper').width()

					el.c.find('.step').width(w)

					
					line.width(w * _.toArray(steps).length)


					var m = '-' + (getindex(current) * w) + 'px'

					line.css('margin-left', m)

					s.closest('.step').addClass('active')


					if (clbk)
						clbk(_el)
				})

			},

			panel : function(step, clbk){
				self.shell({

					name :  'panel',
					el :   el.panel,
					data : {
						step : step
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			captcha : function(el, clbk){
				self.shell({

					name :  'captcha',
					el :   el,
					data : {
						captcha : steps.captcha.current
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			email : function(el, clbk){
				self.shell({

					name :  'email',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			welcome : function(el, clbk){
				self.shell({

					name :  'welcome',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			moneyfail : function(el, clbk){
				self.shell({

					name :  'moneyfail',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			network : function(el, clbk){

				self.shell({

					name :  'network',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			money : function(el, clbk){
				self.shell({

					name :  'money',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			settings : function(_el, clbk, pel){

				self.nav.api.load({

					open : true,
					id : 'test',
					el : _el,

					essenseData : {
						wizard : true,
						panel : el.panel,

						success : function(){
							actions.next()
						}
					},
					
					clbk : function(e, p){

						ext = p

						if (clbk)
							clbk(_el);

					}

				})

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			window.addEventListener('resize', events.width)

		}

		var make = function(){
			actions.next();
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				needcaptcha = false;
				gliperror = false;

				essenseData = p.settings.essenseData || {}

				current = null;

				var data = {
					steps : steps
				};


				if(!self.app.user.validate()){

					if (self.app.errors.connection()){
						self.app.nav.api.load({
							open : true,
							href : 'userpage?id=test',
							history : true
						})
					}
					else{
						self.fastTemplate('panel', function(rendered){
						
							clbk(data);
	
						})
					}

					
				}
				else
				{
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})
				}

				

			},

			destroy : function(){

				if(networkInterval)
					clearInterval(networkInterval)

				window.removeEventListener('resize', events.width)

				if (ext)
					ext.destroy()

				ext = null

				el = {};

				$("html").removeClass("fillinguser")
			},
			
			init : function(p){


				

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.panel = el.c.find('.panelWrapper')

				initEvents();

				initialParameters = p;

				make();

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null;

				$("html").addClass("fillinguser")

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = filluser;
}
else{

	app.modules.filluser = {};
	app.modules.filluser.module = filluser;

}