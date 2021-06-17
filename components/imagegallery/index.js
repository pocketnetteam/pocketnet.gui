var imagegallery = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el,
			currentImage = null,
			num = 0,
			essenseData;

		var making;
		
		var actions = {

			swipe : function(phase, direction, distance){
				

				var tomode = null
				var prs = 0
				var c = 1

				if (phase == 'move'){

					if(direction == 'left' || direction == 'right'){
						prs = 100 * (distance / 500)

						if(direction == 'left') c = -1

						el.images.css({'transform' : 'translateX(' + (c * prs) + "%)"})

						return
					}
					
				}

				el.images.css({'transform' : 'translateX(0%)'})

				if(phase == 'end'){

					if(direction == 'right'){

						actions.back()

					}

					if(direction == 'left'){

						actions.next()

					}

					
				}

				if(phase == 'cancel'){
					if(direction == 'left' || direction == 'right'){

					}
				}
				
			},

			back : function(){

				if(essenseData.images.length > 1){
					actions.prepareImages();

					num--;

					if(num < 0) num = essenseData.images.length - 1;

					make()
				}


				
			},

			next : function(){
				if(essenseData.images.length > 1){
					actions.prepareImages();

					num ++;

					if(num >= essenseData.images.length) num = 0;

					make()
				}
			},

			initialValue : function(){

				actions.prepareImages();

				if(essenseData.initialValue)
				{
					num = findIndex(essenseData.images, function(image){

						var field = 'name';

						if (essenseData.idName) field = essenseData.idName;

						if (image[field] == essenseData.initialValue) return true;						

					})
				}
			},

			prepareImages : function(){
				if(essenseData.getImages)
				{
					essenseData.images = essenseData.getImages();
				}
			},

			prepareImage : function(image, clbk){
				if(essenseData.getImage)
				{
					essenseData.getImage(image, function(image){

						if (clbk)
							clbk(image)

					})
				}

				else
				{
					if (clbk)
						clbk(image)
				}
			}
		}

		var helpers = {
			resize : function(){

				helpers.bestFit(el.imagesWrapper.find(".image"), currentImage);				
			},
			bestFit : function(el, image){

				var abs = el.closest('.imagesAbsWrapper')
				var cnt = el.find('.imgWrapper')

				var w = image.naturalWidth || image.width;
				var h = image.naturalHeight || image.height;

				var c = h / w;

				el.css('padding-top',"0px");

				var W = el.width();
				var H = el.height();

				var mW =  abs.width();
				var mH =  abs.height();

				if(mW < W) W = mW;
				if(mH < H) H = mH; 


				if (w > W){
					w = W;
					h = w * c;
					
				}

				if (h >= H){

					h = H;
					w = h / c
				}

				var ptop = (H - h) / 2;

				// el.css('padding-top', ptop + "px");

				image.width = w;
				image.height = h;

				$(image).attr('data-camanwidth', w);
				$(image).attr('data-camanheight', h);

				$(image).animate({
					opacity : 1
				})		
				
				cnt.width(w);
				cnt.height(h);

			},
			nFormat : function(num){
				if(num < 10 ) num =  "0" + num;

				return num;
			}
		}

		var events = {
			arrows : function(){

				if(making) return;

				var action = $(this).attr('action');

				actions[action]();

				return false;
			},

			body : function(e){

				if(making || e.pageY < 80) return;

				action = 'next'

				if(e.pageX < $(window).width() / 2) action = 'back'

				actions[action]();
			}
		}

		var renders = {
			image : function(p){
				

				el.imageNavigation.find('.number').html(helpers.nFormat(num + 1));

				$(window).off('resize', helpers.resize)

				if(!p) p = {};

				self.shell({
					name :  'image',
					el :   el.images,
					inner : html,
					display : 'table',
					data : {
						data : essenseData,
						image : p.image
					},

				}, function(p){
					
					p.el.find('img').imagesLoaded(function(image){

						el.c.removeClass('loading')

						making = false;

						currentImage = deep(image, 'images.0.img');

						if (currentImage)
						{
							helpers.resize();

							$(window).on('resize', helpers.resize)
						}
						
					});

				})

			},

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var make = function(){

			el.c.addClass('loading')

			making = true;

			var image = essenseData.images[num] || essenseData.images[0];

			console.log(image, essenseData.images, num)

			
			self.app.nav.api.history.addParameters({
				num : num.toString()
			})


			actions.prepareImage(image, function(image){

				renders.image({
					image : image
				})

			})

			

		}

		var initEvents = function(){
			
			el.arrows.on('click', events.arrows);


			if(!isMobile() && !isTablet())
				el.c.on('click', events.body)

			var cc = el.c.find('.imagesTableWrapper').closest('.wnd')

			el.c.find('.imagesTableWrapper').swipe({
				allowPageScroll: "auto", 
				swipeStatus : function(e, phase, direction, distance){

					actions.swipe(phase, direction, distance)

					return true
				},
			})
			

		}

		

		return {
			primary : primary,

			parametersHandler : function(){
				var _num = parameters().num;

				if(typeof _num != 'undefined'){
					num = Number(_num)
					actions.prepareImages();

					make()
				}

			},

			getdata : function(clbk){

				var data = {};

					clbk(data);
			},

			destroy : function(){

				currentImage = null;

				$(window).off('resize', helpers.resize);

				making = false;

				//self.app.nav.api.history.removeParameters(['i', 'num', 's', 'com'])
				//self.app.nav.api.history.removeParameters(['num'])

				el = {};

			},
			clearparameters : ['i', 'num', 's', 'com'],
			init : function(p){

				currentImage = null;
				making = false;

				essenseData = p.essenseData || {};

				state.load();

				actions.initialValue();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.imagesWrapper = p.el.find('.imagesWrapper');
				el.images = p.el.find('.images');
				el.imageNavigation = p.el.find('.imageNavigation');
				el.arrows = el.imageNavigation.find('.arrow');

				make();

				initEvents();

				p.clbk(null, p);				
				
			},

			wnd : {			
				class : 'allscreen black withoutButtons imageGallery',
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
	module.exports = imagegallery;
}
else{

	app.modules.imagegallery = {};
	app.modules.imagegallery.module = imagegallery;

}