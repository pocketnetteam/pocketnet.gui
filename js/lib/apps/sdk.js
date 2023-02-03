var BastyonSdk = function(){
    var self = this

    window.addEventListener("message", (event) => {
        console.log('event', event)
    })

    return self
}

if(typeof module != "undefined"){ module.exports = {BastyonSdk}; } 
else { window.BastyonApps = BastyonSdk; }