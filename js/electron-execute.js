const electron = require('electron');

console.log('electron', electron);

let mainWindow;

// function createWindow () {
//   mainWindow = new BrowserWindow({width: 800, height: 600})
//   mainWindow.loadFile('index.html');
// }

// app.on('ready', createWindow);

var link;

// This will catch clicks on links such as <a href="foobar://abc=1">open in foobar</a>
// app.on('open-url', function (event, data) {
//   event.preventDefault();
//   link = data;
// });

// app.setAsDefaultProtocolClient('foobar');

// Export so you can access it from the renderer thread
module.exports.getLink = () => link;