// brangr
//----------------------------------------------
'use strict';
//----------------------------------------------
class MessageStorage {
    constructor(prms) {
        this._prms = {
            id: ''
        };
        this._db = {};
        this._hv = {};
        this._ul = {
            // id: {
            //     'username': '',
            //     'color': '',
            // },
        };
        //--------------------
        if (prms) {
            this._prms = _.clone(prms);
        }

        if (this._prms.id in localStorage) {
            this._db = JSON.parse(localStorage[this._prms.id]);
            this._history_vector_compute();
        }
    }
    //-----------------------
    // Check new message
    _check_message(msg) {
        // Проверки нового сообщения
        // - Если новое то просто добавить
        // - Если существует уже:
            // - Если надежность < -5  -> обновить
        // - Если не совпадает время - отбрасываем (diff 1m)
        // ..
        //-----------------------
        return true;
    }
    //-----------------------
    // Compute new historyVector
    _history_vector_compute() {
        for (let _db_idx in this._db) {
            let _msg = this._db[_db_idx];
            this._history_vector_update(_msg.tm + _msg.f);
        }
    }
    //-----------------------
    // Add message to historyVector
    _history_vector_update(msgKey) {
        // Отфильтровать БД по ключу вектора (yyyyMMddHH)
        let _db_filtered = _.filter(this._db, function(v, k) {
            return k.substr(0, 8) == msgKey.substr(0, 8);
        });

        // Формирование хэша
        // https://www.npmjs.com/package/object-hash
        let _hash = $.md5(_db_filtered);

        // yyyyMMddHH - hash
        this._hv[msgKey.substr(0, 8)] = _hash;
    }

    //-----------------------
    // Save messages
    _save() {

        var map = _.map(this._db, function(m){
            return {
                tm : m.tm,
                key : m.tm + m.f
            }
        })

        map = _.sortBy(map, function(msg){

            var t = msg.tm

            if(msg.tm.length == 17) msg.tm = t + '0'

            return Number(msg.tm)
        })

        map = lastEls(map, 100)

        var db = {}

        var _db = this._db

        _.each(map, function(m){
            db[m.key] = _db[m.key]
        })


        localStorage[this._prms.id] = JSON.stringify(db);
    }

    //----------------------------------------------
    get DB() {
        return this._db;
    }
    //----------------------------------------------
    // New message from chanel or by sync
    // Check message
    // Update storage (add, update)
    // Update vector
    AddMessage(msg, save) {
        if (!this._check_message(msg)) return;
        //-----------------------
        // Save to DB
        this._db[msg.tm + msg.f] = {
            tm: msg.tm,
            f: msg.f,
            t: msg.t,
            m: msg.m,
            ex: msg.ex,
            d: 0 // TODO - update or new
        };
        //-----------------------
        // Update HistoryVector for current message key
        this._history_vector_update(msg.tm + msg.f);
            
        if (save)
            this._save()
    }
    //-----------------------
    // Save
    Save(){
        this._save()
    }
    //-----------------------
    // Get Message By Id
    GetMessage(id) {
        //-----------------------
        // Save to DB
        return this._db[id]
        
    }
    //-----------------------
    // Merge messages from input DB to internal DB
    MergeDB(peer_db={}) {
        // - Loop for received data
        for (let _msg in peer_db) {
            this.AddMessage(peer_db[_msg]);
        }

        this._save()
    }
    //-----------------------
    // Compare history vectors and return diff messages
    CompareDB(peer_hv={}, tm_f='', tm_t='') {
        // Объект, содержащий массив сообщений (различия по вектору)
        let ret_db = {};
        //-----------------------
        // Цикл по собственному вектору
        // Отбираются те блоки, которых нет в векторе пира
        // Нужные блоки собираются в объект ret_db для отправки пиру
        for (let _hv_idx in this._hv) {
            // TODO - учитывать граничения по времени tm_f & tm_t
            //
            //
            
            if (!(_hv_idx in peer_hv) || (this._hv[_hv_idx] != peer_hv[_hv_idx])) {
                // TODO - (1)
                for (let idx in this._db) {
                    if (idx.substr(0, 8) == _hv_idx.substr(0, 8)) {
                        ret_db[idx] = this._db[idx];
                    }
                }
            }
        }
        //-----------------------
        return ret_db;
    }
    //-----------------------
    // Getter for history vector
    HistoryVector(tm_from=null, tm_to=null) {
        // TODO - filter by time
        return this._hv;
    }
    //-----------------------
    // 
    //-----------------------
    //-----------------------
}
//----------------------------------------------
// TODO - (1) - function for get partial blocks from object
//----------------------------------------------
//----------------------------------------------
//
if (typeof module !== 'undefined') {
    module.exports = exports = MessageStorage;
}

if (typeof define === 'function' && define.amd) {
    define('MessageStorage', [], function() {
        return MessageStorage;
    });
}