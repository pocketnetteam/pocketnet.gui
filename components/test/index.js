var test = (function(){

	var self = new nModule();

	var mdl = self;

	var essenses = {};
	
	var userOptions;

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {}, ed, ref, plissing; 

		var firstTime = false;
		var loading = false
		//var termsaccepted = false;

		var checkusernameTimer = null

		var tempInfo = {
			language : self.app.localization.key || 'en'
		}

		var saving = false

		var getrefname = function(clbk){
			if (self.app.ref){
				self.sdk.users.get(self.app.ref, function(){

					var name = (self.psdk.userInfo.get(self.app.ref) || {}).name
					
					if (clbk)
						clbk(name)
				})
			}
			else{
				if (clbk)
					clbk(null)	
			}
		}

		var actions = {		

			loading : function(en){

				loading = en ? true : false

				if(el.c){

					if(loading){
						globalpreloader(true)
					}
					else{
						globalpreloader(false)
					}
					
				}
				
			},

			saveemail : function(email, clbk){
				var _p = {
					Email : email,
					Lang : self.app.localization.key || 'en'
				}

				_p.Action || (_p.Action = 'ADDTOMAILLIST');
				_p.TemplateID = '1005'

				_p.ref = ''
				
	
				getrefname(function(name){
	
					var body = ''

	
					if (name) {
						
						_p.ref += name
	
						body += '<p><a elementsid="https://'+self.app.options.url+'/authorn?address='+self.app.ref+'" href="https://'+self.app.options.url+'/authorn?address='+self.app.ref+'">Referrer: '+name+'</a></p>'
					}							
	
					var r = deep(document, 'referrer')
	
					if (r) {
						body += '<p><a elementsid="'+r+'" href="'+r+'">From: '+r+'</a></p>'

						_p.from = r
					}
	
					_p.body = encodeURIComponent(body)
	
					$.ajax({
						type: 'POST',
						url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
						data: _p,
						dataType: 'json',
						success : function(){
		
		
							if (clbk)
								clbk();
		
						},

						error : function(){
							topPreloader2(100)
		
							if (clbk)
								clbk();
						}
					});
				})
			
			},

			valid : function(v1, v2){
				if(!actions.equal((v1), (v2))){

					if(trim(v1.name)) return true

				}
			},

			equal : function(v1, v2){

				var a = function(o){
					return 'name:' + (trim(o.name) || "") + 'image:' + (o.image || "") + 'about:' + (trim(o.about) || "") + 'site:' + (trim(o.site) || "")  + 'language:' + (o.language || "") + "addresses:" + JSON.stringify(o.addresses || [])
				}

				return a(v1) == a(v2)
			},
			cancel : function(){
				actions.userOptions()

				actions.upanel();

				renders.icon();

				renders.icon(renders.options);
			},
			ref : function(){


				if (ref && firstTime && !self.app.dsubref){

					try {
						localStorage[self.app.user.address.value + 'subscribeRef'] = ref.address
					}
					catch (e) { }

													
				}

			},

			save : function(clbk){

				if (saving) return

					saving = true

				var allclbk = function(action){

					actions.loading(false)

					topPreloader2(100)

					saving = false

					if (primary && !ed.reloadOnly){

						self.nav.api.go({
							href : 'index',
							history : true,
							open : true
						})	

					}
					
					else
					{	
						if (ed.success){							
							ed.success(action)
						}
						else
						{
							self.app.reloadModules(function(){
								if (clbk)
									clbk()
							})
						}
					}
				}

				

				if (loading){
					saving = false
					return
				}

				if (actions.equal(tempInfo, self.psdk.userInfo.getmy() || {})){
					sitemessage(self.app.localization.e('uchanges'))
					saving = false
					return
				}

				if(!actions.valid(tempInfo, self.psdk.userInfo.getmy() || {})){
					sitemessage(self.app.localization.e('uchangesvalid'))

					if(!trim(tempInfo.name)){	
						var pn = el.c.find('[parameter="name"] input')

						pn.focus()
						_scrollTo(pn, el.c.closest('.customscroll'))
					}
					else{
						if(!tempInfo.image){	
							var pn = el.c.find('.fileUploader')

							_scrollTo(pn, el.c.closest('.customscroll'))
						}	

					}
						
					saving = false
					return
				}

				var userInfo = new UserInfo();

					userInfo.name.set(trim(superXSS(tempInfo.name)));
					userInfo.language.set(superXSS(tempInfo.language));
					userInfo.about.set(findAndReplaceLinkClearReverse(trim(superXSS(tempInfo.about))));
					userInfo.site.set(trim(superXSS(tempInfo.site)));
					userInfo.image.set(superXSS(tempInfo.image));
					userInfo.addresses.set(tempInfo.addresses);
					userInfo.ref.set(deep(ref, 'address') || '');

				var err  = userInfo.validation()

				if (err){

					el.c.find('.errorname').fadeIn();

					if(err == 'namelength'){

						
						el.c.find('.errorname span').html(self.app.localization.e('name20symbols'));
						
					}

					if(err == 'pocketnet'){

						el.c.find('.errorname span').html(self.app.localization.e('namereservedpn'));
						
					}

					if(err == 'bastyon'){

						el.c.find('.errorname span').html(self.app.localization.e('namereservedbn'));
						
					}


					var pn = el.c.find('[parameter="name"] input')

						pn.focus()

						_scrollTo(pn, el.c.closest('.customscroll'))
						saving = false
					return false;
				}
				saving = false

				renders.termsconditions(function(){
					saving = true

					topPreloader2(30)

				

					actions.loading(true)

					self.app.platform.sdk.users.nameExist(userInfo.name.v, function(exist){

						//exist = false

						if(!exist || (exist == self.app.user.address.value)){

							topPreloader2(50)

							ed.presave(function(){

								userInfo.keys.set(_.map(self.app.user.cryptoKeys(), function(k){
									return k.public
								}))
							
								el.c.find('.errorname').fadeOut();

								topPreloader2(70)

								userInfo.uploadImage(self.app, function(err){

									if (err){
										topPreloader2(100)
										saving = false
										actions.loading(false)

										sitemessage("An error occurred while loading images")
										
										return 
									}

									var email = tempInfo.email;

									if (email){
										actions.saveemail(email);
									}

									self.app.platform.actions.addActionAndSendIfCan(userInfo).then(action => {

										successCheck()

										//self.psdk.userInfo.clearAll(self.user.address.value)

										tempInfo = _.clone(self.psdk.userInfo.getmy() || {})
												
										actions.upanel()

										actions.ref()

										self.closeContainer()

										if (ed.presuccess){
											ed.presuccess(() => {
												allclbk(action)
											})
										}
										else{
											allclbk(action)
										}
	

									}).catch(e => {

										console.error(e)

										self.app.platform.errorHandler(e, true)	

									}).finally(() => {

										saving = false;
										actions.loading(false)
										topPreloader2(100)

									})


									
								})

							})

						}
						else
						{
							saving = false
							actions.loading(false)
							topPreloader2(100)

							var txt = self.app.localization.e('nametaken')

							el.c.find('.errorname').fadeIn();
							el.c.find('.errorname span').html(txt);

							var pn = el.c.find('[parameter="name"] input')

								pn.focus()

								_scrollTo(pn, el.c.closest('.customscroll'))
							
							sitemessage(txt)
						}
					}, true)

					
				})
				
		
			},
			upload	: function(file, clbk){

				if(file.ext == 'gif' && 1 == 2){

					globalpreloader(true)

					self.app.gifResizer.prepare().then(() => {


						self.app.gifResizer.resize(file.base64, {width : 150, height : 150}).then((base64) => {
							globalpreloader(false)

							tempInfo.image = base64;

							renders.icon()

							actions.upanel()	
							
							if (clbk)
								clbk()
						})

					}).catch(e => {
						console.error(e)
					})

					return
				}

				

				var images = [{
					original : file.base64,
					index : 0
				}]

				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,

					essenseData : {
						edit : true,
						initialValue : 0,
						images : images,

						apply : true,

						crop : {
							aspectRatio : 1 / 1,
							style : 'round apply',
							autoCropArea : 0.9,
						},

						success : function(i, editclbk){

							topPreloader2(20);

							resize(images[0].original, 150, 150, function(resized){
								var r = resized.split(',');

								editclbk();

								if (r[1]){

									tempInfo.image = resized;

									renders.icon()

									actions.upanel()	
									
									if (clbk)
										clbk()

								}
								
								topPreloader2(100);

								
							})

						}
					}
				})


				
			},
			upanel : function(){

				if(!el.upanel) return


				var account = self.app.platform.actions.getCurrentAccount()

				//TODO_REF_ACTIONS

				if(account && account.getTempUserInfo() && account.getTempUserInfo().transaction){

					el.upanel.addClass('wait')

					el.c.find('.caption').remove()

				}
				else{
					el.upanel.removeClass('wait')

					if(actions.equal(tempInfo, self.psdk.userInfo.getmy() || {}) || !actions.valid(tempInfo, self.psdk.userInfo.getmy() || {})){
						
						el.upanel.removeClass('changes')
					}
					else
					{
						el.upanel.addClass('changes')
					}
				}

				
				
			},

			clear : function(){
				actions.userOptions();
			},

			userOptions : function(){

				tempInfo = _.clone(self.psdk.userInfo.getmy() || {})

				_.each(userOptions, function(parameter, id){
					var value = tempInfo[parameter.id];

					if(id == 'addresses'){
						value = _.clone(tempInfo[parameter.id]);
					}
					
					parameter.value = value || parameter.defaultValue || ''
					tempInfo[parameter.id] = parameter.value

					parameter._onChange = function(value){

						if(id == 'addresses'){
							tempInfo[parameter.id] = _.clone(value);
						}
						else
						{
							tempInfo[parameter.id] = trim(value);
						}

						actions.upanel()

						if (id == 'language'){
							var a = self.app.localization.available[value];

							if (a && a.key != self.app.localization.key)
							{
								self.app.localization.lightSet(a.key);
							}
						}

						if (id == 'name'){

							var hash = tempInfo[parameter.id].toLowerCase().replace(/[^a-z]/g,'')


							if (hash.indexOf('pocketnet') > -1 && !self.app.platform.whiteList.includes(tempInfo.address)) {

								el.c.find('.errorname').fadeIn();
								el.c.find('.errorname span').html(self.app.localization.e('namereservedpn'));	

								return
							}

							if (hash.indexOf('bastyon') > -1) {

								el.c.find('.errorname').fadeIn();
								el.c.find('.errorname span').html(self.app.localization.e('namereservedbn'));	

								return
							}
							
							if (tempInfo[parameter.id].length > 20){
								el.c.find('.errorname').fadeIn();
								el.c.find('.errorname span').html(self.app.localization.e('name20symbols'));	
							}
							else
							{

								checkusernameTimer = slowMade(function(){

									var n = tempInfo[parameter.id]

									self.app.platform.sdk.users.nameExist(n, function(exist){

										if(tempInfo[parameter.id] != n) return

										if(!el.c) return
	
										if(!exist || (exist == self.app.user.address.value)){
											el.c.find('.errorname').fadeOut();
										}
										else
										{
											el.c.find('.errorname').fadeIn();
											el.c.find('.errorname span').html(self.app.localization.e('nametaken'));									
										}
									})	

								}, checkusernameTimer, 300)
								
								
							}
						}
					}
				})
			},

			signout : function(){
				self.app.user.signout();

				self.app.reload({
					href : 'authorization'
				});
			},
		}

		var initUserOptions = function(){
			userOptions = {
				name : new Parameter({
					name : self.app.localization.e('unickname'),
					placeholder : self.app.localization.e('unickname'),
					id : 'name',
					type : "NICKNAME",
					onType : true,
					require : true,
					onFocus : function(pn){
						if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
					}
				}),
	
				email : new Parameter({
					name : 'Email',
					placeholder : 'Email',
					id : 'email',
					type : "STRINGANY",
					onType : true,
	
					onFocus : function(pn){
						if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
					}
				}),
	
				language : new Parameter({
					name : self.app.localization.e('ulanguage'),
					placeholder : self.app.localization.e('ulanguage'),
					id : 'language',
					type : "VALUES",
					defaultValue : self.app.localization.key || 'en',
				
					possibleValues : ['en', 'ru'],
					possibleValuesLabels : ['English', 'Русский'],
				}),

				about : new Parameter({
					name : self.app.localization.e('uabout'),
					id : 'about',
					type : "TEXT",
					onType : true,
					
					placeholder : self.app.localization.e('e133512')
				}),

				site : new Parameter({
					name : self.app.localization.e('uwebsite'),
					id : 'site',
					type : "STRINGANY",
					onType : true,
					value : '',
					name : self.app.localization.e('uwebsite')
				}),

				addresses : new function(){

					var _self = this;

					_self.id = 'addresses';
					_self.name = self.app.localization.e('uaddresesd')
					_self.value = [];

					_self.defaultValue = [];

					_self.remove = function(currency, address){
						removeEqual(_self.value, {
							currency : currency,
							address : address
						})

						if (_self._onChange)
							_self._onChange(_self.value)

						_self.addedAddresses();
					}

					_self.add = function(v){


						_self.value.push(v)

						if (_self._onChange)
							_self._onChange(_self.value)

						_self.addedAddresses();

					}

					_self.addDialog = function(){

						var validate = function(cur, address){

							var valid;

							if (cur === 'usdt|trc20'){

								valid = /T[A-Za-z1-9]{33}/.test(address);

							} else {

								valid = WAValidator.validate(address, cur === 'usdt|erc20' ? 'eth' : cur);
							}

							if(address.length > 0 && valid){
								
								return true
							}
							else
							{
								return false
							}

							
						}

						self.nav.api.loadRelations({

							relations : [
								{src : 'js/vendor/wallet-address-validator.min.js',	 f : 'js'},
							],
	
						}, function(){
							mdl.fastTemplate('addaddress', function(rendered){

								new dialog({
									html : rendered,
	
									wrap : true,
	
									success : function(d){
	
										var c = d.el.find('.currency').val();
										var address = d.el.find('.address').val();
	
										if(validate(c, address)){
	
											_self.add({
												currency : c,
												address : address
											})
	
											return true;
	
										}
									},
	
									clbk : function(_el){
	
										var currency = _el.find('.currency');
										var address = _el.find('.address');
										var b = _el.find('.btn1');
	
	
										var vl = function(){
											var c = currency.val();
	
											var a = address.val();
	
											if(validate(c, a)){
												b.removeClass('disabled')
	
												return true;
											}
											else
											{
												b.addClass('disabled')
												return false;
											}
										}
	
										address.focus()
										address.on('change', vl)
										address.on('keyup', vl)
	
										currency.on('change', vl)
										currency.on('keyup', vl)
	
										vl()
									},
	
									class : "one addaddressDialog zindex"
								})
	
							}, {
							})
						})

						
					}

					_self.removeEvent = function(){
						var currency = $(this).closest('.addedAddress').attr('currency')
						var address = $(this).closest('.addedAddress').attr('address')

						_self.remove(currency, address)
					}

					_self.addedAddresses = function(){
		
						/* 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX */

						var h = '';

						_.each(_self.value, function(v){
						
							if(!v || !v.currency) return

							h += '<div class="addedAddressWrapper">'
								h += '<div class="addedAddress table" currency="'+v.currency+'" address="'+v.address+'">'

								h += 	'<div class="currencyWrapper">'	
								h += 		v.currency.toUpperCase()
								h += 	'</div>'

								h += 	'<div class="addressWrapper">'	
								h += 		v.address
								h += 	'</div>'

								h += 	'<div class="panelWrapper">'	
								h += 		'<div class="item remove">'	
								h += 			'<i class="far fa-times-circle"></i>'	
								h += 		'</div>'
								h += 	'</div>'

								h += '</div>'
							h += '</div>'
						})
						
						_self.el.find('.addedAddressesWrapper').html(h)

						_self.el.find('.addedAddressesWrapper .remove').on('click', _self.removeEvent)
					}



					_self.init = function(_el){

						_self.defaultValue = [];

						_self.el = _el.find('.adressesInput')

						_self.addedAddresses();

						_self.el.find('.addaddress').on('click', _self.addDialog)
					}	

					_self.input = function(){
						var h = ''

						h += '<div class="adressesInput">'
						h += 	'<div class="addaddressWrapper">'
						h += 		'<div class="addaddress">'
						h += 			'<i class="fas fa-plus"></i>'
						h += 		'</div>'
						h += 	'</div>'
						h += 	'<div class="addedAddressesWrapper">'
						h += 	'</div>'
						h += '</div>'

						return h;
					}

					return _self
				}
			}
		}

		var events = {
			signout : function(){
				actions.signout()
			},
			save : function(){

			
				actions.save()
				
				
			},
			cancel : function(){
				actions.cancel()
			},
			
		}

		

		var renders = {
			termsconditions : function(clbk){


				

				if (ed.wizard){
					self.app.platform.acceptterms(clbk)
				}
				else{
					clbk()
				}

				/* if(window.cordova && ed.wizard){

					self.nav.api.load({
						open : true,
						id : 'terms',
						inWnd : true,
						essenseData : {
							success : function(){
								termsaccepted = true
								clbk()
							}
						},
	
						clbk : function(){
							
						}
					})

				}
				else{
					clbk()
				}*/
			},
			options : function(clbk){

				self.shell({

					name :  'options',
					el :   el.options,
					data : {
						tempInfo : tempInfo,
						userOptions : userOptions
					},

					insertimmediately : true

				}, function(_p){

					ParametersLive(_.toArray(userOptions), _p.el)

					userOptions.addresses.init(_p.el)

					if (clbk)
						clbk();

				})
			},
			icon : function(clbk){
				self.shell({

					name :  'icon',
					el :   el.icon,
					data : {
						tempInfo : tempInfo,
						ed : ed
					},

					insertimmediately : true

				}, function(_p){


					initUpload({
						el : _p.el.find('.pgroup'),
			
						ext : ['png', 'jpeg', 'jpg', 'webp', /*'gif', */'jfif'],

						dropZone : el.c,

						multiple : false,

						app : self.app,

						action : function(file, clbk){

							actions.upload(file, function(){		
								if (plissing)
									plissing.destroy()

									_scrollTo(el.c.find('.nickname input').focus(), el.c.closest('.customscroll'));
								

								if (clbk)
									clbk();

							})
							
						},

						onError : function(er, file, text){
							sitemessage(text)
						}
					})


					if (clbk)
						clbk();

				})
			},
			unspent : function(unspent, clbk){
				self.shell({

					name :  'unspent',
					el :   el.unspent,
					data : {
						unspent : unspent
					},

				}, function(_p){

					if (clbk)
						clbk();

				})
			},

			address : function(){
				el.c.find('.adr').html(bitcoin.payments[self.app.platform.addressType]({ pubkey: self.app.user.key.value}))
			}
			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.import.on('click', events.importAddress)
			el.showhidetestpanel.on('click', function(){
				$(this).closest('.testPanel').toggleClass('active')
			})

			el.upanel.find('.cancel').on('click', events.cancel)
			el.upanel.find('.save').on('click', events.save)

			//ParametersLive([setNode, setAddressType], el.c)			

			el.signout.on('click', events.signout)

			el.c.find('.refRemove').on('click', function(){
				ref = null;
				try {
					delete localStorage['ref']
				}
				catch (e) { }
				

				el.c.find('.referalMaketWrapper').remove()
			})

			if(ed.events){
				ed.events(events)
			}
			
		}

		var make = function(){

			renders.icon(() => {
				renders.options(() => {
					window.rifticker.add(() => {
						el.c.addClass('rendered')
					})
				})
			});

		}

		var prepare = function(){
			actions.userOptions()
		}

		
		
		return {
			primary : primary,

			getdata : function(clbk, p){

				//testletter()

				initUserOptions()

				ref = null
				changedLoc = true;

				ed = p.settings.essenseData || {};

				if(!ed.presave){
					ed.presave = function(clbk){
						if (clbk)
							clbk()
					}
				}
				

				self.app.platform.sdk.user.get(function(){

					if(!self.psdk.userInfo.getmy()){
						firstTime = true

						var _r = self.app.ref;

						if (_r && _r != self.app.user.address.value)

							ref = _r;
					}

					prepare();

					var data = {};

						data.firstTime = firstTime;
						data.caption = ed.caption

					if(!data.caption && ed.reason){
						data.caption = self.app.localization.e('reason_' + ed.reason)
					}

					if(ref){
						self.sdk.users.get(ref, function(){

							var address = ref;

							ref = self.psdk.userInfo.get(address) 

							data.ref = ref;


							clbk(data);

						})
					}
					else
					{
						clbk(data);
					}

					

				})

			},

			destroy : function(){

				if (el.c) el.c.empty()

				if (loading){
					actions.loading(false)
				}


				el = {};
				ed = {};

				saving = false

				tempInfo = {
					language : self.app.localization.key || 'en'
				}

				return null;
			},
			
			init : function(p){

				state.load();

				loading = false

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.transaction = p.el.find('.transactionInfo');
				el.unspent = p.el.find('.unspentlist');
				el.showhidetestpanel = p.el.find('.showhidetestpanel')
				el.import = p.el.find('.import');
				el.caption = el.c.find('.bgCaption');
				el.icon = el.c.find('.pgroupIconWrapper');

				el.usericon = el.c.find('.usericon');
				el.options = el.c.find('.optionsParameters');
				el.upanel = ed.panel || el.c.find('.upanel');

				el.signout = el.c.find('.signout')

				initEvents();

				actions.upanel();

				make();

				p.clbk(null, p);
			},

			wnd : {
				class : 'withoutButtons allscreen testwindow normalizedmobile maxheight',
				closecross : function(){
					if(ed.fail) ed.fail()
				}
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		var s = null

		_.each(essenses, function(essense){

			var d = essense.destroy();

			if (d){
				s = d;
			}

		})

		if(!s) return;

		return {
			action : s
		};

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = test;
}
else{

	app.modules.test = {};
	app.modules.test.module = test;

}