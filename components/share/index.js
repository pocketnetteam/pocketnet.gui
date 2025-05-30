var share = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var key = p.mid || 'sec'

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var displayTimes = false

		var primary = deep(p, 'history');

		var el, currentShare = null, essenseData, taginput, eblock, sortable;

		var focusfixed = false, external = null, pliss, destroying = false;

		var clickOnCreateHappened = false;

		var loadedimages = {}
		var loadingimages = {}
		var player = null

		var intro = false;

		var m = self.app.localization.e('e13160');

		var actions = {
			_videoadded : function(link, name){
				var type = 'url';

				var result = currentShare[type].set(link)

				currentShare.settings.a = ["i", "u", "cm", "p"]

				if(name && !currentShare.caption.v)
					currentShare.caption.set(name)
					
				currentShare.images.set()
				currentShare.repost.set()

				if(!essenseData.share){
					state.save()
				}

				return result
			},
			videoadded : function(link, name){
				var result = actions._videoadded(link, name)

				if(!result && errors[type]){
					sitemessage(errors[type])
				}	
				
				el.c.removeClass('minimized')

				makeDebounced();	
			},

			closeexternal : function(){
				external = null

				if(!destroying) makeDebounced();
			},

			getrepost : function(clbk){
				var repost = currentShare.repost.v;

				if (repost){
					self.app.platform.sdk.node.shares.getbyid([repost], function(){

						var share = self.psdk.share.get(repost) 
						

						if (clbk) clbk(share)
	
					})
				}
				else{
					if(clbk) clbk()
				}

				
			},

			resizeImage : function(base64, settings){
				if(!settings) settings = {}

				var images = [{
				  original : base64,
				  index : 0
				}];

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
								aspectRatio : settings.aspectRatio || 16 / 9,
								style : 'apply',
								autoCropArea : 0.95,
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
								
								}, null, settings.qualityForThumbnail || null)

				
						  	},
						}
					})

				})
		  
				
			},

			uploadVideoWallpaper : function(image, base64){
				var shareUrl = (currentShare.url || {}).v || '';
			
				var parameters = {
					thumbnailfile: image,
				};

				var settingsObject = {
					qualityForThumbnail: 0.95,
				}

				var urlMeta = self.app.peertubeHandler.parselink(shareUrl);

				var host = urlMeta.host || null;

				return self.app.platform.sdk.videos.info([shareUrl])

				  .then(() => (self.app.platform.sdk.videos.storage[shareUrl] || {}).data)
				  .then((res = {}) => {
					  if (res.aspectRatio) {
						settingsObject.aspectRatio = res.aspectRatio;

						return;
					  } 
					
					  return self.app.peertubeHandler.api.videos.getDirectVideoInfo({ id: urlMeta.id }, { host }).then(res => {
						  settingsObject.aspectRatio = res.aspectRatio;
					  });
				})
				
				.then((fileBase64) => {

					return actions.resizeImage(base64, settingsObject)

				}).then(img => {

					parameters.image = {
						data : img
					}

					return self.app.peertubeHandler.api.videos.update(shareUrl, parameters, { host })

				}).catch(e => {

					var message = e.text || findResponseError(e) || 'Updating error';

					sitemessage(message);

				})
			},

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

							renders.settings();
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
				return
			},

			unfocus : function(){
				if (el.c)
					el.c.addClass('unfocus').removeClass('focus')
			},

			

			autoFilled : function(){


				actions.filled('i', currentShare.images.v.length != 0)
				actions.filled('u', currentShare.url.v)
				actions.filled('t',  currentShare.tags.v.length!= 0)					
				actions.filled('cm', currentShare.message.v || currentShare.caption.v)
				actions.filled('p', currentShare.poll.v.list)

			},

			filled : function(key, f){

				if(!el.c) return

				var _el = el.c.find('.draggablepart[part="'+key+'"]');

				if (f){
					_el.addClass('filled');
				}
				else{
					_el.removeClass('filled');
				}

				
			},
			checkUrlForImage : function(url){

				var ex = ['jpg', 'gif', 'png', 'jpeg',  'webp', 'jfif']

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

			addimage : function(value){

				var result = true;
				var type = 'images'

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
				
				if(type == 'url'){
					renders.all()
				}
				else{
					if (renders[type])
						renders[type]();
				}
				
			},

			embeding : function(type, value){

				if (eblock) return

					eblock = true

				setTimeout(function(){
					eblock = false
				}, 1000)

				if (type === 'openexternal') {
					if (external && external.show)

						external.show()

					return
				} 

				var storage = currentShare.export(true)

				if (type === 'addVideo' || type === 'addAudio' || type === 'addStream') {

					if(currentShare.images.v.length){
						new dialog({
							html : self.app.localization.e('removeimageswhenvideo'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
							class : "zindex",
							success : function(){
	
								currentShare.images.set()
								renders.streamPage({ value, storage, type });

							},
	
							fail : function(){
							}
						})
					}
					else{
						renders.streamPage({ value, storage, type });
					}

					return
				} 

				if(type == 'article'){

					self.nav.api.load({
						open : true,
						id : 'articlev',
						inWnd : true,
						history : true,

						essenseData : {
							
						},

						clbk : function(p){
							//external = p

							make()
						}
					})
					

					self.closeContainer()
					
					return
				}

				if(type == 'times'){

					new dialog({
						html : self.app.localization.e('e14002'),
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),
						class : "zindex",
						success : function(){

							var link = currentShare.url.v;

							if (self.app.peertubeHandler.checklink(link)) {
								actions.removevideo(link)
							}

							currentShare = new Share(self.app.localization.key, self.app)

							make();
							
						},

						fail : function(){
						}
					})

					return

				}
				

				
				
				
			},
			addTags : function(tags){

				_.find(tags, function(tag){
					if(!currentShare.tags.set(tag)){
						actions.errortext(self.app.localization.e('e13162'))

						return true
					}
					else
					{
						actions.errortext('')
						if(!essenseData.share){
							state.save()
						}
					}
				})

			},
			addTag : function(tag){

				//tag = tag.replace(/#/g, '')

				if(!currentShare.tags.set(tag)){
					actions.errortext(self.app.localization.e('e13162'))
				}
				else
				{
					actions.errortext('')
					if(!essenseData.share){
						state.save()
					}
				}

			},

			removeTags: function(tags){

				var text = el.eMessage[0].emojioneArea.getText();

				_.each(tags, function(tag){
					currentShare.tags.remove(tag)
					text = text.split('#' + tag).join(tag);
				})

				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
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
					history : true,

					essenseData : {
						edit : true,
						initialValue : r,
						images : f,

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

			removevideo : function(l, dlg){

				currentShare.settings.a = currentShare.default.a
				currentShare.caption.set('');


				setTimeout(function(){
					new dialog({
						html : self.app.localization.e('removevideoShareQuestion'),
						btn1text : self.app.localization.e('removevideoShareQuestionDelete'),
						btn2text : self.app.localization.e('removevideoShareQuestionLeave'),
						class : "zindex",
						success : function(){
							self.app.peertubeHandler.api.videos.remove(l).then(r => {
								self.app.platform.sdk.videos.clearstorage(l)
							})
						},

						fail : function(){
						}
					})
				}, 400)

			},

			removelink : function(){

				var l = currentShare.url.v
				
				currentShare.url.set();

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split(findAndReplaceLinkClearReverse(l)).join('');
				text = text.split(l).join('');


				el.eMessage[0].emojioneArea.setText(text);
				

				if (self.app.peertubeHandler.checklink(l)) {
					actions.removevideo(l, true)
					make()
				}

				if(!essenseData.share){
					state.save()
				}

				/*el.message.val(text);
				el.message.change();*/
			},
			

			applyText : function(text){
				currentShare.message.set(findAndReplaceLinkClearReverse(text));
			},

			caption : function(caption){
				currentShare.caption.set(findAndReplaceLinkClearReverse(caption));
			},

			loadimage : function(url, callback){
				var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					var reader = new FileReader();
					reader.onloadend = function() {
						callback(reader.result);
					}
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
				
			},

			loadimagefromlink : function(url, clbk){

				if (loadingimages[url]){
					return
				}

				if (loadedimages[url]){
					if(clbk) clbk(loadedimages[url])
				}

				else{
					loadingimages[url] = true
					actions.loadimage(url, function(b){
						loadedimages[url] = b
						loadingimages[url] = false

						if(clbk) clbk(loadedimages[url])
					})
				}
			},

			isIpfsVideo : async function(url) {
				return fetch(url, { method: 'HEAD' })
					.then((res) => {
						const contentType = res.headers.get('content-type');

						const isMp4 = (contentType === 'video/mp4');
						const isOgg = (contentType === 'video/ogg');
						const isWebm = (contentType === 'video/webm');

						return isMp4 || isOgg || isWebm;
					}).catch(() => {
						return false;
					})
			},

			linksFromText : function(text){


				if(!currentShare.url.v){
					var protocol = ((window.project_config || {}).protocol || 'bastyon')

					//var r = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,5}\b(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi;
					var r = /(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,5}\b)|(bastyon:\/))(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi

					var tkns = linkify.tokenize(text)



					var matches = _.map(_.filter(tkns, (t) => {
						return t.t == 'url'
					}), (t) => {
						return t.v
					})
					
					//var r = new RegExp(rtpl, 'gi')

					//var matches = text.match(r);

					console.log('matches url', tkns, matches)


					if(matches && matches.length > 0){

						_.each(matches, async function(url){
							if(actions.checkUrlForImage(url)){

							}
							else
							{
								if(currentShare.url.v) return;

								const ipfsIdRegex = /ipfs\/([A-z0-9]+)/;
								const ipfsId = url.match(ipfsIdRegex)?.[1];

								if (ipfsId) {
									const ipfsUrl = `https://cloudflare-ipfs.com/ipfs/${ipfsId}`;
									const isVideo = await actions.isIpfsVideo(ipfsUrl);

									if (isVideo) {
										url += '?type=video'
									}
								}

								console.log("MATCH url", url)

								currentShare.url.set(url)

								renders['url']()

								renders.postline()
							}
						})

						

						
					}
				}
			},

			getprofanitytag : function(text){
				if(typeof window.LeoProfanity != 'undefined'){

					window.LeoProfanity.loadDictionary(currentShare.language.get())
					var badwords = window.LeoProfanity.badWordsUsed(text)

					if (badwords.length){
						var t = self.app.localization.e('profanity_tag')

						if(!currentShare.tags.have(t)) return t
					}

				}

				return null
			},

			tagsFromText : function(text){
				var words = text.split(wordsRegExp);

				var newtags = _.filter(words, function(w){
					if (w[0] == '#'){

						w = w.replace(/[^a-zA-Z0-9а-яА-Я?]*/g, '').replace(/[# ?]*/g, '')

						if(!w) return false

						return !currentShare.tags.have(w)

					}
				})

				/*var ptag = actions.getprofanitytag(text)

				if (ptag){
					newtags.push(ptag)
				}*/
				

				if(newtags.length){

					_.each(newtags, function(tag){

						tag = tag.replace(/\#/g, '')

						if(tag && !currentShare.tags.set(tag)){
							
						}
					})

					renders.tgs() ///// ???? CHECK

				}
				
			},

			checktranscoding : function(clbk){
				const proceed = () => {
					currentShare.canSend(self.app, (result) => {
						clbk(result)
					});
				};
				
				if ((currentShare.itisvideo() || currentShare.itisaudio()) && !currentShare.aliasid) {
					if (currentShare.itisstream() && !currentShare.settings.c) {
						/*Stream*/
						self.app.platform.matrixchat.core.createStreamRoom(makeid(currentShare.message.v)).then(id => {
							currentShare.settings.c = id;
							proceed();
						});
					} else {
						/*Not a stream or stream already created*/
						proceed();
					}
				} else {
					clbk(true)
				}
			},

			post : function(clbk, p){
				
				self.app.Logger.info({
					actionId: 'POST_CREATED',
				});

				el.postWrapper.removeClass('showError');

				if (self.app.platform.sdk.user.reputationBlockedMe()){
					sitemessage(self.app.localization.e('lockedaccount'))
					return
				}

				if(essenseData.hash == currentShare.shash()){


					actions.errortext(self.app.localization.e('e13163'))
					return
				}

				el.c.addClass('loading')
				

				var SAVE = function(){

					currentShare.language.set(self.app.localization.key)
					actions.checktranscoding(function(result){
						currentShare.uploadImages(self.app, function(){

							if (currentShare.hasexchangetag()){
								currentShare.repost.v = ''
								currentShare.settings.f = '0'
								currentShare.url.set()
							}

							if (currentShare.repost.v){
								currentShare.settings.f = '0'
							}

							if (currentShare.checkloaded()){
			
								el.c.removeClass('loading')
								sitemessage(self.app.platform.errorHandler('imageerror', true))
								
								return
							}

							self.app.platform.actions.addActionAndSendIfCan(currentShare).then(action => {

								if (action.currentState == 'actions_checkFail'){

									new dialog({
										html: self.app.localization.e('info_actions_checkFail'),
										btn1text: self.app.localization.e('ok'),
										btn2text: "",
										class: 'one zindex',
										success: () => {
										}
									});
									
								}

								var alias = action.object

								try{
								
									if (action.transaction){
										if(action.object.delayed()){

											var __parameters = {
												actionId: 'POST_CREATED_SUCCESS',
												actionValue: action.transaction,
												payload : {
													post : action.object.export(),
													inputs : action.inputs,
													outputs : action.outputs
												}

											}

											self.app.Logger.info(__parameters);
										}
										
									}

								}catch(e){
									console.log('log error delayed')
									console.error(e)
								}

								/**/


								if (alias.itisvideo() || alias.itisaudio() || alias.itisstream()) {
									var unpostedVideos;

									try {
										unpostedVideos = JSON.parse(localStorage.getItem('unpostedVideos') || '{}');
									} catch (error) {
										unpostedVideos = {};

										self.app.Logger.error({
											err: 'DAMAGED_LOCAL_STORAGE',
											code: 801,
											payload: error,
										  });
									};

									if (unpostedVideos[self.app.user.address.value]) {
										unpostedVideos[self.app.user.address.value] =
											unpostedVideos[self.app.user.address.value].filter(
												(video) => video !== alias.url,
											);

											try {
												localStorage.setItem(
													'unpostedVideos',
													JSON.stringify(unpostedVideos),
												);
											}
											catch (e) { }

										
									}
								}

								if(!essenseData.notClear){
									currentShare = new Share(self.app.localization.key, self.app)
									
									
									setTimeout(() => {
										self.app.nav.api.history.removeParameters(['repost'])
										self.closeContainer()
									}, 100)
									

									if(!essenseData.share){
										state.save()
									}

									make();	
								}
								
								if (essenseData.post){
									essenseData.post(alias)
								}
								else{

									if(isMobile()){

										self.app.nav.api.load({
											open : true,
											href : 'authorn?address=' + self.app.user.address.value,
											history : true
										})

									}
									else{
										self.app.actions.scroll(0)
									}

								}


								actions.unfocus();
								
								successCheck()

								if (clbk)
									clbk(true)
									
							}).catch(e => {

								if (clbk){
									clbk(false, errors[e])
								}
									
								var t = self.app.platform.errorHandler(e, true);

								if (t) actions.errortext(t)



							}).then(() => {
								if (el.c)
									el.c.removeClass('loading')
							})
						})
					})

					return

					
				}

				var fail = function(e){
					var message = e.text || findResponseError(e) || 'Updating error';

						sitemessage(message);

					el.c.removeClass('loading')

				}

				
				actions.getrepost(function(share){

					if(share && share.address == deep(self.app, 'user.address.value')){

						fail({
							text : self.app.localization.e('repostyourown')
						})

						return
					}

					if (currentShare.itisvideo() || currentShare.itisaudio()) {

						const options = {};
	
						if (currentShare.message.v) options.description = currentShare.message.v;
						if (currentShare.caption.v) options.name = currentShare.caption.v;
	
						var urlMeta = self.app.peertubeHandler.parselink(currentShare.url.v);
						options.host = urlMeta.host;
			
						return self.app.peertubeHandler.api.videos.update(currentShare.url.v, options).then(SAVE).catch((e) => {
							
							fail(e)
						
						});
	
					} else {
	
						SAVE()
	
					}

				})

				

			},

			errortext : function(text){

				if(self.app.mobileview){
					if (text)
						sitemessage(text)
				}
				else{
					if(!el.error) return

					if(!text){
						el.error.html('')
						el.c.removeClass('showError')
					}
	
					else{
						el.error.html('<div>'+text+'</div>')
						el.c.addClass('showError')
					}
				}

				
			},

			error : function(onlyremove){
				var error = currentShare.validation();

				actions.toggleTimesDisplay();


				if (error && !onlyremove){

					actions.errortext(errors[error])


					if(error == 'message'){
						el.c.find('.emojionearea-editor').focus()
					}

					if(error == 'tags'){
						el.c.find('.tgs input').focus() 
					}

					if(error == 'videocaption'){
						el.caption.focus() 
					}

					if(error == 'ntime1'){
						events.selectTimeWrapper()
					}

					return true
				}
				else
				{

					actions.errortext('')

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
            error_video : self.app.localization.e('e13165'),
			videocaption : self.app.localization.e('entervideocaption'),
			pkoin_commerce_tag : self.app.localization.e('pkoin_commerce_tag_share_error'),
			ntime1 : self.app.localization.e('emptyntime1')
		}

		var events = {

			unfocus : function(e){

				if (el.c.hasClass('focus') && !focusfixed && el.c.has(e.target).length === 0){
					actions.unfocus();
				}
		
			},
			selectTimeWrapper : function(){
				events.selectTime(currentShare.settings.t > 1 ? new Date(currentShare.settings.t * 1000) : null, function(date){

					if(date){
						currentShare.settings.t = Number((date.getTime() / 1000).toFixed(0))
					}

					renders.settings();
					state.save()
				})
			},
			selectTime : function(time, clbk){

				var date = {}
				var dlg = null

				var defdateclear = function(){
					var d = new Date()

					d = d.addMinutes(30);

					return d
				}

				var defdate = function(){
					
					var d = defdateclear()

					date = {
						day : d.yyyymmdd(),
						hour : d.getHours(),
						minutes : d.getMinutes()
					}
				}

				var preparetemplate = function(time, clbk){
					

					if (time && time > defdateclear()){
						date.day = time.yyyymmdd()
						date.hour = time.getHours()
						date.minutes = time.getMinutes()
					}

					self.fastTemplate('sharedate', function(html){
						if(clbk) clbk(html)
					}, {
						date : date,
						min : defdateclear()
					})
				}

				var getdate = function(){

					var ds = strToDateSmall(date.day)
						ds = ds.addHours(date.hour)
						ds = ds.addMinutes(date.minutes)

					return ds
				}

				var livetemplate = function(el){


					el.find('.day').on('change', function() {
						date.day = $(this).val()

						if(getdate() < defdateclear()) defdate()

						replacetemplate()
					})

					el.find('.hours').on('change', function() {
						date.hour = $(this).val()

						if(getdate() < defdateclear()) defdate()

						replacetemplate()

					})

					el.find('.minutes').on('change', function() {
						date.minutes = $(this).val()

						if(getdate() < defdateclear()) defdate()

						replacetemplate()

					})
				}

				var replacetemplate = function(){

					if(!dlg) return

					preparetemplate(null, (html) => {
						dlg.replacehtml(html)

						livetemplate(dlg.el)
					})
					
				}

				defdate()

				preparetemplate(time, (html) => {
					dlg = new dialog({
						html : html,

						btn1text : self.app.localization.e('daccept'),

						class : "one sharedate zindex",

						clbk : function(el){
							livetemplate(el)
						},	

						wrap : true,

						success : function(d){

							var date = getdate(d.el)

							var now = new Date();

							if (now < date){

								if(clbk) clbk(date)

								return true;
							}
							else
							{

								sitemessage(self.app.localization.e('pastdate'))

								return false;
							}
						}
					})
				})


					

					

				
				
			},

			changePostTime : function(){

				var _el = $(this);
				var type = $(this).val();

				if (type == 'p'){

					new dialog({
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

				var info = self.psdk.userInfo.get(address)

				var src = info.image || ''

				if(src){
					icon.html('');

					icon.attr('image', src);

					bgImagesCl(el.c.find('.icon'))
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

				if (external && external.uploading()) {
					new dialog({
						html : "Video is still uploading. Do you want to cancel it?",
						btn1text : "Wait",
						btn2text : "Cancel uploading",
	
						class : 'videoCaution zindex',
	
						success : () => {
							return;
						},

						fail : () => {

							external.cancel()
							external.closehack()
							
							return;
						},
					})
				} else {

					if (!error){
						actions.post()
					}
				}
				
			},
			embeding : function(){
				var type = $(this).attr('embeding')

				if(!type) return

				if (type == 'language'){
					actions.language()
					return
				}

				if (type == 'poll'){

					new dialog({
						header: "Create new poll",
						class : "one joinbeta zindex",
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
			

			removelink : function(){
				actions.removelink()

				renders.all();
			},

			removePoll : function(){
				actions.removePoll()

				renders.poll();
			}


		}

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

		var renders = {

			postline : function(clbk){

				self.app.platform.sdk.ustate.me(function(_mestate){

					self.shell({
						name :  'postline',
						el : el.postline,
						
						data : {
							share : currentShare,
							essenseData : essenseData,
							lkey : self.app.localization.key,
							u : _mestate,
							external
						},

					}, function(p){

						if(!el.c) return

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


						el.peertube = el.c.find('.peertube');
						el.peertubeLiveStream = el.c.find('.peertubeLiveStream');

						var tstorage = []

						initUpload({
							el : p.el.find('.images'),
				
							ext : ['png', 'jpeg', 'jpg', 'gif', 'jfif', 'webp', 'avif'],
		
							dropZone : el.c,
							app : self.app,
							multiple : true,
							uploadImage : true,
		
							action : function(file, clbk){

								if (file.ext == 'gif'){
									imagesHelper.slowUploadGif(file, tstorage, clbk)
								}
								else
								{
									imagesHelper.slowUpload(file, tstorage, clbk)
								}
								
							},

							onError : function(er){

								var et = {
									filesize : "Your photo has size greater than 30MB.",
									fileext : "Invalid format of picture."
								}
								if(et[er])
								sitemessage(et[er])
							},
		
							onSuccess : function(){

								var images = [];
		
								_.each(tstorage, function(v){
									if(v.base64)
										images.push(v.base64)
								})


								actions.addimage(images)

								tstorage = []

								renders.postline();
							
							}
						})


						p.el.find('.cancelediting').on('click', function(){
							self.closeContainer();

							if(external && external.cancel){
								external.cancel()
								external.closehack()
							}

					
			
							if (essenseData.close){
								essenseData.close()
							}
						})


						actions.toggleTimesDisplay();

						if (clbk)
							clbk();
					})

				})

			},

			settings : function(clbk){

				self.app.platform.sdk.ustate.me(function(_mestate){

					var u = _mestate

					if(!currentShare.hasexchangetag() && !currentShare.repost.v && u && (u.reputation > 50 || !u.trial)) {

						currentShare.settings.f || (currentShare.settings.f = '0')
						currentShare.settings.t || (currentShare.settings.t = '0')

						self.sdk.paidsubscription.getcondition(self.app.user.address.value).then(value => {

							var visvalues = ['0','1','2']
							var visvaluesLabels = [
								self.app.localization.e('visibletoeveryone'), 
								self.app.localization.e('visibleonlytosubscribers'),
								self.app.localization.e('visibleonlytoregistered')
							]

							if(value){
								visvalues.push('3')
								visvaluesLabels.push(self.app.localization.e('visibleonlytopaid'))
							}

							var selector = new Parameter({

								type : "VALUES",
								name : "Visibility",
								id : 'organizationCode',
								dbId : "INS_BROKER_CODE",
								possibleValues : visvalues,
								possibleValuesLabels : visvaluesLabels,
								defaultValue : currentShare.settings.f,
								value : currentShare.settings.f
	
							})
	
							var timeselector = new Parameter({
	
								type : "VALUES",
								name : "Time",
								id : 'time',
								possibleValues : ['0','1'],
								possibleValuesLabels : [
									self.app.localization.e('spostnow'), 
									self.app.localization.e('sposttime')
								],
								defaultValue : '0',
								value : currentShare.settings.t <= 1 ? (currentShare.settings.t || '0') : '1'
	
							})
	
							self.shell({
								name :  'settings',
								el : el.settings,
								data : {
									share : currentShare,
									essenseData : essenseData,
									selector : selector,
									timeselector
								},
	
							}, function(p){
	
								ParametersLive([selector, timeselector], p.el)
	
	
								selector._onChange = function(){
	
									currentShare.settings.f = selector.value
	
									state.save()
								}
	
								timeselector._onChange = function(){
	
									currentShare.settings.t = timeselector.value
	
									if(timeselector.value == '0') delete currentShare.settings.t
	
									renders.settings();
	
									state.save()
								}
	
								p.el.find('.timelabel').on('click', function(){
	
									events.selectTimeWrapper()
								})
	
								p.el.find('.cleartimelabel').on('click', function(){
									delete currentShare.settings.t
	
									renders.settings();
									state.save()
								})
	
								if (clbk)
									clbk();
							})

						}).catch(e => {
							console.error(e)
						})

						
					}

					else{

						if (el.settings)
							el.settings.html('')

						if(clbk) clbk()
					}
				})
			},
		
			tgs : function(clbk){

				if(!currentShare.repost.v) {

					var addonlytags = false;

					var bycategories = app.platform.sdk.categories.fromTags(currentShare.tags.get(), currentShare.language.v)

					if (bycategories.categories.length >= 2){
						addonlytags = true
					}
				
					self.nav.api.load({
						open : true,
						id : 'taginput',
						el : el.tgsWrapperMain,
						eid : 'sharetags' + (p.mid || 'mainshare'),
						animation : false,
						insertimmediately : true,
						essenseData : {
							addonlytagsFk : addonlytags,
							tags : function(){
								return currentShare.tags.get()
							},

							removeTag : function(tag){
								actions.removeTag(tag)
								renders.stateline()
							},

							removeTags : function(tag){
								actions.removeTags(tag)
								renders.stateline()
							},

							addTag : function(tag){
								actions.addTag(tag)
								renders.stateline()
								
								setTimeout(() => {
									if (taginput)
										taginput.focus()
								}, 10)
							},

							addTags : function(tags){
								actions.addTags(tags)
								renders.stateline()
							},

							language : function(){
								return currentShare.language.get()
							}
						},

						clbk : function(e, p){

							if(!el.c) return

							taginput = p


							if(clbk) clbk()
						}
					})

				}
				else{

					el.tgsWrapperMain.html('')

					if(clbk) clbk()
				}
			},

			stateline : function(){
				renders.tgs();
				renders.postline();
				renders.settings();
			},

			all : function(){

				renders.body(function(){

					el.eMessage[0].emojioneArea.setText(currentShare.message.v);
					el.cpt.find('input').val(currentShare.caption.v || "")
					el.cpt.val();

					renders.tgs();
					
					renders.url();

					renders.caption();

					renders.images();

					renders.poll();

					renders.repost();

				});

				renders.postline();
				renders.settings();

			},

			caption : function(){

				if(currentShare.caption.v || currentShare.itisvideo() || currentShare.itisaudio()){

					if(!el.cpt.hasClass('active'))
						el.cpt.addClass('active');

				}
				else
				{
					el.cpt.removeClass('active');
				}
			},

			streamPage(p = {}) {

				var typeDictionary = {
					addVideo: 'uploadpeertube',
					addAudio: 'uploadpeertube',
					addStream: 'streampeertube',
				};

				var elName = typeDictionary[p.type];
				
				if (external && external.id == elName && external.show){
					external.show()

					return;
				}

				if (external) external.closehack();

				self.nav.api.load({
					open : true,
					id : elName,
					inWnd : true,

					history : false,

					essenseData : {
						storage : p.storage,
						value : p.value,
						isAudio: (p.type == 'addAudio') ? true : false,
						currentLink : currentShare.url ? currentShare.url.v : '',
						inLentaWindow : true,
						scrollElementName: '.wnd.videoCabinet .wndcontent'
					},

					clbk : function(p, element){
						external = element;

						external.addclbk('share' + key, actions.videoadded)
						external.addclbk('share' + key, actions.closeexternal, 'closed')
						

						make()

					}
				});


			},

			url : function(clbk){


				destroyPlayer()
				
				var url = currentShare.url.v;

				console.log("RENDER URL", url)

				var meta = self.app.platform.parseUrl(url);

				var og = self.app.platform.sdk.remote.storage[url];

				var rndr = () => self.shell({
					name :  'url',
					inner : html,
					el : el.urlWrapper,
					data : {
						url : currentShare.url.v,
						og : og,
						remove : true,
						fullplayer : true,
						share : currentShare
					},

				}, function(p){


					if(currentShare.url.v && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube' || meta.type == 'ipfs') {

							destroyPlayer()

                            Plyr.setup('#' + self.map.id + ' .js-player', function(_player) {

								console.log("player clbk plyr", _player)

								if(_player){
									player = _player

									try{
										player.muted = false
									}catch(e){}
								}

								
								
							}, {
								denyPeertubeAutoPlay: true,
								app : self.app
							});

							p.el.find('.removepeertube').on('click', function(){
								events.removelink();
							})

							p.el.find('.streaminfo').on('click', () => {
								var storage = currentShare.export(true);

								renders.streamPage({ storage, type: 'addStream' });
							});

							initUpload({
								el : el.urlWrapper.find('.uploadpeertubewp'),
					
								ext : ['png', 'jpeg', 'jpg', 'webp', 'jfif', 'avif'],
								app : self.app,
								dropZone : el.urlWrapper,
		
								multiple : false,
		
								action : function(file, clbk){
	
									actions.uploadVideoWallpaper(file.file, file.base64).then(r => {

										self.app.platform.sdk.videos.clearstorage(currentShare.url.v)

										renders.url();
									})
									
								},
		
								onError : function(er, file, text){
									sitemessage(text)
								}
							})

						} 
						
						else if (meta.type != 'brighteon' && meta.type != 'stream.brighteon') {
							self.app.platform.sdk.remote.getnew(meta.url).then(og => {
								if(og){
									renders.url()
								}
							})
							/*self.app.platform.sdk.remote.get(meta.url, function(og){

								if(og){
									renders.url()
								}

							})*/
						}
					}

					else{
						if(og){

							var images = p.el.find('img');

								p.el.find('img').imagesLoadedPN({ imageAttr: true }, function(image) {

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
									
								}, self.app);

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

				if (meta.type == 'peertube') {
					console.log("updateupdate")
					self.app.platform.sdk.videos.info([url], true, true)
						.then(() => rndr())
						.catch(() => rndr())
				} else {
					rndr();
				}
				
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

						renders.postline();
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

					p.el.find('.image').imagesLoadedPN({ imageAttr: true }, function(image) {

						if(!el.c) return

						if(!isMobile()){
							
							setTimeout(() => {
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
							}, 10)
							
						}
						else
						{
							if (clbk)
								clbk();
			
							el.images.addClass('active')
						}

						


					}, self.app);

					
				})
			},

			repost : function(clbk){


				var repost = currentShare.repost.v;

				self.app.platform.sdk.node.shares.getbyid([repost], function(){

					var share = self.psdk.share.get(repost) 
					
						
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
							self.app.platform.papi.post(repost, _p.el.find('.repostShareInns'), function(){

							}, {
								repost : true,
								eid : "share"
							})

							_p.el.find('.repostCaption').on('click', function(){

								currentShare.repost.set()

								state.save()

								self.app.nav.api.history.removeParameters(['repost'])

								
								renders.repost(function(){
									renders.tgs();
									renders.postline();
									renders.settings();
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

				var pollWrapper = el.c.find('.pollWrapper');

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
	
				el.c.find('.pollWrapper').on('click', function(){

					events.removePoll();
				})

			
			},

			makesortable : function(){
				var ps = {
					animation: 150,
					swapThreshold : 0.5,
					draggable : '.draggablepart',
					onUpdate: function (evt){
	
						var na = [];
					   
						var ps = el.c.find('.draggablepart');
	
						$.each(ps, function(){
							na.push($(this).attr('part'))
						})

						currentShare.settings.a = na
	
						if (essenseData.changeArrange){
							essenseData.changeArrange()
						}

						if(!essenseData.share){
							state.save()
						}
					},

					forceFallback : true,
					handle : '.marker'
				}
				
				sortable = Sortable.create(el.c.find('#sortableBody')[0], ps); 

				
			},

			body : function(clbk){				
				self.shell({
					name :  'body',
					el : el.body,
					data : {
						share : currentShare,
						ed : essenseData
					},

					insertimmediately : true

				}, function(p){

					if(!el.c) return
					
					el.message = el.c.find('.message');
					el.eMessage = el.c.find('#emjcontainer');
					el.urlWrapper = el.c.find('.urlWrapper')
					el.caption = el.c.find('.captionshare');
					el.cpt = el.c.find('.cpt')
					el.images = el.c.find('.imagesWrapper')
					el.poll = el.c.find('.pollWrapper')
					el.updateWallpaperInput = el.c.find('.wallpaperShareInput');
					el.wallpaperStatusIcon = el.c.find('.wallpaperStatusIcon');

					el.eMessage.emojioneArea({
						pickerPosition : 'bottom',
						
						search : false,
						tones : false,
						autocomplete : false,
		
						attributes: {
							spellcheck : true,
						},

						shortnames : !isTablet(),
		
						filters : isTablet() ? null : {
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

								el.c.find('.emojionearea-editor').attr('elementsid', 'emjInput');
		
								if (parameters().newshare){
									el.c.find('.emojionearea-editor').focus()
								}
					
								el.c.find('.emojionearea-editor').pastableContenteditable();
		
		
								el.c.find('.emojionearea-editor').on('pasteImage', function (ev, data){
		
									resize(data.dataURL, 1920, 1080, function(resized){
										var r = resized.split(',');
						
										if (r[1]){
						
											var r  = currentShare.images.set(resized)
		
											if(!r){
												sitemessage(errors.images)
											}
											else
											{
												if (renders.images)
													renders.images();
											}
						
										}
										else{
											sitemessage("Image upload error")
										}
									
									})
		
		
								}).on('pasteImageStart', function(){
		
		
								}).on('pasteImageError', function(ev, data){
		
		
								}).on('pasteText', function (ev, data){
		
									actions.eTextChange(el.eMessage[0].emojioneArea)
		
								});

								// Hide the emoji button for mobiles and tablets
								if (isMobile() || isTablet())
									el.c.find('.emojionearea-button').hide();
		
							}
						}
					});
					
					el.caption.on('keyup', events.caption)

					renders.makesortable()
					
					actions.autoFilled()

					if (clbk)
						clbk();
				})
			}

		}

		var state = {
			save : function(){

				if(essenseData.dontsave) return

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

				if(essenseData.dontsave) return

				var last = self.app.settings.get(self.map.id, 'currentShare_v1')

				if (last){

					currentShare.import(last)

					var lastvideo = self.app.settings.get('common', 'lastuploadedvideo');

					if (lastvideo && !lastvideo.wasclbk){

						if(!currentShare.itisvideo() && !currentShare.itisaudio())
							actions._videoadded(lastvideo.link, lastvideo.name)
							
						self.app.settings.delete('common', 'lastuploadedvideo');
					}
				}
					

				return last
			}
		}

		var make = function(){
			if(destroying) return

			renders.all()
		}

		var makeDebounced = _.debounce(make, 300)

		var initEvents = function(){

			el.changeAddress.on('change', events.changeAddress)			

			
			//autosize(el.c.find('textarea'));

			if(!isMobile())

				el.c.find('.tooltip').tooltipster({
	                theme: 'tooltipster-light',
	                maxWidth : 600,
	                zIndex : 20,
	            }); 

			
			
			currentShare.on.change.edit = events.change;

			self.app.platform.sdk.paidsubscription._clbks.setcondition['share' + key] = function(){
				renders.settings()
			}

			//self.app.platform.ws.messages.transaction.clbks.share = actions.waitActions

			el.c.on('click', function(){
				
				if (!clickOnCreateHappened) {
					self.app.Logger.info({
						actionId: 'POST_CREATING_STARTED',
						actionSubType: 'FROM_MAIN_FORM',
					});

					clickOnCreateHappened = true;
				};

				if (el.c) el.c.addClass('focus').removeClass('unfocus')
			})

			$('html').on('click', events.unfocus);

			actions.toggleTimesDisplay();

			
		}


		var destroyPlayer = function(){

			console.log('player', player)

			if (player) {

				if (player.playing){
					player.stop()
				}

				if (player.destroy) player.destroy()

				player = null
			}
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

				if (_p.marticlev && !self.app.nav.wnds['articlev']){
					actions.embeding('article', null)
				}

				if (_p.marticles && !self.app.nav.wnds['articles']){
					actions.embeding('article', null)
				}
				
			},

			getdata : function(clbk, p){
				destroying = false
				intro = false;
				external = null
				currentShare = deep(p, 'settings.essenseData.share') || new Share(self.app.localization.key, self.app);

				essenseData = deep(p, 'settings.essenseData') || {};

				currentShare.app = self.app

				if(!essenseData.share && !essenseData.dontsave){

					if(!state.load() && window.project_config.preferredtags && window.project_config.preferredtags.length){
						if (essenseData.repost || parameters().repost) {

						}
						else{

							var preferred = self.app.platform.sdk.categories.getbyids(window.project_config.preferredtags, self.app.localization.key)

							var preferredtags = []

							_.each(preferred, (p) => {
								preferredtags = preferredtags.concat(p.tags)
							})

							currentShare.tags.set(preferredtags)
						}
					}
					
					currentShare.language.set(self.app.localization.key)
				}

				if (essenseData.repost || parameters().repost) 
					currentShare.repost.set(essenseData.repost || parameters().repost)

				var checkEntity = currentShare.message.v || currentShare.caption.v || currentShare.repost.v || currentShare.url.v || currentShare.images.v.length;


				var data = {
					essenseData : essenseData,
					share : currentShare,
					postcnt : 1,
					checkEntity : checkEntity,
				};

				if (currentShare.settings.t > 1){
					if((new Date).getTime() / 1000 > currentShare.settings.t){
						currentShare.settings.t = 0
					}
				}

				clbk(data);



			},

			destroy : function(){

				destroyPlayer()

				destroying = true

				if (el.c)
					el.c.find('.emojionearea-editor').off('pasteImage')

				try{
					if (el.eMessage) {
		
						el.eMessage[0].emojioneArea.destroy();

						el.eMessage.remove()

						delete el.eMessage[0].emojioneArea


					}

					
				}
				catch(e){
					console.error(e)
				}
				

				if (external){

					if (external.removeclbk)
						external.removeclbk('share' + key, 'closed')

					if(!external.uploading || !external.uploading()){
						external.closehack()
					}
						
					else{
						external.removeclbk('share' + key)
						
					}

					

					external = null
				}

				

				if (taginput){
					taginput.destroy()
					taginput = null
				}

				
				

				$('html').off('click', events.unfocus);

				delete self.app.platform.ws.messages.transaction.clbks.share;
				delete self.app.platform.sdk.paidsubscription._clbks.setcondition['share' + key]

				if (sortable){
					sortable.destroy()
					sortable = null
				}

				if(el.c) el.c.empty()

				el = {};
					
			},
			
			init : function(p){

				loadedimages = {}
				loadingimages = {}

				el = {};
				el.c = p.el.find('#' + self.map.id);

				
				el.tgsWrapperMain = el.c.find('.tgsWrapperMain')
				
				el.error = el.c.find('.error');		
				
				el.changeAddress = el.c.find('.changeAddress')
				el.repostWrapper = el.c.find('.repostWrapper')
				el.postline = el.c.find('.postlineWrapper')
				el.settings = el.c.find('.settingsWrapper')
				el.body = el.c.find('.bodywrapper')

				initEvents();

				if (essenseData.videoLink) {
					currentShare.url.set(essenseData.videoLink);

					currentShare.settings.a = ['i', 'u', 'cm', 'p'];
					currentShare.caption.set('');
					currentShare.images.set();
					currentShare.repost.set();

					if (essenseData.name) {
						currentShare.caption.set(findAndReplaceLinkClearReverse(essenseData.name));
					}
				}

				if (essenseData.url) {
					currentShare.url.set(essenseData.url);
				}

				if (essenseData.description) {
					currentShare.message.set(findAndReplaceLinkClearReverse(essenseData.description));
				}

				if (essenseData.tags) {
					essenseData.tags.map(tag => currentShare.tags.set(tag));
				}

				var externallatest = deep(self, 'app.modules.uploadpeertube.module.essenses.uploadpeertube')


				if (externallatest && !externallatest.destroyed){
					external = externallatest

					external.addclbk('share' + key, actions.videoadded)
					external.addclbk('share' + key, actions.closeexternal, 'closed')
				}

				if (essenseData.images){
					currentShare.images.set(essenseData.images);
				}

				make();

				//p.noscroll = self.app.actions.scrollBMenu()

				p.clbk(null, p);

				//actions.waitActions();

				el.c.on('click', function(){
					el.c.removeClass('minimized')
				})
				

			},

			wnd : {
				close : function(){
					self.nav.api.history.removeParameters(['ext'])
					
					if (essenseData.close){
						essenseData.close()
					}
				},
				class : "smallWnd withoutButtons wndsharepost normalizedmobile maxheight showbetter nobfilter"
			},

			id : p._id,

			eid : p.mid
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

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