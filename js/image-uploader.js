ImageUploader = function(app) {

    var self = this;

    // Upload an image to the right server
    // Type can be: "peertube", "imgur" or "up1"
    self.uploadImage = function(ajaxData, type = 'peertube') {

        return new Promise((resolve, reject) => {

            var data = {
                type : "POST",
                data : { Action : "upload", ...ajaxData },
                success : resolve,
                fail : reject
            };
    
            switch(type) {
                case 'imgur':
                    data.imgur = true;
                    break;
                case 'up1':
                    data.up1 = true;
                    break;
                default:
                    data.peertubeImage = true;
            }

            // If we need to use the IP address instead of the domain name
            if (app.options &&
                app.options.peertubeUseIp == true &&
                app.options.peertubeServer &&
                data.peertubeImage &&
                typeof _Electron != 'undefined' && _Electron) {
                var url = new URL(app.options.peertubeServer);
                try {
                    app.peertubeHandler.api.proxy.getHostIp(url.hostname).then((ipAddress) => {
                        data.data.ipAddress = ipAddress;
                        app.ajax.run(data);
                    });
                } catch(err) {
                    console.log(err);
                    return reject('Cannot get IP address from proxy server');
                }
            }
            else {
                app.ajax.run(data);
            }
        });
    }

}

if(typeof module != "undefined")
{
	module.exports = ImageUploader;
}