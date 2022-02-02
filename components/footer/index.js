var footer = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var loc = new Parameter({

			type : "VALUES",
			name : "Localization",
			id : 'localization',
			defaultValue : app.localization.current().name,
			possibleValues : app.localization.availableMap('name'),
			possibleValuesLabels : app.localization.availableMap('name'),
			format : {
				right : true
			},

			_onChange : function(value){
				var a = app.localization.findByName(value);

				if (a && a.key != app.localization.key)
				{
					app.localization.set(a.key);
				}
			}

		})

		var actions = {

		}

		var events = {
			
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

			ParametersLive([loc], el.c);

			el.c.find('.localization').on('click', function(){

				self.app.platform.ui.changeloc()
				
			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

					data._SEO = _SEO;
					data.loc = loc;
					data.lkey = app.localization.current()

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

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
	module.exports = footer;
}
else{

	app.modules.footer = {};
	app.modules.footer.module = footer;

}