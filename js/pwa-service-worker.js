let pwaFetch = (...args) => fetch(...args);

if(typeof _Electron != 'undefined'){
    electron = require('electron');
    pwaFetch = (...args) => proxyFetch(...args);
}

const initFirebase = (registration)=>{
   if(!firebase.apps.length) {
       firebase.initializeApp({
           messagingSenderId: "1020521924918"
       });
   }
    firebase.messaging().useServiceWorker(registration);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
        if(typeof firebase != 'undefined')
            initFirebase(registration)
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
    console.log('Service workers are not supported.');
}

