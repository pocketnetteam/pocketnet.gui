"use strict";
(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_p2p-media-loader_p2p-media-loader-plugin_ts"],{

/***/ "./src/assets/player/p2p-media-loader/hls-plugin.ts":
/*!**********************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/hls-plugin.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Html5Hlsjs": () => (/* binding */ Html5Hlsjs),
/* harmony export */   "registerConfigPlugin": () => (/* binding */ registerConfigPlugin),
/* harmony export */   "registerSourceHandler": () => (/* binding */ registerSourceHandler)
/* harmony export */ });
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _peertube_cap_level_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../peertube-cap-level-controller */ "./src/assets/player/peertube-cap-level-controller.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// Thanks https://github.com/streamroot/videojs-hlsjs-plugin
// We duplicated this plugin to choose the hls.js version we want, because streamroot only provide a bundled file
//import * as HlsjsLigt from 'hls.js/dist/hls.light.js'



const registerSourceHandler = function (vjs) {
  if (!hls_js__WEBPACK_IMPORTED_MODULE_0___default().isSupported()) {
    console.warn('Hls.js is not supported in this browser!');
    return;
  }

  const html5 = vjs.getTech('Html5');

  if (!html5) {
    console.error('Not supported version if video.js');
    return;
  } // FIXME: typings


  html5.registerSourceHandler({
    canHandleSource: function (source) {
      const hlsTypeRE = /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i;
      const hlsExtRE = /\.m3u8/i;
      if (hlsTypeRE.test(source.type)) return 'probably';
      if (hlsExtRE.test(source.src)) return 'maybe';
      return '';
    },
    handleSource: function (source, tech) {
      if (tech.hlsProvider) {
        tech.hlsProvider.dispose();
      }

      tech.hlsProvider = new Html5Hlsjs(vjs, source, tech);
      return tech.hlsProvider;
    }
  }, 0); // FIXME: typings

  vjs.Html5Hlsjs = Html5Hlsjs;
};

function hlsjsConfigHandler(options) {
  const player = this;
  if (!options) return;

  if (!player.srOptions_) {
    player.srOptions_ = {};
  }

  if (!player.srOptions_.hlsjsConfig) {
    player.srOptions_.hlsjsConfig = options.hlsjsConfig;
  }

  if (!player.srOptions_.captionConfig) {
    player.srOptions_.captionConfig = options.captionConfig;
  }

  if (options.levelLabelHandler && !player.srOptions_.levelLabelHandler) {
    player.srOptions_.levelLabelHandler = options.levelLabelHandler;
  }
}

const registerConfigPlugin = function (vjs) {
  // Used in Brightcove since we don't pass options directly there
  const registerVjsPlugin = vjs.registerPlugin || vjs.plugin;
  registerVjsPlugin('hlsjs', hlsjsConfigHandler);
};

let Html5Hlsjs = /*#__PURE__*/function () {
  function Html5Hlsjs(vjs, source, tech) {
    _classCallCheck(this, Html5Hlsjs);

    this.errorCounts = {};
    this.hlsjsConfig = null;
    this._duration = null;
    this.metadata = null;
    this.isLive = null;
    this.dvrDuration = null;
    this.edgeMargin = null;
    this.handlers = {
      play: null,
      playing: null,
      textTracksChange: null,
      audioTracksChange: null
    };
    this.uiTextTrackHandled = false;
    this.vjs = vjs;
    this.source = source;
    this.tech = tech;
    this.tech.name_ = 'Hlsjs';
    this.videoElement = tech.el();
    this.player = vjs(tech.options_.playerId);
    this.videoElement.addEventListener('error', event => {
      let errorTxt;
      const mediaError = (event.currentTarget || event.target).error;
      if (!mediaError) return;

      switch (mediaError.code) {
        case mediaError.MEDIA_ERR_ABORTED:
          errorTxt = 'You aborted the video playback';
          break;

        case mediaError.MEDIA_ERR_DECODE:
          errorTxt = 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support';

          this._handleMediaError(mediaError);

          break;

        case mediaError.MEDIA_ERR_NETWORK:
          errorTxt = 'A network error caused the video download to fail part-way';
          break;

        case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorTxt = 'The video could not be loaded, either because the server or network failed or because the format is not supported';
          break;

        default:
          errorTxt = mediaError.message;
      }
    });
    this.initialize();
  }

  _createClass(Html5Hlsjs, [{
    key: "duration",
    value: function duration() {
      return this._duration || this.videoElement.duration || 0;
    }
  }, {
    key: "seekable",
    value: function seekable() {
      if (this.hls.media) {
        if (!this.isLive) {
          return this.vjs.createTimeRanges(0, this.hls.media.duration);
        } // Video.js doesn't seem to like floating point timeranges


        const startTime = Math.round(this.hls.media.duration - this.dvrDuration);
        const endTime = Math.round(this.hls.media.duration - this.edgeMargin);
        return this.vjs.createTimeRanges(startTime, endTime);
      }

      return this.vjs.createTimeRanges();
    } // See comment for `initialize` method.

  }, {
    key: "dispose",
    value: function dispose() {
      this.videoElement.removeEventListener('play', this.handlers.play);
      this.videoElement.removeEventListener('playing', this.handlers.playing);
      this.player.textTracks().removeEventListener('change', this.handlers.textTracksChange);
      this.uiTextTrackHandled = false;
      this.hls.destroy();
      this.handlers = null;
    }
  }, {
    key: "_executeHooksFor",
    value: function _executeHooksFor(type) {
      if (Html5Hlsjs.hooks[type] === undefined) {
        return;
      } // ES3 and IE < 9


      for (let i = 0; i < Html5Hlsjs.hooks[type].length; i++) {
        Html5Hlsjs.hooks[type][i](this.player, this.hls);
      }
    }
  }, {
    key: "_handleMediaError",
    value: function _handleMediaError(error) {
      if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.MEDIA_ERROR] === 1) {
        console.info('trying to recover media error');
        this.hls.recoverMediaError();
        return;
      }

      if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.MEDIA_ERROR] === 2) {
        console.info('2nd try to recover media error (by swapping audio codec');
        this.hls.swapAudioCodec();
        this.hls.recoverMediaError();
        return;
      }

      if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.MEDIA_ERROR] > 2) {
        console.info('bubbling media error up to VIDEOJS');
        this.hls.recoverMediaError(); //this.hls.destroy()
        //this.tech.error = () => error
        //this.tech.trigger('error')

        return;
      }
    }
  }, {
    key: "_handleNotFatalError",
    value: function _handleNotFatalError(error) {
      this.tech.trigger('error');
    }
  }, {
    key: "_handleNetworkError",
    value: function _handleNetworkError(error) {
      setTimeout(() => this.hls.startLoad(), 1000);

      if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.NETWORK_ERROR] <= 1) {
        console.info('trying to recover network error', error); // Wait 1 second and retry

        setTimeout(() => this.hls.startLoad(), 1000); // Reset error count on success

        this.hls.once(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.FRAG_LOADED, () => {
          this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.NETWORK_ERROR] = 0;
        });
        return;
      }

      console.info('bubbling network error up to VIDEOJS'); // this.hls.destroy()

      this.tech.error = () => error;

      this.tech.trigger('error');
    }
  }, {
    key: "_onError",
    value: function _onError(_event, data) {
      const error = {
        message: `HLS.js error: ${data.type} - fatal: ${data.fatal} - ${data.details}`
      };

      if (!data.fatal) {
        return;
      } // increment/set error count


      if (this.errorCounts[data.type]) this.errorCounts[data.type] += 1;else this.errorCounts[data.type] = 1;

      if (data.type === hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.NETWORK_ERROR) {
        error.code = 2;

        this._handleNetworkError(error);
      } else if (data.type === hls_js__WEBPACK_IMPORTED_MODULE_0__.ErrorTypes.MEDIA_ERROR && data.details !== 'manifestIncompatibleCodecsError') {
        error.code = 3;

        this._handleMediaError(error);
      } else {
        // this.hls.destroy()
        this.tech.error = () => error;

        this.tech.trigger('error');
      }
    }
  }, {
    key: "switchQuality",
    value: function switchQuality(qualityId) {
      this.hls.nextLevel = qualityId;
    }
  }, {
    key: "_levelLabel",
    value: function _levelLabel(level) {
      if (this.player.srOptions_.levelLabelHandler) {
        return this.player.srOptions_.levelLabelHandler(level);
      }

      if (level.height) return level.height + 'p';
      if (level.width) return Math.round(level.width * 9 / 16) + 'p';
      if (level.bitrate) return level.bitrate / 1000 + 'kbps';
      return 0;
    }
  }, {
    key: "_relayQualityChange",
    value: function _relayQualityChange(qualityLevels) {
      // Determine if it is "Auto" (all tracks enabled)
      let isAuto = true;

      for (let i = 0; i < qualityLevels.length; i++) {
        if (!qualityLevels[i]._enabled) {
          isAuto = false;
          break;
        }
      } // Interact with ME


      if (isAuto) {
        this.hls.currentLevel = -1;
        return;
      } // Find ID of highest enabled track


      let selectedTrack;

      for (selectedTrack = qualityLevels.length - 1; selectedTrack >= 0; selectedTrack--) {
        if (qualityLevels[selectedTrack]._enabled) {
          break;
        }
      }

      this.hls.currentLevel = selectedTrack;
    }
  }, {
    key: "_handleQualityLevels",
    value: function _handleQualityLevels() {
      if (!this.metadata) return;
      const qualityLevels = this.player.qualityLevels && this.player.qualityLevels();
      if (!qualityLevels) return;

      for (let i = 0; i < this.metadata.levels.length; i++) {
        const details = this.metadata.levels[i];
        const representation = {
          id: i,
          width: details.width,
          height: details.height,
          bandwidth: details.bitrate,
          bitrate: details.bitrate,
          _enabled: true
        };
        const self = this;

        representation.enabled = function (level, toggle) {
          // Brightcove switcher works TextTracks-style (enable tracks that it wants to ABR on)
          if (typeof toggle === 'boolean') {
            this[level]._enabled = toggle;

            self._relayQualityChange(this);
          }

          return this[level]._enabled;
        };

        qualityLevels.addQualityLevel(representation);
      }
    }
  }, {
    key: "_notifyVideoQualities",
    value: function _notifyVideoQualities() {
      if (!this.metadata) return;
      const cleanTracklist = [];

      if (this.metadata.levels.length > 1) {
        const autoLevel = {
          id: -1,
          label: 'auto',
          selected: this.hls.manualLevel === -1
        };
        cleanTracklist.push(autoLevel);
      }

      this.metadata.levels.forEach((level, index) => {
        // Don't write in level (shared reference with Hls.js)
        const quality = {
          id: index,
          selected: index === this.hls.manualLevel,
          label: this._levelLabel(level)
        };
        cleanTracklist.push(quality);
      });
      const payload = {
        qualityData: {
          video: cleanTracklist
        },
        qualitySwitchCallback: this.switchQuality.bind(this)
      };
      this.tech.trigger('loadedqualitydata', payload); // Self-de-register so we don't raise the payload multiple times

      this.videoElement.removeEventListener('playing', this.handlers.playing);
    }
  }, {
    key: "_updateSelectedAudioTrack",
    value: function _updateSelectedAudioTrack() {
      const playerAudioTracks = this.tech.audioTracks();

      for (let j = 0; j < playerAudioTracks.length; j++) {
        // FIXME: typings
        if (playerAudioTracks[j].enabled) {
          this.hls.audioTrack = j;
          break;
        }
      }
    }
  }, {
    key: "_onAudioTracks",
    value: function _onAudioTracks() {
      const hlsAudioTracks = this.hls.audioTracks;
      const playerAudioTracks = this.tech.audioTracks();

      if (hlsAudioTracks.length > 1 && playerAudioTracks.length === 0) {
        // Add Hls.js audio tracks if not added yet
        for (let i = 0; i < hlsAudioTracks.length; i++) {
          playerAudioTracks.addTrack(new this.vjs.AudioTrack({
            id: i.toString(),
            kind: 'alternative',
            label: hlsAudioTracks[i].name || hlsAudioTracks[i].lang,
            language: hlsAudioTracks[i].lang,
            enabled: i === this.hls.audioTrack
          }));
        } // Handle audio track change event


        this.handlers.audioTracksChange = this._updateSelectedAudioTrack.bind(this);
        playerAudioTracks.addEventListener('change', this.handlers.audioTracksChange);
      }
    }
  }, {
    key: "_getTextTrackLabel",
    value: function _getTextTrackLabel(textTrack) {
      // Label here is readable label and is optional (used in the UI so if it is there it should be different)
      return textTrack.label ? textTrack.label : textTrack.language;
    }
  }, {
    key: "_isSameTextTrack",
    value: function _isSameTextTrack(track1, track2) {
      return this._getTextTrackLabel(track1) === this._getTextTrackLabel(track2) && track1.kind === track2.kind;
    }
  }, {
    key: "_updateSelectedTextTrack",
    value: function _updateSelectedTextTrack() {
      const playerTextTracks = this.player.textTracks();
      let activeTrack = null;

      for (let j = 0; j < playerTextTracks.length; j++) {
        if (playerTextTracks[j].mode === 'showing') {
          activeTrack = playerTextTracks[j];
          break;
        }
      }

      const hlsjsTracks = this.videoElement.textTracks;

      for (let k = 0; k < hlsjsTracks.length; k++) {
        if (hlsjsTracks[k].kind === 'subtitles' || hlsjsTracks[k].kind === 'captions') {
          hlsjsTracks[k].mode = activeTrack && this._isSameTextTrack(hlsjsTracks[k], activeTrack) ? 'showing' : 'disabled';
        }
      }
    }
  }, {
    key: "_startLoad",
    value: function _startLoad() {
      this.hls.startLoad(-1);
      this.videoElement.removeEventListener('play', this.handlers.play);
    }
  }, {
    key: "_oneLevelObjClone",
    value: function _oneLevelObjClone(obj) {
      const result = {};
      const objKeys = Object.keys(obj);

      for (let i = 0; i < objKeys.length; i++) {
        result[objKeys[i]] = obj[objKeys[i]];
      }

      return result;
    }
  }, {
    key: "_filterDisplayableTextTracks",
    value: function _filterDisplayableTextTracks(textTracks) {
      const displayableTracks = []; // Filter out tracks that is displayable (captions or subtitles)

      for (let idx = 0; idx < textTracks.length; idx++) {
        if (textTracks[idx].kind === 'subtitles' || textTracks[idx].kind === 'captions') {
          displayableTracks.push(textTracks[idx]);
        }
      }

      return displayableTracks;
    }
  }, {
    key: "_updateTextTrackList",
    value: function _updateTextTrackList() {
      const displayableTracks = this._filterDisplayableTextTracks(this.videoElement.textTracks);

      const playerTextTracks = this.player.textTracks(); // Add stubs to make the caption switcher shows up
      // Adding the Hls.js text track in will make us have double captions

      for (let idx = 0; idx < displayableTracks.length; idx++) {
        let isAdded = false;

        for (let jdx = 0; jdx < playerTextTracks.length; jdx++) {
          if (this._isSameTextTrack(displayableTracks[idx], playerTextTracks[jdx])) {
            isAdded = true;
            break;
          }
        }

        if (!isAdded) {
          const hlsjsTextTrack = displayableTracks[idx];
          this.player.addRemoteTextTrack({
            kind: hlsjsTextTrack.kind,
            label: this._getTextTrackLabel(hlsjsTextTrack),
            language: hlsjsTextTrack.language,
            srclang: hlsjsTextTrack.language
          }, false);
        }
      } // Handle UI switching


      this._updateSelectedTextTrack();

      if (!this.uiTextTrackHandled) {
        this.handlers.textTracksChange = this._updateSelectedTextTrack.bind(this);
        playerTextTracks.addEventListener('change', this.handlers.textTracksChange);
        this.uiTextTrackHandled = true;
      }
    }
  }, {
    key: "_onMetaData",
    value: function _onMetaData(_event, data) {
      // This could arrive before 'loadedqualitydata' handlers is registered, remember it so we can raise it later
      this.metadata = data;

      this._handleQualityLevels();
    }
  }, {
    key: "_createCueHandler",
    value: function _createCueHandler(captionConfig) {
      return {
        newCue: (track, startTime, endTime, captionScreen) => {
          let row;
          let cue;
          let text;
          const VTTCue = window.VTTCue || window.TextTrackCue;

          for (let r = 0; r < captionScreen.rows.length; r++) {
            row = captionScreen.rows[r];
            text = '';

            if (!row.isEmpty()) {
              for (let c = 0; c < row.chars.length; c++) {
                text += row.chars[c].ucharj;
              }

              cue = new VTTCue(startTime, endTime, text.trim()); // typeof null === 'object'

              if (captionConfig != null && typeof captionConfig === 'object') {
                // Copy client overridden property into the cue object
                const configKeys = Object.keys(captionConfig);

                for (let k = 0; k < configKeys.length; k++) {
                  cue[configKeys[k]] = captionConfig[configKeys[k]];
                }
              }

              track.addCue(cue);
              if (endTime === startTime) track.addCue(new VTTCue(endTime + 5, ''));
            }
          }
        }
      };
    }
  }, {
    key: "_initHlsjs",
    value: function _initHlsjs() {
      const techOptions = this.tech.options_;
      const srOptions_ = this.player.srOptions_;
      const hlsjsConfigRef = srOptions_ && srOptions_.hlsjsConfig || techOptions.hlsjsConfig; // Hls.js will write to the reference thus change the object for later streams

      this.hlsjsConfig = hlsjsConfigRef ? this._oneLevelObjClone(hlsjsConfigRef) : {};

      if (['', 'auto'].includes(this.videoElement.preload) && !this.videoElement.autoplay && this.hlsjsConfig.autoStartLoad === undefined) {
        this.hlsjsConfig.autoStartLoad = false;
      }

      const captionConfig = srOptions_ && srOptions_.captionConfig || techOptions.captionConfig;

      if (captionConfig) {
        this.hlsjsConfig.cueHandler = this._createCueHandler(captionConfig);
      } // If the user explicitly sets autoStartLoad to false, we're not going to enter the if block above
      // That's why we have a separate if block here to set the 'play' listener


      if (this.hlsjsConfig.autoStartLoad === false) {
        this.handlers.play = this._startLoad.bind(this);
        this.videoElement.addEventListener('play', this.handlers.play);
      } // _notifyVideoQualities sometimes runs before the quality picker event handler is registered -> no video switcher


      this.handlers.playing = this._notifyVideoQualities.bind(this);
      this.videoElement.addEventListener('playing', this.handlers.playing); //this.hlsjsConfig.debug = true
      //this.hlsjsConfig.liveSyncDurationCount = 4
      //this.hlsjsConfig.maxMaxBufferLength = 55
      //this.hlsjsConfig.backBufferLength = 90
      ///// liveSyncPosition

      /* @ts-ignore */

      this.hlsjsConfig.capLevelController = _peertube_cap_level_controller__WEBPACK_IMPORTED_MODULE_1__["default"];
      this.hls = new (hls_js__WEBPACK_IMPORTED_MODULE_0___default())(this.hlsjsConfig);
      this.player.hls = this.hls; //this._executeHooksFor('beforeinitialize')

      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.ERROR, (event, data) => this._onError(event, data));
      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.AUDIO_TRACKS_UPDATED, () => this._onAudioTracks());
      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.MANIFEST_PARSED, (event, data) => this._onMetaData(event, data)); // FIXME: typings

      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.LEVEL_LOADED, (event, data) => {
        // The DVR plugin will auto seek to "live edge" on start up
        if (this.hlsjsConfig.liveSyncDuration) {
          this.edgeMargin = this.hlsjsConfig.liveSyncDuration;
        } else if (this.hlsjsConfig.liveSyncDurationCount) {
          this.edgeMargin = this.hlsjsConfig.liveSyncDurationCount * data.details.targetduration;
        }

        this.isLive = data.details.live;
        this.dvrDuration = data.details.totalduration;
        this._duration = this.isLive ? Infinity : data.details.totalduration;
      });
      this.hls.once(hls_js__WEBPACK_IMPORTED_MODULE_0__.Events.FRAG_LOADED, () => {
        // Emit custom 'loadedmetadata' event for parity with `videojs-contrib-hls`
        // Ref: https://github.com/videojs/videojs-contrib-hls#loadedmetadata
        this.tech.trigger('loadedmetadata');
      });
      this.hls.attachMedia(this.videoElement);
      this.hls.loadSource(this.source.src);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this._initHlsjs();
    }
  }], [{
    key: "addHook",
    value: function addHook(type, callback) {
      Html5Hlsjs.hooks[type] = this.hooks[type] || [];
      Html5Hlsjs.hooks[type].push(callback);
    }
  }, {
    key: "removeHook",
    value: function removeHook(type, callback) {
      if (Html5Hlsjs.hooks[type] === undefined) return false;
      const index = Html5Hlsjs.hooks[type].indexOf(callback);
      if (index === -1) return false;
      Html5Hlsjs.hooks[type].splice(index, 1);
      return true;
    }
  }]);

  return Html5Hlsjs;
}();

Html5Hlsjs.hooks = {};


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/p2p-media-loader-plugin.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/p2p-media-loader-plugin.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P2pMediaLoaderPlugin": () => (/* binding */ P2pMediaLoaderPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/index.ts");
/* harmony import */ var _core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/p2p-media-loader-master/p2p-media-loader-core/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var _hls_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hls-plugin */ "./src/assets/player/p2p-media-loader/hls-plugin.ts");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_5__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







(0,_hls_plugin__WEBPACK_IMPORTED_MODULE_4__.registerConfigPlugin)((video_js__WEBPACK_IMPORTED_MODULE_0___default()));
(0,_hls_plugin__WEBPACK_IMPORTED_MODULE_4__.registerSourceHandler)((video_js__WEBPACK_IMPORTED_MODULE_0___default()));
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');

let P2pMediaLoaderPlugin = /*#__PURE__*/function (_Plugin) {
  _inherits(P2pMediaLoaderPlugin, _Plugin);

  var _super = _createSuper(P2pMediaLoaderPlugin);

  function P2pMediaLoaderPlugin(player, options) {
    var _this;

    _classCallCheck(this, P2pMediaLoaderPlugin);

    _this = _super.call(this, player);
    _this.CONSTANTS = {
      INFO_SCHEDULER: 1000 // Don't change this

    };
    _this.statsP2PBytes = {
      pendingDownload: [],
      pendingUpload: [],
      numPeers: 0,
      totalDownload: 0,
      totalUpload: 0
    };
    _this.statsHTTPBytes = {
      pendingDownload: [],
      pendingUpload: [],
      totalDownload: 0,
      totalUpload: 0
    };
    _this.options = options;
    (0,_core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__.initVideoJsContribHlsJsPlayer)(player);

    if (options) {
      _this.startTime = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.timeToInt)(options.startTime);
      player.src({
        type: options.type,
        src: options.src
      });
    }

    player.ready(() => {
      _this.initializeCore();

      _this.hlsjs = player.hls;

      if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().Html5Hlsjs)) {
        if (options) _this.initializePlugin();
      }
    });
    return _this;
  }

  _createClass(P2pMediaLoaderPlugin, [{
    key: "dispose",
    value: function dispose() {
      if (this.hlsjs) this.hlsjs.destroy();
      if (this.p2pEngine) this.p2pEngine.destroy();
      clearInterval(this.networkInfoInterval);
    }
  }, {
    key: "getHLSJS",
    value: function getHLSJS() {
      return this.hlsjs;
    }
  }, {
    key: "initializeCore",
    value: function initializeCore() {
      this.player.one('play', () => {
        this.player.addClass('vjs-has-big-play-button-clicked');
      });
      this.player.one('canplay', () => {
        if (this.startTime) {
          this.player.currentTime(this.startTime);
        }
      });
    }
  }, {
    key: "initializePlugin",
    value: function initializePlugin() {
      (0,_core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__.initHlsJsPlayer)(this.hlsjs); // FIXME: typings

      const options = this.player.tech(true).options_;
      this.p2pEngine = options.hlsjsConfig.loader.getEngine();
      this.hlsjs.on(hls_js__WEBPACK_IMPORTED_MODULE_5__.Events.LEVEL_SWITCHING, (_, data) => {
        this.trigger('resolutionChange', {
          auto: this.hlsjs.autoLevelEnabled,
          resolutionId: data.height
        });
      });
      this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__.Events.SegmentError, (segment, err) => {
        this.options.redundancyUrlManager.removeBySegmentUrl(segment.requestUrl);
      });
      this.statsP2PBytes.numPeers = 1 + this.options.redundancyUrlManager.countBaseUrls();
      this.runStats();
    }
  }, {
    key: "runStats",
    value: function runStats() {
      this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__.Events.PieceBytesDownloaded, (method, segment, size) => {
        const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
        elem.pendingDownload.push(size);
        elem.totalDownload += size;
      });
      this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__.Events.PieceBytesUploaded, (method, segment, size) => {
        const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
        elem.pendingUpload.push(size);
        elem.totalUpload += size;
      });
      this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__.Events.PeerConnect, () => this.statsP2PBytes.numPeers++);
      this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__.Events.PeerClose, () => this.statsP2PBytes.numPeers--);
      this.networkInfoInterval = setInterval(() => {
        const p2pDownloadSpeed = this.arraySum(this.statsP2PBytes.pendingDownload);
        const p2pUploadSpeed = this.arraySum(this.statsP2PBytes.pendingUpload);
        const httpDownloadSpeed = this.arraySum(this.statsHTTPBytes.pendingDownload);
        const httpUploadSpeed = this.arraySum(this.statsHTTPBytes.pendingUpload);
        this.statsP2PBytes.pendingDownload = [];
        this.statsP2PBytes.pendingUpload = [];
        this.statsHTTPBytes.pendingDownload = [];
        this.statsHTTPBytes.pendingUpload = [];
        return this.player.trigger('p2pInfo', {
          source: 'p2p-media-loader',
          http: {
            downloadSpeed: httpDownloadSpeed,
            uploadSpeed: httpUploadSpeed,
            downloaded: this.statsHTTPBytes.totalDownload,
            uploaded: this.statsHTTPBytes.totalUpload
          },
          p2p: {
            downloadSpeed: p2pDownloadSpeed,
            uploadSpeed: p2pUploadSpeed,
            numPeers: this.statsP2PBytes.numPeers,
            downloaded: this.statsP2PBytes.totalDownload,
            uploaded: this.statsP2PBytes.totalUpload
          }
        });
      }, this.CONSTANTS.INFO_SCHEDULER);
    }
  }, {
    key: "arraySum",
    value: function arraySum(data) {
      return data.reduce((a, b) => a + b, 0);
    }
  }]);

  return P2pMediaLoaderPlugin;
}(Plugin);

video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('p2pMediaLoader', P2pMediaLoaderPlugin);


/***/ }),

/***/ "./src/assets/player/peertube-cap-level-controller.ts":
/*!************************************************************!*\
  !*** ./src/assets/player/peertube-cap-level-controller.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hls.js/src/events */ "./node_modules/hls.js/src/events.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//@ts-nocheck


let CapLevelController = /*#__PURE__*/function () {
  function CapLevelController(hls) {
    _classCallCheck(this, CapLevelController);

    this.hls = hls;
    this.autoLevelCapping = Number.POSITIVE_INFINITY;
    this.firstLevel = -1;
    this.media = null;
    this.restrictedLevels = [];
    this.timer = undefined;
    this.clientRect = null;
    this.paused = true;

    this.hls.pauseCapping = () => {
      this.paused = true;
    };

    this.hls.resumeCapping = () => {
      this.paused = false;
    };

    this.registerListeners();
  }

  _createClass(CapLevelController, [{
    key: "setStreamController",
    value: function setStreamController(streamController) {
      this.streamController = streamController;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unregisterListener();

      if (this.hls.config.capLevelToPlayerSize) {
        this.stopCapping();
      }

      this.media = null;
      this.clientRect = null; // @ts-ignore

      this.hls = this.streamController = null;
    }
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      const {
        hls
      } = this;
      hls.on(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
      hls.on(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.on(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.on(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.on(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    }
  }, {
    key: "unregisterListener",
    value: function unregisterListener() {
      const {
        hls
      } = this;
      hls.off(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
      hls.off(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
      hls.off(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MANIFEST_PARSED, this.onManifestParsed, this);
      hls.off(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.BUFFER_CODECS, this.onBufferCodecs, this);
      hls.off(hls_js_src_events__WEBPACK_IMPORTED_MODULE_0__.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    }
  }, {
    key: "onFpsDropLevelCapping",
    value: function onFpsDropLevelCapping(event, data) {
      // Don't add a restricted level more than once
      if (CapLevelController.isLevelAllowed(data.droppedLevel, this.restrictedLevels)) {
        this.restrictedLevels.push(data.droppedLevel);
      }
    }
  }, {
    key: "onMediaAttaching",
    value: function onMediaAttaching(event, data) {
      this.media = data.media instanceof HTMLVideoElement ? data.media : null;
    }
  }, {
    key: "onManifestParsed",
    value: function onManifestParsed(event, data) {
      const hls = this.hls;
      this.restrictedLevels = [];
      this.firstLevel = data.firstLevel;

      if (hls.config.capLevelToPlayerSize && data.video) {
        // Start capping immediately if the manifest has signaled video codecs
        this.startCapping();
      }
    } // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
    // to the first level

  }, {
    key: "onBufferCodecs",
    value: function onBufferCodecs(event, data) {
      const hls = this.hls;

      if (hls.config.capLevelToPlayerSize && data.video) {
        // If the manifest did not signal a video codec capping has been deferred until we're certain video is present
        this.startCapping();
      }
    }
  }, {
    key: "onMediaDetaching",
    value: function onMediaDetaching() {
      this.stopCapping();
    }
  }, {
    key: "detectPlayerSize",
    value: function detectPlayerSize() {
      if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
        const levels = this.hls.levels;

        if (levels.length) {
          const hls = this.hls;
          hls.autoLevelCapping = this.getMaxLevel(levels.length - 1);

          if (hls.autoLevelCapping > this.autoLevelCapping && this.streamController) {
            // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
            // usually happen when the user go to the fullscreen mode.
            this.streamController.nextLevelSwitch();
          }

          this.autoLevelCapping = hls.autoLevelCapping;
        }
      }
    }
    /*
     * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
     */

  }, {
    key: "getMaxLevel",
    value: function getMaxLevel(capLevelIndex) {
      const levels = this.hls.levels;

      if (!levels.length) {
        return -1;
      }

      const validLevels = levels.filter((level, index) => CapLevelController.isLevelAllowed(index, this.restrictedLevels) && index <= capLevelIndex);
      this.clientRect = null;
      return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
    }
  }, {
    key: "capp",
    value: function capp() {
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      this.hls.firstLevel = this.getMaxLevel(this.firstLevel);
      this.detectPlayerSize();
    }
  }, {
    key: "startCapping",
    value: function startCapping() {
      if (this.timer) {
        // Don't reset capping if started twice; this can happen if the manifest signals a video codec
        return;
      }

      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      this.hls.firstLevel = this.getMaxLevel(this.firstLevel);
      self.clearInterval(this.timer);
      this.timer = self.setInterval(this.detectPlayerSize.bind(this), 10000);
      this.detectPlayerSize();
    }
  }, {
    key: "stopCapping",
    value: function stopCapping() {
      this.restrictedLevels = [];
      this.firstLevel = -1; //this.autoLevelCapping = Number.POSITIVE_INFINITY;

      if (this.timer) {
        self.clearInterval(this.timer);
        this.timer = undefined;
      }
    }
  }, {
    key: "getDimensions",
    value: function getDimensions() {
      if (this.paused && this.clientRectLast) {
        return this.clientRectLast;
      }

      if (this.clientRect) {
        return this.clientRect;
      }

      const media = this.media;
      const boundsRect = {
        width: 0,
        height: 0
      };

      if (media) {
        const clientRect = media.getBoundingClientRect();
        boundsRect.width = clientRect.width;
        boundsRect.height = clientRect.height;

        if (!boundsRect.width && !boundsRect.height) {
          // When the media element has no width or height (equivalent to not being in the DOM),
          // then use its width and height attributes (media.width, media.height)
          boundsRect.width = clientRect.right - clientRect.left || media.width || 0;
          boundsRect.height = clientRect.bottom - clientRect.top || media.height || 0;
        }
      }

      this.clientRectLast = this.clientRect = boundsRect;
      return boundsRect;
    }
  }, {
    key: "mediaWidth",
    get: function () {
      return this.getDimensions().width * CapLevelController.contentScaleFactor;
    }
  }, {
    key: "mediaHeight",
    get: function () {
      return this.getDimensions().height * CapLevelController.contentScaleFactor;
    }
  }], [{
    key: "contentScaleFactor",
    get: function () {
      let pixelRatio = 1;

      try {
        pixelRatio = self.devicePixelRatio;
      } catch (e) {
        /* no-op */
      }

      if (pixelRatio > 1.5) pixelRatio = 1.5;
      return pixelRatio;
    }
  }, {
    key: "isLevelAllowed",
    value: function isLevelAllowed(level) {
      let restrictedLevels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return restrictedLevels.indexOf(level) === -1;
    }
  }, {
    key: "getMaxLevelByMediaSize",
    value: function getMaxLevelByMediaSize(levels, width, height) {
      if (!levels || !levels.length) {
        return -1;
      } // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
      // to determine whether we've chosen the greatest bandwidth for the media's dimensions


      const atGreatestBandiwdth = (curLevel, nextLevel) => {
        if (!nextLevel) {
          return true;
        }

        return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
      }; // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
      // the max level


      let maxLevelIndex = levels.length - 1;

      for (let i = 0; i < levels.length; i += 1) {
        const level = levels[i];

        if ((level.width >= width || level.height >= height) && atGreatestBandiwdth(level, levels[i + 1])) {
          maxLevelIndex = i;
          break;
        }
      }

      return maxLevelIndex;
    }
  }]);

  return CapLevelController;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CapLevelController);

/***/ })

}]);
//# sourceMappingURL=src_assets_player_p2p-media-loader_p2p-media-loader-plugin_ts.chunk.js.map