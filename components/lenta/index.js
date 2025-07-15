
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
		video = false, isotopeinited = false, videosVolume = 0, fullscreenvideoShowing = null, loadedcachedHeight, lwidth = 0, bannerComment = null;
		var positionfixed = false
		var restoredposition = null
		var loadertimeout = null
		var lastcache = null
		var subloaded = false
		var subloadedindex = 0
		var authorsettings = {}
		var fragments = {}
		var visibilityStatus = {}

		var boosted = [],
			boostloadedblock = 0,
			boostplaces = {}

		var sharesFromRecommendations = {}

		var extra = {}, extraloading = {}, recommendations = {}, recommendationsMaking = {};

		var progress, parallax;

		var carousels = {}


		var openedPost = null
		var shareInitedMap = {},
			shareInitingMap = {},
			sharesFromSub = {},
			showMoreStatus = {},
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

		var progressInterval = {},
			loadingBars = {};

		var newsharescount = 0

		var offsetblock = 0
		var emptyinarow = 0

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
			restoreposition: function(fx){

				if(!essenseData.fixposition) return

				try{
					var json = JSON.parse(
						hexDecode(fx)
					)

					fixedblock = json.block || 0
					restoredposition = json

				}catch(e){
					console.error(e)
				}

				
			},
			fixposition : function(b, fp = ''){

				if(!essenseData.fixposition || isotopeinited) return

				if(sharesInview.length && sharesInview[0].txid == b){
					b = null
				}

				if (essenseData.includesub && !subloaded){
					b = null
				}

				if (b){

					var json = hexEncode(
						JSON.stringify({
							block : fixedblock,
							b, 
							fp,
						})
					)

					self.app.nav.api.history.addParameters({
						fx : json
					},{
						replaceState : true,
						removefromback : false
					})

					positionfixed = true
				}
				else{
					self.app.nav.api.history.removeParameters(['fx'], {
						replaceState : true,
						removefromback : false
					})

					positionfixed = false

				}

				
			},

			translate : function(txid, dl){
				return self.app.platform.sdk.translate.share.request(txid, dl).then((r) => {
					self.app.platform.sdk.translate.share.set(txid, dl)

					var share = self.psdk.share.get(txid);

					actions.actualText(share)
					
				}).catch(e => {

					console.error(e)

					sitemessage(self.app.localization.e('unabletotranslate'))

					return Promise.resolve()
				})
			},

			replaceShare : function(txid, fast){
				var replace = _.find(sharesInview, (share) => share.txid == txid)

				if (replace){
					actions.destroyShare(replace)

					var trx = self.psdk.share.get(txid)

					if (trx && el.share[replace.txid]){

						if(fast){ /// to do check
							renders.sharesInview([trx], function(){
								
							}, {
								insertimmediately : true
							})
						
						}
						else{
							renders.shares([trx], function(){
								renders.sharesInview([trx], function(){
									
								}, {
									insertimmediately : true
								})
							}, {
								inner : replaceWith,
								el : el.share[replace.txid],
								ignoresw : true,
								insertimmediately : true
							})
						}

						
					}
				}
			},

			recommendationinfo : function(share){
				if(!share || !self.app.platform.sdk.recommendations.sharesinfo[share.txid]) return


				var data = {
					...self.app.platform.sdk.recommendations.sharesinfo[share.txid] || {},
					share : share.txid
				}


				self.nav.api.load({
					open : true,
					href : 'recommendationinfo',
					inWnd : true,
					history : true,

					essenseData : data

					/*{
						info : share._recommendationInfo,
						type : share.recommendationKey,
						share : share.txid
					}*/
				})

			},
			destroyShare : function(share){

				if (fullscreenvideoShowed == share.txid){
					actions.exitFullScreenVideo(share.txid)
				}

				actions.destroyVideo(share)

				delete shareInitedMap[share.txid]


				if (initedcommentes[share.txid])
					initedcommentes[share.txid].destroy()

				if (carousels[share.txid]) carousels[share.txid].destroy()

				delete carousels[share.txid]


				delete initedcommentes[share.txid]
				delete shareInitingMap[share.txid]

				//delete el.share[share.txid] /// check
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

						var share = self.psdk.share.get(txid);

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


			optimize2 : function(){
				if(!essenseData.optimize) return

				var notoptimized = el.c.find('.portion:not(.optimized):not(:first-child):not(:nth-last-child(1)):not(:nth-last-child(2))')

				if (notoptimized.length){

					notoptimized.each(function(){
						var id = makeid()
						
						var h = $(this).height()
						
						var shares =  _.filter($(this).find('.share').map(function(){
							return shareInitedMap[this.getAttribute('id')]
						}), (v) => v)

						_.each(shares, function(share){
							actions.destroyShare(share)
						})

						window.rifticker.add(() => {
							$(this).html('<div class="optimizationDiv" style="height:'+h+'px"></div>').addClass('optimized').attr('optimization', id)
						})
						

						/*fragments[id] = fragment

						setTimeout(() => {
							$(this).html(fragment).removeClass('optimized').attr('optimization')
							fragments[id] = null
						}, 5000)*/
					})

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

				var buttonsWrapper = addressEl.closest('.sharecnt').find('.bannerComment .buttonsWrapper');

				var me = self.psdk.userInfo.getmy()

				if (me){
					var r = me.relation(address, 'subscribes') 

					if (r) {

						addressEl.addClass('subscribed');
						buttonsWrapper.addClass('following');

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
					buttonsWrapper.removeClass('following');
					addressEl.find('.notificationturn').removeClass('turnon')
				}


				renders.maybechangevisibility(address, 'sub')

				addressEl = null

			},

			changeSavingStatusLight : function(share){

				if (el && el.share && el.share[share.txid]){
					const status = self.app.platform.sdk.localshares.status(share.txid);
					const isSaving = (status === 'saving' || status === 'paused');

					const shareSaveElem = el.share[share.txid].find('.shareSave');

					if (isSaving) {
						const loadingBarHolderElem = el.share[share.txid].find('.loadingBar');
						if (!loadingBars[share.txid]) {
							const loadingBarElem = el.share[share.txid].find('.loading-bar');
							if (!loadingBarElem || loadingBarElem.length <= 0)
								return;

							// Create download progress bar
							loadingBars[share.txid] = new LoadingBar(loadingBarElem[0]);

							// Watch pause/resume events
							loadingBars[share.txid].listenStateChange((status) => {
								if (!status)
									return;
								if (status.stopped == true)
									self.app.platform.sdk.localshares.setVideoDlStatus(share.txid, 'paused');
								else
									events.shareSave(share.txid);
							});

							// Watch progress and update progress bar
							if (progressInterval[share.txid]) clearInterval(progressInterval[share.txid]);
							progressInterval[share.txid] = setInterval(async function() {
								const progress = await self.app.platform.sdk.localshares.videoDlProgress(share.txid);
								if (progress != undefined && progress.progress >= 1)
									clearInterval(progressInterval[share.txid]);
								if (progress != undefined && !isNaN(progress.progress))
									loadingBars[share.txid].setValue(progress.progress * 100);
							}, 500);

							if (status == 'paused')
								loadingBars[share.txid].setPaused();

						}
						
						loadingBarHolderElem.removeAttr('hidden');
						shareSaveElem.attr('hidden', '');
						return;
					}

					shareSaveElem.attr('status', status);
				}

			},

			changeSavingStatus : function(shareId, deleted){

				if((self.app.playingvideo || fullscreenvideoShowed) && !deleted) return

				if(initedcommentes[shareId]){
					initedcommentes[shareId].destroy()
					delete initedcommentes[shareId];
				}	
				

				
				var share = self.psdk.share.get(shareId); 

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

				}, showMoreStatus[share.txid]);
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

				/*authblock = true;

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

				})		*/		

			},

			subscribeLabels : function(){
				_.each(_.uniq(shareInitedMap, function(s){

					return s.address

				}), function(s, id){
					var share =  self.psdk.share.get(id);  
					

					if (share){
						actions.subscribeunsubscribeclbk(share.address)
						//actions.subscribeLabel(share)
					}
				})
			},

			repost : function(shareid){
				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.ui.share({
						repost : shareid
					})
				})
				

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

				window.rifticker.add(() => {
					if (el.c)
						el.c.addClass('rebuilding')
				})

				delay = slowMade(function(){

					self.app.actions.scroll(80)

					actions.loadprev()

				}, delay, isMobile() ? 1200 : 600)	

					
			},

			loadprev : function(clbk){
				el.c.find('.shares').empty('')

				el.c.removeClass('showprev')

				el.c.removeClass("sharesEnded")
				el.c.removeClass('sharesZero')

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
				}

				actions.observe()

				isotopeinited = false

				clearnewmaterials()	

				actions.clear()
				
				essenserenderclbk()

				self.app.actions.scroll(0)

				self.app.psdk.clearallfromdb('shareRequest')

				make(clbk);

				self.app.nav.api.history.removeParameters(['v', 's'], {
					replaceState : true,
					removefromback : false
				})

				actions.fixposition(null)
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
				lastcache = null;
				isotopeinited = false
				loadertimeout = null
				sharesFromRecommendations = {}
				authorsettings = {}
				showMoreStatus = {}
				positionfixed = false
				restoredposition = null

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

				_.each(carousels, function(carousel){
					carousel.destroy()
				})

				carousels = {}

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
				visibilityStatus = {}
				
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

					var k = ''
					var larray = sharesInview

					var first = _.max(sharesInview, (s) => {
						return s.id
					})

					if (sharesFromSub[first.txid]){
						k = '_sub'

						larray = _.toArray(sharesFromSub)
					}

					var last = _.min(larray, (s) => {
						return s.id
					})

					if (first && last){
						self.app.platform.sdk.sharesObserver.view(essenseData.observe + k, first.id, last.id)
					}

				}

			},	

			loadmore : function(loadclbk){

				if(!el.c) return

				essenseData.page = ++essenseData.page
				actions.observe()

				renders.loader(true)

				load.shares(function(shares, error){


					renders.loader(false)


					if (error){
						making = false;
							
						el.c.addClass('networkError')

						if (self.app.errors.connectionRs()){
							self.iclbks[mid] = actions.loadmore
						}

						return;
					}
					
					if (el.c && el.c.hasClass('networkError'))
						el.c.removeClass('networkError')


					if (shares){
						renders.shares(shares, function(){

							renders.sharesInview(shares, function(){
								essenserenderclbk()

								events.loadmorescroll()
							})

						}, {
							index : sharesInview.length
						})
					}

					if (loadclbk)
						loadclbk(shares, error)

				}, lastcache || null)

				lastcache = null
			},
			includeboost : function(clbk){

				if(!el.c) return

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

												try{
													var content = $(html)
													lel.append( content ).isotope( 'appended', content )
												}
												catch(e){
													console.error(e)
												}
												
							
											}
											else{

												var elBst = null

												
												if (
													essenseData.author || 
													recommended == 'best' || 
													recommended == 'recommended' || 
													recommended == 'sub'){
													
													elBst = el.share[share.txid]

												}
												else{
													elBst = el.share[share.txid].closest('.authorgroup')
												}


												var _el = $("<div/>", {'class' : 'boosted'})
													_el.insertAfter(elBst)
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
			/*removeAdditionalByScroll : function(){

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
				
			},*/

			

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

				if(!el.share || !el.share[share.txid]) return

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

						console.log("LENTA PLAYER CLBK", player)

						if(!el.share) return

						if (player){
							players[share.txid] || (players[share.txid] = {})
							players[share.txid].p = player
							players[share.txid].initing = true
							players[share.txid].el = el.share[share.txid].find('.videoWrapper')
							players[share.txid].id = players[share.txid].el.attr('pid')
							players[share.txid].shadow = false

							delete players[share.txid].error

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
						mobile : self.app.mobileview,
						controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
						speed : {
							selected : 1,
							options: [1]
						},

						television : app.television,

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

							if(essenseData.playingClbk) essenseData.playingClbk(players[share.txid].p)

							if(isMobile() && share.itisvideo() && !self.app.platform.sdk.usersettings.meta.videoautoplay2.value){
								actions.fullScreenVideo(share.txid)
							}
						},


						pause : function(){

							videopaused = true

							self.app.actions.playingvideo(null, players[share.txid].p)

							if(essenseData.playingClbk) essenseData.playingClbk(null)
						},

						playbackStatusUpdate : function({
							position,
							playbackState,
							duration
						}){

							if (duration > 0 && playbackState == 'playing'){
								self.app.platform.sdk.memtags.add(share.tags, null, 0.500 / duration)
							}

							if (playbackState == 'playing' && ((position > 10 && duration > 120) || startTime)){

								self.app.platform.sdk.videos.historyset(share.txid, {
									time : position,
									percent : ((position/duration)* 100).toFixed(0),
									data : share.export(true)
								})

								self.app.platform.sdk.activity.adduser('video', share.address, 6 * position / duration, share)
								return
							}

							if(playbackState == 'playing' && duration < 120 && position / duration > 0.2){
								self.app.platform.sdk.activity.adduser('video', share.address, 6 * position / duration,  share)
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

			actualText : function(share){

				if(share.itisarticle()){

					actions.replaceShare(share.txid, true)

					return
				}

				var _el = el.share[share.txid].find('.shareTable[stxid="'+share.txid+'"] >div.cntswrk.postcontent')

				var translated = self.app.platform.sdk.translate.share.get(share.txid) || {}

				var c = findAndReplaceLink(share.renders.caption(translated.c, translated.m), true)

				var m = share.renders.message(translated.c, translated.m);
				if(!showMoreStatus[share.txid]) m = trimHtml(m, 750, 15);
				var nm = self.app.actions.emoji(nl2br(findAndReplaceLink(m, true)))

				window.rifticker.add(() => {

					_el.find('.sharecaption span').html(c)

					_el.find('.message').html(nm)

					self.nav.api.links(null, _el.find('.message'));
					self.nav.api.links(null, _el.find('.sharecaption'));
					
					if (showMoreStatus[share.txid]){
						_el.find('.showMore,.showMorePW').remove()
					}
				})
			},

			openPost : function(id, clbk, video, _share, openWnd){
				var share = self.psdk.share.get(id) || _share; 
				

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

						var prefix = 's'


						if(video) prefix = 'v'

						self.nav.api.load({
							open : true,
							href : 'post?'+prefix+'=' + id,
							inWnd : true,
							history : true,
							clbk : c,
							essenseData : ed
						})

					})

				}
				else
				{

					if(!el.share[id]) return

					var share = self.psdk.share.get(id)

					if(!share) return

					showMoreStatus[share.txid] = true

					actions.actualText(share)

				}

			},

			sharesocial : function(id, clbk){

				if(!shareInitedMap[id]) return

				var share = self.psdk.share.get(id)

				if (share){

					var url = 'https://'+self.app.options.url+'/' + ('post?') + 's='+id
					//if (parameters().address) url += '&address=' + (parameters().address || '')


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
				var share = self.psdk.share.get(id)

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
				var share = self.psdk.share.get(id)

				if (share){

					

			

					var userinfo = self.psdk.userInfo.get(share.address) || {
						address : share.address,
						addresses : []
					}

					var t = (share.caption || share.message)

					var link = 'send?address=' + share.address + '&amount=1'
					+'&label=' + (userinfo.name || userinfo.address) + '&setammount=true'


					self.fastTemplate('donation', function(rendered){
						new dialog({
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

			pkoin : function(id, format){

				var type = format === 'liftUpThePost' ? 'boost' : 'pkoin';

				var share = self.psdk.share.get(id)

				if (share){

					self.app.platform.sdk.user.stateAction(() => {
						var userinfo = self.psdk.userInfo.get(share.address) || {
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
								id : id,
								format: format,
								type: type
							}
						})
					})
					
				

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

					actions.setVolume(players[id], videosVolume || 1)
			},

			opensvi : function(id){

				if (essenseData.opensvi){
					essenseData.opensvi(id, self.psdk.share.get(id))
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
				var share = self.psdk.share.get(id);

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

				var share = self.psdk.share.get(id) 

				if(!share) return

				if (share.itisstream()){

					console.log("HERE")

					if(essenseData.opensvi && essenseData.opensviStream){
						
						actions.opensvi(id)
						return
					}

					console.log("HERE2")

					if(isMobile() && !self.app.television){
						self.nav.api.load({
							open : true,
							href : 'post?s=' + id,
							history : true,
						})
					}
					else{
						self.nav.api.load({
							open : true,
							href : (essenseData.urlprefix || 'index') + '?video=1&v=' + id,
							history : true,
						})
					}

					

					return
				}

				if (fullscreenvideoShowing) { return }
				if (fullscreenvideoShowed) { return }
				if (essenseData.openapi){ return }

				fullscreenvideoShowing = id

				var _el = el.share[id]
				

				actions.initVideo(share, function(res){

					fullscreenvideoShowing = null

					if(!res){
						return
					}
					
					if(!players[id]) return;

					self.app.actions.closepip()

					fullscreenvideoShowed = id;

					self.app.mobile.reload.destroyparallax()

					self.app.pseudofullscreenmode = true

					_el.addClass('fullScreenVideo')
				
					actions.videoPosition(id)

					actions.fullScreenVideoParallax(_el, id)

					self.app.mobile.statusbar.gallerybackground()

					self.app.nav.api.history.addParameters({
						v : id
					}, {
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

				if(!self.app.actions.getScroll()){
					self.app.mobile.reload.initparallax()
				}

				actions.removeRecommendationsFullScreenVideo(id)

				var share = self.psdk.share.get(id) 

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

			getpaidsubscription : function(txid, clbk){
				var share = self.psdk.share.get(txid)

				if(!share) return

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

			postscores : function(txid, clbk){

				var share = self.psdk.share.get(txid)
				

				if(!share) return

				self.app.platform.sdk.user.stateAction(() => {
					var checkvisibility = app.platform.sdk.node.shares.checkvisibility(share);

					var reputation = ((self.psdk.userInfo.get(share.address) || {}).reputation) || 0
					
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

				var reputation = ((self.psdk.userInfo.getmy() || {}).reputation) || 0


				if (checkvisibility && reputation >= 50) {
					if (clbk)
						clbk(false)

					return
				}



				if(value <= 3 && !self.app.test){
					if(self.app.platform.sdk.user.scamcriteria()){
						if(clbk)
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

				if (value === "1"){

					//// TODO_CHECK

					self.app.platform.ui.showCommentBanner(el.c.find('#' + obj.txid), (c) => {
						bannerComment = c
					}, obj.address, true);

				}

				if (self.app.platform.sdk.user.reputationBlockedMe()){
					sitemessage(self.app.localization.e('lockedaccount'))

					if (clbk)
						clbk(false)

					return
				}

				self.app.platform.sdk.upvote.checkvalue(value, function(){

					var upvoteShare = obj.upvote(value);

					if(!upvoteShare){
						self.app.platform.errorHandler('4', true)	

						if(clbk)
							clbk(false)

						return
					}

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
			
			openGalleryRec : function(share, initialValue, clbk){

				var allimages = [];

				var getimages = function(share, clbk){

					_.each(share.images || [], function(i){
						allimages.push(i)
					})


					if(!share.repost && share.objecttype != 'jury'){

						if (clbk)
							clbk()

					}

					else{

						if(share.objecttype == 'jury' && share.type != 'share'){
							
							if (clbk)
								clbk()

							return
						}

						self.app.platform.sdk.node.shares.getbyid(share.repost || share.key, function(shares){

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

				//if(isMobile() && !self.app.platform.sdk.usersettings.meta.videoautoplay2.value) return

				if (essenseData.canloadmorescroll){
					if(!essenseData.canloadmorescroll()) return
				}
				
				if(fullscreenvideoShowed) return

				var ap = _.filter(players, function(p){

					if(p.inited && !p.playing && !p.stopped && p.el && !p.preview && !p.error) return true

				})

				var playing = _.filter(players, function(p){

					if(p.inited && p.playing && p.el && !p.preview && !p.error) return true

				})

				if(!playing.length && isMobile() && !self.app.platform.sdk.usersettings.meta.videoautoplay2.value) return

				if(ap.length){

					ap = _.filter(ap, function(p){
						return p.el
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
						obj : self.psdk.share.get(id),

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

					var s = self.psdk.share.get(this.getAttribute('id')) 
					
					if (s) arranged.push(s)
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

			recommendationinfo : function(){

				var shareId = $(this).closest('.share').attr('id');

				var share = self.psdk.share.get(shareId) 
				

				actions.recommendationinfo(share)

			},

			translateto: function(){

				var _el = $(this)

				var shareId = _el.closest('.share').attr('id');
				var dl = _el.attr('dl')

				var active = _el.hasClass('active')

				if(active) return

				var l = _el.closest('.translateApi').find('.loading')

				if (l.length) return

				_el.closest('.translateApi').find('.translateto').removeClass('active')
				_el.addClass('loading')

				actions.translate(shareId, dl).then(() => {
					_el.removeClass('loading')
					_el.addClass('active')
				})
				
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
			openauthorwindow: function(){

				var shareId = $(this).closest('.share').attr('id');

				var share = self.psdk.share.get(shareId) 
				

				actions.openauthorwindow(share.address)
			},
			toregistration: function(){

				var shareId = $(this).closest('.share').attr('id');

				var share = self.psdk.share.get(shareId) 

				if (share.itisvideo()){
					self.sdk.registrations.redirect = 'post?s=' + shareId
				}
				else{
					self.sdk.registrations.redirect = 'authorn?address='+share.address+'&s=' + shareId
				}

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})	
			
			},
			juryyes : function(){
				var _el = $(this).closest('.juryitem')

				var juryid = _el.attr('juryid');

				var jury = self.psdk.jury.get(juryid) 

				var verdict = 1

				new dialog({
					class : 'zindex',
					html : self.app.localization.e('juryconfirm'),
					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),
					success : function(){	

						
						self.app.platform.sdk.jury.sendverdict(jury, verdict).then(() => {

							setTimeout(() => {
								self.app.platform.sdk.jury.updatejurycount()
							}, 1000)
							

							_el.remove()
						}).catch(e => {
							console.error(e)

							sitemessage(e)
						})

					}
				})
			},

			juryno : function(){

				var _el = $(this).closest('.juryitem')

				var juryid = _el.attr('juryid');

				var jury = self.psdk.jury.get(juryid) 

				var verdict = 0

				new dialog({
					class : 'zindex',
					html : self.app.localization.e('juryconfirm'),
					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),
					success : function(){	

						self.app.platform.sdk.jury.sendverdict(jury, verdict).then(() => {
							_el.remove()
						}).catch(e => {
							console.error(e)

							sitemessage(e)
						})

					}
				})
			},
			shareSave : function(shareTxId){

				var shareId = (shareTxId && typeof shareTxId === 'string') ? shareTxId : $(this).closest('.share').attr('id');

				var share = self.psdk.share.get(shareId) 
				

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

						var share = self.psdk.share.get(_el.attr('id')) 
						
						if (share.itisstream()) return

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

						//	player.p.muted = true;

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

				var share = self.psdk.share.get(shareId)  
				
				actions.repost(share.repost || shareId);
			},

			pkoin : function(){

				var shareId = $(this).closest('.share').attr('id');

				actions.pkoin(shareId, 'sendToAuthor')

			},

			boost : function(){


				var shareId = $(this).closest('.share').attr('id');

				actions.pkoin(shareId, 'liftUpThePost')

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

				if(!essenseData.horizontal){
					lwidth = self.app.width < 768 && self.app.width > 0 ? self.app.width : el.c.width()
				}
				
			},	

			loadmorescroll : function(){

				if(!el.c) return

				if (essenseData.canloadmorescroll){
					if(!essenseData.canloadmorescroll()) return
				}


				if(!essenseData.horizontal){

					if (initialized && positionfixed){
						if(self.app.lastScrollTop < 1000 && !restoredposition && initialized){
							actions.fixposition(null)
						}
					}


					if (
						!loading && !ended &&

						(self.app.lastScrollTop + self.app.height > document.body.scrollHeight - 2000) 

						&& loadedcachedHeight != cachedHeight
	
						) {

							loadedcachedHeight = cachedHeight


							actions.loadmore(function(s, e){
								if(e){
									loadedcachedHeight = 0
								}
							})

							setTimeout(function(){
								loadedcachedHeight = 0
							}, 5000)
	
					}
				}
				else{

					if (
						!loading &&  (!ended && (recommended != 'recommended' || recommended != 'best')) &&
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

				 

					actions.like(self.psdk.share.get(shareId).findComment(id))

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

			getpaidsubscription: function(){
				var id = $(this).closest('.share').attr('id');

				actions.getpaidsubscription(id)
			},

			

			like : function(){
				var p = $(this).closest('.stars');

				if (p.attr('value')){
					return
				}

				var id = $(this).closest('.share').attr('id');
				var value = $(this).attr('value');

				let s =  self.psdk.share.get(id) 
				

				if(!id) id = $(this).closest('.truerepost').attr('stxid')

				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.sdk.node.shares.getbyid(id, function(){
						if(s.address == self.app.user.address.value) return

						if(self.app.platform.sdk.user.myaccauntdeleted()){
							return
						}

						

						p.attr('value', value)
						p.addClass('liked')

						actions.like(s, value, function(r){
							if(r){
								if (value == 5){
									if(!el.share[id]) return
									
									if (initedcommentes[id])
										initedcommentes[id].showBanner(initedcommentes[id]);
									
	
									self.app.platform.effects.templates.commentstars(el.share[id], value, function(){
										if (initedcommentes[id]){
											initedcommentes[id].attention(self.app.localization.e('starssendcomments'))
										}
									})
								}
							}
						})

					})
				})



			},

			complain : function(){

				var p = $(this).closest('.share')
				
				var id = p.attr('id');

				self.app.mobile.vibration.small()

				actions.complain(id)
					
			},

			/*additional : function(){

				var _el = $(this).closest('.share');

				actions.additional(_el, !_el.hasClass('showAdditional'))

			},*/

			openGallery : function(){
				
				var id = $(this).closest('.shareinlenta').attr('id');
				var src = $(this).attr('i')

				var share = self.psdk.share.get(id) 

				if (share){
					
				}
				else{
					share = _.find(sharesInview, (s) => {
						return s.txid == id
					})
				}

				if(share){
					self.app.mobile.vibration.small()
					actions.openGalleryRec(share, src)
				}
				else{
					console.error('empty share')
				}
				

				
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
				
				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.api.actions.subscribeWithDialog(address, function(tx, error){
						if(tx){
							
						}	
						else{
							self.app.platform.errorHandler(error, true)	
						}
						
					})
				})
				

			},

			aunsubscribe : function(){
				var address = $(this).closest('.shareTable').attr('address')

				var _el = $(this).closest('.share')


				new dialog({
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
				const shareId = $(e.target).closest('.share').attr('id');
				actions.exitFullScreenVideo(shareId);
			},

			exitFullScreenVideo : function(){
				var shareId = $(this).closest('.share').attr('id');

					actions.exitFullScreenVideo(shareId)
			},

			fullScreenVideo : function(){

				var shareId = $(this).closest('.shareTable').attr('stxid');

					self.app.mobile.vibration.small()

				actions.fullScreenVideo(shareId)
			},

			opensvi : function(e){

				var shareId = $(e.target).closest('.shareTable').attr('stxid');

				if (essenseData.horizontal) {
					self.app.Logger.info({
						actionId: 'BEST_VIDEO_CLICKED',
						actionValue: shareId,
					});
				}

				actions.opensvi(shareId)
			},

			fullScreenVideoMobile : function(){
				var shareId = $(this).closest('.shareTable').attr('stxid');

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

			showblockedpost : function(){
				$(this).closest('.blockAuthor').remove()
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

			loader : function(show){

				if(show){
					loadertimeout = setTimeout(() => {

						window.rifticker.add(() => {

							if(el.loader && !el.loader.hasClass('loading')){
								el.loader.addClass('loading')
							}

							loadertimeout = null

						})

					}, 600)
				}

				else{

					if(loadertimeout){
						clearTimeout(loadertimeout)
						loadertimeout = null
					}

					if (el.loader && el.loader.hasClass('loading')){
						window.rifticker.add(() => {
							el.loader.removeClass('loading')
						})
					}
				}
						
			},

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
						var share = sharesInview[p.position - 1]

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
			comments : function(txid, init, showall, preview, clbk){



				if(essenseData.comments == 'no') {

					if(clbk) clbk()

					return
				}

				if(video) {

					if(clbk) clbk()

					return
				}

				if(initedcommentes[txid]) {

					if(clbk) clbk()

					return
				};

				if(!el.c) return

				if(recommended == 'saved') {

					if(clbk) clbk()

					return
				}

				var _el = el.c.find('#' + txid + " .commentsWrapper");

				var share = self.psdk.share.get(txid)

				if(!share){

					if(clbk) clbk()

					return
				}

				if(share.itisstream()){

					var meta = window.parseVideo(share.url)
					if (meta){
						var state = window.peertubeglobalcache[meta.id]

						if (state && state.isLive){
							if(clbk) clbk()
							return
						}
					}
					
				}

				var checkvisibility = share ? app.platform.sdk.node.shares.checkvisibility(share) : false;

				if(!el.c) return

				var e = el.c.find('#' + txid);

				var rf = ''

				if (self.app.user.address.value){
					rf = '&ref=' + self.app.user.address.value
				}

				var hr = 'https://'+self.app.options.url+'/' + (essenseData.hr || 'index?') + 's='+txid+'&mpost=true' + rf

				if (parameters().address) hr += '&address=' + (parameters().address || '')

				self.nav.api.load({
					open : true,
					id : 'comments',
					el : _el,

					eid : txid + 'lenta',
					

					essenseData : {
						close : true,
						totop : el.c.find('#' + txid),
						//caption : rendered,
						/*send : function(comment, last){

							var c = el.c.find('#' + txid + " .commentsAction .count span");

							c.html(Number(c.html() || "0") + 1)

							share.lastComment = last
						},*/

						txid : txid,
						showall : essenseData.comments == 'all' || showall,	
						fromtop: essenseData.comments == 'all' || e.hasClass('fullScreenVideo') || false,
						preview : true, // essenseData.comments == 'all' ? false : preview,
						listpreview : essenseData.comments == 'all' ? false : preview,
						//lastComment : essenseData.comments != 'all' ? share.lastComment : null,
						
						init : essenseData.comments == 'all' ? false : init,
						hr : hr,
						receiver: share.address,
						cantsend : checkvisibility,
						renderClbk : function(){

							essenserenderclbk()
						},

						previewClbk : function(){
							if(clbk) clbk()
						}
					},

					clbk : function(e, p){

						

						if(!el.c) return

						if (p)
							initedcommentes[txid] = p

						essenserenderclbk()

						
					}
				})

	
				
			},

			juryItem : function(item, clbk, all, p){

				var _el = p.el || el.share[item.txid] 
				var _elcnt = _el.find('.jurycnt')

				shareInitingMap[item.txid] = false;
				shareInitedMap[item.txid] = true;

				var c = function(){
					window.rifticker.add(() => {

						if(!_el.hasClass('rendered')){
							_el.addClass('rendered')
						}
	
						if (clbk) clbk();
	
						clbk = null
	
					})
				}

				setTimeout(() => {
					c()
				}, 3000)


				if (item.type == 'share'){
					renders.repost(_el, item.key, item.txid, false, () => {
						c()
					}, all)

					return
				}

				if (item.type == 'comment'){


					self.app.platform.papi.comment(item.commentPs.postid, _elcnt, () => {
						c()
					}, {jury : true, commentPs : item.commentPs})
					
					return
				}

				if (item.type == 'channel'){

					self.app.platform.papi.channel(item.key, _elcnt, () => {
						c()
					}, {jury : true})
					
					return
				}

				c()

				
			},
			
			share : function(share, clbk, all, p){

				if(!p) p = {}

				if(!share) {
					if(clbk) clbk()
					return
				}

				var _el = p.el || el.share[share.txid] 

				if(!p.repost)
					shareInitingMap[share.txid] = true;

				if(share.objecttype == 'jury'){
					return renders.juryItem(share, clbk, all, p)
				}

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
						authorsettings,
						fromrecommendations : sharesFromRecommendations[share.txid] && self.app.platform.sdk.recommendations.sharesinfo[share.txid] ? true : false
					},
					insertimmediately : p.insertimmediately

				}, function(p){

					if(!p.repost) shareInitedMap[share.txid] = true;	

					var promises = []

					promises.push(new Promise((resolve, reject) => {

						renders.stars(share, () => {
							resolve()
						})
					}))

					if(!share.temp && !share.relay){

						promises.push(new Promise((resolve, reject) => {

							renders.comments(share.txid, false, false, true, () => {
								resolve()
							})
						}))
						
					}

					promises.push(new Promise((resolve, reject) => {


						renders.url(p.el.find('.url'), share.url, share, function(){

							renders.urlContent(share, function(){
	
								if(essenseData.searchValue){
									p.el.find('.canmark').mark(essenseData.searchValue);
								}

								if(essenseData.searchTags){
									p.el.find('.canmark').mark(_.map(essenseData.searchTags, (t) => {
										return '#' + t
									}).join(' '));
								}
	
								if(!video) actions.initVideoLight(share)
	
								if(isotopeinited) el.shares.isotope()
	
								shareInitingMap[share.txid] = false;	
								
								resolve()
												
								
	
							});
	
						})

					}))
			
					

					if (!video) {
						promises.push(new Promise((resolve, reject) => {
							renders.images(p.el.find('.cntswrk.cntscontent.postcontent'), share, () => {
								resolve()
							})
						}))
						
						if (share.itisarticle()){
							promises.push(new Promise((resolve, reject) => {
								renders.articlespart(p.el.find('.sharearticle'), share, () => {
									resolve()
								})
							}))
							
						}
						else{
	
							// TO DO
							promises.push(new Promise((resolve, reject) => {

								renders.repost(p.el, share.repost, share.txid, share.isEmpty(), resolve, all)

							}))
								
						}
					}

					var c = function(){

						window.rifticker.add(() => {

							if(!p.el.hasClass('rendered')){
								p.el.addClass('rendered')

								if (p.el.hasClass('hashiddengroup')){
									p.el.closest('.authorgroup').find('.showmorebyauthor').addClass('active')
								}


								var checkvisibility = self.app.platform.sdk.node.shares.checkvisibility(share)

								visibilityStatus[share.txid] = checkvisibility

								if (checkvisibility == 'paid_check'){

									self.app.platform.sdk.paidsubscription.checkvisibilityStrong(share.address).then(r => {
										console.log("checkvisibilityStrong", r)
									}).catch(e => {
										console.error('checkvisibilityStrong', e)
									})

								}

							}

							


							if (clbk) clbk();

							clbk = null

						})
					}

					
					if (video){
						c()
					}
					else{

						Promise.all(promises).catch(e => {}).then(() => {
							c()

							/*setTimeout(() => {
								p.el.css('contain-intrinsic-size', p.el.height() + 'px')
								p.el.css('content-visibility', 'auto')
							}, 5000)*/
						})
						
						setTimeout(() => {
							c()
						}, 300)
					}
					
					

					/*var time = 3000

					if(p.el.find(".shareImages .image").length > 1 || !index) c()
					else

						setTimeout(() => {
							c()
						}, time)*/
					
				})

			},

			articlespart : function(wr, share, clbk){
				self.app.platform.ui.articledecoration(wr, share, false, clbk)
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
					else{
			
					}
				})

				var ids = _.map(_shares, function(s){
					return s.txid
				})

				self.app.platform.sdk.likes.get(ids, function(){

					_.each(shares, function(share){

						if (share.myVal){
							renders.stars(share)
						}

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

				if (video) { if(clbk) clbk(); return }

				if (el.share && el.share[share.txid] ){

					window.rifticker.add(() => {

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
					})

				}
				
			},

			maybechangevisibility : function(address, reason){

				var shares = []
				
				_.each(shareInitedMap, function(v, txid){

					if(!v) return

					var share = self.psdk.share.get(txid)  
					

					if(!share) return

					if (share.address == address && share.visibility()) {

						if (reason && reason == 'sub' && share.visibility() != 'sub') return
						if (reason && reason == 'paid' && share.visibility() != 'paid') return

						var ns = self.app.platform.sdk.node.shares.checkvisibility(share)

						if (visibilityStatus[share.txid] == ns) {
							return
						}

						visibilityStatus[share.txid] = ns

						/*if(reason && reason == 'paid'){
							if(self.app.platform.sdk.node.shares.checkvisibility(share) == 'paid_success'){

							}
						}*/

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
					//sync : true,

					action : function(_p, index ){
						var share = _p.item;


						if(shareInitedMap[share.txid]){
							_p.success()
						}
						else
						{
							shareInitedMap[share.txid] = true


							renders.share(share, _p.success, showMoreStatus[share.txid] || false, {
								boosted : p.boosted,
								index : index,
								insertimmediately : p.insertimmediately
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
					var share = self.psdk.share.get(txid) 
					
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

				if ((essenseData.author && !essenseData.video) || (recommended && recommended!='hot') || essenseData.txids || ((essenseData.searchValue || essenseData.searchTags) && !self.app.television)){
					tpl = 'shares'
				}

				console.log('tpl recommended', tpl, recommended)

				if (recommended == 'jury'){
					tpl = 'juryitems'
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
						boosted : p.boosted,
						recommended,
						ed : essenseData
					},
					animation : false,
					delayRender : isotopeinited,
					insertimmediately : p.insertimmediately || false

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

						var sushares = _.toArray(sharesFromSub)
						var position = subloadedindex

						if (boostplaces){
							_.each(boostplaces, (v, i) => {
								if(i < subloadedindex && v){
									position++
								}
							})
						}

						renders.extra({
							key : 'tosubscribeshares',
							render : 'tosubscribeshares',
							position : position,
							share : sushares.length ? sushares[sushares.length - 1] : null
						})
					}	

					essenserenderclbk()

					if (video && (!isMobile() && !self.app.television)){
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

				var cwidth = self.app.width

				var mw = self.app.width <= 768 || essenseData.openapi

				if (mw){ 

					if(essenseData.openapi){
						cwidth = lwidth
					}
					else{
						cwidth = Math.min(self.app.width, 640)
					}
					
				
				}
				else {

					cwidth = Math.min(590, lwidth - 100)
					

				}

				if (images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

					return

				}

				var ch = 0
				
				_el.imagesLoadedPN({ imageAttr: true }, function(image) {

					if(s.settings.v != "a"){

						if((mw) && image.images.length > 1 ){

							_.each(image.images, function(img, n){
								var _img = img.img;

								var el = $(image.elements[n]).closest('.imagesWrapper');

								var aspectRatio = _img.naturalHeight / _img.naturalWidth

								if(aspectRatio > 1.66) aspectRatio = 1.66

								window.rifticker.add(() => {
									el.height( Math.min( self.app.height / 1.5, images.width() || lwidth || self.app.width) * aspectRatio)
								})
							})
							
						}
						else{

							var imageswidth = cwidth

							_.each(image.images, function(img, n){

								var _img = img.img;
								var el = $(image.elements[n]).closest('.imagesWrapper');

								var ac = '';

								var _w = mw && !essenseData.openapi ? self.app.width : (el.width() || el.closest('.share').width());

								if(_img.naturalWidth >= _img.naturalHeight && (essenseData.openapi || image.images.length == 1)){
									ac = 'w2'

									var w = _w * (_img.naturalWidth / _img.naturalHeight);

									if (w >= imageswidth){
										w = imageswidth

										var h = w * ( _img.naturalHeight / _img.naturalWidth) 

										window.rifticker.add(() => {

											el.height(h);
										})
									}
									window.rifticker.add(() => {

										
										el.width(w);
									})
								}

								if(_img.naturalHeight >= _img.naturalWidth && (essenseData.openapi || image.images.length == 1)){
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

						window.rifticker.add(() => {
						
							images.addClass('active')
							_el.addClass('active')

							images = null,
							_el = null,
							sel = null;

							essenserenderclbk()

							if (clbk)
								clbk()

						})

						
					}

					if(s.settings.v != 'a' && image.images.length > 1){

						if (mw || essenseData.openapi) {
							carousels[s.txid] = new carousel(images, '.imagesWrapper', '.imagesContainer')
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
				

				});

				

				
			},

			repost : function(el, repostid, txid, empty, clbk, all){

				if(repostid){
			
					self.shell({
						animation : false,
						name :  'repost',
						el : el.find('.jurycnt, .repostWrapper'),
						data : {
							repost : repostid,
							level : 1
						},
	
					}, function(_p){

						if(_p.el && _p.el.length){
							
							self.app.platform.papi.post(repostid, _p.el.find('.repostShare'), function(e, p){

								_reposts[txid] = p;

								if(clbk) clbk()
	
							}, {
								repost : true,
								eid : txid + 'lenta',
								level : 1,
								fromempty : empty,
								minimize : !all ? true : false,
								jury : recommended == 'jury'
							})
						}	

					})

				}

				else{
					if(clbk) clbk()
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

						var images = _p.el.find('.ogimage');
	
						self.app.nav.api.links(null, _p.el, function(event){
							event.stopPropagation()
						})
	
						essenserenderclbk()
						images.imagesLoadedPN({ imageAttr: true }, function(image) {
	
							_.each(image.images, function(i, index){

								if (!i.isLoaded){
									$(images[index]).closest('.image').css('display', 'none')
								}

								else{
									$(images[index]).on('click', function(){
										var src = $(this).attr('src')
			
										self.app.platform.ui.images(src)
									})
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

						!(meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube' || meta.type == 'ipfs') &&

						!self.app.platform.sdk.usersettings.meta.preview.value
					){

						self.app.platform.sdk.remote.getnew(url).then(og => {
							if (og && el.share && el.share[share.txid]){
								renders.url(el.share[share.txid].find('.url'), url, share, clbk)
							}
							else
							{
								if (clbk)
									clbk()
							}
						})

						/*self.app.platform.sdk.remote.get(url, function(og){
							
							

						})*/

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
				
				var cache = (!self.app.platform.currentBlock || !boostloadedblock || boostloadedblock + 3 > self.app.platform.currentBlock) ? 'cache' : 'clear'

				self.app.platform.sdk.node.shares.getboostfeed({

					lang: essenseData.lang,

					height : fixedblock,
					tagsfilter : tagsfilter,
					type : type,
					count : 10,
					tagsexcluded : tagsexcluded

				}, function(shares, error, pr){


					boostloadedblock = self.app.platform.currentBlock

				
					if(clbk) clbk(shares)

				}, _.toArray(boostplaces).length, cache)
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

				newsharescount = shares.length
				if (!shares.length) {
					emptyinarow++
				} else {
					emptyinarow = 0
				}


				var allshares = [].concat(shares, bshares)


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
						lastcache = 'clear'

						self.app.platform.sdk.newmaterials.see('sub')
					}


					_.each(shares, function(share){
						sharesFromSub[share.txid] = share
					})

				}

				var recommendations = []


				if(essenseData.includerec && !includingsub && !self.app.platform.sdk.categories.gettags().length){

					recommendations = self.app.platform.sdk.recommendations.getshares(rand(0, 3)) || []

					allshares = [].concat(allshares, recommendations)

				}

				allshares = _.uniq(allshares, (s) => {
					return s.txid
				})

				var author = essenseData.author;

				if (pr.txid && !includingsub) actions.fixposition(pr.txid)

				self.app.platform.sdk.node.shares.loadvideoinfoifneed(allshares, video, function(){

					self.app.platform.sdk.node.shares.users(allshares, function(l, error2){

						countshares = countshares + allshares.length

						loading = false;
						

						if (!el.c) return

						/*if (essenseData.openapi || essenseData.txids)
							el.c.removeClass('loading')*/

						if(!error && !error2){


							if(!shares || !shares.length || (shares.length < pr.count)){

								if(!beginmaterial && !countshares && !includingsub){
									el.c.addClass("sharesZero")
								}
								else
								{

		
									if ( !essenseData.txids && (shares.length < pr.count || recommended == 'recommended') && (recommended || author || essenseData.searchValue || essenseData.searchTags) ){

		
										setTimeout(function(){
											if (el.c)
												el.c.addClass("sharesEnded")
										}, 1000)
										
									}
		
								}

								
								if ((!shares.length || shares.length < pr.count) && (recommended || author || essenseData.searchValue || essenseData.searchTags) && !includingsub){

									if(essenseData.ended) {
										ended = essenseData.ended(shares)
									}

									//30 is a month depth
									if (pr.page < 30) {
										ended = false
									}

									else
										ended = true

								}

								if(!shares.length && !essenseData.ended && !includingsub && (emptyinarow >= 3 || offsetblock >= 43200 )){
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


							//shares.concat(bshares)

							shares = [].concat(bshares, shares)

							if(!restoredposition && essenseData.includerec && !includingsub && !self.app.platform.sdk.categories.gettags().length){
								shares = [].concat(recommendations, shares)

								_.each(recommendations, (r) => {
									sharesFromRecommendations[r.txid] = true
								})
							}

							if (essenseData.filter) {
								shares = _.filter(shares, essenseData.filter)
							}

							shares = _.uniq(shares, (s) => {
								return s.txid
							})

							shares = _.filter(shares, (s) => {
								return !shareInitedMap[s.txid]
							})


							if(!essenseData.author && self.user.address && self.user.address.value){

								var me = self.psdk.userInfo.getmy()

								if(!essenseData.allowblocked && recommended != 'jury'){
									shares = _.filter(shares, function(share){

										if(!me) return true 
	
										var r = me.relation(share.address, 'blocking') 
	
										if (r) return false
	
										return true
									})
								}

								
							}


							
							if (essenseData.hasshares){
								essenseData.hasshares(shares)
								delete essenseData.hasshares
							}
						}

						else{
							if (essenseData.hasshares){
								essenseData.hasshares([])
								delete essenseData.hasshares
							}
						}

						if (essenseData.afterload){
							essenseData.afterload(essenseData, shares, error || error2)
						}
						
						var temp = self.sdk.node.transactions.temp;


						//// TODO_REF_ACTIONS

						var getPin = function(settings){

							var pinnedId = shares.findIndex(function(share){
								return share.txid === settings.pin;
							});

							if (pinnedId > -1){

								var pinnedShare = shares.splice(pinnedId, 1);
								
								//pinnedShare[0].pin = true; //// wrong
								shares.unshift(pinnedShare[0]);		

								if (clbk)
									clbk(shares, error || error2)
								return;

							} else {

								self.app.platform.sdk.node.shares.getbyid([settings.pin], function(t){

									if (t){

										var pinnedShare = t[0];

										if (pinnedShare && !pinnedShare.deleted){

											//pinnedShare.pin = true;
											shares.unshift(pinnedShare);
					
										}

									}
									
									if (clbk) clbk(shares, error || error2)

									return;			

								})
							
							}

						}

						if (essenseData.getpin && author && !sharesInview.length && !restoredposition){

							self.psdk.accSet.load(author).then(setting => {

								authorsettings = self.psdk.accSet.get(author)

								getPin(authorsettings)
							})

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

							var ignoreerror = false

							

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

								else if(recommended == 'best'){
									loader = 'best'
								}

								else if(recommended == 'hot'){
								}

								else if(recommended == 'b'){
									loader = 'getbyidsp'
									_beginmaterial = essenseData.beginmaterial
								}

								else if(recommended == 'saved'){
									
								}

								else if(recommended == 'jury'){
									loader = 'jury'
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


							var count = 20

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

							if (essenseData.searchTags) tagsfilter = essenseData.searchTags

							var page = essenseData.page || parameters().page || 0

							if(page === 0) {
								offsetblock = 0
							}

							var type = null

							if(video || essenseData.videomobile){ type = 'video'}
							if(essenseData.read){ type = 'article'}
							if(essenseData.audio){ type = 'audio'}

							

							if(essenseData.count) count = essenseData.count
							else if (video) count = 20


							if(self.app.platform.sdk.user.myaccauntdeleted() && loader == 'getsubscribesfeed'){
								ended = true
								if(clbk) clbk()

								return
							}

							if(state && essenseData.includesub && loader == 'hierarchical' && !subloaded && !restoredposition){

								loader = 'getsubscribesfeed'

								includingsub = true

								ignoreerror = true

							}


							var period = 1440


							self.app.platform.sdk.node.shares[loader]({

								author : author,
								begin : _beginmaterial || '',
								txids : essenseData.txids,
								height : fixedblock,
								tagsfilter : tagsfilter,
								lang: essenseData.lang,

								type : type,

								count : count,
								offset : offsetblock,
								page : page,
								period : period,
								tagsexcluded : tagsexcluded,
								txid : (restoredposition && !restoredposition.restored) ? restoredposition.b : null

							}, function(shares, error, pr){

								

								/*
								
								if(shares.length){
									actions.fixposition(shares[0].txid)
								}
								
								*/

								if(restoredposition) restoredposition.restored = true

								if(error && ignoreerror){
									loading = false
									if(essenseData.includesub){
										includingsub = false
										subloaded = true
									}
									
									if(clbk) clbk([])
									return
								}

								offsetblock = offsetblock + period

								///

								if (pr.blocknumber) fixedblock = pr.blocknumber
								//if (pr.txid) actions.fixposition(pr.txid)
								
								if (essenseData.filterTopAuthors) {
									shares = _.filter(shares, (s) => {
										if(!_.find(sharesInview, (s2) => {
											return s2.address == s.address
										})) return true
										else{
											console.log("filtered by authors")
										}
									})
								}

								if (essenseData.shuffle) {
									shares = _.shuffle(shares)
								}

								shares = _.filter(shares, (s) => {
									return s.txid != 'f475d843627dbb46c1dbf36dedc3a8139745cb29c3dfd981999c64af9b2d0622'
								})

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

		var shownewmaterials = function(c = 0){

			if(!el.c) return

			if(/*!beginmaterial &&*/ recommended != 'recommended' && recommended != 'jury' && !essenseData.author && !(essenseData.searchValue || essenseData.searchTags)){

				if(c > 0){

					newmaterials = newmaterials + c;

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
			el.c.on('click', '.panel .boost', events.boost)
			el.c.on('click', '.unblockbutton', events.unblock)
			el.c.on('click', '.showblockedpost', events.showblockedpost)
			el.c.on('click', '.videoTips', events.fullScreenVideo)
			el.c.on('click', '.videoOpen', events.fullScreenVideo)
			el.c.on('click', '.exitFull', events.exitFullScreenVideo)
			el.c.on('click', '.getpaidsubscription',events.getpaidsubscription)

			function initOutsideClickEvent(e) {
				let isOutside = false;

				el.c.on('mousedown', '.sharecnt', e => {
					isOutside = e.target.classList.contains('sharecnt');
				});

				el.c.on('mouseup', '.sharecnt', e => {
					if (isOutside) {
						events.clickOutsideOfWindow(e);
					}

					isOutside = false;
				});
			}

			initOutsideClickEvent();

			//el.c.on('click', '.commentsWrapperHb', events.clickOutsideOfWindow)
			//el.c.on('click', '.additional', events.additional)
			el.c.on('click', '.asubscribe', events.asubscribe)
			el.c.on('click', '.aunsubscribe', events.aunsubscribe)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			el.c.on('click', '.donate', events.donate)
			el.c.on('click', '.sharesocial', events.sharesocial)
			el.c.on('click', '.metmenu', events.metmenu)
			el.c.on('click', '.showmorebyauthor', events.showmorebyauthor)
			el.c.on('click', '.commentsAction', events.toComments)
			el.c.on('click', '.shareSave', events.shareSave)

			el.c.on('click', '.juryyes', events.juryyes)
			el.c.on('click', '.juryno', events.juryno)

			el.c.on('click', '.toregistration', events.toregistration)
			el.c.find('.loadmore button').on('click', events.loadmore)
			el.c.find('.loadprev button').on('click', events.loadprev)
			el.c.on('click', '.gotouserprofile', events.gotouserprofile)

			el.c.on('click', '.translateto', events.translateto)

			el.c.on('click', '.fromrecommendationslabel', events.recommendationinfo)

			el.c.on('click','.openauthorwindow', events.openauthorwindow)

			el.c.find('.cancelsearch').on('click', function(){
				if(essenseData.cancelsearch) essenseData.cancelsearch()
			})

			el.c.find('.networkErrorMessage button').on('click', function(){

				delete self.iclbks[mid]

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

			

			el.c.on('click', '.opensviurl', events.opensvi)

			


			//////////////////////

			/*if(self.app.mobileview && canloadprev && !essenseData.openapi){

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

			}*/

			if(!essenseData.openapi){

				self.app.events.resize[mid] = events.resize
				
				if(!essenseData.horizontal){

					self.app.events.delayedscroll['videos' + mid] = events.videosInview

					//self.app.events.delayedscroll['optimization' + mid] = actions.optimize

					
					


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
				if (el.c && el.c.hasClass('networkError')){
					actions.loadprev()
				}
			}

			if(!essenseData.openapi && !essenseData.second){

				if(!essenseData.txids){

					/*self.app.platform.matrixchat.clbks.SHOWING[mid] = function(v){
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
					}*/
	
					/*self.app.platform.ws.messages.event.clbks[mid] = function(data){
	
						if(data.mesType == 'upvoteShare' && data.share){
	
							var s = _.find(sharesInview, function(sh){
								if(sh.txid == data.share.txid) return true
							})
	
							if (s){
	
								renders.stars(s, function(){
									
								})
	
							}
	
						}
						
					}*/

					self.app.platform.sdk.paidsubscription._clbks.updatepaiddata[mid] = function(address){
						renders.maybechangevisibility(address, 'paid')
					}

					self.app.psdk.updatelisteners[mid] = self.app.platform.actionListeners[mid] = function({type, alias, status}){

						if(type == 'upvoteShare'){

							var share = _.find(sharesInview, (share) => share.txid == alias.share.v) ? self.psdk.share.get(alias.share.v) : null

							if (share){
								renders.stars(share)
							}
						}

						if(type == 'share'){

							var replace = _.find(sharesInview, (share) =>  share.txid == alias.txid || share.txid == alias.actionId /*|| share.txid == alias.txidEdit*/)
							var replaceAll = true

							var trx = self.psdk.share.get(alias.txid)
							var originalAction = alias

							if (replace){
								replace.txid = alias.txid
							}

							alias = trx ? trx : alias

							if (!replace){
								if(essenseData.author == alias.actor){

									if(status == 'rejected') return

									renders.shares([alias], function(){
										renders.sharesInview([alias], function(){
											
										})
									}, {
										inner : prepend
									})

								}
								else{

								}
							}
							else{

								if (replaceAll){

									actions.destroyShare(replace)


									if(status == 'rejected' && (!alias || !alias.editing)) {

										if(alias && !alias.editing && originalAction.editing){

										}
										else{
											if(el.share[replace.txid]) el.share[replace.txid].remove()

												delete el.share[replace.txid]
		
												return
										}

										
									}

									renders.shares([alias], function(){
										renders.sharesInview([alias], function(){
											
										})
									}, {
										inner : replaceWith,
										el : (el.share[replace.txid] || el.share[alias.actionId]),
										ignoresw : true,
									})
								}

								else{
									/// only status
								}

							}

						}

						if(type == 'contentDelete'){

							actions.replaceShare(alias.txidEdit)
							
						}

						if(type == 'blocking' || type == 'unblocking'){

							var address = alias.address.v

							if(type == 'blocking' || (type == 'unblocking' && status == 'rejected')){

								var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
									addressEl.addClass('blocking');
									actions.stopPlayers()

							}

							if(type == 'unblocking' || (type == 'blocking' && status == 'rejected')){

								var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
									addressEl.removeClass('blocking');
									actions.stopPlayers()
									
							}
							
						}

						if(type == 'unsubscribe' || type == 'subscribe' || type == 'subscribePrivate'){
							actions.subscribeunsubscribeclbk(alias.address.v)
						}

						if (type == 'accSet'){
							if(essenseData.author == alias.actor){

								authorsettings = self.psdk.accSet.get(alias.actor)

								el.c.find('.pinnedLabel').remove()

								if(authorsettings.pin){

									actions.replaceShare(authorsettings.pin)

								}
							}
						}
						
					}
				}

				self.app.platform.clbks._focus[mid] = function(time){

					/*if(self.app.mobileview && !fullscreenvideoShowed){
						videosVolume = 0
						self.sdk.videos.volume = videosVolume 
						self.sdk.videos.save()
					}*/

					if ((window.cordova || isInStandaloneMode()) && !fullscreenvideoShowed && !essenseData.txids && !making && time > 1200 && !essenseData.second){

						if(!self.app.errors.connection()){
						}
						
					}
				}
			
				if(!essenseData.txids){

					self.app.platform.ws.messages["newblocks"].clbks[mid] = 
					self.app.platform.ws.messages["new block"].clbks[mid] = actions.newmaterials

					self.app.platform.sdk.categories.clbks.excluded[mid] =
					self.app.platform.sdk.categories.clbks.tags[mid] =
					self.app.platform.sdk.categories.clbks.selected[mid] = function(){

						if(getloader() == 'hierarchical' && !essenseData.second){
							actions.rebuilddelay()
						}
						
					}

				}

				/*self.app.platform.ws.messages.comment.clbks.lenta = function(data){


					if(shareInitedMap[data.posttxid]){
						var c = el.c.find('#' + data.posttxid + " .commentsAction .count span");

							c.html(Number(c.html() || "0") + 1)
					}

					
					
				}*/

				self.app.platform.clbks.api.actions.anysubscribe[mid] = actions.subscribeunsubscribeclbk

				self.app.platform.clbks.api.actions.blocking[mid] = function(address){
					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
						addressEl.addClass('blocking');
						actions.stopPlayers()
				}

				self.app.platform.clbks.api.actions.unblocking[mid] = function(address){
					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')
						addressEl.removeClass('blocking');
						actions.stopPlayers()
				}

			}	
			
		}

		var makeboost = function(){
			if (essenseData.includeboost && !restoredposition){

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

			if (restoredposition) {
				cache = 'restore'
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

				if(restoredposition || (essenseData.author && beginmaterial)){
					window.rifticker.add(() => {
						el.c.addClass('showprev')
					})
				}
				
			}


			if(essenseData.observe && essenseData.includesub){
				subloaded = !self.app.platform.sdk.sharesObserver.hasnewkeys([essenseData.observe + '_sub', 'sub'])

				var tagsfilter = self.app.platform.sdk.categories.gettags()
				var tagsexcluded = self.app.platform.sdk.categories.gettagsexcluded()

				if(tagsfilter.length || tagsexcluded.length){
					subloaded = true
				}

			}

			renders.loader(true)


			load.shares(function(shares, error){

				if(!el.c) return

				renders.loader(false)


				if (error){
					making = false;

					window.rifticker.add(() => {
						el.c.addClass('networkError')
					})
				
					//el.c.removeClass('loading')

					self.iclbks[mid] = function(){
						make(null, _p)
					}

					return;
				}

				window.rifticker.add(() => {
					if (el.c && el.c.hasClass('networkError'))
						el.c.removeClass('networkError')
				})


				if(!shares){
					making = false;
				}
				else
				{
					if (clear) el.shares.empty()

					renders.shares(shares, function(){
						renders.sharesInview(shares, function(){

							making = false;

							setTimeout(function(){
								events.videosInview()
							}, 50)


							setTimeout(() => {
								if(recommended == 'jury'){
									self.app.platform.sdk.jury.updatejurycount()
								}
							}, 100)


							window.rifticker.add(function(){
								if(!el.shares) return
								el.shares.addClass('initing')
							}, 200)

							setTimeout(() => {
								window.rifticker.add(() => {
									if(!el.shares) return
									el.shares.removeClass('notinited')
									el.shares.removeClass('initing')
								})
							}, 500)
							
							
							_.each(shares, function(share) {
								if (share && share.itisvideo && share.itisvideo())
									actions.changeSavingStatusLight(share);
							});

							var p = parameters()

							if(!essenseData.second){
								if ((p.s) && !p.msh && !p.np){

									setTimeout(function(){

										actions.openPost(p.s || p.v, function(){
											actions.scrollToPost(p.s || p.v)
										}, null, null, p.commentid)
										
									}, 500)

								}
	
								if (p.i){
									var share = self.psdk.share.get(p.i)

									actions.scrollToPost(p.i)
									
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
										setTimeout(function(){
											actions.scrollToPost(p.v)
											actions.fullScreenVideo(p.v, function(){})
										}, 500)
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

							/*if (essenseData.notscrollloading && essenseData.txids){
								renders.txidall(essenseData.txids)
							}*/


							if(shares.length < 5 && essenseData.includesub && !loading && (!ended && recommended != 'recommended' && recommended != 'best')){

								actions.loadmore()
							}

							_p = null

							if (video && !isMobile()){
								makeboost()
							}
						
						})
					})

					if (!(video && !isMobile())){
						makeboost()
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

				if(_s.fx){

					actions.restoreposition(_s.fx)
				}

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

				console.log('video??' ,video)

				
				self.app.platform.sdk.ustate.me(function(_mestate){

					mestate = _mestate || {}

					var data = {
						beginmaterial : beginmaterial,
						author : essenseData.author,
						recommended : recommended,
						filters : essenseData.searchValue || essenseData.searchTags,
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
				
				for (const txId in progressInterval) {
					if (progressInterval[txId]) clearInterval(progressInterval[txId]);
				}
				loadingBars = {};
				
				delete self.app.errors.clbks[mid]

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
				}

				if (fullscreenvideoShowed){
					actions.exitFullScreenVideo(fullscreenvideoShowed)
				}

				_.each(carousels, function(carousel){
					carousel.destroy()
				})

				carousels = {}

				actions.cleardelay()

				//actions.scrollmode(false)

				isotopeinited = false

				fullscreenvideoShowed = null
				fullscreenvideoShowing = null

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
			
				delete self.app.platform.actionListeners[mid]
				delete self.app.psdk.updatelisteners[mid]
				delete self.app.platform.sdk.paidsubscription._clbks.updatepaiddata[mid]
				
				_.each(initedcommentes, function(c){
					c?.clearessense()
				})

				initedcommentes = {}

				positionfixed = false
				restoredposition = null

				delete self.app.events.resize[mid]
				delete self.iclbks[mid]

				if(!essenseData.openapi && !essenseData.second && !essenseData.txids){

					delete self.app.platform.sdk.categories.clbks.excluded[mid]
					delete self.app.platform.sdk.categories.clbks.tags[mid]
					delete self.app.platform.sdk.categories.clbks.selected[mid]

					delete self.app.platform.ws.messages.comment.clbks[mid]
					delete self.app.platform.ws.messages.event.clbks[mid]

					delete self.app.platform.ws.messages["new block"].clbks[mid]
					delete self.app.platform.ws.messages["newblocks"].clbks[mid]
					
					delete self.app.platform.clbks.api.actions.anysubscribe[mid]

					delete self.app.platform.clbks.api.actions.blocking[mid]
					delete self.app.platform.clbks.api.actions.unblocking[mid]

					delete self.app.platform.clbks._focus[mid]
					delete self.app.platform.matrixchat.clbks.SHOWING[mid]
				}

				_.each(players, function(p){

					
					if (p.p){

						if (p.p.playing){
							self.app.actions.playingvideo(null, p.p)
						}

						p.p.destroy()
					}
						
				})

				players = {}
				showMoreStatus = {}

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

				actions.clear()
			},

			authclbk : function(){
				if (el.c){
					actions.authclbk()
				}
			},

			update : function(){
				if(el.shares && isotopeinited) {
					setTimeout(() => {
						el.shares.isotope('layout')
					}, 200)
				}
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

				initEvents();

				clearnewmaterials()	

				rifticker.add(() => {
					lwidth = 0
					if(!essenseData.horizontal){
						lwidth = self.app.width < 768 && self.app.width > 0 ? self.app.width : el.c.width()
					}
				})
				

				make(null, p);

				if(!essenseData.goback) p.clbk(null, p);

			},

			hideshowedvideo : function(){
				if (fullscreenvideoShowed){
					actions.exitFullScreenVideo(fullscreenvideoShowed)
				}
			},

			willreload : function(){
				actions.observe()
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
			window.rifticker.add(() => {
				essense.destroy();
			})
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
