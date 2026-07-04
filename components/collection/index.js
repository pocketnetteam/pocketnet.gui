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

				self.app.platform.papi.lenta(collection.contentIds, el.feed, (e, p) => {
					externalLenta = p
				}, {
					second : true,
					notscrollloading : true,
					openapi : ed.openapi || false
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
