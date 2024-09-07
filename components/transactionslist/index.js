var transactionslist = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, page = 0, end = false, loading = false, block = 0, pagesize = 20, addresses, scnt;

		var helpers = {
			getvoutaddress : function(vout){
				return deep(vout,'scriptPubKey.addresses.0') || null
			}
		}

		var actions = {
			transactionsToTable : function(transactions){
				return _.map(transactions, (transaction) => {
					var r = {
						txid : transaction.txid,
						date : moment.utc(transaction.nTime * 1000)
					}

					var fromme = _.find(transaction.vin, (input) => {
						return _.find(addresses, (a) => {return a == input.address})
					})

					var forme = false
					var valueouts = []

					if(!fromme){
						valueouts = _.filter(transaction.vout, (out) => {
							var va = helpers.getvoutaddress(out)

							return _.find(addresses, (a) => {return a == va})
						})

						if(valueouts.length) forme = true
					}

					else{
						valueouts = _.filter(transaction.vout, (out) => {
							var va = helpers.getvoutaddress(out)

							return !_.find(addresses, (a) => {return a == va})
						})

						if(!valueouts.length) forme = true

					}

					var direction = 'change'

					if (fromme && !forme) direction = 'out'
					if (!fromme && forme) direction = 'in'

					var amount = _.reduce(valueouts, (m, out) => {
						return m + out.value
					}, 0)

					r.direction = direction
					r.amount = amount

					return r
				})
			},
			gettransactions : function(){

				loading = true

				return self.app.platform.psdk.transaction.loadAddressesList({
					addresses : addresses,
					block, 
					page,
					pagesize
				}).catch(e => {
					end = true


					return Promise.reject(e)
				}).then((r) => {

					console.log("Result" , r)

					if(r.length < pagesize) end = true

					return Promise.resolve(actions.transactionsToTable(r))

				}).finally(() => {
					loading = false
				})
			},

			makepage : function(clbk){

				console.log('makepage', page)

				if(loading) return
				if(end) return

				renders.loading()

				actions.gettransactions().then((r) => {
					page++
					renders.list(r)
				}).catch(e => {
					renders.error(e)
				}).finally(() => {
					renders.loading()
					if(clbk) clbk()
				})
			}
		}

		var events = {
			opentransaction : function(txid){
				app.nav.api.load({
					open : true,
					id : 'transactionview',
					inWnd : true,
	
					essenseData : {
						txid,
						share : true,
					}
				})
			},

			loadmorescroll: function () {
				let end = scnt ? scnt[0].offsetHeight + scnt[0].scrollTop >= scnt[0].scrollHeight - 500 : false;

				if (end && !loading) {
					actions.makepage()
				}
			},
		}

		var renders = {
			loading : function(){
				if(loading){
					el.c.addClass('loading')
				}
				else{
					el.c.removeClass('loading')

				}
			},
			list : function(transactions){
				console.log('result 2', transactions)
				self.shell({

					name: 'list',
					el: el.list,
					inner: append,
					data: {
						transactions
					},

				}, function (_p) {


				})
			},

			error : function(error){
				self.shell({

					name: 'error',
					el: el.list,
					inner: append,
					data: {
						error
					},

				}, function (_p) {


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
			
			el.c.on('click', '.txtable', function(){
				var txid = $(this).attr('txid')

				events.opentransaction(txid)
			})

			if (scnt.hasClass('applicationhtml')) {
				self.app.events.scroll['transactionslist'] = events.loadmorescroll
			}
			else {
				scnt.on('scroll', events.loadmorescroll)
			}

		}

		var make = function(){

			actions.makepage(() => {
				initEvents()
			})

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				addresses = ed.addresses || [self.app.user.address.value]

				page = 0

				block = self.app.platform.currentBlock || 0

				end = false

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};

				scnt.off('scroll', events.loadmorescroll)
				delete self.app.events.scroll['transactionslist']
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.list = el.c.find('.listwrapper')

				scnt = el.c.closest('.customscroll:not(body)')
				
				if (!scnt.length) scnt = self.app.el.window;

				make()

				p.clbk(null, p);
			},
			wnd : {
				showbetter : true,
			
				class: 'transactionlistwnd normalizedmobile withoutButtons',
				
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
	module.exports = transactionslist;
}
else{

	app.modules.transactionslist = {};
	app.modules.transactionslist.module = transactionslist;

}