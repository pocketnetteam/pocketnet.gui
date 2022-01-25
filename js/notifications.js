Notifications = function(app) {

    var self = this;
    // Service worker registration
    self.registration;
    // Boolean if the user has subscribed to the notifications
    self.subscribed = false;
    // Timestamp when we start subscribing
    self.subscribeTimestamp;
    // Watch for service worker registration

    if (navigator.serviceWorker)
        navigator.serviceWorker.ready.then(function(registration) {
            self.registration = registration;
        });

    // ---------------------------------------------------------------
    // Public functions
    // ---------------------------------------------------------------
    // Subscribe to the notifications
    self.subscribe = function(clbk) {
        self.subscribed = true;
        // Subscribe to Matrix chat events
        if (window.client) {
            self.subscribeTimestamp = Date.now();
            window.client.on("Room.timeline", (message) => {
                // Ignore all the events for the first 3 seconds
                if (Math.floor((Date.now() - self.subscribeTimestamp) / 1000) <= 3) return;
                // Check we have an event
                if (!message || !message.event) return;
                // For each type of events
                switch(message.event.type) {
                    // Received a new message
                    case 'm.room.message':
                        if (message.event.decrypted && message.event.decrypted.body) {
                            self.sendDesktopNotification('New message', {
                                body: message.event.decrypted.body,
                                icon: 'img/logobig.png',
                                vibrate: [200, 100, 200, 100, 200, 100, 200],
                                tag: message.event.room_id
                            });
                        }
                        break;
                    // Unknown event type
                    default:
                        console.log("Unknown event type: " + message.event.type);
                }
            });
        }
        if (clbk)
			clbk();
    }

    // Unsubscribe from the notifications
    self.unsubscribe = function(clbk) {
        self.subscribed = true;
        self.subscribeTimestamp = undefined;
        if (clbk)
			clbk();
    }

    // Trigger a desktop notification
    // More info about options here: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#parameters
    self.sendDesktopNotification = function(title, options) {
        self.canSendDesktopNotifications().then(() => {
            if (self.registration) {
                self.registration.showNotification(title, options);
                console.log("Notification sent");
            }
        });
    }



    // ---------------------------------------------------------------
    // Private functions
    // ---------------------------------------------------------------
    // Check if desktop notifications can be sent
    // Resolve: if desktop notifications are allowed
    // Reject: if desktop notifications are denied, or user didn't answer yet
    self.canSendDesktopNotifications = function() {
        return new Promise((resolve, reject) => {
            // Check if notifications are supported
            if (!("Notification" in window))
                return reject('no_supported');
            // Check if notifications are allowed
            if (Notification.permission === "granted")
                return resolve(Notification.permission);
            // If user didn't answer permission, ask him
            if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted")
                        return resolve(permission);
                    return reject(permission);
                });
            } else
                return reject(Notification.permission);
        });
    }
}