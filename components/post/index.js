
if (typeof _OpenApi == 'undefined') {
	_OpenApi = false
}

var post = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = (deep(p, 'history')  && !p.inWnd) || deep(p, 'primary');


		var el, share, ed, inicomments, eid = '', _repost = null, level = 0, external = null;

		var player = null

		var authblock = false;

		var actions = {

			openPost : function(id, clbk){

				self.closeContainer()

				self.nav.api.load({
					open : true,
					href : 'post?s=' + id,
					inWnd : true,
					history : true
				})

			},

			changeSavingStatus : function(shareId, deleted){

				if(self.app.playingvideo && !deleted) return
		
				renders.share()
			},	

			changeSavingStatusLight : function(share){

				if (el.c){
					el.c.find('.shareSave').attr('status', self.app.platform.sdk.localshares.status(share.txid))
				}

			},

			authclbk: function () {
				authblock = true;

				var id = share.txid

				self.app.platform.sdk.node.shares.getbyid(id, function () {

					share = self.app.platform.sdk.node.shares.storage.trx[id]

					delete share.myVal

					actions.subscribeLabel()

					renders.mystars(function () {
						authblock = false;
					})



				})
			},

			subscribeLabel: function () {

				var user = self.app.user

				var my = (user.address.value && share.address == user.address.value)
				var subscribed = false;


				if (!my && user.address.value) {

					var me = deep(self.app, 'platform.sdk.users.storage.' + user.address.value)

					if (me && me.relation(share.address, 'subscribes')) {
						subscribed = true
					}
				}

				if (el.c) {

					var _el = el.share.find('.shareTable')

					if (subscribed) {
						_el.addClass("subscribed")
					}
					else {
						_el.removeClass("subscribed")
					}

				}



			},

			stateAction: function (clbk, txid) {

				if (_OpenApi) {

					var phref = 'https://' + self.app.options.url + '/post?openapi=true&s=' + txid

					if (self.app.ref) {
						phref += '&ref=' + self.app.ref
					}

					window.open(phref, '_blank');

					return
				}

				self.app.user.isState(function (state) {

					if (state) {
						clbk()
					}

					else {
						self.nav.api.load({
							open: true,
							id: 'authorization',
							inWnd: true,

							essenseData: {

								fast: true,
								loginText: self.app.localization.e('llogin'),
								successHref: '_this',

								signInClbk: function () {

									retry(function () {

										return !authblock

									}, function () {

										if (clbk)
											clbk()
									})


								}
							}
						})
					}

				})
			},

			postscores: function (clbk) {

				actions.stateAction(function(){

					self.app.nav.api.load({
						open: true,
						href: 'postscores?p=' + share.txid,
						inWnd: true,
						history: true,

						essenseData: {
							share: share.txid,

							like: function (share) {
								renders.stars()

								if (ed.like) ed.like()
							},

						},

						clbk: function () {
							if (clbk)
								clbk()
						}
					})

				}, share.txid)

			},

			repost: function (shareid) {

				actions.stateAction(function () {

					self.app.platform.ui.share({
						repost : shareid
					})

				}, shareid)



			},

			next: function () {

				var nextel = el.c.find('.nextpost');

				nextel.html('<div class="loader"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div>')

				ed.next(share.txid, function (txid) {



					if (txid) {

						self.nav.api.load({
							open: true,
							href: 'post?s=' + txid,

							eid: 'nextpost' + txid,
							el: nextel,

							clbk: function () {

							},

							essenseData: {
								share: txid,
								hr: ed.hr,
								like: ed.like,
								next: ed.next,
								removemargin: true
							}
						})

					}
					else {
						nextel.html('<div class="ended">' + self.app.localization.e('e13146') + '</div>')
					}



				})



			},

			sharesocial: function (clbk) {
				var url = 'https://' + self.app.options.url + '/' + (ed.hr || 'index?') + 's=' + share.txid + '&mpost=true'

				if (parameters().address) {
					url += '&address=' + (parameters().address || '')
				}

				if (ed.video) url = 'https://' + self.app.options.url + '/' + (ed.hr || 'index?') + 'v=' + share.txid + '&mpost=true&video=1'

				var m = share.message;

				var image = share.images[0];

				if (!image && share.url) {
					var v = videoImage(share.url)

					if (v) {
						image = v;
					}
				}

				var n = 'Post';

				if (share.settings.v == 'a') n = 'Article'

				self.nav.api.load({
					open: true,
					href: 'socialshare2',
					history: true,
					inWnd: true,

					essenseData: {
						url: url,
						caption: self.app.localization.e('e13133') + ' ' + n,

						sharing: share.social(self.app),
						embedding: {
							type: 'post',
							id: share.txid
						}
					}
				})

			},

			donate: function (clbk) {

				var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
					address: share.address,
					addresses: []
				}

				var link = 'send?address=' + share.address + '&amount=1'
					+ '&label=' + (userinfo.name || userinfo.address) + '&setammount=true'


				self.fastTemplate('donation', function (rendered) {
					dialog({
						html: rendered,
						class: "one donation",

						btn1text: self.app.localization.e('dcancel'),

						clbk: function (el, d) {

							el.find('.pnetdnt').on('click', function () {
								self.nav.api.load({
									open: true,
									href: link,
									history: true
								})

								self.closeContainer()

								d.destroy()
							})

							el.find('.copy').on('click', function () {
								var a = $(this).closest('.address').find('.addr')

								copyText(a)

								sitemessage(self.app.localization.e('successfullycopiedaddress'))
							})

						}
					})
				}, {
					userinfo: userinfo
				})



			},

			position: function () {

				if (isMobile()) return

				if (primary) return

				if (ed.removemargin || isMobile()) return


				var h = $(window).height();

				var wh = el.wr.height();

				var d = Math.min((h - wh) / 2, h / 6)

				if (d > 0) {
					el.wr.css('margin-top', d + 'px')
				}
				else {
					el.wr.css('margin-top', 0 + 'px')
				}

			},

			initVideo: function (clbk) {
				if (self.app.platform.sdk.usersettings.meta.embedvideo && !
					self.app.platform.sdk.usersettings.meta.embedvideo.value) return

				var pels = el.c.find('.js-player, [data-plyr-provider][data-plyr-embed-id]');

				var shareId = share.txid;

				if (!el[shareId])
					el[shareId] = el.c.find('.metapanel.' + shareId + ' .downloadMetapanel');

				//var downloadPanel = el[shareId];

				var wa =  !share.repost && !ed.repost && ((share.itisvideo() && isMobile() || (ed.autoplay && pels.length <= 1))) ? true : false

				if (pels.length) {

					var startTime = 0;

					if (self.app.platform.sdk.videos.historyget && share.itisvideo()){

						var pr = self.app.platform.sdk.videos.historyget(share.txid)
						if (pr.percent < 95)
							startTime = pr.time
					}

					var options = {
						//autoplay : pels.length <= 1,
						resetOnEnd: true,
						muted: false,
						wautoplay: wa,
						logoType : self.app.meta.fullname,
						startTime : startTime,
						volumeChange : function(v){
							videosVolume = v

							self.sdk.videos.volume = videosVolume 

							self.sdk.videos.save()
						},

						fullscreenchange : function(v){
							self.app.mobile.fullscreenmode(v)
						},

						play : function(){
							self.app.actions.playingvideo(player)

							if(isMobile() && !ed.repost && !el.c.closest('.wndcontent').length){
								
								self.app.actions.scroll(125)
							}
						},

						pause : function(){
							self.app.actions.playingvideo(null)
						},

						playbackStatusUpdate : function({
							position,
							playbackState,
							duration
						}){
							if(playbackState == 'playing' && ((position > 15 && duration > 240) || startTime)){

								self.app.platform.sdk.videos.historyset(share.txid, {
									time : position,
									percent : ((position/duration)* 100).toFixed(0)
								})

							}
						}
					};

					$.each(pels, function (key, el2) {

						var videoId = el2.getAttribute('data-plyr-video-id');

						PlyrEx(el2, options, (_player) => {

							player = _player
						

							if (wa) {

								player.play()

								if (player.setVolume)
									player.setVolume(self.sdk.videos.volume)
								else{
									player.muted = false
								}
								//
							}

							//// autoplay
							if (clbk)
								clbk()
						});
					});

				}
			},

			likeWithR: function (value, clbk) {

			},

			like: function (value, clbk) {

				var checkvisibility = app.platform.sdk.node.shares.checkvisibility(share);

				if(checkvisibility) return

				var upvoteShare = share.upvote(value);


				if (!upvoteShare) {
					self.app.platform.errorHandler('4', true)

					if (clbk)
						clbk(false)

					return
				}

				self.sdk.node.transactions.create.commonFromUnspent(

					upvoteShare,

					function (tx, error) {


						topPreloader(100)

						if (!tx) {

							share.myVal = null;

							self.app.platform.errorHandler(error, true)

							if (clbk)
								clbk(false)

						}
						else {

							if (clbk)
								clbk(true)
						}

					}
				)
			},

			complain: function (clbk) {


				self.nav.api.load({
					open: true,
					id: 'complain',
					inWnd: true,

					essenseData: {
						item: 'post',
						obj: share,

						success: function () {

						}
					},

					clbk: function () {

					}
				})
			},

			unsubscribe: function (clbk) {
				self.app.platform.api.actions.unsubscribe(share.address, function (tx, error) {
					if (!tx) {
						self.app.platform.errorHandler(error, true)
					}

					if (clbk)
						clbk(tx, error)
				})
			},

			subscribe: function (clbk) {



				self.app.platform.api.actions.subscribe(share.address, function (tx, error) {
					if (!tx) {
						self.app.platform.errorHandler(error, true)
					}

					if (clbk)
						clbk(tx, error)
				})


			},

			openGalleryRec: function (initialValue, clbk) {

				var allimages = [];

				var getimages = function (share, clbk) {

					_.each(share.images, function (i) {
						allimages.push(i)
					})

					if (!share.repost) {

						if (clbk)
							clbk()

					}

					else {

						self.app.platform.sdk.node.shares.getbyid(share.repost, function (shares) {

							var s = shares[0]

							if (s) {
								getimages(s, clbk);
							}

							else {
								if (clbk)
									clbk()
							}
						})

					}

				}

				getimages(share, function () {
					var images = _.map(allimages, function (i) {
						return {
							src: i
						}
					})

					var num = findIndex(images, function (image) {

						if (image.src == initialValue) return true;

					})

					self.app.nav.api.load({
						open: true,

						href: 'imagegallery?i=' + share.txid + '&num=' + (num || 0),

						inWnd: true,
						history: 'true',
						essenseData: {
							initialValue: initialValue,
							idName: 'src',
							images: images
						}
					})
				})
			},

			openGallery: function (initialValue) {

				var images = _.map(share.images, function (i) {
					return {
						src: i
					}
				})

				var num = findIndex(images, function (image) {

					if (image.src == initialValue) return true;

				})

				self.app.nav.api.load({
					open: true,

					href: 'imagegallery?i=' + share.txid + '&num=' + (num || 0),

					inWnd: true,
					history: 'true',
					essenseData: {
						initialValue: initialValue,
						idName: 'src',
						images: images
					}
				})
			},

			videoShare: function (share) {
				if (!share.url || !share.itisvideo()) return sitemessage('Unable to parse a video in the post');

				const metaInfo = self.app.platform.parseUrl(share.url);

				const peertubeLink = `https://` + self.app.options.url + `/embedVideo.php?host=${metaInfo.host_name}&id=${metaInfo.id}&embed=true&s=${share.txid}`;

				(metaInfo.type === 'peertube') ? copycleartext(peertubeLink) : copycleartext(share.url);

				return sitemessage(self.app.localization.e('videoCopied'));
			},

			closeWindow: function() {
				self.closeContainer();
			},
		}

		var events = {

			toregistration: function(){

				self.sdk.registrations.redirect = 'post?s=' + share.txid

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})	
			
			},
			
			shareSave : function(){

				self.app.platform.ui.saveShare(share, function(id, deleted){

					if (actions.changeSavingStatus)
						actions.changeSavingStatus(share.txid, deleted)
				}, {
					before : actions.changeSavingStatusLight,
					after : actions.changeSavingStatusLight
				})
			},

			postscores: function () {
				actions.postscores()
			},

			repost: function () {
				actions.repost(share.txid);
			},

			metmenu: function () {
				var _el = $(this);
				var id = share.txid;

				self.app.platform.api.metmenu(_el, id, actions)

			},

			next: function () {

				if (el.wnd.scrollTop() + el.wnd.height() > el.wnd.find('>div#post').height() - 400) {
					actions.next()
				}


			},

			unsubscribe: function (clbk) {
				actions.unsubscribe(function () {
					if (tx)
						el.share.find('.shareTable').removeClass('subscribed');
				})
			},

			subscribePrivate: function () {

				var _el = $(this);

				var off = _el.hasClass('turnon')

				var f = 'notificationsTurnOn'

				if (off) {

					f = 'notificationsTurnOff'

				}

				self.app.platform.api.actions[f](share.address, function (tx, err) {

					if (tx) {
					}
					else {
						self.app.platform.errorHandler(err, true)
					}

				})
			},

			subscribe: function (clbk) {

				actions.stateAction(function () {

					self.app.platform.api.actions.subscribeWithDialog(share.address, function (tx, error) {
						if (tx) {
							el.share.find('.shareTable').addClass('subscribed');
						}
						else {
							self.app.platform.errorHandler(error, true)
						}

					})

				}, share.txid)


			},

			getTransaction: function () {
				self.app.platform.sdk.node.transactions.get.tx(share.txid)
			},

			like: function () {

				var value = $(this).attr('value')

				actions.stateAction(function () {

					if (!self.app.platform.sdk.address.pnet() || share.address == self.app.platform.sdk.address.pnet().address) return

					var p = $(this).closest('.stars');

					if (p.attr('value')) {


						return
					}

					p.attr('value', value)
					p.addClass('liked')

					actions.like(value, function (r) {
						if (r) {
							share.scnt || (share.scnt = 0)
							share.score || (share.score = 0)

							share.scnt++;
							share.score = Number(share.score || 0) + Number(value);

							var v = Number(share.score) / Number(share.scnt)


							p.find('.tstarsov').css('width', ((v / 5) * 100) + '%')
							p.closest('.itemwr').find('.count span.v').html(v.toFixed(1))

							renders.stars()

							if (ed.like)
								ed.like(share)

							//_scrollTo(p)
						}
						else {
							p.removeAttr('value')
							p.removeClass('liked')
						}
					})
				}, share.txid)


			},

			complain: function () {

				dialog({
					html: self.app.localization.e('e13148'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),

					success: function () {
						el.share.addClass('complained')

						topPreloader(30);

						actions.complain(function (r) {
							topPreloader(100);
							if (!r) {
								p.removeClass('hidden')
							}
						})
					}
				})


			},

			openGallery: function () {
				var src = $(this).attr('i')

				actions.openGalleryRec(src)
			},

			sharesocial: function () {
				actions.sharesocial()
			},

			donate: function () {
				actions.donate()
			},

			clickOut: function(e) {
				const clickedElem = $(e.target);

				const isClickOut = (clickedElem.hasClass('wndcontent'));

				if (!isClickOut) {
					return;
				}

				actions.closeWindow();
			}
		}

		var renders = {
			comments: function (clbk) {
				if ((!ed.repost || ed.fromempty) && ed.comments != 'no') {
					
					self.fastTemplate(
						'commentspreview',
						function (rendered) {
							var _el = el.c.find('.commentsWrapper');

							var rf = '';

							if (self.app.platform.sdk.address.pnet()) {
								rf = '&ref=' + self.app.platform.sdk.address.pnet().address;
							}

							var url =
								'https://' + self.app.options.url + '/' +
								(ed.hr || 'index?') +
								's=' +
								share.txid +
								'&mpost=true' +
								rf;

							if (parameters().address) {
								url += '&address=' + (parameters().address || '');
							}

							var checkvisibility = app.platform.sdk.node.shares.checkvisibility(share);

							self.nav.api.load({
								open: true,
								id: 'comments',
								el: _el,

								eid: (ed.eid || '') + share.txid + 'post',

								essenseData: {
									hr: url,
									totop: el.c,

									caption: ed.nocommentcaption ? null : rendered,
									send: function () {
										var c = el.c.find('.commentsAction .count span');

										c.html(Number(c.html() || '0') + 1);
									},
									txid: ed.commentsid || share.txid,

									reply: ed.reply,

									showall: !ed.fromempty,
									init: ed.fromempty || false,
									preview: ed.fromempty || false,

									fromtop: !ed.fromempty,
									fromempty: ed.fromempty,
									lastComment: ed.fromempty ? share.lastComment : null,
									cantsend : checkvisibility,
									additionalActions: function () {
										self.closeContainer();
									},
								},

								clbk: function (e, p) {
									actions.position();
									inicomments = p;

									if (clbk) clbk();
								},
							});
						},
						{
							share: share,
						},
					);
				} else {
					if (clbk) clbk();
				}
			},
			empty: function () {
				self.shell(
					{
						name: 'empty',
						el: el.share,
					},
					function (_p) {
						actions.position();
						el.wr.addClass('active');
					},
				);
			},
			lockedaccount: function () {
				self.shell(
					{
						name: 'lockedaccount',
						el: el.share,
					},
					function (_p) {
						actions.position();
						el.wr.addClass('active');
					},
				);
			},
			images: function (clbk) {
				var _el = el.c.find('.postcontent .image');
				var images = el.c.find('.postcontent .images');

				if (images.hasClass('active') || !_el.length || !images.length) {
					if (clbk) clbk();
				} else {


					_el.imagesLoadedPN({ imageAttr: true, debug : true }, function (image) {


						if (share.settings.v != 'a') {

							if((isMobile() || ed.repost) && image.images.length > 1){

								var aspectRatio = 0
								
								_.each(image.images, function(img){
									var _img = img.img;

									var _aspectRatio = _img.naturalHeight / _img.naturalWidth

									if(_aspectRatio > aspectRatio) aspectRatio = _aspectRatio
								})

								if (aspectRatio){

									if(aspectRatio > 1.66) aspectRatio = 1.66

									images.find('.imagesWrapper').height( Math.min( 400, images.width() )* aspectRatio)
								}
								
							}
							else{

								var imageswidth = images.width()

								_.each(image.images, function(img, n){

									var _img = img.img;
									var el = $(image.elements[n]).closest('.imagesWrapper');

									var ac = '';

									/*var _w = imagesWrapperWidth;
									var _h = imagesWrapperHeight*/

									var _w = el.width();
									var _h = el.height()

									if(_img.width > _img.height && (!isMobile() && self.app.width > 768 && !ed.openapi)){
										ac = 'w2'

										var w = _w * (_img.width / _img.height);

										if (w > imageswidth){
											w = imageswidth

											h = w * ( _img.height / _img.width) 

											el.height(h);
										}

										el.width(w);
									}

									if(_img.height > _img.width || (isMobile() || self.app.width <= 768 || ed.openapi)){
										ac = 'h2'

										el.height(_w * (_img.height / _img.width))
									}

									if(ac){
										el.addClass(ac)
									}
									
								})


							}

						}

						var isclbk = function(){


							
							images.addClass('active');

							_el.addClass('active');

							if (clbk) clbk();
						}

						if(share.settings.v != 'a' && image.images.length > 1){

							var gutter = 5;

							if (isMobile() || ed.repost) {

								images.find('.imagesContainer').owlCarousel({
									items: 1,
									dots: true,
									nav: !isMobile(),
									navText: [
										'<i class="fas fa-chevron-left"></i> ',
										'<i class="fas fa-chevron-right"></i>'
										]
								  
								});

								isclbk()

							}
							else{
								images.isotope({

									layoutMode: 'packery',
									itemSelector: '.imagesWrapper',
									packery: {
										gutter: gutter
									},
									initLayout: false
								});
	
								images.on('arrangeComplete', function(){
									isclbk()
								});
	
								images.isotope()
							}

							

							
						}
						else
						{
							isclbk()
						}

						
					});


				}
			},
			share: function (clbk) {


				var verticalVideo = false
				var squareVideo = false

				var info = {}
				var aspectRatio = 0

				if (typeof share != 'undefined') {
					info = self.app.platform.sdk.videos.storage[share.url || "undefined"] || {}
					aspectRatio = deep(info, 'data.aspectRatio') || 0
				}

				if (aspectRatio < 0.9 && aspectRatio != 0) {
					verticalVideo = true
				}

				if (aspectRatio > 0.9 && aspectRatio < 1.25) {
					squareVideo = true
				}

				

				self.shell(
					{
						turi: 'lenta',
						name: ed.video ? 'sharevideo' : share.itisarticle() ? 'sharearticle' : 'share',
						el: el.share,

						additionalActions: function () {
							self.closeContainer();
						},

						data: {
							share: share,
							all: (ed.repost && (ed.minimize || share.itisarticle()) ) ? false : true,
							mestate: {},
							repost: ed.repost,
							fromempty: ed.fromempty,
							verticalVideo: verticalVideo,
							squareVideo: squareVideo,
							preview : ed.preview
						},

						
					},
					function (_p) {

						if(!el.share) return

						el.stars = el.share.find('.forstars');	

						if (ed.repost)
							_p.el.find('.showMoreArticle, .openoriginal').on('click', function(){
								actions.openPost(share.txid)
							})

						actions.position();

						el.wr.addClass('active');

						
						if (share.itisvideo() && !ed.repost && !_OpenApi) renders.showmoreby()

						renders.stars(function () {
							renders.mystars(function () { });

							renders.url(function () {

								if(!el.share.find('.showMore').length) renders.repost();

								actions.position();

								renders.urlContent(function () {

									actions.position();
									actions.initVideo();

									renders.images(function () {


										if (!ed.repost) {

											actions.position();

											el.share.find('.complain').on('click', events.complain);

											el.share.on(
												'click',
												'.imagePostOpent',
												events.openGallery,
											);
											el.share.on('click', '.forrepost', events.repost);

											el.share.find('.shareSave').on('click', events.shareSave);

											el.share.find('.toregistration').on('click', events.toregistration)

											el.share.find('.txid').on('click', events.getTransaction);
											el.share.find('.donate').on('click', events.donate);
											
											el.share
												.find('.asubscribe')
												.on('click', events.subscribe);
											el.share
												.find('.aunsubscribe')
												.on('click', events.unsubscribe);
											el.share.find('.metmenu').on('click', events.metmenu);


											el.share
												.find('.notificationturn')
												.on('click', events.subscribePrivate);
										}

										el.share.find('.sharesocial').on('click', events.sharesocial);

										el.share.find('.postscoresshow').on('click', events.postscores);

										el.share.find('.postcontent').on('click', function(){
											$(this).addClass('allshowed')
										})

										el.share.find('.openetc').on('click', function(){
											

											self.closeContainer()

											self.nav.api.load({
												open : true,
												href : 'post?s=' + $(this).attr('share'),
												inWnd : true,
												history : true
											})
										})

										el.share.closest('.wndcontent').on('click', events.clickOut);

										if (clbk) clbk();
									});

									
								});
							});
						});

						if (share.itisarticle()){
							renders.articlespart(_p.el.find('.sharearticle'))
						}


						
						
					},
				);
			},
			articlespart : function(wr){

				self.app.platform.ui.articledecoration(wr, share, true)

				
			},
			showmoreby: function () {

				var showmoreby = el.c.find('.showmorelenta')

				self.app.platform.papi.horizontalLenta(showmoreby, function (e,p) {

					external = p

				}, {
					caption : self.app.localization.e("More videos by this author"),
					author: share.address,
					video: true,
					shuffle : true,
					loaderkey : 'getusercontents',
					filter : function(_share){
						if(share.txid != _share.txid) return true
					},
					hasshares : function(shares){
						if (shares.length > 2){
							showmoreby.addClass('hasshares')
						}
						
					},

					opensvi : function(id){

						if (ed.opensvi){
							ed.opensvi(id)
						}
						else{
							self.nav.api.load({
								open : true,
								href : 'index?video=1&v=' + id,
								history : true
							})
						}

						

						
					},

					compact : true
				})
			},
			wholike: function (clbk) {
				var wholikes = share.who || [];

				self.shell(
					{
						turi: 'lenta',
						name: 'wholike',
						el: el.share.find('.wholikes'),
						data: {
							scores: Number(share.scnt),
							wholikes: wholikes,
						},
						bgImages: {},
					},
					function (p) {
						p.el.find('.forstars .count').on('click', events.postscores);

						if (clbk) clbk();
					},
				);
			},
			mystars: function (clbk) {
				if (typeof share.myVal == 'undefined' && !ed.preview) {
					var ids = [share.txid];

					self.app.platform.sdk.likes.get(ids, function () {
						renders.stars();

						renders.wholike(clbk);
					});
				} else {
					if (clbk) clbk();
				}
			},
			stars: function (clbk) {
				self.shell(
					{
						turi: 'lenta',
						name: 'stars',
						el: el.stars,
						data: {
							share: share,
						},
					},
					function (p) {
						fastars(p.el.find('.stars'));

						el.share.find('.stars i').on('click', events.like);

						p.el.find('.count').on('click', events.postscores);

						if (clbk) clbk();
					},
				);
			},
			repost: function (clbk) {
				if (share.repost) {
					self.shell(
						{
							name: 'repost',
							el: el.c.find('.repostWrapper'),
							data: {
								repost: share.repost,
								level: level,
								share: share

								//fromrepost : ed.repost
							},
						},
						function (_p) {

							actions.position();

							if (_p.el && _p.el.length) {

								self.app.platform.papi.post(
									share.repost,
									_p.el.find('.repostShare'),
									function (e, p) {

										_repost = p;

										actions.position();
									},
									{
										repost: true,
										eid: eid + share.txid,
										level: level,
										fromempty: share.isEmpty(),
										minimize : ed.minimize || false
									},
								);
							}
						},
					);
				}
			},
			url: function (clbk) {
				var url = share.url;

				var og = self.app.platform.sdk.remote.storage[url];

				self.app.platform.sdk.videos.paddingplaceholder(url, function (next) {

					self.shell({
						turi: 'share',
						name: 'url',
						el: el.c.find('.url'),
						data: {
							url: url,
							og: og,
							share: share,
						},

						additionalActions: function () {
							self.closeContainer();
						}
					}, next)


				}, function (_p) {

					var images = _p.el.find('img');

					_p.el.find('img').imagesLoadedPN({ background: true }, function (image) {
						_.each(image.images, function (i, index) {
							if (i.isLoaded) {
								$(images[index]).addClass('active');

								if (i.img.naturalWidth > 500) {
									_p.el.addClass('bigimageinlink');
								}
							} else {
								$(images[index]).closest('.image').css('display', 'none');
							}
						});

						if (clbk) clbk();
					});
				})


			},
			urlContent: function (clbk) {
				var url = share.url;

				if (url) {
					var meta = self.app.platform.parseUrl(url);
					var og = self.app.platform.sdk.remote.storage[url];

					if (url && !og) {
						if (
							meta.type == 'youtube' ||
							meta.type == 'vimeo' ||
							meta.type == 'bitchute' ||
							meta.type == 'peertube'
						) {
							if (clbk) clbk();
						} else {
							self.app.platform.sdk.remote.get(url, function (og) {
								if (og) {
									renders.url(clbk);
								} else {
									if (clbk) clbk();
								}
							});
						}
					} else {
						if (clbk) clbk();
					}
				} else {
					if (clbk) clbk();
				}
			},

			
		};

		var state = {
			save: function () {

			},
			load: function () {

			}
		}

		var initEvents = function () {

			self.app.platform.matrixchat.clbks.SHOWING.post = function(v){
				if(v && player){

					if (player.error) return
					if (player.playing){
						player.stop()
					}

				}
				else{
					
				}
			}

			self.app.platform.ws.messages.transaction.clbks.temppost = function (data) {

				if (data.temp) {

					if (share.txid == data.temp.txid) {

						share.temp = false
						share.scnt = "0"
						share.score = "0"
						share.myVal = 0

						renders.share()


					}

				}

			}

			self.app.platform.ws.messages.event.clbks.post = function (data) {

				if (data.mesType == 'upvoteShare' && data.share) {

					if (share.txid == data.share.txid) {
						renders.stars(function () {

						})
					}



				}

			}

			self.app.platform.clbks.api.actions.subscribePrivate.post = function (address) {

				if (address == share.address) {

					el.c.find('.shareTable[address="' + address + '"]').addClass('subscribed');

					var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

					if (me) {
						var r = me.relation(address, 'subscribes')

						el.c.find('.shareTable[address="' + address + '"] .notificationturn').removeClass('turnon')

						if (r && (r.private == 'true' || r.private === true)) {
							el.c.find('.shareTable[address="' + address + '"] .notificationturn').addClass('turnon')
						}
						else {
							el.c.find('.shareTable[address="' + address + '"] .notificationturn').removeClass('turnon')
						}
					}

					remake()
				}

			}

			self.app.platform.clbks.api.actions.subscribe.post = function (address) {

				if (address == share.address) {

					el.c.find('.shareTable[address="' + address + '"]').addClass('subscribed');
					el.c.find('.shareTable[address="' + address + '"] .notificationturn').removeClass('turnon')
				
					remake()
				}


			}

			self.app.platform.clbks.api.actions.unsubscribe.post = function (address) {

				if (address == share.address) {

					el.c.find('.shareTable').removeClass('subscribed');
					el.c.find('.shareTable[address="' + address + '"] .notificationturn').removeClass('turnon')
				
					remake()
				}
			}

		}

		var remake = function(){
			if (inicomments)
				inicomments.destroy()

			if (player) {

				if (player.destroy) player.destroy()

				player = null
			}


			if (_repost) {
				_repost.destroy();

				_repost = null;
			}

			make()
		}

		var make = function () {

			if (share) {

				if(self.app.platform.sdk.user.reputationBlockedNotMe(share.address)){

					renders.lockedaccount()
					
				}
				else{
					renders.share(function () {
						renders.comments(function () {
						})
					})
				}

				

			}
			else {
				renders.empty()
			}


		}

		var getshareprominitialp = function(id, share, clbk){


			if(share){
				clbk(share)
			}
			else{
				self.app.platform.sdk.node.shares.getbyid([id], function () {

					var share = self.app.platform.sdk.node.shares.storage.trx[id]

					clbk(share)

				})
			}
		}

		return {
			primary: primary,

			getdata: function (clbk, p) {

				_repost = null

				eid = p.settings.eid || ''

				var id = deep(p, 'settings.essenseData.share') || parameters().s;

					ed = deep(p, 'settings.essenseData') || {};

				share = null;

				level = (ed.level || -1) + 1

				getshareprominitialp(id, deep(p, 'settings.essenseData.shareobj'), function(_share){

					share = _share

					if (!share) {

						var temp = _.find(self.sdk.node.transactions.temp.share, function (s) {
							return s.txid == id
						})

						if (temp) {
							share = new pShare();
							share._import(temp, true);
							share.temp = true;
							share.address = self.app.platform.sdk.address.pnet().address
						}

					}

					if (share) {
						self.app.platform.sdk.node.shares.users([share], function (l, error2) {

							var data = {
								ed: deep(p, 'settings.essenseData') || {},
								share: share
							};

							self.app.platform.sdk.videos.info([share.url]).then(r => {
								clbk(data);
							})

						})
					}

					else{

						clbk({
							ed,
							share,
							notfound : true
						});

					}
				})

				
			},

			authclbk: function () {
				if (typeof el != 'undefined' && el.c) {

					actions.authclbk()

				}
			},

			destroy: function (key) {
				el = {};

				if (external){

					external.destroy()
					external = null

				}

				self.app.actions.playingvideo(null)
				
				self.app.el.menu.find('#menu').removeClass('static')

				if (ed.close) ed.close()

				if (inicomments)
					inicomments.destroy()

				delete self.app.platform.ws.messages.event.clbks.post

				delete self.app.platform.ws.messages.transaction.clbks.temppost
				delete self.app.platform.clbks.api.actions.subscribePrivate.post
				delete self.app.platform.clbks.api.actions.unsubscribe.post
				delete self.app.platform.clbks.api.actions.subscribe.post
				delete self.app.platform.matrixchat.clbks.SHOWING.post

				authblock = false;

				if (player) {

					if (player.playing){
						player.stop()
					}

					if (player.destroy) player.destroy()

					player = null
				}


				if (_repost) {
					_repost.destroy();
					_repost = null;
				}

			},

			clearparameters: ['s', 'commentid', 'parentid'],

			init: function (p) {

				p.clbk(null, p);

				if(!share) return

				state.load();

				el = {};
				el.c = p.el.find('.poctelc');
				el.share = el.c.find('.share');
				el.wr = el.c.find('.postWrapper')
				el.wnd = el.c.closest('.wndcontent');

				
				if(share.itisarticle()){
					el.c.closest('.wnd').addClass('articlewindow')
					el.c.addClass('sharec')
				}

				make()

				if (ed.video && !window.cordova && !isTablet() && !isMobile())
					self.app.el.menu.find('#menu').addClass('static')

				initEvents();
			},

			wnd: {
				class: 'withoutButtons postwindow normalizedmobile',
			}
		}
	};

	self.authclbk = function () {
		_.each(essenses, function (e) {
			e.authclbk()
		})
	}


	self.run = function (p) {

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function () {

		_.each(essenses, function (essense) {

			essense.destroy();

		})

	}

	return self;
})();


if (typeof module != "undefined") {
	module.exports = post;
}
else {

	app.modules.post = {};
	app.modules.post.module = post;

}