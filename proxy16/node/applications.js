//var os = require('os');
const fs = require('fs');
const https = require('https');
const { reject } = require('underscore');
var f = require('../functions');
var path = require('path');
var Datastore = require('nedb');
var progress = require('request-progress');
var targz = require('targz');
const request = require("request");
const axios = require('axios');
const arch = require('arch');

var Applications = function(settings, applications = {}, proxy, useArch = false) {
    if(!settings) settings = {}

    var self = this;

    var db = new Datastore(f.path(settings.dbpath2 || settings.dbpath));
    
    
    var platform = process.platform

    if (useArch) {
        platform += `_${arch()}`
    }

    var meta = applications[platform]

    self.getMeta = function() {
        return meta
    }

    self.getinfo = function(key){

        if(!meta) return Promise.reject('platform')
        return axios.get(meta[key].url).then(function(response) {

            var d = response.data
            var assets = d.assets || [];

            var l = _.find(assets, function(a){
                return a.name.indexOf(meta[key].name) > -1
            })

            if(l) return Promise.resolve(l)

            return Promise.reject('notfound')
        })

    }

    self.current = function(){
        return new Promise((resolve, reject) => {
            db.find({}).exec(function (err, docs) {
                var asset = null
                if (err){
                    reject(err)
                }
                else{
                    asset = docs[0] || null

                    resolve(asset)
                }
            });
        })
    }

    self.checkupdate = function(){

        var gitasset = null

        return self.getinfo('bin').then(asset => {
            gitasset = asset

            return self.current()
        })

        .then(asset => {
            if(asset && gitasset) {
                return Promise.resolve(asset.name !== gitasset.name)
            } else {
                return Promise.resolve(true)
            }
        })
    }

    self.clear = function(){
        return new Promise((resolve, reject) => {


            db.remove({}, { multi: true }, function (err, numRemoved) {

                if (err){
                    reject({
                        code : 500,
                        error : "dbsave"
                    })

                    return
                }

                resolve()

            })


        })
    }

    self.save = function(asset){

        return self.clear().then(r => {
            return new Promise((resolve, reject) => {
                db.insert(asset, function (err, newDoc) {


                    if (err){
                        reject({
                            code : 500,
                            error : "dbsave"
                        })
                    }
                    else{
                        resolve(asset)
                    }
                });
            })
        })


    }

    self.install = function(key, dest, save){
        return new Promise((resolve, reject) => {

            return self.download(key).then(r => {
                try{
                    fs.copyFile(r.path, dest, (e) => {

                        if(!e) {
                            fs.chmodSync(dest, 0o755)
                            return resolve(r)
                        }
                        reject({
                            code : 500,
                            error : 'cantcopy'
                        })

                    });
                }
                catch(e){
                    return Promise.reject()
                }

            }).catch(e => {
                reject({
                    code : 500,
                    error : 'cantcopy'
                })

            })

        }).then(r => {
            if (save)
                return self.save(r.asset)

            return Promise.resolve()
        })
    }

    self.download = async function(key, repo = { user: "pocketnetteam", name: "pocketnet.core"}){
        const current = await self.current()
        var r = {}

        return self.getinfo(key).then(asset => {
            r.asset = asset

            return f.downloadgitrelease(r.asset.name, {
                check : function(stats){
                    if (stats.size >= r.asset.size){

                        return false
                    }
                    return true
                }

            }, repo)

        }).then(p => {

            r.path = p

            return Promise.resolve(r)
        })
    }

    self.downloadPermanent = function(key, dest, progressState) {
        if (!meta[key] && !meta[key].permanent)
            return Promise().reject();

        let endFile = path.resolve(dest, meta[key].name)

        return new Promise(async (resolve, reject) => {
            let req = request(meta[key].url);

            progress(req, {
                throttle: 500,                    // Throttle the progress event to 2000ms, defaults to 1000ms
                // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms
                // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length
            })
            .on('progress', function (state) {
                // The state is an object that looks like this:
                // {
                //     percent: 0.5,               // Overall percent (between 0 to 1)
                //     speed: 554732,              // The download speed in bytes/sec
                //     size: {
                //         total: 90044871,        // The total payload size in bytes
                //         transferred: 27610959   // The transferred payload size in bytes
                //     },
                //     time: {
                //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals)
                //         remaining: 81.403       // The remaining seconds to finish (3 decimals)
                //     }
                // }
                // console.log('progress', state);
                if (progressState) {
                    let st = progressState(state);
                    if (st && st.break)
                        req.abort();
                }
            })
            .on('error', function (err) {
                if (err.message === 'aborted') {
                    return resolve()
                }

                console.log(err)
                return reject(err)
            })
            .on('end', function () {
                return resolve()
            })
            .pipe(fs.createWriteStream(endFile, { mode: 0o755 }))
        }).then(r => {
            return Promise.resolve(endFile);
        })
    }

    self.decompress = function(source, destination, progressState) {
        return new Promise(function(resolve, reject) {
            targz.decompress({
                src: source,
                dest: destination
            }, function(err){
                if(err) {
                    reject()
                } else {
                    resolve()
                }
            })
        }).then(r => {
            return Promise.resolve()
        }).catch(e => {
            return Promise.reject(e)
        })
    }

    self.removeAll = function(){

        var dest = f.path('downloads')

        if(fs.existsSync(dest)){
            try{
                fs.rmdirSync(dest, { recursive: true });
            }catch(e){
                return Promise.reject('downloadfoldererror')
            }
        }

        return self.clear()
    }

    self.init = function(){
        return new Promise((resolve, reject) => {
            db.loadDatabase(err => {
                resolve()
            })
        })
    }

    self.kit = {

    }

    self.hasapplication = function(){
        return meta ? true : false
    }
    
    return self
}

module.exports = Applications
