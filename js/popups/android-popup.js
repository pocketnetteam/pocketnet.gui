options = {
  stylesheets: [
    './js/vendor/shadow-popup/css/popup.css',
    '.popup { position: fixed; right: 0; bottom: 0; left: 0; z-index: 1001; }'
  ],
  
  title: '<h1 id="androidPopupTitle">'+app.localization.e('androidPopupTitle')+'</h1>',
  content: '',
  buttons: {
    androidPopupDisagree: {
      text: app.localization.e('androidPopupDisagree'),
      attributes: {
        class: 'btn-secondary'
      },
      actions: {
        click: ({ button, event, instance }) => {
          localStorage.setItem('android-app', instance.options.addDays(21));
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
          localStorage.setItem('android-app', instance.options.addDays(365));
          instance.hide();
        }
      }
    }
  },
  addDays: (days) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date.getTime();
  },
  appear: (instance) => {
    const state = (() => {
            return new Date() > localStorage.getItem('android-app');
          })();
    
    /*Update text after locale change*/
    // window.localeChange = () => {
    //   instance.popup.querySelectorAll('*[id]').forEach(el => {
    //     el.textContent = app.localization.e(el.id)
    //   });
    // }
    
    return isTablet() && !window.cordova && !isios() && state;
  }
}