let platform = 'web';

if(typeof _Electron != 'undefined'){
    electron = require('electron');
    platform = 'electron';
}

if (window.cordova){
    platform = 'cordova';
}

if ('serviceWorker' in navigator) {
    const swArgs = new URLSearchParams({
        appVersion: `${packageversion}-${versionsuffix}`,
        platform,
    }).toString();

    navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
            return;
        }

        registration.addEventListener('updatefound', async() => {
            console.log('Service Worker update detected!');

            const cacheNames = await caches.keys();
            cacheNames.forEach((cacheName) => (
                caches.delete(cacheName)
            ));
        });
    });

    navigator.serviceWorker.register(`./service-worker.js?${swArgs}`).then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    });




    navigator.serviceWorker.addEventListener('message', function(event) {

        const channel = new BroadcastChannel(event.data);

        if (typeof _Electron != 'undefined' || (window.cordova && window.cordova?.plugins?.torRunner)) {

            fetch(event.data, { mode: 'no-cors'}).then(function(res){
                return res.blob()
            }).then(function(blob){
                const url = URL.createObjectURL(blob)
                channel.postMessage(url)
            }).catch(function(e){
                throw e;
            })

        } else {
            channel.postMessage(event.data)
        }

    });
}
