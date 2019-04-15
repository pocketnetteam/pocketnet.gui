var s = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, value, result;

		var userIndex = 0, maxCount = 10, count = maxCount, fixedBlock;

		var usersView = 'list'

		var actions = {

			clickArrow : function(a){
				if(a == 'left'){
					userIndex = userIndex - count;

					if (userIndex < 0) userIndex = 0;
				}

				if(a == 'right'){
					userIndex = userIndex + count;

					if (userIndex >= result.users.count) 
						userIndex =  result.users.count - 1;

					makenext('users', userIndex, count)
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

				if(userIndex + count < result.users.count){
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

				if(usersView == 'list'){
					var w = el.c.find('.user').width();
					var W = el.c.find('.userslistwrapper').width();

					count = Math.min(Number((W / w).toFixed(0)), maxCount)

					el.c.find('.user').width((W / count).toFixed(0) + 'px');

					el.userslist.width((result.users.data.length * (W / count)).toFixed(0) + 1);

					actions.slideCarousel()
				}


				else
				{
					el.userslist.css('margin-left', 0 + 'px')

					el.userslist.css('width', 'auto')

					el.c.find('.user').css('width', 'auto')
				}
				
	
			},

			changeUsersView : function(){
				if  (usersView == 'list') usersView = 'full'
				else usersView  = 'list'

				el.users.attr('view', usersView)

				actions.applyCarousel()	
			}
		}

		var events = {
			clickArrow : function(){
				var a = $(this).attr('arrow');

				actions.clickArrow(a)
			}
		}

		var renders = {
			users : function(users, clbk){

				self.shell({
					name :  'userslist',
					el : el.users.find(".userslist"),
					data : {
						users : users
					},

					inner : append,

					bgImages : {
						clbk : function(i){
							$(i.elements[0]).addClass('active')
						}
					}

				}, function(p){

					if (usersView = 'list'){
						actions.applyCarousel()
					}

					if (clbk)
						clbk(p);
				})

			}
		}

		var makenext = function(type, view, start, count, clbk){

			var l = result[type].data.length;
			var L = result[type].count

			if(start + count <= l){

				return

			}

			if (start < l){
				var d = l - start;

				start = l;
				count = count - d;
			}
			
			if(start + count > L) count = L - start

			if(count <= 0) return

			

			load[type](function(data){

				renders[type](data)

			}, start, count)	

		}

		var load = {
			users : function(clbk, start, count){
				self.app.platform.sdk.search.get(value, 'users', start, count, fixedBlock, function(r){

					clbk(r.data);

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
			
			el.ua.on('click', events.clickArrow)
			el.showmore.on('click', actions.changeUsersView)
		}

		var make = function(){

			renders.users(result.users.data)

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				value = parameters().ss || '';

				self.app.platform.sdk.search.get(value, 'all', 0, maxCount, null, function(r, block){

					fixedBlock = block

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
				el.showmore = el.c.find('.showmore')

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