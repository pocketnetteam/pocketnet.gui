/*
	PIN lock: an interface lock, not encryption. See docs/pinlock-plan.md.

	Config  (localStorage pinlock_<net>)       : { v, address, salt, iterations, hash, timeout }
	State   (localStorage pinlock_state_<net>) : { locked, lastActivity, fails, blockedUntil }

	State is shared between tabs/windows through the window 'storage' event.
*/

var PinLock = function (app) {

	var self = this;

	var TIMEOUTS = [5, 10, 15, 30, 60];
	var DEFAULT_TIMEOUT = 15;
	var ITERATIONS = 100000;
	var PINLENGTH = 4;
	var MAXFAILS = 5;
	var ACTIVITY_WRITE_INTERVAL = 15000;
	var MOUSEMOVE_THROTTLE = 1000;
	var CALL_RING_MAX = 90 * 1000; /* safety: drop the incoming state if neither onConnected nor onEnded came */

	var net = window.testpocketnet ? 'test' : 'production';
	var configkey = 'pinlock_' + net;
	var statekey = 'pinlock_state_' + net;

	var config = null;
	var state = null;
	var timer = null;
	var inited = false;
	var localActivity = 0;
	var lastActivityWrite = 0;
	var lastMousemove = 0;
	var slots = {};
	var backbuttonBound = false;
	var callShown = false;
	var callTimer = null;

	self.clbks = {
		lock: {},
		unlock: {},
		change: {},
		call: {},
		state: {}
	};

	var now = function () {
		return Date.now();
	};

	var emit = function (type, data) {
		_.each(self.clbks[type], function (clbk) {
			try {
				clbk(data);
			} catch (e) {
				console.error(e);
			}
		});
	};

	var defaultState = function () {
		return {
			locked: false,
			lastActivity: 0,
			fails: 0,
			blockedUntil: 0
		};
	};

	/* storage */

	var storage = {
		read: function (key) {
			try {
				var value = localStorage.getItem(key);

				if (!value) return null;

				var parsed = JSON.parse(value);

				return _.isObject(parsed) ? parsed : null;
			} catch (e) {
				return null;
			}
		},

		write: function (key, value) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
				return true;
			} catch (e) {
				return false;
			}
		},

		remove: function (key) {
			try {
				localStorage.removeItem(key);
			} catch (e) { }
		},

		works: function () {
			try {
				var key = 'pinlock_check';

				localStorage.setItem(key, '1');
				localStorage.removeItem(key);

				return true;
			} catch (e) {
				return false;
			}
		}
	};

	var validConfig = function (c) {
		return c && c.v === 1 && c.address && c.salt && c.hash && c.iterations;
	};

	var loadConfig = function () {
		var c = storage.read(configkey);

		config = validConfig(c) ? c : null;
	};

	var loadState = function () {
		state = _.extend(defaultState(), storage.read(statekey) || {});
	};

	var saveState = function (changes) {
		loadState();

		state = _.extend(state, changes);

		storage.write(statekey, state);
	};

	/* crypto */

	var bytesToHex = function (bytes) {
		return _.map(bytes, function (b) {
			return ('0' + b.toString(16)).slice(-2);
		}).join('');
	};

	var hexToBytes = function (hex) {
		var bytes = new Uint8Array(hex.length / 2);

		for (var i = 0; i < bytes.length; i++) {
			bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
		}

		return bytes;
	};

	var subtle = function () {
		return window.crypto && window.crypto.subtle && window.crypto.getRandomValues ? window.crypto.subtle : null;
	};

	var hash = function (pin, salt, iterations) {
		var s = subtle();

		if (!s) return Promise.reject('crypto');

		return s.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']).then(function (key) {
			return s.deriveBits({
				name: 'PBKDF2',
				salt: hexToBytes(salt),
				iterations: iterations,
				hash: 'SHA-256'
			}, key, 256);
		}).then(function (bits) {
			return bytesToHex(new Uint8Array(bits));
		});
	};

	var randomSalt = function () {
		var bytes = new Uint8Array(16);

		window.crypto.getRandomValues(bytes);

		return bytesToHex(bytes);
	};

	/* helpers */

	var currentAddress = function () {
		var address = deep(app, 'user.address.value');

		if (address) return address;

		try {
			return localStorage['useraddress'] || null;
		} catch (e) {
			return null;
		}
	};

	var nativeSession = function () {
		return !!(window.cordova || (typeof _Electron != 'undefined' && _Electron));
	};

	var timeoutMs = function () {
		return self.getTimeout() * 60 * 1000;
	};

	var lastActivity = function () {
		return Math.max(state.lastActivity || 0, localActivity || 0);
	};

	var blockDelay = function (fails) {
		if (fails < MAXFAILS) return 0;
		if (fails == MAXFAILS) return 30 * 1000;
		if (fails == MAXFAILS + 1) return 60 * 1000;
		if (fails == MAXFAILS + 2) return 5 * 60 * 1000;

		return 15 * 60 * 1000;
	};

	/* connected call (platform.activecall is set in onConnected and cleared in onEnded) */
	var callActive = function () {
		return !!deep(app, 'platform.activecall');
	};

	var mediaActive = function () {
		if (callActive()) return true;

		var video = app.playingvideo;

		return !!(video && video.playing);
	};

	var pauseMedia = function () {
		try {
			if (app.playingvideo && app.playingvideo.playing && app.playingvideo.pause) app.playingvideo.pause();
		} catch (e) { }
	};

	/* timer */

	var clearTimer = function () {
		if (timer) clearTimeout(timer);

		timer = null;
	};

	var schedule = function () {
		clearTimer();

		if (!self.enabled() || state.locked) return;

		var wait = lastActivity() + timeoutMs() - now();

		timer = setTimeout(onTimer, Math.max(wait, 1000));
	};

	var onTimer = function () {
		timer = null;

		if (!self.enabled()) return;

		if (mediaActive()) {
			self.activity(true);
			return;
		}

		self.check();
	};

	/* lock / unlock application */

	var backbutton = function (e) {
		if (e && e.preventDefault) e.preventDefault();

		var bm = deep(window, 'cordova.plugins.backgroundMode');

		if (bm && bm.moveToBackground) bm.moveToBackground();
	};

	var bindBackbutton = function (bind) {
		if (!window.cordova || bind == backbuttonBound) return;

		backbuttonBound = bind;

		if (bind) document.addEventListener('backbutton', backbutton, false);
		else document.removeEventListener('backbutton', backbutton, false);
	};

	var applyLock = function () {
		clearTimer();
		pauseMedia();
		bindBackbutton(true);

		emit('lock');
	};

	var applyUnlock = function () {
		bindBackbutton(false);
		resolveSlots(true);
		schedule();

		emit('unlock');
	};

	var applyClear = function () {
		clearTimer();
		bindBackbutton(false);
		resolveSlots(false);

		config = null;
		state = defaultState();

		emit('change');
		emit('unlock');
	};

	/* gate slots */

	var resolveSlots = function (ok) {
		var current = slots;
		var address = currentAddress();

		slots = {};

		_.each(current, function (slot) {
			slot.resolve(ok && slot.address == address);
		});
	};

	/* events */

	var onStorage = function (e) {
		if (e.key !== configkey && e.key !== statekey && e.key !== null) return;

		var wasLocked = self.locked();
		var wasEnabled = !!config;

		loadConfig();
		loadState();

		if (!self.enabled()) {
			if (wasEnabled) applyClear();
			return;
		}

		if (e.key === configkey || e.key === null) emit('change');

		var isLocked = self.locked();

		if (isLocked && !wasLocked) return applyLock();
		if (!isLocked && wasLocked) return applyUnlock();

		emit('state', self.info());
		schedule();
	};

	var onUserEvent = function (e) {
		if (e.type == 'mousemove') {
			var t = now();

			if (t - lastMousemove < MOUSEMOVE_THROTTLE) return;

			lastMousemove = t;
		}

		self.activity();
	};

	var onVisibility = function () {
		if (document.visibilityState == 'visible') self.check();
	};

	var userevents = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'mousemove'];

	/* Electron main process sends it on OS screen lock and system suspend */
	var bindElectron = function () {
		if (typeof _Electron == 'undefined' || !_Electron || typeof require == 'undefined') return;

		try {
			require('electron').ipcRenderer.on('pinlock-lock', function () {
				self.lock();
			});
		} catch (e) { }
	};

	var bindEvents = function () {
		bindElectron();

		window.addEventListener('storage', onStorage);
		document.addEventListener('visibilitychange', onVisibility);

		_.each(userevents, function (type) {
			document.addEventListener(type, onUserEvent, { capture: true, passive: true });
		});
	};

	/* public api */

	self.available = function () {
		if (typeof _OpenApi != 'undefined' && _OpenApi) return false;
		if (typeof _SEO != 'undefined' && _SEO) return false;
		if (!subtle() || typeof TextEncoder == 'undefined') return false;

		return storage.works();
	};

	self.enabled = function () {
		if (!config) return false;

		var address = currentAddress();

		return !!address && config.address == address;
	};

	self.locked = function () {
		return self.enabled() && !!(state && state.locked);
	};

	self.getTimeout = function () {
		var t = config ? Number(config.timeout) : DEFAULT_TIMEOUT;

		return _.indexOf(TIMEOUTS, t) > -1 ? t : DEFAULT_TIMEOUT;
	};

	self.timeouts = function () {
		return TIMEOUTS.slice();
	};

	self.pinlength = PINLENGTH;

	self.info = function () {
		var fails = state ? state.fails || 0 : 0;

		return {
			fails: fails,
			left: Math.max(MAXFAILS - fails, 0),
			blockedUntil: state ? state.blockedUntil || 0 : 0,
			blockedFor: blockDelay(fails)
		};
	};

	self.validPin = function (pin) {
		return typeof pin == 'string' && new RegExp('^\\d{' + PINLENGTH + '}$').test(pin);
	};

	self.init = function () {
		if (inited || !self.available()) return;

		inited = true;

		loadConfig();
		loadState();

		if (config && config.address != currentAddress()) {
			self.clear();
		}

		bindEvents();

		if (!self.enabled()) return;

		if (nativeSession() || now() - lastActivity() >= timeoutMs()) {
			if (!state.locked) saveState({ locked: true });
		}

		if (state.locked) applyLock();
		else schedule();
	};

	self.activity = function (force) {
		if (!self.enabled() || state.locked) return;

		var t = now();

		localActivity = t;

		if (force || t - lastActivityWrite >= ACTIVITY_WRITE_INTERVAL) {
			lastActivityWrite = t;
			saveState({ lastActivity: t });
		}

		schedule();
	};

	/* called on focus/resume: decide by wall clock, background timers may be frozen */
	self.check = function () {
		if (!self.enabled()) return;

		loadState();

		if (state.locked) return;

		/* call may go on in background/pip longer than the timeout, the app is in use */
		if (callActive()) return self.activity(true);

		if (now() - lastActivity() >= timeoutMs()) return self.lock();

		if (localActivity > (state.lastActivity || 0)) {
			lastActivityWrite = localActivity;
			saveState({ lastActivity: localActivity });
		}

		schedule();
	};

	/* called on pause/blur: persist last activity before timers freeze */
	self.flush = function () {
		if (!self.enabled() || state.locked) return;

		loadState();

		if (localActivity > (state.lastActivity || 0)) {
			lastActivityWrite = localActivity;
			saveState({ lastActivity: localActivity });
		}
	};

	self.lock = function () {
		if (!self.enabled()) return;

		loadState();

		if (state.locked) return;

		saveState({ locked: true });
		applyLock();
	};

	/* verifies pin with shared brute force counter; clbk(error, info) */
	var attempt = function (pin, clbk) {
		if (!self.enabled()) return clbk('disabled', self.info());

		loadState();

		if (state.blockedUntil > now()) return clbk('blocked', self.info());
		if (!self.validPin(pin)) return clbk('wrong', self.info());

		hash(pin, config.salt, config.iterations).then(function (h) {
			if (!self.enabled()) return clbk('disabled', self.info());

			loadState();

			if (h === config.hash) {
				saveState({ fails: 0, blockedUntil: 0 });
				return clbk(null, self.info());
			}

			var fails = (state.fails || 0) + 1;
			var delay = blockDelay(fails);

			saveState({ fails: fails, blockedUntil: delay ? now() + delay : 0 });

			emit('state', self.info());

			clbk(delay ? 'blocked' : 'wrong', self.info());
		}).catch(function (e) {
			console.error(e);
			clbk('crypto', self.info());
		});
	};

	self.unlock = function (pin, clbk) {
		attempt(pin, function (err, info) {
			if (!err) {
				var t = now();

				localActivity = t;
				lastActivityWrite = t;

				saveState({ locked: false, lastActivity: t, fails: 0, blockedUntil: 0 });
				applyUnlock();
			}

			if (clbk) clbk(err, info);
		});
	};

	self.set = function (pin, clbk) {
		var address = currentAddress();

		if (!self.available() || !address) return clbk && clbk('unavailable');
		if (!self.validPin(pin)) return clbk && clbk('format');

		var salt = randomSalt();
		var timeout = self.getTimeout();

		hash(pin, salt, ITERATIONS).then(function (h) {
			var t = now();

			config = {
				v: 1,
				address: address,
				salt: salt,
				iterations: ITERATIONS,
				hash: h,
				timeout: timeout
			};

			if (!storage.write(configkey, config)) {
				config = null;
				return clbk && clbk('storage');
			}

			localActivity = t;
			lastActivityWrite = t;

			saveState({ locked: false, lastActivity: t, fails: 0, blockedUntil: 0 });

			if (!inited) self.init();

			schedule();
			emit('change');

			if (clbk) clbk(null);
		}).catch(function (e) {
			console.error(e);
			if (clbk) clbk('crypto');
		});
	};

	self.verify = function (pin, clbk) {
		attempt(pin, clbk);
	};

	self.change = function (oldpin, newpin, clbk) {
		attempt(oldpin, function (err, info) {
			if (err) return clbk && clbk(err, info);

			self.set(newpin, clbk);
		});
	};

	self.disable = function (pin, clbk) {
		attempt(pin, function (err, info) {
			if (err) return clbk && clbk(err, info);

			self.clear();

			if (clbk) clbk(null);
		});
	};

	self.setTimeout = function (minutes) {
		if (!self.enabled()) return;

		minutes = Number(minutes);

		config.timeout = _.indexOf(TIMEOUTS, minutes) > -1 ? minutes : DEFAULT_TIMEOUT;

		storage.write(configkey, config);

		schedule();
		emit('change');
	};

	self.clear = function () {
		storage.remove(configkey);
		storage.remove(statekey);

		applyClear();
	};

	/*
		Call window state from platform call hooks: 'incoming' | 'active' | false.
		Like on phones, a call can be answered and held without the pin: the call window
		is shown over the lock screen, after the call the lock screen is there again.
	*/
	self.call = function (callstate) {
		clearTimeout(callTimer);
		callTimer = null;

		if (callstate == 'incoming') {
			callTimer = setTimeout(function () {
				if (!callActive()) self.call(false);
			}, CALL_RING_MAX);
		}

		/* pin timeout counts from the call events, after the call from its end */
		self.activity(true);

		if (callShown == !!callstate) return;

		callShown = !!callstate;

		emit('call', callShown);
	};

	self.callshown = function () {
		return callShown;
	};

	/*
		Waits for unlock before an external action (push tap, deeplink, share intent).
		Never rejects. Resolves false when displaced by a newer request of the same slot,
		on clear/signout, or if the account changed meanwhile.
	*/
	self.gate = function (slot) {
		if (!self.locked()) return Promise.resolve(true);

		slot || (slot = 'default');

		if (slots[slot]) slots[slot].resolve(false);

		return new Promise(function (resolve) {
			slots[slot] = {
				resolve: resolve,
				address: currentAddress()
			};
		});
	};

	return self;
};

/*
	Lock screen container. Shows an opaque stub immediately (before modules and css are loaded),
	then renders components/pinlock over it once the application is ready.
*/

var PinLockScreen = function (app, pinlock) {

	var self = this;

	var el = null;
	var ready = false;
	var moduleP = null;
	var loading = false;
	var hideTimer = null;
	var scrollOff = false;

	var stubBackgrounds = {
		black: 'linear-gradient(160deg, rgb(3, 15, 27), rgb(14, 28, 43))',
		gray: 'linear-gradient(160deg, #141310, #1e1d1a)',
		white: 'linear-gradient(160deg, #F0F2F5, #fff)'
	};

	var stubBackground = function () {
		var theme = 'white';

		try {
			theme = localStorage['usertheme'] || theme;
		} catch (e) { }

		return stubBackgrounds[theme] || stubBackgrounds.white;
	};

	/* app scroll lock is a counter shared with windows, so call offScroll/onScroll strictly in pairs */
	var toggleScroll = function (off) {
		if (scrollOff == off || !deep(app, 'actions.offScroll')) return;

		scrollOff = off;

		if (off) app.actions.offScroll();
		else app.actions.onScroll();
	};

	var callsEl = function () {
		return document.getElementById('bastyonCalls');
	};

	/* call window over the lock screen while a call is shown (see PinLock.call), only while locked */
	var liftCalls = function (lift) {
		var c = callsEl();

		if (!c) return;

		lift = !!(lift && el);

		c.style.position = lift ? 'relative' : '';
		c.style.zIndex = lift ? '10000020' : '';
	};

	var onCall = function (shown) {
		liftCalls(shown);

		if (!shown && el) el[0].focus();
	};

	var onFocusIn = function (e) {
		if (!el || el[0].contains(e.target)) return;

		var c = callsEl();

		if (pinlock.callshown() && c && c.contains(e.target)) return;

		el[0].focus();
	};

	/* keep application hotkeys away while locked; digits and Backspace go on to the lock screen */
	var onKey = function (e) {
		if (!el) return;
		if (/^[0-9]$/.test(e.key) || e.key == 'Backspace' || e.key == 'Tab') return;

		if (e.key == 'Escape') e.preventDefault();

		e.stopPropagation();
	};

	var create = function () {
		el = $('<div class="pinlockOverlay" tabindex="-1"><div class="pinlockContent"></div></div>');

		el.css({
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 10000010,
			background: stubBackground()
		});

		$('body').append(el);
		$('html').addClass('pinlocked');

		toggleScroll(true);

		document.addEventListener('focusin', onFocusIn, true);
		window.addEventListener('keydown', onKey, true);

		if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

		el[0].focus();

		liftCalls(pinlock.callshown());
	};

	var destroyModule = function () {
		if (moduleP && moduleP.clearessense) moduleP.clearessense();

		moduleP = null;
	};

	var remove = function () {
		destroyModule();

		document.removeEventListener('focusin', onFocusIn, true);
		window.removeEventListener('keydown', onKey, true);

		if (el) el.remove();

		el = null;

		liftCalls(false);

		$('html').removeClass('pinlocked');

		toggleScroll(false);
	};

	var load = function () {
		if (!el || !ready || moduleP || loading) return;

		loading = true;

		app.nav.api.load({
			open: true,
			id: 'pinlock',
			eid: 'pinlockscreen',
			el: el.find('.pinlockContent'),
			essenseData: {
				mode: 'unlock'
			},
			clbk: function (e, p) {
				loading = false;

				if (!el) {
					if (p && p.clearessense) p.clearessense();
					return;
				}

				moduleP = p;
			}
		});
	};

	self.show = function () {
		clearTimeout(hideTimer);

		if (el) {
			el.removeClass('leaving');
			return;
		}

		create();
		load();
	};

	self.hide = function () {
		if (!el || el.hasClass('leaving')) return;

		var finish = function () {
			remove();
		};

		el.addClass('leaving');

		if (!moduleP) return finish();

		/* success ring animation, then fade out (see .pinlockOverlay.leaving) */
		hideTimer = setTimeout(finish, 500);
	};

	/* called when navigation and modules are available */
	self.ready = function () {
		ready = true;

		load();
	};

	pinlock.clbks.lock.screen = self.show;
	pinlock.clbks.unlock.screen = self.hide;
	pinlock.clbks.call.screen = onCall;

	return self;
};

if (typeof module != 'undefined') {
	module.exports = PinLock;
}
