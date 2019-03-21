var main = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var roller = null, lenta = null, share = null, panel, uptimer = null;

		var currentMode = 'common'

		var helpers = {
			
		}

		var actions = {
			panelPosition : function(){
				var cnt = el.panel.closest('.fxd');
				var mwork = el.panel.closest('.mwork');
				var width = $(window).width();

				var maxWidth = 1280;

				var paddingR = 15;
				var paddingL = 0;

				var over = (width - maxWidth) / 2;

				if (over < 0) over = 0;

				var right = width - (mwork.offset().left + mwork.width()) + paddingR;

				var left = width - right - 350 + paddingL + paddingR


				cnt.css('right', right + "px")
				cnt.css('left', left + "px")
			},

			showHideUp : function(){
				if (el.w.scrollTop() > 200){
					el.up.addClass('active')
				}
				else
				{
					el.up.removeClass('active')
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

			showHideUp : function(){
				uptimer = slowMade(function(){
					actions.showHideUp()
				}, uptimer, 30)			
			},

			up : function(){
				console.log('up')
				_scrollTop(0)
			}

		}

		var renders = {
			smallpanel : function(){
				el.smallpanel.find('.item').removeClass('active')
				el.smallpanel.find('.item[lenta="'+currentMode+'"]').addClass('active')
			},
			share : function(){

				if(!isMobile())

					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.share,
						animation : false,
						
						clbk : function(e, p){

							share = p
						}

					})
			},

			panel : function(){

				self.nav.api.load({

					open : true,
					id : 'panel',
					el : el.panel,
					animation : false,
					
					clbk : function(e, p){

						panel = p;

						actions.panelPosition()

						window.addEventListener('resize', events.panelPosition)


					}

				})
			},

			lenta : function(){
			
				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : 'main',
					
					clbk : function(e, p){

						lenta = p

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
			
			window.addEventListener('scroll', events.showHideUp);

			el.up.on('click', events.up)

			el.smallpanel.find('.item').on('click', events.currentMode)

		}

		var makePanel = function(){
			self.app.user.isState(function(state){
				if(state){

					if(!isMobile()){
						renders.panel()
					}
				}
			})
		}

		var makeShare = function(){

			self.app.user.isState(function(state){
				if(state){

					if(!isMobile()){

						if (currentMode == 'common')
						{
							renders.share()
						}
						else
						{
							el.share.html('')
						}

					}
				}

			})
			
			
		}

		var make = function(clbk){

			renders.lenta()

			makeShare()

			makePanel()

			renders.smallpanel()
				
		}


		
		return {
			primary : primary,

			authclbk : function(){

				if(typeof el != 'undefined' && el.c){

					el.c.find('.bgCaption').removeClass('hidden')
				}
				
			},

			getdata : function(clbk, p){
				var _s = parameters()
				if (_s.r){
					currentMode = _s.r
				}
				else{
					currentMode = 'common'
				}

				

				beginmaterial = _s.s || _s.i || _s.v || null;

				if(!p.state && primary && (typeof _Electron != 'undefined' || window.cordova || currentMode =='common' && !beginmaterial) )
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
					
				}
				
				var data = {};
			
		
				clbk(data);
				

				
				

			},

			destroy : function(){

				window.removeEventListener('scroll', events.showHideUp);

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
				el.up = el.c.find('.upbutton')
				el.smallpanel = el.c.find('.smallpanell')

				el.w = $(window)

				initEvents();

				make()
				
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