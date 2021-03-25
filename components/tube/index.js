var tube = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, essenseData, beginmaterial, making, beginmaterialloaded, countshares, 
			shareInitedMap, loading, ended, shareInitingMap, scrolling, rendering, prevscroll, newmaterials;

		var actions = {
			clear : function(){
				_.each(shareInitedMap, function(s, id){
					delete self.app.platform.sdk.node.shares.storage.trx[id]
				})

				countshares = 0

				shareInitedMap = {}
				shareInitingMap = {}

				loaded = false
				loading = false
				ended = false
				making = false

				scrolling = false
				rendering = false
				prevscroll = 0
				beginmaterial = null
				beginmaterialloaded = false

				newmaterials = 0
			}
		}

		var events = {
			
		}

		var load = {

			begin : function(clbk){


				if(beginmaterial && !beginmaterialloaded){
			
					self.app.platform.sdk.node.shares.getbyid(beginmaterial, function(shares){
						beginmaterialloaded = true;
						clbk(shares)
					})
					
				} else {
					clbk([])
				}
			},

			sstuff : function(shares, error, pr, clbk){

				var author = essenseData.author;

				self.app.platform.sdk.node.shares.users(shares, function(l, error2){

					countshares = countshares + shares.length

					loading = false;

					if (!el.c)
						return

					if(!error && !error2){

						if(!shares || !shares.length || ((shares.length < pr.count))){							

							if(!beginmaterial && !countshares){
								el.c.addClass("sharesZero")
							}
							else
							{
	
								if ( (shares.length < pr.count) && (author || essenseData.search) ){
									setTimeout(function(){
										if (el.c)
											el.c.addClass("sharesEnded")
									}, 1000)
								}
							}

							if (!shares.length || shares.length < pr.count && (author || essenseData.search))
								ended = true
						}

					}

					el.loader.fadeOut()

					if (clbk)
						clbk(shares, error || error2)

				})	
			},

			shares : function(clbk, cache){

				if (loading || (ended && (!essenseData.contents || essenseData.txids.length == _.toArray(shareInitedMap).length) )) return

				el.loader.fadeIn()

				el.c.addClass('loading');

				loading = true;

				if (essenseData.loader){
					essenseData.loader(function(shares, error, pr){
						load.sstuff(shares, error, pr, clbk)
					})
				}

				else
				{

					self.app.user.isState(function(state){

						load.begin(function(bshares){

							var author = essenseData.author;

							var loader = 'common';

							var _beginmaterial = beginmaterial;

							
							

							if (recommended){

								if(recommended == 'recommended'){
									loader = 'recommended'
								}

								else

								if(recommended == 'b'){
									loader = 'getbyidsp'
									_beginmaterial = essenseData.beginmaterial
								}

								else
								{
									loader = 'common'
									author = '1';

									if(!state){
										load.sstuff([], null, {
											count : 0
										}, clbk)

										return
									}
								}						
							}

							if(essenseData.txids && recommended != 'b'){
								loader = 'txids'

							}


							self.app.platform.sdk.node.shares[loader]({

								author : author,
								begin : _beginmaterial || '',
								txids : essenseData.txids

							}, function(shares, error, pr){

								_.each(bshares, function(bs){
									if(bs)

										shares.unshift(bs)
								})

								if (essenseData.filter) {

									shares = _.filter(shares, essenseData.filter)

								}


								load.sstuff(shares, error, pr, clbk)				

								if (recommended == 'b'){
									beginmaterial = ''
								}

							}, cache)

						})

					})
				}



				
			},

			
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			

		}

		var make = function(clbk, _p){
			making = true;

			var cache = 'clear';
			var clear = true;

			if (essenseData.goback) {
				cache = 'cache'
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				essenseData = p.settings.essenseData || {};

				actions.clear()				

				var _s = parameters();

				beginmaterial = _s.s || _s.i || _s.v || _s.p || null;

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.shares = el.c.find('.shares');
				el.loader = el.c.find('.loader');
				el.lentacnt = el.c.find('.lentacell .cnt')

				initEvents();
				make(null, p);

				if(!essenseData.goback)
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
	module.exports = tube;
}
else{

	app.modules.tube = {};
	app.modules.tube.module = tube;

}