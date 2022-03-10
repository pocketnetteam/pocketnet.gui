var videoCabinet = (function () {
	var self = new nModule();

	var essenses = {};

	const ROTATE_ONE_PERCENTAGE = 3.6;
	const HALF_CIRCLE_ROTATE_PERCENTAGE = 50;
	const HUDRED_PERC = 100;
	const LAZYLOAD_PERCENTAGE = 0.9;
	const LAZYLOAD_PERCENTAGE_EXTERNAL = 0.5;
	const POSITIVE_STATUS = 'fulfilled';
	const TRANSCODING_CHECK_INTERVAL = 20000;

	var Essense = function (p) {
		var primary = deep(p, 'history');

		var el;

		var wnd;
		var wndObj;
		var errorcomp = null

		var transcodingIntervals = {};
		var ed = {};

		let tagElement;
		let tagArray = [];
		let newVideosAreUploading = false;
		let serversList = {};

		var peertubeServers = {};
		var userQuota = {};
		var blockChainInfo = [];
		var external = null;
		var perServerCounter = 10;

		const descriptionCache = {};

		const sorting = {
			sortType: 'createdAt',
			sortDirection: '-',
		};

		//actions object for functions received from external object (for example, when loading from 'lenta')
		var externalActions = {};

		var helpers = {
			removeDuplicateVideos(host, videos) {
				let formattingVideos = [...videos];

				const serverRoy = Object.keys(serversList).find((royKey) =>
					(serversList[royKey] || []).includes(host),
				);

				(serversList[serverRoy] || []).forEach((server) => {
					if (server === host) return;

					if (!peertubeServers[server]) return;

					formattingVideos = formattingVideos.filter((video) => {
						const duplicate = peertubeServers[server].videos.find(
							(duplicatedVideo) => video.uuid === duplicatedVideo.uuid,
						);

						if (duplicate) {
							//pick max amount of views
							duplicate.views = Math.max(duplicate.views, video.views);

							return false;
						}

						return true;
					});
				});

				return formattingVideos;
			},

			parseVideoServerError(error = {}) {
				self.app.Logger.error({
					err: error.text || 'videoCabinetError',
					payload: JSON.stringify(error),
					code: 502,
				});

				return error.text || findResponseError(error) || JSON.stringify(error);
			},
		};

		var actions = {
			async getHosts() {
				// const serverStructureHosts = await self.app.peertubeHandler.api.proxy
				//   .roys({ type: 'view' })
				//   .catch(() => ({}));

				serversList = await self.app.peertubeHandler.api.proxy
					.allServers()
					.catch(() => ({}));

				return Promise.resolve(serversList);
			},

			async getVideos(server = '', parameters = {}) {
				if (!server) return;

				const options = {
					start: peertubeServers[server].start,
					count: perServerCounter,
					...parameters,
				};

				return self.app.peertubeHandler.api.videos
					.getMyAccountVideos(options, {
						host: server,
					})
					.then((data = {}) => {
						const formattedVideos = (data.data || []).map((video) => ({
							...video,
							server,
						}));

						peertubeServers[server].start += perServerCounter;

						const filteredVideos = helpers.removeDuplicateVideos(
							server,
							formattedVideos,
						);

						peertubeServers[server].videos.push(...filteredVideos);

						peertubeServers[server].total = data.total || 0;
						peertubeServers[server].isFull =
							peertubeServers[server].start > data.total;

						return { ...data, data: filteredVideos };
					})
					.catch(() => {
						peertubeServers[server].isFull = true;

						console.log(`Error loading ${server}`);
						return [];
					});
			},

			async getSingleVideo(link) {
				const { host, id } = self.app.peertubeHandler.parselink(link);

				return self.app.peertubeHandler.api.videos.getDirectVideoInfo(
					{ id },
					{ host },
				);
			},

			async getQuota() {
				return self.app.peertubeHandler.api.videos
					.getQuotaStatus()
					.then((res) => (userQuota = { ...res }));
			},

			getBlockchainPostByVideos: (videoArray = []) =>
				self.app.api
					.rpc('searchlinks', [videoArray, 'video', 0, videoArray.length])

					.then((res = []) => {
						console.log('RESULT ', res);

						res.forEach((post) => {
							const postUrl = decodeURIComponent(post.u);

							blockChainInfo[postUrl] = { ...post };
						});

						console.log('blockChainInfo', blockChainInfo);
					})
					.catch((err) => { }),

			resetHosts() {
				el.videoContainer.html('');

				const videoPortionElement = renders.newVideoContainer();

				Object.keys(peertubeServers).forEach((server) => {
					peertubeServers[server] = {
						videos: [],
						start: 0,
					};
				});

				return videoPortionElement;
			},

			updateAllHosts(parameters = {}) {
				const servers = Object.keys(peertubeServers);

				const serverPromises = servers.map((server) =>
					actions.getVideos(server, parameters),
				);

				return Promise.allSettled(serverPromises);
			},

			getTotalRatings() {
				if (self.app.platform.sdk.address.pnet()) {
					var address = self.app.platform.sdk.address.pnet().address;
					return self.app.api
						.rpc('getcontentsstatistic', [[address], 'video'], {})
						.then((r) => {
							console.log('RE', r);

							var d =
								_.find(r || [], function (obj) {
									return address == obj.address;
								}) || {};

							return Promise.resolve(d);
						});
				} else {
					return Promise.reject();
				}
			},

			getTotalViews() {
				const servers = Object.keys(peertubeServers);

				const serverPromises = servers.map((host) =>
					self.app.peertubeHandler.api.videos.totalViews({}, { host }),
				);

				//aggregating video views from different servers into one number
				return Promise.allSettled(serverPromises)
					.then((data) =>
						data
							.filter((promise) => promise.status === POSITIVE_STATUS)
							.map((info) => info.value)
							.reduce(
								(accumulator, currServer) =>
									(accumulator += Number(currServer.total_views || 0)),
								0,
							),
					)
					.then((aggregatedNumberViews) => {
						const cachedViews = +(
							localStorage.getItem('aggregatedVideoViews') || 0
						);

						if (aggregatedNumberViews > cachedViews) {
							localStorage.setItem(
								'aggregatedVideoViews',
								aggregatedNumberViews,
							);

							return aggregatedNumberViews;
						}

						return cachedViews;
					});
			},

			getFullPageInfo(videoPortionElement) {
				renders.videos(null, videoPortionElement);

				//getting and rendering bonus program status for views and ratings (same template)
				actions
					.getTotalViews()
					.then((result) => {
						renders.bonusProgram(
							{
								parameterName: 'bonusProgramViews',
								value: result,
							},
							el.bonusProgramContainerStars,
						);
					})
					.catch(() =>
						renders.bonusProgram(
							{
								parameterName: 'bonusProgramViews',
								value: 0,
							},
							el.bonusProgramContainerStars,
						),
					);

				actions
					.getTotalRatings()
					.then((result) => {
						const renderingStarts =
							result.scoreCnt && result.scoreSum
								? `${(result.scoreSum / result.scoreCnt).toFixed(1)} (${result.scoreCnt
								}) <i class="fas fa-star"></i>`
								: `&mdash;`;

						const renderingUsers = `${result.countLikers || 0
							}  <i class="fas fa-users"></i>`;

						renders.bonusProgram(
							{
								parameterName: 'bonusProgramRatings',
								value: renderingStarts,
							},
							el.bonusProgramContainerViews,
						);

						renders.bonusProgram(
							{
								parameterName: 'UniqueUsers',
								value: renderingUsers,
							},
							el.bonusProgramContainerUniqueUsers,
						);
					})
					.catch((e) => {
						renders.bonusProgram(
							{
								parameterName: 'bonusProgramRatings',
								value: `<span class="errorLoading"><i class="fas fa-exclamation-circle"></i> ${self.app.localization.e(
									'ErrorLoadingRates',
								)}</span>`,
							},
							el.bonusProgramContainerViews,
						);

						renders.bonusProgram(
							{
								parameterName: 'UniqueUsers',
								value: `<span class="errorLoading"><i class="fas fa-exclamation-circle"></i> ${self.app.localization.e(
									'ErrorLoadingRates',
								)}</span>`,
							},
							el.bonusProgramContainerUniqueUsers,
						);
					});
			},

			checkTranscodingStatus(meta) {
				const { id, host } = meta;
				self.app.peertubeHandler.api.videos
					.getDirectVideoInfo({ id }, { host })
					.then((video) => {
						if (video.state.id === 1) {
							actions.videoFinishedTranscoding(id);
						}
					})
					.catch(() => actions.videoFinishedTranscoding(id));
			},

			videoFinishedTranscoding(id) {
				clearInterval(transcodingIntervals[id]);
				delete transcodingIntervals[id];
				const videoElement = el.videoContainer.find(`[uuid="${id}"]`);

				videoElement.find('.attachVideoToPost').removeClass('hidden');
				videoElement.find('.transcodingPreloader').addClass('hidden');
			},

			uploadVideoWallpaper(image, uploadParameters) {
				const { shareUrl, backupHost } = uploadParameters;

				const parameters = {
					thumbnailfile: image,
				};

				const settingsObject = {};
				const urlMeta = self.app.peertubeHandler.parselink(shareUrl);

				const host = urlMeta.host || null;

				return self.app.platform.sdk.videos
					.info([shareUrl])
					.then(
						() => (self.app.platform.sdk.videos.storage[shareUrl] || {}).data,
					)
					.then((res = {}) => {
						if (res.aspectRatio) {
							settingsObject.aspectRatio = res.aspectRatio;

							return;
						}

						return self.app.peertubeHandler.api.videos
							.getDirectVideoInfo({ id: urlMeta.id }, { host })
							.then((res) => {
								settingsObject.aspectRatio = res.aspectRatio;
							});
					})
					.then(() => toDataURL(image))
					.then((fileBase64) => {
						return actions.resizeImage(fileBase64, settingsObject);
					})
					.then((img) => {
						parameters.image = {
							data: img,
						};

						return self.app.peertubeHandler.api.videos
							.update(shareUrl, parameters, { host })
							.then(() => img);
					})
					.catch((error = {}) => {
						if ((error.code = 404)) {
							return self.app.peertubeHandler.api.videos
								.update(`peertube://${backupHost}/${urlMeta.id}`, parameters, {
									host,
								})

								.then(() => img)

								.catch((e = {}) =>
									sitemessage(helpers.parseVideoServerError(e)),
								);
						}

						return sitemessage(helpers.parseVideoServerError(error));
					});
			},

			resizeImage(base64, settings = {}) {
				const images = [
					{
						original: base64,
						index: 0,
					},
				];

				return new Promise((resolve, reject) => {
					self.nav.api.load({
						open: true,
						id: 'imageGalleryEdit',
						inWnd: true,

						essenseData: {
							edit: true,
							initialValue: 0,
							images: images,
							apply: true,
							crop: {
								aspectRatio: settings.aspectRatio || 16 / 9,
								style: 'apply',
								autoCropArea: 0.95,
							},

							success: function (i, editclbk) {
								resize(images[0].original, 1920, 1080, function (resized) {
									const r = resized.split(',');

									if (r[1]) {
										editclbk();

										resolve(resized);
									} else {
										reject('error');
									}
								});
							},
						},
					});
				});
			},

			replaceNetLinks: (str) =>
				str
					.replace(
						`Watch more exciting videos at https://test.pocketnet.app/!`,
						'',
					)
					.replace(`Watch more exciting videos at https://pocketnet.app/!`, '')
					.replace(`Watch more exciting videos at https://bastyon.com/!`, ''),
		};

		var events = {
			onPageScroll() {
				const scrollProgress =
					el.windowElement.scrollTop() / el.scrollElement.height();

				if (scrollProgress >= LAZYLOAD_PERCENTAGE && !newVideosAreUploading) {
					const activeServers = Object.keys(peertubeServers).filter(
						(server) => !(peertubeServers[server] || {}).isFull,
					);

					if (!activeServers.length) return;

					events.getAdditionalVideos(activeServers);
					newVideosAreUploading = true;
				}
			},

			getAdditionalVideos(activeServers = []) {
				if (!activeServers.length) return;

				const videoPortionElement = renders.newVideoContainer();

				const videoParameters = { sort: ed.sort };

				if (ed.search) videoParameters.search = ed.search;

				return Promise.allSettled(
					activeServers.map((server) =>
						actions.getVideos(server, videoParameters),
					),
				)
					.then((data = []) => {
						const newVideos = data
							.filter((item) => item.status === POSITIVE_STATUS)
							.map((item) => item.value.data)
							.flat()
							.filter((video) => video);

						newVideosAreUploading = false;

						renders.videos(newVideos, videoPortionElement);
					})
					.catch(() => videoPortionElement.addClass('hidden'));
			},

			onSearchVideo() {
				const searchString = el.searchInput.val();

				if ((ed.search || '') == (searchString || '')) return;

				ed.search = searchString;

				const videoPortionElement = actions.resetHosts();

				actions
					.updateAllHosts({ search: searchString })
					.then(() => {
						renders.videos(null, videoPortionElement);
					})
					.catch(() => {
						renders.videos(null, videoPortionElement);
					});
			},

			onVideoSort() {
				const sort = `${el.sortDirectionSelect.val()}${el.sortTypeSelect.val()}`;

				sorting.sortType = el.sortTypeSelect.val();
				sorting.sortDirection = el.sortDirectionSelect.val();

				localStorage.setItem('videoCabinetSortType', el.sortTypeSelect.val());
				localStorage.setItem(
					'videoCabinetSortDirection',
					el.sortDirectionSelect.val(),
				);

				const videoPortionElement = actions.resetHosts();

				actions
					.updateAllHosts({ sort })
					.then(() => {
						renders.videos(null, videoPortionElement);
					})
					.catch(() => {
						renders.videos(null, videoPortionElement);
					});
			},
		};

		var renders = {
			//table with video elements
			videos(videosForRender, videoPortionElement) {
				//additional sorting due to different servers
				const videos = (
					videosForRender ||
					Object.values(peertubeServers)
						.map((value) => value.videos)
						.filter((video) => video)
						.flat()
				).sort((videoA, videoB) => {
					if (sorting.sortType === 'createdAt') {
						const sortingValBool = sorting.sortDirection
							? moment(videoB[sorting.sortType]).isAfter(
								videoA[sorting.sortType],
							)
							: moment(videoB[sorting.sortType]).isBefore(
								videoA[sorting.sortType],
							);

						return sortingValBool ? 1 : -1;
					}

					return sorting.sortDirection
						? videoB[sorting.sortType] - videoA[sorting.sortType]
						: videoB[sorting.sortType] - videoA[sorting.sortType];
				});

				videos.forEach((video) => {
					if (video.description) {
						video.description = actions.replaceNetLinks(video.description);
					}
				});

				//check if video cabinet is loaded directly by url or opened in window from 'lenta' element
				const buttonCaption = ed.inLentaWindow
					? 'attachVideoLenta'
					: 'attachVideoToPost';

				self.shell(
					{
						name: 'videoList',
						el: videoPortionElement,
						data: {
							videos,
							buttonCaption,
						},
					},
					(p) => {
						p.el.find('.tooltip').tooltipster({
							theme: 'tooltipster-light',
							maxWidth: 600,
							zIndex: 20,
						});
						const attachVideoToPost = p.el.find('.attachVideoToPost');
						// const removeVideo = p.el.find('.removeVideo');
						const menuActivator = p.el.find('.menuActivator');

						//button for creating post with video (active only when cabinet is opened directly)
						attachVideoToPost.on('click', function () {
							const videoLink = $(this).attr('videoLink');

							const meta = self.app.peertubeHandler.parselink(videoLink);

							self.app.peertubeHandler.api.videos
								.getDirectVideoInfo({ id: meta.id }, { host: meta.host })
								.then((info) => {
									const { name, description, tags } = info;
									renders.addButton({ videoLink, name, description, tags });
								});
						});

						//button for attaching existing video to post (active when element loaded from 'lenta')
						const attachVideoLenta = p.el.find('.attachVideoLenta');

						attachVideoLenta.on('click', function () {
							const attachVideoLentaElement = $(this);

							const videoName = attachVideoLentaElement.attr('videoName');
							const videoLink = attachVideoLentaElement.attr('videoLink');

							externalActions.added(videoLink, videoName);
							wndObj.close();
						});

						menuActivator.on('click', function () {
							const menuActivatorElement = $(this);

							const videoLink = menuActivatorElement.attr('videoLink');
							const backupHost = menuActivatorElement.attr('backupHost');

							return renders.metmenu(
								$(this),
								{ videoLink, backupHost },
								blockChainInfo[videoLink] ? true : false,
							);
						});

						const blockchainStrings = videos.map((video) =>
							encodeURIComponent(
								`peertube://${video.account.host}/${video.uuid}`,
							),
						);

						console.log('blockchainStrings', blockchainStrings);

						//get information about videos being published to blockchain
						actions.getBlockchainPostByVideos(blockchainStrings).then(() => {
							p.el.find('.singleVideoSection').each(function () {
								const singleVideoSection = $(this);

								const currentElement = singleVideoSection.find(
									'.postingStatusWrapper[videoTranscoding="false"]',
								);

								const isTranscoding = currentElement.attr('isTranscoding');

								const link = currentElement.attr('video');

								if (blockChainInfo[link]) {
									if (ed.inLentaWindow)
										singleVideoSection.addClass('alreadyPostedVideo');

									//check if component is rendered natively or from externat component (as ex lenta)
									const alreadyPostedCaption = ed.inLentaWindow
										? 'linkToPostLenta'
										: 'linkToPost';

									return renders.postLink(
										currentElement,
										link,
										alreadyPostedCaption,
									);
								}
								if (!isTranscoding) {
									currentElement
										.find(`.${buttonCaption}`)
										.removeClass('hidden');
									currentElement.find('.preloaderwr').addClass('hidden');
								}
							});

							p.el.find('.videoStatsWrapper').each(function () {
								const currentElement = $(this);

								const link = currentElement.attr('video');
								const host = currentElement.attr('host');
								const uuid = currentElement.attr('uuid');

								return renders.videoStats(currentElement, link, host, uuid);
							});
						});

						p.el.find('[videoTranscoding="true"]').each(function () {
							const videoLink = $(this).attr('video');

							const meta = self.app.peertubeHandler.parselink(videoLink);

							transcodingIntervals[meta.id] = setInterval(
								() => actions.checkTranscodingStatus(meta),
								TRANSCODING_CHECK_INTERVAL,
							);
						});

						//hide / show full video description
						p.el.find('.videoDescriptionText').each(function () {
							const element = $(this);

							const uuid = element.attr('uuid');
							const host = element.attr('host');

							const content = element.find('.descriptionContent');
							const originalDescription = content.text();
							const hideShowButton = element.find('.showAllDescriptionButton');

							const applyDescription = (description) => {
								content.text(actions.replaceNetLinks(description));
								element.css('height', 'auto');
								hideShowButton
									.addClass('descriptionExpanded')
									.text(self.app.localization.e('hideAllButton'));
							};

							hideShowButton.on('click', () => {
								if (hideShowButton.hasClass('descriptionExpanded')) {
									content.text(originalDescription);
									hideShowButton
										.removeClass('descriptionExpanded')
										.text(self.app.localization.e('showAllButton'));
								} else {
									descriptionCache[uuid]
										? applyDescription(descriptionCache[uuid])
										: self.app.peertubeHandler.api.videos
											.getFullDescription({ id: uuid }, { host })
											.then((description) => {
												descriptionCache[uuid] = description;

												applyDescription(description);
											});
								}
							});
						});
					},
				);
			},
			//video upload quota section
			quota() {
				self.shell(
					{
						name: 'quota',
						el: el.quotaContainer,
						data: {
							userQuota,
						},
					},
					(p) => {
						const freePercentage = (
							(userQuota.videoQuotaRemainingDaily / userQuota.videoQuotaDaily) *
							HUDRED_PERC
						).toFixed(0);

						const leftPercentageCircle = p.el.find('.left .progress');
						const rightPercentageCircle = p.el.find('.right .progress');

						if (freePercentage >= HALF_CIRCLE_ROTATE_PERCENTAGE) {
							rightPercentageCircle.css(
								'transform',
								`rotate(${(freePercentage - HALF_CIRCLE_ROTATE_PERCENTAGE) *
								ROTATE_ONE_PERCENTAGE
								}deg)`,
							);
							leftPercentageCircle.css('transform', 'rotate(180deg)');
						} else {
							leftPercentageCircle.css(
								'transform',
								`rotate(${freePercentage * ROTATE_ONE_PERCENTAGE}deg)`,
							);
							rightPercentageCircle.css('transform', 'rotate(0deg)');
						}
					},
				);
			},
			// render upload video window/start steram window
			streamPage(p = {}) {
				const typeDictionary = {
					addVideo: 'uploadpeertube',
					addStream: 'streampeertube',
				};

				const elName = typeDictionary[p.type];

				if (external && external.id == elName) {
					external.container.show();

					return;
				}

				if (external) external.container.close();

				self.nav.api.load({
					open: true,
					id: elName,
					inWnd: true,

					history: false,

					essenseData: {
						storage: p.storage,
						value: p.value,
						currentLink: '',
						actions: {
							added: function (resultLink) {
								actions.getSingleVideo(resultLink).then((data) => {
									const { host } =
										self.app.peertubeHandler.parselink(resultLink);

									const formattedData = {
										...data,
										server: host,
									};

									peertubeServers[host].videos.unshift(formattedData);

									renders.videos(
										[formattedData],
										renders.newVideoContainer(true),
									);
								});

								actions.getQuota().then(() => renders.quota());
							},
						},

						closeClbk: function () {
							external = null;
						},
					},

					clbk: function (p, element) {
						external = element;

						videoUploadData = element.essenseData;
					},
				});
			},
			//button in video table for adding post with video to blockchain
			addButton(parameters) {
				self.app.platform.ui.share(parameters);
			},
			//get link to existing video post
			postLink(element, link, buttonCaption) {
				const linkInfo = blockChainInfo[link];

				if (isMobile()) {
					element.html(
						`<a class="videoPostLink" href="index?video=1&v=${linkInfo.txid
						}"><i class="far fa-check-circle"></i>${self.app.localization.e(
							buttonCaption,
						)}</a>`,
					);

					self.nav.api.links(null, element);
				} else {
					element.html(
						`<span elementsid="videoPostLinkinWindow" class="videoPostLinkinWindow"><i class="far fa-check-circle"></i>${self.app.localization.e(
							buttonCaption,
						)}</span>`,
					);

					//Can go to post only if loaded natively (not from external component)
					if (!ed.inLentaWindow) {
						element.find('.videoPostLinkinWindow').on('click', function () {
							var ed = {
								share: linkInfo.txid,
								close: function () { },
							};
							self.nav.api.load({
								open: true,
								href: 'post?s=' + linkInfo.txid,
								inWnd: true,
								history: true,
								essenseData: ed,
							});
						});
					}
				}
			},
			//render single video stats column in video table
			videoStats(element, link, host, uuid) {
				const linkInfo = blockChainInfo[link] || {};
				const videoInfo =
					((peertubeServers[host] || {}).videos || []).find(
						(video) => video.uuid === uuid,
					) || {};

				self.shell(
					{
						name: 'videoStats',
						el: element,
						data: {
							views: +videoInfo.views || 0,
							starsCount: +linkInfo.scoreSum || 0,
							starsSum: +linkInfo.scoreCnt || 0,
							comments: +linkInfo.comments || 0,
						},
					},
					(p) => {
						p.el.find('.tooltip').tooltipster({
							theme: 'tooltipster-light',
							maxWidth: 600,
							zIndex: 20,
						});
					},
				);
			},

			videoErrorContainer: function () {

				var errorel = el.c.find('.videoErrorContainer')

				if (errorel.length){

					if (errorcomp){
						errorcomp.destroy()
						errorcomp = null
					}

					self.nav.api.load({
						open : true,
						id : 'abilityincrease',
						el : errorel,

						essenseData : {	
							template : 'video'
						}
					}, function(v, p){
						errorcomp = p
					})
				}
				
			},
			//add new container for a protion of videos (lazyload)
			newVideoContainer(atStart = false) {
				const videoPortionElement = $(
					'<div class="videoPage"><div class="preloaderwr"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div></div>',
				);

				atStart
					? el.videoContainer.prepend(videoPortionElement)
					: el.videoContainer.append(videoPortionElement);

				return videoPortionElement;
			},
			//render bonus program stats (rating or views)
			bonusProgram(parameters = {}, element) {
				self.shell(
					{
						name: 'bonusProgram',
						el: element,
						data: { ...parameters },
					},
					(p) => { },
				);
			},
			//render menu with video controls
			metmenu(_el, parameters, isVideoPosted) {
				const { videoLink, backupHost } = parameters;

				const data = {
					isVideoPosted,
				};

				const meta = self.app.peertubeHandler.parselink(videoLink);

				self.fastTemplate(
					'metmenu',
					(rendered, template) => {
						self.app.platform.api.tooltip(
							_el,
							() => template(data),
							(element, v, close) => {
								//remove user video (popup menu)
								element.find('.remove').on('click', function () {
									const { host } = meta;

									dialog({
										html: self.app.localization.e('removeVideoDialog'),
										btn1text: self.app.localization.e('remove'),
										btn2text: self.app.localization.e('ucancel'),

										success() {
											self.app.peertubeHandler.api.videos
												.remove(videoLink)
												.then(() => {
													el.videoContainer
														.find(`.singleVideoSection[uuid="${meta.id}"]`)
														.addClass('hidden');
												})
												.catch((error = {}) => {
													if (error.code === 'removeerror') {
														return self.app.peertubeHandler.api.videos
															.remove(`peertube://${backupHost}/${meta.id}`)
															.then(() => {
																el.videoContainer
																	.find(
																		`.singleVideoSection[uuid="${meta.id}"]`,
																	)
																	.addClass('hidden');
															})
															.catch((err = {}) => {
																sitemessage(
																	`Deleting error: ${helpers.parseVideoServerError(
																		err,
																	)}`,
																);
															});
													}

													return sitemessage(
														`Deleting error: ${helpers.parseVideoServerError(
															error,
														)}`,
													);
												});
										},
									});

									close();
								});

								//edit wallpaper in menu
								initUpload({
									el: element.find('.editPreview .inputMenuWrapper'),

									ext: ['png', 'jpeg', 'jpg', 'webp', 'jfif'],

									dropZone: element.find('.editPreview'),

									multiple: false,

									action: function (file, clbk) {
										actions
											.uploadVideoWallpaper(file.file, {
												shareUrl: videoLink,
												backupHost,
											})
											.then((img) => {
												const previewContainer = el.videoContainer.find(
													`.singleVideoSection[uuid="${meta.id}"] .videoAvatar`,
												);

												previewContainer.attr(
													'style',
													`background-image: url("${img}")`,
												);
											});

										close();
									},

									onError: function (er, file, text) {
										sitemessage(text);
									},
								});

								//render edit description form
								element.find('.editText').on('click', function () {
									self.app.peertubeHandler.api.videos
										.getDirectVideoInfo({ id: meta.id }, { host: meta.host })
										.then((videoData) => {
											self.fastTemplate('editDescription', (rendered) => {
												dialog({
													html: rendered,

													wrap: true,

													success: function (d) {
														const name = d.el.find('.videoNameInput').val();
														const description = d.el
															.find('.videoDescriptionInput')
															.val();

														const parameters = {};

														if (name) parameters.name = name;
														if (description)
															parameters.description = description;

														parameters.tags = tagArray;

														const { host } = videoLink;

														return self.app.peertubeHandler.api.videos
															.update(videoLink, parameters, { host })
															.then(() => {
																const textContainert = el.videoContainer.find(
																	`.singleVideoSection[uuid="${meta.id}"]`,
																);

																if (name)
																	textContainert
																		.find('.videoNameText')
																		.text(name);
																if (description)
																	textContainert
																		.find('.videoDescriptionText')
																		.text(description);

																d.close();
																tagElement = {};
																tagArray = [];
															})
															.catch((err = {}) => {
																tagElement = {};
																tagArray = [];
																d.close();

																sitemessage(
																	`${self.app.localization.e(
																		'errorChangingDescription',
																	)}: ${helpers.parseVideoServerError(err)}`,
																);
															});
													},

													clbk: function (editDialogEl) {
														tagElement = editDialogEl.find('.videoTagsWrapper');
														tagArray = [...videoData.tags];
														renders.tags(tagElement, tagArray);

														editDialogEl
															.find('.videoNameInput')
															.val(videoData.name);
														editDialogEl
															.find('.videoDescriptionInput')
															.val(videoData.description);
													},

													class: 'editVideoDialog',
												});
											});
										})
										.catch((err = {}) => {
											sitemessage(
												`${self.app.localization.e(
													'errorChangingDescription',
												)}: ${helpers.parseVideoServerError(err)}`,
											);
										});

									close();
								});
							},
						);
					},
					data,
				);
			},
			//render tagline
			tags(element, tagArray) {
				const tagActions = {
					//tag-related funcitons
					tagsFromText(text) {
						var words = text.split(wordsRegExp);

						var tags = _.filter(words, function (w) {
							if (w[0] == '#') {
								w = w.replace(/#/g, '');

								if (!w) return false;

								return true;
							}
						});

						_.each(tags, function (tag, i) {
							tags[i] = tag.replace(/\#/g, '');
						});

						return tags;
					},

					_addtag(tag) {
						if (tagArray.length < 5) {
							removeEqual(tagArray, tag);
							tagArray.push(tag);
							return true;
						}

						return false;
					},

					addTags(tags) {
						_.find(tags, function (tag) {
							if (!tagActions._addtag(tag)) {
								sitemessage(self.app.localization.e('e13162'));

								return true;
							}
						});
					},

					addTag(tag) {
						//tag = tag.replace(/#/g, '')

						if (!tagActions._addtag(tag)) {
							sitemessage(self.app.localization.e('e13162'));
						}
					},

					_removetag(tag) {
						removeEqual(tagArray, tag);
					},

					removeTags(tags) {
						_.each(tags, function (tag) {
							tagActions._removetag(tag);
						});
					},

					removeTag(tag) {
						tagActions._removetag(tag);
					},
				};

				self.nav.api.load({
					open: true,
					id: 'taginput',
					el: element,
					eid: 'articletags',
					animation: false,
					essenseData: {
						tags: () => tagArray,

						removeTag: function (tag) {
							tagActions.removeTag(tag);
							renders.tags(tagElement, tagArray);
						},

						removeTags: function (tag) {
							tagActions.removeTags(tag);
							renders.tags(tagElement, tagArray);
						},

						addTag: function (tag) {
							tagActions.addTag(tag);
							renders.tags(tagElement, tagArray);
						},

						addTags: function (tags) {
							tagActions.addTags(tags);
							renders.tags(tagElement, tagArray);
						},
					},

					clbk: function (e, p) { },
				});
			},
		};

		var state = {
			save: function () { },
			load: function () { },
		};

		var initEvents = function () {
			el.windowElement.on('scroll', events.onPageScroll);
			el.videoButtons.on('click', function () {
				const type = $(this).attr('rendersElement');

				renders.streamPage({ type });
			});

			el.searchButton.on('click', events.onSearchVideo);

			el.searchInput.on('change', function (e) {
				//if (e.key === 'Enter' || e.keyCode === 13) {
				events.onSearchVideo(e);
				//}
			});

			el.sortTypeSelect.on('change', events.onVideoSort);
			el.sortDirectionSelect.on('change', events.onVideoSort);
		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData || {};

				externalActions = ed.actions || {};

				//check if user has access to videos
				self.app.peertubeHandler.api.user
					.me()
					.then((res) => {
						//get video sorting params from localstorage
						var data = {
							selectedType:
								localStorage.getItem('videoCabinetSortType') || 'createdAt',
							selectedDirection:
								localStorage.getItem('videoCabinetSortDirection') || '-',
							hasAccess: true,
							inLentaWindow: ed.inLentaWindow,
							scrollElementName: ed.scrollElementName || '',
						};

						sorting.sortType = data.selectedType;
						sorting.sortDirection = data.selectedDirection;

						ed = {
							...ed,
							...data,
							sort: `${data.selectedDirection}${data.selectedType}`,
							hasAccess: true,
						};

						clbk(data);
					})
					.catch((err) => {

						ed = {
							...ed,
							hasAccess: false,
						};

						self.app.platform.sdk.ustate.canincrease(
							{ template: 'video' },
							function (r) {
								clbk({
									hasAccess: false,
									inLentaWindow: ed.inLentaWindow,
									scrollElementName: ed.scrollElementName || '',
									increase: r,
								});
							},
						);
					});
			},

			destroy: function () {
				el.windowElement.off('scroll', events.onPageScroll);

				_.each(transcodingIntervals, function (i) {
					clearInterval(i);
				});

				transcodingIntervals = {};

				el = {};

				if (errorcomp){
					errorcomp.destroy()
					errorcomp = null
				}
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.windowElement = ed.scrollElementName
					? $(ed.scrollElementName)
					: $(window);

				el.scrollElement = ed.scrollElementName
					? el.c.find('.userVideos')
					: el.c;

				

				renders.videoErrorContainer()


				//do nothing if user has no access to videos
				if (!ed.hasAccess) return p.clbk(null, p);

				el.videoContainer = el.c.find('.userVideos');
				el.quotaContainer = el.c.find('.quotaContainer');
				el.videoButtons = el.c.find('.videoActiveButton');

				el.searchInput = el.c.find('.videoSearchInput');
				el.searchButton = el.c.find('.videoSearchButton');

				el.bonusProgramReferContainer = el.c.find('.referContainer');
				el.bonusProgramContainerViews = el.c.find('.leaderBoardContainerViews');
				el.bonusProgramContainerStars = el.c.find(
					'.leaderBoardContainerRatings',
				);
				el.bonusProgramContainerUniqueUsers = el.c.find(
					'.leaderBoardContainerUniqueUsers',
				);

				el.sortTypeSelect = el.c.find('.sortTypeSelect');
				el.sortDirectionSelect = el.c.find('.sortDirectionSelect');

				initEvents();

				const videoPortionElement = renders.newVideoContainer();

				//getting sort parameters from local storage
				const videoParameters = {
					sort: ed.sort,
				};

				self.app.platform.sdk.user
					.mystatisticnov()
					.catch(() => {
						return Promise.resolve(null);
					})
					.then((r) => {
						var addtext = ' / ' + (r ? r.histreferals : '&mdash;');

						renders.bonusProgram(
							{
								parameterName: 'ReferralUsers',
								value:
									(deep(app, 'platform.sdk.user.storage.me.rc') || '0') +
									addtext,
							},
							el.bonusProgramReferContainer,
						);
					});

				//getting and rendering videos
				actions
					.getHosts()
					.then((hosts = {}) => {
						const servers = Object.values(hosts).flat();

						servers.forEach(
							(server) =>
							(peertubeServers[server] = {
								videos: [],
								start: 0,
							}),
						);

						const serverPromises = servers.map((server) =>
							actions.getVideos(server, videoParameters),
						);

						return Promise.allSettled(serverPromises);
					})
					.then(() => actions.getFullPageInfo(videoPortionElement))
					.catch(() => actions.getFullPageInfo(videoPortionElement));

				//getting and rendering video quota information
				actions
					.getQuota()
					.then(() => renders.quota())
					.catch(() => renders.quota());

				p.clbk(null, p);
			},

			wnd: {
				header: '',
				close: function () {
					if (ed.closeClbk) {
						ed.closeClbk();
					}
				},
				postRender: function (_wnd, _wndObj, clbk) {
					wndObj = _wndObj;
					wnd = _wnd;

					if (clbk) {
						clbk();
					}
				},
				offScroll: true,
				noInnerScroll: true,
				class: 'videoCabinet normalizedmobile',
				allowHide: false,
				noCloseButton: true,
				noButtons: true,

				swipeClose: true,
				swipeCloseDir: 'right',
				swipeMintrueshold: 30,
			},
		};
	};

	self.run = function (p) {
		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);
	};

	self.stop = function () {
		_.each(essenses, function (essense) {
			essense.destroy();
		});
	};

	return self;
})();

if (typeof module != 'undefined') {
	module.exports = videoCabinet;
} else {
	app.modules.videoCabinet = {};
	app.modules.videoCabinet.module = videoCabinet;
}
