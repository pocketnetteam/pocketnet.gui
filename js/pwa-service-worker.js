const {Blob} = require("buffer");
if(typeof _Electron != 'undefined'){
    electron = require('electron');
}
if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the site using the default scope
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function(error) {
        console.log('Service worker registration failed:', error);
    });

    navigator.serviceWorker.addEventListener('message', async event => {
        if(typeof _Electron != 'undefined') {
            const buffer = await electron.ipcRenderer.invoke('proxyUrl', event.data || null);
            const channel = new BroadcastChannel(event.data);
            const res = await fetch(`data:${buffer.type};base64,${buffer.data}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob)
            channel.postMessage(url)
        } else {
            channel.postMessage(event.data)
        }
    });
    
 
} else {
    console.log('Service workers are not supported.');
}

