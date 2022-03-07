/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./peertube/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __awaiter; });
/* unused harmony export __generator */
/* unused harmony export __createBinding */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __spreadArrays */
/* unused harmony export __spreadArray */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/* unused harmony export __classPrivateFieldGet */
/* unused harmony export __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

/*
 * js_channel is a very lightweight abstraction on top of
 * postMessage which defines message formats and semantics
 * to support interactions more rich than just message passing
 * js_channel supports:
 *  + query/response - traditional rpc
 *  + query/update/response - incremental async return of results
 *    to a query
 *  + notifications - fire and forget
 *  + error handling
 *
 * js_channel is based heavily on json-rpc, but is focused at the
 * problem of inter-iframe RPC.
 *
 * Message types:
 *  There are 5 types of messages that can flow over this channel,
 *  and you may determine what type of message an object is by
 *  examining its parameters:
 *  1. Requests
 *    + integer id
 *    + string method
 *    + (optional) any params
 *  2. Callback Invocations (or just "Callbacks")
 *    + integer id
 *    + string callback
 *    + (optional) params
 *  3. Error Responses (or just "Errors)
 *    + integer id
 *    + string error
 *    + (optional) string message
 *  4. Responses
 *    + integer id
 *    + (optional) any result
 *  5. Notifications
 *    + string method
 *    + (optional) any params
 */

// Universal module definition //
(function (root, factory) {
  if (true) {
    // CommonJS
    module.exports = factory();
  } else {}
}(this, function () {
  "use strict";
  var Channel = (function() {

    // current transaction id, start out at a random *odd* number between 1 and a million
    // There is one current transaction counter id per page, and it's shared between
    // channel instances.  That means of all messages posted from a single javascript
    // evaluation context, we'll never have two with the same id.
    var s_curTranId = Math.floor(Math.random()*1000001);

    // no two bound channels in the same javascript evaluation context may have the same origin, scope, and window.
    // further if two bound channels have the same window and scope, they may not have *overlapping* origins
    // (either one or both support '*').  This restriction allows a single onMessage handler to efficiently
    // route messages based on origin and scope.  The s_boundChans maps origins to scopes, to message
    // handlers.  Request and Notification messages are routed using this table.
    // Finally, channels are inserted into this table when built, and removed when destroyed.
    var s_boundChans = { };

    // add a channel to s_boundChans, throwing if a dup exists
    function s_addBoundChan(win, origin, scope, handler) {
        function hasWin(arr) {
            for (var i = 0; i < arr.length; i++) if (arr[i].win === win) return true;
            return false;
        }

        // does she exist?
        var exists = false;

        if (origin === '*') {
            // we must check all other origins, sadly.
            for (var k in s_boundChans) {
                if (!s_boundChans.hasOwnProperty(k)) continue;
                if (k === '*') continue;
                if (typeof s_boundChans[k][scope] === 'object') {
                    exists = hasWin(s_boundChans[k][scope]);
                    if (exists) break;
                }
            }
        } else {
            // we must check only '*'
            if ((s_boundChans['*'] && s_boundChans['*'][scope])) {
                exists = hasWin(s_boundChans['*'][scope]);
            }
            if (!exists && s_boundChans[origin] && s_boundChans[origin][scope])
            {
                exists = hasWin(s_boundChans[origin][scope]);
            }
        }
        if (exists) throw "A channel is already bound to the same window which overlaps with origin '"+ origin +"' and has scope '"+scope+"'";

        if (typeof s_boundChans[origin] != 'object') s_boundChans[origin] = { };
        if (typeof s_boundChans[origin][scope] != 'object') s_boundChans[origin][scope] = [ ];
        s_boundChans[origin][scope].push({win: win, handler: handler});
    }

    function s_removeBoundChan(win, origin, scope) {
        var arr = s_boundChans[origin][scope];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].win === win) {
                arr.splice(i,1);
            }
        }
        if (s_boundChans[origin][scope].length === 0) {
            delete s_boundChans[origin][scope];
        }
    }

    function s_isArray(obj) {
        if (Array.isArray) return Array.isArray(obj);
        else {
            return (obj.constructor.toString().indexOf("Array") != -1);
        }
    }

    // No two outstanding outbound messages may have the same id, period.  Given that, a single table
    // mapping "transaction ids" to message handlers, allows efficient routing of Callback, Error, and
    // Response messages.  Entries are added to this table when requests are sent, and removed when
    // responses are received.
    var s_transIds = { };

    // class singleton onMessage handler
    // this function is registered once and all incoming messages route through here.  This
    // arrangement allows certain efficiencies, message data is only parsed once and dispatch
    // is more efficient, especially for large numbers of simultaneous channels.
    var s_onMessage = function(e) {
        try {
          var m = JSON.parse(e.data);
          if (typeof m !== 'object' || m === null) throw "malformed";
        } catch(e) {
          // just ignore any posted messages that do not consist of valid JSON
          return;
        }

        var w = e.source;
        var o = e.origin;
        var s, i, meth;

        if (typeof m.method === 'string') {
            var ar = m.method.split('::');
            if (ar.length == 2) {
                s = ar[0];
                meth = ar[1];
            } else {
                meth = m.method;
            }
        }

        if (typeof m.id !== 'undefined') i = m.id;

        // w is message source window
        // o is message origin
        // m is parsed message
        // s is message scope
        // i is message id (or undefined)
        // meth is unscoped method name
        // ^^ based on these factors we can route the message

        // if it has a method it's either a notification or a request,
        // route using s_boundChans
        if (typeof meth === 'string') {
            var delivered = false;
            if (s_boundChans[o] && s_boundChans[o][s]) {
                for (var j = 0; j < s_boundChans[o][s].length; j++) {
                    if (s_boundChans[o][s][j].win === w) {
                        s_boundChans[o][s][j].handler(o, meth, m);
                        delivered = true;
                        break;
                    }
                }
            }

            if (!delivered && s_boundChans['*'] && s_boundChans['*'][s]) {
                for (var j = 0; j < s_boundChans['*'][s].length; j++) {
                    if (s_boundChans['*'][s][j].win === w) {
                        s_boundChans['*'][s][j].handler(o, meth, m);
                        break;
                    }
                }
            }
        }
        // otherwise it must have an id (or be poorly formed
        else if (typeof i != 'undefined') {
            if (s_transIds[i]) s_transIds[i](o, meth, m);
        }
    };

    // Setup postMessage event listeners
    if (window.addEventListener) window.addEventListener('message', s_onMessage, false);
    else if(window.attachEvent) window.attachEvent('onmessage', s_onMessage);

    /* a messaging channel is constructed from a window and an origin.
     * the channel will assert that all messages received over the
     * channel match the origin
     *
     * Arguments to Channel.build(cfg):
     *
     *   cfg.window - the remote window with which we'll communicate
     *   cfg.origin - the expected origin of the remote window, may be '*'
     *                which matches any origin
     *   cfg.scope  - the 'scope' of messages.  a scope string that is
     *                prepended to message names.  local and remote endpoints
     *                of a single channel must agree upon scope. Scope may
     *                not contain double colons ('::').
     *   cfg.debugOutput - A boolean value.  If true and window.console.log is
     *                a function, then debug strings will be emitted to that
     *                function.
     *   cfg.postMessageObserver - A function that will be passed two arguments,
     *                an origin and a message.  It will be passed these immediately
     *                before messages are posted.
     *   cfg.gotMessageObserver - A function that will be passed two arguments,
     *                an origin and a message.  It will be passed these arguments
     *                immediately after they pass scope and origin checks, but before
     *                they are processed.
     *   cfg.onReady - A function that will be invoked when a channel becomes "ready",
     *                this occurs once both sides of the channel have been
     *                instantiated and an application level handshake is exchanged.
     *                the onReady function will be passed a single argument which is
     *                the channel object that was returned from build().
     *   cfg.reconnect - A boolean value - if true, the channel allows reconnection
     *                useful when the page in a child frame is reloaded and wants
     *                to re-establish connection with parent window using the same
     *                origin, scope and bindings.
     *   cfg.publish - A boolean value. If true, bind will automatically publish
     *                the method on the remote side. The method will be published under
     *                channelObject.remote, but it will not be available before the onReady
     *                callback is called on the other side.
     *   cfg.remote - An array of method names for which stubs should be generated without
     *                waiting for remote end to publish them. A string (for a single method name)
     *                is also accepted. This allows methods under channelObject.remote to be called
     *                also before onReady callback is called; the invocations will be queued until
     *                the channel is ready. If the methods do not exist on remote side, the
     *                error callback will be called.
     */
    return {
        build: function(cfg) {
            var debug = function(m) {
                if (cfg.debugOutput && window.console && window.console.log) {
                    // try to stringify, if it doesn't work we'll let javascript's built in toString do its magic
                    try {
                        if (typeof m !== 'string') {
                            m = JSON.stringify(m);
                        }
                    }
                    catch(e) {
                    }
                    window.console.log("["+chanId+"] " + m);
                }
            };

            /* browser capabilities check */
            if (!window.postMessage) throw("jschannel cannot run this browser, no postMessage");
            if (!window.JSON || !window.JSON.stringify || ! window.JSON.parse) {
                throw("jschannel cannot run this browser, no JSON parsing/serialization");
            }

            /* basic argument validation */
            if (typeof cfg != 'object') throw("Channel build invoked without a proper object argument");

            if (!cfg.window || !cfg.window.postMessage) throw("Channel.build() called without a valid window argument");

            /* we'd have to do a little more work to be able to run multiple channels that intercommunicate the same
             * window...  Not sure if we care to support that */
            if (window === cfg.window) debug("target window is same as present window -- use at your own risk");

            // let's require that the client specify an origin.  if we just assume '*' we'll be
            // propagating unsafe practices.  that would be lame.
            var validOrigin = false;
            if (typeof cfg.origin === 'string') {
                var oMatch;
                if (cfg.origin === "*") validOrigin = true;
                // allow valid domains under http and https.  Also, trim paths off otherwise valid origins.
                else if (null !== (oMatch = cfg.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/))) {
                    cfg.origin = oMatch[0].toLowerCase();
                    validOrigin = true;
                }
            }

            if (!validOrigin) throw ("Channel.build() called with an invalid origin");

            if (typeof cfg.scope !== 'undefined') {
                if (typeof cfg.scope !== 'string') throw 'scope, when specified, must be a string';
                if (cfg.scope.split('::').length > 1) throw "scope may not contain double colons: '::'";
            } else {
                cfg.scope = "__default";
            }

            /* private variables */
            // generate a random and psuedo unique id for this channel
            var chanId = (function () {
                var text = "";
                var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for(var i=0; i < 5; i++) text += alpha.charAt(Math.floor(Math.random() * alpha.length));
                return text;
            })();

            // registrations: mapping method names to call objects
            var regTbl = { };
            // current oustanding sent requests
            var outTbl = { };
            // current oustanding received requests
            var inTbl = { };
            // are we ready yet?  when false we will block outbound messages.
            var ready = false;
            var pendingQueue = [ ];
            var publishQueue = [ ];

            var createTransaction = function(id,origin,callbacks) {
                var shouldDelayReturn = false;
                var completed = false;

                return {
                    origin: origin,
                    invoke: function(cbName, v) {
                        // verify in table
                        if (!inTbl[id]) throw "attempting to invoke a callback of a nonexistent transaction: " + id;
                        // verify that the callback name is valid
                        var valid = false;
                        for (var i = 0; i < callbacks.length; i++) if (cbName === callbacks[i]) { valid = true; break; }
                        if (!valid) throw "request supports no such callback '" + cbName + "'";

                        // send callback invocation
                        postMessage({ id: id, callback: cbName, params: v});
                    },
                    error: function(error, message) {
                        completed = true;
                        // verify in table
                        if (!inTbl[id]) throw "error called for nonexistent message: " + id;

                        // remove transaction from table
                        delete inTbl[id];

                        // send error
                        postMessage({ id: id, error: error, message: message });
                    },
                    complete: function(v) {
                        completed = true;
                        // verify in table
                        if (!inTbl[id]) throw "complete called for nonexistent message: " + id;
                        // remove transaction from table
                        delete inTbl[id];
                        // send complete
                        postMessage({ id: id, result: v });
                    },
                    delayReturn: function(delay) {
                        if (typeof delay === 'boolean') {
                            shouldDelayReturn = (delay === true);
                        }
                        return shouldDelayReturn;
                    },
                    completed: function() {
                        return completed;
                    }
                };
            };

            var setTransactionTimeout = function(transId, timeout, method) {
              return window.setTimeout(function() {
                if (outTbl[transId]) {
                  // XXX: what if client code raises an exception here?
                  var msg = "timeout (" + timeout + "ms) exceeded on method '" + method + "'";
                  if (outTbl[transId].error) {
                      outTbl[transId].error("timeout_error", msg);
                  }
                  delete outTbl[transId];
                  delete s_transIds[transId];
                }
              }, timeout);
            };

            var onMessage = function(origin, method, m) {
                // if an observer was specified at allocation time, invoke it
                if (typeof cfg.gotMessageObserver === 'function') {
                    // pass observer a clone of the object so that our
                    // manipulations are not visible (i.e. method unscoping).
                    // This is not particularly efficient, but then we expect
                    // that message observers are primarily for debugging anyway.
                    try {
                        cfg.gotMessageObserver(origin, m);
                    } catch (e) {
                        debug("gotMessageObserver() raised an exception: " + e.toString());
                    }
                }

                // now, what type of message is this?
                if (m.id && method) {
                    inTbl[m.id] = { };
                    var trans = createTransaction(m.id, origin, m.callbacks ? m.callbacks : [ ]);
                    // a request!  do we have a registered handler for this request?
                    if (regTbl[method]) {
                        try {
                            // callback handling.  we'll magically create functions inside the parameter list for each
                            // callback
                            if (m.callbacks && s_isArray(m.callbacks) && m.callbacks.length > 0) {
                                for (var i = 0; i < m.callbacks.length; i++) {
                                    var path = m.callbacks[i];
                                    var obj = m.params;
                                    var pathItems = path.split('/');
                                    for (var j = 0; j < pathItems.length - 1; j++) {
                                        var cp = pathItems[j];
                                        if (typeof obj[cp] !== 'object') obj[cp] = { };
                                        obj = obj[cp];
                                    }
                                    obj[pathItems[pathItems.length - 1]] = (function() {
                                        var cbName = path;
                                        return function(params) {
                                            return trans.invoke(cbName, params);
                                        };
                                    })();
                                }
                            }
                            var resp = regTbl[method](trans, m.params);
                            if (!trans.delayReturn() && !trans.completed()) trans.complete(resp);
                        } catch(e) {
                            // automagic handling of exceptions:
                            var error = "runtime_error";
                            var message = null;
                            // * if it's a string then it gets an error code of 'runtime_error' and string is the message
                            if (typeof e === 'string') {
                                message = e;
                            } else if (typeof e === 'object') {
                                // if it's an Error instance we use the constructor name to set the error property
                                // and we just copy the error message
                                if (e instanceof Error) {
                                    error = e.constructor.name;
                                    message = e.message;
                                }
                                // Otherwise, it's either an array or an object
                                // * if it's an array of length two, then  array[0] is the code, array[1] is the error message
                                else if (e && s_isArray(e) && e.length == 2) {
                                    error = e[0];
                                    message = e[1];
                                }
                                // * if it's an object then we'll look form error and message parameters
                                else if (typeof e.error === 'string') {
                                    error = e.error;
                                    if (!e.message) message = "";
                                    else if (typeof e.message === 'string') message = e.message;
                                    else e = e.message; // let the stringify/toString message give us a reasonable verbose error string
                                }
                            }

                            // message is *still* null, let's try harder
                            if (message === null) {
                                try {
                                    message = JSON.stringify(e);
                                    /* On MSIE8, this can result in 'out of memory', which
                                     * leaves message undefined. */
                                    if (typeof(message) == 'undefined')
                                      message = e.toString();
                                } catch (e2) {
                                    message = e.toString();
                                }
                            }

                            trans.error(error,message);
                        }
                    } else { // if no method found, send error
                        trans.error("method_not_found", "No method '" + method + "' was (yet) bound by the provider");
                    }
                } else if (m.id && m.callback) {
                    if (!outTbl[m.id] ||!outTbl[m.id].callbacks || !outTbl[m.id].callbacks[m.callback])
                    {
                        debug("ignoring invalid callback, id:"+m.id+ " (" + m.callback +")");
                    } else {
                        // XXX: what if client code raises an exception here?
                        outTbl[m.id].callbacks[m.callback](m.params);
                    }
                } else if (m.id) {
                    if (!outTbl[m.id]) {
                        debug("ignoring invalid response: " + m.id);
                    } else {
                        // XXX: what if client code raises an exception here?
                        if (m.error) {
                            // We might not have an error callback
                            if(outTbl[m.id].error) {
                                outTbl[m.id].error(m.error, m.message);
                            }
                        } else {
                            // But we always have a success callback
                            if (m.result !== undefined) {
                                outTbl[m.id].success(m.result);
                            } else {
                                outTbl[m.id].success();
                            }
                        }
                        delete outTbl[m.id];
                        delete s_transIds[m.id];
                    }
                } else if (method) {
                    // tis a notification.
                    if (regTbl[method]) {
                        // yep, there's a handler for that.
                        // transaction has only origin for notifications.
                        regTbl[method]({ origin: origin }, m.params);
                        // if the client throws, we'll just let it bubble out
                        // what can we do?  Also, here we'll ignore return values
                    }
                }
            };

            // now register our bound channel for msg routing
            s_addBoundChan(cfg.window, cfg.origin, cfg.scope, onMessage);

            // scope method names based on cfg.scope specified when the Channel was instantiated
            var scopeMethod = function(m) {
                return [cfg.scope, m].join("::");
            };

            // a small wrapper around postmessage whose primary function is to handle the
            // case that clients start sending messages before the other end is "ready"
            var postMessage = function(msg, force) {
                if (!msg) throw "postMessage called with null message";

                // delay posting if we're not ready yet.
                if (!force && !ready) {
                    debug("queue message: " + JSON.stringify(msg));
                    pendingQueue.push(msg);
                } else {
                    if (typeof cfg.postMessageObserver === 'function') {
                        try {
                            cfg.postMessageObserver(cfg.origin, msg);
                        } catch (e) {
                            debug("postMessageObserver() raised an exception: " + e.toString());
                        }
                    }
                    debug("post message: " + JSON.stringify(msg) + " with origin " + cfg.origin);
                    cfg.window.postMessage(JSON.stringify(msg), cfg.origin);
                }
            };

            var onReady = function(trans, params) {
                debug('ready msg received');
                if (ready && !cfg.reconnect) {
                    throw "received ready message while in ready state.";
                }
                ready = true;

                // only append suffix to chanId once:
                if (chanId.length < 6) {
	                if (params.type === 'publish-request') {
	                    chanId += '-R';
	                } else {
	                    chanId += '-L';
	                }
                }
                debug('ready msg accepted.');

                if (params.type === 'publish-request') {
                    obj.notify({ method: '__ready', params: {
                        type:'publish-reply',
                        publish: publishQueue
                    } });
                }

                for (var i = 0; i < params.publish.length; i++) {
                    if (params.publish[i].action === "bind") {
                        createStubs([params.publish[i].method], obj.remote);
                    } else { // unbind
                        delete obj.remote[params.publish[i].method];
                    }
                }

                //unbind ready handler unless we allow reconnecting:
                if (!cfg.reconnect) {
                    obj.unbind('__ready', true); // now this handler isn't needed any more.
                }

                // flush queue
                while (pendingQueue.length) {
                    postMessage(pendingQueue.splice(0, 1)[0]);
                }
                publishQueue = [];
                // invoke onReady observer if provided
                if (typeof cfg.onReady === 'function') cfg.onReady(obj);

            };

            var createStubs = function(stubList, targetObj) {
                stubList = [].concat(stubList); // Coerce into array, allows string to be used for single-item array
                var method;
                for(var i=0; i < stubList.length; i++) {
                    method = stubList[i].toString();
                    targetObj[method] = function(m) {
                        return function(params, success, error) {
                            if (success) {
                                obj.call({
                                    method: m,
                                    params: params,
                                    success: success,
                                    error: error
                                });
                            } else {
                                obj.notify({
                                    method: m,
                                    params: params
                                });
                            }
                        };
                    }(method);
                }
            }

            // Dynamic publish from remote
            var onBind = function(trans, method) {
                createStubs([method], obj.remote);
            };

            // Dynamic unpublish from remote
            var onUnbind = function(trans, method) {
                if (obj.remote[method]) {
                    delete obj.remote[method];
                }
            };

            var obj = {

                remote: {},

                // tries to unbind a bound message handler.  returns false if not possible
                unbind: function (method, doNotPublish) {
                    if (regTbl[method]) {
                        if (!(delete regTbl[method])) throw ("can't delete method: " + method);
                        if (cfg.publish && ! doNotPublish) {
                            if (ready) {
                                obj.notify({ method: '__unbind', params: method });
                            } else {
                                publishQueue.push({ action: 'unbind', method: method });
                            }
                        }
                        return true;
                    }
                    return false;
                },
                bind: function (method, cb, doNotPublish) {
                    if (!method || typeof method !== 'string') throw "'method' argument to bind must be string";
                    if (!cb || typeof cb !== 'function') throw "callback missing from bind params";

                    if (regTbl[method]) throw "method '"+method+"' is already bound!";
                    regTbl[method] = cb;
                    if (cfg.publish && ! doNotPublish) {
                        if (ready) {
                            obj.notify({ method: '__bind', params: method });
                        } else {
                            publishQueue.push({ action: 'bind', method: method });
                        }
                    }
                    return this;
                },
                call: function(m) {
                    if (!m) throw 'missing arguments to call function';
                    if (!m.method || typeof m.method !== 'string') throw "'method' argument to call must be string";
                    if (!m.success || typeof m.success !== 'function') throw "'success' callback missing from call";

                    // now it's time to support the 'callback' feature of jschannel.  We'll traverse the argument
                    // object and pick out all of the functions that were passed as arguments.
                    var callbacks = { };
                    var callbackNames = [ ];
                    var seen = [ ];

                    var pruneFunctions = function (path, obj) {
                        if (seen.indexOf(obj) >= 0) {
                            throw "params cannot be a recursive data structure"
                        }
                        if(obj) {
                            seen.push(obj);
                        }

                        if (typeof obj === 'object') {
                            for (var k in obj) {
                                if (!obj.hasOwnProperty(k)) continue;
                                var np = path + (path.length ? '/' : '') + k;
                                if (typeof obj[k] === 'function') {
                                    callbacks[np] = obj[k];
                                    callbackNames.push(np);
                                    delete obj[k];
                                } else if (typeof obj[k] === 'object') {
                                    pruneFunctions(np, obj[k]);
                                }
                            }
                        }
                    };
                    pruneFunctions("", m.params);

                    // build a 'request' message and send it
                    var msg = { id: s_curTranId, method: scopeMethod(m.method), params: m.params };
                    if (callbackNames.length) msg.callbacks = callbackNames;

                    if (m.timeout)
                      // XXX: This function returns a timeout ID, but we don't do anything with it.
                      // We might want to keep track of it so we can cancel it using clearTimeout()
                      // when the transaction completes.
                      setTransactionTimeout(s_curTranId, m.timeout, scopeMethod(m.method));

                    // insert into the transaction table
                    outTbl[s_curTranId] = { callbacks: callbacks, error: m.error, success: m.success };
                    s_transIds[s_curTranId] = onMessage;

                    // increment current id
                    s_curTranId++;

                    postMessage(msg);
                },
                notify: function(m) {
                    if (!m) throw 'missing arguments to notify function';
                    if (!m.method || typeof m.method !== 'string') throw "'method' argument to notify must be string";

                    // no need to go into any transaction table
                    postMessage({ method: scopeMethod(m.method), params: m.params });
                },
                destroy: function () {
                    s_removeBoundChan(cfg.window, cfg.origin, cfg.scope);
                    if (window.removeEventListener) window.removeEventListener('message', onMessage, false);
                    else if(window.detachEvent) window.detachEvent('onmessage', onMessage);
                    ready = false;
                    regTbl = { };
                    inTbl = { };
                    outTbl = { };
                    cfg.origin = null;
                    pendingQueue = [ ];
                    debug("channel destroyed");
                    chanId = "";
                }
            };

            obj.bind('__ready', onReady, true);
            obj.bind('__bind', onBind, true);
            obj.bind('__unbind', onUnbind, true);
            if (cfg.remote) {
                createStubs(cfg.remote, obj.remote);
            }
            setTimeout(function() {
                if (chanId.length > 0) { // The channel might already have been destroyed
                    postMessage({ method: scopeMethod('__ready'), params: {
                        type: "publish-request",
                        publish: publishQueue
                    } }, true);
                }

            }, 0);

            return obj;
        }
    };
  })();


  return Channel;
}));


/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "PeerTubePlayer", function() { return /* binding */ player_PeerTubePlayer; });

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/jschannel/src/jschannel.js
var jschannel = __webpack_require__(23);

// CONCATENATED MODULE: ./src/standalone/player/events.ts
class EventRegistrar {
    constructor() {
        this.eventRegistrations = {};
    }
    bindToChannel(channel) {
        for (const name of Object.keys(this.eventRegistrations)) {
            channel.bind(name, (txn, params) => this.fire(name, params));
        }
    }
    registerTypes(names) {
        for (const name of names) {
            this.eventRegistrations[name] = { registrations: [] };
        }
    }
    fire(name, event) {
        this.eventRegistrations[name].registrations.forEach(x => x(event));
    }
    addListener(name, handler) {
        if (!this.eventRegistrations[name]) {
            console.warn(`PeerTube: addEventListener(): The event '${name}' is not supported`);
            return false;
        }
        this.eventRegistrations[name].registrations.push(handler);
        return true;
    }
    removeListener(name, handler) {
        if (!this.eventRegistrations[name])
            return false;
        this.eventRegistrations[name].registrations = this.eventRegistrations[name].registrations.filter(x => x === handler);
        return true;
    }
}

// CONCATENATED MODULE: ./src/standalone/player/player.ts



const PASSTHROUGH_EVENTS = [
    'pause',
    'play',
    'playbackStatusUpdate',
    'playbackStatusChange',
    'resolutionUpdate',
    'volumeChange'
];
/**
 * Allows for programmatic control of a PeerTube embed running in an <iframe>
 * within a web page.
 */
class player_PeerTubePlayer {
    /**
     * Construct a new PeerTubePlayer for the given PeerTube embed iframe.
     * Optionally provide a `scope` to ensure that messages are not crossed
     * between multiple PeerTube embeds. The string passed here must match the
     * `scope=` query parameter on the embed URL.
     *
     * @param embedElement
     * @param scope
     */
    constructor(embedElement, scope) {
        this.embedElement = embedElement;
        this.scope = scope;
        this.eventRegistrar = new EventRegistrar();
        this.eventRegistrar.registerTypes(PASSTHROUGH_EVENTS);
        this.constructChannel();
        this.prepareToBeReady();
    }
    /**
     * Destroy the player object and remove the associated player from the DOM.
     */
    destroy() {
        this.embedElement.remove();
    }
    /**
     * Listen to an event emitted by this player.
     *
     * @param event One of the supported event types
     * @param handler A handler which will be passed an event object (or undefined if no event object is included)
     */
    addEventListener(event, handler) {
        return this.eventRegistrar.addListener(event, handler);
    }
    /**
     * Remove an event listener previously added with addEventListener().
     *
     * @param event The name of the event previously listened to
     * @param handler
     */
    removeEventListener(event, handler) {
        return this.eventRegistrar.removeListener(event, handler);
    }
    /**
     * Promise resolves when the player is ready.
     */
    get ready() {
        return this.readyPromise;
    }
    /**
     * Tell the embed to start/resume playback
     */
    play() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('play');
        });
    }
    /**
     * Tell the embed to pause playback.
     */
    pause() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('pause');
        });
    }
    /**
     * Tell the embed to change the audio volume
     * @param value A number from 0 to 1
     */
    setVolume(value) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('setVolume', value);
        });
    }
    /**
     * Get the current volume level in the embed.
     * @param value A number from 0 to 1
     */
    getVolume() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getVolume');
        });
    }
    /**
     * Tell the embed to change the current caption
     * @param value Caption id
     */
    setCaption(value) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('setCaption', value);
        });
    }
    /**
     * Get video captions
     */
    getCaptions() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getCaptions');
        });
    }
    /**
     * Tell the embed to seek to a specific position (in seconds)
     * @param seconds
     */
    seek(seconds) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('seek', seconds);
        });
    }
    /**
     * Tell the embed to switch resolutions to the resolution identified
     * by the given ID.
     *
     * @param resolutionId The ID of the resolution as found with getResolutions()
     */
    setResolution(resolutionId) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('setResolution', resolutionId);
        });
    }
    /**
     * Retrieve a list of the available resolutions. This may change later, listen to the
     * `resolutionUpdate` event with `addEventListener` in order to be updated as the available
     * resolutions change.
     */
    getResolutions() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getResolutions');
        });
    }
    /**
     * Retrieve a list of available playback rates.
     */
    getPlaybackRates() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getPlaybackRates');
        });
    }
    /**
     * Get the current playback rate. Defaults to 1 (1x playback rate).
     */
    getPlaybackRate() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getPlaybackRate');
        });
    }
    /**
     * Set the playback rate. Should be one of the options returned by getPlaybackRates().
     * Passing 0.5 means half speed, 1 means normal, 2 means 2x speed, etc.
     *
     * @param rate
     */
    setPlaybackRate(rate) {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('setPlaybackRate', rate);
        });
    }
    /**
     * Play next video in playlist
     */
    playNextVideo() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('playNextVideo');
        });
    }
    /**
     * Play previous video in playlist
     */
    playPreviousVideo() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            yield this.sendMessage('playPreviousVideo');
        });
    }
    /**
     * Get video position currently played (starts from 1)
     */
    getCurrentPosition() {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function* () {
            return this.sendMessage('getCurrentPosition');
        });
    }
    constructChannel() {
        this.channel = jschannel["build"]({
            window: this.embedElement.contentWindow,
            origin: '*',
            scope: this.scope || 'peertube'
        });
        this.eventRegistrar.bindToChannel(this.channel);
    }
    prepareToBeReady() {
        let readyResolve;
        let readyReject;
        this.readyPromise = new Promise((res, rej) => {
            readyResolve = res;
            readyReject = rej;
        });
        this.channel.bind('ready', success => success ? readyResolve() : readyReject());
        this.channel.call({
            method: 'isReady',
            success: isReady => isReady ? readyResolve() : null
        });
    }
    sendMessage(method, params) {
        return new Promise((resolve, reject) => {
            this.channel.call({
                method, params,
                success: result => resolve(result),
                error: error => reject(error)
            });
        });
    }
}
// put it on the window as well as the export
window['PeerTubePlayer'] = player_PeerTubePlayer;


/***/ })

/******/ });
//# sourceMappingURL=player.bundle.js.map