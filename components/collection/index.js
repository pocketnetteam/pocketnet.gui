var collection = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var mid = p.mid

		var el, ed, collection, author = {}, externalLenta = null, notfound = false, materials = null;

		var actions = {
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

			remove : function(){
				if(!collection || !author.me || !collection.txid) return

				dialog({
					class: 'zindex',
					html: self.app.localization.e('removeCollectionDialog'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),
					success: function(){
						el.c.addClass('loading')

						self.app.platform.sdk.collections.delete(collection.txid, function(err){
							el.c.removeClass('loading')

							if(err) return

							self.nav.api.load({
								open : true,
								href : 'authorn?address=' + author.address,
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

				if(externalLenta){
					externalLenta.destroy()
					externalLenta = null
				}

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

					p.el.find('.editCollection').on('click', actions.edit)
					p.el.find('.deleteCollection').on('click', actions.remove)
					p.el.find('.shareCollection').on('click', actions.share)

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

				if(externalLenta){
					externalLenta.destroy()
					externalLenta = null
				}

				materials = null

				el.feed.html('')
				el.c.find('.collectionFeedEmpty').hide()

				renders.feed()
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
					return
				}

				self.app.platform.sdk.node.shares.getbyid(collection.contentIds, function(shares){

					if(!el.c) return

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

					if(!availableCount){
						el.c.find('.collectionFeedEmpty').show()
						return
					}

					el.c.find('.collectionFeedEmpty').hide()

					self.app.platform.papi.lenta(availableTxids, el.feed, (e, p) => {
						externalLenta = p
					}, {
						second : true,
						notscrollloading : true,
						openapi : ed.openapi || false,
						comments : ed.comments,
						fullscreenvideo : ed.fullscreenvideo
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
			}
		}

		var make = function(){
			if(notfound) return

			if(collection.deleted) return renders.removed()

			renders.header()
			renders.feed()
		}

		return {
			primary : primary,

			clearparameters : ['c', 's'],

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}

				var txid = ed.txid || parameters().c || parameters().s

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

			},

			destroy : function(){

				delete self.app.platform.actionListeners[mid]
				delete self.app.psdk.updatelisteners[mid]

				materials = null

				if(externalLenta){
					externalLenta.destroy()
					externalLenta = null
				}

				ed = {}
				collection = null
				author = {}
				notfound = false
				el = {}
			},

			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.feed = el.c.find('.collectionFeed')
				el.header = el.c.find('.collectionHeaderWrapper')

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
