/**
 * Build a self-contained website frontend into dist/frontend.
 *
 * Mirrors the packaging used by .github/workflows/deploy.web.yml /
 * night.bastyon.com.yml, but without mutating the repo root:
 * copy sources into dist/frontend first, then run minimize there
 * (cwd = outDir, -skipcopy so cordova/www is not created under dist).
 *
 * Usage:
 *   node scripts/build-frontend.js
 *   node scripts/build-frontend.js --test
 *   node scripts/build-frontend.js --skip-minimize
 *   node scripts/build-frontend.js --path=/pocketnet/
 */

var fs = require('fs');
var path = require('path');
var { execFileSync, execSync } = require('child_process');

var root = path.resolve(__dirname, '..');
var outDir = path.join(root, 'dist', 'frontend');
var minimizeJs = path.join(root, 'minimize.js');

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
	'docs': true,
	// Mirror hosts serve static index.html only (no PHP/OG runtime).
	'php': true
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

function copyTree(src, dest, atRoot) {
	ensureDir(dest);

	var entries = fs.readdirSync(src, { withFileTypes: true });

	entries.forEach(function (entry) {
		// EXCLUDE applies only to repo-root names (e.g. top-level assets/),
		// not nested paths like js/vendor/owl/assets/.
		if (atRoot && EXCLUDE[entry.name]) {
			return;
		}

		var from = path.join(src, entry.name);
		var to = path.join(dest, entry.name);

		if (entry.isSymbolicLink()) {
			return;
		}

		if (entry.isDirectory()) {
			copyTree(from, to, false);
			return;
		}

		if (entry.isFile()) {
			fs.copyFileSync(from, to);
		}
	});
}

function resolveSha(opts) {
	if (opts.sha) {
		return opts.sha;
	}

	try {
		return execSync('git rev-parse HEAD', {
			cwd: root,
			encoding: 'utf8',
			windowsHide: true
		}).trim();
	} catch (e) {
		return null;
	}
}

function runMinimize(opts) {
	var sha = resolveSha(opts);
	var args = [
		minimizeJs,
		'-prodaction=true',
		'-vendor=30069',
		'-path=' + (opts.path || '/'),
		'-project=Bastyon',
		'-skipcopy=true'
	];

	if (opts.test) {
		args.push('-test=true');
	}

	if (sha) {
		args.push('-sha=' + sha);
	}

	if (opts.run) {
		args.push('-run=' + opts.run);
	}

	console.log('[build-frontend] node minimize.js (cwd=' + outDir + ')');
	console.log('[build-frontend] args:', args.slice(1).join(' '));

	execFileSync(process.execPath, args, {
		cwd: outDir,
		stdio: 'inherit',
		windowsHide: true
	});
}

function main() {
	var opts = parseArgs(process.argv.slice(2));

	console.log('[build-frontend] root =', root);
	console.log('[build-frontend] out  =', outDir);
	console.log('[build-frontend] mode =', opts.test ? 'test' : 'prod');

	console.log('[build-frontend] packing sources into dist/frontend ...');
	rmrf(outDir);
	ensureDir(path.dirname(outDir));
	copyTree(root, outDir, true);

	if (!opts.skipMinimize) {
		runMinimize(opts);
	} else {
		console.log('[build-frontend] skip minimize');
	}

	// Cordova must never land in the mirror package.
	rmrf(path.join(outDir, 'cordova'));

	var required = ['index.html', 'js', 'css', 'components', 'chat', 'localization'];
	var missing = required.filter(function (name) {
		return !fs.existsSync(path.join(outDir, name));
	});

	if (missing.length) {
		console.error('[build-frontend] missing required paths:', missing.join(', '));
		console.error('[build-frontend] run without --skip-minimize');
		process.exit(1);
	}

	assertProductionMirror(outDir, opts);

	console.log('[build-frontend] done:', outDir);
}

/**
 * Mirror packages must be production minimize (joined bundles, path=/),
 * not a local `npm run dev:bastyon` tree.
 */
function assertProductionMirror(dir, opts) {
	var indexPath = path.join(dir, 'index.html');
	var html = fs.readFileSync(indexPath, 'utf8');
	var problems = [];

	if (html.indexOf('window.design = true') !== -1) {
		problems.push('index.html has window.design=true (dev minimize)');
	}

	if (html.indexOf('pocketnetpublicpath = "/pocketnet/"') !== -1) {
		problems.push('index.html still has path=/pocketnet/ (use minimize:bastyon -path=/)');
	}

	if (!opts.test) {
		if (html.indexOf('js/join.min.js') === -1 && html.indexOf('js/joinfirst.min.js') === -1) {
			problems.push('index.html missing join.min.js / joinfirst.min.js (production bundles)');
		}

		if (!fs.existsSync(path.join(dir, 'js', 'join.min.js'))) {
			problems.push('js/join.min.js file missing');
		}

		if (!fs.existsSync(path.join(dir, 'css', 'master.css'))) {
			problems.push('css/master.css missing (production CSS bundle)');
		}
	}

	if (fs.existsSync(path.join(dir, 'cordova'))) {
		problems.push('cordova/ must not be present in dist/frontend');
	}

	if (problems.length) {
		console.error('[build-frontend] production mirror checks failed:');
		problems.forEach(function (p) {
			console.error('  - ' + p);
		});
		console.error('[build-frontend] run: npm run build:frontend   (without --skip-minimize)');
		process.exit(1);
	}

	console.log('[build-frontend] production mirror checks ok');
}

main();
