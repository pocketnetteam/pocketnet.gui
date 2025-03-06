var socialshare2 = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history'), st;
		var seed = ''

		var el, defaultText = self.app.localization.e('e13171'), 
			defmedtext = self.app.localization.e('e13172') + '\r\n';

		var ed = {};
		var showcode = false, notincludedRef = false, postId = ''

		var eparameters = {}


		var plugin = deep(window, 'plugins.socialsharing')

		var actions = {
			shareText : function(){
				/*if (!st || calltoActionNotInclude) return '';
				if (calltoActionUserText) return calltoActionUserText*/
				
				return defmedtext
			},

			repost : function(shareid){

				self.app.platform.sdk.user.stateAction(() => {

					var share = self.psdk.share.get(shareid) 

					self.app.platform.ui.share({
						repost : share.repost || shareid
					})

					setTimeout(function(){
						self.closeContainer()
					}, 200)

				})
				

			},

			saveimage : function(){
				var src = ed.sharing.images[0];


				globalpreloader(true)

				srcToData(src, function (base64) {

					imagetojpegifneed({ base64, name }).then(({ base64, name }) => {

						self.app.mobile.saveImages.save(base64, name, function (d, err) {


							globalpreloader(false)

							if (d) {
								successCheck()
							}
							else {
								sitemessage(self.localization.e('e13230') + (err && err.code ? (': ' + err.code) : '' ))
							}

						})

					})



				})
			},

			nativeshare : function(){

				if (plugin){


					var images = ed.sharing.image ? [ed.sharing.image] : ed.sharing.images || []

					globalpreloader(true)

					convertimages(images).then((imgs) => {
						var sharing = {...ed.sharing}

						delete sharing.image

						sharing.images = imgs || []

						var options = {}

						sharing.text && sharing.text.body ? options.message = sharing.text.body : ''
						sharing.text && sharing.text.title ? options.subject = sharing.text.title : ''
						sharing.images && sharing.images.length ? options.files = sharing.images : ''
						ed.url ? options.url = ed.url : ''

						plugin.shareWithOptions(options, function(){
	
							globalpreloader(false)
	
							setTimeout(function(){
								self.closeContainer()
							}, 200)
	
						}, function(e){
							console.error(e)
							globalpreloader(false)
	
						});
					})

					
				}
				else{
					actions.applyview('share')
					renders.sharebuttons()
				}

				
			},
			applyview : function(view){

				if(!view){
					el.c.removeAttr('show', view)
					el.c.find('.embeddingWrapperCnt').html('')
				}
				else{
					el.c.attr('show', view)
				}
				
			}

		}

		var black = false

		try {
			black = localStorage.getItem('usertheme') === 'black' ? true : false
		}
		catch (e) { }

		var embeddingSettings = {

			black : new Parameter({
				name: self.app.localization.e('blackTheme'),
				id: 'black',
				type: "BOOLEAN",
				value: black
			}),


			autoplayvideo : new Parameter({
				name: self.app.localization.e('autoplayVideo'),
				id: 'black',
				type: "BOOLEAN",
				value: false
			}),

			fullscreenvideo : new Parameter({
				name: self.app.localization.e('removeDescription'),
				id: 'fullscreenvideo',
				type: "BOOLEAN",
				value: false
			}),

			onlyvideo : new Parameter({
				name: self.app.localization.e('onlyVideo'),
				id: 'onlyvideo',
				type: "BOOLEAN",
				value: false
			}),

			comments : new Parameter({
				name: self.app.localization.e('includeComments'),
				id: 'comments',
				type: "VALUES",
				defaultValue: 'last',
				possibleValues: ['last', 'all', 'no'],
				possibleValuesLabels: [self.app.localization.e('showOnlyLast'), self.app.localization.e('showAll'), self.app.localization.e('dontShow')],
				value: "",
			}),

		}

		var events = {

			repost : function(e){

				e.target.blur();
				self.app.mobile.vibration.small()

				actions.repost(postId);

				
			},

			nativeshare : function(e){

				e.target.blur();
				self.app.mobile.vibration.small()

				actions.nativeshare()
			}

			
		}

		var embedding = {
			post : {
				settings : function(id){

					var s = ['black', 'comments']

					var share = self.psdk.share.get(id) 
					

					if (share){
						if(share.url){
							var meta = app.platform.parseUrl(share.url);

							if((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube' || meta.type == 'ipfs'){
								s.push('fullscreenvideo')
							}

							
						}

						if(share.itisvideo()){
							s = ['onlyvideo']
						}
					}

					return Promise.resolve(s)
				},
				action : function(settings, id){
					return Promise.resolve('lenta')
				}
			},

			connect: {
				
				settings : function(id){
					return Promise.resolve(['black'])
				},
				action : function(settings, id){
					return Promise.resolve('connect')
				}
			},

			channel : {
				settings : function(id){
					return Promise.resolve(['black'])
				},
				action : function(settings, id){
					return Promise.resolve('channel')
				}
			},

			comment : {
				settings : function(id){
					return Promise.resolve(['black'])
				},
				action : function(settings, id){
					return Promise.resolve('comment')
				},

				extra : function(p){
					p.commentPs = {
						commentid : ed.embedding.commentid,
						parentid : ed.embedding.parentid
					}
				}
			}
		}

		var renders = {
			sharebuttons : function(){

				if (ed.sharing && ed.url){
					self.shell({

						name :  'sharebuttons',
						el :   el.c.find('.sharebuttons'),
						data : {
							socials : getsocials(),
						},
	
					}, function(_p){
						initbuttons()
					})
				}	

				
			},

			embedding : function(){

				if (!ed.embedding) return

				var emeta = embedding[ed.embedding.type]
				var settings = []

				emeta.settings(ed.embedding.id).then(settingsm => {
					settings = {}
					
					_.each(settingsm, function(i){
						settings[i] = embeddingSettings[i]
					})

					/*if(settings.onlyvideo && settings.onlyvideo.value){
						_.each(settings, function(s){
							if (s.id != 'onlyvideo')
								s.hidden = true
						})
					}
					else{
						_.each(settings, function(s){
							s.hidden = false
						})
					}*/

					return Promise.resolve()
				}).then(() => {
					return emeta.action(settings, ed.embedding.id)
				}).then(action => {

					self.shell({

						name :  'embedding',
						el :   el.c.find('.embeddingWrapperCnt'),
						data : {
							embeddingcode : renders.embeddingcode(action, ed.embedding.id, settings),
							embeddingSettings : settings
						},
	
					}, function(_p){
						ParametersLive(settings, _p.el)

						_.each(settings, function(s){
							s._onChange = function(){
								renders.embedding()
							}
						})

						var showhidecode = function(){
							if(showcode){
								_p.el.addClass('showedcode')
							}
							else{
								_p.el.removeClass('showedcode')
							}
						}
						
						showhidecode()

						_p.el.find('.showcode').on('click', function(){
							showcode = !showcode
							showhidecode()
						})

						_p.el.find('.copycode').on('click', function(){
							copycleartext(renders.embeddingcode(action, ed.embedding.id, settings, embeddingSettings))
							sitemessage(self.app.localization.e('successcopied'))
						})
					})
				})
				
			},

			embeddingcode : function(action, actionid, settings){

				var p = {};

				_.each(settings, function(s, i){
					p[i] = s.value
				})

				var emeta = embedding[ed.embedding.type]

				if (emeta.extra){
					emeta.extra(p)
				}

				if (self.app.user.address.value){
					p.ref = self.app.user.address.value
				}
				else{
					if (self.app.ref){
						p.ref = self.app.user.address.value = self.app.ref
					}
				}

				if(settings.onlyvideo){

					var share = self.psdk.share.get(actionid) 
					

					if (share && share.url && action && actionid){

						var hid = app.peertubeHandler.parselink(share.url)

						var info = self.app.platform.sdk.videos.storage[share.url] || self.app.platform.sdk.videos.storage[hid.id] || {}

						var aspectRatio = (info.data || {}).aspectRatio || 1.77

						var width = 640
						var height = (width / aspectRatio).toFixed(0)

						return '<iframe width="'+width+'" style="aspect-ratio:'+aspectRatio+'" src="https://'+self.app.options.url+'/embedVideo.php?embed=true&s='+actionid+'&host='+hid.host+'&id='+hid.id+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
					}	
					
					return ''

				}

				p = hexEncode(JSON.stringify(p))

				if (action && actionid){
					return '<div id="pocketnet_'+seed+'"></div><script src="https://'+self.app.options.url+'/js/widgets.js"></script><script type="text/javascript">(new window.PNWIDGETS()).make('+seed+', "'+action+'", "'+actionid+'", "'+p+'")</script>'
				}	
				else{
					return ''
				}

				
			}
		}

		var getsocials = function(){
			return _.filter(socials, function(s){
				if(!s.if || s.if()) return true
			})
		}

		var findsocial = function(t){
			return _.find(socials, function(s){
				return s.t == t
			})
		}

		var socials = [
			{
				n : 'Email',
				i : '<i class="far fa-envelope"></i>',
				t : 'email',
				c : '#f82a53',

				group : 'email'
			},

			{
				n : 'Telegram',
				i : '<i class="fab fa-telegram-plane"></i>',
				t : 'telegram',
				c : '#0088cc',

				group : 'messenger'
			},

			{
				n : 'Viber',
				i : '<i class="fab fa-viber"></i>',
				t : 'viber',
				c : '#59267c',

				group : 'messenger'
			},

			{
				n : 'SMS',
				i : 'SMS',
				t : 'sms',
				c : '#143e50',
				s : 'shareViaSMS',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia')

					return i
				},

				group : 'messenger'
			},
			{
				n : 'Parler',
				i : '<img src="img/parlerlogo.png">',
				t : 'parler',
				c : '#d31f3e',

				group : 'social'
			},

			{
				n : 'Facebook',
				i : '<i class="fab fa-facebook-f"></i>',
				t : 'facebook',
				c : '#3b5999',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia') || !window.cordova

					return i
				},

				group : 'social'
			},

			{
				n : 'Instagram',
				i : '<i class="fab fa-instagram"></i>',
				t : 'instagram',
				c : '#fd1d1d',
				s : 'shareViaInstagram',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia')
					return i
				},

				group : 'social'
			},

			{
				n : 'Twitter',
				i : '<i class="fab fa-twitter"></i>',
				t : 'twitter',
				c : '#55acee',
				//s : 'shareViaTwitter',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia') || !window.cordova

					return i
				},

				group : 'social'
			},

			{
				n : 'Reddit',
				i : '<i class="fab fa-reddit-alien"></i>',
				t : 'reddit',
				c : '#ff5700',

				group : 'social'
			},

			/*{
				n : 'LinkedIn',
				i : '<i class="fab fa-linkedin-in"></i>',
				t : 'linkedin',
				c : '#0077B5',

				group : 'social'
			},*/
			{
				n : 'Gmail',
				i : '<i class="fab fa-google"></i>',
				t : 'gmail',
				c : '#fbbc05',

				group : 'email'
			},
			{
				n : 'Whatsapp',
				i : '<i class="fab fa-whatsapp"></i>',
				t : 'whatsapp',
				c : '#075e54',
				s : 'shareViaWhatsApp',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia') || !window.cordova

					return i
				},

				group : 'messenger'
			},

			{
				n : 'VK',
				i : '<i class="fab fa-vk"></i>',
				t : 'vk',
				c : '#45668e',

				group : 'social'
			},

			{
				n : 'Tumblr',
				i : '<i class="fab fa-tumblr"></i>',
				t : 'tumblr',
				c : '#35465c',

				group : 'blog'
			},
			{
				n : 'Blogger',
				i : '<i class="fab fa-blogger-b"></i>',
				t : 'blogger',
				c : '#f57d00',

				group : 'blog'
			},

		]

		var state = {
			save : function(){
				self.app.settings.set(self.map.id, 'notincludedRef', notincludedRef);
				
			},
			load : function(){
				notincludedRef = self.app.settings.get(self.map.id, 'notincludedRef') || false;
			}
		}

		var htmlhelpers = {
			linkbutton : function(url, text){
				var h = ''

				h+='<table border="0" cellpadding="0" cellspacing="0" style="background-color:#f12400; border:1px solid #f12400; border-radius:2px;">'
				h+='<tr>'
				h+='<td align="center" valign="middle" style="color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; letter-spacing:-.5px; line-height:150%; padding-top:15px; padding-right:30px; padding-bottom:15px; padding-left:30px;">'
				h+='<a elementsid="'+url+'" track href="'+url+'" target="_blank" style="color:#FFFFFF; text-decoration:none;">'+text+'</a>'
				h+='</td>'
				h+='</tr>'
				h+='</table>'

				return h
			},

			link : function(url, text){
				var b = text + ':\r\n'
				b+= url
				return b
			}
		}

		var initbuttons = function(){

			el.c.find('.socialsharebtn').each(function(){
				var _el = $(this)
				
				if (_el.hasClass('s_email')){
					
					_el.on('click', function(){

						var t = actions.shareText() +  '\r\n\r\n' + trimHtml(ed.sharing.text.body, 500).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...') + '\r\n\r\n' + htmlhelpers.link(ed.url, self.app.localization.e('continueon') + ' ' + self.app.meta.fullname);

						var info = self.psdk.userInfo.getmy()

						if (info && info.name){
							t += '\r\n\r\n'+self.app.localization.e('bestwishes')+'\r\n' + self.app.platform.api.clearname(info.name, true)
						}

						var m = '';
							m += 'mailto:';
							m += '?subject=' + ed.sharing.title;
							m += '&body=';
							m += encodeURIComponent(t);

						window.location.href = m;

					})					

				}
				else{

					var text = ''
					
					if(ed.sharing.title || ed.sharing.text){
						ed.sharing.title + ": " + ed.sharing.text.preview + '\r\n\r\n' + self.app.localization.e('continueon') + ' ' + self.app.meta.fullname
					}
					

					var type = _el.data('type');
					var b = findsocial(type)

					if (b && b.s && window.cordova && plugin){

						var s = b.s

						_el.on('click', function(){
							if(s == 'shareViaFacebook' || s == 'shareViaTwitter' || s == 'shareViaWhatsApp'){
								plugin[s](text, ed.sharing.image, ed.url)
							}

							if(s == 'shareViaInstagram'){
								plugin[s](text, ed.sharing.image)
							}

							if(s == 'shareViaSMS'){
								plugin[s]({
									'message': text + " " + ed.url, 
									'subject': ed.sharing.title, 
									'image': ed.sharing.image
								})
							}
						})
						
					}
					else{

						if (_el.hasClass('s_gmail')){

							text = actions.shareText() +  '\r\n\r\n' +  ed.sharing.text.body + '\r\n\r\n' + htmlhelpers.link(ed.url, self.app.localization.e('continueon') + ' ' + self.app.meta.fullname);

							var info = self.psdk.userInfo.getmy()

							if (info && info.name){
								text += '\r\n\r\nBest,\r\n' + info.name
							}
							
						}

						_el.ShareLink({
							title: ed.sharing.title,
							text: text,
							image: ed.sharing.image, 
							url: ed.url, 
							class_prefix: 's_', 
							width: 640, 
							height: 480
						})
					}

					_el.on('click', function(){
						var type = $(this).data('type');

					})
				}
				
			}) 
		}

		var initEvents = function(){

			el.c.find('.url .button').on('click', function(){
				copycleartext(ed.url)
				sitemessage(self.app.localization.e('urlsuccesscopied'))

				setTimeout(function(){
					self.closeContainer()
				}, 200)
			})

			el.c.find('.makepost .button').on('click', function(e){

				e.target.blur();
				self.app.mobile.vibration.small()

				self.app.platform.sdk.user.stateAction(() => {

					var p = {dontsave : true}

					p.description = '' 
					

					if (ed.sharing){

						if (ed.sharing.title){
							p.description = p.description + superXSS(ed.sharing.title) + '\n'
						}

						if (ed.sharing.text && ed.sharing.text.body){
							p.description = p.description + superXSS(ed.sharing.text.body) + '\n'
						}

						p.images = ed.sharing.image ? [ed.sharing.image] : ed.sharing.images || []

						p.images = _.map(p.images, (im) => {
							return superXSS(im)
						})

						p.tags = ed.sharing.tags || []
					}
					
					if (ed.url){
						p.url = self.app.nav.api.history.removeParametersFromHref(superXSS(ed.url), ['ref'])

						if(p.description != '') p.description = p.description + '\n'

						p.description = p.description + p.url
					}

					self.app.platform.ui.share(p)

					setTimeout(function(){
						self.closeContainer()
					}, 200)

				})
				

				setTimeout(function(){
					self.closeContainer()
				}, 200)
			})

			el.c.find('.chat .button').on('click', function(){

				if (ed.url){
					var url = self.app.nav.api.history.removeParametersFromHref(ed.url, ['ref'])
			
					self.app.platform.matrixchat.share.url(url).catch(r => {})
	
					
				}

				else{


					var images = ed.sharing.image ? [ed.sharing.image] : ed.sharing.images || []

					globalpreloader(true)


					convertimages(images).then((imgs) => {
						var sharing = {...ed.sharing}

						delete sharing.image

						sharing.images = imgs || []

						self.app.platform.matrixchat.share.object(sharing).catch(r => {})

						globalpreloader(false)
					})

					
				}


				setTimeout(function(){
					self.closeContainer()
				}, 200)
				
			
			})

			el.c.find('.forrepost').on('click', events.repost)


			el.c.find('.nativeshare .button').on('click', events.nativeshare)

			el.c.find('.saveimage .button').on('click', actions.saveimage)

			el.c.find('.backwrapper').on('click', function(){
				actions.applyview('')
			})

			el.c.find('.embeddingshow').on('click', function(){
				actions.applyview('embeding')
				renders.embedding()
			})

		}

		var changeRef = function(){
			if(!notincludedRef){
				includeRef()
			}
			else{
				excludeRef()
			}
		}

		var includeRef = function(){
			if (self.app.user.address.value){
				ed.url = self.app.nav.api.history.addParametersToHref(ed.url, {
					ref : self.app.user.address.value
				})
			}
			else{
				if (self.app.ref){
					ed.url = self.app.nav.api.history.addParametersToHref(ed.url, {
						ref : self.app.ref
					})
				}
			}
		}

		var excludeRef = function(){
			ed.url = self.app.nav.api.history.removeParametersFromHref(ed.url, ['ref'])
		}

		var prepareParameters = function(){

			eparameters.reflink = new Parameter({
				name: self.app.localization.e('includeRefLink'),
				id: 'reflink',
				type: "BOOLEAN",
				value: !notincludedRef,
				dbId: 'reflink'
			})


			eparameters.reflink._onChange = function(){
				notincludedRef = !eparameters.reflink.value

				state.save()

				changeRef()

				

				//renders.embedding()
			}
			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				st = p.state

				ed = p.settings.essenseData || {}
				state.load()

				ed.title || (ed.title = self.app.meta.fullname)

				seed = rand(10000, 99999)

				prepareParameters()

				var share = null

				if(ed.notincludedRef) notincludedRef = ed.notincludedRef

				if(!ed.withouturl){
					if(!ed.url){

						if(typeof _Electron != 'undefined' || window.cordova){
	
							var p = window.location.pathname.split('/')
	
							var pn = p[p.length - 1]
	
							if(!pn) pn = 'index'
	
							ed.url = 'https://'+self.app.options.url+'/' +  pn + window.location.search
							
						}
						else
						{
							ed.url = 'https://'+self.app.options.url+'/' + self.app.nav.get.href() || 'index'
						}
	
					}
	
					
	
					ed.url = self.app.nav.api.history.removeParametersFromHref(ed.url, ['mpost', 'msocialshare2'])
				}

			    
				

				if(ed.embedding && ed.embedding.type == 'post'){
					postId = ed.embedding && ed.embedding.id;
					
				}
				else{
					postId = ''
				}

				if (postId){
					share = self.psdk.share.get(postId) 
				}

				changeRef()
			
				var data = {
					caption : ed.caption,
					style : ed.style || "",
					eparameters : eparameters,
					notincludedRef : ed.notincludedRef, 
					postId: postId,
					share : share,
					ed
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

				el.url = el.c.find('.url');

				initEvents();

				renders.sharebuttons()

				

				ParametersLive(_.toArray(eparameters), el.c)
			

				p.clbk(null, p);
			},

			wnd : {
				swipeClose : true,
				trueshold : 1,
				swipeCloseDir : 'down',
				header : self.app.localization.e('e13174'),
				class : 'sharingwindow2 centercontentWindow normalizedmobile noheader withoutButtons'
			}
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
	module.exports = socialshare2;
}
else{

	app.modules.socialshare2 = {};
	app.modules.socialshare2.module = socialshare2;

}