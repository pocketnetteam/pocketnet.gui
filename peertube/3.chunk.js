(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ Events; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ hybrid_loader_HybridLoader; });

// UNUSED EXPORTS: version

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/loader-interface.ts
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

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/debug/src/browser.js
var browser = __webpack_require__(161);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(159);

// EXTERNAL MODULE: ./node_modules/simple-peer/index.js
var simple_peer = __webpack_require__(198);
var simple_peer_default = /*#__PURE__*/__webpack_require__.n(simple_peer);

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/stringly-typed-event-emitter.ts
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

class stringly_typed_event_emitter_STEEmitter extends events["EventEmitter"] {
    constructor() {
        super(...arguments);
        this.on = (event, listener) => super.on(event, listener);
        this.emit = (event, ...args) => super.emit(event, ...args);
    }
}

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/http-media-manager.ts
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



class http_media_manager_HttpMediaManager extends stringly_typed_event_emitter_STEEmitter {
    constructor(settings) {
        super();
        this.settings = settings;
        this.xhrRequests = new Map();
        this.failedSegments = new Map();
        this.debug = browser_default()("p2pml:http-media-manager");
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
            xhr.addEventListener("load", (event) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.segmentDownloadFinished = (segment, data, xhr) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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

// EXTERNAL MODULE: ./node_modules/bittorrent-tracker/client.js
var client = __webpack_require__(276);
var client_default = /*#__PURE__*/__webpack_require__.n(client);

// EXTERNAL MODULE: ./node_modules/node-libs-browser/node_modules/buffer/index.js
var node_modules_buffer = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/sha.js/sha1.js
var sha1 = __webpack_require__(219);
var sha1_default = /*#__PURE__*/__webpack_require__.n(sha1);

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/media-peer.ts
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
class media_peer_MediaPeer extends stringly_typed_event_emitter_STEEmitter {
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
        this.debug = browser_default()("p2pml:media-peer");
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
                const buffer = node_modules_buffer["Buffer"].from(data, data.byteLength - bytesLeft, bytesToSend);
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

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/p2p-media-manager.ts
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
const PEER_ID_VERSION_STRING = '0.6.2'.replace(/\d*./g, (v) => `0${parseInt(v, 10) % 100}`.slice(-2)).slice(0, 4);
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
class p2p_media_manager_P2PMediaManager extends stringly_typed_event_emitter_STEEmitter {
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
        this.debug = browser_default()("p2pml:p2p-media-manager");
        this.pendingTrackerClient = null;
        this.getPeers = () => {
            return this.peers;
        };
        this.getPeerId = () => {
            return node_modules_buffer["Buffer"].from(this.peerId).toString("hex");
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
            const infoHash = new sha1_default.a().update(`${PEER_PROTOCOL_VERSION}${this.streamSwarmId}`).digest();
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
                infoHash: node_modules_buffer["Buffer"].from(infoHash, 0, 20),
                peerId: node_modules_buffer["Buffer"].from(this.peerId, 0, 20),
                announce: this.settings.trackerAnnounce,
                rtcConfig: this.settings.rtcConfig,
                port: 6881,
                getAnnounceOpts: () => {
                    return { numwant: this.settings.peerRequestsPerAnnounce };
                },
            };
            let oldTrackerClient = this.trackerClient;
            this.trackerClient = new client_default.a(clientOptions);
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
            const peer = new media_peer_MediaPeer(trackerPeer, this.settings);
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
                    peer.getSegmentsMap().get(segment.id) === MediaPeerSegmentStatus.Loaded) {
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
                    if (segmentStatus === MediaPeerSegmentStatus.Loaded) {
                        overallSegmentsMap.set(segmentId, MediaPeerSegmentStatus.Loaded);
                    }
                    else if (!overallSegmentsMap.get(segmentId)) {
                        overallSegmentsMap.set(segmentId, MediaPeerSegmentStatus.LoadingByHttp);
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
        this.onSegmentRequest = (peer, segmentId) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.onSegmentLoaded = (peer, segmentId, data) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/bandwidth-approximator.ts
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

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/segments-memory-storage.ts
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

class segments_memory_storage_SegmentsMemoryStorage {
    constructor(settings) {
        this.settings = settings;
        this.cache = new Map();
        this.storeSegment = (segment) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
        });
        this.getSegmentsMap = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.cache;
        });
        this.getSegment = (id) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            const cacheItem = this.cache.get(id);
            if (cacheItem === undefined) {
                return undefined;
            }
            cacheItem.lastAccessed = performance.now();
            return cacheItem.segment;
        });
        this.hasSegment = (id) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.cache.has(id);
        });
        this.clean = (masterSwarmId, lockedSegmentsFilter) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.destroy = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            this.cache.clear();
        });
    }
}

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/hybrid-loader.ts
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
    rtcConfig: simple_peer_default.a.config,
};
class hybrid_loader_HybridLoader extends events["EventEmitter"] {
    constructor(settings = {}) {
        super();
        this.debug = browser_default()("p2pml:hybrid-loader");
        this.debugSegments = browser_default()("p2pml:hybrid-loader-segments");
        this.segmentsQueue = [];
        this.bandwidthApproximator = new BandwidthApproximator();
        this.httpDownloadInitialTimeoutTimestamp = -Infinity;
        this.createHttpManager = () => {
            return new http_media_manager_HttpMediaManager(this.settings);
        };
        this.createP2PManager = () => {
            return new p2p_media_manager_P2PMediaManager(this.segmentsStorage, this.settings);
        };
        this.load = (segments, streamSwarmId) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
                    this.emit(Events.SegmentAbort, segment);
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
        this.getSegment = (id) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.destroy = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.processInitialSegmentTimeout = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
                    if (segmentsMap.get(segment.id) !== MediaPeerSegmentStatus.Loaded) {
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
        this.downloadRandomSegmentOverHttp = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
            this.emit(Events.PieceBytesDownloaded, method, bytes, peerId);
        };
        this.onPieceBytesUploaded = (method, bytes, peerId) => {
            this.emit(Events.PieceBytesUploaded, method, bytes, peerId);
        };
        this.onSegmentLoaded = (segment, data, peerId) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            this.debugSegments("segment loaded", segment.id, segment.url);
            if (this.masterSwarmId === undefined) {
                return;
            }
            segment.data = data;
            segment.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now());
            yield this.segmentsStorage.storeSegment(segment);
            this.emit(Events.SegmentLoaded, segment, peerId);
            const storageSegments = yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            this.processSegmentsQueue(storageSegments);
            if (!this.settings.consumeOnly) {
                this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
            }
        });
        this.onSegmentError = (segment, details, peerId) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            this.debugSegments("segment error", segment.id, segment.url, peerId, details);
            this.emit(Events.SegmentError, segment, details, peerId);
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
                addSegmentToMap(storageSegment.segment, MediaPeerSegmentStatus.Loaded);
            }
            for (const download of this.httpManager.getActiveDownloads().values()) {
                addSegmentToMap(download.segment, MediaPeerSegmentStatus.LoadingByHttp);
            }
            return segmentsMap;
        };
        this.onPeerConnect = (peer) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            this.emit(Events.PeerConnect, peer);
            if (!this.settings.consumeOnly && this.masterSwarmId !== undefined) {
                this.p2pManager.sendSegmentsMap(peer.id, this.createSegmentsMap(yield this.segmentsStorage.getSegmentsMap(this.masterSwarmId)));
            }
        });
        this.onPeerClose = (peerId) => {
            this.emit(Events.PeerClose, peerId);
        };
        this.onTrackerUpdate = (data) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
        this.cleanSegmentsStorage = () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            if (this.masterSwarmId === undefined) {
                return false;
            }
            return this.segmentsStorage.clean(this.masterSwarmId, (id) => this.segmentsQueue.find((queueSegment) => queueSegment.id === id) !== undefined);
        });
        this.now = () => {
            return performance.now();
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
        console.log("P2p2 settings", this.settings);
        const { bufferedSegmentsCount } = settings;
        if (typeof bufferedSegmentsCount === "number") {
            if (settings.p2pDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
            }
            if (settings.httpDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = bufferedSegmentsCount;
            }
        }
        this.debug.enabled = true;
        this.debugSegments.enabled = true;
        this.segmentsStorage =
            this.settings.segmentsStorage === undefined
                ? new segments_memory_storage_SegmentsMemoryStorage(this.settings)
                : this.settings.segmentsStorage;
        this.debug("loader settings", this.settings);
        this.httpManager = this.createHttpManager();
        this.httpManager.on("segment-loaded", this.onSegmentLoaded);
        this.httpManager.on("segment-error", this.onSegmentError);
        this.httpManager.on("bytes-downloaded", (bytes) => this.onPieceBytesDownloaded("http", bytes));
        this.p2pManager = this.createP2PManager();
        this.p2pManager.on("segment-loaded", this.onSegmentLoaded);
        this.p2pManager.on("segment-error", this.onSegmentError);
        this.p2pManager.on("peer-data-updated", () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
hybrid_loader_HybridLoader.isSupported = () => {
    return window.RTCPeerConnection.prototype.createDataChannel !== undefined;
};

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts
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

/***/ 264:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 265:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 278:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 280:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "version", function() { return /* binding */ version; });
__webpack_require__.d(__webpack_exports__, "Engine", function() { return /* reexport */ engine_Engine; });
__webpack_require__.d(__webpack_exports__, "SegmentManager", function() { return /* reexport */ segment_manager_SegmentManager; });
__webpack_require__.d(__webpack_exports__, "initHlsJsPlayer", function() { return /* binding */ initHlsJsPlayer; });
__webpack_require__.d(__webpack_exports__, "initClapprPlayer", function() { return /* binding */ initClapprPlayer; });
__webpack_require__.d(__webpack_exports__, "initFlowplayerHlsJsPlayer", function() { return /* binding */ initFlowplayerHlsJsPlayer; });
__webpack_require__.d(__webpack_exports__, "initVideoJsContribHlsJsPlayer", function() { return /* binding */ initVideoJsContribHlsJsPlayer; });
__webpack_require__.d(__webpack_exports__, "initVideoJsHlsJsPlugin", function() { return /* binding */ initVideoJsHlsJsPlugin; });
__webpack_require__.d(__webpack_exports__, "initMediaElementJsPlayer", function() { return /* binding */ initMediaElementJsPlayer; });
__webpack_require__.d(__webpack_exports__, "initJwPlayer", function() { return /* binding */ initJwPlayer; });

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(159);

// EXTERNAL MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-core/lib/index.ts + 8 modules
var lib = __webpack_require__(220);

// EXTERNAL MODULE: ./node_modules/m3u8-parser/dist/m3u8-parser.es.js + 1 modules
var m3u8_parser_es = __webpack_require__(517);

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/segment-manager.ts
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
    assetsStorage: undefined,
};
class segment_manager_SegmentManager {
    constructor(loader, settings = {}) {
        this.masterPlaylist = null;
        this.variantPlaylists = new Map();
        this.segmentRequest = null;
        this.playQueue = [];
        this.onSegmentLoaded = (segment) => {
            if (this.segmentRequest &&
                this.segmentRequest.segmentUrl === segment.url &&
                byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.segmentRequest.onSuccess(segment.data.slice(0), segment.downloadBandwidth);
                this.segmentRequest = null;
            }
        };
        this.onSegmentError = (segment, error) => {
            if (this.segmentRequest &&
                this.segmentRequest.segmentUrl === segment.url &&
                byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
                this.segmentRequest.onError(error);
                this.segmentRequest = null;
            }
        };
        this.onSegmentAbort = (segment) => {
            if (this.segmentRequest &&
                this.segmentRequest.segmentUrl === segment.url &&
                byteRangeToString(this.segmentRequest.segmentByteRange) === segment.range) {
                this.segmentRequest.onError("Loading aborted: internal abort");
                this.segmentRequest = null;
            }
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
        this.loader = loader;
        this.loader.on(lib["a" /* Events */].SegmentLoaded, this.onSegmentLoaded);
        this.loader.on(lib["a" /* Events */].SegmentError, this.onSegmentError);
        this.loader.on(lib["a" /* Events */].SegmentAbort, this.onSegmentAbort);
    }
    getSettings() {
        return this.settings;
    }
    processPlaylist(requestUrl, content, responseUrl) {
        const parser = new m3u8_parser_es["a" /* Parser */]();
        parser.push(content);
        parser.end();
        const playlist = new Playlist(requestUrl, responseUrl, parser.manifest);
        if (playlist.manifest.playlists) {
            this.masterPlaylist = playlist;
            for (const [key, variantPlaylist] of this.variantPlaylists) {
                const { streamSwarmId, found, index } = this.getStreamSwarmId(variantPlaylist.requestUrl);
                if (!found) {
                    this.variantPlaylists.delete(key);
                }
                else {
                    variantPlaylist.streamSwarmId = streamSwarmId;
                    variantPlaylist.streamId = "V" + index.toString();
                }
            }
        }
        else {
            const { streamSwarmId, found, index } = this.getStreamSwarmId(requestUrl);
            if (found || this.masterPlaylist === null) {
                // do not add audio and subtitles to variants
                playlist.streamSwarmId = streamSwarmId;
                playlist.streamId = this.masterPlaylist === null ? undefined : "V" + index.toString();
                this.variantPlaylists.set(requestUrl, playlist);
                this.updateSegments();
            }
        }
    }
    loadPlaylist(url) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            const assetsStorage = this.settings.assetsStorage;
            let xhr;
            if (assetsStorage !== undefined) {
                let masterSwarmId;
                masterSwarmId = this.getMasterSwarmId();
                if (masterSwarmId === undefined) {
                    masterSwarmId = url.split("?")[0];
                }
                const asset = yield assetsStorage.getAsset(url, undefined, masterSwarmId);
                if (asset !== undefined) {
                    xhr = {
                        responseURL: asset.responseUri,
                        response: asset.data,
                        getResponseHeader: null
                    };
                }
                else {
                    xhr = yield this.loadContent(url, "text");
                    void assetsStorage.storeAsset({
                        masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : url,
                        masterSwarmId: masterSwarmId,
                        requestUri: url,
                        responseUri: xhr.responseURL,
                        data: xhr.response,
                    });
                }
            }
            else {
                xhr = yield this.loadContent(url, "text");
            }
            this.processPlaylist(url, xhr.response, xhr.responseURL);
            return xhr;
        });
    }
    loadSegment(url, byteRange) {
        var _a;
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            const segmentLocation = this.getSegmentLocation(url, byteRange);
            const byteRangeString = byteRangeToString(byteRange);
            if (!segmentLocation) {
                let content;
                // Not a segment from variants; usually can be: init, audio or subtitles segment, encription key etc.
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
                        }
                        else {
                            const xhr = yield this.loadContent(url, "arraybuffer", byteRangeString);
                            content = xhr.response;
                            void assetsStorage.storeAsset({
                                masterManifestUri: masterManifestUri,
                                masterSwarmId: masterSwarmId,
                                requestUri: url,
                                requestRange: byteRangeString,
                                responseUri: xhr.responseURL,
                                data: content,
                            });
                        }
                    }
                }
                if (content === undefined) {
                    const xhr = yield this.loadContent(url, "arraybuffer", byteRangeString);
                    content = xhr.response;
                }
                return { content, downloadBandwidth: 0 };
            }
            const segmentSequence = (segmentLocation.playlist.manifest.mediaSequence ? segmentLocation.playlist.manifest.mediaSequence : 0) +
                segmentLocation.segmentIndex;
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
                this.segmentRequest = new SegmentRequest(url, byteRange, segmentSequence, segmentLocation.playlist.requestUrl, (content, downloadBandwidth) => resolve({ content, downloadBandwidth }), (error) => reject(error));
            });
            this.playQueue.push({ segmentUrl: url, segmentByteRange: byteRange, segmentSequence: segmentSequence });
            void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, true);
            return promise;
        });
    }
    setPlayingSegment(url, byteRange, start, duration) {
        const urlIndex = this.playQueue.findIndex((segment) => segment.segmentUrl === url && compareByteRanges(segment.segmentByteRange, byteRange));
        if (urlIndex >= 0) {
            this.playQueue = this.playQueue.slice(urlIndex);
            this.playQueue[0].playPosition = { start, duration };
            this.updateSegments();
        }
    }
    setPlayingSegmentByCurrentTime(playheadPosition) {
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
    abortSegment(url, byteRange) {
        if (this.segmentRequest &&
            this.segmentRequest.segmentUrl === url &&
            compareByteRanges(this.segmentRequest.segmentByteRange, byteRange)) {
            this.segmentRequest.onSuccess(undefined, 0);
            this.segmentRequest = null;
        }
    }
    destroy() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
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
    updateSegments() {
        if (!this.segmentRequest) {
            return;
        }
        const segmentLocation = this.getSegmentLocation(this.segmentRequest.segmentUrl, this.segmentRequest.segmentByteRange);
        if (segmentLocation) {
            void this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, false);
        }
    }
    getSegmentLocation(url, byteRange) {
        for (const playlist of this.variantPlaylists.values()) {
            const segmentIndex = playlist.getSegmentIndex(url, byteRange);
            if (segmentIndex >= 0) {
                return { playlist: playlist, segmentIndex: segmentIndex };
            }
        }
        return undefined;
    }
    loadSegments(playlist, segmentIndex, requestFirstSegment) {
        var _a;
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            const segments = [];
            const playlistSegments = playlist.manifest.segments;
            const initialSequence = (_a = playlist.manifest.mediaSequence) !== null && _a !== void 0 ? _a : 0;
            let loadSegmentId = null;
            let priority = Math.max(0, this.playQueue.length - 1);
            const masterSwarmId = this.getMasterSwarmId();
            for (let i = segmentIndex; i < playlistSegments.length && segments.length < this.settings.forwardSegmentCount; ++i) {
                const segment = playlist.manifest.segments[i];
                const url = playlist.getSegmentAbsoluteUrl(segment.uri);
                const byteRange = segment.byteRange;
                const id = this.getSegmentId(playlist, initialSequence + i);
                segments.push({
                    id: id,
                    url: url,
                    masterSwarmId: masterSwarmId !== undefined ? masterSwarmId : playlist.streamSwarmId,
                    masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : playlist.requestUrl,
                    streamId: playlist.streamId,
                    sequence: (initialSequence + i).toString(),
                    range: byteRangeToString(byteRange),
                    priority: priority++,
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
    getSegmentId(playlist, segmentSequence) {
        return `${playlist.streamSwarmId}+${segmentSequence}`;
    }
    getMasterSwarmId() {
        const settingsSwarmId = this.settings.swarmId && this.settings.swarmId.length !== 0 ? this.settings.swarmId : undefined;
        if (settingsSwarmId !== undefined) {
            return settingsSwarmId;
        }
        return this.masterPlaylist !== null ? this.masterPlaylist.requestUrl.split("?")[0] : undefined;
    }
    getStreamSwarmId(playlistUrl) {
        const masterSwarmId = this.getMasterSwarmId();
        if (this.masterPlaylist && this.masterPlaylist.manifest.playlists && masterSwarmId) {
            for (let i = 0; i < this.masterPlaylist.manifest.playlists.length; ++i) {
                const url = new URL(this.masterPlaylist.manifest.playlists[i].uri, this.masterPlaylist.responseUrl).toString();
                if (url === playlistUrl) {
                    return { streamSwarmId: `${masterSwarmId}+V${i}`, found: true, index: i };
                }
            }
        }
        return {
            streamSwarmId: masterSwarmId !== null && masterSwarmId !== void 0 ? masterSwarmId : playlistUrl.split("?")[0],
            found: false,
            index: -1,
        };
    }
    loadContent(url, responseType, range) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = responseType;
                if (range && range != 'bytes=0--1') {
                    xhr.setRequestHeader("Range", range);
                }
                xhr.addEventListener("readystatechange", () => {
                    if (xhr.readyState !== 4)
                        return;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr);
                    }
                    else {
                        reject(xhr.statusText);
                    }
                });
                const xhrSetup = this.loader.getSettings().xhrSetup;
                if (xhrSetup) {
                    xhrSetup(xhr, url);
                }
                xhr.send();
            });
        });
    }
}
class Playlist {
    constructor(requestUrl, responseUrl, manifest) {
        this.requestUrl = requestUrl;
        this.responseUrl = responseUrl;
        this.manifest = manifest;
        this.streamSwarmId = "";
    }
    getSegmentIndex(url, byteRange) {
        for (let i = 0; i < this.manifest.segments.length; ++i) {
            const segment = this.manifest.segments[i];
            const segmentUrl = this.getSegmentAbsoluteUrl(segment.uri);
            if (url === segmentUrl && compareByteRanges(segment.byteRange, byteRange)) {
                return i;
            }
        }
        return -1;
    }
    getSegmentAbsoluteUrl(segmentUrl) {
        return new URL(segmentUrl, this.responseUrl).toString();
    }
}
class SegmentRequest {
    constructor(segmentUrl, segmentByteRange, segmentSequence, playlistRequestUrl, onSuccess, onError) {
        this.segmentUrl = segmentUrl;
        this.segmentByteRange = segmentByteRange;
        this.segmentSequence = segmentSequence;
        this.playlistRequestUrl = playlistRequestUrl;
        this.onSuccess = onSuccess;
        this.onError = onError;
    }
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

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/hlsjs-loader.ts
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

const DEFAULT_DOWNLOAD_LATENCY = 1;
const DEFAULT_DOWNLOAD_BANDWIDTH = 12500; // bytes per millisecond
class hlsjs_loader_HlsJsLoader {
    constructor(segmentManager) {
        this.segmentManager = segmentManager;
    }
    load(context, _config, callbacks, stats) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            if (context.type) {
                try {
                    const result = yield this.segmentManager.loadPlaylist(context.url);
                    this.successPlaylist(result, context, callbacks, stats);
                }
                catch (e) {
                    this.error(e, context, callbacks);
                }
            }
            else if (context.frag) {
                try {
                    const result = yield this.segmentManager.loadSegment(context.url, context.rangeStart === undefined || context.rangeEnd === undefined
                        ? undefined
                        : { offset: context.rangeStart, length: context.rangeEnd - context.rangeStart });
                    const { content } = result;
                    if (content !== undefined) {
                        this.successSegment(content, result.downloadBandwidth, context, callbacks, stats);
                        /*
                        setTimeout(() => this.successSegment(content, result.downloadBandwidth, context, callbacks, stats), 0);*/
                    }
                }
                catch (e) {
                    this.error(e, context, callbacks);
                    //setTimeout(() => this.error(e, context, callbacks), 0);
                }
            }
            else {
            }
        });
    }
    abort(context) {
        this.segmentManager.abortSegment(context.url, context.rangeStart === undefined || context.rangeEnd === undefined
            ? undefined
            : { offset: context.rangeStart, length: context.rangeEnd - context.rangeStart });
    }
    successPlaylist(xhr, context, callbacks, stats) {
        stats.total = xhr.response.length;
        stats.loaded = xhr.response.length; //stats.loaded += xhr.response.length;
        /*const stats = {
            trequest: now - 300,
            tfirst: now - 200,
            tload: now - 1,
            tparsed: now,
            loaded: xhr.response.length,
            total: xhr.response.length,
        };*/
        callbacks.onSuccess({
            url: xhr.responseURL,
            data: xhr.response,
        }, stats, context, undefined);
    }
    successSegment(content, downloadBandwidth, context, callbacks, stats) {
        stats.loaded = content.byteLength;
        stats.bwEstimate = downloadBandwidth || DEFAULT_DOWNLOAD_BANDWIDTH;
        if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onProgress)
            callbacks.onProgress(stats, context, content, undefined);
        callbacks.onSuccess({
            url: context.url,
            data: content,
        }, stats, context, undefined);
    }
    error(error, context, callbacks) {
        callbacks.onError(error, context, undefined);
    }
}

// EXTERNAL MODULE: ./node_modules/hls.js/src/loader/load-stats.ts
var load_stats = __webpack_require__(512);

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/engine.ts
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






class engine_Engine extends events["EventEmitter"] {
    constructor(settings = {}) {
        super();
        this.loader = new lib["b" /* HybridLoader */](settings.loader);
        this.segmentManager = new segment_manager_SegmentManager(this.loader, settings.segments);
        Object.keys(lib["a" /* Events */])
            .map((eventKey) => lib["a" /* Events */][eventKey])
            .forEach((event) => this.loader.on(event, (...args) => this.emit(event, ...args)));
    }
    static isSupported() {
        return lib["b" /* HybridLoader */].isSupported();
    }
    createLoaderClass() {
        var _a;
        const engine = this; // eslint-disable-line @typescript-eslint/no-this-alias
        return _a = class {
                constructor() {
                    this.load = (context, config, callbacks) => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
                        if (this.stats.loading.start) {
                            throw new Error('Loader can only be used once.');
                        }
                        this.context = context;
                        this.stats.bwEstimate = 12500;
                        this.stats.loading.start = this.stats.loading.end = this.stats.loading.first = performance.now();
                        yield this.impl.load(context, config, callbacks, this.stats);
                        this.stats.loading.first = performance.now();
                        this.stats.loading.end = performance.now();
                        this.stats.chunkCount++;
                        //? this.stats.bwEstimate = this.loader.bandwidthApproximator.getBandwidth(this.now());
                    });
                    this.abort = (callbacks) => {
                        this.abortInternal(callbacks);
                    };
                    this.destroy = (callbacks) => {
                        this.abortInternal(callbacks);
                    };
                    this.getCacheAge = function () {
                        return 100000;
                    };
                    this.context = null;
                    this.impl = new hlsjs_loader_HlsJsLoader(engine.segmentManager);
                    this.stats = new load_stats["a" /* LoadStats */]();
                }
                abortInternal(callbacks) {
                    if (this.context) {
                        this.impl.abort(this.context);
                    }
                    if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onAbort) {
                        callbacks.onAbort(this.stats, this.context, undefined);
                    }
                }
            },
            _a.getEngine = () => {
                return engine;
            },
            _a;
    }
    destroy() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.segmentManager.destroy();
        });
    }
    getSettings() {
        return {
            segments: this.segmentManager.getSettings(),
            loader: this.loader.getSettings(),
        };
    }
    getDetails() {
        return {
            loader: this.loader.getDetails(),
        };
    }
    setPlayingSegment(url, byteRange, start, duration) {
        this.segmentManager.setPlayingSegment(url, byteRange, start, duration);
    }
    setPlayingSegmentByCurrentTime(playheadPosition) {
        this.segmentManager.setPlayingSegmentByCurrentTime(playheadPosition);
    }
}

// CONCATENATED MODULE: ./src/assets/player/p2p-media-loader/core/p2p-media-loader-master/p2p-media-loader-hlsjs/lib/index.ts
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
    player.on("ready", () => { var _a; return initHlsJsPlayer((_a = player.engine.hlsjs) !== null && _a !== void 0 ? _a : player.engine.hls); });
}
function initVideoJsContribHlsJsPlayer(player) {
    player.ready(() => {
        const options = player.tech_.options_;
        if (options &&
            options.hlsjsConfig &&
            options.hlsjsConfig.loader &&
            typeof options.hlsjsConfig.loader.getEngine === "function") {
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
    mediaElement.addEventListener("hlsFragChanged", (event) => {
        console.log('hlsFragChanged');
        const hls = mediaElement.hlsPlayer;
        if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
            const engine = hls.config.loader.getEngine();
            if (event.data && event.data.length > 1) {
                const frag = event.data[1].frag;
                const byteRange = frag.byteRange.length !== 2
                    ? undefined
                    : { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
                engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);
            }
        }
    });
    mediaElement.addEventListener("hlsDestroying", () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
        console.log('hlsDestroying');
        const hls = mediaElement.hlsPlayer;
        if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
            const engine = hls.config.loader.getEngine();
            yield engine.destroy();
        }
    }));
    mediaElement.addEventListener("hlsError", (event) => {
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
        /** */
        /*const frag = data.frag;
        const byteRange =
            frag.byteRange.length !== 2
                ? undefined
                : { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
        engine.setPlayingSegment(frag.url, byteRange, frag.start, frag.duration);*/
    });
    player.on("hlsDestroying", () => Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
        yield engine.destroy();
    }));
    player.on("hlsError", (_event, errorData) => {
        /*if (errorData.details === "bufferStalledError") {

            const htmlMediaElement = (player.media === undefined
                ? player.el_ // videojs-contrib-hlsjs
                : player.media) as HTMLMediaElement | undefined; // all others
            if (htmlMediaElement) {
                engine.setPlayingSegmentByCurrentTime(htmlMediaElement.currentTime);
            }
        }*/
    });
}


/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map