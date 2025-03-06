var slides = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, tag;

		var rendered = {}
		var total = []

		var getInterval = null;
		var renderInterval = null;

		var getTime = 30000
		var renderTime = 3000
		var maxshares = 250
		var wshares = 3

		var externals = []

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			lenta : function(txids, clbk){


				if(!txids.length){
					if(clbk) clbk()

					return
				} 

				_.each(txids, (txid) => {
					rendered[txid] = true
				})

				var element = $("<div></div>")

				el.packs.prepend(element)

				self.app.platform.papi.lenta(txids, element, (e, p) => {
					externals.push(p)

					if(clbk) clbk()

					return
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
		
		

		var clear = function(){

			_.each(externals, (e) => {
				e.destroy()
			})

			externals = []

			el.packs.empty()

			rendered = {}

		}

		var task = function(){


			var newshares = _.last(_.filter(total, (t, i) => {
				return !rendered[t]
			}), 20)


			if(_.toArray(rendered).length > maxshares && newshares.length > wshares){
				clear()
			}

			renders.lenta(newshares)
		}

		var get = function(){
			var proxy = self.app.api.get.byidwithadd('pocketnet.app:8899:8099')

			return proxy.fetch('slidemodule/get', {tag}).then(r => {

				var sorted = _.sortBy(r, (r) => {
					return new Date(r.dt)
				})

				total = _.map(sorted, (r) => {
					return r.txid
				})

				total = _.uniq(total)
				

				return Promise.resolve()
			})
		}

		var make = function(){

			globalpreloader(true)

			get().then(() => {
				task()
			}).finally(() => {
				globalpreloader(false)
			})

			getInterval = setInterval(get, getTime)

			renderInterval = setInterval(task, renderTime)
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var p = parameters()

				tag = p.tag || "images"

				rendered = {}
				total = []

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){

				if(renderInterval){
					clearInterval(renderInterval)
					renderInterval = null
				}

				
				if(getInterval){
					clearInterval(getInterval)
					getInterval = null
				}

				clear()

				ed = {}
				el = {};

				total = []

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.packs = el.c.find('.packs')

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

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = slides;
}
else{

	app.modules.slides = {};
	app.modules.slides.module = slides;

}