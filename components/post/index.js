
if (typeof _OpenApi == 'undefined') {
	_OpenApi = false
}

var post = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = (p.history && !p.inWnd) || p.primary;

		var el = {}, share, ed = {}, recommendationsenabled = false, inicomments, eid = '', _repost = null, level = 0, external = null, recommendations = null, bannerComment, showMoreStatus = false;
		var allcontentenabled = false
		var allcontentenabledvideo = false
		var progressInterval;

		var videoinfoupdateInterval = null

		var player = null

		var chat = null

		var authblock = false;

		var actions = {

			getpaidsubscription : function(){
				self.app.platform.sdk.user.stateAction(() => {
					self.app.nav.api.load({
						open : true,
						href : 'getpaidsubscription',
						inWnd : true,
						history : true,
	
						essenseData : {
							address : share.address,
						},
	
						clbk : function(){
							if (clbk)
								clbk()
						}
					})
				})
			},

			translate : function(dl){
				return self.app.platform.sdk.translate.share.request(share.txid, dl).then((r) => {
					self.app.platform.sdk.translate.share.set(share.txid, dl)

					actions.actualText()
					
				}).catch(e => {

					console.error(e)

					sitemessage(self.app.localization.e('unabletotranslate'))

					return Promise.resolve()
				})
			},

			actualText : function(){

				if(share.itisarticle()){
					make()
					return
				}

				var _el = el.c.find('.shareTable[stxid="'+share.txid+'"] >div.cntswrk.postcontent')

				var translated = self.app.platform.sdk.translate.share.get(share.txid) || {}

				var c = findAndReplaceLink(share.renders.caption(translated.c, translated.m), true)
				var m = share.renders.message(translated.c, translated.m);
				if(!showMoreStatus && ed.repost) m = trimHtml(m, 750, 15);
				var nm = self.app.actions.emoji(nl2br(findAndReplaceLink(m, true)))

				window.rifticker.add(() => {

					_el.find('.sharecaption span').html(c)

					_el.find('.message').html(nm)

					self.nav.api.links(null, _el.find('.message'));
					self.nav.api.links(null, _el.find('.sharecaption'));

					if (showMoreStatus && ed.repost){
						_el.find('.showMore,.showMorePW').remove()
					}
				
				})
			},

			removeFromCollection: function(){
				self.app.platform.sdk.collections.removeItem(share.txid)
			},

			addToCollection : function(){
				self.app.platform.sdk.collections.addItem(share.txid)
			},

			unblock : function(){
					
				self.app.platform.api.actions.unblocking(share.address, function (tx, error) {
					if (!tx) {
						self.app.platform.errorHandler(error, true)
					}
				})
				
			},

			stopPlayer : function(){

				if(!player || player.error) return

				if (player.p){
					player.p.muted = true;

					if (player.p.playing){
						player.p.stop()
					}
				}
				
			},

			pkoin : function(format){

				var type = format === 'liftUpThePost' ? 'boost' : 'pkoin';

				if (share){

					self.app.platform.sdk.user.stateAction(() => {
	
						var userinfo = self.psdk.userInfo.getShortForm(share.address)
	
						self.nav.api.load({
							open : true,
							href : 'pkoin',
							history : true,
							inWnd : true,
		
							essenseData : {
								userinfo: userinfo,
								id : share.txid,
								format : format,
								type : type
							}
						})

		
	
					})


				}

			},


			openPost : function(id, clbk){

				self.closeContainer()

				
				var share = self.psdk.share.get(id) 

				setTimeout(() => {
					self.nav.api.load({
						open : true,
						href : share.itisstream() ? 'index?video=1&v=' + id : 'post?s=' + id,
						inWnd : share.itisstream() ? false : true,
						history : true
					})
				}, 200)
				

			},

			changeSavingStatus : function(shareId, deleted){

				if(self.app.playingvideo && !deleted) return
		
				renders.share()
			},

			changeSavingStatusLight : function(share){

				if (el.c){
					const status = self.app.platform.sdk.localshares.status(share.txid);
					const isSaving = (status === 'saving');

					const shareSaveElem = el.c.find('.shareSave');

					if (isSaving) {
						const loadingBarHolderElem = el.c.find('.loadingBar');
						const loadingBarElem = el.c.find('.loading-bar');

						if (!loadingBarElem || loadingBarElem.length <= 0)
							return;
						const lb = new LoadingBar(loadingBarElem[0]);
						if (progressInterval) clearInterval(progressInterval);
						// Watch progress and update progress bar
						progressInterval = setInterval(async function() {
							const progress = await self.app.platform.sdk.localshares.videoDlProgress(share.txid);
							if (progress != undefined && progress.progress >= 1)
								clearInterval(progressInterval);
							if (progress != undefined && !isNaN(progress.progress))
								lb.setValue(progress.progress * 100);
						}, 500);

						loadingBarHolderElem.removeAttr('hidden');
						shareSaveElem.attr('hidden', '');
						return;
					}

					shareSaveElem.attr('status', status);
				}

			},

			authclbk: function () {
				authblock = true;

				var id = share.txid

				self.app.platform.sdk.node.shares.getbyid(id, function () {

					share = self.psdk.share.get(share.txid)
					

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

					var me = self.psdk.userInfo.getmy()

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

			gotocomments : function(){
				_scrollTo(el.c.find('.articleend'), el.c.closest('.customscroll'))
			},
			postscores: function (clbk) {

				self.app.platform.sdk.user.stateAction(() => {

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

				})

			},

			repost: function (shareid) {

				self.app.platform.sdk.user.stateAction(() => {

					self.app.platform.ui.share({
						repost : shareid
					})

				})

			},

			sharesocial: function (clbk) {
				var url = 'https://' + self.app.options.url + '/' + ('post?') + 's=' + share.txid

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

				var userinfo = self.psdk.userInfo.getShortForm(share.address)

				var link = 'send?address=' + share.address + '&amount=1'
					+ '&label=' + (userinfo.name || userinfo.address) + '&setammount=true'


				self.fastTemplate('donation', function (rendered) {
					new dialog({
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

				var h = self.app.height;

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

						television : app.television,
						fullscreenchange : self.app.mobile.fullscreenmode,

						play : function(){


							//if(!p.pip)
								self.app.actions.playingvideo(player)

							if(isMobile() && !ed.repost && !el.c.closest('.wndcontent').length && !ed.openapi){
								//self.app.actions.scroll(70)
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
							self.app.actions.playingvideo(null, player)
						},

						playbackStatusUpdate : function({
							position,
							playbackState,
							duration
						}){
							//// interest score later

							if (duration > 0 && playbackState == 'playing')
								self.app.platform.sdk.memtags.add(share.tags, null, 0.500 / duration)

							if(playbackState == 'playing' && ((position > 15 && duration > 120) || startTime)){

								self.app.platform.sdk.videos.historyset(share.txid, {
									time : position,
									percent : ((position/duration) * 100).toFixed(0),
									data: share.export(true)
								})

								self.app.platform.sdk.activity.adduser('video', share.address, 6 * position / duration, share)
								return
							}
							if(playbackState == 'playing' && duration < 120 && position / duration > 0.2){
								self.app.platform.sdk.activity.adduser('video', share.address, 6 * position / duration, share)
							}
						},

						error : function(error){
							const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
							const payload = {
								...error,
								rtt: connection.rtt || 'Undefined',
								connection: connection.effectiveType || 'Undefined',
								mobile: isMobile(),
								location: 'IN_POST',
								video: share.url,
							};

							self.app.Logger.error({
								err: 'VIDEO_LOADING_ERROR',
								videoErrorId: share.url,
								videoErrorType: error.details,
								payload: {
									...payload,
								},
								code: 611,
								level: 'warning',
							});
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


							if(!el.c) {
								_player.destroy()
								return
							}

							player = _player

							if(player){
								if (wa) {

									player.play()
	
									if (player.setVolume){

										player.setVolume((window.cordova && !self.app.television) ? self.sdk.videos.volume : 1)
										
									}
										
									else{
										player.muted = false
									}

									player.muted = false

								}

								console.log('muted', player)

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
				var reputation = self.psdk.userInfo.getShortForm(share.address).reputation

				if (checkvisibility && reputation >= 50) return


				if(value <= 3 && !self.app.test){
					if(self.app.platform.sdk.user.scamcriteria()){

						if (clbk)
							clbk(false)

							new dialog({
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

				if (self.app.platform.sdk.user.reputationBlockedMe()){
					sitemessage(self.app.localization.e('lockedaccount'))
					if (clbk)
							clbk(false)

					return
				}

				var upvoteShare = share.upvote(value);

				if(!upvoteShare) {
					self.app.platform.errorHandler('4', true)

					if (clbk)
						clbk(false)

					return
				}

				if (value == 5){
					setTimeout(function(){
						if(!el.c) return

						if (inicomments)
							inicomments.showBanner(inicomments);

						self.app.platform.effects.templates.commentstars(el.c, value, function(){
							if (inicomments){
								inicomments.attention(self.app.localization.e('starssendcomments'))
							}
						})
					}, 300)
					
				}

				if (value === "1"){

					self.app.platform.ui.showCommentBanner(el.c, (c) => {
						bannerComment = c
					}, share.address, true);

				}

				self.app.platform.sdk.upvote.checkvalue(value, function(){

					self.app.platform.actions.addActionAndSendIfCan(upvoteShare).then(action => {
						if (clbk)
							clbk(true)
					}).catch(e => {

						self.app.platform.errorHandler(e, true)

						if (clbk)
							clbk(false)

						
					})

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

			translateto: function(e){

				var _el = $(this)

				var dl = _el.attr('dl')

				var active = _el.hasClass('active')

				var l = _el.closest('.translateApi').find('.loading')

				if (l.length) return

				_el.closest('.translateApi').find('.translateto').removeClass('active')

				if(!active){
					_el.addClass('loading')

					actions.translate(dl).then(() => {
						_el.removeClass('loading')
						_el.addClass('active')
					})
				}

				e.preventDefault()
				return false
				
			},

			gotouserprofile : function(){
				var name = $(this).attr('name')
				var address = $(this).attr('address')

				self.nav.api.load({
					open : true,
					href : name ? name : 'authorn?address=' + address,
					history : true
				})
			},

			pkoin : function(){

				actions.pkoin('sendToAuthor')

			},

			boost : function(){

				actions.pkoin('liftUpThePost')

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

			gotocomments : function(){
				actions.gotocomments()
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

				self.app.platform.sdk.user.stateAction(() => {

					self.app.platform.api.actions.subscribeWithDialog(share.address, function (tx, error) {
						if (tx) {
							el.share.find('.shareTable').addClass('subscribed');
						}
						else {
							self.app.platform.errorHandler(error, true)
						}

					})

				})


			},

			getTransaction: function () {
				self.app.platform.sdk.node.transactions.get.tx(share.txid)
			},

			like: function () {

				var value = $(this).attr('value')

				self.app.platform.sdk.user.stateAction(() => {

					if (share.address == self.app.user.address.value) return

					var p = $(this).closest('.stars');

					if (p.attr('value')) {
						return
					}

					if(self.app.platform.sdk.user.myaccauntdeleted()){
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
				})


			},

			complain: function () {

				new dialog({
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
				actions.closeWindow();
			}
		}

		var renders = {

			maybechangevisibility : function(address, reason){

				if (share.address == address && share.visibility()) {

					if(reason && reason == 'sub' && share.visibility() != 'sub') return
					if(reason && reason == 'paid' && share.visibility() != 'paid') return

					renders.share()
				}

			},

			comments: function (clbk) {
				if ((!ed.repost || ed.fromempty) && ed.comments != 'no') {
					
					if(share.settings.c && share.url){
						var meta = window.parseVideo(share.url)
						if (meta){
							var state = window.peertubeglobalcache[meta.id]

							if (state && state.isLive){
								el.c.find('.commentsWrapper').addClass('commentsEmpty');
								if (clbk) clbk();
								return
							}
						}
					}
				
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
									receiver: share.address,
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

						var mw = self.app.width <= 768

						_el.imagesLoadedPN({ imageAttr: true, debug : true }, function (image) {


							if (share.settings.v != 'a') {

								if((mw || ed.repost) && image.images.length > 1){

									
									_.each(image.images, function(img, n){
										var _img = img.img;

										var el = $(image.elements[n]).closest('.imagesWrapper');

										var aspectRatio = _img.naturalHeight / _img.naturalWidth

										if(aspectRatio > 1.66) aspectRatio = 1.66

										window.rifticker.add(() => {
											el.height( Math.min( self.app.height / 1.5, images.width() || self.app.width) * aspectRatio)
										})
									})

								
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

										if(_img.naturalWidth >= _img.naturalHeight && (image.images.length == 1 || ed.openapi)){
											ac = 'w2'

											var w = _w * (_img.naturalWidth / _img.naturalHeight);

											if (w > imageswidth){
												w = imageswidth

												h = w * ( _img.naturalHeight / _img.naturalWidth)
												window.rifticker.add(() => {
													el.height(h);
												})
											}

											window.rifticker.add(() => {
												el.width(w);
											})
										}

										if(_img.naturalHeight >= _img.naturalWidth && (image.images.length == 1 || ed.openapi)){
											ac = 'h2'
											window.rifticker.add(() => {
												el.height(_w * (_img.naturalHeight / _img.naturalWidth))
											})
										}

										if(ac){
											window.rifticker.add(() => {
												el.addClass(ac)
											})
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

								if (mw || ed.repost) {


									new carousel(images, '.imagesWrapper', '.imagesContainer')

									isclbk()

								}
								else{
									images.addClass('manyImagesView')
									isclbk()
									
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
							preview : ed.preview,
							jury : ed.jury
						},

						
					},
					function (_p) {


						if(!el.share) return

						el.stars = el.share.find('.forstars');

						_p.el.find('.boost').on('click', events.boost)
						_p.el.find('.pkoin').on('click', events.pkoin)
						_p.el.find('.gotouserprofile').on('click', events.gotouserprofile)
						_p.el.find('.unblockbutton').on('click', function(){
							actions.unblock()
						})

						_p.el.find('.removeFromCollection').on('click', function(){
							actions.removeFromCollection()
						})

						_p.el.find('.addToCollection').on('click', function(){
							actions.addToCollection()
						})


						_p.el.find('.translateto').on('click', events.translateto)

						if (ed.repost){
							_p.el.find('.showMore').on('click', function(e){

								showMoreStatus = true
								actions.actualText()

								e.preventDefault()
								return false

							})

							_p.el.find('.openoriginal').on('click', function(){
								actions.openPost(share.txid)
							})

						
						}
							

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

											el.share.find('.getpaidsubscription').on('click', actions.getpaidsubscription);

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
										el.share.find('.gotocomments').on('click', events.gotocomments);

										

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

										var checkvisibility = self.app.platform.sdk.node.shares.checkvisibility(share)

										if (checkvisibility == 'paid_check'){

											self.app.platform.sdk.paidsubscription.checkvisibilityStrong(share.address).then(r => {
												console.log("checkvisibilityStrong", r)
											}).catch(e => {
												console.error('checkvisibilityStrong', e)
											})

										}

										function initOutsideClickEvent(e) {
											if(share.itisarticle()) return

											let isOutside = false;

											el.share.closest('.wndcontent').on('mousedown', e => {
												isOutside = e.target.classList.contains('wndcontent');
											});

											el.share.closest('.wndcontent').on('mouseup', e => {
												if (isOutside) {
													events.clickOut(e);
												}

												isOutside = false;
											});
										}

										initOutsideClickEvent();

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
				
				if (typeof share.myVal == 'undefined' && !ed.preview && !ed.repost) {
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
						ignorelinksandimages : true,
						animation : false,	
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

					var images = _p.el.find('.ogimage');

					images.imagesLoadedPN({ background: true }, function (image) {
						_.each(image.images, function (i, index) {
							if (i.isLoaded) {
								$(images[index]).addClass('active');

								if (i.img.naturalWidth > 500) {
									_p.el.addClass('bigimageinlink');
								}

								$(images[index]).on('click', function(){
									var src = $(this).attr('src')
		
									self.app.platform.ui.images(src)
								})

							} else {
								$(images[index]).closest('.image').css('display', 'none');
							}
						});

						
					}, self.app);

					_p.el.find('.tipsforstream').on('click', function(){
						var shareId = $(this).closest('.shareTable').attr('stxid');

						var share = self.psdk.share.get(shareId) 

						if(!share) return

						if(share.itisstream()){
							actions.openPost(shareId)
						}
					})


					if (share.itisstream()){

						

						videoinfoupdateInterval = setInterval(() => {

							self.app.platform.sdk.videos.info([share.url], true).then(r => {
								checkmedia()
							})

						}, 60 * 1000)


						var checkmedia = function(){

							var info = app.platform.sdk.videos.storage[share.url]

							if (info && info.data){
								if (info.data.isLive){
									_p.el.find('.statswrapperExtended .number').html(info.data.viewers || 0)

									return
								}
								else{

								}
							}

							if(videoinfoupdateInterval){
								clearInterval(videoinfoupdateInterval)
								videoinfoupdateInterval = null
							}
						}

						checkmedia()

					}


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
							meta.type == 'peertube' ||
							meta.type == 'ipfs'
						) {
							if (clbk) clbk();
						} else {

							self.app.platform.sdk.remote.getnew(url).then(og => {
								if (og) {
									renders.url(clbk);
								} else {
									if (clbk) clbk();
								}
							})
							
						}
					} else {
						if (clbk) clbk();
					}
				} else {
					if (clbk) clbk();
				}
			},
			
			stream : function(clbk) {

				if(!el.stream) return

				const
					parent = el.stream.parent(),
					toggle = parent.find('.toggle'),
					setText = () => {
						let state = self.app.localization.e('hide');

						if (parent.hasClass('chat-hidden')) {
							state = self.app.localization.e('showhiddenComment');
						}

						toggle.text(`${ state } ${ self.app.localization.e('startchat') }`);
					};

				self.app.platform.sdk.user.get(function(u){
					if (u.hasOwnProperty('address') && share?.settings?.c) {
						if (typeof self?.app?.platform?.matrixchat?.core?.renderChatToElement === 'function') {
							parent.addClass('chat-ready');
							setText();

							toggle.on('click', function (e) {
								e.preventDefault();

								parent.toggleClass('chat-hidden');
								setText();
							});

							self.app.platform.matrixchat.core.renderChatToElement(
								el.stream[0],
								share.settings.c, /*RoomID*/
								{
									style: 'stream',
									videoUrl: share.url,
									authorId: share.address
								}
							)
								.then((_chat) => {
									chat = _chat;
									
								})
								.catch(e => {
									if (e) console.error(e);
								});
							
							if(clbk) clbk();
						} else {
							setTimeout(() => renders.stream(clbk), 1000);
						}
					} else {
						// You can not see stream chat unlogged
					}
				})
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

					startload: true,

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


			/*self.app.platform.matrixchat.clbks.SHOWING.post = function(v){
				if(v && player){

					if (player.error) return
					if (player.playing){
						player.stop()
					}

				}
				else{
				
				}
			}*/

			/*self.app.platform.ws.messages.transaction.clbks.temppost = function (data) {

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

			}*/

			self.app.platform.sdk.paidsubscription._clbks.updatepaiddata[eid] = function(address){
				renders.maybechangevisibility(address, 'paid')
			}


			self.app.psdk.updatelisteners[eid] = self.app.platform.actionListeners[eid] = function({type, alias, status}){

				if(type == 'upvoteShare'){

					if (share.txid == alias.share.v){

						share = self.psdk.share.get(share.txid) 

						renders.stars()
					}
				}

				

				if(type == 'contentDelete' || type == 'share'){

					if (alias.txidEdit == share.txid || share.txid == alias.txid){

						share = self.psdk.share.get(share.txid) 

						remake()
					}
					
				}

				if(type == 'blocking' || type == 'unblocking'){

					var address = alias.address.v

					if (share.address == address){

						if(type == 'blocking' || (type == 'unblocking' && status == 'rejected')){

							var addressEl = el.c.find('.shareTable').closest('.share')
								addressEl.addClass('blocking');
								actions.stopPlayer()
	
						}
	
						if(type == 'unblocking' || (type == 'blocking' && status == 'rejected')){
	
							var addressEl = el.c.find('.shareTable').closest('.share')
								addressEl.removeClass('blocking');
								actions.stopPlayer()
						}

					}
					
				}

				if(type == 'unsubscribe' || type == 'subscribe' || type == 'subscribePrivate'){
					actions.subscribeLabel(alias.address.v)
					renders.maybechangevisibility(alias.address.v, 'sub')
				}
				
			}

		}

		var remake = function(){
			if (inicomments)
				inicomments.destroy()

			if (player) {

				if (player.playing){
					self.app.actions.playingvideo(null, player)
				}

				if (player.destroy) 
					player.destroy()

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

				if(self.app.platform.sdk.user.reputationBlockedNotMe(share.address) && !ed.jury){

					renders.lockedaccount()
					
				}
				else{

					

					renders.share(function () {

						renders.comments()

						if (share.itisvideo())
							actions.changeSavingStatusLight(share);

						if (share.itisvideo() && !ed.repost && !p.pip && recommendationsenabled && !_OpenApi && !ed.openapi) {
							
							renders.stream();
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

					var share = self.psdk.share.get(id) 

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
						share = self.psdk.share.get(id) 
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
				if (chat) {
					chat.destroy();
					chat = null
				}

				if (el.stream)
					el.stream.empty();
				
				if (external){
					external.destroy()
					external = null
				}

				if (recommendations){
					recommendations.destroy()
					recommendations = null
				}

				if (progressInterval) clearInterval(progressInterval);
				if (videoinfoupdateInterval) clearInterval(videoinfoupdateInterval) 

				videoinfoupdateInterval = null

				//self.app.actions.playingvideo(null)
				
				//self.app.el.menu.find('#menu').removeClass('static')

				if (ed.close) ed.close()

				if (inicomments)
					inicomments.destroy()


				delete self.app.platform.matrixchat.clbks.SHOWING.post
				delete self.app.platform.actionListeners[eid]
				delete self.app.psdk.updatelisteners[eid]
				delete self.app.platform.sdk.paidsubscription._clbks.updatepaiddata[eid]

				authblock = false;
				showMoreStatus = false;

				if (player) {

					if (player.playing){
						self.app.actions.playingvideo(null, player)
					}

					if (player.destroy) {
						player.destroy()
					}

					player = null
					
				}


				if (_repost) {
					_repost.destroy();
					_repost = null;
				}


				if (el.c) 
					el.c.empty()

				el = {};
				ed = {}

				if(allcontentenabled){
					window.rifticker.add(() => {
						self.app.el.html.removeClass('allcontent')
						self.app.mobile.statusbar.background()
					})
				}

				if(allcontentenabledvideo){
					window.rifticker.add(() => {
						self.app.el.html.removeClass('allcontentvideo')
					})
				}
				
				allcontentenabledvideo = false
				allcontentenabled = false

			},

			clearparameters: ['s', 'v', 'commentid', 'parentid'],

			init: function (p) {

				p.clbk(null, p);

				if(!share) return

				state.load();

				el = {};
				el.c = p.el.find('.poctelc');
				el.stream = el.c.find('.stream-placeholder');
				el.reco = el.c.find('.recomandationsbgwrapper');
				el.share = el.c.find('.share');
				el.wr = el.c.find('.postWrapper')
				el.wnd = el.c.closest('.wndcontent');

				allcontentenabled = false
				allcontentenabledvideo = false
				
				
				if (share.itisarticle()){
					el.c.closest('.wnd').addClass('articlewindow')
					el.c.addClass('sharec')
				}

				if(share.itisvideo() && !p.pip){
					self.app.actions.closepip()
				}

				make()

				if(share && !p.inWnd && share.itisarticle() && !ed.repost && !ed.removemargin){

					allcontentenabled = true

					window.rifticker.add(() => {
						self.app.el.html.addClass('allcontent')
						self.app.mobile.statusbar.topfadebackground()
					})
				}

				if(share && !p.inWnd && share.itisvideo() && self.app.television && !ed.repost){

					allcontentenabledvideo = true

					window.rifticker.add(() => {
						self.app.el.html.addClass('allcontentvideo')
					})
				}

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
				onclose : p.onclose,
				stopvideo : true
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

			if(!essense.pip){
				window.rifticker.add(() => {
					essense.destroy();
				})
			}

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
