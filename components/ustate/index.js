var ustate = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var id = makeid()

		var el, mestate, waitActions, charts = {};

		var metrics = {

			/*profileInfo : {
				vis : 'profileInfo',
				name : self.app.localization.e('sprofile'),
				bad : function(){

					return !self.app.user.validate()
				},

				if : function(){
					
					if(!waitActions || waitActions == 'inf') return true;
				}
			},

			waitActions : {
				vis : 'waitActions',
				name : '',
				bad : function(){

					return false
				},

				if : function(){

					if(waitActions && waitActions != 'inf') return true;
				}
			},*/

			post : {
				key : 'post',
				vis : 'scale',
				name : self.app.localization.e('spc'),
				bad : function(v){
					if(v <= 2) return true
				}
			},

			score : {
				key : 'score',
				vis : 'scale',
				name : self.app.localization.e('ssc'),
				bad : function(v){
					if(v <= 10) return true
				}
			},

			comment : {
				key : 'comment',
				vis : 'scale',
				name : self.app.localization.e('ccc'),
				bad : function(v){
					if(v <= 10) return true
				}
			},

			comment_score : {
				key : 'comment_score',
				vis : 'scale',
				name : self.app.localization.e('crc'),
				bad : function(v){
					if(v <= 10) return true
				}
			},			

			/*reputation : {
				key : 'reputation',
				vis : 'number',
				name : self.app.localization.e('srep'),
				bad : function(v){

					return false
				}
			},*/

			
		}

		var actions = {

		}

		var events = {
			
		}

		var renders = {

			gifts : function(_el){
				self.app.platform.sdk.processes.get(function(levels){

					self.app.platform.sdk.processes.gifts(function(gifts){

						

						var level = self.app.platform.sdk.processes.level(mestate.reputation)

						if(!level) return

						_.each(levels, function(lvl){                 
							if(!lvl.level) return	
	
							var lel = _el.find('.level[level="'+lvl.level+'"]')

							if (lvl.level < level.level) {
								
								var gift = _.find(gifts, function(gift){
									return gift.amount == lvl.bonus * 100000000
								})

								if(!gift){
									lel.addClass('waitgift')
								}
								else{
									lel.removeClass('waitgift')
								}

							}
						})

					})

				})
			},

			currentLevel : function(_el){
				self.app.platform.sdk.processes.get(function(levels){
					
					var level = self.app.platform.sdk.processes.level(mestate.reputation)

					if(!level) return

					_.each(levels, function(lvl){ 
                
						if(!lvl.level) return

						var lel = _el.find('.level[level="'+lvl.level+'"]')
						var state = 'next'
						var chartline = lel.find('.line')

						if (lvl.level < level.level) {
							state = 'completed'
							chartline.removeAttr('width')
						} 

						if (lvl.level == level.level) {
							state = 'current'

							chartline.width((level.perc * 100) + "%")

						}

						if (lvl.level > level.level) {
							next = 'next'
							chartline.removeAttr('width')
						}
						
						lel.attr('state', state)
					})

				})
			},

			reputationsteps : function(clbk){
				self.app.platform.sdk.processes.get(function(levels){
					
					var level = self.app.platform.sdk.processes.level(mestate.reputation)
				
					self.shell({

						name :  'reputation',
						el :   el.c.find('.ustatecontentrep'),
						data : {
							reputation : mestate.reputation,
							level : level,
							levels : levels
						},
	
					}, function(_p){

						renders.currentLevel(_p.el)
						renders.gifts(_p.el)

						_p.el.find('.tooltip').tooltipster({
			                theme: 'tooltipster-light',
			                maxWidth : 600,
			                zIndex : 20,
			            });

						if (clbk)
							clbk()

					})

				})
			},

			uscnt : function(clbk){

				self.shell({

					name :  'uscnt',
					el :   el.c.find('.mwork'),
					data : {
						mestate : mestate,
						metrics : metrics
					},

				}, function(_p){
					if (clbk)
						clbk()
				})
			},
			ustatecontent : function(clbk){

				var _metrics = metrics;

				self.shell({

					name :  'ustatecontentnew',
					el :   el.ustatecontent,
					data : {
						metrics : _metrics,
						mestate : mestate,
						waitActions : waitActions
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
			
			self.app.platform.ws.messages["new block"].clbks.ustate = function(data){
				self.app.platform.sdk.user.waitActions(function(r){
					waitActions = r;

					renders.ustatecontent()
				})
			}
		}

		var make = function(clbk){
			
			self.app.platform.sdk.user.waitActions(function(r){
				self.app.platform.sdk.ustate.me(function(_mestate){

					waitActions = r;
					mestate = _mestate;	

					renders.uscnt(function(){

						el.ustatecontent = el.c.find('.ustatecontent')

						renders.ustatecontent()
						renders.reputationsteps()

						if(clbk) clbk()
					})
					

				}, true)
			})
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

			essense.destroy();

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