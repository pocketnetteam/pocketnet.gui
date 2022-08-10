(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_shared_p2p-media-loader_p2p-media-loader-plugin_ts"],{

/***/ "./src/assets/player/shared/p2p-media-loader/hls-plugin.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/shared/p2p-media-loader/hls-plugin.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Html5Hlsjs": () => (/* binding */ Html5Hlsjs),
/* harmony export */   "registerConfigPlugin": () => (/* binding */ registerConfigPlugin),
/* harmony export */   "registerSourceHandler": () => (/* binding */ registerSourceHandler)
/* harmony export */ });
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.light.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
// Thanks https://github.com/streamroot/videojs-hlsjs-plugin
// We duplicated this plugin to choose the hls.js version we want, because streamroot only provide a bundled file


const registerSourceHandler = function (vjs) {
    if (!hls_js__WEBPACK_IMPORTED_MODULE_0___default().isSupported()) {
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.warn('Hls.js is not supported in this browser!');
        return;
    }
    const html5 = vjs.getTech('Html5');
    if (!html5) {
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.error('No Hml5 tech found in videojs');
        return;
    }
    // FIXME: typings
    html5.registerSourceHandler({
        canHandleSource: function (source) {
            const hlsTypeRE = /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i;
            const hlsExtRE = /\.m3u8/i;
            if (hlsTypeRE.test(source.type))
                return 'probably';
            if (hlsExtRE.test(source.src))
                return 'maybe';
            return '';
        },
        handleSource: function (source, tech) {
            if (tech.hlsProvider) {
                tech.hlsProvider.dispose();
            }
            tech.hlsProvider = new Html5Hlsjs(vjs, source, tech);
            return tech.hlsProvider;
        }
    }, 0);
    // FIXME: typings
    vjs.Html5Hlsjs = Html5Hlsjs;
};
function hlsjsConfigHandler(options) {
    const player = this;
    if (!options)
        return;
    if (!player.srOptions_) {
        player.srOptions_ = {};
    }
    if (!player.srOptions_.hlsjsConfig) {
        player.srOptions_.hlsjsConfig = options.hlsjsConfig;
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
class Html5Hlsjs {
    constructor(vjs, source, tech) {
        this.errorCounts = {};
        this.maxNetworkErrorRecovery = 5;
        this.hlsjsConfig = null;
        this._duration = null;
        this.metadata = null;
        this.isLive = null;
        this.dvrDuration = null;
        this.edgeMargin = null;
        this.handlers = {
            play: null
        };
        this.vjs = vjs;
        this.source = source;
        this.tech = tech;
        this.tech.name_ = 'Hlsjs';
        this.videoElement = tech.el();
        this.player = vjs(tech.options_.playerId);
        this.videoElement.addEventListener('error', event => {
            let errorTxt;
            const mediaError = (event.currentTarget || event.target).error;
            if (!mediaError)
                return;
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info(mediaError);
            switch (mediaError.code) {
                case mediaError.MEDIA_ERR_ABORTED:
                    errorTxt = 'You aborted the video playback';
                    break;
                case mediaError.MEDIA_ERR_DECODE:
                    errorTxt = 'The video playback was aborted due to a corruption problem or because the video used features ' +
                        'your browser did not support';
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
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.error(`MEDIA_ERROR: ${errorTxt}`);
        });
        this.initialize();
    }
    duration() {
        if (this._duration === Infinity)
            return Infinity;
        if (!isNaN(this.videoElement.duration))
            return this.videoElement.duration;
        return this._duration || 0;
    }
    seekable() {
        if (this.hls.media) {
            if (!this.isLive) {
                return this.vjs.createTimeRanges(0, this.hls.media.duration);
            }
            // Video.js doesn't seem to like floating point timeranges
            const startTime = Math.round(this.hls.media.duration - this.dvrDuration);
            const endTime = Math.round(this.hls.media.duration - this.edgeMargin);
            return this.vjs.createTimeRanges(startTime, endTime);
        }
        return this.vjs.createTimeRanges();
    }
    // See comment for `initialize` method.
    dispose() {
        this.videoElement.removeEventListener('play', this.handlers.play);
        // FIXME: https://github.com/video-dev/hls.js/issues/4092
        const untypedHLS = this.hls;
        untypedHLS.log = untypedHLS.warn = () => {
            // empty
        };
        this.hls.destroy();
    }
    static addHook(type, callback) {
        Html5Hlsjs.hooks[type] = this.hooks[type] || [];
        Html5Hlsjs.hooks[type].push(callback);
    }
    static removeHook(type, callback) {
        if (Html5Hlsjs.hooks[type] === undefined)
            return false;
        const index = Html5Hlsjs.hooks[type].indexOf(callback);
        if (index === -1)
            return false;
        Html5Hlsjs.hooks[type].splice(index, 1);
        return true;
    }
    _executeHooksFor(type) {
        if (Html5Hlsjs.hooks[type] === undefined) {
            return;
        }
        // ES3 and IE < 9
        for (let i = 0; i < Html5Hlsjs.hooks[type].length; i++) {
            Html5Hlsjs.hooks[type][i](this.player, this.hls);
        }
    }
    _handleMediaError(error) {
        if (this.errorCounts[(hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.MEDIA_ERROR)] === 1) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('trying to recover media error');
            this.hls.recoverMediaError();
            return;
        }
        if (this.errorCounts[(hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.MEDIA_ERROR)] === 2) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('2nd try to recover media error (by swapping audio codec');
            this.hls.swapAudioCodec();
            this.hls.recoverMediaError();
            return;
        }
        if (this.errorCounts[(hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.MEDIA_ERROR)] > 2) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('bubbling media error up to VIDEOJS');
            this.hls.destroy();
            this.tech.error = () => error;
            this.tech.trigger('error');
        }
    }
    _handleNetworkError(error) {
        if (this.errorCounts[(hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.NETWORK_ERROR)] <= this.maxNetworkErrorRecovery) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('trying to recover network error');
            // Wait 1 second and retry
            setTimeout(() => this.hls.startLoad(), 1000);
            // Reset error count on success
            this.hls.once((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.FRAG_LOADED), () => {
                this.errorCounts[(hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.NETWORK_ERROR)] = 0;
            });
            return;
        }
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('bubbling network error up to VIDEOJS');
        this.hls.destroy();
        this.tech.error = () => error;
        this.tech.trigger('error');
    }
    _onError(_event, data) {
        const error = {
            message: `HLS.js error: ${data.type} - fatal: ${data.fatal} - ${data.details}`
        };
        // increment/set error count
        if (this.errorCounts[data.type])
            this.errorCounts[data.type] += 1;
        else
            this.errorCounts[data.type] = 1;
        if (data.fatal)
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.warn(error.message);
        else
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.error(error.message, { data });
        if (data.type === (hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.NETWORK_ERROR)) {
            error.code = 2;
            this._handleNetworkError(error);
        }
        else if (data.fatal && data.type === (hls_js__WEBPACK_IMPORTED_MODULE_0___default().ErrorTypes.MEDIA_ERROR) && data.details !== 'manifestIncompatibleCodecsError') {
            error.code = 3;
            this._handleMediaError(error);
        }
        else if (data.fatal) {
            this.hls.destroy();
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info('bubbling error up to VIDEOJS');
            this.tech.error = () => error;
            this.tech.trigger('error');
        }
    }
    buildLevelLabel(level) {
        if (this.player.srOptions_.levelLabelHandler) {
            return this.player.srOptions_.levelLabelHandler(level);
        }
        if (level.height)
            return level.height + 'p';
        if (level.width)
            return Math.round(level.width * 9 / 16) + 'p';
        if (level.bitrate)
            return (level.bitrate / 1000) + 'kbps';
        return '0';
    }
    _notifyVideoQualities() {
        if (!this.metadata)
            return;
        const resolutions = [];
        this.metadata.levels.forEach((level, index) => {
            resolutions.push({
                id: index,
                height: level.height,
                width: level.width,
                bitrate: level.bitrate,
                label: this.buildLevelLabel(level),
                selected: level.id === this.hls.manualLevel,
                selectCallback: () => {
                    this.hls.currentLevel = index;
                }
            });
        });
        resolutions.push({
            id: -1,
            label: this.player.localize('Auto'),
            selected: true,
            selectCallback: () => this.hls.currentLevel = -1
        });
        this.player.peertubeResolutions().add(resolutions);
    }
    _startLoad() {
        this.hls.startLoad(-1);
        this.videoElement.removeEventListener('play', this.handlers.play);
    }
    _oneLevelObjClone(obj) {
        const result = {};
        const objKeys = Object.keys(obj);
        for (let i = 0; i < objKeys.length; i++) {
            result[objKeys[i]] = obj[objKeys[i]];
        }
        return result;
    }
    _onMetaData(_event, data) {
        // This could arrive before 'loadedqualitydata' handlers is registered, remember it so we can raise it later
        this.metadata = data;
        this._notifyVideoQualities();
    }
    _initHlsjs() {
        const techOptions = this.tech.options_;
        const srOptions_ = this.player.srOptions_;
        const hlsjsConfigRef = (srOptions_ === null || srOptions_ === void 0 ? void 0 : srOptions_.hlsjsConfig) || techOptions.hlsjsConfig;
        // Hls.js will write to the reference thus change the object for later streams
        this.hlsjsConfig = hlsjsConfigRef ? this._oneLevelObjClone(hlsjsConfigRef) : {};
        if (['', 'auto'].includes(this.videoElement.preload) && !this.videoElement.autoplay && this.hlsjsConfig.autoStartLoad === undefined) {
            this.hlsjsConfig.autoStartLoad = false;
        }
        // If the user explicitly sets autoStartLoad to false, we're not going to enter the if block above
        // That's why we have a separate if block here to set the 'play' listener
        if (this.hlsjsConfig.autoStartLoad === false) {
            this.handlers.play = this._startLoad.bind(this);
            this.videoElement.addEventListener('play', this.handlers.play);
        }
        this.hls = new (hls_js__WEBPACK_IMPORTED_MODULE_0___default())(this.hlsjsConfig);
        this._executeHooksFor('beforeinitialize');
        this.hls.on((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.ERROR), (event, data) => this._onError(event, data));
        this.hls.on((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.MANIFEST_PARSED), (event, data) => this._onMetaData(event, data));
        this.hls.on((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.LEVEL_LOADED), (event, data) => {
            // The DVR plugin will auto seek to "live edge" on start up
            if (this.hlsjsConfig.liveSyncDuration) {
                this.edgeMargin = this.hlsjsConfig.liveSyncDuration;
            }
            else if (this.hlsjsConfig.liveSyncDurationCount) {
                this.edgeMargin = this.hlsjsConfig.liveSyncDurationCount * data.details.targetduration;
            }
            this.isLive = data.details.live;
            this.dvrDuration = data.details.totalduration;
            this._duration = this.isLive ? Infinity : data.details.totalduration;
            // Increase network error recovery for lives since they can be broken (server restart, stream interruption etc)
            if (this.isLive)
                this.maxNetworkErrorRecovery = 300;
        });
        this.hls.once((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.FRAG_LOADED), () => {
            // Emit custom 'loadedmetadata' event for parity with `videojs-contrib-hls`
            // Ref: https://github.com/videojs/videojs-contrib-hls#loadedmetadata
            this.tech.trigger('loadedmetadata');
        });
        this.hls.on((hls_js__WEBPACK_IMPORTED_MODULE_0___default().Events.LEVEL_SWITCHING), (_e, data) => {
            const resolutionId = this.hls.autoLevelEnabled
                ? -1
                : data.level;
            const autoResolutionChosenId = this.hls.autoLevelEnabled
                ? data.level
                : -1;
            this.player.peertubeResolutions().select({ id: resolutionId, autoResolutionChosenId, byEngine: true });
        });
        this.hls.attachMedia(this.videoElement);
        this.hls.loadSource(this.source.src);
    }
    initialize() {
        this._initHlsjs();
    }
}
Html5Hlsjs.hooks = {};



/***/ }),

/***/ "./src/assets/player/shared/p2p-media-loader/p2p-media-loader-plugin.ts":
/*!******************************************************************************!*\
  !*** ./src/assets/player/shared/p2p-media-loader/p2p-media-loader-plugin.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P2pMediaLoaderPlugin": () => (/* binding */ P2pMediaLoaderPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p2p-media-loader-core-basyton */ "./node_modules/p2p-media-loader-core-basyton/dist/index.js");
/* harmony import */ var p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var p2p_media_loader_hlsjs_basyton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p2p-media-loader-hlsjs-basyton */ "./node_modules/p2p-media-loader-hlsjs-basyton/dist/index.js");
/* harmony import */ var p2p_media_loader_hlsjs_basyton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(p2p_media_loader_hlsjs_basyton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");
/* harmony import */ var _hls_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hls-plugin */ "./src/assets/player/shared/p2p-media-loader/hls-plugin.ts");
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");






(0,_hls_plugin__WEBPACK_IMPORTED_MODULE_4__.registerConfigPlugin)((video_js__WEBPACK_IMPORTED_MODULE_0___default()));
(0,_hls_plugin__WEBPACK_IMPORTED_MODULE_4__.registerSourceHandler)((video_js__WEBPACK_IMPORTED_MODULE_0___default()));
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class P2pMediaLoaderPlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.CONSTANTS = {
            INFO_SCHEDULER: 1000 // Don't change this
        };
        this.statsP2PBytes = {
            pendingDownload: [],
            pendingUpload: [],
            numPeers: 0,
            totalDownload: 0,
            totalUpload: 0
        };
        this.statsHTTPBytes = {
            pendingDownload: [],
            pendingUpload: [],
            totalDownload: 0,
            totalUpload: 0
        };
        this.options = options;
        // FIXME: typings https://github.com/Microsoft/TypeScript/issues/14080
        if (!(video_js__WEBPACK_IMPORTED_MODULE_0___default().Html5Hlsjs)) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_5__.logger.warn('HLS.js does not seem to be supported. Try to fallback to built in HLS.');
            if (!player.canPlayType('application/vnd.apple.mpegurl')) {
                const message = 'Cannot fallback to built-in HLS';
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_5__.logger.warn(message);
                player.ready(() => player.trigger('error', new Error(message)));
                return;
            }
        }
        else {
            // FIXME: typings https://github.com/Microsoft/TypeScript/issues/14080
            video_js__WEBPACK_IMPORTED_MODULE_0___default().Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjs) => {
                this.hlsjs = hlsjs;
            });
            (0,p2p_media_loader_hlsjs_basyton__WEBPACK_IMPORTED_MODULE_2__.initVideoJsContribHlsJsPlayer)(player);
        }
        this.startTime = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_3__.timeToInt)(options.startTime);
        player.src({
            type: options.type,
            src: options.src
        });
        player.ready(() => {
            this.initializeCore();
            if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().Html5Hlsjs)) {
                this.initializePlugin();
            }
        });
    }
    dispose() {
        if (this.hlsjs)
            this.hlsjs.destroy();
        if (this.p2pEngine)
            this.p2pEngine.destroy();
        clearInterval(this.networkInfoInterval);
    }
    getCurrentLevel() {
        return this.hlsjs.levels[this.hlsjs.currentLevel];
    }
    getLiveLatency() {
        return Math.round(this.hlsjs.latency);
    }
    getHLSJS() {
        return this.hlsjs;
    }
    initializeCore() {
        this.player.one('play', () => {
            this.player.addClass('vjs-has-big-play-button-clicked');
        });
        this.player.one('canplay', () => {
            if (this.startTime) {
                this.player.currentTime(this.startTime);
            }
        });
    }
    initializePlugin() {
        (0,p2p_media_loader_hlsjs_basyton__WEBPACK_IMPORTED_MODULE_2__.initHlsJsPlayer)(this.hlsjs);
        this.p2pEngine = this.options.loader.getEngine();
        this.p2pEngine.on(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__.Events.SegmentError, (segment, err) => {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_5__.logger.error(`Segment ${segment.id} error.`, err);
            this.options.redundancyUrlManager.removeBySegmentUrl(segment.requestUrl);
        });
        this.statsP2PBytes.numPeers = 1 + this.options.redundancyUrlManager.countBaseUrls();
        this.runStats();
    }
    runStats() {
        this.p2pEngine.on(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__.Events.PieceBytesDownloaded, (method, _segment, bytes) => {
            const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
            elem.pendingDownload.push(bytes);
            elem.totalDownload += bytes;
        });
        this.p2pEngine.on(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__.Events.PieceBytesUploaded, (method, _segment, bytes) => {
            const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
            elem.pendingUpload.push(bytes);
            elem.totalUpload += bytes;
        });
        this.p2pEngine.on(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__.Events.PeerConnect, () => this.statsP2PBytes.numPeers++);
        this.p2pEngine.on(p2p_media_loader_core_basyton__WEBPACK_IMPORTED_MODULE_1__.Events.PeerClose, () => this.statsP2PBytes.numPeers--);
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
                },
                bandwidthEstimate: this.hlsjs.bandwidthEstimate / 8
            });
        }, this.CONSTANTS.INFO_SCHEDULER);
    }
    arraySum(data) {
        return data.reduce((a, b) => a + b, 0);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('p2pMediaLoader', P2pMediaLoaderPlugin);



/***/ }),

/***/ "?2d84":
/*!***********************!*\
  !*** socks (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5a06":
/*!*******************************!*\
  !*** ./common-node (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ed7a":
/*!*******************************************!*\
  !*** ./lib/client/http-tracker (ignored) ***!
  \*******************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5c78":
/*!******************************************!*\
  !*** ./lib/client/udp-tracker (ignored) ***!
  \******************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ed1b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d17e":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c33b":
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_assets_player_shared_p2p-media-loader_p2p-media-loader-plugin_ts.chunk.js.map