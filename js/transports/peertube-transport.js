"use strict";
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
        var url;
        if (typeof input === 'string') {
            url = input;
        }
        else if (input instanceof Request) {
            url = input.url;
        }
        if (localVideo) {
            var isViewsRequest = url.endsWith('views');
            if (isViewsRequest) {
                return proxyFetch(input, init);
            }
            return fsFetch(input, init);
        }
        // @ts-ignore
        var isTorEnabled = app.platform.sdk.usersettings.meta.useTor.value;
        if (isTorEnabled) {
            return proxyFetch(input, init);
        }
        return fetch(input, init);
    }
    return function (input, init) { return fetchRouter(input, init); };
}
exports.peertubeTransport = peertubeTransport;
