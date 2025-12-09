(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[12],{

/***/ "0826":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=template&id=d22cd0ca
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "typingBlock",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "typingBlockWrapper"
  }, [_c('div', [_c('span', [_vm._v(_vm._s(_vm.$t("caption.typing")))])]), _c('div', [_c('PulseLoader', {
    attrs: {
      "color": _vm.color,
      "size": _vm.size,
      "loading": true
    }
  })], 1)])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue?vue&type=template&id=d22cd0ca

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=template&id=7dc0198c
var PulseLoadervue_type_template_id_7dc0198c_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.loading,
      expression: "loading"
    }],
    staticClass: "v-spinner"
  }, [_c('div', {
    staticClass: "v-pulse v-pulse1",
    style: [_vm.spinnerStyle, _vm.spinnerDelay1]
  }), _c('div', {
    staticClass: "v-pulse v-pulse2",
    style: [_vm.spinnerStyle, _vm.spinnerDelay2]
  }), _c('div', {
    staticClass: "v-pulse v-pulse3",
    style: [_vm.spinnerStyle, _vm.spinnerDelay3]
  })]);
};
var PulseLoadervue_type_template_id_7dc0198c_staticRenderFns = [];

// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=template&id=7dc0198c

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=script&lang=js
/* harmony default export */ var PulseLoadervue_type_script_lang_js = ({
  name: 'PulseLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '15px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-pulseStretchDelay',
        animationDuration: '0.75s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both'
      },
      spinnerDelay1: {
        animationDelay: '0.12s'
      },
      spinnerDelay2: {
        animationDelay: '0.24s'
      },
      spinnerDelay3: {
        animationDelay: '0.36s'
      }
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=script&lang=js
 /* harmony default export */ var src_PulseLoadervue_type_script_lang_js = (PulseLoadervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("a778")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_PulseLoadervue_type_script_lang_js,
  PulseLoadervue_type_template_id_7dc0198c_render,
  PulseLoadervue_type_template_id_7dc0198c_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var PulseLoader = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=script&lang=js

/* harmony default export */ var typingvue_type_script_lang_js = ({
  name: "typing",
  props: {},
  components: {
    PulseLoader: PulseLoader
  },
  data: () => {
    return {
      color: "#868686",
      size: "2px",
      loading: true
    };
  },
  methods: {},
  computed: {}
});
// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue?vue&type=script&lang=js
 /* harmony default export */ var assets_typingvue_type_script_lang_js = (typingvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue



function typing_injectStyles (context) {
  
  var style0 = __webpack_require__("9caa")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var typing_component = Object(componentNormalizer["a" /* default */])(
  assets_typingvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  typing_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var typing = __webpack_exports__["a"] = (typing_component.exports);

/***/ }),

/***/ "094d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_b3a12b78_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8043");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_b3a12b78_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_b3a12b78_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_b3a12b78_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_b3a12b78_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "140b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5785");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("203e9107", content, shadowRoot)
};

/***/ }),

/***/ "1740":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8bca");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0cd38700", content, shadowRoot)
};

/***/ }),

/***/ "21d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_170ef52d_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbee");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_170ef52d_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_170ef52d_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_170ef52d_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_170ef52d_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "2343":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2273a223_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("140b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2273a223_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2273a223_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2273a223_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2273a223_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "2b2f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@keyframes v-pulseStretchDelay{0%,80%{transform:scale(1);-webkit-opacity:1;opacity:1}45%{transform:scale(.1);-webkit-opacity:.7;opacity:.7}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "3077":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4c0e7fac_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1740");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4c0e7fac_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4c0e7fac_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4c0e7fac_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4c0e7fac_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "5395":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".typingBlock{position:relative}.typingBlock .typingBlockWrapper{position:absolute;left:50%;transform:translateX(-50%);top:-5px;display:flex;align-items:center}.typingBlock .typingBlockWrapper>div{padding:0 .5em}.typingBlock .typingBlockWrapper span{font-size:.7em;color:rgb(var(--neutral-grad-3));opacity:.8}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "53c6":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".userinfoWrapper[data-v-54799a07]{height:95%;width:100%;padding:2em .5em;background:rgba(var(--background-main),.4);border-radius:15px;position:relative;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}.previewWrapper .work[data-v-54799a07]{padding-bottom:.5em!important}.VueCarousel[data-v-54799a07]{width:100%}.filter[data-v-54799a07]{background-color:rgba(var(--color-shadow-base),.2)!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "5785":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".attachements[data-v-2273a223]{position:absolute;left:0;top:0;right:0;padding:.5em .5em;overflow-y:scroll}.attachements .attachementsWrapper[data-v-2273a223]{display:flex;align-items:center;flex-wrap:nowrap;flex-grow:1;flex-direction:row}.attachements .attachementsWrapper[data-v-2273a223] #chatAttachement{margin-right:.5em;min-width:120px}.joinwrapper[data-v-2273a223]{position:absolute;left:0;top:0;bottom:0;right:0;padding-bottom:0;overflow-x:scroll}.cantchatmessage[data-v-2273a223]{padding:2em}.cantchatmessage .proceed[data-v-2273a223]{padding-top:1em}.cantchatmessage .proceed button[data-v-2273a223]{padding-left:0}.cantchatmessage .refresh[data-v-2273a223]{padding-top:2em}.cantchatmessage .msg[data-v-2273a223]{font-size:.8em}.encryptedInfo[data-v-2273a223]{position:relative;z-index:9999;display:flex;justify-content:center;align-items:center;flex-direction:column}.encryptedInfo #slide[data-v-2273a223]{padding:0 .5em;position:absolute;left:-180px;top:0;background:rgb(var(--background-main));color:rgb(var(--text-color));border-bottom-right-radius:8px;border-top-right-radius:8px;-webkit-animation:slide-2273a223 .1s forwards;-webkit-animation-delay:.3s;animation:slide-2273a223 .1s forwards;animation-delay:.3s;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}@keyframes slide-2273a223{to{left:0}}.encryptedInfo button[data-v-2273a223]{cursor:pointer;display:flex;align-items:center;justify-content:flex-start;text-align:left}.encryptedInfo button i[data-v-2273a223]{margin-right:5px}.encryptedInfo .encryptedTxtIcon[data-v-2273a223]{flex-direction:column;align-items:center;justify-content:center;padding:.25em .25em;text-align:center}.encryptedInfo .encryptedTxtIcon span[data-v-2273a223]{color:rgb(var(--color-good));font-size:.8em}.encryptedInfo .encryptedTxtIcon i[data-v-2273a223]{color:rgb(var(--color-good));display:none}.blockedcaption[data-v-2273a223]{text-align:center}.blockedcaption span[data-v-2273a223]{font-size:.8em}.relationEvent[data-v-2273a223]{display:flex;align-items:flex-end;overflow-wrap:anywhere;width:100%}.relationEvent .relationEventWrapper[data-v-2273a223]{padding-bottom:1em}.relationEvent .relationEventCaption[data-v-2273a223]{padding:1em 0;padding-bottom:.5em}.relationEvent .relationEventCaption span[data-v-2273a223]{font-size:.8em;font-weight:700;color:rgb(var(--color-txt-ac))}.relationEvent .relationEventPreview[data-v-2273a223]{flex-grow:1;padding:0 1em;padding-top:0}.relationEvent[data-v-2273a223] .previewMessage{font-size:.9em}.relationEvent[data-v-2273a223] .previewMessage .msgtext label{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;text-overflow:ellipsis}.relationEvent[data-v-2273a223] .statusWrapper{display:none}.relationEvent .relationEventActions[data-v-2273a223]{width:55px;min-width:55px}.relationEvent .relationEventActions .item[data-v-2273a223]{width:100%;padding:.5em 0;cursor:pointer;text-align:center}.chatInputWrapper[data-v-2273a223]{position:absolute;z-index:3;bottom:-1px;background:transparent;left:0;right:0;padding-bottom:calc(var(--app-margin-bottom, 0) + 5px);background:rgb(var(--background-total-theme));will-change:transform;transform:translate3d(0,calc(var(--keyboardheight, 0)*-1 - -1px),0);transition:.3s}.chatInputWrapper.bin[data-v-2273a223]{position:absolute;left:1px;right:1px;bottom:0;border-radius:5px}#chat.minimized .chatInputWrapper[data-v-2273a223]{opacity:0;padding-bottom:0}#chat.minimized:not(.active) .statusWrapper[data-v-2273a223]{width:33px}#chat.minimized:not(.active) .statusWrapper i[data-v-2273a223]{color:rgb(var(--color-txt-ac))}#chat.minimized:not(.active) .statusWrapper i span[data-v-2273a223]{display:none}#chat.minimized:not(.active) .statusWrapper .messageRow[data-v-2273a223]{padding:0!important;background:transparent!important}#chat.minimized:not(.active) .statusWrapper .event[data-v-2273a223]{padding-bottom:.5em}#chat.minimized:not(.active) .statusWrapper #events[data-v-2273a223]{transform:translate3d(.25em,30px,0)}#chat.minimized:not(.active) .statusWrapper .iconWrapper[data-v-2273a223]{margin-left:0!important}#chat.minimized:not(.active) .statusWrapper [my=true][data-v-2273a223]{justify-content:flex-start}#chat.minimized:not(.active) .statusWrapper [my=true] .iconWrapper[data-v-2273a223]{margin-left:0!important;order:-1;align-self:flex-end}#chat.minimized:not(.active) .statusWrapper .actionsWrapper[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .filePreview[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .labelwrapper[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .linkPreview[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .maxcontent[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .messageImg[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .timeWrapper[data-v-2273a223],#chat.minimized:not(.active) .statusWrapper .userpic[data-v-2273a223]:after{display:none}#chat.minimized.active[data-v-2273a223]{padding-bottom:90px}#chat.minimized.active .chatInputWrapper[data-v-2273a223]{opacity:1}.encrypted[data-v-2273a223]{position:absolute;left:0;top:0;z-index:2;color:rgb(var(--color-good));padding:.25em .5em}.encrypted i[data-v-2273a223]{font-size:.8em;cursor:pointer}.roomMuted[data-v-2273a223]{position:absolute;left:5px;top:20px;z-index:2;color:rgb(var(--neutral-grad-3))}.roomMuted i[data-v-2273a223]{font-size:.8em}.chatEmpty[data-v-2273a223]{padding:4em;text-align:center;color:rgb(var(--neutral-grad-3))}.chatEmpty span[data-v-2273a223]{font-size:.8em}.preview-wrapper[data-v-2273a223]{max-height:350px;overflow-y:auto;border:1px solid rgb(var(rgb(var(--neutral-grad-2))));border-radius:10px;margin:0 auto;width:98%}.preview-wrapper[data-v-2273a223]::-webkit-scrollbar{width:0!important}.shareEventsWrapper .cnt[data-v-2273a223]{background:rgb(var(--background-secondary-theme));border-radius:30px;padding:.5em 1em;max-width:622px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;font-size:.9em}.shareEventsWrapper .cnt i[data-v-2273a223]{margin-right:10px}.shareEventsWrapper .cnt i.fa-trash-alt[data-v-2273a223]{color:#f41a4d}.shareEventsWrapper .cnt i.fa-share-alt[data-v-2273a223]{color:#00a3f7}.shareEventsWrapper .cnt div[data-v-2273a223]{transition:.3s;opacity:.6;cursor:pointer;margin-left:1em;display:flex;align-items:center}.shareEventsWrapper .cnt div[data-v-2273a223]:hover{transition:.3s;opacity:1}.shareEventsWrapper .cnt div.cancel[data-v-2273a223]{margin-right:auto;margin-left:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "601a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("53c6");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("1ce89c76", content, shadowRoot)
};

/***/ }),

/***/ "6a5a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2b2f");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("ba1b37ea", content, shadowRoot)
};

/***/ }),

/***/ "7d36":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c936");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "7e1c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_3967ea65_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cd1a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_3967ea65_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_3967ea65_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_3967ea65_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_3967ea65_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "8043":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fd90");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5bb6562e", content, shadowRoot)
};

/***/ }),

/***/ "8bca":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-4c0e7fac]{width:100%;z-index:999;top:0}.aboutContact[data-v-4c0e7fac]{position:absolute;left:0;right:0;top:100px;bottom:0;z-index:999;background:#fff}.chat.mobile[data-v-4c0e7fac] #maincontent .headerSpacerWrapper{bottom:0;overflow:visible}.chat.mobile[data-v-4c0e7fac] #maincontent .headerSpacerWrapperOvf{overflow:visible}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9caa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_id_d22cd0ca_prod_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d370");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_id_d22cd0ca_prod_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_id_d22cd0ca_prod_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_id_d22cd0ca_prod_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_id_d22cd0ca_prod_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "a778":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_style_loader_index_js_ref_7_oneOf_1_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_7_oneOf_1_2_postcss_loader_src_index_js_ref_7_oneOf_1_3_cache_loader_dist_cjs_js_ref_1_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_id_7dc0198c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6a5a");
/* harmony import */ var _vue_style_loader_index_js_ref_7_oneOf_1_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_7_oneOf_1_2_postcss_loader_src_index_js_ref_7_oneOf_1_3_cache_loader_dist_cjs_js_ref_1_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_id_7dc0198c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_style_loader_index_js_ref_7_oneOf_1_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_7_oneOf_1_2_postcss_loader_src_index_js_ref_7_oneOf_1_3_cache_loader_dist_cjs_js_ref_1_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_id_7dc0198c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vue_style_loader_index_js_ref_7_oneOf_1_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_7_oneOf_1_2_postcss_loader_src_index_js_ref_7_oneOf_1_3_cache_loader_dist_cjs_js_ref_1_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_id_7dc0198c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vue_style_loader_index_js_ref_7_oneOf_1_0_css_loader_dist_cjs_js_ref_7_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_7_oneOf_1_2_postcss_loader_src_index_js_ref_7_oneOf_1_3_cache_loader_dist_cjs_js_ref_1_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_id_7dc0198c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "b163":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/index.vue?vue&type=template&id=2273a223&scoped=true
var render = function render() {
  var _vm$userBanned, _vm$userBanned2, _vm$userBanned3, _vm$userBanned4;
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    class: {
      bin: _vm.pocketnet,
      bout: !_vm.pocketnet,
      minimized: _vm.minimized,
      fix: _vm.pocketnet,
      active: _vm.active
    },
    attrs: {
      "id": "chat"
    }
  }, [_vm.cantchat && !_vm.cantchatexc ? _c('div', {
    staticClass: "cantchatmessage"
  }, [_c('div', {
    staticClass: "msg"
  }, [_vm._v(" " + _vm._s(_vm.$t("caption." + this.keyproblem)) + " ")]), _vm.keyproblem == 'usernotgen' ? _c('div', {
    staticClass: "refresh"
  }, [_c('button', {
    staticClass: "button small",
    on: {
      "click": _vm.refreshkeys
    }
  }, [_vm._v(" Refresh "), _c('i', {
    staticClass: "fas fa-sync"
  })])]) : _vm._e(), _vm.keyproblem == 'younotgen' ? _c('div', {
    staticClass: "preloaderwrapper"
  }, [_c('linepreloader')], 1) : _vm._e()]) : _c('div', {
    staticClass: "chatcontent"
  }, [_vm.m_chat && _vm.allowedToRead && _vm.ready ? _c('list', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !((_vm$userBanned = _vm.userBanned) !== null && _vm$userBanned !== void 0 && _vm$userBanned.value),
      expression: "!userBanned?.value"
    }],
    key: _vm.key,
    ref: "list",
    attrs: {
      "error": _vm.error,
      "chat": _vm.m_chat,
      "searchresults": _vm.searchresults,
      "filterType": _vm.filterType,
      "selectedMessages": _vm.selectedMessages
    },
    on: {
      "editingEvent": _vm.editingEvent,
      "shareEvent": _vm.shareEvent,
      "replyEvent": _vm.replyEvent,
      "eventImage": e => _vm.galleryImage(e),
      "scroll": _vm.scroll,
      "menuIsVisible": _vm.menuIsVisibleHandler,
      "getEvents": _vm.events
    }
  }) : _vm._e(), _vm.m_chat && !((_vm$userBanned2 = _vm.userBanned) !== null && _vm$userBanned2 !== void 0 && _vm$userBanned2.value) && (_vm.membership || _vm.streamMode) && !['join', 'ban'].includes(_vm.membership) ? _c('div', {
    staticClass: "joinwrapper"
  }, [_c('join', {
    attrs: {
      "m_chat": _vm.m_chat,
      "chat": _vm.chat,
      "usersinfo": _vm.usersinfo
    },
    on: {
      "update:m_chat": function ($event) {
        _vm.m_chat = $event;
      },
      "creatorLeft": _vm.brokenInvitedRoom,
      "joined": _vm.joined
    }
  })], 1) : _vm._e(), !_vm.m_chat && _vm.usersinfo && _vm.usersinfo.length ? _c('div', {
    staticClass: "chatEmpty"
  }, [_c('span', [_vm._v(_vm._s(_vm.$t("caption.startChatWith")) + " " + _vm._s(_vm.usersinfoNames()))])]) : _vm._e(), _vm.activated && !((_vm$userBanned3 = _vm.userBanned) !== null && _vm$userBanned3 !== void 0 && _vm$userBanned3.value) && (!_vm.m_chat || _vm.membership === 'join') ? _c('div', {
    staticClass: "chatInputWrapper fixedOnPageBottom",
    class: {
      bin: _vm.pocketnet,
      bout: !_vm.pocketnet
    }
  }, [_c('div', [_vm.relationEvent ? _c('div', {
    staticClass: "relationEvent"
  }, [_c('div', {
    staticClass: "relationEventPreview"
  }, [_c('div', {
    staticClass: "relationEventCaption"
  }, [_c('span', [_vm._v(_vm._s(_vm.relationEvent.action))])]), _vm.relationEvent.type != 'm.replace' ? _c('div', {
    staticClass: "relationEventWrapper"
  }, [_c('eventsEvent', {
    attrs: {
      "event": _vm.relationEvent.event,
      "chat": _vm.m_chat,
      "preview": true
    }
  })], 1) : _vm._e()]), _c('div', {
    staticClass: "relationEventActions"
  }, [_c('div', {
    staticClass: "item",
    on: {
      "click": _vm.clearRelationEvent
    }
  }, [_c('i', {
    staticClass: "far fa-times-circle"
  })])])]) : _vm._e(), !_vm.blockedUser && !_vm.selectedMessages.length ? _c('chatInput', {
    ref: "chatInput",
    attrs: {
      "u": _vm.u,
      "chat": _vm.m_chat,
      "usersinfo": _vm.usersinfo,
      "relationEvent": _vm.relationEvent
    },
    on: {
      "sending": _vm.sending,
      "sent": _vm.sent,
      "sentError": _vm.sentError,
      "sentMessageError": _vm.sentMessageError,
      "sendingData": _vm.sendingData,
      "sentData": _vm.sentData,
      "force": _vm.force,
      "newchat": _vm.newchat,
      "closeMetaPreview": _vm.closing,
      "clearRelationEvent": _vm.clearRelationEvent,
      "focused": _vm.focused,
      "cantchatcrypto": _vm.cantchatcrypto,
      "encrypt": _vm.clbkencrypt,
      "encrypted": _vm.clbkencrypted
    }
  }) : _vm._e(), !!_vm.selectedMessages.length ? _c('div', {
    staticClass: "center shareEventsWrapper"
  }, [_c('div', {
    staticClass: "work"
  }, [_c('div', {
    staticClass: "cnt"
  }, [_c('div', {
    staticClass: "cancel",
    on: {
      "click": function ($event) {
        return _vm.cancelDataMessages();
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-times"
  }), _c('span', [_vm._v(_vm._s(_vm.$t("cancel")))])]), _c('div', {
    on: {
      "click": function ($event) {
        return _vm.removeDataMessages();
      }
    }
  }, [_c('i', {
    staticClass: "far fa-trash-alt"
  }), _c('span', [_vm._v(_vm._s(_vm.localisationTitles.delete))])]), _c('div', {
    on: {
      "click": function ($event) {
        return _vm.shareDataMessages();
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-share-alt"
  }), _c('span', [_vm._v(_vm._s(_vm.localisationTitles.share))])])])])]) : _vm._e(), _vm.blockedUser && _vm.m_chat ? _c('div', {
    staticClass: "blockedcaption"
  }, [_c('span', [_vm._v("You have blocked this user")])]) : _vm._e()], 1)]) : _vm._e(), _vm.activated && !_vm.streamMode && _vm.encrypted && _vm.membership != 'invite' ? _c('div', {
    staticClass: "encrypted fixedOnPageTop",
    on: {
      "mouseover": e => _vm.hoverEncrypt = true
    }
  }, [!_vm.encrypting ? _c('i', {
    staticClass: "fas fa-lock"
  }) : _c('i', {
    staticClass: "fas fa-spinner fa-spin"
  })]) : _vm._e(), _vm.hoverEncrypt ? _c('div', {
    staticClass: "encryptedInfo fixedOnPageTop",
    on: {
      "mouseover": e => _vm.hoverEncrypt = true,
      "mouseleave": e => _vm.hoverEncrypt = false,
      "click": e => _vm.hoverEncrypt = !_vm.hoverEncrypt
    }
  }, [_c('div', {
    attrs: {
      "id": "slide"
    }
  }, [_c('div', {
    staticClass: "encryptedTxtIcon"
  }, [_c('i', {
    staticClass: "fas fa-user-shield"
  }), _c('span', [_vm._v(_vm._s(_vm.$t("caption.encrypted")))])])])]) : _vm._e(), _vm.attachements.length ? _c('div', {
    staticClass: "attachements"
  }, [_c('div', {
    staticClass: "attachementsWrapper"
  }, _vm._l(_vm.attachements, function (attachement) {
    return _c('attachement', {
      key: attachement.id,
      attrs: {
        "attachement": attachement
      },
      on: {
        "cancel": e => _vm.abortSending(attachement.id)
      }
    });
  }), 1)]) : _vm._e()], 1), _vm.activated && (_vm$userBanned4 = _vm.userBanned) !== null && _vm$userBanned4 !== void 0 && _vm$userBanned4.value || _vm.roomUserBanned ? _c('userRoomStatus', {
    attrs: {
      "chat": _vm.chat,
      "text": `You've have been banned in this room`
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/index.vue?vue&type=template&id=2273a223&scoped=true

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/chat/list/index.vue + 9 modules
var list = __webpack_require__("4e29");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/join/index.vue?vue&type=template&id=3967ea65&scoped=true
var joinvue_type_template_id_3967ea65_scoped_true_render = function render() {
  var _vm$videoMeta, _vm$videoMeta2, _vm$videoMeta3;
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "maskedtop",
    class: {
      minimized: _vm.minimized,
      active: _vm.active
    },
    attrs: {
      "id": "chatJoin"
    }
  }, [_c('div', {
    staticClass: "work"
  }, [_c('div', {
    staticClass: "caption"
  }, [!_vm.streamMode && !_vm.creatorLeft ? _c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.chatInvite")) + " ")]) : _vm._e(), !_vm.streamMode && _vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.cantJoin")))]) : _vm._e(), _vm.streamMode && (_vm$videoMeta = _vm.videoMeta) !== null && _vm$videoMeta !== void 0 && _vm$videoMeta.isLive ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.needjointowrite")))]) : _vm._e(), _vm.streamMode && !((_vm$videoMeta2 = _vm.videoMeta) !== null && _vm$videoMeta2 !== void 0 && _vm$videoMeta2.isLive) ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.streamisover")))]) : _vm._e()])]), !_vm.blockedCheck && !_vm.streamMode ? _c('div', {
    staticClass: "tip"
  }, [!_vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.chatInviteDecline")))]) : _vm._e(), _vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.creatorLeft")))]) : _vm._e()]) : _vm._e(), !_vm.streamMode ? _c('chatPreview', {
    attrs: {
      "usersinfo": _vm.usersinfo,
      "chat": _vm.chat,
      "m_chat": _vm.m_chat,
      "undefinedRoom": _vm.creatorLeft
    }
  }) : _vm._e(), _vm.streamMode || !_vm.hiddenInParent ? _c('div', {
    staticClass: "joinAction fixedOnPageBottom",
    class: {
      bin: _vm.pocketnet,
      bout: !_vm.pocketnet
    }
  }, [_c('div', {
    staticClass: "work"
  }, [!_vm.blockedCheck ? _c('div', {
    staticClass: "actions"
  }, [!_vm.streamMode && !_vm.creatorLeft && !_vm.tetatet ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button black rounded",
    on: {
      "click": _vm.decline
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.decline")) + " ")])]) : _vm._e(), !_vm.streamMode && _vm.tetatet ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button black rounded",
    on: {
      "click": _vm.ignore
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.declineandignore")) + " ")])]) : _vm._e(), !_vm.creatorLeft ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    class: {
      'small': true,
      'button': true,
      'rounded': true
    },
    style: `visibility: ${_vm.streamMode && !((_vm$videoMeta3 = _vm.videoMeta) !== null && _vm$videoMeta3 !== void 0 && _vm$videoMeta3.isLive) ? 'hidden' : 'visible'}`,
    on: {
      "click": _vm.join
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.join")) + " ")])]) : _vm._e(), !_vm.streamMode && _vm.creatorLeft ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button rounded",
    on: {
      "click": _vm.back
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.ok")) + " ")])]) : _vm._e()]) : _c('div', {
    staticClass: "actions"
  }, [_vm._m(0)])])]) : _vm._e()], 1);
};
var joinvue_type_template_id_3967ea65_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "blocked"
  }, [_c('span', [_vm._v("You have blocked this user")])]);
}];

// CONCATENATED MODULE: ./src/components/chat/join/index.vue?vue&type=template&id=3967ea65&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/preview/index.vue?vue&type=template&id=54799a07&scoped=true
var previewvue_type_template_id_54799a07_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "chatPreview"
  }, [_c('div', {
    staticClass: "work"
  }, [_c('div', {
    staticClass: "previewWrapper"
  }, [_vm.users && _vm.users.length ? _c('div', {
    staticClass: "users"
  }, _vm._l(_vm.users, function (user) {
    return !_vm.empty(user) ? _c('div', {
      key: user.id,
      staticClass: "work"
    }, [_c('div', {
      staticClass: "userinfoWrapper",
      class: {
        filter: _vm.undefinedRoom
      }
    }, [user && user.name ? _c('userView', {
      attrs: {
        "userinfo": user
      }
    }) : _vm._e()], 1)]) : _vm._e();
  }), 0) : _vm._e()])])]);
};
var previewvue_type_template_id_54799a07_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/preview/index.vue?vue&type=template&id=54799a07&scoped=true

// EXTERNAL MODULE: ./src/components/chats/assets/name.vue + 4 modules
var assets_name = __webpack_require__("aa20");

// EXTERNAL MODULE: ./src/components/chats/assets/icon.vue + 4 modules
var icon = __webpack_require__("3094");

// EXTERNAL MODULE: ./src/components/user/view/pnuser/index.vue + 4 modules
var pnuser = __webpack_require__("42cd");

// EXTERNAL MODULE: ./node_modules/vue-awesome-swiper/dist/vue-awesome-swiper.js
var vue_awesome_swiper = __webpack_require__("7212");

// EXTERNAL MODULE: ./node_modules/vue-carousel/dist/vue-carousel.min.js
var vue_carousel_min = __webpack_require__("0a63");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/preview?vue&type=script&lang=js&external




//import 'swiper/swiper-bundle.css'
//

//

/* harmony default export */ var preview_vue_type_script_lang_js_external = ({
  name: "chatPreview",
  props: {
    chat: Object,
    usersinfo: Array,
    room: {},
    undefinedRoom: false
  },
  components: {
    userView: pnuser["a" /* default */],
    chatName: assets_name["a" /* default */],
    chatIcon: icon["a" /* default */],
    Swiper: vue_awesome_swiper["Swiper"],
    SwiperSlide: vue_awesome_swiper["SwiperSlide"],
    Carousel: vue_carousel_min["Carousel"],
    Slide: vue_carousel_min["Slide"]
  },
  data: function () {
    return {
      loading: false,
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    users: function () {
      if (!this.chat) return [];
      return this.core.mtrx.chatUsersInfo(this.chat.roomId, "anotherChatUsers");
    }
  },
  methods: {
    empty: function (user) {
      return _.isEmpty(user);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/preview?vue&type=script&lang=js&external
 /* harmony default export */ var chat_preview_vue_type_script_lang_js_external = (preview_vue_type_script_lang_js_external); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chat/preview/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("c5aa")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chat_preview_vue_type_script_lang_js_external,
  previewvue_type_template_id_54799a07_scoped_true_render,
  previewvue_type_template_id_54799a07_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "54799a07",
  null
  ,true
)

/* harmony default export */ var preview = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/join?vue&type=script&lang=js&external


/* harmony default export */ var join_vue_type_script_lang_js_external = ({
  name: "chatJoin",
  props: {
    chat: Object,
    m_chat: {},
    usersinfo: Array,
    room: Object
  },
  components: {
    chatPreview: preview
  },
  inject: ["streamMode", "videoMeta"],
  data: function () {
    return {
      loading: false,
      joinedMembers: [],
      creatorLeft: false
    };
  },
  created: () => {},
  watch: {},
  computed: Object(vuex_esm["d" /* mapState */])({
    hiddenInParent: state => state.hiddenInParent,
    auth: state => state.auth,
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    active: state => state.active,
    tetatet: function () {
      return this.core.mtrx.kit.tetatetchat(this.m_chat);
    },
    blockedCheck: function () {
      var users = this.core.mtrx.anotherChatUsers(this.m_chat.roomId);
      if (users.length == 1) {
        return this.core.mtrx.blockeduser(users[0].userId);
      }
    }
  }),
  mounted: function () {},
  methods: {
    join: function () {
      var _this$videoMeta;
      if (this.streamMode && !((_this$videoMeta = this.videoMeta) !== null && _this$videoMeta !== void 0 && _this$videoMeta.isLive)) return;
      var self = this;
      this.$store.commit("SET_CHAT_TO_FORCE", this.m_chat.roomId);
      this.$store.state.globalpreloader = true;
      this.core.mtrx.client.joinRoom(this.m_chat.roomId).then(() => {
        //this.$store.commit('SET_CHAT_TO_STORE', this.m_chat.summary)
        this.$emit("joined");
      }).catch(function (error) {
        this.$store.commit("icon", {
          icon: "error",
          message: error
        });
        self.brokenRoom(true);
        return self.creatorLeft = true;
      }).finally(() => {
        this.$store.state.globalpreloader = false;
      });
    },
    back() {
      this.$router.go(-1);
    },
    ignore: function () {
      var users = this.core.mtrx.anotherChatUsers(this.chat.roomId);
      if (users.length > 1) {
        return;
      }
      this.$store.state.globalpreloader = true;
      this.core.mtrx.blockUser(users[0].userId).then(r => {
        this.$router.go(-1);
      }).catch(e => {}).finally(() => {
        this.$store.state.globalpreloader = false;
      });
    },
    decline: function () {
      this.$store.commit("SET_CHAT_TO_FORCE", this.m_chat.roomId);
      this.$store.state.globalpreloader = true;
      this.core.mtrx.client.leave(this.chat.roomId).then(r => {
        return this.core.mtrx.client.forget(this.chat.roomId, true).then(r => {
          return r;
        }).then(r => {
          this.$store.commit("DELETE_ROOM", this.chat.roomId);
          this.$router.go(-1);
        });
      }).finally(() => {
        this.$store.state.globalpreloader = false;
      });
    },
    brokenRoom() {
      this.$emit("creatorLeft", true);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/join?vue&type=script&lang=js&external
 /* harmony default export */ var chat_join_vue_type_script_lang_js_external = (join_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chat/join/index.vue



function join_injectStyles (context) {
  
  var style0 = __webpack_require__("7e1c")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var join_component = Object(componentNormalizer["a" /* default */])(
  chat_join_vue_type_script_lang_js_external,
  joinvue_type_template_id_3967ea65_scoped_true_render,
  joinvue_type_template_id_3967ea65_scoped_true_staticRenderFns,
  false,
  join_injectStyles,
  "3967ea65",
  null
  ,true
)

/* harmony default export */ var join = (join_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/attachement/index.vue?vue&type=template&id=bd3aba00&scoped=true
var attachementvue_type_template_id_bd3aba00_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    attrs: {
      "id": "chatAttachement"
    }
  }, [_vm.attachement.type == 'image' ? _c('div', {
    staticClass: "image"
  }, [_vm.attachement.base64 ? _c('bgimage', {
    attrs: {
      "src": _vm.attachement.base64
    }
  }) : _vm._e()], 1) : _vm._e(), _vm.attachement.type == 'file' ? _c('div', {
    staticClass: "file"
  }, [_c('div', {
    staticClass: "fileicon"
  }, [_c('i', {
    class: _vm.fileicon
  })]), _c('div', {
    staticClass: "filename"
  }, [_c('span', [_vm._v(_vm._s(_vm.attachement.info.name || "File"))])]), _vm.humanReadableSize ? _c('div', {
    staticClass: "filesize"
  }, [_c('span', [_vm._v(_vm._s(_vm.humanReadableSize))])]) : _vm._e()]) : _vm._e(), _vm._m(0), _c('div', {
    staticClass: "cancel",
    on: {
      "click": _vm.cancel
    }
  }, [_c('i', {
    staticClass: "far fa-times-circle"
  })])]);
};
var attachementvue_type_template_id_bd3aba00_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "loading"
  }, [_c('i', {
    staticClass: "fas fa-spinner fa-spin"
  })]);
}];

// CONCATENATED MODULE: ./src/components/chat/attachement/index.vue?vue&type=template&id=bd3aba00&scoped=true

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/attachement?vue&type=script&lang=js&external


/* harmony default export */ var attachement_vue_type_script_lang_js_external = ({
  name: "chatAttachement",
  props: {
    attachement: Object
  },
  data: function () {
    return {
      loading: false,
      ext: {
        pdf: "far fa-file-pdf",
        custom: "far fa-file"
      }
    };
  },
  created: () => {},
  watch: {
    //$route: 'getdata'
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    auth: state => state.auth,
    extension: function () {
      if (!functions["a" /* default */].deep(this, "attachement.info.name")) return "custom";
      var name = functions["a" /* default */].deep(this, "attachement.info.name");
      var name = name.split(".");
      var ext = name[name.length - 1].toLowerCase();
      return ext;
    },
    humanReadableSize() {
      if (!functions["a" /* default */].deep(this, "attachement.info.size")) return "";
      return functions["a" /* default */].formatBytes(this.attachement.info.size);
    },
    fileicon: function () {
      var ext = this.extension;
      return this.ext[ext] || this.ext["custom"];
    }
  }),
  methods: {
    cancel: function () {
      this.$emit("cancel");
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/attachement?vue&type=script&lang=js&external
 /* harmony default export */ var chat_attachement_vue_type_script_lang_js_external = (attachement_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chat/attachement/index.vue



function attachement_injectStyles (context) {
  
  var style0 = __webpack_require__("7d36")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var attachement_component = Object(componentNormalizer["a" /* default */])(
  chat_attachement_vue_type_script_lang_js_external,
  attachementvue_type_template_id_bd3aba00_scoped_true_render,
  attachementvue_type_template_id_bd3aba00_scoped_true_staticRenderFns,
  false,
  attachement_injectStyles,
  "bd3aba00",
  null
  ,true
)

/* harmony default export */ var attachement = (attachement_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/userRoomStatus/index.vue?vue&type=template&id=170ef52d&scoped=true
var userRoomStatusvue_type_template_id_170ef52d_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "roomStatusView"
  }, [_vm._m(0), _c('div', {
    staticClass: "text"
  }, [_vm._v(" " + _vm._s(_vm.text) + " ")]), !_vm.streamMode ? _c('button', {
    staticClass: "button small black rounded",
    on: {
      "click": function ($event) {
        return _vm.leaveRoom();
      }
    }
  }, [_vm._v(" Delete room ")]) : _vm._e()]);
};
var userRoomStatusvue_type_template_id_170ef52d_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "statusViewIcon"
  }, [_c('i', {
    staticClass: "fas fa-ban"
  })]);
}];

// CONCATENATED MODULE: ./src/components/chat/userRoomStatus/index.vue?vue&type=template&id=170ef52d&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/userRoomStatus?vue&type=script&lang=js&external

/* harmony default export */ var userRoomStatus_vue_type_script_lang_js_external = ({
  inject: ["streamMode"],
  props: {
    text: String,
    chat: Object
  },
  methods: {
    leaveRoom() {
      this.core.mtrx.client.forget(this.chat.roomId, true).then(r => {
        this.$store.commit("DELETE_ROOM", this.chat.roomId);
      }).then(r => {
        this.$router.push({
          path: "/chats"
        }).catch(e => {});
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/userRoomStatus?vue&type=script&lang=js&external
 /* harmony default export */ var chat_userRoomStatus_vue_type_script_lang_js_external = (userRoomStatus_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chat/userRoomStatus/index.vue



function userRoomStatus_injectStyles (context) {
  
  var style0 = __webpack_require__("21d6")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var userRoomStatus_component = Object(componentNormalizer["a" /* default */])(
  chat_userRoomStatus_vue_type_script_lang_js_external,
  userRoomStatusvue_type_template_id_170ef52d_scoped_true_render,
  userRoomStatusvue_type_template_id_170ef52d_scoped_true_staticRenderFns,
  false,
  userRoomStatus_injectStyles,
  "170ef52d",
  null
  ,true
)

/* harmony default export */ var userRoomStatus = (userRoomStatus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat?vue&type=script&lang=js&external






/* harmony default export */ var chat_vue_type_script_lang_js_external = ({
  name: "chat",
  props: {
    chat: Object,
    share: Object,
    u: String,
    search: String,
    searchresults: Array,
    filterType: String,
    style: ""
  },
  components: {
    list: list["a" /* default */],
    chatInput: () => Promise.all(/* import() */[__webpack_require__.e(9), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, "fe01")),
    join: join,
    attachement: attachement,
    userRoomStatus: userRoomStatus
  },
  inject: ["streamMode", "userBanned"],
  data: function () {
    return {
      membership: null,
      roomUserBanned: false,
      roomUserKicked: false,
      roomMuted: false,
      loading: false,
      ready: false,
      encrypted: false,
      usersinfo: [],
      chatEvents: {},
      relationEvent: null,
      key: "",
      sendingDataStore: {},
      esize: {},
      fsize: {},
      cantchat: false,
      cantchatexc: false,
      error: null,
      hoverEncrypt: false,
      encrypting: false,
      showInput: true,
      showShareMessages: false,
      selectedMessages: [],
      activated: false,
      membershipReactivity: null
    };
  },
  created() {},
  activated() {
    this.activated = true;
  },
  deactivated() {
    this.activated = false;
  },
  mounted() {
    this.activated = true;
    if (!this.streamMode) {
      this.getuserinfo();
      this.$store.commit("active", true);
      this.$store.commit("blockactive", {
        value: true,
        item: "chat"
      });
    }
    this.createMembershipReactivity();
  },
  destroyed() {
    if (!this.streamMode) {
      this.$store.commit("blockactive", {
        value: false,
        item: "chat"
      });
      this.$store.commit("SET_CURRENT_ROOM", false);
    }
    clearInterval(this.membershipReactivity);
  },
  beforeDestroy() {
    this.activated = false;
  },
  watch: {
    activated: {
      immediate: true,
      handler: function () {
        if (this.activated) {
          this.createMembershipReactivity();
        } else {
          this.destroyMembershipReactivity();
        }
      }
    },
    chatusers: function () {
      if (this.m_chat && this.m_chat.pcrypto) {
        this.core.mtrx.kit.allchatmembers([this.m_chat], false, true).then(() => {
          return this.m_chat.pcrypto.userschanded();
        }).then(r => {
          return this.checkcrypto();
        });
      }
    },
    m_chat: {
      immediate: true,
      handler: function () {
        if (this.m_chat && !_.isEmpty(this.m_chat)) {
          this.core.mtrx.kit.prepareChatWithUsers(this.m_chat).then(r => {
            this.ready = true;
            this.checkcrypto();
          });

          /*this.core.mtrx.kit
          	.allchatmembers([this.m_chat], false, true)
          	.then((r) => {
          		return this.core.mtrx.kit.prepareChat(this.m_chat);
          	})
          	.then((r) => {
          		this.ready = true;
          				this.checkcrypto();
          	});*/
        }
      }
    },
    chat: {
      immediate: true,
      handler: function () {
        this.ready = false;
        this.encrypted = false;
        this.$store.commit("setmodal", null);
        if (this.chat) {
          this.$store.commit("SET_CURRENT_ROOM", this.chat.roomId);
          this.$store.commit("SET_LAST_ROOM", this.chat.roomId);
        } else this.$store.commit("SET_CURRENT_ROOM", false);
      }
    },
    userBanned: {
      immediate: true,
      deep: true,
      handler: function () {
        var _this$m_chat, _this$m_chat$currentS, _this$m_chat$currentS2;
        this.membership = (_this$m_chat = this.m_chat) === null || _this$m_chat === void 0 ? void 0 : (_this$m_chat$currentS = _this$m_chat.currentState) === null || _this$m_chat$currentS === void 0 ? void 0 : (_this$m_chat$currentS2 = _this$m_chat$currentS.members[this.m_chat.myUserId]) === null || _this$m_chat$currentS2 === void 0 ? void 0 : _this$m_chat$currentS2.membership;
      }
    }
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    auth: state => state.auth,
    active: function (state) {
      return this.streamMode || state.active;
    },
    m_chat: function () {
      if (this.chat && this.chat.roomId) {
        let pushRules = this.core.mtrx.client.pushProcessor.getPushRuleById(this.chat.roomId);
        if (pushRules !== null) {
          this.roomMuted = true;
        }
        if (this.chat.pcrypto) {
          return this.chat;
        } else {
          return this.core.mtrx.client.getRoom(this.chat.roomId) || {};
        }
      }
    },
    keyproblem: function () {
      if (this.core.user.userinfo.keys.length < 12) {
        return "younotgen";
      } else return "usernotgen";
    },
    allowedToRead: function () {
      return this.membership === "join" || this.streamMode;
    },
    allowedToJoin: function () {
      return this.membership === "invite" || this.streamMode;
    },
    blockedUser: function () {
      if (this.u) {
        return this.core.mtrx.blockeduser(this.u[0]);
      }
      if (this.chat) {
        var users = this.core.mtrx.anotherChatUsers(this.chat.roomId);
        if (users.length === 1) {
          return this.core.mtrx.blockeduser(users[0].userId);
        }
      }

      /* if(this.m_chat){
      	  var me = this.m_chat.myUserId
       var anotherUser = this.chat.members.filter(member => member.userId !== me)
       this.core.mtrx.client.isUserIgnored(anotherUser[0].userId)
      	  
       }*/
    },
    openInviteModal: function () {
      return this.openInviteModal;
    },
    attachements: function () {
      return _.toArray(this.sendingDataStore);
    },
    chatusers: function () {
      if (this.m_chat) return this.core.store.state.chatusers[this.m_chat.roomId];
    },
    localisationTitles: function () {
      return this.$i18n.t("button");
    }
  }),
  methods: {
    destroyMembershipReactivity: function () {
      if (this.membershipReactivity) clearInterval(this.membershipReactivity);
      this.membershipReactivity = null;
    },
    createMembershipReactivity: function () {
      if (this.membershipReactivity) clearInterval(this.membershipReactivity);
      this.membershipReactivity = setInterval(() => {
        var _this$m_chat3, _this$m_chat3$current;
        if (!this.activated) return;
        if (this.m_chat && !this.streamMode) {
          if (this.m_chat.timeline.length > 0) {
            const id = this.core.mtrx.client.credentials.userId,
              timeline = this.core.mtrx.client.getRoom(this.chat.roomId).timeline,
              lastEvent = timeline[timeline.length - 1];
            if (lastEvent.event.state_key === id && lastEvent.event.content.reason === "admin ban") {
              this.roomUserBanned = true;
            } else {
              this.roomUserBanned = false;
            }
          }
        } else if (this.streamMode) {
          var _this$m_chat2, _this$m_chat2$current;
          this.roomUserBanned = ((_this$m_chat2 = this.m_chat) === null || _this$m_chat2 === void 0 ? void 0 : (_this$m_chat2$current = _this$m_chat2.currentState.members[this.m_chat.myUserId]) === null || _this$m_chat2$current === void 0 ? void 0 : _this$m_chat2$current.membership) === "ban";
        }
        this.membership = (_this$m_chat3 = this.m_chat) === null || _this$m_chat3 === void 0 ? void 0 : (_this$m_chat3$current = _this$m_chat3.currentState.members[this.m_chat.myUserId]) === null || _this$m_chat3$current === void 0 ? void 0 : _this$m_chat3$current.membership;
      }, 1000);
    },
    clbkencrypt: function () {
      this.encrypting = true;
    },
    clbkencrypted: function () {
      this.encrypting = false;
    },
    checkcrypto: function () {
      var _this$m_chat$pcrypto, _this$m_chat$pcrypto2;
      this.encrypted = (_this$m_chat$pcrypto = this.m_chat.pcrypto) === null || _this$m_chat$pcrypto === void 0 ? void 0 : _this$m_chat$pcrypto.canBeEncrypt();
      this.cantchat = (_this$m_chat$pcrypto2 = this.m_chat.pcrypto) === null || _this$m_chat$pcrypto2 === void 0 ? void 0 : _this$m_chat$pcrypto2.cantchat();
    },
    force: function () {
      this.key = functions["a" /* default */].makeid();
    },
    clearRelationEvent: function () {
      if (this.relationEvent && this.relationEvent.type === "m.replace" && this.$refs["chatInput"]) {
        this.$refs["chatInput"].setText("");
      }
      this.relationEvent = null;
    },
    newchat: function (chat) {
      this.$emit("newchat", chat);
      this.m_chat.pcrypto.userschanded();
    },
    getuserinfo: function () {
      if (this.u) {
        this.core.user.usersInfo(this.u).then(info => {
          this.usersinfo = info;
        });
      }
    },
    cantchatcrypto: function () {
      this.cantchat = true;
    },
    proceedwithoutkeys: function () {
      this.cantchatexc = true;
    },
    refreshkeys: function () {
      this.core.user.userInfo(true).then(r => {
        if (this.u) {
          this.core.user.usersInfo(this.u, false, true).then(info => {
            var _info = info[0];
            if (_info && _info.keys && _info.keys.length >= 12 && this.core.user.userinfo.keys.length >= 12) {
              this.cantchat = false;
            }
            this.usersinfo = info;

            //this.m_chat.pcrypto.userschanded()
          });
        } else {
          this.core.store.dispatch("RELOAD_CHAT_USERS", [this.m_chat]).then(r => {
            /*this.m_chat.pcrypto.userschanded()
            		this.checkcrypto()*/
          });
        }
      });
    },
    closing: function (e) {
      this.PNmetaPreview = e;
    },
    usersinfoNames: function () {
      return _.map(this.usersinfo, function (u) {
        return u.name;
      }).join(", ");
    },
    replyEvent: function ({
      event
    }) {
      this.relationEvent = {
        type: "m.reference",
        event: event,
        action: this.$i18n.t("caption.replyOnMessage")
      };
      if (this.$refs["chatInput"]) {
        this.$refs["chatInput"].focus();
      }
    },
    shareEvent: function ({
      event
    }) {
      this.relationEvent = {
        type: "m.reference",
        event: event,
        action: this.$i18n.t("caption.shareMessage")
      };
      if (this.$refs["chatInput"]) {
        this.$refs["chatInput"].focus();
      }
    },
    editingEvent: function ({
      event,
      text
    }) {
      this.relationEvent = {
        type: "m.replace",
        event: event,
        action: this.$i18n.t("caption.editMessage")
      };
      if (this.$refs["chatInput"]) {
        this.$refs["chatInput"].setText(text);
      }
    },
    focused: function () {
      this.fsize = _.clone(this.esize);
    },
    scroll(size) {
      this.esize = size;
      var ns = this.esize.scrollTop || 0;
      var fs = this.fsize.scrollTop || 0;
      if (ns - 450 > fs && this.$refs["chatInput"]) {
        this.$refs["chatInput"].blurifempty();
      }
    },
    events(data) {
      this.$emit("getEvents", data);
      this.chatEvents = data;
    },
    galleryImage(e) {
      this.core.store.dispatch("SHOW_GALLERY_FROMEVENTS", {
        events: this.chatEvents,
        event: e
      });
    },
    sending: function () {
      this.$emit("sending");
      this.$refs["list"].scrollToNew(0);

      ///$(this.$el).find('.eventsflex').scrollTop(0) ???
    },
    sent: function () {
      if (this.relationEvent && this.relationEvent.type === "m.reference") {
        this.relationEvent = null;
      }
      this.$emit("sent");
      this.error = null;
    },
    sendingData: function (meta) {
      this.$set(this.sendingDataStore, meta.id, meta);
    },
    sentData: function (meta) {
      this.clearMeta(meta);
      this.error = null;
    },
    sentError: function (meta) {
      if (meta && meta.id) {
        this.clearMeta(meta);
      }
      if (meta && meta.error) {
        this.error = meta.error;
      }
    },
    sentMessageError: function (e) {
      this.error = e.error;
      this.core.logerror("sentMessageError", functions["a" /* default */].stringify(this.error));
    },
    abortSending: function (id) {
      var meta = this.sendingDataStore[id];
      if (meta.abort) meta.abort();
      meta.aborted = true;

      ///

      this.clearMeta(meta);
    },
    brokenInvitedRoom(val) {
      this.$emit("removeBrokenRoom", val);
    },
    clearMeta: function (meta) {
      this.$delete(this.sendingDataStore, meta.id);
    },
    menuIsVisibleHandler: function (isVisible) {
      this.$emit("menuIsVisible", isVisible);
    },
    shareDataMessages: function () {
      var messages = _.map(_.sortBy(this.selectedMessages, m => {
        return m.time;
      }), m => {
        return m.sharing;
      });
      this.core.share({
        multiple: messages
      }).then(() => {
        this.selectedMessages = [];
      });

      /*let allMessages = [];
      		for (let i = 0; i < this.selectedMessages.length; i++) {
      	if (this.selectedMessages[i].messages) {
      		allMessages.push(this.selectedMessages[i].messages[0]);
      	}
      }
      		var pr = Promise.resolve();
      var _sharing = this.selectedMessages[0];
      _sharing.messages = allMessages;
      
      pr.then(() => {
      	this.core.share(_sharing);
      });*/
    },
    removeDataMessages: function () {
      this.$store.commit("icon", {
        icon: "loading",
        message: "",
        manual: true
      });
      Promise.all(_.map(this.selectedMessages, message => {
        return this.core.mtrx.client.redactEvent(this.chat.roomId, message.message_id, null, {
          reason: "messagedeleting"
        });
      })).then(r => {
        this.$store.commit("icon", {
          icon: "success",
          message: ""
        });
        this.selectedMessages = [];
      }).catch(e => {
        console.error(e);
        this.selectedMessages = [];
        this.$store.commit("icon", {
          icon: "error",
          message: ""
        });
      }).finally(() => {
        this.force();
      });
    },
    cancelDataMessages: function () {
      this.selectedMessages = [];
    },
    scrollToEvent: function (event) {
      functions["a" /* default */].pretry(() => {
        return this.$refs["list"];
      }).then(() => {
        this.$refs["list"].scrollToEvent(event);
      });
    },
    joined: function () {
      /*Trigger chat reactivity*/
      this.$set(this.chat, "joined", +new Date());
      this.userBanned.set(false);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat?vue&type=script&lang=js&external
 /* harmony default export */ var components_chat_vue_type_script_lang_js_external = (chat_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chat/index.vue



function chat_injectStyles (context) {
  
  var style0 = __webpack_require__("2343")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  components_chat_vue_type_script_lang_js_external,
  render,
  staticRenderFns,
  false,
  chat_injectStyles,
  "2273a223",
  null
  ,true
)

/* harmony default export */ var chat = __webpack_exports__["a"] = (chat_component.exports);

/***/ }),

/***/ "c5aa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_54799a07_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("601a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_54799a07_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_54799a07_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_54799a07_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_54799a07_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c936":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ef2a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7a29c2d0", content, shadowRoot)
};

/***/ }),

/***/ "cd1a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e7bd");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7175776d", content, shadowRoot)
};

/***/ }),

/***/ "d370":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5395");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3c28a567", content, shadowRoot)
};

/***/ }),

/***/ "e7bd":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".caption[data-v-3967ea65]{padding:1em}.caption span[data-v-3967ea65]{font-size:1.5em;font-weight:700}.tip[data-v-3967ea65]{padding:1.5em;text-align:center}.tip span[data-v-3967ea65]{font-size:.8em}.blocked[data-v-3967ea65]{width:100%;text-align:center}.blocked span[data-v-3967ea65]{font-size:.9em}.joinAction[data-v-3967ea65]{position:fixed;bottom:0;left:0;right:0;background:rgb(var(--neutral-grad-0));padding:1em 0;text-align:center;z-index:3}.joinAction.bin[data-v-3967ea65]{position:sticky}.joinAction .actions[data-v-3967ea65]{display:flex}.joinAction .actions .action[data-v-3967ea65]{padding:.5em;flex-grow:1}.joinAction .actions .action button[data-v-3967ea65]{min-width:0;width:100%}.my-swipe[data-v-3967ea65]{height:200px;font-size:30px;text-align:center}.my-swipe[data-v-3967ea65],.slide1[data-v-3967ea65]{color:rgb(var(--text-on-bg-ac-color))}.slide1[data-v-3967ea65]{background-color:rgb(var(--color-bg-ac))}.slide2[data-v-3967ea65]{background-color:rgb(var(--color-bg-orange));color:#000}.slide3[data-v-3967ea65]{background-color:rgb(var(--color-bg-ac-2));color:rgb(var(--text-on-bg-ac-color))}.minimized:not(.active) .caption[data-v-3967ea65]{width:52px;text-align:center}.minimized:not(.active) .caption span[data-v-3967ea65]{color:rgb(var(--color-txt-ac));font-size:.6em}.minimized:not(.active) .chatPreview[data-v-3967ea65]{display:none}.minimized[data-v-3967ea65]:not(.active) .userinfoWrapper{background:transparent!important;box-shadow:none}.minimized[data-v-3967ea65]:not(.active) .haskeys{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "ee79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=template&id=4c0e7fac&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "page chat",
    class: {
      mobile: _vm.mobile
    }
  }, [_c('topheader', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.hideHeader || !_vm.ios,
      expression: "!hideHeader || !ios"
    }],
    key: _vm.k,
    staticClass: "topheader chat-topheader",
    attrs: {
      "u": _vm.u,
      "chat": _vm.chat,
      "search": _vm.search,
      "focusedevent": _vm.focusedevent,
      "process": _vm.processid,
      "searchresults": _vm.processresult
    },
    on: {
      "searching": _vm.searching,
      "addMember": _vm.addMemberModal,
      "tosearchevent": _vm.tosearchevent
    }
  }), _c('maincontent', {
    scopedSlots: _vm._u([{
      key: "content",
      fn: function () {
        return [_c('chat', {
          key: _vm.routeParams.id,
          ref: "chat",
          attrs: {
            "u": _vm.routeParams.u,
            "chat": _vm.chat,
            "toevent": _vm.toevent,
            "search": _vm.search,
            "searchresults": _vm.processresult
          },
          on: {
            "sending": _vm.sending,
            "newchat": _vm.newchat,
            "removeBrokenRoom": _vm.creatorLeft,
            "getEvents": _vm.eventsRoom,
            "menuIsVisible": _vm.menuIsVisibleHandler,
            "toeventscrolled": _vm.toeventscrolled
          }
        })];
      },
      proxy: true
    }])
  }), _vm.openInviteModal ? _c('modal', {
    on: {
      "close": _vm.closeModal
    },
    scopedSlots: _vm._u([{
      key: "header",
      fn: function () {
        return [_c('span', [_vm._v(_vm._s(_vm.$t("caption.inviteUser")))])];
      },
      proxy: true
    }, {
      key: "body",
      fn: function () {
        return [_c('contacts', {
          attrs: {
            "mode": `inviteUsers`,
            "chatRoomId": _vm.chat.roomId
          },
          on: {
            "closeModal": _vm.closeContactModal
          }
        })];
      },
      proxy: true
    }, {
      key: "footer",
      fn: function () {
        return undefined;
      },
      proxy: true
    }], null, false, 1321158477)
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=template&id=4c0e7fac&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./src/components/chat/index.vue + 24 modules
var chat = __webpack_require__("b163");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/topheader/index.vue?vue&type=template&id=b3a12b78&scoped=true
var topheadervue_type_template_id_b3a12b78_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    attrs: {
      "id": "chatTopheader"
    }
  }, [_vm.chat || _vm.u ? _c('topheader', {
    scopedSlots: _vm._u([{
      key: "left",
      fn: function () {
        return [_c('backButton', {
          attrs: {
            "action": "chats"
          }
        })];
      },
      proxy: true
    }, {
      key: "leftadd",
      fn: function () {
        return [_c('div', {
          staticClass: "iconbuttonsmall",
          on: {
            "click": _vm.tosearch
          }
        }, [_c('i', {
          staticClass: "fas fa-search"
        })])];
      },
      proxy: true
    }, {
      key: "info",
      fn: function () {
        return [_vm.chat ? _c('router-link', {
          attrs: {
            "to": 'chatInfo?id=' + _vm.chat.roomId
          }
        }, [_vm.m_chat ? _c('div', [_c('div', {
          staticClass: "nameWrapper"
        }, [!_vm.roomInfo ? _c('chatName', {
          attrs: {
            "preview": true,
            "chat": _vm.chat,
            "m_chat": _vm.m_chat
          }
        }) : _vm._e(), _vm.roomMuted ? _c('div', {
          staticClass: "roomMuted"
        }, [_c('i', {
          staticClass: "fas fa-bell-slash"
        })]) : _vm._e()], 1), _c('transition', {
          attrs: {
            "name": "fade"
          }
        }, [_vm.m_chat_typing ? _c('chatTyping') : _vm._e()], 1)], 1) : _vm._e(), !_vm.m_chat && _vm.userinfo ? _c('div', [_c('span', {
          staticClass: "nameline"
        }, [_vm._v(_vm._s(_vm.userinfo.name))])]) : _vm._e()]) : _vm._e()];
      },
      proxy: true
    }, _vm.callsEnabled && _vm.m_chat ? {
      key: "rightadd",
      fn: function () {
        return [_vm.isCallsActive && !_vm.isGroup ? _c('div', {
          staticClass: "call btn iconbutton",
          class: _vm.checkCallsEnabled === 'wait' || _vm.wait ? 'wait' : _vm.checkCallsEnabled ? '' : 'disabled',
          attrs: {
            "title": _vm.checkCallsEnabled === 'wait' || _vm.wait ? _vm.$t('caption.wait') : _vm.checkCallsEnabled ? '' : _vm.$t('caption.disabled')
          },
          on: {
            "click": _vm.bcCall
          }
        }, [!_vm.callloading ? _c('i', {
          staticClass: "fas fa-video"
        }) : _c('i', {
          staticClass: "fas fa-spinner fa-spin"
        })]) : _vm._e()];
      },
      proxy: true
    } : null, {
      key: "right",
      fn: function () {
        return [_vm.chat ? _c('router-link', {
          attrs: {
            "to": 'chatInfo?id=' + _vm.chat.roomId
          }
        }, [_c('div', {
          staticClass: "iconbutton"
        }, [_c('i', {
          staticClass: "fas fa-ellipsis-h"
        })])]) : _vm._e()];
      },
      proxy: true
    }], null, true)
  }) : _vm._e(), _vm.chat && _vm.searchactive ? _c('topheader', {
    attrs: {
      "classstyle": "noiconsButWithL"
    },
    scopedSlots: _vm._u([{
      key: "left",
      fn: function () {
        return [_c('backButton', {
          on: {
            "back": _vm.backfromsearch
          }
        })];
      },
      proxy: true
    }, {
      key: "info",
      fn: function () {
        return [_c('simpleSearch', {
          ref: "search",
          attrs: {
            "value": _vm.search,
            "controlKeys": true
          },
          on: {
            "search": _vm.searching,
            "controlKey": _vm.searchControlKey
          },
          scopedSlots: _vm._u([_vm.searchresults && _vm.searchresults.length ? {
            key: "default",
            fn: function () {
              return [_c('div', {
                staticClass: "matches"
              }, [_c('span', {
                staticClass: "current-match"
              }, [_vm._v(_vm._s(_vm.searchresults.length - _vm.focusedeventIndex) + "/" + _vm._s(_vm.searchresults.length))]), _c('i', {
                staticClass: "prev-match fas fa-chevron-up",
                on: {
                  "click": _vm.tobottomsearch
                }
              }), _c('i', {
                staticClass: "next-match fas fa-chevron-down",
                on: {
                  "click": _vm.toupsearch
                }
              })]), _vm.search ? _c('div', {
                staticClass: "iconWrapper",
                on: {
                  "click": () => {
                    _vm.searching('');
                  }
                }
              }, [_c('i', {
                staticClass: "fas fa-times"
              })]) : _vm._e()];
            },
            proxy: true
          } : null], null, true)
        })];
      },
      proxy: true
    }], null, false, 2056528287)
  }) : _vm._e()], 1);
};
var topheadervue_type_template_id_b3a12b78_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue?vue&type=template&id=b3a12b78&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/chats/assets/name.vue + 4 modules
var assets_name = __webpack_require__("aa20");

// EXTERNAL MODULE: ./src/components/chats/assets/icon.vue + 4 modules
var icon = __webpack_require__("3094");

// EXTERNAL MODULE: ./src/components/chats/assets/typing.vue + 9 modules
var typing = __webpack_require__("0826");

// EXTERNAL MODULE: ./src/components/contacts/index.vue + 4 modules
var contacts = __webpack_require__("71da");

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/topheader?vue&type=script&lang=js&external








/* harmony default export */ var topheader_vue_type_script_lang_js_external = ({
  name: "chatTopheader",
  props: {
    chat: Object,
    u: String,
    roomInfo: false,
    aboutUser: false,
    search: String,
    process: String,
    searchresults: null,
    focusedevent: null
  },
  inject: ["matches", "menuState"],
  components: {
    chatName: assets_name["a" /* default */],
    chatIcon: icon["a" /* default */],
    chatTyping: typing["a" /* default */],
    contacts: contacts["a" /* default */]
  },
  data: function () {
    return {
      callMenuItems: [{
        icon: "fa-phone fa fa-flip-horizontal",
        action: () => {
          this.initiateCall("voice");
        },
        text: "caption.call"
      }, {
        icon: "fa-video fa",
        action: () => {
          this.initiateCall("video");
        },
        text: "caption.videocall"
      }],
      menuItemsRoom: [{
        click: "AddMember",
        title: this.$i18n.t("caption.add"),
        icon: "fas fa-user-plus"
      }, {
        click: "MuteRoom",
        title: this.$i18n.t("caption.mute"),
        icon: "fas fa-bell-slash"
      }, {
        click: "LeaveFromRoom",
        title: this.$i18n.t("caption.leaveAndDelete"),
        icon: "fas fa-sign-out-alt"
      }],
      menuItemsRoomMuted: [{
        click: "AddMember",
        title: this.$i18n.t("caption.add"),
        icon: "fas fa-user-plus"
      }, {
        click: "MuteRoom",
        title: this.$i18n.t("caption.unmute"),
        icon: "fas fa-bell"
      }, {
        click: "LeaveFromRoom",
        title: this.$i18n.t("caption.leaveAndDelete"),
        icon: "fas fa-sign-out-alt"
      }],
      oneToOne: [{
        click: "MuteRoom",
        title: this.$i18n.t("caption.mute"),
        icon: "fas fa-bell-slash"
      },
      /*{
            click: "LeaveFromRoom",
            title: "Leave and Delete",
            icon: "fas fa-sign-out-alt"
          },*/
      {
        click: "Donate",
        title: this.$i18n.t("caption.donate"),
        icon: "fas fa-money-bill-wave"
      }],
      oneToOneMuted: [{
        click: "MuteRoom",
        title: this.$i18n.t("caption.unmute"),
        icon: "fas fa-bell"
      }, {
        click: "LeaveFromRoom",
        title: this.$i18n.t("caption.leaveAndDelete"),
        icon: "fas fa-sign-out-alt"
      }, {
        click: "Donate",
        title: this.$i18n.t("caption.donate"),
        icon: "fas fa-money-bill-wave"
      }],
      donateMenu: [{
        click: "Donate",
        title: this.$i18n.t("caption.donate"),
        icon: "fas fa-money-bill-wave"
      }],
      wait: false,
      loading: false,
      typing: false,
      userinfo: null,
      aboutUserShow: false,
      roomBanned: false,
      roomMuted: false,
      searchactive: false,
      // --- Variables for the donation part ---
      // Boolean when the donation modal is open
      donateUserOpened: false,
      // Object containing the receiver informations
      receiver: null,
      // How much PKOIN we want to donate
      donationAmount: 0,
      // Optional message for the transaction
      donationMessage: "",
      // Calculated fees needed for the transaction
      calculatedFees: null,
      // Booleans to show errors
      showFeesError: "",
      showTransactionError: "",
      // Booleans to show spinners
      calculatingFees: false,
      sending: false,
      // To choose by who the fee should be payed by
      feesDirection: "include",
      feesDirectionPossibleValues: [{
        value: "include",
        label: this.$i18n.t("caption.toBePaidByReceiver")
      }, {
        value: "exclude",
        label: this.$i18n.t("caption.toBePaidBySender")
      }],
      hoverEncrypt: false,
      callloading: false
    };
  },
  watch: {
    //$route: 'getdata'
  },
  mounted: function () {
    this.getuserinfo();
    if (this.search) {
      this.searchactive = true;
    }
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    focusedeventIndex: function () {
      if (!this.searchresults || !this.focusedevent) {
        return null;
      }
      var i = -1;
      _.find(this.searchresults, (e, index) => {
        if (e.event.event_id == this.focusedevent.event.event_id) {
          i = index;
          return true;
        }
      });

      //if (i < 1) i = 1

      return i;
    },
    callsEnabled: state => state.isCallsEnabled,
    checkCallsEnabled: function () {
      var _this$$store$state$Ch, _this$$store$state$Ch2;
      if ((_this$$store$state$Ch = this.$store.state.ChatStatuses[this.m_chat.roomId]) !== null && _this$$store$state$Ch !== void 0 && _this$$store$state$Ch.enabled) {
        this.wait = false;
        return true;
      } else if ((_this$$store$state$Ch2 = this.$store.state.ChatStatuses[this.m_chat.roomId]) !== null && _this$$store$state$Ch2 !== void 0 && _this$$store$state$Ch2.isWaiting) {
        return "wait";
      } else {
        this.wait = false;
        return false;
      }
    },
    isGroup: function () {
      var _this$m_chat;
      return ((_this$m_chat = this.m_chat) === null || _this$m_chat === void 0 ? void 0 : _this$m_chat.name.slice(0, 1)) === "@";
    },
    auth: state => state.auth,
    isCallsActive: state => state.isCallsActive,
    m_chat: function () {
      if (this.chat && this.chat.roomId) {
        let pushRules = this.core.mtrx.client.pushProcessor.getPushRuleById(this.chat.roomId);
        if (pushRules !== null) {
          this.roomMuted = true;
        }
        var m_chat = this.core.mtrx.client.getRoom(this.chat.roomId);
        return m_chat || {};
      }
    },
    m_chat_typing: function () {
      if (!this.chat) return false;
      var chat = this.chat.roomId;
      var typing = this.$store.state.typing[chat] || {};
      var userTyping = _.find(typing, (t, i) => {
        if (t) {
          var _this$core$user$useri;
          if (i == ((_this$core$user$useri = this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id)) return false;
          return true;
        }
      });
      return userTyping || false;
    },
    totalDonationAmount: function () {
      return this.feesDirection == "include" ? this.donationAmount : this.donationAmount + this.calculatedFees;
    }
  }),
  methods: {
    searchControlKey: function (key) {
      if (key == "up") this.tobottomsearch();
      if (key == "down") this.toupsearch();
    },
    openCallModal() {
      this.menuState.set({
        fromtop: true,
        items: this.callMenuItems
      });
    },
    toupsearch: function () {
      if (!this.searchresults) return;
      var i = this.focusedeventIndex;
      if (i <= this.searchresults.length - 2) {
        this.$emit("tosearchevent", this.searchresults[this.focusedeventIndex + 1]);
      } else {
        this.$emit("tosearchevent", this.searchresults[0]);
      }
    },
    tobottomsearch: function () {
      if (!this.searchresults && this.searchresults.length) return;
      var i = this.focusedeventIndex;
      if (i > 0) this.$emit("tosearchevent", this.searchresults[this.focusedeventIndex - 1]);else this.$emit("tosearchevent", this.searchresults[this.searchresults.length - 1]);
    },
    backfromsearch: function () {
      if (this.process) {
        this.$router.push("chats?process=" + this.process).catch(e => {});
      } else {
        this.searchactive = false;
        this.searching("");
      }
    },
    tosearch: function () {
      this.searchactive = true;
      setTimeout(() => {
        if (this.$refs.search) this.$refs.search.focus();
      }, 100);
    },
    searching: function (str) {
      this.$emit("searching", str);
      if (!str) {
        this.searchactive = false;
      }
    },
    bcCall: function () {
      if (!this.checkCallsEnabled) {
        this.$dialog.confirm(this.$t("caption.request"), {
          okText: this.$t("yes"),
          cancelText: this.$t("cancel")
        }).then(() => {
          this.core.mtrx.client.sendStateEvent(this.chat.roomId, "m.room.callsEnabled", {
            enabled: true
          }, this.core.user.userinfo.id);
          this.wait = true;
          this.requestCallsAccess();
        });
        return;
      } else if (this.checkCallsEnabled === "wait") {
        return;
      }
      let local = document.querySelector("body");
      this.openCallModal();
    },
    /**
     * @param {'video' || 'voice'} callType
     */
    initiateCall(type) {
      if (this.callloading) return;
      this.callloading = true;
      setTimeout(() => {
        this.core.mtrx.bastyonCalls.initCall(this.chat.roomId, type).then(matrixCall => {
          // if (matrixCall) this.$store.dispatch("CALL", matrixCall);
        }).catch(e => {
          console.log("error", e);
        }).finally(() => {
          this.callloading = false;
        });
      }, 50);
    },
    requestCallsAccess() {
      this.core.mtrx.client.sendStateEvent(this.m_chat.roomId, "m.room.request_calls_access", {
        accepted: null
      });
    },
    navigateToProfile(id) {
      this.$router.push({
        path: `/contact?id=${functions["a" /* default */].getmatrixid(id)}`
      }).catch(e => {});
    },
    getuserinfo: function () {
      if (this.u) {
        this.core.user.usersInfo(this.u).then(info => {
          this.userinfo = info[0];
        });
      }
    },
    // Return the another member in the chat
    // (it returns the last one, so make sense only for the one to one chat)
    // If no user found, return undefined
    findOtherUser: function () {
      let my = this.m_chat.myUserId;
      let receiver;
      let members = this.m_chat.currentState.getMembers();
      members.forEach(function (member) {
        if (member && member.userId !== my) receiver = member;
      });
      return receiver;
    },
    addMember() {
      this.modalInviteUser();
    },
    menuItemClickHandler(item, rowObject) {
      if (item.click === "AddMember") {
        this.$emit("addMember", true);
        this.$refs.dropdownMenu.hidePopup();
      }
      if (item.click === "MuteRoom") {
        var roomId = this.chat.roomId;
        var deviceID = this.core.mtrx.client.deviceId;
        let self = this;
        let pushRules = this.core.mtrx.client.pushProcessor.getPushRuleById(this.chat.roomId);
        if (pushRules !== null) {
          self.core.mtrx.client.deletePushRule("global", "room", roomId);
          this.roomMuted = false;
        } else {
          self.core.mtrx.client.setRoomMutePushRule("global", roomId, "true");
          this.roomMuted = true;
        }
        this.$refs.dropdownMenu.hidePopup();
      }
      if (item.click === "LeaveFromRoom") {
        let self = this;
        this.core.mtrx.client.leave(this.chat.roomId).then(r => {
          this.core.mtrx.client.forget(this.chat.roomId, true).then(r => {
            this.$store.commit("DELETE_ROOM", this.chat.roomId);
          }).then(r => {
            this.$router.push({
              path: "/chats"
            }).catch(e => {});
          });
        });
        this.$refs.dropdownMenu.hidePopup();
      }
      if (item.click === "BanRoom") {
        let banUserId = "";
        let banUser = this.findOtherUser();
        if (banUser && banUser.userId) banUserId = banUser.userId;
        let roomID = this.chat.roomId;
        this.core.mtrx.client.ban(roomID, banUserId, "ban").then(r => {});
        this.roomBanned = true;
        this.$refs.dropdownMenu.hidePopup();
      }
      if (item.click === "Unban") {
        let banUserId = "";
        let banUser = this.findOtherUser();
        if (banUser && banUser.userId) banUserId = banUser.userId;
        this.core.mtrx.client.unban(this.chat.roomId, banUserId).then(r => {
          this.core.mtrx.client.invite(this.chat.roomId, banUserId);
        });
        this.roomBanned = false;
        this.$refs.dropdownMenu.hidePopup();
      }
      if (item.click === "Donate") {
        // Open modal
        this.donateUserOpened = true;
        // Close dropdown menu
        this.$refs.dropdownMenu.hidePopup();
        // Find the user we are about to donate to
        let receiverObj = this.findOtherUser();
        this.receiver = receiverObj ? this.$f.deep(this, "$store.state.users." + this.$f.getmatrixid(receiverObj.name)) : null;
      }
    },
    closeDonateModal() {
      this.donateUserOpened = false;
    },
    onCalculateFeesClick() {
      this.calculatingFees = true;
      this.calculateFees().finally(() => this.calculatingFees = false);
    },
    calculateFees() {
      var self = this;
      this.showFeesError = "";
      return new Promise((resolve, reject) => {
        // Check parameters
        if (this.donationAmount <= 0 || !this.receiver || !this.receiver.source || !this.receiver.source.address) {
          this.showFeesError = "invalid";
          return reject("Missing amount or receiver");
        }
        // Try calculating fees
        try {
          var sdk = window.POCKETNETINSTANCE.platform.sdk;
          sdk.node.fee.estimate(function (fees) {
            var outputs = [{
              address: self.receiver.source.address,
              amount: self.donationAmount
            }];
            sdk.wallet.txbase([sdk.address.pnet().address], outputs, 0, self.feesDirection, function (err, inputs, _outputs) {
              if (err) {
                console.error(err);
                self.showFeesError = err;
                return reject(err);
              }
              var tx = sdk.node.transactions.create.wallet(inputs, _outputs);
              var totalFees = Math.min(tx.virtualSize() * fees.feerate, 0.0999);
              // Got the fees
              self.calculatedFees = totalFees;
              return resolve();
            });
          });
        } catch (err) {
          console.error(err);
          self.showFeesError = err;
          return reject(err);
        }
      });
    },
    sendDonation() {
      var _this = this;
      return Object(asyncToGenerator["a" /* default */])(function* () {
        var self = _this;
        _this.sending = true;
        _this.showTransactionError = "";
        // Recalculate the fees just before sending
        try {
          yield _this.calculateFees();
        } catch (err) {
          _this.showTransactionError = "error";
          _this.sending = false;
          return;
        }
        // Check if current balance is enough
        var sdk = window.POCKETNETINSTANCE.platform.sdk;
        sdk.node.transactions.get.canSpend(sdk.address.pnet().address, currentBalance => {
          // If balance is too low
          if (!currentBalance || isNaN(currentBalance) || currentBalance < self.totalDonationAmount) {
            self.showTransactionError = "balance too low";
            self.sending = false;
            return;
          }
          // Start the send transaction process
          try {
            var outputs = [{
              address: self.receiver.source.address,
              amount: self.donationAmount
            }];
            sdk.wallet.embed(outputs, self.donationMessage);
            // Create a transaction
            sdk.wallet.txbase([sdk.address.pnet().address], outputs, self.calculatedFees, self.feesDirection, function (err, inputs, _outputs) {
              if (err) {
                console.error(err);
                self.showTransactionError = "error";
                self.sending = false;
                return reject(err);
              }
              var tx = sdk.node.transactions.create.wallet(inputs, _outputs);
              inputs.forEach(t => {
                t.cantspend = true;
              });
              // Try sending the transaction
              sdk.node.transactions.send(tx, function (d, err) {
                if (err) {
                  sdk.node.transactions.releaseCS(inputs);
                  self.showTransactionError = "error";
                  self.sending = false;
                  return;
                }
                // Transaction has been sent
                var ids = inputs.map(i => i.txid);
                sdk.node.transactions.clearUnspents(ids);
                sdk.wallet.saveTempInfoWallet(d, inputs, _outputs);
                // Send an event to the chat
                self.core.mtrx.client.sendEvent(self.chat.roomId, "m.room.message", {
                  from: self.$f.getmatrixid(self.m_chat.myUserId),
                  to: self.receiver.id,
                  amount: self.donationAmount,
                  txId: d,
                  msgtype: "m.notice"
                }, "");
                // Close the donation modal
                self.closeDonateModal();
              });
            });
          } catch (err) {
            console.error(err);
            self.showTransactionError = "error";
            self.sending = false;
          }
        });
      })();
    },
    resetDonation() {
      this.calculatedFees = null;
      this.showFeesError = "";
      this.showTransactionError = "";
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/topheader?vue&type=script&lang=js&external
 /* harmony default export */ var chat_topheader_vue_type_script_lang_js_external = (topheader_vue_type_script_lang_js_external); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("094d")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chat_topheader_vue_type_script_lang_js_external,
  topheadervue_type_template_id_b3a12b78_scoped_true_render,
  topheadervue_type_template_id_b3a12b78_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "b3a12b78",
  null
  ,true
)

/* harmony default export */ var topheader = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=script&lang=js






/* harmony default export */ var chatvue_type_script_lang_js = ({
  name: "pagechat",
  components: {
    chat: chat["a" /* default */],
    topheader: topheader,
    contacts: contacts["a" /* default */]
  },
  data: function () {
    return {
      events: [],
      openInviteModal: false,
      brokenRoom: false,
      hideHeader: false,
      hastoeventscrolled: false,
      hasprocesscleared: false,
      searchchanged: undefined,
      process: null,
      routeParams: {
        id: this.$route.query.id,
        u: this.$route.query.u
      },
      processresult: null,
      focusedevent: null
    };
  },
  computed: {
    chat() {
      return this.$store.getters["getChatById"](this.routeParams.id);
    },
    key() {
      return this.routeParams.u + this.routeParams.id;
    },
    processid() {
      return this.hasprocesscleared ? null : this.$route.query.process;
    },
    search() {
      return (typeof this.searchchanged == "undefined" ? this.$route.query.search : this.searchchanged) || "";
    },
    toevent() {
      return this.hastoeventscrolled ? null : this.$route.query.toevent;
    },
    ios() {
      return functions["a" /* default */].isios();
    },
    ...Object(vuex_esm["d" /* mapState */])({
      pocketnet: state => state.pocketnet,
      minimized: state => state.minimized,
      mobile: state => state.mobile
    })
  },
  mounted() {
    setTimeout(() => {
      if (!this.leaveIfBroken()) {}
    }, 2000);

    //setTimeout(() => {
    if (this.toevent) {}
    //}, 300)
  },
  beforeDestroy: function () {
    if (this.process) this.process.stop();
  },
  watch: {
    "$route.query.search": function (newSearchQuery) {
      this.searching(newSearchQuery);
    },
    search: {
      immediate: true,
      handler: function (search) {
        this.updateSearchQuery(search);
        pretry(() => {
          return this.chat;
        }).then(() => {
          this.searchingProcess();
        });
      }
    }
  },
  methods: {
    tosearchevent(event) {
      this.focusedevent = event;
      this.$refs["chat"].scrollToEvent(event);
    },
    updateSearchQuery(newSearchTerm) {
      return this.$router.push({
        query: {
          ...this.$route.query,
          search: newSearchTerm
        }
      });
    },
    searchingProcess() {
      if (this.search.length > 1 && this.chat) {
        this.processresult = null;
        if (this.process) {
          this.process.updateText(this.search);
          return;
        }
        this.process = this.core.mtrx.searchEngine.execute(this.search, [this.chat], ({
          results
        }) => {
          return false;
        }, {
          chat: result => {
            this.processresult = result.results[this.chat.roomId] || null;
            if (!this.processresult) return;
            if (!this.focusedevent && this.processresult[0]) {
              if (this.toevent) {
                var e = _.find(this.processresult, e => {
                  return e.event.event_id == this.toevent;
                });
                if (e) {
                  this.toeventscrolled();
                  this.tosearchevent(e);
                }
              } else {
                this.tosearchevent(this.processresult[0]);
              }
            }
          }
        });
        this.process.execute().catch(e => {
          console.error(e);
        });
      } else {
        if (this.process) this.process.stop();
        this.processresult = null;
        this.focusedevent = null;
        this.processcleared();
      }
    },
    searching(txt) {
      this.searchchanged = txt;
    },
    processcleared() {
      this.hasprocesscleared = true;
    },
    toeventscrolled() {
      this.hastoeventscrolled = true;
    },
    creatorLeft(val) {
      this.brokenRoom = val;
    },
    closeModal() {
      this.openInviteModal = false;
    },
    closeContactModal(value) {
      this.openInviteModal = value;
    },
    addMemberModal(value) {
      this.openInviteModal = value;
    },
    newchat(_chat) {},
    sending() {},
    eventsRoom(data) {
      this.events = data;
    },
    menuIsVisibleHandler(isVisible) {
      this.hideHeader = isVisible;
    },
    leaveIfBroken() {
      if (this.brokenRoom) {
        this.core.mtrx.client.leave(from.query.id).then(r => {
          this.core.mtrx.client.forget(from.query.id, true).then(r => {
            return r;
          }).then(r => {
            this.$store.commit("DELETE_ROOM", from.query.id);
          });
        });
        return true;
      } else {
        return false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=script&lang=js
 /* harmony default export */ var views_chatvue_type_script_lang_js = (chatvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/views/chat.vue



function chat_injectStyles (context) {
  
  var style0 = __webpack_require__("3077")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  views_chatvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  chat_injectStyles,
  "4c0e7fac",
  null
  ,true
)

/* harmony default export */ var views_chat = __webpack_exports__["default"] = (chat_component.exports);

/***/ }),

/***/ "ef27":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".roomStatusView[data-v-170ef52d]{height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center}.roomStatusView .statusViewIcon i[data-v-170ef52d]{color:rgb(var(--color-txt-ac));font-size:5em}.roomStatusView .text[data-v-170ef52d]{margin:40px 0;color:rgb(var(--color-txt-ac))}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "ef2a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatAttachement[data-v-bd3aba00]{height:90px;width:120px;border-radius:5px;overflow:hidden;position:relative;background:rgb(var(--background-secondary-theme))}#chatAttachement>div[data-v-bd3aba00]{width:100%;height:100%}.cancel[data-v-bd3aba00],.loading[data-v-bd3aba00]{position:absolute;height:90px;width:120px;line-height:90px;text-align:center;font-size:3em;left:0;top:0;background:rgba(var(--background-main),.8);color:rgba(var(--text-color),.2)}.cancel[data-v-bd3aba00]{background:transparent;font-size:1.2em;color:rgb(var(--text-color))}.file[data-v-bd3aba00]{text-align:center;font-size:.8em;padding-top:1em}.file span[data-v-bd3aba00]{white-space:normal}.file .fileicon i[data-v-bd3aba00]{opacity:.4;font-size:1.5em}.image[data-v-bd3aba00],.image .bgimage[data-v-bd3aba00]{width:100%;height:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fbee":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ef27");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("077e6199", content, shadowRoot)
};

/***/ }),

/***/ "fd90":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".call[data-v-b3a12b78]{font-size:.8em;outline:none;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.call.disabled[data-v-b3a12b78]{color:rgb(var(--neutral-grad-1));cursor:not-allowed}.call.disabled[data-v-b3a12b78]:after{display:none}.call.wait[data-v-b3a12b78]{color:rgb(var(--color-star-yellow));cursor:not-allowed}.call.wait[data-v-b3a12b78]:after{display:none}.nameWrapper[data-v-b3a12b78]{display:flex;align-items:flex-end;justify-content:center}.roomMuted[data-v-b3a12b78]{font-size:.4em;width:16px;min-width:16px;text-align:center;height:16px;line-height:16px;border-radius:8px;background:rgb(var(--neutral-grad-2));margin-left:.5em;margin-block:.25em}.roomMuted i[data-v-b3a12b78]{color:rgb(var(--neutral-grad-1))}.editButton[data-v-b3a12b78]{display:flex;justify-content:center;align-items:center}.editButton i[data-v-b3a12b78]{font-size:1.5em}.nameline[data-v-b3a12b78],[data-v-b3a12b78] .nameline{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[data-v-b3a12b78] .nameline{max-width:250px}[data-v-b3a12b78] #topheader.minimized.fix{background:transparent;overflow:inherit}[data-v-b3a12b78] #search{padding-left:.5em;padding-right:.5em}.donationModalBody[data-v-b3a12b78]{padding:1em;display:flex;flex-direction:column}.donationModalBody span[data-v-b3a12b78]{color:rgb(var(--color-txt-ac))}.donationModalBody input[data-v-b3a12b78],.donationModalBody select[data-v-b3a12b78]{margin-top:.5em;margin-bottom:1.5em;border:1px solid rgb(var(--color-txt-ac));border-radius:3px;padding:.5em}.donationModalBody input.disabled[data-v-b3a12b78],.donationModalBody select.disabled[data-v-b3a12b78]{color:rgb(var(--neutral-grad-2));border:1px solid rgba(var(--neutral-grad-2),.5)}.donationModalBody button[data-v-b3a12b78]{margin-top:1em}.donationModalBody button i[data-v-b3a12b78]{margin-right:.2em}.donationModalBody .totalAmount[data-v-b3a12b78]{font-weight:700;margin-left:.5em;margin-top:.5em;margin-bottom:1em}.donationModalBody .error[data-v-b3a12b78]{color:rgb(var(--color-bad));text-align:center}.donationModalBody .linepreloader[data-v-b3a12b78]{text-align:center;height:29px;margin-top:1em}#simpleSearch .matches[data-v-b3a12b78]{display:flex;align-items:center;height:100%}#simpleSearch .matches i[data-v-b3a12b78],#simpleSearch .matches span[data-v-b3a12b78]{font-size:.8em;padding:.5em}#simpleSearch .matches i[data-v-b3a12b78]{cursor:pointer}#simpleSearch .matches i[data-v-b3a12b78]:hover{color:rgb(var(--color-txt-ac))}.encrypted[data-v-b3a12b78]{z-index:2;color:rgb(var(--color-good));padding:.25em .5em}.encrypted i[data-v-b3a12b78]{font-size:.8em;cursor:pointer}.encryptedInfo[data-v-b3a12b78]{cursor:default;margin-left:-25px;position:absolute;top:50%;transform:translateY(-50%);z-index:9999;display:flex;justify-content:center;align-items:center;flex-direction:column}.encryptedInfo #slide[data-v-b3a12b78]{border-radius:8px;padding:0 .5em;position:absolute;left:0;background:#fff;-webkit-animation:slide-b3a12b78 .1s forwards;-webkit-animation-delay:.3s;animation:slide-b3a12b78 .1s forwards;animation-delay:.3s;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}@keyframes slide-b3a12b78{to{left:0}}.encryptedInfo button[data-v-b3a12b78]{cursor:pointer;display:flex;align-items:center;justify-content:flex-start;text-align:left}.encryptedInfo button i[data-v-b3a12b78]{margin-right:5px}.encryptedInfo .encryptedTxtIcon[data-v-b3a12b78]{flex-direction:column;align-items:center;justify-content:center;padding:.25em .25em;text-align:center}.encryptedInfo .encryptedTxtIcon span[data-v-b3a12b78]{color:rgb(var(--color-good));font-size:.8em}.encryptedInfo .encryptedTxtIcon i[data-v-b3a12b78]{color:rgb(var(--color-good));display:none}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=matrix-element.12.js.map