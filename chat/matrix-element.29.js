(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[29],{

/***/ "0b2c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f121");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("187ab750", content, shadowRoot)
};

/***/ }),

/***/ "4779":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/teamroom.vue?vue&type=template&id=6781333f&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "page chats"
  }, [_c('topheader', {
    staticClass: "topheader",
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
      key: "info",
      fn: function () {
        return [_c('span', {
          staticClass: "nameline"
        }, [_vm._v("Bastyon")])];
      },
      proxy: true
    }])
  }), _c('maincontent', {
    scopedSlots: _vm._u([{
      key: "content",
      fn: function () {
        return _vm._l(_vm.pocketteammessages, function (message) {
          return _c('div', {
            key: message.id,
            staticClass: "messageRow"
          }, [_c('div', {
            staticClass: "logo"
          }), _c('div', {
            staticClass: "maxcontent"
          }, [_c('div', {
            staticClass: "messageText"
          }, [_c('div', {
            staticClass: "sendername"
          }, [_c('span', [_vm._v("Bastyon")])]), _c('div', {
            staticClass: "msgtext"
          }, [_c('div', {
            domProps: {
              "innerHTML": _vm._s(message.text)
            }
          })])])])]);
        });
      },
      proxy: true
    }])
  })], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/teamroom.vue?vue&type=template&id=6781333f&scoped=true

// EXTERNAL MODULE: ./src/components/assets/topheader/index.vue + 4 modules
var topheader = __webpack_require__("08da");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/teamroom.vue?vue&type=script&lang=js


/* harmony default export */ var teamroomvue_type_script_lang_js = ({
  name: "teamroom",
  components: {
    topheader: topheader["a" /* default */]
  },
  props: {},
  data: function () {
    return {};
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    pocketteammessages: state => state.pocketteammessages
  }),
  methods: {},
  mounted() {}
});
// CONCATENATED MODULE: ./src/views/teamroom.vue?vue&type=script&lang=js
 /* harmony default export */ var views_teamroomvue_type_script_lang_js = (teamroomvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/teamroom.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("aa47")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_teamroomvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "6781333f",
  null
  ,true
)

/* harmony default export */ var teamroom = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "aa47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_6781333f_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0b2c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_6781333f_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_6781333f_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_6781333f_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_teamroom_vue_vue_type_style_index_0_id_6781333f_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f121":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topheader[data-v-6781333f]{top:0;z-index:999}.logo[data-v-6781333f]{background-image:url(https://pocketnet.app/img/logo20.svg);background-size:cover;background-position:50%;background-repeat:no-repeat;height:30px;width:30px;margin-left:.25em}[data-v-6781333f] .messageRow{display:flex;align-items:flex-end;overflow:hidden;padding:.5em 0}[data-v-6781333f] .messageRow .mt{margin-top:1em}[data-v-6781333f] .messageRow .mb{margin-bottom:1em}[data-v-6781333f] .messageRow .maxcontent{max-width:85%}[data-v-6781333f] .messageRow.allscreen{flex-wrap:wrap}[data-v-6781333f] .messageRow .metaMsg{width:100%}[data-v-6781333f] .messageRow .sendername{order:3;opacity:.6;overflow:hidden;font-size:.7em}[data-v-6781333f] .messageRow .messageText{margin-left:.5em;background:#fb1063;color:#fff;padding:.5em .75em;padding-top:.5em;border-radius:1em;white-space:normal}[data-v-6781333f] .messageRow .messageText .msgtext{text-align:left}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=matrix-element.29.js.map