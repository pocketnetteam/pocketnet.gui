var collection = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var mid = p.mid

		var el, ed, collection, author = {}, externalLenta = null, notfound = false, materials = null;

		// last requested collection: a slow answer for the previous one is ignored
		var loadid = 0;

		// last feed: publications or lenta of a cleared feed (refeed, other collection, destroy) are not rendered
		var feedid = 0;

		var actions = {
			// another collection of the author is opened on the same page (url parameter changed)
			change : function(txid){
				if(!el.c) return

				helpers.clearfeed()

				el.c.addClass('loading')

				var request = ++loadid

				load(txid, function(data){

					if(!el.c || request != loadid) return

					self.shell({
						name : 'index',
						el : el.c,
						inner : replaceWith,
						insertimmediately : true,
						data : data
					}, function(){
						helpers.setel()

						make()
					})
				})
			},

			// preview card embedded in an article
			openpage : function(){
				if(!collection || !collection.txid) return

				self.nav.api.load({
					open : true,
					href : 'collection?c=' + collection.txid,
					history : true
				})
			},

			open : function(txid){
				self.nav.api.load({
					open : true,
					href : 'collection?c=' + txid,
					history : true,
					handler : true
				})
			},

			edit : function(){
				if(!collection || !author.me) return

				if(helpers.editState() == 'editing') return

				self.app.platform.sdk.collections.opennewcollectionwindow(collection.txid)
			},

			// collection changed by actions (edit sent, confirmed or rejected): take it from psdk with temp edits applied
			refresh : function(){
				if(!collection || !el.c) return

				var updated = self.psdk.collection.get(collection.txid)

				if(!updated) return

				// delete is applied by psdk tempExtend while the contentDelete action is pending
				if(updated.deleted){
					collection = updated

					renders.removed()

					return
				}

				var feedChanged = (updated.contentIds || []).join(',') != (collection.contentIds || []).join(',')

				collection = updated

				renders.header()

				if(feedChanged) renders.refeed()
			},

			share : function(){
				if(!collection || !collection.txid) return

				var url = 'https://' + self.app.options.url + '/collection?c=' + collection.txid

				self.nav.api.load({
					open : true,
					href : 'socialshare2',
					history : true,
					inWnd : true,
					essenseData : {
						url : url,
						caption : collection.caption || self.app.localization.e('e13133'),
						sharing : collection.social(self.app),
						embedding : {
							type : 'collection',
							id : collection.txid
						}
					}
				})
			},

			// jury: full collection with publications in a window, id goes through essenseData, not the url
			openwindow : function(){
				if(!collection || !collection.txid) return

				self.nav.api.load({
					open : true,
					id : 'collection',
					inWnd : true,
					history : true,
					essenseData : {
						txid : collection.txid
					}
				})
			},

			complain : function(){
				if(!collection || author.me || !collection.txid) return

				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,
					essenseData : {
						item : 'collection',
						obj : collection,

						success : function(){

						}
					}
				})
			},

			remove : function(){
				if(!collection || !author.me || !collection.txid) return

				// module may be destroyed before delete finishes: keep what is needed for redirect
				var txid = collection.txid
				var address = author.address

				dialog({
					class: 'zindex',
					html: self.app.localization.e('removeCollectionDialog'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),
					success: function(){
						if(el.c) el.c.addClass('loading')

						self.app.platform.sdk.collections.delete(txid, function(err){
							if(!el.c) return

							el.c.removeClass('loading')

							if(err) return

							self.nav.api.load({
								open : true,
								href : self.app.platform.api.authorlink(address),
								history : true,
								reload : true
							})
						})
					}
				})
			}
		}

		var events = {

		}

		var helpers = {
			setel : function(){
				el.c = el.container.find('#' + self.map.id)
				el.feed = el.c.find('.collectionFeed')
				el.header = el.c.find('.collectionHeaderWrapper')
				el.authorcollections = el.c.find('.authorCollectionsWrapper')
			},

			// clearessense destroys the lenta and removes it from the lenta module essenses
			destroyfeed : function(lenta){
				if(!lenta) return

				if(lenta.clearessense) lenta.clearessense()
				else if(lenta.destroy) lenta.destroy()
			},

			clearfeed : function(){
				feedid++

				helpers.destroyfeed(externalLenta)
				externalLenta = null

				materials = null
			},

			// list of the author collections is shown only on the page (collection from the url)
			showauthorcollections : function(){
				return !ed.txid && !ed.openapi && !ed.jury && !ed.preview
			},

			// author collections are under the feed: shown when the feed is rendered, otherwise the list jumps down
			feedready : function(){
				if(el.authorcollections) el.authorcollections.removeClass('waitfeed')
			},

			publishState : function(item){
				if (item.rejected) return 'rejected'
				if (item.relay) return 'relay'
				if (item.temp) return 'temp'

				return ''
			},

			// same states as temp shares in lenta: edit is not sent yet (relay) or waits for confirmation (temp)
			editState : function(){
				if(!collection || !collection.edit) return ''

				if(collection.rejected) return 'rejected'

				if(collection.relay || collection.temp) return 'editing'

				return ''
			}
		}

		var renders = {
			removed : function(){

				if(!el.c) return

				helpers.clearfeed()

				self.shell({
					name : 'removed',
					el : el.c.find('.collectionWrapper'),
					inner : html,
					insertimmediately : true,
					data : {
						author : author
					}
				}, function(){})
			},

			header : function(clbk){

				if(!el.c || !collection) return

				self.shell({
					name : 'header',
					el : el.header,
					insertimmediately : true,
					data : {
						collection : collection,
						author : author,
						ed : ed,
						editState : helpers.editState()
					}
				}, function(p){

					lightCircles(p.el.find('.bokehField')[0])

					p.el.find('.editCollection').on('click', actions.edit)
					p.el.find('.deleteCollection').on('click', actions.remove)
					p.el.find('.shareCollection').on('click', actions.share)
					p.el.find('.complainCollection').on('click', actions.complain)
					p.el.find('.openCollection').on('click', actions.openwindow)

					if(ed.preview && ed.openonclick){
						p.el.find('.collectionHeader').addClass('openonclick').on('click', function(e){
							// author link opens the author
							if($(e.target).closest('a').length) return

							actions.openpage()
						})
					}

					renders.materials()
					renders.authoricon()

					if(clbk) clbk()
				})
			},

			materials : function(){

				if(!el.c || !materials) return

				el.c.find('.materialsCount').text(
					materials.available + ' ' + self.app.localization.e('collectionMaterials')
				)

				var missing = materials.total - materials.available

				if(missing > 0){
					el.c.find('.materialsUnavailable').text(
						missing + ' / ' + materials.total + ' — ' + self.app.localization.e('collectionMaterialsUnavailable')
					).show()
				}
				else{
					el.c.find('.materialsUnavailable').hide()
				}
			},

			refeed : function(){

				helpers.clearfeed()

				el.feed.html('')
				el.c.find('.collectionFeedEmpty').hide()

				renders.feed()
			},

			// horizontal list of all author collections for a quick switch, current one is centered
			authorcollections : function(){

				if(!el.c || !collection || !helpers.showauthorcollections()) return

				var address = author.address
				var txid = collection.txid

				self.app.platform.sdk.collections.load.profile(address, function(r){

					if(!el.c || !collection || collection.txid != txid) return

					var items = _.filter(r && r.contents ? r.contents : [], function(c){
						return c && !c.deleted
					})

					if(items.length < 2){
						el.authorcollections.html('')

						return
					}

					self.shell({
						name : 'authorcollections',
						el : el.authorcollections,
						insertimmediately : true,
						data : {
							items : items,
							current : txid,
							publishState : helpers.publishState
						}
					}, function(p){

						p.el.find('.authorCollection').on('click', function(){
							var t = $(this)

							if (t.hasClass('current') || t.hasClass('relay') || t.hasClass('rejected')) return

							actions.open(t.attr('collection'))
						})

						var scroll = p.el.find('.authorCollectionsScroll')[0]
						var current = p.el.find('.authorCollection.current')[0]

						if(scroll && current){
							scroll.scrollLeft = current.offsetLeft - (scroll.clientWidth - current.offsetWidth) / 2
						}
					})

				}, 100)
			},

			// user info may get its image only after the feed loads users
			authoricon : function(){

				if(!el.c) return

				var icon = el.c.find('.authorLink .usericon')

				if(!icon.find('.letter, .fa-user').length) return

				var image = self.psdk.userInfo.getShortForm(author.address).image

				if(!image) return

				icon.html('').attr('image', image).removeAttr('imageloaded')

				bgImagesCl(el.c.find('.authorLink'))
			},

			feed : function(){
				if(!collection || !collection.contentIds || !collection.contentIds.length){
					el.c.find('.collectionFeedEmpty').show()
					helpers.feedready()
					return
				}

				// another collection may be opened meanwhile: its list waits for its own feed
				var request = loadid

				var feedready = _.once(function(){
					if(request == loadid) helpers.feedready()
				})

				// lenta may fail without render callback
				setTimeout(feedready, 5000)

				var feedrequest = feedid

				self.app.platform.sdk.node.shares.getbyid(collection.contentIds, function(shares){

					if(!el.c || feedrequest != feedid) return

					renders.authoricon()

					var availableMap = {}

					_.each(shares || [], function(s){
						if(s && s.txid && !s.deleted && s.address){
							availableMap[s.txid] = true
						}
					})

					var availableTxids = _.filter(collection.contentIds, function(txid){
						return availableMap[txid]
					})

					var availableCount = availableTxids.length

					materials = {
						available : availableCount,
						total : collection.contentIds.length
					}

					renders.materials()

					// deleted and unavailable publications are filtered above; nothing left: empty state, the lenta is not created
					if(!availableCount){
						el.c.find('.collectionFeedEmpty').show()
						feedready()
						return
					}

					el.c.find('.collectionFeedEmpty').hide()

					self.app.platform.papi.lenta(availableTxids, el.feed, (e, p) => {

						// the feed was cleared while the lenta was loading
						if(!el.c || feedrequest != feedid){
							helpers.destroyfeed(p)

							return
						}

						externalLenta = p
					}, {
						second : true,
						notscrollloading : true,
						openapi : ed.openapi || false,
						comments : ed.comments,
						fullscreenvideo : ed.fullscreenvideo,
						renderClbk : feedready
					})
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

			self.app.psdk.updatelisteners[mid] = self.app.platform.actionListeners[mid] = function({type, alias}){

				if(!alias || !collection) return

				// an edit action has txid of the edited collection
				if(type == 'collection' && alias.txid == collection.txid) actions.refresh()

				if(type == 'contentDelete' && alias.txidEdit == collection.txid) actions.refresh()

				// own collection created, changed or removed: the list of the author collections is changed
				if((type == 'collection' || type == 'contentDelete') && alias.actor == author.address) renders.authorcollections()
			}
		}

		var make = function(){
			if(notfound) return

			if(collection.deleted) return renders.removed()

			renders.header()

			// jury checks only the collection itself (caption, description, cover), chat preview shows only the header
			if(ed.jury || ed.preview) return

			renders.feed()
			renders.authorcollections()
		}

		var load = function(txid, clbk){

			collection = null
			notfound = false
			author = {}

			if(!txid){
				notfound = true

				clbk({
					ed,
					notfound : true
				})

				return
			}

			self.app.platform.sdk.collections.load.byid(txid, function(_collection, error){

				if(error || !_collection){
					notfound = true

					clbk({
						ed,
						notfound : true
					})

					return
				}

				collection = _collection

				author.address = collection.address

				self.sdk.users.get(author.address, function(){

					author.data = self.psdk.userInfo.get(author.address)
					author.me = self.app.user.isItMe(author.address)

					clbk({
						ed,
						collection,
						author,
						notfound : false
					})

				})

			}, ed.refresh)
		}

		return {
			primary : primary,

			clearparameters : ['c', 's'],

			// same page, other collection in the url (author collections list, back / forward)
			parametersHandler : function(clbk){

				if(ed && !ed.txid){

					var txid = parameters().c || parameters().s

					if(txid && (!collection || collection.txid != txid)) actions.change(txid)
				}

				if(clbk) clbk()
			},

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}

				load(ed.txid || parameters().c || parameters().s, clbk)

			},

			destroy : function(){

				delete self.app.platform.actionListeners[mid]
				delete self.app.psdk.updatelisteners[mid]

				helpers.clearfeed()

				loadid++

				ed = {}
				collection = null
				author = {}
				notfound = false
				el = {}
			},

			init : function(p){

				state.load();

				el = {};
				el.container = p.el

				helpers.setel()

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				showbetter : true,
				class : 'withoutButtons collectionwindow nobfilter normalizedmobile maxheight'
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
	module.exports = collection;
}
else{

	app.modules.collection = {};
	app.modules.collection.module = collection;

}
