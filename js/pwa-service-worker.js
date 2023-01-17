if(typeof _Electron != 'undefined'){
    electron = require('electron');
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    });




    navigator.serviceWorker.addEventListener('message', function(event) {

        const channel = new BroadcastChannel(event.data);

        if (typeof _Electron != 'undefined') {

            fetch(event.data, { mode: 'no-cors'}).then(function(res){
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
