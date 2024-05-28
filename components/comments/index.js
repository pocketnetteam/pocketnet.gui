
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}

var comments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var primary = false;

		var el = {}, txid, ed, currents = {}, caption, _in, top, eid, preview = false, listpreview = false, showedall = false, receiver;
		var share = null
		var authblock = false, setFocus = false;

		var paginationcount = 25;

		var errors = {
			content : self.app.localization.e('e13029'),
			messagelength : self.app.localization.e('e13030'),
			images : self.app.localization.e('maximages'),
		}

		var mestate;
		var rendered = {};
		var areas = {};
		var external = null;
		var bannerComment = null;
		var currentstate = {};
		var wordsRegExp = /[,.!?;:() \n\r]/g

		var sortby = self.sdk.usersettings.meta.commentsOrder.value || 'interesting';

		

		var clbks = {
			upvote : function(err, comment, value, address, temp){

				if(!comment) return

				if (comment.postid != txid) return

				var _el = el.c.find('#' + comment.id);

				var d_el = _el.find(">div.commentPaddingWrapper>div.commentWrapper>div.commentBody>div.cbodyWrapper");

				if (address == self.app.user.address.value){

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
					scoreUp : (comment.scoreUp || 0),
					scoreDown : (comment.scoreDown || 0)
				}

				d_el.find('.scoreUp .commentScore').html(cs.scoreUp ? compressedNumber(cs.scoreUp, 1) : '')
				d_el.find('.scoreDown .commentScore').html(cs.scoreDown ? compressedNumber(cs.scoreDown, 1) : '')
			},

			post : function(comment, optype){

				if(txid){
					share = self.psdk.share.get(txid)
				}
				

				actions.showhideLabel()

				var p = {
					//newcomments : 'newcomments'
				}

				if(optype == 'comment' || optype == 'commentEdit' || optype == 'commentDelete'){

					var _el = el.c.find('#' + comment.id + ',#' + comment.actionId);

					if(!comment.parentid){
						p.class = "firstcomment"
					}

					if((!showedall && !comment.parentid) || optype == 'commentEdit' || optype == 'commentDelete' || _el.length){

						p.comments = [comment]

						if(_el.length){
							p.replace = true
							p.el = _el

							if (comment.parentid){
								actions.repliesCount(comment.parentid)
							}
						}
						else{
							if (optype == 'commentEdit' || optype == 'commentDelete'){
								return
							}
						}

						/*if ((optype == 'commentEdit' || optype == 'commentDelete') && comment.rejected){
							return
						}*/

						if(setFocus || actions.findCurrentText()) return

						renders.list(p)

					}
					else{

						if (comment.parentid){

							actions.repliesCount(comment.parentid)

							var parent = el.c.find("#" + comment.parentid)

							p.el = parent.find('.answers')

						}
						
							
						load.level(comment.parentid, function(comments){

							p.comments = comments
							p.add = comment.id

							if(setFocus || actions.findCurrentText()) return
	
							renders.list(p, null, comment.parentid)
	
						})
					}

					return
				}

				
			},

			commentDelete : function(commentDelete){

			}
		}

		var actions = {

			findCurrentText : function(){
				return _.find(currents, (c) => {
					return c.message.v
				})
			},

			removeSending : function(wrapper){
				setTimeout(() => {
					wrapper.removeClass('sending')
				}, 400)
			},

			repliesCount: function(parentid){
				var parent = el.c.find("#" + parentid)
				var panel = parent.find('.commentpanel[comment="'+parentid+'"]')

				var parentcomment = self.psdk.comment.get(parentid) || {}

				//p.el = parent.find('.answers')

				panel.find('.repliescount').html(parentcomment.children || 0)

				if (parentcomment.children){
					panel.find('.replies').removeClass('hidden')
				}
				else{
					panel.find('.replies').addClass('hidden')

					//actions.replies(id, false);
				}
			},

			removeDonate : function(id, p){

				var comment = currents[id]
			
				comment.donate.remove()
			
				renders.donate(id, p);
			
			},
			
			embeddonate : function(id, p){
			
				id || (id = '0')
			
				actions.process(id)
			
				if (areas[id])
					areas[id].___inited = true
			
				var storage = currents[id].export(true)
			
				var sender = self.app.user.address.value;
			
				if (sender === receiver){
			
					sitemessage(self.app.localization.e('donateself'));
			
				} else {

					var prevdonatevalue = deep(storage, 'donate.0.amount') || 0

					self.nav.api.load({
						open : true,
						id : 'donate',
						inWnd : true,
			
						essenseData : {
							type : 'donate',
							sender: sender, 
							receiver: receiver,
							value : prevdonatevalue,
							storage,
							clbk  : function(value){

								value = Number(value);
	
								if(!value){
									currents[id].donate.remove();
									renders.donate(id, p)
									return
								}

								if (value < 0.1){
									sitemessage(self.app.localization.e('minPkoin', 0.1))
									return;
								}
	
								if(!_.isArray(value)) 
									value = [value]
	
								currents[id].donate.remove();
	
								currents[id].donate.set({
									address: receiver,
									amount: Number(value)
								})
	
								/*if(!result && errors[type]){
	
									sitemessage(errors[type])
	
								}*/

								if(!window.cordova){
									new Audio('sounds/donate.mp3').play();
								}

								renders.donate(id, p)

								
							}
						},
			
						clbk : function(s, p){
							external = p
						}
					})
			
				}
			
			}, 

			
			pkoin : function(id, format){

					
					actions.stateAction(function(){

						var userinfo = self.psdk.userInfo.getShortForm(share.address)

						self.nav.api.load({
							open : true,
							href : 'pkoin',
							history : true,
							inWnd : true,
		
							essenseData : {
								userinfo: userinfo,
								id : id,
								format: format
							}
						})
		
	
					}, share.txid)	


			},

			showprofile : function(address){

				if (self.app.mobileview){
					self.nav.api.load({
						open : true,
						id : 'channel',
						inWnd : true,
						history : true,
	
						essenseData : {
							id : address,
							openprofilebutton : true
						}
					})
				}
			},
			lightarea : function(id, c){

				var comment = currents[id]

				
				
				if(comment && (comment.message.v || comment.images.v.length))
					c.addClass('hastext')
				else
					c.removeClass('hastext')
			},

			checkBanned : function(p){

				if(!self.app.user.address.value){
					return Promise.resolve(null)
				}

				var cmtsTo = _.filter([self.psdk.comment.get(p.pid), self.psdk.comment.get(p.aid)], (c) => c)
				var authors = [share.address]

				_.each(cmtsTo, (c) => {
					authors.push(c.address)
				})


				return self.psdk.userInfo.load(authors).then(() => {

					var block = _.find(authors, (address) => {

						var user = self.psdk.userInfo.get(address)

						return user && user.relation(self.app.user.address.value, 'blocking')
					})

					if(block) return Promise.resolve(self.psdk.userInfo.get(block))
				})
			},

			complain : function(comment){
				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,
					essenseData : {
						item : 'post',
						obj : comment,

						success : function(){

						}
					},

					clbk : function(){

					}
				})
			},
			myscores : function(){
				_.each(rendered, function(c, id){
					var comment = self.psdk.comment.get(id)
					
					//deep(self.app.platform.sdk, 'comments.storage.all.' + id)

					if (comment){
						clbks.upvote(null, comment, Number(comment.myScore), self.app.user.address.value)
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

				var f = m;

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

				//var elimages = p.el.find('.imagesEmbWr')

				//elimages.isotope()

				actions.lightarea(id, p.el.find('.postbody'))



			},

			embedimages : function(id, p){
				id || (id = '0')

				actions.process(id)

				if (areas[id])
					areas[id].___inited = true

				var storage = currents[id].export(true)

				var added = function(value){

					var result = true;

					if(!_.isArray(value)) value = [value]

					_.each(value, function(v, i){

						result = currents[id].images.set(v)

					})

					if(!result && errors[type]){

						sitemessage(errors[type])

					}		
					
					renders.images(id, p)

					actions.lightarea(id, p.el.find('.postbody'))

				}

				if(self.app.mobile.supportimagegallery()){

					app.platform.ui.uploadImage({
						multiple : true,
						
						onSuccess : function(imgs){

							Promise.all(_.map(imgs, (img) => {
								return resizePromise(img, 1080, 1080)
							})).then(imgs => {
								_.each(imgs, added)
							})
							
						}
					})


					return
				}
	
				self.nav.api.load({
					open : true,
					id : 'embeding',
					inWnd : true,
					donate: true,

					essenseData : {
						type : 'images',
						storage : storage,
						on : {
						
							added,

							destroy(){
								external = null
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
				delete currents[id]

				el.c.find("#" + id + ' .answer').html('')
				el.c.find("#" + id + ' .edit').html('')
			},
			post : function(id, pid, aid, editid, wrapper){

				id || (id = '0')

				var current = currents[id];

				if (current){
					var e = current.validation();

					if (e){
						actions.removeSending(wrapper)
						sitemessage(errors[e])

					}
					else
					{
						var post = self.psdk.share.get(txid)

						var address = self.app.user.address.value

						if (self.app.platform.sdk.user.reputationBlockedMe()){

							sitemessage(self.app.localization.e('lockedaccount'))
		
							actions.removeSending(wrapper)
		
							return
						}

						if (post.address && address && post.address != address && self.app.platform.sdk.user.scamcriteria()){

							actions.removeSending(wrapper)
	
							new dialog({
								html : self.app.localization.e('ratings123'),
								btn1text :  self.app.localization.e('daccept'),
								btn2text : self.app.localization.e('ucancel'),
			
								class : 'zindex one',
			
								success : function(){
								}
							})
	
							return
						}
						

						if(current.loading) return;
						
						//current.loading = true;

						current.answerid = aid;
                		current.parentid = pid;

						if (editid) {
							current.id = editid
						}

						var fxc = currents[id]

						delete currents[id]

						self.app.platform.sdk.comments.send(current, function(error, alias){

							if(!editid && ed.send){
								ed.send(alias, alias)
							}

							if(!error){

								

								successCheck()
							}
							else{

								delete currents[id]

								if(error == 'actions_noinputs_wait') error = 'actions_noinputs_wait_comment'

								self.app.platform.errorHandler(error, true)
							}

							state.save()

							window.rifticker.add(() => {
								wrapper.find('.emojionearea-editor').blur();
								actions.removeSending(wrapper)

								if(!error){
	
									wrapper.find('.newcommentimages').html('');
									wrapper.find('.newcommentdonate').html('');

									renders.donate(id, {
										el : wrapper
									})

									window.rifticker.add(() => {

										if (areas[id]) {
											areas[id].setText('');

											if (areas[id].editor.closest('.answer').length){

												
												areas[id].editor.closest('.answer').html('')
												areas[id].destroy()
												
												delete areas[id]
												
											}
										}
									})
								}
							})

						}, pid, aid, editid, id)
							
					}
				}
				else{
					actions.removeSending(wrapper)

					sitemessage(errors['content'])
				}

				
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


				if (currents[id])
					currents[id].message.set(findAndReplaceLinkClearReverse(v.replace('⠀', ' ')))

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

						if(!reply.noaction){
							actions.reply(reply.parentid || reply.answerid, reply.answerid)
						}

						else
						{

							actions.tocomment(reply.answerid || reply.parentid)

							var cel = el.c.find("#" + (reply.answerid || reply.parentid))

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

						var comment = self.psdk.comment.get(aid || id)

						var address = comment.address

						var name = self.psdk.userInfo.getShortForm(address).name


						var str = '@' + name + ',⠀'

						if(address == self.app.user.address.value || !name) str = ''

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
				/*_.each(deep(self, 'app.platform.sdk.comments.storage.'+txid + '.0'), function(r, id){

					actions.replies(id, false)

				})
				
				if (ed.lastComment)
					actions.replies(ed.lastComment.id, false)*/
				
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
						
					}
				}

				if (show){

					window.rifticker.add(() => {
						c.addClass('showedreplies')
						c.find('.repliesloaderWrapper').removeClass('hidden')
					})

					setTimeout(() => {

						load.level(id, function(comments){

							p.comments = comments

							if(!comments.length){
								c.removeClass('showedreplies')
								delete currentstate.levels[id]

								if (clbk)
									clbk()
							}
							else{

								renders.list(p, function(){

									window.rifticker.add(() => {
										c.find('.repliesloaderWrapper').addClass('hidden')
									})
	
									if(!caption)
										renders.caption()
	
									if (clbk)
										clbk()
									
	
								}, id)

							}

							

						

						}, currentstate.levels[id] ? _.filter(_.map(currentstate.levels[id].comments, (commentid) => {
							return self.psdk.comment.get(commentid)
						}), (c) => {return c}) : null)

					}, 300)

				}
				else
				{

					delete currentstate.levels[id]

					actions.removeForm(id)

					window.rifticker.add(() => {
						c.removeClass('showedreplies')
						p.el.html('')
					})

					if (clbk)
						clbk()

					
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
				
				if(ed.openapi) return

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

				self.app.platform.sdk.comments.delete(ct, function(err, alias){

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
					//_el.html('')

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
			hideall : function(){

				listpreview = true;
				showedall = false;
				ed.showall = false;

				window.rifticker.add(() => {

					el.c.removeClass('showedall')	
					el.c.addClass('listpreview')
					actions.showhideLabel()

				})

				makePreview(() => {
					
				})
			},
			showall : function(){

				showedall = true;
				
				ed.showall = true

				if (listpreview){

					window.rifticker.add(() => {
						el.preloader.removeClass('hidden')
					})
				
					load.level(null, function(comments, e){

						if(e){
							self.app.platform.errorHandler(e, true)

							window.rifticker.add(() => {
								el.preloader.addClass('hidden')

							})

							showedall = false;
							
							actions.showhideLabel()

							return
						}

						listpreview = false;

						rendered = {}

						var p = {}

						p.comments = comments
						p.class = "firstcomment"
						p.inner = html

						renders.list(p, function(){
							window.rifticker.add(() => {
								actions.showhideLabel()	
								el.c.addClass('showedall')	
								el.c.removeClass('listpreview')
								el.preloader.addClass('hidden')
							})
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

				if(!share) return

				var counts = share.comments || 0

				var lastComment = self.psdk.comment.get(share.lastComment) || {}
				
				var lastchildren = lastComment.children || 0
				
				//deep(share, 'lastComment.children') || 0;

				var needtoshow = false

				if (counts - lastchildren > 1){
					actions.hiddenCounts(counts - lastchildren - 1)

					needtoshow = true
				}

				window.rifticker.add(() => {
					if (showedall){
						if(!el.showall.hasClass('hidden'))
							el.showall.addClass('hidden')
					}
					else{
						if (needtoshow){
							if (el.showall.hasClass('hidden'))
								el.showall.removeClass('hidden')
						}
						else{
							if(!el.showall.hasClass('hidden'))
								el.showall.addClass('hidden')
						}
					}
				})

				

				
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

					var comment = self.psdk.comment.get(id) 
					

					if(!comment) return

					if(comment.relay || comment.temp) return
					
					if (comment.address == self.app.user.address.value){
						return
					}

					if (self.app.platform.sdk.user.reputationBlockedMe()){
						sitemessage(self.app.localization.e('lockedaccount'))
	
						return
					}

					if (value < 0 && self.app.platform.sdk.user.scamcriteria()){

						new dialog({
							html : self.app.localization.e('ratings123'),
							btn1text :  self.app.localization.e('daccept'),
							btn2text : self.app.localization.e('ucancel'),
		
							class : 'zindex one',
		
							success : function(){
							}
						})

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

				if (ed.openapi) return


				if (el && el.length > 0 && isMobile()) {

					//if(el.closest('.fullScreenVideo').length > 0) return

					self.app.blockscroll = true

					_scrollTo(el, _in, 0)

					setTimeout(() => {
						self.app.blockscroll = false
					}, 200)
				}
			}
		}

		var sortParameter = function(){

			
			var ps = new Parameter({

				type : "VALUES",
				name : "Contents",
				id : 'contents',
				possibleValues : ['interesting', 'timeup', 'time'], 
				possibleValuesLabels : [self.app.localization.e('comments_interesting'),self.app.localization.e('comments_timeup'),self.app.localization.e('comments_time')],
				defaultValue : sortby
			
			})

			ps.value = sortby

			return ps
		}

		var commentPoint = function(comment){
			var p = 0

			var my = comment.address == self.app.user.address.value

			p += comment.scoreUp * 250
			p += comment.children * (my ? 4500 : 450)

			if(comment.scoreUp > comment.scoreDown) p += comment.scoreDown * 50
			else p -= comment.scoreDown * 1000

			p += Math.min(comment.message.length, 200) * 3
			p += comment.amount * 1000

			p += Math.max(comment.reputation, 100) * 10 + comment.reputation / 20

			if(comment.deleted) p = p / 1300

			if(deep(self.app, 'platform.real.'+ comment.address)) p = p * 1000
			else
			if(my) p = p * 20


			var me = self.psdk.userInfo.getmy()

			if (!my && me){

				if (me.relation(comment.address, 'blocking') )
					p = p * 0

			}

			var post = self.psdk.share.get(txid)

			if (post && post.address == comment.address) p = p * 50

			if(!my){

				var activities = self.app.platform.sdk.activity.has('users', comment.address)

				if (activities.point){
					p = p + activities.point * 10
				}
			}

			return p

		}

		var sorting = function(comments, pid){

			if(!comments.length) return comments

			try {
				if(pid || sortby == 'time'){

					return _.sortBy(comments, function(c){
						return c.time
					})
	
				}

				if(sortby == 'timeup'){

					return _.sortBy(comments, function(c){
						return - (c.time || new Date()) / 1000
					})
	
				}

				try{

				
		
				var oldest = (_.min(comments, function(c){return c.time}).time).getTime() / 1000
				var newest = (_.max(comments, function(c){return c.time}).time).getTime() / 1000

				}catch(e){
					console.error(e)
				}

				var cbyauthors = group(comments, function(c){ return c.address })
	
				comments = _.sortBy(comments, function(c){

					if(c.temp || c.relay) return 10000000000

					/*if (self.app.platform.sdk.comments.blocked[c.address]) {
						return 0
					}*/


					var ms = (c.time || new Date()) / 1000

					var timec = ((ms - oldest) / (newest - oldest)) 

					var count = cbyauthors[c.address].length

					return - (commentPoint(c) + (timec * 3000) ) / count
				}) 

				return comments
			}

			catch(e){
				console.error(e)

				return []
			}

			

		}

		var events = {

			pkoin : function(){

				var shareId = $(this).closest('.share').attr('id') || txid;

				actions.pkoin(shareId, 'pkoinComment')

			},

			showprofile : function(){
				var address = $(this).attr('profile')

				actions.showprofile(address)
			},

			upvoteComment : function(){

				if(ed.cantsend) return

				if($(this).closest('.comment').hasClass('rated')) return

				var value = 0;

				if($(this).attr('score') == 'scoreUp') value = 1
				else 	value = -1;

				var id = $(this).closest('.comment').attr('id');
				var pid = $(this).closest('.comment').attr('pid');
				
				actions.upvoteComment(value, id, pid)
			},

			showHiddenComment: function(){

				var _el = $(this)

				var parent = _el.closest('.comment');

				parent.removeClass('hiddenComment')
				parent.removeClass('hiddenBlockedUserComment')
				
				
			},

			showBlockedUserComment: function(){

				var _el = $(this)

				var parent = _el.closest('.comment');

				parent.removeClass('hiddenBlockedUserComment')
			},

			openGallery : function(){

				var _el = $(this)

				var parent = _el.closest('.comment');

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.psdk.comment.get(id) //self.app.platform.sdk.comments.find(txid, id, pid)

				/*if (!comment && listpreview && ed.lastComment){
					comment = ed.lastComment
					
					//self.app.platform.sdk.comments.ini([ed.lastComment])[0]
				}*/


				actions.openGallery(comment, _el.attr('i'))
			},
			replyandreplies : function(){
				var id = $(this).closest('.firstcomment').attr('id')
				var c = $(this).closest('.comment');
				var cf = $(this).closest('.firstcomment');

				var _id = cf.attr('id')
				var _aid = c.attr('id')

				var comment = self.psdk.comment.get(id)

				if (comment && !comment.children){

					
					actions.reply(_id, _aid)
				}
				else{
					actions.replies(id, true, function() {
						// Scroll comment section to top of the screen
						actions.scrollToComment(el.list.find('.answer.active'));
						actions.reply(_id, _aid)
					});
				}

				

				
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

				var post = self.psdk.share.get(txid);

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.psdk.comment.get(id)/// self.app.platform.sdk.comments.find(txid, id, pid)

				var d = {
					address : self.app.user.address.value,
					caddress : comment.address,
					txid : id,
					paddress: post.address,
					comment
				};

				/*if (listpreview && ed.lastComment && !pid){
					comment = ed.lastComment
					d.caddress = comment.address
				}*/

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						
						return template(d);

					}, function(__el, f, close){

						__el.find('.complain').on('click', function(){
							self.app.mobile.vibration.small()
							actions.complain(comment)

							close()

						})

						__el.find('.edit').on('click', function(){

							renders.edit(localParent, comment)

							close()
						})

						__el.find('.block').on('click', function(){


							new dialog({
                                class : 'zindex',
                                html : self.app.localization.e('blockUserQ'),
                                btn1text : self.app.localization.e('dyes'),
                                btn2text : self.app.localization.e('dno'),
                                success : function(){

                                    self.app.platform.api.actions.blocking(d.caddress, function (tx, error) {
										if (!tx) {
											self.app.platform.errorHandler(error, true)
										}
										else
										{
											parent.addClass('hiddenBlockedUserComment');
											var hiddenCommentLabel = $('<div></div>').html(self.app.localization.e('blockedbymeHiddenCommentLabel')).addClass('hiddenCommentLabel')
											var ghostButton = $('<div class="showBlockedUserCommentWrapper"></div>').append($('<button></button>').html(self.app.localization.e('showhiddenComment')).addClass('ghost showBlockedUserComment'))
											var commentContentTable = localParent.find('.cbodyWrapper > .commentcontenttable')
											commentContentTable.append(hiddenCommentLabel)
											commentContentTable.append(ghostButton)
										}
		
									})

                                }
                            })

							

							close()

							
						})
						
						__el.find('.unblock').on('click', function(){
							self.app.mobile.vibration.small()
							self.app.platform.api.actions.unblocking(d.caddress, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)
								} else {
									localParent.find('.cbodyWrapper > .commentcontenttable div:not(.commentmessage)').remove()
									parent.removeClass('hiddenBlockedUserComment')
								}
							})

							close()
						})


						__el.find('.remove').on('click', function(){

							new dialog({
								html : self.app.localization.e('e13032'),
								success : function(){

									actions.delete(comment, function(err){

										if(!err)
										{
											/*var c = el.c.find('#' + comment.id);

											c.addClass('deleted')
											el.c.find('#' + comment.id + ' >div.commentPaddingWrapper .commentmessage').html("<div>"+self.app.localization.e('e13033')+"</div>")

											c.find('.panel').remove()
											c.find('.commentimages').remove()
											c.find('.reply').remove()*/
										}
											
									})

								},
								btn1text : self.app.localization.e('e13034'),
								btn2text : self.app.localization.e('e13035'),
								class : 'zindex',
							})

							close()
						})

						__el.find('.socialshare').on('click', function(){

							actions.sharesocial(comment)

							close()	

						})

					}, {
						theme : 'zindex lighttooltip'
					})

				}, d)

				

			}

		}


		var postEvents = function(p, _p, clbk){

			var c = _p.el.find('.postbody');

			actions.process(p.id || '0')


			_p.el.find('.leaveComment').emojioneArea({
				pickerPosition : 'top',
				
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
					'emojibtn.click' : events.emessage,
					change : events.emessage,
					click : events.emessage,
					
					keydown : function(editor, e){
						if(e.keyCode == 13){
							if (e.ctrlKey){

								setTimeout(() => {
									if (c.hasClass('sending')) return
									c.addClass('sending')

									_p.el.removeClass('active')

									actions.post(p.id || '0', p.pid, p.aid, p.editid, c)
								}, 100)
								
								e.preventDefault()

								return false
							}
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

						actions.lightarea(p.id || '0', c)

						
					},

					focus : function() {
						// Scroll comment section to top of the screen

						setFocus = true

					
						if(window.cordova){
							setTimeout(() => {
								actions.scrollToComment(_p.el);
							}, 300)
						}
						else{
							actions.scrollToComment(_p.el);
						}
					},

					blur : function(){
						setFocus = false

					},

					onLoad : function(c, d){

						var a = this

						if ((ed.init || p.init) && !p.unfocus){

							_p.el.find('.emojionearea-editor').focus()

							_p.el.addClass('active')

							ed.init = false;
						}

						if (p.value) {
							this.setText(p.value)
						}


						if (p.amount && p.editid){

							var comment = currents[p.editid]
							comment.amount.set(p.amount);

						}

						if (p.images){

							if(p.editid && p.images.length){

								var comment = currents[p.editid]

								comment.images.v = _.clone(p.images)

								renders.images(p.editid, p)									
								
							}
						}

						actions.lightarea(p.id || '0', c)
						areas[p.id || '0'] = this

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
					//if(!external){
						_p.el.removeClass('active')
					//}
					
				}, 150)
				
			})

			_p.el.find('.postaction').on('click', function(){

				if (c.hasClass('sending')) return
					c.addClass('sending')

				actions.post(p.id || '0', p.pid, p.aid, p.editid, c)

			})

			if (p.id){
				_p.el.find('.closeEdit').on('click', function(){
					actions.closeEdit(p.id)
				})
			}

			_p.el.find('.closeAnswer').on('click', function(){
				actions.removeForm(p.id || '0')
			})

			_p.el.find('.emojionearea-editor').pastableContenteditable();

			_p.el.find('.emojionearea-editor').on('pasteImage', function (ev, data){

				var id = actions.getid(_p.el.find('.postbody'))

				topPreloader(100)

				resize(data.dataURL, 1920, 1080, function(resized){
					var r = resized.split(',');
	
					if (r[1]){
	
						var r  = currents[id].images.set(resized)

						if(!r){
							sitemessage(errors.images)
						}
						else
						{
							if (renders.images)
								renders.images(id, _p);
						}
	
					}
					else{
						sitemessage("Image upload error")
					}

					
				
				})


			}).on('pasteImageStart', function(){

				topPreloader(30)

			}).on('pasteImageError', function(ev, data){

				topPreloader(100)

			})

			setTimeout(() => {
				actions.checkBanned(p).then((user) => {
					if (user){
	
						var info = self.psdk.userInfo.getShortForm(user.address)
	
						if (info){
							_p.el.find('.errormessage').removeClass('hidden').html(self.app.localization.e('commentBannedWarning', info.name))
	
						}
					}
				})
			}, 500)
			

		}
		

		var renders = {

			donate : function(id, p){

				var comment = currents[id];
				var __el = p.el.find('.embeddonate')

				if(comment){
					var donate = comment.donate.v[0];

					if (donate && donate.amount){
						self.shell({
							name :  'donate',
							inner : html,
							el : __el,//p.el.find('.newcommentdonate'),
							data : {
								donate : donate && donate.amount
							},
		
						}, function(_p){
		
							_p.el.find('.removedonate').on('click', function(){
								actions.removeDonate(id, p)
							})


							p.el.find('.lcpp').addClass('donateactive')
		
		
						})


						return
					}

				}

				p.el.find('.lcpp').removeClass('donateactive')

				__el.html('<img class="donateIcon" src="img/logo20.svg" alt=""></img>')

				

			},

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

					//_p.el.find('.image').imagesLoadedPN({ imageAttr: true }, function(image) {

						//if(!el.c) return

						/*var elimages = _p.el.find('.imagesEmbWr')

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

						elimages.isotope()*/
						
					//}, self.app);

					
				})
			},

			limits : function(el, message){

				var l = 2000 - message.length;

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

			/*cpreview : function(h){
				if(!h){
					h = ed.caption
				}

				if(!el.caption) return

				el.caption.find('.captionPreview').html(h)

				bgImages(el.caption.find('.captionPreview'))
			},*/

			caption : function(clbk){

				if(isMobile() && _in) return

				var cl = el.c.find('.comment').length
				
				
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
					editid : comment.id,
					amount: comment.amount,
					//donation: comment.donation
				}

				renders.post(function(area, el){

					/*var lined = comment.message.split("\n");

					var i = lined.length
					var j = lined[lined.length - 1].length

					ecaretPosition(el, i - 1, j - 1)*/

					

				}, p)
			},

			post : function(clbk, p){

				if (ed.openapi || ed.cantsend) {
					if(clbk) clbk()

					return
				}

				self.app.user.isState(function(state){
					//if(!state) return;
					
					if(state && self.app.platform.sdk.user.myaccauntdeleted()){
						if(clbk) clbk()

						return
					}

					if(!p) p = {};

					p.el || (p.el = el.post)

					var _preview = preview && !p.answer && !p.editid

					self.shell({
						name :  'post',
						el : p.el,
						insertimmediately : true,
						data : {
							placeholder : p.placeholder || '',
							answer : p.answer || '',
							edit : p.edit || '',
							preview : _preview,
							mestate : mestate,
							sender : self.app.user.address.value,
							receiver: receiver
						},

					}, function(_p){				

						var ini = function(_clbk, unfocus){

							if(!preview) return

							preview = false;
								
							p.init = true;
							el.c.removeClass('preview')

							var __clbk = function(a, b){

								if (clbk)
									clbk(a, b)


								if (_clbk){
									_clbk(a, b)
								}
								
							}

							if(unfocus) p.unfocus = true

							postEvents(p, _p, __clbk)
						}

						

						_p.el.find('.embedimages').off('click').on('click', function(){

							var id = actions.getid(_p.el.find('.postbody'))

							if(state){

								actions.embedimages(id, p)

								if(!p.answer && !p.editid){
									ini(null, true)
								}	
							}
							else if (_preview){
								actions.stateAction(function(){
								})
							}
						})

						_p.el.find('.embeddonate').off('click').on('click', function(){

							if(state){

								var id = actions.getid(_p.el.find('.postbody'))

								actions.embeddonate(id, p)

								if(!p.answer && !p.editid){ ini(null, true) }	
							}
							else{
								actions.stateAction(function(){
								})
							}



						})

						// _p.el.find('.embeddonate').on('click', events.pkoin)


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

							if(clbk) clbk()

							clbk = null

							return
						} else {
							_p.el.find('.txt').on('click', function(){

								$(this).blur();

								self.app.user.isState(function(state){

									if(!state){

										actions.stateAction(function(){
										})
									}

								})

								
							})
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


				if (images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

					return

				}

				//var h = sel.height()

				if (clbk)
						clbk()

				/*_el.imagesLoadedPN({ imageAttr: true }, function(image) {
					
					if(ed.renderClbk) ed.renderClbk()

					if (clbk)
						clbk()


					return

				}, self.app);*/
				
			},

			list : function(p, clbk, pid){

				if(!p) p = {};

				var commentslength
				var comments = p.comments
				var sort = null

				if(!preview || showedall)
					sort = new sortParameter()

				if(!p.replace){

					if (ed.commentPs){
						comments = _.filter(comments || [], function(c){
							if(c.id == ed.commentPs.commentid || c.id == ed.commentPs.parentid) return true
						})
					}
	
					comments = sorting(comments, pid)
	
					commentslength = comments.length
	
					if (pid){
						currentstate.levels[pid] = {
							id : pid,
							comments : _.map(comments, (c) => {
								return c.id
							})
						}
					}
	
					currentstate.pagination[ pid || '0' ] || (currentstate.pagination[ pid || '0' ] = 1)
	
					var pg = currentstate.pagination[ pid || '0' ]


					if(!ed.commentPs && !ed.reply){

						comments = _.filter(comments, function(c, i){
							if(i < pg * paginationcount && c.id != p.add){
								return true
							}
						})

						if(p.add){
							var addcomment = _.find(p.comments, function(c){
								return c.id == p.add
							})


							if (addcomment){
								if(ed.fromtop)
									comments.unshift(addcomment)
								else	
									comments.push(addcomment)
							}
						}

					}
				}

				p.el || (p.el = el.list)
				
				if(!preview && p.el)
					p.el.addClass('listloading')

				self.sdk.comments.users(comments, function (i, e) {

					self.shell({
						name :  'list',
						el : p.el,

						inner : p.replace ? replaceWith : html,
						fast : p.fast,
						insertimmediately : true,
						//inner : p.inner || _in, /// html
						
						data : {

							showedall,
							comments : comments || [],
							_class : p.class || '',
							newcomments : p.newcomments || '',
							needtoshow : commentslength - comments.length,

							replaceName : function(name, p){
								return '<span elementsid="comments_tocomment" class="tocomment" comment="'+p.comment+'">' + name + "</span>"
							},

							replaceNameNoComment : function(name, p){
								return '<span elementsid="comments_tocommentno" class="tocommentno">' + name + "</span>"
							},
							mestate : mestate,
							sort : sort,
							ed : ed,
							pid
						},

						additionalActions : function(){
							if (ed && ed.additionalActions)
								ed.additionalActions()
						}

					}, function(_p){

						if(!_p.el) return

						if(!preview)
							p.el.removeClass('listloading')

						if(!p.replace){
						
							if(!pid){
								

								_p.el.find('.refresh-comments').on('click', (e) => {
									window.rifticker.add(() => {
										$(e.currentTarget).addClass('refreshing');
									})
									
									setTimeout(() => {
										$(e.currentTarget).removeClass('refreshing');

										actions.update();
									}, 300);
								});

								_p.el.find('.close-comments').on('click', (e) => {
									actions.hideall()
								});	

								if (sort){
									sort._onChange = function(v){
										sortby = v

										currentstate.pagination = {}

										renders.list(p, null, pid)
									}

									ParametersLive([sort], _p.el)
								}

								makeCurrentLevels()
									
							}

							if (el.list){

								_p.el.find('.showmorecomments').on('click', function(){
									currentstate.pagination[ pid || '0' ]++

									renders.list(p, null, pid)
								})
								
							}
						}
						if (el.list){
							//bgImages(el.list)

							lazyEach({
								array : p.comments,

								action : function(_p){
									renders.commentimages(_p.item, _p.success)
								}
							})
						}

						if (clbk)
							clbk();

						if(ed.renderClbk) ed.renderClbk()
						
					})

				})
			},

			showStreamLink : function(post){
				el.c.prepend(`
					<div class="streamLink">
						<button class="button">${ self.app.localization.e('watchstream') }</button>
					</div>
				`);

				el.c.find('.streamLink button').click(function() {
					self.nav.api.go({
						href : `index?video=1&v=${ post.txid }`,
						history : true,
						open : true
					})
				});
			}
		}

		var initEvents = function(){
				
			el.c.find('.showall').on('click', function(){
				actions.showall()
			})

			//self.app.platform.sdk.comments.sendclbks[eid] = clbks.post
			//self.app.platform.sdk.comments.upvoteClbks[eid] = clbks.upvote

		

			/*self.app.platform.ws.messages.cScore.clbks[eid] = function(data){


				if (data.comment.postid == txid){

					clbks.upvote(null, data.comment, data.upvoteVal || data.value, data.addrFrom)
				}
			
			}*/

			self.app.psdk.updatelisteners[eid] = self.app.platform.actionListeners[eid] = function({type, alias, status}){


				if(type == 'comment'){
					var comment = alias

					if (comment.postid == txid){

						if(currents[comment.id]) return 
						
						clbks.post(self.psdk.comment.get(comment.id) || comment, comment.optype)
						
					}
				}

				if(type == 'cScore'){

					var comment = self.psdk.comment.getclear(alias.comment.v)

					if (comment){
						if(comment.postid == txid){
							clbks.upvote(status == 'rejected' ? 'rejected' : null, self.psdk.comment.get(alias.comment.v), status == 'rejected' ? 0 : alias.value.v, alias.actor)
						}
					}

				}
				
			}


			el.c.on('click', '.upvoteComment', events.upvoteComment)
		}

		var makeCurrentLevels = function(clbk){

			var lvls = _.map(currentstate.levels, function(lv){
				return lv.id
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

				p.comments = comments//self.app.platform.sdk.comments.storage[txid]['0']
				p.class = "firstcomment"

				actions.showhideLabel()	

				if (el.list)
					el.list.html('')

				renders.list(p, function(){

					if(!el.c) return

					window.rifticker.add(() => {
						if(!el.preloader.hasClass('hidden'))
							el.preloader.addClass('hidden')
					})

					renders.post(function(area){

						if (ed.reply){
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

				if (share.lastComment){
					comments = [self.psdk.comment.get(share.lastComment)]//self.app.platform.sdk.comments.ini([ed.lastComment])
				}

				self.sdk.comments.users(comments, function(){

					if (clbk)
						clbk(comments)

				})
			},	
			level : function(pid, clbk, comments){

				if(comments){
					
					if (clbk) clbk(comments)

					return
				}

				self.app.platform.sdk.comments.getclear(txid, pid || "", function(comments, e){


					if (clbk)
						clbk(comments, e)

				})

			}
		}

		var state = {
			save : function(){

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
					levels : {},
					pagination : {}
				}

				ed = p.settings.essenseData || {}

				preview = ed.preview || false;
				listpreview = ed.listpreview || false;

				showedall = !listpreview;

				txid = ed.txid || null

				currents['0'] = new Comment(txid);

				share = self.psdk.share.get(txid)

				if (txid){
					//state.load()

					var data = {
						preview,
						listpreview,
						showedall
					};

					data.ed = ed;

					self.app.platform.sdk.ustate.me(function(_mestate){

						mestate = _mestate

						clbk(data); 

					})
				}

			},

			attention : function(text){
				if(!el.c) return

				if(isMobile() || !text){
					el.c.find('.post').addClass('attention')
				}
				else{
					el.c.find('.leaveCommentPreview').css('opacity', '0')

					setTimeout(function(){

						if(!el.c) return

						el.c.find('.post').addClass('attention')

						if (text)
							el.c.find('.leaveCommentPreview').attr('placeholder', text)

						setTimeout(function(){

							if(!el.c) return

							el.c.find('.leaveCommentPreview').css('opacity', '')

							

						}, 100)
					}, 100)
				}

				setTimeout(function(){

					if(!el.c) return

					el.c.find('.post').removeClass('attention')
					
				}, 1300)
			},

			showBanner : function(c) {
				let alredyCommented;

				var lastComment = self.psdk.comment.get(share.lastComment)

				if (lastComment) {
					const address = lastComment.address;
					const me = app.platform.sdk.user.me();

					const firstLikeIsMine = (address == me.address);

					if (firstLikeIsMine) {
						alredyCommented = true;
					}
				}

				if (areas && !alredyCommented) {
					const len = Object.keys(areas).length;

					const isPost = len && areas[0];
					const isReply = len && len >= 2;

					let hasContent;

					//leaveComment (post) isn't empty
					if (isPost) {
						hasContent = areas[0].content != '';
					}

					//leaveComment (reply) isn't empty
					if (isReply) {
						hasContent = Object.values(areas)[1].content != '';
					}

					//if isn't empty
					if (hasContent) {
						alredyCommented = true;
					}
				}
					
				if (alredyCommented) {
					return false;
				}

				app.platform.ui.showCommentBanner(el.c, (c) => {
					bannerComment = c
				}, c.essenseData.receiver);
			},

			authclbk : function(){
				
				if (el.c){

					authblock = true

					self.app.platform.sdk.ustate.me(function(_mestate){

						mestate = _mestate

						authblock = false;

						renders.post(function(area){
							areas["0"] = area
						})

					})
				
				}
			},

			destroy : function(){


				/*delete self.app.platform.sdk.comments.sendclbks[eid]
				delete self.app.platform.ws.messages.comment.clbks[eid]
				
				delete self.app.platform.sdk.comments.upvoteClbks[eid]
				delete self.app.platform.ws.messages.cScore.clbks[eid]*/

				delete self.app.platform.actionListeners[eid]
				delete self.app.psdk.updatelisteners[eid]

				authblock = false

				share = null
				setFocus = false

				currentstate = {
					reply : null,
					levels : {},
					pagination : {}
				}

				/*_.each(areas, function(a){
				})*/

				areas = {}; ///
				currents = {};

				if (external) 
					external.destroy()

				if (caption)
					caption.destroy()

				if (bannerComment) {
					bannerComment.destroy();
				}

				if (el.c) el.c.empty()

				el = {};
				ed = {};

				_in = null
			},
			
			init : function(p){

				//state.load();

				receiver = p.essenseData.receiver;

				el = {};
				el.c = p.el.find(">div")

				el.post = el.c.find('.post')
				el.list = el.c.find('.list')
				el.caption = el.c.find('.captionCnt')
				el.showall = el.c.find('.showall')

				el.preloader = el.c.find('.loaderWrapper')
				_in = el.c.closest('.wndcontent');

				if(!_in.length) {
					_in = el.c.closest('.fullScreenVideo .sharecnt');
				}

				
				el.list.on('click', '.reply', events.replyandreplies);
				el.list.on('click', '.replies', events.replies);
				el.list.on('click', '.panel', events.metmenu);
				el.list.on('click', '.tocomment', events.tocomment)
				el.list.on('click', '.imageCommentOpen', events.openGallery)
				el.list.on('click', '.hiddenCommentLabel button', events.showHiddenComment)
				//el.list.on('click', '.showBlockedUserComment', events.showBlockedUserComment)
				el.list.on('click', '[profile]', events.showprofile)

				if(!_in.length) {
					_in = null

					if(!isTablet()){
						top = 65
					} else {
						top = 0
					}
					
				}
				else
				{
					top = 0
				}

				var post = share;

				if (listpreview){
					makePreview(() => {
						if(ed.previewClbk) ed.previewClbk()
					})
				} else{
					make();
					
					if (ed.showall){
						actions.showall()
					}
				}

				initEvents();

				/* !Post with stream */
				/*if (!post || !post.settings.c) {
					if (listpreview){
						makePreview(() => {
							if(ed.previewClbk) ed.previewClbk()
						})
					} else{
						make();
						
						if (ed.showall){
							actions.showall()
						}
					}

					initEvents();
				} else {
					const holder = el.c.parents('.commentsWrapperHb');
					if (listpreview) {
						renders.showStreamLink(post);
						holder.show();
					} else {
						holder.hide();
					}
				}*/

				p.clbk(null, p);
			},

			freeze : function(){

				if(caption) caption.destroy()
				
			},

			hideall : function(preview){
				throw 'deprecated'

				return

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
						/*if(self.app.mobileview) top = 65
						else*/
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

			window.rifticker.add(() => {
				essense.destroy();
			})

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

