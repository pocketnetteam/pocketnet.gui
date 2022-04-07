var transactionview = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, txid, tx = {};

		var types = {
			'7570766f74655368617265': 'Score to Post',
			'636f6d706c61696e5368617265': 'Complain',
			'7368617265': 'Post',
			'736861726565646974': 'Post Edit',
			'737562736372696265': 'Subscribe',
			'73756273637269626550726976617465': 'Subscribe Private',
			'756e737562736372696265': 'Unsubscribe',
			'75736572496e666f': 'User',
			'626c6f636b696e67': 'Blocking',
			'756e626c6f636b696e67': 'Unblocking',
			'636f6d6d656e74': 'Comment',
			'636f6d6d656e7445646974': 'Comment Edit',
			'636f6d6d656e7444656c657465': 'Comment Delete',
			'6353636f7265': 'Score to Comment'
		}

		var actions = {
			type : function(tx){

				return ''

				if(!tx) return ''

				console.log("tx.vout[0].scriptPubKey", tx)
			
				var asm = tx.vout[0].scriptPubKey.asm.split(' ');

				if (asm.length < 2) { return '';} 

				return types[asm[1]] || ""

			},

			iaddress : function(input){
				return input.address
				return self.app.platform.sdk.node.transactions.addressFromScryptSig(deep(input, 'scriptSig.asm'))
			},

			oaddress : function(output){
				return deep(output, 'scriptPubKey.addresses.0')
			},

			alladdresses : function(){
				var addresses = {
					inputs : [],
					outputs : [],
					another : []
				}

				_.each(tx.vin, function(i){
					var a = actions.iaddress(i)

					if(a) addresses.inputs.push(a)
				})

				_.each(tx.vout, function(o){
					var a = actions.oaddress(o)

					if(a) {
						addresses.outputs.push(a)

						if(_.indexOf(addresses.inputs, a) == -1) addresses.another.push(a)
					}
				})

				return addresses
			},

			usersinfo : function(clbk){
				var addresses = actions.alladdresses()

				self.app.platform.sdk.users.get([].concat(addresses.inputs, addresses.outputs), function(){
					clbk()
				})
			}
		}

		var events = {
			
		}

		var renders = {
			addresses : function(el){
				var els = el.find('[address]')

				els.each(function(){
					renders.address($(this), $(this).attr('address'))
				})
			},
			address : function(el, address){
				self.shell({
					inner : html,
					name : 'address',
					data : {
						address : address,
					},
					el : el
				},
				function(p){
					
				})
			},
			inputs : function(){

				var inputs = _.uniq(tx.vin || [], function(input){
					return actions.iaddress(input)
				})

				self.shell({
					inner : html,
					name : 'inputs',
					data : {
						tx : tx,
						inputs : inputs,
						actions : actions
					},

					el : el.c.find('.inputs')

				},
				function(p){
					renders.addresses(p.el)
				})
			},
			outputs : function(){

				var adresses = actions.alladdresses()

				var outputs = _.filter(tx.vout || [], function(v){
					return v.value
				})

				self.shell({
					inner : html,
					name : 'outputs',
					data : {
						tx : tx,
						actions : actions,
						outputs : outputs,
						adresses : adresses
					},

					el : el.c.find('.outputs')

				},
				function(p){
					renders.addresses(p.el)
				})
			},

			tx : function(clbk){

				var type = null

				if (tx) 
					type = actions.type(tx)

				self.shell({
					inner : html,
					name : 'tx',
					data : {
						tx : tx,
						type
					},
					el : el.c.find('.txcnt')
				},
				function(p){

					p.el.find('.remake').on('click', function(){
						make()
					})

					p.el.find('.copytext').on('click', function(){
						copyText($(this))
		
						sitemessage(self.app.localization.e('successcopied'))
					})

					if(clbk) clbk()
					
				})
			}
		}

		var make = function(){

			self.app.platform.sdk.node.transactions.get.tx(txid, function(_tx){

				if(_.isArray(_tx) && _tx.length) _tx = _tx[0]

				tx = _tx

				if(!tx){
					renders.tx()
				}
				else{
					actions.usersinfo(function(){
						renders.tx(function(){
							renders.inputs()
							renders.outputs()
						})
					})
				}

				

			})
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

				txid = (p.settings.essenseData || {}).txid || parameters().txid

				if(!txid){

					self.nav.api.load({
						open : true,
						href : 'page404',
						history : true
					})

					return
				}

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
	module.exports = transactionview;
}
else{

	app.modules.transactionview = {};
	app.modules.transactionview.module = transactionview;

}