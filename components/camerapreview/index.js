var camerapreview = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, prlx;
		var eximw = ''
		var exim = ''

		
		var options = {
			x: 0,
			y: 0,
			width: self.app.width,
			height: self.app.height,
			camera: typeof CameraPreview != 'undefined' ? CameraPreview.CAMERA_DIRECTION.BACK : '',
			toBack: true,
			tapFocus: true,
			previewDrag: false,
			storeToFile: false,
			disableExifHeaderStripping: false
		}

		var ed = {}

		var data = {
			current : null,
			selected : {},
			photolibraryaccessdecline : false,
			gallery : false
		}

		var photos = []
		var renderedphotos = {}
		var images = {}
		var thubnails = {}
		var imagesadding = false

		var saveimage = function(url){

            return new Promise((resolve, reject) => {

                var dummy = () => {
                    var id = makeid()

                    thubnails[id] = url
                    images[id] = url

                    var libraryItem = {
                        id : id,
                        photoURL : url,
                        thumbnailURL : url
                    }
                    
                    resolve(libraryItem)
                }
                if (window.cordova && window.cordova.plugins.photoLibrary && window.cordova.plugins.photoLibrary.saveImage ){
                    window.cordova.plugins.photoLibrary.saveImage(url, 'Bastyon', function (libraryItem) {
                        resolve(libraryItem)
                    }, (e) => {
    
                        dummy()
                        
                    });
                }
                else{
                    dummy()
                }
                
            }) 

            
        }

		var useselected = function(){

            var promises = _.map(data.selected, (s, i) => {
                return getimage(i)
            })

            return Promise.all(promises).then(r => {
                var imgs = [];

                _.each(data.selected, (s, i) => {
                    if (images[i])
                        imgs.push(images[i])
                })

                
                return imgs

            }).then(imgs => {

				var fls = _.map(imgs, (img) => {
					return {
						ext : 'jpg',
						base64 : img
					}
				})

				data.selected = {}


				if (ed.action){

					return Promise.all(_.map(fls, (file) => {
						return new Promise(resolve => {
							ed.action(file, resolve)
						})
					}))

				}

				return imgs
			}).then((imgs) => {

				if (ed.onSuccess){
					ed.onSuccess(imgs)
				}

				self.stop()

				return imgs


			})
      
        }

		var selectcurrent = function(){
            if (data.current){

                saveimage(data.current).then(r => {

                    photos.unshift(r)

                    data.current = null
					

					//renders.state()

                    if(!ed.multiple){

						data.selected[r.id] = true

						renders.state()

                        useselected().then((imgs) => {
							
						})
						
                    }
                    else{
						setselected(r.id, true)
                        actions.removepicture()

						renders.imagesPrepend([r])

						data.gallery = true
						renders.gallery()

						el.galleryimages[0].scrollTop = 0
                    }

					
                    
                })
            }
            
        }

		var getthubnails = function(ids){
			return Promise.all(_.map(ids, (id) => {
				return getthubnail(id).catch(e => {return Promise.resolve(null)})
			})).then(urls => {
				return Promise.resolve(_.filter(urls, (url) => {
					return url
				}))
			})
		}	

		var getthubnail = function(id){

			if(thubnails[id]){
				return Promise.resolve(thubnails[id])
			}

			return new Promise((resolve, reject) => {
				cordova.plugins.photoLibrary.getThumbnail(id, (data) => {
	
					var urlCreator = window.URL || window.webkitURL;
	
					thubnails[id] = urlCreator.createObjectURL(data);

					resolve(thubnails[id])
				
				}, (e) => {
					
					reject(e)
	
				},{ // optional options
					thumbnailWidth: 125,
					thumbnailHeight: 125,
					quality: 0.8
				})
			})

            
        }

		var permissions = {
			get : function(){
				return new Promise((resolve, reject) => {
	
					if (window.cordova && window.cordova.plugins.photoLibrary){
						window.cordova.plugins.photoLibrary.requestAuthorization(() => {
							data.photolibraryaccessdecline = false
	
							resolve()
						}, () => {
							data.photolibraryaccessdecline = true
		
							reject('decline')
						}, {
							read: true
						});
					}
	
					else
					{
						resolve()
					}
	
					
				})
			},
			getagain : function(){
				return permissions.get().then(getlibrary)
			},
			init : function(){
	
				if (!data.photolibraryaccessdecline){
					return permissions.get().then(getlibrary)
				}

				return Promise.reject()
				
			},
		}

		var getlibrary = function(){

			if(window.cordova){

				if (window.cordova.plugins.photoLibrary)
					return new Promise((resolve, reject) => {

						window.cordova.plugins.photoLibrary.getLibrary(
							(result) => {
	
								photos = result.library
	
								_.each(photos, (p) => {
									getthubnail(p.id)
								})

								//// ?


								resolve()
	
							},
							(err) => {
								
								permissions.init().then(resolve).catch(reject)
	
							},
							{ // optional options
								thumbnailWidth: 128,
								thumbnailHeight: 128,
								quality: 0.85,
								includeAlbumData: true // default
							}
						)

					})
			}

			/**/ 

			for(var i = 0; i < 40; i++){
				photos.push({id : i})
				thubnails[i] = exim
				images[i] = exim
			}

				

			return Promise.resolve()

			/* */

			return Promise.reject('notsupported')
		}

		var getimage = function(id){

            if(images[id]){
                return Promise.resolve(images[id])
            }

            if(window.cordova && window.cordova.plugins.photoLibrary){

                return new Promise((resolve, reject) => {

                    cordova.plugins.photoLibrary.getPhotoURL(id, (url) => {

                        fetchLocal(url).then(({data}) => {

							console.log("DATA", data)

							return Base64Helper.fromFile(data).then(base64 => {
								images[id] = base64;
    
								resolve(images[id])
							})

                            

                        }).catch(reject)
    
                    }, (e) => {
    
                        console.error("E", e)
        
                        reject(e)
                        
                    })
                })
               
                
            }
            else{
                return Promise.reject('empty')
            }
            
        }

		var actions = {
			startcamera : function(){
				if (data.cameraenabled){
					CameraPreview.startCamera(options);
				}
				else{
				}

				
			},
			stopcamera : function(){
				if (data.cameraenabled){
					CameraPreview.stopCamera();
				}
			},

			cameranotfound : function(){
				el.c.addClass('cameranotavailable')
			},

			removepicture : function(){
				data.current = null
	
				renders.state()
			},

			takepicture : function(){
				if (!data.cameraenabled){
					data.current = eximw
	
					renders.state()
				}
				else{
					CameraPreview.getSupportedPictureSizes((dimensions) => {

						dimensions = _.filter(dimensions, function(d){
							return d.width * d.height < 3 * 1000 * 1000
						})
		
						var maxdimension = _.max(dimensions, function(d){
							return d.width * d.height
						})
		
						CameraPreview.takePicture(
							{width : maxdimension.width, height : maxdimension.height, quality: 95}, 
							(base64PictureData) => {
			
								data.current = 'data:image/jpeg;base64,' + base64PictureData
	
								renders.state()
		
							}, (e) => {
		
							})
					})
				}
				
			}
		}

		var compute = function(){
			//data = {}

			data.cameraenabled = typeof CameraPreview != 'undefined'

			
		}

		var events = {
			
		}

		var renders = {
			state : function(){
				self.shell({

					name :  'state',
					el :   el.state,
					data : data,

				}, function(p){

					p.el.find('.removepicture').on('click', function(){
						actions.removepicture()
					})

					p.el.find('.takepicture').on('click', function(){
						actions.takepicture()
					})

					p.el.find(".selectpicture").on('click', function(){
						selectcurrent()
					})

				})
			},

			gallery : function(){
				if (data.gallery){
					el.c.addClass('showgallery')
					renders.imagesbyscroll()
				}
				else{
					el.c.removeClass('showgallery')
				}
			},

			selectedButton : function(){
				var hasselected = _.filter(data.selected, (s) => {
					return s
				})

				if (hasselected.length){
					el.c.addClass('hasselected')
				}
				else{
					el.c.removeClass('hasselected')
				}
			},

			imagesPrepend : function(photos){
				renders.images({
					photos,
					inner : prepend
				})
			},

			images : function(p = {}){
				if(!p.count) p.count = 20

				var images = _.first(_.filter(p.photos || photos, (p) => {
					return !renderedphotos[p.id]
				}), p.count)

				if (images.length){

					imagesadding = true

					getthubnails(_.map(images, (image) => {
						return image.id
					})).then(() => {
						_.each(images, (p) => {
							renderedphotos[p.id] = true
						})
	
						self.shell({
	
							name :  'images',
							el :   el.galleryimages.find('.imagescontent'),
							data : {
								images,
								thubnails,
								multiple : ed.multiple,
								selected : data.selected
							},
		
							inner : p.inner || append
		
						}, function(p){
							
							imagesadding = false
						})
					})

				}
				else{

				}
				
			},

			imagesbyscroll : function(p){
				if (el.galleryimages.scrollTop() + 1000 > self.app.height && !imagesadding && data.gallery){
					renders.images()
				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var setselected = function(id, value){
			data.selected[id] = value

			renders.selectedButton()
		}

		var initEvents = function(){
			
			el.c.find('.back').on('click', function(){
				self.stop()
			})

			prlx = new SwipeParallaxNew({

				el : el.c,
				transformel : el.c,

				allowPageScroll : 'vertical',

				directions : {
					left : {
						cancellable : true,

						positionclbk : function(px){

							var percent = Math.max(100 - 100 * (px / self.app.width), 0)


							//el.another.css('opacity', percent)
							el.another.css('transform', 'translate3d('+percent+'%,0,0)')
							el.wnds.css('transform', 'translate3d('+percent+'%,0,0)')
						},


						restrict : true,
						trueshold : 30,
						clbk : function(){

							self.stop()

						}

					}
				}


			}).init()

			el.c.find('.gallerytoggle').on('click', () => {
				data.gallery = !data.gallery

				renders.gallery()
				renders.state()
			})

			el.galleryimages.on('scroll', _.throttle(() => {
				renders.imagesbyscroll()
			}, 30))

			el.c.find('.useselected').on('click', () => {
				useselected().then((imgs) => {
							
				})
			})


			el.galleryimages.on('click', '.imagewrapper', function(){
				var el = $(this)

				var id = el.attr('img')

				if (ed.multiple){
					if (data.selected[id]){
						setselected(id, false)
						el.removeAttr('selected')
					}
					else{
						setselected(id, true)
						el.attr('selected', 'selected')
					}
				}
				else{

					data.selected[id] = true
					useselected().then((imgs) => {
							
					})
				}


				
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				ed = p.settings.essenseData
				var data = {};

				clbk(data);

			},

			destroy : function(){

				data.selected = {}

				if(prlx) prlx.destroy()
	
				prlx = null

				window.requestAnimationFrame(() => {
			
					app.el.html.addClass('cameraenabledend')
					app.el.html.removeClass('cameraenabled')
					app.el.html.removeClass('cameraenabledrun')

					if (el.another){
						el.another.css('transform', '')
					}
	
					if (el.wnds){
						el.wnds.css('transform', '')
					}

					
					

				})

				setTimeout(() => {

					actions.stopcamera()

					window.requestAnimationFrame(() => {

	
						
						
						app.el.html.removeClass('cameraenabledend')
	
	
						el.c.empty()
	
						el = {};
						
					})
				}, 300)

				
			},
			
			init : function(p){
				renderedphotos = {}
				imagesadding = false

				window.requestAnimationFrame(() => {
			
					app.el.html.addClass('cameraenabledrun')

				})

				setTimeout(() => {

					window.requestAnimationFrame(() => {

						app.el.html.addClass('cameraenabled')
						app.el.html.removeClass('cameraenabledrun')

					})
				}, 300)

		


				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.another = $('.appcnt, .matrixchatwrapper')
				el.wnds = $('.wnd')
				el.state = el.c.find('.state')
				el.galleryimages = el.c.find('.gallery .images')
				initEvents();

				p.clbk(null, p);

				compute()

				

				getlibrary().then(() => {
					data.gallery = true
					renders.gallery()
				}).catch((e) => {
					data.gallery = false
					renders.gallery()
				}).then(() => {
					renders.selectedButton()
					actions.startcamera()
					renders.state()

					el.c.addClass('ready')
				})

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
	module.exports = camerapreview;
}
else{

	app.modules.camerapreview = {};
	app.modules.camerapreview.module = camerapreview;

}