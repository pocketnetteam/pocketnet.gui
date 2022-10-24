
if(typeof _OpenApi == 'undefined'){
	_OpenApi = false
}

var comments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var primary = false;

		var el = {}, txid, ed, currents = {}, caption, _in, top, eid, preview = false, listpreview = false, showedall = false, receiver;

		var authblock = false;

		var paginationcount = 10;

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

		var isotopes = {}
		

		var clbks = {
			upvote : function(err, comment, value, address, temp){

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

				var p = {}

				if (editid || !showedall){
					p.comments = [alias]
				}
				else{
					p.comments = self.app.platform.sdk.comments.storage[_txid][pid || '0']
					p.add = alias.id
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

					el.c.find('.post .newcommentimages').html('');
					el.c.find('.post .newcommentdonate').html('');
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

						p.replace = true
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



				/////// ADD COMMENT

				//todo

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
			
				var sender = self.sdk.address.pnet().address;
			
				if (sender === receiver){
			
					sitemessage(self.app.localization.e('donateself'));
			
				} else {

					self.nav.api.load({
						open : true,
						id : 'donate',
						inWnd : true,
			
						essenseData : {
							type : 'donate',
							sender: sender, 
							receiver: receiver,
							value : storage.donate,
							storage,
							clbk  : function(value){

								value = Number(value);
		
								var result = Boolean(value);

								if (value < 0.5){
									sitemessage(self.app.localization.e('minPkoin', 0.5))
									return;
								}
					
	
								if(!_.isArray(value)) value = [value]
	
								currents[id].donate.remove();
	
								currents[id].donate.set({
									address: receiver,
									amount: Number(value)
								})
	
								if(!result && errors[type]){
	
									sitemessage(errors[type])
	
								}
	
	
								if (result){
	
									new Audio('sounds/donate.mp3').play();
	
									renders.donate(id, p)
	
								}	
								
							}
						},
			
						clbk : function(s, p){
							external = p
						}
					})
			
					/*self.nav.api.load({
						open : true,
						id : 'embeding',
						inWnd : true,
			
						essenseData : {
							type : 'donate',
							storage : storage,
							sender: sender, 
							receiver: receiver,
							balance: p.balance,
							total: p.total,
							on : {
			
								added : function(value){

									value = Number(value);
			
									var result = Boolean(value);

									if (value < 0.5){
										sitemessage(self.app.localization.e('minPkoin', 0.5))
										return;
									}
						
									if (value < p.balance){
			
										if(!_.isArray(value)) value = [value]
			
										currents[id].donate.remove();
			
										currents[id].donate.set({
											address: receiver,
											amount: Number(value)
										})
			
										if(!result && errors[type]){
			
											sitemessage(errors[type])
			
										}
			
			
										if (result){
			
											new Audio('sounds/donate.mp3').play();
			
											renders.donate(id, p)
			
										}	
			
								
			
									} else {
			
										sitemessage(self.app.localization.e('incoins'))
									}
			
				
			
								}
							}
						},
			
						clbk : function(s, p){
							external = p
						}
					})*/
			
				}
			
			}, 

			
			pkoin : function(id, format){

				var share = self.app.platform.sdk.node.shares.storage.trx[id];

				if (share){
					
					actions.stateAction(function(){

						var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
							address : share.address,
							addresses : [],
						}

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

				}

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
				/*else{
					self.nav.api.load({
						open : true,
						href : 'author?address=' + address,
						history : true
					})
				}*/

				
			},
			lightarea : function(id, c){

				var comment = currents[id]

				
				
				if(comment && (comment.message.v || comment.images.v.length))
					c.addClass('hastext')
				else
					c.removeClass('hastext')
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
							_.each(imgs, added)
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
						var post = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

						var address = (self.app.platform.sdk.address.pnet() || {}).address

						if (post.address && address && post.address != address && self.app.platform.sdk.user.scamcriteria()){

							el.c.find('.sending').removeClass('sending')
	
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

						if (clbk){
							clbk(err, null)

							if (err === 'tosmallamount'){
								actions.removeDonate(id, p)
							}
						}
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

				if (currents[id])
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
							actions.tocomment(reply.parentid || reply.answerid)

							var cel = el.c.find("#" + (reply.parentid || reply.answerid))

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

						var str = '@' + name + '  '

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

						

						p.comments = self.app.platform.sdk.comments.storage[txid][id]
						
						c.addClass('showedreplies')

						renders.list(p, function(){

							c.find('.repliesloaderWrapper').addClass('hidden')

							if(!caption)
								renders.caption()

							if (clbk)
								clbk()
							

						}, id)

					}, currentstate.levels[id] ? true : false)
				}
				else
				{

					delete currentstate.levels[id]

					/*if (self.app.platform.sdk.comments.storage[txid])
						_.each(self.app.platform.sdk.comments.storage[txid][id], function(c){
							delete rendered[c.id]
						})*/

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

				var counts = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid + '.comments') || 0;

				var lastchildren = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid + '.lastComment.children') || 0;

				var needtoshow = false

				if (counts - lastchildren > 1){
					actions.hiddenCounts(counts - lastchildren - 1)

					needtoshow = true
				}

				if (showedall){
					el.showall.addClass('hidden')
				}
				else{
					if (needtoshow ){
						el.showall.removeClass('hidden')
					}
					else{
						el.showall.addClass('hidden')
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


				if (el && el.length > 0 && el[0].scrollIntoView && isMobile()) {

					//if(el.closest('.fullScreenVideo').length > 0) return

					_scrollTo(el, _in, 0)
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


			var me = deep(self.app, 'platform.sdk.users.storage.' + (self.user.address.value || ''))

			if (!my && me){

				if (me.relation(comment.address, 'blocking') )
					p = p * 0

			}

			var post = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid)

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

				var oldest = (_.min(comments, function(c){return c.time}).time).getTime() / 1000
				var newest = (_.max(comments, function(c){return c.time}).time).getTime() / 1000

				var cbyauthors = group(comments, function(c){ return c.address })
	
				comments = _.sortBy(comments, function(c){

					if (self.app.platform.sdk.comments.blocked[c.address]) {
						return 0
					}


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

				var comment = self.app.platform.sdk.comments.find(txid, id, pid)

				if (!comment && listpreview && ed.lastComment){
					comment = self.app.platform.sdk.comments.ini([ed.lastComment])[0]
				}


				actions.openGallery(comment, _el.attr('i'))
			},
			replyandreplies : function(){
				var id = $(this).closest('.firstcomment').attr('id')
				var c = $(this).closest('.comment');
				var cf = $(this).closest('.firstcomment');

				var _id = cf.attr('id')
				var _aid = c.attr('id')

				

				actions.replies(id, true, function() {
					// Scroll comment section to top of the screen
					actions.scrollToComment(el.list.find('.answer.active'));
					actions.reply(_id, _aid)
				});

				
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

							self.app.platform.api.actions.blocking(d.caddress, function (tx, error) {
                                if (!tx) {
                                    self.app.platform.errorHandler(error, true)
                                }
								else
								{
									parent.addClass('hiddenBlockedUserComment');
									var hiddenCommentLabel = $('<div></div>').html(self.app.localization.e('blockedbymeHiddenCommentLabel')).addClass('hiddenCommentLabel')
									var ghostButton = $('<div></div>').append($('<button></button>').html(self.app.localization.e('showhiddenComment')).addClass('ghost showBlockedUserComment'))
									var commentContentTable = localParent.find('.cbodyWrapper > .commentcontenttable')
									commentContentTable.append(hiddenCommentLabel)
									commentContentTable.append(ghostButton)
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
						/*if (e.ctrlKey && e.keyCode == 13) {

							if (c.hasClass('sending')) return

								c.addClass('sending')

							actions.post(p.id || '0', p.pid, p.aid, p.editid)

							e.preventDefault()

							return false;
						}*/
					},
					keydown : function(editor, e){
						if(e.keyCode == 13){
							if (isMobile()){

								setTimeout(() => {
									if (c.hasClass('sending')) return
									c.addClass('sending')

									_p.el.removeClass('active')

									actions.post(p.id || '0', p.pid, p.aid, p.editid)
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

						if(!isios())
							actions.scrollToComment(_p.el);
						else{
							if(window.cordova){
								setTimeout(() => {
									actions.scrollToComment(_p.el);
								}, 300)
							}
						}
					},

					blur : function(){
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

						if (p.donation && p.amount && p.editid){

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


		}

		var clears = {
			isotope : function(){

				try{

					_.each(isotopes, function(i){
						
							i.isotope('destroy')
						
						
					})

					isotopes = {}

				}
				catch(e){

				}
			}
		}

		var renders = {

			donate : function(id, p){

				var comment = currents[id];
				var donate = comment.donate.v[0];

				self.shell({
					name :  'donate',
					turi : 'embeding',
					inner : html,
					el : p.el.find('.newcommentdonate'),
					data : {
						donate : donate && donate.amount
					},

				}, function(_p){

					_p.el.find('.removedonate').on('click', function(){

						actions.removeDonate(id, p)
					})


				})



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

					_p.el.find('.image').imagesLoadedPN({ imageAttr: true }, function(image) {

						if(!el.c) return

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
						
					}, self.app);

					
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

				if(isMobile() && _in) return

				var cl = deep(self.app.platform.sdk.comments.storage, txid + '.0.length') || 0

				if(ed.caption && cl > 5){
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
							zIndex : 105,
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
					editid : comment.id,
					amount: comment.amount,
					donation: comment.donation
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

						data : {
							placeholder : p.placeholder || '',
							answer : p.answer || '',
							edit : p.edit || '',
							preview : _preview,
							mestate : mestate,
							sender : self.app.platform.sdk.address.pnet() ? self.app.platform.sdk.address.pnet().address : null,
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

				clears.isotope()

				if(!p.replace){

					if (ed.commentPs){
						comments = _.filter(comments || [], function(c){
							if(c.id == ed.commentPs.commentid || c.id == ed.commentPs.parentid) return true
						})
					}
	
					comments = sorting(comments, pid)
	
					commentslength = comments.length
	
					if (pid){
						currentstate.levels[pid] = pid
					}
	
					currentstate.pagination[ pid || '0' ] || (currentstate.pagination[ pid || '0' ] = 1)
	
					var pg = currentstate.pagination[ pid || '0' ]

					if(!ed.commentPs && !ed.reply){

						comments = _.filter(comments , function(c, i){
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
								makeCurrentLevels()

								_p.el.find('.refresh-comments').on('click', (e) => {
									$(e.currentTarget).addClass('refreshing');

									setTimeout(() => {
										$(e.currentTarget).removeClass('refreshing');

										actions.update();
									}, 300);
								});

								if (sort){
									sort._onChange = function(v){
										sortby = v

										currentstate.pagination = {}

										renders.list(p, null, pid)
									}

									ParametersLive([sort], _p.el)
								}
									
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
			}
		}

		var initEvents = function(){
				
			el.c.find('.showall').on('click', function(){
				actions.showall()
			})

			self.app.platform.sdk.comments.sendclbks[eid] = clbks.post
			self.app.platform.sdk.comments.upvoteClbks[eid] = clbks.upvote

			self.app.platform.ws.messages.comment.clbks[eid] = function(data){


				return //// TODO

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

		var makeCurrentLevels = function(clbk){
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

					if(!el.c) return

					el.c.find('.loaderWrapper').addClass('hidden')


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

				if (ed.lastComment){
					comments = self.app.platform.sdk.comments.ini([ed.lastComment])
				}

				self.sdk.comments.users(comments, function(){

					if (clbk)
						clbk(comments)

				})
			},	
			level : function(pid, clbk, ccha){

				self.app.platform.sdk.comments.getclear(txid, pid || "", function(comments, e){

					if (clbk)
						clbk(comments, e)

				}, ccha)

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
					levels : {},
					pagination : {}
				}

				ed = p.settings.essenseData || {}

				preview = ed.preview || false;
				listpreview = ed.listpreview || false;

				showedall = false;

				txid = ed.txid || null

				currents['0'] = new Comment(txid);

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
			},

			showBanner : function(c) {
				let alredyCommented;

				if (c.essenseData && c.essenseData.lastComment) {
					const address = c.essenseData.lastComment.address;
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
				});
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

				clears.isotope()

				delete self.app.platform.sdk.comments.sendclbks[eid]
				delete self.app.platform.ws.messages.comment.clbks[eid]
				
				delete self.app.platform.sdk.comments.upvoteClbks[eid]
				delete self.app.platform.ws.messages.cScore.clbks[eid]

				authblock = false

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

				_in = el.c.closest('.wndcontent');

				if(!_in.length) {
					_in = el.c.closest('.fullScreenVideo .sharecnt');
				}

				el.list.on('click', '.reply', events.reply);
				el.list.on('click', '.replies', events.replies);
				el.list.on('click', '.panel', events.metmenu);
				el.list.on('click', '.tocomment', events.tocomment)
				el.list.on('click', '.imageCommentOpen', events.openGallery)
				el.list.on('click', '.hiddenCommentLabel', events.showHiddenComment)
				el.list.on('click', '.showBlockedUserComment', events.showBlockedUserComment)
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

				

				if (listpreview){
					makePreview(() => {
						if(ed.previewClbk) ed.previewClbk()
					})
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

			window.requestAnimationFrame(() => {
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

