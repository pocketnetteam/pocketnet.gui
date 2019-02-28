//-----------------------------------------------------
window.enableAdapter = true; // enable adapter.js

var rtcMultiConnection = new RTCMultiConnection();
rtcMultiConnection.renegotiatedSessions = {};
rtcMultiConnection.session = { data: true };
//-----------------------------------------------------
var whoIsTyping = document.querySelector('#who-is-typing');
//-----------------------------------------------------
var firstPeerConnect = true;
rtcMultiConnection.onopen = function(e) {
    if (!e.extra.username) {
        e.extra.username = e.userid;
    }

    MsgBox.Add({
        sys: true,
        m: `Connection with "${e.extra.username}"`
    });

    // TEMP
    if (firstPeerConnect) {
        rtcMultiConnection.SendSyncRequest(e.userid);
        firstPeerConnect = false;
    }
};
//-----------------------
rtcMultiConnection.onclose = function(e) {
    refreshPeersList();

    if (!e.extra.username) {
        e.extra.username = 'userid:' + e.userid;
    }

    MsgBox.Add({
        sys: true,
        m: `"${e.extra.username}" is offline`
    });
};
//----------------------------------------------
rtcMultiConnection.onmessage = function(e) {
    if (e.data.typing) {
        whoIsTyping.innerHTML = e.extra.username + ' is typing ...';
        return;
    }

    if (e.data.stoppedTyping) {
        whoIsTyping.innerHTML = '';
        return;
    }

    if (e.data.sync_request) {
        rtcMultiConnection.ReceiveSyncRequest(e);
        return;
    }

    if (e.data.sync_answer) {
        rtcMultiConnection.ReceiveSyncAnswer(e);
        return;
    }

    // if (e.data.syncdb) {
    //     rtcMultiConnection.syncDBReceive(e);
    //     return;
    // }

    // if (e.data.syncdbanswer) {
    //     rtcMultiConnection.syncDBAnswer(e);
    //     return;
    // }

    whoIsTyping.innerHTML = '';
    rtcMultiConnection.Receive_Message(e.data);
};
//-----------------------
rtcMultiConnection.onNewParticipant = function(participantId, userPreferences) {
    rtcMultiConnection.acceptParticipationRequest(participantId, userPreferences);
};
//-----------------------
rtcMultiConnection.onPeerStateChanged = function(event) {
    refreshPeersList();

    if (event.iceConnectionState.search(/closed|failed/gi) !== -1) {
        if (!event.extra.username) {
            event.extra.username = event.userid;
        }

        MsgBox.Add({
            sys: true,
            m: `onPeerStateChanged - "${event.extra.username}" left the room`
        });
    }
};
//-----------------------
//-----------------------
//-----------------------
// Отправка нового сообщения в канал
rtcMultiConnection.Send_Message = function(msg) {
    MsgStorage.AddMessage(msg);
    //MsgBox.Refresh();
    MsgBox.Add(msg);
    rtcMultiConnection.send(msg);
}
// Пришло новое сообщение из канала
rtcMultiConnection.Receive_Message = function(msg) {
    MsgStorage.AddMessage(msg);
    //MsgBox.Refresh();
    MsgBox.Add(msg);
}
//-----------------------
// Отправка своего вектора другому пиру
rtcMultiConnection.SendSyncRequest = function(userid=null) {
    // TODO - Mark existed syncReq as long

    // Get HistoryVector from DB
    // TODO - условия по выборке - все не все
    let _hv = MsgStorage.HistoryVector();

    // Random select `peer`
    let _sync_peer_send = userid;
    if (_sync_peer_send == null) {
        let _peers = rtcMultiConnection.peers.getAllParticipants();
        let _sync_peer_current = Math.floor(Math.random() * _peers.length);
        let _sync_peer_send = _peers[_sync_peer_current];
    }

    // Send `HistoryVector`
    rtcMultiConnection.send({
        sync_request: 1,
        hv: _hv,
        tm_f: '',
        tm_t: '',
    }, _sync_peer_send);

    // - Save info about this syncReq
}
// Кто-то хочет синхронизироваться и отправил свой вектор
rtcMultiConnection.ReceiveSyncRequest = function(e) {
    console.log(e.data);

    // - Check `HistoryVector`
    // - Generate data array by vector diff
    let _db_diff = MsgStorage.CompareDB(e.data.hv, e.data.tm_f, e.data.tm_t);

    // TODO - get peers list

    // Send sync data
    rtcMultiConnection.send({
        sync_answer: 1,
        msgdb: _db_diff,
        users: {},
    }, e.userid);
}
// Входящий блок данных (сообщения)
rtcMultiConnection.ReceiveSyncAnswer = function(e) {
    console.log(e.data);

    // Merge messages DB
    MsgStorage.MergeDB(e.data.msgdb);

    // TEMP
    for (let _msg in e.data.msgdb) {
        MsgBox.Add(e.data.msgdb[_msg]);
    }

    // TODO - Merge peers list

    // - Update `reliability` other messages
    // - Check syncReq as success
    // - Apply onUpdateScreen()
}
//-----------------------