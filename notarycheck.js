const { spawn } = require('child_process');

function isNotaryToolAvailable() {
    const command = spawn('xcrun', ['--find', 'notarytool']);

    command.on('exit', function (code, signal) {
        console.log(`EXIT: ${code} ${signal}`);
    });

    command.stdout.on('data', (data) => {
        console.log(`STDOUT:\n${data}`);
    });
    
    command.stderr.on('data', (data) => {
        console.log(`STDERR:\n${data}`);
    });
}

isNotaryToolAvailable();
