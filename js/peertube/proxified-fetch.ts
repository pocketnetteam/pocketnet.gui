import type * as Electron from "electron";
import type * as Stream from "stream";

import * as proxyTransport from "../../proxy16/transports.js";

const proxified = proxyTransport();

const getRequestId = () => {
    const rand = Math.random()

    const min = 0x100000;
    const max = 0xFFFFFF - min;

    const randHex = Math.floor(rand * max + min).toString(16);
    const dateHex = Date.now().toString(16);

    return randHex + dateHex;
}

export async function proxifiedFetchFactory(electronIpcRenderer: Electron.IpcRenderer) {
    const defaultInit = {
        method: 'GET',
    };

    async function profixiedFetch(input: RequestInfo, init: RequestInit = defaultInit): Promise<Response> {
        const preparedInit = { ...init };

        preparedInit.headers = {};

        if (input instanceof Request) {
            throw Error('Bastyon Proxified Fetch does not support Request objects');
        }

        if (init.method && init.method !== 'GET') {
            throw Error('Bastyon Proxified Fetch supports only GET method');
        }

        if (init.headers && !(init.headers instanceof Headers)) {
            throw Error('Bastyon Proxified Fetch supports only headers as Headers object');
        }

        const id = getRequestId();
        const url = input;
        let fetchCancel: AbortSignal;

        if (init.signal) {
            fetchCancel = init.signal;
        }

        if (init.headers instanceof Headers) {
            init.headers.forEach((value, name) => {
                preparedInit.headers[name] = value;
            });
        }

        const readStream = new ReadableStream({
            async start(controller) {
                if (fetchCancel) {
                    fetchCancel.onabort = () => {
                        electronIpcRenderer.removeAllListeners(`ProxifiedFetch : PartialResponse[${id}]`);

                        electronIpcRenderer.send('ProxifiedFetch : Abort', id);

                        controller.close();
                    };
                }

                electronIpcRenderer.once(`ProxifiedFetch : Closed[${id}]`, (event) => {
                    electronIpcRenderer.removeAllListeners(`ProxifiedFetch : PartialResponse[${id}]`);

                    controller.close();
                });

                electronIpcRenderer.on(`ProxifiedFetch : PartialResponse[${id}]`, (event, data: Buffer) => {
                    // FIXME: ONLY 1 PARTIAL RECEIVED

                    const chunkUint8 = new Uint8Array(data.buffer);
                    controller.enqueue(chunkUint8);

                    electronIpcRenderer.send(`ProxifiedFetch : ReceivedResponse[${id}]`);
                });
            }
        });

        const response = new Response(readStream);

        electronIpcRenderer.send('ProxifiedFetch : Request', id, url, preparedInit);

        Object.defineProperty(response, 'url', { value: url });

        return response;
    }

    return (input: RequestInfo, init?: RequestInit) => profixiedFetch(input, init);
}

export async function initProxifiedFetchBridge(electronIpcMain: Electron.IpcMain) {
    const requests = {};

    electronIpcMain.on('ProxifiedFetch : Request', (event, id: string, url: string, requestInit: RequestInit) => {
        const sender = event.sender;
        const fetch = proxified.fetch;

        requests[id] = {};

        const controller = new AbortController();
        const signal = controller.signal;

        const request = fetch(url, { signal, ...requestInit })
            .then(({ body }: { body: Stream }) => {
                body.on('data', (chunk) => {
                    sender.send(`ProxifiedFetch : PartialResponse[${id}]`, chunk);
                });

                body.on('end', () => {
                    sender.send(`ProxifiedFetch : Closed[${id}]`);
                });
            });

        requests[id] = { request, cancel: () => controller.abort() };
    });

    electronIpcMain.on('ProxifiedFetch : Abort', (e, id) => {
        const request = requests[id];

        if (!request || !request.cancel) {
            return;
        }

        request.cancel();
    });
}
