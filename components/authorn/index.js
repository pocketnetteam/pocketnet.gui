var authorn = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, author;
		var modules = {}
		var cstate = {}
		var upbutton;

		var actions = {
			clearSearch : function(){

			},
			makenext : function(type, start, count, clbk){

				var l = result[type].data.length;
				var L = result[type].count
	
				if(start + count <= l){
					return
				}
	
				if (start < l){
					var d = l - start;
	
					start = l;
					count = count - d;
				}
				
				if(start + count > L) count = L - start
	
				if(count <= 0) return
	
				load[type](function(data){
	
					if(clbk)
					{
						clbk(data)
					}
	
					else
					{
						renders[type](data)
					}
	
				}, start, count)	
	
			}
		}

		var currentLenta = function(){

			var params = parameters()

			var method = _.find(lentameta, (m) => {
				if(params[m.parameter]){
					return true
				}
			})

			console.log('method', method, params)

			if(!method){
				return lentameta[0]
			}

			return method
		}

		var cleanParameters = function(){
			return _.filter(_.map(lentameta, (m) => {
				return m.parameter
			}), (p) => {return p})
		}

		var lentameta = [{
			id : 'common',
			text : 'shares',
			default : true
		},{
			id : 'video',
			text : 'e14105',
			parameter : 'video',
			extend : function(params){
				params.videomobile = true

				return params
			}
		},{
			id : 'articles',
			text : 'longreads',
			parameter : 'read',
			extend : function(params){
				params.read = true
				return params
			}
		},{
			id : 'audio',
			text : 'audio',
			parameter : 'audio',
			extend : function(params){
				params.audio = true
				return params
			}
		},{
			id : 'search',
			parameter : 'ssa',
			extend : function(params){
				params.search = true
				params.searchValue = parameters().ssa
				params.loader = function(clbk){

					var _clbk = function(data){

						self.app.psdk.share.insertFromResponseSmall(data)

						var shares = self.app.psdk.share.gets(_.map(data, (s) => {
							return s.txid
						}))

						if (clbk)
							clbk(shares, null, {
								count : 10
							})
					}

					
					actions.makenext('postssearch', deep(result, 'data.length') || 0, 10, function(data){
						_clbk(data)
					})
					
				}

				return params
			}
		},{
			id : 'searchTags',
			parameter : 'ssat',

			extend : function(params){

				var tgsi = decodeURI(parameters().ssat || '')

				var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
					return r
				}));

				params.searchTags = words.length ? words : null
				
				return params
			}
		}]


		var load = {
			postssearch : function(clbk, start, count){
				self.app.platform.sdk.search.get(searchvalue, 'posts', start, count, fixedBlock, function(r){
					clbk(r.data);
				})
			},

			relations : function(relations, clbk){
				return author.data.loadRelations(relations, self.app.platform.sdk.user.loadRelation)
			},
			
			subscribers : function(){
				return this.subscribersOrSubscribes('subscribers')
			},
			
			subscribes : function(){
				return this.subscribersOrSubscribes('subscribes').then(u => {
					return _.map(u, (u) => {
						return u.adddress || u.address
					})
				})
			},

			subscribersOrSubscribes(rkey){
				return this.relations([rkey, 'blocking']).then(() => {

					var u = _.map(deep(author, 'data.' + rkey) || [], function(a){
						return a
					})
	
					var blocked = (deep(author, 'data.blocking') || []).concat()
	
					u = _.filter(u, function(a){
						return _.indexOf(blocked, a) == -1
					})

					console.log("USERS", u)

					return Promise.resolve(u)

				}).catch((e) => {
					console.error(e)
					return []
				})
			}
		}

		var events = {
			
		}

		var renders = {

			randombg : function(clbk){

				self.shell({
					name :  'bg',
					el :   el.bg,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					Circles({
						target: el.bg.find('.bgwallpaper')[0],
						quantity: 15,
						radius: {
							min: 2,
							max: 400
						},
						zIndex: {
							min: 0,
							max: 20
						},
						hue: {
							min: 0,
							max: 180
						},
						saturation: {
							min: 50,
							max: 100
						},
						light: {
							min: 25,
							max: 75
						},
						alpha: {
							min: 0.2,
							max: 0.8
						}
					})

					if(clbk) clbk()

				})

				
			},

			uinfo: function(clbk){

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
			aucaption : function(clbk){

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

			fbuttonsrow: function(clbk){

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

			alentanavigation: function(clbk){

				console.log('currentLenta()', currentLenta())

				self.shell({
					name :  'alentanavigation',
					el :   el.alentanavigation,
					data : {
						author : author,
						cstate,
						lentameta,
						current : currentLenta()
					},
					insertimmediately : true,
				}, function(p){

					p.el.find('.truenav').on('click', function(){

						var id = $(this).attr('mid')

						var meta = _.find(lentameta, (m) => {
							return m.id == id
						})

						if(!meta) return

						self.app.nav.api.history.removeParameters(cleanParameters())

						var link = self.app.platform.api.authorlink(author.address)

						if(meta.parameter) link = link + "?" + meta.parameter + "=1"

						self.nav.api.load({
							open : true,
							href : link,
							history : true,
							handler : true,
							noscroll : true
						})

					})

					if(clbk) clbk()

				})
			},
			
			lenta : function(){

				var hr = 'author?address=' + author.address
				var n =  app.platform.api.name(author.address)
				if (n) hr = n.toLowerCase() + "?"

				var params = {
					author : author.address,
					byauthor : true,
					hr : hr,
					cancelsearch : function(){
						actions.clearSearch()
					},
					renderclbk : function(){

					}
				}

				var method = currentLenta()

				if (method.extend){
					method.extend(params)
				}

				el.lenta.html('')

				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : author.address,
					insertimmediately : true,
					essenseData : params,
					fade : el.lenta,
					
					clbk : function(e, p){
						modules.lenta = p;
					}

				})

			},

			whatsnew : function(clbk){

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

							if(clbk) clbk()
						},
						essenseData : {
							minimized : true,
							post : function(){
								
							}
						}
					})
				}

				


				
			
			},

			subscribes : function(clbk){
				load.subscribes().then(addresses => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowing') : self.app.localization.e('anofollowing')
					var ctext = self.app.localization.e('following')

					renders.userslist(el.subscribes, addresses, etext, ctext, clbk, 'subscribes')
				})
			},

			subscribers : function(clbk){
				load.subscribers().then(addresses => {

					var etext = self.user.isItMe(author.address) ? self.app.localization.e('aynofollowers') : self.app.localization.e('anofollowers')
					var ctext = self.app.localization.e('followers')


					renders.userslist(el.subscribers, addresses, etext, ctext, clbk, 'subscribers')
				})
			},

			userslist : function(_el, addresses, empty, caption, clbk, mid){
				self.nav.api.load({

					open : true,
					id : 'userslist',
					mid : mid,
					el : _el,
					animation : false,
					
					essenseData : {
						addresses : addresses,
						empty : empty,
						caption : caption,
						sort : 'commonuserrelation',
						preview : true
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})
			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			if(!isMobile()){
				upbutton = self.app.platform.api.upbutton(el.up, {
					top : function(){
	
						return '65px'
					},
					class : 'light',
					rightEl : el.c.find('.leftpanelcell')
				})	
			}
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
			renders.alentanavigation()
			renders.lenta()
			renders.randombg()
			renders.subscribes()
			renders.subscribers()
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

				console.log('parametersHandler', address, author.address)

				if (address && author.address != address){

					get(address, () => {

						destroy();
						init();
					})

				}
				else{
					renders.lenta()
					renders.alentanavigation()
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
				
				if (upbutton){
					upbutton.destroy()
					upbutton = null
				}
					

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
				el.alentanavigation = el.c.find('.alentanavigation')
				el.lenta = el.c.find('.lentawrapper')
				el.up = el.c.find('.upbuttonwrapper');
				el.w = $(window);
				el.bg = el.c.find('.bgwallpaperWrapper')
				el.subscribes = el.c.find('.subscribes')
				el.subscribers = el.c.find('.subscribers')

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