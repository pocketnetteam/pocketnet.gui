var tagcloud = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			tags : function(tags, clbk){

				if(!el.c) return

				if(!tags.length){
					el.c.addClass('hidden')
				}
				else{

					el.c.removeClass('hidden')

					self.shell({

						name :  'tags',
						el : el.tags,
	
						data : {
							tags : tags
						},				
	
					}, function(p){
	
						p.el.find('.showhidealltags').on('click', function(){
							el.c.toggleClass('showedalltags')
						})
	
						if (clbk)
							clbk()
	
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
			
			

		}

		var load = function(clbk){
			
			self.app.platform.sdk.tags.cloud(function(tags, error){

				tags = self.app.platform.sdk.tags.filterEx(tags)

				if (clbk)
					clbk(tags, error)
					
			})

		}

		var make = function(){

			load(function(tags, error){

				if (error){

					self.iclbks.maintag = make

				}

				renders.tags(tags)

			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				delete self.iclbks.maintag;

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.tags = el.c.find('.tags');

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
	module.exports = tagcloud;
}
else{

	app.modules.tagcloud = {};
	app.modules.tagcloud.module = tagcloud;

}