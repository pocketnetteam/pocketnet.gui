/**
 * Shadow popup
 * Developed By Michael Levinez
 *
 * @class ShadowPopup
 *
 * version 1.0.0
 */
class ShadowPopup {
  /**
   * Class defaults
   */
  popup;
  
  options = { /*Can be {...} || { url: './....js' } to file with options = {...}*/
    shadowParent: null, /*Shadow can be attachable to any element*/
    shadowMode: 'open', /*Can be open || closed*/
    
    template: null, /*Can be '<div>...</div>' || { url: './....tpl' } || null*/
    variables: {
      /*Variables for replacement in template*/
      /*{%heading%}
        {%content%}
        {%buttons%}*/
    },
    
    stylesheets: [
      /*Array with stylesheets urls (injection inside shadow)*/
      'css/popup.css'
    ],
    fonts: [
      /*Array with fonts urls (injection outside shadow)*/
    ],
    
    title: '', /*Text || HTML*/
    content: '', /*Text || HTML*/
    
    buttons: {
      /*Describe buttons models*/
      /*button: {                 // button id
        type: 'a',                // tag name || button
        text: 'Button',           // button text || HTML
        attributes: {
          class: 'btn-primary',   // class name
          href: '#'               // href attribute
        },
        actions: {
          click: ({ button, event, instance }) => {
            console.log('%cIt\'s agree', 'color:#11a100')
            console.log(button, event, instance)
          }
        }
      }*/
    },
    
    onTransitionStart: () => {},
    onTransitionEnd: () => {},
    
    appear: (instance) => {
      /*Should return true if popup needs to appear immediately
      also possible to bind "instance.show()" on some event here*/
    }
  };
  
  /**
   * Init Popup
   * @param {Object} options
   * @return ShadowPopup
   */
  constructor (options) {
    /**Load instructions from external js file**/
    if (options?.url) {
      fetch(options.url, options)
        .then(async (response) => {
          options = new Function('', await response.text() + ';return options;')();
          if (typeof options === 'object') this.#init(options);
        });
    } else {
      this.#init(options);
    }
  }
  
  /**
   * Init settings
   * @param {Object} options
   * @return ShadowPopup
   */
  #init (options) {
    this.options = Object.assign(
      this.options, options,
      { template: this.options.template || options?.template || null },
      { variables: Object.assign({
          '{%heading%}': () => this.options.title,
          '{%content%}': () => this.options.content,
          '{%buttons%}': () => this.#buildButtons()
        }, options?.variables || {}) },
      { stylesheets: Object.assign(this.options.stylesheets, options?.stylesheets || []) },
      { fonts: Object.assign(this.options.fonts, options?.fonts || []) },
      { title: this.options.title || options?.title || '' },
      { content: this.options.content || options?.content || '' },
      { buttons: Object.assign(this.options.buttons, options?.buttons || {}) }
    );
    
    /*Build shadow parent if unassigned*/
    if (!this.options.shadowParent) {
      this.options.shadowParent = document.createElement('div');
      this.options.shadowParent.classList.add('shadow-popup-' + setTimeout(null, 1));
    }
    
    /*Build popup*/
    this.#buildPopup()
      .then(popup => {
        this.popup = popup;
        this.#startUp();
      });
    
    /*Attach fonts*/
    document.head.insertAdjacentHTML(
      'beforeend',
      '<style type="text/css">'+( this.options.fonts.map(font => {
        return '@import "' + font + '?t=' + (new Date().getTime() / 1000).toFixed(0) + '";';
      }).join("\n") )+'</style>'
    );
    
    /*Attach stylesheets*/
    this.stylesheets = document.createElement('style');
    this.stylesheets.setAttribute('type', 'text/css');
    
    this.stylesheets.textContent = this.options.stylesheets.map(sheet => {
      return /\.css$/.test(sheet) ? '@import "' +sheet+ '?t='+(new Date().getTime() / 1000).toFixed(0) + '";' : sheet;
    }).join("\n");
    
    return this;
  }
  
  /**
   * First popup launch
   */
  #startUp () {
    /*Show popup*/
    if ( this.isFunction(this.options.appear) && this.options.appear(this) ) {
      this.show();
    }
  }
  
  /**
   * Create default popup || from template
   * @return Promise
   */
  #buildPopup () {
    let popup;
    
    if ( this.options.template?.url ) {
      /**If template needs to be loaded from file**/
      popup = fetch(this.options.template.url || '', this.options.template)
        .then(async (response) => this.#tplParser( await response.text() ));
    } else if ( typeof this.options.template === 'string' ) {
      /**If template just in string**/
      popup = Promise.resolve( this.#tplParser(this.options.template) );
    } else {
      /**Generate static popup**/
      popup = new Promise(resolve => {
        const popup = document.createElement('div'),
          holder = document.createElement('div'),
          header = document.createElement('div'),
          container = document.createElement('div'),
          buttons = document.createElement('div');
        
        popup.classList.add('popup');
        
        holder.classList.add('holder');
        
        header.classList.add('header');
        header.innerHTML = this.options.title;
        
        container.classList.add('content');
        container.innerHTML = this.options.content;
        
        buttons.classList.add('buttons');
        buttons.append( this.#buildButtons() );
        
        holder.append(header, container, buttons);
        
        popup.append(holder);
        
        resolve(popup);
      });
    }
    
    return popup;
  }
  
  /**
   * Parse text to popup body
   * @param {String} template
   * @return HTMLElement
   */
  #tplParser (template) {
    const parser = new DOMParser(),
      content = parser.parseFromString(
        template,
        'text/html'
      ).body.querySelector('*'),
      elements = this.#textNodesUnder(content),
      variables = this.options.variables;
    
    /*Replace all variables with elements*/
    Object.keys(variables).forEach(tag => {
      elements.filter(f => f.nodeValue.includes(tag)).forEach(el => {
        /*Replace var with element*/
        if ( el && this.isFunction(variables[tag]) ) {
          const result = variables[tag]();
          
          if (typeof result === 'string') {
            el.parentNode.insertAdjacentHTML('afterbegin', result);
          } else {
            el.parentNode.append(result);
          }
          
          el.remove();
        }
      });
    });
    
    return content;
  }
  
  /**
   * Search all text nodes
   * @param el
   * @return {*[]}
   */
  #textNodesUnder (el) {
    let n, a=[], walk=document.createTreeWalker(el, NodeFilter.SHOW_TEXT,null);
    while(n = walk.nextNode()) a.push(n);
    return a;
  }
  
  /**
   * Build buttons
   * @return DocumentFragment
   */
  #buildButtons () {
    const buttons = document.createDocumentFragment();
    
    Object.keys(this.options.buttons).forEach(id => {
      const options = Object.assign(
          this.options.buttons[id] || {},
          { attributes: Object.assign({ id: id }, this.options.buttons[id]?.attributes || {}) },
          { actions: this.options.buttons[id]?.actions || {} }
        ),
        button = document.createElement(options.type || 'button');
      
      /*Add button based class*/
      button.classList.add('button');
      
      /*Add attributes*/
      Object.keys(options.attributes).forEach(prop => {
        const value = options.attributes[prop];
        
        if (prop !== 'class') button.setAttribute(prop, value);
        else button.classList.add(...(value.split ? value.split(' ') : ''));
      });
      
      /*Add events*/
      Object.keys(options.actions).forEach(event => {
        button.addEventListener(event, (e) => {
          if (this.isFunction(options.actions[event])) {
            options.actions[event]({ button: button, event: e, instance: this });
          }
        });
      });
      
      /*Add text*/
      button.innerHTML = options.text;
      
      buttons.append(button);
    });
    
    return buttons;
  }
  
  /**
   * Check is given param is function
   * @param fn
   * @return Boolean
   */
  isFunction (fn) {
    return toString.call(fn) === '[object Function]';
  }
  
  /**
   * Apply css object to element
   * @param el
   * @param styles
   */
  css(el, styles) {
    for (const property in styles)
      el.style[property] = styles[property];
  }
  
  /**
   * Manipulate class during transition
   * @param {String} [add]
   * @param {String} [remove]
   * @param {Function} [cb]
   */
  transition (add = null, remove = null, cb = () => {}) {
    const duration = parseFloat(getComputedStyle(this.popup)?.transitionDuration || 0) * 1000;
    
    if (add) this.popup.classList.add(...add.split(' '));
    if (remove) this.popup.classList.remove(...remove.split(' '));
    
    this.popup.classList.add('transition');
    
    if (this.isFunction(this.options.onTransitionStart)) this.options.onTransitionStart(this);
    
    clearTimeout(this.popup.timeout);
    /*Change class after animation*/
    this.popup.timeout = setTimeout(() => {
      this.popup.classList.remove('transition');
      if (this.isFunction(cb)) cb();
      if (this.isFunction(this.options.onTransitionEnd)) this.options.onTransitionEnd(this);
    }, duration);
  }
  
  /**
   * Open popup
   */
  show () {
    if (!this.holder) {
      this.holder = this.options.shadowParent.attachShadow({ mode: this.options.shadowMode });
      this.holder.append(this.stylesheets, this.popup);
      this.popup.classList.add('loading');
      
      /*Temporary disable animation*/
      setTimeout(() => {
        this.transition(null, null, () => {
          this.popup.classList.remove('loading');
        });
      }, 10);
    }
    
    if (!this.options.shadowParent.parentNode) {
      document.body.append(this.options.shadowParent);
    }
    
    this.transition('visible', 'hidden');
  }
  
  /**
   * Hide popup
   */
  hide () {
    this.transition('hidden', 'visible');
  }
}
