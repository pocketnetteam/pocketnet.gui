var authorization = (function(){

	var self = new nModule();

	var essenses = {};

	//var essense = null;

	var Essense = function(p){

		var primary = deep(p, 'history');

		var id = 'secondary';
		var ext = null;

		if (primary) id = 'primary';
		if (p.inWnd) id = 'window';

		//////////////////////////////

		var el = {},
			essenseData = {},
			initialParameters;

		//var codeReader = new ZXing.BrowserQRCodeReader();

		var stayH = function(){

			localStorage['stay'] = '0';
			localStorage['mnemonic'] || '';

			self.app.user.stay = 0;

		}



		var stay = new Parameter({

			type : "BOOLEAN",
			name : "stay",
			id : 'stay',
			name : self.app.localization.e('e13027'),

			_onChange : function(v){

				if(v){

					/*dialog({
						html : self.app.localization.e('staysafe'),

						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),

						fail : function(){
							stay.value = 0
							stay.el.removeAttr('checked')

							stayH();
						},

						class : 'yesnodialog'
					})*/

				}
				else
				{
					stayH()
				}
			}
		})

		var validation = function(m){
			return bitcoin.bip39.validateMnemonic(m)
		};

		var events = {


		
			login : function(){

				
				var p = {};

				var mnemonicKey = trim(el.login.val());

				localStorage['stay'] = boolToNumber(stay.value).toString()

				self.user.stay = stay.value

				globalpreloader(true)

				self.user.signin(mnemonicKey, function(state){

					globalpreloader(false)
				
					if(!state){

						sitemessage(self.app.localization.e('e13028'))

						

						return;
					}
				
					self.app.platform.sdk.registrations.remove()

					var _p = {};

					_p.href = essenseData.successHref;

					if(!_p.href && primary)

						_p.href = function(){

							if(self.app.user.validate()){
								
								if (app.curation()){
									return 'index';
								}

								return self.app.platform.sdk.registrations.redirect || undefined
							
							}
							else
							{

								if (self.app.errors.connection()){
									return 'userpage?id=test'
								}

								else{
									return 'registration'
								}
								
							}

						}

						_p.nav = essenseData.nav || {};		


						if(typeof _p.nav.reload == 'undefined')
							_p.nav.reload = false

						_p.clbk = function(){
							topPreloader(100);

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							

							if (essenseData.signInClbk)
								essenseData.signInClbk();
						}


					if(deep(essenseData, 'successHref') == '_this'){

						self.app.reloadModules(function(){

							if(self.app.user.validate()){
								var close = deep(initialParameters, 'container.close')

								if (close)
									close();

								if (essenseData.signInClbk)
									essenseData.signInClbk();
							}
							else
							{
								self.nav.api.loadSameThis('filluser', p)
							}

							
						});

					}
					else
					{
						setTimeout(function(){
							self.app.reload(_p);
						}, 30)
						
					}

					

				})
				

			},

		}

		var initEvents = function(p){
			
			//el.enter.on('click', events.login);
			
			el.hiddenform.on('submit', function(event) {

				console.log("SUBMIT")

				event.preventDefault();
				event.stopPropagation();
				events.login()

				return false
			})

	        el.toRegistration.on('click', function(){
	        	self.nav.api.loadSameThis('registration', p)
			})
			
			el.c.find('.showformh').on('click', function(){
				el.c.toggleClass('signinshow')
			})

	        initUpload({
				el : el.c.find('.uploadFile'),
	
				ext : ['txt', 'png', 'jpeg', 'jpg'],

				notexif : true,

				dropZone : el.c,

				action : function(file, clbk){

			
					if(file.ext == 'png' || file.ext == 'jpeg' || file.ext == 'jpg'){
						

						grayscaleImage(file.base64, function(image){
							qrscanner.q.debug = true

							qrscanner.q.callback = function(data){

								console.log('data', data)

								if(data == 'error decoding QR Code'){
									sitemessage(self.app.localization.e('filedamaged'))
								}
								else
								{
									el.login.val(trim(data))

									el.hiddenform.submit()
								}
							}

							qrscanner.q.decode(image)
						})

						
					
						
					}
					else
					{
						var b = file.base64.split(",")[1]

						var data = b64_to_utf8(b)

						var ds = data.split("/")


						if (ds[1]) {


							el.login.val(trim(ds[1]))

							events.login();
							
						}
						else
						{
							sitemessage(self.app.localization.e('filedamaged'))
						}
					}

					
					
				}
			})

			var v = function(){
				if(!$(this).val()){
					el.c.find('.uploadFile').removeClass('hidden');
					el.c.find('.showPassword').addClass('hidden');
				}
				else{
					el.c.find('.uploadFile').addClass('hidden');
					el.c.find('.showPassword').removeClass('hidden');
				}
			}

			el.login.on('keyup', v);
			el.login.on('change', v);

		    el.login.on('blur', function(e) {
				const focusOnShowPassword = $(e.relatedTarget).is('.showPassword');
				const val = el.login.val();

				if (focusOnShowPassword) {
					/**
					 * If new focus target is ShowPassword button,
					 * returning focus to the input, so user can
					 * proceed typing.
					 */
					el.login.focus();

					return;
				}

				if (val.length) {
					return;
				}

			
			});

			el.c.find('.showPassword').on('click', (e) => {
				const btnIcon = $(e.currentTarget).find('.icon i');
				const passwordVal = el.login.val();

				if (btnIcon.is('.fa-eye')) {
					btnIcon.removeClass('fa-eye');
					btnIcon.addClass('fa-eye-slash');

					el.login.attr('type', 'text');
				} else {
					btnIcon.addClass('fa-eye');
					btnIcon.removeClass('fa-eye-slash');

					el.login.attr('type', 'password');
				}

				/**
				 * When input type is changed, the caret will be
				 * automatically moved to the start. This
				 * code returns to the end of input.
				 *
				 * Type change is async action, so giving 10ms
				 * to the DOM to get done the change.
				 */
				setTimeout(() => {
					el.login[0].setSelectionRange(passwordVal.length, passwordVal.length);
				}, 10);
			});
		}

		var renders = {
			fastfill : function(){
				self.nav.api.load({

					open : true,
					id : 'registration',
					el : el.c.find('.filluserform'),

					essenseData : {
						inauth : true,
						successHref : essenseData.successHref,

						welcomepart : function(){
							el.c.addClass('welcomepnet')
						},

						signInClbk : function(){

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							essenseData.signInClbk()

						},

						close : function(){
							self.closeContainer()
						}
					},
					
					clbk : function(e, p){
						ext = p
					}

				})
			}
		}

		var make = function(){
			var p = parameters();

			ParametersLive([stay], el.c)

			if (p.restore){
				events.forgotPassword();
			}

			if(essenseData.fast){
				renders.fastfill()
			}
		}

		return {

			primary : primary,

			id : id,

			getdata : function(clbk, p){

				if(p.state && primary)
				{

					self.nav.api.load({
						open : true,
						href : 'index',
						history : true,
						replaceState : true
					})
					
				}
				else
				{

					stay.value = numberToBool(self.app.user.stay)

					var mnemonic = localStorage['mnemonic'] || '';

					/*if(!stay.value) */mnemonic = ''

					var data = {
						stay : stay,
						mnemonic : mnemonic,
						fast : deep(p, 'settings.essenseData.fast') || false
					};
					
					clbk(data);
					
				}

			},

			destroy : function(){

				if(el.c) el.c.empty()

				el = {};

				if (ext) {
					ext.destroy(); 
					ext = null;
				}
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id)

				el.login = el.c.find(".loginValue");
				el.pwd = el.c.find(".pwdValue");
				el.enter = el.c.find('.enter');
				el.toRegistration = el.c.find('.toRegistration');
				el.forgotPassword = el.c.find('.forgotPassword');

				el.hiddenform = el.c.find('#loginform')

				essenseData = p.essenseData || {};
				initialParameters = p;

				initEvents(p);

				make();
		
				p.clbk(null, p);

			},

			tooltip : {
				options : {
					position : 'left',
					functionPosition: function(instance, helper, position){
				        position.coord.top = 10;
				        position.coord.left += 10;

				        return position;
				    }
				},
				event : 'mouseenter'
				
			},

			wnd : {
				class : 'withoutButtons authwindow normalizedmobile maxheight'
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
	module.exports = authorization;
}
else{

	app.modules.authorization = {};
	app.modules.authorization.module = authorization;

}