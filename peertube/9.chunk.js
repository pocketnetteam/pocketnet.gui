(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: BandwidthApproximator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BandwidthApproximator", function() { return BandwidthApproximator; });
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
const SMOOTH_INTERVAL = 15 * 1000;
const MEASURE_INTERVAL = 60 * 1000;
class NumberWithTime {
    constructor(value, timeStamp) {
        this.value = value;
        this.timeStamp = timeStamp;
    }
}
class BandwidthApproximator {
    constructor() {
        this.lastBytes = [];
        this.currentBytesSum = 0;
        this.lastBandwidth = [];
        this.addBytes = (bytes, timeStamp) => {
            this.lastBytes.push(new NumberWithTime(bytes, timeStamp));
            this.currentBytesSum += bytes;
            while (timeStamp - this.lastBytes[0].timeStamp > SMOOTH_INTERVAL) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.currentBytesSum -= this.lastBytes.shift().value;
            }
            const interval = Math.min(SMOOTH_INTERVAL, timeStamp);
            this.lastBandwidth.push(new NumberWithTime(this.currentBytesSum / interval, timeStamp));
        };
        // in bytes per millisecond
        this.getBandwidth = (timeStamp) => {
            while (this.lastBandwidth.length !== 0 && timeStamp - this.lastBandwidth[0].timeStamp > MEASURE_INTERVAL) {
                this.lastBandwidth.shift();
            }
            let maxBandwidth = 0;
            for (const bandwidth of this.lastBandwidth) {
                if (bandwidth.value > maxBandwidth) {
                    maxBandwidth = bandwidth.value;
                }
            }
            return maxBandwidth;
        };
        this.getSmoothInterval = () => {
            return SMOOTH_INTERVAL;
        };
        this.getMeasureInterval = () => {
            return MEASURE_INTERVAL;
        };
    }
}


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts ***!
  \*************************************************************************************************************************/
/*! exports provided: HttpMediaManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpMediaManager", function() { return HttpMediaManager; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
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



class HttpMediaManager extends _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__["STEEmitter"] {
    constructor(settings) {
        super();
        this.settings = settings;
        this.xhrRequests = new Map();
        this.failedSegments = new Map();
        this.debug = debug__WEBPACK_IMPORTED_MODULE_1___default()("p2pml:http-media-manager");
        this.download = (segment, downloadedPieces) => {
            if (this.isDownloading(segment)) {
                return;
            }
            this.cleanTimedOutFailedSegments();
            const segmentUrl = this.settings.segmentUrlBuilder ? this.settings.segmentUrlBuilder(segment) : segment.url;
            this.debug("http segment download", segmentUrl);
            segment.requestUrl = segmentUrl;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", segmentUrl, true);
            xhr.responseType = "arraybuffer";
            if (segment.range) {
                xhr.setRequestHeader("Range", segment.range);
                downloadedPieces = undefined; // TODO: process downloadedPieces for segments with range headers too
            }
            else if (downloadedPieces !== undefined && this.settings.httpUseRanges) {
                let bytesDownloaded = 0;
                for (const piece of downloadedPieces) {
                    bytesDownloaded += piece.byteLength;
                }
                xhr.setRequestHeader("Range", `bytes=${bytesDownloaded}-`);
                this.debug("continue download from", bytesDownloaded);
            }
            else {
                downloadedPieces = undefined;
            }
            this.setupXhrEvents(xhr, segment, downloadedPieces);
            if (this.settings.xhrSetup) {
                this.settings.xhrSetup(xhr, segmentUrl);
            }
            this.xhrRequests.set(segment.id, { xhr, segment });
            xhr.send();
        };
        this.abort = (segment) => {
            const request = this.xhrRequests.get(segment.id);
            if (request) {
                request.xhr.abort();
                this.xhrRequests.delete(segment.id);
                this.debug("http segment abort", segment.id);
            }
        };
        this.isDownloading = (segment) => {
            return this.xhrRequests.has(segment.id);
        };
        this.isFailed = (segment) => {
            const time = this.failedSegments.get(segment.id);
            return time !== undefined && time > this.now();
        };
        this.getActiveDownloads = () => {
            return this.xhrRequests;
        };
        this.getActiveDownloadsCount = () => {
            return this.xhrRequests.size;
        };
        this.destroy = () => {
            this.xhrRequests.forEach((request) => request.xhr.abort());
            this.xhrRequests.clear();
        };
        this.setupXhrEvents = (xhr, segment, downloadedPieces) => {
            let prevBytesLoaded = 0;
            xhr.addEventListener("progress", (event) => {
                const bytesLoaded = event.loaded - prevBytesLoaded;
                this.emit("bytes-downloaded", bytesLoaded);
                prevBytesLoaded = event.loaded;
            });
            xhr.addEventListener("load", (event) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                if (xhr.status < 200 || xhr.status >= 300) {
                    this.segmentFailure(segment, event, xhr);
                    return;
                }
                let data = xhr.response;
                if (downloadedPieces !== undefined && xhr.status === 206) {
                    let bytesDownloaded = 0;
                    for (const piece of downloadedPieces) {
                        bytesDownloaded += piece.byteLength;
                    }
                    const segmentData = new Uint8Array(bytesDownloaded + data.byteLength);
                    let offset = 0;
                    for (const piece of downloadedPieces) {
                        segmentData.set(new Uint8Array(piece), offset);
                        offset += piece.byteLength;
                    }
                    segmentData.set(new Uint8Array(data), offset);
                    data = segmentData.buffer;
                }
                yield this.segmentDownloadFinished(segment, data, xhr);
            }));
            xhr.addEventListener("error", (event) => {
                this.segmentFailure(segment, event, xhr);
            });
            xhr.addEventListener("timeout", (event) => {
                this.segmentFailure(segment, event, xhr);
            });
        };
        this.segmentDownloadFinished = (segment, data, xhr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
            if (this.settings.segmentValidator) {
                try {
                    yield this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "http");
                }
                catch (error) {
                    this.debug("segment validator failed", error);
                    this.segmentFailure(segment, error, xhr);
                    return;
                }
            }
            this.xhrRequests.delete(segment.id);
            this.emit("segment-loaded", segment, data);
        });
        this.segmentFailure = (segment, error, xhr) => {
            segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
            this.xhrRequests.delete(segment.id);
            this.failedSegments.set(segment.id, this.now() + this.settings.httpFailedSegmentTimeout);
            this.emit("segment-error", segment, error);
        };
        this.cleanTimedOutFailedSegments = () => {
            const now = this.now();
            const candidates = [];
            this.failedSegments.forEach((time, id) => {
                if (time < now) {
                    candidates.push(id);
                }
            });
            candidates.forEach((id) => this.failedSegments.delete(id));
        };
        this.now = () => performance.now();
    }
}


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts ***!
  \********************************************************************************************************************/
/*! exports provided: HybridLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HybridLoader", function() { return HybridLoader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var simple_peer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! simple-peer */ "./node_modules/simple-peer/index.js");
/* harmony import */ var simple_peer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(simple_peer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loader_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader-interface */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts");
/* harmony import */ var _http_media_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-media-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts");
/* harmony import */ var _p2p_media_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./p2p-media-manager */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts");
/* harmony import */ var _media_peer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./media-peer */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts");
/* harmony import */ var _bandwidth_approximator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bandwidth-approximator */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts");
/* harmony import */ var _segments_memory_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./segments-memory-storage */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts");
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
    rtcConfig: simple_peer__WEBPACK_IMPORTED_MODULE_3___default.a.config,
};
class HybridLoader extends events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"] {
    constructor(settings = {}) {
        super();
        this.debug = debug__WEBPACK_IMPORTED_MODULE_1___default()("p2pml:hybrid-loader");
        this.debugSegments = debug__WEBPACK_IMPORTED_MODULE_1___default()("p2pml:hybrid-loader-segments");
        this.segmentsQueue = [];
        this.bandwidthApproximator = new _bandwidth_approximator__WEBPACK_IMPORTED_MODULE_8__["BandwidthApproximator"]();
        this.httpDownloadInitialTimeoutTimestamp = -Infinity;
        this.createHttpManager = () => {
            return new _http_media_manager__WEBPACK_IMPORTED_MODULE_5__["HttpMediaManager"](this.settings);
        };
        this.createP2PManager = () => {
            return new _p2p_media_manager__WEBPACK_IMPORTED_MODULE_6__["P2PMediaManager"](this.segmentsStorage, this.settings);
        };
        this.load = (segments, streamSwarmId) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.httpRandomDownloadInterval === undefined) {
                // Do once on first call
                this.httpRandomDownloadInterval = setInterval(this.downloadRandomSegmentOverHttp, this.settings.httpDownloadProbabilityInterval);
                if (this.settings.httpDownloadInitialTimeout > 0 &&
                    this.settings.httpDownloadInitialTimeoutPerSegment > 0) {
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
            // stop all http requests and p2p downloads for segments that are not in the new load
            for (const segment of this.segmentsQueue) {
                if (!segments.find((f) => f.url === segment.url)) {
                    this.debug("remove segment", segment.url);
                    if (this.httpManager.isDownloading(segment)) {
                        updateSegmentsMap = true;
                        this.httpManager.abort(segment);
                    }
                    else {
                        this.p2pManager.abort(segment);
                    }
                    this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].SegmentAbort, segment);
                }
            }
            if (this.debug.enabled) {
                for (const segment of segments) {
                    if (!this.segmentsQueue.find((f) => f.url === segment.url)) {
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
        this.getSegment = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.masterSwarmId === undefined ? undefined : this.segmentsStorage.getSegment(id, this.masterSwarmId);
        });
        this.getSettings = () => {
            return this.settings;
        };
        this.getDetails = () => {
            return {
                peerId: this.p2pManager.getPeerId(),
            };
        };
        this.destroy = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
        this.processInitialSegmentTimeout = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
        this.processSegmentsQueue = (storageSegments) => {
            this.debugSegments("process segments queue. priority", this.segmentsQueue.length > 0 ? this.segmentsQueue[0].priority : 0);
            if (this.masterSwarmId === undefined || this.segmentsQueue.length === 0) {
                return false;
            }
            let updateSegmentsMap = false;
            let segmentsMap;
            let httpAllowed = true;
            if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
                let firstNotDownloadePriority;
                for (const segment of this.segmentsQueue) {
                    if (!storageSegments.has(segment.id)) {
                        firstNotDownloadePriority = segment.priority;
                        break;
                    }
                }
                const httpTimeout = this.now() - this.httpDownloadInitialTimeoutTimestamp;
                httpAllowed =
                    httpTimeout >= this.settings.httpDownloadInitialTimeout ||
                        (firstNotDownloadePriority !== undefined &&
                            httpTimeout > this.settings.httpDownloadInitialTimeoutPerSegment &&
                            firstNotDownloadePriority <= 0);
                if (httpAllowed) {
                    this.debugSegments("cancel initial HTTP download timeout - timed out");
                    this.httpDownloadInitialTimeoutTimestamp = -Infinity;
                }
            }
            for (let index = 0; index < this.segmentsQueue.length; index++) {
                const segment = this.segmentsQueue[index];
                if (storageSegments.has(segment.id) || this.httpManager.isDownloading(segment)) {
                    continue;
                }
                if (segment.priority <= this.settings.requiredSegmentsPriority &&
                    httpAllowed &&
                    !this.httpManager.isFailed(segment)) {
                    // Download required segments over HTTP
                    if (this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads) {
                        // Not enough HTTP download resources. Abort one of the HTTP downloads.
                        for (let i = this.segmentsQueue.length - 1; i > index; i--) {
                            const segmentToAbort = this.segmentsQueue[i];
                            if (this.httpManager.isDownloading(segmentToAbort)) {
                                this.debugSegments("cancel HTTP download", segmentToAbort.priority, segmentToAbort.url);
                                this.httpManager.abort(segmentToAbort);
                                break;
                            }
                        }
                    }
                    if (this.httpManager.getActiveDownloadsCount() < this.settings.simultaneousHttpDownloads) {
                        // Abort P2P download of the required segment if any and force HTTP download
                        const downloadedPieces = this.p2pManager.abort(segment);
                        this.httpManager.download(segment, downloadedPieces);
                        this.debugSegments("HTTP download (priority)", segment.priority, segment.url);
                        updateSegmentsMap = true;
                        continue;
                    }
                }
                if (this.p2pManager.isDownloading(segment)) {
                    continue;
                }
                if (segment.priority <= this.settings.requiredSegmentsPriority) {
                    // Download required segments over P2P
                    segmentsMap = segmentsMap ? segmentsMap : this.p2pManager.getOverallSegmentsMap();
                    if (segmentsMap.get(segment.id) !== _media_peer__WEBPACK_IMPORTED_MODULE_7__["MediaPeerSegmentStatus"].Loaded) {
                        continue;
                    }
                    if (this.p2pManager.getActiveDownloadsCount() >= this.settings.simultaneousP2PDownloads) {
                        // Not enough P2P download resources. Abort one of the P2P downloads.
                        for (let i = this.segmentsQueue.length - 1; i > index; i--) {
                            const segmentToAbort = this.segmentsQueue[i];
                            if (this.p2pManager.isDownloading(segmentToAbort)) {
                                this.debugSegments("cancel P2P download", segmentToAbort.priority, segmentToAbort.url);
                                this.p2pManager.abort(segmentToAbort);
                                break;
                            }
                        }
                    }
                    if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads) {
                        if (this.p2pManager.download(segment)) {
                            this.debugSegments("P2P download (priority)", segment.priority, segment.url);
                            continue;
                        }
                    }
                    continue;
                }
                if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads &&
                    segment.priority <= this.settings.p2pDownloadMaxPriority) {
                    if (this.p2pManager.download(segment)) {
                        this.debugSegments("P2P download", segment.priority, segment.url);
                    }
                }
            }
            return updateSegmentsMap;
        };
        this.downloadRandomSegmentOverHttp = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.masterSwarmId === undefined ||
                this.httpRandomDownloadInterval === undefined ||
                this.httpDownloadInitialTimeoutTimestamp !== -Infinity ||
                this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads ||
                (this.settings.httpDownloadProbabilitySkipIfNoPeers && this.p2pManager.getPeers().size === 0) ||
                this.settings.consumeOnly) {
                return;
            }
            const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            const segmentsMap = this.p2pManager.getOverallSegmentsMap();
            const pendingQueue = this.segmentsQueue.filter((s) => !this.p2pManager.isDownloading(s) &&
                !this.httpManager.isDownloading(s) &&
                !segmentsMap.has(s.id) &&
                !this.httpManager.isFailed(s) &&
                s.priority <= this.settings.httpDownloadMaxPriority &&
                !storageSegments.has(s.id));
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
        this.onPieceBytesDownloaded = (method, bytes, peerId) => {
            this.bandwidthApproximator.addBytes(bytes, this.now());
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].PieceBytesDownloaded, method, bytes, peerId);
        };
        this.onPieceBytesUploaded = (method, bytes, peerId) => {
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].PieceBytesUploaded, method, bytes, peerId);
        };
        this.onSegmentLoaded = (segment, data, peerId) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.debugSegments("segment loaded", segment.id, segment.url);
            if (this.masterSwarmId === undefined) {
                return;
            }
            segment.data = data;
            segment.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now());
            yield this.segmentsStorage.storeSegment(segment);
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].SegmentLoaded, segment, peerId);
            const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            this.processSegmentsQueue(storageSegments);
            if (!this.settings.consumeOnly) {
                this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
            }
        });
        this.onSegmentError = (segment, details, peerId) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.debugSegments("segment error", segment.id, segment.url, peerId, details);
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].SegmentError, segment, details, peerId);
            if (this.masterSwarmId !== undefined) {
                const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                    this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
                }
            }
        });
        this.getStreamSwarmId = (segment) => {
            return segment.streamId === undefined ? segment.masterSwarmId : `${segment.masterSwarmId}+${segment.streamId}`;
        };
        this.createSegmentsMap = (storageSegments) => {
            const segmentsMap = {};
            const addSegmentToMap = (segment, status) => {
                const streamSwarmId = this.getStreamSwarmId(segment);
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
                addSegmentToMap(storageSegment.segment, _media_peer__WEBPACK_IMPORTED_MODULE_7__["MediaPeerSegmentStatus"].Loaded);
            }
            for (const download of this.httpManager.getActiveDownloads().values()) {
                addSegmentToMap(download.segment, _media_peer__WEBPACK_IMPORTED_MODULE_7__["MediaPeerSegmentStatus"].LoadingByHttp);
            }
            return segmentsMap;
        };
        this.onPeerConnect = (peer) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].PeerConnect, peer);
            if (!this.settings.consumeOnly && this.masterSwarmId !== undefined) {
                this.p2pManager.sendSegmentsMap(peer.id, this.createSegmentsMap(yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId)));
            }
        });
        this.onPeerClose = (peerId) => {
            this.emit(_loader_interface__WEBPACK_IMPORTED_MODULE_4__["Events"].PeerClose, peerId);
        };
        this.onTrackerUpdate = (data) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity &&
                data.incomplete !== undefined &&
                data.incomplete <= 1) {
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
        this.cleanSegmentsStorage = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.masterSwarmId === undefined) {
                return false;
            }
            return this.segmentsStorage.clean(this.masterSwarmId, (id) => this.segmentsQueue.find((queueSegment) => queueSegment.id === id) !== undefined);
        });
        this.now = () => {
            return performance.now();
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
        const { bufferedSegmentsCount } = settings;
        if (typeof bufferedSegmentsCount === "number") {
            if (settings.p2pDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
            }
            if (settings.httpDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
            }
        }
        this.segmentsStorage =
            this.settings.segmentsStorage === undefined
                ? new _segments_memory_storage__WEBPACK_IMPORTED_MODULE_9__["SegmentsMemoryStorage"](this.settings)
                : this.settings.segmentsStorage;
        this.debug("loader settings", this.settings);
        this.httpManager = this.createHttpManager();
        this.httpManager.on("segment-loaded", this.onSegmentLoaded);
        this.httpManager.on("segment-error", this.onSegmentError);
        this.httpManager.on("bytes-downloaded", (bytes) => this.onPieceBytesDownloaded("http", bytes));
        this.p2pManager = this.createP2PManager();
        this.p2pManager.on("segment-loaded", this.onSegmentLoaded);
        this.p2pManager.on("segment-error", this.onSegmentError);
        this.p2pManager.on("peer-data-updated", () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.masterSwarmId === undefined) {
                return;
            }
            const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
            }
        }));
        this.p2pManager.on("bytes-downloaded", (bytes, peerId) => this.onPieceBytesDownloaded("p2p", bytes, peerId));
        this.p2pManager.on("bytes-uploaded", (bytes, peerId) => this.onPieceBytesUploaded("p2p", bytes, peerId));
        this.p2pManager.on("peer-connected", this.onPeerConnect);
        this.p2pManager.on("peer-closed", this.onPeerClose);
        this.p2pManager.on("tracker-update", this.onTrackerUpdate);
    }
}
HybridLoader.isSupported = () => {
    return window.RTCPeerConnection.prototype.createDataChannel !== undefined;
};


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts":
/*!************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts ***!
  \************************************************************************************************************/
/*! exports provided: version, Events, HybridLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony import */ var _loader_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader-interface */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return _loader_interface__WEBPACK_IMPORTED_MODULE_0__["Events"]; });

/* harmony import */ var _hybrid_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hybrid-loader */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HybridLoader", function() { return _hybrid_loader__WEBPACK_IMPORTED_MODULE_1__["HybridLoader"]; });

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
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
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
     * Emitted for each segment that does not hit into a new segments queue when the load() method is called.
     * Args: segment
     */
    Events["SegmentAbort"] = "segment_abort";
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
/*! exports provided: MediaPeerSegmentStatus, MediaPeer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaPeerSegmentStatus", function() { return MediaPeerSegmentStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaPeer", function() { return MediaPeer; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
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
class DownloadingSegment {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.bytesDownloaded = 0;
        this.pieces = [];
    }
}
class MediaPeer extends _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_2__["STEEmitter"] {
    constructor(
    // eslint-disable-next-line
    peer, settings) {
        super();
        this.peer = peer;
        this.settings = settings;
        this.remoteAddress = "";
        this.downloadingSegmentId = null;
        this.downloadingSegment = null;
        this.segmentsMap = new Map();
        this.debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("p2pml:media-peer");
        this.timer = null;
        this.onPeerConnect = () => {
            this.debug("peer connect", this.id, this);
            this.remoteAddress = this.peer.remoteAddress;
            this.emit("connect", this);
        };
        this.onPeerClose = () => {
            this.debug("peer close", this.id, this);
            this.terminateSegmentRequest();
            this.emit("close", this);
        };
        this.onPeerError = (error) => {
            this.debug("peer error", this.id, error, this);
        };
        this.receiveSegmentPiece = (data) => {
            if (!this.downloadingSegment) {
                // The segment was not requested or canceled
                this.debug("peer segment not requested", this.id, this);
                return;
            }
            this.downloadingSegment.bytesDownloaded += data.byteLength;
            this.downloadingSegment.pieces.push(data);
            this.emit("bytes-downloaded", this, data.byteLength);
            const segmentId = this.downloadingSegment.id;
            if (this.downloadingSegment.bytesDownloaded === this.downloadingSegment.size) {
                const segmentData = new Uint8Array(this.downloadingSegment.size);
                let offset = 0;
                for (const piece of this.downloadingSegment.pieces) {
                    segmentData.set(new Uint8Array(piece), offset);
                    offset += piece.byteLength;
                }
                this.debug("peer segment download done", this.id, segmentId, this);
                this.terminateSegmentRequest();
                this.emit("segment-loaded", this, segmentId, segmentData.buffer);
            }
            else if (this.downloadingSegment.bytesDownloaded > this.downloadingSegment.size) {
                this.debug("peer segment download bytes mismatch", this.id, segmentId, this);
                this.terminateSegmentRequest();
                this.emit("segment-error", this, segmentId, "Too many bytes received for segment");
            }
        };
        this.getJsonCommand = (data) => {
            const bytes = new Uint8Array(data);
            // Serialized JSON string check by first, second and last characters: '{" .... }'
            if (bytes[0] === 123 && bytes[1] === 34 && bytes[data.byteLength - 1] === 125) {
                try {
                    return JSON.parse(new TextDecoder().decode(data));
                }
                catch (_a) {
                    return null;
                }
            }
            return null;
        };
        this.onPeerData = (data) => {
            const command = this.getJsonCommand(data);
            if (command === null) {
                this.receiveSegmentPiece(data);
                return;
            }
            if (this.downloadingSegment) {
                this.debug("peer segment download is interrupted by a command", this.id, this);
                const segmentId = this.downloadingSegment.id;
                this.terminateSegmentRequest();
                this.emit("segment-error", this, segmentId, "Segment download is interrupted by a command");
                return;
            }
            this.debug("peer receive command", this.id, command, this);
            switch (command.c) {
                case MediaPeerCommands.SegmentsMap:
                    this.segmentsMap = this.createSegmentsMap(command.m);
                    this.emit("data-updated");
                    break;
                case MediaPeerCommands.SegmentRequest:
                    this.emit("segment-request", this, command.i);
                    break;
                case MediaPeerCommands.SegmentData:
                    if (this.downloadingSegmentId &&
                        this.downloadingSegmentId === command.i &&
                        typeof command.s === "number" &&
                        command.s >= 0) {
                        this.downloadingSegment = new DownloadingSegment(command.i, command.s);
                        this.cancelResponseTimeoutTimer();
                    }
                    break;
                case MediaPeerCommands.SegmentAbsent:
                    if (this.downloadingSegmentId && this.downloadingSegmentId === command.i) {
                        this.terminateSegmentRequest();
                        this.segmentsMap.delete(command.i);
                        this.emit("segment-absent", this, command.i);
                    }
                    break;
                case MediaPeerCommands.CancelSegmentRequest:
                    // TODO: peer stop sending buffer
                    break;
                default:
                    break;
            }
        };
        this.createSegmentsMap = (segments) => {
            if (!(segments instanceof Object)) {
                return new Map();
            }
            const segmentsMap = new Map();
            for (const streamSwarmId of Object.keys(segments)) {
                const swarmData = segments[streamSwarmId];
                if (!(swarmData instanceof Array) ||
                    swarmData.length !== 2 ||
                    typeof swarmData[0] !== "string" ||
                    !(swarmData[1] instanceof Array)) {
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
        this.sendCommand = (command) => {
            this.debug("peer send command", this.id, command, this);
            this.peer.write(JSON.stringify(command));
        };
        this.destroy = () => {
            this.debug("peer destroy", this.id, this);
            this.terminateSegmentRequest();
            this.peer.destroy();
        };
        this.getDownloadingSegmentId = () => {
            return this.downloadingSegmentId;
        };
        this.getSegmentsMap = () => {
            return this.segmentsMap;
        };
        this.sendSegmentsMap = (segmentsMap) => {
            this.sendCommand({ c: MediaPeerCommands.SegmentsMap, m: segmentsMap });
        };
        this.sendSegmentData = (segmentId, data) => {
            this.sendCommand({
                c: MediaPeerCommands.SegmentData,
                i: segmentId,
                s: data.byteLength,
            });
            let bytesLeft = data.byteLength;
            while (bytesLeft > 0) {
                const bytesToSend = bytesLeft >= this.settings.webRtcMaxMessageSize ? this.settings.webRtcMaxMessageSize : bytesLeft;
                const buffer = buffer__WEBPACK_IMPORTED_MODULE_1__["Buffer"].from(data, data.byteLength - bytesLeft, bytesToSend);
                this.peer.write(buffer);
                bytesLeft -= bytesToSend;
            }
            this.emit("bytes-uploaded", this, data.byteLength);
        };
        this.sendSegmentAbsent = (segmentId) => {
            this.sendCommand({ c: MediaPeerCommands.SegmentAbsent, i: segmentId });
        };
        this.requestSegment = (segmentId) => {
            if (this.downloadingSegmentId) {
                throw new Error("A segment is already downloading: " + this.downloadingSegmentId);
            }
            this.sendCommand({ c: MediaPeerCommands.SegmentRequest, i: segmentId });
            this.downloadingSegmentId = segmentId;
            this.runResponseTimeoutTimer();
        };
        this.cancelSegmentRequest = () => {
            let downloadingSegment;
            if (this.downloadingSegmentId) {
                const segmentId = this.downloadingSegmentId;
                downloadingSegment = this.downloadingSegment ? this.downloadingSegment.pieces : undefined;
                this.terminateSegmentRequest();
                this.sendCommand({ c: MediaPeerCommands.CancelSegmentRequest, i: segmentId });
            }
            return downloadingSegment;
        };
        this.runResponseTimeoutTimer = () => {
            this.timer = setTimeout(() => {
                this.timer = null;
                if (!this.downloadingSegmentId) {
                    return;
                }
                const segmentId = this.downloadingSegmentId;
                this.cancelSegmentRequest();
                this.emit("segment-timeout", this, segmentId); // TODO: send peer not responding event
            }, this.settings.p2pSegmentDownloadTimeout);
        };
        this.cancelResponseTimeoutTimer = () => {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        };
        this.terminateSegmentRequest = () => {
            this.downloadingSegmentId = null;
            this.downloadingSegment = null;
            this.cancelResponseTimeoutTimer();
        };
        this.peer.on("connect", this.onPeerConnect);
        this.peer.on("close", this.onPeerClose);
        this.peer.on("error", this.onPeerError);
        this.peer.on("data", this.onPeerData);
        this.id = peer.id;
    }
}


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts ***!
  \************************************************************************************************************************/
/*! exports provided: P2PMediaManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P2PMediaManager", function() { return P2PMediaManager; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bittorrent-tracker/client */ "./node_modules/bittorrent-tracker/client.js");
/* harmony import */ var bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sha_js_sha1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sha.js/sha1 */ "./node_modules/sha.js/sha1.js");
/* harmony import */ var sha_js_sha1__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sha_js_sha1__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts");
/* harmony import */ var _media_peer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media-peer */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index */ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts");
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
const PEER_ID_VERSION_STRING = _index__WEBPACK_IMPORTED_MODULE_7__["version"].replace(/\d*./g, (v) => `0${parseInt(v, 10) % 100}`.slice(-2)).slice(0, 4);
const PEER_ID_VERSION_PREFIX = `-WW${PEER_ID_VERSION_STRING}-`; // Using WebTorrent client ID in order to not be banned by websocket trackers
class PeerSegmentRequest {
    constructor(peerId, segment) {
        this.peerId = peerId;
        this.segment = segment;
    }
}
function generatePeerId() {
    const PEER_ID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const PEER_ID_LENGTH = 20;
    let peerId = PEER_ID_VERSION_PREFIX;
    for (let i = 0; i < PEER_ID_LENGTH - PEER_ID_VERSION_PREFIX.length; i++) {
        peerId += PEER_ID_SYMBOLS.charAt(Math.floor(Math.random() * PEER_ID_SYMBOLS.length));
    }
    return new TextEncoder().encode(peerId).buffer;
}
class P2PMediaManager extends _stringly_typed_event_emitter__WEBPACK_IMPORTED_MODULE_5__["STEEmitter"] {
    constructor(segmentsStorage, settings) {
        super();
        this.segmentsStorage = segmentsStorage;
        this.settings = settings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.trackerClient = null;
        this.peers = new Map();
        this.peerCandidates = new Map();
        this.peerSegmentRequests = new Map();
        this.streamSwarmId = null;
        this.debug = debug__WEBPACK_IMPORTED_MODULE_1___default()("p2pml:p2p-media-manager");
        this.pendingTrackerClient = null;
        this.getPeers = () => {
            return this.peers;
        };
        this.getPeerId = () => {
            return buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"].from(this.peerId).toString("hex");
        };
        this.setStreamSwarmId = (streamSwarmId, masterSwarmId) => {
            if (this.streamSwarmId === streamSwarmId) {
                return;
            }
            this.destroy(true);
            this.streamSwarmId = streamSwarmId;
            this.masterSwarmId = masterSwarmId;
            this.debug("stream swarm ID", this.streamSwarmId);
            this.pendingTrackerClient = {
                isDestroyed: false,
            };
            const pendingTrackerClient = this.pendingTrackerClient;
            // TODO: native browser 'crypto.subtle' implementation doesn't work in Chrome in insecure pages
            // TODO: Edge doesn't support SHA-1. Change to SHA-256 once Edge support is required.
            // const infoHash = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(PEER_PROTOCOL_VERSION + this.streamSwarmId));
            const infoHash = new sha_js_sha1__WEBPACK_IMPORTED_MODULE_4___default.a().update(`${PEER_PROTOCOL_VERSION}${this.streamSwarmId}`).digest();
            // destroy may be called while waiting for the hash to be calculated
            if (!pendingTrackerClient.isDestroyed) {
                this.pendingTrackerClient = null;
                this.createClient(infoHash);
            }
            else if (this.trackerClient !== null) {
                this.trackerClient.destroy();
                this.trackerClient = null;
            }
        };
        this.createClient = (infoHash) => {
            if (!this.settings.useP2P) {
                return;
            }
            const clientOptions = {
                infoHash: buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"].from(infoHash, 0, 20),
                peerId: buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"].from(this.peerId, 0, 20),
                announce: this.settings.trackerAnnounce,
                rtcConfig: this.settings.rtcConfig,
                port: 6881,
                getAnnounceOpts: () => {
                    return { numwant: this.settings.peerRequestsPerAnnounce };
                },
            };
            let oldTrackerClient = this.trackerClient;
            this.trackerClient = new bittorrent_tracker_client__WEBPACK_IMPORTED_MODULE_2___default.a(clientOptions);
            this.trackerClient.on("error", this.onTrackerError);
            this.trackerClient.on("warning", this.onTrackerWarning);
            this.trackerClient.on("update", this.onTrackerUpdate);
            this.trackerClient.on("peer", this.onTrackerPeer);
            this.trackerClient.start();
            if (oldTrackerClient !== null) {
                oldTrackerClient.destroy();
                oldTrackerClient = null;
            }
        };
        this.onTrackerError = (error) => {
            this.debug("tracker error", error);
        };
        this.onTrackerWarning = (warning) => {
            this.debug("tracker warning", warning);
        };
        this.onTrackerUpdate = (data) => {
            this.debug("tracker update", data);
            this.emit("tracker-update", data);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onTrackerPeer = (trackerPeer) => {
            this.debug("tracker peer", trackerPeer.id, trackerPeer);
            if (this.peers.has(trackerPeer.id)) {
                this.debug("tracker peer already connected", trackerPeer.id, trackerPeer);
                trackerPeer.destroy();
                return;
            }
            const peer = new _media_peer__WEBPACK_IMPORTED_MODULE_6__["MediaPeer"](trackerPeer, this.settings);
            peer.on("connect", this.onPeerConnect);
            peer.on("close", this.onPeerClose);
            peer.on("data-updated", this.onPeerDataUpdated);
            peer.on("segment-request", this.onSegmentRequest);
            peer.on("segment-loaded", this.onSegmentLoaded);
            peer.on("segment-absent", this.onSegmentAbsent);
            peer.on("segment-error", this.onSegmentError);
            peer.on("segment-timeout", this.onSegmentTimeout);
            peer.on("bytes-downloaded", this.onPieceBytesDownloaded);
            peer.on("bytes-uploaded", this.onPieceBytesUploaded);
            let peerCandidatesById = this.peerCandidates.get(peer.id);
            if (!peerCandidatesById) {
                peerCandidatesById = [];
                this.peerCandidates.set(peer.id, peerCandidatesById);
            }
            peerCandidatesById.push(peer);
        };
        this.download = (segment) => {
            if (this.isDownloading(segment)) {
                return false;
            }
            const candidates = [];
            for (const peer of this.peers.values()) {
                if (peer.getDownloadingSegmentId() === null &&
                    peer.getSegmentsMap().get(segment.id) === _media_peer__WEBPACK_IMPORTED_MODULE_6__["MediaPeerSegmentStatus"].Loaded) {
                    candidates.push(peer);
                }
            }
            if (candidates.length === 0) {
                return false;
            }
            const peer = candidates[Math.floor(Math.random() * candidates.length)];
            peer.requestSegment(segment.id);
            this.peerSegmentRequests.set(segment.id, new PeerSegmentRequest(peer.id, segment));
            return true;
        };
        this.abort = (segment) => {
            let downloadingSegment;
            const peerSegmentRequest = this.peerSegmentRequests.get(segment.id);
            if (peerSegmentRequest) {
                const peer = this.peers.get(peerSegmentRequest.peerId);
                if (peer) {
                    downloadingSegment = peer.cancelSegmentRequest();
                }
                this.peerSegmentRequests.delete(segment.id);
            }
            return downloadingSegment;
        };
        this.isDownloading = (segment) => {
            return this.peerSegmentRequests.has(segment.id);
        };
        this.getActiveDownloadsCount = () => {
            return this.peerSegmentRequests.size;
        };
        this.destroy = (swarmChange = false) => {
            this.streamSwarmId = null;
            if (this.trackerClient) {
                this.trackerClient.stop();
                if (swarmChange) {
                    // Don't destroy trackerClient to reuse its WebSocket connection to the tracker server
                    this.trackerClient.removeAllListeners("error");
                    this.trackerClient.removeAllListeners("warning");
                    this.trackerClient.removeAllListeners("update");
                    this.trackerClient.removeAllListeners("peer");
                }
                else {
                    this.trackerClient.destroy();
                    this.trackerClient = null;
                }
            }
            if (this.pendingTrackerClient) {
                this.pendingTrackerClient.isDestroyed = true;
                this.pendingTrackerClient = null;
            }
            this.peers.forEach((peer) => peer.destroy());
            this.peers.clear();
            this.peerSegmentRequests.clear();
            for (const peerCandidateById of this.peerCandidates.values()) {
                for (const peerCandidate of peerCandidateById) {
                    peerCandidate.destroy();
                }
            }
            this.peerCandidates.clear();
        };
        this.sendSegmentsMapToAll = (segmentsMap) => {
            this.peers.forEach((peer) => peer.sendSegmentsMap(segmentsMap));
        };
        this.sendSegmentsMap = (peerId, segmentsMap) => {
            const peer = this.peers.get(peerId);
            if (peer) {
                peer.sendSegmentsMap(segmentsMap);
            }
        };
        this.getOverallSegmentsMap = () => {
            const overallSegmentsMap = new Map();
            for (const peer of this.peers.values()) {
                for (const [segmentId, segmentStatus] of peer.getSegmentsMap()) {
                    if (segmentStatus === _media_peer__WEBPACK_IMPORTED_MODULE_6__["MediaPeerSegmentStatus"].Loaded) {
                        overallSegmentsMap.set(segmentId, _media_peer__WEBPACK_IMPORTED_MODULE_6__["MediaPeerSegmentStatus"].Loaded);
                    }
                    else if (!overallSegmentsMap.get(segmentId)) {
                        overallSegmentsMap.set(segmentId, _media_peer__WEBPACK_IMPORTED_MODULE_6__["MediaPeerSegmentStatus"].LoadingByHttp);
                    }
                }
            }
            return overallSegmentsMap;
        };
        this.onPieceBytesDownloaded = (peer, bytes) => {
            this.emit("bytes-downloaded", bytes, peer.id);
        };
        this.onPieceBytesUploaded = (peer, bytes) => {
            this.emit("bytes-uploaded", bytes, peer.id);
        };
        this.onPeerConnect = (peer) => {
            const connectedPeer = this.peers.get(peer.id);
            if (connectedPeer) {
                this.debug("tracker peer already connected (in peer connect)", peer.id, peer);
                peer.destroy();
                return;
            }
            // First peer with the ID connected
            this.peers.set(peer.id, peer);
            // Destroy all other peer candidates
            const peerCandidatesById = this.peerCandidates.get(peer.id);
            if (peerCandidatesById) {
                for (const peerCandidate of peerCandidatesById) {
                    if (peerCandidate !== peer) {
                        peerCandidate.destroy();
                    }
                }
                this.peerCandidates.delete(peer.id);
            }
            this.emit("peer-connected", { id: peer.id, remoteAddress: peer.remoteAddress });
        };
        this.onPeerClose = (peer) => {
            if (this.peers.get(peer.id) !== peer) {
                // Try to delete the peer candidate
                const peerCandidatesById = this.peerCandidates.get(peer.id);
                if (!peerCandidatesById) {
                    return;
                }
                const index = peerCandidatesById.indexOf(peer);
                if (index !== -1) {
                    peerCandidatesById.splice(index, 1);
                }
                if (peerCandidatesById.length === 0) {
                    this.peerCandidates.delete(peer.id);
                }
                return;
            }
            for (const [key, value] of this.peerSegmentRequests) {
                if (value.peerId === peer.id) {
                    this.peerSegmentRequests.delete(key);
                }
            }
            this.peers.delete(peer.id);
            this.emit("peer-data-updated");
            this.emit("peer-closed", peer.id);
        };
        this.onPeerDataUpdated = () => {
            this.emit("peer-data-updated");
        };
        this.onSegmentRequest = (peer, segmentId) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.masterSwarmId === undefined) {
                return;
            }
            const segment = yield this.segmentsStorage.getSegment(segmentId, this.masterSwarmId);
            if (segment && segment.data) {
                peer.sendSegmentData(segmentId, segment.data);
            }
            else {
                peer.sendSegmentAbsent(segmentId);
            }
        });
        this.onSegmentLoaded = (peer, segmentId, data) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (!peerSegmentRequest) {
                return;
            }
            const segment = peerSegmentRequest.segment;
            if (this.settings.segmentValidator) {
                try {
                    yield this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "p2p", peer.id);
                }
                catch (error) {
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
        this.onSegmentAbsent = (peer, segmentId) => {
            this.peerSegmentRequests.delete(segmentId);
            this.emit("peer-data-updated");
        };
        this.onSegmentError = (peer, segmentId, description) => {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (peerSegmentRequest) {
                this.peerSegmentRequests.delete(segmentId);
                this.emit("segment-error", peerSegmentRequest.segment, description, peer.id);
            }
        };
        this.onSegmentTimeout = (peer, segmentId) => {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (peerSegmentRequest) {
                this.peerSegmentRequests.delete(segmentId);
                peer.destroy();
                if (this.peers.delete(peerSegmentRequest.peerId)) {
                    this.emit("peer-data-updated");
                }
            }
        };
        this.peerId = settings.useP2P ? generatePeerId() : new ArrayBuffer(0);
        if (this.debug.enabled) {
            this.debug("peer ID", this.getPeerId(), new TextDecoder().decode(this.peerId));
        }
    }
}


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: SegmentsMemoryStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SegmentsMemoryStorage", function() { return SegmentsMemoryStorage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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

class SegmentsMemoryStorage {
    constructor(settings) {
        this.settings = settings;
        this.cache = new Map();
        this.storeSegment = (segment) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
        });
        this.getSegmentsMap = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.cache;
        });
        this.getSegment = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const cacheItem = this.cache.get(id);
            if (cacheItem === undefined) {
                return undefined;
            }
            cacheItem.lastAccessed = performance.now();
            return cacheItem.segment;
        });
        this.hasSegment = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.cache.has(id);
        });
        this.clean = (masterSwarmId, lockedSegmentsFilter) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const segmentsToDelete = [];
            const remainingSegments = [];
            // Delete old segments
            const now = performance.now();
            for (const cachedSegment of this.cache.values()) {
                if (now - cachedSegment.lastAccessed > this.settings.cachedSegmentExpiration) {
                    segmentsToDelete.push(cachedSegment.segment.id);
                }
                else {
                    remainingSegments.push(cachedSegment);
                }
            }
            // Delete segments over cached count
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
            segmentsToDelete.forEach((id) => this.cache.delete(id));
            return segmentsToDelete.length > 0;
        });
        this.destroy = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.cache.clear();
        });
    }
}


/***/ }),

/***/ "./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: STEEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STEEmitter", function() { return STEEmitter; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
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

class STEEmitter extends events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
    constructor() {
        super(...arguments);
        this.on = (event, listener) => super.on(event, listener);
        this.emit = (event, ...args) => super.emit(event, ...args);
    }
}


/***/ }),

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
            console.log(mediaError);
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
            console.error('MEDIA_ERROR: ', errorTxt);
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
        console.log("disposedisposedisposedispose");
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
        if (this.errorCounts[hls_js__WEBPACK_IMPORTED_MODULE_0__["ErrorTypes"].NETWORK_ERROR] <= 5) {
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
        console.error(error.message, data);
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
        // _notifyVideoQualities sometimes runs before the quality picker event handler is registered -> no video switcher
        this.handlers.playing = this._notifyVideoQualities.bind(this);
        this.videoElement.addEventListener('playing', this.handlers.playing);
        this.hls = new hls_js__WEBPACK_IMPORTED_MODULE_0___default.a(this.hlsjsConfig);
        this._executeHooksFor('beforeinitialize');
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, (event, data) => this._onError(event, data));
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].AUDIO_TRACKS_UPDATED, () => this._onAudioTracks());
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].MANIFEST_PARSED, (event, data) => this._onMetaData(event, data)); // FIXME: typings
        this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["Events"].LEVEL_LOADED, (event, data) => {
            // The DVR plugin will auto seek to "live edge" on start up
            console.log("LOEV");
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
            console.log("LOEsV");
            // Emit custom 'loadedmetadata' event for parity with `videojs-contrib-hls`
            // Ref: https://github.com/videojs/videojs-contrib-hls#loadedmetadata
            this.tech.trigger('loadedmetadata');
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
//# sourceMappingURL=9.chunk.js.map