window.BSTMediaCs = function () {
	var self = this;

	function iOS() {
		return [
		  'iPad Simulator',
		  'iPhone Simulator',
		  'iPod Simulator',
		  'iPad',
		  'iPhone',
		  'iPod'
		].includes(navigator.platform)
		// iPad on iOS 13 detection
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}
	
	isios = function () {
		return (window.cordova && window.device && deep(window, 'device.platform') == 'iOS') || iOS()
	}

	self.gettingmedia = false;

	var permissions = {
		ios: {
			audio: function () {
				return new Promise((resolve, reject) => {

					window.AudioToggle.checkAudioPermission(function(hasPermission){
						if (hasPermission) {
							resolve();
						} else {
							reject("permissions");
						}
					})

				});
			},

			video: function () {
				return new Promise((resolve, reject) => {

					window.AudioToggle.checkVideoPermission(function(hasPermission){
						if (hasPermission) {

							window.AudioToggle.checkAudioPermission(function(hasPermission){
								if (hasPermission) {
									resolve();
								} else {
									reject("permissions");
								}
							})

						} else {
							reject("permissions");
						}
					})

				});
			},
		},

		audio: function () {
			var permissions = window.cordova.plugins.permissions;

			return new Promise((resolve, reject) => {
				if (permissions) {
					var request = function () {
						permissions.requestPermission(
							permissions.RECORD_AUDIO,
							(status) => {
								if (status.hasPermission) {
									resolve();
								} else {
									reject("permissions");
								}
							},
							(err) => {
								console.error(err);

								reject("permissions");
							}
						);
					};

					permissions.checkPermission(
						permissions.RECORD_AUDIO,
						(status) => {
							if (status.hasPermission) {
								resolve();
							} else {
								request();
							}
						},
						(err) => {
							console.error(err);

							request();
						}
					);
				} else {
					reject("permissions");
				}
			});
		},

		video: function () {
			var permissions = window.cordova.plugins.permissions;

			return new Promise((resolve, reject) => {
				if (permissions) {
					permissions.hasPermission(permissions.CAMERA, (status) => {
						if (status.hasPermission) {
							resolve();
						} else {
							permissions.requestPermission(
								permissions.CAMERA,
								() => {
									resolve();
								},
								() => {
									reject("permissions");
								}
							);
						}
					});
				} else {
					reject("permissions");
				}
			});
		},
	};

	var initPermissions = function (mediasettings) {
		var callperm = function (f, setting) {
			if (setting) {
				return f();
			} else {
				return Promise.resolve();
			}
		};

		if (window.cordova && window.device) {
			var ios = isios();

			return callperm(
				ios ? permissions.ios.audio : permissions.audio,
				mediasettings.audio
			)
				.then(() => {
					return callperm(
						ios ? permissions.ios.video : permissions.video,
						mediasettings.video
					);
				})
				.catch((e) => {
					console.error("E", e);
					return Promise.reject(e);
				});
		}

		return Promise.resolve();
	};

	var initMedia = function (mediasettings) {
		return new Promise((resolve, reject) => {
			initPermissions(mediasettings)
				.then(() => {
			
					if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						navigator.mediaDevices
							.getUserMedia(mediasettings)
							.then(resolve)
							.catch(reject);
					} else {
						(
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia
						)(mediasettings, resolve, reject);
					}
				})
				.catch(reject);
		});
	};

	self.get = function (mediasettings) {
		return initMedia(mediasettings);
	};

	self.permissions = initPermissions;
};

window.BSTMedia = new window.BSTMediaCs()

