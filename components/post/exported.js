var f = require('././js/lib/client/functions.js')

var post = function(nModule){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = f.deep(p, 'history') || f.deep(p, 'primary');

		var el, share, ed, inicomments, eid = '', _repost = null, level = 0;

		var authblock = false;

		var actions = {
			authclbk : function(){
				authblock = true;

				var id = share.txid

				self.sdk.node.shares.getbyid(id, function(){

					share = self.app.platform.sdk.node.shares.storage.trx[id] 

					delete share.myVal

					actions.subscribeLabel()	

					renders.mystars(function(){
						authblock = false;
					})
					
					

				})
			},
			subscribeLabel : function(){

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

					var _el = el.share.find('.shareTable')

					if(subscribed){
						_el.addClass("subscribed")
					}
					else{
						_el.removeClass("subscribed")
					}

				}
				
				

			},
			stateAction : function(clbk){

				self.app.user.isState(function(state){

					if(state){
						clbk()
					}

					else
					{
						self.nav.api.load({
							open : true,
							id : 'authorization',
							inWnd : true,

							essenseData : {

								fast : true,
								loginText : self.app.localization.e('llogin'),
								successHref : '_this',

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
			postscores : function(clbk){

				self.app.nav.api.load({
					open : true,
					href : 'postscores?p=' + share.txid,
					inWnd : true,
					history : true,

					essenseData : {
						share : share.txid,

						like : function(share){
							renders.stars()

							if(ed.like) ed.like()
						},
						
					},

					clbk : function(){
						if (clbk)
							clbk()
					}
				})

			},
			repost : function(shareid){

				actions.stateAction(function(){
					var href = 'index';

					if(isMobile()) href = 'share'

					self.closeContainer()

					self.nav.api.load({
						open : true,
						href : href + '?repost=' + shareid,
						history : true,
						handler : true,
						essenseData : {
							
						},

						clbk : function(p){
							
						}
					})
				})

				

			},
			next : function(){

				el.wnd.off('scroll')

				var nextel = el.c.find('.nextpost');

					nextel.html('<div class="loader"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div>')

				ed.next(share.txid, function(txid){

					

					if(txid){

						self.nav.api.load({
							open : true,
							href : 'post?s=' + txid,
							//history : true,
							
							eid : 'nextpost' + txid,
							el : nextel,
			
							clbk : function(){	
			
							},
			
							essenseData : {
								share : txid,
								hr : ed.hr,
								like : ed.like,
								next : ed.next,
								removemargin : true
							}
						})

					}
					else{
						nextel.html('<div class="ended">'+self.app.localization.e('e13146')+'</div>')
					}

					

				})

				
	
			},

			sharesocial : function(clbk){
		
				var url = 'https://'+self.app.options.url+'/' + (ed.hr || 'index?') + 's='+share.txid+'&mpost=true' + '&ref=' + self.app.platform.sdk.address.pnet().address

				if (parameters().address){
					url += '&address=' + (parameters().address || '')
				}


				var m = share.message;

				var nm = trimHtml(m, 130).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...');

				var image = share.images[0];

				if (!image && share.url){
					var v = videoImage(share.url)

					if (v){
						image = v;
					}
				}

				var n = 'Post';

				if(share.settings.v == 'a') n = 'Article'

				self.nav.api.load({
					open : true,
					href : 'socialshare',
					history : true,
					inWnd : true,

					essenseData : {
						url : url,
						caption : self.app.localization.e('e13147') + ' ' + n,
						image : image,
						title : share.caption || deep(app, 'platform.sdk.usersl.storage.'+share.address+'.name'),
						text : nm
					}
				})
			
			},

			donate : function(clbk){

				var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
					address : share.address,
					addresses : []
				}

				var link = 'send?address=' + share.address + '&amount=1&message='
				+hexEncode(self.app.localization.e('postlabel') + ' &mdash; ' + (share.caption || share.message).substr(0, 20) + "...")
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

								self.closeContainer()

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
				

			
			},
			
			position : function(){

				if(isMobile()) return
					
				if(primary) return

				if(ed.removemargin) return


				var h = $(window).height();

				var wh = el.wr.height();

				var d = (h - wh) / 2

				if (d > 0){
					el.wr.css('margin-top', d + 'px')
				}
				else
				{
					el.wr.css('margin-top', 0 + 'px')
				}

			},
			initVideo : function(clbk){
				if (self.app.platform.sdk.usersettings.meta.embedvideo && !
					self.app.platform.sdk.usersettings.meta.embedvideo.value) return
				
				var pels = el.c.find('.js-player, [data-plyr-provider][data-plyr-embed-id]');

				if (pels.length)
				{

                    var options = {						
						//autoplay : pels.length <= 1,
						resetOnEnd : true,
						muted : false
					};

                    $.each(pels, function(key, el) {
                        PlyrEx(el, options, () => {}, () => {
							if (clbk)
                                clbk()
						});
                    });                    
					
				}
			},

			///
			///
			likeWithR : function(value, clbk){
				 
			},
			like : function(value, clbk){

				var upvoteShare = share.upvote(value);


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

							share.myVal = null;		

							self.app.platform.errorHandler(error, true)	

							if (clbk)
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

			complain : function(clbk){

			
				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,

					essenseData : {
						item : 'post',
						obj : share,

						success : function(){
							
						}
					},

					clbk : function(){
						
					}
				})
			},			

			unsubscribe : function(clbk){
				self.app.platform.api.actions.unsubscribe(share.address, function(tx, error){
					if(!tx){
						self.app.platform.errorHandler(error, true)	
					}

					if (clbk)
						clbk(tx, error)
				})	
			},

			subscribe : function(clbk){



				self.app.platform.api.actions.subscribe(share.address, function(tx, error){
					if(!tx){
						self.app.platform.errorHandler(error, true)	
					}

					if (clbk)
						clbk(tx, error)
				})

		
			},

			openGalleryRec : function(initialValue, clbk){

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
	
					self.app.nav.api.load({
						open : true,
	
						href : 'imagegallery?i=' + share.txid + '&num=' + (num || 0),
	
						inWnd : true,
						history : 'true',
						essenseData : {
							initialValue : initialValue,
							idName : 'src',
							images : images
						}
					})
				})
			},

			openGallery : function(initialValue){
				
				var images = _.map(share.images, function(i){
					return {
						src : i
					}
				})

				var num = findIndex(images, function(image){

					if (image.src == initialValue) return true;						

				})

				self.app.nav.api.load({
					open : true,

					href : 'imagegallery?i=' + share.txid + '&num=' + (num || 0),

					inWnd : true,
					history : 'true',
					essenseData : {
						initialValue : initialValue,
						idName : 'src',
						images : images
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
		}

		var events = {
			postscores : function(){
				actions.postscores()
			},
			repost : function(){
				actions.repost(share.txid);
			},
			metmenu : function(){
				var _el = $(this);
				var id = share.txid;

				self.app.platform.api.metmenu(_el, id, actions)

			},
			next : function(){

				if(el.wnd.scrollTop() + el.wnd.height() > el.wnd.find('>div#post').height() - 400) {
					actions.next()
				}

				
			},
			unsubscribe : function(clbk){
				actions.unsubscribe(function(){
					if (tx)
						el.share.find('.shareTable').removeClass('subscribed');
				})	
			},

			subscribePrivate : function(){

				var _el = $(this);

				var off = _el.hasClass('turnon')

				var f = 'notificationsTurnOn'

				if(off){

					f = 'notificationsTurnOff'
					
				}

				self.app.platform.api.actions[f](share.address, function(tx, err){

					if(tx){
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},

			subscribe : function(clbk){

				actions.stateAction(function(){

					self.app.platform.api.actions.subscribeWithDialog(share.address, function(tx, error){
						if(tx){
							el.share.find('.shareTable').addClass('subscribed');
						}	
						else{
							self.app.platform.errorHandler(error, true)	
						}
						
					})

				})

		
			},
			getTransaction : function(){
				self.app.platform.sdk.node.transactions.get.tx(share.txid)
			},

			like : function(){

				var value = $(this).attr('value')
				
				actions.stateAction(function(){

					if (!self.app.platform.sdk.address.pnet() || share.address == self.app.platform.sdk.address.pnet().address) return

					var p = $(this).closest('.stars');						

					if (p.attr('value')){


						return
					}

					p.attr('value', value)
					p.addClass('liked')
					
					actions.like(value, function(r){
						if(r){
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
						else
						{
							p.removeAttr('value')
							p.removeClass('liked')
						}
					})
				})


			},

			complain : function(){				

				dialog({
					html : self.app.localization.e('e13148'),
					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),

					success : function(){
						el.share.addClass('complained')

						topPreloader(30);

						actions.complain(function(r){
							topPreloader(100);
							if(!r){
								p.removeClass('hidden')
							}
						})
					}
				})

					
			},

			

			openGallery : function(){
				var src = $(this).attr('i')

				actions.openGalleryRec(src)
			},

			sharesocial : function(){


				actions.sharesocial()
			},

			donate : function(){
				

				actions.donate()
			},

		}

		var renders = {
			comments : function(clbk){

				if(!ed.repost || ed.fromempty){
					self.fastTemplate('commentspreview', function(rendered){

						var _el = el.c.find(".commentsWrapper");

						var rf = ''

						if (self.app.platform.sdk.address.pnet()){
							rf = '&ref=' + self.app.platform.sdk.address.pnet().address
						}

	
						var url = 'https://'+self.app.options.url+'/' + (ed.hr || 'index?') + 's='+share.txid+'&mpost=true' + rf
	
						if (parameters().address){
							url += '&address=' + (parameters().address || '')
						}
	
						self.nav.api.load({
							open : true,
							id : 'comments',
							el : _el,
	
							eid : (ed.eid || "") + share.txid + 'post',
	
							essenseData : {
								hr : url,
								totop : el.c,
								
								caption : rendered,
								send : function(){
									var c = el.c.find(".commentsAction .count span");
	
									c.html(Number(c.html() || "0") + 1)
								},
								txid : share.txid,
								
								reply : ed.reply,
								
								showall : !ed.fromempty,
								init : ed.fromempty || false,
								preview : ed.fromempty || false,
								
	
								fromtop : !ed.fromempty,
								fromempty : ed.fromempty,
								lastComment : ed.fromempty ? share.lastComment : null,
	
								additionalActions : function(){
									self.closeContainer()
								}
							},
	
							clbk : function(e, p){
								actions.position()
								inicomments = p
	
	
								if (clbk)
									clbk()
							}
						})
	
					}, {
						share : share
					})
				}

				else{
					if (clbk)
						clbk()
				}

				
			},
			empty : function(){
				self.shell({
					name :  'empty',
					el : el.share,

				}, function(_p){

					actions.position()


				})
			},
			images : function(clbk){

				var _el = el.c.find(".image");
				var images = el.c.find(".images");

				if(images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

				}
				else
				{
					_el.imagesLoadedPN({ imageAttr: true }, function(image) {

						if(share.settings.v != 'a'){

							_.each(image.images, function(img, n){

								var _img = img.img;

								var el = $(image.elements[n]).closest('.imagesWrapper');
								var ac = '';

								var _w = el.width();
								var _h = el.height()

								var w = _w * (_img.width / _img.height);

								


								if(_img.width < el.width()){
									el.find('.image').width(_img.width)
									el.find('.image').height(_img.height)
								}
								else{
									el.height(_w * (_img.height / _img.width))
								}
								
							})

						}

						

						images.addClass('active')

						_el.addClass('active')

						if (clbk)
							clbk()

					}, self.app);
				}

				
				
			},
			share : function(clbk){

				self.shell({
					turi : 'lenta',
					name :  'share',
					el : el.share,

					additionalActions : function(){
						self.closeContainer()
					},

					data : {
						share : share,
						all : true,
						mestate : {},
						repost : ed.repost,
						fromempty : ed.fromempty
					},

				}, function(_p){

					el.stars = el.share.find('.forstars')

					actions.position();

					el.wr.addClass('active')	

					renders.stars(function(){

						renders.mystars(function(){
							
						})

						renders.url(function(){

							renders.repost();

							actions.position()
							
							renders.urlContent(function(){

								actions.position()

								actions.initVideo()

								renders.images(function(){

									if(!ed.repost){

										actions.position()

										
										el.share.find('.complain').on('click', events.complain)

										el.share.on('click', '.imagePostOpent', events.openGallery)
										el.share.on('click', '.forrepost', events.repost)

										el.share.find('.txid').on('click', events.getTransaction)
										el.share.find('.donate').on('click', events.donate)
										el.share.find('.sharesocial').on('click', events.sharesocial)
										el.share.find('.asubscribe').on('click', events.subscribe)
										el.share.find('.aunsubscribe').on('click', events.unsubscribe)
										el.share.find('.metmenu').on('click', events.metmenu)

										el.share.find('.notificationturn').on('click', events.subscribePrivate)


									}

									if (clbk)
										clbk()
									
								})


							});
					

						})

					})

				})
			},
			wholike : function(clbk){


				var wholikes = share.who || [];

				self.shell({
					turi : 'lenta',
					name :  'wholike',
					el : el.share.find('.wholikes'),
					data : {
						scores : Number(share.scnt),
						wholikes : wholikes
					},
					bgImages : {}			

				}, function(p){

					p.el.find('.wholikesTable').on('click', events.postscores)

					if (clbk)
						clbk()

				})

			},
			mystars : function(clbk){

				if(typeof share.myVal == 'undefined'){
					var ids = [share.txid]

					self.app.platform.sdk.likes.get(ids, function(){

						renders.stars()

						renders.wholike(clbk)

					})
				}
				else{
					if(clbk) clbk()
				}

			},
			stars : function(clbk){


				self.shell({
					turi : 'lenta',
					name :  'stars',
					el : el.stars,
					data : {
						share : share,
						hideCount : undefined
					}					

				}, function(p){


					fastars(p.el.find('.stars'))

					el.share.find('.stars i').on('click', events.like)

					if (clbk)
						clbk()

				})
				
			},
			repost : function(clbk){

				

				if(share.repost){

					self.shell({
						turi : 'lenta',
						name :  'repost',
						el : el.c.find('.repostWrapper'),
						data : {
							repost : share.repost,
							level : level,
							share : share
							//fromrepost : ed.repost
						},
	
					}, function(_p){

						actions.position()

						if(_p.el && _p.el.length){

							self.app.platform.papi.post(share.repost, _p.el.find('.repostShare'), function(p){

								_repost = p;

								actions.position()

							}, {
								repost : true,
								eid : eid + share.txid,
								level : level,
								fromempty : share.isEmpty()
							})

						}


						

					})

				}
			},
			url : function(clbk){

				var url = share.url

				var og = self.app.platform.sdk.remote.storage[url];


				self.shell({
					turi : 'share',
					name :  'url',
					el : el.c.find('.url'),
					data : {
						url : url,
						og : og,
						share : share
					},

					additionalActions : function(){
						self.closeContainer()
					},

				}, function(_p){

					var images = _p.el.find('img');

					_p.el.find('img').imagesLoadedPN({ imageAttr: true }, function(image) {

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

						if (clbk)
							clbk()

					}, self.app);

					

					

				})
			},

			urlContent : function(clbk){
				

				var url = share.url;

				if (url){

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
									renders.url(clbk)
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
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			

			self.app.platform.ws.messages.transaction.clbks.temppost = function(data){

				if(data.temp){

					if(share.txid == data.temp.txid){

						share.temp = false
						share.scnt = "0"
						share.score = "0"
						share.myVal = 0

						renders.share()

						
					}

				}
				
			}

			self.app.platform.ws.messages.event.clbks.post = function(data){

				if(data.mesType == 'upvoteShare' && data.share){

					if(share.txid == data.share.txid){
						renders.stars(function(){
							
						})
					}

				

				}
				
			}

			self.app.platform.clbks.api.actions.subscribePrivate.post = function(address){

				if(address == share.address){

					el.c.find('.shareTable[address="'+address+'"]').addClass('subscribed');

					var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

					if (me){
						var r = me.relation(address, 'subscribes') 

						el.c.find('.shareTable[address="'+address+'"] .notificationturn').removeClass('turnon')

						if (r && (r.private == 'true' || r.private === true)){
							el.c.find('.shareTable[address="'+address+'"] .notificationturn').addClass('turnon')	
						}
						else{
							el.c.find('.shareTable[address="'+address+'"] .notificationturn').removeClass('turnon')	
						}
					}
				}

			}

			self.app.platform.clbks.api.actions.subscribe.post = function(address){

				if(address == share.address){
					
					el.c.find('.shareTable[address="'+address+'"]').addClass('subscribed');
					el.c.find('.shareTable[address="'+address+'"] .notificationturn').removeClass('turnon')
				}

				
			}

			self.app.platform.clbks.api.actions.unsubscribe.post = function(address){

				if(address == share.address){

					el.c.find('.shareTable').removeClass('subscribed');
					el.c.find('.shareTable[address="'+address+'"] .notificationturn').removeClass('turnon')
				}
			}


			
		}

		

		var make = function(){

			if (share){
				renders.share(function(){
					renders.comments(function(){

						/*if (el.wnd && el.wnd.length && ed.next && !isMobile()){
			
							//el.wnd.on('scroll', events.next)

							events.next()
						}*/

					})
				})
				
			}
			else
			{
				renders.empty()
			}

			
		}

		return {
			primary : primary,


			getdata : function(clbk, p){

				_repost = null

				eid = p.settings.eid || ''

				

				var id = deep(p, 'settings.essenseData.share') || parameters().s;

					ed = deep(p, 'settings.essenseData') || {};

					share = null;

				level = (ed.level || -1) + 1 

				self.app.platform.sdk.node.shares.getbyid([id], function(){

					share = self.app.platform.sdk.node.shares.storage.trx[id] 
						

					if(!share){
						var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
							return s.txid == id
						})

						if (temp){
							share = new pShare();
							share._import(temp, true);
							share.temp = true;
							share.address = self.app.platform.sdk.address.pnet().address
						}

					}

					if(share){
						self.app.platform.sdk.node.shares.users([share], function(l, error2){


							var data = {
								ed : deep(p, 'settings.essenseData') || {}
							};
	
							clbk(data);
	
						})
					}
				
				})
				
				

			},

			authclbk : function(){
				if(typeof el != 'undefined' && el.c){
					
					actions.authclbk()

				}
			},

			destroy : function(key){
				el = {};

				if (ed.close) ed.close()

				if (inicomments)
					inicomments.destroy()

				delete self.app.platform.ws.messages.event.clbks.post
				
				delete self.app.platform.ws.messages.transaction.clbks.temppost
				delete self.app.platform.clbks.api.actions.subscribePrivate.post
				delete self.app.platform.clbks.api.actions.unsubscribe.post
				delete self.app.platform.clbks.api.actions.subscribe.post

				authblock = false;


				if (_repost){
					_repost.destroy();

					_repost = null;
				}

			},

			clearparameters : ['s', 'commentid', 'parentid'],
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.wr = el.c.find('.postWrapper')
				el.wnd = el.c.closest('.wndcontent');

				make()

				p.clbk(null, p);

				initEvents();
			},

			

			wnd : {
				class : 'withoutButtons postwindow',
				swipeClose : true,
				swipeCloseDir : 'right',
				swipeMintrueshold : 30,
				close : function(){
					//self.app.nav.api.history.removeParameters(['s'])
				}
			}
		}
	};

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
};

module.exports = post;