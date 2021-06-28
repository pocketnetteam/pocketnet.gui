var filluserfast = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, k = {}, needcaptcha = false, gliperror = false, essenseData, initialParameters, ext = null;

		
		var current = null;

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
				nextindex : 'welcome',

				prev : function(clbk){

					var address = self.sdk.address.pnet().address;

					var requested = self.app.settings.get(address, 'request') || "";


					console.log("requested")

					if (requested){
						actions.next()

						return
					}


					balance.check(function(result){

						console.log('result', result)

						if (result){
							actions.next()
						}
						else
						{
							self.sdk.captcha.get(function(captcha, error){

								console.log("errorerrorerror", error)


								if (error){

									actions.to('network')

									return
								}

								
								if (captcha.done){

									balance.request(function(r){

										if(r){
											actions.next()
										}

									})

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
									

									balance.request(function(r){

										if(r){
											actions.next()
										}

									})
								}
						
							}, true)

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

					var clbk = function(){
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


						if(isMobile()){
							self.app.platform.ui.showmykey()
						}
						else{
							self.app.platform.ui.showmykeyfast()
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

			network : {

				id : 'network',

				prev : function(clbk){

					clbk()
				},

				render : 'network',

				after : function(el){


					self.app.errors.clbks.filluserfast = function(){

						if(app.errors.state.proxy || app.errors.state.proxymain)  return

						if (current == 'network' && !self.app.platform.loadingWithErrors){
							actions.to('captcha')
						}

						delete self.app.errors.clbks.filluserfast
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

					actions.testqrcodeandkey(key, function(result){

						if(!result){
							actions.generate()
						}
						else
						{

							k.mnemonicKey = key;

							var keys = self.app.user.keysFromMnemo(k.mnemonicKey)

							k.mainAddress = app.platform.sdk.address.pnetsimple(keys.publicKey).address;

							k.mk = keys.privateKey.toString('hex');


							if (clbk)
								clbk()
						}
					})
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
					turi : 'filluser',
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
					turi : 'filluser',
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
					turi : 'filluser',
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
					turi : 'filluser',
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
					turi : 'filluser',
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
					turi : 'filluser',
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


							console.log('actions.next()', userInfo)

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

				clbk(data);

			},

			destroy : function(){
				window.removeEventListener('resize', events.width)

				delete self.app.platform.sdk.node.transactions.clbks.moneyfail
				delete self.app.errors.clbks.filluserfast
				delete self.app.platform.sdk.node.transactions.clbks.filluser

				if(ext) ext.destroy()

				ext = null

				needcaptcha = false;
				gliperror = false;

				k = {}

				el = {};
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
	module.exports = filluserfast;
}
else{

	app.modules.filluserfast = {};
	app.modules.filluserfast.module = filluserfast;

}