(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[6],{

/***/ "5500":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e0f628c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/publicPreview.vue?vue&type=template&id=02359d91&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page chat"},[_c('topheader',{staticClass:"topheader",scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('backButton',{attrs:{"action":"chats"}})]},proxy:true},{key:"info",fn:function(){return [_c('span',{staticClass:"nameline"},[_vm._v(_vm._s(_vm.$t("caption.publicRoomTitle")))])]},proxy:true}])}),_c('maincontent',{scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.id)?_c('publicroom',{attrs:{"id":_vm.id}}):_vm._e()]},proxy:true}])})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/publicPreview.vue?vue&type=template&id=02359d91&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/assets/topheader/index.vue + 4 modules
var topheader = __webpack_require__("08da");

// EXTERNAL MODULE: ./src/components/chat/publicroom/index.vue + 4 modules
var publicroom = __webpack_require__("5719");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/publicPreview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      room: {}
    };
  },
  components: {
    topheader: topheader["a" /* default */],
    publicroom: publicroom["a" /* default */]
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    active: function active(state) {
      return state.active;
    },
    pocketnet: function pocketnet(state) {
      return state.pocketnet;
    },
    minimized: function minimized(state) {
      return state.minimized;
    },
    id: function id() {
      return this.$route.query.id;
    }
  }),
  methods: {
    joinRoom: function joinRoom() {
      var _this = this;

      this.core.mtrx.client.joinRoom(this.room[0].room_id).then(function (r) {
        _this.$router.push('/chat?id=' + _this.room[0].room_id);
      });
    }
  },
  destroyed: function destroyed() {
    this.$store.commit('blockactive', {
      value: false,
      item: 'publicPreview'
    });
  },
  mounted: function mounted() {
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

/***/ })

}]);
//# sourceMappingURL=matrix-element.6.js.map