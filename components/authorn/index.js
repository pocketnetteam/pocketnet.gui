var authorn = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author;
		var modules = {}

		var actions = {

		}

		var events = {
			
		}

		var renders = {

			uinfo: function(){

				self.shell({
					name :  'uinfo',
					el :   el.uinfo,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					if(clbk) clbk()

				})
			},
			aucaption : function(){

				self.shell({
					name :  'aucaption',
					el :   el.aucaption,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					if(clbk) clbk()

				})
			},

			fbuttonsrow: function(){

				self.shell({
					name :  'fbuttonsrow',
					el :   el.fbuttonsrow,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					if(clbk) clbk()

				})
			},

			whatsnew : function(){

				console.log("HERE 3!")

				if(author.me && !self.app.mobileview){
					self.nav.api.load({

						open : true,
						id : 'share',
						el : el.whatsnew,
						animation : false,
						insertimmediately : true,
						mid : 'shareauthor',
						
						clbk : function(e, p){
	
							modules.share = p
						},
						essenseData : {
							minimized : true,
							post : function(){
								
							}
						}
					})
				}

				


				
			
			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			

		}

		var redir = function(page){

			window.requestAnimationFrame(() => {
				self.app.el.html.removeClass('allcontent')
			})

			if (page){
				self.app.nav.api.load({
					open : true,
					href : page,
					history : true,
					replaceState : true,
					fade : self.app.el.content
				})
			}
			
		}

		var get = function(address, clbk){

			author = {}

			self.sdk.users.addressByName(address, function(address){
				if(!address){
					return redir('page404')
				}
	
				author.address = address
	
				self.sdk.users.get(author.address, function(){
					author.deleted = typeof self.app.platform.sdk.user.deletedaccount != 'undefined' ? self.app.platform.sdk.user.deletedaccount(author.address) : false
	
					author.data = self.psdk.userInfo.get(author.address)
					author.me = self.app.user.isItMe(author.address)

	
					if(
						author.deleted || 
						self.app.platform.sdk.user.reputationBlocked(address) || 
						!author.data
					){
						return redir(author.me ? 'userpage?id=test' : 'page404')
					}

					clbk()
					
				})
			})

			
		}

		var init = function(){
			renders.aucaption()
			renders.fbuttonsrow()
			renders.uinfo()
			renders.whatsnew()
		}
		
		var destroy = function(){
			_.each(modules, (m) => {
				m.destroy()
			})

			modules = {}
		}

		return {
			primary : primary,

			parametersHandler : function(){

				var address = parameters().address

				if (address && author.address != address){

					get(address, () => {

						destroy();
						init();
					})

				}
				else{
					/// renders
				}
				

			},

			authclbk : function(){

			},

			getdata : function(clbk, p){

				window.requestAnimationFrame(() => {
					self.app.el.html.addClass('allcontent')
				})

				ed = p.settings.essenseData

				var data = {
					ed
				};

				console.log("HERE1")

				get(parameters().address || ed.address || self.app.user.address.value || '', () => {

					data.author = data

					console.log("HERE4")

					clbk(data);
				})

			},

			destroy : function(href){

				destroy()

				ed = {}
				el = {};

				if (href != 'author') 
					self.app.el.html.removeClass('allcontent')
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.aucaption = el.c.find('.aucaptionWr')
				el.fbuttonsrow = el.c.find('.fbuttonsrow')
				el.uinfo = el.c.find('.uinfoWr')
				el.whatsnew = el.c.find('.whatsnew')


				initEvents();
				init()

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = authorn;
}
else{

	app.modules.authorn = {};
	app.modules.authorn.module = authorn;

}