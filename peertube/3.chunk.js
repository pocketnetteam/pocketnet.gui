(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@videojs/vhs-utils/es/decode-b64-to-uint8-array.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@videojs/vhs-utils/es/decode-b64-to-uint8-array.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return decodeB64ToUint8Array; });
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global/window */ "./node_modules/global/window.js");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_0__);


var atob = function atob(s) {
  return global_window__WEBPACK_IMPORTED_MODULE_0___default.a.atob ? global_window__WEBPACK_IMPORTED_MODULE_0___default.a.atob(s) : Buffer.from(s, 'base64').toString('binary');
};

function decodeB64ToUint8Array(b64Text) {
  var decodedString = atob(b64Text);
  var array = new Uint8Array(decodedString.length);

  for (var i = 0; i < decodedString.length; i++) {
    array[i] = decodedString.charCodeAt(i);
  }

  return array;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node-libs-browser/node_modules/buffer/index.js */ "./node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@videojs/vhs-utils/es/stream.js":
/*!******************************************************!*\
  !*** ./node_modules/@videojs/vhs-utils/es/stream.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stream; });
/**
 * @file stream.js
 */

/**
 * A lightweight readable stream implemention that handles event dispatching.
 *
 * @class Stream
 */
var Stream = /*#__PURE__*/function () {
  function Stream() {
    this.listeners = {};
  }
  /**
   * Add a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */


  var _proto = Stream.prototype;

  _proto.on = function on(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }
  /**
   * Remove a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener  a function previously registered for this
   * type of event through `on`
   * @return {boolean} if we could turn it off or not
   */
  ;

  _proto.off = function off(type, listener) {
    if (!this.listeners[type]) {
      return false;
    }

    var index = this.listeners[type].indexOf(listener); // TODO: which is better?
    // In Video.js we slice listener functions
    // on trigger so that it does not mess up the order
    // while we loop through.
    //
    // Here we slice on off so that the loop in trigger
    // can continue using it's old reference to loop without
    // messing up the order.

    this.listeners[type] = this.listeners[type].slice(0);
    this.listeners[type].splice(index, 1);
    return index > -1;
  }
  /**
   * Trigger an event of the specified type on this stream. Any additional
   * arguments to this function are passed as parameters to event listeners.
   *
   * @param {string} type the event name
   */
  ;

  _proto.trigger = function trigger(type) {
    var callbacks = this.listeners[type];

    if (!callbacks) {
      return;
    } // Slicing the arguments on every invocation of this method
    // can add a significant amount of overhead. Avoid the
    // intermediate object creation for the common case of a
    // single callback argument


    if (arguments.length === 2) {
      var length = callbacks.length;

      for (var i = 0; i < length; ++i) {
        callbacks[i].call(this, arguments[1]);
      }
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      var _length = callbacks.length;

      for (var _i = 0; _i < _length; ++_i) {
        callbacks[_i].apply(this, args);
      }
    }
  }
  /**
   * Destroys the stream and cleans up.
   */
  ;

  _proto.dispose = function dispose() {
    this.listeners = {};
  }
  /**
   * Forwards all `data` events on this stream to the destination stream. The
   * destination stream should provide a method `push` to receive the data
   * events as they arrive.
   *
   * @param {Stream} destination the stream that will receive all `data` events
   * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
   */
  ;

  _proto.pipe = function pipe(destination) {
    this.on('data', function (data) {
      destination.push(data);
    });
  };

  return Stream;
}();



/***/ }),

/***/ "./node_modules/m3u8-parser/dist/m3u8-parser.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/m3u8-parser/dist/m3u8-parser.es.js ***!
  \*********************************************************/
/*! exports provided: LineStream, ParseStream, Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStream", function() { return LineStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParseStream", function() { return ParseStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _videojs_vhs_utils_es_stream_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @videojs/vhs-utils/es/stream.js */ "./node_modules/@videojs/vhs-utils/es/stream.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _videojs_vhs_utils_es_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @videojs/vhs-utils/es/decode-b64-to-uint8-array.js */ "./node_modules/@videojs/vhs-utils/es/decode-b64-to-uint8-array.js");
/*! @name m3u8-parser @version 4.6.0 @license Apache-2.0 */






/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */

var LineStream = /*#__PURE__*/function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(LineStream, _Stream);

  function LineStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.buffer = '';
    return _this;
  }
  /**
   * Add new data to be parsed.
   *
   * @param {string} data the text to process
   */


  var _proto = LineStream.prototype;

  _proto.push = function push(data) {
    var nextNewline;
    this.buffer += data;
    nextNewline = this.buffer.indexOf('\n');

    for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
      this.trigger('data', this.buffer.substring(0, nextNewline));
      this.buffer = this.buffer.substring(nextNewline + 1);
    }
  };

  return LineStream;
}(_videojs_vhs_utils_es_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

var TAB = String.fromCharCode(0x09);

var parseByterange = function parseByterange(byterangeString) {
  // optionally match and capture 0+ digits before `@`
  // optionally match and capture 0+ digits after `@`
  var match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || '');
  var result = {};

  if (match[1]) {
    result.length = parseInt(match[1], 10);
  }

  if (match[2]) {
    result.offset = parseInt(match[2], 10);
  }

  return result;
};
/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */


var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';
  return new RegExp('(?:^|,)(' + keyvalue + ')');
};
/**
 * Parse attributes from a line given the separator
 *
 * @param {string} attributes the attribute line to parse
 */


var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var result = {};
  var i = attrs.length;
  var attr;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    } // split the key and value


    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1); // trim whitespace and remove optional quotes around the value

    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }

  return result;
};
/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */


var ParseStream = /*#__PURE__*/function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(ParseStream, _Stream);

  function ParseStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.customParsers = [];
    _this.tagMappers = [];
    return _this;
  }
  /**
   * Parses an additional line of input.
   *
   * @param {string} line a single line of an M3U8 file to parse
   */


  var _proto = ParseStream.prototype;

  _proto.push = function push(line) {
    var _this2 = this;

    var match;
    var event; // strip whitespace

    line = line.trim();

    if (line.length === 0) {
      // ignore empty lines
      return;
    } // URIs


    if (line[0] !== '#') {
      this.trigger('data', {
        type: 'uri',
        uri: line
      });
      return;
    } // map tags


    var newLines = this.tagMappers.reduce(function (acc, mapper) {
      var mappedLine = mapper(line); // skip if unchanged

      if (mappedLine === line) {
        return acc;
      }

      return acc.concat([mappedLine]);
    }, [line]);
    newLines.forEach(function (newLine) {
      for (var i = 0; i < _this2.customParsers.length; i++) {
        if (_this2.customParsers[i].call(_this2, newLine)) {
          return;
        }
      } // Comments


      if (newLine.indexOf('#EXT') !== 0) {
        _this2.trigger('data', {
          type: 'comment',
          text: newLine.slice(1)
        });

        return;
      } // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.


      newLine = newLine.replace('\r', ''); // Tags

      match = /^#EXTM3U/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });

        return;
      }

      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };

        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }

        if (match[2]) {
          event.title = match[2];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };

        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };

        if (match[1]) {
          event.playlistType = match[1];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-BYTERANGE:?(.*)?$/.exec(newLine);

      if (match) {
        event = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()(parseByterange(match[1]), {
          type: 'tag',
          tagType: 'byterange'
        });

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };

        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }

          if (attributes.BYTERANGE) {
            event.byterange = parseByterange(attributes.BYTERANGE);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }

            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }

            event.attributes.RESOLUTION = resolution;
          }

          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }

          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ENDLIST/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });

        return;
      }

      match = /^#EXT-X-DISCONTINUITY/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });

        return;
      }

      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };

        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]); // parse the IV string into a Uint32Array

          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-START:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'start'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          event.attributes['TIME-OFFSET'] = parseFloat(event.attributes['TIME-OFFSET']);
          event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-SKIP:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'skip'
        };
        event.attributes = parseAttributes(match[1]);

        if (event.attributes.hasOwnProperty('SKIPPED-SEGMENTS')) {
          event.attributes['SKIPPED-SEGMENTS'] = parseInt(event.attributes['SKIPPED-SEGMENTS'], 10);
        }

        if (event.attributes.hasOwnProperty('RECENTLY-REMOVED-DATERANGES')) {
          event.attributes['RECENTLY-REMOVED-DATERANGES'] = event.attributes['RECENTLY-REMOVED-DATERANGES'].split(TAB);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PART:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'part'
        };
        event.attributes = parseAttributes(match[1]);
        ['DURATION'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = parseFloat(event.attributes[key]);
          }
        });
        ['INDEPENDENT', 'GAP'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = /YES/.test(event.attributes[key]);
          }
        });

        if (event.attributes.hasOwnProperty('BYTERANGE')) {
          event.attributes.byterange = parseByterange(event.attributes.BYTERANGE);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'server-control'
        };
        event.attributes = parseAttributes(match[1]);
        ['CAN-SKIP-UNTIL', 'PART-HOLD-BACK', 'HOLD-BACK'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = parseFloat(event.attributes[key]);
          }
        });
        ['CAN-SKIP-DATERANGES', 'CAN-BLOCK-RELOAD'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = /YES/.test(event.attributes[key]);
          }
        });

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PART-INF:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'part-inf'
        };
        event.attributes = parseAttributes(match[1]);
        ['PART-TARGET'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = parseFloat(event.attributes[key]);
          }
        });

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'preload-hint'
        };
        event.attributes = parseAttributes(match[1]);
        ['BYTERANGE-START', 'BYTERANGE-LENGTH'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = parseInt(event.attributes[key], 10);
            var subkey = key === 'BYTERANGE-LENGTH' ? 'length' : 'offset';
            event.attributes.byterange = event.attributes.byterange || {};
            event.attributes.byterange[subkey] = event.attributes[key]; // only keep the parsed byterange object.

            delete event.attributes[key];
          }
        });

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(newLine);

      if (match && match[1]) {
        event = {
          type: 'tag',
          tagType: 'rendition-report'
        };
        event.attributes = parseAttributes(match[1]);
        ['LAST-MSN', 'LAST-PART'].forEach(function (key) {
          if (event.attributes.hasOwnProperty(key)) {
            event.attributes[key] = parseInt(event.attributes[key], 10);
          }
        });

        _this2.trigger('data', event);

        return;
      } // unknown tag type


      _this2.trigger('data', {
        type: 'tag',
        data: newLine.slice(4)
      });
    });
  }
  /**
   * Add a parser for custom headers
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.customType   the custom type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(_ref) {
    var _this3 = this;

    var expression = _ref.expression,
        customType = _ref.customType,
        dataParser = _ref.dataParser,
        segment = _ref.segment;

    if (typeof dataParser !== 'function') {
      dataParser = function dataParser(line) {
        return line;
      };
    }

    this.customParsers.push(function (line) {
      var match = expression.exec(line);

      if (match) {
        _this3.trigger('data', {
          type: 'custom',
          data: dataParser(line),
          customType: customType,
          segment: segment
        });

        return true;
      }
    });
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(_ref2) {
    var expression = _ref2.expression,
        map = _ref2.map;

    var mapFn = function mapFn(line) {
      if (expression.test(line)) {
        return map(line);
      }

      return line;
    };

    this.tagMappers.push(mapFn);
  };

  return ParseStream;
}(_videojs_vhs_utils_es_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

var camelCase = function camelCase(str) {
  return str.toLowerCase().replace(/-(\w)/g, function (a) {
    return a[1].toUpperCase();
  });
};

var camelCaseKeys = function camelCaseKeys(attributes) {
  var result = {};
  Object.keys(attributes).forEach(function (key) {
    result[camelCase(key)] = attributes[key];
  });
  return result;
}; // set SERVER-CONTROL hold back based upon targetDuration and partTargetDuration
// we need this helper because defaults are based upon targetDuration and
// partTargetDuration being set, but they may not be if SERVER-CONTROL appears before
// target durations are set.


var setHoldBack = function setHoldBack(manifest) {
  var serverControl = manifest.serverControl,
      targetDuration = manifest.targetDuration,
      partTargetDuration = manifest.partTargetDuration;

  if (!serverControl) {
    return;
  }

  var tag = '#EXT-X-SERVER-CONTROL';
  var hb = 'holdBack';
  var phb = 'partHoldBack';
  var minTargetDuration = targetDuration && targetDuration * 3;
  var minPartDuration = partTargetDuration && partTargetDuration * 2;

  if (targetDuration && !serverControl.hasOwnProperty(hb)) {
    serverControl[hb] = minTargetDuration;
    this.trigger('info', {
      message: tag + " defaulting HOLD-BACK to targetDuration * 3 (" + minTargetDuration + ")."
    });
  }

  if (minTargetDuration && serverControl[hb] < minTargetDuration) {
    this.trigger('warn', {
      message: tag + " clamping HOLD-BACK (" + serverControl[hb] + ") to targetDuration * 3 (" + minTargetDuration + ")"
    });
    serverControl[hb] = minTargetDuration;
  } // default no part hold back to part target duration * 3


  if (partTargetDuration && !serverControl.hasOwnProperty(phb)) {
    serverControl[phb] = partTargetDuration * 3;
    this.trigger('info', {
      message: tag + " defaulting PART-HOLD-BACK to partTargetDuration * 3 (" + serverControl[phb] + ")."
    });
  } // if part hold back is too small default it to part target duration * 2


  if (partTargetDuration && serverControl[phb] < minPartDuration) {
    this.trigger('warn', {
      message: tag + " clamping PART-HOLD-BACK (" + serverControl[phb] + ") to partTargetDuration * 2 (" + minPartDuration + ")."
    });
    serverControl[phb] = minPartDuration;
  }
};
/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */


var Parser = /*#__PURE__*/function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Parser, _Stream);

  function Parser() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.lineStream = new LineStream();
    _this.parseStream = new ParseStream();

    _this.lineStream.pipe(_this.parseStream);
    /* eslint-disable consistent-this */


    var self = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    /* eslint-enable consistent-this */


    var uris = [];
    var currentUri = {}; // if specified, the active EXT-X-MAP definition

    var currentMap; // if specified, the active decryption key

    var _key;

    var hasParts = false;

    var noop = function noop() {};

    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    }; // This is the Widevine UUID from DASH IF IOP. The same exact string is
    // used in MPDs with Widevine encrypted streams.

    var widevineUuid = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'; // group segments into numbered timelines delineated by discontinuities

    var currentTimeline = 0; // the manifest is empty until the parse stream begins delivering data

    _this.manifest = {
      allowCache: true,
      discontinuityStarts: [],
      segments: []
    }; // keep track of the last seen segment's byte range end, as segments are not required
    // to provide the offset, in which case it defaults to the next byte after the
    // previous segment

    var lastByterangeEnd = 0; // keep track of the last seen part's byte range end.

    var lastPartByterangeEnd = 0;

    _this.on('end', function () {
      // only add preloadSegment if we don't yet have a uri for it.
      // and we actually have parts/preloadHints
      if (currentUri.uri || !currentUri.parts && !currentUri.preloadHints) {
        return;
      }

      if (!currentUri.map && currentMap) {
        currentUri.map = currentMap;
      }

      if (!currentUri.key && _key) {
        currentUri.key = _key;
      }

      if (!currentUri.timeline && typeof currentTimeline === 'number') {
        currentUri.timeline = currentTimeline;
      }

      _this.manifest.preloadSegment = currentUri;
    }); // update the manifest with the m3u8 entry from the parse stream


    _this.parseStream.on('data', function (entry) {
      var mediaGroup;
      var rendition;
      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            version: function version() {
              if (entry.version) {
                this.manifest.version = entry.version;
              }
            },
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;

              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  /*
                   * From the latest spec (as of this writing):
                   * https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.2.2
                   *
                   * Same text since EXT-X-BYTERANGE's introduction in draft 7:
                   * https://tools.ietf.org/html/draft-pantos-http-live-streaming-07#section-3.3.1)
                   *
                   * "If o [offset] is not present, the sub-range begins at the next byte
                   * following the sub-range of the previous media segment."
                   */
                  entry.offset = lastByterangeEnd;
                }
              }

              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }

              lastByterangeEnd = byterange.offset + byterange.length;
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }

              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }

              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              } // clear the active encryption key


              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }

              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              } // check if the content is encrypted for Widevine
              // Widevine/HLS spec: https://storage.googleapis.com/wvdocs/Widevine_DRM_HLS.pdf


              if (entry.attributes.KEYFORMAT === widevineUuid) {
                var VALID_METHODS = ['SAMPLE-AES', 'SAMPLE-AES-CTR', 'SAMPLE-AES-CENC'];

                if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                  this.trigger('warn', {
                    message: 'invalid key method provided for Widevine'
                  });
                  return;
                }

                if (entry.attributes.METHOD === 'SAMPLE-AES-CENC') {
                  this.trigger('warn', {
                    message: 'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead'
                  });
                }

                if (entry.attributes.URI.substring(0, 23) !== 'data:text/plain;base64,') {
                  this.trigger('warn', {
                    message: 'invalid key URI provided for Widevine'
                  });
                  return;
                }

                if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === '0x')) {
                  this.trigger('warn', {
                    message: 'invalid key ID provided for Widevine'
                  });
                  return;
                } // if Widevine key attributes are valid, store them as `contentProtection`
                // on the manifest to emulate Widevine tag structure in a DASH mpd


                this.manifest.contentProtection = {
                  'com.widevine.alpha': {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: Object(_videojs_vhs_utils_es_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4__["default"])(entry.attributes.URI.split(',')[1])
                  }
                };
                return;
              }

              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              } // setup an encryption key for upcoming segments


              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }

              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }

              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }

              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};

              if (entry.uri) {
                currentMap.uri = entry.uri;
              }

              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }

              _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              } // find the media group, creating defaults as necessary


              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']]; // collect the rendition metadata

              rendition = {
                default: /yes/i.test(entry.attributes.DEFAULT)
              };

              if (rendition.default) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }

              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }

              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }

              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }

              if (entry.attributes.CHARACTERISTICS) {
                rendition.characteristics = entry.attributes.CHARACTERISTICS;
              }

              if (entry.attributes.FORCED) {
                rendition.forced = /yes/i.test(entry.attributes.FORCED);
              } // insert the new rendition


              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              if (typeof this.manifest.dateTimeString === 'undefined') {
                // PROGRAM-DATE-TIME is a media-segment tag, but for backwards
                // compatibility, we add the first occurence of the PROGRAM-DATE-TIME tag
                // to the manifest object
                // TODO: Consider removing this in future major version
                this.manifest.dateTimeString = entry.dateTimeString;
                this.manifest.dateTimeObject = entry.dateTimeObject;
              }

              currentUri.dateTimeString = entry.dateTimeString;
              currentUri.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }

              this.manifest.targetDuration = entry.duration;
              setHoldBack.call(this, this.manifest);
            },
            start: function start() {
              if (!entry.attributes || isNaN(entry.attributes['TIME-OFFSET'])) {
                this.trigger('warn', {
                  message: 'ignoring start declaration without appropriate attribute list'
                });
                return;
              }

              this.manifest.start = {
                timeOffset: entry.attributes['TIME-OFFSET'],
                precise: entry.attributes.PRECISE
              };
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            },
            'skip': function skip() {
              this.manifest.skip = camelCaseKeys(entry.attributes);
              this.warnOnMissingAttributes_('#EXT-X-SKIP', entry.attributes, ['SKIPPED-SEGMENTS']);
            },
            'part': function part() {
              var _this2 = this;

              hasParts = true; // parts are always specifed before a segment

              var segmentIndex = this.manifest.segments.length;
              var part = camelCaseKeys(entry.attributes);
              currentUri.parts = currentUri.parts || [];
              currentUri.parts.push(part);

              if (part.byterange) {
                if (!part.byterange.hasOwnProperty('offset')) {
                  part.byterange.offset = lastPartByterangeEnd;
                }

                lastPartByterangeEnd = part.byterange.offset + part.byterange.length;
              }

              var partIndex = currentUri.parts.length - 1;
              this.warnOnMissingAttributes_("#EXT-X-PART #" + partIndex + " for segment #" + segmentIndex, entry.attributes, ['URI', 'DURATION']);

              if (this.manifest.renditionReports) {
                this.manifest.renditionReports.forEach(function (r, i) {
                  if (!r.hasOwnProperty('lastPart')) {
                    _this2.trigger('warn', {
                      message: "#EXT-X-RENDITION-REPORT #" + i + " lacks required attribute(s): LAST-PART"
                    });
                  }
                });
              }
            },
            'server-control': function serverControl() {
              var attrs = this.manifest.serverControl = camelCaseKeys(entry.attributes);

              if (!attrs.hasOwnProperty('canBlockReload')) {
                attrs.canBlockReload = false;
                this.trigger('info', {
                  message: '#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false'
                });
              }

              setHoldBack.call(this, this.manifest);

              if (attrs.canSkipDateranges && !attrs.hasOwnProperty('canSkipUntil')) {
                this.trigger('warn', {
                  message: '#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set'
                });
              }
            },
            'preload-hint': function preloadHint() {
              // parts are always specifed before a segment
              var segmentIndex = this.manifest.segments.length;
              var hint = camelCaseKeys(entry.attributes);
              var isPart = hint.type && hint.type === 'PART';
              currentUri.preloadHints = currentUri.preloadHints || [];
              currentUri.preloadHints.push(hint);

              if (hint.byterange) {
                if (!hint.byterange.hasOwnProperty('offset')) {
                  // use last part byterange end or zero if not a part.
                  hint.byterange.offset = isPart ? lastPartByterangeEnd : 0;

                  if (isPart) {
                    lastPartByterangeEnd = hint.byterange.offset + hint.byterange.length;
                  }
                }
              }

              var index = currentUri.preloadHints.length - 1;
              this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex, entry.attributes, ['TYPE', 'URI']);

              if (!hint.type) {
                return;
              } // search through all preload hints except for the current one for
              // a duplicate type.


              for (var i = 0; i < currentUri.preloadHints.length - 1; i++) {
                var otherHint = currentUri.preloadHints[i];

                if (!otherHint.type) {
                  continue;
                }

                if (otherHint.type === hint.type) {
                  this.trigger('warn', {
                    message: "#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex + " has the same TYPE " + hint.type + " as preload hint #" + i
                  });
                }
              }
            },
            'rendition-report': function renditionReport() {
              var report = camelCaseKeys(entry.attributes);
              this.manifest.renditionReports = this.manifest.renditionReports || [];
              this.manifest.renditionReports.push(report);
              var index = this.manifest.renditionReports.length - 1;
              var required = ['LAST-MSN', 'URI'];

              if (hasParts) {
                required.push('LAST-PART');
              }

              this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #" + index, entry.attributes, required);
            },
            'part-inf': function partInf() {
              this.manifest.partInf = camelCaseKeys(entry.attributes);
              this.warnOnMissingAttributes_('#EXT-X-PART-INF', entry.attributes, ['PART-TARGET']);

              if (this.manifest.partInf.partTarget) {
                this.manifest.partTargetDuration = this.manifest.partInf.partTarget;
              }

              setHoldBack.call(this, this.manifest);
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri); // if no explicit duration was declared, use the target duration

          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          } // annotate with encryption information, if necessary


          if (_key) {
            currentUri.key = _key;
          }

          currentUri.timeline = currentTimeline; // annotate with initialization segment information, if necessary

          if (currentMap) {
            currentUri.map = currentMap;
          } // reset the last byterange end as it needs to be 0 between parts


          lastPartByterangeEnd = 0; // prepare for the next URI

          currentUri = {};
        },
        comment: function comment() {// comments are not important for playback
        },
        custom: function custom() {
          // if this is segment-level data attach the output to the segment
          if (entry.segment) {
            currentUri.custom = currentUri.custom || {};
            currentUri.custom[entry.customType] = entry.data; // if this is manifest-level data attach to the top level manifest object
          } else {
            this.manifest.custom = this.manifest.custom || {};
            this.manifest.custom[entry.customType] = entry.data;
          }
        }
      })[entry.type].call(self);
    });

    return _this;
  }

  var _proto = Parser.prototype;

  _proto.warnOnMissingAttributes_ = function warnOnMissingAttributes_(identifier, attributes, required) {
    var missing = [];
    required.forEach(function (key) {
      if (!attributes.hasOwnProperty(key)) {
        missing.push(key);
      }
    });

    if (missing.length) {
      this.trigger('warn', {
        message: identifier + " lacks required attribute(s): " + missing.join(', ')
      });
    }
  }
  /**
   * Parse the input string and update the manifest object.
   *
   * @param {string} chunk a potentially incomplete portion of the manifest
   */
  ;

  _proto.push = function push(chunk) {
    this.lineStream.push(chunk);
  }
  /**
   * Flush any remaining input. This can be handy if the last line of an M3U8
   * manifest did not contain a trailing newline but the file has been
   * completely received.
   */
  ;

  _proto.end = function end() {
    // flush any buffered input
    this.lineStream.push('\n');
    this.trigger('end');
  }
  /**
   * Add an additional parser for non-standard tags
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.type         the type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(options) {
    this.parseStream.addParser(options);
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(options) {
    this.parseStream.addTagMapper(options);
  };

  return Parser;
}(_videojs_vhs_utils_es_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"]);




/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/bandwidth-approximator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/bandwidth-approximator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const SMOOTH_INTERVAL = 1 * 1000;
const MEASURE_INTERVAL = 60 * 1000;
class NumberWithTime {
    constructor(value, timeStamp) {
        this.value = value;
        this.timeStamp = timeStamp;
    }
}
class BandwidthApproximator {
    constructor() {
        this.lastBytes = [];
        this.currentBytesSum = 0;
        this.lastBandwidth = [];
    }
    addBytes(bytes, timeStamp) {
        this.lastBytes.push(new NumberWithTime(bytes, timeStamp));
        this.currentBytesSum += bytes;
        while (timeStamp - this.lastBytes[0].timeStamp > SMOOTH_INTERVAL) {
            this.currentBytesSum -= this.lastBytes.shift().value;
        }
        this.lastBandwidth.push(new NumberWithTime(this.currentBytesSum / SMOOTH_INTERVAL, timeStamp));
    }
    // in bytes per millisecond
    getBandwidth(timeStamp) {
        while (this.lastBandwidth.length != 0 && timeStamp - this.lastBandwidth[0].timeStamp > MEASURE_INTERVAL) {
            this.lastBandwidth.shift();
        }
        let maxBandwidth = 0;
        for (const bandwidth of this.lastBandwidth) {
            if (bandwidth.value > maxBandwidth) {
                maxBandwidth = bandwidth.value;
            }
        }
        return maxBandwidth;
    }
    getSmoothInterval() {
        return SMOOTH_INTERVAL;
    }
    getMeasureInterval() {
        return MEASURE_INTERVAL;
    }
}
exports.BandwidthApproximator = BandwidthApproximator;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/http-media-manager.js":
/*!***********************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/http-media-manager.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
const stringly_typed_event_emitter_1 = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./node_modules/p2p-media-loader-core/dist/stringly-typed-event-emitter.js");
class HttpMediaManager extends stringly_typed_event_emitter_1.STEEmitter {
    constructor(settings) {
        super();
        this.settings = settings;
        this.xhrRequests = new Map();
        this.failedSegments = new Map();
        this.debug = Debug("p2pml:http-media-manager");
        this.now = () => performance.now();
    }
    download(segment, downloadedPieces) {
        if (this.isDownloading(segment)) {
            return;
        }
        this.cleanTimedOutFailedSegments();
        const segmentUrl = this.settings.segmentUrlBuilder
            ? this.settings.segmentUrlBuilder(segment)
            : segment.url;
        this.debug("http segment download", segmentUrl);
        segment.requestUrl = segmentUrl;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", segmentUrl, true);
        xhr.responseType = "arraybuffer";
        if (segment.range) {
            xhr.setRequestHeader("Range", segment.range);
            downloadedPieces = undefined; // TODO: process downloadedPieces for segments with range headers too
        }
        else if ((downloadedPieces !== undefined) && this.settings.httpUseRanges) {
            let bytesDownloaded = 0;
            for (const piece of downloadedPieces) {
                bytesDownloaded += piece.byteLength;
            }
            xhr.setRequestHeader("Range", `bytes=${bytesDownloaded}-`);
            this.debug("continue download from", bytesDownloaded);
        }
        else {
            downloadedPieces = undefined;
        }
        this.setupXhrEvents(xhr, segment, downloadedPieces);
        if (this.settings.xhrSetup) {
            this.settings.xhrSetup(xhr, segmentUrl);
        }
        this.xhrRequests.set(segment.id, { xhr, segment });
        xhr.send();
    }
    abort(segment) {
        const request = this.xhrRequests.get(segment.id);
        if (request) {
            request.xhr.abort();
            this.xhrRequests.delete(segment.id);
            this.debug("http segment abort", segment.id);
        }
    }
    isDownloading(segment) {
        return this.xhrRequests.has(segment.id);
    }
    isFailed(segment) {
        const time = this.failedSegments.get(segment.id);
        return time !== undefined && time > this.now();
    }
    getActiveDownloads() {
        return this.xhrRequests;
    }
    getActiveDownloadsCount() {
        return this.xhrRequests.size;
    }
    destroy() {
        this.xhrRequests.forEach(request => request.xhr.abort());
        this.xhrRequests.clear();
    }
    setupXhrEvents(xhr, segment, downloadedPieces) {
        let prevBytesLoaded = 0;
        xhr.addEventListener("progress", (event) => {
            const bytesLoaded = event.loaded - prevBytesLoaded;
            this.emit("bytes-downloaded", bytesLoaded);
            prevBytesLoaded = event.loaded;
        });
        xhr.addEventListener("load", async (event) => {
            if ((event.target.status < 200) || (event.target.status >= 300)) {
                this.segmentFailure(segment, event, xhr);
                return;
            }
            let data = event.target.response;
            if ((downloadedPieces !== undefined) && (event.target.status === 206)) {
                let bytesDownloaded = 0;
                for (const piece of downloadedPieces) {
                    bytesDownloaded += piece.byteLength;
                }
                const segmentData = new Uint8Array(bytesDownloaded + data.byteLength);
                let offset = 0;
                for (const piece of downloadedPieces) {
                    segmentData.set(new Uint8Array(piece), offset);
                    offset += piece.byteLength;
                }
                segmentData.set(new Uint8Array(data), offset);
                data = segmentData.buffer;
            }
            await this.segmentDownloadFinished(segment, data, xhr);
        });
        xhr.addEventListener("error", (event) => {
            this.segmentFailure(segment, event, xhr);
        });
        xhr.addEventListener("timeout", (event) => {
            this.segmentFailure(segment, event, xhr);
        });
    }
    async segmentDownloadFinished(segment, data, xhr) {
        segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
        if (this.settings.segmentValidator) {
            try {
                await this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "http");
            }
            catch (error) {
                this.debug("segment validator failed", error);
                this.segmentFailure(segment, error, xhr);
                return;
            }
        }
        this.xhrRequests.delete(segment.id);
        this.emit("segment-loaded", segment, data);
    }
    segmentFailure(segment, error, xhr) {
        segment.responseUrl = xhr.responseURL === null ? undefined : xhr.responseURL;
        this.xhrRequests.delete(segment.id);
        this.failedSegments.set(segment.id, this.now() + this.settings.httpFailedSegmentTimeout);
        this.emit("segment-error", segment, error);
    }
    cleanTimedOutFailedSegments() {
        const now = this.now();
        const candidates = [];
        this.failedSegments.forEach((time, id) => {
            if (time < now) {
                candidates.push(id);
            }
        });
        candidates.forEach(id => this.failedSegments.delete(id));
    }
}
exports.HttpMediaManager = HttpMediaManager;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/hybrid-loader.js":
/*!******************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/hybrid-loader.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
const loader_interface_1 = __webpack_require__(/*! ./loader-interface */ "./node_modules/p2p-media-loader-core/dist/loader-interface.js");
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const http_media_manager_1 = __webpack_require__(/*! ./http-media-manager */ "./node_modules/p2p-media-loader-core/dist/http-media-manager.js");
const p2p_media_manager_1 = __webpack_require__(/*! ./p2p-media-manager */ "./node_modules/p2p-media-loader-core/dist/p2p-media-manager.js");
const media_peer_1 = __webpack_require__(/*! ./media-peer */ "./node_modules/p2p-media-loader-core/dist/media-peer.js");
const bandwidth_approximator_1 = __webpack_require__(/*! ./bandwidth-approximator */ "./node_modules/p2p-media-loader-core/dist/bandwidth-approximator.js");
const segments_memory_storage_1 = __webpack_require__(/*! ./segments-memory-storage */ "./node_modules/p2p-media-loader-core/dist/segments-memory-storage.js");
const getBrowserRTC = __webpack_require__(/*! get-browser-rtc */ "./node_modules/get-browser-rtc/index.js");
const Peer = __webpack_require__(/*! simple-peer */ "./node_modules/simple-peer/index.js");
const defaultSettings = {
    cachedSegmentExpiration: 5 * 60 * 1000,
    cachedSegmentsCount: 30,
    useP2P: true,
    consumeOnly: false,
    requiredSegmentsPriority: 1,
    simultaneousHttpDownloads: 2,
    httpDownloadProbability: 0.1,
    httpDownloadProbabilityInterval: 1000,
    httpDownloadProbabilitySkipIfNoPeers: false,
    httpFailedSegmentTimeout: 10000,
    httpDownloadMaxPriority: 20,
    httpDownloadInitialTimeout: 0,
    httpDownloadInitialTimeoutPerSegment: 4000,
    httpUseRanges: false,
    simultaneousP2PDownloads: 3,
    p2pDownloadMaxPriority: 20,
    p2pSegmentDownloadTimeout: 60000,
    webRtcMaxMessageSize: 64 * 1024 - 1,
    trackerAnnounce: ["wss://tracker.novage.com.ua", "wss://tracker.openwebtorrent.com"],
    peerRequestsPerAnnounce: 10,
    rtcConfig: Peer.config
};
class HybridLoader extends events_1.EventEmitter {
    constructor(settings = {}) {
        super();
        this.debug = Debug("p2pml:hybrid-loader");
        this.debugSegments = Debug("p2pml:hybrid-loader-segments");
        this.segmentsQueue = [];
        this.bandwidthApproximator = new bandwidth_approximator_1.BandwidthApproximator();
        this.httpDownloadInitialTimeoutTimestamp = -Infinity;
        this.processInitialSegmentTimeout = async () => {
            if (this.httpRandomDownloadInterval === undefined) {
                return; // Instance destroyed
            }
            if (this.masterSwarmId !== undefined) {
                const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                    this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
                }
            }
            if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
                // Set one more timeout for a next segment
                setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment);
            }
        };
        this.downloadRandomSegmentOverHttp = async () => {
            if (this.masterSwarmId === undefined ||
                this.httpRandomDownloadInterval === undefined ||
                this.httpDownloadInitialTimeoutTimestamp !== -Infinity ||
                this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads ||
                (this.settings.httpDownloadProbabilitySkipIfNoPeers && this.p2pManager.getPeers().size === 0) ||
                this.settings.consumeOnly) {
                return;
            }
            const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            const segmentsMap = this.p2pManager.getOvrallSegmentsMap();
            const pendingQueue = this.segmentsQueue.filter(s => !this.p2pManager.isDownloading(s) &&
                !this.httpManager.isDownloading(s) &&
                !segmentsMap.has(s.id) &&
                !this.httpManager.isFailed(s) &&
                (s.priority <= this.settings.httpDownloadMaxPriority) &&
                !storageSegments.has(s.id));
            if (pendingQueue.length == 0) {
                return;
            }
            if (Math.random() > this.settings.httpDownloadProbability * pendingQueue.length) {
                return;
            }
            const segment = pendingQueue[Math.floor(Math.random() * pendingQueue.length)];
            this.debugSegments("HTTP download (random)", segment.priority, segment.url);
            this.httpManager.download(segment);
            this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
        };
        this.onPieceBytesDownloaded = (method, bytes, peerId) => {
            this.bandwidthApproximator.addBytes(bytes, this.now());
            this.emit(loader_interface_1.Events.PieceBytesDownloaded, method, bytes, peerId);
        };
        this.onPieceBytesUploaded = (method, bytes, peerId) => {
            this.emit(loader_interface_1.Events.PieceBytesUploaded, method, bytes, peerId);
        };
        this.onSegmentLoaded = async (segment, data, peerId) => {
            this.debugSegments("segment loaded", segment.id, segment.url);
            if (this.masterSwarmId === undefined) {
                return;
            }
            segment.data = data;
            segment.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now());
            await this.segmentsStorage.storeSegment(segment);
            this.emit(loader_interface_1.Events.SegmentLoaded, segment, peerId);
            let storageSegments;
            storageSegments = (storageSegments === undefined ? await this.segmentsStorage.getSegmentsMap(this.masterSwarmId) : storageSegments);
            this.processSegmentsQueue(storageSegments);
            if (!this.settings.consumeOnly) {
                this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
            }
        };
        this.onSegmentError = async (segment, details, peerId) => {
            this.debugSegments("segment error", segment.id, segment.url, peerId, details);
            this.emit(loader_interface_1.Events.SegmentError, segment, details, peerId);
            if (this.masterSwarmId !== undefined) {
                const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                    this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
                }
            }
        };
        this.onPeerConnect = async (peer) => {
            this.emit(loader_interface_1.Events.PeerConnect, peer);
            if (!this.settings.consumeOnly && this.masterSwarmId !== undefined) {
                this.p2pManager.sendSegmentsMap(peer.id, this.createSegmentsMap(await this.segmentsStorage.getSegmentsMap(this.masterSwarmId)));
            }
        };
        this.onPeerClose = (peerId) => {
            this.emit(loader_interface_1.Events.PeerClose, peerId);
        };
        this.onTrackerUpdate = async (data) => {
            if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity &&
                data.incomplete !== undefined && data.incomplete <= 1) {
                this.debugSegments("cancel initial HTTP download timeout - no peers");
                this.httpDownloadInitialTimeoutTimestamp = -Infinity;
                if (this.masterSwarmId !== undefined) {
                    const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                    if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                        this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
                    }
                }
            }
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
        if (settings.bufferedSegmentsCount) {
            if (settings.p2pDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = settings.bufferedSegmentsCount;
            }
            if (settings.httpDownloadMaxPriority === undefined) {
                this.settings.p2pDownloadMaxPriority = settings.bufferedSegmentsCount;
            }
            delete this.settings.bufferedSegmentsCount;
        }
        this.segmentsStorage = (this.settings.segmentsStorage === undefined
            ? new segments_memory_storage_1.SegmentsMemoryStorage(this.settings)
            : this.settings.segmentsStorage);
        this.debug("loader settings", this.settings);
        this.httpManager = this.createHttpManager();
        this.httpManager.on("segment-loaded", this.onSegmentLoaded);
        this.httpManager.on("segment-error", this.onSegmentError);
        this.httpManager.on("bytes-downloaded", (bytes) => this.onPieceBytesDownloaded("http", bytes));
        this.p2pManager = this.createP2PManager();
        this.p2pManager.on("segment-loaded", this.onSegmentLoaded);
        this.p2pManager.on("segment-error", this.onSegmentError);
        this.p2pManager.on("peer-data-updated", async () => {
            if (this.masterSwarmId === undefined) {
                return;
            }
            const storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            if (this.processSegmentsQueue(storageSegments) && !this.settings.consumeOnly) {
                this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
            }
        });
        this.p2pManager.on("bytes-downloaded", (bytes, peerId) => this.onPieceBytesDownloaded("p2p", bytes, peerId));
        this.p2pManager.on("bytes-uploaded", (bytes, peerId) => this.onPieceBytesUploaded("p2p", bytes, peerId));
        this.p2pManager.on("peer-connected", this.onPeerConnect);
        this.p2pManager.on("peer-closed", this.onPeerClose);
        this.p2pManager.on("tracker-update", this.onTrackerUpdate);
    }
    static isSupported() {
        const browserRtc = getBrowserRTC();
        return (browserRtc && (browserRtc.RTCPeerConnection.prototype.createDataChannel !== undefined));
    }
    createHttpManager() {
        return new http_media_manager_1.HttpMediaManager(this.settings);
    }
    createP2PManager() {
        return new p2p_media_manager_1.P2PMediaManager(this.segmentsStorage, this.settings);
    }
    async load(segments, streamSwarmId) {
        if (this.httpRandomDownloadInterval === undefined) { // Do once on first call
            this.httpRandomDownloadInterval = setInterval(this.downloadRandomSegmentOverHttp, this.settings.httpDownloadProbabilityInterval);
            if (this.settings.httpDownloadInitialTimeout > 0 && this.settings.httpDownloadInitialTimeoutPerSegment > 0) {
                // Initialize initial HTTP download timeout (i.e. download initial segments over P2P)
                this.debugSegments("enable initial HTTP download timeout", this.settings.httpDownloadInitialTimeout, "per segment", this.settings.httpDownloadInitialTimeoutPerSegment);
                this.httpDownloadInitialTimeoutTimestamp = this.now();
                setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment + 100);
            }
        }
        if (segments.length > 0) {
            this.masterSwarmId = segments[0].masterSwarmId;
        }
        if (this.masterSwarmId !== undefined) {
            this.p2pManager.setStreamSwarmId(streamSwarmId, this.masterSwarmId);
        }
        this.debug("load segments");
        let updateSegmentsMap = false;
        // stop all http requests and p2p downloads for segments that are not in the new load
        for (const segment of this.segmentsQueue) {
            if (!segments.find(f => f.url == segment.url)) {
                this.debug("remove segment", segment.url);
                if (this.httpManager.isDownloading(segment)) {
                    updateSegmentsMap = true;
                    this.httpManager.abort(segment);
                }
                else {
                    this.p2pManager.abort(segment);
                }
                this.emit(loader_interface_1.Events.SegmentAbort, segment);
            }
        }
        if (this.debug.enabled) {
            for (const segment of segments) {
                if (!this.segmentsQueue.find(f => f.url == segment.url)) {
                    this.debug("add segment", segment.url);
                }
            }
        }
        this.segmentsQueue = segments;
        if (this.masterSwarmId === undefined) {
            return;
        }
        let storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
        updateSegmentsMap = (this.processSegmentsQueue(storageSegments) || updateSegmentsMap);
        if (await this.cleanSegmentsStorage()) {
            storageSegments = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
            updateSegmentsMap = true;
        }
        if (updateSegmentsMap && !this.settings.consumeOnly) {
            this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(storageSegments));
        }
    }
    async getSegment(id) {
        return this.masterSwarmId === undefined
            ? undefined
            : this.segmentsStorage.getSegment(id, this.masterSwarmId);
    }
    getSettings() {
        return this.settings;
    }
    getDetails() {
        return {
            peerId: this.p2pManager.getPeerId()
        };
    }
    async destroy() {
        if (this.httpRandomDownloadInterval !== undefined) {
            clearInterval(this.httpRandomDownloadInterval);
            this.httpRandomDownloadInterval = undefined;
        }
        this.httpDownloadInitialTimeoutTimestamp = -Infinity;
        this.segmentsQueue = [];
        this.httpManager.destroy();
        this.p2pManager.destroy();
        this.masterSwarmId = undefined;
        await this.segmentsStorage.destroy();
    }
    processSegmentsQueue(storageSegments) {
        this.debugSegments("process segments queue. priority", this.segmentsQueue.length > 0 ? this.segmentsQueue[0].priority : 0);
        if (this.masterSwarmId === undefined || this.segmentsQueue.length === 0) {
            return false;
        }
        let updateSegmentsMap = false;
        let segmentsMap;
        let httpAllowed = true;
        if (this.httpDownloadInitialTimeoutTimestamp !== -Infinity) {
            let firstNotDownloadePriority;
            for (const segment of this.segmentsQueue) {
                if (!storageSegments.has(segment.id)) {
                    firstNotDownloadePriority = segment.priority;
                    break;
                }
            }
            const httpTimeout = this.now() - this.httpDownloadInitialTimeoutTimestamp;
            httpAllowed = (httpTimeout >= this.settings.httpDownloadInitialTimeout)
                || ((firstNotDownloadePriority !== undefined) && (httpTimeout > this.settings.httpDownloadInitialTimeoutPerSegment) && (firstNotDownloadePriority <= 0));
            if (httpAllowed) {
                this.debugSegments("cancel initial HTTP download timeout - timed out");
                this.httpDownloadInitialTimeoutTimestamp = -Infinity;
            }
        }
        for (let index = 0; index < this.segmentsQueue.length; index++) {
            const segment = this.segmentsQueue[index];
            if (storageSegments.has(segment.id) || this.httpManager.isDownloading(segment)) {
                continue;
            }
            if (segment.priority <= this.settings.requiredSegmentsPriority && httpAllowed && !this.httpManager.isFailed(segment)) {
                // Download required segments over HTTP
                if (this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads) {
                    // Not enough HTTP download resources. Abort one of the HTTP downloads.
                    for (let i = this.segmentsQueue.length - 1; i > index; i--) {
                        const segmentToAbort = this.segmentsQueue[i];
                        if (this.httpManager.isDownloading(segmentToAbort)) {
                            this.debugSegments("cancel HTTP download", segmentToAbort.priority, segmentToAbort.url);
                            this.httpManager.abort(segmentToAbort);
                            break;
                        }
                    }
                }
                if (this.httpManager.getActiveDownloadsCount() < this.settings.simultaneousHttpDownloads) {
                    // Abort P2P download of the required segment if any and force HTTP download
                    const downloadedPieces = this.p2pManager.abort(segment);
                    this.httpManager.download(segment, downloadedPieces);
                    this.debugSegments("HTTP download (priority)", segment.priority, segment.url);
                    updateSegmentsMap = true;
                    continue;
                }
            }
            if (this.p2pManager.isDownloading(segment)) {
                continue;
            }
            if (segment.priority <= this.settings.requiredSegmentsPriority) { // Download required segments over P2P
                segmentsMap = segmentsMap ? segmentsMap : this.p2pManager.getOvrallSegmentsMap();
                if (segmentsMap.get(segment.id) !== media_peer_1.MediaPeerSegmentStatus.Loaded) {
                    continue;
                }
                if (this.p2pManager.getActiveDownloadsCount() >= this.settings.simultaneousP2PDownloads) {
                    // Not enough P2P download resources. Abort one of the P2P downloads.
                    for (let i = this.segmentsQueue.length - 1; i > index; i--) {
                        const segmentToAbort = this.segmentsQueue[i];
                        if (this.p2pManager.isDownloading(segmentToAbort)) {
                            this.debugSegments("cancel P2P download", segmentToAbort.priority, segmentToAbort.url);
                            this.p2pManager.abort(segmentToAbort);
                            break;
                        }
                    }
                }
                if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads) {
                    if (this.p2pManager.download(segment)) {
                        this.debugSegments("P2P download (priority)", segment.priority, segment.url);
                        continue;
                    }
                }
                continue;
            }
            if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads &&
                segment.priority <= this.settings.p2pDownloadMaxPriority) {
                if (this.p2pManager.download(segment)) {
                    this.debugSegments("P2P download", segment.priority, segment.url);
                }
            }
        }
        return updateSegmentsMap;
    }
    getStreamSwarmId(segment) {
        return segment.streamId === undefined ? segment.masterSwarmId : `${segment.masterSwarmId}+${segment.streamId}`;
    }
    createSegmentsMap(storageSegments) {
        const segmentsMap = {};
        const addSegmentToMap = (segment, status) => {
            const streamSwarmId = this.getStreamSwarmId(segment);
            const segmentId = segment.sequence;
            let segmentsIdsAndStatuses = segmentsMap[streamSwarmId];
            if (segmentsIdsAndStatuses === undefined) {
                segmentsIdsAndStatuses = ["", []];
                segmentsMap[streamSwarmId] = segmentsIdsAndStatuses;
            }
            const segmentsStatuses = segmentsIdsAndStatuses[1];
            segmentsIdsAndStatuses[0] += ((segmentsStatuses.length == 0) ? segmentId : `|${segmentId}`);
            segmentsStatuses.push(status);
        };
        for (const storageSegment of storageSegments.values()) {
            addSegmentToMap(storageSegment.segment, media_peer_1.MediaPeerSegmentStatus.Loaded);
        }
        for (const download of this.httpManager.getActiveDownloads().values()) {
            addSegmentToMap(download.segment, media_peer_1.MediaPeerSegmentStatus.LoadingByHttp);
        }
        return segmentsMap;
    }
    async cleanSegmentsStorage() {
        if (this.masterSwarmId === undefined) {
            return false;
        }
        return this.segmentsStorage.clean(this.masterSwarmId, (id) => this.segmentsQueue.find(queueSegment => queueSegment.id === id) !== undefined);
    }
    now() {
        return performance.now();
    }
}
exports.HybridLoader = HybridLoader;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license Apache-2.0
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = "0.6.2";
__export(__webpack_require__(/*! ./loader-interface */ "./node_modules/p2p-media-loader-core/dist/loader-interface.js"));
__export(__webpack_require__(/*! ./hybrid-loader */ "./node_modules/p2p-media-loader-core/dist/hybrid-loader.js"));


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/loader-interface.js":
/*!*********************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/loader-interface.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    /**
     * Emitted when segment has been downloaded.
     * Args: segment
     */
    Events["SegmentLoaded"] = "segment_loaded";
    /**
     * Emitted when an error occurred while loading the segment.
     * Args: segment, error
     */
    Events["SegmentError"] = "segment_error";
    /**
     * Emitted for each segment that does not hit into a new segments queue when the load() method is called.
     * Args: segment
     */
    Events["SegmentAbort"] = "segment_abort";
    /**
     * Emitted when a peer is connected.
     * Args: peer
     */
    Events["PeerConnect"] = "peer_connect";
    /**
     * Emitted when a peer is disconnected.
     * Args: peerId
     */
    Events["PeerClose"] = "peer_close";
    /**
     * Emitted when a segment piece has been downloaded.
     * Args: method (can be "http" or "p2p" only), bytes
     */
    Events["PieceBytesDownloaded"] = "piece_bytes_downloaded";
    /**
     * Emitted when a segment piece has been uploaded.
     * Args: method (can be "p2p" only), bytes
     */
    Events["PieceBytesUploaded"] = "piece_bytes_uploaded";
})(Events = exports.Events || (exports.Events = {}));


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/media-peer.js":
/*!***************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/media-peer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
const stringly_typed_event_emitter_1 = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./node_modules/p2p-media-loader-core/dist/stringly-typed-event-emitter.js");
const buffer_1 = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
var MediaPeerCommands;
(function (MediaPeerCommands) {
    MediaPeerCommands[MediaPeerCommands["SegmentData"] = 0] = "SegmentData";
    MediaPeerCommands[MediaPeerCommands["SegmentAbsent"] = 1] = "SegmentAbsent";
    MediaPeerCommands[MediaPeerCommands["SegmentsMap"] = 2] = "SegmentsMap";
    MediaPeerCommands[MediaPeerCommands["SegmentRequest"] = 3] = "SegmentRequest";
    MediaPeerCommands[MediaPeerCommands["CancelSegmentRequest"] = 4] = "CancelSegmentRequest";
})(MediaPeerCommands || (MediaPeerCommands = {}));
var MediaPeerSegmentStatus;
(function (MediaPeerSegmentStatus) {
    MediaPeerSegmentStatus[MediaPeerSegmentStatus["Loaded"] = 0] = "Loaded";
    MediaPeerSegmentStatus[MediaPeerSegmentStatus["LoadingByHttp"] = 1] = "LoadingByHttp";
})(MediaPeerSegmentStatus = exports.MediaPeerSegmentStatus || (exports.MediaPeerSegmentStatus = {}));
class DownloadingSegment {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.bytesDownloaded = 0;
        this.pieces = [];
    }
}
class MediaPeer extends stringly_typed_event_emitter_1.STEEmitter {
    constructor(peer, settings) {
        super();
        this.peer = peer;
        this.settings = settings;
        this.remoteAddress = "";
        this.downloadingSegmentId = null;
        this.downloadingSegment = null;
        this.segmentsMap = new Map();
        this.debug = Debug("p2pml:media-peer");
        this.timer = null;
        this.onPeerConnect = () => {
            this.debug("peer connect", this.id, this);
            this.remoteAddress = this.peer.remoteAddress;
            this.emit("connect", this);
        };
        this.onPeerClose = () => {
            this.debug("peer close", this.id, this);
            this.terminateSegmentRequest();
            this.emit("close", this);
        };
        this.onPeerError = (error) => {
            this.debug("peer error", this.id, error, this);
        };
        this.onPeerData = (data) => {
            const command = this.getJsonCommand(data);
            if (command == null) {
                this.receiveSegmentPiece(data);
                return;
            }
            if (this.downloadingSegment) {
                this.debug("peer segment download is interrupted by a command", this.id, this);
                const segmentId = this.downloadingSegment.id;
                this.terminateSegmentRequest();
                this.emit("segment-error", this, segmentId, "Segment download is interrupted by a command");
                return;
            }
            this.debug("peer receive command", this.id, command, this);
            switch (command.c) {
                case MediaPeerCommands.SegmentsMap:
                    this.segmentsMap = this.createSegmentsMap(command.m);
                    this.emit("data-updated");
                    break;
                case MediaPeerCommands.SegmentRequest:
                    this.emit("segment-request", this, command.i);
                    break;
                case MediaPeerCommands.SegmentData:
                    if (this.downloadingSegmentId === command.i) {
                        this.downloadingSegment = new DownloadingSegment(command.i, command.s);
                        this.cancelResponseTimeoutTimer();
                    }
                    break;
                case MediaPeerCommands.SegmentAbsent:
                    if (this.downloadingSegmentId === command.i) {
                        this.terminateSegmentRequest();
                        this.segmentsMap.delete(command.i);
                        this.emit("segment-absent", this, command.i);
                    }
                    break;
                case MediaPeerCommands.CancelSegmentRequest:
                    // TODO: peer stop sending buffer
                    break;
                default:
                    break;
            }
        };
        this.peer.on("connect", this.onPeerConnect);
        this.peer.on("close", this.onPeerClose);
        this.peer.on("error", this.onPeerError);
        this.peer.on("data", this.onPeerData);
        this.id = peer.id;
    }
    receiveSegmentPiece(data) {
        if (!this.downloadingSegment) {
            // The segment was not requested or canceled
            this.debug("peer segment not requested", this.id, this);
            return;
        }
        this.downloadingSegment.bytesDownloaded += data.byteLength;
        this.downloadingSegment.pieces.push(data);
        this.emit("bytes-downloaded", this, data.byteLength);
        const segmentId = this.downloadingSegment.id;
        if (this.downloadingSegment.bytesDownloaded == this.downloadingSegment.size) {
            const segmentData = new Uint8Array(this.downloadingSegment.size);
            let offset = 0;
            for (const piece of this.downloadingSegment.pieces) {
                segmentData.set(new Uint8Array(piece), offset);
                offset += piece.byteLength;
            }
            this.debug("peer segment download done", this.id, segmentId, this);
            this.terminateSegmentRequest();
            this.emit("segment-loaded", this, segmentId, segmentData.buffer);
        }
        else if (this.downloadingSegment.bytesDownloaded > this.downloadingSegment.size) {
            this.debug("peer segment download bytes mismatch", this.id, segmentId, this);
            this.terminateSegmentRequest();
            this.emit("segment-error", this, segmentId, "Too many bytes received for segment");
        }
    }
    getJsonCommand(data) {
        const bytes = new Uint8Array(data);
        // Serialized JSON string check by first, second and last characters: '{" .... }'
        if (bytes[0] == 123 && bytes[1] == 34 && bytes[data.byteLength - 1] == 125) {
            try {
                return JSON.parse(new TextDecoder().decode(data));
            }
            catch (_a) {
            }
        }
        return null;
    }
    createSegmentsMap(segments) {
        if (segments == undefined || !(segments instanceof Object)) {
            return new Map();
        }
        const segmentsMap = new Map();
        for (const streamSwarmId of Object.keys(segments)) {
            const swarmData = segments[streamSwarmId];
            if (!(swarmData instanceof Array) ||
                (swarmData.length !== 2) ||
                (typeof swarmData[0] !== "string") ||
                !(swarmData[1] instanceof Array)) {
                return new Map();
            }
            const segmentsIds = swarmData[0].split("|");
            const segmentsStatuses = swarmData[1];
            if (segmentsIds.length !== segmentsStatuses.length) {
                return new Map();
            }
            for (let i = 0; i < segmentsIds.length; i++) {
                const segmentStatus = segmentsStatuses[i];
                if (typeof segmentStatus !== "number" || MediaPeerSegmentStatus[segmentStatus] === undefined) {
                    return new Map();
                }
                segmentsMap.set(`${streamSwarmId}+${segmentsIds[i]}`, segmentStatus);
            }
        }
        return segmentsMap;
    }
    sendCommand(command) {
        this.debug("peer send command", this.id, command, this);
        this.peer.write(JSON.stringify(command));
    }
    destroy() {
        this.debug("peer destroy", this.id, this);
        this.terminateSegmentRequest();
        this.peer.destroy();
    }
    getDownloadingSegmentId() {
        return this.downloadingSegmentId;
    }
    getSegmentsMap() {
        return this.segmentsMap;
    }
    sendSegmentsMap(segmentsMap) {
        this.sendCommand({ c: MediaPeerCommands.SegmentsMap, m: segmentsMap });
    }
    sendSegmentData(segmentId, data) {
        this.sendCommand({
            c: MediaPeerCommands.SegmentData,
            i: segmentId,
            s: data.byteLength
        });
        let bytesLeft = data.byteLength;
        while (bytesLeft > 0) {
            const bytesToSend = (bytesLeft >= this.settings.webRtcMaxMessageSize ? this.settings.webRtcMaxMessageSize : bytesLeft);
            const buffer = buffer_1.Buffer.from(data, data.byteLength - bytesLeft, bytesToSend);
            this.peer.write(buffer);
            bytesLeft -= bytesToSend;
        }
        this.emit("bytes-uploaded", this, data.byteLength);
    }
    sendSegmentAbsent(segmentId) {
        this.sendCommand({ c: MediaPeerCommands.SegmentAbsent, i: segmentId });
    }
    requestSegment(segmentId) {
        if (this.downloadingSegmentId) {
            throw new Error("A segment is already downloading: " + this.downloadingSegmentId);
        }
        this.sendCommand({ c: MediaPeerCommands.SegmentRequest, i: segmentId });
        this.downloadingSegmentId = segmentId;
        this.runResponseTimeoutTimer();
    }
    cancelSegmentRequest() {
        let downloadingSegment;
        if (this.downloadingSegmentId) {
            const segmentId = this.downloadingSegmentId;
            downloadingSegment = this.downloadingSegment ? this.downloadingSegment.pieces : undefined;
            this.terminateSegmentRequest();
            this.sendCommand({ c: MediaPeerCommands.CancelSegmentRequest, i: segmentId });
        }
        return downloadingSegment;
    }
    runResponseTimeoutTimer() {
        this.timer = setTimeout(() => {
            this.timer = null;
            if (!this.downloadingSegmentId) {
                return;
            }
            const segmentId = this.downloadingSegmentId;
            this.cancelSegmentRequest();
            this.emit("segment-timeout", this, segmentId); // TODO: send peer not responding event
        }, this.settings.p2pSegmentDownloadTimeout);
    }
    cancelResponseTimeoutTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    terminateSegmentRequest() {
        this.downloadingSegmentId = null;
        this.downloadingSegment = null;
        this.cancelResponseTimeoutTimer();
    }
}
exports.MediaPeer = MediaPeer;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/p2p-media-manager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/p2p-media-manager.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
const Client = __webpack_require__(/*! bittorrent-tracker/client */ "./node_modules/bittorrent-tracker/client.js");
const stringly_typed_event_emitter_1 = __webpack_require__(/*! ./stringly-typed-event-emitter */ "./node_modules/p2p-media-loader-core/dist/stringly-typed-event-emitter.js");
const media_peer_1 = __webpack_require__(/*! ./media-peer */ "./node_modules/p2p-media-loader-core/dist/media-peer.js");
const buffer_1 = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
const sha1 = __webpack_require__(/*! sha.js/sha1 */ "./node_modules/sha.js/sha1.js");
const index_1 = __webpack_require__(/*! ./index */ "./node_modules/p2p-media-loader-core/dist/index.js");
const PEER_PROTOCOL_VERSION = 2;
const PEER_ID_VERSION_STRING = index_1.version.replace(/\d*./g, v => `0${parseInt(v, 10) % 100}`.slice(-2)).slice(0, 4);
const PEER_ID_VERSION_PREFIX = `-WW${PEER_ID_VERSION_STRING}-`; // Using WebTorrent client ID in order to not be banned by websocket trackers
class PeerSegmentRequest {
    constructor(peerId, segment) {
        this.peerId = peerId;
        this.segment = segment;
    }
}
function generatePeerId() {
    const PEER_ID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const PEER_ID_LENGTH = 20;
    let peerId = PEER_ID_VERSION_PREFIX;
    for (let i = 0; i < PEER_ID_LENGTH - PEER_ID_VERSION_PREFIX.length; i++) {
        peerId += PEER_ID_SYMBOLS.charAt(Math.floor(Math.random() * PEER_ID_SYMBOLS.length));
    }
    return new TextEncoder().encode(peerId).buffer;
}
class P2PMediaManager extends stringly_typed_event_emitter_1.STEEmitter {
    constructor(sementsStorage, settings) {
        super();
        this.sementsStorage = sementsStorage;
        this.settings = settings;
        this.trackerClient = null;
        this.peers = new Map();
        this.peerCandidates = new Map();
        this.peerSegmentRequests = new Map();
        this.streamSwarmId = null;
        this.debug = Debug("p2pml:p2p-media-manager");
        this.pendingTrackerClient = null;
        this.onTrackerError = (error) => {
            this.debug("tracker error", error);
        };
        this.onTrackerWarning = (warning) => {
            this.debug("tracker warning", warning);
        };
        this.onTrackerUpdate = (data) => {
            this.debug("tracker update", data);
            this.emit("tracker-update", data);
        };
        this.onTrackerPeer = (trackerPeer) => {
            this.debug("tracker peer", trackerPeer.id, trackerPeer);
            if (this.peers.has(trackerPeer.id)) {
                this.debug("tracker peer already connected", trackerPeer.id, trackerPeer);
                trackerPeer.destroy();
                return;
            }
            const peer = new media_peer_1.MediaPeer(trackerPeer, this.settings);
            peer.on("connect", this.onPeerConnect);
            peer.on("close", this.onPeerClose);
            peer.on("data-updated", this.onPeerDataUpdated);
            peer.on("segment-request", this.onSegmentRequest);
            peer.on("segment-loaded", this.onSegmentLoaded);
            peer.on("segment-absent", this.onSegmentAbsent);
            peer.on("segment-error", this.onSegmentError);
            peer.on("segment-timeout", this.onSegmentTimeout);
            peer.on("bytes-downloaded", this.onPieceBytesDownloaded);
            peer.on("bytes-uploaded", this.onPieceBytesUploaded);
            let peerCandidatesById = this.peerCandidates.get(peer.id);
            if (!peerCandidatesById) {
                peerCandidatesById = [];
                this.peerCandidates.set(peer.id, peerCandidatesById);
            }
            peerCandidatesById.push(peer);
        };
        this.onPieceBytesDownloaded = (peer, bytes) => {
            this.emit("bytes-downloaded", bytes, peer.id);
        };
        this.onPieceBytesUploaded = (peer, bytes) => {
            this.emit("bytes-uploaded", bytes, peer.id);
        };
        this.onPeerConnect = (peer) => {
            const connectedPeer = this.peers.get(peer.id);
            if (connectedPeer) {
                this.debug("tracker peer already connected (in peer connect)", peer.id, peer);
                peer.destroy();
                return;
            }
            // First peer with the ID connected
            this.peers.set(peer.id, peer);
            // Destroy all other peer candidates
            const peerCandidatesById = this.peerCandidates.get(peer.id);
            if (peerCandidatesById) {
                for (const peerCandidate of peerCandidatesById) {
                    if (peerCandidate != peer) {
                        peerCandidate.destroy();
                    }
                }
                this.peerCandidates.delete(peer.id);
            }
            this.emit("peer-connected", { id: peer.id, remoteAddress: peer.remoteAddress });
        };
        this.onPeerClose = (peer) => {
            if (this.peers.get(peer.id) != peer) {
                // Try to delete the peer candidate
                const peerCandidatesById = this.peerCandidates.get(peer.id);
                if (!peerCandidatesById) {
                    return;
                }
                const index = peerCandidatesById.indexOf(peer);
                if (index != -1) {
                    peerCandidatesById.splice(index, 1);
                }
                if (peerCandidatesById.length == 0) {
                    this.peerCandidates.delete(peer.id);
                }
                return;
            }
            for (const [key, value] of this.peerSegmentRequests) {
                if (value.peerId == peer.id) {
                    this.peerSegmentRequests.delete(key);
                }
            }
            this.peers.delete(peer.id);
            this.emit("peer-data-updated");
            this.emit("peer-closed", peer.id);
        };
        this.onPeerDataUpdated = () => {
            this.emit("peer-data-updated");
        };
        this.onSegmentRequest = async (peer, segmentId) => {
            if (this.masterSwarmId === undefined) {
                return;
            }
            const segment = await this.sementsStorage.getSegment(segmentId, this.masterSwarmId);
            if (segment) {
                peer.sendSegmentData(segmentId, segment.data);
            }
            else {
                peer.sendSegmentAbsent(segmentId);
            }
        };
        this.onSegmentLoaded = async (peer, segmentId, data) => {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (!peerSegmentRequest) {
                return;
            }
            const segment = peerSegmentRequest.segment;
            if (this.settings.segmentValidator) {
                try {
                    await this.settings.segmentValidator(Object.assign(Object.assign({}, segment), { data: data }), "p2p", peer.id);
                }
                catch (error) {
                    this.debug("segment validator failed", error);
                    this.peerSegmentRequests.delete(segmentId);
                    this.emit("segment-error", segment, error, peer.id);
                    this.onPeerClose(peer);
                    return;
                }
            }
            this.peerSegmentRequests.delete(segmentId);
            this.emit("segment-loaded", segment, data, peer.id);
        };
        this.onSegmentAbsent = (peer, segmentId) => {
            this.peerSegmentRequests.delete(segmentId);
            this.emit("peer-data-updated");
        };
        this.onSegmentError = (peer, segmentId, description) => {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (peerSegmentRequest) {
                this.peerSegmentRequests.delete(segmentId);
                this.emit("segment-error", peerSegmentRequest.segment, description, peer.id);
            }
        };
        this.onSegmentTimeout = (peer, segmentId) => {
            const peerSegmentRequest = this.peerSegmentRequests.get(segmentId);
            if (peerSegmentRequest) {
                this.peerSegmentRequests.delete(segmentId);
                peer.destroy();
                if (this.peers.delete(peerSegmentRequest.peerId)) {
                    this.emit("peer-data-updated");
                }
            }
        };
        this.peerId = settings.useP2P ? generatePeerId() : new ArrayBuffer(0);
        if (this.debug.enabled) {
            this.debug("peer ID", this.getPeerId(), new TextDecoder().decode(this.peerId));
        }
    }
    getPeers() {
        return this.peers;
    }
    getPeerId() {
        return buffer_1.Buffer.from(this.peerId).toString("hex");
    }
    async setStreamSwarmId(streamSwarmId, masterSwarmId) {
        if (this.streamSwarmId === streamSwarmId) {
            return;
        }
        this.destroy(true);
        this.streamSwarmId = streamSwarmId;
        this.masterSwarmId = masterSwarmId;
        this.debug("stream swarm ID", this.streamSwarmId);
        this.pendingTrackerClient = {
            isDestroyed: false
        };
        const pendingTrackerClient = this.pendingTrackerClient;
        // TODO: native browser 'crypto.subtle' implementation doesn't work in Chrome in insecure pages
        // TODO: Edge doesn't support SHA-1. Change to SHA-256 once Edge support is required.
        // const infoHash = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(PEER_PROTOCOL_VERSION + this.streamSwarmId));
        const infoHash = new sha1().update(PEER_PROTOCOL_VERSION + this.streamSwarmId).digest();
        // destroy may be called while waiting for the hash to be calculated
        if (!pendingTrackerClient.isDestroyed) {
            this.pendingTrackerClient = null;
            this.createClient(infoHash);
        }
        else if (this.trackerClient != null) {
            this.trackerClient.destroy();
            this.trackerClient = null;
        }
    }
    createClient(infoHash) {
        if (!this.settings.useP2P) {
            return;
        }
        const clientOptions = {
            infoHash: buffer_1.Buffer.from(infoHash, 0, 20),
            peerId: buffer_1.Buffer.from(this.peerId, 0, 20),
            announce: this.settings.trackerAnnounce,
            rtcConfig: this.settings.rtcConfig,
            port: 6881,
            getAnnounceOpts: () => {
                return { numwant: this.settings.peerRequestsPerAnnounce };
            }
        };
        let oldTrackerClient = this.trackerClient;
        this.trackerClient = new Client(clientOptions);
        this.trackerClient.on("error", this.onTrackerError);
        this.trackerClient.on("warning", this.onTrackerWarning);
        this.trackerClient.on("update", this.onTrackerUpdate);
        this.trackerClient.on("peer", this.onTrackerPeer);
        this.trackerClient.start();
        if (oldTrackerClient != null) {
            oldTrackerClient.destroy();
            oldTrackerClient = null;
        }
    }
    download(segment) {
        if (this.isDownloading(segment)) {
            return false;
        }
        const candidates = [];
        for (const peer of this.peers.values()) {
            if ((peer.getDownloadingSegmentId() == null) &&
                (peer.getSegmentsMap().get(segment.id) === media_peer_1.MediaPeerSegmentStatus.Loaded)) {
                candidates.push(peer);
            }
        }
        if (candidates.length === 0) {
            return false;
        }
        const peer = candidates[Math.floor(Math.random() * candidates.length)];
        peer.requestSegment(segment.id);
        this.peerSegmentRequests.set(segment.id, new PeerSegmentRequest(peer.id, segment));
        return true;
    }
    abort(segment) {
        let downloadingSegment;
        const peerSegmentRequest = this.peerSegmentRequests.get(segment.id);
        if (peerSegmentRequest) {
            const peer = this.peers.get(peerSegmentRequest.peerId);
            if (peer) {
                downloadingSegment = peer.cancelSegmentRequest();
            }
            this.peerSegmentRequests.delete(segment.id);
        }
        return downloadingSegment;
    }
    isDownloading(segment) {
        return this.peerSegmentRequests.has(segment.id);
    }
    getActiveDownloadsCount() {
        return this.peerSegmentRequests.size;
    }
    destroy(swarmChange = false) {
        this.streamSwarmId = null;
        if (this.trackerClient) {
            this.trackerClient.stop();
            if (swarmChange) {
                // Don't destroy trackerClient to reuse its WebSocket connection to the tracker server
                this.trackerClient.removeAllListeners("error");
                this.trackerClient.removeAllListeners("warning");
                this.trackerClient.removeAllListeners("update");
                this.trackerClient.removeAllListeners("peer");
            }
            else {
                this.trackerClient.destroy();
                this.trackerClient = null;
            }
        }
        if (this.pendingTrackerClient) {
            this.pendingTrackerClient.isDestroyed = true;
            this.pendingTrackerClient = null;
        }
        this.peers.forEach(peer => peer.destroy());
        this.peers.clear();
        this.peerSegmentRequests.clear();
        for (const peerCandidateById of this.peerCandidates.values()) {
            for (const peerCandidate of peerCandidateById) {
                peerCandidate.destroy();
            }
        }
        this.peerCandidates.clear();
    }
    sendSegmentsMapToAll(segmentsMap) {
        this.peers.forEach(peer => peer.sendSegmentsMap(segmentsMap));
    }
    sendSegmentsMap(peerId, segmentsMap) {
        const peer = this.peers.get(peerId);
        if (peer) {
            peer.sendSegmentsMap(segmentsMap);
        }
    }
    getOvrallSegmentsMap() {
        const overallSegmentsMap = new Map();
        for (const peer of this.peers.values()) {
            for (const [segmentId, segmentStatus] of peer.getSegmentsMap()) {
                if (segmentStatus === media_peer_1.MediaPeerSegmentStatus.Loaded) {
                    overallSegmentsMap.set(segmentId, media_peer_1.MediaPeerSegmentStatus.Loaded);
                }
                else if (!overallSegmentsMap.get(segmentId)) {
                    overallSegmentsMap.set(segmentId, media_peer_1.MediaPeerSegmentStatus.LoadingByHttp);
                }
            }
        }
        return overallSegmentsMap;
    }
}
exports.P2PMediaManager = P2PMediaManager;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/segments-memory-storage.js":
/*!****************************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/segments-memory-storage.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2019 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class SegmentsMemoryStorage {
    constructor(settings) {
        this.settings = settings;
        this.cache = new Map();
    }
    async storeSegment(segment) {
        this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
    }
    async getSegmentsMap(masterSwarmId) {
        return this.cache;
    }
    async getSegment(id, masterSwarmId) {
        const cacheItem = this.cache.get(id);
        if (cacheItem === undefined) {
            return undefined;
        }
        cacheItem.lastAccessed = performance.now();
        return cacheItem.segment;
    }
    async hasSegment(id, masterSwarmId) {
        return this.cache.has(id);
    }
    async clean(masterSwarmId, lockedSementsfilter) {
        const segmentsToDelete = [];
        const remainingSegments = [];
        // Delete old segments
        const now = performance.now();
        for (const cachedSegment of this.cache.values()) {
            if (now - cachedSegment.lastAccessed > this.settings.cachedSegmentExpiration) {
                segmentsToDelete.push(cachedSegment.segment.id);
            }
            else {
                remainingSegments.push(cachedSegment);
            }
        }
        // Delete segments over cached count
        let countOverhead = remainingSegments.length - this.settings.cachedSegmentsCount;
        if (countOverhead > 0) {
            remainingSegments.sort((a, b) => a.lastAccessed - b.lastAccessed);
            for (const cachedSegment of remainingSegments) {
                if ((lockedSementsfilter === undefined) || !lockedSementsfilter(cachedSegment.segment.id)) {
                    segmentsToDelete.push(cachedSegment.segment.id);
                    countOverhead--;
                    if (countOverhead == 0) {
                        break;
                    }
                }
            }
        }
        segmentsToDelete.forEach(id => this.cache.delete(id));
        return segmentsToDelete.length > 0;
    }
    async destroy() {
        this.cache.clear();
    }
}
exports.SegmentsMemoryStorage = SegmentsMemoryStorage;


/***/ }),

/***/ "./node_modules/p2p-media-loader-core/dist/stringly-typed-event-emitter.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/p2p-media-loader-core/dist/stringly-typed-event-emitter.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
class STEEmitter extends events_1.EventEmitter {
    on(event, listener) { return super.on(event, listener); }
    emit(event, ...args) { return super.emit(event, ...args); }
}
exports.STEEmitter = STEEmitter;


/***/ }),

/***/ "./node_modules/p2p-media-loader-hlsjs/dist/engine.js":
/*!************************************************************!*\
  !*** ./node_modules/p2p-media-loader-hlsjs/dist/engine.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const p2p_media_loader_core_1 = __webpack_require__(/*! p2p-media-loader-core */ "./node_modules/p2p-media-loader-core/dist/index.js");
const segment_manager_1 = __webpack_require__(/*! ./segment-manager */ "./node_modules/p2p-media-loader-hlsjs/dist/segment-manager.js");
const hlsjs_loader_1 = __webpack_require__(/*! ./hlsjs-loader */ "./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader.js");
const hlsjs_loader_class_1 = __webpack_require__(/*! ./hlsjs-loader-class */ "./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader-class.js");
class Engine extends events_1.EventEmitter {
    constructor(settings = {}) {
        super();
        this.loader = new p2p_media_loader_core_1.HybridLoader(settings.loader);
        this.segmentManager = new segment_manager_1.SegmentManager(this.loader, settings.segments);
        Object.keys(p2p_media_loader_core_1.Events)
            .map(eventKey => p2p_media_loader_core_1.Events[eventKey])
            .forEach(event => this.loader.on(event, (...args) => this.emit(event, ...args)));
    }
    static isSupported() {
        return p2p_media_loader_core_1.HybridLoader.isSupported();
    }
    createLoaderClass() {
        return hlsjs_loader_class_1.createHlsJsLoaderClass(hlsjs_loader_1.HlsJsLoader, this);
    }
    async destroy() {
        await this.segmentManager.destroy();
    }
    getSettings() {
        return {
            segments: this.segmentManager.getSettings(),
            loader: this.loader.getSettings()
        };
    }
    getDetails() {
        return {
            loader: this.loader.getDetails()
        };
    }
    setPlayingSegment(url, byterange, start, duration) {
        this.segmentManager.setPlayingSegment(url, byterange, start, duration);
    }
    setPlayingSegmentByCurrentTime(playheadPosition) {
        this.segmentManager.setPlayingSegmentByCurrentTime(playheadPosition);
    }
}
exports.Engine = Engine;


/***/ }),

/***/ "./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader-class.js":
/*!************************************************************************!*\
  !*** ./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader-class.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createHlsJsLoaderClass(HlsJsLoader, engine) {
    function HlsJsLoaderClass() {
        this.impl = new HlsJsLoader(engine.segmentManager);
        this.stats = this.impl.stats;
    }

    HlsJsLoaderClass.prototype.load = function (context, config, callbacks) {
        this.context = context;
        this.impl.load(context, config, callbacks);
    };

    HlsJsLoaderClass.prototype.abort = function () {
        this.impl.abort(this.context);
    };

    HlsJsLoaderClass.prototype.destroy = function () {
        if (this.context) {
            this.impl.abort(this.context);
        }
    };

    HlsJsLoaderClass.getEngine = function () {
        return engine;
    };

    return HlsJsLoaderClass;
}

module.exports.createHlsJsLoaderClass = createHlsJsLoaderClass;


/***/ }),

/***/ "./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader.js":
/*!******************************************************************!*\
  !*** ./node_modules/p2p-media-loader-hlsjs/dist/hlsjs-loader.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_DOWNLOAD_LATENCY = 1;
const DEFAULT_DOWNLOAD_BANDWIDTH = 12500; // bytes per millisecond
class HlsJsLoader {
    constructor(segmentManager) {
        this.stats = {}; // required for older versions of hls.js
        this.segmentManager = segmentManager;
    }
    async load(context, _config, callbacks) {
        if (context.type) {
            try {
                const result = await this.segmentManager.loadPlaylist(context.url);
                this.successPlaylist(result, context, callbacks);
            }
            catch (e) {
                this.error(e, context, callbacks);
            }
        }
        else if (context.frag) {
            try {
                const result = await this.segmentManager.loadSegment(context.url, (context.rangeStart == undefined) || (context.rangeEnd == undefined)
                    ? undefined
                    : { offset: context.rangeStart, length: context.rangeEnd - context.rangeStart });
                if (result.content !== undefined) {
                    setTimeout(() => this.successSegment(result.content, result.downloadBandwidth, context, callbacks), 0);
                }
            }
            catch (e) {
                setTimeout(() => this.error(e, context, callbacks), 0);
            }
        }
        else {
            console.warn("Unknown load request", context);
        }
    }
    abort(context) {
        this.segmentManager.abortSegment(context.url, (context.rangeStart == undefined) || (context.rangeEnd == undefined)
            ? undefined
            : { offset: context.rangeStart, length: context.rangeEnd - context.rangeStart });
    }
    successPlaylist(xhr, context, callbacks) {
        const now = performance.now();
        this.stats.trequest = now - 300;
        this.stats.tfirst = now - 200;
        this.stats.tload = now;
        this.stats.loaded = xhr.response.length;
        callbacks.onSuccess({
            url: xhr.responseURL,
            data: xhr.response
        }, this.stats, context);
    }
    successSegment(content, downloadBandwidth, context, callbacks) {
        const now = performance.now();
        const downloadTime = content.byteLength / (((downloadBandwidth === undefined) || (downloadBandwidth <= 0)) ? DEFAULT_DOWNLOAD_BANDWIDTH : downloadBandwidth);
        this.stats.trequest = now - DEFAULT_DOWNLOAD_LATENCY - downloadTime;
        this.stats.tfirst = now - downloadTime;
        this.stats.tload = now;
        this.stats.loaded = content.byteLength;
        callbacks.onSuccess({
            url: context.url,
            data: content
        }, this.stats, context);
    }
    error(error, context, callbacks) {
        callbacks.onError(error, context);
    }
}
exports.HlsJsLoader = HlsJsLoader;


/***/ }),

/***/ "./node_modules/p2p-media-loader-hlsjs/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/p2p-media-loader-hlsjs/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license Apache-2.0
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = "0.6.2";
__export(__webpack_require__(/*! ./engine */ "./node_modules/p2p-media-loader-hlsjs/dist/engine.js"));
__export(__webpack_require__(/*! ./segment-manager */ "./node_modules/p2p-media-loader-hlsjs/dist/segment-manager.js"));
function initHlsJsPlayer(player) {
    if (player && player.config && player.config.loader && typeof player.config.loader.getEngine === "function") {
        initHlsJsEvents(player, player.config.loader.getEngine());
    }
}
exports.initHlsJsPlayer = initHlsJsPlayer;
function initClapprPlayer(player) {
    player.on("play", () => {
        const playback = player.core.getCurrentPlayback();
        if (playback._hls && !playback._hls._p2pm_linitialized) {
            playback._hls._p2pm_linitialized = true;
            initHlsJsPlayer(player.core.getCurrentPlayback()._hls);
        }
    });
}
exports.initClapprPlayer = initClapprPlayer;
function initFlowplayerHlsJsPlayer(player) {
    player.on("ready", () => initHlsJsPlayer(player.engine.hlsjs ? player.engine.hlsjs : player.engine.hls));
}
exports.initFlowplayerHlsJsPlayer = initFlowplayerHlsJsPlayer;
function initVideoJsContribHlsJsPlayer(player) {
    player.ready(() => {
        const options = player.tech_.options_;
        if (options && options.hlsjsConfig && options.hlsjsConfig.loader && typeof options.hlsjsConfig.loader.getEngine === "function") {
            initHlsJsEvents(player.tech_, options.hlsjsConfig.loader.getEngine());
        }
    });
}
exports.initVideoJsContribHlsJsPlayer = initVideoJsContribHlsJsPlayer;
function initVideoJsHlsJsPlugin() {
    if (videojs == undefined || videojs.Html5Hlsjs == undefined) {
        return;
    }
    videojs.Html5Hlsjs.addHook("beforeinitialize", (videojsPlayer, hlsjs) => {
        if (hlsjs.config && hlsjs.config.loader && typeof hlsjs.config.loader.getEngine === "function") {
            initHlsJsEvents(hlsjs, hlsjs.config.loader.getEngine());
        }
    });
}
exports.initVideoJsHlsJsPlugin = initVideoJsHlsJsPlugin;
function initMediaElementJsPlayer(mediaElement) {
    mediaElement.addEventListener("hlsFragChanged", (event) => {
        const hls = mediaElement.hlsPlayer;
        if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
            const engine = hls.config.loader.getEngine();
            if (event.data && (event.data.length > 1)) {
                const frag = event.data[1].frag;
                const byterange = (frag.byteRange.length !== 2)
                    ? undefined
                    : { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
                engine.setPlayingSegment(frag.url, byterange, frag.start, frag.duration);
            }
        }
    });
    mediaElement.addEventListener("hlsDestroying", async () => {
        const hls = mediaElement.hlsPlayer;
        if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
            const engine = hls.config.loader.getEngine();
            await engine.destroy();
        }
    });
    mediaElement.addEventListener("hlsError", (event) => {
        const hls = mediaElement.hlsPlayer;
        if (hls && hls.config && hls.config.loader && typeof hls.config.loader.getEngine === "function") {
            if ((event.data !== undefined) && (event.data.details === "bufferStalledError")) {
                const engine = hls.config.loader.getEngine();
                engine.setPlayingSegmentByCurrentTime(hls.media.currentTime);
            }
        }
    });
}
exports.initMediaElementJsPlayer = initMediaElementJsPlayer;
function initJwPlayer(player, hlsjsConfig) {
    const iid = setInterval(() => {
        if (player.hls && player.hls.config) {
            clearInterval(iid);
            Object.assign(player.hls.config, hlsjsConfig);
            initHlsJsPlayer(player.hls);
        }
    }, 200);
}
exports.initJwPlayer = initJwPlayer;
function initHlsJsEvents(player, engine) {
    player.on("hlsFragChanged", (_event, data) => {
        const frag = data.frag;
        const byterange = (frag.byteRange.length !== 2)
            ? undefined
            : { offset: frag.byteRange[0], length: frag.byteRange[1] - frag.byteRange[0] };
        engine.setPlayingSegment(frag.url, byterange, frag.start, frag.duration);
    });
    player.on("hlsDestroying", async () => {
        await engine.destroy();
    });
    player.on("hlsError", (_event, errorData) => {
        if (errorData.details === "bufferStalledError") {
            const htmlMediaElement = player.media === undefined
                ? player.el_ // videojs-contrib-hlsjs
                : player.media; // all others
            if (htmlMediaElement === undefined) {
                return;
            }
            engine.setPlayingSegmentByCurrentTime(htmlMediaElement.currentTime);
        }
    });
}


/***/ }),

/***/ "./node_modules/p2p-media-loader-hlsjs/dist/segment-manager.js":
/*!*********************************************************************!*\
  !*** ./node_modules/p2p-media-loader-hlsjs/dist/segment-manager.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const p2p_media_loader_core_1 = __webpack_require__(/*! p2p-media-loader-core */ "./node_modules/p2p-media-loader-core/dist/index.js");
const m3u8_parser_1 = __webpack_require__(/*! m3u8-parser */ "./node_modules/m3u8-parser/dist/m3u8-parser.es.js");
const defaultSettings = {
    forwardSegmentCount: 20,
    swarmId: undefined,
    assetsStorage: undefined,
};
class SegmentManager {
    constructor(loader, settings = {}) {
        this.masterPlaylist = null;
        this.variantPlaylists = new Map();
        this.segmentRequest = null;
        this.playQueue = [];
        this.onSegmentLoaded = (segment) => {
            if (this.segmentRequest && (this.segmentRequest.segmentUrl === segment.url) &&
                (byterangeToString(this.segmentRequest.segmentByterange) === segment.range)) {
                this.segmentRequest.onSuccess(segment.data.slice(0), segment.downloadBandwidth);
                this.segmentRequest = null;
            }
        };
        this.onSegmentError = (segment, error) => {
            if (this.segmentRequest && (this.segmentRequest.segmentUrl === segment.url) &&
                (byterangeToString(this.segmentRequest.segmentByterange) === segment.range)) {
                this.segmentRequest.onError(error);
                this.segmentRequest = null;
            }
        };
        this.onSegmentAbort = (segment) => {
            if (this.segmentRequest && (this.segmentRequest.segmentUrl === segment.url) &&
                (byterangeToString(this.segmentRequest.segmentByterange) === segment.range)) {
                this.segmentRequest.onError("Loading aborted: internal abort");
                this.segmentRequest = null;
            }
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), settings);
        this.loader = loader;
        this.loader.on(p2p_media_loader_core_1.Events.SegmentLoaded, this.onSegmentLoaded);
        this.loader.on(p2p_media_loader_core_1.Events.SegmentError, this.onSegmentError);
        this.loader.on(p2p_media_loader_core_1.Events.SegmentAbort, this.onSegmentAbort);
    }
    getSettings() {
        return this.settings;
    }
    processPlaylist(requestUrl, content, responseUrl) {
        const parser = new m3u8_parser_1.Parser();
        parser.push(content);
        parser.end();
        const playlist = new Playlist(requestUrl, responseUrl, parser.manifest);
        if (playlist.manifest.playlists) {
            this.masterPlaylist = playlist;
            for (const [key, variantPlaylist] of this.variantPlaylists) {
                const { streamSwarmId, found, index } = this.getStreamSwarmId(variantPlaylist.requestUrl);
                if (!found) {
                    this.variantPlaylists.delete(key);
                }
                else {
                    variantPlaylist.streamSwarmId = streamSwarmId;
                    variantPlaylist.streamId = "V" + index.toString();
                }
            }
        }
        else {
            const { streamSwarmId, found, index } = this.getStreamSwarmId(requestUrl);
            if (found || (this.masterPlaylist === null)) { // do not add audio and subtitles to variants
                playlist.streamSwarmId = streamSwarmId;
                playlist.streamId = (this.masterPlaylist === null ? undefined : "V" + index.toString());
                this.variantPlaylists.set(requestUrl, playlist);
                this.updateSegments();
            }
        }
    }
    async loadPlaylist(url) {
        const assetsStorage = this.settings.assetsStorage;
        let xhr;
        if (assetsStorage !== undefined) {
            let masterSwarmId;
            masterSwarmId = this.getMasterSwarmId();
            if (masterSwarmId === undefined) {
                masterSwarmId = url.split("?")[0];
            }
            const asset = await assetsStorage.getAsset(url, undefined, masterSwarmId);
            if (asset !== undefined) {
                xhr = {
                    responseURL: asset.responseUri,
                    response: asset.data,
                };
            }
            else {
                xhr = await this.loadContent(url, "text");
                assetsStorage.storeAsset({
                    masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : url,
                    masterSwarmId: masterSwarmId,
                    requestUri: url,
                    responseUri: xhr.responseURL,
                    data: xhr.response,
                });
            }
        }
        else {
            xhr = await this.loadContent(url, "text");
        }
        this.processPlaylist(url, xhr.response, xhr.responseURL);
        return xhr;
    }
    async loadSegment(url, byterange) {
        const segmentLocation = this.getSegmentLocation(url, byterange);
        const byteRangeString = byterangeToString(byterange);
        if (!segmentLocation) {
            let content;
            // Not a segment from variants; usually can be: init, audio or subtitles segment, encription key etc.
            const assetsStorage = this.settings.assetsStorage;
            if (assetsStorage !== undefined) {
                let masterManifestUri = this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : undefined;
                let masterSwarmId;
                masterSwarmId = this.getMasterSwarmId();
                if (masterSwarmId === undefined && this.variantPlaylists.size === 1) {
                    masterSwarmId = this.variantPlaylists.values().next().value.requestUrl.split("?")[0];
                }
                if (masterManifestUri === undefined && this.variantPlaylists.size === 1) {
                    masterManifestUri = this.variantPlaylists.values().next().value.requestUrl;
                }
                if (masterSwarmId !== undefined && masterManifestUri !== undefined) {
                    const asset = await assetsStorage.getAsset(url, byteRangeString, masterSwarmId);
                    if (asset !== undefined) {
                        content = asset.data;
                    }
                    else {
                        const xhr = await this.loadContent(url, "arraybuffer", byteRangeString);
                        content = xhr.response;
                        assetsStorage.storeAsset({
                            masterManifestUri: masterManifestUri,
                            masterSwarmId: masterSwarmId,
                            requestUri: url,
                            requestRange: byteRangeString,
                            responseUri: xhr.responseURL,
                            data: content,
                        });
                    }
                }
            }
            if (content === undefined) {
                const xhr = await this.loadContent(url, "arraybuffer", byteRangeString);
                content = xhr.response;
            }
            return { content, downloadBandwidth: 0 };
        }
        const segmentSequence = (segmentLocation.playlist.manifest.mediaSequence ? segmentLocation.playlist.manifest.mediaSequence : 0)
            + segmentLocation.segmentIndex;
        if (this.playQueue.length > 0) {
            const previousSegment = this.playQueue[this.playQueue.length - 1];
            if (previousSegment.segmentSequence !== segmentSequence - 1) {
                // Reset play queue in case of segment loading out of sequence
                this.playQueue = [];
            }
        }
        if (this.segmentRequest) {
            this.segmentRequest.onError("Cancel segment request: simultaneous segment requests are not supported");
        }
        const promise = new Promise((resolve, reject) => {
            this.segmentRequest = new SegmentRequest(url, byterange, segmentSequence, segmentLocation.playlist.requestUrl, (content, downloadBandwidth) => resolve({ content, downloadBandwidth }), error => reject(error));
        });
        this.playQueue.push({ segmentUrl: url, segmentByterange: byterange, segmentSequence: segmentSequence });
        this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, true);
        return promise;
    }
    setPlayingSegment(url, byterange, start, duration) {
        const urlIndex = this.playQueue.findIndex(segment => (segment.segmentUrl == url) && compareByterange(segment.segmentByterange, byterange));
        if (urlIndex >= 0) {
            this.playQueue = this.playQueue.slice(urlIndex);
            this.playQueue[0].playPosition = { start, duration };
            this.updateSegments();
        }
    }
    setPlayingSegmentByCurrentTime(playheadPosition) {
        if (this.playQueue.length === 0 || !this.playQueue[0].playPosition) {
            return;
        }
        const currentSegmentPosition = this.playQueue[0].playPosition;
        const segmentEndTime = currentSegmentPosition.start + currentSegmentPosition.duration;
        if (segmentEndTime - playheadPosition < 0.2) {
            // means that current segment is (almost) finished playing
            // remove it from queue
            this.playQueue = this.playQueue.slice(1);
            this.updateSegments();
        }
    }
    abortSegment(url, byterange) {
        if (this.segmentRequest && (this.segmentRequest.segmentUrl === url) &&
            compareByterange(this.segmentRequest.segmentByterange, byterange)) {
            this.segmentRequest.onSuccess(undefined, 0);
            this.segmentRequest = null;
        }
    }
    async destroy() {
        if (this.segmentRequest) {
            this.segmentRequest.onError("Loading aborted: object destroyed");
            this.segmentRequest = null;
        }
        this.masterPlaylist = null;
        this.variantPlaylists.clear();
        this.playQueue = [];
        if (this.settings.assetsStorage !== undefined) {
            await this.settings.assetsStorage.destroy();
        }
        await this.loader.destroy();
    }
    updateSegments() {
        if (!this.segmentRequest) {
            return;
        }
        const segmentLocation = this.getSegmentLocation(this.segmentRequest.segmentUrl, this.segmentRequest.segmentByterange);
        if (segmentLocation) {
            this.loadSegments(segmentLocation.playlist, segmentLocation.segmentIndex, false);
        }
    }
    getSegmentLocation(url, byterange) {
        for (const playlist of this.variantPlaylists.values()) {
            const segmentIndex = playlist.getSegmentIndex(url, byterange);
            if (segmentIndex >= 0) {
                return { playlist: playlist, segmentIndex: segmentIndex };
            }
        }
        return undefined;
    }
    async loadSegments(playlist, segmentIndex, requestFirstSegment) {
        const segments = [];
        const playlistSegments = playlist.manifest.segments;
        const initialSequence = playlist.manifest.mediaSequence ? playlist.manifest.mediaSequence : 0;
        let loadSegmentId = null;
        let priority = Math.max(0, this.playQueue.length - 1);
        const masterSwarmId = this.getMasterSwarmId();
        for (let i = segmentIndex; i < playlistSegments.length && segments.length < this.settings.forwardSegmentCount; ++i) {
            const segment = playlist.manifest.segments[i];
            const url = playlist.getSegmentAbsoluteUrl(segment.uri);
            const byterange = segment.byterange;
            const id = this.getSegmentId(playlist, initialSequence + i);
            segments.push({
                id: id,
                url: url,
                masterSwarmId: masterSwarmId !== undefined ? masterSwarmId : playlist.streamSwarmId,
                masterManifestUri: this.masterPlaylist !== null ? this.masterPlaylist.requestUrl : playlist.requestUrl,
                streamId: playlist.streamId,
                sequence: (initialSequence + i).toString(),
                range: byterangeToString(byterange),
                priority: priority++,
            });
            if (requestFirstSegment && !loadSegmentId) {
                loadSegmentId = id;
            }
        }
        this.loader.load(segments, playlist.streamSwarmId);
        if (loadSegmentId) {
            const segment = await this.loader.getSegment(loadSegmentId);
            if (segment) { // Segment already loaded by loader
                this.onSegmentLoaded(segment);
            }
        }
    }
    getSegmentId(playlist, segmentSequence) {
        return `${playlist.streamSwarmId}+${segmentSequence}`;
    }
    getMasterSwarmId() {
        const settingsSwarmId = (this.settings.swarmId && (this.settings.swarmId.length !== 0)) ? this.settings.swarmId : undefined;
        if (settingsSwarmId !== undefined) {
            return settingsSwarmId;
        }
        return (this.masterPlaylist !== null)
            ? this.masterPlaylist.requestUrl.split("?")[0]
            : undefined;
    }
    getStreamSwarmId(playlistUrl) {
        const masterSwarmId = this.getMasterSwarmId();
        if (this.masterPlaylist !== null) {
            for (let i = 0; i < this.masterPlaylist.manifest.playlists.length; ++i) {
                const url = new URL(this.masterPlaylist.manifest.playlists[i].uri, this.masterPlaylist.responseUrl).toString();
                if (url === playlistUrl) {
                    return { streamSwarmId: `${masterSwarmId}+V${i}`, found: true, index: i };
                }
            }
        }
        return {
            streamSwarmId: masterSwarmId !== undefined ? masterSwarmId : playlistUrl.split("?")[0],
            found: false,
            index: -1
        };
    }
    async loadContent(url, responseType, range) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = responseType;
            if (range) {
                xhr.setRequestHeader("Range", range);
            }
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                }
                else {
                    reject(xhr.statusText);
                }
            });
            const xhrSetup = this.loader.getSettings().xhrSetup;
            if (xhrSetup) {
                xhrSetup(xhr, url);
            }
            xhr.send();
        });
    }
}
exports.SegmentManager = SegmentManager;
class Playlist {
    constructor(requestUrl, responseUrl, manifest) {
        this.requestUrl = requestUrl;
        this.responseUrl = responseUrl;
        this.manifest = manifest;
        this.streamSwarmId = "";
    }
    getSegmentIndex(url, byterange) {
        for (let i = 0; i < this.manifest.segments.length; ++i) {
            const segment = this.manifest.segments[i];
            const segmentUrl = this.getSegmentAbsoluteUrl(segment.uri);
            if ((url === segmentUrl) && compareByterange(segment.byterange, byterange)) {
                return i;
            }
        }
        return -1;
    }
    getSegmentAbsoluteUrl(segmentUrl) {
        return new URL(segmentUrl, this.responseUrl).toString();
    }
}
class SegmentRequest {
    constructor(segmentUrl, segmentByterange, segmentSequence, playlistRequestUrl, onSuccess, onError) {
        this.segmentUrl = segmentUrl;
        this.segmentByterange = segmentByterange;
        this.segmentSequence = segmentSequence;
        this.playlistRequestUrl = playlistRequestUrl;
        this.onSuccess = onSuccess;
        this.onError = onError;
    }
}
function compareByterange(b1, b2) {
    return (b1 === undefined)
        ? (b2 === undefined)
        : ((b2 !== undefined) && (b1.length === b2.length) && (b1.offset === b2.offset));
}
function byterangeToString(byterange) {
    if (byterange === undefined) {
        return undefined;
    }
    const end = byterange.offset + byterange.length - 1;
    return `bytes=${byterange.offset}-${end}`;
}


/***/ }),

/***/ "./node_modules/sha.js/hash.js":
/*!*************************************!*\
  !*** ./node_modules/sha.js/hash.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer

// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = Buffer.alloc(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = Buffer.from(data, enc)
  }

  var block = this._block
  var blockSize = this._blockSize
  var length = data.length
  var accum = this._len

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize
    var remainder = Math.min(length - offset, blockSize - assigned)

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i]
    }

    accum += remainder
    offset += remainder

    if ((accum % blockSize) === 0) {
      this._update(block)
    }
  }

  this._len += length
  return this
}

Hash.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize

  this._block[rem] = 0x80

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1)

  if (rem >= this._finalSize) {
    this._update(this._block)
    this._block.fill(0)
  }

  var bits = this._len * 8

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4)

  // uint64
  } else {
    var lowBits = (bits & 0xffffffff) >>> 0
    var highBits = (bits - lowBits) / 0x100000000

    this._block.writeUInt32BE(highBits, this._blockSize - 8)
    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
  }

  this._update(this._block)
  var hash = this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash


/***/ }),

/***/ "./node_modules/sha.js/sha1.js":
/*!*************************************!*\
  !*** ./node_modules/sha.js/sha1.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var Hash = __webpack_require__(/*! ./hash */ "./node_modules/sha.js/hash.js")
var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1


/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map