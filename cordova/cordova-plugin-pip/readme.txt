Package:
cordova-plugin-pip

Install:
save plugin to [app directory]/res/PictureInPicture
open cmd.exe
cd to app directory
cordova plugin add %CD%/res/PictureInPicture

Remove:
cordova plugin remove cordova-plugin-pip

Use:
inside app.js:
    //call to enter pip mode
    var width = 400; //px, float, width of picture-in-picture frame
    var height = 600; //px, float, height of picture-in-picture frame
    PictureInPicture.enter(width, height, function(success){
        //code to execute after pip mode started
    }, function(error){
        //code to execute if pip mode fails to start
    });

    //call to check if in pip mode
    PictureInPicture.isPip(function(success){
        //success = "true" if in pip mode
        //success = "false" if not in pip mode
    }, function(error){
        //code to execute if pip mode check fails
    });

    //call to register and handle pip-mode-changed events
    PictureInPicture.onPipModeChanged(function(success){
        //success = "true" if in pip mode
        //success = "false" if not in pip mode
    }, function(error){
        //code to execute if pip mode check fails
    });

    //call to check if in pip mode
    PictureInPicture.isPipModeSupported(function(success){
        //success = "true" if pip mode is supported
        //success = "false" if pip mode not supported
    }, function(error){
        //code to execute if pip mode check fails
    });
    