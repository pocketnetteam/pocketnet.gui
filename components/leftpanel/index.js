var leftpanel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, categories = null, tags = null, cats = null;

		var ed = null;

		var events = {
			
		}

		var renders = {
			currentsearch : function(value, clbk){
				self.shell({
					name :  'currentsearch',
					data : {
						value : value
					},
					el : el.currentsearch


				}, function(_p){
					if(clbk) clbk()
				})
			},
			tags : function(){

				console.log("RENDERTAGS")

				self.nav.api.load({

					open : true,
					id : 'tagcloud',
					el : el.tags,
					animation : false,
					
					clbk : function(e, p){
						tags = p
					}

				})

			},

			cats : function(){

				self.nav.api.load({

					open : true,
					id : 'categories',
					el : el.cats,
					animation : false,
					
					clbk : function(e, p){
						cats = p
					}

				})

			},

			
		}

		var load = {
			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			
		}

		var make = function(){

			

			if (parameters().sst || parameters().ss){
				if(parameters().ss) renders.currentsearch(parameters().ss)
				if(parameters().sst) {
					var wordsRegExp = /[,.!?;:() \n\r]/g
					var tgsi = decodeURI((parameters().sst || ''))

					var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
						return r
					}));

					renders.currentsearch(_.map(words, function(w){return '#' + w}).join(' '))
				}
			}
			else{	
				renders.tags()
				renders.cats()
			}

			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {};

				clbk(data);

			},

			destroy : function(){

				if (tags){
					tags.destroy()
					tags = null;
				}

				if (cats){
					cats.destroy()
					cats = null;
				}



				el = {};
			},

			authclbk : function(){

				return
				
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.leftpanelcnt')
				el.tags = el.c.find('.tagscnt')
				el.cats = el.c.find('.catscnt')

				el.currentsearch = el.c.find('.currentsearchcnt')

				initEvents();

				make()

				p.clbk(null, p);
			}
		}
	};

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

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
	module.exports = leftpanel;
}
else{

	app.modules.leftpanel = {};
	app.modules.leftpanel.module = leftpanel;

}