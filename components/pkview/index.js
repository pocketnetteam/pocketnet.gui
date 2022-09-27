var pkview = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, current = {}, ed = {}

		var checkedMnemonic = []
		var base64
		var mnemonicCheckPart
		var mnemonicCheckPartLength = 3

		var actions = {
			saveqr : function(clbk){

				var name = 'pkey_'+self.app.platform.currentTime()

				if (window.cordova){


					var image = b64toBlob(base64.split(',')[1], 'image/png');	


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

					var hiddenform = p.el.find('#loginform')

						hiddenform.on('submit', function(event) {
			
							event.preventDefault();
							event.stopPropagation();
			
							return false
						})	


					if(ed.showsavelabel) setTimeout(function(){

						hiddenform.find('.loginValue').val(current.mnemonicKey)

						p.el.find('.enter').click();
						
					}, 30) 

					p.el.find('.copy').on('click', function(){
						copyText(p.el.find('.hiddenMnemonicKey'))

						sitemessage(self.app.localization.e('successfullycopied'))
					})

					p.el.find('.save').on('click', function(){
						el.c.find(".qrCode")
						.html(`<canvas id="canvas"></canvas><div class="approveMnemonicButtons"><button class="button ghost backButton"><span>${self.app.localization.e('back')}</span></button><button class="button orange qrSubmitButton">${self.app.localization.e('download')}</button></div>`)
						QRCode.toCanvas(document.getElementById('canvas'), current.mnemonicKey, { width: 256 }, function (error) {
							if (error) console.error(error)
						  })
						QRCode.toDataURL(current.mnemonicKey, { errorCorrectionLevel: 'H' }, function (err, url) {
							base64 = url
						  })
						back()
						downLoadQr()
						el.c.find(".stepContent").css({"display": "none"})
						el.c.find('.dontshowagain').css({"display": "none"})
						el.c.find(".qrCode").css({"display": "flex"})
					}) 

					

					if (clbk)
						clbk(p);
				})
			},

			dontshowagain : function(){
				if (el && el.c)
					el.c.find('.dontshowagain').addClass('active')
			}
		}

		shuffleArray = function (array) {
			let arrayCopy = [...array]
			let currentIndex = array.length,  randomIndex;
			while (currentIndex != 0) {
			  randomIndex = Math.floor(Math.random() * currentIndex);
			  currentIndex--;
			  
			  [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
				arrayCopy[randomIndex], arrayCopy[currentIndex]];
			}
			if(array.join(' ') === arrayCopy.join(' ')){
				return shuffleArray(array)
			}else{
				return arrayCopy;
			}
		  
			
		  }

		back = function(){
			el.c.find(".backButton").on('click', function(e){
				checkedMnemonic = []
				el.c.find(".stepContent").css({"display": "block"})
				el.c.find('.dontshowagain').css({"display": "block"})
				el.c.find(".approveMnemonic").html('')
				el.c.find(".qrCode").html('')
			})
		}
		renderShuffledMnemonic = function(){
			el.c.find(".approveMnemonic")
			.html(`<span class="approveMnemonicNote">${self.app.localization.e('mnemonicnote')}</span><div class="randomWordsWrapper"></div><div class="shuffledMnemonicWrapper"></div><div class="approveMnemonicButtons"><button class="button ghost backButton"><span>${self.app.localization.e('back')}</span></button></div>`)
			mnemonicCheckPart = current.mnemonicContent.slice(0, mnemonicCheckPartLength)
			var shuffledMnemonic = shuffleArray(current.mnemonicContent)
			var container = el.c.find(".shuffledMnemonicWrapper")
			for(var i = 0; i < shuffledMnemonic.length; i++) {
				$(`<div class="shuffledMnemonicItem">${shuffledMnemonic[i]}</div>`).appendTo(container);
			}
		}

		removeFromSelected = function(){
			el.c.find(".randomWordsWrapper > .shuffledMnemonicItem").on('click', function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
				var value = $(this).text()
				checkedMnemonic = checkedMnemonic.filter(
					(el) => value !== el,
				  );
				  var shuffledMnemonicItem = el.c.find(".shuffledMnemonicWrapper > .shuffledMnemonicItem").filter(function() {
					return $(this).text() === value;
				})
				shuffledMnemonicItem.removeClass('hide')
				$(this).remove()
			})
		}

		mnemonicItemClickHandler = function(){
			el.c.find(".shuffledMnemonicItem").on('click', function(){
				var container = el.c.find(".randomWordsWrapper")
				if(checkedMnemonic.length < mnemonicCheckPartLength){
					checkedMnemonic.push($(this).text())
					$(`<div class="shuffledMnemonicItem">${$(this).text()}</div>`).appendTo(container)
					$(this).addClass('hide')
					if(checkedMnemonic.length === mnemonicCheckPartLength){
						if(checkedMnemonic.join(' ') === mnemonicCheckPart.join(' ')){
							self.closeContainer()
							 self.app.platform.sdk.registrations.donotshowprivate()
						}else{
							sitemessage(self.app.localization.e('mnemonicerror'))
						}
					}
				}
				removeFromSelected()
			})
		}

		downLoadQr = function(){
			el.c.find(".qrSubmitButton").on('click', function(){
				actions.saveqr(function(){
						successCheck()
					})
			})
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
				if(current.mnemonicContent.length === 12){
					el.c.find(".stepContent").css({"display": "none"})
					el.c.find(".approveMnemonic").css({"display": "flex"})
					renderShuffledMnemonic()
					back()
					mnemonicItemClickHandler()
					$(this).css({"display": "none"})
				}else{
					self.closeContainer()
					self.app.platform.sdk.registrations.donotshowprivate()
				}

				

				

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

						if(!bitcoin.bip39.validateMnemonickWithLangDetection(m)){

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

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