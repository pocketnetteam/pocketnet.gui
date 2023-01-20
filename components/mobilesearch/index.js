var mobilesearch = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, tsearch, currentFastId = '';

		var actions = {

		}

		var events = {
			search : function(value){

				if (ed.events.search && value){

					el.c.addClass('active')

					ed.events.search(value, function(r){

						currentFastId = '';

						self.closeContainer();

					}, helpers);

				}
			},
			fastsearch : function(e, element){
				var value = element.val()

				if(currentFastId == value) return

				var thisSearch = currentFastId = value;

				if(!value){

					renders.last()
					return
				}

				el.c.addClass('active')

				ed.events.fastsearch(value, (r, revents) => {

					if(thisSearch != currentFastId || !element.val()) return;

					el.c.removeClass('active')

					if (r){

						el.results.html(r);

						if (revents){
							revents(el.results, helpers)
						}

					}

				}, e);
			}
		}

		var helpers = {
			openResults : function(){

			},
			closeResults : function(){
				self.closeContainer()
			},
			
			clear : function(){
				el.input.val('')
			},

			getvalue : function(){
				return el.input.val()
			}
		}

		var renders = {
			last : function(){

				var result = ed.last.get();

				if (result.length){

					ed.last.tpl(result, function(r, revents){

						el.results.html(r);

						if (revents){
							revents(el.results, helpers)
						}

					})

				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			var dfastsearch = _.debounce(events.fastsearch)

			el.c.find('.cancelWrapper').on('click', () => {
				self.closeContainer()
			})

			el.input.on('keyup', function(e){


				if ((e.keyCode || e.which) != 13) {

					var char = String.fromCharCode(e.keyCode || e.which);


					if ((/[,.!?;:() ]/).test(char)) {
						return
					}

					dfastsearch(e, $(this))
				}
				else{
					events.search($(this).val())
				}
			})

			el.input.on('change', function(e){
				dfastsearch(e, $(this))
			})

		}

		var make = function(){
			renders.last()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				

				var data = {
					ed,
					tsearch
				};

				clbk(data);

			},

			destroy : function(){

				if(tsearch) 
					tsearch.destroy()

				tsearch = null

				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.results = el.c.find('.resultsWrapper')
				el.input = el.c.find('input')

				/*ed.events.clear = function(){
					self.closeContainer()
				}

				ed.closeByHtmlRemove = true*/

				/*tsearch =  new search (el.c.find('.searchWrapper'), ed)
				

				tsearch.showlast()

				setTimeout(() => {
					tsearch.focus()
				}, 100)*/

				setTimeout(() => {
					el.input.focus()
				}, 500)
				

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				class : "normalizedmobile fromtop mobsearch",
				reversePrlx : true,
				fastClbk : true
			},
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = mobilesearch;
}
else{

	app.modules.mobilesearch = {};
	app.modules.mobilesearch.module = mobilesearch;

}