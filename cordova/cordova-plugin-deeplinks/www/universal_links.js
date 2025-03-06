var exec = require('cordova/exec'),
  channel = require('cordova/channel'),

  // Reference name for the plugin
  PLUGIN_NAME = 'UniversalLinks',

  // Default event name that is used by the plugin
  DEFAULT_EVENT_NAME = 'didLaunchAppFromLink';

// Plugin methods on the native side that can be called from JavaScript
pluginNativeMethod = {
  SUBSCRIBE: 'jsSubscribeForEvent',
  UNSUBSCRIBE: 'jsUnsubscribeFromEvent'
};

var universalLinks = {
  dpLink: null,
  host: '',
  eventName: null,
  regex: /\b[\w-]+$/gm, // /^.+token=/,

  /**
   * Initialize the deeplink
   */
  initialize: function() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.host = options.host || this.host;
    this.eventName = options.eventName || this.eventName;
    this.regex = options.regex || this.regex;
    this.bindEvents();
  },

  /**
   * Bind Event Listeners
   */
  bindEvents: function() {
    var _this = this;
    document.addEventListener('deviceready', function() {
      _this.onDeviceReady();
    }, false);
  },

  /**
   *  deviceready Event Handler
   */
  onDeviceReady: function() {
    var _this = this;
    this.subscribe(_this.eventName, function(event) {
      _this.didLaunchAppFromLink(event);
    });
  },

  /**
   *  store deeplink event
   */
  didLaunchAppFromLink: function(eventData) {
    this.dpLink = eventData;
    console.log('Did launch application from the link: ' ,eventData)
  },

  /**
   * validates the host and uses the regular expression to extract the value from the deeplink
   */
  validateDeeplink: function() {
    var regex = this.regex;
    var host = this.host;
    if (host) {
      this.dpLink['host'] = host;
      this.dpLink['match'] = this.dpLink.url.indexOf(host) > -1;
    }
    if (regex) {
      this.dpLink['regex'] = regex;
      this.dpLink['value'] = this.dpLink.url.match(regex) || this.dpLink.hash.match(regex) || this.dpLink.path.match(regex);
    }
  },

  /**
   * promise to check if the app uses the DeepLink or not
   *
   * @param {number} milliseconds - Optional. The number of milliseconds to wait before executing the code. If omitted, the value 0 is used
   */
  checkDeepLink: function (milliseconds) {
      var _this = this;
      return new Promise(function (resolve, reject) {
          setTimeout(function () {
              if (_this.dpLink)
                _this.validateDeeplink()
              resolve(_this.dpLink);
          }, milliseconds || 0);
      });
  },

  /**
   * Subscribe to event.
   * If plugin already captured that event - callback will be called immidietly.
   *
   * @param {String} eventName - name of the event you are subscribing on; if null - default plugin event is used
   * @param {Function} callback - callback that is called when event is captured
   */
  subscribe: function(eventName, callback) {
    if (!callback) {
      console.warn('Universal Links: can\'t subscribe to event without a callback');
      return;
    }

    if (!eventName) {
      eventName = DEFAULT_EVENT_NAME;
    }

    var innerCallback = function(msg) {
      callback(msg.data);
    };

    exec(innerCallback, null, PLUGIN_NAME, pluginNativeMethod.SUBSCRIBE, [eventName]);
  },

  /**
   * Unsubscribe from the event.
   *
   * @param {String} eventName - from what event we are unsubscribing
   */
  unsubscribe: function(eventName) {
    if (!eventName) {
      eventName = DEFAULT_EVENT_NAME;
    }

    exec(null, null, PLUGIN_NAME, pluginNativeMethod.UNSUBSCRIBE, [eventName]);
  }
};

if (!window.plugins) {
  window.plugins = {};
}

window.plugins.universalLinks = universalLinks;

module.exports = universalLinks;
