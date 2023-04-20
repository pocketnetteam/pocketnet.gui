var exec = require('cordova/exec');

exports.SPEAKER = 'speaker';
exports.EARPIECE = 'earpiece';
exports.NORMAL = 'normal';
exports.RINGTONE = 'ringtone';

exports.setAudioMode = function (mode) {
	cordova.exec(null, null, 'AudioTogglePlugin', 'setAudioMode', [mode]);
};

exports.checkVideoPermission = function (successClbk) {
	cordova.exec(function(v){
		successClbk(v)
	}, function(){
		successClbk(false)
	}, 'AudioTogglePlugin', 'checkVideoPermission', []);
};

exports.checkAudioPermission = function (successClbk) {
	cordova.exec(function(v){
		successClbk(v) 
	}, function(){
		successClbk(false)
	}, 'AudioTogglePlugin', 'checkAudioPermission', []);
};
