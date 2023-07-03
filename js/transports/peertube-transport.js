"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peertubeTransport = void 0;
const fs_fetch_1 = require("./fs-fetch");
function peertubeTransport(ipcRenderer, localVideo) {
    let fsFetch;
    if (localVideo) {
        fsFetch = (0, fs_fetch_1.fsFetchFactory)(ipcRenderer, localVideo.video.internalURL);
    }
    async function fetchRouter(input, init) {
        let url;
        if (typeof input === 'string') {
            url = input;
        }
        else if (input instanceof Request) {
            url = input.url;
        }
        if (localVideo) {
            const isViewsRequest = url.endsWith('views');
            if (isViewsRequest) {
                return fetch(input, init);
            }
            return fsFetch(input, init);
        }
        // @ts-ignore
        const proxy = await app.api.get.directpr();
        const info = await proxy.get.info();
        return fetch(input, init);
    }
    return (input, init) => fetchRouter(input, init);
}
exports.peertubeTransport = peertubeTransport;
//# sourceMappingURL=peertube-transport.js.map