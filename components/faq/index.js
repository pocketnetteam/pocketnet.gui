var faq = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, vt;

		var faqcontent = [


			{
		
				name : self.app.localization.e('e14003'),
				id : 'technical',
		
				group : [
		
					{
						id : 'downloadclient',
						q : self.app.localization.e('e14004'),
						a : `<div><a href="applications"><button>Download Application</button></a></div><div class="dfdo"><a href="https://github.com/pocketnetteam/pocketnet.gui/releases/latest">https://github.com/pocketnetteam/pocketnet.gui/releases/latest</a></div><div>${self.app.localization.e('e14006')}</div>`,
					},

					{
						id : 'downloadandroid',
						q : self.app.localization.e('e14109'),
						a : `<div><a href="https://play.google.com/store/apps/details?id=pocketnet.app">https://play.google.com/store/apps/details?id=pocketnet.app</a></div><div>${self.app.localization.e('e14110')}</div>`,
					},

					{
						id : 'downloadnode',
						q : self.app.localization.e('e14005'),
						a : `<div><a href="https://github.com/pocketnetteam/pocketnet.core/releases/latest">https://github.com/pocketnetteam/pocketnet.core/releases/latest</a></div><div>${self.app.localization.e('e14007')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14008'),
				id : 'roadmap',
		
				group : [
		
					{
						id : 'walletaddresses',
						q : self.app.localization.e('e14009'),
						a : `<div>${self.app.localization.e('e14010')}</div><div>${self.app.localization.e('e14011')}</div>`,
					},
		
					{
						id : 'linktoprofile',
						q : self.app.localization.e('e14012'),
						a : `<div>${self.app.localization.e('e14013')}</div>\
							<div>${self.app.localization.e('e14014')}</div>`,
					},
					{
						id : 'starsystem',
						q : self.app.localization.e('e14015'),
						a : `<div>${self.app.localization.e('e14016')}</div>`,
					},
		
		
					{
						id : 'updateprofiletime',
						q : self.app.localization.e('e14017'),
						a : `<div>${self.app.localization.e('e14018')}</div>`,
					},
		
		
					{
						id : 'linuxdesktop',
						q : self.app.localization.e('e14019'),
						a : `<div>${self.app.localization.e('e14020')}</div>`,
					},
		
					{
						id : 'savevideo',
						q : self.app.localization.e('e14021'),
						a : `<div>${self.app.localization.e('e14022')}</div>`,
					},
		
		
					{
						id : 'mobileapp',
						q : self.app.localization.e('e14023'),
						a : `<div>${self.app.localization.e('e14024')}</div>`,
					},
		
					{
						id : 'postinglimit',
						q : self.app.localization.e('e14025'),
						a : `<div>${self.app.localization.e('e14026')}</div>`,
					},
		
					{
						id : 'reputation',
						q : self.app.localization.e('e14027'),
						a : `<div>${self.app.localization.e('e14028')}</div>\
						<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>${self.app.localization.e('e14029')} 2+2-2=2</div>`,
					},
		
					{
						id : 'deletepostoruser',
						q : self.app.localization.e('e14030'),
						a : `<div>${self.app.localization.e('e14031')}</div>`,
					},
		
					{
						id : 'usersearch',
						q : self.app.localization.e('e14032'),
						a : `<div>${self.app.localization.e('e14033')}</div>`,
					},
					{
						id : 'follow',
						q : self.app.localization.e('e14034'),
						a : `<div>${self.app.localization.e('e14035')}</div>`,
					},
		
		
					{
						id : 'otherbrowsers',
						q : self.app.localization.e('e14036'),
						a : `<div>${self.app.localization.e('e14037')}</div>`,
					},
		
					{
						id : 'replypost',
						q : self.app.localization.e('e14038'),
						a : `<div>${self.app.localization.e('e14039')}</div>`,
					},
		
					{
						id : 'addtags',
						q : self.app.localization.e('e14040'),
						a : `<div>${self.app.localization.e('e14041')}</div>`,
					},
		
					{
						id : 'usepublicaddress',
						q : self.app.localization.e('e14042'),
						a : `<div>${self.app.localization.e('e14043')}</div>`,
					},
					{
						id : 'desktopmac',
						q : self.app.localization.e('e14044'),
						a : `<div>${self.app.localization.e('e14045')}</div>`,
					}
		
		
				]
		
		
			},
		
		
			{
		
				name : self.app.localization.e('e14046'),
				id : 'pocketcoin',
		
				group : [
		
					
		
					{
						id : 'pocketcoin',
						q : self.app.localization.e('e14047'),
						a : `<div>${self.app.localization.e('e14048')}</div>`,
					},
		
		
					{
						id : 'pocketcoinstock',
						q : self.app.localization.e('e14049'),
						a : `<div>${self.app.localization.e('e14050')}</div>`,
					},
		
					{
						id : 'pocketcoinbuy',
						q : self.app.localization.e('e14051'),
						a : `'<div>${self.app.localization.e('e14052')}</div>`,
					},
		
					{
						id : 'pocketcoinbuyfiat',
						q : self.app.localization.e('e14053'),
						a : `<div>${self.app.localization.e('e14054')}</div>`,
					},
				]
			},
			{
		
				name : self.app.localization.e('e14055'),
				id : 'privacy',
		
				group : [
					
		
					{
						id : 'anonymous',
						q : self.app.localization.e('e14056'),
						a : `<div>${self.app.localization.e('e14057')}</div>`,
					},
		
					{
						id : 'viewoutside',
						q : self.app.localization.e('e14058'),
						a : `<div>${self.app.localization.e('e14059')}</div>`,
					},
		
		
					{
						id : 'walletid',
						q : self.app.localization.e('e14060'),
						a : `<div>${self.app.localization.e('e14061')}</div>`,
					},
		
					{
						id : 'runnode',
						q : self.app.localization.e('e14062'),
						a : `<div>${self.app.localization.e('e14063')}</div>`,
					},
		
					{
						id : 'signback',
						q :  self.app.localization.e('e14064'),
						a : `<div>${self.app.localization.e('e14065')}</div>`,
					}
				]
			},
			{
		
				name : self.app.localization.e('e14066'),
				id : 'curation',
		
				group : [
		
					{
						id : 'content',
						q : self.app.localization.e('e14067'),
						a : `<div>${self.app.localization.e('e14068')}</div>`,
					},
					{
						id : 'specific',
						q : self.app.localization.e('e14069'),
						a : `<div>${self.app.localization.e('e14070')}</div>`,
					},
					{
						id : 'racism',
						q : self.app.localization.e('e14071'),
						a : `<div>${self.app.localization.e('e14072')}</div>`,
					},
		
		
				]
		
			},

			{
		
				name : self.app.localization.e('e14073'),
				id : 'specificscuration',
		
				group : [
		
					{
						id : 'trolls',
						q : self.app.localization.e('e14074'),
						a : `<div>${self.app.localization.e('e14075')}</div>`,
					},
					{
						id : 'flagging',
						q : self.app.localization.e('e14076'),
						a : `<div>${self.app.localization.e('e14077')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14078'),
				id : 'differents',
		
				group : [
		
					{
						id : 'differents1',
						q : self.app.localization.e('e14079'),
						a : `<div>${self.app.localization.e('e14080')}</div>`,
					},
					{
						id : 'differents2',
						q : self.app.localization.e('e14081'),
						a : `<div>${self.app.localization.e('e14082')}</div>`,
					},
					{
						id : 'differents3',
						q : self.app.localization.e('e14083'),
						a : `<div>${self.app.localization.e('e14084')}</div>`,
					},
					{
						id : 'differents4',
						q : self.app.localization.e('e14085'),
						a : `<div>${self.app.localization.e('e14086')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14087'),
				id : 'ecosystem',
		
				group : [
		
					{
						id : 'ecosystem1',
						q : self.app.localization.e('e14088'),
						a : `<div>${self.app.localization.e('e14089')}</div>`,
					},
					{
						id : 'ecosystem2',
						q : self.app.localization.e('e14090'),
						a : `<div>${self.app.localization.e('e14091')}</div>`,
					},
					{
						id : 'ecosystem3',
						q : self.app.localization.e('e14092'),
						a : `<div>${self.app.localization.e('e14093')}</div>`,
					},
					{
						id : 'ecosystem4',
						q : self.app.localization.e('e14094'),
						a : `<div>${self.app.localization.e('e14095')}</div>`,
					},
					{
						id : 'ecosystem5',
						q : self.app.localization.e('e14096'),
						a : `<div>${self.app.localization.e('e14097')}</div><div>${self.app.localization.e('e14098')}</div><div>${self.app.localization.e('e14099')} </div>`,
					},
					
				]
		
			}
			
		
		]









		var mp = {};

		var actions = {
			question : function(id){
				_scrollToTop(el.c.find('.faqcnt .question[question="'+id+'"]'), null, null, -110)
			},
			contents : function(group){

				_scrollToTop(el.c.find('.faqcnt .group[group="'+group+'"]'), null, null, -110)

			},

			share : function(id){


				var question = mp[id]

				var url = 'https://pocketnet.app/help?page=faq&id='+id

				var r = ''

				if (self.app.platform.sdk.address.pnet()){
					r = '&ref=' + self.app.platform.sdk.address.pnet().address
					url = url + r
				}

				var m = question.q;

				var l = filterXSS(question.a, {
					whiteList: [],
					stripIgnoreTag: true
				})

				self.nav.api.load({
					open : true,
					href : 'socialshare2',
					history : true,
					inWnd : true,

					essenseData : {
						url : url,
						sharing : {
							image : '',
							images : [],
							title : m,
							html : {
								body : question.a,
								preview : trimHtml(question.a, 160)
							},

							text : {
								body : l,
								preview : trimHtml(l, 160)
							}
						},
						caption : 'Share FAQ answer in social networks',
					}
				})
			},

			inview : function(){

				//vt = slowMade(function(){

					
					var h = $(window).height() / 4

					var inv = inView(el.c.find('.faqcnt .group'), {
						offsetTop : h,
						offsetBottom : h,
						mode : 'line',
					})

					var id = null;

					if (inv.length > 0){

						var vel = $(inv[0]);

						id = vel.attr('group')	

						el.contens.removeClass('active')

						var e = el.c.find('.contens .item[group="'+id+'"]')
						
						e.addClass('active')
					}


				//}, vt, 30)
				
			}
		}

		var events = {
			contens : function(){
				var group = $(this).attr('group')

				actions.contents(group)
			},

			share : function(){
				var id = $(this).closest('.question').attr('question')

				actions.share(id);
			}
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.contens.on('click', events.contens)

			el.c.find('.share').on('click', events.share)

			el.c.find('.question .questionName').on('click', function(){
				$(this).closest('.question').toggleClass('opened')
			})

			window.addEventListener('scroll', actions.inview);
			
	

			el.c.find('.contens').hcSticky({
				stickTo: '#faq',
				top : 65
			});

		}

		return {
			primary : primary,

			getdata : function(clbk){

				mp = {}

				_.each(faqcontent, function(f){
					_.each(f.group, function(q){
						mp[q.id] = q;
					})
				})

				var data = {
					groups : faqcontent
				};

				clbk(data);

			},

			destroy : function(){



				window.removeEventListener('scroll', actions.inview);

				//self.app.nav.api.history.removeParameters(['id'])

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.contens = el.c.find('.contens .item')

				initEvents();

				var id = parameters().id;

				if (id) actions.question(id)

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
	module.exports = faq;
}
else{

	app.modules.faq = {};
	app.modules.faq.module = faq;

}