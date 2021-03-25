(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[4],{

/***/ "015a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("663a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("39a4f71d", content, shadowRoot)
};

/***/ }),

/***/ "0405":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("47b1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "0826":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=template&id=35857e68&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typingBlock",staticStyle:{"position":"relative"}},[_c('div',{staticClass:"typingBlockWrapper"},[_vm._m(0),_c('div',[_c('PulseLoader',{attrs:{"color":_vm.color,"size":_vm.size,"loading":true}})],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[_vm._v("typing")])])}]


// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue?vue&type=template&id=35857e68&

// EXTERNAL MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue + 4 modules
var PulseLoader = __webpack_require__("8a5d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=script&lang=js&
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

/* harmony default export */ var typingvue_type_script_lang_js_ = ({
  name: 'typing',
  props: {},
  components: {
    PulseLoader: PulseLoader["a" /* default */]
  },
  data: function data() {
    return {
      color: '#868686',
      size: '2px',
      loading: true
    };
  },
  methods: {},
  computed: {}
});
// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue?vue&type=script&lang=js&
 /* harmony default export */ var assets_typingvue_type_script_lang_js_ = (typingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("1b86")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_typingvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var typing = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "0a60":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("846a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("68263c78", content, shadowRoot)
};

/***/ }),

/***/ "0aa1":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .chatInputWrapper[data-v-9660c700]{transition:.3s}#matrix-root[theme=black] .chatEmpty[data-v-9660c700]{color:#92979d}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "0e42":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7c32");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "1083":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4cd4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "11e5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5126");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "14a9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17ea");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "1603":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5fba");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("114ba3e5", content, shadowRoot)
};

/***/ }),

/***/ "17ea":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9e99");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3cd345a0", content, shadowRoot)
};

/***/ }),

/***/ "1ac7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f70");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "1b4c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatInput[data-v-69fff1a6]{padding-bottom:.5em;padding-top:.5em}.inputWrapper[data-v-69fff1a6]{display:flex}.inputWrapper .left[data-v-69fff1a6]{width:35px;text-align:center}.inputWrapper .left .iconbutton[data-v-69fff1a6]{width:35px}.inputWrapper>div[data-v-69fff1a6]{transition:.3s}.inputWrapper .center[data-v-69fff1a6]{max-height:70px;display:flex;justify-content:center;align-items:center;flex-grow:1;border:1px solid #c8c0c1;border-radius:50px}.inputWrapper input[data-v-69fff1a6]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px;width:100%;padding:.5em 1em}.notready[data-v-69fff1a6],.waitjoined[data-v-69fff1a6]{padding:.5em 0;text-align:center}.waitjoined span[data-v-69fff1a6]{font-size:.8em}.greetings[data-v-69fff1a6]{padding:.5em 0}.greetings[data-v-69fff1a6],[data-v-69fff1a6] .iconWrapper{text-align:center}.menu-item[data-v-69fff1a6]{padding:.5em;background:#fff;line-height:44px;display:flex}.menu-item .title[data-v-69fff1a6]{flex-grow:2;padding-right:44px;text-align:center}.menu-item .iconWrapper[data-v-69fff1a6]{width:44px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "1b86":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f7e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "1cdf":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "2335":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("54dc");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "2529":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .caption span[data-v-074c8f52]{color:#0035a8}#matrix-root[theme=classic] .joinAction[data-v-074c8f52]{background:#ececec}#matrix-root[theme=classic] .my-swipe[data-v-074c8f52]{color:#fff}#matrix-root[theme=classic] .slide1[data-v-074c8f52]{background-color:#0089dc;color:#fff}#matrix-root[theme=classic] .slide2[data-v-074c8f52]{background-color:#ffd705;color:#000}#matrix-root[theme=classic] .slide3[data-v-074c8f52]{background-color:#ff2d4b;color:#fff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "264e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a38b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "26dc":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7b23");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("35c60a9a", content, shadowRoot)
};

/***/ }),

/***/ "26dce":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .chatInputWrapper[data-v-9660c700]{transition:.3s}#matrix-root[theme=classic] .chatEmpty[data-v-9660c700]{color:#606369}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "27ad":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1cdf");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("492048f1", content, shadowRoot)
};

/***/ }),

/***/ "2e64":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .userinfoWrapper[data-v-037e1bd2]{background:#0b1520}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "2e77":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("27ad");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "319e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0a60");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "333c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .caption span[data-v-074c8f52]{color:#005ae0}#matrix-root[theme=white] .joinAction[data-v-074c8f52]{background:#ececec}#matrix-root[theme=white] .my-swipe[data-v-074c8f52]{color:#fff}#matrix-root[theme=white] .slide1[data-v-074c8f52]{background-color:#0089dc;color:#fff}#matrix-root[theme=white] .slide2[data-v-074c8f52]{background-color:#ffd705;color:#000}#matrix-root[theme=white] .slide3[data-v-074c8f52]{background-color:#ff2d4b;color:#fff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "37bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("68a2");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "37e7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8a69");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("14c9187d", content, shadowRoot)
};

/***/ }),

/***/ "3d46":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("cd2e");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7b2f06a2", content, shadowRoot)
};

/***/ }),

/***/ "3f5b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_475fea14_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("988d");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_475fea14_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_475fea14_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_475fea14_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_475fea14_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "418e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9de4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "42ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ddd");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "4760":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b788");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "47b1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fe3a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("1597789b", content, shadowRoot)
};

/***/ }),

/***/ "4a41":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d046");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "4cd4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b7d0");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("141c1a84", content, shadowRoot)
};

/***/ }),

/***/ "5126":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2e64");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("563e683f", content, shadowRoot)
};

/***/ }),

/***/ "540a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[data-v-11645c45] .eventMember{text-align:center}[data-v-11645c45] .eventMember span{font-size:.9em}.pswp img[data-v-11645c45]{max-width:none;-o-object-fit:contain;object-fit:contain}#chatList.minimized:not(.active) .timeLineWrapper[data-v-11645c45]{padding-left:.5em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "54dc":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d312");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7fb62360", content, shadowRoot)
};

/***/ }),

/***/ "5bb4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("976b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "5f70":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1b4c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("4a2174ee", content, shadowRoot)
};

/***/ }),

/***/ "5f7e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("bd86");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3c4a7888", content, shadowRoot)
};

/***/ }),

/***/ "5fba":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .chatInputWrapper[data-v-9660c700]{transition:.3s}#matrix-root[theme=white] .chatEmpty[data-v-9660c700]{color:#606369}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "633f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".emojionearea.form-control[data-v-c9193264],[data-v-c9193264] .emojionearea{background:transparent!important}[data-v-c9193264] .emojionearea .emojionearea-editor::-webkit-scrollbar{width:0!important}[data-v-c9193264] .emojionearea .emojionearea-button{top:50%;margin-top:-12px}.input-component[data-v-c9193264]{width:100%;display:flex;justify-content:center;align-items:center;padding:0 1em;padding-right:0}.input-component .input-wrapper[data-v-c9193264]{width:100%}.input-component .right[data-v-c9193264]{margin:0 .5em}.input-component .iconbutton .leftdummy[data-v-c9193264]{width:35px}.input-component .iconbutton .idummy[data-v-c9193264]{width:35px;height:35px;line-height:35px}.input-component .iconbutton .idummy i[data-v-c9193264]{line-height:35px!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "6543":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d3bf");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0b22ef71", content, shadowRoot)
};

/***/ }),

/***/ "663a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".previewWrapper[data-v-037e1bd2]{padding:.5em}.userinfoWrapper[data-v-037e1bd2]{width:100%;padding:1em;background:#ececec}.VueCarousel[data-v-037e1bd2]{width:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "68a2":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("c21b");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("bb9cabe6", content, shadowRoot)
};

/***/ }),

/***/ "6a82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e386");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "7027":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7b23":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .galleryRow .messageImg .img[data-v-e6d2ad12],#matrix-root[theme=white] .galleryRow .messageImg .loadingImg[data-v-e6d2ad12],#matrix-root[theme=white] .galleryRow .messageImg .loadingImg .imgPreview[data-v-e6d2ad12]{border-radius:.5em}#matrix-root[theme=white] .galleryRow .messageImg .imgMsg img[data-v-e6d2ad12]{border-radius:1em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7c32":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("825f");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("41aa9e86", content, shadowRoot)
};

/***/ }),

/***/ "7f2e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("26dc");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "825f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .galleryRow .messageImg .img[data-v-e6d2ad12],#matrix-root[theme=classic] .galleryRow .messageImg .loadingImg[data-v-e6d2ad12],#matrix-root[theme=classic] .galleryRow .messageImg .loadingImg .imgPreview[data-v-e6d2ad12]{border-radius:.5em}#matrix-root[theme=classic] .galleryRow .messageImg .imgMsg img[data-v-e6d2ad12]{border-radius:1em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "846a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".chatInputWrapper[data-v-9660c700]{position:fixed;z-index:3;bottom:0;background:#fff;left:0;right:0;transition:.3s}.chatInputWrapper.bin[data-v-9660c700]{position:absolute;left:1px;right:1px;bottom:1px;border-radius:5px}#chat.minimized .chatInputWrapper[data-v-9660c700]{opacity:0}#chat.minimized.active[data-v-9660c700]{padding-bottom:90px}#chat.minimized.active .chatInputWrapper[data-v-9660c700]{opacity:1}.encrypted[data-v-9660c700]{position:absolute;left:0;top:0;z-index:2;color:#06823a;padding:.25em .5em}.encrypted i[data-v-9660c700]{font-size:.8em}.chatEmpty[data-v-9660c700]{padding:4em;text-align:center;color:#606369}.chatEmpty span[data-v-9660c700]{font-size:.8em}.preview-wrapper[data-v-9660c700]{max-height:350px;overflow-y:auto;border:1px solid rgba(96,99,105,.3);border-radius:10px;margin:0 auto;width:98%}.preview-wrapper[data-v-9660c700]::-webkit-scrollbar{width:0!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "86fc":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "8747":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("540a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("b9f6a25c", content, shadowRoot)
};

/***/ }),

/***/ "890a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("633f");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("35837be8", content, shadowRoot)
};

/***/ }),

/***/ "8a69":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".eventWrapper[data-v-e6d2ad12]{padding:.5em 0}.fade-move[data-v-e6d2ad12]{transition:1}.fade-leave-active~.eventWrapper[data-v-e6d2ad12]{display:none}.galleryRow[data-v-e6d2ad12]{display:flex;align-items:flex-end}.galleryRow .messageImg[data-v-e6d2ad12]{max-width:50%;margin:0 10px;position:relative}.galleryRow .messageImg .img[data-v-e6d2ad12]{display:block;border-radius:.5em;position:relative;max-width:100%}.galleryRow .messageImg .loadingImg[data-v-e6d2ad12]{display:flex;align-items:center;justify-content:center;border-radius:.5em;position:relative;max-width:300px;height:250px}.galleryRow .messageImg .loadingImg .imgPreview[data-v-e6d2ad12]{border-radius:.5em;position:relative;max-width:100%;height:100%;opacity:.6}.galleryRow .messageImg .loadingImg .clipLoader[data-v-e6d2ad12]{position:absolute;z-index:9999;left:50%;right:0;top:50%;bottom:0;transform:translate(-50,50);display:flex;align-items:center;justify-content:center}.galleryRow .messageImg .imgMsg img[data-v-e6d2ad12]{max-width:100%;-o-object-fit:cover;object-fit:cover;border-radius:1em;display:block}.galleryRow .messageImg .metaLink[data-v-e6d2ad12]{background:#000}.galleryRow .messageImg .metaLink .metaMessageLink .metaTitle[data-v-e6d2ad12]{font-weight:700;font-size:.9em}.galleryRow .messageImg .metaLink .metaMessageLink .metaDescription[data-v-e6d2ad12]{margin:.5em 0;font-size:.8em}.galleryRow .messageImg .metaLink .metaMessageLink .metaImgWrapper[data-v-e6d2ad12]{display:block;max-width:300px;-o-object-fit:cover;object-fit:cover}.galleryRow .messageImg .metaLink .metaMessageLink .metaImgWrapper img[data-v-e6d2ad12]{display:block;width:100%;height:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "976b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d661");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("198eb29c", content, shadowRoot)
};

/***/ }),

/***/ "988d":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("c669");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("509c69a2", content, shadowRoot)
};

/***/ }),

/***/ "9928":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".loadingImg{max-width:100%;padding:.5em 1em}.loadingImg .imagePreview{position:relative;max-width:50%;margin:0 10px 0 auto}.loadingImg .imagePreview img{display:block;max-width:100%;-o-object-fit:cover;object-fit:cover;border-radius:1em;opacity:.4}.loadingImg .imagePreview .previewLoader{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:9999}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9bf4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2529");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5defd48e", content, shadowRoot)
};

/***/ }),

/***/ "9ddd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("26dce");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("2bfc9df2", content, shadowRoot)
};

/***/ }),

/***/ "9de4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("333c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("460c6d66", content, shadowRoot)
};

/***/ }),

/***/ "9e99":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "a256":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3d46");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "a38b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f779");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("36e95f62", content, shadowRoot)
};

/***/ }),

/***/ "ace6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ae3b");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("a79c80e0", content, shadowRoot)
};

/***/ }),

/***/ "ae3b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .inputWrapper>div[data-v-69fff1a6]{transition:.3s}#matrix-root[theme=black] .inputWrapper .center[data-v-69fff1a6]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=black] .inputWrapper input[data-v-69fff1a6]{border:1px solid rgba(121,130,132,.3);background:rgba(11,21,32,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "b5ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fa9e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2950c816_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "b788":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("baee");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3d2b1f8f", content, shadowRoot)
};

/***/ }),

/***/ "b7d0":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .userinfoWrapper[data-v-037e1bd2]{background:#ececec}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "baee":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".editButton[data-v-2950c816]{display:flex;justify-content:center;align-items:center}.editButton i[data-v-2950c816]{font-size:1.5em}.nameline[data-v-2950c816],[data-v-2950c816] .nameline{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[data-v-2950c816] .nameline{max-width:250px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bd86":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".typingBlock{position:relative}.typingBlock .typingBlockWrapper{position:absolute;left:50%;transform:translateX(-50%);top:-5px;display:flex;align-items:center}.typingBlock .typingBlockWrapper>div{padding:0 .5em}.typingBlock .typingBlockWrapper span{font-size:.7em;color:#707070;opacity:.8}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "be9a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .caption span[data-v-074c8f52]{color:#12488a}#matrix-root[theme=black] .joinAction[data-v-074c8f52]{background:#0b1520}#matrix-root[theme=black] .my-swipe[data-v-074c8f52]{color:#fff}#matrix-root[theme=black] .slide1[data-v-074c8f52]{background-color:#0089dc;color:#fff}#matrix-root[theme=black] .slide2[data-v-074c8f52]{background-color:#ffd705;color:#000}#matrix-root[theme=black] .slide3[data-v-074c8f52]{background-color:#ff2d4b;color:#fff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "c21b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .galleryRow .messageImg .img[data-v-e6d2ad12],#matrix-root[theme=black] .galleryRow .messageImg .loadingImg[data-v-e6d2ad12],#matrix-root[theme=black] .galleryRow .messageImg .loadingImg .imgPreview[data-v-e6d2ad12]{border-radius:.5em}#matrix-root[theme=black] .galleryRow .messageImg .imgMsg img[data-v-e6d2ad12]{border-radius:1em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "c415":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d569");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c495":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cabf");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c669":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-475fea14]{width:100%;top:0;z-index:999}.aboutContact[data-v-475fea14]{position:absolute;left:0;right:0;top:100px;bottom:0;z-index:999;background:#fff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "cabf":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9928");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6b61ab55", content, shadowRoot)
};

/***/ }),

/***/ "cb3f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1603");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_9660c700_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "cd2e":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "cfc5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_c9193264_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("890a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_c9193264_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_c9193264_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_c9193264_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_c9193264_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "d046":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("be9a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("76053700", content, shadowRoot)
};

/***/ }),

/***/ "d312":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .userinfoWrapper[data-v-037e1bd2]{background:#ececec}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "d3bf":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .inputWrapper>div[data-v-69fff1a6]{transition:.3s}#matrix-root[theme=classic] .inputWrapper .center[data-v-69fff1a6]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=classic] .inputWrapper input[data-v-69fff1a6]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "d569":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7027");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5b73ea62", content, shadowRoot)
};

/***/ }),

/***/ "d5e1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ace6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "d661":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".caption[data-v-074c8f52]{padding:1em;text-align:center}.caption span[data-v-074c8f52]{font-size:2em;font-weight:700;color:#0a68ad}.tip[data-v-074c8f52]{padding:1.5em;text-align:center}.tip span[data-v-074c8f52]{font-size:.8em}.joinAction[data-v-074c8f52]{position:fixed;bottom:0;left:0;right:0;background:#ececec;padding:1em 0;text-align:center;z-index:2}.joinAction.bin[data-v-074c8f52]{position:absolute}.joinAction .actions[data-v-074c8f52]{display:flex}.joinAction .actions .action[data-v-074c8f52]{padding:.5em;flex-grow:1}.joinAction .actions .action button[data-v-074c8f52]{min-width:0;width:100%}.my-swipe[data-v-074c8f52]{height:200px;color:#fff;font-size:30px;text-align:center}.slide1[data-v-074c8f52]{background-color:#0089dc;color:#fff}.slide2[data-v-074c8f52]{background-color:#ffd705;color:#000}.slide3[data-v-074c8f52]{background-color:#ff2d4b;color:#fff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e386":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("0aa1");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("10a4a066", content, shadowRoot)
};

/***/ }),

/***/ "e7df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6543");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_69fff1a6_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "ee78":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("015a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_037e1bd2_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "ee79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=template&id=475fea14&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chat"},[_c('topheader',{staticClass:"topheader",attrs:{"u":_vm.u,"chat":_vm.chat,"aboutUser":_vm.aboutShow,"roomInfo":_vm.roomInfo},on:{"closeAboutUser":_vm.closeAbout,"showAboutRoom":_vm.getClicked,"closeRoom":_vm.closingRoom}}),(!_vm.roomInfo)?_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('chat',{attrs:{"u":_vm.u,"chat":_vm.chat},on:{"sending":_vm.sending,"newchat":_vm.newchat,"getEvents":_vm.eventsRoom}})]},proxy:true}],null,false,2636658855)}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=template&id=475fea14&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/index.vue?vue&type=template&id=9660c700&scoped=true&
var chatvue_type_template_id_9660c700_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet, minimized: _vm.minimized, fix : _vm.pocketnet, active: _vm.active},attrs:{"id":"chat"}},[(_vm.m_chat && _vm.membership() === 'join')?_c('list',{attrs:{"chat":_vm.m_chat,"imagePreview":_vm.prevImage,"filePrev":_vm.anyFilePreview},on:{"openImg":_vm.openImgM,"getEvents":_vm.events}}):_vm._e(),(_vm.m_chat && _vm.membership() === 'invite')?_c('div',{staticClass:"joinwrapper"},[_c('join',{attrs:{"chat":_vm.m_chat,"usersinfo":_vm.usersinfo}})],1):_vm._e(),(!_vm.m_chat && _vm.usersinfo && _vm.usersinfo.length)?_c('div',{staticClass:"chatEmpty"},[_c('span',[_vm._v("Start chat with "+_vm._s(_vm.usersinfoNames()))])]):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(!_vm.m_chat || _vm.membership() === 'join')?_c('div',{staticClass:"chatInputWrapper fixedOnPageBottom",class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet}},[_c('div',[(_vm.urlpreview)?_c('div',{staticClass:"preview-wrapper"},[_c('url',{attrs:{"url":_vm.urlpreview,"preview":true}})],1):_vm._e(),_c('chatInput',{attrs:{"u":_vm.u,"chat":_vm.m_chat},on:{"sending":_vm.sending,"newchat":_vm.newchat,"closeMetaPreview":_vm.closing,"inputClean":_vm.hidePreview,"setMetaUrl":_vm.chatUrlHandler,"filePreview":_vm.getFilePreview,"anyFileSend":_vm.anyFileData,"emptyInput":_vm.hidePreview}})],1)]):_vm._e()]),(_vm.encrypted)?_c('div',{staticClass:"encrypted"},[_c('i',{staticClass:"fas fa-lock"})]):_vm._e()],1)}
var chatvue_type_template_id_9660c700_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/index.vue?vue&type=template&id=9660c700&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/list/index.vue?vue&type=template&id=11645c45&scoped=true&
var listvue_type_template_id_11645c45_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet, minimized: _vm.minimized, fix : _vm.pocketnet, active: _vm.active},attrs:{"id":"chatList"}},[_c('div',{ref:"work",staticClass:"work"},[_c('div',{ref:"uspbottom",staticClass:"uspbottomSpacer "}),_c('div',{ref:"direction_b",staticClass:"bottomSpacer spacer"}),_c('div',{ref:"events",staticClass:"timeLineWrapper"},[(_vm.timeline)?_c('events',{attrs:{"events":_vm.events,"filePreview":_vm.filePrev,"previewImage":_vm.imagePreview,"chat":_vm.chat},on:{"updated":_vm.eventsUpdated,"updatedSize":_vm.updatedSize,"removeEvent":_vm.removeEvent}}):_vm._e()],1),_c('div',{ref:"direction_f",staticClass:"topSpacer spacer"})])])}
var listvue_type_template_id_11645c45_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/list/index.vue?vue&type=template&id=11645c45&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/list/index.vue?vue&type=template&id=e6d2ad12&scoped=true&
var listvue_type_template_id_e6d2ad12_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"events"}},[_c('div',_vm._l((_vm.events),function(event){return (!event.localRedactionEvent() && !event.getRedactionEvent())?_c('div',{key:event.event.event_id,staticClass:"eventWrapper"},[_c('event',{attrs:{"event":event,"filePreview":_vm.filePreview,"galleryData":_vm.events,"clientWidth":_vm.clientWidth,"chat":_vm.chat},on:{"openImageEvent":function (e) { return _vm.galleryOpen(event); },"removeEvent":function (e) { return _vm.removeEvent(event); },"updatedSize":_vm.updatedSize}})],1):_vm._e()}),0),(_vm.previewImage.show !== false)?_c('div',[_c('imgPreview',{attrs:{"imagePreview":_vm.previewImage}})],1):_vm._e(),(_vm.listImgs && _vm.listImgs.length && _vm.isOpen)?_c('v-photoswipe',{attrs:{"isOpen":_vm.isOpen,"items":_vm.listImgs,"options":_vm.options},on:{"close":_vm.hidePhotoSwipe}}):_vm._e()],1)}
var listvue_type_template_id_e6d2ad12_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/events/list/index.vue?vue&type=template&id=e6d2ad12&scoped=true&

// EXTERNAL MODULE: ./src/components/events/event/index.vue + 39 modules
var events_event = __webpack_require__("6167");

// EXTERNAL MODULE: ./node_modules/v-photoswipe/dist/v-photoswipe.js
var v_photoswipe = __webpack_require__("46e4");

// EXTERNAL MODULE: ./node_modules/underscore/modules/index-all.js + 159 modules
var index_all = __webpack_require__("c46f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/previews/imgPreview/index.vue?vue&type=template&id=3c99d658&
var imgPreviewvue_type_template_id_3c99d658_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"loadingImg"},[_c('div',{staticClass:"imagePreview"},[_c('img',{staticClass:"imgPreview",attrs:{"src":_vm.imagePreview,"alt":""}}),_c('div',{staticClass:"previewLoader"},[_c('clip-loader',{staticClass:"clipLoader",attrs:{"size":'25px',"color":'#0035a8',"loading":true}})],1)])])}
var imgPreviewvue_type_template_id_3c99d658_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/events/previews/imgPreview/index.vue?vue&type=template&id=3c99d658&

// EXTERNAL MODULE: ./node_modules/vue-spinner/src/ClipLoader.vue + 4 modules
var ClipLoader = __webpack_require__("da7a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/previews/imgPreview/index.vue?vue&type=script&lang=js&
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

/* harmony default export */ var imgPreviewvue_type_script_lang_js_ = ({
  props: {
    imagePreview: {}
  },
  components: {
    clipLoader: ClipLoader["a" /* default */]
  }
});
// CONCATENATED MODULE: ./src/components/events/previews/imgPreview/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var previews_imgPreviewvue_type_script_lang_js_ = (imgPreviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/events/previews/imgPreview/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("c495")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  previews_imgPreviewvue_type_script_lang_js_,
  imgPreviewvue_type_template_id_3c99d658_render,
  imgPreviewvue_type_template_id_3c99d658_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var imgPreview = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/events/list?vue&type=script&lang=js&






/* harmony default export */ var list_vue_type_script_lang_js_ = ({
  name: 'events',
  props: {
    events: Array,
    chat: Object,
    previewImage: {
      type: Object,
      default: function _default() {
        return {
          show: false
        };
      }
    },
    filePreview: Object
  },
  components: {
    event: events_event["a" /* default */],
    'v-photoswipe': v_photoswipe["PhotoSwipe"],
    'v-photoswipe-gallery': v_photoswipe["PhotoSwipeGallery"],
    imgPreview: imgPreview
  },
  data: function data() {
    return {
      isOpen: false,
      isOpenGallery: false,
      type: '',
      clientWidth: 1000,
      options: {
        index: 0,
        arrowEl: false,
        fullscreenEl: false,
        shareEl: false
      },
      optionsGallery: {},
      imgs: [],
      listImgs: [],
      loading: false,
      wasupdated: {},
      image_list: []
    };
  },
  created: function created() {},
  watch: {//$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: function auth(state) {
      return state.auth;
    }
  }),
  updated: function updated() {
    var _this = this;

    var updated = {};

    index_all["b" /* each */](this.events, function (e) {
      if (!_this.wasupdated[e.event.event_id]) updated[e.event.event_id] = e;
    });

    this.$emit('updated', updated);

    index_all["b" /* each */](this.events, function (e) {
      _this.wasupdated[e.event.event_id] = true;
    });
  },
  methods: {
    updatedSize: function updatedSize(before) {
      this.$emit('updatedSize', before);
    },
    removeEvent: function removeEvent(event) {
      console.log('removeEvent', event);
      this.$emit('removeEvent', event);
    },
    showPhotoSwipe: function showPhotoSwipe(index) {
      this.isOpen = true;
      this.$set(this.options, 'index', index);
    },
    hidePhotoSwipe: function hidePhotoSwipe() {
      this.isOpen = false;
    },
    galleryOpen: function galleryOpen(data) {
      var _this2 = this;

      this.imgs = this.events;
      this.listImgs = [];

      index_all["b" /* each */](this.imgs, function (event) {
        if (event.event.type === 'm.room.encrypted' && event._clearEvent.content.msgtype === 'm.image') {
          _this2.listImgs.push({
            src: event._clearEvent.content.url,
            w: event._clearEvent.content.info.w,
            h: event._clearEvent.content.info.h,
            eventId: event.event.event_id
          });
        }
      });

      var imgIndex = this.listImgs.map(function (e) {
        return e.eventId;
      }).indexOf(data.event.event_id);
      this.showPhotoSwipe(imgIndex);
    },
    getClientWidth: function getClientWidth() {
      var clientWidth = this.$el.clientWidth;
      this.clientWidth = clientWidth;
    }
  },
  mounted: function mounted() {
    this.getClientWidth();
    window.addEventListener('resize', this.getClientWidth);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.getClientWidth);
  }
});
// CONCATENATED MODULE: ./src/components/events/list?vue&type=script&lang=js&
 /* harmony default export */ var events_list_vue_type_script_lang_js_ = (list_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/list/index.vue



function list_injectStyles (context) {
  
  var style0 = __webpack_require__("fd56")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("7f2e")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("37bb")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("0e42")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var list_component = Object(componentNormalizer["a" /* default */])(
  events_list_vue_type_script_lang_js_,
  listvue_type_template_id_e6d2ad12_scoped_true_render,
  listvue_type_template_id_e6d2ad12_scoped_true_staticRenderFns,
  false,
  list_injectStyles,
  "e6d2ad12",
  null
  ,true
)

/* harmony default export */ var list = (list_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/list?vue&type=script&lang=js&



/* harmony default export */ var chat_list_vue_type_script_lang_js_ = ({
  name: 'chatList',
  props: {
    chat: Object,
    to: String,
    prev: {},
    putMeta: {},
    filePrev: [Object, File],
    imagePreview: {}
  },
  components: {
    events: list
  },
  data: function data() {
    return {
      encryptedEvents: [],
      loading: false,
      scrolling: false,
      scrollingTo: 0,
      cancelNextScroll: false,
      timeline: null,
      c_uspbottomHeight: 0,
      c_frombottomscroll: 0,
      c_bottomWndOffset: 80,
      c_topWndOffset: 55,
      p_b: false,
      p_f: false,
      updateTimeout: null,
      updateInterval: null,
      events: [],
      firstPaginate: true,
      container: window
    };
  },
  mounted: function mounted() {
    if (this.bin) {
      this.container = $(this.$el).closest('.headerSpacer')[0];
      this.c_bottomWndOffset = 90;
      this.c_topWndOffset = 0;
    } else {
      this.container = window;
    }

    this.init();
  },
  watch: {//$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: function auth(state) {
      return state.auth;
    },
    eventsTypes: function eventsTypes() {
      var types = {
        'm.room.message': true,
        'm.room.encrypted': true,
        'm.room.image': true,
        'm.room.file': true,
        'm.room.member': true
      };

      if (_.toArray(this.chat && this.chat.currentState.members || {}).length > 2) {
        types['m.room.member'] = true;
        types['m.room.power_levels'] = true;
      }

      return types;
    },
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    minimized: function minimized(state) {
      return state.minimized;
    },
    active: function active(state) {
      return state.active;
    },
    bin: function bin(state) {
      return state.pocketnet;
    }
  }),
  created: function created() {
    this.container.addEventListener('wheel', this.wheel);
    this.updateInterval = setInterval(this.update, 50);
  },
  destroyed: function destroyed() {
    this.container.removeEventListener('wheel', this.wheel);

    if (this.timeline) {
      this.timeline.unpaginate(this.timeline._eventCount, true);
    }

    clearInterval(this.updateInterval);
  },
  methods: {
    removeEvent: function removeEvent(event) {//this.chat.getLiveTimeline().removeEvent(event.event.event_id)*/
    },
    wh: function wh() {
      return this.container ? this.container.clientHeight : 0;
    },
    getEvents: function getEvents() {
      var _this = this;

      var events = this.timeline.getEvents();
      this.$emit('getEvents', events);
      events = _.filter(events, function (e) {
        var type = e.event.type;
        return !_this.eventsTypes || _this.eventsTypes[type];
      });
      return events;
    },
    init: function init() {
      var _this2 = this;

      this.loading = true;
      this.firstPaginate = true;
      var timeline = this.chat.getLiveTimeline();
      var ts = timeline.getTimelineSet();
      this.timeline = new this.core.mtrx.sdk.TimelineWindow(this.core.mtrx.client, ts);
      this.uspBottomHeight();
      this.timeline.load(null, this.wh() || 600).then(function (r) {
        _this2.fixBottomScroll();

        _this2.events = _this2.getEvents();
        _this2.loading = false;
        setTimeout(function () {
          _this2.correctBottomScroll();

          _this2.autoPaginateAll();
        }, 300);
      }).catch(function (e) {
        _this2.loading = false;
      });
    },
    autoPaginate: function autoPaginate(direction) {
      if (this.needLoad(direction)) {
        this.paginate(direction);
      }
    },
    paginate: function paginate(direction, rnd) {
      var _this3 = this;

      var container = this.container;

      if (!this.loading && this.timeline && !this['p_' + direction]) {
        if (this.timeline.canPaginate(direction) || rnd) {
          this['p_' + direction] = true;
          var count = this.firstPaginate ? 25 : 12;

          if (this.firstPaginate || direction === 'f' || container.scrollTop < 700) {
            this.fixBottomScroll();
            this.timeline.paginate(direction, count).then(function (e) {
              _this3.events = _this3.getEvents();
              _this3['p_' + direction] = false;

              _this3.correctBottomScroll();
            }).catch(function (e) {
              _this3['p_' + direction] = false;
            });
          } else {
            this['p_' + direction] = false;
          }
        }
      }
    },
    autoPaginateAll: function autoPaginateAll() {
      this.autoPaginate('b');
      this.autoPaginate('f');
    },
    needLoad: function needLoad(direction) {
      var s = this.scroll();
      var p = this.eventsPosition();
      var r = false;
      var safespace = this.wh() * 3;

      if (p) {
        if (direction == 'b') {
          if (p.top + safespace >= s) {
            r = true;
          }
        } else {
          if (Math.max(p.top + p.height - safespace) <= s) r = true;
        }
      }

      return r;
    },
    //////////////
    readEvent: function readEvent(event) {
      var _this4 = this;

      var byme = this.core.mtrx.me(event.event.sender);
      if (byme) return; /// todo check user and check readed

      this.core.mtrx.isReaded(event, true).then(function (readed) {
        if (!readed) {
          _this4.core.mtrx.client.sendReadReceipt(event);
        }
      });
    },
    readFirst: function readFirst() {
      var events = this.timeline.getEvents();
      this.readEvent(events[0]);
    },
    readLast: function readLast() {
      var events = this.timeline.getEvents();
      this.readEvent(events[events.length - 1]);
    },
    readEvents: function readEvents(events) {
      var _this5 = this;

      _.each(events, function (e) {
        _this5.readEvent(e);
      });
    },
    readAll: function readAll() {
      var _this6 = this;

      var events = this.timeline.getEvents();

      _.each(events, function (e) {
        _this6.readEvent(e);
      });
    },
    //////////////
    scroll: function scroll() {
      return this.container.scrollY || this.container.scrollTop;
    },
    eventsPosition: function eventsPosition() {
      return this.relativePosition(this.$refs.events.getBoundingClientRect());
    },
    workPosition: function workPosition() {
      return this.relativePosition(this.$refs.work.getBoundingClientRect());
    },
    relativePosition: function relativePosition(position) {
      var appBorders = this.appBorders();
      var sborders = {};
      if (!position) position = this.defaultPosition();

      _.each(this.defaultPosition(), function (v, i) {
        if (i != 'height' && i != 'width') sborders[i] = position[i] - appBorders[i];else sborders[i] = position[i];
      });

      return sborders;
    },
    defaultPosition: function defaultPosition() {
      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0
      };
    },
    appBorders: function appBorders() {
      if (!this.container || !this.container.getBoundingClientRect) {
        return this.defaultPosition();
      }

      return this.container.getBoundingClientRect();
    },
    uspBottomHeight: function uspBottomHeight() {
      var p = this.eventsPosition();
      this.c_uspbottomHeight = this.wh() - (p.height || 0) - this.c_topWndOffset - this.c_bottomWndOffset;
      if (this.c_uspbottomHeight < 0) this.c_uspbottomHeight = 0;
      this.$refs['uspbottom'].style.height = this.c_uspbottomHeight + 'px';
    },
    spacerHeight: function spacerHeight(direction) {
      if (direction == 'f') return;
      var spacercpace = this.wh() * 2;
      var style = this.$refs['direction_' + direction].style;
      var spacerneed = this.timeline.canPaginate(direction);
      if (direction == 'b') spacercpace = spacercpace - this.c_uspbottomHeight;
      if (spacerneed) style.height = spacercpace + 'px';else style.height = '0px';

      if (direction == 'b') {
        this.correctBottomScroll();
      }
    },
    spacersHeight: function spacersHeight() {
      this.spacerHeight('b');
      this.spacerHeight('f');
    },
    wheel: function wheel(e) {
      if (this.scrolling) {//e.preventDefault();
      }
    },
    updatedSize: function updatedSize(before) {
      if (before) {
        console.log('fix');

        if (!this.scrolling) {
          var s = this.fixBottomScroll();
        }

        console.log("S", s);
      } else {
        console.log('correct');

        if (!this.scrolling) {
          this.spacersHeight();
          this.uspBottomHeight();
          this.fixBottomScroll();
        }
      }
    },
    eventsUpdated: function eventsUpdated(events) {
      this.readEvents(events);
      this.spacersHeight();
      this.update();
    },
    update: function update(e) {
      if (!this.scrolling) {
        this.uspBottomHeight();
        this.fixBottomScroll();
        this.autoPaginateAll();
      } else {//e.preventDefault()
      }
    },
    fixBottomScroll: function fixBottomScroll() {
      var p = this.workPosition();
      var scrollingTo = this.scrollingTo;

      if (!this.scrolling) {
        scrollingTo = this.scroll();
      }

      if (!scrollingTo) scrollingTo = 0;
      var s = p.height - scrollingTo - this.wh() + this.c_topWndOffset + this.c_bottomWndOffset;
      if (s < 0) s = 0;
      this.c_frombottomscroll = s;
      return s;
    },
    correctBottomScroll: function correctBottomScroll() {
      var p = this.workPosition();
      var s = p.height + this.c_topWndOffset + this.c_bottomWndOffset - this.wh() - this.c_frombottomscroll;
      this.scrollTo(s);
    },
    scrollTo: function scrollTo(s) {
      var _this7 = this;

      if (s < 0) s = 0;
      if (this.scrolling) cancelAnimationFrame(this.scrolling);
      this.scrollingTo = s;
      this.scrolling = requestAnimationFrame(function () {
        _this7.container.scroll({
          top: s,
          behavior: 'instant'
        });

        _this7.scrollingTo = 0;
        _this7.scrolling = null;
      });
    },
    openImgGallery: function openImgGallery(img) {
      this.$emit('openImg', img);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/list?vue&type=script&lang=js&
 /* harmony default export */ var components_chat_list_vue_type_script_lang_js_ = (chat_list_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/list/index.vue



function chat_list_injectStyles (context) {
  
  var style0 = __webpack_require__("f465")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("a256")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("c415")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("0405")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var chat_list_component = Object(componentNormalizer["a" /* default */])(
  components_chat_list_vue_type_script_lang_js_,
  listvue_type_template_id_11645c45_scoped_true_render,
  listvue_type_template_id_11645c45_scoped_true_staticRenderFns,
  false,
  chat_list_injectStyles,
  "11645c45",
  null
  ,true
)

/* harmony default export */ var chat_list = (chat_list_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/index.vue?vue&type=template&id=69fff1a6&scoped=true&
var inputvue_type_template_id_69fff1a6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatInput"}},[(_vm.ready)?_c('div',{staticClass:"work"},[(_vm.chat && _vm.joined && _vm.joined.length)?_c('div',{staticClass:"inputWrapper"},[_c('div',{staticClass:"center"},[_c('InputField',{ref:"newinput",on:{"chatMessage":_vm.sendinput,"setMetaUrl":_vm.emitUrl,"emptyInput":_vm.emitInputData,"FilledInput":_vm.HideUploadPic}}),(_vm.upload)?_c('div',{staticClass:"left"},[_c('div',{staticClass:"iconbutton"},[_c('dropdownMenu',{ref:"dropdownMenu",attrs:{"menuItems":_vm.menuItems,"rowObject":{},"icon":"fas fa-plus"},on:{"itemClicked":_vm.menuItemClickHandler},scopedSlots:_vm._u([{key:"default",fn:function(slotProps){return [(!slotProps.item.upload)?_c('div',{staticClass:"menu-item",on:{"click":function($event){return _vm.menuItemClick(slotProps.item)}}},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])]):_c('upload',{attrs:{"multiple":slotProps.item.upload.multiple,"extensions":slotProps.item.upload.extensions,"images":slotProps.item.upload.images},on:{"start":function (files) { return _vm.uploadStart(slotProps.item, files); },"uploaded":function (data) { return _vm.uploadUploaded(slotProps.item, data); },"uploadedAll":function (result) { return _vm.uploadUploadedAll(slotProps.item, result); },"error":function (error) { return _vm.uploadError(slotProps.item, error); }},scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('div',{staticClass:"menu-item"},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])])]},proxy:true},{key:"dropzone",fn:function(){return undefined},proxy:true}],null,true)})]}}],null,false,2831926823)})],1)]):_vm._e()],1)]):_vm._e(),(!_vm.chat)?_c('div',{staticClass:"greetings"},[_c('button',{staticClass:"button rounded small",on:{"click":_vm.greetings}},[_vm._v("👋 Start chat")])]):_vm._e(),(_vm.chat && (!_vm.joined || !_vm.joined.length))?_c('div',{staticClass:"waitjoined"},[_c('span',[_vm._v("Wait while users join to chat")])]):_vm._e()]):_c('div',{staticClass:"notready"},[_c('linepreloader')],1)])}
var inputvue_type_template_id_69fff1a6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/input/index.vue?vue&type=template&id=69fff1a6&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/InputField/InputField.vue?vue&type=template&id=c9193264&scoped=true&
var InputFieldvue_type_template_id_c9193264_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-component"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.ready),expression:"ready"}],staticClass:"input-wrapper"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.areaValue),expression:"areaValue"}],ref:"chatinput",staticClass:"chat-input",attrs:{"type":"text"},domProps:{"value":(_vm.areaValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.areaValue=$event.target.value}}})]),(_vm.send)?_c('div',{staticClass:"iconbutton",on:{"click":function($event){return _vm.send_text()}}},[_vm._m(0)]):_vm._e()])}
var InputFieldvue_type_template_id_c9193264_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"leftdummy"},[_c('div',{staticClass:"idummy"},[_c('i',{staticClass:"far fa-paper-plane"})])])}]


// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue?vue&type=template&id=c9193264&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/InputField/InputField.vue?vue&type=script&lang=js&


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

/* harmony default export */ var InputFieldvue_type_script_lang_js_ = ({
  name: 'InputField',
  methods: {
    send_text: function send_text() {
      var event = {};
      var chatinput = this.$refs.chatinput;
      var text = chatinput.emojioneArea.getText();
      event.textContent = text;
      this.$emit('chatMessage', event, chatinput);
      this.$emit('emptyInput');
      this.send = false;
      console.log('TEXT DELETED 77');
      chatinput.emojioneArea.setText('');
      chatinput.emojioneArea.setFocus();
    }
  },
  data: function data() {
    return {
      send: false,
      toMatch: [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i],
      isPhone: true,
      heightUp: 40,
      areaValue: '',
      ready: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.isPhone = this.toMatch.some(function (toMatchItem) {
      return navigator.userAgent.match(toMatchItem);
    });
    if (this.isPhone) $('.emojionearea-button').css('display', 'none');
    $(this.$refs.chatinput).emojioneArea({
      pickerPosition: 'top',
      search: false,
      tones: false,
      autocomplete: false,
      attributes: {
        spellcheck: true
      },
      filters: {
        smileys_people: {
          icon: "yum",
          title: "Smileys & People",
          emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down " + "wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum " + "stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses " + "cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown " + "frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth " + "no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream " + "fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking " + "shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face " + "head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader " + "robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " + "pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist " + "right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up " + "raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie " + "nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette " + "busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman " + "man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer " + "woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker " + "man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer " + "woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist " + "woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist " + "man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " + "man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing " + "man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok " + "man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging " + "man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut " + "woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying " + "men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple " + "bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire " + "mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie " + "womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat " + "tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses " + "closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
        }
      },
      events: {
        emojibtn_click: function emojibtn_click() {
          _this.send = true;

          _this.$emit('FilledInput');
        },
        onLoad: function onLoad(event) {
          _this.ready = true;
          var chatinput = _this.$refs.chatinput;
          var chatinput2 = _this.$refs.chatinput.nextSibling;

          var keyup = function keyup(event) {
            console.log('TEXT DELETED 1');
            var text = chatinput.emojioneArea.getText();

            if (text) {
              console.log('TEXT DELETED 2');
              _this.send = true;

              _this.$emit('FilledInput');
            } else {
              _this.send = false;

              _this.$emit('emptyInput');
            }

            var url = functions["a" /* default */].getUrl(text);

            if (url) {
              console.log('TEXT DELETED 3');

              if (event.keyCode !== 13 && event.keyCode !== 65 && event.keyCode !== 8 && event.keyCode !== 17) {
                console.log('EMITTRED', event.keyCode);

                _this.$emit('setMetaUrl', url);
              }
            }

            if (event.keyCode === 13 && event.shiftKey) {
              console.log('TEXT DELETED 4');
              _this.heightUp += 10;
              event.preventDefault();
            } else if (event.keyCode == 13 && text) {
              console.log('TEXT DELETED 5');
              $('.chat-input').keydown(function (e) {
                if (e.keyCode === 13 && !e.shiftKey) {
                  e.preventDefault();
                }
              });
              event.textContent = text;

              _this.$emit('chatMessage', event, chatinput);

              console.log('TEXT DELETED 6');

              _this.$refs.chatinput.emojioneArea.setText('');

              _this.$emit('emptyInput');

              _this.send = false;
            }
          };

          $('.chat-input').keydown(function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
              e.preventDefault();
            }
          });
          chatinput.addEventListener('keyup', keyup);
          chatinput2.addEventListener('keyup', keyup);
        }
      }
    });
  }
});
// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue?vue&type=script&lang=js&
 /* harmony default export */ var InputField_InputFieldvue_type_script_lang_js_ = (InputFieldvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue



function InputField_injectStyles (context) {
  
  var style0 = __webpack_require__("cfc5")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var InputField_component = Object(componentNormalizer["a" /* default */])(
  InputField_InputFieldvue_type_script_lang_js_,
  InputFieldvue_type_template_id_c9193264_scoped_true_render,
  InputFieldvue_type_template_id_c9193264_scoped_true_staticRenderFns,
  false,
  InputField_injectStyles,
  "c9193264",
  null
  ,true
)

/* harmony default export */ var InputField = (InputField_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/input?vue&type=script&lang=js&












/* harmony default export */ var input_vue_type_script_lang_js_ = ({
  name: 'chatInput',
  props: {
    chat: Object,
    u: String
  },
  components: {
    InputField: InputField
  },
  data: function data() {
    return {
      upload: true,
      info: {},
      loading: false,
      text: '',
      file: {},
      fileInfo: {},
      ready: false,
      menuItems: [{
        click: "cameraHandler",
        title: "Take photo or Video",
        icon: "fas fa-camera",
        upload: {
          multiple: true,
          extensions: ['jpg', 'jpeg', 'png'],
          images: {
            resize: {
              type: 'fit'
            }
          }
        }
      }, {
        click: "fileHandler",
        title: "Send File",
        icon: "fas fa-sticky-note",
        upload: {
          multiple: true
        }
      }],
      anyUrlMeta: String
    };
  },
  watch: {
    usersforkeys: {
      immediate: true,
      handler: function handler() {
        this.downloadKeys();
      }
    }
  },
  computed: {
    uusers: function uusers() {
      if (this.u) {
        return index_all["a" /* default */].map(this.u.split(','), function (u) {
          return u;
        });
      }

      return [];
    },
    ausers: function ausers() {
      var _this = this;

      if (this.u) {
        return index_all["a" /* default */].map(this.u.split(','), function (u) {
          return _this.core.user.matrixId(u);
        });
      }

      return [];
    },
    invited: function invited() {
      if (!this.chat) {
        if (this.u) return this.ausers;
        return [];
      }

      return index_all["a" /* default */].map(index_all["a" /* default */].filter(this.chat.currentState.members, function (m, v) {
        return m.membership == 'invite';
      }), function (u) {
        return u.userId;
      });
    },
    joined: function joined() {
      if (!this.chat) return [];
      return index_all["a" /* default */].map(index_all["a" /* default */].filter(this.chat.currentState.members, function (m, v) {
        return m.membership == 'join';
      }), function (u) {
        return u.userId;
      });
    },
    usersforkeys: function usersforkeys() {
      return this.invited.concat(this.joined);
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var _this2 = this;

    this.downloadKeys().then(function (r) {
      _this2.ready = true;
    });
  },
  methods: {
    wait: function wait() {
      var _this3 = this;

      return this.$f.pretry(function () {
        return _this3.core.mtrx.client && _this3.core.mtrx.access && _this3.usersforkeys.length;
      });
    },
    downloadKeys: function downloadKeys() {
      var _this4 = this;

      return this.wait().then(function (r) {
        return _this4.core.mtrx.client.downloadKeysForUsers(_this4.usersforkeys, {
          token: _this4.core.mtrx.access.accessToken
        });
      });
    },
    emitInputData: function emitInputData() {
      this.$emit('emptyInput');
      this.upload = true;
    },
    HideUploadPic: function HideUploadPic() {
      this.upload = false;
    },
    emitUrl: function emitUrl(url) {
      this.$emit('setMetaUrl', url);
    },
    newchat: function newchat() {
      var _this5 = this;

      if (this.u) {
        this.$store.state.globalpreloader = true;
        var matrixId = null;
        this.core.user.usersInfo(this.uusers).then(function (info) {
          var id = _this5.core.mtrx.kit.tetatetid(info[0], _this5.core.user.userinfo);

          matrixId = _this5.core.user.matrixId(info[0].id);
          var initialstate = [{
            "type": "m.room.custom",
            "state_key": "",
            "content": {
              "type": "tetatet"
            }
          }, {
            "type": "m.room.encryption",
            "state_key": "",
            "content": {
              "algorithm": "m.megolm.v1.aes-sha2"
            }
          }];
          return _this5.core.mtrx.client.createRoom({
            room_alias_name: id,
            visibility: 'private',
            invite: [matrixId],
            name: '#' + id,
            initial_state: initialstate
            /*[
              {
                "type": "m.room.guest_access",
                "state_key": "",
                "content": {
                  "guest_access": "can_join"
                }
              },
              
            ]*/

          });
        }).then(function (chat) {
          _this5.$store.state.globalpreloader = false;
          /*this.$store.commit('icon', {
            icon : 'success',
            message : "Chat started"
          })*/

          console.log("CHAT", chat);

          _this5.$emit("newchat", chat);

          return _this5.core.mtrx.client.setPowerLevel(chat.room_id, matrixId, 100);
        }).catch(function (e) {
          console.log("E", e);
          _this5.$store.state.globalpreloader = false; ////catch error

          /*this.$store.commit('icon', {
            icon : 'error',
            message : "Can't start chat"
          })*/
        });
      }
    },
    maySendMessage: function maySendMessage() {
      return this.chat && this.chat.maySendMessage();
    },
    greetings: function greetings() {
      this.send('👋').then(function (r) {
        return Promise.resolve(r);
      });
    },
    sendinput: function sendinput(text, chatinput) {
      this.send(text.textContent).then(function (r) {
        return Promise.resolve(r);
      });
    },
    send: function send(text, chatinput) {
      var _this6 = this;

      console.log('text', text);
      console.log('chatinput', chatinput);
      var whichMsg = functions["a" /* default */].getUrl(text);
      var t = text;

      if (!this.chat) {
        this.newchat();
      }

      this.$emit("sending");
      /*return this.core.mtrx.client.setRoomEncryption(this.chat.roomId, {
        algorithm : 'm.olm.v1.curve25519-aes-sha2'
      })*/

      return this.$f.pretry(function () {
        return _this6.chat;
      }).then(function () {
        return _this6.core.mtrx.client.sendEvent(_this6.chat.roomId, "m.room.message", {
          body: t,
          msgtype: "m.text"
        }, "").then(function (r) {
          console.log(r);
        }).catch(function (e) {
          console.log(e);
        });
      });
      /*} else {
        // let url = this.anyUrlMeta
        let url = whichMsg
        let ts = 0
        let txt = text
        this.anyUrlMeta = ''
          this.$emit('inputClean', false)
        this.$emit("sending")
          return this.$f.pretry(() => {
          return this.chat
          }).then(() => {
          return this.core.mtrx.client.getUrlPreview(url, ts).then(response => {
                 return response
            })
        }).then((result) => {
            result.msg = f.getTxt(txt)
          result.url = f.getUrl(txt)
          
          return JSON.stringify(result)
          }).then(r => {
            return this.core.mtrx.client.sendMessage(this.chat.roomId, {
            body: r,
            msgtype: 'm.metaLink'
          })
          }).catch(e => {
          console.log(e)
            //return Promise.reject(e)
        })
      }*/
    },
    sendImage: function sendImage(data) {
      var _this7 = this;

      this.$emit("sending");
      this.$f.pretry(function () {
        return _this7.chat;
      }).then(function () {
        return _this7.core.mtrx.uploadContent(data.file);
      }).then(function (image) {
        _this7.core.mtrx.client.sendImageMessage(_this7.chat.roomId, image, _this7.info, 'Image');

        _this7.$emit('previewImg', {});
      }).catch(function (e) {
        console.log(e);
      });
    },
    sendFile: function sendFile(data) {
      var _this8 = this;

      this.file = data.file;
      this.$emit("sending");
      this.$f.pretry(function () {
        return _this8.chat;
      }).then(function () {
        return _this8.core.mtrx.client.uploadContent(_this8.file);
      }).then(function (src) {
        return Promise.resolve(_this8.core.mtrx.client.mxcUrlToHttp(src));
      }).then(function (url) {
        _this8.fileInfo.url = url;
        _this8.fileInfo.name = _this8.file.name;
        _this8.fileInfo.size = _this8.file.size;
        var body = JSON.stringify(_this8.fileInfo);

        _this8.core.mtrx.client.sendMessage(_this8.chat.roomId, {
          body: body,
          msgtype: 'm.file'
        });

        _this8.$emit('anyFileSend', {});

        _this8.file = {};
      }).catch(function (e) {
        console.log(e);
      });
    },
    focus: function focus() {},
    blur: function blur() {},
    change: function change() {},
    keyup: function keyup(evt) {
      var value = evt.target.value;

      if (value === '') {
        this.$emit('inputClean', false);
        return;
      } else {
        this.$emit('inputClean', true);
      }

      this.text = value;
      this.anyUrlMeta = functions["a" /* default */].getUrl(this.text);
      console.log('this.anyUrlMeta', this.anyUrlMeta);

      if (this.anyUrlMeta !== undefined) {
        this.$emit('setMetaUrl', this.anyUrlMeta);
      } else {
        this.$emit('inputClean', false);
      }

      if (this.chat) this.core.mtrx.client.sendTyping(this.chat.roomId, true, 100);
    },
    menuItemClickHandler: function menuItemClickHandler(item, rowObject) {
      debugger;
      this[item.click](rowObject);
      console.log(item, "item item");
    },
    menuItemLoadedHandler: function menuItemLoadedHandler(value) {
      this.menuIsVisible = value;
      return this.menuIsVisible;
    },
    uploadStart: function uploadStart(item, files) {
      console.log("uploadStartuploadStartuploadStartuploadStartuploadStartuploadStartuploadStart");
    },
    uploadError: function uploadError(item, error) {
      this.$store.commit('icon', {
        icon: 'error',
        message: error.text
      });
    },
    getImg: function getImg() {
      return this.imgs = true;
    },
    uploadSizeError: function uploadSizeError(value) {
      if (!value) {
        this.$refs.dropdownMenu.hidePopup();
        console.log("error file size");
      }
    },
    uploadUploaded: function uploadUploaded(item, data) {
      var _this9 = this;

      console.log("ASDASD");
      var validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      if (!validImageTypes.includes(data.file.type)) {
        this.$emit('anyFileSend', data);
        this.sendFile(data);
      } else {
        this.$emit('previewImg', data);
        this.imageWH(data).then(function (info) {
          _this9.sendImage(data);
        });
      }
    },
    imageWH: function imageWH(file) {
      var _this10 = this;

      var img = new Image();
      var imgInfo = {};
      return new Promise(function (resolve, reject) {
        img.onload = function () {
          imgInfo.w = this.width;
          imgInfo.h = this.height;
          resolve(imgInfo);
        };

        img.onerror = function () {
          reject();
        };

        img.src = file.base64;
        _this10.info = imgInfo;
      });
    },
    uploadUploadedAll: function uploadUploadedAll(item, result) {
      this.$store.state.loading = false;
      this.$refs.dropdownMenu.hidePopup();
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/input?vue&type=script&lang=js&
 /* harmony default export */ var chat_input_vue_type_script_lang_js_ = (input_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/input/index.vue



function input_injectStyles (context) {
  
  var style0 = __webpack_require__("1ac7")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("264e")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("d5e1")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("e7df")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var input_component = Object(componentNormalizer["a" /* default */])(
  chat_input_vue_type_script_lang_js_,
  inputvue_type_template_id_69fff1a6_scoped_true_render,
  inputvue_type_template_id_69fff1a6_scoped_true_staticRenderFns,
  false,
  input_injectStyles,
  "69fff1a6",
  null
  ,true
)

/* harmony default export */ var input = (input_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/join/index.vue?vue&type=template&id=074c8f52&scoped=true&
var joinvue_type_template_id_074c8f52_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatJoin"}},[_vm._m(0),_c('chatPreview',{attrs:{"usersinfo":_vm.usersinfo,"members":_vm.joinedMembers,"users":_vm.users}}),_vm._m(1),_c('div',{staticClass:"joinAction fixedOnPageBottom",class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet}},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"actions"},[_c('div',{staticClass:"action"},[_c('button',{staticClass:"small button black rounded",on:{"click":_vm.decline}},[_vm._v("Decline")])]),_c('div',{staticClass:"action"},[_c('button',{staticClass:"small button rounded",on:{"click":_vm.join}},[_vm._v("Join")])])])])])],1)}
var joinvue_type_template_id_074c8f52_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"work"},[_c('div',{staticClass:"caption"},[_c('span',[_vm._v(" You were invited to chat with: ")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tip"},[_c('span',[_vm._v("You can join in chat or decline invitation")])])}]


// CONCATENATED MODULE: ./src/components/chat/join/index.vue?vue&type=template&id=074c8f52&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/preview/index.vue?vue&type=template&id=037e1bd2&scoped=true&
var previewvue_type_template_id_037e1bd2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chatPreview"},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"previewWrapper"},[_c('div',{staticClass:"users"},[_c('swiper',{staticClass:"swiper",attrs:{"options":_vm.swiperOption}},[_vm._l((_vm.members),function(user){return _c('swiper-slide',{key:user.id},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"userinfoWrapper"},[_c('userView',{attrs:{"userinfo":user}})],1)])])}),_c('div',{staticClass:"swiper-pagination",attrs:{"slot":"pagination"},slot:"pagination"})],2)],1)])])])}
var previewvue_type_template_id_037e1bd2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/preview/index.vue?vue&type=template&id=037e1bd2&scoped=true&

// EXTERNAL MODULE: ./src/components/chats/assets/name.vue + 4 modules
var assets_name = __webpack_require__("aa20");

// EXTERNAL MODULE: ./src/components/chats/assets/icon.vue + 4 modules
var icon = __webpack_require__("3094");

// EXTERNAL MODULE: ./src/components/user/view/pnuser/index.vue + 4 modules
var pnuser = __webpack_require__("42cd");

// EXTERNAL MODULE: ./node_modules/vue-awesome-swiper/dist/vue-awesome-swiper.js
var vue_awesome_swiper = __webpack_require__("7212");

// EXTERNAL MODULE: ./node_modules/swiper/swiper-bundle.css
var swiper_bundle = __webpack_require__("bbe3");

// EXTERNAL MODULE: ./node_modules/vue-carousel/dist/vue-carousel.min.js
var vue_carousel_min = __webpack_require__("0a63");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/preview?vue&type=script&lang=js&








 //

 //

/* harmony default export */ var preview_vue_type_script_lang_js_ = ({
  name: 'chatPreview',
  props: {
    chat: Object,
    usersinfo: Array,
    users: {},
    members: Array
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
  data: function data() {
    return {
      loading: false,
      usersinfoLocal: [],
      swiperOption: {
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    };
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: function auth(state) {
      return state.auth;
    }
  }),
  mounted: function mounted() {
    this.setUsersInfo();
  },
  methods: {
    setUsersInfo: function setUsersInfo() {
      var _this = this;

      if (this.chat) {
        var _this$chat;

        var members = _.filter(_.map(_.filter(((_this$chat = this.chat) === null || _this$chat === void 0 ? void 0 : _this$chat.currentState.members) || {}, function (m) {
          var _this$core$user$useri;

          return _this.$f.getmatrixid(m.name) !== ((_this$core$user$useri = _this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id);
        }), function (m) {
          return _this.$f.deep(_this, '$store.state.users.' + _this.$f.getmatrixid(m.name)) || null;
        }), function (m) {
          return m;
        });

        this.usersinfoLocal = members;
      } else {
        this.usersinfoLocal = this.usersinfo;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/preview?vue&type=script&lang=js&
 /* harmony default export */ var chat_preview_vue_type_script_lang_js_ = (preview_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/preview/index.vue



function preview_injectStyles (context) {
  
  var style0 = __webpack_require__("ee78")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("1083")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("11e5")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("2335")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var preview_component = Object(componentNormalizer["a" /* default */])(
  chat_preview_vue_type_script_lang_js_,
  previewvue_type_template_id_037e1bd2_scoped_true_render,
  previewvue_type_template_id_037e1bd2_scoped_true_staticRenderFns,
  false,
  preview_injectStyles,
  "037e1bd2",
  null
  ,true
)

/* harmony default export */ var preview = (preview_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/join?vue&type=script&lang=js&








/* harmony default export */ var join_vue_type_script_lang_js_ = ({
  name: 'chatJoin',
  props: {
    chat: Object,
    usersinfo: Array
  },
  components: {
    chatPreview: preview,
    Swiper: vue_awesome_swiper["Swiper"],
    SwiperSlide: vue_awesome_swiper["SwiperSlide"]
  },
  data: function data() {
    return {
      loading: false,
      joinedMembers: []
    };
  },
  created: function created() {},
  watch: {//$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: function auth(state) {
      return state.auth;
    },
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    users: function users() {
      var _this = this;

      var pStateUsers = this.$store.state.users;
      var roomMembers = this.chat.currentState.members;
      var pUsers = [];
      var members = [];

      index_all["a" /* default */].mapObject(roomMembers, function (val, key) {
        pUsers.push({
          id: functions["a" /* default */].getmatrixid(key)
        });
      });

      index_all["a" /* default */].map(pStateUsers, function (id) {
        members.push(id);
      });

      this.joinedMembers = functions["a" /* default */].filterByUserId(pUsers, members);

      var users = index_all["a" /* default */].filter(index_all["a" /* default */].map(this.chat.currentState.members || [], function (m) {
        return _this.$f.deep(_this, '$store.state.users.' + m.name) || null;
      }), function (m) {
        var _this$core$user$useri;

        return m && m.id !== ((_this$core$user$useri = _this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id);
      });

      return users;
    }
  }),
  mounted: function mounted() {},
  methods: {
    encrypt: function encrypt(algorithm) {
      return this.core.mtrx.client.setRoomEncryption(this.chat.roomId, {
        algorithm: algorithm
      });
    },
    join: function join() {
      var _this2 = this;

      this.core.mtrx.client.joinRoom(this.chat.roomId).then(function () {
        var need = _this2.needEncryption();

        if (need) {
          var algorithm = "m.olm.v1.curve25519-aes-sha2";

          _this2.encrypt(algorithm).then(function (r) {
            _this2.$emit('joined');
          });

          return;
        }

        _this2.$emit('joined');
      });
    },
    decline: function decline() {
      this.core.mtrx.client.leave(this.chat.roomId);
      this.$router.go(-1);
    },
    needEncryption: function needEncryption() {
      var encrypted = this.core.mtrx.client.isRoomEncrypted(this.chat.roomId);
      if (encrypted) return false;
      return index_all["a" /* default */].toArray(this.chat.currentState.members).length == 2;
      var room = this.core.mtrx.client.getRoom(this.chat.roomId);
      if (!room) return false;

      var ev = this.core.mtrx.client._roomList.isRoomEncrypted(this.chat.roomId);

      if (ev) return false;
      return this.core.mtrx.customRoomType(this.chat.roomId) == 'tetatet';
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/join?vue&type=script&lang=js&
 /* harmony default export */ var chat_join_vue_type_script_lang_js_ = (join_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/join/index.vue



function join_injectStyles (context) {
  
  var style0 = __webpack_require__("5bb4")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("99f3")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("734c")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("418e")
if (style3.__inject__) style3.__inject__(context)
var style4 = __webpack_require__("4a41")
if (style4.__inject__) style4.__inject__(context)
var style5 = __webpack_require__("f9ce")
if (style5.__inject__) style5.__inject__(context)

}

/* normalize component */

var join_component = Object(componentNormalizer["a" /* default */])(
  chat_join_vue_type_script_lang_js_,
  joinvue_type_template_id_074c8f52_scoped_true_render,
  joinvue_type_template_id_074c8f52_scoped_true_staticRenderFns,
  false,
  join_injectStyles,
  "074c8f52",
  null
  ,true
)

/* harmony default export */ var join = (join_component.exports);
// EXTERNAL MODULE: ./src/components/events/event/url/index.vue + 14 modules
var event_url = __webpack_require__("6603");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat?vue&type=script&lang=js&









/* harmony default export */ var chat_vue_type_script_lang_js_ = ({
  name: 'chat',
  props: {
    chat: Object,
    u: String
  },
  components: {
    list: chat_list,
    chatInput: input,
    join: join,
    url: event_url["a" /* default */]
  },
  data: function data() {
    return {
      loading: false,
      usersinfo: [],
      prevImage: undefined,
      selectedImg: String,
      urlpreview: null,
      filePreview: {
        type: Object,
        default: function _default() {
          return {
            show: false
          };
        }
      },
      anyFilePreview: {
        type: Object,
        default: function _default() {
          return {
            show: false
          };
        }
      }
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.getuserinfo();
    this.$store.commit('active', true);
    this.$store.commit('blockactive', {
      value: true,
      item: 'chat'
    });
  },
  destroyed: function destroyed() {
    this.$store.commit('blockactive', {
      value: false,
      item: 'chat'
    });
    this.$store.commit('SET_CURRENT_ROOM', false);
  },
  watch: {
    chat: {
      immediate: true,
      handler: function handler() {
        if (this.chat) this.$store.commit('SET_CURRENT_ROOM', this.chat.roomId);else this.$store.commit('SET_CURRENT_ROOM', false);
      }
    }
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    minimized: function minimized(state) {
      return state.minimized;
    },
    active: function active(state) {
      return state.active;
    },
    auth: function auth(state) {
      return state.auth;
    },
    m_chat: function m_chat() {
      if (this.chat && this.chat.roomId) {
        var m_chat = this.core.mtrx.client.getRoom(this.chat.roomId);
        return m_chat || {};
      }
    },
    encrypted: function encrypted() {
      if (this.chat && this.chat.roomId) {
        return this.core.mtrx.client.isRoomEncrypted(this.chat.roomId);
      }

      return false;
    }
  }),
  methods: {
    hidePreview: function hidePreview() {
      this.urlpreview = null;
    },
    newchat: function newchat(chat) {
      this.$emit("newchat", chat);
    },
    sending: function sending() {
      this.$emit('sending');
    },
    getuserinfo: function getuserinfo() {
      var _this = this;

      if (this.u) {
        this.core.user.usersInfo(this.u).then(function (info) {
          _this.usersinfo = info;
        });
      }
    },
    membership: function membership() {
      if (this.m_chat) {
        return this.m_chat.getMyMembership();
      }
    },
    closing: function closing(e) {
      this.PNmetaPreview = e;
    },
    usersinfoNames: function usersinfoNames() {
      return index_all["a" /* default */].map(this.usersinfo, function (u) {
        return u.name;
      }).join(', ');
    },
    openImgM: function openImgM(img) {
      this.selectedImg = img;
    },
    getFilePreview: function getFilePreview(data) {
      this.filePreview = data;
    },
    anyFileData: function anyFileData(data) {
      this.anyFilePreview.name = data.file.name;
      this.anyFilePreview.size = data.file.size;
    },
    chatUrlHandler: function chatUrlHandler(url) {
      this.urlpreview = url;
    },
    events: function events(data) {
      this.$emit('getEvents', data);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat?vue&type=script&lang=js&
 /* harmony default export */ var components_chat_vue_type_script_lang_js_ = (chat_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/index.vue



function chat_injectStyles (context) {
  
  var style0 = __webpack_require__("319e")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("cb3f")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("6a82")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("42ed")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  components_chat_vue_type_script_lang_js_,
  chatvue_type_template_id_9660c700_scoped_true_render,
  chatvue_type_template_id_9660c700_scoped_true_staticRenderFns,
  false,
  chat_injectStyles,
  "9660c700",
  null
  ,true
)

/* harmony default export */ var chat = (chat_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"99add714-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/topheader/index.vue?vue&type=template&id=2950c816&scoped=true&
var topheadervue_type_template_id_2950c816_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatTopheader"}},[(_vm.chat || _vm.u)?_c('topheader',{scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"back"}})]},proxy:true},{key:"info",fn:function(){return [(_vm.chat)?_c('router-link',{attrs:{"to":'chatInfo?id=' + _vm.chat.roomId}},[(_vm.m_chat)?_c('div',[(!_vm.roomInfo)?_c('chatName',{attrs:{"preview":true,"chat":_vm.m_chat}}):_vm._e(),(_vm.roomInfo && !_vm.aboutUser)?_c('span',[_vm._v("Info")]):_vm._e(),(_vm.aboutUser)?_c('span',[_vm._v("User Info")]):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(_vm.m_chat_typing)?_c('chatTyping'):_vm._e()],1)],1):_vm._e(),(!_vm.m_chat && _vm.userinfo)?_c('div',[_c('span',{staticClass:"nameline"},[_vm._v(_vm._s(_vm.userinfo.name))])]):_vm._e()]):_vm._e()]},proxy:true},{key:"right",fn:function(){return [(_vm.m_chat && _vm.roomInfo === false)?_c('div',{staticClass:"iconbutton",on:{"click":function($event){return _vm.aboutRoomOpen(_vm.m_chat)}}},[_c('i',{staticClass:"fas fa-ellipsis-h"})]):_vm._e(),(_vm.roomInfo && !_vm.aboutUser)?_c('div',{staticClass:"editButton"}):_vm._e()]},proxy:true}],null,false,2053622688)}):_vm._e()],1)}
var topheadervue_type_template_id_2950c816_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue?vue&type=template&id=2950c816&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./src/components/chats/assets/typing.vue + 4 modules
var typing = __webpack_require__("0826");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/topheader?vue&type=script&lang=js&





/* harmony default export */ var topheader_vue_type_script_lang_js_ = ({
  name: 'chatTopheader',
  props: {
    chat: Object,
    u: String,
    roomInfo: false,
    aboutUser: false
  },
  components: {
    chatName: assets_name["a" /* default */],
    chatIcon: icon["a" /* default */],
    chatTyping: typing["a" /* default */]
  },
  data: function data() {
    return {
      menuItems: [{
        click: "callupVideoHandler",
        title: "Video Call",
        icon: "fas fa-camera"
      }, {
        click: "callupHandler",
        title: "Call",
        icon: "fas fa-phone"
      }],
      loading: false,
      typing: false,
      userinfo: null,
      aboutUserShow: false
    };
  },
  watch: {//$route: 'getdata'
  },
  mounted: function mounted() {
    this.getuserinfo();
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: function auth(state) {
      return state.auth;
    },
    m_chat: function m_chat() {
      if (this.chat && this.chat.roomId) {
        var m_chat = this.core.mtrx.client.getRoom(this.chat.roomId);
        return m_chat || {};
      }
    },
    m_chat_typing: function m_chat_typing() {
      var _this = this;

      if (!this.chat) return false;
      var chat = this.chat.roomId;
      var typing = this.$store.state.typing[chat] || {};

      var userTyping = _.find(typing, function (t, i) {
        if (t) {
          var _this$core$user$useri;

          if (i == ((_this$core$user$useri = _this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id)) return false;
          return true;
        }
      });

      return userTyping || false;
    }
  }),
  methods: {
    getuserinfo: function getuserinfo() {
      var _this2 = this;

      if (this.u) {
        this.core.user.usersInfo(this.u).then(function (info) {
          _this2.userinfo = info[0];
        });
      }
    },
    menuItemClickHandler: function menuItemClickHandler(item, rowObject) {
      this[item.click](rowObject);
    },
    callupHandler: function callupHandler(rowObject) {},
    callupVideoHandler: function callupVideoHandler(rowObject) {}
  }
});
// CONCATENATED MODULE: ./src/components/chat/topheader?vue&type=script&lang=js&
 /* harmony default export */ var chat_topheader_vue_type_script_lang_js_ = (topheader_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue



function topheader_injectStyles (context) {
  
  var style0 = __webpack_require__("4760")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("14a9")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("2e77")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("b5ce")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var topheader_component = Object(componentNormalizer["a" /* default */])(
  chat_topheader_vue_type_script_lang_js_,
  topheadervue_type_template_id_2950c816_scoped_true_render,
  topheadervue_type_template_id_2950c816_scoped_true_staticRenderFns,
  false,
  topheader_injectStyles,
  "2950c816",
  null
  ,true
)

/* harmony default export */ var topheader = (topheader_component.exports);
// EXTERNAL MODULE: ./src/components/contact/index.vue + 14 modules
var contact = __webpack_require__("d3ff");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=script&lang=js&

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




/* harmony default export */ var chatvue_type_script_lang_js_ = ({
  name: 'pagechat',
  components: {
    contact: contact["a" /* default */],
    chat: chat,
    topheader: topheader
  },
  data: function data() {
    return {
      roomInfo: false,
      m_chat: {},
      events: [],
      aboutShow: false,
      aboutClose: false,
      aboutUserInfo: {}
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    u: function u() {
      return this.$route.query.u;
    },
    chat: function chat() {
      var id = this.$route.query.id;
      return this.$store.state.chatsMap[id];
    }
  }, Object(vuex_esm["c" /* mapState */])({
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    minimized: function minimized(state) {
      return state.minimized;
    }
  })),
  mounted: function mounted() {},
  methods: {
    aboutUser: function aboutUser(user) {
      this.aboutUserInfo = user;
      this.aboutShow = true;
    },
    newchat: function newchat(_chat) {},
    getClicked: function getClicked(room) {
      this.roomInfo = true;
      this.m_chat = room;
    },
    sending: function sending() {
      console.log("SENDING");
    },
    closingRoom: function closingRoom(val) {
      this.roomInfo = val;
    },
    eventsRoom: function eventsRoom(data) {
      this.events = data;
    },
    closeAbout: function closeAbout(value) {
      this.aboutShow = value;
    },
    roomInfoClose: function roomInfoClose(value) {
      this.roomInfo = value;
    }
  }
});
// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_chatvue_type_script_lang_js_ = (chatvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/chat.vue



function views_chat_injectStyles (context) {
  
  var style0 = __webpack_require__("3f5b")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var views_chat_component = Object(componentNormalizer["a" /* default */])(
  views_chatvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  views_chat_injectStyles,
  "475fea14",
  null
  ,true
)

/* harmony default export */ var views_chat = __webpack_exports__["default"] = (views_chat_component.exports);

/***/ }),

/***/ "f465":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8747");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f779":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .inputWrapper>div[data-v-69fff1a6]{transition:.3s}#matrix-root[theme=white] .inputWrapper .center[data-v-69fff1a6]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=white] .inputWrapper input[data-v-69fff1a6]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "f9ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9bf4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "fa9e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("86fc");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5dc44adc", content, shadowRoot)
};

/***/ }),

/***/ "fd56":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37e7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "fe3a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=matrix-element.4.js.map