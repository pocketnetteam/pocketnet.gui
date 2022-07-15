
if (typeof _OpenApi == 'undefined') {
	_OpenApi = false
}

var post = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = (p.history && !p.inWnd) || p.primary;

		var el = {}, share, ed = {}, recommendationsenabled = false, inicomments, eid = '', _repost = null, level = 0, external = null, recommendations = null;

		var player = null

		var authblock = false;

		var actions = {

			pkoin : function(id){

				if (share){

					actions.stateAction(function(){

						self.app.platform.sdk.node.transactions.get.balance(function(amount){

							var balance = amount.toFixed(3);
	
							var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
								address : share.address,
								addresses : [],
							}
		
							self.nav.api.load({
								open : true,
								href : 'pkoin',
								history : true,
								inWnd : true,
			
								essenseData : {
									userinfo: userinfo,
									id : share.txid
								}
							})
	
						})
	
					}, share.txid)


				}

			},


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

				if(!el.wr) return

				if (self.app.mobileview) return

				if (primary) return

				if (ed.removemargin) return

				if (share.itisarticle()) return

				var h = $(window).height();

				var wh = el.wr.height();

				var d = Math.max(Math.min((h - wh) / 2, h / 6), 20)

				if (d > 0) {
					el.wr.css('padding-top', d + 'px')
				}
				else {
					el.wr.css('padding-top', 0 + 'px')
				}

			},

			initVideoLight: function(clbk){
				//js-player-dummy

				var button = el.c.find('.initvideoplayer');

				if (button.length){

					if (button.closest && button.closest('.shareTable').attr('stxid') != (share.txid || '')) return

					button.one('click', function(){


						$(this).closest('.jsPlayerLoading').addClass('loading') 
						$(this).closest('.js-player-dummy').addClass('js-player-ini')


						actions.initVideo(function(v){

							if (player)
								player.play()

							if (clbk)
								clbk(v)

						})
					})
				}
				else {
					actions.initVideo(clbk)
				}

				button = null
			},	

			initVideo: function (clbk) {


				if(!el.c) return

				if (self.app.platform.sdk.usersettings.meta.embedvideo && !
					self.app.platform.sdk.usersettings.meta.embedvideo.value) return

				var pels = el.c.find('.js-player-ini');


				var wa =  !share.repost && !ed.repost && (((share.itisvideo() && isMobile() && !ed.openapi) || (ed.autoplay && pels.length <= 1))) ? true : false

				if (pels.length) {

					var startTime = ed.startTime || 0;

					if (!startTime && self.app.platform.sdk.videos.historyget && share.itisvideo()){

						var pr = self.app.platform.sdk.videos.historyget(share.txid)
						if (pr.percent < 95)
							startTime = pr.time
					}


					var options = {
						//autoplay : pels.length <= 1,

						light : ed.repost || false,

						resetOnEnd: true,
						muted: false,
						wautoplay: wa,
						logoType : self.app.meta.fullname,
						startTime : startTime,
						app : self.app,
						volumeChange : function(v){
							videosVolume = v

							self.sdk.videos.volume = videosVolume 

							self.sdk.videos.save()
						},

						fullscreenchange : function(v){
							self.app.mobile.fullscreenmode(v)
						},

						play : function(){

							if(!p.pip)
								self.app.actions.playingvideo(player)

							if(isMobile() && !ed.repost && !el.c.closest('.wndcontent').length && !ed.openapi){
								self.app.actions.scroll(125)
							}
						},

						pictureInPictureRequest : function(){
							self.closeContainer()

							var startTime = player && player.getPosition ? player.getPosition() : 0

							setTimeout(function(){
								self.app.platform.ui.pipvideo(share.txid, null, {
									startTime
								})
							}, 300)
							
						},	

						pause : function(){
							if(!p.pip)	
								self.app.actions.playingvideo(null)
						},

						playbackStatusUpdate : function({
							position,
							playbackState,
							duration
						}){
							if(playbackState == 'playing' && ((position > 15 && duration > 120) || startTime)){

								self.app.platform.sdk.videos.historyset(share.txid, {
									time : position,
									percent : ((position/duration) * 100).toFixed(0)
								})

							}
						},

						hlsError : function(error){
							/*if(!window.cordova)
								self.app.Logger.error({
									err: 'hlsError',
									payload: JSON.stringify(error.data),
									code: 401,
								});*/
								
						},

						useP2P : self.app.platform.sdk.usersettings.meta.videop2p.value,
						enableHotkeys : !p.pip
					};

					$.each(pels, function (key, el2) {

						var videoId = el2.getAttribute('data-plyr-video-id');

						var elem = $(el2)

						if (elem.closest && elem.closest('.shareTable').attr('stxid') != (share.txid || '')) return

						PlyrEx(el2, options, (_player) => {

							if(!el.c) return

							player = _player

							if(player){
								if (wa) {

									player.play()
	
									if (player.setVolume)
										player.setVolume(self.sdk.videos.volume)
									else{
										player.muted = false
									}
	
								}
	
								if (player.enableHotKeys && !ed.repost) player.enableHotKeys()
							}

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
				var reputation = deep(app, 'platform.sdk.usersl.storage.'+share.address+'.reputation') || 0

				if (checkvisibility && reputation >= 50) return


				if(value <= 3 && !self.app.test){
					if(self.app.platform.sdk.user.scamcriteria()){

						if (clbk)
							clbk(false)

							dialog({
								html : self.app.localization.e('ratings123'),
								btn1text :  self.app.localization.e('daccept'),
								btn2text : self.app.localization.e('ucancel'),
			
								class : 'zindex one',
			
								success : function(){
								}
							})

						return
					}

					if(self.app.platform.sdk.user.upvotevalueblockcriteria(value)){
						if (clbk)
							clbk(false)

						sitemessage(self.app.localization.e('ratingss3'))

						return
					}
				}

				

				var upvoteShare = share.upvote(value);

				if(!upvoteShare) {
					self.app.platform.errorHandler('4', true)

					if (clbk)
						clbk(false)

					return
				}

				if (value > 4){

					var reason = null

					if (self.app.platform.sdk.user.newuser()){
						reason = 'n'
					}

					if (share.scnt == '0') reason = 's'

					if (reason) {
						setTimeout(function(){
							if(!el.c) return
								self.app.platform.effects.templates.commentstars(el.c, value, function(){
									if (inicomments){
										inicomments.attention(self.app.localization.e('starssendcomment' + reason))
									}
								})
						}, 300)
					}
					
				}

				self.app.platform.sdk.upvote.checkvalue(value, function(){

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

				}, function(){
					if (clbk)
						clbk(false)
				})
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
			gotouserprofile : function(){
				var name = $(this).attr('name')
				var address = $(this).attr('address') 

				self.nav.api.load({
					open : true,
					href : name ? name : 'author?address=' + address,
					history : true
				})
			},

			pkoin : function(){

				var shareId = $(this).closest('.share').attr('id');

				actions.pkoin(shareId)

			},

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


							p.find('.tstars').css('width', ((v / 5) * 100) + '%')
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
									preview: true,
									listpreview : false,

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

									if(_img.width >= _img.height && (!isMobile() && self.app.width > 768 && !ed.openapi)){
										ac = 'w2'

										var w = _w * (_img.width / _img.height);

										if (w > imageswidth){
											w = imageswidth

											h = w * ( _img.height / _img.width) 

											el.height(h);
										}

										el.width(w);
									}

									if(_img.height >= _img.width || (isMobile() || self.app.width <= 768 || ed.openapi)){
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

						
					}, self.app);


				}
			},
			share: function (clbk) {

				self.shell(
					{
						turi: 'lenta',
						name: ed.video ? ('sharevideo' + (ed.pip ? 'pip' : '')) : share.itisarticle() ? 'sharearticle' : 'share',
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
							preview : ed.preview
						},

						
					},
					function (_p) {


						if(!el.share) return

						el.stars = el.share.find('.forstars');

						_p.el.find('.pkoin').on('click', events.pkoin)
						_p.el.find('.gotouserprofile').on('click', events.gotouserprofile)

						if (ed.repost)
							_p.el.find('.showMoreArticle, .openoriginal').on('click', function(){
								actions.openPost(share.txid)
							})

						actions.position();

						el.wr.addClass('active');

						

						renders.stars(function () {

							if(!el.share) return


							renders.mystars(function () { });

							renders.url(function () {

								if(!el.share) return



								if(!el.share.find('.showMore').length) renders.repost();

								actions.position();

								renders.urlContent(function () {

									if(!el.share) return

									actions.position();

									if(ed.repost){
										actions.initVideoLight();
									}
									else{
										actions.initVideo();
									}

									renders.images(function () {

										if(!el.share) return


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

											el.share.find('.piptest').on('click', function(){
												
												
											});

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
					loaderkey : 'getprofilefeed',
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
			
			mystars: function (clbk) {
				if (typeof share.myVal == 'undefined' && !ed.preview) {
					var ids = [share.txid];

					self.app.platform.sdk.likes.get(ids, function () {
						renders.stars(clbk);
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

						if(p.el){
							fastars(p.el.find('.stars'));

							el.share.find('.stars i').on('click', events.like);
	
							p.el.find('.count').on('click', events.postscores);
						}

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
							fullplayer : !ed.repost
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

						
					}, self.app);

					if (clbk) clbk();
					
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

			recommendations : function(clbk){

				self.app.platform.ui.recommendations(el.reco, share, {
					opensvi : ed.opensvi,
					next : ed.next,
					basecount : 20,
					startload : !p.inWnd && el.c.closest('.videomainpost').length && !isMobile(),
					beforeopen : function(){
						self.closeContainer()
					},

					el : p.inWnd ? el.c.closest('.wndcontent') : null
					
				}, function(e, p){
					recommendations = p

					if(clbk) clbk()
				})

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

						if (share.itisvideo() && !ed.repost && !p.pip && recommendationsenabled) {

							renders.recommendations();

						}
						else {
							el.reco.remove();
						}
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

			id : p.mid,
			pip : p.pip,

			independent : p.pip,

			getdata: function (clbk, p) {

				
				recommendationsenabled = true ///self.app.platform.istest()

				_repost = null

				eid = p.settings.eid || ''

				var id = deep(p, 'settings.essenseData.share') || parameters().s;

					ed = deep(p, 'settings.essenseData') || {};

				share = null;

				level = (ed.level || -1) + 1


				getshareprominitialp(id, deep(p, 'settings.essenseData.shareobj'), function(_share){

					share = _share


					if (!share) {

						share = self.app.platform.sdk.node.shares.getWithTemp(id) 

						/*var temp = _.find(self.sdk.node.transactions.temp.share, function (s) {
							return s.txid == id
						})

						if (temp) {
							share = new pShare();
							share._import(temp, true);
							share.temp = true;
							share.address = self.app.platform.sdk.address.pnet().address
						}*/

					}

					if (share) {
						self.app.platform.sdk.node.shares.users([share], function (l, error2) {

							var data = {
								ed: deep(p, 'settings.essenseData') || {},
								share: share,
								recommendationsenabled
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

				
				if (external){
					external.destroy()
					external = null
				}

				if (recommendations){
					recommendations.destroy()
					recommendations = null
				}

				self.app.actions.playingvideo(null)
				
				//self.app.el.menu.find('#menu').removeClass('static')

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


				if(el.c) el.c.empty()

				el = {};
				ed = {}

				

			},

			clearparameters: ['s', 'commentid', 'parentid'],

			init: function (p) {

				p.clbk(null, p);

				if(!share) return

				state.load();

				el = {};
				el.c = p.el.find('.poctelc');
				el.reco = el.c.find('.recomandationsbgwrapper');
				el.share = el.c.find('.share');
				el.wr = el.c.find('.postWrapper')
				el.wnd = el.c.closest('.wndcontent');

				
				
				if (share.itisarticle()){
					el.c.closest('.wnd').addClass('articlewindow')
					el.c.addClass('sharec')
				}

				if(share.itisvideo() && !p.pip){
					self.app.actions.closepip()
				}

				make()

				/*if (ed.video && p.inWnd && !self.app.mobileview)
					self.app.el.menu.find('#menu').addClass('static')*/

				initEvents();
			},

			wnd: {
				showbetter : true,
				class: 'withoutButtons postwindow nobfilter ' + (p.pip ? '' : 'normalizedmobile maxheight'),
				pip : p.pip || false,
				expand : function(){

					if(p.expand) p.expand({
						startTime : player && player.getPosition ? player.getPosition() : 0
					})

				},
				onclose : p.onclose
			},

			playerstatus : function(){

				if (player){
					return player.getState()
				}
				
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

			if(!essense.pip)
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