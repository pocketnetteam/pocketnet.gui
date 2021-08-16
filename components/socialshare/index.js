var socialshare = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history'), st;

		var el, defaultText = self.app.localization.e('e13171'), defmedtext = self.app.localization.e('e13172') + '\r\n';
		var ed = {};

		var calltoActionNotInclude = false;
		var calltoActionUserText = '';

		var plugin = deep(window, 'plugins.socialsharing')

		var actions = {
			shareText : function(){


				if (!st || calltoActionNotInclude) return '';

				if (calltoActionUserText) return calltoActionUserText
				
				return defmedtext
			}
		}

		var events = {
			
		}

		var renders = {
			sharebuttons : function(){
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
				i : '<i class="far fa-envelope"></i> ' + self.app.localization.e('e13173'),
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
				n : 'Pinterest',
				i : '<i class="fab fa-pinterest-p"></i>',
				t : 'pinterest',
				c : '#bd081c'
			},

			{
				n : 'LinkedIn',
				i : '<i class="fab fa-linkedin-in"></i>',
				t : 'linkedin',
				c : '#0077B5'
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

			/*{
				n : 'Viber',
				i : '<i class="fab fa-viber"></i>',
				t : 'viber',
				c : '#59267c'
			},*/

			

			/*{
				n : 'Google',
				i : '<i class="fab fa-google"></i>',
				t : 'google',
				c : '#DB4437'
			},*/

		]

		var state = {
			save : function(){
				self.app.settings.set(self.map.id, 'calltoActionNotInclude', calltoActionNotInclude);
				self.app.settings.set(self.map.id, 'calltoActionUserText', calltoActionUserText);
				
			},
			load : function(){
				calltoActionUserText = self.app.settings.get(self.map.id, 'calltoActionUserText') || '';
				calltoActionNotInclude = self.app.settings.get(self.map.id, 'calltoActionNotInclude') || false;
			}
		}

		var initbuttons = function(){
			el.c.find('.socialsharebtn').each(function(){
				var _el = $(this)
				
				if (_el.hasClass('s_email')){
					
					_el.on('click', function(){

						var t = actions.shareText() +  '\r\n' + ed.title + '\r\n\r\n' + ed.text 
							+ '\r\n\r\n\r\n' + ed.url + ''
							;

						if(deep(app, 'platform.sdk.user.storage.me.name')){
							t += '\r\n\r\nBest,\r\n' + deep(app, 'platform.sdk.user.storage.me.name')
						}

						var m = '';
							m += 'mailto:';
							m += '?subject=' + ed.title;
							m += '&body=';
							m += encodeURIComponent(t);

						window.location.href = m;

					})					

				}
				else{

					var t = ed.text;

					var tit = ed.title;

						t = trim(actions.shareText() + " " + t)

					var type = _el.data('type');

					var b = findsocial(type)

					if (b && b.s && window.cordova && plugin){

						var s = b.s

						_el.on('click', function(){
							if(s == 'shareViaFacebook' || s == 'shareViaTwitter' || s == 'shareViaWhatsApp'){
								plugin[s](t, ed.image, ed.url)
							}

							if(s == 'shareViaInstagram'){
								plugin[s](t, ed.image)
							}

							if(s == 'shareViaSMS'){
								plugin[s]({
									'message': t + " " + ed.url, 
									'subject': tit, 
									'image': ed.image
								})
							}
						})
						
					}
					else{
						_el.ShareLink({
							title: tit,
							text: t,
							image: ed.image, 
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

			

			el.c.find('.copycell').on('click', function(){
				copyText(el.url.find('.urlcell'))

				sitemessage(self.app.localization.e('urlsuccesscopied'))
			})

			el.c.find('.changecallto').on('click', function(){
				calltoActionNotInclude = !calltoActionNotInclude;

				$('.additionalwrapper').toggleClass('checked')

				if(calltoActionNotInclude){
					el.c.removeClass('textshowed')
				}

				state.save()

				renders.sharebuttons()
			})

			el.c.find('.morecell').on('click', function(){
				el.c.toggleClass('textshowed')
				el.c.closest('.wnd').toggleClass('textshowedwnd')
			})

			el.c.find('.calltoActionUserText').on('keyup', function(){

				calltoActionUserText = $(this).val();

				if (calltoActionUserText == defmedtext) {
					calltoActionUserText = ''
				}

				state.save()

				renders.sharebuttons()
			})

			el.c.find('.calltoActionUserText').on('change', function(){
				if (!calltoActionUserText) {
					el.c.find('.calltoActionUserText').val(defmedtext)
				}
			})

			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				st = p.state

				ed = p.settings.essenseData || {}

				state.load()

				ed.title || (ed.title = self.app.meta.fullname)
			    ed.text || (ed.text = self.app.localization.e('e13171'))
			    ed.image || (ed.image = 'https://'+self.app.options.url+'/img/logobigpadding.png') 
			   

			    if(!ed.url){

			    	if(typeof _Electron != 'undefined' || window.cordova){

			    		var p = window.location.pathname.split('/')

			    		var pn = p[p.length - 1]

						ed.url = 'https://'+self.app.options.url+'/' +  pn + window.location.search
						
				    }
				    else
				    {
				    	ed.url = 'https://'+self.app.options.url+'/' + self.app.nav.get.href()
				    }

				}
				
				if (self.app.platform.sdk.address.pnet())
				
					ed.url = self.app.nav.api.history.addParametersToHref(ed.url, {
						ref : self.app.platform.sdk.address.pnet().address
					})


			
				var data = {
					socials : getsocials(),
					url : ed.url,
					rescue : ed.rescue || false,
					caption : ed.caption,
					style : ed.style || "",
					calltoActionUserText : calltoActionUserText || defmedtext,
					calltoActionNotInclude : calltoActionNotInclude
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

				p.clbk(null, p);
			},

			wnd : {
				swipeClose : true,
				swipeMintrueshold : 30,
				header : self.app.localization.e('e13174'),
				class : 'sharingwindow'
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
	module.exports = socialshare;
}
else{

	app.modules.socialshare = {};
	app.modules.socialshare.module = socialshare;

}