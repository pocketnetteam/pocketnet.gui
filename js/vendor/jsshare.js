/**
 * JS-Share - vanilla javascript social networks and messengers sharing
 * https://github.com/delfimov/JS-Share
 *
 * Copyright (c) 2017-2018 by Dmitry Elfimov
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Minimum setup example:
 *
 <div>Share:
 <button class="social_share" data-type="vk">VK.com</button>
 <button class="social_share" data-type="facebook">Facebook</button>
 <button class="social_share" data-type="twitter">Twitter</button>
 <button class="social_share" data-type="livejournal">LiveJournal</button>
 <button class="social_share" data-type="ok">ok.ru</button>
 <button class="social_share" data-type="mailru">Mail.Ru</button>
 <button class="social_share" data-type="reddit">Reddit</button>
 <button class="social_share" data-type="googleplus">Google+</button>
 <button class="social_share" data-type="telegram">Telegram</button>
 <button class="social_share" data-type="whatsapp">Whatsapp</button>
 <button class="social_share" data-type="viber">Viber</button>
 <button class="social_share" data-type="email">Email</button>
 </div>

 var shareItems = document.querySelectorAll('.social_share');
 for (var i = 0; i < shareItems.length; i += 1) {
   shareItems[i].addEventListener('click', function share(e) {
     return JSShare.go(this);
   });
 }

 *
 * Inline example:
 *
 <a href="#" onclick="return JSShare.go(this)" data-type="facebook">I like it</a>

 */


;(function (factory) {
  var registeredInModuleLoader;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    return window.JSShare = factory();
  }
}(function () {

  /**
   * indexOf for old browsers
   */
  if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function(find, i /*opt*/) {
      if (i === undefined) i = 0;
      if (i < 0) i += this.length;
      if (i < 0) i = 0;
      for (var n = this.length; i < n; i++)
        if (i in this && this[i] === find)
          return i;
      return -1;
    };
  }

  /**
   * Object Extending Functionality
   */
  function _extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }
    return out;
  }

  /**
   * Get data-attributes
   */
  function _getData(el, defaultOptions) {
    var data = {};
    for (var key in defaultOptions) {
      if (defaultOptions.hasOwnProperty(key)) {
        var value = el.getAttribute('data-' + key);
        if (value !== null && typeof value != 'undefined') {
          data[key] = value;
        }
      }
    }
    return data;
  }

  /**
   * Open a popup window with sharing info
   * @param url
   * @param _options
   * @returns {Window}
   * @private
   */
  function _popup (url, _options) {
    return window.open(url, '', 'toolbar=0,status=0,scrollbars=1,width=' + _options.popup_width + ',height=' + _options.popup_height);
  }

  /**
   * Get URL for sharing based on options
   * @param options
   * @returns {string | *}
   * @private
   */
  function _getURL(options) {
    if (options.url === '') {
      options.url = location.href;
    }
    var url = options.url;
    var utm = '';
    if (options.utm_source !== '') {
      utm += '&utm_source=' + options.utm_source;
    }
    if (options.utm_medium !== '') {
      utm += '&utm_medium=' + options.utm_medium;
    }
    if (options.utm_campaign !== '') {
      utm += '&utm_campaign=' + options.utm_campaign;
    }
    if (utm !== '') {
      url = url + '?' + utm;
    }
    return url;
  }

  var social = {
    // default handler
    unknown: function (options) {
      return encodeURIComponent(_getURL(options));
    },

    // vk.com - ВКонтакте
    vk: function (options) {
      return 'http://vk.com/share.php'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&description=' + encodeURIComponent(options.text)
        + '&image=' + encodeURIComponent(options.image)
        + '&noparse=true';
    },

    // ok.ru - Одноклассники
    ok: function (options) {
      return 'https://connect.ok.ru/offer'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&description=' + encodeURIComponent(options.text)
        + '&imageUrl=' + encodeURIComponent(options.image);
    },

    // Facebook
    fb: function (options) {
      return 'https://www.facebook.com/sharer.php'
        + '?u=' + encodeURIComponent(_getURL(options));
    },

    facebook: function (options) {
      return 'https://www.facebook.com/sharer.php'
        + '?u=' + encodeURIComponent(_getURL(options));
    },

    // Google bookmarks
    googlebookmarks: function (options) {
      return 'https://www.google.com/bookmarks/mark'
        + '?op=edit'
        + '&bkmk=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&annotation=' + encodeURIComponent(options.text)
        + '&labels=';
    },

    // Livejournal
    livejournal: function (options) {
      return 'http://livejournal.com/update.bml'
        + '?subject=' + encodeURIComponent(options.title)
        + '&event=' + encodeURIComponent(options.text + '<br/><a href="' + _getURL(options) + '">' + options.title + '</a>')
        + '&transform=1';
    },

    // Tumblr
    tumblr: function (options) {
      return 'https://www.tumblr.com/widgets/share/tool'
        + '?canonicalUrl=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&caption=' + encodeURIComponent(options.text)
        + '&tags=';
    },

    // Pinterest
    pinterest: function (options) {
      return 'http://pinterest.com/pin/create/link/'
        + '?url=' + encodeURIComponent(_getURL(options));
    },

    // linkedin
    linkedin: function (options) {
      return 'https://www.linkedin.com/shareArticle'
        + '?mini=true'
        + '&url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&summary=' + encodeURIComponent(options.text);
    },

    // Reddit
    reddit: function (options) {
      return 'https://reddit.com/submit'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title);
    },

    // Twitter
    twitter: function (options) {
      var url = _getURL(options);
      return 'http://twitter.com/share'
        + '?text=' + encodeURIComponent(options.title)
        + '&url=' + encodeURIComponent(url)
        + '&counturl=' + encodeURIComponent(url);
    },

    // Mail.ru
    mailru: function (options) {
      return 'http://connect.mail.ru/share'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&description=' + encodeURIComponent(options.text)
        + '&imageurl=' + encodeURIComponent(options.image);
    },

    // Google+
    googleplus: function (options) {
      return 'https://plus.google.com/share'
        + '?url=' + encodeURIComponent(_getURL(options));
    },

    // Weibo
    weibo: function (options) {
      return 'http://service.weibo.com/share/share.php'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&title=' + encodeURIComponent(options.title)
        + '&pic=' + encodeURIComponent(options.image);
    },

    // Telegram
    telegram: function (options) {
      return 'https://telegram.me/share/url'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&text=' + encodeURIComponent(options.title);
    },

    // WhatsApp
    whatsapp: function (options) {
      return 'https://wa.me/'
        + '?text=' + encodeURIComponent(_getURL(options) + "\n" + options.title);
    },

    // Viber
    viber: function (options) {
      return 'viber://forward'
        + '?text=' + encodeURIComponent(_getURL(options) + "\n" + options.title);
    },

    // Skype
    skype: function (options) {
      return 'https://web.skype.com/share'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&text=' + encodeURIComponent(options.title);
    },

    // Line.me
    line: function (options) {
      return 'https://lineit.line.me/share/ui'
        + '?url=' + encodeURIComponent(_getURL(options))
        + '&text=' + encodeURIComponent(options.title);
    },

    // E-mail
    email: function (options) {
      return 'mailto:'
        + '?subject=' + encodeURIComponent(options.title)
        + '&body=' + encodeURIComponent(_getURL(options))
        + encodeURIComponent("\n" + options.text);
    }
  };

  function init() {
    var defaultOptions = {
      type: 'email',         // default share type
      url: '',               // url to share
      title: document.title, // title to share
      image: '',             // image to share
      text: '',              // text to share
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      popup_width: 626,
      popup_height: 436
    };

    function api() {}

    function go(element, options) {
      var withoutPopup = [
        'unknown',
        'viber',
        'telegram',
        'whatsapp',
        'email',
        'skype',
        'line'
      ];
      var tryLocation = true; // should we try to redirect user following share link
      var link;

      options = _extend(
        defaultOptions,                    // default options - low priority
        _getData(element, defaultOptions), // options from data-* attributes
        options                            // options from method call - highest proprity
      );

      if (typeof social[options.type] == 'undefined') {
        options.type = 'unknown'
      }

      link = social[options.type](options);

      if (withoutPopup.indexOf(options.type) === -1) { // if we must try to open a popup window we will try
        tryLocation = _popup(link, options) === null;
      }

      if (tryLocation) {                      // and if we succeed, we will not redirect user to share link location, otherwise
        if (element.tagName === 'A'
          && element.tagName === 'a') {       // if element is <a> tag
          element.setAttribute('href', link); // set attribute href
          return true;                        // and return true, so this tag will behave as a usual link
        } else {
          location.href = link;               // if it's not <a> tag, change location to redirect
          return false;
        }
      } else {
        return false;
      }
    }

    api.go = go;
    api.options = defaultOptions;
    return api;
  }

  return init();
}));
