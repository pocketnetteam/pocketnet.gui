const { execSync } = require('child_process');

function androidBeforeBuild() {
  console.log('Running Android before build hook...');

  console.log('Installing "cordova-plugin-apkupdater@4.0.0" needed by Android app');
  execSync('cordova plugin add cordova-plugin-apkupdater@4.0.0');
}

function iosBeforeBuild() {
  console.log('Running iOS before build hook...');

  console.log('Removing "cordova-plugin-apkupdater@4.0.0" needed by Android app');
  execSync('cordova plugin remove cordova-plugin-apkupdater@4.0.0');
}

module.exports = function(context) {
  switch (context.opts.platforms[0]) {
    case 'android': return androidBeforeBuild();
    case 'ios': return iosBeforeBuild();
  }
}
