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

    console.log('RESPHEADERS', headers);

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

        return r.json();
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
      .bestIfNeed(options.host && !options.best ? false : true)
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
          requestoptions.headers.Authorization = `Bearer ${
            sessions[options.host].access_token
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
            formData.append(i, d);
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

          return axios[(requestoptions.method || 'post').toLowerCase()](
            'https://' + options.host + '/' + meta.path,
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

        console.log('requestoptions', requestoptions);

        return proxyRequest.fetch(
          'https://' + options.host,
          meta.path,
          data,
          requestoptions,
        );
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
      bestIfNeed: function (need) {
        if (!need) return Promise.resolve();

        return this.best();
      },

      best: function () {
        return app.api
          .fetch('peertube/best')
          .then((data) => {
            if (!data.host) return Promise.reject(error('host'));

            data.host = 'pocketnetpeertube5.nohost.me';
            console.log('data.host', data.host);

            return Promise.resolve(data.host);
          })
          .catch((e) => {
            if (e.data == 'best') {
              e.text = 'Unable to connect to video server';
            }

            return Promise.reject(e);
          });
      },

      bestChange: function () {
        return self.api.proxy
          .best()
          .then((host) => {
            setactive(host);
            return Promise.resolve();
          })
          .catch((e) => {
            return Promise.resolve();
          });
      },
    },

    videos: {
      remove: function (url, options = {}) {
        if (!self.checklink(url)) return Promise.reject(error('link'));

        var parsed = self.parselink(url);

        if (!options.host) options.host = parsed.host;

        var data = {
          id: parsed.id,
        };

        return request('removeVideo', data, options).then((r) => {
          if (!r.video) return Promise.reject(error('removeerror'));

          return Promise.resolve();
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

        if (_.isEmpty(data)) return Promise.reject(error('updateempty'));

        data.id = parsed.id;

        return request('updateVideo', data, options).then((r) => {
          return Promise.resolve();
        });
      },

      upload: function (parameters, options) {
        var rme = {};

        if (!parameters.video) return Promise.reject(error('videonotselected'));

        return self.api.videos.checkQuota(parameters.video.size).then((rme) => {
          var videoName =
            parameters.name || `${this.userName}:${new Date().toISOString()}`;

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
          .checkQuota(0)
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
          .me()
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

            if (errorBody.code !== 3) {
              e.cancel = axios.isCancel(e);

              return Promise.reject(e);
            }

            return self.api.videos
              .getMyAccountVideos({
                isLive: true,
                filter: 'local',
              })
              .then((video = {}) => {
                const existingStreamId = video.uuid;

                if (!existingStreamId) {
                  return Promise.reject(error('failedStreamGeneration'));
                }

                return existingStreamId;
              })
              .then((streamId) =>
                self.api.videos.getLiveInfo({ id: streamId }),
              ).then(streamInfo => {
                debugger;
              });
          }),

      getLiveInfo: (data = {}, options = {}) =>
        request('getLiveInfo', data, options).then((res) => res),

      checkQuota: function (size) {
        return self.api.user.me().then((rme) => {
          return self.api.videos.quota().then((rqu) => {
            if (
              (size + rqu.videoQuotaUsedDaily <
                rme.videoQuotaDaily + VIDEO_QUOTA_CORRECTION ||
                rme.videoQuotaDaily < 0) &&
              (size + rqu.videoQuotaUsed <
                rme.videoQuota + VIDEO_QUOTA_CORRECTION ||
                rme.videoQuota < 0)
            ) {
              return Promise.resolve(rme);
            }

            return Promise.reject(error('dailyquotalimit'));
          });
        });
      },

      quota: function () {
        return request('quotaUsed').then((r) => {
          if (typeof r.videoQuotaUsedDaily != 'undefined') {
            return Promise.resolve(r);
          }

          return Promise.reject(error('videoQuotaUsedDaily'));
        });
      },

      getMyAccountVideos(parameters = {}) {
        return request('getMyAccountVideos', {
          params: { ...parameters },
        }).then((r = {}) => r.data || []);
      },
    },

    user: {
      me: function () {
        return request('me').then((r) => {
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

        console.log('CHECK HOST', sessions, host, sessions[host]);

        if (host && sessions[host]) {
          if (renew) {
            if (sessions[host].date > utcnow().addMinutes(-15)) {
              return self.api.user.getToken(sessions[host]);
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
          .then(({ externalAuthToken, username }) => {
            if (!externalAuthToken || !username) {
              return Promise.reject(error('pocketnetAuth'));
            }

            data.externalAuthToken = externalAuthToken;
            data.username = username;

            return Promise.resolve(data);
          })
          .then((data) => {
            return self.api.user.getToken(data);
          });
      },

      getToken: function (data) {
        if (!data) data = {};

        data.response_type = 'code';

        if (data.refresh_token) data.grant_type = 'refresh_token';
        else data.grant_type = 'password';

        var options = {};

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
  };

  self.init = function () {
    return self.api.proxy.bestChange();
  };

  return self;
};
