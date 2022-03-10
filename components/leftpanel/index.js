var leftpanel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var el, tags = null, cats = null;

		var ed = null;

		var updateNew = function(){

			var s = self.app.platform.sdk.newmaterials.storage

			if(!el.c) return

			_.each(s, function(v, k){

				var _el = el.c.find('.lentaunseen[key="'+k+'"]')

				if(v > 99) v = '99'

				var s = self.app.platform.sdk.categories.gettagsexcluded().length + self.app.platform.sdk.categories.gettags().length

				if (s && v && k != 'sub'){
					v = '<i class="fas fa-circle"></i>'
				}

				_el.html(v)

				if(v) _el.addClass('hasunseen')
				else _el.removeClass('hasunseen')

			})
		}

		var renders = {
			currentsearch : function(value, clbk){

				if(!el.c) return

				var backlink = 'index'

				if (parameters().video) backlink = 'index?video=1'
				if (parameters().read) backlink = 'index?read=1'

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

			best : function(){

				if(!el.c) return;

				self.shell({
					name :  'best',
					data : {},
					el : el.bestfirst


				}, function(_p){

					_p.el.find('.toggle').on('click', function(){

						var best = $(this).closest('.best');
						var method = 'historical'
		
						best.toggleClass('on');
		
						if (best.hasClass('on')){
		
							method = 'hierarchical';
		
						}
		
						self.sdk.lentaMethod.set(method)
		
					})

				})

			},

			menu : function(value, clbk){

				if(!el.c) return

				var pathname = self.app.nav.current.href;

				self.app.user.isState(function(state){

					if(isMobile() && pathname != 'index'){
						el.c.addClass('hidden')
					}
					else{
						el.c.removeClass('hidden')

						self.shell({

							name :  'menu',
							el :   el.menu,
							data : {
								pathname : pathname,
								state : state,
								mobile : isMobile(),
							},
	
						}, function(_p){

							updateNew()
						})
					}

					
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

					ParametersLive(_.toArray(ps), _p.el)

					ps.period.onChange = function(){

						if (page){
							self.nav.api.history.removeParameters(['page'])
							makers.top()
						}

						if(ed.changed) ed.changed()

					}

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
			

			el.c.find('.closecategories').on('click', function(){
				if(ed.close) ed.close()
			})

			self.app.platform.sdk.newmaterials.clbks.update.leftpanel = updateNew


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
				renders.menu()
				renders.tags()
				renders.cats()
				renders.best()


			},

			sub : function(){
				renders.menu()
				renders.sub()
			},

			top : function(){
				renders.menu()
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
			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {};

				clbk(data);

			},

			destroy : function(){

				delete self.app.platform.sdk.newmaterials.clbks.update.leftpanel

				if (tags){
					tags.destroy()
					tags = null;
				}

				if (cats){
					cats.destroy()
					cats = null;
				}

				if(el.c) el.c.empty()

				el = {};

				ed = {}
			},

			authclbk : function(){

				return
				
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.leftpanelcnt')
				el.menu = el.c.find('.menu');
				el.tags = el.c.find('.tagscnt')
				el.cats = el.c.find('.catscnt')
				el.bestfirst = el.c.find('.bestfirst');

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