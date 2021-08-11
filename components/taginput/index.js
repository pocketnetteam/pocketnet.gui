var taginput = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, essenseData;

		var actions = {
			initsearch : function(){
				search(el.tagSearch, {
					placeholder : essenseData.placeholder || self.app.localization.e('addtagsCategories'),
	
					clbk : function(el){
	
					
					},
	
					time : 0,
				
					events : {
						/*blur : function(value){
							events.addTag(value)
						},*/
						fastsearch : function(value, clbk, e){
				
							if(e){
								var char = String.fromCharCode(e.keyCode || e.which);
	
								if ((/[,.!?;:() ]/).test(char)) {
	
									events.addTag(value.replace(/#/g,'').replace(/ /g,''))
	
									el.tagSearch.find('input').val('').focus()
	
									clbk(null)
	
									return
								}
							}
	
	
							self.app.platform.sdk.tags.search(value, function(data){

								var tagsmap = _.map(data, function(t){
									return {
										tag : t,
										name : '#' + t
									}
								})

								var sc = self.app.platform.sdk.categories.search(value, actions.language())

								if (essenseData.addonlytags) sc = []

								var categories = _.map(sc, function(c){
									return {
										id : c.id,
										name : c.name
									}
								})

						
								var all = categories.concat(tagsmap)
								
								renders.tagsResults(all, function(tpl){
	
									clbk(tpl, function(_el, helpers){
	
										_el.find('.result').on('click', function(){
											helpers.closeResults();
											helpers.clear();
	
											events.add($(this))
										})
	
										_el.find('.empty').on('click', function(){
	
											var tag = trim(el.tagSearch.find('input').val())
	
											if (tag){
												helpers.closeResults();
												helpers.clear();
	
												events.addTag(tag)
											}
	
										})
	
									})
	
								})
	
							})
						},
	
						search : function(value, clbk, helpers){
	
							value = value.replace(/#/g, ' ');
	
							value = value.split(" ");
	
							value = _.filter(value, function(v){
								return v
							})
	
							if (value.length == 1){
								value = value[0]
							}
	
							events.addTag(value)
	
							helpers.clear();
	
							if (clbk)
								clbk()
						}
					},
	
					last : {
						get : function(){

							var cats = self.app.platform.sdk.categories.get(actions.language()) || []
							var tags = _.map(self.app.platform.sdk.categories.getaddedtags(actions.language()), function(t){
								return {
									tag : t,
									name : '#' + t
								}
							})

							var olddefault = [
								self.app.localization.e('tnews'), 
								self.app.localization.e('timages'), 
								self.app.localization.e('tvideos'), 
								self.app.localization.e('tmarket'), 
								self.app.localization.e('tsport')
							]

							olddefault = _.map(olddefault, function(t){
								return {
									tag : t,
									name : '#' + t
								}
							})

							if (essenseData.addonlytags) cats = []

							var all = cats.concat(tags, olddefault)//firstEls(cats.concat(tags, olddefault), 7)

							return all
						},
	
						tpl : function(data, clbk){
							renders.tagsResults(data, function(tpl){
	
								clbk(tpl, function(el, helpers){
	
									el.find('.result').on('click', function(){
										helpers.closeResults();
										helpers.clear();

										events.add($(this))
									})
	
								})
	
							})
						}
					}
					
				})
			},

			language : function(){
				if(essenseData.language) return essenseData.language()

				return null
			}
		}

		var events = {
			add : function(_el){
				var tag = _el.attr('tag')
				var category = _el.attr('category')

				if(category){

					var c = self.app.platform.sdk.categories.getbyid(category, actions.language())

					events.addTags(c.tags)
				}
				else{
					events.addTag(tag)
				}

				if (isMobile())
					setTimeout(function(){
						if (el.tagSearch)
							el.tagSearch.find('input').focus()
					}, 500)
				
			},
			remove : function(){
				var tag = $(this).closest('.wrps').attr('tag')
				var category = $(this).closest('.wrps').attr('category')

				if(category){
					var c = self.app.platform.sdk.categories.getbyid(category, actions.language())

					events.removeTags(c.tags)
				}

				if(tag){
					events.removeTag(tag)
				}

				$(this).closest('.wrps').remove()
			},
			removeTag : function(tag){

				if (essenseData.removeTag){
					essenseData.removeTag(tag)
				}

			},

			removeTags : function(tags){

				if (essenseData.removeTags){
					essenseData.removeTags(tags)
				}

			},

			addTag : function(tag){
				if (essenseData.addTag){
					essenseData.addTag(tag)
				}
			},

			addTags: function(tags){
				if (essenseData.addTags){
					essenseData.addTags(tags)
				}
			},
		}

		var renders = {

			tags : function(clbk){

				if (el.tags){
					el.tags.find('.tag').remove()

					var tags = essenseData.tags ? essenseData.tags() : []

					var bycategories = self.app.platform.sdk.categories.fromTags(tags, actions.language())

					if(essenseData.addonlytags){
						bycategories = {
							tags : tags,
							categories : []
						}
					}

					self.shell({
						name :  'tags',
						//inner : append,
						el : el.tags,
						data : {
							tags : essenseData.tags ? essenseData.tags() : [],
							bycategories : bycategories
						},

					}, function(p){

						if (p.el)
							p.el.find('.remove').on('click', events.remove)

						if (clbk)
							clbk();
					})
				}
			},

			tagsResults : function(results, clbk){

				self.shell({
					name :  'tagsResult',
					data : {
						results : results
					},

				}, function(_p){
					if (clbk)
						clbk(_p.rendered);
				})

			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			actions.initsearch()

			renders.tags()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				essenseData = p.settings.essenseData || {}

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
				el.tags = el.c.find('.tagsCont');
				el.tagSearch = el.c.find('.searchWrapper');

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
	module.exports = taginput;
}
else{

	app.modules.taginput = {};
	app.modules.taginput.module = taginput;

}