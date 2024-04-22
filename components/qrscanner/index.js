var qrscanner = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, html5QrcodeScanner = null;

		var config = {
			fps: 2,
			disableFlip  : true,
			formatsToSupport : [Html5QrcodeSupportedFormats.QR_CODE]
		}

		var actions = {

		}

		var events = {
			success : function(decodedText){

				try{
					if (ed.success){
						ed.success(decodedText)
					}
					else{
						
						var typeoflink = ''
	
						var url = new URL(decodedText)
	
						if (url.searchParams.get('ext')){
							typeoflink = 'pay'
						}

						if(!typeoflink){
							if(thislink(decodedText)){
								typeoflink = 'redirect'
							}
						}
	
						if (ed.typeoflink && ed.typeoflink != typeoflink){
							throw 'typeoflink'
						}

						if(typeoflink == 'pay'){
							var ext = url.searchParams.get('ext')

							self.app.nav.api.history.addRemoveParameters([], {
                                ext : ext
                            }, {
                                replaceState : true
                            })

                            self.app.platform.ui.externalFromCurrentUrl()
						}

						if(typeoflink == 'redirect'){
							self.nav.api.load({
								open : true,
								href : decodedText,
								history : true
							})
						}
					}
	
					self.closeContainer()
				}
				catch(e){
					renders.error()
				}


				

			}
		}

		var renders = {	
			error : function(){

			}
		}
		  
		  

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			window.BSTMedia.permissions({ audio: true, video : true }).then(() => {

				var mx = Math.min (0.85 * self.app.height, 600)

				var wh = { width: mx, height: mx }

				if(isMobile()){
					wh.width = self.app.width * 0.8
					wh.height = self.app.width * 0.8
				}

				console.log('wh', wh)

				html5QrcodeScanner = new Html5QrcodeScanner("reader", {
					...config,
					qrbox: wh
	
				}, false);
	
				html5QrcodeScanner.render(events.success);

				/*html5QrcodeScanner.qrCodeErrorCallback = function(t, er){
					console.log(t, er)
				}*/
				

				html5QrcodeScanner.applyVideoConstraints({
					ideal : true
				})

				el.c.find('#html5-qrcode-button-camera-permission').click()

				console.log('html5QrcodeScanner', html5QrcodeScanner)
	

			}).catch((e) => {
				console.error(e)
				renders.error()
			})
		
			
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

				if (html5QrcodeScanner){
					html5QrcodeScanner.clear();
					html5QrcodeScanner = null
				}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				class : 'withoutButtons  normalizedmobile maxheight qrscannerwindow',
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
	module.exports = qrscanner;
}
else{

	app.modules.qrscanner = {};
	app.modules.qrscanner.module = qrscanner;

}