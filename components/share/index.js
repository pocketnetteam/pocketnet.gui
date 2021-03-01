var share = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var displayTimes = false

		var primary = deep(p, 'history');

		var el, currentShare = null, essenseData;

		var focusfixed = false, external = null, pliss;

		var intro = false;

		var m = self.app.localization.e('e13160')

		var actions = {

			language : function(_clbk){
				var items = []

				_.each(self.app.localization.available, function(a){
					items.push({
						text : a.name,
						action : function (clbk) {

							var na = app.localization.findByName(a.name);


							if (na && na.key != currentShare.language.v)
							{
								currentShare.language.set(na.key)
							}

							clbk()

							renders.postline();

							if(_clbk) _clbk()

						}
					})
				})

				menuDialog({

                    items: items
				})
			},

			toggleTimesDisplay : function(){

				var checkEntity = currentShare.message.v || currentShare.caption.v || currentShare.repost.v || currentShare.url.v || currentShare.images.v.length || currentShare.tags.v.length;

				if (el.times){

					if (checkEntity){

						el.times.removeClass('hide');
						
					}
	
					if (!checkEntity){
	
						el.times.addClass('hide');
	
					}
				}

			},

			tooltips : function(){
				if(!actions.tooltip){

					if(pliss) pliss.destroy()

				}
			},

			tooltip : function(){
				if(!intro) return;

				if(!currentShare.message.v){

					return
				}

				if(!currentShare.tags.length){

					pliss = self.app.platform.api.plissing({
						el : el.tagSearch,
						text : self.app.localization.e('e13161')
					})

					return true
				}
			},

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

				console.log('current', currentShare);

				actions.filled('i', currentShare.images.v.length != 0)
				actions.filled('u', currentShare.url.v)
				actions.filled('t',  currentShare.tags.v.length!= 0)					
				actions.filled('cm', currentShare.message.v || currentShare.caption.v)
				actions.filled('p', currentShare.poll.v.list)

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

				if (type === 'addVideo') {
					el.peertube.addClass('disabledShare');
					el.peertubeLiveStream.addClass('disabledShare');

					self.app.peertubeHandler.authentificateUser(function(response) {
						if (!response) response = {};

						if (response.error) {
							el.peertube.removeClass('disabledShare');
							el.peertubeLiveStream.removeClass('disabledShare');

							return sitemessage(response.error);
						}

						
	
						self.nav.api.load({
							open : true,
							id : 'uploadpeertube',
							inWnd : true,
	
							history : true,
	
							essenseData : {
								storage : storage,
								value : value,
								actions : {
									added : function(link){
										var type = 'url';
	
										console.log('Finished!', link, new Date());
										var result = currentShare[type].set(link)
	
										if(!essenseData.share){
											state.save()
										}
	
										if(!result && errors[type]){
	
											sitemessage(errors[type])
	
										}								
	
										if (renders[type])
											renders[type]();									
									}
								},
	
								closeClbk : function() {
									if (!currentShare.url.v.includes(self.app.peertubeHandler.peertubeId)) {
										el.peertube.removeClass('disabledShare');
										el.peertubeLiveStream.removeClass('disabledShare');
									}
								}
							},
	
							clbk : function(p){
								external = p
							}
						})

						return true;
					});
				} 

				if (type === 'addStream') {
					el.peertubeLiveStream.addClass('disabledShare');
					el.peertube.addClass('disabledShare');

					self.app.peertubeHandler.authentificateUser(function(response) {

						if (!response) response = {};
						
						if (response.error) {
							el.peertubeLiveStream.removeClass('disabledShare');
							el.peertube.removeClass('disabledShare');

							return sitemessage(response.error);
						}
	
						self.nav.api.load({
							open : true,
							id : 'streampeertube',
							inWnd : true,
	
							history : false,
	
							essenseData : {
								storage : storage,
								value : value,
								currentLink : currentShare.url ? currentShare.url.v : '',
								actions : {
									added : function(link){
										var type = 'url';
	
										console.log('Finished!', link, new Date());
										var result = currentShare[type].set(link)
	
										if(!essenseData.share){
											state.save()
										}
	
										if(!result && errors[type]){
	
											sitemessage(errors[type])
	
										}								
	
										if (renders[type])
											renders[type]();
									}
								},
	
								closeClbk : function() {
									el.peertubeLiveStream.removeClass('disabledShare');
	
									if (!currentShare.url.v.includes(self.app.peertubeHandler.peertubeId)) {
										el.peertube.removeClass('disabledShare');
									}
								}
							},
	
							clbk : function(p){
								external = p
							}
						});

						return true;
					});
				} 

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
						},

						clbk : function(p){
							external = p
						}
					})

					return
				}

				

				if(type == 'times'){

					dialog({
						html : self.app.localization.e('e14002'),
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),
						class : "zindex",
						success : function(){

							currentShare.clear();
							currentShare.language.set(self.app.localization.key)
							make();
							
						},

						fail : function(){
						}
					})

					

					return

				}
				
				
				if(type == 'url' || type == 'images'){
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
						},

						clbk : function(s, p){
							external = p

						}
					})
				}

		


				
			},
			addTag : function(tag){

				//tag = tag.replace(/#/g, '')

				if(!currentShare.tags.set(tag)){

					el.error.html(self.app.localization.e('e13162'))

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

			removePoll : function(){

				currentShare.poll.set();

				if(!essenseData.share){
					state.save()
				}
				/*el.message.val(text);
				el.message.change();*/
			},

			removelink : function(){

				var l = currentShare.url.v

				if (l.includes(self.app.peertubeHandler.peertubeId)) {
					self.app.peertubeHandler.removeVideo(l);
					el.peertube.removeClass('disabledShare');
					el.peertubeLiveStream.removeClass('disabledShare');
				}


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
				console.log("POST")
			

				el.postWrapper.removeClass('showError');

				if(essenseData.hash == currentShare.shash()){

					el.postWrapper.addClass('showError');
					el.error.html(self.app.localization.e('e13163'))
					return
				}

				el.c.addClass('loading')
				topPreloader(50)

		
				//currentShare.language.set(self.app.localization.key)

				currentShare.uploadImages(self.app, function(){

					if (currentShare.checkloaded()){
                        

						var t = self.app.platform.errorHandler('imageerror', true);

						topPreloader(100)

						el.c.removeClass('loading')

						if (t){
							sitemessage(t)
						}

                        
                        return
                    }

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
									if(currentShare.time) alias.time = currentShare.time

									self.app.platform.sdk.node.shares.add(alias)

									if(!essenseData.notClear){
										currentShare.clear();
										self.app.nav.api.history.removeParameters(['repost'])

										self.closeContainer()

										if(!essenseData.share){
											state.save()
										}

										make();	
									}

																	

								}

								catch (e){
									console.log(e)
								}

								self.app.platform.sdk.user.get(function(u){
									u.postcnt++
								})

								intro = false

								if (essenseData.post){
									essenseData.post()
								}
								else{

									if(isMobile()){
										self.app.nav.api.load({
											open : true,
											href : 'index',
											history : true
										})
									}
									else{
										_scrollTop(0);
									}

									

								}

								if (clbk)
									clbk(true)


								actions.unfocus();
								
								successCheck()
								
								
							}

						},

						p
					)

				})

			},
			error : function(onlyremove){
				var error = currentShare.validation();

				actions.toggleTimesDisplay();

				if (error && !onlyremove){

					if (el.postWrapper)
						el.postWrapper.addClass('showError')

					el.error.html(errors[error])

					if(error == 'message'){
						el.c.find('.emojionearea-editor').focus()
					}

					if(error == 'tags'){
						el.c.find('.tgs input').focus()
					}

					
					console.log(error)
					return true
				}
				else
				{
					if (el.postWrapper)
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
            url : self.app.localization.e('e13164'),
            error_video : self.app.localization.e('e13165')
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

				console.log('error',error)

				if (!error){
					actions.post()
				}
				
			},
			embeding : function(){
				var type = $(this).attr('embeding')


				if (type == 'language'){

					actions.language()

					return
				}

				if (type == 'poll'){

					dialog({
						header: "Create new poll",
						class : "one joinbeta",
						poll: true,
						btn1text : 'Create',
						success: function(){

							var poll = $('.dialog .poll');
							
							var title = poll.find('.title .input').val();

							var list = poll.find('.poll-item .input');

							var values = list.map(function(idx, item){
								return $(item).val();
							})

							.filter(function(idx, item){
								return item;
							})

							values = Array.from(values);

							var obj = {
								title: title,
								list: values
							}

							currentShare.poll.set(obj);

							renders.poll()

							console.log('create!!!', values, currentShare);
						}
					})

					return
				}

				if (type == 'embeding20'){
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
			},

			removePoll : function(){
				actions.removePoll()

				renders.poll();
			}


		}

		var renders = {

			postline : function(clbk){

				console.log("RENDER")

				self.shell({
					name :  'postline',
					el : el.postline,
					data : {
						share : currentShare,
						essenseData : essenseData,
						lkey : self.app.localization.key
					},

				}, function(p){

					el.panel = el.c.find('.panel .item');
					el.postWrapper = el.c.find('.postWrapper');					
					el.changePostTime = el.c.find('.postTime')
					el.selectTime = el.c.find('.selectedTimeWrapper')
					el.post = el.c.find('.post')
					el.times = el.c.find('.panel .times')

					el.changePostTime.on('change', events.changePostTime)
					el.selectTime.on('click', events.selectTime)
					el.panel.on('click', events.embeding)
					el.post.on('click', events.post)

					console.log(el.post)

					el.peertube = el.c.find('.peertube');
					el.peertubeLiveStream = el.c.find('.peertubeLiveStream');

					el.peertube.on('click', async function() {
						console.log('>>>>>>>>usertoken', self.app.peertubeHandler.userName, self.app.peertubeHandler.password);
					});

					if (currentShare.url.v.includes(self.app.peertubeHandler.peertubeId)) {
						el.peertube.addClass('disabledShare');
						el.peertubeLiveStream.addClass('disabledShare');
					}


					p.el.find('.cancelediting').on('click', function(){
						self.closeContainer();
		
						if (essenseData.close){
							essenseData.close()
						}
					})


					actions.toggleTimesDisplay();

					if (clbk)
						clbk();
				})

			},

			tgs : function(clbk){

				self.shell({
					name :  'tgs',
					el : el.tgsWrapperMain,
					data : {
						share : currentShare
					},

				}, function(p){


						el.tags = el.c.find('.tagsCont');
						el.tagSearch = el.c.find('.searchWrapper');

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


					if (clbk)
						clbk();
				})
			},

			tags : function(clbk){

				if (el.tags){
					el.tags.find('.tag').remove()

					self.shell({
						name :  'tags',
						inner : append,
						el : el.tags,
						data : {
							tags : currentShare.tags.get(),
							share : currentShare
						},

					}, function(p){

						if (p.el)
							p.el.find('.remove').on('click', events.removeTag)

						if (clbk)
							clbk();
					})
				}
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

				el.cpt.val();

				renders.tgs(renders.tags);
				
				renders.url();

				renders.caption();

				renders.images();

				renders.poll();

				renders.repost();

				renders.postline();

			},

			caption : function(){

				if(currentShare.caption.v/* || currentShare.message.v.length > 100*/){

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

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') {

                            Plyr.setup('.js-player', function(player) {

								player.muted = false
							});

						} else {
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
			},

			repost : function(clbk){
				var repost = currentShare.repost.v;

				self.app.platform.sdk.node.shares.getbyid([repost], function(){

					var share = self.app.platform.sdk.node.shares.storage.trx[repost] 
						
					self.shell({
						name :  'repost',
						inner : html,
						el : el.repostWrapper,
						data : {
							repost : share,
							share : currentShare,
							level : 0
						},
	
					}, function(_p){	

						if(repost){
							self.app.platform.papi.post(repost, _p.el.find('.repostShare'), function(){

							}, {
								repost : true,
								eid : "share"
							})

							_p.el.find('.repostCaption').on('click', function(){

								currentShare.repost.set()

								state.save()

								self.app.nav.api.history.removeParameters(['repost'])

								
								renders.repost(function(){
									renders.tgs(renders.tags);
									renders.postline();
								});

							})
						}

						if (clbk)
							clbk();

						
					})

					
				
				})
			},

			poll : function(clbk){

				var poll = currentShare.poll.get();

				console.log('poll', poll, el);

				var pollWrapper = p.el.find('.pollWrapper');

				var content = '';
				
				var title = poll.title;

				if (title){

					content += `<div class="title"><b>${title}</b></div>`;

				}


				if (poll.list && poll.list.length){

					var list= '<div class="list">';

					poll.list.forEach(function(v){

						list += `<div class="list-item">${v}</div>`
					})

					list += '</div>';

					content += list;
					
				}

				var removeWrapper = '<div class="removeWrapper"><div class="removelink"><i class="fas fa-times"></i></div></div>'


				var html = '';

				if (content){

					html = '<div class="poll">' + content + removeWrapper + '</div>';
				}


				pollWrapper.html(html);

				
				p.el.find('.pollWrapper').on('click', function(){

					events.removePoll();
				})

				
				// self.shell({
				// 	name :  'poll',
				// 	inner : html,
				// 	el : el.urlWrapper,
				// 	data : {
				// 		poll : poll,
				// 		og : null,
				// 		remove : true,

				// 		share : currentShare
				// 	},

				// }, function(p){

				// 	console.log('poll', poll, el)


				// 	if(poll && !og){

				// 		if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') {

                //             Plyr.setup('.js-player', function(player) {

				// 				player.muted = false
				// 			});

				// 		} else {
				// 			self.app.platform.sdk.remote.get(meta.url, function(og){

				// 				if(og){
				// 					renders.url()
				// 				}

				// 			})
				// 		}
				// 	}

				// })
			}

		}

		var state = {
			save : function(){

				if(!currentShare){
					self.app.settings.set(self.map.id, 'currentShare_v1', '');
				}
				else
				{

					if(currentShare.aliasid){
						return
					}

					var exp = currentShare.export(true)

					if (exp.message == m) exp.message = ''

					var scs = self.app.settings.set(self.map.id, 'currentShare_v1', exp);


				}

				
			},
			load : function(){
				var last = self.app.settings.get(self.map.id, 'currentShare_v1')

				if (last)
					currentShare.import(last)

				return last
			}
		}

		var make = function(){
			renders.all()
		}

		var initEvents = function(){

			el.changeAddress.on('change', events.changeAddress)			


		   	el.eMessage.emojioneArea({
		    	pickerPosition : 'bottom',
		    	
		    	search : false,
		    	tones : false,
		    	autocomplete : false,

		    	attributes: {
			        spellcheck : true,
			    },

				filters : {
					smileys_people: {
						icon: "yum",
						title: "Smileys & People",
						emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down " +
						"wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum " +
						"stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses " +
						"cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown " +
						"frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth " +
						"no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream " +
						"fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking " +
						"shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face " +
						"head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader " +
						"robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
						"pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist " +
						"right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up " +
						"raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie " +
						"nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette " +
						"busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman " +
						"man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer " +
						"woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker " +
						"man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer " +
						"woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist " +
						"woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist " +
						"man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " +
						"man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing " +
						"man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok " +
						"man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging " +
						"man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut " +
						"woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying " +
						"men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple " +
						"bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire " +
						"mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie " +
						"womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat " +
						"tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses " +
						"closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
					},
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

					console.log('na', na);

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

			actions.toggleTimesDisplay();

			
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

				intro = false;
				external = null
				currentShare = deep(p, 'settings.essenseData.share') || new Share(self.app.localization.key);
				console.log('currentShare', currentShare)
				essenseData = deep(p, 'settings.essenseData') || {};

				self.app.platform.sdk.user.get(function(u){

					if(!essenseData.share){

						state.load()

						if (u.postcnt === 0 && !currentShare.message.v && essenseData.hello){
							currentShare.message.v = m

							intro = true;
						}
					}

					if (essenseData.repost || parameters().repost) 
						currentShare.repost.set(essenseData.repost || parameters().repost)


					var data = {
						essenseData : essenseData,
						share : currentShare,
						postcnt : u.postcnt,
						
					};
					
					

					clbk(data);



				})


			},

			destroy : function(){

				if (external){
					external.module.closeContainer()
				}

				external = null

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

				
				el.tgsWrapperMain = el.c.find('.tgsWrapperMain')
				
				el.message = el.c.find('.message');

				el.eMessage = el.c.find('#emjcontainer');
				el.error = el.c.find('.error');		
				

				
				el.urlWrapper = el.c.find('.urlWrapper')
				el.caption = el.c.find('.captionshare');
				el.cpt = el.c.find('.cpt')
				el.images = el.c.find('.imagesWrapper')

				el.poll = el.c.find('.pollWrapper')

				el.changeAddress = el.c.find('.changeAddress')

				el.repostWrapper = el.c.find('.repostWrapper')
				el.postline = el.c.find('.postlineWrapper')


				


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