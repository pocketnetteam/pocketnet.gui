var embeding = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){


		var primary = deep(p, 'history');

		var el, type = null, subtype = null, on, maxImages = 6;
		var ed;
		var options = {

			url : new Parameter({
				type : "URL",
				id : 'url',
				placeholder : self.app.localization.e('e13102'),
				onType : true
			}),

			images : {
				isValid : function(){
					return true;
				},
				value : []
			},


		}

		var errors = {
			url : self.app.localization.e('e13103'),
			imagesLength : self.app.localization.e('e13104')
		}

		var actions = {
			
			check : function(type){

				if(!el.error) return

				if (options[type].isValid(options[type].value)){

					el.error.html('')

					return true;
				}
				else
				{
					el.error.html(errors[type])
				}
			},
			removeImage : function(id){
				removeEqual(options.images.value, {
					id : id
				})

				renders.images();

				el.error.html('')
			},
			add : {
				url : function(){

					if(actions.check('url')){
						on.added(options.url.value)

						
						self.closeContainer()
					}
				},


				images : function(){
					if(actions.check('images')){

						var images = [];

						_.each(options.images.value, function(v){
							if(v.base64)
								images.push(v.base64)
						})

						on.added(images)
						
						self.closeContainer()
					}
				}
			},
			
			slowUploadGif : function(file, clbk){
			
						
				file.id = makeid();
				file.slow = true;
				file.base64 = file.base64;

				options.images.value.push(file)


				if (clbk)
					clbk()
			
			},
			slowUpload : function(file, clbk){
				resize(file.base64, 1080, 1080, function(resized){

					var r = resized.split(',');

					if (r[1]){

						
						file.id = makeid();
						file.slow = true;
						file.base64 = resized;

						options.images.value.push(file)


					}

					if (clbk)
						clbk()
				})
			},

			upload : function(file, clbk){
				resize(file.base64, 1080, 1080, function(resized){

					var r = resized.split(',');

					if (r[1]){

						var c = maxImages - 1;

						if(options.images.value.length > c){
							el.error.html(errors['imagesLength'])
						}
						else
						{
							el.error.html('')
							file.id = makeid();
							file.loading = true;
							options.images.value.push(file)

							renders.images()

							app.imageUploader.uploadImage({
								Action : "image",
								image : r[1]
							}, 'imgur').then((data) => {
		
								file.loading = false;

								file.src = deep(data, 'data.link') || 'https://'+self.app.options.url+'/img/imagenotuploaded.jpg';
								
								renders.images()
								
								if (clbk)
									clbk()
		
							}, (err) => {
		
								file.src = 'https://'+self.app.options.url+'/img/imagenotuploaded.jpg';

								renders.images()
								
								if (clbk)
									clbk()
		
							})

						}


					}

				})
			}
		}

		var events = {
			action : function(){
				var _type = $(this).attr('action') || type;

				actions.add[_type]()
			},
			removeImage : function(){
				var id = $(this).closest('.imageContainer').attr('value')

				actions.removeImage(id);
			},
			
		}

		var renders = {
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
							var i = $(this);


						})
						
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

		var initEvents = function(){

			setTimeout(function(){
				el.c.find('input').focus()
			}, 300)
			
			el.c.find('input').on('change', events.action)

			el.action.on('click', events.action)

			if(type == 'images'){

				renders.images()

				if(ed.value){

					var file = {
						base64 : ed.value
					}

					actions.slowUpload(file)

				}

				initUpload({
					el : el.upload,
		
					ext : ['png', 'jpeg', 'jpg', 'gif'],

					dropZone : el.c.closest('.wnd'),

					multiple : true,

					action : function(file, clbk){

						if(file.ext == 'gif'){
							actions.slowUploadGif(file, clbk)
						}
						else
						{
							actions.slowUpload(file, clbk)
						}

						
						
					},

					onSuccess : function(){
						actions.add.images()
					}
				})
			
			}
			else
			{
				ParametersLive([options[type]], el.c)
			}

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				type = p.settings.essenseData.type;
				on = p.settings.essenseData.on;

				sender = p.settings.essenseData.sender;
				receiver = p.settings.essenseData.receiver;
				balance = p.settings.essenseData.balance

				ed = p.settings.essenseData;

				subtype = p.settings.essenseData.subtype || null;

				if(p.settings.essenseData.storage){

					_.each(options, function(option, key){
						option.value = p.settings.essenseData.storage[key]

						if(key == 'images'){
							option.value = []
						}
					})

				}

				var data = {
					type : type,
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
				el.error = el.c.find('.error');
				el.action = el.c.find('.action');
				el.upload = el.c.find('.upload');
				el.images = el.c.find('.imagesMi')


				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				header : "",
				buttons : {
					close : {
						class : "save",
						html : '<i class="fa fa-check"></i> ' + self.app.localization.e('add'),
						fn : function(wnd, wndObj){
							actions.add[type]()
						}
					},

					discard : {
						class : "close",
						html : '<i class="fa fa-times"></i> ' + self.app.localization.e('close'),
					},
				},
				close : function(){

					if (ed.on.close)
						ed.on.close()

				},
				success : function(_wnd, _wndObj){
					wndObj = _wndObj;
					wnd = _wnd;
				},
				class : 'embeding normalizedmobile',
				//showbetter : true
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
	module.exports = embeding;
}
else{

	app.modules.embeding = {};
	app.modules.embeding.module = embeding;

}