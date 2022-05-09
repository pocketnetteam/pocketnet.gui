import type * as Electron from "electron";
import type { AxiosStatic, AxiosRequestConfig, AxiosResponse } from 'axios';

import _axios from 'axios';

import * as proxyTransport from "../../proxy16/transports.js";

const proxified = proxyTransport();

const getRequestId = () => {
    const rand = Math.random();

    const min = 0x100000;
    const max = 0xFFFFFF - min;

    const randHex = Math.floor(rand * max + min).toString(16);
    const dateHex = Date.now().toString(16);

    return randHex + dateHex;
};

export function proxifiedAxiosFactory(electronIpcRenderer: Electron.IpcRenderer) {
    function parseArgs(arg1: string | AxiosRequestConfig, arg2?: AxiosRequestConfig): AxiosRequestConfig {
        let preparedConfig: AxiosRequestConfig = {};

        if (typeof arg2 === 'object') {
            preparedConfig = arg2;
            preparedConfig.url = arg1 as string;
        } else if (typeof arg1 === 'object') {
            preparedConfig = arg1;
        }

        return preparedConfig;
    }

    async function profixiedAxios(urlOrConfig: string | AxiosRequestConfig, config?: AxiosRequestConfig) {
        const preparedConfig = parseArgs(urlOrConfig, config);
        const id = getRequestId();

        try {
            electronIpcRenderer.send('ProxifiedAxios : Request', id, preparedConfig);
        } catch (e) {
            throw Error('ProxifiedAxios : Request - sent invalid data');
        }

        return new Promise((resolve, reject) => {
            electronIpcRenderer.on(`ProxifiedAxios : Response[${id}]`, (event, response) => {
                console.table(response);
                console.log(response);

                resolve(response);
            });
        });
    }

    return (urlOrConfig: string | AxiosRequestConfig, config?: AxiosRequestConfig) => profixiedAxios(urlOrConfig, config);
}

export function initProxifiedAxiosBridge(electronIpcMain: Electron.IpcMain) {
    const requests = {};

    electronIpcMain.on('ProxifiedAxios : Request', (event, id: string, axiosConfig: AxiosRequestConfig) => {
        const sender = event.sender;
        const axios = proxified.axios as unknown as AxiosStatic;

        requests[id] = {};

        const preparedConfig = axiosConfig;

        // TODO: Handle this
        /*preparedConfig.onDownloadProgress = (e) => {
            const dataChunk = e.currentTarget.response;

            sender.send(`ProxifiedFetch : PartialResponse[${id}]`, dataChunk);
        };*/

        const cancelSource = _axios.CancelToken.source();

        preparedConfig.cancelToken = cancelSource.token;

        const request = axios(preparedConfig)
            .then((data: AxiosResponse) => {
                const preparedResponse = { ...data };
                delete preparedResponse.request;
                delete preparedResponse.config;

                sender.send(`ProxifiedAxios : Response[${id}]`, preparedResponse);
            })
            .catch((err) => {
                // TODO: Handle cancel
                console.log(err);

                if (err.code !== 'FETCH_ABORTED') {
                    // console.log('Proxified Fetch failed with next error:', err);
                    sender.send(`ProxifiedFetch : Error[${id}]`);
                }
            });

        requests[id] = { request, cancel: () => cancelSource.cancel() };
    });

    electronIpcMain.on('ProxifiedAxios : Abort', (e, id) => {
        const request = requests[id];

        if (!request || !request.cancel) {
            return;
        }

        request.cancel();
    });
}
