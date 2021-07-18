(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[2],{

/***/ "0826":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"485f467a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/typing.vue?vue&type=template&id=35857e68&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typingBlock",staticStyle:{"position":"relative"}},[_c('div',{staticClass:"typingBlockWrapper"},[_vm._m(0),_c('div',[_c('PulseLoader',{attrs:{"color":_vm.color,"size":_vm.size,"loading":true}})],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[_vm._v("typing")])])}]


// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue?vue&type=template&id=35857e68&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"485f467a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=template&id=7dc0198c&
var PulseLoadervue_type_template_id_7dc0198c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading),expression:"loading"}],staticClass:"v-spinner"},[_c('div',{staticClass:"v-pulse v-pulse1",style:([_vm.spinnerStyle,_vm.spinnerDelay1])}),_c('div',{staticClass:"v-pulse v-pulse2",style:([_vm.spinnerStyle,_vm.spinnerDelay2])}),_c('div',{staticClass:"v-pulse v-pulse3",style:([_vm.spinnerStyle,_vm.spinnerDelay3])})])}
var PulseLoadervue_type_template_id_7dc0198c_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=template&id=7dc0198c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var PulseLoadervue_type_script_lang_js_ = ({
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
  data: function data() {
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
// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_PulseLoadervue_type_script_lang_js_ = (PulseLoadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./node_modules/vue-spinner/src/PulseLoader.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("671b")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_PulseLoadervue_type_script_lang_js_,
  PulseLoadervue_type_template_id_7dc0198c_render,
  PulseLoadervue_type_template_id_7dc0198c_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var PulseLoader = (component.exports);
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
    PulseLoader: PulseLoader
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
// CONCATENATED MODULE: ./src/components/chats/assets/typing.vue



function typing_injectStyles (context) {
  
  var style0 = __webpack_require__("1b86")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var typing_component = Object(componentNormalizer["a" /* default */])(
  assets_typingvue_type_script_lang_js_,
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

/***/ "1259":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3459");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("919c9172", content, shadowRoot)
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

/***/ "2122":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_2120d13f_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c046");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_2120d13f_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_2120d13f_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_2120d13f_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_style_index_0_id_2120d13f_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "3459":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@-webkit-keyframes v-pulseStretchDelay{0%,80%{transform:scale(1);-webkit-opacity:1;opacity:1}45%{transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{transform:scale(1);-webkit-opacity:1;opacity:1}45%{transform:scale(.1);-webkit-opacity:.7;opacity:.7}}", ""]);
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

/***/ "671b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_style_loader_index_js_ref_6_oneOf_1_0_css_loader_dist_cjs_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_postcss_loader_src_index_js_ref_6_oneOf_1_3_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1259");
/* harmony import */ var _vue_style_loader_index_js_ref_6_oneOf_1_0_css_loader_dist_cjs_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_postcss_loader_src_index_js_ref_6_oneOf_1_3_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_style_loader_index_js_ref_6_oneOf_1_0_css_loader_dist_cjs_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_postcss_loader_src_index_js_ref_6_oneOf_1_3_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vue_style_loader_index_js_ref_6_oneOf_1_0_css_loader_dist_cjs_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_postcss_loader_src_index_js_ref_6_oneOf_1_3_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vue_style_loader_index_js_ref_6_oneOf_1_0_css_loader_dist_cjs_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_postcss_loader_src_index_js_ref_6_oneOf_1_3_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_PulseLoader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "7464":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c8ae");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_black_sass_vue_type_style_index_2_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "9330":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9d33");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_index_sass_vue_type_style_index_0_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "94d3":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-2120d13f]{width:100%;top:0;z-index:999}.aboutContact[data-v-2120d13f]{position:absolute;left:0;right:0;top:100px;bottom:0;z-index:999;background:#fff}[data-v-2120d13f] #maincontent .headerSpacerWrapper{bottom:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9873":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=white] #topheader.minimized.fix[data-v-f530990e]{background:transparent}#matrix-root[theme=white] .donationModalBody span[data-v-f530990e]{color:#12488a}#matrix-root[theme=white] .donationModalBody input[data-v-f530990e],#matrix-root[theme=white] .donationModalBody select[data-v-f530990e]{border:1px solid #12488a}#matrix-root[theme=white] .donationModalBody input.disabled[data-v-f530990e],#matrix-root[theme=white] .donationModalBody select.disabled[data-v-f530990e]{color:rgba(176,191,198,.8);border:1px solid rgba(176,191,198,.5)}#matrix-root[theme=white] .donationModalBody .error[data-v-f530990e]{color:#ff0c39}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9bcc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e994");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_theme_white_sass_vue_type_style_index_1_id_f530990e_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "9d33":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fb61");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6d459b14", content, shadowRoot)
};

/***/ }),

/***/ "a79d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var NativePromise = __webpack_require__("fea9");
var fails = __webpack_require__("d039");
var getBuiltIn = __webpack_require__("d066");
var speciesConstructor = __webpack_require__("4840");
var promiseResolve = __webpack_require__("cdf9");
var redefine = __webpack_require__("6eeb");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


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

/***/ "c046":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("94d3");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("31c7092c", content, shadowRoot)
};

/***/ }),

/***/ "c8ae":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d84c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("e4b8e57c", content, shadowRoot)
};

/***/ }),

/***/ "d84c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#matrix-root[theme=black] #topheader.minimized.fix[data-v-f530990e]{background:transparent}#matrix-root[theme=black] .donationModalBody span[data-v-f530990e]{color:#12488a}#matrix-root[theme=black] .donationModalBody input[data-v-f530990e],#matrix-root[theme=black] .donationModalBody select[data-v-f530990e]{border:1px solid #12488a}#matrix-root[theme=black] .donationModalBody input.disabled[data-v-f530990e],#matrix-root[theme=black] .donationModalBody select.disabled[data-v-f530990e]{color:rgba(176,191,198,.8);border:1px solid rgba(176,191,198,.5)}#matrix-root[theme=black] .donationModalBody .error[data-v-f530990e]{color:#ff0c39}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e994":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9873");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("238ef5e2", content, shadowRoot)
};

/***/ }),

/***/ "ee79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"485f467a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chat.vue?vue&type=template&id=2120d13f&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chat"},[_c('topheader',{staticClass:"topheader",attrs:{"u":_vm.u,"chat":_vm.chat},on:{"addMember":_vm.addMemberModal}}),(!_vm.roomInfo)?_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('chat',{attrs:{"u":_vm.u,"chat":_vm.chat},on:{"sending":_vm.sending,"newchat":_vm.newchat,"getEvents":_vm.eventsRoom}})]},proxy:true}],null,false,2636658855)}):_vm._e(),(_vm.openInviteModal)?_c('modal',{on:{"close":_vm.closeModal},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('span',[_vm._v("Invite User")])]},proxy:true},{key:"body",fn:function(){return [_c('contacts',{attrs:{"mode":"inviteUsers","chatRoomId":_vm.chat.roomId},on:{"closeModal":_vm.closeContactModal}})]},proxy:true},{key:"footer",fn:function(){return undefined},proxy:true}],null,false,1239787889)}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=template&id=2120d13f&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/components/chat/index.vue + 44 modules
var chat = __webpack_require__("b163");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"485f467a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/topheader/index.vue?vue&type=template&id=f530990e&scoped=true&
var topheadervue_type_template_id_f530990e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatTopheader"}},[(_vm.chat || _vm.u)?_c('topheader',{scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"back"}})]},proxy:true},{key:"info",fn:function(){return [(_vm.chat)?_c('router-link',{attrs:{"to":'chatInfo?id=' + _vm.chat.roomId}},[(_vm.m_chat)?_c('div',[_c('div',{staticClass:"nameWrapper"},[(!_vm.roomInfo)?_c('chatName',{attrs:{"preview":true,"chat":_vm.chat,"m_chat":_vm.m_chat}}):_vm._e(),(_vm.roomMuted)?_c('div',{staticClass:"roomMuted"},[_c('i',{staticClass:"fas fa-bell-slash"})]):_vm._e()],1),_c('transition',{attrs:{"name":"fade"}},[(_vm.m_chat_typing)?_c('chatTyping'):_vm._e()],1)],1):_vm._e(),(!_vm.m_chat && _vm.userinfo)?_c('div',[_c('span',{staticClass:"nameline"},[_vm._v(_vm._s(_vm.userinfo.name))])]):_vm._e()]):_vm._e()]},proxy:true},{key:"right",fn:function(){return [(_vm.chat)?_c('router-link',{attrs:{"to":'chatInfo?id=' + _vm.chat.roomId}},[_c('div',{staticClass:"iconbutton"},[_c('i',{staticClass:"fas fa-ellipsis-h"})])]):_vm._e()]},proxy:true}],null,false,739412723)}):_vm._e(),(_vm.donateUserOpened)?_c('modal',{on:{"close":_vm.closeDonateModal},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('span',[_vm._v("Donate")])]},proxy:true},{key:"body",fn:function(){return [_c('div',{staticClass:"donationModalBody"},[_c('span',[_vm._v("Source")]),_c('input',{staticClass:"disabled",attrs:{"type":"text","value":"Account Address","disabled":true}}),_c('span',[_vm._v("Amount")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.donationAmount),expression:"donationAmount",modifiers:{"number":true}}],attrs:{"type":"number","disabled":_vm.sending},domProps:{"value":(_vm.donationAmount)},on:{"keyup":function($event){return _vm.resetDonation()},"input":function($event){if($event.target.composing){ return; }_vm.donationAmount=_vm._n($event.target.value)},"blur":function($event){return _vm.$forceUpdate()}}}),_c('span',[_vm._v("Receiver")]),_c('input',{staticClass:"disabled",attrs:{"type":"text","disabled":true},domProps:{"value":(_vm.receiver) ? _vm.receiver.name : ''}}),_c('span',[_vm._v("Message")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.donationMessage),expression:"donationMessage"}],attrs:{"type":"text","placeholder":"Your message","disabled":_vm.sending},domProps:{"value":(_vm.donationMessage)},on:{"input":function($event){if($event.target.composing){ return; }_vm.donationMessage=$event.target.value}}}),(_vm.showFeesError && _vm.showFeesError == 'money')?_c('span',{staticClass:"error"},[_vm._v("Balance too low")]):(_vm.showFeesError)?_c('span',{staticClass:"error"},[_vm._v("Error, can't calculate the fees")]):_vm._e(),(_vm.calculatingFees != true)?_c('button',{staticClass:"button small",attrs:{"disabled":!_vm.donationAmount || _vm.calculatedFees != null},on:{"click":_vm.onCalculateFeesClick}},[_c('i',{staticClass:"fas fa-chevron-circle-right"}),_vm._v(" Calculate Fees ")]):_vm._e(),(_vm.calculatingFees == true)?_c('div',{staticClass:"linepreloader"},[_c('linepreloader')],1):_vm._e()]),(_vm.calculatedFees != null)?_c('div',{staticClass:"donationModalBody"},[_c('span',[_vm._v("Include Fees in Amount")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.feesDirection),expression:"feesDirection"}],attrs:{"disabled":_vm.sending},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.feesDirection=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.feesDirectionPossibleValues),function(feeDirection){return _c('option',{domProps:{"value":feeDirection.value}},[_vm._v(" "+_vm._s(feeDirection.label)+" ")])}),0),_c('span',[_vm._v("Transaction Fees")]),_c('input',{staticClass:"disabled",attrs:{"type":"number","disabled":true},domProps:{"value":_vm.calculatedFees}}),_c('span',[_vm._v("Total amount")]),_c('span',{staticClass:"totalAmount"},[_vm._v(_vm._s(+_vm.totalDonationAmount.toFixed(5))+" PKOIN")]),(_vm.showTransactionError && _vm.showTransactionError == 'balance too low')?_c('span',{staticClass:"error"},[_vm._v("Balance too low")]):(_vm.showTransactionError)?_c('span',{staticClass:"error"},[_vm._v("Error, can't make the transaction")]):_vm._e(),(_vm.sending != true)?_c('button',{staticClass:"button small",attrs:{"disabled":_vm.sending},on:{"click":_vm.sendDonation}},[_c('i',{staticClass:"fas fa-arrow-alt-circle-right"}),_vm._v(" Send ")]):_vm._e(),(_vm.sending == true)?_c('div',{staticClass:"linepreloader"},[_c('linepreloader')],1):_vm._e()]):_vm._e()]},proxy:true},{key:"footer",fn:function(){return undefined},proxy:true}],null,false,3274686846)}):_vm._e()],1)}
var topheadervue_type_template_id_f530990e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue?vue&type=template&id=f530990e&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("a34a");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

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
      },
      /*{
        click: "LeaveFromRoom",
        title: "Leave and Delete",
        icon: "fas fa-sign-out-alt"
      },*/
      {
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
        }

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
        var _self = this;

        this.core.mtrx.client.leave(this.chat.roomId).then(function (r) {
          _this3.core.mtrx.client.forget(_this3.chat.roomId, true).then(function (r) {
            _this3.$store.commit('DELETE_ROOM', _this3.chat.roomId);
          }).then(function (r) {
            _this3.$router.push({
              path: '/chats'
            });
          });
        });
        this.$refs.dropdownMenu.hidePopup();
      }

      if (item.click === 'BanRoom') {
        var banUserId = '';
        var banUser = this.findOtherUser();
        if (banUser && banUser.userId) banUserId = banUser.userId;
        var roomID = this.chat.roomId;
        this.core.mtrx.client.ban(roomID, banUserId, 'ban').then(function (r) {});
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
        // Check parameters
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
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chat/topheader/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("9330")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("9bcc")
if (style1.__inject__) style1.__inject__(context)
var style2 = __webpack_require__("7464")
if (style2.__inject__) style2.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chat_topheader_vue_type_script_lang_js_,
  topheadervue_type_template_id_f530990e_scoped_true_render,
  topheadervue_type_template_id_f530990e_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "f530990e",
  null
  ,true
)

/* harmony default export */ var topheader = (component.exports);
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
//
//
//




/* harmony default export */ var chatvue_type_script_lang_js_ = ({
  name: 'pagechat',
  components: {
    chat: chat["a" /* default */],
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
    sending: function sending() {},
    eventsRoom: function eventsRoom(data) {
      this.events = data;
    }
  }
});
// CONCATENATED MODULE: ./src/views/chat.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_chatvue_type_script_lang_js_ = (chatvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/chat.vue



function chat_injectStyles (context) {
  
  var style0 = __webpack_require__("2122")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  views_chatvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  chat_injectStyles,
  "2120d13f",
  null
  ,true
)

/* harmony default export */ var views_chat = __webpack_exports__["default"] = (chat_component.exports);

/***/ }),

/***/ "fb61":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".nameWrapper[data-v-f530990e]{display:flex;align-items:center;justify-content:center}.roomMuted[data-v-f530990e]{margin-left:3px}.roomMuted i[data-v-f530990e]{font-size:.7em}.editButton[data-v-f530990e]{display:flex;justify-content:center;align-items:center}.editButton i[data-v-f530990e]{font-size:1.5em}.nameline[data-v-f530990e]{max-width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#topheader.minimized.fix[data-v-f530990e]{background:transparent;overflow:inherit}.donationModalBody[data-v-f530990e]{padding:1em;display:flex;flex-direction:column}.donationModalBody span[data-v-f530990e]{color:#12488a}.donationModalBody input[data-v-f530990e],.donationModalBody select[data-v-f530990e]{margin-top:.5em;margin-bottom:1.5em;border:1px solid #12488a;border-radius:3px;padding:.5em}.donationModalBody input.disabled[data-v-f530990e],.donationModalBody select.disabled[data-v-f530990e]{color:rgba(176,191,198,.8);border:1px solid rgba(176,191,198,.5)}.donationModalBody button[data-v-f530990e]{margin-top:1em}.donationModalBody button i[data-v-f530990e]{margin-right:.2em}.donationModalBody .totalAmount[data-v-f530990e]{font-weight:700;margin-left:.5em;margin-top:.5em;margin-bottom:1em}.donationModalBody .error[data-v-f530990e]{color:#ff0c39;text-align:center}.donationModalBody .linepreloader[data-v-f530990e]{text-align:center;height:29px;margin-top:1em}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=matrix-element.2.js.map