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

		var uploader, uploading = false, cancel = null;


		/*var events = {
			validateFile: (file) =>
				new Promise((resolve, reject) => {
					var video = document.createElement('video');
					video.preload = 'metadata';

					video.onloadedmetadata = () => {
						window.URL.revokeObjectURL(video.src);

						resolve();

					};

					video.src = URL.createObjectURL(file);
				}),
		};*/

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


		var state = {
			save: function () { },
			load: function () { },
		};

		var loadProgress = function(percentComplete, text) {

			if(percentComplete < 0) percentComplete = 0
			if(percentComplete > 100) percentComplete = 100

			let progress = percentComplete.toFixed(1);

			setBarProgress(progress, text);
		}

		var setBarProgress = function(percent, text) {
			el.uploadProgress
				.find('.upload-progress-bar')
				.css('width', percent + '%');

			el.uploadProgress
				.find('.upload-progress-percentage')
				.text(percent + '%');

			if(text){
				el.uploadProgress.find('.bold-font').text(self.app.localization.e(text))
			}
			else{
				el.uploadProgress.find('.bold-font').text('')
			}
		}

		var processing = function(enable){
			if(enable){
				el.c.addClass('processing')
				el.c.addClass('wasprocessing')

				if (wndObj){ wndObj.minimizeOnBgClick = true }

				uploading = true
			}
			else{
				el.c.removeClass('processing')

				if (wndObj){ wndObj.minimizeOnBgClick = false }

				uploading = false
			}
		}

		var initCancelListener = function(_cancel) {
			cancel = function(arg){
				_cancel(arg)
				cancel = null
			}

		}

		var showerror = function(text){
			if(text){
				el.videoError.text(self.app.localization.e(text));
				el.videoError.addClass('error-message');
			}
			else{
				el.videoError.text('');
				el.videoError.removeClass('error-message');
			}
		}

		var clear = function(){

			processing(false)
			setBarProgress(0)

			uploading = false

			if (cancel) {
				cancel()
			}

			if (uploader) {
				uploader.destroy()
				uploader = null
				uploading = false
			}

			showerror()
		}

		self.added = {}
		self.closed = {}

		var add = function(v){

			self.app.settings.set('common', 'lastuploadedvideo', {
				link : v,
				name : '',
				wasclbk : !_.isEmpty(self.added)
			});

			try {
				var currentUnloadedVideos = JSON.parse(
				localStorage.getItem('unpostedVideos') || '{}',
				);

				if (
					currentUnloadedVideos[self.app.user.address.value] &&
					typeof currentUnloadedVideos[self.app.user.address.value] === 'object'
				) {
					currentUnloadedVideos[self.app.user.address.value].push(v);
				} else {
					currentUnloadedVideos[self.app.user.address.value] = [v];
				}

				localStorage.setItem(
					'unpostedVideos',
					JSON.stringify(currentUnloadedVideos),
				);
			} catch (error) {
				localStorage.setItem('unpostedVideos', JSON.stringify({
					[self.app.user.address.value]: [v],
				}));
			}

			_.each(self.added, function(a){
				a(v)
			})

			if(_.isEmpty(self.added))
				if(el.c && el.c.closest('.wnd').hasClass('hiddenState')){
					sitemessage(self.app.localization.e('importingVideoSuccess'))
				}

		}

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

			el.cancelButton.on('click', () => {
				//clear()

				if(cancel) cancel()
			});

			el.videoInput.change(async function (evt) {

				if (!evt.target.files[0]) {

					showerror('videoSelectError')
					return;
				}

				var videoInputFile = el.videoInput.prop('files');

				if (!videoInputFile[0]) {
					showerror('videoSelectError')
					return;
				}

				var isAudio = videoInputFile[0].type.includes('audio')

				if (!videoInputFile[0].type.includes('video') && !isAudio) {
					showerror('videoFormatError')
					return;
				}

				if (videoInputFile[0].size > 4 * 1024 * 1024 * 1024) {

					showerror('videoSizeError')

					return;
				}

				if (uploader) {
					uploader.destroy()
					uploader = null
					uploading = false
				}

				var fileName = videoInputFile[0].name;
				//var hfname = fileName.slice(0, 20) + (fileName.length > 20 ? '...' : '')


				//ed.uploadInProgress = true;
				//el.uploadButton.prop('disabled', true);

				var data = {
					video: videoInputFile[0],
					title : fileName
				};

				data.name =  fileName;
				data.title = data.name

				await Promise.all(Object.values(data.video));

				//el.importUrl.addClass('hidden');

				const transcodeOption = self.app.platform.sdk.usersettings.meta.videoTranscoding;

				let transcodingAllowed = (transcodeOption && transcodeOption.value);

				// For audio files, disable the transcoding
				if (isAudio)
					transcodingAllowed = false;

				let transcoded = null;


				/*el.videoError.text(hfname);
				el.videoError.removeClass('error-message');*/

				showerror()
				processing(true)
				loadProgress(0, (isAudio) ? 'uploadAudioProgress_start' : 'uploadVideoProgress_start');

				if (transcodingAllowed && typeof _Electron !== 'undefined') {
					const file = evt.target.files[0];

					const transcoder = new TranscoderClient(electron.ipcRenderer);

					//el.cancelButton.addClass('hidden');

					let binProcessing = false;
					let videoTranscoding = false;

					const progressBinaries = (task, progress) => {

						if (!binProcessing && progress !== 100) {
							loadProgress(0, 'uploadVideoProgress_binaries');

							binProcessing = true;

							return
						}

						loadProgress(progress, 'uploadVideoProgress_binaries');
					};
					const progressTranscode = (task, progress) => {
						if (!videoTranscoding) {
							loadProgress(0, 'uploadVideoProgress_processing');

							videoTranscoding = true;

							return
						}

						loadProgress(progress, 'uploadVideoProgress_processing');
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
							});
						});

						transcoded = await transcoder.runTask(file);

					} catch (err) {
						switch (err) {
							case 'TRANSCODE_SUBOPTIMAL_RESULT':
								//sitemessage(self.app.localization.e('videoTranscodingNotOptimal'));
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
								//sitemessage(self.app.localization.e('pleaseTryAgain'));
								console.error('Strange error, please, contact with developers', err);
								break;
						}
					}
				}

				if (transcoded) {
					const { lastModified, name, type } = data.video;

					const transcodedFile = {
						size: transcoded.resultSize,
						lastModified,
						name,
						title : name,
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


				loadProgress(0, (isAudio) ? 'uploadAudioProgress_uploading' : 'uploadVideoProgress_uploading');

				uploader.loadProgress = (percent) => {
					loadProgress(percent, (isAudio) ? 'uploadAudioProgress_uploading' : 'uploadVideoProgress_uploading');
				};

				uploader.chunkScalingCalculator = ({ time, videoSize, chunkSize }, data) => {
					if (!data.started) {
						data.countChunks = 0;
					}

					data.started = true;

					if (data.showInfo) {
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

				initCancelListener(() => {
					uploader.cancel(); processing(false)
				});
				
				uploader.uploadChunked().then((response) => {

					if(!uploading) return

					loadProgress(100);

					setTimeout(() => {
						//processing(false)

						uploading = false

						add(response.videoLink);

						wndObj.close();



					}, 300);
				})
				.catch((e = {}) => {

					processing(false)

					self.app.Logger.error({
						err: e.text || 'videoUploadError',
						code: 401,
						payload: {
							...e,
							host: self.app.peertubeHandler.active(),
						},
					});

					if (!e.cancel) {
						let message = e.text || findResponseError(e) || 'Video upload error';

						sitemessage(message);
					}

					if(el.c.closest('.wnd').hasClass('hiddenState')){
						wndObj.close();
					}

				}).finally(() => {

					if (el.videoInput)
						el.videoInput.val('');
				})

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
						processing(true)

						var options = {
							type: 'importVideo',
						};

						options.progress = function (percentComplete) {
							loadProgress(percentComplete, 'importingVideo');

						};

						options.cancel = function (cancel) {

							initCancelListener(cancel)

						};


						self.app.peertubeHandler.api.videos.import({

							data: { targetUrl: v[0] },

						}, options).then((response) => {

							if (response.error) {
								return;
							}

							add(response);

							wndObj.close();

							uploading = false
						})
						.catch((e = {}) => {

							self.app.Logger.error({
								err: e.text || 'videoImportError',
								payload: {
									...e,
									host: self.app.peertubeHandler.active(),
								},
								code: 402,
							});



							processing(false)

							if (!e.cancel) {
								var message = e.text || findResponseError(e) || `Uploading error`;
								sitemessage(message);
							}

							if(el.c.closest('.wnd').hasClass('hiddenState')){
								wndObj.close();
							}
						});
					},
				});
			});
		};

		return {
			primary: primary,

			id : 'uploadpeertube',

			addclbk : function(index, fun, event){
				if(!event) event = 'added'

				if (self[event])
					self[event][index] = fun
			},

			removeclbk : function(index, event){

				if(!event) event = 'added'

				if (self[event])
					delete self[event][index]
			},

			uploading : function(){
				return uploading
			},

			cancel : function(){
				clear()
			},

			show : function(){
				var v = deep(self, 'container.show')

				if(v) v()
			},

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;


				var data = {
					hasAccess: false,
					increase: {},
					isAudio: (ed.isAudio != undefined) ? ed.isAudio : false
				};

				error = false;
				uploading = false

				globalpreloader(true, true);

				self.app.peertubeHandler.api.user
					.me()
					.then((res) => {
						data.hasAccess = true;

						clbk(data);
					})
					.catch((e = {}) => {

						console.error(e)

						if(e.response) e = e.response

						self.app.peertubeHandler.clear()

						data.e = e.response || e;
						error = true;

						self.app.platform.sdk.ustate.canincrease(
							{ template: 'video' },
							function (r) {

								data.increase = r;

								clbk(data);

								if (r.trial || !(r.balance && r.reputation)) {
									self.app.Logger.error({
										err: 'PEERTIBE_AUTH_ERROR_VIDEOELEMENT',
										payload: {
											...e,
											host: self.app.peertubeHandler.active(),
										},
										code: 501,
									});
								}
							},
						);
					})
					.then(() => {
						globalpreloader(false);
					});
			},

			destroy: function () {
				el = {};

				if (uploader) {
					uploader.destroy()
					uploader = null
				}

				if (errorcomp) {
					errorcomp.destroy()
					errorcomp = null
				}

				uploading = false
				cancel = null

				self.app.mobile.backgroundMode(false)


			},

			closehack : function(){
				self.closeContainer()
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
				//el.closeButton = p.el.find('.closeButton');

				el.header = el.c.find('.upload-header');

				self.app.settings.delete('common', 'lastuploadedvideo');
				//el.preloaderElement = el.c.find('.iconwr');

				initEvents();


				renders.videoErrorContainer()

				//if (error) el.c.closest('.wnd').addClass('witherror');

				p.clbk(null, p);

				self.app.mobile.backgroundMode(true)

			},

			wnd: {
				header: '',
				close: function () {
					_.each(self.closed, function(c){
						c()
					})
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
				allowHide: true,
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
			window.requestAnimationFrame(() => {
				essense.destroy();
			})
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
