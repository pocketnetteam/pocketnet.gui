var userpage = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var currentExternalEssense = null;
		var roller = null;
		var caption = null;

		var mestate = null;

		var reports = []

		var init = function(){
			reports = []

			reports.push({
				name :  self.app.localization.e('rstate'),
				id : 'ustate',
				report : 'ustate',
				mobile : true,

				if : function(){
					if(mestate) return true
				}
			})

			/*reports.push({
				name : "Messenger",
				id : 'messenger',
				report : 'messenger',
				mobile : true
			})*/

			reports.push({
				name : "Notifications",
				id : 'notifications',
				report : 'notifications',
				mobile : true
			})

			reports.push({
				name : self.app.localization.e('rwallet'),
				id : 'wallet',
				report : 'wallet',
				mobile : true,
			})

			reports.push({
				name : self.app.localization.e('rprofile'),
				id : 'test',
				report : 'test',
				mobile : true
			})

			reports.push({
				name : self.app.localization.e('rsettings'),
				id : 'usersettings',
				report : 'usersettings',
				mobile : true
			})
			

			reports.push({
				name : self.app.localization.e('raccounts'),
				id : 'accounts',
				report : 'accounts',
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

				m.push({
					name : self.app.localization.e('signout'),
					id : 'signout'
				})

				return m;
			},

			selector : function(){
				var m = helpers.mobileReports();
				var pv = _.map(m, function(m){return m.id})
				var pvl = _.map(m, function(m){return m.text || m.name})

				var contents = new Parameter({
					type : "VALUES",
					name : "Contents",
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
			openReport : function(id, addToHistory){

				el.c.find('.openReport').removeClass('active')

				el.c.find('[rid="'+id+'"]').addClass('active')

				actions.openTree(id);

				renders.report(id);

				if (addToHistory){

					self.nav.api.history.addParameters({
						id : id
					})


				}
			},
			signout : function(){
				self.app.user.signout();

				self.app.reload({
					href : 'authorization'
				});
			}
		}

		var events = {
			closeGroup : function(){
				var id = $(this).closest('[levelid]').attr('levelid')

				actions.closeGroup(id);
			},
			openReport : function(){
				var id = $(this).attr('rid');

				actions.openReport(id, true);
			}
		}

		var renders = {
			bgcaption : function(clbk){

				var s = helpers.selector();

				if(!el || !el.bgcaption) return

				self.shell({

					name :  'bgcaption',
					el :   el.bgcaption.find('.bgCaptionInner'),
					data : {
						
					},

				}, function(_p){

				})
		
			},
			contents : function(clbk){

				var s = helpers.selector();

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
					//_p.el.find('.groupName').on('click', events.closeGroup);
					_p.el.find('.openReport').on('click', events.openReport);

					ParametersLive([s], _p.el)

					if (clbk)
						clbk();
				})
		
			},

			report : function(id, clbk){

				if (currentExternalEssense)
					currentExternalEssense.destroy();


				var report = helpers.findReport(id)
				
				self.shell({

					name :  'report',
					el :   el.report,
					data : {
						
					},

				}, function(_p){

					

					self.nav.api.load({

						open : true,
						id : report.report,
						el : _p.el.find('.reportCnt'),
						animation : false,
						primary : true,

						essenseData : {
							sub : report.sub
						},
						
						clbk : function(e, p){

							currentExternalEssense = p;

							if (roller)
								roller.apply();

							if (clbk)
								clbk();
							
						}

					})

					
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
			
			el.c.on('click', '.signout', function(){
				actions.signout()
			})

		}

		self.authclbk = function(){
			renders.bgcaption();
		}

		var makerep = function(clbk){
			var id = parameters().id || 'ustate';

			renders.contents(function(){
				
				actions.openReport(id)
			

				if (clbk)
					clbk();

			});

		}

		var make = function(clbk){
			
			renders.bgcaption();

			makerep(clbk)

			
			if(!isMobile())

				roller = new Roller({
					selector: '.roller',
					inner : '.cnt',
					cnt : el.c.find('.maketsWrapper'),
					offset : 65

				}).init().apply();	
			
		}

		return {
			primary : primary,

			parametersHandler : function(){
				makerep()
			},

			getdata : function(clbk){
				
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

				if (currentExternalEssense)
					currentExternalEssense.destroy();

				currentExternalEssense = null;

				if (roller)
					roller.destroy();

				roller = null;

				$('#menu').removeClass('abs')

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.contents = el.c.find('.contents');
				el.report = el.c.find(".report");
			
				el.bgcaption = el.c.find('.bgCaption')


				$('#menu').addClass('abs')

				caption = new Caption({
					container: el.c,
					caption: el.c.find('.captionfwrapper'),
					offset: [0, 0],
					
				}).init();	

				initEvents();

				make(function(){

					p.noscroll = self.app.actions.scrollBMenu()
					
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
	module.exports = userpage;
}
else{

	app.modules.userpage = {};
	app.modules.userpage.module = userpage;

}