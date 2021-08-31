var videoCabinet = (function () {
  var self = new nModule();

  var essenses = {};

  const ROTATE_ONE_PERCENTAGE = 3.6;
  const HALF_CIRCLE_ROTATE_PERCENTAGE = 50;
  const HUDRED_PERC = 100;
  const LAZYLOAD_PERCENTAGE = 0.9;
  const POSITIVE_STATUS = 'fulfilled';
  const BONUS_PROGRAM_REQUIREMENTS = {
    bonusProgramViews: 10000,
    bonusProgramRatings: 500,
  };
  const TRANSCODING_CHECK_INTERVAL = 20000;


  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;
    var transcodingIntervals = {};
    var ed = {};
    let tagElement;
    let tagArray = [];
    let newVideosAreUploading = false;
    var videoServers = {};
    var peertubeServers = {};
    var userQuota = {};
    var blockChainInfo = [];
    var external = null;
    var perServerCounter = 10;

    var actions = {
      async getHosts() {
        const serverStructureHosts = await self.app.peertubeHandler.api.proxy
          .roys()
          .catch(() => ({}));

        Object.entries(serverStructureHosts).forEach(
          ([name, bestHost]) =>
            (videoServers[name] = { ...videoServers[name], bestHost }),
        );

        return Promise.resolve(serverStructureHosts);
      },

      async getVideos(server = '', parameters = {}) {
        if (!server) return;

        const options = {
          start: peertubeServers[server].start,
          count: perServerCounter,
          ...parameters,
        };

        return self.app.peertubeHandler.api.videos
          .getMyAccountVideos(options, {
            host: server,
          })
          .then((data = {}) => {
            peertubeServers[server].start += perServerCounter;
            peertubeServers[server].videos.push(...(data.data || []));
            peertubeServers[server].total = data.total || 0;
            peertubeServers[server].isFull =
              peertubeServers[server].start > data.total;

            return data;
          })
          .catch(() => {
            console.log(`Error loading ${server}`);
            return [];
          });
      },

      async getQuota() {
        return self.app.peertubeHandler.api.videos
          .getQuotaStatus()
          .then((res) => (userQuota = { ...res }));
      },

      getBlockchainPostByVideos: (videoArray = []) =>
        self.app.api
          .rpc('searchlinks', [videoArray, 'video', 0, videoArray.length])
          .then((res = {}) => {
            if (!res.contents) return;

            res.contents.forEach((post) => {
              const postUrl = decodeURIComponent(post.u);

              blockChainInfo[postUrl] = { ...post };
            });
          })
          .catch((err) => {}),

      resetHosts() {
        el.videoContainer.html('');

        const videoPortionElement = renders.newVideoContainer();

        Object.keys(peertubeServers).forEach((server) => {
          peertubeServers[server] = {
            videos: [],
            start: 0,
          };
        });

        return videoPortionElement;
      },

      updateAllHosts(parameters = {}) {
        const servers = Object.keys(peertubeServers);

        const serverPromises = servers.map((server) =>
          actions.getVideos(server, parameters),
        );

        return Promise.allSettled(serverPromises);
      },

      getTotalRatings(){
        console.log("getTotalRatings")
        if(self.app.platform.sdk.address.pnet()){
          var address = self.app.platform.sdk.address.pnet().address
          return self.app.api.rpc('getcontentsstatistic', [

            [address], 'video'

          ], {
            rpc : {
              node : window.testpocketnet ? '157.90.235.121:39091' : '216.108.231.40'
            }
            
          }).then(r => {

            console.log("RE", r)

            var d = _.find(r || [], function(obj){
              return address == obj.address
            }) || {}

            return Promise.resolve(d)
          })
        }
        else{
          return Promise.reject()
        }

        
      },

      getTotalViews() {
        const servers = Object.keys(peertubeServers);

        const serverPromises = servers.map((host) =>
          self.app.peertubeHandler.api.videos.totalViews({}, { host }),
        );

        //aggregating video views from different servers into one number
        return Promise.allSettled(serverPromises).then((data) =>
          data
            .filter((promise) => promise.status === POSITIVE_STATUS)
            .map((info) => info.value)
            .reduce(
              (accumulator, currServer) =>
                (accumulator += Number(currServer.total_views || 0)),
              0,
            ),
        );
      },

      getFullPageInfo(videoPortionElement) {
        renders.videos(null, videoPortionElement);

        //getting and rendering bonus program status for views and ratings (same template)
        actions
          .getTotalViews()
          .then((result) => {
            renders.bonusProgram(
              {
                parameterName: 'bonusProgramViews',
                value: result,
                requiredValue: BONUS_PROGRAM_REQUIREMENTS.bonusProgramViews,
              },
              el.bonusProgramContainerStars,
            );
          })
          .catch(() =>
            renders.bonusProgram(
              {
                parameterName: 'bonusProgramViews',
                value: 0,
                requiredValue: BONUS_PROGRAM_REQUIREMENTS.bonusProgramViews,
              },
              el.bonusProgramContainerStars,
            ),
          );

        actions
          .getTotalRatings()
          .then((result) => {

            var rendering = "&mdash;"

            if(result.scoreCnt && result.scoreSum){
              rendering  = (result.scoreSum / result.scoreCnt).toFixed(1) + " ("+result.scoreCnt+")"
            }

            renders.bonusProgram(
              {
                parameterName: 'bonusProgramRatings',
                value: rendering,
                requiredValue: BONUS_PROGRAM_REQUIREMENTS.bonusProgramRatings,
              },
              el.bonusProgramContainerViews,
            );

          }).catch(e => {

            renders.bonusProgram(
              {
                parameterName: 'bonusProgramRatings',
                value: 0,
                requiredValue: BONUS_PROGRAM_REQUIREMENTS.bonusProgramRatings,
              },
              el.bonusProgramContainerViews,
            );

          })

        
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
        delete transcodingIntervals[id]
        const videoElement = el.videoContainer.find(`[uuid="${id}"]`);

        videoElement.find('.attachVideoToPost').removeClass('hidden');
        videoElement.find('.transcodingPreloader').addClass('hidden');
      },

      uploadVideoWallpaper: function (image, shareUrl) {
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
          .catch((e) => {
            const message = e.text || findResponseError(e) || 'Updating error';

            sitemessage(message);
          });
      },

      resizeImage: function (base64, settings = {}) {
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
    };

    var events = {
      onPageScroll() {
        const scrollProgress = el.windowElement.scrollTop() / el.c.height();

        if (scrollProgress >= LAZYLOAD_PERCENTAGE && !newVideosAreUploading) {
          const activeServers = Object.keys(peertubeServers).filter(
            (server) => !(peertubeServers[server] || {}).isFull,
          );

          if (!activeServers.length) return;

          events.getAdditionalVideos(activeServers);
          newVideosAreUploading = true;
        }
      },

      getAdditionalVideos(activeServers = []) {
        if (!activeServers.length) return;

        const videoPortionElement = renders.newVideoContainer();

        const videoParameters = { sort: ed.sort };

        if (ed.search) videoParameters.search = ed.search;

        return Promise.allSettled(
          activeServers.map((server) =>
            actions.getVideos(server, videoParameters),
          ),
        )
          .then((data = []) => {
            const newVideos = data
              .filter((item) => item.status === POSITIVE_STATUS)
              .map((item) => item.value.data)
              .flat();
            newVideosAreUploading = false;

            renders.videos(newVideos, videoPortionElement);
          })
          .catch(() => videoPortionElement.addClass('hidden'));
      },

      onSearchVideo() {
        const searchString = el.searchInput.val();

        ed.search = searchString;

        const videoPortionElement = actions.resetHosts();

        actions
          .updateAllHosts({ search: searchString })
          .then(() => {
            renders.videos(null, videoPortionElement);
          })
          .catch(() => {
            renders.videos(null, videoPortionElement);
          });
      },

      onVideoSort() {
        const sort = `${el.sortDirectionSelect.val()}${el.sortTypeSelect.val()}`;

        localStorage.setItem('videoCabinetSortType', el.sortTypeSelect.val());
        localStorage.setItem(
          'videoCabinetSortDirection',
          el.sortDirectionSelect.val(),
        );

        const videoPortionElement = actions.resetHosts();

        actions
          .updateAllHosts({ sort })
          .then(() => {
            renders.videos(null, videoPortionElement);
          })
          .catch(() => {
            renders.videos(null, videoPortionElement);
          });
      },
    };

    var renders = {
      //table with video elements
      videos(videosForRender, videoPortionElement) {
        const videos =
          videosForRender ||
          Object.values(peertubeServers)
            .map((value) => value.videos)
            .filter((video) => video)
            .flat();

        videos.forEach((video) => {
          if (video.description) {
            video.description = video.description
              .replace(
                `Watch more exciting videos at https://test.pocketnet.app/!`,
                '',
              )
              .replace(
                `Watch more exciting videos at https://pocketnet.app/!`,
                '',
              )
              .replace(
                `Watch more exciting videos at https://bastyon.com/!`,
                '',
              );
          }
        });

        self.shell(
          {
            name: 'videoList',
            el: videoPortionElement,
            data: {
              videos,
            },
          },
          (p) => {
            p.el.find('.tooltip').tooltipster({
              theme: 'tooltipster-light',
              maxWidth: 600,
              zIndex: 20,
            });
            const attachVideoToPost = p.el.find('.attachVideoToPost');
            // const removeVideo = p.el.find('.removeVideo');
            const menuActivator = p.el.find('.menuActivator');

            //button for creating post with video
            attachVideoToPost.on('click', function () {
              const videoLink = $(this).attr('videoLink');

              const meta = self.app.peertubeHandler.parselink(videoLink);

              self.app.peertubeHandler.api.videos
                .getDirectVideoInfo({ id: meta.id }, { host: meta.host })
                .then((info) => {
                  const { name, description, tags } = info;
                  renders.addButton({ videoLink, name, description, tags });
                });
            });

            menuActivator.on('click', function () {
              const videoLink = $(this).attr('videoLink');

              return renders.metmenu($(this), videoLink);
            });

            const blockchainStrings = videos.map(
              (video) => `peertube://${video.account.host}/${video.uuid}`,
            );
            //get information about videos being published to blockchain
            actions.getBlockchainPostByVideos(blockchainStrings).then(() => {
              p.el.find('.postingStatusWrapper').each(function () {
                const currentElement = $(this);

                const isTranscoding = currentElement.attr('isTranscoding');

                const link = currentElement.attr('video');

                if (blockChainInfo[link])
                  return renders.postLink(currentElement, link);

                if (!isTranscoding) {
                  currentElement
                    .find('.attachVideoToPost')
                    .removeClass('hidden');
                  currentElement.find('.preloaderwr').addClass('hidden');
                }
              });

              p.el.find('.videoStatsWrapper').each(function () {
                const currentElement = $(this);

                const link = currentElement.attr('video');
                const host = currentElement.attr('host');
                const uuid = currentElement.attr('uuid');

                return renders.videoStats(currentElement, link, host, uuid);
              });
            });

            p.el.find('[videoTranscoding="true"]').each(function () {
              const videoLink = $(this).attr('video');

              const meta = self.app.peertubeHandler.parselink(videoLink);

              transcodingIntervals[meta.id] = setInterval(
                () => actions.checkTranscodingStatus(meta),
                TRANSCODING_CHECK_INTERVAL,
              );
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
          external.container.show();

          return;
        }

        if (external) external.container.close();

        self.nav.api.load({
          open: true,
          id: elName,
          inWnd: true,

          history: false,

          essenseData: {
            storage: p.storage,
            value: p.value,
            currentLink: '',
            actions: {
              added: function (resultLink) {
                const { host } = self.app.peertubeHandler.parselink(resultLink);

                const videoPortionElement = actions.resetHosts();

                actions.getVideos(host).then(() => {
                  renders.videos(null, videoPortionElement);
                });

                actions.getQuota().then(() => renders.quota());
              },
            },

            closeClbk: function () {
              external = null;
            },
          },

          clbk: function (p, element) {
            external = element;

            videoUploadData = element.essenseData;
          },
        });
      },
      //button in video table for adding post with video to blockchain
      addButton(parameters) {
        self.app.platform.ui.share(parameters);
      },
      //get link to existing video post
      postLink(element, link) {
        const linkInfo = blockChainInfo[link];

        if(isMobile()){
          element.html(
            `<a class="videoPostLink" href="index?video=1&v=${
              linkInfo.txid
            }"><i class="far fa-check-circle"></i>${self.app.localization.e(
              'linkToPost',
            )}</a>`,
          );
  
          self.nav.api.links(null, element);
        }

        else{


          element.html(
            `<span class="videoPostLinkinWindow"><i class="far fa-check-circle"></i>${self.app.localization.e(
              'linkToPost',
            )}</span>`,
          );

          element.find('.videoPostLinkinWindow').on('click', function(){
            var ed = {
              share : linkInfo.txid,
              close : function(){
              }
            }
            self.nav.api.load({
              open : true,
              href : 'post?s=' + linkInfo.txid,
              inWnd : true,
              history : true,
              essenseData : ed
            })
          })

          
        }



      },
      //render single video stats column in video table
      videoStats(element, link, host, uuid) {
        const linkInfo = blockChainInfo[link] || {};
        const videoInfo =
          (peertubeServers[host].videos || []).find((video) => video.uuid === uuid) ||
          {};

        self.shell(
          {
            name: 'videoStats',
            el: element,
            data: {
              views: +videoInfo.views || 0,
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
      //add new container for a protion of videos (lazyload)
      newVideoContainer() {
        const videoPortionElement = $(
          '<div class="videoPage"><div class="preloaderwr"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div></div>',
        );

        el.videoContainer.append(videoPortionElement);

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
      metmenu(_el, videoLink) {
        const data = {};

        const meta = self.app.peertubeHandler.parselink(videoLink);

        self.fastTemplate(
          'metmenu',
          (rendered, template) => {
            self.app.platform.api.tooltip(
              _el,
              () => template(data),
              (element) => {
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
                          el.videoContainer
                            .find(`.singleVideoSection[uuid="${meta.id}"]`)
                            .addClass('hidden');
                        });
                    },
                  });

                  if(_el.tooltipster)
                    _el.tooltipster('hide');
                });

                //edit wallpaper in menu
                initUpload({
                  el: element.find('.editPreview .inputMenuWrapper'),

                  ext: ['png', 'jpeg', 'jpg', 'webp', 'jfif'],

                  dropZone: element.find('.editPreview'),

                  multiple: false,

                  action: function (file, clbk) {
                    

                    actions
                      .uploadVideoWallpaper(file.file, videoLink)
                      .then((img) => {
                        const previewContainer = el.videoContainer.find(
                          `.singleVideoSection[uuid="${meta.id}"] .videoAvatar`,
                        );
                        previewContainer.attr(
                          'style',
                          `background-image: url("${img}")`,
                        );
                      });

                    if(_el.tooltipster)
                      _el.tooltipster('hide');
                  },

                  onError: function (er, file, text) {
                    sitemessage(text);
                  },
                });

                //render edit description form
                element.find('.editText').on('click', function () {
                  

                  self.app.peertubeHandler.api.videos
                    .getDirectVideoInfo({ id: meta.id }, { host: meta.host })
                    .then((videoData) => {
                      self.fastTemplate('editDescription', (rendered) => {
                        dialog({
                          html: rendered,

                          wrap: true,

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
                                const textContainert = el.videoContainer.find(
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
                              .catch((err) => {
                                tagElement = {};
                                tagArray = [];
                                d.close();

                                sitemessage(
                                  self.app.localization.e(
                                    'errorChangingDescription',
                                  ),
                                );
                              });
                          },

                          clbk: function (editDialogEl) {
                            tagElement = editDialogEl.find('.videoTagsWrapper');
                            tagArray = [...videoData.tags];
                            renders.tags(tagElement, tagArray);

                            editDialogEl
                              .find('.videoNameInput')
                              .val(videoData.name);
                            editDialogEl
                              .find('.videoDescriptionInput')
                              .val(videoData.description);
                          },

                          class: 'editVideoDialog',
                        });
                      });
                    })
                    .catch(() =>
                      sitemessage(
                        self.app.localization.e('errorChangingDescription'),
                      ),
                    );

                    if(_el.tooltipster)
                    _el.tooltipster('hide');
                });
              },
            );
          },
          data,
        );
      },
      //render tagline
      tags(element, tagArray) {
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
            if (tagArray.length < 5) {
              removeEqual(tagArray, tag);
              tagArray.push(tag);
              return true;
            }

            return false;
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
              renders.tags(tagElement, tagArray);
            },

            removeTags: function (tag) {
              tagActions.removeTags(tag);
              renders.tags(tagElement, tagArray);
            },

            addTag: function (tag) {
              tagActions.addTag(tag);
              renders.tags(tagElement, tagArray);
            },

            addTags: function (tags) {
              tagActions.addTags(tags);
              renders.tags(tagElement, tagArray);
            },
          },

          clbk: function (e, p) {},
        });
      },
    };

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.windowElement.on('scroll', events.onPageScroll);
      el.videoButtons.on('click', function () {
        const type = $(this).attr('rendersElement');

        renders.streamPage({ type });
      });

      el.searchButton.on('click', events.onSearchVideo);

      el.sortTypeSelect.on('change', events.onVideoSort);
      el.sortDirectionSelect.on('change', events.onVideoSort);
    };

    return {
      primary: primary,

      getdata: function (clbk) {
        //check if user has access to videos
        self.app.peertubeHandler.api.user
          .me()
          .then((res) => {
            //get video sorting params from localstorage
            var data = {
              selectedType:
                localStorage.getItem('videoCabinetSortType') || 'createdAt',
              selectedDirection:
                localStorage.getItem('videoCabinetSortDirection') || '-',
              hasAccess: true,
            };

            ed = {
              ...data,
              sort: `${data.selectedDirection}${data.selectedType}`,
              hasAccess: true,
            };

            clbk(data);
          })
          .catch((err) => {
            ed = { hasAccess: false };
            clbk({ hasAccess: false });
          });
      },

      destroy: function () {
        el.windowElement.off('scroll', events.onPageScroll);

        _.each(transcodingIntervals, function(i){
          clearInterval(i)
        })

        transcodingIntervals = {}

        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.windowElement = $(window);

        //do nothing if user has no access to videos
        if (!ed.hasAccess) return p.clbk(null, p);

        el.videoContainer = el.c.find('.userVideos');
        el.quotaContainer = el.c.find('.quotaContainer');
        el.videoButtons = el.c.find('.videoActiveButton');

        el.searchInput = el.c.find('.videoSearchInput');
        el.searchButton = el.c.find('.videoSearchButton');

        el.bonusProgramContainerViews = el.c.find('.leaderBoardContainerViews');
        el.bonusProgramContainerStars = el.c.find(
          '.leaderBoardContainerRatings',
        );

        el.sortTypeSelect = el.c.find('.sortTypeSelect');
        el.sortDirectionSelect = el.c.find('.sortDirectionSelect');

        initEvents();

        const videoPortionElement = renders.newVideoContainer();

        //getting sort parameters from local storage
        const videoParameters = {
          sort: ed.sort,
        };

        //getting and rendering videos
        actions
          .getHosts()
          .then((hosts = {}) => {
            const servers = Object.values(hosts).flat();

            servers.forEach(
              (server) =>
                (peertubeServers[server] = {
                  videos: [],
                  start: 0,
                }),
            );

            const serverPromises = servers.map((server) =>
              actions.getVideos(server, videoParameters),
            );

            return Promise.allSettled(serverPromises);
          })
          .then(() => actions.getFullPageInfo(videoPortionElement))
          .catch(() => actions.getFullPageInfo(videoPortionElement));

        //getting and rendering video quota information
        actions
          .getQuota()
          .then(() => renders.quota())
          .catch(() => renders.quota());

        p.clbk(null, p);
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
  module.exports = videoCabinet;
} else {
  app.modules.videoCabinet = {};
  app.modules.videoCabinet.module = videoCabinet;
}
