var filluser = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ext, essenseData, initialParameters;

		var scrollel = null;

		var networkInterval = null;

		var steps = {

			email : {

				id : 'email',

				prev : function(clbk){

					if(localStorage['uei']){
						actions.next()
					}	
					else
					{

						clbk()
						
						self.sdk.users.requestFreeMoney(function(res, err){})
					}
					
					
				},

				ret : false,

				render : 'email',

				

				after : function(el, pel, time){

					var save = function(email, clbk){

						topPreloader(20)
						

						var _p = {
							Email : email
						}

						_p.Action || (_p.Action = 'ADDTOMAILLIST');
						_p.TemplateID = '1005'

						$.ajax({
							type: 'POST',
							url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
							data: _p,
							dataType: 'json',
							success : function(){

								topPreloader(100)

								if (clbk)
									clbk();

							}
						});
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

							addEmail.html("Add email and continue")
						}
						else
						{
							addEmail.addClass('disabled')
							skip.removeClass('hidden')

							addEmail.html("Add email")
						}
					})

					addEmail.on('click', function(){

						var email = input.val()

						if(validate(email)){

							actions.next()
							localStorage['uei'] = email;

							save(email, function(){
								
							})

						}
					})

					skip.on('click', function(){
						actions.next()
					})
					
				}


			},
			money : {

				id : 'money',

				prev : function(clbk){

					self.app.platform.sdk.ustate.me(function(mestate){
						if(!mestate){
							actions.to(4)
						}
						else
						{
							self.sdk.users.requestFreeMoney(function(res, err){		


								var fmclbk = function(){
									self.app.platform.sdk.node.transactions.clbks.filluser = function(){

										self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

											if (amount > 0 && current == 1){

												actions.next()

											}
										})
										
									}

									clbk()
								}						
						
								if(!res){

									if(err && (err == 'network' || err == 'unspents') ){
										actions.to(4)

										return
									}
									else
									{
										self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

											if (amount > 0){
												actions.next()

												return
											}
											else
											{
												fmclbk()
											}

										})

										return
									}
								}

								fmclbk()
								
							

							})
						}
					})

					
				},

				ret : false,

				render : 'money',

				after : function(el, pel, time){

					console.log("AFTER")


					actions.timer(el.find('.time'), time || 59, function(){


						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){							

							if(current == 1 || current == 5){

								if(amount > 1){
									actions.to(2)
								}
								else
								{

									el.find('.subcaption').html(self.app.localization.e('wesentmoneydelay'))
									steps.money.after(el, pel, 30)

								}

								
							}

						}, true)

						
					})
				}


			},

			settings : {
				id : 'settings',

				prev : function(clbk){
					self.app.platform.sdk.ustate.me(function(mestate){
						if(!mestate){
							actions.to(4)
						}
						else
						{
							clbk()
						}
					})					
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
								href : 'index',
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

					if (networkInterval)
						clearInterval(networkInterval)

					var networkInterval = setInterval(function(){


						self.app.platform.sdk.ustate.me(function(mestate){

							if(mestate){

								clearInterval(networkInterval)
								actions.to(1)
							}

						})

					}, 5000)
				}


			},
		}

		steps.moneym = {
			id : 'moneym',
			prev : function(clbk){

				self.app.platform.sdk.node.transactions.clbks.filluserm = function(){

					self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

						if (amount > 0 && current == 5){

							actions.to(2)

						}
					})
					
				}

				clbk()
			},
			ret : steps.money.ret,
			render : 'moneym',
			after : steps.money.after
		}

		var current = -1;

		var arrange = ['email', 'money', 'settings', 'welcome', 'network', 'moneym']

		var actions = {
			to : function(step, clbk){
				current = step;
				actions.makeStep(clbk)
			},
			next : function(clbk){
				current++;

				actions.makeStep(clbk)
			},

			makeStep : function(clbk){

				var step = steps[arrange[current]];

				if (step){			

					step.prev(function(){

						if(!el.c){
							return
						}

						el.c.attr('step', step.id)

						renders.panel(step, function(pel){
							renders.step(step, function(el){

								_scrollTo(el, scrollel)

								pel.find('.elpanel').addClass('active')
							
								step.after(el, pel)

							})

						})

					})

				}

					
			},
			timer : function(el, time, clbk){

				var progress = new CircularProgress({
					radius: 120,
					strokeStyle: '#ff1975',
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
	
			}
		}

		var events = {
			width : function(){

				if(current < 0) return

				var activestep = steps[arrange[current]]

				var _el = el.c.find('.step[step="'+activestep.id+'"] .stepBody');
				var s = _el.closest('.step');
				var line = el.c.find('.stepsWrapperLine');

				var w = s.closest('.stepsWrapper').width()

				el.c.find('.step').width(w)

				line.css('margin-left', '-' + ((current) * w) + 'px')

				line.width(w * arrange.length)
			
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

					line.css('margin-left', '-' + ((current) * w) + 'px')

					line.width(w * arrange.length)

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
			moneym : function(el, clbk){
				self.shell({

					name :  'moneym',
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

				essenseData = p.settings.essenseData || {}

				current = -1;

				var data = {
					steps : steps
				};

				//if(!self.app.user.validate()){

					self.fastTemplate('panel', function(rendered){
						
						clbk(data);

					})
				/*}
				else
				{
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})
				}*/

				

			},

			destroy : function(){

				if(networkInterval)
					clearInterval(networkInterval)

				window.removeEventListener('resize', events.width)

				if (ext)
					ext.destroy()

				ext = null

				el = {};
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