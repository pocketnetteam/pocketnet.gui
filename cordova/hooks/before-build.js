const { execSync } = require('child_process');

function androidPrebuild() {
  console.log('Running Android prebuild hook...');

  console.log('Installing "cordova-plugin-apkupdater@4.0.0" needed by Android app');
  execSync('npm install cordova-plugin-apkupdater@4.0.0 --no-save');
}

function iosPrebuild() {
  console.log('Running iOS prebuild hook...');

  console.log('Removing "cordova-plugin-apkupdater@4.0.0" needed by Android app');
  execSync('npm remove cordova-plugin-apkupdater@4.0.0 --no-save');
}

module.exports = function(context) {
  switch (context.opts.platforms[0]) {
    case 'android': return androidPrebuild();
    case 'ios': return iosPrebuild();
  }
}
