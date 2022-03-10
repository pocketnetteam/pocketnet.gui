var pkview = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, current = {}, ed = {}

		var actions = {
			saveqr : function(base64, clbk){

				var name = 'pkey_'+self.app.platform.currentTime()

				if (window.cordova){


					var image = b64toBlob(base64.split(',')[1], 'image/png');	

					console.log("image", image)

					p_saveAsWithCordova(image, name + '.png', function(){
						if (clbk)
							clbk()
					})

				}
				else{
					p_saveAs({
						file : base64,
						format : 'png',
						name : name
					})
				}
			}
		}

		var events = {
			
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

			mnemonic : function(percent){

				var s = '';

				if(current.mnemonicMask){
					var index = (current.mnemonicMask.length * percent / 100).toFixed(0)

					_.each(current.mnemonicKey, function(l, curlindex){

						var a = _.indexOf(current.mnemonicMask, curlindex);

						if(a < index || l == ' '){
							s = s + l;
						}

						else
						{
							s = s + self.app.platform.values.alph[rand(0, self.app.platform.values.alph.length - 1)]
						}

						
					})
				}

				else{
					s = current.mnemonicKey
				}

				return s
			},

			mnemonicEffect : function(el, reverse, clbk){

				var a = indexArray(101);

				if(reverse) a.reverse()

					
				lazyEach({
					array : a,
					sync : true, 
					action : function(p){
						var percent = p.item;

						el.html(renders.mnemonic(percent))

						h = el.height();
						setTimeout(p.success, rand(1, 5));
					},

					all : {
						success : function(){

							if (clbk)
								clbk()
						}
					}
				})
			},

			key : function(clbk){
				self.shell({
					name :  'key',
					el : el.c.find(".keywrapper"),
					data : current,
					animation : {
						id : 'slide'
					},

				}, function(p){

					var m = p.el.find('.mnemonicKey')
					var name = 'pkey_'+self.app.platform.currentTime()

					renders.mnemonicEffect(m, false, function(){
						hiddenform.find('button').click();
					});

					/*var container = p.el.find('.qrcode');
					var qr = renders.qrcode(container, current.mk)

					var base64 = qr._oDrawing._elCanvas.toDataURL("image/png")*/


					/*container.attr('save', name + '.png')
					container.attr('src', base64)

					self.app.mobile.saveImages.init(container)*/

					var hiddenform = p.el.find('#loginform')

						hiddenform.on('submit', function(event) {
							console.log("SUBMIT")
			
							event.preventDefault();
							event.stopPropagation();
			
							return false
						})	

						console.log("A", hiddenform)

					if(ed.showsavelabel) setTimeout(function(){

						hiddenform.find('.loginValue').val(current.mnemonicKey)

						p.el.find('.enter').click();
						
					}, 30) 

					p.el.find('.copy').on('click', function(){
						copyText(p.el.find('.hiddenMnemonicKey'))

						sitemessage(self.app.localization.e('successfullycopied'))
					})

					/*p.el.find('.save').on('click', function(){

						actions.saveqr(base64, function(){
							successCheck()
						})

					

					})*/ 

					

					if (clbk)
						clbk(p);
				})
			},

			dontshowagain : function(){
				if (el && el.c)
					el.c.find('.dontshowagain').addClass('active')
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.c.find('.nextaction').on('click', function(){
				self.closeContainer()

				if(isMobile() || window.cordova){
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true,
					})

				}
			})
			
			el.c.find('.dontshowagain').on('click', function(){

				self.closeContainer()

				self.app.platform.sdk.registrations.donotshowprivate()

				/**if(isMobile()){

					self.app.nav.api.load({
		
						open : true,
						href : 'index',
						history : true,
		
					})

				}*/

			})

		}

		var make = function(){

			current = {}

			var mnemonic = ed.mnemonic || localStorage['mnemonic'];

			if (mnemonic){

				self.app.platform.cryptography.api.aeswc.decryption(mnemonic, self.app.options.fingerPrint, {}, function(m){
				
					if(m){						

						if(!bitcoin.bip39.validateMnemonic(m)){

							current.mk = m;

						}
						else
						{
							var keyPair =  self.app.user.keysFromMnemo(trim(m))  

							current.mk = keyPair.privateKey.toString('hex');
						}	

						current.mnemonicKey = m;

						current.mnemonicMask = _.shuffle(indexArray(current.mnemonicKey.length));

						current.mnemonicContent = current.mnemonicKey.split(' ')

						renders.key()

						setTimeout(function(){

							if (ed.showsavelabel)
								renders.dontshowagain()

						}, 2000)
					}
					else
					{
					
					}

				})
	


			}
			else{

			}

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				ed = p.settings.essenseData || {}

				data.ed = ed

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				
				

				initEvents();

				make()

				p.clbk(null, p);
			},
			wnd : {			
				showbetter : true,
				//header : isMobile() ? 'privatekey' : '',
				class : 'withoutButtons pkviewwnd ',
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
	module.exports = pkview;
}
else{

	app.modules.pkview = {};
	app.modules.pkview.module = pkview;

}