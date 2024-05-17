var qrscanner = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, qrScanner = null;

		var config = {
			fps: 2,
			disableFlip  : true,
		}

		var actions = {
			destroy : function(){
				if (qrScanner){
					qrScanner.stop();
					qrScanner.destroy();
					qrScanner = null
				}
			}
		}

		var events = {
			success : function(result){

				var decodedText = result.data

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

					actions.destroy()
	
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

				qrScanner = new QrScanner(
					el.c.find('video')[0],
					events.success,
					{ 
						highlightScanRegion : true,
						maxScansPerSecond : 2
					},
				);

				qrScanner.start();
	

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

				actions.destroy()
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

			window.rifticker.add(() => {
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