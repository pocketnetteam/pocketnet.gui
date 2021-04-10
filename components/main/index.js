var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var roller = null, lenta = null, share = null, panel,leftpanel, uptimer = null;

		var upbutton = null, plissing = null, searchvalue = '', result, fixedBlock;

		var currentMode = 'common', hsready = false;

		var helpers = {
			
		}
		
		var actions = {
			refreshSticky : function(){

				if (hsready){
					el.panel.hcSticky('refresh');
					el.leftpanel.hcSticky('refresh');
					
				}
					
			},
			addbutton : function(){

				self.app.platform.ui.share()

				/*globalpreloader(true, true)

				setTimeout(function(){
					self.nav.api.load({

						open : true,
						id : 'share',
						inWnd : true,
	
						eid : 'postin',
						
						clbk : function(e, p){
							globalpreloader(false)
						},
	
						essenseData : {
							close : function(){
	
								share.make()
	
							},
							post : function(){
								share.make()
	
	
								if (plissing)
									plissing.destroy()
								
							},	
							absolute : true
						}
	
					})
				}, 50)*/
				
				
			},
			addbuttonscroll  : function(){
				if($(window).scrollTop() > 400){
					el.addbutton.addClass('scrollactive')
				}
				else{
					el.addbutton.removeClass('scrollactive')
				}
			},
			panelTopPosition : function(){

				return

				if(!isMobile()){
					var s = $(window).scrollTop();

					if (s > 45){
						el.panel.closest('.fxd').addClass('dfxd')
					}
					else
					{
						el.panel.closest('.fxd').removeClass('dfxd')
					}

					actions.panelPosition()
				}

			},
			panelPosition : function(){

				return

				var cnt = el.panel.closest('.fxd');
				var mwork = el.panel.closest('.mwork');
				var width = $(window).width();

				if(!cnt.hasClass('dfxd')){

					cnt.removeAttr('style')


					/*cnt.css('right', "0px")
					cnt.css('left', "0px")*/

					return
				}



				var maxWidth = 1280;

				var paddingR = 0;
				var paddingL = 0;

				var over = (width - maxWidth) / 2;

				if (over < 0) over = 0;

				var right = width - (mwork.offset().left + mwork.width()) + paddingR;

				var left = width - right - 350 + paddingL + paddingR


				cnt.css('right', right + "px")
				cnt.css('left', left + "px")
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

				if(!isMobile()){

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
						}
					},
					clbk : function(e, p){

						leftpanel = p;

					}

				})
			},

			panel : function(){

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

						console.log('result11', result)

						renders.lenta(clbk, p)
					})

				}
				else{
					result = {}
					fixedBlock = null

					var c = deep(self, 'app.modules.menu.module.showsearch')

					if (c)
						c('')

					renders.lenta(clbk, p)
				}
			},
			lenta : function(clbk, p){

				if(!p) p = {};

				var loader = null
				var fp = false

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

							console.log('result', result)

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
						renderclbk : function(){
						},
						loader : loader
					},
					clbk : function(e, p){

						if(!upbutton)
							upbutton = self.app.platform.api.upbutton(el.up, {
								top : function(){
				
									return '65px'
								},
								rightEl : el.c.find('.leftpanelcell')
							})		

							lenta = p

						if (clbk)
							clbk()

					}

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
			
			window.addEventListener('scroll', actions.addbuttonscroll)

			el.smallpanel.find('.item').on('click', events.currentMode)

				

			el.addbutton.on('click', actions.addbutton)

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

		var makePanel = function(){
			self.app.user.isState(function(state){
				//if(state){

					if(!isMobile()){
						renders.panel()

					}

					if(!isMobile()){
						renders.leftpanel()

					}

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

			renders.lentawithsearch(clbk, p)

			makeShare()

			makePanel()

			renders.smallpanel()


			/*
			if(!isMobile()){

				self.app.platform.sdk.user.get(function(u){

					if(u.postcnt < 10){
						setTimeout(function(){

							if (el.c)

								plissing = self.app.platform.api.plissing({
									el : el.c.find('.addbutton'),
									text : "Post something & earn Pocketcoin",
									left : true,
									white : true
								})

						}, 7000)
					}

					

				})
			}*/
				
		}


		
		return {
			primary : primary,

			parametersHandler : function(clbk){

				var ncurrentMode = currentMode

				localStorage['lentakey'] = parameters().r || 'index'

				if (parameters().r){
					ncurrentMode = parameters().r
				}
				else{
					ncurrentMode = 'common'
				}
				
				if (currentMode != ncurrentMode){

					currentMode = ncurrentMode

					if(lenta) lenta.destroy()

					renders.lentawithsearch()
				}

				renders.leftpanel()


				makeShare()

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

				hsready = false

				if (plissing)
					plissing.destroy()

				if (upbutton)
					upbutton.destroy()

					upbutton = null


				
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

				if (leftpanel){
					leftpanel.destroy()
				}

				
				leftpanel = null
				panel = null
				roller = null
				lenta = null
			},
			
			init : function(p){

				roller = null
				lenta = null

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.lenta = el.c.find('.lentaWrapper');
				el.panel = el.c.find('.panel');
				el.leftpanel = el.c.find('.leftpanel');
				el.up = el.c.find('.upbuttonwrapper')
				el.smallpanel = el.c.find('.smallpanell')
				el.addbutton = el.c.find('.addbutton')

				el.w = $(window)

				initEvents();

				if(!p.goback){
					searchvalue = parameters().ss || ''
					fixedBlock = null
					result = {}
				}

				make(function(){
					p.clbk(null, p);
				}, p)
				
			}
		}
	};



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