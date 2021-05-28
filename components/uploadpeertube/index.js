var uploadpeertube = (function () {
	var self = new nModule();

	var essenses = {};

	var ed = {};

	var Essense = function (p) {
		var primary = deep(p, 'history');

		var el;

		var wnd;
		var wndObj;

		var xhrRequest;

		var actions = {};

		var events = {};

		var renders = {};

		var videoId, loadedImage = null;

		var state = {
			save: function () { },
			load: function () { },
		};


		var resizeImage = function (base64, clbk) {

			var images = [{
				original: base64,
				index: 0
			}]

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
						aspectRatio: 16 / 9,
						style: 'apply',
						autoCropArea: 0.9,
					},

					success: function (i, editclbk) {

						resize(images[0].original, 1920, 1080, function (resized) {
							var r = resized.split(',');

							if (r[1]) {

								editclbk()

								if (clbk)
									clbk(resized)

							}

						})

					}
				}
			})
		}

		var initEvents = function () {
			el.videoInput.change(function (evt) {
				var fileName = evt.target.files[0].name;

				el.videoError.text(
					fileName.slice(0, 20) + (fileName.length > 20 ? '...' : ''),
				);

				el.videoError.removeClass('error-message');
				var videoInputFile = el.videoInput.prop('files');
				var videoName = wnd.find('.upload-video-name').val();
				var nameError = wnd.find('.name-type-error');

				nameError.text('');

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
				el.uploadProgress.removeClass('hidden');

				var data = {
					video : videoInputFile[0]
				}

				if (videoName) {
					data.name = videoName;
				}

				var options = {}

				options.progress = function(percentComplete){
					var formattedProgress = percentComplete.toFixed(2);

					if (formattedProgress === '100.00' && el.preloaderElement.hasClass('hidden')) {
						el.preloaderElement.removeClass('hidden');
					}

					el.uploadProgress
						.find('.upload-progress-bar')
						.css('width', formattedProgress + '%');
					el.uploadProgress
						.find('.upload-progress-percentage')
						.text(formattedProgress + '%');
				}

				options.cancel = function (cancel) {

					const cancelCloseFunction = () => {
						if (typeof cancel === 'function') cancel();

						wndObj.close();
					};

					ed.cancelCloseFunction = cancelCloseFunction;

					el.cancelButton.on('click', () => {
						el.uploadProgress.addClass('hidden');
						el.cancelButton.addClass('hidden');
						ed.uploadInProgress = false;
						cancel();

					});

					el.cancelButton.removeClass('hidden');
				};

				self.app.peertubeHandler.api.videos.upload(data, options).then(response => {

					el.uploadButton.prop('disabled', false);
					el.header.addClass('activeOnRolled');
					el.uploadProgress.addClass('hidden');

					el.preloaderElement.addClass('hidden');

					ed.uploadInProgress = false;

					if (response.error) {
						return;
					}

					videoId = response.split('/').pop();

					actions.added(response, wnd.find('.upload-video-name').val());
					wndObj.close();

				}).catch(e => {

					console.log("ERROR", e)

					el.videoInput.val('');
					el.wallpaperError.text('');

					el.uploadButton.prop('disabled', false);
					el.header.addClass('activeOnRolled');
					el.uploadProgress.addClass('hidden');

					if (e.cancel) {
						sitemessage('Uploading canceled');
					} 
					else {
						var message = e.text || findResponseError(e) || 'Uploading error';

						sitemessage(message);
					}

				})

				console.log(data, options)

			

			});


			el.importUrl.change(() => {
				if (el.importUrl.val()) {
					el.videoLabel.addClass('disabledInput');
					el.videoInput.prop('disabled', true);

					el.wallpaperLabel.addClass('disabledInput');
					el.videoWallpaper.prop('disabled', true);
				} else {
					el.videoLabel.removeClass('disabledInput');
					el.videoInput.prop('disabled', false);

					el.wallpaperLabel.removeClass('disabledInput');
					el.videoWallpaper.prop('disabled', false);
				}
			});

		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;

				actions = ed.actions;

				var data = {};

				clbk(data);
			},

			destroy: function () {
				el = {};
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
				el.importUrl = el.c.find('.import-video-link');

				el.uploadButton = el.c.find('.uploadButton');
				el.cancelButton = el.c.find('.cancelButton');

				el.header = el.c.find('.upload-header');

				el.preloaderElement = el.c.find('.iconwr');

				initEvents();

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
				class: 'uploadpeertube',
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
