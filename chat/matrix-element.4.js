(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[4],{

/***/ "0242":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("699a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("18349eb4", content, shadowRoot)
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=template&id=35857e68&
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

/***/ "0bf1":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
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

/***/ "142f":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("333f");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("9c7fd778", content, shadowRoot)
};

/***/ }),

/***/ "1767":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7113");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7fe14a47", content, shadowRoot)
};

/***/ }),

/***/ "1b86":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f7e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_typing_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "1eed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e331");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "20fe":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".input-component[data-v-65ed421a]{padding:0 1em;padding-right:0}.input-component[data-v-65ed421a],.input-component .input-wrapper[data-v-65ed421a]{width:100%;display:flex;justify-content:center;align-items:center}.input-component .input-wrapper[data-v-65ed421a]{position:relative}.input-component .right[data-v-65ed421a]{margin:0 .5em}.input-component .iconbutton .leftdummy[data-v-65ed421a]{width:20px}.input-component .iconbutton .rightdummy[data-v-65ed421a]{width:35px}.input-component .iconbutton .idummy[data-v-65ed421a]{width:100%;height:35px;line-height:35px}.input-component .iconbutton .idummy i[data-v-65ed421a]{line-height:35px!important}.chat-input[data-v-65ed421a]{width:100%;max-height:63px;overflow-y:auto;resize:none}.chat-input[data-v-65ed421a]::-webkit-scrollbar{width:0!important}.fade-enter-active[data-v-65ed421a],.fade-leave-active[data-v-65ed421a]{transition:all .2s ease-in}.fade-enter[data-v-65ed421a],.fade-leave-to[data-v-65ed421a]{opacity:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "21ff":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7d04");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("9f8cbcf2", content, shadowRoot)
};

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

/***/ "2646":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8a3c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "28a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1767");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "2a24":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .inputWrapper>div[data-v-0ecf8a13]{transition:.3s}#matrix-root[theme=black] .inputWrapper .center[data-v-0ecf8a13]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=black] .inputWrapper input[data-v-0ecf8a13]{border:1px solid rgba(121,130,132,.3);background:rgba(11,21,32,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


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

/***/ "333f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".nameWrapper[data-v-373e6a3c]{display:flex;align-items:center;justify-content:center}.roomMuted[data-v-373e6a3c]{margin-left:3px}.roomMuted i[data-v-373e6a3c]{font-size:.7em}.editButton[data-v-373e6a3c]{display:flex;justify-content:center;align-items:center}.editButton i[data-v-373e6a3c]{font-size:1.5em}.nameline[data-v-373e6a3c]{max-width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#topheader.minimized.fix[data-v-373e6a3c]{background:transparent;overflow:inherit}#topheader .rightIcons .iconbutton[data-v-373e6a3c]{display:flex;justify-content:center;align-items:center}.donationModalBody[data-v-373e6a3c]{padding:1em;display:flex;flex-direction:column}.donationModalBody span[data-v-373e6a3c]{color:#12488a}.donationModalBody input[data-v-373e6a3c],.donationModalBody select[data-v-373e6a3c]{margin-top:.5em;margin-bottom:1.5em;border:1px solid #12488a;border-radius:3px;padding:.5em}.donationModalBody input.disabled[data-v-373e6a3c],.donationModalBody select.disabled[data-v-373e6a3c]{color:rgba(176,191,198,.8);border:1px solid rgba(176,191,198,.5)}.donationModalBody button[data-v-373e6a3c]{margin-top:1em}.donationModalBody button i[data-v-373e6a3c]{margin-right:.2em}.donationModalBody .totalAmount[data-v-373e6a3c]{font-weight:700;margin-left:.5em;margin-top:.5em;margin-bottom:1em}.donationModalBody .error[data-v-373e6a3c]{color:#ff0c39;text-align:center}.donationModalBody .linepreloader[data-v-373e6a3c]{text-align:center;height:29px;margin-top:1em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "3449":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-4e29656b]{width:100%;top:0;z-index:999}.aboutContact[data-v-4e29656b]{position:absolute;left:0;right:0;top:100px;bottom:0;z-index:999;background:#fff}", ""]);
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

/***/ "38d3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3449");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("387c81f2", content, shadowRoot)
};

/***/ }),

/***/ "3901":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("940c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "395c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .userinfoWrapper[data-v-2eb31a16]{background:#0b1520}", ""]);
// Exports
module.exports = exports;


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

/***/ "3eda":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0242");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "418e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9de4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_3_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "46c5":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("0bf1");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6e6c3625", content, shadowRoot)
};

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

/***/ "47f9":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2a24");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("22a88620", content, shadowRoot)
};

/***/ }),

/***/ "4962":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "4a41":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d046");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_4_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "4a47":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .userinfoWrapper[data-v-2eb31a16]{background:#ececec}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "53eb":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("395c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("10861708", content, shadowRoot)
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

/***/ "5bb4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("976b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "5bcb":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .inputWrapper>div[data-v-0ecf8a13]{transition:.3s}#matrix-root[theme=white] .inputWrapper .center[data-v-0ecf8a13]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=white] .inputWrapper input[data-v-0ecf8a13]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


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

/***/ "630e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4a47");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7265782e", content, shadowRoot)
};

/***/ }),

/***/ "66f9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("47f9");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "699a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".previewWrapper[data-v-2eb31a16]{padding:.5em}.userinfoWrapper[data-v-2eb31a16]{width:100%;padding:1em;background:#ececec}.VueCarousel[data-v-2eb31a16]{width:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "6aea":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8186");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("50899951", content, shadowRoot)
};

/***/ }),

/***/ "6c3f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("630e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "6f09":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc74");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "7113":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7117":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatInput[data-v-0ecf8a13]{padding-bottom:.5em;padding-top:.5em}.inputWrapper[data-v-0ecf8a13]{display:flex}.inputWrapper .left[data-v-0ecf8a13]{width:35px;text-align:center}.inputWrapper .left .iconbutton[data-v-0ecf8a13]{width:35px}.inputWrapper .leftdummy[data-v-0ecf8a13]{width:.5em}.inputWrapper>div[data-v-0ecf8a13]{transition:.3s}.inputWrapper .center[data-v-0ecf8a13]{max-height:70px;display:flex;justify-content:center;align-items:center;flex-grow:1;border:1px solid #c8c0c1;border-radius:50px;padding-right:.5em}.inputWrapper input[data-v-0ecf8a13]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px;width:100%;padding:.5em 1em}.notready[data-v-0ecf8a13],.waitjoined[data-v-0ecf8a13]{padding:.5em 0;text-align:center}.waitjoined span[data-v-0ecf8a13]{font-size:.8em}.greetings[data-v-0ecf8a13]{padding:.5em 0}.greetings[data-v-0ecf8a13],[data-v-0ecf8a13] .iconWrapper{text-align:center}.menu-item[data-v-0ecf8a13]{padding:.5em;background:#fff;line-height:44px;display:flex}.menu-item .title[data-v-0ecf8a13]{flex-grow:2;padding-right:44px;text-align:center}.menu-item .iconWrapper[data-v-0ecf8a13]{width:44px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "720d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("46c5");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "731c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .inputWrapper>div[data-v-0ecf8a13]{transition:.3s}#matrix-root[theme=classic] .inputWrapper .center[data-v-0ecf8a13]{border:1px solid #c8c0c1;border-radius:50px}#matrix-root[theme=classic] .inputWrapper input[data-v-0ecf8a13]{border:1px solid hsla(0,0%,43.9%,.3);background:hsla(0,0%,92.5%,.5);border-radius:30px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "748b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("20fe");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("fa1ff552", content, shadowRoot)
};

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

/***/ "7b55":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6aea");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "7d04":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .userinfoWrapper[data-v-2eb31a16]{background:#ececec}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7f2e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("26dc");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_e6d2ad12_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "8186":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] .chatInputWrapper[data-v-2636c3cc]{transition:.3s}#matrix-root[theme=white] .chatEmpty[data-v-2636c3cc]{color:#606369}", ""]);
// Exports
module.exports = exports;


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

/***/ "826c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4e29656b_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("38d3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4e29656b_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4e29656b_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4e29656b_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_4e29656b_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "82e9":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".chatInputWrapper[data-v-2636c3cc]{position:fixed;z-index:3;bottom:0;background:#fff;left:0;right:0;transition:.3s}.chatInputWrapper.bin[data-v-2636c3cc]{position:absolute;left:1px;right:1px;bottom:1px;border-radius:5px}#chat.minimized .chatInputWrapper[data-v-2636c3cc]{opacity:0}#chat.minimized.active[data-v-2636c3cc]{padding-bottom:90px}#chat.minimized.active .chatInputWrapper[data-v-2636c3cc]{opacity:1}.encrypted[data-v-2636c3cc]{position:absolute;left:0;top:0;z-index:2;color:#06823a;padding:.25em .5em}.encrypted i[data-v-2636c3cc]{font-size:.8em}.roomMuted[data-v-2636c3cc]{position:absolute;left:5px;top:20px;z-index:2;color:#606369}.roomMuted i[data-v-2636c3cc]{font-size:.8em}.chatEmpty[data-v-2636c3cc]{padding:4em;text-align:center;color:#606369}.chatEmpty span[data-v-2636c3cc]{font-size:.8em}.preview-wrapper[data-v-2636c3cc]{max-height:350px;overflow-y:auto;border:1px solid rgba(96,99,105,.3);border-radius:10px;margin:0 auto;width:98%}.preview-wrapper[data-v-2636c3cc]::-webkit-scrollbar{width:0!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "86f7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("bd91");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("4fe295d2", content, shadowRoot)
};

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

/***/ "8a3c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4962");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5413bc34", content, shadowRoot)
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

/***/ "8b1e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e753");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5197fb73", content, shadowRoot)
};

/***/ }),

/***/ "9113":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_65ed421a_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("748b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_65ed421a_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_65ed421a_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_65ed421a_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputField_vue_vue_type_style_index_0_id_65ed421a_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "937a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("21ff");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "940c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5bcb");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("27054daf", content, shadowRoot)
};

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

/***/ "a256":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3d46");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_11645c45_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "b510":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d933");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_0ecf8a13_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "bd91":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] .chatInputWrapper[data-v-2636c3cc]{transition:.3s}#matrix-root[theme=black] .chatEmpty[data-v-2636c3cc]{color:#92979d}", ""]);
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

/***/ "c9bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("53eb");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2eb31a16_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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

/***/ "d933":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("731c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("d1d9d65e", content, shadowRoot)
};

/***/ }),

/***/ "e331":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7117");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("79bcfa4e", content, shadowRoot)
};

/***/ }),

/***/ "e753":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=classic] .chatInputWrapper[data-v-2636c3cc]{transition:.3s}#matrix-root[theme=classic] .chatEmpty[data-v-2636c3cc]{color:#606369}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "ee79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=template&id=4e29656b&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chat"},[_c('topheader',{staticClass:"topheader",attrs:{"u":_vm.u,"chat":_vm.chat},on:{"addMember":_vm.addMemberModal}}),(!_vm.roomInfo)?_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('chat',{attrs:{"u":_vm.u,"chat":_vm.chat},on:{"sending":_vm.sending,"newchat":_vm.newchat,"getEvents":_vm.eventsRoom}})]},proxy:true}],null,false,2636658855)}):_vm._e(),(_vm.openInviteModal)?_c('modal',{on:{"close":_vm.closeModal},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('span',[_vm._v("Invite User")])]},proxy:true},{key:"body",fn:function(){return [_c('contacts',{attrs:{"mode":"inviteUsers","chatRoomId":_vm.chat.roomId},on:{"closeModal":_vm.closeContactModal}})]},proxy:true},{key:"footer",fn:function(){return undefined},proxy:true}],null,false,1239787889)}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=template&id=4e29656b&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/index.vue?vue&type=template&id=2636c3cc&scoped=true&
var chatvue_type_template_id_2636c3cc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet, minimized: _vm.minimized, fix : _vm.pocketnet, active: _vm.active},attrs:{"id":"chat"}},[(_vm.m_chat && _vm.membership() === 'join')?_c('list',{attrs:{"chat":_vm.m_chat,"imagePreview":_vm.prevImage,"filePrev":_vm.anyFilePreview},on:{"openImg":_vm.openImgM,"getEvents":_vm.events}}):_vm._e(),(_vm.m_chat && _vm.membership() === 'invite')?_c('div',{staticClass:"joinwrapper"},[_c('join',{attrs:{"chat":_vm.m_chat,"usersinfo":_vm.usersinfo}})],1):_vm._e(),(!_vm.m_chat && _vm.usersinfo && _vm.usersinfo.length)?_c('div',{staticClass:"chatEmpty"},[_c('span',[_vm._v("Start chat with "+_vm._s(_vm.usersinfoNames()))])]):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(!_vm.m_chat || _vm.membership() === 'join')?_c('div',{staticClass:"chatInputWrapper fixedOnPageBottom",class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet}},[_c('div',[(_vm.urlpreview)?_c('div',{staticClass:"preview-wrapper"},[_c('url',{attrs:{"url":_vm.urlpreview,"preview":true}})],1):_vm._e(),_c('chatInput',{attrs:{"u":_vm.u,"chat":_vm.m_chat},on:{"sending":_vm.sending,"newchat":_vm.newchat,"closeMetaPreview":_vm.closing,"inputClean":_vm.hidePreview,"setMetaUrl":_vm.chatUrlHandler,"filePreview":_vm.getFilePreview,"anyFileSend":_vm.anyFileData,"emptyInput":_vm.hidePreview}})],1)]):_vm._e()]),(_vm.encrypted)?_c('div',{staticClass:"encrypted"},[_c('i',{staticClass:"fas fa-lock"})]):_vm._e()],1)}
var chatvue_type_template_id_2636c3cc_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/index.vue?vue&type=template&id=2636c3cc&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/list/index.vue?vue&type=template&id=11645c45&scoped=true&
var listvue_type_template_id_11645c45_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet, minimized: _vm.minimized, fix : _vm.pocketnet, active: _vm.active},attrs:{"id":"chatList"}},[_c('div',{ref:"work",staticClass:"work"},[_c('div',{ref:"uspbottom",staticClass:"uspbottomSpacer "}),_c('div',{ref:"direction_b",staticClass:"bottomSpacer spacer"}),_c('div',{ref:"events",staticClass:"timeLineWrapper"},[(_vm.timeline)?_c('events',{attrs:{"events":_vm.events,"filePreview":_vm.filePrev,"previewImage":_vm.imagePreview,"chat":_vm.chat},on:{"updated":_vm.eventsUpdated,"updatedSize":_vm.updatedSize,"removeEvent":_vm.removeEvent}}):_vm._e()],1),_c('div',{ref:"direction_f",staticClass:"topSpacer spacer"})])])}
var listvue_type_template_id_11645c45_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/list/index.vue?vue&type=template&id=11645c45&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/list/index.vue?vue&type=template&id=e6d2ad12&scoped=true&
var listvue_type_template_id_e6d2ad12_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"events"}},[_c('div',_vm._l((_vm.events),function(event){return (!event.localRedactionEvent() && !event.getRedactionEvent())?_c('div',{key:event.event.event_id,staticClass:"eventWrapper"},[_c('event',{attrs:{"event":event,"filePreview":_vm.filePreview,"galleryData":_vm.events,"clientWidth":_vm.clientWidth,"chat":_vm.chat},on:{"openImageEvent":function (e) { return _vm.galleryOpen(event); },"removeEvent":function (e) { return _vm.removeEvent(event); },"updatedSize":_vm.updatedSize}})],1):_vm._e()}),0),(_vm.previewImage.show !== false)?_c('div',[_c('imgPreview',{attrs:{"imagePreview":_vm.previewImage}})],1):_vm._e(),(_vm.listImgs && _vm.listImgs.length && _vm.isOpen)?_c('v-photoswipe',{attrs:{"isOpen":_vm.isOpen,"items":_vm.listImgs,"options":_vm.options},on:{"close":_vm.hidePhotoSwipe}}):_vm._e()],1)}
var listvue_type_template_id_e6d2ad12_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/events/list/index.vue?vue&type=template&id=e6d2ad12&scoped=true&

// EXTERNAL MODULE: ./src/components/events/event/index.vue + 34 modules
var events_event = __webpack_require__("6167");

// EXTERNAL MODULE: ./node_modules/v-photoswipe/dist/v-photoswipe.js
var v_photoswipe = __webpack_require__("46e4");

// EXTERNAL MODULE: ./node_modules/underscore/modules/index-all.js + 159 modules
var index_all = __webpack_require__("c46f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/previews/imgPreview/index.vue?vue&type=template&id=3c99d658&
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
        // if (event.event.type === 'm.room.encrypted' && event._clearEvent.content.msgtype === 'm.image') {
        //
        //     this.listImgs.push({
        //         src: event._clearEvent.content.url,
        //         w: event._clearEvent.content.info.w,
        //         h: event._clearEvent.content.info.h,
        //         eventId: event.event.event_id
        //     })
        //
        // }
        if (event.event.content.msgtype === 'm.image') {
          _this2.listImgs.push({
            src: event.event.content.url,
            w: event.event.content.info.w,
            h: event.event.content.info.h,
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

        if (_this.chat.currentState.getMembers().length <= 2 && e.event.type === 'm.room.member' && 'm.room.power_levels') {
          return;
        }

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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/index.vue?vue&type=template&id=0ecf8a13&scoped=true&
var inputvue_type_template_id_0ecf8a13_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatInput"}},[(_vm.ready)?_c('div',{staticClass:"work"},[(_vm.chat && (_vm.joined && _vm.joined.length > 1) || !_vm.encrypted)?_c('div',{staticClass:"inputWrapper"},[_c('div',{staticClass:"center"},[_c('InputField',{ref:"newinput",on:{"chatMessage":_vm.sendinput,"setMetaUrl":_vm.emitUrl,"emptyInput":_vm.emitInputData,"FilledInput":_vm.HideUploadPic}}),(_vm.upload && _vm.chat)?_c('div',{staticClass:"left"},[_c('div',{staticClass:"iconbutton"},[_c('dropdownMenu',{ref:"dropdownMenu",attrs:{"menuItems":_vm.menuItems,"rowObject":{},"icon":"fas fa-plus"},on:{"itemClicked":_vm.menuItemClickHandler},scopedSlots:_vm._u([{key:"default",fn:function(slotProps){return [(!slotProps.item.upload)?_c('div',{staticClass:"menu-item",on:{"click":function($event){return _vm.menuItemClick(slotProps.item)}}},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])]):_c('upload',{attrs:{"multiple":slotProps.item.upload.multiple,"extensions":slotProps.item.upload.extensions,"images":slotProps.item.upload.images},on:{"start":function (files) { return _vm.uploadStart(slotProps.item, files); },"uploaded":function (data) { return _vm.uploadUploaded(slotProps.item, data); },"uploadedAll":function (result) { return _vm.uploadUploadedAll(slotProps.item, result); },"error":function (error) { return _vm.uploadError(slotProps.item, error); }},scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('div',{staticClass:"menu-item"},[_c('div',{staticClass:"iconWrapper"},[(slotProps.item.icon)?_c('i',{class:slotProps.item.icon}):_vm._e()]),_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(slotProps.item.title)+" ")])])]},proxy:true},{key:"dropzone",fn:function(){return undefined},proxy:true}],null,true)})]}}],null,false,2831926823)})],1)]):_vm._e()],1)]):_vm._e(),(_vm.chat && _vm.joined.length < 2 && _vm.encrypted)?_c('div',{staticClass:"waitjoined"},[_c('span',[_vm._v("Wait while users join to chat")])]):_vm._e()]):_c('div',{staticClass:"notready"},[_c('linepreloader')],1)])}
var inputvue_type_template_id_0ecf8a13_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/input/index.vue?vue&type=template&id=0ecf8a13&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/input/InputField/InputField.vue?vue&type=template&id=65ed421a&scoped=true&
var InputFieldvue_type_template_id_65ed421a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-component"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(true),expression:"true"}],staticClass:"input-wrapper"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.text),expression:"text"}],staticClass:"chat-input",attrs:{"type":"text","rows":"1"},domProps:{"value":(_vm.text)},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.send_text($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }if(!$event.ctrlKey){ return null; }$event.preventDefault();return _vm.make_new_line($event)}],"input":function($event){if($event.target.composing){ return; }_vm.text=$event.target.value}}}),_c('transition',{attrs:{"name":"fade","mode":"out-in"}},[_c('picker',{directives:[{name:"show",rawName:"v-show",value:(_vm.display_emoji),expression:"display_emoji"}],style:({ width: '325px', position: 'absolute', bottom: '32px', right: '-60px', fontSize: '0.9em', fontFamily: 'Segoe UI' }),attrs:{"exclude":_vm.exclude,"set":"emojione","showPreview":false,"showSearch":false},on:{"select":_vm.insert_emoji}})],1)],1),_c('div',{staticClass:"iconbutton",on:{"click":_vm.toggle_emoji_picker}},[_vm._m(0)]),(_vm.send)?_c('div',{staticClass:"iconbutton",on:{"click":function($event){return _vm.send_text($event)}}},[_vm._m(1)]):_vm._e()])}
var InputFieldvue_type_template_id_65ed421a_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"leftdummy"},[_c('div',{staticClass:"idummy"},[_c('i',{staticClass:"far fa-smile"})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"rightdummy"},[_c('div',{staticClass:"idummy"},[_c('i',{staticClass:"far fa-paper-plane"})])])}]


// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue?vue&type=template&id=65ed421a&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/emoji-mart-vue/dist/emoji-mart.js
var emoji_mart = __webpack_require__("b047");

// EXTERNAL MODULE: ./node_modules/autosize/dist/autosize.js
var autosize = __webpack_require__("19e9");
var autosize_default = /*#__PURE__*/__webpack_require__.n(autosize);

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
  components: {
    Picker: emoji_mart["Picker"]
  },
  watch: {
    text: function text(current) {
      if (current) {
        this.send = true;
        this.$emit('FilledInput');
      } else {
        this.send = false;
        this.$emit('emptyInput');
      }
    }
  },
  computed: {
    picker_height: function picker_height() {
      return window.innerHeight * 0.9;
    }
  },
  methods: {
    toggle_emoji_picker: function toggle_emoji_picker() {
      this.display_emoji = !this.display_emoji;
    },
    make_new_line: function make_new_line() {
      if (!this.text) return;
      this.text += '\n';
      var add_height = $('.chat-input').height() + 24;
      $('.chat-input').css('height', add_height);
    },
    send_text: function send_text(event) {
      event.textContent = this.text;

      if (this.text && this.text !== '\n') {
        this.display_emoji = false;
        this.$emit('chatMessage', event);
        this.$emit('emptyInput');
        this.send = false;
        this.text = '';
        $('.chat-input').css('height', '24px');
      } // if(this.text == '\n') {
      //     this.text = ''
      //     $('.chat-input').css('height', '24px')
      // }

    },
    insert_emoji: function insert_emoji(emoji) {
      this.text = this.text + emoji.native;
    }
  },
  data: function data() {
    return {
      send: false,
      toMatch: [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i],
      isPhone: true,
      heightUp: 40,
      areaValue: '',
      ready: false,
      text: '',
      exclude: ['flags'],
      display_emoji: false,
      text_area_height: ''
    };
  },
  mounted: function mounted() {
    this.isPhone = this.toMatch.some(function (toMatchItem) {
      return navigator.userAgent.match(toMatchItem);
    });
    autosize_default()($('.chat-input'));
  }
});
// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue?vue&type=script&lang=js&
 /* harmony default export */ var InputField_InputFieldvue_type_script_lang_js_ = (InputFieldvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/input/InputField/InputField.vue



function InputField_injectStyles (context) {
  
  var style0 = __webpack_require__("9113")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var InputField_component = Object(componentNormalizer["a" /* default */])(
  InputField_InputFieldvue_type_script_lang_js_,
  InputFieldvue_type_template_id_65ed421a_scoped_true_render,
  InputFieldvue_type_template_id_65ed421a_scoped_true_staticRenderFns,
  false,
  InputField_injectStyles,
  "65ed421a",
  null
  ,true
)

/* harmony default export */ var InputField = (InputField_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/input?vue&type=script&lang=js&
















var enc = 'm.megolm.v1.aes-sha2';
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
      encrypted: false,
      upload: true,
      info: {},
      loading: false,
      text: '',
      file: {},
      fileInfo: {},
      ready: false,
      needencrypt: false,
      creating: false,
      userId: '',
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
      anyUrlMeta: String,
      joinedMembers: []
    };
  },
  watch: {
    usersForKeys: {
      immediate: true,
      handler: function handler() {
        this.downloadKeys();
      }
    }
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])(['chats'])), {}, {
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

      this.encrypted = this.core.mtrx.client.isRoomEncrypted(this.chat.roomId);
      console.log(this.encrypted);
      return index_all["a" /* default */].map(index_all["a" /* default */].filter(this.chat.currentState.getMembers(), function (m, v) {
        return m.membership === 'invite';
      }), function (u) {
        return u.userId;
      });
    },
    joined: function joined() {
      if (!this.chat) return [];
      var roomId = this.chat.roomId;
      var self = this;
      var arr = [];
      var members = 0;

      index_all["a" /* default */].each(this.chats, function (chat) {
        if (chat.roomId === roomId) {
          chat.members.forEach(function (user) {
            if (user.membership === 'join') {
              arr.push(user.userId);
            }
          });
        }
      });

      console.log(arr, "Aaaaaaaaa213123213");
      return arr;
    },
    usersForKeys: function usersForKeys() {
      return this.invited.concat(this.joined);
    }
  }),
  created: function created() {},
  mounted: function mounted() {
    var _this2 = this;

    this.downloadKeys().then(function (r) {
      _this2.ready = true;

      _this2.newchat();
    });
  },
  methods: {
    wait: function wait() {
      var _this3 = this;

      return this.$f.pretry(function () {
        return _this3.core.mtrx.client && _this3.core.mtrx.access && _this3.usersForKeys.length;
      });
    },
    downloadKeys: function downloadKeys() {
      var _this4 = this;

      return this.wait().then(function (r) {
        return _this4.core.mtrx.client.downloadKeysForUsers(_this4.usersForKeys, {
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
        var myMatrixId = null;
        var chat = null;
        this.creating = true;
        this.core.user.usersInfo(this.uusers).then(function (info) {
          var id = _this5.core.mtrx.kit.tetatetid(info[0], _this5.core.user.userinfo);

          matrixId = _this5.core.user.matrixId(info[0].id);
          myMatrixId = _this5.core.user.matrixId(_this5.core.user.userinfo.id);
          var initialstate = [{
            "type": "m.room.encryption",
            "state_key": "",
            "content": {
              "algorithm": enc
            }
          }];
          _this5.needencrypt = false;
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
        }).then(function (_chat) {
          chat = _chat;
          _this5.$store.state.globalpreloader = false;
          /*this.$store.commit('icon', {
            icon : 'success',
            message : "Chat started"
          })*/

          console.log("CHAT", chat);

          _this5.$emit("newchat", chat);

          var m_chat = _this5.core.mtrx.client.getRoom(_chat.room_id);

          var event = m_chat.currentState.getStateEvents("m.room.power_levels");
          return _this5.core.mtrx.client.setPowerLevel(chat.room_id, matrixId, 100, event[0]).then(function (r) {
            console.log(r, "WTYFF@!#!@@!!@#!@#!@!@#");
            return r;
          });
        }).then(function (r) {
          _this5.creating = false; //this.core.mtrx.bkp()
        }).catch(function (e) {
          console.log("E", e);
          _this5.creating = false;
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
      var t = text.replace(/\n/g, '<br/>');

      if (!this.chat) {
        this.newchat();
      }

      this.$emit("sending");
      return this.$f.pretry(function () {
        return _this6.chat && !_this6.creating;
      }).then(function () {
        return _this6.core.mtrx.client.prepareToEncrypt(_this6.chat);
      }).then(function () {
        return _this6.core.mtrx.client.sendEvent(_this6.chat.roomId, "m.room.message", {
          body: t,
          msgtype: "m.text"
        }, "")
        /*.then(r => {
          console.log(r)
          return this.encryptIfNeed()
        })*/
        .catch(function (e) {
          console.log(e);
        });
      });
    },
    encrypt: function encrypt() {
      return this.core.mtrx.client.setRoomEncryption(this.chat.roomId, {
        algorithm: enc
      });
    },
    encryptIfNeed: function encryptIfNeed() {
      return Promise.resolve();
      var encrypted = this.core.mtrx.client.isRoomEncrypted(this.chat.roomId);

      if (!encrypted && index_all["a" /* default */].toArray(this.chat.currentState.members).length == 2 && this.needencrypt) {
        this.needencrypt = false;
        return this.encrypt();
      }

      return Promise.resolve();
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

        return _this7.encryptIfNeed();
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
        return _this8.encryptIfNeed();
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
  
  var style0 = __webpack_require__("1eed")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("3901")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("66f9")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("b510")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var input_component = Object(componentNormalizer["a" /* default */])(
  chat_input_vue_type_script_lang_js_,
  inputvue_type_template_id_0ecf8a13_scoped_true_render,
  inputvue_type_template_id_0ecf8a13_scoped_true_staticRenderFns,
  false,
  input_injectStyles,
  "0ecf8a13",
  null
  ,true
)

/* harmony default export */ var input = (input_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/join/index.vue?vue&type=template&id=074c8f52&scoped=true&
var joinvue_type_template_id_074c8f52_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatJoin"}},[_vm._m(0),_c('chatPreview',{attrs:{"usersinfo":_vm.usersinfo,"members":_vm.joinedMembers,"users":_vm.users}}),_vm._m(1),_c('div',{staticClass:"joinAction fixedOnPageBottom",class:{'bin' : _vm.pocketnet, 'bout' : !_vm.pocketnet}},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"actions"},[_c('div',{staticClass:"action"},[_c('button',{staticClass:"small button black rounded",on:{"click":_vm.decline}},[_vm._v("Decline")])]),_c('div',{staticClass:"action"},[_c('button',{staticClass:"small button rounded",on:{"click":_vm.join}},[_vm._v("Join")])])])])])],1)}
var joinvue_type_template_id_074c8f52_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"work"},[_c('div',{staticClass:"caption"},[_c('span',[_vm._v(" You were invited to chat with: ")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tip"},[_c('span',[_vm._v("You can join in chat or decline invitation")])])}]


// CONCATENATED MODULE: ./src/components/chat/join/index.vue?vue&type=template&id=074c8f52&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/preview/index.vue?vue&type=template&id=2eb31a16&scoped=true&
var previewvue_type_template_id_2eb31a16_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chatPreview"},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"previewWrapper"},[_c('div',{staticClass:"users"},[_c('swiper',{staticClass:"swiper",attrs:{"options":_vm.swiperOption}},[_vm._l((_vm.members),function(user){return _c('swiper-slide',{key:user['id']},[_c('div',{staticClass:"work"},[_c('div',{staticClass:"userinfoWrapper"},[_c('userView',{attrs:{"userinfo":user}})],1)])])}),_c('div',{staticClass:"swiper-pagination",attrs:{"slot":"pagination"},slot:"pagination"})],2)],1)])])])}
var previewvue_type_template_id_2eb31a16_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/preview/index.vue?vue&type=template&id=2eb31a16&scoped=true&

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

        var members = _.filter(_.map(_.filter(((_this$chat = this.chat) === null || _this$chat === void 0 ? void 0 : _this$chat.currentState.getMembers()) || {}, function (m) {
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
  
  var style0 = __webpack_require__("3eda")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("937a")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("c9bc")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("6c3f")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var preview_component = Object(componentNormalizer["a" /* default */])(
  chat_preview_vue_type_script_lang_js_,
  previewvue_type_template_id_2eb31a16_scoped_true_render,
  previewvue_type_template_id_2eb31a16_scoped_true_staticRenderFns,
  false,
  preview_injectStyles,
  "2eb31a16",
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
        /*var need = this.needEncryption()
          if (need){
            var algorithm = "m.olm.v1.curve25519-aes-sha2"
          this.encrypt(algorithm).then(r => {
            this.$emit('joined')
          })
            return
        }*/
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
var url = __webpack_require__("6603");

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
    url: url["a" /* default */]
  },
  data: function data() {
    return {
      roomMuted: false,
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
        var pushRules = this.core.mtrx.client._pushProcessor.getPushRuleById(this.chat.roomId);

        if (pushRules !== null) {
          this.roomMuted = true;
        }

        var m_chat = this.core.mtrx.client.getRoom(this.chat.roomId);
        return m_chat || {};
      }
    },
    encrypted: function encrypted() {
      if (this.chat && this.chat.roomId) {
        return this.core.mtrx.client.isRoomEncrypted(this.chat.roomId);
      }

      return false;
    },
    openInviteModal: function openInviteModal() {
      return this.openInviteModal;
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
  
  var style0 = __webpack_require__("6f09")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("7b55")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("f951")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("fb47")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  components_chat_vue_type_script_lang_js_,
  chatvue_type_template_id_2636c3cc_scoped_true_render,
  chatvue_type_template_id_2636c3cc_scoped_true_staticRenderFns,
  false,
  chat_injectStyles,
  "2636c3cc",
  null
  ,true
)

/* harmony default export */ var chat = (chat_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a4fdebdc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/topheader/index.vue?vue&type=template&id=373e6a3c&scoped=true&
var topheadervue_type_template_id_373e6a3c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatTopheader"}},[(_vm.chat || _vm.u)?_c('topheader',{scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"back"}})]},proxy:true},{key:"info",fn:function(){return [(_vm.chat)?_c('router-link',{attrs:{"to":'chatInfo?id=' + _vm.chat.roomId}},[(_vm.m_chat)?_c('div',[_c('div',{staticClass:"nameWrapper"},[(!_vm.roomInfo)?_c('chatName',{attrs:{"preview":true,"chat":_vm.m_chat}}):_vm._e(),(_vm.roomMuted)?_c('div',{staticClass:"roomMuted"},[_c('i',{staticClass:"fas fa-bell-slash"})]):_vm._e()],1),_c('transition',{attrs:{"name":"fade"}},[(_vm.m_chat_typing)?_c('chatTyping'):_vm._e()],1)],1):_vm._e(),(!_vm.m_chat && _vm.userinfo)?_c('div',[_c('span',{staticClass:"nameline"},[_vm._v(_vm._s(_vm.userinfo.name))])]):_vm._e()]):_vm._e()]},proxy:true},{key:"right",fn:function(){return [(_vm.m_chat && _vm.m_chat.currentState.getMembers().length > 2)?_c('div',{staticClass:"icon iconbutton"},[(!_vm.roomMuted)?_c('div',[_c('dropdownMenu',{ref:"dropdownMenu",staticClass:"chatRightMenu",attrs:{"menuItems":_vm.menuItemsRoom,"rowObject":{},"icon":"fas fa-ellipsis-h"},on:{"itemClicked":_vm.menuItemClickHandler}})],1):_vm._e(),(_vm.roomMuted)?_c('div',[_c('dropdownMenu',{ref:"dropdownMenu",staticClass:"chatRightMenu",attrs:{"menuItems":_vm.menuItemsRoomMuted,"rowObject":{},"icon":"fas fa-ellipsis-h"},on:{"itemClicked":_vm.menuItemClickHandler}})],1):_vm._e()]):_c('div',{staticClass:"icon iconbutton"},[(!_vm.roomMuted)?_c('div',[_c('dropdownMenu',{ref:"dropdownMenu",staticClass:"chatOneToOne",attrs:{"menuItems":_vm.oneToOne,"rowObject":{},"icon":"fas fa-ellipsis-h"},on:{"itemClicked":_vm.menuItemClickHandler}})],1):_vm._e(),(_vm.roomMuted)?_c('div',[_c('dropdownMenu',{ref:"dropdownMenu",staticClass:"chatOneToOne",attrs:{"menuItems":_vm.oneToOneMuted,"rowObject":{},"icon":"fas fa-ellipsis-h"},on:{"itemClicked":_vm.menuItemClickHandler}})],1):_vm._e()])]},proxy:true}],null,false,4136846621)}):_vm._e(),(_vm.donateUserOpened)?_c('modal',{on:{"close":_vm.closeDonateModal},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('span',[_vm._v("Donate")])]},proxy:true},{key:"body",fn:function(){return [_c('div',{staticClass:"donationModalBody"},[_c('span',[_vm._v("Source")]),_c('input',{staticClass:"disabled",attrs:{"type":"text","value":"Account Address","disabled":true}}),_c('span',[_vm._v("Amount")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.donationAmount),expression:"donationAmount",modifiers:{"number":true}}],attrs:{"type":"number","disabled":_vm.sending},domProps:{"value":(_vm.donationAmount)},on:{"keyup":function($event){return _vm.resetDonation()},"input":function($event){if($event.target.composing){ return; }_vm.donationAmount=_vm._n($event.target.value)},"blur":function($event){return _vm.$forceUpdate()}}}),_c('span',[_vm._v("Receiver")]),_c('input',{staticClass:"disabled",attrs:{"type":"text","disabled":true},domProps:{"value":(_vm.receiver) ? _vm.receiver.name : ''}}),_c('span',[_vm._v("Message")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.donationMessage),expression:"donationMessage"}],attrs:{"type":"text","placeholder":"Your message","disabled":_vm.sending},domProps:{"value":(_vm.donationMessage)},on:{"input":function($event){if($event.target.composing){ return; }_vm.donationMessage=$event.target.value}}}),(_vm.showFeesError && _vm.showFeesError == 'money')?_c('span',{staticClass:"error"},[_vm._v("Balance too low")]):(_vm.showFeesError)?_c('span',{staticClass:"error"},[_vm._v("Error, can't calculate the fees")]):_vm._e(),(_vm.calculatingFees != true)?_c('button',{staticClass:"button small",attrs:{"disabled":!_vm.donationAmount || _vm.calculatedFees != null},on:{"click":_vm.onCalculateFeesClick}},[_c('i',{staticClass:"fas fa-chevron-circle-right"}),_vm._v(" Calculate Fees ")]):_vm._e(),(_vm.calculatingFees == true)?_c('div',{staticClass:"linepreloader"},[_c('linepreloader')],1):_vm._e()]),(_vm.calculatedFees != null)?_c('div',{staticClass:"donationModalBody"},[_c('span',[_vm._v("Include Fees in Amount")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.feesDirection),expression:"feesDirection"}],attrs:{"disabled":_vm.sending},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.feesDirection=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.feesDirectionPossibleValues),function(feeDirection){return _c('option',{domProps:{"value":feeDirection.value}},[_vm._v(" "+_vm._s(feeDirection.label)+" ")])}),0),_c('span',[_vm._v("Transaction Fees")]),_c('input',{staticClass:"disabled",attrs:{"type":"number","disabled":true},domProps:{"value":_vm.calculatedFees}}),_c('span',[_vm._v("Total amount")]),_c('span',{staticClass:"totalAmount"},[_vm._v(_vm._s(+_vm.totalDonationAmount.toFixed(5))+" PKOIN")]),(_vm.showTransactionError && _vm.showTransactionError == 'balance too low')?_c('span',{staticClass:"error"},[_vm._v("Balance too low")]):(_vm.showTransactionError)?_c('span',{staticClass:"error"},[_vm._v("Error, can't make the transaction")]):_vm._e(),(_vm.sending != true)?_c('button',{staticClass:"button small",attrs:{"disabled":_vm.sending},on:{"click":_vm.sendDonation}},[_c('i',{staticClass:"fas fa-arrow-alt-circle-right"}),_vm._v(" Send ")]):_vm._e(),(_vm.sending == true)?_c('div',{staticClass:"linepreloader"},[_c('linepreloader')],1):_vm._e()]):_vm._e()]},proxy:true},{key:"footer",fn:function(){return undefined},proxy:true}],null,false,3274686846)}):_vm._e()],1)}
var topheadervue_type_template_id_373e6a3c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue?vue&type=template&id=373e6a3c&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("a34a");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./src/components/chats/assets/typing.vue + 4 modules
var typing = __webpack_require__("0826");

// EXTERNAL MODULE: ./src/components/contacts/index.vue + 19 modules
var contacts = __webpack_require__("71da");

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
    chatTyping: typing["a" /* default */],
    contacts: contacts["a" /* default */]
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
      menuItemsRoom: [{
        click: "AddMember",
        title: "Add",
        icon: "fas fa-user-plus"
      }, {
        click: "MuteRoom",
        title: "Mute",
        icon: "fas fa-bell-slash"
      }, {
        click: "LeaveFromRoom",
        title: "Leave and Delete",
        icon: "fas fa-sign-out-alt"
      }],
      menuItemsRoomMuted: [{
        click: "AddMember",
        title: "Add",
        icon: "fas fa-user-plus"
      }, {
        click: "MuteRoom",
        title: "UnMute",
        icon: "fas fa-bell"
      }, {
        click: "LeaveFromRoom",
        title: "Leave and Delete",
        icon: "fas fa-sign-out-alt"
      }],
      oneToOne: [{
        click: "MuteRoom",
        title: "Mute",
        icon: "fas fa-bell-slash"
      }, {
        click: "LeaveFromRoom",
        title: "Leave and Delete",
        icon: "fas fa-sign-out-alt"
      }, {
        click: "Donate",
        title: "Donate",
        icon: "fas fa-money-bill-wave"
      }],
      oneToOneMuted: [{
        click: "MuteRoom",
        title: "UnMute",
        icon: "fas fa-bell"
      }, {
        click: "LeaveFromRoom",
        title: "Leave and Delete",
        icon: "fas fa-sign-out-alt"
      }, {
        click: "Donate",
        title: "Donate",
        icon: "fas fa-money-bill-wave"
      }],
      donateMenu: [{
        click: "Donate",
        title: "Donate",
        icon: "fas fa-money-bill-wave"
      }],
      loading: false,
      typing: false,
      userinfo: null,
      aboutUserShow: false,
      roomBanned: false,
      roomMuted: false,
      // --- Variables for the donation part ---
      // Boolean when the donation modal is open
      donateUserOpened: false,
      // Object containing the receiver informations
      receiver: null,
      // How much PKOIN we want to donate
      donationAmount: 0,
      // Optional message for the transaction
      donationMessage: '',
      // Calculated fees needed for the transaction
      calculatedFees: null,
      // Booleans to show errors
      showFeesError: '',
      showTransactionError: '',
      // Booleans to show spinners
      calculatingFees: false,
      sending: false,
      // To choose by who the fee should be payed by
      feesDirection: 'include',
      feesDirectionPossibleValues: [{
        value: 'include',
        label: 'To be paid by Receiver'
      }, {
        value: 'exclude',
        label: 'To be paid by Sender'
      }]
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
        var pushRules = this.core.mtrx.client._pushProcessor.getPushRuleById(this.chat.roomId);

        if (pushRules !== null) {
          this.roomMuted = true;
          console.log("RoomMUTED", "TOPHEADER");
        }

        var m_chat = this.core.mtrx.client.getRoom(this.chat.roomId);
        console.log(m_chat, "M_CHAT");
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
    },
    totalDonationAmount: function totalDonationAmount() {
      return this.feesDirection == 'include' ? this.donationAmount : this.donationAmount + this.calculatedFees;
    }
  }),
  methods: {
    navigateToProfile: function navigateToProfile(id) {
      this.$router.push({
        path: "/contact?id=".concat(functions["a" /* default */].getmatrixid(id))
      });
    },
    getuserinfo: function getuserinfo() {
      var _this2 = this;

      if (this.u) {
        this.core.user.usersInfo(this.u).then(function (info) {
          _this2.userinfo = info[0];
        });
      }
    },
    // Return the another member in the chat
    // (it returns the last one, so make sense only for the one to one chat)
    // If no user found, return undefined
    findOtherUser: function findOtherUser() {
      var my = this.m_chat.myUserId;
      var receiver;
      var members = this.m_chat.currentState.getMembers();
      members.forEach(function (member) {
        if (member && member.userId !== my) receiver = member;
      });
      return receiver;
    },
    addMember: function addMember() {
      this.modalInviteUser();
    },
    menuItemClickHandler: function menuItemClickHandler(item, rowObject) {
      var _this3 = this;

      if (item.click === 'AddMember') {
        this.$emit('addMember', true);
        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === 'MuteRoom') {
        var roomId = this.chat.roomId;
        var deviceID = this.core.mtrx.client.deviceId;
        var self = this;

        var pushRules = this.core.mtrx.client._pushProcessor.getPushRuleById(this.chat.roomId);

        if (pushRules !== null) {
          self.core.mtrx.client.deletePushRule('global', 'room', roomId);
          this.roomMuted = false;
        } else {
          self.core.mtrx.client.setRoomMutePushRule('global', roomId, 'true');
          this.roomMuted = true;
        }

        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === 'LeaveFromRoom') {
        this.core.mtrx.client.leave(this.chat.roomId).then(function (r) {
          _this3.core.mtrx.client.forget(_this3.chat.roomId, true).then(function (r) {
            return r;
          });
        });
        this.$router.push({
          path: '/chats'
        });
        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === 'BanRoom') {
        var banUserId = '';
        var banUser = this.findOtherUser();
        if (banUser && banUser.userId) banUserId = banUser.userId;
        var roomID = this.chat.roomId;
        this.core.mtrx.client.ban(roomID, banUserId, 'ban').then(function (r) {
          console.log(r, "BANNED");
        });
        this.roomBanned = true;
        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === 'Unban') {
        var _banUserId = '';

        var _banUser = this.findOtherUser();

        if (_banUser && _banUser.userId) _banUserId = _banUser.userId;
        this.core.mtrx.client.unban(this.chat.roomId, _banUserId).then(function (r) {
          _this3.core.mtrx.client.invite(_this3.chat.roomId, _banUserId);
        });
        console.log("UNBANNED");
        this.roomBanned = false;
        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === "Donate") {
        // Open modal
        this.donateUserOpened = true; // Close dropdown menu

        this.$refs.dropdownMenu.hidePopup(); // Find the user we are about to donate to

        var receiverObj = this.findOtherUser();
        this.receiver = receiverObj ? this.$f.deep(this, '$store.state.users.' + this.$f.getmatrixid(receiverObj.name)) : null;
      }
    },
    closeDonateModal: function closeDonateModal() {
      this.donateUserOpened = false;
    },
    onCalculateFeesClick: function onCalculateFeesClick() {
      var _this4 = this;

      this.calculatingFees = true;
      this.calculateFees().finally(function () {
        return _this4.calculatingFees = false;
      });
    },
    calculateFees: function calculateFees() {
      var _this5 = this;

      var self = this;
      this.showFeesError = '';
      return new Promise(function (resolve, reject) {
        console.log("Calculating fees..."); // Check parameters

        if (_this5.donationAmount <= 0 || !_this5.receiver || !_this5.receiver.source || !_this5.receiver.source.address) {
          _this5.showFeesError = 'invalid';
          return reject('Missing amount or receiver');
        } // Try calculating fees


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
              var totalFees = Math.min(tx.virtualSize() * fees.feerate, 0.0999); // Got the fees

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
    sendDonation: function sendDonation() {
      var _this6 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var self, sdk;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = _this6;
                _this6.sending = true;
                _this6.showTransactionError = ''; // Recalculate the fees just before sending

                _context.prev = 3;
                _context.next = 6;
                return _this6.calculateFees();

              case 6:
                _context.next = 13;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                _this6.showTransactionError = 'error';
                _this6.sending = false;
                return _context.abrupt("return");

              case 13:
                // Check if current balance is enough
                sdk = window.POCKETNETINSTANCE.platform.sdk;
                sdk.node.transactions.get.canSpend(sdk.address.pnet().address, function (currentBalance) {
                  // If balance is too low
                  if (!currentBalance || isNaN(currentBalance) || currentBalance < self.totalDonationAmount) {
                    self.showTransactionError = 'balance too low';
                    self.sending = false;
                    return;
                  } // Start the send transaction process


                  try {
                    var outputs = [{
                      address: self.receiver.source.address,
                      amount: self.donationAmount
                    }];
                    sdk.wallet.embed(outputs, self.donationMessage); // Create a transaction

                    sdk.wallet.txbase([sdk.address.pnet().address], outputs, self.calculatedFees, self.feesDirection, function (err, inputs, _outputs) {
                      if (err) {
                        console.error(err);
                        self.showTransactionError = 'error';
                        self.sending = false;
                        return reject(err);
                      }

                      var tx = sdk.node.transactions.create.wallet(inputs, _outputs);
                      inputs.forEach(function (t) {
                        t.cantspend = true;
                      }); // Try sending the transaction

                      sdk.node.transactions.send(tx, function (d, err) {
                        if (err) {
                          sdk.node.transactions.releaseCS(inputs);
                          self.showTransactionError = 'error';
                          self.sending = false;
                          return;
                        } // Transaction has been sent


                        var ids = inputs.map(function (i) {
                          return i.txid;
                        });
                        sdk.node.transactions.clearUnspents(ids);
                        sdk.wallet.saveTempInfoWallet(d, inputs, _outputs); // Send an event to the chat

                        self.core.mtrx.client.sendEvent(self.chat.roomId, "m.room.message", {
                          from: self.$f.getmatrixid(self.m_chat.myUserId),
                          to: self.receiver.id,
                          amount: self.donationAmount,
                          txId: d,
                          msgtype: "m.notice"
                        }, ""); // Close the donation modal

                        self.closeDonateModal();
                      });
                    });
                  } catch (err) {
                    console.error(err);
                    self.showTransactionError = 'error';
                    self.sending = false;
                  }
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 8]]);
      }))();
    },
    resetDonation: function resetDonation() {
      this.calculatedFees = null;
      this.showFeesError = '';
      this.showTransactionError = '';
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/topheader?vue&type=script&lang=js&
 /* harmony default export */ var chat_topheader_vue_type_script_lang_js_ = (topheader_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue



function topheader_injectStyles (context) {
  
  var style0 = __webpack_require__("fd6b")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("720d")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("2646")
if (style2.__inject__) style2.__inject__(context)
var style3 = __webpack_require__("28a4")
if (style3.__inject__) style3.__inject__(context)

}

/* normalize component */

var topheader_component = Object(componentNormalizer["a" /* default */])(
  chat_topheader_vue_type_script_lang_js_,
  topheadervue_type_template_id_373e6a3c_scoped_true_render,
  topheadervue_type_template_id_373e6a3c_scoped_true_staticRenderFns,
  false,
  topheader_injectStyles,
  "373e6a3c",
  null
  ,true
)

/* harmony default export */ var topheader = (topheader_component.exports);
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
//
//
//
//
//




/* harmony default export */ var chatvue_type_script_lang_js_ = ({
  name: 'pagechat',
  components: {
    chat: chat,
    topheader: topheader,
    contacts: contacts["a" /* default */]
  },
  data: function data() {
    return {
      roomInfo: false,
      m_chat: {},
      events: [],
      openInviteModal: false
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
    closeModal: function closeModal() {
      this.openInviteModal = false;
    },
    closeContactModal: function closeContactModal(value) {
      this.openInviteModal = value;
    },
    addMemberModal: function addMemberModal(value) {
      this.openInviteModal = value;
    },
    newchat: function newchat(_chat) {},
    sending: function sending() {
      console.log("SENDING");
    },
    eventsRoom: function eventsRoom(data) {
      this.events = data;
    }
  }
});
// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_chatvue_type_script_lang_js_ = (chatvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/chat.vue



function views_chat_injectStyles (context) {
  
  var style0 = __webpack_require__("826c")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var views_chat_component = Object(componentNormalizer["a" /* default */])(
  views_chatvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  views_chat_injectStyles,
  "4e29656b",
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

/***/ "f951":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("86f7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f9ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9bf4");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_5_id_074c8f52_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "fb47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8b1e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_classic_sass_vue_type_style_index_3_id_2636c3cc_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "fc74":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("82e9");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0f0b4fa0", content, shadowRoot)
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

/***/ "fd6b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("142f");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_373e6a3c_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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