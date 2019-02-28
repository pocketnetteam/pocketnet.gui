var embeding20 = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, maxImages = 6;

		var options = {

			

		}

		var errors = {
			url : "Url doesn't valid",
			imagesLength : "Max 6 Images Allowed"
		}

		var actions = {
			preloader : function(p, show){

				if(!el.c) return

				var preloader = el.c.find('.' + p + 'Part .partPreloader');

				if(show){
					preloader.fadeIn(200);
				}
				else
				{
					preloader.fadeOut(200);
				}
			},
			addImageSrc : function(src, clbk){
				var c = maxImages - 1;
				var file = {};

				if(options.images.value.length > c){

					sitemessage(errors['imagesLength'])

				}
				else
				{

					file.id = makeid();
					file.src = src;
					options.images.value.push(file)

					renders.images()
				}

				if (clbk)
					clbk()
			},
			slowUpload : function(src, clbk){

				var file = {};

				resize(src, 1080, 1080, function(resized){

					var r = resized.split(',');

					if (r[1]){

						var c = maxImages - 1;

						if(options.images.value.length > c){
							sitemessage(errors['imagesLength'])
							//el.error.html(errors['imagesLength'])
						}
						else
						{

							file.id = makeid();
							file.base64 = resized;

							options.images.value.push(file)

							renders.images()
						}

					}

					if (clbk)
						clbk()
				})
			},
			removeImage : function(id){
				removeEqual(options.images.value, {
					id : id
				})

				renders.images();
			},
			getImage : function(src, clbk){
				var img = new Image;
					img.src = src;

				img.onload = function () {
					
					if (clbk)
						clbk()
				};
			}
		}

		var events = {
			removeImage : function(){
				var id = $(this).closest('.imageContainer').attr('value')

				actions.removeImage(id);
			},
		}

		var renders = {
			url : function(url, clbk){

				var meta = self.app.platform.parseUrl(url);

				var og = self.app.platform.sdk.remote.storage[url];

				
				self.shell({
					name :  'url',
					inner : html,
					el : el.url,
					data : {
						url : url,
						og : og,
						remove : true
					},
					turi : 'share'

				}, function(p){

					if(url && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo'){
							var players = Plyr.setup('.js-player');
						}
						else
						{
							self.app.platform.sdk.remote.get(meta.url, function(og){

								if(og){
									renders.url(url)
								}

							})
						}
					}

					//p.el.find('.removelink').on('click', events.removelink)

					if (clbk)
						clbk();
				})

			},
			images : function(images, clbk){

				if(!images) images = options.images.value;

				if (images.length){

					self.shell({
						name :  'images',
						el : el.images,
						data : {
							images : images
						},

					}, function(_p){

						_p.el.find('.remove').on('click', events.removeImage)							

						_p.el.find('.image').each(function(){
							

						})

						//_p.el.find('.image').imagesLoaded
						
						
						if (clbk)
							clbk()

					})

				}

				
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var prepare = function(){
			options = {
				url : new Parameter({
					type : "URL",
					id : 'url',
					placeholder : 'Add link to external site',
					//onType : true,
					value : ''
				}),

				images : {
					isValid : function(){
						return true;
					},
					value : []
				}
			}

			options.url._onChange = function(v){

				actions.preloader('left', true)

				if (checkUrlForImage(v)){

					

					actions.addImageSrc(v, function(){
						actions.preloader('left', false)

						options.url.value = ''

						options.url.el.val('')
					})
				}
				else
				{
					renders.url(v, function(){
						actions.preloader('left', false)
					})
				}
			}
		}

		var initEvents = function(){
			
			ParametersLive([options.url], el.c)

			initUpload({
				el : el.upload,
	
				ext : ['png', 'jpeg', 'jpg'],

				dropZone : el.c.closest('.wnd'),

				multiple : true,

				action : function(file, clbk){

					actions.slowUpload(file.base64, clbk)
					
				},

				onSuccess : function(){
					el.c.addClass('right')
					el.c.removeClass('left')
				}
			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				prepare()

				options.images.value = [];
				options.url.value = '';

				var data = {
					options : options
				};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.upload = el.c.find('.upload');
				el.images = el.c.find('.images');
				el.error = el.c.find('.error');
				el.url = el.c.find('.url')

				initEvents();

				p.clbk(null, p);
			},
			wnd : {
				header : "",
				buttons : {

					close : {
						class : "close",
						html : '<i class="fa fa-times"></i> Close',
						fn : function(wnd, wndObj){


						}
					}

				},
				close : function(){
				},
				success : function(_wnd, _wndObj){
					wndObj = _wndObj;
					wnd = _wnd;
				},
				noInnerScroll : true,
				class : 'embeding20'
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
	module.exports = embeding20;
}
else{

	app.modules.embeding20 = {};
	app.modules.embeding20.module = embeding20;

}