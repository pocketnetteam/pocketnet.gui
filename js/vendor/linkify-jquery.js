(function (jQuery, linkifyjs) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var jQuery__default = /*#__PURE__*/_interopDefaultLegacy(jQuery);

  const HTML_NODE = 1,
    TXT_NODE = 3;

  /**
   * @param {HTMLElement} parent
   * @param {Text | HTMLElement | ChildNode} oldChild
   * @param {Array<Text | HTMLElement>} newChildren
   */
  function replaceChildWithChildren(parent, oldChild, newChildren) {
    let lastNewChild = newChildren[newChildren.length - 1];
    parent.replaceChild(lastNewChild, oldChild);
    for (let i = newChildren.length - 2; i >= 0; i--) {
      parent.insertBefore(newChildren[i], lastNewChild);
      lastNewChild = newChildren[i];
    }
  }

  /**
   * @param {import('linkifyjs').MultiToken[]} tokens
   * @param {import('linkifyjs').Options} options
   * @param {Document} doc Document implementation
   * @returns {Array<Text | HTMLElement>}
   */
  function tokensToNodes(tokens, options, doc) {
    const result = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.t === 'nl' && options.get('nl2br')) {
        result.push(doc.createElement('br'));
      } else if (!token.isLink || !options.check(token)) {
        result.push(doc.createTextNode(token.toString()));
      } else {
        result.push(options.render(token));
      }
    }
    return result;
  }

  /**
   * Requires document.createElement
   * @param {HTMLElement | ChildNode} element
   * @param {import('linkifyjs').Options} options
   * @param {Document} doc
   * @returns {HTMLElement}
   */
  function linkifyElementHelper(element, options, doc) {
    // Can the element be linkified?
    if (!element || element.nodeType !== HTML_NODE) {
      throw new Error(`Cannot linkify ${element} - Invalid DOM Node type`);
    }

    // Is this element already a link?
    if (element.tagName === 'A' || options.ignoreTags.indexOf(element.tagName) >= 0) {
      // No need to linkify
      return element;
    }
    let childElement = element.firstChild;
    while (childElement) {
      let str, tokens, nodes;
      switch (childElement.nodeType) {
        case HTML_NODE:
          linkifyElementHelper(childElement, options, doc);
          break;
        case TXT_NODE:
          {
            str = childElement.nodeValue;
            tokens = linkifyjs.tokenize(str);
            if (tokens.length === 0 || tokens.length === 1 && tokens[0].t === 'text') {
              // No node replacement required
              break;
            }
            nodes = tokensToNodes(tokens, options, doc);

            // Swap out the current child for the set of nodes
            replaceChildWithChildren(element, childElement, nodes);

            // so that the correct sibling is selected next
            childElement = nodes[nodes.length - 1];
            break;
          }
      }
      childElement = childElement.nextSibling;
    }
    return element;
  }

  /**
   * @param {Document} doc The document implementaiton
   */
  function getDefaultRender(doc) {
    return _ref => {
      let {
        tagName,
        attributes,
        content,
        eventListeners
      } = _ref;
      const link = doc.createElement(tagName);
      for (const attr in attributes) {
        link.setAttribute(attr, attributes[attr]);
      }
      if (eventListeners && link.addEventListener) {
        for (const event in eventListeners) {
          link.addEventListener(event, eventListeners[event]);
        }
      }
      link.appendChild(doc.createTextNode(content));
      return link;
    };
  }

  /**
   * Recursively traverse the given DOM node, find all links in the text and
   * convert them to anchor tags.
   *
   * @param {HTMLElement} element A DOM node to linkify
   * @param {import('linkifyjs').Opts} [opts] linkify options
   * @param {Document} [doc] (optional) window.document implementation, if differs from global
   * @returns {HTMLElement}
   */
  function linkifyElement(element, opts, doc) {
    if (opts === void 0) {
      opts = null;
    }
    if (doc === void 0) {
      doc = null;
    }
    try {
      doc = doc || document || window && window.document || global && global.document;
    } catch (e) {/* do nothing for now */}
    if (!doc) {
      throw new Error('Cannot find document implementation. ' + 'If you are in a non-browser environment like Node.js, ' + 'pass the document implementation as the third argument to linkifyElement.');
    }
    const options = new linkifyjs.Options(opts, getDefaultRender(doc));
    return linkifyElementHelper(element, options, doc);
  }

  // Maintain reference to the recursive helper and option-normalization for use
  // in linkify-jquery
  linkifyElement.helper = linkifyElementHelper;
  linkifyElement.getDefaultRender = getDefaultRender;

  /**
   * @param {import('linkifyjs').Opts | import('linkifyjs').Options} opts
   * @param {Document} doc
   */
  linkifyElement.normalize = (opts, doc) => new linkifyjs.Options(opts, getDefaultRender(doc));

  // Applies the plugin to jQuery
  /**
   *
   * @param {any} $ the global jQuery object
   * @param {Document} [doc] (optional) browser document implementation
   * @returns
   */
  function apply($, doc) {
    if (doc === void 0) {
      doc = false;
    }
    $.fn = $.fn || {};
    if (typeof $.fn.linkify === 'function') {
      // Already applied
      return;
    }
    try {
      doc = doc || document || window && window.document || global && global.document;
    } catch (e) {/* do nothing for now */}
    if (!doc) {
      throw new Error('Cannot find document implementation. ' + 'If you are in a non-browser environment like Node.js, ' + 'pass the document implementation as the second argument to linkify-jquery');
    }
    function jqLinkify(opts) {
      const options = linkifyElement.normalize(opts, doc);
      return this.each(function () {
        linkifyElement.helper(this, options, doc);
      });
    }
    $.fn.linkify = jqLinkify;
    $(function () {
      $('[data-linkify]').each(function () {
        const $this = $(this);
        const data = $this.data();
        const target = data.linkify;
        const nl2br = data.linkifyNl2br;
        const opts = {
          nl2br: !!nl2br && nl2br !== 0 && nl2br !== 'false'
        };
        if ('linkifyAttributes' in data) {
          opts.attributes = data.linkifyAttributes;
        }
        if ('linkifyDefaultProtocol' in data) {
          opts.defaultProtocol = data.linkifyDefaultProtocol;
        }
        if ('linkifyEvents' in data) {
          opts.events = data.linkifyEvents;
        }
        if ('linkifyFormat' in data) {
          opts.format = data.linkifyFormat;
        }
        if ('linkifyFormatHref' in data) {
          opts.formatHref = data.linkifyFormatHref;
        }
        if ('linkifyTagname' in data) {
          opts.tagName = data.linkifyTagname;
        }
        if ('linkifyTarget' in data) {
          opts.target = data.linkifyTarget;
        }
        if ('linkifyRel' in data) {
          opts.rel = data.linkifyRel;
        }
        if ('linkifyValidate' in data) {
          opts.validate = data.linkifyValidate;
        }
        if ('linkifyIgnoreTags' in data) {
          opts.ignoreTags = data.linkifyIgnoreTags;
        }
        if ('linkifyClassName' in data) {
          opts.className = data.linkifyClassName;
        }
        const $target = target === 'this' ? $this : $this.find(target);
        $target.linkify(opts);
      });
    });
  }

  // Try applying to the globally-defined jQuery element, if possible
  try {
    apply(jQuery__default["default"]);
  } catch (e) {/**/}

  // Try assigning linkifyElement to the browser scope
  try {
    window.linkifyElement = linkifyElement;
  } catch (e) {/**/}

  return apply;

})(jQuery, linkify);
