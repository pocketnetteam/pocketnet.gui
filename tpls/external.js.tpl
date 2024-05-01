var bastyon_importedScripts = {}
var bastyon_importScript = function(src, callback) {

    if(bastyon_importedScripts[src]){
        callback()
        return
    }

    var script = document.createElement('script');
    var appendTo = document.getElementsByTagName('head')[0];

    if (script.readyState && !script.onload) {
        // IE, Opera
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                bastyon_importedScripts[src] = true
                callback();
            }
        }
    }
    else {
        // Rest
        script.onload = function(){
            bastyon_importedScripts[src] = true
            callback();
        };
    }

    script.src = src;
    
    appendTo.appendChild(script);
}

bastyon_importScript('https://__VAR__.domain/js/lib/external/index.min.js', function(){

    window.bastyonLib = new window.__BastyonLib(__VAR__.strconfig)
    delete window.__BastyonLib

    let event = new Event("bastyonLibLoaded", {bubbles: true, composed :true});
    
    window.dispatchEvent(event);

})