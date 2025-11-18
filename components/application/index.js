var application = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata, curpath, userAddress, isUserAuthor, grantedPermissions, scores, userRating, comments, hasReviewsSupport;

		var calculateRatingStats = function(scores) {
			if (!scores || !scores.length) {
				return {
					averageRating: 0,
					totalRatings: 0,
					distribution: [
						{ stars: 5, count: 0, percentage: 0 },
						{ stars: 4, count: 0, percentage: 0 },
						{ stars: 3, count: 0, percentage: 0 },
						{ stars: 2, count: 0, percentage: 0 },
						{ stars: 1, count: 0, percentage: 0 }
					]
				}
			}

			var total = scores.length
			var sum = 0
			var distribution = [0, 0, 0, 0, 0]

			scores.forEach(function(score) {
				var value = parseInt(score.value) || 0
				sum += value
				if (value >= 1 && value <= 5) {
					distribution[value - 1]++
				}
			})

			var average = total > 0 ? (sum / total).toFixed(1) : 0

			var createDistributionItem = function(stars, index) {
				return {
					stars: stars,
					count: distribution[index],
					percentage: total > 0 ? Math.round((distribution[index] / total) * 100) : 0
				}
			}

			return {
				averageRating: parseFloat(average),
				totalRatings: total,
				distribution: [
					createDistributionItem(5, 4),
					createDistributionItem(4, 3),
					createDistributionItem(3, 2),
					createDistributionItem(2, 1),
					createDistributionItem(1, 0)
				]
			}
		}

		var findUserRating = function(scores, userAddress) {
			if (!scores || !userAddress) return null
			var userScore = scores.find(function(score) {
				return score.address === userAddress
			})
			return userScore ? parseInt(userScore.value) : null
		}

		var mapCommentsToReviews = function(comments) {
			if (!comments || !comments.length) return []

			return comments.filter(comment => !comment.deleted).map(function(comment) {
				console.log(comment, 'comment')
				var userInfo = self.psdk.userInfo.get(comment.address) || {}
				console.log(userInfo, 'userInfo')
				return {
					userName: userInfo.name || 'Anonymous',
					text: comment.message || '',
					userAvatar: userInfo.image,
					date: comment.time ? new Date(comment.time).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
					id: comment.id,
					address: comment.address
				}
			})
		}

		var loadUserInfoForComments = function(comments, callback) {
			if (!comments || comments.length === 0) {
				if (callback) callback()
				return
			}

			var addresses = comments.map(function(c) { return c.address }).filter(Boolean)
			if (addresses.length === 0) {
				if (callback) callback()
				return
			}

			self.psdk.userInfo.load(addresses).then(callback).catch(function(err){
				console.error('Error loading user info:', err)
				if (callback) callback()
			})
		}

		var actions = {
			deleteComment : function(comment, clbk){
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

			loadscores : function(callback){
				if (!application || !application.hash) {
					if (callback) callback()
					return
				}

				self.app.platform.sdk.postscores.get(application.hash, function(){
					scores = self.psdk.postScores.get(application.hash) || []
					userRating = findUserRating(scores, userAddress)
					if (callback) callback()
				})
			},

			loadcomments : function(callback){
				if (!application || !application.hash) {
					if (callback) callback([])
					return
				}
				var nodes = ['94.156.128.149:38081']
				self.app.platform.sdk.comments.getclear(application.hash, "", function (loadedComments, error) {
					if (error) {
						console.error('Error loading comments:', error)
						comments = []
						if (callback) callback(comments)
					} else {
						comments = loadedComments || []
						loadUserInfoForComments(comments, function () {
							if (callback) callback(comments)
						})
					}
				}, {
					rpc: {
						fnode: nodes[rand(0, nodes.length - 1)]
					}
				})
			},

			openreviews : function(){
				globalpreloader(true, true)
				if (!hasReviewsSupport) return

				actions.loadscores(function(){
					actions.loadcomments(function(){
						globalpreloader(false)
						renders.reviews()
					})
				})
			},

			openreviewform : function(){
				if (!application.installed) {
					sitemessage(self.app.localization.e('mustInstallToComment'))
					return
				}
				renders.reviewform()
			},

			openratingform : function(){
				if (!application.installed) {
					sitemessage(self.app.localization.e('mustInstallToRate'))
					return
				}
				renders.ratingform()
			},

			install : function(){
				

				globalpreloader(true)

				self.app.apps.install({
					...application,
					develop: true,
					version: numfromreleasestring(application.version || '1.0.0')
				}).then(() => {
					successCheck()
				}).catch(e => {
					console.error(e)
					sitemessage(self.app.localization.e('miniApp_installErrorMessage'), null, 5000)
				}).finally(() => {
					globalpreloader(false)
				})
	
			},
			gotohome : function(){

				if(self.container){
					self.closeContainer()
				}
				else{
					self.app.platform.ui.goback('index')
					/*self.app.nav.api.load({
						open : true,
						href : 'index',
	
						///href : 'home',
						history : true,
					})*/
				}

				
			},
			openinfo : function(){

				console.log('application', application)

				app.nav.api.load({
                    open : true,
                    id : 'applicationmeta',
                    inWnd : true,

                    essenseData : {
                        application : application.manifest.id,

						/*onremove : function(){
							actions.gotohome()
						}*/
                    }
                })
			},

			getpath : function(){
				var p = parameters().p || ''
				var decoded = ''

				if (p){

					try{
						decoded = hexDecode(p)
					}
					catch(e){
	
					}
				}

				return decoded


			}
		}

		const iframePermissionMap = {
			mobilecamera: "camera",
			geolocation: "geolocation",
			notifications: "notifications",
			microphone: "microphone",
		};

		var events = {
			pageevents : function(p, s){

				var sl = '.settings .icon'

				//if(isMobile() && !s) sl = '.abssettings .icon'

				p.el.find(sl).on('click', function(){
					renders.menu($(this))
				})

				p.el.find('.info').on('click', function(){
					actions.openinfo()
				})

				var chatel = p.el.find('.chat')

				chatel.on('click', events.chats.click)
				events.chats.init(chatel)
			},

			loaded : function(p){
				
				if(!application || !appdata) return
				
				if (p.application == appdata.id){
					el.c.find('.iframewrapper').addClass('loaded')
				}

				setTimeout(() => {
					if (el.c)
						el.c.find('.captionRow').addClass('notactive')
				}, 2000)
				
			},

			changestate : function(p = {}){
				if(!p.data) return
				if(!application || !appdata) return


				if (p.application == appdata.id/* && p.data.encoded*/){

					self.app.nav.api.history.addRemoveParameters([], {
						p: p.data.encoded
					}, {
						replaceState: p.data.replace
					})

					curpath = actions.getpath()
					
				}
			},

			permissionsChanged: function (p = {}) {
				const allowedStates = ['granted', 'forbid'];
				if (!allowedStates.includes(p.state)) return;

				if (!application || !appdata) return;
				if (p.application !== appdata.id) return;

				if (iframePermissionMap[p.permission]) {
					grantedPermissions = grantedPermissions || [];

					if (p.state === 'granted') {
						if (!grantedPermissions.find(perm => perm.id === p.permission)) {
							grantedPermissions.push({
								id: p.permission,
								state: 'granted'
							});
						}
					} else {
						grantedPermissions = grantedPermissions.filter(perm => perm.id !== p.permission);
					}

					renders.frameremote();
				}
			},

			installed : function(p = {}){				
				if (p.application?.id == application?.id){
					remake(p.application.id)
				}
			},

			removed : function(p = {}){

				if (p.application.manifest.id == application.manifest.id){
					remake(p.application.manifest.id)
				}
			},


			chats : {
				click : function(){

					var show = deep(self, 'app.platform.matrixchat.core.apptochat')

					if (show) {
						self.app.mobile.vibration.small()
						show()
					}

				},

				init : function(el){

					var setH = function(c){
						if(c){
							el.addClass('amountHave')
						}else{
							el.removeClass('amountHave')
						}

						el.find('.amount').html(c)
					}

					self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.application = function(count){
						setH(count)
					}

					setH(self.app.platform.matrixchat.getNotificationsCount())
				},

			},
		}

		var renders = {

			menu : function(el){

				var d = {application}

				self.fastTemplate('metmenu', (rendered, template) => {

					self.app.platform.api.tooltip(el, function(){

						return template(d);

					}, function(el, f, close){

						el.find('.settings').on('click', function(){
							actions.openinfo()

							close()
						})

						el.find('.reviews').on('click', function(){
							actions.openreviews()

							close()
						})

						el.find('.close').on('click', function(){
							actions.gotohome()

							close()
						})

					})

				}, d)


			},

			install : function(clbk){
				actions.loadscores(function(){
					actions.loadcomments(function(){
						var ratingStats = calculateRatingStats(scores)
						var reviewsList = mapCommentsToReviews(comments)

						var reviewsData = Object.assign({}, ratingStats)
						if (reviewsList.length > 0) {
							reviewsData.reviews = reviewsList
						}

						self.shell({
							name :  'install',
							el :   el.c,
							data : {
								application,
								ratingsData: reviewsData,
								hasReviewsSupport: hasReviewsSupport
							},
						}, function(p){
							p.el.find('.installButton button').on('click', function(){
								actions.install()
							})

							p.el.find('.back').on('click', function(){
								actions.gotohome()
							})

							p.el.find('.viewAllReviews').on('click', function(){
								actions.openreviews()
							})

							events.pageevents(p, true)

							if (clbk)
								clbk();
						})
					})
				})
			},

			reviews : function(clbk){
				var ratingStats = calculateRatingStats(scores)
				var reviewsList = mapCommentsToReviews(comments)

				var reviewsData = Object.assign({}, ratingStats)
				if (reviewsList.length > 0) {
					reviewsData.reviews = reviewsList
				}
				const canWriteReview = application.installed && !!userAddress && appdata.address !== userAddress
				self.shell({
					name :  'reviews',
					el :   el.c,
					data : {
						application,
						ratingsData: reviewsData,
						canWriteReview,
						userRating: userRating,
						hasUserRated: userRating !== null,
						userAddress: userAddress
					},
				}, function(p){
					p.el.find('.back').on('click', function(){
						if(application.installed){
							renders.frameremote()
						} else {
							renders.install()
						}
					})

					p.el.find('.rateAppButton').on('click', function(){
						actions.openratingform()
					})

					p.el.find('.writeReviewButton').on('click', function(){
						actions.openreviewform()
					})

					p.el.find('.deleteReviewButton').on('click', function(){
						var commentId = $(this).data('comment-id')
						var comment = comments.find(function(c){ return c.id === commentId })

						if (!comment) return

						new dialog({
							html : self.app.localization.e('e13032'),
							success : function(){

								actions.deleteComment(comment, function(err){

									if(!err)
									{
										sitemessage('Comment deleted')
										actions.loadcomments(function(){
											renders.reviews()
										})
									}

								})

							},
							btn1text : self.app.localization.e('e13034'),
							btn2text : self.app.localization.e('e13035'),
							class : 'zindex',
						})
					})

					events.pageevents(p, true)

					if (clbk)
						clbk();
				})
			},

			reviewform : function(clbk){

				self.shell({

					name :  'reviewform',
					el :   el.c,
					data : {
						application
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						renders.reviews()
					})

					p.el.find('#reviewText').on('input', function(){
						var length = $(this).val().length
						p.el.find('#reviewText').closest('.formGroup').find('.currentCount').text(length)
						validateForm()
					})

					var validateForm = function(){
						var reviewText = p.el.find('#reviewText').val().trim()
						var isValid = reviewText.length >= 10

						p.el.find('.submitReviewButton').prop('disabled', !isValid)
					}

					p.el.find('.cancelButton').on('click', function(){
						renders.reviews()
					})

					p.el.find('.submitReviewButton').on('click', function(){
						var btn = $(this)
						var reviewText = p.el.find('#reviewText').val().trim()

						if (!reviewText || reviewText.length < 10) {
							sitemessage(self.app.localization.e('commentMinLength'))
							return
						}

						btn.prop('disabled', true)
						btn.html('<i class="fas fa-spinner fa-spin"></i>')

						var comment = new Comment(application.hash)
						comment.message.set(reviewText)

						self.app.platform.sdk.comments.send(comment, function(error, alias){
							if (error) {
								console.error('Error sending comment:', error)
								sitemessage(self.app.localization.e('commentSendError'))
								btn.prop('disabled', false)
								btn.html(self.app.localization.e('submitReview'))
							} else {
								sitemessage(self.app.localization.e('commentSent'))
								renders.reviews()
							}
						})
					})

					events.pageevents(p, true)

					if (clbk)
						clbk();
				})
			},

			ratingform : function(clbk){

				var selectedRating = 0

				self.shell({

					name :  'ratingform',
					el :   el.c,
					data : {
						application
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						renders.reviews()
					})

					p.el.find('.starRatingInput i').on('click', function(){
						selectedRating = $(this).data('rating')

						p.el.find('.starRatingInput i').each(function(){
							var starRating = $(this).data('rating')
							$(this).removeClass('fas far').addClass(starRating <= selectedRating ? 'fas' : 'far')
						})

						p.el.find('.ratingLabel').text(self.app.localization.e('yourRating') + ': ' + selectedRating + ' ' + self.app.localization.e('outOf5'))

						p.el.find('.submitRatingButton').prop('disabled', false)
					})

					p.el.find('.cancelRatingButton').on('click', function(){
						renders.reviews()
					})

					p.el.find('.submitRatingButton').on('click', function(){
						var btn = $(this)

						btn.prop('disabled', true)
						btn.html('<i class="fas fa-spinner fa-spin"></i>')

						self.app.platform.sdk.upvote.checkvalue(
							selectedRating,
							function () {
								const obj = self.psdk.miniapp.get(application.id)
								var upvoteShare = obj.upvote(selectedRating, userAddress);

								if (!upvoteShare) {
									self.app.platform.errorHandler("4", true);
									btn.prop('disabled', false)
									btn.html(self.app.localization.e('submitRating'))
									return;
								}

								self.app.platform.actions
									.addActionAndSendIfCan(upvoteShare)
									.then(() => {
										sitemessage(self.app.localization.e('ratingSent'))
										renders.reviews()
									})
									.catch((e) => {
										self.app.platform.errorHandler(e, true);
										btn.prop('disabled', false)
										btn.html(self.app.localization.e('submitRating'))
									});
							},
							function () {
								btn.prop('disabled', false)
								btn.html(self.app.localization.e('submitRating'))
							}
						);
					})

					events.pageevents(p, true)

					if (clbk)
						clbk();
				})
			},

			error : function(error, clbk){

				self.shell({

					name :  'error',
					el :   el.c,
					data : {
						application,
						error
					},

				}, function(p){

					events.pageevents(p, true)
					
					if (clbk)
						clbk();
				})
			},
			frame : function(html, clbk){

				/// unsafe, no use

				/*var blb = new Blob([html], {type: "text/html"});

				var src = URL.createObjectURL(blb)*/

				self.shell({

					name :  'frame',
					el :   el.c,

					data : {
						application
					},

				}, function(p){

					//iframeElem.contentDocument.documentElement.appendChild(m);

					var frame = p.el.find('iframe')[0]

					frame.contentWindow.document.open();
					frame.contentWindow.document.write(html);
					frame.contentWindow.document.close();

					events.pageevents(p)

					p.el.find('.back').on('click', function(){
						actions.gotohome()
					})

					if (clbk)
						clbk();
				})	
			},
			frameremote : function(scope, clbk){	
				let _scope = scope;
				const tscope = appdata.tscope 				

				if(!_scope) {
					const hasTestScope = Boolean(tscope);
					
					_scope = isUserAuthor && hasTestScope ? tscope : appdata.scope;
				}			

				var src = self.app.apps.normalizeScopeUrl(_scope + '/' + (actions.getpath() || application.manifest.start || ''))
				curpath = actions.getpath()

				/*if(window.testpocketnet){
					src = src + '?testnetwork=true'
				}*/

				const buildIframeAllowAttr = (permissions = []) => {					

          return permissions
            .map((p) => iframePermissionMap[p?.id])
            .filter(Boolean)
            .join("; ");
        };

				self.app.el.miniapps.hide();

        const iframeAllowAttr = buildIframeAllowAttr(grantedPermissions || []);

				
				self.shell({

					name :  'frameremote',
					el :   el.c,

					data : {
						application,
						iframeAllowAttr,
						isInDevMode: _scope === tscope,
						tscope: isUserAuthor && tscope,
						scope: appdata.scope,
						src,
						hasReviewsSupport: hasReviewsSupport
					},

				}, function(p){

					events.pageevents(p)

					p.el.find('.back').on('click', function(){
						if(self.app.electronview && history.length){
							history.back()
						}
						else{
							actions.gotohome()
						}
					})

					p.el.find('.reviewsBtn').on('click', function(){
						actions.openreviews()
					})

					p.el.find('.forward').on('click', function(){
						if (history.length) {
							history.forward()
						}
					})

					p.el.find('#domain-switch')?.on('change', function () {
						const isDevMode = this.checked;
						renders.frameremote(isDevMode ? tscope : appdata.scope);
					})

					p.el.find('.refresh').on('click',()=>{

						var electron = require('electron');

						if (electron)
							electron.ipcRenderer.send('electron-refresh');
					})

					if (clbk)
						clbk();
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
			self.app.apps.on('loaded', events.loaded)
			self.app.apps.on('changestate', events.changestate)

			self.app.apps.on('installed', events.installed)
			self.app.apps.on('permissions:changed', events.permissionsChanged)
			self.app.apps.on('removed', events.removed)


		}

		var remake = function(id){

			application = null
			appdata = null

			self.app.apps.get.application(id).then((f) => {

				if (f){
					application = f.application
					appdata = f.appdata?.data
				}

				make()

			}).catch(e => {
				make()
			})
		}

		var make = function(){

			if(!application){
				renders.error('application_notexist')
				return
			}

		if(!application.installed){
				renders.install()
				return
			}

			renders.frameremote()

			/*if (application.develop && !application.production){
				renders.frameremote()
			}
			else{

				self.app.apps.get.output(application.manifest.id).then((html) => {

					renders.frame(html)

				}).catch(e => {
					console.error(e)
					renders.error(e)
				})
				
			}*/

		}

		return {
			primary : primary,

			parametersHandler : function() {
				var id = parameters().id,
					p = parameters().p;

				if (id && (!application || application.manifest.id !== id)){

					remake(id)

					return
				}

				if (application && application.manifest.id == id) {

					var decoded = actions.getpath()

					if (decoded == curpath) return

						curpath = decoded

						self.app.apps.emit('changestate', {
							route : decoded
						}, application.manifest.id)

				
				}
			},
			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}
				
				window.rifticker.add(() => {
					self.app.el.html.addClass('allcontent_application')
					self.app.mobile.reload.destroyparallax()
				})

				var id = ed.application || parameters().id

				var path = ed.path || ''

				application = null
				appdata = null

      	userAddress = self.app.user.address.value;
				self.app.apps.get.application(id).then(async (f) => {
					globalpreloader(true, true)
					if (f){
						hasReviewsSupport = !!(self.psdk.miniapp.get(f.application.id))
						if(!hasReviewsSupport) {
						 	const app = await self.sdk.miniapps.getbyid(id)
							hasReviewsSupport = !!app
						}

						application = f.application
						
						appdata = f.appdata?.data
						grantedPermissions = f.appdata?.permissions?.filter(permission => permission.state === 'granted')
						isUserAuthor = appdata && appdata.address === userAddress;

						if (ed.application){

							var ps = {}

							if(path) ps.p = path

							if(!ed.inWnd)
								ps.id = id

							self.app.nav.api.history.addRemoveParameters([], ps, {
								replaceState: true
							})
						}
					}
					
					
					
	
					var data = {
						ed
					};

					globalpreloader(false)
					clbk(data);

				}).catch(e => {

					if(e == 'missing:application'){

					}

					console.error(e)

					ed = p.settings.essenseData

					var data = {
						ed
					};
	
					globalpreloader(false)
					clbk(data);
				})
			},

			destroy : function(){
				ed = {}
				el = {};

				window.rifticker.add(() => {
					self.app.el.html.removeClass('allcontent_application')
					self.app.mobile.reload.initparallax()
				})

				self.app.apps.off('loaded', events.loaded)
				self.app.apps.off('changestate', events.changestate)

				self.app.apps.off('permissions:changed', events.permissionsChanged)
				
				self.app.el.miniapps.show();

				self.app.apps.off('installed', events.installed)
				self.app.apps.off('removed', events.removed)

					delete self.app.platform.matrixchat.clbks.ALL_NOTIFICATIONS_COUNT.application
			},
			
			init : function(p){

				state.load();

				curpath = ''

				el = {};
				el.c = p.el.find('#' + self.map.id + "fx");

				initEvents();

				make()

				p.clbk(null, p);

			
			},

			clearparameters: ['id', 'p'],

			wnd : {			
				class : 'appwindow',
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
	module.exports = application;
}
else{

	app.modules.application = {};
	app.modules.application.module = application;

}
