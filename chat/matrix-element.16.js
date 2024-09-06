(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[16],{

/***/ "0877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RustCrypto; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2c66");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("249d");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("40e9");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("907a");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("986a");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1d02");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3c5d");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("6ce5");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("2834");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("4ea1");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("88e6");
/* harmony import */ var core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("70cc");
/* harmony import */ var core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("eb03");
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("22e5");
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("c01e");
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("fa76");
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("8306");
/* harmony import */ var core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var another_json__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("3261");
/* harmony import */ var another_json__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(another_json__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _types_membership__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("b2e0");
/* harmony import */ var _models_event__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("03f5");
/* harmony import */ var _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("e44f");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("0036");
/* harmony import */ var _http_api__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("be2e");
/* harmony import */ var _RoomEncryptor__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("1fa7");
/* harmony import */ var _OutgoingRequestProcessor__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("9eee");
/* harmony import */ var _KeyClaimManager__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("1d66");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("67b8");
/* harmony import */ var _crypto_api__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("4076");
/* harmony import */ var _device_converter__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__("6f26");
/* harmony import */ var _secret_storage__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__("420b");
/* harmony import */ var _CrossSigningIdentity__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__("e3ab");
/* harmony import */ var _secret_storage__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__("e98d");
/* harmony import */ var _crypto_key_passphrase__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__("597c");
/* harmony import */ var _crypto_recoverykey__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__("f754");
/* harmony import */ var _verification__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__("bf66");
/* harmony import */ var _types_event__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__("ee85");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__("de1c");
/* harmony import */ var _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__("0fc9");
/* harmony import */ var _backup__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__("16b9");
/* harmony import */ var _ReEmitter__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__("8d85");
/* harmony import */ var _randomstring__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__("d0d0");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__("2ec6");
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__("ac66");
/* harmony import */ var _OutgoingRequestsManager__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__("c2ab");
/* harmony import */ var _PerSessionKeyBackupDownloader__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__("2f97");
/* harmony import */ var _DehydratedDeviceManager__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__("eb1f");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__("6c93");





















function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
/*
Copyright 2022-2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
































var ALL_VERIFICATION_METHODS = [_types__WEBPACK_IMPORTED_MODULE_51__[/* VerificationMethod */ "a"].Sas, _types__WEBPACK_IMPORTED_MODULE_51__[/* VerificationMethod */ "a"].ScanQrCode, _types__WEBPACK_IMPORTED_MODULE_51__[/* VerificationMethod */ "a"].ShowQrCode, _types__WEBPACK_IMPORTED_MODULE_51__[/* VerificationMethod */ "a"].Reciprocate];
/**
 * An implementation of {@link CryptoBackend} using the Rust matrix-sdk-crypto.
 *
 * @internal
 */
class RustCrypto extends _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_42__[/* TypedEventEmitter */ "b"] {
  constructor(logger, /** The `OlmMachine` from the underlying rust crypto sdk. */
  olmMachine,
  /**
   * Low-level HTTP interface: used to make outgoing requests required by the rust SDK.
   *
   * We expect it to set the access token, etc.
   */
  http, /** The local user's User ID. */
  userId, /** The local user's Device ID. */
  _deviceId, /** Interface to server-side secret storage */
  secretStorage, /** Crypto callbacks provided by the application */
  cryptoCallbacks) {
    super();
    this.logger = logger;
    this.olmMachine = olmMachine;
    this.http = http;
    this.userId = userId;
    this.secretStorage = secretStorage;
    this.cryptoCallbacks = cryptoCallbacks;
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "_trustCrossSignedDevices", true);
    /** whether {@link stop} has been called */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "stopped", false);
    /** mapping of roomId → encryptor class */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "roomEncryptors", {});
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "eventDecryptor", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "keyClaimManager", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "outgoingRequestProcessor", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "crossSigningIdentity", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "backupManager", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "outgoingRequestsManager", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "perSessionBackupDownloader", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "dehydratedDeviceManager", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "reemitter", new _ReEmitter__WEBPACK_IMPORTED_MODULE_44__[/* TypedReEmitter */ "b"](this));
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // CryptoApi implementation
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "globalBlacklistUnverifiedDevices", false);
    /**
     * The verification methods we offer to the other side during an interactive verification.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "_supportedVerificationMethods", ALL_VERIFICATION_METHODS);
    this.outgoingRequestProcessor = new _OutgoingRequestProcessor__WEBPACK_IMPORTED_MODULE_29__[/* OutgoingRequestProcessor */ "a"](olmMachine, http);
    this.outgoingRequestsManager = new _OutgoingRequestsManager__WEBPACK_IMPORTED_MODULE_48__[/* OutgoingRequestsManager */ "a"](this.logger, olmMachine, this.outgoingRequestProcessor);
    this.keyClaimManager = new _KeyClaimManager__WEBPACK_IMPORTED_MODULE_30__[/* KeyClaimManager */ "a"](olmMachine, this.outgoingRequestProcessor);
    this.backupManager = new _backup__WEBPACK_IMPORTED_MODULE_43__[/* RustBackupManager */ "a"](olmMachine, http, this.outgoingRequestProcessor);
    this.perSessionBackupDownloader = new _PerSessionKeyBackupDownloader__WEBPACK_IMPORTED_MODULE_49__[/* PerSessionKeyBackupDownloader */ "a"](this.logger, this.olmMachine, this.http, this.backupManager);
    this.dehydratedDeviceManager = new _DehydratedDeviceManager__WEBPACK_IMPORTED_MODULE_50__[/* DehydratedDeviceManager */ "a"](this.logger, olmMachine, http, this.outgoingRequestProcessor, secretStorage);
    this.eventDecryptor = new EventDecryptor(this.logger, olmMachine, this.perSessionBackupDownloader);
    this.reemitter.reEmit(this.backupManager, [_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].KeyBackupStatus, _crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].KeyBackupSessionsRemaining, _crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].KeyBackupFailed, _crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].KeyBackupDecryptionKeyCached]);
    this.crossSigningIdentity = new _CrossSigningIdentity__WEBPACK_IMPORTED_MODULE_35__[/* CrossSigningIdentity */ "a"](olmMachine, this.outgoingRequestProcessor, secretStorage);

    // Check and start in background the key backup connection
    this.checkKeyBackupAndEnable();
  }

  /**
   * Return the OlmMachine only if {@link RustCrypto#stop} has not been called.
   *
   * This allows us to better handle race conditions where the client is stopped before or during a crypto API call.
   *
   * @throws ClientStoppedError if {@link RustCrypto#stop} has been called.
   */
  getOlmMachineOrThrow() {
    if (this.stopped) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_46__[/* ClientStoppedError */ "a"]();
    }
    return this.olmMachine;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // CryptoBackend implementation
  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  set globalErrorOnUnknownDevices(_v) {
    // Not implemented for rust crypto.
  }
  get globalErrorOnUnknownDevices() {
    // Not implemented for rust crypto.
    return false;
  }
  stop() {
    // stop() may be called multiple times, but attempting to close() the OlmMachine twice
    // will cause an error.
    if (this.stopped) {
      return;
    }
    this.stopped = true;
    this.keyClaimManager.stop();
    this.backupManager.stop();
    this.outgoingRequestsManager.stop();
    this.perSessionBackupDownloader.stop();
    this.dehydratedDeviceManager.stop();

    // make sure we close() the OlmMachine; doing so means that all the Rust objects will be
    // cleaned up; in particular, the indexeddb connections will be closed, which means they
    // can then be deleted.
    this.olmMachine.close();
  }
  encryptEvent(event, _room) {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var roomId = event.getRoomId();
      var encryptor = _this.roomEncryptors[roomId];
      if (!encryptor) {
        throw new Error("Cannot encrypt event in unconfigured room ".concat(roomId));
      }
      yield encryptor.encryptEvent(event, _this.globalBlacklistUnverifiedDevices);
    })();
  }
  decryptEvent(event) {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var roomId = event.getRoomId();
      if (!roomId) {
        // presumably, a to-device message. These are normally decrypted in preprocessToDeviceMessages
        // so the fact it has come back here suggests that decryption failed.
        //
        // once we drop support for the libolm crypto implementation, we can stop passing to-device messages
        // through decryptEvent and hence get rid of this case.
        throw new Error("to-device event was not decrypted in preprocessToDeviceMessages");
      }
      return yield _this2.eventDecryptor.attemptEventDecryption(event);
    })();
  }

  /**
   * Implementation of (deprecated) {@link MatrixClient#getEventEncryptionInfo}.
   *
   * @param event - event to inspect
   */
  getEventEncryptionInfo(event) {
    var _event$getSenderKey;
    var ret = {};
    ret.senderKey = (_event$getSenderKey = event.getSenderKey()) !== null && _event$getSenderKey !== void 0 ? _event$getSenderKey : undefined;
    ret.algorithm = event.getWireContent().algorithm;
    if (!ret.senderKey || !ret.algorithm) {
      ret.encrypted = false;
      return ret;
    }
    ret.encrypted = true;
    ret.authenticated = true;
    ret.mismatchedSender = true;
    return ret;
  }

  /**
   * Implementation of {@link CryptoBackend#checkUserTrust}.
   *
   * Stub for backwards compatibility.
   *
   */
  checkUserTrust(userId) {
    return new _crypto_api__WEBPACK_IMPORTED_MODULE_32__["UserVerificationStatus"](false, false, false);
  }

  /**
   * Get the cross signing information for a given user.
   *
   * The cross-signing API is currently UNSTABLE and may change without notice.
   *
   * @param userId - the user ID to get the cross-signing info for.
   *
   * @returns the cross signing information for the user.
   */
  getStoredCrossSigningForUser(userId) {
    // TODO
    return null;
  }

  /**
   * This function is unneeded for the rust-crypto.
   * The cross signing key import and the device verification are done in {@link CryptoApi#bootstrapCrossSigning}
   *
   * The function is stub to keep the compatibility with the old crypto.
   * More information: https://github.com/vector-im/element-web/issues/25648
   *
   * Implementation of {@link CryptoBackend#checkOwnCrossSigningTrust}
   */
  checkOwnCrossSigningTrust() {
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return;
    })();
  }

  /**
   * Implementation of {@link CryptoBackend#getBackupDecryptor}.
   */
  getBackupDecryptor(backupInfo, privKey) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      if (backupInfo.algorithm != "m.megolm_backup.v1.curve25519-aes-sha2") {
        throw new Error("getBackupDecryptor Unsupported algorithm ".concat(backupInfo.algorithm));
      }
      var authData = backupInfo.auth_data;
      if (!(privKey instanceof Uint8Array)) {
        throw new Error("getBackupDecryptor expects Uint8Array");
      }
      var backupDecryptionKey = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["BackupDecryptionKey"].fromBase64(Object(_base64__WEBPACK_IMPORTED_MODULE_47__[/* encodeBase64 */ "b"])(privKey));
      if (authData.public_key != backupDecryptionKey.megolmV1PublicKey.publicKeyBase64) {
        throw new Error("getBackupDecryptor key mismatch error");
      }
      return _this3.backupManager.createBackupDecryptor(backupDecryptionKey);
    })();
  }

  /**
   * Implementation of {@link CryptoBackend#importBackedUpRoomKeys}.
   */
  importBackedUpRoomKeys(keys, backupVersion, opts) {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this4.backupManager.importBackedUpRoomKeys(keys, backupVersion, opts);
    })();
  }
  /**
   * Implementation of {@link CryptoApi#getVersion}.
   */
  getVersion() {
    var versions = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["getVersions"]();
    return "Rust SDK ".concat(versions.matrix_sdk_crypto, " (").concat(versions.git_sha, "), Vodozemac ").concat(versions.vodozemac);
  }

  /**
   * Implementation of {@link CryptoApi#isEncryptionEnabledInRoom}.
   */
  isEncryptionEnabledInRoom(roomId) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var roomSettings = yield _this5.olmMachine.getRoomSettings(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](roomId));
      return Boolean(roomSettings === null || roomSettings === void 0 ? void 0 : roomSettings.algorithm);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getOwnDeviceKeys}.
   */
  getOwnDeviceKeys() {
    var _this6 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var keys = _this6.olmMachine.identityKeys;
      return {
        ed25519: keys.ed25519.toBase64(),
        curve25519: keys.curve25519.toBase64()
      };
    })();
  }
  prepareToEncrypt(room) {
    var encryptor = this.roomEncryptors[room.roomId];
    if (encryptor) {
      encryptor.prepareForEncryption(this.globalBlacklistUnverifiedDevices);
    }
  }
  forceDiscardSession(roomId) {
    var _this$roomEncryptors$;
    return (_this$roomEncryptors$ = this.roomEncryptors[roomId]) === null || _this$roomEncryptors$ === void 0 ? void 0 : _this$roomEncryptors$.forceDiscardSession();
  }
  exportRoomKeys() {
    var _this7 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var raw = yield _this7.olmMachine.exportRoomKeys(() => true);
      return JSON.parse(raw);
    })();
  }
  exportRoomKeysAsJson() {
    var _this8 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this8.olmMachine.exportRoomKeys(() => true);
    })();
  }
  importRoomKeys(keys, opts) {
    var _this9 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this9.backupManager.importRoomKeys(keys, opts);
    })();
  }
  importRoomKeysAsJson(keys, opts) {
    var _this10 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this10.backupManager.importRoomKeysAsJson(keys, opts);
    })();
  }

  /**
   * Implementation of {@link CryptoApi.userHasCrossSigningKeys}.
   */
  userHasCrossSigningKeys() {
    var _arguments = arguments,
      _this11 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var userId = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this11.userId;
      var downloadUncached = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
      // TODO: could probably do with a more efficient way of doing this than returning the whole set and searching
      var rustTrackedUsers = yield _this11.olmMachine.trackedUsers();
      var rustTrackedUser;
      for (var u of rustTrackedUsers) {
        if (userId === u.toString()) {
          rustTrackedUser = u;
          break;
        }
      }
      if (rustTrackedUser !== undefined) {
        if (userId === _this11.userId) {
          /* make sure we have an *up-to-date* idea of the user's cross-signing keys. This is important, because if we
           * return "false" here, we will end up generating new cross-signing keys and replacing the existing ones.
           */
          var request = _this11.olmMachine.queryKeysForUsers(
          // clone as rust layer will take ownership and it's reused later
          [rustTrackedUser.clone()]);
          yield _this11.outgoingRequestProcessor.makeOutgoingRequest(request);
        }
        var userIdentity = yield _this11.olmMachine.getIdentity(rustTrackedUser);
        userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity.free();
        return userIdentity !== undefined;
      } else if (downloadUncached) {
        var _keyResult$master_key;
        // Download the cross signing keys and check if the master key is available
        var keyResult = yield _this11.downloadDeviceList(new Set([userId]));
        var keys = (_keyResult$master_key = keyResult.master_keys) === null || _keyResult$master_key === void 0 ? void 0 : _keyResult$master_key[userId];

        // No master key
        if (!keys) return false;

        // `keys` is an object with { [`ed25519:${pubKey}`]: pubKey }
        // We assume only a single key, and we want the bare form without type
        // prefix, so we select the values.
        return Boolean(Object.values(keys.keys)[0]);
      } else {
        return false;
      }
    })();
  }

  /**
   * Get the device information for the given list of users.
   *
   * @param userIds - The users to fetch.
   * @param downloadUncached - If true, download the device list for users whose device list we are not
   *    currently tracking. Defaults to false, in which case such users will not appear at all in the result map.
   *
   * @returns A map `{@link DeviceMap}`.
   */
  getUserDeviceInfo(userIds) {
    var _arguments2 = arguments,
      _this12 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var downloadUncached = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : false;
      var deviceMapByUserId = new Map();
      var rustTrackedUsers = yield _this12.getOlmMachineOrThrow().trackedUsers();

      // Convert RustSdkCryptoJs.UserId to a `Set<string>`
      var trackedUsers = new Set();
      rustTrackedUsers.forEach(rustUserId => trackedUsers.add(rustUserId.toString()));

      // Keep untracked user to download their keys after
      var untrackedUsers = new Set();
      for (var _userId of userIds) {
        // if this is a tracked user, we can just fetch the device list from the rust-sdk
        // (NB: this is probably ok even if we race with a leave event such that we stop tracking the user's
        // devices: the rust-sdk will return the last-known device list, which will be good enough.)
        if (trackedUsers.has(_userId)) {
          deviceMapByUserId.set(_userId, yield _this12.getUserDevices(_userId));
        } else {
          untrackedUsers.add(_userId);
        }
      }

      // for any users whose device lists we are not tracking, fall back to downloading the device list
      // over HTTP.
      if (downloadUncached && untrackedUsers.size >= 1) {
        var queryResult = yield _this12.downloadDeviceList(untrackedUsers);
        Object.entries(queryResult.device_keys).forEach(_ref => {
          var [userId, deviceKeys] = _ref;
          return deviceMapByUserId.set(userId, Object(_device_converter__WEBPACK_IMPORTED_MODULE_33__[/* deviceKeysToDeviceMap */ "a"])(deviceKeys));
        });
      }
      return deviceMapByUserId;
    })();
  }

  /**
   * Get the device list for the given user from the olm machine
   * @param userId - Rust SDK UserId
   */
  getUserDevices(userId) {
    var _this13 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var rustUserId = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId);

      // For reasons I don't really understand, the Javascript FinalizationRegistry doesn't seem to run the
      // registered callbacks when `userDevices` goes out of scope, nor when the individual devices in the array
      // returned by `userDevices.devices` do so.
      //
      // This is particularly problematic, because each of those structures holds a reference to the
      // VerificationMachine, which in turn holds a reference to the IndexeddbCryptoStore. Hence, we end up leaking
      // open connections to the crypto store, which means the store can't be deleted on logout.
      //
      // To fix this, we explicitly call `.free` on each of the objects, which tells the rust code to drop the
      // allocated memory and decrement the refcounts for the crypto store.

      // Wait for up to a second for any in-flight device list requests to complete.
      // The reason for this isn't so much to avoid races (some level of raciness is
      // inevitable for this method) but to make testing easier.
      var userDevices = yield _this13.olmMachine.getUserDevices(rustUserId, 1);
      try {
        var deviceArray = userDevices.devices();
        try {
          return new Map(deviceArray.map(device => [device.deviceId.toString(), Object(_device_converter__WEBPACK_IMPORTED_MODULE_33__[/* rustDeviceToJsDevice */ "b"])(device, rustUserId)]));
        } finally {
          deviceArray.forEach(d => d.free());
        }
      } finally {
        userDevices.free();
      }
    })();
  }

  /**
   * Download the given user keys by calling `/keys/query` request
   * @param untrackedUsers - download keys of these users
   */
  downloadDeviceList(untrackedUsers) {
    var _this14 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var queryBody = {
        device_keys: {}
      };
      untrackedUsers.forEach(user => queryBody.device_keys[user] = []);
      return yield _this14.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_27__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/query", undefined, queryBody, {
        prefix: ""
      });
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getTrustCrossSignedDevices}.
   */
  getTrustCrossSignedDevices() {
    return this._trustCrossSignedDevices;
  }

  /**
   * Implementation of {@link CryptoApi#setTrustCrossSignedDevices}.
   */
  setTrustCrossSignedDevices(val) {
    this._trustCrossSignedDevices = val;
    // TODO: legacy crypto goes through the list of known devices and emits DeviceVerificationChanged
    //  events. Maybe we need to do the same?
  }

  /**
   * Mark the given device as locally verified.
   *
   * Implementation of {@link CryptoApi#setDeviceVerified}.
   */
  setDeviceVerified(userId, deviceId) {
    var _arguments3 = arguments,
      _this15 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var verified = _arguments3.length > 2 && _arguments3[2] !== undefined ? _arguments3[2] : true;
      var device = yield _this15.olmMachine.getDevice(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceId"](deviceId));
      if (!device) {
        throw new Error("Unknown device ".concat(userId, "|").concat(deviceId));
      }
      try {
        yield device.setLocalTrust(verified ? _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["LocalTrust"].Verified : _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["LocalTrust"].Unset);
      } finally {
        device.free();
      }
    })();
  }

  /**
   * Blindly cross-sign one of our other devices.
   *
   * Implementation of {@link CryptoApi#crossSignDevice}.
   */
  crossSignDevice(deviceId) {
    var _this16 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var device = yield _this16.olmMachine.getDevice(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](_this16.userId), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceId"](deviceId));
      if (!device) {
        throw new Error("Unknown device ".concat(deviceId));
      }
      try {
        var outgoingRequest = yield device.verify();
        yield _this16.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
      } finally {
        device.free();
      }
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getDeviceVerificationStatus}.
   */
  getDeviceVerificationStatus(userId, deviceId) {
    var _this17 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var device = yield _this17.olmMachine.getDevice(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceId"](deviceId));
      if (!device) return null;
      try {
        return new _crypto_api__WEBPACK_IMPORTED_MODULE_32__["DeviceVerificationStatus"]({
          signedByOwner: device.isCrossSignedByOwner(),
          crossSigningVerified: device.isCrossSigningTrusted(),
          localVerified: device.isLocallyTrusted(),
          trustCrossSignedDevices: _this17._trustCrossSignedDevices
        });
      } finally {
        device.free();
      }
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getUserVerificationStatus}.
   */
  getUserVerificationStatus(userId) {
    var _this18 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var userIdentity = yield _this18.getOlmMachineOrThrow().getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId));
      if (userIdentity === undefined) {
        return new _crypto_api__WEBPACK_IMPORTED_MODULE_32__["UserVerificationStatus"](false, false, false);
      }
      var verified = userIdentity.isVerified();
      userIdentity.free();
      return new _crypto_api__WEBPACK_IMPORTED_MODULE_32__["UserVerificationStatus"](verified, false, false);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#isCrossSigningReady}
   */
  isCrossSigningReady() {
    var _this19 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var {
        privateKeysInSecretStorage,
        privateKeysCachedLocally
      } = yield _this19.getCrossSigningStatus();
      var hasKeysInCache = Boolean(privateKeysCachedLocally.masterKey) && Boolean(privateKeysCachedLocally.selfSigningKey) && Boolean(privateKeysCachedLocally.userSigningKey);
      var identity = yield _this19.getOwnIdentity();

      // Cross-signing is ready if the public identity is trusted, and the private keys
      // are either cached, or accessible via secret-storage.
      return !!(identity !== null && identity !== void 0 && identity.isVerified()) && (hasKeysInCache || privateKeysInSecretStorage);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getCrossSigningKeyId}
   */
  getCrossSigningKeyId() {
    var _arguments4 = arguments,
      _this20 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var type = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : _crypto_api__WEBPACK_IMPORTED_MODULE_32__["CrossSigningKey"].Master;
      var userIdentity = yield _this20.olmMachine.getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](_this20.userId));
      if (!userIdentity) {
        // The public keys are not available on this device
        return null;
      }
      try {
        var crossSigningStatus = yield _this20.olmMachine.crossSigningStatus();
        var privateKeysOnDevice = crossSigningStatus.hasMaster && crossSigningStatus.hasUserSigning && crossSigningStatus.hasSelfSigning;
        if (!privateKeysOnDevice) {
          // The private keys are not available on this device
          return null;
        }
        if (!userIdentity.isVerified()) {
          // We have both public and private keys, but they don't match!
          return null;
        }
        var key;
        switch (type) {
          case _crypto_api__WEBPACK_IMPORTED_MODULE_32__["CrossSigningKey"].Master:
            key = userIdentity.masterKey;
            break;
          case _crypto_api__WEBPACK_IMPORTED_MODULE_32__["CrossSigningKey"].SelfSigning:
            key = userIdentity.selfSigningKey;
            break;
          case _crypto_api__WEBPACK_IMPORTED_MODULE_32__["CrossSigningKey"].UserSigning:
            key = userIdentity.userSigningKey;
            break;
          default:
            // Unknown type
            return null;
        }
        var parsedKey = JSON.parse(key);
        // `keys` is an object with { [`ed25519:${pubKey}`]: pubKey }
        // We assume only a single key, and we want the bare form without type
        // prefix, so we select the values.
        return Object.values(parsedKey.keys)[0];
      } finally {
        userIdentity.free();
      }
    })();
  }

  /**
   * Implementation of {@link CryptoApi#boostrapCrossSigning}
   */
  bootstrapCrossSigning(opts) {
    var _this21 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      yield _this21.crossSigningIdentity.bootstrapCrossSigning(opts);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#isSecretStorageReady}
   */
  isSecretStorageReady() {
    var _this22 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      // make sure that the cross-signing keys are stored
      var secretsToCheck = ["m.cross_signing.master", "m.cross_signing.user_signing", "m.cross_signing.self_signing"];

      // if key backup is active, we also need to check that the backup decryption key is stored
      var keyBackupEnabled = (yield _this22.backupManager.getActiveBackupVersion()) != null;
      if (keyBackupEnabled) {
        secretsToCheck.push("m.megolm_backup.v1");
      }
      return Object(_secret_storage__WEBPACK_IMPORTED_MODULE_36__[/* secretStorageCanAccessSecrets */ "a"])(_this22.secretStorage, secretsToCheck);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#bootstrapSecretStorage}
   */
  bootstrapSecretStorage() {
    var _arguments5 = arguments,
      _this23 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var {
        createSecretStorageKey,
        setupNewSecretStorage,
        setupNewKeyBackup
      } = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : {};
      // If an AES Key is already stored in the secret storage and setupNewSecretStorage is not set
      // we don't want to create a new key
      var isNewSecretStorageKeyNeeded = setupNewSecretStorage || !(yield _this23.secretStorageHasAESKey());
      if (isNewSecretStorageKeyNeeded) {
        if (!createSecretStorageKey) {
          throw new Error("unable to create a new secret storage key, createSecretStorageKey is not set");
        }

        // Create a new storage key and add it to secret storage
        _this23.logger.info("bootstrapSecretStorage: creating new secret storage key");
        var recoveryKey = yield createSecretStorageKey();
        yield _this23.addSecretStorageKeyToSecretStorage(recoveryKey);
      }
      var crossSigningStatus = yield _this23.olmMachine.crossSigningStatus();
      var hasPrivateKeys = crossSigningStatus.hasMaster && crossSigningStatus.hasSelfSigning && crossSigningStatus.hasUserSigning;

      // If we have cross-signing private keys cached, store them in secret
      // storage if they are not there already.
      if (hasPrivateKeys && (isNewSecretStorageKeyNeeded || !(yield Object(_secret_storage__WEBPACK_IMPORTED_MODULE_36__[/* secretStorageContainsCrossSigningKeys */ "b"])(_this23.secretStorage)))) {
        _this23.logger.info("bootstrapSecretStorage: cross-signing keys not yet exported; doing so now.");
        var crossSigningPrivateKeys = yield _this23.olmMachine.exportCrossSigningKeys();
        if (!crossSigningPrivateKeys.masterKey) {
          throw new Error("missing master key in cross signing private keys");
        }
        if (!crossSigningPrivateKeys.userSigningKey) {
          throw new Error("missing user signing key in cross signing private keys");
        }
        if (!crossSigningPrivateKeys.self_signing_key) {
          throw new Error("missing self signing key in cross signing private keys");
        }
        yield _this23.secretStorage.store("m.cross_signing.master", crossSigningPrivateKeys.masterKey);
        yield _this23.secretStorage.store("m.cross_signing.user_signing", crossSigningPrivateKeys.userSigningKey);
        yield _this23.secretStorage.store("m.cross_signing.self_signing", crossSigningPrivateKeys.self_signing_key);
      }
      if (setupNewKeyBackup) {
        yield _this23.resetKeyBackup();
      }
    })();
  }

  /**
   * Add the secretStorage key to the secret storage
   * - The secret storage key must have the `keyInfo` field filled
   * - The secret storage key is set as the default key of the secret storage
   * - Call `cryptoCallbacks.cacheSecretStorageKey` when done
   *
   * @param secretStorageKey - The secret storage key to add in the secret storage.
   */
  addSecretStorageKeyToSecretStorage(secretStorageKey) {
    var _this24 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var _secretStorageKey$key, _secretStorageKey$key2, _this24$cryptoCallbac, _this24$cryptoCallbac2;
      var secretStorageKeyObject = yield _this24.secretStorage.addKey(_secret_storage__WEBPACK_IMPORTED_MODULE_34__["SECRET_STORAGE_ALGORITHM_V1_AES"], {
        passphrase: (_secretStorageKey$key = secretStorageKey.keyInfo) === null || _secretStorageKey$key === void 0 ? void 0 : _secretStorageKey$key.passphrase,
        name: (_secretStorageKey$key2 = secretStorageKey.keyInfo) === null || _secretStorageKey$key2 === void 0 ? void 0 : _secretStorageKey$key2.name,
        key: secretStorageKey.privateKey
      });
      yield _this24.secretStorage.setDefaultKeyId(secretStorageKeyObject.keyId);
      (_this24$cryptoCallbac = (_this24$cryptoCallbac2 = _this24.cryptoCallbacks).cacheSecretStorageKey) === null || _this24$cryptoCallbac === void 0 ? void 0 : _this24$cryptoCallbac.call(_this24$cryptoCallbac2, secretStorageKeyObject.keyId, secretStorageKeyObject.keyInfo, secretStorageKey.privateKey);
    })();
  }

  /**
   * Check if a secret storage AES Key is already added in secret storage
   *
   * @returns True if an AES key is in the secret storage
   */
  secretStorageHasAESKey() {
    var _this25 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      // See if we already have an AES secret-storage key.
      var secretStorageKeyTuple = yield _this25.secretStorage.getKey();
      if (!secretStorageKeyTuple) return false;
      var [, keyInfo] = secretStorageKeyTuple;

      // Check if the key is an AES key
      return keyInfo.algorithm === _secret_storage__WEBPACK_IMPORTED_MODULE_34__["SECRET_STORAGE_ALGORITHM_V1_AES"];
    })();
  }

  /**
   * Implementation of {@link CryptoApi#getCrossSigningStatus}
   */
  getCrossSigningStatus() {
    var _this26 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var userIdentity = yield _this26.getOlmMachineOrThrow().getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](_this26.userId));
      var publicKeysOnDevice = Boolean(userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity.masterKey) && Boolean(userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity.selfSigningKey) && Boolean(userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity.userSigningKey);
      userIdentity === null || userIdentity === void 0 ? void 0 : userIdentity.free();
      var privateKeysInSecretStorage = yield Object(_secret_storage__WEBPACK_IMPORTED_MODULE_36__[/* secretStorageContainsCrossSigningKeys */ "b"])(_this26.secretStorage);
      var crossSigningStatus = yield _this26.getOlmMachineOrThrow().crossSigningStatus();
      return {
        publicKeysOnDevice,
        privateKeysInSecretStorage,
        privateKeysCachedLocally: {
          masterKey: Boolean(crossSigningStatus === null || crossSigningStatus === void 0 ? void 0 : crossSigningStatus.hasMaster),
          userSigningKey: Boolean(crossSigningStatus === null || crossSigningStatus === void 0 ? void 0 : crossSigningStatus.hasUserSigning),
          selfSigningKey: Boolean(crossSigningStatus === null || crossSigningStatus === void 0 ? void 0 : crossSigningStatus.hasSelfSigning)
        }
      };
    })();
  }

  /**
   * Implementation of {@link CryptoApi#createRecoveryKeyFromPassphrase}
   */
  createRecoveryKeyFromPassphrase(password) {
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      if (password) {
        // Generate the key from the passphrase
        var derivation = yield Object(_crypto_key_passphrase__WEBPACK_IMPORTED_MODULE_37__[/* keyFromPassphrase */ "b"])(password);
        return {
          keyInfo: {
            passphrase: {
              algorithm: "m.pbkdf2",
              iterations: derivation.iterations,
              salt: derivation.salt
            }
          },
          privateKey: derivation.key,
          encodedPrivateKey: Object(_crypto_recoverykey__WEBPACK_IMPORTED_MODULE_38__[/* encodeRecoveryKey */ "b"])(derivation.key)
        };
      } else {
        // Using the navigator crypto API to generate the private key
        var key = new Uint8Array(32);
        globalThis.crypto.getRandomValues(key);
        return {
          privateKey: key,
          encodedPrivateKey: Object(_crypto_recoverykey__WEBPACK_IMPORTED_MODULE_38__[/* encodeRecoveryKey */ "b"])(key)
        };
      }
    })();
  }

  /**
   * Implementation of {@link Crypto.CryptoApi.getEncryptionInfoForEvent}.
   */
  getEncryptionInfoForEvent(event) {
    var _this27 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return _this27.eventDecryptor.getEncryptionInfoForEvent(event);
    })();
  }

  /**
   * Returns to-device verification requests that are already in progress for the given user id.
   *
   * Implementation of {@link CryptoApi#getVerificationRequestsToDeviceInProgress}
   *
   * @param userId - the ID of the user to query
   *
   * @returns the VerificationRequests that are in progress
   */
  getVerificationRequestsToDeviceInProgress(userId) {
    var requests = this.olmMachine.getVerificationRequests(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId));
    return requests.filter(request => request.roomId === undefined).map(request => new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](this.olmMachine, request, this.outgoingRequestProcessor, this._supportedVerificationMethods));
  }

  /**
   * Finds a DM verification request that is already in progress for the given room id
   *
   * Implementation of {@link CryptoApi#findVerificationRequestDMInProgress}
   *
   * @param roomId - the room to use for verification
   * @param userId - search the verification request for the given user
   *
   * @returns the VerificationRequest that is in progress, if any
   *
   */
  findVerificationRequestDMInProgress(roomId, userId) {
    if (!userId) throw new Error("missing userId");
    var requests = this.olmMachine.getVerificationRequests(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId));

    // Search for the verification request for the given room id
    var request = requests.find(request => {
      var _request$roomId;
      return ((_request$roomId = request.roomId) === null || _request$roomId === void 0 ? void 0 : _request$roomId.toString()) === roomId;
    });
    if (request) {
      return new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](this.olmMachine, request, this.outgoingRequestProcessor, this._supportedVerificationMethods);
    }
  }

  /**
   * Implementation of {@link CryptoApi#requestVerificationDM}
   */
  requestVerificationDM(userId, roomId) {
    var _this28 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var userIdentity = yield _this28.olmMachine.getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId));
      if (!userIdentity) throw new Error("unknown userId ".concat(userId));
      try {
        // Transform the verification methods into rust objects
        var methods = _this28._supportedVerificationMethods.map(method => Object(_verification__WEBPACK_IMPORTED_MODULE_39__[/* verificationMethodIdentifierToMethod */ "c"])(method));
        // Get the request content to send to the DM room
        var verificationEventContent = yield userIdentity.verificationRequestContent(methods);

        // Send the request content to send to the DM room
        var eventId = yield _this28.sendVerificationRequestContent(roomId, verificationEventContent);

        // Get a verification request
        var request = yield userIdentity.requestVerification(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](roomId), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["EventId"](eventId), methods);
        return new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](_this28.olmMachine, request, _this28.outgoingRequestProcessor, _this28._supportedVerificationMethods);
      } finally {
        userIdentity.free();
      }
    })();
  }

  /**
   * Send the verification content to a room
   * See https://spec.matrix.org/v1.7/client-server-api/#put_matrixclientv3roomsroomidsendeventtypetxnid
   *
   * Prefer to use {@link OutgoingRequestProcessor.makeOutgoingRequest} when dealing with {@link RustSdkCryptoJs.RoomMessageRequest}
   *
   * @param roomId - the targeted room
   * @param verificationEventContent - the request body.
   *
   * @returns the event id
   */
  sendVerificationRequestContent(roomId, verificationEventContent) {
    var _this29 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var txId = Object(_randomstring__WEBPACK_IMPORTED_MODULE_45__[/* randomString */ "a"])(32);
      // Send the verification request content to the DM room
      var {
        event_id: eventId
      } = yield _this29.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_27__[/* Method */ "i"].Put, "/_matrix/client/v3/rooms/".concat(encodeURIComponent(roomId), "/send/m.room.message/").concat(encodeURIComponent(txId)), undefined, verificationEventContent, {
        prefix: ""
      });
      return eventId;
    })();
  }
  /**
   * Set the verification methods we offer to the other side during an interactive verification.
   *
   * If `undefined`, we will offer all the methods supported by the Rust SDK.
   */
  setSupportedVerificationMethods(methods) {
    // by default, the Rust SDK does not offer `m.qr_code.scan.v1`, but we do want to offer that.
    this._supportedVerificationMethods = methods !== null && methods !== void 0 ? methods : ALL_VERIFICATION_METHODS;
  }

  /**
   * Send a verification request to our other devices.
   *
   * If a verification is already in flight, returns it. Otherwise, initiates a new one.
   *
   * Implementation of {@link CryptoApi#requestOwnUserVerification}.
   *
   * @returns a VerificationRequest when the request has been sent to the other party.
   */
  requestOwnUserVerification() {
    var _this30 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var userIdentity = yield _this30.olmMachine.getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](_this30.userId));
      if (userIdentity === undefined) {
        throw new Error("cannot request verification for this device when there is no existing cross-signing key");
      }
      try {
        var [request, outgoingRequest] = yield userIdentity.requestVerification(_this30._supportedVerificationMethods.map(_verification__WEBPACK_IMPORTED_MODULE_39__[/* verificationMethodIdentifierToMethod */ "c"]));
        yield _this30.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
        return new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](_this30.olmMachine, request, _this30.outgoingRequestProcessor, _this30._supportedVerificationMethods);
      } finally {
        userIdentity.free();
      }
    })();
  }

  /**
   * Request an interactive verification with the given device.
   *
   * If a verification is already in flight, returns it. Otherwise, initiates a new one.
   *
   * Implementation of {@link CryptoApi#requestDeviceVerification}.
   *
   * @param userId - ID of the owner of the device to verify
   * @param deviceId - ID of the device to verify
   *
   * @returns a VerificationRequest when the request has been sent to the other party.
   */
  requestDeviceVerification(userId, deviceId) {
    var _this31 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var device = yield _this31.olmMachine.getDevice(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceId"](deviceId));
      if (!device) {
        throw new Error("Not a known device");
      }
      try {
        var [request, outgoingRequest] = device.requestVerification(_this31._supportedVerificationMethods.map(_verification__WEBPACK_IMPORTED_MODULE_39__[/* verificationMethodIdentifierToMethod */ "c"]));
        yield _this31.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
        return new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](_this31.olmMachine, request, _this31.outgoingRequestProcessor, _this31._supportedVerificationMethods);
      } finally {
        device.free();
      }
    })();
  }

  /**
   * Fetch the backup decryption key we have saved in our store.
   *
   * Implementation of {@link CryptoApi#getSessionBackupPrivateKey}.
   *
   * @returns the key, if any, or null
   */
  getSessionBackupPrivateKey() {
    var _this32 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var backupKeys = yield _this32.olmMachine.getBackupKeys();
      if (!backupKeys.decryptionKey) return null;
      return Buffer.from(backupKeys.decryptionKey.toBase64(), "base64");
    })();
  }

  /**
   * Store the backup decryption key.
   *
   * Implementation of {@link CryptoApi#storeSessionBackupPrivateKey}.
   *
   * @param key - the backup decryption key
   * @param version - the backup version for this key.
   */
  storeSessionBackupPrivateKey(key, version) {
    var _this33 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var base64Key = Object(_base64__WEBPACK_IMPORTED_MODULE_47__[/* encodeBase64 */ "b"])(key);
      if (!version) {
        throw new Error("storeSessionBackupPrivateKey: version is required");
      }
      yield _this33.backupManager.saveBackupDecryptionKey(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["BackupDecryptionKey"].fromBase64(base64Key), version);
    })();
  }

  /**
   * Get the current status of key backup.
   *
   * Implementation of {@link CryptoApi#getActiveSessionBackupVersion}.
   */
  getActiveSessionBackupVersion() {
    var _this34 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this34.backupManager.getActiveBackupVersion();
    })();
  }

  /**
   * Determine if a key backup can be trusted.
   *
   * Implementation of {@link Crypto.CryptoApi.isKeyBackupTrusted}.
   */
  isKeyBackupTrusted(info) {
    var _this35 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this35.backupManager.isKeyBackupTrusted(info);
    })();
  }

  /**
   * Force a re-check of the key backup and enable/disable it as appropriate.
   *
   * Implementation of {@link Crypto.CryptoApi.checkKeyBackupAndEnable}.
   */
  checkKeyBackupAndEnable() {
    var _this36 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this36.backupManager.checkKeyBackupAndEnable(true);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#deleteKeyBackupVersion}.
   */
  deleteKeyBackupVersion(version) {
    var _this37 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      yield _this37.backupManager.deleteKeyBackupVersion(version);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#resetKeyBackup}.
   */
  resetKeyBackup() {
    var _this38 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var backupInfo = yield _this38.backupManager.setupKeyBackup(o => _this38.signObject(o));

      // we want to store the private key in 4S
      // need to check if 4S is set up?
      if (yield _this38.secretStorageHasAESKey()) {
        yield _this38.secretStorage.store("m.megolm_backup.v1", backupInfo.decryptionKey.toBase64());
      }

      // we can check and start async
      _this38.checkKeyBackupAndEnable();
    })();
  }

  /**
   * Signs the given object with the current device and current identity (if available).
   * As defined in {@link https://spec.matrix.org/v1.8/appendices/#signing-json | Signing JSON}.
   *
   * Helper for {@link RustCrypto#resetKeyBackup}.
   *
   * @param obj - The object to sign
   */
  signObject(obj) {
    var _this39 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var sigs = new Map(Object.entries(obj.signatures || {}));
      var unsigned = obj.unsigned;
      delete obj.signatures;
      delete obj.unsigned;
      var userSignatures = sigs.get(_this39.userId) || {};
      var canonalizedJson = another_json__WEBPACK_IMPORTED_MODULE_21___default.a.stringify(obj);
      var signatures = yield _this39.olmMachine.sign(canonalizedJson);
      var map = JSON.parse(signatures.asJSON());
      sigs.set(_this39.userId, _objectSpread(_objectSpread({}, userSignatures), map[_this39.userId]));
      if (unsigned !== undefined) obj.unsigned = unsigned;
      obj.signatures = Object.fromEntries(sigs.entries());
    })();
  }

  /**
   * Implementation of {@link CryptoApi#isDehydrationSupported}.
   */
  isDehydrationSupported() {
    var _this40 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this40.dehydratedDeviceManager.isSupported();
    })();
  }

  /**
   * Implementation of {@link CryptoApi#startDehydration}.
   */
  startDehydration(createNewKey) {
    var _this41 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      if (!(yield _this41.isCrossSigningReady()) || !(yield _this41.isSecretStorageReady())) {
        throw new Error("Device dehydration requires cross-signing and secret storage to be set up");
      }
      return yield _this41.dehydratedDeviceManager.start(createNewKey);
    })();
  }

  /**
   * Implementation of {@link CryptoApi#importSecretsBundle}.
   */
  importSecretsBundle(secrets) {
    var _this42 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var secretsBundle = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["SecretsBundle"].from_json(secrets);
      yield _this42.getOlmMachineOrThrow().importSecretsBundle(secretsBundle); // this method frees the SecretsBundle
    })();
  }

  /**
   * Implementation of {@link CryptoApi#exportSecretsBundle}.
   */
  exportSecretsBundle() {
    var _this43 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var secretsBundle = yield _this43.getOlmMachineOrThrow().exportSecretsBundle();
      var secrets = secretsBundle.to_json();
      secretsBundle.free();
      return secrets;
    })();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SyncCryptoCallbacks implementation
  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Apply sync changes to the olm machine
   * @param events - the received to-device messages
   * @param oneTimeKeysCounts - the received one time key counts
   * @param unusedFallbackKeys - the received unused fallback keys
   * @param devices - the received device list updates
   * @returns A list of preprocessed to-device messages.
   */
  receiveSyncChanges(_ref2) {
    var _this44 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var {
        events,
        oneTimeKeysCounts = new Map(),
        unusedFallbackKeys,
        devices = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceLists"]()
      } = _ref2;
      var result = yield Object(_utils__WEBPACK_IMPORTED_MODULE_31__[/* logDuration */ "u"])(_logger__WEBPACK_IMPORTED_MODULE_26__[/* logger */ "b"], "receiveSyncChanges", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
        return yield _this44.olmMachine.receiveSyncChanges(events ? JSON.stringify(events) : "[]", devices, oneTimeKeysCounts, unusedFallbackKeys);
      }));

      // receiveSyncChanges returns a JSON-encoded list of decrypted to-device messages.
      return JSON.parse(result);
    })();
  }

  /** called by the sync loop to preprocess incoming to-device messages
   *
   * @param events - the received to-device messages
   * @returns A list of preprocessed to-device messages.
   */
  preprocessToDeviceMessages(events) {
    var _this45 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      // send the received to-device messages into receiveSyncChanges. We have no info on device-list changes,
      // one-time-keys, or fallback keys, so just pass empty data.
      var processed = yield _this45.receiveSyncChanges({
        events
      });

      // look for interesting to-device messages
      for (var message of processed) {
        if (message.type === _types_event__WEBPACK_IMPORTED_MODULE_40__[/* EventType */ "b"].KeyVerificationRequest) {
          var sender = message.sender;
          var transactionId = message.content.transaction_id;
          if (transactionId && sender) {
            _this45.onIncomingKeyVerificationRequest(sender, transactionId);
          }
        }
      }
      return processed;
    })();
  }

  /** called by the sync loop to process one time key counts and unused fallback keys
   *
   * @param oneTimeKeysCounts - the received one time key counts
   * @param unusedFallbackKeys - the received unused fallback keys
   */
  processKeyCounts(oneTimeKeysCounts, unusedFallbackKeys) {
    var _this46 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var mapOneTimeKeysCount = oneTimeKeysCounts && new Map(Object.entries(oneTimeKeysCounts));
      var setUnusedFallbackKeys = unusedFallbackKeys && new Set(unusedFallbackKeys);
      if (mapOneTimeKeysCount !== undefined || setUnusedFallbackKeys !== undefined) {
        yield _this46.receiveSyncChanges({
          oneTimeKeysCounts: mapOneTimeKeysCount,
          unusedFallbackKeys: setUnusedFallbackKeys
        });
      }
    })();
  }

  /** called by the sync loop to process the notification that device lists have
   * been changed.
   *
   * @param deviceLists - device_lists field from /sync
   */
  processDeviceLists(deviceLists) {
    var _this47 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var _deviceLists$changed, _deviceLists$left;
      var devices = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DeviceLists"]((_deviceLists$changed = deviceLists.changed) === null || _deviceLists$changed === void 0 ? void 0 : _deviceLists$changed.map(userId => new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId)), (_deviceLists$left = deviceLists.left) === null || _deviceLists$left === void 0 ? void 0 : _deviceLists$left.map(userId => new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](userId)));
      yield _this47.receiveSyncChanges({
        devices
      });
    })();
  }

  /** called by the sync loop on m.room.encrypted events
   *
   * @param room - in which the event was received
   * @param event - encryption event to be processed
   */
  onCryptoEvent(room, event) {
    var _this48 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var config = event.getContent();
      var settings = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomSettings"]();
      if (config.algorithm === "m.megolm.v1.aes-sha2") {
        settings.algorithm = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["EncryptionAlgorithm"].MegolmV1AesSha2;
      } else {
        // Among other situations, this happens if the crypto state event is redacted.
        _this48.logger.warn("Room ".concat(room.roomId, ": ignoring crypto event with invalid algorithm ").concat(config.algorithm));
        return;
      }
      try {
        settings.sessionRotationPeriodMs = config.rotation_period_ms;
        settings.sessionRotationPeriodMessages = config.rotation_period_msgs;
        yield _this48.olmMachine.setRoomSettings(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](room.roomId), settings);
      } catch (e) {
        _this48.logger.warn("Room ".concat(room.roomId, ": ignoring crypto event which caused error: ").concat(e));
        return;
      }

      // If we got this far, the SDK found the event acceptable.
      // We need to either create or update the active RoomEncryptor.
      var existingEncryptor = _this48.roomEncryptors[room.roomId];
      if (existingEncryptor) {
        existingEncryptor.onCryptoEvent(config);
      } else {
        _this48.roomEncryptors[room.roomId] = new _RoomEncryptor__WEBPACK_IMPORTED_MODULE_28__[/* RoomEncryptor */ "a"](_this48.olmMachine, _this48.keyClaimManager, _this48.outgoingRequestsManager, room, config);
      }
    })();
  }

  /** called by the sync loop after processing each sync.
   *
   * TODO: figure out something equivalent for sliding sync.
   *
   * @param syncState - information on the completed sync.
   */
  onSyncCompleted(syncState) {
    // Processing the /sync may have produced new outgoing requests which need sending, so kick off the outgoing
    // request loop, if it's not already running.
    this.outgoingRequestsManager.doProcessOutgoingRequests().catch(e => {
      this.logger.warn("onSyncCompleted: Error processing outgoing requests", e);
    });
  }

  /**
   * Handle an incoming m.key.verification.request event, received either in-room or in a to-device message.
   *
   * @param sender - the sender of the event
   * @param transactionId - the transaction ID for the verification. For to-device messages, this comes from the
   *    content of the message; for in-room messages it is the event ID.
   */
  onIncomingKeyVerificationRequest(sender, transactionId) {
    var request = this.olmMachine.getVerificationRequest(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](sender), transactionId);
    if (request) {
      this.emit(_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].VerificationRequestReceived, new _verification__WEBPACK_IMPORTED_MODULE_39__[/* RustVerificationRequest */ "a"](this.olmMachine, request, this.outgoingRequestProcessor, this._supportedVerificationMethods));
    } else {
      // There are multiple reasons this can happen; probably the most likely is that the event is an
      // in-room event which is too old.
      this.logger.info("Ignoring just-received verification request ".concat(transactionId, " which did not start a rust-side verification"));
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Other public functions
  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** called by the MatrixClient on a room membership event
   *
   * @param event - The matrix event which caused this event to fire.
   * @param member - The member whose RoomMember.membership changed.
   * @param oldMembership - The previous membership state. Null if it's a new member.
   */
  onRoomMembership(event, member, oldMembership) {
    var enc = this.roomEncryptors[event.getRoomId()];
    if (!enc) {
      // not encrypting in this room
      return;
    }
    enc.onRoomMembership(member);
  }

  /** Callback for OlmMachine.registerRoomKeyUpdatedCallback
   *
   * Called by the rust-sdk whenever there is an update to (megolm) room keys. We
   * check if we have any events waiting for the given keys, and schedule them for
   * a decryption retry if so.
   *
   * @param keys - details of the updated keys
   */
  onRoomKeysUpdated(keys) {
    var _this49 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      for (var key of keys) {
        _this49.onRoomKeyUpdated(key);
      }
      _this49.backupManager.maybeUploadKey();
    })();
  }
  onRoomKeyUpdated(key) {
    var _this50 = this;
    if (this.stopped) return;
    this.logger.debug("Got update for session ".concat(key.senderKey.toBase64(), "|").concat(key.sessionId, " in ").concat(key.roomId.toString()));
    var pendingList = this.eventDecryptor.getEventsPendingRoomKey(key.roomId.toString(), key.sessionId);
    if (pendingList.length === 0) return;
    this.logger.debug("Retrying decryption on events:", pendingList.map(e => "".concat(e.getId())));

    // Have another go at decrypting events with this key.
    //
    // We don't want to end up blocking the callback from Rust, which could otherwise end up dropping updates,
    // so we don't wait for the decryption to complete. In any case, there is no need to wait:
    // MatrixEvent.attemptDecryption ensures that there is only one decryption attempt happening at once,
    // and deduplicates repeated attempts for the same event.
    var _loop = function _loop(ev) {
      ev.attemptDecryption(_this50, {
        isRetry: true
      }).catch(_e => {
        _this50.logger.info("Still unable to decrypt event ".concat(ev.getId(), " after receiving key"));
      });
    };
    for (var ev of pendingList) {
      _loop(ev);
    }
  }

  /**
   * Callback for `OlmMachine.registerRoomKeyWithheldCallback`.
   *
   * Called by the rust sdk whenever we are told that a key has been withheld. We see if we had any events that
   * failed to decrypt for the given session, and update their status if so.
   *
   * @param withheld - Details of the withheld sessions.
   */
  onRoomKeysWithheld(withheld) {
    var _this51 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      for (var session of withheld) {
        _this51.logger.debug("Got withheld message for session ".concat(session.sessionId, " in ").concat(session.roomId.toString()));
        var pendingList = _this51.eventDecryptor.getEventsPendingRoomKey(session.roomId.toString(), session.sessionId);
        if (pendingList.length === 0) return;

        // The easiest way to update the status of the event is to have another go at decrypting it.
        _this51.logger.debug("Retrying decryption on events:", pendingList.map(e => "".concat(e.getId())));
        for (var ev of pendingList) {
          ev.attemptDecryption(_this51, {
            isRetry: true
          }).catch(_e => {
            // It's somewhat expected that we still can't decrypt here.
          });
        }
      }
    })();
  }

  /**
   * Callback for `OlmMachine.registerUserIdentityUpdatedCallback`
   *
   * Called by the rust-sdk whenever there is an update to any user's cross-signing status. We re-check their trust
   * status and emit a `UserTrustStatusChanged` event, as well as a `KeysChanged` if it is our own identity that changed.
   *
   * @param userId - the user with the updated identity
   */
  onUserIdentityUpdated(userId) {
    var _this52 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var newVerification = yield _this52.getUserVerificationStatus(userId.toString());
      _this52.emit(_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].UserTrustStatusChanged, userId.toString(), newVerification);

      // If our own user identity has changed, we may now trust the key backup where we did not before.
      // So, re-check the key backup status and enable it if available.
      if (userId.toString() === _this52.userId) {
        _this52.emit(_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].KeysChanged, {});
        yield _this52.checkKeyBackupAndEnable();
      }
    })();
  }

  /**
   * Callback for `OlmMachine.registerDevicesUpdatedCallback`
   *
   * Called when users' devices have updated. Emits `WillUpdateDevices` and `DevicesUpdated`. In the JavaScript
   * crypto backend, these events are called at separate times, with `WillUpdateDevices` being emitted just before
   * the devices are saved, and `DevicesUpdated` being emitted just after. But the OlmMachine only gives us
   * one event, so we emit both events here.
   *
   * @param userIds - an array of user IDs of users whose devices have updated.
   */
  onDevicesUpdated(userIds) {
    var _this53 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      _this53.emit(_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].WillUpdateDevices, userIds, false);
      _this53.emit(_crypto__WEBPACK_IMPORTED_MODULE_41__[/* CryptoEvent */ "b"].DevicesUpdated, userIds, false);
    })();
  }

  /**
   * Handles secret received from the rust secret inbox.
   *
   * The gossipped secrets are received using the `m.secret.send` event type
   * and are guaranteed to have been received over a 1-to-1 Olm
   * Session from a verified device.
   *
   * The only secret currently handled in this way is `m.megolm_backup.v1`.
   *
   * @param name - the secret name
   * @param value - the secret value
   */
  handleSecretReceived(name, value) {
    var _this54 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      _this54.logger.debug("onReceiveSecret: Received secret ".concat(name));
      if (name === "m.megolm_backup.v1") {
        return yield _this54.backupManager.handleBackupSecretReceived(value);
        // XXX at this point we should probably try to download the backup and import the keys,
        // or at least retry for the current decryption failures?
        // Maybe add some signaling when a new secret is received, and let clients handle it?
        // as it's where the restore from backup APIs are exposed.
      }
      return false;
    })();
  }

  /**
   * Called when a new secret is received in the rust secret inbox.
   *
   * Will poll the secret inbox and handle the secrets received.
   *
   * @param name - The name of the secret received.
   */
  checkSecrets(name) {
    var _this55 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var pendingValues = yield _this55.olmMachine.getSecretsFromInbox(name);
      for (var value of pendingValues) {
        if (yield _this55.handleSecretReceived(name, value)) {
          // If we have a valid secret for that name there is no point of processing the other secrets values.
          // It's probably the same secret shared by another device.
          break;
        }
      }

      // Important to call this after handling the secrets as good hygiene.
      yield _this55.olmMachine.deleteSecretsFromInbox(name);
    })();
  }

  /**
   * Handle a live event received via /sync.
   * See {@link ClientEventHandlerMap#event}
   *
   * @param event - live event
   */
  onLiveEventFromSync(event) {
    var _this56 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      // Ignore state event or remote echo
      // transaction_id is provided in case of remote echo {@link https://spec.matrix.org/v1.7/client-server-api/#local-echo}
      if (event.isState() || !!event.getUnsigned().transaction_id) return;
      var processEvent = /*#__PURE__*/function () {
        var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* (evt) {
          // Process only verification event
          if (Object(_verification__WEBPACK_IMPORTED_MODULE_39__[/* isVerificationEvent */ "b"])(event)) {
            yield _this56.onKeyVerificationEvent(evt);
          }
        });
        return function processEvent(_x) {
          return _ref4.apply(this, arguments);
        };
      }();

      // If the event is encrypted of in failure, we wait for decryption
      if (event.isDecryptionFailure() || event.isEncrypted()) {
        // 5 mins
        var TIMEOUT_DELAY = 5 * 60 * 1000;

        // After 5mins, we are not expecting the event to be decrypted
        var timeoutId = setTimeout(() => event.off(_models_event__WEBPACK_IMPORTED_MODULE_24__[/* MatrixEventEvent */ "c"].Decrypted, onDecrypted), TIMEOUT_DELAY);
        var onDecrypted = (decryptedEvent, error) => {
          if (error) return;
          clearTimeout(timeoutId);
          event.off(_models_event__WEBPACK_IMPORTED_MODULE_24__[/* MatrixEventEvent */ "c"].Decrypted, onDecrypted);
          processEvent(decryptedEvent);
        };
        event.on(_models_event__WEBPACK_IMPORTED_MODULE_24__[/* MatrixEventEvent */ "c"].Decrypted, onDecrypted);
      } else {
        yield processEvent(event);
      }
    })();
  }

  /**
   * Handle an in-room key verification event.
   *
   * @param event - a key validation request event.
   */
  onKeyVerificationEvent(event) {
    var _this57 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      var roomId = event.getRoomId();
      if (!roomId) {
        throw new Error("missing roomId in the event");
      }
      _this57.logger.debug("Incoming verification event ".concat(event.getId(), " type ").concat(event.getType(), " from ").concat(event.getSender()));
      yield _this57.olmMachine.receiveVerificationEvent(JSON.stringify({
        event_id: event.getId(),
        type: event.getType(),
        sender: event.getSender(),
        state_key: event.getStateKey(),
        content: event.getContent(),
        origin_server_ts: event.getTs()
      }), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](roomId));
      if (event.getType() === _types_event__WEBPACK_IMPORTED_MODULE_40__[/* EventType */ "b"].RoomMessage && event.getContent().msgtype === _types_event__WEBPACK_IMPORTED_MODULE_40__[/* MsgType */ "e"].KeyVerificationRequest) {
        _this57.onIncomingKeyVerificationRequest(event.getSender(), event.getId());
      }

      // that may have caused us to queue up outgoing requests, so make sure we send them.
      _this57.outgoingRequestsManager.doProcessOutgoingRequests().catch(e => {
        _this57.logger.warn("onKeyVerificationRequest: Error processing outgoing requests", e);
      });
    })();
  }

  /**
   * Returns the cross-signing user identity of the current user.
   *
   * Not part of the public crypto-api interface.
   * Used during migration from legacy js-crypto to update local trust if needed.
   */
  getOwnIdentity() {
    var _this58 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      return yield _this58.olmMachine.getIdentity(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["UserId"](_this58.userId));
    })();
  }
}
class EventDecryptor {
  constructor(logger, olmMachine, perSessionBackupDownloader) {
    this.logger = logger;
    this.olmMachine = olmMachine;
    this.perSessionBackupDownloader = perSessionBackupDownloader;
    /**
     * Events which we couldn't decrypt due to unknown sessions / indexes.
     *
     * Map from roomId to sessionId to Set of MatrixEvents
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_20___default()(this, "eventsPendingKey", new _utils__WEBPACK_IMPORTED_MODULE_31__[/* MapWithDefault */ "b"](() => new _utils__WEBPACK_IMPORTED_MODULE_31__[/* MapWithDefault */ "b"](() => new Set())));
  }
  attemptEventDecryption(event) {
    var _this59 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      // add the event to the pending list *before* attempting to decrypt.
      // then, if the key turns up while decryption is in progress (and
      // decryption fails), we will schedule a retry.
      // (fixes https://github.com/vector-im/element-web/issues/5001)
      _this59.addEventToPendingList(event);
      try {
        var res = yield _this59.olmMachine.decryptRoomEvent(stringifyEvent(event), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](event.getRoomId()));

        // Success. We can remove the event from the pending list, if
        // that hasn't already happened.
        _this59.removeEventFromPendingList(event);
        return {
          clearEvent: JSON.parse(res.event),
          claimedEd25519Key: res.senderClaimedEd25519Key,
          senderCurve25519Key: res.senderCurve25519Key,
          forwardingCurve25519KeyChain: res.forwardingCurve25519KeyChain
        };
      } catch (err) {
        if (err instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["MegolmDecryptionError"]) {
          _this59.onMegolmDecryptionError(event, err, yield _this59.perSessionBackupDownloader.getServerBackupInfo());
        } else {
          throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].UNKNOWN_ERROR, "Unknown error");
        }
      }
    })();
  }

  /**
   * Handle a `MegolmDecryptionError` returned by the rust SDK.
   *
   * Fires off a request to the `perSessionBackupDownloader`, if appropriate, and then throws a `DecryptionError`.
   *
   * @param event - The event which could not be decrypted.
   * @param err - The error from the Rust SDK.
   * @param serverBackupInfo - Details about the current backup from the server. `null` if there is no backup.
   *     `undefined` if our attempt to check failed.
   */
  onMegolmDecryptionError(event, err, serverBackupInfo) {
    var content = event.getWireContent();
    var errorDetails = {
      session: content.sender_key + "|" + content.session_id
    };

    // If the error looks like it might be recoverable from backup, queue up a request to try that.
    if (err.code === _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DecryptionErrorCode"].MissingRoomKey || err.code === _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DecryptionErrorCode"].UnknownMessageIndex) {
      this.perSessionBackupDownloader.onDecryptionKeyMissingError(event.getRoomId(), content.session_id);

      // If the server is telling us our membership at the time the event
      // was sent, and it isn't "join", we use a different error code.
      var membership = event.getMembershipAtEvent();
      if (membership && membership !== _types_membership__WEBPACK_IMPORTED_MODULE_23__[/* KnownMembership */ "a"].Join && membership !== _types_membership__WEBPACK_IMPORTED_MODULE_23__[/* KnownMembership */ "a"].Invite) {
        throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].HISTORICAL_MESSAGE_USER_NOT_JOINED, "This message was sent when we were not a member of the room.", errorDetails);
      }

      // If the event was sent before this device was created, we use some different error codes.
      if (event.getTs() <= this.olmMachine.deviceCreationTimeMs) {
        if (serverBackupInfo === null) {
          throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].HISTORICAL_MESSAGE_NO_KEY_BACKUP, "This message was sent before this device logged in, and there is no key backup on the server.", errorDetails);
        } else if (!this.perSessionBackupDownloader.isKeyBackupDownloadConfigured()) {
          throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].HISTORICAL_MESSAGE_BACKUP_UNCONFIGURED, "This message was sent before this device logged in, and key backup is not working.", errorDetails);
        } else {
          throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].HISTORICAL_MESSAGE_WORKING_BACKUP, "This message was sent before this device logged in. Key backup is working, but we still do not (yet) have the key.", errorDetails);
        }
      }
    }

    // If we got a withheld code, expose that.
    if (err.maybe_withheld) {
      // Unfortunately the Rust SDK API doesn't let us distinguish between different withheld cases, other than
      // by string-matching.
      var failureCode = err.maybe_withheld === "The sender has disabled encrypting to unverified devices." ? _crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].MEGOLM_KEY_WITHHELD_FOR_UNVERIFIED_DEVICE : _crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].MEGOLM_KEY_WITHHELD;
      throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](failureCode, err.maybe_withheld, errorDetails);
    }
    switch (err.code) {
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DecryptionErrorCode"].MissingRoomKey:
        throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].MEGOLM_UNKNOWN_INBOUND_SESSION_ID, "The sender's device has not sent us the keys for this message.", errorDetails);
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["DecryptionErrorCode"].UnknownMessageIndex:
        throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].OLM_UNKNOWN_MESSAGE_INDEX, "The sender's device has not sent us the keys for this message at this index.", errorDetails);

      // We don't map MismatchedIdentityKeys for now, as there is no equivalent in legacy.
      // Just put it on the `UNKNOWN_ERROR` bucket.
      default:
        throw new _common_crypto_CryptoBackend__WEBPACK_IMPORTED_MODULE_25__[/* DecryptionError */ "a"](_crypto_api__WEBPACK_IMPORTED_MODULE_32__["DecryptionFailureCode"].UNKNOWN_ERROR, err.description, errorDetails);
    }
  }
  getEncryptionInfoForEvent(event) {
    var _this60 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_19___default()(function* () {
      if (!event.getClearContent() || event.isDecryptionFailure()) {
        // not successfully decrypted
        return null;
      }

      // special-case outgoing events, which the rust crypto-sdk will barf on
      if (event.status !== null) {
        return {
          shieldColour: _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldColour"].NONE,
          shieldReason: null
        };
      }
      var encryptionInfo = yield _this60.olmMachine.getRoomEventEncryptionInfo(stringifyEvent(event), new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["RoomId"](event.getRoomId()));
      return rustEncryptionInfoToJsEncryptionInfo(_this60.logger, encryptionInfo);
    })();
  }

  /**
   * Look for events which are waiting for a given megolm session
   *
   * Returns a list of events which were encrypted by `session` and could not be decrypted
   */
  getEventsPendingRoomKey(roomId, sessionId) {
    var roomPendingEvents = this.eventsPendingKey.get(roomId);
    if (!roomPendingEvents) return [];
    var sessionPendingEvents = roomPendingEvents.get(sessionId);
    if (!sessionPendingEvents) return [];
    return [...sessionPendingEvents];
  }

  /**
   * Add an event to the list of those awaiting their session keys.
   */
  addEventToPendingList(event) {
    var roomId = event.getRoomId();
    // We shouldn't have events without a room id here.
    if (!roomId) return;
    var roomPendingEvents = this.eventsPendingKey.getOrCreate(roomId);
    var sessionPendingEvents = roomPendingEvents.getOrCreate(event.getWireContent().session_id);
    sessionPendingEvents.add(event);
  }

  /**
   * Remove an event from the list of those awaiting their session keys.
   */
  removeEventFromPendingList(event) {
    var roomId = event.getRoomId();
    if (!roomId) return;
    var roomPendingEvents = this.eventsPendingKey.getOrCreate(roomId);
    if (!roomPendingEvents) return;
    var sessionPendingEvents = roomPendingEvents.get(event.getWireContent().session_id);
    if (!sessionPendingEvents) return;
    sessionPendingEvents.delete(event);

    // also clean up the higher-level maps if they are now empty
    if (sessionPendingEvents.size === 0) {
      roomPendingEvents.delete(event.getWireContent().session_id);
      if (roomPendingEvents.size === 0) {
        this.eventsPendingKey.delete(roomId);
      }
    }
  }
}
function stringifyEvent(event) {
  return JSON.stringify({
    event_id: event.getId(),
    type: event.getWireType(),
    sender: event.getSender(),
    state_key: event.getStateKey(),
    content: event.getWireContent(),
    origin_server_ts: event.getTs()
  });
}
function rustEncryptionInfoToJsEncryptionInfo(logger, encryptionInfo) {
  if (encryptionInfo === undefined) {
    // not decrypted here
    return null;
  }

  // TODO: use strict shield semantics.
  var shieldState = encryptionInfo.shieldState(false);
  var shieldColour;
  switch (shieldState.color) {
    case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["ShieldColor"].Grey:
      shieldColour = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldColour"].GREY;
      break;
    case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_22__["ShieldColor"].None:
      shieldColour = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldColour"].NONE;
      break;
    default:
      shieldColour = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldColour"].RED;
  }
  var shieldReason;
  if (shieldState.message === undefined) {
    shieldReason = null;
  } else if (shieldState.message === "Encrypted by an unverified user.") {
    // this case isn't actually used with lax shield semantics.
    shieldReason = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldReason"].UNVERIFIED_IDENTITY;
  } else if (shieldState.message === "Encrypted by a device not verified by its owner.") {
    shieldReason = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldReason"].UNSIGNED_DEVICE;
  } else if (shieldState.message === "The authenticity of this encrypted message can't be guaranteed on this device.") {
    shieldReason = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldReason"].AUTHENTICITY_NOT_GUARANTEED;
  } else if (shieldState.message === "Encrypted by an unknown or deleted device.") {
    shieldReason = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldReason"].UNKNOWN_DEVICE;
  } else {
    logger.warn("Unknown shield state message '".concat(shieldState.message, "'"));
    shieldReason = _crypto_api__WEBPACK_IMPORTED_MODULE_32__["EventShieldReason"].UNKNOWN;
  }
  return {
    shieldColour,
    shieldReason
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("b639").Buffer))

/***/ }),

/***/ "16b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RustBackupManager; });
/* unused harmony export RustBackupDecryptor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return requestKeyBackupVersion; });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0036");
/* harmony import */ var _http_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("be2e");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("de1c");
/* harmony import */ var _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0fc9");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("67b8");



/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









/** Authentification of the backup info, depends on algorithm */

/**
 * Holds information of a created keybackup.
 * Useful to get the generated private key material and save it securely somewhere.
 */

/**
 * @internal
 */
class RustBackupManager extends _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_7__[/* TypedEventEmitter */ "b"] {
  constructor(olmMachine, http, outgoingRequestProcessor) {
    super();
    this.olmMachine = olmMachine;
    this.http = http;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    /** Have we checked if there is a backup on the server which we can use */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "checkedForBackup", false);
    /**
     * The latest backup version on the server, when we last checked.
     *
     * If there was no backup on the server, `null`. If our attempt to check resulted in an error, `undefined`.
     *
     * Note that the backup was not necessarily verified.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "serverBackupInfo", undefined);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "activeBackupVersion", null);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "stopped", false);
    /** whether {@link backupKeysLoop} is currently running */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "backupKeysLoopRunning", false);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "keyBackupCheckInProgress", null);
  }

  /**
   * Tells the RustBackupManager to stop.
   * The RustBackupManager is scheduling background uploads of keys to the backup, this
   * call allows to cancel the process when the client is stoppped.
   */
  stop() {
    this.stopped = true;
  }

  /**
   * Get the backup version we are currently backing up to, if any
   */
  getActiveBackupVersion() {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      if (!(yield _this.olmMachine.isBackupEnabled())) return null;
      return _this.activeBackupVersion;
    })();
  }

  /**
   * Return the details of the latest backup on the server, when we last checked.
   *
   * This normally returns a cached value, but if we haven't yet made a request to the server, it will fire one off.
   * It will always return the details of the active backup if key backup is enabled.
   *
   * If there was no backup on the server, `null`. If our attempt to check resulted in an error, `undefined`.
   */
  getServerBackupInfo() {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      // Do a validity check if we haven't already done one. The check is likely to fail if we don't yet have the
      // backup keys -- but as a side-effect, it will populate `serverBackupInfo`.
      yield _this2.checkKeyBackupAndEnable(false);
      return _this2.serverBackupInfo;
    })();
  }

  /**
   * Determine if a key backup can be trusted.
   *
   * @param info - key backup info dict from {@link MatrixClient#getKeyBackupVersion}.
   */
  isKeyBackupTrusted(info) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var signatureVerification = yield _this3.olmMachine.verifyBackup(info);
      var backupKeys = yield _this3.olmMachine.getBackupKeys();
      var decryptionKey = backupKeys === null || backupKeys === void 0 ? void 0 : backupKeys.decryptionKey;
      var backupMatchesSavedPrivateKey = !!decryptionKey && backupInfoMatchesBackupDecryptionKey(info, decryptionKey);
      return {
        matchesDecryptionKey: backupMatchesSavedPrivateKey,
        trusted: signatureVerification.trusted()
      };
    })();
  }

  /**
   * Re-check the key backup and enable/disable it as appropriate.
   *
   * @param force - whether we should force a re-check even if one has already happened.
   */
  checkKeyBackupAndEnable(force) {
    if (!force && this.checkedForBackup) {
      return Promise.resolve(null);
    }

    // make sure there is only one check going on at a time
    if (!this.keyBackupCheckInProgress) {
      this.keyBackupCheckInProgress = this.doCheckKeyBackup().finally(() => {
        this.keyBackupCheckInProgress = null;
      });
    }
    return this.keyBackupCheckInProgress;
  }

  /**
   * Handles a backup secret received event and store it if it matches the current backup version.
   *
   * @param secret - The secret as received from a `m.secret.send` event for secret `m.megolm_backup.v1`.
   * @returns true if the secret is valid and has been stored, false otherwise.
   */
  handleBackupSecretReceived(secret) {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var _backupCheck$backupIn;
      // Currently we only receive the decryption key without any key backup version. It is important to
      // check that the secret is valid for the current version before storing it.
      // We force a check to ensure to have the latest version. We also want to check that the backup is trusted
      // as we don't want to store the secret if the backup is not trusted, and eventually import megolm keys later from an untrusted backup.
      var backupCheck = yield _this4.checkKeyBackupAndEnable(true);
      if (!(backupCheck !== null && backupCheck !== void 0 && (_backupCheck$backupIn = backupCheck.backupInfo) !== null && _backupCheck$backupIn !== void 0 && _backupCheck$backupIn.version) || !backupCheck.trustInfo.trusted) {
        // There is no server-side key backup, or the backup is not signed by a trusted cross-signing key or trusted own device.
        // This decryption key is useless to us.
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("handleBackupSecretReceived: Received a backup decryption key, but there is no trusted server-side key backup");
        return false;
      }
      try {
        var backupDecryptionKey = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["BackupDecryptionKey"].fromBase64(secret);
        var privateKeyMatches = backupInfoMatchesBackupDecryptionKey(backupCheck.backupInfo, backupDecryptionKey);
        if (!privateKeyMatches) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("handleBackupSecretReceived: Private decryption key does not match the public key of the current remote backup.");
          // just ignore the secret
          return false;
        }
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].info("handleBackupSecretReceived: A valid backup decryption key has been received and stored in cache.");
        yield _this4.saveBackupDecryptionKey(backupDecryptionKey, backupCheck.backupInfo.version);
        return true;
      } catch (e) {
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("handleBackupSecretReceived: Invalid backup decryption key", e);
      }
      return false;
    })();
  }
  saveBackupDecryptionKey(backupDecryptionKey, version) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      yield _this5.olmMachine.saveBackupDecryptionKey(backupDecryptionKey, version);
      // Emit an event that we have a new backup decryption key, so that the sdk can start
      // importing keys from backup if needed.
      _this5.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupDecryptionKeyCached, version);
    })();
  }

  /**
   * Import a list of room keys previously exported by exportRoomKeys
   *
   * @param keys - a list of session export objects
   * @param opts - options object
   * @returns a promise which resolves once the keys have been imported
   */
  importRoomKeys(keys, opts) {
    var _this6 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      yield _this6.importRoomKeysAsJson(JSON.stringify(keys), opts);
    })();
  }

  /**
   * Import a list of room keys previously exported by exportRoomKeysAsJson
   *
   * @param keys - a JSON string encoding a list of session export objects,
   *    each of which is an IMegolmSessionData
   * @param opts - options object
   * @returns a promise which resolves once the keys have been imported
   */
  importRoomKeysAsJson(jsonKeys, opts) {
    var _this7 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      yield _this7.olmMachine.importExportedRoomKeys(jsonKeys, (progress, total) => {
        var _opts$progressCallbac;
        var importOpt = {
          total: Number(total),
          successes: Number(progress),
          stage: "load_keys",
          failures: 0
        };
        opts === null || opts === void 0 ? void 0 : (_opts$progressCallbac = opts.progressCallback) === null || _opts$progressCallbac === void 0 ? void 0 : _opts$progressCallbac.call(opts, importOpt);
      });
    })();
  }

  /**
   * Implementation of {@link CryptoBackend#importBackedUpRoomKeys}.
   */
  importBackedUpRoomKeys(keys, backupVersion, opts) {
    var _this8 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var keysByRoom = new Map();
      for (var key of keys) {
        var roomId = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["RoomId"](key.room_id);
        if (!keysByRoom.has(roomId)) {
          keysByRoom.set(roomId, new Map());
        }
        keysByRoom.get(roomId).set(key.session_id, key);
      }
      yield _this8.olmMachine.importBackedUpRoomKeys(keysByRoom, (progress, total, failures) => {
        var _opts$progressCallbac2;
        var importOpt = {
          total: Number(total),
          successes: Number(progress),
          stage: "load_keys",
          failures: Number(failures)
        };
        opts === null || opts === void 0 ? void 0 : (_opts$progressCallbac2 = opts.progressCallback) === null || _opts$progressCallbac2 === void 0 ? void 0 : _opts$progressCallbac2.call(opts, importOpt);
      }, backupVersion);
    })();
  }
  /** Helper for `checkKeyBackup` */
  doCheckKeyBackup() {
    var _this9 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Checking key backup status...");
      var backupInfo;
      try {
        backupInfo = yield _this9.requestKeyBackupVersion();
      } catch (e) {
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("Error checking for active key backup", e);
        _this9.serverBackupInfo = undefined;
        return null;
      }
      _this9.checkedForBackup = true;
      if (backupInfo && !backupInfo.version) {
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("active backup lacks a useful 'version'; ignoring it");
        backupInfo = undefined;
      }
      _this9.serverBackupInfo = backupInfo;
      var activeVersion = yield _this9.getActiveBackupVersion();
      if (!backupInfo) {
        if (activeVersion !== null) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("No key backup present on server: disabling key backup");
          yield _this9.disableKeyBackup();
        } else {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("No key backup present on server: not enabling key backup");
        }
        return null;
      }
      var trustInfo = yield _this9.isKeyBackupTrusted(backupInfo);
      if (!trustInfo.trusted) {
        if (activeVersion !== null) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Key backup present on server but not trusted: disabling key backup");
          yield _this9.disableKeyBackup();
        } else {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Key backup present on server but not trusted: not enabling key backup");
        }
      } else {
        if (activeVersion === null) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Found usable key backup v".concat(backupInfo.version, ": enabling key backups"));
          yield _this9.enableKeyBackup(backupInfo);
        } else if (activeVersion !== backupInfo.version) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("On backup version ".concat(activeVersion, " but found version ").concat(backupInfo.version, ": switching."));
          // This will remove any pending backup request, remove the backup key and reset the backup state of each room key we have.
          yield _this9.disableKeyBackup();
          // Enabling will now trigger re-upload of all the keys
          yield _this9.enableKeyBackup(backupInfo);
        } else {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Backup version ".concat(backupInfo.version, " still current"));
        }
      }
      return {
        backupInfo,
        trustInfo
      };
    })();
  }
  enableKeyBackup(backupInfo) {
    var _this10 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      // we know for certain it must be a Curve25519 key, because we have verified it and only Curve25519
      // keys can be verified.
      //
      // we also checked it has a valid `version`.
      yield _this10.olmMachine.enableBackupV1(backupInfo.auth_data.public_key, backupInfo.version);
      _this10.activeBackupVersion = backupInfo.version;
      _this10.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupStatus, true);
      _this10.backupKeysLoop();
    })();
  }

  /**
   * Restart the backup key loop if there is an active trusted backup.
   * Doesn't try to check the backup server side. To be called when a new
   * megolm key is known locally.
   */
  maybeUploadKey() {
    var _this11 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      if (_this11.activeBackupVersion != null) {
        _this11.backupKeysLoop();
      }
    })();
  }
  disableKeyBackup() {
    var _this12 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      yield _this12.olmMachine.disableBackup();
      _this12.activeBackupVersion = null;
      _this12.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupStatus, false);
    })();
  }
  backupKeysLoop() {
    var _arguments = arguments,
      _this13 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var maxDelay = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : 10000;
      if (_this13.backupKeysLoopRunning) {
        _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Backup loop already running");
        return;
      }
      _this13.backupKeysLoopRunning = true;
      _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Backup: Starting keys upload loop for backup version:".concat(_this13.activeBackupVersion, "."));

      // wait between 0 and `maxDelay` seconds, to avoid backup
      // requests from different clients hitting the server all at
      // the same time when a new key is sent
      var delay = Math.random() * maxDelay;
      yield Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* sleep */ "K"])(delay);
      try {
        // number of consecutive network failures for exponential backoff
        var numFailures = 0;
        // The number of keys left to back up. (Populated lazily: see more comments below.)
        var remainingToUploadCount = null;
        // To avoid computing the key when only a few keys were added (after a sync for example),
        // we compute the count only when at least two iterations are needed.
        var isFirstIteration = true;
        while (!_this13.stopped) {
          // Get a batch of room keys to upload
          var request = null;
          try {
            request = yield Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* logDuration */ "u"])(_logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"], "BackupRoomKeys: Get keys to backup from rust crypto-sdk", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
              return yield _this13.olmMachine.backupRoomKeys();
            }));
          } catch (err) {
            _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].error("Backup: Failed to get keys to backup from rust crypto-sdk", err);
          }
          if (!request || _this13.stopped || !_this13.activeBackupVersion) {
            _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Backup: Ending loop for version ".concat(_this13.activeBackupVersion, "."));
            if (!request) {
              // nothing more to upload
              _this13.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupSessionsRemaining, 0);
            }
            return;
          }
          try {
            yield _this13.outgoingRequestProcessor.makeOutgoingRequest(request);
            numFailures = 0;
            if (_this13.stopped) break;

            // Key count performance (`olmMachine.roomKeyCounts()`) can be pretty bad on some configurations.
            // In particular, we detected on some M1 macs that when the object store reaches a threshold, the count
            // performance stops growing in O(n) and suddenly becomes very slow (40s, 60s or more).
            // For reference, the performance drop occurs around 300-400k keys on the platforms where this issue is observed.
            // Even on other configurations, the count can take several seconds.
            // This will block other operations on the database, like sending messages.
            //
            // This is a workaround to avoid calling `olmMachine.roomKeyCounts()` too often, and only when necessary.
            // We don't call it on the first loop because there could be only a few keys to upload, and we don't want to wait for the count.
            if (!isFirstIteration && remainingToUploadCount === null) {
              try {
                var keyCount = yield _this13.olmMachine.roomKeyCounts();
                remainingToUploadCount = keyCount.total - keyCount.backedUp;
              } catch (err) {
                _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].error("Backup: Failed to get key counts from rust crypto-sdk", err);
              }
            }
            if (remainingToUploadCount !== null) {
              _this13.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupSessionsRemaining, remainingToUploadCount);
              var keysCountInBatch = _this13.keysCountInBatch(request);
              // `OlmMachine.roomKeyCounts` is called only once for the current backupKeysLoop. But new
              // keys could be added during the current loop (after a sync for example).
              // So the count can get out of sync with the real number of remaining keys to upload.
              // Depending on the number of new keys imported and the time to complete the loop,
              // this could result in multiple events being emitted with a remaining key count of 0.
              remainingToUploadCount = Math.max(remainingToUploadCount - keysCountInBatch, 0);
            }
          } catch (err) {
            numFailures++;
            _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].error("Backup: Error processing backup request for rust crypto-sdk", err);
            if (err instanceof _http_api__WEBPACK_IMPORTED_MODULE_5__[/* MatrixError */ "f"]) {
              var errCode = err.data.errcode;
              if (errCode == "M_NOT_FOUND" || errCode == "M_WRONG_ROOM_KEYS_VERSION") {
                _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Backup: Failed to upload keys to current vesion: ".concat(errCode, "."));
                try {
                  yield _this13.disableKeyBackup();
                } catch (error) {
                  _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].error("Backup: An error occurred while disabling key backup:", error);
                }
                _this13.emit(_crypto__WEBPACK_IMPORTED_MODULE_6__[/* CryptoEvent */ "b"].KeyBackupFailed, err.data.errcode);
                // There was an active backup and we are out of sync with the server
                // force a check server side
                _this13.backupKeysLoopRunning = false;
                _this13.checkKeyBackupAndEnable(true);
                return;
              } else if (errCode == "M_LIMIT_EXCEEDED") {
                // wait for that and then continue?
                var waitTime = err.data.retry_after_ms;
                if (waitTime > 0) {
                  yield Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* sleep */ "K"])(waitTime);
                  continue;
                } // else go to the normal backoff
              }
            }

            // Some other errors (mx, network, or CORS or invalid urls?) anyhow backoff
            // exponential backoff if we have failures
            yield Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* sleep */ "K"])(1000 * Math.pow(2, Math.min(numFailures - 1, 4)));
          }
          isFirstIteration = false;
        }
      } finally {
        _this13.backupKeysLoopRunning = false;
      }
    })();
  }

  /**
   * Utility method to count the number of keys in a backup request, in order to update the remaining keys count.
   * This should be the chunk size of the backup request for all requests but the last, but we don't have access to it
   * (it's static in the Rust SDK).
   * @param batch - The backup request to count the keys from.
   *
   * @returns The number of keys in the backup request.
   */
  keysCountInBatch(batch) {
    var parsedBody = JSON.parse(batch.body);
    var count = 0;
    for (var {
      sessions
    } of Object.values(parsedBody.rooms)) {
      count += Object.keys(sessions).length;
    }
    return count;
  }

  /**
   * Get information about the current key backup from the server
   *
   * @returns Information object from API or null if there is no active backup.
   */
  requestKeyBackupVersion() {
    var _this14 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      return yield requestKeyBackupVersion(_this14.http);
    })();
  }

  /**
   * Creates a new key backup by generating a new random private key.
   *
   * If there is an existing backup server side it will be deleted and replaced
   * by the new one.
   *
   * @param signObject - Method that should sign the backup with existing device and
   * existing identity.
   * @returns a KeyBackupCreationInfo - All information related to the backup.
   */
  setupKeyBackup(signObject) {
    var _this15 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      // Clean up any existing backup
      yield _this15.deleteAllKeyBackupVersions();
      var randomKey = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["BackupDecryptionKey"].createRandomKey();
      var pubKey = randomKey.megolmV1PublicKey;
      var authData = {
        public_key: pubKey.publicKeyBase64
      };
      yield signObject(authData);
      var res = yield _this15.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_5__[/* Method */ "i"].Post, "/room_keys/version", undefined, {
        algorithm: pubKey.algorithm,
        auth_data: authData
      }, {
        prefix: _http_api__WEBPACK_IMPORTED_MODULE_5__[/* ClientPrefix */ "a"].V3
      });
      yield _this15.saveBackupDecryptionKey(randomKey, res.version);
      return {
        version: res.version,
        algorithm: pubKey.algorithm,
        authData: authData,
        decryptionKey: randomKey
      };
    })();
  }

  /**
   * Deletes all key backups.
   *
   * Will call the API to delete active backup until there is no more present.
   */
  deleteAllKeyBackupVersions() {
    var _this16 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var _yield$_this16$reques, _yield$_this16$reques2;
      // there could be several backup versions. Delete all to be safe.
      var current = (_yield$_this16$reques = (_yield$_this16$reques2 = yield _this16.requestKeyBackupVersion()) === null || _yield$_this16$reques2 === void 0 ? void 0 : _yield$_this16$reques2.version) !== null && _yield$_this16$reques !== void 0 ? _yield$_this16$reques : null;
      while (current != null) {
        var _yield$_this16$reques3, _yield$_this16$reques4;
        yield _this16.deleteKeyBackupVersion(current);
        current = (_yield$_this16$reques3 = (_yield$_this16$reques4 = yield _this16.requestKeyBackupVersion()) === null || _yield$_this16$reques4 === void 0 ? void 0 : _yield$_this16$reques4.version) !== null && _yield$_this16$reques3 !== void 0 ? _yield$_this16$reques3 : null;
      }

      // XXX: Should this also update Secret Storage and delete any existing keys?
    })();
  }

  /**
   * Deletes the given key backup.
   *
   * @param version - The backup version to delete.
   */
  deleteKeyBackupVersion(version) {
    var _this17 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].debug("deleteKeyBackupVersion v:".concat(version));
      var path = Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* encodeUri */ "k"])("/room_keys/version/$version", {
        $version: version
      });
      yield _this17.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_5__[/* Method */ "i"].Delete, path, undefined, undefined, {
        prefix: _http_api__WEBPACK_IMPORTED_MODULE_5__[/* ClientPrefix */ "a"].V3
      });
    })();
  }

  /**
   * Creates a new backup decryptor for the given private key.
   * @param decryptionKey - The private key to use for decryption.
   */
  createBackupDecryptor(decryptionKey) {
    return new RustBackupDecryptor(decryptionKey);
  }
}

/**
 * Checks if the provided backup info matches the given private key.
 *
 * @param info - The backup info to check.
 * @param backupDecryptionKey - The `BackupDecryptionKey` private key to check against.
 * @returns `true` if the private key can decrypt the backup, `false` otherwise.
 */
function backupInfoMatchesBackupDecryptionKey(info, backupDecryptionKey) {
  var _info$auth_data;
  if (info.algorithm !== "m.megolm_backup.v1.curve25519-aes-sha2") {
    _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].warn("backupMatchesPrivateKey: Unsupported backup algorithm", info.algorithm);
    return false;
  }
  return ((_info$auth_data = info.auth_data) === null || _info$auth_data === void 0 ? void 0 : _info$auth_data.public_key) === backupDecryptionKey.megolmV1PublicKey.publicKeyBase64;
}

/**
 * Implementation of {@link BackupDecryptor} for the rust crypto backend.
 */
class RustBackupDecryptor {
  constructor(decryptionKey) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "decryptionKey", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "sourceTrusted", void 0);
    this.decryptionKey = decryptionKey;
    this.sourceTrusted = false;
  }

  /**
   * Implements {@link BackupDecryptor#decryptSessions}
   */
  decryptSessions(ciphertexts) {
    var _this18 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var keys = [];
      for (var [sessionId, sessionData] of Object.entries(ciphertexts)) {
        try {
          var decrypted = JSON.parse(_this18.decryptionKey.decryptV1(sessionData.session_data.ephemeral, sessionData.session_data.mac, sessionData.session_data.ciphertext));
          decrypted.session_id = sessionId;
          keys.push(decrypted);
        } catch (e) {
          _logger__WEBPACK_IMPORTED_MODULE_4__[/* logger */ "b"].log("Failed to decrypt megolm session from backup", e, sessionData);
        }
      }
      return keys;
    })();
  }

  /**
   * Implements {@link BackupDecryptor#free}
   */
  free() {
    this.decryptionKey.free();
  }
}
function requestKeyBackupVersion(_x) {
  return _requestKeyBackupVersion.apply(this, arguments);
}
function _requestKeyBackupVersion() {
  _requestKeyBackupVersion = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* (http) {
    try {
      return yield http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_5__[/* Method */ "i"].Get, "/room_keys/version", undefined, undefined, {
        prefix: _http_api__WEBPACK_IMPORTED_MODULE_5__[/* ClientPrefix */ "a"].V3
      });
    } catch (e) {
      if (e.errcode === "M_NOT_FOUND") {
        return null;
      } else {
        throw e;
      }
    }
  });
  return _requestKeyBackupVersion.apply(this, arguments);
}

/***/ }),

/***/ "1d66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyClaimManager; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);



/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * KeyClaimManager: linearises calls to OlmMachine.getMissingSessions to avoid races
 *
 * We have one of these per `RustCrypto` (and hence per `MatrixClient`).
 *
 * @internal
 */
class KeyClaimManager {
  constructor(olmMachine, outgoingRequestProcessor) {
    this.olmMachine = olmMachine;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "currentClaimPromise", void 0);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "stopped", false);
    this.currentClaimPromise = Promise.resolve();
  }

  /**
   * Tell the KeyClaimManager to immediately stop processing requests.
   *
   * Any further calls, and any still in the queue, will fail with an error.
   */
  stop() {
    this.stopped = true;
  }

  /**
   * Given a list of users, attempt to ensure that we have Olm Sessions active with each of their devices
   *
   * If we don't have an active olm session, we will claim a one-time key and start one.
   *
   * @param userList - list of userIDs to claim
   */
  ensureSessionsForUsers(logger, userList) {
    // The Rust-SDK requires that we only have one getMissingSessions process in flight at once. This little dance
    // ensures that, by only having one call to ensureSessionsForUsersInner active at once (and making them
    // queue up in order).
    var prom = this.currentClaimPromise.catch(() => {
      // any errors in the previous claim will have been reported already, so there is nothing to do here.
      // we just throw away the error and start anew.
    }).then(() => this.ensureSessionsForUsersInner(logger, userList));
    this.currentClaimPromise = prom;
    return prom;
  }
  ensureSessionsForUsersInner(logger, userList) {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      // bail out quickly if we've been stopped.
      if (_this.stopped) {
        throw new Error("Cannot ensure Olm sessions: shutting down");
      }
      logger.info("Checking for missing Olm sessions");
      // By passing the userId array to rust we transfer ownership of the items to rust, causing
      // them to be invalidated on the JS side as soon as the method is called.
      // As we haven't created the `userList` let's clone the users, to not break the caller from re-using it.
      var claimRequest = yield _this.olmMachine.getMissingSessions(userList.map(u => u.clone()));
      if (claimRequest) {
        logger.info("Making /keys/claim request");
        yield _this.outgoingRequestProcessor.makeOutgoingRequest(claimRequest);
      }
      logger.info("Olm sessions prepared");
    })();
  }
}

/***/ }),

/***/ "1fa7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomEncryptor; });
/* unused harmony export toRustHistoryVisibility */
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ee85");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0036");
/* harmony import */ var _types_partials__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("fa64");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("67b8");
/* harmony import */ var _types_membership__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b2e0");



/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









/**
 * RoomEncryptor: responsible for encrypting messages to a given room
 *
 * @internal
 */
class RoomEncryptor {
  /**
   * @param olmMachine - The rust-sdk's OlmMachine
   * @param keyClaimManager - Our KeyClaimManager, which manages the queue of one-time-key claim requests
   * @param outgoingRequestManager - The OutgoingRequestManager, which manages the queue of outgoing requests.
   * @param room - The room we want to encrypt for
   * @param encryptionSettings - body of the m.room.encryption event currently in force in this room
   */
  constructor(olmMachine, keyClaimManager, outgoingRequestManager, room, encryptionSettings) {
    this.olmMachine = olmMachine;
    this.keyClaimManager = keyClaimManager;
    this.outgoingRequestManager = outgoingRequestManager;
    this.room = room;
    this.encryptionSettings = encryptionSettings;
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "prefixedLogger", void 0);
    /** whether the room members have been loaded and tracked for the first time */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "lazyLoadedMembersResolved", false);
    /**
     * Ensures that there is only one encryption operation at a time for that room.
     *
     * An encryption operation is either a {@link prepareForEncryption} or an {@link encryptEvent} call.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "currentEncryptionPromise", Promise.resolve());
    this.prefixedLogger = _logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"].getChild("[".concat(room.roomId, " encryption]"));

    // start tracking devices for any users already known to be in this room.
    // Do not load members here, would defeat lazy loading.
    var members = room.getJoinedMembers();

    // At this point just mark the known members as tracked, it might not be the full list of members
    // because of lazy loading. This is fine, because we will get a member list update when sending a message for
    // the first time, see `RoomEncryptor#ensureEncryptionSession`
    this.olmMachine.updateTrackedUsers(members.map(u => new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["UserId"](u.userId))).catch(e => this.prefixedLogger.error("Error initializing tracked users", e));
  }

  /**
   * Handle a new `m.room.encryption` event in this room
   *
   * @param config - The content of the encryption event
   */
  onCryptoEvent(config) {
    if (JSON.stringify(this.encryptionSettings) != JSON.stringify(config)) {
      // This should currently be unreachable, since the Rust SDK will reject any attempts to change config.
      throw new Error("Cannot reconfigure an active RoomEncryptor");
    }
  }

  /**
   * Handle a new `m.room.member` event in this room
   *
   * @param member - new membership state
   */
  onRoomMembership(member) {
    if (member.membership == _types_membership__WEBPACK_IMPORTED_MODULE_8__[/* KnownMembership */ "a"].Join || member.membership == _types_membership__WEBPACK_IMPORTED_MODULE_8__[/* KnownMembership */ "a"].Invite && this.room.shouldEncryptForInvitedMembers()) {
      // make sure we are tracking the deviceList for this user
      this.olmMachine.updateTrackedUsers([new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["UserId"](member.userId)]).catch(e => {
        this.prefixedLogger.error("Unable to update tracked users", e);
      });
    }

    // TODO: handle leaves (including our own)
  }

  /**
   * Prepare to encrypt events in this room.
   *
   * This ensures that we have a megolm session ready to use and that we have shared its key with all the devices
   * in the room.
   *
   * @param globalBlacklistUnverifiedDevices - When `true`, it will not send encrypted messages to unverified devices
   */
  prepareForEncryption(globalBlacklistUnverifiedDevices) {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      // We consider a prepareForEncryption as an encryption promise as it will potentially share keys
      // even if it doesn't send an event.
      // Usually this is called when the user starts typing, so we want to make sure we have keys ready when the
      // message is finally sent.
      // If `encryptEvent` is invoked before `prepareForEncryption` has completed, the `encryptEvent` call will wait for
      // `prepareForEncryption` to complete before executing.
      // The part where `encryptEvent` shares the room key will then usually be a no-op as it was already performed by `prepareForEncryption`.
      yield _this.encryptEvent(null, globalBlacklistUnverifiedDevices);
    })();
  }

  /**
   * Encrypt an event for this room, or prepare for encryption.
   *
   * This will ensure that we have a megolm session for this room, share it with the devices in the room, and
   * then, if an event is provided, encrypt it using the session.
   *
   * @param event - Event to be encrypted, or null if only preparing for encryption (in which case we will pre-share the room key).
   * @param globalBlacklistUnverifiedDevices - When `true`, it will not send encrypted messages to unverified devices
   */
  encryptEvent(event, globalBlacklistUnverifiedDevices) {
    var _event$getTxnId,
      _this2 = this;
    var logger = new _logger__WEBPACK_IMPORTED_MODULE_5__[/* LogSpan */ "a"](this.prefixedLogger, event ? (_event$getTxnId = event.getTxnId()) !== null && _event$getTxnId !== void 0 ? _event$getTxnId : "" : "prepareForEncryption");
    // Ensure order of encryption to avoid message ordering issues, as the scheduler only ensures
    // events order after they have been encrypted.
    var prom = this.currentEncryptionPromise.catch(() => {
      // Any errors in the previous call will have been reported already, so there is nothing to do here.
      // we just throw away the error and start anew.
    }).then( /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(logger, "ensureEncryptionSession", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
        yield _this2.ensureEncryptionSession(logger, globalBlacklistUnverifiedDevices);
      }));
      if (event) {
        yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(logger, "encryptEventInner", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
          yield _this2.encryptEventInner(logger, event);
        }));
      }
    }));
    this.currentEncryptionPromise = prom;
    return prom;
  }

  /**
   * Prepare to encrypt events in this room.
   *
   * This ensures that we have a megolm session ready to use and that we have shared its key with all the devices
   * in the room.
   *
   * @param logger - a place to write diagnostics to
   * @param globalBlacklistUnverifiedDevices - When `true`, it will not send encrypted messages to unverified devices
   */
  ensureEncryptionSession(logger, globalBlacklistUnverifiedDevices) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var _this3$room$getBlackl;
      if (_this3.encryptionSettings.algorithm !== "m.megolm.v1.aes-sha2") {
        throw new Error("Cannot encrypt in ".concat(_this3.room.roomId, " for unsupported algorithm '").concat(_this3.encryptionSettings.algorithm, "'"));
      }
      logger.debug("Starting encryption");
      var members = yield _this3.room.getEncryptionTargetMembers();

      // If this is the first time we are sending a message to the room, we may not yet have seen all the members
      // (so the Crypto SDK might not have a device list for them). So, if this is the first time we are encrypting
      // for this room, give the SDK the full list of members, to be on the safe side.
      //
      // This could end up being racy (if two calls to ensureEncryptionSession happen at the same time), but that's
      // not a particular problem, since `OlmMachine.updateTrackedUsers` just adds any users that weren't already tracked.
      if (!_this3.lazyLoadedMembersResolved) {
        yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(_this3.prefixedLogger, "loadMembersIfNeeded: updateTrackedUsers", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
          yield _this3.olmMachine.updateTrackedUsers(members.map(u => new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["UserId"](u.userId)));
        }));
        logger.debug("Updated tracked users");
        _this3.lazyLoadedMembersResolved = true;

        // Query keys in case we don't have them for newly tracked members.
        // It's important after loading members for the first time, as likely most of them won't be
        // known yet and will be unable to decrypt messages despite being in the room for long.
        // This must be done before ensuring sessions. If not the devices of these users are not
        // known yet and will not get the room key.
        // We don't have API to only get the keys queries related to this member list, so we just
        // process the pending requests from the olmMachine. (usually these are processed
        // at the end of the sync, but we can't wait for that).
        // XXX future improvement process only KeysQueryRequests for the users that have never been queried.
        logger.debug("Processing outgoing requests");
        yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(_this3.prefixedLogger, "doProcessOutgoingRequests", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
          yield _this3.outgoingRequestManager.doProcessOutgoingRequests();
        }));
      } else {
        // If members are already loaded it's less critical to await on key queries.
        // We might still want to trigger a processOutgoingRequests here.
        // The call to `ensureSessionsForUsers` below will wait a bit on in-flight key queries we are
        // interested in. If a sync handling happens in the meantime, and some new members are added to the room
        // or have new devices it would give us a chance to query them before sending.
        // It's less critical due to the racy nature of this process.
        logger.debug("Processing outgoing requests in background");
        _this3.outgoingRequestManager.doProcessOutgoingRequests();
      }
      logger.debug("Encrypting for users (shouldEncryptForInvitedMembers: ".concat(_this3.room.shouldEncryptForInvitedMembers(), "):"), members.map(u => "".concat(u.userId, " (").concat(u.membership, ")")));
      var userList = members.map(u => new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["UserId"](u.userId));
      yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(_this3.prefixedLogger, "ensureSessionsForUsers", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
        yield _this3.keyClaimManager.ensureSessionsForUsers(logger, userList);
      }));
      var rustEncryptionSettings = new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["EncryptionSettings"]();
      rustEncryptionSettings.historyVisibility = toRustHistoryVisibility(_this3.room.getHistoryVisibility());

      // We only support megolm
      rustEncryptionSettings.algorithm = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["EncryptionAlgorithm"].MegolmV1AesSha2;

      // We need to convert the rotation period from milliseconds to microseconds
      // See https://spec.matrix.org/v1.8/client-server-api/#mroomencryption and
      // https://matrix-org.github.io/matrix-rust-sdk-crypto-wasm/classes/EncryptionSettings.html#rotationPeriod
      if (typeof _this3.encryptionSettings.rotation_period_ms === "number") {
        rustEncryptionSettings.rotationPeriod = BigInt(_this3.encryptionSettings.rotation_period_ms * 1000);
      }
      if (typeof _this3.encryptionSettings.rotation_period_msgs === "number") {
        rustEncryptionSettings.rotationPeriodMessages = BigInt(_this3.encryptionSettings.rotation_period_msgs);
      }

      // When this.room.getBlacklistUnverifiedDevices() === null, the global settings should be used
      // See Room#getBlacklistUnverifiedDevices
      if ((_this3$room$getBlackl = _this3.room.getBlacklistUnverifiedDevices()) !== null && _this3$room$getBlackl !== void 0 ? _this3$room$getBlackl : globalBlacklistUnverifiedDevices) {
        rustEncryptionSettings.sharingStrategy = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["CollectStrategy"].DeviceBasedStrategyOnlyTrustedDevices;
      } else {
        rustEncryptionSettings.sharingStrategy = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["CollectStrategy"].DeviceBasedStrategyAllDevices;
      }
      yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(_this3.prefixedLogger, "shareRoomKey", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
        var shareMessages = yield _this3.olmMachine.shareRoomKey(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["RoomId"](_this3.room.roomId),
        // safe to pass without cloning, as it's not reused here (before or after)
        userList, rustEncryptionSettings);
        if (shareMessages) {
          for (var m of shareMessages) {
            yield _this3.outgoingRequestManager.outgoingRequestProcessor.makeOutgoingRequest(m);
          }
        }
      }));
    })();
  }

  /**
   * Discard any existing group session for this room
   */
  forceDiscardSession() {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      var r = yield _this4.olmMachine.invalidateGroupSession(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["RoomId"](_this4.room.roomId));
      if (r) {
        _this4.prefixedLogger.info("Discarded existing group session");
      }
    })();
  }
  encryptEventInner(logger, event) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      logger.debug("Encrypting actual message content");
      var encryptedContent = yield _this5.olmMachine.encryptRoomEvent(new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["RoomId"](_this5.room.roomId), event.getType(), JSON.stringify(event.getContent()));
      event.makeEncrypted(_types_event__WEBPACK_IMPORTED_MODULE_4__[/* EventType */ "b"].RoomMessageEncrypted, JSON.parse(encryptedContent), _this5.olmMachine.identityKeys.curve25519.toBase64(), _this5.olmMachine.identityKeys.ed25519.toBase64());
      logger.debug("Encrypted event successfully");
    })();
  }
}

/**
 * Convert a HistoryVisibility to a RustHistoryVisibility
 * @param visibility - HistoryVisibility enum
 * @returns a RustHistoryVisibility enum
 */
function toRustHistoryVisibility(visibility) {
  switch (visibility) {
    case _types_partials__WEBPACK_IMPORTED_MODULE_6__[/* HistoryVisibility */ "b"].Invited:
      return _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["HistoryVisibility"].Invited;
    case _types_partials__WEBPACK_IMPORTED_MODULE_6__[/* HistoryVisibility */ "b"].Joined:
      return _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["HistoryVisibility"].Joined;
    case _types_partials__WEBPACK_IMPORTED_MODULE_6__[/* HistoryVisibility */ "b"].Shared:
      return _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["HistoryVisibility"].Shared;
    case _types_partials__WEBPACK_IMPORTED_MODULE_6__[/* HistoryVisibility */ "b"].WorldReadable:
      return _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_3__["HistoryVisibility"].WorldReadable;
  }
}

/***/ }),

/***/ "2f97":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerSessionKeyBackupDownloader; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _http_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("be2e");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7bf3");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("67b8");




/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




// The minimum time to wait between two retries in case of errors. To avoid hammering the server.
var KEY_BACKUP_BACKOFF = 5000; // ms

/**
 * Enumerates the different kind of errors that can occurs when downloading and importing a key from backup.
 */
var KeyDownloadErrorCode;
(function (KeyDownloadErrorCode) {
  KeyDownloadErrorCode["MISSING_DECRYPTION_KEY"] = "MISSING_DECRYPTION_KEY";
  KeyDownloadErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
  KeyDownloadErrorCode["STOPPED"] = "STOPPED";
})(KeyDownloadErrorCode || (KeyDownloadErrorCode = {}));
class KeyDownloadError extends Error {
  constructor(code) {
    super("Failed to get key from backup: ".concat(code));
    this.code = code;
    this.name = "KeyDownloadError";
  }
}
class KeyDownloadRateLimitError extends Error {
  constructor(retryMillis) {
    super("Failed to get key from backup: rate limited");
    this.retryMillis = retryMillis;
    this.name = "KeyDownloadRateLimitError";
  }
}

/** Details of a megolm session whose key we are trying to fetch. */

/** Holds the current backup decryptor and version that should be used.
 *
 * This is intended to be used as an immutable object (a new instance should be created if the configuration changes),
 * and some of the logic relies on that, so the properties are marked as `readonly`.
 */

/**
 * Used when an 'unable to decrypt' error occurs. It attempts to download the key from the backup.
 *
 * The current backup API lacks pagination, which can lead to lengthy key retrieval times for large histories (several 10s of minutes).
 * To mitigate this, keys are downloaded on demand as decryption errors occurs.
 * While this approach may result in numerous requests, it improves user experience by reducing wait times for message decryption.
 *
 * The PerSessionKeyBackupDownloader is resistant to backup configuration changes: it will automatically resume querying when
 * the backup is configured correctly.
 */
class PerSessionKeyBackupDownloader {
  /**
   * Creates a new instance of PerSessionKeyBackupDownloader.
   *
   * @param backupManager - The backup manager to use.
   * @param olmMachine - The olm machine to use.
   * @param http - The http instance to use.
   * @param logger - The logger to use.
   */
  constructor(logger, olmMachine, http, backupManager) {
    this.olmMachine = olmMachine;
    this.http = http;
    this.backupManager = backupManager;
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "stopped", false);
    /**
     * The version and decryption key to use with current backup if all set up correctly.
     *
     * Will not be set unless `hasConfigurationProblem` is `false`.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "configuration", null);
    /** We remember when a session was requested and not found in backup to avoid query again too soon.
     * Map of session_id to timestamp */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "sessionLastCheckAttemptedTime", new Map());
    /** The logger to use */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "logger", void 0);
    /** Whether the download loop is running. */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "downloadLoopRunning", false);
    /** The list of requests that are queued. */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "queuedRequests", []);
    /** Remembers if we have a configuration problem. */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "hasConfigurationProblem", false);
    /** The current server backup version check promise. To avoid doing a server call if one is in flight. */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "currentBackupVersionCheck", null);
    /**
     * Called when the backup status changes (CryptoEvents)
     * This will trigger a check of the backup configuration.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onBackupStatusChanged", () => {
      // we want to force check configuration, so we clear the current one.
      this.hasConfigurationProblem = false;
      this.configuration = null;
      this.getOrCreateBackupConfiguration().then(configuration => {
        if (configuration) {
          // restart the download loop if it was stopped
          this.downloadKeysLoop();
        }
      });
    });
    this.logger = logger.getChild("[PerSessionKeyBackupDownloader]");
    backupManager.on(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupStatus, this.onBackupStatusChanged);
    backupManager.on(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupFailed, this.onBackupStatusChanged);
    backupManager.on(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupDecryptionKeyCached, this.onBackupStatusChanged);
  }

  /**
   * Check if key download is successfully configured and active.
   *
   * @return `true` if key download is correctly configured and active; otherwise `false`.
   */
  isKeyBackupDownloadConfigured() {
    return this.configuration !== null;
  }

  /**
   * Return the details of the latest backup on the server, when we last checked.
   *
   * This is just a convenience method to expose {@link RustBackupManager.getServerBackupInfo}.
   */
  getServerBackupInfo() {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      return yield _this.backupManager.getServerBackupInfo();
    })();
  }

  /**
   * Called when a MissingRoomKey or UnknownMessageIndex decryption error is encountered.
   *
   * This will try to download the key from the backup if there is a trusted active backup.
   * In case of success the key will be imported and the onRoomKeysUpdated callback will be called
   * internally by the rust-sdk and decryption will be retried.
   *
   * @param roomId - The room ID of the room where the error occurred.
   * @param megolmSessionId - The megolm session ID that is missing.
   */
  onDecryptionKeyMissingError(roomId, megolmSessionId) {
    // Several messages encrypted with the same session may be decrypted at the same time,
    // so we need to be resistant and not query several time the same session.
    if (this.isAlreadyInQueue(roomId, megolmSessionId)) {
      // There is already a request queued for this session, no need to queue another one.
      this.logger.trace("Not checking key backup for session ".concat(megolmSessionId, " as it is already queued"));
      return;
    }
    if (this.wasRequestedRecently(megolmSessionId)) {
      // We already tried to download this session recently and it was not in backup, no need to try again.
      this.logger.trace("Not checking key backup for session ".concat(megolmSessionId, " as it was already requested recently"));
      return;
    }

    // We always add the request to the queue, even if we have a configuration problem (can't access backup).
    // This is to make sure that if the configuration problem is resolved, we will try to download the key.
    // This will happen after an initial sync, at this point the backup will not yet be trusted and the decryption
    // key will not be available, but it will be just after the verification.
    // We don't need to persist it because currently on refresh the sdk will retry to decrypt the messages in error.
    this.queuedRequests.push({
      roomId,
      megolmSessionId
    });

    // Start the download loop if it's not already running.
    this.downloadKeysLoop();
  }
  stop() {
    this.stopped = true;
    this.backupManager.off(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupStatus, this.onBackupStatusChanged);
    this.backupManager.off(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupFailed, this.onBackupStatusChanged);
    this.backupManager.off(_matrix__WEBPACK_IMPORTED_MODULE_5__["CryptoEvent"].KeyBackupDecryptionKeyCached, this.onBackupStatusChanged);
  }
  /** Returns true if the megolm session is already queued for download. */
  isAlreadyInQueue(roomId, megolmSessionId) {
    return this.queuedRequests.some(info => {
      return info.roomId == roomId && info.megolmSessionId == megolmSessionId;
    });
  }

  /**
   * Marks the session as not found in backup, to avoid retrying to soon for a key not in backup
   *
   * @param megolmSessionId - The megolm session ID that is missing.
   */
  markAsNotFoundInBackup(megolmSessionId) {
    var now = Date.now();
    this.sessionLastCheckAttemptedTime.set(megolmSessionId, now);
    // if too big make some cleaning to keep under control
    if (this.sessionLastCheckAttemptedTime.size > 100) {
      this.sessionLastCheckAttemptedTime = new Map(Array.from(this.sessionLastCheckAttemptedTime).filter((sid, ts) => {
        return Math.max(now - ts, 0) < KEY_BACKUP_BACKOFF;
      }));
    }
  }

  /** Returns true if the session was requested recently. */
  wasRequestedRecently(megolmSessionId) {
    var lastCheck = this.sessionLastCheckAttemptedTime.get(megolmSessionId);
    if (!lastCheck) return false;
    return Math.max(Date.now() - lastCheck, 0) < KEY_BACKUP_BACKOFF;
  }
  getBackupDecryptionKey() {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      try {
        return yield _this2.olmMachine.getBackupKeys();
      } catch (e) {
        return null;
      }
    })();
  }

  /**
   * Requests a key from the server side backup.
   *
   * @param version - The backup version to use.
   * @param roomId - The room ID of the room where the error occurred.
   * @param sessionId - The megolm session ID that is missing.
   */
  requestRoomKeyFromBackup(version, roomId, sessionId) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      var path = Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* encodeUri */ "k"])("/room_keys/keys/$roomId/$sessionId", {
        $roomId: roomId,
        $sessionId: sessionId
      });
      return yield _this3.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_4__[/* Method */ "i"].Get, path, {
        version
      }, undefined, {
        prefix: _http_api__WEBPACK_IMPORTED_MODULE_4__[/* ClientPrefix */ "a"].V3
      });
    })();
  }
  downloadKeysLoop() {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      if (_this4.downloadLoopRunning) return;

      // If we have a configuration problem, we don't want to try to download.
      // If any configuration change is detected, we will retry and restart the loop.
      if (_this4.hasConfigurationProblem) return;
      _this4.downloadLoopRunning = true;
      try {
        while (_this4.queuedRequests.length > 0) {
          // we just peek the first one without removing it, so if a new request for same key comes in while we're
          // processing this one, it won't queue another request.
          var request = _this4.queuedRequests[0];
          try {
            // The backup could have changed between the time we queued the request and now, so we need to check
            var configuration = yield _this4.getOrCreateBackupConfiguration();
            if (!configuration) {
              // Backup is not configured correctly, so stop the loop.
              _this4.downloadLoopRunning = false;
              return;
            }
            var result = yield _this4.queryKeyBackup(request.roomId, request.megolmSessionId, configuration);
            if (_this4.stopped) {
              return;
            }
            // We got the encrypted key from backup, let's try to decrypt and import it.
            try {
              yield _this4.decryptAndImport(request, result, configuration);
            } catch (e) {
              _this4.logger.error("Error while decrypting and importing key backup for session ".concat(request.megolmSessionId), e);
            }
            // now remove the request from the queue as we've processed it.
            _this4.queuedRequests.shift();
          } catch (err) {
            if (err instanceof KeyDownloadError) {
              switch (err.code) {
                case KeyDownloadErrorCode.MISSING_DECRYPTION_KEY:
                  _this4.markAsNotFoundInBackup(request.megolmSessionId);
                  // continue for next one
                  _this4.queuedRequests.shift();
                  break;
                case KeyDownloadErrorCode.NETWORK_ERROR:
                  // We don't want to hammer if there is a problem, so wait a bit.
                  yield Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* sleep */ "K"])(KEY_BACKUP_BACKOFF);
                  break;
                case KeyDownloadErrorCode.STOPPED:
                  // If the downloader was stopped, we don't want to retry.
                  _this4.downloadLoopRunning = false;
                  return;
              }
            } else if (err instanceof KeyDownloadRateLimitError) {
              // we want to retry after the backoff time
              yield Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* sleep */ "K"])(err.retryMillis);
            }
          }
        }
      } finally {
        // all pending request have been processed, we can stop the loop.
        _this4.downloadLoopRunning = false;
      }
    })();
  }

  /**
   * Query the backup for a key.
   *
   * @param targetRoomId - ID of the room that the session is used in.
   * @param targetSessionId - ID of the session for which to check backup.
   * @param configuration - The backup configuration to use.
   */
  queryKeyBackup(targetRoomId, targetSessionId, configuration) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      _this5.logger.debug("Checking key backup for session ".concat(targetSessionId));
      if (_this5.stopped) throw new KeyDownloadError(KeyDownloadErrorCode.STOPPED);
      try {
        var res = yield _this5.requestRoomKeyFromBackup(configuration.backupVersion, targetRoomId, targetSessionId);
        _this5.logger.debug("Got key from backup for sessionId:".concat(targetSessionId));
        return res;
      } catch (e) {
        if (_this5.stopped) throw new KeyDownloadError(KeyDownloadErrorCode.STOPPED);
        _this5.logger.info("No luck requesting key backup for session ".concat(targetSessionId, ": ").concat(e));
        if (e instanceof _http_api__WEBPACK_IMPORTED_MODULE_4__[/* MatrixError */ "f"]) {
          var errCode = e.data.errcode;
          if (errCode == "M_NOT_FOUND") {
            // Unfortunately the spec doesn't give us a way to differentiate between a missing key and a wrong version.
            // Synapse will return:
            //     - "error": "Unknown backup version" if the version is wrong.
            //     - "error": "No room_keys found" if the key is missing.
            // It's useful to know if the key is missing or if the version is wrong.
            // As it's not spec'ed, we fall back on considering the key is not in backup.
            // Notice that this request will be lost if instead the backup got out of sync (updated from other session).
            throw new KeyDownloadError(KeyDownloadErrorCode.MISSING_DECRYPTION_KEY);
          }
          if (errCode == "M_LIMIT_EXCEEDED") {
            var waitTime = e.data.retry_after_ms;
            if (waitTime > 0) {
              _this5.logger.info("Rate limited by server, waiting ".concat(waitTime, "ms"));
              throw new KeyDownloadRateLimitError(waitTime);
            } else {
              // apply the default backoff time
              throw new KeyDownloadRateLimitError(KEY_BACKUP_BACKOFF);
            }
          }
        }
        throw new KeyDownloadError(KeyDownloadErrorCode.NETWORK_ERROR);
      }
    })();
  }
  decryptAndImport(sessionInfo, data, configuration) {
    var _this6 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      var sessionsToImport = {
        [sessionInfo.megolmSessionId]: data
      };
      var keys = yield configuration.decryptor.decryptSessions(sessionsToImport);
      for (var k of keys) {
        k.room_id = sessionInfo.roomId;
      }
      yield _this6.backupManager.importBackedUpRoomKeys(keys, configuration.backupVersion);
    })();
  }

  /**
   * Gets the current backup configuration or create one if it doesn't exist.
   *
   * When a valid configuration is found it is cached and returned for subsequent calls.
   * Otherwise, if a check is forced or a check has not yet been done, a new check is done.
   *
   * @returns The backup configuration to use or null if there is a configuration problem.
   */
  getOrCreateBackupConfiguration() {
    var _this7 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      if (_this7.configuration) {
        return _this7.configuration;
      }

      // We already tried to check the configuration and it failed.
      // We don't want to try again immediately, we will retry if a configuration change is detected.
      if (_this7.hasConfigurationProblem) {
        return null;
      }

      // This method can be called rapidly by several emitted CryptoEvent, so we need to make sure that we don't
      // query the server several times.
      if (_this7.currentBackupVersionCheck != null) {
        _this7.logger.debug("Already checking server version, use current promise");
        return yield _this7.currentBackupVersionCheck;
      }
      _this7.currentBackupVersionCheck = _this7.internalCheckFromServer();
      try {
        return yield _this7.currentBackupVersionCheck;
      } finally {
        _this7.currentBackupVersionCheck = null;
      }
    })();
  }
  internalCheckFromServer() {
    var _this8 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(function* () {
      var _currentServerVersion, _currentServerVersion2, _currentServerVersion4;
      var currentServerVersion = null;
      try {
        currentServerVersion = yield _this8.backupManager.getServerBackupInfo();
      } catch (e) {
        _this8.logger.debug("Backup: error while checking server version: ".concat(e));
        _this8.hasConfigurationProblem = true;
        return null;
      }
      _this8.logger.debug("Got current backup version from server: ".concat((_currentServerVersion = currentServerVersion) === null || _currentServerVersion === void 0 ? void 0 : _currentServerVersion.version));
      if (((_currentServerVersion2 = currentServerVersion) === null || _currentServerVersion2 === void 0 ? void 0 : _currentServerVersion2.algorithm) != "m.megolm_backup.v1.curve25519-aes-sha2") {
        var _currentServerVersion3;
        _this8.logger.info("Unsupported algorithm ".concat((_currentServerVersion3 = currentServerVersion) === null || _currentServerVersion3 === void 0 ? void 0 : _currentServerVersion3.algorithm));
        _this8.hasConfigurationProblem = true;
        return null;
      }
      if (!((_currentServerVersion4 = currentServerVersion) !== null && _currentServerVersion4 !== void 0 && _currentServerVersion4.version)) {
        _this8.logger.info("No current key backup");
        _this8.hasConfigurationProblem = true;
        return null;
      }
      var activeVersion = yield _this8.backupManager.getActiveBackupVersion();
      if (activeVersion == null || currentServerVersion.version != activeVersion) {
        // Either the current backup version on server side is not trusted, or it is out of sync with the active version on the client side.
        _this8.logger.info("The current backup version on the server (".concat(currentServerVersion.version, ") is not trusted. Version we are currently backing up to: ").concat(activeVersion));
        _this8.hasConfigurationProblem = true;
        return null;
      }
      var authData = currentServerVersion.auth_data;
      var backupKeys = yield _this8.getBackupDecryptionKey();
      if (!(backupKeys !== null && backupKeys !== void 0 && backupKeys.decryptionKey)) {
        _this8.logger.debug("Not checking key backup for session (no decryption key)");
        _this8.hasConfigurationProblem = true;
        return null;
      }
      if (activeVersion != backupKeys.backupVersion) {
        _this8.logger.debug("Version for which we have a decryption key (".concat(backupKeys.backupVersion, ") doesn't match the version we are backing up to (").concat(activeVersion, ")"));
        _this8.hasConfigurationProblem = true;
        return null;
      }
      if (authData.public_key != backupKeys.decryptionKey.megolmV1PublicKey.publicKeyBase64) {
        _this8.logger.debug("getBackupDecryptor key mismatch error");
        _this8.hasConfigurationProblem = true;
        return null;
      }
      var backupDecryptor = _this8.backupManager.createBackupDecryptor(backupKeys.decryptionKey);
      _this8.hasConfigurationProblem = false;
      _this8.configuration = {
        decryptor: backupDecryptor,
        backupVersion: activeVersion
      };
      return _this8.configuration;
    })();
  }
}

/***/ }),

/***/ "6f26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rustDeviceToJsDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deviceKeysToDeviceMap; });
/* unused harmony export downloadDeviceToJsDevice */
/* harmony import */ var core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("88e6");
/* harmony import */ var core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("70cc");
/* harmony import */ var core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eb03");
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("22e5");
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c01e");
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("fa76");
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8306");
/* harmony import */ var core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_union_v2_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _models_device__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a819");







/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



/**
 * Convert a {@link RustSdkCryptoJs.Device} to a {@link Device}
 * @param device - Rust Sdk device
 * @param userId - owner of the device
 *
 * @internal
 */
function rustDeviceToJsDevice(device, userId) {
  // Copy rust device keys to Device.keys
  var keys = new Map();
  for (var [keyId, key] of device.keys.entries()) {
    keys.set(keyId.toString(), key.toBase64());
  }

  // Compute verified from device state
  var verified = _models_device__WEBPACK_IMPORTED_MODULE_8__[/* DeviceVerification */ "b"].Unverified;
  if (device.isBlacklisted()) {
    verified = _models_device__WEBPACK_IMPORTED_MODULE_8__[/* DeviceVerification */ "b"].Blocked;
  } else if (device.isVerified()) {
    verified = _models_device__WEBPACK_IMPORTED_MODULE_8__[/* DeviceVerification */ "b"].Verified;
  }

  // Convert rust signatures to Device.signatures
  var signatures = new Map();
  var mayBeSignatureMap = device.signatures.get(userId);
  if (mayBeSignatureMap) {
    var convertedSignatures = new Map();
    // Convert maybeSignatures map to a Map<string, string>
    for (var [_key, value] of mayBeSignatureMap.entries()) {
      if (value.isValid() && value.signature) {
        convertedSignatures.set(_key, value.signature.toBase64());
      }
    }
    signatures.set(userId.toString(), convertedSignatures);
  }

  // Convert rust algorithms to algorithms
  var rustAlgorithms = device.algorithms;
  // Use set to ensure that algorithms are not duplicated
  var algorithms = new Set();
  rustAlgorithms.forEach(algorithm => {
    switch (algorithm) {
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_7__["EncryptionAlgorithm"].MegolmV1AesSha2:
        algorithms.add("m.megolm.v1.aes-sha2");
        break;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_7__["EncryptionAlgorithm"].OlmV1Curve25519AesSha2:
      default:
        algorithms.add("m.olm.v1.curve25519-aes-sha2");
        break;
    }
  });
  return new _models_device__WEBPACK_IMPORTED_MODULE_8__[/* Device */ "a"]({
    deviceId: device.deviceId.toString(),
    userId: userId.toString(),
    keys,
    algorithms: Array.from(algorithms),
    verified,
    signatures,
    displayName: device.displayName,
    dehydrated: device.isDehydrated
  });
}

/**
 * Convert {@link DeviceKeys}  from `/keys/query` request to a `Map<string, Device>`
 * @param deviceKeys - Device keys object to convert
 *
 * @internal
 */
function deviceKeysToDeviceMap(deviceKeys) {
  return new Map(Object.entries(deviceKeys).map(_ref => {
    var [deviceId, device] = _ref;
    return [deviceId, downloadDeviceToJsDevice(device)];
  }));
}

// Device from `/keys/query` request

/**
 * Convert `/keys/query` {@link QueryDevice} device to {@link Device}
 * @param device - Device from `/keys/query` request
 *
 * @internal
 */
function downloadDeviceToJsDevice(device) {
  var _device$unsigned;
  var keys = new Map(Object.entries(device.keys));
  var displayName = (_device$unsigned = device.unsigned) === null || _device$unsigned === void 0 ? void 0 : _device$unsigned.device_display_name;
  var signatures = new Map();
  if (device.signatures) {
    for (var userId in device.signatures) {
      signatures.set(userId, new Map(Object.entries(device.signatures[userId])));
    }
  }
  return new _models_device__WEBPACK_IMPORTED_MODULE_8__[/* Device */ "a"]({
    deviceId: device.device_id,
    userId: device.user_id,
    keys,
    algorithms: device.algorithms,
    verified: _models_device__WEBPACK_IMPORTED_MODULE_8__[/* DeviceVerification */ "b"].Unverified,
    signatures,
    displayName
  });
}

/***/ }),

/***/ "99d8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "initRustCrypto", function() { return /* binding */ initRustCrypto; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("054a");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("fbe9");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/node_modules/@matrix-org/matrix-sdk-crypto-wasm/pkg/index.js
var pkg = __webpack_require__("700b");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/rust-crypto/rust-crypto.js
var rust_crypto = __webpack_require__("0877");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/crypto/store/base.js
var base = __webpack_require__("10fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.detached.js
var es_array_buffer_detached = __webpack_require__("2c66");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.transfer.js
var es_array_buffer_transfer = __webpack_require__("249d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js
var es_array_buffer_transfer_to_fixed_length = __webpack_require__("40e9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__("907a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-last.js
var es_typed_array_find_last = __webpack_require__("986a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-last-index.js
var es_typed_array_find_last_index = __webpack_require__("1d02");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__("3c5d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-reversed.js
var es_typed_array_to_reversed = __webpack_require__("6ce5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-sorted.js
var es_typed_array_to_sorted = __webpack_require__("2834");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.with.js
var es_typed_array_with = __webpack_require__("4ea1");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/crypto/store/indexeddb-crypto-store.js
var indexeddb_crypto_store = __webpack_require__("f3e8");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/crypto/aes.js
var aes = __webpack_require__("df78");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/rust-crypto/backup.js
var backup = __webpack_require__("16b9");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/utils.js
var utils = __webpack_require__("67b8");

// EXTERNAL MODULE: C:/inetpub2022/matrix-js-sdk/lib/base64.js
var base64 = __webpack_require__("ac66");

// CONCATENATED MODULE: C:/inetpub2022/matrix-js-sdk/lib/rust-crypto/libolm_migration.js












/*
Copyright 2023-2024 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









/**
 * Determine if any data needs migrating from the legacy store, and do so.
 *
 * This migrates the base account data, and olm and megolm sessions. It does *not* migrate the room list, which should
 * happen after an `OlmMachine` is created, via {@link migrateRoomSettingsFromLegacyCrypto}.
 *
 * @param args - Arguments object.
 */
function migrateFromLegacyCrypto(_x) {
  return _migrateFromLegacyCrypto.apply(this, arguments);
}
function _migrateFromLegacyCrypto() {
  _migrateFromLegacyCrypto = asyncToGenerator_default()(function* (args) {
    var _args$legacyMigration2;
    var {
      logger,
      legacyStore
    } = args;

    // initialise the rust matrix-sdk-crypto-wasm, if it hasn't already been done
    yield pkg["initAsync"]();

    // enable tracing in the rust-sdk
    new pkg["Tracing"](pkg["LoggerLevel"].Debug).turnOn();
    if (!(yield legacyStore.containsData())) {
      // This store was never used. Nothing to migrate.
      return;
    }
    yield legacyStore.startup();
    var accountPickle = null;
    yield legacyStore.doTxn("readonly", [indexeddb_crypto_store["a" /* IndexedDBCryptoStore */].STORE_ACCOUNT], txn => {
      legacyStore.getAccount(txn, acctPickle => {
        accountPickle = acctPickle;
      });
    });
    if (!accountPickle) {
      // This store is not properly set up. Nothing to migrate.
      logger.debug("Legacy crypto store is not set up (no account found). Not migrating.");
      return;
    }
    var migrationState = yield legacyStore.getMigrationState();
    if (migrationState >= base["b" /* MigrationState */].MEGOLM_SESSIONS_MIGRATED) {
      // All migration is done for now. The room list comes later, once we have an OlmMachine.
      return;
    }
    var nOlmSessions = yield countOlmSessions(logger, legacyStore);
    var nMegolmSessions = yield countMegolmSessions(logger, legacyStore);
    var totalSteps = 1 + nOlmSessions + nMegolmSessions;
    logger.info("Migrating data from legacy crypto store. ".concat(nOlmSessions, " olm sessions and ").concat(nMegolmSessions, " megolm sessions to migrate."));
    var stepsDone = 0;
    function onProgress(steps) {
      var _args$legacyMigration;
      stepsDone += steps;
      (_args$legacyMigration = args.legacyMigrationProgressListener) === null || _args$legacyMigration === void 0 ? void 0 : _args$legacyMigration.call(args, stepsDone, totalSteps);
    }
    onProgress(0);
    var pickleKey = new TextEncoder().encode(args.legacyPickleKey);
    if (migrationState === base["b" /* MigrationState */].NOT_STARTED) {
      logger.info("Migrating data from legacy crypto store. Step 1: base data");
      yield migrateBaseData(args.http, args.userId, args.deviceId, legacyStore, pickleKey, args.storeHandle, logger);
      migrationState = base["b" /* MigrationState */].INITIAL_DATA_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }
    onProgress(1);
    if (migrationState === base["b" /* MigrationState */].INITIAL_DATA_MIGRATED) {
      logger.info("Migrating data from legacy crypto store. Step 2: olm sessions (".concat(nOlmSessions, " sessions to migrate)."));
      yield migrateOlmSessions(logger, legacyStore, pickleKey, args.storeHandle, onProgress);
      migrationState = base["b" /* MigrationState */].OLM_SESSIONS_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }
    if (migrationState === base["b" /* MigrationState */].OLM_SESSIONS_MIGRATED) {
      logger.info("Migrating data from legacy crypto store. Step 3: megolm sessions (".concat(nMegolmSessions, " sessions to migrate)."));
      yield migrateMegolmSessions(logger, legacyStore, pickleKey, args.storeHandle, onProgress);
      migrationState = base["b" /* MigrationState */].MEGOLM_SESSIONS_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }

    // Migration is done.
    (_args$legacyMigration2 = args.legacyMigrationProgressListener) === null || _args$legacyMigration2 === void 0 ? void 0 : _args$legacyMigration2.call(args, -1, -1);
    logger.info("Migration from legacy crypto store complete");
  });
  return _migrateFromLegacyCrypto.apply(this, arguments);
}
function migrateBaseData(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
  return _migrateBaseData.apply(this, arguments);
}
function _migrateBaseData() {
  _migrateBaseData = asyncToGenerator_default()(function* (http, userId, deviceId, legacyStore, pickleKey, storeHandle, logger) {
    var migrationData = new pkg["BaseMigrationData"]();
    migrationData.userId = new pkg["UserId"](userId);
    migrationData.deviceId = new pkg["DeviceId"](deviceId);
    yield legacyStore.doTxn("readonly", [indexeddb_crypto_store["a" /* IndexedDBCryptoStore */].STORE_ACCOUNT], txn => legacyStore.getAccount(txn, a => {
      migrationData.pickledAccount = a !== null && a !== void 0 ? a : "";
    }));
    var recoveryKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "m.megolm_backup.v1");

    // If we have a backup recovery key, we need to try to figure out which backup version it is for.
    // All we can really do is ask the server for the most recent version and check if the cached key we have matches.
    // It is possible that the backup has changed since last time his session was opened.
    if (recoveryKey) {
      var backupCallDone = false;
      var backupInfo = null;
      while (!backupCallDone) {
        try {
          backupInfo = yield Object(backup["b" /* requestKeyBackupVersion */])(http);
          backupCallDone = true;
        } catch (e) {
          logger.info("Failed to get backup version during migration, retrying in 2 seconds", e);
          // Retry until successful, use simple constant delay
          yield Object(utils["K" /* sleep */])(2000);
        }
      }
      if (backupInfo && backupInfo.algorithm == "m.megolm_backup.v1.curve25519-aes-sha2") {
        // check if the recovery key matches, as the active backup version may have changed since the key was cached
        // and the migration started.
        try {
          var _backupInfo$auth_data;
          var decryptionKey = pkg["BackupDecryptionKey"].fromBase64(recoveryKey);
          var publicKey = (_backupInfo$auth_data = backupInfo.auth_data) === null || _backupInfo$auth_data === void 0 ? void 0 : _backupInfo$auth_data.public_key;
          var isValid = decryptionKey.megolmV1PublicKey.publicKeyBase64 == publicKey;
          if (isValid) {
            migrationData.backupVersion = backupInfo.version;
            migrationData.backupRecoveryKey = recoveryKey;
          } else {
            logger.debug("The backup key to migrate does not match the active backup version", "Cached pub key: ".concat(decryptionKey.megolmV1PublicKey.publicKeyBase64), "Active pub key: ".concat(publicKey));
          }
        } catch (e) {
          logger.warn("Failed to check if the backup key to migrate matches the active backup version", e);
        }
      }
    }
    migrationData.privateCrossSigningMasterKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "master");
    migrationData.privateCrossSigningSelfSigningKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "self_signing");
    migrationData.privateCrossSigningUserSigningKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "user_signing");
    yield pkg["Migration"].migrateBaseData(migrationData, pickleKey, storeHandle);
  });
  return _migrateBaseData.apply(this, arguments);
}
function countOlmSessions(_x9, _x10) {
  return _countOlmSessions.apply(this, arguments);
}
function _countOlmSessions() {
  _countOlmSessions = asyncToGenerator_default()(function* (logger, legacyStore) {
    logger.debug("Counting olm sessions to be migrated");
    var nSessions;
    yield legacyStore.doTxn("readonly", [indexeddb_crypto_store["a" /* IndexedDBCryptoStore */].STORE_SESSIONS], txn => legacyStore.countEndToEndSessions(txn, n => nSessions = n));
    return nSessions;
  });
  return _countOlmSessions.apply(this, arguments);
}
function countMegolmSessions(_x11, _x12) {
  return _countMegolmSessions.apply(this, arguments);
}
function _countMegolmSessions() {
  _countMegolmSessions = asyncToGenerator_default()(function* (logger, legacyStore) {
    logger.debug("Counting megolm sessions to be migrated");
    return yield legacyStore.countEndToEndInboundGroupSessions();
  });
  return _countMegolmSessions.apply(this, arguments);
}
function migrateOlmSessions(_x13, _x14, _x15, _x16, _x17) {
  return _migrateOlmSessions.apply(this, arguments);
}
function _migrateOlmSessions() {
  _migrateOlmSessions = asyncToGenerator_default()(function* (logger, legacyStore, pickleKey, storeHandle, onBatchDone) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      var batch = yield legacyStore.getEndToEndSessionsBatch();
      if (batch === null) return;
      logger.debug("Migrating batch of ".concat(batch.length, " olm sessions"));
      var migrationData = [];
      for (var session of batch) {
        var pickledSession = new pkg["PickledSession"]();
        pickledSession.senderKey = session.deviceKey;
        pickledSession.pickle = session.session;
        pickledSession.lastUseTime = pickledSession.creationTime = new Date(session.lastReceivedMessageTs);
        migrationData.push(pickledSession);
      }
      yield pkg["Migration"].migrateOlmSessions(migrationData, pickleKey, storeHandle);
      yield legacyStore.deleteEndToEndSessionsBatch(batch);
      onBatchDone(batch.length);
    }
  });
  return _migrateOlmSessions.apply(this, arguments);
}
function migrateMegolmSessions(_x18, _x19, _x20, _x21, _x22) {
  return _migrateMegolmSessions.apply(this, arguments);
}
/**
 * Determine if any room settings need migrating from the legacy store, and do so.
 *
 * @param args - Arguments object.
 */
function _migrateMegolmSessions() {
  _migrateMegolmSessions = asyncToGenerator_default()(function* (logger, legacyStore, pickleKey, storeHandle, onBatchDone) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      var batch = yield legacyStore.getEndToEndInboundGroupSessionsBatch();
      if (batch === null) return;
      logger.debug("Migrating batch of ".concat(batch.length, " megolm sessions"));
      var migrationData = [];
      for (var session of batch) {
        var _sessionData$keysClai;
        var sessionData = session.sessionData;
        var pickledSession = new pkg["PickledInboundGroupSession"]();
        pickledSession.pickle = sessionData.session;
        pickledSession.roomId = new pkg["RoomId"](sessionData.room_id);
        pickledSession.senderKey = session.senderKey;
        pickledSession.senderSigningKey = (_sessionData$keysClai = sessionData.keysClaimed) === null || _sessionData$keysClai === void 0 ? void 0 : _sessionData$keysClai["ed25519"];
        pickledSession.backedUp = !session.needsBackup;

        // The Rust SDK `imported` flag is used to indicate the authenticity status of a Megolm
        // session, which tells us whether we can reliably tell which Olm device is the owner
        // (creator) of the session.
        //
        // If `imported` is true, then we have no cryptographic proof that the session is owned
        // by the device with the identity key `senderKey`.
        //
        // Only Megolm sessions received directly from the owning device via an encrypted
        // `m.room_key` to-device message should have `imported` flag set to false. Megolm
        // sessions received by any other currently available means (i.e. from a
        // `m.forwarded_room_key`, from v1 asymmetric server-side key backup, imported from a
        // file, etc) should have the `imported` flag set to true.
        //
        // Messages encrypted with such Megolm sessions will have a grey shield in the UI
        // ("Authenticity of this message cannot be guaranteed").
        //
        // However, we don't want to bluntly mark all sessions as `imported` during migration
        // because users will suddenly start seeing all their historic messages decorated with a
        // grey shield, which would be seen as a non-actionable regression.
        //
        // In the legacy crypto stack, the flag encoding similar information was called
        // `InboundGroupSessionData.untrusted`. The value of this flag was set as follows:
        //
        // - For outbound Megolm sessions created by our own device, `untrusted` is `undefined`.
        // - For Megolm sessions received via a `m.room_key` to-device message, `untrusted` is
        //   `undefined`.
        // - For Megolm sessions received via a `m.forwarded_room_key` to-device message,
        //   `untrusted` is `true`.
        // - For Megolm sessions imported from a (v1 asymmetric / "legacy") server-side key
        //   backup, `untrusted` is `true`.
        // - For Megolm sessions imported from a file, untrusted is `undefined`.
        //
        // The main difference between the legacy crypto stack and the Rust crypto stack is that
        // the Rust stack considers sessions imported from a file as `imported` (not
        // authenticated). This is because the Megolm session export file format does not
        // encode this authenticity information.
        //
        // Given this migration is only a one-time thing, we make a concession to accept the
        // loss of information in this case, to avoid degrading UX in a non-actionable way.
        pickledSession.imported = sessionData.untrusted === true;
        migrationData.push(pickledSession);
      }
      yield pkg["Migration"].migrateMegolmSessions(migrationData, pickleKey, storeHandle);
      yield legacyStore.deleteEndToEndInboundGroupSessionsBatch(batch);
      onBatchDone(batch.length);
    }
  });
  return _migrateMegolmSessions.apply(this, arguments);
}
function migrateRoomSettingsFromLegacyCrypto(_x23) {
  return _migrateRoomSettingsFromLegacyCrypto.apply(this, arguments);
}
function _migrateRoomSettingsFromLegacyCrypto() {
  _migrateRoomSettingsFromLegacyCrypto = asyncToGenerator_default()(function* (_ref) {
    var {
      logger,
      legacyStore,
      olmMachine
    } = _ref;
    if (!(yield legacyStore.containsData())) {
      // This store was never used. Nothing to migrate.
      return;
    }
    var migrationState = yield legacyStore.getMigrationState();
    if (migrationState >= base["b" /* MigrationState */].ROOM_SETTINGS_MIGRATED) {
      // We've already migrated the room settings.
      return;
    }
    var rooms = {};
    yield legacyStore.doTxn("readwrite", [indexeddb_crypto_store["a" /* IndexedDBCryptoStore */].STORE_ROOMS], txn => {
      legacyStore.getEndToEndRooms(txn, result => {
        rooms = result;
      });
    });
    logger.debug("Migrating ".concat(Object.keys(rooms).length, " sets of room settings"));
    for (var [roomId, legacySettings] of Object.entries(rooms)) {
      try {
        var rustSettings = new pkg["RoomSettings"]();
        if (legacySettings.algorithm !== "m.megolm.v1.aes-sha2") {
          logger.warn("Room ".concat(roomId, ": ignoring room with invalid algorithm ").concat(legacySettings.algorithm));
          continue;
        }
        rustSettings.algorithm = pkg["EncryptionAlgorithm"].MegolmV1AesSha2;
        rustSettings.sessionRotationPeriodMs = legacySettings.rotation_period_ms;
        rustSettings.sessionRotationPeriodMessages = legacySettings.rotation_period_msgs;
        yield olmMachine.setRoomSettings(new pkg["RoomId"](roomId), rustSettings);

        // We don't attempt to clear out the settings from the old store, or record where we've gotten up to,
        // which means that if the app gets restarted while we're in the middle of this migration, we'll start
        // again from scratch. So be it. Given that legacy crypto loads the whole room list into memory on startup
        // anyway, we know it can't be that big.
      } catch (e) {
        logger.warn("Room ".concat(roomId, ": ignoring settings ").concat(JSON.stringify(legacySettings), " which caused error ").concat(e));
      }
    }
    logger.debug("Completed room settings migration");
    yield legacyStore.setMigrationState(base["b" /* MigrationState */].ROOM_SETTINGS_MIGRATED);
  });
  return _migrateRoomSettingsFromLegacyCrypto.apply(this, arguments);
}
function getAndDecryptCachedSecretKey(_x24, _x25, _x26) {
  return _getAndDecryptCachedSecretKey.apply(this, arguments);
}
/**
 * Check if the user's published identity (ie, public cross-signing keys) was trusted by the legacy session,
 * and if so mark it as trusted in the Rust session if needed.
 *
 * By default, if the legacy session didn't have the private MSK, the migrated session will revert to unverified,
 * even if the user has verified the session in the past.
 *
 * This only occurs if the private MSK was not cached in the crypto store (USK and SSK private keys won't help
 * to establish trust: the trust is rooted in the MSK).
 *
 * Rust crypto will only consider the current session as trusted if we import the private MSK itself.
 *
 * We could prompt the user to verify the session again, but it's probably better to just mark the user identity
 * as locally verified if it was before.
 *
 * See https://github.com/element-hq/element-web/issues/27079
 *
 * @param args - Argument object.
 */
function _getAndDecryptCachedSecretKey() {
  _getAndDecryptCachedSecretKey = asyncToGenerator_default()(function* (legacyStore, legacyPickleKey, name) {
    var key = yield new Promise(resolve => {
      legacyStore.doTxn("readonly", [indexeddb_crypto_store["a" /* IndexedDBCryptoStore */].STORE_ACCOUNT], txn => {
        legacyStore.getSecretStorePrivateKey(txn, resolve, name);
      });
    });
    if (key && key.ciphertext && key.iv && key.mac) {
      return yield Object(aes["b" /* decryptAES */])(key, legacyPickleKey, name);
    } else if (key instanceof Uint8Array) {
      // This is a legacy backward compatibility case where the key was stored in clear.
      return Object(base64["b" /* encodeBase64 */])(key);
    } else {
      return undefined;
    }
  });
  return _getAndDecryptCachedSecretKey.apply(this, arguments);
}
function migrateLegacyLocalTrustIfNeeded(_x27) {
  return _migrateLegacyLocalTrustIfNeeded.apply(this, arguments);
}

/**
 * Checks if the legacy store has a trusted public master key, and returns it if so.
 *
 * @param legacyStore - The legacy store to check.
 *
 * @returns `null` if there were no cross signing keys or if they were not trusted. The trusted public master key if it was.
 */
function _migrateLegacyLocalTrustIfNeeded() {
  _migrateLegacyLocalTrustIfNeeded = asyncToGenerator_default()(function* (args) {
    var {
      legacyCryptoStore,
      rustCrypto,
      logger
    } = args;
    // Get the public cross-signing identity from rust.
    var rustOwnIdentity = yield rustCrypto.getOwnIdentity();
    if (!rustOwnIdentity) {
      // There are no cross-signing keys published server side, so nothing to do here.
      return;
    }
    if (rustOwnIdentity.isVerified()) {
      // The rust session already trusts the keys, so again, nothing to do.
      return;
    }
    var legacyLocallyTrustedMSK = yield getLegacyTrustedPublicMasterKeyBase64(legacyCryptoStore);
    if (!legacyLocallyTrustedMSK) {
      // The user never verified their identity in the legacy session, so nothing to do.
      return;
    }
    var mskInfo = JSON.parse(rustOwnIdentity.masterKey);
    if (!mskInfo.keys || Object.keys(mskInfo.keys).length === 0) {
      // This should not happen, but let's be safe
      logger.error("Post Migration | Unexpected error: no master key in the rust session.");
      return;
    }
    var rustSeenMSK = Object.values(mskInfo.keys)[0];
    if (rustSeenMSK && rustSeenMSK == legacyLocallyTrustedMSK) {
      logger.info("Post Migration: Migrating legacy trusted MSK: ".concat(legacyLocallyTrustedMSK, " to locally verified."));
      // Let's mark the user identity as locally verified as part of the migration.
      yield rustOwnIdentity.verify();
      // As well as marking the MSK as trusted, `OlmMachine.verify` returns a
      // `SignatureUploadRequest` which will publish a signature of the MSK using
      // this device. In this case, we ignore the request: since the user hasn't
      // actually re-verified the MSK, we don't publish a new signature. (`.verify`
      // doesn't store the signature, and if we drop the request here it won't be
      // retried.)
      //
      // Not publishing the signature is consistent with the behaviour of
      // matrix-crypto-sdk when the private key is imported via
      // `importCrossSigningKeys`, and when the identity is verified via interactive
      // verification.
      //
      // [Aside: device signatures on the MSK are not considered by the rust-sdk to
      // establish the trust of the user identity so in any case, what we actually do
      // here is somewhat moot.]
    }
  });
  return _migrateLegacyLocalTrustIfNeeded.apply(this, arguments);
}
function getLegacyTrustedPublicMasterKeyBase64(_x28) {
  return _getLegacyTrustedPublicMasterKeyBase.apply(this, arguments);
}
function _getLegacyTrustedPublicMasterKeyBase() {
  _getLegacyTrustedPublicMasterKeyBase = asyncToGenerator_default()(function* (legacyStore) {
    var maybeTrustedKeys = null;
    yield legacyStore.doTxn("readonly", "account", txn => {
      legacyStore.getCrossSigningKeys(txn, keys => {
        // can be an empty object after resetting cross-signing keys, see storeTrustedSelfKeys
        var msk = keys === null || keys === void 0 ? void 0 : keys.master;
        if (msk && Object.keys(msk.keys).length != 0) {
          // `msk.keys` is an object with { [`ed25519:${pubKey}`]: pubKey }
          maybeTrustedKeys = Object.values(msk.keys)[0];
        }
      });
    });
    return maybeTrustedKeys;
  });
  return _getLegacyTrustedPublicMasterKeyBase.apply(this, arguments);
}
// CONCATENATED MODULE: C:/inetpub2022/matrix-js-sdk/lib/rust-crypto/index.js



function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      defineProperty_default()(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/







/**
 * Create a new `RustCrypto` implementation
 *
 * @param args - Parameter object
 * @internal
 */
function initRustCrypto(_x) {
  return _initRustCrypto.apply(this, arguments);
}
function _initRustCrypto() {
  _initRustCrypto = asyncToGenerator_default()(function* (args) {
    var {
      logger
    } = args;

    // initialise the rust matrix-sdk-crypto-wasm, if it hasn't already been done
    logger.debug("Initialising Rust crypto-sdk WASM artifact");
    yield pkg["initAsync"]();

    // enable tracing in the rust-sdk
    new pkg["Tracing"](pkg["LoggerLevel"].Debug).turnOn();
    logger.debug("Opening Rust CryptoStore");
    var storeHandle;
    if (args.storePrefix) {
      if (args.storeKey) {
        storeHandle = yield pkg["StoreHandle"].openWithKey(args.storePrefix, args.storeKey);
      } else {
        storeHandle = yield pkg["StoreHandle"].open(args.storePrefix, args.storePassphrase);
      }
    } else {
      storeHandle = yield pkg["StoreHandle"].open();
    }
    if (args.legacyCryptoStore) {
      // We have a legacy crypto store, which we may need to migrate from.
      yield migrateFromLegacyCrypto(_objectSpread({
        legacyStore: args.legacyCryptoStore,
        storeHandle
      }, args));
    }
    var rustCrypto = yield initOlmMachine(logger, args.http, args.userId, args.deviceId, args.secretStorage, args.cryptoCallbacks, storeHandle, args.legacyCryptoStore);
    storeHandle.free();
    logger.debug("Completed rust crypto-sdk setup");
    return rustCrypto;
  });
  return _initRustCrypto.apply(this, arguments);
}
function initOlmMachine(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
  return _initOlmMachine.apply(this, arguments);
}
function _initOlmMachine() {
  _initOlmMachine = asyncToGenerator_default()(function* (logger, http, userId, deviceId, secretStorage, cryptoCallbacks, storeHandle, legacyCryptoStore) {
    logger.debug("Init OlmMachine");
    var olmMachine = yield pkg["OlmMachine"].initFromStore(new pkg["UserId"](userId), new pkg["DeviceId"](deviceId), storeHandle);

    // A final migration step, now that we have an OlmMachine.
    if (legacyCryptoStore) {
      yield migrateRoomSettingsFromLegacyCrypto({
        logger,
        legacyStore: legacyCryptoStore,
        olmMachine
      });
    }

    // Disable room key requests, per https://github.com/vector-im/element-web/issues/26524.
    olmMachine.roomKeyRequestsEnabled = false;
    var rustCrypto = new rust_crypto["a" /* RustCrypto */](logger, olmMachine, http, userId, deviceId, secretStorage, cryptoCallbacks);
    yield olmMachine.registerRoomKeyUpdatedCallback(sessions => rustCrypto.onRoomKeysUpdated(sessions));
    yield olmMachine.registerRoomKeysWithheldCallback(withheld => rustCrypto.onRoomKeysWithheld(withheld));
    yield olmMachine.registerUserIdentityUpdatedCallback(userId => rustCrypto.onUserIdentityUpdated(userId));
    yield olmMachine.registerDevicesUpdatedCallback(userIds => rustCrypto.onDevicesUpdated(userIds));

    // Check if there are any key backup secrets pending processing. There may be multiple secrets to process if several devices have gossiped them.
    // The `registerReceiveSecretCallback` function will only be triggered for new secrets. If the client is restarted before processing them, the secrets will need to be manually handled.
    rustCrypto.checkSecrets("m.megolm_backup.v1");

    // Register a callback to be notified when a new secret is received, as for now only the key backup secret is supported (the cross signing secrets are handled automatically by the OlmMachine)
    yield olmMachine.registerReceiveSecretCallback((name, _value) =>
    // Instead of directly checking the secret value, we poll the inbox to get all values for that secret type.
    // Once we have all the values, we can safely clear the secret inbox.
    rustCrypto.checkSecrets(name));

    // Tell the OlmMachine to think about its outgoing requests before we hand control back to the application.
    //
    // This is primarily a fudge to get it to correctly populate the `users_for_key_query` list, so that future
    // calls to getIdentity (etc) block until the key queries are performed.
    //
    // Note that we don't actually need to *make* any requests here; it is sufficient to tell the Rust side to think
    // about them.
    //
    // XXX: find a less hacky way to do this.
    yield olmMachine.outgoingRequests();
    if (legacyCryptoStore && (yield legacyCryptoStore.containsData())) {
      var migrationState = yield legacyCryptoStore.getMigrationState();
      if (migrationState < base["b" /* MigrationState */].INITIAL_OWN_KEY_QUERY_DONE) {
        logger.debug("Performing initial key query after migration");
        // We need to do an initial keys query so that the rust stack can properly update trust of
        // the user device and identity from the migrated private keys.
        // If not done, there is a short period where the own device/identity trust will be undefined after migration.
        var initialKeyQueryDone = false;
        while (!initialKeyQueryDone) {
          try {
            yield rustCrypto.userHasCrossSigningKeys(userId);
            initialKeyQueryDone = true;
          } catch (e) {
            // If the initial key query fails, we retry until it succeeds.
            logger.error("Failed to check for cross-signing keys after migration, retrying", e);
          }
        }

        // If the private master cross-signing key was not cached in the legacy store, the rust session
        // will not be able to establish the trust of the user identity.
        // That means that after migration the session could revert to unverified.
        // In order to avoid asking the users to re-verify their sessions, we need to migrate the legacy local trust
        // (if the legacy session was already verified) to the new session.
        yield migrateLegacyLocalTrustIfNeeded({
          legacyCryptoStore,
          rustCrypto,
          logger
        });
        yield legacyCryptoStore.setMigrationState(base["b" /* MigrationState */].INITIAL_OWN_KEY_QUERY_DONE);
      }
    }
    return rustCrypto;
  });
  return _initOlmMachine.apply(this, arguments);
}

/***/ }),

/***/ "9eee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OutgoingRequestProcessor; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0036");
/* harmony import */ var _http_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("be2e");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("67b8");
/* harmony import */ var _types_event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ee85");
/* harmony import */ var _DehydratedDeviceManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("eb1f");




function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/








/**
 * Common interface for all the request types returned by `OlmMachine.outgoingRequests`.
 *
 * @internal
 */

/**
 * OutgoingRequestManager: turns `OutgoingRequest`s from the rust sdk into HTTP requests
 *
 * We have one of these per `RustCrypto` (and hence per `MatrixClient`), not that it does anything terribly complicated.
 * It's responsible for:
 *
 *   * holding the reference to the `MatrixHttpApi`
 *   * turning `OutgoingRequest`s from the rust backend into HTTP requests, and sending them
 *   * sending the results of such requests back to the rust backend.
 *
 * @internal
 */
class OutgoingRequestProcessor {
  constructor(olmMachine, http) {
    this.olmMachine = olmMachine;
    this.http = http;
  }
  makeOutgoingRequest(msg, uiaCallback) {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
      var resp;

      /* refer https://docs.rs/matrix-sdk-crypto/0.6.0/matrix_sdk_crypto/requests/enum.OutgoingRequests.html
       * for the complete list of request types
       */
      if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["KeysUploadRequest"]) {
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/upload", {}, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["KeysQueryRequest"]) {
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/query", {}, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["KeysClaimRequest"]) {
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/claim", {}, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["SignatureUploadRequest"]) {
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/signatures/upload", {}, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["KeysBackupRequest"]) {
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Put, "/_matrix/client/v3/room_keys/keys", {
          version: msg.version
        }, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["ToDeviceRequest"]) {
        resp = yield _this.sendToDeviceRequest(msg);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["RoomMessageRequest"]) {
        var path = "/_matrix/client/v3/rooms/".concat(encodeURIComponent(msg.room_id), "/send/") + "".concat(encodeURIComponent(msg.event_type), "/").concat(encodeURIComponent(msg.txn_id));
        resp = yield _this.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Put, path, {}, msg.body);
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["UploadSigningKeysRequest"]) {
        yield _this.makeRequestWithUIA(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Post, "/_matrix/client/v3/keys/device_signing/upload", {}, msg.body, uiaCallback);
        // SigningKeysUploadRequest does not implement OutgoingRequest and does not need to be marked as sent.
        return;
      } else if (msg instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_4__["PutDehydratedDeviceRequest"]) {
        var _path = _DehydratedDeviceManager__WEBPACK_IMPORTED_MODULE_9__[/* UnstablePrefix */ "b"] + "/dehydrated_device";
        yield _this.rawJsonRequest(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Put, _path, {}, msg.body);
        // PutDehydratedDeviceRequest does not implement OutgoingRequest and does not need to be marked as sent.
        return;
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"].warn("Unsupported outgoing message", Object.getPrototypeOf(msg));
        resp = "";
      }
      if (msg.id) {
        try {
          yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* logDuration */ "u"])(_logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"], "Mark Request as sent ".concat(msg.type), /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
            yield _this.olmMachine.markRequestAsSent(msg.id, msg.type, resp);
          }));
        } catch (e) {
          // Ignore errors which are caused by the olmMachine having been freed. The exact error message depends
          // on whether we are using a release or develop build of rust-sdk-crypto-wasm.
          if (e instanceof Error && (e.message === "Attempt to use a moved value" || e.message === "null pointer passed to rust")) {
            _logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"].log("Ignoring error '".concat(e.message, "': client is likely shutting down"));
          } else {
            throw e;
          }
        }
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"].trace("Outgoing request type:".concat(msg.type, " does not have an ID"));
      }
    })();
  }

  /**
   * Send the HTTP request for a `ToDeviceRequest`
   *
   * @param request - request to send
   * @returns JSON-serialized body of the response, if successful
   */
  sendToDeviceRequest(request) {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
      // a bit of extra logging, to help trace to-device messages through the system
      var parsedBody = JSON.parse(request.body);
      var messageList = [];
      for (var [userId, perUserMessages] of Object.entries(parsedBody.messages)) {
        for (var [deviceId, message] of Object.entries(perUserMessages)) {
          messageList.push("".concat(userId, "/").concat(deviceId, " (msgid ").concat(message[_types_event__WEBPACK_IMPORTED_MODULE_8__[/* ToDeviceMessageId */ "k"]], ")"));
        }
      }
      _logger__WEBPACK_IMPORTED_MODULE_5__[/* logger */ "b"].info("Sending batch of to-device messages. type=".concat(request.event_type, " txnid=").concat(request.txn_id), messageList);
      var path = "/_matrix/client/v3/sendToDevice/".concat(encodeURIComponent(request.event_type), "/") + encodeURIComponent(request.txn_id);
      return yield _this2.requestWithRetry(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* Method */ "i"].Put, path, {}, request.body);
    })();
  }
  makeRequestWithUIA(method, path, queryParams, body, uiaCallback) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
      if (!uiaCallback) {
        return yield _this3.requestWithRetry(method, path, queryParams, body);
      }
      var parsedBody = JSON.parse(body);
      var makeRequest = /*#__PURE__*/function () {
        var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* (auth) {
          var newBody = _objectSpread({}, parsedBody);
          if (auth !== null) {
            newBody.auth = auth;
          }
          var resp = yield _this3.requestWithRetry(method, path, queryParams, JSON.stringify(newBody));
          return JSON.parse(resp);
        });
        return function makeRequest(_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      var resp = yield uiaCallback(makeRequest);
      return JSON.stringify(resp);
    })();
  }
  requestWithRetry(method, path, queryParams, body) {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
      var currentRetryCount = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          return yield _this4.rawJsonRequest(method, path, queryParams, body);
        } catch (e) {
          currentRetryCount++;
          var backoff = Object(_http_api__WEBPACK_IMPORTED_MODULE_6__[/* calculateRetryBackoff */ "k"])(e, currentRetryCount, true);
          if (backoff < 0) {
            // Max number of retries reached, or error is not retryable. rethrow the error
            throw e;
          }
          // wait for the specified time and then retry the request
          yield Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* sleep */ "K"])(backoff);
        }
      }
    })();
  }
  rawJsonRequest(method, path, queryParams, body) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(function* () {
      var opts = {
        // inhibit the JSON stringification and parsing within HttpApi.
        json: false,
        // nevertheless, we are sending, and accept, JSON.
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        // we use the full prefix
        prefix: ""
      };
      return yield _this5.http.authedRequest(method, path, queryParams, body, opts);
    })();
  }
}

/***/ }),

/***/ "bf66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RustVerificationRequest; });
/* unused harmony export RustQrCodeVerifier */
/* unused harmony export RustSASVerifier */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return verificationMethodIdentifierToMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isVerificationEvent; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2c66");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("249d");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("40e9");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("907a");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("986a");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("1d02");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3c5d");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("6ce5");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("2834");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("4ea1");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("2139");
/* harmony import */ var _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("0fc9");
/* harmony import */ var _ReEmitter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("8d85");
/* harmony import */ var _types_event__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("ee85");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("67b8");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("6c93");













/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/










/**
 * An incoming, or outgoing, request to verify a user or a device via cross-signing.
 *
 * @internal
 */
class RustVerificationRequest extends _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_15__[/* TypedEventEmitter */ "b"] {
  /**
   * Construct a new RustVerificationRequest to wrap the rust-level `VerificationRequest`.
   *
   * @param olmMachine - The `OlmMachine` from the underlying rust crypto sdk.
   * @param inner - VerificationRequest from the Rust SDK.
   * @param outgoingRequestProcessor - `OutgoingRequestProcessor` to use for making outgoing HTTP requests.
   * @param supportedVerificationMethods - Verification methods to use when `accept()` is called.
   */
  constructor(olmMachine, inner, outgoingRequestProcessor, supportedVerificationMethods) {
    super();
    this.olmMachine = olmMachine;
    this.inner = inner;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    this.supportedVerificationMethods = supportedVerificationMethods;
    /** a reëmitter which relays VerificationRequestEvent.Changed events emitted by the verifier */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "reEmitter", void 0);
    /** Are we in the process of sending an `m.key.verification.ready` event? */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "_accepting", false);
    /** Are we in the process of sending an `m.key.verification.cancellation` event? */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "_cancelling", false);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "_verifier", void 0);
    this.reEmitter = new _ReEmitter__WEBPACK_IMPORTED_MODULE_16__[/* TypedReEmitter */ "b"](this);

    // Obviously, the Rust object maintains a reference to the callback function. If the callback function maintains
    // a reference to the Rust object, then we have a reference cycle which means that `RustVerificationRequest`
    // will never be garbage-collected, and hence the underlying rust object will never be freed.
    //
    // To avoid this reference cycle, use a weak reference in the callback function. If the `RustVerificationRequest`
    // gets garbage-collected, then there is nothing to update!
    var weakThis = new WeakRef(this);
    inner.registerChangesCallback( /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var _weakThis$deref;
      return (_weakThis$deref = weakThis.deref()) === null || _weakThis$deref === void 0 ? void 0 : _weakThis$deref.onChange();
    }));
  }

  /**
   * Hook which is called when the underlying rust class notifies us that there has been a change.
   */
  onChange() {
    var verification = this.inner.getVerification();

    // Set the _verifier object (wrapping the rust `Verification` as a js-sdk Verifier) if:
    // - we now have a `Verification` where we lacked one before
    // - we have transitioned from QR to SAS
    // - we are verifying with SAS, but we need to replace our verifier with a new one because both parties
    //   tried to start verification at the same time, and we lost the tie breaking
    if (verification instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["Sas"]) {
      if (this._verifier === undefined || this._verifier instanceof RustQrCodeVerifier) {
        this.setVerifier(new RustSASVerifier(verification, this, this.outgoingRequestProcessor));
      } else if (this._verifier instanceof RustSASVerifier) {
        this._verifier.replaceInner(verification);
      }
    } else if (verification instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["Qr"] && this._verifier === undefined) {
      this.setVerifier(new RustQrCodeVerifier(verification, this.outgoingRequestProcessor));
    }
    this.emit(_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationRequestEvent */ "b"].Change);
  }
  setVerifier(verifier) {
    // if we already have a verifier, unsubscribe from its events
    if (this._verifier) {
      this.reEmitter.stopReEmitting(this._verifier, [_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationRequestEvent */ "b"].Change]);
    }
    this._verifier = verifier;
    this.reEmitter.reEmit(this._verifier, [_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationRequestEvent */ "b"].Change]);
  }

  /**
   * Unique ID for this verification request.
   *
   * An ID isn't assigned until the first message is sent, so this may be `undefined` in the early phases.
   */
  get transactionId() {
    return this.inner.flowId;
  }

  /**
   * For an in-room verification, the ID of the room.
   *
   * For to-device verifications, `undefined`.
   */
  get roomId() {
    var _this$inner$roomId;
    return (_this$inner$roomId = this.inner.roomId) === null || _this$inner$roomId === void 0 ? void 0 : _this$inner$roomId.toString();
  }

  /**
   * True if this request was initiated by the local client.
   *
   * For in-room verifications, the initiator is who sent the `m.key.verification.request` event.
   * For to-device verifications, the initiator is who sent the `m.key.verification.start` event.
   */
  get initiatedByMe() {
    return this.inner.weStarted();
  }

  /** The user id of the other party in this request */
  get otherUserId() {
    return this.inner.otherUserId.toString();
  }

  /** For verifications via to-device messages: the ID of the other device. Otherwise, undefined. */
  get otherDeviceId() {
    var _this$inner$otherDevi;
    return (_this$inner$otherDevi = this.inner.otherDeviceId) === null || _this$inner$otherDevi === void 0 ? void 0 : _this$inner$otherDevi.toString();
  }

  /** Get the other device involved in the verification, if it is known */
  getOtherDevice() {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var otherDeviceId = _this.inner.otherDeviceId;
      if (!otherDeviceId) {
        return undefined;
      }
      return yield _this.olmMachine.getDevice(_this.inner.otherUserId, otherDeviceId, 5);
    })();
  }

  /** True if the other party in this request is one of this user's own devices. */
  get isSelfVerification() {
    return this.inner.isSelfVerification();
  }

  /** current phase of the request. */
  get phase() {
    var phase = this.inner.phase();
    switch (phase) {
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Created:
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Requested:
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Requested;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Ready:
        // if we're still sending the `m.key.verification.ready`, that counts as "Requested" in the js-sdk's
        // parlance.
        return this._accepting ? _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Requested : _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Ready;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Transitioned:
        if (!this._verifier) {
          // this shouldn't happen, because the onChange handler should have created a _verifier.
          throw new Error("VerificationRequest: inner phase == Transitioned but no verifier!");
        }
        return this._verifier.verificationPhase;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Done:
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Done;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Cancelled:
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Cancelled;
    }
    throw new Error("Unknown verification phase ".concat(phase));
  }

  /** True if the request has sent its initial event and needs more events to complete
   * (ie it is in phase `Requested`, `Ready` or `Started`).
   */
  get pending() {
    if (this.inner.isPassive()) return false;
    var phase = this.phase;
    return phase !== _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Done && phase !== _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Cancelled;
  }

  /**
   * True if we have started the process of sending an `m.key.verification.ready` (but have not necessarily received
   * the remote echo which causes a transition to {@link VerificationPhase.Ready}.
   */
  get accepting() {
    return this._accepting;
  }

  /**
   * True if we have started the process of sending an `m.key.verification.cancel` (but have not necessarily received
   * the remote echo which causes a transition to {@link VerificationPhase.Cancelled}).
   */
  get declining() {
    return this._cancelling;
  }

  /**
   * The remaining number of ms before the request will be automatically cancelled.
   *
   * `null` indicates that there is no timeout
   */
  get timeout() {
    return this.inner.timeRemainingMillis();
  }

  /** once the phase is Started (and !initiatedByMe) or Ready: common methods supported by both sides */
  get methods() {
    throw new Error("not implemented");
  }

  /** the method picked in the .start event */
  get chosenMethod() {
    if (this.phase !== _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started) return null;
    var verification = this.inner.getVerification();
    if (verification instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["Sas"]) {
      return _types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].Sas;
    } else if (verification instanceof _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["Qr"]) {
      return _types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].Reciprocate;
    } else {
      return null;
    }
  }

  /**
   * Checks whether the other party supports a given verification method.
   * This is useful when setting up the QR code UI, as it is somewhat asymmetrical:
   * if the other party supports SCAN_QR, we should show a QR code in the UI, and vice versa.
   * For methods that need to be supported by both ends, use the `methods` property.
   *
   * @param method - the method to check
   * @returns true if the other party said they supported the method
   */
  otherPartySupportsMethod(method) {
    var theirMethods = this.inner.theirSupportedMethods;
    if (theirMethods === undefined) {
      // no message from the other side yet
      return false;
    }
    var requiredMethod = verificationMethodsByIdentifier[method];
    return theirMethods.some(m => m === requiredMethod);
  }

  /**
   * Accepts the request, sending a .ready event to the other party
   *
   * @returns Promise which resolves when the event has been sent.
   */
  accept() {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      if (_this2.inner.phase() !== _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationRequestPhase"].Requested || _this2._accepting) {
        throw new Error("Cannot accept a verification request in phase ".concat(_this2.phase));
      }
      _this2._accepting = true;
      try {
        var req = _this2.inner.acceptWithMethods(_this2.supportedVerificationMethods.map(verificationMethodIdentifierToMethod));
        if (req) {
          yield _this2.outgoingRequestProcessor.makeOutgoingRequest(req);
        }
      } finally {
        _this2._accepting = false;
      }

      // phase may have changed, so emit a 'change' event
      _this2.emit(_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationRequestEvent */ "b"].Change);
    })();
  }

  /**
   * Cancels the request, sending a cancellation to the other party
   *
   * @param params - Details for the cancellation, including `reason` (defaults to "User declined"), and `code`
   *    (defaults to `m.user`).
   *
   * @returns Promise which resolves when the event has been sent.
   */
  cancel(params) {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      if (_this3._cancelling) {
        // already cancelling; do nothing
        return;
      }
      _this3._cancelling = true;
      try {
        var req = _this3.inner.cancel();
        if (req) {
          yield _this3.outgoingRequestProcessor.makeOutgoingRequest(req);
        }
      } finally {
        _this3._cancelling = false;
      }
    })();
  }

  /**
   * Create a {@link Verifier} to do this verification via a particular method.
   *
   * If a verifier has already been created for this request, returns that verifier.
   *
   * This does *not* send the `m.key.verification.start` event - to do so, call {@link Verifier#verifier} on the
   * returned verifier.
   *
   * If no previous events have been sent, pass in `targetDevice` to set who to direct this request to.
   *
   * @param method - the name of the verification method to use.
   * @param targetDevice - details of where to send the request to.
   *
   * @returns The verifier which will do the actual verification.
   */
  beginKeyVerification(method, targetDevice) {
    throw new Error("not implemented");
  }

  /**
   * Send an `m.key.verification.start` event to start verification via a particular method.
   *
   * Implementation of {@link Crypto.VerificationRequest#startVerification}.
   *
   * @param method - the name of the verification method to use.
   */
  startVerification(method) {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      if (method !== _types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].Sas) {
        throw new Error("Unsupported verification method ".concat(method));
      }

      // make sure that we have a list of the other user's devices (workaround https://github.com/matrix-org/matrix-rust-sdk/issues/2896)
      if (!(yield _this4.getOtherDevice())) {
        throw new Error("startVerification(): other device is unknown");
      }
      var res = yield _this4.inner.startSas();
      if (res) {
        var [, req] = res;
        yield _this4.outgoingRequestProcessor.makeOutgoingRequest(req);
      }

      // this should have triggered the onChange callback, and we should now have a verifier
      if (!_this4._verifier) {
        throw new Error("Still no verifier after startSas() call");
      }
      return _this4._verifier;
    })();
  }

  /**
   * Start a QR code verification by providing a scanned QR code for this verification flow.
   *
   * Implementation of {@link Crypto.VerificationRequest#scanQRCode}.
   *
   * @param qrCodeData - the decoded QR code.
   * @returns A verifier; call `.verify()` on it to wait for the other side to complete the verification flow.
   */
  scanQRCode(uint8Array) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var scan = _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrCodeScan"].fromBytes(new Uint8ClampedArray(uint8Array));
      var verifier = yield _this5.inner.scanQrCode(scan);

      // this should have triggered the onChange callback, and we should now have a verifier
      if (!_this5._verifier) {
        throw new Error("Still no verifier after scanQrCode() call");
      }

      // we can immediately trigger the reciprocate request
      var req = verifier.reciprocate();
      if (req) {
        yield _this5.outgoingRequestProcessor.makeOutgoingRequest(req);
      }
      return _this5._verifier;
    })();
  }

  /**
   * The verifier which is doing the actual verification, once the method has been established.
   * Only defined when the `phase` is Started.
   */
  get verifier() {
    // It's possible for us to have a Verifier before a method has been chosen (in particular,
    // if we are showing a QR code which the other device has not yet scanned. At that point, we could
    // still switch to SAS).
    //
    // In that case, we should not return it to the application yet, since the application will not expect the
    // Verifier to be replaced during the lifetime of the VerificationRequest.
    return this.phase === _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started ? this._verifier : undefined;
  }

  /**
   * Stub implementation of {@link Crypto.VerificationRequest#getQRCodeBytes}.
   */
  getQRCodeBytes() {
    throw new Error("getQRCodeBytes() unsupported in Rust Crypto; use generateQRCode() instead.");
  }

  /**
   * Generate the data for a QR code allowing the other device to verify this one, if it supports it.
   *
   * Implementation of {@link Crypto.VerificationRequest#generateQRCode}.
   */
  generateQRCode() {
    var _this6 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      // make sure that we have a list of the other user's devices (workaround https://github.com/matrix-org/matrix-rust-sdk/issues/2896)
      if (!(yield _this6.getOtherDevice())) {
        throw new Error("generateQRCode(): other device is unknown");
      }
      var innerVerifier = yield _this6.inner.generateQrCode();
      // If we are unable to generate a QRCode, we return undefined
      if (!innerVerifier) return;
      return Buffer.from(innerVerifier.toBytes());
    })();
  }

  /**
   * If this request has been cancelled, the cancellation code (e.g `m.user`) which is responsible for cancelling
   * this verification.
   */
  get cancellationCode() {
    var _this$inner$cancelInf, _this$inner$cancelInf2;
    return (_this$inner$cancelInf = (_this$inner$cancelInf2 = this.inner.cancelInfo) === null || _this$inner$cancelInf2 === void 0 ? void 0 : _this$inner$cancelInf2.cancelCode()) !== null && _this$inner$cancelInf !== void 0 ? _this$inner$cancelInf : null;
  }

  /**
   * The id of the user that cancelled the request.
   *
   * Only defined when phase is Cancelled
   */
  get cancellingUserId() {
    var cancelInfo = this.inner.cancelInfo;
    if (!cancelInfo) {
      return undefined;
    } else if (cancelInfo.cancelledbyUs()) {
      return this.olmMachine.userId.toString();
    } else {
      return this.inner.otherUserId.toString();
    }
  }
}

/** Common base class for `Verifier` implementations which wrap rust classes.
 *
 * The generic parameter `InnerType` is the type of the rust Verification class which we wrap.
 *
 * @internal
 */
class BaseRustVerifer extends _models_typed_event_emitter__WEBPACK_IMPORTED_MODULE_15__[/* TypedEventEmitter */ "b"] {
  constructor(inner, outgoingRequestProcessor) {
    super();
    this.inner = inner;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    /** A deferred which completes when the verification completes (or rejects when it is cancelled/fails) */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "completionDeferred", void 0);
    this.completionDeferred = Object(_utils__WEBPACK_IMPORTED_MODULE_18__[/* defer */ "i"])();

    // As with RustVerificationRequest, we need to avoid a reference cycle.
    // See the comments in RustVerificationRequest.
    var weakThis = new WeakRef(this);
    inner.registerChangesCallback( /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var _weakThis$deref2;
      return (_weakThis$deref2 = weakThis.deref()) === null || _weakThis$deref2 === void 0 ? void 0 : _weakThis$deref2.onChange();
    }));

    // stop the runtime complaining if nobody catches a failure
    this.completionDeferred.promise.catch(() => null);
  }

  /**
   * Hook which is called when the underlying rust class notifies us that there has been a change.
   *
   * Can be overridden by subclasses to see if we can notify the application about an update. The overriding method
   * must call `super.onChange()`.
   */
  onChange() {
    if (this.inner.isDone()) {
      this.completionDeferred.resolve(undefined);
    } else if (this.inner.isCancelled()) {
      var cancelInfo = this.inner.cancelInfo();
      this.completionDeferred.reject(new Error("Verification cancelled by ".concat(cancelInfo.cancelledbyUs() ? "us" : "them", " with code ").concat(cancelInfo.cancelCode(), ": ").concat(cancelInfo.reason())));
    }
    this.emit(_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationRequestEvent */ "b"].Change);
  }

  /**
   * Returns true if the verification has been cancelled, either by us or the other side.
   */
  get hasBeenCancelled() {
    return this.inner.isCancelled();
  }

  /**
   * The ID of the other user in the verification process.
   */
  get userId() {
    return this.inner.otherUserId.toString();
  }

  /**
   * Cancel a verification.
   *
   * We will send an `m.key.verification.cancel` if the verification is still in flight. The verification promise
   * will reject, and a {@link Crypto.VerifierEvent#Cancel} will be emitted.
   *
   * @param e - the reason for the cancellation.
   */
  cancel(e) {
    // TODO: something with `e`
    var req = this.inner.cancel();
    if (req) {
      this.outgoingRequestProcessor.makeOutgoingRequest(req);
    }
  }

  /**
   * Get the details for an SAS verification, if one is in progress
   *
   * Returns `null`, unless this verifier is for a SAS-based verification and we are waiting for the user to confirm
   * the SAS matches.
   */
  getShowSasCallbacks() {
    return null;
  }

  /**
   * Get the details for reciprocating QR code verification, if one is in progress
   *
   * Returns `null`, unless this verifier is for reciprocating a QR-code-based verification (ie, the other user has
   * already scanned our QR code), and we are waiting for the user to confirm.
   */
  getReciprocateQrCodeCallbacks() {
    return null;
  }
}

/** A Verifier instance which is used to show and/or scan a QR code. */
class RustQrCodeVerifier extends BaseRustVerifer {
  constructor(inner, outgoingRequestProcessor) {
    super(inner, outgoingRequestProcessor);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "callbacks", null);
  }
  onChange() {
    // if the other side has scanned our QR code and sent us a "reciprocate" message, it is now time for the
    // application to prompt the user to confirm their side.
    if (this.callbacks === null && this.inner.hasBeenScanned()) {
      this.callbacks = {
        confirm: () => {
          this.confirmScanning();
        },
        cancel: () => this.cancel()
      };
    }
    super.onChange();
  }

  /**
   * Start the key verification, if it has not already been started.
   *
   * @returns Promise which resolves when the verification has completed, or rejects if the verification is cancelled
   *    or times out.
   */
  verify() {
    var _this7 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      // Some applications (hello, matrix-react-sdk) may not check if there is a `ShowQrCodeCallbacks` and instead
      // register a `ShowReciprocateQr` listener which they expect to be called once `.verify` is called.
      if (_this7.callbacks !== null) {
        _this7.emit(_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerifierEvent */ "c"].ShowReciprocateQr, _this7.callbacks);
      }
      // Nothing to do here but wait.
      yield _this7.completionDeferred.promise;
    })();
  }

  /**
   * Calculate an appropriate VerificationPhase for a VerificationRequest where this is the verifier.
   *
   * This is abnormally complicated because a rust-side QR Code verifier can span several verification phases.
   */
  get verificationPhase() {
    switch (this.inner.state()) {
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Created:
        // we have created a QR for display; neither side has yet sent an `m.key.verification.start`.
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Ready;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Scanned:
        // other side has scanned our QR and sent an `m.key.verification.start` with `m.reciprocate.v1`
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Confirmed:
        // we have confirmed the other side's scan and sent an `m.key.verification.done`.
        //
        // However, the verification is not yet "Done", because we have to wait until we have received the
        // `m.key.verification.done` from the other side (in particular, we don't mark the device/identity as
        // verified until that happens). If we return "Done" too soon, we risk the user cancelling the flow.
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Reciprocated:
        // although the rust SDK doesn't immediately send the `m.key.verification.start` on transition into this
        // state, `RustVerificationRequest.scanQrCode` immediately calls `reciprocate()` and does so, so in practice
        // we can treat the two the same.
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Done:
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Done;
      case _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["QrState"].Cancelled:
        return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Cancelled;
      default:
        throw new Error("Unknown qr code state ".concat(this.inner.state()));
    }
  }

  /**
   * Get the details for reciprocating QR code verification, if one is in progress
   *
   * Returns `null`, unless this verifier is for reciprocating a QR-code-based verification (ie, the other user has
   * already scanned our QR code), and we are waiting for the user to confirm.
   */
  getReciprocateQrCodeCallbacks() {
    return this.callbacks;
  }
  confirmScanning() {
    var _this8 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var req = _this8.inner.confirmScanning();
      if (req) {
        yield _this8.outgoingRequestProcessor.makeOutgoingRequest(req);
      }
    })();
  }
}

/** A Verifier instance which is used if we are exchanging emojis */
class RustSASVerifier extends BaseRustVerifer {
  constructor(inner, _verificationRequest, outgoingRequestProcessor) {
    super(inner, outgoingRequestProcessor);
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(this, "callbacks", null);
  }

  /**
   * Start the key verification, if it has not already been started.
   *
   * This means sending a `m.key.verification.start` if we are the first responder, or a `m.key.verification.accept`
   * if the other side has already sent a start event.
   *
   * @returns Promise which resolves when the verification has completed, or rejects if the verification is cancelled
   *    or times out.
   */
  verify() {
    var _this9 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      yield _this9.sendAccept();
      yield _this9.completionDeferred.promise;
    })();
  }

  /**
   * Send the accept or start event, if it hasn't already been sent
   */
  sendAccept() {
    var _this10 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
      var req = _this10.inner.accept();
      if (req) {
        yield _this10.outgoingRequestProcessor.makeOutgoingRequest(req);
      }
    })();
  }

  /** if we can now show the callbacks, do so */
  onChange() {
    var _this11 = this;
    super.onChange();
    if (this.callbacks === null) {
      var emoji = this.inner.emoji();
      var decimal = this.inner.decimals();
      if (emoji === undefined && decimal === undefined) {
        return;
      }
      var sas = {};
      if (emoji) {
        sas.emoji = emoji.map(e => [e.symbol, e.description]);
      }
      if (decimal) {
        sas.decimal = [decimal[0], decimal[1], decimal[2]];
      }
      this.callbacks = {
        sas,
        confirm: function () {
          var _confirm = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
            var requests = yield _this11.inner.confirm();
            for (var m of requests) {
              yield _this11.outgoingRequestProcessor.makeOutgoingRequest(m);
            }
          });
          function confirm() {
            return _confirm.apply(this, arguments);
          }
          return confirm;
        }(),
        mismatch: () => {
          var request = this.inner.cancelWithCode("m.mismatched_sas");
          if (request) {
            this.outgoingRequestProcessor.makeOutgoingRequest(request);
          }
        },
        cancel: () => {
          var request = this.inner.cancelWithCode("m.user");
          if (request) {
            this.outgoingRequestProcessor.makeOutgoingRequest(request);
          }
        }
      };
      this.emit(_crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerifierEvent */ "c"].ShowSas, this.callbacks);
    }
  }

  /**
   * Calculate an appropriate VerificationPhase for a VerificationRequest where this is the verifier.
   */
  get verificationPhase() {
    return _crypto_api_verification__WEBPACK_IMPORTED_MODULE_14__[/* VerificationPhase */ "a"].Started;
  }

  /**
   * Get the details for an SAS verification, if one is in progress
   *
   * Returns `null`, unless this verifier is for a SAS-based verification and we are waiting for the user to confirm
   * the SAS matches.
   */
  getShowSasCallbacks() {
    return this.callbacks;
  }

  /**
   * Replace the inner Rust verifier with a different one.
   *
   * @param inner - the new Rust verifier
   * @internal
   */
  replaceInner(inner) {
    if (this.inner != inner) {
      this.inner = inner;

      // As with RustVerificationRequest, we need to avoid a reference cycle.
      // See the comments in RustVerificationRequest.
      var weakThis = new WeakRef(this);
      inner.registerChangesCallback( /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_11___default()(function* () {
        var _weakThis$deref3;
        return (_weakThis$deref3 = weakThis.deref()) === null || _weakThis$deref3 === void 0 ? void 0 : _weakThis$deref3.onChange();
      }));

      // replaceInner will only get called if we started the verification at the same time as the other side, and we lost
      // the tie breaker.  So we need to re-accept their verification.
      this.sendAccept();
      this.onChange();
    }
  }
}

/** For each specced verification method, the rust-side `VerificationMethod` corresponding to it */
var verificationMethodsByIdentifier = {
  [_types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].Sas]: _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationMethod"].SasV1,
  [_types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].ScanQrCode]: _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationMethod"].QrCodeScanV1,
  [_types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].ShowQrCode]: _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationMethod"].QrCodeShowV1,
  [_types__WEBPACK_IMPORTED_MODULE_19__[/* VerificationMethod */ "a"].Reciprocate]: _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_13__["VerificationMethod"].ReciprocateV1
};

/**
 * Convert a specced verification method identifier into a rust-side `VerificationMethod`.
 *
 * @param method - specced method identifier, for example `m.sas.v1`.
 * @returns Rust-side `VerificationMethod` corresponding to `method`.
 * @throws An error if the method is unknown.
 *
 * @internal
 */
function verificationMethodIdentifierToMethod(method) {
  var meth = verificationMethodsByIdentifier[method];
  if (meth === undefined) {
    throw new Error("Unknown verification method ".concat(method));
  }
  return meth;
}

/**
 * Return true if the event's type matches that of an in-room verification event
 *
 * @param event - MatrixEvent
 * @returns
 *
 * @internal
 */
function isVerificationEvent(event) {
  switch (event.getType()) {
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationCancel:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationDone:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationMac:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationStart:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationKey:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationReady:
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].KeyVerificationAccept:
      return true;
    case _types_event__WEBPACK_IMPORTED_MODULE_17__[/* EventType */ "b"].RoomMessage:
      return event.getContent().msgtype === _types_event__WEBPACK_IMPORTED_MODULE_17__[/* MsgType */ "e"].KeyVerificationRequest;
    default:
      return false;
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("b639").Buffer))

/***/ }),

/***/ "c2ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OutgoingRequestsManager; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("67b8");



/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



/**
 * OutgoingRequestsManager: responsible for processing outgoing requests from the OlmMachine.
 * Ensure that only one loop is going on at once, and that the requests are processed in order.
 */
class OutgoingRequestsManager {
  constructor(logger, olmMachine, outgoingRequestProcessor) {
    this.logger = logger;
    this.olmMachine = olmMachine;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    /** whether {@link stop} has been called */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "stopped", false);
    /** whether {@link outgoingRequestLoop} is currently running */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "outgoingRequestLoopRunning", false);
    /**
     * If there are additional calls to doProcessOutgoingRequests() while there is a current call running
     * we need to remember in order to call `doProcessOutgoingRequests` again (as there could be new requests).
     *
     * If this is defined, it is an indication that we need to do another iteration; in this case the deferred
     * will resolve once that next iteration completes. If it is undefined, there have been no new calls
     * to `doProcessOutgoingRequests` since the current iteration started.
     */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "nextLoopDeferred", void 0);
  }

  /**
   * Shut down as soon as possible the current loop of outgoing requests processing.
   */
  stop() {
    this.stopped = true;
  }

  /**
   * Process the OutgoingRequests from the OlmMachine.
   *
   * This should be called at the end of each sync, to process any OlmMachine OutgoingRequests created by the rust sdk.
   * In some cases if OutgoingRequests need to be sent immediately, this can be called directly.
   *
   * Calls to doProcessOutgoingRequests() are processed synchronously, one after the other, in order.
   * If doProcessOutgoingRequests() is called while another call is still being processed, it will be queued.
   * Multiple calls to doProcessOutgoingRequests() when a call is already processing will be batched together.
   */
  doProcessOutgoingRequests() {
    // Flag that we need at least one more iteration of the loop.
    //
    // It is important that we do this even if the loop is currently running. There is potential for a race whereby
    // a request is added to the queue *after* `OlmMachine.outgoingRequests` checks the queue, but *before* it
    // returns. In such a case, the item could sit there unnoticed for some time.
    //
    // In order to circumvent the race, we set a flag which tells the loop to go round once again even if the
    // queue appears to be empty.
    if (!this.nextLoopDeferred) {
      this.nextLoopDeferred = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* defer */ "i"])();
    }

    // ... and wait for it to complete.
    var result = this.nextLoopDeferred.promise;

    // set the loop going if it is not already.
    if (!this.outgoingRequestLoopRunning) {
      this.outgoingRequestLoop().catch(e => {
        // this should not happen; outgoingRequestLoop should return any errors via `nextLoopDeferred`.
        /* istanbul ignore next */
        this.logger.error("Uncaught error in outgoing request loop", e);
      });
    }
    return result;
  }
  outgoingRequestLoop() {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      /* istanbul ignore if */
      if (_this.outgoingRequestLoopRunning) {
        throw new Error("Cannot run two outgoing request loops");
      }
      _this.outgoingRequestLoopRunning = true;
      try {
        while (!_this.stopped && _this.nextLoopDeferred) {
          var deferred = _this.nextLoopDeferred;

          // reset `nextLoopDeferred` so that any future calls to `doProcessOutgoingRequests` are queued
          // for another additional iteration.
          _this.nextLoopDeferred = undefined;

          // make the requests and feed the results back to the `nextLoopDeferred`
          yield _this.processOutgoingRequests().then(deferred.resolve, deferred.reject);
        }
      } finally {
        _this.outgoingRequestLoopRunning = false;
      }
      if (_this.nextLoopDeferred) {
        // the loop was stopped, but there was a call to `doProcessOutgoingRequests`. Make sure that
        // we reject the promise in case anything is waiting for it.
        _this.nextLoopDeferred.reject(new Error("OutgoingRequestsManager was stopped"));
      }
    })();
  }

  /**
   * Make a single request to `olmMachine.outgoingRequests` and do the corresponding requests.
   */
  processOutgoingRequests() {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
      if (_this2.stopped) return;
      var outgoingRequests = yield _this2.olmMachine.outgoingRequests();
      var _loop = function* _loop(request) {
        if (_this2.stopped) return {
          v: void 0
        };
        try {
          yield Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* logDuration */ "u"])(_this2.logger, "Make outgoing request ".concat(request.type), /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(function* () {
            yield _this2.outgoingRequestProcessor.makeOutgoingRequest(request);
          }));
        } catch (e) {
          // as part of the loop we silently ignore errors, but log them.
          // The rust sdk will retry the request later as it won't have been marked as sent.
          _this2.logger.error("Failed to process outgoing request ".concat(request.type, ": ").concat(e));
        }
      };
      for (var request of outgoingRequests) {
        var _ret = yield* _loop(request);
        if (typeof _ret === "object") return _ret.v;
      }
    })();
  }
}

/***/ }),

/***/ "e3ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrossSigningIdentity; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0036");

/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


/** Manages the cross-signing keys for our own user.
 *
 * @internal
 */
class CrossSigningIdentity {
  constructor(olmMachine, outgoingRequestProcessor, secretStorage) {
    this.olmMachine = olmMachine;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    this.secretStorage = secretStorage;
  }

  /**
   * Initialise our cross-signing keys by creating new keys if they do not exist, and uploading to the server
   */
  bootstrapCrossSigning(opts) {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* () {
      if (opts.setupNewCrossSigning) {
        yield _this.resetCrossSigning(opts.authUploadDeviceSigningKeys);
        return;
      }
      var olmDeviceStatus = yield _this.olmMachine.crossSigningStatus();

      // Try to fetch cross signing keys from the secret storage
      var masterKeyFromSecretStorage = yield _this.secretStorage.get("m.cross_signing.master");
      var selfSigningKeyFromSecretStorage = yield _this.secretStorage.get("m.cross_signing.self_signing");
      var userSigningKeyFromSecretStorage = yield _this.secretStorage.get("m.cross_signing.user_signing");
      var privateKeysInSecretStorage = Boolean(masterKeyFromSecretStorage && selfSigningKeyFromSecretStorage && userSigningKeyFromSecretStorage);
      var olmDeviceHasKeys = olmDeviceStatus.hasMaster && olmDeviceStatus.hasUserSigning && olmDeviceStatus.hasSelfSigning;

      // Log all relevant state for easier parsing of debug logs.
      _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: starting", {
        setupNewCrossSigning: opts.setupNewCrossSigning,
        olmDeviceHasMaster: olmDeviceStatus.hasMaster,
        olmDeviceHasUserSigning: olmDeviceStatus.hasUserSigning,
        olmDeviceHasSelfSigning: olmDeviceStatus.hasSelfSigning,
        privateKeysInSecretStorage
      });
      if (olmDeviceHasKeys) {
        if (!(yield _this.secretStorage.hasKey())) {
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].warn("bootstrapCrossSigning: Olm device has private keys, but secret storage is not yet set up; doing nothing for now.");
          // the keys should get uploaded to 4S once that is set up.
        } else if (!privateKeysInSecretStorage) {
          // the device has the keys but they are not in 4S, so update it
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: Olm device has private keys: exporting to secret storage");
          yield _this.exportCrossSigningKeysToStorage();
        } else {
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: Olm device has private keys and they are saved in secret storage; doing nothing");
        }
      } /* (!olmDeviceHasKeys) */else {
        if (privateKeysInSecretStorage) {
          // they are in 4S, so import from there
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: Cross-signing private keys not found locally, but they are available " + "in secret storage, reading storage and caching locally");
          yield _this.olmMachine.importCrossSigningKeys(masterKeyFromSecretStorage, selfSigningKeyFromSecretStorage, userSigningKeyFromSecretStorage);

          // Get the current device
          var device = yield _this.olmMachine.getDevice(_this.olmMachine.userId, _this.olmMachine.deviceId);
          try {
            // Sign the device with our cross-signing key and upload the signature
            var request = yield device.verify();
            yield _this.outgoingRequestProcessor.makeOutgoingRequest(request);
          } finally {
            device.free();
          }
        } else {
          _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: Cross-signing private keys not found locally or in secret storage, creating new keys");
          yield _this.resetCrossSigning(opts.authUploadDeviceSigningKeys);
        }
      }

      // TODO: we might previously have bootstrapped cross-signing but not completed uploading the keys to the
      //   server -- in which case we should call OlmDevice.bootstrap_cross_signing. How do we know?
      _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("bootstrapCrossSigning: complete");
    })();
  }

  /** Reset our cross-signing keys
   *
   * This method will:
   *   * Tell the OlmMachine to create new keys
   *   * Upload the new public keys and the device signature to the server
   *   * Upload the private keys to SSSS, if it is set up
   */
  resetCrossSigning(authUploadDeviceSigningKeys) {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* () {
      // XXX: We must find a way to make this atomic, currently if the user does not remember his account password
      // or 4S passphrase/key the process will fail in a bad state, with keys rotated but not uploaded or saved in 4S.
      var outgoingRequests = yield _this2.olmMachine.bootstrapCrossSigning(true);

      // If 4S is configured we need to update it.
      if (!(yield _this2.secretStorage.hasKey())) {
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].warn("resetCrossSigning: Secret storage is not yet set up; not exporting keys to secret storage yet.");
        // the keys should get uploaded to 4S once that is set up.
      } else {
        // Update 4S before uploading cross-signing keys, to stay consistent with legacy that asks
        // 4S passphrase before asking for account password.
        // Ultimately should be made atomic and resistant to forgotten password/passphrase.
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("resetCrossSigning: exporting to secret storage");
        yield _this2.exportCrossSigningKeysToStorage();
      }
      _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].log("resetCrossSigning: publishing keys to server");
      for (var req of [outgoingRequests.uploadKeysRequest, outgoingRequests.uploadSigningKeysRequest, outgoingRequests.uploadSignaturesRequest]) {
        if (req) {
          yield _this2.outgoingRequestProcessor.makeOutgoingRequest(req, authUploadDeviceSigningKeys);
        }
      }
    })();
  }

  /**
   * Extract the cross-signing keys from the olm machine and save them to secret storage, if it is configured
   *
   * (If secret storage is *not* configured, we assume that the export will happen when it is set up)
   */
  exportCrossSigningKeysToStorage() {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* () {
      var exported = yield _this3.olmMachine.exportCrossSigningKeys();
      /* istanbul ignore else (this function is only called when we know the olm machine has keys) */
      if (exported !== null && exported !== void 0 && exported.masterKey) {
        yield _this3.secretStorage.store("m.cross_signing.master", exported.masterKey);
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].error("Cannot export MSK to secret storage, private key unknown");
      }
      if (exported !== null && exported !== void 0 && exported.self_signing_key) {
        yield _this3.secretStorage.store("m.cross_signing.self_signing", exported.self_signing_key);
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].error("Cannot export SSK to secret storage, private key unknown");
      }
      if (exported !== null && exported !== void 0 && exported.userSigningKey) {
        yield _this3.secretStorage.store("m.cross_signing.user_signing", exported.userSigningKey);
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_1__[/* logger */ "b"].error("Cannot export USK to secret storage, private key unknown");
      }
    })();
  }
}

/***/ }),

/***/ "e98d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return secretStorageContainsCrossSigningKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return secretStorageCanAccessSecrets; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);

/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Check that the private cross signing keys (master, self signing, user signing) are stored in the secret storage and encrypted with the default secret storage key.
 *
 * @param secretStorage - The secret store using account data
 * @returns True if the cross-signing keys are all stored and encrypted with the same secret storage key.
 *
 * @internal
 */
function secretStorageContainsCrossSigningKeys(_x) {
  return _secretStorageContainsCrossSigningKeys.apply(this, arguments);
}

/**
 *
 * Check that the secret storage can access the given secrets using the default key.
 *
 * @param secretStorage - The secret store using account data
 * @param secretNames - The secret names to check
 * @returns True if all the given secrets are accessible and encrypted with the given key.
 *
 * @internal
 */
function _secretStorageContainsCrossSigningKeys() {
  _secretStorageContainsCrossSigningKeys = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (secretStorage) {
    return secretStorageCanAccessSecrets(secretStorage, ["m.cross_signing.master", "m.cross_signing.user_signing", "m.cross_signing.self_signing"]);
  });
  return _secretStorageContainsCrossSigningKeys.apply(this, arguments);
}
function secretStorageCanAccessSecrets(_x2, _x3) {
  return _secretStorageCanAccessSecrets.apply(this, arguments);
}
function _secretStorageCanAccessSecrets() {
  _secretStorageCanAccessSecrets = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (secretStorage, secretNames) {
    var defaultKeyId = yield secretStorage.getDefaultKeyId();
    if (!defaultKeyId) return false;
    for (var secretName of secretNames) {
      // check which keys this particular secret is encrypted with
      var record = (yield secretStorage.isStored(secretName)) || {};
      // if it's not encrypted with the right key, there is no point continuing
      if (!(defaultKeyId in record)) return false;
    }
    return true;
  });
  return _secretStorageCanAccessSecrets.apply(this, arguments);
}

/***/ }),

/***/ "eb1f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UnstablePrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DehydratedDeviceManager; });
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2c66");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("249d");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("40e9");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("907a");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("986a");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("1d02");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("3c5d");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("6ce5");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("2834");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4ea1");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("fbe9");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("054a");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("700b");
/* harmony import */ var _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("67b8");
/* harmony import */ var _http_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("be2e");
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("ac66");












/*
Copyright 2024 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/






/**
 * The response body of `GET /_matrix/client/unstable/org.matrix.msc3814.v1/dehydrated_device`.
 */

/**
 * The response body of `POST /_matrix/client/unstable/org.matrix.msc3814.v1/dehydrated_device/events`.
 */

/**
 * The unstable URL prefix for dehydrated device endpoints
 */
var UnstablePrefix = "/_matrix/client/unstable/org.matrix.msc3814.v1";
/**
 * The name used for the dehydration key in Secret Storage
 */
var SECRET_STORAGE_NAME = "org.matrix.msc3814";

/**
 * The interval between creating dehydrated devices. (one week)
 */
var DEHYDRATION_INTERVAL = 7 * 24 * 60 * 60 * 1000;

/**
 * Manages dehydrated devices
 *
 * We have one of these per `RustCrypto`.  It's responsible for
 *
 * * determining server support for dehydrated devices
 * * creating new dehydrated devices when requested, including periodically
 *   replacing the dehydrated device with a new one
 * * rehydrating a device when requested, and when present
 *
 * @internal
 */
class DehydratedDeviceManager {
  constructor(logger, olmMachine, http, outgoingRequestProcessor, secretStorage) {
    this.logger = logger;
    this.olmMachine = olmMachine;
    this.http = http;
    this.outgoingRequestProcessor = outgoingRequestProcessor;
    this.secretStorage = secretStorage;
    /** the secret key used for dehydrating and rehydrating */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(this, "key", void 0);
    /** the ID of the interval for periodically replacing the dehydrated device */
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(this, "intervalId", void 0);
  }

  /**
   * Return whether the server supports dehydrated devices.
   */
  isSupported() {
    var _this = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      // call the endpoint to get a dehydrated device.  If it returns an
      // M_UNRECOGNIZED error, then dehydration is unsupported.  If it returns
      // a successful response, or an M_NOT_FOUND, then dehydration is supported.
      // Any other exceptions are passed through.
      try {
        yield _this.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_14__[/* Method */ "i"].Get, "/dehydrated_device", undefined, undefined, {
          prefix: UnstablePrefix
        });
      } catch (error) {
        var err = error;
        if (err.errcode === "M_UNRECOGNIZED") {
          return false;
        } else if (err.errcode === "M_NOT_FOUND") {
          return true;
        }
        throw error;
      }
      return true;
    })();
  }

  /**
   * Start using device dehydration.
   *
   * - Rehydrates a dehydrated device, if one is available.
   * - Creates a new dehydration key, if necessary, and stores it in Secret
   *   Storage.
   *   - If `createNewKey` is set to true, always creates a new key.
   *   - If a dehydration key is not available, creates a new one.
   * - Creates a new dehydrated device, and schedules periodically creating
   *   new dehydrated devices.
   *
   * @param createNewKey - whether to force creation of a new dehydration key.
   *   This can be used, for example, if Secret Storage is being reset.
   */
  start(createNewKey) {
    var _this2 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      _this2.stop();
      try {
        yield _this2.rehydrateDeviceIfAvailable();
      } catch (e) {
        // If rehydration fails, there isn't much we can do about it.  Log
        // the error, and create a new device.
        _this2.logger.info("dehydration: Error rehydrating device:", e);
      }
      if (createNewKey) {
        yield _this2.resetKey();
      }
      yield _this2.scheduleDeviceDehydration();
    })();
  }

  /**
   * Return whether the dehydration key is stored in Secret Storage.
   */
  isKeyStored() {
    var _this3 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      return Boolean(yield _this3.secretStorage.isStored(SECRET_STORAGE_NAME));
    })();
  }

  /**
   * Reset the dehydration key.
   *
   * Creates a new key and stores it in secret storage.
   */
  resetKey() {
    var _this4 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      var key = new Uint8Array(32);
      globalThis.crypto.getRandomValues(key);
      yield _this4.secretStorage.store(SECRET_STORAGE_NAME, Object(_base64__WEBPACK_IMPORTED_MODULE_15__[/* encodeUnpaddedBase64 */ "c"])(key));
      _this4.key = key;
    })();
  }

  /**
   * Get and cache the encryption key from secret storage.
   *
   * If `create` is `true`, creates a new key if no existing key is present.
   *
   * @returns the key, if available, or `null` if no key is available
   */
  getKey(create) {
    var _this5 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      if (_this5.key === undefined) {
        var keyB64 = yield _this5.secretStorage.get(SECRET_STORAGE_NAME);
        if (keyB64 === undefined) {
          if (!create) {
            return null;
          }
          yield _this5.resetKey();
        } else {
          _this5.key = Object(_base64__WEBPACK_IMPORTED_MODULE_15__[/* decodeBase64 */ "a"])(keyB64);
        }
      }
      return _this5.key;
    })();
  }

  /**
   * Rehydrate the dehydrated device stored on the server.
   *
   * Checks if there is a dehydrated device on the server.  If so, rehydrates
   * the device and processes the to-device events.
   *
   * Returns whether or not a dehydrated device was found.
   */
  rehydrateDeviceIfAvailable() {
    var _this6 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      var key = yield _this6.getKey(false);
      if (!key) {
        return false;
      }
      var dehydratedDeviceResp;
      try {
        dehydratedDeviceResp = yield _this6.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_14__[/* Method */ "i"].Get, "/dehydrated_device", undefined, undefined, {
          prefix: UnstablePrefix
        });
      } catch (error) {
        var err = error;
        // We ignore M_NOT_FOUND (there is no dehydrated device, so nothing
        // us to do) and M_UNRECOGNIZED (the server does not understand the
        // endpoint).  We pass through any other errors.
        if (err.errcode === "M_NOT_FOUND" || err.errcode === "M_UNRECOGNIZED") {
          _this6.logger.info("dehydration: No dehydrated device");
          return false;
        }
        throw err;
      }
      _this6.logger.info("dehydration: dehydrated device found");
      var rehydratedDevice = yield _this6.olmMachine.dehydratedDevices().rehydrate(key, new _matrix_org_matrix_sdk_crypto_wasm__WEBPACK_IMPORTED_MODULE_12__["DeviceId"](dehydratedDeviceResp.device_id), JSON.stringify(dehydratedDeviceResp.device_data));
      _this6.logger.info("dehydration: device rehydrated");
      var nextBatch = undefined;
      var toDeviceCount = 0;
      var roomKeyCount = 0;
      var path = Object(_utils__WEBPACK_IMPORTED_MODULE_13__[/* encodeUri */ "k"])("/dehydrated_device/$device_id/events", {
        $device_id: dehydratedDeviceResp.device_id
      });
      // eslint-disable-next-line no-constant-condition
      while (true) {
        var eventResp = yield _this6.http.authedRequest(_http_api__WEBPACK_IMPORTED_MODULE_14__[/* Method */ "i"].Post, path, undefined, nextBatch ? {
          next_batch: nextBatch
        } : {}, {
          prefix: UnstablePrefix
        });
        if (eventResp.events.length === 0) {
          break;
        }
        toDeviceCount += eventResp.events.length;
        nextBatch = eventResp.next_batch;
        var roomKeyInfos = yield rehydratedDevice.receiveEvents(JSON.stringify(eventResp.events));
        roomKeyCount += roomKeyInfos.length;
      }
      _this6.logger.info("dehydration: received ".concat(roomKeyCount, " room keys from ").concat(toDeviceCount, " to-device events"));
      return true;
    })();
  }

  /**
   * Creates and uploads a new dehydrated device.
   *
   * Creates and stores a new key in secret storage if none is available.
   */
  createAndUploadDehydratedDevice() {
    var _this7 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      var key = yield _this7.getKey(true);
      var dehydratedDevice = yield _this7.olmMachine.dehydratedDevices().create();
      var request = yield dehydratedDevice.keysForUpload("Dehydrated device", key);
      yield _this7.outgoingRequestProcessor.makeOutgoingRequest(request);
      _this7.logger.info("dehydration: uploaded device");
    })();
  }

  /**
   * Schedule periodic creation of dehydrated devices.
   */
  scheduleDeviceDehydration() {
    var _this8 = this;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10___default()(function* () {
      // cancel any previously-scheduled tasks
      _this8.stop();
      yield _this8.createAndUploadDehydratedDevice();
      _this8.intervalId = setInterval(() => {
        _this8.createAndUploadDehydratedDevice().catch(error => {
          _this8.logger.error("Error creating dehydrated device:", error);
        });
      }, DEHYDRATION_INTERVAL);
    })();
  }

  /**
   * Stop the dehydrated device manager.
   *
   * Cancels any scheduled dehydration tasks.
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=matrix-element.16.js.map