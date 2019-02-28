//----------------------------------------------
var MsgStorage = new MessageStorage();
var MsgBox = new MessageBox(".main");
//----------------------------------------------
function getElement(selector) {
    return document.querySelector(selector);
}
//----------------------------------------------
var main = getElement('.main');
//----------------------------------------------
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    //var color = '#';
    let color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
//----------------------------------------------
var usersList = getElement('#users-list');
function refreshPeersList() {
    usersList.innerHTML = '';
    rtcMultiConnection.peers.forEach(peer => {
        var peerItm = document.createElement('div');
        peerItm.className = 'peerItm';
        peerItm.setAttribute('peerid', peer.userid);

        let userName = (peer.extra ? `${peer.extra.username} (${peer.userid})` : peer.userid);
        peerItm.innerHTML = `<p class="nameLbl" style="color: #${peer.extra.c}">${userName}</p>`;

        usersList.appendChild(peerItm);
    });
}

$("#users-list").on('click', '.peerItm', function(e) {
    let itm = $(e.target).closest('.peerItm');
    let sel = itm.hasClass('selected');
    $('#users-list .peerItm').removeClass('selected');
    $(e.target).closest('.peerItm').toggleClass('selected', !sel);
});
//----------------------------------------------
main.querySelector('#your-name').onkeyup = function(e) {
    if (e.keyCode != 13) return;
    main.querySelector('#continue').onclick();
};
//----------------------------------------------
// main.querySelector('#room-name').onkeyup = function(e) {
//     if (e.keyCode != 13) return;
//     main.querySelector('#continue').onclick();
// };

// main.querySelector('#room-name').value = localStorage.getItem('room-name') || (Math.random() * 1000).toString().replace('.', '');
// if (localStorage.getItem('user-name')) {
//     main.querySelector('#your-name').value = localStorage.getItem('user-name');
// }
//----------------------------------------------
main.querySelector('#continue').onclick = function() {
    var yourName = this.parentNode.querySelector('#your-name');
    var roomName = { value: "123465498463513816818613521", disabled: false }

    if (!roomName.value || !roomName.value.length) {
        return alert('Your MUST Enter Room Name!');
    }

    localStorage.setItem('room-name', roomName.value);
    localStorage.setItem('user-name', yourName.value);

    yourName.disabled = roomName.disabled = this.disabled = true;

    var username = yourName.value || 'Anonymous';

    rtcMultiConnection.extra.username = username;
    rtcMultiConnection.extra.c = getRandomColor();

    MsgBox.Add({
        sys: true,
        m: 'Searching for existing rooms...'
    });

    var roomid = roomName.value;
    rtcMultiConnection.channel = roomid;

    rtcMultiConnection.checkPresence(roomid, function(isRoomExists) {
        if (!isRoomExists) {
            MsgBox.Add({
                sys: true,
                m: 'No room found. Creating new room... You can share following room-id with your friends: <input type=text value="' + roomid + '">'
            });

            rtcMultiConnection.open(roomid);
        } else {
            MsgBox.Add({
                sys: true,
                m: 'Room found. Joining the room...'
            });

            rtcMultiConnection.join(roomid);
        }

        main.querySelector("#loginBox").remove();

        // var socket = rtcMultiConnection.getSocket(function() {});
        // socket.on(rtcMultiConnection.socketCustomEvent, rtcMultiConnection.onCustomMessage);

        console.debug('room is present?', isRoomExists);

        // Start synchronization manager
        syncManager();
    });
};
//----------------------------------------------
function getUserinfo(blobURL, imageURL) {
    return blobURL ? '<video src="' + blobURL + '" autoplay controls></video>' : '<img src="' + imageURL + '">';
}
//----------------------------------------------
function getUserName(userId) {
    //rtcMultiConnection.peers    
    return "";
}
//----------------------------------------------
var isShiftKeyPressed = false;
getElement('.main-input-box textarea').onkeydown = function(e) {
    if (e.keyCode == 16) isShiftKeyPressed = true;
    if (e.keyCode == 17) isCtrlKeyPressed = true;
};
//----------------------------------------------
// Send message to chanel
var numberOfKeys = 0;
getElement('.main-input-box textarea').onkeyup = function(e) {
    numberOfKeys++;
    if (numberOfKeys > 3) numberOfKeys = 0;
    if (!numberOfKeys) {
        if (e.keyCode == 8) {
            return rtcMultiConnection.send({
                stoppedTyping: true
            });
        }
        //-------------------------
        rtcMultiConnection.send({
            typing: true
        });
    }
    //-------------------------
    if (isShiftKeyPressed) {
        if (e.keyCode == 16) isShiftKeyPressed = false;
        return;
    }
    //-------------------------
    if (e.keyCode != 13) return;
    //-------------------------
    let msgTo = $("#users-list .peerItm.selected");
    msgTo = (msgTo.length > 0) ? $(msgTo[0]).attr('peerid') : "";
    //-------------------------
    let message = {
        tm: moment().format('YYYYMMDDHHmmssSSS'),
        f: rtcMultiConnection.userid,
        t: msgTo,
        m: this.value,
        ex: {
            c: rtcMultiConnection.extra.c,
            u: rtcMultiConnection.extra.username,
        }
    };
    //-----------------------
    // Send message to chanel
    rtcMultiConnection.Send_Message(message);
    //-------------------------
    this.value = '';
};
//----------------------------------------------
function syncManager() {
    var syncTimerId = setInterval(function() {
        rtcMultiConnection.SendSyncRequest();
    }, 10000);
}
//----------------------------------------------
//----------------------------------------------