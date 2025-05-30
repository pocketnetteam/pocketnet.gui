var author = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var author;
		var el = {};
		var upbutton;

		var panel = null, uptimer = null, contentsready = false, fixedBlock = null, acsearch, share = null;
		var wordsRegExp = /[,.!?;:() \n\r]/g

		var actions = {
			subscribeLabel : function(){

				if(!author) return

				var user = self.app.user

				var my = (user.address.value && author.address == user.address.value)
				var subscribed = false;


				if(!my && user.address.value){

					var me = self.psdk.userInfo.getmy()

					if (me && me.relation(author.address, 'subscribes')){
						subscribed = true
					}
				}

				if(el.c){

					var _el = el.caption.find('.subscribebuttonstop')

					if(subscribed){
						_el.addClass("following")
					}
					else{
						_el.removeClass("following")
					}

				}
				

			},
			showmoreabout : function(){

				var a = filterXSS(clearScripts((findAndReplaceLink(deep(author, 'data.about'), true))))

				el.c.find('.aboutwrapper').html(a)
				el.c.find('.showmoreabout').remove()
			},
			
			destroy : function(){
				_.each(reports, function(r){
					r.active = false;

					if (r.module)
						r.module.destroy()
				})
			},

			complain : function(){
				self.nav.api.load({
					open : true,
					id : 'complain',
					inWnd : true,

					essenseData : {
						item : 'user',
						obj : author,

						success : function(){
							
						}
					},

					clbk : function(){
						
					}
				})
			}
		}

		var events = {
		

			unsubscribe : function(){

				self.app.mobile.vibration.small()

				new dialog({
					html : self.app.localization.e('e13022'),
					btn1text :  self.app.localization.e('unfollow'),
					btn2text : self.app.localization.e('ucancel') ,

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(author.address, function(tx, err){

							if(tx){
								
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}
		
						})

					}
				})

				
			},

			subscribe : function(){
				self.app.mobile.vibration.small()

				self.app.platform.api.actions.subscribeWithDialog(author.address, function(tx, err){

					if(tx){
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},

			subscribePrivate : function(){

				self.app.mobile.vibration.small()

				var off = $(this).hasClass('turnon')

				var f = 'notificationsTurnOn'

				if(off){

					f = 'notificationsTurnOff'
					
				}

				self.app.platform.api.actions[f](author.address, function(tx, err){

					if(tx){
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},

			startchat: function(){
				self.app.mobile.vibration.small()

				self.app.platform.matrixchat.startchat(author.address)

				
			},

			

		}

		var reports = {}
		
		var initreports = function(){

			var state = self.app.user.getstate()


				reports = {
					shares : {
						name : self.app.localization.e('uposts').toUpperCase(),
						mobile : '<i class="fas fa-align-justify"></i>',
						id : 'shares',
						render : 'lenta',
						history : true,
						if : function(){
							return !self.app.curation()
						},
						count : function(){
							return 0
						}
					},
		
					post : {
						if : function(){
							return false
						},
						id : 'post',
						render : 'post',
						count : function(){
							return 0
						}
					},
		
					followers : {
						name : self.app.localization.e('followers').toUpperCase(),
						mobile : '<i class="fas fa-users"></i>',
						id : 'followers',
						render : 'followers',
						history : true,
						if : function(){
							return !self.app.curation()
						},
						count : function(){

							return deep(author, 'data.subscribers_count') || 0
		
						
						}
					},
		
					contents : {
						name : self.app.localization.e('followers').toUpperCase(),
						mobile : '<i class="fas fa-users"></i>',
						id : 'contents',
						render : 'contents',
						history : true,
						if : function(){
							return false
						}
						
					},
		
					following : {
						name : self.app.localization.e('following').toUpperCase(),
						id : 'following',
						mobile : '<i class="fas fa-user-plus"></i>',
						render : 'following',
						history : true,
						if : function(){
							return !self.app.curation()
						},
						count : function(){


							return deep(author, 'data.subscribes_count') || 0
						}
					},
		
					blocking : {
						name : self.app.localization.e('blockedusers').toUpperCase(),
						id : 'blocking',
						mobile : '<i class="fas fa-user-slash"></i>',
						render : 'blocking',
						history : true,
						if : function(){
							if(self.user.isItMe(author.address)) return true
						},
						count : function(){

							return deep(author, 'data.blockings_count') || 0
						}
					},
			
					share : {
						name : self.app.localization.e('share').toUpperCase() + ' <i class="fas fa-share-alt"></i>',
						mobile : '<i class="fas fa-share-alt"></i>',
						id : 'share',
						if : function(){
							return self.user.isItMe(author.address) || !self.app.curation()
						},
						events : {
							click : function(){
		
								self.nav.api.load({
									open : true,
									href : 'socialshare2',
									history : true,
									inWnd : true,
									uid : "authorshare",
									essenseData : {
										caption : "Share this author",
										sharing : author.data.social(self.app),
										embedding : {
											type : 'channel',
											id : author.address
										},

										url : 'https://'+self.app.options.url+'/' + self.app.platform.api.authorlink(author.address, true)
									}
								})
								
							}
						}
					},

					signin : {
						name : self.app.localization.e('signinmenu').toUpperCase() + ' <i class="fas fa-sign-in-alt"></i>',
						mobile : '<i class="fas fa-sign-in-alt"></i>',
						id : 'signin',
						if : function(){
							return isMobile() && !state
						},
						events : {
							click : function(){
		
								self.nav.api.load({
									open : true,
									href : 'authorization',
									history : true
								})
								
							}
						}
					},
		
					settings : {
						name : self.app.localization.e('settings').toUpperCase() + ' <i class="fas fa-cog"></i>',
						mobile : '<i class="fas fa-cog"></i>',
						id : 'settings',
						href : function(){
		
							if(!self.app.user.validate()){
								return 'userpage'
							}
							else{
								return 'userpage?id=ustate'
							}
		
							
						}, 
						class : 'tosettings',
		
						if : function(){
							if(self.user.isItMe(author.address) && !self.app.mobileview) return true
						}
					},
		
					more : {
						name : '<i class="fas fa-ellipsis-h"></i>',
						mobile : '<i class="fas fa-ellipsis-h"></i>',
						id : 'more',
						class : 'more',
		
						if : function(){
							if(!self.user.isItMe(author.address) && state) return true
						},
		
						events : {
							click : function(){
								renders.metmenu($(this))
							}
						}
					},
		
		
					info : {
						name : self.app.localization.e('info') +  ' <i class="fas fa-info-circle"></i>',
						mobile : '<i class="fas fa-info-circle"></i>',
						id : 'info',
						class : 'info',
						render : 'info',
						history : true,
						if : function(){
							return false
						}
					},
					
				}

		

		}
		
		

		var renders = {
			contents : function(_el, report){

				self.app.platform.sdk.contents.get(author.address, function(contents){

					var selected = parameters().mt

					var pp = {
						name :  'contents',
						el :   _el,
						data : {
							contents : contents,
							author : author,
							selected : selected
						},
						insertimmediately : true,
					}

					self.shell(pp, function(p){})

				})
			},

			authorcaption : function(clbk){

				self.shell({
					name :  'bgcaption',
					el :   el.authorcaption,
					data : {
						author : author,
					},
					insertimmediately : true,
				}, function(p){

					el.menu = el.authorcaption.find('.usermenu')
					el.caption = el.c.find('.bgCaption')
					el.usericon = el.c.find('.usericon');

					renders.panel()
					renders.info(el.c.find('.mobileinfo'))
					renders.menu()
					if(!isTablet())
						renders.info(el.info)


					p.el.find('.deletedsettings').on('click', () => {
						self.nav.api.go({
							open : true,
							href : 'userpage',
							inWnd : isTablet(),
							history : true,
							
							essenseData : {
								rmhistory : true
							}
						})
					})
					
					if(clbk) clbk()
				})

				

				//el.subscribe = el.c.find('.subscribebuttonstop');




				

				
				
			},
			
			metmenu : function(_el){

				var d = {};

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						d.author = author
					
						return template(d);

					}, function(el, n, close){

						el.find('.complain').on('click', function(){
							self.app.mobile.vibration.small()
							actions.complain()

							close()

						})

						el.find('.donate').on('click', function(){
							self.app.mobile.vibration.small()
							actions.donate(id)

							close()
						})

						el.find('.block').on('click', function(){
							self.app.mobile.vibration.small()
							self.app.platform.api.actions.blocking(author.address, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)	
								}
							})

							close()

						})

						el.find('.startchat').on('click', function(){

							events.startchat()

							close()
						})
						
						el.find('.unblock').on('click', function(){
							self.app.mobile.vibration.small()
							self.app.platform.api.actions.unblocking(author.address, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)	
								}
							})

							close()

						})

						el.find('.unsubscribe').on('click', function(){

							self.app.mobile.vibration.small()

							events.unsubscribe()

                            /*self.app.platform.api.actions.unsubscribe(author.address, function (tx, error) {
                                if (!tx) {
                                    self.errorHandler(error, true)
                                }
                            })*/

							close()


						})
						

					})

				}, d)

			},
			

			report : function(report, cl, npsh){

				

				actions.destroy();

				if(!report) return

				if(!report.active && report.history){

					var rem = ['mt', 's']

					if (report.id != 'shares' || cl) rem.push('ss')

					if(!npsh){

						self.app.nav.api.history.addRemoveParameters(rem, {
							report : report.id
						})

					}
						
				}

				report.active = true;

				if (renders[report.render]){
					renders[report.render](el.lenta, report)
					renders.menulight()
				}
				
			},

			menulight : function(){

				if(!el.menu) return

				el.menu.find('.usermenuitem').removeClass('active')

				var r = _.find(reports, function(r){
					return r.active
				})

				if(r){
					el.menu.find('.usermenuitem .c' + r.class).addClass('active')
				}
			},

			menu : function(clbk){
				self.shell({

					name :  'menu',
					el :   el.menu,

					data : {
						reports : reports
					},
					insertimmediately : true,

				}, function(p){

					p.el.find('.usermenuitem').on('click', function(){
						var r = $(this).attr('menuitem');

							if (reports[r] && reports[r].render)
								renders.report(reports[r])
					})

					
					
					_.each(reports, function(r, j){
						if(r.events){

							var el = p.el.find('[menuitem="'+j+'"]')

							_.each(r.events, function(e, i){
								el.on(i, e)
							})

						}
					})

					if (clbk)
						clbk();
				})
			},

			userslist : function(_el, users, empty, caption, clbk, count){
				self.nav.api.load({

					open : true,
					id : 'userslist',
					el : _el,
					animation : false,

					essenseData : {
						addresses : users,
						empty : empty,
						caption : caption,
						sort : 'commonuserrelation',
						count : count
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})
			},

			panel : function(){
				
				self.shell({

					name :  'panel',
					el :   el.authorcaption.find('.panelWrapper'),

					data : {
						author : author
					},
					insertimmediately : true,
					animation : false,

				}, function(p){

					p.el.find('.donate').on('click', () => {
						self.app.platform.ui.wallet.donate({receiver : author.address}).catch(e => {})
					})

					p.el.find('.subscribe').on('click', events.subscribe)
					p.el.find('.unsubscribe').on('click', events.unsubscribe)
					p.el.find('.startchat').on('click', events.startchat)
					p.el.find('.unblocking').on('click', function(){
		
						new dialog({
							html : self.app.localization.e('e13023'),
							btn1text : self.app.localization.e('unblock'),
							btn2text : self.app.localization.e('ucancel'),
		
							class : 'zindex',
		
							success : function(){
		
								self.app.platform.api.actions.unblocking(author.address, function(tx, error){
									if(!tx){
										self.app.platform.errorHandler(error, true)	
									}
								})
		
							}
						})
		
						
					})

					p.el.find('.notifications').on('click', events.subscribePrivate)
		
					p.el.find('.changeAccount').on('click', function(){
		
						self.nav.api.go({
							open : true,
							href : 'accounts',
							inWnd : true,
							history : true,
							essenseData : {
								toaccpage : true
							}
		
						})
					})
				
				})
			},

			info : function(_el){

					//author.state = self.psdk.userState.get(author.address)

				self.shell({

					name :  'info',
					el :   _el,

					data : {
						author : author
					},

					animation : false,
					insertimmediately : true,

				}, function(p){

					p.el.find('.showmoreabout').on('click', actions.showmoreabout)

					

					p.el.find('.copyaddress').on('click', function(){
						copyText($(this))

						sitemessage(self.app.localization.e('successcopied'))
					})

					/*p.el.find('.postcnt').on('click', function(){

						renders.report(reports.contents)

					})*/

					p.el.find('.showmoreinabout').on('click', function(){
						p.el.find('.authorinfo').addClass('displayedall')
					})
				})

			
			},

			followers : function(_el, report){

				author.data.loadRelations(['subscribers', 'blocking'], self.app.platform.sdk.user.loadRelation).then(() => {

					var u = _.map(deep(author, 'data.subscribers') || [], function(a){
						return a
					})

					var c = u.length
	
					var blocked = deep(author, 'data.blocking') || []
	
					u = _.filter(u, function(a){
						return _.indexOf(blocked, a) == -1
					})
	
					var e = self.app.localization.e('anofollowers');
	
					if(self.user.isItMe(author.address)){
						e = self.app.localization.e('aynofollowers')
					}

					renders.userslist(_el, u, e, self.app.localization.e('followers'), function(e, p){
						report.module = p;
					}, c)

				})

				
			},

			following : function(_el, report){

				author.data.loadRelations(['subscribes', 'blocking'], self.app.platform.sdk.user.loadRelation).then(() => {

					var u = _.map(deep(author, 'data.subscribes') || [], function(a){
						return a.adddress
					})

					var c = u.length

					var blocked = deep(author, 'data.blocking') || []

					u = _.filter(u, function(a){
						return _.indexOf(blocked, a) == -1
					})

					var e = self.app.localization.e('anofollowing');

					if(self.user.isItMe(author.address)){
						e = self.app.localization.e('aynofollowing')
					}

					renders.userslist(_el, u, e, self.app.localization.e('following'), function(e, p){
						report.module = p;
					}, c)

				})
			},

			blocking : function(_el, report){

				author.data.loadRelations(['blocking'], self.app.platform.sdk.user.loadRelation).then(() => {

					var u = _.map(deep(author, 'data.blocking') || [], function(a){
						return a
					})

					var e = self.app.localization.e('anoblocked');

					if(self.user.isItMe(author.address)){
						e = self.app.localization.e('aynoblocked')
					}

					renders.userslist(_el, u, e, self.app.localization.e('blockedusers'), function(e, p){
						report.module = p;
					})

				})
			},

			post : function(_el, report){

				var id = parameters().mt

				//self.app.platform.sdk.contents.get(author.address, function(contents){

					var _contents = self.app.platform.sdk.contents.getsorteditems(contents)

					var txids = _.map(_contents, function(c){
						return c.txid
					});

					var currentindex = _.indexOf(txids, id);

					var d = {
						currentindex : currentindex + 1,
						allength : txids.length,
						leftid : null,
						rightid : null
					}

					if(currentindex > 0) d.leftid = txids[currentindex - 1]
					if(currentindex < txids.length - 1) d.rightid = txids[currentindex + 1]

					self.shell({

						name :  'post',
						el :   _el,
	
						data : d
	
					}, function(p){

						var hr = 'author?address=' + author.address

						var n =  app.platform.api.name(author.address)
		
						if (n) hr = n.toLowerCase() + "?"
		
						self.app.platform.papi.post(id, p.el.find('.postcnt'), function(e, _p){					
							external = _p
							
						

							p.el.find('.postauarrows').addClass('active')

						}, {
							hr : hr
						})
	
					})
				//})

				

				

			},

		
			share : function(_el){

				if(!self.app.mobileview && !self.app.curation() && !self.app.platform.sdk.user.myaccauntdeleted()){
					self.nav.api.load({

						open : true,
						id : 'share',
						el : _el.find('.newsharewrapper'),
						animation : false,
						insertimmediately : true,
						mid : 'shareauthor',
						
						clbk : function(e, p){
	
							share = p
	
	
						},
						essenseData : {
							minimized : true,
							post : function(){
								
							}
						}
					})
				}

				
			
			},

			lenta : function(_el, report){

				/*if (self.app.curation() && !self.user.isItMe(author.address)){
					return
				}*/

				if (share){
					share.destroy()
					share = null
				}

				var load = function(){			
				
					var pp = {

						name :  'lenta',
						el :   _el,
						insertimmediately : true,
						data : {
						},
	
					}
	
					self.shell(pp, function(p){

						if(!self.app.curation()){
							if(self.user.isItMe(author.address) && !params.searchValue && !params.searchTags) renders.share(_el)

							var el = _el.find('.authorlentawrapper')
							self.nav.api.load({
		
								open : true,
								id : 'lenta',
								el : el,
								animation : false,
			
								mid : author.address,
								insertimmediately : true,
								essenseData : params,
								fade : el,
								
								clbk : function(e, p){
								
									report.module = p;
		
								}
			
							})

							if(author.data && author.data.name){
								var c = p.el.find('.authorlentawrappermain');

								p.el.find('.authorsearchicon .icon').on('click', function(){

									c.toggleClass('searchactive')

									if (c.hasClass('searchactive')){
										c.find('.search input').focus()
									}
									else
									{
										c.find('.search input').val('')
										clearsearch()
									}
								})

								if (acsearch){
									acsearch.destroy()
								}

								acsearch = new search(p.el.find('.authorsearch'), {
									placeholder : self.app.localization.e('e13140') + ' ' + author.data.name,
			
									clbk : function(_el){
			
									},
			
									last : {
										get : function(){
			
											return [];
			
										},
			
										tpl : function(result, clbk){
											
										}
									},

									right : isTablet(),
			
									events : {							
										search : function(value, clbk, e, helpers){

											var href = '';

											if (value.indexOf('#') > -1){

												var wordsRegExp = /[,.!?;:() \n\r]/g

												var words = _.uniq(_.filter(value.replace(/#/g, '').split(wordsRegExp), function(r){
													return r
												}));

												href = '?report=shares&ssat=' + words.join(' ')
											}
											else{
												href = '?report=shares&ssa=' + value
											}
			
											clearsearch(true)
			
											var p = {
												href : href,
												history : true,
												open : true,
												handler : true
											}	
			
											self.nav.api.go(p)

											
			
											if (clbk)
												clbk(true)
											
										},
			
										clear : function(fs){
											
											clearsearch()
										}
									}
									
								})

								

								if(isTablet()){
									c.addClass('searchactive')
								}
							}

						}

						
	
					})
	
					
				}

				var hr = 'author?address=' + author.address

				var n =  app.platform.api.name(author.address)

				if (n) hr = n.toLowerCase() + "?"

				var params = {
					author : author.address,
					byauthor : true,
					hr : hr,
					optimize : self.app.mobileview,
					cancelsearch : function(){
						clearsearch()
					},
					renderclbk : function(){
	

					}
				}
				

				if (parameters().r == 'b'){

					hr = n.toLowerCase() + "?r=b&mt=" + parameters().mt
					params.beginmaterial = parameters().mt
					params.contents = true	

					self.app.platform.sdk.contents.get(author.address, function(contents){

						var _contents = self.app.platform.sdk.contents.getsorteditems(contents)

						params.txids = _.map(_contents, function(c){
							return c.txid
						});

						load()
					})

				}
				else{

					if (parameters().ssa){
						params.search = true
						params.searchValue = parameters().ssa
						params.loader = function(clbk){

							var _clbk = function(data){

								self.app.psdk.share.insertFromResponseSmall(data)

								var shares = self.app.psdk.share.gets(_.map(data, (s) => {
									return s.txid
								}))

								if (clbk)
									clbk(shares, null, {
										count : 10
									})
							}

							
							makenext('posts', deep(result, 'data.length') || 0, 10, function(data){
								_clbk(data)
							})
							
						}
					}

					if (parameters().ssat){
						var tgsi = decodeURI(parameters().ssat || '')

						var words = _.uniq(_.filter(tgsi.split(wordsRegExp), function(r){
							return r
						}));

						params.searchTags = words.length ? words : null

					}

					load()

				}


				
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var result = null;

		var clearsearch = function(light){
			if (parameters().ssa || parameters().ssat){

				self.app.platform.sdk.search.clear()

				result = null
				fixedBlock = null

				if(!light){
					self.app.nav.api.history.removeParameters(['ssa', 'ssat'])
					renders.report(reports.shares, true)
				}
			}
		}

		var makenext = function(type, start, count, clbk){

			var l = 0;
			var L = 10;

			if (result){
				l = result.data.length;
				L = result.count;
			}

			if(start + count <= l){
				return
			}

			if (start < l){
				var d = l - start;

				start = l;
				count = count - d;
			}
			
			if(start + count > L) count = L - start

			if(count <= 0) return

			load[type](function(data){

				if(clbk)
				{
					clbk(data)
				}

			}, start, count)	

		}

		var load = {

			posts : function(clbk, start, count){
				self.app.platform.sdk.search.get(parameters().ssa, 'posts', start, count, fixedBlock || null, function(r, block){

					fixedBlock = block
					
					result || (result = r);

					clbk(result.data);

				}, author.address)
			},
		}

		var relationsClbk = function(address){

			if (address == author.address){
				renders.panel()
			}

			if(address == author.address || author.address == self.app.user.address.value){

				window.rifticker.add(() => {

					if(!el.c) return

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())

				})

			}
		}

		var initEvents = function(){

			el.up.on('click', events.up)

			

			self.app.platform.ws.messages.event.clbks.author = function(data){
			
				if(data.mesType == 'subscribe' || data.mesType == 'unsubscribe'){

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
					
				}
				
			}
			/*
			self.app.platform.clbks.api.actions.subscribe.author = function(address){

				if (address == author.address){

					if (el.subscribe) el.subscribe.addClass('following')

					el.c.find('.notificationturn').removeClass('turnon')	

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}

				if(self.app.user.address.value.toString('hex') == author.address){
					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}
			}

			self.app.platform.clbks.api.actions.subscribePrivate.author = function(address){

				if(address == author.address){
					if (el.subscribe)
						el.subscribe.addClass('following')

					el.c.find('.notificationturn').addClass('turnon')	

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}

				if(self.app.user.address.value.toString('hex') == author.address){
					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}
			}

			self.app.platform.clbks.api.actions.unsubscribe.author = function(address){

				if(address == author.address){

					if (el.subscribe)
						el.subscribe.removeClass('following')


					el.c.find('.notificationturn').removeClass('turnon')	

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())

				}

				if(self.app.user.address.value.toString('hex') == author.address){
					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}


			}

			self.app.platform.clbks.api.actions.blocking.author = function(address){

				if(address == author.address){

					if (el.caption)
						el.caption.addClass('blocking');

					el.c.find('.notificationturn').removeClass('turnon')
				}

				
			}

			self.app.platform.clbks.api.actions.unblocking.author = function(address){

				if(address == author.address){
					if (el.caption)
						el.caption.removeClass('blocking');
				}

			}*/

			self.app.platform.actionListeners.author = function({type, alias, status}){

				if(type == 'unblocking'){
					relationsClbk(alias.address.v)
				}

				if(type == 'blocking'){
					relationsClbk(alias.address.v)
				}

				if(type == 'subscribe'){
					relationsClbk(alias.address.v)
				}

				if(type == 'unsubscribe'){
					relationsClbk(alias.address.v)
				}

				if(type == 'subscribePrivate'){
					relationsClbk(alias.address.v)
				}

				if(type == 'userInfo'){
					if(alias.address == author.address){
						renders.authorcaption()
					}
				}

				if (type == 'accDel'){
					if(alias.address == author.address){
						renders.authorcaption()
					}
				}
				
			}

		}

		var make = function(ini){

			var r = parameters().report || (self.app.curation() ? '' : 'shares')

			if (reports[r])
				reports[r].active = true;

			

			renders.report(reports[r], null, ini)

			self.app.user.isState(function(state){

				if(state){
					var me = self.psdk.userInfo.getmy()
					
					if (me && me.relation(author.address, 'blocking')){
						el.caption.addClass('blocking');
					}
				}
				
				

			})
			
			if(!isMobile()){
				upbutton = self.app.platform.api.upbutton(el.up, {
					top : function(){
						return '65px'
					},
					class : 'light',
					rightEl : el.c.find('.leftpanelcell')
				})	
			}
			
			
		}

		var init = function(){

			renders.authorcaption(function(){
				make(true);

				self.sdk.activity.adduser('visited', author.address)

				if(self.user.isItMe(author.address)){
					self.app.nav.api.backChainClear()
				}
			})

			
		}

		var redir404 = function(){

			setTimeout(() => {
				self.app.el.html.removeClass('allcontent')

				self.app.nav.api.load({
					open : true,
					href : 'page404',
					history : true,
					replaceState : true,
					fade : self.app.el.content

				})
			}, 400)
			
		}

		var preinit = function(address, clbk){

			author = {};

			if (address){
				
				author.address = address

				/*self.sdk.ustate.get(author.address, function(){
					
				})*/

				self.sdk.users.get(author.address, function(){

					var deleted = typeof self.app.platform.sdk.user.deletedaccount != 'undefined' ? self.app.platform.sdk.user.deletedaccount(author.address) : false

					author.data = self.psdk.userInfo.get(author.address)


					
					if(author.data && (!deleted || self.app.user.isItMe(author.address))){

						if(self.app.platform.sdk.user.reputationBlockedRedirect(address)){
	
							self.app.el.html.removeClass('allcontent')
	
							return
						}
	
						if (author.address != self.app.user.address.value){
							reports.shares.name = self.app.localization.e('uposts')
						}
						else
						{
							reports.shares.name = self.app.localization.e('myuposts')
	
							if(!self.app.user.validate()){

								setTimeout(() => {
	
									self.app.el.html.removeClass('allcontent')
		
									self.nav.api.load({
										href : 'userpage?id=test',
										history : true,
										open : true,
										replaceState : true,
										fade : self.app.el.content
									})

								}, 400)
	
								return;
							}
						
						}
	
	
						var data = {
							author : author
						};

	
						clbk(data);


					}

					else{

						if(self.app.user.isItMe(author.address)){
							if(!self.app.user.validate()){

								setTimeout(() => {
	
									self.app.el.html.removeClass('allcontent')
		
									self.nav.api.load({
										href : 'userpage?id=test',
										history : true,
										open : true,
										replaceState : true,
										fade : self.app.el.content
									})

								}, 400)
	
								return;
							}
						}
						else{
							redir404()
						}

						
					}
	
				}, true)
	
	
				return

			}

			redir404()
		}
		

		return {
			primary : primary,

			parametersHandler : function(){

				var r = parameters().report || (self.app.curation() ? '' : 'shares')

				var address = parameters().address

				if (address && author.address != address){

					preinit(address, function(){
						init()
					})

				}
				else{

					var active = _.find(reports, function(r){
						return r.active
					})

					if (active && (active.id == r || (!r && active.id == 'shares') ) && !parameters().ssa && !parameters().ssat){
						return
					}

					renders.report(reports[r], null, true)
					renders.menu()
				}
				

			},

			authclbk : function(){

				var active = _.find(reports, function(r){
					return r.active
				})

				if(active && active.id != 'shares'){
					renders.report(active, null, true)
				}

				actions.subscribeLabel()
			},

			getdata : function(clbk, settings){

				self.app.el.html.addClass('allcontent')

				self.app.platform.sdk.search.clear()

				var ed = settings.settings.essenseData || {}

				var p = parameters();

				p.address || (p.address = ed.address || self.app.user.address.value || '')

				contentsready = false

				fixedBlock = null

				result = null

				initreports()

				self.loadTemplate({
					name : 'info'
				}, function(){

					self.sdk.users.addressByName(p.address, function(address){

						preinit(address, clbk)
					})

				})
				
			},

			destroy : function(href, p){

				if(el.c) el.c.empty()

				if (share){
					share.destroy()
					share = null
				}

				if (upbutton)
					upbutton.destroy()

					upbutton = null

				if (panel)
					panel.destroy();

				if (acsearch){
					acsearch.destroy()
					acsearch = null
				}

				delete self.app.platform.actionListeners.author

				delete self.app.platform.ws.messages.event.clbks.author
				delete self.app.platform.clbks.api.actions.subscribe.author
				delete self.app.platform.clbks.api.actions.unsubscribe.author
				delete self.app.platform.clbks.api.actions.subscribePrivate.author

				actions.destroy();

				author = null

				el = {};

				if(href != 'author')
					self.app.el.html.removeClass('allcontent')

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.lenta = el.c.find('.lentaWrapper');
				
				

				el.up = el.c.find('.upbuttonwrapper');
				el.w = self.app.el.window;
				el.contents = el.c.find('.contentswrapper')
				el.info = el.c.find('.authorinfoWrapper')
				el.authorcaption = el.c.find('.bgCaptionWrapper')

				initEvents();
				init()

				p.clbk(null, p);
			},

			wnd : {			
				class : 'normalizedmobile',
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(href, p){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy(href, p);
			})

		})

	}

	self.authclbk = function(){
		_.each(essenses, function(e){
			e.authclbk()
		})
	} 

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = author;
}
else{

	app.modules.author = {};
	app.modules.author.module = author;

}