// brangr
//----------------------------------------------
'use strict';
//----------------------------------------------
MessageBox = class {
    constructor(sel) {
        this._box = document.querySelector(sel);
    }
    //----------------------------------------------
    Clear() {
        this._box.innerHTML = "";
    }
    Refresh() {
        // TODO - учитывать scroll
        for (let msg in MsgStorage.DB) {
            this.Add(MsgStorage.DB[msg]);
        }
    }
    //----------------------------------------------
    // TEMP
    Add(msg) {
        if (msg.sys) return;
        //-----------------------
        var newMessageDIV = document.createElement('div');
        newMessageDIV.className = 'new-message';

        var userActivityDIV = document.createElement('div');
        userActivityDIV.className = 'user-activity';

        let userColor = "";
        let headText = "System";
        let headColor = "";
        if (!msg.sys) {
            let sender_ex = {
                u: msg.ex.u,
                c: msg.ex.c
            };
            //-----------------------
            headText = sender_ex.u;
            if (sender_ex.c) {
                userColor = `background-color: #${sender_ex.c}`;
                headColor = `color: #${sender_ex.c}`;
            }
        }
        userActivityDIV.innerHTML += `<div class="user-color" style="${userColor}"></div>`;
        if (!msg.sys) userActivityDIV.innerHTML += `<h2 class="header" style="${headColor}">${headText}</h2>`;

        var p = document.createElement('p');
        p.className = 'message';
        userActivityDIV.appendChild(p);
        if (!msg.sys && msg.t != "") p.innerHTML += `<b>#${msg.t}</b>`;
        p.innerHTML += msg.m;

        newMessageDIV.appendChild(userActivityDIV);

        main.appendChild(newMessageDIV);
        main.scrollTop = main.scrollHeight;

        if (msg.callback) {
            msg.callback(newMessageDIV);
        }

        document.querySelector('#message-sound').play();
    }
    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------
}