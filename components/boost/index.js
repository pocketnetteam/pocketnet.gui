var boost = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, ext = null, autoplay;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			faq : function(){

				var faqLangsFiltered = {};

				self.sdk.faqLangs.get(function(faqLangs){

					for (var l in faqLangs){

						if (l !== 'fr'){
	
	
							faqLangsFiltered[l] = faqLangs[l]
							.filter(function(g){
	
								return g.id === 'buy-pkoin';
		
							})
							.map(function(g){
								
								if (g.id === 'buy-pkoin'){
	
									var newG = JSON.parse(JSON.stringify(g))
	
									newG.group = g.group.slice(0, 7)
	
									return newG;
								}
	
								return g;
								
							})
	
						}
	
					}
	
					
					var k = self.app.localization.key;
	
					if(!faqLangsFiltered[k]) k = 'en';
	
					var faqcontent = faqLangsFiltered[k];
	
	
					self.shell({
						name :  'faq',
						turi : 'easynode',
						el : el.faqWrapper,
						data : {
							groups : faqcontent
						},
						animation : false,				
	
					}, function(p){
	
	
					})

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
			renders.faq()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {};

				var data = {
					minimal : ed.minimal ? 'minimal' : '',
					autoplay : ed.autoplay
				};

				clbk(data);

			},

			destroy : function(){

				if(ext){
					ext.destroy()
					ext = null
				}
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.faqWrapper = el.c.find('.faqWrapper')
				el.lenta = el.c.find('.lentaWrapper')
				el.c.find('.click').on('click', function(){ 
					el.c.find('.formula').toggleClass("hidden")
				})

				initEvents();

				make()

				p.clbk(null, p);
			},

			wnd : {
				class : 'normalizedmobile maxheight',
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
	module.exports = boost;
}
else{

	app.modules.boost = {};
	app.modules.boost.module = boost;

}

