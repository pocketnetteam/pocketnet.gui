const core = require('@actions/core');
const { spawn } = require('child_process');

function isNotaryToolAvailable() {
    const command = spawn('xcrun', ['--find', 'notarytool']);

    command.on('exit', function (code, signal) {
        core.info(`EXIT: ${code} ${signal}`);
    });

    command.stdout.on('data', (data) => {
        core.info(`STDOUT:\n${data}`);
    });
    
    command.stderr.on('data', (data) => {
        core.info(`STDERR:\n${data}`);
    });
}

isNotaryToolAvailable();
