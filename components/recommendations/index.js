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
			list : function(contents){
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

				});
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var load = function(clbk){
			//var nbRecomandations = 12;
			///getrecomendedcontents
			/*

				type: 'content',

				contentAddress: share.address,

				contenttypes: ['video'],
				depth: ed.depth || 10000,
				count: ed.count || 12

			*/

			self.app.platform.sdk.node.shares[ed.loader || 'getrecomendedcontents'](ed.parameters || {}, function (recomandations) {

				console.log('recomandations', recomandations)

				if (clbk)
					clbk(recomandations);

			});
		}

		var make = function(){
			load(function(recomandations){
				renders.list(recomandations)
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