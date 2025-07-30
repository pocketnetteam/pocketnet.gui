var authorn = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author;
		var modules = {}
		var cstate = {}
		var upbutton;
		var upbackbutton;
		var lastscroll = 0;
		var openedpost = null
		var acsearch = null
		var result = null
		var fixedBlock = null
		var lastnav = '' 
		var external = null

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var actions = {
			openvi : function(id){

				lastscroll = self.app.lastScrollTop

				events.up()

				window.rifticker.add(() => {
				
					el.c.addClass('opensvishowed')

					setTimeout(() => {
						el.c.addClass('opensvishowedend')
					}, 300)

				})

				window.rifticker.add(() => {
					self.app.el.html.removeClass('allcontent')
					self.app.mobile.statusbar.background()
				})

				setTimeout(() => {

					if (upbutton) upbutton.destroy()
				
					if (upbackbutton) upbackbutton.destroy()

					if(typeof _Electron == 'undefined' || !_Electron){
						setTimeout(function(){
						
							upbackbutton = self.app.platform.api.upbutton(el.upbackbutton, {
								top : function(){
									return '65px'
								},
								rightEl : el.c.find('.lentacellsvi'),
								scrollTop : 0,
								click : function(a){
									actions.backtolenta()
								},

								icon : '<i class="fas fa-chevron-left"></i>',
								class : 'bright',
								text : 'Back'
							})	
						}, 50)
							
						setTimeout(function(){
							upbackbutton.apply()
						},300)
					}

					renders.post(id)

					self.nav.api.history.addParameters({
						v : id
					})

					self.nav.api.changedclbks()
					
				}, 400)
			},
			gonav : function(id){

				if(!id) id = 'common'

				var meta = _.find(lentameta, (m) => {
					return m.id == id
				})

				if(!meta) return

				lastnav = id

				self.app.nav.api.history.removeParameters(cleanParameters())

				var link = self.app.platform.api.authorlink(author.address)

				if (meta.parameter) link = link + "?" + meta.parameter + "=1"

				self.nav.api.load({
					open : true,
					href : link,
					history : true,
					handler : true,
					noscroll : true
				})
			},
			clearSearch : function(light){

				if (parameters().ssa || parameters().ssat){

					self.app.platform.sdk.search.clear()
	
					result = null
					fixedBlock = null
	
					if(!light){
						actions.gonav(lastnav)
					}
				}
				
			},
			makenext : function(type, start, count, clbk){

				var l = 0;
				var L = 10;
	
				if (result){
					l = result.data.length;
					L = result.count;
				}
	
				if(start + count <= l){
					return
				}
	
				if (start < l){
					var d = l - start;
	
					start = l;
					count = count - d;
				}
				
				if(start + count > L) count = L - start
	
				if(count <= 0) return
	
				load[type](function(data){
	
					if(clbk)
					{
						clbk(data)
					}
	
				}, start, count)	
	
			},

			backtolenta : function(){
				actions.backtolentaClear()

				self.app.actions.scroll(lastscroll || 0)
			},

			backtolentaClear : function(){

				self.nav.api.history.removeParameters(['v'])

				if(!el.c) return

				el.c.removeClass('opensvishowedend')
				el.c.addClass('opensvishowedWillremoved')

				self.app.el.html.addClass('allcontent')
				self.app.mobile.statusbar.topfadebackground()

				renders.upbutton()
				renders.post(null)
				
				setTimeout(() => {
					el.c.removeClass('opensvishowed')
				}, 300)

				setTimeout(() => {
					el.c.removeClass('opensvishowedWillremoved')
				}, 350)

				self.nav.api.changedclbks()

				if (lenta && lenta.update) 
					lenta.update()
			}
		}

		var currentLenta = function(){

			var params = parameters()

			var method = _.find(lentameta, (m) => {
				if(params[m.parameter]){
					return true
				}
			})

			if(self.app.television){
				method = _.find(lentameta, (v) => {
					return v.id == 'video'
				})
			}

			if(!method){
				return lentameta[0]
			}

			return method
		}

		var cleanParameters = function(){
			return _.filter(_.map(lentameta, (m) => {
				return m.parameter
			}), (p) => {return p})
		}

		var lentameta = [{
			id : 'common',
			text : 'shares',
			default : true,
			extend : function(params){
				params.getpin = true
				//params.opensviStream = !isMobile() || self.app.television ? true : null
				params.opensvi = !isMobile() || self.app.television ? actions.openvi : null
				
				return params
			},


			count : function(){
				return 0
				var c = author.data.content || {}

				return ((c[200] || 0) + (c[201] || 0) + (c[202] || 0) + (c[209] || 0) + (c[210] || 0)) || author.data.postcnt || 0
			}
		},{
			id : 'video',
			text : 'e14105',
			parameter : 'video',
			extend : function(params){
				params.video = !isMobile() || self.app.television
				params.videomobile = isMobile() && !self.app.television

				params.opensvi = !isMobile() || self.app.television ? actions.openvi : null

				return params
			},
			count : function(){
				return 0

				var c = author.data.content || {}

				return (c[201] || 0) + (c[209] || 0)
			}
		},{
			id : 'articles',
			text : 'longreads',
			parameter : 'read',
			extend : function(params){
				params.read = true
				return params
			},
			count : function(){
				return 0

				var c = author.data.content || {}

				return (c[202] || 0)
			}
		},{
			id : 'audio',
			text : 'audio',
			parameter : 'audio',
			extend : function(params){
				params.audio = true
				return params
			},
			count : function(){
				return 0
				
				var c = author.data.content || {}

				return (c[210] || 0)
			}
		},{
			id : 'search',
			parameter : 'ssa',
			extend : function(params){
				params.search = true
				params.searchValue = parameters().ssa
				params.loader = function(clbk){

					var _clbk = function(data){

						self.app.psdk.share.insertFromResponseSmall(data)

						var shares = self.app.psdk.share.gets(_.map(data, (s) => {
							return s.txid
						}))

						if (clbk)
							clbk(shares, null, {
								count : 10
							})
					}

					
					actions.makenext('postssearch', deep(result, 'data.length') || 0, 10, function(data){
						_clbk(data)
					})
					
				}

				return params
			}
		},{
			id : 'searchTags',
			parameter : 'ssat',

			extend : function(params){

				var tgsi = decodeURI(parameters().ssat || '')

				var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
					return r
				}));

				params.searchTags = words.length ? words : null
				
				return params
			}
		}]


		var load = {
			postssearch : function(clbk, start, count){

				self.app.platform.sdk.search.get(parameters().ssa, 'posts', start, count, fixedBlock, function(r, block){


					fixedBlock = block
					
					result || (result = r);

					clbk(result.data);

				}, author.address)
			},

			relations : function(relations, clbk){
				return author.data.loadRelations(relations, self.app.platform.sdk.user.loadRelation)
			},

			blocking: function(){
				return this.relations(['blocking']).then(() => {

					var u = _.map(deep(author, 'data.blocking') || [], function(a){
						return a
					})

					return Promise.resolve(u)

				}).catch((e) => {
					console.error(e)
					return []
				})
			},
			
			subscribers : function(){
				return this.subscribersOrSubscribes('subscribers')
			},
			
			subscribes : function(){
				return this.subscribersOrSubscribes('subscribes').then(({addresses, count}) => {
					return {
						addresses : _.map(addresses, (u) => {
							return u.adddress || u.address
						}), 
						count
					}
				})
			},

			subscribersOrSubscribes(rkey){
				return this.relations([rkey, 'blocking']).then(() => {

					var u = _.map(deep(author, 'data.' + rkey) || [], function(a){
						return a
					})

					var count = u.length
	
					var blocked = (deep(author, 'data.blocking') || []).concat()

					u = _.filter(u, function(a){

						if(!a) return false

						var address = a.adddress || a.address || a

						return _.indexOf(blocked, address) == -1
					})


					return Promise.resolve({
						addresses : u,
						count
					})

				}).catch((e) => {
					console.error(e)
					return {
						addresses : [],
						count : 0
					}
				})
			}
		}

		var events = {
			tempcover : function(src){
				renders.randombg(null, src)

				var ds = false

				new dialog({
					html :  self.app.localization.e('setcoverquestion'),
					btn1text : self.app.localization.e('setcoverquestionyes'),
					btn2text : self.app.localization.e('setcoverquestionno'),

					class : 'zindex bop',

					success : function(){

						ds = true

						self.app.platform.sdk.users.setCover(src, function(err, alias){
							if(!err){
								renders.randombg()
								successCheck()
							}
						})

					},

                    fail: function () {

						ds = true

						renders.randombg(null)
                    },

					onDestroy : function(){
						if(!ds){
							renders.randombg(null)
						}
						
					}
				})
			},
			uploadwallpapper : function(){

				var added = function(image){

					var images = [{
						original : image[0],
						index : 0
					}]

					self.nav.api.load({
						open : true,
						id : 'imageGalleryEdit',
						inWnd : true,
	
						essenseData : {
							edit : true,
							initialValue : 0,
							images : images,
	
							apply : true,
	
							crop : {
								aspectRatio : 3 / 1,
								style : 'apply',
								autoCropArea : 1,
							},
	
							success : function(i, editclbk){

								
	
								resize(images[0].original, 1920, 640, function(resized){
									var r = resized.split(',');
							
									if (r[1]){

										events.tempcover(resized)
	
										/*self.app.platform.sdk.users.setCover(resized, function(err, alias){
											if(!err){
												renders.randombg()
												successCheck()
											}
										})*/
	
									}
									
									editclbk()
	
									
								}, null, 0.85)
	
							}
						}
					})
				}

				if(self.app.mobile.supportimagegallery()){

					app.platform.ui.uploadImage({
						multiple : false,
						mp : 6,
						action : (image, clbk) => {

							var ext = fkit.extensionBase64(image.base64)

							if (ext == 'gif'){
								sitemessage('uploadwallpapperGiferror')
							}
							else{
								added([image.base64])
							}

							clbk()

						},
						onSuccess : function(){

						},
						onError : function(e){
							console.log(e)
						},
						onFail : function(){
							console.log("Fail")
						}
					})


					return
				}
	
				self.nav.api.load({
					open : true,
					id : 'embeding',
					inWnd : true,
					donate: true,

					essenseData : {
						type : 'images',
						multiple : false,
						uploadTitle : '',
						caption : '',
						maxh : 1920,
						maxw : 1920,
						quality : 1,
						ext : ['png', 'jpeg', 'jpg', 'avif'],
						on : {
						
							added,

							destroy(){
								external = null
							}
						}
					},

					clbk : function(s, p){
						external = p
					}
				})
			},
			share : function(){
				self.nav.api.load({
					open : true,
					href : 'socialshare2',
					history : true,
					inWnd : true,
					uid : "authorshare",
					essenseData : {
						caption : "Share this author",
						sharing : author.data.social(self.app),
						embedding : {
							type : 'channel',
							id : author.address
						},

						url : 'https://'+self.app.options.url+'/' + self.app.platform.api.authorlink(author.address, true)
					}
				})
			},
			up : function(){
				self.app.actions.scroll(0)
			},

			startchat: function(){
				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {

					self.app.platform.matrixchat.startchat(author.address)

				})
			},

			openwallet : function(){
				self.nav.api.go({
					open : true,
					href : self.app.mobileview ? 'wallet' : 'userpage?id=wallet',
					history : true,
					inWnd : self.app.mobileview
				})
			},

			videoCabinet : function(){
				self.nav.api.go({
					open : true,
					href : self.app.mobileview ? 'videoCabinet' : 'userpage?id=videoCabinet',
					history : true,
					inWnd : self.app.mobileview
				})
			},

			sendcoins : function(){
				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.ui.wallet.send({address : author.address}).catch(e => {})
				})
			},

			donate : function(){
				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.ui.wallet.donate({receiver : author.address}).catch(e => {})
				})
			},

			donatetrue : function(){
				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.ui.wallet.donate({receiver : author.address, donatemode : true}).catch(e => {})
				})
			},
			
			getPaidSubscription : function(){

				self.app.platform.sdk.user.stateAction(() => {
					self.app.nav.api.load({
						open : true,
						href : 'getpaidsubscription',
						inWnd : true,
						history : true,
	
						essenseData : {
							address : author.address,
						}
					})
				})
				
			},
			managePaidSubscription : function(){

				self.nav.api.go({
					open : true,
					href : 'managepaidsubscription',
					history : true,
					inWnd : true,
					essenseData : {
					}
				})
				
			},

			settings : function(){

				self.nav.api.go({
					open : true,
					href :'userpage?id=ustate',
					history : true,
				})
				
			},

			editprofile : function(){
				self.nav.api.go({
					open : true,
					href : self.app.mobileview ? 'test' : 'userpage?id=test',
					history : true,
					inWnd : self.app.mobileview,

					essenseData : {
						reloadOnly : true
					}
				})
			},

			showblocking : function(){
				load.blocking().then(addresses => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynoblocked') : self.app.localization.e('anoblocked')

					var ctext = self.app.localization.e('blockedusers')

					events.showuserslist(el.subscribes, addresses, etext, ctext)
				})
			},

			showsubscribes : function(){
				load.subscribes().then(({addresses, count}) => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowing') : self.app.localization.e('anofollowing')
					var ctext = self.app.localization.e('following')

					events.showuserslist(el.subscribes, addresses, etext, ctext, null, count)
				})
			},

			showsubscribers : function(){
				load.subscribers().then(({addresses, count}) => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowers') : self.app.localization.e('anofollowers')
					var ctext = self.app.localization.e('followers')

					events.showuserslist(el.subscribers, addresses, etext, ctext, null, count)
				})
			},

			showuserslist : function(_el, addresses, empty, caption, clbk, count){
				self.nav.api.load({

					open : true,
					id : 'userslist',
					animation : false,
					inWnd : true,
					history : true,
					essenseData : {
						addresses : addresses,
						empty : empty,
						caption : caption,
						sort : 'commonuserrelation',
						count
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})
			},

			unsubscribe : function(){

				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {

					new dialog({
						html : self.app.localization.e('e13022'),
						btn1text :  self.app.localization.e('unfollow'),
						btn2text : self.app.localization.e('ucancel') ,

						class : 'zindex',

						success : function(){

							self.app.platform.api.actions.unsubscribe(author.address, function(tx, err){

								if(tx){
									
								}
								else
								{
									self.app.platform.errorHandler(err, true)	
								}
			
							})

						}
					})

				})

				
			},

			subscribe : function(){
				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {

					self.app.platform.api.actions.subscribeWithDialog(author.address, function(tx, err){

						if(tx){
						}
						else
						{
							self.app.platform.errorHandler(err, true)
						}

					})

				})
			},

			notifications : function(){

				self.app.platform.sdk.user.stateAction(() => {

					var c = function(){
						self.app.platform.api.actions[f](author.address, function(tx, err){

							if(tx){
							}
							else
							{
								self.app.platform.errorHandler(err, true)
							}
	
						})
					}

					var me = self.app.platform.psdk.userInfo.getmy()

					var r = me ? me.relation(author.address, 'subscribes') : null

					self.app.mobile.vibration.small()

					var f = 'notificationsTurnOn'

					if(r.private == 'true' || r.private == '1' || r.private === true) {
						f = 'notificationsTurnOff'
					}

					if (f == 'notificationsTurnOff'){

						new dialog({
							html : self.app.localization.e('notificationsTurnOffQ'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
	
							class : 'zindex',
	
							success : function(){
	
								c()
	
							}
						})

					}

					else{
						c()
					}

					

				})
			},

			unblocking : function(){
				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.api.actions.unblocking(author.address, function(tx, error){
						if(!tx){
							self.app.platform.errorHandler(error, true)	
						}
					})
				})
			},

			blocking : function(){
				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.api.actions.blocking(author.address, function(tx, error){
						if(!tx){
							self.app.platform.errorHandler(error, true)	
						}
					})
				})
			},

			complain : function(){

				self.app.platform.sdk.user.stateAction(() => {
					self.nav.api.load({
						open : true,
						id : 'complain',
						inWnd : true,

						essenseData : {
							item : 'user',
							obj : author,

							success : function(){
								
							}
						},

						clbk : function(){
							
						}
					})

				})
			}

			
		}

		var renders = {

			post : function(id){
				if(!el || !el.c) return

				if (!id){

					if (openedpost){
						
						openedpost.clearessense()
						openedpost = null
					}

					el.c.find('.renderposthere').html('')

				}

				else{

					
					self.app.platform.papi.post(id, el.c.find('.renderposthere'), function(e, p){
						openedpost = p
					}, {
						video : true,
						showrecommendations : true,
						autoplay : true,
						nocommentcaption : true,
						r : 'recommended',
						openapi : false,
						opensvi : function(id){

							if (openedpost){
								openedpost.clearessense()
								openedpost = null
							}

							events.up()

							setTimeout(() => {
								el.c.find('.renderposthere').html('')

								renders.post(id)
	
								self.nav.api.history.addParameters({
									v : id
								})
							}, 400)
		
						}
					})
				}
			},

			randombg : function(clbk, tempcover){

				self.shell({
					name :  'bg',
					el :   el.bg,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					
					p.el.find('.share').on('click', events.share)

					p.el.find('.uploadwallpapper').on('click', events.uploadwallpapper)

					if(clbk) clbk()

					if (tempcover){

						p.el.find('.bgwallpaper').attr('image', tempcover)
						bgImages(p.el)

						return 
					}

					Circles({
						target: el.bg.find('.bgwallpaper')[0],
						quantity: 15,
						radius: {
							min: 2,
							max: 400
						},
						zIndex: {
							min: 0,
							max: 20
						},
						hue: {
							min: 0,
							max: 180
						},
						saturation: {
							min: 50,
							max: 100
						},
						light: {
							min: 25,
							max: 75
						},
						alpha: {
							min: 0.2,
							max: 0.8
						}
					})

					var me = self.app.platform.psdk.userInfo.getmy()

					if(!author.me) {
							
						var blocking = me ? me.relation(author.address, 'blocking') : null

						if (blocking){
							return
						}

					}

					self.app.platform.sdk.users.getCover(author.address).then(cover => {
						if(!cover){
							
						}
						else{
							p.el.find('.bgwallpaper').attr('image', cover)
							bgImages(p.el)
						}
					})

				})

				
			},

			uinfo: function(clbk){

				self.shell({
					name :  'uinfo',
					el :   el.uinfo,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					p.el.find('.toblockexplorer').on('click', function(){
						self.app.apps.openInWndById('app.pocketnet.blockexplorer', () => {}, hexEncode('address/'+ author.address))
					})

					p.el.find('.copyaddress').on('click', function(){
						copyText($(this))

						sitemessage(self.app.localization.e('successcopied'))
					})

					p.el.find('.ucaption').on('click', function(){
						$(this).closest('.uinfo').toggleClass('showall')
					})
					

					if(clbk) clbk()

				})
			},
			aucaption : function(clbk){

				self.shell({
					name :  'aucaption',
					el :   el.aucaption,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					p.el.find('.editprofile').on('click', events.editprofile)
					p.el.find('.showsubscribes').on('click', events.showsubscribes)
					p.el.find('.showsubscribers').on('click', events.showsubscribers)

					p.el.find('.copyname').on('click', function(){
						copyText($(this))
						sitemessage(self.app.localization.e('successcopied'))
					})

					if(clbk) clbk()

				})
			},

			fbuttonsrow: function(clbk){

				self.shell({
					name :  'fbuttonsrow',
					el :   el.fbuttonsrow,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){
					p.el.find('.editprofile').on('click', events.editprofile)
					p.el.find('.startchat').on('click', events.startchat)
					p.el.find('.openwallet').on('click', events.openwallet)
					p.el.find('.videoCabinet').on('click', events.videoCabinet)
					p.el.find('.sendcoins').on('click', events.sendcoins)
					p.el.find('.donate').on('click', events.donate)
					p.el.find('.settings').on('click', events.settings)
					p.el.find('.managePaidSubscription').on('click', events.managePaidSubscription)

					p.el.find('.follow').on('click', events.subscribe)
					p.el.find('.unsubscribe').on('click', events.unsubscribe)
					p.el.find('.notifications').on('click', events.notifications)
					p.el.find('.unblocking').on('click', events.unblocking)
					//metmenu

					p.el.find('.metmenu').on('click', function() {
						renders.metmenu($(this))
					})
					
					self.app.user.isState(function(state){
						if(state && !author.me){
							self.sdk.paidsubscription.getcondition(author.address).then(value => {
								if(value > 0){
									p.el.find('.getPaidSubscription').removeClass('hidden')
									p.el.find('.getPaidSubscription').on('click', events.getPaidSubscription)
								}
							})
						}
					})
					

					if(clbk) clbk()

				})
			},

			alentanavigation: function(clbk){

				if (self.app.television){
					if (clbk)
						clbk()
					return 
				}

				var current = currentLenta()

				self.shell({
					name :  'alentanavigation',
					el :   el.alentanavigation,
					data : {
						author : author,
						cstate,
						lentameta,
						current
					},
					insertimmediately : true,
				}, function(p){

					p.el.find('.truenav').on('click', function(){

						var id = $(this).attr('mid')

						if (id == current.id) return

						actions.gonav(id)

					})

					p.el.find('.searchIcon').on('click', function(){
						$(this).closest('.navisearchWrapper').toggleClass('searchActive')


						if($(this).closest('.navisearchWrapper').hasClass('searchActive')){
							acsearch.focus()
						}
					})


					var act = p.el.find('[mid="'+current.id+'"]')	



					_scrollTo(act, p.el.find('.naviscrollwrapper'), 0, 0, 'Left') 
			

					if (acsearch){
						acsearch.destroy()
						acsearch = null
					}

					acsearch = new search(p.el.find('.alSearchWrapper'), {
						placeholder : self.app.localization.e('e13140') + ' ' + author.data.name,

						clbk : function(_el){

						},

						last : {
							get : function(){

								return [];

							},

							tpl : function(result, clbk){
								
							}
						},

						right : isTablet(),

						events : {		
							active : function(){
								if(isMobile()){

									self.app.blockscroll = true

									_scrollTo(p.el.find('.searchIcon'), el.c.closest('.customscroll'), 0)

									setTimeout(() => {
										self.app.blockscroll = false
									}, 200)
								}
							},				
							search : function(value, clbk, e, helpers){

								var href = '';

								if (value.indexOf('#') > -1){

									

									var words = _.uniq(_.filter(value.replace(/#/g, '').split(wordsRegExp), function(r){
										return r
									}));

									href = '?ssat=' + words.join(' ')
								}
								else{
									href = '?ssa=' + value
								}


								try{
									actions.clearSearch(true)

									self.app.nav.api.history.removeParameters(cleanParameters())
	
									var p = {
										href : href,
										history : true,
										open : true,
										handler : true
									}	
	
									self.nav.api.go(p)
	
									if (clbk)
										clbk(true)
								}
								catch(e){
									console.error(e)
								}
								
								
							},

							clear : function(fs){
								p.el.find('.navisearchWrapper').removeClass('searchActive')

								actions.clearSearch()

							}
						}
						
					})


					if (parameters().ssa){
						acsearch.setvalue(parameters().ssa)
					}

					if (parameters().ssat){
						acsearch.setvalue('#' + _.map(parameters().ssat.split(wordsRegExp), (v) => {
							return '#' + v
						}).join(' '))
					}

					if(clbk) clbk()

				})
			},

			metmenu : function(_el){

				var d = {author};

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){

						return template(d);

					}, function(el, n, close){

						el.find('.complain').on('click', function(){
							events.complain()
							close()
						})

						el.find('.donate').on('click', function(){
							events.donatetrue()
							close()
						})

						el.find('.block').on('click', function(){
							events.blocking()
							close()
						})

						el.find('.startchat').on('click', function(){
							events.startchat()
							close()
						})
						
						el.find('.unblock').on('click', function(){
							events.unblocking()
							close()

						})

						el.find('.unsubscribe').on('click', function(){
							events.unsubscribe()
							close()
						})
						

					})

				}, d)

			},
			
			lenta : function(){

				if(modules.lenta) modules.lenta.destroy()

				var hr = 'authorn?address=' + author.address
				var n =  app.platform.api.name(author.address)
				if (n) hr = n.toLowerCase() + "?"

				var params = {
					author : author.address,
					byauthor : true,
					hr : hr,
					cancelsearch : function(){
						actions.clearSearch()
					},
					renderclbk : function(){

					},
					fixposition : true,
					canloadmorescroll : function(){

						if(openedpost) return false

						return true
					},

					//includeboost : !self.user.isItMe(author.address) && self.app.boost && !self.app.pkoindisable
				}

				var method = currentLenta()

				if (method.extend){
					method.extend(params)
				}


				el.lenta.html('')

				if(!author.reputationBlocked && !author.deleted){

					var monetizationPromise = (() => {return Promise.resolve(false)})()

					var monetizationStatic = /*!self.user.isItMe(author.address) && */!params.searchValue && !params.searchTags && !params.read && !params.audio && !params.video

					if (monetizationStatic) 
						monetizationPromise = self.app.platform.sdk.users.checkMonetization(author.address)


					monetizationPromise.then((m) => {

						params.includeboost = monetizationStatic && m

						self.nav.api.load({

							open : true,
							id : 'lenta',
							el : el.lenta,
							animation : false,
		
							mid : author.address,
							insertimmediately : true,
							essenseData : params,
							fade : el.lenta,
							
							clbk : function(e, p){
								modules.lenta = p;
							}
		
						})

					})
					
				}
				else{
					el.lenta.html('<div class="dummylenta"><i class="fas fa-dot-circle"></i></div>')
				}

			},

			whatsnew : function(clbk){

				if(author.me && !self.app.mobileview && !self.app.television){
					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.whatsnew,
						animation : false,
						insertimmediately : true,
						mid : 'shareauthor',
						
						clbk : function(e, p){
	
							modules.share = p

							if(clbk) clbk()
						},
						essenseData : {
							minimized : true,
							post : function(){
								
							}
						}
					})
				}

				

			
			},

			blocking : function(clbk){

				if (!author.me){
					el.blocking.html('')
					el.blocking.removeClass('active')
				}
				else{
					

					self.shell({
						name :  'blockinglabel',
						el :   el.blocking,
						data : {
							
						},
						insertimmediately : true,
					}, function(p){

						el.blocking.addClass('active')
						
						p.el.find('.showblocking').on('click', events.showblocking)

					})


					/*load.blocking().then(addresses => {

						var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynoblocked') : self.app.localization.e('anoblocked')
						
						var ctext = self.app.localization.e('blockedusers')
	
						renders.userslist(el.blocking, addresses, etext, ctext, clbk, 'blocking')
	
					})*/
				}
				
			},


			subscribes : function(clbk){
				load.subscribes().then(({addresses, count}) => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowing') : self.app.localization.e('anofollowing')
					var ctext = self.app.localization.e('following')

					renders.userslist(el.subscribes, addresses, etext, ctext, clbk, 'subscribes', count)
				})
			},

			subscribers : function(clbk){
				load.subscribers().then(({addresses, count}) => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowers') : self.app.localization.e('anofollowers')
					var ctext = self.app.localization.e('followers')


					renders.userslist(el.subscribers, addresses, etext, ctext, clbk, 'subscribers', count)
				})
			},

			userslist : function(_el, addresses, empty, caption, clbk, mid, count){

				if (modules['userlist' + mid]){
					modules['userlist' + mid].destroy()
					modules['userlist' + mid] = null
				}

				self.nav.api.load({

					open : true,
					id : 'userslist',
					mid : mid,
					el : _el,
					animation : false,
					
					essenseData : {
						addresses : addresses,
						empty : empty,
						caption : caption,
						sort : 'random',
						preview : true,
						count
					},
					
					clbk : function(e, p){

						modules['userlist' + mid] = p

						_el.addClass('active')

						if (clbk)
							clbk(e, p)
					}

				})
			},

			upbutton : function(){
				if(upbutton) upbutton.destroy()

				if(isMobile() || self.app.television) return

				if (el.c)
					upbutton = self.app.platform.api.upbutton(el.up, {
						top : function(){
		
							return '65px'
						},
						class : 'light',
						rightEl : el.c.find('.leftpanelcell')
					})
			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var relationsClbk = function(address){

			if (address == author.address){

				author.data = self.psdk.userInfo.get(author.address)

				if(!self.app.mobileview){
					renders.subscribes()
					renders.subscribers()
					renders.blocking()
				}

				


				renders.fbuttonsrow()
				renders.aucaption()
			}
		}

		var initEvents = function(){
			
			self.app.psdk.updatelisteners.authorn = self.app.platform.actionListeners.authorn = function({type, alias, status}){

				if(type == 'blocking' || type == 'unblocking'){

					author.data = self.psdk.userInfo.get(author.address)
					
					renders.randombg()
				}

				if(
					type == 'unblocking' || 
					type == 'blocking' || 
					type == 'subscribe' || 
					type == 'unsubscribe' || 
					type == 'subscribePrivate'){

					relationsClbk(alias.address.v)
					relationsClbk(alias.actor)

				}

				if(type == 'userInfo'){

					if(alias.address == author.address){

						author.data = self.psdk.userInfo.get(author.address)

						renders.aucaption()
						renders.uinfo()

					}
					
				}

				if (type == 'accDel'){

					if(alias.address == author.address){

						author.data = self.psdk.userInfo.get(author.address)

						renders.aucaption()
						renders.uinfo()

					}

				}
				
			}
			
		}

		var redir = function(page){

			window.rifticker.add(() => {
				self.app.el.html.removeClass('allcontent')
				self.app.mobile.statusbar.background()
			})

			if (page){
				self.app.nav.api.load({
					open : true,
					href : page,
					history : page == 'page404' ? false : true,
					replaceState : true,
					fade : self.app.el.content
				})
			}
			
		}

		var get = function(address, clbk){

			author = {}

			self.sdk.users.addressByName(address, function(address){
				if(!address){
					return redir('page404')
				}
	
				author.address = address
	
				self.sdk.users.get(author.address, function(){
					author.deleted = typeof self.app.platform.sdk.user.deletedaccount != 'undefined' ? self.app.platform.sdk.user.deletedaccount(author.address) : false
	
					author.data = self.psdk.userInfo.get(author.address)
					author.me = self.app.user.isItMe(author.address)

					author.reputationBlocked = self.app.platform.sdk.user.reputationBlocked(address)

					//var me = self.app.platform.psdk.userInfo.getmy()

					if(
						!author.data
					){
						return redir(author.me ? 'userpage?id=test' : 'page404')
					}

	
					if(
						author.reputationBlocked && author.me
					){
						return redir('userpage?id=test')
					}

					clbk()
					
				}, true)
			})

			
		}

		var init = function(){
			renders.aucaption()
			renders.fbuttonsrow()
			renders.uinfo()
			renders.whatsnew()
			renders.alentanavigation()
			renders.lenta()
			renders.randombg()

			if(!self.app.mobileview){
				renders.subscribes()
				renders.subscribers()
				renders.blocking()
			}

			renders.upbutton()
		}
		
		var destroy = function(){
			_.each(modules, (m) => {
				m.destroy()
			})

			modules = {}
			lastscroll = 0;
			result = null
			fixedBlock = null
		}

		return {
			primary : primary,

			parametersHandler : function(){

				var address = parameters().address

				if (address && author.address != address){

					get(address, () => {
						destroy();
						init();
					})

				}
				else{
					
					renders.lenta()
					renders.alentanavigation()

					if (openedpost)
						actions.backtolenta()
				}
				

			},

			authclbk : function(){

			},

			getdata : function(clbk, p){

				window.rifticker.add(() => {
					self.app.el.html.addClass('allcontent')
					self.app.mobile.statusbar.topfadebackground()
				})

				ed = p.settings.essenseData

				var data = {
					ed
				};


				get(parameters().address || ed.address || self.app.user.address.value || '', () => {

					data.author = author

					clbk(data);
				})

			},

			destroy : function(href){

				destroy()

				if (acsearch){
					acsearch.destroy()
					acsearch = null
				}
				
				if (upbutton){
					upbutton.destroy()
					upbutton = null
				}

				if (upbackbutton){
					upbackbutton.destroy()
					upbackbutton = null
				}

				if (external) 
					external.destroy()

				if (href != 'author') {
					self.app.el.html.removeClass('allcontent')
					self.app.mobile.statusbar.background()
				}

				delete self.app.platform.actionListeners.authorn

				if (el.c) el.c.empty()

				ed = {};
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.aucaption = el.c.find('.aucaptionWr')
				el.fbuttonsrow = el.c.find('.fbuttonsrow')
				el.uinfo = el.c.find('.uinfoWr')
				el.whatsnew = el.c.find('.whatsnew')
				el.alentanavigation = el.c.find('.alentanavigation')
				el.lenta = el.c.find('.lentawrapper')
				el.up = el.c.find('.upbuttonwrapper');
				el.w = self.app.el.window;
				el.bg = el.c.find('.bgwallpaperWrapper')
				el.subscribes = el.c.find('.subscribes')
				el.subscribers = el.c.find('.subscribers')
				el.blocking = el.c.find('.blocking')
				el.upbackbutton = el.c.find('.upbackbuttonwrapper')

				if(!self.app.user.isItMe(author.address))
					self.sdk.activity.adduser('visited', author.address)

				initEvents();
				init()

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

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = authorn;
}
else{

	app.modules.authorn = {};
	app.modules.authorn.module = authorn;

}