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

						//bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex'))

						self.app.user.signout(function(){
							self.app.user.stay = stay;

							self.user.signin(private, function(state){

								

								self.app.reloadLight(function(){

									var h = 'userpage?id=accounts&s=' + makeid()
									var history = false;

									if(!self.app.user.validate()){
										h = 'filluser'
										history = true
									}

									self.app.nav.api.load({
										open : true,
										href : h,
										history : history
									})
								});

								

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

					sitemessage('You have reached a maximum of 5 accounts. No more can be added ')

					return
				}

				self.app.nav.api.load({
					open : true,
					id : 'addaccount',
					inWnd : true,

					essenseData : {
						success : function(mnemonic){

							console.log("mnemonic", mnemonic)

							self.app.platform.sdk.pool.expand(pack, function(expandedPack){
								console.log("IMHERE", mnemonic)
								self.app.platform.sdk.pool.add(expandedPack, mnemonic, function(expandedPack, error){

									console.log("IMHERE", expandedPack)

									if (error){
										dialog({
											html : self.app.localization.e('aused'),
											class : "one"
										})
									}
									else
									{
										self.app.platform.sdk.pool.export(expandedPack, function(_pack){

											console.log("HERE")

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

			back : function(){
			
				el.dumpkey.html('')

				el.c.find('.dumpaddress').html('')

				el.c.removeClass('privatedump')
			}
		}

		var events = {

			dumpkey : function(){

				var address = $(this).closest('.addressTable').attr('address')

				dialog({
					html : "Do you really want to see your private key?",
					btn1text : "See Private Key",
					btn2text : "Cancel",

					class : 'zindex',

					success : function(){

						actions.dumpkey(address);

					}
				})
			},

			remove : function(){
				var address = $(this).closest('.addressTable').attr('address')

				dialog({
					html : "Do you really want to remove this address from this device?",
					btn1text : "Remove",
					btn2text : "Cancel",

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
				var qrcode = new QRCode(el[0], {
					text: c,
					width: 256,
					height: 256
				});
			},
			dumpkeyabout : function(){
				
			},
			dumpkey : function(address, private){


				var privateWif = '';

				el.c.addClass('privatedump')

				el.c.find('.dumpaddress').html(address)

				try{
					var keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(private, 'hex')) 

					privateWif = keyPair.toWIF().toString('hex')
				}
				catch(e){

				}

			
				
				self.shell({

					name :  'dumpkey',
					el :   el.dumpkey,

					data : {
						private : private,
						address : address,
						privateWif : privateWif
					},

					animation : 'fadeIn',

				}, function(p){
				
					renders.qrcode(p.el.find('.code'), private)

					p.el.find('.copyvalue').on('click', function(){

						var el = $(this).closest('.infotable').find('.value')


						copyText(el)
						sitemessage("Value was successfully copied")
					})
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
			el.c.find('.back').on('click', actions.back)
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