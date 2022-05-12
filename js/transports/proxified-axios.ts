import type * as Electron from "electron";
import type { AxiosStatic, AxiosRequestConfig, AxiosResponse, Cancel } from 'axios';

import _axios from 'axios';

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

export class ProxifiedAxiosBridge {
    private selfStatic = ProxifiedAxiosBridge;

    static eventGroup = 'ProxifiedAxios';

    private ipc: Electron.IpcMain;
    private proxifiedAxios: AxiosStatic;
    private requests = {};

    constructor(electronIpcMain: Electron.IpcMain, proxifiedAxios: AxiosStatic) {
        this.ipc = electronIpcMain;
        this.proxifiedAxios = proxifiedAxios;
    }

    init() {
        this.listen('Request', (id: string, axiosConfig: AxiosRequestConfig, { sender }: Electron.IpcMainEvent) => {
            const axios = this.proxifiedAxios;

            this.requests[id] = {};

            const preparedConfig = this.prepareConfig(axiosConfig);

            preparedConfig.onDownloadProgress = (progressEvent) => {
                this.answer(sender, 'Progress', id, progressEvent);
            };

            const cancelSource = _axios.CancelToken.source();

            preparedConfig.cancelToken = cancelSource.token;

            const request = axios(preparedConfig)
                .then((data: AxiosResponse) => {
                    const preparedResponse = { ...data };
                    delete preparedResponse.request;
                    delete preparedResponse.config;

                    this.answer(sender, 'Response', id, preparedResponse);
                })
                .catch((err) => {
                    const preparedResponse = { ...err.response };
                    delete preparedResponse.request;
                    delete preparedResponse.config;

                    this.answer(sender, 'Response', id, preparedResponse);
                });

            this.requests[id] = { request, cancel: () => cancelSource.cancel() };
        });
        this.listen('Abort', (id: string) => {
            const request = this.requests[id];

            if (!request || !request.cancel) {
                return;
            }

            request.cancel();
        })
    }

    destroy() {
        this.stopListen('Request');
        this.stopListen('Abort');

        delete this.requests;
        delete this.ipc;
        delete this.selfStatic;
    }

    private answer(sender: Electron.WebContents, event: string, id: string, data: any) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}[${id}]`;

        sender.send(eventName, data);
    }

    private listen(event: string, callback: (...args) => void) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;

        this.ipc.on(eventName, (...args) => {
            const arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);

            callback(...arrangedArgs);
        });
    }

    private listenOnce(event: string, callback: (...args) => void) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;

        this.ipc.once(eventName, (...args) => {
            const arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);

            callback(...arrangedArgs);
        });
    }

    private stopListen(event: string) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;

        this.ipc.removeAllListeners(eventName);
    }

    private prepareConfig(axiosConfig: AxiosRequestConfig): AxiosRequestConfig {
        let preparedConfig: AxiosRequestConfig = { ...axiosConfig };

        if (axiosConfig.data.type === 'FormData') {
            const formData = [];

            Object.keys(preparedConfig.data.value).forEach((valueName) => {
                const value = preparedConfig.data.value[valueName];
                formData.push(`${valueName}=${value}`);
            });

            preparedConfig.data = formData.join('&');
        }

        return preparedConfig;
    }
}
