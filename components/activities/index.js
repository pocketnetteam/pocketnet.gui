var activities = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = deep(p, 'history');

		var el, loading, scnt, currentFilter = 'all', end = false, block;

		var filtersList = ['all', 'interactions', 'comment', 'subscriber', 'blocking', 'video']

		var activities = []
		var videos = []

		var getters = {
			getFilters: function (filter) {
				if (filter === 'all') return []
				if (filter === 'interactions') return ['contentscore', 'boost','commentscore']
				if (filter === 'comment') return [ 'comment', 'answer']
				if (filter === 'subscriber') return ['subscriber']
				if (filter === 'blocking') return ['blocking']
				if (filter === 'video') return ['video']
				if (!filter) return ['']
				return [filter]
			},

			formatActivities: function () {
				let res = activities.map(i => {
					if (i.description) {
						try {
							i.description = JSON.parse(i.description)
						} catch (e) {

						}

					}

					if (!i.description && i.relatedContent?.description) {
						try {
							i.description = JSON.parse(i.relatedContent.description)
						} catch (e) {
							i.description = {}
							i.description.message = i.relatedContent.description
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
		}

		var actions = {
			setloading: function (v) {
				console.log('loadrind', v)
				loading = v
				if (loading) {
					el.loader[0].style.display = 'block'
					renders.content()
				} else {
					el.loader[0].style.display = 'none'
					renders.content()
				}
			},

			getdata: function () {
				actions.setloading(true)
				if (!activities.length) {
					return self.app.api.fetch('ping', {}, { timeout: 4000 }).then(async (r) => {
						block = r
						try {
							activities = await self.app.api.rpc('getactivities', [self.user.address.value, r.height, , getters.getFilters(currentFilter)])
						} catch (e) {
							return e
						}

					}).finally(() => {
						setTimeout(actions.setloading.bind(false), 300)
					})
				} else {
					return new Promise(async (resolve, reject) => {
						try {
							let data = await self.app.api.rpc('getactivities', [self.user.address.value, activities[activities.length - 1].height, , getters.getFilters(currentFilter)])
							if (!data.length) {
								end = true
							}
							activities.push(...data)
							resolve()
						} catch (e) {
							reject(e)
						} finally {
							setTimeout(() => actions.setloading(false), 300)
						}

					})
				}

			},

			getVideos: () => {
				videos = []
				let vid = JSON.parse(localStorage.getItem('latestactivity'))?.activity?.video
				let res = []

				_.each(vid, (video) => {
					let a = new Promise((resolve, reject) => {
						self.app.platform.sdk.videos.info([video.data.value.url]).then(r => {
							if (!r?.[0]?.[0]?.data) {
								let p = self.app.platform.sdk.videos.storage[video.data.value.url]
								resolve({...p.data, date: video.date, name: video.data.value.caption, comments:video.data.value.comments,  txid: video.data.value.txid, rating : +video.data.value.scnt === 0 ? 0 : +video.data.value.score / +video.data.value.scnt })
								return
							}
							resolve({...r[0][0].data, date: video.date, name: video.data.value.caption, comments:video.data.value.comments, txid: video.data.value.txid, rating : +video.data.value.scnt === 0 ? 0 : +video.data.value.score / +video.data.value.scnt })

						}).catch(e => {
							console.log(e)
						})
					})
					res.push(a)
				})
				return res
			},

			openPost(data) {

				let href, answer, parent

				if (data) {
					if (data?.date) {
						href = data.txid
					} else {
						href = data.txType === 301 ? data.relatedContent.postHash : data.type === "answer" ? data.postHash : data.relatedContent.hash
					}

				} else {
					return
				}

				answer = data.type === "answer" ? data.hash : ''

				parent = data.txType === 301 ? data.relatedContent.hash : data.type === "answer" ? data.relatedContent.hash : data.hash

				self.app.platform.app.nav.api.load({
					open: true,
					href: 'post?s=' + href,
					inWnd: true,
					history: true,
					clbk: function (d, p) {
						app.nav.wnds['post'] = p
					},

					essenseData: {
						share: '',

						reply: {
							answerid: answer,
							parentid: parent,
							noaction: true
						}
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

					return true
				}


			},
			filter: async function () {
				if (this.classList.contains('active')) {
					return
				}
				activities = []

				end = false
				currentFilter = $(this).attr('rid');
				renders.content()
				if (currentFilter === 'video') {
					actions.setloading(true)
					let a = actions.getVideos()

					let b = []

					a.forEach(i => i.then((value) => {
						let c = new Promise((res)=>{
							return self.sdk.users.get([value?.original?.account?.name], (info) => {
								info ? value.info = info[0] : value.info = self.sdk.users.storage[value?.original?.account?.name]
								info ? value.info = info[0] : value.info = self.sdk.users.storage[value?.original?.account?.name]
								res(value)
								console.log('res',value)
							})
						})
						b.push(c)
						return c
					}).then(readyVideo => {
							videos.push(readyVideo)
						if (videos.length === a.length) {
							console.log('all',videos, a)
							actions.setloading(false)
						}
							videos.sort((a, b) => b.date - a.date);
							renders.content()
						})
				)
					el.c.find('.tab').removeClass('active')
					el.c.find('[rid="' + currentFilter + '"]').addClass('active')
					_scrollTo(el.c.find('.active'), el.c.find('.filters'), 0, 0, 'Left')
					return
				} else {
					videos = []
				}

				actions.getdata().then((e) => {
					if (e) return sitemessage(e.error.message || e.error?.error || e.error)

					el.c.find('.tab').removeClass('active')

					el.c.find('[rid="' + currentFilter + '"]').addClass('active')

					_scrollTo(el.c.find('.active'), el.c.find('.filters'), 0, 0, 'Left')

				})

			},


			loadmorescroll: function () {

				if (el.c.height() - scnt.scrollTop() < 800 && !loading && !end && currentFilter !== 'video') {
					actions.getdata()
				}
			},
		}

		var renders = {
			filters: function (clbk) {
				self.shell({

					name: 'filters',
					el: el.filters,
					data: {
						filters: filtersList,
					},
				}, function (_p) {
					_p.el.find('.tab').on('click', events.filter)
					if (clbk) {
						clbk()
					}
				})
			},

			content: function (type) {
				self.shell({

					name: 'content',
					el: el.content,
					data: {
						loading: loading,
						activities: getters.formatActivities(),
						videos : videos,
						openPost: actions.openPost,
					},
					// inner: (root, el) => {
					// 	el = el.replace(/\r/gm,"").replace(/(\/>)/gm,">")
					// 	let v = el.replace(root[0].innerHTML, "")
					// 	root.append(v)
					//
					// }

				}, function (_p) {
					let interactions = _p.el.find('.interactive')
					let vid = _p.el.find('.video')
					let multiblocking = _p.el.find('.blocking')

					_.each(interactions, function (i) {
						i.addEventListener('click', (e) => {
							actions.openPost(...activities.filter(ac => ac.hash === i.attributes.tid.value))
						})
					})
					_.each(vid, function (i) {
						i.addEventListener('click', (e) => {
							actions.openPost(...videos.filter(ac => {
								return ac.txid === i.attributes.tid.value
							}))
						})
					})

					_.each(multiblocking, function (i) {
						i.addEventListener('click', (e) => {
							actions.openMultiBlocks(...activities.filter(ac => ac.id === i.attributes.tid.value))
						})
					})

					_p.el.find('[profile]').on('click', function(e) {
						if(events.showprofile($(this).attr('profile'))){
							return false
						}

						
					})
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

		}

		return {
			primary: primary,

			getdata: function (clbk) {

				var data = {};

				clbk(data);


			},

			destroy: function () {
				activities = []
				videos = []
				currentFilter = 'all'
				el = {};
				scnt.off('scroll', events.loadmorescroll)
				delete self.app.events.scroll['activities']
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.filters = el.c.find('.filters');
				el.content = el.c.find('.content');
				el.loader = el.c.find('.preloaderWrapper');


				scnt = el.c.closest('.customscroll:not(body)')
				if (!scnt.length) scnt = $(window);

				if (scnt.hasClass('applicationhtml')) {
					self.app.events.scroll['activities'] = events.loadmorescroll
				}
				else {
					scnt.on('scroll', events.loadmorescroll)
				}
				renders.filters()
				actions.getdata()

				initEvents();


				p.clbk(null, p);
			},
			wnd: {
				class: 'wndactivities normalizedmobile maxheight',
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