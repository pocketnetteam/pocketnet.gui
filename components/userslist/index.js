var userslist = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
			cnt = 50,
			end = false,
			page = 0;

		var loading;

		var actions = {
			
			
			unblocking : function(address){
				el.caption.find('.unblocking').on('click', function(){

					dialog({
						html : "Do you really want to unblock user?",
						btn1text : "Unblock",
						btn2text : "Cancel",
	
						class : 'zindex',
	
						success : function(){
	
							self.app.platform.api.actions.unblocking(address, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)	
								}
							})
	
						}
					})
	
					
				})

			},
			unsubscribe : function(address){

				dialog({
					html : "Do you really want to unfollow user?",
					btn1text : "Unfollow",
					btn2text : "Cancel",

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, err){

							if(tx){
								
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}
		
						})

					}
				})

				
			},
			subscribe : function(address){
				self.app.platform.api.actions.subscribe(address, function(tx, err){

					if(tx){
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			}
		}

		var events = {
			loadmorescroll : function(){

				if (

					($(window).scrollTop() + $(window).height() > $(document).height() - 400) 

					&& !loading && !end) {

					makepage()

				}
			},
			unblocking : function(){
				var address = $(this).closest('.user').attr('address')

				actions.unblocking(address)
			},
			unsubscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.unsubscribe(address)
			},
			subscribe : function(){
				var address = $(this).closest('.user').attr('address')

				actions.subscribe(address)
			}
		}

		var renders = {
			page : function(addresses, clbk){

				self.shell({

					name :  'users',
					el :   el.users,
					data : {
						addresses : addresses
					},

					inner : append

				}, function(_p){
					if (clbk)
						clbk()
				})
			}
		}

		var load = {
			info : function(addresses, clbk){
				if(loading) return

				loading = true;

				topPreloader(80);

				el.c.addClass('loading')

				self.sdk.users.get(addresses, function(){

					el.c.removeClass('loading')

					loading = false;

					topPreloader(100);

					if (clbk)
						clbk()
				})
			}
		}

		var makepage = function(clbk){

			var newadresses = _.filter(addresses, function(a, i){
				if(i >= (page * cnt) && i < ((page + 1) * cnt)){
					return true;
				}
			})	

			if(newadresses.length){

				load.info(newadresses, function(){
					renders.page(newadresses, clbk)
				})

				page++
			}
			else
			{
				end = true;
			}

			

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			self.app.platform.clbks.api.actions.subscribe.userlist = function(address){

				console.log("SUC", address)

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('following')		
			}

			self.app.platform.clbks.api.actions.unsubscribe.userlist = function(address){
				console.log("USUC", address)

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('following')
			}

			self.app.platform.clbks.api.actions.blocking.userlist = function(address){
				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').addClass('blocking')				
			}

			self.app.platform.clbks.api.actions.unblocking.userlist = function(address){

				el.c.find('.user[address="'+address+'"] .subscribebuttonstop').removeClass('blocking')				

			}

			el.c.on('click', '.subscribe', events.subscribe)
			el.c.on('click', '.unsubscribe', events.unsubscribe)
			el.c.on('click', '.unblocking', events.unsubscribe)
		}

		var make = function(){
			makepage(function(){
				window.addEventListener('scroll', events.loadmorescroll)
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				end = false;
				page = 0;
				loading = false;

				var data = {};

				addresses = deep(p.settings, 'essenseData.addresses') || []

				data.addresses = addresses
				data.empty = deep(p.settings, 'essenseData.empty');
				data.caption = deep(p.settings, 'essenseData.caption');

				clbk(data);

			},

			destroy : function(){

				window.removeEventListener('scroll', events.loadmorescroll)

				delete self.app.platform.clbks.api.actions.subscribe.userlist
	
				delete self.app.platform.clbks.api.actions.unsubscribe.userlist
	
				delete self.app.platform.clbks.api.actions.blocking.userlist

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.users = el.c.find('.users')

				initEvents();

				make();

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
	module.exports = userslist;
}
else{

	app.modules.userslist = {};
	app.modules.userslist.module = userslist;

}