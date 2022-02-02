var addaccount = (function(){

	var self = new nModule();

	var essenses = {};

	//var essense = null;

	var Essense = function(p){

		var primary = deep(p, 'history');

		var id = 'secondary';

		if (primary) id = 'primary';
		if (p.inWnd) id = 'window';

		//////////////////////////////

		var el,
			essenseData,
			initialParameters;
		var validation = function(m){
			return bitcoin.bip39.validateMnemonic(m)
		};

		var events = {

		
			add : function(){
				var p = {};

				var mnemonicKey = trim(el.login.val());

				if (essenseData.success)
					essenseData.success(mnemonicKey);

				self.closeContainer()
				

			},

		}

		var initEvents = function(p){
			
			el.enter.on('click', events.add);

			el.login.on('focus', function() {
				el.c.find('.uploadFile').addClass('hidden');
				el.c.find('.showPassword').removeClass('hidden');
			});

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

				el.c.find('.uploadFile').removeClass('hidden');
				el.c.find('.showPassword').addClass('hidden');
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

	        initUpload({
				el : el.c.find('.uploadFile'),

				notexif : true,
	
				ext : ['txt', 'png', 'jpeg', 'jpg'],

				dropZone : el.c,

				action : function(file, clbk){

					if(file.ext == 'png' || file.ext == 'jpeg' || file.ext == 'jpg'){
						

						grayscaleImage(file.base64, function(image){

							qrscanner.q.callback = function(data){

								if(data == 'error decoding QR Code'){
									sitemessage(self.app.localization.e('filedamaged'))
								}
								else
								{
									el.login.val(trim(data))

									events.add();
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

							events.add();
							
						}
						else
						{
							sitemessage(self.app.localization.e('filedamaged'))
						}
					}
					
				}
			})
	       
		}

		var make = function(){
		}

		return {

			primary : primary,

			id : id,

			getdata : function(clbk, p){

				var data = {
				};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id)

				el.login = el.c.find(".loginValue");
				el.enter = el.c.find('.enter');

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
				class : 'addaccountwnd normalizedmobile'
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
	module.exports = addaccount;
}
else{

	app.modules.addaccount = {};
	app.modules.addaccount.module = addaccount;

}