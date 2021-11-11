var about = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var currentExternalEssense = null;

		var hcready = false;

		var mestate = null, allbalance;

		var reports = []

		var init = function(){
			reports = []
			

			reports.push({
				name :  self.app.localization.e('home'),
				id : 'aboutHome',
				report : 'aboutHome',
				mobile : true,

				if : function(){
					if(!self.app.curation()) return true
				},

				add : function(){

					if (isMobile() && deep(mestate, 'reputation')){
						return mestate.reputation.toFixed(1)
					}

				}
			})
		

			reports.push({
				name : self.app.localization.e('youtube'),
				id : 'aboutYoutube',
				report : 'aboutYoutube',
				mobile : true
			})
			
			reports.push({
				name : self.app.localization.e('facebook'),
				id : 'aboutFacebook',
				report : 'aboutFacebook',
				mobile : true
			})

			reports.push({
				name : self.app.localization.e('contentCreators'),
				id : 'aboutContentCreators',
				report : 'aboutContentCreators',
				mobile : true
			})
				
			reports.push({
				name : self.app.localization.e('twitter'),
				id : 'aboutTwitter',
				report : 'aboutTwitter',
				mobile : true
			})
			
			reports.push({
				name : self.app.localization.e('howItWorks'),
				id : 'aboutHIW',
				report : 'aboutHIW',
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
				el.c.removeClass('reportshowed')
			},

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
			}

		}

		var events = {
			closeGroup : function(){
				var id = $(this).closest('[levelid]').attr('levelid')

				actions.closeGroup(id);
			},
			openReport : function(){
				var id = $(this).attr('rid');

				if(isMobile()){

					self.app.mobile.vibration.small()

					renders.contents(null, id)

				}

				actions.openReport(id, true);
			}
		}

		var renders = {
			bgcaption : function(clbk){


				if(!el || !el.bgcaption) return

				if(!self.app.user.validate()) {
					el.bgcaption.html('<div class="bgCaptionSpacer"></div>')
				}
				else{
					self.shell({

						name :  'bgcaption',
						el :   el.bgcaption,
						data : {
							
						},
	
					}, function(_p){
						console.log(_p.el)
						_p.el.find('.copyaddress').on(clickAction(), function(){
							copyText($(this))

							sitemessage(self.app.localization.e('successcopied'))
						})
					})

					
				}

				
		
			},
			contents : function(clbk, id){

				if(!el.contents) return

				var s = helpers.selector();

				var r = function(){
					self.shell({
							

						name :  'contents',
						el :   el.contents,
						data : {
							reports : reports,
							each : helpers.eachReport,
	
							selector : s
						},
	
					}, function(_p){
	
						_p.el.find('.groupNamePanelWrapper').on('click', events.closeGroup);
						//_p.el.find('.groupName').on(clickAction(), events.closeGroup);
						_p.el.find('.openReport').on('click', events.openReport);
	
						ParametersLive([s], _p.el)

						self.app.actions.scroll(0)


						if (hcready)
							el.contents.hcSticky('refresh');
	
						if (clbk)
							clbk();
					})
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

						if (hcready)
							el.contents.hcSticky('refresh');
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

								if (hcready)
									el.contents.hcSticky('refresh');
								
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
			renders.bgcaption();
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

		var make = function(clbk){
			
			renders.bgcaption();

			makerep(clbk)

			if(!self.app.user.validate()){
				el.c.addClass("validate")


				if(self.app.errors.connectionRs()){

					self.iclbks.mn = function(){
						delete self.iclbks.mn
						make()
					}

				}
			}

			if(!isMobile()){

				el.contents.hcSticky({
					stickTo: '#userpagestick',
					top : 77,
					bottom : 177
				});

				hcready = true

			}


			
			
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


				$('#menu').removeClass('abs')

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.contents = el.c.find('.contents');
				el.report = el.c.find(".report");
			
				el.bgcaption = el.c.find('.bgCaptionWrapper')

				$('#menu').addClass('abs')

				initEvents();

				make(function(){					
					p.clbk(null, p);
				})

				
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