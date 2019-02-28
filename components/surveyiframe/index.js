var surveyiframe = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			imessages : function(e){
		
				var data = e.originalEvent.data || {};

				if (data.message == 'endsurvey'){
					self.closeContainer()
				}
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
			
			$(el.c.find('iframe')[0].contentWindow).on('message', events.imessages)
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				//window.removeEventListener("message", events.imessages);

				

				el = {};
			},
			
			init : function(p){

				localStorage['survey1'] = true;

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				class : "allscreen black surveyiframe"
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
	module.exports = surveyiframe;
}
else{

	app.modules.surveyiframe = {};
	app.modules.surveyiframe.module = surveyiframe;

}