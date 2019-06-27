var share = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var primary = deep(p, 'history');

		var el, currentShare = null, essenseData;

		var focusfixed = false;

		var actions = {

			unfocus : function(){
				if (el.c)
					el.c.addClass('unfocus').removeClass('focus')
			},

			waitActions : function(){
				self.app.platform.sdk.user.waitActions(function(r){

					if(!el.c) return

					if(!r || r == 'inf'){

						el.c.removeClass('waitActions')

					}
					else
					{
						el.c.addClass('waitActions')
					}
				})
			},

			autoFilled : function(){



				actions.filled('i', currentShare.images.v.length != 0)
				actions.filled('u', currentShare.url.v)
				actions.filled('t',  currentShare.tags.v.length!= 0)
					
				actions.filled('cm', currentShare.message.v || currentShare.caption.v)

			},

			filled : function(key, f){
				var _el = el.c.find('.draggablepart[part="'+key+'"]');

				if (f){
					_el.addClass('filled');
				}
				else{
					_el.removeClass('filled');
				}

				
			},
			checkUrlForImage : function(url){

				var ex = ['.jpg', '.gif', '.png', '.jpeg']


				url = url.split("?")[0].toLowerCase();

				var m = _.find(ex, function(e){
					if(url.indexOf(e) > -1){
						return true;
					}
				})

				if(m) return true;
			},
			embeding20 : function(value){

				var storage = currentShare.export(true)

				self.nav.api.load({
					open : true,
					id : 'embeding20',
					inWnd : true,

					essenseData : {
						storage : storage,
						value : value,
						on : {
							added : function(value){

								if(type == 'url' && value && actions.checkUrlForImage(value)){

									type = 'images';
									value = value
								}

								currentShare[type].set(value)

								if (renders[type])
									renders[type]();
							}
						}
					}
				})
			},
			embeding : function(type, value){

				var storage = currentShare.export(true)

				if(type == 'article'){
					self.nav.api.load({
						open : true,
						id : 'articles',
						inWnd : true,

						history : true,

						essenseData : {
							storage : storage,
							value : value,
							on : {
								added : function(value){

									
								}
							}
						}
					})
				}
				else
				{
					focusfixed = true;

					self.nav.api.load({
						open : true,
						id : 'embeding',
						inWnd : true,

						essenseData : {
							type : type,
							storage : storage,
							value : value,
							on : {
								close : function(){
									setTimeout(function(){
										focusfixed = false;
									}, 200)
									
								},
								added : function(value){

									var result = true;

									if(type == 'url' && value && actions.checkUrlForImage(value)){

										type = 'images';
										value = value
									}

									if(!_.isArray(value)) value = [value]

									_.each(value, function(v, i){

										result = currentShare[type].set(v)

										if(!essenseData.share){
											state.save()
										}
									})

									if(!result && errors[type]){

										sitemessage(errors[type])

									}								

									if (renders[type])
										renders[type]();
								}
							}
						}
					})
				}

				
			},
			addTag : function(tag){

				//tag = tag.replace(/#/g, '')

				if(!currentShare.tags.set(tag)){

					el.error.html("You can enter less that 30 tags")

					/*dialog({
						html : ,
						class : "one"
					})*/
				}
				else
				{

					el.error.html('')

					if(!essenseData.share){
						state.save()
					}
				}

			},
			editImage : function(r){
				var m = _.map(currentShare.images.v, function(src, i){

					return {
						original : src,
						index : i
					}
					
				})

				var f = _.filter(m, function(f){
					if(f.original.indexOf('data:image') > -1){
						return true;
					}
				})

				focusfixed = true;

				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,

					essenseData : {
						edit : true,
						initialValue : r,
						images : f,

						/*apply : true,

						crop : {
							aspectRatio : 1 / 1,
							style : 'round apply',
							autoCropArea : 0.9,
						},*/

						close : function(){
							setTimeout(function(){
								focusfixed = false;
							}, 200)
						},

						success : function(images, clbk){
							_.each(currentShare.images.v, function(img, i){

								var edited = _.find(f, function(eimg){
									if(eimg.index == i) return true;
								})

								if (edited){
									currentShare.images.v[i] = edited.original
								}

							})

							if(!essenseData.share){
								state.save()
							}

							renders.images(clbk);
						}
					}
				})
			},
			removeImage : function(r){

				var image = currentShare.images.v.splice(r, 1)[0];

				el.c.find('.imageContainer').each(function(){
					var el = $(this)

					var v = el.attr('value');

					if (v > r){
						el.attr('value', v - 1)
					}

					if(v == r){
						el.remove();
					}
				})

				var elimages = el.c.find('.imagesEmbWr')

				elimages.isotope()

				//renders.images()

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split(image).join('');

				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
			},
			removelink : function(){

				var l = currentShare.url.v

				currentShare.url.set();

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split(l).join('');


				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
				/*el.message.val(text);
				el.message.change();*/
			},
			removeTag : function(tag){
				currentShare.tags.remove(tag)

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split('#' + tag).join(tag);

				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
			},

			applyText : function(text){
				currentShare.message.set(text);
			},

			caption : function(caption){
				currentShare.caption.set(caption);
			},

			linksFromText : function(text){
				if(!currentShare.url.v){
					var r = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi; 
					

					var matches = text.match(r);


					if(matches && matches.length > 0){

						_.each(matches, function(url){
							if(actions.checkUrlForImage(url)){

								if (currentShare.images.v.indexOf(url) == -1){
									currentShare.images.set(url)

									renders['images']()
								}

							}
							else
							{
								if(currentShare.url.v) return;

								currentShare.url.set(url)

								renders['url']()
							}
						})

						

						
					}
				}
			},

			tagsFromText : function(text){
				var words = text.split(wordsRegExp);

				var newtags = _.filter(words, function(w){
					if(w[0] == '#'){

						w = w.replace(/#/g, '')

						if(!w) return false

						return !currentShare.tags.have(w)

					}
				})

				if(newtags.length){

					_.each(newtags, function(tag){

						tag = tag.replace(/\#/g, '')

						if(!currentShare.tags.set(tag)){
							
						}
					})

					renders.tags()

				}
				
			},

			post : function(clbk, p){

				
				el.postWrapper.removeClass('showError');

				if(essenseData.hash == currentShare.shash()){

					el.postWrapper.addClass('showError');
					el.error.html("There aren't changes in Post")
					return
				}

				el.c.addClass('loading')
				topPreloader(50)

				currentShare.uploadImages(self.app, function(){

					self.sdk.node.transactions.create.commonFromUnspent(

						currentShare,

						function(_alias, error){

							topPreloader(100)

							el.c.removeClass('loading')

							if(!_alias){
								

								if (clbk){
									clbk(false, errors[error])
								}
								else{
									el.postWrapper.addClass('showError');

									var t = self.app.platform.errorHandler(error, true);

									if (t)

										el.error.html(t)
								}
							}
							else
							{
								//sitemessage("Success")

								try{

									var alias = new pShare();
										alias._import(_alias, true)
										alias.temp = true;
										alias.address = _alias.address

									if(currentShare.aliasid) alias.edit = "true"	

									self.app.platform.sdk.node.shares.add(alias)

									if(!essenseData.notClear){
										currentShare.clear();

										if(!essenseData.share){
											state.save()
										}

										make();	
									}

																	

								}

								catch (e){
									console.log(e)
								}

								if (essenseData.post){
									essenseData.post()
								}

								if (clbk)
									clbk(true)


								actions.unfocus();

								_scrollTop(0);
							}

						},

						p
					)

				})

			},
			error : function(onlyremove){
				var error = currentShare.validation();

				if (error && !onlyremove){
					el.postWrapper.addClass('showError')
					el.error.html(errors[error])

					if(error == 'message'){
						el.c.find('.emojionearea-editor').focus()
					}

					if(error == 'tags'){
						el.c.find('.tgs input').focus()
					}

					

					return true
				}
				else
				{
					el.postWrapper.removeClass('showError')
					el.error.html('')

					return false
				}
			},

			eTextChange : function(c){

				var text = c.getText();

				actions.tagsFromText(text);

				actions.applyText(text);

				actions.linksFromText(text);

				renders.caption();

				if(!essenseData.share){
					state.save()
				}
			},

			
		}

		var errors = {
			message : self.app.localization.e('emptymessage'),
			tags : self.app.localization.e('emptytags'),
			images : self.app.localization.e('maximages'),
            url : "Please add a few words to tell Pocketpeople about your link. What is it about? Why is it important? What is your opinion?",
            error_video : 'Your link to video is invalid. Please load valid video URL.'
		}

		var events = {
			unfocus : function(e){

				

				if (el.c.hasClass('focus') && !focusfixed && el.c.has(e.target).length === 0){
					actions.unfocus();
				}
		
			},
			selectTime : function(){

				var d = new Date()

					d = d.addMinutes(10);

				var date = {
					day : null,
					hour : d.getHours(),
					minutes : d.getMinutes()
				}

				if(essenseData.time){
					date.day = essenseData.time.yyyymmdd()
					date.hour = essenseData.time.getHours()
					date.minutes = essenseData.time.getMinutes()
				}

				self.fastTemplate('sharedate', function(html){

					dialog({
						html : html,

						btn1text : self.app.localization.e('daccept'),

						class : "one sharedate",

						clbk : function(d){


						},	

						wrap : true,

						success : function(d){
							var day = d.el.find('.day').val()
							var hours = d.el.find('.hours').val()
							var minutes = d.el.find('.minutes').val()

							var date = strToDateSmall(day)

								date = date.addHours(hours)

								date = date.addMinutes(minutes)

							var now = new Date();

							if (now < date){

								essenseData.time = date;

								el.selectTime.find('.selectedTime').html(convertDate(dateToStr(date)))

								if (essenseData.selectTime)
									essenseData.selectTime(date)

								return true;
							}
							else
							{

								sitemessage(self.app.localization.e('pastdate'))

								return false;
							}
						}
					})

					html

				}, {
					date : date
				})

				
			},
			changePostTime : function(){

				var _el = $(this);
				var type = $(this).val();

				if (type == 'p'){

					dialog({
						html : self.app.localization.e('sharenow'),
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),

						success : function(){

							if (essenseData.type)
								essenseData.type(type)


							
						},

						fail : function(){
							_el.val('w')
						}
					})
					

					return;
				}
				
				if (type == 't'){
					var error = actions.error();

					if (error){
						_el.val('w')
					}

					else
					{
						if(essenseData.time && essenseData.time < new Date()){

							essenseData.time = null;

							el.selectTime.find('.selectedTime').html(self.app.localization.e('timenotselected'))							

							if (essenseData.selectTime)
								essenseData.selectTime(null)

						}
					}
				}

				type = $(this).val();

				if (essenseData.type){
					essenseData.type(type)
				}

			},
			changeAddress : function(){
				var address = $(this).val();

				var icon = el.c.find('.usericon')

				var src = deep(app, 'platform.sdk.users.storage.'+address+'.image') || '';

				if(src){
					icon.html('');

					icon.attr('image', src);

					bgImages(el.c.find('.icon'))
				}
				else
				{
					icon.html('<svg width="30" height="30" data-jdenticon-value="'+address+'"></svg>')

					icon.attr('image', '');
					icon.css('background', '#F9F6F6');

					icon.css('background-image', '');
					icon.css('background-size', '');
					icon.css('background-position', '');
					icon.css('background-repeat', '');

					el.c.find('[data-jdenticon-value]').each(function(){
						var t = $(this);
						var v = t.data('jdenticon-value')

						t.html(jdenticon.toSvg(v, t.width()))
					})
				}

				

				if (essenseData.address){
					essenseData.address(address)
				}

			},

			change : function(){
				actions.error(true);

				actions.autoFilled()
			},

			post : function(){
				var error = actions.error();

				if (!error){
					actions.post()
				}
				
			},
			embeding : function(){
				var type = $(this).attr('embeding')

				if(type == 'embeding20'){
					actions.embeding20()
				}
				else
				{
					actions.embeding(type)
				}

				
			},
			addTag : function(tag){

				actions.addTag(tag)

			 	renders.tags()
			},
			caption : function(){
				var caption = $(this).val()

				actions.caption(caption)
			},

			eTextChange : function(editor, event){

				var c = this;

				actions.eTextChange(c)
				
			},

			textChange : function(){
				var text = $(this).val();

				actions.tagsFromText(text);

				actions.applyText(text);

				actions.linksFromText(text);

				renders.caption();
			},
			eText : function(editor, e){

				var char = String.fromCharCode(e.keyCode || e.which);
				var text = this.getText();

				if ((wordsRegExp).test(char)) {

					
					actions.tagsFromText(text);
					actions.linksFromText(text);

				}

				actions.applyText(text);

				renders.caption();

				if(!essenseData.share){
					state.save()
				}

				
			},
			text : function(e){

				var char = String.fromCharCode(e.keyCode || e.which);
				var text = $(this).val()

				if ((wordsRegExp).test(char)) {

					
					actions.tagsFromText(text);
					actions.linksFromText(text);

				}

				actions.applyText(text);

				renders.caption();

				
			},
			removeTag : function(){
				var tag = $(this).closest('.tag').attr('tag')

				actions.removeTag(tag)

				$(this).closest('.tag').remove()
			},

			removelink : function(){
				actions.removelink()

				renders.url();
			}


		}

		var renders = {

			tags : function(clbk){

				el.tags.find('.tag').remove()

				self.shell({
					name :  'tags',
					inner : append,
					el : el.tags,
					data : {
						tags : currentShare.tags.get()
					},

				}, function(p){

					p.el.find('.remove').on('click', events.removeTag)

					if (clbk)
						clbk();
				})
			},

			tagsResults : function(results, clbk){

				self.shell({
					name :  'tagsResult',
					data : {
						results : results
					},

				}, function(_p){
					if (clbk)
						clbk(_p.rendered);
				})
			},

			all : function(){

				el.eMessage[0].emojioneArea.setText(currentShare.message.v);
				el.cpt.find('input').val(currentShare.caption.v || "")

				el.cpt.val()

				renders.tags();
				
				renders.url();

				renders.caption();

				renders.images();
			},

			caption : function(){

				

				if(currentShare.caption.v || currentShare.message.v.length > 100){

					if(!el.cpt.hasClass('active'))
						el.cpt.addClass('active');

				}
				else
				{
					el.cpt.removeClass('active');
				}
			},

			url : function(clbk){

				var url = currentShare.url.v;

				var meta = self.app.platform.parseUrl(url);

				var og = self.app.platform.sdk.remote.storage[url];

				
				self.shell({
					name :  'url',
					inner : html,
					el : el.urlWrapper,
					data : {
						url : currentShare.url.v,
						og : og,
						remove : true,

						share : currentShare
					},

				}, function(p){

					if(currentShare.url.v && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute') {
							console.log("INITPLAYER")
                            Plyr.setup('.js-player', function(player) {
								console.log('player', player)

								player.muted = false
							});
						}
						else
						{
							self.app.platform.sdk.remote.get(meta.url, function(og){

								if(og){
									renders.url()
								}

							})
						}
					}

					else{
						if(og){

							var images = p.el.find('img');

								p.el.find('img').imagesLoaded({ background: true }, function(image) {

									_.each(image.images, function(i, index){
										if(i.isLoaded){
											$(images[index]).addClass('active')

											if(i.img.naturalWidth > 500){
												p.el.addClass('bigimageinlink')
											}
										}
										else
										{
											$(images[index]).closest('.image').css('display', 'none')
										}
									})
									
								});

								p.el.find('.removeImage').on('click', function(){

									focusfixed = true;

									currentShare.settings.image = 'r'

									renders.url()

									state.save()

									setTimeout(function(){
										focusfixed = false;
									}, 200)
								})

						}
					}

					p.el.find('.removelink').on('click', events.removelink)

					if (clbk)
						clbk();
				})
				
			},

			images : function(clbk){
				self.shell({
					name :  'images',
					turi : 'embeding',
					inner : html,
					el : el.images,
					data : {
						images : _.map(currentShare.images.v || [], function(i, index){
							return {
								src : i,
								id : index
							}
						})
					},

				}, function(p){

					p.el.find('.remove').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.removeImage(r)
					})

					p.el.find('.edit').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.editImage(r)
					})

					p.el.find('.image').on('click', function(){

						var src = $(this).attr('i')

						if(!src) return

						var images = _.map(currentShare.images, function(i){

							return {
								src : i
							}
						})

						self.app.nav.api.load({
							open : true,
							id : 'imageGallery',
							inWnd : true,

							essenseData : {
								initialValue : src,
								idName : 'src',
								images : images
							}
						})
					})

					p.el.find('.image').imagesLoaded({ background: true }, function(image) {

						if(!isMobile()){
							var elimages = el.images.find('.imagesEmbWr')


						  	elimages.isotope({

								layoutMode: 'packery',
								itemSelector: '.imageContainer',
								packery: {
									gutter: 20
								},
								initLayout: false
							});


							elimages.on('arrangeComplete', function(){

								if (clbk)
									clbk();
			
								el.images.addClass('active')

							});

							elimages.isotope()
						}
						else
						{
							if (clbk)
								clbk();
			
							el.images.addClass('active')
						}

						


					});

					
				})
			}

		}

		var state = {
			save : function(){

				if(!currentShare){
					self.app.settings.set(self.map.id, 'currentShare', '');
				}
				else
				{
					var scs = self.app.settings.set(self.map.id, 'currentShare', currentShare.export(true));

					if(!scs){
						//self.app.settings.set(self.map.id, 'currentShare', '');
					}
				}

				
			},
			load : function(){
				var last = self.app.settings.get(self.map.id, 'currentShare')

				if (last)
					currentShare.import(last)
			}
		}

		var make = function(){
			renders.all()
		}

		var initEvents = function(){

			el.changeAddress.on('change', events.changeAddress)
			el.changePostTime.on('change', events.changePostTime)
			el.selectTime.on('click', events.selectTime)

			el.panel.on('click', events.embeding)
			el.post.on('click', events.post)


		   	el.eMessage.emojioneArea({
		    	pickerPosition : 'bottom',
		    	
		    	search : false,
		    	tones : false,
		    	autocomplete : false,

		    	attributes: {
			        spellcheck : true,
			    },

		    	events : {
		    		change : events.eTextChange,
		    		click : events.eTextChange,
		    		keyup : events.eText,

		    		onLoad : function(c,d){

		    			if (parameters().newshare){
		    				el.c.find('.emojionearea-editor').focus()
		    			}
			
						el.c.find('.emojionearea-editor').pastableContenteditable();

						el.c.find('.emojionearea-editor').on('pasteImage', function (ev, data){

							topPreloader(100)


							var r  = currentShare.images.set(data.dataURL)

							if(!r){
								sitemessage(errors.images)
							}
							else
							{
								if (renders.images)
									renders.images();
							}

							


						}).on('pasteImageStart', function(){

							topPreloader(30)

						}).on('pasteImageError', function(ev, data){

						 	topPreloader(100)

						}).on('pasteText', function (ev, data){

							actions.eTextChange(el.eMessage[0].emojioneArea)

						});


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

						

		    		}
		    	}
		    });
			
			el.caption.on('keyup', events.caption)

			currentShare.on.change.edit = events.change;
			
			//autosize(el.c.find('textarea'));

			if(!isMobile())

				el.c.find('.tooltip').tooltipster({
	                theme: 'tooltipster-light',
	                maxWidth : 600,
	                zIndex : 20,
	            }); 

			search(el.tagSearch, {
				placeholder : self.app.localization.e('addtags'),

				clbk : function(el){

				
				},

				time : 0,
			
				events : {
					/*blur : function(value){
						events.addTag(value)
					},*/
					fastsearch : function(value, clbk, e){

						console.log('fastsearch', value, e)

						if(e){
							var char = String.fromCharCode(e.keyCode || e.which);

							if ((/[,.!?;:() ]/).test(char)) {

								events.addTag(value.replace(/#/g,'').replace(/ /g,''))

								el.tagSearch.find('input').val('').focus()

								clbk(null)

								return
							}
						}


						self.app.platform.sdk.tags.search(value, function(data){
							
							renders.tagsResults(data, function(tpl){

								clbk(tpl, function(_el, helpers){

									_el.find('.result').on('click', function(){

										var tag = $(this).attr('result')

										helpers.closeResults();
										helpers.clear();

										events.addTag(tag)

									})

									_el.find('.empty').on('click', function(){

										var tag = trim(el.tagSearch.find('input').val())

										if (tag){
											helpers.closeResults();
											helpers.clear();

											events.addTag(tag)
										}

										

									})

								})

							})

						})
					},

					search : function(value, clbk, helpers){

						value = value.replace(/#/g, ' ');

						value = value.split(" ");

						value = _.filter(value, function(v){
							return v
						})

						if (value.length == 1){
							value = value[0]
						}

						events.addTag(value)

						helpers.clear();

						if (clbk)
							clbk()
					}
				},

				last : {
					get : function(){
						return [
							self.app.localization.e('tnews'), 
							self.app.localization.e('timages'), 
							self.app.localization.e('tvideos'), 
							self.app.localization.e('tmarket'), 
							self.app.localization.e('tsport')
						]
					},

					tpl : function(data, clbk){
						renders.tagsResults(data, function(tpl){

							clbk(tpl, function(el, helpers){

								el.find('.result').on('click', function(){

									var tag = $(this).attr('result')

									helpers.closeResults();
									helpers.clear();

									events.addTag(tag)

								})

							})

						})
					}
				}
				
			})

			
			var ps = {
				animation: 150,
				swapThreshold : 0.5,
				draggable : '.draggablepart',
				onUpdate: function (evt){

					var na = [];
				   
					var ps = $(list).find('.draggablepart');

					$.each(ps, function(){
						na.push($(this).attr('part'))
					})

					currentShare.settings.a = na

					if(!essenseData.share){
						state.save()
					}

					if (essenseData.changeArrange){
						essenseData.changeArrange()
					}
				},
				forceFallback : true
			}
		
			ps.handle = '.marker'
			
			var list = document.getElementById("sortableBody");

			if (list && !isMobile()){
				Sortable.create(list, ps); 
			}
			
			actions.autoFilled()

			self.app.platform.ws.messages.transaction.clbks.share = actions.waitActions

			el.c.on('click', function(){

				el.c.addClass('focus').removeClass('unfocus')

			})

			$('html').on('click', events.unfocus);
			
		}




		return {
			primary : primary,

			post : actions.post,

			make : function(){
				state.load();
				
				make();
			},

			auto : function(){
				var _p = parameters();

				if (_p.marticles && !self.app.nav.wnds['articles']){
					actions.embeding('article', null)
				}
				
			},

			getdata : function(clbk, p){

				currentShare = deep(p, 'settings.essenseData.share') || new Share();

				essenseData = deep(p, 'settings.essenseData') || {};

				if(!essenseData.share){
					state.load()
				}

				var data = {
					share : currentShare
				};

				clbk(data);

			},

			destroy : function(){

				$('html').off('click', events.unfocus);

				delete self.app.platform.ws.messages.transaction.clbks.share;

				if (el.c)

					el.c.find('.emojionearea-editor').off('pasteImage')

				el = {};

				if (Sortable && Sortable.destroy)
					Sortable.destroy()
			},
			
			init : function(p){

				

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.tagSearch = el.c.find('.searchWrapper');

				el.tags = el.c.find('.tagsCont');
				el.message = el.c.find('.message');

				el.eMessage = el.c.find('#emjcontainer');

				el.panel = el.c.find('.panel .item');
				el.error = el.c.find('.error');
				el.postWrapper = el.c.find('.postWrapper');
				el.post = el.c.find('.post')

				el.urlWrapper = el.c.find('.urlWrapper')
				el.caption = el.c.find('.captionshare');
				el.cpt = el.c.find('.cpt')
				el.images = el.c.find('.imagesWrapper')

				el.changeAddress = el.c.find('.changeAddress')
				el.changePostTime = el.c.find('.postTime')

				el.selectTime = el.c.find('.selectedTimeWrapper')
				


				initEvents();

				make();

				//p.noscroll = self.app.actions.scrollBMenu()

				p.clbk(null, p);

				actions.waitActions();


			},

			wnd : {
				close : function(){
					if (essenseData.close){
						essenseData.close()
					}
				},
				class : "smallWnd withoutButtons wndsharepost"
			},

			id : p._id
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
	module.exports = share;
}
else{

	app.modules.share = {};
	app.modules.share.module = share;

}