(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[26],{

/***/ "059f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_a16702aa_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("09f9");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_a16702aa_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_a16702aa_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_a16702aa_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_a16702aa_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "09f9":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("490e");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("210e559e", content, shadowRoot)
};

/***/ }),

/***/ "490e":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#complain .preloaderwrapperCpm[data-v-a16702aa]{padding:1em;text-align:center}#complain .caption[data-v-a16702aa],#complain .sendWrapper[data-v-a16702aa]{padding:1em}#complain .formWrapper input[data-v-a16702aa],#complain .formWrapper textarea[data-v-a16702aa]{width:100%;padding:1em;background:rgb(var(--background-secondary-theme))}#complain .formWrapper textarea[data-v-a16702aa]{min-height:200px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "c27d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complain/index.vue?vue&type=template&id=a16702aa&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    attrs: {
      "id": "complain"
    }
  }, [!_vm.loading ? _c('div', {
    staticClass: "wrapper"
  }, [_vm._m(0), _c('div', {
    staticClass: "formWrapper"
  }, [_c('input', {
    ref: "youremail",
    attrs: {
      "type": "email"
    },
    domProps: {
      "value": _vm.youremail
    },
    on: {
      "change": _vm.setyouremail
    }
  })]), _vm._m(1), _c('div', {
    staticClass: "formWrapper"
  }, [_c('textarea', {
    ref: "reason",
    domProps: {
      "value": _vm.reason
    },
    on: {
      "change": _vm.setvalue
    }
  })]), _c('div', {
    staticClass: "sendWrapper"
  }, [_c('button', {
    staticClass: "button orange small rounded",
    on: {
      "click": _vm.send
    }
  }, [_vm._v("Send")])])]) : _c('div', [_c('div', {
    staticClass: "preloaderwrapperCpm"
  }, [_c('linepreloader')], 1)])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "caption"
  }, [_c('span', [_vm._v("Your e-mail address")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "caption"
  }, [_c('span', [_vm._v("State the reason for your complaint")])]);
}];

// CONCATENATED MODULE: ./src/components/complain/index.vue?vue&type=template&id=a16702aa&scoped=true

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/complain?vue&type=script&lang=js&external

/* harmony default export */ var complain_vue_type_script_lang_js_external = ({
  name: "complain",
  props: {
    p: Object
  },
  data: function () {
    return {
      loading: false,
      reason: "",
      youremail: ""
    };
  },
  created: () => {},
  watch: {
    //$route: 'getdata'
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    auth: state => state.auth
  }),
  methods: {
    send: function () {
      if (this.loading) return;
      if (!this.reason) {
        this.$refs["reason"].focus();
        this.$store.commit("icon", {
          icon: "error",
          message: "State the reason for your complaint"
        });
        return;
      }
      if (!this.youremail) {
        this.$refs["youremail"].focus();
        this.$store.commit("icon", {
          icon: "error",
          message: "Please enter your email for feedback"
        });
        return;
      }
      if (!window.POCKETNETINSTANCE) {
        this.$store.commit("icon", {
          icon: "error",
          message: "Something went wrong, please try again later"
        });
        return;
      }
      var ps = {};
      _.each(this.p, function (v, i) {
        ps[i] = v;
      });
      ps.reason = this.reason;
      ps.email = this.youremail;
      var id = "common";
      if (ps.address2) {
        id = "user";
      }
      if (ps.roomid) {
        id = "room";
      }
      this.loading = true;
      window.POCKETNETINSTANCE.complainletters[id](ps, r => {
        this.loading = false;
        if (!r) {
          this.$store.commit("icon", {
            icon: "error",
            message: "Something went wrong, please try again later"
          });
        } else {
          this.$store.commit("icon", {
            icon: "success",
            message: "The complaint was successfully sent"
          });
          this.core.store.commit("setmodal", null);
        }
      });
    },
    setvalue: function (e) {
      this.reason = e.target.value || "";
    },
    setyouremail: function (e) {
      this.youremail = e.target.value || "";
    }
  }
});
// CONCATENATED MODULE: ./src/components/complain?vue&type=script&lang=js&external
 /* harmony default export */ var components_complain_vue_type_script_lang_js_external = (complain_vue_type_script_lang_js_external); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/complain/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("059f")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_complain_vue_type_script_lang_js_external,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "a16702aa",
  null
  ,true
)

/* harmony default export */ var complain = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=matrix-element.26.js.map