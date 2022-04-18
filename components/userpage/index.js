var userpage = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = (p.history && !p.inWnd) || p.primary;

		var el = {}, ed = {};

		var currentExternalEssense = null;

		var hcready = false;

		var mestate = null, allbalance;

		var reports = []

		var init = function(){
			reports = []

			if(!self.app.user.getstate()){

				reports.push({
					name : self.app.localization.e('createnew'),
					id : 'registration',
					report : 'registration',
					mobile : true,
					rh : true
				})
				
				reports.push({
					name : self.app.localization.e('signin'),
					id : 'authorization',
					report : 'authorization',
					mobile : true,
					rh : true
				})

			}
			else{
				
				if(!self.app.user.validate()){

					var h = self.app.localization.e('e13184');
	
					if (self.app.errors.connection()){
						h = self.app.localization.e('e13185')
					}
	
					reports.push({
						name : h,
						id : 'test',
						report : 'fillUser',
						mobile : true,
					})
		
				}
			}
			
			

			reports.push({
				name : self.app.localization.e('notifications'),
				id : 'notifications',
				report : 'notifications',
				mobile : true,
				openReportPageMobileInWindow : true,
				if : function(){
					return true
				}
			})

			reports.push({
				name :  self.app.localization.e('rstate'),
				id : 'ustate',
				report : 'ustate',
				mobile : true,

			
				if : function(){
					if(!self.app.curation()) return true
				},

				add : function(){

					if (self.app.mobileview && deep(mestate, 'reputation')){
						return mestate.reputation.toFixed(1)
					}

				},

				addtoname : function(){

					if (self.app.mobileview && deep(mestate, 'trial')){
						return self.app.localization.e('stp')
					}

				},
			})

		

			reports.push({
				name : self.app.localization.e('rwallet'),
				id : 'wallet',
				report : 'wallet',
				mobile : true,
				openReportPageMobileInWindow : true,
				add : function(){

					if (self.app.mobileview && allbalance && !self.app.curation()){
						return  self.app.platform.mp.coin(allbalance)
					}

				}
			})

			reports.push({

				name : self.app.localization.e('followers'),
				id : 'followers',
				report : 'followers',
				mobile : true,

				if : function(){
					return self.app.mobileview && !self.app.curation()
				},

				add : function(){

					var address = deep(self, 'app.user.address.value')

					if (address){
						var s = deep(self, 'sdk.users.storage.'+address+'.subscribers.length')

						if (self.app.mobileview && s){
							return s
						}
					}	

					

				}
			})

			reports.push({
				
				name :  self.app.localization.e('following'),
				id : 'following',
				report : 'following',
				mobile : true,

				if : function(){
					return self.app.mobileview && !self.app.curation()
				},

				add : function(){

					var address = deep(self, 'app.user.address.value')

					if (address){
						var s = deep(self, 'sdk.users.storage.'+address+'.subscribes.length')

						if (self.app.mobileview && s){
							return s
						}
					}	

				}
			})

		

			if(self.app.user.validate()) {

				reports.push({
					name : self.app.localization.e('e13186'),
					id : 'test',
					report : 'test',
					mobile : true,
					//openReportPageMobile : true,
				})

			}

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
				mobile : true,
				//openReportPageMobileInWindow : true
			})

            if (typeof _Electron != 'undefined' ? _Electron : false) {
                reports.push({
                    name : self.app.localization.e('easyNode_e10000'),
                    id : 'easynode',
                    report : 'nodecontrol',
                    //openReportPageMobile : false,
                    mobile : false
                })
            }

			reports.push({
				name : self.app.localization.e('rsystem'),
				id : 'system16',
				report : 'system16',
				//openReportPageMobile : true,
				mobile : false
			})

			reports.push({
				name : 'Pocketcoin',
				id : 'staking',
				report : 'staking',
				mobile : true,
				if : function(){
					return self.app.mobileview
				},
				//openReportPageMobileInWindow : true
			})

			if(self.app.user.validate()) {

				reports.push({
					name : self.app.localization.e('videoCabinet'),
					id : 'videoCabinet',
					report : 'videoCabinet',
					mobile : true,
					openReportPageMobileInWindow : true,
					if : function(){

						if (self.app.curation()) return false

						if (window.testpocketnet) return true

						return true

					
					}
				})

			}



				
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

				var report = helpers.findReport(id)

				if(report && self.app.mobileview && report.openReportPageMobile && !primary){

					setTimeout(function(){
						self.closeContainer()
					},200)
					

					self.nav.api.go({
						open : true,
						href : id,
						history : true
					})

					return
				}

				if(report && self.app.mobileview && (report.openReportPageMobileInWindow && !primary)){

					setTimeout(function(){
						self.closeContainer()
					},200)

					self.nav.api.go({
						open : true,
						href : id,
						inWnd : true,
						history : true
					})

					return
				}
				

				el.c.find('.openReport').removeClass('active')

				el.c.find('[rid="'+id+'"]').addClass('active')

				el.c.addClass('reportshowed')

				actions.openTree(id);
				renders.report(id);

				if (report && report.rh) return

				if (addToHistory){

					if(!ed.rmhistory){

						self.nav.api.history.addParameters({
							id : id
						}, {
							removefromback : false
						})


						if (self.app.nav.clbks.history.navigation)
							self.app.nav.clbks.history.navigation()

					}


				}
			},
			signout : function(){

				var so = function(){
					self.app.user.signout();

					self.app.reload({
						href : 'authorization',
					});

					self.app.nav.api.history.add('authorization')
				}

				var so2 = function(){
					if (self.app.platform.sdk.address.pnet()){

						if (self.app.platform.sdk.registrations.showprivate()){
							
							self.app.platform.ui.showmykey({
								text : self.app.localization.e('e13188'),
								faillabel : self.app.localization.e('e13189'),
								fail : function(){
									so()
								}
							})
	
							return
						}
	
					}
	
					so()
				}


				if(window.cordova && !isios()){
					menuDialog({

						items: [
	
							{
								text: self.app.localization.e('logoutaccount'),
								class: 'itemmain',
								action: function (clbk) {
	
									so2()

									clbk()
	
								}
							},
	
							{
								text:  self.app.localization.e('closeapplication'),
								action: function (clbk) {
	
									clbk()

									setTimeout(function(){

										if (navigator.app) {
											navigator.app.exitApp();
										} else if (navigator.device) {
											navigator.device.exitApp();
										} else {
											window.close();
										}

									}, 100)
	
								}
							}
	
	
						]
					})
				}
				else{
					so2()
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

				if (self.app.mobileview){

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
						_p.el.find('.openReport').on('click', events.openReport);

						_p.el.find('.changelang').on('click', function(){
							self.app.platform.ui.changeloc(self.closeContainer)
						})

						_p.el.find('.applicaitonversion').swipe({
							longTap : function(){
							
								if(self.app.mobile.update.needmanageinfo){

									dialog({
										class : 'zindex one',
										html : self.app.mobile.update.needmanageinfo || 'empty',
										btn1text : self.app.localization.e('dyes'),
										btn2text : self.app.localization.e('dno'),
										success : function(){	

										}
									})

								}
							}
						})
						
						_p.el.find('.hasupdate').on('click', function(){

							if(!self.app.mobile.update.updating){

								_p.el.find('.applicationupdatemodule').addClass('updating')

								self.app.mobile.update.downloadAndInstall().catch(e => {
									sitemessage(self.app.localization.e(e.text) || e)
								}).then(r => {
									_p.el.find('.applicationupdatemodule').removeClass('updating')
								})

							}	
							
						})
	
						ParametersLive([s], _p.el)

						if (primary)
							self.app.actions.scroll(0)

						_p.el.find('.showprivatekey').on('click', function(){
							self.app.platform.ui.showmykey({
								text : self.app.localization.e('doyouwantseepk'),
								successLabel : self.app.localization.e('dyes'),
								faillabel : self.app.localization.e('dno')
							})
						})

						if (hcready)
							el.contents.hcSticky('refresh');
	
						if (clbk)
							clbk();
					})
				}

				self.app.user.isState(function (state) { 

					if(self.app.mobileview && state){
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

			userslist : function(_el, users, empty, caption, clbk){
				self.nav.api.load({

					open : true,
					id : 'userslist',
					el : _el,
					animation : false,

					essenseData : {
						addresses : users,
						empty : empty,
						caption : caption,

						sort : 'commonuserrelation'
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})
			},

			followers : function(_el, clbk){

				var address = deep(self, 'app.user.address.value')

				if (address){

					var author = deep(self, 'sdk.users.storage.'+address)

					var u = _.map(deep(author, 'subscribers') || [], function(a){
						return a
					})

					var blocked = deep(author, 'blocking') || []

					u = _.filter(u, function(a){
						return _.indexOf(blocked, a) == -1
					})

					var e = self.app.localization.e('anofollowers');

					if(self.user.isItMe(author.address)){
						e = self.app.localization.e('aynofollowers')
					}

					renders.userslist(_el, u, e, self.app.localization.e('followers'), clbk)
				}
				
			},

			following : function(_el, clbk){

				var address = deep(self, 'app.user.address.value')

				if (address){
					var author = deep(self, 'sdk.users.storage.'+address)

					var u = _.map(deep(author, 'subscribes') || [], function(a){
						return a.adddress
					})

					var blocked = deep(author, 'blocking') || []
		
					u = _.filter(u, function(a){
						return _.indexOf(blocked, a) == -1
					})

					var e = self.app.localization.e('anofollowing');

					if(self.user.isItMe(author.address)){
						e = self.app.localization.e('aynofollowing')
					}

					renders.userslist(_el, u, e, self.app.localization.e('following'), clbk)
				}
			},

			fillUser : function(el, clbk){

				self.shell({

					name :  'fillUser',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk){
						clbk()
					}

				})
				
			},

			authorization : function(el, clbk){

				setTimeout(function(){
					self.closeContainer()
				},200)

				self.nav.api.go({
					href : 'authorization',
					history : true,
					open : true
				})	
			},

			registration : function(el, clbk){

				setTimeout(function(){
					self.closeContainer()
				},200)
				
				self.nav.api.go({
					href : 'registration',
					history : true,
					open : true
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
					if (primary)
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
							primary : primary,
	
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
			
			el.c.on('click', '.signout', function(){

				self.app.mobile.vibration.small()
				actions.signout()

			})

			el.c.find('.backtabletmenu').on('click', function(){
				
				makerep()
			})

		}

		self.authclbk = function(){
			renders.bgcaption();
		}

		var makerep = function(clbk){
			
			var id = null;
			

			if (primary) id = parameters().id;

			self.app.user.isState(function (state) { 

				if(primary && state){
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

					if(id){
						actions.openReport(id)
					}
					else{
						actions.closeReport()
					}

					if (clbk)
						clbk();

				}, id);

			})


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

			if(primary && !self.app.mobileview){

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

				//$('#menu').removeClass('abs')

				if(el.c) el.c.empty()

				el = {};
				ed = {}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.contents = el.c.find('.contents');
				el.report = el.c.find(".report");
			
				el.bgcaption = el.c.find('.bgCaptionWrapper')

				/*if(!p.inWnd)
					$('#menu').addClass('abs')*/

				initEvents();

				make(function(){					
					p.clbk(null, p);
				})

				
			},

			wnd : {
				class : 'wnduserpage normalizedmobile maxheight',
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