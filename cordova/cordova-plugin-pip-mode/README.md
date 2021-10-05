# PIP Plugin
Cordova plugin to enable PictureinPicture support for android > 8.0

Based on the plugin [cordova-plugin-pip](https://www.npmjs.com/package/cordova-plugin-pip) present in the npm repository. 

## Install
```
cordova plugin add https://github.com/efoxbr/cordova-plugin-pip-mode.git
```

## API

Methods:
* **enter**(width: int, height:int, success: function, error: function)
    * Call to enter pip mode. It receives the with and height in pixels of the desired pip window. Example: 
    ```javascript
        cordova.plugins.PIPPlugin.enter(200,400,
              function(){console.log("Entered Pip Mode")},
              function(error){console.log(error)});
    ```
    
* **isPip**(success: function, error: function)
    * Call to check if it is in pip mode. Returns **_true_** or **_false_** in the success function.
    Example: 
    ```javascript
        cordova.plugins.PIPPlugin.isPip(
          function(result){console.log(result)},
          function(error){console.log(error)});
    ```
    
* **isPipModeSupported**(success: function, error: function)
    * Call to check if pip mode is supported. Returns **_true_** or **_false_** in the success function.
    ```javascript
        cordova.plugins.PIPPlugin.isPipModeSupported(
          function(result){console.log(result)},
          function(error){console.log(error)});
    ```
    
* **onPipModeChanged**(success: function, error: function)
    * Call to register and handle pip-mode-changed events
    ```javascript
        cordova.plugins.PIPPlugin.onPipModeChanged(
          function(result){console.log(result)},
          function(error){console.log(error)});
    ```
