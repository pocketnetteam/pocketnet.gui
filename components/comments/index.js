
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}

var comments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, txid, ed, currents = {}, caption, _in, top, eid, preview = false, listpreview = false, showedall = false;

		var authblock = false;

		var errors = {
			content : self.app.localization.e('e13029'),
			messagelength : self.app.localization.e('e13030'),
			images : self.app.localization.e('maximages'),
		}

		var mestate;
		var rendered = {};

		var areas = {};

		var external = null;

		var currentstate = {};

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var clbks = {
			upvote : function(err, comment, value, address, temp){

				console.log("CLBK")
				if(!comment) return

				if (comment.txid != txid) return

				var _el = el.c.find('#' + comment.id);

				var d_el = _el.find(">div.commentPaddingWrapper>div.commentWrapper>div.commentBody>div.cbodyWrapper");

				if (address == self.app.platform.sdk.address.pnet().address){

					if(!value){

						if(err != 40){
							_el.removeClass('rated')
							d_el.find('.scoreUp').removeClass('ratedScore')
							d_el.find('.scoreDown').removeClass('ratedScore')
						}
						
					}
					else{
						_el.addClass('rated')

						if(value > 0){
							d_el.find('.scoreUp').addClass('ratedScore')
						}

						if(value < 0)
						{
							d_el.find('.scoreDown').addClass('ratedScore')
						}
					}

				}

				var cs = {
					scoreUp : (comment.scoreUp || 0) + ((temp && value > 0) ? 1 : 0),
					scoreDown : (comment.scoreDown || 0) + ((temp && value < 0) ? 1 : 0)
				}

				d_el.find('.scoreUp .commentScore').html(comment.scoreUp ? compressedNumber(cs.scoreUp, 1) : '')
				d_el.find('.scoreDown .commentScore').html(cs.scoreDown ? compressedNumber(cs.scoreDown, 1) : '')
			},

			post : function(err, alias, _txid, pid, aid, editid, id, manual){

				
				if(_txid != txid) return

				el.c.find('.sending').removeClass('sending')

				if (err){
					return
				}

				state.save()

				el.c.find('.emojionearea-editor').blur();

				el.c.find('.att').html('');

				var p = {
					comments : [alias]
				}

				if (listpreview){
					ed.lastComment = self.app.platform.sdk.comments.toLastComment(alias)
				}

				delete currents[id]


				if (id == '0'){
					p.class = "firstcomment"
				}

				if (id == '0')
				{
					if (areas[id])

						areas[id].setText('');

					el.c.find('.post .newcommentimages').html('')
				}

				else
				{

					var _el = el.c.find('#' + id);

					if (editid){

						_el.find('.edit').html('');

						alias.timeUpd = alias.timeUpd.addMinutes(1)

						if(!alias.parentid) p.class = "firstcomment"

						delete areas[id]

						delete rendered[id]

						_el.removeClass('editing')

						p.inner = replaceWith
						p.el = _el

					}
					else
					{
						_el.find('.answer').html('');

						_el.find('.repliescount').html(Number(_el.find('.repliescount').html() || "0") + 1)

						_el.find('.replies').removeClass('hidden')

						p.el = el.c.find("#" + id + ' .answers')

						delete areas[id]
					}								
					
				}

				p.newcomments = 'newcomments'

				renders.list(p, function(){

					if (manual){
						actions.tocomment(alias.id)
					}
				})

				if (!editid && ed.send){
					ed.send(alias, self.app.platform.sdk.comments.toLastComment(alias))
				}

				if(!editid){

					if(ed.comments) ed.comments++

					actions.showhideLabel()
				}
			}
		}

		var actions = {

			myscores : function(){
				_.each(rendered, function(c, id){
					var comment = deep(self.app.platform.sdk, 'comments.storage.all.' + id)

					if (comment){
						clbks.upvote(null, comment, Number(comment.myScore), self.app.platform.sdk.address.pnet().address)
					}
				})	
			},

			stateAction : function(clbk){

				if (_OpenApi){

					var phref = 'https://'+self.app.options.url+'/post?openapi=true&s=' + txid

					if (self.app.ref){
						phref += '&ref=' + self.app.ref
					}

					window.open(phref, '_blank');

					return
				}

				self.app.user.isState(function(state){

					if(state){
						clbk()
					}

					else
					{
						self.nav.api.load({
							open : true,
							id : 'authorization',
							inWnd : true,

							essenseData : {

								fast : true,
								loginText : self.app.localization.e('llogin'),
								successHref : '_this',

								signInClbk : function(){


									retry(function(){

										return !authblock

									}, function(){

										if (clbk)
											clbk()
									})

									
								}
							}
						})
					}

				})
			},
			sharesocial : function(comment){

					var hr = ed.hr + "&commentid=" + comment.id;

					if(comment.parentid && comment.parentid != '0') hr = hr + "&parentid=" + comment.parentid;
					
					
					self.nav.api.load({
						open : true,
						href : 'socialshare2',
						history : true,
						inWnd : true,
						

						essenseData : {
							url : hr,
							caption : "Share comment",
							sharing : comment.social(self.app),
							embedding : {
								type : "comment",
								commentid : comment.id,
								parentid : comment.parentid,
								id : txid
							}
						}
					})
				
			},
			editImage : function(id, r, p){

				var comment = currents[id]

				var m = _.map(comment.images.v, function(src, i){

					return {
						original : src,
						index : i
					}
					
				})

				var f = m; /*_.filter(m, function(f){
					if(f.original.indexOf('data:image') > -1){
						return true;
					}
				})
*/
				focusfixed = true;

				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,

					essenseData : {
						edit : true,
						initialValue : r,
						images : f,

						close : function(){
							
						},

						success : function(images, clbk){

							_.each(comment.images.v, function(img, i){

								var edited = _.find(f, function(eimg){
									if(eimg.index == i) return true;
								})

								if (edited){
									comment.images.v[i] = edited.original
								}

							})

							renders.images(id, p, clbk)
						}
					}
				})
			},
			removeImage : function(id, r, p){

				var comment = currents[id]

				var image = comment.images.v.splice(r, 1)[0];

				p.el.find('.imageContainer').each(function(){
					var el = $(this)

					var v = el.attr('value');

					if (v > r){
						el.attr('value', v - 1)
					}

					if(v == r){
						el.remove();
					}
				})

				var elimages = p.el.find('.imagesEmbWr')

				elimages.isotope()


			},
			embedimages : function(id, p){
				id || (id = '0')

				actions.process(id)

				if (areas[id])
					areas[id].___inited = true

				var storage = currents[id].export(true)
	
				self.nav.api.load({
					open : true,
					id : 'embeding',
					inWnd : true,

					essenseData : {
						type : 'images',
						storage : storage,
						on : {
						
							added : function(value){

								var result = true;

								if(!_.isArray(value)) value = [value]

								_.each(value, function(v, i){

									result = currents[id].images.set(v)

								})

								if(!result && errors[type]){

									sitemessage(errors[type])

								}		
								
								
								renders.images(id, p)

							}
						}
					},

					clbk : function(s, p){
						external = p
					}
				})
			},
			removeForm : function(id){

				console.log("ID", id)

				delete areas[id]

				el.c.find("#" + id + ' .answer').html('')
				el.c.find("#" + id + ' .edit').html('')
			},
			post : function(id, pid, aid, editid){

				id || (id = '0')

				var current = currents[id];

				if (current){
					var e = current.validation();

					if (e){
						el.c.find('.sending').removeClass('sending')
						sitemessage(errors[e])
					}
					else
					{

						if(current.loading) return;

						current.loading = true;

						current.uploadImages(self.app, function(){

							actions.send(current, function(error, alias){

								current.loading = false;

								if(!error){
									successCheck()
								}
							
							}, pid, aid, editid, id)
						})
							
					}
				}
				else{
					el.c.find('.sending').removeClass('sending')
					sitemessage(errors['content'])
				}

				
			},
			send : function(comment, clbk, pid, aid, editid, id){	

				self.app.platform.sdk.comments.send(txid, comment, pid, aid, function(err, alias){
					if (el.c)
						el.c.find('.sending').removeClass('sending')

					if(!err){
						if (clbk)
							clbk(null, alias)
					}

					else
					{
						self.app.platform.errorHandler(err, true)

						if (clbk)
							clbk(err, null)
					}

				}, editid, id)
			},
			links : function(id, text){

				id || (id = '0')

				var current = currents[id];

				if (current)

					if(!current.url.v){
						
						var l = null
						var r = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 

						var matches = text.match(r);

						if(matches && matches.length > 0){
							l = matches[0]
						}

						if (l)
							current.url.set(l)

					}
				
			},
			process : function(id){

				id || (id = '0')

				if(!currents[id])
					currents[id] = new Comment(txid)
		
			},
			message : function(id, v){


				id || (id = '0')

				if(currents[id])
					 currents[id].message.set(v)

				state.save()

			},
			emessage : function(id, c){

				var v = c.getText();

				actions.links(id, v);
				actions.message(id, v)

				if (areas[id])
					areas[id].___inited = true

			},
			fastreply : function(reply){

				if(reply){
					actions.replies(reply.parentid || reply.answerid, true, function(){

						if(!reply.noaction)

							actions.reply(reply.parentid || reply.answerid, reply.answerid)

						else
						{
							actions.tocomment(reply.answerid)

							var cel = el.c.find("#" + reply.answerid)

							cel.addClass('newcommentsn')

							setTimeout(function(){

								cel.removeClass('newcommentsn')

							}, 2500)
						}

					})
				}


			},
			reply : function(id, aid){

				actions.stateAction(function(){

					var _el = el.c.find('#' + id);
					var answer = _el.find('.answer');

				
					renders.post(function(area, el){

						var pid = '0'

						if (aid != id) pid = id

						var address = self.app.platform.sdk.comments.address(txid, aid, pid) || deep(ed, 'lastComment.address')

						var name = (deep(self.app, 'platform.sdk.usersl.storage.'+address+'.name') || address)

						var str = '@' + name + ',  '

						if(address == self.app.platform.sdk.address.pnet().address || !name) str = ''

						area.setText(str)

						areas[id] = area

						el.focus();

						el.closest('.answer').addClass('active')

						if (str.length)
							ecaretPosition(el, 0, str.length)


					}, {
						placeholder : "Send Reply",
						el : answer,
						answer : 'answer',
						pid : id,
						aid : aid,
						id : id
					})

				})
			},
			hideallReplies : function(){
				_.each(deep(self, 'app.platform.sdk.comments.storage.'+txid + '.0'), function(r, id){

					actions.replies(id, false)

				})
				
				if (ed.lastComment)
					actions.replies(ed.lastComment.id, false)
				
			},
			replies : function(id, show, clbk, _p){

				if(!_p) _p = {}

				if(id == '0'){

					if (clbk)
						clbk()

					return
				}

				var p = {};

					p.in = _p.in

					p.el = el.c.find("#" + id + ' .answers')

				var c = el.c.find("#" + id)

				if(typeof show == 'undefined'){

					if(c.hasClass('showedreplies')){
						show = false;
					}
					else
					{
						show = true;

						c.find('.repliesloaderWrapper').removeClass('hidden')
					}
				}

				if (show){
					load.level(id, function(comments){

						c.find('.repliesloaderWrapper').addClass('hidden')

						p.comments = self.app.platform.sdk.comments.storage[txid][id]
						
						c.addClass('showedreplies')

						renders.list(p, function(){

							if(!caption)
								renders.caption()

							if (clbk)
								clbk()
							

						}, id)

					})
				}
				else
				{

					delete currentstate.levels[id]

					if (self.app.platform.sdk.comments.storage[txid])
						_.each(self.app.platform.sdk.comments.storage[txid][id], function(c){
							delete rendered[c.id]
						})

					c.removeClass('showedreplies')

					actions.removeForm(id)

					p.el.html('')
				}

			
			},
			getid : function(el){
				if (el.attr('answer')){
					var c = el.closest('.comment')

					var aid = c.attr('id')
					var pid = el.closest('.firstcomment').attr('id')

					return pid
				}

				else
				{

					if (el.attr('edit')){
						var c = el.closest('.comment')

						var aid = c.attr('aid')
						var pid = c.attr('pid')
						var id = c.attr('id')

						return id
					}

					else
					{
						return "0"
					}

					
				}
			},
			tocomment : function(id){
				_scrollTo(el.c.find("#" + id), _in)
			},
			closeEdit : function(id){
				var _el = el.c.find("#" + id)

				_el.removeClass('editing')
				_el.find('.commentBody').removeClass('editing')

				actions.removeForm(id)
			},
			delete : function(comment, clbk){
				var ct = comment.delete()

				self.app.platform.sdk.comments.delete(txid, ct, function(err, alias){

					if(!err){
						if (clbk)
							clbk(null, alias)
					}

					else
					{
						self.app.platform.errorHandler(err, true)

						if (clbk)
							clbk(err, null)
					}

				})
			},
			update : function(pid){

				var p = {};

				var _el = null;

				if(pid) _el = el.c.find("#" + pid + ' .answers')

					else{

						p.class = "firstcomment"

						_el = el.c.find('.list')
					}

				load.level(pid, function(comments){
					_el.html('')

					p.comments = comments;

					renders.list(p)
				})
			},
			hiddenCounts : function(c){
				if(c > 0){
					el.showall.find('.ccounts').html("(" + c + ")")
					
				}
				else
				{
					el.showall.find('.ccounts').html()
					
				}
			},
			showall : function(){

				showedall = true;
				el.c.addClass('showedall')				
				actions.showhideLabel()	
				
				ed.showall = true

				if (listpreview){

					el.c.removeClass('listpreview')

					el.c.find('.loaderWrapper').removeClass('hidden')
					

					load.level(null, function(comments, e){

						if(e){

							self.app.platform.errorHandler(e, true)

							el.c.addClass('listpreview')

							el.c.find('.loaderWrapper').addClass('hidden')

							showedall = false;
							el.c.removeClass('showedall')				
							actions.showhideLabel()

							return
						}

						listpreview = false;

						renders.caption()

						rendered = {}

						var p = {}

						p.comments = self.app.platform.sdk.comments.storage[txid]['0']
						p.class = "firstcomment"
						p.inner = html

						renders.list(p, function(){

							el.c.find('.loaderWrapper').addClass('hidden')

						})
					})
				}

				else
				{
					renders.caption()	
				}
			},
			showhideLabel : function(){
				

				if(!el.showall) return

				if (showedall){
					el.showall.addClass('hidden')
				}

				else
				{
					var counts = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid + '.comments') || 0;

					var lastchildren = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid + '.lastComment.children') || 0;

					if (listpreview){
						

						if (counts - lastchildren > 1){
							el.showall.removeClass('hidden')

							actions.hiddenCounts(counts - lastchildren - 1)
						}
						else
						{
							el.showall.addClass('hidden')
						}
					}
					else
					{

						if(counts > 5){
							
							el.showall.removeClass('hidden')

							actions.hiddenCounts(counts - 5)
						}
						else
						{
							el.showall.addClass('hidden')
						}

					}
				}

				
			},
			openGallery : function(comment, initialValue, clbk){
				var images = _.map(comment.images, function(i){
					return {
						src : i
					}
				})

				var num = findIndex(images, function(image){

					if (image.src == initialValue) return true;						

				})

				console.log('comment', comment, initialValue, images)

				self.app.nav.api.load({
					open : true,
					href : 'imagegallery?s=' + txid + '&num=' + (num || 0) + "&com=" + comment.id,
					inWnd : true,
					history : true,

					essenseData : {
						initialValue : initialValue,
						idName : 'src',
						images : images,

						gid : txid + comment.id
					},

					clbk : function(){
						if (clbk)
							clbk()
					}
				})
				
			},
			upvoteComment : function(value, id){

				actions.stateAction(function(){

					var comment = deep(self.app.platform.sdk, 'comments.storage.all.' + id)


					if(!comment) return

					if (comment.address == self.app.platform.sdk.address.pnet().address){
						return
					}

					var upvoteComment = comment.upvote(value)

					self.app.platform.sdk.comments.upvote(upvoteComment, function(err, alias){

						
						if (err){
							self.app.platform.errorHandler(err, true)	
						}

					})

				})

				
			},
			scrollToComment : function(el) {
				if (el && el.length > 0 && el[0].scrollIntoView && isMobile() && $(window).width() <= 768) {
					el[0].scrollIntoView(true);
					// Scroll until the comment section is at 120 px from the top
					var container = ($('html').hasClass('showmain')) ? $('.lentacell') : $('html');
					var offset = 120 - el[0].getBoundingClientRect().top;
					if (offset > 0)
						container.animate({scrollTop: '-=' + offset + 'px'}, 0);
				}
			}
		}

		var events = {

			upvoteComment : function(){

				if($(this).closest('.comment').hasClass('rated')) return

				var value = 0;

				if($(this).attr('score') == 'scoreUp') value = 1
				else 	value = -1;

				var id = $(this).closest('.comment').attr('id');
				var pid = $(this).closest('.comment').attr('pid');
				
				actions.upvoteComment(value, id, pid)
			},
			openGallery : function(){

				var _el = $(this)

				var parent = _el.closest('.comment');

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.app.platform.sdk.comments.find(txid, id, pid)

				if (listpreview && ed.lastComment){
					comment = self.app.platform.sdk.comments.ini([ed.lastComment])[0]

					console.log('ed.lastComment', ed.lastComment)
				}


				actions.openGallery(comment, _el.attr('i'))
			},
			replyandreplies : function(){
				var id = $(this).closest('.firstcomment').attr('id')

				actions.replies(id, true, function() {
					// Scroll comment section to top of the screen
					actions.scrollToComment(el.list.find('.answer.active'));
				});

				var c = $(this).closest('.comment');
				var cf = $(this).closest('.firstcomment');

				var id = cf.attr('id')
				var aid = c.attr('id')

				actions.reply(id, aid)
			},
			replies : function(){
				var id = $(this).closest('.firstcomment').attr('id')

				actions.replies(id)
			},	
			emessage : function(editor, e){


				var c = this;

				var text = this.getText();

				var id = actions.getid(editor.closest('.postbody'))

				actions.emessage(id, c)

				renders.limits(editor.closest('.postbody'), text)


			},
			message : function(){
				var v = $(this).val();

				var id = actions.getid(editor.closest('.postbody'))

				actions.links(id, v);
				actions.message(id, v)
			},
			reply : function(){

				var c = $(this).closest('.comment');
				var cf = $(this).closest('.firstcomment');

				var id = cf.attr('id')
				var aid = c.attr('id')

				actions.reply(id, aid)
			},
			tocomment : function(){
				var c = $(this).attr('comment')

				actions.tocomment(c)
			},
			metmenu : function(){
				var _el = $(this);

				var parent = _el.closest('.comment');
				var localParent = _el.closest('.commentBody')

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.app.platform.sdk.comments.find(txid, id, pid)

				var d = {
					address : self.app.user.address.value,
					caddress : self.app.platform.sdk.comments.address(txid, id, pid),
					txid : id
				};

				if (listpreview && ed.lastComment && !pid){

					comment = self.app.platform.sdk.comments.ini([ed.lastComment])[0]

					d.caddress = comment.address
				}

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						
						return template(d);

					}, function(__el){

						__el.find('.edit').on('click', function(){

							renders.edit(localParent, comment)

							_el.tooltipster('hide')	
						})

						__el.find('.block').on('click', function(){

							self.app.platform.api.actions.blocking(d.caddress, function (tx, error) {
								console.log(tx, error)
                                if (!tx) {
                                    self.app.platform.errorHandler(error, true)
                                }
								else
								{
									parent.remove()
								}

								_el.tooltipster('hide')	
                            })

							
						})

						__el.find('.remove').on('click', function(){

							dialog({
								html : self.app.localization.e('e13032'),
								success : function(){

									actions.delete(comment, function(err){

										if(!err)
										{

											var c = el.c.find('#' + comment.id);

											c.addClass('deleted')
											el.c.find('#' + comment.id + ' >div.commentPaddingWrapper .commentmessage div').html("<div>"+self.app.localization.e('e13033')+"</div>")

											c.find('.panel').remove()
											c.find('.commentimages').remove()
											c.find('.reply').remove()
										}
											
									})

								},
								btn1text : self.app.localization.e('e13034'),
								btn2text : self.app.localization.e('e13035')
							})

							_el.tooltipster('hide')	
						})

						__el.find('.socialshare').on('click', function(){

							actions.sharesocial(comment)

							_el.tooltipster('hide')	

						})

					}, {
						theme : 'zindex lighttooltip'
					})

				}, d)

				

			},


		}

		var postEvents = function(p, _p, clbk){

			var textarea = _p.el.find('.leaveComment');

			var c = _p.el.find('.postbody');

			actions.process(p.id || '0')

			textarea.emojioneArea({
				pickerPosition : 'top',
				
				search : false,
				tones : false,
				autocomplete : false,

				attributes: {
					spellcheck : true,
				},
				
				
				filters : {
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
					'emojibtn.click' : events.emessage,
					change : events.emessage,
					click : events.emessage,
					keydown : function(editor, e){
						if (e.ctrlKey && e.keyCode == 13) {

							if (c.hasClass('sending')) return

								c.addClass('sending')

							actions.post(p.id || '0', p.pid, p.aid, p.editid)

							e.preventDefault()

							return false;
						}
						// Scroll comment section to top of the screen
						actions.scrollToComment(_p.el);
					},
					keyup : function(editor, e){
						var char = String.fromCharCode(e.keyCode || e.which);
						var text = this.getText();


						if ((wordsRegExp).test(char)) {
							actions.links(text);
						}

						if (e.ctrlKey && e.keyCode == 13) {
							return
						}
						
						actions.message(p.id || '0', text)

						renders.limits(c, text)
						
					},

					focus : function() {
						// Scroll comment section to top of the screen
						actions.scrollToComment(_p.el);
					},

					onLoad : function(c, d){

						var a = this

						if(ed.init || p.init){

							_p.el.find('.emojionearea-editor').focus()

							_p.el.addClass('active')

							ed.init = false;
						}

						if (p.value) {
							this.setText(p.value)
						}

						if (p.images){

							if(p.editid && p.images.length){

								var comment = currents[p.editid]

								comment.images.v = _.clone(p.images)

								renders.images(p.editid, p)									
								
							}
						}

						// Hide the emoji button for mobiles and tablets
						if (isMobile() || isTablet())
							_p.el.find('.emojionearea-button').hide();

						if (clbk)
							clbk(this, _p.el.find('.emojionearea-editor'));

					}
				}
			});


			_p.el.find('.emojionearea-editor').on('focus', function(){
				actions.process(p.id || '0')	

				 _p.el.addClass('active')
			
			})

			_p.el.find('.emojionearea-editor').on('blur', function(){
				setTimeout(function(){
					_p.el.removeClass('active')
				}, 150)
				
			})

				

			_p.el.find('.postaction').on('click', function(){

				if(c.hasClass('sending')) return

				c.addClass('sending')

				actions.post(p.id || '0', p.pid, p.aid, p.editid)

			})

			if (p.id){
				_p.el.find('.closeEdit').on('click', function(){
					actions.closeEdit(p.id)
				})
			}

			_p.el.find('.closeAnswer').on('click', function(){
				actions.removeForm(p.id || '0')
			})
		}

		var renders = {

			images : function(id, p, clbk){

				var comment = currents[id]

				self.shell({
					name :  'images',
					turi : 'embeding',
					inner : html,
					el : p.el.find('.newcommentimages'),
					data : {
						images : _.map(comment.images.v || [], function(i, index){
							return {
								src : i,
								id : index
							}
						})
					},

				}, function(_p){

					_p.el.find('.remove').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.removeImage(id, r, p)
					})


					_p.el.find('.edit').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.editImage(id, r, p)
					})

					_p.el.find('.image').on('click', function(){

						var src = $(this).attr('i')

						if(!src) return

						var images = _.map(comment.images, function(i){

							return {
								src : i
							}
						})

						self.app.nav.api.load({
							open : true,
							id : 'imageGallery',
							inWnd : true,

							essenseData : {
								initialValue : src,
								idName : 'src',
								images : images
							}
						})
					})

					_p.el.find('.image').imagesLoaded({ background: true }, function(image) {

						if(!isMobile()){
							var elimages = _p.el.find('.imagesEmbWr')


						  	elimages.isotope({

								layoutMode: 'packery',
								itemSelector: '.imageContainer',
								packery: {
									gutter: 10
								},
								initLayout: false
							});


							elimages.on('arrangeComplete', function(){

								if (clbk)
									clbk();
			
									p.el.find('.newcommentimages').addClass('active')

							});

							elimages.isotope()
						}
						else
						{
							if (clbk)
								clbk();
			
							p.el.find('.newcommentimages').addClass('active')
						}


					});

					
				})
			},

			limits : function(el, message){

				var l = 1000 - message.length;

				el.find('.limits').removeClass('bad')

				if (l < 500){

					if(l > 0){
						el.find('.limits').addClass('active').html(l + ' ' + pluralform(l , ['Character', 'Characters']) + ' Available')
					}
					else{
						el.find('.limits').addClass('active').addClass('bad').html('You are '+ (-l) +' characters over')
					}

					

				}	

				else{
					el.find('.limits').removeClass('active')
				}

				
			},

			cpreview : function(h){
				if(!h){
					h = ed.caption
				}

				if(!el.caption) return

				el.caption.find('.captionPreview').html(h)

				bgImages(el.caption.find('.captionPreview'))
			},

			caption : function(clbk){

				if(ed.caption){
					self.shell({
						name :  'caption',
						el : el.caption,
						data : {
							ed : ed
						},

					}, function(p){

						renders.cpreview()

						caption = new Caption({
							container: el.c,
							caption: el.c.find('.captionfwrapper'),
							offset: [top, -100],
							removeSpacer : true,
							iniHeight : true,
							_in : _in
						}).init();

						p.el.find('.close .cact').on('click', function(){
							if (ed.close)
								ed.close()
						})

						p.el.find('.top .cact').on('click', function(){

							_scrollToTop(el.c.find('.list'), _in, undefined, -150)
						
						})

						p.el.find('.bottom .cact').on('click', function(){

							_scrollToBottom(el.c.find('.list'), _in, undefined, -150)

						})


						if (clbk)
							clbk();
						
					})
				}

			},

			edit : function(el, comment){

				el.addClass('editing')

				var p = {
					value : comment.message,
					images : comment.images,
					init : true,
					edit : 'edit',
					el : el.find('>div.edit'),

					pid : comment.parentid,
					aid : comment.answerid,
					id : comment.id,
					editid : comment.id
				}

				renders.post(function(area, el){

					/*var lined = comment.message.split("\n");

					var i = lined.length
					var j = lined[lined.length - 1].length

					ecaretPosition(el, i - 1, j - 1)*/

					

				}, p)
			},

			post : function(clbk, p){

				if(ed.openapi) {
					if(clbk) clbk()
					return
				}

				self.app.user.isState(function(state){
					//if(!state) return;


					if(!p) p = {};

				p.el || (p.el = el.post)

				var _preview = preview && !p.answer && !p.editid

				self.shell({
					name :  'post',
					el : p.el,

					data : {
						placeholder : p.placeholder || '',
						answer : p.answer || '',
						edit : p.edit || '',
						preview : _preview,
						mestate : mestate
					},

				}, function(_p){				

					var ini = function(_clbk){

						if(!preview) return

						preview = false;
							
						p.init = true;
						el.c.removeClass('preview')

						var __clbk = function(a, b){
							  clbk(a, b)


							if (_clbk){
								_clbk(a, b)
							}
							
						}

						postEvents(p, _p, __clbk)
					}

					_p.el.find('.embedimages').off('click').on('click', function(){

						var id = actions.getid(_p.el.find('.postbody'))

						if(state){
							actions.embedimages(id, p)
							if(!p.answer && !p.editid){

								ini()

							}	
						}
						else{
							actions.stateAction(function(){
							})
						}
					})

					if(_preview){

						_p.el.find('textarea').on('click', function(){

							$(this).blur();

							self.app.user.isState(function(state){

								if(state){
									ini()
								}
								else{
									actions.stateAction(function(){
									})
								}

							})

							

							
							

							
						})

						_p.el.find('.embedEmojiPrivew').on('click', function(){

							if(state){
								ini(function(t, a){
									t.showPicker()
								})	
							}
							else{
								actions.stateAction(function(){
								})
							}
							
							
							
						})

						return
					}

					postEvents(p, _p, clbk)

					
				})


				})

				
			},

			commentimages : function(s, clbk){
				if(!el.c) return

				var sel = el.c.find('#' + s.id)

				var _el = sel.find(".commentimages .image");
				var images = sel.find(".commentimages");

				if(images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

					return

				}

				var h = sel.height()

				_el.imagesLoaded({ background: true }, function(image) {
		

					_.each(image.images, function(img, n){

						var _img = img.img;

						var el = $(image.elements[n]).closest('.imagesWrapper');
						var ac = '';

						var _w = el.width();
						var _h = el.height()

						if(_img.width > _img.height && !isMobile()){
							ac = 'w2'

							var w = _w * (_img.width / _img.height);

							if (w > images.width()){
								w = images.width()

								h = w * ( _img.height / _img.width) 

								el.height(h);
							}

							el.width(w);
						}

						if(_img.height > _img.width || isMobile()){
							ac = 'h2'

							el.height(_w * (_img.height / _img.width))
						}

						if(ac){
							el.addClass(ac)
						}
						
					})


					var gutter = 10;

					images.isotope({

						layoutMode: 'packery',
						itemSelector: '.imagesWrapper',
						packery: {
							gutter: gutter
						},
						initLayout: false
					});

					images.on('arrangeComplete', function(){
	
						images.addClass('active')

						_el.addClass('active')

						if(ed.renderClbk) ed.renderClbk()

						if (clbk)
							clbk()

					});

					images.isotope()
					
				

				});
				
			},

			list : function(p, clbk, pid){

				if(!p) p = {};

				p.comments = _.filter(p.comments || [], function(c){
					if(!rendered[c.id]) {
						rendered[c.id] = true

						return true
					}
				})

				if (ed.commentPs){
					p.comments = _.filter(p.comments || [], function(c){
						if(c.id == ed.commentPs.commentid || c.id == ed.commentPs.parentid) return true
					})
				}

				var _in = append

				if(ed.fromtop && !p.el){

					p.comments = _.sortBy(p.comments, function(c){
						return -c.time
					})

					_in = prepend
				}
				else{

					p.comments = _.sortBy(p.comments, function(c){
						return c.time
					})

				}

				if(pid){
					currentstate.levels[pid] = pid
				}

				

				if(p.in) _in = p.in

				p.el || (p.el = el.list)

				self.shell({
					name :  'list',
					el : p.el || el.list,
					inner : p.inner || _in,
					data : {
						comments : p.comments || [],
						_class : p.class || '',
						newcomments : p.newcomments || '',

						replaceName : function(name, p){
							return '<span class="tocomment" comment="'+p.comment+'">' + name + "</span>"
						},

						replaceNameNoComment : function(name, p){
							return '<span class="tocommentno">' + name + "</span>"
						},
						mestate : mestate
					},

					additionalActions : function(){
						if (ed && ed.additionalActions)
							ed.additionalActions()
					}

				}, function(_p){

					if (el.list){
						el.list.find('.reply').off('click').on('click', events.replyandreplies);
						el.list.find('.replies').off('click').on('click', events.replies);
						el.list.find('.panel').off('click').on('click', events.metmenu);
						el.list.find('.tocomment').off('click').on('click', events.tocomment)


						el.list.find('.imageCommentOpen').off('click').on('click', events.openGallery)
					
						setTimeout(function(){
							if(el.list)
								el.list.find('.newcomments').removeClass('newcomments')
						}, 600)
						
						bgImages(el.list)

						lazyEach({
							array : p.comments,

							action : function(_p){
								renders.commentimages(_p.item, _p.success)
							}
						})
					}
					

					if(ed.renderClbk) ed.renderClbk()

					if (clbk)
						clbk();
					
				})
			}
		}

		var initEvents = function(){

			/*self.app.platform.ws.messages['newblocks'].clbks['comments'] =
			self.app.platform.ws.messages['new block'].clbks['comments'] = function(){

				load.level(null, function(comments){
					var p = {}
					p.comments = self.app.platform.sdk.comments.storage[txid]['0']
					p.class = "firstcomment"

					renders.list(p, function(){
					})	
				})

			}*/

				
			el.c.find('.showall').on('click', function(){

				actions.showall()

				
			})

			self.app.platform.sdk.comments.sendclbks[eid] = clbks.post
			self.app.platform.sdk.comments.upvoteClbks[eid] = clbks.upvote

			self.app.platform.ws.messages.comment.clbks[eid] = function(data){


				if (data.posttxid == txid){

					
					var p = {};
						p.comments = [data.comment]

					if (data.parentid) {

						var par = el.c.find('#' + data.parentid);
							p.el = par.find('.answers');


						par.find('.repliescount').html(Number(par.find('.repliescount').html() || "0") + 1)
						par.find('.replies').removeClass('hidden')

						if(!par.hasClass('showedreplies')){

							return

						}

					}
					else
					{	
						p.el = el.c.find(".list")
						p.class = 'firstcomment'
					}

					renders.list(p)
				}
			
			}

			self.app.platform.ws.messages.cScore.clbks[eid] = function(data){


				if (data.comment.txid == txid){

					clbks.upvote(null, data.comment, data.upvoteVal || data.value, data.addrFrom)
				}
			
			}


			el.c.on('click', '.upvoteComment', events.upvoteComment)
		}

		var reloadCurrents = function(clbk){

			var lc = function(){
				var lvls = _.map(currentstate.levels, function(id){
					return id
				})
	
				if(lvls.length){
	
					lazyEach({
						array : lvls,
						action : function(p){
	
							var id = p.item;
	
							load.level(id, function(comments){
								p.success()
							})
						},
	
						all : {
							success : function(){
								if(clbk) clbk()
							}
						}
					})
	
				}
				else{
					if(clbk) clbk()
				}
			}

			if (preview && !showedall){
				lc()
			}
			else{
				load.level(null, function(){
					lc()
				})	
			}

			
		}

		var makeCurrents = function(clbk){

			currents = {};
			rendered = {};

			areas = {};

			var f = make

			if (preview && !showedall){
				f = makePreview
			}	
		
			f(function(){

				var lvls = _.map(currentstate.levels, function(id){
					return id
				})

				if(lvls.length){

					lazyEach({
						array : lvls,
						action : function(p){
	
							var id = p.item;
	
							actions.replies(id, true, p.success, {
								in : html
							})
						},
	
						all : {
							success : function(){
								if(clbk) clbk()
							}
						}
					})

				}
				else{
					if(clbk) clbk()
				}

				


			})
		}

		var makePreview = function(clbk){	

			var p = {};

			renders.post(function(area){
				areas["0"] = area
			})

			load.preview(function(c){

				p.comments = c
				p.class = "firstcomment"

				actions.showhideLabel()

				el.list.html('')

				renders.list(p, function(){
					
					if (clbk)
						clbk()

				})

			})

				
		}

		var make = function(clbk){

			var p = {};			

			load.level(null, function(comments){

				p.comments = self.app.platform.sdk.comments.storage[txid]['0']
				p.class = "firstcomment"

				actions.showhideLabel()	

				if (el.list)
					el.list.html('')

				renders.list(p, function(){

					el.c.find('.loaderWrapper').addClass('hidden')

					renders.post(function(area){
						areas["0"] = area

						if(ed.reply){
							actions.fastreply(ed.reply)
						}
						else
						{
							var ps = ed.commentPs || parameters();
							var reply = {};

							if (ps.commentid){
								reply.answerid = ps.commentid;
								reply.parentid = ps.parentid || ""
								reply.noaction = true

								actions.fastreply(reply)
							}

						}
					})

					if (clbk)
						clbk()
				})

			})

			
		}

		var load = {
			preview : function(clbk){
				var comments = [];

				if (ed.lastComment){
					comments = self.app.platform.sdk.comments.ini([ed.lastComment])
				}

				self.sdk.comments.users(comments, function(){

					if (clbk)
						clbk(comments)

				})
			},	
			level : function(pid, clbk){

				self.app.platform.sdk.comments.get(txid, pid || "", function(comments, e){

					if (clbk)
						clbk(comments, e)

				})

			}
		}

		var state = {
			save : function(){

				return

				if (currents['0']){
					self.app.settings.set(self.map.id, txid, currents['0'].export());
				}

				else
				{
					self.app.settings.delete(self.map.id, txid, '');
				}

				
			},
			load : function(){
				var last = self.app.settings.get(self.map.id, txid)

				if (last)
					currents['0'].import(last)
			}
		}

		

		return {
			primary : primary,

			getdata : function(clbk, p){
				eid = p.settings.eid

				rendered = {}

				currents = {}

				currentstate = {
					reply : null,
					levels : {}
				}

				ed = p.settings.essenseData || {}

				preview = ed.preview || false;
				listpreview = preview;
				showedall = false;

				txid = ed.txid || null

				currents['0'] = new Comment(txid);

				if (txid){
					//state.load()

					var data = {};

						data.ed = ed;

					self.app.platform.sdk.ustate.me(function(_mestate){

						mestate = _mestate

						clbk(data); 

					})
				}

			},

			authclbk : function(){
				
				if(el && el.c){

					authblock = true

					self.app.platform.sdk.ustate.me(function(_mestate){

						mestate = _mestate

						reloadCurrents(function(){

							actions.myscores()

							authblock = false;
							

						})

						renders.post(function(area){
							areas["0"] = area
						})

					})

				
				}
			},

			destroy : function(){

				delete self.app.platform.sdk.comments.sendclbks[eid]
				delete self.app.platform.ws.messages.comment.clbks[eid]
				
				delete self.app.platform.sdk.comments.upvoteClbks[eid]
				delete self.app.platform.ws.messages.cScore.clbks[eid]

				authblock = false

				if (external) 
					external.destroy()

				if (caption)
					caption.destroy()

				el = {};
			},
			
			init : function(p){

				//state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.post = el.c.find('.post')
				el.list = el.c.find('.list')
				el.caption = el.c.find('.captionCnt')
				el.showall = el.c.find('.showall')

				_in = el.c.closest('.wndcontent');

				if(!_in.length) {
					_in = null
					top = 65
				}
				else
				{
					top = 0
				}

				if(preview){

					el.c.find('.loaderWrapper').addClass('hidden')
					el.c.addClass('preview')
					el.c.addClass('listpreview')

					makePreview()
				}
				else{
					make();

					
					if (ed.showall){
						actions.showall()
					}
				}

				initEvents();

				p.clbk(null, p);
			},

			freeze : function(){

				if(caption) caption.destroy()
				
			},

			hideall : function(preview){

				showedall = false;

				if(typeof preview != 'undefined')
					listpreview = preview || false;

				if (listpreview){
					el.c.addClass('listpreview')

					if (caption)
						caption.destroy()

					caption = null
				}
				else
				{
					el.c.removeClass('listpreview')
				}

				el.c.removeClass('showedall')

				actions.hideallReplies()

				actions.showhideLabel()

			},
			changein : function(cur, _top){
				if(!cur){
					_in = el.c.closest('.wndcontent');

					if(!_in.length) {
						_in = null
						top = 65
					}
					else
					{
						top = 0
					}

					if(caption) {
						if(_in)
							caption.addscroll = true
						else
							caption.addscroll = false

						caption.setOffset([top, 0])
						caption.setIn(_in)
					}
				}
				else
				{
					_in = cur;
					top = _top;

					if(caption) {
						caption.addscroll = true
						caption.setOffset([top, 0])
						caption.setIn(_in)
					}
				}
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = comments;
}
else{

	app.modules.comments = {};
	app.modules.comments.module = comments;

}