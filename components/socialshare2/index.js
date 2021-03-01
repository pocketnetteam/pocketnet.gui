var socialshare2 = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history'), st;
		var seed = ''

		var el, defaultText = self.app.localization.e('e13171'), 
			defmedtext = self.app.localization.e('e13172') + '\r\n';

		var ed = {};
		var showcode = false

		var calltoActionNotInclude = false;
		var calltoActionUserText = '';

		var plugin = deep(window, 'plugins.socialsharing')

		var actions = {
			shareText : function(){
				/*if (!st || calltoActionNotInclude) return '';
				if (calltoActionUserText) return calltoActionUserText*/
				
				return defmedtext
			}
		}

		var embeddingSettings = {

			black : new Parameter({
				name: "Black Theme",
				id: 'black',
				type: "BOOLEAN",
				value: false
			}),

			autoplayvideo : new Parameter({
				name: "Autoplay Video",
				id: 'black',
				type: "BOOLEAN",
				value: false
			}),

			fullscreenvideo : new Parameter({
				name: "Fullscreen Video",
				id: 'fullscreenvideo',
				type: "BOOLEAN",
				value: false
			}),

			comments : new Parameter({
				name: "Include comments",
				id: 'comments',
				type: "VALUES",
				defaultValue: 'last',
				possibleValues: ['last', 'all', 'no'],
				possibleValuesLabels: ['Show Only last comment', 'Show All comments', "Don't show comments"],
				value: "",
			}),

		}

		var events = {
			
		}

		var embedding = {
			post : {
				settings : function(id){

					var s = ['black', 'comments']

					var share = self.app.platform.sdk.node.shares.storage.trx[id];

					if (share){
						if(share.url){
							var meta = app.platform.parseUrl(share.url);

							if((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube'){
								s.push('fullscreenvideo')
							}
						}
					}

					return Promise.resolve(s)
				},
				action : function(settings, id){
					return Promise.resolve('lenta')
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

				if (ed.sharing){
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

				console.log('emeta', emeta)

				emeta.settings(ed.embedding.id).then(settingsm => {
					settings = {}
					
					_.each(settingsm, function(i){
						settings[i] = embeddingSettings[i]
					})

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
								console.log("CHANGE")
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
							console.log('showcode', showcode)
							showhidecode()
						})

						_p.el.find('.copycode').on('click', function(){
							copycleartext(renders.embeddingcode(action, ed.embedding.id, settings))
							sitemessage(self.app.localization.e('successcopied'))
						})
					})

				})

				
				
			},

			embeddingcode : function(action, actionid, settings){
				console.log('action', action)
				var p = {};

				_.each(settings, function(s, i){
					p[i] = s.value
				})

				var emeta = embedding[ed.embedding.type]

				if (emeta.extra){
					emeta.extra(p)
				}

				if (self.app.platform.sdk.address.pnet()){
					p.ref = self.app.platform.sdk.address.pnet().address
				}
				else{
					if (self.app.ref){
						p.ref = self.app.platform.sdk.address.pnet().address = self.app.ref
					}
				}
				

				p = hexEncode(JSON.stringify(p))

				if(action && actionid){
					return '<div id="pocketnet_'+seed+'"></div><script src="https://pocketnet.app/js/widgets.js"></script><script type="text/javascript">(new window.PNWIDGETS()).make('+seed+', "'+action+'", "'+actionid+'", "'+p+'")</script>'
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
				c : '#f82a53'
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
				}
			},
			{
				n : 'Facebook',
				i : '<i class="fab fa-facebook-f"></i>',
				t : 'facebook',
				c : '#3b5999',
				//s : 'shareViaFacebook',

				if : function(){
					var i = deep(window, 'plugins.socialsharing.canShareVia') || !window.cordova

					return i
				}
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
				}
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
				}
			},

			{
				n : 'Reddit',
				i : '<i class="fab fa-reddit-alien"></i>',
				t : 'reddit',
				c : '#ff5700'
			},

			{
				n : 'LinkedIn',
				i : '<i class="fab fa-linkedin-in"></i>',
				t : 'linkedin',
				c : '#0077B5'
			},
			{
				n : 'Gmail',
				i : '<i class="fab fa-google"></i>',
				t : 'gmail',
				c : '#fbbc05'
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
				}
			},

			{
				n : 'VK',
				i : '<i class="fab fa-vk"></i>',
				t : 'vk',
				c : '#45668e'
			},

			{
				n : 'Tumblr',
				i : '<i class="fab fa-tumblr"></i>',
				t : 'tumblr',
				c : '#35465c'
			},
			{
				n : 'Blogger',
				i : '<i class="fab fa-blogger-b"></i>',
				t : 'blogger',
				c : '#f57d00'
			},

		]

		var state = {
			save : function(){
				/*self.app.settings.set(self.map.id, 'calltoActionNotInclude', calltoActionNotInclude);
				self.app.settings.set(self.map.id, 'calltoActionUserText', calltoActionUserText);*/
				
			},
			load : function(){
				/*calltoActionUserText = self.app.settings.get(self.map.id, 'calltoActionUserText') || '';
				calltoActionNotInclude = self.app.settings.get(self.map.id, 'calltoActionNotInclude') || false;*/
			}
		}

		var htmlhelpers = {
			linkbutton : function(url, text){
				var h = ''

				h+='<table border="0" cellpadding="0" cellspacing="0" style="background-color:#f12400; border:1px solid #f12400; border-radius:2px;">'
				h+='<tr>'
				h+='<td align="center" valign="middle" style="color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; letter-spacing:-.5px; line-height:150%; padding-top:15px; padding-right:30px; padding-bottom:15px; padding-left:30px;">'
				h+='<a track href="'+url+'" target="_blank" style="color:#FFFFFF; text-decoration:none;">'+text+'</a>'
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

						var t = actions.shareText() +  '\r\n\r\n' + trimHtml(ed.sharing.text.body, 500).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...') + '\r\n\r\n' + htmlhelpers.link(ed.url, 'Сontinue on Pocketnet');

						if (deep(app, 'platform.sdk.user.storage.me.name')){
							t += '\r\n\r\nBest,\r\n' + deep(app, 'platform.sdk.user.storage.me.name')
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

					var text = ed.sharing.title + ": " + ed.sharing.text.preview + '\r\n\r\n' + htmlhelpers.link(ed.url, 'Сontinue on Pocketnet')

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

							text = actions.shareText() +  '\r\n\r\n' +  ed.sharing.text.body + '\r\n\r\n' + htmlhelpers.link(ed.url, 'Сontinue on Pocketnet');

							if (deep(app, 'platform.sdk.user.storage.me.name')){
								text += '\r\n\r\nBest,\r\n' + deep(app, 'platform.sdk.user.storage.me.name')
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

			el.c.find('.url').on('click', function(){
				copycleartext(ed.url)
				sitemessage(self.app.localization.e('urlsuccesscopied'))
			})

		}



		return {
			primary : primary,

			getdata : function(clbk, p){

				st = p.state

				ed = p.settings.essenseData || {}
				console.log('ed.sharing', ed.sharing)
				state.load()

				ed.title || (ed.title = 'Pocketnet')
			    /*ed.text || (ed.text = self.app.localization.e('e13171'))
			    ed.image || (ed.image = 'https://pocketnet.app/img/logobigpadding.png') */
			   

				seed = rand(10000, 99999)

			    if(!ed.url){

			    	if(typeof _Electron != 'undefined' || window.cordova){

			    		var p = window.location.pathname.split('/')

			    		var pn = p[p.length - 1]

						ed.url = 'https://pocketnet.app/' +  pn + window.location.search
						
				    }
				    else
				    {
				    	ed.url = 'https://pocketnet.app/' + self.app.nav.get.href()
				    }

				}
				
				if (self.app.platform.sdk.address.pnet()){
					ed.url = self.app.nav.api.history.addParametersToHref(ed.url, {
						ref : self.app.platform.sdk.address.pnet().address
					})
				}
				else{
					if (self.app.ref){
						ed.url = self.app.nav.api.history.addParametersToHref(ed.url, {
							ref : self.app.ref
						})
					}
				}
				
					

			
				var data = {
					socials : getsocials(),
					url : ed.url,
					rescue : ed.rescue || false,
					caption : ed.caption,
					style : ed.style || "",
	
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

					renders.embedding()
			

				p.clbk(null, p);
			},

			wnd : {
				swipeClose : false,
				swipeMintrueshold : 30,
				header : self.app.localization.e('e13174'),
				class : 'sharingwindow2'
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
	module.exports = socialshare2;
}
else{

	app.modules.socialshare2 = {};
	app.modules.socialshare2.module = socialshare2;

}