var channel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author = {};

		var eid = p.eid;

		var actions = {

		}

		var events = {
			
		}

		var name = function(){

			var name = app.platform.api.name(author.address)

			if(name) return name + "?"

			return 'author?address=' + author.address
		}

		var reports = {

			followers : {
				name : self.app.localization.e('followers').toUpperCase(),
				icon : '<i class="fas fa-users"></i>',
				id : 'followers',
				render : 'followers',
				history : true,
				href : function(){
					return name() + 'report=followers'
				},
				count : function(){
					return deep(author, 'data.subscribers.length') || 0 
				}
			},

			reputation : {
				name : "REPUTATION",
				icon : '<i class="far fa-star"></i>',
				id : 'reputation',
				render : 'reputation',
				history : true,
				href : function(){
					return name()
				},
				count : function(){
					return deep(author, 'state.reputation') || 0 
				}
			},

			following : {
				name : self.app.localization.e('following').toUpperCase(),
				id : 'following',
				icon : '<i class="fas fa-user-plus"></i>',
				render : 'following',
				history : true,
				href : function(){
					return name()+ "report=following"
				},
				count : function(){
					return deep(author, 'data.subscribes.length') || 0 
				}
			},

			share : {
				name : self.app.localization.e('share').toUpperCase(),
				icon : '<i elementsid="channel_share-alt" class="fas fa-share-alt"></i>',
				id : 'share',
				if : function(){
					return true
				},
				events : {
					click : function(){

						self.nav.api.load({
							open : true,
							href : 'socialshare2',
							history : true,
							inWnd : true,

							essenseData : {
								caption : "Share this author",
								sharing : author.data.social(self.app),
								embedding : {
									type : 'channel',
									id : author.address
								}
							}
						})
						
					}
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

						console.log("ED", ed)

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