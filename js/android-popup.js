options = {
  stylesheets: [
    './js/vendor/shadow-popup/css/popup.css'
  ],
  
  title: '<h1>Bastyon is better on the app</h1>',
  content: '<p>Never miss a post. Open this on Bastyon app to get the full experience</p>',
  buttons: {
    disagree: {
      text: 'Not now',
      attributes: {
        class: 'btn-secondary'
      },
      actions: {
        click: ({ button, event, instance }) => {
          instance.setCookie('android-app', 'not now', 21);
          instance.hide();
        }
      }
    },
    agree: {
      type: 'a',
      text: 'Switch to the app',
      attributes: {
        class: 'btn-primary',
        href: 'https://play.google.com/store/apps/details?id=pocketnet.app',
        target: '_blank'
      },
      actions: {
        click: ({ button, event, instance }) => {
          instance.setCookie('android-app', 'install', 365);
          instance.hide();
        }
      }
    }
  },
  appear: (instance) => {
    /*Set position inline*/
    instance.css(instance.popup, {
      position: 'absolute',
      right: 0,
      bottom: '-360px',
      left: 0,
      zIndex: 1001
    });
    
    return isTablet() && !window.cordova && !isios() && !instance.getCookie('android-app');
  }
}