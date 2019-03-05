var messenger = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			toNewChat : function(){
				el.c.addClass('toNewChat')

				renders.userslist()
			},

			backToChats : function(){
				el.c.removeClass('toNewChat')
			},

			selectUser : function(){
				$(this).toggleClass('active')
			}
		}

		var loaders = {
			users : function(list, clbk){
				self.app.platform.sdk.users.get(list, clbk)
			}
		}

		var renders = {
			userslist : function(){

				var list = [];

				var me = deep(self.app, 'platform.sdk.users.storage.' + self.app.platform.sdk.address.pnet().address)

				console.log("ME", me)

				_.each(deep(me, 'subscribes') || [], function(a){
					list.push(a.adddress) 
				})

				_.each(deep(me, 'subscribers') || [], function(a){
					list.push(a) 
				})

				list = _.uniq(list)

				loaders.users(list, function(){



					self.shell({

						name :  'userslist',
						el :   el.userslist,
						data : {
							list : list
						},

					}, function(_p){
						_p.el.find('.addressTable').on('click', events.selectUser)
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
			
			el.newChat.on('click', events.toNewChat)

			el.back.on('click', events.backToChats)

			search(el.messengerSearch, {
				placeholder : 'Search',

				clbk : function(_el){

					

				},

				events : {
					fastsearch : function(value, clbk){
						clbk(null)
					},

					search : function(value, clbk){
						
						
					}
				}
				
			})

			search(el.usersSearch, {
				icon : '<i class="fas fa-users"></i> Recievers',

				class : 'recievers',

				clbk : function(_el){

					

				},

				collectresults : true,

				events : {
					fastsearch : function(value, clbk){
						clbk(['asdads', 'asdasd', 'assaddss'])
					},

					search : function(value, clbk){
						
						
					}
				}
				
			})

			

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.newChat = el.c.find('.newMessage')
				el.back = el.c.find('.back')
				el.messengerSearch = el.c.find('.messengerSearch')
				el.usersSearch = el.c.find('.usersSearch')

				el.userslist = el.c.find('.usersListWrapper')

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
	module.exports = messenger;
}
else{

	app.modules.messenger = {};
	app.modules.messenger.module = messenger;

}