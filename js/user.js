User = function(app, p) {

	if(!p) p = {};

	var self = this;

	var ajax = app.ajax || null,
		prefix = app.options.name || "",
		settings = app.settings || null,
		s = "Xxsa4612caC#xa09uyqSSRd676555uYY!u765alLLom()jculloLjanbtallloYSDxuYYuY55we7",
		tokenExpired = null,
		tokenDialog = null,		
		state = 0; 

	self.imgur = {
		clientId : '61175058f8e21f4',
		secret : 'ea4020d8024dfb78d372d1cd21c2f3215c72ead4'
	};	

	var keys = {
		private : {
			set : function(l){
				
				this.value = l || null;
					
			},
			value : null
		},
		public : {

			set : function(l){
				
				this.value = l || null;
					
			},
			value : null
		}
	}

	self.address = {
		set : function(l){
			
			this.value = l || null;
				
		},
		value : null
	}


	self.data = {};
	
	self.tokenExpired = function(){

		self.isState(function(state){

			if(!state) return;

			var seconds = 30;

			tokenInterval = setInterval(function(){

				self.isState(function(state){

					if(!state){
						clearInterval(tokenInterval);
						return;
					}

					if(tokenExpired){

						var now = new Date();

						if (now > tokenExpired.addSeconds(-seconds)){

							clearInterval(tokenInterval);

							var _continue = false;

							var success = function(){
								_continue = true;

								app.platform.sdk.user.ping(function(){
									self.tokenExpired();
								});
							}

							var fail = function(){

								_continue = true;

								app.options.unathorizated(true);
							
							}

							tokenDialog = dialog({
								header : app.localization.e('id189'),
								html : '<div class="tokenExpired"><div>'+app.localization.e('id190')+'</div><div class="time"></div></div>',

								btn1text : app.localization.e('id191'),
								btn2text : app.localization.e('id192'),

								class : 'accepting',

								clbk : function(el, d){

									var update = function(time){
										el.find('.time').html(app.localization.e('id189', addZero(time.toFixed(0))) )
									}

									var end = function(){

										if(_continue) return;

										d.destroy();
										app.options.unathorizated();

									}

									var timer = new Timer({

										ontick : function(){

											if(_continue) return;
									    
											update(timer.getDuration() / 1000)
											
										},

										onend : end

									});

									timer.start(seconds);

									update(seconds)

								},

								success : success,

								fail : fail,

								close : fail
							})

						}

					}

				})

				

			}, 20)

		})

	}
	
	self.prepare = function(clbk){

		self.tokenExpired();

		app.platform.clear();

		app.platform.prepareUser(function(){
			if (clbk)
				clbk(state)	
		})

		
	}

	self.signin = function(mnemonic, clbk){



		var setKeysClbk = function(){
			self.isState(function(state){

				if(state){
					localStorage['popupsignup'] = 'showed'
					self.prepare(clbk)
				}
				else
				{
					if (clbk){
						clbk(state)
					}
				}
			})
		}

		console.log('self.stay', self.stay)

		if (self.stay){

			app.platform.cryptography.api.aeswc.encryption(mnemonic, app.options.fingerPrint, {}, function(enc){

				console.log('mnemonic', enc)

				localStorage['mnemonic'] = enc
			})
			
		}
		else
		{
			localStorage['mnemonic'] = ''
		}

		if(!bitcoin.bip39.validateMnemonic(mnemonic)){

			self.setKeysPairFromPrivate(mnemonic, function(result){

				if(result){



					setKeysClbk()
				}
				else
				{
					state = 0;

					if (clbk){
						clbk(state)
					}
				}

			})

			
		}
		else
		{
			self.setKeys(mnemonic, function(){

				setKeysClbk()
				
			})
		}

		
	}

	self.signout = function(){

		if (tokenDialog)
			tokenDialog.destroy();

		console.log("signout")

		localStorage['mnemonic'] = ''
		//localStorage['stay'] = ''

		keys.private.set();
		keys.public.set();

		settings.clear();

		app.platform.clear();

		if (app.platform.ws)
			app.platform.ws.destroy();

		if (app.platform.rtc)
			app.platform.rtc.destoryAll();
		
		self.data = {};

		state = 0;
	}


	self.isState = function(clbk){

		if(!p) p = {};

		if(state ===  2) {

			retry(
				function(){
					return state != 2;
				},
				function(){
					self.isState(clbk)
				}
			)
		
			return;
		}

		

		if (keys.private.value && keys.public.value){
			state = 1;
		}
		else{

			if (localStorage['mnemonic'] && self.stay){

				var m = localStorage['mnemonic'];

				app.platform.cryptography.api.aeswc.decryption(m, app.options.fingerPrint, {}, function(m){


					if(m){
						if(!bitcoin.bip39.validateMnemonic(m)){

							console.log("private", m)

							self.setKeysPairFromPrivate(m, function(){
								self.isState(clbk)
							})
						}
						else
						{
							self.setKeys(m, function(){
								self.isState(clbk)
							})
						}	
					}
					else
					{
						console.log("ASDSDASDASDA")
						localStorage['mnemonic'] = ''

						state = 0;	
						clbk(state);
					}

						

				})		

				return

			}
			
			state = 0;	
		}

		clbk(state);
	}

	self.validate = function(){

		return (!self.address.value || deep(app, 'platform.sdk.user.storage.me.name'))

	}

	self.isItMe = function(address){
		return self.address.value && self.address.value.toString('hex') == address
	}

	self.keysFromMnemo = function(mnemonic){

		var seed = bitcoin.bip39.mnemonicToSeed(mnemonic)

		return self.keysFromSeed(seed)

	}

	self.keysFromSeed = function(seed){

		var hash = bitcoin.crypto.sha256(Buffer.from(seed))
		
		var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF() 

		
	    var keyPair = bitcoin.ECPair.fromWIF(d)	    

	    return keyPair

	}

	self.setKeysPair = function(keyPair, clbk){

	    keys.private.set(keyPair.privateKey)
	    keys.public.set(keyPair.publicKey)

	  
	    var address = app.platform.sdk.address.pnet()

	    self.address.set(address.address)

	    topPreloader(20)

	    if (clbk)
    		clbk()
	   
    	
	}

	self.setKeysPairFromPrivate = function(private, clbk){
		var keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))

		
		self.setKeysPair(keyPair, function(){
			if (clbk)
				clbk(true)
		})
	

		
	}

	self.setKeys = function(mnemonic, clbk){
	    var keyPair =  self.keysFromMnemo(mnemonic)  

	    self.setKeysPair(keyPair, clbk)
    	
	}

	self.key = keys.public;
	self.private = keys.private;

	self.keys = function(){

		
		return bitcoin.ECPair.fromPrivateKey(keys.private.value)
	}

	self.stay = Number(localStorage['stay'] || '1')

	//if(typeof localStorage['stay'] == 'undefined') self.stay = 1;

	return self;
}

topPreloader(25);