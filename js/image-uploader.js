ImageUploader = function(app) {

    var self = this;

    // Upload an image to the right server
    // Type can be: "peertube", "imgur" or "up1"

    self.upload = function({base64, type}){

        if (base64.indexOf('data:image') > -1){

            // If we are in test environment, try to upload images to Peertube
            // (fallback to Imgur if failure)
            if (window.testpocketnet) {

                return self.uploadImage({ base64 }, 'peertube').catch(err => {
                    return self.uploadImage({ base64 }, 'imgur')
                }).catch(err => {
                    return self.uploadImage({ base64 }, 'up1')
                }).then(url => {
                    return Promise.resolve(url)
                })

            }
            // Else, upload images to Imgur
            else {

                return self.uploadImage({ base64 }, 'imgur').catch(err => {
                    return self.uploadImage({ base64 }, 'up1')
                }).then(url => {
                    return Promise.resolve(url)
                })

            }
        }
        else{
            return Promise.resolve(base64)
        }
        
        
        /**/
    }

    self.uploadImage = function({base64, type}, system = 'peertube') {

        return new Promise((resolve, reject) => {

            var p = {
                type : "POST",
                data : {},
                success : resolve,
                fail : reject
            };
    
            switch(system) {
                case 'imgur':
                    p.imgur = true;
                    p.data.Action = "image";
                    p.data.image = base64.split(',')[1];
                    break;

                case 'up1':
                    p.up1 = true;
                    p.data.file = base64.split(',')[1];
                    break;

                default:
                    p.peertubeImage = true;
                    p.data.base64 = base64;
                    p.data.Action = "upload";
            }

            // If we need to use the IP address instead of the domain name

            if (p.peertubeImage){

                // Fetch Peertube server if needed
                app.platform.preparePeertubeServer().finally(() => {

                    var server = app.peertubeHandler.helpers.urlextended(app.options.peertubeServer, true)

                    p.url = server.current
                    if (p.url[p.url.length - 1] != '/')
                        p.url += '/';
                    p.url += 'api/v1/';

                    p.success = function(data){

                        app.Logger.info({ actionId: "IMG_PEERTUBE_UPLOAD_SUCCESS" });

                        var url = 'https://' + data.url

                        resolve(url)
                    }

                    p.fail = function(){

                        app.Logger.info({ actionId: "IMG_PEERTUBE_UPLOAD_FAILED" });

                        reject()
                    }

                    app.ajax.run(p)
                    
                });

                return 
            }

            if (p.up1){
                p.success = function(data){

                    var url = 'https://bastyon.com:8092/i/' + deep(data, 'data.ident')

                    resolve(url)
                }
            }

            if (p.imgur){
                p.success = function(data){

                    app.Logger.info({ actionId: "IMG_IMGUR_UPLOAD_SUCCESS" });

                    var url =  deep(data, 'data.link')
                    resolve(url)
                }
            }
                

            app.ajax.run(p);
        });

    }

}

if(typeof module != "undefined")
{
	module.exports = ImageUploader;
}