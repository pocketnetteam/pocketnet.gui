var about = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var available = ['en', 'fr', 'ru'];

		var currentExternalEssense = null;

		var hcready = false;

		var mestate = null, allbalance;

		var reports = []

		var init = function(){
			reports = []
			

			reports.push({
				name :  self.app.localization.e('aboutus'),
				id : 'about-home',
				report : 'aboutHome',
				mobile : true
			})

			reports.push({
				name : self.app.localization.e('contentCreators'),
				id : 'about-content-creators',
				report : 'aboutContentCreators',
				mobile : true
			})
			
			reports.push({
				name : self.app.localization.e('howItWorks'),
				id : 'about-hiw',
				report : 'aboutHIW',
				mobile : true
			})

			
			reports.push({
				name : 'FAQ',
				id : 'about-faq',
				report : 'faq',
				mobile : true
			})
			
			

			reports.push({
				name :  self.app.localization.e('download'),
				id : 'about-download',
				report : 'applications',
				mobile : true
			})

			reports.push({
				name :  'Easynode',
				id : 'about-easynode',
				report : 'easynode',
				mobile : true
			})

			reports.push({
				name : self.app.localization.e('insteadOf') + ' youtube',
				id : 'about-youtube',
				report : 'aboutYoutube',
				group : true,
				mobile : true
			})
			
			reports.push({
				name : self.app.localization.e('insteadOf') + ' facebook',
				id : 'about-facebook',
				report : 'aboutFacebook',
				group : true,
				mobile : true
			})

							
			reports.push({
				name : self.app.localization.e('insteadOf') + ' twitter',
				id : 'about-twitter',
				report : 'aboutTwitter',
				group : true,
				mobile : true
			})
		}

		var helpers = {
			eachReport : function(actions, _reports, id){
				if(!_reports) 
					_reports = reports;

				var onlevel = function(reports, level, id){

					if(!level) level = 0;

					if(!id) id = '';

					_.each(reports, function(report, index){

						var _id = id;

						if (_id) _id = _id + '_'

							_id = _id + report.id


						if(report.reports){

							actions.group(report, level, _id, function(){

								onlevel(report.reports, level + 1, _id);

							}, index)

						}

						else
						{
							actions.report(report, level, _id)
						}

					})

				}

				onlevel(_reports, 0, id);
			},
			findReport : function(id){

				var onlevel = function(reports, id){

					var ids = id.split("_");

					if(!ids.length) return null;

						id = ids[0];

					var report = _.find(reports || [], function(v){
						return v.id == id;
					})

					if (report){

						ids.splice(0, 1);

						id = ids.join('_');

						if(!id || !report.reports){

							return report;

						}

						else
						{
							return onlevel(report.reports,  id)
						}

					}
					else
					{
						return null;
					}
				}

				return onlevel(reports, id);
			},

			mobileReports : function(){
				var m = [];

				helpers.eachReport({
					group : function(report, level, id, clbk){

						if(report.mobile){
							m.push(report)	
						}
						
						clbk()
					},
					report : function(report){
						if(report.mobile){
							m.push(report)	
						}
					}
				})

				return m;
			},

			selector : function(){
				var m = helpers.mobileReports();
				var pv = _.map(m, function(m){return m.id})
				var pvl = _.map(m, function(m){return m.text || m.name})

				var contents = new Parameter({
					type : "VALUES",
					name : self.app.localization.e('e13187'),
					id : 'contents',
					possibleValues : pv, 
					possibleValuesLabels : pvl,
					defaultValue : pv[0]
				
				})

				contents.value = parameters().id || pv[0]

				contents._onChange = function(v){

					if(v == 'signout'){
						actions.signout()
					}	
					else
					{
						var r = helpers.findReport(v);

						var _p = parameters();
							_p.report = r.report;
							_p.id = r.id;

						var href = 'userpage' + collectParameters(_p);

						self.nav.api.load({
							open : true,
							href : href,
							history : true,
							
						})
					}

					
				}

				return contents;

			}
		}

		var actions = {
			closeGroup : function(id){

				var group = helpers.findReport(id);

				if (group){
					group.active = !!!group.active;

					var _el = el.c.find('[levelid="'+id+'"]');

					if(group.active){
						_el.addClass('active')
					}
					else{
						_el.removeClass('active');
					}
				}		
			},
			openTree : function(_id){
				helpers.eachReport({
					group : function(r, l, id, clbk){

						var _el = el.c.find('[levelid="'+id+'"]');

						if(_id.indexOf(id) == 0){

							r.active = true;
							_el.addClass('active');


							clbk()
						}
						else
						{
							r.active = false;
							_el.find('.openReport').removeClass('active');
						}
						
					},
					report : function(r, l, id){
						var _el = el.c.find('[id="'+id+'"]');

						if(_id == id){

							r.active = true;

							_el.addClass('active');
						}
						else
						{
							r.active = false;

							_el.removeClass('active');
						}
					}
				})
			},

			closeReport : function(){
				el.report.html('')
			},

			openReport : function(id, addToHistory){

				el.c.find('.openReport').removeClass('active')

				el.c.find('[rid="'+id+'"]').addClass('active')

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
			}

		}

		var events = {

			openReport : function(){
				var id = $(this).attr('rid');

				if(isMobile()){

					self.app.mobile.vibration.small()

					renders.contents(null, id)

				}

				events.hideMobileMenu();

				events.removeAlternativeTo();

				actions.openReport(id, true);
			},

			toggleAlternativeTo : function(){
				$(this).toggleClass('active');
			},

			removeAlternativeTo : function(){
				var alternativeTo = el.c.find('.alternativeTo');
				alternativeTo.removeClass('active');
			},


			hideMobileMenu : function(){

				var contentsInner = el.c.find('#contentsInner')

				contentsInner.removeClass('showMobileMenu');
			},

			showMobileMenu : function(){

				var contentsInner = el.c.find('#contentsInner')

				contentsInner.addClass('showMobileMenu');

				
			}
		}

		var renders = {

			contents : function(clbk, id){

				if(!el.contents) return

				var s = helpers.selector();

				var r = function(){

					console.log('current', app.localization.current());

					var lkey = app.localization.current();

					if (available.indexOf(lkey.key) === -1){
						
						self.app.localization.set('en');

					} else {

						self.shell({
							

							name :  'contents',
							el :   el.contents,
							data : {
								reports : reports,
								each : helpers.eachReport,
								lkey : app.localization.current(),
								theme : self.app.platform.sdk.theme.current == "white" ? 'white' : 'black',
		
								selector : s
							},
		
						}, function(_p){
		
							var alternativeTo = _p.el.find('.alternativeTo');
							//_p.el.find('.groupName').on(clickAction(), events.closeGroup);
							_p.el.find('.openReport').on('click', events.openReport);
	
							alternativeTo.on('click', events.toggleAlternativeTo);
	
							$(document).on('click',function (e) {
	
								if ($(e.target).closest('.alternativeTo').length) return;
								alternativeTo.removeClass('active');
	
							});
	
	
	
	
							_p.el.find('.burgerMenu').on('click', events.showMobileMenu)
	
							_p.el.find('.leftSection').on('click', events.hideMobileMenu)
	
							ParametersLive([s], _p.el)
	
							self.app.actions.scroll(0)
	
							if (clbk)
								clbk();
	
							el.c.find('.localization').on('click', function(){
								self.app.mobile.vibration.small()
								var items = []
				
								_.each(self.app.localization.available, function(a){
	
									if (available.indexOf(a.key) > -1){
	
										items.push({
											text : a.name,
											action : function (clbk) {
					
												var na = app.localization.findByName(a.name);
					
					
												if (na && na.key != self.app.localization.key){
													self.app.mobile.vibration.small()
													self.app.localization.set(na.key);
												}
					
												clbk()
					
											}
										})
									}
	
								})
				
								menuDialog({
				
									items: items
								})
								
							})
	
							el.c.find('.signin').on('click', function(){
								self.app.mobile.vibration.small()
								self.app.platform.sdk.registrations.getredirectFromCurrentPage()
								self.nav.api.go({
									href : 'authorization',
									history : true,
									open : true
								})	
							})
	
							el.c.find('.signup').on('click', function(){
								self.app.mobile.vibration.small()
								self.app.platform.sdk.registrations.getredirectFromCurrentPage()
								self.nav.api.go({
									href : 'registration',
									history : true,
									open : true
								})	
							})
	
	
							el.c.find('[elementsid="eventssitename"]').on('click', function(){
	
								console.log('click')
				
								self.app.user.isState(function(state){
				
									//if(self.app.nav.get.pathname() != 'index'){
										var k = localStorage['lentakey'] || 'index';
				
										if (parameters().r == k) k = 'index'
				
										if (k != 'index') {
											if (k == 'video'){
												k = 'index?video=1'
											}
											else{
												k = 'index?r=' + k
											}
											
										}
				
										if(!state) k = 'index'
				
										if(self.app.curation()){
											if(!state){
												k = 'welcome'
											}
											else{
												k = 'userpage'
											}
											
										}
				
										self.nav.api.go({
											href : k,
											history : true,
											open : true,
											handler : true
										})
									//}
				
								})
				
								
						
							})
						})
					}



				}

				

				self.app.user.isState(function (state) { 

					if(isMobile() && state){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){
							var temp = self.app.platform.sdk.node.transactions.tempBalance()

							allbalance = amount + temp
							

							r()
						
						})
					}
					else{
						r()
					}

				})
					
			},

			report : function(id, clbk){

				if (currentExternalEssense)
					currentExternalEssense.destroy();

				var report = helpers.findReport(id)

				if(!report){
					if(clbk) clbk()

					return
				}

				var _clbk = function(e, p){
					self.app.actions.scroll(0)
	
					currentExternalEssense = p;

					

					if (clbk)
						clbk();
				}

				if(report.rh){
					renders[report.report]()
					return
				}
				
				
				self.shell({

					name :  'report',
					el :   el.report,
					data : {
						
					},

				}, function(_p){

					if (renders[report.report]){
						renders[report.report](_p.el.find('.reportCnt'), _clbk)
					}
					else{

						self.nav.api.load({

							open : true,
							id : report.report,
							el : _p.el.find('.reportCnt'),
							animation : false,
							primary : true,
	
							essenseData : {
								sub : report.sub,
								dumpkey : ed.dumpkey
							},
							
							clbk : function(e, p){
	
								_clbk(e, p)
								
							}
	
						})
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

		

		}

		self.authclbk = function(){
		}

		var makerep = function(clbk){
			var id = parameters().id || 'about-home';
			
			renders.contents(function(){

				actions.openReport(id)
			

				if (clbk)
					clbk();

			}, id);


			

			

		}

		var make = function(clbk){
			
			makerep(clbk)
			
			
		}

		return {
			primary : primary,

			parametersHandler : function(){

				makerep()
			},

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}
				
				init();


				var data = {};

				var p = parameters();

				data.p2pkh = self.app.platform.sdk.address.pnet()

				self.app.platform.sdk.ustate.me(function(_mestate){					


					mestate = _mestate

					clbk(data);

				})

					

			},

			destroy : function(){

				delete self.iclbks.mn

				hcready = false;

				if (currentExternalEssense)
					currentExternalEssense.destroy();

				currentExternalEssense = null;


				$('#panelWrapper').show();
				$('#menu').show();

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.contents = el.c.find('.contents');
				el.report = el.c.find(".report");

				//$('#menu').addClass('abs')

				initEvents();

				$('#panelWrapper').hide();
				$('#menu').hide();

				make(function(){	
									
					p.clbk(null, p);

					
						
				})

				
			}
		}
	};



	self.run = function(p){

		// $('#menuWrapper #menu').hide();

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		
		$('#panelWrapper').show();
		$('#menu').show();
		
		$(document.body).removeClass('removed-menu');
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