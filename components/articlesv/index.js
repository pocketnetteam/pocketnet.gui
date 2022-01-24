var articlesv = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {
			get : function(){

				var articles = self.app.platform.sdk.articles.getlist()

				articles = _.filter(articles, function(a){
					return !a.txid
				})

				return articles
			},
			create : function(){
				ed.create ? ed.create() : self.nav.api.go({
					href : 'articlev',
					history : true,
					open : true
				})	
			},
			edit : function(article){
				if (article){

					if(ed.select){
						if(!ed.select(article)) return
					}
					else{

						self.nav.api.go({
							href : 'articlev?art=' + article.id,
							history : true,
							open : true
						})	
						
					}

				}

				self.closeContainer()
			},

			

			delete : function(article){

				var d = dialog({
					html:  self.app.localization.e('deletedraftquestion'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),
		
					success: function () {
						if(ed.current && ed.current == article.id) actions.create()

						self.app.platform.sdk.articles.deletebyid(article.id)

						renders.articles()
					},
		
					fail: function () {

					},
	
					class : 'zindex'
				})

			},

			preview : function(article){

				var share = self.app.platform.sdk.articles.share(article)

				var alias = share.alias()

					alias.address = self.app.user.address.value

				self.app.platform.papi.postpreview(alias, null, function(){

				}, {
					inWnd : true
				})


			}
		}

		var events = {
			
		}

		var renders = {
			menu : function(el, article){

				var d = {
					article
				}

				self.fastTemplate('metmenu', (rendered, template) => {

					self.app.platform.api.tooltip(el, function(){

						return template(d);

					}, function(el, f, close){

						el.find('.edit').on('click', function(){
							actions.edit(article)

							close()
						})

						el.find('.delete').on('click', function(){
							actions.delete(article)
							
							close()
						})

						el.find('.preview').on('click', function(){
							actions.preview(article)

							close()
						})

					})

				}, d)
		  
				
			},
			articles : function(){
				self.shell({

					animation : false,
					name : 'articles',
					data : {
						articles : actions.get(),
						current : ed.current
					},
					el : el.articles

				},
				function(p){

					var getart = function(t){
						return self.app.platform.sdk.articles.getbyid(
							$(t).closest('.article').attr('art')
						)
					}

					p.el.find('.openart').on('click', function(){

						var article = getart(this)

						actions.edit(article)
						
					})


					p.el.find('.menupanel').on('click', function(){
						var article = getart(this)

						renders.menu($(this), article)
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
			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				ed = deep(p, 'settings.essenseData') || {}

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.articles = el.c.find('.articles')

				initEvents();

				renders.articles()

				p.clbk(null, p);
			},
			wnd : {
				class : 'wndarticles normalizedmobile',
				header : "drafts",
				buttons : {
					success : {
						text : "create",
						fn : function(){

							actions.create()

							self.closeContainer()

							return true
						}
					}
				}
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
	module.exports = articlesv;
}
else{

	app.modules.articlesv = {};
	app.modules.articlesv.module = articlesv;

}