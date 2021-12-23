var articlesv = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			articles : function(){
				self.shell({

					animation : false,
					name : 'articles',
					data : {
						articles : self.app.platform.sdk.articles.getlist(),
						current : ed.current
					},
					el : el.articles

				},
				function(p){
					p.el.find('.openart').on('click', function(){
						var article =  self.app.platform.sdk.articles.getbyid(
							$(this).closest('.article').attr('art')
						)

						if (article){

							if(ed.select){
								if(!ed.select(article)) return
							}

						}

						self.closeContainer()
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
						action : function(){

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