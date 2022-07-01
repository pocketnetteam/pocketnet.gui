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
			return bitcoin.bip39.validateMnemonickWithLangDetection(m)
		};

		var activeMnemonicInput
		var autocompleteWord

		var events = {

		
			add : function(key){
				var mnemonicKeyArray = []
				var mnemonicInputs = el.c.find('.mnemonicItem')
				mnemonicInputs.each(function(index){
					if(mnemonicInputs[index].value.trim()){
						mnemonicKeyArray[index] = mnemonicInputs[index].value.trim()
					}else{
						mnemonicInputs[index].classList.add('errorClass')
					}
				})
				var p = {};
				var mnemonicKey = (typeof key !== 'object' && key?.trim()) || trim(el.login.val()) || mnemonicKeyArray.join(' ');
				if (essenseData.success)
					essenseData.success(mnemonicKey);

				self.closeContainer()
			},

			openQrScanner : function(){
				self.nav.api.load({
							open : true,
							href : 'scanorimportqr',
							inWnd : true,
							history : true,
							essenseData : {
								login: events.add
							}
						})
			},

			renderFileLoader : function(_el, closetooltip){
				initUpload({
					el : _el,
	
					notexif : true,
		
					ext : ['txt', 'png', 'jpeg', 'jpg'],
	
					dropZone : el.c,
	
					action : function(file, clbk){
	
						if(file.ext == 'png' || file.ext == 'jpeg' || file.ext == 'jpg'){
							
							const html5QrCode = new window.Html5Qrcode("fleReader")
								html5QrCode.scanFile(file.file, false)
								.then(decodedText => {
									el.login.val(trim(decodedText))
									events.add();
								})
								.catch(err => {
									self.app.Logger.error({
										err: err.text || 'scanQrFileError',
										code: 1001,
										payload: err,
									});
									self.closeContainer()
									sitemessage(self.app.localization.e('filedamaged'))
								});
							// grayscaleImage(file.base64, function(image){
	
							// 	qrscanner.q.callback = function(data){
	
							// 		if(data == 'error decoding QR Code'){
							// 			sitemessage(self.app.localization.e('filedamaged'))
							// 		}
							// 		else
							// 		{
							// 			el.login.val(trim(data))
	
							// 			events.add();
							// 		}
							// 	}
	
							// 	qrscanner.q.decode(image)
								
							// })
							
							
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
						closetooltip && closetooltip()
					}
				})},

			addMobileTooltip : function(_el){
				var d = {};
					self.fastTemplate('metmenu', function(rendered, template){
						self.app.platform.api.tooltip(_el, function(){
						
							return template(d);
	
						}, function(el, n, close){

							events.renderFileLoader(el.find('.loadqr'), close)
							el.find('.loadqr').on('click', function(){
								self.app.mobile.vibration.small()

								// close()
							})
	
							el.find('.scanqr').on('click', function(){
								self.app.mobile.vibration.small()
								events.openQrScanner()

								close()
	
							})
						})
	
					}, d)
			},

			addQrHandler : function(){
				el.c.find('.qrcode').on('click', function(){
					if (isMobile() || isTablet()){
						events.addMobileTooltip($(this))
					}
				})
			}
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
		}
		addInputControle = function(){
			el.c.find('.mnemonicItem').on('keyup',function (e) {
				var currentInputId = +activeMnemonicInput.attr("id").replace('mnemonicItem','')
				if (e.code === 'ArrowRight') { 
					var nextId = currentInputId + 1
					if(e.target.value && e.target.selectionStart !== e.target.value.length){
						return
					}
					if(autocompleteWord){
						activeMnemonicInput.val(autocompleteWord)
						el.autocomplete.css({'display': 'none'})
					}
					if(nextId <= 12 ){
						el.c.find(`#mnemonicItem${nextId}`).trigger( "focus" )
					}
				} else if (e.code === 'ArrowLeft') { 
					var nextId = currentInputId - 1
					if(e.target.value && e.target.selectionStart > 0){
						return
					}
					if(nextId > 0 ){
						el.c.find(`#mnemonicItem${nextId}`).trigger( "focus" )
					}
				}
			});	
	   	}

		backspaceEventHandler = function(){
			el.c.find('.mnemonicItem').on('keydown',function (e) {
				if (e.code === 'Backspace'){
					if(e.target.selectionStart < 1){
						var currentInputId = +activeMnemonicInput.attr("id").replace('mnemonicItem','')
						var nextId = currentInputId - 1
						if(nextId > 0 ){
							el.c.find(`#mnemonicItem${nextId}`).trigger( "focus" )
						}
					}
				}
			})
		}

		addAutocomlete = function(){
			el.c.find('.mnemonicItem').on('input paste focus',function (e) {
				$(this).removeClass('errorClass')
				autocompleteWord = ''
				activeMnemonicInput = $(this)
				const { top, left } = e.target.getBoundingClientRect();
				const foundWord = e.target.value.length > 1 ? 
				[
					...bitcoin.bip39.wordlists.english,
					...bitcoin.bip39.wordlists.russian,
					...bitcoin.bip39.wordlists.french,
					...bitcoin.bip39.wordlists.italian,
					...bitcoin.bip39.wordlists.spanish,
					...bitcoin.bip39.wordlists.korean,
					...bitcoin.bip39.wordlists.chinese_traditional
				].find((item) => item.includes(e.target.value) 
				&& !item.includes(e.target.value, e.target.value.length)
				&& item.slice(0, e.target.value.length) === e.target.value) 
				: '' 
				autocompleteWord = foundWord || ''
				if(autocompleteWord === e.target.value){
					el.autocomplete.css({'display': 'none'})
					return
				}
					var autocompleteWordStart = autocompleteWord && autocompleteWord.slice(autocompleteWord.indexOf(e.target.value),e.target.value.length)
					var autocompleteWordEnd = autocompleteWord && autocompleteWord.slice(autocompleteWordStart.length)
		
					el.autocomplete.css({
						'position': 'absolute',
						'top' : `${top + parseInt($(this).css("padding-top")) + 1.5}px`,
						'left' : `${left + parseInt($(this).css("padding-left"))}px`,
						'font-size': $(this).css("font-size"),
						'font-weight': $(this).css("font-weight"),
						'display': 'flex',
						"z-index": "99999"
					})
					el.autocompleteEnd.css({
						'color' : `#555770`,
						'opacity': '0.6'
					})
					el.autocompleteStart.css({
						'color' : `transparent`,
					})
					
					el.autocompleteStart.html(autocompleteWordStart)
					el.autocompleteEnd.html(autocompleteWordEnd)
					if(e.target.value.length > 2 && !autocompleteWord && $(this).attr("id") === 'mnemonicItem1'){
						el.c.find('.loginValue').val($(this).val())
						$(this).val('')
						el.c.find('#mnemonicInput').css({'display': 'none'})
						el.c.find('.qrcode').css({'display': 'none'})
						el.c.find('.actionButtonsWrapper').css({'display': 'table-cell'})
						el.c.find('.loginValue').css({'display': 'initial'})
						el.c.find('.loginValue').trigger( "focus" )
					}
			  });	
		}

		validateMnemonicInput = function(){
			el.c.find('.mnemonicItem').on('keypress paste', function(e){
				if(e.key === 'Enter' || e.key === ' '){
					autocompleteWord && activeMnemonicInput.val(autocompleteWord)
					el.autocomplete.css({'display': 'none'})
					var currentInputId = +activeMnemonicInput.attr("id").replace('mnemonicItem','')
					var nextId = currentInputId + 1
					if(nextId <= 12){
						el.c.find(`#mnemonicItem${nextId}`).trigger( "focus" )
						return false
					}else if(e.key === 'Enter'){
						return true
					} else if(e.key === ' '){
						return false
					} 
				} else{
					return /^\p{L}+$/u.test(e.key)
				}
			})
		}

		pasteMnemonicPhrase = function(){
			el.c.find('.mnemonicItem').on('paste', function(e){
				var mnemonicArray = e.originalEvent.clipboardData.getData('text/plain').split(' ')
				if(mnemonicArray.length > 1){
					var mnemonicInputs = el.c.find('.mnemonicItem')
					mnemonicArray.forEach((item, index)=>{
						if(item){
							mnemonicInputs[index].classList.remove('errorClass')
							mnemonicInputs[index].value = item
							mnemonicInputs[index].focus()
						}
					})
					return false
				}else{
					return true
				}	
			})
		}

		checkAutocompleteValue = function(){
			el.autocompleteEnd.on('click', function(e){
				e.stopPropagation();
				activeMnemonicInput.val(autocompleteWord);
				el.autocomplete.css({'display': 'none'})
				var currentInputId = +activeMnemonicInput.attr("id").replace('mnemonicItem','')
				var nextId = currentInputId + 1
				if(nextId < 12 ){
					el.c.find(`#mnemonicItem${nextId}`).trigger( "focus" )
				}
			})
		}

		mnemonicInputBlurHandler = function(){
			el.c.find('.mnemonicItem').on('blur', function(e){
				el.autocomplete.css({'display': 'none'})
			})
		}

		privateKeyInputHandler = function(){
			el.c.find('.loginValue').on('input', function(e){
				if(!e.target.value){
					el.c.find('.loginValue').css({'display': 'none'})
					el.c.find('.actionButtonsWrapper').css({'display': 'none'})
					el.c.find('#mnemonicInput').css({'display': 'flex'})
					el.c.find('.qrcode').css({'display': 'block'})
					el.c.find('.mnemonicItem')[0].focus()
				} 
			})
		}

		addMnemonicInputs = function(){
			var num = 12
			var container = el.c.find("#mnemonicInput")
			for(var i = 1; i <= num; i++) {
				$(`<input autocomplete="off" id="mnemonicItem${i}" class="mnemonicItem" type="text">`).appendTo(container);
			}
		}

		setFocus = function(){
			el.c.find('.mnemonicItem').on('click', function(e){
					if(!$(this).val().trim().length){
						let currentInputId = +$(this).attr("id").replace('mnemonicItem','') 
						while(currentInputId >= 1 && !el.c.find(`#mnemonicItem${currentInputId}`).val().trim().length){
							currentInputId--  
							el.c.find(`#mnemonicItem${currentInputId}`).trigger( "focus" )
						}
					}
			})
		}

		hideAotocomplete = function(){
			$(".wndcontent").on('scroll',function(){
				el.autocomplete.css({'display': 'none'})
			})
		}

		var renders = {
			addFileLoader : function(){
				if (!(isMobile() || isTablet())){
					events.renderFileLoader(el.c.find('.qrcode'))
				}
			}
		}

		var make = function(){
			renders.addFileLoader()
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
				$("#autocomplete").remove()
				el = {};
			},
			
			init : function(p){
				$("body").prepend( "<span id='autocomplete'><span id='autocompleteStart'></span><span id='autocompleteEnd'></span></span>" );
				el = {};
				el.c = p.el.find('#' + self.map.id)

				el.login = el.c.find(".loginValue");
				el.enter = el.c.find('.enter');
				el.autocompleteStart = $('#autocompleteStart')
				el.autocompleteEnd = $('#autocompleteEnd')
				el.autocomplete = $('#autocomplete')

				essenseData = p.essenseData || {};
				initialParameters = p;

				initEvents(p);

				make();
				addMnemonicInputs()
				addInputControle()
				backspaceEventHandler()
				addAutocomlete()
				validateMnemonicInput()
				checkAutocompleteValue()
				mnemonicInputBlurHandler()
				pasteMnemonicPhrase()
				privateKeyInputHandler()
				hideAotocomplete()
				setFocus()
				events.addQrHandler()

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
				class : 'addaccountwnd normalizedmobile maxheight'
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