var searchusers = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, loadedcachedHeight = 0, loading = false, end = false, start = 0, count = 20, fixedblock = 0;

		var reports = {
			reputation : {
				name :  self.app.localization.e('reputation'),
				icon : '<i class="far fa-star"></i>',
				id : 'reputation',
				render : 'reputation',
				history : true,
			
				count : function(author){
					return deep(author, 'reputation') || 0 
				}
			},

			followers : {
				name : self.app.localization.e('followers2'),
				icon : '<i class="fas fa-users"></i>',
				id : 'followers',
				render : 'followers',
				history : true,
				
				count : function(author){
					return deep(author, 'subscribers_count') || 0
				}
			}
		}

		var actions = {
			loadmore : function(){
				loading = true

				self.app.platform.sdk.search.get(ed.value, 'users', start, count, fixedblock, function(d, fb){

					var data = d.data || []

					end = true //todo pagination

					/*if (data.length < count){
						end = true
					}*/


					if(ed.loaded) ed.loaded(data)

					renders.users(data, function(){
						fixedblock = fb

						loading = false
	
						start += data.length
					})

					

				}, null, true)
			},
			loadmorescroll : function(){

				if(!el.c) return

				if (ed.canloadmorescroll){
					if(!ed.canloadmorescroll()) return
				}


				if(!ed.horizontal){

					if (
						!loading && !end &&

						(self.app.lastScrollTop + self.app.height > document.body.scrollHeight - 2000) 

						&& loadedcachedHeight != cachedHeight
	
						) {

							loadedcachedHeight = cachedHeight

							actions.loadmore(function(s, e){
								if(e){
									loadedcachedHeight = 0
								}
							})

							setTimeout(function(){
								loadedcachedHeight = 0
							}, 5000)
	
					}
				}
				else{

					if (
						!loading &&  (!end && (recommend != 'recommend' || recommend != 'best')) &&
						(el.w.scrollLeft() + el.w.width() > el.c.find('.users').width() - 1000)

						) {

						actions.loadmore()
	
					}
				}	

				
			},
		}

		var events = {
			
		}

		var renders = {
			users : function(users, clbk){
				self.shell({
					name : 'users',
					data : {
						users, ed, reports
					},

					el : el.c.find('.usersWrapper')

				},
				function(p){

					if (clbk)
						clbk()
				})
			}
		}

		var make = function(){
			actions.loadmore()
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {
					ed
				};

				count = ed.count || 20

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};

				loadedcachedHeight = 0
				loading = false
				end = false
				start = 0
				count = 7
				fixedblock = 0

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				w = self.app.el.window

				el.w = ed.window || self.app.el.window;

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
	module.exports = searchusers;
}
else{

	app.modules.searchusers = {};
	app.modules.searchusers.module = searchusers;

}