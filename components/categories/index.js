var categories = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var el = {}, showed = false, essenseData, taginput;

		var actions = {
			showhideclear : function(){
				var hasc = self.app.platform.sdk.categories.gettags().length

				if (hasc){
					el.clearcategories.addClass('showed')
				}
				else{
					el.clearcategories.removeClass('showed')
				}
			},
			addcategory : function(_category){

				var hasc = _category ? true : false

				if(!_category){
					_category = {
						name : "",
						tags : [],
						id : makeid(true)
					}
				}

				var category = {
					name : _category.name,
					tags : _.clone(_category.tags),
					id : _category.id
				}

				self.fastTemplate('addcategory', function(rendered){

					var d = dialog({
						html : rendered,
						class : "addcategorydialog",
						header : self.app.localization.e('addcategory'),
						btn1text : self.app.localization.e('dcancel'),
						btn2text : self.app.localization.e('save'),
						wrap : true,
						
						clbk : function(el, d){
							renders.tagsinput(el, category)

							el.find('.name').on('keyup', function(){
								category.name = flb($(this).val().replace(/[^a-zA-Zа-яА-Я0-9_ ]/g, ''))
							})

							el.find('.removecat').on('click', function(){

								dialog({
									class : 'zindex',
									html : 'Do you really want to remove this category?',
									btn1text : self.app.localization.e('dyes'),
									btn2text : self.app.localization.e('dno'),
									success : function(){	
										self.app.platform.sdk.categories.remove(category.id)

										make()

										d.destroy()
									}
								})

								
							})
						},

						success : function(){
							return true
						},

						fail : function(){

							var error = self.app.platform.sdk.categories.add(category)

							if (error){

								if(error == 'name'){
									d.el.find('.name').focus()
									sitemessage(self.app.localization.e('emptycategoryname'))
								}

								if(error == 'doublename'){
									d.el.find('.name').focus()
									sitemessage(self.app.localization.e('doublename'))
								}

								if(error == 'tags'){
									d.el.find('.sminput').focus()
									sitemessage(self.app.localization.e('emptytags'))
								}

								return false
							}

							if(!hasc)
								self.app.platform.sdk.categories.select(category.id)

							make()

							return true
						}
					})
				}, {
					category : category,
					hasc : hasc
				})
			},


			addtag : function(tag, category){

				tag = tag.toLowerCase()

				if(_.indexOf(category.tags, tag) > -1){


					return false
				}

				category.tags.push(tag)

			},
			removetag : function(tag, category){
				category.tags = _.filter(category.tags, function(t){
					return t != tag
				})
			},
		}

		var events = {
			
		}

		var renders = {
			tagsinput : function(_el, category){

				self.nav.api.load({
					open : true,
					id : 'taginput',
					el : _el.find('.tagswrapper'),
					eid : 'addcategorytags',
					animation : false,
					essenseData : {
						tags : function(){
							return category.tags
						},

						removeTag : function(tag){
							actions.removetag(tag, category)
							renders.tagsinput(_el, category)
						},

						removeTags : function(tag){
							_.each(tags, function(tag){
								actions.removetag(tag, category)
							})
							renders.tagsinput(_el, category)
						},

						addTag : function(tag){							
							
							if (tag && tag.trim()){

								actions.addtag(tag, category);
								renders.tagsinput(_el, category);
								
							}
						},

						addTags : function(tags){
							_.each(tags, function(tag){
								actions.addtag(tag, category)
							})

							renders.tagsinput(_el, category)
						},

						addonlytags : true,

						placeholder : self.app.localization.e('addtags') 
					},

					clbk : function(e, p){

						if(!el.c) return

						taginput = p

					}
				})

			},
			showhide : function(){
				if(showed){
					el.c.addClass('showedallcats')
				}
				else{
					el.c.removeClass('showedallcats')
				}
			},
			categories : function(cats, clbk){

				if(!el.c) return

				if(!cats.length){
					el.c.addClass('hidden')
				}
				else{

					el.c.removeClass('hidden')


					cats = cats.sort(function(a, b){

						if (a.selected){

							if (b.selected && b.added){

								return 1;

							} else {

								return -1;

							}
						}

						if (a.excluded){

							if (a.added && !b.selected && b.excluded){
								return -1;
							} else {
								return 1;
							}
						}

						if (!a.excluded){

							if (a.added && !b.selected){
								return -1;
							}

							if (b.added || b.selected){
								return 1;
							}

							if (b.excluded && !b.added){

								return -1;

							} else {

								return 1;
							}

						}

						return 0;

					})
					

					self.shell({

						name :  'categories',
						el : el.cats,
	
						data : {
							cats : cats,
						},				
	
					}, function(p){

						renders.showhide()
	
						p.el.find('.showhideallcats').on('click', function(){
							showed = !showed
							renders.showhide()
							if(essenseData.renderclbk) essenseData.renderclbk()
						})

						p.el.find('.catcheckgl').on('click', function(){
							var id = $(this).closest('.tg').attr('category');

							var r = self.app.platform.sdk.categories.select(id)

						})

						p.el.find('.cat .times').on('click', function(){
							var id = $(this).closest('.tg').attr('category');

							var r = self.app.platform.sdk.categories.select(id)

						})

						p.el.find('.catedit').on('click', function(){
							var id = $(this).closest('.tg').attr('category')

							var category = self.app.platform.sdk.categories.getbyid(id)

							actions.addcategory(category)

						})

						p.el.find('.minus').on('click', function(){
							var id = $(this).closest('.tg').attr('category');

							var r = self.app.platform.sdk.categories.exclude(id)


						})

						if(essenseData.renderclbk) essenseData.renderclbk()
	
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
			self.app.platform.sdk.categories.clbks.excluded.mainmodule = function(id, value, l){

				if(!id) return

				var e = el.c.find('.tg[category="'+id+'"]')

				if(value) e.addClass('excluded')
				else e.removeClass('excluded')

				actions.showhideclear()
			}	

			self.app.platform.sdk.categories.clbks.tags.mainmodule =
			self.app.platform.sdk.categories.clbks.selected.mainmodule = function(id, value, l){

				if(!id) return

				var e = el.c.find('.tg[category="'+id+'"]')

				if(value) e.addClass('selected')
				else e.removeClass('selected')

				actions.showhideclear()
			}	

			el.c.find('.addcategory').on('click', function(){
				actions.addcategory()
			})

			el.c.find('.clearcategories').on('click', function(){
				dialog({
					class : 'zindex',
					html :  self.app.localization.e('clearcategories'),
					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),
					success : function(){	
						self.app.platform.sdk.categories.clear()
						make()
					}
				})
			})

		}

		var removeEvents = function(){
			delete self.app.platform.sdk.categories.clbks.selected.mainmodule
			delete self.app.platform.sdk.categories.clbks.excluded.mainmodule
		}

		var load = function(clbk){
			
			cats = self.app.platform.sdk.categories.getwithselected()
			
			if (clbk)
				clbk(cats)

		}

		var make = function(){

			load(function(cats, error){

				if (error){

					self.iclbks.maincat = make

				}

				renders.categories(cats)

				actions.showhideclear()

			})

		}

		return {

			getdata : function(clbk, p){
				essenseData = p.settings.essenseData || {};

				var data = {};

				data.video = parameters().video ? true  :false

				clbk(data);

			},

			destroy : function(){
				delete self.iclbks.maincat;

				if (taginput){
					taginput.destroy()
					taginput = null
				}

				removeEvents()

				essenseData = {}

				if(el.c) el.c.empty()

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cats = el.c.find('.cats');
				el.addcategory = el.c.find('.addcategory')
				el.clearcategories = el.c.find('.clearcategories')

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
	module.exports = categories;
}
else{

	app.modules.categories = {};
	app.modules.categories.module = categories;

}