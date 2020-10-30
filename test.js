
const child_process = require('child_process');

var ld = 'LD_LIBRARY_PATH=/home/loki/work/pocketnet.gui/node_modules/electron/dist/'
var exe = '/home/loki/work/pocketnet.gui/node_modules/electron/dist/pocketcoind'


var instance = child_process.spawn(`${ld} ${exe}`, [], { stdio: 'ignore', shell : true })

instance.on('close', function(code) {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});

