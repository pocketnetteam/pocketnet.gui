(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[13],{

/***/ "0134":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("84fc");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("27e4a363", content, shadowRoot)
};

/***/ }),

/***/ "84fc":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatsTopheader .infoPart[data-v-7e415cec]{flex-grow:4!important}#chatsTopheader .rightIcons[data-v-7e415cec]{flex-grow:1!important;height:30px}#chatsTopheader .inviteButton[data-v-7e415cec]{background-color:rgb(var(--color-bg-orange));color:#fff;width:100%;height:34px;font-size:.9em;border-radius:.2em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "aa56":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("bc35");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("c43c630e", content, shadowRoot)
};

/***/ }),

/***/ "bc35":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-4ce8a828]{top:0;z-index:999}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bfc0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"123a731a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/contacts.vue?vue&type=template&id=4ce8a828&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page contacts"},[_c('topheader',{staticClass:"topheader",attrs:{"title":_vm.title}}),_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [_c('contacts',{attrs:{"mode":_vm.mode}})]},proxy:true}])})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/contacts.vue?vue&type=template&id=4ce8a828&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"123a731a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/contacts/topheader/index.vue?vue&type=template&id=7e415cec&scoped=true&
var topheadervue_type_template_id_7e415cec_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chatsTopheader"}},[_c('topheader',{attrs:{"sideSlotsWidth":100},scopedSlots:_vm._u([{key:"left",fn:function(){return [((!_vm.minimized || _vm.active) && _vm.pocketnet)?_c('div',{staticClass:"iconbutton",on:{"click":_vm.minimizeall}},[_c('i',{staticClass:"fas fa-times"})]):_vm._e()]},proxy:true},{key:"info",fn:function(){return [_c('span',[_vm._v(_vm._s(_vm.title))])]},proxy:true},{key:"right",fn:function(){return undefined},proxy:true}])})],1)}
var topheadervue_type_template_id_7e415cec_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/contacts/topheader/index.vue?vue&type=template&id=7e415cec&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/contacts/topheader?vue&type=script&lang=js&

/* harmony default export */ var topheader_vue_type_script_lang_js_ = ({
  name: "contactsTopheader",
  props: {
    title: {
      type: String,
      default: "Contacts" // default : this.$i18n.t("caption.contacts")

    }
  },
  data: function () {
    return {
      loading: false
    };
  },
  watch: {//$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: state => state.auth,
    minimized: state => state.minimized,
    pocketnet: state => state.pocketnet,
    active: state => state.active
  }),
  methods: {
    minimizeall: function () {
      this.$store.commit("minimize", true);
      this.$router.push("/chats").catch(e => {});
    }
  }
});
// CONCATENATED MODULE: ./src/components/contacts/topheader?vue&type=script&lang=js&
 /* harmony default export */ var contacts_topheader_vue_type_script_lang_js_ = (topheader_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/contacts/topheader/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("cbee")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  contacts_topheader_vue_type_script_lang_js_,
  topheadervue_type_template_id_7e415cec_scoped_true_render,
  topheadervue_type_template_id_7e415cec_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "7e415cec",
  null
  ,true
)

/* harmony default export */ var topheader = (component.exports);
// EXTERNAL MODULE: ./src/components/contacts/index.vue + 4 modules
var contacts = __webpack_require__("71da");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/contacts.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var contactsvue_type_script_lang_js_ = ({
  name: "pagecontacts",
  data: function () {
    return {
      page: "Contacts",
      showInviteButton: false
    };
  },
  components: {
    contacts: contacts["a" /* default */],
    topheader: topheader
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    title: function () {
      if (this.$route.query.startnew) return this.$i18n.t("caption.startNewChat");
      return this.$i18n.t("caption.contacts");
    },
    mode: function () {
      if (this.$route.query.startnew) {
        return "GroupsCreate";
      }

      return this.page;
    }
  }),
  methods: {},

  mounted() {
    this.$store.commit("SET_LAST_ROOM", null);
  }

});
// CONCATENATED MODULE: ./src/views/contacts.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_contactsvue_type_script_lang_js_ = (contactsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/contacts.vue



function contacts_injectStyles (context) {
  
  var style0 = __webpack_require__("f069")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var contacts_component = Object(componentNormalizer["a" /* default */])(
  views_contactsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  contacts_injectStyles,
  "4ce8a828",
  null
  ,true
)

/* harmony default export */ var views_contacts = __webpack_exports__["default"] = (contacts_component.exports);

/***/ }),

/***/ "cbee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_7e415cec_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0134");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_7e415cec_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_7e415cec_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_7e415cec_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_7e415cec_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f069":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_contacts_vue_vue_type_style_index_0_id_4ce8a828_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aa56");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_contacts_vue_vue_type_style_index_0_id_4ce8a828_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_contacts_vue_vue_type_style_index_0_id_4ce8a828_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_contacts_vue_vue_type_style_index_0_id_4ce8a828_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_contacts_vue_vue_type_style_index_0_id_4ce8a828_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);
//# sourceMappingURL=matrix-element.13.js.map