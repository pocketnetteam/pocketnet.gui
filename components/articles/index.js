var articles = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {
			add : function(){


				self.nav.api.load({
					open : true,
					href : 'article?aid=' + makeid(),
					inWnd : true,

					history : true,

					essenseData : {
						save : function(art){

							self.app.platform.sdk.articles.storage || (self.app.platform.sdk.articles.storage = [])
								
							var f = _.find(self.app.platform.sdk.articles.storage, function(a){
								if(art.id == a.id) return true
							})

							if(!f){
								self.app.platform.sdk.articles.storage.unshift(art)
							}

							self.app.platform.sdk.articles.save()

						},

						close : function(){
							renders.articles();
						},

						complete : function(){
							self.closeContainer()
						},
						closeContainer : function(){
							self.closeContainer()
						}
					}
				})
			},
			edit : function(art){
				self.nav.api.load({
					open : true,
					href : 'article?aid=' + art.id,
					inWnd : true,

					history : true,

					essenseData : {
						art : art,
						save : function(art){

							self.app.platform.sdk.articles.save()

						},

						close : function(){
							renders.articles();
						},
						complete : function(){
							self.closeContainer()
						},
						closeContainer : function(){
							self.closeContainer()
						}
					}
				})
			},

			remove : function(id){


				removeEqual(self.app.platform.sdk.articles.storage, {
					id : id
				})

				el.c.find('.art[art="'+id+'"]').remove()

				self.app.platform.sdk.articles.save()

				renders.ini()
			}
		}

		var events = {
			remove : function(){
				var id = $(this).closest('.art').attr('art');

				dialog({
					html : self.app.localization.e('e13018'),

					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),

					class : 'zindex',

					success : function(){
						actions.remove(id)
					}
				})
			},
			add : function(){
				actions.add()
			},
			edit : function(){
				var id = $(this).closest('.art').attr('art');

				var art = _.find(self.app.platform.sdk.articles.storage, function(a){
					return a.id == id
				})

				actions.edit(art)
			},

			authorclose : function(){

				self.nav.api.load({
					open : true,
					href : 'author?address=' + self.app.user.address.value.toString('hex'),
					history : true,
				})

				self.closeContainer();
			}
		}

		var renders = {
			ini : function(){
				if(self.app.platform.sdk.articles.storage.length){
					el.c.removeClass('initial')
				}
				else
				{
					el.c.addClass('initial')
				}
			},
			articles : function(){

				renders.ini()

				self.shell({
					name :  'articles',
					el : el.articles.find('.artwrapper'),
					data : {
						articles : self.app.platform.sdk.articles.storage
					},

				}, function(p){
					p.el.find('.artcnt').on('click', events.edit)
					p.el.find('.remove').on('click', events.remove)
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
			
			el.add.on('click', events.add)

			el.c.find('.top').on('click', events.authorclose)

		}


		var make = function(){
			renders.articles();
		}

		return {
			primary : primary,

			auto : function(){
				var _p = parameters();

				var art = null;

				if (_p.marticle && !self.app.nav.wnds['article']){
					if (_p.aid) 
						art = _.find(self.app.platform.sdk.articles.storage, function(a){
						return a.id == _p.aid
					})

					if (art){
						actions.edit(art)
					}
					else
					{
						actions.add()
					}
				}

				
			},

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.articles = el.c.find('.articles');
				el.add = el.c.find('.add');

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				class : "allscreen a100 article "
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = articles;
}
else{

	app.modules.articles = {};
	app.modules.articles.module = articles;

}