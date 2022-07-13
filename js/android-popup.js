options = {
  stylesheets: [
    './js/vendor/shadow-popup/css/popup.css'
  ],
  
  title: '<h1 id="androidPopupTitle">'+app.localization.e('androidPopupTitle')+'</h1>',
  content: '<p id="androidPopupContent">'+app.localization.e('androidPopupContent')+'</p>',
  buttons: {
    androidPopupDisagree: {
      text: app.localization.e('androidPopupDisagree'),
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
    androidPopupAgree: {
      type: 'a',
      text: app.localization.e('androidPopupAgree'),
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
    /*Update text after locale change*/
    // window.localeChange = () => {
    //   instance.popup.querySelectorAll('*[id]').forEach(el => {
    //     el.textContent = app.localization.e(el.id)
    //   });
    // }
    
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