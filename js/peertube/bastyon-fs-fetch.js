"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.bastyonFsFetchBridge = exports.bastyonFsFetchFactory = void 0;
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
function bastyonFsFetchFactory(electronIpcRenderer, shareId) {
    return __awaiter(this, void 0, void 0, function () {
        function fsFetch(input, init) {
            if (init === void 0) { init = defaultInit; }
            return __awaiter(this, void 0, void 0, function () {
                var url, range, readKill, rangeStr, fileStatsPromise, fileStats, fetchId, readStream, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (input instanceof Request) {
                                throw Error("Bastyon FS Fetch doesn't support Request objects");
                            }
                            if (init.method && init.method !== 'GET') {
                                throw Error("Bastyon FS Fetch supports only GET method");
                            }
                            if (init.headers && !(init.headers instanceof Headers)) {
                                throw Error("Bastyon FS Fetch supports only headers as Headers object");
                            }
                            url = input;
                            if (init.headers instanceof Headers && init.headers.has('Range')) {
                                rangeStr = init.headers.get('Range');
                                range = rangeStr
                                    .match(/\d+/g)
                                    .map(Number.parseFloat);
                            }
                            if (init.signal) {
                                readKill = init.signal;
                            }
                            fileStatsPromise = electronIpcRenderer.invoke('BastyonFsFetch : FileStats', shareId, url, range);
                            fileStatsPromise["catch"](function (err) {
                                if (err.message === 'NO_FILE') {
                                    // console.log('Requested file that does not exist');
                                }
                            });
                            return [4 /*yield*/, fileStatsPromise];
                        case 1:
                            fileStats = _a.sent();
                            return [4 /*yield*/, electronIpcRenderer.invoke('BastyonFsFetch : GetFile', shareId, url, range)];
                        case 2:
                            fetchId = _a.sent();
                            readStream = new ReadableStream({
                                start: function (controller) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (readKill) {
                                                readKill.onabort = function () {
                                                    electronIpcRenderer.send("BastyonFsFetch : ".concat(fetchId, " : Abort"));
                                                    controller.close();
                                                };
                                            }
                                            electronIpcRenderer.on("BastyonFsFetch : ".concat(fetchId, " : Progress"), function (event, data) {
                                                var chunkUint8 = new Uint8Array(data.buffer);
                                                controller.enqueue(chunkUint8);
                                            });
                                            electronIpcRenderer.once("BastyonFsFetch : ".concat(fetchId, " : Close"), function (event) {
                                                controller.close();
                                            });
                                            electronIpcRenderer.once("BastyonFsFetch : ".concat(fetchId, " : Error"), function (event, err) {
                                                controller.error(err);
                                            });
                                            return [2 /*return*/];
                                        });
                                    });
                                }
                            });
                            response = new Response(readStream);
                            Object.defineProperty(response, "url", { value: url });
                            response.headers.append('Content-Length', "".concat(fileStats.size));
                            return [2 /*return*/, response];
                    }
                });
            });
        }
        var defaultInit;
        return __generator(this, function (_a) {
            defaultInit = {
                method: 'GET'
            };
            return [2 /*return*/, function (input, init) { return fsFetch(input, init); }];
        });
    });
}
exports.bastyonFsFetchFactory = bastyonFsFetchFactory;
function bastyonFsFetchBridge(electronIpcMain, appPath) {
    return __awaiter(this, void 0, void 0, function () {
        function urlToFsPath(url, shareId, range) {
            var isPlaylist = url.endsWith('.m3u8');
            var isFragment = url.endsWith('.mp4');
            var urlSplits = url.split('/');
            var videoId = urlSplits[urlSplits.length - 2];
            var filePath;
            if (isPlaylist) {
                filePath = "".concat(shareId, "/videos/").concat(videoId, "/playlist.m3u8");
            }
            if (isFragment && range) {
                filePath = "".concat(shareId, "/videos/").concat(videoId, "/fragment_").concat(range[0], "-").concat(range[1], ".mp4");
            }
            return path.normalize("".concat(appPath, "/posts/").concat(filePath));
        }
        return __generator(this, function (_a) {
            electronIpcMain.handle('BastyonFsFetch : FileStats', function (event, shareId, url, range) {
                var filePath = urlToFsPath(url, shareId, range);
                if (!fs.existsSync(filePath)) {
                    throw Error('NO_FILE');
                }
                var fileStats = fs.statSync(filePath);
                return fileStats;
            });
            electronIpcMain.handle('BastyonFsFetch : GetFile', function (event, shareId, url, range) {
                var fetchId = crypto.randomBytes(5).toString('hex');
                var filePath = urlToFsPath(url, shareId, range);
                var readStream = fs.createReadStream(filePath);
                var fileStats = fs.statSync(filePath);
                var fileSize = fileStats.size;
                readStream.on('data', function (fragment) {
                    event.sender.send("BastyonFsFetch : ".concat(fetchId, " : Progress"), fragment);
                });
                readStream.once('close', function () {
                    if (readStream.bytesRead !== fileSize) {
                        event.sender.send("BastyonFsFetch : ".concat(fetchId, " : Error"), Error('Unhandled file read error'));
                        return;
                    }
                    event.sender.send("BastyonFsFetch : ".concat(fetchId, " : Close"));
                });
                readStream.once('error', function (err) {
                    event.sender.send("BastyonFsFetch : ".concat(fetchId, " : Error"), err);
                });
                electronIpcMain.once("BastyonFsFetch : ".concat(fetchId, " : Abort"), function (event) {
                    readStream.close();
                });
                return fetchId;
            });
            return [2 /*return*/];
        });
    });
}
exports.bastyonFsFetchBridge = bastyonFsFetchBridge;
