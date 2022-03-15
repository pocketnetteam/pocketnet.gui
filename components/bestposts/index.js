var bestposts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		const videoShare = {
			"url": "peertube://storemi.ru/b85c4e6c-30a3-44fe-af7d-85a860032205",
			"tags": [
				"politics",
				"news",
				"commentary"
			],
			"message": "What The Hell Is Really Going On In Ukraine",
			"caption": "What The Hell Is Really Going On In Ukraine ",
			"images": [],
			"txid": "572d76cd954bd6e68b6804cdf861b6c586d459a37e7dd443128cec045b23a34c",
			"time": "2022-03-14T13:22:08.000Z",
			"repost": "",
			"language": "en",
			"poll": {},
			"comments": 0,
			"lastComment": null,
			"reposted": 0,
			"deleted": false,
			"on": {},
			"default": {
				"a": [
					"cm",
					"i",
					"u",
					"p"
				],
				"v": "p",
				"videos": [],
				"image": "a",
				"f": "0"
			},
			"settings": {
				"a": [
					"i",
					"u",
					"cm",
					"p"
				],
				"v": null,
				"videos": null,
				"image": "",
				"f": "0"
			},
			"renders": {},
			"type": "share",
			"temp": null,
			"address": "PWneSfgJsguqqCHhpMwh4GXLwxNQnFqQsg",
			"score": "5",
			"scnt": "1",
			"edit": false,
			"info": null
		};

		const articleShare = {
			"url": "",
			"tags": [
				"politics",
				"investing",
				"finance"
			],
			"message": "eyJ0aW1lIjoxNjQwNjA5OTY5MzEyLCJibG9ja3MiOlt7ImlkIjoiNGJDUEpvbUVlVCIsInR5cGUiOiJoZWFkZXIiLCJkYXRhIjp7InRleHQiOiJDb25zaWdsaSBzdSBjb21lIGluZG9zc2FyZSBnbGkgYW5maWJpIGkgdmVzdGl0aTogcXVpIGkgbWlnbGlvcmkgb3V0Zml0IHN0cmVldCBzdHlsZSBkYSBjb3BpYXJlLCBub25jaMOpIGdsaSBhYmJpbmFtZW50aSBtb2RhIGRhIHNlZ3VpcmUgY2hlIHN0cml6emFubyBsJ29jY2hpbyBhbGxlIHRlbmRlbnplIGF1dHVubm8gaW52ZXJubyAyMDIxIDIwMjIiLCJsZXZlbCI6Mn19LHsiaWQiOiJObXQtOXBETGVNIiwidHlwZSI6InBhcmFncmFwaCIsImRhdGEiOnsidGV4dCI6Ik9nbmkgb2NjYXNpb25lIGhhIGlsIHN1byBsb29rPyBDb21lIHNhcHBpYW1vIG1vbHRpIHN0aWxpc3RpIHNvbm8gZGl2ZW50YXRpIGZhbW9zaSBlIGhhbm5vIHRyb3ZhdG8gaWwgcGxhdXNvIGRlbGxhIGNyaXRpY2EgcHJvcHJpbyBwZXJjaMOpIHVzY2l2YW5vIGRhaSBjYW5vbmkgZXN0ZXRpY2kgZ2nDoCBjb25vc2NpdXRpLCBkZWNvbnRlc3R1YWxpenphdG8gdW4gY2FwbyBvIHVuIGFjY2Vzc29yaW8gcmlzcGV0dG8gYWxsYSB0cmFkaXppb25lLiBRdWVzdG8gcmFnaW9uYW1lbnRvIHZhbGUgYW5jaGUgcGVyIGdsaSBhbmZpYmkgY2hlLCBvbHRyZSBhIG5vbiByaWNoaWVkZXJlIHVuJ2V0w6AgcGVyIHNmb2dnaWFybGksJm5ic3A7c2kgcG9zc29ubyBwZXJzaW5vIGFiYmluYXJlIGEgdmVzdGl0aSBlbGVnYW50aSwgZmF0dGkgZGkgcGl6em8sIHR1bGxlIGUgc2V0YS4mbmJzcDsifX0seyJpZCI6Im1Gb2VWcmlETG4iLCJ0eXBlIjoiaW1hZ2UiLCJkYXRhIjp7ImZpbGUiOnsidXJsIjoiaHR0cHM6Ly9wb2NrZXRuZXQuYXBwOjgwOTIvaS9VaElWR3NPWlVkT3l1aXlQb0hocXBmLmpmaWYifSwiY2FwdGlvbiI6IiIsIndpdGhCb3JkZXIiOmZhbHNlLCJzdHJldGNoZWQiOmZhbHNlLCJ3aXRoQmFja2dyb3VuZCI6ZmFsc2V9fSx7ImlkIjoiaUFYdkJvdV8tWSIsInR5cGUiOiJwYXJhZ3JhcGgiLCJkYXRhIjp7InRleHQiOiJVbidpZGVhIG1vZGEgLSBxdWVsbGEgZGVnbGkgc3RpdmFsaSBkaSBwZWxsZSBuZXJhIGNvbiBzdW9sYSByb2J1c3RhIHNvdHRvIGEgdW4gZWxlZ2FudGlzc2ltbyBhYml0byZuYnNwOy0gY2hlIGZ1bnppb25hIGUgbm9uIHRlbWUgcml2YWxpIG5lbGxhIGNvbnRlbXBvcmFuZWl0w6A6IMOoIHR1dHRvIGdpb2NhdG8gc3VsIGNvbnRyYXN0bywgc3VsbGEgdm9nbGlhIGRpJm5ic3A7c3R1cGlyZSBzZW56YSByaW51bmNpYXJlIGFsbGEgY29tb2RpdMOgJm5ic3A7KHBlciBxdWFsY3VuYSBkaSB2b2ksIG1lZ2xpbyB1biBwYWlvIGRpJm5ic3A7PGEgaHJlZj1cImh0dHBzOi8vd3d3LnZvZ3VlLml0L3RhZ3MvYW5maWJpXCIgdGFyZ2V0PVwiX2JsYW5rXCI+YW5maWJpPC9hPiZuYnNwO3Jpc3BldHRvIGFsbGUgZMOpY29sbGV0w6kgZG90YXRlIGRpIHRhY2NvIHN0aWxldHRvKS4ifX0seyJpZCI6Ik9hYU05cGhBbDMiLCJ0eXBlIjoicGFyYWdyYXBoIiwiZGF0YSI6eyJ0ZXh0IjoiVHJhIGdsaSBlc3BlcnRpIGluIG1hdGVyaWEgdHJvdmlhbW8gYW5jaGUgbGEgcmVhbGUmbmJzcDtMYWR5IEFtZWxpYSBXaW5kc29yJm5ic3A7KGZvdG8gaW4gY29wZXJ0aW5hKSBjaGUgaGEgc2NlbHRvIHVuIGFiaXRvIG1pZGkgY29uIGdvbm5hIGEgcnVvdGEgZSB1biBwYWlvIGRpJm5ic3A7Y29tYmF0IGJvb3RzJm5ic3A7dHJhZm9yYXRpOiBub2kgbGEgdHJvdmlhbW8gY29zw6wgY2hpYywgbWVudHJlIGwnaW1tYWdpbmUgbGEgY29uZmVybWEgaWNvbmEgbW9kZXJuYS4ifX0seyJpZCI6Ii0wTUczNkRuQnciLCJ0eXBlIjoicGFyYWdyYXBoIiwiZGF0YSI6eyJ0ZXh0IjoiU2UgcXVlc3RvIG91dGZpdCBzdHJlZXQgc3R5bGUgdmkgw6ggcGlhY2l1dG8sIGFsbG9yYSB2aSBjb25zaWdsaWFtbyBkaSBzY29wcmlyZSBhbmNoZSBxdWVzdGkgNSBzY2F0dGkgZm90b2dyYWZpY2kgY2hlIHJpdHJhZ2dvbm8gYWxjdW5lIGZhc2hpb25pc3RlIGNvbiBpIGxvcm8gbWVyYXZpZ2xpb3NpIGFiaXRpIGZpcm1hdGk6IGlkZWUgbW9kYSBkYSBjb3BpYXJlIHN1Yml0bywgc2VuemEgaW5kdWdpbywgYW5jaGUgaW4gb2NjYXNpb25lIGRlbGxlIGZlc3RlLi4ifX0seyJpZCI6IlM0U3lVVk04cTYiLCJ0eXBlIjoiZGVsaW1pdGVyIiwiZGF0YSI6e319LHsiaWQiOiJmNWF1Mk1fLUVkIiwidHlwZSI6ImhlYWRlciIsImRhdGEiOnsidGV4dCI6IkNvbWUgaW5kb3NzYXJlIGdsaSBhbmZpYmkgY29uIGlsIHZlc3RpdG8gZGkgdHVsbGUiLCJsZXZlbCI6Mn19LHsiaWQiOiJVZ3N6YTJtOHN3IiwidHlwZSI6InBhcmFncmFwaCIsImRhdGEiOnsidGV4dCI6IkluaXppYW1vIGNvbiBpbCBsb29rIGRpIFBhb2xhIEFsYmVyZGk6IGwnaW5mbGVuY2VyIGhhIG9wdGF0byBwZXIgdW4gYWJpdG8gYSB0dWJpbm8gdHJhc3BhcmVudGUgdGVtcGVzdGF0byBkYSBhcHBsaWNhemlvbmkgZmxvcmVhbGkgY29sb3IgcGFzdGVsbG8gY3VjaXRlIHN1bCBkw6ljb2xsZXTDqSwgbWVudHJlIHNvdHRvIHNpIG5vdGFubyBnbGkgc2hvcnRzIHRvbiBzdSB0b24uIEdsaSBhbmZpYmkgc29ubyBhbHRpIGUgZG90YXRpIGRpIHppcC4ifX0seyJpZCI6ImVKZ0lnbG5meVYiLCJ0eXBlIjoiY2Fyb3VzZWwiLCJkYXRhIjpbeyJ1cmwiOiJodHRwczovL3BvY2tldG5ldC5hcHA6ODA5Mi9pL2RHQ09leWFZRlRHTVNNcmtSelJTcFIuamZpZiIsImNhcHRpb24iOiIifSx7InVybCI6Imh0dHBzOi8vcG9ja2V0bmV0LmFwcDo4MDkyL2kvYlFEZ3JaRkNFWWFEVnlVTUR1V21PYy5qZmlmIiwiY2FwdGlvbiI6IiJ9LHsidXJsIjoiaHR0cHM6Ly9wb2NrZXRuZXQuYXBwOjgwOTIvaS9HeVhnbFJpYUtvV1FnSWRWaW9MdU5PLmpmaWYiLCJjYXB0aW9uIjoiIn1dfSx7ImlkIjoiMGpvZmlNSml3VCIsInR5cGUiOiJwYXJhZ3JhcGgiLCJkYXRhIjp7InRleHQiOiJMYSBjb3N0dW1pc3RhIEdpbmV2cmEgRGUgQ2Fyb2xpcyZuYnNwO3JpY3JlYSB1bmEgRXZhIGFubmkgNjAgYXR0cmF2ZXJzbyB1biBndWFyZGFyb2JhIGNoZSBuZSByaXNwZWNjaGlhIGwnYWxsdXJlOiZuYnNwO3NvZmlzdGljYXRhLCBjbGFzc2ljYSBtYSBsdXNzdW9zYSwgc2VtcHJlIGNvbnRyYWRkaXN0aW50YSBkYSB1biBpbXBlY2NhYmlsZSBjb2xvciBibG9jayBpbiBiaWFuY28gZSBuZXJvIGNoZSBvbWFnZ2lhIGxlIG9yaWdpbmkgZGVsIGZ1bWV0dG8uIE9sdHJlIGFsbCdpbW1hbmNhYmlsZSBjb21wbGV0byBjb24gdHV0YSB0b3RhbCBibGFjayBjaGUgbGEgYWNjb21wYWduYSBuZWkgbW9tZW50aSBkJ2F6aW9uZSwgTWlyaWFtIGluZG9zc2Egc2ludW9zaSBhYml0aSBpbiBzZXRhLCBjYW1pY2llIG1vcmJpZGUsIGNhcHBlbGxpIGZlZG9yYSBlIGFtcGllIGNhcHBlIGNvbiBzcGlsbGUsIHNlbnphIGNvbnRhcmUgbGEgcHJlc2VuemEgY29zdGFudGUgZGkmbmJzcDttYWVzdG9zaSBnaW9pZWxsaSBCdWxnYXJpJm5ic3A7aW4gcmlmZXJpbWVudG8gYWxsYSBzdWEgcGFzc2lvbmUgcGVyIGxlIHBpZXRyZSBwcmV6aW9zZS4mbmJzcDsmbmJzcDsifX0seyJpZCI6InczemwyOVEwWloiLCJ0eXBlIjoiaW1hZ2UiLCJkYXRhIjp7ImZpbGUiOnsidXJsIjoiaHR0cHM6Ly9wb2NrZXRuZXQuYXBwOjgwOTIvaS9GeW5aTXh3VHRWT2hvcmdFcEN3dU94LmpmaWYifSwiY2FwdGlvbiI6IiIsIndpdGhCb3JkZXIiOmZhbHNlLCJzdHJldGNoZWQiOmZhbHNlLCJ3aXRoQmFja2dyb3VuZCI6ZmFsc2V9fV0sInZlcnNpb24iOiIyLjIyLjIifQ==",
			"caption": "Come indossare gli anfibi con i vestiti? 5 outfit moda street style secondo le tendenze moda AI 2021",
			"images": [
				"https://pocketnet.app:8092/i/AoyHFjHyolhJPLRFPJqJOq.jfif"
			],
			"txid": "1730da52d403f118494a43136cb472feb59b3e46adb13079c8d3e3452047c366",
			"time": "2021-12-27T12:59:28.000Z",
			"repost": "",
			"language": "en",
			"poll": {},
			"comments": 0,
			"lastComment": null,
			"reposted": 0,
			"deleted": false,
			"on": {},
			"default": {
				"a": [
					"cm",
					"i",
					"u",
					"p"
				],
				"v": "p",
				"videos": [],
				"image": "a",
				"f": "0"
			},
			"settings": {
				"a": "",
				"v": "a",
				"videos": [],
				"image": "",
				"f": "0",
				"version": 2
			},
			"renders": {},
			"type": "share",
			"temp": null,
			"address": "TSVui5YmA3JNYvSjGK23Y2S8Rckb2eV3kn",
			"score": "0",
			"scnt": "0",
			"edit": false,
			"info": null
		};

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

						console.log('shares[idx]', shares[idx], _el)

						var share = shares[idx];

						console.log('share', share)

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

								_p.el.find('.imageWrapper').on('click', function(){

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

							url.on('click', function(){
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

							// preparedShares.push(videoShare);
							preparedShares.push(articleShare);
							clbk(preparedShares);
						}

					} else {

						console.log("getRecommendedPosts")

						self.app.platform.sdk.posts.getRecommendedPosts(function(c, error){


							if (!error && c.length){
	
								el.c.show();
	
								var postIds = c.map(function(post){
									return post.contentid;
								})


								postIds.unshift('990360958e37e88370cdb7ea5e578d7b1bd4b28bd377fc0f8046a5851eb18ea9')
		
								self.app.platform.sdk.node.shares.getbyid(postIds, function(c, error){

									console.log('c!!!', c);
				
									sharesRecommended = c

									var preparedSharesRecommended = shuffle(sharesRecommended).slice(0, 15);

									// preparedSharesRecommended.push(videoShare)

									
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

						// preparedShare.push(videoShare)
						
						if (clbk){
							clbk(preparedShare);
						}

					} else {

						var parameters = ['15', '4320', '', self.app.localization.key]

						self.sdk.node.shares.get(parameters, function (c, error) {
	
							if (!error && c.length){
	
								el.c.show();
								
								sharesTop = c

								var preparedShare = shuffle(sharesTop).slice(0, 15);
								// preparedShare.push(videoShare)

									
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