(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[13],{

/***/ "1905":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("5854");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("2d1bf12c", content, shadowRoot)
};

/***/ }),

/***/ "285a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_68c7ee2f_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1905");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_68c7ee2f_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_68c7ee2f_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_68c7ee2f_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_68c7ee2f_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "42cd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/user/view/pnuser/index.vue?vue&type=template&id=975d943a&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    class: {
      isBlocked: _vm.blocked
    },
    attrs: {
      "id": "userViewPnuser"
    }
  }, [_vm.userinfo.keys && _vm.userinfo.keys.length ? _c('div', {
    staticClass: "haskeys"
  }, [_c('i', {
    staticClass: "fas fa-lock"
  })]) : _vm._e(), _c('div', {
    staticClass: "name"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.userinfo.name) + " ")])]), _c('div', {
    staticClass: "imageWrapper"
  }, [_c('userpic', {
    attrs: {
      "mode": "Contact",
      "userinfo": _vm.userinfo,
      "blocked": _vm.blocked
    }
  })], 1), _vm.activeuser.id != _vm.userinfo.id ? _c('div', {
    staticClass: "gotoprofile"
  }, [_c('button', {
    staticClass: "button small black rounded",
    on: {
      "click": _vm.gotopocketnetprofile
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.goToPocketnetProfile")) + " ")])]) : _vm._e(), _c('div', {
    staticClass: "info"
  }, [_vm.userinfo.source ? _c('div', {
    staticClass: "infoPart"
  }, [_c('div', {
    staticClass: "label"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.followers")) + " ")])]), _c('div', {
    staticClass: "value"
  }, [_c('span', [_vm._v(_vm._s(_vm.userinfo.source.subscribers_count))])])]) : _vm._e(), _vm.userinfo.source && _vm.userinfo.source.reputation.toFixed ? _c('div', {
    staticClass: "infoPart"
  }, [_c('div', {
    staticClass: "label"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.reputation")) + " ")])]), _c('div', {
    staticClass: "value"
  }, [_c('span', [_vm._v(_vm._s(_vm.userinfo.source.reputation.toFixed(1)))])])]) : _vm._e(), _vm.userinfo.source ? _c('div', {
    staticClass: "infoPart"
  }, [_c('div', {
    staticClass: "label"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.following")) + " ")])]), _c('div', {
    staticClass: "value"
  }, [_c('span', [_vm._v(_vm._s(_vm.userinfo.source.subscribes_count))])])]) : _vm._e()])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/user/view/pnuser/index.vue?vue&type=template&id=975d943a&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/user/view/pnuser?vue&type=script&lang=js&

/* harmony default export */ var pnuser_vue_type_script_lang_js_ = ({
  name: "userViewPnuser",
  props: {
    userinfo: Object,
    blocked: false
  },
  data: function () {
    return {
      loading: false
    };
  },
  created: () => {},
  watch: {
    //$route: 'getdata'
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: state => state.auth,
    activeuser: function () {
      return this.core.user.userinfo;
    },
    href: function () {
      var domain = window.pocketnetdomain || "pocketnet.app";
      return "https://" + domain + "/" + this.userinfo.source.name;
    }
  }),
  methods: {
    gotopocketnetprofile: function () {
      if (this.core.backtoapp) this.core.backtoapp(this.href);else window.open(this.href, "_blank");
    }
  }
});
// CONCATENATED MODULE: ./src/components/user/view/pnuser?vue&type=script&lang=js&
 /* harmony default export */ var view_pnuser_vue_type_script_lang_js_ = (pnuser_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/user/view/pnuser/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("bcad")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  view_pnuser_vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "975d943a",
  null
  ,true
)

/* harmony default export */ var pnuser = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "492c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".name[data-v-975d943a]{text-align:center}.name span[data-v-975d943a]{font-size:2em;font-weight:100}.gotoprofile[data-v-975d943a]{text-align:center;padding:1em;padding-top:0}.imageWrapper[data-v-975d943a]{padding:1em 0;padding-top:0;max-width:120px;margin:0 auto}.info[data-v-975d943a]{display:flex;padding:.5em;width:95%;border-radius:35px;background:rgb(var(--background-total-theme));margin:0 auto;margin-bottom:.5em;box-shadow:0 5px 5px -3px rgba(var(--color-shadow-base),.4)}.info .infoPart[data-v-975d943a]{width:33.3%;padding:.5em;text-align:center}.info .infoPart span[data-v-975d943a]{font-size:.8em}.info .infoPart .value[data-v-975d943a]{font-size:1.3em;font-weight:700}[data-v-975d943a] .userpic{width:120px;height:120px;line-height:120px;margin:0 auto}.haskeys[data-v-975d943a]{position:absolute;left:.5em;top:.5em;color:rgb(var(--color-good))}.haskeys i[data-v-975d943a]{font-size:.8em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "5854":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".caption[data-v-68c7ee2f]{padding:1em}.caption span[data-v-68c7ee2f]{font-size:1.5em;font-weight:700}.tip[data-v-68c7ee2f]{padding:1.5em;text-align:center}.tip span[data-v-68c7ee2f]{font-size:.8em}.blocked[data-v-68c7ee2f]{width:100%;text-align:center}.blocked span[data-v-68c7ee2f]{font-size:.9em}.joinAction[data-v-68c7ee2f]{position:fixed;bottom:0;left:0;right:0;background:rgb(var(--neutral-grad-0));padding:1em 0;text-align:center;z-index:3}.joinAction.bin[data-v-68c7ee2f]{position:sticky}.joinAction .actions[data-v-68c7ee2f]{display:flex}.joinAction .actions .action[data-v-68c7ee2f]{padding:.5em;flex-grow:1}.joinAction .actions .action button[data-v-68c7ee2f]{min-width:0;width:100%}.my-swipe[data-v-68c7ee2f]{height:200px;font-size:30px;text-align:center}.my-swipe[data-v-68c7ee2f],.slide1[data-v-68c7ee2f]{color:rgb(var(--text-on-bg-ac-color))}.slide1[data-v-68c7ee2f]{background-color:rgb(var(--color-bg-ac))}.slide2[data-v-68c7ee2f]{background-color:rgb(var(--color-bg-orange));color:#000}.slide3[data-v-68c7ee2f]{background-color:rgb(var(--color-bg-ac-2));color:rgb(var(--text-on-bg-ac-color))}.minimized:not(.active) .caption[data-v-68c7ee2f]{width:52px;text-align:center}.minimized:not(.active) .caption span[data-v-68c7ee2f]{color:rgb(var(--color-txt-ac));font-size:.6em}.minimized:not(.active) .chatPreview[data-v-68c7ee2f],.minimized:not(.active) .joinAction[data-v-68c7ee2f]{display:none}.minimized[data-v-68c7ee2f]:not(.active) .userinfoWrapper{background:transparent!important;box-shadow:none}.minimized[data-v-68c7ee2f]:not(.active) .haskeys{display:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "621d":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("af38");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5e52503b", content, shadowRoot)
};

/***/ }),

/***/ "6eba":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".roomStatusView[data-v-2894938c]{height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center}.roomStatusView .statusViewIcon i[data-v-2894938c]{color:rgb(var(--color-txt-ac));font-size:5em}.roomStatusView .text[data-v-2894938c]{margin:40px 0;color:rgb(var(--color-txt-ac))}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7f89":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9c0c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("35bcfe56", content, shadowRoot)
};

/***/ }),

/***/ "8458":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_127f4274_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f89");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_127f4274_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_127f4274_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_127f4274_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_127f4274_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "86d6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("6eba");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("9fc04850", content, shadowRoot)
};

/***/ }),

/***/ "891a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b022");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3081b22c", content, shadowRoot)
};

/***/ }),

/***/ "9c0c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".attachements[data-v-127f4274]{position:absolute;left:0;top:0;right:0;padding:.5em .5em;overflow-y:scroll}.attachements .attachementsWrapper[data-v-127f4274]{display:flex;align-items:center;flex-wrap:nowrap;flex-grow:1;flex-direction:row;margin-right:.5em;min-width:120px}.joinwrapper[data-v-127f4274]{position:absolute;left:0;top:0;bottom:0;right:0;padding-bottom:0;overflow-x:scroll}.cantchatmessage[data-v-127f4274]{padding:2em}.cantchatmessage .proceed[data-v-127f4274]{padding-top:1em}.cantchatmessage .proceed button[data-v-127f4274]{padding-left:0}.cantchatmessage .refresh[data-v-127f4274]{padding-top:2em}.cantchatmessage .msg[data-v-127f4274]{font-size:.8em}.encryptedInfo[data-v-127f4274]{position:relative;z-index:9999;display:flex;justify-content:center;align-items:center;flex-direction:column}.encryptedInfo #slide[data-v-127f4274]{padding:0 .5em;position:absolute;left:-180px;top:0;background:rgb(var(--background-main));color:rgb(var(--text-color));border-bottom-right-radius:8px;border-top-right-radius:8px;-webkit-animation:slide-127f4274 .1s forwards;-webkit-animation-delay:.3s;animation:slide-127f4274 .1s forwards;animation-delay:.3s;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}@keyframes slide-127f4274{to{left:0}}.encryptedInfo button[data-v-127f4274]{cursor:pointer;display:flex;align-items:center;justify-content:flex-start;text-align:left}.encryptedInfo button i[data-v-127f4274]{margin-right:5px}.encryptedInfo .encryptedTxtIcon[data-v-127f4274]{flex-direction:column;align-items:center;justify-content:center;padding:.25em .25em;text-align:center}.encryptedInfo .encryptedTxtIcon span[data-v-127f4274]{color:rgb(var(--color-good));font-size:.8em}.encryptedInfo .encryptedTxtIcon i[data-v-127f4274]{color:rgb(var(--color-good));display:none}.blockedcaption[data-v-127f4274]{text-align:center}.blockedcaption span[data-v-127f4274]{font-size:.8em}.relationEvent[data-v-127f4274]{display:flex;align-items:flex-end;width:100%}.relationEvent .relationEventWrapper[data-v-127f4274]{padding-bottom:1em}.relationEvent .relationEventCaption[data-v-127f4274]{padding:1em 0;padding-bottom:.5em}.relationEvent .relationEventCaption span[data-v-127f4274]{font-size:.8em;font-weight:700;color:rgb(var(--color-txt-ac))}.relationEvent .relationEventPreview[data-v-127f4274]{flex-grow:1;padding:0 1em;padding-top:0}.relationEvent[data-v-127f4274] .previewMessage{font-size:.9em}.relationEvent .relationEventActions[data-v-127f4274]{width:55px;min-width:55px}.relationEvent .relationEventActions .item[data-v-127f4274]{width:100%;padding:.5em 0;cursor:pointer;text-align:center}.chatInputWrapper[data-v-127f4274]{position:fixed;z-index:3;bottom:-1px;background:transparent;left:0;right:0;padding-bottom:35px;background:rgb(var(--background-total-theme));will-change:transform;transform:translate3d(0,calc(var(--keyboardheight, 0)*-1 - -1px),0);transition:.3s}.chatInputWrapper.bin[data-v-127f4274]{position:absolute;left:1px;right:1px;bottom:0;border-radius:5px}#chat.minimized .chatInputWrapper[data-v-127f4274]{opacity:0;padding-bottom:0}#chat.minimized:not(.active) .statusWrapper[data-v-127f4274]{width:33px}#chat.minimized:not(.active) .statusWrapper i[data-v-127f4274]{color:rgb(var(--color-txt-ac))}#chat.minimized:not(.active) .statusWrapper i span[data-v-127f4274]{display:none}#chat.minimized:not(.active) .statusWrapper .messageRow[data-v-127f4274]{padding:0!important;background:transparent!important}#chat.minimized:not(.active) .statusWrapper .event[data-v-127f4274]{padding-bottom:.5em}#chat.minimized:not(.active) .statusWrapper #events[data-v-127f4274]{transform:translate3d(.25em,30px,0)}#chat.minimized:not(.active) .statusWrapper .iconWrapper[data-v-127f4274]{margin-left:0!important}#chat.minimized:not(.active) .statusWrapper [my=true][data-v-127f4274]{justify-content:flex-start}#chat.minimized:not(.active) .statusWrapper [my=true] .iconWrapper[data-v-127f4274]{margin-left:0!important;order:-1;align-self:flex-end}#chat.minimized:not(.active) .statusWrapper .actionsWrapper[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .filePreview[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .labelwrapper[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .linkPreview[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .maxcontent[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .messageImg[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .timeWrapper[data-v-127f4274],#chat.minimized:not(.active) .statusWrapper .userpic[data-v-127f4274]:after{display:none}#chat.minimized.active[data-v-127f4274]{padding-bottom:90px}#chat.minimized.active .chatInputWrapper[data-v-127f4274]{opacity:1}.encrypted[data-v-127f4274]{position:absolute;left:0;top:0;z-index:2;color:rgb(var(--color-good));padding:.25em .5em}.encrypted i[data-v-127f4274]{font-size:.8em;cursor:pointer}.roomMuted[data-v-127f4274]{position:absolute;left:5px;top:20px;z-index:2;color:rgb(var(--neutral-grad-3))}.roomMuted i[data-v-127f4274]{font-size:.8em}.chatEmpty[data-v-127f4274]{padding:4em;text-align:center;color:rgb(var(--neutral-grad-3))}.chatEmpty span[data-v-127f4274]{font-size:.8em}.preview-wrapper[data-v-127f4274]{max-height:350px;overflow-y:auto;border:1px solid rgb(var(rgb(var(--neutral-grad-2))));border-radius:10px;margin:0 auto;width:98%}.preview-wrapper[data-v-127f4274]::-webkit-scrollbar{width:0!important}.shareEventsWrapper .cnt[data-v-127f4274]{background:rgb(var(--background-secondary-theme));border-radius:30px;padding:.5em 1em;max-width:622px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;font-size:.9em}.shareEventsWrapper .cnt i[data-v-127f4274]{margin-right:10px}.shareEventsWrapper .cnt i.fa-trash-alt[data-v-127f4274]{color:#f41a4d}.shareEventsWrapper .cnt i.fa-share-alt[data-v-127f4274]{color:#00a3f7}.shareEventsWrapper .cnt div[data-v-127f4274]{transition:.3s;opacity:.6;cursor:pointer;margin-left:1em;display:flex;align-items:center}.shareEventsWrapper .cnt div[data-v-127f4274]:hover{transition:.3s;opacity:1}.shareEventsWrapper .cnt div.cancel[data-v-127f4274]{margin-right:auto;margin-left:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "af38":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chatAttachement[data-v-bd3aba00]{height:90px;width:120px;border-radius:5px;overflow:hidden;position:relative;background:rgb(var(--background-secondary-theme))}#chatAttachement>div[data-v-bd3aba00]{width:100%;height:100%}.cancel[data-v-bd3aba00],.loading[data-v-bd3aba00]{position:absolute;height:90px;width:120px;line-height:90px;text-align:center;font-size:3em;left:0;top:0;background:rgba(var(--background-main),.8);color:rgba(var(--text-color),.2)}.cancel[data-v-bd3aba00]{background:transparent;font-size:1.2em;color:rgb(var(--text-color))}.file[data-v-bd3aba00]{text-align:center;font-size:.8em;padding-top:1em}.file span[data-v-bd3aba00]{white-space:normal}.file .fileicon i[data-v-bd3aba00]{opacity:.4;font-size:1.5em}.image[data-v-bd3aba00],.image .bgimage[data-v-bd3aba00]{width:100%;height:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "b022":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".userinfoWrapper[data-v-1eac96bc]{height:95%;width:100%;padding:2em .5em;background:rgba(var(--background-main),.4);border-radius:15px;position:relative;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}.previewWrapper .work[data-v-1eac96bc]{padding-bottom:.5em!important}.VueCarousel[data-v-1eac96bc]{width:100%}.filter[data-v-1eac96bc]{background-color:rgba(var(--color-shadow-base),.2)!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "b163":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/index.vue?vue&type=template&id=127f4274&scoped=true&
var render = function render() {
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
  }, [_vm.m_chat && _vm.membership === 'join' && _vm.ready ? _c('list', {
    key: _vm.key,
    ref: "list",
    attrs: {
      "error": _vm.error,
      "chat": _vm.m_chat,
      "searchresults": _vm.searchresults,
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
  }) : _vm._e(), _vm.m_chat && _vm.membership === 'invite' ? _c('div', {
    staticClass: "joinwrapper"
  }, [_c('join', {
    attrs: {
      "m_chat": _vm.m_chat,
      "chat": _vm.chat,
      "usersinfo": _vm.usersinfo
    },
    on: {
      "creatorLeft": _vm.brokenInvitedRoom
    }
  })], 1) : _vm._e(), !_vm.m_chat && _vm.usersinfo && _vm.usersinfo.length ? _c('div', {
    staticClass: "chatEmpty"
  }, [_c('span', [_vm._v(_vm._s(_vm.$t("caption.startChatWith")) + " " + _vm._s(_vm.usersinfoNames()))])]) : _vm._e(), !_vm.m_chat || _vm.membership === 'join' ? _c('div', {
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
  }, [_c('span', [_vm._v("You have blocked this user")])]) : _vm._e()], 1)]) : _vm._e(), _vm.encrypted && _vm.membership != 'invite' ? _c('div', {
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
  }), 1)]) : _vm._e()], 1), _vm.roomUserBanned ? _c('userRoomStatus', {
    attrs: {
      "chat": _vm.chat,
      "text": `You've have been banned in this room`
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/index.vue?vue&type=template&id=127f4274&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/chat/list/index.vue + 9 modules
var list = __webpack_require__("4e29");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/join/index.vue?vue&type=template&id=68c7ee2f&scoped=true&
var joinvue_type_template_id_68c7ee2f_scoped_true_render = function render() {
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
  }, [!_vm.creatorLeft ? _c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.chatInvite")) + " ")]) : _vm._e(), _vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.cantJoin")))]) : _vm._e()])]), !_vm.blockedCheck ? _c('div', {
    staticClass: "tip"
  }, [!_vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.chatInviteDecline")))]) : _vm._e(), _vm.creatorLeft ? _c('span', [_vm._v(_vm._s(_vm.$t("caption.creatorLeft")))]) : _vm._e()]) : _vm._e(), _c('chatPreview', {
    attrs: {
      "usersinfo": _vm.usersinfo,
      "chat": _vm.chat,
      "m_chat": _vm.m_chat,
      "undefinedRoom": _vm.creatorLeft
    }
  }), !_vm.hiddenInParent ? _c('div', {
    staticClass: "joinAction fixedOnPageBottom",
    class: {
      bin: _vm.pocketnet,
      bout: !_vm.pocketnet
    }
  }, [_c('div', {
    staticClass: "work"
  }, [!_vm.blockedCheck ? _c('div', {
    staticClass: "actions"
  }, [!_vm.creatorLeft && !_vm.tetatet ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button black rounded",
    on: {
      "click": _vm.decline
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.decline")) + " ")])]) : _vm._e(), _vm.tetatet ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button black rounded",
    on: {
      "click": _vm.ignore
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.declineandignore")) + " ")])]) : _vm._e(), !_vm.creatorLeft ? _c('div', {
    staticClass: "action"
  }, [_c('button', {
    staticClass: "small button rounded",
    on: {
      "click": _vm.join
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.join")) + " ")])]) : _vm._e(), _vm.creatorLeft ? _c('div', {
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
var joinvue_type_template_id_68c7ee2f_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "blocked"
  }, [_c('span', [_vm._v("You have blocked this user")])]);
}];

// CONCATENATED MODULE: ./src/components/chat/join/index.vue?vue&type=template&id=68c7ee2f&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/preview/index.vue?vue&type=template&id=1eac96bc&scoped=true&
var previewvue_type_template_id_1eac96bc_scoped_true_render = function render() {
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
    }, [user.name ? _c('userView', {
      attrs: {
        "userinfo": user
      }
    }) : _vm._e()], 1)]) : _vm._e();
  }), 0) : _vm._e()])])]);
};
var previewvue_type_template_id_1eac96bc_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/preview/index.vue?vue&type=template&id=1eac96bc&scoped=true&

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/preview?vue&type=script&lang=js&




//import 'swiper/swiper-bundle.css'
//

//

/* harmony default export */ var preview_vue_type_script_lang_js_ = ({
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
// CONCATENATED MODULE: ./src/components/chat/preview?vue&type=script&lang=js&
 /* harmony default export */ var chat_preview_vue_type_script_lang_js_ = (preview_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chat/preview/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("f833")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chat_preview_vue_type_script_lang_js_,
  previewvue_type_template_id_1eac96bc_scoped_true_render,
  previewvue_type_template_id_1eac96bc_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "1eac96bc",
  null
  ,true
)

/* harmony default export */ var preview = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/join?vue&type=script&lang=js&


/* harmony default export */ var join_vue_type_script_lang_js_ = ({
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
  data: function () {
    return {
      loading: false,
      joinedMembers: [],
      creatorLeft: false
    };
  },
  created: () => {},
  watch: {},
  computed: Object(vuex_esm["c" /* mapState */])({
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
      var self = this;
      this.$store.commit("SET_CHAT_TO_FORCE", this.m_chat.roomId);
      this.core.mtrx.client.joinRoom(this.m_chat.roomId).then(() => {
        //this.$store.commit('SET_CHAT_TO_STORE', this.m_chat.summary)
        this.$emit("joined");
      }).catch(function (error) {
        self.brokenRoom(true);
        return self.creatorLeft = true;
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
      this.core.mtrx.blockUser(users[0].userId).then(r => {
        this.$router.go(-1);
      }).catch(e => {});
    },
    decline: function () {
      this.$store.commit("SET_CHAT_TO_FORCE", this.m_chat.roomId);
      this.core.mtrx.client.leave(this.chat.roomId).then(r => {
        this.core.mtrx.client.forget(this.chat.roomId, true).then(r => {
          return r;
        }).then(r => {
          this.$store.commit("DELETE_ROOM", this.chat.roomId);
          this.$router.go(-1);
        });
      });
    },
    brokenRoom() {
      this.$emit("creatorLeft", true);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/join?vue&type=script&lang=js&
 /* harmony default export */ var chat_join_vue_type_script_lang_js_ = (join_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/join/index.vue



function join_injectStyles (context) {
  
  var style0 = __webpack_require__("285a")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var join_component = Object(componentNormalizer["a" /* default */])(
  chat_join_vue_type_script_lang_js_,
  joinvue_type_template_id_68c7ee2f_scoped_true_render,
  joinvue_type_template_id_68c7ee2f_scoped_true_staticRenderFns,
  false,
  join_injectStyles,
  "68c7ee2f",
  null
  ,true
)

/* harmony default export */ var join = (join_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/attachement/index.vue?vue&type=template&id=bd3aba00&scoped=true&
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

// CONCATENATED MODULE: ./src/components/chat/attachement/index.vue?vue&type=template&id=bd3aba00&scoped=true&

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/attachement?vue&type=script&lang=js&


/* harmony default export */ var attachement_vue_type_script_lang_js_ = ({
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
  computed: Object(vuex_esm["c" /* mapState */])({
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
// CONCATENATED MODULE: ./src/components/chat/attachement?vue&type=script&lang=js&
 /* harmony default export */ var chat_attachement_vue_type_script_lang_js_ = (attachement_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/attachement/index.vue



function attachement_injectStyles (context) {
  
  var style0 = __webpack_require__("c63d")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var attachement_component = Object(componentNormalizer["a" /* default */])(
  chat_attachement_vue_type_script_lang_js_,
  attachementvue_type_template_id_bd3aba00_scoped_true_render,
  attachementvue_type_template_id_bd3aba00_scoped_true_staticRenderFns,
  false,
  attachement_injectStyles,
  "bd3aba00",
  null
  ,true
)

/* harmony default export */ var attachement = (attachement_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64985431-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/userRoomStatus/index.vue?vue&type=template&id=2894938c&scoped=true&
var userRoomStatusvue_type_template_id_2894938c_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "roomStatusView"
  }, [_vm._m(0), _c('div', {
    staticClass: "text"
  }, [_vm._v(" " + _vm._s(_vm.text) + " ")]), _c('button', {
    staticClass: "button small black rounded",
    on: {
      "click": function ($event) {
        return _vm.leaveRoom();
      }
    }
  }, [_vm._v(" Delete room ")])]);
};
var userRoomStatusvue_type_template_id_2894938c_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "statusViewIcon"
  }, [_c('i', {
    staticClass: "fas fa-ban"
  })]);
}];

// CONCATENATED MODULE: ./src/components/chat/userRoomStatus/index.vue?vue&type=template&id=2894938c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat/userRoomStatus?vue&type=script&lang=js&

/* harmony default export */ var userRoomStatus_vue_type_script_lang_js_ = ({
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
// CONCATENATED MODULE: ./src/components/chat/userRoomStatus?vue&type=script&lang=js&
 /* harmony default export */ var chat_userRoomStatus_vue_type_script_lang_js_ = (userRoomStatus_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/userRoomStatus/index.vue



function userRoomStatus_injectStyles (context) {
  
  var style0 = __webpack_require__("e404")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var userRoomStatus_component = Object(componentNormalizer["a" /* default */])(
  chat_userRoomStatus_vue_type_script_lang_js_,
  userRoomStatusvue_type_template_id_2894938c_scoped_true_render,
  userRoomStatusvue_type_template_id_2894938c_scoped_true_staticRenderFns,
  false,
  userRoomStatus_injectStyles,
  "2894938c",
  null
  ,true
)

/* harmony default export */ var userRoomStatus = (userRoomStatus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/chat?vue&type=script&lang=js&






/* harmony default export */ var chat_vue_type_script_lang_js_ = ({
  name: "chat",
  props: {
    chat: Object,
    u: String,
    search: String,
    searchresults: Array,
    style: ''
  },
  components: {
    list: list["a" /* default */],
    chatInput: () => Promise.all(/* import() */[__webpack_require__.e(24), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "fe01")),
    join: join,
    attachement: attachement,
    userRoomStatus: userRoomStatus
  },
  data: function () {
    return {
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
      selectedMessages: []
    };
  },
  created() {},
  mounted() {
    this.getuserinfo();
    this.$store.commit("active", true);
    this.$store.commit("blockactive", {
      value: true,
      item: "chat"
    });
  },
  destroyed() {
    this.$store.commit("blockactive", {
      value: false,
      item: "chat"
    });
    this.$store.commit("SET_CURRENT_ROOM", false);
    this.clearintrv();
  },
  watch: {
    needcreatekey: function () {
      if (this.needcreatekey) {
        if (!this.intrv) {
          this.intrv = setInterval(() => {
            this.refreshkeys(true);
          }, 20000);
        }
      } else {
        this.clearintrv();
      }
    },
    chatusers: function () {
      if (this.m_chat && this.m_chat.pcrypto) {
        this.m_chat.pcrypto.userschanded().then(r => {
          this.checkcrypto();
        });
      }
    },
    m_chat: {
      immediate: true,
      handler: function () {
        if (this.m_chat && !_.isEmpty(this.m_chat)) {
          this.core.mtrx.kit.allchatmembers([this.m_chat], false, true).then(r => {
            return this.core.mtrx.kit.prepareChat(this.m_chat);
          }).then(r => {
            this.ready = true;
            this.checkcrypto();
          });
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
    }
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    active: state => state.active,
    auth: state => state.auth,
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
    keyproblem: function () {
      if (this.core.user.userinfo.keys.length < 12) {
        return "younotgen";
      } else return "usernotgen";
    },
    needcreatekey: function () {
      return this.keyproblem == "younotgen" && this.cantchat && !this.cantchatexc;
    },
    membership: function () {
      if (this.m_chat) {
        if (this.m_chat.timeline.length > 0) {
          var id = this.core.mtrx.client.credentials.userId;
          var lastEvent = this.m_chat.timeline[this.m_chat.timeline.length - 1];
          if (lastEvent.event.state_key === id && lastEvent.event.content.reason === "admin ban") {
            this.roomUserBanned = true;
          }
        }
        return this.m_chat.getMyMembership();
      }
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
    clearintrv: function () {
      if (this.intrv) {
        clearInterval(this.intrv);
        this.intrv = null;
      }
    },
    clbkencrypt: function () {
      this.encrypting = true;
    },
    clbkencrypted: function () {
      this.encrypting = false;
    },
    checkcrypto: function () {
      this.encrypted = this.m_chat.pcrypto.canBeEncrypt();
      this.cantchat = this.m_chat.pcrypto.cantchat();
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
    replyEvent: function (_ref) {
      let {
        event
      } = _ref;
      this.relationEvent = {
        type: "m.reference",
        event: event,
        action: this.$i18n.t("caption.replyOnMessage")
      };
      if (this.$refs["chatInput"]) {
        this.$refs["chatInput"].focus();
      }
    },
    shareEvent: function (_ref2) {
      let {
        event
      } = _ref2;
      this.relationEvent = {
        type: 'm.reference',
        event: event,
        action: this.$i18n.t('caption.shareMessage')
      };
      if (this.$refs['chatInput']) {
        this.$refs['chatInput'].focus();
      }
    },
    editingEvent: function (_ref3) {
      let {
        event,
        text
      } = _ref3;
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
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat?vue&type=script&lang=js&
 /* harmony default export */ var components_chat_vue_type_script_lang_js_ = (chat_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/chat/index.vue



function chat_injectStyles (context) {
  
  var style0 = __webpack_require__("8458")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var chat_component = Object(componentNormalizer["a" /* default */])(
  components_chat_vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  chat_injectStyles,
  "127f4274",
  null
  ,true
)

/* harmony default export */ var chat = __webpack_exports__["default"] = (chat_component.exports);

/***/ }),

/***/ "bcad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_975d943a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dc2d");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_975d943a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_975d943a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_975d943a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_975d943a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c63d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("621d");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_bd3aba00_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "dc2d":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("492c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0fd6bed3", content, shadowRoot)
};

/***/ }),

/***/ "e404":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2894938c_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("86d6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2894938c_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2894938c_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2894938c_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2894938c_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f833":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1eac96bc_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("891a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1eac96bc_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1eac96bc_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1eac96bc_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1eac96bc_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);
//# sourceMappingURL=matrix-element.13.js.map