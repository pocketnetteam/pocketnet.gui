var about = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, l = null, timeend, timeOutOfferInterval;

		var survey = null;

		var actions = {

			openReport : function(id, addToHistory){

				el.c.find('.openReport').removeClass('active')

				el.c.find('[rid="'+id+'"]').addClass('active')

				actions.openTree(id);

				el.c.addClass('reportshowed')

				renders.report(id);


				var report = helpers.findReport(id)

				if (report && report.rh) return


				if (addToHistory){

					self.nav.api.history.addParameters({
						id : id
					}, {
						removefromback : false
					})


					if (self.app.nav.clbks.history.navigation)
						self.app.nav.clbks.history.navigation()


				}
			},

			closeReport : function(){
				el.report.html('')
				el.c.removeClass('reportshowed')
			}
		}

		var reports = [
			{
				name : self.app.localization.e('home'),
				id : 'home',
				report : 'home',
				mobile : true,
				if : function(){
					return true
				}
			},
			
			{
				name : self.app.localization.e('services'),
				id : 'services',
				report : 'services',
				mobile : true,
				rh : true
			},
			{
				name : self.app.localization.e('howitworks'),
				id : 'howitworks',
				report : 'howitworks',
				mobile : true,
				if : function(){
					return true
				}
			},
			
			{
				name : self.app.localization.e('team'),
				id : 'team',
				report : 'team',
				mobile : true,
				rh : true
			}
		]

		var events = {}

		var socials = []

		var renders = {

			report : function(report, cl, npsh){

				actions.destroy();

				if(!report.active && report.history){

					var rem = ['mt', 's']

					if (report.id != 'shares' || cl) rem.push('ss')

					if(!npsh)
						self.app.nav.api.history.addRemoveParameters(rem, {
							report : report.id
						})
				}

				report.active = true;

				if (renders[report.render]){
					renders[report.render](el.lenta, report)

					renders.menulight()

					/*if(!isTablet())
						self.app.platform.sdk.contents.get(author.address, function(contents){
							renders.contents(contents)	
						})*/
				}
				
			},
			
			menu : function(clbk){
				self.shell({

					name :  'menu',
					el :   el.menu,

					data : {
						reports : reports
					},

					//animation : 'fadeIn',

				}, function(p){

					p.el.find('.usermenuitem').swipe({
						tap : function(){
							var r = $(this).attr('menuitem');

							if (reports[r] && reports[r].render)
								renders.report(reports[r])
						}
					})

					
					_.each(reports, function(r, j){
						if(r.events){

							var el = p.el.find('[menuitem="'+j+'"]')

							_.each(r.events, function(e, i){

								if(i == 'click' && isTablet()){

									el.swipe({
										tap : e
									})

								}
								else{
									el.on(i, e)
								}

								
							})

						}
					})

					if (clbk)
						clbk();
				})
			}
		}

		var state = {}

		var initEvents = function(){
			
	
		}

		var makerep = function(clbk){
			var id = parameters().id;

			if(!isMobile() && state){
				if(!id) {

					if(self.app.user.validate()){

						if(self.app.curation()){
							id = 'wallet'	
						}
						else{
							id = 'ustate'	
						}
					}
					else{
						id = 'test'
					}
				}
			}
			
			renders.contents(function(){

				//self.app.actions.scrollBMenu()

				if(id){
					actions.openReport(id)
				}
				else{
					actions.closeReport()
				}

				if (clbk)
					clbk();

			}, id);

		}

		var make = function(){

		}

		return {
			primary : primary,

			parametersHandler : function(){

				console.log('parametersHandler');
				makerep()

			},

			getdata : function(clbk){

				l = null;

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
					survey : survey,
					reports : reports,
					lkey : app.localization.current()
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