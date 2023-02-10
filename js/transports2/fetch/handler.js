const FetchBridgeEventsGroup = 'FetchBridge';

class FetchMainHandler {
  fetch = require('node-fetch');
  requests = {};

  constructor(ipcMain) {
    this.ipcMain = ipcMain;
  }

  send(eventName, requestId, data) {
    const sender = this.requests[requestId].sender;

    // console.log('LEVEL-3: SEND', `${FetchBridgeEventsGroup}:${requestId}:${eventName}`, eventName, requestId, data);

    sender.send(`${FetchBridgeEventsGroup}:${requestId}:${eventName}`, data);
  }

  listen(eventName, requestId, listener) {
    // console.log('LEVEL-3: LISTEN', `${FetchBridgeEventsGroup}:${requestId}:${eventName}`, eventName, requestId);

    this.ipcMain.on(`${FetchBridgeEventsGroup}:${requestId}:${eventName}`, (...args) => {
      // console.log('LEVEL-3: RECEIVE', eventName, requestId, args);

      listener(...args);
    });
  }

  onRequest(listener) {
    this.ipcMain.on(`${FetchBridgeEventsGroup}:Request`, (e, requestId, requestInit) => {
      this.requests[requestId] = { sender: e.sender };
      listener(requestId, requestInit);
    });
  }

  onAbort(requestId) {
    this.listen('Abort', requestId);
  }

  sendInitialData(requestId, initData) {
    this.send('InitialData', requestId, initData);
  }

  sendData(requestId, data) {
    this.send('Data', requestId, [...data]);
  }

  sendEnd(requestId) {
    this.send('End', requestId);
  }

  sendError(requestId, error) {
    this.send('Error', requestId, error);
  }

  static init(ipcMain, options = {}) {
    const self = new FetchMainHandler(ipcMain);

    self.onRequest((requestId, requestData) => {
      const controller = new AbortController();
      const signal = controller.signal;

      const url = requestData.url;

      delete requestData.url;

      const request = options.fetchFunction(url, { signal, ...requestData, ...options.prepareOptions?.(url) })
        .then((data) => {
          if (typeof options.prepareResponse === 'function') {
            return options.prepareResponse(data);
          }

          return data;
        })
        .then((data) => {


          /// /????

          if(!data){
            self.sendData(requestId, '');
            self.sendEnd(requestId);

            return
          }

          try{
            const { status } = data;

            const headers = {};
  
            data.headers.forEach((value, name) => {
              headers[name] = value;
            });
  
            self.sendInitialData(requestId, { status, headers });
  
            data.body.on('data', (chunk) => {
              self.sendData(requestId, chunk);
            });
  
            data.body.on('end', () => {
              self.sendEnd(requestId);
            });
          }

          catch(e){
            console.log(data)
            console.log(e)
          }
          
        })
        .catch((err) => {
          if (err.code !== 'FETCH_ABORTED') {
            self.sendError(requestId);

            throw err;
          }
        });

      //self.requests[message.id].request = request;
      //self.requests[message.id].cancel = () => controller.abort();
    });
  }
}

module.exports = FetchMainHandler;
