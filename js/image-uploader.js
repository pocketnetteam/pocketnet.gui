ImageUploader = function(app) {

    var self = this;

    self.uploadImage = function(ajaxData) {

        return new Promise((resolve, reject) => {
            app.ajax.run({
                type : "POST",
                peertubeImage : true,
                data : { Action : "upload", ...ajaxData },
                success : resolve,
                fail : reject
            });
        });
    }

}

if(typeof module != "undefined")
{
	module.exports = ImageUploader;
}