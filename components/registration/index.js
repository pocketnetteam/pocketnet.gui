var registration = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {}, k = {}, needcaptcha = false, gliperror = false, essenseData, initialParameters, ext = null;
		
		var categoryIcons = [
			{
				"id": "c2",
				"icon": "far fa-smile"
			},
			{
				"id": "c3",
				"icon": "fas fa-landmark"
			},
			{
				"id": "c4",
				"icon": "fab fa-bitcoin"
			},
			{
				"id": "c5",
				"icon": "fas fa-microscope"
			},
			{
				"id": "c55",
				"icon": "fas fa-book"
			},
			{
				"id": "c6",
				"icon": "fas fa-dollar-sign"
			},
			{
				"id": "c73",
				"icon": "fas fa-fist-raised"
			},
			{
				"id": "c72",
				"icon": "fas fa-thermometer"
			},
			{
				"id": "c7",
				"icon": "fas fa-flag-checkered"
			},
			{
				"id": "c8",
				"icon": "fas fa-running"
			},
			{
				"id": "c9",
				"icon": "fas fa-gamepad"
			},
			{
				"id": "c10",
				"icon": "fas fa-space-shuttle"
			},
			{
				"id": "c11",
				"icon": "fas fa-music"
			},
			{
				"id": "c12",
				"icon": "fas fa-newspaper"
			},
			{
				"id": "c13",
				"icon": "fas fa-history"
			},
			{
				"id": "c14",
				"icon": "fas fa-bookmark"
			},
			{
				"id": "c15",
				"icon": "fas fa-film"
			},
			{
				"id": "c16",
				"icon": "fas fa-paw"
			},
			{
				"id": "c17",
				"icon": "fas fa-route"
			},
			{
				"id": "c18",
				"icon": "fas fa-pencil-ruler"
			}
		]

		
		var current = null;
		var regproxy = null;

		var getproxyoptions = function(){

			if(regproxy){
				return {
					proxy : regproxy.id
				}
			}

			return {}
		}

		var steps = {
			settings : {
				id : 'settings',
				nextindex : 'captcha',

				prev : function(clbk){

					clbk()
			
				},

				render : 'settings',

				after : function(el, pel){

					
				},

				next : true				
			},

			captcha : {
				id : 'captcha',
				render : 'captcha',
				nextindex : function(){
					if(self.app.curation()){
						return 'welcome'
					}
					
					return 'categories'
				},  

				prev : function(clbk){

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";

					if (requested){

						var regs = app.platform.sdk.registrations.storage[address];

						if (regs && (regs == 2)) {
							self.sdk.registrations.add(address, 3)
						}
						
						actions.next()

						return
					}


					balance.check(function(result){

						if (result){

							var regs = app.platform.sdk.registrations.storage[address];

							if (regs && (regs == 2)) {
								self.sdk.registrations.add(address, 3)
							}
							
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

									actions.preloader(true)

									balance.request(function(r){

										actions.preloader(false)

										if(r){
											actions.next()
										}

									})

								}
								else{

									steps.captcha.current = captcha

									clbk()
								}

							}, true, getproxyoptions())
						}

					}, true)

				},

				after : function(el, pel){

					var input = el.find('.ucaptchainput');
					var redo = el.find('.redo')
					var save = el.find('.addCaptcha')
					var text = '';

						input.focus()

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

					input.on('focus', function(){

						if (self.app.mobileview) setTimeout(function(){_scrollTo(input, el.c.closest('.customscroll')), 200})

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
									
									actions.preloader(true)
									
									balance.request(function(r){

										actions.preloader(false)

										if(r){
											actions.next()
										}

									})
								}
						
							}, getproxyoptions())

						}
					})

					redo.one('click', function(){

						actions.redo()
					})
				}
			},	

			welcome : {

				id : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					if (essenseData.welcomepart)
						essenseData.welcomepart()

					clbk()
				},

				render : 'welcome',

				after : function(el){

					var c = false

					var clbk = function(){

						if(c) return

						c = true

						if (deep(essenseData, 'successHref') == '_this'){

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							if (essenseData.signInClbk)
								essenseData.signInClbk();

						}
						else
						{
							self.app.platform.sdk.registrations.redirect

							self.nav.api.go({
								href : self.app.platform.sdk.registrations.redirect || 'index',
								history : true,
								open : true
							})	

						}

						localStorage['regproxy'] = ''

						self.app.platform.sdk.registrations.redirect = null

						if (isMobile()){
							self.app.platform.ui.showmykey({
								afterregistration : true
							})
						}
						else{
							self.app.platform.ui.showmykeyfast({
								showsavelabel : true
							})
						}
						
					}

					setTimeout(function(){

						clbk()

					}, 1500)

					el.find('.welcome').on('click', function(){

						clbk()
						
					})
				}


			},

			
			categories : {

				id : 'categories',
				nextindex : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					if (essenseData.welcomepart)
						essenseData.welcomepart()

					clbk()
				},

				render : 'categories',

				after : function(el){

					var elCategories = el.find('.cat');
					var next = el.find('.next');
					var skip = el.find('.skip');

					self.app.platform.sdk.categories.clear()
					
					var activeCategories = [];

					elCategories.on('click', function(){

						var cat = $(this);
						var id = cat.attr('cat');

						var activeIdx = activeCategories.findIndex(function(c){
							return c === id;
						})

						if (cat.hasClass('active')){

							cat.removeClass('active')
							if (activeIdx > -1){
								activeCategories.splice(activeIdx, 1);
							}

						} else {

							cat.addClass('active')
							if (activeIdx === -1){
								activeCategories.push(id);
							}
						}

						if (activeCategories.length){

							next.addClass('active')

						} else {

							next.removeClass('active')
						}

					})

					var c = false

					var clbk = function(activeCategories){

						if(c) return

						c = true

						for (var catId of activeCategories){
							self.app.platform.sdk.categories.select(catId);
						}

						

						actions.next()
						
					}

					next.on('click', function(){

						if (activeCategories.length){
							clbk(activeCategories)
						}	
						
					})

					
					skip.on('click', function(){

						clbk([])
						
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


					self.app.errors.clbks.registration = function(){

						if(app.errors.state.proxy || app.errors.state.proxymain)  return

						if (current == 'network' && !self.app.platform.loadingWithErrors){
							actions.to('captcha')
						}

						delete self.app.errors.clbks.registration
					}
				}


			},

			moneyfail : {

				id : 'moneyfail',
	
				prev : function(clbk){
	
					clbk()
				},
	
				render : 'moneyfail',
	
				after : function(el){

					var address = self.sdk.address.pnet().address;

					var b = function(){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							
							el.find('.balance').html('Balance: ' + self.app.platform.mp.coin(amount) + " PKOIN")
						
							if(amount > 0){

								var regs = app.platform.sdk.registrations.storage[address];

                                if (regs && (regs == 2)) {
                                    self.sdk.registrations.add(address, 3)
                                }
	
								if (current == 'moneyfail'){
									setTimeout(function(){
										actions.to('welcome');	
									}, 100)
									

								}
									
	
								delete self.app.platform.sdk.node.transactions.clbks.moneyfail
							}
						})
					}

					var ch = function(){

						console.log('allBalanceCheck')

						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							
							topPreloader(100);


							console.log('allBalance', amount)
	
							b()
							
	
						}, true)
					}
					
					b()

					el.find('.tryagain').on('click', function(){
						balance.request(function(r){

							if(r){
								actions.next()
							}

						})
					})
	
					el.find('.check').on('click', function(){
						ch()
					})

					self.app.platform.sdk.node.transactions.clbks.moneyfail = b
				}
	
			}

		}

		var arrange = _.map(steps, function(s, i){
			return i;
		})

		var getindex = function(current){
			return _.findIndex(arrange, function(s){
				return s == current
			})
		}

		var balance = {

			request : function(clbk){


				self.sdk.users.requestFreeMoney(function(res, err){

					//console.log('res, err', res, err)

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";
				

					if(!res && !requested){

						if (err == 'captcha'){

							needcaptcha = true;

							if (current == 'money' || current == 'captcha'){
								actions.to('captcha')
							}

						}

						console.log('err', err)

						if (err == 'error' || err == 'iplimit'){

							gliperror = true

							if (current == 'money' || current == 'captcha'){
								actions.to('moneyfail')
							}

						}

						if(_.isEmpty(err)){
							actions.to('moneyfail')
						}

						if (clbk)
							clbk(false, 'err')
						
					}	
					
					else{

						self.app.settings.set(address, 'request', 'true')

						self.sdk.registrations.add(address, 3)

						//balance.follow()

						if (clbk)
							clbk(true)
					}
					
				}, getproxyoptions())	
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

			preloader : function(sh){
				if(sh){
					el.c.addClass('loading')
				}
				else{
					el.c.removeClass('loading')
				}
			},

			signin : function(clbk){
				self.user.signin(k.mnemonicKey, function(state){


					if (clbk)
						clbk()

				})		

			},

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

					if(typeof current == 'function') current = current()
				}
				else{

					var me = deep(app, 'platform.sdk.user.storage.me');

					if (me && me.relay){
						current = steps.captcha.id
					}
					else{
						current = steps.settings.id
					}

					
				}



				if(!current) return

				actions.makeStep(function(){

				})
			},

			makeStep : function(clbk){

				var step = steps[current];


				if (step){			

					actions.preloader(true)

					step.prev(function(){

						if(!el.c){

							return
						}

						

						el.c.attr('step', step.id)

						renders.panel(step, function(pel){
							renders.step(step, function(el){

								actions.preloader(false)

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

			testqrcodeandkey : function(hm, clbk){

				var keyPair =  self.app.user.keysFromMnemo(trim(hm))  

				var mk = keyPair.privateKey.toString('hex');

				var qrcode = renders.qrcode(el.c.find('.hiddenqrcode'), mk)

				var src = qrcode._oDrawing._oContext.canvas.toDataURL("image/jpeg");

				grayscaleImage(src, function(image){

					qrscanner.q.callback = function(data){

						if(data == 'error decoding QR Code'){

							if(clbk)
								clbk(false)
							
						}
						else
						{
							if(clbk)
								clbk(true)
							
						}
					}

					qrscanner.q.decode(image)
					
				})

			},

			generate : function(clbk){

				if(k.mnemonicKey){

					if (clbk)
						clbk()

				}
				else{
					var key = bitcoin.bip39.generateMnemonic();

					k.mnemonicKey = key;

					var keys = self.app.user.keysFromMnemo(k.mnemonicKey)

					k.mainAddress = app.platform.sdk.address.pnetsimple(keys.publicKey).address;

					k.mk = keys.privateKey.toString('hex');

					if (clbk)
						clbk()
				
				}
				
				
			},

			waitgeneration : function(clbk){				

				retry(function(){

					if(k.mnemonicKey || k.mk) return true;

				}, clbk, 40)

				
			}

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
			qrcode : function(el, m){

				var qrcode = new QRCode(el[0], {
					text: m,
					width: 256,
					height: 256
				});

				return qrcode

			},

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

			categories : function(el, clbk){

				var k =  self.app.localization.key;

				if(!self.sdk.categories.data.all[k]) k = 'en';

				var categories = self.sdk.categories.data.all[k].filter(function(k){
					return k.id !== 'c71'
				})

				categories = _.map(categories, function(k){
					var withIcon = categoryIcons.find(function(ki){
						return ki.id === k.id;
					})

					if (withIcon){
						k.icon = withIcon.icon;
					}

					return k;
				})

				var username = deep(app, 'platform.sdk.user.storage.me.name');

				self.shell({

					name :  'categories',
					el :   el,
					data : {
						categories: categories,
						username : username
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

			

			settings : function(_el, clbk){


				self.nav.api.load({

					open : true,
					id : 'test',
					el : _el,

					essenseData : {
						wizard : true,
						panel : el.panel,
						prepresave : function(){

						},
						presave : function(clbk){

								actions.waitgeneration(function(){


									self.app.user.isState(function(state){
	
										self.sdk.registrations.add(k.mainAddress, 1)
	
	
										if(!state){
	
											actions.signin(function(){
												if(clbk) clbk()
											})	
	
										}
										else{
											self.sdk.registrations.add(k.mainAddress, 1)
	
											if(clbk) clbk()
										}
									})
									
								})
								
							


						},

						relay : function(){
							return k.mainAddress
						},

						success : function(userInfo){

							k.info = userInfo

							self.sdk.registrations.add(k.mainAddress, 2)

							state.save()

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

			el.c.find('.gotohasaccount').on('click', function(){

				if (essenseData.close) essenseData.close()

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})
			})

		}

		var make = function(){
			self.app.user.isState(function(state){

				if(!state){
					setTimeout(function(){
						actions.generate(function(){
						})
					}, 1000)	
					

				}
				else{

					k = {};

					k.mainAddress = self.app.user.address.value
					k.mk = self.app.user.private.value.toString('hex');


					console.log(k.mainAddress)
				}

				actions.next();
			})
			

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				if (p.state && !self.user.validateVay()){
					
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})

					return
				}

				needcaptcha = false;
				gliperror = false;

				k = {}

				essenseData = deep(p, 'settings.essenseData') || {}

				current = null;

				var data = {
					steps : steps,
					inauth : deep(p, 'settings.essenseData.inauth') || false
				};

				regproxy = self.app.api.get.byid('pocketnet.app:8899:8099')

				/*if (localStorage['regproxy']){
					regproxy = self.app.api.get.byid(localStorage['regproxy'])
				}*/

				self.app.api.get.proxywithwallet().then(r => {

					if(r && !regproxy) regproxy = r

					if (regproxy){
						localStorage['regproxy'] = regproxy.id
					}

					console.log('regproxy', regproxy)

					clbk(data);
				})

			},

			destroy : function(){
				window.removeEventListener('resize', events.width)

				delete self.app.platform.sdk.node.transactions.clbks.moneyfail
				delete self.app.errors.clbks.registration
				delete self.app.platform.sdk.node.transactions.clbks.filluser

				if (ext) 
					ext.destroy()

				ext = null

				needcaptcha = false;
				gliperror = false;

				k = {}

				if(el.c) el.c.empty()

				el = {};

				essenseData = {}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.panel = el.c.find('.panelWrapper')

				initialParameters = p;

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null;

				initEvents();

				make()

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
	module.exports = registration;
}
else{

	app.modules.registration = {};
	app.modules.registration.module = registration;

}