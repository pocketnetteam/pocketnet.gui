/*!
 * ImagesLoadedPN PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if ( typeof define == 'function' && define.amd ) {
      // AMD - RequireJS
      define( 'ev-emitter/ev-emitter',factory );
    } else if ( typeof module == 'object' && module.exports ) {
      // CommonJS - Browserify, Webpack
      module.exports = factory();
    } else {
      // Browser globals
      global.EvEmitter = factory();
    }
  
  }( typeof window != 'undefined' ? window : this, function() {
  
  
  
  function EvEmitter() {}
  
  var proto = EvEmitter.prototype;
  
  proto.on = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[ eventName ] = events[ eventName ] || [];
    // only add once
    if ( listeners.indexOf( listener ) == -1 ) {
      listeners.push( listener );
    }
  
    return this;
  };
  
  proto.once = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // add event
    this.on( eventName, listener );
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
    // set flag
    onceListeners[ listener ] = true;
  
    return this;
  };
  
  proto.off = function( eventName, listener ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    var index = listeners.indexOf( listener );
    if ( index != -1 ) {
      listeners.splice( index, 1 );
    }
  
    return this;
  };
  
  proto.emitEvent = function( eventName, args ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[ eventName ];
  
    for ( var i=0; i < listeners.length; i++ ) {
      var listener = listeners[i]
      var isOnce = onceListeners && onceListeners[ listener ];
      if ( isOnce ) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off( eventName, listener );
        // unset once flag
        delete onceListeners[ listener ];
      }
      // trigger listener
      listener.apply( this, args );
    }
  
    return this;
  };
  
  proto.allOff = function() {
    delete this._events;
    delete this._onceEvents;
  };
  
  return EvEmitter;
  
  }));
  
  /*!
   * ImagesLoadedPN v4.1.4
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */
  
  ( function( window, factory ) { 'use strict';
    // universal module definition
  
    /*global define: false, module: false, require: false */
  
    if ( typeof define == 'function' && define.amd ) {
      // AMD
      define( [
        'ev-emitter/ev-emitter'
      ], function( EvEmitter ) {
        return factory( window, EvEmitter );
      });
    } else if ( typeof module == 'object' && module.exports ) {
      // CommonJS
      module.exports = factory(
        window,
        require('ev-emitter')
      );
    } else {
      // browser global
      window.imagesLoadedPN = factory(
        window,
        window.EvEmitter
      );
    }
  
  })( typeof window !== 'undefined' ? window : this,
  
  // --------------------------  factory -------------------------- //
  
  function factory( window, EvEmitter ) {
  
  
  
  var $ = window.jQuery;
  var console = window.console;
  var app;
  
  // -------------------------- helpers -------------------------- //
  
  // extend objects
  function extend( a, b ) {
    for ( var prop in b ) {
      a[ prop ] = b[ prop ];
    }
    return a;
  }
  
  var arraySlice = Array.prototype.slice;
  
  // turn element or nodeList into an array
  function makeArray( obj ) {
    if ( Array.isArray( obj ) ) {
      // use object if already an array
      return obj;
    }
  
    var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
    if ( isArrayLike ) {
      // convert nodeList to array
      return arraySlice.call( obj );
    }
  
    // array of single index
    return [ obj ];
  }
  
  // -------------------------- ImagesLoadedPN -------------------------- //
  
  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoadedPN( elem, options, onAlways, appArg ) {
    if (appArg)
      app = appArg;
    // coerce ImagesLoadedPN() without new, to be new ImagesLoadedPN()
    if ( !( this instanceof ImagesLoadedPN ) ) {
      return new ImagesLoadedPN( elem, options, onAlways, appArg );
    }
    // use elem as selector string
    var queryElem = elem;
    if ( typeof elem == 'string' ) {
      queryElem = document.querySelectorAll( elem );
    }
    // bail if bad element
    if ( !queryElem ) {
      console.error( 'Bad element for ImagesLoadedPN ' + ( queryElem || elem ) );
      return;
    }
  
    this.elements = makeArray( queryElem );
    this.options = extend( {}, this.options );
    // shift arguments if no options set
    if ( typeof options == 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }
  
    if ( onAlways ) {
      this.on( 'always', onAlways );
    }
  
    this.getImages();
  
    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    //this.check()
  
    // HACK check async to allow time to bind listeners
    setTimeout( this.check.bind( this ) );
  }
  
  ImagesLoadedPN.prototype = Object.create( EvEmitter.prototype );
  
  ImagesLoadedPN.prototype.options = {};
  
  ImagesLoadedPN.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    this.elements.forEach( this.addElementImages, this );
  };
  
  /**
   * @param {Node} element
   */
  ImagesLoadedPN.prototype.addElementImages = function( elem ) {
    // filter siblings
    if ( elem.nodeName == 'IMG' ) {
      this.addImage( elem );
    }
    // get background image on element
    if ( this.options.background === true ) {
      this.addElementBackgroundImages( elem );
    }

    if(this.options.imageAttr === true ){
        this.addImageAttrImages(elem)
    }
    
    // find children
    // no non-element nodes, #143
    var nodeType = elem.nodeType;
    if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
      return;
    }

    var childImgs = elem.querySelectorAll('img');
    // concat childElems to filterFound array
    for ( var i=0; i < childImgs.length; i++ ) {
      var img = childImgs[i];
      this.addImage( img );
    }
  
    // get child background images
    if ( typeof this.options.background == 'string' ) {
        var children = elem.querySelectorAll( this.options.background );
        for ( i=0; i < children.length; i++ ) {
          var child = children[i];
          this.addElementBackgroundImages( child );
        }
      }

      // get child background images
    if ( typeof this.options.imageAttr == 'string' ) {
        var children = elem.querySelectorAll( this.options.imageAttr );
        for ( i=0; i < children.length; i++ ) {
          var child = children[i];
          this.addImageAttrImages( child );
        }
      }
  };
  
  var elementNodeTypes = {
    1: true,
    9: true,
    11: true
  };
  
  ImagesLoadedPN.prototype.addElementBackgroundImages = function( elem ) {

    var style = getComputedStyle( elem );
    if ( !style ) {
      // Firefox returns null if in a hidden iframe https://bugzil.la/548397
      return;
    }
    // get url inside url("...")
    var reURL = /url\((['"])?(.*?)\1\)/gi;
    var matches = reURL.exec( style.backgroundImage );
    while ( matches !== null ) {
      var url = matches && matches[2];
      if ( url ) {
        this.addBackground( url, elem );
      }
      matches = reURL.exec( style.backgroundImage );
    }
  };

  ImagesLoadedPN.prototype.addImageAttrImages = function( elem ) {

    var url = elem.getAttribute('image'), self = this

    if (url) url == '*' ? url = elem.getAttribute('data-image') : elem.setAttribute('data-image', url)

    if(!url) {
      elem.setAttribute('imageloaded', 'true')
      return
    }

    var ban = (elem.getAttribute('ban') || '').split(',')

    if (ban.length){
      if(ban.find(function(el){
        return url.indexOf(el) > -1
      })){
        url = 'img/imagenotuploaded.jpg'
      }
    }

    url = url.replace('bastyon.com:8092', 'pocketnet.app:8092').replace('test.pocketnet', 'pocketnet')

    if (app){

      url = app.peertubeHandler.helpers.url(url)

      var img = this.addImageAttr(url, elem);

      img.applyStyle();
      
    }

    else {
      this.addImageAttr(url, elem);
    }

    
  };
  
  /**
   * @param {Image} img
   */
  ImagesLoadedPN.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };
  
  ImagesLoadedPN.prototype.addBackground = function( url, elem ) {
    var background = new Background( url, elem );
    this.images.push( background );
  };

  ImagesLoadedPN.prototype.addImageAttr = function( url, elem ) {

    var imageAttrImage = new ImageAttrImage( url, elem );
    this.images.push( imageAttrImage );
    return imageAttrImage;
  };
  
  ImagesLoadedPN.prototype.check = function() {
    var _this = this;
    this.progressedCount = 0;
    this.hasAnyBroken = false;
    // complete if no images

    if ( !this.images.length ) {
      this.complete();
      return;
    }
  
    function onProgress( image, elem, message ) {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout( function() {
        _this.progress( image, elem, message );
      });
    }
  
    this.images.forEach( function( loadingImage ) {
      loadingImage.once( 'progress', onProgress );
      loadingImage.check();
    });
  };
  
  ImagesLoadedPN.prototype.progress = function( image, elem, message ) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // progress event
    this.emitEvent( 'progress', [ this, image, elem ] );
    if ( this.jqDeferred && this.jqDeferred.notify ) {
      this.jqDeferred.notify( this, image );
    }
    // check if completed
    if ( this.progressedCount == this.images.length ) {
      this.complete();
    }
 
  };
  
  ImagesLoadedPN.prototype.complete = function() {

    if(this.isComplete) return

    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emitEvent( eventName, [ this ] );
    this.emitEvent( 'always', [ this ] );


    if ( this.jqDeferred ) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[ jqMethod ]( this );
    }
  };
  
  // --------------------------  -------------------------- //
  
  function LoadingImage( img ) {
    this.img = img;
  }
  
  LoadingImage.prototype = Object.create( EvEmitter.prototype );
  
  LoadingImage.prototype.check = function() {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    var isComplete = this.getIsImageComplete();
    if ( isComplete ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }
  
    // If none of the checks above matched, simulate loading on detached element.
    this.proxyImage = new Image();
    this.proxyImage.addEventListener( 'load', this );
    this.proxyImage.addEventListener( 'error', this );
    // bind to image as well for Firefox. #191
    this.img.addEventListener( 'load', this );
    this.img.addEventListener( 'error', this );
    this.proxyImage.src = this.img.src;
  };
  
  LoadingImage.prototype.getIsImageComplete = function() {
    // check for non-zero, non-undefined naturalWidth
    // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
    return this.img.complete && this.img.naturalWidth;
  };
  
  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emitEvent( 'progress', [ this, this.img, message ] );
  };
  
  // ----- events ----- //
  
  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };
  
  LoadingImage.prototype.onload = function() {
    this.confirm( true, 'onload' );
    this.unbindEvents();
  };
  
  LoadingImage.prototype.onerror = function() {
    this.confirm( false, 'onerror' );
    this.unbindEvents();
  };
  
  LoadingImage.prototype.unbindEvents = function() {
    this.proxyImage.removeEventListener( 'load', this );
    this.proxyImage.removeEventListener( 'error', this );
    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );
  };


  // -------------------------- ImageAttrImage -------------------------- //
  
  function ImageAttrImage( url, element ) {

    this.url = url;

    this.element = element;
    this.img = new Image();

  }
  
  // inherit LoadingImage prototype
  ImageAttrImage.prototype = Object.create( LoadingImage.prototype );
  
  ImageAttrImage.prototype.check = function() {

    this.img.addEventListener( 'load', this );
    this.img.addEventListener( 'error', this );
    this.img.src = this.url;
    // check if image is already complete
    var isComplete = this.getIsImageComplete();
    
    if ( isComplete ) {

      this.unbindEvents();

      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
        
    }
  };

  ImageAttrImage.prototype.applyStyle = function() {
    
    //this.element.style['contain'] = 'strict'
    this.element.setAttribute('image', '*')
    this.element.style['background-image'] = 'url('+this.url+')';
    this.element.style['background-size'] = 'cover';
    this.element.style['background-position'] = 'center center';
    this.element.style['background-repeat'] = 'no-repeat';

  };
  
  ImageAttrImage.prototype.unbindEvents = function() {

    this.applyStyle();   

    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );

  };
  
  ImageAttrImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emitEvent( 'progress', [ this, this.element, message ] );

    if(isLoaded){
      this.element.setAttribute('imageloaded', 'true')
    }
  };
  
  // -------------------------- Background -------------------------- //
  
  function Background( url, element ) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  }
  
  // inherit LoadingImage prototype
  Background.prototype = Object.create( LoadingImage.prototype );
  
  Background.prototype.check = function() {
    this.img.addEventListener( 'load', this );
    this.img.addEventListener( 'error', this );
    this.img.src = this.url;
    // check if image is already complete
    var isComplete = this.getIsImageComplete();
    if ( isComplete ) {
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      this.unbindEvents();
    }
  };
  
  Background.prototype.unbindEvents = function() {
    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );
  };
  
  Background.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emitEvent( 'progress', [ this, this.element, message ] );
  };
  
  // -------------------------- jQuery -------------------------- //
  
  ImagesLoadedPN.makeJQueryPlugin = function( jQuery ) {
    jQuery = jQuery || window.jQuery;
    if ( !jQuery ) {
      return;
    }
    // set local variable
    $ = jQuery;
    // $().ImagesLoadedPN()
    $.fn.imagesLoadedPN = function( options, callback, appArg ) {
      var instance = new ImagesLoadedPN( this, options, callback, appArg );
      return instance.jqDeferred.promise( $(this) );
    };
  };
  // try making plugin
  ImagesLoadedPN.makeJQueryPlugin();
  
  // --------------------------  -------------------------- //
  
  return ImagesLoadedPN;
  
  });
  