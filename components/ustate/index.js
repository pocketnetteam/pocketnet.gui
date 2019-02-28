var ustate = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var id = makeid()

		var el, mestate, waitActions;

		var metrics = {

			profileInfo : {
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
			},

			post : {
				key : 'post',
				vis : 'scale',
				name : self.app.localization.e('spc'),
				bad : function(v){
					if(v <= 2) return true
				},

				if : function(){
				
					if(!waitActions) return true;
				}
			},
			score : {
				key : 'score',
				vis : 'scale',
				name : self.app.localization.e('ssc'),
				bad : function(v){
					if(v <= 8) return true
				},

				if : function(){
					
					if(!waitActions) return true;
				}
			},

			/*trial : {
				key : 'trial',
				vis : 'yesno',
				name : self.app.localization.e('stp'),
				bad : function(v){
					if(v) return true
				}
			},*/

			reputation : {
				key : 'reputation',
				vis : 'number',
				name : self.app.localization.e('srep'),
				bad : function(v){

					return false
				}
			},



			
		}

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			uscnt : function(clbk){

				self.shell({

					name :  'uscnt',
					el :   el.c,
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

				if(metrics.profileInfo.bad()) _metrics = {
					profileInfo : metrics.profileInfo,
					reputation : metrics.reputation
				}

				self.shell({

					name :  'ustatecontent',
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
			

		}

		var make = function(){
			
			self.app.platform.sdk.user.waitActions(function(r){
				self.app.platform.sdk.ustate.me(function(_mestate){

					waitActions = r;
					mestate = _mestate;	

					renders.uscnt(function(){

						el.ustatecontent = el.c.find('.ustatecontent')

						renders.ustatecontent()
					})
					

				})
			})
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {
				};

				clbk(data);
		

			},

			destroy : function(){
				el = {};
			
				delete self.app.platform.sdk.ustate.clbks[id]
			},
			
			init : function(p){				

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				self.app.platform.sdk.ustate.clbks[id] = make;

				make(function(){
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