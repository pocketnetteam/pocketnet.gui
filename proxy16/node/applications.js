//var os = require('os');
const fs = require('fs');
const https = require('https');
const axios = require('axios');
const { reject } = require('underscore');
var f = require('../functions');
var path = require('path');
var Datastore = require('nedb');

var Applications = function(settings) {

    if(!settings) settings = {}

    var self = this;

    var db = new Datastore(f.path(settings.dbpath));

    var applications = {
        win32: {
            github: {
                //name : "win_x64_setup.exe",
                name: "_win_x64_daemon.bin",
                url: 'https://api.github.com/repos/pocketnetapp/pocketnet.core/releases/latest',
                page: 'https://github.com/pocketnetteam/pocketnet.core/releases/latest'
            }
        }

        /*linux: {
            github: {
                name: "linux_x64.AppImage",
                url: 'https://api.github.com/repos/pocketnetapp/pocketnet.core/releases/latest',
                page: 'https://github.com/pocketnetteam/pocketnet.core/releases/latest'
            }
        }*/
    }

    var platform = process.platform
    var meta = applications[platform]

    self.getinfo = function(){

        if(!meta) return Promise.reject('platform')

        return axios.get(meta.github.url).then(function(response) {

            var d = response.data
            var assets = d.assets || [];

            var l = _.find(assets, function(a){
                return a.name.indexOf(meta.github.name) > -1
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

        return self.getinfo().then(asset => {
            gitasset = asset

            return self.current()
        })

        .then(asset => {

            if(asset && gitasset){
                return Promise.resolve(asset.name != gitasset.name)
            }

            return Promise.resolve(false)
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

    self.install = function(dest){
        return new Promise((resolve, reject) => {

            return self.download().then(r => {
                try{
                    fs.copyFile(r.path, dest, (e) => {

                        if(!e) {
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
            return self.save(r.asset)
        })
    }

    self.download = function(){

        var r = {}

        return self.getinfo().then(asset => {

            r.asset = asset


            return f.downloadgitrelease(r.asset.name, {
                //dest : dest,
                check : function(stats){
                    if (stats.size >= r.asset.size){

                        return false
                    }
                    return true
                }

            })
            
        }).then(p => {

            r.path = p

            return Promise.resolve(r)
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