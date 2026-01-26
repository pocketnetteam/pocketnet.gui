var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {};


		var roller = null, lenta = null, share = null, panel,leftpanel, uptimer = null, leftparallax = null;

		var videomain = false,
			readmain = false,
			audiomain = false

		var upbutton = null, upbackbutton = null, plissing = null, searchvalue = '', searchtags = null, result, fixedBlock, openedpost = null;

		var currentMode = 'common', hsready = false, fixeddirection = null, external = null, externalsearchusers = null;

		var lastscroll = 0

		var addbuttonShowed = false

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var lastStickyRefresh = 0

		var modes = [
			{
				link : 'index',
				label : () => self.app.localization.e('e13136'),
				value : 'index',
				savesearch : true
			},

			{
				link : 'index?r=sub',
				label : () => self.app.localization.e('e13137'),
				value : 'sub',
				if : function(){
					return self.app.user.getstate() && !self.app.platform.sdk.user.myaccauntdeleted()
				}
			},
			
			{
				link : "index?video=1",
				label : () => self.app.localization.e('video'),
				value : 'video',
				savesearch : true
			},
			{
				link : "index?read=1",
				label : () => self.app.localization.e('longreads'),
				value : 'read',
				savesearch : true
			},
			{
				link : "index?audio=1",
				label : () => self.app.localization.e('audio'),
				value : 'audio',
				savesearch : true
			},

			{
				link : "index?r=saved",
				label : () => self.app.localization.e('saved'),
				if : function(){
					return self.app.savesupported() || self.app.savesupportedForBrowser()
				},
				value : 'saved'
			},

			{
				link : "index?r=recommended",
				label : () => self.app.localization.e('discussed'),
				value : 'recommended'
			},
			
			{
				link : "index?r=best",
				label : () => self.app.localization.e('e13138'),
				value : 'best'
			},

			{
				link : "home",
				label : () => self.app.localization.e('miniapps'),
				value : 'miniapps'
			},

			{
				link : "index?r=jury",
				label : () => self.app.localization.e('jury'),
				value : 'jury',
				if : function(){
					return app.platform.sdk.user.isjury()
				}
			},
		]
		
		var actions = {

			currentModeKey : function(){

				var pss = parameters()

				var r = pss.r || 'index'
				var video = pss.video || self.app.television || false
				var read = pss.read || false
				var audio = pss.audio || false

				if(video) r = 'video'
				if(read) r = 'read'
				if(audio) r = 'audio'

				console.log('currentModeKey', r)

				return r
			},

			selector : function(){

				var _modes = _.filter(modes, (m) => !m.if || m.if())

				var links = {

					index : "index",
		
					sub : "index?r=sub",
		
					recommended : "index?r=recommended",

					best : "index?r=best",

					video : "index?video=1",

					read : "index?read=1",

					audio : "index?audio=1"
				}

				if (self.app.savesupported() || self.app.savesupportedForBrowser()) {
					links.saved = "index?r=saved"
				}

				var r = actions.currentModeKey()

				var value = _.find(_modes, (m) => m.value == r)

				console.log('actions.currentModeKey', r ,value)

				return {
					value : value ? value.value : null,
					modes : _modes
				};

			},
			
			refreshSticky : function(alv){

				var ns = self.app.lastScrollTop

				if(!hsready) initstick()

				if (hsready && (ns != lastStickyRefresh || alv)){

					lastStickyRefresh = ns

				
				}
					
			},

			addbutton : function(){
				self.app.Logger.info({
					actionId: 'POST_CREATING_STARTED',
					actionSubType: 'FROM_SCROLL_BUTTON',
				});

				self.app.platform.ui.share()
			},

			addbuttonscroll  : function(){

				if (self.app.lastScrollTop > 1200){
					if(!addbuttonShowed)
						el.addbutton.addClass('scrollactive')

					addbuttonShowed = true
				}
				else{

					if (addbuttonShowed)
						el.addbutton.removeClass('scrollactive')

					addbuttonShowed = false
				}
			},

			currentMode : function(){

				if(currentMode == 'recommended'){

					self.nav.api.history.addParameters({
						r : 'recommended'
					})

				}
				else{

					if(currentMode == 'sub'){

						self.nav.api.history.addParameters({
							r : 'sub'
						})

					}
					else{
						self.nav.api.history.removeParameters(['r'])
					}
				}

				self.nav.api.changedclbks()

				renders.lentawithsearch()

				makeShare()

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
				renders.upbutton()
				actions.refreshSticky()
				renders.post(null)
				
				setTimeout(() => {
					el.c.removeClass('opensvishowed')
				}, 300)

				setTimeout(() => {
					el.c.removeClass('opensvishowedWillremoved')
				}, 350)

				
				self.nav.api.changedclbks()

				if(lenta && lenta.update) lenta.update()
			}	
		}

		var events = {

			
			currentMode : function(){
				currentMode = $(this).attr('lenta')

				actions.currentMode()
			},
			panelPosition : function(){
				actions.panelPosition()
			},

			up : function(){
				self.app.actions.scroll(0)
			}

		}

		var makenext = function(type, start, count, clbk){

			var l = result[type].data.length;
			var L = result[type].count

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

				else
				{
					renders[type](data)
				}

			}, start, count)	

		}

		var load = {
			posts : function(clbk, start, count){

				

				self.app.platform.sdk.search.get(searchvalue, self.app.television ? 'videos' : 'posts', start, count, fixedBlock, function(r){

					clbk(r.data);

				})
			},
		}

		var renders = {
			menuapply : function(){
				var {value, modes} = actions.selector()

				var fmode = 'filters'

				if(searchvalue || searchtags) fmode = 'search'
				if(currentMode != 'common') fmode = 'settings'
				if(currentMode == 'saved') fmode = 'none'
				if(currentMode == 'sub') fmode = 'none'

				el.menu.attr('fmode', fmode)
				el.menu.find('.mode').removeClass('active')

				var act = el.menu.find('.mode[mode="'+value+'"]')

				act.addClass('active')

				setTimeout(() => {
					if(el.menu)
						_scrollTo(act, el.menu.find('.modes'), 0, 0, 'Left') 
				}, 50)
				

			},
			menu : function(){

				var {value, modes} = actions.selector()

				self.app.user.isState(function(state){

					//videomain && !readmain && !searchvalue && !searchtags


					self.shell({

						name :  'menu',
						el :   el.menu,
						data : {
							state : state,
							mobile : isMobile(),
							tagsExcluded : self.app.platform.sdk.categories.gettagsexcluded().length,
							tagsSelected : self.app.platform.sdk.categories.gettags().length,
							tags : self.app.platform.sdk.categories.gettags(),
							value, modes,

							searchenabled : searchvalue || searchtags
						},

					}, function(_p){

						el.menu.find('.showcategories').on(clickAction(), function(){

							var mainmoduleAction = deep(self.app, 'modules.main.module.showCategories')
			
							if (mainmoduleAction) mainmoduleAction(true)
						})

						el.menu.find('.mode').on('click', function(){
							var link = $(this).attr('link')
							var savesearch = $(this).attr('savesearch')

							self.nav.api.load({
								open : true,
								href : link,
								history : true,
								handler : true,
								saveparameters : savesearch ? ['sst', 'st', 'ss'] : null
							})
						})

						el.menu.find('.selectwrapper').on('click', function(){

							var items = []
							var searchenabled = searchvalue || searchtags

							_.each(modes, function(a){

								if(searchenabled && !a.savesearch) return

								items.push({
									text : a.label(),
									action : function (clbk) {

				
										self.nav.api.load({
											open : true,
											href : a.link,
											history : true,
											handler : true,
											replace : true,
											saveparameters : a.savesearch ? ['sst', 'st', 'ss'] : null
										})

										d.destroy()

										return true
				
									}
								})
							})
				
							var d = menuDialog({
								items: items
							})
						})

						renders.menuapply()
						
					})
					
				})
				
			},

			addpanel : function(){

				self.app.user.isState(function(state){
					if(state && el.addbutton){

						if(state && !isMobile()){
							el.addbutton.addClass('active')
						}
						else
						{
							el.addbutton.removeClass('active')
						}

					}
				})
			},

			
			share : function(){

				if (!isMobile() && !videomain && !readmain && !audiomain && !searchvalue && !searchtags && !app.platform.sdk.user.myaccauntdeleted() && !self.app.television){

					//el.c.removeClass('wshar')

					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.share,
						animation : false,

						mid : 'sharemain',
						
						clbk : function(e, p){

							share = p

							actions.refreshSticky()

						},
						essenseData : {
							minimized : true,
							post : function(){
								if (plissing)
									plissing.destroy()
							}
						}

					})
					
				}else{
					//el.c.addClass('wshar')
				}
			},

			searchusers: function (show) {

				if(!el.searchusers) return
				
				if (show){
					window.rifticker.add(() => {
						el.searchusers.removeClass('hidden')
					})

					if (externalsearchusers) {
						externalsearchusers.clearessense()
					}
					
					self.app.platform.papi.horizontalSearchUsers(el.searchusers.find('.wrpcn'), function (e,p) {

						externalsearchusers = p
						actions.refreshSticky()

					}, {
						caption : self.app.localization.e("horizontalSearchUsers"),
						count : 20,
						value : searchvalue,
						loaded : function(users = []){

							if (!users.length && el.searchusers){

								window.rifticker.add(() => {
									el.searchusers.addClass('hidden')

									if (externalsearchusers){
										externalsearchusers.destroy()
										externalsearchusers = null
									}
								})
								
							}
							
						}
	
					})
				}

				else{

					if (externalsearchusers){
						externalsearchusers.destroy()
						externalsearchusers = null
					}

					if(el.searchusers){
						window.rifticker.add(() => {
							el.searchusers.find('.wrpcn').html('')
							el.searchusers.addClass('hidden')
						})
					}
					
				}

				
			},

			topvideos: function (show) {

				if(!el.topvideos) return
				
				if (show){
					window.rifticker.add(() => {
						el.topvideos.removeClass('hidden')
					})

					if (external) {
						external.clearessense()
					}
					
					self.app.platform.papi.horizontalLenta(el.topvideos.find('.wrpcn'), function (e,p) {

						external = p
						actions.refreshSticky()

					}, {
						caption : self.app.localization.e("Top videos") ,
						video: true,
						r : 'hot',
						loaderkey : 'best',
						shuffle : true,
						period : '4320',
						filterTopAuthors : true,
						page : 0,
						count : 10,
						openPostInWindowMobile : true,
						afterload : function(ed, s, e){

							if(e || !s.length) return

							ed.page++
						},
						ended : function(s){

							if(!s.length) return true

								return false

						},
						hasshares : function(shares){


							if (shares.length <= 2 && el.topvideos){

								window.rifticker.add(() => {
									el.topvideos.addClass('hidden')

									if(external){
										external.destroy()
										external = null
									}
								})
								
							}
							
						},
	
						opensvi : null,
						compact : true
	
					})
				}

				else{

					if (external){
						external.destroy()
						external = null
					}

					if(el.topvideos){
						window.rifticker.add(() => {
							el.topvideos.find('.wrpcn').html('')
							el.topvideos.addClass('hidden')
						})
					}
					
				}

				
			},

			leftpanel: function(){
				if (leftpanel && leftpanel.update){
					leftpanel.update()
				}
				else{
					self.nav.api.load({

						open : true,
						id : 'leftpanel',
						el : el.leftpanel,
						animation : false,
	
						essenseData : {
						
							renderclbk : function(){
								actions.refreshSticky(true)
							},
	
							changed : function(){
								renders.lentawithsearch()
							},
	
							close : function(){
								showCategories(false)
							}
						},
						clbk : function(e, p){
	
							leftpanel = p;
	
						}
	
					})
				}
				
					

				
			},

			panel : function(){

				if (videomain && !isMobile() || panel) return

					self.nav.api.load({

						open : true,
						id : 'panel',
						el : el.panel,
						animation : false,

						essenseData : {
						
							renderclbk : function(){
								actions.refreshSticky(true)
		
							}
						},
						clbk : function(e, p){

							panel = p;
							
						}

					})
			},

			lentawithsearch : function(clbk, p){

				if(searchvalue || searchtags){
					if (searchvalue){
						self.app.platform.sdk.activity.addsearch(searchvalue)

						self.app.platform.sdk.search.get(searchvalue, self.app.television ? 'videos' : 'posts', 0, 10, null, function(r, block){

							fixedBlock = block
	
							result = {
								posts : r
							};
	
							renders.lenta(clbk, p)
						})

						return
					}

					if (searchtags){

						result = {}
						fixedBlock = null

						renders.lenta(clbk, p)

						var val = _.map(searchtags, function(w){return '#' + w}).join(' ')

						self.app.platform.sdk.activity.addtagsearch(val)

						return
					}
				}


				renders.lenta(clbk, p)

			},

			lenta : function(clbk, p){

				if(!p) p = {};

				var loader = null
				var fp = false

				if (lenta) {
					lenta.clearessense()
				}

				renders.addpanel();

				if(searchvalue){
					loader = function(clbk){
						var _clbk = function(shares){

							shares = _.filter(shares, (s) => {return s})

							self.app.psdk.share.insertFromResponseSmall(shares)

							var shares = self.app.psdk.share.gets(_.map(shares, (s) => {
								return s.txid
							}))
							

							if (clbk)
								clbk(shares, null, {
									count : 10
								})
						}

						if(!fp){

							fp = true

							_clbk(result.posts.data)

						}

						else
						{
							makenext('posts', result.posts.data.length, 10, function(data){
								_clbk(data)
							})
						}
					}
				}

				self.app.user.isState(function(state){


					var mode = actions.currentModeKey()

					self.nav.api.load({
						open : true,
						id : 'lenta',
						el : el.lenta,
						animation : false,

						mid : 'main',
						insertimmediately : true,
						essenseData : {
							hr : 'index?',
							goback : p.goback,
							searchValue : searchvalue || null,
							search : searchvalue || searchtags ? true : false,
							searchTags : searchtags,
							read : readmain,
							audio : audiomain,
							video :  videomain && (!isMobile() || self.app.television),
							videomobile : videomain && isMobile() && !self.app.television,
							observe : searchvalue || searchtags ? null : mode,
							page : 0,
							fixposition : true,

							//recommendedUsers : self.app.mobileview,
							//recommendedUsersCount : self.app.mobileview ? 15 : 3,

							includerec : state && !searchvalue && !searchtags && (mode == 'index' /*|| mode == 'video' || mode == 'read'*/) ? true : false,
							includesub : !searchvalue && !searchtags && (mode == 'index' /*|| mode == 'video' || mode == 'read'*/) ? true : false,
							includeboost : !audiomain && !searchvalue && !searchtags && self.app.boost && !self.app.pkoindisable && mode != 'jury',

							//optimize : self.app.mobileview,
							extra : (self.app.test || self.app.platform.istest()) && state && isMobile() ? [
								{
									key : 'recommendedusers',
									position : rand(1,2),
									essenseData : () => {
										return {
											recommendedUsersCount : 15,
											usersFormat : 'usersHorizontal'
										}
									}
								}
							] : [],

							cancelsearch : function(){
								var backlink = 'index'

								if (parameters().video || self.app.television) backlink = 'index?video=1'
								if (parameters().read && !self.app.television) backlink = 'index?read=1'
								if (parameters().audio && !self.app.television) backlink = 'index?audio=1'


								self.nav.api.load({
									open : true,
									href : backlink,
									history : true,
									handler : true
								})
							},

							afterload : function(ed, s, e){

								if(!isMobile()) return

								if(e || !s.length) return

								ed.page++
							},

							canloadmorescroll : function(){

								if(openedpost) return false

								return true
							},
							
							opensvi : function(id){

								lastscroll = self.app.lastScrollTop

								events.up()

								window.rifticker.add(() => {
								
									el.c.addClass('opensvishowed')

									/*setTimeout(() => {
										
									}, 500)*/

								})

								setTimeout(() => {

									if (upbutton) upbutton.destroy()
								
									if (upbackbutton) upbackbutton.destroy()

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

									renders.post(id, function(){
										el.c.addClass('opensvishowedend')
									})

									self.nav.api.history.addParameters({
										v : id
									})

									self.nav.api.changedclbks()
									
								}, 400)
							},

							renderClbk : function(){
								actions.refreshSticky()
							},
							loader : loader
						},
						clbk : function(e, p){

							renders.upbutton()

							actions.refreshSticky()

							lenta = p

							if (clbk)
								clbk()

						}

					})

				})

			},

			upbutton : function(){
				if(upbutton) upbutton.destroy()

				if(isMobile()) return

				if(el.c)

					upbutton = self.app.platform.api.upbutton(el.up, {
						top : function(){
							return '65px'
						},
						rightEl : el.c.find('.leftpanelcell')
					})	
			},

			post : function(id, clbk){

				if(!el || !el.c) {
					if(clbk) clbk()

						return
				}

				if (!id){

					if (openedpost){
						
						openedpost.clearessense()
						openedpost = null
					}

					el.c.find('.renderposthere').html('')

					if(clbk) clbk()

				}

				else{

					
					self.app.platform.papi.post(id, el.c.find('.renderposthere'), function(e, p){
						openedpost = p

						if(clbk) clbk()
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
			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initstick = function(){
			return
		
		}

		var initEvents = function(){

			
			self.app.platform.sdk.categories.clbks.excluded.topmenumobile =
			self.app.platform.sdk.categories.clbks.tags.topmenumobile =
			self.app.platform.sdk.categories.clbks.selected.topmenumobile = renders.menu

			self.app.events.scroll.main = actions.addbuttonscroll

			el.c.find('.backtolenta').on('click', actions.backtolenta)

			el.addbutton.on('click', actions.addbutton)

			el.c.find('.barteronbutton button').on('click', function(){

				console.log('asd')

				self.nav.api.go({
					open : true,
					href : 'application?id=barteron.pocketnet.app',
					history : true
				})
			})

			if(!self.app.mobileview){

				if(!videomain) initstick()
			}
			else{


				if(leftparallax) leftparallax.destroy()
				
				leftparallax = new SwipeParallaxNew({

					el : el.c.find('.leftpanelcell'),

					allowPageScroll : 'vertical',
	
					directions : {
						right : {
							cancellable : true,				
							basevalue : function(){
								return - 0.9 * (self.app.width || self.app.el.window.width())
							},

							positionclbk : function(px){
							},

							restrict : true,
							trueshold : 30,
							clbk : function(){

								showCategories(false)

							}
	
						}
					}
					
	
				}).init()
				
			}

			

		}

		var makePanel = function(){

			if(!isMobile()){ renders.panel(); }
				
			renders.leftpanel();

			renders.addpanel();
		}

		var makeShare = function(){

			self.app.user.isState(function(state){
				if(state){

					if(!isMobile()){

						if (currentMode == 'common')
						{
							renders.share()
							window.rifticker.add(() => {
								el.c.find('.bgCaption').removeClass('hidden')
							})
						}
						else
						{
							window.rifticker.add(() => {
								el.share.html('')
								el.c.find('.bgCaption').addClass('hidden')
							})
						}

					}
				}

			})
			
			
		}

		var make = function(clbk, p){

			try {
				localStorage['lentakey'] = parameters().r || 'index'
			
				if (parameters().video || self.app.television){
					localStorage['lentakey'] = 'video'
				}

				if (parameters().read && !self.app.television){
					localStorage['lentakey'] = 'read'
				}

				if (parameters().audio && !self.app.television){
					localStorage['lentakey'] = 'audio'
				}
			}
			catch (e) { }

			

			renders.lentawithsearch(clbk, p)

			makeShare()

			makePanel()

			renders.menu()
			renders.topvideos(currentMode == 'common' && !videomain && !readmain && !audiomain && !searchvalue && !searchtags)
			renders.searchusers(currentMode == 'common' && !videomain && !readmain && !audiomain && searchvalue && !searchtags)
		}

		var showCategories = function(t){
			if (el.c){
				self.app.mobile.vibration.small()

				if (t){
					el.c.addClass('leftshowed')
					
					//setTimeout(self.app.actions.offScroll, 300)
				}
				else{
					el.c.removeClass('leftshowed')
					//setTimeout(self.app.actions.onScroll, 300)
				}
				
			}

			if(!t){
				if(!self.app.actions.getScroll()){
					self.app.mobile.reload.initparallax()
				}
			}
			else{
				self.app.mobile.reload.destroyparallax()
				
			}
		}
		
		return {
			primary : primary,

			parametersHandler : function(clbk){

				var tgsi = decodeURI(parameters().sst || '')

				var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
					return r
				}));

				var nsearchtags = words.length ? words : null
				var nsearchvalue = parameters().ss || ''
				var ncurrentMode = parameters().r || 'common';

				var nlentakey = parameters().video ? 'video' : parameters().read ? 'read' : parameters().audio ? 'audio' : (parameters().r || 'index')

				if(self.app.television){
					nlentakey = 'video'
				}

				self.app.Logger.info({
					actionId: 'SELECT_FEED_SECTION',
                    actionValue: nlentakey,
				});

				var nvideomain = nlentakey == 'video'
				var nreadmain = nlentakey == 'read'
				var naudiomain = nlentakey == 'audio'
				var page = parameters().page

				var changes = false

				try {
					localStorage['lentakey'] = nlentakey
				}
				catch (e) { }

				

				if (currentMode != ncurrentMode){
					currentMode = ncurrentMode; changes = true
				}

				if (videomain != nvideomain){
					videomain = nvideomain; changes = true
				}

				if (readmain != nreadmain){
					readmain = nreadmain; changes = true
				}

				if (audiomain != naudiomain){
					audiomain = naudiomain; changes = true
				}

				if (searchvalue != nsearchvalue){
					searchvalue = nsearchvalue; changes = true
				}

				if (searchtags != nsearchtags){
					searchtags = nsearchtags; changes = true
				}

				if(page) changes = true

				if (videomain){

					if (el.c)
						el.c.addClass('videomain')

					if(!parameters().v){
						actions.backtolenta()
					}
				}
				else{
					
					if (el.c)
						el.c.removeClass('videomain')

					actions.backtolentaClear()
				}


				if (changes){


					if (external) {
						external.clearessense()
						external = null
					}

					if (externalsearchusers) {
						externalsearchusers.clearessense()
						externalsearchusers = null
					}

					renders.topvideos(currentMode == 'common' && !videomain && !readmain && !audiomain && !searchvalue && !searchtags)

					renders.searchusers(currentMode == 'common' && !videomain && !readmain && !audiomain && searchvalue && !searchtags)

					if (lenta) {
						lenta.clearessense()
						lenta = null
					}
	
					renders.lentawithsearch()

					makePanel()
					makeShare()

					renders.menuapply()

					actions.refreshSticky()

					if (clbk)
						clbk()
				}

				
				if (lenta) {
					lenta.hideshowedvideo()
				}

			},

			

			authclbk : function(){

				if(typeof el != 'undefined' && el.c){

					el.c.find('.bgCaption').removeClass('hidden')

					makeShare()

					actions.refreshSticky()
				}
				
			},

			getdata : function(clbk, p){

				hsready = false;

				var _s = parameters()

				if (_s.r){
					currentMode = _s.r
				}
				else{
					currentMode = 'common'
				}

				beginmaterial = _s.s || _s.i || _s.v || null;

				if((!beginmaterial && !_s.ss && !_s.sst && !p.state && (/*self.app.mobileview || window.cordova ||*/ self.app.platform.matrixchat.connectWith))){
					
					self.nav.api.load({
						open : true,
						href : 'welcome',
						history : true,
						replaceState : true,
						fade : self.app.el.content,
					})

					return
				}

				if(self.app.curation()){
					
					self.nav.api.load({
						open : true,
						href : 'userpage?pc=1',
						history : true,
						replaceState : true,
						fade : self.app.el.content
					})

					return
				}

				if((_s.v || _s.s) && (isMobile())){

					/*self.nav.api.load({
						open : true,
						href : 'post?s=' + (_s.v || _s.s) + (_s.commentid ? '&commentid=' + _s.commentid : ''),
						history : true,
						replaceState : true,
						fade : self.app.el.content
					})

					return */
				}

				if(p.state && primary && !self.app.user.validate()){

					self.nav.api.load({
						open : true,
						href : 'userpage?id=test',
						history : true,
						replaceState : true,
						fade : self.app.el.content
					})

					return
				}
				
				var data = {
					
				};
			
		
				clbk(data);
				

			},

			destroy : function(){


				showCategories(false)

				delete self.app.events.scroll.main
				delete self.app.events.resize.mainpage

				renders.post(null)

				hsready = false

				//searchvalue = '', searchtags = null

				if (leftparallax) {
					leftparallax.destroy()
					leftparallax = null
				}

				if (plissing)
					plissing.destroy()

				if (upbutton)
					upbutton.destroy()

					upbutton = null

				if (upbackbutton)
					upbackbutton.destroy()

					upbackbutton = null
				
				if (roller)
					roller.destroy()


				if (lenta){
					lenta.destroy()
				}

				if (share){
					share.destroy()
				}

				if (panel){
					panel.destroy()
				}

				if (openedpost){
					openedpost.clearessense()
					openedpost = null
				}

				if (external){
					external.clearessense()
					external = null
				}

				if (externalsearchusers){
					externalsearchusers.clearessense()
					externalsearchusers = null
				}

				

				if (leftpanel){
					leftpanel.destroy()
					leftpanel = null
				}

				lastscroll = 0
				leftpanel = null
				panel = null
				roller = null
				lenta = null
				share = null
				videomain = false
				fixeddirection = null
				addbuttonShowed = false

				delete self.app.platform.sdk.categories.clbks.tags.topmenumobile
				delete self.app.platform.sdk.categories.clbks.selected.topmenumobile
				delete self.app.platform.sdk.categories.clbks.excluded.topmenumobile

				if(el.c) el.c.empty()

				el = {}
				
				if (self.app.scrolling){
	
					_.each(self.app.scrolling.clbks, function(c){
						c(0)
					})
	
				}

			},

			showCategories : function(show){

				showCategories(show)
			},
			
			init : function(p){

				roller = null
				lenta = null
				fixeddirection = null
				lastStickyRefresh = 0

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.lenta = el.c.find('.lentaWrapper');
				el.lentacell =  el.c.find('.lentacell')
				el.panel = el.c.find('.panel');
				el.leftpanel = el.c.find('.leftpanel');
				el.up = el.c.find('.upbuttonwrapper')
				el.upbackbutton = el.c.find('.upbackbuttonwrapper')
				el.addbutton = el.c.find('.addbutton')
				el.slwork = el.c.find('.maincntwrapper >div.work')
				el.topvideos = el.c.find('.topvideosWrapper')
				el.searchusers = el.c.find('.searchusersWrapper')
				el.menu = el.c.find('.menuwrapper')

				//self.app.el.footer.addClass('workstation')

				initEvents();

				if(!p.goback){
					searchvalue = parameters().ss || ''

					var tgsi = decodeURI(parameters().sst || '')

					var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
						return r
					}));

					searchtags = words.length ? words : null

					fixedBlock = null
					result = {}
				}

				videomain = (parameters().video || self.app.television) ? true : false
				
				readmain = (parameters().read && !self.app.television) ? true : false

				audiomain = (parameters().audio && !self.app.television) ? true : false

				if(readmain) {
					videomain = false
					audiomain = false
				}
				if (audiomain) {
					readmain = false
					videomain = false
				}

				if(videomain && (!isMobile() || self.app.television)){
					window.rifticker.add(() => {
						el.c.addClass('videomain')
					})
				}

				make(function(){
					p.clbk(null, p);
				}, p)

				
				
			}
		}
	};

	self.showCategories = function(sh){
		_.each(essenses, function(essense){

			essense.showCategories(sh);

		})
	}

	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		var d = null;

		_.each(essenses, function(essense){

			var _d = essense.destroy();

			if (_d) d = _d;

		})

		return d;

	}

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = main;
}
else{

	app.modules.main = {};
	app.modules.main.module = main;

}