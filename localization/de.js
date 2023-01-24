if(typeof loclib == "undefined" || !loclib)
loclib = {};

loclib.de = {};
var appname = ((window.projects_meta || {})[window.pocketnetproject || "Bastyon"] || {}).fullname || 'Bastyon'


var _l = loclib.de;

//time

_l.fewseconds = "Vor einigen Sekunden";	
_l.oneminute = "Vor einer Minute";	

_l.minutes = function(v){
return v + " Minuten zuvor"
}

_l.tenminutes = "Vor zehn Minuten";	
_l.halfanhour = "Vor einer Stunde";	
_l.anhour = "Vor einer Stunde";	
_l.today = "Heute";	

//authorization

_l.id0 = "Mit einem bestehenden Konto anmelden";	
_l.id1 = "Wenn Sie bereits registriert sind, melden Sie sich bitte an";	
_l.loadqrcode = "QR Code hochladen";
_l.stay = "Angemeldet bleiben";
_l.signin = "Anmelden";
_l.orcreate = "Oder einen neuen Account erstellen";
_l.createnew = "Neuen Account erstellen";
_l.staysafe = "Es ist nicht sicher. Wollen Sie fortfahren?";
_l.or = "oder";

// Register a New Account
_l.id71 = "Einen neuen Account erstellen";
_l.id72 = "Bereits Mitglied? Anmelden";

_l.rtip1 = "Notieren Sie sich Ihren privaten Anmeldeschlüssel";
_l.rtip2 = function(mobile){
var h = "Unten sehen Sie Ihren privaten Anmeldeschlüssel. Schreiben Sie ihn auf und speichern Sie Ihren QR Code" 

if(mobile){ h += "Gerät" } else { h+="PC" }

h+=" und verlieren Sie ihn nicht. Wir speichern keine persönlichen Daten. Der Anmeldeschlüssel kann nicht wiederhergestellt werden!"

return h 
}

_l.generatepkey = "Anmeldeschlüssel erzeugen";
_l.rtip3 = "Schreiben Sie den Anmeldeschlüssel auf und speichern Sie es als QR Code. Wir speichern keine persönlichen Daten. Der Anmeldeschlüssel kann nicht wiederhergestellt werden! ";
_l.saveqrcode = "QR Code speichern" 
_l.copyprivkey = "Anmeldeschlüssel kopieren"
_l.rcontinue = "Weiter"
_l.idle = "Einige Zeit im Wartungszustand"
_l.congratulations = "Herzlichen Glückwunsch! Sie sind in <span class='pnlabel'>"+appname+"</span>"
_l.creatingpreloader = "Account wird erstellt"
_l.removepaste = "Für diese Eingabe wurde die Kopierfunktion deaktiviert"
_l.filedamaged = "Datei enthält keinen gültigen Anmeldeschlüssel"
_l.keysnotmatch = "Anmeldeschlüssel stimmt nicht überein"
_l.confirmkey = "Geben Sie Ihren privaten Anmeldeschlüssel ein oder laden Sie den QR Code aus dem vorherigen Schritt hoch"
_l.successfullycopied = "Schlüssel wurde erfolgreich kopiert"
_l.urlsuccesscopied = "Link wurde erfolgreich kopiert"

_l.confirmkeyLabel = "Bitte bestätigen Sie Ihren Anmeldeschlüssel. Geben Sie den Schlüssel in das Formular ein oder <b>laden Sie den QR Code hoch</b>"
_l.repeatetocreate = "Wiederholen, um nochmals einen Anmeldeschlüssel zu erzeugen"
_l.confirmcreate = "Account erstellen"


//user activation

_l.useractivation = "Benutzer-Aktivierung";	
_l.wesentmoney = "Wir haben Ihnen einige Münzen für die Registrierung gesendet";	
_l.wesentmoneym = "Wir haben Ihnen bereits einige Münzen für die Registrierung gesendet";


_l.wesentmoneydelay = "Der Vorgang dauert länger als gewöhnlich, bitte warten Sie noch etwas";

_l.funetworkproblems = "Es gibt ein Problem mit der Verbindung, bitte versuchen Sie es später erneut";

_l.pleasewait = "Bitte warten";	
_l.next = "Weiter";	
_l.welcometopocketnet = "Willkommen zu "+appname+"";	
_l.continue = "Weiter";	

//user page

_l.rstate = "Ansehen";	
_l.rprofile = "Profil";	
_l.rsettings = "Einstellungen";	
_l.rwallet = "Geldbeutel";	
_l.raccounts = "Accounts";	
_l.rsystem = "System";
_l.rconnection = "Verbindung";
_l.pnetAddress = ""+appname+" Adresse";	
_l.profile = "Profil";	
_l.signout = "Abmelden";

//send
//ä ö ü
_l.postlabel = "Spende für den Beitrag";	
_l.donationlabel = "Spende";	
_l.donationwel = "Wenn Sie dem Autor danken möchten, können Sie eine "+appname+"-überweisung benutzen ";
_l.donationwela = ""+appname+"-überweisung";	
_l.donationwelan = "Oder Sie können ein anderes Kryptowährungs-System nutzen";	
_l.successfullycopiedaddress = "Adresse wurde erfolgreich kopiert";	

//wallet

_l.wrecieve = "Erhalte Münzen durch das Teilen der Adresse";	
_l.wcopyshare = "Adresse kopieren und teilen:";	
_l.wqrcode = "QR Code";		
_l.wcopeaddress = "Adresse kopieren";	
_l.wcreatelink = "Oder erstellen Sie einen Link für die Bezahlung";	
_l.required = "Erforderlich";	
_l.wgetlink = "Link bekommen";	
_l.waddresses = "Adressen";	
_l.waddress = "Adresse";	
_l.wbalance = "Balance";	
_l.wpercente = "Prozent";	
_l.waddaddress = "Eine neue Geldbeutel-Adresse entdecken";	
_l.wrecieve = "Erhalten";	
_l.wrecieveon = "Erhalten am";	
_l.wcopyshareorcreate = "Adresse kopieren und teilen oder Zahlungslink erstellen";
_l.wdgetlink = "Link bekommen";	
_l.wdqrcode = "QR Code";
_l.wdcopyaddress = "Adresse kopieren";	
_l.wdpleasefill = "Bitte füllen Sie diese Felder aus";
_l.wduseqr = "Benutzen Sie diesen QR-Code um das Geld zu empfangen";	
_l.wdaddress = "Adresse";
_l.wdamount = "Betrag";	
_l.wdlabel = "Label";	
_l.wdmessage = "Nachricht";	
_l.wsend = "Senden";
_l.calcfeesandsend = "Gebühren berechnen und senden";	
_l.wstrfees = "Transaktionsgebühren";	
_l.wsfees = "Gebühren";	

_l.wssendto = "MÜNZEN SENDEN AN";	
_l.wssendb = "SENDEN";	

_l.tacaddress = "Account Adresse";	
_l.twallet = "Geldbeutel";	
_l.twalletaddresses = "Geldbeutel-Adressen";	
_l.tTotal = "Insgesamt";	
_l.wsselect = "Wählen Sie die Quelle aus dem Menü aus";	
_l.wsenter = "Geben Sie die Adresse ein oder wählen Sie sie aus dem Menü aus";	
_l.wsreciever = "Empfängeradresse";	
_l.wsamount = "Betrag";	
_l.wsamountof = "Betrag Ihrer überweisung";	
_l.wsincludefees = "Gebühren in Betrag inklusive";	
_l.wsrecieverpay = "Vom Empfänger zu bezahlen";	
_l.wssenderpay = "Vom Sender zu bezahlen";	
_l.wdselectfrom = "Aus Menü auswählen";	

_l.wdenteramount = "Betrag eingeben";	
_l.wdmessageplaceholder = "Für was ist diese überweisung?";
_l.wrenteraddress = "Adresse eingeben";
_l.wrenteraddressselect = "Geben Sie die Adresse ein oder wählen Sie sie aus dem Menü aus";
_l.wreturntoeallet = "ZURÜCK ZUM GELDBEUTEL";	
_l.linkCreated = "LINK ERSTELLT";
_l.waddresswascop = "Adresse wurde erfolgreich kopiert";
_l.wqrcodecreated = "QR CODE ERSTELLT";
_l.wlinkcreating = "LINK WIRD ERSTELLT";
_l.wqrcodecreating = "QR CODE WIRD ERSTELLT";
_l.wdoptions = "OPTIONEN";
_l.wssuccessfully = "Überweisung erfolgreich gesendet";
_l.wscalculatefees = "GEBÜHREN BERECHNEN";
_l.wsaddressnotv = "Adresse ist nicht gültig";

//user profile
_l.uaddaddressdona = "Adresse für Spenden hinzufügen";
_l.uaddaddressdonaplace = "Adresse eingeben";
_l.uchangeicon = "Profilbild hochladen";
_l.utip1 = "Sie müssen einen Namen auf blockchain erstellen bevor Sie "+appname+" benutzen";
_l.utip2 = "Nur noch ein Schritt";
_l.upicset = "Profilicon festlegen";
_l.upic = "Profilicon";
_l.uuserinfo = "Benutzer-Informationen";
_l.usave = "Speichern";
_l.ucancel = "Abbruch";
_l.uwaitb = "Warte auf Bestätigung, um die Informationen zu speichern ";
_l.uchanges = "Es gibt keine Veränderung";
_l.uchangesvalid = "Sie müssen einen Benutzernamen erstellen";
_l.uname = "Name";
_l.unickname = "Spitzname";
_l.ulanguage = "Sprache";
_l.uabout = "Über mich";
_l.uwebsite = "Website";
_l.uaddresesd = "Adresse für Spenden";
_l.usavechanges = "Wollen Sie die änderungen speichern?";

//ustate
_l.sreps = "Ansehen und Einschränkungen";
_l.sdisconnected = "Vom Netzwerkknoten getrennt";
_l.suseractivation = "Benutzeraktivierung";
_l.sprofile = "Profil";
_l.spc = "Beitragszähler";
_l.ssc = "Sternezähler";
_l.ccc = "Kommentarezähler";
_l.crc = "Anzahl der Kommentarbewertungen";
_l.stp = "Testphase";
_l.artc = "Artikel zählen";
_l.srep = "Ansehen";


//accounts
_l.aaddedacc = "Hinzugefügte Accounts";
_l.acure = "Momentan";
_l.aaddacc = "Account hinzufügen";
_l.ascheduler = "Planer";
_l.aused = "Diese Adresse wird bereits in einem anderen Adressenpool verwendet";


//author
_l.sub = "Folgen";
_l.unsub = "Nicht mehr folgen";
_l.joined = ""+appname+" beigetreten";
_l.shares = "GETEILT";
_l.uposts = "BEITRÄGE";
_l.myuposts = "MEINE BEITRÄGE";
_l.followers = "FOLLOWERS";
_l.following = "FOLLOWING";
_l.settings = "VERWALTEN";
_l.anofollowers = "Dieser Benutzer hat keine Follower";
_l.aynofollowers = "Sie haben keine Follower";
_l.anofollowing = "Dieser Benutzer folgt niemandem";
_l.aynofollowing = "Sie folgen niemandem";

//lenta
_l.lloadmore = "Mehr tolle Beiträge laden!";
_l.lloadprev = "Neue, tolle Beiträge laden";


_l.lend = "Ende der Beiträge";
_l.zerop = "Momentan gibt es keine Beiträge von diesem Autor";
_l.zeroy = "Sie haben noch keine Veröffentlichungen bis jetzt, teilen Sie etwas!";



_l.llogin = "Sie müssen sich einloggen, um fortzufahren";
_l.lcomlaindialog = "Sind Sie sicher, dass Sie diesen Beitrag melden wollen?";
_l.lunsubscribe = "Wollen Sie diesem Account wirklich nicht mehr folgen?";
_l.lprivatepublic = "Wollen Sie ein privates oder öffentliches Abonnement abschließen?";
_l.lprivate = "Privat";
_l.lpublic = "Öffentlich";

//share
_l.newShare = "Neuer Beitrag";
_l.firstShare = "Teilen Sie Ihren ersten Beitrag in "+appname+"";
_l.scaption = "Unterschrift";
_l.whatsnew = "Was ist neu?";
_l.saddlink = "Link zu externer Seite oder Video hinzufügen";
_l.saddimages = "Bilder zum Beitrag hinzufügen";
_l.sarticle = "Um einen Artikel zu schreiben";
_l.stelegram = "Auf Telegram senden"
_l.stimes = "Beitrag entfernen"


_l.snothing = "Nichts";
_l.sposttime = "Zu bestimmter Zeit posten";
_l.spostnow = "Jetzt posten";
_l.stimenotselected = "Zeit wurde nicht eingestellt";
_l.spost = "Posten";
_l.sdate = "Datum";
_l.stime = "Zeit";
_l.snotags = "Tags hinzufügen";
_l.expandvideo = "Klicken zum ausfahren";
_l.emptymessage = "Nachricht ist leer";
_l.emptytags = "Bitte fügen Sie Tags hinzu";
_l.emptyutxo = "Kein Geld";
_l.networkerror = "Netzwerk Error";
_l.maximages = "Maximal 10 Bilder erlaubt";
_l.sharenow = "Wollen Sie diesen Inhalt jetzt teilen?";
_l.pastdate = "Früheres Datum";
_l.timenotselected = "Zeit nicht ausgewählt";
_l.addtags = "Tags hinzufügen";
_l.tnews = "News";
_l.timages = "Bilder";
_l.tvideos = "Videos";
_l.tmarket = "Markt";
_l.tsport = "Sport";

//menu
_l.signinmenu = "Anmelden";
_l.signupmenu = "Registrieren";
_l.aboutmenu = "Mehr erfahren";

//footer
_l.aboutus = "Über uns";



// Dialog Box Options
_l.daccept = "Akzeptieren";
_l.dcancel = "Abbrechen";
_l.dyes = "Ja";
_l.dno = "Nein";
_l.dsa = "Nicht mehr anzeigen";


// Messages 

_l.coinbaseSuccess = function(v){
return "Herzlichen Glückwunsch, Sie haben " + v + " Pocketmünzen für Ihre letzte Aktivität gewonnen!"
}
_l.coinbaseSuccesspost = function(v){
return "Herzlichen Glückwunsch, Sie haben " + v + " Pocketmünzen für Ihren letzten Beitrag gewonnen!"
}
_l.coinbaseSuccesscomment = function(v){
return "Herzlichen Glückwunsch, Sie haben " + v + " Pocketmünzen für Ihren letzten Kommentar gewonnen!"
}
_l.userSent = function(v){
return "Es wurden <b>" + v + " POC</b> zu Ihnen gesendet"
}




_l.refferalUserMessage = "Herzlichen Glückwunsch! Sie haben jemanden aus dem zensierten Netz befreit. Einige Münzen sind auf ihrem Weg!"

_l.subscribeUserMessage = "folgt Ihnen"
_l.unsubscribeUserMessage = "folgt Ihnen nicht mehr"
_l.gotoprofileMessage = "Gehe zum Profil"
_l.upvoteShareMessage = "Hat Ihren Beitrag geliket"

_l.upvoteCommentMessage = " hat Ihren Kommentar geliket"

// Errors 

_l.error = "Error";
_l.checkScoreError = "Sie müssen die notwendigen Kontoinformationen ausfüllen, bevor Sie "+appname+" benutzen können. Wollen Sie dies jetzt machen?";
_l.checkScoreErrorLight = "Account ist nicht aktiviert";
_l.timestamperror = "Uhrzeit in der Anwendung und im Netzknoten stimmen nicht überein";

// Error Page 404
_l.e404 = "ERROR 404";	
_l.e404e = "Seite nicht gefunden. Zurück zur Hauptseite?";	
_l.postLimitLight = function(v){
return "Sie haben Ihr Limit von " + (v || 15) + " Beiträgen in 24h erreicht";
}
_l.postLimitLight = function(v){
return "Sie haben Ihr Limit von " + (v || 15) + " Bewertungen in 24h erreicht";
}

_l.doubleLimitLight = "Sie haben dies bereits bewertet";	

_l.SelfSubscribeError = "Sie können Sich nicht selber folgen";
_l.DoubleSubscribeError = "Sie folgen diesem Nutzer bereits";
_l.InvalideSubscribeError = "Sie haben diesen Benutzer nicht abonniert";
_l.ChangeInfoLimitError = "Sie können Ihr Profil nur ein mal pro Stunde bearbeiten. Bitte warten Sie und versuchen Sie es erneut. ";
_l.SelfScoreError = "Sie können Ihren eigenen Beitrag nicht bewerten";

_l.unexperror10 = "Unbekannter Fehler (10)";
_l.unexperror11 = "Unbekannter Fehler (11)";
_l.unexperror12 = "Unbekannter Fehler (12)";

_l.networkerror = "Es sind Probleme mit dem Netzwerkknoten aufgetreten";

_l.canSpendError = "Sie müssen warten, bis Ihre vorherige überweisung in der Blockchain freigegeben wurde. Bitte warten Sie.";
_l.noMoneyError  = "Sie können keine Aktionen mit einem leeren Kontostand ausführen";



_l.waitConf = "Sie müssen warten, bis Ihre vorherige überweisung in der Blockchain freigegeben wurde.";
_l.postWaitConf = "Beitrag wartet auf Bestätigung der Blockchain";



// notifications

_l.ntnow = "Jetzt"
_l.ntlasthour = "Diese Stunde"
_l.nttoday = "Heute"
_l.ntmounth = "Diesen Monat"
_l.ntearlier = "Älter"


_l.nodeWalletAdd = "Es kann einige Zeit in Anspruch nehmen, eine Adresse hinzuzufügen. Fortfahren?"
_l.nodeEnableNoteHeader = "Hinweis"
_l.nodeEnableNote = "Diese Drehung am Netzwerkknoten kann bis zu 5GB RAM-Speicher in Anspruch nehmen. Stellen Sie sicher, dass Sie genug Speicherplatz haben. Frühliches staking!"


/// 1301 

_l.address = "Adresse"
_l.privatekey = "Anmeldeschlüssel"
_l.qrcode = "QR Code"
_l.addaccount = "Account hinzufügen"
_l.entermnimo = "Geben Sie die mnemonische Phrase oder den Anmeldeschlüssel ein"
_l.add = "Hinzufügen"
_l.e13011 = "Sie werden mit Ihrer Registrierung fortfahren, nachdem Sie "+appname+"Desktop installiert haben."
_l.e13012 = "Falls der Download von "+appname+" nicht gestratet ist, bitte klicken Sie hier um es zu installieren."
_l.e13013 = "Schreiben Sie eine Bildunterschrift (optional)"
_l.e13014 = "Diese Datei besitzt ein ungültiges Format:"
_l.e13015 = "Diese Datei ist zu groß:"
_l.e13016 = "Fügen Sie einen Youtube, Vimeo Link ein und drücken Sie Enter"
_l.e13017 = "Auf Blockchain laden"
_l.e13018 = "Wollen Sie diesen Artikel wirklich entfernen?"
_l.e13019 = "Neu"
_l.e13020 = "Neuen Artikel schreiben"
_l.youarefollowing = "Sie folgen"
_l.follow = "Folgen"
_l.blocked = "Blockiert"
_l.e13021 = "Mehr anzeigen"
_l.block = "Benutzer"
_l.blockuser = "Benutzer blockieren"
_l.unblockuser = "Benutzer freigeben"
_l.e13022 = "Wollen Sie diesem Benutzer wirklich nicht mehr folgen?"
_l.unfollow = "Nicht mehr folgen"
_l.unblock = "Freigeben"
_l.share = "Teilen"
_l.info = "Info"
_l.signToComment = "Um Kommentare zu sehen oder zu schreiben, müssen Sie sich anmelden oder registrieren"
_l.e13023 = "Wollen Sie diesen Benutzer wirklich freigeben?"
_l.e13024 = "Ihr privater Anmeldeschlüssel"
_l.e13025 = "Neuen Account erstellen"
_l.e13026 = "Tritt "+appname+" bei — Die Zukunft des freien Webs"

_l.e13027 = "Angemeldet bleiben"
_l.e13028 = "Sie haben einen ungültigen Anmeldeschlüssel eingegeben"
_l.e13029 = "Nachricht ist leer"
_l.e13030 = "Kommentare können nicht länger als 1000 Zeichen sein"
_l.e13031 = "Diesen Kommentar teilen"
_l.e13032 = "Wollen Sie Ihren Kommentar wirklich löschen?"
_l.e13033 = "Kommentar wurde gelöscht"
_l.e13034 = "Ja"
_l.e13035 = "Nein, Abbrechen"
_l.hide = "Ausblenden"
_l.e13036 = "Vorherige Kommentare anzeigen"
_l.e13037 = "Antworten"
_l.remove = "Entfernen"
_l.e13038 = "Jetzt kommentieren und Ansehen erwerben"
_l.e13039 = "Jetzt kommentieren und Ansehen erwerben"
_l.e13040 = "Sie haben keinen Kommentierprivileg"
_l.complain = "Beschweren"
_l.next = "Weiter"
_l.post = "Posten"
_l.e13041 = ""+appname+" Verbindung"
_l.e13042 = ""+appname+" Proxy"

_l.e13043 = ""+appname+" Netzwerkknoten"
_l.e13044 = "Knoten hinzufügen"
_l.e13045 = "Knoten nicht gefunden"
_l.e13046 = "Adresse"
_l.e13047 = "WS"
_l.e13048 = "Name"
_l.e13049 = "Status"
_l.e13050 = "Proxies nicht gefunden"
_l.e13051 = "Proxy nicht benutzen"
_l.e13052 = "Keine Verbindung zum Proxy möglich"
_l.e13053 = "Keine Verbindung zum Knoten möglich"
_l.e13054 = "Proxy hinzufügen"
_l.e13055 = "Proxy bearbeiten"
_l.save = "Speichern"
_l.e13056 = "Knoten Host"
_l.close = "Schließen"
_l.e13057 = "Bitte füllen Sie alle Felder aus"
_l.e13058 = "Sie haben diesen Proxy bereits gelistet"
_l.delete = "Löschen"
_l.e13059 = "Wollen Sie diesen Proxy wirklich aus der Liste löschen?"
_l.e13060 = "Proxyliste"
_l.e13061 = "Wollen Sie wirklich ohne Proxy verbinden? Dies ist unsicher (Http Verbindung)"

_l.e13062 = "Netzwerkknoten bearbeiten"
_l.onproxy = "Auf Proxy"
_l.locally = "Lokal"
_l.nodehost = "Knoten Host"
_l.e13063 = "RPC Port"
_l.e13064 = "WS Port"
_l.e13065 = "Name des Netzwerkknotens"
_l.e13066 = "Bitte geben Sie den Namen des Knotens ein"
_l.e13067 = "RPC Login"
_l.e13068 = "Login für PRC Autorisierung"
_l.e13069 = "RPC Passwort"
_l.e13070 = "Passwort für PRC Autorisierung"
_l.e13071 = "Bitte füllen Sie alle Felder aus"
_l.e13072 = "Wollen Sie diesen Netzwerkknoten wirklich aus der Liste löschen?"
_l.e13073 = "Wollen Sie wirklich ohne Proxy verbinden? Dies ist unsicher (Http Verbindung)"
_l.notselected = "Nicht ausgewählt"
_l.donation = "Spende"
_l.e13074 = "Erwarte Gelder. Adresse wird gültig sein für"
_l.sminutes = "Minuten"
_l.e13075 = "Zeit für diesen Deal ist abgelaufen"
_l.reactivate = "Reaktivieren"
_l.e13076 = "Diesen Code scannen, um zu senden"
_l.back = "Zurück"
_l.e13077 = "Fügen Sie Ihr Profil zu der Liste des Spenders hinzu"
_l.e13078 = "Warum fragen wir nach Spenden?"
_l.e13079 = "Wir haben trotz Vollzeitjob mehr als 14 Monate in unserer Freizeit damit verbracht, "+appname+" zu den Menschen zu bringen. Zusätzlich zu unserer Zeit und Energie haben wir auch aus eigener Hand Geld bezahlt, um die Plattform zum Laufen zu bringen. Jetzt brauchen wir die Community, um uns für weiteres Wachstum zu helfen."
_l.e13080 = "Wie werden die Spendengelder benutzt?" 
_l.e13081 = "Die Gelder werden für Werbematerialien und die Anstellung von speziellen Experten verwendet, um "+appname+" noch sicherer zu machen. Das momentane Entwicklerteam wird von den Spenden nichts bekommen. Wann immer möglich werden wir hier posten, wie wir die Spendengelder verwendet haben. "
_l.e13082 = "Was du für deine Spende bekommst, außer das Wissen, die Freiheit unterstützt zu haben:"
_l.e13083 = "Als Zeichen für die Wertschützung deiner Spende wirst du ein Geschenk von einigen Pocketmünzen erhalten."
_l.e13084 = "Außerdem wirst du, sobald ein Gruppenchat besteht, Teil einer speziellen Spendergruppe sein und direkten Zugang zum Team haben, auch wenn die Plattform w�chst."
_l.e13085 = "Der Link zu deinem "+appname+"-Profil wird unten angegeben sein, sodass mehr Menschen zu deinen Beiträgen finden (außer du willst das nicht)"
_l.e13086 = "Unterstütze das dezantralisierte Web jetzt"
_l.e13087 = "Bitcoin, Litecoin"

_l.e13088 = ""+appname+" Mitglieder, die gespendet haben, um "+appname+" zu unterstützen"
_l.thankyou = "Danke!"
_l.e13089 = "Wenn Ihr "+appname+"-Profil in der Liste der Spender erscheinen soll, senden Sie uns bitte Informationen über Ihre Spende"
_l.e13090 = "Füge mich zur Liste der Spender hinzu"
_l.e13091 = "Oder Sie können uns eine E-Mail senden"
_l.e13092 = "mit Ihrem öffentlichen Schlüssel und dem Betrag."
_l.finish = "Fertig"
_l.e13093 = "Bitte wählen Sie die Spendenmethode"
_l.e13094 = "Etwas ist schief gelaufen. Bitte laden Sie die Seite neu und versuchen Sie es nochmals (error: 0001)"
_l.e13095 = "Danke, dass Sie unsere Arbeit für Freiheit unterstützen. Wir werden sicherstellen, dass jeder Cent zählt."
_l.e13096 = "Bitte geben Sie den Betrag der Spende ein"
_l.e13097 = "Etwas ist schief gelaufen. Bitte laden Sie die Seite neu und versuchen Sie es nochmals (error: 0002)"
_l.e13098 = "Link auf externe Seite oder Ressource hinzufügen"
_l.e13099 = "Bilder hochladen"
_l.e13100 = "Klicken Sie hier, um die Dateien auszuwählen, die hochgeladen werden sollen"
_l.e13101 = "oder durch drag & drop"
_l.e13102 = "Link auf externe Seite hinzufügen"
_l.e13103 = "URL ungültig"
_l.e13104 = "Max 6 Bilder erlaubt"
_l.e13105 = "Netzwerkknoten Management"
_l.e13106 = ""+appname+" Netzwerkknoten"
_l.e13107 = "Netzwerkknoten Management kann durch die Anwendung ausgeführt werden"
_l.e13108 = "Es gibt keine Verbindung mit dem Electron proxy Interface"

_l.e13109 = "Bitte geben Sie die Wörter in dem Bild ein, um Pocketcoins zu empfangen und mit der Registrierung fortzufahren"
_l.e13110 = "Wörter eingeben"
_l.next = "Weiter"
_l.refresh = "Neu laden"
_l.e13111 = "Geben Sie Ihre E-Mail an, um die neusten "+appname+" Infos zu bekommen"
_l.e13112 = "E-Mail eingeben"
_l.e13113 = "E-Mail hinzufügen"
_l.skip = "Überspringen"
_l.e13114 = "Es gibt ein Problem mit Ihrer Registrierung aufgrund seltsamer Aktivität"
_l.e13115 = "Bitte E-Mail"
_l.e13116 = "um Münzen zu empfangen und Ihren Account zu öffnen"
_l.e13117 = "Kontostand überprüfen"
_l.joinnow = "Jetzt beitreten"
_l.loading = "Lädt"
_l.e13118 = "Wörter stimmen nicht überein"
_l.e13119 = "E-Mail hinzufügen und fortfahren"
_l.e13120 = "Anwendungen"
_l.e13121 = "Es sind keine Bilder vorhanden"
_l.e13122 = "Neueste Kommentare"

_l.e13123 = "Mehr Beiträge anzeigen" 
_l.e13124 = "Mehr tolle "+appname+" Beiträge!"
_l.e13125 = "Top Beiträge Sektion ist leer!"
_l.e13126 = "Beiträge von Leuten, denen du folgst erscheinen hier"
_l.e13127 = "Beiträge von Leuten, denen du folgst erscheinen hier"
_l.e13128 = "Beiträge von Leuten, denen du folgst erscheinen hier"
_l.registration = "Registrierung"
_l.editpost = "Beitrag bearbeiten"
_l.removepost = "Beitrag entfernen"


_l.reportpost = "Beschweren"
_l.donate = "Spenden"
_l.blockuser = "Benutzer blockieren"
_l.more = "Mehr"
_l.showmore = "Mehr anzeigen"
_l.e13129 = "Angehängte Bilder"
_l.e13130 = "Bearbeitet"
_l.e13131 = "Sie haben diesen Benutzer blockiert"
_l.e13132 = "bewertet"
_l.e13133 = "Das teilen"
_l.e13134 = "Für diese Sucheingabe gibt es keine Ergebnisse"
_l.e13135 = "Benutzer hat keinen privaten Schlüssel"
_l.e13136 = "Alle Beiträge"
_l.e13137 = "Deine Pocket"
_l.e13138 = "Top Beiträge"
_l.discussed = "Am meisten diskutiert"
_l["Most Discussed Over"] = "Für einen Zeitraum"
_l.e13139 = "SUCHE AUF "+appname.toUpperCase()+""
_l.e13140 = "SUCHE AUF"
_l.notifications = "Benachrichtigungen"
_l.showall = "Zeige alles"
_l.e13141 = "Sie haben keine Benachrichtigungen"

_l.recommendations = "Empfehlungen"
_l.e13142 = "Ich habe meinen Schlüssel gesichert, nicht mehr erinnern"
_l.e13143 = "Wichtig!"
_l.e13144 = "Text kopieren"
_l.e13145 = "Schlüssel auf Gerät speichern"
_l.e13146 = "Ende der Beiträge"
_l.e13147 = "Das teilen"
_l.e13148 = "Wollen Sie sich wirklich über diesen Beitrag beschweren?"
_l.e13149 = "Benutzer Bewertungen"
_l.e13150 = "Beitrag Bewertungen"
_l.e13151 = "Keiner bewertet diesen Beitrag"
_l.e13152 = "Benutzer Punkte"
_l.e13153 = "Überspringen und weiter zur Website" 
_l.e13154 = "Ihre Login Informationen"
_l.e13155 = "Um "+appname+" zu benutzen müssen Sie Ihren privaten, kryptographischen Schlüssel generieren. Dieser ersetzt den Login und das Passwort von zentralgesteuerten sozialen Netzwerken."
_l.users = "Benutzer"
_l.userstx = "Benutzer"
_l.user = "Benutzer"
_l.postscount = "Beitragzähler"
_l.about = "Über uns"
_l.e13156 = "Weitere Ergebnisse"
_l.posts = "Beiträge"
_l.e13157 = "Suche nach"
_l.e13158 = "hat keine Ergebnisse"
_l.e13159 = "Die Sucheingabe ist leer"
_l.repost = "Repost"
_l.e13160 = "Hallo Pocketeers!"

_l.e13161 = "Fügen Sie Tags zu Ihren Beiträgen hinzu"
_l.e13162 = "Sie können max. 15 Tags hinzufügen"
_l.e13163 = "Es gibt keine Veränderungen im Beitrag"
_l.e13164 = "Bitte füge einige Wörter hinzu, um den Pocketleuten über deinen Link zu erzählen. Um was geht es? Warum ist es wichtig? Was ist Ihre Meinung?"
_l.e13165 = "Ihr Link zum Video ist ungültig. Bitte laden Sie eine gültige Video-URL."
_l.e13166 = "Sie haben"
_l.e13167 = "Menschen aus dem zensierten Web gerettet"
_l.e13168 = "Verdienen Sie Pocketmünzen durch jede Registrierung über Ihren Link"
_l.e13169 = "Direkter Link"
_l.copy = "Kopieren"
_l.e13170 = "Inklusive "+appname+" Registrierung Anfuf-zur-Aktion" 
_l.more = "Mehr"
_l.e13171 = "Gute Neuigkeiten! Ich habe meine Unabhängigkeit von sozialen Medien erworben, komm und begleite mich auf pocketnet.app, sodass wir uns unabhängig austauschen und chatten können auf der Blockchain. Begleite mich hier"
_l.e13172 = "Ich will dies mit dir von einer dezentralisierten Blockchain Plattform "+appname+" mit dir teilen. Hoffe du findest es nützlich und wenn du dich registrierst werden beide von uns einen Pocketcoin Kryptowährungs Bonus erhalten!"
_l.e13173 = "Über E-Mail senden"
_l.e13174 = "Soziales Teilen"
_l.e13175 = "Beliebte Tags"
_l.e13176 = "Adressen Typ"
_l.e13177 = "Foto hochladen"

_l.requiredfields = "benötigte Felder"
_l.e13178 = "Nicht auf dein Profil verlinkt"
_l.e13179 = "Nicht ausgegebene Liste"
_l.e13180 = "Ihr Invoice wurde erfolgreich erstellt"
_l.e13181 = "Ein Fehler ist während des Erstellens des Angebotes aufgetreten"
_l.e13182 = "Erkunder blockieren" 
_l.e13183 = "Hilfe Center"
_l.e13184 = "Registrierung fortfahren"
_l.e13185 = "Verbindung verloren"
_l.e13186 = "Profil bearbeiten"
_l.e13187 = "Inhalte"
_l.e13188 = "Bitte speichern Sie Ihren privaten kryptographischen Schlüssel, da er Login und Passwort von zentralgesteuerten sozialen Netzwerken ersetzt"
_l.e13189 = "Verlassen und meinen Schlüssel für immer verlieren!"
_l.e13190 = ""+appname+" Thema"
_l.e13191 = "Thema setzen"
_l.e13192 = "Level"
_l.e13193 = "BONUS"
_l.e13194 = "Ansehen und Belohnungen"
_l.e13195 = "Einschränkungen"
_l.e13196 = "Es nimmt viel auf"
_l.e13197 = "Pocketmünzen empfangen"
_l.e13198 = "Ungeführe Wartungszeit ist.."
_l.e13199 = ""+appname+" jetzt beitreten"

_l.e13200 = "Zurück zu "+appname+""
_l.e13201 = "BETA beitreten"
_l.e13202 = ""+appname+" beta test wird am 24. Januar starten"
_l.e13203 = "Danke, dass Sie der "+appname+" Beta E-Mail Liste beigetreten sind. Es ist nicht notwendig, dass Sie "+appname+" benutzen, wir werden jedoch diese E-Mail benutzen, um Ihnen Umfragen zu senden, die uns bei der Verbesserung der Plattform helfen. Danke, dass Sie uns bei der Gestaltung der Zukunft des Internets helfen."
_l.e13204 = ""+appname+" Empfänger Adresse"
_l.e13205 = "Parameter"
_l.e13206 = "Pocketmünzen Betrag empfangen"
_l.e13207 = "Betrag senden"
_l.e13208 = "Verfügbar"
_l.e13209 = "Crowdfunding Liste"
_l.e13210 = "Neuer Deal"
_l.e13211 = "Link kopieren und teilen"
_l.amount = "Betrag"
_l.label = "Label"
_l.message = "Nachricht"
_l.copylink = "Link kopieren"
_l.e13211 = "Bitte fällen Sie diese Felder aus"
_l.e13212 = "QR Code erstellen"
_l.e13213 = "Empfänger Adresse"
_l.process = "Verarbeite"
_l.source = "Quelle"
_l.yourmessage = "Ihre Nachricht"
_l.e13214 = "Pocketmünzen Betrag"
_l.currency = "Währung"


_l.e13215 = "Währung auswählen"
_l.e13216 = "Währung Betrag"
_l.e13217 = "Zeit für diesen Deal ist abgelaufen."
_l.e13218 = "Warte auf Bestätigung der Blockchain"
_l.e13219 = "Sende Pocketmünzen zu Ihnen"
_l.e13220 = "Pocketmünzen gesendet"
_l.errorreload = "Etwas ist schief gelaufen. Bitte laden Sie die Seite neu und versuchen Sie es nochmal."
_l.e13221 = "Wollen Sie wirklich die Informationen zu diesem Deal löschen? Es kann nicht gestoppt werden"
_l.e13222 = "Downloade Desktop App — das ist der zensurbest�ndigste Weg, "+appname+" zu benutzen. Auch bei einer Schließung der Websites wird die Desktop App durch die direkte Verbindung zum Netzwerkknoten weiterhin funktionieren."
_l.e13223 = "Download "+appname+" für Windows"
_l.e132232 = "Download "+appname+" für macOs"
_l.e13224 = "Download "+appname+" für Linux"
_l.e13225 = ""+appname+" Netzwerkknoten"
_l.e13226 = "Download Netzwerkknoten"
_l.e13227 = "Download "+appname+" Netzwerkknoten für Windows"
_l.e13228 = "Download "+appname+" Netzwerkknoten für Linux"
_l.e13229 = "Ungültiger privater Schlüssel"
_l.e13230 = "Unbekannter Verbindungsfehler"

_l.e13231 = "Verbindung verloren"
_l.e13232 = "Nicht möglich, sich mit dem Netzwerkknoten zu verbinden"
_l.e13233 = "Dieser Kommentar wurde gelöscht"
_l.e13234 = "Opreturn error/41"
_l.e13235 = "Sie können einen Kommentar nicht zweimal bewerten"
_l.e13236 = "TDieser Kommentar wurde gelöscht"
_l.e13237 = "Sie können Sich nicht selbst bewerten"
_l.e13238 = "Kommentarsendefehler. Bitte warten Sie und versuchen Sie es erneut/ 37"
_l.e13239 = "Kommentarsendefehler/ 35"
_l.e13240 = "Das Kommentar, auf das Sie antworten müchten, wurde vom Benutzer gelöscht"
_l.e13241 = "Dieser Kommentar ist zu lang, bitte teilen Sie es auf"
_l.e13242 = "Sie wurden von dieser Person blockiert, Sie können nicht mehr unter deren Beiträgen kommentieren"
_l.e13243 = "Sie haben Ihr Limit an gelikten Kommentaren pro 24 Stunden erreicht"
_l.e13244 = "Sie haben Ihr Limit an bearbeiteten Kommentaren pro 24 Stunden erreicht"
_l.e13245 = "Sie haben Ihr Limit an gesendeten Kommentaren pro 24 Stunden erreicht"
_l.e13246 = "Sie versuchen, den Beitrag von jemand anderem zu bearbeiten"
_l.e13247 = "Sie haben Ihr Limit an 5 bearbeiteten Beiträgen pro 24 Stunden erreicht"
_l.e13248 = "Sie können nur einmal pro Blockchain block etwas bearbeiten. Bitte warten Sie etwas und versuchen Sie es erneut."
_l.e13249 = "Sie können Sich nicht selbst blockieren"
_l.e13250 = "Sie haben diesen Nutzer bereits blockiert"
_l.e13251 = "Sie haben diesen Nutzer nicht blockiert"
_l.e13252 = "Überweisung ist beschädigt"
_l.e13253 = "Sie können Sich nicht auf sich selbst beziehen"
_l.e13254 = "Dieser Benutzername ist zu lang"
_l.e13255 = "Dieser Benutzername wird bereits verwendet"
_l.e13256 = "Dieser Beitrag ist zu lange, bitte teile es auf"
_l.e13257 = "Ihre "+appname+" Ansehens-Punkte erlauben es noch nicht, eine Beschwerde einzureichen."
_l.e13258 = "Sie haben Ihr Limit an Beschwerden pro 24 Stunden erreicht"

_l.e13259 = "Sie können Sich nicht über Ihren eigenen Beitrag beschweren"
_l.e13260 = "Sie haben bereits eine Beschwerde gegen diesen Benutzer eingereicht."
_l.e13261 = "Schlüssel speichern"
_l.e13262 = "Später"
_l.e13263 = "Abonnieren und Benachrichtigungen für diesen Nutzer aktivieren"
_l.e13264 = "Abonnieren ohne Benachrichtigungen"
_l.e13265 = "Ihr Name ist nicht mehr verfügbar, bitte benutzen Sie einen anderen."
_l.e13266 = "Weißes Design"
_l.e13267 = "Dunkles Design"
_l.e13268 = "Coinstake Gewinn"
_l.e13269 = "Überweisung erhalten"
_l.e13270 = "Likes erhalten"
_l.e13271 = "Kommentar erhalten"
_l.downvote = "Negative Bewertung"
_l.e13272 = "Antwort erhalten"
_l.e13273 = "Neuer Follower"
_l.e13274 = "Gerettete Benutzer"
_l.e13275 = "Kommentar Punkte"
_l.e13276 = "Zeige eingebettete Videos"
_l.e13277 = "Videos automatisch abspielen"
_l.e13278 = ""+appname+" automatisch starten"
_l.e13279 = "Chat"
_l.e13280 = "Tags"
_l.e13281 = "Neuste Kommentare"
_l.e13282 = "Telegram Bot token"
_l.e13283 = "Aus Telegram Kanal posten"
_l.e13284 = "Bot zum Chat hinzufügen und auswählen"
_l.e13285 = "Fragen, bevor Sie aus Telegram posten"
_l.e13286 = "Fragen, bevor Sie zu Telegram senden"
_l.e13287 = "Zum Telegram Kanal senden"
_l.video = "Video"
_l.audio = "Audio"
_l.e13288 = "Hauptseite Vidgets"
_l.e13289 = "Integration mit Telegram"

_l.system = "System"
_l.e13290 = "Möchten Sie folgen?"
_l.e13291 = "Möchten Sie wirklich eine Nachricht an Telegram senden?"
_l.send = "Senden"
_l.e13292 = "Sie haben auf diesem Host bereits einen Netzwerkknoten"
_l.e13293 = "Interner Fehler"
_l.e13294 = "PGSQL Database Aktiv"
_l.e13295 = "DB Host"
_l.e13296 = "DB Port"
_l.e13297 = "DB Max"
_l.e13298 = "DB Wartungszeit Timeout, ms"
_l.e13298 = "DB Name"
_l.e13300 = "DB Benutzer"
_l.e13031 = "DB Passwort"
_l.e13302 = "Proxy server Aktiv"
_l.e13303 = "Proxy https server port"
_l.e13304 = "Proxy wss server port"
_l.e13305 = "Server SSL Key, pem"
_l.e13306 = "Server SSL Cert, pem"
_l.e13307 = "Server SSL Passphrase"
_l.e13308 = "Firebase admin SDK"
_l.e13309 = "Ihre Crane Adresse"
_l.e13310 = "Captcha äktiv"
_l.e13311 = "Ip limiter An"
_l.e13312 = "Server"

_l.e13313 = "Data Base, PG sql"
_l.e13314 = "Firebase"
_l.e13315 = "Sonstiges"
_l.e13316 = "Aktivieren"
_l.e13317 = "Binary path"
_l.e13318 = "Config path"
_l.e13319 = "Data path"
_l.e13320 = "Staking Address"
_l.e13321 = "Importiere die Account Adresse zum Netzwerkknoten zum Stapeln"
_l.e13322 = "Staat"
_l.e13323 = "Stapel Adressen"
_l.e13324 = "Letzter Block"
_l.control = "Kontrolle"
_l.setup = "Setup"
_l.e13325 = "Wollen Sie wirklich Nachrichten aus Telegram posten?"
_l.e13326 = "Posten"
_l.e13327 = "Wollen Sie wirklich nochmals einen Proxy nutzen?"
_l.e13328 = "hat deinen Kommentar geliket!"
_l.e13329 = "Neuer Kommentar Like"
_l.e13330 = "hat deinen Beitrag geteilt:"
_l.e13331 = "hat deinen Beitrag geteilt:"
_l.e13332 = "hat einen brandneuen Beitrag:"
_l.e13333 = "Einkommende überweisung"
_l.e13334 = "Herzlichen Glückwunsch, Sie haben gewonnen"
_l.e13335 = "Pocketmünzen für Ihren letzten"
_l.e13336 = "mit Nachricht:"
_l.e13337 = "hat Ihren Beitrag kommentiert:"
_l.e13338 = "hat auf Ihren Kommentar geantwortet:"
_l.reply = "Antworten"
_l.e13339 = "Sie haben jemanden aus dem zensierten Web gerettet. Einige Münzen sind auf ihrem Weg!"
_l.e13340 = "Herzlichen Glückwunsch!"
_l.e13341 = "folgt dir"
// <%=e("e13337")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13337")
_l.e13342 = "Neuer Follower"
_l.e13343 = "hat deinen Beitrag geliket"
_l.e13344 = "Neuer Like"
_l.e13345 = "hat Ihnen eine private Nachricht gesendet"
_l.e13346 = "Sie haben neue Nachrichten"
_l.e13347 = "Es sind Updates für "+appname+" verfügbar. Updates jetzt herunterladen?"
_l.e13348 = "Nein, später"
_l.e13349 = "Es sind Updates für "+appname+" verfügbar. Website aufrufen, um die neue Version zu downloaden?"
_l.e13350 = "Treten Sie "+appname+" bei und verdienen Sie Pocketmünzen"
_l.e133512 = "Bitte schreiben Sie einige Worte über Sich selbst, damit die Leute entscheiden können, ob sie Ihnen folgen möchten."

_l.downloaded = "Heruntergeladen";
_l.downloadedEmpty = "Heruntergeladene Beiträge werden hier angezeigt";
_l.downloadVideo = "Video herunterladen";
_l.selectQuality = "Qualität auswählen:";
_l.downloadedVideos = "Heruntergeladene Videos";
_l.deleteAllDownloadedVideos = "Alle heruntergeladenen Videos löschen";
_l.deleteVideoDialog = "Sind Sie sicher, dass Sie dieses Video löschen möchten?";
_l.deleteAllVideoDialog = "Sind Sie sicher, dass Sie alle Videos löschen wollen?";
_l.videosDeleted = "Videos gelöscht!";
_l.noDownloadedVideos = "Keine heruntergeladenen Videos";

_l.buy = 'Kaufen';


_l.lowstar1 = "Das Bastion-Team führt ein vorübergehendes Moratorium für 1- und 2-Sterne-Bewertungen ein, mit Ausnahme von verbotenen Inhalten. Verbotene Inhalte sind:"
_l.lowstar_reason_1 = "Erotik/Porno"
_l.lowstar_reason_2 = "Ausbeutung von Kindern"
_l.lowstar_reason_3 = "Direkte Androhung von Gewalt"
_l.lowstar_reason_4 = "Illegale Drogen"
_l.lowstar2 = "Bitte verwenden Sie keine 1- und 2-Sterne-Bewertungen aus anderen Gründen. Nachdem die neue Moderation Mitte Mai veröffentlicht wurde, können Sie niedrige Bewertungen aus anderen Gründen verwenden."
_l.lowstaragree = "Ich bestätige, dass dieser Beitrag eine von vier Arten von verbotenen Inhalten enthält"

_l.androidPopupTitle = "Erhalte unzensierte Informationen in der mobilen Bastion-App"
_l.androidPopupAgree = "Zur App wechseln"
_l.androidPopupDisagree = "Nicht jetzt"

_l.desktopPopupTitle = "Unzensierte Informationen in der Bastyon-Desktop-App abrufen"
_l.desktopPopupAgree = "App herunterladen"
_l.desktopPopupDisagree = "Nicht jetzt"

_l.profanity_tag = 'profanität'

_l.saved = "Gespeicherte"
_l.savePost = "Beitrag speichern"
_l.postsaved = "Beitrag gespeichert"
_l.deleteSavedPost = "Gespeicherten Beitrag löschen"
_l.doYouDownloadVideo = "Möchten Sie das Video auf Ihr Gerät herunterladen?"
_l.gotosaved2 = "Gehe zu gespeichert"
_l.yes = "Ja"
_l.no = "Nein"