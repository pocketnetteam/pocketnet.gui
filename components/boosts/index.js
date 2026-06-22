var boosts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, scnt;
		var address = '';
		var direction = 'both';
		var count = 20;
		var offset = 0;
		var topHeight = 0;
		var height = 0;
		var loading = false;
		var end = false;
		var totals = {};
		var items = [];
		var requestid = 0;

		var helpers = {
			totalCount : function(){
				if(direction == 'sent') return totals.sent || 0;
				if(direction == 'received') return totals.received || 0;

				return (totals.sent || 0) + (totals.received || 0)
			},

			collectAddresses : function(){
				var addresses = []

				_.each(items, function(item){
					if(item.boostAddress) addresses.push(item.boostAddress)
					if(item.contentAddress) addresses.push(item.contentAddress)
				})

				return _.uniq(addresses)
			},

			addressName : function(address, fallback){
				if(!address) return fallback || '---'

				var info = self.psdk.userInfo.getShortForm(address) || {}
				var name = info.name ? self.app.platform.api.clearname(info.name, true) : ''

				return name || fallback || helpers.shortid(address)
			},

			shortid : function(value){
				if(!value) return '';

				if(value.length <= 18) return value;

				return value.substr(0, 8) + '...' + value.substr(value.length - 8)
			},

			directionLabel : function(value){
				return self.app.localization.e(value == 'sent' ? 'boosts_sent_badge' : 'boosts_received_badge')
			},

			prepare : function(item){
				var boostAddressShort = helpers.shortid(item.boostAddress)
				var contentAddressShort = helpers.shortid(item.contentAddress)
				var boosterIsMe = item.direction == 'sent'
				var authorIsMe = item.direction == 'received'

				return _.extend({}, item, {
					date : item.time ? moment.utc(item.time * 1000).format('YYYY-MM-DD, HH:mm') : '',
					directionLabel : helpers.directionLabel(item.direction),
					txidShort : helpers.shortid(item.txid),
					contentTxidShort : helpers.shortid(item.contentTxid),
					boostAddressShort : boostAddressShort,
					contentAddressShort : contentAddressShort,
					boosterIsMe : boosterIsMe,
					authorIsMe : authorIsMe,
					boostAddressName : helpers.addressName(item.boostAddress, boostAddressShort),
					contentAddressName : helpers.addressName(item.contentAddress, contentAddressShort),
					contentLink : item.contentTxid ? ('https://' + self.app.options.url + '/post?s=' + item.contentTxid) : ''
				})
			}
		}

		var actions = {
			reset : function(nextDirection){
				requestid++;
				direction = nextDirection || direction || 'both';
				offset = 0;
				height = 0;
				topHeight = 0;
				loading = false;
				end = false;
				totals = {};
				items = [];

				renders.summary()
				renders.filters()
				if(el && el.list) el.list.html('')
				renders.footer()
				actions.load()
			},

			load : function(){
				if(loading || end) return Promise.resolve();

				var currentRequestid = requestid;

				loading = true;
				renders.loading();

				return self.app.platform.sdk.node.transactions.getboostsbyaddress({
					address : address,
					topHeight : topHeight,
					direction : direction,
					count : count,
					offset : offset
				}, offset == 0).then(function(result){

					if(currentRequestid != requestid) return;

					result || (result = {})

					height = result.height || height;
					if(result.height && !topHeight) topHeight = result.height;
					totals = result.totals || {};

					var nextItems = result.boosts || [];
					items = items.concat(nextItems);
					offset = offset + nextItems.length;

					if(nextItems.length < count || offset >= helpers.totalCount()){
						end = true;
					}

					renders.all();

				}).catch(function(e){
					if(currentRequestid != requestid) return;

					end = true;
					renders.error(e);
				}).finally(function(){
					if(currentRequestid != requestid) return;

					loading = false;
					renders.loading();
				})
			}
		}

		var events = {
			changeDirection : function(){
				var nextDirection = $(this).attr('direction');

				if(nextDirection && nextDirection != direction){
					actions.reset(nextDirection)
				}
			},

			loadmore : function(){
				actions.load()
			},

			opentransaction : function(e){
				var txid = $(this).attr('txid');

				if(!txid) return;

				self.app.nav.api.load({
					open : true,
					id : 'transactionview',
					inWnd : true,

					essenseData : {
						txid : txid,
						share : true
					}
				})

				e.stopPropagation()
				return false
			},

			opencontent : function(e){
				var txid = $(this).attr('txid');

				if(!txid) return;

				self.app.nav.api.load({
					open : true,
					href : 'post?s=' + txid,
					history : true,
					inWnd : true
				})

				e.stopPropagation()
				return false
			},

			copytransaction : function(e){
				var txid = $(this).attr('txid');

				if(!txid) return;

				copycleartext(txid)
				sitemessage(self.app.localization.e('boosts_txcopied'))

				e.stopPropagation()
				return false
			},

			copycontentlink : function(e){
				var link = $(this).attr('link');

				if(!link) return;

				copycleartext(link)
				sitemessage(self.app.localization.e('urlsuccesscopied'))

				e.stopPropagation()
				return false
			},

			toblockexplorer : function(e){
				var type = $(this).attr('type') || 'transaction';
				var id = $(this).attr('txid');

				if(!id) return;

				self.app.apps.openInWndById('app.pocketnet.blockexplorer', function(){}, hexEncode(type + '/' + id))

				e.stopPropagation()
				return false
			},

			loadmorescroll : function(){
				var nearEnd = scnt && scnt[0] ? scnt[0].offsetHeight + scnt[0].scrollTop >= scnt[0].scrollHeight - 500 : false;

				if(nearEnd && !loading && !end){
					actions.load()
				}
			}
		}

		var renders = {
			all : function(){
				renders.summary();
				renders.filters();
				renders.list();
				renders.footer();
			},

			loading : function(){
				if(!el || !el.c) return;

				if(loading) el.c.addClass('loading');
				else el.c.removeClass('loading');
			},

			filters : function(){
				if(!el || !el.filters) return;

				el.filters.find('.boostDirection').removeClass('active');
				el.filters.find('.boostDirection[direction="' + direction + '"]').addClass('active');
			},

			summary : function(){
				if(!el || !el.summary) return;

				self.shell({
					name : 'summary',
					el : el.summary,
					data : {
						totals : totals,
						height : height
					}
				}, function(){})
			},

			list : function(){
				if(!el || !el.list) return;

				var renderList = function(){
					var prepared = _.map(items, helpers.prepare);

					self.shell({
						name : prepared.length ? 'list' : 'empty',
						el : el.list,
						data : {
							boosts : prepared
						}
					}, function(){})
				}

				var addresses = helpers.collectAddresses()

				if(!addresses.length){
					renderList()
					return
				}

				self.sdk.users.get(addresses, function(){
					renderList()
				}, true)
			},

			footer : function(){
				if(!el || !el.footer) return;

				if(!items.length || end){
					el.footer.html('');
					return;
				}

				self.shell({
					name : 'footer',
					el : el.footer,
					data : {}
				}, function(_p){
					_p.el.find('.loadmore').on('click', events.loadmore)
				})
			},

			error : function(error){
				if(!el || !el.list) return;

				self.shell({
					name : 'error',
					el : el.list,
					data : {
						error : error
					}
				}, function(){})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){

			}
		}

		var initEvents = function(){
			el.c.on('click', '.boostDirection', events.changeDirection);
			el.c.on('click', '.boostTransaction', events.opentransaction);
			el.c.on('click', '.boostContent', events.opencontent);
			el.c.on('click', '.copyBoostTx', events.copytransaction);
			el.c.on('click', '.copyBoostContentLink', events.copycontentlink);
			el.c.on('click', '.toblockexplorer', events.toblockexplorer);

			if (scnt.hasClass('applicationhtml')) {
				self.app.events.scroll['boosts'] = events.loadmorescroll
			}
			else {
				scnt.on('scroll', events.loadmorescroll)
			}
		}

		var make = function(){
			renders.all();
			actions.load();
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {};

				address = ed.address || self.app.user.address.value;
				direction = ed.direction || parameters().direction || 'both';
				count = ed.count || 20;
				topHeight = Number(ed.topHeight || 0);
				offset = 0;
				end = false;
				items = [];
				totals = {};

				var data = {
					ed : ed,
					direction : direction,
					address : address
				};

				clbk(data);

			},

			destroy : function(){
				if(scnt){
					scnt.off('scroll', events.loadmorescroll)
				}

				delete self.app.events.scroll['boosts']

				ed = {}
				el = {};
			},

			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.summary = el.c.find('.boostsSummary');
				el.filters = el.c.find('.boostsFilters');
				el.list = el.c.find('.boostsList');
				el.footer = el.c.find('.boostsFooter');

				scnt = el.c.closest('.customscroll:not(body)')
				if (!scnt.length) scnt = self.app.el.window;

				initEvents();
				make();

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

			window.rifticker.add(function(){
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = boosts;
}
else{

	app.modules.boosts = {};
	app.modules.boosts.module = boosts;

}
