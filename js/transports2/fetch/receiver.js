class FetchReceiver {
    onmessageListeners = {};

    constructor(broadcastChannelName) {
        this.broadcastChannel = new BroadcastChannel(broadcastChannelName);

        this.broadcastChannel.onmessage = async ({data: message}) => {
            const hasListenersForId = (message.id in this.onmessageListeners);
            const hasListenersMessage = (message.id in this.onmessageListeners);

            if (!hasListenersForId && !hasListenersMessage) {
                return;
            }

            this.onmessageListeners[message.id][message.name](message.data);
        };
    }

    generateId() {
        return (Math.random() + 1).toString(36).substring(2);
    }

    async send(eventName, requestId, data) {
        // console.log('LEVEL-1: SEND', eventName, requestId, data);

        const message = {
            name: eventName,
            id: requestId,
        };

        if (data) {
            message.data = data;

            if ('body' in data) {
                message.data.body = await data.body;
            }
        }

        this.broadcastChannel.postMessage(message);
    }

    listen(eventName, requestId, listener) {
        // console.log('LEVEL-1: LISTEN', eventName, requestId);

        this.onmessageListeners[requestId][eventName] = async (data) => {
            // console.log('LEVEL-1: RECEIVED', eventName, requestId);

            listener(data);
        };
    }

    sendRequest(requestId, request) {
        this.send('Request', requestId, request);
    }

    sendAbort(requestId) {
        this.send('Abort', requestId);
    }

    onInitialData(requestId, listener) {
        this.listen('InitialData', requestId, listener);
    }

    onData(requestId, listener) {
        this.listen('Data', requestId, listener);
    }

    onEnd(requestId, listener) {
        this.listen('End', requestId, listener);
    }

    onError(requestId, listener) {
        this.listen('Error', requestId, listener);
    }

    static init(broadcastChannelName) {
        const serializeRequest = (request) => {
            const instanceToObject = (instance) => {
                const originalClass = instance || {};
                const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass));

                return keys.reduce((classAsObj, key) => {
                    if (typeof originalClass[key] === 'function') {
                        return classAsObj;
                    }

                    classAsObj[key] = originalClass[key];
                    return classAsObj;
                }, {});
            }
            const prepareHeaders = (headers) => {
                const preparedHeaders = {};

                const isInstanceHeaders = (headers instanceof Headers);

                if (!isInstanceHeaders) {
                    return headers;
                }

                for (let header of request.headers.entries()) {
                    const name = header[0];
                    const value = header[1];

                    preparedHeaders[name] = value;
                }

                return preparedHeaders;
            };
            const prepareBody = async (body) => {
                if (body instanceof ReadableStream) {
                    const reader = body.getReader();

                    let bodyBytes = [];
                    let result;

                    while (!(result = await reader.read()).done) {
                        bodyBytes.push([...result.value]);
                    }

                    const bytesArr = bodyBytes.flat();
                    return Uint8Array.from(bytesArr);
                }
            };

            const preparedRequest = {};

            let requestObject = request;

            if (request instanceof Request) {
                requestObject = instanceToObject(request);
            }

            const requestParams = Object.keys(requestObject);

            for (let i = 0; i < requestParams.length; i++) {
                const paramName = requestParams[i];

                switch (paramName) {
                    case 'body':
                        preparedRequest.body = prepareBody(requestObject.body);
                        break;
                    case 'headers':
                        preparedRequest.headers = prepareHeaders(requestObject.headers);
                        break;
                    case 'signal':
                        //abortSignal.onabort = () => self.sendAbort(requestId);
                        break;
                    default:
                        preparedRequest[paramName] = requestObject[paramName];
                }
            }

            return preparedRequest;
        }

        const self = new FetchReceiver(broadcastChannelName);

        return function(input, init) {
            let reqUrl;
            const requestId = self.generateId();

            self.onmessageListeners[requestId] = {};

            const abortController = new AbortController();
            const abortSignal = abortController.signal;

            const override1 = async (url, options = {}) => {
                reqUrl = url;

                const serializedOptions = serializeRequest(options);

                self.sendRequest(requestId, { ...serializedOptions, url });
            };

            const override2 = async (request, options = {}) => {
                reqUrl = request.url;

                const serializedRequest = serializeRequest(request);
                const serializedOptions = serializeRequest(options);

                self.sendRequest(requestId, { ...serializedRequest, ...serializedOptions });
            };

            const readStream = new ReadableStream({
                async start(controller) {
                    const closeReadStream = () => {
                        if (isEmpty) {
                            const emptyData = new Uint8Array([]);
                            controller.enqueue(emptyData);
                        }

                        controller.close();
                        closed = true;
                    }

                    let isEmpty = true;
                    let closed = false;

                    if (abortSignal) {
                        abortSignal.onabort = () => {
                            if (!closed) {
                                self.sendAbort(requestId);
                                closeReadStream();
                            }
                        };
                    }

                    self.onData(requestId, (data) => {
                        isEmpty = false;

                        const chunkUint8 = new Uint8Array(data);
                        controller.enqueue(chunkUint8);
                    });

                    self.onEnd(requestId, () => {
                        closeReadStream();
                    });
                }
            });

            return new Promise((resolve, reject) => {
                self.onInitialData(requestId, (initialData) => {
                    const response = new Response(readStream, initialData);

                    Object.defineProperty(response, 'url', { value: reqUrl });

                    const responseData = { url: response.url };

                    response.headers.forEach((value, name) => {
                        responseData[name] = value;
                    });

                    resolve(response);
                });

                self.onError(requestId, (err) => {
                    reject(err);
                });

                if (typeof input === 'string') {
                    return override1(input, init);
                }

                return override2(input, init);
            });
        };
    }
}

self.FetchReceiver = FetchReceiver;
