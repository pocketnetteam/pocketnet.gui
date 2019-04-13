var s = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, value, result;

		var userIndex = 0, maxCount = 10, count = maxCount;

		var actions = {

			clickArrow : function(a){
				if(a == 'left'){
					userIndex = userIndex - count;

					if (userIndex < 0) userIndex = 0;
				}

				if(a == 'right'){
					userIndex = userIndex + count;

					if (userIndex >= result.users.length) userIndex = result.users.length - 1;
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

				if(userIndex + count < result.users.length){
					actions.displayArrow('right', true)
				}
				else
				{
					actions.displayArrow('right', false)
				}
			},

			displayArrow : function(a, s){
				var e = el.ea;

				if (a)
				 	e = el['u' + a]

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

				el.userslist.css('margin-left', '-' + m + 'px')

				actions.displayArrows()
			},

			applyCarousel : function(){

				var w = el.c.find('.user').width();
				var W = el.c.find('.userslistwrapper').width();

				count = Math.min(Number((W / w).toFixed(0)), maxCount)

				console.log(W, w, Number((W / w).toFixed(0)), count, (W / count))

				el.c.find('.user').width((W / count) + 'px');

				el.userslist.width(result.users.length * (W / count));

				actions.slideCarousel()

				
			}
		}

		var events = {
			clickArrow : function(){
				var a = $(this).attr('arrow');

				actions.clickArrow(a)
			}
		}

		var renders = {
			users : {
				list : function(clbk){
					self.shell({
						name :  'userslist',
						el : el.users.find(".userslist"),
						data : {
							users : result.users
						},

						inner : append

					}, function(p){

						actions.applyCarousel()

						if (clbk)
							clbk(p);
					})
				},

				full : function(){

				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.ua.on('click', events.clickArrow)
		}

		var make = function(){

			renders.users.list()

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				value = parameters().ss || '';

				self.app.platform.sdk.search.get(value, 'all', function(r){

					console.log(r)

					result = r;

					data.result = r;
					data.value = value;

					clbk(data);

				})
				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				userIndex = 0;
				count = maxCount

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.users = el.c.find('.users')

				el.userslist = el.c.find('.userslist')

				el.posts = el.c.find('.posts')

				el.uleft = el.c.find('.uleft')
				el.uright = el.c.find('.uright')
				el.ua = el.c.find('.arrow')

				initEvents();

				make()

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
	module.exports = s;
}
else{

	app.modules.s = {};
	app.modules.s.module = s;

}