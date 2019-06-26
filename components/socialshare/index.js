var socialshare = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history'), st;

		var el, defaultText = 'Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here', defmedtext = 'I want to share this from a decentralized blockchain platform Pocketnet with you. Hope you find it useful and if you sign up, both of us will get Pocketcoin cryptocurrency bonus!\r\n';
		var ed = {};

		var calltoActionNotInclude = false;
		var calltoActionUserText = '';

		var actions = {
			shareText : function(){

				console.log('calltoActionUserText', calltoActionUserText)

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
						socials : socials,
					},

				}, function(_p){
					initbuttons()
				})
			}
		}

		var socials = [
			{
				n : 'Email',
				i : '<i class="far fa-envelope"></i> Send by email',
				t : 'email',
				c : '#f82a53'
			},
			{
				n : 'Facebook',
				i : '<i class="fab fa-facebook-f"></i>',
				t : 'facebook',
				c : '#3b5999'
			},

			{
				n : 'Twitter',
				i : '<i class="fab fa-twitter"></i>',
				t : 'twitter',
				c : '#55acee'
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

			/*{
				n : 'VK',
				i : '<i class="fab fa-vk"></i>',
				t : 'vk',
				c : '#4c75a3'
			},*/

			{
				n : 'LinkedIn',
				i : '<i class="fab fa-linkedin-in"></i>',
				t : 'linkedin',
				c : '#0077B5'
			},

			/*{
				n : 'Skype',
				i : '<i class="fab fa-skype"></i>',
				t : 'skype',
				c : '#00aff0'
			},

			{
				n : 'Telegram',
				i : '<i class="fab fa-telegram-plane"></i>',
				t : 'telegram',
				c : '#0088cc'
			},*/

			{
				n : 'Whatsapp',
				i : '<i class="fab fa-whatsapp"></i>',
				t : 'whatsapp',
				c : '#075e54'
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

						self.app.platform.m.log('sharing_by', 'email')
					})
					

				}
				else{

					var t = ed.text;

					var tit = ed.title;

					/*if(_el.hasClass('s_twitter') || _el.hasClass('s_google')) */t = trim(actions.shareText() + " " + t)

					if(_el.hasClass('s_vk') && !tit) tit = t


					_el.ShareLink({
						title: tit, // title for share message
						text: t,
						image: ed.image, 
						url: ed.url, //'https://pocketnet.app/index?ref=' + self.app.platform.sdk.address.pnet().address,
						class_prefix: 's_', 
						width: 640, 
						height: 480
					})

					_el.on('click', function(){
						var type = $(this).data('type');

						self.app.platform.m.log('sharing_by', type)
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

				ed.title || (ed.title = 'Pocketnet')
			    ed.text || (ed.text = 'Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here')
			    ed.image || (ed.image = 'https://pocketnet.app/img/logobigpadding.png') 
			   

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

			
				var data = {
					socials : socials,
					url : ed.url,
					rescue : ed.rescue || false,
					caption : ed.caption,

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
				header : "Social sharing",
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