let pwaFetch = (...args) => fetch(...args);

if(typeof _Electron != 'undefined'){
    electron = require('electron');
    pwaFetch = (...args) => proxyFetch(...args);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function (error) {
        console.log('Service worker registration failed:', error);
    });

    navigator.serviceWorker.addEventListener('message', async (event) => {

        const channel = new BroadcastChannel(event.data);

        if (typeof _Electron != 'undefined') {

            const res = await pwaFetch(event.data, { mode: 'no-cors'});
            const blob = await res.blob();
            const url = URL.createObjectURL(blob)
            channel.postMessage(url)


        } else {
            channel.postMessage(event.data)
        }

    });





} else {
}

