

var articlev = (function(){

	var self = new nModule();

	var essenses = {};



	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, editor, art, taginput;

		var imagesHelper = {
			slowUploadGif : function(file, storage, clbk){
			
						
				file.id = makeid();
				file.slow = true;
				file.base64 = file.base64;

				storage.push(file)


				if (clbk)
					clbk()
			
			},
			slowUpload : function(file, storage , clbk){
				resize(file.base64, 1080, 1080, function(resized){

					var r = resized.split(',');

					if (r[1]){

						
						file.id = makeid();
						file.slow = true;
						file.base64 = resized;

						storage.push(file)


					}

					if (clbk)
						clbk()
				})
			},
		}

		var actions = {

			edittags : function(show){

				var inp = el.tagsinputwrapper.find('input')

				if(show){
					el.head.addClass('tagsinput')

					setTimeout(function(){
						inp.focus()
					}, 50)
					
				}	
				else{
					inp.blur()
					el.head.removeClass('tagsinput')
				}
			},

			editImage : function(src){

				var images = [
					{
						original : src,
						index : 0
					}
				]

				return new Promise((resolve, reject) => {

					self.nav.api.load({
						open : true,
						id : 'imageGalleryEdit',
						inWnd : true,
				
						essenseData : {
							edit : true,
							initialValue : 0,
							images : images,
							apply : true,
							crop : {
								aspectRatio : 2.5,
								style : 'apply',
								autoCropArea : 1,
							},
					
							success : function(i, editclbk){
	
								resize(images[0].original, 1920, 1080, function(resized){
									var r = resized.split(',');
					
									if (r[1]){
					
										editclbk()
	
										resolve(resized)
					
									}
									else{
										reject("error")
									}
								
								})
	
				
							}
						}
					})

				})

				
			},
			_addtag : function(tag){

				if (art.tags.length < 5){
					
					removeEqual(art.tags, tag)

					art.tags.push(tag)

					return true
				}

				return false
			},

			addTags : function(tags){

				_.find(tags, function(tag){
					if(!actions._addtag(tag)){
						sitemessage(self.app.localization.e('e13162'))

						return true
					}
				})

				actions.save()

			},
			addTag : function(tag){

				if(!actions._addtag(tag)){
					sitemessage(self.app.localization.e('e13162'))
				}
				else
				{
					actions.save()
				}
			},

			save : function(){

				return

				self.app.platform.sdk.articles.storage || (self.app.platform.sdk.articles.storage = [])
								
				var f = _.find(self.app.platform.sdk.articles.storage, function(a){
					if(art.id == a.id) return true
				})

				if(!f){
					self.app.platform.sdk.articles.storage.unshift(art)
				}

				self.app.platform.sdk.articles.save()
			},

			remove : function(id){

				removeEqual(self.app.platform.sdk.articles.storage, {
					id : id
				})

				self.app.platform.sdk.articles.save()
			},

			saveEditor : function(){

				editor.save().then(outputData => {
					art.content = outputData

					renders.captiondouble()

					self.app.platform.sdk.articles.save()
				})

			}
		}

		var events = {
			
		}

		var renders = {
			settings : function(clbk){

				self.app.platform.sdk.ustate.me(function(_mestate){

					var u = _mestate

					if(u.reputation > 50 || !u.trial) {


						var selector = new Parameter({

							type : "VALUES",
							name : "Visibility",
							id : 'organizationCode',
							dbId : "INS_BROKER_CODE",
							possibleValues : ['0','1','2'],
							possibleValuesLabels : [
								self.app.localization.e('visibletoeveryone'), 
								self.app.localization.e('visibleonlytosubscribers'),
								self.app.localization.e('visibleonlytoregistered')
							],
							defaultValue : '0',
							value : '0'

						})

						self.shell({
							name :  'settings',
							el : el.settings,
							turi : 'share',
							data : {
								selector : selector
							},

						}, function(p){

							ParametersLive([selector], p.el)

							selector._onChange = function(){
								
							}

							if (clbk)
								clbk();
						})
					}

					else{

						el.settings.html('')

						if(clbk) clbk()
					}
				})
			},

			cover : function(){
				if (art.cover){
					el.cover.attr('image', art.cover)

					bgImages(el.c)
				}
				else{
					bgImagesClear(el.cover)
				}
			},

			tags : function(){
				
				self.shell({

					animation : false,
					name : 'tags',
					data : {
						tags : art.tags,
						language : app.localization.key
					},
					el : el.tgsWrapperMain

				},
				function(p){
					p.el.find('.arttags').on('click', function(){
						actions.edittags(true)
					})
				})

			},

			tgstags : function(){
				renders.tgs()
				renders.tags()
			},

			tgs : function(clbk){
				self.nav.api.load({
					open : true,
					id : 'taginput',
					el : el.tagsinputwrapper,
					eid : 'sharetags' + p.mid,
					animation : false,
					essenseData : {
						tags : function(){
							return art.tags
						},

						removeTag : function(tag){
							actions.removeTag(tag)
							renders.tgstags()
						},

						removeTags : function(tag){
							actions.removeTags(tag)
							renders.tgstags()
						},

						addTag : function(tag){
							actions.addTag(tag)
							renders.tgstags()
						},

						addTags : function(tags){
							actions.addTags(tags)
							renders.tgstags()
						},
						filter :  function(v){
							return v.tag != 'pkoin_commerce'
						},

						language : function(){
							return self.app.localization.key
						}
					},

					clbk : function(e, p){

						if(!el.c) return

						taginput = p

						if(clbk) clbk()
					}
				})
			},

			captiondouble : function(){
				
				self.shell({

					animation : false,
					name : 'caption',
					data : {
						art : art
					},
					el : el.captiondouble

				},
				function(p){

				})

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				art = self.app.platform.sdk.articles.empty(null, 2)

				console.log("ART", art)
			}
		}

		var initEvents = function(){

			el.backfromedittags.on('click', function(){
				actions.edittags(false)
			})
			
			el.caption.on('change', function(){
				var text = $(this).val()

				art.caption.value = text || ''

				console.log('text', text)

				renders.captiondouble()

				actions.save()
			})

			initUpload({
				el : el.c.find('.uploadcover'),
	
				ext : ['png', 'jpeg', 'jpg', 'gif', 'jfif'],

				dropZone : el.c.find('.bgwrapper'),

				action : function(file, clbk){

					self.app.platform.papi.editImage(file.base64, {

						aspectRatio : 2.5,
						apply : true

					}).then( base64 => {

						art.cover = base64

						renders.cover()

						actions.save()

						clbk()
					})

				
					
				},
				
			})
		}

		

		var make = function(){

			if(!el.c) return

			console.log("window.ImageTool", window.ImageTool)

			editor = new EditorJS({

				holderId : 'editorjs',
				placeholder: 'Let`s write an awesome story!',
				data: art.content || {},
				tools: {
					image: {
						class : window.ImageTool,
						config : {
							uploader : {
								uploadByFile : function(file){

									return new Promise((resolve) => {
										const reader = new FileReader();
								
										reader.readAsDataURL(file);
										reader.onload = (e) => {

											resize(e.target.result, 1920, 1080, function(resized){
												return resolve({
													success : 1,
													file : {
														url : resized
													}
												})
											})


										};

									})

								}
							}
						}
					}
				},

				onChange : function(){
					actions.saveEditor()
				}
			});

			editor.isReady.then(() => {
				console.log('Editor.js is ready to work!')
				/** Do anything you need after editor initialization */
			})

			.catch((reason) => {
				console.log(`Editor.js initialization failed because of ${reason}`)
			});

			renders.tgstags()
			renders.settings()
			renders.captiondouble()
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};

				if (taginput) {
					taginput.destroy()
					taginput = null
				}

				if (editor)
					editor.destroy();

				editor = null
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.tgsWrapperMain = el.c.find('.tagswrapper div')
				el.tagsinputwrapper = el.c.find('.tagsinputwrapper .forinput')
				el.settings = el.c.find('.settingsWrapper')
				el.captiondouble = el.c.find('.articlecaptiondouble')
				el.caption = el.c.find('.captionWrapper textarea')
				el.cover = el.c.find('.bgwrapper')
				el.head = el.c.find('.aheadermain')
				el.backfromedittags = el.c.find('.backfromedittags')
				el.caption.val(art.caption.value || '')

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
	module.exports = articlev;
}
else{

	app.modules.articlev = {};
	app.modules.articlev.module = articlev;

}