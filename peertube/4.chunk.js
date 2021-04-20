(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "../shared/core-utils/renderer/html.ts":
/*!*********************************************!*\
  !*** ../shared/core-utils/renderer/html.ts ***!
  \*********************************************/
/*! exports provided: SANITIZE_OPTIONS, escapeHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SANITIZE_OPTIONS", function() { return SANITIZE_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHTML", function() { return escapeHTML; });
const SANITIZE_OPTIONS = {
    allowedTags: ['a', 'p', 'span', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    allowedSchemes: ['http', 'https'],
    allowedAttributes: {
        a: ['href', 'class', 'target', 'rel']
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
/*! exports provided: TEXT_RULES, TEXT_WITH_HTML_RULES, ENHANCED_RULES, ENHANCED_WITH_HTML_RULES, COMPLETE_RULES, SANITIZE_OPTIONS, escapeHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown */ "../shared/core-utils/renderer/markdown.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TEXT_RULES", function() { return _markdown__WEBPACK_IMPORTED_MODULE_0__["TEXT_RULES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TEXT_WITH_HTML_RULES", function() { return _markdown__WEBPACK_IMPORTED_MODULE_0__["TEXT_WITH_HTML_RULES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ENHANCED_RULES", function() { return _markdown__WEBPACK_IMPORTED_MODULE_0__["ENHANCED_RULES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ENHANCED_WITH_HTML_RULES", function() { return _markdown__WEBPACK_IMPORTED_MODULE_0__["ENHANCED_WITH_HTML_RULES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COMPLETE_RULES", function() { return _markdown__WEBPACK_IMPORTED_MODULE_0__["COMPLETE_RULES"]; });

/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html */ "../shared/core-utils/renderer/html.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SANITIZE_OPTIONS", function() { return _html__WEBPACK_IMPORTED_MODULE_1__["SANITIZE_OPTIONS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeHTML", function() { return _html__WEBPACK_IMPORTED_MODULE_1__["escapeHTML"]; });





/***/ }),

/***/ "../shared/core-utils/renderer/markdown.ts":
/*!*************************************************!*\
  !*** ../shared/core-utils/renderer/markdown.ts ***!
  \*************************************************/
/*! exports provided: TEXT_RULES, TEXT_WITH_HTML_RULES, ENHANCED_RULES, ENHANCED_WITH_HTML_RULES, COMPLETE_RULES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_RULES", function() { return TEXT_RULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_WITH_HTML_RULES", function() { return TEXT_WITH_HTML_RULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENHANCED_RULES", function() { return ENHANCED_RULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENHANCED_WITH_HTML_RULES", function() { return ENHANCED_WITH_HTML_RULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPLETE_RULES", function() { return COMPLETE_RULES; });
const TEXT_RULES = [
    'linkify',
    'autolink',
    'emphasis',
    'link',
    'newline',
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

/***/ "./src/assets/player/bezels/bezels-plugin.ts":
/*!***************************************************!*\
  !*** ./src/assets/player/bezels/bezels-plugin.ts ***!
  \***************************************************/
/*! exports provided: BezelsPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BezelsPlugin", function() { return BezelsPlugin; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pause_bezel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pause-bezel */ "./src/assets/player/bezels/pause-bezel.ts");


const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getPlugin('plugin');
class BezelsPlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.player.ready(() => {
            player.addClass('vjs-bezels');
        });
        player.addChild('PauseBezel', options);
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerPlugin('bezels', BezelsPlugin);



/***/ }),

/***/ "./src/assets/player/bezels/pause-bezel.ts":
/*!*************************************************!*\
  !*** ./src/assets/player/bezels/pause-bezel.ts ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

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
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
class PauseBezel extends Component {
    constructor(player, options) {
        super(player, options);
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('PauseBezel', PauseBezel);


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/redundancy-url-manager.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/redundancy-url-manager.ts ***!
  \**********************************************************************/
/*! exports provided: RedundancyUrlManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedundancyUrlManager", function() { return RedundancyUrlManager; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./node_modules/node-libs-browser/node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);

class RedundancyUrlManager {
    constructor(baseUrls = []) {
        this.baseUrls = baseUrls;
        // empty
    }
    removeBySegmentUrl(segmentUrl) {
        console.log('Removing redundancy of segment URL %s.', segmentUrl);
        const baseUrl = Object(path__WEBPACK_IMPORTED_MODULE_0__["dirname"])(segmentUrl);
        this.baseUrls = this.baseUrls.filter(u => u !== baseUrl && u !== baseUrl + '/');
    }
    buildUrl(url) {
        const max = this.baseUrls.length + 1;
        const i = this.getRandomInt(max);
        if (i === max - 1)
            return url;
        const newBaseUrl = this.baseUrls[i];
        const slashPart = newBaseUrl.endsWith('/') ? '' : '/';
        return newBaseUrl + slashPart + Object(path__WEBPACK_IMPORTED_MODULE_0__["basename"])(url);
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

/***/ "./src/assets/player/p2p-media-loader/segment-url-builder.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/segment-url-builder.ts ***!
  \*******************************************************************/
/*! exports provided: segmentUrlBuilderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segmentUrlBuilderFactory", function() { return segmentUrlBuilderFactory; });
function segmentUrlBuilderFactory(redundancyUrlManager) {
    return function segmentBuilder(segment) {
        return redundancyUrlManager.buildUrl(segment.url);
    };
}
// ---------------------------------------------------------------------------



/***/ }),

/***/ "./src/assets/player/p2p-media-loader/segment-validator.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/segment-validator.ts ***!
  \*****************************************************************/
/*! exports provided: segmentValidatorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segmentValidatorFactory", function() { return segmentValidatorFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _root_helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root-helpers/utils */ "./src/root-helpers/utils.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "./node_modules/node-libs-browser/node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);



const maxRetries = 3;
function segmentValidatorFactory(segmentsSha256Url, isLive) {
    let segmentsJSON = fetchSha256Segments(segmentsSha256Url);
    const regex = /bytes=(\d+)-(\d+)/;
    return function segmentValidator(segment, _method, _peerId, retry = 1) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // Wait for hash generation from the server
            if (isLive)
                yield Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["wait"])(1000);
            const filename = Object(path__WEBPACK_IMPORTED_MODULE_2__["basename"])(segment.url);
            const segmentValue = (yield segmentsJSON)[filename];
            if (!segmentValue && retry > maxRetries) {
                throw new Error(`Unknown segment name ${filename} in segment validator`);
            }
            if (!segmentValue) {
                console.log('Refetching sha segments for %s.', filename);
                yield Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["wait"])(1000);
                segmentsJSON = fetchSha256Segments(segmentsSha256Url);
                yield segmentValidator(segment, _method, _peerId, retry + 1);
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
            const calculatedSha = yield sha256Hex(segment.data);
            if (calculatedSha !== hashShouldBe) {
                throw new Error(`Hashes does not correspond for segment ${filename}/${range}` +
                    `(expected: ${hashShouldBe} instead of ${calculatedSha})`);
            }
        });
    };
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
function fetchSha256Segments(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => {
        console.error('Cannot get sha256 segments', err);
        return {};
    });
}
function sha256Hex(data) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        if (!data)
            return undefined;
        if (window.crypto.subtle) {
            return window.crypto.subtle.digest('SHA-256', data)
                .then(data => bufferToHex(data));
        }
        // Fallback for non HTTPS context
        const shaModule = yield __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.t.bind(null, /*! sha.js */ "./node_modules/sha.js/index.js", 7));
        return new shaModule.sha256().update(Buffer.from(data)).digest('hex');
    });
}
// Thanks: https://stackoverflow.com/a/53307879
function bufferToHex(buffer) {
    if (!buffer)
        return '';
    let s = '';
    const h = '0123456789abcdef';
    const o = new Uint8Array(buffer);
    o.forEach((v) => s += h[v >> 4] + h[v & 15]);
    return s;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/node-libs-browser/node_modules/buffer/index.js */ "./node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/assets/player/peertube-player-local-storage.ts":
/*!************************************************************!*\
  !*** ./src/assets/player/peertube-player-local-storage.ts ***!
  \************************************************************/
/*! exports provided: getStoredVolume, getStoredP2PEnabled, getStoredMute, getStoredTheater, saveVolumeInStore, saveMuteInStore, saveTheaterInStore, saveAverageBandwidth, getAverageBandwidthInStore, saveLastSubtitle, getStoredLastSubtitle, saveVideoWatchHistory, getStoredVideoWatchHistory, cleanupVideoWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredVolume", function() { return getStoredVolume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredP2PEnabled", function() { return getStoredP2PEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredMute", function() { return getStoredMute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredTheater", function() { return getStoredTheater; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveVolumeInStore", function() { return saveVolumeInStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveMuteInStore", function() { return saveMuteInStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveTheaterInStore", function() { return saveTheaterInStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveAverageBandwidth", function() { return saveAverageBandwidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAverageBandwidthInStore", function() { return getAverageBandwidthInStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveLastSubtitle", function() { return saveLastSubtitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredLastSubtitle", function() { return getStoredLastSubtitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveVideoWatchHistory", function() { return saveVideoWatchHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoredVideoWatchHistory", function() { return getStoredVideoWatchHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanupVideoWatch", function() { return cleanupVideoWatch; });
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
function getStoredP2PEnabled() {
    const value = getLocalStorage('webtorrent_enabled');
    if (value !== null && value !== undefined)
        return value === 'true';
    // By default webtorrent is enabled
    return true;
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
        data = JSON.parse(getLocalStorage('video-watch-history'));
    }
    catch (error) {
        console.error('Cannot parse video watch history from local storage: ', error);
    }
    data = data || {};
    if (videoUUID)
        return data[videoUUID];
    return data;
}
function cleanupVideoWatch() {
    const data = getStoredVideoWatchHistory();
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
/*! exports provided: PeertubePlayerManager, videojs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeertubePlayerManager", function() { return PeertubePlayerManager; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var videojs_hotkeys_videojs_hotkeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! videojs-hotkeys/videojs.hotkeys */ "./node_modules/videojs-hotkeys/videojs.hotkeys.js");
/* harmony import */ var videojs_hotkeys_videojs_hotkeys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(videojs_hotkeys_videojs_hotkeys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var videojs_dock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! videojs-dock */ "./node_modules/videojs-dock/dist/videojs-dock.es.js");
/* harmony import */ var videojs_contextmenu_pt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! videojs-contextmenu-pt */ "./node_modules/videojs-contextmenu-pt/dist/videojs-contextmenu-pt.es.js");
/* harmony import */ var videojs_contrib_quality_levels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! videojs-contrib-quality-levels */ "./node_modules/videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.es.js");
/* harmony import */ var _upnext_end_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./upnext/end-card */ "./src/assets/player/upnext/end-card.ts");
/* harmony import */ var _upnext_upnext_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./upnext/upnext-plugin */ "./src/assets/player/upnext/upnext-plugin.ts");
/* harmony import */ var _bezels_bezels_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bezels/bezels-plugin */ "./src/assets/player/bezels/bezels-plugin.ts");
/* harmony import */ var _peertube_plugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./peertube-plugin */ "./src/assets/player/peertube-plugin.ts");
/* harmony import */ var _videojs_components_next_previous_video_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./videojs-components/next-previous-video-button */ "./src/assets/player/videojs-components/next-previous-video-button.ts");
/* harmony import */ var _videojs_components_p2p_info_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./videojs-components/p2p-info-button */ "./src/assets/player/videojs-components/p2p-info-button.ts");
/* harmony import */ var _videojs_components_peertube_link_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./videojs-components/peertube-link-button */ "./src/assets/player/videojs-components/peertube-link-button.ts");
/* harmony import */ var _videojs_components_peertube_load_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./videojs-components/peertube-load-progress-bar */ "./src/assets/player/videojs-components/peertube-load-progress-bar.ts");
/* harmony import */ var _videojs_components_resolution_menu_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./videojs-components/resolution-menu-button */ "./src/assets/player/videojs-components/resolution-menu-button.ts");
/* harmony import */ var _videojs_components_resolution_menu_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./videojs-components/resolution-menu-item */ "./src/assets/player/videojs-components/resolution-menu-item.ts");
/* harmony import */ var _videojs_components_settings_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./videojs-components/settings-dialog */ "./src/assets/player/videojs-components/settings-dialog.ts");
/* harmony import */ var _videojs_components_settings_menu_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./videojs-components/settings-menu-button */ "./src/assets/player/videojs-components/settings-menu-button.ts");
/* harmony import */ var _videojs_components_settings_menu_item__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./videojs-components/settings-menu-item */ "./src/assets/player/videojs-components/settings-menu-item.ts");
/* harmony import */ var _videojs_components_settings_panel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./videojs-components/settings-panel */ "./src/assets/player/videojs-components/settings-panel.ts");
/* harmony import */ var _videojs_components_settings_panel_child__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./videojs-components/settings-panel-child */ "./src/assets/player/videojs-components/settings-panel-child.ts");
/* harmony import */ var _videojs_components_theater_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./videojs-components/theater-button */ "./src/assets/player/videojs-components/theater-button.ts");
/* harmony import */ var _playlist_playlist_plugin__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./playlist/playlist-plugin */ "./src/assets/player/playlist/playlist-plugin.ts");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "videojs", function() { return video_js__WEBPACK_IMPORTED_MODULE_22___default.a; });
/* harmony import */ var _shared_core_utils_i18n__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @shared/core-utils/i18n */ "../shared/core-utils/i18n/index.ts");
/* harmony import */ var _p2p_media_loader_redundancy_url_manager__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./p2p-media-loader/redundancy-url-manager */ "./src/assets/player/p2p-media-loader/redundancy-url-manager.ts");
/* harmony import */ var _p2p_media_loader_segment_url_builder__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./p2p-media-loader/segment-url-builder */ "./src/assets/player/p2p-media-loader/segment-url-builder.ts");
/* harmony import */ var _p2p_media_loader_segment_validator__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./p2p-media-loader/segment-validator */ "./src/assets/player/p2p-media-loader/segment-validator.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");
/* harmony import */ var _translations_manager__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./translations-manager */ "./src/assets/player/translations-manager.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./utils */ "./src/assets/player/utils.ts");
/* harmony import */ var _root_helpers_utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../root-helpers/utils */ "./src/root-helpers/utils.ts");































// Change 'Playback Rate' to 'Speed' (smaller for our settings menu)
video_js__WEBPACK_IMPORTED_MODULE_22___default.a.getComponent('PlaybackRateMenuButton').prototype.controlText_ = 'Speed';
const CaptionsButton = video_js__WEBPACK_IMPORTED_MODULE_22___default.a.getComponent('CaptionsButton');
// Change Captions to Subtitles/CC
CaptionsButton.prototype.controlText_ = 'Subtitles/CC';
// We just want to display 'Off' instead of 'captions off', keep a space so the variable == true (hacky I know)
CaptionsButton.prototype.label_ = ' ';
class PeertubePlayerManager {
    static initState() {
        PeertubePlayerManager.alreadyPlayed = false;
    }
    static initialize(mode, options, onPlayerChange) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let p2pMediaLoader;
            this.onPlayerChange = onPlayerChange;
            this.playerElementClassName = options.common.playerElement.className;
            if (mode === 'webtorrent')
                yield Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./webtorrent/webtorrent-plugin */ "./src/assets/player/webtorrent/webtorrent-plugin.ts"));
            if (mode === 'p2p-media-loader') {
                [p2pMediaLoader] = yield Promise.all([
                    Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(8)]).then(__webpack_require__.t.bind(null, /*! p2p-media-loader-hlsjs */ "./node_modules/p2p-media-loader-hlsjs/dist/index.js", 7)),
                    Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(9), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ./p2p-media-loader/p2p-media-loader-plugin */ "./src/assets/player/p2p-media-loader/p2p-media-loader-plugin.ts"))
                ]);
            }
            const videojsOptions = this.getVideojsOptions(mode, options, p2pMediaLoader);
            yield _translations_manager__WEBPACK_IMPORTED_MODULE_28__["TranslationsManager"].loadLocaleInVideoJS(options.common.serverUrl, options.common.language, video_js__WEBPACK_IMPORTED_MODULE_22___default.a);
            const self = this;
            return new Promise(res => {
                video_js__WEBPACK_IMPORTED_MODULE_22___default()(options.common.playerElement, videojsOptions, function () {
                    const player = this;
                    let alreadyFallback = false;
                    player.tech(true).one('error', () => {
                        if (!alreadyFallback)
                            self.maybeFallbackToWebTorrent(mode, player, options);
                        alreadyFallback = true;
                    });
                    player.one('error', () => {
                        if (!alreadyFallback)
                            self.maybeFallbackToWebTorrent(mode, player, options);
                        alreadyFallback = true;
                    });
                    player.one('play', () => {
                        PeertubePlayerManager.alreadyPlayed = true;
                    });
                    self.addContextMenu(mode, player, options.common.embedUrl, options.common.embedTitle);
                    player.bezels();
                    return res(player);
                });
            });
        });
    }
    static maybeFallbackToWebTorrent(currentMode, player, options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (currentMode === 'webtorrent')
                return;
            console.log('Fallback to webtorrent.');
            const newVideoElement = document.createElement('video');
            newVideoElement.className = this.playerElementClassName;
            // VideoJS wraps our video element inside a div
            let currentParentPlayerElement = options.common.playerElement.parentNode;
            // Fix on IOS, don't ask me why
            if (!currentParentPlayerElement)
                currentParentPlayerElement = document.getElementById(options.common.playerElement.id).parentNode;
            currentParentPlayerElement.parentNode.insertBefore(newVideoElement, currentParentPlayerElement);
            options.common.playerElement = newVideoElement;
            options.common.onPlayerElementChange(newVideoElement);
            player.dispose();
            yield Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./webtorrent/webtorrent-plugin */ "./src/assets/player/webtorrent/webtorrent-plugin.ts"));
            const mode = 'webtorrent';
            const videojsOptions = this.getVideojsOptions(mode, options);
            const self = this;
            video_js__WEBPACK_IMPORTED_MODULE_22___default()(newVideoElement, videojsOptions, function () {
                const player = this;
                self.addContextMenu(mode, player, options.common.embedUrl, options.common.embedTitle);
                PeertubePlayerManager.onPlayerChange(player);
            });
        });
    }
    static getVideojsOptions(mode, options, p2pMediaLoaderModule) {
        const commonOptions = options.common;
        const isHLS = mode === 'p2p-media-loader';
        let autoplay = this.getAutoPlayValue(commonOptions.autoplay);
        let html5 = {
            preloadTextTracks: false
        };
        const plugins = {
            peertube: {
                mode,
                autoplay,
                videoViewUrl: commonOptions.videoViewUrl,
                videoDuration: commonOptions.videoDuration,
                userWatching: commonOptions.userWatching,
                subtitle: commonOptions.subtitle,
                videoCaptions: commonOptions.videoCaptions,
                stopTime: commonOptions.stopTime,
                isLive: commonOptions.isLive,
                videoUUID: commonOptions.videoUUID
            }
        };
        if (commonOptions.playlist) {
            plugins.playlist = commonOptions.playlist;
        }
        if (commonOptions.enableHotkeys === true) {
            PeertubePlayerManager.addHotkeysOptions(plugins);
        }
        if (isHLS) {
            const { hlsjs } = PeertubePlayerManager.addP2PMediaLoaderOptions(plugins, options, p2pMediaLoaderModule);
            Object.assign(html5, hlsjs.html5);
        }
        if (mode === 'webtorrent') {
            PeertubePlayerManager.addWebTorrentOptions(plugins, options);
            // WebTorrent plugin handles autoplay, because we do some hackish stuff in there
            autoplay = false;
        }
        const videojsOptions = {
            html5,
            // We don't use text track settings for now
            textTrackSettings: false,
            controls: commonOptions.controls !== undefined ? commonOptions.controls : true,
            loop: commonOptions.loop !== undefined ? commonOptions.loop : false,
            muted: commonOptions.muted !== undefined
                ? commonOptions.muted
                : undefined,
            autoplay: this.getAutoPlayValue(autoplay),
            poster: commonOptions.poster,
            inactivityTimeout: commonOptions.inactivityTimeout,
            playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            plugins,
            controlBar: {
                children: this.getControlBarChildren(mode, {
                    captions: commonOptions.captions,
                    peertubeLink: commonOptions.peertubeLink,
                    theaterButton: commonOptions.theaterButton,
                    nextVideo: commonOptions.nextVideo,
                    hasNextVideo: commonOptions.hasNextVideo,
                    previousVideo: commonOptions.previousVideo,
                    hasPreviousVideo: commonOptions.hasPreviousVideo
                }) // FIXME: typings
            }
        };
        if (commonOptions.language && !Object(_shared_core_utils_i18n__WEBPACK_IMPORTED_MODULE_23__["isDefaultLocale"])(commonOptions.language)) {
            Object.assign(videojsOptions, { language: commonOptions.language });
        }
        return videojsOptions;
    }
    static addP2PMediaLoaderOptions(plugins, options, p2pMediaLoaderModule) {
        const p2pMediaLoaderOptions = options.p2pMediaLoader;
        const commonOptions = options.common;
        const trackerAnnounce = p2pMediaLoaderOptions.trackerAnnounce
            .filter(t => t.startsWith('ws'));
        const redundancyUrlManager = new _p2p_media_loader_redundancy_url_manager__WEBPACK_IMPORTED_MODULE_24__["RedundancyUrlManager"](options.p2pMediaLoader.redundancyBaseUrls);
        const p2pMediaLoader = {
            redundancyUrlManager,
            type: 'application/x-mpegURL',
            startTime: commonOptions.startTime,
            src: p2pMediaLoaderOptions.playlistUrl
        };
        let consumeOnly = false;
        // FIXME: typings
        if (navigator && navigator.connection && navigator.connection.type === 'cellular') {
            console.log('We are on a cellular connection: disabling seeding.');
            consumeOnly = true;
        }
        const p2pMediaLoaderConfig = {
            loader: {
                trackerAnnounce,
                segmentValidator: Object(_p2p_media_loader_segment_validator__WEBPACK_IMPORTED_MODULE_26__["segmentValidatorFactory"])(options.p2pMediaLoader.segmentsSha256Url, options.common.isLive),
                rtcConfig: Object(_utils__WEBPACK_IMPORTED_MODULE_29__["getRtcConfig"])(),
                requiredSegmentsPriority: 1,
                segmentUrlBuilder: Object(_p2p_media_loader_segment_url_builder__WEBPACK_IMPORTED_MODULE_25__["segmentUrlBuilderFactory"])(redundancyUrlManager),
                useP2P: Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_27__["getStoredP2PEnabled"])(),
                consumeOnly
            },
            segments: {
                swarmId: p2pMediaLoaderOptions.playlistUrl
            }
        };
        const hlsjs = {
            levelLabelHandler: (level) => {
                const resolution = Math.min(level.height || 0, level.width || 0);
                const file = p2pMediaLoaderOptions.videoFiles.find(f => f.resolution.id === resolution);
                // We don't have files for live videos
                if (!file)
                    return level.height;
                let label = file.resolution.label;
                if (file.fps >= 50)
                    label += file.fps;
                return label;
            },
            html5: {
                hlsjsConfig: {
                    capLevelToPlayerSize: true,
                    autoStartLoad: false,
                    liveSyncDurationCount: 5,
                    loader: new p2pMediaLoaderModule.Engine(p2pMediaLoaderConfig).createLoaderClass()
                }
            }
        };
        const toAssign = { p2pMediaLoader, hlsjs };
        Object.assign(plugins, toAssign);
        return toAssign;
    }
    static addWebTorrentOptions(plugins, options) {
        const commonOptions = options.common;
        const webtorrentOptions = options.webtorrent;
        const autoplay = this.getAutoPlayValue(commonOptions.autoplay) === 'play'
            ? true
            : false;
        const webtorrent = {
            autoplay,
            videoDuration: commonOptions.videoDuration,
            playerElement: commonOptions.playerElement,
            videoFiles: webtorrentOptions.videoFiles,
            startTime: commonOptions.startTime
        };
        Object.assign(plugins, { webtorrent });
    }
    static getControlBarChildren(mode, options) {
        const settingEntries = [];
        const loadProgressBar = mode === 'webtorrent' ? 'peerTubeLoadProgressBar' : 'loadProgressBar';
        // Keep an order
        settingEntries.push('playbackRateMenuButton');
        if (options.captions === true)
            settingEntries.push('captionsButton');
        settingEntries.push('resolutionMenuButton');
        const children = {};
        if (options.previousVideo) {
            const buttonOptions = {
                type: 'previous',
                handler: options.previousVideo,
                isDisabled: () => {
                    if (!options.hasPreviousVideo)
                        return false;
                    return !options.hasPreviousVideo();
                }
            };
            Object.assign(children, {
                'previousVideoButton': buttonOptions
            });
        }
        Object.assign(children, { playToggle: {} });
        if (options.nextVideo) {
            const buttonOptions = {
                type: 'next',
                handler: options.nextVideo,
                isDisabled: () => {
                    if (!options.hasNextVideo)
                        return false;
                    return !options.hasNextVideo();
                }
            };
            Object.assign(children, {
                'nextVideoButton': buttonOptions
            });
        }
        Object.assign(children, {
            'currentTimeDisplay': {},
            'timeDivider': {},
            'durationDisplay': {},
            'liveDisplay': {},
            'flexibleWidthSpacer': {},
            'progressControl': {
                children: {
                    'seekBar': {
                        children: {
                            [loadProgressBar]: {},
                            'mouseTimeDisplay': {},
                            'playProgressBar': {}
                        }
                    }
                }
            },
            'p2PInfoButton': {},
            'muteToggle': {},
            'volumeControl': {},
            'settingsButton': {
                setup: {
                    maxHeightOffset: 40
                },
                entries: settingEntries
            }
        });
        if (options.peertubeLink === true) {
            Object.assign(children, {
                'peerTubeLinkButton': {}
            });
        }
        if (options.theaterButton === true) {
            Object.assign(children, {
                'theaterButton': {}
            });
        }
        Object.assign(children, {
            'fullscreenToggle': {}
        });
        return children;
    }
    static addContextMenu(mode, player, videoEmbedUrl, videoEmbedTitle) {
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
                        Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_30__["copyToClipboard"])(Object(_utils__WEBPACK_IMPORTED_MODULE_29__["buildVideoLink"])());
                    }
                },
                {
                    label: player.localize('Copy the video URL at the current time'),
                    listener: function () {
                        Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_30__["copyToClipboard"])(Object(_utils__WEBPACK_IMPORTED_MODULE_29__["buildVideoLink"])({ startTime: this.currentTime() }));
                    }
                },
                {
                    icon: 'code',
                    label: player.localize('Copy embed code'),
                    listener: () => {
                        Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_30__["copyToClipboard"])(Object(_utils__WEBPACK_IMPORTED_MODULE_29__["buildVideoOrPlaylistEmbed"])(videoEmbedUrl, videoEmbedTitle));
                    }
                }
            ];
            if (mode === 'webtorrent') {
                items.push({
                    label: player.localize('Copy magnet URI'),
                    listener: function () {
                        Object(_root_helpers_utils__WEBPACK_IMPORTED_MODULE_30__["copyToClipboard"])(this.webtorrent().getCurrentVideoFile().magnetUri);
                    }
                });
            }
            return items.map(i => (Object.assign(Object.assign({}, i), { label: `<span class="vjs-icon-${i.icon || 'link-2'}"></span>` + i.label })));
        };
        // adding the menu
        //player.contextmenuUI({ content })
    }
    static addHotkeysOptions(plugins) {
        const isNaked = (event, key) => (!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && event.key === key);
        Object.assign(plugins, {
            hotkeys: {
                skipInitialFocus: true,
                enableInactiveFocus: false,
                captureDocumentHotkeys: true,
                documentHotkeysFocusElementFilter: (e) => {
                    const tagName = e.tagName.toLowerCase();
                    return e.id === 'content' || tagName === 'body' || tagName === 'video';
                },
                enableVolumeScroll: false,
                enableModifiersForNumbers: false,
                rewindKey: function (event) {
                    return isNaked(event, 'ArrowLeft');
                },
                forwardKey: function (event) {
                    return isNaked(event, 'ArrowRight');
                },
                fullscreenKey: function (event) {
                    // fullscreen with the f key or Ctrl+Enter
                    return isNaked(event, 'f') || (!event.altKey && event.ctrlKey && event.key === 'Enter');
                },
                customKeys: {
                    increasePlaybackRateKey: {
                        key: function (event) {
                            return isNaked(event, '>');
                        },
                        handler: function (player) {
                            const newValue = Math.min(player.playbackRate() + 0.1, 5);
                            player.playbackRate(parseFloat(newValue.toFixed(2)));
                        }
                    },
                    decreasePlaybackRateKey: {
                        key: function (event) {
                            return isNaked(event, '<');
                        },
                        handler: function (player) {
                            const newValue = Math.max(player.playbackRate() - 0.1, 0.10);
                            player.playbackRate(parseFloat(newValue.toFixed(2)));
                        }
                    },
                    frameByFrame: {
                        key: function (event) {
                            return isNaked(event, '.');
                        },
                        handler: function (player) {
                            player.pause();
                            // Calculate movement distance (assuming 30 fps)
                            const dist = 1 / 30;
                            player.currentTime(player.currentTime() + dist);
                        }
                    }
                }
            }
        });
    }
    static getAutoPlayValue(autoplay) {
        if (autoplay !== true)
            return autoplay;
        // On first play, disable autoplay to avoid issues
        // But if the player already played videos, we can safely autoplay next ones
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_29__["isIOS"])() || Object(_utils__WEBPACK_IMPORTED_MODULE_29__["isSafari"])()) {
            return PeertubePlayerManager.alreadyPlayed ? 'play' : false;
        }
        return 'play';
    }
}
PeertubePlayerManager.alreadyPlayed = false;
// ############################################################################



/***/ }),

/***/ "./src/assets/player/peertube-plugin.ts":
/*!**********************************************!*\
  !*** ./src/assets/player/peertube-plugin.ts ***!
  \**********************************************/
/*! exports provided: PeerTubePlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeerTubePlugin", function() { return PeerTubePlugin; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _videojs_components_settings_menu_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videojs-components/settings-menu-button */ "./src/assets/player/videojs-components/settings-menu-button.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/assets/player/utils.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");




const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getPlugin('plugin');
class PeerTubePlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.CONSTANTS = {
            USER_WATCHING_VIDEO_INTERVAL: 5000 // Every 5 seconds, notify the user is watching the video
        };
        this.menuOpened = false;
        this.mouseInControlBar = false;
        this.videoViewUrl = options.videoViewUrl;
        this.videoDuration = options.videoDuration;
        this.videoCaptions = options.videoCaptions;
        this.isLive = options.isLive;
        this.savedInactivityTimeout = player.options_.inactivityTimeout;
        if (options.autoplay)
            this.player.addClass('vjs-has-autoplay');
        this.player.on('autoplay-failure', () => {
            this.player.removeClass('vjs-has-autoplay');
        });
        this.player.ready(() => {
            const playerOptions = this.player.options_;
            if (options.mode === 'webtorrent') {
                this.player.webtorrent().on('resolutionChange', (_, d) => this.handleResolutionChange(d));
                this.player.webtorrent().on('autoResolutionChange', (_, d) => this.trigger('autoResolutionChange', d));
            }
            if (options.mode === 'p2p-media-loader') {
                this.player.p2pMediaLoader().on('resolutionChange', (_, d) => this.handleResolutionChange(d));
            }
            this.player.tech(true).on('loadedqualitydata', () => {
                setTimeout(() => {
                    // Replay a resolution change, now we loaded all quality data
                    if (this.lastResolutionChange)
                        this.handleResolutionChange(this.lastResolutionChange);
                }, 0);
            });
            const volume = Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["getStoredVolume"])();
            if (volume !== undefined)
                this.player.volume(volume);
            const muted = playerOptions.muted !== undefined ? playerOptions.muted : Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["getStoredMute"])();
            if (muted !== undefined)
                this.player.muted(muted);
            this.defaultSubtitle = options.subtitle || Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["getStoredLastSubtitle"])();
            this.player.on('volumechange', () => {
                Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["saveVolumeInStore"])(this.player.volume());
                Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["saveMuteInStore"])(this.player.muted());
            });
            if (options.stopTime) {
                const stopTime = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["timeToInt"])(options.stopTime);
                const self = this;
                this.player.on('timeupdate', function onTimeUpdate() {
                    if (self.player.currentTime() > stopTime) {
                        self.player.pause();
                        self.player.trigger('stopped');
                        self.player.off('timeupdate', onTimeUpdate);
                    }
                });
            }
            this.player.textTracks().on('change', () => {
                const showing = this.player.textTracks().tracks_.find(t => {
                    return t.kind === 'captions' && t.mode === 'showing';
                });
                if (!showing) {
                    Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["saveLastSubtitle"])('off');
                    return;
                }
                Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["saveLastSubtitle"])(showing.language);
            });
            this.player.on('sourcechange', () => this.initCaptions());
            this.player.duration(options.videoDuration);
            this.initializePlayer();
            this.runViewAdd();
            this.runUserWatchVideo(options.userWatching, options.videoUUID);
        });
    }
    dispose() {
        if (this.videoViewInterval)
            clearInterval(this.videoViewInterval);
        if (this.userWatchingVideoInterval)
            clearInterval(this.userWatchingVideoInterval);
    }
    onMenuOpen() {
        this.menuOpened = false;
        this.alterInactivity();
    }
    onMenuClosed() {
        this.menuOpened = true;
        this.alterInactivity();
    }
    initializePlayer() {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isMobile"])())
            this.player.addClass('vjs-is-mobile');
        this.initSmoothProgressBar();
        this.initCaptions();
        this.listenControlBarMouse();
    }
    runViewAdd() {
        this.clearVideoViewInterval();
        // After 30 seconds (or 3/4 of the video), add a view to the video
        let minSecondsToView = 30;
        if (!this.isLive && this.videoDuration < minSecondsToView) {
            minSecondsToView = (this.videoDuration * 3) / 4;
        }
        let secondsViewed = 0;
        this.videoViewInterval = setInterval(() => {
            if (this.player && !this.player.paused()) {
                secondsViewed += 1;
                if (secondsViewed > minSecondsToView) {
                    // Restart the loop if this is a live
                    if (this.isLive) {
                        secondsViewed = 0;
                    }
                    else {
                        this.clearVideoViewInterval();
                    }
                    this.addViewToVideo().catch(err => console.error(err));
                }
            }
        }, 1000);
    }
    runUserWatchVideo(options, videoUUID) {
        let lastCurrentTime = 0;
        this.userWatchingVideoInterval = setInterval(() => {
            const currentTime = Math.floor(this.player.currentTime());
            if (currentTime - lastCurrentTime >= 1) {
                lastCurrentTime = currentTime;
                if (options) {
                    this.notifyUserIsWatching(currentTime, options.url, options.authorizationHeader)
                        .catch(err => console.error('Cannot notify user is watching.', err));
                }
                else {
                    Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_3__["saveVideoWatchHistory"])(videoUUID, currentTime);
                }
            }
        }, this.CONSTANTS.USER_WATCHING_VIDEO_INTERVAL);
    }
    clearVideoViewInterval() {
        if (this.videoViewInterval !== undefined) {
            clearInterval(this.videoViewInterval);
            this.videoViewInterval = undefined;
        }
    }
    addViewToVideo() {
        if (!this.videoViewUrl)
            return Promise.resolve(undefined);
        return fetch(this.videoViewUrl, { method: 'POST' });
    }
    notifyUserIsWatching(currentTime, url, authorizationHeader) {
        const body = new URLSearchParams();
        body.append('currentTime', currentTime.toString());
        const headers = new Headers({ 'Authorization': authorizationHeader });
        return fetch(url, { method: 'PUT', body, headers });
    }
    handleResolutionChange(data) {
        this.lastResolutionChange = data;
        const qualityLevels = this.player.qualityLevels();
        for (let i = 0; i < qualityLevels.length; i++) {
            if (qualityLevels[i].height === data.resolutionId) {
                data.id = qualityLevels[i].id;
                break;
            }
        }
        this.trigger('resolutionChange', data);
    }
    listenControlBarMouse() {
        this.player.controlBar.on('mouseenter', () => {
            this.mouseInControlBar = true;
            this.alterInactivity();
        });
        this.player.controlBar.on('mouseleave', () => {
            this.mouseInControlBar = false;
            this.alterInactivity();
        });
    }
    alterInactivity() {
        if (this.menuOpened) {
            this.player.options_.inactivityTimeout = this.savedInactivityTimeout;
            return;
        }
        if (!this.mouseInControlBar && !this.isTouchEnabled()) {
            this.player.options_.inactivityTimeout = 1;
        }
    }
    isTouchEnabled() {
        return ('ontouchstart' in window) ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }
    initCaptions() {
        for (const caption of this.videoCaptions) {
            this.player.addRemoteTextTrack({
                kind: 'captions',
                label: caption.label,
                language: caption.language,
                id: caption.language,
                src: caption.src,
                default: this.defaultSubtitle === caption.language
            }, false);
        }
        this.player.trigger('captionsChanged');
    }
    // Thanks: https://github.com/videojs/video.js/issues/4460#issuecomment-312861657
    initSmoothProgressBar() {
        const SeekBar = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('SeekBar');
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerPlugin('peertube', PeerTubePlugin);



/***/ }),

/***/ "./src/assets/player/playlist/playlist-button.ts":
/*!*******************************************************!*\
  !*** ./src/assets/player/playlist/playlist-button.ts ***!
  \*******************************************************/
/*! exports provided: PlaylistButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistButton", function() { return PlaylistButton; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('ClickableComponent');
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('PlaylistButton', PlaylistButton);



/***/ }),

/***/ "./src/assets/player/playlist/playlist-menu-item.ts":
/*!**********************************************************!*\
  !*** ./src/assets/player/playlist/playlist-menu-item.ts ***!
  \**********************************************************/
/*! exports provided: PlaylistMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistMenuItem", function() { return PlaylistMenuItem; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");


const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
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
                html += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["secondsToTime"])(videoElement.startTimestamp);
            if (videoElement.stopTimestamp)
                html += ' - ' + Object(_utils__WEBPACK_IMPORTED_MODULE_1__["secondsToTime"])(videoElement.stopTimestamp);
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

/***/ "./src/assets/player/playlist/playlist-menu.ts":
/*!*****************************************************!*\
  !*** ./src/assets/player/playlist/playlist-menu.ts ***!
  \*****************************************************/
/*! exports provided: PlaylistMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistMenu", function() { return PlaylistMenu; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _playlist_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-menu-item */ "./src/assets/player/playlist/playlist-menu-item.ts");


const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
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
            const item = new _playlist_menu_item__WEBPACK_IMPORTED_MODULE_1__["PlaylistMenuItem"](this.player(), {
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

/***/ "./src/assets/player/playlist/playlist-plugin.ts":
/*!*******************************************************!*\
  !*** ./src/assets/player/playlist/playlist-plugin.ts ***!
  \*******************************************************/
/*! exports provided: PlaylistPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistPlugin", function() { return PlaylistPlugin; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _playlist_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-button */ "./src/assets/player/playlist/playlist-button.ts");
/* harmony import */ var _playlist_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist-menu */ "./src/assets/player/playlist/playlist-menu.ts");



const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getPlugin('plugin');
class PlaylistPlugin extends Plugin {
    constructor(player, options) {
        super(player, options);
        this.options = options;
        this.player.ready(() => {
            player.addClass('vjs-playlist');
        });
        this.playlistMenu = new _playlist_menu__WEBPACK_IMPORTED_MODULE_2__["PlaylistMenu"](player, options);
        this.playlistButton = new _playlist_button__WEBPACK_IMPORTED_MODULE_1__["PlaylistButton"](player, Object.assign({}, options, { playlistMenu: this.playlistMenu }));
        player.addChild(this.playlistMenu, options);
        player.addChild(this.playlistButton, options);
    }
    updateSelected() {
        this.playlistMenu.updateSelected(this.options.getCurrentPosition());
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerPlugin('playlist', PlaylistPlugin);



/***/ }),

/***/ "./src/assets/player/upnext/end-card.ts":
/*!**********************************************!*\
  !*** ./src/assets/player/upnext/end-card.ts ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
        <circle class="vjs-upnext-svg-autoplay-ring" cx="-49" cy="49" fill-opacity="0" r="46.5" stroke="#FFFFFF" stroke-width="4" transform="rotate(-90)"></circle>
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
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
class EndCard extends Component {
    constructor(player, options) {
        super(player, options);
        this.dashOffsetTotal = 586;
        this.dashOffsetStart = 293;
        this.interval = 50;
        this.upNextEvents = new video_js__WEBPACK_IMPORTED_MODULE_0___default.a.EventTarget();
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
        this.autoplayRing.setAttribute('stroke-dasharray', '' + this.dashOffsetStart);
        this.autoplayRing.setAttribute('stroke-dashoffset', '' + -this.dashOffsetStart);
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('EndCard', EndCard);


/***/ }),

/***/ "./src/assets/player/upnext/upnext-plugin.ts":
/*!***************************************************!*\
  !*** ./src/assets/player/upnext/upnext-plugin.ts ***!
  \***************************************************/
/*! exports provided: UpNextPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpNextPlugin", function() { return UpNextPlugin; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getPlugin('plugin');
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerPlugin('upnext', UpNextPlugin);



/***/ }),

/***/ "./src/assets/player/utils.ts":
/*!************************************!*\
  !*** ./src/assets/player/utils.ts ***!
  \************************************/
/*! exports provided: getRtcConfig, toTitleCase, timeToInt, secondsToTime, isWebRTCDisabled, buildPlaylistLink, buildVideoLink, buildVideoOrPlaylistEmbed, videoFileMaxByResolution, videoFileMinByResolution, isMobile, bytes, isIOS, isSafari */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRtcConfig", function() { return getRtcConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTitleCase", function() { return toTitleCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeToInt", function() { return timeToInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secondsToTime", function() { return secondsToTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebRTCDisabled", function() { return isWebRTCDisabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildPlaylistLink", function() { return buildPlaylistLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildVideoLink", function() { return buildVideoLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildVideoOrPlaylistEmbed", function() { return buildVideoOrPlaylistEmbed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "videoFileMaxByResolution", function() { return videoFileMaxByResolution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "videoFileMinByResolution", function() { return videoFileMinByResolution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytes", function() { return bytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return isIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSafari", function() { return isSafari; });
/* harmony import */ var _shared_core_utils_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/core-utils/renderer */ "../shared/core-utils/renderer/index.ts");

function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function isWebRTCDisabled() {
    return !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection) === false;
}
function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
    }
    // Detect iPad Desktop mode
    return !!(navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform));
}
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
// https://github.com/danrevah/ngx-pipes/blob/master/src/pipes/math/bytes.ts
// Don't import all Angular stuff, just copy the code with shame
const dictionaryBytes = [
    { max: 1024, type: 'B' },
    { max: 1048576, type: 'KB' },
    { max: 1073741824, type: 'MB' },
    { max: 1.0995116e12, type: 'GB' }
];
function bytes(value) {
    const format = dictionaryBytes.find(d => value < d.max) || dictionaryBytes[dictionaryBytes.length - 1];
    const calc = Math.floor(value / (format.max / 1024)).toString();
    return [calc, format.type];
}
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
function buildVideoLink(options = {}) {
    const { baseUrl } = options;
    const url = baseUrl
        ? baseUrl
        : window.location.origin + window.location.pathname.replace('/embed/', '/watch/');
    const params = generateParams(window.location.search);
    if (options.startTime !== undefined && options.startTime !== null) {
        const startTimeInt = Math.floor(options.startTime);
        params.set('start', secondsToTime(startTimeInt));
    }
    if (options.stopTime) {
        const stopTimeInt = Math.floor(options.stopTime);
        params.set('stop', secondsToTime(stopTimeInt));
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
    if (options.peertubeLink === false)
        params.set('peertubeLink', '0');
    return buildUrl(url, params);
}
function buildPlaylistLink(options) {
    const { baseUrl } = options;
    const url = baseUrl
        ? baseUrl
        : window.location.origin + window.location.pathname.replace('/video-playlists/embed/', '/videos/watch/playlist/');
    const params = generateParams(window.location.search);
    if (options.playlistPosition)
        params.set('playlistPosition', '' + options.playlistPosition);
    return buildUrl(url, params);
}
function buildUrl(url, params) {
    let hasParams = false;
    params.forEach(() => hasParams = true);
    if (hasParams)
        return url + '?' + params.toString();
    return url;
}
function generateParams(url) {
    const params = new URLSearchParams(window.location.search);
    // Unused parameters in embed
    params.delete('videoId');
    params.delete('resume');
    return params;
}
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
function buildVideoOrPlaylistEmbed(embedUrl, embedTitle) {
    const title = Object(_shared_core_utils_renderer__WEBPACK_IMPORTED_MODULE_0__["escapeHTML"])(embedTitle);
    return '<iframe width="560" height="315" ' +
        'sandbox="allow-same-origin allow-scripts allow-popups" ' +
        'title="' + title + '" ' +
        'src="' + embedUrl + '" ' +
        'frameborder="0" allowfullscreen>' +
        '</iframe>';
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

/***/ "./src/assets/player/videojs-components/next-previous-video-button.ts":
/*!****************************************************************************!*\
  !*** ./src/assets/player/videojs-components/next-previous-video-button.ts ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Button');
class NextPreviousVideoButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.nextPreviousVideoButtonOptions = options;
        this.update();
    }
    createEl() {
        const type = this.options_.type;
        const button = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('button', {
            className: 'vjs-' + type + '-video'
        });
        const nextIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('NextVideoButton', NextPreviousVideoButton);
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('PreviousVideoButton', NextPreviousVideoButton);


/***/ }),

/***/ "./src/assets/player/videojs-components/p2p-info-button.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/videojs-components/p2p-info-button.ts ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");


const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Button');
class P2pInfoButton extends Button {
    createEl() {
        const div = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('div', {
            className: 'vjs-peertube'
        });
        const subDivWebtorrent = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('div', {
            className: 'vjs-peertube-hidden' // Hide the stats before we get the info
        });
        div.appendChild(subDivWebtorrent);
        const downloadIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'icon icon-download'
        });
        subDivWebtorrent.appendChild(downloadIcon);
        const downloadSpeedText = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'download-speed-text'
        });
        const downloadSpeedNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'download-speed-number'
        });
        const downloadSpeedUnit = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span');
        downloadSpeedText.appendChild(downloadSpeedNumber);
        downloadSpeedText.appendChild(downloadSpeedUnit);
        subDivWebtorrent.appendChild(downloadSpeedText);
        const uploadIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'icon icon-upload'
        });
        subDivWebtorrent.appendChild(uploadIcon);
        const uploadSpeedText = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'upload-speed-text'
        });
        const uploadSpeedNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'upload-speed-number'
        });
        const uploadSpeedUnit = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span');
        uploadSpeedText.appendChild(uploadSpeedNumber);
        uploadSpeedText.appendChild(uploadSpeedUnit);
        subDivWebtorrent.appendChild(uploadSpeedText);
        const peersText = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'peers-text'
        });
        const peersNumber = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
            className: 'peers-number'
        });
        subDivWebtorrent.appendChild(peersNumber);
        subDivWebtorrent.appendChild(peersText);
        const subDivHttp = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('div', {
            className: 'vjs-peertube-hidden'
        });
        const subDivHttpText = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('span', {
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
            const downloadSpeed = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(p2pStats.downloadSpeed + httpStats.downloadSpeed);
            const uploadSpeed = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(p2pStats.uploadSpeed + httpStats.uploadSpeed);
            const totalDownloaded = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(p2pStats.downloaded + httpStats.downloaded);
            const totalUploaded = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(p2pStats.uploaded + httpStats.uploaded);
            const numPeers = p2pStats.numPeers;
            subDivWebtorrent.title = this.player().localize('Total downloaded: ') + totalDownloaded.join(' ') + '\n';
            if (data.source === 'p2p-media-loader') {
                const downloadedFromServer = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(httpStats.downloaded).join(' ');
                const downloadedFromPeers = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["bytes"])(p2pStats.downloaded).join(' ');
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('P2PInfoButton', P2pInfoButton);


/***/ }),

/***/ "./src/assets/player/videojs-components/peertube-link-button.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/player/videojs-components/peertube-link-button.ts ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);


const Button = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.getComponent('Button');
class PeerTubeLinkButton extends Button {
    constructor(player, options) {
        super(player, options);
    }
    createEl() {
        return this.buildElement();
    }
    updateHref() {
        this.el().setAttribute('href', Object(_utils__WEBPACK_IMPORTED_MODULE_0__["buildVideoLink"])({ startTime: this.player().currentTime() }));
    }
    handleClick() {
        this.player().pause();
    }
    buildElement() {
        const el = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.createEl('a', {
            href: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["buildVideoLink"])(),
            innerHTML: 'PeerTube',
            title: this.player().localize('Video page (new window)'),
            className: 'vjs-peertube-link',
            target: '_blank'
        });
        el.addEventListener('mouseenter', () => this.updateHref());
        return el;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_1___default.a.registerComponent('PeerTubeLinkButton', PeerTubeLinkButton);


/***/ }),

/***/ "./src/assets/player/videojs-components/peertube-load-progress-bar.ts":
/*!****************************************************************************!*\
  !*** ./src/assets/player/videojs-components/peertube-load-progress-bar.ts ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
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
        // FIXME: typings
        this.el().style.width = (torrent.progress * 100) + '%';
    }
}
Component.registerComponent('PeerTubeLoadProgressBar', PeerTubeLoadProgressBar);


/***/ }),

/***/ "./src/assets/player/videojs-components/resolution-menu-button.ts":
/*!************************************************************************!*\
  !*** ./src/assets/player/videojs-components/resolution-menu-button.ts ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resolution_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolution-menu-item */ "./src/assets/player/videojs-components/resolution-menu-item.ts");


const Menu = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Menu');
const MenuButton = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('MenuButton');
class ResolutionMenuButton extends MenuButton {
    constructor(player, options) {
        super(player, options);
        this.controlText('Quality');
        player.tech(true).on('loadedqualitydata', (e, data) => this.buildQualities(data));
        player.peertube().on('resolutionChange', () => setTimeout(() => this.trigger('updateLabel'), 0));
    }
    createEl() {
        const el = super.createEl();
        this.labelEl_ = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.dom.createEl('div', {
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
    buildQualities(data) {
        // The automatic resolution item will need other labels
        const labels = {};
        data.qualityData.video.sort((a, b) => {
            if (a.id > b.id)
                return -1;
            if (a.id === b.id)
                return 0;
            return 1;
        });
        for (const d of data.qualityData.video) {
            // Skip auto resolution, we'll add it ourselves
            if (d.id === -1)
                continue;
            const label = d.label === '0p'
                ? this.player().localize('Audio-only')
                : d.label;
            this.menu.addChild(new _resolution_menu_item__WEBPACK_IMPORTED_MODULE_1__["ResolutionMenuItem"](this.player_, {
                id: d.id,
                label,
                selected: d.selected,
                callback: data.qualitySwitchCallback
            }));
            labels[d.id] = d.label;
        }
        this.menu.addChild(new _resolution_menu_item__WEBPACK_IMPORTED_MODULE_1__["ResolutionMenuItem"](this.player_, {
            id: -1,
            label: this.player_.localize('Auto'),
            labels,
            callback: data.qualitySwitchCallback,
            selected: true // By default, in auto mode
        }));
        for (const m of this.menu.children()) {
            this.addClickListener(m);
        }
        this.trigger('menuChanged');
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('ResolutionMenuButton', ResolutionMenuButton);


/***/ }),

/***/ "./src/assets/player/videojs-components/resolution-menu-item.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/player/videojs-components/resolution-menu-item.ts ***!
  \**********************************************************************/
/*! exports provided: ResolutionMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolutionMenuItem", function() { return ResolutionMenuItem; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const MenuItem = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('MenuItem');
class ResolutionMenuItem extends MenuItem {
    constructor(player, options) {
        options.selectable = true;
        super(player, options);
        this.autoResolutionPossible = true;
        this.currentResolutionLabel = '';
        this.resolutionId = options.id;
        this.label = options.label;
        this.labels = options.labels;
        this.callback = options.callback;
        player.peertube().on('resolutionChange', (_, data) => this.updateSelection(data));
        // We only want to disable the "Auto" item
        if (this.resolutionId === -1) {
            player.peertube().on('autoResolutionChange', (_, data) => this.updateAutoResolution(data));
        }
    }
    handleClick(event) {
        // Auto button disabled?
        if (this.autoResolutionPossible === false && this.resolutionId === -1)
            return;
        super.handleClick(event);
        this.callback(this.resolutionId, 'video');
    }
    updateSelection(data) {
        if (this.resolutionId === -1) {
            this.currentResolutionLabel = this.labels[data.id];
        }
        // Automatic resolution only
        if (data.auto === true) {
            this.selected(this.resolutionId === -1);
            return;
        }
        this.selected(this.resolutionId === data.id);
    }
    updateAutoResolution(data) {
        // Check if the auto resolution is enabled or not
        if (data.possible === false) {
            this.addClass('disabled');
        }
        else {
            this.removeClass('disabled');
        }
        this.autoResolutionPossible = data.possible;
    }
    getLabel() {
        if (this.resolutionId === -1) {
            return this.label + ' <small>' + this.currentResolutionLabel + '</small>';
        }
        return this.label;
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('ResolutionMenuItem', ResolutionMenuItem);



/***/ }),

/***/ "./src/assets/player/videojs-components/settings-dialog.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/player/videojs-components/settings-dialog.ts ***!
  \*****************************************************************/
/*! exports provided: SettingsDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsDialog", function() { return SettingsDialog; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
class SettingsDialog extends Component {
    constructor(player) {
        super(player);
        this.hide();
    }
    /**
     * Create the component's DOM element
     *
     * @return {Element}
     * @method createEl
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
            'role': 'dialog',
            'aria-labelledby': dialogLabelId,
            'aria-describedby': dialogDescriptionId
        });
    }
}
Component.registerComponent('SettingsDialog', SettingsDialog);



/***/ }),

/***/ "./src/assets/player/videojs-components/settings-menu-button.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/player/videojs-components/settings-menu-button.ts ***!
  \**********************************************************************/
/*! exports provided: SettingsButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsButton", function() { return SettingsButton; });
/* harmony import */ var _settings_menu_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-menu-item */ "./src/assets/player/videojs-components/settings-menu-item.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_2__);
// Thanks to Yanko Shterev: https://github.com/yshterev/videojs-settings-menu



const Button = video_js__WEBPACK_IMPORTED_MODULE_2___default.a.getComponent('Button');
const Menu = video_js__WEBPACK_IMPORTED_MODULE_2___default.a.getComponent('Menu');
const Component = video_js__WEBPACK_IMPORTED_MODULE_2___default.a.getComponent('Component');
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
        this.playerClickHandler = this.onPlayerClick.bind(this);
        this.userInactiveHandler = this.onUserInactive.bind(this);
        this.buildMenu();
        this.bindEvents();
        // Prepare the dialog
        this.player().one('play', () => this.hideDialog());
    }
    onPlayerClick(event) {
        const element = event.target;
        if (element.classList.contains('vjs-settings') || element.parentElement.classList.contains('vjs-settings')) {
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
        this.player().on('click', this.playerClickHandler);
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
        this.player().peertube().onMenuOpen();
        this.menu.el().style.opacity = '1';
        this.dialog.show();
        this.setDialogSize(this.getComponentSize(this.menu));
    }
    hideDialog() {
        this.player_.peertube().onMenuClosed();
        this.dialog.hide();
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
        const maxHeight = this.player().el().offsetHeight - offset; // FIXME: typings
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
            if (video_js__WEBPACK_IMPORTED_MODULE_2___default.a.dom.hasClass(this.el_, 'open')) {
                video_js__WEBPACK_IMPORTED_MODULE_2___default.a.dom.removeClass(this.el_, 'open');
            }
            else {
                video_js__WEBPACK_IMPORTED_MODULE_2___default.a.dom.addClass(this.el_, 'open');
            }
        };
        options.name = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["toTitleCase"])(entry);
        const newOptions = Object.assign({}, options, { entry, menuButton: this });
        const settingsMenuItem = new _settings_menu_item__WEBPACK_IMPORTED_MODULE_0__["SettingsMenuItem"](this.player(), newOptions);
        this.menu.addChild(settingsMenuItem);
        // Hide children to avoid sub menus stacking on top of each other
        // or having multiple menus open
        settingsMenuItem.on('click', video_js__WEBPACK_IMPORTED_MODULE_2___default.a.bind(this, this.hideChildren));
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
}
Component.registerComponent('SettingsButton', SettingsButton);



/***/ }),

/***/ "./src/assets/player/videojs-components/settings-menu-item.ts":
/*!********************************************************************!*\
  !*** ./src/assets/player/videojs-components/settings-menu-item.ts ***!
  \********************************************************************/
/*! exports provided: SettingsMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsMenuItem", function() { return SettingsMenuItem; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);
// Thanks to Yanko Shterev: https://github.com/yshterev/videojs-settings-menu


const MenuItem = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.getComponent('MenuItem');
const component = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.getComponent('Component');
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
        const subMenuName = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["toTitleCase"])(options.entry);
        const SubMenuComponent = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.getComponent(subMenuName);
        if (!SubMenuComponent) {
            throw new Error(`Component ${subMenuName} does not exist`);
        }
        const newOptions = Object.assign({}, options, { entry: options.menuButton, menuButton: this });
        this.subMenu = new SubMenuComponent(this.player(), newOptions); // FIXME: typings
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
            target = event.currentTarget;
        }
        if (target && target.classList.contains('vjs-back-button')) {
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
     * @return {Element}
     * @method createEl
     */
    createEl() {
        const el = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.createEl('li', {
            className: 'vjs-menu-item'
        });
        this.settingsSubMenuTitleEl_ = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.createEl('div', {
            className: 'vjs-settings-sub-menu-title'
        });
        el.appendChild(this.settingsSubMenuTitleEl_);
        this.settingsSubMenuValueEl_ = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.createEl('div', {
            className: 'vjs-settings-sub-menu-value'
        });
        el.appendChild(this.settingsSubMenuValueEl_);
        this.settingsSubMenuEl_ = video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.createEl('div', {
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
        video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.removeClass(this.el(), 'open');
        super.handleClick(event);
        this.mainMenu.el().style.opacity = '0';
        // Whether to add or remove vjs-hidden class on the settingsSubMenuEl element
        if (video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.hasClass(this.settingsSubMenuEl_, 'vjs-hidden')) {
            video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.removeClass(this.settingsSubMenuEl_, 'vjs-hidden');
            // animation not played without timeout
            setTimeout(() => {
                this.settingsSubMenuEl_.style.opacity = '1';
                this.settingsSubMenuEl_.style.marginRight = '0px';
            }, 0);
            this.settingsButton.setDialogSize(this.size);
        }
        else {
            video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
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
            video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
            // reset opacity to 0
            this.settingsSubMenuEl_.style.opacity = '0';
        }
    }
    reset() {
        video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
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
        }, 0);
    }
    build() {
        this.subMenu.on('updateLabel', () => {
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
            setTimeout(() => this.settingsSubMenuValueEl_.innerHTML = html, 250);
        }
        else {
            // Loop trough the submenu items to find the selected child
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
                    this.settingsSubMenuValueEl_.innerHTML = subMenuItemUntyped.options_.label;
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
        video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.removeClass(this.settingsSubMenuEl_, 'vjs-hidden');
        this.size = this.settingsButton.getComponentSize(this.settingsSubMenuEl_);
        this.setMargin();
        this.dialog.addClass('vjs-hidden');
        video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
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
        if (video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.hasClass(this.el(), 'open')) {
            video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.addClass(this.settingsSubMenuEl_, 'vjs-hidden');
            video_js__WEBPACK_IMPORTED_MODULE_1___default.a.dom.removeClass(this.el(), 'open');
        }
    }
}
SettingsMenuItem.prototype.contentElType = 'button';
video_js__WEBPACK_IMPORTED_MODULE_1___default.a.registerComponent('SettingsMenuItem', SettingsMenuItem);



/***/ }),

/***/ "./src/assets/player/videojs-components/settings-panel-child.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/player/videojs-components/settings-panel-child.ts ***!
  \**********************************************************************/
/*! exports provided: SettingsPanelChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPanelChild", function() { return SettingsPanelChild; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
class SettingsPanelChild extends Component {
    constructor(player, options) {
        super(player, options);
    }
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

/***/ "./src/assets/player/videojs-components/settings-panel.ts":
/*!****************************************************************!*\
  !*** ./src/assets/player/videojs-components/settings-panel.ts ***!
  \****************************************************************/
/*! exports provided: SettingsPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPanel", function() { return SettingsPanel; });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Component');
class SettingsPanel extends Component {
    constructor(player, options) {
        super(player, options);
    }
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

/***/ "./src/assets/player/videojs-components/theater-button.ts":
/*!****************************************************************!*\
  !*** ./src/assets/player/videojs-components/theater-button.ts ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");


const Button = video_js__WEBPACK_IMPORTED_MODULE_0___default.a.getComponent('Button');
class TheaterButton extends Button {
    constructor(player, options) {
        super(player, options);
        const enabled = Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__["getStoredTheater"])();
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
        Object(_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_1__["saveTheaterInStore"])(theaterEnabled);
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
video_js__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponent('TheaterButton', TheaterButton);


/***/ })

}]);
//# sourceMappingURL=4.chunk.js.map