var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var roller = null, lenta = null, share = null, panel,leftpanel, uptimer = null;

		var videomain = false

		var upbutton = null, upbackbutton = null, plissing = null, searchvalue = '', searchtags = null, result, fixedBlock, openedpost = null;

		var currentMode = 'common', hsready = false, fixeddirection = null, external = null;

		var lastscroll = 0


		var wordsRegExp = /[,.!?;:() \n\r]/g

		var mobilemodes = [{
			mode : 'leftshow',
			icon : 'fas fa-hashtag'
		},{
			mode : 'mainshow',
			icon : 'fas fa-home'
		},{
			mode : 'rightshow',
			icon : 'fas fa-arrow-right'
		}]

		var mobilemode = 'mainshow'

		var helpers = {
			
		}
		
		var actions = {
			swipe : function(phase, direction, distance){


				if(!direction || !distance) return

				if (phase != 'move'){
					fixeddirection = null
				}

				if (direction != 'left' && direction != 'right') {
					//
						el.slwork.css({'transform' : 'translateX(0%)'})
					//}

					if (phase == 'move'){
						if (distance > 20){
							fixeddirection = direction
						}
					}
					

					if(phase == 'end'){
						if(direction == 'down'){

							
							console.log('lenta.hasplayingvideos()', lenta.hasplayingvideos())

							if(lenta && lenta.hasplayingvideos()) return
							
							self.app.el.html.removeClass('scrollmodedown')
						}

						if(direction == 'up' && el.lentacell.scrollTop() > 200){



							self.app.el.html.addClass('scrollmodedown')
						}
					}
					
					return
				}

				if(fixeddirection) return

				var currentindex = _.findIndex(mobilemodes, function(m){
					return m.mode == mobilemode
				})

				var tomode = null
				var prs = 0
				var c = 1

				if (phase == 'move'){

					if(direction == 'left' || direction == 'right'){
						prs = 100 * (distance / el.w.width())

						if(prs > 10) prs = 10

						if(direction == 'left') c = -1

						el.slwork.css({'transform' : 'translateX(' + (c * prs) + "%)"})

						return
					}
					
				}

				el.slwork.css({'transform' : 'translateX(0%)'})

				if(phase == 'end'){

					if(direction == 'right'){

						if (currentindex > 0){

							tomode = mobilemodes[currentindex - 1].mode
						}
						else{
							phase = 'cancel'
						}

					}

					if(direction == 'left'){

						if (currentindex < mobilemodes.length - 1){

							tomode = mobilemodes[currentindex + 1].mode
						}
						else{
							phase = 'cancel'
						}

					}

					if(!tomode){
						phase = 'cancel'
					}
					else{
						renders.mobilemode(tomode)
						return
					}
				}

				if(phase == 'cancel'){
					if(direction == 'left' || direction == 'right'){

					}
				}

				

				
			},
			refreshSticky : function(){

				if (hsready){
					el.panel.hcSticky('refresh');
					el.leftpanel.hcSticky('refresh');
				}
					
			},
			addbutton : function(){

				self.app.platform.ui.share()
			},
			addbuttonscroll  : function(){
				if (el.w.scrollTop() > 400){
					el.addbutton.addClass('scrollactive')
				}
				else{
					el.addbutton.removeClass('scrollactive')
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

				renders.lentawithsearch()

				makeShare()

				renders.smallpanel()
			},

			backtolenta : function(){
				actions.backtolentaClear()
				_scrollTop(lastscroll, null, 5)
				

			},

			backtolentaClear : function(){


				self.nav.api.history.removeParameters(['v'])

				el.c.removeClass('opensvishowed')

				renders.post(null)

				setTimeout(function(){

					renders.upbutton()
					
					actions.refreshSticky()

				}, 350)

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
				_scrollTop(0, null, 5)
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
				self.app.platform.sdk.search.get(searchvalue, 'posts', start, count, fixedBlock, function(r){

					clbk(r.data);

				})
			},
		}

		var renders = {

			addpanel : function(){

				self.app.user.isState(function(state){
					if(state){

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

			smallpanel : function(){
				el.smallpanel.find('.item').removeClass('active')
				el.smallpanel.find('.item[lenta="'+currentMode+'"]').addClass('active')
			},
			share : function(){

				if(!isMobile() && !videomain && !searchvalue && !searchtags){

					el.c.removeClass('wshar')

					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.share,
						animation : false,
						
						clbk : function(e, p){

							share = p

							actions.refreshSticky()

						},
						essenseData : {
							post : function(){

								if (plissing)
									plissing.destroy()
							}
						}

					})
				}else{
					el.c.addClass('wshar')
				}
			},

			topvideos: function (show) {

				var showmoreby = el.topvideos

				showmoreby.removeClass('hasshares')

				if (show){
					self.app.platform.papi.horizontalLenta(showmoreby, function (e,p) {

						external = p
						actions.refreshSticky()
					}, {
						caption : self.app.localization.e("Top videos") ,
						video: true,
						r : 'hot',
						loaderkey : 'recommended',
						shuffle : true,
						period : '4320',
						page : 0,
						afterload : function(ed, s, e){

							if(e || !s.length) return

							ed.page++
						},
						ended : function(s){

							if(!s.length) return true
							return false

						},
						hasshares : function(shares){

							if (shares.length > 2){
								showmoreby.addClass('hasshares')
							}
							
						},
	
						opensvi : function(id, share){

							if(isMobile() && share){
								self.nav.api.load({
									open : true,
									href : 'post?&s=' + id,
									history : true,
									handler : true
								})
							}
							else{
								self.nav.api.load({
									open : true,
									href : 'index?video=1&v=' + id,
									history : true,
									handler : true
								})
							}

							
						},

						compact : true
	
					})
				}

				else{
					if(external){
						external.destroy()
						external = null
					}

					showmoreby.html('')
					showmoreby.removeClass('hasshares')
				}

				
			},

			leftpanel: function(){

				self.nav.api.load({

					open : true,
					id : 'leftpanel',
					el : el.leftpanel,
					animation : false,

					essenseData : {
					
						renderclbk : function(){
							actions.refreshSticky()
						},

						changed : function(){
							renders.lentawithsearch()
						}
					},
					clbk : function(e, p){

						leftpanel = p;

					}

				})
			},

			panel : function(){

				if(videomain && !isMobile()) return

				self.nav.api.load({

					open : true,
					id : 'panel',
					el : el.panel,
					animation : false,

					essenseData : {
					
						renderclbk : function(){
							actions.refreshSticky()
	
						}
					},
					clbk : function(e, p){

						panel = p;
						
					}

				})
			},
			lentawithsearch : function(clbk, p){

				if(searchvalue){

					var value = searchvalue.replace('tag:', "#");

					var c = deep(self, 'app.modules.menu.module.showsearch')

					if (c)
						c(value)

					self.app.platform.sdk.search.get(searchvalue, 'posts', 0, 10, null, function(r, block){

						if (r.count){
							self.app.platform.sdk.activity.addsearch(searchvalue)
						}

						fixedBlock = block

						result = {
							posts : r
						};

						renders.lenta(clbk, p)
					})

				}
				else{
					result = {}
					fixedBlock = null

					var c = deep(self, 'app.modules.menu.module.showsearch')

					if (c){

						if(searchtags){
							var val = _.map(searchtags, function(w){return '#' + w}).join(' ')

							c(val)


							self.app.platform.sdk.activity.addtagsearch(val)

						}
						else{
							c('')
						}

					}
					

					renders.lenta(clbk, p)
				}
			},
			lenta : function(clbk, p){

				if(!p) p = {};

				var loader = null
				var fp = false

				if (lenta) {
					lenta.destroy()
				}

				renders.addpanel();

				if(searchvalue){
					loader = function(clbk){
						var _clbk = function(data){
							var shares = self.app.platform.sdk.node.shares.transform(data) 

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
				
				self.nav.api.load({
					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : 'main',

					essenseData : {
						hr : 'index?',
						goback : p.goback,
						searchValue : searchvalue || null,
						search : searchvalue ? true : false,
						tags : searchtags,
						video : videomain && !isMobile(),
						videomobile : videomain && isMobile(),
						window : isMobile() ? el.c.find('.lentacell') : el.w,
						page : 0,
						afterload : function(ed, s, e){

							if(!isMobile()) return

							if(e || !s.length) return

							ed.page++
						},
						opensvi : function(id){

							lastscroll = el.w.scrollTop()

							el.c.addClass('opensvishowed')

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

							renders.post(id)

							self.nav.api.history.addParameters({
								v : id
							})

							events.up()
						},

						renderclbk : function(){
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

			},

			upbutton : function(){
				if(upbutton) upbutton.destroy()

				upbutton = self.app.platform.api.upbutton(el.up, {
					top : function(){
						return '65px'
					},
					rightEl : el.c.find('.leftpanelcell')
				})	
			},

			post : function(id){

				if(!el || !el.c) return

				if (!id){

					if (openedpost){
						
						openedpost.destroy()
						openedpost = null
					}

					el.c.find('.renderposthere').html('')

				}

				else{
					
					self.app.platform.papi.post(id, el.c.find('.renderposthere'), function(e, p){
						openedpost = p
					}, {
						video : true,
						autoplay : true,
						nocommentcaption : true,
						r : 'recommended',
						
						opensvi : function(id){


							if (openedpost){
						
								openedpost.destroy()
								openedpost = null
							}
		
							el.c.find('.renderposthere').html('')

							renders.post(id)

							_scrollTop(0)
						}
					})
				}

				
			},

			mobilemode : function(mode){

				if (mode){

					if (mobilemode == 'mainshow'){
						lastscroll = el.w.scrollTop()
						_scrollTop(0, null, 0)
					}

					mobilemode = mode
				}

				el.c.attr('mobilemode', mobilemode)

				renders.columnnavigation()

				setTimeout(function(){
					self.app.el.html.removeClass('scrollmodedown')
				}, 300)
				

				if (mobilemode == 'mainshow' && lastscroll){
					_scrollTop(lastscroll, null, 0)
				}
			},

			columnnavigation : function(){

				return


				self.shell({
					name :  'columnnavigation',
					el : el.columnnavigationWrapper,
					data : {
						mobilemode : mobilemode,
						mobilemodes : mobilemodes
					},

				}, function(_p){

					_p.el.find('.columnnavigation').on('click', function(){
						var mode = $(this).attr('mode')

						renders.mobilemode(mode)
						
					})

				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.w.on('scroll', actions.addbuttonscroll)

			el.smallpanel.find('.item').on('click', events.currentMode)

			el.c.find('.backtolenta').on('click', actions.backtolenta)

			el.addbutton.on('click', actions.addbutton)

			if(!isMobile()){

				el.leftpanel.hcSticky({
					stickTo: '#main',
					top : 64,
					bottom : 122
				});

				el.panel.hcSticky({
					stickTo: '#main',
					top : 76,
					bottom : 122
				});

				hsready = true

			}
			else{


				if (self.app.scrolling){
	
					el.lentacell.on('scroll', function(){

						if (el.lentacell){

							var st = el.lentacell.scrollTop()

							if (st < 200){
								self.app.el.html.removeClass('scrollmodedown')
							}
	
							_.each(self.app.scrolling.clbks, function(c){
								c(st)
							})
						}


						
					})
	
				}
			}


		}

		var makePanel = function(){
			self.app.user.isState(function(state){
				//if(state){

					renders.panel();
					renders.leftpanel();
					renders.addpanel();
				//}
			})
		}

		var makeShare = function(){

			self.app.user.isState(function(state){
				if(state){

					if(!isMobile()){

						if (currentMode == 'common')
						{
							renders.share()

							el.c.find('.bgCaption').removeClass('hidden')
						}
						else
						{
							el.share.html('')

							el.c.find('.bgCaption').addClass('hidden')
						}

					}
				}

			})
			
			
		}

		var make = function(clbk, p){

			localStorage['lentakey'] = parameters().r || 'index'
			
			if (parameters().video){
				localStorage['lentakey'] = 'video'
			}

			renders.lentawithsearch(clbk, p)

			makeShare()

			makePanel()

			renders.smallpanel()

			if (currentMode == 'common' && !videomain && !searchvalue && !searchtags)
				renders.topvideos(true)

			
				
		}


		
		return {
			primary : primary,

			scrolltopall : function(){

				if(el.lentacell && isMobile()){

					_scrollTop(0, el.lentacell, 200)

					renders.mobilemode('mainshow')
				}
			},

			parametersHandler : function(clbk){

				var ncurrentMode = currentMode

				localStorage['lentakey'] = parameters().r || 'index'

				if (parameters().video){
					localStorage['lentakey'] = 'video'
				}

				if (parameters().r){
					ncurrentMode = parameters().r
				}
				else{
					ncurrentMode = 'common'
				}
				
				if (currentMode != ncurrentMode){

					currentMode = ncurrentMode
				}

				var _vm = parameters().video ? true : false


				if(_vm != videomain){
					videomain = _vm
				}

				searchvalue = parameters().ss || ''

				var tgsi = decodeURI(parameters().sst || '')

				var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
					return r
				}));

				searchtags = words.length ? words : null

				renders.topvideos(currentMode == 'common' && !videomain && !searchvalue && !searchtags)

				if (videomain){

					el.c.addClass('videomain')

					if(!parameters().v){
						actions.backtolenta()
						makePanel()
					}
				}
				else{
					el.c.removeClass('videomain')
					actions.backtolentaClear()
					makePanel()
				}
				
				if (lenta) {
					lenta.destroy()
					lenta = null
				}

				renders.lentawithsearch()

				renders.leftpanel()


				makeShare()

				actions.refreshSticky()

				if (clbk)
					clbk()

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


				if(self.app.curation()){
					self.nav.api.load({
						open : true,
						href : 'userpage',
						history : true
					})

					return
				}

				if(p.state && primary && !self.app.user.validate()){

					self.nav.api.load({
						open : true,
						href : 'userpage?id=test',
						history : true
					})

					return
				}
				
				var data = {};
			
		
				clbk(data);
				

			},

			destroy : function(){

				if (el && el.w)
					el.w.off('scroll', actions.addbuttonscroll)
					
					self.app.el.html.removeClass('scrollmodedown')

				renders.post(null)

				hsready = false

				//searchvalue = '', searchtags = null

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

				if (external){
					external.destroy()
					external = null
				}

				if (leftpanel){
					leftpanel.destroy()
				}

				lastscroll = 0
				mobilemode = 'mainshow'
				leftpanel = null
				panel = null
				roller = null
				lenta = null
				share = null
				videomain = false
				fixeddirection = null
				self.app.el.footer.removeClass('workstation')

				self.app.el.html.removeClass('nooverflow');
				self.app.el.html.removeClass('showmain');
				el = {}
				
				if (self.app.scrolling){
	
					_.each(self.app.scrolling.clbks, function(c){
						c(0)
					})
	
				}
			},
			
			init : function(p){
				

				roller = null
				lenta = null
				fixeddirection = null

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.lenta = el.c.find('.lentaWrapper');
				el.lentacell =  el.c.find('.lentacell')
				el.panel = el.c.find('.panel'); //00
				el.leftpanel = el.c.find('.leftpanel');
				el.up = el.c.find('.upbuttonwrapper')
				el.upbackbutton = el.c.find('.upbackbuttonwrapper')
				el.smallpanel = el.c.find('.smallpanell')
				el.addbutton = el.c.find('.addbutton')
				el.columnnavigationWrapper = el.c.find('.columnnavigationWrapper')
				el.slwork = el.c.find('.maincntwrapper >div.work')
				el.topvideos = el.c.find('.topvideosWrapper')
				el.w = $(window)

				self.app.el.footer.addClass('workstation')

				// Add a specific class to hide overflow on mobile
				// (for iOS mobile devices)
				if (isMobile())
					self.app.el.html.addClass('nooverflow');

					self.app.el.html.addClass('showmain');

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

				videomain = parameters().video ? true : false

				if(videomain && !isMobile()){
					el.c.addClass('videomain')
				}

				renders.mobilemode()

				make(function(){
					p.clbk(null, p);
				}, p)

				if(isMobile()){

					el.c.find('.maincntwrapper').swipe({
						allowPageScroll: "auto", 
						swipeStatus : function(e, phase, direction, distance){

							if(self.app.el.html.hasClass('fullvideoshowedanimblock')) return

							if(el.topvideos.has(e.target).length > 0){
								return true
							}

							actions.swipe(phase, direction, distance)

							return true
						},
					})
	
				}
				
				
			}
		}
	};

	self.scrolltopall = function(){
		_.each(essenses, function(essense){

			essense.scrolltopall();

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