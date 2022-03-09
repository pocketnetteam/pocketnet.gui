

var articlev = (function(){

	var self = new nModule();

	var essenses = {};



	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, editor, art, taginput, delay, external = null;

		var errors = {

			nothingchange : {
				message : 'art_nothingchange',
				action : function(){


				}
			},

			validatetags : {
				message : 'art_validatetags',
				action : function(){

					setTimeout(function(){

						if (el.c){
							actions.plissing(el.c.find('.arttags'))
						}

					}, 200)

				}
			},
			validatecover : {
				message : 'art_validatecover',
				action : function(){

					setTimeout(function(){
						
						if (el.c){
							actions.plissing(el.c.find('.uploadcover'))
						}
					}, 200)
				}
			},
			validatecaption : {
				message : 'art_validatecaption',
				action : function(){
					setTimeout(function(){

						if (el.c){
							el.c.find('.captionWrapper').focus()
						}
						
					}, 500)
					
				}
			},
			validatecontent : {
				message : 'art_validatecontent',
				action : function(){}
			},
		}

		var helpers = {
			size : function(){
				var share = self.app.platform.sdk.articles.share(art)

				var size = share.size()

				var percent = size / share.sizelimit()

				var edjs = new edjsHTML(null, app)

				var words = edjs.words(art.content)

				var minutes = words / 150

				return {
					size, percent, words, minutes
				}
				
			}
		}
		
		var actions = {

			plissing : function(el){

				self.app.platform.api.plissing({
					el,
					time : 2000
				})
			},

			competed : function(){
				if(!self.app.platform.sdk.articles.itisdraft(art)){
					return false
				}

				if(!art.cover) return false

				return true
			},

			complete : function(){

				successCheck()
				self.closeContainer()

			},

			trx : function(share){

				return new Promise((resolve, reject) => {
				

					self.sdk.node.transactions.create.commonFromUnspent(

						share,

						function(_alias, error){

							if(!_alias){

								

								return reject(error)
							}
							else
							{

								try{

									var alias = new pShare();
						
										alias._import(_alias, true)
										alias.temp = true;
										alias.address = _alias.address

									if (share.aliasid) alias.edit = "true"	
										
									self.app.platform.sdk.node.shares.add(alias)
									
								}

								catch (e){

									actions.complete();
								}

								return resolve(_alias)
							}

						}
					)

				})
			},	


			error : function(e){

				if(e && e.text){
					
					if (errors[e.text]){

						sitemessage(self.app.localization.e(errors[e.text].message ? errors[e.text].message : 'e13293'))
						
						errors[e.text].action ? errors[e.text].action() : ''

						return

					}
					
				}

				if (e.toString && self.app.platform.errors[e.toString()]){

					var ers = self.app.platform.errors[e.toString()].message || self.app.platform.errors[e.toString()].text

					if (ers){
						sitemessage(typeof ers == 'function' ? ers() : ers)
					}
					else{
						sitemessage(e.toString())
					}

					return
				}


				sitemessage(e)
			},

			validate : function(art){

				if(!art.tags.length) return 'validatetags'
				if(!art.cover) return 'validatecover'
				if(!art.caption.value) return 'validatecaption'
				if(!art.content || !art.content.blocks || !art.content.blocks.length ) return 'validatecontent'
				
			},

			publish : function(){

				var _art = art

			
				globalpreloader(true)

				return actions.saveEditor().then(r => {

					var error = actions.validate(art)

					if (error) return Promise.reject({
						text : error
					})

					return self.app.platform.sdk.articles.uploadresources(art).then(r => {

						self.app.platform.sdk.articles.save()

						destroy()

						art = _art

						make()

						if (external) {
							external.destroy()
							external = null
						}

						var share = self.app.platform.sdk.articles.share(art)


						if (art.shash) {

							if(art.shash == share.shash()){
								return Promise.reject({
									text : 'nothingchange'
								})
							}
							
						}

						return actions.trx(share)
						
					}).then(alias => {

						art.txid = alias.txid;
						art.ptime = Math.floor((new Date().getTime()) / 1000)

						self.app.platform.sdk.articles.save()

						actions.complete();

						globalpreloader(false)

					})

				}).catch(e => {

					globalpreloader(false)

					actions.error(e)

					return Promise.resolve()

				})
			},

			preview : function(){

				return actions.saveEditor().then(r => {

					var share = self.app.platform.sdk.articles.share(art)

					var alias = share.alias()
						alias.address = self.app.user.address.value

					renders.preview(alias)

				})
				
			},

			edittags : function(show){

				var inp = el.tagsinputwrapper.find('input')

				if(show){
					el.cover.addClass('tagsinput')

					setTimeout(function(){
						inp.focus()
					}, 50)
					
				}	
				else{
					inp.blur()
					el.cover.removeClass('tagsinput')
				}
			},

			_removetag : function(tag){
				removeEqual(art.tags, tag)

				
			},

			removeTags: function(tags){

				_.each(tags, function(tag){
					actions._removetag(tag)
				})

				actions.save()
				actions.apply()
			},

			removeTag : function(tag){

				actions._removetag(tag)
				actions.save()
				actions.apply()

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
				actions.apply()

			},

			addTag : function(tag){

				if(!actions._addtag(tag)){
					sitemessage(self.app.localization.e('e13162'))
				}
				else
				{
					actions.save()
					actions.apply()
				}
			},

			apply : function(){

				art.time = new Date();

				renders.status()
				renders.sizeinfo()

			},

			save : function(){

				if (self.app.platform.sdk.articles.itisdraft(art)){
					self.app.platform.sdk.articles.storage || (self.app.platform.sdk.articles.storage = [])
								
					var f = _.find(self.app.platform.sdk.articles.storage, function(a){
						if(art.id == a.id) return true
					})

					if(!f){
						self.app.platform.sdk.articles.storage.unshift(art)
					}
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

				return editor.save().then(outputData => {

					art.content = outputData

					actions.save()

					actions.apply()

					return Promise.resolve()

				})

			},

			setArticle : function(nart){
				nart || (nart = self.app.platform.sdk.articles.empty(null, 2))

				art = nart

				destroy()

				make()
			}
		}

		var events = {

			saveedited : function(){
				dialog({
					html:  self.app.localization.e('usavechanges'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),
		
					success: function () {
						actions.publish()
					},
		
					fail: function () {

					},
	
					class : 'zindex'
				})
			},

			publish : function(){
				dialog({
					html:  self.app.localization.e('publishquestion'),
					btn1text: self.app.localization.e('dyes'),
					btn2text: self.app.localization.e('dno'),
		
					success: function () {
						actions.publish()
					},
		
					fail: function () {

					},
	
					class : 'zindex'
				})
			}
		}	

		var renders = {

			sizeinfo : function(){

				var size = helpers.size()

				self.shell({
					animation : false,
					name : 'sizeinfo',
					data : {
						size
					},
					el : el.sizeinfo

				},
				function(p){
					
				})

			},

			preview : function(share){
				if (share){

					self.app.platform.papi.postpreview(share, null, function(p){

						external = p

					}, {
						inWnd : true
					})

				}
			},

			settings : function(clbk){

				self.app.platform.sdk.ustate.me(function(_mestate){

					var u = _mestate

					if(u.reputation > 50 || !u.trial) {

						var selector = new Parameter({

							type : "VALUES",
							name : "Visibility",
							possibleValues : ['0','1','2'],
							possibleValuesLabels : [
								self.app.localization.e('visibletoeveryone'), 
								self.app.localization.e('visibleonlytosubscribers'),
								self.app.localization.e('visibleonlytoregistered')
							],
							defaultValue : '0',
							value : (art.visibility || 0) + ''

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
								art.visibility = Number(selector.value)

								actions.save()
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

					el.cover.addClass('hascover')
					el.blackmatte.addClass('hascover')
				}

				else{
					bgImagesClear(el.cover)
					el.cover.removeClass('hascover')
					el.blackmatte.removeClass('hascover')
				}
			},

			tags : function(){
				
				self.shell({

					animation : false,
					name : 'tags',
					data : {
						tags : art.tags,
						language : art.language
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

			publish : function(){
				
				self.shell({

					animation : false,
					name : 'publish',
					data : {
						art : art
					},
					el : el.publishWrapper

				},
				function(p){	
					
					p.el.find('.publish.action').on('click', function(){
						events.publish()
					})

					p.el.find('.publish.saveedited').on('click', function(){
						events.saveedited()
					})
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

			},

			status : function(){
				
				self.shell({

					animation : false,
					name : 'status',
					data : {
						art : art,
						itisdraft : self.app.platform.sdk.articles.itisdraft(art),
						lastdraft : self.app.platform.sdk.articles.findlastdraft()
					},
					el : el.status

				},
				function(p){
					p.el.find('.openlastdraft').on('click', function(){
						var id = $(this).attr('draft')

						changeArticle(id)
					})
				})

			},

			captionvalue : function(){
				el.caption.val(art.caption.value || '')
			}
		}

		var state = {
			save : function(){

			},
			load : function(id){

				art = null

				if (id){
					art = self.app.platform.sdk.articles.getbyid(id)
				}

				if(!art)
					art = self.app.platform.sdk.articles.empty(null, 2)


			}
		}

		var initEvents = function(){

			el.showpreview.on('click', function(){
				actions.preview()
			})

			el.removeCover.on('click', function(){
				art.cover = ''
				actions.save()

				actions.apply()

				renders.cover()
			})

			el.backfromedittags.on('click', function(){
				actions.edittags(false)
			})

			el.c.find('.forbackmain').on('click', function(){
				actions.edittags(false)
			})
			
			el.caption.on('change', function(){
				var text = $(this).val()

				art.caption.value = text || ''

				renders.captiondouble()
				
				actions.save()
				actions.apply()
			})

			el.myarticles.on('click', function(){

				self.nav.api.load({
					open : true,
					href : 'articlesv',
					inWnd : true,
					history : true,
					essenseData : {
						current : art.id,	

						create : function(){

							changeArticle()
							return true
						},

						select : function(art){
							changeArticle(art.id)

							return true
						}
					}
				}, function(p){
				})

				//actions.setArticle()
			})

			initUpload({
				el : el.c.find('.uploadcover'),
	
				ext : ['png', 'jpeg', 'jpg', 'gif', 'jfif', 'webp'],

				dropZone : el.c.find('.bgwrapper'),

				action : function(file, clbk){

					self.app.platform.papi.editImage(file.base64, {
						autoCropArea : 0.95,
						apply : true

					}).then( base64 => {

						art.cover = base64

						renders.cover()

						actions.save()

						actions.apply()

						clbk()
					})

				
					
				},
				
			})
		}

		var destroy = function(){

			actions.edittags(false)

			if (taginput) {
				taginput.destroy()
				taginput = null
			}

			if (external) external.destroy()
				external = null

			if (editor && editor.destroy)
				editor.destroy();

			editor = null

			art = null
		}

		var uploadImage = function(file){
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

		var make = function(){


			if (self.app.height && !isTablet())
				el.cover.height(self.app.height / 2.333 + 'px')

			//actions.save()

			renders.tgstags()
			renders.settings()
			renders.captiondouble()
			renders.status()
			renders.cover()
			renders.captionvalue()
			renders.publish()


			editor = new EditorJS({

				holderId : 'editorjs',
				placeholder: self.app.localization.e('art_placeholder'),
				data: art.content || {},
				tools: {
					paragraph: {
						class: window.Paragraph,
					},
					header: {
						class: window.Header,
						levels: [2, 3, 4],
        				defaultLevel: 2,
						shortcut: 'CMD+SHIFT+H',
					},

					image: {
						class : window.ImageTool,
						config : {
							uploader : {
								uploadByFile : uploadImage
							}
						}
					},
					carousel: {
						class: window.Carousel,
						config : {
							uploader : {
								uploadByFile : uploadImage
							}
						}
					},

					linkTool: {
						class: window.LinkTool,
						config: {

							fetch : function(url){

								return self.app.api.fetch('urlPreviewFormatted', {url}).then(r => {

									return r
								})

							}

						}
					},

					delimiter: window.Delimiter,

					quote: {
						class: window.Quote,
						inlineToolbar: true,
						shortcut: 'CMD+SHIFT+O',

						config: {
						  quotePlaceholder: 'Enter a quote',
						  captionPlaceholder: 'Quote\'s author',
						},

					},

					
					/*warning: {
						class: window.Warning,
						shortcut: 'CMD+SHIFT+W'
					},*/

					list: {
						class: window.List,
						inlineToolbar: true,
					},

					
					embed : {
						class: window.Embed,
						config: {
							services: {
								youtube: true,
								vimeo: true
							}
						}
					}

					
				},

				onChange : function(){

					delay = slowMade(function(){

						actions.saveEditor()

					}, delay,  1000)

				}

			});

			editor.isReady.then(() => {
				/** Do anything you need after editor initialization */

				renders.sizeinfo()
			})

			.catch((reason) => {
			});

			

		}

		var setArticle = function(id){
			state.load(id);

			self.app.nav.api.history.addRemoveParameters([], {
				art : art.id
			}, {
				replaceState : true
			})
		}

		var changeArticle = function(id){
			destroy()

			setArticle(id)

			make()
		}

		return {
			primary : primary,

			parametersHandler : function(){
				changeArticle(parameters().art)
			},

			clearparameters : ['art'],

			getdata : function(clbk, p){

				var data = {};

				var editing = deep(p, 'settings.essenseData.editing') || null

				if (editing){
					art = self.app.platform.sdk.articles.fromshare(editing)

					
				}
				else{
					setArticle(deep(p, 'settings.essenseData.article') || parameters().art)
				}

				data.art = art

				clbk(data);

			},

			destroy : function(){

				destroy()
				
				el = {};
				
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.tgsWrapperMain = el.c.find('.tagswrapper div')
				el.tagsinputwrapper = el.c.find('.tagsinputwrapper .forinput')
				el.settings = el.c.find('.settingsWrapper')
				el.captiondouble = el.c.find('.articlecaptiondouble')
				el.caption = el.c.find('.captionWrapper textarea')
				el.cover = el.c.find('.bgwrapper')
				el.head = el.c.find('.aheadermain')
				el.blackmatte = el.c.find('.blackmatte')
				el.backfromedittags = el.c.find('.backfromedittags')
				el.removeCover = el.c.find('.removeCover')
			
				el.share = el.c.find('.shareWrapper')
				el.status = el.c.find('.truestatuswrapper')
				el.myarticles = el.c.find('.myarticles')
				el.showpreview = el.c.find('.preview')
				el.publishWrapper = el.c.find('.publish')
				el.sizeinfo = el.c.find('.sizeinfoWrapper')

				if(art.editing){
					el.c.addClass('editing')
				}
			
				initEvents();
				make()

				p.clbk(null, p);
			},

			wnd : {			
				class : 'articleWindow withoutButtons fullscreenActive',
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