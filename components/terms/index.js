var terms = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			terms : function(){

				self.shell({
					name :  'en',
					el :   el.c.find('.textWrapper'),
					data : {
						
					},

				}, function(_p){



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
			
			el.c.find('.accept').on('click', function(){
				if(ed.success) ed.success()

				self.closeContainer()
			})
		}

		var make = function(){
			renders.terms();
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {
					ed : ed
				};

				

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

				make();

				p.clbk(null, p);
			},
			wnd : {
				class : 'withoutButtons allscreen black a100'
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
	module.exports = terms;
}
else{

	app.modules.terms = {};
	app.modules.terms.module = terms;

}