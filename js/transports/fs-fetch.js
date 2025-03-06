"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFsFetchBridge = exports.fsFetchFactory = void 0;
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
function fsFetchFactory(electronIpcRenderer, shareId) {
    const defaultInit = {
        method: 'GET',
    };
    async function fsFetch(input, init = defaultInit) {
        if (input instanceof Request) {
            throw Error(`Bastyon FS Fetch doesn't support Request objects`);
        }
        if (init.method && init.method !== 'GET') {
            throw Error(`Bastyon FS Fetch supports only GET method`);
        }
        if (init.headers && !(init.headers instanceof Headers)) {
            throw Error(`Bastyon FS Fetch supports only headers as Headers object`);
        }
        const url = input;
        let range;
        let readKill;
        if (init.headers instanceof Headers && init.headers.has('Range')) {
            let rangeStr = init.headers.get('Range');
            // @ts-ignore
            range = rangeStr
                .match(/\d+/g)
                .map(Number.parseFloat);
        }
        if (init.signal) {
            readKill = init.signal;
        }
        const fileStats = await electronIpcRenderer.invoke('BastyonFsFetch : FileStats', shareId, url, range);
        const fetchId = await electronIpcRenderer.invoke('BastyonFsFetch : GetFile', shareId, url, range);
        const readStream = new ReadableStream({
            async start(controller) {
                if (readKill) {
                    readKill.onabort = () => {
                        electronIpcRenderer.send(`BastyonFsFetch : ${fetchId} : Abort`);
                        controller.close();
                    };
                }
                electronIpcRenderer.on(`BastyonFsFetch : ${fetchId} : Progress`, (event, data) => {
                    const chunkUint8 = new Uint8Array(data.buffer);
                    controller.enqueue(chunkUint8);
                });
                electronIpcRenderer.once(`BastyonFsFetch : ${fetchId} : Close`, (event) => {
                    controller.close();
                });
                electronIpcRenderer.once(`BastyonFsFetch : ${fetchId} : Error`, (event, err) => {
                    controller.error(err);
                });
            }
        });
        const response = new Response(readStream);
        Object.defineProperty(response, "url", { value: url });
        response.headers.append('Content-Length', `${fileStats.size}`);
        return response;
    }
    return (input, init) => fsFetch(input, init);
}
exports.fsFetchFactory = fsFetchFactory;
function initFsFetchBridge(electronIpcMain, appPath) {
    function urlToFsPath(url, shareId, range) {
        const isPlaylist = url.endsWith('.m3u8');
        const isFragment = url.endsWith('.mp4');
        const urlSplits = url.split('/');
        const videoId = urlSplits[urlSplits.length - 2];
        let filePath;
        if (isPlaylist) {
            filePath = `${shareId}/videos/${videoId}/playlist.m3u8`;
        }
        if (isFragment && range) {
            filePath = `${shareId}/videos/${videoId}/fragment_${range[0]}-${range[1]}.mp4`;
        }
        return `${appPath}/posts/${filePath}`;
    }
    electronIpcMain.handle('BastyonFsFetch : FileStats', (event, shareId, url, range) => {
        const filePath = urlToFsPath(url, shareId, range);
        const fileStats = fs.statSync(filePath);
        return fileStats;
    });
    electronIpcMain.handle('BastyonFsFetch : GetFile', (event, shareId, url, range) => {
        const fetchId = crypto.randomBytes(5).toString('hex');
        const filePath = urlToFsPath(url, shareId, range);
        const readStream = fs.createReadStream(filePath);
        const fileStats = fs.statSync(filePath);
        const fileSize = fileStats.size;
        readStream.on('data', (fragment) => {
            event.sender.send(`BastyonFsFetch : ${fetchId} : Progress`, fragment);
        });
        readStream.once('close', () => {
            if (readStream.bytesRead !== fileSize) {
                event.sender.send(`BastyonFsFetch : ${fetchId} : Error`, Error('Unhandled file read error'));
                return;
            }
            event.sender.send(`BastyonFsFetch : ${fetchId} : Close`);
        });
        readStream.once('error', (err) => {
            event.sender.send(`BastyonFsFetch : ${fetchId} : Error`, err);
        });
        electronIpcMain.once(`BastyonFsFetch : ${fetchId} : Abort`, (event) => {
            readStream.close();
        });
        return fetchId;
    });
}
exports.initFsFetchBridge = initFsFetchBridge;
//# sourceMappingURL=fs-fetch.js.map