(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[4],{

/***/ "2d53":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("60d4");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("2955699e", content, shadowRoot)
};

/***/ }),

/***/ "4779":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"da79e258-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/teamroom.vue?vue&type=template&id=2458fdfe&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chats"},[_c('topheader',{staticClass:"topheader",scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"chats"}})]},proxy:true},{key:"info",fn:function(){return [_c('span',{staticClass:"nameline"},[_vm._v("Bastyon")])]},proxy:true}])}),_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('div',{attrs:{"id":"messagesWrapper"}},_vm._l((_vm.messages),function(message){return _c('div',{key:message,staticClass:"message"},_vm._l((message),function(phrase){return _c('div',{key:phrase},[(phrase.type == 'title')?_c('h1',[_vm._v(" "+_vm._s(phrase.value)+" ")]):_vm._e(),(phrase.type == 'message')?_c('span',[_vm._v(" "+_vm._s(phrase.value)+" ")]):_vm._e(),(phrase.type == 'list')?_c('ul',_vm._l((phrase.value),function(el){return _c('li',{key:el},[_vm._v(" "+_vm._s(el)+" ")])}),0):_vm._e(),(phrase.type == 'button')?_c('div',{staticClass:"buttonDiv"},[_c('router-link',{staticClass:"buttonTeam",attrs:{"to":phrase.url,"tag":"button"}},[_vm._v(" "+_vm._s(phrase.value)+" "),(phrase.logo)?_c('i',{class:phrase.logo}):_vm._e()])],1):_vm._e()])}),0)}),0)]},proxy:true}])})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/teamroom.vue?vue&type=template&id=2458fdfe&scoped=true&

// EXTERNAL MODULE: ./src/components/assets/topheader/index.vue + 4 modules
var topheader = __webpack_require__("08da");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/teamroom.vue?vue&type=script&lang=js&
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
//


/* harmony default export */ var teamroomvue_type_script_lang_js_ = ({
  name: 'teamroom',
  components: {
    topheader: topheader["a" /* default */]
  },
  props: {},
  data: function data() {
    return {
      messages: []
    };
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    minimized: function minimized(state) {
      return state.minimized;
    }
  }),
  methods: {},
  mounted: function mounted() {
    this.messages = this.$t('teamMessages');
  }
});
// CONCATENATED MODULE: ./src/views/teamroom.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_teamroomvue_type_script_lang_js_ = (teamroomvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/teamroom.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("d47c")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_teamroomvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "2458fdfe",
  null
  ,true
)

/* harmony default export */ var teamroom = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "60d4":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-2458fdfe]{top:0;z-index:999}#messagesWrapper[data-v-2458fdfe]{display:flex;flex-direction:column-reverse}#messagesWrapper .message[data-v-2458fdfe]{padding:1em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#messagesWrapper .message h1[data-v-2458fdfe]{color:#02061a;text-align:center}#messagesWrapper .message .buttonDiv[data-v-2458fdfe]{margin-top:1.5em;margin-bottom:1em}#messagesWrapper .message .buttonDiv .buttonTeam[data-v-2458fdfe]{background-color:#ff4800;color:#fff;width:100%;height:34px;font-size:.9em;border-radius:30px;position:relative}#messagesWrapper .message .buttonDiv .buttonTeam[data-v-2458fdfe]:hover{cursor:pointer}#messagesWrapper .message .buttonDiv .buttonTeam i[data-v-2458fdfe]{position:absolute;right:0;top:0;line-height:34px;width:50px;text-align:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "d47c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_2458fdfe_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2d53");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_2458fdfe_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_2458fdfe_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_2458fdfe_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_2458fdfe_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);
//# sourceMappingURL=matrix-element.4.js.map