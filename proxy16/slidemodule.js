//const TelegramBot = require('node-telegram-bot-api');
var _ = require('underscore')
var f = require('./functions');
var Datastore = require('@seald-io/nedb');
const { forEach } = require('lodash');

////settings

var Slidemodule = function(p) {
    var self = this

    self.list = [
        // tag1 : [ { dt: datetime, txid: "txid" }, { dt: datetime, txid: "txid" }, ... ]
        // tag2 : [ { dt: datetime, txid: "txid" }, { dt: datetime, txid: "txid" }, ... ]
        // ...
    ]

    var db = new Datastore(f.path(p.dbpath));

    self.init = function() {
        return new Promise((resolve, reject) => {
            db.loadDatabase(err => {
                db.find({}).exec(function (err, list) {

                    forEach(list || [], function(v, i, l) {
                        self.push(v.tag, v.txid)  
                    })

                    self.inited = true
                    resolve()
                })  
            })
        })
    }

    self.destroy = function(){
        self.list = []
        self.inited = false
    }

    self.push = function(tag, txid) {
        let dt = f.now()

        if (!(tag in self.list))
            self.list[tag] = []
        
        if (!self.list[tag].some(tx => tx.txid === txid))
        {
            self.list[tag].push({
                dt: dt,
                txid: txid
            })

            return dt
        } else {
            return false
        }
    }

    self.add = function(tag, txid) {
        return new Promise((resolve, reject) => {
            let dt = self.push(tag, txid)
            if (dt) {
                db.insert({
                    tag : tag,
                    dt: dt,
                    txid: txid
                }, function (err) {
                    if(err)
                        return reject(err)

                    resolve({
                        count: self.list[tag].length
                    })
                });
            } else {
                reject({
                    err: 'already exists'
                })
            }
        })
    }

    self.remove = function(tag, txid) {

        function removeItemAll(arr, txid) {
            let deleted = 0
            let i = 0;

            while (i < arr.length) {
                if (arr[i].txid === txid) {
                    arr.splice(i, 1);
                    deleted++
                } else {
                    ++i;
                }
            }

            return deleted
        }

        return new Promise((resolve, reject) => {
            if (tag in self.list) {
                let deleted = removeItemAll(self.list[tag], txid)

                db.remove({ tag: tag, txid: txid }, { multi: true }, function (err) {
                    if(err)
                        return reject(err)

                    resolve({
                        deleted: deleted
                    })
                });
            } else {
                reject({
                    error: 'tag not found'
                })
            }
        })
    }

    self.removeAll = function(tag) {
        return new Promise((resolve, reject) => {
            if (tag in self.list) {
                let deleted = self.list[tag].length
                delete self.list[tag]

                db.remove({ tag: tag }, { multi: true }, function (err) {
                    if(err)
                        return reject(err)

                    resolve({
                        deleted: deleted
                    })
                });
            } else {
                reject({
                    error: 'tag not found'
                })
            }
        })
    }

    self.get = function(tag) {
        if (!(tag in self.list))
            return Promise.resolve([])

        return Promise.resolve(self.list[tag])
    }

    return self
}


module.exports = Slidemodule