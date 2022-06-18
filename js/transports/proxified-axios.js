"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxifiedAxiosBridge = exports.proxifiedAxiosFactory = void 0;
const axios_1 = require("axios");
const getRequestId = () => {
    const rand = Math.random();
    const min = 0x100000;
    const max = 0xFFFFFF - min;
    const randHex = Math.floor(rand * max + min).toString(16);
    const dateHex = Date.now().toString(16);
    return randHex + dateHex;
};
function proxifiedAxiosFactory(electronIpcRenderer) {
    async function profixiedAxios(urlOrConfig, config) {
        const id = getRequestId();
        let cancelToken;
        let onUploadProgress;
        function parseArgs(arg1, arg2) {
            let preparedConfig = {};
            if (typeof arg2 === 'object') {
                preparedConfig = arg2;
                preparedConfig.url = arg1;
            }
            else if (typeof arg1 === 'object') {
                preparedConfig = arg1;
            }
            else if (typeof arg1 === 'string') {
                preparedConfig.url = arg1;
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
        }
        catch (e) {
            throw Error('ProxifiedAxios : Request - sent invalid data');
        }
        return new Promise((resolve, reject) => {
            electronIpcRenderer.on(`ProxifiedAxios : Response[${id}]`, (event, response) => {
                console.table(response);
                console.log(response);
                resolve(response);
            });
            electronIpcRenderer.on(`ProxifiedAxios : Error[${id}]`, (event, errorMessage) => {
                reject(errorMessage);
            });
        });
    }
    return (urlOrConfig, config) => {
        const hasFileFormData = () => {
            function checkForFile(config) {
                let flagged = false;
                for (let item of config.data.values()) {
                    if (item.constructor?.name === 'File') {
                        flagged = true;
                    }
                }
                return flagged;
            }
            if (typeof config === 'object' && config.data?.constructor.name === 'FormData') {
                return checkForFile(config);
            }
            else if (typeof urlOrConfig === 'object' && urlOrConfig.data?.constructor.name === 'FormData') {
                return checkForFile(urlOrConfig);
            }
        };
        if (hasFileFormData()) {
            // @ts-ignore
            return axios(urlOrConfig, config);
        }
        else {
            return profixiedAxios(urlOrConfig, config);
        }
    };
}
exports.proxifiedAxiosFactory = proxifiedAxiosFactory;
class ProxifiedAxiosBridge {
    constructor(electronIpcMain, proxifiedAxios) {
        this.selfStatic = ProxifiedAxiosBridge;
        this.requests = {};
        this.ipc = electronIpcMain;
        this.proxifiedAxios = proxifiedAxios;
    }
    init() {
        this.listen('Request', async (id, axiosConfig, { sender }) => {
            const axios = this.proxifiedAxios;
            this.requests[id] = {};
            const preparedConfig = this.prepareConfig(axiosConfig);
            preparedConfig.onDownloadProgress = (progressEvent) => {
                this.answer(sender, 'Progress', id, progressEvent);
            };
            const cancelSource = axios_1.default.CancelToken.source();
            preparedConfig.cancelToken = cancelSource.token;
            const request = axios(preparedConfig)
                .then((data) => {
                const preparedResponse = { ...data };
                delete preparedResponse.request;
                delete preparedResponse.config;
                this.answer(sender, 'Response', id, preparedResponse);
            })
                .catch((err) => {
                if (!err.response) {
                    this.answer(sender, 'Error', id, err.message);
                    return;
                }
                const preparedResponse = { ...err.response };
                delete preparedResponse.request;
                delete preparedResponse.config;
                this.answer(sender, 'Response', id, preparedResponse);
            });
            this.requests[id] = { request, cancel: () => cancelSource.cancel() };
        });
        this.listen('Abort', (id) => {
            const request = this.requests[id];
            if (!request || !request.cancel) {
                return;
            }
            request.cancel();
        });
    }
    destroy() {
        this.stopListen('Request');
        this.stopListen('Abort');
        delete this.requests;
        delete this.ipc;
        delete this.selfStatic;
    }
    answer(sender, event, id, data) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}[${id}]`;
        sender.send(eventName, data);
    }
    listen(event, callback) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;
        this.ipc.on(eventName, (...args) => {
            const arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);
            callback(...arrangedArgs);
        });
    }
    listenOnce(event, callback) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;
        this.ipc.once(eventName, (...args) => {
            const arrangedArgs = args.slice(1);
            arrangedArgs.push(args[0]);
            callback(...arrangedArgs);
        });
    }
    stopListen(event) {
        const eventName = `${this.selfStatic.eventGroup} : ${event}`;
        this.ipc.removeAllListeners(eventName);
    }
    prepareConfig(axiosConfig) {
        let preparedConfig = { ...axiosConfig };
        if ('data' in axiosConfig && axiosConfig.data.type === 'FormData') {
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
exports.ProxifiedAxiosBridge = ProxifiedAxiosBridge;
ProxifiedAxiosBridge.eventGroup = 'ProxifiedAxios';
//# sourceMappingURL=proxified-axios.js.map