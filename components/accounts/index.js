var accounts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el,
			pack,
			id, ed;

		var actions = {

			signin : function(address){

				self.app.platform.sdk.pool.expand(pack, function(expandedPack){
					var index = _.indexOf(expandedPack.addresses, address);

					if (index > -1){
						var _private = expandedPack.private[index];
						

						var stay = self.app.user.stay;

						globalpreloader(true)

						//bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))


						self.app.user.signout(function(){
							self.app.user.stay = stay;


							self.user.signin(_private, function(state){


								var h = ed.href || 'userpage?id=accounts&s=' + makeid()
								var history = false;

								if(isMobile()){
									h = window.history.state.href || 'index'
								}

								if (ed.toaccpage) {
									h = 'authorn?address=' + address
									history = true
								}

								if(!self.app.user.validate()){
									h = 'registration'
									history = true
								}

								globalpreloader(false)

								make()

								self.closeContainer()

								self.app.reload({
									href : h,
									history : history,
									nav : {
										reload : !history
									}
									
								})

							})
						});

						


						
					}

					else{

					}
				})

			},						

			dumpkey : function(address){

				self.app.platform.sdk.pool.expand(pack, function(expandedPack){
					var index = _.indexOf(expandedPack.addresses, address);

					if (index > -1){
						var _private = expandedPack.private[index];


						renders.dumpkey(address, _private)
					}
				})

			},

			remove : function(address){
				self.app.platform.sdk.pool.remove(pack, address)

				self.app.platform.sdk.pool.save()

				renders.addresses()

			},

			add : function(){

				var l = deep(pack, 'addresses.length')


				if (l >= (window.testpocketnet ? 20 : 5)){

					sitemessage(self.app.localization.e('max5acc'))

					return
				}

				self.app.nav.api.load({
					open : true,
					id : 'addaccount',
					inWnd : true,

					essenseData : {
						success : function(mnemonic){


							self.app.platform.sdk.pool.expand(pack, function(expandedPack){
								self.app.platform.sdk.pool.add(expandedPack, mnemonic, function(expandedPack, error){

									if (error){

										//hasinthispack

										new dialog({
											html : self.app.localization.e('acc' + error),
											class : "one zindex"
										})

									}
									else
									{
										self.app.platform.sdk.pool.export(expandedPack, function(_pack){

											self.app.platform.sdk.pool.current.packs[id] = _pack;
											self.app.platform.sdk.pool.save()

											pack = _pack

											self.app.platform.sdk.pool.info(_pack, function(){
												renders.addresses()
											})
											
											
										});

									}

								})
							});
						},
					}
				})

			},

		
		}

		var events = {

			dumpkey : function(){

				var address = $(this).closest('.addressTable').attr('address')

				new dialog({
					html :  self.app.localization.e('wanttoseekey'),
					btn1text : self.app.localization.e('seeprivatekey'),
					btn2text : self.app.localization.e('dcancel'),

					class : 'zindex',

					success : function(){

						actions.dumpkey(address);

					}
				})
			},

			remove : function(){
				var address = $(this).closest('.addressTable').attr('address')

				new dialog({
					html : self.app.localization.e('removeaddress'),
					btn1text :  self.app.localization.e('remove'),
					btn2text :  self.app.localization.e('dcancel'),

					class : 'zindex',

					success : function(){

						actions.remove(address);

					}
				})

			},

			signin : function(){
				var address = $(this).closest('.addressTable').attr('address')

				actions.signin(address)

			}	
		}

		var renders = {
			qrcode : function(el, c){
				
			},
			
			dumpkey : function(address, _private){


				var privateWif = '';


				try{
					var keyPair = self.app.user.keysPairFromPrivate(_private)

						privateWif = keyPair.toWIF().toString('hex')
				}
				catch(e){

					sitemessage(self.app.localization.e('errorreload'))

					return

				}

				self.fastTemplate('dumpkey', function(rendered){

					var d = new dialog({
						html : rendered,
						class : "one dumpedkeydialog",
						btn1text : self.app.localization.e('close'),
						
						clbk : function(el, d){

							el.find('.copyvalue').on('click', function(){

								var el = $(this).closest('.infotable').find('.value')
		
								copyText(el)
		
								sitemessage(self.app.localization.e('successcopied'))
							})
						}
					})
				}, {
					_private : _private,
					address : address,
					privateWif : privateWif
				})

				
			},
			addresses : function(clbk){
				self.shell({

					name :  'addresses',
					el :   el.addresses,

					data : {
						current : self.app.user.address.value,
						pack : pack
					},

					animation : 'fadeIn',

				}, function(p){

					if(!p || !p.el) return

					p.el.find('.remove').on('click', events.remove)
					p.el.find('.dumpkey').on('click', events.dumpkey)
					

					p.el.find('.ncurrent .label').on('click', events.signin)

					if (clbk)
						clbk();
				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.c.find('.add').on('click', actions.add)
		}

		var make = function(){
			var address = self.app.user.address.value;

			var pa = self.app.platform.sdk.pool.getPack(address);

			if (pa){

				pack = pa[0]
				id = pa[1]

				self.app.platform.sdk.pool.info(pack, function(){
					renders.addresses(function(){

						if (ed.dumpkey){

							actions.dumpkey(address)
							
						}
					})

				})
			}

			else
			{
				sitemessage("ERROR")
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}

				pack = null;
				id = null;

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.addresses = el.c.find('.addresses')
				el.dumpkey = el.c.find('.dumpkey')

				initEvents();

				make()

				p.clbk(null, p);
			},
			wnd : {			
				class : 'accountswnd normalizedmobile',
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
	module.exports = accounts;
}
else{

	app.modules.accounts = {};
	app.modules.accounts.module = accounts;

}