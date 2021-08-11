var about = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, l = null, timeend, timeOutOfferInterval;

		var survey = null;

		var actions = {

			videoWidth : function(el)
			{

				var info = {
					width : 560,
					height : 315,
				}

				var w = el.width();

				var c = info.width / info.height;

				var h = w / c;

				el.find("iframe").width(w);
				el.find("iframe").height(h);
			},

			time : function(){

			    today = new Date();
			    today = Math.floor((timeend-today)/1000);
			    tsec=today%60; today=Math.floor(today/60); if(tsec<0)tsec='00'; else if(tsec<10)tsec='0'+tsec; 
			    tmin=today%60; today=Math.floor(today/60); if(tmin<0)tmin='00'; else if(tmin<10)tmin='0'+tmin; 
			    thour=today%24; today=Math.floor(today/24);if(thour<0)thour='00'; if(today<0)today='00';

				el.days.html(today);
				el.seconds.html(tsec);
				el.minutes.html(tmin);
				el.hours.html(thour);
	
			},
			fixed : function(){
				var s = $(window).scrollTop();
				var h = el.main.offset().top + el.main.height()

				if (s > h){
					el.fixed.addClass('active')
				}
				else
				{
					el.fixed.removeClass('active')
				}
			},
			explore : function(){
				var _el = el.c.find('.faq');


				_scrollToTop(_el)
			},
			validateEmail : function(v){
				if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v)){
					return true;
				}
				else
				{
					return false;
				}
			},
			saveEmail : function(email, name, clbk, id){

				if(!id) id = '4'

				var _p = {
					Email : email,
					Name : name,
				}

				_p.Action || (_p.Action = 'ADDTOMAILLIST');
				_p.TemplateID || (_p.TemplateID = id);

				$.ajax({
					type: 'POST',
					url: self.app.options.server,
					data: _p,
					dataType: 'json',
					success : function(){

						if (clbk)
							clbk();

					}
				});

			},
			joinSuccess : function(email){
				self.fastTemplate('joinSuccess', function(rendered){
					dialog({
						html : rendered,
						class : "one joinbeta",

						btn1text : 'Okay'
					})
				}, {
					email : email
				})
			},
			
			join : function(action){

				self.fastTemplate('join', function(rendered){

					dialog({
						html : rendered,

						wrap : true,

						success : function(d){

							var i = d.el.find('.email')
							var n = d.el.find('.name')

							var email = i.val();
							var name = n.val();

							if (actions.validateEmail(email) && name){

								actions.saveEmail(email, name)

								actions.joinSuccess(email, name)

								return true
							}
						},

						clbk : function(_el){

							var n = _el.find('.name')
							var i = _el.find('.email')

							var vl = function(){
								var email = i.val();
								var name = n.val();

							
								if(actions.validateEmail(email) && name){
									b.removeClass('disabled')

									return true;
								}
								else
								{
									b.addClass('disabled')
									return false;
								}
							}

							var b = _el.find('.btn1')
								b.addClass('disabled')
								b.on('click', function(){

								})

								n.focus()
								n.on('change', vl)
								n.on('keyup', vl)						
					
								i.on('change', vl)
								i.on('keyup', vl)
						},

						class : "one joinbeta"
					})

				}, {
					action : action
				})

				
			},

			whitepaperSuccess : function(){
				self.fastTemplate('whitepaperSuccess', function(rendered){
					dialog({
						html : rendered,
						class : "one joinbeta",

						btn1text : 'Okay'
					})
				})
			},
			whitepaper : function(){

				self.fastTemplate('whitepaper', function(rendered){

					dialog({
						html : rendered,

						wrap : true,

						success : function(d){

							var i = d.el.find('input')

							var email = i.val();

							if (actions.validateEmail(email)){
								actions.saveEmail(email, '', null, '5')

								actions.whitepaperSuccess()

								return true
							}
						},

						clbk : function(_el){

							var vl = function(){
								var value = $(this).val();

								if(actions.validateEmail(value)){
									b.removeClass('disabled')

									return true;
								}
								else
								{
									b.addClass('disabled')
									return false;
								}
							}

							var b = _el.find('.btn1')
								b.addClass('disabled')
								b.on('click', function(){

								})

							var i = _el.find('input')
								i.focus()
								i.on('change', vl)
								i.on('keyup', vl)
						},

						class : "one joinbeta"
					})

				})

				
			},
		}

		var events = {
			whitepaper : function(){
				actions.whitepaper()
			},
			join : function(){
				actions.join()
			},
			sendanswer : function(){
				var v = $(this).attr('answer');

				if (v){
					survey.send(v, function(){
						renders.survey()
					})
				}
			}
		}

		var socials = [

			{
				name : 'Twitter',
				icon : '<i class="fab fa-twitter"></i>',
				href : 'https://twitter.com/Pocket_Net'
			},

			{
				name : 'Telegram',
				icon : '<i class="fab fa-telegram"></i>',
				href : 'https://t.me/PocketRep'
			},

			{
				name : 'Facebook',
				icon : '<i class="fab fa-facebook"></i>',
				href : 'https://www.facebook.com/PocketNet'
			},

			{
				name : 'Minds',
				image : 'https://cdn-assets.minds.com/front/dist/assets/logos/bulb.svg',
				href : 'https://www.minds.com/PocketNet'
			},

			{
				name : 'Linkedin',
				icon : '<i class="fab fa-linkedin"></i>',
				href : 'https://www.linkedin.com/company/cryptolo-io'
			},

			{
				name : 'Mastodon',
				icon : '<i class="fab fa-mastodon"></i>',
				href : 'https://mastodon.social/@PocketRep'
			},

			{
				name : 'Gab',
				image : 'https://gab.com/assets/img/logo-dec.png',
				href : 'https://gab.com/PocketNet'
			},

			{
				name : 'Sola',
				image : 'https://web.solacore.net/img/logo_medium-3_mNF.png',
				href : 'https://sola.ai/cryptolo_io'
			},

			{
				name : 'Medium',
				icon : '<i class="fab fa-medium"></i>',
				href : 'https://medium.com/@cryptolo.io'
			}

		]

		var renders = {

			survey : function(clbk){


				self.shell({

					name :  'survey',
					el :   el.survey,

					data : {
						survey : survey
					},

					animation : 'fadeIn',

				}, function(p){

					p.el.find('.sendanswer').on('click', events.sendanswer)

					p.el.find('.resultpercent').each(function(){

						var _el = $(this);

						_el.animate({
							width : _el.attr('w') + "%"
						}, 130)

					})

					if (clbk)
						clbk();
				})
			},

			tes : function(){
				var tes = el.c.find('.tes');

				lazyEach({
					array : tes, 
					sync : true,

					action : function(p){
						var _el = $(p.item);

						var time = _el.attr('time') || 600;

						_el.addClass('show');

						setTimeout(function(){
							p.success()
						}, time)
					}
				})
			},

			lenta : function(){

				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : el.lenta,
					animation : false,

					mid : 'about',

					essenseData : {
						author : 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd',
						byauthor : true,
						authAction : function(event){

							actions.join(event)

						},

						notscrollloading : true,
						//nourlload : true,

						/*filter : function(share, i){

							if(i < 2) return true

						}*/

						//txids : ['823ab9614a183b737fbc2374094a006d0368361bdcdc7d0324919474fe17814a', '85d3f59c842e72490e23c0d6ec2db270a6d501cd14ad4cdbe01e4cfccaa6dd37']
					},
					
					clbk : function(e, p){
						l = p
					}

				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.join.on('click', events.join)
			el.whitepaper.on('click', events.whitepaper)

			el.c.find('.exploremore').on('click', actions.explore)



			window.addEventListener('scroll', actions.fixed)
		}

		var make = function(){
			renders.tes()

			renders.lenta()

			survey.init(function(){
				renders.survey()
			})

			actions.videoWidth(el.c.find('.videoContent'));
		}

		return {
			primary : primary,

			getdata : function(clbk){

				l = null

				survey = new sQuestion({
					id : 'pocketnetlanding',
					ajax : self.app.ajax,
					question : "Are you fed up with traditional social media like Facebook, Twitter and others?",
					answers : [{
						t : 'Yes, very',
						v : 1,
					}, {
						t : 'Yes, somewhat',
						v : 2
					}, {
						t : 'Facebook and Twitter are just great',
						v : 3
					}]
				})

				var data = {
					socials : socials,
					survey : survey
				};

				clbk(data);

			},

			destroy : function(){

				if (timeOutOfferInterval)

					clearInterval(timeOutOfferInterval)

				if (l){
					l.destroy()

					l = null
				}

				window.removeEventListener('scroll', actions.fixed)

				el = {};
			},
			
			init : function(p){

				state.load();

				

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.lenta = p.el.find('.lenta');
				el.main = el.c.find('.main')

				el.fixed = el.c.find('.fixedButton');
				el.join = el.c.find('.ejoin')
				el.whitepaper = el.c.find('.whitepaper')

				el.days = p.el.find('.days');
				el.seconds = p.el.find('.seconds');
				el.minutes = p.el.find('.minutes');
				el.hours = p.el.find('.hours');

				el.survey = p.el.find('.survey')

				timeend = new Date(2019, 0, 23, 23, 59);

				timeOutOfferInterval = setInterval(actions.time, 1000);

				initEvents();

				make();

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
	module.exports = about;
}
else{

	app.modules.about = {};
	app.modules.about.module = about;

}