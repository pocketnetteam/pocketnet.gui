(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_p2p-media-loader_core_p2p-media-loader-master_p2p-media-loader-hlsjs_lib_index_ts"],{

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BandwidthApproximator": () => (/* binding */ BandwidthApproximator)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:bandwidth-approximator");
const SMOOTH_INTERVAL = 2 * 1000;
const MEASURE_INTERVAL = 40 * 1000;

let NumberWithTime = /*#__PURE__*/_createClass(function NumberWithTime(value, timeStamp) {
  _classCallCheck(this, NumberWithTime);

  this.value = value;
  this.timeStamp = timeStamp;
});

let BandwidthApproximator = /*#__PURE__*/_createClass(function BandwidthApproximator() {
  _classCallCheck(this, BandwidthApproximator);

  this.lastBytes = [];
  this.currentBytesSum = 0;
  this.lastBandwidth = [];

  this.addBytes = (bytes, timeStamp) => {
    debug("Add %d bytes.", bytes);
    this.lastBytes.push(new NumberWithTime(bytes, timeStamp));
    this.currentBytesSum += bytes;

    while (timeStamp - this.lastBytes[0].timeStamp > SMOOTH_INTERVAL) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.currentBytesSum -= this.lastBytes.shift().value;
    }

    const interval = Math.min(SMOOTH_INTERVAL, timeStamp);
    this.lastBandwidth.push(new NumberWithTime(this.currentBytesSum / interval, timeStamp));
  }; // in bytes per millisecond


  this.getBandwidth = timeStamp => {
    while (this.lastBandwidth.length !== 0 && timeStamp - this.lastBandwidth[0].timeStamp > MEASURE_INTERVAL) {
      this.lastBandwidth.shift();
    }

    let maxBandwidth = 0;

    for (const bandwidth of this.lastBandwidth) {
      if (bandwidth.value > maxBandwidth) {
        maxBandwidth = bandwidth.value;
      }
    }

    debug("Max bandwidth: %d.", maxBandwidth);
    return maxBandwidth;
  };

  this.getSmoothInterval = () => {
    return SMOOTH_INTERVAL;
  };

  this.getMeasureInterval = () => {
    return MEASURE_INTERVAL;
  };
});

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpMediaManager": () => (/* binding */ HttpMediaManager)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! abortcontroller-polyfill/dist/polyfill-patch-fetch */ "./node_modules/abortcontroller-polyfill/dist/polyfill-patch-fetch.js");
/* harmony import */ var abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





let FilteredEmitter = /*#__PURE__*/function (_STEEmitter) {
  _inherits(FilteredEmitter, _STEEmitter);

  var _super = _createSuper(FilteredEmitter);

  function FilteredEmitter() {
    _classCallCheck(this, FilteredEmitter);

    return _super.apply(this, arguments);
  }

  return _createClass(FilteredEmitter);
}(_stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__.STEEmitter);

let HttpMediaManager = /*#__PURE__*/function (_FilteredEmitter) {
  _inherits(HttpMediaManager, _FilteredEmitter);

  var _super2 = _createSuper(HttpMediaManager);

  function HttpMediaManager(settings) {
    var _this;

    _classCallCheck(this, HttpMediaManager);

    _this = _super2.call(this);
    _this.settings = settings;
    _this.fetchRequests = new Map();
    _this.failedSegments = new Map();
    _this.debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:http-media-manager");

    _this.fetch = function () {
      return fetch.apply(void 0, arguments);
    };

    _this.download = (segment, downloadedPieces) => {
      if (_this.isDownloading(segment)) {
        return;
      }

      console.log('download');

      _this.cleanTimedOutFailedSegments();

      _this.emit("segment-start-load", segment);

      const segmentUrl = _this.buildSegmentUrl(segment);

      const fetchAbort = new AbortController();

      _this.fetchRequests.set(segment.id, {
        fetchAbort,
        segment,
        initialPriority: segment.priority,
        segmentUrl
      });

      _this.debug("http segment download", segmentUrl);

      segment.requestUrl = segmentUrl;
      const headers = new Headers();

      if (segment.range) {
        headers.append('Range', segment.range);
      } else if (downloadedPieces !== undefined && _this.settings.httpUseRanges) {
        let bytesDownloaded = 0;

        for (const piece of downloadedPieces) {
          bytesDownloaded += piece.byteLength;
        }

        headers.append("Range", `bytes=${bytesDownloaded}-`);

        _this.debug("continue download from", bytesDownloaded);
      } else {
        downloadedPieces = undefined;
      }

      const signal = fetchAbort.signal;

      const fetchRequest = _this.fetch(segmentUrl, {
        headers,
        signal
      });

      void _this.setupFetchEvents(fetchRequest, segment, downloadedPieces).catch(err => {
        /**
         * Handling all fetch errors here
         */
        if (err.name === "AbortError") {
          /**
           * This may happen on video seeking
           * or halted video playing. In most
           * cases it is normal. For more info
           * look AbortController...
           */
          _this.debug("Segment loading was aborted by user", segment);

          return;
        }

        if (err.message === "network error") {
          _this.debug("Segment loading is unavailable. No internet", segment);

          const netError = Error("NETWORK_ERROR");

          _this.segmentFailure(segment, netError, segment.url);

          return;
        }

        if (err.message === "Failed to fetch") {
          /**
           * This error might occur in next cases:
           *   - Network error
           *   - Response with erroneous CORS headers
           *   - Unsupported protocol, e.g. HTTPS
           *   - Wrong request method
           */
          _this.debug("Segment fetch failed", segment);

          const fetchError = Error("FETCH_FAILED");

          _this.segmentFailure(segment, fetchError, segment.url);

          return;
        }
      });
      /* if (this.settings.xhrSetup) {
          this.settings.xhrSetup(xhr, segmentUrl);
      } */

      _this.fetchRequests.set(segment.id, {
        request: fetchRequest,
        fetchAbort,
        segment,
        initialPriority: segment.priority,
        segmentUrl
      });

      return;
    };

    _this.updatePriority = segment => {
      const request = _this.fetchRequests.get(segment.id);

      if (!request) {
        throw new Error("Cannot update priority of not downloaded segment " + segment.id);
      } // Segment is now in high priority
      // If the segment URL changed, retry the request with the new URL


      if (segment.priority <= _this.settings.requiredSegmentsPriority && request.initialPriority > _this.settings.requiredSegmentsPriority && request.segmentUrl !== _this.buildSegmentUrl(segment)) {
        _this.debug("aborting http segment abort because the segment is now in a high priority", segment.id);

        _this.abort(segment);

        _this.download(segment);
      }
    };

    _this.abort = segment => {
      const request = _this.fetchRequests.get(segment.id);

      console.log('abort command');

      if (request) {
        console.log("ABORT");
        request.fetchAbort.abort();

        _this.fetchRequests.delete(segment.id);

        _this.debug("http segment abort", segment.id);
      }
    };

    _this.isDownloading = segment => {
      return _this.fetchRequests.has(segment.id);
    };

    _this.isFailed = segment => {
      const time = _this.failedSegments.get(segment.id);

      return time !== undefined && time > _this.now();
    };

    _this.getActiveDownloads = () => {
      return _this.fetchRequests;
    };

    _this.getActiveDownloadsCount = () => {
      return _this.fetchRequests.size;
    };

    _this.destroy = () => {
      _this.fetchRequests.forEach(request => request.fetchAbort.abort());

      _this.fetchRequests.clear();
    };

    _this.setupFetchEvents = (fetch, segment, downloadedPieces) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      const fetchResponse = yield fetch;
      const dataReader = fetchResponse.body.getReader();
      const contentLengthStr = fetchResponse.headers.get("Content-Length");
      const contentLength = Number.parseFloat(contentLengthStr);
      const dataBytes = new Uint8Array(contentLength);
      let nextChunkPos = 0;

      if (Array.isArray(downloadedPieces) && fetchResponse.status === 206) {
        for (const piece of downloadedPieces) {
          const pieceBytes = new Uint8Array(piece);
          dataBytes.set(pieceBytes, nextChunkPos);
          nextChunkPos = piece.byteLength;
        }
      }

      let read;

      while (!(read = yield dataReader.read()).done) {
        const chunkBytes = read.value;
        dataBytes.set(chunkBytes, nextChunkPos);
        nextChunkPos += chunkBytes.length;
        /** Events emitters */

        this.emit("bytes-downloaded", segment, chunkBytes.length);

        if (contentLength) {
          this.emit("segment-size", segment, contentLength);
        }
      }

      if (fetchResponse.status < 200 || fetchResponse.status >= 300) {
        const err = Error(`Segment failure with HTTP code ${fetchResponse.status}`);
        this.segmentFailure(segment, err, fetchResponse.url);
        return;
      }

      yield this.segmentDownloadFinished(segment, dataBytes.buffer, fetchResponse);
    });

    _this.segmentDownloadFinished = (segment, data, fetchResponse) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      segment.responseUrl = fetchResponse.url;

      if (this.settings.segmentValidator) {
        try {
          yield this.settings.segmentValidator(Object.assign(Object.assign({}, segment), {
            data: data
          }), "http");
        } catch (error) {
          this.debug("segment validator failed", error);
          this.segmentFailure(segment, error, fetchResponse.url);
          return;
        }
      }

      this.fetchRequests.delete(segment.id);
      this.emit("segment-loaded", segment, data);
    });

    _this.segmentFailure = (segment, error, responseUrl) => {
      segment.responseUrl = responseUrl;

      _this.fetchRequests.delete(segment.id);

      _this.failedSegments.set(segment.id, _this.now() + _this.settings.httpFailedSegmentTimeout);

      _this.emit("segment-error", segment, error);
    };

    _this.cleanTimedOutFailedSegments = () => {
      const now = _this.now();

      const candidates = [];

      _this.failedSegments.forEach((time, id) => {
        if (time < now) {
          candidates.push(id);
        }
      });

      candidates.forEach(id => _this.failedSegments.delete(id));
    };

    _this.now = () => performance.now();

    if (settings.localTransport) {
      _this.fetch = settings.localTransport;
    }

    return _this;
  }

  _createClass(HttpMediaManager, [{
    key: "buildSegmentUrl",
    value: function buildSegmentUrl(segment) {
      if (this.settings.segmentUrlBuilder) {
        return this.settings.segmentUrlBuilder(segment);
      }

      return segment.url;
    }
  }]);

  return HttpMediaManager;
}(FilteredEmitter);

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HybridLoader": () => (/* binding */ HybridLoader)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var simple_peer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simple-peer */ "./node_modules/simple-peer/index.js");
/* harmony import */ var simple_peer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(simple_peer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _loader_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader-interface */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts");
/* harmony import */ var _http_media_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-media-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts");
/* harmony import */ var _p2p_media_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./p2p-media-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts");
/* harmony import */ var _media_peer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media-peer */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts");
/* harmony import */ var _bandwidth_approximator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bandwidth-approximator */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts");
/* harmony import */ var _segments_memory_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./segments-memory-storage */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */










/*
const defaultSettings: HybridLoaderSettings = {
    cachedSegmentExpiration: 5 * 60 * 1000,
    cachedSegmentsCount: 30,

    useP2P: true,
    consumeOnly: false,

    requiredSegmentsPriority: 1,

    simultaneousHttpDownloads: 2,
    httpDownloadProbability: 0.1,
    httpDownloadProbabilityInterval: 1000,
    httpDownloadProbabilitySkipIfNoPeers: false,
    httpFailedSegmentTimeout: 10000,
    httpDownloadMaxPriority: 20,
    httpDownloadInitialTimeout: 0,
    httpDownloadInitialTimeoutPerSegment: 4000,
    httpUseRanges: false,

    simultaneousP2PDownloads: 3,
    p2pDownloadMaxPriority: 20,
    p2pSegmentDownloadTimeout: 60000,

    webRtcMaxMessageSize: 64 * 1024 - 1,
    trackerAnnounce: ["wss://tracker.novage.com.ua", "wss://tracker.openwebtorrent.com"],
    peerRequestsPerAnnounce: 10,
    rtcConfig: (Peer as { config: RTCConfiguration }).config,
};*/

const defaultSettings = {
  cachedSegmentExpiration: 10 * 60 * 1000,
  cachedSegmentsCount: 1000,
  useP2P: true,
  consumeOnly: false,
  requiredSegmentsPriority: 3,
  simultaneousHttpDownloads: 2,
  httpDownloadProbability: 0.06,
  httpDownloadProbabilityInterval: 1000,
  httpDownloadProbabilitySkipIfNoPeers: false,
  httpFailedSegmentTimeout: 1500,
  httpDownloadMaxPriority: 20,
  httpDownloadInitialTimeout: 0,
  httpDownloadInitialTimeoutPerSegment: 100,
  httpUseRanges: false,
  simultaneousP2PDownloads: 20,
  p2pDownloadMaxPriority: 50,
  p2pSegmentDownloadTimeout: 60000,
  webRtcMaxMessageSize: 64 * 1024 - 1,
  trackerAnnounce: ["wss://tracker.novage.com.ua", "wss://tracker.openwebtorrent.com"],
  peerRequestsPerAnnounce: 10,
  rtcConfig: (simple_peer__WEBPACK_IMPORTED_MODULE_2___default().config)
};
let HybridLoader = /*#__PURE__*/function (_EventEmitter) {
  _inherits(HybridLoader, _EventEmitter);

  var _super = _createSuper(HybridLoader);

  function HybridLoader() {
    var _this;

    let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HybridLoader);

    _this = _super.call(this);
    _this.debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:hybrid-loader");
    _this.debugSegments = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:hybrid-loader-segments");
    _this.segmentsQueue = [];
    _this.bandwidthApproximator = new _bandwidth_approximator__WEBPACK_IMPORTED_MODULE_7__.BandwidthApproximator();
    _this.httpDownloadInitialTimeoutTimestamp = -Infinity;

    _this.createHttpManager = () => {
      return new _http_media_manager__WEBPACK_IMPORTED_MODULE_4__.HttpMediaManager(_this.settings);
    };

    _this.createP2PManager = () => {
      return new _p2p_media_manager__WEBPACK_IMPORTED_MODULE_5__.P2PMediaManager(_this.segmentsStorage, _this.settings);
    };

    _this.load = (segments, streamSwarmId) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.httpRandomDownloadInterval === undefined) {
        // Do once on first call
        this.httpRandomDownloadInterval = setInterval(this.downloadRandomSegmentOverHttp, this.settings.httpDownloadProbabilityInterval);

        if (this.settings.httpDownloadInitialTimeout > 0 && this.settings.httpDownloadInitialTimeoutPerSegment > 0) {
          // Initialize initial HTTP download timeout (i.e. download initial segments over P2P)
          this.debugSegments("enable initial HTTP download timeout", this.settings.httpDownloadInitialTimeout, "per segment", this.settings.httpDownloadInitialTimeoutPerSegment);
          this.httpDownloadInitialTimeoutTimestamp = this.now();
          setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment + 100);
        }
      }

      if (segments.length > 0) {
        this.masterSwarmId = segments[0].masterSwarmId;
      }

      if (this.masterSwarmId !== undefined) {
        this.p2pManager.setStreamSwarmId(streamSwarmId, this.masterSwarmId);
      }

      this.debug("load segments");
      let updateSegmentsMap = false;
      console.log("LOAD SEGMENTS", this.segmentsQueue.length); // stop all http requests and p2p downloads for segments that are not in the new load

      for (const segment of this.segmentsQueue) {
        if (!segments.find(f => f.id === segment.id)) {
          this.debug("remove segment", segment.url);

          if (this.httpManager.isDownloading(segment)) {
            updateSegmentsMap = true;
            this.httpManager.abort(segment);
          } else {
            this.p2pManager.abort(segment);
          }

          this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.SegmentAbort, segment);
        }
      }

      if (this.debug.enabled) {
        for (const segment of segments) {
          if (!this.segmentsQueue.find(f => f.id === segment.id)) {
            this.debug("add segment", segment.url);
          }
        }
      }

      this.segmentsQueue = segments;

      if (this.masterSwarmId === undefined) {
        return;
      }

      let storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
      updateSegmentsMap = this.processSegmentsQueue(storageSegments) || updateSegmentsMap;

      if (yield this.cleanSegmentsStorage()) {
        storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
        updateSegmentsMap = true;
      }

      if (updateSegmentsMap && !this.settings.consumeOnly) {
        this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
      }
    });

    _this.getSegment = id => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      return this.masterSwarmId === undefined ? undefined : this.segmentsStorage.getSegment(id, this.masterSwarmId);
    });

    _this.getSettings = () => {
      return _this.settings;
    };

    _this.getDetails = () => {
      return {
        peerId: _this.p2pManager.getPeerId()
      };
    };

    _this.getBandwidthEstimate = () => {
      return _this.bandwidthApproximator.getBandwidth(_this.now());
    };

    _this.destroy = () => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.httpRandomDownloadInterval !== undefined) {
        clearInterval(this.httpRandomDownloadInterval);
        this.httpRandomDownloadInterval = undefined;
      }

      this.httpDownloadInitialTimeoutTimestamp = -Infinity;
      this.segmentsQueue = [];
      this.httpManager.destroy();
      this.p2pManager.destroy();
      this.masterSwarmId = undefined;
      yield this.segmentsStorage.destroy();
    });

    _this.processInitialSegmentTimeout = () => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.httpRandomDownloadInterval === undefined) {
        return; // Instance destroyed
      }

      if (this.masterSwarmId !== undefined) {
        const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);

        if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
          this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
        }
      }

      if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
        // Set one more timeout for a next segment
        setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment);
      }
    });

    _this.processSegmentsQueue = storageSegments => {
      _this.debugSegments("process segments queue. priority", _this.segmentsQueue.length > 0 ? _this.segmentsQueue[0].priority : 0);

      if (_this.masterSwarmId === undefined || _this.segmentsQueue.length === 0) {
        return false;
      }

      let updateSegmentsMap = false;
      let segmentsMap;
      let httpAllowed = true;

      if (_this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
        let firstNotDownloadePriority;

        for (const segment of _this.segmentsQueue) {
          if (!storageSegments.has(segment.id)) {
            firstNotDownloadePriority = segment.priority;
            break;
          }
        }

        const httpTimeout = _this.now() - _this.httpDownloadInitialTimeoutTimestamp;

        httpAllowed = httpTimeout >= _this.settings.httpDownloadInitialTimeout || firstNotDownloadePriority !== undefined && httpTimeout > _this.settings.httpDownloadInitialTimeoutPerSegment && firstNotDownloadePriority <= 0;

        if (httpAllowed) {
          _this.debugSegments("cancel initial HTTP download timeout - timed out");

          _this.httpDownloadInitialTimeoutTimestamp = -Infinity;
        }
      }

      for (let index = 0; index < _this.segmentsQueue.length; index++) {
        const segment = _this.segmentsQueue[index];

        if (storageSegments.has(segment.id)) {
          continue;
        } // Segment priority changed, notify http manager


        if (_this.httpManager.isDownloading(segment)) {
          _this.httpManager.updatePriority(segment);

          continue;
        }

        if (segment.priority <= _this.settings.requiredSegmentsPriority && httpAllowed && !_this.httpManager.isFailed(segment)) {
          // Download required segments over HTTP
          if (_this.httpManager.getActiveDownloadsCount() >= _this.settings.simultaneousHttpDownloads) {
            // Not enough HTTP download resources. Abort one of the HTTP downloads.
            for (let i = _this.segmentsQueue.length - 1; i > index; i--) {
              const segmentToAbort = _this.segmentsQueue[i];

              if (_this.httpManager.isDownloading(segmentToAbort)) {
                _this.debugSegments("cancel HTTP download", segmentToAbort.priority, segmentToAbort.url);

                _this.httpManager.abort(segmentToAbort);

                break;
              }
            }
          }

          if (_this.httpManager.getActiveDownloadsCount() < _this.settings.simultaneousHttpDownloads) {
            // Abort P2P download of the required segment if any and force HTTP download
            const downloadedPieces = _this.p2pManager.abort(segment);

            _this.httpManager.download(segment, downloadedPieces);

            _this.debugSegments("HTTP download (priority)", segment.priority, segment.url);

            updateSegmentsMap = true;
            continue;
          }
        }

        if (_this.p2pManager.isDownloading(segment)) {
          continue;
        }

        if (segment.priority <= _this.settings.requiredSegmentsPriority) {
          // Download required segments over P2P
          segmentsMap = segmentsMap ? segmentsMap : _this.p2pManager.getOverallSegmentsMap();

          if (segmentsMap.get(segment.id) !== _media_peer__WEBPACK_IMPORTED_MODULE_6__.MediaPeerSegmentStatus.Loaded) {
            continue;
          }

          if (_this.p2pManager.getActiveDownloadsCount() >= _this.settings.simultaneousP2PDownloads) {
            // Not enough P2P download resources. Abort one of the P2P downloads.
            for (let i = _this.segmentsQueue.length - 1; i > index; i--) {
              const segmentToAbort = _this.segmentsQueue[i];

              if (_this.p2pManager.isDownloading(segmentToAbort)) {
                _this.debugSegments("cancel P2P download", segmentToAbort.priority, segmentToAbort.url);

                _this.p2pManager.abort(segmentToAbort);

                break;
              }
            }
          }

          if (_this.p2pManager.getActiveDownloadsCount() < _this.settings.simultaneousP2PDownloads) {
            if (_this.p2pManager.download(segment)) {
              _this.debugSegments("P2P download (priority)", segment.priority, segment.url);

              continue;
            }
          }

          continue;
        }

        if (_this.p2pManager.getActiveDownloadsCount() < _this.settings.simultaneousP2PDownloads && segment.priority <= _this.settings.p2pDownloadMaxPriority) {
          if (_this.p2pManager.download(segment)) {
            _this.debugSegments("P2P download", segment.priority, segment.url);
          }
        }
      }

      return updateSegmentsMap;
    };

    _this.downloadRandomSegmentOverHttp = () => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.masterSwarmId === undefined || this.httpRandomDownloadInterval === undefined || this.httpDownloadInitialTimeoutTimestamp !== -Infinity || this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads || this.settings.httpDownloadProbabilitySkipIfNoPeers && this.p2pManager.getPeers().size === 0 || this.settings.consumeOnly) {
        return;
      }

      const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
      const segmentsMap = this.p2pManager.getOverallSegmentsMap();
      const pendingQueue = this.segmentsQueue.filter(s => !this.p2pManager.isDownloading(s) && !this.httpManager.isDownloading(s) && !segmentsMap.has(s.id) && !this.httpManager.isFailed(s) && s.priority <= this.settings.httpDownloadMaxPriority && !storageSegments.has(s.id));

      if (pendingQueue.length === 0) {
        return;
      }

      if (Math.random() > this.settings.httpDownloadProbability * pendingQueue.length) {
        return;
      }

      const segment = pendingQueue[Math.floor(Math.random() * pendingQueue.length)];
      this.debugSegments("HTTP download (random)", segment.priority, segment.url);
      this.httpManager.download(segment);
      this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
    });

    _this.onSegmentStartLoad = (method, segment) => {
      _this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.SegmentStartLoad, method, segment);
    };

    _this.onPieceBytesDownloaded = (method, segment, bytes, peerId) => {
      _this.bandwidthApproximator.addBytes(bytes, _this.now());

      _this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.PieceBytesDownloaded, method, segment, bytes, peerId);
    };

    _this.onPieceBytesUploaded = (method, segment, bytes, peerId) => {
      _this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.PieceBytesUploaded, method, segment, bytes, peerId);
    };

    _this.onSegmentLoaded = (segment, data, peerId) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      this.debugSegments("segment loaded", segment.id, segment.url);

      if (this.masterSwarmId === undefined) {
        return;
      }

      segment.data = data;
      segment.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now());
      yield this.segmentsStorage.storeSegment(segment);
      this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.SegmentLoaded, segment, peerId);
      const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
      this.processSegmentsQueue(storageSegments);

      if (!this.settings.consumeOnly) {
        this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
      }
    });

    _this.onSegmentError = (segment, details, peerId) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      this.debugSegments("segment error", segment.id, segment.url, peerId, details);
      this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.SegmentError, segment, details, peerId);

      if (this.masterSwarmId !== undefined) {
        const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);

        if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
          this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
        }
      }
    });

    _this.onSegmentSize = (segment, size) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      this.debugSegments("segment size", segment.id, size);
      this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.SegmentSize, segment, size);
    });

    _this.getStreamSwarmId = segment => {
      return segment.streamId === undefined ? segment.masterSwarmId : `${segment.masterSwarmId}+${segment.streamId}`;
    };

    _this.createSegmentsMap = storageSegments => {
      const segmentsMap = {};

      const addSegmentToMap = (segment, status) => {
        const streamSwarmId = _this.getStreamSwarmId(segment);

        const segmentId = segment.sequence;
        let segmentsIdsAndStatuses = segmentsMap[streamSwarmId];

        if (segmentsIdsAndStatuses === undefined) {
          segmentsIdsAndStatuses = ["", []];
          segmentsMap[streamSwarmId] = segmentsIdsAndStatuses;
        }

        const segmentsStatuses = segmentsIdsAndStatuses[1];
        segmentsIdsAndStatuses[0] += segmentsStatuses.length === 0 ? segmentId : `|${segmentId}`;
        segmentsStatuses.push(status);
      };

      for (const storageSegment of storageSegments.values()) {
        addSegmentToMap(storageSegment.segment, _media_peer__WEBPACK_IMPORTED_MODULE_6__.MediaPeerSegmentStatus.Loaded);
      }

      for (const download of _this.httpManager.getActiveDownloads().values()) {
        addSegmentToMap(download.segment, _media_peer__WEBPACK_IMPORTED_MODULE_6__.MediaPeerSegmentStatus.LoadingByHttp);
      }

      return segmentsMap;
    };

    _this.onPeerConnect = peer => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.PeerConnect, peer);

      if (!this.settings.consumeOnly && this.masterSwarmId !== undefined) {
        this.p2pManager.sendSegmentsMap(peer.id, this.createSegmentsMap(yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId)));
      }
    });

    _this.onPeerClose = peerId => {
      _this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_3__.Events.PeerClose, peerId);
    };

    _this.onTrackerUpdate = data => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity && data.incomplete !== undefined && data.incomplete <= 1) {
        this.debugSegments("cancel initial HTTP download timeout - no peers");
        this.httpDownloadInitialTimeoutTimestamp = -Infinity;

        if (this.masterSwarmId !== undefined) {
          const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);

          if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
            this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
          }
        }
      }
    });

    _this.cleanSegmentsStorage = () => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.masterSwarmId === undefined) {
        return false;
      }

      return this.segmentsStorage.clean(this.masterSwarmId, id => this.segmentsQueue.find(queueSegment => queueSegment.id === id) !== undefined);
    });

    _this.now = () => {
      return performance.now();
    };

    _this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
    const {
      bufferedSegmentsCount
    } = settings;

    if (typeof bufferedSegmentsCount === "number") {
      if (settings.p2pDownloadMaxPriority === undefined) {
        _this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
      }

      if (settings.httpDownloadMaxPriority === undefined) {
        _this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
      }
    }

    _this.segmentsStorage = _this.settings.segmentsStorage === undefined ? new _segments_memory_storage__WEBPACK_IMPORTED_MODULE_8__.SegmentsMemoryStorage(_this.settings) : _this.settings.segmentsStorage;

    _this.debug("loader settings", _this.settings);

    _this.httpManager = _this.createHttpManager();

    _this.httpManager.on("segment-start-load", segment => _this.onSegmentStartLoad("http", segment));

    _this.httpManager.on("segment-loaded", _this.onSegmentLoaded);

    _this.httpManager.on("segment-error", _this.onSegmentError);

    _this.httpManager.on("segment-size", _this.onSegmentSize);

    _this.httpManager.on("bytes-downloaded", (segment, bytes) => {
      _this.onPieceBytesDownloaded("http", segment, bytes);
    });

    _this.p2pManager = _this.createP2PManager();

    _this.p2pManager.on("segment-start-load", segment => _this.onSegmentStartLoad("p2p", segment));

    _this.p2pManager.on("segment-loaded", _this.onSegmentLoaded);

    _this.p2pManager.on("segment-error", _this.onSegmentError);

    _this.p2pManager.on("segment-size", _this.onSegmentSize);

    _this.p2pManager.on("peer-data-updated", () => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.masterSwarmId === undefined) {
        return;
      }

      const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);

      if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
        this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
      }
    }));

    _this.p2pManager.on("bytes-downloaded", (segment, bytes, peerId) => _this.onPieceBytesDownloaded("p2p", segment, bytes, peerId));

    _this.p2pManager.on("bytes-uploaded", (segment, bytes, peerId) => _this.onPieceBytesUploaded("p2p", segment, bytes, peerId));

    _this.p2pManager.on("peer-connected", _this.onPeerConnect);

    _this.p2pManager.on("peer-closed", _this.onPeerClose);

    _this.p2pManager.on("tracker-update", _this.onTrackerUpdate);

    return _this;
  }

  return _createClass(HybridLoader);
}(events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter);

HybridLoader.isSupported = () => {
  return window.RTCPeerConnection.prototype.createDataChannel !== undefined;
};

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts":
/*!************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Events": () => (/* reexport safe */ _loader_interface__WEBPACK_IMPORTED_MODULE_0__.Events),
/* harmony export */   "HybridLoader": () => (/* reexport safe */ _hybrid_loader__WEBPACK_IMPORTED_MODULE_1__.HybridLoader),
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _loader_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader-interface */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts");
/* harmony import */ var _hybrid_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hybrid-loader */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts");
/**
 * @license Apache-2.0
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const version = "0.6.2";



/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Events": () => (/* binding */ Events)
/* harmony export */ });
/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Events;

(function (Events) {
  /**
   * Emitted when segment has been downloaded.
   * Args: segment
   */
  Events["SegmentLoaded"] = "segment_loaded";
  /**
   * Emitted when an error occurred while loading the segment.
   * Args: segment, error
   */

  Events["SegmentError"] = "segment_error";
  /**
   * Emitter when we the segment size is known
   * Args: segment, size
   */

  Events["SegmentSize"] = "segment_size";
  /**
   * Emitted for each segment that does not hit into a new segments queue when the load() method is called.
   * Args: segment
   */

  Events["SegmentAbort"] = "segment_abort";
  /**
   * Emitted when the loader started to load a segment
   * Args: method, segment
   */

  Events["SegmentStartLoad"] = "segment_start_load";
  /**
   * Emitted when a peer is connected.
   * Args: peer
   */

  Events["PeerConnect"] = "peer_connect";
  /**
   * Emitted when a peer is disconnected.
   * Args: peerId
   */

  Events["PeerClose"] = "peer_close";
  /**
   * Emitted when a segment piece has been downloaded.
   * Args: method (can be "http" or "p2p" only), bytes
   */

  Events["PieceBytesDownloaded"] = "piece_bytes_downloaded";
  /**
   * Emitted when a segment piece has been uploaded.
   * Args: method (can be "p2p" only), bytes
   */

  Events["PieceBytesUploaded"] = "piece_bytes_uploaded";
})(Events || (Events = {}));

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaPeer": () => (/* binding */ MediaPeer),
/* harmony export */   "MediaPeerSegmentStatus": () => (/* binding */ MediaPeerSegmentStatus)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */



var MediaPeerCommands;

(function (MediaPeerCommands) {
  MediaPeerCommands[MediaPeerCommands["SegmentData"] = 0] = "SegmentData";
  MediaPeerCommands[MediaPeerCommands["SegmentAbsent"] = 1] = "SegmentAbsent";
  MediaPeerCommands[MediaPeerCommands["SegmentsMap"] = 2] = "SegmentsMap";
  MediaPeerCommands[MediaPeerCommands["SegmentRequest"] = 3] = "SegmentRequest";
  MediaPeerCommands[MediaPeerCommands["CancelSegmentRequest"] = 4] = "CancelSegmentRequest";
})(MediaPeerCommands || (MediaPeerCommands = {}));

var MediaPeerSegmentStatus;

(function (MediaPeerSegmentStatus) {
  MediaPeerSegmentStatus[MediaPeerSegmentStatus["Loaded"] = 0] = "Loaded";
  MediaPeerSegmentStatus[MediaPeerSegmentStatus["LoadingByHttp"] = 1] = "LoadingByHttp";
})(MediaPeerSegmentStatus || (MediaPeerSegmentStatus = {}));

let DownloadingSegment = /*#__PURE__*/_createClass(function DownloadingSegment(id, size) {
  _classCallCheck(this, DownloadingSegment);

  this.id = id;
  this.size = size;
  this.bytesDownloaded = 0;
  this.pieces = [];
});

let MediaPeer = /*#__PURE__*/function (_STEEmitter) {
  _inherits(MediaPeer, _STEEmitter);

  var _super = _createSuper(MediaPeer);

  function MediaPeer( // eslint-disable-next-line
  peer, settings) {
    var _this;

    _classCallCheck(this, MediaPeer);

    _this = _super.call(this);
    _this.peer = peer;
    _this.settings = settings;
    _this.remoteAddress = "";
    _this.downloadingSegmentId = null;
    _this.downloadingSegment = null;
    _this.segmentsMap = new Map();
    _this.debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:media-peer");
    _this.timer = null;

    _this.onPeerConnect = () => {
      _this.debug("peer connect", _this.id, _assertThisInitialized(_this));

      _this.remoteAddress = _this.peer.remoteAddress;

      _this.emit("connect", _assertThisInitialized(_this));
    };

    _this.onPeerClose = () => {
      _this.debug("peer close", _this.id, _assertThisInitialized(_this));

      _this.terminateSegmentRequest();

      _this.emit("close", _assertThisInitialized(_this));
    };

    _this.onPeerError = error => {
      _this.debug("peer error", _this.id, error, _assertThisInitialized(_this));
    };

    _this.receiveSegmentPiece = data => {
      if (!_this.downloadingSegment) {
        // The segment was not requested or canceled
        _this.debug("peer segment not requested", _this.id, _assertThisInitialized(_this));

        return;
      }

      _this.downloadingSegment.bytesDownloaded += data.byteLength;

      _this.downloadingSegment.pieces.push(data);

      const segmentId = _this.downloadingSegment.id;

      _this.emit("bytes-downloaded", _assertThisInitialized(_this), segmentId, data.byteLength);

      if (_this.downloadingSegment.bytesDownloaded === _this.downloadingSegment.size) {
        const segmentData = new Uint8Array(_this.downloadingSegment.size);
        let offset = 0;

        for (const piece of _this.downloadingSegment.pieces) {
          segmentData.set(new Uint8Array(piece), offset);
          offset += piece.byteLength;
        }

        _this.debug("peer segment download done", _this.id, segmentId, _assertThisInitialized(_this));

        _this.terminateSegmentRequest();

        _this.emit("segment-loaded", _assertThisInitialized(_this), segmentId, segmentData.buffer);
      } else if (_this.downloadingSegment.bytesDownloaded > _this.downloadingSegment.size) {
        _this.debug("peer segment download bytes mismatch", _this.id, segmentId, _assertThisInitialized(_this));

        _this.terminateSegmentRequest();

        _this.emit("segment-error", _assertThisInitialized(_this), segmentId, "Too many bytes received for segment");
      }
    };

    _this.getJsonCommand = data => {
      const bytes = new Uint8Array(data); // Serialized JSON string check by first, second and last characters: '{" .... }'

      if (bytes[0] === 123 && bytes[1] === 34 && bytes[data.byteLength - 1] === 125) {
        try {
          return JSON.parse(new TextDecoder().decode(data));
        } catch (_a) {
          return null;
        }
      }

      return null;
    };

    _this.onPeerData = data => {
      const command = _this.getJsonCommand(data);

      if (command === null) {
        _this.receiveSegmentPiece(data);

        return;
      }

      if (_this.downloadingSegment) {
        _this.debug("peer segment download is interrupted by a command", _this.id, _assertThisInitialized(_this));

        const segmentId = _this.downloadingSegment.id;

        _this.terminateSegmentRequest();

        _this.emit("segment-error", _assertThisInitialized(_this), segmentId, "Segment download is interrupted by a command");

        return;
      }

      _this.debug("peer receive command", _this.id, command, _assertThisInitialized(_this));

      switch (command.c) {
        case MediaPeerCommands.SegmentsMap:
          _this.segmentsMap = _this.createSegmentsMap(command.m);

          _this.emit("data-updated");

          break;

        case MediaPeerCommands.SegmentRequest:
          _this.emit("segment-request", _assertThisInitialized(_this), command.i);

          break;

        case MediaPeerCommands.SegmentData:
          if (_this.downloadingSegmentId && _this.downloadingSegmentId === command.i && typeof command.s === "number" && command.s >= 0) {
            _this.downloadingSegment = new DownloadingSegment(command.i, command.s);

            _this.emit("segment-start-load", _this.downloadingSegment.id);

            _this.emit("segment-size", _this.downloadingSegment.id, _this.downloadingSegment.size);

            _this.cancelResponseTimeoutTimer();
          }

          break;

        case MediaPeerCommands.SegmentAbsent:
          if (_this.downloadingSegmentId && _this.downloadingSegmentId === command.i) {
            _this.terminateSegmentRequest();

            _this.segmentsMap.delete(command.i);

            _this.emit("segment-absent", _assertThisInitialized(_this), command.i);
          }

          break;

        case MediaPeerCommands.CancelSegmentRequest:
          // TODO: peer stop sending buffer
          break;

        default:
          break;
      }
    };

    _this.createSegmentsMap = segments => {
      if (!(segments instanceof Object)) {
        return new Map();
      }

      const segmentsMap = new Map();

      for (const streamSwarmId of Object.keys(segments)) {
        const swarmData = segments[streamSwarmId];

        if (!(swarmData instanceof Array) || swarmData.length !== 2 || typeof swarmData[0] !== "string" || !(swarmData[1] instanceof Array)) {
          return new Map();
        }

        const segmentsIds = swarmData[0].split("|");
        const segmentsStatuses = swarmData[1];

        if (segmentsIds.length !== segmentsStatuses.length) {
          return new Map();
        }

        for (let i = 0; i < segmentsIds.length; i++) {
          const segmentStatus = segmentsStatuses[i];

          if (typeof segmentStatus !== "number" || MediaPeerSegmentStatus[segmentStatus] === undefined) {
            return new Map();
          }

          segmentsMap.set(`${streamSwarmId}+${segmentsIds[i]}`, segmentStatus);
        }
      }

      return segmentsMap;
    };

    _this.sendCommand = command => {
      _this.debug("peer send command", _this.id, command, _assertThisInitialized(_this));

      _this.peer.write(JSON.stringify(command));
    };

    _this.destroy = () => {
      _this.debug("peer destroy", _this.id, _assertThisInitialized(_this));

      _this.terminateSegmentRequest();

      _this.peer.destroy();
    };

    _this.getDownloadingSegmentId = () => {
      return _this.downloadingSegmentId;
    };

    _this.getSegmentsMap = () => {
      return _this.segmentsMap;
    };

    _this.sendSegmentsMap = segmentsMap => {
      _this.sendCommand({
        c: MediaPeerCommands.SegmentsMap,
        m: segmentsMap
      });
    };

    _this.sendSegmentData = (segmentId, data) => {
      _this.sendCommand({
        c: MediaPeerCommands.SegmentData,
        i: segmentId,
        s: data.byteLength
      });

      let bytesLeft = data.byteLength;

      while (bytesLeft > 0) {
        const bytesToSend = bytesLeft >= _this.settings.webRtcMaxMessageSize ? _this.settings.webRtcMaxMessageSize : bytesLeft;
        const buffer = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(data, data.byteLength - bytesLeft, bytesToSend);

        _this.peer.write(buffer);

        bytesLeft -= bytesToSend;
      }

      _this.emit("bytes-uploaded", _assertThisInitialized(_this), segmentId, data.byteLength);
    };

    _this.sendSegmentAbsent = segmentId => {
      _this.sendCommand({
        c: MediaPeerCommands.SegmentAbsent,
        i: segmentId
      });
    };

    _this.requestSegment = segmentId => {
      if (_this.downloadingSegmentId) {
        throw new Error("A segment is already downloading: " + _this.downloadingSegmentId);
      }

      _this.sendCommand({
        c: MediaPeerCommands.SegmentRequest,
        i: segmentId
      });

      _this.downloadingSegmentId = segmentId;

      _this.runResponseTimeoutTimer();
    };

    _this.cancelSegmentRequest = () => {
      let downloadingSegment;

      if (_this.downloadingSegmentId) {
        const segmentId = _this.downloadingSegmentId;
        downloadingSegment = _this.downloadingSegment ? _this.downloadingSegment.pieces : undefined;

        _this.terminateSegmentRequest();

        _this.sendCommand({
          c: MediaPeerCommands.CancelSegmentRequest,
          i: segmentId
        });
      }

      return downloadingSegment;
    };

    _this.runResponseTimeoutTimer = () => {
      _this.timer = setTimeout(() => {
        _this.timer = null;

        if (!_this.downloadingSegmentId) {
          return;
        }

        const segmentId = _this.downloadingSegmentId;

        _this.cancelSegmentRequest();

        _this.emit("segment-timeout", _assertThisInitialized(_this), segmentId); // TODO: send peer not responding event

      }, _this.settings.p2pSegmentDownloadTimeout);
    };

    _this.cancelResponseTimeoutTimer = () => {
      if (_this.timer) {
        clearTimeout(_this.timer);
        _this.timer = null;
      }
    };

    _this.terminateSegmentRequest = () => {
      _this.downloadingSegmentId = null;
      _this.downloadingSegment = null;

      _this.cancelResponseTimeoutTimer();
    };

    _this.peer.on("connect", _this.onPeerConnect);

    _this.peer.on("close", _this.onPeerClose);

    _this.peer.on("error", _this.onPeerError);

    _this.peer.on("data", _this.onPeerData);

    _this.id = peer.id;
    return _this;
  }

  return _createClass(MediaPeer);
}(_stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__.STEEmitter);

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P2PMediaManager": () => (/* binding */ P2PMediaManager)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bittorrent-tracker/client */ "./node_modules/bittorrent-tracker/client.js");
/* harmony import */ var bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var sha_js_sha1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sha.js/sha1 */ "./node_modules/sha.js/sha1.js");
/* harmony import */ var sha_js_sha1__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sha_js_sha1__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
/* harmony import */ var _media_peer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./media-peer */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts");
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */







const PEER_PROTOCOL_VERSION = 2;
const PEER_ID_VERSION_STRING = '0.6.2'.replace(/\d*./g, v => `0${parseInt(v, 10) % 100}`.slice(-2)).slice(0, 4);
const PEER_ID_VERSION_PREFIX = `-WW${PEER_ID_VERSION_STRING}-`; // Using WebTorrent client ID in order to not be banned by websocket trackers

let PeerSegmentRequest = /*#__PURE__*/_createClass(function PeerSegmentRequest(peerId, segment) {
  _classCallCheck(this, PeerSegmentRequest);

  this.peerId = peerId;
  this.segment = segment;
});

function generatePeerId() {
  const PEER_ID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const PEER_ID_LENGTH = 20;
  let peerId = PEER_ID_VERSION_PREFIX;

  for (let i = 0; i < PEER_ID_LENGTH - PEER_ID_VERSION_PREFIX.length; i++) {
    peerId += PEER_ID_SYMBOLS.charAt(Math.floor(Math.random() * PEER_ID_SYMBOLS.length));
  }

  return new TextEncoder().encode(peerId).buffer;
}

let P2PMediaManager = /*#__PURE__*/function (_STEEmitter) {
  _inherits(P2PMediaManager, _STEEmitter);

  var _super = _createSuper(P2PMediaManager);

  function P2PMediaManager(segmentsStorage, settings) {
    var _this;

    _classCallCheck(this, P2PMediaManager);

    _this = _super.call(this);
    _this.segmentsStorage = segmentsStorage;
    _this.settings = settings; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    _this.trackerClient = null;
    _this.peers = new Map();
    _this.peerCandidates = new Map();
    _this.peerSegmentRequests = new Map();
    _this.streamSwarmId = null;
    _this.debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:p2p-media-manager");
    _this.pendingTrackerClient = null;

    _this.getPeers = () => {
      return _this.peers;
    };

    _this.getPeerId = () => {
      return buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(_this.peerId).toString("hex");
    };

    _this.setStreamSwarmId = (streamSwarmId, masterSwarmId) => {
      if (_this.streamSwarmId === streamSwarmId) {
        return;
      }

      _this.destroy(true);

      _this.streamSwarmId = streamSwarmId;
      _this.masterSwarmId = masterSwarmId;

      _this.debug("stream swarm ID", _this.streamSwarmId);

      _this.pendingTrackerClient = {
        isDestroyed: false
      };
      const pendingTrackerClient = _this.pendingTrackerClient; // TODO: native browser 'crypto.subtle' implementation doesn't work in Chrome in insecure pages
      // TODO: Edge doesn't support SHA-1. Change to SHA-256 once Edge support is required.
      // const infoHash = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(PEER_PROTOCOL_VERSION + this.streamSwarmId));

      const infoHash = new (sha_js_sha1__WEBPACK_IMPORTED_MODULE_3___default())().update(`${PEER_PROTOCOL_VERSION}${_this.streamSwarmId}`).digest(); // destroy may be called while waiting for the hash to be calculated

      if (!pendingTrackerClient.isDestroyed) {
        _this.pendingTrackerClient = null;

        _this.createClient(infoHash);
      } else if (_this.trackerClient !== null) {
        _this.trackerClient.destroy();

        _this.trackerClient = null;
      }
    };

    _this.createClient = infoHash => {
      if (!_this.settings.useP2P) {
        return;
      }

      const clientOptions = {
        infoHash: buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(infoHash, 0, 20),
        peerId: buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(_this.peerId, 0, 20),
        announce: _this.settings.trackerAnnounce,
        rtcConfig: _this.settings.rtcConfig,
        port: 6881,
        getAnnounceOpts: () => {
          return {
            numwant: _this.settings.peerRequestsPerAnnounce
          };
        }
      };
      let oldTrackerClient = _this.trackerClient;
      _this.trackerClient = new (bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_1___default())(clientOptions);

      _this.trackerClient.on("error", _this.onTrackerError);

      _this.trackerClient.on("warning", _this.onTrackerWarning);

      _this.trackerClient.on("update", _this.onTrackerUpdate);

      _this.trackerClient.on("peer", _this.onTrackerPeer);

      _this.trackerClient.start();

      if (oldTrackerClient !== null) {
        oldTrackerClient.destroy();
        oldTrackerClient = null;
      }
    };

    _this.onTrackerError = error => {
      _this.debug("tracker error", error);
    };

    _this.onTrackerWarning = warning => {
      _this.debug("tracker warning", warning);
    };

    _this.onTrackerUpdate = data => {
      _this.debug("tracker update", data);

      _this.emit("tracker-update", data);
    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


    _this.onTrackerPeer = trackerPeer => {
      _this.debug("tracker peer", trackerPeer.id, trackerPeer);

      if (_this.peers.has(trackerPeer.id)) {
        _this.debug("tracker peer already connected", trackerPeer.id, trackerPeer);

        trackerPeer.destroy();
        return;
      }

      const peer = new _media_peer__WEBPACK_IMPORTED_MODULE_5__.MediaPeer(trackerPeer, _this.settings);
      peer.on("connect", _this.onPeerConnect);
      peer.on("close", _this.onPeerClose);
      peer.on("data-updated", _this.onPeerDataUpdated);
      peer.on("segment-request", _this.onSegmentRequest);
      peer.on("segment-loaded", _this.onSegmentLoaded);
      peer.on("segment-absent", _this.onSegmentAbsent);
      peer.on("segment-error", _this.onSegmentError);
      peer.on("segment-size", _this.onSegmentSize);
      peer.on("segment-start-load", _this.onSegmentStartLoad);
      peer.on("segment-timeout", _this.onSegmentTimeout);
      peer.on("bytes-downloaded", _this.onPieceBytesDownloaded);
      peer.on("bytes-uploaded", _this.onPieceBytesUploaded);

      let peerCandidatesById = _this.peerCandidates.get(peer.id);

      if (!peerCandidatesById) {
        peerCandidatesById = [];

        _this.peerCandidates.set(peer.id, peerCandidatesById);
      }

      peerCandidatesById.push(peer);
    };

    _this.download = segment => {
      if (_this.isDownloading(segment)) {
        return false;
      }

      const candidates = [];

      for (const peer of _this.peers.values()) {
        if (peer.getDownloadingSegmentId() === null && peer.getSegmentsMap().get(segment.id) === _media_peer__WEBPACK_IMPORTED_MODULE_5__.MediaPeerSegmentStatus.Loaded) {
          candidates.push(peer);
        }
      }

      if (candidates.length === 0) {
        return false;
      }

      const peer = candidates[Math.floor(Math.random() * candidates.length)];
      peer.requestSegment(segment.id);

      _this.peerSegmentRequests.set(segment.id, new PeerSegmentRequest(peer.id, segment));

      return true;
    };

    _this.abort = segment => {
      let downloadingSegment;

      const peerSegmentRequest = _this.peerSegmentRequests.get(segment.id);

      if (peerSegmentRequest) {
        const peer = _this.peers.get(peerSegmentRequest.peerId);

        if (peer) {
          downloadingSegment = peer.cancelSegmentRequest();
        }

        _this.peerSegmentRequests.delete(segment.id);
      }

      return downloadingSegment;
    };

    _this.isDownloading = segment => {
      return _this.peerSegmentRequests.has(segment.id);
    };

    _this.getActiveDownloadsCount = () => {
      return _this.peerSegmentRequests.size;
    };

    _this.destroy = function () {
      let swarmChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _this.streamSwarmId = null;

      if (_this.trackerClient) {
        _this.trackerClient.stop();

        if (swarmChange) {
          // Don't destroy trackerClient to reuse its WebSocket connection to the tracker server
          _this.trackerClient.removeAllListeners("error");

          _this.trackerClient.removeAllListeners("warning");

          _this.trackerClient.removeAllListeners("update");

          _this.trackerClient.removeAllListeners("peer");
        } else {
          _this.trackerClient.destroy();

          _this.trackerClient = null;
        }
      }

      if (_this.pendingTrackerClient) {
        _this.pendingTrackerClient.isDestroyed = true;
        _this.pendingTrackerClient = null;
      }

      _this.peers.forEach(peer => peer.destroy());

      _this.peers.clear();

      _this.peerSegmentRequests.clear();

      for (const peerCandidateById of _this.peerCandidates.values()) {
        for (const peerCandidate of peerCandidateById) {
          peerCandidate.destroy();
        }
      }

      _this.peerCandidates.clear();
    };

    _this.sendSegmentsMapToAll = segmentsMap => {
      _this.peers.forEach(peer => peer.sendSegmentsMap(segmentsMap));
    };

    _this.sendSegmentsMap = (peerId, segmentsMap) => {
      const peer = _this.peers.get(peerId);

      if (peer) {
        peer.sendSegmentsMap(segmentsMap);
      }
    };

    _this.getOverallSegmentsMap = () => {
      const overallSegmentsMap = new Map();

      for (const peer of _this.peers.values()) {
        for (const [segmentId, segmentStatus] of peer.getSegmentsMap()) {
          if (segmentStatus === _media_peer__WEBPACK_IMPORTED_MODULE_5__.MediaPeerSegmentStatus.Loaded) {
            overallSegmentsMap.set(segmentId, _media_peer__WEBPACK_IMPORTED_MODULE_5__.MediaPeerSegmentStatus.Loaded);
          } else if (!overallSegmentsMap.get(segmentId)) {
            overallSegmentsMap.set(segmentId, _media_peer__WEBPACK_IMPORTED_MODULE_5__.MediaPeerSegmentStatus.LoadingByHttp);
          }
        }
      }

      return overallSegmentsMap;
    };

    _this.onPieceBytesDownloaded = (peer, segmentId, bytes) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      if (peerSegmentRequest) {
        _this.emit("bytes-downloaded", peerSegmentRequest.segment, bytes, peer.id);
      }
    };

    _this.onPieceBytesUploaded = (peer, segmentId, bytes) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      _this.emit("bytes-uploaded", peerSegmentRequest ? peerSegmentRequest.segment : null, bytes, peer.id);
    };

    _this.onPeerConnect = peer => {
      const connectedPeer = _this.peers.get(peer.id);

      if (connectedPeer) {
        _this.debug("tracker peer already connected (in peer connect)", peer.id, peer);

        peer.destroy();
        return;
      } // First peer with the ID connected


      _this.peers.set(peer.id, peer); // Destroy all other peer candidates


      const peerCandidatesById = _this.peerCandidates.get(peer.id);

      if (peerCandidatesById) {
        for (const peerCandidate of peerCandidatesById) {
          if (peerCandidate !== peer) {
            peerCandidate.destroy();
          }
        }

        _this.peerCandidates.delete(peer.id);
      }

      _this.emit("peer-connected", {
        id: peer.id,
        remoteAddress: peer.remoteAddress
      });
    };

    _this.onPeerClose = peer => {
      if (_this.peers.get(peer.id) !== peer) {
        // Try to delete the peer candidate
        const peerCandidatesById = _this.peerCandidates.get(peer.id);

        if (!peerCandidatesById) {
          return;
        }

        const index = peerCandidatesById.indexOf(peer);

        if (index !== -1) {
          peerCandidatesById.splice(index, 1);
        }

        if (peerCandidatesById.length === 0) {
          _this.peerCandidates.delete(peer.id);
        }

        return;
      }

      for (const [key, value] of _this.peerSegmentRequests) {
        if (value.peerId === peer.id) {
          _this.peerSegmentRequests.delete(key);
        }
      }

      _this.peers.delete(peer.id);

      _this.emit("peer-data-updated");

      _this.emit("peer-closed", peer.id);
    };

    _this.onPeerDataUpdated = () => {
      _this.emit("peer-data-updated");
    };

    _this.onSegmentRequest = (peer, segmentId) => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      if (this.masterSwarmId === undefined) {
        return;
      }

      const segment = yield this.segmentsStorage.getSegment(segmentId, this.masterSwarmId);

      if (segment && segment.data) {
        peer.sendSegmentData(segmentId, segment.data);
      } else {
        peer.sendSegmentAbsent(segmentId);
      }
    });

    _this.onSegmentLoaded = (peer, segmentId, data) => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(_assertThisInitialized(_this), void 0, void 0, function* () {
      const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);

      if (!peerSegmentRequest) {
        return;
      }

      const segment = peerSegmentRequest.segment;

      if (this.settings.segmentValidator) {
        try {
          yield this.settings.segmentValidator(Object.assign(Object.assign({}, segment), {
            data: data
          }), "p2p", peer.id);
        } catch (error) {
          this.debug("segment validator failed", error);
          this.peerSegmentRequests.delete(segmentId);
          this.emit("segment-error", segment, error, peer.id);
          this.onPeerClose(peer);
          return;
        }
      }

      this.peerSegmentRequests.delete(segmentId);
      this.emit("segment-loaded", segment, data, peer.id);
    });

    _this.onSegmentAbsent = (peer, segmentId) => {
      _this.peerSegmentRequests.delete(segmentId);

      _this.emit("peer-data-updated");
    };

    _this.onSegmentError = (peer, segmentId, description) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      if (peerSegmentRequest) {
        _this.peerSegmentRequests.delete(segmentId);

        _this.emit("segment-error", peerSegmentRequest.segment, description, peer.id);
      }
    };

    _this.onSegmentSize = (segmentId, size) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      if (peerSegmentRequest) {
        _this.emit("segment-size", peerSegmentRequest.segment, size);
      }
    };

    _this.onSegmentStartLoad = (segmentId, size) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      if (peerSegmentRequest) {
        _this.emit("segment-start-load", peerSegmentRequest.segment, size);
      }
    };

    _this.onSegmentTimeout = (peer, segmentId) => {
      const peerSegmentRequest = _this.peerSegmentRequests.get(segmentId);

      if (peerSegmentRequest) {
        _this.peerSegmentRequests.delete(segmentId);

        peer.destroy();

        if (_this.peers.delete(peerSegmentRequest.peerId)) {
          _this.emit("peer-data-updated");
        }
      }
    };

    _this.peerId = settings.useP2P ? generatePeerId() : new ArrayBuffer(0);

    if (_this.debug.enabled) {
      _this.debug("peer ID", _this.getPeerId(), new TextDecoder().decode(_this.peerId));
    }

    return _this;
  }

  return _createClass(P2PMediaManager);
}(_stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_4__.STEEmitter);

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SegmentsMemoryStorage": () => (/* binding */ SegmentsMemoryStorage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2019 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let SegmentsMemoryStorage = /*#__PURE__*/_createClass(function SegmentsMemoryStorage(settings) {
  _classCallCheck(this, SegmentsMemoryStorage);

  this.settings = settings;
  this.cache = new Map();

  this.storeSegment = segment => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    this.cache.set(segment.id, {
      segment,
      lastAccessed: performance.now()
    });
  });

  this.getSegmentsMap = () => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    return this.cache;
  });

  this.getSegment = id => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    const cacheItem = this.cache.get(id);

    if (cacheItem === undefined) {
      return undefined;
    }

    cacheItem.lastAccessed = performance.now();
    return cacheItem.segment;
  });

  this.hasSegment = id => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    return this.cache.has(id);
  });

  this.clean = (masterSwarmId, lockedSegmentsFilter) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    const segmentsToDelete = [];
    const remainingSegments = []; // Delete old segments

    const now = performance.now();

    for (const cachedSegment of this.cache.values()) {
      if (now - cachedSegment.lastAccessed > this.settings.cachedSegmentExpiration) {
        segmentsToDelete.push(cachedSegment.segment.id);
      } else {
        remainingSegments.push(cachedSegment);
      }
    } // Delete segments over cached count


    let countOverhead = remainingSegments.length - this.settings.cachedSegmentsCount;

    if (countOverhead > 0) {
      remainingSegments.sort((a, b) => a.lastAccessed - b.lastAccessed);

      for (const cachedSegment of remainingSegments) {
        if (lockedSegmentsFilter === undefined || !lockedSegmentsFilter(cachedSegment.segment.id)) {
          segmentsToDelete.push(cachedSegment.segment.id);
          countOverhead--;

          if (countOverhead === 0) {
            break;
          }
        }
      }
    }

    segmentsToDelete.forEach(id => this.cache.delete(id));
    return segmentsToDelete.length > 0;
  });

  this.destroy = () => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
    this.cache.clear();
  });
});

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STEEmitter": () => (/* binding */ STEEmitter)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

let STEEmitter = /*#__PURE__*/function (_EventEmitter) {
  _inherits(STEEmitter, _EventEmitter);

  var _super = _createSuper(STEEmitter);

  function STEEmitter() {
    var _thisSuper, _thisSuper2, _this;

    _classCallCheck(this, STEEmitter);

    _this = _super.apply(this, arguments);

    _this.on = (event, listener) => _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(STEEmitter.prototype)), "on", _thisSuper).call(_thisSuper, event, listener);

    _this.emit = function (event) {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_get2 = _get((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(STEEmitter.prototype)), "emit", _thisSuper2)).call.apply(_get2, [_thisSuper2, event].concat(args));
    };

    return _this;
  }

  return _createClass(STEEmitter);
}(events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/byte-range.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/byte-range.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "byteRangeToString": () => (/* binding */ byteRangeToString),
/* harmony export */   "compareByteRanges": () => (/* binding */ compareByteRanges),
/* harmony export */   "getByteRange": () => (/* binding */ getByteRange)
/* harmony export */ });
function getByteRange(context) {
  return context.rangeEnd && context.rangeStart !== undefined ? {
    offset: context.rangeStart,
    length: context.rangeEnd - context.rangeStart
  } : undefined;
}
function compareByteRanges(b1, b2) {
  return b1 === undefined ? b2 === undefined : b2 !== undefined && b1.length === b2.length && b1.offset === b2.offset;
}
function byteRangeToString(byteRange) {
  if (byteRange === undefined) {
    return undefined;
  }

  const end = byteRange.offset + byteRange.length - 1;
  return `bytes=${byteRange.offset}-${end}`;
}

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/engine.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/engine.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Engine": () => (/* binding */ Engine)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../p2p-media-loader-core/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
/* harmony import */ var _segment_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./segment-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/segment-manager.ts");
/* harmony import */ var _hlsjs_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hlsjs-loader */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/hlsjs-loader.ts");
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

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





let Engine = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Engine, _EventEmitter);

  var _super = _createSuper(Engine);

  function Engine() {
    var _this;

    let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Engine);

    _this = _super.call(this);
    _this.loader = new _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_1__.HybridLoader(settings.loader);
    _this.segmentManager = new _segment_manager__WEBPACK_IMPORTED_MODULE_2__.SegmentManager(_this.loader, settings);
    Object.keys(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_1__.Events).map(eventKey => _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_1__.Events[eventKey]).forEach(event => _this.loader.on(event, function () {
      var _this2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this2 = _this).emit.apply(_this2, [event].concat(args));
    }));
    return _this;
  }

  _createClass(Engine, [{
    key: "createLoaderClass",
    value: function createLoaderClass() {
      var _a;

      const engine = this; // eslint-disable-line @typescript-eslint/no-this-alias

      return _a = /*#__PURE__*/_createClass(function _a() {
        _classCallCheck(this, _a);

        this.load = (context, config, callbacks) => (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
          this.context = context;
          this.callbacks = callbacks;
          this.impl.load(context, config, callbacks);
        });

        this.abort = () => {
          if (this.context) {
            this.impl.abort(this.context, this.callbacks);
          }
        };

        this.destroy = () => {
          if (this.context) {
            this.impl.abort(this.context);
          }
        };

        this.getResponseHeader = () => undefined;

        this.impl = new _hlsjs_loader__WEBPACK_IMPORTED_MODULE_3__.HlsJsLoader(engine.segmentManager);
        this.stats = this.impl.stats;
      }), _a.getEngine = () => {
        return engine;
      }, _a;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
        yield this.segmentManager.destroy();
      });
    }
  }, {
    key: "getSettings",
    value: function getSettings() {
      return {
        segments: this.segmentManager.getSettings(),
        loader: this.loader.getSettings()
      };
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      return {
        loader: this.loader.getDetails()
      };
    }
  }, {
    key: "setPlayingSegment",
    value: function setPlayingSegment(url, byteRange, start, duration) {
      this.segmentManager.setPlayingSegment(url, byteRange, start, duration);
    }
  }, {
    key: "setPlayingSegmentByCurrentTime",
    value: function setPlayingSegmentByCurrentTime(playheadPosition) {
      this.segmentManager.setPlayingSegmentByCurrentTime(playheadPosition);
    }
  }], [{
    key: "isSupported",
    value: function isSupported() {
      return _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_1__.HybridLoader.isSupported();
    }
  }]);

  return Engine;
}(events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/hlsjs-loader.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/hlsjs-loader.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HlsJsLoader": () => (/* binding */ HlsJsLoader)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../p2p-media-loader-core/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
/* harmony import */ var _byte_range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./byte-range */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/byte-range.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



let HlsJsLoader = /*#__PURE__*/function () {
  function HlsJsLoader(segmentManager) {
    _classCallCheck(this, HlsJsLoader);

    this.isLoaded = false;
    this.stats = {
      loaded: 0,
      total: 0,
      aborted: false,
      retry: 0,
      chunkCount: 0,
      bwEstimate: 0,
      loading: {
        start: 0,
        end: 0,
        first: 0
      },
      parsing: {
        start: 0,
        end: 0
      },
      buffering: {
        start: 0,
        end: 0,
        first: 0
      }
    };
    this.segmentManager = segmentManager;
  }

  _createClass(HlsJsLoader, [{
    key: "load",
    value: function load(context, _config, callbacks) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        HlsJsLoader.updateStatsToStartLoading(this.stats);

        if (context.type) {
          try {
            const result = yield this.segmentManager.loadPlaylist(context.url);
            this.isLoaded = true;
            this.successPlaylist(result, context, callbacks);
          } catch (e) {
            this.error(e, context, callbacks);
          }
        } else if (context.frag) {
          const {
            loader
          } = this.segmentManager;
          const byteRange = (0,_byte_range__WEBPACK_IMPORTED_MODULE_1__.getByteRange)(context);

          const isSegment = segment => {
            return segment.url === context.url && segment.range === (0,_byte_range__WEBPACK_IMPORTED_MODULE_1__.byteRangeToString)(byteRange);
          }; // We may be downloading the segment by P2P, so we don't care about the stats sent to HLS ABR


          let updateStart = setInterval(() => {
            HlsJsLoader.updateStatsToStartLoading(this.stats);
          }, 200);

          const onUpdateSegmentSize = (segment, size) => {
            if (!isSegment(segment)) return;
            this.stats.total = size;
          };

          loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentSize, onUpdateSegmentSize);

          const onUpdateLoaded = (_type, segment, bytes) => {
            if (!isSegment(segment)) return;
            this.stats.loaded += bytes;
          };

          const onSegmentStartLoad = (method, segment) => {
            if (!updateStart || method !== "http" || !isSegment(segment)) return;
            clearInterval(updateStart);
            updateStart = undefined;
            HlsJsLoader.updateStatsToStartLoading(this.stats);
            loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.PieceBytesDownloaded, onUpdateLoaded);
          };

          loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentStartLoad, onSegmentStartLoad);

          try {
            const result = yield this.segmentManager.loadSegment(context.url, byteRange);
            const {
              content
            } = result;

            if (content) {
              this.isLoaded = true;
              setTimeout(() => this.successSegment(content, context, callbacks), 0);
            }
          } catch (e) {
            setTimeout(() => this.error(e, context, callbacks), 0);
          } finally {
            clearInterval(updateStart);
            loader.off(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentStartLoad, onSegmentStartLoad);
            loader.off(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentSize, onUpdateSegmentSize);
            loader.off(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.PieceBytesDownloaded, onUpdateLoaded);
          }
        } else {
          console.warn("Unknown load request", context);
        }
      });
    }
  }, {
    key: "abort",
    value: function abort(context, callbacks) {
      if (this.isLoaded) return;
      this.segmentManager.abortSegment(context.url, (0,_byte_range__WEBPACK_IMPORTED_MODULE_1__.getByteRange)(context));
      this.stats.aborted = true;
      const onAbort = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onAbort;

      if (onAbort) {
        onAbort(this.stats, context, undefined);
      }
    }
  }, {
    key: "successPlaylist",
    value: function successPlaylist(xhr, context, callbacks) {
      const now = performance.now();
      this.stats.loading.end = now;
      this.stats.loaded = xhr.response.length;
      this.stats.total = xhr.response.length;
      callbacks.onSuccess({
        url: xhr.responseURL,
        data: xhr.response
      }, this.stats, context, undefined);
    }
  }, {
    key: "successSegment",
    value: function successSegment(content, context, callbacks) {
      const now = performance.now();
      this.stats.loading.end = now;
      this.stats.loaded = content.byteLength;
      this.stats.total = content.byteLength;

      if (callbacks.onProgress) {
        callbacks.onProgress(this.stats, context, content, undefined);
      }

      callbacks.onSuccess({
        url: context.url,
        data: content
      }, this.stats, context, undefined);
    }
  }, {
    key: "error",
    value: function error(_error, context, callbacks) {
      callbacks.onError(_error, context, undefined);
    }
  }], [{
    key: "updateStatsToStartLoading",
    value: function updateStatsToStartLoading(stats) {
      const start = performance.now();
      stats.loading.start = start;
      stats.loading.first = start;
    }
  }]);

  return HlsJsLoader;
}();

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/index.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/index.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Engine": () => (/* reexport safe */ _engine__WEBPACK_IMPORTED_MODULE_0__.Engine),
/* harmony export */   "SegmentManager": () => (/* reexport safe */ _segment_manager__WEBPACK_IMPORTED_MODULE_1__.SegmentManager),
/* harmony export */   "initClapprPlayer": () => (/* binding */ initClapprPlayer),
/* harmony export */   "initFlowplayerHlsJsPlayer": () => (/* binding */ initFlowplayerHlsJsPlayer),
/* harmony export */   "initHlsJsPlayer": () => (/* binding */ initHlsJsPlayer),
/* harmony export */   "initJwPlayer": () => (/* binding */ initJwPlayer),
/* harmony export */   "initMediaElementJsPlayer": () => (/* binding */ initMediaElementJsPlayer),
/* harmony export */   "initVideoJsContribHlsJsPlayer": () => (/* binding */ initVideoJsContribHlsJsPlayer),
/* harmony export */   "initVideoJsHlsJsPlugin": () => (/* binding */ initVideoJsHlsJsPlugin),
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/engine.ts");
/* harmony import */ var _segment_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./segment-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/segment-manager.ts");
/**
 * @license Apache-2.0
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

const version = "0.6.2";


function initHlsJsPlayer(player) {
  if (player && player.config && player.config.loader && typeof player.config.loader.getEngine === "function") {
    initHlsJsEvents(player, player.config.loader.getEngine());
  }
}
function initClapprPlayer(player) {
  player.on("play", () => {
    const playback = player.core.getCurrentPlayback();

    if (playback._hls && !playback._hls._p2pm_linitialized) {
      playback._hls._p2pm_linitialized = true;
      initHlsJsPlayer(player.core.getCurrentPlayback()._hls);
    }
  });
}
function initFlowplayerHlsJsPlayer(player) {
  player.on("ready", () => {
    var _a;

    return initHlsJsPlayer((_a = player.engine.hlsjs) !== null && _a !== void 0 ? _a : player.engine.hls);
  });
}
function initVideoJsContribHlsJsPlayer(player) {
  player.ready(() => {
    const options = player.tech_.options_;

    if (options && options.hlsjsConfig && options.hlsjsConfig.loader && typeof options.hlsjsConfig.loader.getEngine === "function") {
      initHlsJsEvents(player.tech_, options.hlsjsConfig.loader.getEngine());
    }
  });
}
function initVideoJsHlsJsPlugin() {
  if (videojs == undefined || videojs.Html5Hlsjs == undefined) {
    return;
  }

  videojs.Html5Hlsjs.addHook("beforeinitialize", (videojsPlayer, hlsjs) => {
    if (hlsjs.config && hlsjs.config.loader && typeof hlsjs.config.loader.getEngine === "function") {
      initHlsJsEvents(hlsjs, hlsjs.config.loader.getEngine());
    }
  });
}
function initMediaElementJsPlayer(mediaElement) {
  mediaElement.addEventListener("hlsFragChanged", event => {
    const hls = mediaElement.hlsPlayer;

    if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
      const engine = hls.config.loader.getEngine();

      if (event.data && event.data.length > 1) {
        const frag = event.data[1].frag;
        const byteRange = frag.byteRange.length !== 2 ? undefined : {
          offset: frag.byteRange[0],
          length: frag.byteRange[1] - frag.byteRange[0]
        };
        engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);
      }
    }
  });
  mediaElement.addEventListener("hlsDestroying", () => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
    const hls = mediaElement.hlsPlayer;

    if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
      const engine = hls.config.loader.getEngine();
      yield engine.destroy();
    }
  }));
  mediaElement.addEventListener("hlsError", event => {
    const hls = mediaElement.hlsPlayer;

    if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
      if (event.data !== undefined && event.data.details === "bufferStalledError") {
        const engine = hls.config.loader.getEngine();
        engine.setPlayingSegmentByCurrentTime(hls.media.currentTime);
      }
    }
  });
}
function initJwPlayer(player, hlsjsConfig) {
  const iid = setInterval(() => {
    if (player.hls && player.hls.config) {
      clearInterval(iid);
      Object.assign(player.hls.config, hlsjsConfig);
      initHlsJsPlayer(player.hls);
    }
  }, 200);
}

function initHlsJsEvents(player, engine) {
  player.on("hlsFragChanged", (_event, data) => {
    const frag = data.frag;
    const byteRange = frag.byteRange.length !== 2 ? undefined : {
      offset: frag.byteRange[0],
      length: frag.byteRange[1] - frag.byteRange[0]
    };
    engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);
  });
  player.on("hlsDestroying", () => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
    yield engine.destroy();
  }));
  player.on("hlsError", (_event, errorData) => {
    if (errorData.details === "bufferStalledError") {
      const htmlMediaElement = player.media === undefined ? player.el_ // videojs-contrib-hlsjs
      : player.media; // all others

      if (htmlMediaElement) {
        engine.setPlayingSegmentByCurrentTime(htmlMediaElement.currentTime);
      }
    }
  });
}

/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/segment-manager.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/segment-manager.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SegmentManager": () => (/* binding */ SegmentManager)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../p2p-media-loader-core/lib */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
/* harmony import */ var m3u8_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! m3u8-parser */ "./node_modules/m3u8-parser/dist/m3u8-parser.es.js");
/* harmony import */ var _byte_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./byte-range */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/byte-range.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




const defaultSettings = {
  forwardSegmentCount: 20,
  swarmId: undefined,
  assetsStorage: undefined
};
let SegmentManager = /*#__PURE__*/function () {
  function SegmentManager(loader) {
    let settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SegmentManager);

    this.masterPlaylist = null;
    this.variantPlaylists = new Map();
    this.segmentRequest = null;

    this.fetch = function () {
      return fetch.apply(void 0, arguments);
    };

    this.playQueue = [];

    this.onSegmentLoaded = segment => {
      if (this.segmentRequest && this.segmentRequest.segmentUrl === segment.url && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.byteRangeToString)(this.segmentRequest.segmentByteRange) === segment.range) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.segmentRequest.onSuccess(segment.data.slice(0), segment.downloadBandwidth);
        this.segmentRequest = null;
      }
    };

    this.onSegmentError = (segment, error) => {
      if (this.segmentRequest && this.segmentRequest.segmentUrl === segment.url && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.byteRangeToString)(this.segmentRequest.segmentByteRange) === segment.range) {
        this.segmentRequest.onError(error);
        this.segmentRequest = null;
      }
    };

    this.onSegmentAbort = segment => {
      if (this.segmentRequest && this.segmentRequest.segmentUrl === segment.url && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.byteRangeToString)(this.segmentRequest.segmentByteRange) === segment.range) {
        this.segmentRequest.onError("Loading aborted: internal abort");
        this.segmentRequest = null;
      }
    };

    this.settings = Object.assign(Object.assign({}, defaultSettings), settings.segments);
    this.loader = loader;
    this.loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentLoaded, this.onSegmentLoaded);
    this.loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentError, this.onSegmentError);
    this.loader.on(_p2p_media_loader_core_lib__WEBPACK_IMPORTED_MODULE_0__.Events.SegmentAbort, this.onSegmentAbort);

    if (settings.loader && settings.loader.localTransport) {
      this.fetch = settings.loader.localTransport;
    }
  }

  _createClass(SegmentManager, [{
    key: "getSettings",
    value: function getSettings() {
      return this.settings;
    }
  }, {
    key: "processPlaylist",
    value: function processPlaylist(requestUrl, content, responseUrl) {
      const parser = new m3u8_parser__WEBPACK_IMPORTED_MODULE_1__.Parser();
      parser.push(content);
      parser.end();
      const playlist = new Playlist(requestUrl, responseUrl, parser.manifest);

      if (playlist.manifest.playlists) {
        this.masterPlaylist = playlist;

        for (const [key, variantPlaylist] of this.variantPlaylists) {
          const {
            streamSwarmId,
            found,
            index
          } = this.getStreamSwarmId(variantPlaylist.requestUrl);

          if (!found) {
            this.variantPlaylists.delete(key);
          } else {
            variantPlaylist.streamSwarmId = streamSwarmId;
            variantPlaylist.streamId = "V" + index.toString();
          }
        }
      } else {
        const {
          streamSwarmId,
          found,
          index
        } = this.getStreamSwarmId(requestUrl);

        if (found || this.masterPlaylist === null) {
          // do not add audio and subtitles to variants
          playlist.streamSwarmId = streamSwarmId;
          playlist.streamId = this.masterPlaylist === null ? undefined : "V" + index.toString();
          this.variantPlaylists.set(requestUrl, playlist);
          this.updateSegments();
        }
      }
    }
  }, {
    key: "loadPlaylist",
    value: function loadPlaylist(url) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        const assetsStorage = this.settings.assetsStorage;
        let res;

        if (assetsStorage !== undefined) {
          let masterSwarmId;
          masterSwarmId = this.getMasterSwarmId();

          if (masterSwarmId === undefined) {
            masterSwarmId = url.split("?")[0];
          }

          const asset = yield assetsStorage.getAsset(url, undefined, masterSwarmId);

          if (asset !== undefined) {
            res = {
              responseURL: asset.responseUri,
              response: asset.data
            };
          } else {
            const fetch = yield this.loadContent(url);
            res = {
              responseURL: fetch.url,
              response: yield fetch.text()
            };
            void assetsStorage.storeAsset({
              masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : url,
              masterSwarmId: masterSwarmId,
              requestUri: url,
              responseUri: res.responseURL,
              data: yield res.response
            });
          }
        } else {
          const fetch = yield this.loadContent(url);
          res = {
            responseURL: fetch.url,
            response: yield fetch.text()
          };
        }

        this.processPlaylist(url, res.response, res.responseURL);
        return res;
      });
    }
  }, {
    key: "loadSegment",
    value: function loadSegment(url, byteRange) {
      var _a;

      return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        const segmentLocation = this.getSegmentLocation(url, byteRange);
        const byteRangeString = (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.byteRangeToString)(byteRange);

        if (!segmentLocation) {
          let content; // Not a segment from variants; usually can be: init, audio or subtitles segment, encryption key etc.

          const assetsStorage = this.settings.assetsStorage;

          if (assetsStorage !== undefined) {
            let masterManifestUri = (_a = this.masterPlaylist) === null || _a === void 0 ? void 0 : _a.requestUrl;
            let masterSwarmId;
            masterSwarmId = this.getMasterSwarmId();

            if (masterSwarmId === undefined && this.variantPlaylists.size === 1) {
              const result = this.variantPlaylists.values().next();

              if (!result.done) {
                // always true
                masterSwarmId = result.value.requestUrl.split("?")[0];
              }
            }

            if (masterManifestUri === undefined && this.variantPlaylists.size === 1) {
              const result = this.variantPlaylists.values().next();

              if (!result.done) {
                // always true
                masterManifestUri = result.value.requestUrl;
              }
            }

            if (masterSwarmId !== undefined && masterManifestUri !== undefined) {
              const asset = yield assetsStorage.getAsset(url, byteRangeString, masterSwarmId);

              if (asset !== undefined) {
                content = asset.data;
              } else {
                const fetch = yield this.loadContent(url, byteRangeString);
                content = yield fetch.arrayBuffer();
                void assetsStorage.storeAsset({
                  masterManifestUri: masterManifestUri,
                  masterSwarmId: masterSwarmId,
                  requestUri: url,
                  requestRange: byteRangeString,
                  responseUri: fetch.url,
                  data: content
                });
              }
            }
          }

          if (content === undefined) {
            const fetch = yield this.loadContent(url, byteRangeString);
            content = yield fetch.arrayBuffer();
          }

          return {
            content,
            downloadBandwidth: 0
          };
        }

        const segmentSequence = (segmentLocation.playlist.manifest.mediaSequence ? segmentLocation.playlist.manifest.mediaSequence : 0) + segmentLocation.segmentIndex;

        if (this.playQueue.length > 0) {
          const previousSegment = this.playQueue[this.playQueue.length - 1];

          if (previousSegment.segmentSequence !== segmentSequence - 1) {
            // Reset play queue in case of segment loading out of sequence
            this.playQueue = [];
          }
        }

        if (this.segmentRequest) {
          this.segmentRequest.onError("Cancel segment request: simultaneous segment requests are not supported");
        }

        const promise = new Promise((resolve, reject) => {
          this.segmentRequest = new SegmentRequest(url, byteRange, segmentSequence, segmentLocation.playlist.requestUrl, (content, downloadBandwidth) => resolve({
            content,
            downloadBandwidth
          }), error => reject(error));
        });
        this.playQueue.push({
          segmentUrl: url,
          segmentByteRange: byteRange,
          segmentSequence: segmentSequence
        });
        void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, true);
        return promise;
      });
    }
  }, {
    key: "setPlayingSegment",
    value: function setPlayingSegment(url, byteRange, start, duration) {
      const urlIndex = this.playQueue.findIndex(segment => segment.segmentUrl === url && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.compareByteRanges)(segment.segmentByteRange, byteRange));

      if (urlIndex >= 0) {
        this.playQueue = this.playQueue.slice(urlIndex);
        this.playQueue[0].playPosition = {
          start,
          duration
        };
        this.updateSegments();
      }
    }
  }, {
    key: "setPlayingSegmentByCurrentTime",
    value: function setPlayingSegmentByCurrentTime(playheadPosition) {
      if (this.playQueue.length === 0 || !this.playQueue[0].playPosition) {
        return;
      }

      const currentSegmentPosition = this.playQueue[0].playPosition;
      const segmentEndTime = currentSegmentPosition.start + currentSegmentPosition.duration;

      if (segmentEndTime - playheadPosition < 0.2) {
        // means that current segment is (almost) finished playing
        // remove it from queue
        this.playQueue = this.playQueue.slice(1);
        this.updateSegments();
      }
    }
  }, {
    key: "abortSegment",
    value: function abortSegment(url, byteRange) {
      if (this.segmentRequest && this.segmentRequest.segmentUrl === url && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.compareByteRanges)(this.segmentRequest.segmentByteRange, byteRange)) {
        this.segmentRequest.onSuccess(undefined, 0);
        this.segmentRequest = null;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        if (this.segmentRequest) {
          this.segmentRequest.onError("Loading aborted: object destroyed");
          this.segmentRequest = null;
        }

        this.masterPlaylist = null;
        this.variantPlaylists.clear();
        this.playQueue = [];

        if (this.settings.assetsStorage !== undefined) {
          yield this.settings.assetsStorage.destroy();
        }

        yield this.loader.destroy();
      });
    }
  }, {
    key: "updateSegments",
    value: function updateSegments() {
      if (!this.segmentRequest) {
        return;
      }

      const segmentLocation = this.getSegmentLocation(this.segmentRequest.segmentUrl, this.segmentRequest.segmentByteRange);

      if (segmentLocation) {
        void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, false);
      }
    }
  }, {
    key: "getSegmentLocation",
    value: function getSegmentLocation(url, byteRange) {
      for (const playlist of this.variantPlaylists.values()) {
        const segmentIndex = playlist.getSegmentIndex(url, byteRange);

        if (segmentIndex >= 0) {
          return {
            playlist: playlist,
            segmentIndex: segmentIndex
          };
        }
      }

      return undefined;
    }
  }, {
    key: "loadSegments",
    value: function loadSegments(playlist, segmentIndex, requestFirstSegment) {
      var _a;

      return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        const segments = [];
        const playlistSegments = playlist.manifest.segments;
        const initialSequence = (_a = playlist.manifest.mediaSequence) !== null && _a !== void 0 ? _a : 0;
        let loadSegmentId = null;
        let priority = Math.max(0, this.playQueue.length - 1);
        const masterSwarmId = this.getMasterSwarmId();

        for (let i = segmentIndex; i < playlistSegments.length && segments.length < this.settings.forwardSegmentCount; ++i) {
          const segment = playlist.manifest.segments[i];
          const url = playlist.getSegmentAbsoluteUrl(segment.uri);
          const byteRange = segment.byterange;
          const id = this.getSegmentId(playlist, initialSequence + i);
          segments.push({
            id: id,
            url: url,
            masterSwarmId: masterSwarmId !== undefined ? masterSwarmId : playlist.streamSwarmId,
            masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : playlist.requestUrl,
            streamId: playlist.streamId,
            sequence: (initialSequence + i).toString(),
            range: (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.byteRangeToString)(byteRange),
            priority: priority++
          });

          if (requestFirstSegment && !loadSegmentId) {
            loadSegmentId = id;
          }
        }

        this.loader.load(segments, playlist.streamSwarmId);

        if (loadSegmentId) {
          const segment = yield this.loader.getSegment(loadSegmentId);

          if (segment) {
            // Segment already loaded by loader
            this.onSegmentLoaded(segment);
          }
        }
      });
    }
  }, {
    key: "getSegmentId",
    value: function getSegmentId(playlist, segmentSequence) {
      return `${playlist.streamSwarmId}+${segmentSequence}`;
    }
  }, {
    key: "getMasterSwarmId",
    value: function getMasterSwarmId() {
      const settingsSwarmId = this.settings.swarmId && this.settings.swarmId.length !== 0 ? this.settings.swarmId : undefined;

      if (settingsSwarmId !== undefined) {
        return settingsSwarmId;
      }

      return this.masterPlaylist !== null ? this.masterPlaylist.requestUrl.split("?")[0] : undefined;
    }
  }, {
    key: "getStreamSwarmId",
    value: function getStreamSwarmId(playlistUrl) {
      const masterSwarmId = this.getMasterSwarmId();

      if (this.masterPlaylist && this.masterPlaylist.manifest.playlists && masterSwarmId) {
        for (let i = 0; i < this.masterPlaylist.manifest.playlists.length; ++i) {
          const url = new URL(this.masterPlaylist.manifest.playlists[i].uri, this.masterPlaylist.responseUrl).toString();

          if (url === playlistUrl) {
            return {
              streamSwarmId: `${masterSwarmId}+V${i}`,
              found: true,
              index: i
            };
          }
        }
      }

      return {
        streamSwarmId: masterSwarmId !== null && masterSwarmId !== void 0 ? masterSwarmId : playlistUrl.split("?")[0],
        found: false,
        index: -1
      };
    }
  }, {
    key: "loadContent",
    value: function loadContent(url, range) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        const headers = new Headers();

        if (range) {
          headers.append('Range', range);
        }

        const fetchPromise = this.fetch(url, {
          headers
        });
        fetchPromise.catch(err => {
          /**
           * Handling all fetch errors here
           */
          // console.log("SegmentManager fetch error", { err });
        });
        return fetchPromise;
      });
    }
  }]);

  return SegmentManager;
}();

let Playlist = /*#__PURE__*/function () {
  function Playlist(requestUrl, responseUrl, manifest) {
    _classCallCheck(this, Playlist);

    this.requestUrl = requestUrl;
    this.responseUrl = responseUrl;
    this.manifest = manifest;
    this.streamSwarmId = "";
  }

  _createClass(Playlist, [{
    key: "getSegmentIndex",
    value: function getSegmentIndex(url, byteRange) {
      for (let i = 0; i < this.manifest.segments.length; ++i) {
        const segment = this.manifest.segments[i];
        const segmentUrl = this.getSegmentAbsoluteUrl(segment.uri);

        if (url === segmentUrl && (0,_byte_range__WEBPACK_IMPORTED_MODULE_2__.compareByteRanges)(segment.byterange, byteRange)) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "getSegmentAbsoluteUrl",
    value: function getSegmentAbsoluteUrl(segmentUrl) {
      return new URL(segmentUrl, this.responseUrl).toString();
    }
  }]);

  return Playlist;
}();

let SegmentRequest = /*#__PURE__*/_createClass(function SegmentRequest(segmentUrl, segmentByteRange, segmentSequence, playlistRequestUrl, onSuccess, onError) {
  _classCallCheck(this, SegmentRequest);

  this.segmentUrl = segmentUrl;
  this.segmentByteRange = segmentByteRange;
  this.segmentSequence = segmentSequence;
  this.playlistRequestUrl = playlistRequestUrl;
  this.onSuccess = onSuccess;
  this.onError = onError;
});

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
//# sourceMappingURL=src_assets_player_p2p-media-loader_core_p2p-media-loader-master_p2p-media-loader-hlsjs_lib_index_ts.chunk.js.map