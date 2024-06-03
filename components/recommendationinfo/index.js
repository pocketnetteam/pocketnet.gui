var recommendationinfo = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, external;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			shares : function(ids){
				if(ids.length){
					el.c.find('.anotherShares').addClass('hasshares')
					self.app.platform.papi.lenta(ids, el.c.find('.sharesWrapper'), (e, p) => {
						external = p
					})
				}
			},
			tags : function(){

				

				pretry(() => {
					return self.app.platform.sdk.tags.maxs().max > 0
				}, 100, 15000).then(() => {

					var probtags = _.sortBy(self.app.platform.sdk.memtags.gettags(), (tag) => {
						return -tag.probability
					})

					var totalprobability = _.reduce(probtags, (m, t) => {return m + t.probability}, 0)

					var usedtagsmap = {}

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
					
	
					self.shell({
	
						animation : false,
						name :  'tags',
						el : el.c.find('.info'),
						inner : append,
						data : {
							info : data
						},
	
					}, function(_p) {

						var task = _.find(completed, (task) => {
							return ed.info.task == task.id
						})

						if (task && task.shares){
							renders.shares(_.filter(task.shares, (txid) => {
								return !ed.share || txid != ed.share
							}))
						}
	
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
			renders[ed.key]()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				/*ed = {
					key : 'tags',
					info : {
						lang : 'ru',
						tags : ['чудиновских', 'коронавирус'],
						task : '9d725b77-6a24-073f-28c7-cef605e490f1'
					},
					share : 'fee45495470aff2caf227725ff99266ac9b2e4bd2052735652c7818a4346fbdc'
					
				}*/ ///p.settings.essenseData

				ed = p.settings.essenseData

				var data = {ed};

				clbk(data);

			},

			destroy : function(){

				if (external){
					external.destroy()
					external = null
				}

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

			window.rifticker.add(() => {
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