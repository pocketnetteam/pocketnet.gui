var collections = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var mid = p.mid

		var primary = deep(p, 'history');

		var el, ed, author = {};

		var actions = {
			newcollection : function(){
				self.app.platform.sdk.collections.opennewcollectionwindow()
			},

			loadcollections : function(clbk){
				self.app.platform.sdk.collections.load.profile(author.address, (r) => {

					var collections = r.contents

					if(clbk) clbk(collections)
				}, ed.count)
			}
		}

		var events = {
			
		}

		var renders = {
			collectionsdata : function(items = [], clbk){
				self.shell({
					name :  'collectionsdata',
					el :   el.c.find('.collectionsdata'),
					data : {
						items : items,
					},
					insertimmediately : true,
				}, function(p){
					if(items.length){
						el.c.addClass('.hasitems')
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
			
			el.c.find('.newcollection').on('click', function(){
				actions.newcollection()
			})

			self.app.psdk.updatelisteners[mid] = self.app.platform.actionListeners[mid] = function({type, alias, status}){

				if(type == 'collection'){
					if (author.address == alias.actor){
						make()
					}
					
				}
				
			}
		}

		var make = function(clbk){

			actions.loadcollections(collections => {
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

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

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
	module.exports = collections;
}
else{

	app.modules.collections = {};
	app.modules.collections.module = collections;

}