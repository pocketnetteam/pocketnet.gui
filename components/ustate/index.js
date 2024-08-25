var ustate = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var id = makeid()

		var el, mestate, waitActions, charts = {}, statistic;

		

		var renders = {


			reputationsteps : function(clbk){
					
				
					self.shell({

						name :  'reputation',
						el :   el.c.find('.ustatecontentrep'),
						data : {
							reputation : mestate.reputation,
							mestate : mestate,
							address : mestate.address
						},
	
					}, function(_p){

						//renders.currentLevel(_p.el)
						//renders.gifts(_p.el)

						_p.el.find('.tooltip').tooltipster({
			                theme: 'tooltipster-light',
			                maxWidth : 600,
			                zIndex : 20,
			            });

						if (clbk)
							clbk()

					})

			},

			reputationBlockedMe: function(clbk){

				self.shell({

					name :  'reputationBlockedMe',
					el :   el.c.find('.mwork'),
					data : {
						
					},

				}, function(_p){
					if (clbk)
						clbk()
				})
			},
			lowlimits : function(clbk){

				var lowlimits = self.app.platform.sdk.ustate.haslowlimits(mestate)
				var zerolimits = self.app.platform.sdk.ustate.haszerolimits(mestate)

				if(!el.lowlimits) return

				if (lowlimits.length || zerolimits.length){

					self.app.platform.sdk.ustate.canincrease({template : 'trial'}, function(r){

						if(_.isEmpty(r)){

							if(clbk) clbk()

							return
						}


						self.shell({

							name :  'lowlimits',
							el :   el.lowlimits,
							data : {
								zerolimits,
								lowlimits,
								increase : r
							},
		
						}, function(_p){

							_p.el.find('.buypkoins').on('click', function(){

								self.closeContainer()

								self.nav.api.load({
									open : true,
									href : 'wallet',
									history : true,
									inWnd : true,

									essenseData : {
										simple : true,
										action : 'buy'
									}
								})

							})


							if (clbk)
								clbk()
						})

					})


				}
				else{
					el.lowlimits.html('')

					if (clbk)
						clbk()
				}
				
				
			},

			uscnt : function(clbk){

				self.shell({

					name :  'uscnt',
					el :   el.c.find('.mwork'),
					data : {
						mestate : mestate,
						metrics : self.app.platform.sdk.ustate.metrics()
					},

				}, function(_p){


					if (clbk)
						clbk()


				})
			},
			ustatecontent : function(clbk){


				self.shell({

					name :  'ustatecontentnew',
					el :   el.ustatecontent,
					data : {
						metrics : self.app.platform.sdk.ustate.metrics(),
						mestate : mestate,
						waitActions : waitActions,
						address : self.app.user.address.value
					},

				}, function(_p){
					if (clbk)
						clbk()
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
			
			/*self.app.platform.ws.messages["new block"].clbks.ustate = function(data){
				self.app.platform.sdk.user.waitActions(function(r){
					waitActions = r;

					renders.ustatecontent()
				})
			}*/
		}

		var make = function(clbk){

			waitActions = 0;
			
			//self.app.platform.sdk.user.waitActions(function(r){
				self.app.platform.sdk.ustate.me(function(_mestate){

					//waitActions = r;
					mestate = _mestate;	


					if(self.app.platform.sdk.user.reputationBlockedMe()){

						renders.reputationBlockedMe()

					}
					else{

						renders.uscnt(function(){

							el.ustatecontent = el.c.find('.ustatecontent')
							el.lowlimits = el.c.find('.lowlimits')
							el.stat = el.c.find('.stat')
	
							renders.ustatecontent()
							renders.reputationsteps()
							renders.lowlimits()
							
	
							if(clbk) clbk()
						})

					}

				}, true)
			//})
		}

		return {
			primary : primary,

			getdata : function(clbk){

				charts = {}

				var data = {
				};

				clbk(data);
		

			},

			destroy : function(){
				el = {};
				delete self.app.platform.ws.messages["new block"].clbks.ustate
				delete self.app.platform.sdk.ustate.clbks[id]

				if (statistic){
					statistic.destroy()
					statistic = null
				}
			},
			
			init : function(p){				

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				self.app.platform.sdk.ustate.clbks[id] = make;

				make(function(){

					initEvents()

					p.clbk(null, p);
				});
				

				
			},
			tooltip : {
				options : {
					minWidth : 380,
					position : 'left',
					functionPosition: function(instance, helper, position){
				        position.coord.top = 10;
				        position.coord.left += 10;

				        return position;
				    },

				    theme : 'tooltipster-light zindex ustatetooltip'
				},
				
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = ustate;
}
else{

	app.modules.ustate = {};
	app.modules.ustate.module = ustate;

}