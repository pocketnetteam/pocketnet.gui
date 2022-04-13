var recommendations = (function(){

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
			list : function(contents, clbk){
				self.shell({

					animation : false,
					name :  'list',
					el : el.c.find('.listWrapper'),
					data : {
						contents
					}

				}, function(_p) {

					if (!_p || !_p.el) return;

					_p.el.find('.recoVideoDiv').click(function() {

						var txid = $(this).data('txid');

						if (txid) {

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

							//ed.open

							/*if (ed.opensvi){
								ed.opensvi(txid)
							}
							else

							if (ed.next){

								self.app.platform.sdk.node.shares.getbyid([txid], function () {

									var share = self.app.platform.sdk.node.shares.storage.trx[txid]

									ed.next(txid, share)
				
								})

							}*/
							

							

						}

					});

					if(clbk) clbk(_p)

				});
			},

			lazyinfo : function(contents, p){

				console.log('lazyinfo', contents)

				_.each(contents, function(content) { 

					var video = (app.platform.sdk.videos.storage[content.url || "undefined"] || {}).data || {}

					var el = p.el.find('.recoVideoDiv[data-txid="'+content.txid+'"]')

					console.log('el.length', el.length)

					if (el.length){

						if(!el.find('.dummy').length) return

						if (video.thumbnail){
							el.find('.videoThumbnail').attr('image', video.thumbnail).removeClass('dummy')
						}
	
						if (typeof video.views != 'undefined'){

							var text = video.views + ' ' + pluralform(video.views,[self.app.localization.e('countview'), self.app.localization.e('countviews')])

							el.find('.views').removeClass('dummy').html(text)
						}

					}

				})

				bgImages(p.el)

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var load = {
			contents : function(clbk){

				var p = _.clone(ed.parameters || {})

				p.skipvideo = true
				
				self.app.platform.sdk.node.shares[ed.loader || 'getrecomendedcontents'](p, function (recommendations) {
					if (ed.filter){
						recommendations = _.filter(recommendations, ed.filter)
					}

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


		var make = function(){
			load.contents(function(recommendations){
				renders.list(recommendations, function(_p){

					load.info(recommendations, function(){
						renders.lazyinfo(recommendations, _p)
					})
				})
			})
		}

		var initEvents = function(){
			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {
					ed : ed
				};

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