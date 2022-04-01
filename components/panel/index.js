var panel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, comments = null, stacking = null, topusers = null, bestposts = null;

		var ed = null;

	
		var renders = {


			stacking : function(){

				self.nav.api.load({

					open : true,
					id : 'staking',
					el : el.stacking,
					animation : false,
					
					clbk : function(e, p){
						
						stacking = p
					}

				})

			},

			topusers : function(){
				

				self.nav.api.load({

					open : true,
					id : 'topusers',
					el : el.topusers,
					animation : false,

					essenseData : {
					},
					
					clbk : function(e, p){
						topusers = p;
					}

				})
			},

			bestposts : function(){
				

				self.nav.api.load({

					open : true,
					id : 'bestposts',
					el : el.bestposts,
					animation : false,

					essenseData : {
						type : 'recommended',
						header : self.app.localization.e('recommendedPosts')
					},
					
					clbk : function(e, p){
						bestposts = p;
					}

				})
			},
	

			lastcomments : function(clbk){

				self.nav.api.load({

					open : true,
					id : 'lastcomments',
					el : el.comments,
					animation : false,
					
					clbk : function(e, p){
						comments = p
					},

					essenseData : {
					
						renderclbk : function(){
							if(ed.renderclbk) ed.renderclbk()
						}
					},

				})

			},	
		
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
		}

		var make = function(){
		
			if (self.app.platform.sdk.usersettings.meta.vidgetlastcomments.value)
				renders.lastcomments()

			if (
				deep(self.app.platform, 'released.vidgets.staking') && 
				deep(self.app.platform.sdk, 'usersettings.meta.vidgetstaking.value')
			)
				renders.stacking()

	
			
			//renders.topusers();

			/*if (self.app.test){
				
				renders.bestposts();

			}*/


		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {};

				clbk(data);

			},

			destroy : function(){
			
				if (comments){
					comments.destroy()
					comments = null;
				}

				if (stacking){
					stacking.destroy()
					stacking = null
				}

				if (topusers){
					topusers.destroy()
					topusers = null
				}

				if (bestposts){
					bestposts.destroy()
					bestposts = null
				}

			
				if(el.c) el.c.empty()

					el = {};
			},

			authclbk : function(){

			
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.panelcnt')
				el.tags = el.c.find('.tagscnt')
				el.comments = el.c.find('.lastcommentscnt')
				el.stacking = el.c.find('.stackingcnt')

				el.topusers = el.c.find('.topuserscnt')
				el.bestposts = el.c.find('.bestpostscnt')

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