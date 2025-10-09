var activities = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = deep(p, 'history');

		var el, loading, scnt, currentFilter = 'all', end = false, block;

		var ed = {}

		var filtersList = ['all', 'interactions', 'comment', 'subscriber', 'blocking', 'video']

			filtersList.push('pending')

		var activities = []
		var videos = []

		var activitiesByGroup = {}

		var getters = {
			getFilters: function (filter) {
				if (filter === 'all') return []
				if (filter === 'interactions') return ['contentscore', 'boost', 'commentscore']
				if (filter === 'comment') return ['comment', 'answer']
				if (filter === 'subscriber') return ['subscriber']
				if (filter === 'blocking') return ['blocking']
				if (filter === 'video') return ['video']
				if (!filter) return ['']
				return [filter]
			},

			formatActivities: function (ids) {

				activitiesByGroup[currentFilter] || (activitiesByGroup[currentFilter] = [])

				var activities = activitiesByGroup[currentFilter]

				let res = activities.map(i => {
					if (i.description) {
						try {
							i.description = JSON.parse(i.description)
						} catch (e) {
							console.error(e)
						}

					}

					if (!i.description && i.relatedContent?.description) {
						try {
							i.description = JSON.parse(i.relatedContent.description)
						} catch (e) {
							i.description = {}
							i.description.message = i.relatedContent.description
							console.error(e)

						}
					}
					if (i.time) {

						i.date = moment.unix(i.time)
					}
					if (i.outputs && i.inputs) {
						let out
						let inp
						if (i.type === 'boost') {
							out = i.outputs
							inp = i.inputs
							i.value = inp.reduce((a, b) => a + b.value, 0) - out.reduce((a, b) => a + b.value, 0)
						} else {
							out = i.outputs.filter(t => t.addresshash === i.relatedContent.address)
							inp = i.inputs.filter(t => t.addresshash === i.relatedContent.address)
							i.value = out.reduce((a, b) => a + b.value, 0) - inp.reduce((a, b) => a + b.value, 0)
						}

					}

					return i
				})

				res = _.filter(res, (f) => {
					return !ids || _.indexOf(ids, f.hash) > -1
				})

				res = group(res, function (n) {
					var currentDate = new Date();

					var d = n.date._d
					if (d.addMinutes(60) > currentDate) return 'ntlasthour';

					if (d.addMinutes(1440) > currentDate) return 'nttoday';
					if (d.addMinutes(2880) > currentDate) return 'ntyesterday';

					if (d.getFullYear().toString() + (d.getMonth() + 1).toString() == currentDate.getFullYear().toString() + (currentDate.getMonth() + 1).toString()) return 'ntmounth';

					return 'ntearlier';

				})

				return res
			},

			activity : function(tid){
				var activity = null

				_.find(activitiesByGroup, (a) => {
					if(_.find(a, (a) => {

						if(a.hash == tid || a.txid == tid) {
							activity = a

							return true
						}

					})) return true
				})


				return activity
			}
		}

		var actions = {

			applyFilter : function(filter){
				
				activities = []

				end = false

				if (filter) {
					currentFilter = filter;

					try{
						localStorage['activityFilter'] = currentFilter
					}
					catch (e){
					}

				}

				renders.showcurrentFilter()

				var promise = currentFilter === 'video' ? actions.getDataVideos : (currentFilter === 'pending' ? actions.getActions : actions.getdata)

				promise(filter, true).then((data) => {

					if(currentFilter != filter) return

					if(currentFilter === 'pending'){
						renders.actions(data)
					}
					else{
						renders.content()
					}
					
					
				}).catch(e => {
					console.error(e)
				}).finally(() => {
					
				})

				
			},

			setloading: function (v) {
				loading = v
				if (loading) {
					el.loader[0].style.display = 'block'
					//renders.content()
				} else {
					el.loader[0].style.display = 'none'
					//renders.content()
				}

			},

			getdata: function (filter, clear) {
				actions.setloading(true)

				activitiesByGroup[filter] || (activitiesByGroup[filter] = [])

				if(clear) activitiesByGroup[filter] = []

				var activities = activitiesByGroup[filter]

				var blockNumber = activities.length ? activities[activities.length - 1].height : self.app.platform.currentBlock

				return self.app.api.rpc('getactivities', 
					[self.user.address.value, blockNumber, null, getters.getFilters(filter)]
				).then((data) => {

					if (!data.length) {
						end = true
					}

					data = _.uniq(data, (d) => {
						return d.hash
					})

					
					activitiesByGroup[filter].push(...data)

					return Promise.resolve(data)

				}).finally(() => {
					actions.setloading(false)
				})

			},

			getActions : () => {
				var account = self.app.platform.actions.getCurrentAccount()

				if (account){
					return Promise.resolve(_.sortBy(account.getTempActions(null, null, true), (a) => {
						return -a.added
					}))
				}else{
					return Promise.resolve([])
				}
			},

			getDataVideos: () => {

				actions.setloading(true)
				activitiesByGroup['video'] = []

				let a = actions.getVideos()

				if (!a.length) {
					actions.setloading(false)
					return Promise.resolve([])
				}

				return Promise.all(_.map(a, (i) => {
					return i.then((value) => {
						/*let c = new Promise((res) => {
							return self.sdk.users.get([value?.original?.account?.name], (info) => {
								info ? value.info = info[0] : value.info = self.sdk.users.storage[value?.original?.account?.name]
								info ? value.info = info[0] : value.info = self.sdk.users.storage[value?.original?.account?.name]
								res(value)
							})
						})*/

						
						return value

					}).then(readyVideo => {

						activitiesByGroup['video'].push(readyVideo)

					}).catch(e => {
						console.log('err', e)
					})

				})).then(() => {

					activitiesByGroup['video'] = _.sortBy(activitiesByGroup['video'], (v) => {return -v.date}) 

					actions.setloading(false)

					return Promise.resolve(videos)
				})

			},

			getVideos: () => {

				
				
				let vid = self.app.platform.sdk.videos.historygetall()
				let res = []
				

				_.each(vid, (d) => {



					var video = (d.data || {}).share

					if(!video) return

					let a = new Promise((resolve, reject) => {
						self.app.platform.sdk.videos.info([video.url]).then(r => {

							if (!r?.[0]?.[0]?.data) {

								let p = self.app.platform.sdk.videos.storage[video.url]

								if (!p) return reject('np')

									resolve({ ...p.data, date: new Date(d.date), name: video.caption, comments: video.comments, txid: video.txid, rating: +video.scnt === 0 ? 0 : +video.score / +video.scnt })


								return
							}
							resolve({ ...r[0][0].data, date: new Date(d.date), name: video.caption, comments: video.comments, txid: video.txid, rating: +video.scnt === 0 ? 0 : +video.score / +video.scnt })

						}).catch(e => {
							console.error(e)

							return Promise.resolve()
						})
					})

					res.push(a)
				})

				return res
			},

			openPost(data) {

				let href, answer, parent

				console.log('data', data)

				if (data) {
					if (data?.txid) {
						href = data.txid
					} else {
						href = data.txType === 301 ? data.relatedContent.postHash : data.type === "answer" ? data.postHash : (data.relatedContent.rootTxHash || data.relatedContent.hash)

						if(data.txType == 204){
							href += '&commentid=' + data.rootTxHash 
						}
					}

				} else {
					return
				}

				answer = data.type === "answer" ? data.hash : ''

				parent = data.txType === 301 ? data.relatedContent.hash : data.type === "answer" ? data.relatedContent.hash : ''

				self.app.platform.app.nav.api.load({
					open: true,
					href: 'post?s=' + href,
					inWnd: true,
					history: true,
					clbk: function (d, p) {
						app.nav.wnds['post'] = p
					},

					essenseData: {

						reply: answer || parent ? {
							answerid: answer,
							parentid: parent,
							noaction: true
						} : null
					}
				})
			},

			openMultiBlocks(data, clbk) {
				self.app.nav.api.load({
					open: true,
					href: 'userslist',
					inWnd: true,
					history: true,

					essenseData: {
						addresses: Object.keys(data.multipleAddresses),
						caption: self.app.localization.e('rblockinglist'),
					},

					clbk: function () {
						if (clbk)
							clbk()
					}
				})
			}

		}

		var events = {
			showprofile: function (address) {

				if (self.app.mobileview) {
					self.nav.api.load({
						open: true,
						id: 'channel',
						inWnd: true,
						history: true,

						essenseData: {
							id: address,
							openprofilebutton: true
						}
					})

					return true
				}


			},
			filter: async function () {
				if (this.classList.contains('active')) {
					return
				}

				el.content.html('')

				actions.applyFilter($(this).attr('rid'))

			},


			loadmorescroll: function () {
				let scrollEnd = scnt ? scnt[0].offsetHeight + scnt[0].scrollTop >= scnt[0].scrollHeight - 500 : false;

				if (scrollEnd && !loading && !end && currentFilter !== 'video' && currentFilter !== 'pending') {

					actions.getdata(currentFilter).then(data => {

						var ids = _.map(data, (v) => {
							return v.hash
						})

						renders.content(null, ids)

					})
				}
			},
		}

		var renders = {
			showcurrentFilter(){

				el.c.find('.tab').removeClass('active')

				if(currentFilter){
				
					el.c.find('[rid="' + currentFilter + '"]').addClass('active')
					_scrollTo(el.c.find('.active'), el.c.find('.filters'), 0, 0, 'Left')	

				}
			},

			actionsCount: function (act) {
				actions.getActions().then(a => {

					var c = a.length
					
					el.c.find('.filters .tab[rid="pending"] .count').html(!c ? '' : c)
				})
			},
			
			actions: function (act) {

				actions.setloading(false)

				self.shell({

					name: 'actions',
					el: el.content,
					data: {
						actions : act
					},

				}, function (_p) {

					_p.el.find('.cancel').on('click', function(){
						var id = $(this).closest('.action').attr('aid')

						new dialog({
							html : self.app.localization.e('actions_rejectedByUser_question'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
	
							success : function(){
								try{
									self.app.platform.actions.cancelAction(self.app.user.address.value, id).then(() => {
									}).catch(e => {
										console.error(e)
									})
								}catch(e){
									console.error(e)
								}
								
							}
						})
					})

					_p.el.find('.typeRow').on('click', function(){
						var id = $(this).closest('.action').attr('aid')

						var a = self.app.platform.actions.getActionById(id)
					})
					
				})
			},

			content: function (type, ids) {

				self.shell({

					name: 'content',
					el: el.content,
					inner : ids ? append : null,
					data: {
						loading: loading,
						activities: currentFilter == 'video' ? {} : getters.formatActivities(ids),
						videos: currentFilter == 'video' ? activitiesByGroup[currentFilter] : [],
					},

				}, function (_p) {
					
				})
			}
		}

		var state = {
			save: function () {

			},
			load: function () {

			}
		}

		var initEvents = function () {
			el.c.find('.tab').on('click', events.filter)

			if (scnt.hasClass('applicationhtml')) {
				self.app.events.scroll['activities'] = events.loadmorescroll
			}
			else {
				scnt.on('scroll', events.loadmorescroll)
			}


			el.c.on('click', '.interactive', function(){
				var tid = $(this).attr('tid')
				actions.openPost(getters.activity(tid))
			})

			el.c.on('click', '.video', function(){
				var tid = $(this).attr('tid')
				actions.openPost(getters.activity(tid))
			})

			el.c.on('click', '.blocking', function(){
				var tid = $(this).attr('tid')
				actions.openMultiBlocks(getters.activity(tid))

			})

			el.c.on('click', '[profile]', function(){

				if (events.showprofile($(this).attr('profile'))) {
					return false
				}

			})


			self.app.platform.actionListeners['activies'] = function({type, alias, status}){
				renders.actionsCount()

				if (currentFilter === 'pending'){
					actions.getActions().then(a => {
						renders.actions(a)
					})
					
				}
			}

		}

		return {
			primary: primary,

			getdata: function (clbk, p){

				ed = p.settings.essenseData || {}

				var data = {
					filters: filtersList
				};

				currentFilter = 'all'

				try{
					currentFilter = ed.activityFilter || localStorage['activityFilter'] || 'all'
				}
				catch (e){
				}

				clbk(data);


			},

			destroy: function () {
				activities = []
				videos = []
				currentFilter = 'all'
				el = {};
				scnt.off('scroll', events.loadmorescroll)
				delete self.app.events.scroll['activities']

				delete self.app.platform.actionListeners['activies']
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.filters = el.c.find('.filters');
				el.content = el.c.find('.content');
				el.loader = el.c.find('.preloaderWrapper');

				scnt = el.c.closest('.customscroll:not(body)')
				
				if (!scnt.length) scnt = self.app.el.window;

				actions.applyFilter(currentFilter)

				initEvents();

				renders.actionsCount()


				p.clbk(null, p);
			},
			tooltip: {
				options: {
					theme: "lighttooltip activitiesTolltip",
					position: 'left',
					zIndex: 50,
					distance: -47,
					functionPosition: function (instance, helper, position) {
						position.coord.top = 0;
						position.coord.left = 0;

						return position;
					},
					arrow: false,

					trigger: 'custom',
					triggerOpen: {
						click: true
					},
					triggerClose: {
					}
				},
				//event : 'click'
			},

			wnd: {
				class: 'wndactivities normalizedmobile maxheight withoutButtons',
			}
		}
	};


	self.run = function (p) {

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function () {

		_.each(essenses, function (essense) {

			essense.destroy();

		})

	}

	return self;
})();


if (typeof module != "undefined") {
	module.exports = activities;
} else {

	app.modules.activities = {};
	app.modules.activities.module = activities;

}