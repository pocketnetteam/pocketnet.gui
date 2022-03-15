var bestposts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var sharesRecommended = [], 
			sharesTop = [],
			cnt = 50,
			end = false,
			extra = null,
			page = 0,
			essenseData,
			mestate, 
			video = true;

		var loading;

		var actions = {
			
			openPost : function(id, clbk, video){

				self.app.user.isState(function(state){

					var ed = {
						share : id,
						hr : essenseData.hr,
						like : function(share){
	
						},

						close : function(){
							openedPost = null
							essenserenderclbk()
						},
						video,

						autoplay : video
					}

					var c = function(e, es){		
						////// TEPM
						openedPost = es
							
						essenserenderclbk()

						if (clbk)
							clbk();

					}
				

					self.nav.api.load({
						open : true,
						href : 'post?s=' + id,
						inWnd : true,
						history : true,
						clbk : c,
						essenseData : ed
					})

				})
			

			},
			
		}

		var events = {}

		
		var essenserenderclbk = function(){

			var rc = function(){
				if(!essenseData.horizontal && el.c){
					cachedHeight = el.c.height()
				}
				
				if(essenseData.renderClbk) essenseData.renderClbk()
			}

			if(isMobile()){
				renderclbkSlowMade = slowMade(function(){

					rc()
	
				}, renderclbkSlowMade, 500)
			}
			else{
				rc()
			}

			
			
		}

		var renders = {

			urlContent : function(share, clbk){

				if(!el.c) return

				var url = share.url;

				if (url){

					var meta = self.app.platform.parseUrl(url);
					var og = self.app.platform.sdk.remote.storage[url];


					if(
						url && !og && 

						!(meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') && 

						!self.app.platform.sdk.usersettings.meta.preview.value
					){

						self.app.platform.sdk.remote.get(url, function(og){
							
							if(og && el.share && el.share[share.txid]){
								renders.url(el.share[share.txid].find('.url'), url, share, clbk)
							}
							else
							{
								if (clbk)
									clbk()
							}

						})

						return

					}
				
				}	
				
				if (clbk)
					clbk()

			},

			url : function(el, url, share, clbk){

				if (essenseData.nourlload){

					if (clbk)
						clbk()

					return
				}

				var og = self.app.platform.sdk.remote.storage[url];	
				var meta = self.app.platform.parseUrl(url);		

		
				

				var rndr = function(){

					self.app.platform.sdk.videos.paddingplaceholder(isMobile() || essenseData.horizontal ? null : url, function (next) {

						self.shell({
							animation : false,
							turi : 'share',
							name :  'url',
							el : el,
							mid : 'sharelenta',
							data : {
								url : url,
								og : og,
								share : share,
								video : video,
								preview : video ? true : false
							},
							notdisplay : video ? true: false,
							bgImages : {
								clbk : video ? true: false
							}
		
						}, next)

					}, function(_p){

						var images = _p.el.find('img');
	
						self.app.nav.api.links(null, _p.el, function(event){
							event.stopPropagation()
						})
	
						essenserenderclbk()
						
						images.imagesLoadedPN({ imageAttr: true }, function(image) {
	
							_.each(image.images, function(i, index){

								if (!i.isLoaded){
									$(images[index]).closest('.image').css('display', 'none')
								}
							})
	
							essenserenderclbk()
	
							images = null
						});
	
						if (clbk)
							clbk()
					})
				}

				meta.type === 'peertube' ? self.app.platform.sdk.videos.info([url]).then(rndr) : rndr()

			
			},

			page : function(shares, clbk){

				el.loader.fadeOut();
				
				self.shell({

					name :  'posts',
					el :   el.posts,
					data : {
						shares : shares,
					},

					inner : append

				}, function(_p){

					var renderedPosts = _p.el.find('.authorgroup .share');

					_.each(renderedPosts, function(_el, idx){

						var share = shares[idx];

						if (share.itisvideo()){

							renders.sharevideo(share, $(_el));

						} else {

							self.shell({

								name :  'post',
								el :   $(_el),
								data : {
									u : share
								},
	
								inner : append
	
							}, function(_p){

								_p.el.find('.postContentWrapper').on('click', function(){

									actions.openPost(share.txid, null, false)

								})
								
			
							})

						}

					})


							
				})
			},

			sharesocial : function(id, clbk){

				if(!shareInitedMap[id]) return

				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if (share){

					var url = 'https://'+self.app.options.url+'/' + (essenseData.hr || 'index?') + 's='+id+'&mpost=true'
					if (parameters().address) url += '&address=' + (parameters().address || '')


					if(video || essenseData.videomobile || share.itisvideo()){
						url = 'https://'+self.app.options.url+'/' + ('index?') + 'v='+id+'&mpost=true&video=1'
					
					}
					
					var n = 'Post';
					if(share.settings.v == 'a') n = 'Article'

					self.nav.api.load({
						open : true,
						href : 'socialshare2',
						history : true,
						inWnd : true,

						essenseData : {
							url : url,
							caption : self.app.localization.e('e13133'),

							sharing : share.social(self.app),
							embedding : {
								type : 'post',
								id : share.txid,
								fullscreenvideoShowed : fullscreenvideoShowed
							}
						}
					})
				}
			},

			sharevideo : function(share, _el){

				if(!p) p = {}

				if(!share) return

				self.shell({
					name : 'sharevideolight',

					el : _el,
					animation : false,
					data : {
						share : share,
						ed : essenseData,
						mestate : mestate,
						all : false,
						tplvideo : true ,
						openapi : essenseData.openapi
					}					

				}, function(p){

					var url = p.el.find('.url');
					renders.url(url, share.url, share, function(){

						renders.urlContent(share, function(){

							p.el.find('.postContentWrapper').on('click', function(){
								actions.openPost(share.txid, null, true)
							})


						});

					})
				})

			},
		}

		var load = {

		}


		var state = {
			save : function(){

			},
			load : function(clbk){

				
				var shuffle = function(array) {
					let currentIndex = array.length,  randomIndex;
				  
					while (currentIndex != 0) {
				  
					  randomIndex = Math.floor(Math.random() * currentIndex);
					  currentIndex--;
				  
					  [array[currentIndex], array[randomIndex]] = [
						array[randomIndex], array[currentIndex]];
					}
				  
					return array;
				}

				if (essenseData.type === 'recommended'){

					if (sharesRecommended.length){

						el.c.show();
						
						if (clbk){

							const preparedShares = shuffle(sharesRecommended).slice(0, 5);

							clbk(preparedShares);
						}

					} else {

						self.app.platform.sdk.posts.getRecommendedPosts(function(c, error){


							if (!error && c.length){
	
								el.c.show();
	
								var postIds = c.map(function(post){
									return post.contentid;
								})

		
								self.app.platform.sdk.node.shares.getbyid(postIds, function(c, error){
				
									sharesRecommended = c.filter(function(share){

										return !(share.settings.v == 'a' && !share.settings.version);

									})

									var preparedSharesRecommended = shuffle(sharesRecommended).slice(0, 5);

									
									if (clbk){
										clbk(preparedSharesRecommended)
									}
								})
	
							}
	
						})

					}


				} else {

					if (sharesTop.length){

						el.c.show();

						var preparedShare = shuffle(sharesTop).slice(0, 5);
						
						if (clbk){
							clbk(preparedShare);
						}

					} else {

						var parameters = ['15', '4320', '', self.app.localization.key]

						self.sdk.node.shares.get(parameters, function (c, error) {
	
							if (!error && c.length){
	
								el.c.show();
								
								sharesTop = c

								var preparedShare = shuffle(sharesTop).slice(0, 5);

									
								if (clbk){
									clbk(preparedShare);
								}
							}
	
	
						}, 'gethotposts')

					}



				}

			}
		}

		var initEvents = function(){}

		var make = function(){

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				end = false;
				page = 0;
				loading = false;

				self.app.platform.sdk.ustate.me(function(_mestate){

					mestate = _mestate || {}

					var data = {};

					data.header = p.settings.essenseData.header || ''

					clbk(data);


				})

			},

			destroy : function(){

				window.removeEventListener('scroll', events.loadmorescroll)

				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.posts = el.c.find('.posts');
				el.loader = el.c.find('.loader');

				essenseData = p.essenseData;

				state.load(renders.page);

				initEvents();

				make();

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
	module.exports = bestposts;
}
else{

	app.modules.bestposts = {};
	app.modules.bestposts.module = bestposts;

}