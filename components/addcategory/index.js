var addcategory = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, taginput;

		var actions = {
			addtag : function(tag){

				tag = clearTagString(tag)

				if(!tag) return

				if(_.indexOf(ed.category.tags, tag) > -1){
					return false
				}

				ed.category.tags.push(tag)

			},
			removetag : function(tag){
				ed.category.tags = _.filter(ed.category.tags, function(t){
					return t != tag
				})
			},
		}

		var events = {
			
		}

		var renders = {
			tagsinput : function(){

				self.nav.api.load({
					open : true,
					id : 'taginput',
					el : el.c.find('.tagswrapper'),
					eid : 'addcategorytags',
					insertimmediately : true,

					animation : false,
					essenseData : {
						tags : function(){
							return ed.category.tags
						},

						removeTag : function(tag){
							actions.removetag(tag)
							renders.tagsinput()
						},

						removeTags : function(tags){
							_.each(tags, function(tag){
								actions.removetag(tag)
							})
							renders.tagsinput()
						},

						addTag : function(tag){							

							actions.addtag(tag);
							renders.tagsinput();
								
						},

						addTags : function(tags){
							_.each(tags, function(tag){
								actions.addtag(tag)
							})

							renders.tagsinput()
						},

						addonlytags : true,

						placeholder : self.app.localization.e('addtags') 
					},

					clbk : function(e, p){

						if(!el.c) return

						el.c.addClass('ready')

						taginput = p

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

		var initEvents = function(){

			el.c.find('.name').on('keyup', function(){
				ed.category.name = flb($(this).val().replace(/[^a-zA-Zа-яА-Я0-9_ ]/g, ''))
			})
			
			el.c.find('.save').on('click', function(){
				if (ed.save){
					var error = ed.save(ed.category)

					if (error){

						if(error == 'name'){
							el.c.find('.name').focus()
							sitemessage(self.app.localization.e('emptycategoryname'))
						}

						if(error == 'doublename'){
							el.c.find('.name').focus()
							sitemessage(self.app.localization.e('doublename'))
						}

						if(error == 'tags'){
							el.c.find('.sminput').focus()
							sitemessage(self.app.localization.e('emptytags'))
						}

					}
					else{
						self.closeContainer()
					}
				}
				else{
					self.closeContainer()
				}

				
			})

			el.c.find('.remove').on('click', function(){

				new dialog({
					class : 'zindex',
					html : self.app.localization.e('removecategoryQestion'),
					btn1text : self.app.localization.e('dyes'),
					btn2text : self.app.localization.e('dno'),
					success : function(){	
						if (ed.remove){
							ed.remove(ed.category)
						}
		
						self.closeContainer()
					}
				})
				
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					category : ed.category,
					editing : ed.editing
				};

				clbk(data);

			},

			destroy : function(){
				if(taginput) taginput.destroy()

				taginput = null
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				renders.tagsinput()

				p.clbk(null, p);
			},

			wnd : {
				header : "",
				class : 'addcategoryWindow normalizedmobile maxheight withoutButtons',
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
	module.exports = addcategory;
}
else{

	app.modules.addcategory = {};
	app.modules.addcategory.module = addcategory;

}