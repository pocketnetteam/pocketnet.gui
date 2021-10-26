(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ 338:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 340:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 357:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 360:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 362:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 377:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 380:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 383:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 384:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 386:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 388:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 410:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 415:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 417:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 434:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 435:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 439:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 442:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 470:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 486:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 497:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 499:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeertubeChunkStore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(159);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(508);
// From https://github.com/MinEduTDF/idb-chunk-store
// We use temporary IndexDB (all data are removed on destroy) to avoid RAM issues
// Thanks @santiagogil and @Feross



class ChunkDatabase extends dexie__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] {
    constructor(dbname) {
        super(dbname);
        this.version(1).stores({
            chunks: 'id'
        });
    }
}
class ExpirationDatabase extends dexie__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] {
    constructor() {
        super('webtorrent-expiration');
        this.version(1).stores({
            databases: 'name,expiration'
        });
    }
}
class PeertubeChunkStore extends events__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"] {
    constructor(chunkLength, opts) {
        super();
        this.pendingPut = [];
        // If the store is full
        this.memoryChunks = {};
        this.databaseName = 'webtorrent-chunks-';
        if (!opts)
            opts = {};
        if (opts.torrent && opts.torrent.infoHash)
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
        this.putBulkTimeout = setTimeout(() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
            const processing = this.pendingPut;
            this.pendingPut = [];
            this.putBulkTimeout = undefined;
            try {
                yield this.db.transaction('rw', this.db.chunks, () => {
                    return this.db.chunks.bulkPut(processing.map(p => ({ id: p.id, buf: p.buf })));
                });
            }
            catch (err) {
                console.log('Cannot bulk insert chunks. Store them in memory.', { err });
                processing.forEach(p => this.memoryChunks[p.id] = p.buf);
            }
            finally {
                processing.forEach(p => p.cb());
            }
        }), PeertubeChunkStore.BUFFERING_PUT_MS);
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
        this.db.transaction('r', this.db.chunks, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
            const result = yield this.db.chunks.get({ id: index });
            if (result === undefined)
                return cb(null, Buffer.alloc(0));
            const buf = result.buf;
            if (!opts)
                return this.nextTick(cb, null, buf);
            const offset = opts.offset || 0;
            const len = opts.length || (buf.length - offset);
            return cb(null, buf.slice(offset, len + offset));
        }))
            .catch(err => {
            console.error(err);
            return cb(err);
        });
    }
    close(cb) {
        return this.destroy(cb);
    }
    destroy(cb) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
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
                    yield this.dropDatabase(this.databaseName);
                }
                if (this.expirationDB) {
                    this.expirationDB.close();
                    this.expirationDB = null;
                }
                return cb();
            }
            catch (err) {
                console.error('Cannot destroy peertube chunk store.', err);
                return cb(err);
            }
        });
    }
    runCleaner() {
        this.checkExpiration();
        this.cleanerInterval = setInterval(() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
            this.checkExpiration();
        }), PeertubeChunkStore.CLEANER_INTERVAL_MS);
    }
    checkExpiration() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
            let databasesToDeleteInfo = [];
            try {
                yield this.expirationDB.transaction('rw', this.expirationDB.databases, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
                    // Update our database expiration since we are alive
                    yield this.expirationDB.databases.put({
                        name: this.databaseName,
                        expiration: new Date().getTime() + PeertubeChunkStore.CLEANER_EXPIRATION_MS
                    });
                    const now = new Date().getTime();
                    databasesToDeleteInfo = yield this.expirationDB.databases.where('expiration').below(now).toArray();
                }));
            }
            catch (err) {
                console.error('Cannot update expiration of fetch expired databases.', err);
            }
            for (const databaseToDeleteInfo of databasesToDeleteInfo) {
                yield this.dropDatabase(databaseToDeleteInfo.name);
            }
        });
    }
    dropDatabase(databaseName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __awaiter */ "a"])(this, void 0, void 0, function* () {
            const dbToDelete = new ChunkDatabase(databaseName);
            console.log('Destroying IndexDB database %s.', databaseName);
            try {
                yield dbToDelete.delete();
                yield this.expirationDB.transaction('rw', this.expirationDB.databases, () => {
                    return this.expirationDB.databases.where({ name: databaseName }).delete();
                });
            }
            catch (err) {
                console.error('Cannot delete %s.', databaseName, err);
            }
        });
    }
    nextTick(cb, err, val) {
        process.nextTick(() => cb(err, val), undefined);
    }
}
PeertubeChunkStore.BUFFERING_PUT_MS = 1000;
PeertubeChunkStore.CLEANER_INTERVAL_MS = 1000 * 60; // 1 minute
PeertubeChunkStore.CLEANER_EXPIRATION_MS = 1000 * 60 * 5; // 5 minutes

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74), __webpack_require__(73).Buffer))

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "WebTorrentPlugin", function() { return /* binding */ webtorrent_plugin_WebTorrentPlugin; });

// EXTERNAL MODULE: ./node_modules/video.js/core.js
var core = __webpack_require__(0);
var core_default = /*#__PURE__*/__webpack_require__.n(core);

// EXTERNAL MODULE: ./node_modules/webtorrent/index.js
var webtorrent = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/node-libs-browser/node_modules/path-browserify/index.js
var path_browserify = __webpack_require__(22);

// CONCATENATED MODULE: ./src/assets/player/webtorrent/video-renderer.ts
// Thanks: https://github.com/feross/render-media
// TODO: use render-media once https://github.com/feross/render-media/issues/32 is fixed
const MediaElementWrapper = __webpack_require__(214);

const videostream = __webpack_require__(307);
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
    const extension = Object(path_browserify["extname"])(file.name).toLowerCase();
    let preparedElem;
    let currentTime = 0;
    let renderer;
    try {
        if (VIDEOSTREAM_EXTS.indexOf(extension) >= 0) {
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
        preparedElem.addEventListener('loadedmetadata', onLoadStart);
        return new videostream(file, preparedElem);
    }
    function useMediaSource(useVP9 = false) {
        const codecs = getCodec(file.name, useVP9);
        prepareElem();
        preparedElem.addEventListener('error', function onError(err) {
            preparedElem.removeEventListener('error', onError);
            // Try with vp9 before returning an error
            if (codecs.indexOf('vp8') !== -1)
                return fallbackToMediaSource(true);
            return callback(err);
        });
        preparedElem.addEventListener('loadedmetadata', onLoadStart);
        const wrapper = new MediaElementWrapper(preparedElem);
        const writable = wrapper.createWriteStream(codecs);
        file.createReadStream().pipe(writable);
        if (currentTime)
            preparedElem.currentTime = currentTime;
        return wrapper;
    }
    function fallbackToMediaSource(useVP9 = false) {
        if (useVP9 === true)
            console.log('Falling back to media source with VP9 enabled.');
        else
            console.log('Falling back to media source..');
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
        preparedElem.removeEventListener('loadedmetadata', onLoadStart);
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
    const ext = Object(path_browserify["extname"])(name).toLowerCase();
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


// EXTERNAL MODULE: ./src/assets/player/utils.ts + 3 modules
var utils = __webpack_require__(3);

// EXTERNAL MODULE: ./src/assets/player/webtorrent/peertube-chunk-store.ts
var peertube_chunk_store = __webpack_require__(507);

// EXTERNAL MODULE: ./src/assets/player/peertube-player-local-storage.ts
var peertube_player_local_storage = __webpack_require__(12);

// CONCATENATED MODULE: ./src/assets/player/webtorrent/webtorrent-plugin.ts






const CacheChunkStore = __webpack_require__(509);
const Plugin = core_default.a.getPlugin('plugin');
class webtorrent_plugin_WebTorrentPlugin extends Plugin {
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
        this.webtorrent = new webtorrent({
            tracker: {
                rtcConfig: Object(utils["d" /* getRtcConfig */])()
            },
            dht: false
        });
        this.destroyingFakeRenderer = false;
        this.autoResolution = true;
        this.autoResolutionPossible = true;
        this.isAutoResolutionObservation = false;
        this.playerRefusedP2P = false;
        this.downloadSpeeds = [];
        this.startTime = Object(utils["j" /* timeToInt */])(options.startTime);
        // Disable auto play on iOS
        this.autoplay = options.autoplay;
        this.playerRefusedP2P = !Object(peertube_player_local_storage["c" /* getStoredP2PEnabled */])();
        this.videoFiles = options.videoFiles;
        this.videoDuration = options.videoDuration;
        this.savePlayerSrcFunction = this.player.src;
        this.playerElement = options.playerElement;
        this.player.ready(() => {
            const playerOptions = this.player.options_;
            /*const volume = getStoredVolume()
            if (volume !== undefined) this.player.volume(volume)
      
            const muted = playerOptions.muted !== undefined ? playerOptions.muted : getStoredMute()
            if (muted !== undefined) this.player.muted(muted)*/
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
            const savedAverageBandwidth = Object(peertube_player_local_storage["a" /* getAverageBandwidthInStore */])();
            videoFile = savedAverageBandwidth
                ? this.getAppropriateFile(savedAverageBandwidth)
                : this.pickAverageVideoFile();
        }
        if (!videoFile) {
            throw Error(`Can't update video file since videoFile is undefined.`);
            /*
      
            const error: { message: string, code?: number } = {
              message: "Can't update video file since videoFile is undefined."
            }
      
            this.player.tech(true).error = () => error as any
            this.player.tech(true).trigger('error')
      
            return
      
      
            */
        }
        // Don't add the same video file once again
        if (this.currentVideoFile !== undefined && this.currentVideoFile.magnetUri === videoFile.magnetUri) {
            return;
        }
        // Do not display error to user because we will have multiple fallback
        this.disableErrorDisplay();
        // Hack to "simulate" src link in video.js >= 6
        // Without this, we can't play the video after pausing it
        // https://github.com/videojs/video.js/blob/master/src/js/player.js#L1633
        this.player.src = () => true;
        const oldPlaybackRate = this.player.playbackRate();
        const previousVideoFile = this.currentVideoFile;
        this.currentVideoFile = videoFile;
        // Don't try on iOS that does not support MediaSource
        // Or don't use P2P if webtorrent is disabled
        if (Object(utils["f" /* isIOS */])() || this.playerRefusedP2P) {
            return this.fallbackToHttp(options, () => {
                this.player.playbackRate(oldPlaybackRate);
                return done();
            });
        }
        this.addTorrent(this.currentVideoFile.magnetUri, previousVideoFile, options, () => {
            this.player.playbackRate(oldPlaybackRate);
            return done();
        });
        this.changeQuality();
        this.trigger('resolutionChange', { auto: this.autoResolution, resolutionId: this.currentVideoFile.resolution.id });
    }
    updateResolution(resolutionId, delay = 0) {
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
        }
    }
    enableAutoResolution() {
        this.autoResolution = true;
        this.trigger('resolutionChange', { auto: this.autoResolution, resolutionId: this.getCurrentResolutionId() });
    }
    disableAutoResolution(forbid = false) {
        if (forbid === true)
            this.autoResolutionPossible = false;
        this.autoResolution = false;
        this.trigger('autoResolutionChange', { possible: this.autoResolutionPossible });
        this.trigger('resolutionChange', { auto: this.autoResolution, resolutionId: this.getCurrentResolutionId() });
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
    addTorrent(magnetOrTorrentUrl, previousVideoFile, options, done) {
        if (!magnetOrTorrentUrl)
            return this.fallbackToHttp(options, done);
        const oldTorrent = this.torrent;
        const torrentOptions = {
            // Don't use arrow function: it breaks webtorrent (that uses `new` keyword)
            store: function (chunkLength, storeOpts) {
                return new CacheChunkStore(new peertube_chunk_store["a" /* PeertubeChunkStore */](chunkLength, storeOpts), {
                    max: 100
                });
            }
        };
        this.torrent = this.webtorrent.add(magnetOrTorrentUrl, torrentOptions, torrent => {
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
                renderVideo(torrent.files[0], this.playerElement, renderVideoOptions, (err, renderer) => {
                    this.renderer = renderer;
                    if (err)
                        return this.fallbackToHttp(options, done);
                    //this.playerElement.play()
                    setTimeout(() => {
                        return this.tryToPlay(err => {
                            if (err)
                                return done(err);
                            if (options.seek)
                                this.seek(options.seek);
                            if (options.forcePlay === false && paused === true)
                                this.player.pause();
                            return done();
                        });
                    }, 10);
                });
            }, options.delay || 0);
        });
        this.torrent.on('error', (err) => console.error(err));
        this.torrent.on('warning', (err) => {
            //// TEMP, TO DO
            /*if (err.message.indexOf('Error connecting to wss') !== -1 || err.message.indexOf('Unsupported tracker protocol') !== -1) {
              this.fallbackToHttp(options, done)
              return
            }*/
            // We don't support HTTP tracker but we don't care -> we use the web socket tracker
            if (err.message.indexOf('Unsupported tracker protocol') !== -1)
                return;
            // Users don't care about issues with WebRTC, but developers do so log it in the console
            if (err.message.indexOf('Ice connection failed') !== -1) {
                console.log(err);
                return;
            }
            // Magnet hash is not up to date with the torrent file, add directly the torrent file
            if (err.message.indexOf('incorrect info hash') !== -1) {
                console.error('Incorrect info hash detected, falling back to torrent file.');
                const newOptions = { forcePlay: true, seek: options.seek };
                return this.addTorrent(this.torrent['xs'], previousVideoFile, newOptions, done);
            }
            // Remote instance is down
            if (err.message.indexOf('from xs param') !== -1) {
                this.handleError(err);
            }
        });
    }
    tryToPlay(done) {
        if (!done)
            done = function () { };
        const playPromise = this.player.play();
        if (playPromise !== undefined) {
            return playPromise.then(() => done()).catch((err) => {
                if (err.message.indexOf('The play() request') !== -1) {
                    return;
                }
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
        const files = this.videoFiles.filter(f => f.resolution.id !== 0);
        if (files.length === 0)
            return undefined;
        if (files.length === 1)
            return files[0];
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
            return Object(utils["m" /* videoFileMinByResolution */])(files);
        return Object(utils["l" /* videoFileMaxByResolution */])(filteredFiles);
    }
    getAndSaveActualDownloadSpeed() {
        const start = Math.max(this.downloadSpeeds.length - this.CONSTANTS.BANDWIDTH_AVERAGE_NUMBER_OF_VALUES, 0);
        const lastDownloadSpeeds = this.downloadSpeeds.slice(start, this.downloadSpeeds.length);
        if (lastDownloadSpeeds.length === 0)
            return -1;
        const sum = lastDownloadSpeeds.reduce((a, b) => a + b);
        const averageBandwidth = Math.round(sum / lastDownloadSpeeds.length);
        // Save the average bandwidth for future use
        Object(peertube_player_local_storage["e" /* saveAverageBandwidth */])(averageBandwidth);
        return averageBandwidth;
    }
    initializePlayer() {
        this.buildQualities();
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
                changeResolution = true;
            }
            else if (file.resolution.id > this.currentVideoFile.resolution.id) { // Higher resolution
                changeResolution = true;
                changeResolutionDelay = this.CONSTANTS.AUTO_QUALITY_HIGHER_RESOLUTION_DELAY;
            }
            if (changeResolution === true) {
                this.updateResolution(file.resolution.id, changeResolutionDelay);
                // Wait some seconds in observation of our new resolution
                this.isAutoResolutionObservation = true;
                this.qualityObservationTimer = setTimeout(() => {
                    this.isAutoResolutionObservation = false;
                }, this.CONSTANTS.AUTO_QUALITY_OBSERVATION_TIME);
            }
        }, this.CONSTANTS.AUTO_QUALITY_SCHEDULER);
    }
    isPlayerWaiting() {
        return this.player && this.player.hasClass('vjs-waiting');
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
                }
            });
        }, this.CONSTANTS.INFO_SCHEDULER);
    }
    fallbackToHttp(options, done) {
        const paused = this.player.paused();
        this.disableAutoResolution(true);
        this.flushVideoFile(this.currentVideoFile, true);
        this.torrent = null;
        // Enable error display now this is our last fallback
        this.player.one('error', () => this.enableErrorDisplay());
        const httpUrl = this.currentVideoFile.fileUrl;
        this.player.src = this.savePlayerSrcFunction;
        this.player.src(httpUrl);
        this.changeQuality();
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
    enableErrorDisplay() {
        this.player.addClass('vjs-error-display-enabled');
    }
    disableErrorDisplay() {
        this.player.removeClass('vjs-error-display-enabled');
    }
    pickAverageVideoFile() {
        if (this.videoFiles.length === 1)
            return this.videoFiles[0];
        return this.videoFiles[Math.floor(this.videoFiles.length / 2)];
    }
    stopTorrent(torrent) {
        torrent.pause();
        // Pause does not remove actual peers (in particular the webseed peer)
        torrent.removePeer(torrent['ws']);
    }
    renderFileInFakeElement(file, delay) {
        this.destroyingFakeRenderer = false;
        const fakeVideoElem = document.createElement('video');
        renderVideo(file, fakeVideoElem, { autoplay: false, controls: false }, (err, renderer) => {
            this.fakeRenderer = renderer;
            // The renderer returns an error when we destroy it, so skip them
            if (this.destroyingFakeRenderer === false && err) {
                console.error('Cannot render new torrent in fake video element.', err);
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
                    console.log('Cannot destroy correctly fake renderer.', err);
                }
            }
            this.fakeRenderer = undefined;
        }
    }
    buildQualities() {
        const qualityLevelsPayload = [];
        for (const file of this.videoFiles) {
            const representation = {
                id: file.resolution.id,
                label: this.buildQualityLabel(file),
                height: file.resolution.id,
                _enabled: true
            };
            this.player.qualityLevels().addQualityLevel(representation);
            qualityLevelsPayload.push({
                id: representation.id,
                label: representation.label,
                selected: false
            });
        }
        const payload = {
            qualitySwitchCallback: (d) => this.qualitySwitchCallback(d),
            qualityData: {
                video: qualityLevelsPayload
            }
        };
        this.player.tech(true).trigger('loadedqualitydata', payload);
    }
    buildQualityLabel(file) {
        let label = file.resolution.label;
        if (file.fps && file.fps >= 50) {
            label += file.fps;
        }
        return label;
    }
    qualitySwitchCallback(id) {
        if (id === -1) {
            if (this.autoResolutionPossible === true)
                this.enableAutoResolution();
            return;
        }
        this.disableAutoResolution();
        this.updateResolution(id);
    }
    changeQuality() {
        const resolutionId = this.currentVideoFile.resolution.id;
        const qualityLevels = this.player.qualityLevels();
        if (resolutionId === -1) {
            qualityLevels.selectedIndex = -1;
            return;
        }
        for (let i = 0; i < qualityLevels.length; i++) {
            const q = qualityLevels[i];
            if (q.height === resolutionId)
                qualityLevels.selectedIndex_ = i;
        }
    }
}
core_default.a.registerPlugin('webtorrent', webtorrent_plugin_WebTorrentPlugin);



/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map