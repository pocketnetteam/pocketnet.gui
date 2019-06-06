var article = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, art, ed, editor, t;

		var wordsRegExp = /[,.!?;:()<> \n\r]/g

		var errors = {
			message : self.app.localization.e('emptymessage')
		}

		var actions = {
			newart : function(){
				return self.app.platform.sdk.articles.empty()
			},

			complete : function(){

				if (ed.save)
					ed.save(art)

				events.close();

				if (ed.complete)
					ed.complete(art)
			},

			change : function(cnt){
				art.content = cnt;

				art.time = Math.floor((new Date().getTime()) / 1000)

				if (ed.save)
					ed.save(art)
			},

			changecaption : function(v){
				art.caption.value = v;

				art.time = Math.floor((new Date().getTime()) / 1000)

				if (ed.save)
					ed.save(art)
			},

			trx : function(share, clbk){
				el.c.addClass('loading')


				if (ed.share){
					share.aliasid = ed.share.aliasid
				}
				self.sdk.node.transactions.create.commonFromUnspent(

					share,

					function(_alias, error){

						topPreloader(100)

						el.c.removeClass('loading')

						if(!_alias){
							

							if (clbk){
								clbk(false, errors[error])
							}
							else{
								

								var t = self.app.platform.errorHandler(error, true);

								if (t){
									sitemessage(t)
								}
							}
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

								console.log('alias', alias)

								art.txid = alias.txid;
								art.ptime = Math.floor((new Date().getTime()) / 1000)
		
								self.app.platform.sdk.user.survey()

								actions.complete();
							}

							catch (e){
								console.log(e)
							}
						}

					},

					p
				)
			},

			fromShare : function(share){
				var art = self.app.platform.sdk.articles.empty();

					art.caption.value = share.caption.v
					art.content = [{
						value : share.message.v
					}]

				return art;
			},	

			add : function(){
				var share = new Share();

				var text = self.app.platform.sdk.articles.echo(art)

					share.message.set(text)
					share.caption.set(art.caption.value)

					share.images.set(self.app.platform.sdk.articles.getImages(text))

					//share.images.set(art.images) 

					share.tags.set(actions.tagsFromText(text)) 

					share.settings.v = 'a'
					share.settings.videos = self.app.platform.sdk.articles.getVideos(text)


				var error = share.validation()

				if(!error){

					var dialogtext = "Do you really want to publish this article?";

					if(ed.share){
						dialogtext = "Do you really want to change and publish this article?";
					}

					dialog({
						html : dialogtext,
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),

						class : 'zindex',

						success : function(){

							text = filterXSS(text, {
								stripIgnoreTag : true,
								whiteList: {
									a: ["href", "title", "target"],
									br : ["style"],
									b : ["style"],
									span : ["style"],
									figure : ["style"],
									figcaption : ["style", "class"],
									i : ["style"],
									img : ["src", "width", "height"],
									div : ["class", "data-plyr-provider", "data-plyr-embed-id"],
									p : [],
									ul : [],
									ol : [],
									li : [],
									h2 : [],
									h1 : [],
									h3 : [],
									h4 : [],
									h5 : [],
									em : [],
									u : [],
									blockquote : [],
									strong : [],
									picture : ['img-type'],
									source : ['srcset', 'type'],
								}
							});

							share.message.set(text)
							actions.trx(share)
						}
					})

					
					
				}
				else
				{
					if(errors[error]){
						sitemessage(errors[error])
					}
				}

			},
			tagsFromText : function(text){
				var words = text.split(wordsRegExp);

				var tags = _.filter(words, function(w){
					if(w[0] == '#'){

						w = w.replace(/#/g, '')

						if(!w) return false

						return true

					}
				})

				_.each(tags, function(tag, i){

					tags[i] = tag.replace(/\#/g, '')
					
				})

				return tags;
				
			}
		}

		var events = {
			authorclose : function(){

				self.nav.api.load({
					open : true,
					href : 'author?address=' + self.app.user.address.value.toString('hex'),
					history : true,
				})

				self.closeContainer();

				if (ed.closeContainer){
					ed.closeContainer()
				}
			},
			changecaption : function(){
				var v = $(this).val()

				actions.changecaption(v)
				
			},
			change : function(){
				t = slowMade(function(){

					var cnt = self.app.platform.sdk.articles.lightVideo(editor.serialize())


					actions.change(cnt);

				}, t, 300)
				
			},
			close : function(){

				if (ed.close)
					ed.close()

				self.closeContainer()
			},
			add : function(){
				actions.add()
			},

			goto : function(){
				if(art.txid){
					self.closeContainer()

					if (ed.closeContainer)
						ed.closeContainer()

					self.nav.api.load({
						open : true,
						href : 'index?s=' + art.txid,
						history : true
					})
				}
			}
		}

		var renders = {
			
			art : function(art, clbk){

				el.caption.val(art.caption.value)

				
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			
			el.back.on('click', events.close)
			el.caption.on('keyup', events.changecaption)
			el.add.on('click', events.add)
			el.goto.on('click', events.goto)

			el.c.find('.uic').on('click', events.authorclose)
			el.c.find('.username').on('click', events.authorclose)

		}

		var make = function(clbk){

			editor = new MediumEditor('.edt', {
				delay: 500,
			    targetBlank: true,
			    toolbar: {
			        buttons: ['bold', 'italic', 'underline', 'anchor', 'quote'],
			        diffLeft: 25,
			        diffTop: 10,
			    },
			    anchor: {
			        placeholderText: 'Type a link',
			        customClassOption: 'btn',
			        customClassOptionText: 'Create Button'
			    },
			    paste: {
			        cleanPastedHTML: true,
			        cleanAttrs: ['style', 'dir'],
			        cleanTags: ['label', 'meta']
			    },
			    anchorPreview: {
			        hideDelay: 300
			    },
			    placeholder: {
			        text: 'Text',
			        hideOnClick : false
			    }
			});

			$(function () {
			    $('.edt').mediumInsert({
			        editor: editor,
			        addons: { 
				        images: { 

				            label: '<span class="fas fa-camera"></span>', // (string) A label for an image addon
				       
				            deleteScript: function(file, $el){

				            	self.sdk.imagesH.delete(file)

				            },

				            fileDeleteOptions: {}, // (object) extra parameters send on the delete ajax request, see http://api.jquery.com/jquery.ajax/
				            
				            preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
				            captions: true, // (boolean) Enable captions
				            captionPlaceholder: 'Type caption for image (optional)', // (string) Caption placeholder
				            
				            autoGrid: 3, // (integer) Min number of images that automatically form a grid
				            formData: {}, // DEPRECATED: Use fileUploadOptions instead
				            
				            upload : function(img, clbk){

				            	resize(img, 1080, 1080, function(resized){

									var r = resized.split(',');

									if (r[1]){

						            	self.ajax.run({
											type : "POST",
											imgur : true,
											data : {
												Action : "image",
												image : r[1]
											},

											success : function(data){

												var l = deep(data, 'data.link')

												if (l){
													//art.images.push(l)

													var h = deep(data, 'data.deletehash')

													if (h){
														self.sdk.imagesH.add(l, h)
													}

												}
												else
												{
													l = 'https://pocketnet.app/img/imagenotuploaded.jpg'
												}

												if (clbk)
													clbk(l)

											},

											fail : function(){
												l = 'https://pocketnet.app/img/imagenotuploaded.jpg'

												if (clbk)
													clbk(l)
											}
										})

						            }
						        })

				            	

				            },

				            fileUploadOptions: {
				                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
				            },
				            
				            styles: { // (object) Available image styles configuration
				                wide: { // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
				                    label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
				                    added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
				                    removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
				                },
				                left: {
				                    label: '<span class="fa fa-align-left"></span>'
				                },
				                right: {
				                    label: '<span class="fa fa-align-right"></span>'
				                },
				                grid: {
				                    label: '<span class="fa fa-th"></span>'
				                }
				            },
				            actions: { // (object) Actions for an optional second toolbar
				                remove: { // (object) Remove action configuration
				                    label: '<span class="fa fa-times"></span>', // (string) Label for an action
				                    clicked: function ($el) { // (function) Callback function called when an action is selected
				                        var $event = $.Event('keydown');
				                        
				                        $event.which = 8;
				                        $(document).trigger($event);   
				                    }
				                }
				            },
				            messages: {
				                acceptFileTypesError: 'This file is not in a supported format: ',
				                maxFileSizeError: 'This file is too big: '
				            },
				            uploadCompleted: function ($el, data) {				      

				            	events.change()
				            }, // (function) Callback function called when upload is completed
				            uploadFailed: function (uploadErrors, data) {} // (function) Callback function called when upload failed
				        },
				        embeds: { // (object) Embeds addon configuration
				            label: '<span class="fas fa-play"></span>', // (string) A label for an embeds addon
				            placeholder: 'Paste a YouTube, Vimeo link and press Enter', // (string) Placeholder displayed when entering URL to embed
				            //oembedProxy: 'https://medium.iframe.ly/api/oembed?iframe=1', // (string/null) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of Iframely. *Null* will make the plugin use pre-defined set of embed rules without making server calls.
				            styles: { // (object) Available embeds styles configuration
				                wide: { // (object) Embed style configuration. Key is used as a class name added to an embed, when the style is selected (.medium-insert-embeds-wide)
				                    label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
				                    added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
				                    removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
				                },
				                left: {
				                    label: '<span class="fa fa-align-left"></span>'
				                },
				                right: {
				                    label: '<span class="fa fa-align-right"></span>'
				                }
				            },
				            actions: { // (object) Actions for an optional second toolbar
				                remove: { // (object) Remove action configuration
				                    label: '<span class="fa fa-times"></span>', // (string) Label for an action
				                    clicked: function ($el) { // (function) Callback function called when an action is selected
				                        var $event = $.Event('keydown');
				                        
				                        $event.which = 8;
				                        $(document).trigger($event);   
				                    }
				                }
				            }
				        }
				    }
			    });


				editor.subscribe('editableKeyup', function(){
					events.change()
				})

				editor.subscribe('editablePaste', function(){
					events.change()
				})

				editor.subscribe('editableBlur', function(){
					events.change()
				})

				renders.art(art)

				var players = Plyr.setup('.js-player');

				/*if(typeof _Electron != 'undefined'){
					const electronSpellchecker = require('electron-spellchecker');

					// Retrieve required properties
					const SpellCheckHandler = electronSpellchecker.SpellCheckHandler;
					const ContextMenuListener = electronSpellchecker.ContextMenuListener;
					const ContextMenuBuilder = electronSpellchecker.ContextMenuBuilder;
			
					// Configure the spellcheckhandler
					window.spellCheckHandler = new SpellCheckHandler();
					window.spellCheckHandler.attachToInput();
			
					// Start off as "US English, America"
					window.spellCheckHandler.switchLanguage('en-US');
			
					// Create the builder with the configured spellhandler
					var contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);
			
					// Add context menu listener
					var contextMenuListener = new ContextMenuListener((info) => {
						contextMenuBuilder.showPopupMenu(info);
					});
				}*/

				if (clbk)
					clbk()
			});

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {};

				art = ed.art || actions.newart(parameters().aid)

				if(ed.share) art = actions.fromShare(ed.share)

				console.log(art)

				var data = {
					art : art,
					ed : ed
				};

				clbk(data);

			},

			destroy : function(){
				self.app.nav.api.history.removeParameters(['aid'])

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.caption = el.c.find('.caption')
				el.content = el.c.find('.content')
				el.back = el.c.find('.back')
				el.add = el.c.find('.add')
				el.goto = el.c.find('.goto')

				initEvents();

				make()

				p.clbk(null, p);
			},
			wnd : {
				class : "allscreen a100 article articlebtn"
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
	module.exports = article;
}
else{

	app.modules.article = {};
	app.modules.article.module = article;

}