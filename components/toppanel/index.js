var toppanel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {
			selector : function(){

				var links = {

					index : "index",
		
					sub : "index?r=sub",
		
					recommended : 	"index?r=recommended"
		
		
				}

				if (self.app.platform.videoenabled ){
					links.video = "index?video=1"
				}

				var vs = _.toArray(links)

				var r = parameters(self.app.nav.current.completeHref, true).r || 'index'
				var video = parameters(self.app.nav.current.completeHref, true).video || false
				var value = links[r]

				var labels = [self.app.localization.e('e13136'), self.app.localization.e('e13137'), self.app.localization.e('e13138')]

				if (self.app.platform.videoenabled ){
					value = links[video ? 'video' : r]
					labels.push(self.app.localization.e('video'))
				}

				var contents = new Parameter({
					type : "VALUES",
					name : "Contents",
					id : 'contents',
					possibleValues : vs, 
					possibleValuesLabels : labels,
					defaultValue : value
				
				})

				contents.value = value

				contents._onChange = function(v){

					var href = v;

					self.nav.api.load({
						open : true,
						href : href,
						history : true,
						
					})
					
				}

				return contents;

			}
		}

		var events = {
			
		}

		var renders = {
			menu : function(pathname){

				var selector = actions.selector()

				self.app.user.isState(function(state){

					if(state && isMobile() && pathname != 'index'){
						el.c.addClass('hidden')
						$('html').removeClass('toppanelshowed')
						
					}
					else{

						el.c.removeClass('hidden')
						$('html').addClass('toppanelshowed')
						self.shell({

							name :  'menu',
							el :   el.menu,
							data : {
								pathname : pathname,
								state : state,
								mobile : isMobile(),
	
								selector : selector
							},
	
						}, function(_p){

							updateNew()
	
							ParametersLive([selector], _p.el)
	
						})
					}

					
				})

				
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var updateNew = function(){

			var s = self.app.platform.sdk.newmaterials.storage

			if(!el.c) return

			_.each(s, function(v, k){

				var _el = el.c.find('.lentaunseen[key="'+k+'"]')

				if(v > 99) v = '99'

				_el.html(v)

				if(v) _el.addClass('hasunseen')
				else _el.removeClass('hasunseen')

			})
		}

		var initEvents = function(){

			self.app.nav.clbks.history.toppanel = function(href){
				renders.menu(app.nav.current.href)
			}

			if (self.app.platform.sdk.newmaterials.clbks)
				self.app.platform.sdk.newmaterials.clbks.update.toppanel = updateNew

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){

				delete self.app.platform.sdk.newmaterials.clbks.update.toppanel
				delete self.app.nav.clbks.history.toppanel
				
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.menu = el.c.find('.panelitems')

				initEvents();

				renders.menu(self.app.nav.current.href)

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
	module.exports = toppanel;
}
else{

	app.modules.toppanel = {};
	app.modules.toppanel.module = toppanel;

}