var recommendations = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, places = {}, sel;

		var needmake = [], making = false, empty = false

		var rendered = {}

		var events = {
			scrollapp : function(){
				if(self.app.lastScrollTop + self.app.height > document.body.scrollHeight - 700) {
					makeneed()
				}
			},

			scrollell : function(){
				if(sel.scrollTop() + sel.height() > sel[0].scrollHeight - 700){
					makeneed()
				}
			}
		}

		var renders = {
			list : function(contents, clbk){

				if(!el.c) return

				self.shell({

					animation : false,
					name :  'list',
					el : el.c.find('.listWrapper'),
					inner : append,
					data : {
						contents,
						empty : _.isEmpty(rendered)
					}

				}, function(_p) {

					if (!_p || !_p.el) return;

					_p.el.find('.recoVideoDiv').click(function() {
		
						var txid = $(this).data('txid');

						if (txid) {

							self.app.Logger.info({
								actionId: 'RECOMMENDATION_SELECTED',
								actionValue: txid
							});

							if (ed.open){
								ed.open(txid)
							}
							else{
								self.nav.api.go({
									href : 'index?video=1&v=' + txid,
									history : true,
									open : true
								})
							}
						}

					});

					if(clbk) clbk(_p)

				});
			},

			lazyinfo : function(contents, p){


				_.each(contents, function(content) { 

					var video = (app.platform.sdk.videos.storage[content.url || "undefined"] || {}).data || {}

					var el = p.el.find('.recoVideoDiv[data-txid="'+content.txid+'"]')


					if (el.length){

						if(!el.find('.dummy').length) return

						if (video.thumbnail){
							el.find('.videoThumbnail').attr('image', video.thumbnail).removeClass('dummy')
						}
	
						if (typeof video.views != 'undefined'){

							var text = video.views + ' ' + pluralform(video.views,[self.app.localization.e('countview'), self.app.localization.e('countviews')])

							el.find('.views').removeClass('dummy').html(text)
						}

						if(_.isEmpty(video)){
							el.remove()
						}

					}

				})

				bgImagesCl(p.el)

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var sorting = function(recommendations){
			return _.sortBy(recommendations, function(r){
				r.point = recommendationPoint(r)
				return -recommendationPoint(r)
			})	
		}

		var filter = function(recommendation){

			var me = deep(self.app, 'platform.sdk.users.storage.' + (self.user.address.value || ''))


			if (me && me.relation(recommendation.address, 'blocking') ){
				return false
			}

			if(rendered[recommendation.txid]) return false

			return true

		}

		var recommendationPoint = function(recommendation){
			var p = Number(recommendation.score || 0)

			p += 10 * (recommendation.comments || 0)

			p += 50 * (recommendation.reposted || 0)

			var activities = self.app.platform.sdk.activity.has('users', recommendation.address)

			if (activities.point){
				p = p + activities.point * 10
			}

			if(recommendation.itisvideo){
				var h = self.app.platform.sdk.videos.historyget(recommendation.txid)

				if (h.percent > 94){
					p = p / 100
				}
				else
				if (h.percent > 5){
					p = p * 10
				}
				
			}

			if (places[recommendation.txid]){
				p = 5 * p / (places[recommendation.txid])
			}

			if (ed.points){
				p = ed.points(recommendation, p)
			}

			if (recommendation.myVal){
				p = p / 10
			}

			return p

		}


		var load = {
			contents : function(loader, clbk){

				var p = _.clone(loader.parameters || {})

				p.skipvideo = true
				
				self.app.platform.sdk.node.shares[loader.loader || 'getrecomendedcontents'](p, function (recommendations) {


					_.each(recommendations, function(r, i){
						places[r.txid] = i + 1
					})

					if (ed.sorting){
						recommendations = ed.sorting(recommendations)
					}

					if (ed.filter){
						recommendations =  ed.filter(recommendations) //_.filter(recommendations, ed.filter)
					}

					recommendations = sorting(_.filter(recommendations, filter))

				
					_.each(recommendations, function(recommendation){
						rendered[recommendation.txid] = true
					})
			

					if (clbk)
						clbk(recommendations);

				});
			},

			info : function(contents, clbk){

				self.sdk.node.shares.loadvideoinfoifneed(contents, true, function() {
					if(clbk) clbk()
				})
			}
		}

		var make = function(loader, clbk){

			
			load.contents(loader, function(recommendations){
				renders.list(recommendations, function(_p){
					load.info(recommendations, function(){
						renders.lazyinfo(recommendations, _p)
					})


					if(clbk) clbk()

				})
			})
		}

		var makeneed = function(){

			if (making && !empty) return

			if (needmake.length){

				making = true
				el.c.addClass('loading')


				make(needmake[0], function(){
					el.c.removeClass('loading')
					needmake.shift()
					making = false

					if(_.toArray(rendered).length < 6){
						makeneed()
					}
				})
			}
			else{

				removeEvents()

				if(_.isEmpty(rendered)){

					empty = true

					el.c.addClass('emptyr')
				}
			}

			
		}

		var initEvents = function(){
			
			if (sel){
				sel.on('scroll', events.scrollell);
			}
			else{
				self.app.events.scroll['recommendations'] = events.scrollapp
			}
		}

		var removeEvents = function(){
			if (sel){
				sel.off('scroll', events.scrollell);
			}
			else{
				delete self.app.events.scroll['recommendations'] 
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				needmake = []

				empty = false
				making = false

				places = {}

				ed = p.settings.essenseData || {}

				if(ed.container) sel = ed.container

				needmake = ed.loaders || []

				rendered = {}

				var data = {
					ed : ed
				};

				clbk(data);

			},

			destroy : function(){

				removeEvents()

				el = {};
				ed = {}
				places = {}
				sel = null

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents()


				if (ed.startload)
					makeneed()

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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = recommendations;
}
else{

	app.modules.recommendations = {};
	app.modules.recommendations.module = recommendations;

}