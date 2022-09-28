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
exports.peertubeTransport = void 0;
var fs_fetch_1 = require("./fs-fetch");
var proxified_fetch_1 = require("./proxified-fetch");
function peertubeTransport(ipcRenderer, localVideo) {
    var fsFetch;
    var proxyFetch = (0, proxified_fetch_1.proxifiedFetchFactory)(ipcRenderer);
    if (localVideo) {
        fsFetch = (0, fs_fetch_1.fsFetchFactory)(ipcRenderer, localVideo.video.internalURL);
    }
    function fetchRouter(input, init) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var url, isViewsRequest, proxy, info;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (typeof input === 'string') {
                            url = input;
                        }
                        else if (input instanceof Request) {
                            url = input.url;
                        }
                        if (localVideo) {
                            isViewsRequest = url.endsWith('views');
                            if (isViewsRequest) {
                                return [2 /*return*/, proxyFetch(input, init)];
                            }
                            return [2 /*return*/, fsFetch(input, init)];
                        }
                        return [4 /*yield*/, app.api.get.directpr()];
                    case 1:
                        proxy = _c.sent();
                        return [4 /*yield*/, proxy.get.info()];
                    case 2:
                        info = _c.sent();
                        if ((_b = (_a = info === null || info === void 0 ? void 0 : info.info) === null || _a === void 0 ? void 0 : _a.tor) === null || _b === void 0 ? void 0 : _b.enabled) {
                            return [2 /*return*/, proxyFetch(input, init)];
                        }
                        return [2 /*return*/, fetch(input, init)];
                }
            });
        });
    }
    return function (input, init) { return fetchRouter(input, init); };
}
exports.peertubeTransport = peertubeTransport;
