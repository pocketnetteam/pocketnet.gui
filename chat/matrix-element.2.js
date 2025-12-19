(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[2],{

/***/ "3094":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/icon.vue?vue&type=template&id=1a53247e&scoped=true
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

// CONCATENATED MODULE: ./src/components/chats/assets/icon.vue?vue&type=template&id=1a53247e&scoped=true

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
  
  var style0 = __webpack_require__("aae0")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_iconvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "1a53247e",
  null
  ,true
)

/* harmony default export */ var icon = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "3c1a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".nameofchat[data-v-8fb6d080]{white-space:nowrap}.nameline[data-v-8fb6d080]{display:flex;align-items:flex-end}.miniappicon[data-v-8fb6d080]{margin-right:.25em;margin-block:.25em}.miniappicon .bgimage[data-v-8fb6d080]{width:12px;height:12px;border-radius:2px}.iconGroup[data-v-8fb6d080]{font-size:.4em;width:16px;min-width:16px;text-align:center;height:16px;line-height:16px;border-radius:8px;background:rgb(var(--neutral-grad-2));margin-right:.5em;margin-block:.25em}.iconGroup.public[data-v-8fb6d080]{background:rgb(var(--color-good))}.iconGroup.public i[data-v-8fb6d080]{color:rgb(var(--text-on-bg-shadow-color))}.iconGroup i[data-v-8fb6d080]{color:rgb(var(--neutral-grad-1))}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "4e29":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chat/list/index.vue?vue&type=template&id=2031c374&scoped=true
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
      "id": "chatList"
    }
  }, [_c('div', {
    ref: "work",
    staticClass: "work"
  }, [_c('div', {
    ref: "events",
    staticClass: "timeLineWrapper"
  }, [_vm.timeline ? _c('events', {
    ref: "eventslist",
    attrs: {
      "error": _vm.error,
      "timeline": _vm.timeline,
      "events": _vm.events,
      "chat": _vm.chat,
      "loading": _vm.lloading,
      "scrollType": _vm.scrollType,
      "selectedMessages": _vm.selectedMessages,
      "searchresults": _vm.searchresults
    },
    on: {
      "updated": _vm.updatedSize,
      "scroll": _vm.scrollE,
      "removeEvent": _vm.removeEvent,
      "editingEvent": _vm.editingEvent,
      "replyEvent": _vm.replyEvent,
      "galleryEventOpen": e => _vm.imageGallery(e),
      "menuIsVisible": _vm.menuIsVisibleHandler,
      "toreference": _vm.scrollToEvent
    }
  }) : _vm._e()], 1)])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chat/list/index.vue?vue&type=template&id=2031c374&scoped=true

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/list/index.vue?vue&type=template&id=e2a5fc48&scoped=true
var listvue_type_template_id_e2a5fc48_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "maskedtop",
    class: {
      mobile: _vm.mobile,
      ios: _vm.ios,
      menuOpen: _vm.menuOpen,
      imagesList: this.scrollType === 'custom' ? 'imagesList' : ''
    },
    attrs: {
      "id": "events",
      "data-chat-input-embedded": _vm.hasInputChatEmbedded
    }
  }, [_c('div', {
    ref: "container",
    staticClass: "eventsflex",
    class: {
      mobile: _vm.mobile,
      ios: _vm.ios,
      menuOpen: _vm.menuOpen
    },
    on: {
      "wheel": _vm.mousewheel,
      "scroll": _vm.dscroll
    }
  }, [_c('div', {
    staticClass: "ewr"
  }, _vm._l(_vm.events, function (event, i) {
    return _c('div', {
      key: event.event.event_id,
      ref: event.event.event_id,
      refInFor: true,
      staticClass: "eventWrapper",
      class: {
        fromsearch: _vm.eventinsearchresult(event)
      },
      attrs: {
        "event": event.event.event_id
      }
    }, [_c('eventsEvent', {
      attrs: {
        "event": event,
        "prevevent": _vm.events[i + 1],
        "galleryData": _vm.events,
        "chat": _vm.chat,
        "timeline": _vm.timeline,
        "multiSelect": _vm.multiSelect,
        "selectedMessages": _vm.selectedMessages
      },
      on: {
        "showMultiSelect": _vm.showMultiSelect,
        "selectMessage": _vm.selectMessage,
        "removeMessage": _vm.removeMessage,
        "openImageEvent": e => _vm.galleryOpen(e),
        "removeEvent": e => _vm.removeEvent(event),
        "editing": text => _vm.editingEvent({
          event,
          text
        }),
        "reply": e => _vm.replyEvent({
          event
        }),
        "mounted": _vm.emounted,
        "menuIsVisible": _vm.menuIsVisibleHandler,
        "toreference": _vm.toreference
      }
    })], 1);
  }), 0), _vm.loading ? _c('div', {
    staticClass: "preloadingWrapper"
  }, [_c('linepreloader')], 1) : _vm._e()]), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.scrollbottomshow,
      expression: "scrollbottomshow"
    }],
    staticClass: "scrollbottom",
    on: {
      "click": _vm.scrolldown
    }
  }, [_c('i', {
    staticClass: "fas fa-chevron-down"
  })])])], 1);
};
var listvue_type_template_id_e2a5fc48_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/list/index.vue?vue&type=template&id=e2a5fc48&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.common.js
var vuex_common = __webpack_require__("d7a6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/events/list?vue&type=script&lang=js&external





/* harmony default export */ var list_vue_type_script_lang_js_external = ({
  name: "events",
  props: {
    timeline: Object,
    events: Array,
    chat: Object,
    loading: Boolean,
    scrollType: "",
    searchresults: null,
    error: [Object, Error, String],
    selectedMessages: []
  },
  inject: ["matches", "menuState"],
  components: {},
  data: function () {
    return {
      lastScrollPosition: 0,
      type: "",
      tmt: null,
      lscroll: null,
      menuOpen: false,
      c: 1,
      ls: 0,
      voiceMessageQueue: [],
      countshow: 0,
      multiSelect: false
    };
  },
  provide() {
    return {
      addToQueue: (message, id) => {
        var f = _.find(this.voiceMessageQueue, v => {
          return v.id == id;
        });
        if (!f) this.voiceMessageQueue = [...this.voiceMessageQueue, {
          message,
          id
        }];
      },
      playNext: id => {
        let current = this.sortedVoiceMessageQueue.findIndex(i => {
          return i.id === id;
        });
        let next = current === -1 ? null : this.sortedVoiceMessageQueue[current + 1];
        if (next) {
          next.message.setTime(0);
          next.message.play();
        }
      }
    };
  },
  activated() {
    this.restoreScrollPosition();
  },
  deactivated() {
    this.saveScrollPosition();
  },
  watch: {
    events: function (ev) {},
    selectedMessages: {
      immediate: true,
      handler: function () {
        if (this.selectedMessages.length === 0) {
          this.multiSelect = false;
        }
      }
    },
    notificationCount: function () {
      if (this.lscroll && this.lscroll.scrollTop < 180 && this.chat && this.chat.getUnreadNotificationCount()) {
        this.scrollToNew();
      }
    }
  },
  computed: {
    sortedVoiceMessageQueue() {
      return _.sortBy(this.voiceMessageQueue, a => {
        return a.id;
      });
    },
    ios() {
      return functions["a" /* default */].isios();
    },
    ...Object(vuex_esm["d" /* mapState */])({
      auth: state => state.auth,
      mobile: state => state.mobile,
      scrollbottomshow: function () {
        return this.lscroll && this.lscroll.scrollTop > 500;
      },
      minimized: state => state.minimized,
      notificationCount: state => state.allnotifications
    }),
    ...Object(vuex_common["mapGetters"])(["hasInputChatEmbedded"]),
    eventsByPages: function () {
      var ps = [];
      var pc = 0;
      _.each(this.events, function (e) {
        if (!pc) ps.push([]);
        ps[ps.length - 1].push(e);
        pc++;
        if (pc > 19) pc = 0;
      });
      return ps;
    }
  },
  destroyed: function () {
    /*this.core.menu(null);*/
    this.menuState.set(null);
  },
  updated: function () {
    /*if(this.countshow === 0) {
     this.scrollToReadMessages();
    }
    this.countshow = 1;*/
  },
  methods: {
    eventinsearchresult: function (event) {
      if (this.searchresults) {
        return _.find(this.searchresults, e => {
          return e.event.event_id == event.event.event_id;
        });
      }
      return false;
    },
    restoreScrollPosition() {
      const container = this.$refs.container;
      const originalScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";
      this.$nextTick(() => {
        container.scrollTo({
          top: this.lastScrollPosition
        });
        container.style.scrollBehavior = originalScrollBehavior;
      });
    },
    saveScrollPosition() {
      var _this$lscroll;
      this.lastScrollPosition = (_this$lscroll = this.lscroll) === null || _this$lscroll === void 0 ? void 0 : _this$lscroll.scrollTop;
    },
    scrollToReadMessages: function () {
      /*if(this.notificationCount > 0) {
      const elem = document.getElementById("eventWrapper_" + (this.notificationCount + 1));
      	if(elem)
       elem.scrollIntoView()
      }*/
    },
    shareEvent: function ({
      event
    }) {
      this.$emit("shareEvent", {
        event
      });
    },
    showerror: function () {
      // stringifyiedError

      return this.$dialog.alert(this.stringifyiedError, {
        okText: "Ok",
        backdropClose: true
      }).catch(e => {});
    },
    dupdated: _.debounce(function () {
      this.$emit("updated", this.size());
    }, 75),
    dscroll: _.debounce(function () {
      return this.scroll();
    }, 35),
    ddscroll: function (e) {
      /*var _ls = this.$refs['container'].scrollTop
      		if (Math.abs(_ls - this.ls) > 500 && this.c * _ls < this.c * this.ls){
      }
      else{
      	this.ls = _ls
      }*/

      this.dscroll();
    },
    emounted: function () {
      this.$nextTick(function () {
        this.scrollCorrection();
        this.dupdated();
      });

      /*if(!this.mobile)
      	new this.smoothScroll(this.$refs["container"], 120, 15);*/
    },
    scroll: function () {
      this.$emit("scroll", this.size());
    },
    size: function () {
      var s = {
        scrollHeight: 0,
        scrollTop: 0,
        clientHeight: 0
      };
      if (this.$refs["container"]) {
        s.scrollHeight = this.$refs["container"].scrollHeight;
        s.scrollTop = this.c * this.$refs["container"].scrollTop;
        s.clientHeight = this.$refs["container"].clientHeight;
      }
      this.lscroll = s;
      return s;
    },
    editingEvent: function ({
      event,
      text
    }) {
      this.$emit("editingEvent", {
        event,
        text
      });
    },
    replyEvent: function ({
      event
    }) {
      this.$emit("replyEvent", {
        event
      });
    },
    removeEvent: function (event) {
      this.$emit("removeEvent", event);
    },
    showPhotoSwipe(index) {
      this.isOpen = true;
      this.$set(this.options, "index", index);
    },
    hidePhotoSwipe() {
      this.isOpen = false;
    },
    galleryOpen(e) {
      this.$emit("galleryEventOpen", e);
    },
    scrolldown() {
      this.scrollToNew(0);
    },
    scrollCorrection() {
      //this.scrollToNew(this.c * this.ls)
    },
    scrollToNew(s) {
      const container = this.$refs["container"];
      if (container.scrolling) {
        container.scrolling(-1, this.c * s);
      } else {
        container.scrollTop = this.c * s;
      }
    },
    scrollToEvent(e) {
      if (this.$refs[e.event.event_id]) {
        var r_element = this.$refs[e.event.event_id][0];
        this.scrollToNew(r_element.offsetTop - this.lscroll.clientHeight / 2 + r_element.clientHeight / 2);
        r_element.classList.add("attention");
        setTimeout(() => {
          r_element.classList.remove("attention");
        }, 1000);
      }
      //this.scrollToNew(120);
    },
    menuIsVisibleHandler: function (isVisible) {
      this.menuOpen = isVisible;
      this.$emit("menuIsVisible", isVisible);
    },
    mousewheel: function (e) {
      if (this.scrollType === "custom") {
        return;
      } else {
        /*if(this.$refs["container"].scrollTop >= this.$refs["container"].scrollHeight - this.$refs["container"].clientHeight - 1 && e.deltaY < 0) {
        	return
        }
        		if(this.$refs["container"].scrollTop == 0 && e.deltaY > 0) {
        	return
        }*/

        e.preventDefault();
        this.$refs["container"].scrollTop += -e.deltaY;

        /*const container = this.$refs["container"];
        if (container.scrolling) {
        	container.scrolling(e);
        }*/

        return false;
      }
    },
    smoothScroll: function (target, speed, smooth) {
      let moving = false,
        pos = target.scrollTop,
        frame = target === document.body && document.documentElement ? document.documentElement : target; // safari is the new IE

      target.scrolling = function (e, dest) {
        let delta = normalizeWheelDelta(e);
        pos += delta * speed;
        pos = Math.max(0, Math.min(pos, dest || target.scrollHeight - frame.clientHeight)); // limit scrolling

        if (!moving) update();
      };
      function normalizeWheelDelta(e) {
        if (e.detail) {
          if (e.wheelDelta) {
            return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1); // Opera
          } else {
            return -e.detail / 3; // Firefox
          }
        } else if (e.wheelDelta) {
          return e.wheelDelta / 120; // IE,Safari,Chrome
        } else {
          return e;
        }
      }
      function update() {
        moving = true;
        let delta = (pos - target.scrollTop) / smooth;
        target.scrollTop += delta;
        if (Math.abs(delta) > 0.5) {
          requestFrame(update);
        } else {
          moving = false;
        }
      }
      let requestFrame = function () {
        // requestAnimationFrame cross browser
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
          window.setTimeout(func, 1000 / 50);
        };
      }();
    },
    showMultiSelect() {
      this.multiSelect = true;
    },
    selectMessage(message) {
      if (this.selectedMessages.filter(item => item.message_id === message.message_id).length === 0) {
        this.selectedMessages.push(message);
      }
    },
    removeMessage(message) {
      const index = this.selectedMessages.findIndex(item => item.message_id === message.message_id);
      if (index !== -1) {
        this.selectedMessages.splice(index, 1);
      }
    },
    toreference(reference) {
      this.$emit("toreference", reference);
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/list?vue&type=script&lang=js&external
 /* harmony default export */ var events_list_vue_type_script_lang_js_external = (list_vue_type_script_lang_js_external); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/events/list/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("8fa1")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  events_list_vue_type_script_lang_js_external,
  listvue_type_template_id_e2a5fc48_scoped_true_render,
  listvue_type_template_id_e2a5fc48_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "e2a5fc48",
  null
  ,true
)

/* harmony default export */ var list = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./src/components/chat/list?vue&type=script&lang=js&external





/* harmony default export */ var chat_list_vue_type_script_lang_js_external = ({
  name: "chatList",
  props: {
    chat: Object,
    filterType: String,
    error: [Object, Error, String],
    selectedMessages: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchresults: null
  },
  components: {
    events: list
  },
  inject: ["streamMode"],
  data: function () {
    return {
      encryptedEvents: [],
      loading: false,
      scrolling: false,
      scrollingTo: 0,
      cancelNextScroll: false,
      timeline: null,
      lastEvent: {},
      scrollType: String,
      esize: {},
      p_b: false,
      p_f: false,
      updateTimeout: null,
      updateInterval: null,
      events: [],
      firstPaginate: true,
      readPromise: null,
      activated: false
    };
  },
  mounted: function () {
    this.init();
    if (this.chat) {
      // this.readAll()
    }
  },
  watch: {
    //$route: 'getdata'

    active: function () {
      // if(this.minimized && !this.active){
      //   this.scrollToNew(0)
      // }
      // if(this.minimized && this.active){
      //   this.readAll();
      // }
    },
    filterType: function () {
      this.init();
    },
    activated: {
      immediate: true,
      handler: function () {
        if (this.updateInterval) {
          clearInterval(this.updateInterval);
          this.updateInterval = null;
        }
        if (this.activated) {
          this.updateInterval = setInterval(this.update, 300);
        } else {}
      }
    }
  },
  computed: {
    ...Object(vuex_esm["d" /* mapState */])({
      lloading: function () {
        return this.loading || this["p_f"] || this["p_b"];
      },
      auth: state => state.auth,
      settings_read: state => !state.dontreadreceipts,
      eventsTypes: function () {
        var types = {
          "m.room.message": true,
          "p.room.encrypt.message": true,
          "p.room.": true,
          "m.room.image": true,
          "m.room.audio": true,
          "m.room.file": true,
          "m.call.invite": true,
          "m.room.request_calls_access": true,
          "m.call.hangup": true,
          "m.call.reject": true,
          "m.fully_read": true
        };
        if (_.toArray(this.chat && this.chat.currentState.members || {}).length > 2) {
          types["m.room.member"] = true;
          types["m.room.power_levels"] = true;
        }
        return types;
      },
      pocketnet: state => state.pocketnet,
      minimized: state => state.minimized,
      active: state => state.active,
      bin: function (state) {
        return state.pocketnet;
      }
    })
  },
  created() {
    this.activated = true;
  },
  beforeDestroy() {
    this.activated = false;
    if (this.timeline) {
      this.timeline.unpaginate(this.timeline._eventCount, true);
    }
  },
  activated() {
    this.activated = true;
  },
  deactivated() {
    this.activated = false;
  },
  methods: {
    editingEvent: function ({
      event,
      text
    }) {
      this.$emit("editingEvent", {
        event,
        text
      });
    },
    replyEvent: function ({
      event
    }) {
      this.$emit("replyEvent", {
        event
      });
    },
    removeEvent: function (event) {
      this.chat.getLiveTimeline().removeEvent(event.event.event_id);
    },
    wh: function () {
      if (this.esize.clientHeight) return this.esize.clientHeight;
    },
    getEvents: function () {
      var events = this.timeline.getEvents();
      var lastCallAccess = events.filter(e => {
        return e.event.type === "m.room.request_calls_access";
      }).pop();
      events = _.filter(events, e => {
        var type = e.event.type;
        if (e.localRedactionEvent() || e.getRedactionEvent()) {
          return;
        }
        if (e.event.type === "m.room.request_calls_access") {
          if (e.event.event_id === lastCallAccess.event.event_id) {
            if (e.event.content.accepted !== null) {
              return false;
            } else {
              return true;
            }
          } else {
            return false;
          }
        }
        if (e.event.type === "m.room.power_levels" && Object.keys(e.event.content.users).length === 1) {
          return;
        }
        if (this.chat.currentState.getMembers().length <= 2 && e.event.type === "m.room.member" && "m.room.power_levels") {
          return;
        }
        return !this.eventsTypes || this.eventsTypes[type];
      });
      events = events.reverse();
      this.relations(events);
      events = _.sortBy(events, function (e) {
        return e.replacingEventDate() || e.getDate() || Infinity;
      });
      events = events.reverse();
      events = _.uniq(events, e => {
        return this.core.mtrx.clearEventId(e) || functions["a" /* default */].makeid();
      });
      events = _.sortBy(events, function (e) {
        return e.getDate() || Infinity;
      });
      events = events.reverse();
      this.$emit("getEvents", events);
      // events = _.filter(events, function (e) {
      //   return e.ty
      // })

      return events;
    },
    getEventsAndEncrypt: function () {
      var events = this.getEvents();
      return Promise.all(_.map(events, e => {
        if (!this.chat.pcrypto) return Promise.resolve();
        if (e.event.decrypted) return Promise.resolve();
        var pr = null;
        var subtype = functions["a" /* default */].deep(e, "event.content.msgtype");

        //if(f.deep(e, 'event.content.msgtype') != 'm.encrypted') return Promise.resolve()

        var einfo = functions["a" /* default */].deep(e, "event.content.info.secrets") || functions["a" /* default */].deep(e, "event.content.pbody.secrets");
        if (einfo) {
          if (subtype == "m.image") {}
          if (subtype == "m.audio") {
            pr = this.core.mtrx.getAudio(this.chat, e).catch(error => {
              console.error(error);
              e.event.decrypted = {
                msgtype: "m.bad.encrypted"
              };
            });
          }
        } else {
          if (subtype == "m.audio") {
            pr = this.core.mtrx.getAudioUnencrypt(this.chat, e);
          }
          if (subtype == "m.encrypted") {
            pr = this.chat.pcrypto.decryptEvent(e.event).then(d => {
              e.event.decrypted = d;
              return Promise.resolve();
            }).catch(e => {
              e.event.decrypted = {
                msgtype: "m.bad.encrypted"
              };
              return Promise.resolve();
            });
          }
        }
        if (!pr) return Promise.resolve();
        return pr.catch(e => {
          return Promise.resolve();
        });
      })).then(() => {
        return Promise.resolve(events);
      });
    },
    relations: function (events) {
      var ts = this.timeline.timelineSet;
      _.each(events, e => {
        try {
          //if(!e.event.content.edited){
          var rt = ts.relations.getChildEventsForEvent(e.event.event_id, "m.replace", "m.room.message");
          if (rt) {
            var last = rt.getLastReplacement();
            if (last) {
              e.event.content.body = last.event.content.body;
              e.event.content.edited = last.event.event_id;
              e.event.content.block = last.event.content.block;
              e.event.content.msgtype = last.event.content.msgtype;
              e.event.decrypted = last.event.decrypted;
            }
          }
        } catch (e) {
          console.error(e);
        }
      });
    },
    customTimelineSet: function () {
      var _ref = Object(asyncToGenerator["a" /* default */])(function* (name, set) {
        if (!name) return;
        var filter = new this.core.mtrx.sdk.Filter(client.getUserId());
        if (typeof set === "function") set(filter);else {
          filter.setDefinition({
            room: {
              timeline: {
                contains_url: this.filterType === "images",
                types: ["m.room.message"]
              }
            }
          });
        }
        filter.filterId = yield this.core.mtrx.client.getOrCreateFilter(`FILTER_${name}_` + this.core.mtrx.client.credentials.userId, filter);
        return this.chat.getOrCreateFilteredTimelineSet(filter);
      });
      return function customTimelineSet(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }(),
    init: function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])(function* () {
        this.loading = true;
        this.firstPaginate = true;

        //this.chat.getTimelineForEvent('$FXUvcjIqcvDu0meLTnz-8plloZoNHLIYEb6WGQMWO3s')

        //this.chat.getTimelineForEvent('$FXUvcjIqcvDu0meLTnz-8plloZoNHLIYEb6WGQMWO3s')

        //this.chat.getLiveTimeline();

        var ts;
        switch (this.filterType) {
          case "images":
            {
              this.scrollType = "custom";
              ts = yield this.customTimelineSet("FILES");
              break;
            }
          case "text":
            {
              ts = yield this.customTimelineSet("TEXT", filter => {
                filter.setDefinition({
                  room: {
                    timeline: {
                      types: ["m.room.message"]
                    }
                  }
                });
              });
              break;
            }
          case "donate":
            {
              ts = yield this.customTimelineSet("TEXT", filter => {
                filter.setDefinition({
                  room: {
                    timeline: {
                      contains_url: true,
                      types: ["m.room.message"]
                    }
                  }
                });
              });
              break;
            }

          /*case "pkoindisabled": {
          	ts = await this.customTimelineSet('TEXT', (filter) => {
          		filter.setDefinition({
          			room: {
          				timeline: {
          					contains_url: false,
          					types: ["m.room.message"]
          				},
          			},
          		});
          	});
          	break;
          }*/

          default:
            {
              var timeline = this.chat.getLiveTimeline();
              ts = timeline.getTimelineSet();
            }
        }
        this.timeline = new this.core.mtrx.sdk.TimelineWindow(this.core.mtrx.client, ts);
        setTimeout(() => {
          this.timeline.load(
            /*null, (this.wh() || 600)*/).then(r => {
            return this.getEventsAndEncrypt();
          }).then(events => {
            this.events = events;
            this.loading = false;
            setTimeout(() => {
              this.autoPaginateAll();
            }, 300);
          }).catch(e => {
            this.loading = false;
          });
        }, 30);

        /*setTimeout(() => {
        	this.paginateToEvent('$FXUvcjIqcvDu0meLTnz-8plloZoNHLIYEb6WGQMWO3s').then(event => {
        		console.log("TOEVENT", event)
        	})
        }, 1000)*/
      });
      return function init() {
        return _ref2.apply(this, arguments);
      };
    }(),
    paginateToEvent: function (event_id) {
      var event = _.find(this.events, e => {
        return e.event.event_id == event_id;
      });
      if (event) {
        return Promise.resolve(event);
      } else {
        var promise = this.paginate("b");
        if (promise) {
          return promise.then(() => {
            return this.paginateToEvent(event_id);
          }).catch(e => {
            console.error("EROR", e);
            if (!event) return Promise.resolve(null);
          });
        } else {
          if (!event) return Promise.resolve(null);
        }
      }
    },
    autoPaginate: function (direction) {
      if (this.needLoad(direction)) {
        var pr = this.paginate(direction);
        if (pr) pr.catch(e => {});
      }
    },
    paginate: function (direction, rnd) {
      //$(this.$el).find('.eventsflex')[0]

      if (!this.loading && this.timeline && !this["p_" + direction]) {
        if (this.timeline.canPaginate(direction) || rnd) {
          this["p_" + direction] = true;
          let count = /*this.firstPaginate ? 24 : */20;
          var error = null;
          return this.timeline.paginate(direction, count).then(e => {
            return Promise.resolve();
          }).catch(e => {
            error = e;
            return Promise.resolve();
          }).then(r => {
            return this.getEventsAndEncrypt();
          }).then(events => {
            this.events = events;
            this.firstPaginate = false;
            this["p_" + direction] = false;
          }).catch(e => {
            if (e) return Promise.reject(e);
          });
        } else {
          this.readAll();
        }
      }
    },
    autoPaginateAll: function () {
      if (this.filterType === "images") {
        this.autoPaginate("b");
      } else {
        this.autoPaginate("b");
        this.autoPaginate("f");
      }
    },
    needLoad: function (direction) {
      var r = false;
      var scrollHeight = this.esize.scrollHeight || 0;
      var scrollTop = this.esize.scrollTop || 0;
      var clientHeight = Math.max(this.esize.clientHeight || 0, 800);
      if (direction == "b") {
        var safespace = clientHeight;
        if (scrollHeight - scrollTop < clientHeight + safespace) r = true;
      } else {
        if (scrollTop < clientHeight) r = true;
      }
      return r;
    },
    readEvent: function (event) {
      if (this.streamMode) return;
      var byme = this.core.mtrx.me(event.event.sender);
      if (byme) {
        return;
      }
      this.core.mtrx.client.sendReadReceipt(event);
    },
    readFirst: function () {
      if (this.streamMode) return;
      var events = this.timeline.getEvents();
      this.readEvent(events[0]);
    },
    readLast: function () {
      if (this.streamMode) return;
      var events = this.timeline.getEvents();
      this.readEvent(events[events.length - 1]);
    },
    readEvents: function (events) {
      if (this.streamMode) return;
      _.each(events, e => {
        this.readEvent(e);
      });
    },
    readOne() {
      if (this.streamMode) return;
      this.core.mtrx.client(this.chat.timeline[this.chat.timeline.length - 1]).then(r => {
        return r;
      });
    },
    debouncedReadAll: _.debounce(function () {
      if (!this.chat || this.streamMode) return;
      if (this.readPromise) return;
      var i = this.chat.timeline.length - 1;
      var event = null;
      event = this.chat.timeline[i];

      /*while (i >= 0 && !event) {
      	var e = this.chat.timeline[i];
      			var type = (e.event.type || "")
      			if (type.indexOf('m.call') > -1){
      		if(type.indexOf('candidates') > -1 ) {
      			return
      		}
      	}
      			if(e.readed) return
      			if (!this.core.mtrx.me(e.sender.userId)) {
      				if(!this.core.mtrx.isReaded(e)){
      			event = e;
      		}
      		
      	}
      	else{
      	
      	}
      			i--;
      }*/

      if (event) {
        if (event.readError) {
          return;
        }
        var eid = event.event.event_id;
        this.readPromise = this.streamMode || this.core.mtrx.client.setRoomReadMarkers(this.chat.currentState.roomId, eid, event /*, {
                                                                                                                                 hidden: !this.settings_read ? true : false,
                                                                                                                                 }*/).then(r => {
          event.readed = true;
          return r;
        }).catch(e => {
          console.error(e);
          event.readError = e;
        }).finally(() => {
          this.readPromise = null;
        });
      }
    }, 100),
    readAll: function () {
      if (document.hasFocus() && (!this.pocketnet || this.active) && !this.core.hiddenInParent && this.chat && this.chat.getJoinedMemberCount() > 0 && this.chat.getUnreadNotificationCount() !== 0) {
        this.debouncedReadAll();
      }
    },
    //////////////

    scrollE: function (size) {
      this.updatedSize(size);
      this.$emit("scroll", size);
    },
    updatedSize: function (size) {
      this.esize = size;
    },
    update: function (e) {
      if (!this.activated) return;
      if (!this.scrolling) {
        this.autoPaginateAll();
      } else {
        // e.preventDefault()
      }
    },
    scrollToNew: function (s) {
      this.scrolling = true;
      this.$refs.eventslist.scrollToNew(s);
      this.scrolling = false;
    },
    imageGallery: function (e) {
      this.$emit("eventImage", e);
    },
    menuIsVisibleHandler: function (isVisible) {
      this.$emit("menuIsVisible", isVisible);
    },
    scrollToEvent: function (reference) {
      functions["a" /* default */].pretry(() => {
        return !this.loading && this.timeline && !this["p_b"];
      }).then(() => {
        this.$store.state.globalpreloader = true;
        return this.paginateToEvent(reference.event.event_id);
      }).then(event => {
        if (event) {
          setTimeout(() => {
            this.$refs.eventslist.scrollToEvent(event);
          }, 300);
        }
      }).catch(e => {
        console.error(e);
      }).finally(() => {
        this.$store.state.globalpreloader = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/chat/list?vue&type=script&lang=js&external
 /* harmony default export */ var components_chat_list_vue_type_script_lang_js_external = (chat_list_vue_type_script_lang_js_external); 
// CONCATENATED MODULE: ./src/components/chat/list/index.vue



function list_injectStyles (context) {
  
  var style0 = __webpack_require__("6c9b")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var list_component = Object(componentNormalizer["a" /* default */])(
  components_chat_list_vue_type_script_lang_js_external,
  render,
  staticRenderFns,
  false,
  list_injectStyles,
  "2031c374",
  null
  ,true
)

/* harmony default export */ var chat_list = __webpack_exports__["a"] = (list_component.exports);

/***/ }),

/***/ "4fb3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8129");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("541e8887", content, shadowRoot)
};

/***/ }),

/***/ "529c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3c1a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("357f71e2", content, shadowRoot)
};

/***/ }),

/***/ "657b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_name_vue_vue_type_style_index_0_id_8fb6d080_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("529c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_name_vue_vue_type_style_index_0_id_8fb6d080_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_name_vue_vue_type_style_index_0_id_8fb6d080_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_name_vue_vue_type_style_index_0_id_8fb6d080_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_name_vue_vue_type_style_index_0_id_8fb6d080_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "6c9b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2031c374_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d385");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2031c374_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2031c374_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2031c374_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_2031c374_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "8129":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".opacity[data-v-1a53247e]{opacity:0}.chatIcon[data-v-1a53247e]{width:100%;position:relative}.unknowngroupusersicon[data-v-1a53247e]{position:absolute;left:0;top:0;bottom:0;right:0;font-size:.7em;display:flex;justify-content:center;align-items:center;color:#fff}.unknowngroupusers .bgimage[data-v-1a53247e]{transform:scale(.7)}.chatGroupIcon[data-v-1a53247e],.chatGroupIcon img[data-v-1a53247e]{width:100%;height:100%}.chatGroupIcon img[data-v-1a53247e]{border-radius:50%;-o-object-fit:cover;object-fit:cover;-o-object-position:50% 50%;object-position:50% 50%;position:absolute;top:0;z-index:100}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "8fa1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e2a5fc48_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9db0");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e2a5fc48_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e2a5fc48_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e2a5fc48_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_e2a5fc48_prod_scoped_true_lang_sass_external__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "9db0":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f407");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("1ee5f21a", content, shadowRoot)
};

/***/ }),

/***/ "aa20":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4b981a10-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/name.vue?vue&type=template&id=8fb6d080&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "nameline"
  }, [_vm.isShowGroupIcon ? _c('div', {
    staticClass: "iconGroup",
    class: {
      public: _vm.isPublic
    }
  }, [!_vm.isPublic ? _c('i', {
    staticClass: "fas fa-user-friends"
  }) : _c('i', {
    staticClass: "fas fa-users"
  })]) : _vm._e(), _vm.miniappicon ? _c('div', {
    staticClass: "miniappicon"
  }, [_c('bgimage', {
    attrs: {
      "src": _vm.miniappicon
    }
  })], 1) : _vm._e(), _c('div', {
    staticClass: "nameofchat"
  }, [_vm._v(_vm._s(_vm.convertedName))])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/chats/assets/name.vue?vue&type=template&id=8fb6d080&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/chats/assets/name.vue?vue&type=script&lang=js
/* harmony default export */ var namevue_type_script_lang_js = ({
  name: "chatName",
  props: {
    chat: Object,
    preview: Boolean,
    m_chat: {}
  },
  inject: ["matches", "markText"],
  data: function () {
    return {
      //convertedName: ''
    };
  },
  computed: {
    users: function () {
      if (!this.chat) return [];
      var u = this.core.mtrx.anotherChatUsers(this.chat.roomId);

      /*u = _.filter(u, (usr) => {
      	if(usr.membership == 'leave') return false
      			return true
      })*/

      return u;
    },
    convertedName: function () {
      var _this$m_chat, _this$m_chat2;
      if (this.m_chat && this.m_chat.getJoinRule() === "public" && this.m_chat.currentState.getStateEvents("m.room.name").length > 0) {
        var _this$m_chat$currentS;
        return (_this$m_chat$currentS = this.m_chat.currentState.getStateEvents("m.room.name")[0].getContent()) === null || _this$m_chat$currentS === void 0 ? void 0 : _this$m_chat$currentS.name;
      }
      var users = _.filter(this.users, user => {
        return user.userId != this.core.user.userinfo.id;
      });
      var names = _.filter(_.map(users, user => {
        if (this.$store.state.users[user.userId]) return this.$store.state.users[user.userId].name;
      }), function (name) {
        return name;
      });
      if (!names.length) {
        if (this.core.mtrx.chatUsers(this.chat.roomId).length) {
          return "-";
        }
        return "-";
      }
      if (((_this$m_chat = this.m_chat) === null || _this$m_chat === void 0 ? void 0 : _this$m_chat.name.indexOf("@")) == 0) return (_this$m_chat2 = this.m_chat) === null || _this$m_chat2 === void 0 ? void 0 : _this$m_chat2.name.replace("@", "");
      return names.join(", ");
    },
    markMatches: function () {
      return this.markText ? this.markText(this.convertedName, true) : this.convertedName;
    },
    isPublic() {
      return this.isShowGroupIcon && this.m_chat.getJoinRule() === "public";
    },
    isShowGroupIcon() {
      var _this$m_chat3;
      return !this.chat.miniappchat && ((_this$m_chat3 = this.m_chat) === null || _this$m_chat3 === void 0 ? void 0 : _this$m_chat3.name.slice(0, 1)) === "@";
    },
    miniappicon() {
      return this.chat.miniappchat ? this.chat.miniappchat.icon : null;
    }
  },
  mounted: function () {}
});
// CONCATENATED MODULE: ./src/components/chats/assets/name.vue?vue&type=script&lang=js
 /* harmony default export */ var assets_namevue_type_script_lang_js = (namevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/chats/assets/name.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("657b")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_namevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "8fb6d080",
  null
  ,true
)

/* harmony default export */ var assets_name = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "aae0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_1a53247e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4fb3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_1a53247e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_1a53247e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_1a53247e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_icon_vue_vue_type_style_index_0_id_1a53247e_prod_scoped_true_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "d385":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f143");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("09f4c640", content, shadowRoot)
};

/***/ }),

/***/ "f143":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[data-v-2031c374] .eventMember{text-align:left}[data-v-2031c374] .eventMember span{font-size:.9em}.pswp img[data-v-2031c374]{max-width:none;-o-object-fit:contain;object-fit:contain}#chatList.minimized:not(.active) .timeLineWrapper[data-v-2031c374]{padding-left:.5em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "f407":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".eventWrapper[data-v-e2a5fc48] .event{padding:.25em 0}.eventWrapper[data-v-e2a5fc48]{transition:background .3s}.eventWrapper.fromsearch[data-v-e2a5fc48],.eventWrapper.fromsearch[data-v-e2a5fc48] .allscreen{background:rgba(var(--color-bg-ac-bright),.1)}.eventWrapper.attention[data-v-e2a5fc48],.eventWrapper.attention[data-v-e2a5fc48] .allscreen{background:rgb(var(--neutral-grad-0))}.list-enter-active[data-v-e2a5fc48],.list-leave-active[data-v-e2a5fc48]{transition:all 1s}.list-enter[data-v-e2a5fc48],.list-leave-to[data-v-e2a5fc48]{opacity:0}#events[data-v-e2a5fc48]{--events-padding-bottom:77px;left:0;right:0;top:0;bottom:0;padding-bottom:55px;position:absolute;transition:.3s}#events[data-chat-input-embedded=true][data-v-e2a5fc48]{--events-padding-bottom:112px}#events.mobile[data-v-e2a5fc48]{padding-bottom:calc(var(--app-margin-bottom, 0) + var(--events-padding-bottom));transform:translate3d(0,calc(var(--keyboardheight, 0)*-1 - -1px),0)}#events.mobile .scrollbottom[data-v-e2a5fc48]{bottom:6em}.dummyheight[data-v-e2a5fc48]{height:100%;width:2px;left:0;right:0;top:0;bottom:0;background:rgb(var(--color-shadow-base))}.preloadingWrapper[data-v-e2a5fc48]{padding:2em;text-align:center;opacity:.5;color:rgb(var(--text-color))}.scrollbottom[data-v-e2a5fc48]{position:absolute;right:.5em;bottom:4em;cursor:pointer;border-radius:50%;background:rgb(var(--background-main));box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7);color:rgb(var(--color-txt-gray-dark));width:35px;height:35px;line-height:35px;text-align:center;z-index:3}.scrollbottom i[data-v-e2a5fc48]{font-size:.7em}.eventsflex[data-v-e2a5fc48]{display:flex;flex-flow:column;overflow-y:overlay;overflow-x:hidden;max-width:640px;margin:0 auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;flex-wrap:nowrap;width:100%;height:100%;scroll-behavior:auto;continue:fragments;justify-content:flex-start;transform:scaleY(-1);contain:strict}.eventsflex.freeze[data-v-e2a5fc48]{overflow-y:hidden}.eventsflex .ewr[data-v-e2a5fc48]{position:relative}.eventsflex .eventspage[data-v-e2a5fc48],.eventsflex .ewr[data-v-e2a5fc48]{width:100%;display:flex;flex-flow:column;flex-wrap:nowrap;justify-content:flex-start}.eventsflex .errorWrapper[data-v-e2a5fc48]{padding:.5em}.eventsflex .errorWrapper .btnwrp[data-v-e2a5fc48]{padding-top:.5em}.eventsflex .errorWrapper .error[data-v-e2a5fc48]{padding:1em;border-radius:1em;background:rgb(var(--neutral-grad-0))}.eventsflex .errorWrapper[data-v-e2a5fc48],.eventsflex .eventWrapper[data-v-e2a5fc48]{width:100%;transform:scaleY(-1)}.eventsflex.mobile[data-v-e2a5fc48]{scroll-behavior:smooth}.eventsflex.mobile[data-v-e2a5fc48] .dropdown.visible{top:-55px}.eventsflex.mobile[data-v-e2a5fc48] .outer-div .backgr,.eventsflex.mobile[data-v-e2a5fc48] .outer-div .menuwrapper{position:absolute}.eventsflex.mobile.ios.menuOpen[data-v-e2a5fc48]{overflow:visible}.galleryRow[data-v-e2a5fc48]{display:flex;align-items:flex-end}.galleryRow .messageImg[data-v-e2a5fc48]{max-width:50%;margin:0 10px;position:relative}.galleryRow .messageImg .img[data-v-e2a5fc48]{display:block;border-radius:.5em;position:relative;max-width:100%}.galleryRow .messageImg .loadingImg[data-v-e2a5fc48]{display:flex;align-items:center;justify-content:center;border-radius:.5em;position:relative;max-width:300px;height:250px}.galleryRow .messageImg .loadingImg .imgPreview[data-v-e2a5fc48]{border-radius:.5em;position:relative;max-width:100%;height:100%;opacity:.6}.galleryRow .messageImg .loadingImg .clipLoader[data-v-e2a5fc48]{position:absolute;z-index:9999;left:50%;right:0;top:50%;bottom:0;transform:translate(-50,50);display:flex;align-items:center;justify-content:center}.galleryRow .messageImg .imgMsg img[data-v-e2a5fc48]{max-width:100%;-o-object-fit:cover;object-fit:cover;border-radius:1em;display:block}.galleryRow .messageImg .metaLink[data-v-e2a5fc48]{background:#000}.galleryRow .messageImg .metaLink .metaMessageLink .metaTitle[data-v-e2a5fc48]{font-weight:700;font-size:.9em}.galleryRow .messageImg .metaLink .metaMessageLink .metaDescription[data-v-e2a5fc48]{margin:.5em 0;font-size:.8em}.galleryRow .messageImg .metaLink .metaMessageLink .metaImgWrapper[data-v-e2a5fc48]{display:block;max-width:300px;-o-object-fit:cover;object-fit:cover}.galleryRow .messageImg .metaLink .metaMessageLink .metaImgWrapper img[data-v-e2a5fc48]{display:block;width:100%;height:100%}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=matrix-element.2.js.map