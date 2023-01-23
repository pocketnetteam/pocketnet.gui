(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[15],{

/***/ "4fe8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"123a731a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/contact.vue?vue&type=template&id=3c9fd798&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page contact"},[(_vm.user)?_c('topheader',{attrs:{"contact":_vm.user}}):_vm._e(),_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.user)?_c('contact',{attrs:{"contact":_vm.user}}):_vm._e()]},proxy:true}])})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/contact.vue?vue&type=template&id=3c9fd798&scoped=true&

// EXTERNAL MODULE: ./src/components/contact/index.vue + 14 modules
var contact = __webpack_require__("d3ff");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"123a731a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/contact/topheader/index.vue?vue&type=template&id=1105f855&scoped=true&
var topheadervue_type_template_id_1105f855_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatsTopheader"}},[_c('topheader',{scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"back"}})]},proxy:true},{key:"info",fn:function(){return [_c('span',[_vm._v(_vm._s(_vm.contact.name))])]},proxy:true},{key:"right",fn:function(){return undefined},proxy:true}])})],1)}
var topheadervue_type_template_id_1105f855_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/contact/topheader/index.vue?vue&type=template&id=1105f855&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/contact/topheader?vue&type=script&lang=js&

/* harmony default export */ var topheader_vue_type_script_lang_js_ = ({
  name: "contactTopheader",
  props: {
    contact: Object
  },
  data: function () {
    return {
      loading: false
    };
  },
  created: () => {},
  watch: {//$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: state => state.auth
  }),
  methods: {}
});
// CONCATENATED MODULE: ./src/components/contact/topheader?vue&type=script&lang=js&
 /* harmony default export */ var contact_topheader_vue_type_script_lang_js_ = (topheader_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/contact/topheader/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("777a")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  contact_topheader_vue_type_script_lang_js_,
  topheadervue_type_template_id_1105f855_scoped_true_render,
  topheadervue_type_template_id_1105f855_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "1105f855",
  null
  ,true
)

/* harmony default export */ var topheader = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/contact.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var contactvue_type_script_lang_js_ = ({
  name: "pagecontact",
  components: {
    contact: contact["default"],
    topheader: topheader
  },
  computed: {
    user: function () {
      var id = this.$route.query.id;
      var contact = this.$store.state.users[id];
      return contact;
    },
    ...Object(vuex_esm["c" /* mapState */])({
      pocketnet: state => state.pocketnet,
      minimized: state => state.minimized
    })
  },
  methods: {},

  mounted() {
    var id = this.$route.query.id;
    this.core.user.usersInfo(id).then(r => {});
  }

});
// CONCATENATED MODULE: ./src/views/contact.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_contactvue_type_script_lang_js_ = (contactvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/contact.vue



function contact_injectStyles (context) {
  
  
}

/* normalize component */

var contact_component = Object(componentNormalizer["a" /* default */])(
  views_contactvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  contact_injectStyles,
  "3c9fd798",
  null
  ,true
)

/* harmony default export */ var views_contact = __webpack_exports__["default"] = (contact_component.exports);

/***/ }),

/***/ "777a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1105f855_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9a6c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1105f855_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1105f855_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1105f855_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1105f855_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "8b2b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9a6c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8b2b");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("39e61b36", content, shadowRoot)
};

/***/ })

}]);
//# sourceMappingURL=matrix-element.15.js.map