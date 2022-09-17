var recommendationinfo = (function(){

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
			tags : function(){

				

				pretry(() => {
					return self.app.platform.sdk.tags.maxs().max > 0
				}, 100, 15000).then(() => {

					var probtags = _.sortBy(self.app.platform.sdk.memtags.gettags(), (tag) => {
						return -tag.probability
					})

					var totalprobability = _.reduce(probtags, (m, t) => {return m + t.probability}, 0)

					var usedtagsmap = {}

					var sdf = self.sdk.tags.filterEx(self.sdk.tags.filterCats(_.map(probtags, t => {
						return t.tag
					})))


					_.each( self.sdk.tags.filterEx(self.sdk.tags.filterCats(probtags)), t => {
						usedtagsmap[t.tag] = true
					})


					var completed = _.first(self.app.platform.sdk.recommendations.getcompleted('tags'), 30) 


					var data = {
						...ed.info,
						probtags,
						usedtagsmap,
						totalprobability,
						memtags : deep(self.app.platform.sdk, 'memtags.storage.tags') || {},
						recmap : {},
						completed
					}

					_.each(data.tags, (t) => data.recmap[t] = true)
					

					console.log('self.app.platform.sdk.tags.maxs()', self.app.platform.sdk.tags.maxs())
	
					console.log('data', data)
	
					self.shell({
	
						animation : false,
						name :  'tags',
						el : el.c.find('.info'),
						inner : append,
						data : {
							info : data
						},
	
					}, function(_p) {
	
						_p.el.find('.showmorewrapper').on('click', function(){
							_p.el.find('.probtags').addClass('showall')
						})
	
					});
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

		var make = function(){
			renders[ed.type]()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				/*ed = {
					type : 'tags',
					info : {
						lang : 'ru',
						tags : ['харьков', 'художники']
					}
					
				}*/ ///p.settings.essenseData

				ed = p.settings.essenseData

				console.log("D", ed)

				


				var data = {ed};

				clbk(data);

			},

			destroy : function(){
				el = {};
				ed = {}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				header : "",
				class : 'recommendationinfoWnd normalizedmobile maxheight withoutButtons',
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = recommendationinfo;
}
else{

	app.modules.recommendationinfo = {};
	app.modules.recommendationinfo.module = recommendationinfo;

}