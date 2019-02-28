var socialshare = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, defaultText = 'Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here';
		var ed = {};

		var actions = {

		}

		var events = {
			
		}

		var renders = {

		}

		var socials = [

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
				n : 'VK',
				i : '<i class="fab fa-vk"></i>',
				t : 'vk',
				c : '#4c75a3'
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
				n : 'Reddit',
				i : '<i class="fab fa-reddit-alien"></i>',
				t : 'reddit',
				c : '#ff5700'
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
			},

			{
				n : 'Email',
				i : '<i class="far fa-envelope"></i>',
				t : 'email',
				c : '#f82a53'
			},*/

		]

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.c.find('.socialsharebtn').ShareLink({
			    title: ed.title, // title for share message
			    text: ed.text,
			    image: ed.image, 
			    url: ed.url, //'https://pocketnet.app/index?ref=' + self.app.platform.sdk.address.pnet().address,
			    class_prefix: 's_', 
			    width: 640, 
			    height: 480
			})

			el.c.find('.copycell').on('click', function(){
				copyText(el.url.find('.urlcell'))

				sitemessage(self.app.localization.e('urlsuccesscopied'))
			})

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				ed.title || (ed.title = 'Pocketnet')
			    ed.text || (ed.text = 'Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here')
			    ed.image || (ed.image = 'https://pocketnet.app/img/logobigpadding.png') 
			    ed.url || (ed.url = 'https://pocketnet.app/' + self.app.nav.get.href())

				
				var data = {
					socials : socials,
					url : ed.url,
					rescue : ed.rescue || false,
					caption : ed.caption
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

				p.clbk(null, p);
			},

			wnd : {
				header : "Social sharing",
				class : 'allscreen sharingwindow black'
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