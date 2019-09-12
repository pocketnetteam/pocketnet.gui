var comments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, txid, ed, currents = {}, caption, _in, top, eid, preview = false, listpreview = false, showedall = false;

		var errors = {
			content : "message empty",
			share : "hasn't share",
			messagelength : "Comments have 1000 character limit per comment",
			money : "hasn't money",
			network : "network error",
			images : self.app.localization.e('maximages'),
		}

		var mestate;

		var rendered = {}

		var areas = {};

		var external = null;


		var wordsRegExp = /[,.!?;:() \n\r]/g

		var clbks = {
			post : function(err, alias, _txid, pid, aid, editid, id){

				if(_txid != txid) return

				el.c.find('.sending').removeClass('sending')

				if(err){
					return
				}

				state.save()

				el.c.find('.emojionearea-editor').blur();

				el.c.find('.att').html('');

				var p = {
					comments : [alias]
				}

				if(listpreview){
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

						alias.timeupd = alias.timeupd.addMinutes(1)

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

				renders.list(p)

				if (!editid && ed.send){
					ed.send(alias)
				}

				if(!editid){

					if(ed.comments) ed.comments++

					actions.showhideLabel()
				}
			}
		}

		var actions = {
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
						current.uploadImages(self.app, function(){

							actions.send(current, function(err, alias){
								
							}, pid, aid, editid, id)
						})
							
					}
				}

				
			},
			send : function(comment, clbk, pid, aid, editid, id){	

				self.app.platform.sdk.comments.send(txid, comment, pid, aid, function(err, alias){
					if(el.c)
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

				var _el = el.c.find('#' + id);
				var answer = _el.find('.answer');

			
				renders.post(function(area, el){

					var pid = '0'

					if (aid != id) pid = id

					var address = self.app.platform.sdk.comments.address(txid, aid, pid) || deep(ed, 'lastComment.address')

					var str = '@' + (deep(self.app, 'platform.sdk.usersl.storage.'+address+'.name') || address) + ',  '

					if(address == self.app.platform.sdk.address.pnet().address) str = ''

					area.setText(str)

					areas[id] = area

					el.focus();
				
					/*el.on('blur', function(){
						if(!area.___inited){
							actions.removeForm(id)
						}
					})*/

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
			},

			hideallReplies : function(){
				_.each(deep(self, 'app.platform.sdk.comments.storage.'+txid + '.0'), function(r, id){

					actions.replies(id, false)

				})
				
				if (ed.lastComment)
					actions.replies(ed.lastComment.id, false)
				
			},

			replies : function(id, show, clbk){

				if(id == '0'){

					if (clbk)
						clbk()

					return
				}

				var p = {};

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

						})

					})
				}
				else
				{

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

				actions.removeForm(id)
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

				if (listpreview){

					listpreview = false;

					el.c.removeClass('listpreview')

					el.c.find('.loaderWrapper').removeClass('hidden')

					renders.caption()

					load.level(null, function(comments){

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

					if(listpreview){
						

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

				console.log(comment, initialValue)


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
				
			}
		}

		var events = {
			openGallery : function(){

				var _el = $(this)

				var parent = _el.closest('.comment');

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.app.platform.sdk.comments.find(txid, id, pid)

				if (listpreview && ed.lastComment){
					comment = self.app.platform.sdk.comments.ini([ed.lastComment])[0]

					console.log("SADSADSADSADSAD", ed.lastComment)
				}

				actions.openGallery(comment, _el.attr('i'))
			},
			replyandreplies : function(){
				var id = $(this).closest('.firstcomment').attr('id')

				actions.replies(id, true)

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
		
			/*emessagekeyup : function(editor, e){

			},*/
			emessage : function(editor, e){


				var c = this;

				var id = actions.getid(editor.closest('.postbody'))

				actions.emessage(id, c)
			},

			/*embedimages : function(){
				var id = actions.getid($(this).closest('.postbody'))

				actions.embedimages(id)
			},*/

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
					caddress : self.app.platform.sdk.comments.address(txid, id, pid)
				};

				if (listpreview && ed.lastComment){

					comment = self.app.platform.sdk.comments.ini([ed.lastComment])[0]

					d.caddress = comment.address
				}

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						
						return template(d);

					}, function(el){

						el.find('.edit').on('click', function(){

							renders.edit(localParent, comment)

							_el.tooltipster('hide')	
						})

						el.find('.remove').on('click', function(){

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

			    	events : {
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

				var l = 1000 - encodeURIComponent(message).length;

				if (l < 500){

					if(l > 0){
						el.find('.limits').addClass('active').html(l + ' ' + pluralform(l , ['Character', 'Characters']) + ' Available')
					}
					else{
						el.find('.limits').addClass('active').html('You have reached comment length limit')
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
							if(ed.totop){
								_scrollToTop(ed.totop, _in, 0, -65)
							}
						})

						p.el.find('.bottom .cact').on('click', function(){
							var _el = el.c.find('.post .emojionearea-editor');

							_scrollTo(_el, _in)

							_el.focus()
						})


						if (clbk)
							clbk();
						
					})
				}

			},
			edit : function(el, comment){

				el.addClass('editing')

				console.log("EEEE", el)

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

					

					var ini = function(){

						if(!preview) return

						preview = false;
							
						p.init = true;
						el.c.removeClass('preview')

						console.log(p, _p)

						postEvents(p, _p, clbk)
					}

					_p.el.find('.embedimages').off('click').on('click', function(){
						var id = actions.getid(_p.el.find('.postbody'))

						actions.embedimages(id, p)

						if(!p.answer && !p.editid)
							ini()
					})

					if(_preview){

						_p.el.find('textarea').on('click', function(){

							$(this).blur();

							ini()

							
						})

						return
					}

					postEvents(p, _p, clbk)

					
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

						if (clbk)
							clbk()

					});

					images.isotope()
					
				

				});
				
			},

			list : function(p, clbk){

				if(!p) p = {};

				p.comments = _.filter(p.comments || [], function(c){
					if(!rendered[c.id]) {
						rendered[c.id] = true

						return true
					}
				})

				

				if(ed.fromtop){
					p.comments = _.sortBy(p.comments, function(c){
						return -c.time
					})
				}
				else{
					p.comments = _.sortBy(p.comments, function(c){
						return c.time
					})
				}

				p.el || (p.el = el.list)

				self.shell({
					name :  'list',
					el : p.el || el.list,
					inner : p.inner || append,
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

				}, function(_p){

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

				

					if (clbk)
						clbk();
					
				})
			}
		}

		var makePreview = function(){

			el.c.find('.loaderWrapper').addClass('hidden')

			el.c.addClass('preview')
			el.c.addClass('listpreview')

			var p = {};

			renders.post(function(area){
				areas["0"] = area
			})

			load.preview(function(c){

				p.comments = c
				p.class = "firstcomment"

				actions.showhideLabel()

				renders.list(p, function(){
					
				})

			})

				
		}

		var make = function(){

			var p = {};			

			load.level(null, function(comments){

				p.comments = self.app.platform.sdk.comments.storage[txid]['0']
				p.class = "firstcomment"

				actions.showhideLabel()
				
				renders.caption()

				renders.list(p, function(){

					el.c.find('.loaderWrapper').addClass('hidden')

					renders.post(function(area){
						areas["0"] = area

						actions.fastreply(ed.reply)
					})
				})

			})

			if (ed.showall){
				actions.showall()
			}
			
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

				self.app.platform.sdk.comments.get(txid, pid || "", function(comments){

					if (clbk)
						clbk(comments)

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

		var initEvents = function(){
				
			el.c.find('.showall').on('click', function(){

				actions.showall()

				
			})

			self.app.platform.sdk.comments.sendclbks[eid] = clbks.post

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
		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				eid = p.settings.eid

				rendered = {}

				currents = {}

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

			destroy : function(){

				delete self.app.platform.sdk.comments.sendclbks[eid]
				delete self.app.platform.ws.messages.comment.clbks[eid]

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
					makePreview()
				}
				else{
					make();
				}

				initEvents();

				p.clbk(null, p);
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