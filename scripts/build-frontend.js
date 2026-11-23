/**
 * Build a self-contained website frontend into dist/frontend.
 *
 * Mirrors the packaging used by .github/workflows/deploy.web.yml /
 * night.bastyon.com.yml: run minimize:bastyon, then copy the repo
 * excluding proxy16, cordova, Electron/build tooling, and node_modules.
 *
 * Usage:
 *   node scripts/build-frontend.js
 *   node scripts/build-frontend.js --test
 *   node scripts/build-frontend.js --skip-minimize
 *   node scripts/build-frontend.js --path=/pocketnet/
 */

var fs = require('fs');
var path = require('path');
var { execSync } = require('child_process');

var root = path.resolve(__dirname, '..');
var outDir = path.join(root, 'dist', 'frontend');

// Same excludes as web deploy rsync, plus local/desktop-only noise.
var EXCLUDE = {
	'.git': true,
	'.gitignore': true,
	'.github': true,
	'.cursor': true,
	'package.json': true,
	'package-lock.json': true,
	'pnpm-lock.yaml': true,
	'minimize.json': true,
	'node_modules': true,
	'.well-known': true,
	'assets': true,
	'proxy16': true,
	'cordova': true,
	'res': true,
	'build': true,
	'dist': true,
	'tor': true,
	'tests': true,
	'docs': true
};

function parseArgs(argv) {
	var opts = {
		test: false,
		skipMinimize: false,
		path: null,
		sha: null,
		run: null
	};

	argv.forEach(function (a) {
		if (a === '--test' || a === '-test') {
			opts.test = true;
			return;
		}

		if (a === '--skip-minimize' || a === '-skip-minimize') {
			opts.skipMinimize = true;
			return;
		}

		if (a.indexOf('--path=') === 0 || a.indexOf('-path=') === 0) {
			opts.path = a.split('=').slice(1).join('=');
			return;
		}

		if (a.indexOf('--sha=') === 0 || a.indexOf('-sha=') === 0) {
			opts.sha = a.split('=').slice(1).join('=');
			return;
		}

		if (a.indexOf('--run=') === 0 || a.indexOf('-run=') === 0) {
			opts.run = a.split('=').slice(1).join('=');
			return;
		}
	});

	return opts;
}

function rmrf(dir) {
	fs.rmSync(dir, { recursive: true, force: true });
}

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function shouldSkip(name) {
	return !!EXCLUDE[name];
}

function copyTree(src, dest) {
	ensureDir(dest);

	var entries = fs.readdirSync(src, { withFileTypes: true });

	entries.forEach(function (entry) {
		if (shouldSkip(entry.name)) {
			return;
		}

		var from = path.join(src, entry.name);
		var to = path.join(dest, entry.name);

		if (entry.isSymbolicLink()) {
			return;
		}

		if (entry.isDirectory()) {
			copyTree(from, to);
			return;
		}

		if (entry.isFile()) {
			fs.copyFileSync(from, to);
		}
	});
}

function runMinimize(opts) {
	var script = opts.test ? 'minimize:bastyon:test' : 'minimize:bastyon';
	var extra = [];

	if (opts.path) {
		extra.push('-path=' + opts.path);
	}

	if (opts.sha) {
		extra.push('-sha=' + opts.sha);
	}

	if (opts.run) {
		extra.push('-run=' + opts.run);
	}

	var cmd = 'npm run ' + script + (extra.length ? ' -- ' + extra.join(' ') : '');

	console.log('[build-frontend] ' + cmd);
	execSync(cmd, {
		cwd: root,
		stdio: 'inherit',
		windowsHide: true
	});
}

function main() {
	var opts = parseArgs(process.argv.slice(2));

	console.log('[build-frontend] root =', root);
	console.log('[build-frontend] out  =', outDir);
	console.log('[build-frontend] mode =', opts.test ? 'test' : 'prod');

	if (!opts.skipMinimize) {
		runMinimize(opts);
	} else {
		console.log('[build-frontend] skip minimize');
	}

	console.log('[build-frontend] packing into dist/frontend ...');
	rmrf(outDir);
	ensureDir(path.dirname(outDir));
	copyTree(root, outDir);

	var required = ['index.html', 'js', 'css', 'components', 'chat', 'localization'];
	var missing = required.filter(function (name) {
		return !fs.existsSync(path.join(outDir, name));
	});

	if (missing.length) {
		console.error('[build-frontend] missing required paths:', missing.join(', '));
		console.error('[build-frontend] run without --skip-minimize, or run npm run minimize:bastyon first');
		process.exit(1);
	}

	console.log('[build-frontend] done:', outDir);
}

main();
