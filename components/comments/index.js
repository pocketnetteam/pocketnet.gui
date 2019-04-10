var comments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, txid, ed, currents = {}, caption, _in, top, eid;

		var errors = {
			content : "message empty",
			share : "hasn't share",
			messagelength : "Comments have 500 character limit per comment",
			money : "hasn't money",
			network : "network error"	
		}

		var rendered = {}

		var areas = {};


		var wordsRegExp = /[,.!?;:() \n\r]/g

		var actions = {

			removeForm : function(id){

				delete areas[id]

				el.c.find("#" + id + ' .answer').html('')
				el.c.find("#" + id + ' .edit').html('')
			},

			post : function(id, pid, aid, clbk, editid){

				id || (id = '0')

				var current = currents[id];

				if (current){
					var e = current.validation();					

					if (e){
						if (clbk)
							clbk(false)

						sitemessage(errors[e])
					}
					else
					{
						actions.send(current, function(err, alias){

							if(err){
								if (clbk)
									clbk(false)
							}

							console.log('alias', alias)

							state.save()

							el.c.find('.emojionearea-editor').blur();

							delete currents[id]

							el.c.find('.att').html('');

							var p = {
								comments : [alias]
							}



							if (id == '0')
							{
								areas[id].setText('');
								p.class = "firstcomment"

								if(!el.c.hasClass('showedall')){
									el.c.addClass('showedall');

									_scrollTo(el.c.find('.post'), _in, 100)
								}
							}

							else
							{



								var _el = el.c.find('#' + id);

								if (editid){

									_el.find('.edit').html('');

									alias.timeupd = alias.timeupd.addMinutes(1)

									console.log('alias.timeupd', alias.timeupd)

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
						

							if (clbk)
								clbk(true)
							
						}, pid, aid, editid)
					}
				}

				else
				{
					if (clbk)
						clbk(false)
				}
				
			},
			send : function(comment, clbk, pid, aid, editid){	


				self.app.platform.sdk.comments.send(txid, comment, pid, aid, function(err, alias){

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

				}, editid)
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

				console.log(id, c)

				var v = c.getText();

				actions.links(id, v);
				actions.message(id, v)
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

							console.log('cel', cel)

							cel.addClass('newcommentsn')

							setTimeout(function(){

								cel.removeClass('newcommentsn')

							}, 2500)
						}

					})
				}


			},

			reply : function(id, aid){

				console.log("REPLY", id, aid)

				var _el = el.c.find('#' + id);
				var answer = _el.find('.answer');

			
				renders.post(function(area, el){

					var pid = '0'

					if (aid != id) pid = id

					var address = self.app.platform.sdk.comments.address(txid, aid, pid)



					var str = '@' + (deep(self.app, 'platform.sdk.usersl.storage.'+address+'.name') || address) + ',  '

					if(address == self.app.platform.sdk.address.pnet().address) str = ''

					area.setText(str)

					console.log("AREAUID", id)

					areas[id] = area

					el.focus();

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

				if(show){
					load.level(id, function(comments){

						c.find('.repliesloaderWrapper').addClass('hidden')

						p.comments = self.app.platform.sdk.comments.storage[txid][id]
						
						c.addClass('showedreplies')

						renders.list(p, function(){

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

				if(pid) _el = el.c.find("#" + id + ' .answers')

					else{

						p.class = "firstcomment"

						_el = el.c.find('.list')
					}

				load.level(pid, function(comments){
					_el.html('')

					p.comments = comments;

					renders.list(p)
				})
			}
		}

		var events = {
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
		
			emessagekeyup : function(editor, e){
				var char = String.fromCharCode(e.keyCode || e.which);
				var text = this.getText();

				if ((wordsRegExp).test(char)) {

					actions.links(text);

				}

				actions.message(text)
			},
			emessage : function(editor, e){

				var c = this;

				var id = actions.getid(editor.closest('.postbody'))

				actions.emessage(id, c)
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

				var parent = _el.closest('.comment')

				var id = parent.attr('id')
				var pid = parent.attr('pid')

				var comment = self.app.platform.sdk.comments.find(txid, id, pid)

				var d = {
					address : self.app.user.address.value,
					caddress : self.app.platform.sdk.comments.address(txid, id, pid)
				};

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						
						return template(d);

					}, function(el){

						el.find('.edit').on('click', function(){

							renders.edit(parent, comment)

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

		var renders = {
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

				renders.post(function(area, el){

					/*var lined = comment.message.split("\n");

					var i = lined.length
					var j = lined[lined.length - 1].length

					ecaretPosition(el, i - 1, j - 1)*/

				}, {
					value : comment.message,
					init : true,
					edit : 'edit',
					el : el.find('.edit'),

					pid : comment.parentid,
					aid : comment.answerid,
					id : comment.id,
					editid : comment.id
				})
			},
			post : function(clbk, p){

				console.log(p)

				if(!p) p = {};

				self.shell({
					name :  'post',
					el : p.el || el.post,

					data : {
						placeholder : p.placeholder || '',
						answer : p.answer || '',
						edit : p.edit || ''
					},

				}, function(_p){

					var textarea = _p.el.find('.leaveComment');

					textarea.emojioneArea({
				    	pickerPosition : 'bottom',
				    	
				    	search : false,
				    	tones : false,

				    	attributes: {
					        spellcheck : true,
					    },

				    	events : {
				    		change : events.emessage,
				    		click : events.emessage,
				    		keyup : events.emessagekeyup,

				    		onLoad : function(c, d){

				    			var a = this

				    			if(ed.init || p.init){

									_p.el.find('.emojionearea-editor').focus()

									ed.init = false;

								}
					
								_p.el.find('.emojionearea-editor').pastableContenteditable();

								_p.el.find('.emojionearea-editor').on('pasteImage', function (ev, data){


								}).on('pasteImageStart', function(){

									topPreloader(30)

								}).on('pasteImageError', function(ev, data){

								 	topPreloader(100)

								}).on('pasteText', function (ev, data){

									actions.emessage(p.id || '0', a)

								});

								if(p.value) {
									this.setText(p.value)

									
								}

								if (clbk)
									clbk(this, _p.el.find('.emojionearea-editor'));

				    		}
				    	}
				    });

				    _p.el.find('.emojionearea-editor').on('focus', function(){
				    	actions.process(p.id || '0')	
				    })

				    actions.process(p.id || '0')	

				    var c = _p.el.find('.postbody');			

					_p.el.find('.postaction').on('click', function(){

						if(c.hasClass('sending')) return

						c.addClass('sending')

						actions.post(p.id || '0', p.pid, p.aid, function(r){
							c.removeClass('sending')

							if(!r){
								console.log("fail")
							}
						}, p.editid)

					})

					if (p.id){
						_p.el.find('.closeEdit').on('click', function(){
							actions.closeEdit(p.id)
						})
					}

					

					_p.el.find('.closeAnswer').on('click', function(){
						actions.removeForm(p.id || '0')
					})

					
				})
			},

			list : function(p, clbk){

				if(!p) p = {};

				p.comments = _.filter(p.comments || [], function(c){
					if(!rendered[c.id]) {
						rendered[c.id] = true

						return true
					}
				})

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
						}
					},

				}, function(_p){

					_p.el.find('.reply').off('click').on('click', events.replyandreplies);
					_p.el.find('.replies').off('click').on('click', events.replies);
					_p.el.find('.panel').off('click').on('click', events.metmenu);
					_p.el.find('.tocomment').off('click').on('click', events.tocomment)

					setTimeout(function(){
						_p.el.find('.newcomments').removeClass('newcomments')
					}, 600)
					
					bgImages(el.list)

					/*p.el.find('.commentLikeAction').on('click', events.commentLike)
					p.el.find('.usericoncmt').off('click').on('click', events.subscribe)*/

					if (clbk)
						clbk();
					
				})
			}
		}

		var make = function(){

			var p = {};			

			load.level(null, function(comments){

				p.comments = self.app.platform.sdk.comments.storage[txid]['0']
				p.class = "firstcomment"

				if(p.comments.length > 5){
					el.c.find('.showall').removeClass('hidden')
				}
				
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
				el.c.addClass('showedall');
			}
			
		}

		var load = {
			level : function(pid, clbk){

				self.app.platform.sdk.comments.get(txid, pid || "", function(comments){

					if (clbk)
						clbk(comments)

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

		var initEvents = function(){
				
			el.c.find('.showall').on('click', function(){
				el.c.addClass('showedall');
			})

			self.app.platform.ws.messages.comment.clbks[eid] = function(data){

				console.log('DATA', data)

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

					console.log(p)

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

				txid = ed.txid || null

				currents['0'] = new Comment(txid);

				if (txid){
					state.load()

					var data = {};

					clbk(data); 
				}

			},

			destroy : function(){

				delete self.app.platform.ws.messages.comment.clbks[eid]

				if (caption)
					caption.destroy()

				el = {};
			},
			
			init : function(p){

				

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.post = el.c.find('.post')
				el.list = el.c.find('.list')
				el.caption = el.c.find('.captionCnt')

				_in = el.c.closest('.wndcontent');

				if(!_in.length) {
					_in = null
					top = 65
				}
				else
				{
					top = 0
				}

				initEvents();

				make();

				p.clbk(null, p);
			},
			hideall : function(){
				if (el.c)
					el.c.removeClass('showedall');
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