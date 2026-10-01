var collections = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var mid = p.mid

		var primary = deep(p, 'history');

		var el, ed, author = {};

		var actions = {
			newcollection : function(){

				// on mobile the list window stays under the new collection window and shows up when it is minimized
				if (self.app.mobileview && !ed.preview && el.c && el.c.closest('.wnd').length){
					self.closeContainer()
				}

				self.app.platform.sdk.collections.opennewcollectionwindow()
			},

			loadcollections : function(clbk){
				var requestCount = ed.count

				if(ed.preview) requestCount = ed.count + 1

				self.app.platform.sdk.collections.load.profile(author.address, (r) => {

					var collections = r && r.contents ? r.contents : (_.isArray(r) ? r : [])

					// contentDelete that is still in progress is applied by psdk tempExtend
					collections = _.filter(collections, function(c){
						return c && !c.deleted
					})

					if(clbk) clbk(collections)
				}, requestCount)
			}
		}

		var events = {
			
		}

		var helpers = {

			// same states as temp shares in lenta: relay (not sent yet), temp (waiting for confirmation), rejected
			publishState : function(item){
				if (item.rejected) return 'rejected'
				if (item.relay) return 'relay'
				if (item.temp) return 'temp'

				return ''
			}
		}

		var renders = {
			collectionsdata : function(items = [], clbk){
				var displayItems = items
				var hasMore = false

				if(ed.preview){
					hasMore = items.length > ed.count
					displayItems = items.slice(0, ed.count)
				}

				self.shell({
					name :  'collectionsdata',
					el :   el.c.find('.collectionsdata'),
					data : {
						items : displayItems,
						publishState : helpers.publishState,
						me : author.me,
						preview : ed.preview,
					},
					insertimmediately : true,
				}, function(p){
					if(displayItems.length){
						el.c.addClass('hasitems')
						el.c.find('.headcount').text(displayItems.length)
					}
					else{
						el.c.removeClass('hasitems')
						el.c.find('.headcount').text('')
					}

					if(ed.preview){
						if(hasMore) el.c.addClass('hasmore')
						else el.c.removeClass('hasmore')

						var parent = el.c.closest('.collections')

						if(parent.length){
							if(displayItems.length || author.me){
								parent.addClass('active')
							}
							else{
								parent.removeClass('active')
							}
						}
					}

					if(clbk) clbk()
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
			
			el.c.on('click', '.newcollection', function(){
				actions.newcollection()
			})

			el.c.on('click', '.collection', function(){
				var txid = $(this).attr('collection')

				if(!txid) return

				// relay collection has no transaction yet, rejected one will never get it
				if ($(this).hasClass('relay') || $(this).hasClass('rejected')) return

				self.nav.api.load({
					open : true,
					href : 'collection?c=' + txid,
					history : true
				})
			})

			el.c.find('.showmore').on('click', function(){

				self.nav.api.load({

					open : true,
					id : 'collections',
					animation : false,
					inWnd: true,
					history: true,
					essenseData : {
						address : author.address,
						preview : false,
						count : 100
					},

					clbk : function(e, p){
					}

				})

			})

			self.app.psdk.updatelisteners[mid] = self.app.platform.actionListeners[mid] = function({type, alias, status}){

				if(type == 'collection'){
					if (author.address == alias.actor){
						make()
					}
				}

				if(type == 'contentDelete'){
					make()
				}
				
			}
		}

		var make = function(clbk){

			el.c.addClass('loading')

			actions.loadcollections(collections => {
				el.c.removeClass('loading')
				renders.collectionsdata(collections, clbk)
			})
			
		}

		return {
			primary : primary,

			id : mid,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				if(!ed.count) ed.count = 6

				if(ed.count > 100) ed.count = 100

				var data = {
					ed
				};

				author = {}

				author.address = ed.address

				self.sdk.users.get(author.address, function(){

					author.data = self.psdk.userInfo.get(author.address)
					author.me = self.app.user.isItMe(author.address)
					author.reputationBlocked = self.app.platform.sdk.user.reputationBlocked(author.address)

					data.author = author

					clbk(data);

				})

			},

			destroy : function(){
				ed = {}
				el = {};

				delete self.app.platform.actionListeners[mid]
				delete self.app.psdk.updatelisteners[mid]
			},
			
			init : function(p){

				console.log("HERE COLLECTIONS")

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				close : function(){
				},
				class : "userlistwindow normalizedmobile maxheight showbetter"
			},
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
	module.exports = collections;
}
else{

	app.modules.collections = {};
	app.modules.collections.module = collections;

}
