const { exec } = require('child_process');

const MIN_NPM_VERSION = 7;
const MIN_NODE_VERSION = 18;

const BG_RED = '\x1b[41m%s\x1b[0m';
const TXT_RED = '\x1b[31m%s\x1b[0m';

const Heading = '********** BASTYON MANDATORY DEPENDENCIES **********';
const Ending =  '****************************************************';

exec('npm -v', (err, stdout, stderr) => {
	const npmVersion = stdout.match(/\d{1,2}\.\d{1,2}\.\d{1,2}/g)[0];
	const nodeVersion = process.versions.node;

	const logs = [];

	if (parseInt(npmVersion) < MIN_NPM_VERSION) {
		logs.push(`We require the use of NPM version at least ${MIN_NPM_VERSION}`);
	}

	if (parseInt(nodeVersion) < MIN_NODE_VERSION) {
		logs.push(`We require the use of Node.js version at least ${MIN_NODE_VERSION}`);
	}

	if (logs.length > 0) {
		console.log(BG_RED, Heading);
		console.log(TXT_RED, logs.join('\n'));
		console.log(BG_RED, Ending);

		process.exit(1);
	}
});
