var imageGalleryEdit = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el,
			currentImage = null,
			num = 0,

			filters = false,
			cropper = null,

			editMode = null,

			currentCaman = null,
			currentOriginal = null,

			essenseData;

		var imageFilters = {

			'normal' : {
				name : 'Normal'
			},

			'vintage' : {
				name : 'Vintage'
			},
			'oldBoot' : {
				name : 'Old Boot'
			},
			'clarity' : {
				name : 'Clarity'
			},
			
			'sunrise' : {
				name : 'Sunrise'
			},
			'crossProcess' : {
				name : 'Cross Process'
			},
			'orangePeel' : {
				name : 'Orange Peel'
			},
			'love' : {
				name : 'Love'
			},


			'jarques' : {
				name : 'Jarques'
			},
			'pinhole' : {
				name : 'Pinhole'
			},
			
			/*'oldBoot' : {
				Name : 'Old Boot'
			},
			'glowingSun' : {
				Name : 'Glowing Sun'
			},
			'hazyDays' : {
				Name : 'Hazy Days'
			},
			'herMajesty' : {
				Name : 'Her Majesty'
			},*/			
		}

		var applyFilters = {},
			applyedFilters = {}

		var actions = {
			back : function(){
				num--;

				if(num < 0) num = essenseData.images.length - 1;

				make()
			},

			next : function(){
				num ++;

				if(num >= essenseData.images.length) num = 0;

				make()
			},

			initialValue : function(){
				if(essenseData.initialValue)
				{
					num = essenseData.initialValue;
				}
			},

			filters : function(){
				filters = !filters;

				if (filters){
					el.c.addClass('filters')

					renders.filters()
				}
				else
				{
					el.c.removeClass('filters')
				}

				helpers.resize();

				return filters;
			},

			caman : function(clbk, _img){

				var img = '#galleryImage';

				if(_img) 
					img = _img;

				if(currentCaman && !_img)
				{
					if (clbk)
						clbk(currentCaman);
				}
				else
				{
					if(img.pixelData){
						if (clbk)
							clbk(img);
					}
					else{
						Caman(img, function(){

							if(!_img)
								currentCaman = this;
	
							if (clbk)
								clbk(this);
						})
					}
				
					
				}				
			},

			crop : function(){

				if (cropper)
				{
					cropper.destroy();

					cropper = null;

					return false;
				}
				else
				{
					actions.caman(function(){
						var _el = el.imagesWrapper.find('#galleryImage'),	
							parent = _el.parent();
													
						currentImage = currentCaman;

						essenseData.crop || (essenseData.crop = {})

						cropper = new Cropper(_el[0], {
							aspectRatio : essenseData.crop.aspectRatio || null,
							autoCropArea : essenseData.crop.autoCropArea || 0.9,
							checkOrientation : false,
							zoomable : false,
							zoomOnWheel : false,
						  	crop: function(e) {

						  		var W = currentCaman.width,
						  			H = currentCaman.height;

						  		var relative = {
						  			x : e.detail.x / W,
						  			y : e.detail.y / H,
						  			w : e.detail.width / W,
						  			h : e.detail.height / H,
						  		}

						  		applyFilters.crop = relative;

							},
							ready: function () {

								if(!essenseData.apply){

									parent.find(".cropper-container").addClass(essenseData.crop.style || '')

									parent.find(".cropper-crop-box").append('<div elementsid="applyCrop" class="applyCrop center" action="apply">\
										<span class="fa fa-check" aria-hidden="true"></span>\
									</div>')

									parent.find('.applyCrop').on('click', function(){

										actions.apply('crop');
										renders.savePanel();

									})

								}
							}
						});
					})
					

					return true;
				}				
			},

			camanFilter : function(caman, filter, clbk){				

				caman.revert(false);

				if(filter != 'normal')
				{
					caman.newLayer(function () {
					    this.opacity(50);

					    this.copyParent();

					    this.filter[filter]();
					});
				}				

			    caman.render(clbk);
			},


			previewFilter : function(el, image){

				var filter = el.attr('filter');
				var id = el.attr('imageId');

				Caman('#' + id, function(){

					actions.camanFilter(this, filter, function(){
						el.animate({
				    		opacity : 1
				    	})
					})

				});

				el.on('click', function(){							

					actions.caman(function(){
						actions.camanFilter(currentCaman, filter, function(){

							currentImage = currentCaman;

							applyFilters.filter = filter;
							applyedFilters.filter = filter

							renders.savePanel()

							helpers.resize();
							
						})
					})

				})
			},

			applyFilters : function(filter, id, _img, clbk){

				if(id == 'crop'){

					actions.caman(function(img){

						var W = img.originalWidth,//canvas.width,
							H = img.originalHeight;

						var absolute = {
							x : filter.x * W,
							y : filter.y * H,
							width : filter.w * W,
							height : filter.h * H
						}

						applyedFilters.crop = filter

						img.crop(absolute.width, absolute.height, absolute.x, absolute.y);	

						img.resize({
							width : absolute.width,
							height : absolute.height
						});					

						img.render(function(){

							img.resetOriginalPixelData();
							img.cropped = false;
							img.cropCoordinates = {
					          x: 0,
					          y: 0
					        }

					        img.originalHeight = absolute.height
					        img.originalWidth = absolute.width

					        img.preScaledHeight = absolute.height
					        img.preScaledWidth = absolute.width

					        img.resized = false;

					        if(!_img)
					        	helpers.resize();

							if (clbk)
								clbk(img);
						})

					}, _img)


					return;
				}

				if (id == 'filter'){
					actions.caman(function(img){

						actions.camanFilter(img, filter, function(){
							
							if (clbk)
								clbk(img);

						})


					}, _img)
				}
			},

			apply : function(mode, clbk){

				if (mode && applyFilters[mode]){

					actions.applyFilters(applyFilters[mode], mode, null, clbk)

					actions[mode]();

					el.c.find('[action="'+mode+'"]').removeClass('active');

				}
			},

			close : function(){
				if (essenseData.success){

					topPreloader(20);

					essenseData.success(essenseData.images, function(){

						topPreloader(100);

						self.closeContainer()
					});
				}

				else

					self.closeContainer()
			},

			createunvisibleImage : function(src, clbk){
				el.invisibleimagewrapper.html('<img id="invisibleimage" src="'+src+'">')

				el.invisibleimagewrapper.imagesLoadedPN(function(image){
					if(clbk) clbk('#invisibleimage')
				}, self.app)
			},

			applyfiltertobigimage: function(b64, f, k, clbk){
				actions.createunvisibleImage(b64, function(img){
					actions.applyFilters(f, k, img, function(img){
						clbk(img.toBase64())
					})
				})
			},

			applyfilterstooriginal : function(clbk){

				if(_.isEmpty(applyedFilters)){

					clbk(currentOriginal.original)

					return
				}

				globalpreloader(true, true)

				var ks = ['crop', 'filter']
				var img = currentOriginal.original

				lazyEach({
					array: ks,
					action: function (p) {

						if(applyedFilters[p.item]){
							actions.applyfiltertobigimage(img, applyedFilters[p.item], p.item, function(b64){
								img = b64
	
								p.success()
							})
						}
						else{
							p.success()
						}
						
					},

					all: {
						success: function () {

							clbk(img)

							globalpreloader(false)

						}
					}
				})
				
			},	

			exit : function(){

				if(essenseData.apply){

					actions.apply('crop', function(){
						actions.save(true, function(){
							actions.close();
						});	
					});

				}
				else
				{
					actions.close();
				}
				
			},

			cancel : function(){
				applyFilters = {};
				renders.savePanel();
				renders.image({
					image : currentOriginal
				})
			},

			save : function(norender, clbk){
				if(actions.checkUpdates()){

					actions.applyfilterstooriginal(function(b64){
						currentOriginal.original = b64

						//currentOriginal.original = currentCaman.toBase64()

						applyFilters = {};
						applyedFilters = {};

						if(!norender){
							renders.savePanel()

							renders.image({
								image : currentOriginal
							})
						}

						if(clbk) clbk()
					})
					
				}
			},

			checkUpdates : function(){
				if((applyFilters.filter && applyFilters.filter != 'normal') || applyFilters.crop){
					return true
				}
				else
				{
					return false;
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

				var __w = w, __h = h

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

				/*el.css('transform', 'scale(0.1)')
				el.css('transform-origin', 'top center')*/

				el.css('padding-top', ptop + "px");

				if (!image.canvas){


					image.width = w;
					image.height = h;

					$(image).attr('data-camanwidth', w);
					$(image).attr('data-camanheight', h);

					$(image).css('opacity', '1')


				}
				else
				{

					image.resize({
					    width: w,
					    height: h
					});

					image.render();
				}

				cnt.width(w);
				cnt.height(h);

				if(cropper)
				{
					cropper.resize({
					    width: w,
					    height: h
					});
				}
			},
			nFormat : function(num){
				if(num < 10 ) num =  "0" + num;

				return num;
			}
		}

		var events = {
			arrows : function(){
				var action = $(this).attr('action');

				actions[action]();
			},

			edit : function(){
				var action = $(this).attr('action'),
					_el = $(this);

				
				var active = actions[action]();

				if (active){

					//editMode = action;

					_el.addClass('active')

				}
				else
				{

					_el.removeClass('active')

				}
			},

			manage : function(){
				var action = $(this).attr('action');

				var active = actions[action]();
			}
			
		}

		var renders = {
			savePanel : function(){

				if(((applyFilters.filter && applyFilters.filter != 'normal') || applyFilters.crop) && !essenseData.apply){
					el.exitPanel.fadeOut(200, function(){
						el.savePanel.fadeIn(200);
					})
					
				}
				else
				{
					el.savePanel.fadeOut(200, function(){
						el.exitPanel.fadeIn(200);
					})
				}
			},
			image : function(p){

				currentImage = null;
				currentCaman = null;

				applyFilters = {};

				renders.savePanel();

				if (cropper)
				{
					cropper.destroy();

					cropper = null;

					el.editPanel.find('.eitem[action="crop"]').removeClass('active')
				}

				el.imageNavigation.find('.number').html(helpers.nFormat(Number(num) + 1));

				$(window).off('resize', helpers.resize)

				if(!p) p = {};

				self.shell({
					name :  'image',
					el :   el.images,
					inner : html,
					display : 'table',
					animation : false,
					data : {
						data : essenseData,
						image : p.image
					},

				}, function(_p){
					
					_p.el.find('img').imagesLoadedPN(function(image){

						currentImage = deep(image, 'images.0.img');
						currentOriginal = p.image;
						
						helpers.resize();

						$(window).on('resize', helpers.resize)
						
						if(filters)
						{
							filters = !filters;
							actions.filters();
						}

						if (p.clbk)
							p.clbk()

						
					}, self.app);

				})

			},

			filters : function(p){
				if(!p) p = {};

				p.image || (p.image = essenseData.images[num])

				el.filters.html('')

				resizeFit(p.image.original, 80, 80, function(resized){
					

					self.shell({
						name :  'filters',
						el :   el.filters,
						//display : 'table',
						data : {
							data : essenseData,
							image : resized,
							filters : imageFilters
						},

					}, function(_p){
						_p.el.find('.preview').each(function(){
							actions.previewFilter($(this), p.image)
						})

						var sel = _p.el.find('.filtersSwipe');

						swipedetect(sel[0], function(swipedir, distX, distY, elapsedTime){

							
							var margin = (Number(sel.css('margin-left').replace('px', '')) + Number(distX * 1.7));

							var min = - sel.find('.filtersList').width() + sel.closest('.filtersWrapperOvf').width()


							if (margin > 0) margin = 0;

							if (margin < min) margin = min;

							//if(swipedir != 'none'){
								sel.css('margin-left', margin + 'px')
							//}

						})

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

		var make = function(){

		
			renders.image({
				image : essenseData.images[num],

				clbk : function(){

					if (essenseData.apply){	
						actions.filters()				
						actions.crop()					
					}

				}
			})

		}

		var initEvents = function(){
			
			el.arrows.on('click', events.arrows);

			el.editPanel.find('.eitem').on('click', events.edit);
			el.savePanel.find('.sitem').on('click', events.edit);
			el.exitPanel.find('.sitem').on('click', events.edit);
			
		}

		var load = {
			editRelations : function(clbk){

				if(essenseData.edit)
				{
					self.nav.api.loadRelations({

						relations : [
							{src : 'js/vendor/caman.full.min.js',			   f : 'js', require : function(){
								Caman = require('../../js/vendor/caman.full.min.js').Caman

							}}, 
							{src : 'js/vendor/cropper.js',			   f : 'js', require : function(){
								Cropper = require('../../js/vendor/cropper.js')
							}},
							{src : 'css/cropper.min.css',			   f : 'css'},

						],

					}, clbk)
				}
				else
				{
					if (clbk)
						clbk();
				}

				

			}
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

					clbk(data);
			},

			destroy : function(){

				$(window).off('resize', helpers.resize)


				el = {};
			},
			
			init : function(p){


				editMode = null;

				currentCaman = null;
				currentImage = null;
				currentOriginal = null;

				filters = false;
				applyFilters = {};

				essenseData = p.essenseData || {};

				//essenseData.images || [''];

				state.load();

				actions.initialValue();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.imagesWrapper = p.el.find('.imagesWrapper');
				el.images = p.el.find('.images');
				el.imageNavigation = p.el.find('.imageNavigation');
				el.arrows = el.imageNavigation.find('.arrow');
				el.editPanel = el.c.find('.editPanel');
				el.savePanel = el.c.find('.panel .savePanel');
				el.exitPanel = el.c.find('.panel .exitPanel');
				el.filters = el.c.find('.filters');
				el.invisibleimagewrapper = el.c.find('.invisibleimagewrapper')

				load.editRelations(function(){

					make();

					initEvents();

					p.clbk(null, p);

				})
			},

			wnd : {
				close : function(){
					if (essenseData.close)
						essenseData.close()
				},
				class : 'allscreen black withoutButtons imageGalleryEdit nobfilter',
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
	module.exports = imageGalleryEdit;
}
else{

	app.modules.imageGalleryEdit = {};
	app.modules.imageGalleryEdit.module = imageGalleryEdit;

}