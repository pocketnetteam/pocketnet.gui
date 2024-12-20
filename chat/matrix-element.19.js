(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[19],{

/***/ "125b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1bd5");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("56e5f003", content, shadowRoot)
};

/***/ }),

/***/ "1bd5":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".opacity[data-v-cd2bc92e]{opacity:0}.chatIcon[data-v-cd2bc92e]{width:100%;position:relative}.unknowngroupusersicon[data-v-cd2bc92e]{position:absolute;left:0;top:0;bottom:0;right:0;font-size:.7em;display:flex;justify-content:center;align-items:center;color:#fff}.unknowngroupusers .bgimage[data-v-cd2bc92e]{transform:scale(.7)}.chatGroupIcon[data-v-cd2bc92e],.chatGroupIcon img[data-v-cd2bc92e]{width:100%;height:100%}.chatGroupIcon img[data-v-cd2bc92e]{border-radius:50%;-o-object-fit:cover;object-fit:cover;-o-object-position:50% 50%;object-position:50% 50%;position:absolute;top:0;z-index:100}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "3094":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/icon.vue?vue&type=template&id=cd2bc92e&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chatIcon",
    class: {
      unknowngroupusers: _vm.unknowngroupusers
    }
  }, [_vm.groupAvatar ? _c('div', {
    staticClass: "chatGroupIcon"
  }, [_c('userpic', {
    attrs: {
      "image": _vm.groupAvatar
    }
  })], 1) : _c('userspic', {
    key: _vm.allnotifications,
    class: {
      opacity: _vm.groupAvatar
    },
    attrs: {
      "slidesPerView": _vm.slidesPerView,
      "users": _vm.usersinfo,
      "status": _vm.status,
      "unseen": _vm.unseen,
      "single": _vm.singleAvatar
    }
  })], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chats/assets/icon.vue?vue&type=template&id=cd2bc92e&scoped=true

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/icon.vue?vue&type=script&lang=js

/* harmony default export */ var iconvue_type_script_lang_js = ({
  name: "chatIcon",
  data: function () {
    return {
      single: []
    };
  },
  props: {
    chat: {},
    m_chat: {},
    slidesPerView: Number,
    hideunseen: Boolean,
    dontuseslides: Boolean
  },
  computed: {
    allnotifications: function () {
      return this.$store.state.allnotifications || "0";
    },
    unseen: function () {
      if (this.hideunseen) return 0;
      if (this.blockedCheck) return 0;
      if (this.m_chat.selfMembership === "invite") {
        if (functions["a" /* default */].date.addseconds(moment.utc(this.m_chat.summary.lastModified).toDate(), 86400) > new Date()) return 1;
      }
      this.allnotifications;
      return this.m_chat.getUnreadNotificationCount();
    },
    users: function () {
      if (!this.chat) return [];
      var u = this.core.mtrx.anotherChatUsers(this.chat.roomId);
      console.log("USER", u);
      if (this.dontuseslides) {
        u = _.first(u, 4);
      }
      return _.first(_.shuffle(u), 49);
    },
    singleAvatar: function () {
      if (!this.chat && !this.m_chat) return {};
      if (this.m_chat.getJoinRule() === "public" && this.m_chat.currentState.getMembers().length === 1) {
        var member = this.m_chat.currentState.getMembers()[0];
        var data = this.$store.state.users[functions["a" /* default */].getmatrixid(member.userId)];
        if (data) {
          data.status = member.membership;
          data.image = data.source.i;
          return data;
        }
      }
      return {};
    },
    blockedCheck: function () {
      var users = this.core.mtrx.anotherChatUsers(this.m_chat.roomId);
      if (users.length == 1) {
        return this.core.mtrx.blockeduser(users[0].userId);
      }
    },
    usersinfo: function () {
      var u = this.core.mtrx.chatUsersInfo(this.chat.roomId, "anotherChatUsers");
      if (this.dontuseslides) {
        u = _.first(u, 4);
      }
      return _.first(_.shuffle(u), 49);
    },
    status: function () {
      var us = {};
      _.each(this.users, u => {
        us[u.userId] = this.core.mtrx.blockeduser(u.userId) ? "blocked" : u.membership;
      });
      return us;
    },
    unknowngroupusers: function () {
      return this.core.mtrx.kit.unknowngroupusers(this.m_chat);
    },
    groupAvatar: function () {
      var _this$m_chat$currentS;
      const avatar = (_this$m_chat$currentS = this.m_chat.currentState.getStateEvents("m.room.avatar")[0]) === null || _this$m_chat$currentS === void 0 ? void 0 : _this$m_chat$currentS.event.content.avatarUrl;
      return avatar !== "" ? avatar : "";
    }
  }
});
// CONCATENATED MODULE: ./src/components/chats/assets/icon.vue?vue&type=script&lang=js
 /* harmony default export */ var assets_iconvue_type_script_lang_js = (iconvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chats/assets/icon.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("c3d0")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_iconvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "cd2bc92e",
  null
  ,true
)

/* harmony default export */ var icon = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "55bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_05097f94_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9cd6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_05097f94_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_05097f94_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_05097f94_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_05097f94_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "819d":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8de8");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("3e646efa", content, shadowRoot)
};

/***/ }),

/***/ "8de8":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".inSettings[data-v-05097f94]{margin:30px auto;display:block}.chatIconWrapper[data-v-05097f94]{width:120px}.linkPlace[data-v-05097f94]{margin-top:30px;padding:.5em 0;cursor:pointer;border-top:1px solid rgb(var(--background-main))}.linkPlace span[data-v-05097f94]{font-size:1em;display:block;text-align:left;max-width:400px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.linkPlace .shareLink[data-v-05097f94]:hover{color:rgb(var(--color-txt-ac))}.chatSettingAbout[data-v-05097f94]{padding:1em 0}.chatSettingAbout .chatNameEdit[data-v-05097f94]{margin-top:1em}.chatSettingAbout .chatNameEdit input[data-v-05097f94]{padding:1em;display:block;width:100%}.chatSettingAbout .chatNameEdit input[data-v-05097f94],.chatSettingAbout .chatNameEdit input[data-v-05097f94]:focus{border-bottom:1px solid rgb(var(--neutral-grad-1));border-top:1px solid rgb(var(--neutral-grad-1))}.chatSettingAbout .chatDescription textarea[data-v-05097f94]{font-size:.9em;display:block;width:100%;resize:none;padding:1em}.chatIconWrapper[data-v-05097f94]{width:200px;height:200px;margin:0 auto}.chatIconWrapper .chatIcon[data-v-05097f94]{width:100%;height:100%;overflow:hidden;position:absolute}.chatIconWrapper .upload[data-v-05097f94],.chatIconWrapper[data-v-05097f94] .uploadWrapper{height:100%}.chatIconWrapper[data-v-05097f94] .inputWrapper{z-index:201}.chatIconWrapper[data-v-05097f94] .swiperWrapperFlex .imageSwiper{width:100px;height:100px;line-height:100px}.chatIconWrapper[data-v-05097f94] .swiperWrapperFlex{padding-bottom:1em}.chatIconWrapper[data-v-05097f94] .fourAvatars,.chatIconWrapper[data-v-05097f94] .threeAvatars,.chatIconWrapper[data-v-05097f94] .twoAvatars{width:100%;padding-bottom:100%;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7);background:rgba(var(--background-total-theme),.3)}.chatIconWrapper[data-v-05097f94] .oneuser{width:100%;margin:0 auto}.chatIconWrapper[data-v-05097f94] .bgimage{box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}.minimized:not(.active) .chatDescription[data-v-05097f94],.minimized:not(.active) .chatNameEdit[data-v-05097f94]{display:none}.minimized[data-v-05097f94]:not(.active) .chatIconWrapper{width:52px;margin:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9394":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chatSettings.vue?vue&type=template&id=af2c1d3a
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.chat ? _c('div', {
    staticClass: "page"
  }, [_c('topheader', {
    staticClass: "topheader"
  }), _c('maincontent', {
    scopedSlots: _vm._u([{
      key: "content",
      fn: function () {
        return [_c('settings', {
          attrs: {
            "chat": _vm.chat
          }
        })];
      },
      proxy: true
    }], null, false, 32150248)
  })], 1) : _vm._e();
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/chatSettings.vue?vue&type=template&id=af2c1d3a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chatSettings/topheader/index.vue?vue&type=template&id=cdaa8cd6
var topheadervue_type_template_id_cdaa8cd6_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "chatTopheader"
    }
  }, [_c('topheader', {
    scopedSlots: _vm._u([{
      key: "left",
      fn: function () {
        return [_c('backButton', {
          attrs: {
            "action": "back"
          }
        })];
      },
      proxy: true
    }, {
      key: "info",
      fn: function () {
        return [_c('span', [_vm._v(_vm._s(_vm.$t("caption.settings")))])];
      },
      proxy: true
    }, {
      key: "right",
      fn: function () {
        return undefined;
      },
      proxy: true
    }])
  })], 1);
};
var topheadervue_type_template_id_cdaa8cd6_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chatSettings/topheader/index.vue?vue&type=template&id=cdaa8cd6

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chatSettings/topheader/index.vue?vue&type=script&lang=js
/* harmony default export */ var topheadervue_type_script_lang_js = ({
  methods: {}
});
// CONCATENATED MODULE: ./src/components/chatSettings/topheader/index.vue?vue&type=script&lang=js
 /* harmony default export */ var chatSettings_topheadervue_type_script_lang_js = (topheadervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chatSettings/topheader/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chatSettings_topheadervue_type_script_lang_js,
  topheadervue_type_template_id_cdaa8cd6_render,
  topheadervue_type_template_id_cdaa8cd6_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var topheader = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chatSettings/index.vue?vue&type=template&id=05097f94&scoped=true
var chatSettingsvue_type_template_id_05097f94_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    class: {
      minimized: _vm.minimized,
      active: _vm.active
    },
    attrs: {
      "id": "chatSettings"
    }
  }, [_c('div', {
    staticClass: "chatSettingAbout"
  }, [_c('div', {
    class: {
      chatIconWrapper: 'chatIconWrapper',
      noSwipe: true
    }
  }, [_c('upload', {
    attrs: {
      "onlyimage": true,
      "multiple": false,
      "extensions": _vm.upl.extensions,
      "images": _vm.upl.images
    },
    on: {
      "uploaded": data => _vm.uploadUploaded(data),
      "error": error => _vm.uploadError(error)
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function () {
        return [_c('label', {
          staticClass: "chatIconEditImage",
          attrs: {
            "for": "roomImage"
          }
        }, [_c('i', {
          staticClass: "fas fa-camera"
        })]), _c('chatIcon', {
          attrs: {
            "slidesPerView": 4,
            "dontuseslides": _vm.minimized && !_vm.active,
            "chat": _vm.chat,
            "m_chat": _vm.m_chat,
            "hideunseen": true
          }
        }), _vm.userImagebase64 ? _c('img', {
          staticClass: "userImagebase64",
          attrs: {
            "src": _vm.userImagebase64,
            "alt": ""
          }
        }) : _vm._e()];
      },
      proxy: true
    }, {
      key: "dropzone",
      fn: function () {
        return undefined;
      },
      proxy: true
    }])
  })], 1), _c('div', {
    staticClass: "chatNameEdit"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.m_chat.name,
      expression: "m_chat.name"
    }],
    attrs: {
      "type": "text",
      "placeholder": "Name"
    },
    domProps: {
      "value": _vm.m_chat.name
    },
    on: {
      "input": function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.m_chat, "name", $event.target.value);
      }
    }
  })]), _vm.topic ? _c('div', {
    staticClass: "chatDescription"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.topicTxt,
      expression: "topicTxt"
    }],
    attrs: {
      "type": "text",
      "placeholder": "Description",
      "maxlength": "1000"
    },
    domProps: {
      "value": _vm.topicTxt
    },
    on: {
      "input": function ($event) {
        if ($event.target.composing) return;
        _vm.topicTxt = $event.target.value;
      }
    }
  })]) : _vm._e(), _c('button', {
    staticClass: "button small rounded inSettings",
    on: {
      "click": function ($event) {
        return _vm.saveEdited();
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("button.save")) + " ")])])]);
};
var chatSettingsvue_type_template_id_05097f94_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chatSettings/index.vue?vue&type=template&id=05097f94&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/chats/assets/icon.vue + 4 modules
var icon = __webpack_require__("3094");

// EXTERNAL MODULE: ./src/components/assets/upload/index.vue + 4 modules
var upload = __webpack_require__("6b57");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chatSettings?vue&type=script&lang=js&external




/* harmony default export */ var chatSettings_vue_type_script_lang_js_external = ({
  data: () => ({
    pubChat: Object,
    topicTxt: "",
    topic: false,
    userImagebase64: null,
    upl: {
      extensions: ["jpg", "jpeg", "png", "webp"],
      images: {
        resize: {
          width: 200,
          height: 200,
          type: "fit"
        }
      }
    }
  }),
  props: {
    chat: Object,
    saveClicked: false
  },
  components: {
    chatIcon: icon["a" /* default */],
    upload: upload["a" /* default */]
  },
  computed: Object(vuex_esm["d" /* mapState */])({
    pocketnet: state => state.pocketnet,
    minimized: state => state.minimized,
    active: state => state.active,
    auth: state => state.auth,
    m_chat: function () {
      return this.core.mtrx.client.getRoom(this.chat.roomId);
    },
    shareRoomLink: function () {
      return `https://${this.core.domain}/publicPreview/welcome?connect=${this.chat.roomId.replace("!", "%")}`;
    }
  }),
  mounted() {
    var _this$m_chat$currentS;
    const avatar = (_this$m_chat$currentS = this.m_chat.currentState.getStateEvents("m.room.avatar")[0]) === null || _this$m_chat$currentS === void 0 ? void 0 : _this$m_chat$currentS.event.content.avatarUrl;
    this.userImagebase64 = avatar !== "" ? avatar : null;
    if (this.m_chat.getJoinRule() === "public") {
      this.getPublicRoom();
      this.topic = true;
    }
  },
  methods: {
    cameraHandlerCustom: function () {
      var result = [];
      window.POCKETNETINSTANCE.platform.ui.uploadImage({
        multiple: true,
        action: ({
          base64
        }, resolve) => {
          return this.resizeImage(base64).then(base64 => {
            return f.Base64.toFile(base64).then(file => {
              var data = {
                base64,
                file
              };
              result.push(data);
              this.uploadUploaded(data);
              resolve();
            });
          }).catch(e => {
            console.error(e);
            resolve();
          });
        },
        onSuccess: imgs => {}
      });
    },
    saveEdited() {
      var promises = [];
      promises.push(this.core.mtrx.client.setRoomAvatarUrl(this.m_chat.roomId, this.userImagebase64).catch(e => {
        return Promise.reject('image');
      }));
      promises.push(this.core.mtrx.client.setRoomName(this.m_chat.roomId, "@" + this.m_chat.name.replace(/[@]*/g, "")).catch(e => {
        return Promise.reject('image');
      }));
      promises.push(this.core.mtrx.client.setRoomTopic(this.chat.roomId, this.topicTxt.replace(/ /g, "_")).then(r => {
        return r;
      }).catch(e => {
        return Promise.reject('topic');
      }));
      this.$store.state.globalpreloader = true;
      Promise.all(promises).then(() => {
        this.$store.commit("icon", {
          icon: "success"
        });
      }).catch(e => {
        this.$store.commit("icon", {
          icon: "error"
        });
      }).finally(() => {
        this.$store.state.globalpreloader = false;
      });
    },
    getPublicRoom() {
      this.core.mtrx.client.publicRooms().then(r => {
        this.pubChat = r.chunk.filter(room => room.room_id === this.chat.roomId)[0];
        if (this.pubChat["topic"]) {
          this.topicTxt = this.pubChat["topic"].replace(/_/g, " ");
        }
      });
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },
    uploadUploaded(data) {
      this.userImagebase64 = data.base64;
    },
    uploadError() {},
    createBase64Image(FileObject) {
      const reader = new FileReader();
      reader.onload = event => {
        this.userImagebase64 = event.target.result;
      };
      reader.readAsDataURL(FileObject);
    }
  }
});
// CONCATENATED MODULE: ./src/components/chatSettings?vue&type=script&lang=js&external
 /* harmony default export */ var components_chatSettings_vue_type_script_lang_js_external = (chatSettings_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chatSettings/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("db1b")
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__("55bb")
if (style1.__inject__) style1.__inject__(context)

}

/* normalize component */

var chatSettings_component = Object(componentNormalizer["a" /* default */])(
  components_chatSettings_vue_type_script_lang_js_external,
  chatSettingsvue_type_template_id_05097f94_scoped_true_render,
  chatSettingsvue_type_template_id_05097f94_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "05097f94",
  null
  ,true
)

/* harmony default export */ var chatSettings = (chatSettings_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/chatSettings.vue?vue&type=script&lang=js


/* harmony default export */ var chatSettingsvue_type_script_lang_js = ({
  name: "chatSettings",
  data: function () {
    return {};
  },
  components: {
    topheader: topheader,
    settings: chatSettings
  },
  computed: {
    chat() {
      return this.$store.state.chatsMap[this.$route.query.id.replace("%", "!")];
    }
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/views/chatSettings.vue?vue&type=script&lang=js
 /* harmony default export */ var views_chatSettingsvue_type_script_lang_js = (chatSettingsvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/views/chatSettings.vue





/* normalize component */

var views_chatSettings_component = Object(componentNormalizer["a" /* default */])(
  views_chatSettingsvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var views_chatSettings = __webpack_exports__["default"] = (views_chatSettings_component.exports);

/***/ }),

/***/ "9cd6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("c387");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("8a56c52e", content, shadowRoot)
};

/***/ }),

/***/ "c387":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".chatGroupIcon img[data-v-05097f94]{width:50%!important}.chatIconWrapper[data-v-05097f94]{position:relative}.chatIconWrapper img[data-v-05097f94]{-o-object-fit:cover;object-fit:cover;border-radius:50%}.chatIconEditImage[data-v-05097f94],.chatIconWrapper img[data-v-05097f94]{width:100%;height:100%;position:absolute;top:0;left:0}.chatIconEditImage[data-v-05097f94]{z-index:200;opacity:.9;display:flex;align-items:center;flex-direction:column;justify-content:center}.chatIconEditImage i[data-v-05097f94]{transform:scale(2);color:rgb(var(--color-bg-ac))}.chatIconFile[data-v-05097f94]{display:none}.userImagebase64[data-v-05097f94]{z-index:150}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "c3d0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_cd2bc92e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("125b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_cd2bc92e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_cd2bc92e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_cd2bc92e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_cd2bc92e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "db1b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05097f94_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("819d");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05097f94_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05097f94_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05097f94_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05097f94_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);
//# sourceMappingURL=matrix-element.19.js.map