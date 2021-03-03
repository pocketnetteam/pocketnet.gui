PeerTubeHandler = function (app) {
  const hardCodeUrlsList = [
    'pocketnetpeertube1.nohost.me',
    'pocketnetpeertube2.nohost.me',
    'pocketnetpeertube3.nohost.me',
  ];

  const randomServer =
    hardCodeUrlsList[Math.floor(Math.random() * hardCodeUrlsList.length)];

  const baseUrl = `https://${randomServer}/api/v1/`;

  const watchUrl = `https://${randomServer}/videos/watch/`;

  console.log('Selected Server', baseUrl);

  this.peertubeId = 'peertube://';

  const apiHandler = {
    upload({ method, parameters }) {
      $.ajax({
        url: `${baseUrl}${method}`,
        ...parameters,
      })
        .done((res) => {
          parameters.success(res);
        })
        .fail((res) => parameters.fail(res));
    },

    run({ method, parameters, url }) {
      if (!url) url = `${baseUrl}${method}`;

      return fetch(url, parameters)
        .then((res) => res.json())
        .catch((err) => {
          return { error: err };
        });
    },
  };

  const makeBodyFromObject = (objectToHandle) => {
    return Object.keys(objectToHandle)
      .map((key) => `${key}=${objectToHandle[key]}`)
      .join('&');
  };

  this.userToken = '';
  this.userName = '';
  this.password = '';
  this.uploadProgress = 0;

  this.registerUser = (userInfo) => {
    return apiHandler.run({
      method: 'users/register',
      parameters: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: Object.keys(userInfo)
          .map((key) => `${key}=${userInfo[key]}`)
          .join('&'),
      },
    });
  };

  this.authentificateUser = async (clbk) => {
    const privateKey = app.user.keys().privateKey;

    this.userName = bitcoin.crypto
      .sha256(
        Buffer.from(privateKey.slice(0, (privateKey.length / 2).toFixed(0))),
      )
      .toString('hex')
      .slice(0, 10);
    this.password = bitcoin.crypto
      .sha256(
        Buffer.from(
          privateKey.slice(
            (privateKey.length / 2).toFixed(0),
            privateKey.length,
          ),
        ),
      )
      .toString('hex');

    const { client_id, client_secret } = await apiHandler
      .run({
        method: 'oauth-clients/local',
      })
      .then((res) => {
        return res.json ? res.json() : res;
      });

    if (!client_id || !client_secret) {
      clbk({ error: 'Cannot retrieve user data from this server' });

      return {};
    }

    const requestTokenData = {
      client_id,
      client_secret,
      grant_type: 'password',
      response_type: 'code',
      username: this.userName,
      password: this.password,
    };

    const authResult = await apiHandler
      .run({
        method: 'users/token',
        parameters: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: makeBodyFromObject(requestTokenData),
        },
      })
      .then((res) => {
        return res.json ? res.json() : res;
      })
      .then(async (data) => {
        if (data.access_token) this.userToken = data.access_token;

        if (!data.error) {
          if (clbk) {
            clbk();
          }

          return data;
        }

        if (data.code === 'invalid_grant') {
          console.log('UNREGISTERED');
          const registerData = await this.registerUser({
            username: this.userName,
            password: this.password,
            email: `${this.userName}@pocketnet.app`,
          });

          console.log('>>>>>>>reply status', registerData.status);

          const retryAuth = await apiHandler
            .run({
              method: 'users/token',
              parameters: {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: makeBodyFromObject(requestTokenData),
              },
            })
            .then((res) => {
              if (res.access_token) {
                this.userToken = res.access_token;
                if (clbk) clbk();
              } else {
                if (clbk)
                  clbk({ error: 'Cannot retrieve user data from this server' });
              }

              return res;
            });

          return retryAuth;
        }

        return data;
      });

    return authResult;
  };

  this.getChannel = async () => {
    return apiHandler.run({
      method: `video-channels/${this.userName}_channel`,
    });
  };

  this.uploadVideo = async (parameters) => {
    const channelInfo = await this.getChannel();

    const bodyOfQuery = {
      privacy: 1,
      'scheduleUpdate[updateAt]': new Date().toISOString(),
      channelId: channelInfo.id,
      name: parameters.name || `${this.userName}:${new Date().toISOString()}`,
      videofile: parameters.video,
    };

    if (parameters.image) {
      bodyOfQuery.previewfile = parameters.image;
      bodyOfQuery.thumbnailfile = parameters.image;
    }

    const formData = new FormData();

    Object.keys(bodyOfQuery).map((key) =>
      formData.append(key, bodyOfQuery[key]),
    );

    apiHandler.upload({
      method: 'videos/upload',
      parameters: {
        type: 'POST',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },

        xhr: () => {
          const xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
          xhr.upload.addEventListener(
            'progress',
            function (evt) {
              // добавляем обработчик события progress (onprogress)
              if (evt.lengthComputable) {
                const percentComplete = (evt.loaded / evt.total) * 100;

                this.uploadProgress = percentComplete;
                parameters.uploadFunction(percentComplete);
              }
            },
            false,
          );
          return xhr;
        },

        success: (json) => {
          if (!json.video) return parameters.successFunction('error');
          parameters.successFunction(
            `${this.peertubeId}${watchUrl}${json.video.uuid}`,
          );
        },

        fail: (res) => {
          return parameters.successFunction({ error: res });
        },
      },
    });
  };

  this.removeVideo = async (video) => {
    const videoId = video.split('/').pop();

    const videoHost = video
      .replace('peertube://', '')
      .replace('https://', '')
      .split('/')[0];

    if (randomServer !== videoHost) {
      this.baseUrl = videoHost ? `https://${videoHost}/api/v1` : this.baseUrl;

      await this.authentificateUser();
    }

    if (!this.userToken) {
      const localAuth = () =>
        apiHandler.run({
          method: `videos/${videoId}`,
          parameters: {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${this.userToken}`,
            },
          },
        });

      return this.authentificateUser(localAuth);
    }

    apiHandler.run({
      method: `videos/${videoId}`,
      parameters: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      },
    });
  };

  this.startLive = async (parameters) => {
    const channelInfo = await this.getChannel();

    const bodyOfQuery = {
      privacy: 1,
      'scheduleUpdate[updateAt]': new Date().toISOString(),
      channelId: channelInfo.id,
      name: parameters.name || `${this.userName}:${new Date().toISOString()}`,
    };

    if (parameters.image) {
      bodyOfQuery.previewfile = parameters.image;
      bodyOfQuery.thumbnailfile = parameters.image;
    }

    const formData = new FormData();

    Object.keys(bodyOfQuery).map((key) =>
      formData.append(key, bodyOfQuery[key]),
    );

    apiHandler.upload({
      method: 'videos/live',
      parameters: {
        type: 'POST',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },

        // xhr: () => {
        //   const xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
        //   xhr.upload.addEventListener(
        //     'progress',
        //     function (evt) {
        //       // добавляем обработчик события progress (onprogress)
        //       if (evt.lengthComputable) {
        //         const percentComplete = (evt.loaded / evt.total) * 100;

        //         this.uploadProgress = percentComplete;
        //         parameters.uploadFunction(percentComplete);
        //       }
        //     },
        //     false,
        //   );
        //   return xhr;
        // },

        success: (json) => {
          if (!json.video) return parameters.successFunction('error');

          return this.getLiveInfo(json.video.uuid, {
            successFunction: parameters.successFunction,
          });
        },

        fail: (res) => {
          return parameters.successFunction({ error: res });
        },
      },
    });
  };

  this.getLiveInfo = async (id, parameters) => {
    apiHandler
      .run({
        method: `videos/live/${id}`,
        parameters: {
          type: 'GET',
          headers: {
            Authorization: `Bearer ${this.userToken}`,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          return parameters.successFunction(res);
        }

        return parameters.successFunction({
          video: `${this.peertubeId}${watchUrl}${id}`,
          ...res,
        });
      });
  };

  this.importVideo = async (parameters) => {
    const channelInfo = await this.getChannel();

    const bodyOfQuery = {
      privacy: 1,
      'scheduleUpdate[updateAt]': new Date().toISOString(),
      channelId: channelInfo.id,
      // name: parameters.name || `${this.userName}:${new Date().toISOString()}`,
      targetUrl: parameters.url,
    };

    const formData = new FormData();

    Object.keys(bodyOfQuery).map((key) =>
      formData.append(key, bodyOfQuery[key]),
    );

    apiHandler.upload({
      method: 'videos/imports',
      parameters: {
        type: 'POST',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },

        xhr: () => {
          const xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
          xhr.upload.addEventListener(
            'progress',
            function (evt) {
              // добавляем обработчик события progress (onprogress)
              if (evt.lengthComputable) {
                const percentComplete = (evt.loaded / evt.total) * 100;

                this.uploadProgress = percentComplete;
                parameters.uploadFunction(percentComplete);
              }
            },
            false,
          );
          return xhr;
        },

        success: (json) => {
          if (!json.video) return parameters.successFunction('error');

          parameters.successFunction(
            `${this.peertubeId}${watchUrl}${json.video.uuid}`,
          );
        },

        fail: (res) => {
          return parameters.successFunction({ error: res });
        },
      },
    });
  };

  this.getVideoInfoAnon = async (meta, clbk) => {
    apiHandler
      .run({
        url: `https://${meta.host_name}/api/v1/videos/${meta.id}`,

        parameters: {
          method: 'GET',
        },
      })
      .then((res) => clbk(res));
  };
};
