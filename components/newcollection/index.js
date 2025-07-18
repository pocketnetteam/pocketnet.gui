var newcollection = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;
		var currentCollection = null
		var sortable = null

		var errors = {
			message : self.app.localization.e('collectionemptymessage'),
			image : self.app.localization.e('collectionimage'),
			caption : self.app.localization.e('collectioncaption'),
			shares : self.app.localization.e('collectionshares'),
		}

		var actions = {

			addimage : function(value){

				currentCollection.image.set(value)

				state.save()

				renders.image() //
				
			},

			editImage : function(){
				var m = [
					{
						original : currentCollection.image.v,
						index : 0
					}
				]
				
				
				_.map(currentCollection.images.v, function(src, i){
					return {
						original : src,
						index : i
					}
				})

				var f = _.filter(m, function(f){
					if(f.original.indexOf('data:image') > -1){
						return true;
					}
				})

				if(!f.length) return


				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,
					history : true,

					essenseData : {
						edit : true,
						initialValue : 0,
						images : f,

						close : function(){
							
						},

						success : function(images, clbk){


							currentCollection.image.v = f[0].original
							state.save()

							renders.image(clbk);
						}
					}
				})
			},

			errortext : function(text){

				if(self.app.mobileview){
					if (text)
						sitemessage(text)
				}
				else{
					if(!el.error) return

					if(!text){
						el.error.html('')
						el.c.removeClass('showError')
					}
	
					else{
						el.error.html('<div>'+text+'</div>')
						el.c.addClass('showError')
					}
				}

				
			},

			error : function(onlyremove){
				var error = currentCollection.validation();

				if (error && !onlyremove){

					actions.errortext(errors[error])

					if(error == 'message'){
						el.c.find('.emojionearea-editor').focus()
					}

					if(error == 'caption'){
						if (el.caption)
							el.caption.focus() 
					}

					return true
				}
				else
				{
					actions.errortext('')
					return false
				}
			},
		}

		var events = {
			change : function(){

			}
		}

		var renders = {
			image : function(){
				
			}
		}

		var state = {
			save : function(){

				if(!currentCollection){
					self.app.settings.set(self.map.id, 'currentCollection');
				}
				else
				{

					if(currentCollection.aliasid){
						return
					}

					var exp = currentCollection.export(true)

					self.app.settings.set(self.map.id, 'currentCollection', exp);

				}
				
			},
			load : function(){

				if(essenseData.dontsave) return

				var last = self.app.settings.get(self.map.id, 'currentCollection')

				if (last){

					currentCollection.import(last)
				}

				return last
			}
		}

		var initEvents = function(){
			
			currentCollection.on.change.edit = events.change;
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {
					ed
				};

				currentCollection = ed.collection || new Collection(self.app.localization.key, self.app);
				currentCollection.app = self.app

				if(!ed.collection){

					if(!state.load()){
						
					}
					
					//currentCollection.language.set(self.app.localization.key)
				}

				clbk(data);

			},

			destroy : function(){

				if (el.c)
					el.c.find('.emojionearea-editor').off('pasteImage')

				try{
					if (el.eMessage) {
		
						el.eMessage[0].emojioneArea.destroy();

						el.eMessage.remove()

						delete el.eMessage[0].emojioneArea
					}
					
				}
				catch(e){
					console.error(e)
				}

				if (sortable){
					sortable.destroy()
					sortable = null
				}


				ed = {}
				el = {};
				
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				p.clbk(null, p);
			},

			wnd: {
				class: 'wndnewcollection normalizedmobile maxheight withoutButtons',
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
	module.exports = newcollection;
}
else{

	app.modules.newcollection = {};
	app.modules.newcollection.module = newcollection;

}