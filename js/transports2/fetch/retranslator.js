const FetchBridgeEventsGroup = 'FetchBridge'

class FetchRetranslator {
  onmessageListeners = {};

  constructor(broadcastChannelName, ipcRenderer) {
    this.broadcastChannel = new BroadcastChannel(broadcastChannelName);
    this.ipcRenderer = ipcRenderer;

    this.broadcastChannel.onmessage = async ({data: message}) => {
      if (message.name in this.onmessageListeners) {
        this.onmessageListeners[message.name](message.id, message.data);
      }
    };

    this.onMessage('Request', (requestId, data) => {
      this.onInitialData(requestId, (initData) => {
        this.postMessage('InitialData', requestId, initData);
      });

      this.onData(requestId, (data) => {
        this.postMessage('Data', requestId, data);
      });

      this.onEnd(requestId, () => {
        this.postMessage('End', requestId);
      });

      this.onError(requestId, (err) => {
        this.postMessage('Error', err);
      });

      this.sendRequest(requestId, data);
    });

    this.onMessage('Abort', (requestId) => {
      this.sendAbort(requestId);
    });
  }

  postMessage(eventName, requestId, data) {
    // console.log('LEVEL-2: SEND', eventName, requestId, data);

    const message = {
      name: eventName,
      id: requestId,
    };

    if (data) {
      message.data = data;
    }

    // console.log('Broadcast SH008', message);
    this.broadcastChannel.postMessage(message);
  }

  onMessage(eventName, listener) {
    // console.log('LEVEL-2: LISTEN', eventName);

    this.onmessageListeners[eventName] = listener;
  }

  sendRequest(requestId, request) {
    this.ipcRenderer.send(`${FetchBridgeEventsGroup}:Request`, requestId, request);
  }

  sendAbort(requestId) {
    this.ipcRenderer.send(`${FetchBridgeEventsGroup}:${requestId}:Abort`);
  }

  onInitialData(requestId, listener) {
    this.ipcRenderer.on(`${FetchBridgeEventsGroup}:${requestId}:InitialData`, (e, initData) => listener(initData));
  }

  onData(requestId, listener) {
    this.ipcRenderer.on(`${FetchBridgeEventsGroup}:${requestId}:Data`, (e, data) => listener(data));
  }

  onEnd(requestId, listener) {
    this.ipcRenderer.on(`${FetchBridgeEventsGroup}:${requestId}:End`, (e) => listener());
  }

  onError(requestId, listener) {
    this.ipcRenderer.on(`${FetchBridgeEventsGroup}:${requestId}:Error`, (e, error) => listener(error));
  }

  static init(broadcastChannelName, ipcRenderer) {
    return new FetchRetranslator(broadcastChannelName, ipcRenderer);
  }
}

module.exports = FetchRetranslator;
