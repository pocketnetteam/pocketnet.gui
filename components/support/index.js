var support = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {
			send : function(){
				var values = actions.values();

				if(!values){
					el.c.addClass('showError')
				}
				else
				{
					el.c.removeClass('showError')

					topPreloader(20);

					self.app.platform.sdk.user.support(values, function(){

						topPreloader(100);

						dialog({
							html : self.app.localization.e('contactSuccess'),
							class : "one"
						})

						$.each(el.inputs, function(){
							$(this).val('')
						})

					})
				}
			},
			values : function(){
				var values = {};
				var valid = true;

				$.each(el.inputs, function(){
					var input = $(this);

					var value = input.val();
					var key = input.attr('systemId');

					if (value){
						values[key] = value
					}
					else
					{
						valid = false;
					}
				})

				if(valid) return values;

				else return null;
			}
		}

		var events = {
			send : function(){
				actions.send();
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
			
		
			el.send.on('click', events.send)
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.send = el.c.find('.send');

				el.inputs = el.c.find('.forminput');

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
	module.exports = support;
}
else{

	app.modules.support = {};
	app.modules.support.module = support;

}