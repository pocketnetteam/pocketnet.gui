class StubBroadcastChannel {
    constructor(name) {
        console.warn(`BroadcastChannel is not supported on this platform. Channel: "${name}"`);
        this.name = name;
        this.onmessage = null;
    }

    postMessage(_data) {
        console.warn(`BroadcastChannel.postMessage() called on unsupported platform. Channel: "${this.name}"`);
    }

    close() {
        // No-op
    }
}

class Broadcaster {
    listeners = {};
    handlers = {};

    constructor(name) {

        const Channel = typeof BroadcastChannel !== 'undefined'
            ? BroadcastChannel
            : StubBroadcastChannel;
        this.channel = new Channel(name);

        this.channel.onmessage = ({ data: message }) => {
            if (!this.listeners[message.name]) {
                return;
            }

            const listenerIds = Object.keys(this.listeners[message.name]);

            listenerIds.forEach((listenerId) => {
                this.listeners[message.name][listenerId](message.data);
            });
        };
    }

    generateId() {
        return (Math.random() + 1).toString(36).substring(2);
    }

    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = {};
        }

        const listenerId = Object.keys(this.listeners[name]).length;

        this.listeners[name][listenerId] = listener;

        return listenerId;
    }

    once(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = {};
        }

        const listenerId = Object.keys(this.listeners[name]).length;

        this.listeners[name][listenerId] = (...args) => {
            listener(...args);
            delete this.listeners[name][listenerId];
        };

        return listenerId;
    }

    remove(name, listenerId) {
        delete this.listeners[name][listenerId];
    }

    send(name, data) {
        this.channel.postMessage({ name, data });
    }

    handle(name, listener) {
        this.on(name, async (message) => {
            const result = await listener(message.data);

            this.send(`${name}_result[${message.id}]`, result);
        });
    }

    handleOnce(name, listener) {
        this.once(name, async (message) => {
            const result = await listener(message.data);

            this.send(`${name}_result[${message.id}]`, result);
        });
    }

    invoke(name, data) {
        const id = this.generateId();

        return new Promise((resolve) => {
            this.on(`${name}_result[${id}]`, (data) => {
                resolve(data);
            });

            this.send(name, { id, data });
        });
    }

    removeAllNamed(name) {
        delete this.listeners[name];
    }

    removeAllListeners() {
        this.listeners = {};
    }
}

self.Broadcaster = Broadcaster;

if (typeof module !== 'undefined') {
    module.exports = Broadcaster;
}
