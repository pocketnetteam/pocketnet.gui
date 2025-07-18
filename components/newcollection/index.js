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

			addimage : function(file){

				currentCollection.image.set(file.base64)

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

			applyText : function(text){
				currentCollection.message.set(findAndReplaceLinkClearReverse(text));
			},

			caption : function(caption){
				currentCollection.caption.set(findAndReplaceLinkClearReverse(caption));
			},

			eTextChange : function(c){
				var text = c.getText();

				actions.applyText(text);

				state.save()
			},

		}

		var helpers = {
			emojioneArea : function(_el){
				_el.emojioneArea({
					pickerPosition : 'bottom',
					
					search : false,
					tones : false,
					autocomplete : false,
	
					attributes: {
						spellcheck : true,
					},

					shortnames : !isTablet(),
	
					filters : isTablet() ? null : {
						smileys_people: {
							icon: "yum",
							title: "Smileys & People",
							emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down " +
							"wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum " +
							"stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses " +
							"cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown " +
							"frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth " +
							"no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream " +
							"fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking " +
							"shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face " +
							"head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader " +
							"robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
							"pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist " +
							"right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up " +
							"raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie " +
							"nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette " +
							"busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman " +
							"man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer " +
							"woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker " +
							"man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer " +
							"woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist " +
							"woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist " +
							"man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " +
							"man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing " +
							"man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok " +
							"man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging " +
							"man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut " +
							"woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying " +
							"men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple " +
							"bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire " +
							"mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie " +
							"womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat " +
							"tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses " +
							"closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
						},
					},
	
					events : {
						change : events.eTextChange,
						click : events.eTextChange,
						keyup : events.eTextChange,
	
						onLoad : function(c,d){

							el.c.find('.emojionearea-editor').attr('elementsid', 'emjInput');
	
							if (parameters().newshare){
								el.c.find('.emojionearea-editor').focus()
							}
				
							el.c.find('.emojionearea-editor').pastableContenteditable();
	
	
							el.c.find('.emojionearea-editor').on('pasteImage', function (ev, data){
	
								resize(data.dataURL, 1920, 1080, function(resized){
									var r = resized.split(',');
					
									if (r[1]){
					
										var r  = currentCollection.image.set(resized)
	
										if(!r){
											sitemessage(errors.image)
										}
										else
										{
											if (renders.image)
												renders.image();
										}
					
									}
									else{
										sitemessage("Image upload error")
									}
								
								})
	
	
							}).on('pasteImageStart', function(){
	
	
							}).on('pasteImageError', function(ev, data){
	
	
							}).on('pasteText', function (ev, data){
	
								actions.eTextChange(el.eMessage[0].emojioneArea)
	
							});

							if (isMobile() || isTablet()) el.c.find('.emojionearea-button').hide();
	
						}
					}
				});

				_el.emojioneArea.setText(currentCollection.message.v);
			}
		}

		var imagesHelper = {
			slowUploadGif : function(file, clbk){
			
				file.id = makeid();
				file.slow = true;
				file.base64 = file.base64;

				if (clbk)
					clbk(file)
			
			},
			slowUpload : function(file, clbk){
				resize(file.base64, 1080, 1080, function(resized){

					var r = resized.split(',');

					if (r[1]){

						
						file.id = makeid();
						file.slow = true;
						file.base64 = resized;

					}

					if (clbk)
						clbk(file)
				})
			},

			imageUploader : function(_el){
				initUpload({
					el : _el,
		
					ext : ['png', 'jpeg', 'jpg', 'gif', 'jfif', 'webp', 'avif'],

					dropZone : el.c,
					app : self.app,
					uploadImage : true,

					action : function(file, clbk){

						if (file.ext == 'gif'){
							imagesHelper.slowUploadGif(file, actions.addimage)
						}
						else
						{
							imagesHelper.slowUpload(file, actions.addimage)
						}

						clbk()
						
					},

					onError : function(er){

						var et = {
							filesize : "Your photo has size greater than 30MB.",
							fileext : "Invalid format of picture."
						}

						if (et[er])
							sitemessage(et[er])
					},

					onSuccess : function(){
					
					}
				})
			}
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

				if(!essenseData.collection){
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
					
					currentCollection.language.set(self.app.localization.key)
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