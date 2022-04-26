(globalThis["webpackChunkpeertube_client"] = globalThis["webpackChunkpeertube_client"] || []).push([["src_assets_player_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-src_sh-67ecba"],{

/***/ "./src/assets/player/webtorrent/peertube-chunk-store.ts":
/*!**************************************************************!*\
  !*** ./src/assets/player/webtorrent/peertube-chunk-store.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeertubeChunkStore": () => (/* binding */ PeertubeChunkStore)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dexie */ "./node_modules/dexie/dist/dexie.mjs");
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
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

// From https://github.com/MinEduTDF/idb-chunk-store
// We use temporary IndexDB (all data are removed on destroy) to avoid RAM issues
// Thanks @santiagogil and @Feross




let ChunkDatabase = /*#__PURE__*/function (_Dexie) {
  _inherits(ChunkDatabase, _Dexie);

  var _super = _createSuper(ChunkDatabase);

  function ChunkDatabase(dbname) {
    var _this;

    _classCallCheck(this, ChunkDatabase);

    _this = _super.call(this, dbname);

    _this.version(1).stores({
      chunks: 'id'
    });

    return _this;
  }

  return _createClass(ChunkDatabase);
}(dexie__WEBPACK_IMPORTED_MODULE_1__["default"]);

let ExpirationDatabase = /*#__PURE__*/function (_Dexie2) {
  _inherits(ExpirationDatabase, _Dexie2);

  var _super2 = _createSuper(ExpirationDatabase);

  function ExpirationDatabase() {
    var _this2;

    _classCallCheck(this, ExpirationDatabase);

    _this2 = _super2.call(this, 'webtorrent-expiration');

    _this2.version(1).stores({
      databases: 'name,expiration'
    });

    return _this2;
  }

  return _createClass(ExpirationDatabase);
}(dexie__WEBPACK_IMPORTED_MODULE_1__["default"]);

let PeertubeChunkStore = /*#__PURE__*/function (_EventEmitter) {
  _inherits(PeertubeChunkStore, _EventEmitter);

  var _super3 = _createSuper(PeertubeChunkStore);

  function PeertubeChunkStore(chunkLength, opts) {
    var _this3;

    _classCallCheck(this, PeertubeChunkStore);

    _this3 = _super3.call(this);
    _this3.pendingPut = []; // If the store is full

    _this3.memoryChunks = {};
    _this3.databaseName = 'webtorrent-chunks-';
    if (!opts) opts = {};
    if (opts.torrent && opts.torrent.infoHash) _this3.databaseName += opts.torrent.infoHash;else _this3.databaseName += '-default';

    _this3.setMaxListeners(100);

    _this3.chunkLength = Number(chunkLength);
    if (!_this3.chunkLength) throw new Error('First argument must be a chunk length');
    _this3.length = Number(opts.length) || Infinity;

    if (_this3.length !== Infinity) {
      _this3.lastChunkLength = _this3.length % _this3.chunkLength || _this3.chunkLength;
      _this3.lastChunkIndex = Math.ceil(_this3.length / _this3.chunkLength) - 1;
    }

    _this3.db = new ChunkDatabase(_this3.databaseName); // Track databases that expired

    _this3.expirationDB = new ExpirationDatabase();

    _this3.runCleaner();

    return _this3;
  }

  _createClass(PeertubeChunkStore, [{
    key: "put",
    value: function put(index, buf, cb) {
      const isLastChunk = index === this.lastChunkIndex;

      if (isLastChunk && buf.length !== this.lastChunkLength) {
        return this.nextTick(cb, new Error('Last chunk length must be ' + this.lastChunkLength));
      }

      if (!isLastChunk && buf.length !== this.chunkLength) {
        return this.nextTick(cb, new Error('Chunk length must be ' + this.chunkLength));
      } // Specify we have this chunk


      this.memoryChunks[index] = true; // Add it to the pending put

      this.pendingPut.push({
        id: index,
        buf,
        cb
      }); // If it's already planned, return

      if (this.putBulkTimeout) return; // Plan a future bulk insert

      this.putBulkTimeout = setTimeout(() => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        const processing = this.pendingPut;
        this.pendingPut = [];
        this.putBulkTimeout = undefined;

        try {
          yield this.db.transaction('rw', this.db.chunks, () => {
            return this.db.chunks.bulkPut(processing.map(p => ({
              id: p.id,
              buf: p.buf
            })));
          });
        } catch (err) {
          console.log('Cannot bulk insert chunks. Store them in memory.', {
            err
          });
          processing.forEach(p => this.memoryChunks[p.id] = p.buf);
        } finally {
          processing.forEach(p => p.cb());
        }
      }), PeertubeChunkStore.BUFFERING_PUT_MS);
    }
  }, {
    key: "get",
    value: function get(index, opts, cb) {
      if (typeof opts === 'function') return this.get(index, null, opts); // IndexDB could be slow, use our memory index first

      const memoryChunk = this.memoryChunks[index];

      if (memoryChunk === undefined) {
        const err = new Error('Chunk not found');
        err['notFound'] = true;
        return process.nextTick(() => cb(err));
      } // Chunk in memory


      if (memoryChunk !== true) return cb(null, memoryChunk); // Chunk in store

      this.db.transaction('r', this.db.chunks, () => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        const result = yield this.db.chunks.get({
          id: index
        });
        if (result === undefined) return cb(null, Buffer.alloc(0));
        const buf = result.buf;
        if (!opts) return this.nextTick(cb, null, buf);
        const offset = opts.offset || 0;
        const len = opts.length || buf.length - offset;
        return cb(null, buf.slice(offset, len + offset));
      })).catch(err => {
        console.error(err);
        return cb(err);
      });
    }
  }, {
    key: "close",
    value: function close(cb) {
      return this.destroy(cb);
    }
  }, {
    key: "destroy",
    value: function destroy(cb) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
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
        } catch (err) {
          console.error('Cannot destroy peertube chunk store.', err);
          return cb(err);
        }
      });
    }
  }, {
    key: "runCleaner",
    value: function runCleaner() {
      this.checkExpiration();
      this.cleanerInterval = setInterval(() => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        this.checkExpiration();
      }), PeertubeChunkStore.CLEANER_INTERVAL_MS);
    }
  }, {
    key: "checkExpiration",
    value: function checkExpiration() {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        let databasesToDeleteInfo = [];

        try {
          yield this.expirationDB.transaction('rw', this.expirationDB.databases, () => (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            // Update our database expiration since we are alive
            yield this.expirationDB.databases.put({
              name: this.databaseName,
              expiration: new Date().getTime() + PeertubeChunkStore.CLEANER_EXPIRATION_MS
            });
            const now = new Date().getTime();
            databasesToDeleteInfo = yield this.expirationDB.databases.where('expiration').below(now).toArray();
          }));
        } catch (err) {
          console.error('Cannot update expiration of fetch expired databases.', err);
        }

        for (const databaseToDeleteInfo of databasesToDeleteInfo) {
          yield this.dropDatabase(databaseToDeleteInfo.name);
        }
      });
    }
  }, {
    key: "dropDatabase",
    value: function dropDatabase(databaseName) {
      return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        const dbToDelete = new ChunkDatabase(databaseName);
        console.log('Destroying IndexDB database %s.', databaseName);

        try {
          yield dbToDelete.delete();
          yield this.expirationDB.transaction('rw', this.expirationDB.databases, () => {
            return this.expirationDB.databases.where({
              name: databaseName
            }).delete();
          });
        } catch (err) {
          console.error('Cannot delete %s.', databaseName, err);
        }
      });
    }
  }, {
    key: "nextTick",
    value: function nextTick(cb, err, val) {
      process.nextTick(() => cb(err, val), undefined);
    }
  }]);

  return PeertubeChunkStore;
}(events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);
PeertubeChunkStore.BUFFERING_PUT_MS = 1000;
PeertubeChunkStore.CLEANER_INTERVAL_MS = 1000 * 60; // 1 minute

PeertubeChunkStore.CLEANER_EXPIRATION_MS = 1000 * 60 * 5; // 5 minutes

/***/ }),

/***/ "./src/assets/player/webtorrent/video-renderer.ts":
/*!********************************************************!*\
  !*** ./src/assets/player/webtorrent/video-renderer.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderVideo": () => (/* binding */ renderVideo)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./src/shims/path.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
// Thanks: https://github.com/feross/render-media
// TODO: use render-media once https://github.com/feross/render-media/issues/32 is fixed
const MediaElementWrapper = __webpack_require__(/*! mediasource */ "./node_modules/mediasource/index.js");



const videostream = __webpack_require__(/*! videostream */ "./node_modules/videostream/videostream.js");

const VIDEOSTREAM_EXTS = ['.m4a', '.m4v', '.mp4'];

function renderVideo(file, elem, opts, callback) {
  validateFile(file);
  return renderMedia(file, elem, opts, callback);
}

function renderMedia(file, elem, opts, callback) {
  const extension = (0,path__WEBPACK_IMPORTED_MODULE_0__.extname)(file.name).toLowerCase();
  let preparedElem;
  let currentTime = 0;
  let renderer;

  try {
    if (VIDEOSTREAM_EXTS.indexOf(extension) >= 0) {
      renderer = useVideostream();
    } else {
      renderer = useMediaSource();
    }
  } catch (err) {
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

  function useMediaSource() {
    let useVP9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const codecs = getCodec(file.name, useVP9);
    prepareElem();
    preparedElem.addEventListener('error', function onError(err) {
      preparedElem.removeEventListener('error', onError); // Try with vp9 before returning an error

      if (codecs.indexOf('vp8') !== -1) return fallbackToMediaSource(true);
      return callback(err);
    });
    preparedElem.addEventListener('loadedmetadata', onLoadStart);
    const wrapper = new MediaElementWrapper(preparedElem);
    const writable = wrapper.createWriteStream(codecs);
    file.createReadStream().pipe(writable);
    if (currentTime) preparedElem.currentTime = currentTime;
    return wrapper;
  }

  function fallbackToMediaSource() {
    let useVP9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (useVP9 === true) console.log('Falling back to media source with VP9 enabled.');else console.log('Falling back to media source..');
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
    if (opts.autoplay) preparedElem.play();
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

function getCodec(name) {
  let useVP9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const ext = (0,path__WEBPACK_IMPORTED_MODULE_0__.extname)(name).toLowerCase();

  if (ext === '.mp4') {
    return 'video/mp4; codecs="avc1.640029, mp4a.40.5"';
  }

  if (ext === '.webm') {
    if (useVP9 === true) return 'video/webm; codecs="vp9, opus"';
    return 'video/webm; codecs="vp8, vorbis"';
  }

  return undefined;
}



/***/ }),

/***/ "./src/assets/player/webtorrent/webtorrent-plugin.ts":
/*!***********************************************************!*\
  !*** ./src/assets/player/webtorrent/webtorrent-plugin.ts ***!
  \***********************************************************/
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
/* harmony import */ var _video_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video-renderer */ "./src/assets/player/webtorrent/video-renderer.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/assets/player/utils.ts");
/* harmony import */ var _peertube_chunk_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./peertube-chunk-store */ "./src/assets/player/webtorrent/peertube-chunk-store.ts");
/* harmony import */ var _peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../peertube-player-local-storage */ "./src/assets/player/peertube-player-local-storage.ts");
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








const CacheChunkStore = __webpack_require__(/*! cache-chunk-store */ "./node_modules/cache-chunk-store/index.js");

const Plugin = video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('plugin');

let WebTorrentPlugin = /*#__PURE__*/function (_Plugin) {
  _inherits(WebTorrentPlugin, _Plugin);

  var _super = _createSuper(WebTorrentPlugin);

  function WebTorrentPlugin(player, options) {
    var _this;

    _classCallCheck(this, WebTorrentPlugin);

    _this = _super.call(this, player);
    _this.autoplay = false;
    _this.startTime = 0;
    _this.CONSTANTS = {
      INFO_SCHEDULER: 1000,
      AUTO_QUALITY_SCHEDULER: 3000,
      AUTO_QUALITY_THRESHOLD_PERCENT: 30,
      AUTO_QUALITY_OBSERVATION_TIME: 10000,
      AUTO_QUALITY_HIGHER_RESOLUTION_DELAY: 5000,
      BANDWIDTH_AVERAGE_NUMBER_OF_VALUES: 5 // Last 5 seconds to build average bandwidth

    };
    _this.webtorrent = new webtorrent__WEBPACK_IMPORTED_MODULE_1__({
      tracker: {
        rtcConfig: (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRtcConfig)()
      },
      dht: false
    });
    _this.destroyingFakeRenderer = false;
    _this.autoResolution = true;
    _this.autoResolutionPossible = true;
    _this.isAutoResolutionObservation = false;
    _this.playerRefusedP2P = false;
    _this.downloadSpeeds = [];
    _this.startTime = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.timeToInt)(options.startTime); // Disable auto play on iOS

    _this.autoplay = options.autoplay;
    _this.playerRefusedP2P = !(0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getStoredP2PEnabled)();
    _this.videoFiles = options.videoFiles;
    _this.videoDuration = options.videoDuration;
    _this.savePlayerSrcFunction = _this.player.src;
    _this.playerElement = options.playerElement;

    _this.player.ready(() => {
      const playerOptions = _this.player.options_;
      /*const volume = getStoredVolume()
      if (volume !== undefined) this.player.volume(volume)
              const muted = playerOptions.muted !== undefined ? playerOptions.muted : getStoredMute()
      if (muted !== undefined) this.player.muted(muted)*/

      _this.player.duration(options.videoDuration);

      _this.initializePlayer();

      _this.runTorrentInfoScheduler();

      _this.player.one('play', () => {
        // Don't run immediately scheduler, wait some seconds the TCP connections are made
        _this.runAutoQualitySchedulerTimer = setTimeout(() => _this.runAutoQualityScheduler(), _this.CONSTANTS.AUTO_QUALITY_SCHEDULER);
      });
    });

    return _this;
  }

  _createClass(WebTorrentPlugin, [{
    key: "dispose",
    value: function dispose() {
      clearTimeout(this.addTorrentDelay);
      clearTimeout(this.qualityObservationTimer);
      clearTimeout(this.runAutoQualitySchedulerTimer);
      clearInterval(this.torrentInfoInterval);
      clearInterval(this.autoQualityInterval); // Don't need to destroy renderer, video player will be destroyed

      this.flushVideoFile(this.currentVideoFile, false);
      this.destroyFakeRenderer();
    }
  }, {
    key: "getCurrentResolutionId",
    value: function getCurrentResolutionId() {
      return this.currentVideoFile ? this.currentVideoFile.resolution.id : -1;
    }
  }, {
    key: "updateVideoFile",
    value: function updateVideoFile(videoFile) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};

      // Automatically choose the adapted video file
      if (!videoFile) {
        const savedAverageBandwidth = (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.getAverageBandwidthInStore)();
        videoFile = savedAverageBandwidth ? this.getAppropriateFile(savedAverageBandwidth) : this.pickAverageVideoFile();
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
      } // Don't add the same video file once again


      if (this.currentVideoFile !== undefined && this.currentVideoFile.magnetUri === videoFile.magnetUri) {
        return;
      } // Do not display error to user because we will have multiple fallback


      this.disableErrorDisplay(); // Hack to "simulate" src link in video.js >= 6
      // Without this, we can't play the video after pausing it
      // https://github.com/videojs/video.js/blob/master/src/js/player.js#L1633

      this.player.src = () => true;

      const oldPlaybackRate = this.player.playbackRate();
      const previousVideoFile = this.currentVideoFile;
      this.currentVideoFile = videoFile; // Don't try on iOS that does not support MediaSource
      // Or don't use P2P if webtorrent is disabled

      if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isIOS)() || this.playerRefusedP2P) {
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
      this.trigger('resolutionChange', {
        auto: this.autoResolution,
        resolutionId: this.currentVideoFile.resolution.id
      });
    }
  }, {
    key: "updateResolution",
    value: function updateResolution(resolutionId) {
      let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Remember player state
      const currentTime = this.player.currentTime();
      const isPaused = this.player.paused(); // Hide bigPlayButton

      if (!isPaused) {
        this.player.bigPlayButton.hide();
      } // Audio-only (resolutionId === 0) gets special treatment


      if (resolutionId === 0) {
        // Audio-only: show poster, do not auto-hide controls
        this.player.addClass('vjs-playing-audio-only-content');
        this.player.posterImage.show();
      } else {
        // Hide poster to have black background
        this.player.removeClass('vjs-playing-audio-only-content');
        this.player.posterImage.hide();
      }

      const newVideoFile = this.videoFiles.find(f => f.resolution.id === resolutionId);
      const options = {
        forcePlay: false,
        delay,
        seek: currentTime + delay / 1000
      };
      this.updateVideoFile(newVideoFile, options);
    }
  }, {
    key: "flushVideoFile",
    value: function flushVideoFile(videoFile) {
      let destroyRenderer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (videoFile !== undefined && this.webtorrent.get(videoFile.magnetUri)) {
        if (destroyRenderer === true && this.renderer && this.renderer.destroy) this.renderer.destroy();
        this.webtorrent.remove(videoFile.magnetUri);
      }
    }
  }, {
    key: "enableAutoResolution",
    value: function enableAutoResolution() {
      this.autoResolution = true;
      this.trigger('resolutionChange', {
        auto: this.autoResolution,
        resolutionId: this.getCurrentResolutionId()
      });
    }
  }, {
    key: "disableAutoResolution",
    value: function disableAutoResolution() {
      let forbid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (forbid === true) this.autoResolutionPossible = false;
      this.autoResolution = false;
      this.trigger('autoResolutionChange', {
        possible: this.autoResolutionPossible
      });
      this.trigger('resolutionChange', {
        auto: this.autoResolution,
        resolutionId: this.getCurrentResolutionId()
      });
    }
  }, {
    key: "isAutoResolutionPossible",
    value: function isAutoResolutionPossible() {
      return this.autoResolutionPossible;
    }
  }, {
    key: "getTorrent",
    value: function getTorrent() {
      return this.torrent;
    }
  }, {
    key: "getCurrentVideoFile",
    value: function getCurrentVideoFile() {
      return this.currentVideoFile;
    }
  }, {
    key: "addTorrent",
    value: function addTorrent(magnetOrTorrentUrl, previousVideoFile, options, done) {
      if (!magnetOrTorrentUrl) return this.fallbackToHttp(options, done);
      const oldTorrent = this.torrent;
      const torrentOptions = {
        // Don't use arrow function: it breaks webtorrent (that uses `new` keyword)
        store: function (chunkLength, storeOpts) {
          return new CacheChunkStore(new _peertube_chunk_store__WEBPACK_IMPORTED_MODULE_4__.PeertubeChunkStore(chunkLength, storeOpts), {
            max: 100
          });
        }
      };
      this.torrent = this.webtorrent.add(magnetOrTorrentUrl, torrentOptions, torrent => {
        if (oldTorrent) {
          // Pause the old torrent
          this.stopTorrent(oldTorrent); // We use a fake renderer so we download correct pieces of the next file

          if (options.delay) this.renderFileInFakeElement(torrent.files[0], options.delay);
        } // Render the video in a few seconds? (on resolution change for example, we wait some seconds of the new video resolution)


        this.addTorrentDelay = setTimeout(() => {
          // We don't need the fake renderer anymore
          this.destroyFakeRenderer();
          const paused = this.player.paused();
          this.flushVideoFile(previousVideoFile); // Update progress bar (just for the UI), do not wait rendering

          if (options.seek) this.player.currentTime(options.seek);
          const renderVideoOptions = {
            autoplay: false,
            controls: true
          };
          (0,_video_renderer__WEBPACK_IMPORTED_MODULE_2__.renderVideo)(torrent.files[0], this.playerElement, renderVideoOptions, (err, renderer) => {
            this.renderer = renderer;
            if (err) return this.fallbackToHttp(options, done); //this.playerElement.play()

            setTimeout(() => {
              return this.tryToPlay(err => {
                if (err) return done(err);
                if (options.seek) this.seek(options.seek);
                if (options.forcePlay === false && paused === true) this.player.pause();
                return done();
              });
            }, 10);
          });
        }, options.delay || 0);
      });
      this.torrent.on('error', err => console.error(err));
      this.torrent.on('warning', err => {
        //// TEMP, TO DO

        /*if (err.message.indexOf('Error connecting to wss') !== -1 || err.message.indexOf('Unsupported tracker protocol') !== -1) {
          this.fallbackToHttp(options, done)
          return
        }*/
        // We don't support HTTP tracker but we don't care -> we use the web socket tracker
        if (err.message.indexOf('Unsupported tracker protocol') !== -1) return; // Users don't care about issues with WebRTC, but developers do so log it in the console

        if (err.message.indexOf('Ice connection failed') !== -1) {
          console.log(err);
          return;
        } // Magnet hash is not up to date with the torrent file, add directly the torrent file


        if (err.message.indexOf('incorrect info hash') !== -1) {
          console.error('Incorrect info hash detected, falling back to torrent file.');
          const newOptions = {
            forcePlay: true,
            seek: options.seek
          };
          return this.addTorrent(this.torrent['xs'], previousVideoFile, newOptions, done);
        } // Remote instance is down


        if (err.message.indexOf('from xs param') !== -1) {
          this.handleError(err);
        }
      });
    }
  }, {
    key: "tryToPlay",
    value: function tryToPlay(done) {
      if (!done) done = function () {};
      const playPromise = this.player.play();

      if (playPromise !== undefined) {
        return playPromise.then(() => done()).catch(err => {
          if (err.message.indexOf('The play() request') !== -1) {
            return;
          }

          console.log("PAUSE");
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
  }, {
    key: "seek",
    value: function seek(time) {
      this.player.currentTime(time);
      this.player.handleTechSeeked_();
    }
  }, {
    key: "getAppropriateFile",
    value: function getAppropriateFile(averageDownloadSpeed) {
      if (this.videoFiles === undefined) return undefined;
      const files = this.videoFiles.filter(f => f.resolution.id !== 0);
      if (files.length === 0) return undefined;
      if (files.length === 1) return files[0]; // Don't change the torrent if the player ended

      if (this.torrent && this.torrent.progress === 1 && this.player.ended()) return this.currentVideoFile;
      if (!averageDownloadSpeed) averageDownloadSpeed = this.getAndSaveActualDownloadSpeed(); // Limit resolution according to player height

      const playerHeight = this.playerElement.offsetHeight; // We take the first resolution just above the player height
      // Example: player height is 530px, we want the 720p file instead of 480p

      let maxResolution = files[0].resolution.id;

      for (let i = files.length - 1; i >= 0; i--) {
        const resolutionId = files[i].resolution.id;

        if (resolutionId !== 0 && resolutionId >= playerHeight) {
          maxResolution = resolutionId;
          break;
        }
      } // Filter videos we can play according to our screen resolution and bandwidth


      const filteredFiles = files.filter(f => f.resolution.id <= maxResolution).filter(f => {
        const fileBitrate = f.size / this.videoDuration;
        let threshold = fileBitrate; // If this is for a higher resolution or an initial load: add a margin

        if (!this.currentVideoFile || f.resolution.id > this.currentVideoFile.resolution.id) {
          threshold += fileBitrate * this.CONSTANTS.AUTO_QUALITY_THRESHOLD_PERCENT / 100;
        }

        return averageDownloadSpeed > threshold;
      }); // If the download speed is too bad, return the lowest resolution we have

      if (filteredFiles.length === 0) return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.videoFileMinByResolution)(files);
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.videoFileMaxByResolution)(filteredFiles);
    }
  }, {
    key: "getAndSaveActualDownloadSpeed",
    value: function getAndSaveActualDownloadSpeed() {
      const start = Math.max(this.downloadSpeeds.length - this.CONSTANTS.BANDWIDTH_AVERAGE_NUMBER_OF_VALUES, 0);
      const lastDownloadSpeeds = this.downloadSpeeds.slice(start, this.downloadSpeeds.length);
      if (lastDownloadSpeeds.length === 0) return -1;
      const sum = lastDownloadSpeeds.reduce((a, b) => a + b);
      const averageBandwidth = Math.round(sum / lastDownloadSpeeds.length); // Save the average bandwidth for future use

      (0,_peertube_player_local_storage__WEBPACK_IMPORTED_MODULE_5__.saveAverageBandwidth)(averageBandwidth);
      return averageBandwidth;
    }
  }, {
    key: "initializePlayer",
    value: function initializePlayer() {
      this.buildQualities();

      if (this.autoplay) {
        this.player.posterImage.hide();
        return this.updateVideoFile(undefined, {
          forcePlay: true,
          seek: this.startTime
        });
      } // Proxy first play


      const oldPlay = this.player.play.bind(this.player);

      this.player.play = () => {
        this.player.addClass('vjs-has-big-play-button-clicked');
        this.player.play = oldPlay;
        this.updateVideoFile(undefined, {
          forcePlay: true,
          seek: this.startTime
        });
      };
    }
  }, {
    key: "runAutoQualityScheduler",
    value: function runAutoQualityScheduler() {
      this.autoQualityInterval = setInterval(() => {
        // Not initialized or in HTTP fallback
        if (this.torrent === undefined || this.torrent === null) return;
        if (this.autoResolution === false) return;
        if (this.isAutoResolutionObservation === true) return;
        const file = this.getAppropriateFile();
        let changeResolution = false;
        let changeResolutionDelay = 0; // Lower resolution

        if (this.isPlayerWaiting() && file.resolution.id < this.currentVideoFile.resolution.id) {
          changeResolution = true;
        } else if (file.resolution.id > this.currentVideoFile.resolution.id) {
          // Higher resolution
          changeResolution = true;
          changeResolutionDelay = this.CONSTANTS.AUTO_QUALITY_HIGHER_RESOLUTION_DELAY;
        }

        if (changeResolution === true) {
          this.updateResolution(file.resolution.id, changeResolutionDelay); // Wait some seconds in observation of our new resolution

          this.isAutoResolutionObservation = true;
          this.qualityObservationTimer = setTimeout(() => {
            this.isAutoResolutionObservation = false;
          }, this.CONSTANTS.AUTO_QUALITY_OBSERVATION_TIME);
        }
      }, this.CONSTANTS.AUTO_QUALITY_SCHEDULER);
    }
  }, {
    key: "isPlayerWaiting",
    value: function isPlayerWaiting() {
      return this.player && this.player.hasClass('vjs-waiting');
    }
  }, {
    key: "runTorrentInfoScheduler",
    value: function runTorrentInfoScheduler() {
      this.torrentInfoInterval = setInterval(() => {
        // Not initialized yet
        if (this.torrent === undefined) return; // Http fallback

        if (this.torrent === null) return this.player.trigger('p2pInfo', false); // this.webtorrent.downloadSpeed because we need to take into account the potential old torrent too

        if (this.webtorrent.downloadSpeed !== 0) this.downloadSpeeds.push(this.webtorrent.downloadSpeed);
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
  }, {
    key: "fallbackToHttp",
    value: function fallbackToHttp(options, done) {
      const paused = this.player.paused();
      this.disableAutoResolution(true);
      this.flushVideoFile(this.currentVideoFile, true);
      this.torrent = null; // Enable error display now this is our last fallback

      this.player.one('error', () => this.enableErrorDisplay());
      const httpUrl = this.currentVideoFile.fileUrl;
      this.player.src = this.savePlayerSrcFunction;
      this.player.src(httpUrl);
      this.changeQuality(); // We changed the source, so reinit captions

      this.player.trigger('sourcechange');
      return this.tryToPlay(err => {
        if (err && done) return done(err);
        if (options.seek) this.seek(options.seek);

        if (options.forcePlay === false && paused === true) {
          console.log("PLAUSE");
          this.player.pause();
        }

        if (done) return done();
      });
    }
  }, {
    key: "handleError",
    value: function handleError(err) {
      return this.player.trigger('customError', {
        err
      });
    }
  }, {
    key: "enableErrorDisplay",
    value: function enableErrorDisplay() {
      this.player.addClass('vjs-error-display-enabled');
    }
  }, {
    key: "disableErrorDisplay",
    value: function disableErrorDisplay() {
      this.player.removeClass('vjs-error-display-enabled');
    }
  }, {
    key: "pickAverageVideoFile",
    value: function pickAverageVideoFile() {
      if (this.videoFiles.length === 1) return this.videoFiles[0];
      return this.videoFiles[Math.floor(this.videoFiles.length / 2)];
    }
  }, {
    key: "stopTorrent",
    value: function stopTorrent(torrent) {
      torrent.pause(); // Pause does not remove actual peers (in particular the webseed peer)

      torrent.removePeer(torrent['ws']);
    }
  }, {
    key: "renderFileInFakeElement",
    value: function renderFileInFakeElement(file, delay) {
      this.destroyingFakeRenderer = false;
      const fakeVideoElem = document.createElement('video');
      (0,_video_renderer__WEBPACK_IMPORTED_MODULE_2__.renderVideo)(file, fakeVideoElem, {
        autoplay: false,
        controls: false
      }, (err, renderer) => {
        this.fakeRenderer = renderer; // The renderer returns an error when we destroy it, so skip them

        if (this.destroyingFakeRenderer === false && err) {
          console.error('Cannot render new torrent in fake video element.', err);
        } // Load the future file at the correct time (in delay MS - 2 seconds)


        fakeVideoElem.currentTime = this.player.currentTime() + (delay - 2000);
      });
    }
  }, {
    key: "destroyFakeRenderer",
    value: function destroyFakeRenderer() {
      if (this.fakeRenderer) {
        this.destroyingFakeRenderer = true;

        if (this.fakeRenderer.destroy) {
          try {
            this.fakeRenderer.destroy();
          } catch (err) {
            console.log('Cannot destroy correctly fake renderer.', err);
          }
        }

        this.fakeRenderer = undefined;
      }
    }
  }, {
    key: "buildQualities",
    value: function buildQualities() {
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
        qualitySwitchCallback: d => this.qualitySwitchCallback(d),
        qualityData: {
          video: qualityLevelsPayload
        }
      };
      this.player.tech(true).trigger('loadedqualitydata', payload);
    }
  }, {
    key: "buildQualityLabel",
    value: function buildQualityLabel(file) {
      let label = file.resolution.label;

      if (file.fps && file.fps >= 50) {
        label += file.fps;
      }

      return label;
    }
  }, {
    key: "qualitySwitchCallback",
    value: function qualitySwitchCallback(id) {
      if (id === -1) {
        if (this.autoResolutionPossible === true) this.enableAutoResolution();
        return;
      }

      this.disableAutoResolution();
      this.updateResolution(id);
    }
  }, {
    key: "changeQuality",
    value: function changeQuality() {
      const resolutionId = this.currentVideoFile.resolution.id;
      const qualityLevels = this.player.qualityLevels();
      /*if (resolutionId === -1) {
        qualityLevels.selectedIndex = -1
        return
      }*/

      for (let i = 0; i < qualityLevels.length; i++) {
        const q = qualityLevels[i];
        if (q.height === resolutionId) qualityLevels.selectedIndex_ = i;
      }
    }
  }]);

  return WebTorrentPlugin;
}(Plugin);

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

/***/ "?ea49":
/*!**************************!*\
  !*** ./server (ignored) ***!
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

/***/ "?7dea":
/*!****************************!*\
  !*** utp-native (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6e41":
/*!*********************************!*\
  !*** ./lib/conn-pool (ignored) ***!
  \*********************************/
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
//# sourceMappingURL=src_assets_player_webtorrent_webtorrent-plugin_ts-src_shims_http_ts-src_shims_https_ts-src_sh-67ecba.chunk.js.map