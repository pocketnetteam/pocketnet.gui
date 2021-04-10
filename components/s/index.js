var s = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, value, result;

		var userIndex = 0, maxCount = 10, count = maxCount, fixedBlock, lenta;

		var usersView = 'list'

		var actions = {
			clickNext : function(){
				userIndex = userIndex + count;

				makenext('users', userIndex, 30)

				actions.displayArrows()
			},
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
					actions.displayNext(true)
				}
				else
				{
					actions.displayArrow('right', false)

					actions.displayNext(false)
				}
			},

			displayNext : function(s){
				if(s){
					el.unext.addClass('active')
				}

				else
				{
					el.unext.removeClass('active')
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
				else {
					usersView  = 'list'
					userIndex = 0
				}

				el.users.attr('view', usersView)

				actions.applyCarousel()	
			}
		}

		var events = {
			clickArrow : function(){
				var a = $(this).attr('arrow');

				actions.clickArrow(a)
			},

			clickNext : function(){
				actions.clickNext()
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

					if (usersView == 'list'){
						actions.applyCarousel()
					}

					if (clbk)
						clbk(p);

				})

			},

			posts : function(){

				var fp = false;

				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : 'search',

					essenseData : {
						search : true,	
						hr : 'index?',
						searchValue : value,

						loader : function(clbk){

							var _clbk = function(data){
								var shares = self.app.platform.sdk.node.shares.transform(data) 

								if (clbk)
									clbk(shares, null, {
										count : 10
									})
							}

							if(!fp){
								fp = true
								_clbk(result.posts.data)
							}

							else
							{
								makenext('posts', result.posts.data.length, 10, function(data){
									_clbk(data)
								})
							}
						}
					},
					
					clbk : function(e, p){
					
						lenta = p;
				
					}

				})

			}
		}

		var makenext = function(type, start, count, clbk){

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

				if(clbk)
				{
					clbk(data)
				}

				else
				{
					renders[type](data)
				}

			}, start, count)	

		}

		var load = {
			users : function(clbk, start, count){
				self.app.platform.sdk.search.get(value, 'users', start, count, fixedBlock, function(r){

					clbk(r.data);

				})
			},

			posts : function(clbk, start, count){
				self.app.platform.sdk.search.get(value, 'posts', start, count, fixedBlock, function(r){

					clbk(r.data);

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
			
			el.ua.on('click', events.clickArrow)
			el.showmore.on('click', actions.changeUsersView)

			el.userslist.swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				}
			  });

			el.unext.on('click', events.clickNext)
		}

		var make = function(){

			if(deep(result, 'users.data.length'))
				renders.users(result.users.data)


			if(deep(result, 'posts.data.length')){
				renders.posts()
			}
			

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				lenta = null;

				value = (parameters().ss || '').replace('tag:', "#");

				var c = deep(self, 'app.modules.menu.module.showsearch')

				if (c)
					c(value)

				self.app.platform.sdk.search.clear()
				self.app.platform.sdk.search.get(value, 'all', 0, maxCount, null, function(r, block){

					fixedBlock = block

					result = r;

					data.result = r;
					data.value = value;

					clbk(data);

				})
				

			},

			destroy : function(nhref){


				if (nhref != self.app.nav.current.href){
					var c = deep(self, 'app.modules.menu.module.closesearch')
					if (c)
						c()
				}

				

				if (lenta)
					lenta.destroy()

				lenta = null;

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

				el.unext = el.c.find('.nextpage')

				el.lenta = el.c.find('.lentasearch')

				initEvents();

				make()

				/*if(isMobile){
					setTimeout(function(){
						_scrollTop(45)
					}, 200)
					
				}*/

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(nhref){

		_.each(essenses, function(essense){

			essense.destroy(nhref);

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