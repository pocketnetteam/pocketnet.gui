var articlev = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, editor;

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
			

		}

		var make = function(){

			if(!el.c) return

			editor = new EditorJS({

				holderId : 'editorjs',
			 
				data: {}
			});

			editor.isReady.then(() => {
				console.log('Editor.js is ready to work!')
				/** Do anything you need after editor initialization */
			})
			.catch((reason) => {
				console.log(`Editor.js initialization failed because of ${reason}`)
			});

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};

				if (editor)
					editor.destroy();

				editor = null
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();
				make()

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
	module.exports = articlev;
}
else{

	app.modules.articlev = {};
	app.modules.articlev.module = articlev;

}