
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}


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

	self.peertube = {
		username : 'test_bastyon',
		password : 'test_bastyon',
		client_id : '35jtaik603lagm90ger8k0j9bcft7aah',
		client_secret : '3iQcgUIcJlV19acA7R86MfPmAAPUY8cW'
	}

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

	self.signature = function(str, exp, old){
		if(!str) str = 'pocketnetproxy'
		if(!exp) exp = 360

		var keyPair = self.keys()

		const currentMomentInUTC = (new Date()).toISOString();

		var nonce = 'date=' + currentMomentInUTC + ",exp=" + exp + ',s=' + hexEncode(str);

		var signature = null; 	

		if (old){

			nonce = utcnow().getTime()

			do{
				nonce = nonce + '' + rand(0, 9).toString();
			} while(nonce.length < 32)
			
			signature = keyPair.sign(Buffer.from(nonce))	
		}
		else
		{
			signature = keyPair.sign(bitcoin.crypto.sha256(Buffer.from(nonce)))	
		}

		var sobj = {

			nonce : nonce,
			signature : signature.toString('hex'),
			pubkey : keyPair.publicKey.toString('hex'),
			address : self.address.value,
			v : 1
			
		}

		if(old) delete sobj.v

		return sobj
	}


	self.address = {
		set : function(l){
			
			this.value = l || null;
				
		},
		value : null
	}


	self.data = {};
	self.features = {};
	
	self.tokenExpired = function(){}

	self.prepare = function(clbk){


		self.tokenExpired();

		app.platform.clear(true);
		app.platform.prepareUser(function(){


			if (clbk)
				clbk(state)	
				
		})

		
	}

	self.signin = function(mnemonic, clbk){

		var setKeysClbk = function(){

			app.platform.cryptography.api.aeswc.encryption(mnemonic, app.options.fingerPrint, {}, function(enc){
				if (self.stay){
					localStorage['mnemonic'] = enc
				}
				else
				{
					sessionStorage['mnemonic'] = enc
				}
			})
		

			self.isState(function(state){


				if(state){

					localStorage['waslogged'] = true
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

		if(!bitcoin.bip39.validateMnemonic(mnemonic)){

			self.setKeysPairFromPrivate(mnemonic, function(result){

				if(result){

					setKeysClbk()
				}
				else
				{
					localStorage['mnemonic'] = ''

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

	self.features = {};
	self.signout = function(clbk){

		if (app.platform.firebase){
			app.platform.firebase.destroy();
		}

		state = 0;
		self.data = {};
		localStorage['mnemonic'] = ''
		sessionStorage['mnemonic'] = ''

		settings.clear();

		keys.public.set();
		keys.private.set();

		app.platform.clear();

		app.platform.matrixchat.destroy();

		self.address.set()

		if (tokenDialog)
			tokenDialog.destroy();

		if (app.platform.ws)
			app.platform.ws.destroy();

		if (app.platform.rtc)
			app.platform.rtc.destoryAll();

		if (clbk) clbk()

		// Unsubscribe from notifications
		//app.notifications.unsubscribe();
	}

	self.getstate = function(){
		return state
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

			if ( (localStorage['mnemonic'] && self.stay) || sessionStorage['mnemonic']){

				var m = localStorage['mnemonic'] || sessionStorage['mnemonic'];

				app.platform.cryptography.api.aeswc.decryption(m, app.options.fingerPrint, {}, function(m){


					if(m){
						if(!bitcoin.bip39.validateMnemonic(m)){

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
						if(!_OpenApi){
							localStorage['mnemonic'] = ''
							sessionStorage['mnemonic'] = ''
						}
							

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

	self.validateVay = function(){

		if(!self.address.value) return 'fu';

		var me = deep(app, 'platform.sdk.user.storage.me');

		if (me && me.relay){

			var regs = app.platform.sdk.registrations.storage[self.address.value];

			if (regs && (regs === true || regs < 3)){
				return 'fuf'
			}

		}

		if(!(deep(app, 'platform.sdk.user.storage.me.name'))) return 'fu' 
	}

	self.validate = function(){

		if(!self.address.value) return false;

		var me = deep(app, 'platform.sdk.user.storage.me');

		if (me && me.relay){

			var regs = app.platform.sdk.registrations.storage[self.address.value];

			if (regs && (regs === true || regs < 3)){

				
				return false
			}

		}

		return (deep(app, 'platform.sdk.user.storage.me.name'))

	}

	self.isItMe = function(address){
		return self.address.value && self.address.value.toString('hex') == address
	}

	self.keysFromMnemo = function(mnemonic){

		if(!mnemonic) mnemonic = ''

		var seed = bitcoin.bip39.mnemonicToSeedSync(mnemonic.toLowerCase())

		return self.keysFromSeed(seed)

	}

	self.keysFromSeed = function(seed){

		//var hash = bitcoin.crypto.sha256(Buffer.from(seed))
		
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

	self.keysPairFromPrivate = function(private, clbk){

		if(!private) private = ''

		var keyPair = null;
		if (bitcoin.bip39.validateMnemonic(private.toLowerCase())) {
			keyPair = self.keysFromMnemo(private)
		}
		else{
			try{
				keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))
			}
			catch (e){

				try{
					keyPair = bitcoin.ECPair.fromWIF(private)
				}
				catch (e){
				}
			} 
		}


		

		return keyPair

	
	}

	self.setKeysPairFromPrivate = function(private, clbk){
		var keyPair = null;

		try{

			keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))

			
		}
		catch (e){



			try{
				keyPair = bitcoin.ECPair.fromWIF(private)
			}
			catch (e){
			}
		} 

		if(keyPair){
			self.setKeysPair(keyPair, function(){
				if (clbk)
					clbk(true)
			})
		}
		else{
			if (clbk)
				clbk(false)
		}
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

	self.cryptoKeys = function(){
		var ckeys = [];
		if(keys.private.value){
			for(var i = 1; i < 13; i++){
				var d = bitcoin.bip32.fromSeed(keys.private.value).derivePath(app.platform.sdk.address.path33(i)).toWIF()
	
				var keyPair = bitcoin.ECPair.fromWIF(d)
	
				ckeys.push({
					pair : keyPair,
					public : keyPair.publicKey.toString('hex')
				})
			}
		}

		return ckeys;
	}

	self.stay = Number(localStorage['stay'] || '1')

	//if(typeof localStorage['stay'] == 'undefined') self.stay = 1;

	return self;
}

topPreloader(25);

if(typeof module != "undefined")
{
	module.exports = User;
}