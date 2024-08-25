
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
		},
		pair : {

			set : function(l){
				
				this.value = l || null;
					
			},
			value : null
		}
	}

	var sigcache = {}
 
	//TODO SIG CACHE expirationShift

	self.signature = function(str, exp, old, expirationShift){
		if(!str) str = 'pocketnetproxy'
		if(!exp) exp = 360
		if(!expirationShift) expirationShift = 160

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
					var s = false

					try{
						localStorage['mnemonic'] = enc
						s = true
					}catch(e){
						
					}

					if(!s){
						try{
							sessionStorage['mnemonic'] = enc
						}catch(e){
							
						}
					}
					
				}
				else
				{
					sessionStorage['mnemonic'] = enc
				}

				self.umnemonic = enc
			})
		

			self.isState(function(state){


				if(state){

					try{
						localStorage['waslogged'] = true
						localStorage['popupsignup'] = 'showed'


						localStorage['useraddress'] = self.address.value
					}catch(e){
					}

					
					app.apps.emit('state', 1)

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

					try{
						localStorage['mnemonic'] = ''
					}catch(e){
					}

					

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

		if (app.platform.sdk.categories.clbks.tags.topusersRemove){
			app.platform.sdk.categories.clbks.tags.topusersRemove();
		}

		state = 0;
		self.data = {};

		try{
			localStorage['mnemonic'] = ''
			sessionStorage['mnemonic'] = ''
			localStorage['useraddress'] = ''
		}catch(e){
		}

		
		var cache = self.smcache('mncache' + (window.testpocketnet ? 'test' : 'production'), true)
			cache.clear()

		settings.clear();

		keys.public.set();
		keys.private.set();
		keys.pair.set();

		app.platform.clear();

		app.platform.matrixchat.destroy();

		if (app.apps){
			app.apps.emit('state', 0)
		}

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

	self.isStatePromise = function(){
		return new Promise((resolve, reject) => {
			self.isState(resolve)
		})
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

			var lsmn = ''
			var ssmn = ''

			try{
				lsmn = localStorage['mnemonic']
				ssmn = sessionStorage['mnemonic']
			}catch(e){
			}

			if ( (lsmn && self.stay) || ssmn){

				var m = lsmn || ssmn;

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

							try{
								localStorage['mnemonic'] = ''
								sessionStorage['mnemonic'] = ''
							}catch(e){
							}

							
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

		if(app.platform.sdk.user.myaccauntdeleted()) return 'deleted'

		var account = app.platform.actions.getCurrentAccount()

		if(!account) return 'fu'

		var astatus = account.getStatus()

		if (astatus == 'not_in_progress_no_processing'){
			return 'fu'
		}
	}

	self.validate = function(){

		var account = app.platform.actions.getCurrentAccount()

		if(!account) return false

		var astatus = account.getStatus()

		if (astatus == 'not_in_progress_no_processing'){
			return false
		}

		return true

		if(!self.address.value) return false;

		if(app.platform.sdk.user.myaccauntdeleted()) return false

		var me = app.platform.psdk.userInfo.getmy() || {}

		if (me && me.relay){

			var regs = app.platform.sdk.registrations.storage[self.address.value];

			if (regs && (regs === true || regs < 3)){
				
				return false
			}

		}

		return me.name

	}

	self.userRegistrationStatus = function(){

		var account = app.platform.actions.getCurrentAccount()

		if(!account){
			return 'not_authorizated'
		}

		return account.getStatus()
		
	}

	self.registrationProgressIcon = function(){
		var r = self.userRegistrationStatus()
		
		if(app.platform.sdk.user.reputationBlockedMe()){

			return '<div class="registrationProgressIcon blocked" title="'+app.localization.e('lockedaccount')+'"><i class="fas fa-times-circle"></i></i><span>'+app.localization.e('lockedaccount')+'</span></div>'
		}


		if (r == 'registered'){
			return ''
		}

		return '<div class="registrationProgressIcon '+r+'" title="'+app.localization.e('registration_' + r)+'"><i class="fas fa-stopwatch"></i><span>'+app.localization.e('registration_' + r)+'</span></div>'

	}

	self.isItMe = function(address){
		return self.address.value && self.address.value == address
	}

	self.smcache = function(name, bf){
		return {
			clear : function(){
				try{
					localStorage[name] = ''
				}
				catch(e){
					
				}
			},
			set : function(m, seed){
				var ls = this.getall()
	
				ls[m] = seed
	
				try{
					localStorage[name] = JSON.stringify(ls)
				}
				catch(e){
					
				}
				
			},
			get : function(m){
				var ls = this.getall()
	
				if(ls[m]){
					if(bf){
						return Buffer.from(ls[m])
					}
					else{
						return ls[m]
					}
					
					
				}
	
				return 
			},
			getall : function(){
				var ls = {}
	
				try{
					ls = JSON.parse(localStorage[name] || "{}")
				}catch(e){}
	
				return ls
			}
		}
	}


	self.keysFromMnemo = function(mnemonic){

		mnemonic = (mnemonic || '').toLowerCase()

		var cache = self.smcache('mncache' + (window.testpocketnet ? 'test' : 'production'), true)

		var seed = cache.get(mnemonic) || bitcoin.bip39.mnemonicToSeedSync(mnemonic)

			cache.set(mnemonic, seed)

		return self.keysFromSeed(seed)

	}

	self.keysFromSeed = function(seed){

		var cache = self.smcache('seedcache' + (window.testpocketnet ? 'test' : 'production'))

		var d = cache.get(seed.toString('hex')) || bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF() 

			cache.set(seed.toString('hex'), d)

	    var keyPair = bitcoin.ECPair.fromWIF(d)	    

	    return keyPair

	}

	self.setKeysPair = function(keyPair, clbk){

	    keys.private.set(keyPair.privateKey)
	    keys.public.set(keyPair.publicKey)
		keys.pair.set(keyPair)
	  
	    var address = app.platform.sdk.address.pnet()

	    self.address.set(address.address)

		localStorage['useraddress'] = address.address

	    topPreloader(20)

	    if (clbk)
    		clbk()
	   
    	
	}

	self.keysPairFromPrivate = function(_private, clbk){

		if(!_private) _private = ''

		var keyPair = null;
		if (bitcoin.bip39.validateMnemonic(_private.toLowerCase())) {
			keyPair = self.keysFromMnemo(_private)
		}
		else{
			try{
				keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(_private, 'hex'))
			}
			catch (e){

				try{
					keyPair = bitcoin.ECPair.fromWIF(_private)
				}
				catch (e){
				}
			} 
		}


		

		return keyPair

	
	}

	self.setKeysPairFromPrivate = function(_private, clbk){
		var keyPair = null;

		try{

			keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(_private, 'hex'))

			
		}
		catch (e){



			try{
				keyPair = bitcoin.ECPair.fromWIF(_private)
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
		return keys.pair.value
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

	self.setstay = function(v){	
		try {
			localStorage['stay'] = v || 0;

			if(!v) {
				localStorage['mnemonic'] = '';
			}
		}
		catch (e) { }

		self.stay = v || 0;
	}

	try{
		self.stay = Number(localStorage['stay'] || '1')
	}catch(e){
		self.stay = '1'
	}

	

	//if(typeof localStorage['stay'] == 'undefined') self.stay = 1;

	return self;
}

topPreloader(25);

if(typeof module != "undefined")
{
	module.exports = User;
}