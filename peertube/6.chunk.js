(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/assets/player/p2p-media-loader/hls-plugin.ts":
/*!**********************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/hls-plugin.ts ***!
  \**********************************************************/
/*! exports provided: Html5Hlsjs, registerSourceHandler, registerConfigPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Html5Hlsjs", function() { return Html5Hlsjs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerSourceHandler", function() { return registerSourceHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerConfigPlugin", function() { return registerConfigPlugin; });
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_0__);
// Thanks https://github.com/streamroot/videojs-hlsjs-plugin
// We duplicated this plugin to choose the hls.js version we want, because streamroot only provide a bundled file
//import * as HlsjsLigt from 'hls.js/dist/hls.light.js'

const registerSourceHandler = function (vjs) {
    if (!hls_js__WEBPACK_IMPORTED_MODULE_0___default.a.isSupported()) {
        console.warn('Hls.js is not supported in this browser!');
        return;
    }
    const html5 = vjs.getTech('Html5');
    if (!html5) {
        console.error('Not supported version if video.js');
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
class Html5Hlsjs {
    constructor(vjs, source, tech) {
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
            if (!mediaError)
                return;
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
    duration() {
        return this._duration || this.videoElement.duration || 0;
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
        this.videoElement.removeEventListener('playing', this.handlers.playing);
        this.player.textTracks().removeEventListener('change', this.handlers.textTracksChange);
        this.uiTextTrackHandled = false;
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
        if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].MEDIA_ERROR] === 1) {
            console.info('trying to recover media error');
            this.hls.recoverMediaError();
            return;
        }
        if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].MEDIA_ERROR] === 2) {
            console.info('2nd try to recover media error (by swapping audio codec');
            this.hls.swapAudioCodec();
            this.hls.recoverMediaError();
            return;
        }
        if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].MEDIA_ERROR] > 2) {
            console.info('bubbling media error up to VIDEOJS');
            this.hls.destroy();
            this.tech.error = () => error;
            this.tech.trigger('error');
            return;
        }
    }
    _handleNetworkError(error) {
        setTimeout(() => this.hls.startLoad(), 1000);
        return;
        if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].NETWORK_ERROR] <= 1) {
            console.info('trying to recover network error');
            // Wait 1 second and retry
            setTimeout(() => this.hls.startLoad(), 1000);
            // Reset error count on success
            this.hls.once(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_LOADED, () => {
                this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].NETWORK_ERROR] = 0;
            });
            return;
        }
        console.info('bubbling network error up to VIDEOJS');
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
        if (!data.fatal)
            return;
        if (data.type === hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].NETWORK_ERROR) {
            error.code = 2;
            this._handleNetworkError(error);
        }
        else if (data.type === hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].MEDIA_ERROR && data.details !== 'manifestIncompatibleCodecsError') {
            error.code = 3;
            this._handleMediaError(error);
        }
        else {
            this.hls.destroy();
            console.info('bubbling error up to VIDEOJS');
            this.tech.error = () => error;
            this.tech.trigger('error');
        }
    }
    switchQuality(qualityId) {
        this.hls.nextLevel = qualityId;
    }
    _levelLabel(level) {
        if (this.player.srOptions_.levelLabelHandler) {
            return this.player.srOptions_.levelLabelHandler(level);
        }
        if (level.height)
            return level.height + 'p';
        if (level.width)
            return Math.round(level.width * 9 / 16) + 'p';
        if (level.bitrate)
            return (level.bitrate / 1000) + 'kbps';
        return 0;
    }
    _relayQualityChange(qualityLevels) {
        // Determine if it is "Auto" (all tracks enabled)
        let isAuto = true;
        for (let i = 0; i < qualityLevels.length; i++) {
            if (!qualityLevels[i]._enabled) {
                isAuto = false;
                break;
            }
        }
        // Interact with ME
        if (isAuto) {
            this.hls.currentLevel = -1;
            return;
        }
        // Find ID of highest enabled track
        let selectedTrack;
        for (selectedTrack = qualityLevels.length - 1; selectedTrack >= 0; selectedTrack--) {
            if (qualityLevels[selectedTrack]._enabled) {
                break;
            }
        }
        this.hls.currentLevel = selectedTrack;
    }
    _handleQualityLevels() {
        if (!this.metadata)
            return;
        const qualityLevels = this.player.qualityLevels && this.player.qualityLevels();
        if (!qualityLevels)
            return;
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
    _notifyVideoQualities() {
        if (!this.metadata)
            return;
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
            qualityData: { video: cleanTracklist },
            qualitySwitchCallback: this.switchQuality.bind(this)
        };
        this.tech.trigger('loadedqualitydata', payload);
        // Self-de-register so we don't raise the payload multiple times
        this.videoElement.removeEventListener('playing', this.handlers.playing);
    }
    _updateSelectedAudioTrack() {
        const playerAudioTracks = this.tech.audioTracks();
        for (let j = 0; j < playerAudioTracks.length; j++) {
            // FIXME: typings
            if (playerAudioTracks[j].enabled) {
                this.hls.audioTrack = j;
                break;
            }
        }
    }
    _onAudioTracks() {
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
            }
            // Handle audio track change event
            this.handlers.audioTracksChange = this._updateSelectedAudioTrack.bind(this);
            playerAudioTracks.addEventListener('change', this.handlers.audioTracksChange);
        }
    }
    _getTextTrackLabel(textTrack) {
        // Label here is readable label and is optional (used in the UI so if it is there it should be different)
        return textTrack.label ? textTrack.label : textTrack.language;
    }
    _isSameTextTrack(track1, track2) {
        return this._getTextTrackLabel(track1) === this._getTextTrackLabel(track2)
            && track1.kind === track2.kind;
    }
    _updateSelectedTextTrack() {
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
                hlsjsTracks[k].mode = activeTrack && this._isSameTextTrack(hlsjsTracks[k], activeTrack)
                    ? 'showing'
                    : 'disabled';
            }
        }
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
    _filterDisplayableTextTracks(textTracks) {
        const displayableTracks = [];
        // Filter out tracks that is displayable (captions or subtitles)
        for (let idx = 0; idx < textTracks.length; idx++) {
            if (textTracks[idx].kind === 'subtitles' || textTracks[idx].kind === 'captions') {
                displayableTracks.push(textTracks[idx]);
            }
        }
        return displayableTracks;
    }
    _updateTextTrackList() {
        const displayableTracks = this._filterDisplayableTextTracks(this.videoElement.textTracks);
        const playerTextTracks = this.player.textTracks();
        // Add stubs to make the caption switcher shows up
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
        }
        // Handle UI switching
        this._updateSelectedTextTrack();
        if (!this.uiTextTrackHandled) {
            this.handlers.textTracksChange = this._updateSelectedTextTrack.bind(this);
            playerTextTracks.addEventListener('change', this.handlers.textTracksChange);
            this.uiTextTrackHandled = true;
        }
    }
    _onMetaData(_event, data) {
        // This could arrive before 'loadedqualitydata' handlers is registered, remember it so we can raise it later
        this.metadata = data;
        this._handleQualityLevels();
    }
    _createCueHandler(captionConfig) {
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
                        cue = new VTTCue(startTime, endTime, text.trim());
                        // typeof null === 'object'
                        if (captionConfig != null && typeof captionConfig === 'object') {
                            // Copy client overridden property into the cue object
                            const configKeys = Object.keys(captionConfig);
                            for (let k = 0; k < configKeys.length; k++) {
                                cue[configKeys[k]] = captionConfig[configKeys[k]];
                            }
                        }
                        track.addCue(cue);
                        if (endTime === startTime)
                            track.addCue(new VTTCue(endTime + 5, ''));
                    }
                }
            }
        };
    }
    _initHlsjs() {
        const techOptions = this.tech.options_;
        const srOptions_ = this.player.srOptions_;
        const hlsjsConfigRef = srOptions_ && srOptions_.hlsjsConfig || techOptions.hlsjsConfig;
        // Hls.js will write to the reference thus change the object for later streams
        this.hlsjsConfig = hlsjsConfigRef ? this._oneLevelObjClone(hlsjsConfigRef) : {};
        if (['', 'auto'].includes(this.videoElement.preload) && !this.videoElement.autoplay && this.hlsjsConfig.autoStartLoad === undefined) {
            this.hlsjsConfig.autoStartLoad = false;
        }
        const captionConfig = srOptions_ && srOptions_.captionConfig || techOptions.captionConfig;
        if (captionConfig) {
            this.hlsjsConfig.cueHandler = this._createCueHandler(captionConfig);
        }
        // If the user explicitly sets autoStartLoad to false, we're not going to enter the if block above
        // That's why we have a separate if block here to set the 'play' listener
        if (this.hlsjsConfig.autoStartLoad === false) {
            this.handlers.play = this._startLoad.bind(this);
            this.videoElement.addEventListener('play', this.handlers.play);
        }
        var fmp4Data;
        // _notifyVideoQualities sometimes runs before the quality picker event handler is registered -> no video switcher
        this.handlers.playing = this._notifyVideoQualities.bind(this);
        this.videoElement.addEventListener('playing', this.handlers.playing);
        //this.hlsjsConfig.debug = true
        this.hlsjsConfig.maxBufferHole = 0.5;
        this.hlsjsConfig.maxFragLookUpTolerance = 0;
        this.hlsjsConfig.highBufferWatchdogPeriod = 1;
        this.hlsjsConfig.lowLatencyMode = true;
        //this.hlsjsConfig.backBufferLength = 90
        this.hls = new hls_js__WEBPACK_IMPORTED_MODULE_0___default.a(this.hlsjsConfig);
        this._executeHooksFor('beforeinitialize');
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, (event, data) => this._onError(event, data));
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].AUDIO_TRACKS_UPDATED, () => this._onAudioTracks());
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].MANIFEST_PARSED, (event, data) => this._onMetaData(event, data)); // FIXME: typings
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].LEVEL_LOADED, (event, data) => {
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
        });
        this.hls.once(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_LOADED, () => {
            // Emit custom 'loadedmetadata' event for parity with `videojs-contrib-hls`
            // Ref: https://github.com/videojs/videojs-contrib-hls#loadedmetadata
            this.tech.trigger('loadedmetadata');
        });
        /*this.hls.on(Hlsjs.Events.BUFFER_APPENDING, function (eventName, data) {
    
          console.log('BUFFER_APPENDING', data.type)
    
            //fmp4Data[data.type].push(data.data);
        });
        */
        this.hls.once(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_BUFFERED, (e) => {
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

/***/ "./src/assets/player/p2p-media-loader/p2p-media-loader-plugin.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/p2p-media-loader-plugin.ts ***!
  \***********************************************************************/
/*! exports provided: P2pMediaLoaderPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P2pMediaLoaderPlugin", function() { return P2pMediaLoaderPlugin; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/index.ts");
/* harmony import */ var _core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/p2p-media-loader-master/p2p-media-loader-core/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var _hls_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hls-plugin */ "./src/assets/player/p2p-media-loader/hls-plugin.ts");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_5__);






Object(_hls_plugin__WEBPACK_IMPORTED_MODULE_4__["registerConfigPlugin"])(video_js__WEBPACK_IMPORTED_MODULE_0___default.a);
Object(_hls_plugin__WEBPACK_IMPORTED_MODULE_4__["registerSourceHandler"])(video_js__WEBPACK_IMPORTED_MODULE_0___default.a);
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getPlugin('plugin');
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
        if (!video_js__WEBPACK_IMPORTED_MODULE_0___default.a.Html5Hlsjs) {
            console.warn('HLS.js does not seem to be supported. Try to fallback to built in HLS.');
            if (!player.canPlayType('application/vnd.apple.mpegurl')) {
                const message = 'Cannot fallback to built-in HLS';
                console.warn(message);
                player.ready(() => player.trigger('error', new Error(message)));
                return;
            }
        }
        else {
            // FIXME: typings https://github.com/Microsoft/TypeScript/issues/14080
            video_js__WEBPACK_IMPORTED_MODULE_0___default.a.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjs) => {
                this.hlsjs = hlsjs;
            });
            Object(_core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__["initVideoJsContribHlsJsPlayer"])(player);
        }
        this.startTime = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["timeToInt"])(options.startTime);
        player.src({
            type: options.type,
            src: options.src
        });
        player.ready(() => {
            this.initializeCore();
            if (video_js__WEBPACK_IMPORTED_MODULE_0___default.a.Html5Hlsjs) {
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
        Object(_core_p2p_media_loader_master_p2p_media_loader_hlsjs_lib__WEBPACK_IMPORTED_MODULE_1__["initHlsJsPlayer"])(this.hlsjs);
        // FIXME: typings
        const options = this.player.tech(true).options_;
        this.p2pEngine = options.hlsjsConfig.loader.getEngine();
        this.hlsjs.on(hls_js__WEBPACK_IMPORTED_MODULE_5__["Events"].LEVEL_SWITCHING, (_, data) => {
            this.trigger('resolutionChange', { auto: this.hlsjs.autoLevelEnabled, resolutionId: data.height });
        });
        this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__["Events"].SegmentError, (segment, err) => {
            console.error('Segment error.', segment, err);
            this.options.redundancyUrlManager.removeBySegmentUrl(segment.requestUrl);
        });
        this.statsP2PBytes.numPeers = 1 + this.options.redundancyUrlManager.countBaseUrls();
        this.runStats();
    }
    runStats() {
        this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__["Events"].PieceBytesDownloaded, (method, size) => {
            const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
            elem.pendingDownload.push(size);
            elem.totalDownload += size;
        });
        this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__["Events"].PieceBytesUploaded, (method, size) => {
            const elem = method === 'p2p' ? this.statsP2PBytes : this.statsHTTPBytes;
            elem.pendingUpload.push(size);
            elem.totalUpload += size;
        });
        this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__["Events"].PeerConnect, () => this.statsP2PBytes.numPeers++);
        this.p2pEngine.on(_core_p2p_media_loader_master_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_2__["Events"].PeerClose, () => this.statsP2PBytes.numPeers--);
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
    arraySum(data) {
        return data.reduce((a, b) => a + b, 0);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerPlugin('p2pMediaLoader', P2pMediaLoaderPlugin);



/***/ })

}]);
//# sourceMappingURL=6.chunk.js.map