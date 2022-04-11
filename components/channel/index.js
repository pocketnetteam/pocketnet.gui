var channel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author = {};

		var eid = p.eid;

		var reports = {
			reputation : {
				name :  self.app.localization.e('reputation'),
				icon : '<i class="far fa-star"></i>',
				id : 'reputation',
				render : 'reputation',
				history : true,
			
				count : function(){
					return deep(author, 'state.reputation') || 0 
				}
			},

			publications : {
				name :  self.app.localization.e('posts'),
				icon : '<i class="fas fa-plus-circle"></i>',
				id : 'posts',
				render : 'posts',
				history : true,
				
				count : function(){
					return deep(author, 'data.postcnt') || 0 
				}
			},

			followers : {
				name : self.app.localization.e('followers2'),
				icon : '<i class="fas fa-users"></i>',
				id : 'followers',
				render : 'followers',
				history : true,
				
				count : function(){
					return deep(author, 'data.subscribers.length') || 0 
				}
			},

		
			following : {
				name : self.app.localization.e('following2'),
				id : 'following',
				icon : '<i class="fas fa-user-plus"></i>',
				render : 'following',
				history : true,
				
				count : function(){
					return deep(author, 'data.subscribes.length') || 0 
				}
			}
		}

		var renders = {
			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			_.each(reports, function(r, j){
				if(r.events){

					var el = p.el.find('[menuitem="'+j+'"]')

					_.each(r.events, function(e, i){
						el.on(i, e)

						/*if(i == 'click' && isMobile()){

							el.swipe({
								tap : e
							})

						}
						else{
							el.on(i, e)
						}*/

						
					})

				}
			})
		}

		return {
			primary : primary,
			id : eid,
			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				if(!ed.id){
					clbk({
						ed : ed
					})

					return
				}

				self.sdk.users.get(ed.id, function(){
					self.sdk.ustate.get(ed.id, function(){

						author.data = self.sdk.users.storage[ed.id]
						author.state = self.sdk.ustate.storage[ed.id]
						author.address = ed.id


						var data = {
							author : author,
							reports : reports,
							connect : ed.connect,
							domain : window.location.hostname || window.pocketnetdomain,
							ed : ed
						};

						clbk(data);

					})

				})

				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				p.clbk(null, p);
			},

			wnd : {			
				class : 'normalizedmobile',
			}
		}
	};



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
	module.exports = channel;
}
else{

	app.modules.channel = {};
	app.modules.channel.module = channel;

}