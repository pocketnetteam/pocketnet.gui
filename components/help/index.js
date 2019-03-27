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
				d : 'March 2019',
				n : 'Buy Pocketcoin for Bitcoin, Litecoin on pocketnet.app',
				r : false,
			},
			{
				d : 'April 2019',
				n : 'Linux/Mac Desktop Apps',
				r : false,
			},
			{
				d : 'May 2019',
				n : 'Android/iPhone Apps',
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
				n : 'Full synchronization between desktop and mobile device',
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

		}

		return {
			primary : primary,

			getdata : function(clbk){

				state.load();

				var data = {};

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