
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}

var lenta = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var el = {};
		var mid = p.mid;
		var making = false, ovf = false;
		var w, essenseData, recomended = [], initialized, recommended, mestate, initedcommentes = {}, canloadprev = false,
		video = false, isotopeinited = false, videosVolume = 0, fullscreenvideoShowing = null, loadedcachedHeight;

		var subloaded = false
		var subloadedindex = 0

		var boosted = [],
			boostplaces = {}

		var extra = {}, extraloading = {}, recommendations = {}, recommendationsMaking = {};

		var progress, parallax;

		var carousels = {}

		var openedPost = null
		var shareInitedMap = {},
			shareInitingMap = {},
			sharesFromSub = {},
			fullScreenVideoParallax = null,
			loading = false,
			ended = false,
			players = {},
			sharesInview = [],
			lastscroll = 0,
			ascroll = 0,
			ascrollel = null,
			newmaterials = 0,
			_reposts = {},
			fixedblock = 0,
			delay = null,
			videopaused = false,
			optimized = {},
			cachedHeight = 0,
			optimizedCount = 0,
			fullscreenvideoShowed = null;

		var countshares = 0;
		

		var beginmaterial = null;
		var beginmaterialloaded = false;

		var authblock = false;

		var renderclbkSlowMade = null

		var rc = function(){
			if(!essenseData.horizontal && el.c){
				cachedHeight = document.body.scrollHeight
			}
			
			if(essenseData.renderClbk) essenseData.renderClbk()
		}

		var dbrc = _.debounce(rc, 500)

		var essenserenderclbk = function(){

			if (isMobile()){
				dbrc()
			}
			else{
				rc()
			}
			
		}

		


		var actions = {
			destroyShare : function(share){
				if (fullscreenvideoShowed == share.txid){
					actions.exitFullScreenVideo(share.txid)
				}

				actions.destroyVideo(share)

				delete shareInitedMap[share.txid]


				if (initedcommentes[share.txid])
					initedcommentes[share.txid].destroy()

				if (carousels[share.txid]) carousels[share.txid].owlCarousel('destroy')

				delete carousels[share.txid]


				delete initedcommentes[share.txid]
				delete shareInitingMap[share.txid]
			},
			optimize : function(){
				
				if(!essenseData.optimize) return

				var isSafari = isios();

				if (isSafari) return

				var notoptimized = el.c.find('.portion:not(.optimized):not(:first-child):not(:nth-last-child(1)):not(:nth-last-child(2)):not(:nth-last-child(3))')

				var optimizationTip = el.c.find('.optimizationTip')
				var els = notoptimized.find('.share')

				if (notoptimized.length){

					self.app.blockScroll = true

					var optimizedh = 0, scrolltop = 0;

					notoptimized.each(function(){
						optimizedh += $(this).height()
					})

					els.each(function() {
						var txid = $(this).attr('id')

						var share = self.app.platform.sdk.node.shares.storage.trx[txid];

						if (share){
							actions.destroyShare(share)

							delete el.share[txid]

							optimizedCount++
						}

					})

					if (!optimizationTip.length){

						var fchild = el.c.find('.portion:first-child')

						_el = $("<div/>", {'class' : 'optimizationTip', html : ''})

						_el.insertAfter(fchild)
						
						optimizationTip = _el

						optimizedh - 150
					}

					if (isSafari){
						scrolltop = self.app.el.window.scrollTop()
					}

					notoptimized.remove()
					renders.optimizationTip(optimizationTip, optimizedCount)

					if (isSafari){
						self.app.el.window.scrollTop(scrolltop - optimizedh)
					}
					
					essenserenderclbk()

					setTimeout(()=>{
						self.app.blockScroll = false
					}, 150)

					optimizationTip = null
				}
			},

			openauthorwindow : function(address){

				self.nav.api.load({
					open : true,
					href : 'author',
					inWnd : true,
					history : true,

					essenseData : {
						address
					}
				})

			},

			subscribeunsubscribeclbk : function(address){

				var addressEl = el.c.find('.shareTable[address="'+address+'"]')

				var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

				if (me){
					var r = me.relation(address, 'subscribes') 

					if (r) {

						addressEl.addClass('subscribed');

						if((r.private == 'true' || r.private === true)){
							addressEl.find('.notificationturn').addClass('turnon')	
						}
						else{
							addressEl.find('.notificationturn').removeClass('turnon')	
						}
					}
					else{
						addressEl.removeClass('subscribed');
						addressEl.find('.notificationturn').removeClass('turnon')
					}

				}
				else{
					addressEl.removeClass('subscribed');
					addressEl.find('.notificationturn').removeClass('turnon')
				}


				renders.maybechangevisibility(address, 'sub')

				addressEl = null

			},

			changeSavingStatusLight : function(share){

				if (el && el.share && el.share[share.txid]){
					el.share[share.txid].find('.shareSave').attr('status', self.app.platform.sdk.localshares.status(share.txid))
				}

			},

			changeSavingStatus : function(shareId, deleted){

				if((self.app.playingvideo || fullscreenvideoShowed) && !deleted) return

				if(initedcommentes[shareId]){
					initedcommentes[shareId].destroy()
					delete initedcommentes[shareId];
				}	
				

				
				var share = self.app.platform.sdk.node.shares.storage.trx[shareId];

				if (share)
					actions.destroyVideo(share, true)

				if (recommended == 'saved'){

					if (el.share[shareId]) {

						if (fullscreenvideoShowed){
							actions.exitFullScreenVideo(fullscreenvideoShowed)
						}

						el.share[shareId].remove()
						el.share[shareId] = null
					}

					return
				}

				renders.share(share, function() {

					setTimeout(() => {
						events.videosInview();
						events.resize();
					}, 200);

				}, true);
			},	

			newmaterials : function(data){
				if(making || essenseData.author || essenseData.txids) return

				if(initialized && initialized.addSeconds(45) > (new Date())) {
					return
				}

				if(!data) data = {}

				if(recommended == 'sub'){
					
					shownewmaterials(data['sharesSubscr'])
				}
				else
				{

					if (data.sharesLang){
						return shownewmaterials(deep(data, 'sharesLang.' + self.app.localization.key))
					}

					if (video){
						return shownewmaterials(deep(data, 'contentsLang.video.' + self.app.localization.key))
					}

					if (essenseData.read){
						return shownewmaterials(deep(data, 'contentsLang.article.' + self.app.localization.key))
					}

					return shownewmaterials(
						(deep(data, 'contentsLang.video.' + self.app.localization.key) || 0) + 
						(deep(data, 'contentsLang.share.' + self.app.localization.key) || 0) 
					)
				}
			},

			scrollmode : function(m){
				if(m){
					$('html').addClass('scrollmodedown')
				}
				else{
					$('html').removeClass('scrollmodedown')
				}
			},

			authclbk : function(){

				authblock = true;

				var allids = _.map(shareInitedMap, function(s, id){
					return id;
				})

				self.app.platform.sdk.node.shares.getbyid(allids, function(shares){
					

					_.each(shares, function(share){
						delete share.myVal
					})

					renders.mystars(shares, function(){
						authblock = false;
					})
					
					actions.subscribeLabels()

				})				

			},

			subscribeLabels : function(){
				_.each(_.uniq(shareInitedMap, function(s){

					return s.address

				}), function(s, id){
					var share =  self.app.platform.sdk.node.shares.storage.trx[id]

					if (share){
						actions.subscribeunsubscribeclbk(share.address)
						//actions.subscribeLabel(share)
					}
				})
			},

			repost : function(shareid){

				actions.stateAction('_this', function(){

					self.app.platform.ui.share({
						repost : shareid
					})
					
				}, shareid)

			},

			cleardelay : function(){
				if(delay){
					clearTimeout(delay)
					delay = null
				}
				
				if (el.c)
					el.c.removeClass('rebuilding')
			},

			rebuilddelay : function(){


				if (el.c)
					el.c.addClass('rebuilding')

				delay = slowMade(function(){

					self.app.actions.scroll(80)

					actions.loadprev()

				}, delay, isMobile() ? 1200 : 600)	

					
			},

			loadprev : function(clbk){
				el.c.find('.shares').html('<div class="bspacer"></div>')
				el.c.removeClass('showprev')

				el.c.removeClass("sharesEnded")
				el.c.removeClass('sharesZero')

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
				}

				isotopeinited = false
				

				clearnewmaterials()	

				actions.clear()
				
				essenserenderclbk()

				self.app.actions.scroll(0)

				make(clbk);

				self.app.nav.api.history.removeParameters(['v', 's'])
			},

			clear : function(){

				countshares = 0;
				lastscroll = 0;
				fullscreenvideoShowed = null
				authblock = false;
				loading = false
				scrolling = false
				rendering = false
				prevscroll = 0
				ascroll = 0
				ascrollel = null
				beginmaterial = null
				beginmaterialloaded = false
				ended = false;
				loaded = false;
				making = false;
				newmaterials = 0;
				fixedblock = 0;
				loadedcachedHeight = 0;
				cachedHeight = 0;
				optimizedCount = 0;
				subloaded = false;
				subloadedindex = 0;

				_.each(shareInitedMap, function(s, id){
					delete self.app.platform.sdk.node.shares.storage.trx[id]
				})

				_.each(players, function(p){
					if (p.p)
						p.p.destroy()
				})

				_.each(initedcommentes, function(c){
					if (c)
						c.destroy()
				})

				_.each(_reposts, function(p){

					if (p)
						p.destroy()
				})

				_.each(extra, function(p){

					if (p)
						p.destroy()
				})

				boosted = []
				boostplaces = {}
				
				extraloading = {}
				extra = {}
				_reposts = {};
				recomended = []
				shareInitedMap = {}
				shareInitingMap = {}
				sharesFromSub = {}
				initedcommentes = {}
				players = {}
				sharesInview = []
				
			},

			next : function(txid, clbk){
				var next = nextElH(sharesInview, function(el){
					if(el.txid == txid) return true;
				})

				if (next){
					if(clbk){
						clbk(next.txid)
					}
				}
				else{
					if(ended){
						if(clbk){
							clbk(null)
						}
					}

					else{
						actions.loadmore(function(shares){
							if(clbk){
								clbk(deep(shares, '0.txid') || null)
							}
						})
					}
				}
			},

			observe : function(){

				if(essenseData.observe){

					var last = _.min(sharesInview, (s) => {
						return s.id
					})

					var first = _.max(sharesInview, (s) => {
						return s.id
					})

					//var first = _.first(sharesInview)

					if (first && last){

						var k = ''

						if(sharesFromSub[last.txid] || sharesFromSub[first.txid]){
							k = '_sub'
						}

						self.app.platform.sdk.sharesObserver.view(essenseData.observe + k, first.id, last.id)
					}

				}

			},	

			loadmore : function(loadclbk){
				actions.observe()

				load.shares(function(shares, error){


					if (error){
						making = false;
						
						//if (self.app.errors.connection()){
							el.c.addClass('networkError')
						//}

						if (self.app.errors.connectionRs()){
							self.iclbks.lenta = actions.loadmore
						}

						el.c.removeClass('loading')

						return;
					}
	
					el.c.removeClass('networkError')

					if(!shares){
					}
					else
					{
						renders.shares(shares, function(){

							renders.sharesInview(shares, function(){
								essenserenderclbk()
							})

						}, {
							index : sharesInview.length
						})
					}

					if (loadclbk)
						loadclbk(shares)

				})
			},
			includeboost : function(clbk){

				var bsts = _.filter(boosted, function(b){
					return !shareInitedMap[b.txid] && !shareInitingMap[b.txid] && !el.share[b.txid]
				})


				_.each(bsts, function(bst){
					if (bst){

						var position = null;
	
						_.find(boostplaces, function(v, i){
							if(!v){
								position = i
	
								return true
							}
						})
	
						if(position){
	
							var share = sharesInview[position]
	
							if (share && el.share[share.txid]){

									boostplaces[position] = true


									renders.shares([bst], function(){
										renders.sharesInview([bst], function(){
											
										}, {boosted : true})
									}, {
										boosted : true,
										//el : _el,
										inner : function(lel, html){

											if(isotopeinited){

												var content = $(html)
													lel.append( content ).isotope( 'appended', content )
							
											}
											else{
												var _el = $("<div/>", {'class' : 'boosted'})
													_el.insertAfter(el.share[share.txid].closest('.authorgroup'))
													_el.html(html)
											}

										},
										ignoresw : true,
									})

								_el = null
	
							}
	
							
						}
	
					}
				})

				

				
			},
			removeAdditionalByScroll : function(){

				if(ascrollel){
					var s = self.app.lastScrollTop;

					if(Math.abs(s - ascroll) > 150){
						actions.additional(ascrollel, false)
					}
				}

			},

			additional : function(el, show){
				if(show){
					el.addClass('showAdditional')
					el.find('.subscribeWrapper').fadeIn();

					ascroll = self.app.lastScrollTop;
					ascrollel = el;
					el.w.on('scroll', actions.removeAdditionalByScroll);
				}
				else
				{
					el.removeClass('showAdditional')
					el.find('.subscribeWrapper').fadeOut();
					el.w.on('scroll', actions.removeAdditionalByScroll);
				}
				
			},

			stateAction : function(link, clbk, txid){

				self.app.user.isState(function(state){

					if(state){
						clbk()
					}

					else
					{

						if (_OpenApi){

							var phref = 'https://'+self.app.options.url+'/post?openapi=true&s=' + txid
		
							if (self.app.ref){
								phref += '&ref=' + self.app.ref
							}
		
							window.open(phref, '_blank');
		
							return
						}

						self.nav.api.load({
							open : true,
							id : 'authorization',
							inWnd : true,

							essenseData : {

								fast : true,
								loginText : self.app.localization.e('llogin'),
								successHref : link,
								signInClbk : function(){

									retry(function(){

										return !authblock

									}, function(){
										if (clbk)
											clbk()
									})

									
								}
							}
						})
					}

				})
			},

			destroyVideo : function(share, nr){
				if (!players[share.txid]){
					return
				}

				if (players[share.txid].p){

					if (players[share.txid].p.playing) players[share.txid].p.pause()

					players[share.txid].p.destroy()
				}
					

				delete players[share.txid]

				if(!nr)
					renders.urlContent(share)
			},

			initVideoLight: function(share, clbk, shadow){
				//js-player-dummy

				if(!el.share[share.txid]) return

				var button = el.share[share.txid].find('.initvideoplayer')

				if (button.length){

					if (button.closest && button.closest('.shareTable').attr('stxid') != (share.txid || '')) return

					button.one('click', function(){


						$(this).closest('.jsPlayerLoading').addClass('loading') 
						$(this).closest('.js-player-dummy').addClass('js-player-ini')


						actions.initVideo(share, function(v){

							if (players[share.txid])
								players[share.txid].p.play()

							if (clbk)
								clbk(v)

						}, shadow)
					})
				}
				else {
					actions.initVideo(share, clbk, shadow)
				}

				button = null
			},	

			initVideo : function(share, clbk, shadow){

				if(!share || !share.txid || !el.share[share.txid]) return

				var pels = el.share[share.txid].find('.js-player-ini');
				var vel = el.share[share.txid].find('.videoWrapper')

				if (pels.closest('.shareTable').attr('stxid') != (share.txid || '')) return

				if(!vel.length) return

				if (shadow && !players[share.txid]){

					players[share.txid] = {
						shadow : true,
						el : vel,
						txid : share.txid
					}

					if(clbk) clbk(true)

					return
				}

				if (players[share.txid] && !players[share.txid].error && !players[share.txid].shadow){

					if(clbk) clbk(true)

					return
				}
			
				if(players[share.txid]){
					
					if (players[share.txid].fulliniting) 
						return

					players[share.txid].fulliniting = true

				}
				
				if (pels.length && pels[0].getAttribute)
				{

					var readyCallback = (player) => {

						if (players[share.txid]){
							players[share.txid].el.find('.js-player iframe').attr('disable-x-frame-options', 'disable-x-frame-options')
							players[share.txid].inited = true
						}

						if(clbk) clbk(true)
					};

					var callback = (player) => {

						if (player){
							players[share.txid] || (players[share.txid] = {})
							players[share.txid].p = player
							players[share.txid].initing = true
							players[share.txid].el = el.share[share.txid].find('.videoWrapper')
							players[share.txid].id = players[share.txid].el.attr('pid')
							players[share.txid].shadow = false

							delete players[share.txid].fulliniting

							actions.setVolume(players[share.txid])

							if (video){
								players[share.txid].preview = true
							}

							if (essenseData.enterFullScreenVideo){
								essenseData.enterFullScreenVideo = false

								actions.fullScreenVideo(share.txid, null, true)
							}
						}

						else{
							players[share.txid] = {
								error : true
							}
						}

						vel = null
						
					};

					var startTime = 0;

					if (self.app.platform.sdk.videos.historyget && share.itisvideo()){

						var pr = self.app.platform.sdk.videos.historyget(share.txid)

						if (pr.percent < 95)
							startTime = pr.time
					}

					var s = {
						muted : true,
						resetOnEnd : true,
						startTime : startTime,
						controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
						speed : {
							selected : 1,
							options: [1]
						},

						pictureInPictureRequest : function(){
							
							var player = players[share.txid].p

							self.app.actions.playingvideo(null)

							actions.exitFullScreenVideo(share.txid)

							var startTime = player && player.getPosition ? player.getPosition() : 0

							setTimeout(function(){
								self.app.platform.ui.pipvideo(share.txid, null, {
									startTime
								})
							}, 300)
						},	
						
						volumeChange : function(v){
							videosVolume = v
							self.sdk.videos.volume = videosVolume 
							self.sdk.videos.save()
						},

						fullscreenchange : self.app.mobile.fullscreenmode,

						play : function(){
							videopaused = false

							self.app.actions.playingvideo(players[share.txid].p)

							if(isMobile() && share.itisvideo() && !self.app.platform.sdk.usersettings.meta.videoautoplay2.value){
								actions.fullScreenVideo(share.txid)
							}
						},

						pause : function(){
							videopaused = true

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
									percent : ((position/duration)* 100).toFixed(0),
								})

							}
						},

						hlsError : function(error){

						},

						useP2P : self.app.platform.sdk.usersettings.meta.videop2p.value,
						enableHotkeys : true
						
					}

					if(share.settings.v == 'a'){
						s.muted = false;
						s.autoplay = false;
					}

					if(self.app.mobileview){
						s.controls = ['play', 'progress', 'current-time',  'mute', 'fullscreen']
					}	

					s.logoType = self.app.meta.fullname
					s.app = self.app
					s.light = true
					PlyrEx(pels[0], s, callback, readyCallback)

				}

				pels = null
				vel = null

			},

			openPost : function(id, clbk, video, _share, openWnd){
				var share = self.app.platform.sdk.node.shares.storage.trx[id] || _share;


				if(openWnd || essenseData.openPostInWindowMobile || (share && share.itisarticle())){

					self.app.user.isState(function(state){

						var ed = {
							share : id,
							hr : essenseData.hr,
							like : function(share){
								renders.stars(share)
							},
	
							next : function(id, _share){

								if(openedPost){
					
									if (openedPost.container)
										openedPost.container.close()
										
									else 
										openedPost.destroy()
				
									openedPost = null
								}

								
								setTimeout(function(){
									actions.openPost(id, null, video, _share)
								}, 300)
								
								

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

				}
				else
				{
					if (!shareInitedMap[id]) return
					if (shareInitingMap[id]) return

					var share = self.app.platform.sdk.node.shares.storage.trx[id];

						actions.destroyShare(share)

						
					renders.share(share, function(){
						if(clbk) clbk()
					}, true)

				}

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

			unblock : function(id, clbk){
				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if (share){
					
					self.app.platform.api.actions.unblocking(share.address, function (tx, error) {
						if (!tx) {
							self.app.platform.errorHandler(error, true)
						}
					})

					
				}
			},

			htls : function(id){
				self.app.platform.ui.wallet.send({htls : id}, function(){
					
				})
			},

			donate : function(id, clbk){
				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if (share){

					var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
						address : share.address,
						addresses : []
					}

					var t = (share.caption || share.message)

					var link = 'send?address=' + share.address + '&amount=1'
					+'&label=' + (userinfo.name || userinfo.address) + '&setammount=true'


					self.fastTemplate('donation', function(rendered){
						dialog({
							html : rendered,
							class : "one donation",

							btn1text : self.app.localization.e('dcancel'),

							clbk : function(el,d ){

								el.find('.pnetdnt').on('click', function(){
									self.nav.api.load({
										open : true,
										href : link,
										history : true
									})

									d.destroy()
								})

								el.find('.copy').on('click', function(){
									copyText($(this).closest('.address').find('.addr'))

									sitemessage(self.app.localization.e('successfullycopiedaddress'))
								})

							}
						})
					}, {
						userinfo : userinfo
					})
				

				}
			},

			pkoin : function(id){

				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if (share){
					
					actions.stateAction('_this', function(){

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
							id : id
						}
					})
	
					
	
					}, share.txid)	

				}

			},

			videoPosition : function(id){

				if (essenseData.openapi){return}

				var _el = el.share[id] 
				
				var work = _el.find('.work');

				if(!_el.hasClass('fullScreenVideo')){
					work.css('margin-top', '0px')
					return
				}

				var h = self.app.height;

				var add = 0

				if(!isMobile()) add = 100

				var wh = _el.find('.videoWrapper').height() + add;

				var d = (h - wh) / 2

				if (d > 0){
					work.css('margin-top', d + 'px')
				}
				else
				{
					work.css('margin-top', 0 + 'px')
				}

				_el = null
				work = null

			},

			fullScreenVideoMobile: function(id){
				if(!players[id]) return;

				players[id].p.fullscreen.enter();

					if(!players[id].p.playing)
						players[id].p.play()

					//players[id].p.muted = false

					actions.setVolume(players[id], videosVolume || 0.5)
			},

			opensvi : function(id){

				if (essenseData.opensvi){
					essenseData.opensvi(id, deep(self, 'app.platform.sdk.node.shares.storage.trx.' + id))
				}

				else{

					actions.openPost(id, null, true)

				}
				
			},

			fullScreenVideoParallax : function(_el, id){

				if(!_el || !self.app.mobileview){

					if (fullScreenVideoParallax) {
						fullScreenVideoParallax.clear()
						fullScreenVideoParallax.destroy()
						fullScreenVideoParallax = null
					}
						

					return
				}

				var __el = _el.find('>div.sharecnt')

				fullScreenVideoParallax = new SwipeParallaxNew({

					el : __el,

					allowPageScroll : 'vertical',

					//prop : 'padding',
	
					directions : {
						down : {
							cancellable : true,

							positionclbk : function(px){

							},

							constraints : function(e){

								//e.constrainted = true

								if (__el.scrollTop() == 0 && !self.app.fullscreenmode){
									return true;
								}
							},

							restrict : true,
							dontstop : true,
							trueshold : 20,
							clbk : function(){
								actions.exitFullScreenVideo(id)
							}
	
						}
					}
					
	
				}).init()
			},

			addRecommendationsFullScreenVideo : function(id, clbk){

				if(recommendationsMaking[id] || recommendations[id]) return

				var _el = el.share[id]
				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if(!_el || !share /*|| !self.app.platform.istest()*/){
					if(clbk) clbk()

					return
				}

				recommendationsMaking[id] = true

				setTimeout(function(){
					self.app.platform.ui.recommendations(_el.find('.extrashare'), share, {
						beforeopen : function(){

							actions.removeRecommendationsFullScreenVideo(id)

							if (fullscreenvideoShowed){
								actions.exitFullScreenVideo(fullscreenvideoShowed)
							}

							return 1
						},

						el : _el.find('.sharecnt'),
					}, function(e, p){

						recommendations[id] = p
						recommendationsMaking[id] = false
	
						if(clbk) clbk()
					})
				}, 1000)
				
			},

			removeRecommendationsFullScreenVideo : function(id){

				var _el = el.share[id]

				if(!_el || !self.app.platform.istest()){
					return
				}

				if (recommendations[id]){


					recommendations[id].clearessense()
					_el.find('.extrashare').html('')
					delete recommendations[id]
				}
			},

			fullScreenVideo : function(id, clbk, auto){

				if (fullscreenvideoShowing) { return }
				if (fullscreenvideoShowed) { return }
				if (essenseData.openapi){ return }

				fullscreenvideoShowing = id

				var _el = el.share[id]
				var share = self.app.platform.sdk.node.shares.getWithTemp(id) 
				
				//self.app.platform.sdk.node.shares.storage.trx[id];

				/*if(!share){
					var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
						return s.txid == id
					}) || (self.app.platform.sdk.relayTransactions.get().share || []).find(transaction => transaction.txid === id);

					share = new pShare();
					share._import(temp);
					share.temp = true;
					share.address = self.app.platform.sdk.address.pnet().address
				}*/


				actions.initVideo(share, function(res){

					fullscreenvideoShowing = null

					if(!res){
						return
					}
					
					if(!players[id]) return;

					self.app.actions.closepip()

					fullscreenvideoShowed = id;

					self.app.pseudofullscreenmode = true

					_el.addClass('fullScreenVideo')
				
					actions.videoPosition(id)

					actions.fullScreenVideoParallax(_el, id)

					self.app.mobile.statusbar.gallerybackground()

					self.app.nav.api.history.addParameters({
						v : id
					})

					var player = players[id]

					player.p.prepare().then(() => {

						if(!essenseData.openapi && !essenseData.second){

							lastscroll = self.app.lastScrollTop
							self.app.actions.offScroll()

						
							if(!player.p.playing && !auto){
								player.p.play()
							}

							if (player.p.enableHotKeys) player.p.enableHotKeys()
				
							
							actions.addRecommendationsFullScreenVideo(id)
						}

						actions.setVolume(players[id], videosVolume || 0.5)

						if(!essenseData.comments && !share.temp && !share.relay){

							retry(function(){
								return initedcommentes[id] || !el.c
							}, function(){

								if(el.c){
									if (initedcommentes[id]){
										initedcommentes[id].destroy()
										initedcommentes[id] = null
									}
			
									renders.comments(id, false, true)
								}	
								
							})
							
						}




						if (clbk)
							clbk()

					})

				})

			},

			exitFullScreenVideo : function(id){

				if(!fullscreenvideoShowed) return
				
				if (el.c){
					var _el = el.c.find("#" + id)

					_el.scrollTop(0)
					_el.removeClass('fullScreenVideo')	
					
					actions.videoPosition(id)
					
				}

				var player = players[id]

				if ((isMobile() || window.cordova || isTablet() || _el.find('.hiddenurl').length) && player && player.p.playing){
					player.p.pause()
				}

				if(player){

					if (player.p.disableHotKeys) player.p.disableHotKeys()

					actions.setVolume(player, videosVolume)
				}

				//player.p.muted = true;

				self.app.mobile.statusbar.background()
				self.app.pseudofullscreenmode = false

				actions.fullScreenVideoParallax(null)

				self.app.nav.api.history.removeParameters(['v'])

				self.app.actions.onScroll()

				el.w.scrollTop(lastscroll || 0)

				fullscreenvideoShowed = null;

				actions.removeRecommendationsFullScreenVideo(id)

				var share = self.app.platform.sdk.node.shares.getWithTemp(id) 

				if (share){
					if (!essenseData.comments && !share.temp && !share.relay){

						if (initedcommentes[id]){
							initedcommentes[id].destroy()
							initedcommentes[id] = null
						}
	
						renders.comments(id, false, false, true)
	
					}
	
					if(video){
						actions.destroyVideo(share)
					}
				}

				

			},

			postscores : function(txid, clbk){

				var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

				if(!share) return

				actions.stateAction('_this', function(){

					var checkvisibility = app.platform.sdk.node.shares.checkvisibility(share);

					var reputation = deep(app, 'platform.sdk.usersl.storage.'+share.address+'.reputation') || 0

					if(!checkvisibility || reputation < 50){

						self.app.nav.api.load({
							open : true,
							href : 'postscores?p=' + txid,
							inWnd : true,
							history : true,
		
							essenseData : {
								share : txid,
		
								like : function(share){
									renders.stars(share)
								},
		
							},
		
							clbk : function(){
								if (clbk)
									clbk()
							}
						})

					}

				})

			},

			like : function(obj, value, clbk){

				var checkvisibility = app.platform.sdk.node.shares.checkvisibility(obj);

				var reputation = deep(app, 'platform.sdk.usersl.storage.'+obj.address+'.reputation') || 0

				if (checkvisibility && reputation >= 50) {
					if (clbk)
						clbk(false)

					return
				}

				if(value <= 3 && !self.app.test){
					if(self.app.platform.sdk.user.scamcriteria()){
						if(clbk)
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

				self.app.platform.sdk.upvote.checkvalue(value, function(){

					var upvoteShare = obj.upvote(value);

					if(!upvoteShare){
						self.app.platform.errorHandler('4', true)	

						if(clbk)
							clbk(false)

						return
					}

					self.sdk.node.transactions.create.commonFromUnspent(

						upvoteShare,

						function(tx, error){

							topPreloader(100)

							if(!tx){				

								upvoteShare.myVal = null;	
								obj.myVal = 0;	

								self.app.platform.errorHandler(error, true)	


								if(clbk)
									clbk(false)
								
							}
							else
							{

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

			block : function(address, clbk){
				
			},	
			
			openGalleryRec : function(share, initialValue, clbk){

				var allimages = [];

				var getimages = function(share, clbk){

					_.each(share.images, function(i){
						allimages.push(i)
					})

					if(!share.repost){

						if (clbk)
							clbk()

					}

					else{

						self.app.platform.sdk.node.shares.getbyid(share.repost, function(shares){

							var s = shares[0]

							if (s){
								getimages(s, clbk);
							}
	
							else{
								if (clbk)
									clbk()
							}
						})

					}

				}

				getimages(share, function(){
					var images = _.map(allimages, function(i){
						return {
							src : i
						}
					})
	
					var num = findIndex(images, function(image){
	
						if (image.src == initialValue) return true;						
	
					})
					if(images.length >= 1 || (share.url && images.length && parseVideo(share.url).type) || !isMobile()){
	
						self.app.nav.api.load({
							open : true,
							href : 'imagegallery?i=' + share.txid + '&num=' + (num || 0),
							inWnd : true,
							history : true,
		
							essenseData : {
								initialValue : initialValue,
								idName : 'src',
								images : images,
		
								gid : share.txid
							},
		
							clbk : function(){
								if (clbk)
									clbk()
							}
						})
	
					}
				})
			},
		
			openGallery : function(share, initialValue, clbk){
				
				var images = _.map(share.images, function(i){
					return {
						src : i
					}
				})

				var num = findIndex(images, function(image){

					if (image.src == initialValue) return true;						

				})

				if(images.length > 1 || (share.url && images.length && parseVideo(share.url).type) || !isMobile()){

					self.app.nav.api.load({
						open : true,
						href : 'imagegallery?i=' + share.txid + '&num=' + (num || 0),
						inWnd : true,
						history : true,
	
						essenseData : {
							initialValue : initialValue,
							idName : 'src',
							images : images,
	
							gid : share.txid
						},
	
						clbk : function(){
							if (clbk)
								clbk()
						}
					})

				}
				
			},

			scrollToPost : function(id){
				_scrollTo($('#' + id), null, 0, -110)
			},

			videosInview : function(players, action, nvaction){	

				if(isMobile() && !self.app.platform.sdk.usersettings.meta.videoautoplay2.value) return
				
				if(fullscreenvideoShowed) return

				var ap = _.filter(players, function(p){

					if(p.inited && !p.playing && !p.stopped && p.el && !p.preview && !p.error) return true

				})

				if(ap.length){

					ap = _.filter(ap, function(p){
						return p.el
					})

					var vs = _.map(ap, function(p){
						return p.el[0]
					})
					
					var inv = inView(el.c.find('.videoWrapper'), {
					
						offset : self.app.height / 10,
						mode : 'all',
						cache : isMobile(),
						app : self.app
					})

					var id = null;

					if (inv.length > 0){

						var vel = $(inv[0]);

						id = vel.attr('pid')							

						var player = _.find(ap, function(p){
							return p.id == id
						})

						if(!id || !player) return

						if (player){

							setTimeout(function(){

								var inv = inView(vel, {
					
									offset : -100,
									mode : 'all',
									cache : isMobile(),
									app : self.app
								})

								if(inv.length){
									action(player, vel)
								}

							}, isMobile() ? 1400 : 520)
						}
						
					}

					var another = _.filter(ap, function(p){
						return p.id != id
					})

					if(another.length){
						nvaction(another)
					}
	
				}

			},
			
			

			complain : function(id){
			
				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,

					essenseData : {
						item : 'post',
						obj : self.app.platform.sdk.node.shares.storage.trx[id],

						success : function(){
							
						}
					},

					clbk : function(){
						
					}
				})
			},

			videoShare : function(share) {
				if (!share.url || !share.itisvideo()) return sitemessage('Unable to parse a video in the post');

				const metaInfo = self.app.platform.parseUrl(share.url);

				const peertubeLink = `https://`+self.app.options.url+`/embedVideo.php?host=${metaInfo.host_name}&id=${metaInfo.id}&embed=true&s=${share.txid}`;

				(metaInfo.type === 'peertube') ? copycleartext(peertubeLink) : copycleartext(share.url);

				return sitemessage(self.app.localization.e('videoCopied'));
			},

			stopPlayers : function(){
				_.each(players, function(player, id){
					actions.stopPlayer(id)
				})
			},

			stopPlayer : function(id){

				var player = players[id]

				if(!player || player.error) return

				if (player.p){
					player.p.muted = true;

					if (player.p.playing){
						player.p.stop()

						setTimeout(function(){
							videopaused = false
						}, 100)
					}
				}
				
			},

			setVolume : function(player, v){

				if(typeof v == 'undefined') v = videosVolume

				var cvv = videosVolume

				if(!player || !player.p) return

				if (player.p.setVolume){
					if (v){
						player.p.setVolume(v)
					}
					else{
						player.p.muted = true;
					}
				}
				else{
					player.p.volume = v

					
				}

				setTimeout(function(){
					videosVolume = cvv
				})
			},

			shareOptimization : function(share){
				if((players[share.txid] && players[share.txid].p) || optimized[share.txid] || !el.share[share.txid] || shareInitingMap[share.txid] || !shareInitedMap[share.txid]) return

				var __el = el.share[share.txid]

				//actions.destroyVideo(share)

				optimized[share.txid] = true

				var last = __el.find('.sharecnt')

				if (last.length){

					var h = last.height(),
						w = last.width()

					__el.html('<div class="shareSpacerOptimized" style="height:'+h+'px;width:'+w+'px"></div>')
				}
				
				
			},

			shareReturnAfterOptimization : function(share){
				if(!optimized[share.txid] || !el.share[share.txid]) return

				/*delete shareInitedMap[share.txid]
				delete shareInitingMap[share.txid]*/
				delete players[share.txid]
				delete initedcommentes[share.txid]

				renders.share(share, function(){
					delete optimized[share.txid]
				})
				
				
			},

			sharesOptimization : function(currentShare){

				var arranged = [];

				el.c.find('.share').each(function(){

					var s = self.app.platform.sdk.node.shares.storage.trx[this.getAttribute('id')]

					if (s)

						arranged.push( s )
				})


				var index = _.findIndex(arranged, function(s){
					return s.txid == currentShare.txid
				})

				if(index == -1) return

				var willoptimized = []
				var willshowed = []

				_.each(arranged, function(share, i){
					if(i > index + 5 || i < index - 5){
						willoptimized.push(share)
					}
					else{
						willshowed.push(share)
					}
				})


				_.each(willoptimized, function(share){
					actions.shareOptimization(share)
				})

				_.each(willshowed, function(share){
					actions.shareReturnAfterOptimization(share)
				})
			}

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
			openauthorwindow: function(){

				var shareId = $(this).closest('.share').attr('id');

				var share = self.app.platform.sdk.node.shares.storage.trx[shareId];

				actions.openauthorwindow(share.address)
			},
			toregistration: function(){

				var shareId = $(this).closest('.share').attr('id');

				var share = self.app.platform.sdk.node.shares.storage.trx[shareId];

				if (share.itisvideo()){
					self.sdk.registrations.redirect = 'post?s=' + shareId
				}
				else{
					self.sdk.registrations.redirect = 'author?address='+share.address+'&s=' + shareId
				}

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})	
			
			},
			shareSave : function(){
				var shareId = $(this).closest('.share').attr('id');

				var share = self.app.platform.sdk.node.shares.storage.trx[shareId];

				self.app.platform.ui.saveShare(share, function(id, deleted){
					if (actions.changeSavingStatus)
						actions.changeSavingStatus(share.txid, deleted)
				}, {
					before : actions.changeSavingStatusLight,
					after : actions.changeSavingStatusLight
				})
			},

		


			videosInview : function(e, block){

				if(block) return

				actions.videosInview(players, function(player, el, clbk){	

					var _el = el.closest('.share')

					if(!_el.hasClass('showAdditional') && !_el.hasClass('blocking')){

						var share = self.app.platform.sdk.node.shares.storage.trx[_el.attr('id')]

						actions.initVideo(share, function(){

							if (player.p.getState && player.p.getState() == 'ended') return

							if (self.app.platform.sdk.usersettings.meta.videoautoplay2 && !
								self.app.platform.sdk.usersettings.meta.videoautoplay2.value) return

							if(essenseData.openapi || essenseData.second){
								return
							}

							if(!share.itisvideo()) return

							if(!player.p.playing && !self.app.platform.matrixchat.showed() && !videopaused){
								player.p.play()
								actions.setVolume(player)
							}

						})
						
					}

				}, function(players){
					
					_.each(players, function(player){

						if (player.error) return
							player.p.muted = true;

						if (player.p.playing){
							player.p.stop()

							setTimeout(function(){
								videopaused = false
							}, 100)
						}

					})

				})

				
			},

			repost : function(){
				var shareId = $(this).closest('.share').attr('id');

				self.app.mobile.vibration.small()

				var share = self.app.platform.sdk.node.shares.storage.trx[shareId] || {};

				actions.repost(share.repost || shareId);
			},

			pkoin : function(){

				var shareId = $(this).closest('.share').attr('id');

				actions.pkoin(shareId)

			},

			showmorebyauthor : function(){

				self.app.mobile.vibration.small()

				$(this).closest('.authorgroup').find('.share').removeClass('hidden')

				$(this).remove()

				renders.sharesInview(sharesInview, function(shares){

					events.videosInview()

				})

			},

			metmenu : function(){
				var _el = $(this);
				var id = $(this).closest('.share').attr('id');

				self.app.platform.api.metmenu(_el, id, actions)

			},

			resize : function(){

				if (fullscreenvideoShowed){
					actions.videoPosition(fullscreenvideoShowed)
				}
				
			},	

			loadmorescroll : function(){


				if(!essenseData.horizontal){
					if (
						!loading && !ended && (recommended != 'recommended' || isMobile()) &&

						(self.app.lastScrollTop + self.app.height > document.body.scrollHeight - 2000) 

						&& loadedcachedHeight != cachedHeight
	
						) {

							loadedcachedHeight = cachedHeight
	
							actions.loadmore()

							setTimeout(function(){
								loadedcachedHeight = 0
							}, 5000)
	
					}
				}
				else{

					if (
						!loading &&  (!ended && recommended != 'recommended') && 
						(el.w.scrollLeft() + el.w.width() > el.c.find('.shares').width() - 1000) 
	
						) {

							

						actions.loadmore()
	
					}
				}	

				
			},

			commentLike : function(){

				self.app.mobile.vibration.small()

				var id = $(this).closest('.comment').attr('id');
				var shareId = $(this).closest('.share').attr('id');

					actions.like(self.app.platform.sdk.node.shares.storage.trx[shareId].findComment(id))

					$(this).addClass('active')

			},

			toComments : function(){
				var id = $(this).closest('.share').attr('id');

				renders.comments(id, true)
				/*}*/

			},

			getTransaction : function(){
				var id = $(this).closest('.share').attr('id');

				self.app.platform.sdk.node.transactions.get.tx(id)
			},

			postscores : function(){
				var id = $(this).closest('.share').attr('id');

				actions.postscores(id)
			},

			

			like : function(){
				var p = $(this).closest('.stars');

				if (p.attr('value')){
					return
				}

				var id = $(this).closest('.share').attr('id');
				var value = $(this).attr('value')

				if(!id) id = $(this).closest('.truerepost').attr('stxid')

				self.app.mobile.vibration.small()

				actions.stateAction('_this', function(){

					self.app.platform.sdk.node.shares.getbyid(id, function(){

						var s = self.app.platform.sdk.node.shares.storage.trx[id]

						if (self.app.platform.sdk.address.pnet() && s.address == self.app.platform.sdk.address.pnet().address) return

						if (value > 4){

							var reason = null

							//if(!rand(0,9)) reason = 'p'

							if (self.app.platform.sdk.user.newuser()){
								reason = 'n'
							}
							

							if(s.scnt == '0') reason = 's'

							if(reason) {
								setTimeout(function(){

									if(!el.share[id]) return
	
									self.app.platform.effects.templates.commentstars(el.share[id], value, function(){
										if (initedcommentes[id]){
											initedcommentes[id].attention(self.app.localization.e('starssendcomment' + reason))
										}
									})
	
								}, 300)
							}

							
							

						}

							

						p.attr('value', value)
						p.addClass('liked')

						actions.like(s, value, function(r){
							if(r){
								

								s.scnt || (s.scnt = 0)
								s.score || (s.score = 0)

								s.scnt++;
								s.score = Number(s.score || 0) + Number(value);

								var v = Number(s.score) / Number(s.scnt) 

								p.find('.tstars').css('width', ((v / 5) * 100) + '%')
								p.closest('.itemwr').find('.count span.v').html(v.toFixed(1))

								renders.stars(s)

							}
							else
							{
								p.removeAttr('value')
								p.removeClass('liked')
							}
						})

					})

				}, id)


			},

			complain : function(){

				var p = $(this).closest('.share')
				
				var id = p.attr('id');

				self.app.mobile.vibration.small()

				actions.complain(id)
					
			},

			additional : function(){

				var _el = $(this).closest('.share');

				actions.additional(_el, !_el.hasClass('showAdditional'))

			},

			openGallery : function(){
				var id = $(this).closest('.shareinlenta').attr('id');
				var src = $(this).attr('i')

				var share = self.app.platform.sdk.node.shares.getWithTemp(id) 
				
				/*self.app.platform.sdk.node.shares.storage.trx[id];

				if(!share){
					var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
						return s.txid == id
					})


					share = new pShare();
					share._import(temp);
					share.temp = true;
					share.address = self.app.platform.sdk.address.pnet().address
				}*/

				self.app.mobile.vibration.small()
				actions.openGalleryRec(share, src)
			},

			subscribePrivate : function(){

				var _el = $(this);

				var off = _el.hasClass('turnon')
				var address= _el.closest('.shareTable').attr('address')

				var f = 'notificationsTurnOn'

				if(off){

					f = 'notificationsTurnOff'
					
				}

				self.app.platform.api.actions[f](address, function(tx, err){

					if(tx){
						/*if(!off){
							_el.addClass('turnon')
						}*/
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},
			
			asubscribe : function(){
				var address = $(this).closest('.shareTable').attr('address')
				var txid = $(this).closest('.shareTable').attr('stxid')

				var _el = $(this).closest('.share')

				actions.stateAction('_this', function(){

					self.app.platform.api.actions.subscribeWithDialog(address, function(tx, error){
						if(tx){
							
						}	
						else{
							self.app.platform.errorHandler(error, true)	
						}
						
					})

				}, txid)

			},

			aunsubscribe : function(){
				var address = $(this).closest('.shareTable').attr('address')

				var _el = $(this).closest('.share')


				dialog({
					html : self.app.localization.e('e13022'),
					btn1text :  self.app.localization.e('unsub'),
					btn2text : self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, error){

							if(tx){
								_el.find('.shareTable').removeClass('subscribed');
							}	
							else{
								self.app.platform.errorHandler(error, true)	
							}
							
						})
					}
				})


			},

			clickOutsideOfWindow: function(e){
				const clickedElem = e.target;

				/**
				 * HTML layout is made incorrectly. This becomes problem to
				 * make outside of window click detector. So, using hacky
				 * method: 2 elements instead of 1.
				 *
				 * TODO: After layout is fixed, remove redundant code here.
				 */

				const isElem1Clicked = clickedElem.classList.contains('sharecnt');
				const isElem2Clicked = clickedElem.classList.contains('commentsWrapperHb');

				const isClickOutside = (isElem1Clicked || isElem2Clicked);

				if (!isClickOutside) {
					return;
				}

				const shareId = $(this).closest('.share').attr('id');
				actions.exitFullScreenVideo(shareId);
			},

			exitFullScreenVideo : function(){
				var shareId = $(this).closest('.share').attr('id');

					actions.exitFullScreenVideo(shareId)
			},

			fullScreenVideo : function(){

				var shareId = $(this).closest('.share').attr('id');

					self.app.mobile.vibration.small()

				actions.fullScreenVideo(shareId)
			},

			opensvi : function(){

				var shareId = $(this).closest('.share').attr('id');

				if (essenseData.horizontal) {
					self.app.Logger.info({
						actionId: 'BEST_VIDEO_CLICKED',
						value: shareId
					});
				}

				actions.opensvi(shareId)
			},

			fullScreenVideoMobile : function(){
				var shareId = $(this).closest('.share').attr('id');

					actions.fullScreenVideoMobile(shareId)
			},

			openPost : function(e){

				var islink = deep(e, 'target.href')

				if (islink) return		

				var shareId = $(this).closest('.shareinlenta').attr('id');

				self.app.mobile.vibration.small()

				actions.openPost(shareId)
			},

			openArticle : function(e){

				var shareId = $(this).closest('.shareTable').attr('stxid');

				self.app.mobile.vibration.small()

				actions.openPost(shareId)
			},

			sharesocial : function(){
				var shareId = $(this).closest('.shareTable').attr('stxid');

				self.app.mobile.vibration.small()
					actions.sharesocial(shareId)
			},

			unblock: function(){

				var shareId = $(this).closest('.share').attr('id');

					actions.unblock(shareId)

			},

			donate : function(){

				var shareId = $(this).closest('.share').attr('id');

					actions.donate(shareId)
			},

			htls : function(){

				var shareId = $(this).closest('.share').attr('id');

					actions.htls(shareId)
			},

			

			loadmore : function(){


				actions.loadmore()
			},
			loadprev : function(){
				actions.loadprev();

			}
		}

		var renders = {


			optimizationTip : function(el, count){
				var html = ''

				html += '<div>'
				html += '<div class="text">'+self.app.localization.e('optimizationtip', count)+'</div>'
				html += '<div class="icon"><i class="fas fa-dot-circle"></i></div>'
				html += '</div>'

				el.html(html)

				el = null
			},

			/*recommendedusers : function(){
				

				self.nav.api.load({

					open : true,
					id : 'recommendedusers',
					el : el.recommendedusers,
					animation : false,

					essenseData : {
						recommendedUsersCount : essenseData.recommendedUsersCount,
						usersFormat : 'usersHorizontal'
					},
					
					clbk : function(e, p){
						recommendedusers = p;

					}

				})


			},*/

			loadprev : function(){

				var txt = self.app.localization.e('lloadprev')

				var s = self.app.platform.sdk.categories.gettagsexcluded().length + self.app.platform.sdk.categories.gettags().length

				if (s && recommended != 'sub'){
					txt = self.app.localization.e('lloadprevwithtags')
				}

				el.c.find('.loadprev button span').html(txt)

			},

			extras : function(){
				_.each(essenseData.extra, function(p){
					renders.extra(p)
				})
			},

			extra : function(p, clbk){

				if(extraloading[p.key]) return

				if(!extra[p.key]){

					extraloading[p.key] = true

					var _el = null;
					
					if (p.position) {
						var share = sharesInview[p.position]

						if (share && el.share[share.txid]){
							_el = $("<div/>", {'class' : 'extra'})

							_el.insertAfter(el.share[share.txid].closest('.authorgroup'))

						}
					}

					if (p.selector) _el = el.c.find(selector);

					if (_el && _el.length){

						if (p.render){

							renders[p.render](_el, p, function(){
								extraloading[p.key]

								if(clbk) clbk()
							})

							

						}
						else{
							self.nav.api.load({

								open : true,
								id : p.key,
								el : _el,
								animation : false,
			
								essenseData : p.essenseData(),
								
								clbk : function(e, _p){
		
									extra[p.key] = _p;
	
									delete extraloading[p.key]
	
									essenserenderclbk()
		
									if(clbk) clbk()
								}
			
							})
						}

						

					}
					
					_el = null

				}

			},

			
			debugusers : function(el){
				var _cn = el.find('.testusersprofiles')

				_cn.each(function(){
					var cn = $(this)

					var ids = (cn.attr('ids') || "").split(',')
					var idsadr = _.map((cn.attr('ids') || "").split(','), function(F){
						return F.split("_")[0]
					})

					if(ids.length){
						self.app.platform.sdk.users.get(idsadr, function(){

							self.shell({
								animation : false,
								inner : html,
								name : 'testusers',
								data : {
									ids : ids
								},
								el : cn
			
							},
							function(p){
			
							})
						})	
					}
					else{
						cn.text("Empty")
					}
				})

				
			},
			comments : function(txid, init, showall, preview){


				if(essenseData.comments == 'no') return

				if(video) return

				if(initedcommentes[txid]) return;

				if(!el.c) return

				if(recommended == 'saved') return

				var _el = el.c.find('#' + txid + " .commentsWrapper");

				var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

				var checkvisibility = share ? app.platform.sdk.node.shares.checkvisibility(share) : false;

				self.fastTemplate('commentspreview', function(rendered){
					
					if(!el.c) return

					var e = el.c.find('#' + txid);

					var rf = ''

					if(self.app.platform.sdk.address.pnet()){
						rf = '&ref=' + self.app.platform.sdk.address.pnet().address
					}

					var hr = 'https://'+self.app.options.url+'/' + (essenseData.hr || 'index?') + 's='+txid+'&mpost=true' + rf

					if (parameters().address) hr += '&address=' + (parameters().address || '')

					self.nav.api.load({
						open : true,
						id : 'comments',
						el : _el,

						eid : txid + 'lenta',
						

						essenseData : {
							close : function(){

								if (initedcommentes[txid]){
									initedcommentes[txid].hideall(true)

									initedcommentes[txid].destroy()
								}

								delete initedcommentes[txid]

								_el.html('')

								_scrollToTop(_el, 0, 0, -65)

								renders.comments(txid, init, showall, preview)

							},
							totop : el.c.find('#' + txid),
							caption : rendered,
							send : function(comment, last){

								var c = el.c.find('#' + txid + " .commentsAction .count span");

								c.html(Number(c.html() || "0") + 1)

								share.lastComment = last
							},

							txid : txid,
							showall : essenseData.comments == 'all' || showall,	
							fromtop: essenseData.comments == 'all' || e.hasClass('fullScreenVideo') || false,
							preview : true, // essenseData.comments == 'all' ? false : preview,
							listpreview : essenseData.comments == 'all' ? false : preview,
							lastComment : essenseData.comments != 'all' ? share.lastComment : null,
							count : share.comments,
							init : essenseData.comments == 'all' ? false : init,
							hr : hr,
							receiver: share.address,
							cantsend : checkvisibility,
							renderClbk : function(){

								essenserenderclbk()
							}
						},

						clbk : function(e, p){

							if(!el.c) return

							if (p)
								initedcommentes[txid] = p

							essenserenderclbk()
						}
					})

				}, {
					share : share
				})
				
			},
			
			share : function(share, clbk, all, p){
				if(!p) p = {}

				if(!share) return

				var _el = p.el || el.share[share.txid] 

				if(!p.repost)
					shareInitingMap[share.txid] = true;

				//var relayTransactions = deep(self.app.platform.sdk.relayTransactions.get(), 'share') || {};

				/*var shareRelayedFlag = _.find(relayTransactions, (transaction) => (
					transaction.txid === share.txid
				));*/

				
				self.shell({
					name : video ? 'sharevideolight' : share.itisarticle() ? 'sharearticle' : 'share',

					el : _el,
					animation : false,
					data : {
						share : share,
						ed : essenseData,
						mestate : mestate,
						all : all || false,
						tplvideo : video ,
						openapi : essenseData.openapi,
						sharesFromSub,
						boosted : p.boosted,
						shareRelayedFlag : false,
					}					

				}, function(p){

					var work = _el.find('.work');
					
					if(!p.repost)
						shareInitedMap[share.txid] = true;	

					renders.stars(share)

					if(!share.temp && !share.relay){
						renders.comments(share.txid, false, false, true)
					}
			
					renders.url(p.el.find('.url'), share.url, share, function(){

						renders.urlContent(share, function(){

							if(essenseData.searchValue){
								p.el.find('.canmark').mark(essenseData.searchValue);
							}

							if(!video) actions.initVideoLight(share)

							if(isotopeinited) el.shares.isotope()

							shareInitingMap[share.txid] = false;					
											
							if (clbk)
								clbk();

						});

					})

					if (video) return

					renders.images(p.el.find('.postcontent'), share, function(){})
					
					if (share.itisarticle()){
						renders.articlespart(p.el.find('.sharearticle'), share)
					}
					else{

						// TO DO
						if(!p.el.find('.showMore').length) 
							renders.repost(p.el, share.repost, share.txid, share.isEmpty(), null, all)
					}
					
				})

			},

			articlespart : function(wr, share){
				self.app.platform.ui.articledecoration(wr, share)
			},

			mystars : function(shares, clbk){

				if(essenseData.horizontal || video || essenseData.openapi || essenseData.second) {
					
					if(clbk) clbk()

					return
				}

				var _shares = _.filter(shares, function(s){
					if(typeof s.myVal == 'undefined'){
						return true;
					}
				})

				var ids = _.map(_shares, function(s){
					return s.txid
				})

				self.app.platform.sdk.likes.get(ids, function(){

					_.each(shares, function(share){

						if (share.myVal)
							renders.stars(share)

					})

					if(clbk) clbk()

				})
			},

			wholike : function(share, clbk){

				if (video) { return }

				if (!el.shares) return

				var _el = el.shares.find("#" + share.txid);

				if (_el.length){

					var wholikes = share.who;

					self.shell({
						animation : false,
						name :  'wholike',
						el : _el.find('.wholikes'),
						data : {
							scores : Number(share.scnt),
							wholikes : wholikes || []
						},
						bgImages : {}			

					}, function(p){

						if (clbk)
							clbk()

					})

				}
			},

			tosubscribeshares : function(el, p = {}, clbk){
				self.shell({
					name :  'tosubscribeshares',
					el : el,
					data : {
						share : p.share
					},
					animation : false,				

				}, function(p){


					if (clbk)
						clbk()

				})
			},

			stars : function(share, clbk){

				if (video) { return }
				if (!el.shares) return


				if (el.share[share.txid] ){

					self.shell({
						name :  'stars',
						el : el.share[share.txid].find('.forstars'),
						data : {
							share : share,
							hideCount : undefined
						},
						ignorelinksandimages : true,
						animation : false,				

					}, function(p){

						fastars(p.el.find('.stars'))

						if (clbk)
							clbk()

					})

				}
				
			},

			maybechangevisibility : function(address, reason){

				var shares = []
				
				_.each(shareInitedMap, function(v, txid){

					if(!v) return

					var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

					if(!share) return

					if (share.address == address && share.visibility()) {

						if(reason && reason == 'sub' && share.visibility() != 'sub') return

						shares.push(share)
					}
				})


				renders.sharesVisibilityRestrictions(shares)
			},

			sharesVisibilityRestrictions : function(shares, clbk){

				_.each(shares, function(share){
					actions.destroyShare(share)
				})
				
				renders.sharesInview(shares, clbk)
			},

			

			sharesInview : function(shares, clbk, p){
				if(!p) p = {}

				
				shares = _.filter(shares, function(s){
					return !$('#' + s.txid).hasClass('hidden')
				})

				var rs = shares

				if (recommended != 'saved'){
					rs = _.sortBy(shares, function(s){
						return -s.time
					})
				}
				else{
					rs = _.sortBy(shares, function(s){
						if(!s.downloadedDate){
                            return 1
                        }
                        
                        return -s.downloadedDate.getTime()
					})
				}

				lazyEach({
					array : rs,
					sync : true,

					action : function(_p){
						var share = _p.item;


						if(shareInitedMap[share.txid]){
							_p.success()
						}
						else
						{
							shareInitedMap[share.txid] = true
							renders.share(share, _p.success, null, {
								boosted : p.boosted
							})
						}

					},

					//sync : isMobile(),

					all : {
						success : function(){

				
								renders.mystars(shares)

							if (essenseData.includeboost){ actions.includeboost() }

							if(clbk) clbk()
						}
					}
				})
			},

			shareall : function(shares){

				_.each(shares, function(share){
					renders.share(share)
				})
				
			},

			txidall : function(txids){

				_.each(txids, function(txid){
					var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)
					renders.share(share)
				})
				
			},

			shares : function(shares, clbk, p){

				if(!p) p = {};


				var likeappend = false


				if(!p.inner) {

					likeappend = true
					p.inner = function(el, html){

						

						if(isotopeinited){
							var content = $(html)

							el.append( content ).isotope( 'appended', content )
						}
						else
						return append(el, html)
					}
				}

				var tpl = 'groupshares';

				if (essenseData.author || recommended || essenseData.horizontal || essenseData.txids || essenseData.search){
					tpl = 'shares'
				}

				if (recommended == 'recommended'){

					shares = _.sortBy(shares, function(s){
						return -s.time
					})
				}

				if(!p.ignoresw)

					shares = _.filter(shares, function(s){
						return !_.find(sharesInview, function(s1){
							return s1.txid == s.txid
						})
					})
					
				self.shell({
					name :  tpl,
					inner : p.inner,
					el : p.el || el.shares,
					data : {
						shares : shares || [],
						index : p.index || 0,
						video : video || essenseData.videomobile,
						boosted : p.boosted
					},
					animation : false,
					delayRender : isotopeinited,

				}, function(_p){

					if (_p.inner == append || likeappend){
						sharesInview = sharesInview.concat(shares)	
					}
					else
					{
						if(_p.inner != replaceWith)
						{
							sharesInview = shares.concat(sharesInview)	
						}
					}

					sharesInview = _.uniq(sharesInview, function(s){
						return s.txid
					})

					_.each(shares, function(s){
						el.share[s.txid] = el.c.find('#' + s.txid)
					})

					renders.extras()

					if(subloaded && subloadedindex > 0){

						console.log('shares', shares)

						renders.extra({
							key : 'tosubscribeshares',
							render : 'tosubscribeshares',
							position : subloadedindex,
							share : shares[shares.length - 1]
						})
					}	

					essenserenderclbk()

					if (video && !isMobile()){
						if(!isotopeinited && !essenseData.horizontal){
							el.shares.isotope({

								layoutMode: 'packery',
								itemSelector: '.authorgroup',
								packery: {
									gutter: 0
								},
								initLayout: false
							});
		
							el.shares.on('arrangeComplete', function(){
								essenserenderclbk()
							});
	
							isotopeinited = true
						}
					}


					if (clbk)
						clbk();
				})
			},
			
			images : function(el, s, clbk){

				if (video) { return }

				var sel = el

				var _el = sel.find(".shareImages .image");

				var images = sel.find(".shareImages");

				if (images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

					return

				}


				var ch = 0

				_el.imagesLoadedPN({ imageAttr: true }, function(image) {

					if(s.settings.v != "a"){

						if((isMobile() || essenseData.openapi) && image.images.length > 1 ){

							var aspectRatio = 0
							
							_.each(image.images, function(img){
								var _img = img.img;

								var _aspectRatio = _img.naturalHeight / _img.naturalWidth

								if(_aspectRatio > aspectRatio) aspectRatio = _aspectRatio
							})

							if (aspectRatio){

								if(aspectRatio > 1.66) aspectRatio = 1.66

								ch = Math.min(400, isMobile() ? self.app.width : images.width() ) * aspectRatio

								sel.find('.imagesWrapper').height(ch)
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


								if(_img.width >= _img.height && (/*!self.app.mobileview && */!essenseData.openapi || image.images.length == 1)){
									ac = 'w2'

									var w = _w * (_img.width / _img.height);

									if (w >= imageswidth){
										w = imageswidth

										h = w * ( _img.height / _img.width) 

										el.height(h);
									}

									el.width(w);
								}

								if(_img.height >= _img.width && (/*self.app.mobileview || */essenseData.openapi|| image.images.length == 1)){
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

						images.addClass('active')

						_el.addClass('active')

						essenserenderclbk()

						images = null,
						_el = null,
						sel = null;

						if (clbk)
							clbk()
					}

					if(s.settings.v != 'a' && image.images.length > 1){

						var gutter = self.app.width <= 768 ? 0 : 5;

						if (isMobile() || essenseData.openapi) {

							if(carousels[s.txid]) carousels[s.txid].owlCarousel('destroy')

							carousels[s.txid] = sel.find('.imagesContainer').height(ch + 50).owlCarousel({
								items: 1,
								dots: true,
								nav: !isMobile(),
								navText: [
									'<i class="fas fa-chevron-circle-left"></i> ',
									'<i class="fas fa-chevron-circle-right"></i>'
								],

								checkVisibility: false,
								//responsive : false
								
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

				

				
			},

			repost : function(el, repostid, txid, empty, clbk, all){

				if(repostid){
			
					self.shell({
						animation : false,
						name :  'repost',
						el : el.find('.repostWrapper'),
						data : {
							repost : repostid,
							share : deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid),
							level : 1
						},
	
					}, function(_p){

						if(_p.el && _p.el.length){
							
							self.app.platform.papi.post(repostid, _p.el.find('.repostShare'), function(e, p){

								_reposts[txid] = p;
	
							}, {
								repost : true,
								eid : txid + 'lenta',
								level : 1,
								fromempty : empty,
								minimize : !all ? true : false
							})
						}	

					})

				}
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
								preview : video ? true : false,
								fullplayer : false
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

			urlsContent : function(shares){

				_.each(shares, function(share){
					renders.urlContent(share)
				})

			},

			urls : function(urls, clbk){
				lazyEach({
					array : urls, 
					sync : true,
					action : function(p){
						renders.url(p.item.el, p.item.url, p.item.share, p.success)
					},

					all : {
						success : function(){																				

							if (clbk) 
								clbk()
						}
					}
				})
			},

			spacers : function(txids, clbk){
				var shares = _.map(txids, function(id){
					return { 
						txid : id,
						author : essenseData.author
					}
				})

				this.shares(shares, clbk, {
					noview : true
				})
			},
		}

		var load = {

			boosted : function(clbk){

				var tagsfilter = self.app.platform.sdk.categories.gettags()
				var tagsexcluded = self.app.platform.sdk.categories.gettagsexcluded()

				var type = null

				if (video || essenseData.videomobile){ type = 'video'}
				if (essenseData.read){ type = 'article'}
				if (essenseData.tags) tagsfilter = essenseData.tags
				
				
				self.app.platform.sdk.node.shares.getboostfeed({

					lang: essenseData.lang,

					height : fixedblock,
					tagsfilter : tagsfilter,
					type : type,
					count : 10,
					tagsexcluded : tagsexcluded

				}, function(shares, error, pr){

				
					if(clbk) clbk(shares)

				}, _.toArray(boostplaces).length, 'cache')
			},

			recomended : function(clbk, firstshares){
				
				//el.loader.fadeIn()


				recomended = []

				if(!essenseData.author && !beginmaterial){

					self.app.platform.sdk.node.shares.recomended({}, function(shares){

						recomended = _.filter(shares, function(id){
							var fs = _.find(firstshares, function(s){
								if(s.txid == id) return true
							})

							if(!fs) return true;
						});

						self.app.platform.sdk.node.shares.users(shares, function(){
							if (clbk)
								clbk(recomended)
						})

					})
				}
				else
				{
					if (clbk)
						clbk(recomended)
				}

			},

			txids : function(txids, clbk){
				if(!beginmaterialloaded){
					self.app.platform.sdk.node.shares.getbyid(txids, function(shares){

						beginmaterialloaded = true;

						clbk(shares)
					})
				}
				else
				{
					clbk([])
				}
			},

			begin : function(clbk){

				if(beginmaterial && !beginmaterialloaded && (!recommended || recommended == 'sub')){
			
					self.app.platform.sdk.node.shares.getbyid(beginmaterial, function(shares){

						beginmaterialloaded = true;

						clbk(shares)
					})
				}
				else
				{
					beginmaterialloaded = true;

					clbk([])
				}
			},

			videosinfo : function(shares, clbk){
				
			},	

			sstuff : function(shares, error, pr, clbk, bshares, includingsub){

				if(!bshares) bshares = []

				if(includingsub) {
								
					shares = _.filter(shares, function(share){

						if (essenseData.observe){

							var obs = self.sdk.sharesObserver.storage.viewed[essenseData.observe + '_sub']

							if(!obs) return true

							return (!obs.first || share.id > obs.first) || (!obs.last || share.id < obs.last)
						}

						return true
					})


					if (shares.length < pr.count || countshares >= 10){
						subloaded = true
						subloadedindex = countshares + shares.length 
					}

					_.each(shares, function(share){
						sharesFromSub[share.txid] = share
					})

				}

				var allshares = [].concat(shares, bshares)

				var author = essenseData.author;

				self.app.platform.sdk.node.shares.loadvideoinfoifneed(allshares, video, function(){

					self.app.platform.sdk.node.shares.users(allshares, function(l, error2){

						countshares = countshares + allshares.length

						loading = false;
						

						if (!el.c) return

						if (essenseData.openapi || essenseData.txids)
							el.c.removeClass('loading')

						if(!error && !error2){

							if(!shares || !shares.length || ((shares.length < pr.count) || recommended == 'recommended')){								

								if(!beginmaterial && !countshares && !includingsub){
									el.c.addClass("sharesZero")
								}
								else
								{
		
									if ( !essenseData.txids && (shares.length < pr.count || recommended == 'recommended') && (recommended || author || essenseData.search || essenseData.tags) ){
		
										setTimeout(function(){
											if (el.c)
												el.c.addClass("sharesEnded")
										}, 1000)
										
									}
		
								}

								
								if ((!shares.length || shares.length < pr.count) && (recommended || author || essenseData.search) && !includingsub){

									if(essenseData.ended) {
										ended = essenseData.ended(shares)
									}

									else
										ended = true

								}

								if(!shares.length && !essenseData.ended && !includingsub){
									ended = true
								}
									
							}

							shares = _.filter(shares, function(share){
								return !_.find(bshares, function(bshare){
									return bshare.txid == share.txid
								})
							})

							if(!essenseData.author){
								shares = _.filter(shares, function(share){
									var checkvisibility = self.app.platform.sdk.node.shares.checkvisibility(share)

									return !checkvisibility
								})
							}

							shares.concat(bshares)

							shares = [].concat(bshares, shares)

							if (essenseData.filter) {
								shares = _.filter(shares, essenseData.filter)
							}

							if(!essenseData.author && self.user.address && self.user.address.value){

								var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

								shares = _.filter(shares, function(share){

									var r = me.relation(share.address, 'blocking') 

									if (r) return false


									return true
								})
							}
							
							if (essenseData.hasshares){
								essenseData.hasshares(shares)
							}
						}

						else{
							if (essenseData.hasshares){
								essenseData.hasshares([])
							}
						}

						if (essenseData.afterload){
							essenseData.afterload(essenseData, shares, error || error2)
						}
						
						var temp = self.sdk.node.transactions.temp;

						var getPin = function(settings){

							var pinnedId = shares.findIndex(function(share){
								return share.txid === settings.pin;
							});

							if (pinnedId > -1){

								var pinnedShare = shares.splice(pinnedId, 1);
								
								pinnedShare[0].pin = true;
								shares.unshift(pinnedShare[0]);		
								

								if (clbk)
									clbk(shares, error || error2)
								return;

							} else {

								self.app.platform.sdk.node.shares.getbyid([settings.pin], function(t){

									if (t){

										var pinnedShare = t[0];

										if (pinnedShare && !pinnedShare.deleted){

											pinnedShare.pin = true;
											shares.unshift(pinnedShare);
					
										}

									}
									
									if (clbk) clbk(shares, error || error2)

									return;			

								})
							
							}

						}

						var getAccountSettings = function(d, author){

							var settings = JSON.parse((typeof d === 'string' && d) ? d : '{}');

							self.app.platform.sdk.accountsettings.storage[author] = settings;

							if (settings && settings.pin){

								getPin(settings);


							} else if(clbk){

								clbk(shares, error || error2);

							}
						}
						
						if (essenseData.byauthor && author && !sharesInview.length && !parameters().s && !parameters().ssa){

							if (self.app.platform.sdk.accountsettings.storage[author]){

								getPin(self.app.platform.sdk.accountsettings.storage[author]);

							} else {

								var acc = temp.accSet && Object.values(temp.accSet)[0];

								if (acc && acc.address === author){
									
									getAccountSettings(acc.d, author);

								} else {


									self.app.api.rpc('getaccountsetting', [author])
									.then(function(d){

										getAccountSettings(d, author);
									})
									.catch(function(){

										getAccountSettings(null, author);
									})
								}


							}


						} else if (clbk){
							
							clbk(shares, error || error2);
						}

					}, essenseData.horizontal)	

				})
			},

			shares : function(clbk, cache){


				if (loading || (ended && (!essenseData.contents || essenseData.txids.length == _.toArray(shareInitedMap).length) )) return


				var includingsub = false

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

							var _beginmaterial = ''

							if(!author){
								loader = self.app.platform.sdk.lentaMethod.get();
							}
							else
							{
								_beginmaterial = beginmaterial
								loader = 'getprofilefeed'
							}

							if (recommended){

								if(recommended == 'recommended'){
									loader = 'recommended'
								}
								
								else if(recommended == 'sub'){
									loader = 'getsubscribesfeed'
								}

								else if(recommended == 'hot'){
								}

								else if(recommended == 'b'){
									loader = 'getbyidsp'
									_beginmaterial = essenseData.beginmaterial
								}

								else if(recommended == 'saved'){
									
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


							var count = 10

							if(essenseData.txids && recommended != 'b'){
								loader = 'txids'
								count = essenseData.txids.length
							}

							if(recommended == 'saved'){
								loader = 'getsavedbyids';
								essenseData.txids = self.app.platform.sdk.localshares.getShareIds();
								count = essenseData.txids.length
							}

							if (essenseData.loaderkey) loader = essenseData.loaderkey
							if (essenseData.from) _beginmaterial = essenseData.from

							var tagsfilter = []
							var tagsexcluded = []

							if(loader == 'hierarchical' || loader == 'historical'){
								tagsfilter = self.app.platform.sdk.categories.gettags()
								tagsexcluded = self.app.platform.sdk.categories.gettagsexcluded()
							}

							if (essenseData.tags) tagsfilter = essenseData.tags

							var page = essenseData.page || parameters().page || 0

							var type = null

							if(video || essenseData.videomobile){ type = 'video'}
							if(essenseData.read){ type = 'article'}

							

							if(essenseData.count) count = essenseData.count
							else if (recommended == 'recommended') count = 30
							else if (video) count = 20

							if(state && essenseData.includesub && loader == 'hierarchical' && !subloaded){

								loader = 'getsubscribesfeed'
								//author = '1'

								includingsub = true

							}

							self.app.platform.sdk.node.shares[loader]({

								author : author,
								begin : _beginmaterial || '',
								txids : essenseData.txids,
								height : fixedblock,
								tagsfilter : tagsfilter,
								lang: essenseData.lang,

								type : type,

								count : count,
								page : page,
								period : essenseData.period,
								tagsexcluded : tagsexcluded

							}, function(shares, error, pr){

								///

								if(pr.blocknumber) fixedblock = pr.blocknumber
								
								if (essenseData.shuffle) {
									shares = _.shuffle(shares)
								}

								load.sstuff(shares, error, pr, clbk, bshares, includingsub)				

								if (recommended == 'b'){
									beginmaterial = ''
								}

							}, cache)

						})

					})
				}



				
			},

			
		}
		var getloader = function(){
			var loader = 'common';
			var author = essenseData.author;

			if(essenseData.loaderkey) return essenseData.loaderkey

			if(!author){
				loader = 'hierarchical'
			}

			if (recommended){

				if(recommended == 'recommended'){
					loader = 'recommended'
				}

				else if(recommended == 'b'){
					loader = 'getbyidsp'
				}

				else if(recommended == 'saved'){
					loader = 'getsavedbyids';
				}

				else
				{
					loader = 'common'
				}						
			}

			if(essenseData.txids && recommended != 'b'){
				loader = 'txids'
			}

			return loader
		}
		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var shownewmaterials = function(c){

			if(/*!beginmaterial &&*/ recommended != 'recommended' && !essenseData.author && !essenseData.search){

				var ts =  _.toArray(self.sdk.node.transactions.temp.share || {})

				var a = 0;
				
				if (ts.length && !recommended){

					a = a - ts.length;
				}


				if(((c || 0) + a > 0)){

					newmaterials = newmaterials + (c || 0) + a;

					el.c.addClass('showprev')

					el.c.find('.countnew').html( "(" + newmaterials + ")" )

					essenserenderclbk()
				}
			}
		}

		var initEvents = function(){	
			
			el.c.on('click', '.forstars .count, .postscoresshow', events.postscores)
			el.c.on('click', '.stars i', events.like)
			el.c.on('click', '.complain', events.complain)
			el.c.on('click', '.imageOpen', events.openGallery)
			el.c.on('click', '.txid', events.getTransaction)
			el.c.on('click', '.showMore, .showmoreRep', events.openPost)
			el.c.on('click', '.articleclick', events.openArticle)
			el.c.on('click', '.forrepost', events.repost)
			el.c.on('click', '.panel .pkoin', events.pkoin)
			el.c.on('click', '.unblockbutton', events.unblock)
			el.c.on('click', '.videoTips', events.fullScreenVideo)
			el.c.on('click', '.videoOpen', events.fullScreenVideo)
			el.c.on('click', '.opensviurl', events.opensvi)
			el.c.on('click', '.exitFull', events.exitFullScreenVideo)
			el.c.on('click', '.sharecnt', events.clickOutsideOfWindow)
			el.c.on('click', '.commentsWrapperHb', events.clickOutsideOfWindow)
			el.c.on('click', '.additional', events.additional)
			el.c.on('click', '.asubscribe', events.asubscribe)
			el.c.on('click', '.aunsubscribe', events.aunsubscribe)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			el.c.on('click', '.donate', events.donate)
			el.c.on('click', '.sharesocial', events.sharesocial)
			el.c.on('click', '.metmenu', events.metmenu)
			el.c.on('click', '.showmorebyauthor', events.showmorebyauthor)
			el.c.on('click', '.commentsAction', events.toComments)
			el.c.on('click', '.shareSave', events.shareSave)
			el.c.on('click', '.toregistration', events.toregistration)
			el.c.find('.loadmore button').on('click', events.loadmore)
			el.c.find('.loadprev button').on('click', events.loadprev)
			el.c.on('click', '.gotouserprofile', events.gotouserprofile)

			el.c.on('click','.openauthorwindow', events.openauthorwindow)

			el.c.find('.networkErrorMessage button').on('click', function(){

				delete self.iclbks.lenta

				if (self.app.platform.loadingWithErrors){
					self.app.platform.appstate(function(){

					})
				}
				else{
					globalpreloader(true)
				
					make()
	
					setTimeout(function(){
						globalpreloader(false)
	
					}, 600)
				}

			})

			//////////////////////

			if(self.app.mobileview && canloadprev && !essenseData.openapi){

				var cc = el.c.find('.circularprogress');
				var maxheight = 220;

				progress = new CircularProgress({
					radius: 30,
					strokeStyle: '#00A3F7',
					lineCap: 'round',
					lineWidth: 1,
					font: "100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",
					fillStyle : "#00A3F7",
					text : {						
						value : ""
					},
					initial: {
						strokeStyle: '#fff',
						lineWidth: 1
					}
				});

				progress.update(70);

				el.c.find('.circularprogressWrapper').html(progress.el);

				var tp = el.c.find('.loadprev')

				var trueshold = 80

			}

			if(!essenseData.openapi){

				self.app.events.resize[mid] = events.resize
				
				if(!essenseData.horizontal){

					self.app.events.delayedscroll['videos' + mid] = events.videosInview

					self.app.events.delayedscroll['optimization' + mid] = actions.optimize

				}

				if(!essenseData.notscrollloading && recommended != 'saved'){


					if (essenseData.horizontal){
						el.w.on('scroll', function(){
							events.loadmorescroll()
						});
					}
					else{
						self.app.events.scroll['loadmore' + mid] = events.loadmorescroll
					}
				}	
				
			}

			self.app.errors.clbks[mid] = function(){
				if (el.c.hasClass('networkError')){
					actions.loadprev()
				}
			}

			if(!essenseData.openapi && !essenseData.second){

				if(!essenseData.txids){

					self.app.platform.matrixchat.clbks.SHOWING.lenta = function(v){
						if(v){
							_.each(players, function(player){
								if (player.error || !player.p) return
								if (player.p.playing){
									player.p.stop()
								}
		
							})
						}
						else{
							
						}
					}

					self.app.platform.sdk.node.shares.clbks.added.lenta = function(share){
						
						if (share.txidEdit){		
													
							delete initedcommentes[share.txidEdit]
							delete shareInitedMap[share.txidEdit],
							delete shareInitingMap[share.txidEdit]
	
							
							var f = replaceEqual(sharesInview, {
								txid : share.txidEdit
							}, share)
	
							actions.destroyVideo(share)
	
							if (f){
	
								renders.shares([share], function(){
									renders.sharesInview([share], function(){
										
									})
								}, {
									inner : replaceWith,
									el : el.shares.find('#' + share.txidEdit),
	
									ignoresw : true,
								})
	
								
							}
						}
						else{
							

							if (essenseData.author && (essenseData.author != self.user.address.value.toString('hex')) || essenseData.txids) return

								actions.destroyVideo(share)

								renders.shares([share], function(){
									renders.sharesInview([share], function(){
										
									})
								}, {
									inner : prepend
								})
						}
	
						
					}
	
					self.app.platform.ws.messages.transaction.clbks.temp = function(data){
						if(essenseData.author && (essenseData.author != self.user.address.value.toString('hex')) || essenseData.txids) return
	
						if(data.temp){
	
							var s = _.find(sharesInview, function(sh){
								if(sh.txid == data.temp.txid) return true
							})
	
							if (s){
	
	
								s.temp = false
								
	
								s.scnt = "0"
								s.score = "0"
								s.myVal = 0
	
								s.time = new Date()
	
								
								actions.destroyShare(s)
	
								renders.sharesInview([s], function(){
									
								})
	
								
							}
	
						}
						
					}

					self.app.platform.sdk.relayTransactions.clbks.relayToTemp = function(data) {
						if(essenseData.author && (essenseData.author != self.user.address.value.toString('hex')) || essenseData.txids) return
	
						if(data.txid){
							var s = _.find(sharesInview, function(sh){
								if(sh.txid == data.txid) return true
							})
	
							if (s){

								s.relay = false
								s.checkSend = false
								s.temp = true
								
								actions.destroyShare(s)
	
								renders.sharesInview([s], function(){
									
								})
	
								
							}
	
						}
					}
	
					self.app.platform.ws.messages.event.clbks.lenta = function(data){
	
						if(data.mesType == 'upvoteShare' && data.share){
	
							var s = _.find(sharesInview, function(sh){
								if(sh.txid == data.share.txid) return true
							})
	
							if (s){
	
								renders.stars(s, function(){
									
								})
	
							}
	
						}
						
					}
				}

				self.app.platform.clbks._focus.lenta = function(time){

					if(self.app.mobileview && !fullscreenvideoShowed){
						videosVolume = 0
						self.sdk.videos.volume = videosVolume 
						self.sdk.videos.save()
					}

					if ((window.cordova || isInStandaloneMode()) && !fullscreenvideoShowed && !essenseData.txids && !making && time > 1200 && !essenseData.second){

						if(!self.app.errors.connection()){
							/*actions.loadprev()
							self.app.actions.scroll(0)*/
						}
						
					}
				}
			
				if(!essenseData.txids){

					self.app.platform.ws.messages["newblocks"].clbks.newsharesLenta = 
					self.app.platform.ws.messages["new block"].clbks.newsharesLenta = actions.newmaterials

					self.app.platform.sdk.categories.clbks.excluded.lenta =
					self.app.platform.sdk.categories.clbks.tags.lenta =
					self.app.platform.sdk.categories.clbks.selected.lenta = function(data){

						if(getloader() == 'hierarchical' && !essenseData.second){
							actions.rebuilddelay()
						}
						
					}

				}

				self.app.platform.ws.messages.comment.clbks.lenta = function(data){


					if(shareInitedMap[data.posttxid]){
						var c = el.c.find('#' + data.posttxid + " .commentsAction .count span");

							c.html(Number(c.html() || "0") + 1)
					}

					
					
				}

				self.app.platform.clbks.api.actions.anysubscribe.lenta = actions.subscribeunsubscribeclbk

				self.app.platform.clbks.api.actions.blocking.lenta = function(address){
					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
						addressEl.addClass('blocking');
						actions.stopPlayers()
				}

				self.app.platform.clbks.api.actions.unblocking.lenta = function(address){
					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
						addressEl.removeClass('blocking');
						actions.stopPlayers()
				}

			}	
			
		}

		var make = function(clbk, _p){
			initialized = new Date()

			making = true;

			actions.cleardelay()

			if (self.app.fullscreenmode)
				self.app.mobile.fullscreenmode(false)

			var cache = 'clear';
			var clear = true;

			if (essenseData.goback) {
				cache = 'cache'
			}

			if (essenseData.contents){

				el.c.find('.shares').html('')

				renders.spacers(essenseData.txids, function(){				
					actions.scrollToPost(essenseData.beginmaterial)
				})

				clear = false;
			}

			var p = parameters()


			if(!essenseData.second){
				
				if (video && p.v){
					actions.opensvi(p.v)
				}

				if(essenseData.author && beginmaterial){
					el.c.addClass('showprev')
				}

				
			}


			if(essenseData.observe && essenseData.includesub){
				subloaded = !self.app.platform.sdk.sharesObserver.hasnewkeys([essenseData.observe + '_sub', 'sub'])

			}

			load.shares(function(shares, error){

				if(!el.c) return

				if (error){
					making = false;
					
					el.c.addClass('networkError')
				
					el.c.removeClass('loading')

					self.iclbks.lenta = function(){
						make(null, _p)
					}

					return;
				}

				el.c.removeClass('networkError')

				if(!shares){
					making = false;
				}
				else
				{
					if (clear) el.c.find('.shares').empty()

					renders.shares(shares, function(){
						renders.sharesInview(shares, function(){

							making = false;

							setTimeout(function(){
								events.videosInview()
							}, 50)
							

							var p = parameters()

							if(!essenseData.second){
								if (p.s && !p.msh){

									setTimeout(function(){
										actions.openPost(p.s, function(){
											actions.scrollToPost(p.s)
										}, null, null, p.commentid)
										
									}, 500)

								}
	
								if (p.i){
									var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + p.i)
									var src = null;
	
									if (share){
	
										if(p.num){
											src = deep(share, 'images.' + p.num)
										}
	
										actions.openGalleryRec(share, src)
									}
	
										
								}
	
								if(p.v){
	
									if(video){
									}
									else{	
										actions.scrollToPost(p.v)
										actions.fullScreenVideo(p.v, function(){})
									}
									
								}
	
								if (p.p){
									actions.postscores(p.p, function(){})
								}
							}

							if (clbk){
								clbk()
							}

							if (essenseData.goback && _p.clbk){
								essenseData.goback = false;
								_p.clbk(null, _p);
							}

							if (essenseData.notscrollloading && essenseData.txids){
								renders.txidall(essenseData.txids)
							}


							if(shares.length < 5 && essenseData.includesub && !loading && (!ended && recommended != 'recommended')){
								actions.loadmore()
							}

							_p = null
						
						})
					})

					if (essenseData.includeboost){

						boostplaces = {
							4 : false,
							13 : false,
							27 : false
						}

						load.boosted(function(shares){
							boosted = shares


							actions.includeboost()
						})
					}
						
				}


			}, cache)

			renders.loadprev()		
		}

		var clearnewmaterials = function(){

			if (!essenseData.goback && !essenseData.second && !essenseData.author && !beginmaterial) {
				var key = 'common'

				if (video){
					key = 'video'
				}

				if (essenseData.read){
					key = 'article'
				}

				if(recommended == 'sub'){
					key = 'sub'
				}

				if(recommended == 'recommended') return


				self.app.platform.sdk.newmaterials.see(key)
			}

		}

		return {
			id : mid,

			primary : primary,

			getdata : function(clbk, p){


				ovf = false

				newmaterials = 0;
				
				initedcommentes = {};

				essenseData = p.settings.essenseData || {};

				actions.clear()				

				var _s = parameters();

				videosVolume = self.sdk.videos.volume

				beginmaterial = _s.s || _s.i || _s.v || _s.p || null;

				if(_s.r) 	recommended = _s.r;

				else 		recommended = false;		

				if (typeof essenseData.r != 'undefined' && essenseData.r != null) recommended = essenseData.r;


				

				if (essenseData.second){
					beginmaterial = null
				}

				if (essenseData.txids && recommended != 'b'){

					recommended = false;

				}

				if (essenseData.saved || _s.saved){
					recommended = 'saved';
				}

				canloadprev = !!!essenseData.txids || false
				
				video = essenseData.video || false

				
				self.app.platform.sdk.ustate.me(function(_mestate){

					mestate = _mestate || {}

					var data = {
						beginmaterial : beginmaterial,
						author : essenseData.author,
						recommended : recommended,
						filters : essenseData.search || essenseData.tags,
						ed : essenseData
					};

					self.loadTemplate({
						name : 'share'
					}, function(){

						self.loadTemplate({
							name : 'sharevideo'
						}, function(){

							self.loadTemplate({
								turi : 'share',
								name : 'url'
							}, function(){

								self.loadTemplate({
									name : 'stars'
								}, function(){

									self.loadTemplate({
										name : 'tosubscribeshares'
									}, function(){
										clbk(data);
									})

								})

							})
						
						})

					})
				})

				

			},

			hasplayingvideos : function(){
				var ap = _.filter(players, function(player){

					if(player.p && player.el && player.inited && player.p.playing) return true

				})
				return ap.length
			},

			destroy : function(){
				initialized = null

				delete self.app.events.delayedscroll['videos' + mid]
				delete self.app.events.delayedscroll['videosinit' + mid]
				delete self.app.events.delayedscroll['optimization' + mid]
				delete self.app.events.scroll['loadmore' + mid]
				
				delete self.app.errors.clbks[mid]

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
				}

				if (fullscreenvideoShowed){
					actions.exitFullScreenVideo(fullscreenvideoShowed)
				}

				_.each(carousels, function(carousel){
					carousel.owlCarousel('destroy')
					carousel.empty()
				})

				carousels = {}

				actions.cleardelay()

				actions.scrollmode(false)

				isotopeinited = false

				fullscreenvideoShowed = null
				fullscreenvideoShowing = null

				_.each(shareInitedMap, function(s, id){
					delete self.app.platform.sdk.node.shares.storage.trx[id]
				})

				_.each(recommendations, function(p, id){
					if (p)
						p.clearessense()
				})

				recommendations = {}
				recommendationsMaking = {}


				_.each(_reposts, function(p){
					if (p)
						p.clearessense()
				})

				_reposts = {};

				if (fullScreenVideoParallax) {
					fullScreenVideoParallax.clear()
					fullScreenVideoParallax.destroy()
					fullScreenVideoParallax = null
				}

				if(openedPost){
					
					if (openedPost.container)
						openedPost.container.close()
					else openedPost.destroy()

					openedPost = null
				}


				if (progress){
					progress.destroy()
					progress = null
				}

				if (parallax){
					parallax.destroy()
					parallax = null
				}
			
				

				app.actions.playingvideo(null);

				_.each(initedcommentes, function(c){
					c.clearessense()
				})

				initedcommentes = {}

				delete self.app.events.resize[mid]
				delete self.iclbks.lenta

				if(!essenseData.openapi && !essenseData.second && !essenseData.txids){

					delete self.app.platform.sdk.categories.clbks.excluded.lenta
					delete self.app.platform.sdk.categories.clbks.tags.lenta
					delete self.app.platform.sdk.categories.clbks.selected.lenta

					delete self.app.platform.ws.messages.comment.clbks.lenta
					delete self.app.platform.sdk.node.shares.clbks.added.lenta
					delete self.app.platform.ws.messages.transaction.clbks.temp
					delete self.app.platform.ws.messages.event.clbks.lenta

					delete self.app.platform.ws.messages["new block"].clbks.newsharesLenta
					
					delete self.app.platform.clbks.api.actions.anysubscribe.lenta

					delete self.app.platform.clbks.api.actions.blocking.lenta
					delete self.app.platform.clbks.api.actions.unblocking.lenta

					delete self.app.platform.clbks._focus.lenta
					delete self.app.platform.matrixchat.clbks.SHOWING.lenta
				}

				_.each(players, function(p){
					if (p.p)
						p.p.destroy()
				})

				players = {}

				video = false					

				if (el.w){

					el.w.off('scroll', events.videosInview);
					el.w.off('scroll', events.loadmorescroll);
					el.w.off('resize', events.resize);

				}
				

				if(el.c) el.c.empty()

				el = {};

				essenseData = {}

				w = null
			},

			authclbk : function(){
				if (el.c){
					actions.authclbk()
				}
			},

			update : function(){
				if(el.shares && isotopeinited) el.shares.isotope('layout')
			},
			
			init : function(p){

				w = self.app.el.window
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.shares = el.c.find('.shares');
				el.loader = el.c.find('.loader');
				el.lentacnt = el.c.find('.lentacell .cnt');
				el.w = essenseData.window || w;

				

				el.share = {};

				if (essenseData.horizontal){


					el.c.addClass('horizontal')
				}

				if (essenseData.compact){
					el.c.addClass('compact')
				}

				initEvents();


				clearnewmaterials()	

				make(null, p);

				if(essenseData.openapi){
					el.c.addClass('openapi')
				}

				if (video){
					el.c.addClass('mainvideo')
				}

				if(!essenseData.goback) p.clbk(null, p);

			},

			hideshowedvideo : function(){
				if (fullscreenvideoShowed){
					actions.exitFullScreenVideo(fullscreenvideoShowed)
				}
			}
		}
	};

	self.update = function(){
		_.each(essenses, function(e){
			e.update()
		})
	}

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

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
	module.exports = lenta;
}
else{

	app.modules.lenta = {};
	app.modules.lenta.module = lenta;

}
