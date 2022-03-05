var exec = require('cordova/exec');

function plugin() {

}

plugin.prototype.enter = function(width, height, success, error) {
    exec(success, error, "PictureInPicture", "enter", [width, height]);
}

plugin.prototype.isPip = function(success, error) {
    exec(success, error, "PictureInPicture", "isPip", []);
}

plugin.prototype.leavePip = function(success, error) {
    exec(success, error, "PictureInPicture", "leavePip", []);
}

plugin.prototype.onPipModeChanged = function(success, error) {
    exec(success, error, "PictureInPicture", "onPipModeChanged", []);
}

plugin.prototype.isPipModeSupported = function(success, error) {
    exec(success, error, "PictureInPicture", "isPipModeSupported", []);
}

module.exports = new plugin();