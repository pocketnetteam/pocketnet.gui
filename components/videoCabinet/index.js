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

	let firstRenderFlag = true;

	var Essense = function (p) {
		var primary = deep(p, 'history');

		var el;

		var wnd;
		var wndObj;
		var errorcomp = null;

		var transcodingIntervals = {};
		var ed = {};

		let tagElement;
		let tagArray = [];
		let newVideosAreUploading = false;
		let serversList = {};

		let unpostedVideosParsed;
		let videosInPosting = [];

		var peertubeServers = {};
		var userQuota = {};
		var blockChainInfo = [];
		var external = null;
		var perServerCounter = 10;
		var sharesDict = {};
		var videosInTemp = {};

		var allVideosLoaded = false;

		const descriptionCache = {};

		const sorting = {
			sortType: 'id',
			sortDirection: 'desc',
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
					payload: {
						...error,
						host: self.app.peertubeHandler.active(),
					},
					code: 502,
				});

				return error.text || findResponseError(error) || JSON.stringify(error);
			},

			getCachedViewsParsed() {
				const cahceViewsInformation = localStorage.getItem('aggregatedVideoViews_v2') || "{}";

				let viewsObject = {};

				try {
					viewsObject = JSON.parse(cahceViewsInformation);

					if (typeof viewsObject !== 'object') {
						viewsObject = {};
					}

				} catch (errorParsing) {
					viewsObject = {};
				}

				return viewsObject;
			},
		};

		var actions = {
			videoadded: function (resultLink) {
				actions
					.getSingleVideo(resultLink)
					.then((data) => {
						const { host, id } = self.app.peertubeHandler.parselink(resultLink);

						const formattedData = {
							...data,
							server: host,
							url: `peertube://${host}/${id}`,
							editable: true,
						};

						el.unPostedVideosContainer
							.find('.unpostedCaption')
							.addClass('hidden');

						renders.videos(
							[formattedData],
							renders.newVideoContainer(
								true,
								el.unPostedVideosContainer.find('.unpostedVideosBody'),
							),
							false,
						);
					})
					.catch((err = {}) => {
						if (!err.text) err.text = 'SINGLE_VIDEO_ADDING_VIDEOCABINET';

						return sitemessage(helpers.parseVideoServerError(err));
					});

				actions
					.getQuota()
					.then(() => renders.quota())
					.catch((err = {}) => {
						if (!err.text) err.text = 'QUOTA_RETIRIEVING_VIDEOCABINET';

						return sitemessage(helpers.parseVideoServerError(err));
					});
			},

			async getHosts() {
				// const serverStructureHosts = await self.app.peertubeHandler.api.proxy
				//   .roys({ type: 'view' })
				//   .catch(() => ({}));

				serversList = await self.app.peertubeHandler.api.proxy
					.allServers()
					.catch((err) => {
						if (!err.text) err.text = 'SERVER_LIST_ERROR_VIDEOCABINET';

						sitemessage(helpers.parseVideoServerError(err));

						return {};
					});

				return Promise.resolve(serversList);
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
					.then((res) => (userQuota = { ...res }))
					.catch((err) => {
						if (!err.text) err.text = 'GET_QUOTA_VIDEOCABINET';

						return sitemessage(helpers.parseVideoServerError(err));
					});
			},

			getBlockchainPostByVideos: (videoArray = []) =>
				self.app.api
					.rpc('searchlinks', [videoArray, 'video', 0, videoArray.length])

					.then((res = []) => {
						res.forEach((post) => {
							const postUrl = decodeURIComponent(post.u);

							blockChainInfo[postUrl] = { ...post };
						});
					})
					.catch((err) => {
						if (!err.text) err.text = 'GET_POSTED_STATUSES_VIDEOCABINET';

						return sitemessage(helpers.parseVideoServerError(err));
					}),

			resetHosts() {
				el.videoContainer.html('');

				const videoPortionElement = renders.newVideoContainer();

				// Object.keys(peertubeServers).forEach((server) => {
				//   peertubeServers[server] = {
				//     videos: [],
				//     start: 0,
				//   };
				// });

				return videoPortionElement;
			},

			getTotalRatings() {
				if (self.app.user.address.value) {
					var address = self.app.user.address.value;
					return self.app.api
						.rpc('getcontentsstatistic', [[address], 'video'], {})
						.then((r) => {
							var d =
								_.find(r || [], function (obj) {
									return address == obj.address;
								}) || {};

							return Promise.resolve(d);
						})
						.catch((err) => {
							if (!err.text) err.text = 'GET_TOTAL_RATINGS_VIDEOCABINET';

							return sitemessage(helpers.parseVideoServerError(err));
						});
				} else {
					return Promise.reject();
				}
			},

			getTotalViews() {
				const servers = Object.values(serversList)
					.map(royList => royList[0])
					.filter((server) => server);


				const serverPromises = servers.map((host) =>{
					return self.app.peertubeHandler.api.videos.totalViews({}, { host })
				}
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
						const viewsObject = helpers.getCachedViewsParsed();

						const cachedViews =+ (
							viewsObject[self.app.user.address.value] || 0
						);

						if (aggregatedNumberViews > cachedViews) {
							viewsObject[self.app.user.address.value] = aggregatedNumberViews;

							localStorage.setItem(
								'aggregatedVideoViews_v2',
								JSON.stringify(viewsObject),
							);

							return aggregatedNumberViews;
						}

						return cachedViews;
					})
					.catch((err) => {
						console.error(err)
						if (!err.text) err.text = 'GET_TOTAL_VIEWS_VIDEOCABINET';

						sitemessage(helpers.parseVideoServerError(err));

						return Promise.reject(err)
					});
			},

			getFullPageInfo(videoPortionElement, videos = null, fromBlockChainFlag) {
				renders.videos(videos, videoPortionElement, fromBlockChainFlag);

				//getting and rendering bonus program status for views and ratings (same template)
				const cahcedViews = helpers.getCachedViewsParsed()[self.app.user.address.value];
				if (cahcedViews) {
					renders.bonusProgram(
						{
							parameterName: 'bonusProgramViews',
							value: cahcedViews,
						},
						el.bonusProgramContainerStars,
					);
				}
				
				actions
					.getHosts()
					.then(() => actions.getTotalViews())
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
								? `${(result.scoreSum / result.scoreCnt).toFixed(1)} (${
									result.scoreCnt
								}) <i class="fas fa-star"></i>`
								: `&mdash;`;

						const renderingUsers = `${
							result.countLikers || 0
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
				const videoElement = el.c.find(`[uuid="${id}"]`);

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

			getBlockChainVideos(resetCache) {
				const payload = {
					author: self.app.user.address.value,
					begin: '',
					count: perServerCounter,
					height: 0,
					type: 'video',
					keyword: encodeURI(ed.search || ''),
					orderby: sorting.sortType || '',
					ascdesc: sorting.sortDirection || 'desc',
				};

				return new Promise((res) => {
					self.app.platform.sdk.node.shares.getprofilefeed(
						payload,
						(data = []) => {

							const outputVideos = data
								.filter((video = {}) => !video.deleted)
								.map((video = {}) => {
									const meta = self.app.platform.parseUrl(video.url) || {};
									sharesDict[video.url] = video;

									return {
										uuid: meta.id,
										name: video.caption,
										description: video.message,
										server: meta.host_name,
										txid: video.txid,
										url: video.url,
										createdAt: video.time,
										scoreSum: video.score,
										scoreCnt: video.scnt,
										comments: video.comments,
										editable:
											moment
												.duration(moment().diff(moment(video.time)))
												.asHours() < 24,
										state: {
											id: 1,
										},
									};
								});

							return res(outputVideos);
						},
						resetCache,
					);
				});
			},

			getUnpostedVideos() {
				let unpostedVideos =
					unpostedVideosParsed[self.app.user.address.value] || [];

				return new Promise((res) => {
					self.app.peertubeHandler.api.videos
						.getMyAccountVideos()
						.then((result = {}) => {
							const latestVideos = (result.data || []).map((video) =>
								self.app.peertubeHandler.composeLink(
									deep(video, 'channel.host'),
									video.uuid,
								),
							);

							unpostedVideos.push(...latestVideos);
							
							unpostedVideos = [...new Set(unpostedVideos)];

							return unpostedVideos;
						})
						.then((videos) =>
							actions.getBlockchainPostByVideos(
								videos.map((video = '') => (video)),
							),
						)
						.then(() => {
							const accountVideos = unpostedVideos
								.filter((video) => {
									if (blockChainInfo[video]) {
										state.removeVideo(
											self.app.peertubeHandler.parselink(video).id,
										);
									}

									return !blockChainInfo[video] || videosInTemp[video];
								})
								.map((video) => ({
									url: video,
								}));

								return accountVideos;
						})
						.then((accountVideos) =>
							self.app.platform.sdk.node.shares.loadvideoinfoifneed(
								accountVideos,
								true,
								function () {
									return res(
										accountVideos
										.filter(
											(video) =>
												{
													const daysPassed = deep(self.app.platform.sdk.videos.storage[video.url], 'data.original.publishedAt');
													return deep(self.app.platform.sdk.videos.storage[video.url], 'data.isCorrect') && moment(daysPassed).diff(moment.now(), 'days') > -21;
												}
										)
										.map(
											(video) =>
												self.app.platform.sdk.videos.storage[video.url],
										)
										.map((videoInfo = {}) => ({
											uuid: deep(videoInfo, 'meta.id'),
											name: deep(videoInfo, 'data.original.name'),
											description: actions.replaceNetLinks(
												deep(videoInfo, 'data.original.description') || '',
											),
											server: deep(videoInfo, 'meta.host_name'),
											url: deep(videoInfo, 'link'),
											createdAt: deep(videoInfo, 'data.original.createdAt'),
											state: deep(videoInfo, 'data.original.state') || {},
											editable: !videosInPosting.includes(
												deep(videoInfo, 'meta.url'),
											),
											isPosting: videosInPosting.includes(
												deep(videoInfo, 'meta.url'),
											),
										})),
									);
								},
							),
						);
				});
			},

			onVideoPost(videoLink, linkElement) {
				state.removeVideo(self.app.peertubeHandler.parselink(videoLink).id);

				linkElement.html(
					`<i class="fas fa-spinner fa-spin"></i>${self.app.localization.e(
						'videoIsPosting',
					)}`,
				);
				linkElement.attr('isposting', 'true');
			},

			onSendToBlockchain(data) {
				if (data.opmessage !== 'video') return;

				const videoUrl = deep(data, 'temp.url');

				const { id, host } = self.app.peertubeHandler.parselink(videoUrl);

				el.c.find(`.singleVideoSection[uuid="${id}"]`).addClass('hidden');

				actions
					.getSingleVideo(videoUrl)
					.then((dataVideo) => {

						const formattedData = {
							...dataVideo,
							server: host,
							url: videoUrl,
							txid: deep(data, 'temp.txid'),
							editable: true,
						};

						if (formattedData.description)
							formattedData.description = actions.replaceNetLinks(
								formattedData.description,
							);

						renders.videos(
							[formattedData],
							renders.newVideoContainer(true),
							true,
						);
					})
					.catch((err = {}) => {
						if (!err.text) err.text = 'SINGLE_VIDEO_ADDING_VIDEOCABINET';

						return sitemessage(helpers.parseVideoServerError(err));
					});
			},
		};

		var events = {
			onPageScroll() {
				const scrollProgress =
					el.windowElement.scrollTop() / el.scrollElement.height();

				if (
					scrollProgress >= LAZYLOAD_PERCENTAGE &&
					!newVideosAreUploading &&
					!allVideosLoaded
				) {
					events.getAdditionalVideos();
					newVideosAreUploading = true;
				}
			},

			getAdditionalVideos() {
				const videoPortionElement = renders.newVideoContainer();

        const videoParameters = { sort: ed.sort };

        if (ed.search) videoParameters.search = ed.search;

        return actions
          .getBlockChainVideos()
          .then((data = []) => {
            if (!data.length) allVideosLoaded = true;

						newVideosAreUploading = false;

						renders.videos(data, videoPortionElement, true);
					})
					.catch(() => videoPortionElement.addClass('hidden'));
			},

			onSearchVideo() {
				const searchString = el.searchInput.val();

				if ((ed.search || '') == (searchString || '')) return;
				ed.search = searchString;

        const videoPortionElement = actions.resetHosts();

        newVideosAreUploading = true;

        actions
          .getBlockChainVideos('clear')
          .then((data) => {
            if (!data.length) allVideosLoaded = true;

            newVideosAreUploading = false;

            renders.videos(data, videoPortionElement, true);
          })
          .catch(() => {
						renders.videos(null, videoPortionElement, false);
					});
			},

			onVideoSort() {
				sorting.sortType = el.sortTypeSelect.val();
				sorting.sortDirection = el.sortDirectionSelect.val();
				localStorage.setItem('videoCabinetSortType', el.sortTypeSelect.val());
				localStorage.setItem(
					'videoCabinetSortDirection',
					el.sortDirectionSelect.val(),
        );
        const videoPortionElement = actions.resetHosts();

        newVideosAreUploading = true;

        actions
          .getBlockChainVideos('clear')
          .then((data) => {
            if (!data.length) allVideosLoaded = true;

            newVideosAreUploading = false;

            renders.videos(data, videoPortionElement, true);
          })
          .catch(() => {
						renders.videos(null, videoPortionElement, false);
					});
			},
		};

		var renders = {
      //table with video elements
      videos(videosForRender, videoPortionElement, inBlockChainFlag) {
        //additional sorting due to different servers
        const videos =
          videosForRender ||
          Object.values(peertubeServers)
            .map((value) => value.videos)
            .filter((video) => video)
            .flat();

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
							firstRenderFlag,
						},
					},
					(p) => {
						firstRenderFlag = false;

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
              const currentLink = $(this);
              const videoLink = currentLink.attr('videoLink');
              const isPosting = currentLink.attr('isposting');

              if (isPosting === 'true') return;

              const meta = self.app.peertubeHandler.parselink(videoLink);

              self.app.peertubeHandler.api.videos
                .getDirectVideoInfo({ id: meta.id }, { host: meta.host })
                .then((dataWithoutDescription) => {
                  return self.app.peertubeHandler.api.videos.getDirectVideoDescription(
                    { id: meta.id },
                    { host: meta.host }
                  ).then(descriptionRes => {
                    return {
                      ...dataWithoutDescription,
                      description: descriptionRes.description,
                    };
                  });
                })
                .then((info) => {
                  const { name, description, tags } = info;
                  renders.addButton({
                    videoLink,
                    name,
                    description,
                    tags,
                    onPost: () => {
                      actions.onVideoPost(videoLink, currentLink);
                    },
                  });
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
              const editableFlag = menuActivatorElement.attr('editable') === 'true' ? true : false;

							return renders.metmenu(
								$(this),
								{ videoLink, backupHost, editableFlag },
								inBlockChainFlag,
							);
						});

						p.el.find('.singleVideoSection').each(function () {
							const singleVideoSection = $(this);

							const currentElement = singleVideoSection.find(
								'.postingStatusWrapper[videoTranscoding="false"]',
							);

							const isTranscoding = currentElement.attr('isTranscoding');

							const link = currentElement.attr('video');

              const txid = currentElement.attr('txid');

							if (inBlockChainFlag) {
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
									{
										txid,
									},
								);
							}

							if (!isTranscoding) {
								currentElement.find(`.${buttonCaption}`).removeClass('hidden');
								currentElement.find('.preloaderwr').addClass('hidden');
							}
						});

						self.app.platform.sdk.node.shares.loadvideoinfoifneed(
							videosForRender,
							true,
							function () {
								p.el.find('.singleVideoSection').each(function () {
									const sectionElement = $(this);
									const avatarWrapper = sectionElement.find('.videoAvatar');
									const avatarDescription =
										sectionElement.find('.videoDuration');
									const avatarPreloader = sectionElement.find(
										'.backgroundPreloader',
									);
									const videoUrl = avatarWrapper.attr('video');
									const uuid = sectionElement.attr('uuid');
									const videoInfo =
										self.app.platform.sdk.videos.storage[videoUrl] || self.app.platform.sdk.videos.storage[uuid];

									if (!videoInfo) return;

									avatarPreloader.addClass('hidden');
									avatarWrapper.css(
										'background-image',
										`url(${deep(videoInfo, 'data.image')})`,
									);
									avatarDescription.html(
										secInTime(deep(videoInfo, 'data.duration') || 0),
									);
								});

								p.el.find('.videoStatsWrapper').each(function () {
									const currentElement = $(this);

									const link = currentElement.attr('video');

									const linkInfo =
										videosForRender.find((video) => video.url === link) || {};
									const videoInfo =
										self.app.platform.sdk.videos.storage[linkInfo.url] || {};
									const views = deep(videoInfo, 'data.views');

									return renders.videoStats(currentElement, linkInfo, views);
								});
							},
						);

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
								`rotate(${
									(freePercentage - HALF_CIRCLE_ROTATE_PERCENTAGE) *
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
					external.show();

					return;
				}

				if (external) external.closehack();

				self.nav.api.load({
					open: true,
					id: elName,
					inWnd: true,

					history: false,

					essenseData: {
						storage: p.storage,
						value: p.value,
						currentLink: '',

						closeClbk: function () {
							external = null;
						},
					},

					clbk: function (p, element) {
						external = element;

						external.addclbk('videocabinet', actions.videoadded);
						external.addclbk(
							'videocabinet',
							() => {
								external = null;
							},
							'closed',
						);

						videoUploadData = element.essenseData;
					},
				});
			},
			//button in video table for adding post with video to blockchain
			addButton(parameters) {
				self.app.platform.ui.share(parameters);
			},
			//get link to existing video post
			postLink(element, link, buttonCaption, linkInfo) {
				if (isMobile()) {
					element.html(
						`<a class="videoPostLink" href="index?video=1&v=${
							linkInfo.txid
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
								close: function () {},
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
			videoStats(element, linkInfo, views) {
				self.shell(
					{
						name: 'videoStats',
						el: element,
						data: {
							views: +views || 0,
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
				var errorel = el.c.find('.videoErrorContainer');

				if (errorel.length) {
					if (errorcomp) {
						errorcomp.destroy();
						errorcomp = null;
					}

					self.nav.api.load(
						{
							open: true,
							id: 'abilityincrease',
							el: errorel,

							essenseData: {
								template: 'video',
							},
						},
						function (v, p) {
							errorcomp = p;
						},
					);
				}
			},
			//add new container for a protion of videos (lazyload)
			newVideoContainer(atStart = false, container = el.videoContainer) {
				const videoPortionElement = $(
					'<div class="videoPage"><div class="preloaderwr"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div></div>',
				);

				atStart
					? container.prepend(videoPortionElement)
					: container.append(videoPortionElement);

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
					(p) => {},
				);
			},
			//render menu with video controls
			metmenu(_el, parameters, isVideoPosted) {
				const { videoLink, backupHost, editableFlag } = parameters;

				const data = {
					isVideoPosted,
					editableFlag,
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
													el.c
														.find(`.singleVideoSection[uuid="${meta.id}"]`)
														.addClass('hidden');

													state.removeVideo(meta.id);
												})
												.catch((error = {}) => {
													if (error.code === 'removeerror') {
														return self.app.peertubeHandler.api.videos
															.remove(`peertube://${backupHost}/${meta.id}`)
															.then(() => {
																el.c
																	.find(
																		`.singleVideoSection[uuid="${meta.id}"]`,
																	)
																	.addClass('hidden');

																state.removeVideo(meta.id);
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

								element.find('.removePost').on('click', () => {
									const { id } = meta;

									const deletingElem = el.c.find(
										`.singleVideoSection[uuid="${id}"]`,
									);

									dialog({
										class: 'zindex',
										html: self.app.localization.e('removePostDialog'),
										btn1text: self.app.localization.e('dyes'),
										btn2text: self.app.localization.e('dno'),
										success: function () {
											deletingElem.addClass('loading');
											const currentShare = sharesDict[videoLink];

											const removePost = (share, clbk) => {
												share.deleted = true;

												/*const ct = new Remove();
												ct.txidEdit = share.txid;*/

												self.app.platform.sdk.node.shares.delete(
													share.txid,
													function (err, alias) {
														if (!err) {
															if (clbk) {
																clbk(null, alias);
															}
														} else {
															self.app.platform.errorHandler(err, true);

															if (clbk) clbk(err, null);
														}
													},
												);
											};

											removePost(currentShare, function (err, result) {
												if (err) {
													return self.app.Logger.error({
														err: 'ERROR_DELETING_VIDEO_FROMCABINET',
														code: 444,
														payload: {
															...err,
															host: self.app.peertubeHandler.active(),
														},
													});
												}
												deletingElem.addClass('hidden');
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
									app: self.app,
									multiple: false,

									action: function (file, clbk) {
										actions
											.uploadVideoWallpaper(file.file, {
												shareUrl: videoLink,
												backupHost,
											})
											.then((img) => {
												const previewContainer = el.c.find(
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
										.then((dataWithoutDescription) => {
											return self.app.peertubeHandler.api.videos.getDirectVideoDescription(
												{ id: meta.id },
												{ host: meta.host }
											).then(descriptionRes => {
												return {
													...dataWithoutDescription,
													description: descriptionRes.description,
												};
											});
										})
										.then((videoData) => {
											if (isVideoPosted) {
												const currentShare = sharesDict[videoLink];

												const editing = currentShare.alias();
												const hash = editing.shash();
												let em;

												return self.app.nav.api.load({
													open: true,
													id: 'share',
													animation: false,
													inWnd: true,
													_id: currentShare.txid,

													essenseData: {
														share: editing,
														notClear: true,
														hash: hash,
														absolute: true,
														cancel: function () {
															const close = deep(em, 'container.close');

															if (close) close();
														},

														post: function (alias) {
															const textContainert = el.c.find(
																`.singleVideoSection[uuid="${meta.id}"]`,
															);

															textContainert
																.find('.videoNameText')
																.text(alias.caption);
															textContainert
																.find('.videoDescriptionText')
																.text(alias.message);

															const close = deep(em, 'container.close');

															if (close) close();
														},
													},

													clbk: function (e, p) {
														em = p;
													},
												});
											}

											return self.app.nav.api.load({
												open: true,
												id: 'editVideoDescription',
												animation: false,
												inWnd: true,

												essenseData: {
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
																const textContainert = el.c.find(
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

													post: function () {
													},
												},

												clbk: function (e, p) {
													const editDialogEl = p.el;
													
													tagElement =
																editDialogEl.find('.videoTagsWrapper');
															tagArray = [...videoData.tags];
                              						renders.tags(tagElement);

															editDialogEl
																.find('.videoNameInput')
																.val(videoData.name);
															editDialogEl
																.find('.videoDescriptionInput')
																.val(videoData.description);
												},
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
			tags(element) {
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
            var tta = _.uniq(_.clone(tagArray).concat([tag]));

            var bycategories = self.app.platform.sdk.categories.fromTags(
              tta,
              null,
            );

            if (bycategories.categories.length > 2) {
              return false;
						}

            if (tta.length > 15) {
              return false;
            }

            tagArray = tta;

						return true;
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
							renders.tags(tagElement);
						},

						removeTags: function (tag) {
							tagActions.removeTags(tag);
							renders.tags(tagElement);
						},

						addTag: function (tag) {
							tagActions.addTag(tag);
              				renders.tags(tagElement);
						},

						addTags: function (tags) {
							tagActions.addTags(tags);
							renders.tags(tagElement);
						},
					},

					clbk: function (e, p) {},
				});
			},

			unPostedVideos(videos = [], element) {
				self.shell(
					{
						name: "unpostedVideos",
						el: element,
						data: {},
					},
					(p) => {
						const containerWrapper = p.el.find(".unpostedVideosBody");

						if (!videos.length) return;

						renders.videos(videos, containerWrapper, false);
					}
				);
            },
    };

    var state = {
      save() {
        localStorage.setItem(
          'unpostedVideos',
          JSON.stringify(unpostedVideosParsed),
        );
            },
      load() {
        const unpostedVideosByAddress = localStorage.getItem('unpostedVideos') || '{}';

				try {
					unpostedVideosParsed = JSON.parse(unpostedVideosByAddress);
				} catch (error) {
					self.app.Logger.error({
						err: 'DAMAGED_LOCAL_STORAGE',
						code: 801,
						payload: error,
					});

					unpostedVideosParsed = {};
				}

			
			},
			update() {},

			removeVideo(id) {
			state.load();

				unpostedVideosParsed[self.app.user.address.value] = (
					unpostedVideosParsed[self.app.user.address.value] || []
				).filter((item) => {
					const itemMeta = self.app.peertubeHandler.parselink(item);

					return itemMeta.id !== id;
				});

				state.save();
			},
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
								localStorage.getItem('videoCabinetSortType') || 'id',
							selectedDirection:
								localStorage.getItem('videoCabinetSortDirection') || 'desc',
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

								if (r.trial || !(r.balance && r.reputation)) {

									self.app.Logger.error({
										err: 'PEERTUBE_AUTH_ERROR_CABINET',
										payload: {
											...err,
											host: self.app.peertubeHandler.active(),
										},
										code: 501,
									});
								}
							},
						);
					});
			},

			destroy: function () {
				delete self.app.platform.ws.messages.transaction.clbks.postVideos;

				if (el.windowElement)
					el.windowElement.off('scroll', events.onPageScroll);

				_.each(transcodingIntervals, function (i) {
					clearInterval(i);
				});

				transcodingIntervals = {};

				el = {};

				firstRenderFlag = true;

				if (errorcomp) {
					errorcomp.destroy();
					errorcomp = null;
				}

				if (external) {
					if (!external.uploading || !external.uploading())
						external.closehack();
					else {
						external.removeclbk('videocabinet');
						external.removeclbk('videocabinet', 'closed');
					}

					external = null;
				}
			},

			init: function (p) {
				state.load();
				self.app.platform.ws.messages.transaction.clbks.postVideos =
					actions.onSendToBlockchain;

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.windowElement = ed.scrollElementName
					? $(ed.scrollElementName)
					: self.app.el.window;

				el.scrollElement = ed.scrollElementName
					? el.c.find('.userVideos')
					: el.c;

				renders.videoErrorContainer();

				//do nothing if user has no access to videos
				if (!ed.hasAccess) return p.clbk(null, p);

				el.videoContainer = el.c.find('.userVideos');
				el.unPostedVideosContainer = el.c.find('.unPostedVideos');
				el.quotaContainer = el.c.find('.quotaContainer');
				el.videoButtons = el.c.find('.videoActiveButton');

				el.searchInput = el.c.find('.videoSearchInput');
				el.searchButton = el.c.find('.videoSearchButton');

				// el.bonusProgramReferContainer = el.c.find('.referContainer');
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

				var externallatest = deep(
					self,
					'app.modules.uploadpeertube.module.essenses.uploadpeertube',
				);

				if (externallatest && !externallatest.destroyed) {
					external = externallatest;
					external.addclbk('videocabinet', actions.videoadded);
					external.addclbk(
						'videocabinet',
						() => {
							external = null;
						},
						'closed',
					);
				}

				self.app.platform.sdk.user
					.mystatisticnov()
					.catch(() => {
						return Promise.resolve(null);
					})
					.then((r) => {
						// var addtext = ' / ' + (r ? r.histreferals : '&mdash;');
						//
						// renders.bonusProgram(
						// 	{
						// 		parameterName: 'ReferralUsers',
						// 		value:
						// 			(deep(app, 'platform.sdk.user.storage.me.rc') || '0') +
						// 			addtext,
						// 	},
						// 	el.bonusProgramReferContainer,
						// );
					});

				const cabinetLoadingStartTime = performance.now();

				//getting and rendering videos
				actions
					.getBlockChainVideos('clear')
					.then((videos) =>
						actions.getFullPageInfo(videoPortionElement, videos, true),
					)
					.catch(() => actions.getFullPageInfo(videoPortionElement, [], true))
					.finally(() => {
						const loadingTime = performance.now() - cabinetLoadingStartTime;

						if (loadingTime > 10000) {
							self.app.Logger.error({
								err: 'LONG_CABINET_LOADING',
								payload: {
									loadingTime,
								},
								code: 485,
								level: 'warning',
							});
						}
					});

				//getting and rendering video quota information
				actions
					.getQuota()
					.then(() => renders.quota())
					.catch(() => renders.quota());

				//get unposted videos
				actions
					.getUnpostedVideos()
					.then((videos) =>
						renders.unPostedVideos(videos, el.unPostedVideosContainer),
					);

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
				class: 'videoCabinet normalizedmobile nobfilter maxheight showbetter',
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
			window.rifticker.add(() => {
				essense.destroy();
      });
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
