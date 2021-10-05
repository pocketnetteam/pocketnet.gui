cordova.addConstructor(function (){
	var exec = cordova.exec;
	window.PictureInPicture = {
		enter: function (width, height, success, error) {
			exec(success, error, "PIPPlugin", "enter", [width, height]);
		},
		initializePip: function (success, error) {
			exec(success, error, "PIPPlugin", "initializePip", []);
		},
		isPip: function (success, error) {
			exec(success, error, "PIPPlugin", "isPip", []);
		},
		onPipModeChanged: function (success, error) {
			exec(success, error, "PIPPlugin", "onPipModeChanged", []);
		},
		isPipModeSupported: function (success, error) {
			exec(success, error, "PIPPlugin", "isPipModeSupported", []);
		}
	}
})

