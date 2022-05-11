import type * as Electron from "electron";
import type { AxiosStatic, AxiosRequestConfig, AxiosResponse, Cancel } from 'axios';

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
    async function profixiedAxios(urlOrConfig: string | AxiosRequestConfig, config?: AxiosRequestConfig) {
        const id = getRequestId();

        let cancelToken: Promise<Cancel>;
        let onUploadProgress: (event: any) => void;

        function parseArgs(arg1: string | AxiosRequestConfig, arg2?: AxiosRequestConfig): AxiosRequestConfig {
            let preparedConfig: AxiosRequestConfig = {};

            if (typeof arg2 === 'object') {
                preparedConfig = arg2;
                preparedConfig.url = arg1 as string;
            } else if (typeof arg1 === 'object') {
                preparedConfig = arg1;
            }

            if (preparedConfig.data instanceof FormData) {
                const formData = preparedConfig.data;

                preparedConfig.data = { type: 'FormData', value: {} };

                formData.forEach((value, name) => {
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

        const preparedConfig = parseArgs(urlOrConfig, config);

        if (cancelToken) {
            cancelToken.then(() => {
                electronIpcRenderer.send('ProxifiedAxios : Abort', id);
            });
        }

        if (onUploadProgress) {
            electronIpcRenderer.on(`ProxifiedAxios : Progress[${id}]`, (event, progressEvent) => {
                onUploadProgress(progressEvent);
            });
        }

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

    function parseInputs(axiosConfig: AxiosRequestConfig): AxiosRequestConfig {
        // let defaultConfig: AxiosRequestConfig = { headers: {} };
        let preparedConfig: AxiosRequestConfig = { ...axiosConfig };

        if (axiosConfig.data.type === 'FormData') {
            // preparedConfig.headers['Content-Type'] = 'multipart/form-data';

            const formData = [];

            Object.keys(preparedConfig.data.value).forEach((valueName) => {
                const value = preparedConfig.data.value[valueName];
                formData.push(`${valueName}=${value}`);
            });

            preparedConfig.data = formData.join('&');
        }

        return preparedConfig;
    }

    electronIpcMain.on('ProxifiedAxios : Request', (event, id: string, axiosConfig: AxiosRequestConfig) => {
        const sender = event.sender;
        const axios = proxified.axios as unknown as AxiosStatic;

        requests[id] = {};

        const preparedConfig = parseInputs(axiosConfig);

        preparedConfig.onDownloadProgress = (progressEvent) => {
            sender.send(`ProxifiedAxios : Progress[${id}]`, progressEvent);
        };

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
                const preparedResponse = { ...err.response };
                delete preparedResponse.request;
                delete preparedResponse.config;

                sender.send(`ProxifiedAxios : Response[${id}]`, preparedResponse);
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
