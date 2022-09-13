import type { IpcRenderer } from 'electron';

import { fsFetchFactory } from './fs-fetch';
import { proxifiedFetchFactory } from './proxified-fetch';

/** Partial type for LocalVideo */
type LocalVideo = {
    video: {
        internalURL: string,
    },
}

export function peertubeTransport(ipcRenderer: IpcRenderer, localVideo: LocalVideo) {
    let fsFetch;

    const proxyFetch = proxifiedFetchFactory(ipcRenderer);

    if (localVideo) {
        fsFetch = fsFetchFactory(ipcRenderer, localVideo.video.internalURL);
    }

    async function fetchRouter(input: RequestInfo, init: RequestInit): Promise<Response> {
        let url: string;

        if (typeof input === 'string') {
            url = input;
        } else if (input instanceof Request) {
            url = input.url;
        }

        if (localVideo) {
            const isViewsRequest = url.endsWith('views');

            if (isViewsRequest) {
                return proxyFetch(input, init);
            }

            return fsFetch(input, init);
        }

        // @ts-ignore
        const proxy = await app.api.get.directpr();
        const info = await proxy.get.info();

        if (info?.info?.tor?.enabled) {
            return proxyFetch(input, init);
        }

        return fetch(input, init);
    }

    return (input: RequestInfo, init?: RequestInit) => fetchRouter(input, init);
}
