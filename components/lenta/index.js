
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}

var lenta = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var mid = p.mid;

		var making = false, ovf = false;

		var w, essenseData, recomended = [], recommended, mestate, initedcommentes = {}, canloadprev = false,
		video = false, isotopeinited = false, videosVolume = 0;


		var commentsInited = {},
			shareInitedMap = {},
			shareInitingMap = {},
			loading = false,
			ended = false,
			players = {},
			sharesInview = [],
			scrolling = false,
			mscrolling = false,
			rendering = false,
			prevscroll = 0,
			lastscroll = 0,
			playVideoTimer,
			sharesPreInitVideoTimer,
			ascroll = 0,
			ascrollel = null,
			newmaterials = 0,
			tempTimer,
			getPreviewTimer,
			shareheights = {},
			_reposts = {},
			fixedblock = 0,
			delay = null,
			fullscreenvideoShowed = false;

		var countshares = 0;

		var beginmaterial = null;
		var beginmaterialloaded = false;

		var authblock = false;

		var errors = {
			comments : {
				content : "message empty",
				share : "hasn't share",
				messagelength : ">140",
				money : "hasn't money",
				network : "network error"
			},

			upvote : {
				share : "hasn't share",
				network : "network error"
			},

			complain : {
				share : "hasn't share",
				network : "network error"
			}
		}

		var actions = {
			newmaterials : function(data){
				if(making || essenseData.author || essenseData.txids) return

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
				_.each(shareInitedMap, function(s, id){
					var share =  self.app.platform.sdk.node.shares.storage.trx[id]

					if (share){
						actions.subscribeLabel(share)
					}
				})
			},

			subscribeLabel : function(share){

				var user = self.app.user

				var my = (user.address.value && share.address == user.address.value)
				var subscribed = false;


				if(!my && user.address.value){

					var me = deep(self.app, 'platform.sdk.users.storage.' + user.address.value)

					if (me && me.relation(share.address, 'subscribes')){
						subscribed = true
					}
				}

				if(el.c){

					var _el = el.c.find('#'  + share.txid + " .shareTable")

					if(subscribed){
						_el.addClass("subscribed")
					}
					else{
						_el.removeClass("subscribed")
					}

				}
				
				

			},

			repost : function(shareid){

				actions.stateAction('_this', function(){

					self.app.platform.ui.share({
						repost : shareid
					})

					/*var href = 'index';

					if(isMobile()) href = 'share'

					self.nav.api.load({
						open : true,
						href : href + '?repost=' + shareid,
						history : true,
						handler : true,
						essenseData : {
							
						}
					})*/
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

					_scrollToTop(el.shares, null, 10, -80)

					actions.loadprev()
				}, delay, 600)	

					
			},

			loadprev : function(clbk){
				el.c.find('.shares').html('<div class="bspacer"></div>')
				el.c.removeClass('showprev')

				el.c.removeClass('loading');
				el.c.removeClass("sharesEnded")
				el.c.removeClass('sharesZero')

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
				}

				isotopeinited = false

				clearnewmaterials()	

				actions.clear()
				
				if (essenseData.renderclbk)
					essenseData.renderclbk()

				make(clbk);
			},
			clear : function(){

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
					if(p)
						p.destroy()
				})

				_reposts = {};

				countshares = 0;
				lastscroll = 0;

				recomended = []

				authblock = false;

				shareInitedMap = {}
				shareInitingMap = {}

				shareheights = {}

				initedcommentes = {}


				fullscreenvideoShowed = false;

				$('html').removeClass('fullvideoshowed')
				$('html').removeClass('fullvideoshowedanimblock')

				loading = false
				ended = false
				players = {}
				sharesInview = []
				scrolling = false
				mscrolling = false
				rendering = false
				prevscroll = 0

				if(getPreviewTimer){
					clearTimeout(getPreviewTimer)
					getPreviewTimer = null
				}

				if(playVideoTimer){
					clearTimeout(playVideoTimer)
					playVideoTimer = null
				}

				if(sharesPreInitVideoTimer){
					clearTimeout(sharesPreInitVideoTimer)
					sharesPreInitVideoTimer = null
					
				}


				ascroll = 0
				ascrollel = null
				beginmaterial = null
				beginmaterialloaded = false
				ended = false;
				loaded = false;

				making = false;

				newmaterials = 0;
				fixedblock = 0;
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

			loadmore : function(loadclbk){
				load.shares(function(shares, error){


					if (error){
						making = false;
						
						if (self.app.errors.connection()){
							el.c.addClass('networkError')
						}

						if (self.app.errors.connectionRs()){
							self.iclbks.lenta = actions.loadmore
						}
	
						return;
					}
	
					el.c.removeClass('networkError')

					if(!shares){
					}
					else
					{
						renders.shares(shares, function(){

							renders.sharesInview(shares, function(){
								if (essenseData.renderclbk)
									essenseData.renderclbk()
							})

						}, {
							index : sharesInview.length
						})
					}

					if (loadclbk)
						loadclbk(shares)

				})
			},
			removeAdditionalByScroll : function(){

				if(ascrollel){
					var s = el.w.scrollTop();

					if(Math.abs(s - ascroll) > 150){
						actions.additional(ascrollel, false)
					}
				}

			},
			additional : function(el, show){
				if(show){
					el.addClass('showAdditional')
					el.find('.subscribeWrapper').fadeIn();

					ascroll = el.w.scrollTop();
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
			applyheight : function(iniH, curH, key){

				return

				var wn = w.scrollTop();
				var b = wn + Number(curH - iniH)

				if (wn == b || iniH < curH) return

				w.scrollTop(b);	
				
			},

			applyheightEl : function(iniH, _el, key){

				return

				if(!el || !el.shares) return

				if(!iniH || !_el.length) return

				if(essenseData.openapi) return

				var hc = _el[0].offsetHeight
				
				if(_el.length && w.scrollTop() > _el.offset().top) {

					actions.applyheight(iniH, hc, key)
				

					return hc;
				}

				return hc;
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
			destroyVideo : function(share){
				if (!players[share.txid]){
					return
				}

				if (players[share.txid].p)
					players[share.txid].p.destroy()

				delete players[share.txid]

				renders.urlContent(share)
			},
			initVideo : function(el, share, clbk, shadow){

				if(!share || !share.txid) return

				var pels = el.find('.js-player');
				var vel = el.find('.videoWrapper')


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

				

				if (self.app.platform.sdk.usersettings.meta.embedvideo && !
					self.app.platform.sdk.usersettings.meta.embedvideo.value) {

						if(clbk) clbk(false)

						return
					}
				
			


				if (pels.length && pels[0].getAttribute)
				{

					var readyCallback = (player) => {

						if (players[share.txid]){
							pels.find('iframe').attr('disable-x-frame-options', 'disable-x-frame-options')

							players[share.txid].inited = true

						}

						if(clbk) clbk(true)
					};

					var callback = (player) => {

						if (player){
							players[share.txid] || (players[share.txid] = {})
							players[share.txid].p = player
							players[share.txid].initing = true
							players[share.txid].el = vel
							players[share.txid].id = vel.attr('pid')
							players[share.txid].shadow = false

							actions.setVolume(players[share.txid])

							if (video){
								players[share.txid].preview = true
							}

							if (essenseData.enterFullScreenVideo){
								essenseData.enterFullScreenVideo = false

								actions.fullScreenVideo(share.txid)
							}
						}

						else{
							players[share.txid] = {
								error : true
							}
						}
						
					};

					var s = {
						muted : true,
						resetOnEnd : true,
						controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
						speed : {
							selected : 1,
							options: [1]
						},

						volumeChange : function(v){
							videosVolume = v

							self.sdk.videos.volume = videosVolume 

							self.sdk.videos.save()
						}
					}

					if(share.settings.v == 'a'){
						s.muted = false;
						s.autoplay = false;
					}

					if(isMobile()){
						s.controls = ['play', 'progress', 'current-time', 'fullscreen']
					}	

					PlyrEx(pels[0], s, callback, readyCallback)

				}
			},
			

			openPost : function(id, clbk){

				if(!isMobile()){

					self.app.user.isState(function(state){

						var ed = {
							share : id,
							hr : essenseData.hr,
							like : function(share){
								renders.stars(share)
							},
	
							next : actions.next,

							close : function(){
								if (essenseData.renderclbk)
									essenseData.renderclbk()
							}
						}

						var c = function(){		
								
							if (essenseData.renderclbk)
								essenseData.renderclbk()
	
							if (clbk)
								clbk();
	
						}

						/*if(!state){
							ed = {}
							c = null
						}*/

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
					var share = self.app.platform.sdk.node.shares.storage.trx[id];

					delete initedcommentes[id]

					renders.share(share, null, true)
				}
				

			},

			sharesocial : function(id, clbk){

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
							caption : self.app.localization.e('e13133') + ' ' + n,

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

					var link = 'send?address=' + share.address + '&amount=1&message='
					+hexEncode(self.app.localization.e('postlabel') + ' - ' + t.substr(0, 20) + ((t.length <= 20) ? "" : "..."))
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
									var a = $(this).closest('.address').find('.addr')

									copyText(a)

									sitemessage(self.app.localization.e('successfullycopiedaddress'))
								})

							}
						})
					}, {
						userinfo : userinfo
					})
				

				}
			},

			videoPosition : function(el){

				if (essenseData.openapi){return}

				var work = el.find('.work');

				if(!el.hasClass('fullScreenVideo')){

					work.css('margin-top', '0px')

					return
				}

				var h = $(window).height();
				var add = 0

				if(!isMobile()) add = 100

				var wh = el.find('.videoWrapper').height() + add;

				var d = (h - wh) / 2

				if (d > 0){
					work.css('margin-top', d + 'px')
				}
				else
				{
					work.css('margin-top', 0 + 'px')
				}

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
			},

			fullScreenVideo : function(id, clbk){

				var _el = el.c.find("#" + id)
				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if(!share){
					var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
						return s.txid == id
					})


					share = new pShare();
					share._import(temp);
					share.temp = true;
					share.address = self.app.platform.sdk.address.pnet().address
				}

				

				actions.initVideo(_el, share, function(res){

					if(!res){
						sitemessage('')

						return
					}
					
					if(!players[id]) return;

					_el.addClass('fullScreenVideo')

					$('html').addClass('fullvideoshowed')
					$('html').addClass('fullvideoshowedanimblock')

					actions.videoPosition(_el)

					self.app.nav.api.history.addParameters({
						v : id
					})

					var player = players[id]

					if(!player.p.playing){
						player.p.play()
					}

					//player.p.muted = false

					actions.setVolume(players[id], videosVolume || 0.5)
					

					lastscroll = el.w.scrollTop()
					ovf = !self.app.actions.offScroll()

					if(!essenseData.comments){

						/*if (initedcommentes[id])
							initedcommentes[id].changein(el.c.find("#" + id), 0)*/


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
						

					fullscreenvideoShowed = true;

					if (clbk)
						clbk()

				})

			},

			exitFullScreenVideo : function(id){

				$('html').removeClass('fullvideoshowed')

				setTimeout(function(){
					$('html').removeClass('fullvideoshowedanimblock')
				}, 300)
				

				if (el.c){
					var _el = el.c.find("#" + id)

					_el.scrollTop(0)
					_el.removeClass('fullScreenVideo')	
					
					actions.videoPosition(_el)
					
				}

				var player = players[id]

				//player.p.muted = true;

				actions.setVolume(players[id], videosVolume)

				self.app.nav.api.history.removeParameters(['v'])

				self.app.actions.onScroll()
				el.w.scrollTop(lastscroll || 0)

				fullscreenvideoShowed = false;

				if(!essenseData.comments){

					if (initedcommentes[id]){
						initedcommentes[id].destroy()
						initedcommentes[id] = null
					}

					renders.comments(id, false, false, true)

				}

				if(video){
					var share = self.app.platform.sdk.node.shares.storage.trx[id];

					actions.destroyVideo(share)
				}

			},
			postscores : function(txid, clbk){

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

			},

			like : function(obj, value, clbk){

				

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
			},

			block : function(address, clbk){
				



			},

			complain : function(obj, clbk){

				var complainShare = obj.complain();

			
				self.sdk.node.transactions.create.commonFromUnspent(

					complainShare,

					function(tx, error){

						topPreloader(100)

						if(!tx){

							el.postWrapper.addClass('showError');

							self.app.platform.errorHandler(error, true)	
							
							if (clbk)
								clbk()
						}
						else
						{

							if (clbk)
								clbk(true)
						}

					}
				)
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

			///
			scrollToPost : function(id){
			
				_scrollTo($('#' + id))
				
			},

			videosInview : function(players, action, nvaction){			
				
				
				if(fullscreenvideoShowed) return

				var ap = _.filter(players, function(p){
					if(p.inited && !p.playing && !p.stopped && p.el && !p.preview && !p.error) return true
				})

				if(ap.length){
					playVideoTimer = slowMade(function(){

						window.requestAnimationFrame(function(){

							ap = _.filter(ap, function(p){
								return p.el
							})

							var vs = _.map(ap, function(p){
								return p.el[0]
							})
							
							var inv = inView(el.c.find('.videoWrapper'), {
							
								offset : el.w.height() / 10,
								mode : 'all'
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
											mode : 'all'
										})

										if(inv.length){
											action(player, vel)
										}

									}, 520)

									

								}

								
								
							}

							var another = _.filter(ap, function(p){
								return p.id != id
							})

							if(another.length){
								nvaction(another)
							}
						})

					}, playVideoTimer, 60)
				}

			},
			
			sharesInview : function(shares, action, nvaction){

				var cscroll = w.scrollTop();

				if (shares.length && !mscrolling)

					getPreviewTimer = slowMade(function(){

						window.requestAnimationFrame(function(){

							var els = el.c.find('.share');

							var _el = el.w; 

							var h = el.w.height() / 4
							
							var inv = inView(els, {
								inel : _el,
								offsetTop : h,
								offsetBottom : h,
								//mode : 'line',
							})


							if (inv.length > 0){

								var invmap = {};
							
								var invshares = _.map(inv, function(el){
								
									var id = el.getAttribute('id');

									invmap[id] = true

									return _.find(shares, function(s){
										return s.txid == id
									});
								})

								invshares = _.filter(invshares, function(is){
									if(is && !is.temp) return true
								})


								scrolling = true;

								action(invshares, inv, function(){

									scrolling = false

									if(nvaction){
										var nvshares = _.filter(shares, function(s){
											if(!invmap[s.txid]) return true
										})

										nvaction(nvshares)
									}


								})

									
								
							}


						});


					}, getPreviewTimer, 60)

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

			setVolume : function(player, v){

				if(typeof v == 'undefined') v = videosVolume

				if(!player.p) return

				if (v && player.p.setVolume){
					//player.p.muted = false;
					player.p.setVolume(v)
				}
				else{
					player.p.muted = true;
				}
			},
		}

		var events = {
			sharesPreInitVideo : function(){

				var shadowVideos = {} 
				
				_.each(players, function(p){
					if (p.shadow && p.txid){
						shadowVideos[p.txid] = true
					}
				})

				var shadowShares = _.filter(sharesInview, function(s){
					return shadowVideos[s.txid]
				})

				if(shadowShares.length){

					sharesPreInitVideoTimer = slowMade(function(){

						window.requestAnimationFrame(function(){

							if(!el.c) return

							var st = el.w.scrollTop()

							_.each(shadowShares, function(share){
								var _el = el.share[share.txid]

								if (_el.length){

									if(st + 3500 > _el.offset().top){
										actions.initVideo(_el, share)
									}
								}	
							})

						})

					}, sharesPreInitVideoTimer, 60)
					
				}

			},

			sharesInview : function(e){

				
				
				actions.sharesInview(sharesInview, function(invshares, els, clbk){

					var invsharesload = _.filter(invshares, function(s){
						return !shareInitedMap[s.txid]
					})
					

					if(essenseData.contents && invsharesload.length > 0){
						essenseData.beginmaterial = invshares[0].txid;

						load.shares(function(shares){
							renders.sharesInview(shares, function(){

								

							})
						})
					}

					
					_.each(invshares, function(s){
						el.share[s.txid].addClass('vstars')
					})

					
					if(clbk)
						clbk();

				}, function(nvshares){
					
					_.each(nvshares, function(s){
						el.share[s.txid].removeClass('vstars')
					})

				})

				
			},

			videosInview : function(e){

				actions.videosInview(players, function(player, el, clbk){	

					if (self.app.platform.sdk.usersettings.meta.videoautoplay && !
						self.app.platform.sdk.usersettings.meta.videoautoplay.value) return

					var _el = el.closest('.share')

					if(!el.closest('.share').hasClass('showAdditional')){

						actions.initVideo(_el, self.app.platform.sdk.node.shares.storage.trx[_el.attr('id')], function(){

							if(player.p.getState && player.p.getState() == 'ended') return

							if(!player.p.playing){
								player.p.play()

								actions.setVolume(player)

								//if (isMobile()){


								//}
							}

						})

						

						
					}

				}, function(players){
					
					_.each(players, function(player){

						if(player.error) return

						player.p.muted = true;

						if (player.p.playing){
							player.p.stop()

							if (isMobile() && player.p.rebuild){

								setTimeout(function(){
									//player.p.rebuild()
								}, 1000)

								
							}
						}

					})

				})

				
			},

			repost : function(){
				var shareId = $(this).closest('.share').attr('id');

				actions.repost(shareId);
			},

			showmorebyauthor : function(){

				$(this).closest('.authorgroup').find('.share').removeClass('hidden')

				$(this).remove()

				renders.sharesInview(sharesInview, function(shares){

					events.sharesPreInitVideo()
					events.videosInview()

				}, function(){

				})

			},
			metmenu : function(){
				var _el = $(this);
				var id = $(this).closest('.share').attr('id');

				self.app.platform.api.metmenu(_el, id, actions)

			},
			resize : function(){

				var _el = el.c.find('.fullScreenVideo');

				if (_el.length > 0){
					actions.videoPosition(_el)
				}

				
			},	
			loadmorescroll : function(){

				if(!essenseData.horizontal){
					if (
						!loading && !ended && (recommended != 'recommended' || isMobile()) &&
						(el.w.scrollTop() + el.w.height() > el.c.height() - 2000) 
	
						) {
	
						actions.loadmore()
	
					}
				}
				else{

					if (
						!loading &&  (!ended && recommended != 'recommended') && 
						(el.w.scrollLeft() + el.w.width() > el.c.find('.shares').width() - 2000) 
	
						) {


						actions.loadmore()
	
					}
				}	

				
			},


			

			commentLike : function(){
				
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

				/*if (essenseData.authAction) {

					essenseData.authAction('like')

					return

				}*/

				var p = $(this).closest('.stars');

				if (p.attr('value')){
					return
				}

				var id = $(this).closest('.share').attr('id');
				var value = $(this).attr('value')

				if(!id) id = $(this).closest('.truerepost').attr('stxid')

				actions.stateAction('_this', function(){

					self.app.platform.sdk.node.shares.getbyid(id, function(){


						var s = self.app.platform.sdk.node.shares.storage.trx[id]

						if (self.app.platform.sdk.address.pnet() && s.address == self.app.platform.sdk.address.pnet().address) return

						p.attr('value', value)
						p.addClass('liked')

						actions.like(s, value, function(r){
							if(r){
								

								s.scnt || (s.scnt = 0)
								s.score || (s.score = 0)

								s.scnt++;
								s.score = Number(s.score || 0) + Number(value);

								var v = Number(s.score) / Number(s.scnt) 


								p.find('.tstarsov').css('width', ((v / 5) * 100) + '%')
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

				actions.complain(id)
					
			},

			additional : function(){

				var _el = $(this).closest('.share');

				actions.additional(_el, !_el.hasClass('showAdditional'))

			},

			openGallery : function(){
				var id = $(this).closest('.shareinlenta').attr('id');
				var src = $(this).attr('i')

				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if(!share){
					var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
						return s.txid == id
					})


					share = new pShare();
					share._import(temp);
					share.temp = true;
					share.address = self.app.platform.sdk.address.pnet().address
				}


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

			exitFullScreenVideo : function(){
				var shareId = $(this).closest('.share').attr('id');

					actions.exitFullScreenVideo(shareId)
			},
			fullScreenVideo : function(){

				var shareId = $(this).closest('.share').attr('id');


					actions.fullScreenVideo(shareId)
			},

			opensvi : function(){

				var shareId = $(this).closest('.share').attr('id');
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

					actions.openPost(shareId)
			},

			sharesocial : function(){
				var shareId = $(this).closest('.shareinlenta').attr('id');


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

			discussion : function(){
				/*if (essenseData.authAction) {

					essenseData.authAction('discussion')

					return

				}*/

				var shareId = $(this).closest('.share').attr('id');

				var share = self.app.platform.sdk.node.shares.getWithTemp(shareId)

				if (isMobile()){
					self.nav.api.load({
						open : true,
						id : 'discussions',
						history : true,

						clbk : function(){
							self.app.platform.sdk.chats.add(shareId + '_' + share.address, 'share')
						}
					})
				}
				else
				{
					self.app.platform.sdk.chats.add(shareId + '_' + share.address, 'share')
				}
			},

			loadmore : function(){
				actions.loadmore()
			},
			loadprev : function(){

				actions.loadprev();

			}

		}	

		var renders = {
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

				var _el = el.c.find('#' + txid + " .commentsWrapper");

				var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

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
								}

								//_el.html('')

								_scrollToTop(_el, 0, 0, -65)
								

								//renders.comments(txid, init, showall, preview)

							},
							totop : el.c.find('#' + txid),
							//caption : rendered,
							send : function(comment, last){

								var c = el.c.find('#' + txid + " .commentsAction .count span");

								c.html(Number(c.html() || "0") + 1)

								share.lastComment = last
							},

							txid : txid,
							showall : essenseData.comments == 'all' || showall,	
							fromtop: essenseData.comments == 'all' || e.hasClass('fullScreenVideo') || false,
							preview : essenseData.comments == 'all' ? false : preview,
							lastComment : essenseData.comments != 'all' ? share.lastComment : null,
							count : share.comments,
							init : essenseData.comments == 'all' ? false : init,
							hr : hr,

							renderClbk : function(){

								//shareheights[txid] = actions.applyheightEl(shareheights[txid], _el, 'space')

								if (essenseData.renderclbk)
									essenseData.renderclbk()
							}
						},

						clbk : function(e, p){

							if(!el.c) return

							var e = el.c.find('#' + txid);
							
							/*if (e.hasClass('fullScreenVideo')){
								p.changein(e, 0)
							}*/

							if (p)

								initedcommentes[txid] = p


							if (essenseData.renderclbk)
								essenseData.renderclbk()
						}
					})

				}, {
					share : share
				})

				
			},

			roomsinfo : function(rooms){
				

				var h = function(count){

					if(!count){
						return ''
					}

					return '<b>' + count + '</b>'

				}

				_.each(rooms, function(id){

					var count = deep(self.app.platform, 'rtc.storage.info.' + id + '.d.users_count');

					var _id = id.split("_")[0]


					if(typeof count != 'undefined' && el.c)
					{
						var _el = el.c.find('#' + _id + " .discussion .count");
							_el.html(h(count))
					}

				})

			},

			shareSpacers : function(shares){

				_.each(shares, function(s){
					renders.shareSpacer(s)
				})
			},
			shareSpacer : function(share){

				if(shareInitedMap[share.txid] && !shareInitingMap[share.txid]/* && !deep(players, share.txid + '.initing')*/){

					var _el = el.shares.find("#" + share.txid);

					var hw = _el.find('.work').outerHeight()

					if (players[share.txid] && players[share.txid].inited){
						
						players[share.txid].p.destroy()
						players[share.txid].el = null
						players[share.txid].inited = false
					}


					shareInitedMap[share.txid] = false;
				
					el.shares.css('height', el.shares.outerHeight())

					_el.html('<div class="shareSpacer added"></div>')	

					_el.find('.shareSpacer').outerHeight(hw)					

					shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], _el, 'space')
				}

				
			},
			share : function(share, clbk, all){

				if(!share) return

				var _el = el.share[share.txid] //el.shares.find("#" + share.txid);

				//if(!_el) return

				shareheights[share.txid] = 0;

				
				
				/*if (_el[0])
					shareheights[share.txid] = _el[0].offsetHeight*/

				var added = _el.find('.added')

				shareInitingMap[share.txid] = true;

				self.shell({
					name : video ? 'sharevideolight' :  'share',
					el : _el,
					data : {
						share : share,
						ed : essenseData,
						mestate : mestate,
						all : all || false,
						tplvideo : video 
					}					

				}, function(p){

					var work = _el.find('.work');

				
					shareInitedMap[share.txid] = true;	
					
					shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], _el, 'share')

					renders.stars(share)

					if(!share.temp){
						renders.comments(share.txid, false, false, true)
					}

					renders.repost(p.el, share.repost, share.txid, share.isEmpty())
			
					renders.url(p.el.find('.url'), share.url, share, function(){

						renders.urlContent(share, function(){

							if(essenseData.searchValue){

								p.el.find('.canmark').mark(essenseData.searchValue);

							}
							

							if(!video)
								actions.initVideo(p.el, share, null, !essenseData.openapi)


							if(isotopeinited) el.shares.isotope()

							shareInitingMap[share.txid] = false;					
											
							if (clbk)
								clbk();

						});

					})

					renders.images(share, function(){
						
					})
					
				})

			},

			mystars : function(shares, clbk){

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
						renders.stars(share)

						renders.wholike(share)
					})

					if(clbk) clbk()

				})
			},

			wholike : function(share, clbk){


				if (!el.shares) return

				var _el = el.shares.find("#" + share.txid);

				if (_el.length){

					var wholikes = share.who;

					self.shell({
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

			stars : function(share, clbk){

				if (!el.shares) return

				var _el = el.shares.find("#" + share.txid);

				if (_el.length){

					self.shell({
						name :  'stars',
						el : _el.find('.forstars'),
						data : {
							share : share
						}					

					}, function(p){

						fastars(p.el.find('.stars'))

						if (clbk)
							clbk()

					})

				}
				
			},

			sharesInview : function(shares, clbk){

				shares = _.filter(shares, function(s){

					return !$('#' + s.txid).hasClass('hidden')

				})

				var rs = _.sortBy(shares, function(s){
					return -s.time
				})

				lazyEach({
					array : rs,
					//sync : true,

					action : function(p){
						var share = p.item;


						if(shareInitedMap[share.txid]){
							p.success()
						}
						else
						{
							shareInitedMap[share.txid] = true
							renders.share(share, p.success)
						}

						
					},

					sync : isMobile(),

					all : {
						success : function(){

							renders.mystars(shares)

							clbk()
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


				if(!p.inner) {
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
						video : video || essenseData.videomobile
					},
					animation : false,
					delayRender : isotopeinited

				}, function(_p){

					

					if (_p.inner == append){
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

					if (essenseData.renderclbk)
						essenseData.renderclbk()

					//events.sharesInview()		
					

					if(video && !isMobile()){

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
							});
	
							isotopeinited = true
						}
						else{

							
						}
	
						
					}
					
					

					if (clbk)
						clbk();
				})
			},

			videoPreview : function(s, clbk){

				var sel = el.share[s.txid]

				if(s.settings.v == "a"){
					var pl = sel.find('[data-plyr-provider][data-plyr-embed-id]')

					var map = [];

					$.each(pl, function(){

						var d = $(this);

						var obj = {
							type : d.attr('provider'),
							id : d.attr('eid')
						};

						map.push(videoImage(obj))

					})
				}
				else
				{
					if (clbk)
						clbk();
				}
			},

			images : function(s, clbk){

				var share = s

				if(!el.c) return

				var sel =  el.share[s.txid] 

				var _el = sel.find(".image");
				var images = sel.find(".images");

				if(images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

					return

				}

				window.requestAnimationFrame(function(){

					_el.imagesLoaded({ background: true }, function(image) {

						if(s.settings.v != "a"){

							_.each(image.images, function(img, n){

								var _img = img.img;

								var el = $(image.elements[n]).closest('.imagesWrapper');
								var ac = '';

								var _w = el.width();
								var _h = el.height()

								if(_img.width > _img.height && (!isMobile() && window.innerWidth > 768)){
									ac = 'w2'

									var w = _w * (_img.width / _img.height);

									if (w > images.width()){
										w = images.width()

										h = w * ( _img.height / _img.width) 

										el.height(h);
									}

									el.width(w);
								}

								if(_img.height > _img.width || isMobile() || window.innerWidth <= 768){
									ac = 'h2'

									el.height(_w * (_img.height / _img.width))
								}

								if(ac){
									el.addClass(ac)
								}
								
							})

						}


						shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], sel)

						var isclbk = function(){
							images.addClass('active')

							_el.addClass('active')

							shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], sel)

							if (essenseData.renderclbk)
								essenseData.renderclbk()

							if (clbk)
								clbk()
						}

						if(s.settings.v != 'a' && image.images.length > 1){

							var gutter = 5;

							if (isMobile()) gutter = 0

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
						else
						{
							isclbk()
						}
					

					});

				})
				
			},

			repost : function(el, repostid, txid, empty, clbk){
				if(repostid){
					self.shell({
						name :  'repost',
						el : el.find('.repostWrapper'),
						data : {
							repost : repostid,
							share : deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid),
							level : 1
						},
	
					}, function(_p){

						if(_p.el && _p.el.length){
							self.app.platform.papi.post(repostid, _p.el.find('.repostShare'), function(p){

								_reposts[txid] = p;
	
							}, {
								repost : true,
								eid : txid + 'lenta',
								level : 1,
								fromempty : empty
							})
						}	

					})
				}
			},

			url : function(el, url, share, clbk){

				if(essenseData.nourlload){

					if (clbk)
						clbk()

					return

				}


				var og = self.app.platform.sdk.remote.storage[url];				

				var _el = el.closest('.share')

				var meta = self.app.platform.parseUrl(url);

				var aspectRatio;


				var renderclbk = function(_p){

					var aspectRatio = deep(self, 'app.platform.sdk.videos.storage.' + url + '.data.aspectRatio') || 0


					var info = self.app.platform.sdk.videos.storage[url]

					if (info && info.data){
						aspectRatio = info.data.aspectRatio || 0
					}

					
					

					if (aspectRatio) {
						var playerContainer = _p.el.find('.jsPlayerLoading');

						var paddingvalue = 100 / (2 * aspectRatio);

						playerContainer.css('padding-top', `${paddingvalue}%`);
						playerContainer.css('padding-bottom', `${paddingvalue}%`);
					}

					self.app.nav.api.links(null, _p.el, function(event){
	
						event.stopPropagation()
					})

					shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], _el, 'url')

					var images = _p.el.find('img');

					if (essenseData.renderclbk)
						essenseData.renderclbk()

					_p.el.find('img').imagesLoaded({ background: true }, function(image) {

						_.each(image.images, function(i, index){


							if(i.isLoaded){
								$(images[index]).addClass('active')

								if(i.img.naturalWidth > 500){
									_p.el.addClass('bigimageinlink')
								}
								
							}
							else
							{
								$(images[index]).closest('.image').css('display', 'none')
							}
						})

						shareheights[share.txid] = actions.applyheightEl(shareheights[share.txid], _el, 'url')

						if (essenseData.renderclbk)
							essenseData.renderclbk()
						  
					});

					if (clbk)
						clbk()
				}

				var rndr = function(res){

					self.shell({
						turi : 'share',
						name :  'url',
						el : el,
						data : {
							url : url,
							og : og,
							share : share,
							//views : res.views || 0,
							video : video,
							preview : video ? true : false
						},
						notdisplay : video ? true: false,
						bgImages : {
							clbk : video ? true: false
						}
	
					}, renderclbk)
				}

				if (meta.type === 'peertube') {

					self.app.platform.sdk.videos.info([url]).then(r => {

						rndr();

					})

				} else {
					rndr({})
				}
			},

			urlContent : function(share, clbk){

				if(!el.c) return
				

				var url = share.url;

				if (url){

					var _el = el.share[share.txid].find('.url')

					var meta = self.app.platform.parseUrl(url);
					var og = self.app.platform.sdk.remote.storage[url];

					if (url && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube'){

							if (clbk)
								clbk()

						}
						else
						{
							self.app.platform.sdk.remote.get(url, function(og){

								if(og){
									renders.url(_el, url, share, clbk)
								}
								else
								{
									if (clbk)
										clbk()
								}

							})
						}
					}

					else
					{
						if(clbk)
							clbk()
					}

				}	

				else
				{
					if(clbk)
						clbk()
				}			

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
			}
		}

		var load = {
			recomended : function(clbk, firstshares){

				el.loader.fadeIn()

				el.c.addClass('loading');

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

			sstuff : function(shares, error, pr, clbk, bshares){

				if(!bshares) bshares = []

				var allshares = [].concat(shares, bshares)

				var author = essenseData.author;

				self.app.platform.sdk.node.shares.loadvideoinfoifneed(allshares, video, function(){
					self.app.platform.sdk.node.shares.users(allshares, function(l, error2){

						countshares = countshares + allshares.length

						loading = false;

						if (!el.c)
							return

						if(!error && !error2){

							if(!shares || !shares.length || ((shares.length < pr.count) || recommended == 'recommended')){								

								if(!beginmaterial && !countshares){
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

								////// SHIT
								if ((!shares.length || shares.length < pr.count) && (recommended || author || essenseData.search)){

									if(essenseData.ended) {
										ended = essenseData.ended(shares)

									}

									else
										ended = true

								}
		
									
							}

							shares = _.filter(shares, function(share){
								return !_.find(bshares, function(bshare){
									return bshare.txid == share.txid
								})
							})

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
							

							if (shares.length){

								if (essenseData.hasshares){
									essenseData.hasshares(shares)
								}
							}



						}

						if (essenseData.afterload){
							essenseData.afterload(essenseData, shares, error || error2)
						}

						el.loader.fadeOut()

						if (clbk)
							clbk(shares, error || error2)

					})	

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

							var _beginmaterial = ''//beginmaterial;

							if(!author){
								loader = 'hierarchical'
								
							}
							else
							{
								_beginmaterial = beginmaterial
							}

							if (recommended){

								

								if(recommended == 'recommended'){
									loader = 'recommended'
								}

								else

								if(recommended == 'hot'){
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

							if (essenseData.loaderkey) loader = essenseData.loaderkey
							if (essenseData.from) _beginmaterial = essenseData.from

							var tagsfilter = self.app.platform.sdk.categories.gettags()

							if (essenseData.tags) tagsfilter = essenseData.tags

							var page = essenseData.page || parameters().page || 0

							self.app.platform.sdk.node.shares[loader]({

								author : author,
								begin : _beginmaterial || '',
								txids : essenseData.txids,
								height : fixedblock,
								tagsfilter : tagsfilter,
								video : video || essenseData.videomobile,
								count : video ? 20 : 10,
								page : page,
								period : essenseData.period

							}, function(shares, error, pr){

								if(pr.blocknumber) fixedblock = pr.blocknumber

								
								if (essenseData.shuffle) {
									shares = _.shuffle(shares)
								}

								load.sstuff(shares, error, pr, clbk, bshares)				

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

				else

				if(recommended == 'b'){
					loader = 'getbyidsp'
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

			if(/*!beginmaterial && */recommended != 'recommended' && !essenseData.author && !essenseData.search){

				var ts =  _.toArray(self.sdk.node.transactions.temp.share || {})

				var a = 0;
				
				if (ts.length && !recommended){

					a = a - ts.length;
				}


				if(((c || 0) + a > 0)){

					newmaterials = newmaterials + (c || 0) + a;

					el.c.addClass('showprev')

					el.c.find('.countnew').html( "(" + newmaterials + ")" )

					if (essenseData.renderclbk)
						essenseData.renderclbk()
				}
			}
		}

		var initEvents = function(){			

			

			if(isMobile() && canloadprev && !essenseData.openapi){

				

				var cc = el.c.find('.circularprogress');
				var maxheight = 220;

				var progress = new CircularProgress({
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

				if(!essenseData.second){
					var parallax = new SwipeParallaxNew({

						el : el.c.find('.shares'),
	
						allowPageScroll : 'vertical',
	
						//prop : 'padding',
		
						directions : {
							down : {
								cancellable : true,
	
								positionclbk : function(px){
									var percent = Math.abs(px) / trueshold;
	
									if (px >= 0){
	
										progress.options.text = {
											value: ''
										};
	
										progress.update(percent * 100);
										cc.fadeIn(1)
										cc.height((maxheight * percent)+ 'px')
	
										//el.shares.css('opacity', 1 - percent) 
										tp.css('opacity', 1 -  (4 * percent))
	
									}
									else{
										progress.renew()
										cc.fadeOut(1)
									}
	
								},
	
								constraints : function(){
									if(el.w.scrollTop() <= 0 && !fullscreenvideoShowed){
	
										return true;
	
									}
								},
	
								restrict : true,
								dontstop : true,
								trueshold : trueshold,
								clbk : function(){
	
									progress.update(0);
									cc.fadeOut(1)
									self.app.platform.sdk.notifications.getNotifications()
		
									actions.loadprev(function(){
	
										
									})
									
								}
		
							}
						}
						
		
					}).init()
				}
				
				
			}

			if(!essenseData.openapi){

				el.w.on('resize', events.resize);
				
				if(!essenseData.horizontal){
					el.w.on('scroll', events.videosInview);
					el.w.on('scroll', events.sharesPreInitVideo);
				}
				

				if(!essenseData.notscrollloading){
					el.w.on('scroll', events.sharesInview);
					el.w.on('scroll', events.loadmorescroll);
				}	
				
			}

			el.c.on('click', '.wholikesTable', events.postscores)

			el.c.on('click', '.stars i', events.like)
			el.c.on('click', '.complain', events.complain)
			el.c.on('click', '.imageOpen', events.openGallery)
			el.c.on('click', '.txid', events.getTransaction)

			if(!isMobile()){
				//el.c.on('click', '.sharecaption', events.openPost)
				//el.c.on('click', '.message', events.openPost)
			}

			el.c.on('click', '.debuginfo .icon', function(){
				$(this).closest('.debuginfo').addClass('showed')

				renders.debugusers($(this).closest('.debuginfo'))
			})
			
			el.c.on('click', '.showMore', events.openPost)

			el.c.on('click', '.forrepost', events.repost)


			el.c.on('click', '.unblockbutton', events.unblock)
			
			/*if(isMobile()){

				el.c.on('click', '.videoTips', events.fullScreenVideoMobile)
				el.c.on('click', '.videoOpen', events.fullScreenVideoMobile)

			}

			if(!isMobile()){*/
				el.c.on('click', '.videoTips', events.fullScreenVideo)
				el.c.on('click', '.videoOpen', events.fullScreenVideo)

				el.c.on('click', '.opensviurl', events.opensvi)
				
				
			//}

			
			
			el.c.on('click', '.exitFull', events.exitFullScreenVideo)
			
			//el.c.on('click', '.subscribe', events.subscribe)
			el.c.on('click', '.additional', events.additional)

			el.c.on('click', '.asubscribe', events.asubscribe)
			el.c.on('click', '.aunsubscribe', events.aunsubscribe)
			el.c.on('click', '.notificationturn', events.subscribePrivate)
			


			el.c.on('click', '.donate', events.donate)
			el.c.on('click', '.sharesocial', events.sharesocial)
			el.c.on('click', '.discussion', events.discussion)

			el.c.on('click', '.metmenu', events.metmenu)

			el.c.find('.loadmore button').on('click', events.loadmore)
			el.c.find('.loadprev button').on('click', events.loadprev)

			el.c.on('click', '.showmorebyauthor', events.showmorebyauthor)

			el.c.on('click', '.commentsAction', events.toComments)

			


			if(!essenseData.openapi && !essenseData.second){

				if(!essenseData.txids){
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
	
						if(/*beginmaterial || */essenseData.author || essenseData.txids) return
	
	
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
	
								shareInitedMap[s.txid] = false
	
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

					if ((window.cordova || isInStandaloneMode()) && !fullscreenvideoShowed && !essenseData.txids && !making && time > 120 && !essenseData.second){

						actions.loadprev()
						_scrollTop(0)
						
					}
				}
			

				if(!essenseData.txids){

					self.app.platform.ws.messages["newblocks"].clbks.newsharesLenta = 
					self.app.platform.ws.messages["new block"].clbks.newsharesLenta = actions.newmaterials

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

				self.app.platform.clbks.api.actions.subscribe.lenta = function(address){

					var addressEl = el.c.find('.shareTable[address="'+address+'"]')

					addressEl.addClass('subscribed');
					addressEl.find('.notificationturn').removeClass('turnon')	
				}

				self.app.platform.clbks.api.actions.subscribePrivate.lenta = function(address){

					var addressEl = el.c.find('.shareTable[address="'+address+'"]')

					var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

					if (me){
						var r = me.relation(address, 'subscribes') 

						if (r && (r.private == 'true' || r.private === true)){
							addressEl.find('.notificationturn').addClass('turnon')	
						}
						else{
							addressEl.find('.notificationturn').removeClass('turnon')	
						}
					}

					addressEl.addClass('subscribed');
				}
				

				self.app.platform.clbks.api.actions.unsubscribe.lenta = function(address){

					var addressEl = el.c.find('.shareTable[address="'+address+'"]')

					addressEl.removeClass('subscribed');

					addressEl.find('.notificationturn').removeClass('turnon')
				}

				self.app.platform.clbks.api.actions.blocking.lenta = function(address){

					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')

					addressEl.addClass('blocking');
				}

				self.app.platform.clbks.api.actions.unblocking.lenta = function(address){

					var addressEl = el.c.find('.shareTable[address="'+address+'"]').closest('.share')

					addressEl.removeClass('blocking');
				}


			

			}	
			
		}

		var make = function(clbk, _p){

			making = true;

			actions.cleardelay()

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
			}


			load.shares(function(shares, error){

				if (error){
					making = false;
					
					if (self.app.errors.connection()){
						el.c.addClass('networkError')
					}

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
					

					if (clear)
						el.c.find('.shares').html('')

					renders.shares(shares, function(){

						renders.sharesInview(shares, function(){
							

							making = false;

							events.sharesInview()
							events.sharesPreInitVideo()
							events.videosInview()

							var p = parameters()

							if(!essenseData.second){
								if (p.s && !p.msh){
									if(!isMobile())
	
										actions.openPost(p.s, function(){
											actions.scrollToPost(p.p)
										})
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
	
									//actions.scrollToPost(p.v)
	
									if(video){
									}
									else{	
	
										if(!isMobile())
											actions.fullScreenVideo(p.v, function(){})
									}
									
								}
	
								if (p.p){
									actions.postscores(p.p, function(){
										actions.scrollToPost(p.p)
									})
								}
							}

							

							if (clbk){
								clbk()
							}

							if (essenseData.goback && _p.clbk){
								essenseData.goback = false;
								_p.clbk(null, _p);
							}

							if(essenseData.notscrollloading && essenseData.txids){
								renders.txidall(essenseData.txids)
							}
						
						})



		
					})
				}


			}, cache)

					
		}

		var clearnewmaterials = function(){

			if (!essenseData.goback && !essenseData.second && !essenseData.author && !beginmaterial) {
				var key = 'common'

				if (video){
					key = 'video'
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

				

				canloadprev = !!!essenseData.txids || false

				video = essenseData.video || false
				
				self.app.platform.sdk.ustate.me(function(_mestate){

					mestate = _mestate || {}


					var data = {
						beginmaterial : beginmaterial,
						author : essenseData.author,
						recommended : recommended,
						filters : essenseData.search || essenseData.tags
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

									clbk(data);

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

				console.log('players', ap)

				return ap.length
			},

			destroy : function(){

				/*if (essenseData.window){
					essenseData.window.off('scroll')
				}*/

				if (el.shares && isotopeinited){
					el.shares.isotope('destroy')
					
				}

				actions.cleardelay()

				actions.scrollmode(false)

				isotopeinited = false

				_.each(shareInitedMap, function(s, id){
					delete self.app.platform.sdk.node.shares.storage.trx[id]
				})

				_.each(players, function(p){

					if (p.p)
						p.p.destroy()

				})

				players = {}

				if(ovf)

					self.app.actions.onScroll()

				_.each(initedcommentes, function(c){
					c.destroy()
				})

				initedcommentes = {}

				delete self.iclbks.lenta

				if(!essenseData.openapi && !essenseData.second && !essenseData.txids){

					delete self.app.platform.sdk.categories.clbks.tags.lenta
					delete self.app.platform.sdk.categories.clbks.selected.lenta

					delete self.app.platform.ws.messages.comment.clbks.lenta
					delete self.app.platform.sdk.node.shares.clbks.added.lenta
					delete self.app.platform.ws.messages.transaction.clbks.temp
					delete self.app.platform.ws.messages.event.clbks.lenta

					delete self.app.platform.ws.messages["new block"].clbks.newsharesLenta
					delete self.app.platform.clbks.api.actions.subscribe.lenta
					delete self.app.platform.clbks.api.actions.unsubscribe.lenta
					delete self.app.platform.clbks.api.actions.subscribePrivate.lenta 

					delete self.app.platform.clbks.api.actions.blocking.lenta
					delete self.app.platform.clbks.api.actions.unblocking.lenta

					delete self.app.platform.clbks._focus.lenta
				}

				self.app.platform.sdk.chats.removeTemp()
				video = false					

				if (el.w){


						el.w.off('scroll', events.sharesPreInitVideo);
						el.w.off('scroll', events.videosInview);
						el.w.off('scroll', events.sharesInview);



					el.w.off('scroll', events.loadmorescroll);
					el.w.off('resize', events.resize);
				}
				

				el = {};
			},

			authclbk : function(){

				if(typeof el != 'undefined' && el.c){
					
					actions.authclbk()

				}
				
			},

			update : function(){
				if(el.shares && isotopeinited) el.shares.isotope('layout')
			},
			
			init : function(p){
				

				w = $(window)

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.shares = el.c.find('.shares');
				el.loader = el.c.find('.loader');
				el.lentacnt = el.c.find('.lentacell .cnt')
				el.w = essenseData.window || $(window)

				el.share = {}

				if (essenseData.horizontal){
					el.c.addClass('horizontal')
				}

				if (essenseData.compact){
					el.c.addClass('compact')
				}

				initEvents();

				clearnewmaterials()	

				make(null, p);

				if (video){
					el.c.addClass('mainvideo')
				}

				if(!essenseData.goback)

					p.clbk(null, p);

				
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