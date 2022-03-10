var faq = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){https://youtu.be/l0IDybyHR4M

		var primary = deep(p, 'history');

		var el, vt;

		var mp = {};

		var actions = {
			question : function(id){


				var _el = el.c.find('.faqcnt .question[question="'+id+'"]')

				_scrollToTop(_el, null, null, -110)


				_el.addClass('opened')
			},
			contents : function(group){

				_scrollToTop(el.c.find('.faqcnt .group[group="'+group+'"]'), null, null, -110)

			},

			share : function(id){


				var question = mp[id]

				var url = 'https://'+self.app.options.url+'/help?page=faq&id='+id

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
						app : self.app
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

				var k = self.app.localization.key;

				var faqLangs = self.sdk.faqLangs.get();
				
				if(!faqLangs[k]) k = 'en';

				var faqcontent = faqLangs[k];
				
				if (!window.cordova){

					faqcontent[0].group.splice(1, 0, {
						id : 'downloadandroid',
						q : self.app.localization.e('e14109'),
						a : `<div><a elementsid="https://play.google.com/store/apps/details?id=pocketnet.app" href="https://play.google.com/store/apps/details?id=pocketnet.app">https://play.google.com/store/apps/details?id=pocketnet.app</a></div><div>${self.app.localization.e('e14110')}</div>`,
					})
				}

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

				setTimeout(function(){
					if (id) 
						actions.question(id)
				}, 300)
				

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