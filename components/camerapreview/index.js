var camerapreview = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, prlx;
		var eximw = ''
		var exim = ''

		

		var ed = {}

		var data = {
			current : null,
			selected : {},
			photolibraryaccessdecline : false,
			gallery : false,
			direction : 'BACK'
		}

		var getcameraoptions = function(){
			return {
				x: 0,
				y: 0,
				width: self.app.width,
				height: self.app.height,
				camera: typeof CameraPreview != 'undefined' ? CameraPreview.CAMERA_DIRECTION[data.direction] : '',
				toBack: true,
				tapFocus: true,
				previewDrag: false,
				storeToFile: false,
				disableExifHeaderStripping: false
			}
		}

		var photos = []
		var renderedphotos = {}
		var images = {}
		var thubnails = {}
		var imagesadding = false
		var libraryProcessId = null

		

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

					permissions.get().then(() => {
						window.cordova.plugins.photoLibrary.saveImage(url, null, function (libraryItem) {
							resolve(libraryItem)
						}, (e) => {
	
							console.error('e', e)
		
							dummy()
							
						});
					}).catch(e => {
						console.error(e)
						dummy()
					})
					
					
				

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
						ext : fkit.extensionBase64(img),
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
							setDeclineLibrary(false)
	
							resolve()
						}, () => {
							setDeclineLibrary(true)
		
							reject('decline')
						}, {
							read: true,
							write : true
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

						var pid = libraryProcessId = makeid()

						window.cordova.plugins.photoLibrary.getLibrary(
							(result) => {

								if(pid != libraryProcessId) return

								photos = photos.concat(result.library)

								if(result.isLastChunk){
									libraryProcessId = null
								}
	
								//photos = result.library
								
	
								/*_.each(photos, (p) => {
									getthubnail(p.id)
								})*/

								//// ?


								resolve()
	
							},
							(err) => {

								libraryProcessId = null
								
								permissions.init().then(resolve).catch(reject)
	
							},
							{ // optional options
								chunkTimeSec: 0.5,
								//thumbnailWidth: 128,
								itemsInChunk: 20,
								//thumbnailHeight: 128,
								//quality: 0.5,
								includeAlbumData: true // default
							}
						)

					})
			}

			/**/ 

			/*for(var i = 0; i < 40; i++){
				photos.push({id : i})
				thubnails[i] = exim
				images[i] = exim
			}*/

				

			//return Promise.resolve()

			/* */

			setDeclineLibrary(true)

			return Promise.reject('notsupported')
		}

		var setDeclineLibrary = function(v){
			data.photolibraryaccessdecline = v

			if(v){
				el.c.addClass('photolibraryaccessdeclined')
			}
			else{
				el.c.removeClass('photolibraryaccessdeclined')
			}
		}

		var getimage = function(id){

            if(images[id]){
                return Promise.resolve(images[id])
            }

            if(window.cordova && window.cordova.plugins.photoLibrary){

                return new Promise((resolve, reject) => {

                    cordova.plugins.photoLibrary.getPhoto(id, (data) => {


						return Base64Helper.fromFile(data).then(base64 => {
							images[id] = base64;

							resolve(images[id])
						})

    
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
			camerastate : function(){
				if(!data.gallery){
					actions.startcamera()
				}
				else{
					actions.stopcamera()
				}
			},
			startcamera : function(){

				console.log("STARTCAMERA", data)

				if (data.cameraenabled && !data.gallery){
					console.log("HERE")
					CameraPreview.startCamera(getcameraoptions());
				}
			},
			stopcamera : function(){

				console.log("stopcamera", data)


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

			changedirection : function(){
				if (data.direction == 'BACK')
					data.direction = 'FRONT'
				else{
					data.direction = 'BACK'
				}
	
				actions.stopcamera()
				actions.startcamera()
			},

			takepicture : function(){

				console.log('data', data)

				if (!data.cameraenabled){
					data.current = eximw
	
					renders.state()
				}
				else{
					CameraPreview.getSupportedPictureSizes((dimensions) => {

						console.log('dimensions,', dimensions)

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

								console.log('data2', data)
	
								renders.state()
		
							}, (e) => {
								console.error(e)
							})
					}, (e) => {
						console.error(e)
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
					data : {...data},

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

					p.el.find('.changedirection').on('click', function(){
						actions.changedirection()
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

				actions.camerastate()
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

			el.c.find('.addAccessToLibrary').on('click', function(){
				permissions.getagain().catch(e => {

				})
			})

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

			self.app.platform.clbks._focus.camera = function(time){
				console.log("HERE")
				actions.startcamera()
			}
			self.app.platform.clbks._unfocus.camera = function(time){
				console.log("HERE2")
				actions.stopcamera()
			}


			initUpload({
				el : el.openexternal,
				ext : ed.ext,
				dropZone : el.c,
				app : self.app,
				multiple : ed.multiple,
				action : ed.action,
				onError : ed.onError,
				onSuccess : function(){

					if(ed.onSuccess) ed.onSuccess()

					self.stop()
				}
			})

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				ed = p.settings.essenseData

				console.log("ED", ed)

				clbk({});

			},

			destroy : function(){

				delete self.app.platform.clbks._unfocus.camera
				delete self.app.platform.clbks._focus.camera

				data.selected = {}

				if(prlx) prlx.destroy()
	
				prlx = null

				self.app.mobile.unsleep(false)


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
						
						if (el.c)
							el.c.empty()
	
						el = {};
						
					})
				}, 300)

				
			},
			
			init : function(p){
				renderedphotos = {}
				imagesadding = false
				photos = []

				window.requestAnimationFrame(() => {
			
					app.el.html.addClass('cameraenabledrun')

				})

				setTimeout(() => {

					window.requestAnimationFrame(() => {

						app.el.html.addClass('cameraenabled')
						app.el.html.removeClass('cameraenabledrun')

					})
				}, 300)

		
				self.app.mobile.unsleep(true)

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.another = $('.appcnt, .matrixchatwrapper')
				el.wnds = $('.wnd')
				el.state = el.c.find('.state')
				el.galleryimages = el.c.find('.gallery .images')
				el.openexternal = el.c.find('.openexternal')
				initEvents();

				p.clbk(null, p);

				compute()

				getlibrary().catch(e => {
					console.log(e)
				}).then(() => {

					data.gallery = true
					renders.gallery()

				}).then(() => {

					renders.selectedButton()
					//actions.startcamera()
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