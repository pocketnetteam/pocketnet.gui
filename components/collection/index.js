var collection = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, collection, author = {}, externalLenta = null, notfound = false;

		var actions = {
			edit : function(){
				if(!collection || !author.me) return

				self.app.platform.sdk.collections.opennewcollectionwindow(collection.alias())
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

		var renders = {
			feed : function(){
				if(!collection || !collection.contentIds || !collection.contentIds.length){
					el.c.find('.collectionFeedEmpty').show()
					return
				}

				self.app.platform.sdk.node.shares.getbyid(collection.contentIds, function(shares){

					if(!el.c) return

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
					var totalCount = collection.contentIds.length
					var missingCount = totalCount - availableCount

					el.c.find('.materialsCount').text(
						availableCount + ' ' + self.app.localization.e('collectionMaterials')
					)

					if(missingCount > 0){
						el.c.find('.materialsUnavailable').text(
							missingCount + ' / ' + totalCount + ' — ' + self.app.localization.e('collectionMaterialsUnavailable')
						).show()
					}
					else{
						el.c.find('.materialsUnavailable').hide()
					}

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
			el.c.find('.editCollection').on('click', function(){
				actions.edit()
			})

			el.c.find('.deleteCollection').on('click', function(){
				actions.remove()
			})

			el.c.find('.shareCollection').on('click', function(){
				actions.share()
			})
		}

		var make = function(){
			if(notfound) return

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
