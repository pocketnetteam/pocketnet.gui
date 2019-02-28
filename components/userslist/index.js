var userslist = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;
		var addresses = [],
			cnt = 10,
			end = false,
			page = 0;

		var loading;

		var actions = {

		}

		var events = {
			loadmorescroll : function(){

				if (

					($(window).scrollTop() + $(window).height() > $(document).height() - 400) 

					&& !loading && !end) {

					makepage()

				}
			},
		}

		var renders = {
			page : function(addresses, clbk){

				self.shell({

					name :  'users',
					el :   el.users,
					data : {
						addresses : addresses,
						commonkey : 'subscribes'

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

				self.sdk.users.get(addresses, function(){

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