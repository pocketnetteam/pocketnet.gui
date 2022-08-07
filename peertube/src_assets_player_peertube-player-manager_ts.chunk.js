"use strict";
(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_peertube-player-manager_ts"],{

/***/ "./src/assets/player/shared/videojs-helpers/fn.js":
/*!********************************************************!*\
  !*** ./src/assets/player/shared/videojs-helpers/fn.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UPDATE_REFRESH_INTERVAL": () => (/* binding */ UPDATE_REFRESH_INTERVAL),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "throttle": () => (/* binding */ throttle)
/* harmony export */ });
/* harmony import */ var _guid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guid.js */ "./src/assets/player/shared/videojs-helpers/guid.js");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! global/window */ "./node_modules/global/window.js");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @file fn.js
 * @module fn
 */


const UPDATE_REFRESH_INTERVAL = 30;
/**
 * Bind (a.k.a proxy or context). A simple method for changing the context of
 * a function.
 *
 * It also stores a unique id on the function so it can be easily removed from
 * events.
 *
 * @function
 * @param    {Mixed} context
 *           The object to bind as scope.
 *
 * @param    {Function} fn
 *           The function to be bound to a scope.
 *
 * @param    {number} [uid]
 *           An optional unique ID for the function to be set
 *
 * @return   {Function}
 *           The new function that will be bound into the context given
 */

const bind = function (context, fn, uid) {
  // Make sure the function has a unique ID
  if (!fn.guid) {
    fn.guid = (0,_guid_js__WEBPACK_IMPORTED_MODULE_0__.newGUID)();
  } // Create the new function that changes the context


  const bound = fn.bind(context); // Allow for the ability to individualize this function
  // Needed in the case where multiple objects might share the same prototype
  // IF both items add an event listener with the same function, then you try to remove just one
  // it will remove both because they both have the same guid.
  // when using this, you need to use the bind method when you remove the listener as well.
  // currently used in text tracks

  bound.guid = uid ? uid + '_' + fn.guid : fn.guid;
  return bound;
};
/**
 * Wraps the given function, `fn`, with a new function that only invokes `fn`
 * at most once per every `wait` milliseconds.
 *
 * @function
 * @param    {Function} fn
 *           The function to be throttled.
 *
 * @param    {number}   wait
 *           The number of milliseconds by which to throttle.
 *
 * @return   {Function}
 */

const throttle = function (fn, wait) {
  let last = global_window__WEBPACK_IMPORTED_MODULE_1___default().performance.now();

  const throttled = function () {
    const now = global_window__WEBPACK_IMPORTED_MODULE_1___default().performance.now();

    if (now - last >= wait) {
      fn.apply(void 0, arguments);
      last = now;
    }
  };

  return throttled;
};
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked.
 *
 * Inspired by lodash and underscore implementations.
 *
 * @function
 * @param    {Function} func
 *           The function to wrap with debounce behavior.
 *
 * @param    {number} wait
 *           The number of milliseconds to wait after the last invocation.
 *
 * @param    {boolean} [immediate]
 *           Whether or not to invoke the function immediately upon creation.
 *
 * @param    {Object} [context=window]
 *           The "context" in which the debounced function should debounce. For
 *           example, if this function should be tied to a Video.js player,
 *           the player can be passed here. Alternatively, defaults to the
 *           global `window` object.
 *
 * @return   {Function}
 *           A debounced function.
 */

const debounce = function (func, wait, immediate) {
  let context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (global_window__WEBPACK_IMPORTED_MODULE_1___default());
  let timeout;

  const cancel = () => {
    context.clearTimeout(timeout);
    timeout = null;
  };
  /* eslint-disable consistent-this */


  const debounced = function () {
    const self = this;
    const args = arguments;

    let later = function () {
      timeout = null;
      later = null;

      if (!immediate) {
        func.apply(self, args);
      }
    };

    if (!timeout && immediate) {
      func.apply(self, args);
    }

    context.clearTimeout(timeout);
    timeout = context.setTimeout(later, wait);
  };
  /* eslint-enable consistent-this */


  debounced.cancel = cancel;
  return debounced;
};

/***/ }),

/***/ "./src/assets/player/shared/videojs-helpers/guid.js":
/*!**********************************************************!*\
  !*** ./src/assets/player/shared/videojs-helpers/guid.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGUID": () => (/* binding */ newGUID),
/* harmony export */   "resetGuidInTestsOnly": () => (/* binding */ resetGuidInTestsOnly)
/* harmony export */ });
/**
 * @file guid.js
 * @module guid
 */
// Default value for GUIDs. This allows us to reset the GUID counter in tests.
//
// The initial GUID is 3 because some users have come to rely on the first
// default player ID ending up as `vjs_video_3`.
//
// See: https://github.com/videojs/video.js/pull/6216
const _initialGuid = 3;
/**
 * Unique ID for an element or function
 *
 * @type {Number}
 */

let _guid = _initialGuid;
/**
 * Get a unique auto-incrementing ID by number that has not been returned before.
 *
 * @return {number}
 *         A new unique ID.
 */

function newGUID() {
  return _guid++;
}
/**
 * Reset the unique auto-incrementing ID for testing only.
 */

function resetGuidInTestsOnly() {
  _guid = _initialGuid;
}

/***/ }),

/***/ "./src/assets/player/peertube-player-local-storage.ts":
/*!************************************************************!*\
  !*** ./src/assets/player/peertube-player-local-storage.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanupVideoWatch": () => (/* binding */ cleanupVideoWatch),
/* harmony export */   "getAverageBandwidthInStore": () => (/* binding */ getAverageBandwidthInStore),
/* harmony export */   "getStoredLastSubtitle": () => (/* binding */ getStoredLastSubtitle),
/* harmony export */   "getStoredMute": () => (/* binding */ getStoredMute),
/* harmony export */   "getStoredTheater": () => (/* binding */ getStoredTheater),
/* harmony export */   "getStoredVideoWatchHistory": () => (/* binding */ getStoredVideoWatchHistory),
/* harmony export */   "getStoredVolume": () => (/* binding */ getStoredVolume),
/* harmony export */   "saveAverageBandwidth": () => (/* binding */ saveAverageBandwidth),
/* harmony export */   "saveLastSubtitle": () => (/* binding */ saveLastSubtitle),
/* harmony export */   "saveMuteInStore": () => (/* binding */ saveMuteInStore),
/* harmony export */   "saveTheaterInStore": () => (/* binding */ saveTheaterInStore),
/* harmony export */   "saveVideoWatchHistory": () => (/* binding */ saveVideoWatchHistory),
/* harmony export */   "saveVolumeInStore": () => (/* binding */ saveVolumeInStore)
/* harmony export */ });
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");

function getStoredVolume() {
    const value = getLocalStorage('volume');
    if (value !== null && value !== undefined) {
        const valueNumber = parseFloat(value);
        if (isNaN(valueNumber))
            return undefined;
        return valueNumber;
    }
    return undefined;
}
function getStoredMute() {
    const value = getLocalStorage('mute');
    if (value !== null && value !== undefined)
        return value === 'true';
    return undefined;
}
function getStoredTheater() {
    const value = getLocalStorage('theater-enabled');
    if (value !== null && value !== undefined)
        return value === 'true';
    return false;
}
function saveVolumeInStore(value) {
    return setLocalStorage('volume', value.toString());
}
function saveMuteInStore(value) {
    return setLocalStorage('mute', value.toString());
}
function saveTheaterInStore(enabled) {
    return setLocalStorage('theater-enabled', enabled.toString());
}
function saveAverageBandwidth(value) {
    /** used to choose the most fitting resolution */
    return setLocalStorage('average-bandwidth', value.toString());
}
function getAverageBandwidthInStore() {
    const value = getLocalStorage('average-bandwidth');
    if (value !== null && value !== undefined) {
        const valueNumber = parseInt(value, 10);
        if (isNaN(valueNumber))
            return undefined;
        return valueNumber;
    }
    return undefined;
}
function saveLastSubtitle(language) {
    return setLocalStorage('last-subtitle', language);
}
function getStoredLastSubtitle() {
    return getLocalStorage('last-subtitle');
}
function saveVideoWatchHistory(videoUUID, duration) {
    return setLocalStorage(`video-watch-history`, JSON.stringify(Object.assign(Object.assign({}, getStoredVideoWatchHistory()), { [videoUUID]: {
            duration,
            date: `${(new Date()).toISOString()}`
        } })));
}
function getStoredVideoWatchHistory(videoUUID) {
    let data;
    try {
        const value = getLocalStorage('video-watch-history');
        if (!value)
            return {};
        data = JSON.parse(value);
    }
    catch (error) {
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__.logger.error('Cannot parse video watch history from local storage/', error);
    }
    data = data || {};
    if (videoUUID)
        return data[videoUUID];
    return data;
}
function cleanupVideoWatch() {
    const data = getStoredVideoWatchHistory();
    if (!data)
        return;
    const newData = Object.keys(data).reduce((acc, videoUUID) => {
        const date = Date.parse(data[videoUUID].date);
        const diff = Math.ceil(((new Date()).getTime() - date) / (1000 * 3600 * 24));
        if (diff > 30)
            return acc;
        return Object.assign(Object.assign({}, acc), { [videoUUID]: data[videoUUID] });
    }, {});
    setLocalStorage('video-watch-history', JSON.stringify(newData));
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
const KEY_PREFIX = 'peertube-videojs-';
function getLocalStorage(key) {
    try {
        return localStorage.getItem(KEY_PREFIX + key);
    }
    catch (_a) {
        return undefined;
    }
}
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(KEY_PREFIX + key, value);
    }
    catch ( /* empty */_a) { /* empty */
    }
}


/***/ }),

/***/ "./src/assets/player/peertube-player-manager.ts":
/*!******************************************************!*\
  !*** ./src/assets/player/peertube-player-manager.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeertubePlayerManager": () => (/* binding */ PeertubePlayerManager),
/* harmony export */   "videojs": () => (/* reexport default from dynamic */ video_js__WEBPACK_IMPORTED_MODULE_24___default.a)
/* harmony export */ });
/* harmony import */ var _peertube_videojs_contextmenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @peertube/videojs-contextmenu */ "./node_modules/@peertube/videojs-contextmenu/dist/videojs-contextmenu.es.js");
/* harmony import */ var _shared_upnext_end_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/upnext/end-card */ "./src/assets/player/shared/upnext/end-card.ts");
/* harmony import */ var _shared_upnext_upnext_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/upnext/upnext-plugin */ "./src/assets/player/shared/upnext/upnext-plugin.ts");
/* harmony import */ var _shared_stats_stats_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/stats/stats-card */ "./src/assets/player/shared/stats/stats-card.ts");
/* harmony import */ var _shared_stats_stats_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/stats/stats-plugin */ "./src/assets/player/shared/stats/stats-plugin.ts");
/* harmony import */ var _shared_bezels_bezels_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/bezels/bezels-plugin */ "./src/assets/player/shared/bezels/bezels-plugin.ts");
/* harmony import */ var _shared_peertube_peertube_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/peertube/peertube-plugin */ "./src/assets/player/shared/peertube/peertube-plugin.ts");
/* harmony import */ var _shared_resolutions_peertube_resolutions_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/resolutions/peertube-resolutions-plugin */ "./src/assets/player/shared/resolutions/peertube-resolutions-plugin.ts");
/* harmony import */ var _shared_control_bar_next_previous_video_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/control-bar/next-previous-video-button */ "./src/assets/player/shared/control-bar/next-previous-video-button.ts");
/* harmony import */ var _shared_control_bar_p2p_info_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/control-bar/p2p-info-button */ "./src/assets/player/shared/control-bar/p2p-info-button.ts");
/* harmony import */ var _shared_control_bar_picture_in_picture_bastyon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/control-bar/picture-in-picture-bastyon */ "./src/assets/player/shared/control-bar/picture-in-picture-bastyon.ts");
/* harmony import */ var _shared_control_bar_peertube_load_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/control-bar/peertube-load-progress-bar */ "./src/assets/player/shared/control-bar/peertube-load-progress-bar.ts");
/* harmony import */ var _shared_control_bar_theater_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared/control-bar/theater-button */ "./src/assets/player/shared/control-bar/theater-button.ts");
/* harmony import */ var _shared_settings_resolution_menu_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/settings/resolution-menu-button */ "./src/assets/player/shared/settings/resolution-menu-button.ts");
/* harmony import */ var _shared_settings_resolution_menu_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/settings/resolution-menu-item */ "./src/assets/player/shared/settings/resolution-menu-item.ts");
/* harmony import */ var _shared_settings_settings_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/settings/settings-dialog */ "./src/assets/player/shared/settings/settings-dialog.ts");
/* harmony import */ var _shared_settings_settings_menu_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/settings/settings-menu-button */ "./src/assets/player/shared/settings/settings-menu-button.ts");
/* harmony import */ var _shared_settings_settings_menu_item__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/settings/settings-menu-item */ "./src/assets/player/shared/settings/settings-menu-item.ts");
/* harmony import */ var _shared_settings_settings_panel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./shared/settings/settings-panel */ "./src/assets/player/shared/settings/settings-panel.ts");
/* harmony import */ var _shared_settings_settings_panel_child__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shared/settings/settings-panel-child */ "./src/assets/player/shared/settings/settings-panel-child.ts");
/* harmony import */ var _shared_playlist_playlist_plugin__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./shared/playlist/playlist-plugin */ "./src/assets/player/shared/playlist/playlist-plugin.ts");
/* harmony import */ var _shared_mobile_peertube_mobile_plugin__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shared/mobile/peertube-mobile-plugin */ "./src/assets/player/shared/mobile/peertube-mobile-plugin.ts");
/* harmony import */ var _shared_mobile_peertube_mobile_buttons__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./shared/mobile/peertube-mobile-buttons */ "./src/assets/player/shared/mobile/peertube-mobile-buttons.ts");
/* harmony import */ var _shared_hotkeys_peertube_hotkeys_plugin__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shared/hotkeys/peertube-hotkeys-plugin */ "./src/assets/player/shared/hotkeys/peertube-hotkeys-plugin.ts");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @root-helpers/web-browser */ "./src/root-helpers/web-browser.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");
/* harmony import */ var _shared_manager_options__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./shared/manager-options */ "./src/assets/player/shared/manager-options/index.ts");










//import './shared/control-bar/peertube-link-button'



















const Fn = __webpack_require__(/*! ./shared/videojs-helpers/fn.js */ "./src/assets/player/shared/videojs-helpers/fn.js");
const Slider = video_js__WEBPACK_IMPORTED_MODULE_24___default().getComponent('Slider');
const SeekBar = video_js__WEBPACK_IMPORTED_MODULE_24___default().getComponent('SeekBar');
Slider.prototype.update = function () {
    // In VolumeBar init we have a setTimeout for update that pops and update
    // to the end of the execution stack. The player is destroyed before then
    // update will cause an error
    // If there's no bar...
    if (!this.el_ || !this.bar) {
        return;
    }
    // clamp progress between 0 and 1
    // and only round to four decimal places, as we round to two below
    const progress = this.getProgress();
    if (progress === this.progress_) {
        return progress;
    }
    this.progress_ = progress;
    // Set the new bar width or height
    var el = this.bar.el();
    if (!this.vertical()) {
        //el.style['transform-origin'] = 'left'
        el.style['transform'] = 'scaleX(' + (progress).toFixed(2) + ')';
    }
    else {
        el.style['transform-origin'] = 'bottom';
        el.style['transform'] = 'scaleY(' + (progress).toFixed(2) + ')';
    }
    return progress;
};
SeekBar.prototype.getPercent = function getPercent() {
    const time = this.player_.currentTime();
    const percent = time / this.player_.duration();
    return percent >= 1 ? 1 : percent;
};
SeekBar.prototype.setEventHandlers_ = function () {
    this.update_ = Fn.bind(this, this.update);
    this.update = Fn.throttle(this.update_, Fn.UPDATE_REFRESH_INTERVAL);
    this.on(this.player_, ['ended', 'durationchange', 'timeupdate'], this.update);
    if (this.player_.liveTracker) {
        this.on(this.player_.liveTracker, 'liveedgechange', this.update);
    }
    // when playing, let's ensure we smoothly update the play progress bar
    // via an interval
    this.updateInterval = null;
    this.enableIntervalHandler_ = (e) => this.enableInterval_(e);
    this.disableIntervalHandler_ = (e) => this.disableInterval_(e);
    this.on(this.player_, ['playing'], this.enableIntervalHandler_);
    this.on(this.player_, ['ended', 'pause', 'waiting'], this.disableIntervalHandler_);
    // we don't need to update the play progress if the document is hidden,
    // also, this causes the CPU to spike and eventually crash the page on IE11.
    if ('hidden' in document && 'visibilityState' in document) {
        this.on(document, 'visibilitychange', this.toggleVisibility_);
    }
};
SeekBar.prototype.enableInterval_ = function () {
    if (this.updateInterval) {
        return;
    }
    this.updateInterval = this.setInterval(this.update, Fn.UPDATE_REFRESH_INTERVAL);
};
SeekBar.prototype.update = function (event) {
    // ignore updates while the tab is hidden
    if (document.visibilityState === 'hidden') {
        return;
    }
    const percent = this.getPercent();
    /*const currentTime = this.player_.ended() ?
    
    this.player_.duration() : this.getCurrentTime_();

    const liveTracker = this.player_.liveTracker;

    let duration = this.player_.duration();

    if (liveTracker && liveTracker.isLive()) {
      duration = this.player_.liveTracker.liveCurrentTime();
    }

    if (this.percent_ !== percent) {
      // machine readable value of progress bar (percentage complete)
      //this.el_.setAttribute('aria-valuenow', (percent * 100).toFixed(2));
      this.percent_ = percent;
    }

    if (this.currentTime_ !== currentTime || this.duration_ !== duration) {
      // human readable value of progress bar (time complete)

      this.currentTime_ = currentTime;
      this.duration_ = duration;
    }*/
    var el = this.bar.el();
    el.style['transform-origin'] = 'left';
    el.style['transform'] = 'scaleX(' + (percent).toFixed(2) + ')';
    return percent;
};
SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
    let newTime = this.calculateDistance(event) * this.player_.duration();
    if (newTime === this.player_.duration()) {
        newTime = newTime - 0.1;
    }
    this.player_.currentTime(newTime);
    this.update();
};
// Change 'Playback Rate' to 'Speed' (smaller for our settings menu)
//(videojs.getComponent('PlaybackRateMenuButton') as any).prototype.controlText_ = 'Speed'
const CaptionsButton = video_js__WEBPACK_IMPORTED_MODULE_24___default().getComponent('CaptionsButton');
// Change Captions to Subtitles/CC
CaptionsButton.prototype.controlText_ = 'Subtitles/CC';
// We just want to display 'Off' instead of 'captions off', keep a space so the variable == true (hacky I know)
CaptionsButton.prototype.label_ = ' ';
class PeertubePlayerManager {
    static initState() {
        this.alreadyPlayed = false;
    }
    static async initialize(mode, options, onPlayerChange) {
        //this.pluginsManager = options.pluginsManager
        this.onPlayerChange = onPlayerChange;
        this.playerElementClassName = options.common.playerElement.className;
        if (mode === 'webtorrent')
            await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_bittorrent-tracker_client_js"), __webpack_require__.e("vendors-node_modules_https-browserify_index_js-node_modules_stream-browserify_index_js-node_m-974c59"), __webpack_require__.e("src_assets_player_shared_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-e92bbe")]).then(__webpack_require__.bind(__webpack_require__, /*! ./shared/webtorrent/webtorrent-plugin */ "./src/assets/player/shared/webtorrent/webtorrent-plugin.ts"));
        if (mode === 'p2p-media-loader') {
            const [p2pMediaLoaderModule] = await Promise.all([
                Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_bittorrent-tracker_client_js"), __webpack_require__.e("vendors-node_modules_peertube_p2p-media-loader-hlsjs_dist_index_js"), __webpack_require__.e("_2d84-_5a06-_ed7a-_5c78-_ed1b-_d17e-_c33b")]).then(__webpack_require__.t.bind(__webpack_require__, /*! @peertube/p2p-media-loader-hlsjs */ "./node_modules/@peertube/p2p-media-loader-hlsjs/dist/index.js", 23)),
                Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_bittorrent-tracker_client_js"), __webpack_require__.e("vendors-node_modules_peertube_p2p-media-loader-hlsjs_dist_index_js"), __webpack_require__.e("vendors-node_modules_hls_js_dist_hls_light_js"), __webpack_require__.e("src_assets_player_shared_p2p-media-loader_p2p-media-loader-plugin_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./shared/p2p-media-loader/p2p-media-loader-plugin */ "./src/assets/player/shared/p2p-media-loader/p2p-media-loader-plugin.ts"))
            ]);
            this.p2pMediaLoaderModule = p2pMediaLoaderModule;
        }
        //await TranslationsManager.loadLocaleInVideoJS(options.common.serverUrl, options.common.language, videojs)
        return this.buildPlayer(mode, options);
    }
    static async buildPlayer(mode, options) {
        const videojsOptionsBuilder = new _shared_manager_options__WEBPACK_IMPORTED_MODULE_28__.ManagerOptionsBuilder(mode, options, this.p2pMediaLoaderModule);
        const videojsOptions = videojsOptionsBuilder.getVideojsOptions(this.alreadyPlayed);
        /*const videojsOptions = await this.pluginsManager.runHook(
          'filter:internal.player.videojs.options.result',
          videojsOptionsBuilder.getVideojsOptions(this.alreadyPlayed)
        )*/
        const self = this;
        return new Promise(res => {
            video_js__WEBPACK_IMPORTED_MODULE_24___default()(options.common.playerElement, videojsOptions, function () {
                const player = this;
                let alreadyFallback = false;
                const handleError = () => {
                    if (alreadyFallback)
                        return;
                    alreadyFallback = true;
                    if (mode === 'p2p-media-loader') {
                        self.tryToRecoverHLSError(player.error(), player, options);
                    }
                    else {
                        /// remove torrent /// self.maybeFallbackToWebTorrent(mode, player, options)
                    }
                };
                player.one('error', () => handleError());
                player.one('play', () => {
                    self.alreadyPlayed = true;
                });
                self.addContextMenu(videojsOptionsBuilder, player, options.common);
                if ((0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_26__.isMobile)() || options.mobile)
                    player.peertubeMobile();
                if (options.common.enableHotkeys === true)
                    player.peerTubeHotkeysPlugin();
                if (options.common.controlBar === false)
                    player.controlBar.addClass('control-bar-hidden');
                player.bezels();
                player.stats({
                    videoUUID: options.common.videoUUID,
                    videoIsLive: options.common.isLive,
                    mode,
                    p2pEnabled: options.common.p2pEnabled
                });
                player.on('p2pInfo', (_, data) => {
                    if (data.source !== 'p2p-media-loader' || isNaN(data.bandwidthEstimate))
                        return;
                    (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_27__.saveAverageBandwidth)(data.bandwidthEstimate);
                });
                return res(player);
            });
        });
    }
    static async tryToRecoverHLSError(err, currentPlayer, options) {
        if (err.code === 3) { // Decode error
            // Display a notification to user
            if (this.videojsDecodeErrors === 0) {
                options.common.errorNotifier(currentPlayer.localize('The video failed to play, will try to fast forward.'));
            }
            if (this.videojsDecodeErrors === 20) {
                this.maybeFallbackToWebTorrent('p2p-media-loader', currentPlayer, options);
                return;
            }
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_25__.logger.info('Fast forwarding HLS to recover from an error.');
            this.videojsDecodeErrors++;
            options.common.startTime = currentPlayer.currentTime() + 2;
            options.common.autoplay = true;
            this.rebuildAndUpdateVideoElement(currentPlayer, options.common);
            const newPlayer = await this.buildPlayer('p2p-media-loader', options);
            this.onPlayerChange(newPlayer);
        }
        else {
            this.maybeFallbackToWebTorrent('p2p-media-loader', currentPlayer, options);
        }
    }
    static async maybeFallbackToWebTorrent(currentMode, currentPlayer, options) {
        if (options.webtorrent.videoFiles.length === 0 || currentMode === 'webtorrent') {
            currentPlayer.peertube().displayFatalError();
            return;
        }
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_25__.logger.info('Fallback to webtorrent.');
        this.rebuildAndUpdateVideoElement(currentPlayer, options.common);
        await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_bittorrent-tracker_client_js"), __webpack_require__.e("vendors-node_modules_https-browserify_index_js-node_modules_stream-browserify_index_js-node_m-974c59"), __webpack_require__.e("src_assets_player_shared_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-e92bbe")]).then(__webpack_require__.bind(__webpack_require__, /*! ./shared/webtorrent/webtorrent-plugin */ "./src/assets/player/shared/webtorrent/webtorrent-plugin.ts"));
        const newPlayer = await this.buildPlayer('webtorrent', options);
        this.onPlayerChange(newPlayer);
    }
    static rebuildAndUpdateVideoElement(player, commonOptions) {
        const newVideoElement = document.createElement('video');
        newVideoElement.className = this.playerElementClassName;
        // VideoJS wraps our video element inside a div
        let currentParentPlayerElement = commonOptions.playerElement.parentNode;
        // Fix on IOS, don't ask me why
        if (!currentParentPlayerElement)
            currentParentPlayerElement = document.getElementById(commonOptions.playerElement.id).parentNode;
        currentParentPlayerElement.parentNode.insertBefore(newVideoElement, currentParentPlayerElement);
        commonOptions.playerElement = newVideoElement;
        commonOptions.onPlayerElementChange(newVideoElement);
        player.dispose();
        return newVideoElement;
    }
    static addContextMenu(optionsBuilder, player, commonOptions) {
        const options = optionsBuilder.getContextMenuOptions(player, commonOptions);
        player.contextmenuUI(options);
    }
}
PeertubePlayerManager.alreadyPlayed = false;
//private static pluginsManager: PluginsManager
PeertubePlayerManager.videojsDecodeErrors = 0;
// ############################################################################



/***/ }),

/***/ "./src/assets/player/shared/bezels/bezels-plugin.ts":
/*!**********************************************************!*\
  !*** ./src/assets/player/shared/bezels/bezels-plugin.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BezelsPlugin": () => (/* binding */ BezelsPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pause_bezel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pause-bezel */ "./src/assets/player/shared/bezels/pause-bezel.ts");


const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class BezelsPlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.player.ready(() => {
            player.addClass('vjs-bezels');
        });
        player.addChild('PauseBezel', options);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('bezels', BezelsPlugin);



/***/ }),

/***/ "./src/assets/player/shared/bezels/pause-bezel.ts":
/*!********************************************************!*\
  !*** ./src/assets/player/shared/bezels/pause-bezel.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/web-browser */ "./src/root-helpers/web-browser.ts");


function getPauseBezel() {
    return `
  <div class="vjs-bezels-pause">
    <div class="vjs-bezel" role="status" aria-label="Pause">
      <div class="vjs-bezel-icon">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <use class="vjs-svg-shadow" xlink:href="#vjs-id-1"></use>
          <path class="vjs-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="vjs-id-1"></path>
        </svg>
      </div>
    </div>
  </div>
  `;
}
function getPlayBezel() {
    return `
  <div class="vjs-bezels-play">
    <div class="vjs-bezel" role="status" aria-label="Play">
      <div class="vjs-bezel-icon">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <use class="vjs-svg-shadow" xlink:href="#vjs-id-2"></use>
          <path class="vjs-svg-fill" d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" id="ytp-id-2"></path>
        </svg>
      </div>
    </div>
  </div>
  `;
}
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PauseBezel extends Component {
    constructor(player, options) {
        super(player, options);
        // Hide bezels on mobile since we already have our mobile overlay
        if ((0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_1__.isMobile)())
            return;
        player.on('pause', (_) => {
            if (player.seeking() || player.ended())
                return;
            this.container.innerHTML = getPauseBezel();
            this.showBezel();
        });
        player.on('play', (_) => {
            if (player.seeking())
                return;
            this.container.innerHTML = getPlayBezel();
            this.showBezel();
        });
    }
    createEl() {
        this.container = super.createEl('div', {
            className: 'vjs-bezels-content'
        });
        this.container.style.display = 'none';
        return this.container;
    }
    showBezel() {
        this.container.style.display = 'inherit';
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 500); // matching the animation duration
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('PauseBezel', PauseBezel);


/***/ }),

/***/ "./src/assets/player/shared/common/index.ts":
/*!**************************************************!*\
  !*** ./src/assets/player/shared/common/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bytes": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.bytes),
/* harmony export */   "getRtcConfig": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.getRtcConfig),
/* harmony export */   "toTitleCase": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.toTitleCase),
/* harmony export */   "videoFileMaxByResolution": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.videoFileMaxByResolution),
/* harmony export */   "videoFileMinByResolution": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.videoFileMinByResolution)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/assets/player/shared/common/utils.ts");



/***/ }),

/***/ "./src/assets/player/shared/common/utils.ts":
/*!**************************************************!*\
  !*** ./src/assets/player/shared/common/utils.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bytes": () => (/* binding */ bytes),
/* harmony export */   "getRtcConfig": () => (/* binding */ getRtcConfig),
/* harmony export */   "toTitleCase": () => (/* binding */ toTitleCase),
/* harmony export */   "videoFileMaxByResolution": () => (/* binding */ videoFileMaxByResolution),
/* harmony export */   "videoFileMinByResolution": () => (/* binding */ videoFileMinByResolution)
/* harmony export */ });
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const dictionaryBytes = [
    { max: 1024, type: 'B', decimals: 0 },
    { max: 1048576, type: 'KB', decimals: 0 },
    { max: 1073741824, type: 'MB', decimals: 0 },
    { max: 1.0995116e12, type: 'GB', decimals: 1 }
];
function bytes(value) {
    const format = dictionaryBytes.find(d => value < d.max) || dictionaryBytes[dictionaryBytes.length - 1];
    const calc = (value / (format.max / 1024)).toFixed(format.decimals);
    return [calc, format.type];
}
function videoFileMaxByResolution(files) {
    let max = files[0];
    for (let i = 1; i < files.length; i++) {
        const file = files[i];
        if (max.resolution.id < file.resolution.id)
            max = file;
    }
    return max;
}
function videoFileMinByResolution(files) {
    let min = files[0];
    for (let i = 1; i < files.length; i++) {
        const file = files[i];
        if (min.resolution.id > file.resolution.id)
            min = file;
    }
    return min;
}
function getRtcConfig() {
    return {
        iceServers: [
            {
                urls: 'stun:stun.stunprotocol.org'
            },
            {
                urls: 'stun:stun.framasoft.org'
            }
        ]
    };
}
// ---------------------------------------------------------------------------



/***/ }),

/***/ "./src/assets/player/shared/control-bar/next-previous-video-button.ts":
/*!****************************************************************************!*\
  !*** ./src/assets/player/shared/control-bar/next-previous-video-button.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Button');
class NextPreviousVideoButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.nextPreviousVideoButtonOptions = options;
        this.update();
    }
    createEl() {
        const type = this.options_.type;
        const button = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
            className: 'vjs-' + type + '-video'
        });
        const nextIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'icon icon-' + type
        });
        button.appendChild(nextIcon);
        if (type === 'next') {
            button.title = this.player_.localize('Next video');
        }
        else {
            button.title = this.player_.localize('Previous video');
        }
        return button;
    }
    handleClick() {
        this.nextPreviousVideoButtonOptions.handler();
    }
    update() {
        const disabled = this.nextPreviousVideoButtonOptions.isDisabled();
        if (disabled)
            this.addClass('vjs-disabled');
        else
            this.removeClass('vjs-disabled');
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('NextVideoButton', NextPreviousVideoButton);
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('PreviousVideoButton', NextPreviousVideoButton);


/***/ }),

/***/ "./src/assets/player/shared/control-bar/p2p-info-button.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/shared/control-bar/p2p-info-button.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");


const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Button');
class P2pInfoButton extends Button {
    constructor(player, options) {
        super(player, options);
    }
    createEl() {
        const div = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-peertube'
        });
        const subDivWebtorrent = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-peertube-hidden' // Hide the stats before we get the info
        });
        div.appendChild(subDivWebtorrent);
        // Stop here if P2P is not enabled
        const p2pEnabled = this.options_.p2pEnabled;
        if (!p2pEnabled)
            return div;
        const downloadIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'icon icon-download'
        });
        subDivWebtorrent.appendChild(downloadIcon);
        const downloadSpeedText = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'download-speed-text'
        });
        const downloadSpeedNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'download-speed-number'
        });
        const downloadSpeedUnit = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span');
        downloadSpeedText.appendChild(downloadSpeedNumber);
        downloadSpeedText.appendChild(downloadSpeedUnit);
        subDivWebtorrent.appendChild(downloadSpeedText);
        const uploadIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'icon icon-upload'
        });
        subDivWebtorrent.appendChild(uploadIcon);
        const uploadSpeedText = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'upload-speed-text'
        });
        const uploadSpeedNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'upload-speed-number'
        });
        const uploadSpeedUnit = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span');
        uploadSpeedText.appendChild(uploadSpeedNumber);
        uploadSpeedText.appendChild(uploadSpeedUnit);
        subDivWebtorrent.appendChild(uploadSpeedText);
        const peersText = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'peers-text'
        });
        const peersNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'peers-number'
        });
        subDivWebtorrent.appendChild(peersNumber);
        subDivWebtorrent.appendChild(peersText);
        const subDivHttp = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-peertube-hidden'
        });
        const subDivHttpText = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
            className: 'http-fallback',
            textContent: 'HTTP'
        });
        subDivHttp.appendChild(subDivHttpText);
        div.appendChild(subDivHttp);
        this.player_.on('p2pInfo', (event, data) => {
            // We are in HTTP fallback
            if (!data) {
                subDivHttp.className = 'vjs-peertube-displayed';
                subDivWebtorrent.className = 'vjs-peertube-hidden';
                return;
            }
            const p2pStats = data.p2p;
            const httpStats = data.http;
            const downloadSpeed = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(p2pStats.downloadSpeed + httpStats.downloadSpeed);
            const uploadSpeed = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(p2pStats.uploadSpeed + httpStats.uploadSpeed);
            const totalDownloaded = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(p2pStats.downloaded + httpStats.downloaded);
            const totalUploaded = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(p2pStats.uploaded + httpStats.uploaded);
            const numPeers = p2pStats.numPeers;
            subDivWebtorrent.title = this.player().localize('Total downloaded: ') + totalDownloaded.join(' ') + '\n';
            if (data.source === 'p2p-media-loader') {
                const downloadedFromServer = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(httpStats.downloaded).join(' ');
                const downloadedFromPeers = (0,_common__WEBPACK_IMPORTED_MODULE_1__.bytes)(p2pStats.downloaded).join(' ');
                subDivWebtorrent.title +=
                    ' * ' + this.player().localize('From servers: ') + downloadedFromServer + '\n' +
                        ' * ' + this.player().localize('From peers: ') + downloadedFromPeers + '\n';
            }
            subDivWebtorrent.title += this.player().localize('Total uploaded: ') + totalUploaded.join(' ');
            downloadSpeedNumber.textContent = downloadSpeed[0];
            downloadSpeedUnit.textContent = ' ' + downloadSpeed[1];
            uploadSpeedNumber.textContent = uploadSpeed[0];
            uploadSpeedUnit.textContent = ' ' + uploadSpeed[1];
            peersNumber.textContent = numPeers.toString();
            peersText.textContent = ' ' + (numPeers > 1 ? this.player().localize('peers') : this.player_.localize('peer'));
            subDivHttp.className = 'vjs-peertube-hidden';
            subDivWebtorrent.className = 'vjs-peertube-displayed';
        });
        return div;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('P2PInfoButton', P2pInfoButton);


/***/ }),

/***/ "./src/assets/player/shared/control-bar/peertube-load-progress-bar.ts":
/*!****************************************************************************!*\
  !*** ./src/assets/player/shared/control-bar/peertube-load-progress-bar.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PeerTubeLoadProgressBar extends Component {
    constructor(player, options) {
        super(player, options);
        this.on(player, 'progress', this.update);
    }
    createEl() {
        return super.createEl('div', {
            className: 'vjs-load-progress',
            innerHTML: `<span class="vjs-control-text"><span>${this.localize('Loaded')}</span>: 0%</span>`
        });
    }
    dispose() {
        super.dispose();
    }
    update() {
        const torrent = this.player().webtorrent().getTorrent();
        if (!torrent)
            return;
        // @ts-ignore
        this.el().style['transform-origin'] = 'left'(this.el()).style['transform'] = 'scaleX(' + (torrent.progress).toFixed(2) + ')';
        //(this.el() as HTMLElement).style.width = (torrent.progress * 100) + '%'
    }
}
Component.registerComponent('PeerTubeLoadProgressBar', PeerTubeLoadProgressBar);


/***/ }),

/***/ "./src/assets/player/shared/control-bar/picture-in-picture-bastyon.ts":
/*!****************************************************************************!*\
  !*** ./src/assets/player/shared/control-bar/picture-in-picture-bastyon.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @file picture-in-picture-toggle.js
 */
/*import Button from '../button.js';
import Component from '../component.js';
import document from 'global/document';*/

const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent("Button");
const MenuButton = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent("MenuButton");
/**
 * Toggle Picture-in-Picture mode
 *
 * @extends Button
 */
class PictureInPictureBastyon extends MenuButton {
    constructor(player, options) {
        super(player, options);
        this.controlText('Mini Player');
    }
    createEl() {
        return this.buildElement();
    }
    handleClick(event) {
        console.log("PICRE");
        this.player_.trigger('pictureInPictureRequest', event);
    }
    buildElement() {
        const el = super.createEl();
        el.classList.add("vjs-picture-in-picture-control");
        return el;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent("PictureInPictureBastyon", PictureInPictureBastyon);


/***/ }),

/***/ "./src/assets/player/shared/control-bar/theater-button.ts":
/*!****************************************************************!*\
  !*** ./src/assets/player/shared/control-bar/theater-button.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");


const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Button');
class TheaterButton extends Button {
    constructor(player, options) {
        super(player, options);
        const enabled = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__.getStoredTheater)();
        if (enabled === true) {
            this.player().addClass(TheaterButton.THEATER_MODE_CLASS);
            this.handleTheaterChange();
        }
        this.controlText('Theater mode');
        this.player().theaterEnabled = enabled;
    }
    buildCSSClass() {
        return `vjs-theater-control ${super.buildCSSClass()}`;
    }
    handleTheaterChange() {
        const theaterEnabled = this.isTheaterEnabled();
        if (theaterEnabled) {
            this.controlText('Normal mode');
        }
        else {
            this.controlText('Theater mode');
        }
        (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__.saveTheaterInStore)(theaterEnabled);
        this.player_.trigger('theaterChange', theaterEnabled);
    }
    handleClick() {
        this.player_.toggleClass(TheaterButton.THEATER_MODE_CLASS);
        this.handleTheaterChange();
    }
    isTheaterEnabled() {
        return this.player_.hasClass(TheaterButton.THEATER_MODE_CLASS);
    }
}
TheaterButton.THEATER_MODE_CLASS = 'vjs-theater-enabled';
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('TheaterButton', TheaterButton);


/***/ }),

/***/ "./src/assets/player/shared/hotkeys/peertube-hotkeys-plugin.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/player/shared/hotkeys/peertube-hotkeys-plugin.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerTubeHotkeysPlugin": () => (/* binding */ PeerTubeHotkeysPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class PeerTubeHotkeysPlugin extends Plugin {
    constructor(player, options) {
        super(player, options);
        this.handlers = this.buildHandlers();
        this.handleKeyFunction = (event) => this.onKeyDown(event);
        document.addEventListener('keydown', this.handleKeyFunction);
    }
    dispose() {
        document.removeEventListener('keydown', this.handleKeyFunction);
    }
    onKeyDown(event) {
        if (!this.isValidKeyTarget(event.target))
            return;
        for (const handler of this.handlers) {
            if (handler.accept(event)) {
                handler.cb(event);
                return;
            }
        }
    }
    buildHandlers() {
        const handlers = [
            // Play
            {
                accept: e => (e.key === ' ' || e.key === 'MediaPlayPause'),
                cb: e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.player.paused())
                        this.player.play();
                    else
                        this.player.pause();
                }
            },
            // Increase volume
            {
                accept: e => this.isNaked(e, 'ArrowUp'),
                cb: e => {
                    e.preventDefault();
                    this.player.volume(this.player.volume() + PeerTubeHotkeysPlugin.VOLUME_STEP);
                }
            },
            // Decrease volume
            {
                accept: e => this.isNaked(e, 'ArrowDown'),
                cb: e => {
                    e.preventDefault();
                    this.player.volume(this.player.volume() - PeerTubeHotkeysPlugin.VOLUME_STEP);
                }
            },
            // Rewind
            {
                accept: e => this.isNaked(e, 'ArrowLeft') || this.isNaked(e, 'MediaRewind'),
                cb: e => {
                    e.preventDefault();
                    const target = Math.max(0, this.player.currentTime() - PeerTubeHotkeysPlugin.SEEK_STEP);
                    this.player.currentTime(target);
                }
            },
            // Forward
            {
                accept: e => this.isNaked(e, 'ArrowRight') || this.isNaked(e, 'MediaForward'),
                cb: e => {
                    e.preventDefault();
                    const target = Math.min(this.player.duration(), this.player.currentTime() + PeerTubeHotkeysPlugin.SEEK_STEP);
                    this.player.currentTime(target);
                }
            },
            // Fullscreen
            {
                // f key or Ctrl + Enter
                accept: e => this.isNaked(e, 'f') || (!e.altKey && e.ctrlKey && e.key === 'Enter'),
                cb: e => {
                    e.preventDefault();
                    if (this.player.isFullscreen())
                        this.player.exitFullscreen();
                    else
                        this.player.requestFullscreen();
                }
            },
            // Mute
            {
                accept: e => this.isNaked(e, 'm'),
                cb: e => {
                    e.preventDefault();
                    this.player.muted(!this.player.muted());
                }
            },
            // Increase playback rate
            {
                accept: e => e.key === '>',
                cb: () => {
                    const target = Math.min(this.player.playbackRate() + 0.1, 5);
                    this.player.playbackRate(parseFloat(target.toFixed(2)));
                }
            },
            // Decrease playback rate
            {
                accept: e => e.key === '<',
                cb: () => {
                    const target = Math.max(this.player.playbackRate() - 0.1, 0.10);
                    this.player.playbackRate(parseFloat(target.toFixed(2)));
                }
            },
            // Previous frame
            {
                accept: e => e.key === ',',
                cb: () => {
                    this.player.pause();
                    // Calculate movement distance (assuming 30 fps)
                    const dist = 1 / 30;
                    this.player.currentTime(this.player.currentTime() - dist);
                }
            },
            // Next frame
            {
                accept: e => e.key === '.',
                cb: () => {
                    this.player.pause();
                    // Calculate movement distance (assuming 30 fps)
                    const dist = 1 / 30;
                    this.player.currentTime(this.player.currentTime() + dist);
                }
            }
        ];
        // 0-9 key handlers
        for (let i = 0; i < 10; i++) {
            handlers.push({
                accept: e => e.key === i + '' && !e.ctrlKey,
                cb: e => {
                    e.preventDefault();
                    this.player.currentTime(this.player.duration() * i * 0.1);
                }
            });
        }
        return handlers;
    }
    isValidKeyTarget(eventEl) {
        const playerEl = this.player.el();
        const activeEl = document.activeElement;
        const currentElTagName = eventEl.tagName.toLowerCase();
        return (activeEl === playerEl ||
            activeEl === playerEl.querySelector('.vjs-tech') ||
            activeEl === playerEl.querySelector('.vjs-control-bar') ||
            eventEl.id === 'content' ||
            currentElTagName === 'body' ||
            currentElTagName === 'video');
    }
    isNaked(event, key) {
        return (!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && event.key === key);
    }
}
PeerTubeHotkeysPlugin.VOLUME_STEP = 0.1;
PeerTubeHotkeysPlugin.SEEK_STEP = 5;
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('peerTubeHotkeysPlugin', PeerTubeHotkeysPlugin);



/***/ }),

/***/ "./src/assets/player/shared/manager-options/control-bar-options-builder.ts":
/*!*********************************************************************************!*\
  !*** ./src/assets/player/shared/manager-options/control-bar-options-builder.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlBarOptionsBuilder": () => (/* binding */ ControlBarOptionsBuilder)
/* harmony export */ });
class ControlBarOptionsBuilder {
    constructor(globalOptions, mode) {
        this.mode = mode;
        this.options = globalOptions.common;
    }
    getChildrenOptions() {
        const children = {};
        if (this.options.previousVideo) {
            Object.assign(children, this.getPreviousVideo());
        }
        Object.assign(children, { playToggle: {} });
        if (this.options.nextVideo) {
            Object.assign(children, this.getNextVideo());
        }
        Object.assign(children, Object.assign(Object.assign(Object.assign({ currentTimeDisplay: {}, timeDivider: {}, durationDisplay: {}, liveDisplay: {}, flexibleWidthSpacer: {} }, this.getProgressControl()), { p2PInfoButton: {
                p2pEnabled: this.options.p2pEnabled
            }, muteToggle: {}, volumeControl: {} }), this.getSettingsButton()));
        /*if (this.options.peertubeLink === true) {
          Object.assign(children, {
            peerTubeLinkButton: {
              shortUUID: this.options.videoShortUUID,
              //instanceName: this.options.instanceName
            } as PeerTubeLinkButtonOptions
          })
        }*/
        Object.assign(children, {
            PictureInPictureBastyon: {}
        });
        if (this.options.theaterButton === true) {
            Object.assign(children, {
                theaterButton: {}
            });
        }
        Object.assign(children, {
            fullscreenToggle: {}
        });
        return children;
    }
    getSettingsButton() {
        const settingEntries = [];
        settingEntries.push('playbackRateMenuButton');
        //if (this.options.captions === true) settingEntries.push('captionsButton')
        settingEntries.push('resolutionMenuButton');
        return {
            settingsButton: {
                setup: {
                    maxHeightOffset: 40
                },
                entries: settingEntries
            }
        };
    }
    getProgressControl() {
        const loadProgressBar = this.mode === 'webtorrent'
            ? 'peerTubeLoadProgressBar'
            : 'loadProgressBar';
        return {
            progressControl: {
                children: {
                    seekBar: {
                        children: {
                            [loadProgressBar]: {},
                            mouseTimeDisplay: {},
                            playProgressBar: {}
                        }
                    }
                }
            }
        };
    }
    getPreviousVideo() {
        const buttonOptions = {
            type: 'previous',
            handler: this.options.previousVideo,
            isDisabled: () => {
                if (!this.options.hasPreviousVideo)
                    return false;
                return !this.options.hasPreviousVideo();
            }
        };
        return { previousVideoButton: buttonOptions };
    }
    getNextVideo() {
        const buttonOptions = {
            type: 'next',
            handler: this.options.nextVideo,
            isDisabled: () => {
                if (!this.options.hasNextVideo)
                    return false;
                return !this.options.hasNextVideo();
            }
        };
        return { nextVideoButton: buttonOptions };
    }
}


/***/ }),

/***/ "./src/assets/player/shared/manager-options/hls-options-builder.ts":
/*!*************************************************************************!*\
  !*** ./src/assets/player/shared/manager-options/hls-options-builder.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HLSOptionsBuilder": () => (/* binding */ HLSOptionsBuilder)
/* harmony export */ });
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");
/* harmony import */ var _p2p_media_loader_redundancy_url_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../p2p-media-loader/redundancy-url-manager */ "./src/assets/player/shared/p2p-media-loader/redundancy-url-manager.ts");
/* harmony import */ var _p2p_media_loader_segment_url_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../p2p-media-loader/segment-url-builder */ "./src/assets/player/shared/p2p-media-loader/segment-url-builder.ts");
/* harmony import */ var _p2p_media_loader_segment_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../p2p-media-loader/segment-validator */ "./src/assets/player/shared/p2p-media-loader/segment-validator.ts");






//import CapLevelController from './peertube-cap-level-controller'
class HLSOptionsBuilder {
    constructor(options, p2pMediaLoaderModule) {
        this.options = options;
        this.p2pMediaLoaderModule = p2pMediaLoaderModule;
    }
    getPluginOptions() {
        const commonOptions = this.options.common;
        const redundancyUrlManager = new _p2p_media_loader_redundancy_url_manager__WEBPACK_IMPORTED_MODULE_3__.RedundancyUrlManager(this.options.p2pMediaLoader.redundancyBaseUrls);
        const p2pMediaLoaderConfig = this.getP2PMediaLoaderOptions(redundancyUrlManager);
        const loader = new this.p2pMediaLoaderModule.Engine(p2pMediaLoaderConfig).createLoaderClass();
        console.log('p2pMediaLoaderConfig', p2pMediaLoaderConfig);
        const p2pMediaLoader = {
            redundancyUrlManager,
            type: 'application/x-mpegURL',
            startTime: commonOptions.startTime,
            src: this.options.p2pMediaLoader.playlistUrl,
            loader
        };
        const hlsjs = {
            levelLabelHandler: (level) => {
                const resolution = Math.min(level.height || 0, level.width || 0);
                const file = this.options.p2pMediaLoader.videoFiles.find(f => f.resolution.id === resolution);
                // We don't have files for live videos
                if (!file)
                    return level.height;
                let label = file.resolution.label;
                if (file.fps >= 50)
                    label += file.fps;
                return label;
            }
        };
        const html5 = {
            hlsjsConfig: this.getHLSJSOptions(loader)
        };
        return { p2pMediaLoader, hlsjs, html5 };
    }
    // ---------------------------------------------------------------------------
    getP2PMediaLoaderOptions(redundancyUrlManager) {
        var _a, _b;
        let consumeOnly = false;
        if (((_a = navigator === null || navigator === void 0 ? void 0 : navigator.connection) === null || _a === void 0 ? void 0 : _a.type) === 'cellular') {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__.logger.info('We are on a cellular connection: disabling seeding.');
            consumeOnly = true;
        }
        const trackerAnnounce = this.options.p2pMediaLoader.trackerAnnounce
            .filter(t => t.startsWith('ws'));
        const specificLiveOrVODOptions = this.options.common.isLive
            ? this.getP2PMediaLoaderLiveOptions()
            : this.getP2PMediaLoaderVODOptions();
        return {
            loader: Object.assign({ trackerAnnounce, rtcConfig: (0,_common__WEBPACK_IMPORTED_MODULE_2__.getRtcConfig)(), simultaneousHttpDownloads: 1, httpFailedSegmentTimeout: 1000, segmentValidator: (0,_p2p_media_loader_segment_validator__WEBPACK_IMPORTED_MODULE_5__.segmentValidatorFactory)(this.options.p2pMediaLoader.segmentsSha256Url, this.options.common.isLive), segmentUrlBuilder: (0,_p2p_media_loader_segment_url_builder__WEBPACK_IMPORTED_MODULE_4__.segmentUrlBuilderFactory)(redundancyUrlManager), useP2P: this.options.common.p2pEnabled, consumeOnly, segmentsStorage: this.options.segmentsStorage }, specificLiveOrVODOptions),
            segments: {
                assetsStorage: this.options.assetsStorage,
                swarmId: this.options.p2pMediaLoader.playlistUrl,
                forwardSegmentCount: (_b = specificLiveOrVODOptions.p2pDownloadMaxPriority) !== null && _b !== void 0 ? _b : 20
            }
        };
    }
    getP2PMediaLoaderLiveOptions() {
        const base = {
            requiredSegmentsPriority: 1
        };
        const latencyMode = this.options.common.liveOptions.latencyMode;
        switch (latencyMode) {
            case 3 /* LiveVideoLatencyMode.SMALL_LATENCY */:
                return Object.assign(Object.assign({}, base), { useP2P: false, httpDownloadProbability: 1 });
            case 2 /* LiveVideoLatencyMode.HIGH_LATENCY */:
                return base;
            default:
                return base;
        }
    }
    getP2PMediaLoaderVODOptions() {
        return {
            requiredSegmentsPriority: 3,
            skipSegmentBuilderPriority: 1,
            cachedSegmentExpiration: 86400000,
            cachedSegmentsCount: 100,
            httpDownloadMaxPriority: 9,
            httpDownloadProbability: 0.06,
            httpDownloadProbabilitySkipIfNoPeers: true,
            p2pDownloadMaxPriority: 50
        };
    }
    // ---------------------------------------------------------------------------
    getHLSJSOptions(loader) {
        const specificLiveOrVODOptions = this.options.common.isLive
            ? this.getHLSLiveOptions()
            : this.getHLSVODOptions();
        const base = Object.assign({ capLevelToPlayerSize: true, autoStartLoad: false, loader }, specificLiveOrVODOptions);
        const averageBandwidth = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__.getAverageBandwidthInStore)();
        if (!averageBandwidth)
            return base;
        return Object.assign(Object.assign({}, base), { abrEwmaDefaultEstimate: averageBandwidth * 8, backBufferLength: 90, startLevel: -1, testBandwidth: false, debug: false });
    }
    getHLSLiveOptions() {
        const latencyMode = this.options.common.liveOptions.latencyMode;
        switch (latencyMode) {
            case 3 /* LiveVideoLatencyMode.SMALL_LATENCY */:
                return {
                    liveSyncDurationCount: 2
                };
            case 2 /* LiveVideoLatencyMode.HIGH_LATENCY */:
                return {
                    liveSyncDurationCount: 10
                };
            default:
                return {
                    liveSyncDurationCount: 5
                };
        }
    }
    getHLSVODOptions() {
        return {
            liveSyncDurationCount: 5
        };
    }
}


/***/ }),

/***/ "./src/assets/player/shared/manager-options/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/player/shared/manager-options/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagerOptionsBuilder": () => (/* reexport safe */ _manager_options_builder__WEBPACK_IMPORTED_MODULE_0__.ManagerOptionsBuilder)
/* harmony export */ });
/* harmony import */ var _manager_options_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manager-options-builder */ "./src/assets/player/shared/manager-options/manager-options-builder.ts");



/***/ }),

/***/ "./src/assets/player/shared/manager-options/manager-options-builder.ts":
/*!*****************************************************************************!*\
  !*** ./src/assets/player/shared/manager-options/manager-options-builder.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagerOptionsBuilder": () => (/* binding */ ManagerOptionsBuilder)
/* harmony export */ });
/* harmony import */ var _root_helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root-helpers/utils */ "./src/root-helpers/utils.ts");
/* harmony import */ var _root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/web-browser */ "./src/root-helpers/web-browser.ts");
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");
/* harmony import */ var _shared_core_utils_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/core-utils/i18n */ "../shared/core-utils/i18n/index.ts");
/* harmony import */ var _control_bar_options_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./control-bar-options-builder */ "./src/assets/player/shared/manager-options/control-bar-options-builder.ts");
/* harmony import */ var _hls_options_builder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hls-options-builder */ "./src/assets/player/shared/manager-options/hls-options-builder.ts");
/* harmony import */ var _webtorrent_options_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./webtorrent-options-builder */ "./src/assets/player/shared/manager-options/webtorrent-options-builder.ts");







class ManagerOptionsBuilder {
    constructor(mode, options, p2pMediaLoaderModule) {
        this.mode = mode;
        this.options = options;
        this.p2pMediaLoaderModule = p2pMediaLoaderModule;
    }
    getVideojsOptions(alreadyPlayed) {
        const commonOptions = this.options.common;
        let autoplay = this.getAutoPlayValue(commonOptions.autoplay, alreadyPlayed);
        const html5 = {
            preloadTextTracks: false
        };
        const plugins = {
            peertube: Object.assign({ mode: this.mode, autoplay }, (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.pick)(commonOptions, [
                'videoViewUrl',
                'authorizationHeader',
                'startTime',
                'videoDuration',
                'subtitle',
                //  'videoCaptions',
                'stopTime',
                'isLive',
                'videoUUID',
            ]))
        };
        /*if (commonOptions.playlist) {
          plugins.playlist = commonOptions.playlist
        }*/
        if (this.mode === 'p2p-media-loader') {
            const hlsOptionsBuilder = new _hls_options_builder__WEBPACK_IMPORTED_MODULE_5__.HLSOptionsBuilder(this.options, this.p2pMediaLoaderModule);
            const options = hlsOptionsBuilder.getPluginOptions();
            Object.assign(plugins, (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.pick)(options, ['hlsjs', 'p2pMediaLoader']));
            Object.assign(html5, options.html5);
        }
        else if (this.mode === 'webtorrent') {
            const webtorrentOptionsBuilder = new _webtorrent_options_builder__WEBPACK_IMPORTED_MODULE_6__.WebTorrentOptionsBuilder(this.options, this.getAutoPlayValue(autoplay, alreadyPlayed));
            Object.assign(plugins, webtorrentOptionsBuilder.getPluginOptions());
            // WebTorrent plugin handles autoplay, because we do some hackish stuff in there
            autoplay = false;
        }
        const controlBarOptionsBuilder = new _control_bar_options_builder__WEBPACK_IMPORTED_MODULE_4__.ControlBarOptionsBuilder(this.options, this.mode);
        const videojsOptions = {
            html5,
            // We don't use text track settings for now
            textTrackSettings: false,
            controls: commonOptions.controls !== undefined ? commonOptions.controls : true,
            loop: commonOptions.loop !== undefined ? commonOptions.loop : false,
            muted: commonOptions.muted !== undefined
                ? commonOptions.muted
                : undefined,
            autoplay: this.getAutoPlayValue(autoplay, alreadyPlayed),
            poster: commonOptions.poster,
            inactivityTimeout: commonOptions.inactivityTimeout,
            playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            plugins,
            sources: commonOptions.sources,
            controlBar: {
                children: controlBarOptionsBuilder.getChildrenOptions() // FIXME: typings
            }
        };
        if (commonOptions.language && !(0,_shared_core_utils_i18n__WEBPACK_IMPORTED_MODULE_3__.isDefaultLocale)(commonOptions.language)) {
            Object.assign(videojsOptions, { language: commonOptions.language });
        }
        return videojsOptions;
    }
    getAutoPlayValue(autoplay, alreadyPlayed) {
        if (autoplay !== true)
            return autoplay;
        // On first play, disable autoplay to avoid issues
        // But if the player already played videos, we can safely autoplay next ones
        if ((0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_1__.isIOS)() || (0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_1__.isSafari)()) {
            return alreadyPlayed ? 'play' : false;
        }
        return 'play';
    }
    getContextMenuOptions(player, commonOptions) {
        const content = () => {
            const isLoopEnabled = player.options_['loop'];
            const items = [
                {
                    icon: 'repeat',
                    label: player.localize('Play in loop') + (isLoopEnabled ? '<span class="vjs-icon-tick-white"></span>' : ''),
                    listener: function () {
                        player.options_['loop'] = !isLoopEnabled;
                    }
                },
                {
                    label: player.localize('Copy the video URL'),
                    listener: function () {
                        (0,_root_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)((0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.buildVideoLink)({ shortUUID: commonOptions.videoShortUUID }));
                    }
                },
                {
                    label: player.localize('Copy the video URL at the current time'),
                    listener: function () {
                        const url = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.buildVideoLink)({ shortUUID: commonOptions.videoShortUUID });
                        (0,_root_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)((0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.decorateVideoLink)({ url, startTime: this.currentTime() }));
                    }
                },
                /*{
                  icon: 'code',
                  label: player.localize('Copy embed code'),
                  listener: () => {
                    copyToClipboard(buildVideoOrPlaylistEmbed(commonOptions.embedUrl, commonOptions.embedTitle))
                  }
                }*/
            ];
            if (this.mode === 'webtorrent') {
                items.push({
                    label: player.localize('Copy magnet URI'),
                    listener: function () {
                        (0,_root_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)(this.webtorrent().getCurrentVideoFile().magnetUri);
                    }
                });
            }
            items.push({
                icon: 'info',
                label: player.localize('Stats for nerds'),
                listener: () => {
                    player.stats().show();
                }
            });
            return items.map(i => (Object.assign(Object.assign({}, i), { label: `<span class="vjs-icon-${i.icon || 'link-2'}"></span>` + i.label })));
        };
        return { content };
    }
}


/***/ }),

/***/ "./src/assets/player/shared/manager-options/webtorrent-options-builder.ts":
/*!********************************************************************************!*\
  !*** ./src/assets/player/shared/manager-options/webtorrent-options-builder.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTorrentOptionsBuilder": () => (/* binding */ WebTorrentOptionsBuilder)
/* harmony export */ });
class WebTorrentOptionsBuilder {
    constructor(options, autoPlayValue) {
        this.options = options;
        this.autoPlayValue = autoPlayValue;
    }
    getPluginOptions() {
        const commonOptions = this.options.common;
        const webtorrentOptions = this.options.webtorrent;
        const p2pMediaLoaderOptions = this.options.p2pMediaLoader;
        const autoplay = this.autoPlayValue === 'play';
        const webtorrent = {
            autoplay,
            playerRefusedP2P: commonOptions.p2pEnabled === false,
            videoDuration: commonOptions.videoDuration,
            playerElement: commonOptions.playerElement,
            videoFiles: webtorrentOptions.videoFiles.length !== 0
                ? webtorrentOptions.videoFiles
                // The WebTorrent plugin won't be able to play these files, but it will fallback to HTTP mode
                : (p2pMediaLoaderOptions === null || p2pMediaLoaderOptions === void 0 ? void 0 : p2pMediaLoaderOptions.videoFiles) || [],
            startTime: commonOptions.startTime
        };
        return { webtorrent };
    }
}


/***/ }),

/***/ "./src/assets/player/shared/mobile/peertube-mobile-buttons.ts":
/*!********************************************************************!*\
  !*** ./src/assets/player/shared/mobile/peertube-mobile-buttons.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerTubeMobileButtons": () => (/* binding */ PeerTubeMobileButtons)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PeerTubeMobileButtons extends Component {
    createEl() {
        const container = super.createEl('div', {
            className: 'vjs-mobile-buttons-overlay'
        });
        const mainButton = super.createEl('div', {
            className: 'main-button'
        });
        mainButton.addEventListener('touchstart', e => {
            e.stopPropagation();
            if (this.player_.paused() || this.player_.ended()) {
                this.player_.play();
                return;
            }
            this.player_.pause();
        });
        this.rewind = super.createEl('div', { className: 'rewind-button vjs-hidden' });
        this.forward = super.createEl('div', { className: 'forward-button vjs-hidden' });
        for (let i = 0; i < 3; i++) {
            this.rewind.appendChild(super.createEl('span', { className: 'icon' }));
            this.forward.appendChild(super.createEl('span', { className: 'icon' }));
        }
        this.rewindText = this.rewind.appendChild(super.createEl('div', { className: 'text' }));
        this.forwardText = this.forward.appendChild(super.createEl('div', { className: 'text' }));
        container.appendChild(this.rewind);
        container.appendChild(mainButton);
        container.appendChild(this.forward);
        return container;
    }
    displayFastSeek(amount) {
        if (amount === 0) {
            this.hideRewind();
            this.hideForward();
            return;
        }
        if (amount > 0) {
            this.hideRewind();
            this.displayForward(amount);
            return;
        }
        if (amount < 0) {
            this.hideForward();
            this.displayRewind(amount);
            return;
        }
    }
    hideRewind() {
        this.rewind.classList.add('vjs-hidden');
        this.rewindText.textContent = '';
    }
    displayRewind(amount) {
        this.rewind.classList.remove('vjs-hidden');
        this.rewindText.textContent = this.player().localize('{1} seconds', [amount + '']);
    }
    hideForward() {
        this.forward.classList.add('vjs-hidden');
        this.forwardText.textContent = '';
    }
    displayForward(amount) {
        this.forward.classList.remove('vjs-hidden');
        this.forwardText.textContent = this.player().localize('{1} seconds', [amount + '']);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('PeerTubeMobileButtons', PeerTubeMobileButtons);



/***/ }),

/***/ "./src/assets/player/shared/mobile/peertube-mobile-plugin.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/player/shared/mobile/peertube-mobile-plugin.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerTubeMobilePlugin": () => (/* binding */ PeerTubeMobilePlugin)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");



const debugLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('peertube:player:mobile');
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_1___default().getPlugin('plugin');
class PeerTubeMobilePlugin extends Plugin {
    constructor(player, options) {
        super(player, options);
        this.seekAmount = 0;
        this.peerTubeMobileButtons = player.addChild('PeerTubeMobileButtons', { reportTouchActivity: false });
        if ((video_js__WEBPACK_IMPORTED_MODULE_1___default().browser.IS_ANDROID) && screen.orientation) {
            this.handleFullscreenRotation();
        }
        if (!this.player.options_.userActions)
            this.player.options_.userActions = {};
        // FIXME: typings
        this.player.options_.userActions.click = false;
        this.player.options_.userActions.doubleClick = false;
        this.player.one('play', () => {
            this.initTouchStartEvents();
        });
    }
    handleFullscreenRotation() {
        this.player.on('fullscreenchange', () => {
            if (!this.player.isFullscreen() || this.isPortraitVideo())
                return;
            screen.orientation.lock('landscape')
                .catch(err => _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Cannot lock screen to landscape.', err));
        });
    }
    isPortraitVideo() {
        return this.player.videoWidth() < this.player.videoHeight();
    }
    initTouchStartEvents() {
        const handleTouchStart = (event) => {
            if (this.tapTimeout) {
                clearTimeout(this.tapTimeout);
                this.tapTimeout = undefined;
            }
            if (this.lastTapEvent && event.timeStamp - this.lastTapEvent.timeStamp < PeerTubeMobilePlugin.DOUBLE_TAP_DELAY_MS) {
                debugLogger('Detected double tap');
                this.lastTapEvent = undefined;
                this.onDoubleTap(event);
                return;
            }
            this.newActiveState = !this.player.userActive();
            this.tapTimeout = setTimeout(() => {
                debugLogger('No double tap detected, set user active state to %s.', this.newActiveState);
                this.player.userActive(this.newActiveState);
            }, PeerTubeMobilePlugin.DOUBLE_TAP_DELAY_MS);
            this.lastTapEvent = event;
        };
        this.player.on('touchstart', (event) => {
            // Only enable user active on player touch, we listen event on peertube mobile buttons to disable it
            if (this.player.userActive())
                return;
            handleTouchStart(event);
        });
        this.peerTubeMobileButtons.el().addEventListener('touchstart', (event) => {
            // Prevent mousemove/click events firing on the player, that conflict with our user active logic
            event.preventDefault();
            handleTouchStart(event);
        }, { passive: false });
    }
    onDoubleTap(event) {
        const playerWidth = this.player.currentWidth();
        const rect = this.findPlayerTarget(event.target).getBoundingClientRect();
        const offsetX = event.targetTouches[0].pageX - rect.left;
        debugLogger('Calculating double tap zone (player width: %d, offset X: %d)', playerWidth, offsetX);
        if (offsetX > 0.66 * playerWidth) {
            if (this.seekAmount < 0)
                this.seekAmount = 0;
            this.seekAmount += 10;
            debugLogger('Will forward %d seconds', this.seekAmount);
        }
        else if (offsetX < 0.33 * playerWidth) {
            if (this.seekAmount > 0)
                this.seekAmount = 0;
            this.seekAmount -= 10;
            debugLogger('Will rewind %d seconds', this.seekAmount);
        }
        this.peerTubeMobileButtons.displayFastSeek(this.seekAmount);
        this.scheduleSetCurrentTime();
    }
    findPlayerTarget(target) {
        if (target.classList.contains('video-js'))
            return target;
        return this.findPlayerTarget(target.parentElement);
    }
    scheduleSetCurrentTime() {
        this.player.pause();
        this.player.addClass('vjs-fast-seeking');
        if (this.setCurrentTimeTimeout)
            clearTimeout(this.setCurrentTimeTimeout);
        this.setCurrentTimeTimeout = setTimeout(() => {
            let newTime = this.player.currentTime() + this.seekAmount;
            this.seekAmount = 0;
            newTime = Math.max(0, newTime);
            newTime = Math.min(this.player.duration(), newTime);
            this.player.currentTime(newTime);
            this.seekAmount = 0;
            this.peerTubeMobileButtons.displayFastSeek(0);
            this.player.removeClass('vjs-fast-seeking');
            this.player.userActive(false);
            this.player.play();
        }, PeerTubeMobilePlugin.SET_CURRENT_TIME_DELAY);
    }
}
PeerTubeMobilePlugin.DOUBLE_TAP_DELAY_MS = 250;
PeerTubeMobilePlugin.SET_CURRENT_TIME_DELAY = 1000;
video_js__WEBPACK_IMPORTED_MODULE_1___default().registerPlugin('peertubeMobile', PeerTubeMobilePlugin);



/***/ }),

/***/ "./src/assets/player/shared/p2p-media-loader/redundancy-url-manager.ts":
/*!*****************************************************************************!*\
  !*** ./src/assets/player/shared/p2p-media-loader/redundancy-url-manager.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RedundancyUrlManager": () => (/* binding */ RedundancyUrlManager)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./src/shims/path.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");


class RedundancyUrlManager {
    constructor(baseUrls = []) {
        this.baseUrls = baseUrls;
        // empty
    }
    removeBySegmentUrl(segmentUrl) {
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info(`Removing redundancy of segment URL ${segmentUrl}.`);
        const baseUrl = (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(segmentUrl);
        this.baseUrls = this.baseUrls.filter(u => u !== baseUrl && u !== baseUrl + '/');
    }
    buildUrl(url) {
        const max = this.baseUrls.length + 1;
        const i = this.getRandomInt(max);
        if (i === max - 1)
            return url;
        const newBaseUrl = this.baseUrls[i];
        const slashPart = newBaseUrl.endsWith('/') ? '' : '/';
        return newBaseUrl + slashPart + (0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(url);
    }
    countBaseUrls() {
        return this.baseUrls.length;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
// ---------------------------------------------------------------------------



/***/ }),

/***/ "./src/assets/player/shared/p2p-media-loader/segment-url-builder.ts":
/*!**************************************************************************!*\
  !*** ./src/assets/player/shared/p2p-media-loader/segment-url-builder.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "segmentUrlBuilderFactory": () => (/* binding */ segmentUrlBuilderFactory)
/* harmony export */ });
function segmentUrlBuilderFactory(redundancyUrlManager) {
    return function segmentBuilder(segment) {
        return redundancyUrlManager.buildUrl(segment.url);
    };
}
// ---------------------------------------------------------------------------



/***/ }),

/***/ "./src/assets/player/shared/p2p-media-loader/segment-validator.ts":
/*!************************************************************************!*\
  !*** ./src/assets/player/shared/p2p-media-loader/segment-validator.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "segmentValidatorFactory": () => (/* binding */ segmentValidatorFactory)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./src/shims/path.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _root_helpers_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root-helpers/utils */ "./src/root-helpers/utils.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];



const maxRetries = 3;
function segmentValidatorFactory(segmentsSha256Url, isLive) {
    let segmentsJSON = fetchSha256Segments(segmentsSha256Url);
    const regex = /bytes=(\d+)-(\d+)/;
    return async function segmentValidator(segment, _method, _peerId, retry = 1) {
        // Wait for hash generation from the server
        if (isLive)
            await (0,_root_helpers_utils__WEBPACK_IMPORTED_MODULE_2__.wait)(1000);
        const filename = (0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(segment.url);
        const segmentValue = (await segmentsJSON)[filename];
        if (!segmentValue && retry > maxRetries) {
            throw new Error(`Unknown segment name ${filename} in segment validator`);
        }
        if (!segmentValue) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.info(`Refetching sha segments for ${filename}`);
            await (0,_root_helpers_utils__WEBPACK_IMPORTED_MODULE_2__.wait)(1000);
            segmentsJSON = fetchSha256Segments(segmentsSha256Url);
            await segmentValidator(segment, _method, _peerId, retry + 1);
            return;
        }
        let hashShouldBe;
        let range = '';
        if (typeof segmentValue === 'string') {
            hashShouldBe = segmentValue;
        }
        else {
            const captured = regex.exec(segment.range);
            range = captured[1] + '-' + captured[2];
            hashShouldBe = segmentValue[range];
        }
        if (hashShouldBe === undefined) {
            throw new Error(`Unknown segment name ${filename}/${range} in segment validator`);
        }
        const calculatedSha = await sha256Hex(segment.data);
        if (calculatedSha !== hashShouldBe) {
            throw new Error(`Hashes does not correspond for segment ${filename}/${range}` +
                `(expected: ${hashShouldBe} instead of ${calculatedSha})`);
        }
    };
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
function fetchSha256Segments(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => {
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.error('Cannot get sha256 segments', err);
        return {};
    });
}
async function sha256Hex(data) {
    if (!data)
        return undefined;
    if (window.crypto.subtle) {
        return window.crypto.subtle.digest('SHA-256', data)
            .then(data => bufferToHex(data));
    }
    // Fallback for non HTTPS context
    const shaModule = (await __webpack_require__.e(/*! import() */ "vendors-node_modules_sha_js_index_js").then(__webpack_require__.t.bind(__webpack_require__, /*! sha.js */ "./node_modules/sha.js/index.js", 23))).default;
    // eslint-disable-next-line new-cap
    return new shaModule.sha256().update(Buffer.from(data)).digest('hex');
}
// Thanks: https://stackoverflow.com/a/53307879
function bufferToHex(buffer) {
    if (!buffer)
        return '';
    let s = '';
    const h = '0123456789abcdef';
    const o = new Uint8Array(buffer);
    o.forEach((v) => {
        s += h[v >> 4] + h[v & 15];
    });
    return s;
}


/***/ }),

/***/ "./src/assets/player/shared/peertube/peertube-plugin.ts":
/*!**************************************************************!*\
  !*** ./src/assets/player/shared/peertube/peertube-plugin.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerTubePlugin": () => (/* binding */ PeerTubePlugin)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root-helpers/web-browser */ "./src/root-helpers/web-browser.ts");
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");






const debugLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('peertube:player:peertube');
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_1___default().getPlugin('plugin');
class PeerTubePlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.CONSTANTS = {
            USER_VIEW_VIDEO_INTERVAL: 5000 // Every 5 seconds, notify the user is watching the video
        };
        this.menuOpened = false;
        this.mouseInControlBar = false;
        this.mouseInSettings = false;
        this.videoViewUrl = options.videoViewUrl;
        this.authorizationHeader = options.authorizationHeader;
        this.videoUUID = options.videoUUID;
        this.startTime = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_4__.timeToInt)(options.startTime);
        //this.videoCaptions = options.videoCaptions
        this.initialInactivityTimeout = this.player.options_.inactivityTimeout;
        if (options.autoplay)
            this.player.addClass('vjs-has-autoplay');
        this.player.on('autoplay-failure', () => {
            this.player.removeClass('vjs-has-autoplay');
        });
        this.player.ready(() => {
            const playerOptions = this.player.options_;
            const volume = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredVolume)();
            if (volume !== undefined)
                this.player.volume(volume);
            const muted = playerOptions.muted !== undefined ? playerOptions.muted : (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredMute)();
            if (muted !== undefined)
                this.player.muted(muted);
            this.defaultSubtitle = options.subtitle || (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredLastSubtitle)();
            this.player.on('volumechange', () => {
                (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveVolumeInStore)(this.player.volume());
                (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveMuteInStore)(this.player.muted());
            });
            if (options.stopTime) {
                const stopTime = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_4__.timeToInt)(options.stopTime);
                const self = this;
                this.player.on('timeupdate', function onTimeUpdate() {
                    if (self.player.currentTime() > stopTime) {
                        self.player.pause();
                        self.player.trigger('stopped');
                        self.player.off('timeupdate', onTimeUpdate);
                    }
                });
            }
            this.player.textTracks().addEventListener('change', () => {
                const showing = this.player.textTracks().tracks_.find(t => {
                    return t.kind === 'captions' && t.mode === 'showing';
                });
                if (!showing) {
                    (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveLastSubtitle)('off');
                    return;
                }
                (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveLastSubtitle)(showing.language);
            });
            //this.player.on('sourcechange', () => this.initCaptions())
            this.player.duration(options.videoDuration);
            this.initializePlayer();
            this.runUserViewing();
        });
    }
    dispose() {
        if (this.videoViewInterval)
            clearInterval(this.videoViewInterval);
    }
    onMenuOpened() {
        this.menuOpened = true;
        this.alterInactivity();
    }
    onMenuClosed() {
        this.menuOpened = false;
        this.alterInactivity();
    }
    displayFatalError() {
        this.player.addClass('vjs-error-display-enabled');
    }
    hideFatalError() {
        this.player.removeClass('vjs-error-display-enabled');
    }
    initializePlayer() {
        if ((0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_3__.isMobile)())
            this.player.addClass('vjs-is-mobile');
        this.initSmoothProgressBar();
        //this.initCaptions()
        this.listenControlBarMouse();
        this.listenFullScreenChange();
    }
    runUserViewing() {
        let lastCurrentTime = this.startTime;
        let lastViewEvent;
        this.player.one('play', () => {
            this.notifyUserIsWatching(this.startTime, lastViewEvent);
        });
        this.player.on('seeked', () => {
            // Don't take into account small seek events
            if (Math.abs(this.player.currentTime() - lastCurrentTime) < 3)
                return;
            lastViewEvent = 'seek';
        });
        this.player.one('ended', () => {
            const currentTime = Math.round(this.player.duration());
            lastCurrentTime = currentTime;
            this.notifyUserIsWatching(currentTime, lastViewEvent);
            lastViewEvent = undefined;
        });
        this.videoViewInterval = setInterval(() => {
            const currentTime = Math.round(this.player.currentTime());
            // No need to update
            if (currentTime === lastCurrentTime)
                return;
            lastCurrentTime = currentTime;
            this.notifyUserIsWatching(currentTime, lastViewEvent)
                .catch(err => _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Cannot notify user is watching.', err));
            lastViewEvent = undefined;
            // Server won't save history, so save the video position in local storage
            if (!this.authorizationHeader) {
                (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveVideoWatchHistory)(this.videoUUID, currentTime);
            }
        }, this.CONSTANTS.USER_VIEW_VIDEO_INTERVAL);
    }
    notifyUserIsWatching(currentTime, viewEvent) {
        if (!this.videoViewUrl)
            return Promise.resolve(undefined);
        const body = {
            currentTime,
            viewEvent
        };
        const headers = new Headers({
            'Content-type': 'application/json; charset=UTF-8'
        });
        if (this.authorizationHeader)
            headers.set('Authorization', this.authorizationHeader);
        return fetch(this.videoViewUrl, { method: 'POST', body: JSON.stringify(body), headers });
    }
    listenFullScreenChange() {
        this.player.on('fullscreenchange', () => {
            if (this.player.isFullscreen())
                this.player.focus();
        });
    }
    listenControlBarMouse() {
        const controlBar = this.player.controlBar;
        const settingsButton = controlBar.settingsButton;
        controlBar.on('mouseenter', () => {
            this.mouseInControlBar = true;
            this.alterInactivity();
        });
        controlBar.on('mouseleave', () => {
            this.mouseInControlBar = false;
            this.alterInactivity();
        });
        settingsButton.dialog.on('mouseenter', () => {
            this.mouseInSettings = true;
            this.alterInactivity();
        });
        settingsButton.dialog.on('mouseleave', () => {
            this.mouseInSettings = false;
            this.alterInactivity();
        });
    }
    alterInactivity() {
        if (this.menuOpened || this.mouseInSettings || this.mouseInControlBar) {
            this.setInactivityTimeout(0);
            return;
        }
        this.setInactivityTimeout(this.initialInactivityTimeout);
        this.player.reportUserActivity(true);
    }
    setInactivityTimeout(timeout) {
        this.player.cache_.inactivityTimeout = timeout;
        this.player.options_.inactivityTimeout = timeout;
        debugLogger('Set player inactivity to ' + timeout);
    }
    /*private initCaptions () {
      for (const caption of this.videoCaptions) {
        this.player.addRemoteTextTrack({
          kind: 'captions',
          label: caption.label,
          language: caption.language,
          id: caption.language,
          src: caption.src,
          default: this.defaultSubtitle === caption.language
        }, false)
      }
  
      this.player.trigger('captionsChanged')
    }*/
    // Thanks: https://github.com/videojs/video.js/issues/4460#issuecomment-312861657
    initSmoothProgressBar() {
        const SeekBar = video_js__WEBPACK_IMPORTED_MODULE_1___default().getComponent('SeekBar');
        SeekBar.prototype.getPercent = function getPercent() {
            // Allows for smooth scrubbing, when player can't keep up.
            // const time = (this.player_.scrubbing()) ?
            //   this.player_.getCache().currentTime :
            //   this.player_.currentTime()
            const time = this.player_.currentTime();
            const percent = time / this.player_.duration();
            return percent >= 1 ? 1 : percent;
        };
        SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
            let newTime = this.calculateDistance(event) * this.player_.duration();
            if (newTime === this.player_.duration()) {
                newTime = newTime - 0.1;
            }
            this.player_.currentTime(newTime);
            this.update();
        };
    }
}
video_js__WEBPACK_IMPORTED_MODULE_1___default().registerPlugin('peertube', PeerTubePlugin);



/***/ }),

/***/ "./src/assets/player/shared/playlist/playlist-button.ts":
/*!**************************************************************!*\
  !*** ./src/assets/player/shared/playlist/playlist-button.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistButton": () => (/* binding */ PlaylistButton)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class PlaylistButton extends ClickableComponent {
    constructor(player, options) {
        super(player, options);
    }
    createEl() {
        this.wrapper = super.createEl('div', {
            className: 'vjs-playlist-button',
            innerHTML: '',
            tabIndex: -1
        });
        const icon = super.createEl('div', {
            className: 'vjs-playlist-icon',
            innerHTML: '',
            tabIndex: -1
        });
        this.playlistInfoElement = super.createEl('div', {
            className: 'vjs-playlist-info',
            innerHTML: '',
            tabIndex: -1
        });
        this.wrapper.appendChild(icon);
        this.wrapper.appendChild(this.playlistInfoElement);
        this.update();
        return this.wrapper;
    }
    update() {
        const options = this.options_;
        this.playlistInfoElement.innerHTML = options.getCurrentPosition() + '/' + options.playlist.videosLength;
        this.wrapper.title = this.player().localize('Playlist: {1}', [options.playlist.displayName]);
    }
    handleClick() {
        const playlistMenu = this.getPlaylistMenu();
        playlistMenu.open();
    }
    getPlaylistMenu() {
        return this.options_.playlistMenu;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('PlaylistButton', PlaylistButton);



/***/ }),

/***/ "./src/assets/player/shared/playlist/playlist-menu-item.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/shared/playlist/playlist-menu-item.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistMenuItem": () => (/* binding */ PlaylistMenuItem)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");


const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PlaylistMenuItem extends Component {
    constructor(player, options) {
        super(player, options);
        this.emitTapEvents();
        this.element = options.element;
        this.on(['click', 'tap'], () => this.switchPlaylistItem());
        this.on('keydown', event => this.handleKeyDown(event));
    }
    createEl() {
        const options = this.options_;
        const li = super.createEl('li', {
            className: 'vjs-playlist-menu-item',
            innerHTML: ''
        });
        if (!options.element.video) {
            li.classList.add('vjs-disabled');
        }
        const positionBlock = super.createEl('div', {
            className: 'item-position-block'
        });
        const position = super.createEl('div', {
            className: 'item-position',
            innerHTML: options.element.position
        });
        positionBlock.appendChild(position);
        li.appendChild(positionBlock);
        if (options.element.video) {
            this.buildAvailableVideo(li, positionBlock, options);
        }
        else {
            this.buildUnavailableVideo(li);
        }
        return li;
    }
    setSelected(selected) {
        if (selected)
            this.addClass('vjs-selected');
        else
            this.removeClass('vjs-selected');
    }
    getElement() {
        return this.element;
    }
    buildAvailableVideo(li, positionBlock, options) {
        const videoElement = options.element;
        const player = super.createEl('div', {
            className: 'item-player'
        });
        positionBlock.appendChild(player);
        const thumbnail = super.createEl('img', {
            src: window.location.origin + videoElement.video.thumbnailPath
        });
        const infoBlock = super.createEl('div', {
            className: 'info-block'
        });
        const title = super.createEl('div', {
            innerHTML: videoElement.video.name,
            className: 'title'
        });
        const channel = super.createEl('div', {
            innerHTML: videoElement.video.channel.displayName,
            className: 'channel'
        });
        infoBlock.appendChild(title);
        infoBlock.appendChild(channel);
        if (videoElement.startTimestamp || videoElement.stopTimestamp) {
            let html = '';
            if (videoElement.startTimestamp)
                html += (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToTime)(videoElement.startTimestamp);
            if (videoElement.stopTimestamp)
                html += ' - ' + (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToTime)(videoElement.stopTimestamp);
            const timestamps = super.createEl('div', {
                innerHTML: html,
                className: 'timestamps'
            });
            infoBlock.append(timestamps);
        }
        li.append(thumbnail);
        li.append(infoBlock);
    }
    buildUnavailableVideo(li) {
        const block = super.createEl('div', {
            className: 'item-unavailable',
            innerHTML: this.player().localize('Unavailable video')
        });
        li.appendChild(block);
    }
    handleKeyDown(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            this.switchPlaylistItem();
        }
    }
    switchPlaylistItem() {
        const options = this.options_;
        options.onClicked();
    }
}
Component.registerComponent('PlaylistMenuItem', PlaylistMenuItem);



/***/ }),

/***/ "./src/assets/player/shared/playlist/playlist-menu.ts":
/*!************************************************************!*\
  !*** ./src/assets/player/shared/playlist/playlist-menu.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistMenu": () => (/* binding */ PlaylistMenu)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _playlist_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-menu-item */ "./src/assets/player/shared/playlist/playlist-menu-item.ts");


const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PlaylistMenu extends Component {
    constructor(player, options) {
        super(player, options);
        const self = this;
        function userInactiveHandler() {
            self.close();
        }
        this.el().addEventListener('mouseenter', () => {
            this.player().off('userinactive', userInactiveHandler);
        });
        this.el().addEventListener('mouseleave', () => {
            this.player().one('userinactive', userInactiveHandler);
        });
        this.player().on('click', event => {
            let current = event.target;
            do {
                if (current.classList.contains('vjs-playlist-menu') ||
                    current.classList.contains('vjs-playlist-button')) {
                    return;
                }
                current = current.parentElement;
            } while (current);
            this.close();
        });
    }
    createEl() {
        this.menuItems = [];
        const options = this.getOptions();
        const menu = super.createEl('div', {
            className: 'vjs-playlist-menu',
            innerHTML: '',
            tabIndex: -1
        });
        const header = super.createEl('div', {
            className: 'header'
        });
        const headerLeft = super.createEl('div');
        const leftTitle = super.createEl('div', {
            innerHTML: options.playlist.displayName,
            className: 'title'
        });
        const playlistChannel = options.playlist.videoChannel;
        const leftSubtitle = super.createEl('div', {
            innerHTML: playlistChannel
                ? this.player().localize('By {1}', [playlistChannel.displayName])
                : '',
            className: 'channel'
        });
        headerLeft.appendChild(leftTitle);
        headerLeft.appendChild(leftSubtitle);
        const tick = super.createEl('div', {
            className: 'cross'
        });
        tick.addEventListener('click', () => this.close());
        header.appendChild(headerLeft);
        header.appendChild(tick);
        const list = super.createEl('ol');
        for (const playlistElement of options.elements) {
            const item = new _playlist_menu_item__WEBPACK_IMPORTED_MODULE_1__.PlaylistMenuItem(this.player(), {
                element: playlistElement,
                onClicked: () => this.onItemClicked(playlistElement)
            });
            list.appendChild(item.el());
            this.menuItems.push(item);
        }
        menu.appendChild(header);
        menu.appendChild(list);
        return menu;
    }
    update() {
        const options = this.getOptions();
        this.updateSelected(options.getCurrentPosition());
    }
    open() {
        this.player().addClass('playlist-menu-displayed');
    }
    close() {
        this.player().removeClass('playlist-menu-displayed');
    }
    updateSelected(newPosition) {
        for (const item of this.menuItems) {
            item.setSelected(item.getElement().position === newPosition);
        }
    }
    getOptions() {
        return this.options_;
    }
    onItemClicked(element) {
        this.getOptions().onItemClicked(element);
    }
}
Component.registerComponent('PlaylistMenu', PlaylistMenu);



/***/ }),

/***/ "./src/assets/player/shared/playlist/playlist-plugin.ts":
/*!**************************************************************!*\
  !*** ./src/assets/player/shared/playlist/playlist-plugin.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistPlugin": () => (/* binding */ PlaylistPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _playlist_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-button */ "./src/assets/player/shared/playlist/playlist-button.ts");
/* harmony import */ var _playlist_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist-menu */ "./src/assets/player/shared/playlist/playlist-menu.ts");



const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class PlaylistPlugin extends Plugin {
    constructor(player, options) {
        super(player, options);
        this.options = options;
        this.player.ready(() => {
            player.addClass('vjs-playlist');
        });
        this.playlistMenu = new _playlist_menu__WEBPACK_IMPORTED_MODULE_2__.PlaylistMenu(player, options);
        this.playlistButton = new _playlist_button__WEBPACK_IMPORTED_MODULE_1__.PlaylistButton(player, Object.assign(Object.assign({}, options), { playlistMenu: this.playlistMenu }));
        player.addChild(this.playlistMenu, options);
        player.addChild(this.playlistButton, options);
    }
    updateSelected() {
        this.playlistMenu.updateSelected(this.options.getCurrentPosition());
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('playlist', PlaylistPlugin);



/***/ }),

/***/ "./src/assets/player/shared/resolutions/peertube-resolutions-plugin.ts":
/*!*****************************************************************************!*\
  !*** ./src/assets/player/shared/resolutions/peertube-resolutions-plugin.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerTubeResolutionsPlugin": () => (/* binding */ PeerTubeResolutionsPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class PeerTubeResolutionsPlugin extends Plugin {
    constructor() {
        super(...arguments);
        this.resolutions = [];
        this.autoResolutionEnabled = true;
    }
    add(resolutions) {
        for (const r of resolutions) {
            this.resolutions.push(r);
        }
        this.currentSelection = this.getSelected();
        this.sort();
        this.trigger('resolutionsAdded');
    }
    getResolutions() {
        return this.resolutions;
    }
    getSelected() {
        return this.resolutions.find(r => r.selected);
    }
    getAutoResolutionChosen() {
        return this.resolutions.find(r => r.id === this.autoResolutionChosenId);
    }
    select(options) {
        var _a;
        const { id, autoResolutionChosenId, byEngine } = options;
        if (((_a = this.currentSelection) === null || _a === void 0 ? void 0 : _a.id) === id && this.autoResolutionChosenId === autoResolutionChosenId)
            return;
        this.autoResolutionChosenId = autoResolutionChosenId;
        for (const r of this.resolutions) {
            r.selected = r.id === id;
            if (r.selected) {
                this.currentSelection = r;
                if (!byEngine)
                    r.selectCallback();
            }
        }
        this.trigger('resolutionChanged');
    }
    disableAutoResolution() {
        this.autoResolutionEnabled = false;
        this.trigger('autoResolutionEnabledChanged');
    }
    enabledAutoResolution() {
        this.autoResolutionEnabled = true;
        this.trigger('autoResolutionEnabledChanged');
    }
    isAutoResolutionEnabeld() {
        return this.autoResolutionEnabled;
    }
    sort() {
        this.resolutions.sort((a, b) => {
            if (a.id === -1)
                return 1;
            if (b.id === -1)
                return -1;
            if (a.height > b.height)
                return -1;
            if (a.height === b.height)
                return 0;
            return 1;
        });
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('peertubeResolutions', PeerTubeResolutionsPlugin);



/***/ }),

/***/ "./src/assets/player/shared/settings/resolution-menu-button.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/player/shared/settings/resolution-menu-button.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resolution_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolution-menu-item */ "./src/assets/player/shared/settings/resolution-menu-item.ts");


const Menu = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Menu');
const MenuButton = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('MenuButton');
class ResolutionMenuButton extends MenuButton {
    constructor(player, options) {
        super(player, options);
        this.controlText('Quality');
        player.peertubeResolutions().on('resolutionsAdded', () => this.buildQualities());
        // For parent
        player.peertubeResolutions().on('resolutionChanged', () => {
            setTimeout(() => this.trigger('labelUpdated'));
        });
    }
    createEl() {
        const el = super.createEl();
        this.labelEl_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-resolution-value'
        });
        el.appendChild(this.labelEl_);
        return el;
    }
    updateARIAAttributes() {
        this.el().setAttribute('aria-label', 'Quality');
    }
    createMenu() {
        return new Menu(this.player_);
    }
    buildCSSClass() {
        return super.buildCSSClass() + ' vjs-resolution-button';
    }
    buildWrapperCSSClass() {
        return 'vjs-resolution-control ' + super.buildWrapperCSSClass();
    }
    addClickListener(component) {
        component.on('click', () => {
            const children = this.menu.children();
            for (const child of children) {
                if (component !== child) {
                    child.selected(false);
                }
            }
        });
    }
    buildQualities() {
        for (const d of this.player().peertubeResolutions().getResolutions()) {
            const label = d.label === '0p'
                ? this.player().localize('Audio-only')
                : d.label;
            this.menu.addChild(new _resolution_menu_item__WEBPACK_IMPORTED_MODULE_1__.ResolutionMenuItem(this.player_, {
                id: d.id + '',
                resolutionId: d.id,
                label,
                selected: d.selected
            }));
        }
        for (const m of this.menu.children()) {
            this.addClickListener(m);
        }
        this.trigger('menuChanged');
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('ResolutionMenuButton', ResolutionMenuButton);


/***/ }),

/***/ "./src/assets/player/shared/settings/resolution-menu-item.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/player/shared/settings/resolution-menu-item.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResolutionMenuItem": () => (/* binding */ ResolutionMenuItem)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const MenuItem = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('MenuItem');
class ResolutionMenuItem extends MenuItem {
    constructor(player, options) {
        options.selectable = true;
        super(player, options);
        this.autoResolutionEnabled = true;
        this.autoResolutionChosen = '';
        this.resolutionId = options.resolutionId;
        this.label = options.label;
        player.peertubeResolutions().on('resolutionChanged', () => this.updateSelection());
        // We only want to disable the "Auto" item
        if (this.resolutionId === -1) {
            player.peertubeResolutions().on('autoResolutionEnabledChanged', () => this.updateAutoResolution());
        }
    }
    handleClick(event) {
        // Auto button disabled?
        if (this.autoResolutionEnabled === false && this.resolutionId === -1)
            return;
        super.handleClick(event);
        this.player().peertubeResolutions().select({ id: this.resolutionId, byEngine: false });
    }
    updateSelection() {
        var _a;
        const selectedResolution = this.player().peertubeResolutions().getSelected();
        if (this.resolutionId === -1) {
            this.autoResolutionChosen = (_a = this.player().peertubeResolutions().getAutoResolutionChosen()) === null || _a === void 0 ? void 0 : _a.label;
        }
        this.selected(this.resolutionId === selectedResolution.id);
    }
    updateAutoResolution() {
        const enabled = this.player().peertubeResolutions().isAutoResolutionEnabeld();
        // Check if the auto resolution is enabled or not
        if (enabled === false) {
            this.addClass('disabled');
        }
        else {
            this.removeClass('disabled');
        }
        this.autoResolutionEnabled = enabled;
    }
    getLabel() {
        if (this.resolutionId === -1) {
            return this.label + ' <small>' + this.autoResolutionChosen + '</small>';
        }
        return this.label;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('ResolutionMenuItem', ResolutionMenuItem);



/***/ }),

/***/ "./src/assets/player/shared/settings/settings-dialog.ts":
/*!**************************************************************!*\
  !*** ./src/assets/player/shared/settings/settings-dialog.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsDialog": () => (/* binding */ SettingsDialog)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class SettingsDialog extends Component {
    constructor(player) {
        super(player);
        this.hide();
    }
    /**
     * Create the component's DOM element
     *
     */
    createEl() {
        const uniqueId = this.id();
        const dialogLabelId = 'TTsettingsDialogLabel-' + uniqueId;
        const dialogDescriptionId = 'TTsettingsDialogDescription-' + uniqueId;
        return super.createEl('div', {
            className: 'vjs-settings-dialog vjs-modal-overlay',
            innerHTML: '',
            tabIndex: -1
        }, {
            role: 'dialog',
            'aria-labelledby': dialogLabelId,
            'aria-describedby': dialogDescriptionId
        });
    }
}
Component.registerComponent('SettingsDialog', SettingsDialog);



/***/ }),

/***/ "./src/assets/player/shared/settings/settings-menu-button.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/player/shared/settings/settings-menu-button.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsButton": () => (/* binding */ SettingsButton)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");
/* harmony import */ var _settings_menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-menu-item */ "./src/assets/player/shared/settings/settings-menu-item.ts");



const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Button');
const Menu = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Menu');
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class SettingsButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.settingsButtonOptions = options;
        this.controlText('Settings');
        this.dialog = this.player().addChild('settingsDialog');
        this.dialogEl = this.dialog.el();
        this.menu = null;
        this.panel = this.dialog.addChild('settingsPanel');
        this.panelChild = this.panel.addChild('settingsPanelChild');
        this.addClass('vjs-settings');
        this.el().setAttribute('aria-label', 'Settings Button');
        // Event handlers
        this.addSettingsItemHandler = this.onAddSettingsItem.bind(this);
        this.disposeSettingsItemHandler = this.onDisposeSettingsItem.bind(this);
        this.documentClickHandler = this.onDocumentClick.bind(this);
        this.userInactiveHandler = this.onUserInactive.bind(this);
        this.buildMenu();
        this.bindEvents();
        // Prepare the dialog
        this.player().one('play', () => this.hideDialog());
    }
    onDocumentClick(event) {
        var _a, _b, _c;
        const element = event.target;
        if (((_a = element === null || element === void 0 ? void 0 : element.classList) === null || _a === void 0 ? void 0 : _a.contains('vjs-settings')) || ((_c = (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.contains('vjs-settings'))) {
            return;
        }
        if (!this.dialog.hasClass('vjs-hidden')) {
            this.hideDialog();
        }
    }
    onDisposeSettingsItem(event, name) {
        if (name === undefined) {
            const children = this.menu.children();
            while (children.length > 0) {
                children[0].dispose();
                this.menu.removeChild(children[0]);
            }
            this.addClass('vjs-hidden');
        }
        else {
            const item = this.menu.getChild(name);
            if (item) {
                item.dispose();
                this.menu.removeChild(item);
            }
        }
        this.hideDialog();
        if (this.settingsButtonOptions.entries.length === 0) {
            this.addClass('vjs-hidden');
        }
    }
    dispose() {
        document.removeEventListener('click', this.documentClickHandler);
        if (this.isInIframe()) {
            window.removeEventListener('blur', this.documentClickHandler);
        }
    }
    onAddSettingsItem(event, data) {
        const [entry, options] = data;
        this.addMenuItem(entry, options);
        this.removeClass('vjs-hidden');
    }
    onUserInactive() {
        if (!this.dialog.hasClass('vjs-hidden')) {
            this.hideDialog();
        }
    }
    bindEvents() {
        document.addEventListener('click', this.documentClickHandler);
        if (this.isInIframe()) {
            window.addEventListener('blur', this.documentClickHandler);
        }
        this.player().on('addsettingsitem', this.addSettingsItemHandler);
        this.player().on('disposesettingsitem', this.disposeSettingsItemHandler);
        this.player().on('userinactive', this.userInactiveHandler);
    }
    buildCSSClass() {
        return `vjs-icon-settings ${super.buildCSSClass()}`;
    }
    handleClick() {
        if (this.dialog.hasClass('vjs-hidden')) {
            this.showDialog();
        }
        else {
            this.hideDialog();
        }
    }
    showDialog() {
        this.player().peertube().onMenuOpened();
        this.menu.el().style.opacity = '1';
        this.dialog.show();
        this.el().setAttribute('aria-expanded', 'true');
        this.setDialogSize(this.getComponentSize(this.menu));
        const firstChild = this.menu.children()[0];
        if (firstChild)
            firstChild.focus();
    }
    hideDialog() {
        this.player_.peertube().onMenuClosed();
        this.dialog.hide();
        this.el().setAttribute('aria-expanded', 'false');
        this.setDialogSize(this.getComponentSize(this.menu));
        this.menu.el().style.opacity = '1';
        this.resetChildren();
    }
    getComponentSize(element) {
        let width = null;
        let height = null;
        // Could be component or just DOM element
        if (element instanceof Component) {
            const el = element.el();
            width = el.offsetWidth;
            height = el.offsetHeight;
            element.width = width;
            element.height = height;
        }
        else {
            width = element.offsetWidth;
            height = element.offsetHeight;
        }
        return [width, height];
    }
    setDialogSize([width, height]) {
        if (typeof height !== 'number') {
            return;
        }
        const offset = this.settingsButtonOptions.setup.maxHeightOffset;
        const maxHeight = this.player().el().offsetHeight - offset;
        const panelEl = this.panel.el();
        if (height > maxHeight) {
            height = maxHeight;
            width += 17;
            panelEl.style.maxHeight = `${height}px`;
        }
        else if (panelEl.style.maxHeight !== '') {
            panelEl.style.maxHeight = '';
        }
        this.dialogEl.style.width = `${width}px`;
        this.dialogEl.style.height = `${height}px`;
    }
    buildMenu() {
        this.menu = new Menu(this.player());
        this.menu.addClass('vjs-main-menu');
        const entries = this.settingsButtonOptions.entries;
        if (entries.length === 0) {
            this.addClass('vjs-hidden');
            this.panelChild.addChild(this.menu);
            return;
        }
        for (const entry of entries) {
            this.addMenuItem(entry, this.settingsButtonOptions);
        }
        this.panelChild.addChild(this.menu);
    }
    addMenuItem(entry, options) {
        const openSubMenu = function () {
            if (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.hasClass(this.el_, 'open')) {
                video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.removeClass(this.el_, 'open');
            }
            else {
                video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.el_, 'open');
            }
        };
        options.name = (0,_common__WEBPACK_IMPORTED_MODULE_1__.toTitleCase)(entry);
        const newOptions = Object.assign({}, options, { entry, menuButton: this });
        const settingsMenuItem = new _settings_menu_item__WEBPACK_IMPORTED_MODULE_2__.SettingsMenuItem(this.player(), newOptions);
        this.menu.addChild(settingsMenuItem);
        // Hide children to avoid sub menus stacking on top of each other
        // or having multiple menus open
        settingsMenuItem.on('click', video_js__WEBPACK_IMPORTED_MODULE_0___default().bind(this, this.hideChildren));
        // Whether to add or remove selected class on the settings sub menu element
        settingsMenuItem.on('click', openSubMenu);
    }
    resetChildren() {
        for (const menuChild of this.menu.children()) {
            menuChild.reset();
        }
    }
    /**
     * Hide all the sub menus
     */
    hideChildren() {
        for (const menuChild of this.menu.children()) {
            menuChild.hideSubMenu();
        }
    }
    isInIframe() {
        return window.self !== window.top;
    }
}
Component.registerComponent('SettingsButton', SettingsButton);



/***/ }),

/***/ "./src/assets/player/shared/settings/settings-menu-item.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/shared/settings/settings-menu-item.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsMenuItem": () => (/* binding */ SettingsMenuItem)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");


const MenuItem = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('MenuItem');
const component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class SettingsMenuItem extends MenuItem {
    constructor(player, options) {
        super(player, options);
        this.settingsButton = options.menuButton;
        this.dialog = this.settingsButton.dialog;
        this.mainMenu = this.settingsButton.menu;
        this.panel = this.dialog.getChild('settingsPanel');
        this.panelChild = this.panel.getChild('settingsPanelChild');
        this.panelChildEl = this.panelChild.el();
        this.size = null;
        // keep state of what menu type is loading next
        this.menuToLoad = 'mainmenu';
        const subMenuName = (0,_common__WEBPACK_IMPORTED_MODULE_1__.toTitleCase)(options.entry);
        const SubMenuComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent(subMenuName);
        if (!SubMenuComponent) {
            throw new Error(`Component ${subMenuName} does not exist`);
        }
        const newOptions = Object.assign({}, options, { entry: options.menuButton, menuButton: this });
        this.subMenu = new SubMenuComponent(this.player(), newOptions);
        const subMenuClass = this.subMenu.buildCSSClass().split(' ')[0];
        this.settingsSubMenuEl_.className += ' ' + subMenuClass;
        this.eventHandlers();
        player.ready(() => {
            // Voodoo magic for IOS
            setTimeout(() => {
                // Player was destroyed
                if (!this.player_)
                    return;
                this.build();
                // Update on rate change
                player.on('ratechange', this.submenuClickHandler);
                if (subMenuName === 'CaptionsButton') {
                    // Hack to regenerate captions on HTTP fallback
                    player.on('captionsChanged', () => {
                        setTimeout(() => {
                            this.settingsSubMenuEl_.innerHTML = '';
                            this.settingsSubMenuEl_.appendChild(this.subMenu.menu.el());
                            this.update();
                            this.bindClickEvents();
                        }, 0);
                    });
                }
                this.reset();
            }, 0);
        });
    }
    eventHandlers() {
        this.submenuClickHandler = this.onSubmenuClick.bind(this);
        this.transitionEndHandler = this.onTransitionEnd.bind(this);
    }
    onSubmenuClick(event) {
        let target = null;
        if (event.type === 'tap') {
            target = event.target;
        }
        else {
            target = event.currentTarget || event.target;
        }
        if (target === null || target === void 0 ? void 0 : target.classList.contains('vjs-back-button')) {
            this.loadMainMenu();
            return;
        }
        // To update the sub menu value on click, setTimeout is needed because
        // updating the value is not instant
        setTimeout(() => this.update(event), 0);
        // Seems like videojs adds a vjs-hidden class on the caption menu after a click
        // We don't need it
        this.subMenu.menu.removeClass('vjs-hidden');
    }
    /**
     * Create the component's DOM element
     *
     */
    createEl() {
        const el = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('li', {
            className: 'vjs-menu-item',
            tabIndex: -1
        });
        this.settingsSubMenuTitleEl_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-settings-sub-menu-title'
        });
        el.appendChild(this.settingsSubMenuTitleEl_);
        this.settingsSubMenuValueEl_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-settings-sub-menu-value'
        });
        el.appendChild(this.settingsSubMenuValueEl_);
        this.settingsSubMenuEl_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-settings-sub-menu'
        });
        return el;
    }
    /**
     * Handle click on menu item
     *
     * @method handleClick
     */
    handleClick(event) {
        this.menuToLoad = 'submenu';
        // Remove open class to ensure only the open submenu gets this class
        video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.removeClass(this.el(), 'open');
        super.handleClick(event);
        this.mainMenu.el().style.opacity = '0';
        // Whether to add or remove vjs-hidden class on the settingsSubMenuEl element
        if (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.hasClass(this.settingsSubMenuEl_, 'vjs-hidden')) {
            video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.removeClass(this.settingsSubMenuEl_, 'vjs-hidden');
            // animation not played without timeout
            setTimeout(() => {
                this.settingsSubMenuEl_.style.opacity = '1';
                this.settingsSubMenuEl_.style.marginRight = '0px';
            }, 0);
            this.settingsButton.setDialogSize(this.size);
            const firstChild = this.subMenu.menu.children()[0];
            if (firstChild)
                firstChild.focus();
        }
        else {
            video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
        }
    }
    /**
     * Create back button
     *
     * @method createBackButton
     */
    createBackButton() {
        const button = this.subMenu.menu.addChild('MenuItem', {}, 0);
        button.addClass('vjs-back-button');
        button.el().innerHTML = this.player().localize(this.subMenu.controlText());
    }
    /**
     * Add/remove prefixed event listener for CSS Transition
     *
     * @method PrefixedEvent
     */
    PrefixedEvent(element, type, callback, action = 'addEvent') {
        const prefix = ['webkit', 'moz', 'MS', 'o', ''];
        for (let p = 0; p < prefix.length; p++) {
            if (!prefix[p]) {
                type = type.toLowerCase();
            }
            if (action === 'addEvent') {
                element.addEventListener(prefix[p] + type, callback, false);
            }
            else if (action === 'removeEvent') {
                element.removeEventListener(prefix[p] + type, callback, false);
            }
        }
    }
    onTransitionEnd(event) {
        if (event.propertyName !== 'margin-right') {
            return;
        }
        if (this.menuToLoad === 'mainmenu') {
            // hide submenu
            video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
            // reset opacity to 0
            this.settingsSubMenuEl_.style.opacity = '0';
        }
    }
    reset() {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
        this.settingsSubMenuEl_.style.opacity = '0';
        this.setMargin();
    }
    loadMainMenu() {
        const mainMenuEl = this.mainMenu.el();
        this.menuToLoad = 'mainmenu';
        this.mainMenu.show();
        mainMenuEl.style.opacity = '0';
        // back button will always take you to main menu, so set dialog sizes
        const mainMenuAny = this.mainMenu;
        this.settingsButton.setDialogSize([mainMenuAny.width, mainMenuAny.height]);
        // animation not triggered without timeout (some async stuff ?!?)
        setTimeout(() => {
            // animate margin and opacity before hiding the submenu
            // this triggers CSS Transition event
            this.setMargin();
            mainMenuEl.style.opacity = '1';
            const firstChild = this.mainMenu.children()[0];
            if (firstChild)
                firstChild.focus();
        }, 0);
    }
    build() {
        this.subMenu.on('labelUpdated', () => {
            this.update();
        });
        this.subMenu.on('menuChanged', () => {
            this.bindClickEvents();
            this.setSize();
            this.update();
        });
        this.settingsSubMenuTitleEl_.innerHTML = this.player().localize(this.subMenu.controlText());
        this.settingsSubMenuEl_.appendChild(this.subMenu.menu.el());
        this.panelChildEl.appendChild(this.settingsSubMenuEl_);
        this.update();
        this.createBackButton();
        this.setSize();
        this.bindClickEvents();
        // prefixed event listeners for CSS TransitionEnd
        this.PrefixedEvent(this.settingsSubMenuEl_, 'TransitionEnd', this.transitionEndHandler, 'addEvent');
    }
    update(event) {
        let target = null;
        const subMenu = this.subMenu.name();
        if (event && event.type === 'tap') {
            target = event.target;
        }
        else if (event) {
            target = event.currentTarget;
        }
        // Playback rate menu button doesn't get a vjs-selected class
        // or sets options_['selected'] on the selected playback rate.
        // Thus we get the submenu value based on the labelEl of playbackRateMenuButton
        if (subMenu === 'PlaybackRateMenuButton') {
            const html = this.subMenu.labelEl_.innerHTML;
            setTimeout(() => {
                this.settingsSubMenuValueEl_.innerHTML = html;
            }, 250);
        }
        else {
            // Loop through the submenu items to find the selected child
            for (const subMenuItem of this.subMenu.menu.children_) {
                if (!(subMenuItem instanceof component)) {
                    continue;
                }
                if (subMenuItem.hasClass('vjs-selected')) {
                    const subMenuItemUntyped = subMenuItem;
                    // Prefer to use the function
                    if (typeof subMenuItemUntyped.getLabel === 'function') {
                        this.settingsSubMenuValueEl_.innerHTML = subMenuItemUntyped.getLabel();
                        break;
                    }
                    this.settingsSubMenuValueEl_.innerHTML = this.player().localize(subMenuItemUntyped.options_.label);
                }
            }
        }
        if (target && !target.classList.contains('vjs-back-button')) {
            this.settingsButton.hideDialog();
        }
    }
    bindClickEvents() {
        for (const item of this.subMenu.menu.children()) {
            if (!(item instanceof component)) {
                continue;
            }
            item.on(['tap', 'click'], this.submenuClickHandler);
        }
    }
    // save size of submenus on first init
    // if number of submenu items change dynamically more logic will be needed
    setSize() {
        this.dialog.removeClass('vjs-hidden');
        video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.removeClass(this.settingsSubMenuEl_, 'vjs-hidden');
        this.size = this.settingsButton.getComponentSize(this.settingsSubMenuEl_);
        this.setMargin();
        this.dialog.addClass('vjs-hidden');
        video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
    }
    setMargin() {
        if (!this.size)
            return;
        const [width] = this.size;
        this.settingsSubMenuEl_.style.marginRight = `-${width}px`;
    }
    /**
     * Hide the sub menu
     */
    hideSubMenu() {
        // after removing settings item this.el_ === null
        if (!this.el()) {
            return;
        }
        if (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.hasClass(this.el(), 'open')) {
            video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
            video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.removeClass(this.el(), 'open');
        }
    }
}
SettingsMenuItem.prototype.contentElType = 'button';
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('SettingsMenuItem', SettingsMenuItem);



/***/ }),

/***/ "./src/assets/player/shared/settings/settings-panel-child.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/player/shared/settings/settings-panel-child.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPanelChild": () => (/* binding */ SettingsPanelChild)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class SettingsPanelChild extends Component {
    createEl() {
        return super.createEl('div', {
            className: 'vjs-settings-panel-child',
            innerHTML: '',
            tabIndex: -1
        });
    }
}
Component.registerComponent('SettingsPanelChild', SettingsPanelChild);



/***/ }),

/***/ "./src/assets/player/shared/settings/settings-panel.ts":
/*!*************************************************************!*\
  !*** ./src/assets/player/shared/settings/settings-panel.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPanel": () => (/* binding */ SettingsPanel)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class SettingsPanel extends Component {
    createEl() {
        return super.createEl('div', {
            className: 'vjs-settings-panel',
            innerHTML: '',
            tabIndex: -1
        });
    }
}
Component.registerComponent('SettingsPanel', SettingsPanel);



/***/ }),

/***/ "./src/assets/player/shared/stats/stats-card.ts":
/*!******************************************************!*\
  !*** ./src/assets/player/shared/stats/stats-card.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsCard": () => (/* binding */ StatsCard)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");




const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class StatsCard extends Component {
    constructor() {
        super(...arguments);
        this.metadataStore = {};
        this.intervalMs = 300;
        this.playerNetworkInfo = {};
    }
    createEl() {
        this.containerEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-stats-content'
        });
        this.containerEl.style.display = 'none';
        this.infoListEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
            className: 'vjs-stats-list'
        });
        const closeButton = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
            className: 'vjs-stats-close',
            tabindex: '0',
            title: 'Close stats',
            innerText: '[x]'
        }, { 'aria-label': 'Close stats' });
        closeButton.onclick = () => this.hide();
        this.containerEl.appendChild(closeButton);
        this.containerEl.appendChild(this.infoListEl);
        this.populateInfoBlocks();
        this.player_.on('p2pInfo', (event, data) => {
            if (!data)
                return; // HTTP fallback
            this.mode = data.source;
            const p2pStats = data.p2p;
            const httpStats = data.http;
            this.playerNetworkInfo.downloadSpeed = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(p2pStats.downloadSpeed + httpStats.downloadSpeed).join(' ');
            this.playerNetworkInfo.uploadSpeed = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(p2pStats.uploadSpeed + httpStats.uploadSpeed).join(' ');
            this.playerNetworkInfo.totalDownloaded = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(p2pStats.downloaded + httpStats.downloaded).join(' ');
            this.playerNetworkInfo.totalUploaded = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(p2pStats.uploaded + httpStats.uploaded).join(' ');
            this.playerNetworkInfo.numPeers = p2pStats.numPeers;
            this.playerNetworkInfo.averageBandwidth = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(data.bandwidthEstimate).join(' ') + '/s';
            if (data.source === 'p2p-media-loader') {
                this.playerNetworkInfo.downloadedFromServer = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(httpStats.downloaded).join(' ');
                this.playerNetworkInfo.downloadedFromPeers = (0,_common__WEBPACK_IMPORTED_MODULE_3__.bytes)(p2pStats.downloaded).join(' ');
            }
        });
        return this.containerEl;
    }
    toggle() {
        if (this.updateInterval)
            this.hide();
        else
            this.show();
    }
    show() {
        this.containerEl.style.display = 'block';
        this.updateInterval = setInterval(async () => {
            try {
                const options = this.mode === 'p2p-media-loader'
                    ? this.buildHLSOptions()
                    : await this.buildWebTorrentOptions(); // Default
                this.populateInfoValues(options);
            }
            catch (err) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_1__.logger.error('Cannot update stats.', err);
                clearInterval(this.updateInterval);
            }
        }, this.intervalMs);
    }
    hide() {
        clearInterval(this.updateInterval);
        this.containerEl.style.display = 'none';
    }
    buildHLSOptions() {
        const p2pMediaLoader = this.player_.p2pMediaLoader();
        const level = p2pMediaLoader.getCurrentLevel();
        const codecs = (level === null || level === void 0 ? void 0 : level.videoCodec) || (level === null || level === void 0 ? void 0 : level.audioCodec)
            ? `${(level === null || level === void 0 ? void 0 : level.videoCodec) || ''} / ${(level === null || level === void 0 ? void 0 : level.audioCodec) || ''}`
            : undefined;
        const resolution = `${level === null || level === void 0 ? void 0 : level.height}p${(level === null || level === void 0 ? void 0 : level.attrs['FRAME-RATE']) || ''}`;
        const buffer = this.timeRangesToString(this.player().buffered());
        let progress;
        let latency;
        if (this.options_.videoIsLive) {
            latency = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToTime)(p2pMediaLoader.getLiveLatency());
        }
        else {
            progress = this.player().bufferedPercent();
        }
        return {
            playerNetworkInfo: this.playerNetworkInfo,
            resolution,
            codecs,
            buffer,
            latency,
            progress
        };
    }
    async buildWebTorrentOptions() {
        var _a;
        const videoFile = this.player_.webtorrent().getCurrentVideoFile();
        if (!this.metadataStore[videoFile.fileUrl]) {
            this.metadataStore[videoFile.fileUrl] = await fetch(videoFile.metadataUrl).then(res => res.json());
        }
        const metadata = this.metadataStore[videoFile.fileUrl];
        let colorSpace = 'unknown';
        let codecs = 'unknown';
        if (metadata === null || metadata === void 0 ? void 0 : metadata.streams[0]) {
            const stream = metadata.streams[0];
            colorSpace = stream['color_space'] !== 'unknown'
                ? stream['color_space']
                : 'bt709';
            codecs = stream['codec_name'] || 'avc1';
        }
        const resolution = (videoFile === null || videoFile === void 0 ? void 0 : videoFile.resolution.label) + (videoFile === null || videoFile === void 0 ? void 0 : videoFile.fps);
        const buffer = this.timeRangesToString(this.player().buffered());
        const progress = (_a = this.player_.webtorrent().getTorrent()) === null || _a === void 0 ? void 0 : _a.progress;
        return {
            playerNetworkInfo: this.playerNetworkInfo,
            progress,
            colorSpace,
            codecs,
            resolution,
            buffer
        };
    }
    populateInfoBlocks() {
        this.playerMode = this.buildInfoRow(this.player().localize('Player mode'));
        this.p2p = this.buildInfoRow(this.player().localize('P2P'));
        this.uuid = this.buildInfoRow(this.player().localize('Video UUID'));
        this.viewport = this.buildInfoRow(this.player().localize('Viewport / Frames'));
        this.resolution = this.buildInfoRow(this.player().localize('Resolution'));
        this.volume = this.buildInfoRow(this.player().localize('Volume'));
        this.codecs = this.buildInfoRow(this.player().localize('Codecs'));
        this.color = this.buildInfoRow(this.player().localize('Color'));
        this.connection = this.buildInfoRow(this.player().localize('Connection Speed'));
        this.network = this.buildInfoRow(this.player().localize('Network Activity'));
        this.transferred = this.buildInfoRow(this.player().localize('Total Transfered'));
        this.download = this.buildInfoRow(this.player().localize('Download Breakdown'));
        this.bufferProgress = this.buildInfoRow(this.player().localize('Buffer Progress'));
        this.bufferState = this.buildInfoRow(this.player().localize('Buffer State'));
        this.liveLatency = this.buildInfoRow(this.player().localize('Live Latency'));
        this.infoListEl.appendChild(this.playerMode.root);
        this.infoListEl.appendChild(this.p2p.root);
        this.infoListEl.appendChild(this.uuid.root);
        this.infoListEl.appendChild(this.viewport.root);
        this.infoListEl.appendChild(this.resolution.root);
        this.infoListEl.appendChild(this.volume.root);
        this.infoListEl.appendChild(this.codecs.root);
        this.infoListEl.appendChild(this.color.root);
        this.infoListEl.appendChild(this.connection.root);
        this.infoListEl.appendChild(this.network.root);
        this.infoListEl.appendChild(this.transferred.root);
        this.infoListEl.appendChild(this.download.root);
        this.infoListEl.appendChild(this.bufferProgress.root);
        this.infoListEl.appendChild(this.bufferState.root);
        this.infoListEl.appendChild(this.liveLatency.root);
    }
    populateInfoValues(options) {
        const { playerNetworkInfo, progress, colorSpace, codecs, resolution, buffer, latency } = options;
        const player = this.player();
        const videoQuality = player.getVideoPlaybackQuality();
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const pr = (window.devicePixelRatio || 1).toFixed(2);
        const frames = `${vw}x${vh}*${pr} / ${videoQuality.droppedVideoFrames} dropped of ${videoQuality.totalVideoFrames}`;
        const duration = player.duration();
        let volume = `${Math.round(player.volume() * 100)}`;
        if (player.muted())
            volume += ' (muted)';
        const networkActivity = playerNetworkInfo.downloadSpeed
            ? `${playerNetworkInfo.downloadSpeed} &dArr; / ${playerNetworkInfo.uploadSpeed} &uArr;`
            : undefined;
        const totalTransferred = playerNetworkInfo.totalDownloaded
            ? `${playerNetworkInfo.totalDownloaded} &dArr; / ${playerNetworkInfo.totalUploaded} &uArr;`
            : undefined;
        const downloadBreakdown = playerNetworkInfo.downloadedFromServer
            ? `${playerNetworkInfo.downloadedFromServer} from servers · ${playerNetworkInfo.downloadedFromPeers} from peers`
            : undefined;
        const bufferProgress = progress !== undefined
            ? `${(progress * 100).toFixed(1)}% (${(progress * duration).toFixed(1)}s)`
            : undefined;
        this.setInfoValue(this.playerMode, this.mode || 'HTTP');
        this.setInfoValue(this.p2p, player.localize(this.options_.p2pEnabled ? 'enabled' : 'disabled'));
        this.setInfoValue(this.uuid, this.options_.videoUUID);
        this.setInfoValue(this.viewport, frames);
        this.setInfoValue(this.resolution, resolution);
        this.setInfoValue(this.volume, volume);
        this.setInfoValue(this.codecs, codecs);
        this.setInfoValue(this.color, colorSpace);
        this.setInfoValue(this.connection, playerNetworkInfo.averageBandwidth);
        this.setInfoValue(this.network, networkActivity);
        this.setInfoValue(this.transferred, totalTransferred);
        this.setInfoValue(this.download, downloadBreakdown);
        this.setInfoValue(this.bufferProgress, bufferProgress);
        this.setInfoValue(this.bufferState, buffer);
        this.setInfoValue(this.liveLatency, latency);
    }
    setInfoValue(el, value) {
        if (!value) {
            el.root.style.display = 'none';
            return;
        }
        el.root.style.display = 'block';
        if (el.value.innerHTML === value)
            return;
        el.value.innerHTML = value;
    }
    buildInfoRow(labelText, valueHTML) {
        const root = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div');
        root.style.display = 'none';
        const label = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', { innerText: labelText });
        const value = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', { innerHTML: valueHTML });
        root.appendChild(label);
        root.appendChild(value);
        return { root, value };
    }
    timeRangesToString(r) {
        let result = '';
        for (let i = 0; i < r.length; i++) {
            const start = Math.floor(r.start(i));
            const end = Math.floor(r.end(i));
            result += `[${(0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToTime)(start)}, ${(0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToTime)(end)}] `;
        }
        return result;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('StatsCard', StatsCard);



/***/ }),

/***/ "./src/assets/player/shared/stats/stats-plugin.ts":
/*!********************************************************!*\
  !*** ./src/assets/player/shared/stats/stats-plugin.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsForNerdsPlugin": () => (/* binding */ StatsForNerdsPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stats_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stats-card */ "./src/assets/player/shared/stats/stats-card.ts");


const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class StatsForNerdsPlugin extends Plugin {
    constructor(player, options) {
        const settings = Object.assign({}, options);
        super(player);
        this.player.ready(() => {
            player.addClass('vjs-stats-for-nerds');
        });
        this.statsCard = new _stats_card__WEBPACK_IMPORTED_MODULE_1__.StatsCard(player, options);
        player.addChild(this.statsCard, settings);
    }
    show() {
        this.statsCard.show();
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('stats', StatsForNerdsPlugin);



/***/ }),

/***/ "./src/assets/player/shared/upnext/end-card.ts":
/*!*****************************************************!*\
  !*** ./src/assets/player/shared/upnext/end-card.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

function getMainTemplate(options) {
    return `
    <div class="vjs-upnext-top">
      <span class="vjs-upnext-headtext">${options.headText}</span>
      <div class="vjs-upnext-title"></div>
    </div>
    <div class="vjs-upnext-autoplay-icon">
      <svg height="100%" version="1.1" viewbox="0 0 98 98" width="100%">
        <circle class="vjs-upnext-svg-autoplay-circle" cx="49" cy="49" fill="#000" fill-opacity="0.8" r="48"></circle>
        <circle class="vjs-upnext-svg-autoplay-ring" cx="-49" cy="49" fill-opacity="0" r="46.5"
                stroke="#FFFFFF" stroke-width="4" transform="rotate(-90)"
        ></circle>
        <polygon class="vjs-upnext-svg-autoplay-triangle" fill="#fff" points="32,27 72,49 32,71"></polygon></svg>
    </div>
    <span class="vjs-upnext-bottom">
      <span class="vjs-upnext-cancel">
        <button class="vjs-upnext-cancel-button" tabindex="0" aria-label="Cancel autoplay">${options.cancelText}</button>
      </span>
      <span class="vjs-upnext-suspended">${options.suspendedText}</span>
    </span>
  `;
}
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class EndCard extends Component {
    constructor(player, options) {
        super(player, options);
        this.dashOffsetTotal = 586;
        this.dashOffsetStart = 293;
        this.interval = 50;
        this.upNextEvents = new (video_js__WEBPACK_IMPORTED_MODULE_0___default().EventTarget)();
        this.ticks = 0;
        this.totalTicks = this.options_.timeout / this.interval;
        player.on('ended', (_) => {
            if (!this.options_.condition())
                return;
            player.addClass('vjs-upnext--showing');
            this.showCard((canceled) => {
                player.removeClass('vjs-upnext--showing');
                this.container.style.display = 'none';
                if (!canceled) {
                    this.options_.next();
                }
            });
        });
        player.on('playing', () => {
            this.upNextEvents.trigger('playing');
        });
    }
    createEl() {
        const container = super.createEl('div', {
            className: 'vjs-upnext-content',
            innerHTML: getMainTemplate(this.options_)
        });
        this.container = container;
        container.style.display = 'none';
        this.autoplayRing = container.getElementsByClassName('vjs-upnext-svg-autoplay-ring')[0];
        this.title = container.getElementsByClassName('vjs-upnext-title')[0];
        this.cancelButton = container.getElementsByClassName('vjs-upnext-cancel-button')[0];
        this.suspendedMessage = container.getElementsByClassName('vjs-upnext-suspended')[0];
        this.nextButton = container.getElementsByClassName('vjs-upnext-autoplay-icon')[0];
        this.cancelButton.onclick = () => {
            this.upNextEvents.trigger('cancel');
        };
        this.nextButton.onclick = () => {
            this.upNextEvents.trigger('next');
        };
        return container;
    }
    showCard(cb) {
        let timeout;
        this.autoplayRing.setAttribute('stroke-dasharray', `${this.dashOffsetStart}`);
        this.autoplayRing.setAttribute('stroke-dashoffset', `${-this.dashOffsetStart}`);
        this.title.innerHTML = this.options_.getTitle();
        this.upNextEvents.one('cancel', () => {
            clearTimeout(timeout);
            cb(true);
        });
        this.upNextEvents.one('playing', () => {
            clearTimeout(timeout);
            cb(true);
        });
        this.upNextEvents.one('next', () => {
            clearTimeout(timeout);
            cb(false);
        });
        const goToPercent = (percent) => {
            const newOffset = Math.max(-this.dashOffsetTotal, -this.dashOffsetStart - percent * this.dashOffsetTotal / 2 / 100);
            this.autoplayRing.setAttribute('stroke-dashoffset', '' + newOffset);
        };
        const tick = () => {
            goToPercent((this.ticks++) * 100 / this.totalTicks);
        };
        const update = () => {
            if (this.options_.suspended()) {
                this.suspendedMessage.innerText = this.options_.suspendedText;
                goToPercent(0);
                this.ticks = 0;
                timeout = setTimeout(update.bind(this), 300); // checks once supsended can be a bit longer
            }
            else if (this.ticks >= this.totalTicks) {
                clearTimeout(timeout);
                cb(false);
            }
            else {
                this.suspendedMessage.innerText = '';
                tick();
                timeout = setTimeout(update.bind(this), this.interval);
            }
        };
        this.container.style.display = 'block';
        timeout = setTimeout(update.bind(this), this.interval);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('EndCard', EndCard);


/***/ }),

/***/ "./src/assets/player/shared/upnext/upnext-plugin.ts":
/*!**********************************************************!*\
  !*** ./src/assets/player/shared/upnext/upnext-plugin.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpNextPlugin": () => (/* binding */ UpNextPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class UpNextPlugin extends Plugin {
    constructor(player, options = {}) {
        const settings = {
            next: options.next,
            getTitle: options.getTitle,
            timeout: options.timeout || 5000,
            cancelText: options.cancelText || 'Cancel',
            headText: options.headText || 'Up Next',
            suspendedText: options.suspendedText || 'Autoplay is suspended',
            condition: options.condition,
            suspended: options.suspended
        };
        super(player);
        this.player.ready(() => {
            player.addClass('vjs-upnext');
        });
        player.addChild('EndCard', settings);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('upnext', UpNextPlugin);



/***/ }),

/***/ "./src/root-helpers/web-browser.ts":
/*!*****************************************!*\
  !*** ./src/root-helpers/web-browser.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIOS": () => (/* binding */ isIOS),
/* harmony export */   "isMobile": () => (/* binding */ isMobile),
/* harmony export */   "isSafari": () => (/* binding */ isSafari)
/* harmony export */ });
function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
    }
    // Detect iPad Desktop mode
    return !!(navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        navigator.platform.includes('MacIntel'));
}
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}



/***/ }),

/***/ "./src/shims/path.ts":
/*!***************************!*\
  !*** ./src/shims/path.ts ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(/*! path-browserify */ "./node_modules/path-browserify/index.js");


/***/ }),

/***/ "../shared/core-utils/abuse/abuse-predefined-reasons.ts":
/*!**************************************************************!*\
  !*** ../shared/core-utils/abuse/abuse-predefined-reasons.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abusePredefinedReasonsMap": () => (/* binding */ abusePredefinedReasonsMap)
/* harmony export */ });
const abusePredefinedReasonsMap = {
    violentOrRepulsive: 1 /* AbusePredefinedReasons.VIOLENT_OR_REPULSIVE */,
    hatefulOrAbusive: 2 /* AbusePredefinedReasons.HATEFUL_OR_ABUSIVE */,
    spamOrMisleading: 3 /* AbusePredefinedReasons.SPAM_OR_MISLEADING */,
    privacy: 4 /* AbusePredefinedReasons.PRIVACY */,
    rights: 5 /* AbusePredefinedReasons.RIGHTS */,
    serverRules: 6 /* AbusePredefinedReasons.SERVER_RULES */,
    thumbnails: 7 /* AbusePredefinedReasons.THUMBNAILS */,
    captions: 8 /* AbusePredefinedReasons.CAPTIONS */
};


/***/ }),

/***/ "../shared/core-utils/abuse/index.ts":
/*!*******************************************!*\
  !*** ../shared/core-utils/abuse/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abusePredefinedReasonsMap": () => (/* reexport safe */ _abuse_predefined_reasons__WEBPACK_IMPORTED_MODULE_0__.abusePredefinedReasonsMap)
/* harmony export */ });
/* harmony import */ var _abuse_predefined_reasons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abuse-predefined-reasons */ "../shared/core-utils/abuse/abuse-predefined-reasons.ts");



/***/ }),

/***/ "../shared/core-utils/common/array.ts":
/*!********************************************!*\
  !*** ../shared/core-utils/common/array.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayify": () => (/* binding */ arrayify),
/* harmony export */   "findCommonElement": () => (/* binding */ findCommonElement)
/* harmony export */ });
function findCommonElement(array1, array2) {
    for (const a of array1) {
        for (const b of array2) {
            if (a === b)
                return a;
        }
    }
    return null;
}
// Avoid conflict with other toArray() functions
function arrayify(element) {
    if (Array.isArray(element))
        return element;
    return [element];
}



/***/ }),

/***/ "../shared/core-utils/common/date.ts":
/*!*******************************************!*\
  !*** ../shared/core-utils/common/date.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isLastMonth": () => (/* binding */ isLastMonth),
/* harmony export */   "isLastWeek": () => (/* binding */ isLastWeek),
/* harmony export */   "isThisMonth": () => (/* binding */ isThisMonth),
/* harmony export */   "isThisWeek": () => (/* binding */ isThisWeek),
/* harmony export */   "isToday": () => (/* binding */ isToday),
/* harmony export */   "isYesterday": () => (/* binding */ isYesterday),
/* harmony export */   "secondsToTime": () => (/* binding */ secondsToTime),
/* harmony export */   "timeToInt": () => (/* binding */ timeToInt)
/* harmony export */ });
function isToday(d) {
    const today = new Date();
    return areDatesEqual(d, today);
}
function isYesterday(d) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return areDatesEqual(d, yesterday);
}
function isThisWeek(d) {
    const minDateOfThisWeek = new Date();
    minDateOfThisWeek.setHours(0, 0, 0);
    // getDay() -> Sunday - Saturday : 0 - 6
    // We want to start our week on Monday
    let dayOfWeek = minDateOfThisWeek.getDay() - 1;
    if (dayOfWeek < 0)
        dayOfWeek = 6; // Sunday
    minDateOfThisWeek.setDate(minDateOfThisWeek.getDate() - dayOfWeek);
    return d >= minDateOfThisWeek;
}
function isThisMonth(d) {
    const thisMonth = new Date().getMonth();
    return d.getMonth() === thisMonth;
}
function isLastMonth(d) {
    const now = new Date();
    return getDaysDifferences(now, d) <= 30;
}
function isLastWeek(d) {
    const now = new Date();
    return getDaysDifferences(now, d) <= 7;
}
// ---------------------------------------------------------------------------
function timeToInt(time) {
    if (!time)
        return 0;
    if (typeof time === 'number')
        return time;
    const reg = /^((\d+)[h:])?((\d+)[m:])?((\d+)s?)?$/;
    const matches = time.match(reg);
    if (!matches)
        return 0;
    const hours = parseInt(matches[2] || '0', 10);
    const minutes = parseInt(matches[4] || '0', 10);
    const seconds = parseInt(matches[6] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
}
function secondsToTime(seconds, full = false, symbol) {
    let time = '';
    if (seconds === 0 && !full)
        return '0s';
    const hourSymbol = (symbol || 'h');
    const minuteSymbol = (symbol || 'm');
    const secondsSymbol = full ? '' : 's';
    const hours = Math.floor(seconds / 3600);
    if (hours >= 1)
        time = hours + hourSymbol;
    else if (full)
        time = '0' + hourSymbol;
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 1 && minutes < 10 && full)
        time += '0' + minutes + minuteSymbol;
    else if (minutes >= 1)
        time += minutes + minuteSymbol;
    else if (full)
        time += '00' + minuteSymbol;
    seconds %= 60;
    if (seconds >= 1 && seconds < 10 && full)
        time += '0' + seconds + secondsSymbol;
    else if (seconds >= 1)
        time += seconds + secondsSymbol;
    else if (full)
        time += '00';
    return time;
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
function areDatesEqual(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}
function getDaysDifferences(d1, d2) {
    return (d1.getTime() - d2.getTime()) / (86400000);
}


/***/ }),

/***/ "../shared/core-utils/common/env.ts":
/*!******************************************!*\
  !*** ../shared/core-utils/common/env.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areHttpImportTestsDisabled": () => (/* binding */ areHttpImportTestsDisabled),
/* harmony export */   "areObjectStorageTestsDisabled": () => (/* binding */ areObjectStorageTestsDisabled),
/* harmony export */   "isGithubCI": () => (/* binding */ isGithubCI),
/* harmony export */   "parallelTests": () => (/* binding */ parallelTests)
/* harmony export */ });
function parallelTests() {
    return {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.MOCHA_PARALLEL === 'true';
}
function isGithubCI() {
    return !!{"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.GITHUB_WORKSPACE;
}
function areHttpImportTestsDisabled() {
    const disabled = {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.DISABLE_HTTP_IMPORT_TESTS === 'true';
    if (disabled)
        console.log('DISABLE_HTTP_IMPORT_TESTS env set to "true" so import tests are disabled');
    return disabled;
}
function areObjectStorageTestsDisabled() {
    const disabled = {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.ENABLE_OBJECT_STORAGE_TESTS !== 'true';
    if (disabled)
        console.log('ENABLE_OBJECT_STORAGE_TESTS env is not set to "true" so object storage tests are disabled');
    return disabled;
}



/***/ }),

/***/ "../shared/core-utils/common/index.ts":
/*!********************************************!*\
  !*** ../shared/core-utils/common/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areHttpImportTestsDisabled": () => (/* reexport safe */ _env__WEBPACK_IMPORTED_MODULE_3__.areHttpImportTestsDisabled),
/* harmony export */   "areObjectStorageTestsDisabled": () => (/* reexport safe */ _env__WEBPACK_IMPORTED_MODULE_3__.areObjectStorageTestsDisabled),
/* harmony export */   "arrayify": () => (/* reexport safe */ _array__WEBPACK_IMPORTED_MODULE_0__.arrayify),
/* harmony export */   "buildAbsoluteFixturePath": () => (/* reexport safe */ _path__WEBPACK_IMPORTED_MODULE_5__.buildAbsoluteFixturePath),
/* harmony export */   "buildPath": () => (/* reexport safe */ _path__WEBPACK_IMPORTED_MODULE_5__.buildPath),
/* harmony export */   "buildPlaylistEmbedLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildPlaylistEmbedLink),
/* harmony export */   "buildPlaylistEmbedPath": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildPlaylistEmbedPath),
/* harmony export */   "buildPlaylistLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildPlaylistLink),
/* harmony export */   "buildPlaylistWatchPath": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildPlaylistWatchPath),
/* harmony export */   "buildVideoEmbedLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildVideoEmbedLink),
/* harmony export */   "buildVideoEmbedPath": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildVideoEmbedPath),
/* harmony export */   "buildVideoLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildVideoLink),
/* harmony export */   "buildVideoWatchPath": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.buildVideoWatchPath),
/* harmony export */   "compareSemVer": () => (/* reexport safe */ _version__WEBPACK_IMPORTED_MODULE_10__.compareSemVer),
/* harmony export */   "decoratePlaylistLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.decoratePlaylistLink),
/* harmony export */   "decorateVideoLink": () => (/* reexport safe */ _url__WEBPACK_IMPORTED_MODULE_9__.decorateVideoLink),
/* harmony export */   "findCommonElement": () => (/* reexport safe */ _array__WEBPACK_IMPORTED_MODULE_0__.findCommonElement),
/* harmony export */   "getKeys": () => (/* reexport safe */ _object__WEBPACK_IMPORTED_MODULE_4__.getKeys),
/* harmony export */   "getLowercaseExtension": () => (/* reexport safe */ _path__WEBPACK_IMPORTED_MODULE_5__.getLowercaseExtension),
/* harmony export */   "isCatchable": () => (/* reexport safe */ _promises__WEBPACK_IMPORTED_MODULE_8__.isCatchable),
/* harmony export */   "isGithubCI": () => (/* reexport safe */ _env__WEBPACK_IMPORTED_MODULE_3__.isGithubCI),
/* harmony export */   "isLastMonth": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isLastMonth),
/* harmony export */   "isLastWeek": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isLastWeek),
/* harmony export */   "isPromise": () => (/* reexport safe */ _promises__WEBPACK_IMPORTED_MODULE_8__.isPromise),
/* harmony export */   "isThisMonth": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isThisMonth),
/* harmony export */   "isThisWeek": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isThisWeek),
/* harmony export */   "isToday": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isToday),
/* harmony export */   "isYesterday": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.isYesterday),
/* harmony export */   "parallelTests": () => (/* reexport safe */ _env__WEBPACK_IMPORTED_MODULE_3__.parallelTests),
/* harmony export */   "pick": () => (/* reexport safe */ _object__WEBPACK_IMPORTED_MODULE_4__.pick),
/* harmony export */   "randomInt": () => (/* reexport safe */ _random__WEBPACK_IMPORTED_MODULE_1__.randomInt),
/* harmony export */   "removeFragmentedMP4Ext": () => (/* reexport safe */ _regexp__WEBPACK_IMPORTED_MODULE_6__.removeFragmentedMP4Ext),
/* harmony export */   "root": () => (/* reexport safe */ _path__WEBPACK_IMPORTED_MODULE_5__.root),
/* harmony export */   "secondsToTime": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.secondsToTime),
/* harmony export */   "sortObjectComparator": () => (/* reexport safe */ _object__WEBPACK_IMPORTED_MODULE_4__.sortObjectComparator),
/* harmony export */   "timeToInt": () => (/* reexport safe */ _date__WEBPACK_IMPORTED_MODULE_2__.timeToInt),
/* harmony export */   "uuidRegex": () => (/* reexport safe */ _regexp__WEBPACK_IMPORTED_MODULE_6__.uuidRegex),
/* harmony export */   "wait": () => (/* reexport safe */ _time__WEBPACK_IMPORTED_MODULE_7__.wait)
/* harmony export */ });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "../shared/core-utils/common/array.ts");
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random */ "../shared/core-utils/common/random.ts");
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date */ "../shared/core-utils/common/date.ts");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env */ "../shared/core-utils/common/env.ts");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./object */ "../shared/core-utils/common/object.ts");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./path */ "../shared/core-utils/common/path.ts");
/* harmony import */ var _regexp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./regexp */ "../shared/core-utils/common/regexp.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./time */ "../shared/core-utils/common/time.ts");
/* harmony import */ var _promises__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./promises */ "../shared/core-utils/common/promises.ts");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./url */ "../shared/core-utils/common/url.ts");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./version */ "../shared/core-utils/common/version.ts");













/***/ }),

/***/ "../shared/core-utils/common/object.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/common/object.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getKeys": () => (/* binding */ getKeys),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "sortObjectComparator": () => (/* binding */ sortObjectComparator)
/* harmony export */ });
function pick(object, keys) {
    const result = {};
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            result[key] = object[key];
        }
    }
    return result;
}
function getKeys(object, keys) {
    return Object.keys(object).filter(k => keys.includes(k));
}
function sortObjectComparator(key, order) {
    return (a, b) => {
        if (a[key] < b[key]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    };
}



/***/ }),

/***/ "../shared/core-utils/common/path.ts":
/*!*******************************************!*\
  !*** ../shared/core-utils/common/path.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

var __dirname = "/";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildAbsoluteFixturePath": () => (/* binding */ buildAbsoluteFixturePath),
/* harmony export */   "buildPath": () => (/* binding */ buildPath),
/* harmony export */   "getLowercaseExtension": () => (/* binding */ getLowercaseExtension),
/* harmony export */   "root": () => (/* binding */ root)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./src/shims/path.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);

let rootPath;
function root() {
    if (rootPath)
        return rootPath;
    rootPath = __dirname;
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'tools')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'scripts')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'common')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'core-utils')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'shared')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'server')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.basename)(rootPath) === 'dist')
        rootPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(rootPath, '..');
    return rootPath;
}
function buildPath(path) {
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.isAbsolute)(path))
        return path;
    return (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(root(), path);
}
function getLowercaseExtension(filename) {
    const ext = (0,path__WEBPACK_IMPORTED_MODULE_0__.extname)(filename) || '';
    return ext.toLowerCase();
}
function buildAbsoluteFixturePath(path, customCIPath = false) {
    if ((0,path__WEBPACK_IMPORTED_MODULE_0__.isAbsolute)(path))
        return path;
    if (customCIPath && {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.GITHUB_WORKSPACE) {
        return (0,path__WEBPACK_IMPORTED_MODULE_0__.join)({"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\maxgr\\AppData\\Roaming","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132489640548937052","COLOR":"1","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"LAPTOP-FNOE0GL8","ComSpec":"C:\\WINDOWS\\system32\\cmd.exe","dp0":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","HOME":"C:\\Users\\maxgr","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\maxgr","INIT_CWD":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","LOCALAPPDATA":"C:\\Users\\maxgr\\AppData\\Local","LOGONSERVER":"\\\\LAPTOP-FNOE0GL8","NODE":"C:\\Program Files\\nodejs\\node.exe","npm_command":"run-script","npm_config_cache":"C:\\Users\\maxgr\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\maxgr\\.npm-init.js","npm_config_local_prefix":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_msvs_version":"2019","npm_config_node_gyp":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\maxgr\\AppData\\Roaming\\npm","npm_config_python":"c:\\python27\\python.exe","npm_config_userconfig":"C:\\Users\\maxgr\\.npmrc","npm_config_user_agent":"npm/8.6.0 node/v14.18.1 win32 x64 workspaces/false","npm_execpath":"C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"webpack","npm_lifecycle_script":"webpack \"--config\" \"webpack/webpack.video-embed.js\" \"--mode\" \"development\" \"--watch\"","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\package.json","npm_package_name":"peertube-client","npm_package_version":"4.2.2","NUMBER_OF_PROCESSORS":"12","OneDrive":"C:\\Users\\maxgr\\OneDrive","OneDriveConsumer":"C:\\Users\\maxgr\\OneDrive","OnlineServices":"Online Services","OS":"Windows_NT","Path":"C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\client\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\PeerTube-bst\\node_modules\\.bin;C:\\inetpub2022\\bastyon-player\\node_modules\\.bin;C:\\inetpub2022\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\maxgr\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.4;C:\\Program Files (x86)\\iis express\\PHP\\v7.0;C:\\Python27\\;C:\\Python27\\Scripts;C:\\Python39\\Scripts\\;C:\\Python39\\;C:\\Program Files (x86)\\iis express\\PHP\\v5.6;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\PHP\\v5.6;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm;C:\\Program Files\\Git\\cmd;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Program Files (x86)\\Yarn\\bin\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\Window;C:\\Program Files\\nodejs\\;C:\\Program Files\\dotnet\\;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\maxgr\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files\\Android\\Android Studio\\Gradle\\gradle-6.6\\bin;C:\\Users\\maxgr\\AppData\\Local\\Yarn\\bin;C:\\Users\\maxgr\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\maxgr\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW","platformcode":"KV","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 165 Stepping 2, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"a502","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","RegionCode":"EMEA","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\WINDOWS","TEMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","TMP":"C:\\Users\\maxgr\\AppData\\Local\\Temp","USERDOMAIN":"LAPTOP-FNOE0GL8","USERDOMAIN_ROAMINGPROFILE":"LAPTOP-FNOE0GL8","USERNAME":"maxgr","USERPROFILE":"C:\\Users\\maxgr","windir":"C:\\WINDOWS","_prog":"node"}.GITHUB_WORKSPACE, 'fixtures', path);
    }
    return (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(root(), 'server', 'tests', 'fixtures', path);
}



/***/ }),

/***/ "../shared/core-utils/common/random.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/common/random.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomInt": () => (/* binding */ randomInt)
/* harmony export */ });
// high excluded
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}



/***/ }),

/***/ "../shared/core-utils/common/regexp.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/common/regexp.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeFragmentedMP4Ext": () => (/* binding */ removeFragmentedMP4Ext),
/* harmony export */   "uuidRegex": () => (/* binding */ uuidRegex)
/* harmony export */ });
const uuidRegex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
function removeFragmentedMP4Ext(path) {
    return path.replace(/-fragmented.mp4$/i, '');
}


/***/ }),

/***/ "../shared/core-utils/common/time.ts":
/*!*******************************************!*\
  !*** ../shared/core-utils/common/time.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wait": () => (/* binding */ wait)
/* harmony export */ });
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



/***/ }),

/***/ "../shared/core-utils/common/url.ts":
/*!******************************************!*\
  !*** ../shared/core-utils/common/url.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildPlaylistEmbedLink": () => (/* binding */ buildPlaylistEmbedLink),
/* harmony export */   "buildPlaylistEmbedPath": () => (/* binding */ buildPlaylistEmbedPath),
/* harmony export */   "buildPlaylistLink": () => (/* binding */ buildPlaylistLink),
/* harmony export */   "buildPlaylistWatchPath": () => (/* binding */ buildPlaylistWatchPath),
/* harmony export */   "buildVideoEmbedLink": () => (/* binding */ buildVideoEmbedLink),
/* harmony export */   "buildVideoEmbedPath": () => (/* binding */ buildVideoEmbedPath),
/* harmony export */   "buildVideoLink": () => (/* binding */ buildVideoLink),
/* harmony export */   "buildVideoWatchPath": () => (/* binding */ buildVideoWatchPath),
/* harmony export */   "decoratePlaylistLink": () => (/* binding */ decoratePlaylistLink),
/* harmony export */   "decorateVideoLink": () => (/* binding */ decorateVideoLink)
/* harmony export */ });
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "../shared/core-utils/common/date.ts");

function buildPlaylistLink(playlist, base) {
    return (base !== null && base !== void 0 ? base : window.location.origin) + buildPlaylistWatchPath(playlist);
}
function buildPlaylistWatchPath(playlist) {
    return '/w/p/' + playlist.shortUUID;
}
function buildVideoWatchPath(video) {
    return '/w/' + video.shortUUID;
}
function buildVideoLink(video, base) {
    return (base !== null && base !== void 0 ? base : window.location.origin) + buildVideoWatchPath(video);
}
function buildPlaylistEmbedPath(playlist) {
    return '/video-playlists/embed/' + playlist.uuid;
}
function buildPlaylistEmbedLink(playlist, base) {
    return (base !== null && base !== void 0 ? base : window.location.origin) + buildPlaylistEmbedPath(playlist);
}
function buildVideoEmbedPath(video) {
    return '/videos/embed/' + video.uuid;
}
function buildVideoEmbedLink(video, base) {
    return (base !== null && base !== void 0 ? base : window.location.origin) + buildVideoEmbedPath(video);
}
function decorateVideoLink(options) {
    const { url } = options;
    const params = new URLSearchParams();
    if (options.startTime !== undefined && options.startTime !== null) {
        const startTimeInt = Math.floor(options.startTime);
        params.set('start', (0,_date__WEBPACK_IMPORTED_MODULE_0__.secondsToTime)(startTimeInt));
    }
    if (options.stopTime) {
        const stopTimeInt = Math.floor(options.stopTime);
        params.set('stop', (0,_date__WEBPACK_IMPORTED_MODULE_0__.secondsToTime)(stopTimeInt));
    }
    if (options.subtitle)
        params.set('subtitle', options.subtitle);
    if (options.loop === true)
        params.set('loop', '1');
    if (options.autoplay === true)
        params.set('autoplay', '1');
    if (options.muted === true)
        params.set('muted', '1');
    if (options.title === false)
        params.set('title', '0');
    if (options.warningTitle === false)
        params.set('warningTitle', '0');
    if (options.controls === false)
        params.set('controls', '0');
    if (options.controlBar === false)
        params.set('controlBar', '0');
    if (options.peertubeLink === false)
        params.set('peertubeLink', '0');
    if (options.p2p !== undefined)
        params.set('p2p', options.p2p ? '1' : '0');
    return buildUrl(url, params);
}
function decoratePlaylistLink(options) {
    const { url } = options;
    const params = new URLSearchParams();
    if (options.playlistPosition)
        params.set('playlistPosition', '' + options.playlistPosition);
    return buildUrl(url, params);
}
// ---------------------------------------------------------------------------

function buildUrl(url, params) {
    let hasParams = false;
    params.forEach(() => { hasParams = true; });
    if (hasParams)
        return url + '?' + params.toString();
    return url;
}


/***/ }),

/***/ "../shared/core-utils/common/version.ts":
/*!**********************************************!*\
  !*** ../shared/core-utils/common/version.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareSemVer": () => (/* binding */ compareSemVer)
/* harmony export */ });
// Thanks https://stackoverflow.com/a/16187766
function compareSemVer(a, b) {
    const regExStrip0 = /(\.0+)+$/;
    const segmentsA = a.replace(regExStrip0, '').split('.');
    const segmentsB = b.replace(regExStrip0, '').split('.');
    const l = Math.min(segmentsA.length, segmentsB.length);
    for (let i = 0; i < l; i++) {
        const diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff)
            return diff;
    }
    return segmentsA.length - segmentsB.length;
}



/***/ }),

/***/ "../shared/core-utils/i18n/i18n.ts":
/*!*****************************************!*\
  !*** ../shared/core-utils/i18n/i18n.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I18N_LOCALES": () => (/* binding */ I18N_LOCALES),
/* harmony export */   "LOCALE_FILES": () => (/* binding */ LOCALE_FILES),
/* harmony export */   "POSSIBLE_LOCALES": () => (/* binding */ POSSIBLE_LOCALES),
/* harmony export */   "buildFileLocale": () => (/* binding */ buildFileLocale),
/* harmony export */   "getCompleteLocale": () => (/* binding */ getCompleteLocale),
/* harmony export */   "getDefaultLocale": () => (/* binding */ getDefaultLocale),
/* harmony export */   "getShortLocale": () => (/* binding */ getShortLocale),
/* harmony export */   "is18nLocale": () => (/* binding */ is18nLocale),
/* harmony export */   "is18nPath": () => (/* binding */ is18nPath),
/* harmony export */   "isDefaultLocale": () => (/* binding */ isDefaultLocale),
/* harmony export */   "peertubeTranslate": () => (/* binding */ peertubeTranslate)
/* harmony export */ });
const LOCALE_FILES = ['player', 'server'];
const I18N_LOCALES = {
    // Always first to avoid issues when using express acceptLanguages function when no accept language header is set
    'en-US': 'English',
    'ar': 'العربية',
    'ca-ES': 'Català',
    'cs-CZ': 'Čeština',
    'de-DE': 'Deutsch',
    'el-GR': 'ελληνικά',
    'eo': 'Esperanto',
    'es-ES': 'Español',
    'eu-ES': 'Euskara',
    'fi-FI': 'suomi',
    'fr-FR': 'Français',
    'gd': 'Gàidhlig',
    'gl-ES': 'galego',
    'hr': 'hrvatski',
    'hu-HU': 'magyar',
    'fa-IR': 'فارسی',
    'it-IT': 'Italiano',
    'ja-JP': '日本語',
    'kab': 'Taqbaylit',
    'nl-NL': 'Nederlands',
    'oc': 'Occitan',
    'pl-PL': 'Polski',
    'pt-BR': 'Português (Brasil)',
    'pt-PT': 'Português (Portugal)',
    'ru-RU': 'русский',
    'sq': 'Shqip',
    'sv-SE': 'Svenska',
    'nn': 'norsk nynorsk',
    'nb-NO': 'norsk bokmål',
    'th-TH': 'ไทย',
    'vi-VN': 'Tiếng Việt',
    'tok': 'Toki Pona',
    'zh-Hans-CN': '简体中文（中国）',
    'zh-Hant-TW': '繁體中文（台灣）'
};
const I18N_LOCALE_ALIAS = {
    'ar-001': 'ar',
    'ca': 'ca-ES',
    'cs': 'cs-CZ',
    'de': 'de-DE',
    'el': 'el-GR',
    'en': 'en-US',
    'es': 'es-ES',
    'eu': 'eu-ES',
    'fi': 'fi-FI',
    'gl': 'gl-ES',
    'fa': 'fa-IR',
    'fr': 'fr-FR',
    'hu': 'hu-HU',
    'it': 'it-IT',
    'ja': 'ja-JP',
    'nl': 'nl-NL',
    'pl': 'pl-PL',
    'pt': 'pt-BR',
    'nb': 'nb-NO',
    'ru': 'ru-RU',
    'sv': 'sv-SE',
    'th': 'th-TH',
    'vi': 'vi-VN',
    'zh-CN': 'zh-Hans-CN',
    'zh-Hans': 'zh-Hans-CN',
    'zh-Hant': 'zh-Hant-TW',
    'zh-TW': 'zh-Hant-TW',
    'zh': 'zh-Hans-CN'
};
const POSSIBLE_LOCALES = Object.keys(I18N_LOCALES)
    .concat(Object.keys(I18N_LOCALE_ALIAS));
function getDefaultLocale() {
    return 'en-US';
}
function isDefaultLocale(locale) {
    return getCompleteLocale(locale) === getCompleteLocale(getDefaultLocale());
}
function peertubeTranslate(str, translations) {
    if (!translations || !translations[str])
        return str;
    return translations[str];
}
const possiblePaths = POSSIBLE_LOCALES.map(l => '/' + l);
function is18nPath(path) {
    return possiblePaths.includes(path);
}
function is18nLocale(locale) {
    return POSSIBLE_LOCALES.includes(locale);
}
function getCompleteLocale(locale) {
    if (!locale)
        return locale;
    if (I18N_LOCALE_ALIAS[locale])
        return I18N_LOCALE_ALIAS[locale];
    return locale;
}
function getShortLocale(locale) {
    if (locale.includes('-') === false)
        return locale;
    return locale.split('-')[0];
}
function buildFileLocale(locale) {
    return getCompleteLocale(locale);
}


/***/ }),

/***/ "../shared/core-utils/i18n/index.ts":
/*!******************************************!*\
  !*** ../shared/core-utils/i18n/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I18N_LOCALES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.I18N_LOCALES),
/* harmony export */   "LOCALE_FILES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.LOCALE_FILES),
/* harmony export */   "POSSIBLE_LOCALES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.POSSIBLE_LOCALES),
/* harmony export */   "buildFileLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.buildFileLocale),
/* harmony export */   "getCompleteLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.getCompleteLocale),
/* harmony export */   "getDefaultLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.getDefaultLocale),
/* harmony export */   "getShortLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.getShortLocale),
/* harmony export */   "is18nLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.is18nLocale),
/* harmony export */   "is18nPath": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.is18nPath),
/* harmony export */   "isDefaultLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.isDefaultLocale),
/* harmony export */   "peertubeTranslate": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.peertubeTranslate)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "../shared/core-utils/i18n/i18n.ts");



/***/ }),

/***/ "../shared/core-utils/index.ts":
/*!*************************************!*\
  !*** ../shared/core-utils/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_RULES": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.COMPLETE_RULES),
/* harmony export */   "ENHANCED_RULES": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.ENHANCED_RULES),
/* harmony export */   "ENHANCED_WITH_HTML_RULES": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.ENHANCED_WITH_HTML_RULES),
/* harmony export */   "I18N_LOCALES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.I18N_LOCALES),
/* harmony export */   "LOCALE_FILES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.LOCALE_FILES),
/* harmony export */   "POSSIBLE_LOCALES": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.POSSIBLE_LOCALES),
/* harmony export */   "TEXT_RULES": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.TEXT_RULES),
/* harmony export */   "TEXT_WITH_HTML_RULES": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.TEXT_WITH_HTML_RULES),
/* harmony export */   "USER_ROLE_LABELS": () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.USER_ROLE_LABELS),
/* harmony export */   "abusePredefinedReasonsMap": () => (/* reexport safe */ _abuse__WEBPACK_IMPORTED_MODULE_0__.abusePredefinedReasonsMap),
/* harmony export */   "areHttpImportTestsDisabled": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.areHttpImportTestsDisabled),
/* harmony export */   "areObjectStorageTestsDisabled": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.areObjectStorageTestsDisabled),
/* harmony export */   "arrayify": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.arrayify),
/* harmony export */   "buildAbsoluteFixturePath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildAbsoluteFixturePath),
/* harmony export */   "buildFileLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.buildFileLocale),
/* harmony export */   "buildPath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildPath),
/* harmony export */   "buildPlaylistEmbedLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildPlaylistEmbedLink),
/* harmony export */   "buildPlaylistEmbedPath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildPlaylistEmbedPath),
/* harmony export */   "buildPlaylistLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildPlaylistLink),
/* harmony export */   "buildPlaylistWatchPath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildPlaylistWatchPath),
/* harmony export */   "buildVideoEmbedLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildVideoEmbedLink),
/* harmony export */   "buildVideoEmbedPath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildVideoEmbedPath),
/* harmony export */   "buildVideoLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildVideoLink),
/* harmony export */   "buildVideoWatchPath": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.buildVideoWatchPath),
/* harmony export */   "compareSemVer": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.compareSemVer),
/* harmony export */   "decoratePlaylistLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.decoratePlaylistLink),
/* harmony export */   "decorateVideoLink": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.decorateVideoLink),
/* harmony export */   "escapeHTML": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.escapeHTML),
/* harmony export */   "findCommonElement": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.findCommonElement),
/* harmony export */   "getAllPrivacies": () => (/* reexport safe */ _videos__WEBPACK_IMPORTED_MODULE_6__.getAllPrivacies),
/* harmony export */   "getAverageBitrate": () => (/* reexport safe */ _videos__WEBPACK_IMPORTED_MODULE_6__.getAverageBitrate),
/* harmony export */   "getCompleteLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.getCompleteLocale),
/* harmony export */   "getCustomMarkupSanitizeOptions": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.getCustomMarkupSanitizeOptions),
/* harmony export */   "getDefaultLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.getDefaultLocale),
/* harmony export */   "getDefaultSanitizeOptions": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.getDefaultSanitizeOptions),
/* harmony export */   "getHookType": () => (/* reexport safe */ _plugins__WEBPACK_IMPORTED_MODULE_3__.getHookType),
/* harmony export */   "getKeys": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.getKeys),
/* harmony export */   "getLowercaseExtension": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.getLowercaseExtension),
/* harmony export */   "getMaxBitrate": () => (/* reexport safe */ _videos__WEBPACK_IMPORTED_MODULE_6__.getMaxBitrate),
/* harmony export */   "getMinLimitBitrate": () => (/* reexport safe */ _videos__WEBPACK_IMPORTED_MODULE_6__.getMinLimitBitrate),
/* harmony export */   "getShortLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.getShortLocale),
/* harmony export */   "getTextOnlySanitizeOptions": () => (/* reexport safe */ _renderer__WEBPACK_IMPORTED_MODULE_4__.getTextOnlySanitizeOptions),
/* harmony export */   "hasUserRight": () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.hasUserRight),
/* harmony export */   "internalRunHook": () => (/* reexport safe */ _plugins__WEBPACK_IMPORTED_MODULE_3__.internalRunHook),
/* harmony export */   "is18nLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.is18nLocale),
/* harmony export */   "is18nPath": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.is18nPath),
/* harmony export */   "isCatchable": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isCatchable),
/* harmony export */   "isDefaultLocale": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.isDefaultLocale),
/* harmony export */   "isGithubCI": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isGithubCI),
/* harmony export */   "isLastMonth": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isLastMonth),
/* harmony export */   "isLastWeek": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isLastWeek),
/* harmony export */   "isPromise": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isPromise),
/* harmony export */   "isThisMonth": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isThisMonth),
/* harmony export */   "isThisWeek": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isThisWeek),
/* harmony export */   "isToday": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isToday),
/* harmony export */   "isYesterday": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.isYesterday),
/* harmony export */   "parallelTests": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.parallelTests),
/* harmony export */   "peertubeTranslate": () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_2__.peertubeTranslate),
/* harmony export */   "pick": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.pick),
/* harmony export */   "randomInt": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.randomInt),
/* harmony export */   "removeFragmentedMP4Ext": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.removeFragmentedMP4Ext),
/* harmony export */   "root": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.root),
/* harmony export */   "secondsToTime": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.secondsToTime),
/* harmony export */   "sortObjectComparator": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.sortObjectComparator),
/* harmony export */   "timeToInt": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.timeToInt),
/* harmony export */   "uuidRegex": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.uuidRegex),
/* harmony export */   "wait": () => (/* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_1__.wait)
/* harmony export */ });
/* harmony import */ var _abuse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abuse */ "../shared/core-utils/abuse/index.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "../shared/core-utils/common/index.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n */ "../shared/core-utils/i18n/index.ts");
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins */ "../shared/core-utils/plugins/index.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderer */ "../shared/core-utils/renderer/index.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users */ "../shared/core-utils/users/index.ts");
/* harmony import */ var _videos__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./videos */ "../shared/core-utils/videos/index.ts");









/***/ }),

/***/ "../shared/core-utils/plugins/index.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/plugins/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHookType": () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_0__.getHookType),
/* harmony export */   "internalRunHook": () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_0__.internalRunHook)
/* harmony export */ });
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hooks */ "../shared/core-utils/plugins/hooks.ts");



/***/ }),

/***/ "../shared/core-utils/renderer/html.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/renderer/html.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escapeHTML": () => (/* binding */ escapeHTML),
/* harmony export */   "getCustomMarkupSanitizeOptions": () => (/* binding */ getCustomMarkupSanitizeOptions),
/* harmony export */   "getDefaultSanitizeOptions": () => (/* binding */ getDefaultSanitizeOptions),
/* harmony export */   "getTextOnlySanitizeOptions": () => (/* binding */ getTextOnlySanitizeOptions)
/* harmony export */ });
function getDefaultSanitizeOptions() {
    return {
        allowedTags: ['a', 'p', 'span', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
        allowedSchemes: ['http', 'https'],
        allowedAttributes: {
            'a': ['href', 'class', 'target', 'rel'],
            '*': ['data-*']
        },
        transformTags: {
            a: (tagName, attribs) => {
                let rel = 'noopener noreferrer';
                if (attribs.rel === 'me')
                    rel += ' me';
                return {
                    tagName,
                    attribs: Object.assign(attribs, {
                        target: '_blank',
                        rel
                    })
                };
            }
        }
    };
}
function getTextOnlySanitizeOptions() {
    return {
        allowedTags: []
    };
}
function getCustomMarkupSanitizeOptions(additionalAllowedTags = []) {
    const base = getDefaultSanitizeOptions();
    return {
        allowedTags: [
            ...base.allowedTags,
            ...additionalAllowedTags,
            'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'
        ],
        allowedSchemes: base.allowedSchemes,
        allowedAttributes: Object.assign(Object.assign({}, base.allowedAttributes), { 'img': ['src', 'alt'], '*': ['data-*', 'style'] })
    };
}
// Thanks: https://stackoverflow.com/a/12034334
function escapeHTML(stringParam) {
    if (!stringParam)
        return '';
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return String(stringParam).replace(/[&<>"'`=/]/g, s => entityMap[s]);
}


/***/ }),

/***/ "../shared/core-utils/renderer/index.ts":
/*!**********************************************!*\
  !*** ../shared/core-utils/renderer/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_RULES": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_0__.COMPLETE_RULES),
/* harmony export */   "ENHANCED_RULES": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_0__.ENHANCED_RULES),
/* harmony export */   "ENHANCED_WITH_HTML_RULES": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_0__.ENHANCED_WITH_HTML_RULES),
/* harmony export */   "TEXT_RULES": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_0__.TEXT_RULES),
/* harmony export */   "TEXT_WITH_HTML_RULES": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_0__.TEXT_WITH_HTML_RULES),
/* harmony export */   "escapeHTML": () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_1__.escapeHTML),
/* harmony export */   "getCustomMarkupSanitizeOptions": () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_1__.getCustomMarkupSanitizeOptions),
/* harmony export */   "getDefaultSanitizeOptions": () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_1__.getDefaultSanitizeOptions),
/* harmony export */   "getTextOnlySanitizeOptions": () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_1__.getTextOnlySanitizeOptions)
/* harmony export */ });
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown */ "../shared/core-utils/renderer/markdown.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html */ "../shared/core-utils/renderer/html.ts");




/***/ }),

/***/ "../shared/core-utils/renderer/markdown.ts":
/*!*************************************************!*\
  !*** ../shared/core-utils/renderer/markdown.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_RULES": () => (/* binding */ COMPLETE_RULES),
/* harmony export */   "ENHANCED_RULES": () => (/* binding */ ENHANCED_RULES),
/* harmony export */   "ENHANCED_WITH_HTML_RULES": () => (/* binding */ ENHANCED_WITH_HTML_RULES),
/* harmony export */   "TEXT_RULES": () => (/* binding */ TEXT_RULES),
/* harmony export */   "TEXT_WITH_HTML_RULES": () => (/* binding */ TEXT_WITH_HTML_RULES)
/* harmony export */ });
const TEXT_RULES = [
    'linkify',
    'autolink',
    'emphasis',
    'link',
    'newline',
    'entity',
    'list'
];
const TEXT_WITH_HTML_RULES = TEXT_RULES.concat([
    'html_inline',
    'html_block'
]);
const ENHANCED_RULES = TEXT_RULES.concat(['image']);
const ENHANCED_WITH_HTML_RULES = TEXT_WITH_HTML_RULES.concat(['image']);
const COMPLETE_RULES = ENHANCED_WITH_HTML_RULES.concat([
    'block',
    'inline',
    'heading',
    'paragraph'
]);


/***/ }),

/***/ "../shared/core-utils/users/index.ts":
/*!*******************************************!*\
  !*** ../shared/core-utils/users/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "USER_ROLE_LABELS": () => (/* reexport safe */ _user_role__WEBPACK_IMPORTED_MODULE_0__.USER_ROLE_LABELS),
/* harmony export */   "hasUserRight": () => (/* reexport safe */ _user_role__WEBPACK_IMPORTED_MODULE_0__.hasUserRight)
/* harmony export */ });
/* harmony import */ var _user_role__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role */ "../shared/core-utils/users/user-role.ts");



/***/ }),

/***/ "../shared/core-utils/users/user-role.ts":
/*!***********************************************!*\
  !*** ../shared/core-utils/users/user-role.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "USER_ROLE_LABELS": () => (/* binding */ USER_ROLE_LABELS),
/* harmony export */   "hasUserRight": () => (/* binding */ hasUserRight)
/* harmony export */ });
const USER_ROLE_LABELS = {
    [2 /* UserRole.USER */]: 'User',
    [1 /* UserRole.MODERATOR */]: 'Moderator',
    [0 /* UserRole.ADMINISTRATOR */]: 'Administrator'
};
const userRoleRights = {
    [0 /* UserRole.ADMINISTRATOR */]: [
        0 /* UserRight.ALL */
    ],
    [1 /* UserRole.MODERATOR */]: [
        12 /* UserRight.MANAGE_VIDEO_BLACKLIST */,
        6 /* UserRight.MANAGE_ABUSES */,
        13 /* UserRight.MANAGE_ANY_VIDEO_CHANNEL */,
        14 /* UserRight.REMOVE_ANY_VIDEO */,
        15 /* UserRight.REMOVE_ANY_VIDEO_PLAYLIST */,
        16 /* UserRight.REMOVE_ANY_VIDEO_COMMENT */,
        17 /* UserRight.UPDATE_ANY_VIDEO */,
        20 /* UserRight.SEE_ALL_VIDEOS */,
        10 /* UserRight.MANAGE_ACCOUNTS_BLOCKLIST */,
        11 /* UserRight.MANAGE_SERVERS_BLOCKLIST */,
        1 /* UserRight.MANAGE_USERS */,
        21 /* UserRight.SEE_ALL_COMMENTS */
    ],
    [2 /* UserRole.USER */]: []
};
function hasUserRight(userRole, userRight) {
    const userRights = userRoleRights[userRole];
    return userRights.includes(0 /* UserRight.ALL */) || userRights.includes(userRight);
}


/***/ }),

/***/ "../shared/core-utils/videos/bitrate.ts":
/*!**********************************************!*\
  !*** ../shared/core-utils/videos/bitrate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAverageBitrate": () => (/* binding */ getAverageBitrate),
/* harmony export */   "getMaxBitrate": () => (/* binding */ getMaxBitrate),
/* harmony export */   "getMinLimitBitrate": () => (/* binding */ getMinLimitBitrate)
/* harmony export */ });
// https://bitmovin.com/video-bitrate-streaming-hls-dash/
const minLimitBitPerPixel = {
    [0 /* VideoResolution.H_NOVIDEO */]: 0,
    [144 /* VideoResolution.H_144P */]: 0.02,
    [240 /* VideoResolution.H_240P */]: 0.02,
    [360 /* VideoResolution.H_360P */]: 0.02,
    [480 /* VideoResolution.H_480P */]: 0.02,
    [720 /* VideoResolution.H_720P */]: 0.02,
    [1080 /* VideoResolution.H_1080P */]: 0.02,
    [1440 /* VideoResolution.H_1440P */]: 0.02,
    [2160 /* VideoResolution.H_4K */]: 0.02
};
const averageBitPerPixel = {
    [0 /* VideoResolution.H_NOVIDEO */]: 0,
    [144 /* VideoResolution.H_144P */]: 0.19,
    [240 /* VideoResolution.H_240P */]: 0.17,
    [360 /* VideoResolution.H_360P */]: 0.15,
    [480 /* VideoResolution.H_480P */]: 0.12,
    [720 /* VideoResolution.H_720P */]: 0.11,
    [1080 /* VideoResolution.H_1080P */]: 0.10,
    [1440 /* VideoResolution.H_1440P */]: 0.09,
    [2160 /* VideoResolution.H_4K */]: 0.08
};
const maxBitPerPixel = {
    [0 /* VideoResolution.H_NOVIDEO */]: 0,
    [144 /* VideoResolution.H_144P */]: 0.32,
    [240 /* VideoResolution.H_240P */]: 0.29,
    [360 /* VideoResolution.H_360P */]: 0.26,
    [480 /* VideoResolution.H_480P */]: 0.22,
    [720 /* VideoResolution.H_720P */]: 0.19,
    [1080 /* VideoResolution.H_1080P */]: 0.17,
    [1440 /* VideoResolution.H_1440P */]: 0.16,
    [2160 /* VideoResolution.H_4K */]: 0.14
};
function getAverageBitrate(options) {
    const targetBitrate = calculateBitrate(Object.assign(Object.assign({}, options), { bitPerPixel: averageBitPerPixel }));
    if (!targetBitrate)
        return 192 * 1000;
    return targetBitrate;
}
function getMaxBitrate(options) {
    const targetBitrate = calculateBitrate(Object.assign(Object.assign({}, options), { bitPerPixel: maxBitPerPixel }));
    if (!targetBitrate)
        return 256 * 1000;
    return targetBitrate;
}
function getMinLimitBitrate(options) {
    const minLimitBitrate = calculateBitrate(Object.assign(Object.assign({}, options), { bitPerPixel: minLimitBitPerPixel }));
    if (!minLimitBitrate)
        return 10 * 1000;
    return minLimitBitrate;
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
function calculateBitrate(options) {
    const { bitPerPixel, resolution, ratio, fps } = options;
    const resolutionsOrder = [
        2160 /* VideoResolution.H_4K */,
        1440 /* VideoResolution.H_1440P */,
        1080 /* VideoResolution.H_1080P */,
        720 /* VideoResolution.H_720P */,
        480 /* VideoResolution.H_480P */,
        360 /* VideoResolution.H_360P */,
        240 /* VideoResolution.H_240P */,
        144 /* VideoResolution.H_144P */,
        0 /* VideoResolution.H_NOVIDEO */
    ];
    for (const toTestResolution of resolutionsOrder) {
        if (toTestResolution <= resolution) {
            return Math.floor(resolution * resolution * ratio * fps * bitPerPixel[toTestResolution]);
        }
    }
    throw new Error('Unknown resolution ' + resolution);
}


/***/ }),

/***/ "../shared/core-utils/videos/index.ts":
/*!********************************************!*\
  !*** ../shared/core-utils/videos/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllPrivacies": () => (/* reexport safe */ _privacy__WEBPACK_IMPORTED_MODULE_1__.getAllPrivacies),
/* harmony export */   "getAverageBitrate": () => (/* reexport safe */ _bitrate__WEBPACK_IMPORTED_MODULE_0__.getAverageBitrate),
/* harmony export */   "getMaxBitrate": () => (/* reexport safe */ _bitrate__WEBPACK_IMPORTED_MODULE_0__.getMaxBitrate),
/* harmony export */   "getMinLimitBitrate": () => (/* reexport safe */ _bitrate__WEBPACK_IMPORTED_MODULE_0__.getMinLimitBitrate)
/* harmony export */ });
/* harmony import */ var _bitrate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bitrate */ "../shared/core-utils/videos/bitrate.ts");
/* harmony import */ var _privacy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privacy */ "../shared/core-utils/videos/privacy.ts");




/***/ }),

/***/ "../shared/core-utils/videos/privacy.ts":
/*!**********************************************!*\
  !*** ../shared/core-utils/videos/privacy.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllPrivacies": () => (/* binding */ getAllPrivacies)
/* harmony export */ });
function getAllPrivacies() {
    return [1 /* VideoPrivacy.PUBLIC */, 4 /* VideoPrivacy.INTERNAL */, 3 /* VideoPrivacy.PRIVATE */, 2 /* VideoPrivacy.UNLISTED */];
}



/***/ })

}]);
//# sourceMappingURL=src_assets_player_peertube-player-manager_ts.chunk.js.map