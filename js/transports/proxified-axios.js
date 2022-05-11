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
exports.__esModule = true;
exports.initProxifiedAxiosBridge = exports.proxifiedAxiosFactory = void 0;
var axios_1 = require("axios");
var proxyTransport = require("../../proxy16/transports.js");
var proxified = proxyTransport();
var getRequestId = function () {
    var rand = Math.random();
    var min = 0x100000;
    var max = 0xFFFFFF - min;
    var randHex = Math.floor(rand * max + min).toString(16);
    var dateHex = Date.now().toString(16);
    return randHex + dateHex;
};
function proxifiedAxiosFactory(electronIpcRenderer) {
    function profixiedAxios(urlOrConfig, config) {
        return __awaiter(this, void 0, void 0, function () {
            function parseArgs(arg1, arg2) {
                var preparedConfig = {};
                if (typeof arg2 === 'object') {
                    preparedConfig = arg2;
                    preparedConfig.url = arg1;
                }
                else if (typeof arg1 === 'object') {
                    preparedConfig = arg1;
                }
                if (preparedConfig.data instanceof FormData) {
                    var formData = preparedConfig.data;
                    preparedConfig.data = { type: 'FormData', value: {} };
                    formData.forEach(function (value, name) {
                        preparedConfig.data.value[name] = value;
                    });
                }
                if (preparedConfig.cancelToken) {
                    cancelToken = preparedConfig.cancelToken.promise;
                    delete preparedConfig.cancelToken;
                }
                if (preparedConfig.onUploadProgress) {
                    onUploadProgress = preparedConfig.onUploadProgress;
                    delete preparedConfig.onUploadProgress;
                }
                return preparedConfig;
            }
            var id, cancelToken, onUploadProgress, preparedConfig;
            return __generator(this, function (_a) {
                id = getRequestId();
                preparedConfig = parseArgs(urlOrConfig, config);
                if (cancelToken) {
                    cancelToken.then(function () {
                        electronIpcRenderer.send('ProxifiedAxios : Abort', id);
                    });
                }
                if (onUploadProgress) {
                    electronIpcRenderer.on("ProxifiedAxios : Progress[".concat(id, "]"), function (event, progressEvent) {
                        onUploadProgress(progressEvent);
                    });
                }
                try {
                    electronIpcRenderer.send('ProxifiedAxios : Request', id, preparedConfig);
                }
                catch (e) {
                    throw Error('ProxifiedAxios : Request - sent invalid data');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        electronIpcRenderer.on("ProxifiedAxios : Response[".concat(id, "]"), function (event, response) {
                            console.table(response);
                            console.log(response);
                            resolve(response);
                        });
                    })];
            });
        });
    }
    return function (urlOrConfig, config) { return profixiedAxios(urlOrConfig, config); };
}
exports.proxifiedAxiosFactory = proxifiedAxiosFactory;
function initProxifiedAxiosBridge(electronIpcMain) {
    var requests = {};
    function parseInputs(axiosConfig) {
        // let defaultConfig: AxiosRequestConfig = { headers: {} };
        var preparedConfig = __assign({}, axiosConfig);
        if (axiosConfig.data.type === 'FormData') {
            // preparedConfig.headers['Content-Type'] = 'multipart/form-data';
            var formData_1 = [];
            Object.keys(preparedConfig.data.value).forEach(function (valueName) {
                var value = preparedConfig.data.value[valueName];
                formData_1.push("".concat(valueName, "=").concat(value));
            });
            preparedConfig.data = formData_1.join('&');
        }
        return preparedConfig;
    }
    electronIpcMain.on('ProxifiedAxios : Request', function (event, id, axiosConfig) {
        var sender = event.sender;
        var axios = proxified.axios;
        requests[id] = {};
        var preparedConfig = parseInputs(axiosConfig);
        preparedConfig.onDownloadProgress = function (progressEvent) {
            sender.send("ProxifiedAxios : Progress[".concat(id, "]"), progressEvent);
        };
        var cancelSource = axios_1["default"].CancelToken.source();
        preparedConfig.cancelToken = cancelSource.token;
        var request = axios(preparedConfig)
            .then(function (data) {
            var preparedResponse = __assign({}, data);
            delete preparedResponse.request;
            delete preparedResponse.config;
            sender.send("ProxifiedAxios : Response[".concat(id, "]"), preparedResponse);
        })["catch"](function (err) {
            var preparedResponse = __assign({}, err.response);
            delete preparedResponse.request;
            delete preparedResponse.config;
            sender.send("ProxifiedAxios : Response[".concat(id, "]"), preparedResponse);
        });
        requests[id] = { request: request, cancel: function () { return cancelSource.cancel(); } };
    });
    electronIpcMain.on('ProxifiedAxios : Abort', function (e, id) {
        var request = requests[id];
        if (!request || !request.cancel) {
            return;
        }
        request.cancel();
    });
}
exports.initProxifiedAxiosBridge = initProxifiedAxiosBridge;
//# sourceMappingURL=proxified-axios.js.map