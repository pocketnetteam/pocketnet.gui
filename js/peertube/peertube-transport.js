"use strict";
exports.__esModule = true;
exports.peertubeTransport = void 0;
var fs_fetch_1 = require("./fs-fetch");
var proxified_fetch_1 = require("./proxified-fetch");
function peertubeTransport(ipcRenderer, shareId) {
    var proxyFetch = (0, proxified_fetch_1.proxifiedFetchFactory)(ipcRenderer);
    var fsFetch = (0, fs_fetch_1.fsFetchFactory)(ipcRenderer, shareId);
    function fetchRouter(input, init) {
        var url;
        if (typeof input === 'string') {
            url = input;
        }
        else if (input instanceof Request) {
            url = input.url;
        }
        var isViewsRequest = url.endsWith('views');
        if (isViewsRequest) {
            return proxyFetch(input, init);
        }
        return fsFetch(input, init);
    }
    return function (input, init) { return fetchRouter(input, init); };
}
exports.peertubeTransport = peertubeTransport;
//# sourceMappingURL=peertube-transport.js.map