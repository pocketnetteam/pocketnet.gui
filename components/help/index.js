var help = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, cpage, external, c = {};






		c.roadmap = [

			{
				d : 'February 2019',
				n : 'Social Network Beta Test Starts',
				r : true,
			},
			{
				d : 'March 2019',
				n : 'Windows Desktop App',
				r : true,
			},
			{
				d : 'March 2019',
				n : 'Search users, posts',
				r : false,
			},
			{
				d : 'July 2019',
				n : 'Linux Desktop App',
				r : false,
			},
			
			{
				d : 'July 2019',
				n : 'Android App',
				r : false,
			},

			{
				d : 'August 2019',
				n : 'Search by tags, recommended users, poll transactions',
				r : false,
			},
			{
				d : 'August 2019',
				n : 'Personal link Pocketnet.app/username plus history of personal posts and ability to search users’ posts (decentralized free blog hosting on Pocketnet blockchain)',
				r : false,
			},
			{
				d : 'September 2019',
				n : 'WebTorrent hosting of videos/images',
				r : false,
			},
			{
				d : 'October 2019',
				n : 'Boost posts for Pocketcoin',
				r : false,
			},
			{
				d : 'June 2019',
				n : 'Chinese, French, German, Russian, Spanish versions',
				r : false,
			},
			{
				d : 'July 2020',
				n : 'Peer-to-peer encrypted chat, including group chat',
				r : false,
			},
			{
				d : 'August 2020',
				n : 'Decentralized Internet!!! Ability for any user to create sidechains that hold sites/groups by locking POS in the main chain, with nodes having ability to merge stake them with the main chain optionally',
				r : false,
			},
			{
				d : 'October 2020',
				n : 'Decentralized reputation platform and crypto store',
				r : false,
			}

		]

		var actions = {
			menuitem : function(page){

				if (external){
					external.destroy()
					external = null
				}

				el.menuitem.removeClass('active');

				el.c.find('.tipitem[page="'+page+'"]').addClass('active')

				cpage = page;

				state.save();

				if (renders[page]){
					renders[page](page)
				}

				else
				{
					renders.page(page)
				}
			}
		}

		var events = {
			menuitem : function(){
				var page = $(this).attr('page')


				actions.menuitem(page)
			},
		}

		var renders = {
			application : function(page){

				this.page(page, function(_el){

					console.log("PAGE", page)

					
				})

			},

			faq : function(page){

				this.page(page, function(_el){

					console.log("PAGE", page)

					self.nav.api.load({

						open : true,
						id : 'faq',
						el : _el.find('.faqWrapper'),
						clbk : function(e, p){

							console.log("EXTERNAL", p)

							external = p

						}					

					})

				})

				

			},
			node : function(page){
				this.page(page, function(_el){

					var id = 'fe88f86430a018803921b338a7e629f9c9a52a2b4e3a36056d2adc0f0c74b5b4'

					self.app.platform.papi.post(id, _el.find('.lenta'), function(e, p){					
						external = p
					})

				
				})
			},
			
			videos : function(page){
				this.page(page, function(_el){

					self.nav.api.load({

						open : true,
						id : 'lenta',
						el : _el.find('.lenta'),
						animation : false,

						mid : 'videos',

						essenseData : {
							byauthor : true,
							/*authAction : function(event){

								actions.join(event)

							},*/

							notscrollloading : true,
							nocomments : true,

							txids : [
								'9f73a1efbfb4b0feb88c134740afa0ab293f8072a80ecbe9fe65ed85591910e6',
								'ad9067c72a7be97c1752a00566940f372e5b526291278cf9bc203b99f81bbaf0', 
								'df4064b9e2c8b311fd097804f36802ceb68337dca396bfdea732c0f94c977a3a',
								'986a6acba795482894876ac87440124e176cc02cff40558a3ec3d423850e2e93'
							]
						},
						
						clbk : function(e, p){
							external = p
						}
					})

				})
			},

			page : function(page, clbk){

				self.shell({

					name :  page,
					el :   el.page,
					data : {
						c : c
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})

			}
		}

		var state = {
			save : function(){

				self.app.nav.api.history.addParameters({
					page : cpage
				})

			},
			load : function(){

				cpage = parameters().page || 'faq'

			}
		}

		var initEvents = function(){
				
			el.menuitem.on('click', events.menuitem)

			

			el.caption.find('.checkversion').on('click', function(){

				if (typeof _Electron != 'undefined'){
					el.caption.find('.checking').addClass('active')
					

					var electron = require('electron');

					setTimeout(function(){

						electron.ipcRenderer.send('electron-checkForUpdates');

						electron.ipcRenderer.on('updater-message', function(event, data){
                            if (data.msg == 'update-downloaded' || data.msg == 'update-not-available' || (data.linux && data.msg == 'update-available'))
							    el.caption.find('.checking').removeClass('active')
						})

					}, 100)

				}
				
			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				state.load();

				var version = null

				if (typeof _Electron != 'undefined'){

					var electron = require('electron');

					version = electron.remote.app.getVersion();

				}

				var data = {
					version : version
				};

				clbk(data);

			},

			destroy : function(){

				console.log('help')

				if (external){

					external.destroy()

					external = null
				}

				el = {};

			},
			
			init : function(p){



				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.page = el.c.find('.page')
				el.menuitem = el.c.find('.tipitem')

				el.caption = el.c.find('.bgCaption')

				initEvents();

				actions.menuitem(cpage)

				p.clbk(null, p);
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
	module.exports = help;
}
else{

	app.modules.help = {};
	app.modules.help.module = help;

}