
var mjml2html = require("mjml")
var _ = require("underscore")
var fs = require("fs");
var path = require("path");

var EmailCreator = function(){
    var self = this
    var files = {}

    self.create = function(name, data){


        var file = files[name] || null;
        var compiled = ''

        if(!file){
            try{

                file = fs.readFileSync(path.resolve('proxy16/emails/emailtemplates' , name + '.xml'), 'utf8');
                // file = fs.readFileSync('./emailtemplates/' + name + '.xml', "utf8");
                files[name] = file
            }
            
            catch (e){
                return Promise.reject(e)
            }
        }

        try{

            var template = _.template(file);

            compiled = template(data);
        }
        
        catch (e){
            return Promise.reject(e)
        }
       
        try{

            var ps = compiled.split('<!--part-->')
            var result = {
                subject : ps[0],
                text : ps[1],
                html : mjml2html(ps[2]).html
            }

            return Promise.resolve(result)
        }

        catch (e){
            return Promise.reject(e)
        }
    }

    return self
}

module.exports = EmailCreator