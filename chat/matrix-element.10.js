(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[10],{

/***/ "2a8c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".empty[data-v-ffacfd66]{padding:2em;text-align:center}.empty span[data-v-ffacfd66]{font-size:.9em}.publicPreviewContent .name[data-v-ffacfd66]{padding:1.5em 1em;text-align:center}.publicPreviewContent .name span[data-v-ffacfd66]{font-weight:700;font-size:2em}.publicPreviewContent .topic[data-v-ffacfd66]{text-align:center;padding:0 2em}.publicPreviewContent .topic span[data-v-ffacfd66]{font-size:1em;width:100%;display:block;word-wrap:break-word}.publicPreviewContent .membersCount[data-v-ffacfd66]{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.publicPreviewContent .membersCount span[data-v-ffacfd66]{display:block;font-size:.8em}.publicPreviewContent .membersCount i[data-v-ffacfd66]{font-size:1.2em;color:rgb(var(--color-txt-ac));margin:20px 0 10px 0}.publicPreviewContent .actions[data-v-ffacfd66]{display:flex;justify-content:center;align-items:center;margin:50px auto}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "3023":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2a8c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("2f2ab3de", content, shadowRoot)
};

/***/ }),

/***/ "5500":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"056ad8cc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/publicPreview.vue?vue&type=template&id=56c2dbbf&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chat"},[_c('topheader',{staticClass:"topheader",scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"chats"}})]},proxy:true},{key:"info",fn:function(){return [_c('span',{staticClass:"nameline"},[_vm._v(_vm._s(_vm.$t("caption.publicRoomTitle")))])]},proxy:true}])}),_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.id)?_c('publicroom',{attrs:{"id":_vm.id}}):_vm._e()]},proxy:true}])})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/publicPreview.vue?vue&type=template&id=56c2dbbf&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/assets/topheader/index.vue + 4 modules
var topheader = __webpack_require__("08da");

// EXTERNAL MODULE: ./src/components/chat/publicroom/index.vue + 4 modules
var publicroom = __webpack_require__("5719");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/publicPreview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var publicPreviewvue_type_script_lang_js_ = ({
  name: 'publicPreview',
  data: function () {
    return {
      room: {}
    };
  },
  components: {
    topheader: topheader["a" /* default */],
    publicroom: publicroom["a" /* default */]
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    active: state => state.active,
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    id: function () {
      return this.$route.query.id;
    }
  }),
  methods: {
    joinRoom() {
      this.core.mtrx.client.joinRoom(this.room[0].room_id).then(r => {
        this.$router.push('/chat?id=' + this.room[0].room_id).catch(e => {});
      });
    }

  },

  destroyed() {
    this.$store.commit('blockactive', {
      value: false,
      item: 'publicPreview'
    });
  },

  mounted() {
    this.$store.commit('active', true);
    this.$store.commit('blockactive', {
      value: true,
      item: 'publicPreview'
    });
    this.$store.commit('JOINROOM', null);
  }

});
// CONCATENATED MODULE: ./src/views/publicPreview.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_publicPreviewvue_type_script_lang_js_ = (publicPreviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/publicPreview.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_publicPreviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var publicPreview = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5719":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"056ad8cc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/publicroom/index.vue?vue&type=template&id=ffacfd66&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chatpublicroom"},[(_vm.ready)?_c('div',[(_vm.room.length > 0)?_c('div',{staticClass:"publicPreviewContent"},[_c('div',{staticClass:"name"},[_c('span',[_vm._v(_vm._s(_vm.room[0].name))])]),(_vm.room[0].topic)?_c('div',{staticClass:"topic"},[_c('span',[_vm._v(_vm._s(_vm.room[0].topic.replace(/_/g, ' ')))])]):_vm._e(),_c('div',{staticClass:"membersCount"},[_c('i',{staticClass:"fas fa-users"}),_c('span',[_c('b',[_vm._v(_vm._s(_vm.room[0].num_joined_members))]),_vm._v(" Users in room")])]),_c('div',{staticClass:"actions"},[_c('button',{staticClass:"button small rounded",on:{"click":function($event){return _vm.joinRoom()}}},[_vm._v(_vm._s(_vm.$t("button.join"))+" ")])])]):_c('div',{staticClass:"empty"},[_vm._m(0)])]):_c('div',[_c('div',{staticClass:"empty"},[_c('linepreloader')],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"caption"},[_c('span',[_vm._v("Room not found")])])}]


// CONCATENATED MODULE: ./src/components/chat/publicroom/index.vue?vue&type=template&id=ffacfd66&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/assets/topheader/index.vue + 4 modules
var topheader = __webpack_require__("08da");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/publicroom/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var publicroomvue_type_script_lang_js_ = ({
  name: 'chatpublicroom',
  props: {
    id: String
  },
  data: function () {
    return {
      ready: false,
      room: {}
    };
  },
  components: {
    topheader: topheader["a" /* default */]
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    active: state => state.active,
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    pocketteammessages: state => state.pocketteammessages
  }),
  methods: {
    joinRoom() {
      this.core.mtrx.client.joinRoom(this.room[0].room_id).then(r => {
        this.$router.push('/chat?id=' + this.room[0].room_id).catch(e => {});
      });
    }

  },

  mounted() {
    //////////////// get public room by id
    this.core.mtrx.wait().then(r => {
      this.core.mtrx.client.publicRooms().then(r => {
        this.ready = true;

        if (this.id[0] === '!') {
          return this.room = r['chunk'].filter(i => i.room_id === this.id);
        } else {
          return this.room = r['chunk'].filter(i => i.name === this.id.replace(/_/g, ' '));
        }
      });
    });
  }

});
// CONCATENATED MODULE: ./src/components/chat/publicroom/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var chat_publicroomvue_type_script_lang_js_ = (publicroomvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chat/publicroom/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("c09f")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("f155")
if (style1.__inject__) style1.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chat_publicroomvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "ffacfd66",
  null
  ,true
)

/* harmony default export */ var publicroom = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "87b8":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".empty[data-v-ffacfd66]{padding:2em;text-align:center}.empty span[data-v-ffacfd66]{font-size:.9em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "ba23":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("87b8");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0a80d090", content, shadowRoot)
};

/***/ }),

/***/ "c09f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ffacfd66_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ba23");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ffacfd66_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ffacfd66_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ffacfd66_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_ffacfd66_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "f155":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_ffacfd66_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3023");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_ffacfd66_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_ffacfd66_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_ffacfd66_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_ffacfd66_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);
//# sourceMappingURL=matrix-element.10.js.map