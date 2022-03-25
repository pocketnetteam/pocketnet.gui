import type * as Electron from "electron";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

export async function bastyonFsFetchFactory(electronIpcRenderer: Electron.IpcRenderer, shareId: string) {
    const defaultInit = {
        method: 'GET',
    };

    async function fsFetch(input: RequestInfo, init: RequestInit = defaultInit): Promise<Response> {
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
        let readKill: AbortSignal;

        if (init.headers instanceof Headers && init.headers.has('Range')) {
            let rangeStr = init.headers.get('Range');
            range = rangeStr
                .match(/\d+/g)
                .map(Number.parseFloat);
        }

        if (init.signal) {
            readKill = init.signal;
        }

        const fileStatsPromise = electronIpcRenderer.invoke('BastyonFsFetch : FileStats', shareId, url, range) as Promise<fs.Stats>;

        fileStatsPromise.catch((err) => {
            if (err.message === 'NO_FILE') {
                // console.log('Requested file that does not exist');
            }
        });

        const fileStats = await fileStatsPromise;

        const fetchId = await electronIpcRenderer.invoke('BastyonFsFetch : GetFile', shareId, url, range) as string;

        const readStream = new ReadableStream({
            async start(controller) {
                if (readKill) {
                    readKill.onabort = () => {
                        electronIpcRenderer.send(`BastyonFsFetch : ${fetchId} : Abort`);

                        controller.close();
                    };
                }

                electronIpcRenderer.on(`BastyonFsFetch : ${fetchId} : Progress`, (event, data: Buffer) => {
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

    return (input: RequestInfo, init?: RequestInit) => fsFetch(input, init);
}

export async function bastyonFsFetchBridge(electronIpcMain: Electron.IpcMain, appPath: string) {
    function urlToFsPath(url: string, shareId: string, range?: number[]) {
        const isPlaylist = url.endsWith('.m3u8');
        const isFragment = url.endsWith('.mp4')

        const urlSplits = url.split('/');
        const videoId = urlSplits[urlSplits.length - 2];

        let filePath: string;

        if (isPlaylist) {
            filePath = `${shareId}/videos/${videoId}/playlist.m3u8`;
        }

        if (isFragment && range) {
            filePath = `${shareId}/videos/${videoId}/fragment_${range[0]}-${range[1]}.mp4`;
        }

        return path.normalize(`${appPath}/posts/${filePath}`);
    }

    electronIpcMain.handle('BastyonFsFetch : FileStats', (event, shareId: string, url: string, range?: number[]) => {
        const filePath = urlToFsPath(url, shareId, range);

        if (!fs.existsSync(filePath)) {
            throw Error('NO_FILE');
        }

        const fileStats = fs.statSync(filePath);

        return fileStats;
    });

    electronIpcMain.handle('BastyonFsFetch : GetFile', (event, shareId: string, url: string, range?: number[]) => {
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
