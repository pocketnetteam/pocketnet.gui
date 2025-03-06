var captcha = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {	
			initHex : function(el, captcha){
				return new HexCaptcha({
					/*styleSheet: [
						'js/vendor/hex-captcha/css/captcha.css'
					],*/
					holder: el,
					data: {
						frames: captcha.frames,
						overlay: captcha.overlay,
						duration: 250
					}
				})
			},

			redo : function(){

				el.c.removeClass('cashowed')

				ed.getcapcha().then(({captcha, proxyOptions}) => {


					make(captcha, proxyOptions)

				}).catch(e => {
					console.error(e)
					sitemessage(self.app.localization.e('e13118'))
				})
			}
		}	

		var events = {
			
		}

		var renders = {
			captcha : function(captcha, proxyOptions){
				self.shell({

					name :  'captcha',
					el :   el.c.find('.captchaWrapper'),
					data : {
						captcha,
						reason : ed.reason
					},

				}, function(_p){

					var hc = null

					if (captcha.hex){
						setTimeout(() => {
							hc = actions.initHex(_p.el.find('.captchaImage')[0], captcha)

							el.c.addClass('cashowed')
						}, 300)
						
					}
					else{
						el.c.addClass('cashowed')
					}

					var input = _p.el.find('.ucaptchainput');
					var redo = _p.el.find('.redo')
					var save = _p.el.find('.addCaptcha')

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

						if (self.app.mobileview) setTimeout(function(){
							
							if(el.c)
								_scrollTo(input, el.c.closest('.customscroll')
							
						), 200})

					})

					redo.one('click', function(){
						actions.redo()
					})

					save.on('click', function(){

						var text = input.val()

						if (validate(text)){

							globalpreloader(true)

							self.sdk.captcha.make(text, hc ? hc.angles : null, function(error, captcha){

								globalpreloader(false)

								if (error == 'captchashots'){

									sitemessage(self.app.localization.e('e13118'))

									actions.redo()

									return
								}

								if (error == 'captchanotequal_angles'){

									sitemessage(self.app.localization.e('captchanotequal_angles'))

									return
								}

								if (error){
									sitemessage(self.app.localization.e('e13118'))

									return
								}
							
								if (captcha.done){

									if (ed.success){
										ed.success(captcha)
									}

									self.closeContainer()

									setTimeout(() => {
										successCheck()
									}, 200)
									
								}
						
							}, proxyOptions)

						}

					})
							
				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var make = function(captcha, proxyOptions){
			renders.captcha(captcha, proxyOptions)
		}

		var initEvents = function(){
			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();
				make(ed.captcha, ed.proxyOptions)

				p.clbk(null, p);
			},

			wnd : {
				class : 'captchaWindow normalizedmobile maxheight withoutButtons captchawindow',

				closecross : function(){
					if(ed.fail) ed.fail()
				}
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = captcha;
}
else{

	app.modules.captcha = {};
	app.modules.captcha.module = captcha;

}