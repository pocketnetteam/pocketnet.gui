PeerTubeHandler = function(app) {

    const baseUrl = 'https://pocketnetpeertube.nohost.me/api/v1/';

    const watchUrl = 'https://pocketnetpeertube.nohost.me/videos/watch/';

    const apiHandler = {

        upload({method, parameters}) {
            $.ajax({
                url: `${baseUrl}${method}`,
                ...parameters,
            });
        },

        run({method, parameters}) {
            return fetch(`${baseUrl}${method}`, parameters).catch(err => {
                console.log(err);

                return err;
            });
        },
    };

    const makeBodyFromObject = (objectToHandle) => {
        return Object.keys(objectToHandle).map(key => `${key}=${objectToHandle[key]}`).join('&')
    }

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
        
                body: Object.keys(userInfo).map(key => `${key}=${userInfo[key]}`).join('&')
            },
        })
    };

    this.authentificateUser = async (clbk) => {
        const privateKey = app.user.keys().privateKey;

        const username = bitcoin.crypto.sha256(Buffer.from(privateKey.slice(0, (privateKey.length / 2).toFixed(0)))).toString('hex').slice(0,10);
        const password = bitcoin.crypto.sha256(Buffer.from(privateKey.slice((privateKey.length / 2).toFixed(0), privateKey.length))).toString('hex');

        this.userName = 'zanhesl';
        this.password = '19982402UjL';

        const {
            client_id,
            client_secret,
        } = await apiHandler.run({
            method: 'oauth-clients/local',
        }).then(res => {
            return res.json ? res.json() : res;
        });

        if (!client_id || !client_secret) {
            clbk();

            return {};
        }

        const requestTokenData = {
            client_id,
            client_secret,
            grant_type: 'password',
            response_type: 'code',
            username: this.userName,
            password: this.password,
        }

        const authResult = await apiHandler.run({
            method: 'users/token',
            parameters: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: makeBodyFromObject(requestTokenData),
            }
        }).then(res => {
            return res.json ? res.json() : res;
        })
          .then(async (data) => {
            if (data.access_token) this.userToken = data.access_token;

            if (!data.error) {
                if (clbk) {
                    clbk();
                }
                return data;
            };
            
            if (data.code === 'invalid_grant') {
                console.log('UNREGISTERED');
                const registerData = await this.registerUser({
                    username,
                    password,
                    email: `${username}@pocketnet.app`,
                });

                console.log('>>>>>>>reply status', registerData.status);

                const retryAuth = await apiHandler.run({
                    method: 'users/token',
                    parameters: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: makeBodyFromObject(requestTokenData),
                    }
                }).then(res => {
                    if (res.access_token) this.userToken = res.access_token;

                    if (clbk) clbk();

                    return res.json();
                })

                return retryAuth;
            }

            return data;
          })

        if (clbk) clbk();
        return authResult;
    };

    this.getChannel = async () => {
        return apiHandler.run({
            method : `video-channels/${this.userName}_channel`,
        }).then(res => res.json());
    };

    this.uploadVideo = async (parameters) => {

        const channelInfo = await this.getChannel();

        const bodyOfQuery = {
            privacy : 1,
            'scheduleUpdate[updateAt]': new Date().toISOString(),
            channelId : channelInfo.id,
            name : parameters.name || `${this.userName}:${new Date().toISOString()}`,
            videofile : parameters.video,
        }

        if (parameters.image) {
            bodyOfQuery.previewfile = parameters.image;
            bodyOfQuery.thumbnailfile = parameters.image;
        }

        const formData = new FormData();

        Object.keys(bodyOfQuery).map(key => formData.append(key, bodyOfQuery[key]));

        apiHandler.upload({
            method : 'videos/upload',
            parameters : {
                type: 'POST',
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                headers: {
                    Authorization : `Bearer ${this.userToken}`,
                },

                xhr: () => {
                    const xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
                    xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
                      if(evt.lengthComputable) { 
                        const percentComplete = evt.loaded / evt.total * 100;

                        this.uploadProgress = percentComplete;
                        parameters.uploadFunction(percentComplete);
                      }
                    }, false);
                    return xhr;
                  },

                success: (json) =>  {
                    if (!json.video) return parameters.successFunction('error');

                    parameters.successFunction(`${watchUrl}${json.video.uuid}`);
                },
            }
        });
    };


}