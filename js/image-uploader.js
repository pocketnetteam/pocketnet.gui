ImageUploader = function(app) {

    var self = this;

    // Upload an image to the right server
    // Type can be: "peertube", "imgur" or "up1"

    self.upload = function({base64, type}){

        if (base64.indexOf('data:image') > -1){

            // If we are in test environment, try to upload images to Peertube
            // (fallback to Imgur if failure)

            if (1 == 1) {
                
                return self.uploadImage({ base64 }, 'peertube').catch(err => {
                    console.error(err)
                    return self.uploadImage({ base64 }, 'up1')
                    
                }).catch(err => {
                    console.error(err)
                    return self.uploadImage({ base64 }, 'imgur')
                }).then(url => {
                    return Promise.resolve(url)
                }).catch(err => {
                    console.error(err)
                    return Promise.reject(err)
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
                app.peertubeHandler.api.proxy.bestIfNeed().finally(() => {

                    if(!app.options.peertubeServer){
                        reject('peertubeServer')

                        return
                    }

                    var server = app.peertubeHandler.helpers.urlextended(app.options.peertubeServer, true)

                    p.url = server.current
                    if (p.url[p.url.length - 1] != '/')
                        p.url += '/';
                    p.url += 'api/v1/';

                    p.success = function(data){

                        app.Logger.info({ actionId: "IMG_PEERTUBE_UPLOAD_SUCCESS" });

                        var url = data.url.indexOf('http://') > -1 ? data.url : 'https://' + data.url

                        resolve(url)
                    }

                    p.fail = function(e){

                        app.Logger.info({ actionId: "IMG_PEERTUBE_UPLOAD_FAILED" });

                        reject(e)
                    }

                    app.ajax.run(p)
                    
                }).catch((e) => {
                    reject(e)
                });

                return 
            }

            if (p.up1){
                p.success = function(data){

                    var url = 'https://bastyon.com:8092/i/' + deep(data, 'data.ident')

                    resolve(url)
                }

                p.fail = function(e){

                    app.Logger.info({ actionId: "IMG_UP1_UPLOAD_FAILED" });

                    reject(e)
                }
            }

            if (p.imgur){
                p.success = function(data){

                    app.Logger.info({ actionId: "IMG_IMGUR_UPLOAD_SUCCESS" });

                    var url =  deep(data, 'data.link')
                    resolve(url)
                }

                p.fail = function(e){

                    app.Logger.info({ actionId: "IMG_IMGUR_UPLOAD_FAILED" });

                    reject(e)
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