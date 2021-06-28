var registration = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el,
			essenseData,
			initialParameters,
			validation;

		var current = {
			last : false,
			end : false
		}

		var scrollel = null

		var kup = {

			type : "STRING",
			name : "keyInput",
			id : 'keyInput',
			placeholder : self.app.localization.e('confirmkey'),

			autoSearch : function(v, p, clbk){

				if(current.mnemonicKey.indexOf(v) == 0){


					if(v[v.length - 1] != ' '){
						var vs = v.split(" ");

						var index = vs.length - 1

						var l = vs[index];

						var phrase = _.filter(current.mnemonicContent, function(w, i){

							if(i <= index){
								return true;

							}

						})

						clbk(phrase.join(" "))
					}
				}

				
			}
	
		}

		if(isMobile()) delete kup.autoSearch

		var keyInput = new Parameter(kup)

		var actions = {
			download : function(clbk){
				if (current.os){

					if(current.os.github){

						$.get(current.os.github.url, {}, function(d){

							var assets = deep(d, 'assets') || [];

							var l = _.find(assets, function(a){
								return a.name == current.os.github.name
							})

							if (l){


								var link = document.createElement('a');
							        link.setAttribute('href', l.browser_download_url);
							        link.setAttribute('download','download');
							        link.click();

							    if (clbk)
									clbk(l.browser_download_url)
							}

							

						})

					}

				}
			},
			validation : function(){

				var v  = trim(keyInput.value)

				if(v != current.mnemonicKey && v != current.mk){

					el.c.find('.note').html(self.app.localization.e('keysnotmatch'))
					el.c.addClass('error')

					return false
				}
				else
				{
					el.c.removeClass('error')

					el.c.find('.note').html('')

					return true
				}

			},

			registration : function(){
			
				if(actions.validation())
				{

					localStorage['stay'] = '1';
					self.app.user.stay = 1;

					self.user.signin(current.mnemonicKey, function(state){

						if(!state){

							el.c.find.note.html(self.app.localization.e('id98'))
							el.c.addClass('error')

							return;
						}

						current.end = true;

						renders.confirm(function(){

							renders.success(function(){

								setTimeout(function(){

									if(deep(essenseData, 'successHref') == '_this'){

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
										
									}
									else
									{

										console.log('essenseData.nav', essenseData.nav)

										essenseData.nav || (essenseData.nav = {})
										essenseData.nav.history = true
										essenseData.nav.reload = false

										self.app.reload({
											href : essenseData.successHref || 'filluser',
											nav : essenseData.nav
										});
									}

									

								}, 2000)

									

							})

							

						})

						

						

					})		

				}
			},

			generate : function(){
				el.c.removeClass('begin');

				var key = bitcoin.bip39.generateMnemonic();

				actions.testqrcodeandkey(key, function(result){


					if(!result){
						actions.generate()
					}
					else
					{

						current.mnemonicKey = key;

						current.mnemonicMask = _.shuffle(indexArray(current.mnemonicKey.length));

						current.mnemonicContent = current.mnemonicKey.split(' ')

						var keys = self.app.user.keysFromMnemo(current.mnemonicKey)

						current.mainAddress = app.platform.sdk.address.pnet(keys.publicKey).address;

						current.mk = keys.privateKey.toString('hex');


						renders.key()
					}
				})
				
			},

			repeat : function(){
				current.last = false;

				renders.confirm(function(){
					renders.tips(function(){

						setTimeout(function(){

							el.c.removeClass('last')

							setTimeout(function(){

								actions.generate()

							}, 300)
						}, 300)

					});
				});
			},

			continue : function(){
				var m = el.c.find('.mnemonicKey')


				var ks = el.c.find('.keyStep');

					ks.removeClass("showedPanel");

				renders.mnemonicEffect(m, true, function(){
					current.last = true;					
					
					renders.key(function(){
						setTimeout(function(){

							renders.tips()

							el.c.addClass('last')

							setTimeout(function(){
								renders.confirm();
							}, 300)

						}, 300)

					})
				});
			},

			removeDisabled : function(el){
				el.find('.continue').removeClass('disabled')

				el.find('.preloader').remove();

				el.find('.save').addClass('black')
				el.find('.copy').addClass('black')
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

			}
		}

		var events = {
			
			registration : function(){
				actions.registration();
			},

			generate : function(){
				actions.generate();
			},

			continue : function(){

				if($(this).hasClass('disabled')) return

				actions.continue();
			},

			repeat : function(){
				actions.repeat()
			},

			download : function(){
				actions.download(function(link){
					el.c.find('.osStep').addClass('rundownloading')
					el.c.find('.skipositem').html('<div class="downloadstart">'+self.app.localization.e('e13011')+'</div>'+
						'<div><a href="'+link+'"><b>'+self.app.localization.e('e13012')+'</b></a></div>')
				})
			}

			 
			
		}

		var state = {
			
		}

		var renders = {

			os : function(clbk){
				var _os = os();


				if (_os && self.app.platform.applications[_os] && typeof _Electron == 'undefined' && !window.cordova){

					current.os = self.app.platform.applications[_os]

					renders.step('os', function(p){
						p.el.find('.downloadOs').on('click', events.download)

						p.el.find('.skip').on('click', function(){
							if (clbk)
								clbk()
						})

						
					})

				}

				else
				{
					clbk();
				}
			},

			step : function(name, clbk){

				self.shell({
					name :  name,
					el : el.c.find("." + name + "Step"),
					data : current,
					animation : {
						id : 'slide'
					},

				}, function(p){

					if (clbk)
						clbk(p);
				})

			},

			success : function(clbk){

				renders.step('success', function(p){


					if (clbk)
						clbk()
				})

			},

			tips : function(clbk){


				renders.step('tips', function(p){
					p.el.find('.generate').on('click', events.generate)

					if (clbk)
						clbk()
				})

			},

			confirm : function(clbk){

				keyInput.value = ''
				current.keyInput = keyInput

				renders.step('confirm', function(p){

					
					

					p.el.find('.repeat').on('click', events.repeat)
					p.el.find('.registrationButton').on('click', events.registration)
					

					if (clbk)
						clbk()

					else
					{
						ParametersLive([keyInput], p.el)

						_scrollTo(p.el, scrollel)

						initUpload({
							el : p.el.find('.uploadFile'),
				
							ext : ['txt', 'png', 'jpeg', 'jpg'],

							notexif : true,

							dropZone : el.c.find('.confirm'),

							action : function(file, clbk){

								if(file.ext == 'png' || file.ext == 'jpeg' || file.ext == 'jpg'){


									grayscaleImage(file.base64, function(image){

										qrscanner.q.callback = function(data){


											if(data == 'error decoding QR Code'){


												el.c.find('.note').html(self.app.localization.e('filedamaged'))
											}
											else
											{


												keyInput.value = trim(data)

												keyInput.el.val(keyInput.value);

												actions.registration();
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

										keyInput.value = trim(ds[1]);

										keyInput.el.val(keyInput.value);

										actions.registration();
									}
									else
									{
										el.c.find('.note').html(self.app.localization.e('filedamaged'))
									}
								}
							}
						})

						/*plissing = self.app.platform.api.plissing({
							el : p.el.find('.elContent .label'),
							text : ""
						})*/

						setTimeout(function(){

							/*p.el.find('input').bind('paste', function (e) {

								p.el.find('.note').html(self.app.localization.e('removepaste'))

						       	e.preventDefault();
						    });*/

						    p.el.find('input[type="text"]').on('focus', function(){
						    	p.el.find('.inputTable').addClass('typeactive')
						    })

						    p.el.find('input[type="text"]').on('blur', function(){
						    	p.el.find('.inputTable').removeClass('typeactive')
						    })

						    if(!isMobile()){
						    	p.el.find('.autosearchInputCnt input').focus()
						    }


						}, 600)
						
					}
				})

			},

			qrcode : function(el, m){

				var qrcode = new QRCode(el[0], {
					text: m,
					width: 256,
					height: 256
				});

				return qrcode

			},

			key : function(clbk){

				renders.step('key', function(p){


					var m = p.el.find('.mnemonicKey')

					var ks = el.c.find('.keyStep');

						ks.removeClass("showedPanel")
						
					var hm = p.el.find('.hiddenMnemonicKey').html();

					if (hm){

						var keyPair =  self.app.user.keysFromMnemo(trim(hm))  

						var mk = keyPair.privateKey.toString('hex');

						var qr = renders.qrcode(p.el.find('.qrcode'), mk)

					}


					renders.mnemonicEffect(m, false, function(){
						ks.addClass("showedPanel")
					});

					p.el.find('.continue').on('click', events.continue)		

					setTimeout(function(){

						actions.removeDisabled(p.el)

					}, 2000)

					self.app.platform.clbks._focus.registration = function(){
						actions.removeDisabled(p.el)
					}

					p.el.find('.copy').on('click', function(){
						copyText(p.el.find('.hiddenMnemonicKey'))

						sitemessage(self.app.localization.e('successfullycopied'))

						actions.removeDisabled(p.el)
					})

					p.el.find('.save').on('click', function(){

						var text = p.el.find('.qrcode img').attr('src')

						saveAs({
							file : text,
							format : 'png',
							name : 'pocketnetkey'
						})

					})

					if(window.cordova){

						p.el.find('.qrcode').on('click', function(){

							menuDialog({
								items : [
	
									{
										text : "Save key on device",
										class : 'itemmain',
										action : function(clbk){


											var image = b64toBlob(qr._oDrawing._elImage.currentSrc.split(',')[1], 'image/png', 512);		
											

											saveAsWithCordova(image, 'pkey'+self.app.platform.currentTime()+'.png', function(){
												clbk()
											})

											
										}
									}
	
								]
							})
	
						})

					}

					

					if (clbk)
						clbk();	

					else 
						_scrollTo(p.el, scrollel)	

				})

			},

			mnemonicEffect : function(el, reverse, clbk){

				var a = indexArray(101);

				if(reverse) a.reverse()

				var h = el.height();
				el.css('min-height', h + 'px');
					
				lazyEach({
					array : a,
					sync : true, 
					action : function(p){
						var percent = p.item;

						el.html(renders.mnemonic(percent))

						h = el.height();
						el.css('min-height', h + 'px');
						setTimeout(p.success, rand(1, 5));
					},

					all : {
						success : function(){

							el.css('min-height', 0 + 'px');

							if (clbk)
								clbk()
						}
					}
				})
			},

			mnemonic : function(percent){

				var s = '';

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

				return s
			}
		}

		var initEvents = function(p){

	

			el.toAuthorization.on('click', function(){
				
				self.nav.api.loadSameThis('authorization', p)

			})
		}

		var make = function(){

			renders.os(function(){
				renders.tips()
			})

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				self.nav.api.load({
					open : true,
					href : 'filluserfast'
				})

				return

				if(p.state && primary)
				{

					self.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})
					
				}
				else
				{
					
					current = {
						last : false,
						end : false
					};

					var data = {
						
					};

					clbk(data);

					
				}

			},

			destroy : function(){
				delete self.app.platform.clbks._focus.registration;
				el = {};
			},
			
			init : function(p){	

				el = {};
				el.c = p.el.find('#' + self.map.id)

				el.registrationButton = el.c.find('.registrationButton');		
				el.toAuthorization = el.c.find('.toAuthorization');
				el.login = el.c.find('.loginValue');
				el.ler = el.c.find('.ler');
				el.key = el.c.find('.key')

				essenseData = p.essenseData || {};
				initialParameters = p;

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null

				make()

				initEvents(p)

					
				p.clbk(null, p);

				
			},
			wnd : {
				class : 'withoutButtons allscreen'
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