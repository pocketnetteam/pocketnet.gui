var pwaFetch = function(){return fetch.apply( this, arguments );}

/*(...args) => fetch(...args);*/

if(typeof _Electron != 'undefined'){
    electron = require('electron');
    pwaFetch = function(){return proxyFetch.apply( this, arguments );}
    
    /*(...args) => proxyFetch(...args);*/
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);

        registration.addEventListener('updatefound', () => {
            const worker = registration.installing;

    navigator.serviceWorker.addEventListener('message', function(event) {

        const channel = new BroadcastChannel(event.data);

        if (typeof _Electron != 'undefined') {

            pwaFetch(event.data, { mode: 'no-cors'}).then(function(res){
                return res.blob()
            }).then(function(blob){
                const url = URL.createObjectURL(blob)
                channel.postMessage(url)
            }).catch(function(e){
                throw e;
            })
            
            /*const res = await pwaFetch(event.data, { mode: 'no-cors'});
            const blob = await res.blob();*/
            


        } else {
            channel.postMessage(event.data)
        }

    });
}
