var appname = ((window.projects_meta || {})[window.pocketnetproject || "Bastyon"] || {}).fullname || 'Bastyon'


if(typeof loclib == "undefined" || !loclib)
loclib = {};

loclib.it = {};

var _l = loclib.it;

//time

_l.fewseconds = "Pochi secondi fa";
_l.oneminute = "Un minuto fa";

_l.minutes = function(v){
return v + " minutes ago"
}

_l.tenminutes = "Dieci minuti fa";
_l.halfanhour = "Mezz'ora fa";
_l.anhour = "Un'ora fa";
_l.today

//authorization

_l.id0 = "Login";
_l.id1 = "Se sei già registrato, accedi";
_l.loadqrcode = "Carica codice QR";
_l.stay = "Resta connesso";
_l.signin = "Accedi";
_l.orcreate = "O crea un nuovo account";
_l.createnew = "Crea un nuovo account";
_l.staysafe = "Non è sicuro. Vuoi procedere ugualmente?";
_l.or = "o";

// Register a New Account
_l.id71 = "Crea un nuovo account";
_l.id72 = "Sei già registrato? Accedi";

_l.rtip1 = "Segnati la tua chiave di accesso!";
_l.rtip2
var h = "Qui sotto trovi la tua chiave di accesso privata (Private Key). Scrivila in un luogo sicuro e assicurati di salvare il tuo codice QR";

_l.rtip2 = function(mobile){

    if(mobile){ 

        h += "e ricordati di non perderla. Non salviamo i tuoi dati e non c'è alcun modo per recuperare la tua Private Key se la perdi!";
    }

    return h


}

_l.generatepkey = "Genera Private Key";
_l.rtip3 = "Scrivi questa chiave di accesso o salvala come codice QR. Non memorizziamo i tuoi dati personali. La Private Key non può essere recuperata se la perdi!";
_l.saveqrcode = "Salva codice Qr";
_l.copyprivkey = "Copia la chiave privata";
_l.rcontinue = "Continua";
_l.idle = "Inattivo per qualche tempo";
_l.congratulations = "Congratulazioni! Sei in <span class='pnlabel'>"+appname+"</span>";
_l.creatingpreloader = "Creazione di un account in corso";
_l.removepaste = "Abbiamo rimosso l'opzione incolla per questo input.";
_l.filedamaged = "Il file non contiene una chiave privata valida";
_l.keysnotmatch = "La chiave privata di accesso non corrisponde";
_l.confirmkey = "Digita la tua chiave di accesso privata o carica il codice QR dal passo precedente";
_l.successfullycopied = "La chiave è stata copiata con successo";
_l.urlsuccesscopied = "Il link è stato copiato con successo";
_l.successcopied = "Il testo è stato copiato con successo";

_l.confirmkeyLabel = "Per favore, conferma la tua chiave privata. Digita la chiave nel modulo o <b>carica il codice QR</b>";
_l.repeatetocreate = "Ripeti per creare nuovamente la chiave privata";
_l.confirmcreate = "Crea un account";


//user activation

_l.useractivation = "Attivazione utente";
_l.wesentmoney = "Ti abbiamo inviato alcuni PKOIN per la registrazione";
_l.wesentmoneym = "Ti abbiamo già inviato alcuni PKOIN per la registrazione";


_l.wesentmoneydelay = "Il processo sta richiedendo più tempo del solito, si prega di attendere";

_l.funetworkproblems = "Ci sono alcuni problemi con la connessione. Si prega di provare più tardi";

_l.pleasewait = "Si prega di attendere";
_l.next = "Prossimo";
_l.welcometopocketnet = "Benvenuto su "+appname+"";
_l.continue = "continua";

//user page

_l.rstate = "Reputazione";
_l.rprofile = "Profilo";
_l.rsettings = "Impostazioni";
_l.rwallet = "Portafoglio";
_l.raccounts = "Conti";
_l.rsystem = "Sistema";
_l.rconnection = "Connessione";
_l.pnetAddress = appname + " Indirizzo";
_l.profile = "Profilo";
_l.signout = "Esci";

//send

_l.postlabel = "Donazione per il post";
_l.donationlabel = "Donazione";
_l.donationwel = "Se vuoi ringraziare l'autore puoi donare dei PKOIN tramite " +appname+".";
_l.donationwela = "Transazione su " + appname + "";
_l.donationwelan = "Oppure puoi usare un altro sistema di pagamento di criptovalute";
_l.successfullycopiedaddress = "L'indirizzo è stato copiato con successo";

//wallet

_l.wrecieve = "Ricevi PKOIN condividendo l'indirizzo";
_l.wcopyshare = "Copia e condividi l'indirizzo:";
_l.wqrcode = "Codice Qr";
_l.wcopeaddress = "Copiare l'indirizzo";
_l.wcreatelink = "Oppure crea un link per il tuo pagamento";
_l.required = "Richiesto";
_l.wgetlink = "Ottieni il link";
_l.waddresses = "Indirizzi";
_l.waddress = "Indirizzo";
_l.wbalance = "Saldo";
_l.wpercente = "Percento";
_l.waddaddress = "Esplora un nuovo indirizzo Wallet";
_l.wrecieve = "Ricevi";
_l.wrecieveon = "Ricevi su";
_l.wcopyshareorcreate = "Copia e condividi l'indirizzo o crea un link di pagamento";
_l.wdgetlink = "Ottenere il link";
_l.wdqrcode = "Codice Qr";
_l.wdcopyaddress = "Copiare l'indirizzo";
_l.wdpleasefill = "Compila questi campi";
_l.wduseqr = "Usa questo codice QR per ricevere crypto";
_l.wdaddress = "Indirizzo";
_l.wdamount = "Importo";
_l.wdlabel = "Etichetta";
_l.wdmessage = "Messaggio";
_l.wsend = "Invia";
_l.calcfeesandsend = "Calcola le commissioni e invia";
_l.wstrfees = "Spese di transazione";
_l.wsfees = "Commissioni";

_l.wssendto = "INVIARE CRYPTO A";
_l.wssendb = "INVIA";

_l.tacaddress = "Indirizzo del conto";
_l.twallet = "Portafoglio";
_l.twalletaddresses = "Indirizzi del portafoglio";
_l.tTotal = "Totale";
_l.wsselect = "Seleziona la fonte dal menu";
_l.wsenter = "Inserire l'indirizzo o selezionare dal menu";
_l.wsreciever = "Indirizzo del destinatario";
_l.wsamount = "Importo";
_l.wsamountof = "Importo della transazione";
_l.wsincludefees = "Includere le tasse nell'importo";
_l.wsrecieverpay = "Da pagare da parte del destinatario";
_l.wssenderpay = "Da pagare da parte del mittente";
_l.wdselectfrom = "Selezionare dal menu";

_l.wdenteramount = "Inserisci l'importo";
_l.wdmessageplaceholder = "Per cosa è questa transazione?";
_l.wrenteraddress = "Inserisci l'indirizzo";
_l.wrenteraddressselect = "Inserire l'indirizzo o selezionare dal menu";
_l.wreturntoeallet = "TORNA AL PORTAFOGLIO";
_l.linkCreated = "LINK CREATO";
_l.waddresswascop = "L'indirizzo è stato copiato con successo";
_l.wqrcodecreated = "CODICE QR CREATO";
_l.wlinkcreating = "LINK CREATO";
_l.wqrcodecreating = "CREAZIONE CODICE QR";
_l.wdoptions = "OPZIONI";
_l.wssuccessfully = "Transazione inviata con successo";
_l.wscalculatefees = "CALCOLO COMMISSIONI";
_l.wsaddressnotv = "L'indirizzo non è valido";

//user profile
_l.uaddaddressdona = "Aggiungi indirizzo Per le donazioni";
_l.uaddaddressdonaplace = "Inserisci l'indirizzo";
_l.uchangeicon = "Carica l'immagine del profilo";
_l.utip1 = "Devi creare nome sulla blockchain prima di usare " + appname + "";
_l.utip2 = "Ti rimane solo un passo";
_l.upicset = "Imposta l'icona del profilo";
_l.upic = "Icona del profilo";
_l.uuserinfo = "Informazioni utente";
_l.usave = "Salva";
_l.ucancel = "Annulla";
_l.uwaitb = "Aspetta la conferma per salvare le informazioni";
_l.uchanges = "Non ci sono modifiche";
_l.uchangesvalid = "È necessario creare il nome utente";
_l.uname = "Nome";
_l.unickname = "Nickname";
_l.ulanguage = "Lingua";
_l.uabout = "Su di me";
_l.uwebsite = "Sito web";
_l.uaddresesd = "Indirizzi per le donazioni";
_l.usavechanges = "Vuoi salvare le tue modifiche?";

//ustate

_l.sreps = "Reputazione e limitazioni";
_l.sdisconnected = "Disconnesso dal nodo";
_l.suseractivation = "Attivazione utente";
_l.sprofile = "Profilo";
_l.spc = "Numero di messaggi";
_l.spv = "Conteggio dei messaggi video";
_l.ssc = "Conteggio delle stelle";
_l.ccc = "Conteggio dei commenti";
_l.crc = "Conteggio del tasso di commento";
_l.artc = "Conteggio articoli";

_l.stp = "Periodo di prova";
_l.srep = "Reputazione";

//accounts
_l.aaddedacc = "Cambia account";
_l.acure = "Corrente";
_l.aaddacc = "Aggiungi account";
_l.ascheduler = "Scheduler";
_l.aused = "Questo indirizzo è già utilizzato in un altro pool di indirizzi";


//author
_l.sub = "Segui";
_l.unsub = "Smetti di seguire";
_l.joined = "Iscritto";
_l.shares = "CONDIVISIONE";
_l.uposts = "POSTI";
_l.myuposts = "I MIEI POSTI";
_l.followers = "FOLLOWERS";
_l.following = "Seguendo";
_l.settings = "GESTISCI";
_l.anofollowers = "Questo utente non ha followers";
_l.aynofollowers = "Non hai followers";
_l.anofollowing = "Questo utente non sta seguendo nessuno";
_l.aynofollowing = "Non stai seguendo nessuno";

_l.blockedusers = "Utenti bloccati";
_l.anoblocked = "Questo utente non ha bloccato nessuno";
_l.aynoblocked = "Non hai bloccato nessuno";

//lenta
_l.lloadmore = "Carica altri fantastici post!";
_l.lloadprev = "Carica nuovi fantastici post";


_l.lend = "Fine dei messaggi";
_l.zerop = "Attualmente non ci sono messaggi di questo autore";


_l.zeroy = "Non hai ancora pubblicazioni, condividi qualcosa!";



_l.llogin = "Devi effettuare il login prima di poter procedere";
_l.lcomlaindialog = "Sei sicuro di voler segnalare questo post?";
_l.lunsubscribe = "Vuoi davvero disiscrivere questo account?";
_l.lprivatepublic = "Vuoi fare un abbonamento privato o pubblico?";
_l.lprivate = "Privato";
_l.lpublic = "Pubblico";

//share
_l.newShare = "Nuovo post";
_l.firstShare = "Condividi il tuo primo post su " + appname + "";
_l.scaption = "Didascalia";
_l.whatsnew = "Cosa c'è di nuovo?";
_l.saddlink = "Aggiungi un link a un sito esterno o un video";
_l.saddimages = "Aggiungi immagini al post";
_l.sarticle = "Scrivere un articolo";
_l.stelegram = "Invia su Telegram";
_l.stimes = "Cancella messaggio";


_l.snothing = "Niente";
_l.sposttime = "Invia per tempo";
_l.spostnow = "Invia ora";
_l.stimenotselected = "Tempo non selezionato";
_l.spost = "Posta";
_l.sdate = "Data";
_l.stime = "Ora";
_l.snotags = "Aggiungi tag";
_l.expandvideo = "Clicca per espandere";
_l.emptymessage = "Il messaggio è vuoto";
_l.emptytags = "Si prega di aggiungere tag";
_l.emptyutxo = "nessun denaro";
_l.networkerror = "errore di rete";
_l.maximages = "Ti è permesso un massimo di 10 immagini";
_l.sharenow = "Vuoi condividere questo contenuto adesso?";
_l.pastdate = "Data passata";
_l.timenotselected = "Ora non selezionata";
_l.addtags = "Aggiungi tag";
_l.tnews = "notizie";
_l.timages = "immagini";
_l.tlinks = "link";
_l.tvideos = "video";
_l.tmarket = "mercato";
_l.tsport = "sport";

//menu
_l.signinmenu = "Accedi";
_l.signupmenu = "Iscriviti";
_l.aboutmenu = "scopri di più";

//footer
_l.aboutus = "Su di noi";



// Dialog Box Options
_l.daccept = "Accetta";
_l.dcancel = "Cancella";
_l.dyes = "Sì";
_l.dno = "No";
_l.dsa = "Non mostrare più";


// Messages

_l.transactionCome = "Transazione in arrivo";

_l.coinbaseSuccess = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest activity!"
}
_l.coinbaseSuccesspost = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest posts!"
}
_l.coinbaseSuccesscomment = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest comments!"
}
_l.userSent = function(v){
return "sent <b>" + v + " PKOIN</b> to you"
}

_l.coinbaseSuccesspostref = function(v){
return "Congrats, your referral just won " + v + " PKOIN for you!"
}
_l.coinbaseSuccesscommentref = function(v){
return "Congrats, your referral just won " + v + " PKOIN for you!"
}

_l.refferalUserMessage = "Congratulazioni! Hai salvato qualcuno dalla censura del web. Un po' di PKOIN sono in arrivo!";

_l.subscribeUserMessage = "ha iniziato a seguirti";
_l.unsubscribeUserMessage = "non ti segue più";
_l.gotoprofileMessage = "vai al profilo";
_l.upvoteShareMessage = "ha votato il tuo post";

_l.upvoteCommentMessage = "ha messo like al tuo commento";

// Errors

_l.error = "Errore";
_l.checkScoreError = "Il tuo account non è stato trovato nella blockchain. Devi riempire le informazioni del profilo richieste prima di usare " +appname+". Vuoi farlo ora?";
_l.checkScoreErrorLight = "L'account non è attivato";
_l.timestamperror = "Il tempo nell'applicazione e nel nodo non corrispondono";

// Error Page 404
_l.e404 = "ERRORE 404";
_l.e404e = "Pagina non trovata. Torna alla pagina principale";
_l.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " posts in a 24 hour period";
}
_l.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " grading in a 24 hour period";
}

_l.doubleLimitLight = "Hai già valutato questo";

_l.SelfSubscribeError = "Non puoi iscriverti";
_l.DoubleSubscribeError = "Segui già questo utente";
_l.InvalideSubscribeError = "Non stai ricevendo le notifiche di questo utente";
_l.ChangeInfoLimitError = "Puoi modificare il tuo profilo solo una volta all'ora. Per favore aspetta e riprova.";
_l.SelfScoreError = "Non puoi valutare il tuo stesso post";

_l.unexperror10 = "Errore sconosciuto (10)";
_l.unexperror11 = "Errore sconosciuto (11)";
_l.unexperror12 = "Errore sconosciuto (12)";

_l.networkerror = "Ci sono alcuni problemi con il nodo";

_l.canSpendError = "Devi aspettare che la tua precedente transazione si cancelli nella blockchain. Per favore aspetta";
_l.noMoneyError = "Non puoi fare azioni con saldo del conto pari a zero";



_l.waitConf = "Devi aspettare che la tua precedente transazione si cancelli nella blockchain";
_l.postWaitConf = "Il post è in attesa di una conferma nella blockchain";
_l.actionWaitConf = "L'azione è in attesa di una conferma sulla blockchain";


// notifications

_l.ntnow = "Adesso";
_l.ntlasthour = "Nell'ultima ora";
_l.nttoday = "Oggi";
_l.ntmounth = "Questo mese";
_l.ntearlier = "Più di un mese fa";


_l.nodeWalletAdd = "L'aggiunta di un indirizzo può richiedere del tempo. Continuare?";
_l.nodeEnableNoteHeader = "Nota";
_l.nodeEnableNote = "L'accensione di un nodo può richiedere fino a 5GB di RAM. Assicurati di averne abbastanza. Buon mining!";


/// 1301

_l.address = "Indirizzo";
_l.privatekey = "Chiave privata";
_l.qrcode = "Codice QR";
_l.addaccount = "Aggiungi account";
_l.entermnimo = "Inserisci la frase mnemonica o la chiave privata";
_l.add = "Aggiungi";
_l.e13011 = "Ora continuerai la registrazione dopo aver installato " +appname+" Desktop.";
_l.e13012 = "Se " +appname+" non ha iniziato il download, clicca qui per installarlo.";
_l.e13013 = "Scrivi una didascalia per l'immagine";
_l.e13014 = "Questo file non è in un formato supportato:";
_l.e13015 = "Questo file è troppo grande:";
_l.e13016 = "Incolla un link di YouTube o Vimeo e premi Invio";
_l.e13017 = "Caricamento sulla Blockchain";
_l.e13018 = "Vuoi davvero rimuovere questo articolo?";
_l.e13019 = "Nuovo";
_l.e13020 = "Scrivi un nuovo articolo";
_l.youarefollowing = "Stai seguendo";
_l.follow = "Segui";
_l.blocked = "Bloccato";
_l.e13021 = "Mostra di più";
_l.block = "Blocca";
_l.blockuser = "Blocca utente";
_l.unblockuser = "Sblocca Utente";
_l.e13022 = "Vuoi davvero togliere il follow all'utente?";
_l.unfollow = "Deseleziona";
_l.unblock = "Sblocca";
_l.share = "Condividi";
_l.info = "Info";
_l.copyLink = "Copia il link diretto";
_l.includeRefLink = "Includi link di riferimento";
_l.signToComment = "Per visualizzare o inviare commenti, è necessario effettuare il login o registrarsi"
_l.e13023 = "Vuoi davvero sbloccare l'utente?";
_l.e13024 = "La tua chiave di accesso privata";
_l.e13025 = "Crea un nuovo account";
_l.e13026 = "Unisciti a "+appname+"";

_l.e13027 = "Resta loggato";
_l.e13028 = "Hai inserito una chiave privata non valida";
_l.e13029 = "Il messaggio è vuoto";
_l.e13030 = "I commenti hanno un limite di 1000 caratteri per commento";
_l.e13031 = "Condividi commento";
_l.e13032 = "Vuoi davvero cancellare il tuo commento?";
_l.e13033 = "Il commento è stato rimosso";
_l.e13034 = "Sì";
_l.e13035 = "No, cancella";
_l.hide = "Nascondi";
_l.e13036 = "Mostra i commenti precedenti";
_l.e13037 = "Risponde";
_l.remove = "Rimuovi";
_l.e13038 = "Commenta ora";
_l.e13039 = "Commenta ora";
_l.e13040 = "Non hai i privilegi per commentare";
_l.complain = "Segnala";
_l.next = "Prossimo";
_l.post = "Invia";
_l.e13041 = appname + " - Connessione";
_l.e13042 = appname + " Proxy";

_l.e13043 = appname+ " - Nodi";
_l.e13044 = "Aggiungi nodo";
_l.e13045 = "Nodi non trovati";
_l.e13046 = "Indirizzo";
_l.e13047 = "WS";
_l.e13048 = "Nome";
_l.e13049 = "Stato";
_l.e13050 = "Proxy non trovato";
_l.e13051 = "Non usare il proxy";
_l.e13052 = "Impossibile connettersi al proxy";
_l.e13053 = "Impossibile connettersi al nodo";
_l.e13054 = "Aggiungi Proxy";
_l.e13055 = "Modifica Proxy";
_l.save = "Salva";
_l.e13056 = "Nodo Host";
_l.close = "Chiudi";
_l.e13057 = "Compila tutti i campi";
_l.e13058 = "Hai già questo proxy nella lista.";
_l.delete = "Cancella";
_l.e13059 = "Vuoi davvero cancellare questo proxy dalla lista?";
_l.e13060 = "Elenco proxy";
_l.e13061 = "Vuoi veramente smettere di usare il Proxy. Non è sicuro (connessione HTTP)";

_l.e13062 = "Modifica nodo";
_l.onproxy = "Su Proxy";
_l.locally = "Localmente";
_l.nodehost = "Nodo Host";
_l.e13063 = "Porta RPC";
_l.e13064 = "Porta WS";
_l.e13065 = "Nome del nodo";
_l.e13066 = "Inserire il nome del nodo";
_l.e13067 = "Accesso RPC";
_l.e13068 = "Login per l'autorizzazione RPC";
_l.e13069 = "Password RPC";
_l.e13070 = "Password per l'autorizzazione PRC";
_l.e13071 = "Si prega di compilare tutti i campi";
_l.e13072 = "Vuoi davvero cancellare questo nodo dalla lista?";
_l.e13073 = "Vuoi veramente smettere di usare il Proxy. Non è sicuro (connessione HTTP)";
_l.notselected = "Non selezionato";
_l.donation = "donazione";
_l.e13074 = "In attesa di fondi. L'indirizzo sarà valido per";
_l.sminutes = "minuti";
_l.e13075 = "Il tempo per questa transazione è scaduto.";
_l.reactivate = "Riattivare";
_l.e13076 = "Scansiona questo codice per inviare";
_l.back = "Indietro";
_l.e13077 = "Aggiungi il tuo profilo alla lista dei donatori";
_l.e13078 = "Perché chiediamo donazioni?";
_l.e13079 = "Abbiamo trascorso più di 14 mesi nel tempo libero dal lavoro a tempo pieno per portare " +appname+" alle persone. Oltre al tempo e allo sforzo, abbiamo messo i nostri soldi per aiutare a lanciare la piattaforma. Ora abbiamo bisogno che la comunità si faccia avanti e ci aiuti a crescere.";
_l.e13080 = "Come verranno utilizzati i fondi?";
_l.e13081 = "I fondi saranno utilizzati per acquistare pubblicità e assumere alcuni esperti specifici per rendere " +appname+" ancora più sicuro. L'attuale team di sviluppo non riceverà nessuna di queste donazioni. Ove possibile, pubblicheremo qui come abbiamo usato i fondi. ";
_l.e13082 = "Cosa otterrai per la tua donazione oltre a sapere che hai sostenuto la libertà:";
_l.e13083 = "Come segno della nostra gratitudine per la donazione, riceverai un regalo in una certa quantità di Pocketcoin";
_l.e13084 = "Inoltre, quando costruiremo la chat di gruppo, sarai membro di un gruppo speciale di donatori che avranno accesso diretto al team di " + appname + ", anche quando la piattaforma crescerà";
_l.e13085 = "Il link al tuo profilo" + appname + " sarà elencato di seguito portando più persone ai tuoi post (a meno che tu non ci chieda di non farlo)";
_l.e13086 = "Supporta il web decentralizzato ora";
_l.e13087 = "Bitcoin, Litecoin";

_l.e13088 = "Membri "+appname+" che hanno donato per sostenere "+appname+"";
_l.thankyou = "Grazie!";
_l.e13089 = "Se vuoi che elenchiamo il tuo profilo " +appname+" nella lista dei donatori, per favore inviaci un messaggio con i dettagli della tua donazione";
_l.e13090 = "Aggiungimi alla lista dei donatori";
_l.e13091 = "Oppure puoi inviarci un'email a";
_l.e13092 = "con la tua chiave pubblica e l'importo.";
_l.finish = "Finisci";
_l.e13093 = "Per favore scegli il modo di donazione";
_l.e13094 = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare (errore: 0001)";
_l.e13095 = "Grazie per sostenere il nostro lavoro per la libertà. Faremo in modo che ogni centesimo conti.";
_l.e13096 = "Si prega di compilare l'importo della donazione";
_l.e130961 = "Quanto vuoi inviare?";
_l.e130962 = "Saldo disponibile:";

_l.e13097 = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare (errore: 0002)";
_l.e13098 = "Aggiungi un link a un sito esterno o a una risorsa";
_l.e13099 = "Carica immagini";
_l.e13100 = "Clicca qui per selezionare i file da caricare";
_l.e13101 = "o trascina e rilascia";
_l.e13102 = "Aggiungi un link a un sito esterno";
_l.e13103 = "Url non valido";
_l.e13104 = "Massimo 6 immagini consentite";
_l.e13105 = "Gestione del nodo";
_l.e13106 = appname + " - Nodo";
_l.e13107 = "La gestione dei nodi può essere effettuata con l'applicazione";
_l.e13108 = "Non c'è connessione con l'interfaccia proxy Electron";

_l.e13109 = "Inserisci le parole nell'immagine per ricevere PKOIN e continuare la registrazione";
_l.e13110 = "Inserire le parole";
_l.poll = "Crea sondaggio";
_l.next = "Avanti";
_l.refresh = "Aggiorna";
_l.e13111 = "Aggiungi la tua email per ricevere gli ultimi aggiornamenti di " +appname+"";
_l.e13112 = "Inserisci l'email";
_l.e13113 = "Aggiungi email";
_l.skip = "Salta";
_l.e13114 = "C'è qualche problema con la tua registrazione a causa di attività sospetta.";
_l.e13115 = "Per favore, invia un'email";
_l.e13116 = "per ricevere crypto e aprire il tuo conto.";
_l.e13117 = "Controlla il saldo";
_l.joinnow = "Iscriviti ora";
_l.loading = "Caricando";
_l.e13118 = "Le parole non corrispondono";
_l.e13119 = "Aggiungi l'email e continua";
_l.e13120 = "Applicazioni";
_l.e13121 = "Non ci sono immagini qui";
_l.e13122 = "Ultimi commenti";

_l.e13123 = "Mostra altri post";
_l.e13124 = "Altri fantastici post di " + appname + "!";
_l.e13125 = "La sezione Top Post è vuota!";
_l.e13126 = "I post delle persone che segui saranno mostrati qui";
_l.e13127 = "I post delle persone che segui saranno mostrati qui";
_l.e13128 = "I post delle persone che segui saranno mostrati qui";
_l.registration = "Registrazione";
_l.editpost = "Modifica post";
_l.removepost = "Rimuovi post";
_l.opennewwindow = "Apri post in una nuova finestra";


_l.unsubscribe = "Cancella l'iscrizione";
_l.startchat = "Inizia chat";
_l.reportpost = "Segnala post";
_l.donate = "Dona";
_l.blockuser = "Blocca utente";
_l.more = "Altro";
_l.showmore = "Mostra di più";
_l.e13129 = "Immagini allegate";
_l.e13130 = "Modificato";
_l.e13131 = "Hai bloccato questo utente";
_l.e13132 = "valutato";
_l.e13133 = "Condividi";
_l.e13134 = "Non ci sono risultati per questa stringa di ricerca";
_l.e13135 = "L'utente non ha la chiave privata";
_l.e13136 = "Tutti i post";
_l.e13137 = "Le mie sottoscrizioni"// Questo è l'equivalente di un 'News feed'. Non cambiare la parola 'Pocket' però, è una caratteristica di "+appname+".";
_l.e13138 = "Top post";
_l.discussed = "Più discusso"
_l["Most Discussed Over"] = "Per il periodo"
_l["Top Posts Over"] = "Top post su";
_l.topnext = "Prossimo";
_l.topprevious = "Precedente";
_l.topactual = "Torna agli ultimi";
_l.e13139 = "Cerca su " +appname+"";
_l.e13140 = "Cerca su";
_l.notifications = "Notifiche";
_l.showall = "Mostra tutti";
_l.e13141 = "Non hai notifiche";

_l.recommendations = "Suggerimenti";
_l.e13142 = "Ho salvato la mia chiave, non ricordarmelo più";
_l.e13143 = "Importante!";
_l.e13144 = "Copia";
_l.e13145 = "Salva la chiave sul dispositivo";
_l.e13146 = "Fine dei post";
_l.e13147 = "Condividi";
_l.e13148 = "Vuoi davvero segnalare questo post?";
_l.e13149 = "valutazioni degli utenti";
_l.e13150 = "Valutazione del post";
_l.e13151 = "Nessuno ha valutato questo post";
_l.e13152 = "Punteggi degli utenti";
_l.e13153 = "Salta e vai al sito web";
_l.e13154 = "Le tue informazioni di accesso";
_l.e13155 = "Per utilizzare "+appname+" è necessario generare la tua chiave crittografica privata che sostituisce il classico login con password dei social network tradizionali.";
_l.users = "Utenti";
_l.userstx = "Utenti";
_l.user = "Utente";
_l.postscount = "Numero di Post";
_l.about = "Informazioni su";
_l.e13156 = "Prossimi risultati";
_l.posts = "Post";
_l.disablePreview = "Disattivare l'anteprima dei link";
_l.e13157 = "Cerca per";
_l.e13158 = "non ha risultati";
_l.e13159 = "La frase di ricerca è vuota";
_l.repost = "Repost";
_l.e13160 = "Ciao Bastyards!";

_l.e13161 = "Aggiungi tag per il tuo post";
_l.e13162 = "Puoi inserire massimo 15 tag";
_l.e13163 = "Non ci sono modifiche nel post";
_l.e13164 = "Aggiungi qualche parola per spiegare il tuo link. Di cosa si tratta? Perché è importante? Qual è la tua opinione?";
_l.e13165 = "Il tuo link al video non è valido. Per favore, carica un URL video valido.";
_l.e13166 = "Hai salvato";
_l.e13167 = "persone dalla censura del web";
_l.e13168 = "Guadagna PKOIN per ogni iscrizione attraverso il tuo link";
_l.e13169 = "Collegamento diretto";
_l.copy = "Copia";
_l.e13170 = "Includere " + appname + " sign up call-to-action";
_l.more = "Altro";
_l.e13171 = 'Finalmente! Ho detto "basta" ai soliti social media e alle informazioni controllate! Entra anche tu in Bastyon.com e dì addio alla censura. Un social network libero e basato sulla blockchain. Clicca qui per iniziare!';
_l.e13172 = "Ti voglio invitare ad un nuovo social network decentralizzato chiamato " + appname + " ! Troverai una tonnellata di cose interessanti e se ti iscrivi, entrambi otterremo un bonus in criptovaluta PKOIN!";
_l.e13173 = "Invia per e-mail";
_l.e13174 = "Condividi sui social";
_l.e13175 = "Tag popolari";
_l.e13176 = "Tipo di indirizzo";
_l.e13177 = "Carica foto";

_l.requiredfields = "campi obbligatori";
_l.e13178 = "Non collegato al tuo profilo";
_l.e13179 = "Elenco non utilizzato";
_l.e13180 = "La tua fattura è stata creata con successo";
_l.e13181 = "Si è verificato un errore durante il processo";
_l.e13182 = "Blockchain Explorer";
_l.e13183 = "Supporto";
_l.e13184 = "Continua la registrazione";
_l.e13185 = "Connessione persa";
_l.e13186 = "Modifica profilo";
_l.e13187 = "Contenuti";
_l.e13188 = "Salva la tua chiave privata (Private Key) che sostituisce il tradizionale login con password";
_l.e13189 = "Esci e dimentica la mia chiave per sempre! ATTENZIONE: IRREVERSIBILE";
_l.e13190 = "Tema di " + appname + "";
_l.e13191 = "Imposta tema";
_l.e13192 = "Livello";
_l.e13193 = "BONUS";
_l.e13194 = "Reputazione e ricompense";
_l.e13195 = "Limitazioni";
_l.с = "Occupa molto";
_l.e13197 = "Ricevi PKOIN";
_l.e13198 = "Il tempo di attesa è circa";
_l.e13199 = "Unisciti a " + appname + " Ora";

_l.e13200 = "Torna a " + appname + "";
_l.e13201 = "ISCRIVITI ALLA VERSIONE BETA";
_l.e13202 = "Il beta test di " + appname + " inizierà il 24 gennaio";
_l.e13203 = "Grazie per esserti iscritto alla lista e-mail di beta test di " + appname + ". Non è obbligatorio utilizzare "+appname+", tuttavia, useremo questa email per inviare i tuoi sondaggi per migliorare la piattaforma. Grazie per aver contribuito a plasmare il futuro di internet.";
_l.e13204 = appname + " indirizzo per ricevere";
_l.e13205 = "Parametri";
_l.e13206 = "Ricevi l'importo in PKOIN";
_l.e13207 = "Invia importo";
_l.e13208 = "Disponibile";
_l.e13209 = "Elenco crowdfunding";
_l.e13210 = "Nuovo contratto";
_l.e13211 = "Copia il link e condividi";
_l.amount = "Importo";
_l.label = "Etichetta";
_l.message = "Messaggio";
_l.copylink = "Copia collegamento";
_l.sendMessenger = "Invia via messenger";
_l.e13211 = "Si prega di compilare questi campi";
_l.e13212 = "Crea codice QR";
_l.e13213 = "Indirizzo per ricevere";
_l.process = "Elabora";
_l.source = "Fonte";
_l.yourmessage = "Il tuo messaggio";
_l.e13214 = "Importo in PKOIN";
_l.currency = "Valuta";


_l.e13215 = "Selezionare la valuta";
_l.e13216 = "Importo";
_l.e13217 = "Il tempo per questa transazione è scaduto.";
_l.e13218 = "In attesa delle conferme della blockchain";
_l.e13219 = "Invia PKOIN a te";
_l.e13220 = "PKOIN consegnati";
_l.errorreload = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare";
_l.e13221 = "Vuoi davvero cancellare le informazioni di questa transazione? La transazione non può essere fermata";
_l.e13222 = "Scarica Desktop App - questo è il modo più resistente alla censura per utilizzare " +appname+". Anche se i siti web vengono chiusi, l'applicazione desktop verrà comunque eseguita direttamente attraverso i nodi.";
_l.e13223 = "Scarica " + appname + " per Windows";
_l.e132232 = "Scarica " + appname + " per macOs";
_l.e13224 = "Scaricare " + appname+" per Linux";
// #NAME?
_l.e13226 = "Scaricare Nodo";
_l.e13227 = "Scaricare " + appname + " Node per Windows";
_l.e13228 = "Scaricare " + appname + " Nodo per Linux";
_l.e13229 = "Chiave privata non valida";
_l.e13230 = "Errore di connessione non definito";

_l.e13231 = "Connessione persa";
_l.e13232 = "Impossibile connettersi con il nodo";
_l.e13233 = "Questo commento è stato rimosso";
_l.e13234 = "Errore Opreturn/41";
_l.e13235 = "Non puoi valutare il commento due volte";
_l.e13236 = "Questo commento è stato rimosso";
_l.e13237 = "Non puoi valutare te stesso";
_l.e13238 = "Errore di invio del commento. Si prega di attendere e riprovare/ 37";
_l.e13239 = "Errore nell'invio del commento. Stai rispondendo a un commento che è stato cancellato";
_l.e13240 = "Il commento a cui stai rispondendo è stato cancellato dall'utente";
_l.e13241 = "Questo commento è troppo lungo, per favore dividilo";
_l.e13242 = "Sei stato bloccato da questa persona, non potrai commentare i suoi post";
_l.e13243 = "Hai raggiunto il tuo limite di commenti upvote in 24 ore";
_l.e13244 = "Hai raggiunto il tuo limite di modifiche ai commenti in 24 ore";
_l.e13245 = "Hai raggiunto il tuo limite di commenti in 24 ore";
_l.e13246 = "Stai cercando di modificare il post di qualcun altro";
_l.e13247 = "Hai raggiunto il limite di modifiche ai post in 24 ore";
_l.e13248 = "Puoi modificare solo una volta per blocco. Per favore aspetta un minuto, poi riprova";
_l.e13249 = "Non puoi bloccare te stesso";
_l.e13250 = "Hai già bloccato questo utente";
_l.e13251 = "Non hai bloccato questo utente";
_l.e13252 = "La transazione è corrotta";
_l.e13253 = "Non puoi taggare a te stesso";
_l.e13254 = "Questo nome utente è troppo lungo";
_l.e13255 = "Questo nome utente è già in uso";
_l.e13256 = "Questo post è troppo lungo, per favore spezzalo.";
_l.e13257 = "Il tuo punteggio di reputazione di " + appname + " non permette ancora le segnalazioni";
_l.e13258 = "Hai raggiunto il limite di segnalazioni in 24 ore";

_l.e13259 = "Non puoi segnalare il tuo stesso post";
_l.e13260 = "Hai già presentato un reclamo contro questo utente.";
_l.e13261 = "Salva la chiave";
_l.e13262 = "Più tardi";
_l.e13263 = "Iscriviti e attiva le notifiche per questo utente";
_l.e13264 = "Iscriviti senza notifiche";
_l.e13265 = "Il tuo Nickname non è più disponibile, scegline un altro";
_l.e13266 = "Tema chiaro";
_l.e13267 = "Tema scuro";
_l.e13268 = "Coinstake win";
_l.e13269 = "Transazioni ricevute";
_l.e13270 = "Voti alti ricevuti";
_l.e13271 = "Commento ricevuto";
_l.downvote = "Valutazione negativa"
_l.e13272 = "Risposta ricevuta";
_l.e13273 = "Nuovi followers";
_l.e13274 = "Utenti invitati";
_l.e13275 = "Punteggio dei commenti";
_l.e13276 = "Mostra i video incorporati";
_l.e13277 = "Autoplay video";
_l.e13278 = "Avvia " + appname + " automaticamente";
_l.e13279 = "Chat";
_l.e13280 = "Tags";
_l.e13281 = "Ultimi commenti";
_l.e13282 = "Token per bot di Telegram";
_l.e13283 = "Pubblica dal canale Telegram";
_l.e13284 = "Aggiungi il bot nella chat e seleziona";
_l.e13285 = "Chiedi prima di postare da Telegram";
_l.e13286 = "Chiedi prima di inviare a Telegram";
_l.e13287 = "Invia al canale Telegram";
_l.video = "Video";
_l.audio = "Audio";
_l.e13288 = "Pagina principale dei widget";
_l.e13289 = "Integrazione con Telegram";

_l.system = "Sistema";
_l.e13290 = "Vuoi seguire";
_l.e13291 = "Vuoi davvero inviare un messaggio a Telegram?";
_l.send = "Invia";
_l.e13292 = "Hai già un nodo su questo host";
_l.e13293 = "Errore interno";
_l.e13294 = "Abilitazione del database PGSQL";
_l.e13295 = "Host DB";
_l.e13296 = "Porta DB";
_l.e13297 = "DB Max";
_l.e13298 = "DB Idle Timeout, ms";
_l.e13298 = "Nome DB";
_l.e13300 = "Utente DB";
_l.e13031 = "Password del DB";
_l.e13302 = "Server proxy su";
_l.e13303 = "Porta del server proxy https";
_l.e13304 = "Porta del server proxy wss";
_l.e13305 = "Chiave SSL del server, pem";
_l.e13306 = "Cert SSL del server, pem";
_l.e13307 = "Passphrase SSL del server";
_l.e13308 = "Firebase admin SDK";
_l.e13309 = "Il tuo indirizzo Crane";
_l.e13310 = "Abilita Captcha";
_l.e13311 = "Abilita il limitatore Ip";
_l.e13312 = "Server";

_l.e13313 = "Database, PG sql";
_l.e13314 = "Firebase";
_l.e13315 = "Altro";
_l.e13316 = "Abilita";
_l.e13317 = "Percorso binario";
_l.e13318 = "Percorso di configurazione";
_l.e13319 = "Percorso dati";
_l.e13320 = "Indirizzo di stacking";
_l.e13321 = "Importa l'indirizzo dell'account al nodo per lo stacking";
_l.e13322 = "Stato";
_l.e13323 = "Indirizzi di stacking";
_l.e13324 = "Ultimo blocco";
_l.control = "Controllo";
_l.setup = "Impostazione";
_l.e13325 = "Vuoi davvero pubblicare messaggi da Telegram?";
_l.e13326 = "Pubblica";
_l.e13327 = "Vuoi davvero usare di nuovo il proxy?";
_l.e13328 = "ha messo mi piace al tuo commento!";
_l.e13329 = "Nuovo like al tuo commento";
_l.e13330 = "ha condiviso il tuo post";
_l.e13331 = "ha condiviso il tuo post";
_l.e13332 = "ha un nuovo post";
_l.e13332v = "ha un nuovo video";
_l.e13333 = "Transazione in arrivo";
_l.e13334 = "Congratulazioni, hai vinto";
_l.e13335 = "PKOIN per il tuo ultimo";
_l.e13336 = "con messaggio";
_l.e13337 = "ha commentato il tuo post";
_l.e13338 = "ha risposto al tuo commento";
_l.reply = "Rispondi";
_l.e13339 = "Hai salvato qualcuno dalla censura del web. Ci sono dei PKOIN in arrivo!";
_l.e13340 = "Congratulazioni!";
_l.e13341 = "ti segue";
// <% = "e("e13352")%> <%";
_l.e13342 = "Nuovo follwower";
_l.e13343 = "ha votato il tuo post";
_l.e13344 = "Nuovo voto";
_l.e13345 = "ti ha inviato un messaggio privato";

_l.e13346 = "Hai nuovi messaggi";
_l.e13347 = "Sono disponibili aggiornamenti per " + appname + ". Aggiorna ora?";
_l.e13348 = "No, più tardi";
_l.e13349 = "Sono disponibili aggiornamenti per " + appname + ". Vai alla pagina per scaricare la nuova versione?";
_l.e13350 = "Iscriviti a " + appname + " e guadagna PKOIN adesso.";
_l.e133512 = "Scrivi qualche parola su di te per aiutare le persone a decidere se vogliono seguirti";
_l.e13351 = appname + " chat";
_l.e13352 = "Non puoi accedere alla chat";

_l.e14001 = "Lingua dei post";
_l.e14002 = "Sei sicuro di voler cancellare il post?";
_l.e14003 = "Tecnico";
_l.e14004 = "Dove scarico l'app?";
_l.e14005 = "Dove scarico il software per il nodo?";
_l.e14006 = "Clicca su " + appname + "Setup.exe";
_l.e14007 = "Per qualsiasi domanda scrivi a core@pocketnet.app";
_l.e14008 = ""+appname+"";
_l.e14009 = "Vedo un indirizzo PN e un indirizzo del portafoglio... entrambi questi indirizzi sono sulla blockchain PN?";
_l.e14010 = "L'indirizzo PN è quello usato per postare contenuti e usare il social network in generale. Conserva anche le monete che vinci per i tuoi post altamente valutati.";
_l.e14011 = "Gli indirizzi del portafoglio servono a conservare il resto delle monete.";
_l.e14012 = 'Posso collegarmi al mio profilo o alla mia "pagina"? In modo che io possa pubblicarlo nella mia comunità per attirare i membri.';
_l.e14013 = "Nel browser, vai al tuo profilo cliccando sull'avatar in alto a destra e copia semplicemente l'indirizzo del browser, tutti quelli che si iscriveranno da quel link ti seguiranno automaticamente e tu riceverai effettivamente delle ricompense.";
_l.e14014 = "Sul desktop, da un'applicazione desktop vai al tuo profilo, una volta lì, ci saranno tre icone a destra del tuo avatar prima ci sarà un portafoglio con il numero di monete, poi una campana con le notifiche e una terza è una croce verde icona clicca su quella croce verde e clicca copia, invia quel link in giro tutti coloro che si iscrivono ti seguiranno e otterrai ricompense.";
_l.e14015 = "Il sistema delle stelle. c'è un limite su quante stelle una persona deve dare alla gente?";
_l.e14016 = "Ci sono alcuni limiti. Ma man mano che la tua reputazione cresce puoi dare sempre più voti. Questo è fatto, così i bot non rompono la nostra blockchain. Inizialmente si ottengono 100 valutazioni ogni 24 ore. Man mano che la tua reputazione cresce (questo accade postando e ricevendo voti), allora fai 200 valutazioni al giorno.";
_l.e14017 = "Tra quanto tempo potrò aggiornare il mio profilo?";
_l.e14018 = "Puoi aggiornare il tuo profilo una volta ogni ora.";
_l.e14019 = "C'è un Desktop Linux?";
_l.e14020 = "Sì, è in lavorazione da 2-3 settimane mentre il beta test procede.";
_l.e14021 = "Dove salvate i contenuti video?";
_l.e14022 = "Stiamo lavorando sull'archiviazione dei video, nel frattempo puoi condividere da Bitchute, Youtube, Vimeo e altre fonti video.";
_l.e14023 = "C'è un'applicazione mobile?";
_l.e14024 = "Sì. Ma incoraggiamo fortemente tutti a scaricare anche l'app per il desktop, dato che, a differenza dell'app per Android o iPhone, non può esservi tolta da Google o Apple.";
_l.e14025 = "Potete dirmi qual è il limite di post ogni giorno o ora?";
_l.e14026 = "Abbiamo alcune limitazioni, ma dopo averla testata abbiamo aumentato i limiti. All'inizio puoi fare 15 post e rilasciare 100 valutazioni ogni 24 ore. Una volta che la tua reputazione supera i 50, potrai fare fino a 30 post e 200 valutazioni ogni 24 ore.";
_l.e14027 = "Cos'è la reputazione e come si calcola?";
_l.e14028 = "La tua reputazione è la somma delle tue valutazioni calcolate nel modo seguente. Nota che gli utenti con una reputazione inferiore a 50 non influiscono sulla reputazione o sulle vincite di monete di nessuno. Possono valutare il contenuto, ma questo non influisce sulla reputazione.";
_l.e14029 = "Quindi, se hai due valutazioni a 5 stelle e una a 1 stella, il totale sarà";
_l.e14030 = "C'è un modo per cancellare o modificare un post?";
_l.e14031 = "Non a questo punto, in quanto è incorporato nella blockchain. Tuttavia, stiamo lavorando su una funzione per creare una transazione di sovrascrittura così come &#10075hide&#10076 transazione, che si tradurrebbe effettivamente per modificare o cancellare.";
_l.e14032 = "C'è un modo per cercare un utente?";
_l.e14033 = "Clicca sulla lente d'ingrandimento in alto e cerca per nome utente o per parole chiave.";
_l.e14034 = "Come si fa a seguire qualcuno?";
_l.e14035 = "Accanto all'autore del post (in cima al post) c'è un link Follow, puoi trovare i suoi post in Top posts (fiamma rossa in cima alla pagina). Presto vedrai anche il feed Subscriptions, che sarà diverso dal feed principale. Il feed principale sarà tutto ciò che chiunque pubblica cronologicamente, ma il feed delle sottoscrizioni conterrà solo i post delle persone che segui. Quindi, andrai nel feed generale alla ricerca di buoni contenuti, anche se potrebbe non piacerti tutto. Poi seleziona quelli che vuoi tenere. Un po' come la pesca :)";
_l.e14036 = "Può essere utilizzato su Brave o Duck Duck go browser?";
_l.e14037 = appname + " should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab "+appname+"Setup.exe here: https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta). It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.";
_l.e14038 = "Possiamo rispondere ai nostri/e altri/e post?";
_l.e14039 = "Sì, i commenti sono live sotto ogni post.";
_l.e14040 = "Come aggiungere un tag ad un post?";
_l.e14041 = "Basta digitare nel campo tag e premere invio. Non c'è bisogno di specificare #, verrà aggiunto automaticamente.";
_l.e14042 = "Come posso usare l'indirizzo pubblico?";
_l.e14043 = "Your public address is what "+appname+" uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. "+appname+" uses the same exact cryptography as Bitcoin.";
_l.e14044 = "Will there be a downloadable executable for Mac?";
_l.e14045 = "Yes - we are working of Mac platform. Target is for mid-April.";
_l.e14046 = "Pocketcoin";
_l.e14047 = "What can I do with Pocketcoin?";
_l.e14048 = "Currently you can win it or send as a gift. However, if and when "+appname+" takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token.";
_l.e14049 = "Is Pocketcoin like a share of stock in "+appname+"?";
_l.e14050 = "Definitely no. " + appname + " is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, "+appname+" will include a marketplace where goods and services will be sold directly for Pocketcoin";
_l.e14051 = "Can I buy additional Pocketcoin?";
_l.e14052 = "Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise " + appname + " to the world. So, by buying a Pocketcoin you are positioning yourself for success of "+appname+", but just as importantly you are helping "+appname+" achieve this success. All major social networks had billion dollar advertising budgets. "+appname+" was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now.";
_l.e14053 = "Can I buy Pocketcoin for US Dollars or other fiat currency?";
_l.e14054 = "No.";
_l.e14055 = "Privacy";
_l.e14056 = "Are people who do not enter their real names anonymous?";
_l.e14057 = "Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates.";
_l.e14058 = "Can someone view a profile (someone&rsquos posts) outside the garden? Is it a walled garden?";
_l.e14059 = "Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.";
_l.e14060 = "Is my public key like a wallet ID that I enter on my profile and people can send points to?";
_l.e14061 = "Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!";
_l.e14062 = "Can I run a node on my headless server?";
_l.e14063 = "We will put the node&rsquos sources into GitHub. Instructions for running a node will be made available in early April.";
_l.e14064 = "How can I sign back in?";
_l.e14065 = "You can use your private 12-word key or a QR code to sign in.";
_l.e14066 = "Curation of content";
_l.e14067 = "Is any content allowed on " + appname + "? If some content is not allowed, can the platform still be called free speech?";
_l.e14068 = "This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.";
_l.e14069 = "Specifics of curation on "+appname+".";
_l.e14070 = "When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).";
_l.e140701 = "We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?";
_l.e140702 = "Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.";
_l.e140703 = "We strongly recommend that you complain about porn/nudity of any kind. There are plenty of porn/nudity sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn/nudity. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.";
_l.e14071 = "Important Note on Racism.";
_l.e14072 = "Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquos nationality or race. You can make your point based on evidence. We cannot afford to turn "+appname+" into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on "+appname+". Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. "+appname+" team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on "+appname+". Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic.";
_l.e14073 = "Specifics of curation on " + appname + ".";
_l.e14074 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?";
_l.e14075 = "Sometimes we can have a user who comes in with a specific purpose to attack "+appname+" by posting a series of vile images. To protect against that we have a following mechanism. If someone’s reputation reaches -50 (negative 50), their account is automatically blocked. Getting a reputation of -50 is equivalent to having 25 one star ratings and no four or five star ratings. This is nearly impossible to achieve without having lots of bad posts.";
_l.e14076 = "Flagging a specific post";
_l.e14077 = "When your reputation gets to 50 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn " + appname + " into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn/nudity of any kind. There are plenty of porn/nudity sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn/nudity. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.";
_l.e14078 = "How is "+appname+" different from...";
_l.e14079 = "Twitter, Facebook, Reddit & other centralized platforms?";
_l.e14080 = "There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users.";
_l.e14081 = "Decentralized platforms like Minds.com and Sola?";
_l.e14082 = "Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor.";
_l.e14083 = "From Steemit?";
_l.e14084 = "Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that.";
_l.e14085 = "Decentralized platforms like Mastodon and others?";
_l.e14086 = "While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. "+appname+" features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.";
_l.e14087 = appname + " ecosystem";
_l.e14088 = "How is " + appname + " develpment funded?";
_l.e14089 = appname + " is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch "+appname+" will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner.";
_l.e14090 = "What is Pocketcoin?";
_l.e14091 = "Pocketcoin is a network token. It is used exclusively to buy advertising from " + appname + " contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of "+appname+" and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes.";
_l.e14092 = "How are content creators and node operators rewarded?";
_l.e14093 = appname + " features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.";
_l.e14094 = "What if users post illegal content, porn/nudity and SPAM?";
_l.e14095 = appname + " is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag illegal content OR content that threatens mass adoption of "+appname+", not simply the content they find offensive. To make sure that "+appname+" is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.";
_l.e14096 = "Who runs the "+appname+"?";
_l.e14097 = "There is no corporate entity or single individual who owns or controls the " + appname + ".";
_l.e14098 = "The Designer of the " + appname + ", Daniel Sachkov changed his main focus in the Summer of 2019 he is now doing research on further decentralization of blockchain technology that will benefit everyone. He handed control of the Project in accordance with the idea of a full decentralized social media architecture and design over to the community and the Nodes who run the Network.";
_l.e14099 = "A team of capable, changing developers and community volunteers is working on the realisation of his Vision ever since. ";

_l.e14100 = "Centro assistenza";
_l.e14101 = "Block Explorer";
_l.e14102 = "F.A.Q.";
_l.e14103 = "Roadmap";
_l.e14104 = "Impostazione del nodo";
_l.e14105 = "Video";
_l.e14106 = "Applicazioni";
_l.e14107 = "Controlla gli aggiornamenti";
_l.e14108 = "Condividi risposta";
_l.e14109 = "Dove posso scaricare l'applicazione per Android?";
_l.e14110 = "Google Play Market";


_l.peertubeAddVideo = "Carica video";
_l.peertubeAddStream = "Aggiungi lo streaming dal vivo al post";

_l.e14111 = "C'è stato un problema con il caricamento delle immagini";
_l.editcomment = "Modifica Commento";
_l.system16 = {
    charts : {

    }
}


_l.downvoteShareMessage = "ha votato negativamente il tuo post";

_l.shareviagroupemail = "Email";
_l.shareviagroupmessenger = "Messengers";
_l.shareviagroupsocial = "Social networks";
_l.shareviagroupblog = "Blog";

_l.anotherSiteCaption = "Segui un link esterno verso un sito terzo";
_l.anotherSiteDisc = "Non siamo responsabili del contenuto del sito e ti consigliamo vivamente di non fornire i tuoi dati personali su siti terzi.";

_l.Categories = "Categorie";
_l.addtagsCategories = "Aggiungi Categorie/Tags";
_l.addcategory = "Aggiungi categoria";
_l.categoryname = "Nome della categoria";
_l.entercategoryname = "Inserisci il nome della categoria";
_l.categoryfilter = "Filtro categoria";
_l.emptycategoryname = "Inserisci il nome della categoria.";
_l.doublename = "La categoria con questo nome esiste già. Per favore scegli un altro nome.";

_l.showmoreusers = "Mostra altri utenti";
_l.zeron = "Non ho trovato niente";
_l.maxtags = "Sono consentiti solo 5 tag al massimo";

_l.videotitle = "Inserisci il titolo del video/stream";
_l.videodesc = "Inserisci la descrizione del video/stream";
_l.entervideocaption = "Per favore, inserisci il titolo del video";

_l.period = "Periodo";
_l.periodday = "Un giorno";
_l.period3day = "Tre giorni";
_l.period7day = "Una settimana";
_l.period31day = "Un mese";
_l.period182day = "Sei mesi";

_l.shareBareLink = "Condividi link al video";
_l.videoCopied = "Link al video copiato con successo negli appunti";

_l.editWallpaper = "Cambia immagine di anteprima";
_l.removeVideo = "Rimuovi video";

_l.removeVideoDialog = "Sei sicuro di voler eliminare questo video?";

_l.pterror_meta = "Peertube: Richiesta non definita";
_l.pterror_host = "Peertube: Server Peertube non trovato";
_l.pterror_link = "Peertube: Collegamento Peertube sconosciuto";
_l.pterror_removeerror = "Peertube: Impossibile rimuovere il video. Riprova per favore";
_l.pterror_updateempty = "Peertube: Nessun cambiamento trovato";
_l.pterror_uploaderror = "Peertube: Il video non è stato caricato";
_l.pterror_dailyquotalimit = "Peertube: Hai raggiunto il tuo limite di caricamento video";
_l.pterror_videoQuotaUsedDaily = "Peertube: Impossibile ottenere informazioni sul canale (quota)";
_l.pterror_usersMe = "Peertube: Impossibile ottenere informazioni sul canale";
_l.pterror_oauthClientsLocal = "Peertube: Impossibile ottenere le informazioni oAuth dal server";
_l.pterror_pocketnetAuth = "Peertube: Peertube- "+appname+" autorizzazione fallita";
_l.pterror_getToken = "Peertube: Impossibile ottenere il Token";
_l.pterror_videonotselected = "Peertube: Video non selezionato";


_l.videoUploadingFinish = "Finito il caricamento...";
_l.uploadNewVideo = "Carica un nuovo video";
_l.selectVideoFile = "Seleziona il file video";
_l.uploadVideoProgress = "Progresso:";


_l.pbp_1 = appname + " Bonus Program";
_l.pbp_2 = "Criteri per ricevere il bonus:";
_l.pbp_3 = "Ogni 10k visualizzazioni + 750 valutazioni a cinque stelle da utenti unici";
_l.pbp_4 = "Equivalente PKOIN:";
_l.pbp_5 = "1.000 USDT";
_l.pbp_6 = "Come puoi aumentare le tue visualizzazioni?";
_l.pbp_7 = "Incorpora il tuo video " + appname + " in siti esterni (clicca su Condividi e scegli Embed)";
_l.pbp_8 = "Condividi il tuo video sui social network e via e-mail";
_l.pbp_9 = "Condividi il link alla tua pagina personale (vai al tuo profilo e clicca su Condividi)";
_l.pbp_10 = "Se inviti un video blogger e puoi dimostrarlo, ottieni un bonus pari al 25% dei loro guadagni.";
_l.pbp_11 = "Per qualsiasi domanda, invia un'e-mail a";


_l["Top Videos"] = "Top Video";
_l["More videos by this author"] = "Altri video di questo autore";

_l["pdirectdialog"] = "I proxy esterni non rispondono, vuoi passare a un proxy locale?";


_l.goLive = "Vai in diretta";
_l.streamInfo = "Informazioni sul flusso";
_l.streamCreating = "Crea Stream";

_l.importFromExternal = "o importa da YouTube";


_l.importHeading = "Importazione video da YouTube";
_l.importInputPlaceholder = "Incolla il link al tuo video di YouTube";
_l.importInputLabel = "URL video";

_l.capitalWarning = "Limiti di qualità dello streaming";
_l.streamSettingsWarn = "Per prestazioni ottimali, si prega di utilizzare impostazioni di streaming non superiori alle seguenti: 2000 kb/s bitrate, risoluzione 1920x1080p. Altrimenti la tua diretta potrebbe essere interrotta o instabile";

_l.keygeneration = "Generazione di chiavi di crittografia";

_l.failedStreamGeneration = "Impossibile avviare lo streaming";

_l.hideallnotifications = "Nascondi tutte le notifiche";

_l.e133452 = "ti ha inviato un messaggio";
_l.e133453 = "vuole invitarti in chat";


_l.createnewcontinue = "Continua a creare un account";


_l.transactionnotfound = "Transazione non trovata";

_l.donateself = "Non puoi donare a te stesso";
_l.donated = "ha commentato il tuo post e ha donato";
_l.incoins = "Abbastanza PKOIN";
_l.yourbalance = "Il tuo saldo";
_l.sumoftransaction = "Somma della transazione";


_l.videoBitrateError = "Il bitrate del video è troppo alto. Per favore, usa un file con una qualità/risoluzione inferiore";
_l.videoQualityInfo = "Bitrate video massimo consentito - 8 Mbit/s. Se il tuo file supera questo limite, il download sarà terminato.";
_l.videoQualityCaption = "Limiti di qualità del video";

_l.streamLinks = "Link al software di streaming";
_l.linkRTMP = "RTMP Url";
_l.linkStreamKey = "Chiave del flusso";



_l.videoCabinet = "I miei video";
_l.uploadQuota = "Quota giornaliera di caricamento";
_l.attachVideoToPost = "Crea un post con questo video";

_l.linkToPost = "Collegamento al post";
_l.attachVideoToPostShort = "Pubblica";

_l.totalStars = "Valutazione media (Voti totali)";
_l.totalComments = "Commenti totali";
_l.totalViews = "Visualizzazioni video";

_l.enterVideoName = "Cerca per nome del video";

_l.videoTranscoding = "Il video è in fase di elaborazione e potrebbe non funzionare correttamente / indurre un consumo di traffico prolungato. Vuoi ancora pubblicarlo?";
_l.waitForTranscoding = "Aspetta l'elaborazione";

_l.bonusProgram = "Stato del programma bonus";
_l.bonusProgramViews = "Visualizzazioni totali del video";
_l.bonusProgramRatings = "Valutazioni totali";

_l.sortBy = "Ordina per:";
_l.sortDirection = "Direzione di ordinamento:";
_l.sortDirectionAsc = "Ascendente";
_l.sortDirectionDesc = "Discendente";
_l.sortByName = "Nome";
_l.sortByCreatedAt = "Data di creazione";
_l.sortByDuration = "Durata";
_l.sortByViews = "Visualizzazioni";

_l.unableToAuthorize = "Impossibile autorizzare";
_l.unableToAuthorizeBody = "Sfortunatamente, l'applicazione non può autenticare questo account sul server video. Hai bisogno di almeno 5 PKOIN o 100 di reputazione per caricare i video. Se ce l'hai, per favore riprova più tardi";

_l.downloaded = "Scaricato";
_l.downloadedEmpty = "I post scaricati saranno mostrati qui";
_l.emptyDescription = "La descrizione è vuota";
_l.transcodingShort = "Elaborazione";
_l.editVideoDescription = "Modifica nome/descrizione del video";
_l.errorChangingDescription = "Impossibile cambiare il nome/descrizione del video";
_l.downloadVideo = "Salvare il video";
_l.downloadingVideo = "Salvare il video";
_l.deleteSavedVideo = "Elimina il video salvato";

_l.downloadShare = "Salvare la condivisione";
_l.deleteSavedShare = "Eliminare la condivisione";

_l.selectQuality = "Seleziona la qualità:";
_l.downloadedVideos = "Video scaricati";
_l.deleteAllDownloadedVideos = "Elimina tutti i video scaricati";
_l.noDownloadedVideos = "Nessun video scaricato";
_l.deleteVideoDialog = "Sei sicuro di voler eliminare questo video?";
_l.deleteAllVideoDialog = "Sei sicuro di voler eliminare tutti i video?";
_l.videosDeleted = "Video cancellati!";

_l.enterVideoName = "Inserisci il nome del video";
_l.enterVideoDescription = "Inserisci la descrizione del video";


_l.doyouwantseepk = "Vuoi davvero vedere la tua chiave privata?";
_l.copycode = "Copia la chiave privata";
_l.privatekeyqr = "Codice QR della chiave privata";
_l.saveimage = "Salva immagine";

_l.showAllButton = "Mostra tutto";
_l.hideAllButton = "Nascondi";

_l.UniqueUsers = "Rating unici";
_l.ErrorLoadingRates = "Errore di caricamento";

_l.userGuides = "Guide";
_l.liveSreamingGuide = "Streaming dal vivo";

_l.bastyonhelperTitle1 = "Pocketnet si è spostato,";
_l.bastyonhelperTitle2 = "Bastyon, libertà di espressione";
_l.bastyonhelperSubtitle1 = "Pocketnet è ora";
_l.bastyonhelperSubtitle2 = "Per favore, segui il link qui sotto";

_l.buy = 'Acquistare';


_l.lowstar1 = "Il team di Bastyon sta implementando una moratoria temporanea sulle valutazioni a 1 e 2 stelle, ad eccezione dei contenuti vietati. I contenuti vietati sono:"
_l.lowstar_reason_1 = "Erotico/porno"
_l.lowstar_reason_2 = "Sfruttamento minorile"
_l.lowstar_reason_3 = "Minaccia diretta di violenza"
_l.lowstar_reason_4 = "Droghe illegali"
_l.lowstar2 = "Non utilizzare valutazioni a 1 e 2 stelle per altri motivi. Dopo il rilascio della nuova moderazione a metà. Potresti essere in grado di utilizzare valutazioni basse per altri motivi"
_l.lowstaragree = "Confermo che questo post contiene uno dei quattro tipi di contenuto proibito"

_l.androidPopupTitle = "Ottieni informazioni non censurate nell'app mobile Bastyon"
_l.androidPopupAgree = "Passa all'app"
_l.androidPopupDisagree = "Non ora"

_l.desktopPopupTitle = "Ottieni informazioni non censurate nell'app desktop Bastyon"
_l.desktopPopupAgree = "Scarica l'app"
_l.desktopPopupDisagree = "Non ora"

_l.profanity_tag = 'volgarità'

_l.saved = "Salvati"
_l.savePost = "Salva il post"
_l.postsaved = "Post salvato"
_l.deleteSavedPost = "Elimina il post salvato"
_l.doYouDownloadVideo = "Vuoi scaricare il video sul tuo dispositivo?"
_l.gotosaved2 = "Vai a salvare"
_l.yes = "Sì"
_l.no = "No"