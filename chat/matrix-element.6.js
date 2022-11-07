(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[6],{

/***/ "0bb9":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CancelablePromise = void 0;
  _exports.cancelable = cancelable;
  _exports.default = void 0;
  _exports.isCancelablePromise = isCancelablePromise;

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  var _internals = /*#__PURE__*/new WeakMap();

  var _promise = /*#__PURE__*/new WeakMap();

  var CancelablePromiseInternal = /*#__PURE__*/function () {
    function CancelablePromiseInternal(_ref) {
      var _ref$executor = _ref.executor,
          executor = _ref$executor === void 0 ? function () {} : _ref$executor,
          _ref$internals = _ref.internals,
          internals = _ref$internals === void 0 ? defaultInternals() : _ref$internals,
          _ref$promise = _ref.promise,
          promise = _ref$promise === void 0 ? new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }) : _ref$promise;

      _classCallCheck(this, CancelablePromiseInternal);

      _classPrivateFieldInitSpec(this, _internals, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _promise, {
        writable: true,
        value: void 0
      });

      this.cancel = this.cancel.bind(this);

      _classPrivateFieldSet(this, _internals, internals);

      _classPrivateFieldSet(this, _promise, promise || new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }));
    }

    _createClass(CancelablePromiseInternal, [{
      key: "then",
      value: function then(onfulfilled, onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).then(createCallback(onfulfilled, _classPrivateFieldGet(this, _internals)), createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "catch",
      value: function _catch(onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).catch(createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "finally",
      value: function _finally(onfinally, runWhenCanceled) {
        var _this = this;

        if (runWhenCanceled) {
          _classPrivateFieldGet(this, _internals).onCancelList.push(onfinally);
        }

        return makeCancelable(_classPrivateFieldGet(this, _promise).finally(createCallback(function () {
          if (onfinally) {
            if (runWhenCanceled) {
              _classPrivateFieldGet(_this, _internals).onCancelList = _classPrivateFieldGet(_this, _internals).onCancelList.filter(function (callback) {
                return callback !== onfinally;
              });
            }

            return onfinally();
          }
        }, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "cancel",
      value: function cancel() {
        _classPrivateFieldGet(this, _internals).isCanceled = true;

        var callbacks = _classPrivateFieldGet(this, _internals).onCancelList;

        _classPrivateFieldGet(this, _internals).onCancelList = [];

        var _iterator = _createForOfIteratorHelper(callbacks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var callback = _step.value;

            if (typeof callback === 'function') {
              try {
                callback();
              } catch (err) {
                console.error(err);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "isCanceled",
      value: function isCanceled() {
        return _classPrivateFieldGet(this, _internals).isCanceled === true;
      }
    }]);

    return CancelablePromiseInternal;
  }();

  var CancelablePromise = /*#__PURE__*/function (_CancelablePromiseInt) {
    _inherits(CancelablePromise, _CancelablePromiseInt);

    var _super = _createSuper(CancelablePromise);

    function CancelablePromise(executor) {
      _classCallCheck(this, CancelablePromise);

      return _super.call(this, {
        executor: executor
      });
    }

    return _createClass(CancelablePromise);
  }(CancelablePromiseInternal);

  _exports.CancelablePromise = CancelablePromise;

  _defineProperty(CancelablePromise, "all", function all(iterable) {
    return makeAllCancelable(iterable, Promise.all(iterable));
  });

  _defineProperty(CancelablePromise, "allSettled", function allSettled(iterable) {
    return makeAllCancelable(iterable, Promise.allSettled(iterable));
  });

  _defineProperty(CancelablePromise, "any", function any(iterable) {
    return makeAllCancelable(iterable, Promise.any(iterable));
  });

  _defineProperty(CancelablePromise, "race", function race(iterable) {
    return makeAllCancelable(iterable, Promise.race(iterable));
  });

  _defineProperty(CancelablePromise, "resolve", function resolve(value) {
    return cancelable(Promise.resolve(value));
  });

  _defineProperty(CancelablePromise, "reject", function reject(reason) {
    return cancelable(Promise.reject(reason));
  });

  _defineProperty(CancelablePromise, "isCancelable", isCancelablePromise);

  var _default = CancelablePromise;
  _exports.default = _default;

  function cancelable(promise) {
    return makeCancelable(promise, defaultInternals());
  }

  function isCancelablePromise(promise) {
    return promise instanceof CancelablePromise || promise instanceof CancelablePromiseInternal;
  }

  function createCallback(onResult, internals) {
    if (onResult) {
      return function (arg) {
        if (!internals.isCanceled) {
          var result = onResult(arg);

          if (isCancelablePromise(result)) {
            internals.onCancelList.push(result.cancel);
          }

          return result;
        }

        return arg;
      };
    }
  }

  function makeCancelable(promise, internals) {
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function makeAllCancelable(iterable, promise) {
    var internals = defaultInternals();
    internals.onCancelList.push(function () {
      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var resolvable = _step2.value;

          if (isCancelablePromise(resolvable)) {
            resolvable.cancel();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function defaultInternals() {
    return {
      isCanceled: false,
      onCancelList: []
    };
  }
});
//# sourceMappingURL=CancelablePromise.js.map

/***/ }),

/***/ "1097":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f2bc");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("2ab77a92", content, shadowRoot)
};

/***/ }),

/***/ "16e59":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5c95");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("cb65d9a2", content, shadowRoot)
};

/***/ }),

/***/ "2bea":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// async-each MIT license (by Paul Miller from https://paulmillr.com).
(function(globals) {
  'use strict';
  var each = function(items, next, callback) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = Function.prototype; // no-op

    if (items.length === 0) return callback(undefined, items);

    var transformed = new Array(items.length);
    var count = 0;
    var returned = false;

    items.forEach(function(item, index) {
      next(item, function(error, transformedItem) {
        if (returned) return;
        if (error) {
          returned = true;
          return callback(error);
        }
        transformed[index] = transformedItem;
        count += 1;
        if (count === items.length) return callback(undefined, transformed);
      });
    });
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return each;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
  } else {}
})(this);


/***/ }),

/***/ "2e53":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_3f87c0fa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1097");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_3f87c0fa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_3f87c0fa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_3f87c0fa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_3f87c0fa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "3136":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e8b463ac_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("53b4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e8b463ac_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e8b463ac_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e8b463ac_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e8b463ac_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "439c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a28e80a8_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("16e59");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a28e80a8_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a28e80a8_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a28e80a8_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a28e80a8_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "4994":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_34d15f18_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5a58");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_34d15f18_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_34d15f18_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_34d15f18_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_scss_vue_type_style_index_0_id_34d15f18_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "53b4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("aeb2");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3160b183", content, shadowRoot)
};

/***/ }),

/***/ "5a58":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ead2");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0810035e", content, shadowRoot)
};

/***/ }),

/***/ "5c95":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".upload[data-v-a28e80a8]{width:100%}.uploadWrapper[data-v-a28e80a8]{position:relative}.uploadWrapper .inputWrapper[data-v-a28e80a8],.uploadWrapper .inputWrapper input[data-v-a28e80a8]{position:absolute;left:0;right:0;top:0;bottom:0;opacity:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "aeb2":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatInput[data-v-e8b463ac]{padding-bottom:.5em}[data-v-e8b463ac] #modal.minimized .modal-wrapper{left:0}[data-v-e8b463ac] .previewWrapper{padding-left:.5em!important;padding-right:.5em!important}.inputWrapper[data-v-e8b463ac]{display:flex}.inputWrapper .left[data-v-e8b463ac]{width:35px;display:flex;justify-content:flex-end;align-items:center;text-align:center}.inputWrapper .left .iconbutton[data-v-e8b463ac]{display:flex;align-items:center;justify-content:center;height:35px;width:35px;-webkit-tap-highlight-color:transparent}.inputWrapper .extended[data-v-e8b463ac]{width:70px;margin-left:7px}.inputWrapper .leftdummy[data-v-e8b463ac]{width:.5em}.inputWrapper>div[data-v-e8b463ac]{transition:.3s}.inputWrapper .center[data-v-e8b463ac]{max-height:110px;max-width:100%;display:flex;justify-content:space-between;align-items:center;flex-grow:1;border:1px solid transparent;border-radius:30px;background:rgb(var(--background-secondary-theme))}.inputWrapper input[data-v-e8b463ac]{border:1px solid rgb(var(--neutral-grad-0));background:rgba(var(--background-main),.5);border-radius:30px;width:100%;padding:.5em 1em}.notready[data-v-e8b463ac],.waitjoined[data-v-e8b463ac]{padding:.5em 0;text-align:center}.waitjoined span[data-v-e8b463ac]{font-size:.8em}.greetings[data-v-e8b463ac]{padding:.5em 0}.greetings[data-v-e8b463ac],[data-v-e8b463ac] .iconWrapper{text-align:center}.menu-item[data-v-e8b463ac]{padding:.5em;background:rgb(var(--background-total-theme));line-height:44px;border-radius:5px;display:flex}.menu-item .title[data-v-e8b463ac]{flex-grow:2;padding-right:44px;text-align:center}.menu-item .iconWrapper[data-v-e8b463ac]{width:44px}.tipusers[data-v-e8b463ac]{position:absolute;max-height:300px;border-radius:.5em;border:1px solid rgba(var(--neutral-grad-0),.9);overflow-y:overlay;background-color:rgba(var(--background-total-theme),.95);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);padding:.25em 0;bottom:100%;margin-bottom:.5em;left:.25em;right:.25em}.tipusers .previewWrapperExt[data-v-e8b463ac]{border-radius:.75em;margin-left:.25em;margin-right:.25em;padding-top:.25em;padding-bottom:.25em}.tipusers .previewWrapperExt[data-v-e8b463ac] .previewWrapper{padding-left:.25em!important;padding-right:.25em!important}.tipusers .previewWrapperExt.selected[data-v-e8b463ac]{background:rgb(var(--background-main))}.disabled[data-v-e8b463ac]{display:flex;justify-content:center;align-items:center;width:35px;height:35px;color:rgb(var(--neutral-grad-3))}.disabled i[data-v-e8b463ac]{padding-top:1px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "ead2":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".recordButton_wrapper[data-v-34d15f18]{position:relative}.recordButton_holder[data-v-34d15f18]{visibility:hidden;position:absolute;display:flex;justify-content:center;align-items:center;height:16px;width:16px;background:#789;border-radius:50%;bottom:98px;transition:.1s;right:9px}.recordButton_holder .icon[data-v-34d15f18]{color:#fff;font-size:7px}.recordButton_holder.active[data-v-34d15f18]{visibility:visible}.recordButton_holder.hold[data-v-34d15f18]{background:#789;visibility:visible;bottom:38px}.recordButton_holder.hold .icon[data-v-34d15f18]{color:#fff}.recordButton_main[data-v-34d15f18]{padding-top:1px;touch-action:none;display:flex;align-items:center;justify-content:center;width:35px;height:35px;line-height:35px!important;background:transparent;border-radius:50%;outline:none;position:relative}.recordButton_main.active[data-v-34d15f18]{background:rgb(var(--color-bg-ac));-webkit-animation:pulse-data-v-34d15f18 1.2s infinite;animation:pulse-data-v-34d15f18 1.2s infinite}.recordButton_main.active .icon[data-v-34d15f18]{color:rgb(var(--text-on-bg-shadow-color))}.recordButton_main.active[data-v-34d15f18]:before{position:absolute;left:-30px;bottom:-30px;right:-30px;top:-30px;content:\"\";border-radius:50%;border:35px solid rgba(var(--color-bg-ac),.5);-webkit-animation:pulse-data-v-34d15f18 1.2s infinite;animation:pulse-data-v-34d15f18 1.2s infinite}.recordButton_main.disabled .icon[data-v-34d15f18]{color:rgb(var(--neutral-grad-2))}.recordButton_main.outside[data-v-34d15f18],.recordButton_stop[data-v-34d15f18]{background:rgb(var(--color-bad))}.recordButton_stop[data-v-34d15f18]{color:rgb(var(--text-on-bg-shadow-color));font-size:.7em}@-webkit-keyframes pulse-data-v-34d15f18{0%{opacity:1}50%{opacity:.8}to{opacity:1}}@keyframes pulse-data-v-34d15f18{0%{opacity:1}50%{opacity:.8}to{opacity:1}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "f2bc":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".recordProgress[data-v-3f87c0fa]{display:flex;height:20px;justify-content:flex-start;padding:0 1em;align-items:center;max-width:80%;flex-grow:2}.recordProgress .indicatorWrapper[data-v-3f87c0fa]{min-width:20px;width:20px;margin-right:1em;display:flex;justify-content:center;align-items:center}.recordProgress .indicator[data-v-3f87c0fa]{height:6px;width:6px;background:#ff033e;border-radius:50%}.recordProgress .indicator.recording[data-v-3f87c0fa]{-webkit-animation:pulse-data-v-3f87c0fa 1.2s ease infinite;animation:pulse-data-v-3f87c0fa 1.2s ease infinite}.recordProgress .del[data-v-3f87c0fa]{min-width:20px;cursor:pointer;display:flex;justify-content:center;align-items:center;width:20px;height:20px;margin-right:1em}.recordProgress .del i[data-v-3f87c0fa]{color:red;font-size:13px}.recordProgress .timer[data-v-3f87c0fa]{margin-right:1em}.recordProgress .graph[data-v-3f87c0fa]{margin:0 auto;width:100px;overflow:hidden;border-radius:15px}.cancel[data-v-3f87c0fa],.recordProgress .graph[data-v-3f87c0fa]{display:flex;justify-content:center}.cancel[data-v-3f87c0fa]{position:absolute;left:0;right:0;top:0;bottom:0;background:rgb(var(--background-secondary-theme));opacity:0;text-align:center;align-items:center}.cancel span[data-v-3f87c0fa]{white-space:nowrap;font-size:.9em}@-webkit-keyframes pulse-data-v-3f87c0fa{0%{opacity:1}50%{opacity:.1}to{opacity:1}}@keyframes pulse-data-v-3f87c0fa{0%{opacity:1}50%{opacity:.1}to{opacity:1}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fe01":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7206903e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/index.vue?vue&type=template&id=e8b463ac&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"noswipepnt",attrs:{"id":"chatInput"}},[(_vm.ready)?_c('div',{staticClass:"work"},[(_vm.chat)?_c('div',{staticClass:"inputWrapper"},[(_vm.tipusers.length)?_c('div',{staticClass:"tipusers"},_vm._l((_vm.tipusers),function(user,i){return _c('div',{key:user.id,staticClass:"previewWrapperExt",class:{selected : _vm.tipuserindex == i},on:{"click":function($event){return _vm.insertuser(user)}}},[_c('preview',{attrs:{"contact":user,"mode":""}})],1)}),0):_vm._e(),_c('div',{staticClass:"center"},[(_vm.voiceEnable && (_vm.isRecording || _vm.record))?_c('record-progress',{attrs:{"recordTime":_vm.recordTime,"isRecording":_vm.isRecording,"rmsData":_vm.recordRmsData,"opacity":_vm.cancelOpacity},on:{"onClear":_vm.clear}}):_c('InputField',{ref:"newinput",attrs:{"storagekey":'chatinput' + _vm.chat.roomId,"tipusers":_vm.tipusers},on:{"chatMessage":_vm.sendinput,"emptyInput":_vm.emitInputData,"FilledInput":_vm.HideUploadPic,"base64":_vm.pasteImage,"focused":_vm.focused,"tipsearchrequest":_vm.tipBySearch,"browsetip":_vm.browsetip,"selectcurrenttip":_vm.selectcurrenttip}}),(_vm.upload && _vm.chat)?_c('div',{staticClass:"left",class:{extended: _vm.voiceEnable}},[(!_vm.isRecording && !_vm.record)?_c('div',{staticClass:"iconbutton"},[_c('dropdownMenu',{ref:"dropdownMenu",attrs:{"menuItems":_vm.menuItems,"rowObject":{},"icon":"fas fa-plus"},scopedSlots:_vm._u([{key:"default",fn:function(slotProps){return [(!slotProps.item.upload)?_c('div',{staticClass:"menu-item",on:{"click":function($event){return _vm.menuItemClick(slotProps.item)}}},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])]):_c('upload',{attrs:{"onlyimage":slotProps.item.upload.onlyimage,"multiple":slotProps.item.upload.multiple,"extensions":slotProps.item.upload.extensions,"images":slotProps.item.upload.images},on:{"start":function (files) { return _vm.uploadStart(slotProps.item, files); },"uploaded":function (data) { return _vm.uploadUploaded(slotProps.item, data); },"uploadedAll":function (result) { return _vm.uploadUploadedAll(slotProps.item, result); },"error":function (error) { return _vm.uploadError(slotProps.item, error); }},scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('div',{staticClass:"menu-item"},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])])]},proxy:true},{key:"dropzone",fn:function(){return undefined},proxy:true}],null,true)})]}}],null,false,3187246467)})],1):_vm._e(),(_vm.voiceEnable)?[_c('div',{directives:[{name:"show",rawName:"v-show",value:((_vm.isRecording || !_vm.record)),expression:"(isRecording || !record)"}],staticClass:"iconbutton"},[_c('recordVoice',{attrs:{"prepareRecording":_vm.prepareRecording ? true : false,"isRecording":_vm.isRecording,"disabled":_vm.microphoneDisabled},on:{"onRecordingStart":_vm.initRecording,"onRecordingStop":_vm.stopRecording,"onClear":_vm.clear,"canceling":_vm.setOpacity}})],1)]:_vm._e(),(!_vm.isRecording && _vm.record)?_c('div',{staticClass:"iconbutton",on:{"click":function (e) {_vm.sendVoiceMessage()}}},[_vm._m(0)]):_vm._e()],2):_vm._e()],1)]):_vm._e()]):_c('div',{staticClass:"notready"},[_c('linepreloader')],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('i',{staticClass:"icon fas fa-paper-plane"})])}]


// CONCATENATED MODULE: ./src/components/chat/input/index.vue?vue&type=template&id=e8b463ac&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__("907a");

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// EXTERNAL MODULE: ./src/components/chat/input/InputField/InputField.vue + 9 modules
var InputField = __webpack_require__("ed32");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7206903e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/assets/recordVoice/index.vue?vue&type=template&id=34d15f18&scoped=true&
var recordVoicevue_type_template_id_34d15f18_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"recordButton_wrapper"},[_c('div',{ref:"holder",staticClass:"recordButton_holder",class:{hold: _vm.isHold}},[_c('i',{staticClass:"icon fas",class:_vm.isHold ? 'fa-lock': 'fa-lock-open'})]),(!_vm.isHold)?_c('div',{ref:"toggle",staticClass:"recordButton_micro recordButton_main",class:{active: _vm.isRecording, disabled: _vm.disabled},on:{"mousedown":_vm.mousedown,"mouseup":_vm.mouseup,"touchstart":_vm.handleTouchStart,"touchend":_vm.handleTouchEnd,"touchcancel":_vm.handleTouchEnd}},[_c('i',{staticClass:"icon fas fa-microphone"})]):_vm._e(),(_vm.isHold)?_c('div',{ref:"stop",staticClass:"recordButton_stop recordButton_main",on:{"click":_vm.recordEnd}},[_c('i',{staticClass:"icon fas fa-stop"})]):_vm._e()])}
var recordVoicevue_type_template_id_34d15f18_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/assets/recordVoice/index.vue?vue&type=template&id=34d15f18&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/assets/recordVoice?vue&type=script&lang=js&

/* harmony default export */ var recordVoice_vue_type_script_lang_js_ = ({
  name: "recordVoice",
  props: {
    isRecording: {
      type: Boolean,
      required: true
    },
    prepareRecording: {
      type: Boolean
    },
    disabled: Boolean
  },

  data() {
    return {
      start: 0,
      isHold: false,
      direction: null
    };
  },

  computed: { ...Object(vuex_esm["c" /* mapState */])({
      mobile: state => state.mobile
    })
  },

  mounted() {},

  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('touchmove', this.handleMove);

    if (this.isRecording) {
      this.$emit('onRecordingStop', {
        cancel: true
      });
    }
  },

  methods: {
    mouseup: function (e) {
      if (!this.mobile) this.handleTouchEnd(e);
    },
    mousedown: function (e) {
      if (!this.mobile) this.handleTouchStart(e);
    },

    handleTouchStart(e) {
      console.log("E", e, this.isHold, this.isRecording);

      if (!this.isRecording) {
        this.$emit('onRecordingStart');
      } else {
        if (this.isHold) return;
      }

      this.start = {
        Y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY,
        X: e.changedTouches ? e.changedTouches[0].pageX : e.pageX
      };
      if (!this.mobile) document.addEventListener('mousemove', this.handleMove);else document.addEventListener('touchmove', this.handleMove);
    },

    handleTouchEnd(e) {
      console.log("E", e, this.isHold);
      if (this.isHold) return;

      if (this.isRecording || this.prepareRecording) {
        this.$emit('onRecordingStop', {
          sendnow: true
        });
      }

      document.removeEventListener('mousemove', this.handleMove);
      document.removeEventListener('touchmove', this.handleMove);
      this.clearStyle();
    },

    clearStyle() {
      if (this.$refs.toggle) {
        this.$refs.toggle.style.transform = `translate(0,0)`;
        this.$refs.toggle.classList.remove('outside');
      }

      if (this.$refs.holder) {
        this.$refs.holder.classList.remove('active');
      }
    },

    handleMove(e) {
      var _e$changedTouches;

      console.log("E", e, this.isRecording);
      if (!this.isRecording) return;
      let deltaY = this.start.Y - e.pageY;
      let deltaX = this.start.X - e.pageX;

      if (e !== null && e !== void 0 && (_e$changedTouches = e.changedTouches) !== null && _e$changedTouches !== void 0 && _e$changedTouches.length) {
        deltaY = this.start.Y - e.changedTouches[0].pageY;
        deltaX = this.start.X - e.changedTouches[0].pageX;
      }

      if (deltaY > 5 && deltaX < 5) {
        this.direction = 'Y';
      } else {
        this.direction = 'X';
      }

      if (deltaY > 5 && this.direction === 'Y') {
        if (!this.$refs.holder.classList.contains('active')) this.$refs.holder.classList.add('active');
        this.$refs.toggle.style.transform = `translate(0,-${deltaY}px)`;

        if (deltaY > 70) {
          this.$refs.toggle.style.transform = `translate(0,0)`;
          document.removeEventListener('mousemove', this.handleMove);
          document.removeEventListener('touchmove', this.handleMove); //document.removeEventListener('mouseup', this.handleTouchEnd)

          this.isHold = true;
        }
      } else if (deltaX > 5 && this.direction === 'X') {
        this.$refs.toggle.style.transform = `translate(-${deltaX}px, 0)`;
        if (!this.$refs.holder.classList.contains('outside')) this.$refs.toggle.classList.add('outside');
        this.$emit('canceling', (deltaX - 5) / 130);

        if (deltaX > 130) {
          this.$refs.toggle.style.transform = `translate(0,0)`;
          document.removeEventListener('mousemove', this.handleMove);
          document.removeEventListener('touchmove', this.handleMove); //document.removeEventListener('mouseup', this.handleTouchEnd)

          this.$emit('onRecordingStop', {
            cancel: true
          });
          this.$emit('onClear');
        }
      } else {
        this.clearStyle();
      }
    },

    recordEnd(e) {
      this.clearStyle();

      if (this.isRecording && this.isHold) {
        this.$emit('onRecordingStop', {});
        this.isHold = false;
        return;
      }
    }

  }
});
// CONCATENATED MODULE: ./src/components/assets/recordVoice?vue&type=script&lang=js&
 /* harmony default export */ var assets_recordVoice_vue_type_script_lang_js_ = (recordVoice_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/assets/recordVoice/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("4994")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_recordVoice_vue_type_script_lang_js_,
  recordVoicevue_type_template_id_34d15f18_scoped_true_render,
  recordVoicevue_type_template_id_34d15f18_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "34d15f18",
  null
  ,true
)

/* harmony default export */ var recordVoice = (component.exports);
// EXTERNAL MODULE: ./src/application/utils/images.js
var utils_images = __webpack_require__("5059");

// EXTERNAL MODULE: ./src/components/contacts/list/index.vue + 9 modules
var list = __webpack_require__("f978");

// EXTERNAL MODULE: ./src/components/contacts/preview/index.vue + 4 modules
var preview = __webpack_require__("92a6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7206903e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/assets/recordProgress/index.vue?vue&type=template&id=3f87c0fa&scoped=true&
var recordProgressvue_type_template_id_3f87c0fa_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"recordProgress"},[(_vm.isRecording)?_c('div',{staticClass:"indicatorWrapper"},[_c('div',{staticClass:"indicator",class:{'recording': _vm.isRecording}})]):_c('div',{staticClass:"del",on:{"click":_vm.clear}},[_c('i',{staticClass:"fas fa-trash"})]),_c('div',{staticClass:"timer"},[_vm._v(_vm._s(_vm.timer))]),_c('div',{ref:"graph",staticClass:"graph"},[_c('canvas',{ref:"canvas",attrs:{"id":"canvas","width":_vm.width,"height":"20"}})]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isRecording && _vm.opacity),expression:"isRecording && opacity"}],ref:"cancel",staticClass:"cancel"},[_c('span',[_vm._v("Slide left to cancel")])])])}
var recordProgressvue_type_template_id_3f87c0fa_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/assets/recordProgress/index.vue?vue&type=template&id=3f87c0fa&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/assets/recordProgress?vue&type=script&lang=js&
/* harmony default export */ var recordProgress_vue_type_script_lang_js_ = ({
  name: "recordProgress",
  props: {
    recordTime: {
      type: Number,
      required: true
    },
    rmsData: {
      type: Array,
      required: true
    },
    isRecording: {
      type: Boolean
    },
    opacity: {}
  },

  data() {
    return {
      width: 0
    };
  },

  computed: {
    timer() {
      let minute = Math.floor(this.recordTime / 60000);
      let sec = Math.floor(this.recordTime / 1000) % 60;
      return `${minute ? minute + ':' : '0:'}${sec < 10 ? '0' + sec : sec}`;
    },

    rmsDataLast() {
      return _.last(this.rmsData, 25);
    }

  },
  watch: {
    rmsData: _.throttle(function () {
      this.draw();
    }, 30),
    opacity: function () {
      this.$refs.cancel.style.opacity = this.opacity;
    }
  },

  mounted() {
    this.$refs.cancel.style.opacity = 0;
    let width = this.$refs.graph.offsetWidth;
    this.width = width - width % 100;
    window.addEventListener("resize", this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },

  methods: {
    resize() {
      let timer = null;

      var re = () => {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            let width = this.$refs.graph.offsetWidth;
            this.width = width - width % 100;
          }, 50);
        }
      };

      re();
    },

    draw() {
      if (!this.$refs.canvas) return;
      const ctx = this.$refs.canvas.getContext(`2d`);
      let x = 0;
      let count = 50;
      let width = 2; //this.width / 200

      var l = this.rmsDataLast.length;
      var c = Math.max(Math.floor(l / count), 1);
      ctx.clearRect(0, 0, this.width, 20);

      for (let i = 0; i < l; i = i + c) {
        ctx.fillStyle = '#00a4ff';
        ctx.fillRect(i * 2 * width, 10 - this.rmsDataLast[i] / 8, width, this.rmsDataLast[i] / 4 + 1);
      }
    },

    clear() {
      this.$emit('onClear');
    }

  }
});
// CONCATENATED MODULE: ./src/components/assets/recordProgress?vue&type=script&lang=js&
 /* harmony default export */ var assets_recordProgress_vue_type_script_lang_js_ = (recordProgress_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/assets/recordProgress/index.vue



function recordProgress_injectStyles (context) {
  
  var style0 = __webpack_require__("2e53")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var recordProgress_component = Object(componentNormalizer["a" /* default */])(
  assets_recordProgress_vue_type_script_lang_js_,
  recordProgressvue_type_template_id_3f87c0fa_scoped_true_render,
  recordProgressvue_type_template_id_3f87c0fa_scoped_true_staticRenderFns,
  false,
  recordProgress_injectStyles,
  "3f87c0fa",
  null
  ,true
)

/* harmony default export */ var recordProgress = (recordProgress_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7206903e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/assets/upload/index.vue?vue&type=template&id=a28e80a8&scoped=true&
var uploadvue_type_template_id_a28e80a8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"upload"},[_c('div',{staticClass:"uploadWrapper"},[_c('div',{staticClass:"contentWrapper"},[_vm._t("content",function(){return [_c('i',{staticClass:"fas fa-plus"})]})],2),_c('div',{staticClass:"inputWrapper"},[_c('input',{attrs:{"type":"file","multiple":_vm.multiple},on:{"change":_vm.upload}})])]),(_vm.dropzone)?_c('div',{ref:"dropzone",staticClass:"dropzone",class:{dropzone : _vm.dropzone}},[_vm._t("dropzone",function(){return [_c('i',{staticClass:"fas fa-plus"}),_vm._v(" "+_vm._s(_vm.$t("caption.dragAndDropAFile"))+" ")]})],2):_vm._e()])}
var uploadvue_type_template_id_a28e80a8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/assets/upload/index.vue?vue&type=template&id=a28e80a8&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/assets/upload/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var each = __webpack_require__("2bea");

var uploadvue_type_script_lang_js_images = new utils_images["a" /* default */]();
/* harmony default export */ var uploadvue_type_script_lang_js_ = ({
  name: 'upload',
  directives: {},
  props: {
    dropzone: String,
    multiple: Boolean,
    onlyimage: Boolean,
    maxsize: {
      default: 25,
      type: Number
    },
    extensions: {
      type: Array,
      default: () => []
    },
    images: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      loading: false
    };
  },
  computed: {
    maxSize() {
      return this.maxsize * 1024 * 1024;
    }

  },
  created: () => {},
  methods: {
    read: function (file) {
      var reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = function (e) {
          resolve({
            base64: e.target.result,
            file: file
          });
        };

        reader.readAsDataURL(file);
      });
    },
    upload: function (event) {
      var _event$dataTransfer, _event$target;

      event.stopPropagation();
      event.preventDefault();
      var files = ((_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files) || ((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.files) || event.files || [];
      var result = {};
      this.loading = true;
      this.$emit('start', files);
      var ha = this;
      each(_.toArray(files), (file, next) => {
        var error = this.check(file);

        if (error) {
          ha.$emit('error', {
            error: error,
            file: file,
            text: this.errorText(error, file)
          });
          next(new Error(error));
          return;
        }

        this.read(file).then(data => {
          result[data.file.name] = data;
          return this.handle(data);
        }).then(data => {
          ha.$emit('uploaded', data);
          next();
        }).catch(e => {
          ha.$emit('error', {
            error: e,
            file: file,
            text: this.errorText(e, file)
          });
          next(new Error(error));
        });
      }, err => {
        this.loading = false;
        ha.$emit('uploadedAll', result);
      });
    },
    errorText: function (error, file) {
      if (error === 'filesize') {
        return "File Size Error: (" + file.name + "). The File can't be more than " + this.maxsize + " mbytes";
      }

      if (error === 'fileext') {
        return "File Extension Error:" + file.name;
      }
    },
    check: function (file) {
      if (!this.checkSize(file)) {
        return 'filesize';
      }

      if (!this.checkExtension(file)) {
        return 'fileext';
      }
    },
    checkSize: function (file) {
      return file.size <= this.maxSize;
    },
    getExtension: function (file) {
      var name = file.name.split('.');
      var ext = name[name.length - 1].toLowerCase();
      return ext;
    },
    checkExtension: function (file) {
      if (this.extensions.length) {
        if (_.indexOf(this.extensions, this.getExtension(file)) == -1) return false;
      }

      return true;
    },
    handle: function (data) {
      if (data.file.type === 'image/jpeg' || data.file.type === 'image/png' || data.file.type === 'image/webp') {
        return this.handleImages(data);
      }

      return Promise.resolve(data);
    },
    sendAnyFile: function (data) {
      this.$emit('anyFile', data);
    },
    resizeIfNeed: function (base64, ftype) {
      if (this.images.resize) {
        var type = this.images.resize.type || 'def';
        return uploadvue_type_script_lang_js_images.resize[type](base64, this.images.resize.width || 1024, this.images.resize.height || 1024, ftype, this.images.resize.quality || 0.85).then(base64 => {
          return Promise.resolve(base64);
        }).catch(e => {
          return Promise.reject(e);
        });
      }

      return Promise.resolve(base64);
    },
    handleImages: function (data) {
      return uploadvue_type_script_lang_js_images.autorotation(data.file, data.base64).then(base64 => {
        data.base64 = base64;
        return Promise.resolve(data);
      }).then(data => {
        return this.resizeIfNeed(data.base64, data.file.type).then(base64 => {
          data.base64 = base64;
          return Promise.resolve(data);
        });

        if (this.images.resize) {
          var type = this.images.resize.type || 'def';
          return uploadvue_type_script_lang_js_images.resize[type](data.base64, this.images.resize.width || 1024, this.images.resize.height || 1024, data.file.type, this.images.resize.quality || 0.85).then(base64 => {
            data.base64 = base64;
            return Promise.resolve(data);
          }).catch(e => {
            return Promise.reject(e);
          });
        }

        return Promise.resolve(data);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/assets/upload/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var assets_uploadvue_type_script_lang_js_ = (uploadvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/assets/upload/index.vue



function upload_injectStyles (context) {
  
  var style0 = __webpack_require__("439c")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var upload_component = Object(componentNormalizer["a" /* default */])(
  assets_uploadvue_type_script_lang_js_,
  uploadvue_type_template_id_a28e80a8_scoped_true_render,
  uploadvue_type_template_id_a28e80a8_scoped_true_staticRenderFns,
  false,
  upload_injectStyles,
  "a28e80a8",
  null
  ,true
)

/* harmony default export */ var upload = (upload_component.exports);
// EXTERNAL MODULE: ./node_modules/cancelable-promise/umd/CancelablePromise.js
var CancelablePromise = __webpack_require__("0bb9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/input?vue&type=script&lang=js&












/* harmony default export */ var input_vue_type_script_lang_js_ = ({
  name: 'chatInput',
  props: {
    chat: Object,
    u: String,
    relationEvent: Object
  },
  components: {
    InputField: InputField["a" /* default */],
    contacts: list["default"],
    preview: preview["a" /* default */],
    recordProgress: recordProgress,
    recordVoice: recordVoice,
    upload: upload
  },
  data: function () {
    return {
      upload: true,
      test: [],
      loading: false,
      text: '',
      file: {},
      fileInfo: {},
      ready: false,
      creating: false,
      userId: '',
      showuserselect: null,
      anyUrlMeta: String,
      joinedMembers: [],
      tipvalue: null,
      tipuserindex: 0,
      record: null,
      recordRmsData: [],
      isRecording: false,
      mediaRecorder: null,
      audioContext: null,
      audioAnalyser: null,
      recordTime: 0,
      interval: null,
      cancelOpacity: 0,
      microphoneDisabled: false,
      prepareRecording: false,
      cancelledCordovaMediaRecorder: false
    };
  },
  watch: {
    usersForKeysHash: {
      //immediate: true,
      handler: function () {}
    },
    tipusers: function () {
      if (!this.tipusers.length) {
        this.tipuserindex = 0;
      } else {
        if (this.tipuserindex > this.tipusers.length - 1) {
          this.tipuserindex = this.tipusers.length - 1;
        }
      }
    }
  },

  beforeDestroy() {
    if (this.audioContext) this.audioContext.close();
  },

  computed: {
    voiceEnable() {
      return this.$store.state.voiceMessagesEnabled;
    },

    connect: function () {
      return this.$store.state.contact;
    },
    pkoindisabled: function () {
      return this.$store.state.pkoindisabled;
    },
    menuItems: function () {
      var menuItems = [];

      if (!this.relationEvent) {
        if (window.POCKETNETINSTANCE && window.POCKETNETINSTANCE.mobile.supportimagegallery()) {
          menuItems.push({
            click: "cameraHandlerCustom",
            title: this.$i18n.t("button.takePhotoOrVideo"),
            icon: "fas fa-camera"
          });
        } else {
          menuItems.push({
            click: "cameraHandler",
            title: this.$i18n.t("button.takePhotoOrVideo"),
            icon: "fas fa-camera",
            upload: {
              multiple: true,
              extensions: ['jpg', 'jpeg', 'png', 'webp'],
              maxsize: 100,
              images: {
                resize: {
                  type: 'fit'
                }
              }
            }
          });
        }

        menuItems.push({
          click: "fileHandler",
          title: this.$i18n.t("button.sendFile"),
          icon: "fas fa-sticky-note",
          upload: {
            multiple: true,
            extensions: [],
            maxsize: 25,
            images: {
              resize: {
                type: 'fit'
              }
            }
          }
        });
      }

      if (this.transaction && !this.pkoindisabled) {
        menuItems.unshift({
          click: "sendtransactionWrapper",
          title: this.$i18n.t("button.sendCoins"),
          icon: "fas fa-wallet"
        });
      }

      return menuItems;
    },
    ...Object(vuex_esm["c" /* mapState */])(['chats']),
    userlist: function () {
      if (!this.chat) return [];
      return this.core.mtrx.chatUsersInfo(this.chat.roomId, 'anotherChatUsers');
    },
    transaction: function () {
      return functions["a" /* default */].deep(window, 'POCKETNETINSTANCE.platform.ui.wallet.send');
    },
    uusers: function () {
      if (this.u) {
        return _.map(this.u.split(','), u => {
          return u;
        });
      }

      return [];
    },
    ausers: function () {
      if (this.u) {
        return _.map(this.u.split(','), u => {
          return this.core.user.matrixId(u);
        });
      }

      return [];
    },
    stateChat: function () {
      var id = this.$route.query.id;
      return this.$store.state.chatsMap[id];
    },
    invited: function () {
      if (!this.chat) {
        if (this.u) return this.ausers;
        return [];
      }

      return _.map(_.filter(this.chat.currentState.getMembers(), function (m, v) {
        return m.membership === 'invite';
      }), function (u) {
        return u.userId;
      });
    },
    joined: function () {
      if (!this.chat) return [];
      let roomId = this.chat.roomId;
      let self = this;
      let arr = [];
      let members = 0;
      this.chat.currentState.getMembers().forEach(function (user) {
        if (user.membership === 'join') {
          arr.push(user.userId);
        }
      });
      return arr;
    },
    tipusers: function () {
      if (this.tipvalue === null) return [];
      if (this.tipvalue === '') return this.userlist;
      var value = this.tipvalue.toLowerCase();

      var u = _.filter(this.userlist, function (u) {
        return u.name.toLowerCase().indexOf(value) == 0 && u.name.toLowerCase() != value;
      });

      return u;
    },
    maintipuser: function () {
      if (this.tipusers.length) {
        return this.tipusers[this.tipuserindex || 0];
      }

      return null;
    }
  },

  created() {},

  ///
  mounted() {
    this.ready = true;

    if (!this.chat && this.core.mtrx.client) {
      this.newchat().catch(e => {
        return Promise.resolve();
      });
    }
  },

  methods: {
    wait: function () {
      return this.$f.pretry(() => {
        return this.core.mtrx.client && this.core.mtrx.access;
      });
    },
    browsetip: function (increase) {
      increase ? this.tipuserindex++ : this.tipuserindex--;

      if (this.tipuserindex > this.tipusers.length - 1) {
        this.tipuserindex = 0;
      }

      if (this.tipuserindex < 0) {
        this.tipuserindex = this.tipusers.length - 1;
      }
    },
    selectcurrenttip: function () {
      this.insertuser(this.tipusers[this.tipuserindex || 0]);
    },
    insertuser: function () {
      let user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = user.name || '';
      this.$refs['newinput'].inserttip(name);
    },
    tipBySearch: function (value) {
      this.tipvalue = value;
    },
    showuserselected: function (contact, action) {
      this[action](contact);
    },
    resizeImage: function (base64) {
      var ftype = base64.split(';')[0].split('/')[1];
      var images = new utils_images["a" /* default */]();
      return images.resize['fit'](base64, 1024, 1024, ftype, 0.95).then(base64 => {
        return Promise.resolve(base64);
      }).catch(e => {
        return Promise.reject(e);
      });
    },
    cameraHandlerCustom: function () {
      var result = [];
      this.$refs.dropdownMenu.hidePopup();
      window.POCKETNETINSTANCE.platform.ui.uploadImage({
        multiple: true,
        action: (_ref, resolve) => {
          let {
            base64
          } = _ref;
          return this.resizeImage(base64).then(base64 => {
            return functions["a" /* default */].Base64.toFile(base64).then(file => {
              var data = {
                base64,
                file
              };
              result.push(data);
              this.uploadUploaded(null, data);
              resolve();
            });
          }).catch(e => {
            console.error(e);
            resolve();
          });
        },
        onSuccess: imgs => {
          this.uploadUploadedAll();
        }
      });
    },
    sendtransactionWrapper: function () {
      this.menuIsVisible = false;

      var users = _.filter(_.map(this.joined, j => {
        return this.$f.deep(this, '$store.state.users.' + this.$f.getmatrixid(j)) || null;
      }), r => {
        var _this$core$user$useri;

        return r && r.source && r.id != ((_this$core$user$useri = this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id);
      });

      if (!users.length) {
        return 'users.length';
      }

      if (users.length > 1) {
        this.core.store.commit('setmodal', {
          caption: this.$i18n.t("caption.sendTransactionTo"),
          type: 'showuserselect',
          data: {
            users: users,
            action: 'sendtransaction',
            userselected: c => {
              this.showuserselected(c, 'sendtransaction');
            }
          }
        });
        /*this.showuserselect = {
          users : users,
          action : 'sendtransaction'
        }*/
      } else {
        this.sendtransaction(users[0]);
      }

      this.$refs.dropdownMenu.hidePopup();
    },
    sendtransaction: function (user) {
      var api = this.transaction; //TODO get address and send transaction

      api({
        roomid: this.chat.roomId,
        address: user.source.address
      });
      /*.then(({txid, from}) => {
      
        return this.core.mtrx.transaction(this.chat.roomId, txid)
      
      })*/
    },
    emitInputData: function () {
      this.$emit('emptyInput');
      this.upload = true;
    },

    HideUploadPic() {
      this.upload = false;
    },

    emitUrl: function (url) {
      this.$emit('setMetaUrl', url);
    },

    newchat() {
      if (this.u) {
        this.$store.state.globalpreloader = true;
        var matrixId = null;
        var myMatrixId = null;
        var chat = null;
        var id = '';
        this.creating = true;
        return this.core.user.usersInfo(this.uusers).then(info => {
          if (this.uusers.length == 1) {
            var _info = info[0];

            if (!_info || !_info.keys || _info.keys.length < 12) {
              this.$emit('cantchatcrypto');
              return Promise.reject('ny2');
            }
          }

          if (this.core.user.userinfo.keys.length < 12) {
            this.$emit('cantchatcrypto');
            return Promise.reject('ny2');
          } //return Promise.reject('ny3')


          id = this.core.mtrx.kit.tetatetid(info[0], this.core.user.userinfo);
          matrixId = this.core.user.matrixId(info[0].id);
          myMatrixId = this.core.user.matrixId(this.core.user.userinfo.id);
          var initialstate = [{
            "type": "m.set.encrypted",
            "state_key": "",
            "content": {
              encrypted: true
            }
          }];
          return this.core.mtrx.client.createRoom({
            room_alias_name: id,
            visibility: 'private',
            invite: [matrixId],
            name: '#' + id,
            initial_state: initialstate
          });
        }).then(_chat => {
          chat = _chat;
          this.$store.state.globalpreloader = false;
          let m_chat = this.core.mtrx.client.getRoom(_chat.room_id);
          let event = m_chat.currentState.getStateEvents("m.room.power_levels");
          return this.core.mtrx.client.setPowerLevel(chat.room_id, matrixId, 100, event[0]).catch(e => {});
        }).then(r => {
          this.creating = false;

          if (this.connect && this.connect == id) {
            this.greetings();
          }

          this.$store.commit('CONTACT', false);
          return Promise.resolve();
        }).catch(e => {
          this.creating = false;
          this.$store.state.globalpreloader = false;

          if (e && e.errcode == 'M_ROOM_IN_USE') {
            return this.core.mtrx.client.joinRoom('#' + id + ':' + this.core.mtrx.baseUrl.replace("https://", "")).then(() => {}).catch(e => {});
          }

          return Promise.reject(e);
        });
      } else {
        return Promise.reject('u');
      }
    },

    maySendMessage() {
      return this.chat && this.chat.maySendMessage();
    },

    greetings() {
      this.send('👋').then(r => {
        return Promise.resolve(r);
      });
    },

    sendinput(text) {
      this.send(text).then(r => {
        return Promise.resolve(r);
      });
    },

    textCutLimit: function (text, limit) {
      text = text.trim();
      if (text.length <= limit) return text;
      text = text.slice(0, limit);
      return text.trim() + "...";
    },

    replaceMentions(text) {
      _.each(this.userlist, function (user) {
        text = text.replace(new RegExp('@' + user.name, 'g'), '@' + user.id + ':' + user.name);
      });

      return text;
    },

    send(text) {
      if (!this.chat) {
        this.newchat().catch(e => {});
      } //return this.chat.pcrypto.getOrCreateCommonKey()
      //return this.chat.pcrypto.sendCommonKey()
      //return


      this.$emit("sending");

      if (!this.relationEvent) {
        this.focus();
      }

      return this.$f.pretry(() => {
        return this.chat && !this.creating;
      }).then(r => {
        this.$emit('sent');
        text = this.replaceMentions(text);

        if (this.relationEvent) {
          if (this.relationEvent.type == 'm.replace' && this.relationEvent.event) {
            return this.core.mtrx.textEvent(this.chat, text).then(r => {
              r['m.relates_to'] = {
                "rel_type": "m.replace",
                "event_id": this.core.mtrx.clearEventId(this.relationEvent.event) || functions["a" /* default */].makeid()
              };
              var editEvent = r;
              this.relationEvent.event.event.content.body = r.body;
              this.relationEvent.event.event.content.block = r.block;
              this.relationEvent.event.event.content.msgtype = r.msgtype;
              delete this.relationEvent.event.event.decryptKey;
              delete this.relationEvent.event.event.decrypted;
              return this.core.mtrx.client.sendEvent(this.chat.roomId, 'm.room.message', editEvent);
            }).then(r => {
              this.core.store.dispatch('FETCH_EVENTS');
              this.$emit('clearRelationEvent');
              this.$emit('force');
              return Promise.resolve();
            }).catch(e => {
              console.error(e);
              return Promise.reject(e);
            });
          }
        }

        return this.core.mtrx.sendtext(this.chat, text, {
          relation: this.relationEvent
        });
      }).catch(e => {
        this.$emit('sentMessageError', {
          error: e
        });
      });
    },

    pasteImage(data) {
      this.sendImage({
        base64: data
      });
    },

    sendImage: function (_ref2) {
      let {
        base64,
        file
      } = _ref2;
      var id = functions["a" /* default */].makeid();
      var meta = {
        type: "image",
        id: id,
        base64: base64
      };
      this.$emit("sendingData", meta); //setTimeout(() => {

      this.$f.pretry(() => {
        return this.chat;
      }).then(() => {
        if (meta.aborted) return Promise.reject('aborted');
        return this.core.mtrx.sendImage(this.chat, base64, null, meta, {
          relation: this.relationEvent
        });
      }).then(r => {
        this.$emit("sentData", {
          id: id
        });
        return Promise.resolve();
      }).catch(e => {
        this.$emit('sentError', {
          id: id,
          error: e
        });
        return Promise.resolve();
      }); //}, 5000)
    },
    canencryptfilesize: function (file) {
      var s = 10 * 1024 * 1024;

      if (!this.chat.pcrypto.canBeEncrypt()) {
        return Promise.resolve(false);
      }

      if (file.size > s) {
        return this.$dialog.confirm('Files larger than 10 megabytes are not encrypted. Do you want to send the file unencrypted?', {
          okText: 'Yes',
          cancelText: 'No, cancel'
        }).then(dialog => {
          return Promise.resolve(true);
        }).catch(e => {
          return Promise.reject('cancel');
        });
      }

      return Promise.resolve(false);
    },
    sendFile: function (_ref3) {
      let {
        file
      } = _ref3;
      var id = functions["a" /* default */].makeid();
      var meta = {
        type: "file",
        id: id,
        info: {
          name: file.name,
          size: file.size
        }
      };
      this.$emit("sendingData", meta);
      this.$f.pretry(() => {
        return this.chat;
      }).then(() => {
        return this.canencryptfilesize(file);
      }).then(notenc => {
        return this.core.mtrx.sendFile(this.chat, file, meta, {
          relation: this.relationEvent
        }, notenc);
      }).then(() => {
        this.$emit("sentData", {
          id: id
        });
        return Promise.resolve();
      }).catch(e => {
        console.error(e);
        this.$emit('sentError', {
          id: id,
          error: e
        });
      });
    },
    focus: function () {
      if (this.$refs['newinput']) this.$refs['newinput'].focus();
    },
    focused: function () {
      this.$emit('focused');
    },
    blur: function () {
      if (this.$refs['newinput']) this.$refs['newinput'].blur();
    },
    blurifempty: function () {
      if (this.$refs['newinput']) this.$refs['newinput'].blurifempty();
    },
    change: function () {},
    setText: function (text) {
      this.text = text;
      if (this.$refs['newinput']) this.$refs['newinput'].setText(text);
    },
    keyup: function (evt) {
      var value = evt.target.value;

      if (value === '') {
        this.$emit('inputClean', false);
        return;
      } else {
        this.$emit('inputClean', true);
      }

      this.text = value;
      this.anyUrlMeta = functions["a" /* default */].getUrl(this.text);

      if (this.anyUrlMeta !== undefined) {
        this.$emit('setMetaUrl', this.anyUrlMeta);
      } else {
        this.$emit('inputClean', false);
      }

      if (this.chat) this.core.mtrx.client.sendTyping(this.chat.roomId, true, 100);
    },

    menuItemClick(item, rowObject) {
      this[item.click](rowObject);
    },

    menuItemLoadedHandler: function (value) {
      this.menuIsVisible = value;
      return this.menuIsVisible;
    },

    uploadStart(item, files) {},

    uploadError(item, error) {
      this.$store.commit('icon', {
        icon: 'error',
        message: error.text
      });
    },

    getImg() {
      return this.imgs = true;
    },

    uploadSizeError(value) {
      if (!value) {
        this.$refs.dropdownMenu.hidePopup();
      }
    },

    uploadUploaded(item, data) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];

      if (!validImageTypes.includes(data.file.type)) {
        this.sendFile(data);
      } else {
        return this.sendImage(data);
      }
    },

    imageWH(file) {
      const img = new Image();
      var imgInfo = {};
      return new Promise((resolve, reject) => {
        img.onload = function () {
          imgInfo.w = this.width;
          imgInfo.h = this.height;
          resolve(imgInfo);
        };

        img.onerror = function (e) {
          reject(e);
        };

        img.src = file.base64;
      });
    },

    uploadUploadedAll(item, result) {
      this.$store.state.loading = false;
      this.$refs.dropdownMenu.hidePopup();
    },

    catchPermissonsError(err) {
      if (err == 'permissions' || err.toString && err.toString().indexOf('Permission') > -1) {
        this.microphoneDisabled = true;

        if (window.cordova) {
          this.$dialog.confirm(this.$i18n.t('micaccesscordova'), {
            okText: this.$i18n.t("button.ok")
          });
        } else {
          this.$dialog.confirm(this.$i18n.t('micaccessbrowser'), {
            okText: this.$i18n.t("button.ok")
          });
        }

        return;
      }

      if (err.toString && err.toString().indexOf('device not found') > -1) {
        this.$dialog.confirm(this.$i18n.t('micdevicenotfound'), {
          okText: this.$i18n.t("button.ok")
        });
        return;
      }

      this.$dialog.confirm(this.$i18n.t('micaccesscommonproblem'), {
        okText: this.$i18n.t("button.ok")
      });
      console.error(err);
    },

    getFileIosCordova(path) {
      console.log('load', path);
      return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(path, entry => {
          if (!entry) {
            return reject('noentry');
          }

          entry.file(file => {
            var reader = new FileReader();
            console.log('file', file);

            reader.onloadend = function () {
              var blob = new Blob([new Uint8Array(this.result)], {
                type: file.type
              });
              console.log('blob', blob);
              entry.remove();
              resolve(blob);
            };

            reader.onerror = e => {
              entry.remove();
              reject(e);
            };

            reader.readAsArrayBuffer(file);
          });
        }, e => {
          reject(e);
        });
      });
    },

    initRecordingCordova() {
      this.prepareRecording = Object(CancelablePromise["cancelable"])(this.core.media.permissions({
        audio: true
      }).then(() => {
        this.microphoneDisabled = false;
        return Promise.resolve();
      }).catch(err => {
        console.error(err);
        this.catchPermissonsError(err);
        return Promise.reject(err);
      }));
      this.prepareRecording.then(() => {
        console.log("START RECORDING");
        this.microphoneDisabled = false;
        var path = 'recording.mp3';
        if (functions["a" /* default */].isios()) path = 'cdvfile://localhost/temporary/recording.m4a';
        var sec = 0;
        this.audioContext = this.core.getAudioContext(); //var startedTime = (new Date()).getTime() / 1000

        var media = this.cordovaMediaRecorder = new Media(path, () => {
          console.log("MEDIA PREPARED", this.cancelledCordovaMediaRecorder);
          this.recordTime = 0;
          media.release();

          if (this.cancelledCordovaMediaRecorder) {
            this.cancelledCordovaMediaRecorder = false;
            return;
          }

          var fu = null;
          /*if(f.isios()){ */

          fu = this.getFileIosCordova(functions["a" /* default */].isios() ? path : window.cordova.file.externalDataDirectory + path).then(blob => {
            return Promise.resolve({
              data: blob
            });
          });
          /*}
          		else{
          	fu = f.fetchLocal(path)
          }*/

          fu.then(r => {
            ///temp

            /*if (f.isios())
            	r.duration = (new Date()).getTime() / 1000 - startedTime
            		console.log("R", r)
            		/*var e = {
            	data : r.data
            }*/
            console.log('media.duration', media.duration);

            if (media.duration && media.duration > 0) {
              r.duration = media.duration;
            }

            this.createVoiceMessage(r, true);
            return Promise.resolve();
          }).catch(e => {
            this.clear();
            console.error(e);
          }).finally(() => {});
        }, e => {
          console.error(e);
          this.isRecording = false;
          this.clear();
        });
        var rmsdata = [];
        let currentPlaying = this.$store.state.currentPlayingVoiceMessage;

        if (currentPlaying) {
          currentPlaying.pause();
        }

        this.interval = setInterval(() => {
          // get media amplitude
          if (functions["a" /* default */].isios()) {
            rmsdata.push(1);
            if (rmsdata.length > 50) rmsdata = _.last(rmsdata, 50);
            this.recordRmsData = _.clone(rmsdata);
          } else {
            this.cordovaMediaRecorder.getCurrentAmplitude( // success callback
            amp => {
              rmsdata.push(amp * 1000);
              if (rmsdata.length > 50) rmsdata = _.last(rmsdata, 50);
              this.recordRmsData = _.clone(rmsdata);
            }, function (e) {
              console.log("E", e);
            });
          }

          sec = sec + 50;
          if (sec % 1000 === 0) this.recordTime = sec;
        }, 50);
        this.isRecording = true;
        this.cancelOpacity = 0;
        this.recordRmsData = [];
        this.recordTime = 0;
        this.record = null;
        this.cordovaMediaRecorder.startRecord();
      }).catch(e => {
        console.error(e);
      }).finally(() => {
        this.prepareRecording = null;
      });
    },

    initRecording() {
      if (this.prepareRecording || this.isRecording || this.cordovaMediaRecorder) return;
      console.log("INIT RECORDING");

      if (window.cordova) {
        return this.initRecordingCordova();
      }

      this.prepareRecording = Object(CancelablePromise["cancelable"])(this.core.initMediaRecorder().then(recorder => {
        this.microphoneDisabled = false;

        if (this.prepareRecording) {
          return Promise.resolve(recorder);
        } else {
          recorder.stream.getTracks().forEach(track => {
            track.stop();
          });
        }
      }).catch(err => {
        this.catchPermissonsError(err);
        return Promise.reject(err);
      }));
      this.prepareRecording.then(recorder => {
        this.mediaRecorder = recorder;
        this.audioContext = this.core.getAudioContext();
        this.audioAnalyser = this.audioContext.createAnalyser(); //var audioDataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount)

        var src = this.audioContext.createMediaStreamSource(this.mediaRecorder.stream);
        src.connect(this.audioAnalyser);
        this.startRecording();
      }).catch(() => {}).finally(() => {
        this.prepareRecording = null;
      });
    },

    startRecording() {
      let currentPlaying = this.$store.state.currentPlayingVoiceMessage;

      if (currentPlaying) {
        currentPlaying.pause();
      }

      this.$store.commit('SET_VOICERECORDING', true);
      this.isRecording = true;
      this.cancelOpacity = 0;
      this.recordRmsData = [];
      this.recordTime = 0;
      this.record = null;
      this.mediaRecorder.start();
      var sec = 0;
      var rmsdata = [];
      this.interval = setInterval(() => {
        var dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
        this.audioAnalyser.getByteFrequencyData(dataArray);
        rmsdata.push(this.generateRms(dataArray));
        if (rmsdata.length > 50) rmsdata = _.last(rmsdata, 50);
        sec = sec + 50;
        this.recordRmsData = _.clone(rmsdata);

        if (sec % 1000 === 0) {
          this.recordTime = sec;
        }
      }, 50);
    },

    checkaudioForSend: function (record, sendnow) {
      if (record.duration < 1) {
        this.clear();
      } else {
        if (sendnow) {
          this.sendVoiceMessage(record);
        } else {
          this.record = record;
        }
      }
    },

    getduration(file) {
      return new Promise((resolve, reject) => {
        functions["a" /* default */].readFile(file).then(arraybuffer => {
          try {
            this.audioContext.decodeAudioData(arraybuffer, buffer => {
              resolve(buffer.duration);
            });
          } catch (e) {
            reject(e);
          }
        }).catch(reject);
      });
    },

    createVoiceMessage(event, sendnow) {
      console.log('event', event);

      var c = () => {
        //this.record = 
        this.checkaudioForSend({
          file: event.data,
          id: functions["a" /* default */].makeid(),
          duration: event.duration
        }, sendnow);
      };

      if (event.duration) {
        c();
      } else {
        this.getduration(event.data).then(duration => {
          event.duration = duration;
          c();
        }).catch(e => {
          console.error(e);
          this.clear();
        });
      }
      /*f.readFile(event.data).then(arraybuffer => {
      			console.log('arraybuffer', arraybuffer)
      			this.audioContext.decodeAudioData(arraybuffer, (buffer) => {
      				console.log('this.record', this.record)
      		console.log('this.buffer', buffer)
      		
      				this.record = {
      			file: event.data,
      			id: f.makeid()
      		}
      				this.record.duration = buffer.duration
      				this.checkaudioForSend(sendnow)
      			})
      		}).catch(e => {
      	console.error('e', e)
      	this.clear()
      	//
      })*/

    },

    generateRms(frequencies) {
      return +Math.sqrt(frequencies.reduce((a, b) => a + b ** 2) / frequencies.length).toPrecision(4);
    },

    stopRecording(_ref4) {
      let {
        cancel,
        sendnow
      } = _ref4;
      console.log("STOP RECORDING", this.isRecording);
      this.$store.commit('SET_VOICERECORDING', false);

      if (this.prepareRecording) {
        this.prepareRecording.cancel();
        this.prepareRecording = null;
        return;
      }

      this.isRecording = false;

      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

      if (this.mediaRecorder) {
        if (cancel) {//this.mediaRecorder.ondataavailable = () => { }
        } else {
          this.mediaRecorder.addEventListener('dataavailable', event => {
            this.createVoiceMessage(event, sendnow);
          }); //ondataavailable = (event) => this.createVoiceMessage(event, sendnow)
        }

        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => {
          track.stop();
        });
        this.mediaRecorder = null;
      }

      if (this.cordovaMediaRecorder) {
        if (cancel) {
          this.cancelledCordovaMediaRecorder = true;
        } else {
          this.cancelledCordovaMediaRecorder = false;
        }

        this.cordovaMediaRecorder.stopRecord();
        this.cordovaMediaRecorder = null;
      }
    },

    sendVoiceMessage(record) {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])(function* () {
        if (!record) record = _this.record;

        if (!record) {
          _this.clear();
        }

        _this.recordRmsData = [];
        const base64 = yield _this.core.convertAudioToBase64(record.file);
        const id = functions["a" /* default */].makeid();
        const meta = {
          type: "audio",
          id: id,
          base64: base64
        };

        _this.clear();

        _this.$f.pretry(() => {
          return _this.chat;
        }).then(() => {
          return _this.core.mtrx.sendAudio(_this.chat, base64, null, meta, {
            relation: _this.relationEvent
          });
        }).catch(e => {
          _this.$emit('sentError', {
            id: id,
            error: e
          });

          return Promise.resolve();
        });
      })();
    },

    clear() {
      this.record = null;
      this.recordRmsData = [];
      this.recordTime = 0;

      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

      if (this.cordovaMediaRecorder) {
        this.cordovaMediaRecorder = null;
      }

      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => {
          track.stop();
        });
        this.mediaRecorder = null;
      }
      /*if (this.audioContext){
      	this.audioContext.close()
      }*/

    },

    /*async convertAudioToBase64(blob) {
    	const reader = new FileReader()
    	reader.readAsDataURL(blob)
    	return new Promise(resolve => {
    		reader.onloadend = () => {
    			resolve(reader.result)
    		}
    	})
    },*/
    setOpacity(opacity) {
      this.cancelOpacity = opacity;
    }

  }
});
// CONCATENATED MODULE: ./src/components/chat/input?vue&type=script&lang=js&
 /* harmony default export */ var chat_input_vue_type_script_lang_js_ = (input_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/input/index.vue



function input_injectStyles (context) {
  
  var style0 = __webpack_require__("3136")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var input_component = Object(componentNormalizer["a" /* default */])(
  chat_input_vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  input_injectStyles,
  "e8b463ac",
  null
  ,true
)

/* harmony default export */ var input = __webpack_exports__["default"] = (input_component.exports);

/***/ })

}]);
//# sourceMappingURL=matrix-element.6.js.map