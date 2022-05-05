import type { IpcRenderer } from 'electron';

import { bastyonFsFetchFactory } from './bastyon-fs-fetch';
import { proxifiedFetchFactory } from './proxified-fetch';

export async function peertubeTransport(ipcRenderer: IpcRenderer, shareId: string) {
    const proxyFetch = proxifiedFetchFactory(ipcRenderer);
    const fsFetch = bastyonFsFetchFactory(ipcRenderer, shareId);

    function fetchRouter(input: RequestInfo, init: RequestInit): Promise<Response> {
        let url: string;

        if (typeof input === 'string') {
            url = input;
        } else if (input instanceof Request) {
            url = input.url;
        }

        const isViewsRequest = url.endsWith('views');

        if (isViewsRequest) {
            return proxyFetch(input, init);
        }

        return fsFetch(input, init);
    }

    return (input: RequestInfo, init?: RequestInit) => fetchRouter(input, init);
}
