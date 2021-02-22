var panel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, discussions = null, tags = null, comments = null, stacking = null;

		var ed = null;

		var events = {
			
		}

		var renders = {

			tags : function(){

				self.nav.api.load({

					open : true,
					id : 'tagcloud',
					el : el.tags,
					animation : false,
					
					clbk : function(e, p){
						tags = p
					}

				})

			},

			stacking : function(){

				self.nav.api.load({

					open : true,
					id : 'stacking',
					el : el.stacking,
					animation : false,
					
					clbk : function(e, p){
						stacking = p
					}

				})

			},

			recommendationslist : function(users, clbk){

				if(users.length && el.c){


					self.shell({
						name :  'recommendationslist',
						el : el.r.find(".userslist"),
						data : {
							users : users
						},
						bgImages : {
							clbk : function(i){
								$(i.elements[0]).addClass('active')
							}
						}
	
					}, function(p){

						


						if (clbk)
							clbk()

					})


				}
				
			},


			lastcomments : function(comments, clbk){

				self.nav.api.load({

					open : true,
					id : 'lastcomments',
					el : el.comments,
					animation : false,
					
					clbk : function(e, p){
						comments = p
					}

				})

			},	

			recommendations : function(users, clbk){				

				if(users.length && el.c){

					self.shell({
						name :  'recommendations',
						el : el.r,
						data : {
							users : users
						}					
	
					}, function(p){
						
						renders.recommendationslist(users, function(){

							var userIndex = 0, count = 4, maxCount = 4;

							var userslist = p.el.find('.userslist')

							var ea = p.el.find('.arrow');

							var eas = {
								uleft : p.el.find('.uleft'),
								uright : p.el.find('.uright')
							}

							var actions = {

								clickArrow : function(a){
									if(a == 'left'){
										userIndex = userIndex - count;

										if (userIndex < 0) userIndex = 0;
									}

									if(a == 'right'){
										userIndex = userIndex + count;

										if (userIndex >= users.count) 
											userIndex =  users.count - 1;
											
									}

									actions.slideCarousel()
								},	

								displayArrows : function(){
									if(userIndex > 0){
										actions.displayArrow('left', true)
									}
									else
									{
										actions.displayArrow('left', false)
									}

									if(userIndex + count < users.length){
										actions.displayArrow('right', true)
									}
									else
									{
										actions.displayArrow('right', false)
									}
								},

								displayArrow : function(a, s){
									var e = ea;

									if (a)
										e = eas['u' + a]

									if (s){
										e.addClass('active')
									}
									else
									{
										e.removeClass('active')
									}

								},

								slideCarousel : function(){

									var w = el.c.find('.user').width();

									var m = userIndex * w;

									userslist.css('margin-left', '-' + m + 'px')

									actions.displayArrows()
								},

								applyCarousel : function(){

									var w = p.el.find('.user').width();
									var W = p.el.find('.userslistwrapper').width();

									count = Math.min(Number((W / w).toFixed(0)), maxCount)

									el.c.find('.user').width((W / count).toFixed(0) + 'px');

									userslist.width((users.length * (W / count)).toFixed(0) + 1);

									actions.slideCarousel()
								
						
								}
							}

							var events = {
								clickArrow : function(){
									var a = $(this).attr('arrow');
					
									actions.clickArrow(a)
								}
							}

							actions.applyCarousel()

							p.el.find('.arrow').on('click', events.clickArrow)

						})

					})

				}

				else{
					el.r.html('')
				}
				
			},

			discussions : function(){

				var d = ed.discussions || {};

					d.view = 'fixedin'

				self.nav.api.load({

					open : true,
					id : 'discussions',
					el : el.cnt,
					animation : false,

					essenseData : d,
					
					clbk : function(e, p){
						discussions = p
					}

				})
			},

			_discussions : function(){
				self.user.isState(function(state){

					if(state){
	
						var me = self.app.platform.sdk.users.storage[self.app.platform.sdk.address.pnet().address];
						
						if(!me.relay && !me.temp)
							renders.discussions()
	
					}	
					
				})
			}
		}

		var load = {
			recomendation : function(clbk){

				self.app.user.isState(function(state){					

					if(state){

						var a = self.sdk.address.pnet().address

						self.sdk.users.get(a, function(){

							var users = deep(self, 'sdk.users.storage.' + a + '.recomendedSubscribes')

							if (users && users.length){

								self.sdk.users.get(users, function(){

									if (clbk)
										clbk(users)

								})

							}
							else{

								if (clbk)
									clbk([])

							}
						})
					}

					else{

						if (clbk)
							clbk([])

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
			
			self.app.platform.clbks.api.actions.subscribe.panelrec = function(){	
				load.recomendation(function(users){
					renders.recommendations(users)
				})
			}

			self.app.platform.ws.messages.event.clbks.panel = function(d){
				if(d.mesType == 'userInfo'){
					renders._discussions()
				}
			}
		}

		var make = function(){

		

			if (self.app.platform.sdk.usersettings.meta.vidgetchat.value)
				renders._discussions()

			if (self.app.platform.sdk.usersettings.meta.vidgettags.value)
				renders.tags()

			if (self.app.platform.sdk.usersettings.meta.vidgetlastcomments.value)
				renders.lastcomments()

			/*if (deep(self.app.platform.sdk, 'usersettings.meta.vidgetstacking.value'))
				renders.stacking()*/

			/*
				load.recomendation(function(users){
					renders.recommendations(users)
				})
			*/
			
		

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {};

				clbk(data);

			},

			destroy : function(){

				delete self.app.platform.clbks.api.actions.subscribe.panelrec
				delete self.app.platform.ws.messages.event.clbks.panel

				if (discussions){
					discussions.destroy()
					discussions = null;
				}

				if (tags){
					tags.destroy()
					tags = null;
				}

				if (comments){
					comments.destroy()
					comments = null;
				}

				if(stacking){
					stacking.destroy()
					stacking = null
				}


				el = {};
			},

			authclbk : function(){

				return

				if(typeof el != 'undefined' && el.c){
					if (self.app.platform.sdk.usersettings.meta.vidgetchat.value)
						renders._discussions()
				}
				
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.panelcnt')
				el.tags = el.c.find('.tagscnt')
				el.comments = el.c.find('.lastcommentscnt')
				el.stacking = el.c.find('.stackingcnt')

				el.r = el.c.find(".recommendationscnt")

				initEvents();

				make()

				p.clbk(null, p);
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
})();


if(typeof module != "undefined")
{
	module.exports = panel;
}
else{

	app.modules.panel = {};
	app.modules.panel.module = panel;

}