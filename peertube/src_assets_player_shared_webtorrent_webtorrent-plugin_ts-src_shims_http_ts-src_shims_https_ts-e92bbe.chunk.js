(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_shared_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-e92bbe"],{

/***/ "./src/assets/player/shared/webtorrent/peertube-chunk-store.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/player/shared/webtorrent/peertube-chunk-store.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeertubeChunkStore": () => (/* binding */ PeertubeChunkStore)
/* harmony export */ });
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dexie */ "./node_modules/dexie/dist/modern/dexie.mjs");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
// From https://github.com/MinEduTDF/idb-chunk-store
// We use temporary IndexDB (all data are removed on destroy) to avoid RAM issues
// Thanks @santiagogil and @Feross



class ChunkDatabase extends dexie__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(dbname) {
        super(dbname);
        this.version(1).stores({
            chunks: 'id'
        });
    }
}
class ExpirationDatabase extends dexie__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super('webtorrent-expiration');
        this.version(1).stores({
            databases: 'name,expiration'
        });
    }
}
class PeertubeChunkStore extends events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
    constructor(chunkLength, opts) {
        var _a;
        super();
        this.pendingPut = [];
        // If the store is full
        this.memoryChunks = {};
        this.databaseName = 'webtorrent-chunks-';
        if (!opts)
            opts = {};
        if ((_a = opts.torrent) === null || _a === void 0 ? void 0 : _a.infoHash)
            this.databaseName += opts.torrent.infoHash;
        else
            this.databaseName += '-default';
        this.setMaxListeners(100);
        this.chunkLength = Number(chunkLength);
        if (!this.chunkLength)
            throw new Error('First argument must be a chunk length');
        this.length = Number(opts.length) || Infinity;
        if (this.length !== Infinity) {
            this.lastChunkLength = (this.length % this.chunkLength) || this.chunkLength;
            this.lastChunkIndex = Math.ceil(this.length / this.chunkLength) - 1;
        }
        this.db = new ChunkDatabase(this.databaseName);
        // Track databases that expired
        this.expirationDB = new ExpirationDatabase();
        this.runCleaner();
    }
    put(index, buf, cb) {
        const isLastChunk = (index === this.lastChunkIndex);
        if (isLastChunk && buf.length !== this.lastChunkLength) {
            return this.nextTick(cb, new Error('Last chunk length must be ' + this.lastChunkLength));
        }
        if (!isLastChunk && buf.length !== this.chunkLength) {
            return this.nextTick(cb, new Error('Chunk length must be ' + this.chunkLength));
        }
        // Specify we have this chunk
        this.memoryChunks[index] = true;
        // Add it to the pending put
        this.pendingPut.push({ id: index, buf, cb });
        // If it's already planned, return
        if (this.putBulkTimeout)
            return;
        // Plan a future bulk insert
        this.putBulkTimeout = setTimeout(async () => {
            const processing = this.pendingPut;
            this.pendingPut = [];
            this.putBulkTimeout = undefined;
            try {
                await this.db.transaction('rw', this.db.chunks, () => {
                    return this.db.chunks.bulkPut(processing.map(p => ({ id: p.id, buf: p.buf })));
                });
            }
            catch (err) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info('Cannot bulk insert chunks. Store them in memory.', err);
                processing.forEach(p => {
                    this.memoryChunks[p.id] = p.buf;
                });
            }
            finally {
                processing.forEach(p => p.cb());
            }
        }, PeertubeChunkStore.BUFFERING_PUT_MS);
    }
    get(index, opts, cb) {
        if (typeof opts === 'function')
            return this.get(index, null, opts);
        // IndexDB could be slow, use our memory index first
        const memoryChunk = this.memoryChunks[index];
        if (memoryChunk === undefined) {
            const err = new Error('Chunk not found');
            err['notFound'] = true;
            return process.nextTick(() => cb(err));
        }
        // Chunk in memory
        if (memoryChunk !== true)
            return cb(null, memoryChunk);
        // Chunk in store
        this.db.transaction('r', this.db.chunks, async () => {
            const result = await this.db.chunks.get({ id: index });
            if (result === undefined)
                return cb(null, Buffer.alloc(0));
            const buf = result.buf;
            if (!opts)
                return this.nextTick(cb, null, buf);
            const offset = opts.offset || 0;
            const len = opts.length || (buf.length - offset);
            return cb(null, buf.slice(offset, len + offset));
        })
            .catch(err => {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error(err);
            return cb(err);
        });
    }
    close(cb) {
        return this.destroy(cb);
    }
    async destroy(cb) {
        try {
            if (this.pendingPut) {
                clearTimeout(this.putBulkTimeout);
                this.pendingPut = null;
            }
            if (this.cleanerInterval) {
                clearInterval(this.cleanerInterval);
                this.cleanerInterval = null;
            }
            if (this.db) {
                this.db.close();
                await this.dropDatabase(this.databaseName);
            }
            if (this.expirationDB) {
                this.expirationDB.close();
                this.expirationDB = null;
            }
            return cb();
        }
        catch (err) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Cannot destroy peertube chunk store.', err);
            return cb(err);
        }
    }
    runCleaner() {
        this.checkExpiration();
        this.cleanerInterval = setInterval(() => {
            this.checkExpiration();
        }, PeertubeChunkStore.CLEANER_INTERVAL_MS);
    }
    async checkExpiration() {
        let databasesToDeleteInfo = [];
        try {
            await this.expirationDB.transaction('rw', this.expirationDB.databases, async () => {
                // Update our database expiration since we are alive
                await this.expirationDB.databases.put({
                    name: this.databaseName,
                    expiration: new Date().getTime() + PeertubeChunkStore.CLEANER_EXPIRATION_MS
                });
                const now = new Date().getTime();
                databasesToDeleteInfo = await this.expirationDB.databases.where('expiration').below(now).toArray();
            });
        }
        catch (err) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Cannot update expiration of fetch expired databases.', err);
        }
        for (const databaseToDeleteInfo of databasesToDeleteInfo) {
            await this.dropDatabase(databaseToDeleteInfo.name);
        }
    }
    async dropDatabase(databaseName) {
        const dbToDelete = new ChunkDatabase(databaseName);
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Destroying IndexDB database ${databaseName}`);
        try {
            await dbToDelete.delete();
            await this.expirationDB.transaction('rw', this.expirationDB.databases, () => {
                return this.expirationDB.databases.where({ name: databaseName }).delete();
            });
        }
        catch (err) {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error(`Cannot delete ${databaseName}.`, err);
        }
    }
    nextTick(cb, err, val) {
        process.nextTick(() => cb(err, val), undefined);
    }
}
PeertubeChunkStore.BUFFERING_PUT_MS = 1000;
PeertubeChunkStore.CLEANER_INTERVAL_MS = 1000 * 60; // 1 minute
PeertubeChunkStore.CLEANER_EXPIRATION_MS = 1000 * 60 * 5; // 5 minutes


/***/ }),

/***/ "./src/assets/player/shared/webtorrent/video-renderer.ts":
/*!***************************************************************!*\
  !*** ./src/assets/player/shared/webtorrent/video-renderer.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderVideo": () => (/* binding */ renderVideo)
/* harmony export */ });
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "./src/shims/path.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
// Thanks: https://github.com/feross/render-media
const MediaElementWrapper = __webpack_require__(/*! mediasource */ "./node_modules/mediasource/index.js");


const Videostream = __webpack_require__(/*! videostream */ "./node_modules/videostream/videostream.js");
const VIDEOSTREAM_EXTS = [
    '.m4a',
    '.m4v',
    '.mp4'
];
function renderVideo(file, elem, opts, callback) {
    validateFile(file);
    return renderMedia(file, elem, opts, callback);
}
function renderMedia(file, elem, opts, callback) {
    const extension = (0,path__WEBPACK_IMPORTED_MODULE_1__.extname)(file.name).toLowerCase();
    let preparedElem;
    let currentTime = 0;
    let renderer;
    try {
        if (VIDEOSTREAM_EXTS.includes(extension)) {
            renderer = useVideostream();
        }
        else {
            renderer = useMediaSource();
        }
    }
    catch (err) {
        return callback(err);
    }
    function useVideostream() {
        prepareElem();
        preparedElem.addEventListener('error', function onError(err) {
            preparedElem.removeEventListener('error', onError);
            return callback(err);
        });
        preparedElem.addEventListener('loadstart', onLoadStart);
        return new Videostream(file, preparedElem);
    }
    function useMediaSource(useVP9 = false) {
        const codecs = getCodec(file.name, useVP9);
        prepareElem();
        preparedElem.addEventListener('error', function onError(err) {
            preparedElem.removeEventListener('error', onError);
            // Try with vp9 before returning an error
            if (codecs.includes('vp8'))
                return fallbackToMediaSource(true);
            return callback(err);
        });
        preparedElem.addEventListener('loadstart', onLoadStart);
        const wrapper = new MediaElementWrapper(preparedElem);
        const writable = wrapper.createWriteStream(codecs);
        file.createReadStream().pipe(writable);
        if (currentTime)
            preparedElem.currentTime = currentTime;
        return wrapper;
    }
    function fallbackToMediaSource(useVP9 = false) {
        if (useVP9 === true)
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__.logger.info('Falling back to media source with VP9 enabled.');
        else
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_0__.logger.info('Falling back to media source..');
        useMediaSource(useVP9);
    }
    function prepareElem() {
        if (preparedElem === undefined) {
            preparedElem = elem;
            preparedElem.addEventListener('progress', function () {
                currentTime = elem.currentTime;
            });
        }
    }
    function onLoadStart() {
        preparedElem.removeEventListener('loadstart', onLoadStart);
        if (opts.autoplay)
            preparedElem.play();
        callback(null, renderer);
    }
}
function validateFile(file) {
    if (file == null) {
        throw new Error('file cannot be null or undefined');
    }
    if (typeof file.name !== 'string') {
        throw new Error('missing or invalid file.name property');
    }
    if (typeof file.createReadStream !== 'function') {
        throw new Error('missing or invalid file.createReadStream property');
    }
}
function getCodec(name, useVP9 = false) {
    const ext = (0,path__WEBPACK_IMPORTED_MODULE_1__.extname)(name).toLowerCase();
    if (ext === '.mp4') {
        return 'video/mp4; codecs="avc1.640029, mp4a.40.5"';
    }
    if (ext === '.webm') {
        if (useVP9 === true)
            return 'video/webm; codecs="vp9, opus"';
        return 'video/webm; codecs="vp8, vorbis"';
    }
    return undefined;
}



/***/ }),

/***/ "./src/assets/player/shared/webtorrent/webtorrent-plugin.ts":
/*!******************************************************************!*\
  !*** ./src/assets/player/shared/webtorrent/webtorrent-plugin.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTorrentPlugin": () => (/* binding */ WebTorrentPlugin)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webtorrent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webtorrent */ "./node_modules/webtorrent/index.js");
/* harmony import */ var webtorrent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webtorrent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root-helpers/logger */ "./src/root-helpers/logger.ts");
/* harmony import */ var _root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root-helpers/web-browser */ "./src/root-helpers/web-browser.ts");
/* harmony import */ var _shared_core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/core-utils */ "../shared/core-utils/index.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common */ "./src/assets/player/shared/common/index.ts");
/* harmony import */ var _peertube_chunk_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./peertube-chunk-store */ "./src/assets/player/shared/webtorrent/peertube-chunk-store.ts");
/* harmony import */ var _video_renderer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./video-renderer */ "./src/assets/player/shared/webtorrent/video-renderer.ts");









const CacheChunkStore = __webpack_require__(/*! cache-chunk-store */ "./node_modules/cache-chunk-store/index.js");
const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');
class WebTorrentPlugin extends Plugin {
    constructor(player, options) {
        super(player);
        this.autoplay = false;
        this.startTime = 0;
        this.CONSTANTS = {
            INFO_SCHEDULER: 1000,
            AUTO_QUALITY_SCHEDULER: 3000,
            AUTO_QUALITY_THRESHOLD_PERCENT: 30,
            AUTO_QUALITY_OBSERVATION_TIME: 10000,
            AUTO_QUALITY_HIGHER_RESOLUTION_DELAY: 5000,
            BANDWIDTH_AVERAGE_NUMBER_OF_VALUES: 5 // Last 5 seconds to build average bandwidth
        };
        this.webtorrent = new webtorrent__WEBPACK_IMPORTED_MODULE_1__({
            tracker: {
                rtcConfig: (0,_common__WEBPACK_IMPORTED_MODULE_6__.getRtcConfig)()
            },
            dht: false
        });
        this.destroyingFakeRenderer = false;
        this.autoResolution = true;
        this.autoResolutionPossible = true;
        this.isAutoResolutionObservation = false;
        this.playerRefusedP2P = false;
        this.downloadSpeeds = [];
        this.startTime = (0,_shared_core_utils__WEBPACK_IMPORTED_MODULE_4__.timeToInt)(options.startTime);
        // Custom autoplay handled by webtorrent because we lazy play the video
        this.autoplay = options.autoplay;
        this.playerRefusedP2P = options.playerRefusedP2P;
        this.videoFiles = options.videoFiles;
        this.videoDuration = options.videoDuration;
        this.savePlayerSrcFunction = this.player.src;
        this.playerElement = options.playerElement;
        this.player.ready(() => {
            const playerOptions = this.player.options_;
            const volume = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredVolume)();
            if (volume !== undefined)
                this.player.volume(volume);
            const muted = playerOptions.muted !== undefined ? playerOptions.muted : (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredMute)();
            if (muted !== undefined)
                this.player.muted(muted);
            this.player.duration(options.videoDuration);
            this.initializePlayer();
            this.runTorrentInfoScheduler();
            this.player.one('play', () => {
                // Don't run immediately scheduler, wait some seconds the TCP connections are made
                this.runAutoQualitySchedulerTimer = setTimeout(() => this.runAutoQualityScheduler(), this.CONSTANTS.AUTO_QUALITY_SCHEDULER);
            });
        });
    }
    dispose() {
        clearTimeout(this.addTorrentDelay);
        clearTimeout(this.qualityObservationTimer);
        clearTimeout(this.runAutoQualitySchedulerTimer);
        clearInterval(this.torrentInfoInterval);
        clearInterval(this.autoQualityInterval);
        // Don't need to destroy renderer, video player will be destroyed
        this.flushVideoFile(this.currentVideoFile, false);
        this.destroyFakeRenderer();
    }
    getCurrentResolutionId() {
        return this.currentVideoFile ? this.currentVideoFile.resolution.id : -1;
    }
    updateVideoFile(videoFile, options = {}, done = () => { }) {
        // Automatically choose the adapted video file
        if (!videoFile) {
            const savedAverageBandwidth = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getAverageBandwidthInStore)();
            videoFile = savedAverageBandwidth
                ? this.getAppropriateFile(savedAverageBandwidth)
                : this.pickAverageVideoFile();
        }
        if (!videoFile) {
            throw Error(`Can't update video file since videoFile is undefined.`);
        }
        // Don't add the same video file once again
        if (this.currentVideoFile !== undefined && this.currentVideoFile.magnetUri === videoFile.magnetUri) {
            return;
        }
        // Do not display error to user because we will have multiple fallback
        this.player.peertube().hideFatalError();
        // Hack to "simulate" src link in video.js >= 6
        // Without this, we can't play the video after pausing it
        // https://github.com/videojs/video.js/blob/master/src/js/player.js#L1633
        this.player.src = () => true;
        const oldPlaybackRate = this.player.playbackRate();
        const previousVideoFile = this.currentVideoFile;
        this.currentVideoFile = videoFile;
        // Don't try on iOS that does not support MediaSource
        // Or don't use P2P if webtorrent is disabled
        if ((0,_root_helpers_web_browser__WEBPACK_IMPORTED_MODULE_3__.isIOS)() || this.playerRefusedP2P) {
            return this.fallbackToHttp(options, () => {
                this.player.playbackRate(oldPlaybackRate);
                return done();
            });
        }
        this.addTorrent(this.currentVideoFile.magnetUri, previousVideoFile, options, () => {
            this.player.playbackRate(oldPlaybackRate);
            return done();
        });
        this.selectAppropriateResolution(true);
    }
    updateEngineResolution(resolutionId, delay = 0) {
        // Remember player state
        const currentTime = this.player.currentTime();
        const isPaused = this.player.paused();
        // Hide bigPlayButton
        if (!isPaused) {
            this.player.bigPlayButton.hide();
        }
        // Audio-only (resolutionId === 0) gets special treatment
        if (resolutionId === 0) {
            // Audio-only: show poster, do not auto-hide controls
            this.player.addClass('vjs-playing-audio-only-content');
            this.player.posterImage.show();
        }
        else {
            // Hide poster to have black background
            this.player.removeClass('vjs-playing-audio-only-content');
            this.player.posterImage.hide();
        }
        const newVideoFile = this.videoFiles.find(f => f.resolution.id === resolutionId);
        const options = {
            forcePlay: false,
            delay,
            seek: currentTime + (delay / 1000)
        };
        this.updateVideoFile(newVideoFile, options);
    }
    flushVideoFile(videoFile, destroyRenderer = true) {
        if (videoFile !== undefined && this.webtorrent.get(videoFile.magnetUri)) {
            if (destroyRenderer === true && this.renderer && this.renderer.destroy)
                this.renderer.destroy();
            this.webtorrent.remove(videoFile.magnetUri);
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Removed ${videoFile.magnetUri}`);
        }
    }
    disableAutoResolution() {
        this.autoResolution = false;
        this.autoResolutionPossible = false;
        this.player.peertubeResolutions().disableAutoResolution();
    }
    isAutoResolutionPossible() {
        return this.autoResolutionPossible;
    }
    getTorrent() {
        return this.torrent;
    }
    getCurrentVideoFile() {
        return this.currentVideoFile;
    }
    changeQuality(id) {
        if (id === -1) {
            if (this.autoResolutionPossible === true) {
                this.autoResolution = true;
                this.selectAppropriateResolution(false);
            }
            return;
        }
        this.autoResolution = false;
        this.updateEngineResolution(id);
        this.selectAppropriateResolution(false);
    }
    addTorrent(magnetOrTorrentUrl, previousVideoFile, options, done) {
        if (!magnetOrTorrentUrl)
            return this.fallbackToHttp(options, done);
        _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Adding ${magnetOrTorrentUrl}.`);
        const oldTorrent = this.torrent;
        const torrentOptions = {
            // Don't use arrow function: it breaks webtorrent (that uses `new` keyword)
            store: function (chunkLength, storeOpts) {
                return new CacheChunkStore(new _peertube_chunk_store__WEBPACK_IMPORTED_MODULE_7__.PeertubeChunkStore(chunkLength, storeOpts), {
                    max: 100
                });
            }
        };
        this.torrent = this.webtorrent.add(magnetOrTorrentUrl, torrentOptions, torrent => {
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Added ${magnetOrTorrentUrl}.`);
            if (oldTorrent) {
                // Pause the old torrent
                this.stopTorrent(oldTorrent);
                // We use a fake renderer so we download correct pieces of the next file
                if (options.delay)
                    this.renderFileInFakeElement(torrent.files[0], options.delay);
            }
            // Render the video in a few seconds? (on resolution change for example, we wait some seconds of the new video resolution)
            this.addTorrentDelay = setTimeout(() => {
                // We don't need the fake renderer anymore
                this.destroyFakeRenderer();
                const paused = this.player.paused();
                this.flushVideoFile(previousVideoFile);
                // Update progress bar (just for the UI), do not wait rendering
                if (options.seek)
                    this.player.currentTime(options.seek);
                const renderVideoOptions = { autoplay: false, controls: true };
                (0,_video_renderer__WEBPACK_IMPORTED_MODULE_8__.renderVideo)(torrent.files[0], this.playerElement, renderVideoOptions, (err, renderer) => {
                    this.renderer = renderer;
                    if (err)
                        return this.fallbackToHttp(options, done);
                    return this.tryToPlay(err => {
                        if (err)
                            return done(err);
                        if (options.seek)
                            this.seek(options.seek);
                        if (options.forcePlay === false && paused === true)
                            this.player.pause();
                        return done();
                    });
                });
            }, options.delay || 0);
        });
        this.torrent.on('error', (err) => _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error(err));
        this.torrent.on('warning', (err) => {
            // We don't support HTTP tracker but we don't care -> we use the web socket tracker
            if (err.message.indexOf('Unsupported tracker protocol') !== -1)
                return;
            // Users don't care about issues with WebRTC, but developers do so log it in the console
            if (err.message.indexOf('Ice connection failed') !== -1) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(err);
                return;
            }
            // Magnet hash is not up to date with the torrent file, add directly the torrent file
            if (err.message.indexOf('incorrect info hash') !== -1) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Incorrect info hash detected, falling back to torrent file.');
                const newOptions = { forcePlay: true, seek: options.seek };
                return this.addTorrent(this.torrent['xs'], previousVideoFile, newOptions, done);
            }
            // Remote instance is down
            if (err.message.indexOf('from xs param') !== -1) {
                this.handleError(err);
            }
            _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.warn(err);
        });
    }
    tryToPlay(done) {
        if (!done)
            done = function () { };
        const playPromise = this.player.play();
        if (playPromise !== undefined) {
            return playPromise.then(() => done())
                .catch((err) => {
                if (err.message.includes('The play() request was interrupted by a call to pause()')) {
                    return;
                }
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.warn(err);
                this.player.pause();
                this.player.posterImage.show();
                this.player.removeClass('vjs-has-autoplay');
                this.player.removeClass('vjs-has-big-play-button-clicked');
                this.player.removeClass('vjs-playing-audio-only-content');
                return done();
            });
        }
        return done();
    }
    seek(time) {
        this.player.currentTime(time);
        this.player.handleTechSeeked_();
    }
    getAppropriateFile(averageDownloadSpeed) {
        if (this.videoFiles === undefined)
            return undefined;
        if (this.videoFiles.length === 1)
            return this.videoFiles[0];
        const files = this.videoFiles.filter(f => f.resolution.id !== 0);
        if (files.length === 0)
            return undefined;
        // Don't change the torrent if the player ended
        if (this.torrent && this.torrent.progress === 1 && this.player.ended())
            return this.currentVideoFile;
        if (!averageDownloadSpeed)
            averageDownloadSpeed = this.getAndSaveActualDownloadSpeed();
        // Limit resolution according to player height
        const playerHeight = this.playerElement.offsetHeight;
        // We take the first resolution just above the player height
        // Example: player height is 530px, we want the 720p file instead of 480p
        let maxResolution = files[0].resolution.id;
        for (let i = files.length - 1; i >= 0; i--) {
            const resolutionId = files[i].resolution.id;
            if (resolutionId !== 0 && resolutionId >= playerHeight) {
                maxResolution = resolutionId;
                break;
            }
        }
        // Filter videos we can play according to our screen resolution and bandwidth
        const filteredFiles = files.filter(f => f.resolution.id <= maxResolution)
            .filter(f => {
            const fileBitrate = (f.size / this.videoDuration);
            let threshold = fileBitrate;
            // If this is for a higher resolution or an initial load: add a margin
            if (!this.currentVideoFile || f.resolution.id > this.currentVideoFile.resolution.id) {
                threshold += ((fileBitrate * this.CONSTANTS.AUTO_QUALITY_THRESHOLD_PERCENT) / 100);
            }
            return averageDownloadSpeed > threshold;
        });
        // If the download speed is too bad, return the lowest resolution we have
        if (filteredFiles.length === 0)
            return (0,_common__WEBPACK_IMPORTED_MODULE_6__.videoFileMinByResolution)(files);
        return (0,_common__WEBPACK_IMPORTED_MODULE_6__.videoFileMaxByResolution)(filteredFiles);
    }
    getAndSaveActualDownloadSpeed() {
        const start = Math.max(this.downloadSpeeds.length - this.CONSTANTS.BANDWIDTH_AVERAGE_NUMBER_OF_VALUES, 0);
        const lastDownloadSpeeds = this.downloadSpeeds.slice(start, this.downloadSpeeds.length);
        if (lastDownloadSpeeds.length === 0)
            return -1;
        const sum = lastDownloadSpeeds.reduce((a, b) => a + b);
        const averageBandwidth = Math.round(sum / lastDownloadSpeeds.length);
        // Save the average bandwidth for future use
        (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveAverageBandwidth)(averageBandwidth);
        return averageBandwidth;
    }
    initializePlayer() {
        this.buildQualities();
        if (this.videoFiles.length === 0) {
            this.player.addClass('disabled');
            return;
        }
        if (this.autoplay) {
            this.player.posterImage.hide();
            return this.updateVideoFile(undefined, { forcePlay: true, seek: this.startTime });
        }
        // Proxy first play
        const oldPlay = this.player.play.bind(this.player);
        this.player.play = () => {
            this.player.addClass('vjs-has-big-play-button-clicked');
            this.player.play = oldPlay;
            this.updateVideoFile(undefined, { forcePlay: true, seek: this.startTime });
        };
    }
    runAutoQualityScheduler() {
        this.autoQualityInterval = setInterval(() => {
            // Not initialized or in HTTP fallback
            if (this.torrent === undefined || this.torrent === null)
                return;
            if (this.autoResolution === false)
                return;
            if (this.isAutoResolutionObservation === true)
                return;
            const file = this.getAppropriateFile();
            let changeResolution = false;
            let changeResolutionDelay = 0;
            // Lower resolution
            if (this.isPlayerWaiting() && file.resolution.id < this.currentVideoFile.resolution.id) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Downgrading automatically the resolution to: ${file.resolution.label}`);
                changeResolution = true;
            }
            else if (file.resolution.id > this.currentVideoFile.resolution.id) { // Higher resolution
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info(`Upgrading automatically the resolution to: ${file.resolution.label}`);
                changeResolution = true;
                changeResolutionDelay = this.CONSTANTS.AUTO_QUALITY_HIGHER_RESOLUTION_DELAY;
            }
            if (changeResolution === true) {
                this.updateEngineResolution(file.resolution.id, changeResolutionDelay);
                // Wait some seconds in observation of our new resolution
                this.isAutoResolutionObservation = true;
                this.qualityObservationTimer = setTimeout(() => {
                    this.isAutoResolutionObservation = false;
                }, this.CONSTANTS.AUTO_QUALITY_OBSERVATION_TIME);
            }
        }, this.CONSTANTS.AUTO_QUALITY_SCHEDULER);
    }
    isPlayerWaiting() {
        var _a;
        return (_a = this.player) === null || _a === void 0 ? void 0 : _a.hasClass('vjs-waiting');
    }
    runTorrentInfoScheduler() {
        this.torrentInfoInterval = setInterval(() => {
            // Not initialized yet
            if (this.torrent === undefined)
                return;
            // Http fallback
            if (this.torrent === null)
                return this.player.trigger('p2pInfo', false);
            // this.webtorrent.downloadSpeed because we need to take into account the potential old torrent too
            if (this.webtorrent.downloadSpeed !== 0)
                this.downloadSpeeds.push(this.webtorrent.downloadSpeed);
            return this.player.trigger('p2pInfo', {
                source: 'webtorrent',
                http: {
                    downloadSpeed: 0,
                    uploadSpeed: 0,
                    downloaded: 0,
                    uploaded: 0
                },
                p2p: {
                    downloadSpeed: this.torrent.downloadSpeed,
                    numPeers: this.torrent.numPeers,
                    uploadSpeed: this.torrent.uploadSpeed,
                    downloaded: this.torrent.downloaded,
                    uploaded: this.torrent.uploaded
                },
                bandwidthEstimate: this.webtorrent.downloadSpeed
            });
        }, this.CONSTANTS.INFO_SCHEDULER);
    }
    fallbackToHttp(options, done) {
        const paused = this.player.paused();
        this.disableAutoResolution();
        this.flushVideoFile(this.currentVideoFile, true);
        this.torrent = null;
        // Enable error display now this is our last fallback
        this.player.one('error', () => this.player.peertube().displayFatalError());
        const httpUrl = this.currentVideoFile.fileUrl;
        this.player.src = this.savePlayerSrcFunction;
        this.player.src(httpUrl);
        this.selectAppropriateResolution(true);
        // We changed the source, so reinit captions
        this.player.trigger('sourcechange');
        return this.tryToPlay(err => {
            if (err && done)
                return done(err);
            if (options.seek)
                this.seek(options.seek);
            if (options.forcePlay === false && paused === true)
                this.player.pause();
            if (done)
                return done();
        });
    }
    handleError(err) {
        return this.player.trigger('customError', { err });
    }
    pickAverageVideoFile() {
        if (this.videoFiles.length === 1)
            return this.videoFiles[0];
        const files = this.videoFiles.filter(f => f.resolution.id !== 0);
        return files[Math.floor(files.length / 2)];
    }
    stopTorrent(torrent) {
        torrent.pause();
        // Pause does not remove actual peers (in particular the webseed peer)
        torrent.removePeer(torrent['ws']);
    }
    renderFileInFakeElement(file, delay) {
        this.destroyingFakeRenderer = false;
        const fakeVideoElem = document.createElement('video');
        (0,_video_renderer__WEBPACK_IMPORTED_MODULE_8__.renderVideo)(file, fakeVideoElem, { autoplay: false, controls: false }, (err, renderer) => {
            this.fakeRenderer = renderer;
            // The renderer returns an error when we destroy it, so skip them
            if (this.destroyingFakeRenderer === false && err) {
                _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.error('Cannot render new torrent in fake video element.', err);
            }
            // Load the future file at the correct time (in delay MS - 2 seconds)
            fakeVideoElem.currentTime = this.player.currentTime() + (delay - 2000);
        });
    }
    destroyFakeRenderer() {
        if (this.fakeRenderer) {
            this.destroyingFakeRenderer = true;
            if (this.fakeRenderer.destroy) {
                try {
                    this.fakeRenderer.destroy();
                }
                catch (err) {
                    _root_helpers_logger__WEBPACK_IMPORTED_MODULE_2__.logger.info('Cannot destroy correctly fake renderer.', err);
                }
            }
            this.fakeRenderer = undefined;
        }
    }
    buildQualities() {
        const resolutions = this.videoFiles.map(file => ({
            id: file.resolution.id,
            label: this.buildQualityLabel(file),
            height: file.resolution.id,
            selected: false,
            selectCallback: () => this.changeQuality(file.resolution.id)
        }));
        resolutions.push({
            id: -1,
            label: this.player.localize('Auto'),
            selected: true,
            selectCallback: () => this.changeQuality(-1)
        });
        this.player.peertubeResolutions().add(resolutions);
    }
    buildQualityLabel(file) {
        let label = file.resolution.label;
        if (file.fps && file.fps >= 50) {
            label += file.fps;
        }
        return label;
    }
    selectAppropriateResolution(byEngine) {
        const resolution = this.autoResolution
            ? -1
            : this.getCurrentResolutionId();
        const autoResolutionChosen = this.autoResolution
            ? this.getCurrentResolutionId()
            : undefined;
        this.player.peertubeResolutions().select({ id: resolution, autoResolutionChosenId: autoResolutionChosen, byEngine });
    }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin('webtorrent', WebTorrentPlugin);



/***/ }),

/***/ "./src/shims/http.ts":
/*!***************************!*\
  !*** ./src/shims/http.ts ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! stream-http */ "./node_modules/stream-http/index.js");


/***/ }),

/***/ "./src/shims/https.ts":
/*!****************************!*\
  !*** ./src/shims/https.ts ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! https-browserify */ "./node_modules/https-browserify/index.js");


/***/ }),

/***/ "./src/shims/noop.ts":
/*!***************************!*\
  !*** ./src/shims/noop.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NOOP": () => (/* binding */ NOOP)
/* harmony export */ });
// Does nothing. Used to shim out node.js modules
// which are no-ops in the browser.
const NOOP = 0;


/***/ }),

/***/ "./src/shims/stream.ts":
/*!*****************************!*\
  !*** ./src/shims/stream.ts ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! stream-browserify */ "./node_modules/stream-browserify/index.js");


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

/***/ "?3b18":
/*!*****************************!*\
  !*** ./get-files (ignored) ***!
  \*****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?f12c":
/*!*************************!*\
  !*** is-file (ignored) ***!
  \*************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8539":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7874":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
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

/***/ "?45bd":
/*!*************************************!*\
  !*** decompress-response (ignored) ***!
  \*************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c33b":
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?42e5":
/*!***************************************!*\
  !*** bittorrent-dht/client (ignored) ***!
  \***************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?72f0":
/*!********************************!*\
  !*** bittorrent-lsd (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8616":
/*!*****************************!*\
  !*** ./server.js (ignored) ***!
  \*****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?26b1":
/*!**************************!*\
  !*** ./utp.js (ignored) ***!
  \**************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c172":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c362":
/*!*********************!*\
  !*** net (ignored) ***!
  \*********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5efe":
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6dbd":
/*!************************!*\
  !*** ut_pex (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e6f0":
/*!************************************!*\
  !*** ./lib/conn-pool.js (ignored) ***!
  \************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?4b99":
/*!***************************************!*\
  !*** bittorrent-dht/client (ignored) ***!
  \***************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ae1e":
/*!*****************************!*\
  !*** load-ip-set (ignored) ***!
  \*****************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_assets_player_shared_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-e92bbe.chunk.js.map