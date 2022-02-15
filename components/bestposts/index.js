var bestposts = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		const videoShare = {
			"url": "peertube://peertube14.pocketnet.app/18ffa055-404c-43d1-ab49-03bc5867d939",
			"tags": [
				"covid",
				"lockdowns",
				"politics",
				"news",
				"commentary"
			],
			"message": "Bad news about 4 “organizers” of the convoy.\n\nAmazingPolly  32:46  https://rumble.com/vumvmc-warning-to-truckers-and-convoy-supporters.html?mref=2hzb1&mrefc=6\n",
			"caption": "Warning to Truckers and Convoy Supporters.",
			"images": [],
			"txid": "387e5d8b1358dd7b85004a3ca0deead9b879a83f0f680ee0d9ef25d91d5685c3",
			"time": "2022-02-11T06:10:27.000Z",
			"repost": "",
			"language": "en",
			"poll": {},
			"comments": 15,
			"lastComment": {
				"id": "eca5613e18a8144bcb3e6c690246270158a0c4162bc54917c65feeffd923ec68",
				"cid": 3800639,
				"edit": false,
				"deleted": false,
				"postid": "387e5d8b1358dd7b85004a3ca0deead9b879a83f0f680ee0d9ef25d91d5685c3",
				"address": "PCnwjuKFF5mXxw9cUzq9JwsxhSuF5g74gU",
				"time": "1644706710",
				"timeUpd": "1644706710",
				"block": "1568857",
				"msg": "{\"message\":\"Use%20Bitcoin%20and%20send%20them%20money%20personally\",\"url\":\"\",\"images\":[]}",
				"scoreUp": "0",
				"scoreDown": "0",
				"children": "0",
				"myScore": 0
			},
			"reposted": 1,
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
				"v": "",
				"videos": [],
				"image": "",
				"f": "0"
			},
			"renders": {},
			"type": "share",
			"temp": null,
			"address": "PQzoDW8StdS3skmDuUK4z5L9dMq24n72M4",
			"score": "140",
			"scnt": "28",
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

							const preparedShares = shuffle(sharesRecommended).slice(0, 5);

							preparedShares.push(videoShare);
							preparedShares.push(articleShare);
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
				
									sharesRecommended = c

									var preparedSharesRecommended = shuffle(sharesRecommended).slice(0, 5);

									preparedSharesRecommended.push(videoShare)

									console.log('preparedSharesRecommended', preparedSharesRecommended)
									
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

						preparedShare.push(videoShare)
						
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
								preparedShare.push(videoShare)

									
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