"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ProxifiedFetchBridge = exports.proxifiedFetchFactory = void 0;
var getRequestId = function () {
    var rand = Math.random();
    var min = 0x100000;
    var max = 0xFFFFFF - min;
    var randHex = Math.floor(rand * max + min).toString(16);
    var dateHex = Date.now().toString(16);
    return randHex + dateHex;
};
function proxifiedFetchFactory(electronIpcRenderer) {
    var defaultInit = {
        method: 'GET'
    };
    function profixiedFetch(input, init) {
        if (init === void 0) { init = defaultInit; }
        return __awaiter(this, void 0, void 0, function () {
            var preparedInit, id, url, fetchCancel;
            return __generator(this, function (_a) {
                console.log('PROXIFIED FETCH TO', input, init);
                preparedInit = {};
                preparedInit.headers = {};
                if (input instanceof Request) {
                    input.headers.forEach(function (value, name) {
                        preparedInit.headers[name] = value;
                    });
                    throw Error('Bastyon Proxified Fetch does not support Request objects');
                }
                if (init.method) {
                    preparedInit.method = init.method;
                }
                if (init.headers && !(init.headers instanceof Headers)) {
                    preparedInit.headers = init.headers;
                }
                if (init.body) {
                    if (typeof init.body !== 'string') {
                        throw Error('Bastyon Proxified Fetch does support only String Body');
                    }
                    preparedInit.body = init.body;
                }
                id = getRequestId();
                url = input;
                if (init.signal) {
                    fetchCancel = init.signal;
                }
                if (init.headers instanceof Headers) {
                    init.headers.forEach(function (value, name) {
                        preparedInit.headers[name] = value;
                    });
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var readStream = new ReadableStream({
                            start: function (controller) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var closed;
                                    return __generator(this, function (_a) {
                                        closed = false;
                                        if (fetchCancel) {
                                            fetchCancel.onabort = function () {
                                                electronIpcRenderer.removeAllListeners("ProxifiedFetch : InitialData[".concat(id, "]"));
                                                electronIpcRenderer.removeAllListeners("ProxifiedFetch : PartialResponse[".concat(id, "]"));
                                                if (!closed) {
                                                    electronIpcRenderer.send('ProxifiedFetch : Abort', id);
                                                    controller.close();
                                                    closed = true;
                                                }
                                            };
                                        }
                                        electronIpcRenderer.once("ProxifiedFetch : Closed[".concat(id, "]"), function (event) {
                                            electronIpcRenderer.removeAllListeners("ProxifiedFetch : InitialData[".concat(id, "]"));
                                            electronIpcRenderer.removeAllListeners("ProxifiedFetch : PartialResponse[".concat(id, "]"));
                                            if (!closed) {
                                                controller.close();
                                                closed = true;
                                            }
                                        });
                                        electronIpcRenderer.once("ProxifiedFetch : Error[".concat(id, "]"), function (event) {
                                            if (!closed) {
                                                controller.error('PROXIFIED_FETCH_ERROR');
                                                closed = true;
                                                var err = new TypeError('Failed to fetch');
                                                reject(err);
                                            }
                                        });
                                        electronIpcRenderer.on("ProxifiedFetch : PartialResponse[".concat(id, "]"), function (event, data) {
                                            /**
                                             * FIXME:
                                             *  Strange issue found. Somewhere Uint8Array.buffer was replaced
                                             *  what produces invalid data in ArrayBuffer analog of object.
                                             *  Must not be trusted, so using destructuring to get the
                                             *  correct one buffer.
                                             */
                                            // @ts-ignore
                                            data = new Uint8Array(__spreadArray([], data, true));
                                            var chunkUint8 = new Uint8Array(data.buffer);
                                            controller.enqueue(chunkUint8);
                                            electronIpcRenderer.send("ProxifiedFetch : ReceivedResponse[".concat(id, "]"));
                                        });
                                        return [2 /*return*/];
                                    });
                                });
                            }
                        });
                        electronIpcRenderer.on("ProxifiedFetch : InitialData[".concat(id, "]"), function (event, initialData) {
                            var response = new Response(readStream, initialData);
                            Object.defineProperty(response, 'url', { value: url });
                            var responseData = { url: response.url };
                            response.headers.forEach(function (value, name) {
                                responseData[name] = value;
                            });
                            console.table(responseData);
                            console.log(response);
                            resolve(response);
                        });
                        try {
                            electronIpcRenderer.send('ProxifiedFetch : Request', id, url, preparedInit);
                        }
                        catch (e) {
                            throw Error('ProxifiedFetch : Request -  sent invalid data');
                        }
                    })];
            });
        });
    }
    return function (input, init) { return profixiedFetch(input, init); };
}
exports.proxifiedFetchFactory = proxifiedFetchFactory;
var ProxifiedFetchBridge = /** @class */ (function () {
    function ProxifiedFetchBridge(electronIpcMain, proxifiedFetch) {
        this.selfStatic = ProxifiedFetchBridge;
        this.requests = {};
        this.ipc = electronIpcMain;
        this.proxifiedFetch = proxifiedFetch;
    }
    ProxifiedFetchBridge.prototype.init = function () {
        var _this = this;
        this.listen('Request', function (id, url, requestInit, _a) {
            var sender = _a.sender;
            var fetch = _this.proxifiedFetch;
            _this.requests[id] = {};
            var controller = new AbortController();
            var signal = controller.signal;
            var request = fetch(url, __assign({ signal: signal }, requestInit))
                .then(function (data) {
                var status = data.status;
                var headers = {};
                data.headers.forEach(function (value, name) {
                    headers[name] = value;
                });
                _this.answer(sender, 'InitialData', id, { status: status, headers: headers });
                data.body.on('data', function (chunk) {
                    _this.answer(sender, 'PartialResponse', id, chunk);
                });
                data.body.on('end', function () {
                    _this.answer(sender, 'Closed', id);
                });
            })["catch"](function (err) {
                if (err.code !== 'FETCH_ABORTED') {
                    // console.log('Proxified Fetch failed with next error:', err);
                    _this.answer(sender, 'Error', id);
                }
            });
            _this.requests[id] = { request: request, cancel: function () { return controller.abort(); } };
        });
        this.listen('Abort', function (id) {
            var request = _this.requests[id];
            if (!request || !request.cancel) {
                return;
            }
            request.cancel();
        });
    };
    ProxifiedFetchBridge.prototype.destroy = function () {
        this.stopListen('Request');
        this.stopListen('Abort');
        delete this.requests;
        delete this.ipc;
        delete this.selfStatic;
    };
    ProxifiedFetchBridge.prototype.answer = function (sender, event, id, data) {
        var eventName = "".concat(this.selfStatic.eventGroup, " : ").concat(event, "[").concat(id, "]");
        sender.send(eventName, data);
    };
    ProxifiedFetchBridge.prototype.listen = function (event, callback) {
        var eventName = "".concat(this.selfStatic.eventGroup, " : ").concat(event);
        this.ipc.on(eventName, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);
            callback.apply(void 0, arrangedArgs);
        });
    };
    ProxifiedFetchBridge.prototype.listenOnce = function (event, callback) {
        var eventName = "".concat(this.selfStatic.eventGroup, " : ").concat(event);
        this.ipc.once(eventName, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);
            callback.apply(void 0, arrangedArgs);
        });
    };
    ProxifiedFetchBridge.prototype.stopListen = function (event) {
        var eventName = "".concat(this.selfStatic.eventGroup, " : ").concat(event);
        this.ipc.removeAllListeners(eventName);
    };
    ProxifiedFetchBridge.eventGroup = 'ProxifiedFetch';
    return ProxifiedFetchBridge;
}());
exports.ProxifiedFetchBridge = ProxifiedFetchBridge;
