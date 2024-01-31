(window["matrixElement_jsonp"] = window["matrixElement_jsonp"] || []).push([[11],{

/***/ "./node_modules/vue-carousel/dist/vue-carousel.min.js":
/***/ (function(module, exports, __webpack_require__) {

eval("/*!\n * vue-carousel v0.18.0-alpha\n * (c) 2019 todd.beauchamp@ssense.com\n * https://github.com/ssense/vue-carousel#readme\n */\n!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,\"a\",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p=\"\",n(n.s=53)}([function(t,e,n){var r=n(30)(\"wks\"),i=n(15),o=n(3).Symbol,a=\"function\"==typeof o;(t.exports=function(t){return r[t]||(r[t]=a&&o[t]||(a?o:i)(\"Symbol.\"+t))}).store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(3),i=n(11),o=n(6),a=n(10),s=n(29),u=function(t,e,n){var c,l,f,d,h=t&u.F,p=t&u.G,g=t&u.S,v=t&u.P,y=t&u.B,m=p?r:g?r[e]||(r[e]={}):(r[e]||{}).prototype,b=p?i:i[e]||(i[e]={}),x=b.prototype||(b.prototype={});for(c in p&&(n=e),n)f=((l=!h&&m&&void 0!==m[c])?m:n)[c],d=y&&l?s(f,r):v&&\"function\"==typeof f?s(Function.call,f):f,m&&a(m,c,f,t&u.U),b[c]!=f&&o(b,c,d),v&&x[c]!=f&&(x[c]=f)};r.core=i,u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){var n=t.exports=\"undefined\"!=typeof window&&window.Math==Math?window:\"undefined\"!=typeof self&&self.Math==Math?self:Function(\"return this\")();\"number\"==typeof __g&&(__g=n)},function(t,e,n){var r=n(7),i=n(40),o=n(20),a=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return a(t,e,n)}catch(t){}if(\"get\"in n||\"set\"in n)throw TypeError(\"Accessors not supported!\");return\"value\"in n&&(t[e]=n.value),t}},function(t,e,n){t.exports=!n(1)(function(){return 7!=Object.defineProperty({},\"a\",{get:function(){return 7}}).a})},function(t,e,n){var r=n(4),i=n(14);t.exports=n(5)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(t+\" is not an object!\");return t}},function(t,e){t.exports=function(t){return\"object\"==typeof t?null!==t:\"function\"==typeof t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(3),i=n(6),o=n(9),a=n(15)(\"src\"),s=Function.toString,u=(\"\"+s).split(\"toString\");n(11).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,s){var c=\"function\"==typeof n;c&&(o(n,\"name\")||i(n,\"name\",e)),t[e]!==n&&(c&&(o(n,a)||i(n,a,t[e]?\"\"+t[e]:u.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:i(t,e,n):(delete t[e],i(t,e,n)))})(Function.prototype,\"toString\",function(){return\"function\"==typeof this&&this[a]||s.call(this)})},function(t,e){var n=t.exports={version:\"2.5.7\"};\"number\"==typeof __e&&(__e=n)},function(t,e,n){var r=n(47),i=n(17);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(48),i=n(33);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return\"Symbol(\".concat(void 0===t?\"\":t,\")_\",(++n+r).toString(36))}},function(t,e,n){var r=n(17);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError(\"Can't call method on  \"+t);return t}},function(t,e){t.exports={}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(8);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&\"function\"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if(\"function\"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&\"function\"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError(\"Can't convert object to primitive value\")}},function(t,e){t.exports=!1},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||\"\",r=t[3];if(!r)return n;if(e&&\"function\"==typeof btoa){var i=function(t){return\"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,\"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+\" */\"}(r),o=r.sources.map(function(t){return\"/*# sourceURL=\"+r.sourceRoot+t+\" */\"});return[n].concat(o).concat([i]).join(\"\\n\")}return[n].join(\"\\n\")}(e,t);return e[2]?\"@media \"+e[2]+\"{\"+n+\"}\":n}).join(\"\")},e.i=function(t,n){\"string\"==typeof t&&(t=[[null,t,\"\"]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];\"number\"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];\"number\"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]=\"(\"+a[2]+\") and (\"+n+\")\"),e.push(a))}},e}},function(t,e,n){\"use strict\";function r(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],s={id:t+\":\"+i,css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.r(e),n.d(e,\"default\",function(){return p});var i=\"undefined\"!=typeof document;if(\"undefined\"!=typeof DEBUG&&DEBUG&&!i)throw new Error(\"vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.\");var o={},a=i&&(document.head||document.getElementsByTagName(\"head\")[0]),s=null,u=0,c=!1,l=function(){},f=null,d=\"data-vue-ssr-id\",h=\"undefined\"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,i){c=n,f=i||{};var a=r(t,e);return g(a),function(e){for(var n=[],i=0;i<a.length;i++){var s=a[i];(u=o[s.id]).refs--,n.push(u)}for(e?g(a=r(t,e)):a=[],i=0;i<n.length;i++){var u;if(0===(u=n[i]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete o[u.id]}}}}function g(t){for(var e=0;e<t.length;e++){var n=t[e],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(y(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(y(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var t=document.createElement(\"style\");return t.type=\"text/css\",a.appendChild(t),t}function y(t){var e,n,r=document.querySelector(\"style[\"+d+'~=\"'+t.id+'\"]');if(r){if(c)return l;r.parentNode.removeChild(r)}if(h){var i=u++;r=s||(s=v()),e=b.bind(null,r,i,!1),n=b.bind(null,r,i,!0)}else r=v(),e=function(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute(\"media\",r),f.ssrId&&t.setAttribute(d,e.id),i&&(n+=\"\\n/*# sourceURL=\"+i.sources[0]+\" */\",n+=\"\\n/*# sourceMappingURL=data:application/json;base64,\"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+\" */\"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join(\"\\n\")}}();function b(t,e,n,r){var i=n?\"\":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}},function(t,e,n){var r=n(95);\"string\"==typeof r&&(r=[[t.i,r,\"\"]]),r.locals&&(t.exports=r.locals),(0,n(24).default)(\"1c9d4ce3\",r,!1,{})},function(t,e,n){var r=n(98);\"string\"==typeof r&&(r=[[t.i,r,\"\"]]),r.locals&&(t.exports=r.locals),(0,n(24).default)(\"6a175419\",r,!1,{})},function(t,e,n){var r=n(100);\"string\"==typeof r&&(r=[[t.i,r,\"\"]]),r.locals&&(t.exports=r.locals),(0,n(24).default)(\"07c48036\",r,!1,{})},function(t,e,n){var r=n(102);\"string\"==typeof r&&(r=[[t.i,r,\"\"]]),r.locals&&(t.exports=r.locals),(0,n(24).default)(\"6eff00d0\",r,!1,{})},function(t,e,n){var r=n(39);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(11),i=n(3),o=i[\"__core-js_shared__\"]||(i[\"__core-js_shared__\"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})(\"versions\",[]).push({version:r.version,mode:n(21)?\"pure\":\"global\",copyright:\"© 2018 Denis Pushkarev (zloirock.ru)\"})},function(t,e,n){var r=n(7),i=n(67),o=n(33),a=n(32)(\"IE_PROTO\"),s=function(){},u=function(){var t,e=n(41)(\"iframe\"),r=o.length;for(e.style.display=\"none\",n(69).appendChild(e),e.src=\"javascript:\",(t=e.contentWindow.document).open(),t.write(\"<script>document.F=Object<\\/script>\"),t.close(),u=t.F;r--;)delete u.prototype[o[r]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[a]=t):n=u(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(30)(\"keys\"),i=n(15);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e){t.exports=\"constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf\".split(\",\")},function(t,e,n){var r=n(4).f,i=n(9),o=n(0)(\"toStringTag\");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(48),i=n(33).concat(\"length\",\"prototype\");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},function(t,e,n){var r=n(22),i=n(14),o=n(12),a=n(20),s=n(9),u=n(40),c=Object.getOwnPropertyDescriptor;e.f=n(5)?c:function(t,e){if(t=o(t),e=a(e,!0),u)try{return c(t,e)}catch(t){}if(s(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){\"use strict\";var r=n(3),i=n(9),o=n(19),a=n(85),s=n(20),u=n(1),c=n(36).f,l=n(37).f,f=n(4).f,d=n(87).trim,h=r.Number,p=h,g=h.prototype,v=\"Number\"==o(n(31)(g)),y=\"trim\"in String.prototype,m=function(t){var e=s(t,!1);if(\"string\"==typeof e&&e.length>2){var n,r,i,o=(e=y?e.trim():d(e,3)).charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+e}for(var a,u=e.slice(2),c=0,l=u.length;c<l;c++)if((a=u.charCodeAt(c))<48||a>i)return NaN;return parseInt(u,r)}}return+e};if(!h(\" 0o1\")||!h(\"0b1\")||h(\"+0x1\")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(v?u(function(){g.valueOf.call(n)}):\"Number\"!=o(n))?a(new p(m(e)),n,h):m(e)};for(var b,x=n(5)?c(p):\"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger\".split(\",\"),P=0;x.length>P;P++)i(p,b=x[P])&&!i(h,b)&&f(h,b,l(p,b));h.prototype=g,g.constructor=h,n(10)(r,\"Number\",h)}},function(t,e){t.exports=function(t){if(\"function\"!=typeof t)throw TypeError(t+\" is not a function!\");return t}},function(t,e,n){t.exports=!n(5)&&!n(1)(function(){return 7!=Object.defineProperty(n(41)(\"div\"),\"a\",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),i=n(3).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var r=n(43),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){\"use strict\";var r=n(7);t.exports=function(){var t=r(this),e=\"\";return t.global&&(e+=\"g\"),t.ignoreCase&&(e+=\"i\"),t.multiline&&(e+=\"m\"),t.unicode&&(e+=\"u\"),t.sticky&&(e+=\"y\"),e}},function(t,e,n){\"use strict\";var r=n(46),i=n(64),o=n(18),a=n(12);t.exports=n(65)(Array,\"Array\",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):i(0,\"keys\"==e?n:\"values\"==e?t[n]:[n,t[n]])},\"values\"),o.Arguments=o.Array,r(\"keys\"),r(\"values\"),r(\"entries\")},function(t,e,n){var r=n(0)(\"unscopables\"),i=Array.prototype;void 0==i[r]&&n(6)(i,r,{}),t.exports=function(t){i[r][t]=!0}},function(t,e,n){var r=n(19);t.exports=Object(\"z\").propertyIsEnumerable(0)?Object:function(t){return\"String\"==r(t)?t.split(\"\"):Object(t)}},function(t,e,n){var r=n(9),i=n(12),o=n(49)(!1),a=n(32)(\"IE_PROTO\");t.exports=function(t,e){var n,s=i(t),u=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~o(c,n)||c.push(n));return c}},function(t,e,n){var r=n(12),i=n(42),o=n(68);t.exports=function(t){return function(e,n,a){var s,u=r(e),c=i(u.length),l=o(a,c);if(t&&n!=n){for(;c>l;)if((s=u[l++])!=s)return!0}else for(;c>l;l++)if((t||l in u)&&u[l]===n)return t||l||0;return!t&&-1}}},function(t,e,n){var r=n(3),i=n(11),o=n(21),a=n(51),s=n(4).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});\"_\"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(0)},function(t,e,n){var r=n(2);r(r.S+r.F,\"Object\",{assign:n(96)})},function(t,e,n){t.exports=n(103)},function(t,e,n){\"use strict\";var r=n(29),i=n(2),o=n(16),a=n(55),s=n(56),u=n(42),c=n(57),l=n(58);i(i.S+i.F*!n(60)(function(t){Array.from(t)}),\"Array\",{from:function(t){var e,n,i,f,d=o(t),h=\"function\"==typeof this?this:Array,p=arguments.length,g=p>1?arguments[1]:void 0,v=void 0!==g,y=0,m=l(d);if(v&&(g=r(g,p>2?arguments[2]:void 0,2)),void 0==m||h==Array&&s(m))for(n=new h(e=u(d.length));e>y;y++)c(n,y,v?g(d[y],y):d[y]);else for(f=m.call(d),n=new h;!(i=f.next()).done;y++)c(n,y,v?a(f,g,[i.value,y],!0):i.value);return n.length=y,n}})},function(t,e,n){var r=n(7);t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&r(o.call(t)),e}}},function(t,e,n){var r=n(18),i=n(0)(\"iterator\"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,e,n){\"use strict\";var r=n(4),i=n(14);t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},function(t,e,n){var r=n(59),i=n(0)(\"iterator\"),o=n(18);t.exports=n(11).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t[\"@@iterator\"]||o[r(t)]}},function(t,e,n){var r=n(19),i=n(0)(\"toStringTag\"),o=\"Arguments\"==r(function(){return arguments}());t.exports=function(t){var e,n,a;return void 0===t?\"Undefined\":null===t?\"Null\":\"string\"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:o?r(e):\"Object\"==(a=r(e))&&\"function\"==typeof e.callee?\"Arguments\":a}},function(t,e,n){var r=n(0)(\"iterator\"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var o=[7],a=o[r]();a.next=function(){return{done:n=!0}},o[r]=function(){return a},t(o)}catch(t){}return n}},function(t,e,n){\"use strict\";n(62);var r=n(7),i=n(44),o=n(5),a=/./.toString,s=function(t){n(10)(RegExp.prototype,\"toString\",t,!0)};n(1)(function(){return\"/a/b\"!=a.call({source:\"a\",flags:\"b\"})})?s(function(){var t=r(this);return\"/\".concat(t.source,\"/\",\"flags\"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):\"toString\"!=a.name&&s(function(){return a.call(this)})},function(t,e,n){n(5)&&\"g\"!=/./g.flags&&n(4).f(RegExp.prototype,\"flags\",{configurable:!0,get:n(44)})},function(t,e,n){for(var r=n(45),i=n(13),o=n(10),a=n(3),s=n(6),u=n(18),c=n(0),l=c(\"iterator\"),f=c(\"toStringTag\"),d=u.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(h),g=0;g<p.length;g++){var v,y=p[g],m=h[y],b=a[y],x=b&&b.prototype;if(x&&(x[l]||s(x,l,d),x[f]||s(x,f,y),u[y]=d,m))for(v in r)x[v]||o(x,v,r[v],!0)}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){\"use strict\";var r=n(21),i=n(2),o=n(10),a=n(6),s=n(18),u=n(66),c=n(34),l=n(70),f=n(0)(\"iterator\"),d=!([].keys&&\"next\"in[].keys()),h=function(){return this};t.exports=function(t,e,n,p,g,v,y){u(n,e,p);var m,b,x,P=function(t){if(!d&&t in O)return O[t];switch(t){case\"keys\":case\"values\":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+\" Iterator\",C=\"values\"==g,w=!1,O=t.prototype,T=O[f]||O[\"@@iterator\"]||g&&O[g],_=T||P(g),E=g?C?P(\"entries\"):_:void 0,j=\"Array\"==e&&O.entries||T;if(j&&(x=l(j.call(new t)))!==Object.prototype&&x.next&&(c(x,S,!0),r||\"function\"==typeof x[f]||a(x,f,h)),C&&T&&\"values\"!==T.name&&(w=!0,_=function(){return T.call(this)}),r&&!y||!d&&!w&&O[f]||a(O,f,_),s[e]=_,s[S]=h,g)if(m={values:C?_:P(\"values\"),keys:v?_:P(\"keys\"),entries:E},y)for(b in m)b in O||o(O,b,m[b]);else i(i.P+i.F*(d||w),e,m);return m}},function(t,e,n){\"use strict\";var r=n(31),i=n(14),o=n(34),a={};n(6)(a,n(0)(\"iterator\"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:i(1,n)}),o(t,e+\" Iterator\")}},function(t,e,n){var r=n(4),i=n(7),o=n(13);t.exports=n(5)?Object.defineProperties:function(t,e){i(t);for(var n,a=o(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(43),i=Math.max,o=Math.min;t.exports=function(t,e){return(t=r(t))<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(3).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(9),i=n(16),o=n(32)(\"IE_PROTO\"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:\"function\"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(16),i=n(13);n(72)(\"keys\",function(){return function(t){return i(r(t))}})},function(t,e,n){var r=n(2),i=n(11),o=n(1);t.exports=function(t,e){var n=(i.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*o(function(){n(1)}),\"Object\",a)}},function(t,e,n){n(50)(\"asyncIterator\")},function(t,e,n){\"use strict\";var r=n(3),i=n(9),o=n(5),a=n(2),s=n(10),u=n(75).KEY,c=n(1),l=n(30),f=n(34),d=n(15),h=n(0),p=n(51),g=n(50),v=n(76),y=n(77),m=n(7),b=n(8),x=n(12),P=n(20),S=n(14),C=n(31),w=n(78),O=n(37),T=n(4),_=n(13),E=O.f,j=T.f,A=w.f,M=r.Symbol,N=r.JSON,k=N&&N.stringify,L=h(\"_hidden\"),V=h(\"toPrimitive\"),$={}.propertyIsEnumerable,I=l(\"symbol-registry\"),D=l(\"symbols\"),W=l(\"op-symbols\"),F=Object.prototype,R=\"function\"==typeof M,B=r.QObject,H=!B||!B.prototype||!B.prototype.findChild,z=o&&c(function(){return 7!=C(j({},\"a\",{get:function(){return j(this,\"a\",{value:7}).a}})).a})?function(t,e,n){var r=E(F,e);r&&delete F[e],j(t,e,n),r&&t!==F&&j(F,e,r)}:j,U=function(t){var e=D[t]=C(M.prototype);return e._k=t,e},X=R&&\"symbol\"==typeof M.iterator?function(t){return\"symbol\"==typeof t}:function(t){return t instanceof M},G=function(t,e,n){return t===F&&G(W,e,n),m(t),e=P(e,!0),m(n),i(D,e)?(n.enumerable?(i(t,L)&&t[L][e]&&(t[L][e]=!1),n=C(n,{enumerable:S(0,!1)})):(i(t,L)||j(t,L,S(1,{})),t[L][e]=!0),z(t,e,n)):j(t,e,n)},Y=function(t,e){m(t);for(var n,r=v(e=x(e)),i=0,o=r.length;o>i;)G(t,n=r[i++],e[n]);return t},q=function(t){var e=$.call(this,t=P(t,!0));return!(this===F&&i(D,t)&&!i(W,t))&&(!(e||!i(this,t)||!i(D,t)||i(this,L)&&this[L][t])||e)},J=function(t,e){if(t=x(t),e=P(e,!0),t!==F||!i(D,e)||i(W,e)){var n=E(t,e);return!n||!i(D,e)||i(t,L)&&t[L][e]||(n.enumerable=!0),n}},K=function(t){for(var e,n=A(x(t)),r=[],o=0;n.length>o;)i(D,e=n[o++])||e==L||e==u||r.push(e);return r},Q=function(t){for(var e,n=t===F,r=A(n?W:x(t)),o=[],a=0;r.length>a;)!i(D,e=r[a++])||n&&!i(F,e)||o.push(D[e]);return o};R||(s((M=function(){if(this instanceof M)throw TypeError(\"Symbol is not a constructor!\");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===F&&e.call(W,n),i(this,L)&&i(this[L],t)&&(this[L][t]=!1),z(this,t,S(1,n))};return o&&H&&z(F,t,{configurable:!0,set:e}),U(t)}).prototype,\"toString\",function(){return this._k}),O.f=J,T.f=G,n(36).f=w.f=K,n(22).f=q,n(35).f=Q,o&&!n(21)&&s(F,\"propertyIsEnumerable\",q,!0),p.f=function(t){return U(h(t))}),a(a.G+a.W+a.F*!R,{Symbol:M});for(var Z=\"hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables\".split(\",\"),tt=0;Z.length>tt;)h(Z[tt++]);for(var et=_(h.store),nt=0;et.length>nt;)g(et[nt++]);a(a.S+a.F*!R,\"Symbol\",{for:function(t){return i(I,t+=\"\")?I[t]:I[t]=M(t)},keyFor:function(t){if(!X(t))throw TypeError(t+\" is not a symbol!\");for(var e in I)if(I[e]===t)return e},useSetter:function(){H=!0},useSimple:function(){H=!1}}),a(a.S+a.F*!R,\"Object\",{create:function(t,e){return void 0===e?C(t):Y(C(t),e)},defineProperty:G,defineProperties:Y,getOwnPropertyDescriptor:J,getOwnPropertyNames:K,getOwnPropertySymbols:Q}),N&&a(a.S+a.F*(!R||c(function(){var t=M();return\"[null]\"!=k([t])||\"{}\"!=k({a:t})||\"{}\"!=k(Object(t))})),\"JSON\",{stringify:function(t){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);if(n=e=r[1],(b(e)||void 0!==t)&&!X(t))return y(e)||(e=function(t,e){if(\"function\"==typeof n&&(e=n.call(this,t,e)),!X(e))return e}),r[1]=e,k.apply(N,r)}}),M.prototype[V]||n(6)(M.prototype,V,M.prototype.valueOf),f(M,\"Symbol\"),f(Math,\"Math\",!0),f(r.JSON,\"JSON\",!0)},function(t,e,n){var r=n(15)(\"meta\"),i=n(8),o=n(9),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},c=!n(1)(function(){return u(Object.preventExtensions({}))}),l=function(t){a(t,r,{value:{i:\"O\"+ ++s,w:{}}})},f=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!i(t))return\"symbol\"==typeof t?t:(\"string\"==typeof t?\"S\":\"P\")+t;if(!o(t,r)){if(!u(t))return\"F\";if(!e)return\"E\";l(t)}return t[r].i},getWeak:function(t,e){if(!o(t,r)){if(!u(t))return!0;if(!e)return!1;l(t)}return t[r].w},onFreeze:function(t){return c&&f.NEED&&u(t)&&!o(t,r)&&l(t),t}}},function(t,e,n){var r=n(13),i=n(35),o=n(22);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var a,s=n(t),u=o.f,c=0;s.length>c;)u.call(t,a=s[c++])&&e.push(a);return e}},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return\"Array\"==r(t)}},function(t,e,n){var r=n(12),i=n(36).f,o={}.toString,a=\"object\"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return a&&\"[object Window]\"==o.call(t)?function(t){try{return i(t)}catch(t){return a.slice()}}(t):i(r(t))}},function(t,e,n){var r=n(2);r(r.S,\"Math\",{sign:n(80)})},function(t,e){t.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},function(t,e,n){n(82)(\"match\",1,function(t,e,n){return[function(n){\"use strict\";var r=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,r):new RegExp(n)[e](String(r))},n]})},function(t,e,n){\"use strict\";var r=n(6),i=n(10),o=n(1),a=n(17),s=n(0);t.exports=function(t,e,n){var u=s(t),c=n(a,u,\"\"[t]),l=c[0],f=c[1];o(function(){var e={};return e[u]=function(){return 7},7!=\"\"[t](e)})&&(i(String.prototype,t,l),r(RegExp.prototype,u,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){\"use strict\";var r=n(2),i=n(39),o=n(16),a=n(1),s=[].sort,u=[1,2,3];r(r.P+r.F*(a(function(){u.sort(void 0)})||!a(function(){u.sort(null)})||!n(84)(s)),\"Array\",{sort:function(t){return void 0===t?s.call(o(this)):s.call(o(this),i(t))}})},function(t,e,n){\"use strict\";var r=n(1);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var r=n(8),i=n(86).set;t.exports=function(t,e,n){var o,a=e.constructor;return a!==n&&\"function\"==typeof a&&(o=a.prototype)!==n.prototype&&r(o)&&i&&i(t,o),t}},function(t,e,n){var r=n(8),i=n(7),o=function(t,e){if(i(t),!r(e)&&null!==e)throw TypeError(e+\": can't set as prototype!\")};t.exports={set:Object.setPrototypeOf||(\"__proto__\"in{}?function(t,e,r){try{(r=n(29)(Function.call,n(37).f(Object.prototype,\"__proto__\").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){var r=n(2),i=n(17),o=n(1),a=n(88),s=\"[\"+a+\"]\",u=RegExp(\"^\"+s+s+\"*\"),c=RegExp(s+s+\"*$\"),l=function(t,e,n){var i={},s=o(function(){return!!a[t]()||\"​\"!=\"​\"[t]()}),u=i[t]=s?e(f):a[t];n&&(i[n]=u),r(r.P+r.F*s,\"String\",i)},f=l.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(u,\"\")),2&e&&(t=t.replace(c,\"\")),t};t.exports=l},function(t,e){t.exports=\"\\t\\n\\v\\f\\r   ᠎             　\\u2028\\u2029\\ufeff\"},function(t,e,n){\"use strict\";var r=n(2),i=n(49)(!0);r(r.P,\"Array\",{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),n(46)(\"includes\")},function(t,e,n){\"use strict\";var r=n(2),i=n(91);r(r.P+r.F*n(93)(\"includes\"),\"String\",{includes:function(t){return!!~i(this,t,\"includes\").indexOf(t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var r=n(92),i=n(17);t.exports=function(t,e,n){if(r(e))throw TypeError(\"String#\"+n+\" doesn't accept regex!\");return String(i(t))}},function(t,e,n){var r=n(8),i=n(19),o=n(0)(\"match\");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:\"RegExp\"==i(t))}},function(t,e,n){var r=n(0)(\"match\");t.exports=function(t){var e=/./;try{\"/./\"[t](e)}catch(n){try{return e[r]=!1,!\"/./\"[t](e)}catch(t){}}return!0}},function(t,e,n){\"use strict\";var r=n(25);n.n(r).a},function(t,e,n){(t.exports=n(23)(!1)).push([t.i,'\\n.VueCarousel-navigation-button[data-v-453ad8cd] {\\n  position: absolute;\\n  top: 50%;\\n  box-sizing: border-box;\\n  color: #000;\\n  text-decoration: none;\\n  appearance: none;\\n  border: none;\\n  background-color: transparent;\\n  padding: 0;\\n  cursor: pointer;\\n  outline: none;\\n}\\n.VueCarousel-navigation-button[data-v-453ad8cd]:focus {\\n  outline: 1px solid lightblue;\\n}\\n.VueCarousel-navigation-next[data-v-453ad8cd] {\\n  right: 0;\\n  transform: translateY(-50%) translateX(100%);\\n  font-family: \"system\";\\n}\\n.VueCarousel-navigation-prev[data-v-453ad8cd] {\\n  left: 0;\\n  transform: translateY(-50%) translateX(-100%);\\n  font-family: \"system\";\\n}\\n.VueCarousel-navigation--disabled[data-v-453ad8cd] {\\n  opacity: 0.5;\\n  cursor: default;\\n}\\n\\n/* Define the \"system\" font family */\\n@font-face {\\n  font-family: system;\\n  font-style: normal;\\n  font-weight: 300;\\n  src: local(\".SFNSText-Light\"), local(\".HelveticaNeueDeskInterface-Light\"),\\n    local(\".LucidaGrandeUI\"), local(\"Ubuntu Light\"), local(\"Segoe UI Symbol\"),\\n    local(\"Roboto-Light\"), local(\"DroidSans\"), local(\"Tahoma\");\\n}\\n',\"\"])},function(t,e,n){\"use strict\";var r=n(13),i=n(35),o=n(22),a=n(16),s=n(47),u=Object.assign;t.exports=!u||n(1)(function(){var t={},e={},n=Symbol(),r=\"abcdefghijklmnopqrst\";return t[n]=7,r.split(\"\").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join(\"\")!=r})?function(t,e){for(var n=a(t),u=arguments.length,c=1,l=i.f,f=o.f;u>c;)for(var d,h=s(arguments[c++]),p=l?r(h).concat(l(h)):r(h),g=p.length,v=0;g>v;)f.call(h,d=p[v++])&&(n[d]=h[d]);return n}:u},function(t,e,n){\"use strict\";var r=n(26);n.n(r).a},function(t,e,n){(t.exports=n(23)(!1)).push([t.i,\"\\n.VueCarousel-pagination[data-v-438fd353] {\\n  width: 100%;\\n  text-align: center;\\n}\\n.VueCarousel-pagination--top-overlay[data-v-438fd353] {\\n  position: absolute;\\n  top: 0;\\n}\\n.VueCarousel-pagination--bottom-overlay[data-v-438fd353] {\\n  position: absolute;\\n  bottom: 0;\\n}\\n.VueCarousel-dot-container[data-v-438fd353] {\\n  display: inline-block;\\n  margin: 0 auto;\\n  padding: 0;\\n}\\n.VueCarousel-dot[data-v-438fd353] {\\n  display: inline-block;\\n  cursor: pointer;\\n  appearance: none;\\n  border: none;\\n  background-clip: content-box;\\n  box-sizing: content-box;\\n  padding: 0;\\n  border-radius: 100%;\\n  outline: none;\\n}\\n.VueCarousel-dot[data-v-438fd353]:focus {\\n  outline: 1px solid lightblue;\\n}\\n\",\"\"])},function(t,e,n){\"use strict\";var r=n(27);n.n(r).a},function(t,e,n){(t.exports=n(23)(!1)).push([t.i,\"\\n.VueCarousel-slide {\\n  flex-basis: inherit;\\n  flex-grow: 0;\\n  flex-shrink: 0;\\n  user-select: none;\\n  backface-visibility: hidden;\\n  -webkit-touch-callout: none;\\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\\n  outline: none;\\n}\\n.VueCarousel-slide-adjustableHeight {\\n  display: table;\\n  flex-basis: auto;\\n  width: 100%;\\n}\\n\",\"\"])},function(t,e,n){\"use strict\";var r=n(28);n.n(r).a},function(t,e,n){(t.exports=n(23)(!1)).push([t.i,\"\\n.VueCarousel {\\n  display: flex;\\n  flex-direction: column;\\n  position: relative;\\n}\\n.VueCarousel--reverse {\\n  flex-direction: column-reverse;\\n}\\n.VueCarousel-wrapper {\\n  width: 100%;\\n  position: relative;\\n  overflow: hidden;\\n}\\n.VueCarousel-inner {\\n  display: flex;\\n  flex-direction: row;\\n  backface-visibility: hidden;\\n}\\n.VueCarousel-inner--center {\\n  justify-content: center;\\n}\\n\",\"\"])},function(t,e,n){\"use strict\";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"VueCarousel\",class:{\"VueCarousel--reverse\":\"top\"===t.paginationPosition}},[n(\"div\",{ref:\"VueCarousel-wrapper\",staticClass:\"VueCarousel-wrapper\"},[n(\"div\",{ref:\"VueCarousel-inner\",class:[\"VueCarousel-inner\",{\"VueCarousel-inner--center\":t.isCenterModeEnabled}],style:{transform:\"translate(\"+t.currentOffset+\"px, 0)\",transition:t.dragging?\"none\":t.transitionStyle,\"ms-flex-preferred-size\":t.slideWidth+\"px\",\"webkit-flex-basis\":t.slideWidth+\"px\",\"flex-basis\":t.slideWidth+\"px\",visibility:t.slideWidth?\"visible\":\"hidden\",height:\"\"+t.currentHeight,\"padding-left\":t.padding+\"px\",\"padding-right\":t.padding+\"px\"}},[t._t(\"default\")],2)]),t._v(\" \"),t.navigationEnabled?t._t(\"navigation\",[t.isNavigationRequired?n(\"navigation\",{attrs:{clickTargetSize:t.navigationClickTargetSize,nextLabel:t.navigationNextLabel,prevLabel:t.navigationPrevLabel},on:{navigationclick:t.handleNavigation}}):t._e()]):t._e(),t._v(\" \"),t.paginationEnabled?t._t(\"pagination\",[n(\"pagination\",{on:{paginationclick:function(e){t.goToPage(e,\"pagination\")}}})]):t._e()],2)};r._withStripped=!0,n(54),n(61),n(63),n(45),n(71),n(73),n(74),n(79),n(81),n(83),n(38),n(89),n(90);var i={props:{autoplay:{type:Boolean,default:!1},autoplayTimeout:{type:Number,default:2e3},autoplayHoverPause:{type:Boolean,default:!0},autoplayDirection:{type:String,default:\"forward\"}},data:function(){return{autoplayInterval:null}},destroyed:function(){this.$isServer||(this.$el.removeEventListener(\"mouseenter\",this.pauseAutoplay),this.$el.removeEventListener(\"mouseleave\",this.startAutoplay))},methods:{pauseAutoplay:function(){this.autoplayInterval&&(this.autoplayInterval=clearInterval(this.autoplayInterval))},startAutoplay:function(){this.autoplay&&(this.autoplayInterval=setInterval(this.autoplayAdvancePage,this.autoplayTimeout))},restartAutoplay:function(){this.pauseAutoplay(),this.startAutoplay()},autoplayAdvancePage:function(){this.advancePage(this.autoplayDirection)}},mounted:function(){!this.$isServer&&this.autoplayHoverPause&&(this.$el.addEventListener(\"mouseenter\",this.pauseAutoplay),this.$el.addEventListener(\"mouseleave\",this.startAutoplay)),this.startAutoplay()}},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"VueCarousel-navigation\"},[n(\"button\",{staticClass:\"VueCarousel-navigation-button VueCarousel-navigation-prev\",class:{\"VueCarousel-navigation--disabled\":!t.canAdvanceBackward},style:\"padding: \"+t.clickTargetSize+\"px; margin-right: -\"+t.clickTargetSize+\"px;\",attrs:{type:\"button\",\"aria-label\":\"Previous page\",tabindex:t.canAdvanceBackward?0:-1},domProps:{innerHTML:t._s(t.prevLabel)},on:{click:function(e){e.preventDefault(),t.triggerPageAdvance(\"backward\")}}}),t._v(\" \"),n(\"button\",{staticClass:\"VueCarousel-navigation-button VueCarousel-navigation-next\",class:{\"VueCarousel-navigation--disabled\":!t.canAdvanceForward},style:\"padding: \"+t.clickTargetSize+\"px; margin-left: -\"+t.clickTargetSize+\"px;\",attrs:{type:\"button\",\"aria-label\":\"Next page\",tabindex:t.canAdvanceForward?0:-1},domProps:{innerHTML:t._s(t.nextLabel)},on:{click:function(e){e.preventDefault(),t.triggerPageAdvance(\"forward\")}}})])};o._withStripped=!0;var a={name:\"navigation\",inject:[\"carousel\"],props:{clickTargetSize:{type:Number,default:8},nextLabel:{type:String,default:\"&#9654\"},prevLabel:{type:String,default:\"&#9664\"}},computed:{canAdvanceForward:function(){return this.carousel.canAdvanceForward||!1},canAdvanceBackward:function(){return this.carousel.canAdvanceBackward||!1}},methods:{triggerPageAdvance:function(t){this.$emit(\"navigationclick\",t)}}};function s(t,e,n,r,i,o,a,s){var u,c=\"function\"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId=\"data-v-\"+o),a?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||\"undefined\"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:c}}n(94);var u=s(a,o,[],!1,null,\"453ad8cd\",null);u.options.__file=\"src/Navigation.vue\";var c=u.exports,l=function(){var t,e=this,n=e.$createElement,r=e._self._c||n;return r(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.carousel.pageCount>1,expression:\"carousel.pageCount > 1\"}],staticClass:\"VueCarousel-pagination\",class:(t={},t[\"VueCarousel-pagination--\"+e.paginationPositionModifierName]=e.paginationPositionModifierName,t)},[r(\"div\",{staticClass:\"VueCarousel-dot-container\",style:e.dotContainerStyle,attrs:{role:\"tablist\"}},e._l(e.paginationCount,function(t,n){return r(\"button\",{key:t+\"_\"+n,staticClass:\"VueCarousel-dot\",class:{\"VueCarousel-dot--active\":e.isCurrentDot(n)},style:e.dotStyle(n),attrs:{\"aria-hidden\":\"false\",role:\"tab\",title:e.getDotTitle(n),value:e.getDotTitle(n),\"aria-label\":e.getDotTitle(n),\"aria-selected\":e.isCurrentDot(n)?\"true\":\"false\"},on:{click:function(t){e.goToPage(n)}}})}))])};l._withStripped=!0,n(52);var f={name:\"pagination\",inject:[\"carousel\"],computed:{paginationPositionModifierName:function(){var t=this.carousel.paginationPosition;if(!(t.indexOf(\"overlay\")<0))return t},paginationPropertyBasedOnPosition:function(){return this.carousel.paginationPosition.indexOf(\"top\")>=0?\"bottom\":\"top\"},paginationCount:function(){return this.carousel&&this.carousel.scrollPerPage?this.carousel.pageCount:this.carousel.slideCount||0},dotContainerStyle:function(){var t=this.carousel;if(-1===t.maxPaginationDotCount)return{\"margin-top\":\"\".concat(2*t.paginationPadding,\"px\")};var e=2*t.paginationPadding,n=t.maxPaginationDotCount*(t.paginationSize+e);return{\"margin-top\":\"\".concat(2*t.paginationPadding,\"px\"),overflow:\"hidden\",width:\"\".concat(n,\"px\"),margin:\"0 auto\",\"white-space\":\"nowrap\"}}},methods:{goToPage:function(t){this.$emit(\"paginationclick\",t)},isCurrentDot:function(t){return t===this.carousel.currentPage},getDotTitle:function(t){return this.carousel.$children[t].title?this.carousel.$children[t].title:\"Item \".concat(t)},dotStyle:function(t){var e=this.carousel,n={};if(n[\"margin-\".concat(this.paginationPropertyBasedOnPosition)]=\"\".concat(2*e.paginationPadding,\"px\"),Object.assign(n,{padding:\"\".concat(e.paginationPadding,\"px\"),width:\"\".concat(e.paginationSize,\"px\"),height:\"\".concat(e.paginationSize,\"px\"),\"background-color\":\"\".concat(this.isCurrentDot(t)?e.paginationActiveColor:e.paginationColor)}),-1===e.maxPaginationDotCount)return n;var r=e.paginationSize+2*e.paginationPadding,i=e.pageCount-e.maxPaginationDotCount,o=0-r*(e.currentPage>i?i:e.currentPage<=e.maxPaginationDotCount/2?0:e.currentPage-Math.ceil(e.maxPaginationDotCount/2)+1);return Object.assign(n,{\"-webkit-transform\":\"translate3d(\".concat(o,\"px,0,0)\"),transform:\"translate3d(\".concat(o,\"px,0,0)\"),\"-webkit-transition\":\"-webkit-transform \".concat(e.speed/1e3,\"s\"),transition:\"transform \".concat(e.speed/1e3,\"s\")})}}},d=(n(97),s(f,l,[],!1,null,\"438fd353\",null));d.options.__file=\"src/Pagination.vue\";var h=d.exports,p=function(){var t=this.$createElement;return(this._self._c||t)(\"div\",{staticClass:\"VueCarousel-slide\",class:{\"VueCarousel-slide-active\":this.isActive,\"VueCarousel-slide-center\":this.isCenter,\"VueCarousel-slide-adjustableHeight\":this.isAdjustableHeight},attrs:{tabindex:\"-1\",\"aria-hidden\":!this.isActive,role:\"tabpanel\"}},[this._t(\"default\")],2)};p._withStripped=!0;var g={name:\"slide\",props:[\"title\"],data:function(){return{width:null}},inject:[\"carousel\"],mounted:function(){this.$isServer||this.$el.addEventListener(\"dragstart\",function(t){return t.preventDefault()}),this.$el.addEventListener(this.carousel.isTouch?\"touchend\":\"mouseup\",this.onTouchEnd)},computed:{activeSlides:function(){for(var t=this.carousel,e=t.currentPage,n=t.breakpointSlidesPerPage,r=[],i=t.$children.filter(function(t){return t.$el&&t.$el.className.indexOf(\"VueCarousel-slide\")>=0}).map(function(t){return t._uid}),o=0;o<n;){var a=i[e*n+o];r.push(a),o++}return r},isActive:function(){return this.activeSlides.indexOf(this._uid)>=0},isCenter:function(){var t=this.carousel.breakpointSlidesPerPage;return!(t%2==0||!this.isActive)&&this.activeSlides.indexOf(this._uid)===Math.floor(t/2)},isAdjustableHeight:function(){return this.carousel.adjustableHeight}},methods:{onTouchEnd:function(t){var e=this.carousel.isTouch&&t.changedTouches&&t.changedTouches.length>0?t.changedTouches[0].clientX:t.clientX,n=this.carousel.dragStartX-e;(0===this.carousel.minSwipeDistance||Math.abs(n)<this.carousel.minSwipeDistance)&&(this.$emit(\"slideclick\",Object.assign({},t.currentTarget.dataset)),this.$emit(\"slide-click\",Object.assign({},t.currentTarget.dataset)))}}},v=(n(99),s(g,p,[],!1,null,null,null));v.options.__file=\"src/Slide.vue\";var y=v.exports;function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function b(t){return(b=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t})(t)}var x={onwebkittransitionend:\"webkitTransitionEnd\",onmoztransitionend:\"transitionend\",onotransitionend:\"oTransitionEnd otransitionend\",ontransitionend:\"transitionend\"},P=function(){for(var t in x)if(t in window)return x[t]},S={name:\"carousel\",beforeUpdate:function(){this.computeCarouselWidth()},components:{Navigation:c,Pagination:h,Slide:y},data:function(){return{browserWidth:null,carouselWidth:0,currentPage:0,dragging:!1,dragMomentum:0,dragOffset:0,dragStartY:0,dragStartX:0,isTouch:\"undefined\"!=typeof window&&\"ontouchstart\"in window,offset:0,refreshRate:16,slideCount:0,transitionstart:\"transitionstart\",transitionend:\"transitionend\",currentHeight:\"auto\"}},mixins:[i],provide:function(){return{carousel:this}},props:{adjustableHeight:{type:Boolean,default:!1},adjustableHeightEasing:{type:String},centerMode:{type:Boolean,default:!1},easing:{type:String,validator:function(t){return-1!==[\"ease\",\"linear\",\"ease-in\",\"ease-out\",\"ease-in-out\"].indexOf(t)||t.includes(\"cubic-bezier\")},default:\"ease\"},loop:{type:Boolean,default:!1},minSwipeDistance:{type:Number,default:8},mouseDrag:{type:Boolean,default:!0},touchDrag:{type:Boolean,default:!0},navigateTo:{type:[Number,Array],default:0},navigationClickTargetSize:{type:Number,default:8},navigationEnabled:{type:Boolean,default:!1},navigationNextLabel:{type:String,default:\"&#9654\"},navigationPrevLabel:{type:String,default:\"&#9664\"},paginationActiveColor:{type:String,default:\"#000000\"},paginationColor:{type:String,default:\"#efefef\"},paginationEnabled:{type:Boolean,default:!0},paginationPadding:{type:Number,default:10},paginationPosition:{type:String,default:\"bottom\"},paginationSize:{type:Number,default:10},perPage:{type:Number,default:2},perPageCustom:{type:Array},resistanceCoef:{type:Number,default:20},scrollPerPage:{type:Boolean,default:!0},spacePadding:{type:Number,default:0},spacePaddingMaxOffsetFactor:{type:Number,default:0},speed:{type:Number,default:500},tagName:{type:String,default:\"slide\"},value:{type:Number},maxPaginationDotCount:{type:Number,default:-1},rtl:{type:Boolean,default:!1}},watch:{value:function(t){t!==this.currentPage&&(this.goToPage(t),this.render())},navigateTo:{immediate:!0,handler:function(t){var e=this;\"object\"===b(t)?(0==t[1]&&(this.dragging=!0,setTimeout(function(){e.dragging=!1},this.refreshRate)),this.$nextTick(function(){e.goToPage(t[0])})):this.$nextTick(function(){e.goToPage(t)})}},currentPage:function(t){this.$emit(\"pageChange\",t),this.$emit(\"page-change\",t),this.$emit(\"input\",t)},autoplay:function(t){!1===t?this.pauseAutoplay():this.restartAutoplay()}},computed:{breakpointSlidesPerPage:function(){if(!this.perPageCustom)return this.perPage;var t=this.perPageCustom,e=this.browserWidth,n=t.sort(function(t,e){return t[0]>e[0]?-1:1}).filter(function(t){return e>=t[0]});return n[0]&&n[0][1]||this.perPage},canAdvanceForward:function(){return this.loop||this.offset<this.maxOffset},canAdvanceBackward:function(){return this.loop||this.currentPage>0},currentPerPage:function(){return!this.perPageCustom||this.$isServer?this.perPage:this.breakpointSlidesPerPage},currentOffset:function(){return this.isCenterModeEnabled?0:this.rtl?1*(this.offset-this.dragOffset):-1*(this.offset+this.dragOffset)},isHidden:function(){return this.carouselWidth<=0},maxOffset:function(){return Math.max(this.slideWidth*(this.slideCount-this.currentPerPage)-this.spacePadding*this.spacePaddingMaxOffsetFactor,0)},pageCount:function(){return this.scrollPerPage?Math.ceil(this.slideCount/this.currentPerPage):this.slideCount-this.currentPerPage+1},slideWidth:function(){return(this.carouselWidth-2*this.spacePadding)/this.currentPerPage},isNavigationRequired:function(){return this.slideCount>this.currentPerPage},isCenterModeEnabled:function(){return this.centerMode&&!this.isNavigationRequired},transitionStyle:function(){var t=\"\".concat(this.speed/1e3,\"s\"),e=\"\".concat(t,\" \").concat(this.easing,\" transform\");return this.adjustableHeight?\"\".concat(e,\", height \").concat(t,\" \").concat(this.adjustableHeightEasing||this.easing):e},padding:function(){var t=this.spacePadding;return t>0&&t}},methods:{getNextPage:function(){return this.currentPage<this.pageCount-1?this.currentPage+1:this.loop?0:this.currentPage},getPreviousPage:function(){return this.currentPage>0?this.currentPage-1:this.loop?this.pageCount-1:this.currentPage},advancePage:function(t){t&&\"backward\"===t&&this.canAdvanceBackward?this.goToPage(this.getPreviousPage(),\"navigation\"):(!t||t&&\"backward\"!==t)&&this.canAdvanceForward&&this.goToPage(this.getNextPage(),\"navigation\")},goToLastSlide:function(){var t=this;this.dragging=!0,setTimeout(function(){t.dragging=!1},this.refreshRate),this.$nextTick(function(){t.goToPage(t.pageCount)})},attachMutationObserver:function(){var t=this,e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(e){var n={attributes:!0,data:!0};if(this.adjustableHeight&&(n=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);\"function\"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){m(t,e,n[e])})}return t}({},n,{childList:!0,subtree:!0,characterData:!0})),this.mutationObserver=new e(function(){t.$nextTick(function(){t.computeCarouselWidth(),t.computeCarouselHeight()})}),this.$parent.$el)for(var r=this.$el.getElementsByClassName(\"VueCarousel-inner\"),i=0;i<r.length;i++)this.mutationObserver.observe(r[i],n)}},handleNavigation:function(t){this.advancePage(t),this.pauseAutoplay(),this.$emit(\"navigation-click\",t)},detachMutationObserver:function(){this.mutationObserver&&this.mutationObserver.disconnect()},getBrowserWidth:function(){return this.browserWidth=window.innerWidth,this.browserWidth},getCarouselWidth:function(){for(var t=this.$el.getElementsByClassName(\"VueCarousel-inner\"),e=0;e<t.length;e++)t[e].clientWidth>0&&(this.carouselWidth=t[e].clientWidth||0);return this.carouselWidth},getCarouselHeight:function(){var t=this;if(!this.adjustableHeight)return\"auto\";var e=this.currentPerPage*(this.currentPage+1)-1,n=function(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||\"[object Arguments]\"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}()}(Array(this.currentPerPage)).map(function(n,r){return t.getSlide(e+r)}).reduce(function(t,e){return Math.max(t,e&&e.$el.clientHeight||0)},0);return this.currentHeight=0===n?\"auto\":\"\".concat(n,\"px\"),this.currentHeight},getSlideCount:function(){var t=this;this.slideCount=this.$slots&&this.$slots.default&&this.$slots.default.filter(function(e){return e.tag&&null!==e.tag.match(\"^vue-component-\\\\d+-\".concat(t.tagName,\"$\"))}).length||0},getSlide:function(t){var e=this;return this.$children.filter(function(t){return null!==t.$vnode.tag.match(\"^vue-component-\\\\d+-\".concat(e.tagName,\"$\"))})[t]},goToPage:function(t,e){t>=0&&t<=this.pageCount&&(this.offset=this.scrollPerPage?Math.min(this.slideWidth*this.currentPerPage*t,this.maxOffset):this.slideWidth*t,this.autoplay&&!this.autoplayHoverPause&&this.restartAutoplay(),this.currentPage=t,\"pagination\"===e&&(this.pauseAutoplay(),this.$emit(\"pagination-click\",t)))},onStart:function(t){2!=t.button&&(document.addEventListener(this.isTouch?\"touchend\":\"mouseup\",this.onEnd,!0),document.addEventListener(this.isTouch?\"touchmove\":\"mousemove\",this.onDrag,!0),this.startTime=t.timeStamp,this.dragging=!0,this.dragStartX=this.isTouch?t.touches[0].clientX:t.clientX,this.dragStartY=this.isTouch?t.touches[0].clientY:t.clientY)},onEnd:function(t){this.autoplay&&!this.autoplayHoverPause&&this.restartAutoplay(),this.pauseAutoplay();var e=this.isTouch?t.changedTouches[0].clientX:t.clientX,n=this.dragStartX-e;if(this.dragMomentum=n/(t.timeStamp-this.startTime),0!==this.minSwipeDistance&&Math.abs(n)>=this.minSwipeDistance){var r=this.scrollPerPage?this.slideWidth*this.currentPerPage:this.slideWidth;this.dragOffset=this.dragOffset+Math.sign(n)*(r/2)}this.rtl?this.offset-=this.dragOffset:this.offset+=this.dragOffset,this.dragOffset=0,this.dragging=!1,this.render(),document.removeEventListener(this.isTouch?\"touchend\":\"mouseup\",this.onEnd,!0),document.removeEventListener(this.isTouch?\"touchmove\":\"mousemove\",this.onDrag,!0)},onDrag:function(t){var e=this.isTouch?t.touches[0].clientX:t.clientX,n=this.isTouch?t.touches[0].clientY:t.clientY,r=this.dragStartX-e,i=this.dragStartY-n;if(!(this.isTouch&&Math.abs(r)<Math.abs(i))){t.stopImmediatePropagation(),this.dragOffset=r;var o=this.offset+this.dragOffset;this.rtl?0==this.offset&&this.dragOffset>0?this.dragOffset=Math.sqrt(this.resistanceCoef*this.dragOffset):this.offset==this.maxOffset&&this.dragOffset<0&&(this.dragOffset=-Math.sqrt(-this.resistanceCoef*this.dragOffset)):o<0?this.dragOffset=-Math.sqrt(-this.resistanceCoef*this.dragOffset):o>this.maxOffset&&(this.dragOffset=Math.sqrt(this.resistanceCoef*this.dragOffset))}},onResize:function(){var t=this;this.computeCarouselWidth(),this.computeCarouselHeight(),this.dragging=!0,this.render(),setTimeout(function(){t.dragging=!1},this.refreshRate)},render:function(){this.rtl?this.offset-=Math.max(1-this.currentPerPage,Math.min(Math.round(this.dragMomentum),this.currentPerPage-1))*this.slideWidth:this.offset+=Math.max(1-this.currentPerPage,Math.min(Math.round(this.dragMomentum),this.currentPerPage-1))*this.slideWidth;var t=this.scrollPerPage?this.slideWidth*this.currentPerPage:this.slideWidth,e=t*Math.floor(this.slideCount/(this.currentPerPage-1)),n=e+this.slideWidth*(this.slideCount%this.currentPerPage);this.offset>(e+n)/2?this.offset=n:this.offset=t*Math.round(this.offset/t),this.offset=Math.max(0,Math.min(this.offset,this.maxOffset)),this.currentPage=this.scrollPerPage?Math.round(this.offset/this.slideWidth/this.currentPerPage):Math.round(this.offset/this.slideWidth)},computeCarouselWidth:function(){this.getSlideCount(),this.getBrowserWidth(),this.getCarouselWidth(),this.setCurrentPageInBounds()},computeCarouselHeight:function(){this.getCarouselHeight()},setCurrentPageInBounds:function(){if(!this.canAdvanceForward&&this.scrollPerPage){var t=this.pageCount-1;this.currentPage=t>=0?t:0,this.offset=Math.max(0,Math.min(this.offset,this.maxOffset))}},handleTransitionStart:function(){this.$emit(\"transitionStart\"),this.$emit(\"transition-start\")},handleTransitionEnd:function(){this.$emit(\"transitionEnd\"),this.$emit(\"transition-end\")}},mounted:function(){window.addEventListener(\"resize\",function(t,e,n){var r;return function(){var i=n&&!r;clearTimeout(r),r=setTimeout(function(){r=null,n||t.apply(void 0)},e),i&&t.apply(void 0)}}(this.onResize,this.refreshRate)),(this.isTouch&&this.touchDrag||this.mouseDrag)&&this.$refs[\"VueCarousel-wrapper\"].addEventListener(this.isTouch?\"touchstart\":\"mousedown\",this.onStart),this.attachMutationObserver(),this.computeCarouselWidth(),this.computeCarouselHeight(),this.transitionstart=P(),this.$refs[\"VueCarousel-inner\"].addEventListener(this.transitionstart,this.handleTransitionStart),this.transitionend=P(),this.$refs[\"VueCarousel-inner\"].addEventListener(this.transitionend,this.handleTransitionEnd),this.$emit(\"mounted\"),\"backward\"===this.autoplayDirection&&this.goToLastSlide()},beforeDestroy:function(){this.detachMutationObserver(),window.removeEventListener(\"resize\",this.getBrowserWidth),this.$refs[\"VueCarousel-inner\"].removeEventListener(this.transitionstart,this.handleTransitionStart),this.$refs[\"VueCarousel-inner\"].removeEventListener(this.transitionend,this.handleTransitionEnd),this.$refs[\"VueCarousel-wrapper\"].removeEventListener(this.isTouch?\"touchstart\":\"mousedown\",this.onStart)}},C=(n(101),s(S,r,[],!1,null,null,null));C.options.__file=\"src/Carousel.vue\";var w=C.exports;n.d(e,\"Carousel\",function(){return w}),n.d(e,\"Slide\",function(){return y}),e.default={install:function(t){t.component(\"carousel\",w),t.component(\"slide\",y)}}}])});\n\n//# sourceURL=webpack:///./node_modules/vue-carousel/dist/vue-carousel.min.js?");


/***/ }),

/***/ "0557":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6293e3d8_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1215");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6293e3d8_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6293e3d8_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6293e3d8_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6293e3d8_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "0d65":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("6ca2");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("cb1151d4", content, shadowRoot)
};

/***/ }),

/***/ "1215":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("6f52");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("9f0e0ae6", content, shadowRoot)
};

/***/ }),

/***/ "1433":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/request.aae215da.png";

/***/ }),

/***/ "17bb":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("01cf");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("d0967478", content, shadowRoot)
};

/***/ }),

/***/ "26c9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/message/index.vue?vue&type=template&id=be4c3910&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "eventsMessage"
  }, [!_vm.preview && _vm.content.msgtype !== 'm.notice' ? _c('div', {
    directives: [{
      name: "touch",
      rawName: "v-touch:touchhold",
      value: _vm.dropDownMenuShow,
      expression: "dropDownMenuShow",
      arg: "touchhold"
    }],
    class: {
      showmeta: _vm.showmeta,
      my: _vm.my,
      messageRow: 'messageRow',
      urlpreview: _vm.urlpreview,
      allscreen: _vm.urlpreview || _vm.content.msgtype === 'm.image' || _vm.file,
      aligncenter: _vm.content.msgtype === 'm.audio'
    },
    attrs: {
      "my": !_vm.streamMode && _vm.my
    }
  }, [_vm.urlpreview || _vm.imageUrl || _vm.content.msgtype === 'm.image' || _vm.showmeta && _vm.my || _vm.file || _vm.content.call_id ? _c('div', {
    staticClass: "timeWrapper"
  }, [!_vm.streamMode && _vm.showburn ? _c('i', {
    class: 'fas fa-fire burn ' + _vm.showburn,
    on: {
      "click": _vm.showwhenburn
    }
  }) : _c('span', [_vm._v(" " + _vm._s(_vm.format_date(_vm.origin.localTimestamp) || "Now") + " ")])]) : _vm._e(), _vm.isMenuAllowed ? _c('div', {
    staticClass: "actionsWrapper"
  }, [!_vm.streamMode && _vm.multiSelect ? _c('div', {
    staticClass: "multiSelect",
    on: {
      "click": function ($event) {
        return _vm.eventMessage(_vm.selectedMessage);
      }
    }
  }, [_vm.selectedMessage ? _c('i', {
    staticClass: "far fa-check-circle"
  }) : _c('i', {
    staticClass: "far fa-circle"
  })]) : _c('i', {
    staticClass: "fas fa-ellipsis-h setmenu",
    on: {
      "click": _vm.setmenu
    }
  })]) : _vm._e(), _vm.streamMode || !_vm.my || _vm.showmyicon ? _c('div', {
    staticClass: "iconWrapper",
    on: {
      "click": function ($event) {
        return _vm.core.mtrx.opencontact(_vm.userinfo);
      }
    }
  }, [_c('userpic', {
    attrs: {
      "userinfo": _vm.userinfo
    }
  })], 1) : _vm._e(), _vm.content.msgtype === 'm.image' ? _c('div', {
    staticClass: "messageImg"
  }, [_vm.reference && !_vm.preview && !_vm.fromreference ? _c('div', {
    staticClass: "reference showreference",
    on: {
      "click": _vm.showreference
    }
  }, [_c('eventsEvent', {
    attrs: {
      "event": _vm.reference,
      "chat": _vm.chat,
      "preview": true
    }
  }), _vm._m(0)], 1) : _vm._e(), _vm.imageUrl ? _c('div', {}, [_vm.encryptedData ? _c('div', {
    staticClass: "encryptedDataIcon"
  }, [_c('i', {
    staticClass: "fas fa-lock"
  })]) : _vm._e(), _c('div', {
    staticClass: "imgMsg"
  }, [_c('div', {
    staticClass: "showImage",
    style: _vm.imagePaddingStyle(_vm.content),
    on: {
      "click": function ($event) {
        return _vm.openImageGallery(_vm.origin);
      }
    }
  }, [_c('div', {
    staticClass: "abswrapper"
  }, [_c('img', {
    directives: [{
      name: "images-loaded",
      rawName: "v-images-loaded:on.loaded",
      value: _vm.imagesLoaded,
      expression: "imagesLoaded",
      arg: "on",
      modifiers: {
        "loaded": true
      }
    }],
    attrs: {
      "src": _vm.imageUrl,
      "alt": ""
    }
  })])])])]) : _c('div', {
    staticClass: "preloaderImage",
    style: _vm.imagePaddingStyle(_vm.content)
  }, [_c('div', {
    staticClass: "abswrapper"
  }, [_c('linepreloader')], 1)])]) : _vm._e(), _vm.content.msgtype === 'm.audio' ? _c('div', {
    staticClass: "messageAudio"
  }, [_vm.reference && !_vm.preview && !_vm.fromreference ? _c('div', {
    staticClass: "reference showreference",
    on: {
      "click": _vm.showreference
    }
  }, [_c('eventsEvent', {
    attrs: {
      "event": _vm.reference,
      "chat": _vm.chat,
      "preview": true
    }
  }), _vm._m(1)], 1) : _vm._e(), _vm.audioUrl ? _c('VoiceMessage', {
    attrs: {
      "audioBuffer": _vm.audioUrl,
      "decryptedInfo": _vm.decryptedInfo,
      "id": _vm.event.localTimestamp || Date.now()
    }
  }) : _vm._e()], 1) : _vm._e(), _vm.content.call_id ? _c('div', {
    staticClass: "messageCall"
  }, [_c('Call', {
    class: {
      my: _vm.my
    },
    attrs: {
      "my": _vm.my,
      "event": _vm.event
    }
  })], 1) : _vm._e(), _vm.event.event.type === 'm.room.request_calls_access' ? _c('Request', {
    attrs: {
      "event": _vm.event
    }
  }) : _vm._e(), _vm.content.msgtype === 'm.encrypted' && !_vm.textWithoutLinks && _vm.badenctypted ? _c('div', {
    staticClass: "maxcontent",
    class: {
      my: _vm.my
    }
  }, [_c('div', {
    staticClass: "badenctyptedText"
  }, [_c('span', [_vm._v(_vm._s(_vm.$t("caption.unabletoDecrypt")))]), _c('i', {
    staticClass: "fas fa-undo decryptagain",
    on: {
      "click": _vm.decryptagain
    }
  })])]) : _vm._e(), this.streamMode || (_vm.content.msgtype === 'm.text' || _vm.content.msgtype === 'm.encrypted') && _vm.textWithoutLinks ? _c('div', {
    staticClass: "maxcontent",
    class: {
      my: _vm.my
    }
  }, [_c('div', {
    staticClass: "messageText",
    class: _vm.donationColor
  }, [_vm.edited ? _c('div', {
    staticClass: "edited"
  }, [_c('i', {
    staticClass: "fas fa-pen"
  }), _vm._v(" " + _vm._s(_vm.$t("caption.edited")) + " ")]) : _vm._e(), _c('IncomingMessage', {
    attrs: {
      "message": _vm.textWithoutLinks,
      "marked-text": _vm.markedText
    }
  }), !_vm.content.from && !_vm.my && _vm.showmeta || _vm.showmyicon && !_vm.my ? _c('div', {
    staticClass: "sendername"
  }, [_c('span', {
    staticClass: "b"
  }, [_vm._v(_vm._s(_vm.userinfo.name))]), _vm._v(" · "), _c('span', [_vm._v(" " + _vm._s(_vm.format_date(_vm.origin.localTimestamp) || "Now") + " ")])]) : _vm._e(), _vm.reference && !_vm.preview && !_vm.fromreference ? _c('div', {
    staticClass: "reference showreference",
    on: {
      "click": _vm.showreference
    }
  }, [_c('eventsEvent', {
    attrs: {
      "event": _vm.reference,
      "chat": _vm.chat,
      "preview": true
    }
  }), _vm._m(2)], 1) : _vm._e(), _vm.content.from ? _c('div', {
    staticClass: "from"
  }, [_c('div', {
    staticClass: "fromCaption"
  }, [_c('i', {
    staticClass: "fas fa-share-alt"
  }), _c('span', [_vm._v(_vm._s(_vm.userinfo.name) + ": " + _vm._s(_vm.$t("caption.messagefrom").toLowerCase()))])])]) : _vm._e(), _vm.streamMode && _vm.content.url && _vm.urlpreview ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.pkoindisabled,
      expression: "!pkoindisabled"
    }],
    staticClass: "linkPreview"
  }, [!_vm.sending ? [!_vm.origin.localRedactionEvent() && !_vm.origin.getRedactionEvent() ? _c('url', {
    attrs: {
      "url": _vm.urlpreview,
      "urllink": _vm.urlpreview,
      "preview": true
    },
    on: {
      "updatedSize": _vm.updatedSize,
      "loaded": _vm.urlloaded,
      "error": _vm.urlerror
    }
  }) : _vm._e()] : _c('div', [_c('linepreloader')], 1)], 2) : _vm._e()], 1)]) : _vm._e(), _vm.file ? _c('div', {
    staticClass: "filePreview"
  }, [_c('fileMessage', {
    attrs: {
      "encryptedData": _vm.encryptedData,
      "file": _vm.file,
      "downloaded": _vm.downloaded
    },
    on: {
      "download": _vm.download
    }
  }), _vm.encryptedData ? _c('div', {
    staticClass: "encryptedDataIcon"
  }, [_c('i', {
    staticClass: "fas fa-lock"
  })]) : _vm._e(), _vm.error ? _c('div', {
    staticClass: "badencrypted"
  }, [_c('span', [_vm._v(_vm._s(_vm.$t("caption.unabletoDecrypt")))])]) : _vm._e()], 1) : _vm._e(), !_vm.streamMode && _vm.urlpreview ? _c('div', {
    staticClass: "linkPreview"
  }, [!_vm.sending ? [!_vm.origin.localRedactionEvent() && !_vm.origin.getRedactionEvent() ? _c('url', {
    attrs: {
      "url": _vm.urlpreview,
      "urllink": _vm.urlpreview,
      "preview": true
    },
    on: {
      "updatedSize": _vm.updatedSize,
      "error": _vm.urlerror
    }
  }) : _vm._e()] : _c('div', [_c('linepreloader')], 1)], 2) : _vm._e(), (_vm.content.from || _vm.imageFrom) && (_vm.file || _vm.content.msgtype === 'm.image' && _vm.imageUrl || _vm.content.msgtype === 'm.audio' && _vm.audioUrl) ? _c('div', {
    staticClass: "fromimagesfiles"
  }, [_c('div', {
    staticClass: "fromCaption"
  }, [_c('i', {
    staticClass: "fas fa-share-alt"
  }), _c('span', [_vm._v(_vm._s(_vm.userinfo.name) + ": " + _vm._s(_vm.$t("caption.messagefrom").toLowerCase()) + " ")])])]) : _vm._e()], 1) : _vm._e(), _vm.preview ? _c('div', {
    staticClass: "messagePreview"
  }, [_c('listPreview', {
    attrs: {
      "my": _vm.my,
      "event": _vm.origin,
      "decryptEvent": _vm.decryptEvent,
      "userinfo": _vm.userinfo,
      "chat": _vm.chat,
      "readed": _vm.readed
    }
  })], 1) : _vm._e(), !_vm.streamMode && _vm.my && _vm.readed && !_vm.preview && !_vm.fromreference ? _c('div', {
    staticClass: "statusWrapper"
  }, [_c('div', {
    staticClass: "my"
  }, [_c('i', {
    staticClass: "fas fa-check-double"
  }), _c('span', [_vm._v(_vm._s(_vm.$t("caption.messageRead")))])])]) : _vm._e()]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "referenceCaption"
  }, [_c('span', [_c('i', {
    staticClass: "fas fa-share"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "referenceCaption"
  }, [_c('span', [_c('i', {
    staticClass: "fas fa-share"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "referenceCaption"
  }, [_c('span', [_c('i', {
    staticClass: "fas fa-share"
  })])]);
}];

// CONCATENATED MODULE: ./src/components/events/event/message/index.vue?vue&type=template&id=be4c3910&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unshift.js
var es_array_unshift = __webpack_require__("3c65");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/actions/index.vue?vue&type=template&id=05cd0480&scoped=true&
var actionsvue_type_template_id_05cd0480_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "msgAction"
  }, [_c('div', {
    staticClass: "contentAction",
    style: {
      margin: _vm.position
    }
  }, [_c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "google.com"
    }
  }, [_vm._v(_vm._s(_vm.$t("button.reply")) + " "), _c('i', {
    staticClass: "fas fa-reply"
  })])]), _c('li', [_vm._v(_vm._s(_vm.$t("button.copy")) + " "), _c('i', {
    staticClass: "far fa-copy"
  })]), _c('li', [_vm._v(_vm._s(_vm.$t("button.select")) + " "), _c('i', {
    staticClass: "far fa-check-circle"
  })]), _c('li', [_vm._v(_vm._s(_vm.$t("button.forward")) + " "), _c('i', {
    staticClass: "fas fa-share"
  })]), _c('li', [_vm._v(_vm._s(_vm.$t("button.delete")) + " "), _c('i', {
    staticClass: "far fa-trash-alt"
  })])])])]);
};
var actionsvue_type_template_id_05cd0480_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/actions/index.vue?vue&type=template&id=05cd0480&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/events/event/actions?vue&type=script&lang=js&

/* harmony default export */ var actions_vue_type_script_lang_js_ = ({
  name: "msgActions",
  props: {
    position: String
  },
  data: function () {
    return {
      loading: false,
      actionMessage: false
    };
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: state => state.auth
  }),
  methods: {}
});
// CONCATENATED MODULE: ./src/components/events/event/actions?vue&type=script&lang=js&
 /* harmony default export */ var event_actions_vue_type_script_lang_js_ = (actions_vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/events/event/actions/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("6e24")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  event_actions_vue_type_script_lang_js_,
  actionsvue_type_template_id_05cd0480_scoped_true_render,
  actionsvue_type_template_id_05cd0480_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "05cd0480",
  null
  ,true
)

/* harmony default export */ var actions = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/previews/filePreview/index.vue?vue&type=template&id=02b6b05f&
var filePreviewvue_type_template_id_02b6b05f_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', [_c('clip-loader', {
    staticClass: "clipLoader",
    attrs: {
      "size": '25px',
      "color": '#0035a8',
      "loading": true
    }
  }), _c('p', [_vm._v(_vm._s(_vm.preview.name))]), _c('p', [_vm._v(_vm._s(_vm.preview.size))])], 1);
};
var filePreviewvue_type_template_id_02b6b05f_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/previews/filePreview/index.vue?vue&type=template&id=02b6b05f&

// EXTERNAL MODULE: ./node_modules/vue-spinner/src/ClipLoader.vue + 4 modules
var ClipLoader = __webpack_require__("da7a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/previews/filePreview/index.vue?vue&type=script&lang=js&

/* harmony default export */ var filePreviewvue_type_script_lang_js_ = ({
  props: {
    preview: Object
  },
  components: {
    clipLoader: ClipLoader["a" /* default */]
  }
});
// CONCATENATED MODULE: ./src/components/events/previews/filePreview/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var previews_filePreviewvue_type_script_lang_js_ = (filePreviewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/previews/filePreview/index.vue





/* normalize component */

var filePreview_component = Object(componentNormalizer["a" /* default */])(
  previews_filePreviewvue_type_script_lang_js_,
  filePreviewvue_type_template_id_02b6b05f_render,
  filePreviewvue_type_template_id_02b6b05f_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var filePreview = (filePreview_component.exports);
// EXTERNAL MODULE: ./src/components/events/event/fileMessage/index.vue + 4 modules
var fileMessage = __webpack_require__("696c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/message/listPreview/index.vue?vue&type=template&id=1d1f5f54&scoped=true&
var listPreviewvue_type_template_id_1d1f5f54_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "listPreview"
  }, [_vm.urlpreview && _vm.metaPreviewLink ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "sname txt"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + " ")]) : _vm._e(), _c('span', {
    staticClass: "linkTitle txt"
  }, [_vm._v("sent link: " + _vm._s(_vm.meta["og:title"]) + " ")]), _vm.meta['og:site_name'] === 'Pocketnet' ? _c('span', {
    staticClass: "pocketnetLink"
  }, [_vm._v(" " + _vm._s(_vm.meta["og:site_name"]) + " ")]) : _c('span', [_vm._v(" " + _vm._s(_vm.meta["og:site_name"]) + " ")])]) : _vm._e(), _vm.content.msgtype === 'm.file' ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "sname txt"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + " ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v(" " + _vm._s(_vm.$t("caption.sentfile")) + " " + _vm._s(JSON.parse(_vm.content.body).name) + " ")])]) : _vm._e(), _vm.content.msgtype === 'm.bad.encrypted' ? _c('div', {
    staticClass: "previewMessage"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.$t("caption.unabletoDecrypt")) + " ")])]) : _vm._e(), _vm.event.event.type === 'm.room.redaction' ? _c('div', {
    staticClass: "previewMessage"
  }, [_c('span', {
    staticClass: "txt"
  }, [_c('i', {
    staticClass: "fas fa-eraser"
  }), _vm._v(" " + _vm._s(_vm.$t("caption.messageDeleted")) + " ")])]) : _vm._e(), _vm.event.event.type === 'm.room.power_levels' ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v(" " + _vm._s(_vm.powerLevels) + " ")])]) : _vm._e(), _vm.content.msgtype === 'm.image' ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.sentImage")))])]) : _vm._e(), _vm.content.msgtype === 'm.audio' ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.sentVoiceMessage")))])]) : _vm._e(), _vm.content.call_id ? _c('div', {
    staticClass: "previewMessage"
  }, [_c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t(_vm.event.event.type)))])]) : _vm._e(), _vm.event.event.type === 'm.room.request_calls_access' ? _c('div', {
    staticClass: "previewMessage"
  }, [_c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.core.vm.$i18n.t("caption.requestCallAccess")))])]) : _vm._e(), _vm.content.msgtype === 'm.text' && !_vm.urlpreview ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName && _vm.senderName != 'You' ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('IncomingMessage', {
    attrs: {
      "message": _vm.content.body,
      "markedText": _vm.markMatches
    }
  })], 1) : _vm._e(), _vm.content.msgtype === 'm.encrypted' && !_vm.urlpreview ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName && _vm.senderName != 'You' ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('IncomingMessage', {
    attrs: {
      "message": _vm.decryptEvent.body,
      "markedText": _vm.markMatches
    }
  })], 1) : _vm._e(), _vm.content.membership === 'invite' ? _c('div', {
    staticClass: "invitedEvent"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _vm.tetatetchat ? _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.invitationToChat")))]) : _vm._e(), !_vm.tetatetchat ? _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.invitationToRoom")))]) : _vm._e()]) : _vm._e(), _vm.content.membership === 'leave' ? _c('div', {
    staticClass: "previewMessage"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + ": ")]) : _vm._e(), _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(" " + _vm._s(_vm.name) + " ")]), _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.leftChat")))])]) : _vm._e(), _vm.content.membership === 'ban' ? _c('div', [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + " ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v("banned " + _vm._s(_vm.content.displayname))])]) : _vm._e(), _vm.content.membership === 'join' && _vm.event.getSender() !== _vm.userId ? _c('div', {
    staticClass: "invitedEvent"
  }, [_vm.senderName ? _c('span', {
    staticClass: "txt sname"
  }, [_vm._v(_vm._s(_vm.senderName == 'You' ? _vm.$t("caption.you") : _vm.senderName) + " ")]) : _vm._e(), _c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.joined")))])]) : _vm._e(), _vm.content.name ? _c('div', [_c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.chatRenamed")) + " "), _c('b', [_vm._v(_vm._s(_vm.content.name))])])]) : _vm._e(), _vm.content.topic ? _c('div', [_c('span', {
    staticClass: "txt"
  }, [_vm._v(_vm._s(_vm.$t("caption.chatTopic")) + " "), _c('b', [_vm._v(_vm._s(_vm.content.topic.replace(/_/g, " ")))])])]) : _vm._e(), _vm.readed ? _c('div', {
    staticClass: "statusWrapper"
  }, [_vm.my ? _c('div', {
    staticClass: "my"
  }, [_c('i', {
    staticClass: "fas fa-check-double"
  })]) : _vm._e()]) : _vm._e()]);
};
var listPreviewvue_type_template_id_1d1f5f54_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/message/listPreview/index.vue?vue&type=template&id=1d1f5f54&scoped=true&

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/message/incomingMessage/incomingMessage.vue?vue&type=template&id=69ecb42d&scoped=true&
var incomingMessagevue_type_template_id_69ecb42d_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "msgtext"
  }, [_vm._l(_vm.chunks, function (chunk, index) {
    return [chunk.id ? _c('label', {
      staticClass: "likelink",
      on: {
        "click": function ($event) {
          return _vm.show(chunk);
        }
      }
    }, [_vm._v("@" + _vm._s(chunk.name))]) : _c('label', {
      domProps: {
        "innerHTML": _vm._s(_vm.echotext(chunk))
      }
    })];
  })], 2);
};
var incomingMessagevue_type_template_id_69ecb42d_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/message/incomingMessage/incomingMessage.vue?vue&type=template&id=69ecb42d&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match-all.js
var es_string_match_all = __webpack_require__("a1f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/message/incomingMessage/incomingMessage.vue?vue&type=script&lang=js&



/* harmony default export */ var incomingMessagevue_type_script_lang_js_ = ({
  name: "IncomingMessage",
  props: {
    message: {
      type: String,
      default: ""
    },
    markedText: String
  },
  data() {
    return {
      user_id: /\w{68}:/,
      userCalled: /@\w{68}:\w{1,50}/g
    };
  },
  computed: {
    chunks: function () {
      if (this.message.indexOf("@") == -1) return [this.message];
      var c = this.message.split(this.userCalled);
      var us = Array.from(this.message.matchAll(this.userCalled), m => m[0]);
      var r = [];
      _.each(c, function (v, i) {
        r.push(v);
        if (us[i]) {
          var ch = us[i].replace("@", "").split(":");
          ch.length == 2 ? r.push({
            id: ch[0],
            name: ch[1]
          }) : r.push(us[i]);
        }
      });
      return _.filter(r, r => {
        return r;
      });
    }
  },
  methods: {
    echotext: function (chunk) {
      var text = functions["a" /* default */].superXSS(chunk);
      if (typeof joypixels != 'undefined') {
        text = joypixels.toImage(text);
      }
      return text;
    },
    show: function (chunk) {
      this.core.mtrx.kit.usersInfoById(chunk.id).then(r => {
        core.mtrx.opencontact(r);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/message/incomingMessage/incomingMessage.vue?vue&type=script&lang=js&
 /* harmony default export */ var incomingMessage_incomingMessagevue_type_script_lang_js_ = (incomingMessagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/message/incomingMessage/incomingMessage.vue



function incomingMessage_injectStyles (context) {
  
  var style0 = __webpack_require__("485a3")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var incomingMessage_component = Object(componentNormalizer["a" /* default */])(
  incomingMessage_incomingMessagevue_type_script_lang_js_,
  incomingMessagevue_type_template_id_69ecb42d_scoped_true_render,
  incomingMessagevue_type_template_id_69ecb42d_scoped_true_staticRenderFns,
  false,
  incomingMessage_injectStyles,
  "69ecb42d",
  null
  ,true
)

/* harmony default export */ var incomingMessage = (incomingMessage_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/message/listPreview/index.vue?vue&type=script&lang=js&


/* harmony default export */ var listPreviewvue_type_script_lang_js_ = ({
  props: {
    event: {},
    chat: {},
    decryptEvent: {},
    notificationPreview: false,
    userinfo: Object,
    readed: Boolean,
    my: Boolean
  },
  inject: ["matches", "markText"],
  components: {
    IncomingMessage: incomingMessage
  },
  data: function () {
    return {
      meta: {}
    };
  },
  computed: {
    userId: function () {
      var _this$core$user$useri;
      return (_this$core$user$useri = this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id;
    },
    countMembers: function () {
      var _this$chat;
      return _.size((_this$chat = this.chat) === null || _this$chat === void 0 ? void 0 : _this$chat.currentState.members);
    },
    urlpreview: function () {
      if (this.content.msgtype !== "m.file") {
        return "";
        if (this.content.body) return functions["a" /* default */].getUrl(this.content.body) || "";
      }
    },
    tetatetchat: function () {
      return this.core.mtrx.kit.tetatetchat(this.chat);
    },
    unknowngroupusers: function () {
      return this.core.mtrx.kit.unknowngroupusers(this.m_chat);
    },
    senderName: function () {
      if (this.userinfo.id == this.userId) return "You";
      return this.userinfo.name || "";
    },
    metaPreviewLink: function () {
      this.core.mtrx.client.getUrlPreview(this.urlpreview, 0).then(r => {
        return this.meta = r;
      });
      return this.meta;
    },
    ev: function () {
      return this.event._clearEvent || this.event;
    },
    content: function () {
      return this.event.event.content;
    },
    name: function () {
      var n = this.$store.state.users[`${functions["a" /* default */].getmatrixid(this.event.event.state_key)}`].name;
      if (n == this.senderName) return "";
      return n;
    },
    powerLevels: function () {
      if (this.event.event.type === "m.room.power_levels" && this.event.event.unsigned.prev_content) {
        let newModer = Object.keys(functions["a" /* default */].ObjDiff(this.event.event.content.users, this.event.event.unsigned.prev_content.users));
        let pocketUser = this.$store.state.users[`${functions["a" /* default */].getmatrixid(newModer[0])}`];
        let userLevel = this.event.event.content.users[`${newModer[0]}`];
        if (!_.isEmpty(pocketUser) && newModer[0]) {
          if (userLevel === 0 && pocketUser.name) {
            return "unmarked " + `${pocketUser.name}` + " as moderator";
          }
          if (userLevel === 50 && pocketUser.name) {
            return "marked " + `${pocketUser.name}` + " as moderator";
          }
        }
      }
    },
    markMatches: function () {
      var _ref, _ref2;
      return this.markText ? this.markText((_ref = this.event.event.decrypted || this.event.event.content) === null || _ref === void 0 ? void 0 : _ref.body, true) : (_ref2 = this.event.event.decrypted || this.event.event.content) === null || _ref2 === void 0 ? void 0 : _ref2.body;
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/message/listPreview/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var message_listPreviewvue_type_script_lang_js_ = (listPreviewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/message/listPreview/index.vue



function listPreview_injectStyles (context) {
  
  var style0 = __webpack_require__("4021")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var listPreview_component = Object(componentNormalizer["a" /* default */])(
  message_listPreviewvue_type_script_lang_js_,
  listPreviewvue_type_template_id_1d1f5f54_scoped_true_render,
  listPreviewvue_type_template_id_1d1f5f54_scoped_true_staticRenderFns,
  false,
  listPreview_injectStyles,
  "1d1f5f54",
  null
  ,true
)

/* harmony default export */ var listPreview = (listPreview_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/url/index.vue?vue&type=template&id=6abe0e6a&scoped=true&
var urlvue_type_template_id_6abe0e6a_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "urlMessage",
    attrs: {
      "id": "url"
    }
  }, [_vm.urltype != 'empty' && !_vm.error ? _c('div', {
    staticClass: "urlwrapper"
  }, [!_vm.loading ? _c('metaMessage', {
    ref: "metamessage",
    attrs: {
      "type": _vm.urltype,
      "name": _vm.meta['og:site_name'],
      "title": _vm.meta['og:title'],
      "description": _vm.meta['og:description'],
      "image": _vm.previewImageUrl,
      "url": _vm.url,
      "h": _vm.meta['og:image:height'],
      "w": _vm.meta['og:image:width']
    },
    on: {
      "updatedSize": _vm.updatedSize,
      "loaded": _vm.loaded
    }
  }) : _c('div', [_c('div', {
    staticClass: "preloaderWrapperLocal"
  }, [_c('linepreloader')], 1)])], 1) : _vm._e()]);
};
var urlvue_type_template_id_6abe0e6a_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/url/index.vue?vue&type=template&id=6abe0e6a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/url/index.vue?vue&type=script&lang=js&


var exts = ["bin", "dat", "swf", "doc", "docx", "sig", "tif", "cdr", "xls", "xlsx", "p7s", "mkv", "tmp", "db", "isz", "mdf", "jpg", "cr2", "fb2", "iso", "svg", "exe", "mdx", "vob", "ppt", "xls", "dcm", "vsd", "mov", "img", "pdf", "jpg", "jfif", "png"];
/* harmony default export */ var urlvue_type_script_lang_js_ = ({
  name: "eventsurl",
  props: {
    url: String,
    preview: Boolean,
    data: Object
  },
  components: {
    metaMessage: () => __webpack_require__.e(/* import() */ 7).then(__webpack_require__.bind(null, "dacd"))
  },
  data: function () {
    return {
      meta: {},
      loading: false,
      error: false,
      groups: {
        p: ["pocketnet.app", "bastyon.com"],
        pt: ["test.pocketnet.app", "test.bastyon.com"]
      }
    };
  },
  computed: Object(vuex_esm["c" /* mapState */])({
    auth: state => state.auth,
    clearurl: function () {
      var u = this.url || "";
      u = u.replace("http://", "https://");
      if (u.indexOf("https://") == -1) {
        u = "https://" + u;
      }
      return u;
    },
    previewImageUrl() {
      if (this.meta["og:image"]) return this.core.mtrx.client.mxcUrlToHttp(this.meta["og:image"]);
    },
    urltype: function () {
      if (!this.url) return "empty";
      if (this.url.indexOf("embedVideo.php") > -1) {
        return "video";
      }
      var url = {};
      try {
        url = new URL(this.url);
      } catch (e) {
        this.error = e;
      }
      if (url.pathname == "/") return "custom";
      if (this.url.indexOf("publicroom=") > -1) return "matrix";
      if (this.url.indexOf("connect=") > -1) return "matrix";
      if (functions["a" /* default */].deep(window, "POCKETNETINSTANCE.thislink") && functions["a" /* default */].deep(window, "POCKETNETINSTANCE.thislink")(this.url)) {
        return "pocketnet";
      }

      /*
      
      var domain = window.pocketnetdomain || "pocketnet.app";
      		if (this.url.indexOf("bastyon://") > -1) return "pocketnet";
      if (this.url.indexOf("pocketnet://") > -1) return "pocketnet";
      		var m = _.find(this.groups, function (g) {
      	return _.indexOf(g, url.host) > -1 && _.indexOf(g, domain) > -1;
      });
      		if (m && this.url.indexOf("embedVideo.php") == -1 && this.url.indexOf("docs/") == -1 && this.url.indexOf("/blockexplorer") == -1) {
      	return "pocketnet";
      }*/

      return "custom";
    },
    subtype: function () {
      if (this.urltype == 'custom') {
        if (this.clearurl && this.clearurl.indexOf && this.clearurl.indexOf('zoom.us') > -1) {
          return 'zoom';
        }
        if (this.clearurl && this.clearurl.split) {
          var ch = this.clearurl.split(/\//g);
          if (ch.length > 2) {
            var ls = ch[ch.length - 1] || '';
            var lsc = ls.split('.');
            if (lsc.length == 2 && exts.indexOf(lsc[lsc.length - 1]) > -1) {
              return 'file';
            }
          }
        }
      }
    }
  }),
  beforeMount: function () {
    if (this.urltype == "custom") {
      this.geturl();
    } else {
      this.loading = false;
    }
  },
  methods: {
    updatedSize: function (before) {
      this.$emit("updatedSize", before);
    },
    loaded: function (data) {
      this.$emit("loaded", data);
    },
    geturl: function () {
      //this.loading = true;

      if (this.subtype) {
        if (this.subtype == 'zoom') {
          this.meta = {
            'og:title': "Join our Cloud HD Video Meeting"
          };
        }
        if (this.subtype == 'file') {
          this.meta = {
            'og:title': "File"
          };
        }
        return;
      }
      this.core.mtrx.client.getUrlPreview(this.clearurl, 0).then(response => {
        var cl = {};
        _.each(response, (r, i) => {
          if (r) cl[i] = r;
        });
        if (_.isEmpty(cl)) {
          this.$emit('error', 'empty');
          return Promise.reject('empty');
        }
        this.meta = response;
      }).catch(error => {
        this.meta = null;
        this.error = error;
        this.$emit('error', error);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/url/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var event_urlvue_type_script_lang_js_ = (urlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/url/index.vue



function url_injectStyles (context) {
  
  var style0 = __webpack_require__("436b")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var url_component = Object(componentNormalizer["a" /* default */])(
  event_urlvue_type_script_lang_js_,
  urlvue_type_template_id_6abe0e6a_scoped_true_render,
  urlvue_type_template_id_6abe0e6a_scoped_true_staticRenderFns,
  false,
  url_injectStyles,
  "6abe0e6a",
  null
  ,true
)

/* harmony default export */ var event_url = (url_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-images-loaded/dist/vueimagesloaded.js
var vueimagesloaded = __webpack_require__("8ff0");
var vueimagesloaded_default = /*#__PURE__*/__webpack_require__.n(vueimagesloaded);

// EXTERNAL MODULE: ./src/components/chats/dummypreviews/index.vue + 4 modules
var dummypreviews = __webpack_require__("a54c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/VoiceMessage/index.vue?vue&type=template&id=6293e3d8&scoped=true&
var VoiceMessagevue_type_template_id_6293e3d8_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "voiceMessage",
    class: {
      playing: _vm.isPlaying
    }
  }, [_c('div', {
    staticClass: "voiceMessage_wrapper"
  }, [_c('button', {
    staticClass: "voiceMessage_toggle",
    class: {
      encrypted: _vm.encrypted
    },
    on: {
      "touchend": _vm.audioToggle,
      "click": _vm.audioToggleClick
    }
  }, [_c('i', {
    class: _vm.isPlaying ? 'fas fa-pause' : 'fas fa-play'
  })]), _c('div', {
    staticClass: "voiceMessage_graph"
  }, [_c('canvas', {
    ref: "canvas",
    attrs: {
      "width": "100",
      "height": "50"
    },
    on: {
      "mousedown": _vm.goTo
    }
  })]), _vm.encrypted && !_vm.error ? _c('div', {
    staticClass: "encsign"
  }, [_c('i', {
    staticClass: "fas fa-lock"
  })]) : _vm._e(), _c('div', {
    staticClass: "voiceMessage_options"
  }, [!_vm.error ? _c('span', [_vm._v(_vm._s(_vm.getDurationString))]) : _vm._e(), _vm.error ? _c('i', {
    staticClass: "fas fa-exclamation-circle"
  }) : _vm._e()])])]);
};
var VoiceMessagevue_type_template_id_6293e3d8_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/VoiceMessage/index.vue?vue&type=template&id=6293e3d8&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/VoiceMessage/index.vue?vue&type=script&lang=js&



/* harmony default export */ var VoiceMessagevue_type_script_lang_js_ = ({
  name: "VoiceMessage",
  props: {
    decryptedInfo: Object | ArrayBuffer,
    audioBuffer: {
      type: String | null,
      required: true
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      voiceMessage: null,
      isPlaying: false,
      interval: null,
      audioContext: null,
      audio: null,
      duration: null,
      currentTime: null,
      signal: null,
      audiobuffer: null,
      error: null
    };
  },
  inject: ["addToQueue", "playNext"],
  mounted() {
    this.initVoiceMessage();
  },
  beforeDestroy() {
    if (this.isPlaying) {
      this.pause();
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    //if(this.audioContext) this.audioContext.close()
  },

  watch: {
    isPlaying: function (v) {
      if (!this.isPlaying) {} else {}
    }
  },
  computed: {
    encrypted() {
      return this.decryptedInfo ? true : false;
    },
    ...Object(vuex_esm["c" /* mapState */])({
      mobile: state => state.mobile
    }),
    getDurationString() {
      if (this.duration) {
        let sec, min;
        if (this.currentTime) {
          sec = Math.floor(this.currentTime);
          min = Math.floor(this.currentTime / 60);
          return `${min}:${sec < 10 ? "0" + sec : sec}`;
        }
        min = Math.floor(this.duration / 60);
        sec = Math.floor(this.duration - min * 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
      }
      return "0:00";
    },
    percentPlayed() {
      return this.currentTime / this.duration;
    },
    localBuffer() {
      return functions["a" /* default */].copyArrayBuffer(this.audioBuffer);
    }
  },
  methods: {
    goTo(e) {
      if (!this.$refs.canvas) return;
      var dr = e.offsetX / this.$refs.canvas.width * this.duration;
      if (!this.isPlaying) {
        this.setTime(dr);
        this.play();
      } else {
        this.pause();
        setTimeout(() => {
          this.setTime(dr);
          this.play();
        }, 20);
      }
    },
    audioToggleClick() {
      if (this.mobile) return;
      this.audioToggle();
    },
    audioToggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },
    pause() {
      if (this.audio) {
        this.audio.stop();
        this.audio.disconnect();
      }
      this.isPlaying = false;
      this.draw();
      let currentPlaying = this.$store.state.currentPlayingVoiceMessage;
      if (currentPlaying && currentPlaying.id == this.id) {
        this.$store.commit("SET_CURRENT_PLAYING_VOICE_MESSAGE", null);
      }
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    play() {
      if (!this.audiobuffer) return;
      if (this.error) {
        this.playNext(this.id);
        return;
      }
      this.audioContext = this.core.getAudioContext();
      this.isPlaying = true;
      this.audio = this.initAudioNode();
      if (this.currentTime >= this.duration) {
        this.setTime(0);
      }
      if (this.audio.start) {
        this.audio.start(0, this.currentTime);
      } else if (this.audio.play) {
        this.audio.play(0, this.currentTime);
      } else if (this.audio.noteOn) {
        this.audio.noteOn(0, this.currentTime);
      }
      let currentPlaying = this.$store.state.currentPlayingVoiceMessage;
      if (currentPlaying && currentPlaying.id !== this.id) {
        currentPlaying.pause();
      }
      this.$store.commit("SET_CURRENT_PLAYING_VOICE_MESSAGE", this);
      if (this.interval) {
        clearInterval(this.interval);
      }
      var t = 50;
      this.interval = setInterval(() => {
        var time = this.currentTime + t / 1000;
        if (this.duration - t / 1000 < time) time = this.duration;
        if (this.currentTime > this.duration) {
          this.pause();
        }
        this.draw();
        this.setTime(time);
      }, t);
    },
    draw() {
      const canvas = this.$refs.canvas;
      if (!this.signal) return;
      if (!canvas) return;
      const data = this.signal;
      var w = canvas.width;
      var h = canvas.height;
      var l = data.length;
      var perc = this.percentPlayed;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);
      var r = 0;
      var c = Math.floor(l / 20);
      for (let i = 0; i < l; i = i + c) {
        let x = Math.floor(i / l * w);
        let L = Math.abs(data[i] * h) + 1;
        if (i / l <= perc) {
          ctx.fillStyle = "#00a4ff";
        } else {
          ctx.fillStyle = "#8bddfb";
        }
        ctx.fillRect(x, h / 2 - L / 2, 2, L);
        r++;
      }
    },
    initAudioNode() {
      let audioNode = null;
      audioNode = this.audioContext.createBufferSource();
      audioNode.buffer = this.audiobuffer;
      audioNode.connect(this.audioContext.destination);

      ///let unmuteHandle = unmute(context, allowBackgroundPlayback, forceIOSBehavior);

      audioNode.onended = () => {
        this.audio = null;
        if (this.isPlaying) {
          setTimeout(() => {
            this.playNext(this.id);
          }, 300);
        } else {}
        if (this.duration - 100 < this.currentTime) this.setTime(0);
        this.pause();
      };
      return audioNode;
    },
    setTime() {
      let time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.currentTime = time;
    },
    initVoiceMessage() {
      var _this = this;
      return Object(asyncToGenerator["a" /* default */])(function* () {
        try {
          _this.audioContext = _this.core.getAudioContext(); //new (window.AudioContext || window.webkitAudioContext)() || null;
        } catch (e) {
          _this.error = e;
        }
        if (_this.error) return;
        _this.addToQueue(_this, _this.id);
        _this.duration = 0;
        _this.setTime(0);

        //const data = f._base64ToArrayBuffer(this.base64Audio.split(',')[1])

        try {
          yield _this.audioContext.decodeAudioData(_this.localBuffer, buffer => {
            _this.audiobuffer = buffer;
            _this.duration = buffer.duration;
            _this.setTime(0);
            _this.signal = buffer.getChannelData(0);
            _this.draw();
          });
        } catch (e) {
          _this.error = e;
          //console.error(e)
        }
      })();
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/VoiceMessage/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var event_VoiceMessagevue_type_script_lang_js_ = (VoiceMessagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/VoiceMessage/index.vue



function VoiceMessage_injectStyles (context) {
  
  var style0 = __webpack_require__("0557")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var VoiceMessage_component = Object(componentNormalizer["a" /* default */])(
  event_VoiceMessagevue_type_script_lang_js_,
  VoiceMessagevue_type_template_id_6293e3d8_scoped_true_render,
  VoiceMessagevue_type_template_id_6293e3d8_scoped_true_staticRenderFns,
  false,
  VoiceMessage_injectStyles,
  "6293e3d8",
  null
  ,true
)

/* harmony default export */ var VoiceMessage = (VoiceMessage_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/Call/index.vue?vue&type=template&id=6b2b4e91&scoped=true&
var Callvue_type_template_id_6b2b4e91_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "call",
    class: {
      ended: this.getDescription() === 'ended',
      bad: this.getDescription() === 'reject'
    }
  }, [_c('div', {
    staticClass: "call-icon",
    class: this.getDescription() === 'ended' ? 'ended' : ''
  }, [_c('i', {
    class: this.getDescription() === 'reject' ? 'fas fa-phone-slash' : 'fas fa-phone'
  })]), _c('div', {
    staticClass: "call-info"
  }, [_c('div', {
    staticClass: "call-info_title"
  }, [_vm._v(_vm._s(_vm.$t(this.getDescription())))])])]);
};
var Callvue_type_template_id_6b2b4e91_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/Call/index.vue?vue&type=template&id=6b2b4e91&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/Call/index.vue?vue&type=script&lang=js&
/* harmony default export */ var Callvue_type_script_lang_js_ = ({
  name: "Call",
  props: {
    my: Boolean,
    event: Object
  },
  methods: {
    getDescription: function () {
      let status;
      if (this.event.event.type === "m.call.invite") {
        status = this.my ? "outgoingCall" : "incomingCall";
      }
      if (this.event.event.type === "m.call.hangup") {
        status = "ended";
      }
      if (this.event.event.type === "m.call.reject") {
        status = "reject";
      }
      return status;
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/Call/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var event_Callvue_type_script_lang_js_ = (Callvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/Call/index.vue



function Call_injectStyles (context) {
  
  var style0 = __webpack_require__("6a2f")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Call_component = Object(componentNormalizer["a" /* default */])(
  event_Callvue_type_script_lang_js_,
  Callvue_type_template_id_6b2b4e91_scoped_true_render,
  Callvue_type_template_id_6b2b4e91_scoped_true_staticRenderFns,
  false,
  Call_injectStyles,
  "6b2b4e91",
  null
  ,true
)

/* harmony default export */ var Call = (Call_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/request/index.vue?vue&type=template&id=669d2f46&scoped=true&
var requestvue_type_template_id_669d2f46_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "request"
  }, [_c('img', {
    staticClass: "image",
    attrs: {
      "src": __webpack_require__("1433"),
      "alt": "request"
    }
  }), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t("caption.requestCallAccess")))]), _c('div', {
    staticClass: "description"
  }, [_c('div', [_vm._v(_vm._s(_vm.$t("caption.callAccessWarning")))])]), _c('div', {
    staticClass: "options"
  }, [_c('button', {
    staticClass: "btn bad",
    on: {
      "click": _vm.prohibit
    }
  }, [_vm._v(" " + _vm._s(_vm.$t("caption.prohibit")) + " ")]), _c('button', {
    staticClass: "btn ok",
    on: {
      "click": _vm.allow
    }
  }, [_vm._v(_vm._s(_vm.$t("caption.allow")))])])]);
};
var requestvue_type_template_id_669d2f46_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/request/index.vue?vue&type=template&id=669d2f46&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/request/index.vue?vue&type=script&lang=js&
/* harmony default export */ var requestvue_type_script_lang_js_ = ({
  name: "request",
  props: {
    event: {
      type: Object
    }
  },
  methods: {
    allow() {
      this.core.mtrx.client.sendStateEvent(this.event.event.room_id, "m.room.callsEnabled", {
        enabled: true
      }, this.core.user.userinfo.id);
      this.core.mtrx.client.sendStateEvent(this.event.event.room_id, "m.room.request_calls_access", {
        accepted: true
      });
      this.core.store.dispatch("FETCH_EVENTS");
    },
    prohibit() {
      this.core.mtrx.client.sendStateEvent(this.event.event.room_id, "m.room.callsEnabled", {
        enabled: false
      }, this.core.user.userinfo.id);
      this.core.mtrx.client.sendStateEvent(this.event.event.room_id, "m.room.request_calls_access", {
        accepted: false
      });
      this.core.store.dispatch("FETCH_EVENTS");
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/request/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var event_requestvue_type_script_lang_js_ = (requestvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/request/index.vue



function request_injectStyles (context) {
  
  var style0 = __webpack_require__("27be")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var request_component = Object(componentNormalizer["a" /* default */])(
  event_requestvue_type_script_lang_js_,
  requestvue_type_template_id_669d2f46_scoped_true_render,
  requestvue_type_template_id_669d2f46_scoped_true_staticRenderFns,
  false,
  request_injectStyles,
  "669d2f46",
  null
  ,true
)

/* harmony default export */ var request = (request_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./src/components/events/event/message?vue&type=script&lang=js&














/* harmony default export */ var message_vue_type_script_lang_js_ = ({
  name: "eventsMessage",
  props: {
    decryptEvent: {},
    origin: Object,
    prevevent: Object,
    event: Object,
    preview: Boolean,
    userinfo: Object,
    readed: Boolean,
    downloaded: Boolean,
    baseImg: {
      type: String,
      default: "empty"
    },
    filePreview: Object,
    imgEvent: {},
    add_image: Function,
    goToGallery: Function,
    chat: Object,
    encrypted: false,
    encryptedData: Boolean,
    decryptedInfo: null,
    error: String,
    withImage: Boolean,
    reference: Object,
    showmyicontrue: false,
    fromreference: Boolean,
    multiSelect: {
      default: false,
      type: Boolean
    },
    selectedMessages: {
      default: [],
      type: Array
    },
    audioBuffer: null
  },
  directives: {
    imagesLoaded: vueimagesloaded_default.a
  },
  data: function () {
    return {
      referenceshowed: false,
      markedText: null,
      hasurlerror: null,
      donationColor: null
    };
  },
  inject: ["matches", "markText", "streamMode", "powerLevel", "adminActions", "menuState"],
  components: {
    actions: actions,
    filePreview: filePreview,
    fileMessage: fileMessage["a" /* default */],
    listPreview: listPreview,
    url: event_url,
    dummypreviews: dummypreviews["default"],
    IncomingMessage: incomingMessage,
    VoiceMessage: VoiceMessage,
    Call: Call,
    Request: request
  },
  watch: {
    readyToRender: {
      immediate: true,
      handler: function () {
        if (this.readyToRender) this.$emit("readyToRender");
      }
    }
  },
  computed: {
    pkoindisabled: function () {
      return this.$store.state.pkoindisabled || false;
    },
    showburn: function () {
      if (new Date() < new Date(2021, 11, 28)) {
        return "";
      }
      if (-moment().diff(this.willburn, this.core.options.burn.v) < this.core.options.burn.b) return "big";
      if (-moment().diff(this.willburn, this.core.options.burn.v) < this.core.options.burn.m) return "medium";
      return "";
    },
    willburn: function () {
      var d = moment(this.origin.localTimestamp).add(this.core.options.burn.w, this.core.options.burn.v);
      return d;
    },
    readyToRender: function () {
      var _this$content;
      var r = this.content.msgtype === "m.encrypted" && !this.textWithoutLinks && this.badenctypted || this.content.membership || (this.content.msgtype === "m.text" || this.content.msgtype === "m.encrypted") && this.textWithoutLinks || this.file || this.event.event.type === "m.room.request_calls_access" || this.error || this.content.msgtype === "m.image" && this.imageUrl || this.content.msgtype === "m.audio" && this.audioUrl || this.urlpreview || (this === null || this === void 0 ? void 0 : (_this$content = this.content) === null || _this$content === void 0 ? void 0 : _this$content.call_id) || this.preview;
      return r;
    },
    my: function () {
      var _this$core$user$useri;
      return this.userinfo.id === ((_this$core$user$useri = this.core.user.userinfo) === null || _this$core$user$useri === void 0 ? void 0 : _this$core$user$useri.id);
    },
    stateChat: function () {
      var id = this.$route.query.id;
      return this.$store.state.chatsMap[id];
    },
    sending: function () {
      return this.origin.status == "sending";
    },
    showmeta: function () {
      if (!this.prevevent) return true;
      var prevuser = this.$f.getmatrixid(this.prevevent.getSender());
      var t = 10 * 60000;
      if (moment().diff(this.origin.localTimestamp, "days") != 0) {
        t = 60 * 1000 * 60 * 24;
      }
      if (prevuser != this.userinfo.id || this.prevevent.localTimestamp + t < this.origin.localTimestamp) {
        return true;
      }
    },
    imageFrom: function () {
      if (this.content && this.content.info) return this.content.info.from;
    },
    showmyicon: function () {
      return this.streamMode || this.showmyicontrue || this.content.msgtype === "m.image" || /*this.content.msgtype === 'm.audio' ||*/
      this.content.msgtype === "m.file" || this.urlpreview || !this.$store.state.active && this.$store.state.minimized;
    },
    file: function () {
      if (this.content.msgtype === "m.file") {
        return this.body;
      }
    },
    replacedmintionsbody: function () {
      return this.body.replace(/@\w{68}:(\w{1,50})/g, function (str, l) {
        return "@" + l;
      });
    },
    body: function () {
      let bc = this.origin.event.content;
      if (bc.msgtype === "m.encrypted") {
        bc = this.decryptEvent;
      }
      var content = bc.pbody || bc.body || "";
      if (window.findAndReplaceLinkClear && (typeof content === 'string' || content instanceof String)) content = window.findAndReplaceLinkClear(content);
      if (bc.msgtype === "m.text") this.markMatches(content);
      return content;
    },
    content: function () {
      return this.origin.event.content;
    },
    badenctypted: function () {
      return this.decryptEvent.msgtype == "m.bad.encrypted";
    },
    textWithoutLinks: function () {
      var trimmed = this.$f.trim(this.body);
      if (this.hasurlerror) return trimmed;
      if (!this.urlpreview || this.urlpreview.length < 10 || trimmed.indexOf(this.urlpreview) > 0 && trimmed.indexOf(this.urlpreview) + this.urlpreview.length < trimmed.length) {
        return trimmed;
      }
      return this.$f.trim(trimmed.replace(this.urlpreview, ""));
    },
    imageUrl: function () {
      if (this.content.msgtype === "m.image") {
        if (this.encryptedData) {
          return this.decryptedInfo;
        } else {
          return this.content && this.content.url;
        }
      }
    },
    audioUrl: function () {
      if (this.content.msgtype === "m.audio") {
        if (this.encryptedData && this.decryptedInfo) return this.decryptedInfo;
        return this.audioBuffer;

        //return this.content && this.content.audioData
      }
    },

    canediting: function () {
      var type = functions["a" /* default */].deep(this.origin, "event.type");
      if (type == "m.room.message") {
        if (this.origin.event.content.msgtype == "m.encrypted" || this.origin.event.content.msgtype == "m.text") {
          return true;
        }
      }
    },
    cancopy: function () {
      var type = functions["a" /* default */].deep(this.origin, "event.type");
      if (type == "m.room.message") {
        if (this.origin.event.content.msgtype == "m.encrypted" || this.origin.event.content.msgtype == "m.text") {
          return true;
        }
      }
    },
    menuItems: function () {
      var type = functions["a" /* default */].deep(this.origin, "event.type") || '';
      var menu = [];
      if (type.indexOf("m.call") === -1) {
        menu.push({
          click: "reply",
          title: this.$i18n.t("button.reply"),
          icon: "fas fa-reply"
        });
        menu.push({
          click: "showMultiSelect",
          title: this.$i18n.t("button.select"),
          icon: "fas fa-check-circle"
        });
        menu.push({
          click: "share",
          title: this.$i18n.t("button.share"),
          icon: "fas fa-share-alt"
        });
      }
      if (this.my) {
        menu.push({
          click: "delete",
          title: this.$i18n.t("button.delete"),
          icon: "far fa-trash-alt"
        });
      }
      if (type === "m.room.message") {
        menu.unshift({
          click: "copy",
          title: this.$i18n.t("button.copy"),
          icon: "far fa-copy"
        });
        if (this.my && this.canediting) menu.unshift({
          click: "edit",
          title: this.$i18n.t("button.edit"),
          icon: "far fa-edit"
        });
      }
      return menu;
    },
    urlpreview: function () {
      if (this.streamMode && this.content.url || !this.streamMode && !this.preview && this.content.msgtype !== "m.file" && this.content.msgtype !== "m.image" && this.content.msgtype !== "m.audio") {
        var url = functions["a" /* default */].getUrl(this.streamMode ? this.content.url : this.body);
        if (url) {
          try {
            var _u = new URL(url);
            if (_u.pathname == "/") {
              if (functions["a" /* default */].knsite(url)) return "";
            }
            return url;
          } catch (e) {
            return "";
          }
        }
        return url || "";
      }
    },
    edited: function () {
      if (this.content.edited) {
        return true;
      }
      if (this.origin.event.content["m.relates_to"] && this.origin.event.content["m.relates_to"]["rel_type"] == "m.replace") {
        return true;
      }
    },
    selectedMessage: function () {
      var _elem$;
      const elem = this.selectedMessages.filter(item => item.message_id === this.origin.event.event_id);
      return ((_elem$ = elem[0]) === null || _elem$ === void 0 ? void 0 : _elem$.message_id) === this.origin.event.event_id ? true : false;
    },
    user: function () {
      return this.chat.getMember(this.chat.myUserId);
    },
    sender: function () {
      var _this$event, _this$event$sender, _this$event2, _this$event2$event, _this$event$event;
      return this.chat.getMember(((_this$event = this.event) === null || _this$event === void 0 ? void 0 : (_this$event$sender = _this$event.sender) === null || _this$event$sender === void 0 ? void 0 : _this$event$sender.userId) || ((_this$event2 = this.event) === null || _this$event2 === void 0 ? void 0 : (_this$event2$event = _this$event2.event) === null || _this$event2$event === void 0 ? void 0 : _this$event2$event.sender) || ((_this$event$event = this.event.event) === null || _this$event$event === void 0 ? void 0 : _this$event$event.user_id));
    },
    isMenuAllowed: function () {
      var _this$user, _this$sender, _this$user2;
      return this.streamMode && !this.my && ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.powerLevel) >= this.powerLevel.moderator && ((_this$sender = this.sender) === null || _this$sender === void 0 ? void 0 : _this$sender.powerLevel) < ((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.powerLevel) || !this.streamMode && !this.content.call_id && this.event.event.type !== 'm.room.request_calls_access';
    }
  },
  mounted() {},
  methods: {
    gotoreference: function () {
      var id = this.reference.getId();
      this.$emit("gotoreference", id);
    },
    showwhenburn: function () {
      var text = "";
      if (this.willburn.toDate() < new Date()) {
        text = this.$i18n.t("messagewasburn");
      } else {
        text = this.$i18n.t("messagewillburn");

        //this.willburn.locale(this.$i18n.locale).format('DD MMMM YYYY')
      }

      this.$store.commit("icon", {
        icon: "info",
        message: text
      });
    },
    imagesLoaded: function () {
      this.updatedSize();
    },
    updatedSize: function (before) {
      this.$emit("updatedSize", before);
    },
    dropDownMenuShow: function (e) {
      if (this.streamMode) return;
      if ((e === null || e === void 0 ? void 0 : e.button) === 2) return e.preventDefault();
      setTimeout(() => {
        this.setmenu();
      }, 200);
    },
    prepareShare: function () {
      var sharing = {};
      if (this.content.msgtype === "m.image" && this.imageUrl) sharing.images = [this.imageUrl];
      if (this.content.msgtype === "m.audio" && this.audioUrl) sharing.audio = [this.audioUrl];
      if (this.content.msgtype === "m.text" || this.content.msgtype === "m.encrypted") {
        var trimmed = this.body ? this.$f.trim(this.body) : '';
        if (trimmed) {
          sharing.messages = [trimmed];
        }
      }
      if (this.file) {
        sharing.download = [{
          event: this.event,
          chat: this.chat
        }];
      }
      sharing.from = this.userinfo.id;
      return sharing;
    },
    menushare: function () {
      this.$emit("share", this.prepareShare());
      return Promise.resolve();
    },
    menuedit: function () {
      this.$emit("editing", this.body);
      return Promise.resolve();
    },
    menushowMultiSelect: function () {
      this.$emit("showMultiSelect");
      this.selectMessage();
      return Promise.resolve();
    },
    menureply: function () {
      this.$emit("reply");
      return Promise.resolve();
    },
    menucopy: function () {
      var txt = this.replacedmintionsbody;
      if (window.findAndReplaceLinkClearReverse && (typeof txt === 'string' || txt instanceof String)) txt = window.findAndReplaceLinkClearReverse(txt);
      this.$f.copytext(txt);
      return Promise.resolve();
    },
    menudelete: function () {
      return this.$dialog.confirm("Do you really want to delete message?", {
        okText: this.$i18n.t("yes"),
        cancelText: this.$i18n.t("cancel")
      }).then(dialog => {
        this.$emit("remove");
        return this.core.mtrx.client.redactEvent(this.chat.roomId, this.origin.event.event_id, null, {
          reason: "messagedeleting"
        });
      }).catch(e => {
        return Promise.resolve();
      });
    },
    menuItemClickHandler: function (item, d, p) {
      p.hidePopup();
      this["menu" + item.click]().then(r => {}).catch(e => {
        p.showPopup();
      });
    },
    imagePaddingStyle: function (c) {
      if (c.info && c.info.h && c.info.w) {
        var cc = c.info.h / c.info.w;
        if (cc > 1.7) cc = 1.7;
        var h = "padding-bottom:" + cc * 100 + "%";
        return h;
      }
      return "";
    },
    parser(event) {
      return JSON.parse(event)["og:title"];
    },
    openImage(img) {
      this.$emit("openImg", img);
    },
    format_date(value) {
      if (value) {
        if (moment().diff(value, "days") === 0) {
          return new Date(value).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });
        } else {
          if (moment().year() === moment(value).year()) {
            return moment(value).locale(this.$i18n.locale).format("D MMMM");
          } else {
            return moment(value).locale(this.$i18n.locale).format("D MMMM YYYY");
          }
        }
      }
    },
    download: function () {
      this.$emit("download");
    },
    decryptagain: function () {
      this.$emit("decryptagain");
    },
    openImageGallery(msgEvent) {
      this.$emit("openGalleryImg", msgEvent);
    },
    reshareKeys() {
      let roomId = this.chat.roomId;
    },
    textDonation: function () {
      let withTx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var from = this.$i18n.t("caption.somebody"),
        msg = "";
      try {
        from = this.$f.deep(this, "$store.state.users." + this.content.from).name;
      } catch (err) {}
      var to = this.$i18n.t("caption.somebody");
      try {
        to = this.$f.deep(this, "$store.state.users." + this.content.to).name;
      } catch (err) {}
      msg += from + this.$i18n.t("caption.sent") + this.content.amount + this.$i18n.t("caption.sent") + to;
      return msg;
    },
    menuIsVisibleHandler(isVisible) {
      this.$emit("menuIsVisible", isVisible);
    },
    showreference: function () {
      this.$emit('toreference', this.reference);

      //this.referenceshowed = !this.referenceshowed;
    },

    selectMessage: function () {
      var sharing = this.prepareShare();
      this.$emit("selectMessage", {
        message_id: this.origin.event.event_id,
        sharing,
        time: this.origin._localTimestamp
      });
    },
    removeMessage: function () {
      this.$emit("removeMessage", {
        message_id: this.origin.event.event_id
      });
    },
    eventMessage: function (state) {
      state ? this.removeMessage() : this.selectMessage();
    },
    scrollTo: function () {
      const evtWrp = this.$el.parentElement.parentElement,
        parent = evtWrp.offsetParent;

      /*Scroll eventsflex to message*/
      if (parent) parent.parentNode.scrollTop = evtWrp.offsetTop - parent.offsetTop;
    },
    urlloaded: function (data) {
      /* Parse donation link */

      const holder = data === null || data === void 0 ? void 0 : data.el.find('.txcnt'),
        colors = {
          /* amt: color */
          0.5: "blue",
          0.6: "violette",
          0.7: "cyan",
          0.8: "orange",
          0.9: "pink"
        };
      holder === null || holder === void 0 ? void 0 : holder.on("DOMSubtreeModified", () => {
        const value = parseFloat(holder.find(".output:eq(0) .amount").text());
        if (value > 0) {
          var _this$event3, _this$event3$event, _this$event3$event$un;
          holder.off("DOMSubtreeModified");
          Object.keys(colors).slice().reverse().every(amount => {
            if (value >= amount) {
              this.donationColor = `donation-message donation-color-${colors[amount]}`;
              return false;
            }
            return true;
          });

          /* Play donate animation */
          if (((_this$event3 = this.event) === null || _this$event3 === void 0 ? void 0 : (_this$event3$event = _this$event3.event) === null || _this$event3$event === void 0 ? void 0 : (_this$event3$event$un = _this$event3$event.unsigned) === null || _this$event3$event$un === void 0 ? void 0 : _this$event3$event$un.age) < 5000) {
            if (window.app.platform.donateAnimation) {
              window.app.platform.donateAnimation.inqueue({
                senderName: this.sender.name,
                senderMessage: this.body,
                value: value.toFixed(2)
              });
            }
          }
        }
      });
    },
    urlerror: function (e) {
      this.hasurlerror = e;
    },
    markMatches: function (content) {
      /*Highlight matched text*/
      if (!this.matches || !this.markText) return;
      this.markedText = this.markText(content);

      /*Add highlighted parts to search*/
      this.$nextTick(() => {
        const localMsg = this.origin.localTimestamp !== this.origin.localTimestamp,
          matches = Array.from(this.$el.querySelectorAll("mark"));
        if (localMsg) matches.reverse();
        matches.forEach((mark, id) => {
          if (this.markedText) {
            mark.component = this;
            this.matches[`${localMsg ? "prepend" : "append"}`](mark);
          }
        });
      });
    },
    setmenu: function () {
      if (document.activeElement) document.activeElement.blur();
      /*this.core.menu({
      	items: this.menu(),
      	item: {},
      });*/
      this.menuState.set({
        items: this.menu(),
        item: {}
      });
    },
    menu: function () {
      const type = functions["a" /* default */].deep(this.origin, "event.type") || '',
        menu = [];
      if (!this.streamMode) {
        if (type.indexOf('m.call') === -1) {
          menu.push({
            action: this.menureply,
            text: "button.reply",
            icon: "fas fa-reply"
          });
          menu.push({
            action: this.menushowMultiSelect,
            text: "button.select",
            icon: "fas fa-check-circle"
          });
          menu.push({
            action: this.menushare,
            text: "button.share",
            icon: "fas fa-share-alt"
          });
        }
        if (this.my) {
          menu.push({
            action: this.menudelete,
            text: "button.delete",
            icon: "far fa-trash-alt"
          });
        }
        if (type === "m.room.message") {
          menu.unshift({
            action: this.menucopy,
            text: "button.copy",
            icon: "far fa-copy"
          });
          if (this.my && this.canediting) menu.unshift({
            action: this.menuedit,
            text: "button.edit",
            icon: "far fa-edit"
          });
        }
      } else {
        if (this.user.powerLevel >= this.powerLevel.administrator) {
          menu.push({
            action: () => this.adminActions.toggleModerStatus(this.sender),
            text: `caption.${this.sender.powerLevel === this.powerLevel.moderator ? "cancelModeration" : "makeModerator"}`,
            icon: "fas fa-user-shield"
          });
        }
        if (this.user.powerLevel >= this.powerLevel.moderator) {
          menu.push({
            action: () => this.adminActions.toggleBanStatus(this.sender),
            text: `caption.${this.sender.membership === "ban" ? "removeBan" : "ban"}`,
            icon: "fas fa-user-times"
          });
        }
      }
      return menu;
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/message?vue&type=script&lang=js&
 /* harmony default export */ var event_message_vue_type_script_lang_js_ = (message_vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/events/event/message/index.vue



function message_injectStyles (context) {
  
  var style0 = __webpack_require__("d1e0")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var message_component = Object(componentNormalizer["a" /* default */])(
  event_message_vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  message_injectStyles,
  "be4c3910",
  null
  ,true
)

/* harmony default export */ var message = __webpack_exports__["default"] = (message_component.exports);

/***/ }),

/***/ "27be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_669d2f46_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0d65");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_669d2f46_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_669d2f46_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_669d2f46_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_669d2f46_prod_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "3764":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("74ab");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0efac37c", content, shadowRoot)
};

/***/ }),

/***/ "4021":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1d1f5f54_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3764");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1d1f5f54_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1d1f5f54_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1d1f5f54_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_1d1f5f54_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "436b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6abe0e6a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c712");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6abe0e6a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6abe0e6a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6abe0e6a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6abe0e6a_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "4482":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("cc49");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("24fca705", content, shadowRoot)
};

/***/ }),

/***/ "485a3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_incomingMessage_vue_vue_type_style_index_0_id_69ecb42d_prod_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5ba1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_incomingMessage_vue_vue_type_style_index_0_id_69ecb42d_prod_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_incomingMessage_vue_vue_type_style_index_0_id_69ecb42d_prod_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_incomingMessage_vue_vue_type_style_index_0_id_69ecb42d_prod_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_incomingMessage_vue_vue_type_style_index_0_id_69ecb42d_prod_lang_sass_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "5ba1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7b55");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("7538ea37", content, shadowRoot)
};

/***/ }),

/***/ "696c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ac3d8d66-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/fileMessage/index.vue?vue&type=template&id=50db8103&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "wrapper table"
  }, [_c('div', {
    staticClass: "filecontent"
  }, [_c('div', {
    staticClass: "name"
  }, [_c('span', [_vm._v(_vm._s(_vm.file.name))])]), _c('div', {
    staticClass: "size"
  }, [_c('span', [_vm._v(_vm._s(_vm.humanReadableSize(_vm.file.size)))])]), !_vm.encryptedData ? _c('div', {
    staticClass: "download"
  }, [_c('a', {
    staticClass: "fileMessage",
    attrs: {
      "href": _vm.file.url,
      "download": _vm.download,
      "target": "_external"
    }
  }, [_c('button', {
    staticClass: "button small rounded"
  }, [!_vm.downloaded ? _c('span', [_vm._v(_vm._s(_vm.$t("button.download")))]) : _c('span', [_vm._v(_vm._s(_vm.$t("button.downloaded")))])])])]) : _c('div', {
    staticClass: "download"
  }, [_c('button', {
    staticClass: "button small rounded",
    on: {
      "click": _vm.download
    }
  }, [!_vm.downloaded ? _c('span', [_vm._v(_vm._s(_vm.$t("button.download")))]) : _c('span', [_vm._v(_vm._s(_vm.$t("button.downloaded")))])])])]), _c('div', {
    staticClass: "icon"
  }, [_c('a', {
    staticClass: "fileMessage",
    attrs: {
      "href": _vm.file.url,
      "download": _vm.download,
      "target": "_external"
    }
  }, [_c('i', {
    staticClass: "fas fa-file-download"
  })])])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/events/event/fileMessage/index.vue?vue&type=template&id=50db8103&scoped=true&

// EXTERNAL MODULE: ./src/application/functions.js
var functions = __webpack_require__("3139");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/events/event/fileMessage/index.vue?vue&type=script&lang=js&

/* harmony default export */ var fileMessagevue_type_script_lang_js_ = ({
  props: {
    preview: Object,
    file: Object,
    encryptedData: Boolean,
    downloaded: Boolean
  },
  computed: {
    getExtension: function (file) {
      var name = file.name.split(".");
      var ext = name[name.length - 1].toLowerCase();
      return ext;
    }
  },
  methods: {
    humanReadableSize(data) {
      return functions["a" /* default */].formatBytes(data);
    },
    download() {
      this.$emit("download");
    }
  }
});
// CONCATENATED MODULE: ./src/components/events/event/fileMessage/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var event_fileMessagevue_type_script_lang_js_ = (fileMessagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/events/event/fileMessage/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("dfd5")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  event_fileMessagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "50db8103",
  null
  ,true
)

/* harmony default export */ var fileMessage = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "6a2f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6b2b4e91_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("744e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6b2b4e91_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6b2b4e91_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6b2b4e91_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6b2b4e91_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "6ca2":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".request[data-v-669d2f46]{display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:rgb(var(--background-secondary-theme));margin:0 10px;border-radius:12px;padding:1em;border:solid rgb(var(--neutral-grad-1)) 1px}.request[data-v-669d2f46],.request .image[data-v-669d2f46]{width:100%}.request .title[data-v-669d2f46]{font-size:1.2em;font-weight:500;text-align:left;margin:1em 0}.request .description[data-v-669d2f46]{text-align:left;color:#f2994a;margin:.6em 0;font-size:.8em;width:100%}.request .description i[data-v-669d2f46]{margin:5px;color:rgb(var(--color-star-yellow));font-size:2.1em}.request .options[data-v-669d2f46]{display:flex;justify-content:space-evenly;width:100%;max-width:350px}.request .options .btn[data-v-669d2f46]{background:rgb(var(--color-bg-ac-bright));color:rgb(var(--text-on-bg-ac-color));border:1px solid rgb(var(--color-bg-ac-bright));padding:.5em 2em;font-size:.8em;text-align:center;font-weight:600;border-radius:8px;transition:.3s;cursor:pointer;margin:1em 0 0;width:130px;max-width:40%}.request .options .btn.bad[data-v-669d2f46]{background-color:#eb5757;border-color:#eb5757}@media (pointer:fine){.request .options .btn.bad[data-v-669d2f46]:hover{background:transparent;color:#eb5757}}@media (pointer:fine){.request .options .btn[data-v-669d2f46]:hover{background:transparent;color:rgb(var(--color-bg-ac-bright))}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "6e24":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05cd0480_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17bb");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05cd0480_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05cd0480_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05cd0480_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_05cd0480_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "6f52":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".voiceMessage[data-v-6293e3d8]{-webkit-tap-highlight-color:transparent;display:flex;contain:strict;width:230px;height:100%;height:50px}.voiceMessage_wrapper[data-v-6293e3d8]{display:flex;justify-content:flex-end;align-items:center;overflow:hidden;min-width:10em;padding:0 .5em;border-radius:2em;background:rgba(var(--neutral-grad-1),.8)}.voiceMessage_toggle[data-v-6293e3d8]{cursor:pointer;height:33px;width:33px;min-width:33px;margin-right:.5em;border-radius:50%;background:rgba(var(--neutral-grad-2),.25);display:flex;align-items:center;justify-content:center;color:rgb(var(--color-bg-ac))}.voiceMessage_toggle i[data-v-6293e3d8]{margin-top:2px;margin-left:2px;font-size:.5em}.voiceMessage_graph[data-v-6293e3d8]{position:relative;cursor:pointer}.voiceMessage_options[data-v-6293e3d8]{display:flex;justify-content:center;margin-left:.5em;padding:.125em .5em;min-width:2em;background:rgba(var(--neutral-grad-2),.25);border-radius:1em}.voiceMessage_options span[data-v-6293e3d8]{font-size:.8em;color:rgb(var(--neutral-grad-3))}.voiceMessage.playing .voiceMessage_options span[data-v-6293e3d8]{font-size:.8em;color:rgb(var(--color-bg-ac-bright))}.voiceMessage .fa-exclamation-circle[data-v-6293e3d8]{font-size:.7em;color:rgb(var(--color-bad));padding:.5em}.voiceMessage .encsign[data-v-6293e3d8]{display:flex;align-items:center;margin-left:.5em}.voiceMessage .encsign i[data-v-6293e3d8]{font-size:.5em;color:rgb(var(--neutral-grad-2));opacity:.6}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "744e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("dd2a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("8682c56e", content, shadowRoot)
};

/***/ }),

/***/ "74ab":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "br[data-v-1d1f5f54]{content:\"\"}.sname[data-v-1d1f5f54]{font-weight:700}.listPreview[data-v-1d1f5f54]{display:flex;align-items:center}.statusWrapper[data-v-1d1f5f54]{padding-left:.5em}.statusWrapper .my[data-v-1d1f5f54]{font-size:.6em;opacity:.5}.previewMessage[data-v-1d1f5f54]{min-height:25px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "7b55":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "label[data-v-69ecb42d]{cursor:pointer;display:inline}.likelink[data-v-69ecb42d]{text-decoration:underline;cursor:pointer}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9473":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".preloaderWrapperLocal[data-v-6abe0e6a]{padding:.5em 0;text-align:center}.urlwrapper[data-v-6abe0e6a]{margin-top:.25em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "b21f":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("bd53");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("5b7b48c2", content, shadowRoot)
};

/***/ }),

/***/ "bd53":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".wrapper>div[data-v-50db8103]{padding:.5em;vertical-align:middle}.wrapper .icon[data-v-50db8103]{width:60px;text-align:center;background:rgb(var(--neutral-grad-0))}.wrapper .icon i[data-v-50db8103]{font-size:1.2em;opacity:.8}.wrapper .filecontent span[data-v-50db8103]{font-size:.8em}.wrapper .filecontent div[data-v-50db8103]{max-width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.wrapper .filecontent .size[data-v-50db8103]{color:rgb(var(--color-txt-ac))}.wrapper .filecontent button.button[data-v-50db8103]{padding:.25em;margin-top:.5em}.wrapper .filecontent button.button.downloaded[data-v-50db8103]{background:rgb(var(--color-good));border-color:rgb(var(--color-good));color:rgb(var(--text-on-bg-ac-color))}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "c712":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9473");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("79924902", content, shadowRoot)
};

/***/ }),

/***/ "cc49":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".referenceTop[data-v-be4c3910]{margin-left:.25em;margin-right:.25em;border-radius:10px;border-bottom-left-radius:0;overflow:hidden;margin-bottom:.5em}.referenceTop.my[data-v-be4c3910]{border-bottom-right-radius:0;border-bottom-left-radius:10px}.actionsWrapper[data-v-be4c3910]{opacity:1}.actionsWrapper .setmenu[data-v-be4c3910]{padding:.5em 0}.actionsWrapper i.fa-check-circle[data-v-be4c3910]{color:rgb(var(--color-txt-ac));opacity:1!important}.actionsWrapper .mnwrapper[data-v-be4c3910]{transition:\"opacity\" .3s}.actionsWrapper .multiSelect[data-v-be4c3910]{position:absolute;top:50%;transform:translateY(-50%);left:0;padding:.5em;z-index:1;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center}.actionsWrapper .multiSelect:hover i[data-v-be4c3910]{opacity:1}@media (pointer:fine){.messageRow:hover .actionsWrapper .mnwrapper[data-v-be4c3910]{opacity:1}}.burn.big[data-v-be4c3910]{color:rgb(var(--color-bad))}.burn.medium[data-v-be4c3910]{opacity:.8}.showImage[data-v-be4c3910]{width:100%;position:relative;overflow:hidden}.showImage .abswrapper[data-v-be4c3910]{position:absolute;left:0;top:0;bottom:0;right:0;display:flex;text-align:center;align-items:center;justify-content:center}.preloaderImage[data-v-be4c3910]{padding-bottom:100px;border-radius:10px;background:rgba(var(--neutral-grad-0),.5);width:100%;position:relative}.preloaderImage .abswrapper[data-v-be4c3910]{position:absolute;left:0;top:0;bottom:0;right:0;display:flex;text-align:center;align-items:center;justify-content:center}.preloaderImage .abswrapper>div[data-v-be4c3910]{opacity:.2}.statusWrapper[data-v-be4c3910]{padding:.5em;margin-top:.5em;border-top:.5em solid rgb(var(--neutral-grad-0))}.statusWrapper .my[data-v-be4c3910]{font-size:.7em;opacity:.5;text-align:center}.fade-enter-active[data-v-be4c3910]{transition:.3s}.fade-enter-from[data-v-be4c3910]{opacity:0}.messageRow[data-v-be4c3910]{display:flex;align-items:flex-end;padding-left:.25em;min-height:34px;position:relative}.messageRow.aligncenter[data-v-be4c3910]{align-items:center}.messageRow[data-v-be4c3910] .call{border-bottom-left-radius:0;margin-left:.25em}.messageRow.my[data-v-be4c3910]{padding-left:0;padding-right:.25em}.messageRow.my[data-v-be4c3910] .call{border-top-right-radius:0;border-bottom-left-radius:1em}.messageRow.my .messageImg .imgMsg .showImage .abswrapper[data-v-be4c3910]{border-radius:1em;border-top-right-radius:0;border-top-left-radius:1em}.messageRow .maxcontent[data-v-be4c3910],.messageRow .maxcontent.my[data-v-be4c3910]{max-width:72%}.messageRow.allscreen[data-v-be4c3910]{flex-wrap:wrap;transition:background .3s}.messageRow.allscreen .userpic[data-v-be4c3910]{position:relative}.messageRow.allscreen .userpic[data-v-be4c3910]:after{border-radius:50%;content:\"\";position:absolute;left:-5px;right:-5px;top:-5px;bottom:-5px;border:5px solid rgb(var(--neutral-grad-0));z-index:1;box-shadow:0 5px 7px -5px rgba(var(--color-shadow-base),.7)}.messageRow .badenctyptedText .decryptagain[data-v-be4c3910]{font-size:.8em}.messageRow .metaMsg[data-v-be4c3910]{width:100%}.messageRow .badencrypted[data-v-be4c3910]{position:absolute;background:rgb(var(--background-main));left:0;right:0;top:0;bottom:0;padding:.5em}.messageRow .encryptedDataIcon[data-v-be4c3910]{position:absolute;color:rgb(var(--text-on-bg-ac-color));opacity:.3;padding:.25em .5em;text-shadow:0 0 2px rgba(var(--color-shadow-base),.714),0 0 3px rgba(var(--color-shadow-base),.519);left:0;top:0;z-index:1}.messageRow .encryptedDataIcon i[data-v-be4c3910]{font-size:.7em}.messageRow .filePreview .encryptedDataIcon[data-v-be4c3910]{color:rgb(var(--neutral-grad-2));text-shadow:none;right:0;left:auto}.messageRow .messageAudio[data-v-be4c3910]{margin-left:.25em;display:flex;align-items:center}.messageRow .messageAudio .reference[data-v-be4c3910]{margin-right:0;max-width:30px;margin-bottom:0}.messageRow .messageAudio .reference i[data-v-be4c3910]{line-height:28px}.messageRow .messageAudio .reference .event[data-v-be4c3910]{display:none;max-width:20px}.messageRow .messageImg[data-v-be4c3910]{width:85%;position:relative;margin-top:.125em}.messageRow .messageImg .img[data-v-be4c3910]{display:block;border-radius:.5em;position:relative;max-width:100%}.messageRow .messageImg .loadingImg[data-v-be4c3910]{display:flex;align-items:center;justify-content:center;border-radius:.5em;position:relative;max-width:300px;height:250px}.messageRow .messageImg .loadingImg .imgPreview[data-v-be4c3910]{border-radius:.5em;position:relative;max-width:100%;height:100%;opacity:.6}.messageRow .messageImg .loadingImg .clipLoader[data-v-be4c3910]{position:absolute;z-index:9999;left:50%;right:0;top:50%;bottom:0;transform:translate(-50,50);display:flex;align-items:center;justify-content:center}.messageRow .messageImg .imgMsg .showImage[data-v-be4c3910]{display:flex}.messageRow .messageImg .imgMsg img[data-v-be4c3910]{max-width:100%;-o-object-fit:cover;object-fit:cover;display:block}.messageRow .messageImg .imgMsg .abswrapper[data-v-be4c3910]{border-radius:1em;border-top-left-radius:0;overflow:hidden;background:rgb(var(--neutral-grad-0))}.messageRow .messageImg .metaLink[data-v-be4c3910]{background:#000}.messageRow .messageImg .metaLink .metaMessageLink .metaTitle[data-v-be4c3910]{font-weight:700;font-size:.9em}.messageRow .messageImg .metaLink .metaMessageLink .metaDescription[data-v-be4c3910]{margin:.5em 0;font-size:.8em}.messageRow .messageImg .metaLink .metaMessageLink .metaImgWrapper[data-v-be4c3910]{display:block;max-width:300px;-o-object-fit:cover;object-fit:cover}.messageRow .messageImg .metaLink .metaMessageLink .metaImgWrapper img[data-v-be4c3910]{display:block;width:100%;height:100%}.messageRow .filePreview[data-v-be4c3910]{width:90%;border:1px solid rgb(var(--neutral-grad-1));overflow:hidden;border-radius:10px;position:relative;margin-top:.5em;height:100px}.messageRow .filePreview .table[data-v-be4c3910]{height:100%}.messageRow .linkPreview[data-v-be4c3910]{width:100%}.messageRow .messagePreview[data-v-be4c3910]{width:100%;overflow:hidden;text-overflow:ellipsis}.messageRow .messagePreview span[data-v-be4c3910]{word-break:break-all;white-space:normal}.messageRow .fromimagesfiles[data-v-be4c3910]{display:flex;order:3;padding:0;line-height:33px;padding-right:.5em}.messageRow .fromimagesfiles .fromCaption[data-v-be4c3910]{white-space:nowrap;max-width:240px;overflow:hidden;text-overflow:ellipsis}.messageRow .actionsWrapper[data-v-be4c3910]{order:4;padding-left:.5em;padding-right:.5em;cursor:pointer;text-align:right;margin-left:auto;display:flex;align-items:center;line-height:33px}.messageRow .actionsWrapper i[data-v-be4c3910]{opacity:.3;transition:opacity .3s}.messageRow .actionsWrapper i.fa-ellipsis-h[data-v-be4c3910]{font-size:.7em;padding:.5em}.messageRow .actionsWrapper i[data-v-be4c3910]:hover{opacity:1;transition:opacity .3s}.messageRow .statusWrapper[data-v-be4c3910]{order:5;padding:.5em .25em;opacity:.6}.messageRow .statusWrapper div[data-v-be4c3910],.messageRow .statusWrapper span[data-v-be4c3910]{font-size:.7em}.messageRow .sendername[data-v-be4c3910]{order:3;opacity:.6;overflow:hidden;font-size:.7em}.messageRow .sendername .b[data-v-be4c3910]{font-weight:700}.messageRow .timeWrapper[data-v-be4c3910]{text-align:left;order:2;padding:0 .25em;line-height:33px;opacity:.6;flex-grow:1}.messageRow .timeWrapper span[data-v-be4c3910]{white-space:nowrap;font-size:.7em}.messageRow .showreference[data-v-be4c3910]{cursor:pointer}.messageRow.referenceshowed .messageText[data-v-be4c3910]{background:rgba(var(--neutral-grad-1),.8)!important;color:rgb(var(--color-txt-gray))!important}.messageRow.referenceshowed .reference[data-v-be4c3910]{padding-bottom:0!important}.messageRow.referenceshowed .referenceCaption button[data-v-be4c3910]{width:100%}.messageRow .reference[data-v-be4c3910]{height:32px}.messageRow .from[data-v-be4c3910],.messageRow .reference[data-v-be4c3910]{opacity:.8;border-bottom:1px solid rgb(var(--text-on-bg-ac-color));padding:.5em 0;padding-top:0;margin-bottom:.5em;display:flex}.messageRow .from .event[data-v-be4c3910],.messageRow .reference .event[data-v-be4c3910]{max-height:38px;text-align:left}.messageRow .from i[data-v-be4c3910],.messageRow .reference i[data-v-be4c3910]{width:30px;text-align:center;font-size:.8em}.messageRow .from .referenceCaption[data-v-be4c3910],.messageRow .reference .referenceCaption[data-v-be4c3910]{min-width:28px;font-size:.8em}.messageRow .from .sendername[data-v-be4c3910],.messageRow .reference .sendername[data-v-be4c3910]{white-space:nowrap}.messageRow .from[data-v-be4c3910] .messagePreview,.messageRow .reference[data-v-be4c3910] .messagePreview{font-size:.9em;height:22px}.messageRow .from[data-v-be4c3910] .messagePreview .previewMessage,.messageRow .reference[data-v-be4c3910] .messagePreview .previewMessage{display:flex;white-space:nowrap}.messageRow .messageText[data-v-be4c3910]{margin-left:.25em;background:rgba(var(--neutral-grad-1),.8);color:rgb(var(--text-color));padding:.5em .75em;padding-top:.5em;border-radius:1em;border-bottom-left-radius:0;font-weight:400;white-space:normal;display:flex;flex-direction:column-reverse}.messageRow .messageText[data-v-be4c3910] .msgtext{text-align:left;white-space:pre-wrap;word-wrap:break-word}.messageRow .messageText .edited[data-v-be4c3910]{font-size:.7em;opacity:.5;text-align:right}.messageRow .messageText div[data-v-be4c3910]{overflow:hidden;text-overflow:ellipsis}.messageRow .badenctyptedText[data-v-be4c3910]{margin-left:.5em;color:rgb(var(--text-on-bg-ac-color));padding:.5em .75em;border-radius:1em;background:rgb(var(--neutral-grad-3));word-break:break-all;white-space:normal}.messageRow .badenctyptedText span[data-v-be4c3910]{font-size:.9em}.messageRow .iconWrapper[data-v-be4c3910]{width:33px;min-width:33px}.messageRow .withsendername[data-v-be4c3910]{position:relative}.messageRow .withsendername .sendername[data-v-be4c3910]{position:absolute;top:100%;margin-top:-5px;left:20px;color:rgb(var(--neutral-grad-3))}.messageRow .withsendername .sendername span[data-v-be4c3910]{font-size:.7em}.messageRow[my=true][data-v-be4c3910]{justify-content:flex-end;flex-wrap:wrap}.messageRow[my=true] .iconWrapper[data-v-be4c3910]{margin-left:.5em;order:1;align-self:flex-start}.messageRow[my=true] .fromimagesfiles[data-v-be4c3910]{order:-3}.messageRow[my=true] .actionsWrapper[data-v-be4c3910]{text-align:left;margin-right:auto;margin-left:0;padding-left:.75em;padding-right:.25em;order:-4}.messageRow[my=true] .statusWrapper[data-v-be4c3910]{order:-3}.messageRow[my=true] .timeWrapper[data-v-be4c3910]{order:-2;text-align:right}.messageRow[my=true] .messageText[data-v-be4c3910]{background:rgb(var(--color-bg-ac-bright));color:rgb(var(--text-on-bg-ac-color));text-align:right;border:0;border-radius:1em;border-bottom-left-radius:1em;border-top-right-radius:0}.messageRow[my=true] .messageAudio[data-v-be4c3910]{margin-left:0}.messageRow[my=true] .messageAudio[data-v-be4c3910] .voiceMessage_options,.messageRow[my=true] .messageAudio[data-v-be4c3910] .voiceMessage_wrapper{border-top-right-radius:0}.messageRow[my=true] .messageAudio[data-v-be4c3910] .voiceMessage{justify-content:flex-end}.messageRow.urlpreview[data-v-be4c3910]{background:rgb(var(--background-total-theme));padding:.5em;padding-left:.25em}.messageRow.urlpreview .actionsWrapper[data-v-be4c3910]{padding-right:.5em;padding-left:.5em}.messageRow.allscreen .filePreview[data-v-be4c3910],.messageRow.allscreen .linkPreview[data-v-be4c3910],.messageRow.allscreen .messageImg[data-v-be4c3910],.messageRow.allscreen .metaMsg[data-v-be4c3910]{order:4;padding-left:.125em}.messageRow.allscreen[my=true] .filePreview[data-v-be4c3910],.messageRow.allscreen[my=true] .linkPreview[data-v-be4c3910],.messageRow.allscreen[my=true] .messageImg[data-v-be4c3910],.messageRow.allscreen[my=true] .metaMsg[data-v-be4c3910]{order:6}.messageRow.not-preview[data-v-be4c3910]{align-items:center;justify-content:center;color:rgb(var(--neutral-grad-3));text-align:center;flex-direction:column-reverse}.messageRow.not-preview .messageNoticeWithLink[data-v-be4c3910]{color:#004680}.eventWrapper .fromCaption[data-v-be4c3910]{font-size:.8em}.fromimagesfiles .fromCaption[data-v-be4c3910]{text-align:center}.fromimagesfiles .fromCaption i[data-v-be4c3910]{width:30px;text-align:center;font-size:.8em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "d1e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_be4c3910_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4482");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_be4c3910_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_be4c3910_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_be4c3910_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_index_sass_vue_type_style_index_0_id_be4c3910_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "dd2a":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".call[data-v-6b2b4e91]{display:flex;align-items:center;width:200px;height:3em;padding:.25em;border-radius:1em;background-color:rgba(var(--neutral-grad-1),.8)}.call.bad .call-icon[data-v-6b2b4e91]{color:rgb(var(--color-bad))}.call.my[data-v-6b2b4e91]{background-color:rgb(var(--color-bg-ac-bright));color:rgb(var(--text-on-bg-ac-color))}.call.my.bad[data-v-6b2b4e91]{background-color:rgb(var(--color-bad))}.call.my.ended[data-v-6b2b4e91]{background-color:rgba(var(--neutral-grad-1),.8);color:rgb(var(--text-color))}.call.my.ended .call-icon[data-v-6b2b4e91]{color:rgb(var(--color-bg-ac-bright))}.call.my .call-icon[data-v-6b2b4e91]{color:rgb(var(--text-on-bg-ac-color))}.call-icon[data-v-6b2b4e91]{display:flex;justify-content:center;align-items:center;width:2.5em;height:2.5em;background:rgba(0,0,0,.06);border-radius:.83em;color:rgb(var(--color-bg-ac-bright))}.call-icon.ended i[data-v-6b2b4e91]{transform:rotate(-135deg)}.call-icon i[data-v-6b2b4e91]{transform:rotate(90deg)}.call-info[data-v-6b2b4e91]{margin-left:.5em;flex-grow:2;text-align:left;font-weight:600;font-size:.8em;display:flex;flex-direction:column}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "dfd5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50db8103_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b21f");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50db8103_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50db8103_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50db8103_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_50db8103_prod_scoped_true_lang_sass___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);