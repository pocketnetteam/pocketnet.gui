var scanorimportqr = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
        var qrCodeScanner 
		var el,essenseData;

		var actions = {

		}

		var events = {
			
		}
        var initEvents = function(p){
	        initUpload({
				el : $('.uploadFile'),
	
				ext : ['txt', 'png', 'jpeg', 'jpg'],

				notexif : true,

				dropZone : el.c,

				action : function(file, clbk){

			
					if(file.ext == 'png' || file.ext == 'jpeg' || file.ext == 'jpg'){
						

						grayscaleImage(file.base64, function(image){
							qrscanner.q.debug = true

							qrscanner.q.callback = function(data){


								if(data == 'error decoding QR Code'){
									sitemessage(self.app.localization.e('filedamaged'))
								}
								else
								{
                                    essenseData.login(trim(data))
									// el.login.val(trim(data))

									// el.hiddenform.submit()
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

                            trim(trim(ds[1]))
							// el.login.val(trim(ds[1]))

							// events.login();
							
						}
						else
						{
							sitemessage(self.app.localization.e('filedamaged'))
						}
					}

					
					
				}
			})
		}

		var renders = {
            addScanner : function(){
                function onScanSuccess(decodedText, decodedResult) {
                    var isValidPrivateKey,isValidMnemonicPhrase
                    try{
                        bitcoin.ECPair.fromPrivateKey(Buffer.from(decodedText, 'hex'))
                        isValidPrivateKey = true
                    }catch(e){
                        isValidPrivateKey = false
                    }
                    isValidMnemonicPhrase = bitcoin.bip39.validateMnemonickWithLangDetection(decodedText.toLowerCase())
                    if(isValidPrivateKey || isValidMnemonicPhrase){
                        essenseData.login(decodedText)
						self.closeContainer()
                    }else{
                        sitemessage(self.app.localization.e('e13028'))
                    }
                }
                  
                function onScanFailure(error) {
                }
				var cameraId
				window.Html5Qrcode.getCameras().then(devices => {
					if (devices && devices.length) {
						console.log();
						cameraId = devices[0].id;
					    qrCodeScanner = new window.Html5Qrcode("reader")
						qrCodeScanner.start(
							cameraId, 
							{
								fps: 12,
								qrbox: {width: 250, height: 250},
								formatsToSupport: [window.Html5QrcodeSupportedFormats.QR_CODE ],
								supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
								rememberLastUsedCamera: true
							},
							onScanSuccess
						)	
					}
					el.c.find(".loader").fadeOut()
				  }).catch(err => {
					console.log('qaq',err);
					el.c.find(".loader").fadeOut()
					el.c.find(".error").fadeIn()
					
				  });               
            }

		}
        var make = function(){
            renders.addScanner()
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				var data = {};

				clbk(data);

			},

			destroy : function(){
				if(qrCodeScanner && qrCodeScanner.getState() === 2){
					qrCodeScanner.stop().then((ignore) => {
					qrCodeScanner.clear()
				  }).catch((err) => {
					console.log(err);
				  });
				}
				el = {};
			},
			
			init : function(p){
				state.load();

				el = {};
                essenseData = p.essenseData || {};
				el.c = p.el.find('#' + self.map.id);
                make();
               initEvents(p);
				p.clbk(null, p);
			},
            wnd : {
				type : 'scanorimportqr',
				class : "smallWnd withoutButtons wndsharepost normalizedmobile maxheight showbetter"
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
	module.exports = scanorimportqr;
}
else{

	app.modules.scanorimportqr = {};
	app.modules.scanorimportqr.module = scanorimportqr;

}