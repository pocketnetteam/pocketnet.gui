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

				if(!el.c) return

				var backlink = 'index'

				if(parameters().video) backlink = 'index?video=1'

				self.shell({
					name :  'currentsearch',
					data : {
						value : value,
						backlink : backlink
					},
					el : el.currentsearch


				}, function(_p){
					if(clbk) clbk()
				})
			},

			tags : function(){

				if(!el.c) return

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

				if(!el.c) return

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

			sub : function(value, clbk){

				if(!el.c) return

				self.shell({
					name :  'sub',
					data : {
					},
					el : el.subtop

				}, function(_p){
					if(clbk) clbk()
				})
			},

			top : function(value, clbk){

				if(!el.c) return

				var ps = self.app.platform.sdk.node.shares.parameters.get()

				var page = parameters().page || 0

				if (page < 0) page = 0

				self.shell({
					name :  'top',
					data : {
						ps : ps,
						page : page
					},
					el : el.subtop

				}, function(_p){

					/*ParametersLive(_.toArray(ps), _p.el)

					ps.period.onChange = function(){

						if (page){
							self.nav.api.history.removeParameters(['page'])
							makers.top()
						}

						if(ed.changed) ed.changed()

					}*/

					if(clbk) clbk()
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

		var makers = {
			search : function(){
				if(parameters().ss) renders.currentsearch(parameters().ss)
				if(parameters().sst) {
					var wordsRegExp = /[,.!?;:() \n\r]/g
					var tgsi = decodeURI((parameters().sst || ''))

					var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
						return r
					}));

					renders.currentsearch(_.map(words, function(w){return '#' + w}).join(' '))
				}
			},

			main : function(){
				renders.tags()
				renders.cats()
			},

			sub : function(){
				renders.sub()
			},

			top : function(){
				renders.top()
			}
		}

		var make = function(){

			var pps = parameters()

			if (pps.sst || pps.ss){
				makers.search()
				return
			}

			if (pps.r == 'sub'){
				makers.sub()
				return
			}

			if(pps.r == 'recommended'){
				makers.top()
				return
			}

			makers.main()

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
				el.subtop = el.c.find('.subtop')

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