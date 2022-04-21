

if (typeof _Electron !== 'undefined') {
	ipcRenderer = require('electron').ipcRenderer;

}

var uploadpeertube = (function () {
	var self = new nModule();

	var essenses = {};

	var ed = {};

	var Essense = function (p) {
		var primary = deep(p, 'history');

		var el, error;

		var wnd;
		var wndObj;
		var errorcomp = null;

		var xhrRequest;

		var actions = {};

		var events = {
			validateFile: (file) =>
				new Promise((resolve, reject) => {
					var video = document.createElement('video');
					video.preload = 'metadata';

					video.onloadedmetadata = () => {
						window.URL.revokeObjectURL(video.src);

						resolve();

						/*// to bits and then to bitrate
						var averageBitrate = (8 * file.size) / video.duration;

						return averageBitrate > 8000000
						  ? reject({
							  text: self.app.localization.e('videoBitrateError'),
							})
						  : resolve();*/
					};

					video.src = URL.createObjectURL(file);
				}),
		};

		var renders = {
			videoErrorContainer: function () {

				var errorel = el.c.find('.videoErrorContainer')


				if (errorel.length) {

					if (errorcomp) {
						errorcomp.destroy()
						errorcomp = null
					}

					self.nav.api.load({
						open: true,
						id: 'abilityincrease',
						el: errorel,

						essenseData: {
							template: 'video'
						}
					}, function (v, p) {
						errorcomp = p
					})
				}

			},
		};

		var videoId,
			loadedImage = null;

		var state = {
			save: function () { },
			load: function () { },
		};

		var initEvents = function () {
			el.c.find('.buypkoins').on('click', function () {
				self.closeContainer();

				self.nav.api.load({
					open: true,
					href: 'wallet',
					history: true,
					inWnd: true,

					essenseData: {
						simple: true,
						action: 'buy',
					},
				});
			});

			el.c.find('.tooltip').tooltipster({
				theme: 'tooltipster-light',
				maxWidth: 600,
				zIndex: 1006,
				position: 'bottom',
				contentAsHTML: true,
			});



			el.videoInput.change(async function (evt) {
				if (!evt.target.files[0]) {
					el.videoError.text('No file was selected');
					el.videoError.addClass('error-message');
					return;
				}

				var fileName = evt.target.files[0].name;

				el.videoError.text(
					fileName.slice(0, 20) + (fileName.length > 20 ? '...' : ''),
				);

				el.videoError.removeClass('error-message');
				var videoInputFile = el.videoInput.prop('files');
				var videoName = wnd.find('.upload-video-name').val();
				var nameError = wnd.find('.name-type-error');

				nameError.text('');


				if (videoInputFile[0].size > 4 * 1024 * 1024 * 1024) {
					el.videoError.text(self.app.localization.e('videoSizeError'));
					el.videoError.addClass('error-message');

					return;
				}

				// validation
				if (!videoInputFile[0]) {
					el.videoError.text('No video selected');
					el.videoError.addClass('error-message');

					return;
				}

				if (!videoInputFile[0].type.includes('video')) {
					el.videoError.text('Incorrect video format');
					el.videoError.addClass('error-message');

					return;
				}

				ed.uploadInProgress = true;
				el.header.removeClass('activeOnRolled');
				el.uploadButton.prop('disabled', true);

				var data = {
					video: videoInputFile[0],
				};

				data.name = videoName || fileName;

				await Promise.all(Object.values(data.video));

				var options = {
					type: 'uploadVideo',
				};

				function setBarProgress(percent) {
					el.uploadProgress
						.find('.upload-progress-bar')
						.css('width', percent + '%');
					el.uploadProgress
						.find('.upload-progress-percentage')
						.text(percent + '%');
				}

				function loadProgress(percentComplete, showFinalPreloader = false) {
					let progress = Math.floor(percentComplete).toString(10);

					const progress100 = (progress >= 100);
					const isPreloaderHidden = el.preloaderElement.hasClass('hidden');

					if (progress100 && showFinalPreloader && isPreloaderHidden) {
						setTimeout(() => {
							el.preloaderElement.removeClass('hidden');
						}, 1000);
					}

					setBarProgress(progress);
				}

				function initCancelListener(cancel) {
					const cancelCloseFunction = () => {
						if (typeof cancel === 'function') cancel();

						self.closeContainer()
					};

					ed.cancelCloseFunction = cancelCloseFunction;

					el.closeButton.on('click', cancel);
					el.cancelButton.one('click', () => {
						el.uploadProgress.addClass('hidden');

						setBarProgress('0');

						el.cancelButton.addClass('hidden');
						el.importUrl.removeClass('hidden');

						ed.uploadInProgress = false;
						cancel();

						el.videoInput.val('');
						el.wallpaperError.text('');

						el.uploadButton.prop('disabled', false);
						el.header.addClass('activeOnRolled');
						el.uploadProgress.addClass('hidden');
					});

					el.cancelButton.removeClass('hidden');
				}

				el.importUrl.addClass('hidden');

				const transcodeOption = self.app.platform.sdk.usersettings.meta.videoTranscoding;

				let transcodingAllowed = (transcodeOption && transcodeOption.value);

				let transcoded = null;

				if (transcodingAllowed && typeof _Electron !== 'undefined') {
					const file = evt.target.files[0];

					const transcoder = new TranscoderClient(electron.ipcRenderer);

					el.cancelButton.addClass('hidden');

					let binProcessing = false;
					let videoTranscoding = false;

					const progressBinaries = (task, progress) => {
						if (!binProcessing && progress !== 100) {
							loadProgress(0);

							el.uploadProgress.find('.bold-font')
								.text(self.app.localization.e('uploadVideoProgress_binaries'))
								.removeClass('uploading')
								.addClass('binaries');

							el.uploadProgress.find('.bold-font')
								.text(self.app.localization.e('uploadVideoProgress_binaries'))

							el.uploadProgress.removeClass('hidden');

							binProcessing = true;
						}

						loadProgress(progress);
					};
					const progressTranscode = (task, progress) => {
						if (!videoTranscoding) {
							loadProgress(0);

							el.uploadProgress
								.find('.upload-progress-bar')
								.removeClass('uploading binaries')
								.addClass('processing');

							el.uploadProgress.find('.bold-font')
								.text(self.app.localization.e('uploadVideoProgress_processing'))

							el.uploadProgress.removeClass('hidden');

							videoTranscoding = true;
						}

						loadProgress(progress);
					};

					transcoder.setPreCheckFunction((probe) => {
						const MaxVideoBitrate = 2600;
						const MaxAudioBitrate = 256;
						const MaxVideoFramerate = 25;

						const isWidthBigger = (probe.width > 1280);
						const isHeightBigger = (probe.height > 720);
						const isVideoBitrateBigger = (probe.videoBitrate > MaxVideoBitrate);
						const isAudioBitrateBigger = (probe.audioBitrate > MaxAudioBitrate);
						const isFrameRateBigger = (probe.frameRate > MaxVideoFramerate);

						const isVerticalVideo = (probe.width < probe.height);

						if (isVerticalVideo) {
							return 'VERTICAL_VIDEO_NOT_SUPPORTED';
						}

						const isTranscodeNeeded = (
							isWidthBigger
							|| isHeightBigger
							|| isVideoBitrateBigger
							|| isAudioBitrateBigger
							|| isFrameRateBigger
						);

						if (!isTranscodeNeeded) {
							return 'NO_TRANSCODE_NEEDED';
						}
					});

					try {
						transcoder.setBinariesProgressListener(progressBinaries);
						transcoder.setTranscodeProgressListener(progressTranscode);
						transcoder.setTranscodeStartedListener((task) => {
							initCancelListener(() => {
								task.close(true);
								sitemessage(self.app.localization.e('uploadCanceled'));
							});
						});

						transcoded = await transcoder.runTask(file);
					} catch (err) {
						switch (err) {
							case 'TRANSCODE_SUBOPTIMAL_RESULT':
								sitemessage(self.app.localization.e('videoTranscodingNotOptimal'));
								console.error('Suboptimal transcoding results expected. Preferring original video');
								break;
							case 'TRANSCODE_FFMPEG_ERROR':
								console.error('FF Binaries produced error while processing video');
								break;
							case 'TRANSCODE_OUTPUT_MISSING':
								console.error('Transcoder was not able to find processed video');
								break;
							case 'BINARIES_REQUIREMENTS':
								console.error('This device does not meet some requirements for transcoder');
								break;
							case 'TRANSCODE_UNNECESSARY':
								break;

							case 'TRANSCODE_NONSTOP':
								console.error('Transcoding was not stopped. Timeout', err);
								break;
							case 'PROBE_BINARIES_DISAPPEARED':
								console.error('FF Binaries disappeared', err);
								break;
							case 'TRANSCODER_BUSY':
								console.error('Tried to load task while transcoder is busy', err);
								break;
							default:
								sitemessage(self.app.localization.e('pleaseTryAgain'));
								console.error('Strange error, please, contact with developers', err);
								break;
						}
					}
				}

				let uploader;

				if (transcoded) {
					const { lastModified, name, type } = data.video;

					const transcodedFile = {
						size: transcoded.resultSize,
						lastModified,
						name,
						type,
					};

					uploader = new VideoUploader(transcodedFile);

					uploader.chunkRequestor = async (start, end) => {
						const chunkData = await transcoded.getChunk(start, end);
						return new Blob([chunkData.data]);
					};
				} else {
					uploader = new VideoUploader(data.video);
				}

				el.uploadProgress
					.find('.upload-progress-bar')
					.removeClass('binaries processing')
					.addClass('uploading');

				el.uploadProgress.find('.bold-font')
					.text(self.app.localization.e('uploadVideoProgress_uploading'))

				el.uploadProgress.removeClass('hidden');

				loadProgress(0);

				uploader.loadProgress = (percent) => {
					loadProgress(percent, true);
				};

				uploader.chunkScalingCalculator = ({ time, videoSize, chunkSize }, data) => {
					if (!data.started) {
						data.countChunks = 0;
					}

					data.started = true;

					if (data.showInfo) {
						console.log('Video will be uploaded in chunks', Math.round(videoSize / chunkSize));
						console.log('Expected time in seconds', (time / 1000) * Math.round(videoSize / chunkSize));
						console.log('Started at', Date.now() / 1000);

						window.ct_expected = Math.floor((time / 1000) * Math.round(videoSize / chunkSize));

						data.showInfo = false;
					}

					if (data.countChunks >= 5 && data.showInfo === undefined) {
						data.showInfo = true;
					}

					data.countChunks++;

					/**
					 * TODO: Chunk size optimization is
					 *       a complex task. Tests might
					 *       resolve some speed issues in
					 *       future. Must be tested...
					 */

					if (window.cordova || isDeviceMobile()) {
						/** Mobile slow 3G chunking */
						return 256 * 1024;
					}

					/** Regular internet (60 mbit/s) */
					return 256 * 4096;
				};

				initCancelListener(() => uploader.cancel());

				function hideLoadingBar() {
					el.uploadButton.prop('disabled', false);
					el.header.addClass('activeOnRolled');
					el.uploadProgress.addClass('hidden');

					el.preloaderElement.addClass('hidden');

					ed.uploadInProgress = false;
				}

				uploader.uploadChunked()
					.then((response) => {
						loadProgress(100, true);

						setTimeout(() => {
							hideLoadingBar();

							actions.added(response.videoLink, wnd.find('.upload-video-name').val());
							wndObj.close();
						}, 2000);
					})
					.catch((e = {}) => {
						self.app.Logger.error({
							err: e.text || 'videoUploadError',
							code: 401,
						});

						//console.error('Uploading error', e);

						hideLoadingBar();

						if (!e.cancel) {
							let message = e.text || findResponseError(e) || 'Video upload error';
							console.error('Video upload error', e);

							sitemessage(message);
						}
					});

			});

			el.importUrl.click(() => {
				inputDialogNew({
					caption: self.app.localization.e('importHeading'),
					class: 'importVideoDialog',
					wrap: true,
					values: [
						{
							defValue: '',
							validate: 'empty',
							placeholder: self.app.localization.e('importInputPlaceholder'),
							label: self.app.localization.e('importInputLabel'),
						},
					],

					success: function (v) {
						el.videoInput.prop('disabled', true);

						ed.uploadInProgress = true;
						el.header.removeClass('activeOnRolled');
						el.uploadButton.prop('disabled', true);
						el.uploadProgress.removeClass('hidden');

						var options = {
							type: 'importVideo',
						};

						options.progress = function (percentComplete) {
							var formattedProgress = (percentComplete * 0.9).toFixed(2);

							if (
								formattedProgress === '100.00' &&
								el.preloaderElement.hasClass('hidden')
							) {
								el.preloaderElement.removeClass('hidden');
							}

							el.uploadProgress
								.find('.upload-progress-bar')
								.css('width', formattedProgress + '%');
							el.uploadProgress
								.find('.upload-progress-percentage')
								.text(formattedProgress + '%');
						};

						options.cancel = function (cancel) {
							const cancelCloseFunction = () => {
								if (typeof cancel === 'function') cancel();

								self.closeContainer()
							};

							ed.cancelCloseFunction = cancelCloseFunction;

							el.cancelButton.on('click', () => {
								el.uploadProgress.addClass('hidden');
								el.cancelButton.addClass('hidden');
								el.importUrl.removeClass('hidden');

								el.videoInput.prop('disabled', false);

								ed.uploadInProgress = false;
								cancel();
							});

							el.cancelButton.removeClass('hidden');
						};

						el.importUrl.addClass('hidden');

						self.app.peertubeHandler.api.videos
							.import(
								{
									data: { targetUrl: v[0] },
								},
								options,
							)
							.then((response) => {
								if (response.error) {
									return;
								}

								videoId = response.split('/').pop();

								actions.added(response, wnd.find('.upload-video-name').val());
								ed.uploadInProgress = false;

								wndObj.close();
							})
							.catch((e = {}) => {

								self.app.Logger.error({
									err: e.text || 'videoImportError',
									payload: JSON.stringify(e),
									code: 402,
								});

								el.videoInput.val('');
								el.wallpaperError.text('');

								el.uploadButton.prop('disabled', false);
								el.header.addClass('activeOnRolled');
								el.uploadProgress.addClass('hidden');

								el.importUrl.removeClass('hidden');
								el.videoInput.prop('disabled', false);

								ed.uploadInProgress = false;

								if (!e.cancel) {
									var message =
										e.text ||
										findResponseError(e) ||
										`Uploading error: ${JSON.stringify(e)}`;

									sitemessage(message);
								}
							});
					},
				});
			});
		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;

				actions = ed.actions;

				var data = {
					hasAccess: false,
					increase: {},
				};

				error = false;

				globalpreloader(true, true);

				self.app.peertubeHandler.api.user
					.me()
					.then((res) => {
						data.hasAccess = true;

						clbk(data);
					})
					.catch((e = {}) => {

						console.log("ERRR", e)

						self.app.peertubeHandler.clear()

						self.app.Logger.error({
							err: e.text || 'getInfoError',
							payload: JSON.stringify(e),
							code: 501,
						});

						data.e = e;
						error = true;

						self.app.platform.sdk.ustate.canincrease(
							{ template: 'video' },
							function (r) {

								data.increase = r;

								clbk(data);
							},
						);
					})
					.then(() => {
						globalpreloader(false);
					});
			},

			destroy: function () {
				el = {};

				if (errorcomp) {
					errorcomp.destroy()
					errorcomp = null
				}
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.videoInput = el.c.find('.upload-video-file');
				el.videoWallpaper = el.c.find('.upload-video-wallpaper');

				el.videoError = el.c.find('.file-type-error');
				el.wallpaperError = el.c.find('.wallpaper-type-error');

				el.videoLabel = el.c.find('.upload-video-file-label');
				el.wallpaperLabel = el.c.find('.upload-video-wallpaper-label');

				el.uploadProgress = el.c.find('.upload-progress-container');
				el.importUrl = el.c.find('.import-container');

				el.uploadButton = el.c.find('.uploadButton');
				el.cancelButton = el.c.find('.cancelButton');
				el.closeButton = p.el.find('.closeButton');

				el.header = el.c.find('.upload-header');

				el.preloaderElement = el.c.find('.iconwr');

				initEvents();

				renders.videoErrorContainer()

				if (error) el.c.closest('.wnd').addClass('witherror');

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
				class: 'uploadpeertube normalizedmobile showbetter',
				allowHide: !isTablet(),
				noCloseButton: !isTablet(),
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
	module.exports = uploadpeertube;
} else {
	app.modules.uploadpeertube = {};
	app.modules.uploadpeertube.module = uploadpeertube;
}
