var PeertubeRequest = function (app = {}) {
	var self = this;

	var timeout = function (ms, promise, controller) {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				if (controller.signal.dontabortable) {
					return;
				}

				if (controller) {
					controller.abort();
				}
			}, ms);

			promise
				.then((value) => {
					clearTimeout(timer);
					resolve(value);
				})
				.catch((reason) => {
					clearTimeout(timer);

					reject(reason);
				});
		});
	};

	var direct = function (url, data, p) {
		var controller = new AbortController();

		var time = 10000;

		if (window.cordova || isInStandaloneMode()) {
			time = 25000;
		}

		return timeout(
			time,
			directclear(url, data, controller.signal, p),
			controller,
		);
	};

	var directclear = function (url, data, signal, p) {
		if (!p) p = {};

		if (!data) data = {};

		var headers = _.extend(
			{
				Accept: 'application/json',
				//'Content-Type': 'application/json;charset=utf-8'
			},
			p.headers || {},
		);

		var resp = {};

		var ps = {
			method: p.method || 'GET',
			headers: headers,
			signal: signal,
		};

		if (data && !_.isEmpty(data) && ps.method !== 'GET')
			ps.body = serialize(data);

		return fetch(url, ps)
			.then((r) => {
				signal.dontabortable = true;

				resp = r;

				if (!resp.ok) {
					return Promise.resolve(r.text());
				}

				return r.text().then((data) => (data ? JSON.parse(data) : {}));
			})
			.then((result) => {
				if (resp.ok) {
					return Promise.resolve(result || {});
				} else {
					return Promise.reject(result);
				}
			})
			.catch((r) => {
				var e = {
					code: resp.status || 400,
					text: r,
				};

				return Promise.reject(e);
			});
	};

	self.fetch = function (url, path, data, p) {
		return direct(url + '/' + path, data, p);
	};

	return self;
};

PeerTubePocketnet = function (app) {
	var self = this;

	var VIDEO_QUOTA_CORRECTION = 100 * 1024 * 1024;
	var PEERTUBE_ID = 'peertube://';
	var SLASH = '/';

	var activehost = '';
	var proxyRequest = new PeertubeRequest(app);
	var ffmpeg = null;

	var serversIps = {};
	var servers = []
	// Time needed before we will request the proxy to update the server's IP
	var INTERVAL_CHECK_SERVER_IP = 10000;

	self.checklink = function (link) {
		return link.includes(PEERTUBE_ID);
	};

	self.transcode = async function (file) {
		var data = null;

		try {
			data = await transcode(file);
		} catch (e) {
			console.log('ER', e);
		}

		return data;
	};

	var transcode = async function (file) {
		if (typeof FFmpeg == 'undefined') {
			return null;
		}

		var name = makeid();

		var { createFFmpeg, fetchFile } = FFmpeg;

		if (ffmpeg === null) {
			ffmpeg = createFFmpeg({ log: true });
		}

		if (!ffmpeg.isLoaded()) {
			await ffmpeg.load();
		}

		ffmpeg.FS('writeFile', name, await fetchFile(file));

		///test
		await ffmpeg.run(
			'-i',
			name,
			'-acodec',
			'copy',
			'-vcodec',
			'h264',
			'-s',
			'720x1280',
			name + 'output.mp4',
		);

		const data = await ffmpeg.FS('readFile', name + 'output.mp4');

		//ffmpeg.exit();
		//ffmpeg = null;

		return data;
	};

	self.parselink = function (link) {
		var ch = link.replace(PEERTUBE_ID, '').split(SLASH);

		return {
			host: ch[0],
			id: ch[1],
		};
	};

	self.composeLink = function (host, videoid) {
		return PEERTUBE_ID + host + '/' + videoid;
	};

	var error = function (code) {
		return {
			code: code,
			text: app.localization.e('pterror_' + code),
		};
	};

	var sessions = {};

	var methods = {
		stats: {
			path: 'api/v1/videos',
		},

		video: {
			path: function ({ id }) {
				return 'api/v1/videos/' + id;
			},
		},

		oauthClientsLocal: {
			path: 'api/v1/oauth-clients/local',
		},

		pocketnetAuth: {
			path: 'plugins/pocketnet-auth/router/code-cb',
			signature: true,
			method: 'POST',
			axios: true,
			serialize: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},

		getToken: {
			path: 'api/v1/users/token',
			method: 'POST',
			/*axios : true,
				  serialize : true,*/
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},

		quotaUsed: {
			path: 'api/v1/users/me/video-quota-used',
			authorization: true,
		},

		me: {
			path: 'api/v1/users/me',
			authorization: true,
		},

		uploadVideo: {
			path: 'api/v1/videos/upload',
			formdata: true,
			renew: true,
			method: 'POST',
			authorization: true,
		},

		importVideo: {
			path: 'api/v1/videos/imports',
			formdata: true,
			renew: true,
			method: 'POST',
			authorization: true,
		},

		startLive: {
			path: 'api/v1/videos/live',
			formdata: true,
			renew: true,
			method: 'POST',
			authorization: true,
		},

		getLiveInfo: {
			path: ({ id }) => `api/v1/videos/live/${id}`,
			method: 'GET',
			authorization: true,
		},

		getMyAccountVideos: {
			path: 'api/v1/users/me/videos',
			method: 'GET',
			authorization: true,
			axios: true,
		},

		removeVideo: {
			path: function ({ id }) {
				return 'api/v1/videos/' + id;
			},
			method: 'DELETE',
			authorization: true,
			renew: true,
			changedata: function (d) {
				delete d.id;
			},
		},

		updateVideo: {
			path: function ({ id }) {
				return 'api/v1/videos/' + id;
			},
			method: 'PUT',
			formdata: true,
			authorization: true,
			renew: true,
			axios: true,
		},

		totalViews: {
			path: 'api/v1/users/me/video-views',
			method: 'GET',
			authorization: true,
			axios: true,
		},

		getFullDescription: {
			path: ({ id }) => `api/v1/videos/${id}/description`,
			method: 'GET',
			authorization: false,
			axios: true,
		},
	};

	var getmeta = function (method, data) {
		if (!methods[method]) return null;

		var meta = _.clone(methods[method]);

		if (typeof meta.path == 'function') meta.path = meta.path(data);

		return meta;
	};

	var request = function (method, data = {}, options = {}) {
		if (!options.host) options.host = activehost;

		var requestoptions = {
			headers: {},
		};

		var meta = getmeta(method, data);

		if (!meta) return Promise.reject(error('meta'));

		return self.api.proxy
			.bestIfNeed(options.host && !options.best ? false : true, options.type)
			.then((host) => {
				if (host) {
					options.host = host;
				}

				if (!options.host) return Promise.reject(error('host'));
			})
			.then(() => {
				return self.api.pocketnet.signatureIfNeed(meta.signature);
			})
			.then((signature) => {
				data = _.extend(data, signature);

				return self.api.user.authIfNeed(
					meta.authorization,
					options.host,
					meta.renew,
				);
			})
			.then((r) => {
				if (meta.authorization) {
					requestoptions.headers.Authorization = `Bearer ${sessions[options.host].access_token
						}`;
				}

				if (meta.headers) {
					requestoptions.headers = _.extend(
						requestoptions.headers,
						meta.headers,
					);
				}

				if (meta.method) {
					requestoptions.method = meta.method;
				}

				if (meta.formdata) {
					var formData = new FormData();

					_.each(data, function (d, i) {
						if (Array.isArray(d)) {
							d.map((elem) => formData.append(`${i}[]`, elem));
						} else {
							formData.append(i, d);
						}
					});

					data = formData;
				}

				if (meta.changedata) {
					meta.changedata(data);
				}

				if (meta.serialize) data = serialize(data);

				if (meta.formdata || meta.axios) {
					const CancelToken = axios.CancelToken;

					var axiosoptions = {
						headers: requestoptions.headers,
					};

					if (requestoptions.method === 'GET')
						data = { ...data, ...axiosoptions };

					if (meta.formdata) {
						axiosoptions.onUploadProgress = (evt) => {
							const percentCompleted = Math.round(
								(evt.loaded * 100) / evt.total,
							);

							if (options.progress) options.progress(percentCompleted, evt);
						};

						axiosoptions.cancelToken = new CancelToken((c) => {
							if (options.cancel) options.cancel(c);
						});
					}

					var url = self.helpers.url(options.host + '/' + meta.path)  

					console.log(' self.helpers.url',url, options.host + '/' + meta.path)

					return axios[(requestoptions.method || 'post').toLowerCase()](
						url,
						//'https://' + options.host + '/' + meta.path,
						data,
						axiosoptions,
					)
						.then((r) => {
							return r.data || {};
						})
						.catch((e) => {
							//axios.isCancel(e)

							return Promise.reject(e);
						});
				}
				

				var url = self.helpers.url(options.host) 

				return proxyRequest.fetch(
					url,
					//'https://' + options.host,
					meta.path,
					data,
					requestoptions,
				);
			}).catch(e => {
				console.error(e)

				return Promise.reject(e)
			});
	};

	var setactive = function (host) {
		activehost = host;
	};

	self.active = function () {
		return activehost;
	};

	self.api = {
		pocketnet: {
			signatureIfNeed: function (need) {
				if (!need) return Promise.resolve({});

				return this.signature();
			},
			signature: function () {
				return new Promise((resolve, reject) => {
					app.user.isState(function (state) {
						if (state) {
							return resolve(app.user.signature('peertube', null));
						}

						return reject();
					});
				});
			},
		},

		proxy: {
			bestIfNeed: function (need, type) {
				if (!need) return Promise.resolve();

				return this.best(type);
			},

			best: function (type) {

				var special = false

				/*if( app.user.address.value == 'P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m' || app.user.address.value == 'PDgbAvsrS4VGKkW5rivcJaiCp7fnBoZRgM' || app.user.address.value == 'PU6LDxDqNBDipG4usCqhebgJWeA4fQR5R4' || 
				 app.user.address.value == 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM'
				 
				 ){
					 special = true
				 }*/

				return this.roys({ type: type, special: special })
					.then((data = {}) => {
						//console.log("FDATA", data)

						const roysAmount = Object.keys(data).length;
						var royId;


						if (app.user.address.value) {

							var sq = Number(Math.pow(Number(
								self.helpers.base58.decode(app.user.address.value) / Math.pow(10, 26)
							), 1 / 3).toFixed(0)).toString().substr(9) 

							royId = self.helpers.base58.decode(sq) % roysAmount;
						}
						else{
							royId = rand(0, roysAmount - 1);
						}

						if (special) {
							var spc = _.find(data, function (i) {
								if (i == '01rus.nohost.me') return true
							})

							if (spc) return spc
						}

						//if (!app.user.address.value) royId = rand(0, roysAmount - 1);

						return data[royId];
					})

					.catch(() => 0)
					.then((roy) => app.api.fetch('peertube/best', { roy, type }))
					.then((data) => {
						if (!data.host) return Promise.reject(error('host'));

						setactive(data.host)
						return Promise.resolve(data.host);
					})

					.catch((e) => {
						if (e.data == 'best') {
							e.text = 'Unable to connect to video server';
						}

						return Promise.reject(e);
					});
			},

			bestChange: function ({ type }) {
				return self.api.proxy
					.best(type)
					.then((host) => {
						// setactive(host);
						return Promise.resolve();
					})
					.catch((e) => {
						return Promise.resolve();
					});
			},

			roys: ({ type, special }) => app.api.fetch('peertube/roys', { type, special }),

			allServers: () => app.api.fetch('peertube/allservers'),

			getHostIp: (hostname) => app.api.fetch('peertube/getHostIp?host=' + hostname),

			getservers : () => app.api.fetch('peertube/getHosts').then(roys => {

				var servers = []

				_.each(roys, function(_servers){
					_.each(_servers, function(server){

						if(!server.ip) return
	
						server.timestamp = new Date();

						servers.push(server)
	
					})
				})

				return Promise.resolve(servers)
			})
		},

		videos: {
			remove: function (url, options = {}) {
				if (!self.checklink(url)) return Promise.reject(error('link'));

				var parsed = self.parselink(url);

				if (!options.host) options.host = parsed.host;

				var data = {
					id: parsed.id,
				};

				return request('removeVideo', data, options)
					.then((r) => Promise.resolve())
					.catch((e) => {
						return Promise.reject(error('removeerror'));

						return Promise.resolve();

						//Promise.reject(error('removeerror'))
					});
			},

			update: function (url, parameters = {}, options = {}) {
				if (!self.checklink(url)) return Promise.reject(error('link'));

				var parsed = self.parselink(url);

				var data = {};

				if (!options.host) options.host = parsed.host;

				if (parameters.image) {
					data.thumbnailfile = data.previewfile = dataURLtoFile(
						parameters.image.data,
					);
				}

				if (parameters.name) {
					data.name = parameters.name;
				}

				if (parameters.description) {
					data.description = parameters.description;
				}

				if (parameters.tags) {
					data.tags = parameters.tags;
				}

				if (_.isEmpty(data)) return Promise.reject(error('updateempty'));

				data.id = parsed.id;

				return request('updateVideo', data, options).then((r) => {
					return Promise.resolve();
				});
			},

			upload: function (parameters, options) {
				var rme = {};

				if (!parameters.video) return Promise.reject(error('videonotselected'));

				return self.api.videos
					.checkQuota(parameters.video.size, { type: options.type })
					.then((rme) => {
						var videoName =
							parameters.name || `PocketVideo:${new Date().toISOString()}`;

						var data = {
							privacy: 1,
							'scheduleUpdate[updateAt]': new Date().toISOString(),
							channelId: rme.channelId,
							name: videoName,
							videofile: parameters.video,
						};

						if (parameters.image) {
							data.thumbnailfile = data.previewfile = dataURLtoFile(
								parameters.image.data,
								parameters.image.name,
							);
						}
						return request('uploadVideo', data, options)
							.then((r) => {
								if (!r.video) return Promise.reject(error('uploaderror'));

								return Promise.resolve(
									self.composeLink(options.host, r.video.uuid),
								);
							})
							.catch((e) => {
								e.cancel = axios.isCancel(e);

								return Promise.reject(e);
							});
					});
			},

			import: (parameters = {}, options = {}) =>
				self.api.videos
					.checkQuota(0, { type: options.type })
					.then((rme) => ({
						...parameters.data,
						channelId: rme.channelId,
						privacy: 1,
					}))
					.then((data) =>
						request('importVideo', data, options)
							.then((r) => {
								if (!r.video) return Promise.reject(error('uploaderror'));

								return Promise.resolve(
									self.composeLink(options.host, r.video.uuid),
								);
							})
							.catch((e) => {
								e.cancel = axios.isCancel(e);

								return Promise.reject(e);
							}),
					),

			live: (parameters = {}, options = {}) =>
				self.api.user
					.me({ type: options.type })
					.then((userInfo) => {
						const videoName =
							parameters.name || `Stream:${new Date().toISOString()}`;

						const streamData = {
							privacy: 1,
							channelId: userInfo.channelId,
							name: videoName,
							saveReplay: true,
						};

						if (parameters.image) {
							streamData.thumbnailfile = streamData.previewfile = dataURLtoFile(
								parameters.image.data,
								parameters.image.name,
							);
						}

						return streamData;
					})
					.then((streamData) => request('startLive', streamData, options))
					.then((result) => {
						if (!result.video) return Promise.reject(error('uploaderror'));

						return Promise.resolve({
							...result.video,
							formattedLink: self.composeLink(options.host, result.video.uuid),
							host: options.host,
						});
					})
					.catch((e = {}) => {
						const errorBody = e.response ? e.response.data : {};

						if (errorBody.code !== 3 && errorBody.code !== 'max_user_lives_limit_reached') {
							e.cancel = axios.isCancel(e);

							return Promise.reject(e);
						}

						return self.api.videos
							.getMyAccountVideos({
								isLive: true,
								filter: 'local',
							})
							.then((result = {}) => {
								const existingStream = (result.data || [])[0];

								if (!existingStream) {
									return Promise.reject(error('failedStreamGeneration'));
								}

								return Promise.resolve({
									id: existingStream.id,
									uuid: existingStream.uuid,
									host: options.host,
									formattedLink: self.composeLink(
										options.host,
										existingStream.uuid,
									),
								});
							});
					}),

			getLiveInfo: (data = {}, options = {}) =>
				request('getLiveInfo', data, options).then((res) => ({
					...res,
					uuid: data.id,
				})),

			checkQuota: function (size = 0, options = {}) {
				return self.api.user.me(options).then((rme) => {
					return self.api.videos.quota(options).then((rqu) => {
						const sizeNumbered = Number(size) || 0;

						const videoQuotaDaily = Number(rme.videoQuotaDaily) || 0;
						const videoQuotaUsedDaily = Number(rqu.videoQuotaUsedDaily) || 0;

						const videoQuota = Number(rme.videoQuota) || 0;
						const videoQuotaUsed = Number(rqu.videoQuotaUsed) || 0;

						if (!sizeNumbered || !videoQuotaDaily || !videoQuota) {
							return Promise.resolve(rme);
						}

						if (
							sizeNumbered + videoQuotaUsedDaily <
							videoQuotaDaily + VIDEO_QUOTA_CORRECTION ||
							videoQuotaDaily < 0
							//   &&
							// (sizeNumbered + videoQuotaUsed <
							//   videoQuota + VIDEO_QUOTA_CORRECTION ||
							//   videoQuota < 0)
						) {
							return Promise.resolve(rme);
						}

						return Promise.reject(error('dailyquotalimit'));
					});
				});
			},

			getQuotaStatus: (options = {}) =>
				self.api.user.me(options).then((rme) => {
					return self.api.videos.quota(options).then((rqu) => ({
						videoQuotaDaily: rme.videoQuotaDaily,
						videoQuotaRemainingDaily:
							rme.videoQuotaDaily - rqu.videoQuotaUsedDaily,
						videoQuotaUsed: rqu.videoQuotaUsed,
					}));
				}),

			quota: function (options = {}) {
				return request('quotaUsed', {}, options).then((r) => {
					if (typeof r.videoQuotaUsedDaily != 'undefined') {
						return Promise.resolve(r);
					}

					return Promise.reject(error('videoQuotaUsedDaily'));
				});
			},

			getMyAccountVideos(parameters = {}, options = {}) {
				return request(
					'getMyAccountVideos',
					{
						params: { ...parameters },
					},
					options,
				).then((r = {}) => r);
			},

			getDirectVideoInfo(parameters = {}, options = {}) {
				return request('video', parameters, options);
			},

			totalViews: (parameters = {}, options = {}) =>
				request('totalViews', parameters, options)
					.then((r) => Promise.resolve(r))
					.catch(() => Promise.reject()),

			getFullDescription: (parameters = {}, options = {}) =>
				request('getFullDescription', parameters, options)
					.then((res = {}) => Promise.resolve(res.description))
					.catch(() => Promise.resolve('')),
		},

		user: {
			me: function (options = {}) {
				return request('me', {}, options).then((r) => {
					var data = {
						channelId: deep(r, 'videoChannels.0.id'),
						videoQuotaDaily: deep(r, 'videoQuotaDaily'),
						videoQuota: deep(r, 'videoQuota'),
						username: deep(r, 'username'),
					};

					if (!data.channelId || !data.videoQuotaDaily)
						return Promise.reject(error('usersMe'));

					return Promise.resolve(data);
				});
			},

			authIfNeed: function (need, host, renew) {
				if (!need) return Promise.resolve();

				return this.auth(host, renew);
			},

			auth: function (host, renew) {
				var data = {};

				if (host && sessions[host]) {
					if (renew) {
						if (sessions[host].date > utcnow().addMinutes(-15)) {
							return self.api.user.getToken(sessions[host], { host });
						}
					} else {
						return Promise.resolve(sessions[host]);
					}
				}

				return request(
					'oauthClientsLocal',
					{},
					{
						host,
					},
				)
					.then(({ client_id, client_secret }) => {
						if (!client_id || !client_secret) {
							return Promise.reject(error('oauthClientsLocal'));
						}

						data.client_id = client_id;
						data.client_secret = client_secret;

						return Promise.resolve();
					})
					.then(() => {
						return request(
							'pocketnetAuth',
							{},
							{
								host,
							},
						);
					})
					.then((result = {}) => {
						if (!result.externalAuthToken || !result.username) {
							return Promise.reject(error('pocketnetAuth'));
						}

						data.externalAuthToken = result.externalAuthToken;
						data.username = result.username;

						return Promise.resolve(data);
					})
					.then((data) => {
						return self.api.user.getToken(data, {
							host,
						});
					});
			},

			getToken: function (data = {}, options = {}) {
				data.response_type = 'code';

				if (data.refresh_token) data.grant_type = 'refresh_token';
				else data.grant_type = 'password';

				return request('getToken', data, options)
					.then(({ access_token, refresh_token }) => {
						if (!access_token || !refresh_token) {
							return Promise.reject(error('getToken'));
						}

						data.access_token = access_token;
						data.refresh_token = refresh_token;

						return data;
					})
					.then((data) => {
						data.date = utcnow();

						sessions[options.host] = data;

						return Promise.resolve(data);
					});
			},
		},
	};

	self.clear = function () {
		sessions = {};
		setactive('')
	};

	self.init = function () {

		if (app.test)

			app.peertubeHandler.api.proxy.getservers().then((_servers) => {
				servers = _servers
			});

		return self.api.proxy.bestChange({ type: 'upload' });
	};

	self.helpers = {
		base58: {
			ALPHABET: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			ALPHABET_MAP: {},
			i: 0,

			encode(buffer) {
				const { ALPHABET, ALPHABET_MAP } = this;
				let { i } = this;

				if (!Object.keys(ALPHABET_MAP).length) {
					while (i < ALPHABET.length) {
						ALPHABET_MAP[ALPHABET.charAt(i)] = i;
						i++;
					}
				}

				var carry, digits, j;
				if (buffer.length === 0) {
					return '';
				}
				i = void 0;
				j = void 0;
				digits = [0];
				i = 0;
				while (i < buffer.length) {
					j = 0;
					while (j < digits.length) {
						digits[j] <<= 8;
						j++;
					}
					digits[0] += buffer[i];
					carry = 0;
					j = 0;
					while (j < digits.length) {
						digits[j] += carry;
						carry = (digits[j] / 58) | 0;
						digits[j] %= 58;
						++j;
					}
					while (carry) {
						digits.push(carry % 58);
						carry = (carry / 58) | 0;
					}
					i++;
				}
				i = 0;
				while (buffer[i] === 0 && i < buffer.length - 1) {
					digits.push(0);
					i++;
				}
				return digits
					.reverse()
					.map(function (digit) {
						return ALPHABET[digit];
					})
					.join('');
			},

			decode(string) {
				const { ALPHABET, ALPHABET_MAP } = this;
				let { i } = this;

				if (!Object.keys(ALPHABET_MAP).length) {
					while (i < ALPHABET.length) {
						ALPHABET_MAP[ALPHABET.charAt(i)] = i;
						i++;
					}
				}

				var bytes, c, carry, j;
				if (string.length === 0) {
					return new (
						typeof Uint8Array !== 'undefined' && Uint8Array !== null
							? Uint8Array
							: Buffer
					)(0);
				}
				i = void 0;
				j = void 0;
				bytes = [0];
				i = 0;
				while (i < string.length) {
					c = string[i];
					if (!(c in ALPHABET_MAP)) {
						throw (
							"Base58.decode received unacceptable input. Character '" +
							c +
							"' is not in the Base58 alphabet."
						);
					}
					j = 0;
					while (j < bytes.length) {
						bytes[j] *= 58;
						j++;
					}
					bytes[0] += ALPHABET_MAP[c];
					carry = 0;
					j = 0;
					while (j < bytes.length) {
						bytes[j] += carry;
						carry = bytes[j] >> 8;
						bytes[j] &= 0xff;
						++j;
					}
					while (carry) {
						bytes.push(carry & 0xff);
						carry >>= 8;
					}
					i++;
				}
				i = 0;
				while (string[i] === '1' && i < string.length - 1) {
					bytes.push(0);
					i++;
				}

				const outputArray = new Uint8Array(bytes.reverse());

				let buffer = Buffer.from(outputArray);
				return buffer.readUIntBE(0, outputArray.length);
			},
		},

		checkIp : function(server){
			var now = new Date();

			if (now.getTime() > server.timestamp.getTime() + INTERVAL_CHECK_SERVER_IP){

				return app.peertubeHandler.api.proxy.getHostIp(server.host).then(ip => {
					server.ip = ip
					server.timestamp = new Date();

					return Promise.resolve(server)
				})
			}

			return Promise.resolve(server)
		},

		getserver: function (hostip) {
			return _.find(servers, function(s){
				return s.host == hostip || s.ip == hostip
			})
		},


		urlextended : function(url){

			var parts = url.split('://')
			var oldprotocol = 'http'
			var protocol = ''
			var secure = true //app.secure();

			if (parts.length > 1) {

				oldprotocol = parts[0]
				parts.shift()
				
				secure = oldprotocol == 'https' || oldprotocol == 'wss'

				if (oldprotocol == 'https') oldprotocol = 'http';
				if (oldprotocol == 'wss') oldprotocol = 'ws';
				if (oldprotocol == '.') oldprotocol = '';

			}
			/*else{
				secure = true
			}*/

			var parts = parts.join('')
				parts = parts.split('/')

			var hostip = parts[0];
				parts.shift()

			var path = parts.join('/')
			var server = self.helpers.getserver(hostip)
			var data = {}

			protocol = oldprotocol

			if(path) path = '/' + path

			if(!server) {

				if(hostip.indexOf('.') == -1){
					return {current : url}
				}

				if (secure) protocol = protocol + 's'

				data.current = protocol + "://" + hostip + path
				data.host = hostip

				return data
			} 

			if (app.useip()) secure = false

			if (secure) protocol = protocol + 's'

			hostip = app.useip() ? server.ip : server.host

			data.current = protocol + "://" + hostip + path
			data.ip = server.ip
			data.host = server.host

			return data
		},	 

		url : function(hostip){
			return self.helpers.urlextended(hostip).current
		},	

		

	};

	return self;
};
