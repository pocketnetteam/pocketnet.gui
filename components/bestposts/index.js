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
			essenseData;

		var loading;

		var actions = {}

		var events = {}

		var renders = {

			url : function(_el, currentShare, clbk){

				var url = currentShare.url.v;

				var meta = self.app.platform.parseUrl(url);

				var og = self.app.platform.sdk.remote.storage[url];

				var rndr = () => self.shell({
					name :  'url',
					inner : html,
					el : _el,
					data : {
						url : currentShare.url.v,
						og : og,
						remove : true,

						share : currentShare
					},

				}, function(p){

					if(currentShare.url.v && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') {


                            Plyr.setup('#' + self.map.id + ' .js-player', function(player) {

								try{
									player.muted = false
								}catch(e){}
								
							}, {
								denyPeertubeAutoPlay: true,
							});

							p.el.find('.removepeertube').on('click', function(){
								events.removelink();
							})

							p.el.find('.streaminfo').on('click', () => {
								var storage = currentShare.export(true);

								renders.streamPage({ storage, type: 'addStream' });
							});

							initUpload({
								el : el.urlWrapper.find('.uploadpeertubewp'),
					
								ext : ['png', 'jpeg', 'jpg', 'webp', 'jfif'],
		
								dropZone : el.urlWrapper,
		
								multiple : false,
		
								action : function(file, clbk){
	
									actions.uploadVideoWallpaper(file.file).then(r => {

										self.app.platform.sdk.videos.clearstorage(currentShare.url.v)

										renders.url();
									})
									
								},
		
								onError : function(er, file, text){
									sitemessage(text)
								}
							})

						} 
						
						else {
							self.app.platform.sdk.remote.get(meta.url, function(og){

								if(og){
									renders.url()
								}

							})
						}
					}

					else{
						if(og){

							var images = p.el.find('img');

								p.el.find('img').imagesLoaded({ background: true }, function(image) {

									_.each(image.images, function(i, index){
										if(i.isLoaded){
											$(images[index]).addClass('active')

											if(i.img.naturalWidth > 500){
												p.el.addClass('bigimageinlink')
											}
										}
										else
										{
											$(images[index]).closest('.image').css('display', 'none')
										}
									})
									
								});

								p.el.find('.removeImage').on('click', function(){

									focusfixed = true;

									currentShare.settings.image = 'r'

									renders.url()

									state.save()

									setTimeout(function(){
										focusfixed = false;
									}, 200)
								})

						}
					}

					p.el.find('.removelink').on('click', events.removelink)

					if (clbk)
						clbk();
				})

				if (meta.type == 'peertube') {
					self.app.platform.sdk.videos.info([url])
						.then(() => rndr())
						.catch(() => rndr())
				} else {
					rndr();
				}
				
			},

			page : function(shares, clbk){

				el.loader.fadeOut();
				
				self.shell({

					name :  'posts',
					el :   el.posts,
					data : {
						shares : shares,
						extra : extra,
					},

					inner : append

				}, function(_p){
					

					
					if (clbk)
						clbk()
				})
			}
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
							clbk(shuffle(sharesRecommended).slice(0, 5));
						}

					} else {

						self.app.platform.sdk.posts.getRecommendedPosts(function(c, error){


							if (!error && c.length){
	
								el.c.show();
	
								var postIds = c.map(function(post){
									return post.contentid;
								})
		
								self.app.platform.sdk.node.shares.getbyid(postIds, function(c, error){
				
									sharesRecommended = c
									
									if (clbk){
										clbk(shuffle(sharesRecommended).slice(0, 5))
									}
								})
	
							}
	
						})

					}


				} else {

					if (sharesTop.length){

						el.c.show();
						
						if (clbk){
							clbk(shuffle(sharesTop).slice(0, 5));
						}

					} else {

						var parameters = ['15', '4320', '', self.app.localization.key]

						self.sdk.node.shares.get(parameters, function (c, error) {
	
							if (!error && c.length){
	
								el.c.show();
								
								sharesTop = c
									
								if (clbk){
									clbk(shuffle(sharesTop).slice(0, 5))
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

				var data = {};

				data.header = p.settings.essenseData.header || ''

				clbk(data);

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