if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the site using the default scope
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function(error) {
        console.log('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}