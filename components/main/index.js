var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var roller = null, lenta = null, share = null, panel, uptimer = null;

		var upbutton = null, plissing = null;

		var currentMode = 'common', hsready = false;

		var helpers = {
			
		}
		
		var actions = {
			refreshSticky : function(){

				if (hsready)
					el.panel.hcSticky('refresh');
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

				renders.lenta()

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

						actions.panelPosition()

						window.addEventListener('resize', events.panelPosition)
						window.addEventListener('scroll', actions.panelTopPosition)


						el.panel.hcSticky({
							stickTo: '#main',
							top : 76,
							bottom : 122
						});

						hsready = true

					}

				})
			},

			lenta : function(clbk, p){

				if(!p) p = {};

				renders.addpanel();

				self.app.user.isState(function(state){

					var r = null;

					/*if(state){

						var address = deep(self, 'app.user.address.value')

						if (address){
							var author = deep(self, 'sdk.users.storage.'+address)

							var u = _.map(deep(author, 'subscribes') || [], function(a){
								return a.adddress
							})

							if(u.length >= 30){
								if (currentMode == 'common'){
									r = 'sub'
								}

								if(currentMode == 'sub'){
									r = false
								}
							}

						}

						
					}*/

					
				
					self.nav.api.load({

						open : true,
						id : 'lenta',
						el : el.lenta,
						animation : false,

						mid : 'main',

						essenseData : {
							hr : 'index?',
							goback : p.goback,

							r : r,

							renderclbk : function(){
								
								//actions.refreshSticky()
		
							}
						},
						
						clbk : function(e, p){

							if(!upbutton)
								upbutton = self.app.platform.api.upbutton(el.up, {
									top : function(){
					
										return '65px'
									},
									rightEl : el.c.find('.lentacell')
								})		

							lenta = p

							if (clbk)
								clbk()

						}

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
			
			window.addEventListener('scroll', actions.addbuttonscroll)

			el.smallpanel.find('.item').on('click', events.currentMode)

				

			el.addbutton.on('click', actions.addbutton)

		}

		var makePanel = function(){
			self.app.user.isState(function(state){
				//if(state){

					if(!isMobile()){
						renders.panel()

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

			renders.lenta(clbk, p)

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

					renders.lenta()
				}


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

				/*if(!p.state && primary && (typeof _Electron != 'undefined' || window.cordova || currentMode =='common' && !beginmaterial) )
				{
					if(typeof _Electron != 'undefined' || window.cordova){

						self.nav.api.load({
							open : true,
							href : 'authorization',
							history : true
						})
						
					}	
					else
					{
						
						self.nav.api.load({
							open : true,
							href : 'video',
							history : true
						})
					}

					return
					
				}*/

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

				window.removeEventListener('scroll', actions.panelTopPosition)
				window.removeEventListener('resize', events.panelPosition)
				window.removeEventListener('scroll', actions.addbuttonscroll)
				
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
				el.up = el.c.find('.upbuttonwrapper')
				el.smallpanel = el.c.find('.smallpanell')
				el.addbutton = el.c.find('.addbutton')

				el.w = $(window)

				initEvents();

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