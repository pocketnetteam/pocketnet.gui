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
					return deep(author, 'data.subscribers_count') || 0 
				}
			},

		
			following : {
				name : self.app.localization.e('following2'),
				id : 'following',
				icon : '<i class="fas fa-user-plus"></i>',
				render : 'following',
				history : true,
				
				count : function(){
					return deep(author, 'data.subscribes_count') || 0 
				}
			}
		}

		var renders = {
			blocking : function(){
				var _el = el.c.find('.userinfo')

				var me = self.app.psdk.userInfo.getmy()

				blocking = me.relation(author.address, 'blocking')

				if(blocking){
					_el.addClass('blocked')
				}
				else{
					_el.removeClass('blocked')
				}
			}
		}

		var actions = {
			blocking : function(){
				self.app.mobile.vibration.small()

				var me = self.app.psdk.userInfo.getmy()
				if(!me) return 

				var blocking = me.relation(author.address, 'blocking')

				self.app.platform.sdk.user.stateAction(() => {
					self.app.platform.api.actions[blocking ? 'unblocking' : 'blocking'](author.address, function(tx, error){
						if(!tx){
							self.app.platform.errorHandler(error, true)	

							return 
						}

						

					})
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

			el.c.find('.blockWrapper').on('click', function(){
				actions.blocking()
			})

			if(ed.customaction){
				el.c.find('.customaction').on('click', function(){
					ed.customaction.action(author.data)
				})
			}
			
			
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

			self.app.platform.actionListeners.authorn = function({type, alias, status}){

				if(type == 'blocking' || type == 'unblocking'){

					author.data = self.psdk.userInfo.get(author.address)
					
					renders.blocking()
				}
				
			}

		}

		var make = function(){
			self.app.platform.sdk.users.getCover(author.address).then(cover => {
				if(!cover){
					Circles({
						target: el.c.find('.bgwallpaper')[0],
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
				}
				else{

					el.c.find('.bgwallpaper').attr('image', cover)
					bgImages(el.c)
				}
			})
		}

		return {
			primary : primary,
			id : eid,
			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				if(!ed.id) ed.id = parameters().addressid

				if(!ed.id){
					clbk({
						author : null,
						ed : ed
					})

					return
				}

				self.sdk.users.get(ed.id, function(){
					self.sdk.ustate.get(ed.id, function(){

						author.data = self.psdk.userInfo.get(ed.id)
						author.state = self.psdk.userState.get(ed.id)
						author.address = ed.id;

						var me = self.psdk.userInfo.getmy()
							
						author.following = me && me.relation(author.address, 'subscribes');
						author.me = self.app.user.isItMe(author.address)

						var data = {
							author : author,
							reports : reports,
							connect : ed.connect,
							domain : window.location.hostname || window.pocketnetdomain,
							ed : ed
						};

						clbk(data);

					})

				}, true)

				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();
				make();

				p.clbk(null, p);
			},

			wnd : {			
				class : 'normalizedmobile channelwnd',
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
	module.exports = channel;
}
else{

	app.modules.channel = {};
	app.modules.channel.module = channel;

}