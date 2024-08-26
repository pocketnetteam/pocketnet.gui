var Monetization = function(app, {url, auth}){
    var self = this

    var request = function(path, data = {}, p = {}){

        var er = false

        var headers = _.extend({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Basic ' + auth
        }, p.headers || {})


        return fetch('https://' + url + '/api/' + path, {

            method: p.method || 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(data)

        }).then(r => {

            if(!r.ok){
                er = true
            }

            if (r.status){

                if (r.status == 261){
                    return Promise.reject({
                        code : r.status
                    })
                }

            }

            return r.json()

        }).then(result => {

            if (er){
                return Promise.reject(result.error)
            }

            return Promise.resolve(result.data || {})

        })

    }

    self.contentperformance = function({addresses, start, end}){

        if(!_.isArray(addresses)) addresses = [addresses]

        return request('contentperformance', {
            Addresses : addresses,
            StartDate : start,
            EndDate : end
        })
    }

    if(!auth || !url) return null


    return self
}

if(typeof module != "undefined"){ module.exports = {Monetization}; } 
else { window.Monetization = Monetization}