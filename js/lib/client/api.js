console.log("APISCRIPT")

var Api = function(){
    var self = this

    

    self.fetch = function(data, url){

        return fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)

        }).then(r => {


        }).catch(e => {

        })

    }

    self.request = function(){

    }

    return self
}   

if(typeof module != "undefined"){ module.exports = Api; }