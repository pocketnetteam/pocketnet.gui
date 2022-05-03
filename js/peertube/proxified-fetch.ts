import type * as Electron from "electron";
import type * as Stream from "stream";

import * as proxyTransport from "../../proxy16/transports.js";

const proxified = proxyTransport(true);

const getRequestId = () => {
    const rand = Math.random()

    const min = 0x100000;
    const max = 0xFFFFFF - min;

    const randHex = Math.floor(rand * max + min).toString(16);
    const dateHex = Date.now().toString(16);

    return randHex + dateHex;
}

export function proxifiedFetchFactory(electronIpcRenderer: Electron.IpcRenderer) {
    const defaultInit = {
        method: 'GET',
    };

    async function profixiedFetch(input: RequestInfo, init: RequestInit = defaultInit): Promise<Response> {
        const preparedInit: RequestInit = {};

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
                        electronIpcRenderer.removeAllListeners(`ProxifiedFetch : InitialData[${id}]`);
                        electronIpcRenderer.removeAllListeners(`ProxifiedFetch : PartialResponse[${id}]`);

                        electronIpcRenderer.send('ProxifiedFetch : Abort', id);

                        controller.close();
                    };
                }

                electronIpcRenderer.once(`ProxifiedFetch : Closed[${id}]`, (event) => {
                    electronIpcRenderer.removeAllListeners(`ProxifiedFetch : InitialData[${id}]`);
                    electronIpcRenderer.removeAllListeners(`ProxifiedFetch : PartialResponse[${id}]`);

                    controller.close();
                });

                electronIpcRenderer.on(`ProxifiedFetch : PartialResponse[${id}]`, (event, data: Uint8Array) => {
                    /**
                     * FIXME:
                     *  Strange issue found. Somewhere Uint8Array.buffer was replaced
                     *  what produces invalid data in ArrayBuffer analog of object.
                     *  Must not be trusted, so using destructuring to get the
                     *  correct one buffer.
                     */
                    // @ts-ignore
                    data = new Uint8Array([...data]);

                    const chunkUint8 = new Uint8Array(data.buffer);
                    controller.enqueue(chunkUint8);

                    electronIpcRenderer.send(`ProxifiedFetch : ReceivedResponse[${id}]`);
                });
            }
        });

        return new Promise((resolve, reject) => {
            electronIpcRenderer.on(`ProxifiedFetch : InitialData[${id}]`, (event, initialData) => {
                const response = new Response(readStream, initialData);

                Object.defineProperty(response, 'url', { value: url });

                const responseData = { url: response.url };

                response.headers.forEach((value, name) => {
                    responseData[name] = value;
                });

                console.table(responseData);
                console.log(response);

                resolve(response);
            });

            try {
                electronIpcRenderer.send('ProxifiedFetch : Request', id, url, preparedInit);
            } catch (e) {
                throw Error('ProxifiedFetch : Request -  sent invalid data');
            }
        });
    }

    return (input: RequestInfo, init?: RequestInit) => profixiedFetch(input, init);
}

export function initProxifiedFetchBridge(electronIpcMain: Electron.IpcMain) {
    const requests = {};

    electronIpcMain.on('ProxifiedFetch : Request', (event, id: string, url: string, requestInit: RequestInit) => {
        const sender = event.sender;
        const fetch = proxified.fetch;

        requests[id] = {};

        const controller = new AbortController();
        const signal = controller.signal;

        const request = fetch(url, { signal, ...requestInit })
            .then((data: Response & { body: Stream }) => {
                const { status } = data;

                const headers = {};

                data.headers.forEach((value, name) => {
                    headers[name] = value;
                });

                sender.send(`ProxifiedFetch : InitialData[${id}]`, { status, headers });

                data.body.on('data', (chunk) => {
                    sender.send(`ProxifiedFetch : PartialResponse[${id}]`, chunk);
                });

                data.body.on('end', () => {
                    sender.send(`ProxifiedFetch : Closed[${id}]`);
                });
            })
            .catch((err) => {
                console.log('Proxified Fetch failed with next error:', err);
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
