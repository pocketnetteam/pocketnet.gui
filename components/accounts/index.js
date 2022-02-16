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
						var private = expandedPack.private[index];
						

						var stay = self.app.user.stay;

						globalpreloader(true)

						//bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))

						console.log("I")

						self.app.user.signout(function(){
							self.app.user.stay = stay;

							console.log("I2", private)

							self.user.signin(private, function(state){

								console.log("I3")

								var h = ed.href || 'userpage?id=accounts&s=' + makeid()
								var history = false;

								if(isMobile()){
									h = window.history.state.href || 'index'
								}

								if (ed.toaccpage) {
									h = 'author?address=' + address
									history = true
								}

								if(!self.app.user.validate()){
									h = 'registration'
									history = true
								}

								globalpreloader(false)

								self.closeContainer()

								console.log("H", h, history)

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

						console.log("INDEX", index)
					}
				})

			},						

			dumpkey : function(address){

				self.app.platform.sdk.pool.expand(pack, function(expandedPack){
					var index = _.indexOf(expandedPack.addresses, address);

					if (index > -1){
						var private = expandedPack.private[index];


						renders.dumpkey(address, private)
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

				if (l >= 5){

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

										dialog({
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

				dialog({
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

				dialog({
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
			
			dumpkey : function(address, private){


				var privateWif = '';


				try{
					var keyPair = self.app.user.keysPairFromPrivate(private)

						privateWif = keyPair.toWIF().toString('hex')
				}
				catch(e){

					sitemessage(self.app.localization.e('errorreload'))

					return

				}

				self.fastTemplate('dumpkey', function(rendered){

					var d = dialog({
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
					private : private,
					address : address,
					privateWif : privateWif
				})

				
			},
			addresses : function(clbk){
				self.shell({

					name :  'addresses',
					el :   el.addresses,

					data : {
						current : self.app.platform.sdk.address.pnet().address,
						pack : pack
					},

					animation : 'fadeIn',

				}, function(p){

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
			var address = self.app.platform.sdk.address.pnet().address;

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

			essense.destroy();

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