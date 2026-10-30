var path = require('path');

// Native replacement for Q.defer(): q is not a dependency of this plugin
// and is not guaranteed to be present in the cordova project node_modules
function defer() {
  var deferral = {};

  deferral.promise = new Promise(function (resolve, reject) {
    deferral.resolve = resolve;
    deferral.reject = reject;
  });

  return deferral;
}

// Loads a module from the plugin dependencies or, when the plugin npm install
// did not run, from the cordova project (xcode and plist come with cordova-ios)
function requireModule(context, name) {
  var root = context.opts.projectRoot;
  var places = [
    name,
    path.join(root, 'node_modules', name),
    path.join(root, 'node_modules', 'cordova-ios', 'node_modules', name)
  ];

  for (var i = 0; i < places.length; i++) {
    try {
      return require(places[i]);
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') throw e;
    }
  }

  throw new Error('cc.fovea.cordova.openwith: module "' + name + '" not found');
}

module.exports = {
  defer: defer,
  requireModule: requireModule
};
