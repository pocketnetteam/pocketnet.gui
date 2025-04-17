var appsError = function (e) {

    var error = new Error(e)

    if (e == 'broken:permissions')
        error.tip = 'example: ["userinfo", "notifications", "messaging", "payment", "sign", "camera", "gallery"]'

    return error
}

var parseManifest = function (json) {
    var data = {}
    var result = {}

    try {
        data = JSON.parse(json)
    } catch (e) {
        throw appsError('broken:manifest')
    }

    result.id = data.id.replace(/[^a-z0-9\.]/g, '')
    result.name = superXSS(data.name.replace(/[^\p{L}\p{N}\p{Z}]/gu, ''))
    result.version = numfromreleasestring(data.version || '1.0.0')
    result.versiontxt = superXSS(data.version)
    result.description = superXSS(data.description)
    result.descriptions = {}

    _.each(data.descriptions, (description, l) => {
        result.descriptions[l] = superXSS(description || "").substr(0, 2000)
    })

    result.author = data.author
    result.develop = data.develop == false ? false : true
    //result.scope = data.scope
    result.permissions = _.map(data.permissions || [], (p) => {
        return p.replace(/[^a-z0-9\.]/g, '')
    })


    var brokenPermissions = _.find(result.permissions, (p) => {
        !p
    })
    if (brokenPermissions) throw appsError('broken:permissions')

    if (!result.id) throw appsError('missing:id')
    if (!result.name) throw appsError('missing:name')
    if (!result.version) throw appsError('missing:version')
    if (!result.descriptions?.['en'] && !result.description) throw appsError('missing:description')
    //if (!result.scope) throw appsError('missing:scope')



    try {
        bitcoin.address.fromBase58Check(result.author)
    } catch (e) {
        throw appsError('broken:author')
    }

    return result
}

var importFile = function (application, path) {
    return simpleRequest(application.path + '/' + path, path)
}

var importFileAsBase64 = function (application, path) {
    return fetchLocalAppCopy(application.path + '/' + path, path).then(d => {
        return getBase64(d.data)
    })
}

var importIcon = function (application) {
    return importFileAsBase64(application, 'b_icon.png').then((png) => {
        return Promise.resolve(png)
    }).catch(() => {
        return Promise.reject(appsError('import:icon'))
    })
}

const getAppIconFromScope  = (scope) => `https://${scope}/b_icon.png`


var importManifest = function (application) {

    return importFile(application, "b_manifest.json")
      .then((manifest) => {
        try {
          manifest = parseManifest(manifest);
        } catch (e) {
          return Promise.reject(e);
        }

        if (manifest.id != application.id)
          return Promise.reject(appsError("discrepancy:id"));
        if (manifest.develop != (application.develop || false))
          return Promise.reject(appsError("discrepancy:develop"));

        // if (manifest.version < application.version) {
        //     return Promise.reject(appsError('version'))
        // }

        // if (manifest.version > application.version) {
        //     return Promise.reject(appsError('version'))
        // }
        if (application.develop) {
          manifest.scope = application.path;
        } else {
          manifest.scope = "https://" + application.scope ? application.scope : manifest.scope;
        }

        return Promise.resolve(manifest);
      })
      .catch((e) => {
        const matchesErrorPattern = (message) =>
          [/^missing:.+/, /^discrepancy:.+/].some((pattern) =>
            pattern.test(message)
          );

        if (matchesErrorPattern(e.message)) {
          return Promise.reject(e);
        }

        return Promise.reject(appsError("import:manifest"));
      });
}

var validateParameters = function (data, parameters) {
    var e = _.find(parameters, (p) => {
        if (!data[p]) return true
    })

    if (!e) return null

    return appsError('parameters:missing:' + e)
}

var BastyonApps = function (app) {
    var self = this
    var installed = {}
    var installing = {}
    var downloading = {}
    var localdata = {}
    var windows = {}
    var clbks = {}
    var allresources = {}
    var getresources = {}

    var key = app.user.address.value || ''
    var externalLinksStorageKey = 'externalLinksStorageKey'

    self.inited = false

    self.info = function () {
        return {
            permissions,
            actions,
            emitters,
            events
        }
    }

    var permissions = {
        'account': {
            name: 'permissions_name_account',
            description: 'permissions_descriptions_account',
            level: 5
        },

        'authFetch': {
            name: 'permissions_auth_fetch',
            description: 'permissions_auth_fetch',
            level: 5
        },

        'sign': {
            name: 'permissions_name_sign',
            description: 'permissions_descriptions_sign',
            level: 1,
            uniq: true
        },

        'messaging': {
            name: 'permissions_name_messaging',
            description: 'permissions_descriptions_messaging',
            level: 9,
            auto: true
        },

        'mobilecamera': {
            name: 'permissions_name_mobilecamera',
            description: 'permissions_descriptions_mobilecamera',
            level: 9,
            auto: true
        },

        'payment': {
            name: 'permissions_name_payment',
            description: 'permissions_descriptions_payment',
            level: 2,
            uniq: true
        },

        'chat': {
            name: 'permissions_name_chat',
            description: 'permissions_descriptions_chat',
            level: 2
        },

        'geolocation': {
            name: 'permissions_name_geolocation',
            description: 'permissions_descriptions_geolocation',
            level: 2,
            uniq: false,
            session: true
        },
        'externallink': {
            name: 'permissions_name_externallink',
            description: 'permissions_descriptions_externallink',
            level: 1
        },
        'zaddress' : {
            name : 'permissions_name_zaddress',
            description : 'permissions_descriptions_zaddress',
            level : 4
        },
        'notifications': {
            name: 'permissions_name_notifications',
            description: 'permissions_descriptions_notifications',
            level: 9,
            ensure: async (application) => {
                const applicationId = application.manifest.id;
                const userAddress = app.user.address.value;
                const proxy = await app.platform.firebase.getNotificationsProxy();
                const tokenCheckResult = await app.platform.firebase.api.checkMiniappToken(
                    applicationId,
                    userAddress,
                    proxy
                );
                return tokenCheckResult.exists ?? false
            }
        },
    }

    var actions = {
        ext: {
            parameters: ['ext'],

            action: function ({
                data,
                application
            }) {

                try {

                    var ps = app.platform.sdk.external.getFromHash(data.ext)

                    if(ps.action == 'auth'){
                        return Promise.reject(appsError('application:ext:auth:deprecated'))
                    }

                    app.platform.ui.external(ps)

                    return Promise.resolve('application:ext:opened')

                } catch (e) {
                    console.error(e)

                    return Promise.reject(appsError('application:ext:notopened'))
                }

            }
        },
        opensettings: {
            parameters: [],

            action: function ({
                data,
                application
            }) {

                app.nav.api.load({
                    open: true,
                    id: 'applicationmeta',
                    inWnd: true,

                    essenseData: {
                        application: application.manifest.id
                    }
                })

                return Promise.resolve('application:settings:opened')
            }
        },

        psdk : {
            userInfoLoad : {
                parameters : [],
                action : function({data, application}){
                    return app.platform.psdk.userInfo.load(data.addresses, data.light, data.update)
                }
            }
            
        },

        rpc : {
            parameters : ['method', 'parameters'],
            action : function({data, application}){

                if (data.options.cachetime){
                    return app.platform.psdk.rpc(data.method, data.parameters, data.options)
                }

                //// TODO CHECK ELECTRON NODE SAFE
                return app.api.rpc(data.method, data.parameters, data.options)
            }
        },

        account: {
            permissions: ['account'],
            authorization: true,
            action: function ({
                data,
                application
            }) {

                var account = app.platform.actions.getCurrentAccount()

                return Promise.resolve({
                    address: app.user.address.value,
                    signature: app.user.signature(application.manifest.id, 1280),
                    status: account ? account.getStatus() : undefined
                })
            }
        },

        balance: {
            permissions: ['account'],
            authorization: true,
            action: function () {
                var account = app.platform.actions.getCurrentAccount()

                if (account) {
                    var balance = account.actualBalance([account.address])
                    return Promise.resolve(balance)
                } else {
                    return Promise.resolve({})
                }
            }
        },

        zaddress: {
            permissions: ['zaddress'],
            authorization: true,
            action: function ({
                data,
                application
            }) {
                var account = app.platform.actions.getCurrentAccount()

                if (account) {

                    var ads = app.platform.sdk.addresses.storage.addresses || []

                    if (ads.length) {

                        var address = ads[strToNumHash(application.manifest.id, ads.length - 1)]

                        return Promise.resolve(address)
                    } else {
                        return Promise.reject(appsError('broken:zaddresses'))
                    }

                } else {
                    return Promise.reject(appsError('broken:zaddresses'))
                }
            }
        },

        sign: {
            permissions: ['sign'],
            authorization: true,
            action: function ({
                data,
                application
            }) {

                var signature = app.user.signature((data.string ? (data.string + '/') : '') + application.manifest.id)

                return Promise.resolve(signature)
            }
        },
        openExternalLink: {
            parameters : ['url'],
            permissions: ['externallink'],
            action : function({ data }){
                const url = data.url
                if (window.cordova?.InAppBrowser) {
                    window.cordova.InAppBrowser.open(url, '_system');
                    return Promise.resolve()
                }

                if (electron?.shell?.openExternal) {
                    electron.shell.openExternal(url);
                    return Promise.resolve()
                }

                window.open(url, '_blank');
                Promise.resolve()
            }
        },

        authFetch: {
            permissions: ['authFetch'],
            authorization: true,
            parameters: ['url'],
            action: function ({
                data,
                application
            }) {

                var url = data.url

                var signature = app.user.signature(application.manifest.id)

                if (!data.data || !_.isObject(data.data)) data.data = {}

                data.data.signature = signature

                if (data.data) data.data = JSON.stringify(data.data)

                delete data.url

                return fetch(url, {

                    ...data

                }).then(r => {

                    return Promise.resolve(r.json())

                }).catch(e => {

                    return Promise.reject(e)
                })

            },
        },
      registerForNotifications: {
          authorization: true,
          permissions: ["notifications"],
          action: async function ({
              application
          }) {
              try {
                  const applicationId = application.manifest.id;
                  const userAddress = app.user.address.value;
                  const proxy = await app.platform.firebase.getNotificationsProxy();
                  return await app.platform.firebase.api.addMiniappToken(
                      applicationId,
                      userAddress,
                      proxy
                  );
              } catch (e) {
                  console.error("Notification registration failed:", error);
                  throw error;
              }
          },
      },
        payment: {
            parameters: ['recievers', 'feemode'],
            permissions: ['account', 'payment'],
            authorization: true,
            action: function ({
                data,
                application
            }) {

                var source = [app.user.address.value];

                var transaction = new Transaction()

                transaction.source.set(source)
                transaction.reciever.set(data.recievers)
                transaction.feemode.set(data.feemode)

                if (data.message)
                    transaction.message.set(data.message)

                return makeAction(transaction, application, {
                    rejectIfError: true
                })

            }
        },

        getaction: {
            parameters: ['id'],
            authorization: true,
            action: function ({
                data,
                application
            }) {
                var action = app.platform.actions.getActionById(data.id)

                if (!action) {
                    return Promise.resolve(null)
                }

                return action.export()
            }
        },

        getactions: {
            authorization: true,
            action: function ({
                application
            }) {
                var actions = app.platform.actions.getActionsByApp(application.manifest.id)

                return _.map(actions, (a) => {
                    return a.export()
                })
            }
        },

        alert: {
            permissions: ['messaging'],
            parameters: ['message'],

            action: function ({
                data,
                application
            }) {

                var message = superXSS(data.message)

                if (!message) {
                    return Promise.reject(appsError('message:empty'))
                }

                sitemessage(message)

                return Promise.resolve()

            }
        },

        checkPermission: {
            parameters: ['permission'],
            action: function ({
                data,
                application
            }) {
                return Promise.resolve(checkPermission(application, data.permission));
            }
        },

        requestPermissions: {
            parameters: ['permissions'],
            action: function ({
                data,
                application
            }) {

                if (!data.permissions.length) return Promise.reject(appsError('permissions:empty'))

                var failedError = ''
                var permissionFailed = _.find(data.permissions, (permission) => {
                    if (!permissions[permission]) {
                        failedError = 'notexist'
                        return true
                    }

                    if (permissions[permission].once) {
                        failedError = 'uniq'
                        return true
                    }
                })

                if (permissionFailed) {
                    return Promise.reject(appsError('permissions:' + failedError + ':' + permissionFailed))
                }

                return requestPermissions(application, data.permissions)
            }
        },

        mobile: {
            camera: {
                permissions: ['mobilecamera'],
                parameters: [],
                action: function ({
                    data,
                    application
                }) {

                    if (!app.mobile.supportimagegallery()) {
                        return Promise.reject(appsError('mobile:camera:notsupported'))
                    }

                    return new Promise((resolve, reject) => {

                        var images = []

                        app.platform.ui.uploadImage({
                            action: (image, clbk) => {
                                images.push({
                                    image: image.base64
                                })

                                clbk()
                            },
                            onSuccess: () => {
                                return resolve({
                                    images
                                })
                            },

                            onCancel: function () {
                                return reject(appsError('mobile:camera:cancel'))
                            }
                        })

                    })



                }
            }
        },

        share: {
            permissions: [],
            parameters: [],
            action: function ({
                data,
                application
            }) {

                //url, sharing {images, }, embeding
                /*

                    {
                        url : string,
                        sharing : {
                            image : '', //url
							images : [], //base64
							title : '', 
							html : {
								body : '',
								preview : ''
							},

							text : {
								body : '',
								preview : ''
							}
                        }
                    }

                */


                if (!data.url) data.withouturl = true
                if (data.url) data.url = findAndReplaceLinkClear(data.url)

                if (typeof data.canmakepost == 'undefined') data.canmakepost = true

                if (data.sharing){
                    data.sharing.tags || (data.sharing.tags = [])
                    data.sharing.tags.push(application.manifest.name)
                }
                

                app.platform.ui.socialshare(null, data)

                return Promise.resolve()

            }
        },

        chat: {

            openRoom: {
                permissions: ['chat'],
                parameters: [],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {

                    var chatLink = '/chat?id=' + data.roomid;


                    return app.platform.matrixchat.wait().then((core) => {
                        if (app.mobileview) {
                            core.apptochat(chatLink)
                        } else {
                            core.gopage(chatLink)
                        }

                        return Promise.resolve()
                    })

                }
            },

            getOrCreateRoom: {
                permissions: ['chat'],
                parameters: ['users'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    return app.platform.matrixchat.wait().then((core) => {
                        return core.getOrCreateRoom({
                            users: data.users,
                            parameters: data.parameters || {},
                            alliasSuffix: application.manifest.id
                        })
                    })
                }
            },
            send: {
                permissions: ['chat'],
                parameters: ['roomid', 'content'],
                authorization: true,

                action: function ({
                    data,
                    application
                }) {
                    return app.platform.matrixchat.wait().then((core) => {
                        return core.sendMessage({
                            alliasSuffix: application.manifest.id,
                            content: data.content,
                            roomid: data.roomid
                        })
                    })
                }
            }
        },

        appinfo: {
            parameters: [],
            action: function ({
                data,
                application
            }) {


                return Promise.resolve({
                    pkoin: !app.pkoindisable,
                    device: typeof _Electron != 'undefined' ? 'application_electron' : (window.cordova ? (isios() ? 'application_ios' : 'application_android') : 'browser'),
                    version: window.packageversion,
                    production: !window.testpocketnet,
                    locale: app.localization.key,
                    theme: app.platform.sdk.theme.all[app.platform.sdk.theme.current],
                    margintop: document.documentElement.style.getPropertyValue('--app-margin-top') || document.documentElement.style.getPropertyValue('--app-margin-top-default') || '0px',
                    application: application.manifest,
                    project: project_config,
                    transactionsApiVersion: 2
                })
            }
        },

        geolocation: {
            permissions: ['geolocation'],
            parameters: [],
            action: function ({
                data,
                application
            }) {
                return new Promise((resolve, reject) => {
                    app.platform.sdk.geolocation.get({
                        onSuccess: (pos) => {
                            resolve({
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            });
                        },
                        onError: () => {
                            reject(appsError('location:notavailable'))
                        }
                    });
                })
            }
        },

        currency: {
            permissions: [],
            parameters: [],
            action: function ({
                data,
                application
            }) {
                return app.api.fetch('exchanges/history').then(result => {
                    return result.prices;
                })
            }
        },

        userstate: {
            permissions: [],
            parameters: [],
            action: function ({
                data,
                application
            }) {
                return app.user.isStatePromise()
            }
        },

        registration: {
            parameters: [],
            action: function ({
                data,
                application
            }) {

                return app.user.isStatePromise().then(state => {

                    if (state) {
                        return Promise.reject(appsError('user:authorized'))
                    }

                    app.nav.api.load({
                        open: true,
                        id: 'registration',
                        inWnd: true,
                        essenseData: {
                            application: application.manifest.id,
                            successHref: '_this',
                            signInClbk: function () {
                                if (clbk) clbk()
                            }
                        }
                    });

                    return Promise.resolve('registration:opened')

                })


            }
        },
        channel: {
            parameters: ['address'],
            action: function ({
                data,
            }) {
                self.nav.api.load({
                    open: true,
                    id: 'channel',
                    inWnd: true,
                    history: true,
                    essenseData: {
                        id: data.address,
                        openprofilebutton: true
                    }
                })
                return Promise.resolve('channel:opened')
            }
        },
        images: {
            upload: {
                authorization: true,
                permissions: [],
                parameters: ['images'],

                action: function ({
                    data,
                    application
                }) {

                    if (data.images.length > 10) return Promise.reject(appsError('images:max:10'))

                    return Promise.all(_.map(data.images, (img) => {
                        return resizePromise(img, 1080, 1080).then((resized) => {

                            return app.imageUploader.upload({
                                Action: 'image',
                                base64: resized
                            }, 'imgur').then((url) => {
                                return Promise.resolve({
                                    url
                                })
                            }).catch(error => {
                                return Promise.resolve({
                                    error
                                })
                            })

                        })
                    }))

                }
            }
        },

        barteron: {
            account: {
                permissions: ['account'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    var account = new brtAccount();

                    account.import(data);

                    return makeAction(account, application);
                }
            },

            offer: {
                permissions: ['account'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    var offer = new brtOffer();

                    offer.import(data);

                    return makeAction(offer, application, {
                        rejectIfError : true
                    });
                }
            },

            removeOffer: {
                permissions: ['account'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    var remove = new Remove();

                    remove.import({
                        txidEdit: data.hash
                    });

                    return makeAction(remove, application, {
                        rejectIfError : true
                    });
                }
            },

            comment: {
                permissions: ['account'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    var comment = new Comment();

                    comment.import(data);

                    return makeAction(comment, application)
                }
            },

            vote: {
                permissions: ['account'],
                authorization: true,
                action: function ({
                    data,
                    application
                }) {
                    var vote = new UpvoteShare();

                    vote.import(data);

                    return makeAction(vote, application)
                }
            }
        },

        open: {
            donation: {
                parameters: ['receiver'],
                action: function ({
                    data,
                    application
                }) {

                    return app.platform.ui.wallet.donate({
                        reciever: data.reciever
                    }).then((p) => {
                        return Promise.resolve({
                            value: p.value,
                            txid: p.txid
                        })
                    }).catch(e => {
                        return Promise.reject(appsError(e))
                    })
    
                }
            },

            post: {
                parameters: ['txid'],
                action: function ({
                    data,
                    application
                }) {

                    self.nav.api.load({
                        open: true,
                        href: 'post?s=' + data.txid,
                        inWnd: true,
                        essenseData: {
                            share: data.txid
                        }
                    })

                    //// TODO CHECK ELECTRON NODE SAFE
                    return Promise.resolve({})
                }
            }
        },

        get : {
            videos : {
                permissions: [],
                parameters: [],
                action: function ({
                    data,
                    application
                }) {
                    return app.platform.sdk.videos.info(data.urls)
                }
            }
        }

    }

    var makeAction = function (data, application, settings) {
        return app.platform.actions.addActionAndSendIfCan(data, null, null, {
            application: application?.manifest?.id || application.id,
            ...settings
        }).then(action => {
            return Promise.resolve(action.export())
        }).catch(e => {
            return Promise.reject(appsError(e))

        })
    }

    var emitters = {
        block: {},
        state: {

        },
        action: {

        },
        balance: {
            permissions: ['account']
        },
        test: {

        },
        locale: {},
        theme: {},
        changestate: {}
    }

    var events = {
        changestate: function (application, data, source) {


            trigger('changestate', {

                application: application.id || application.manifest.id,
                data: {
                    value: data.data.value,
                    replace: data.data.replace,
                    encoded: hexEncode(data.data.value)
                }

            }, source)
        },

        loaded: function (application, data, source) {            
            trigger('loaded', {
                application: application.id || application.manifest.id,
                data
            }, source)
        }
    }

    var trigger = function (key, data, source) {
        _.each(clbks[key] || [], (f) => {
            f(data, source)
        })
    }

    var listening = {

    }

    var appfiles = [{
            name: 'b_manifest.json',
            id: "manifest",
            type: "application/json",
            importer: importManifest,
            cache: true
        },

        {
            name: 'b_icon.png',
            id: "icon",
            type: 'image/png',
            importer: importIcon,
            cache: true
        },

    ]


    var syncInstalledAppData = function (application) {

        if(application.id == 'undefined' || !application.id) return

        if (
          !localdata[application.id] ||
          !_.isEqual(localdata[application.id].data, application)
        ) {

          localdata[application.id] = {
            permissions: [],
            data: application || {},
            cached: {},
          };

          if (application.develop) {
            _.each(application.grantedPermissions || [], (permission) => {
              localdata[application.id].permissions.push({
                id: permission,
                state: "granted",
              });
            });
          }

          savelocaldata();
        }

    }

    var download = function (application) {

        var key = application.manifest.id + '+' + application.manifest.version

        if (!downloading[key]) {
            downloading[key] = importFile(application, 'output.html').then((html) => {

                /// to indexedDB

                return Promise.resolve(html)

            }).finally(() => {
                delete downloading[key]
            })
        }

        return downloading[key].then(html => {

            if (!application.develop) {
                //// check hash with manifest
                /// return Promise.reject('hash')
            }



            return html
        })
    }
    var resources = function (application, cached = {}) {

        if (allresources[application.id]) return Promise.resolve(allresources[application.id])
        if (getresources[application.id]) return getresources[application.id]

        if (application.develop) {
            application.path = 'https://' + (application.scope || application.tscope)
        } else {
            application.path = 'https://' + application.scope
        }

        var promises = []
        var result = {
            fromcache: {}
        }

        promises = promises.concat(Promise.all(_.map(appfiles, (file) => {

            return new Promise((resolve, reject) => {

                if (file.cache && cached[file.id]) {
                    result[file.id] = cached[file.id]
                    result.fromcache[file.id] = true
                    resolve()
                } else {
                    file.importer(application).then(data => {
                        result[file.id] = data

                        delete result.fromcache[file.id]

                        resolve()
                    }).catch(reject)
                }
            }).catch(e => {

                return Promise.reject(e)
            })

        })))

        getresources[application.id] = Promise.all(promises).then(() => {

            allresources[application.id] = result

            return allresources[application.id]

        }).finally(() => {
            delete getresources[application.id]
        })

        return getresources[application.id]
    }

    var install = function (application, cached = {}) {
        if (installed[application.id]) { 
            syncInstalledAppData({
              ...application,
              installing: false,
              installed: true,
            });
            return Promise.resolve(installed[application.id])
        }

        if (installing[application.id]) return installing[application.id].promise

        var result = {}

        if (application.cantdelete) {
            result.cantdelete = true
        }

        if (application.includeinsearch) {
            result.includeinsearch = true
        }

        if (application.includeminiapps) {
            result.includeminiapps = true
        }

        if (application.production) {
            result.production = true
        }

        if (application.develop) {
            result.develop = true
        }


        installing[application.id] = {
            promise: resources(application, cached).then((resourses) => {
                result.path = application.path
                result.installed = true
                result.installing = false

                installed[application.id] = {
                    ...application,
                    ...result,
                    ...resourses,
                }

                syncInstalledAppData(application)

                trigger('installed', {
                    application
                })

                return installed[application.id]

            }).finally(() => {
                delete installing[application.id]
            }),
            application
        }

        return installing[application.id].promise

    }



    var remove = function (id) {

        return self.get.application(id).then(({
            application
        }) => {

            delete application.installed

            self.emit('removed', {}, application)

            trigger('removed', {
                application
            })

            unregisterApplication(application)

            delete localdata[application.manifest.id]
            delete installed[application.manifest.id]

            savelocaldata()

            return Promise.resolve()
        })

    }

    var savelocaldata = function () {        

        var tosave = {}

        _.each(localdata, (info, id) => {

            if(!id || id == 'undefined') return

            var saving = {
                id,
                cached: {},
                permissions: info.permissions,
                data: info.data
            }

            _.each(appfiles, (file) => {
                if (file.cache) {
                    saving.cached[file.id] = (installed[id] ? installed[id][file.id] : null) || info.cached[file.id] || null
                }
            })

            tosave[id] = saving
        })

        try {
            localStorage['apps_' + key] = JSON.stringify(tosave)
        } catch (e) {

        }

    }

    var getlocaldata = function () {
        var apps = {}

        try {
            apps = JSON.parse(localStorage['apps_' + key])
        } catch (e) {

        }

        return apps
    }

    var unregisterApplication = function (application) {
        delete windows[application.manifest.id]
        delete listening[application.manifest.id]
    }

    var listener = function (event) {
        var application = _.find(installed, (application) => {
           const _scope = application.scope || application.manifest.scope;

           if (!_scope || !event.origin) {
             return false; 
           }

           const normalizedScope = self.normalizeScopeUrl(_scope);

           const normalizedTscope = application.tscope
             ? self.normalizeScopeUrl(application.tscope)
             : null;

           const isOriginMatch =
             normalizedScope.startsWith(event.origin) ||
             normalizedTscope?.startsWith(event.origin);

           return isOriginMatch;
        })
        
        if (!application) return

        windows[application.manifest.id] = event.source

        var data = event.data || {}
        var promise = null

        if (!data.data) data.data = {}

        if (data.action) {

            var action = deep(actions, data.action)
            
            if (!action) {
                promise = Promise.reject(appsError('missing:action in actions (' + data.action + ')'))
            } else {

                promise = requestPermissions(application, action.permissions || [], data.data).then(() => {

                    var error = validateParameters(data.data, action.parameters)

                    if (error) return Promise.reject(error)


                    if (action.authorization) {
                        return app.user.isStatePromise().then(state => {
                            if (state) {
                                return Promise.resolve()
                            } else {
                                return Promise.reject(appsError('required:authorization'))
                            }
                        })
                    } else {
                        return Promise.resolve()
                    }


                }).then(() => {
                    return action.action({
                        data: data.data,
                        application
                    })
                })

            }

        }

        if (data.listener) {

            listening[application.manifest.id] = data.listener

            promise = Promise.resolve('registered')

            //Promise.reject(appsError('todo:listeners'))
        }

        if (data.event) {
            if (events[data.event]) {
                events[data.event](application, data, event.source)
            }
        }

        if (!promise) return

        return promise.then((result) => {

            if (data.id) {

                var response = {
                    response: data.id,
                    data: result
                }

                send(response, application)
            }

        }).catch(e => {

            if (data.id) {

                var response = {
                    response: data.id,
                    error: e
                }


                try{
                    send(response, application)
                }catch(e2){

                    var error = {}

                    if (e){
                        if (e.toString){

                            error.description = e.toString()
                            error.message = e.message
                            error.name = e.name
                            error.stack = e.stack
                            
                        }
                        else{
                            if(typeof e == 'string'){
                                error.message = e
                                error.name = "Error"
                            }
                        }
                    }

                    if(!error.message) error.message = 'undefined error'
                    if(!error.name) error.name = 'undefined error'

                    response.error = error

                    send(response, application)
                }
                
            }
        })
    }

    var requestPermissionForm = function (application, permission, data, p = {}) {


        var meta = permissions[permission]

        if (meta.canrequest && !meta.canrequest()) {
            return Promise.reject(appsError('permission:request:cantrequest:' + permission))
        }


        return new Promise((resolve, reject) => {
            const showPermissionModal = () => {
                setTimeout(() => {
                    app.platform.ui.requestPermission({
                            application,
                            meta,
                            permission,
                            data
                        }, p)
                        .then(reason => {
                            resolve(reason);
                        })
                        .catch(reason => {

                            if (reason == 'error') {
                                return Promise.reject(appsError('permission:request:error:' + permission))
                            }

                            return reject(reason)
                        })
                }, 250);
            };


            if (typeof meta.ensure === 'function') {
                meta.ensure(application)
                    .then(isGranted => {
                        if (isGranted) {
                            resolve({
                                state: 'granted',
                            });
                        } else {
                            showPermissionModal();
                        }
                    }).catch(showPermissionModal)
            } else {
                showPermissionModal();
            }
        })
    }

    var givePermission = function (application, permission) {
        if (!this.clearPermission(application, permission)) return false

        var appdata = localdata[application.manifest.id]

        if (!appdata) return false

        appdata.permissions.push({
            id: permission,
            state: 'granted'
        })

        savelocaldata()

        return true

    }

    var clearPermission = function (application, permission) {
        var meta = permissions[permission]
        var appdata = localdata[application.manifest.id]

        if (application.manifest.permissions.indexOf(permission) == -1) {
            return false
        }

        if (!meta) return false
        if (!appdata) return false

        appdata.permissions = _.filter(appdata.permissions, (_permission) => {
            return _permission.id != permission
        })

        return true
    }

    var removePermission = function (application, permission) {
        if (!this.clearPermission(application, permission)) return false

        var appdata = localdata[application.manifest.id]

        if (!appdata) return false

        appdata.permissions.push({
            id: permission,
            state: 'forbid'
        })

        savelocaldata()

        return true

    }

    var requestPermission = function(application, permission, data, p){
        
        if (application.manifest.permissions.indexOf(permission) == -1){
            return Promise.reject(appsError('permission:notexistinmanifest:' + permission))
        }

        var meta = permissions[permission]
        var appdata = localdata[application.manifest.id]

        if (!appdata) return Promise.reject(appsError('error:code:appdata'))
        if (!meta) return Promise.reject(appsError('permission:missing'))


        if (checkPermission(application, permission)) return Promise.resolve()
        if (checkPermission(application, permission, 'forbid')) return Promise.reject(appsError('permission:denied:' + permission + '/forbid'))


        if (meta.auto && !meta.uniq) {
            appdata.permissions.push({
                id: permission,
                state: 'granted'
            })

            savelocaldata()

            return Promise.resolve()
        }


        return requestPermissionForm(application, permission, data, p).then(state => {

            if (state == 'granted') {

                if (!meta.uniq) {
                    appdata.permissions.push({
                        id: permission,
                        state
                    })

                    savelocaldata()
                }

                return Promise.resolve()
            }

            if (state == 'once') {
                ///maybe temp array
                return Promise.resolve()
            }

            if (state == 'forbid') {
                appdata.permissions.push({
                    id: permission,
                    state
                })

                savelocaldata()
            }

            return Promise.reject(appsError('permission:denied:' + permission + '/' + state))

        })

        ////resolve



    }

    var requestPermissions = function (application, permissions, data, p) {

        if (!_.isArray(permissions)) return Promise.reject(appsError('permissions:type:array'))

        return processArray(permissions, (permission) => {
            return requestPermission(application, permission, data, p)
        })
    }

    var checkPermission = function (application, permission, state = 'granted') {
        var appdata = localdata[application.manifest.id]

        if (!appdata) return false

        return _.find(appdata.permissions, (_permission) => {
            return _permission.id == permission && _permission.state == state
        }) ? true : false
    }

    var emit = function (key, data, applicationId) {

        var filteredListeners = listening

        if (applicationId) {

            if (!listening[applicationId]) {
                console.warn('application:notlistening:' + applicationId)
                return
            }

            filteredListeners = {}
            filteredListeners[applicationId] = listening[applicationId]
        }

        _.each(filteredListeners, (listener, id) => {
            var application = installed[id]

            if (application) {

                var emitter = emitters[key]

                if (!emitter) return

                var notgranted = _.find(emitter.permissions || [], (permission) => {
                    if (!checkPermission(application, permission)) {
                        return true
                    }
                })

                if (notgranted) return

                var message = {
                    listener,
                    key,
                    data
                }

                send(message, application)
            }
        })

    }


    var send = function (message, application) {
        if (!application) return

        if (!windows[application.manifest.id]) return

        if (!windows[application.manifest.id].window) return

        windows[application.manifest.id].window.postMessage(
            message,
            application.manifest.scope
        )
    }

    var loadAllAppsFromLocalhost = function () {

        return []

    };

    self.normalizeScopeUrl = function (url) {
      if (!url.startsWith("https://")) {
        return "https://" + url;
      }
      return url;
    };

    self.editAppInConfig = function (app) {
        const existingApp = loadAppFromLocalhost(app.id);
        if (!existingApp) {
            return Promise.reject(new Error('not_found:app_id'));
        }
        
        const newAppData = { ...existingApp, ...app };

        try {

            saveAppToLocalhost(newAppData);
            return install(newAppData);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    self.addAppToConfig = function (app) {
        const existingApp = loadAppFromLocalhost(app.id);
        if (existingApp) {
            return Promise.reject(new Error('conflict:id_already_exists'));
        }
        
        try {

            app.develop = true;
            app.install = true;

            saveAppToLocalhost(app);

            return install(app)
        } catch (e) {
            removeAppFromLocalhost(app.id);
            return Promise.reject(e)
        }
    };

    self.removeAppFromConfig = function (appId) {
        const existingApp = loadAppFromLocalhost(appId);
        if (!existingApp) {
            return Promise.reject(new Error('not_found:app_id'))
        }
        removeAppFromLocalhost(appId);
        return remove(appId)
    };

    self.removeAppByHash = function ({
        hash,
        appId
    }) {
        var remove = new Remove();

        try {
            self.remove(appId);
            remove.import({
                txidEdit: hash
            });
            return makeAction(remove, {
                id: appId
            }, true);
        } catch (e) {
            return Promise.reject(appsError('remove:action:failed'));
        }
    };

    self.deleteApp = function ({
        hash,
        id
    }) {
        if (hash) {
            return self.removeAppByHash({
                hash,
                appId: id
            });
        } else {
            return self.removeAppFromConfig(id);
        }
    };


    var saveAppToLocalhost = function (app) {
        try {
            const key = `app_${app.id}`;
            localStorage.setItem(key, JSON.stringify(app));
        } catch (e) {
            console.error('storage:save_error', e);
        }
    };

    var loadAppFromLocalhost = function (appId) {
        try {
            const key = `app_${appId}`;
            const appData = localStorage.getItem(key);
            return appData ? JSON.parse(appData) : null;
        } catch (e) {
            console.error('storage:load_error', e);
            return null;
        }
    };

    var removeAppFromLocalhost = function (appId) {
        try {
            const key = `app_${appId}`;
            localStorage.removeItem(key);
        } catch (e) {
            console.error('storage:remove_error', e);
        }
    };



    var setlocaldata = function (data) {        

        var newlocaldata = {}

        try {
            newlocaldata = JSON.parse(data)
        } catch (e) {

        }

        var removing = []
        var adding = []

        _.each(localdata, (info, id) => {
            if (!newlocaldata[id]) removing.push(id)
        })

        _.each(newlocaldata, (info, id) => {
            if (!localdata[id]) adding.push(info)
        })

        localdata = newlocaldata

        _.each(removing, (id) => {
            remove(id)
        })

        _.each(adding, (info => {

            return

        }))


    }

    self.destroy = function () {
        window.removeEventListener("message", listener)

        installed = {}
        installing = {}
        downloading = {}
        localdata = {}
        windows = {}
        clbks = {}
        allresources = {}
        getresources = {}

        app.platform.sdk.syncStorage.off('change', 'apps');
    }

    self.init = function () {

        var promises = []
        const developApps = app.developapps || [];
        const localApps = [];
        const allApps = [...developApps, ...localApps];

        if (allApps.length > 0) {

            promises.push(Promise.all(_.map(allApps, (application) => {

                if (!application.store) application.store = {}

                if (application.install) {

                    if (window.cordova && window.pocketnetstore) {
                        if (isios()) {
                            if (!application.store['i']) {
                                return Promise.resolve()
                            }
                        } else {
                            if (!application.store['g']) {
                                return Promise.resolve()
                            }
                        }
                    }

                    application.cantdelete = true

                    if (application.access && _.isArray(application.access)) {
                        if (_.indexOf(application.access, app.user.address.value) == -1) return Promise.resolve()
                    }

                    return install({
                        ...application,
                        develop: true,
                        version: numfromreleasestring(application?.version || '1.0.0')
                    }).catch(e => {

                        return Promise.resolve()
                    })
                }

                return Promise.resolve()


            })))

        }

        var installedLocal = getlocaldata()

        console.log("INSTALLED LOCAL", installedLocal)
        

        _.forEach(installedLocal, (info) => {
            info?.id && install(info.data, info.cached)
        })

        promises.push(Promise.all(_.map(installedLocal, (info) => {

            /*if(_.find(allApps, (app) => {
                return app.id == info.id
            })) return Promise.resolve()*/

            return self.get.applicationall(info.id, info.cached).then(({
                application
            }) => {

                return install({
                    ...application,
                    //version: numfromreleasestring(application.version || '1.0.0')
                }, info.cached)

            }).then(() => {

                localdata[info.id] = {
                    permissions: info.permissions,
                    data: info.data,
                    cached: info.cached
                }

            }).catch(e => {
                return Promise.resolve()
            })

        })))



        try {
            setlocaldata(localStorage['apps_' + key])
        } catch (e) {

        }

        app.platform.sdk.syncStorage.on('change', 'apps', function (e) {

            if (e.newValue == e.oldValue) return

            setlocaldata(e.newValue)

        });


        return Promise.all(promises).then(() => {

            self.inited = true

            window.addEventListener("message", listener)

        }).catch(e => {
            console.error(e)
            return Promise.reject(e)
        })
    }


    self.validateResources = async function (application) {
        try {
            const resourceData = await resources({
                ...application,
                develop: true
            });

            const missingResources = appfiles.filter(file => !resourceData[file.id]);

            if (missingResources.length > 0) {
                return Promise.reject(appsError('missing:resources'));
            }

            if (resourceData.manifest.author !== application.address) {
                return Promise.reject(appsError('discrepancy:author'));
            }

            return Promise.resolve('Resources are valid');
        } catch (error) {
            return Promise.reject(error);
        }
    };



    self.set = {
        applicationExternalLink: function (scope, appid) {
            try {
                localStorage[externalLinksStorageKey + '_' + scope] = appid
            } catch (e) {

            }
        }
    }

    self.get = {
        applicationExternalLink: function (scope) {
            try {
                return localStorage[externalLinksStorageKey + '_' + scope] || null
            } catch (e) {

            }
        },
        forsearch: function () {

            if(app.television){
                return []
            }

            return _.map(_.filter(installed, (s) => {
                return s.includeinsearch
            }), app => {

                return {
                    icon: app.icon,
                    name: app.manifest.name,
                    url: 'application?id=' + app.manifest.id,
                    type: 'application'
                }
            })
        },
        appStatusById: function (applicationId) {
            const appData = loadAppFromLocalhost(applicationId);
            if (appData) {
                return "development"
            } else {
                return ""
            }
        },
        forminiapps: function () {
            return _.map(_.filter(installed, (s) => {
                return s.includeminiapps
            }), app => {

                return {
                    icon: app.icon,
                    name: app.manifest.name,
                    url: 'application?id=' + app.manifest.id,
                    type: 'application'
                }
            })
        },
        installing: function () {
            return installing
        },
        output: function (id) {
            return self.get.application(id).then(({
                application
            }) => {
                return download(application)
            })
        },
        application: async function (id) {
            

            if (installed[id]) {
                return Promise.resolve({
                    application: installed[id],
                    appdata: localdata[id] || {}
                })
            }

            if (installing[id]) {
                return installing[id].promise.then(() => {

                    return Promise.resolve({
                        application: installed[id],
                        appdata: localdata[id] || {}
                    })

                }).catch(e => {
                    return Promise.reject(e)
                })
            }

            
            const application = await app.platform.sdk.miniapps.getbyid(id)

            
            if (application) {
                return Promise.resolve({
                    application: {
                        ...application,
                        installing: true,
                        icon: getAppIconFromScope(application.scope)
                    },
                    appdata: {}
                })
            }


            return Promise.reject(appsError("missing:application"))
        },

        installed: function () {
            return installed
        },

        resourcesForApplications: function (appsmeta) {

            var results = {}

            return Promise.all(_.map(appsmeta, (appmeta) => {

                if (!appmeta) return Promise.resolve()
                if (!appmeta.scope) return Promise.resolve()
                if (!appmeta.id) return Promise.resolve()

                return resources(appmeta).then((resources) => {
                    var result = {
                        ...resources
                    }
                    result.path = appmeta.path

                    results[appmeta.id] = {
                        application: result,
                    }
                })
            })).then(() => {
                return Promise.resolve(results)
            })
        },

        installedAndInstalling: function () {
            var result = {}
            
            _.each(installing, (ins, id) => {
                result[id] = {
                    application: ins.application,
                    installing: true,
                    promise: ins.promise
                }
            })

            _.each(installed, (ins, id) => {
                result[id] = {
                    ...ins,
                    installed: true
                }
            })

            return result
        },

        applicationsSearchOld : function(str = '', onlyInstalled){
            var ins = this.installedAndInstalling()

            str = str.toLowerCase()

            /// added only scope

            

            var filtered =_.filter(ins, (application) => {
                if(application.manifest){

                    if(application.manifest.id == str) return true
                    if(application.manifest.name.toLowerCase() == str) return true

                    var scope = application.manifest.scope.replace('https://', '').toLowerCase()
                    var i = str.indexOf(scope)

                    console.log('scope', scope, str, i)

                    if (i < 9 && i > 0) return true // /???
                }
            })

            if(onlyInstalled) return filtered

            /// add blockchain search

            return Promise.resolve(filtered)
        },

        applicationsSearch: async function (search = '', searchBy) {
            if (search.includes(':')) {
                const [detectedSearchBy, ...searchParts] = search.split(':');
                searchBy = detectedSearchBy.trim();
                search = searchParts.join(':').trim();
            }

            const searchTransformers = {
                tags: (value) => value.split(' ').filter(Boolean),
                default: (value) => value
            };

            const transformedSearch = (searchTransformers[searchBy] || searchTransformers.default)(search);

            const adaptApplicationData = (app) => ({
                name: app.name || app.manifest?.name || '',
                icon: app.icon || getAppIconFromScope(app.scope),

                description: app.description || app.manifest?.description?.eng || '',
                tags: app.tags || [],
                id: app.id || '',
                status: this.appStatusById(app.id),
                address: app.author || app.address || '',
            });

            const filterApplications = (_search, apps, searchBy) => {
                return apps?.filter(app => {
                    switch (searchBy) {
                        case 'name':
                            return (app.name?.toLowerCase() || app.manifest?.name?.toLowerCase() || '').includes(_search);
                        case 'scope':
                            const scope = app.manifest?.scope?.replace('https://', '').toLowerCase() || app.scope?.toLowerCase() || '';
                            return scope.includes(_search);
                        case 'tags':
                            return _search.some(tag => app.tags?.includes(tag));
                        case 'address':
                            const author = app.author?.toLowerCase() || app.address?.toLowerCase() || '';
                            return author.includes(_search);
                        default:
                            return false;
                    }
                });
            };
            const installedApps = this.installedAndInstalling();


            const filteredInstalledApps = filterApplications(transformedSearch, Object.values(installedApps), searchBy || 'name');

            let additionalApps = [];
            if (transformedSearch) {
                additionalApps = await app.platform.sdk.miniapps.getall({
                    [searchBy || 'search']: transformedSearch
                });
            }

            const allApps = [...filteredInstalledApps, ...additionalApps]


            const appsMap = new Map(allApps.map((app) => [app.id, app]));
            const uniqueAppsRaw = Array.from(appsMap.values());


            const adaptedApps = uniqueAppsRaw.map(adaptApplicationData);

            const filteredApps = adaptedApps.filter((app) => app.name);

            return filteredApps;
        },
        applicationall: function (id, cached) {
            return self.get.application(id).catch(e => {
                return null
            }).then(application => {
                

                if (!application) {

                    var a = _.find(_.filter(app.developapps, (dapp) => {

                        if (window.cordova && window.pocketnetstore) {
                            if (isios()) {
                                if (!dapp.store['i']) {
                                    return false
                                }
                            } else {
                                if (!dapp.store['g']) {
                                    return false
                                }
                            }
                        }

                        return true

                    }), (dapp) => {
                        return dapp.id == id
                    })
                    

                    if(!a) {
                        a = cached?.manifest
                    }


                    if (a) return resources(a, cached).then((resourses) => {
                        return Promise.resolve({
                            application: {
                                ...a,
                                ...resourses
                            },
                            appdata: {}
                        })
                    })

                    //search in blockchain
                    // in search == true --- result.application = application result.notinstalled = true
                }

                if (!application) {
                    return Promise.reject(appsError("missing:application"))
                }

                return Promise.resolve(application)

            })
        },

        applicationAny: function ({
            id,
            path
        }) {

            var result = {}

            return self.get.applicationall(id).then(a => {

                result = {
                    ...result,
                    ...a
                }

                var url = a.application.manifest.scope

                if (path) {
                    url = url + '/' + path
                }

                /*try{
                    var u = new URL(url)

                    u.searchParams.set('l', app.localization.key)

                    url = u.toString()
                }catch(e){
                    
                }*/

                return app.platform.sdk.remote.getnew(url).catch(e => {
                    return {}
                }).then(meta => {
                    result.meta = meta
                    result.meta.path = path

                    return Promise.resolve()
                })

            }).then(() => {
                return Promise.resolve(result)
            })

        },

        applications: function ({
            search = ''
        }) {
            var insapplications = _.toArray(self.get.installedAndInstalling({
                search
            }))
            var nodeApps = []
            var devapps = [] //_.filter(app.developapps, ())

            var sorted = _.sortBy(_.uniq(insapplications.concat(nodeApps, devapps), (app) => {

                return app.application?.id || app.manifest?.id || app.id

            }), function (ins) {
                if (ins.installing) return 1
                if (ins.installed) return 2

                return 3
            })


            return Promise.resolve(sorted)

        }
    }

    self.isApplicationLink = function (href) {
        if (thislink(href)) {
            var th = app.nav.thisSiteLink(href)

            if (th.indexOf('application?') == -1) return null

            var pps = parameters(th, true)

            if (!pps.id) return null

            if (pps.p) pps.p = hexDecode(pps.p)

            return {
                id: pps.id,
                path: pps.p || '',
                url: 'application?id=' + pps.id + (pps.p ? ("&p=" + hexEncode(pps.p)) : '')
            }
        }

        return null

    }

    self.on = function (key, action) {        
        if (!clbks[key]) clbks[key] = []

        clbks[key].push(action)
    }

    self.off = function (key, action) {
        if (!clbks[key]) clbks[key] = []

        clbks[key] = clbks[key].filter((a) => {
            return a != action
        })
    }

    self.openInWnd = function(application, clbk, path){
        app.nav.api.load({
            open: true,
            href: 'application',
            inWnd : true,
            history : true,
            eid: 'application_' + application.manifest.id,
            clbk: clbk,

            essenseData: {
                application : application.manifest.id,
                path : path

            }
        })
    }

    self.openInWndById = function(id, clbk, path){

        self.get.applicationall(id).then(({application}) => {
            app.nav.api.load({
                open: true,
                href: 'application',
                inWnd : true,
                history : true,
                eid: 'application_' + application.manifest.id,
                clbk: clbk,
    
                essenseData: {
                    application : application.manifest.id,
                    path : path,
                    inWnd : true
    
                }
            })
        }).catch(e => {
            console.error(e)
        })

        
    }

    self.emit = emit

    self.syncInstalledAppData = syncInstalledAppData
    self.requestPermissions = requestPermissions
    self.updateLo = requestPermissions
    self.givePermission = givePermission
    self.removePermission = removePermission
    self.clearPermission = clearPermission
    self.install = install
    self.remove = remove

    return self
}

if (typeof module != "undefined") {
    module.exports = {
        BastyonApps
    };
} else {
    window.BastyonApps = BastyonApps;
}
