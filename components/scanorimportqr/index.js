var scanorimportqr = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
        var qrCodeScanner 
		var el,essenseData;

		var actions = {
			closeCordovaScanner : function(){
				QRScanner.destroy(function(status){
					console.log(status);
				  });
			}
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
							if(qrCodeScanner && qrCodeScanner.getState() === 2){
								qrCodeScanner.stop().then((ignore) => {
									qrCodeScanner.scanFile(file.file, false)
									.then(decodedText => {
										essenseData.login(trim(decodedText))
										self.closeContainer()
									})
									.catch(err => {
										self.app.Logger.error({
											err: err.text || 'scanQrFileError',
											code: 1001,
											payload: JSON.stringify(err),
										});
										self.closeContainer()
										sitemessage(self.app.localization.e('filedamaged'))
									});
							  }).catch((err) => {
								  self.app.Logger.error({
										err: err.text || 'stopScanQrFileError',
										code: 1001,
										payload: JSON.stringify(err),
									});
								console.log(err);
							  });
							}	
					}
					else
					{
						var b = file.base64.split(",")[1]

						var data = b64_to_utf8(b)

						var ds = data.split("/")


						if (ds[1]) {

                            trim(trim(ds[1]))
							essenseData.login(trim(ds[1]))
							self.closeContainer()
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
                        const buff = Buffer.from(decodedText, 'hex');

                        // FIXME:
                        //  This is a hack. Some Buffer behavior is broken.
                        //  Find out what is the reason...
                        buff._isBuffer = true;

                        bitcoin.ECPair.fromPrivateKey(buff)
                        isValidPrivateKey = true
                    }catch(e){
						self.app.Logger.error({
							err: e.text || 'fromPrivateKeyError',
							code: 1001,
							payload: JSON.stringify(e),
						});
                        isValidPrivateKey = false
                    }
                    isValidMnemonicPhrase = bitcoin.bip39.validateMnemonickWithLangDetection(decodedText.toLowerCase())
                    if(isValidPrivateKey || isValidMnemonicPhrase){
						
                        essenseData.login(decodedText)
						if(window.cordova){
							$("body").removeClass('camera')
							$(".cameraUi").remove()
							actions.closeCordovaScanner()
						}
						self.closeContainer()
                    }else{
                        sitemessage(self.app.localization.e('e13028'))
                    }
                }
                  
                function onScanFailure(error) {
                }
				if(window.cordova){
					$("body").addClass('camera')
					$("body").prepend("<div class='cameraUi'><div id='closeScannerButton' class='_close roundclosebutton'><i class='fa fa-times' aria-hidden='true'></i></div></div>")
					$("#closeScannerButton").on('click', function(){
						$("body").removeClass('camera')
						$(".cameraUi").remove()
						actions.closeCordovaScanner()
						self.closeContainer()
					})
					QRScanner.prepare(onDone);

					function onDone(err, status){
						if (err) {
							self.app.Logger.error({
								err: err.text || 'cordovaScannerRunError',
								code: 1001,
								payload: JSON.stringify(err),
							});
							switch (err.code) {
								case 1:
									sitemessage(self.app.localization.e('cameraError1'))
								  break;
								case 5:
									sitemessage(self.app.localization.e('cameraError5'))
								  break;
								default:
									sitemessage(error._message)
							  }
							$("body").removeClass('camera')
							$(".cameraUi").remove()
							actions.closeCordovaScanner()
							self.closeContainer()
							return
						}
						if (status.authorized) {
							QRScanner.show(function(){
								QRScanner.scan(function(err, text){
									if(!err){
										onScanSuccess(text)
									}
								});
							})
							
						} else if (status.denied) {
							console.log("denied");
							QRScanner.openSettings()
						}
					}
				}else{
					var cameraId
					window.Html5Qrcode.getCameras().then(devices => {
						if (devices && devices.length) {
							cameraId = devices[0].id;
							qrCodeScanner = new window.Html5Qrcode("reader")
							qrCodeScanner.start(
								// cameraId,
								{ facingMode: "environment" },
								{
									fps: 10,
									qrbox: {width: 250, height: 250},
									rememberLastUsedCamera: true
								},
								onScanSuccess,
								onScanFailure
							)	
						}
						el.c.find(".loader").fadeOut()
					}).catch(err => {
						el.c.find(".loader").fadeOut()
						el.c.find(".error").fadeIn()
						
					});               
				}
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
				if(window.cordova){
					actions.closeCordovaScanner()
				}else{
					if(qrCodeScanner && qrCodeScanner.getState() === 2){
						qrCodeScanner.stop().then((ignore) => {
						qrCodeScanner.clear()
					  }).catch((err) => {
						console.log(err);
					  });
					}
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