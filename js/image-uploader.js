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

            app.ajax.run(data);
        });
    }

}

if(typeof module != "undefined")
{
	module.exports = ImageUploader;
}