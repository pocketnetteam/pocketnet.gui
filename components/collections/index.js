var collections = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author = {};

		var actions = {
			newcollection : function(){
				self.app.platform.sdk.collections.opennewcollectionwindow()
				/*self.nav.api.load({
					open : true,
					id : 'newcollection',
					inWnd : true,

					essenseData : {
						
					}
				})*/
			}
		}

		var events = {
			
		}

		var renders = {
			collectionsdata : function(items = []){
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
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

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
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				renders.collectionsdata()

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