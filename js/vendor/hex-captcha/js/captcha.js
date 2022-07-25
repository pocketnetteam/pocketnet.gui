/**
 * HexCaptcha
 * Developed By Michael Levinez
 *
 * @class HexCaptcha
 *
 * version 1.0.0
 */
class HexCaptcha {
  /*Class defaults*/
  #options = {
    holder: '#captcha',
    styleSheet: [
      'css/captcha.css'
    ],
    puzzle: {
      hexagonAngle: 0.523598776, //30 deg in rad
      sideLength: 48, //hex half size (pixels)
      boardSize: 3,
    },
    data: {
      frames: [],
      overlay: [],
      duration: 200
    }
  }
  
  #holder;
  #root;
  #container;
  #canvas;
  #animation;
  
  angles = [];
  
  /**
   * Initialization
   *
   * @param {Object} [options]
   * @return HexCaptcha
   */
  constructor (options) {
    this.#options = Object.assign(
      this.#options, options,
      { puzzle: Object.assign(this.#options.puzzle, options?.puzzle || {}) },
      { data: Object.assign(this.#options.data, options?.data || {}) }
    );
  
    /*Attach jigsaw*/
    this.#create();
  }
  
  /**
   * Create jigsaw structure
   *
   * @return void
   */
  #create () {
    /*Main holders and controls*/
    this.#holder = document.querySelector(this.#options.holder) || document.body;
    this.#root = this.#holder.attachShadow({ mode: 'closed' });
    this.#container = document.createElement('section');
    this.#canvas = document.createElement('div');
    
    /*Structure items*/
    const
      style = document.createElement('style'),
      sheet = [].concat(this.#options.styleSheet).map(style => '@import "' + style + '"').join(';\n'),
      fragment = document.createDocumentFragment(),
      jigsaw = document.createElement('div'),
      result = document.createElement('div');
  
    /*Create main stylesheet*/
    style.setAttribute('type', 'text/css');
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = sheet;
    } else {
      style.appendChild(document.createTextNode(sheet));
    }

    /*Add classes to structure blocks*/
    this.#canvas.classList.add('canvas');
    this.#container.classList.add('captcha-container');
    jigsaw.classList.add('captcha-jigsaw');
    
    /*Jigsaw result block*/
    result.classList.add('captcha-result');
    result.innerHTML = '<div class="captcha-result-item" />';
    
    /*Append structure items and controls*/
    jigsaw.append(this.#canvas, result);
    
    this.#container.append(jigsaw);
    fragment.append(this.#container);
    
    this.#root.append(style, fragment);
    
    /*Get images chunks and draw puzzle*/
    this.#render({
      frames: this.#options.data.frames,
      overlay: this.#options.data.overlay
    });
  }
  
  /**
   * Get puzzles and build jigsaw
   *
   * @param {Object} res
   * @return void
   */
  #render (res) {
    this.#canvas.innerHTML = '';
  
    /*Make chunks from query*/
    const hexagonAngle = this.#options.puzzle?.hexagonAngle, //30 deg in rad
      sideLength = this.#options.puzzle?.sideLength, //hex half size (pixels)
      boardSize = this.#options.puzzle?.boardSize, //board contains (1 row)
    
      hexHeight = Math.sin(hexagonAngle) * sideLength,
      hexRadius = Math.cos(hexagonAngle) * sideLength,
      hexRectangleWidth = 2 * hexRadius,
      angles = [90, 180, 270, 360];
  
    let index = 0;
  
    this.#canvas.style.height = (sideLength * 2) * boardSize + 'px';
    this.#canvas.style.width = (sideLength * 2) * boardSize + 'px';
    this.#canvas.frames = res?.overlay;
  
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (i * hexRectangleWidth + ((j % 2) * hexRadius) > 0) {
          const holder = document.createElement('div'),
                image = document.createElement('span');
  
          image.frames = res?.frames.map(img => img[index]);
          image.angle = angles[angles.length-1];
        
          Object.assign(holder.style, {
            top: ( j * (sideLength + hexHeight) + (sideLength / 2) )+'px',
            left: ( i * hexRectangleWidth + ((j % 2) * hexRadius) - (sideLength / 2) )+'px',
            height: ( sideLength * 2 )+'px',
            width: ( sideLength * 2 )+'px'
          });
        
          /*Bind click on chunk*/
          image.addEventListener('click', (e) => {
            e.target.angle = angles[ angles.indexOf(e.target.angle)+1 ] || angles[0];
            e.target.style.setProperty('--data-angle', parseInt(e.target.style.getPropertyValue('--data-angle') || '0') + 90 + 'deg');
            
            this.angles = Array.from(e.target.parentNode.children).map(img => img.angle);
          });
        
          holder.append(image);
          this.#canvas.append(holder);
          
          index++;
        }
      }
    }
  
    index = null;
    this.#startAnimation();
  }
  
  /**
   * Start animate all chunks
   *
   * @return {void}
   */
  #startAnimation() {
    /*Set 1st frame*/
    const
      set = (img, frame) => img.style.setProperty('--data-image', 'url(' + frame+')'),
      
      frames = Array.from(this.#canvas.querySelectorAll('span')).map((img, i) => {
        set(img, img.frames[0]);
        return img.frames;
      });
    
      set(this.#canvas.parentNode, this.#canvas.frames[0]);
  
    let index = 1;
    
    /*Next tick*/
    this.#stopAnimation();
    this.#animation = setInterval(() => {
      Array.from(this.#canvas.querySelectorAll('span')).forEach((img, i) => {
        set(img, frames[i][index]);
      });
  
      set(this.#canvas.parentNode, this.#canvas.frames[index]);
      
      index = (frames[0][++index] ? index : 0);
    }, this.#options?.data?.duration || 250);
  }
  
  /**
   * Stop animate all chunks
   *
   * @return {void}
   */
  #stopAnimation() {
    clearInterval(this.#animation);
  }
  
  /**
   * Show state loading/error/success
   */
  show (cls) {
    /*Manage classes on container*/
    this.#container.classList.remove('loading', 'success', 'error');
    this.#container.classList.add(cls);
  }
}