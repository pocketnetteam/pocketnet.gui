var appname = (window.project_config || {}).fullname || 'Bastyon'


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
_l.unickname = "Create a Nickname";
_l.ulanguage = "Lingua";
_l.uabout = "Su di me";
_l.uwebsite = "Sito web";
_l.uaddresesd = "Indirizzi per le donazioni";
_l.usavechanges = "Vuoi salvare le tue modifiche?";

_l.settings_save = "Salva le modifiche";
_l.settings_discard = "Azzera le modifiche";

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
_l.e13086 = "Supporta "+appname+" ora";
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
_l.e13109h = "Fai clic sugli esagoni per assemblare l'immagine, quindi inserisci il testo nell'immagine risultante"

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
_l.e13171 = 'Finalmente! Ho detto "basta" ai soliti social media e alle informazioni controllate! Entra anche tu in website e dì addio alla censura. Un social network libero e basato sulla blockchain. Clicca qui per iniziare!';
_l.e13172 = "Ti voglio invitare ad un nuovo social network decentralizzato chiamato " + appname + " ! Troverai una tonnellata di cose interessanti e se ti iscrivi, entrambi otterremo un bonus in criptovaluta PKOIN!";
_l.e13173 = "Invia per e-mail";
_l.e13174 = "Condividi sui social";
_l.e13175 = "Tag popolari";
_l.e13176 = "Tipo di indirizzo";
_l.e13177 = "Carica foto";

_l.requiredfields = "campi obbligatori";
_l.e13178 = "Opzionale";
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

_l.bhelperTitle1 = "Pocketnet si è spostato,";
_l.bhelperTitle2 = ""+appname+", libertà di espressione";
_l.bhelperSubtitle1 = "Pocketnet è ora";
_l.bhelperSubtitle2 = "Per favore, segui il link qui sotto";

_l.buy = 'Acquistare';


_l.lowstar1 = "Il team di "+appname+" sta implementando una moratoria temporanea sulle valutazioni a 1 e 2 stelle, ad eccezione dei contenuti vietati. I contenuti vietati sono:"
_l.lowstar_reason_1 = "Erotico/porno"
_l.lowstar_reason_2 = "Sfruttamento minorile"
_l.lowstar_reason_3 = "Minaccia diretta di violenza"
_l.lowstar_reason_4 = "Droghe illegali"
_l.lowstar2 = "Non utilizzare valutazioni a 1 e 2 stelle per altri motivi. Dopo il rilascio della nuova moderazione a metà. Potresti essere in grado di utilizzare valutazioni basse per altri motivi"
_l.lowstaragree = "Confermo che questo post contiene uno dei quattro tipi di contenuto proibito"

_l.androidPopupTitle = "Ottieni informazioni non censurate nell'app mobile "+appname+""
_l.androidPopupAgree = "Passa all'app"
_l.androidPopupDisagree = "Non ora"

_l.desktopPopupTitle = "Ottieni informazioni non censurate nell'app desktop "+appname+""
_l.desktopPopupAgree = "Scarica l'app"
_l.desktopPopupDisagree = "Non ora"

_l.copybuiltfrom = "Numero di montaggio copiato"

_l.profanity_tag = 'volgarità'

_l.saved = "Salvati"
_l.savePost = "Salva il post"
_l.postsaved = "Post salvato"
_l.deleteSavedPost = "Elimina il post salvato"
_l.doYouDownloadVideo = "Vuoi scaricare il video sul tuo dispositivo?"
_l.gotosaved2 = "Vai a salvare"
_l.yes = "Sì"
_l.no = "No"

_l.torusing_neveruse = "Mai";
_l.torusing_auto = "Auto";
_l.torusing_always = "Sempre";

_l.torusing_directProxy = "Proxy integrato";
_l.torusing_notdirectProxy = "Proxy esterno";

_l.torusing_changedirectProxy = "Passare a un proxy esterno";
_l.torusing_changenotdirectProxy = "Passare a un proxy integrato";

_l.torusing_disclaimer = "Questa funzione funziona solo quando si utilizza un proxy integrato.";

_l.torusing_Networking = "Rete";
_l.torusing_proxyCaption = "Selezione di un server proxy";
_l.torusing_useTor = "Usare TOR";
_l.torusing_useSnowflakeBridge = "Usare Snowflake";

_l.torusing_stat_currentbytesLength = "Ora, le richieste dirette"
_l.torusing_stat_torbytesLength = "Ora, TOR richiama"
_l.torusing_stat_directBytes = "Totale, richieste dirette"
_l.torusing_stat_totalTorBytes = "Totale, TOR richiama"
_l.torusing_settings = "Impostazioni TOR"
_l.torusing_stats = "Statistiche della query"
_l.torusing_proxychangequestion = "Sei sicuro di voler cambiare il proxy?"

/** ↓ Component UpdateNotifier ↓ */
_l.updateNotifier_topHeading1 = 'Versione';
_l.updateNotifier_topHeading2 = 'Disponibile';
_l.updateNotifier_mainHeading = 'Abbiamo aggiornato';
_l.updateNotifier_mainText = 'Si consiglia di mantenere l\'applicazione aggiornata. Nuove funzionalità e migliori prestazioni vi aspettano!';
_l.updateNotifier_button1 = 'Installa';
_l.updateNotifier_button2 = 'Più tardi...';
_l.updateNotifier_stateStart = 'Avvio...';
_l.updateNotifier_stateDownload = 'Scaricato';
_l.updateNotifier_stateError = 'Errore verificatosi';
_l.updateNotifier_availableSilent = "Aggiornamento disponibile"
/** ↑ Component UpdateNotifier ↑ */

/** Collections */
_l.collections = "Collezioni"
_l.emptycollections = "Nessuna collezione"
_l.collectionemptymessage = "La descrizione della collezione è vuota"
_l.collectioncaption = "Il nome della collezione è obbligatorio"
_l.collectionshares = "Aggiungi almeno una pubblicazione"
_l.collectionimage = "La copertina della collezione è obbligatoria"
_l.collectionby = "Collezione di"
_l.collectionLabel = "Collezione"
_l.collectionEdit = "Modifica"
_l.collectionOpen = "Apri collezione"
_l.collectionEditing = "Salvataggio delle modifiche…"
_l.collectionnochanges = "Nessuna modifica nella collezione"
_l.collectionNotFound = "Collezione non trovata"
_l.collectionDeleted = "Collezione eliminata"
_l.newcollection = "Crea"
_l.newcollectionex = "Crea una nuova collezione"
_l.edcollectionex = "Modifica la collezione"
_l.savecollection = "Salva"
_l.deletecollection = "Elimina"
_l.removeCollectionDialog = "Vuoi davvero eliminare questa collezione?"
_l.cancelcollection = "Annulla"
_l.collectionInputCaption = "Nome della collezione"
_l.collectionInputDescription = "Descrizione della collezione"
_l.collectionInputImage = "Copertina della collezione"
_l.collectionInputImageChange = "Cambia la copertina della collezione"
_l.collectionMaterialsAdd = "Aggiungi pubblicazioni"
_l.collectionMaterials = "Pubblicazioni"
_l.collectionsShowAll = "Mostra tutte le collezioni"
_l.collectionAuthorCollections = "Collezioni dell'autore"
_l.collectionMaterialsUnavailable = "Alcune pubblicazioni non sono disponibili"
_l.enabledEditModeCollections = "Seleziona nell'interfaccia le pubblicazioni da includere in questa collezione"
_l.collectionMode = "Modalità di modifica della collezione"
_l.removeFromCollection = "Rimuovi dalla collezione"
_l.addToCollection = "Aggiungi alla collezione"
_l.addToCollectionHint = "Scegli una collezione per questa pubblicazione"
_l.collectionNewItem = "Nuova collezione"
_l.collectionContains = "Già in questa collezione"
_l.collectionAlreadyContains = "Impossibile aggiungere questa pubblicazione perché è già nella collezione"
_l.collectionCoverAdd = "Aggiungi copertina"
_l.collectionCoverHint = "Fai clic o trascina un'immagine. Un'immagine quadrata è l'ideale"
_l.collectionCoverChange = "Cambia"
_l.collectionInputCaptionPlaceholder = "Ad esempio: Il meglio del mese"
_l.collectionInputDescriptionPlaceholder = "Di cosa parla questa collezione?"
_l.collectionOptional = "(facoltativo)"
_l.collectionMaterialsEmpty = "Ancora nessuna pubblicazione"
_l.collectionMaterialsEmptyHint = "Aggiungi pubblicazioni alla collezione. Puoi cambiarne l'ordine trascinandole"
_l.collectionMaterialsDragHint = "Trascina per cambiare l'ordine"
_l.clearcollection = "Svuota"
_l.clearCollectionDialog = "Vuoi davvero svuotare la collezione?"
_l.collectionsEmptyHint = "Raggruppa le pubblicazioni in collezioni tematiche e condividile"
_l.collectionTypeArticle = "Articolo"
_l.collectionTypeStream = "Diretta"
_l.collectionTypePoll = "Sondaggio"
_l.collectionTypePost = "Post"
_l.collectionTypePaid = "Per gli abbonati"
_l.collectionInRelay = "La collezione è in fase di pubblicazione…"
_l.collectionWaitConf = "La collezione è in fase di pubblicazione…"
_l.collectionPublishError = "Errore di pubblicazione"

//pin lock

_l.pinlock_title = "Blocco PIN"
_l.pinlock_welcome = function(v){
	return "Bentornato, " + v
}
_l.pinlock_welcomeanon = "Bentornato"
_l.pinlock_enter = "Inserisci il PIN"
_l.pinlock_current = "Inserisci il PIN attuale"
_l.pinlock_new = "Crea un PIN"
_l.pinlock_repeat = "Ripeti il PIN"
_l.pinlock_done = "Fatto"
_l.pinlock_mismatch = "I PIN non corrispondono"
_l.pinlock_wrong = "PIN errato"
_l.pinlock_attemptsleft = function(v){
	return "tentativi rimasti: " + v
}
_l.pinlock_blocked = function(v){
	return "Troppi tentativi. Riprova tra " + v
}
_l.pinlock_error = "Qualcosa è andato storto. Riprova"
_l.pinlock_entered = function(v){
	return "Inseriti " + v + " di 4"
}
_l.pinlock_digit = function(v){
	return "Cifra " + v
}
_l.pinlock_delete = "Elimina"
_l.pinlock_keyboardhint = "Puoi digitare dalla tastiera"
_l.pinlock_forgot = "PIN dimenticato?"
_l.pinlock_forgotwarning = "Per accedere di nuovo ti serviranno la frase mnemonica o la chiave privata. Senza di esse l'accesso all'account andrà perso per sempre."
_l.pinlock_signout = "Esci dall'account"
_l.pinlock_purpose = "Il PIN protegge l'app da altre persone che vi accedono. Non sostituisce il backup della frase mnemonica."
_l.pinlock_enabled = "PIN impostato"
_l.pinlock_changed = "PIN modificato"
_l.pinlock_disabled = "PIN disattivato"
_l.pinlock_lockafter = "Blocca dopo"
_l.pinlock_minutes = function(v){
	return v + " min"
}
_l.pinlock_security = "Sicurezza"
_l.pinlock_settingname = "PIN"
_l.pinlock_stateon = "Attivo"
_l.pinlock_stateoff = "Disattivo"
_l.pinlock_set = "Imposta PIN"
_l.pinlock_change = "Cambia PIN"
_l.pinlock_disable = "Disattiva PIN"
_l.pinlock_locknow = "Blocca ora"

_l.today = "Oggi alle";
_l.welcome = "Benvenuto";
_l.continuewithbarteron="Continua con Barteron";
_l.chooseThemes = "Scegli temi interessanti";
_l.bloggers = "Blogger";
_l.chooseBloggers = "Segui i blogger popolari";
_l.showmorebloggers = "Mostra altri blogger";
_l.ractivities = "La mia attività";
_l.rall = "Tutto";
_l.rinteractions = "Interazioni";
_l.rblocking = "Blocchi";
_l.rblockinglist = "Elenco degli utenti bloccati";
_l.rcomment = "Commenti";
_l.rsubscriber = "Iscrizioni";
_l.a_unabledvideo = "Il video non è disponibile al momento";
_l.rvideo = "Video";
_l.contentscore = "Hai valutato la pubblicazione";
_l.commentscorelike = "Ti è piaciuto il commento.";
_l.commentscoredislike = "Non ti è piaciuto il commento";
_l.commented = "Hai commentato la pubblicazione";
_l.ranswer= "Hai risposto al commento";
_l.sentmoney = "Hai trasferito fondi a";
_l.a_unsubscribe = "Hai annullato l'iscrizione a";
_l.a_subscribe = "Ti sei iscritto a";
_l.a_collection = "Hai creato una raccolta";
_l.a_block = function(c){
    return c ? `Hai bloccato ${c} utenti` : `Hai bloccato`
};
_l.a_unblock= "Hai sbloccato";
_l.a_boost = "Hai potenziato il post ";
_l.a_empty = "Nessuna statistica per gli ultimi 3 mesi";
_l.rstatistic = "Statistiche";
_l.totalBalance = "Saldo totale";
_l.referralsCount = 'Utenti che hanno usato il link di invito.';
_l.commentatorsCount = function(limit){
    return "Utenti che ti hanno commentato più di " + limit + (limit === 1 ? ' volta' : ' volte')
};
_l.from = 'Periodo: ';
_l.to = 'a';
_l.empty = "Vuoto";
_l.apply = 'Applica';
_l.spa = "Numero di post audio";
_l.stpg = "Top";
_l.stpreal = "Verificato";
_l.stpdev = "Sviluppatore di "+appname+"";
_l.stpmoderator = "Moderatore";
_l.trialreputationtip = "Per diventare un utente top devi avere una reputazione valida. Occorre che almeno 100 persone diverse con reputazione top valutino positivamente i tuoi contenuti (dopo 3 mesi questo requisito scende a 30). Il secondo requisito è una reputazione complessiva di almeno 100.";
_l.trialreputationtipaction = "Scopri di più sulla reputazione qui";
_l.ccpl = "Numero di segnalazioni";
_l.accfailedkeypair = "Chiave privata errata";
_l.acchasinthispack = "Questo indirizzo è già stato aggiunto";
_l.acchasinanotherpack = "Questo indirizzo è già usato in un altro gruppo di indirizzi";
_l.subi = "Seguiti";
_l.followers2 = "Follower";
_l.following2 = "Seguiti";
_l.commentBannerTitle = "Commenta questo post";
_l.commentBannerDescription = "Commentare sblocca funzionalità su "+appname+" e ti aiuta a trovare amici 😀";
_l.commentBannerTitle2 = function(v){ return "Segui " + v + " per vedere altri suoi post"};
_l.commentBannerDescription2 = function(v){ return "Seguendo " + v + " vedrai più contenuti come questo nel tuo feed." };
_l.dontShowAgain = "Non mostrare più";
_l.whatsnewrepost = "Il tuo commento";
_l.dcode = "Codice";
_l.dcopyToClipboard = "Copia negli appunti";
_l.dwarning = "Attenzione";
_l.dyesclose = "Sì, chiudi";
_l.scoreLimitLight = "Hai raggiunto il limite di valutazioni";
_l.ntyesterday = "Ieri";
_l.shareVia = "Condividi tramite";
_l.embedding = "Incorporamento";
_l.copyEmbeddingCode = "Copia codice di incorporamento";
_l.showCode = "Mostra codice";
_l.embeddingSettings = "Impostazioni di incorporamento";
_l.blackTheme = "Tema nero";
_l.includeComments = "Includi commenti";
_l.showOnlyLast = "Mostra solo l'ultimo commento";
_l.inclueComments = "Commenti";
_l.showAll = "Mostra tutti i commenti";
_l.dontShow = "Non mostrare i commenti";
_l.removeDescription = "Rimuovi descrizione";
_l.preview = "Anteprima";
_l.autoplayVideo = "Riproduzione automatica video";
_l.learnMoreBoost = "Scopri di più sul Boost";
_l.onlyVideo = "Solo video";
_l.blockUserQ = "Vuoi bloccare l'utente?";
_l.postRemoved = "Il post è stato rimosso";
_l.postNotFound = "Post non trovato";
_l.complain_success =  "La tua segnalazione è stata inviata con successo";
_l.ok = "OK";
_l.supportFormTitle = "Vuoi donare in un altro modo o hai altre domande? Contattaci";
_l.addrNotAvailable = function(cur){
    return "L'indirizzo per " + cur + " non è disponibile al momento";
};
_l.subject = "Oggetto";
_l.e13109lg = "Inserisci le parole dell'immagine per continuare";
_l.removePostDialog = "Vuoi davvero rimuovere il post?";
_l.opennew = "Apri post";
_l.pin = "Fissa post";
_l.pinned = "fissato";
_l.pinning = "fissaggio";
_l.pinPostDialog = "Vuoi davvero fissare questo post?";
_l.unpin = "Sblocca post";
_l.unpinPostDialog = "Vuoi davvero rimuovere questo post dai fissati?";
_l.reportuser = "Segnala utente";
_l.reportminiapp = "Segnala";
_l["Top videos"] = "Video top";
_l.bestFirst = "Prima i migliori";
_l.totalLikes = "Mi piace totali";
_l.reposted = "Repost";
_l.uiScaleSetting = "Ridimensionamento dell'interfaccia";
_l.uiScaleSettingTitle = "Imposta il ridimensionamento";
_l.e13196 = "Potrebbe richiedere";
_l.e132233 = "Scarica "+appname+" per Android";
_l.e132221 = "Scarica l'app mobile: è il modo più comodo per usare "+appname+".";
_l.installpwa = "Installa";
_l.step1 = "Passo 1:";
_l.step2 = "Passo 2:";
_l.installios_instruction3 = "nella parte inferiore dello schermo";
_l.e132233ios = "Installa "+appname+" per iPhone";
_l.installios_caption =  "Installa "+appname+" per iPhone";
_l.installios_empty =  "Questa è la pagina per installare l'app per iPhone. Le app per gli altri sistemi operativi si trovano qui";
_l.installios_empty_button =  "Vai alla pagina dell'app";
_l.installios_instruction1 = 'tocca';
_l.installios_instruction2 = 'poi "Aggiungi alla schermata Home"';
_l.e13225 = "Nodo "+appname+"";
_l.saveSettingsLimit = "Hai raggiunto il limite di salvataggio delle impostazioni nell'arco di 24 ore";
_l.e13257_1 = "La tua reputazione su "+appname+" non ti consente di dare valutazioni negative alle pubblicazioni";
_l.e2000 = "Errore di connessione. Riprova";
_l.e13270d = "Voti negativi ricevuti";
_l.e132812 = "Commenti";
_l.sound = "Suono";
_l.e141081 = "Menu";
_l.peertubeAddAudio = "Carica audio";
_l.selectnode = function(a) {
    return `Vuoi davvero riconnetterti al nodo ${a} selezionato?`
};
_l.settingsTranscoding = "Durante il caricamento del video, transcodificalo sul mio dispositivo";
_l.videoTranscodingNotOptimal = "Risultato della transcodifica non ottimale. Si prosegue con il video originale";
_l.videoTranscodingError = "Si è verificato un errore durante l'elaborazione del video";
_l.uploadNewAudio = "Carica nuovo audio";
_l.selectAudioFile = "Seleziona file audio";
_l.uploadVideoProgress_binaries = "Preparazione dei file binari:";
_l.uploadVideoProgress_processing = "Elaborazione del video:";
_l.uploadVideoProgress_uploading = "Caricamento del video:";
_l.uploadAudioProgress_uploading = "Caricamento dell'audio:";
_l.uploadVideoProgress_start = "Inizializzazione del caricamento del video:";
_l.uploadAudioProgress_start = "Inizializzazione del caricamento dell'audio:";
_l.uploadCanceled = "Caricamento annullato";
_l.pleaseTryAgain = "Qualcosa è andato storto. Riprova";
_l.pbp_6_1 = "";
_l.pbp_6_2 = "";
_l.pbp_6_3 = "";
_l.videoFormats = "Elenco dei formati video supportati: .mp4, .mkv, .mov, .avi, .wmv, .flv, .f4v, .3g2, .3gp, .mts, .m2ts, .mxf, .nut";
_l.videoSizeError = "Il file video selezionato supera il limite di 4 GB per video. Comprimilo o selezionane un altro.";
_l.videoSizeAtt = "Dimensione massima consentita del file: 4 GB.";
_l.videoFormatError = "Formato video non corretto";
_l.videoSelectError = "Nessun video selezionato";
_l.removevideoShareQuestion = "Il video caricato resta disponibile nella sezione video. Vuoi eliminare completamente il video?";
_l.removevideoShareQuestionDelete = "Elimina video";
_l.removevideoShareQuestionLeave = "No";
_l.importingVideo = "Caricamento del video in corso";
_l.importingVideoSuccess = "Video caricato. Puoi continuare con la pubblicazione";
_l.unableToAuthorizeConnection = "Impossibile autorizzare";
_l.unableToAuthorizeConnectionBody = "Purtroppo l'applicazione non riesce ad autenticare questo account sul server video. Riprova più tardi";
_l.download = "Scarica";
_l.videotranscodingwait = "Attendi, questo video è in fase di elaborazione. Potrebbe volerci un po' di tempo; dopo la transcodifica potrai pubblicarlo su "+appname+".";
_l.views = "Visualizzazioni";
_l.viewers = "Spettatori";
_l.saveshare = "Scarica video";
_l.gotosaved = "Vai ai download";
_l.successdownloaded = "Video scaricato";
_l.logoutaccount = "Esci dal tuo account";
_l.closeapplication = "Esci dall'applicazione";
_l.attachVideoLenta = "Allega video al post";
_l.attachVideoLentaShort = "Allega";
_l.linkToPostLenta = "Già pubblicato";
_l.ReferralUsers = "Utenti invitati. Totale/Dal&nbsp;01.11.2021";
_l.lockedaccount = "Il tuo account è stato bloccato a causa di segnalazioni degli utenti o di una decisione della giuria";
_l.lockedaccounta = "L'account dell'autore è stato bloccato a causa di segnalazioni degli utenti o di una decisione della giuria";
_l.lockedaccountacomment = "L'account dell'autore del commento è stato bloccato a causa di segnalazioni degli utenti o di una decisione della giuria";
_l.hiddenCommentLabel = "Il commento è nascosto a causa di una valutazione bassa o perché l'autore ha bloccato l'utente";
_l.blockedbymeHiddenCommentLabel = "Commento nascosto perché hai bloccato l'utente";
_l.hiddenCommentsLabel = "Commento nascosto a causa delle valutazioni basse di chi l'ha scritto";
_l.showhiddenComment = "Mostra";
_l.showhiddenPost = "Mostra post";
_l.visibletoeveryone = 'Visibile a tutti';
_l.visibleonlytosubscribers = 'Visibile solo agli iscritti';
_l.visibleonlytoregistered = "Visibile solo agli utenti di "+appname+"";
_l.sharevisibility_sub = 'Per gli iscritti';
_l.sharevisibility_reg = "Per gli utenti di "+appname+"";
_l.sharevisibilitylabel_sub_post = "L'autore ha scelto di rendere questo <b>post</b> disponibile solo per gli iscritti";
_l.sharevisibilitylabel_reg_post = "L'autore ha scelto di rendere questo <b>post</b> disponibile solo per gli utenti registrati di "+appname+"";
_l.sharevisibilitylabel_sub_article = "L'autore ha scelto di rendere questo <b>articolo</b> disponibile solo per gli iscritti";
_l.sharevisibilitylabel_reg_article = "L'autore ha scelto di rendere questo <b>articolo</b> disponibile solo per gli utenti registrati di "+appname+"";
_l.sharevisibilitylabel_sub_video = "L'autore ha scelto di rendere questo <b>video</b> disponibile solo per gli iscritti";
_l.sharevisibilitylabel_reg_video = "L'autore ha scelto di rendere questo <b>video</b> disponibile solo per gli utenti registrati di "+appname+"";
_l.topAuthors = 'Autori consigliati';
_l.recommendedPosts = 'Post consigliati';
_l.rating = "valutazione";
_l.setupVideoNodeGuide = 'Configura nodo video';
_l.subscribers3 = 'Iscritti';
_l.MainBoard = 'Opponiti alla censura e';
_l.MainBoard1 = 'ottieni l\'indipendenza finanziaria';
_l.MainBoard2 = 'Il primo protocollo di social network resistente alla censura';
_l.MainBoard3 = 'Basato sulla tecnologia blockchain, decentralizzato e sicuro.';
_l.MainBoard4 = 'Nessuna azienda, nessun server centralizzato, moderato dalla comunità ';
_l.MainBoard5 = 'Alimentato da Pocketcoin (PKOIN) per premiare creatori e collaboratori';
_l.MainBoard55 = 'Open source e regole trasparenti, uguali per tutti';
_l.MainBoard6 = 'Disponibile su';
_l.MainBoard7 = 'Google Play';
_l.MainBoard8 = 'Scarica per';
_l.works = 'Crediamo nella libertà';
_l.works1 = ""+appname+" è una rete innovativa in grado di aggirare le comuni tattiche di censura, come il blocco dei domini e l'espulsione dei blogger dissidenti";
_l.works2 = ""+appname+" è anche una piattaforma di condivisione video che, a differenza dei social media tradizionali e mainstream, ti garantisce privacy e libertà dalla censura arbitraria";
_l.works3 = ""+appname+" è anche un sistema finanziario privato e orientato alla libertà, basato su Pocketcoin (PKOIN), usato per promuovere contenuti e prodotti";
_l.works4 = 'Ci guida la LIBERTÀ';
_l.works5 = 'Non dipende da entità aziendali';
_l.works6 = 'Non dipende dalle banche per finanziamenti e operazioni';
_l.works7 = 'Non dipende da alcun dominio o sito web facilmente bloccabile';
_l.aboutServices = 'NESSUNA CENSURA';
_l.aboutServices1 = 'Resistente alla censura';
_l.aboutServices2 = ""+appname+" esiste su computer nodo decentralizzati in tutto il mondo, gestiti dagli utenti. Ogni nodo segue esattamente lo stesso insieme di regole trasparenti, impedendo a chiunque di bloccare arbitrariamente i contenuti. Nemmeno gli sviluppatori di "+appname+" possono bannare qualcuno: la piattaforma è moderata dagli utenti";
_l.aboutServices3 = "Nemmeno gli sviluppatori di "+appname+" possono bannare qualcuno: la piattaforma è moderata dagli utenti";
_l.aboutServices4 = 'Il Bitcoin dei social media';
_l.aboutServices5 = ""+appname+" funziona sulla blockchain e non dipende da alcun sito web o dominio. Finché da qualche parte nel mondo sono attivi alcuni nodi, la rete può funzionare e i creatori hanno accesso ai follower e gli utenti ai contenuti.";
_l.aboutServices6 = ""+appname+" è il “Bitcoin dei social media”";
_l.aboutServices7 = 'Protezione della privacy';
_l.aboutServices8 = "L'account "+appname+" non è legato alla tua identità o a un numero di telefono: è richiesta solo la verifica dell'email. Sono consentiti più account per proteggere la tua privacy. Nessun dato personale viene mai raccolto o memorizzato. "+appname+" offre anche un messenger crittografato peer-to-peer.";
_l.aboutServices9 = "La tua privacy è l'obiettivo principale di "+appname+". La tua chiave privata è nota solo a te e non può essere recuperata nemmeno dagli sviluppatori.";
_l.aboutServices10 = 'Inoltre, gli hacker non possono entrare nel tuo account e cambiare la tua password.';
_l.aboutServices11 = "Guadagna con "+appname+"";
_l.aboutServices12 = 'Puoi guadagnare 1.000 USD';
_l.aboutServices13 = 'Ci sono molti modi per monetizzare i tuoi contenuti con Pocketcoin (PKOIN). Guadagni PKOIN per i contenuti popolari e gli utenti possono allegare PKOIN ai commenti in evidenza. Un mercato pubblicitario decentralizzato, con il 100% dei ricavi destinato ai blogger, è previsto per dicembre 2021.  ';
_l.aboutServices14 = 'Carica i tuoi video';
_l.aboutServices15 = ""+appname+" ti permette di";
_l.aboutServices16 = 'condividere i tuoi post e video';
_l.aboutServices17 = ', caricarli in sicurezza, importarli da YouTube (contattaci e ti aiuteremo!) e fare in modo che restino visibili a tutti. Per sempre. Nessuno potrà rimuoverli o bloccarli.';
_l.aboutServices18 = 'Open source';
_l.aboutServices19 = 'Crediamo che';
_l.aboutServices20 = 'privacy e sicurezza';
_l.aboutServices21 = "debbano passare attraverso progetti open source. L'intero progetto è disponibile su GitHub, così puoi verificare che non ci siano backdoor e che "+appname+" non memorizzi alcun dato personale.";
_l.aboutNewBlock = "Come guadagnare con "+appname+"";
_l.aboutNewBlock1 = 'Contenuti popolari e commenti in evidenza ';
_l.aboutNewBlock2 = 'Guadagni PKOIN per i voti degli utenti attivi sulla piattaforma. Quindi, se porti il tuo pubblico, sarai protetto dalla censura e guadagnerai dalle sue interazioni con i tuoi contenuti. I tuoi follower possono anche aggiungere PKOIN ai loro commenti per metterli in evidenza sotto il tuo post: il 100% dei ricavi va a te, perché non c\'è nessuna azienda di mezzo.';
_l.aboutNewBlock3 = 'Programma bonus';
_l.aboutNewBlock4 = ""+appname+" ha un programma bonus a tempo limitato per i videoblogger, con 1.000 USD di guadagno ogni 15.000 visualizzazioni, 1000 utenti invitati e 1.250 interazioni. Il bonus viene pagato in Bitcoin o PKOIN, a scelta del blogger. Si tratta di un programma a tempo limitato.";
_l.aboutNewBlock5 = 'Pubblicità decentralizzata ';
_l.aboutNewBlock6 = 'Un mercato pubblicitario decentralizzato, previsto per dicembre 2021, consentirà agli inserzionisti di creare post e proporli ai blogger. Il blogger potrà esaminare il post pubblicitario e ricondividerlo se lo ritiene opportuno. Tutte le interazioni sul canale del blogger andranno direttamente al suo wallet: il 100% dei ricavi pubblicitari.';
_l.aboutOpen = "Scopri "+appname+"";
_l.aboutOpen1 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.aboutOpen2 = 'Sito ufficiale';
_l.aboutOpen3 = 'Contattaci';
_l.aboutOpen4 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.aboutOpen5 = 'Codice sorgente';
_l.aboutOpen5_1 = 'Scrivici a:';
_l.aboutMainBoard = ""+appname+", la migliore alternativa a Twitter. Lasciati alle spalle ban e sospensioni.";
_l.aboutYoutubeMainDescription1 = 'Alcuni ci chiedono:';
_l.aboutYoutubeMainDescription2 = "Perché dovrei usare "+appname+"?";
_l.aboutYoutubeMainDescription3 = 'La vera domanda è:';
_l.aboutYoutubeMainDescription4 = '"Perché dovresti usare YouTube?!"';
_l.aboutYoutubeMainDescription5 = 'YOUTUBE HA BANNATO E DEMONETIZZATO MIGLIAIA DI ACCOUNT';
_l.aboutYoutubeMainDescription6 = 'PERSONE CON CENTINAIA DI MIGLIAIA DI ISCRITTI';
_l.aboutYoutubeMainDescription7 = 'ANCHE QUANDO NON VENGONO BANNATI, GLI AUTORI SUBISCONO SHADOWBAN O DEMONETIZZAZIONE';
_l.aboutYoutubeThreeColumn1 = 'Immagina: un giorno hai 20.000, 100.000 o addirittura 1 milione di iscritti sul tuo canale YouTube.';
_l.aboutYoutubeThreeColumn2 = 'Il giorno dopo il tuo account non esiste più.';
_l.aboutYoutubeThreeColumn3 = 'Bannato, per sempre. Nessuna possibilità di ricorso.';
_l.aboutYoutubeThreeColumn4 = 'Sai, non hai perso solo i tuoi iscritti.';
_l.aboutYoutubeThreeColumn5 = 'Hai perso un reddito passivo costante generato dagli ANNUNCI sui tuoi video.';
_l.aboutYoutubeThreeColumn6 = 'Hai perso migliaia di persone che ti seguivano e condividevano i tuoi video.';
_l.aboutYoutubeThreeColumn7 = "Hai perso l'accesso ai tuoi video, se non avevi un backup.";
_l.aboutYoutubeThreeColumn8 = 'La cosa peggiore è che le decisioni di YouTube sono arbitrarie e di solito definitive';
_l.aboutYoutubeThreeColumn9 = 'La cosa peggiore è che le decisioni di YouTube sono di solito definitive.';
_l.aboutYoutubeThreeColumn10 = "Non hai alcun modo di riavere il tuo canale, i tuoi iscritti e i tuoi soldi. Sono spariti, per sempre.";
_l.aboutYoutubeThreeColumn11 = "Passa a "+appname+" prima che sia troppo tardi. Possiamo importare i tuoi video senza fatica";
_l.aboutYoutubeThreeColumn12 = 'Cosa aspetti?!';
_l.aboutYoutubeH3Section = "Costruire una comunità di follower su YouTube è come costruire una casa su un terreno che non ti appartiene.";
_l.aboutYoutubeImgAndText1 = "GUADAGNA CON "+appname+" SENZA DEMONETIZZAZIONE";
_l.aboutYoutubeImgAndText2 = ""+appname+" ti paga per pubblicare video e per ogni interazione (mi piace/commento) che ricevi.";
_l.aboutYoutubeImgAndText3 = 'E puoi parlare di argomenti "sensibili". Non verrai mai bloccato o demonetizzato, se non pubblichi pornografia/nudità o contenuti illegali, che saranno moderati dalla comunità. Inoltre, se porti i tuoi iscritti, ottieni anche i premi per gli inviti.';
_l.aboutYoutubeImgAndText4 = 'Zona di libertà di parola, moderata dalla comunità ';
_l.aboutYoutubeImgAndText5 = "Su "+appname+" puoi parlare di argomenti sensibili (che aumentano di giorno in giorno): COVID, politica, cambiamento climatico, libertà di parola e diritto alle armi. La comunità degli utenti modera "+appname+" e gli unici argomenti bloccati sono pornografia/nudità e contenuti illeciti.";
_l.aboutYoutubeImgAndText6 = 'Crediamo nella vera libertà di parola e la comunità degli utenti non blocca né modera i contenuti in base a divergenze di opinione. Inoltre, ' + appname + ' non appartiene a nessuna azienda ed è indipendente dal sistema bancario.';
_l.aboutYoutubeImgAndText7 = 'PRIVATO E SICURO';
_l.aboutYoutubeImgAndText8 = ""+appname+" non raccoglie alcuna informazione personale. Nessun nome, nessun numero di telefono, nessun indirizzo IP, nessuna identità. L'accesso al tuo account "+appname+" è la tua chiave privata: solo tu ne hai il controllo, nemmeno gli sviluppatori potrebbero accedervi o ripristinarla se la perdessi.";
_l.aboutYoutubeImgAndText9 = 'NESSUNA CENSURA';
_l.aboutYoutubeImgAndText10 = ""+appname+" non censurerà i tuoi video. Nemmeno gli amministratori possono bloccare il tuo account e bannarti. Il tuo account è TUO e i tuoi iscritti saranno sempre liberi di seguirti.";
_l.aboutYoutubeImgAndText11 = ""+appname+" si basa sulla blockchain: non c'è assolutamente modo di rimuovere account e video";
_l.aboutYoutubeImgAndText12 = 'Ogni video è registrato sulla blockchain e, per sua natura, non può essere rimosso. Da nessuno.';
_l.aboutYoutubeImgAndText13 = 'Ogni video che pubblichi resterà lì per sempre. Nessuno, davvero, può censurarlo. Nessuno può rimuovere i tuoi video, i tuoi iscritti e il tuo account.';
_l.aboutYoutubeImgAndText14 = 'Resistenza alla censura ';
_l.aboutYoutubeImgAndText15 = ""+appname+" funziona su una rete di nodi sui computer degli utenti. Anche se il sito principale "+appname+".com viene bloccato, la piattaforma continua a funzionare normalmente tramite l'app desktop. Poiché non c'è un'azienda, nessuno può imporre a "+appname+" una censura che gli utenti non vogliono.";
_l.aboutYoutubeImgAndText16 = ""+appname+" è un protocollo, non un'azienda né un social network";
_l.aboutYoutubeImgAndText17 = "A differenza di Facebook e dei principali social network, dietro "+appname+" non c'è alcuna azienda. È un progetto open source. Ciò significa che non esiste un'azienda in grado di controllare i contenuti pubblicati su "+appname+"";
_l.aboutYoutubeSecondBoard1 = ""+appname+": la migliore alternativa a YouTube";
_l.aboutYoutubeSecondBoard2 = 'I tuoi dati personali non vengono venduti ad aziende esterne';
_l.aboutYoutubeSecondBoard3 = 'Nessuno può bloccare il tuo account o rimuovere i tuoi video e iscritti';
_l.aboutYoutubeSecondBoard4 = 'Nessuna informazione personale degli utenti';
_l.aboutYoutubeSecondBoard5 = "L'accesso è sempre possibile da qualsiasi paese e regione del mondo, anche se il dominio non è raggiungibile.";
_l.aboutYoutubeSecondBoard6 = 'Mantieni i tuoi iscritti per sempre, sono tuoi';
_l.aboutYoutubeSecondBoard7 = ""+appname+" non rimuoverà i tuoi iscritti, i tuoi video e i tuoi soldi!";
_l.aboutYoutubeSecondBoard8 = 'Non verrai mai DEMONETIZZATO e manterrai il 100% dei ricavi pubblicitari. La libertà di parola è reale.';
_l.aboutYoutubeSecondBoard9 = 'Guadagnerai DI PIÙ pubblicando i tuoi video!';
_l.aboutYoutubeThirdBoard1 = "Proprietà dell'account";
_l.aboutYoutubeThirdBoard2 = 'Proprietà di YouTube.';
_l.aboutYoutubeThirdBoard3 = 'La tua chiave privata appartiene a te';
_l.aboutYoutubeThirdBoard4 = 'Censura';
_l.aboutYoutubeThirdBoard5 = 'Sì, censura selettiva e arbitraria';
_l.aboutYoutubeThirdBoard6 = 'La comunità modera i contenuti e solo pochi argomenti, come pornografia/nudità e contenuti illeciti, vengono moderati';
_l.aboutYoutubeThirdBoard7 = 'Codice open source';
_l.aboutYoutubeThirdBoard8 = 'NO.';
_l.aboutYoutubeThirdBoard9 = 'Sì, aperto a tutti';
_l.aboutYoutubeThirdBoard10 = 'Stesse regole per tutti';
_l.aboutYoutubeThirdBoard11 = 'Sì, basato su codice open source';
_l.aboutYoutubeThirdBoard12 = 'Monetizzazione';
_l.aboutYoutubeThirdBoard13 = 'YouTube condivide ciò che vuole';
_l.aboutYoutubeThirdBoard14 = '100% al blogger';
_l.aboutYoutubeThirdBoard15 = 'E se il dominio viene bloccato in qualche paese?';
_l.aboutYoutubeThirdBoard16 = 'YouTube inaccessibile';
_l.aboutYoutubeThirdBoard17 = ""+appname+" funziona direttamente con i nodi";
_l.aboutYoutubeThirdBoard18 = 'Segnalazione dei video';
_l.aboutYoutubeThirdBoard19 = 'SÌ, gli algoritmi di YouTube analizzano i video e li rimuovono o bloccano automaticamente se ritengono che violino le norme. Inoltre YouTube può rimuovere post e bannare utenti a sua esclusiva discrezione.';
_l.aboutYoutubeThirdBoard20 = "SÌ, ma solo gli utenti con alta reputazione possono segnalare un post, e un post diventa \"invisibile\" nel feed (pur restando disponibile nel profilo dell'utente) solo se diverse decine di utenti con alta reputazione lo segnalano (le segnalazioni sono possibili solo per razzismo, incitamento all'odio e pornografia/nudità).";
_l.aboutYoutubeThirdBoard21 = 'Hashtag per classificare i video';
_l.aboutYoutubeThirdBoard22 = 'I video possono essere condivisi su più piattaforme';
_l.aboutYoutubeThirdBoard23 = 'Ban in stile dittatura';
_l.aboutYoutubeThirdBoard24 = 'Decisamente troppi!';
_l.aboutYoutubeThirdBoard25 = ""+appname+" ti paga molto più di YouTube!";
_l.aboutYoutubeThirdBoard26 = "Puoi guadagnare con "+appname+".";
_l.aboutYoutubeThirdBoard27 = ""+appname+" usa una propria criptovaluta:";
_l.aboutYoutubeThirdBoard28 = 'Ogni volta che i tuoi post e video ricevono commenti e mi piace, ottieni PKOIN.';
_l.aboutYoutubeThirdBoard29 = '';
_l.aboutYoutubeThirdBoard30 = "Ogni volta che qualcuno si iscrive a "+appname+" con il tuo link di invito, ottieni PKOIN.";
_l.aboutYoutubeThirdBoard31 = 'Contattaci per saperne di più e attivare il tuo account come “CREATOR”, così potrai pubblicare video senza limiti ed essere pagato!';
_l.aboutYoutubeOpenBoard1 = "Scopri "+appname+"";
_l.aboutYoutubeOpenBoard2 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.aboutYoutubeOpenBoard3 = 'Sito ufficiale';
_l.sourceCode = 'Codice sorgente';
_l.aboutYoutubeDiscover1 = "Unisciti oggi a "+appname+" e prendi in mano il tuo destino!";
_l.aboutYoutubeDiscover2 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.aboutMainBoard1 = 'Social network libero, privato e sicuro';
_l.aboutTwitterMainDescriptionText1 = 'Alcuni ci chiedono:';
_l.aboutTwitterMainDescriptionText2 = "Perché dovrei usare "+appname+"?";
_l.aboutTwitterMainDescriptionText3 = 'La vera domanda è:';
_l.aboutTwitterMainDescriptionText4 = '"Perché dovresti usare Twitter?!"';
_l.aboutTwitterMainDescriptionText5 = 'TWITTER SI COMPORTA COME UN GOVERNO DITTATORIALE';
_l.aboutTwitterMainDescriptionText6 = "Sì, sappiamo che è un'affermazione forte.";
_l.aboutTwitterMainDescriptionText7 = 'Ma purtroppo è proprio quello che è successo su Twitter.';
_l.aboutTwitterThreeColumn1 = 'Molti, decisamente troppi account sono stati bannati negli ultimi anni. Alcuni senza alcun motivo.';
_l.aboutTwitterThreeColumn2 = 'Altri solo perché appartenevano a una specifica area politica (conservatrice)';
_l.aboutTwitterThreeColumn3 = 'Qui sotto trovi un breve elenco di account bannati o sospesi da Twitter, con il relativo motivo.';
_l.aboutTwitterThreeColumn4 = 'Puoi trarre le tue conclusioni: noterai facilmente come Twitter abbia bannato persone per vari motivi non specificati, per aver semplicemente detto che il leader dei talebani era a favore della sharia, o per aver sostenuto il movimento "Occupy" senza violare alcuna norma.';
_l.aboutTwitterThreeColumn5 = "Questo è il tipo di censura che non vogliamo su "+appname+", ed è proprio per questo che il protocollo è stato creato";
_l.aboutTitterBannedAcc1 = "Costruire una comunità su Twitter è come costruire una casa su un terreno che non ti appartiene.";
_l.aboutTitterBannedAcc2 = "Clicca qui per vedere l'elenco degli account bannati da Twitter nel 2019";
_l.aboutTitterBannedAcc3 = 'Account';
_l.aboutTitterBannedAcc4 = 'Wikipedia';
_l.aboutTitterBannedAcc5 = 'Persona/account';
_l.aboutTitterBannedAcc6 = 'Descrizione';
_l.aboutTitterBannedAcc7 = 'Data';
_l.aboutTitterBannedAcc8 = 'Durata';
_l.aboutTitterBannedAcc9 = 'Motivo della sospensione';
_l.aboutTitterBannedAcc10 = 'Follower al momento della sospensione';
_l.aboutTitterBannedAcc11 = '“Darren Mills” ';
_l.aboutTitterBannedAcc12 = 'Account legato alla Russia ';
_l.aboutTitterBannedAcc13 = '43285';
_l.aboutTitterBannedAcc14 = 'Permanente';
_l.aboutTitterBannedAcc15 = 'Smascherato come persona fittizia gestita da una fabbrica di troll russa.';
_l.aboutTitterH3Section1 = "Perché "+appname+"?";
_l.aboutTitterH3Section2 = 'NESSUN CONTROLLO GOVERNATIVO';
_l.aboutTitterH3Section3 = ""+appname+" funziona su una rete di nodi che nessun governo può bloccare o limitare. Anche se il sito principale "+appname+".com viene reso inaccessibile o compromesso, la piattaforma continua a funzionare normalmente. Nessun governo può imporre censure o limitazioni a "+appname+".";
_l.aboutTitterH3Section4 = 'PRIVATO E SICURO';
_l.aboutTitterH3Section5 = ""+appname+" non raccoglie alcuna informazione personale. Nessun indirizzo IP, nessuna email, nessun numero di telefono. Crediamo nella vera tutela della privacy e nella sicurezza dei dati.";
_l.aboutTitterImgAndText1 = 'NESSUNA CENSURA';
_l.aboutTitterImgAndText2 = ""+appname+" non censurerà i tuoi post e video. Nemmeno gli amministratori possono bloccare il tuo account e bannarti.";
_l.aboutTitterImgAndText3 = 'A differenza di Twitter, ' + appname + ' non applica metodi dittatoriali per rimuovere contenuti e utenti. Esiste un luuungo elenco di persone bannate da Twitter, temporaneamente o per sempre, per motivi futili o senza alcun motivo apparente.';
_l.aboutTitterImgAndText4 = "Su " + appname + " i ban sono semplicemente impossibili: si basa sulla blockchain e nessuno ha il potere di cancellarne un blocco. Ogni post resterà lì per sempre. Anche se un amministratore o un utente volesse bannare i tuoi post, non potrebbe mai farlo.";
_l.aboutTitterImgAndText5 = "La censura è impedita dalla tecnologia stessa. Anche se un giorno i creatori di "+appname+" volessero chiudere la piattaforma, i post resterebbero lì e il social network potrebbe essere ricreato dallo stesso punto in cui era stato lasciato.";
_l.aboutTitterImgAndText6 = "NESSUNA AZIENDA DIETRO "+appname+"";
_l.aboutTitterImgAndText7 = "A differenza di Twitter e dei principali social network, dietro "+appname+" non c'è alcuna azienda. È un progetto open source. Ciò significa che non esiste un'azienda in grado di controllare i contenuti pubblicati su "+appname+". Nessun ban, nessuna censura.";
_l.aboutTitterImgAndText8 = 'A differenza di Twitter...';
_l.aboutTitterImgAndText9 = 'Non verrai mai bloccato o bannato semplicemente per aver sostenuto le tue idee, religioni o movimenti senza danneggiare gli altri.';
_l.aboutTitterImgAndText10 = 'Nessuno può bloccare il tuo account o rimuovere i tuoi post';
_l.aboutTitterImgAndText11 = 'La privacy è totale e garantita';
_l.aboutTitterImgAndText12 = "L'accesso è sempre possibile da qualsiasi paese e regione del mondo";
_l.aboutTitterImgAndText13 = "Le chat sono completamente private e crittografate e nemmeno "+appname+" può accedervi. Nemmeno con un mandato del tribunale.";
_l.aboutTitterImgAndText14 = 'I tuoi post possono essere più lunghi';
_l.aboutTitterTable1 = 'TWITTER';
_l.aboutTitterTable2 = ""+appname+"";
_l.aboutTitterTable3 = "Proprietà dell'account";
_l.aboutTitterTable4 = 'Proprietà di Twitter';
_l.aboutTitterTable5 = 'La tua chiave privata appartiene a te';
_l.aboutTitterTable6 = 'Il tuo accesso al tuo pubblico';
_l.aboutTitterTable7 = 'Non tutti i tuoi follower vedono il tuo post: è la piattaforma a decidere quale parte del pubblico lo vede';
_l.aboutTitterTable8 = 'Ogni follower vede il tuo post';
_l.aboutTitterTable9 = 'Censura';
_l.aboutTitterTable10 = 'Sì, censura selettiva e arbitraria, molti shadowban';
_l.aboutTitterTable11 = 'La comunità modera i contenuti e solo pochi argomenti, come pornografia/nudità e contenuti illeciti, vengono moderati';
_l.aboutTitterTable12 = 'Codice open source ';
_l.aboutTitterTable13 = 'No';
_l.aboutTitterTable14 = 'Sì, aperto a tutti';
_l.aboutTitterTable15 = 'Stesse regole per tutti';
_l.aboutTitterTable16 = 'No';
_l.aboutTitterTable17 = 'Sì, basato su codice open source';
_l.aboutTitterTable18 = 'Monetizzazione';
_l.aboutTitterTable19 = 'Twitter condivide ciò che vuole';
_l.aboutTitterTable20 = '100% al blogger tramite PKOIN';
_l.aboutTitterTable21 = 'E se il dominio viene bloccato in qualche paese?';
_l.aboutTitterTable22 = 'Twitter inaccessibile';
_l.aboutTitterTable23 = ""+appname+" funziona direttamente con i nodi";
_l.aboutTitterTable24 = 'Messaggi personali';
_l.aboutTitterTable25 = 'Twitter può leggere ogni messaggio';
_l.aboutTitterTable26 = ""+appname+" usa la crittografia peer-to-peer per le chat private, nessuno può leggerle";
_l.aboutTitterTable27 = 'Criptovaluta interna per monetizzazione e pagamenti';
_l.aboutTitterTable28 = 'No';
_l.aboutTitterTable29 = 'Sì';
_l.aboutTitterTable30 = 'Possibilità di inviare criptovalute nei messaggi di chat';
_l.aboutTitterTable31 = 'No';
_l.aboutTitterTable32 = 'Sì';
_l.aboutTitterTable33 = 'Informazioni personali';
_l.aboutTitterTable34 = 'Nome, numero di telefono';
_l.aboutTitterTable35 = 'No';
_l.aboutTitterMainBoard31 = "E non è tutto! "+appname+" ti paga.";
_l.aboutTitterMainBoard32 = "Puoi guadagnare con "+appname+".";
_l.aboutTitterMainBoard33 = ""+appname+" usa una propria criptovaluta:";
_l.aboutTitterMainBoard34 = 'Ogni volta che i tuoi post e video ricevono commenti e mi piace, ottieni PKOIN.';
_l.aboutTitterMainBoard35 = '';
_l.aboutTitterMainBoard36 = "Ogni volta che qualcuno si iscrive a "+appname+" con il tuo link di invito, ottieni PKOIN.";
_l.aboutTitterMainBoard37 = 'Contattaci per saperne di più e attivare il tuo account come “CREATOR”, così potrai pubblicare video senza limiti ed essere pagato!';
_l.aboutTitterOpen1 = "Scopri "+appname+"";
_l.aboutTitterOpen2 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.aboutTitterOpen3 = 'Sito ufficiale';
_l.aboutTitterOpen4 = 'Codice sorgente';
_l.aboutTitterOpen5 = 'Contattaci';
_l.aboutTitterOpen6 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.aboutFbMainBoard = ""+appname+": la migliore alternativa a Facebook";
_l.aboutFbMainBoard1 = 'Protocollo sociale e finanziario';
_l.aboutFbMainDesc = ""+appname+" non è un'alternativa a Facebook.";
_l.aboutFbMainDesc1 = ""+appname+" è l'Anti-Facebook.";
_l.aboutFbMainDesc2 = '-- John Milton';
_l.aboutFbH3Section = "Perché "+appname+"?";
_l.aboutFbH3Section1 = 'NESSUN CONTROLLO GOVERNATIVO';
_l.aboutFbH3Section2 = ""+appname+" funziona su una rete di nodi che nessun governo può bloccare o limitare. Anche se il sito principale "+appname+".com viene reso inaccessibile o compromesso, la piattaforma continua a funzionare normalmente. Nessun governo può imporre censure o limitazioni a "+appname+".";
_l.aboutFbH3Section3 = 'PRIVATO E SICURO';
_l.aboutFbH3Section4 = ""+appname+" non raccoglie alcuna informazione personale. Nessun indirizzo IP, nessuna email, nessun numero di telefono. Crediamo nella vera tutela della privacy e nella sicurezza dei dati.";
_l.aboutFbImgAndText = 'NESSUNA CENSURA';
_l.aboutFbImgAndText2 = ""+appname+" non censurerà i tuoi post e video. Nemmeno gli amministratori possono bloccare il tuo account e bannarti.";
_l.aboutFbImgAndText3 = ""+appname+" si basa sulla blockchain: non c'è assolutamente modo di rimuovere i post. Ogni post è registrato sulla blockchain e, per sua natura, non può essere rimosso. Da nessuno.";
_l.aboutFbImgAndText4 = "Nessuna azienda dietro "+appname+"";
_l.aboutFbImgAndText5 = "A differenza di Facebook e dei principali social network, dietro "+appname+" non c'è alcuna azienda. È un progetto open source. Ciò significa che non esiste un'azienda in grado di controllare i contenuti pubblicati su "+appname+". Nessun ban, nessuna censura.";
_l.aboutFbImgAndText6 = 'A differenza di Facebook...';
_l.aboutFbImgAndText7 = 'I tuoi dati personali non vengono venduti ad aziende esterne';
_l.aboutFbImgAndText8 = 'Nessuna censura arbitraria';
_l.aboutFbImgAndText9 = 'Non raccoglie informazioni personali';
_l.aboutFbImgAndText10 = 'Nessuna azienda alle spalle';
_l.aboutFbImgAndText11 = "Le chat sono completamente private e crittografate e nemmeno "+appname+" può accedervi.";
_l.aboutFbImgAndText12 = 'Mark Zuckerberg non ti disturberà!';
_l.aboutFbTable = 'FACEBOOK';
_l.aboutFbTable1 = ""+appname+"";
_l.aboutFbTable2 = "Proprietà dell'account";
_l.aboutFbTable3 = 'Proprietà di Facebook ';
_l.aboutFbTable4 = 'La tua chiave privata appartiene a te';
_l.aboutFbTable5 = 'Il tuo accesso al tuo pubblico';
_l.aboutFbTable6 = 'Non tutti i tuoi follower vedono il tuo post: è Facebook a decidere quale parte del pubblico lo vede';
_l.aboutFbTable7 = 'Ogni follower vede il tuo post';
_l.aboutFbTable8 = 'Censura';
_l.aboutFbTable9 = 'Sì, censura selettiva e arbitraria';
_l.aboutFbTable10 = 'La comunità modera i contenuti e solo pochi argomenti, come pornografia/nudità e contenuti illeciti, vengono moderati';
_l.aboutFbTable11 = 'Codice open source ';
_l.aboutFbTable12 = 'No';
_l.aboutFbTable13 = 'Sì, aperto a tutti';
_l.aboutFbTable14 = 'Stesse regole per tutti';
_l.aboutFbTable15 = 'No';
_l.aboutFbTable16 = 'Sì, basato su codice open source';
_l.aboutFbTable17 = 'Monetizzazione';
_l.aboutFbTable18 = 'Facebook condivide ciò che vuole';
_l.aboutFbTable19 = '100% al blogger tramite PKOIN';
_l.aboutFbTable20 = 'E se il dominio viene bloccato in qualche paese?';
_l.aboutFbTable21 = 'Facebook inaccessibile';
_l.aboutFbTable22 = ""+appname+" funziona direttamente con i nodi";
_l.aboutFbTable23 = 'Messaggi personali';
_l.aboutFbTable24 = 'Facebook può leggere ogni messaggio';
_l.aboutFbTable25 = ""+appname+" usa la crittografia peer-to-peer per le chat private, nessuno può leggerle";
_l.aboutFbTable26 = 'Mark Zuckerberg';
_l.aboutFbTable27 = 'Sempre al tuo fianco';
_l.aboutFbTable28 = 'NO!';
_l.aboutFbTable29 = 'Criptovaluta interna per monetizzazione e pagamenti';
_l.aboutFbTable30 = 'No';
_l.aboutFbTable31 = 'Sì';
_l.aboutFbTable32 = 'Possibilità di inviare criptovalute nei messaggi di chat';
_l.aboutFbTable33 = 'No';
_l.aboutFbTable34 = 'Sì';
_l.aboutFbTable35 = 'Informazioni personali';
_l.aboutFbTable36 = 'Nome, numero di telefono';
_l.aboutFbTable37 = 'No';
_l.aboutFbMainBoard3 = "E non è tutto! "+appname+" ti paga.";
_l.aboutFbMainBoard31 = "Puoi guadagnare con "+appname+".";
_l.aboutFbMainBoard32 = ""+appname+" usa una propria criptovaluta:";
_l.aboutFbMainBoard33 = 'Ogni volta che i tuoi post e video ricevono commenti e mi piace, ottieni PKOIN.';
_l.aboutFbMainBoard34 = "Ogni volta che qualcuno si iscrive a "+appname+" con il tuo link di invito, ottieni PKOIN.";
_l.aboutFbMainBoard35 = 'Contattaci per saperne di più e attivare il tuo account come “CREATOR”, così potrai pubblicare video senza limiti ed essere pagato!';
_l.aboutFbOpen = "Scopri "+appname+"";
_l.aboutFbOpen1 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.aboutFbOpen2 = 'Sito ufficiale';
_l.aboutFbOpen3 = 'Codice sorgente';
_l.aboutFbOpen4 = 'Contattaci';
_l.aboutFbOpen5 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.aboutHowItWMainBoard = "COME RESISTE "+appname+" ALLA CENSURA?";
_l.aboutHowItWMainBoard1 = 'LIBERO, PRIVATO, SICURO E SENZA CONTROLLO AZIENDALE.';
_l.aboutHowItWMainBoard2 = "GODITI L'ARIA FRESCA DI "+appname+".";
_l.aboutHowItWMD = ""+appname+" è il Bitcoin dei social network.";
_l.aboutHowItWImgAndText = 'Basato sulla blockchain';
_l.aboutHowItWImgAndText1 = "Cos'è la blockchain?";
_l.aboutHowItWImgAndText2 = 'Come riporta Wikipedia, “una blockchain è un elenco crescente di registrazioni, chiamate blocchi, collegate tra loro tramite crittografia.';
_l.aboutHowItWImgAndText3 = 'È anche descritta come un “archivio di dati immutabile peer-to-peer, completamente decentralizzato e che non richiede fiducia”, distribuito su una rete di partecipanti spesso chiamati nodi. Ogni blocco contiene un hash crittografico del blocco precedente, una marca temporale e i dati delle transazioni.';
_l.aboutHowItWImgAndText4 = 'La marca temporale dimostra che i dati della transazione esistevano quando il blocco è stato pubblicato, così da entrare nel suo hash.';
_l.aboutHowItWImgAndText5 = 'Poiché ogni blocco contiene informazioni sul blocco precedente, i blocchi formano una catena, e ogni blocco aggiuntivo rafforza quelli precedenti.';
_l.aboutHowItWImgAndText6 = 'Pertanto, le blockchain sono resistenti alla modifica dei dati, perché una volta registrati, i dati di un blocco non possono essere alterati retroattivamente senza alterare tutti i blocchi successivi.”';
_l.aboutHowItWImgAndText7 = 'Quindi, come protegge la blockchain dalla censura?';
_l.aboutHowItWImgAndText8 = "Dai Bitcoin a "+appname+".";
_l.aboutHowItWImgAndText9 = 'La blockchain è la tecnologia alla base di tutte le criptovalute. Bitcoin, Ethereum, Dogecoin e così via funzionano tutte sulla blockchain.';
_l.aboutHowItWImgAndText10 = 'Il principio è semplice: ciò che accade sulla blockchain resta sulla blockchain. Per sempre.';
_l.aboutHowItWImgAndText11 = 'Tutti i blocchi esistenti della blockchain sono immutabili e permanenti. ';
_l.aboutHowItWImgAndText12 = 'Pensa alle criptovalute: quando invii dei Bitcoin (o una loro frazione) a qualcuno, la transazione viene registrata sulla blockchain.';
_l.aboutHowItWImgAndText13 = 'Da quel momento la transazione non può essere annullata, modificata, cambiata, rimossa, sospesa o alterata in nessuna sua parte. È lì e resta lì per sempre. E puoi esplorare i blocchi della blockchain per vedere tutte le transazioni.';
_l.aboutHowItWImgAndText14 = ""+appname+" funziona ESATTAMENTE allo stesso modo. Ogni post, ogni account, ogni video viene registrato sulla blockchain. E una volta lì, non può essere rimosso.";
_l.aboutHowItWImgAndText15 = "Infatti, "+appname+" funziona su un fork della blockchain originale di Bitcoin.";
_l.aboutHowItWImgAndText16 = 'Resistente alla censura';
_l.aboutHowItWImgAndText17 = 'Non solo la blockchain.';
_l.aboutHowItWImgAndText18 = ""+appname+" non appartiene a nessuna azienda";
_l.aboutHowItWImgAndText19 = ""+appname+" è un progetto open source";
_l.aboutHowItWImgAndText20 = ""+appname+" funziona su una rete di nodi decentralizzati; se usi l'app desktop di "+appname+", questa comunica direttamente con i nodi di tutto il mondo";
_l.aboutHowItWImgAndText21 = 'Inoltre, anche se un governo volesse rimuovere un post, sarebbe tecnicamente impossibile.';
_l.aboutHowItWImgAndText22 = "Allo stesso modo, poiché funziona su una rete di nodi, non c'è modo di limitare l'accesso a "+appname+". Anche se un governo bloccasse l'accesso al sito web, potrai sempre accedervi tramite l'app mobile o desktop, che si connette direttamente ai nodi.";
_l.aboutHowItWImgAndText23 = 'Protezione della privacy,';
_l.aboutHowItWImgAndText24 = 'per la tua sicurezza';
_l.aboutHowItWImgAndText25 = ""+appname+" non sa chi sei.";
_l.aboutHowItWImgAndText26 = ""+appname+" NON raccoglie alcuna informazione personale.";
_l.aboutHowItWImgAndText27 = ' Puoi registrarti senza rivelare il tuo numero di telefono (è richiesta solo l\'email)';
_l.aboutHowItWImgAndText28 = ""+appname+" non chiede il tuo vero nome, per proteggere il dissenso";
_l.aboutHowItWImgAndText29 = ""+appname+" non raccoglie indirizzi IP e non ti traccia";
_l.aboutHowItWImgAndText291 = ""+appname+" consente più account per scopi diversi";
_l.aboutHowItWImgAndText30 = ""+appname+" non saprà mai chi sei, a meno che tu non condivida esplicitamente i tuoi dati personali.";
_l.aboutHowItWImgAndText31 = 'Se non condividi i tuoi dati, nessuno – nessuna azienda, nessun governo – può sapere chi sei.';
_l.aboutHowItWImgAndText51 = 'Perché le criptovalute fanno bene alla libertà?';
_l.aboutHowItWImgAndText52 = "Alcuni pensano che la valuta digitale sia uno strumento di asservimento. Ironia della sorte, molte di queste persone hanno in tasca carte bancarie con microchip. Carte bancarie che tracciano ogni acquisto e sono legate direttamente alla tua identità. Le criptovalute fanno bene alla libertà perché non sono legate alla tua identità. Sia con Bitcoin che con Pocketcoin, ogni utente può creare milioni di indirizzi e cambiarli tutte le volte che è necessario.";
_l.HIVTable1 = 'Carte di credito';
_l.HIVTable2 = 'Contanti';
_l.HIVTable3 = 'Criptovaluta';
_l.HIVTable4 = 'Legato alla tua identità';
_l.HIVTable5 = 'Sì';
_l.HIVTable6 = 'No';
_l.HIVTable7 = 'No';
_l.HIVTable8 = "Il governo controlla l'offerta di moneta";
_l.HIVTable9 = 'Sì';
_l.HIVTable10 = 'Sì';
_l.HIVTable11 = 'No';
_l.HIVTable12 = 'Anonimato';
_l.HIVTable13 = 'Non anonimo';
_l.HIVTable14 = 'Anonimo';
_l.HIVTable15 = 'Pseudonimo';
_l.HIVTable16 = 'Facile da pagare a grandi distanze';
_l.HIVTable17 = 'Sì';
_l.HIVTable18 = 'No';
_l.HIVTable19 = 'Sì';
_l.HIVTable20 = 'Trasparente, aperto al pubblico';
_l.HIVTable21 = 'No';
_l.HIVTable22 = 'No';
_l.HIVTable23 = 'Sì';
_l.HIVTable24 = 'Si intendono criptovalute decentralizzate come Bitcoin o Pocketcoin';
_l.aboutHowItWImgAndText32 = 'E non è tutto!';
_l.aboutHowItWImgAndText33 = ""+appname+" ti paga";
_l.aboutHowItWImgAndText34 = "Puoi guadagnare con "+appname+".";
_l.aboutHowItWImgAndText35 = ""+appname+" usa una propria criptovaluta:";
_l.aboutHowItWImgAndText36 = 'Ogni volta che i tuoi post ricevono commenti e mi piace, ottieni PKOIN.';
_l.aboutHowItWImgAndText37 = '';
_l.aboutHowItWImgAndText38 = "Ogni volta che qualcuno si iscrive a "+appname+" con il tuo link di invito, ottieni PKOIN.";
_l.aboutHowItWImgAndText39 = 'Contattaci per saperne di più e attivare il tuo account come “CREATOR”, così potrai pubblicare video senza limiti ed essere pagato!';
_l.aboutHowItWImgAndText40 = "Prossimo passo: contattaci per far verificare il tuo account "+appname+" e accedere al programma bonus.";
_l.aboutHowItWImgAndText41 = 'Contattaci ora';
_l.aboutHowItWOpen = "Scopri "+appname+"";
_l.aboutHowItWOpen1 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.aboutHowItWOpen2 = 'Sito ufficiale';
_l.aboutHowItWOpen3 = 'Codice sorgente';
_l.aboutHowItWOpen4 = 'Contattaci';
_l.aboutHowItWOpen5 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.ContentCreatorsMainBoard = 'Un ottimo programma bonus per i creatori di contenuti';
_l.ContentCreatorsMainBoard1 = "Ci sono molti modi per guadagnare con "+appname+"...";
_l.ContentCreatorsImgAndText = 'Pubblica i tuoi video';
_l.ContentCreatorsImgAndText1 = "Pubblica i tuoi video su "+appname+"";
_l.ContentCreatorsImgAndText2 = '15.000 visualizzazioni, 1500 reazioni da utenti diversi e 1500 utenti invitati sul tuo canale';
_l.ContentCreatorsImgAndText3 = 'ti fanno guadagnare 1.000 $ pagati in Bitcoin o PKOIN';
_l.ContentCreatorsImgAndText4 = "Prossimo passo: contattaci per far verificare il tuo account "+appname+" e accedere al programma bonus.";
_l.ContentCreatorsImgAndText5 = 'Contattaci ora ';
_l.ContentCreatorsImgAndText6 = 'Invita i tuoi follower';
_l.ContentCreatorsImgAndText7 = 'Condividi il tuo link di invito personale';
_l.ContentCreatorsImgAndText8 = 'Invita i tuoi follower da altre piattaforme (YouTube, Instagram, Facebook, Twitter...)';
_l.ContentCreatorsImgAndText9 = 'Guadagna dai post dei tuoi follower!';
_l.ContentCreatorsImgAndText10 = 'Prossimo passo: contattaci per ottenere il badge "Verificato" e accedere al programma bonus.';
_l.ContentCreatorsImgAndText11 = 'Contattaci ora ';
_l.ContentCreatorsImgAndText12 = 'Guadagna da ogni post';
_l.ContentCreatorsImgAndText13 = 'Ogni volta che il tuo post riceve un mi piace o un commento, ottieni una piccola ricompensa';
_l.ContentCreatorsImgAndText14 = 'Più pubblichi, più guadagni';
_l.ContentCreatorsImgAndText15 = 'Più follower hai, più guadagni';
_l.ContentCreatorsImgAndText16 = 'Prossimo passo: contattaci per ottenere il badge "Verificato" e accedere al programma bonus.';
_l.ContentCreatorsImgAndText17 = 'Contattaci ora';
_l.ContentCreatorsImgAndText18 = 'Guadagna con la pubblicità decentralizzata';
_l.ContentCreatorsImgAndText19 = "Gli annunci ti arrivano tramite il mercato pubblicitario di "+appname+"";
_l.ContentCreatorsImgAndText20 = 'Puoi scegliere quali annunci ricondividere sul tuo canale';
_l.ContentCreatorsImgAndText21 = 'Il 100% dei ricavi pubblicitari dalle interazioni va al tuo wallet';
_l.ContentCreatorsImgAndText22 = 'Prossimo passo: contattaci per ottenere il badge "Verificato" e accedere al programma bonus.';
_l.ContentCreatorsImgAndText23 = 'Contattaci ora';
_l.ContentCreatorsImgAndText24 = 'Guadagna con i commenti in evidenza';
_l.ContentCreatorsImgAndText25 = 'I tuoi follower possono allegare PKOIN ai commenti';
_l.ContentCreatorsImgAndText26 = 'I commenti con PKOIN vengono messi in evidenza sotto il tuo post';
_l.ContentCreatorsImgAndText27 = 'Puoi citare i commenti in diretta incoraggiando gli utenti ad aggiungere PKOIN';
_l.ContentCreatorsImgAndText28 = 'Prossimo passo: contattaci per ottenere il badge "Verificato" e accedere al programma bonus.';
_l.ContentCreatorsImgAndText29 = 'Contattaci ora';
_l.ContentCreatorsOpen = "Scopri "+appname+"";
_l.ContentCreatorsOpen1 = "Puoi usare "+appname+" dal browser o scaricare l'app per dispositivi mobili e desktop.";
_l.ContentCreatorsOpen2 = 'Sito ufficiale';
_l.ContentCreatorsOpen3 = 'Codice sorgente';
_l.ContentCreatorsOpen4 = 'Contattaci';
_l.ContentCreatorsOpen5 = 'Scrivici se hai bisogno di aiuto o se sei un creatore di contenuti, blogger o influencer e vuoi sbloccare il tuo bonus e verificare il tuo profilo!';
_l.contentCreators = 'Per i creatori di contenuti';
_l.howItWorks = 'Come funziona';
_l.insteadOf = 'Invece di';
_l.alternativeTo = 'Alternativa a...';
_l.pkoin_commerce_tag_share_error = 'Il tag "pkoin_commerce" può essere usato solo come tag singolo. Un post con questo tag non può contenere video o immagini';
_l.pkoin_commerce_info = 'Le transazioni di PKOIN tra utenti non sono moderate e avvengono a tuo rischio.';
_l.buyforcrypto = 'Acquista con criptovalute';
_l.buywithcreditcard = 'Acquista con carta di credito';
_l.buylogo = 'Acquista Pocketcoin (PKOIN)';
_l.comment = 'Commento';
_l.sendToAuthor = "Invia all'autore";
_l.pkoinComment = 'Commento con PKOIN';
_l.liftUpThePost = 'Metti in evidenza il post';
_l.buypeertopeer = 'Acquista peer-to-peer';
_l.commentsOrder = 'Ordinamento predefinito dei commenti';
_l.commentsOrderPlaceholder = "Scegli l'ordinamento";
_l.comments_interesting = 'Prima i più interessanti';
_l.comments_timeup = 'Prima i più recenti';
_l.comments_time = 'Prima i meno recenti';
_l.comments_next = 'Mostra altri';
_l.create = 'Crea';
_l.drafts = 'Bozze';
_l.repostyourown = 'Non puoi ricondividere il tuo post';
_l.reachedlimits = 'Hai raggiunto il limite giornaliero di azioni. Per aumentarlo devi avere una reputazione valida.';
_l.closestreachedlimits = 'Stai per raggiungere il limite giornaliero di azioni. Per aumentarlo devi avere una reputazione valida.';
_l.sendUserStatistics = "Invia report anonimi degli errori al team di "+appname+"";
_l.captionUserStats = 'Statistiche';
_l.editarticledraft = "Modifica la bozza dell'articolo";
_l.deletearticledraft = "Elimina la bozza dell'articolo";
_l.previewarticledraft = "Visualizza la bozza dell'articolo";
_l.deletedraftquestion = "Vuoi davvero eliminare la bozza dell'articolo? Non sarà possibile recuperarla";
_l.publishquestion = 'Vuoi davvero pubblicare questo articolo?';
_l.etc = 'E così via...';
_l.openlinkssettings = "Non aprire i link nell'applicazione desktop";
_l.nametaken = "Questo nome utente è già in uso su "+appname+"";
_l.accountnotfound = "Non siamo riusciti a trovare il tuo account sulla blockchain. Forse la registrazione non è stata completata oppure manca la connessione a Internet";
_l.name20symbols = "Il nome non può superare i 20 caratteri";
_l.namereservedpn = "Per evitare confusione tra gli utenti, l'uso di Pocketnet nel nome è riservato";
_l.namereservedbn = "Per evitare confusione tra gli utenti, l'uso di "+appname+" nel nome è riservato";
_l.photohassizegreater = function(v){
    return "La tua foto supera i "+v+" MB. Carica una foto di dimensioni inferiori a "+v+" MB."
};
_l.invalidformat = "Formato dell'immagine non valido. Sono consentiti solo png e jpeg";
_l.downloadDesctApp = "Scarica "+appname+" per desktop";
_l.downloadMobileApp = "Installa l'app mobile";
_l.easyNode_learnPkoin = "Scopri di più su PKOIN";
_l.easyNode_e10000 = "Nodo";
_l.easyNode_e10001 = "Scarica e installa il nodo";
_l.easyNode_e10002 = "Nodo "+appname+"";
_l.easyNode_e10003 = "Caricamento";
_l.easyNode_e10004 = "Installazione del nodo";
_l.easyNode_e10005 = "Rimozione del nodo";
_l.easyNode_e10006 = "Requisiti di sistema";
_l.easyNode_e10007 = "La gestione del nodo non è ancora disponibile per il tuo sistema operativo";
_l.easyNode_e10008 = "Sincronizzazione";
_l.easyNode_e10009 = "Configurazione";
_l.easyNode_e10010 = "Attivo";
_l.easyNode_e10011 = "Percorso del daemon";
_l.easyNode_e10012 = "Percorso dei dati";
_l.easyNode_e10013 = "Ripristina i percorsi predefiniti";
_l.easyNode_e10014 = "Predefinito";
_l.easyNode_e10015 = "Aggiorna il nodo";
_l.easyNode_e10016 = "Nessun aggiornamento disponibile";
_l.easyNode_e10017 = "Elimina";
_l.easyNode_e10018 = "Elimina il daemon";
_l.easyNode_e10019 = "Elimina il daemon e i dati";
_l.easyNode_e10020 = "Wallet";
_l.easyNode_e10021 = "Stato";
_l.easyNode_e10022 = "Richiesta in corso...";
_l.easyNode_e10023 = "Staking";
_l.easyNode_e10024 = "Se hai già aggiunto PKOIN al nodo, attendi che l'altezza sia completamente sincronizzata";
_l.easyNode_e10025 = "Saldo";
_l.easyNode_e10026 = "Controllo";
_l.easyNode_e10027 = "Deposita";
_l.easyNode_e10028 = "Preleva";
_l.easyNode_e10029 = "Esporta wallet";
_l.easyNode_e10030 = "Importa wallet";
_l.easyNode_e10031 = "Attivo";
_l.easyNode_e10032 = "Versione";
_l.easyNode_e10033 = "Catena";
_l.easyNode_e10034 = "Descrizione";
_l.easyNode_e10035 = "Altezza";
_l.easyNode_e10036 = "Meno di un'ora rimanente";
_l.easyNode_e10037 = function(v) { return v + " ora/e rimanenti" };
_l.easyNode_e10038 = "Hash del blocco";
_l.easyNode_e10039 = "Disattiva il nodo";
_l.easyNode_e10040 = "Attiva il nodo";
_l.easyNode_e10041 = "Il tuo wallet è stato salvato in";
_l.easyNode_e10042 = "Il tuo wallet è stato importato";
_l.easyNode_e10043 = "Il nuovo indirizzo del tuo nodo";
_l.easyNode_e10044 = "Inserisci l'indirizzo e l'importo per trasferire PKOIN";
_l.easyNode_e10045 = "Indirizzo di destinazione";
_l.easyNode_e10046 = "Importo";
_l.easyNode_e10047 = "Argomenti non validi";
_l.easyNode_e10048 = 'Indirizzo di destinazione non valido';
_l.easyNode_e10049 = "Importo non valido";
_l.easyNode_e10050 = "Transazione creata";
_l.easyNode_e10051 = "Vuoi davvero arrestare il nodo e aggiornarlo?";
_l.easyNode_e10052 = "Assicurati di aver fatto un backup del wallet. Vuoi davvero eliminare il nodo e la cartella dei dati?";
_l.easyNode_e10053 = "Vuoi davvero rimuovere il daemon del nodo?";
_l.easyNode_e10054 = "Vuoi davvero installare il nodo?";
_l.easyNode_e10055 = "Vuoi davvero ripristinare il percorso dei dati predefinito?";
_l.easyNode_e10056 = "GB di RAM libera";
_l.easyNode_e10058 = "GB di spazio libero su disco";
_l.easyNode_e10059 = "Mb/s di velocità Internet";
_l.easyNode_e10060 = "Unità SSD";
_l.easyNode_e10061 = "Il tuo nodo è in esecuzione. Chiudere comunque l'app?";
_l.easyNode_e10062 = "È disponibile un aggiornamento del nodo. Scaricare la nuova versione?";
_l.easyNode_e10063 = "Il nodo è stato aggiornato correttamente";
_l.easyNode_e10064 = "Supporto";
_l.easyNode_e10065 = "Esporta il tuo wallet e conservalo in un luogo sicuro prima di ricaricare il saldo!";
_l.IHave = "Ho";
_l.downloadNode = "Scarica il nodo desktop per Windows";
_l.months = "Mesi";
_l.year = "Anno";
_l.stakingCalculator = "Calcolatore di staking: calcola quanto guadagni mettendo Pocketcoin (PKOIN) in un nodo.";
_l.easyNode_e2000 = "Difendi la libertà di parola e ";
_l.easyNode_e2000_1 = "guadagna";
_l.easyNode_e2000_2 = " criptovaluta";
_l.easyNode_e2001 = "Cos'è Pocketcoin? Pocketcoin è una criptovaluta che alimenta la piattaforma social decentralizzata "+appname+". Viene usata per premiare i creatori di contenuti, mettere in evidenza post e commenti, pagare la pubblicità e sbloccare funzionalità speciali su "+appname+".";
_l.easyNode_e2002 = "Cos'è un nodo? Un nodo è un computer di proprietà di un qualsiasi utente di "+appname+" che supporta la rete e";
_l.easyNode_e2002_1 = " guadagna ";
_l.easyNode_e2002_2 = "Pocketcoin. Il tuo computer può essere uno di questi nodi, a patto che tu abbia almeno 50 GB di spazio libero su SSD e una connessione Internet decente. Il nodo deve bloccare alcuni Pocketcoin per";
_l.easyNode_e2002_2_1 = " guadagnare ";
_l.easyNode_e2002_2_2 = "altri Pocketcoin. Nel mondo delle criptovalute questo si chiama staking.";
_l.minPkoin = function (p){
	return  "Minimo " + String(p) + " PKOIN"
};
_l.maxPkoin = function (p){
	return  "Massimo " + String(p) + " PKOIN"
};
_l.topPosts = "Post top";
_l.videop2psettings = "Usa il p2p durante la visione dei video";
_l.art_validatetags = "Aggiungi dei tag al tuo articolo lungo";
_l.art_validatecover = "Aggiungi una copertina al tuo articolo lungo";
_l.art_validatecaption = "Aggiungi un titolo al tuo articolo lungo";
_l.art_validatecontent = "Aggiungi il contenuto del tuo articolo lungo";
_l.art_nothingchange = "Nessuna modifica";
_l.art_newarticle = "Nuovo articolo lungo";
_l.art_myarticles = "I miei articoli lunghi";
_l.art_changecover = "Carica copertina";
_l.art_removecover = "Rimuovi copertina";
_l.art_publish = "Pubblica";
_l.art_editing = "Modifica";
_l.art_draftsaved = "Bozza salvata";
_l.art_gotolastdraft = "vai all'ultima bozza";
_l.art_categoriestags = "Categorie e tag";
_l.art_preview = "Anteprima";
_l.art_caption = "Titolo del nuovo articolo lungo";
_l.art_placeholder = "Scriviamo una storia fantastica!";
_l.art_newarticlecreation = "Crea un nuovo articolo lungo";
_l.art_editingsh = "Modifica di un articolo lungo pubblicato";
_l.art_saveedited = "Salva";
_l.art_wordscount = "Numero di parole";
_l.art_volumepercent = "Limite di dimensione dell'articolo";
_l.art_goback = "Torna indietro";
_l.downloadingUpdate = "Download dell'aggiornamento";
_l.hasnotupdates = "Nessun aggiornamento disponibile";
_l.cantmanageupdate = "Impossibile gestire l'aggiornamento";
_l.updateapplication = "Aggiorna l'applicazione";
_l.applicationversion = "Versione dell'applicazione";
_l.installedusinggps = "L'applicazione non è stata installata tramite Google Play.";
_l.downloadplaystore = "Scarica da Google Play";
_l.downloadgithub = "Scarica APK";
_l.reputation = "Reputazione";
_l.subscriptions = "Iscrizioni";
_l.tothetop = "Torna su";
_l.menu = "Menu";
_l.donotshowagain = "Non mostrare più";
_l.postby = "Post di";
_l.continueon = "Continua su";
_l.bestwishes = "Cordiali saluti,";
_l.ratings123 = "Solo gli utenti con alta reputazione e almeno 10 pubblicazioni nel feed possono dare valutazioni da 1, 2 o 3 stelle, commentare e dare valutazioni negative ai commenti. Questo serve a proteggere gli autori, perché "+appname+" NON richiede alcuna informazione personale per la registrazione.";
_l.ratingss3 = "Solo gli utenti con alta reputazione possono dare valutazioni da 1, 2 o 3 stelle. Questo serve a proteggere gli autori, perché "+appname+" NON richiede alcuna informazione personale per la registrazione.";
_l.clearfilters = "Cancella filtri";
_l.installedApps = "Installate";
_l.installedBadge = "Installata";
_l.clearcategories = "Vuoi davvero cancellare i filtri per categoria?";
_l.cleartags = "Vuoi davvero cancellare i filtri per tag?";
_l.fromsh = "Da";
_l.hodoiearnmore = "Come guadagno più Pocketcoin?";
_l.removeaddress = "Vuoi davvero rimuovere questo indirizzo da questo dispositivo?";
_l.wanttoseekey = "Vuoi davvero vedere la tua chiave privata?";
_l.seeprivatekey = "Mostra chiave privata";
_l.max5acc = "Hai raggiunto il massimo di 5 account. Non è possibile aggiungerne altri";
_l.longreads = "Articoli lunghi";
_l.readarticle = "Leggi";
_l.filters = "Filtri";
_l.dataenteredincorrectly = "Dati inseriti in modo errato";
_l.lloadprevwithtags = "Aggiorna il feed";
_l.newRepost = "Ricondividi";
_l.writesupport = "Scrivi al supporto";
_l.submitapplication = "Invia la tua richiesta";
_l.submitapplicationVideo = "Richiedi PKOIN per il video";
_l.submitapplicationVideoSmall = "Invia e richiedi PKOIN";
_l.videobloggerRequest = "Se sei un blogger con un pubblico consolidato, puoi ricevere in regalo dei PKOIN per caricare video";
_l.videobloggerRequest_pl1 = "Link al canale esistente 1";
_l.videobloggerRequest_pl2 = "Link al canale esistente 2";
_l.videobloggerRequest_pl3 = "Link al canale esistente 3";
_l.videobloggerRequest_pl_notes = "Note: eventuali informazioni aggiuntive";
_l.videobloggerRequest_pl_email = "Email di contatto";
_l.videobloggerRequest_caption = "Compila questo modulo per ricevere PKOIN";
_l.videobloggerRequest_er_link = "Fornisci almeno un link a un canale esistente";
_l.videobloggerRequest_er_info = "Sono richieste informazioni aggiuntive";
_l.videobloggerRequest_er_email = "Lascia un'email per ricevere una risposta";
_l.videobloggerRequest_submitted = "Grazie per averci contattato, esamineremo la tua richiesta";
_l.canuseipsetting = "Consenti la connessione diretta tramite IP su http. Connessione non sicura";
_l.optimizationtip = function(v){
    return v + ' post visti nascosti'
};
_l.optimizationtip_show = "Mostra";
_l.thankTheAuthor = "Ringrazia l'autore";
_l.encourageAuthor = "Sostieni l'autore";
_l.gotoProfile2 = "Vai al profilo";
_l.countviews = "Visualizzazioni";
_l.countview = "Visualizzazione";
_l.popup_applications_header = "Importante! Scarica l'applicazione "+appname+"";
_l.popup_applications_feature_1 = "L'applicazione desktop è il modo più resistente alla censura per usare "+appname+"";
_l.popup_applications_feature_2 = "L'applicazione desktop non dipende da "+appname+".com";
_l.popup_applications_feature_3 = "L'app desktop è come una VPN integrata";
_l.popup_applications_button = " Scaricala qui";
_l.norecommendedvideos = "Nessun video consigliato trovato";
_l.boosted = "Potenziato";
_l.probability = "Probabilità";
_l.probabilitytext = function(lang){
	return "Probabilità che un post compaia tra i primi <b>30</b> post del feed in lingua <b>"+lang+"</b> per circa <b>1</b> giorno"
};
_l.probabilitytexterror = "Impossibile calcolare la probabilità di promozione";
_l.reachtexterror = "Impossibile calcolare la copertura";
_l.image = "Immagine";
_l.file = "File";
_l.othervideos = "Altri video";
_l.starssendcomments = "Lascia un commento all'autore";
_l.starssendcommentn = "Lascia un commento all'autore";
_l.starssendcommentp = "Lascia un commento all'autore";
_l.savevideo = "Scarica video";
_l.useanimations = "Attiva le animazioni";
_l.welcomecaption1 = ""+appname+" della libertà di parola";
_l.welcomecaption2 = "Leggi i contenuti censurati dalle Big Tech";
_l.welcomecaption3 = "Chatta in privato con gli amici, senza SIM";
_l.shareexternal = "È aperta un'altra finestra";
_l.shareexternaluploadpeertube = "La finestra di caricamento dei media è aperta";
_l.removeimageswhenvideo = "Le immagini allegate al post verranno eliminate se continui a caricare il video. Passare al caricamento del video?";
_l.lowstar_reason_5 = "Contenuto protetto da copyright";
_l.lowstar_reason_6 = "Spam";
_l.lowstar3 = "Se dai 1 o 2 stelle per motivi diversi da quelli elencati sopra, dopo il rilascio dell'algoritmo di moderazione i membri della giuria ti toglieranno definitivamente l'anzianità dell'account.";
_l.usetor = "Connessione tramite la rete Tor";
_l.torHintStateEnabled = "Stato della rete Tor: attiva";
_l.torHintStateDisabled = "Stato della rete Tor: disattivata";
_l.torHintStateLoading = "Stato della rete Tor: caricamento";
_l.videotranscodingdelayedpost = "Questo video è in fase di elaborazione e verrà pubblicato non appena terminerà la transcodifica. Non chiudere la scheda fino ad allora.";
_l.postInRelay = "Questo post è in elaborazione prima della pubblicazione sulla blockchain";
_l.continuesubscribefeedCaption = "Vuoi continuare a vedere i post delle persone che segui?";
_l.continuesubscribefeedButton = "Continua nel feed delle iscrizioni";
_l['dust (code 64)'] = "Stai cercando di inviare un importo troppo piccolo, non è possibile";
_l.videoNameIsIncorrectShort = "Il nome del video deve contenere almeno 3 caratteri";
_l.videoNameIsIncorrectLong = "Il nome del video non deve superare i 120 caratteri";
_l.recommended = 'Consigliati';
_l.removeaccount = 'Elimina account';
_l.removeAccountQuestion = "Vuoi davvero eliminare definitivamente il tuo account? L'azione non può essere annullata.";
_l.removeAccountYes = "Sì, elimina l'account";
_l.removeAccount_prepare = 'Preparazione';
_l.removeAccount_removePeertube = 'Eliminazione dei dati dai server video';
_l.removeAccount_removeMatrix = 'Eliminazione dei dati dal server di chat';
_l.removeAccount_removeBB = "Rimozione dell'account dalla blockchain";
_l.removeAccount_finish = 'Completato';
_l.removeAccount_success = "L'eliminazione del tuo account è riuscita. La procedura dovrebbe completarsi entro 10 minuti.";
_l.removeAccount_notprepared = "Account non trovato sulla blockchain, potrebbe essere necessario attendere un po'";
_l.removeAccount_balance = "In questa situazione non è possibile eliminare l'account. Per eseguire l'azione devi avere un saldo minimo di PKOIN";
_l.removeAccount_undefinedError = "Si è verificato un errore imprevisto durante l'eliminazione dell'account. Riavvia l'app e riprova";
_l.deletedAccount_temp = "L'account è in fase di eliminazione";
_l.deletedAccount_deleted = "Account eliminato";
_l.deletedAccount_true = "Account eliminato";
_l.deletedAccountName = "Account eliminato";
_l.utipdeleted = "Il tuo account è stato eliminato. Puoi usare solo il wallet";
_l.applydonate = "Applica";
_l.imagegallery = "Galleria immagini";
_l.useselected = "Usa selezionate";
_l.pkoindisabledisclaimer = "Nell'applicazione puoi solo ricevere denaro su un wallet crypto, ma non potrai inviarlo";
_l.txbase_total = _l.txbase_unspents = _l.txbase_err_money = 'Fondi insufficienti per il trasferimento, tenendo conto della commissione';
_l.recommendations_menu_caption = 'Informazioni sui consigli';
_l.recommendations_caption_tags = 'Consigli basati sui tag';
_l.recommendations_caption_users = 'Consigli basati sulle interazioni con altri utenti';
_l.recommendations_caption_disclamer = "Le statistiche sono memorizzate solo sul tuo dispositivo, non vengono inviate ai server di "+appname+" né trasferite a terzi";
_l.recommendations_tags_table_caption = "Tag, probabilità, punti, data dell'ultima interazione";
_l.recommendations_tags_completed_caption = 'Consigli richiesti';
_l.recommendations_tags_anotherShares = 'Altre pubblicazioni consigliate in base a questi tag';
_l.addAccessToLibrary = "Consenti l'accesso alla galleria";
_l.cameranotavailable = 'Fotocamera non disponibile';
_l.photolibrarylimited = 'Hai concesso un accesso limitato alle tue foto.';
_l.photolibrarymanage = 'Seleziona altre foto';
_l.photolibrarylimitedempty = 'Non hai ancora selezionato alcuna foto';
_l.photolibraryempty = 'Non ci sono foto nella tua galleria';
_l.rtip4 = 'Questa chiave è la tua password! Non perderla.';
_l.removecategory = 'Rimuovi';
_l.removecategoryQestion = 'Vuoi davvero rimuovere questa categoria?';
_l.searchbytext = "Cerca per testo:";
_l.searchbytags = "Cerca per tag:";
_l.boost_c1 = 'Fai pubblicità con PKOIN e ottieni oggi stesso contatti per il tuo progetto crypto';
_l.boost_c2 = 'Web 2.0';
_l.boost_c3 = ""+appname+" Web 3.0";
_l.boost_c4 = 'Stai cercando di farti sentire su Internet?';
_l.boost_c5 = 'Vorresti presentare i tuoi contenuti o prodotti a un pubblico nuovo e dinamico spendendo meno che sui grandi network pubblicitari?';
_l.boost_c6 = ""+appname+", il social network basato su blockchain, ha appena lanciato un modo per promuovere i contenuti, compresi i video.";
_l.boost_c7 = "Il costo di un'impressione su "+appname+" è molte volte inferiore rispetto ai network pubblicitari tradizionali.";
_l.boost_c8 = "Potenziare i post su "+appname+" è semplicissimo: ti bastano un po' di Pocketcoin, la criptovaluta nativa di "+appname+". Clicca su Boost sotto il post, inserisci l'importo e il tuo post salirà in cima!";
_l.boost_c9 = ""+appname+" ha milioni di visitatori ed è in crescita. I tuoi contenuti saranno visti!";
_l.boost_c10 = "Se sei un autore emergente che vuole ampliare il proprio pubblico, il potenziamento dei post su "+appname+" può fare al caso tuo!";
_l.boost_c11 = "Se sei un inserzionista in cerca di una piattaforma per promuovere il tuo prodotto, puoi avviare rapidamente il tuo annuncio e ottenere conversioni.";
_l.boost_c12 = 'Open source';
_l.boost_c13 = 'Carica i tuoi video';
_l.boost_c14 = "Guadagna con "+appname+"";
_l.boost_c15 = 'Protezione della privacy';
_l.boost_c16 = 'Il Bitcoin dei social media';
_l.boost_c17 = 'Resistente alla censura';
_l.boost_c18 = 'Acquistare PKOIN peer-to-peer';
_l.boost_c19 = 'Per acquistare Pocketcoin "di mano in mano", devi ordinare il feed per la categoria "PKOIN/peer-to-peer"';
_l.boost_c20 = 'CPM incredibilmente basso:';
_l.boost_c21 = ' il costo per mille impressioni è di 28 centesimi!';
_l.boost_c22 = 'Pubblicità in Pocketcoin: copertura conveniente';
_l.boost_c23 = 'Stai cercando di farti sentire su Internet?';
_l.boost_c24 = 'Vorresti presentare i tuoi contenuti o prodotti a un pubblico nuovo e dinamico spendendo meno che sui grandi network pubblicitari?';
_l.boost_c25 = ""+appname+", il social network basato su blockchain, ha appena lanciato un modo per promuovere i contenuti, compresi i video.";
_l.boost_c26 = "Il costo di un'impressione su "+appname+" è molte volte inferiore rispetto ai network pubblicitari tradizionali.";
_l.boost_c27 = "Potenziare i post su "+appname+" è semplicissimo: ti bastano un po' di Pocketcoin, la criptovaluta nativa di "+appname+". Clicca su Boost sotto il post, inserisci l'importo e il tuo post salirà in cima!";
_l.boost_c28 = ""+appname+" ha milioni di visitatori ed è in crescita. I tuoi contenuti saranno visti!";
_l.boost_c29 = "Se sei un autore emergente che vuole ampliare il proprio pubblico, il potenziamento dei post su "+appname+" può fare al caso tuo!";
_l.boost_c30 = "Se sei un inserzionista in cerca di una piattaforma per promuovere il tuo prodotto, puoi avviare rapidamente il tuo annuncio e ottenere conversioni.";
_l.boost_c31 = 'Dove acquistare PKOIN?';
_l.boost_c32 = 'PKOIN può essere acquistato sui seguenti siti.';
_l.boost_c33 = '- qui puoi acquistare PKOIN con altre criptovalute.';
_l.boost_c45 = 'CPM incredibilmente basso';
_l.boost_c34 = "Acquistare PKOIN peer-to-peer su "+appname+"";
_l.boost_c35 = "È possibile acquistare PKOIN da altri utenti di "+appname+". Puoi concordare le condizioni di acquisto/vendita in una conversazione privata con il venditore/acquirente, che trovi nel feed nella categoria 'PKOIN/peer-to-peer'";
_l.boost_c36 = 'Come inizio a fare pubblicità?';
_l.boost_c37 = "Avviare annunci su "+appname+" è semplicissimo. Per farlo devi:";
_l.boost_c38 = 'Preparare una pubblicazione pubblicitaria (video, post o articolo)';
_l.boost_c39 = 'Acquistare PKOIN';
_l.boost_c40 = "Depositare l'importo di PKOIN necessario per avviare la pubblicità";
_l.boost_c41 = "Cliccare sull'icona del fulmine nell'angolo in basso a destra del post selezionato:";
_l.boost_c42 = 'Inserire i PKOIN nel campo "Importo" e cliccare su "Invia":';
_l.boost_c43 = "Congratulazioni! Hai avviato un annuncio su "+appname+"!";
_l.boost_c44 = "Voglio avviare un annuncio su "+appname+"!";
_l.boost_c44_subject = "Ciao, vorrei saperne di più su come avviare i miei annunci su "+appname+".";
_l.reach = 'Copertura';
_l.reachAudience = "Pubblico approssimativo basato sulle statistiche su "+appname+" di Semrush.com e Github.com";
_l.reachDescription = 'Il costo medio per mille impressioni (CPM) è di 28 centesimi';
_l.boost_c46 = 'Il costo per mille impressioni è di 28 centesimi!';
_l.boost_c47 = '(il CPM medio dei grandi network supera 1 $)';
_l.boost_c48 = '(Come si calcola?)';
_l.boost_c49 = ""+appname+" ha circa 1,68 MILIONI di visitatori unici al mese. Il visitatore medio accede 5 volte al mese e il feed in inglese rappresenta il 10% di "+appname+", quindi il NUMERO TOTALE DI VISITE MENSILI = 	840.000";
_l.boost_c50 = "PASSAGGI PER CALCOLARE IL CPM SU "+appname+"";
_l.boost_c51 = "*Ci sono in TOTALE 1,68 MILIONI di visitatori unici al mese (1,4 M su "+appname+".com, 130.000 su Android, 100.000 sull'app desktop)";
_l.boost_c52 = 'PASSO 1.';
_l.boost_c53 = "1,4 M su "+appname+".com (dati SEMRUSH)";
_l.boost_c54 = 'PASSO 2.';
_l.boost_c55 = 'Il numero di utenti Android attivi è superiore a 130.000';
_l.boost_c56 = 'PASSO 3.';
_l.boost_c57 = "Il numero di utenti dell'app desktop è superiore a 150.000";
_l.boost_c58 = "(Dopo ogni aggiornamento gli utenti aggiornano gradualmente l'app desktop; circa la metà lo fa entro una settimana)";
_l.boost_c59 = "*questa schermata mostra che 76.000 utenti hanno aggiornato l'app già il primo giorno; solo la metà delle persone aggiorna così in fretta, quindi il numero reale è di circa 150.000 utenti";
_l.boost_c60 = 'PASSO 4.';
_l.boost_c61 = 'Calcolare il CPM';
_l.boost_c62 = 'Ogni annuncio potenziato dura 3 ore. Dividiamo quindi le visite mensili totali per 30 giorni e per 8 per ottenere intervalli di 3 ore';
_l.boost_c63 = 'Visite mensili totali = 8,4 milioni';
_l.boost_c64 = 'Visite giornaliere totali = 28.000';
_l.boost_c65 = 'Il feed in inglese ha il 10% di tutti i visitatori';
_l.boost_c66 = 'Visite totali in un intervallo di 3 ore = 28.000/8 = 3500 ';
_l.boost_c67 = 'Il costo medio di un annuncio è di 1 $ ';
_l.boost_c68 = 'CPM = 0,28 $';
_l.boost_c69 = '28 centesimi in media è un CPM molto basso';
_l.boost_c70 = ""+appname+" è un social network decentralizzato nuovo e in rapida crescita, con milioni di utenti e una pubblicità estremamente redditizia";
_l.boost_c71 = 'Distribuzione per paese';
_l.boost_c72 = 'Condizione lavorativa';
_l.boost_c73 = 'Pubblico';
_l.howtobuy_c1 = 'Come acquistare';
_l.howtobuy_c2 = 'PKOIN';
_l.howtobuy_c3 = 'Exchange di criptovalute';
_l.howtobuy_c4 = 'Acquisto con Visa/Mastercard';
_l.howtobuy_c5 = 'Acquistare PKOIN con criptovalute';
_l.howtobuy_c6 = "Acquistare PKOIN peer-to-peer su "+appname+"";
_l.howtobuy_c7 = 'Acquisto con carte in Russia/Ucraina/Bielorussia';
_l.howtobuy_c8 = "Poi scegli un profilo adatto che offra l'acquisto/vendita di PKOIN. Fai attenzione quando acquisti di mano in mano. Guarda le recensioni e non trattare grandi importi.";
_l.howtobuy_c9 = 'Poi vai nella chat e concorda le condizioni dello scambio';
_l.howtobuy_c10 = 'Trova venditori peer-to-peer';
_l.howtobuy_c11 = '(escluse le carte della Federazione Russa)';
_l.howtobuy_c12 = '';
_l.howtobuy_c13 = '';
_l.howtobuy_c14 = '';
_l.howtobuy_c15 = '';
_l.howtobuy_c16 = '';
_l.howtobuy_c17 = '';
_l.howtobuy_c18 = '';
_l.howtobuy_c19 = '';
_l.howtobuy_c20 = '';
_l.gotopage = 'Vai alla pagina';
_l.postedVideos = "Video pubblicati";
_l.unPostedVideos = "Video non pubblicati";
_l.videoIsPosting = "Pubblicazione in corso";
_l.noUnposted = "Nessun video non pubblicato";
_l.sortByComments = "Commenti";
_l.sortByRating = "Numero di valutazioni";
_l.noPosted = "Nessun video pubblicato";
_l.unpostedFooter = "I video non pubblicati vengono eliminati dal server dopo 3 settimane di attesa";
_l.diagnosticsPage = "Diagnostica";
_l.startDiagnose = "Avvia diagnostica";
_l.videoServerName = "URL del server";
_l.videoServerReachable = "Raggiungibilità";
_l.serversTestingProgress = "Avanzamento della diagnostica:";
_l.videoServerVideo = "Informazioni sul video";
_l.goToDiagnose = "Vai alla diagnostica";
_l.connectingTo = "Connessione a";
_l.earnings = "Guadagni totali";
_l.earnings2 = "Guadagni totali";
_l.amountLottery = "Ricevuto dalla lotteria della blockchain";
_l.amountDonation = "Donazioni ricevute";
_l.amountTransfer = "Trasferimenti effettuati";
_l.endedCall = "Chiamata terminata";
_l.incomingCall = "Chiamata in arrivo";
_l.authHeading = "Autenticazione";
_l.terms = "Termini e condizioni di "+appname+"";
_l.sendToChat = "Invia messaggio alla chat";
_l.createPost = "Crea e pubblica il post";
_l.txtNotLinked = "La transazione non sarà collegata al tuo profilo";
_l.anotherSupport = "Sostieni "+appname+" in un altro modo";
_l.supportTicketSuccess = "Il tuo messaggio è stato inviato e i volontari ti contatteranno. Grazie per la tua disponibilità a sostenere "+appname+"!";
_l.commentBannedWarning = function(name){
	return name + " ti ha bloccato. Non potrai commentare.";
};
_l.captchanotequal_angles = "I segmenti del captcha devono essere ruotati all'angolo corretto";
_l.permissions_name_account = "Accesso alle informazioni dell'account";
_l.permissions_descriptions_account = "Questa autorizzazione consente all'applicazione di accedere all'indirizzo del tuo account e ad altre informazioni pubbliche associate a questo indirizzo";
_l.permissions_name_sign = "Firma digitale dei dati";
_l.permissions_descriptions_sign = "Autorizzi la firma dei dati con la tua firma univoca";
_l.permissions_name_payment = "Effettuare un pagamento";
_l.permissions_descriptions_payment = "L'applicazione chiede l'autorizzazione per effettuare un pagamento in PKOIN";
_l.permissions_name_messaging = "Visualizzazione di messaggi";
_l.permissions_descriptions_messaging = "Consenti all'app di mostrare un messaggio informativo";
_l.permissions_name_mobilecamera = "Possibilità di caricare una foto";
_l.permissions_descriptions_mobilecamera = "Consenti all'app di aprire la galleria del dispositivo";
_l.permissions_name_zaddress = "Ottenere uno degli indirizzi del wallet";
_l.permissions_descriptions_zaddress = "Mostra al widget uno degli indirizzi del tuo wallet";
_l.permissions_name_notifications = "Ricevere notifiche";
_l.permissions_descriptions_notifications = "Consenti all'app di inviarti aggiornamenti e avvisi importanti";
_l.permissions_ask = "chiede l'autorizzazione";
_l.permissions_allow = "Consenti";
_l.permissions_allow_once = "Consenti una volta";
_l.permissions_forbid = "Nega";
_l.permissions = "Autorizzazioni";
_l.deleteapplication = "Elimina applicazione";
_l.installpplication = "Apri app";
_l.complainapplication = "Segnala applicazione";
_l.searchbyapplications = "Trova un'app";
_l.actions_reason_registration = "Per completare la registrazione devi risolvere il captcha";
_l.actions_reason_balance = "Per eseguire azioni su "+appname+" devi risolvere il captcha";
_l.commonsubmitapplicationVideoSmall = "Invia";
_l.commonRequest_pl_notes = "Note: eventuali informazioni aggiuntive";
_l.commonRequest_pl_email = "Email di contatto";
_l.commonRequest_caption = "Richiesta di supporto";
_l.commonRequest_er_info = "Sono richieste informazioni aggiuntive";
_l.commonRequest_er_email = "Lascia un'email per ricevere una risposta";
_l.registration_e13114 = "Si è verificato un problema con la tua registrazione a causa di un'attività insolita.";
_l.balance_e13114 = "Si è verificato un problema nell'invio delle tue azioni a causa di un'attività insolita.";
_l.solutionbalance_1 = "Per continuare a interagire con "+appname+", puoi ricaricare tu stesso il saldo del tuo wallet";
_l.solutionbalance_2 = "oppure contattare il supporto";
_l.solutionbalance_3 = "Per continuare a interagire con "+appname+", puoi contattare il supporto";
_l.commonRequest_submitted = "Grazie per averci contattato, esamineremo la tua richiesta";
_l.listeners = "Ascoltatori";
_l.enterTheAmount = "Inserisci l'importo in PKOIN per vedere la copertura del tuo annuncio e avviarlo";
_l.boost = "Boost";
_l.howToBuy = "Come acquistare PKOIN";
_l.clearLocal = 'Svuota la memoria locale';
_l.clearLocalActions = 'Cancella le informazioni sulle transazioni';
_l.clearLocalQuestion = 'Vuoi davvero svuotare la memoria locale?';
_l.registration_not_in_progress = "La tua registrazione non è ancora iniziata: devi risolvere il captcha oppure avere PKOIN sull'indirizzo del tuo account";
_l.registration_not_in_progress_no_processing = "La tua registrazione non è ancora iniziata";
_l.registration_undefined_status= "Le informazioni di registrazione del tuo account non sono disponibili, forse non sei connesso a Internet";
_l.registration_in_progress_transaction= "La transazione di registrazione dell'account è stata inviata alla blockchain";
_l.registration_in_progress_hasUnspents= "La transazione di registrazione dell'account verrà presto inviata alla blockchain";
_l.registration_in_progress_wait_unspents= "La transazione di registrazione dell'account verrà presto inviata alla blockchain";
_l.rpending = 'In attesa';
_l.object_comment = 'Commento';
_l.object_userInfo = 'Informazioni utente';
_l.object_upvoteShare = 'Valuta la pubblicazione';
_l.object_cScore = 'Valutazione del commento';
_l.object_subscribePrivate = 'Iscriviti con notifiche';
_l.object_subscribe = 'Iscriviti';
_l.object_unsubscribe = "Annulla l'iscrizione";
_l.object_blocking = 'Blocco';
_l.object_unblocking = 'Sblocco';
_l.object_complainShare = 'Segnalazione';
_l.object_modFlag = 'Moderazione';
_l.object_contentBoost = 'Boost della pubblicazione';
_l.object_share = 'Post';
_l.object_accDel = "Eliminazione dell'account";
_l.object_transaction = 'Transazione';
_l.actions_noinputs_wallet = 'Fondi insufficienti per il trasferimento, tenendo conto della commissione';
_l.actions_noinputs = "Non hai abbastanza monete per completare l'operazione";
_l.actions_noinputs_on_address = "Non hai abbastanza monete sugli indirizzi selezionati per completare l'operazione";
_l.actions_noinputs_wait = "Al momento non hai abbastanza monete per completare l'operazione. Attendi";
_l.actions_noinputs_wait_comment = "Non hai abbastanza monete attive per pubblicare un commento. Attendi";
_l.actions_totalAmountZero = "L'importo totale della transazione è zero o inferiore alla commissione";
_l.actions_totalAmountSmaller_amount = 'Hai meno denaro sul tuo account di quanto vuoi inviare.';
_l.actions_totalAmountSmaller_amount_wait = "Hai meno denaro sul tuo account di quanto vuoi inviare. Attendi.";
_l.actions_totalAmountSmaller_amount_fee = 'Hai meno denaro sul tuo account di quanto vuoi inviare (commissioni incluse).';
_l.actions_totalAmountSmaller_amount_fee_wait = "Hai meno denaro sul tuo account di quanto vuoi inviare (commissioni incluse). Attendi.";
_l.actions_rejected = "L'operazione non è riuscita per un motivo sconosciuto";
_l.actions_rejectedFromNodes = "L'operazione è stata rifiutata dalla rete";
_l.actions_waitConfirmation = 'Operazione in attesa di conferma';
_l.actions_completed = 'Operazione completata';
_l.actions_alreadyCheckConfirmation = "L'operazione è stata inviata alla blockchain";
_l.actions_alreadySent = 'Operazione già inviata';
_l.actions_alreadySending = "L'operazione è già in corso";
_l.actions_waitUserStatus = "L'operazione verrà inviata alla rete al termine della registrazione dell'utente";
_l.actions_rejectedByTime = 'Operazione annullata per scadenza dei termini';
_l.actions_resourses = 'Le risorse non sono state caricate';
_l.actions_alreadyCheck = 'Il caricamento delle risorse è già stato verificato';
_l.actions_checkFail = 'Le risorse non sono ancora state caricate';
_l.actions_collision = "L'operazione è stata sostituita da un'altra";
_l.actions_actionId = "Impossibile annullare l'operazione, ID mancante";
_l.actions_address = 'Indirizzo mancante, utente non registrato';
_l.actions_noAddress = "Impossibile annullare l'operazione, indirizzo mancante";
_l.actions_userInteractive = "È richiesta un'azione dell'utente";
_l.actions_waitUserInteractive = "In attesa di un'azione dell'utente";
_l.actions_rejectedByUser = "Annullato dall'utente";
_l.actions_rejectedByUser_question = "Vuoi annullare l'operazione?";
_l.actions_no_pending_actions = 'Nessuna operazione in sospeso';
_l.reason_changeUserName = "Siamo spiacenti, il nome dell'account scelto è già in uso, scegline un altro";
_l.info_actions_checkFail = "La pubblicazione verrà inviata non appena le risorse caricate saranno elaborate. Resta nell'app ancora per un po'.";
_l.e28error = "Attendi prima di eseguire l'azione";
_l.postInRelay2 = "Questa pubblicazione verrà presto inviata alla blockchain";
_l.err47 = "Errore sconosciuto durante l'eliminazione del post";
_l.donatebalancenotenouth = "Non hai fondi sufficienti per fare una donazione";
_l.error408 = 'Errore, problema di connessione';
_l.watchstream = "Guarda la diretta";
_l.anotherSiteHeader = "Altro sito";
_l.openOriginal = "Apri l'originale";
_l.registration_blocked = _l.lockedaccount;
_l.horizontalSearchUsers = "Account";
_l.information = "Informazioni";
_l.sendcoins = "Invia PKOIN";
_l.notificationsTurnOffQ = 'Vuoi davvero disattivare le notifiche di questo utente?';
_l.showblockedusers = "Mostra utenti bloccati";
_l.cleartempactions = "Vuoi davvero cancellare le informazioni temporanee dell'applicazione sulle tue azioni?";
_l.captiontempactions = "Informazioni sulle transazioni nella memoria locale";
_l.labeltempactions = "Numero di transazioni in sospeso";
_l.labeltempactionszero = "Nessuna transazione in sospeso";
_l.deleteapplicationQuestion = "Vuoi davvero eliminare l'applicazione?";
_l.deleteapplicationQuestionDevelop = "Vuoi davvero eliminare l'applicazione? Per le applicazioni in modalità sviluppo, questa funzione simula solo la disinstallazione e reimposta le impostazioni fino al prossimo avvio.";
_l.application_settings = "Impostazioni";
_l.application_close = "Torna a " + appname;
_l.application_notexist = "Applicazione non trovata o server dell'applicazione non raggiungibile";
_l.permissions_descriptions_chat = "Inviare messaggi nella chat di "+appname+", creare gruppi e chat";
_l.permissions_name_chat = "Chat di " + appname;
_l.permissions_name_geolocation = "Accesso alla posizione";
_l.permissions_descriptions_geolocation = "L'applicazione chiede l'autorizzazione ad accedere alla tua posizione";
_l.permissions_name_externallink = "Apertura di link esterni";
_l.permissions_descriptions_externallink = "L'applicazione chiede l'autorizzazione ad aprire link esterni nel browser o in altre applicazioni";
_l.limits = "Limiti";
_l.pay = "Paga";
_l.external_prepareTransaction = 'Il pagamento è in elaborazione';
_l.external_paySucc_nocbpw = 'Il pagamento è stato effettuato, la finestra verrà chiusa';
_l.external_paySucc_fetch = 'Il pagamento è stato effettuato, stiamo trasferendo i dati al venditore';
_l.external_paySucc_redirect = "Il pagamento è stato effettuato, vai alla pagina del venditore";
_l.external_email_required = 'Inserisci il tuo indirizzo email';
_l.external_phone_required = 'Inserisci il tuo numero di telefono';
_l.external_shipmentValueEmpty = 'Il costo di spedizione non è stato calcolato. Verifica che i campi siano compilati correttamente o contatta il venditore';
_l.external_fill_shipment = 'Compila tutti i campi necessari per calcolare il costo di spedizione';
_l.anonymous_purchase = "Acquisto anonimo";
_l.anonymous_purchase_text = "In questo caso il venditore non richiede informazioni sull'account e sul suo titolare per il pagamento, ma non puoi pagare l'acquisto dall'indirizzo dell'account, solo dagli indirizzi del wallet.";
_l.phone="Telefono";
_l.country="Paese";
_l.name="Nome";
_l.city="Città";
_l.state="Stato/provincia";
_l.zipcode="CAP";
_l.external_loading = "Caricamento";
_l.external_paySucc_details = "Il pagamento è stato effettuato. Dettagli della transazione";
_l.address2 = "Seconda riga dell'indirizzo";
_l.total = "Totale";
_l.shipment = "Spedizione";
_l.external_linkWillExpired = "Il link di pagamento scade";
_l.external_linkExpired = "Il link di pagamento è scaduto";
_l.payLink = "Link di pagamento";
_l.authLink = "Link di autorizzazione";
_l.undefinedLink = "Link sconosciuto";
_l.receiver_address = "Destinatario";
_l.authText = "Vuoi davvero accedere al sito tramite "+appname+"?";
_l.authAllow = "Accedi tramite "+appname;
_l.paymentsOnDevice = "Pagamenti";
_l.scanqrcode = "Scansiona codice QR";
_l.free = "Gratis";
_l.discount = "Sconto";
_l.tax = "Tasse";
_l.external_paylink_reg = "Hai aperto il link di pagamento. Per effettuare un pagamento devi registrarti o accedere al tuo account.";
_l.payment_myaddress = "Questo link di pagamento indica il tuo utente come beneficiario. Seleziona un altro utente per usarlo";
_l.external_source = "Da dove inviare i PKOIN";
_l.external_tTotal = "Account o wallet";
_l.description = 'Descrizione';
_l.getqrcode = 'Mostra codice QR';
_l.stakelogo = 'WPKOIN';
_l.stakewrap = "Acquista tramite Metamask";
_l.pkoin_stake_info = "Collega il tuo wallet a Metamask e acquista WPKOIN";
_l.stakewpkoin = "Acquista WPKOIN tramite Metamask";
_l.pkoin_application_info = "Acquista tramite la mini-app Swipelux";
_l.buyswipelux = "Acquista tramite Swipelux";
_l.buycard = "VISA/Mastercard";
_l.buyusers = "Acquista da utenti";
_l.buyviacrypto = "Acquista con criptovalute";
_l.installApplication = "Installa l'app "+appname+" per caricare video";
_l.boostlabel= "Come fare pubblicità su Bastyon";
_l.monetization_Period = "Periodo";
_l.monetization_Publications = "Pubblicazioni";
_l.monetization_Ratings = "Valutazioni";
_l.monetization_Comments = "Commenti";
_l.monetization_Reward = "Ricompensa";
_l.monetization_start = "Avvia il programma di monetizzazione";
_l.monetization_Monetization = "Monetizzazione";
_l.monetization_enable = "Attiva la monetizzazione";
_l.monetization_monetizationText = "Attiva la monetizzazione e guadagna ogni settimana";
_l.monetization_disable =  "Disattiva il programma";
_l.monetization_disable_question = "Vuoi davvero smettere di partecipare al programma di monetizzazione?";
_l.monetization_exchange = "Scambia Pocketcoin";
_l.monetization_buychat = "Contatta via chat";
_l.advertising_Period = "Periodo";
_l.advertising_Publications = "Pubblicazioni";
_l.advertising_Boostscount = "Boost";
_l.advertising_Ratings = "Valutazioni";
_l.advertising_Comments = "Commenti";
_l.advertising_Amount = "Speso";
_l.advertising_Advertising = "Pubblicità";
_l.advertising_exchange = "Acquista criptovalute";
_l.advertising_buychat = "Contatta via chat";
_l.advertising_Date = "Data";
_l.boosts_title = "Boost";
_l.boosts_both = "Tutti";
_l.boosts_sent = "Inviati";
_l.boosts_received = "Ricevuti";
_l.boosts_sent_badge = "Inviato";
_l.boosts_received_badge = "Ricevuto";
_l.boosts_date = "Data";
_l.boosts_direction = "Tipo";
_l.boosts_amount = "Importo";
_l.boosts_amount_loaded = "Importo caricato";
_l.boosts_participants = "Partecipanti";
_l.boosts_booster = "Booster";
_l.boosts_contentauthor = "Autore";
_l.boosts_content = "Contenuto";
_l.boosts_transaction = "Transazione";
_l.boosts_height = "Altezza";
_l.boosts_loaded = "Caricati";
_l.boosts_empty = "Nessun boost trovato";
_l.boosts_error = "La cronologia dei boost non è disponibile";
_l.boosts_loadmore = "Carica altri";
_l.boosts_me = "io";
_l.boosts_show = "Mostra";
_l.boosts_txcopied = "Transazione copiata";
_l.boosts_summary_stat = function(p){ p = p || {}; return (p.count || 0) + ' boost · ' + (p.amount || 0) + ' PKOIN' };
_l.grouping = "Raggruppa per";
_l.groupBy_shares = "post";
_l.groupBy_months = "mesi";
_l.monetization_disable_time = "Verrai disconnesso dal programma di monetizzazione entro venti minuti.";
_l.fastmessagemonetization = "come donazione";
_l.sendcoinssm = "Invia";
_l.fastmessagedonate = "come donazione";
_l.e130961donate = "Quanti PKOIN vuoi donare?";
_l.statsWallet = "Informazioni sul wallet";
_l.paymentsDate = "Data";
_l.paymentsValue = "Importo";
_l.paymentsInformation = "Descrizione";
_l.showtransactionhistory = "Cronologia delle transazioni";
_l.transactionloading = "In attesa della conferma della transazione";
_l.gototransaction = "Mostra transazione";
_l.external_authlink_reg = "Hai aperto il link di autorizzazione. Per autorizzarti tramite "+appname+" devi registrarti o accedere al tuo account.";
_l.external_sharelink_reg = "Hai aperto il link di condivisione. Per condividere devi registrarti o accedere al tuo account.";
_l.foreground_service_mediaPlayback_title = appname;
_l.foreground_service_mediaPlayback_text = ""+appname+" sta riproducendo un video";
_l.foreground_service_mediaUploading_title = appname;
_l.foreground_service_mediaUploading_text = ""+appname+" sta caricando un video";
_l.stateactionDefault = "Per eseguire l'azione devi registrarti o accedere al tuo account.";
_l.incomingVideoCall = "Videochiamata in arrivo";
_l.incomingAudioCall = "Chiamata audio in arrivo";
_l.connecting = "Connessione in corso";
_l.quotanow = function(v){
	return "Puoi caricare un video di dimensioni non superiori a"
};
_l.jury = "Giuria";
_l.juryQuestionPost = "Puoi confermare che questo post non è adatto a "+appname+" per il seguente motivo";
_l.juryQuestionComment = "Puoi confermare che questo commento non è adatto a "+appname+" per il seguente motivo";
_l.juryQuestionUser = "Puoi confermare che questo utente viola le regole di "+appname+" per il seguente motivo";
_l.juryvote_success =  "Il tuo voto è stato inviato correttamente";
_l.juryconfirm = "Confermi la tua decisione?";
_l.openin = "Apri";
_l.monet_title = "Dal 9 settembre su Bastyon è attivo un nuovo programma di pubblicità e monetizzazione per i blogger.";
_l.monet_subtitle = "In cosa consiste questo programma, come funziona, chi può partecipare, come si calcolano i guadagni e a cosa serve?";
_l.monet_howworks_title = "Come funziona:";
_l.monet_howworks_text_1 = "Gli inserzionisti promuovono i loro prodotti o servizi su Bastyon (le informazioni per gli inserzionisti si trovano su bastyon.com/boost). Gli annunci compaiono nel feed principale e nei canali degli autori. Tutti i guadagni del feed principale vanno ai nodi (come guadagnare con un nodo semplice: bastyon.com/easynode), mentre i guadagni dei canali degli autori vanno direttamente agli autori. Bastyon non è un'azienda e non ha scopo di lucro, quindi tutti i ricavi pubblicitari dei canali vanno agli autori.";
_l.monet_participation_title = "Chi partecipa e quali sono i pagamenti:";
_l.monet_participation_text_1 = "Nella fase iniziale la monetizzazione funziona solo sui canali di autori verificati. Col tempo il programma si estenderà ad altri canali molto attivi. Gli autori possono disattivare la monetizzazione, rimuovendo gli annunci e rinunciando ai pagamenti.";
_l.monet_participation_text_2 = `Se hai un canale al di fuori di Bastyon con più di 1.000 iscritti, puoi scrivere a <a href="mailto:support@bastyon.com">support@bastyon.com</a> per richiedere la verifica.`;
_l.monet_participation_text_3 = "IMPORTANTE: gli autori guadagnano in proporzione all'attività e al numero di persone sul loro canale. Più commenti e valutazioni ci sono, più alti sono i pagamenti dal fondo pubblicitario. Nelle impostazioni gli autori hanno un pannello di monetizzazione dove possono vedere la cronologia dei pagamenti. I pagamenti avvengono alla fine di ogni settimana per l'attività sui post delle ultime due settimane.";
_l.monet_monet_withdrawal_title = "Come gli autori possono prelevare i guadagni (semplicissimo):";
_l.monet_monet_withdrawal_text_1 = `Gli autori possono prelevare i PKOIN tramite exchange come Tapbit, ХТ, oppure tramite scambi peer-to-peer in rubli, dollari o qualsiasi altra valuta. Per comodità degli autori, alcuni exchange storici sono disponibili direttamente nel pannello di monetizzazione. Altri exchange con almeno un anno di attività verranno aggiunti al pannello. Per domande sui prelievi, contatta il supporto all'indirizzo <a href="mailto:support@bastyon.com">support@bastyon.com</a>`;
_l.monet_calculation_title = "Come vengono calcolati i pagamenti?";
_l.monet_calculation_text1 = "I guadagni variano in base alla quantità di pubblicità della settimana e a quanto hanno pagato gli inserzionisti. Il denaro degli inserzionisti viene suddiviso tra gli autori, ma l'importo dipende dai ricavi pubblicitari complessivi e dall'attività sul canale (valutazioni e commenti). La crescita del pubblico attira nuovi inserzionisti, con conseguente aumento dei guadagni. I canali attivi possono guadagnare l'equivalente di 50-75 $ a settimana o più.";
_l.monet_increaseearnings_title = "Come aumentare i guadagni:";
_l.monet_increaseearnings_text1 = "Crea più contenuti";
_l.monet_increaseearnings_text2 = "Invita più persone a partecipare";
_l.monet_increaseearnings_text3 = "Su Bastyon la durata del video non conta, perché gli annunci non interrompono il video: conta il coinvolgimento sotto i post";
_l.monet_footer_1 = "Economia interna di Bastyon - Monetizzazione - Pocketcoin (PKOIN)";
_l.monet_signup = "ISCRIVITI SU BASTYON";
_l.monet_footer_2 = `*Scrivi a <a href="mailto:support@bastyon.com">support@bastyon.com</a> per iniziare a guadagnare con la pubblicità sul tuo canale`;
_l.miniApp_publishMessage = "Pubblicazione della mini-app: {0}";
_l.miniApp_requiredMessage = "Questo campo non può essere vuoto";
_l.miniApp_deleteConfirmation = "Vuoi davvero eliminare questa mini-app?";
_l.miniApp_publishConfirmation = "Vuoi davvero pubblicare l'applicazione? Se non sei nella rete di test, verrà addebitata una commissione di 50.";
_l.miniApp_yesButton = "Sì";
_l.miniApp_noButton = "Annulla";
_l.miniApp_deleteSuccessMessage = "La mini-app è stata eliminata correttamente.";
_l.miniApp_deleteErrorMessage = "Impossibile eliminare l'app. Riprova più tardi.";
_l.miniApp_loadErrorMessage = "Impossibile modificare l'applicazione. Riprova più tardi.";
_l.miniApp_installErrorMessage = "Impossibile installare l'applicazione. Riprova.";
_l.miniApp_editErrorMessage = "Impossibile modificare l'applicazione. Riprova più tardi.";
_l.miniApp_guideLink = "Guida alle mini-app di Bastyon";
_l.miniApp_supportLinkText = "Domande o idee di miglioramento? Contatta il supporto";
_l.miniApp_iconAltText = "Icona dell'applicazione";
_l.miniApp_iconErrorMessage = "Impossibile caricare l'icona. Verifica la disponibilità del file sul tuo dominio:";
_l.miniApp_publishButton = "Pubblica";
_l.miniApp_editButton = "Modifica";
_l.miniApp_deleteButton = "Elimina";
_l.miniApp_authorLabel = "Autore";
_l.miniApp_permissionsLabel = "Autorizzazioni";
_l.miniApp_idLabel = "ID";
_l.miniApp_linkLabel = "Link dell'app";
_l.miniApp_goToAppLinkText = "Vai all'app";
_l.miniApp_descriptionUnavailable = "Descrizione non disponibile";
_l.miniApp_editTitle = "Modifica applicazione <%= id %>";
_l.miniApp_saveButton = "Salva";
_l.miniApp_cancelButton = "Annulla";
_l.miniApp_importManifestError = "Errore di importazione del manifest. Assicurati che il file b_manifest.json esista e contenga un JSON valido. Verifica che il server fornisca le intestazioni CORS necessarie e che la connessione HTTPS non sia bloccata da un certificato non attendibile (approvalo nel browser se necessario).";
_l.miniApp_importIconError = "Errore di importazione dell'icona dell'applicazione. Può accadere se il file `b_icon.png` manca o non è accessibile.";
_l.miniApp_brokenManifestError = "Errore di importazione del manifest dal dominio indicato. Verifica che il file `b_manifest.json` esista e sia corretto. Se viene usato HTTPS con un certificato autofirmato, consenti l'accesso nel browser.";
_l.miniApp_brokenPermissionsError = "Autorizzazioni non valide o vuote nel manifest. Assicurati che le autorizzazioni siano indicate correttamente.";
_l.miniApp_missingIdError = "Nel manifest manca l'ID dell'applicazione. Il campo `id` deve essere compilato.";
_l.miniApp_missingNameError = "Nel manifest manca il nome dell'applicazione. Il campo `name` deve essere compilato.";
_l.miniApp_missingVersionError = "Nel manifest manca la versione dell'applicazione. Il campo `version` deve essere compilato.";
_l.miniApp_missingDescriptionEnError = "Nella sezione `descriptions` manca la descrizione dell'applicazione in inglese.";
_l.miniApp_missingScopeError = "Nel manifest manca l'informazione `scope`. Assicurati di fornire un valore `scope` valido.";
_l.miniApp_missingDescriptionError = "Nel file `b_manifest` manca la descrizione dell'applicazione. Assicurati che sia presente il campo `descriptions['en']` o `description`.";
_l.miniApp_brokenAuthorError = "Autore dell'applicazione non valido. La causa può essere un campo `author` mancante o formattato in modo errato (è previsto un indirizzo Base58).";
_l.miniApp_discrepancyIdError = "L'ID dell'applicazione nel manifest non corrisponde all'ID indicato durante l'installazione.";
_l.miniApp_discrepancyDevelopError = "Lo stato di sviluppo (`develop`) nel manifest non corrisponde a quello dell'applicazione indicata.";
_l.miniApp_discrepancyAuthorError = "Impossibile aggiungere: l'autore dell'applicazione indicato nel manifest non corrisponde al tuo indirizzo. Non puoi aggiungere applicazioni che non ti appartengono.";
_l.miniApp_conflictIdAlreadyExistsError = "Conflitto: esiste già un'applicazione con questo ID. Controlla l'ID della nuova applicazione o rimuovi quella esistente.";
_l.miniApp_permissionDeniedError = "L'utente ha negato l'autorizzazione richiesta dall'applicazione.";
_l.miniApp_permissionMissingError = "Una delle autorizzazioni richieste dall'applicazione manca nel manifest.";
_l.miniApp_permissionsEmptyError = "L'elenco delle autorizzazioni richieste è vuoto. L'applicazione deve richiedere almeno un'autorizzazione.";
_l.miniApp_parametersMissingError = "Durante l'esecuzione dell'azione mancano uno o più parametri obbligatori.";
_l.miniApp_locationNotAvailableError = "Impossibile ottenere i dati sulla posizione. Controlla le autorizzazioni o lo stato del GPS.";
_l.miniApp_messageEmptyError = "Il messaggio di avviso è vuoto. Assicurati di fornire un testo.";
_l.miniApp_versionError = "La versione del manifest non corrisponde alla versione installata dell'applicazione.";
_l.miniApp_userAuthorizedError = "L'utente è già autorizzato. La registrazione non è possibile.";
_l.miniApp_imagesMax10Error = "È stato superato il numero massimo di immagini caricate (10).";
_l.miniApp_brokenZAddressesError = "Impossibile ottenere gli indirizzi z dell'utente. I dati potrebbero mancare o non essere validi.";
_l.miniApp_mobileCameraNotSupportedError = "La fotocamera del dispositivo mobile non è supportata dall'applicazione.";
_l.miniApp_mobileCameraCancelError = "L'utente ha annullato l'accesso alla fotocamera o il caricamento dell'immagine.";
_l.miniApp_permissionNotExistInManifestError = "L'autorizzazione richiesta manca nel manifest dell'applicazione.";
_l.miniApp_permissionRequestError = "Errore durante la richiesta di autorizzazione all'utente. Assicurati che l'autorizzazione sia indicata correttamente.";
_l.miniApp_errorCodeAppDataError = "Errore nei dati della memoria locale dell'applicazione.";
_l.miniApp_missingApplicationError = "L'applicazione non è stata trovata nell'elenco di quelle installate. Potrebbe essere stata rimossa oppure l'ID non è corretto.";
_l.miniApp_publishSuccessMessage = "L'applicazione è stata pubblicata correttamente.";
_l.miniApp_publishErrorMessage = "Si è verificato un errore durante la pubblicazione dell'applicazione.";
_l.miniApp_publishOnlyTestNetworkMessage = "Al momento la pubblicazione è disponibile solo sulla rete di test.";
_l.miniApp_localhostScopeWarningMessage = "Non è consentito pubblicare un'applicazione con scope locale ('localhost'). Modifica lo scope nella scheda di modifica.";
_l.miniApp_createTitle = "Crea una nuova mini-app";
_l.miniApp_tagsRequiredMessage = "Specifica i tag per l'applicazione.";
_l.miniApp_scopeInvalidMessage = "Questo campo deve essere nel formato di un sottodominio, ad esempio app.pocketnet. Usa solo lettere minuscole, numeri e punti, senza i prefissi https:// o www.";
_l.miniApp_idInvalidMessage = "L'ID deve essere nel formato di un nome di dominio, ad esempio app.pocketnet o example.app. Usa solo lettere minuscole e almeno un punto.";
_l.miniApp_extendedTags = "Il numero massimo di tag che puoi aggiungere è ";
_l.miniApp_devModeLabel = "Ambiente di sviluppo:";
_l.miniApp_documentationButtonLabel = "Documentazione";
_l.miniApp_createButtonLabel = "Crea mini-app";
_l.miniApp_myAppsButtonLabel = "Create da me";
_l.miniApp_appsButtonLabel = "Applicazioni";
_l.miniApp_heroTitle = "Una piattaforma potente per i tuoi progetti";
_l.miniApp_heroSubtitle = "Sviluppa applicazioni e sfrutta tutte le potenzialità di Bastyon per la tua attività.";
_l.miniApp_heroCtaButton = "Inizia";
_l.miniApp_featuresTitle = "Funzionalità";
_l.miniApp_featureDecentralizedTitle = "Decentralizzato";
_l.miniApp_featureDecentralizedDescription = "Crea applicazioni senza controllo centralizzato, mantenendo i tuoi dati al sicuro.";
_l.miniApp_featureScalableTitle = "Scalabile";
_l.miniApp_featureScalableDescription = "Sfrutta la rete di Bastyon per applicazioni di qualsiasi dimensione.";
_l.miniApp_featureCryptoIntegrationTitle = "Facile integrazione dei pagamenti in criptovaluta";
_l.miniApp_featureCryptoIntegrationDescription = "Integra pagamenti in criptovaluta nelle tue applicazioni per la comodità degli utenti.";
_l.miniApp_featureApiAccessTitle = "Accesso completo all'API di Bastyon";
_l.miniApp_featureApiAccessDescription = "Usa tutte le funzionalità dell'API di Bastyon per creare applicazioni funzionali e innovative.";
_l.miniApp_createDescription = "Assicurati che tutti i dati corrispondano ai campi indicati nel file b_manifest.json dell'applicazione. Eventuali discrepanze possono causare errori durante l'installazione.";
_l.miniApp_instructionsTitle = "Istruzioni per il deployment";
_l.miniApp_instructionsIntro = "Il deployment dell'applicazione è piuttosto semplice. Devi fornire due file: b_manifest e b_icon.";
_l.miniApp_instructionsFilesNeeded = "Per un deployment corretto, assicurati che i seguenti file siano disponibili sul tuo dominio:";
_l.miniApp_instructionsManifest = "b_manifest: file JSON con le informazioni sull'applicazione.";
_l.miniApp_instructionsIcon = "b_icon.png: l'icona dell'applicazione in formato PNG, disponibile all'URL https://[scope]/b_icon.png, dove scope è il tuo dominio.";
_l.miniApp_instructionsManifestExample = "Esempio di contenuto del file b_manifest:";
_l.miniApp_instructionsDataMatch =
  "Importante: tutti i dati del modulo (id, name) devono corrispondere esattamente ai campi del file b_manifest. " +
  "Il campo 'author' deve corrispondere all'utente attuale che aggiunge l'applicazione. " +
  "Se il campo 'Dominio di sviluppo' è compilato, il campo 'Dominio' può restare vuoto durante la creazione. " +
  "Inizialmente l'applicazione può funzionare nell'ambiente di test sul dominio di sviluppo, e il dominio principale può essere indicato in seguito tramite la scheda di modifica per la pubblicazione. " +
  "'Dominio' indica l'indirizzo principale disponibile a tutti gli utenti, mentre 'Dominio di sviluppo' è destinato ai test (ad es. 'localhost:3333' o 'test.example.com'). " +
  "Il dominio di sviluppo è accessibile solo all'autore dell'applicazione e il cambio di ambiente avviene all'interno dell'applicazione stessa.";
_l.miniApp_instructionsDevMode = "Dopo il salvataggio, la tua mini-app verrà creata in modalità sviluppo (dev mode). Sarà disponibile solo per te in locale. In seguito potrai pubblicarla per tutti gli utenti tramite il pannello di gestione.";
_l.miniApp_nameLabel = "Nome";
_l.miniApp_scopeLabel = "Dominio";
_l.miniApp_tScopeLabel = "Dominio di sviluppo";
_l.miniApp_tagsLabel = "Tag";
_l.miniApp_idInstructions = "L'ID deve essere nel formato di un nome di dominio, come app.pocketnet o example.app. Usa solo lettere minuscole e almeno un punto.";
_l.miniApp_nameInstructions = "Inserisci un nome chiaro che vedranno gli utenti (ad es. Demo).";
_l.miniApp_scopeDescription =
  "Inserisci il nome di dominio senza protocollo (ad es. 'example.com'). " +
  "L'applicazione deve supportare il protocollo HTTPS, quindi se inserisci 'example.com', " +
  "deve essere raggiungibile all'indirizzo https://example.com. " +
  "Non includere 'https://' o altri prefissi. Sono consentiti solo lettere minuscole, " +
  "numeri e punti (ad es. 'my-app.bastyonapps.com' o 'subdomain.example.com').";
_l.miniApp_tScopeInstructions =
  "Questo dominio viene usato solo per sviluppare o testare la tua applicazione. " +
  "Indica un dominio locale (ad es. 'localhost:8080') o un dominio di test (ad es. 'test.example.com'). " +
  "Se vuoi prima testare l'applicazione, usa solo il 'Dominio di sviluppo'. " +
  "Il dominio principale può essere indicato in seguito per pubblicare l'applicazione.";
_l.miniApp_iconInstructions = "Nella sezione di visualizzazione configuri l'aspetto della tua applicazione. L'icona viene caricata automaticamente dall'URL https://[scope]/b_icon.png, dove [scope] è il dominio della tua applicazione (ad es. example.com). Assicurati che il file b_icon.png sia accessibile e in formato PNG.";
_l.miniApp_iconLabelInstructions = "Dopo aver inserito il dominio, vedrai un'anteprima dell'icona caricata. Se il file manca o il dominio non è corretto, verrà mostrato un messaggio di errore.";
_l.miniApp_showManifestButton = "Mostra il contenuto di b_manifest";
_l.miniApp_tagsCountRequirement = "Aggiungi 2 tag che descrivono la tua applicazione.";
_l.miniApp_tagsInstructions = "I tag aiutano gli utenti a trovare la tua applicazione.";
_l.miniApp_placeholderId = "Ad esempio: example.app";
_l.miniApp_placeholderName = "Ad esempio: My Super App";
_l.miniApp_placeholderScope = "Ad esempio: demo.bastyonapps.com";
_l.miniApp_placeholderTScope = "Ad esempio: localhost:8080 o test.example.com";
_l.miniApp_infoSectionTitle = "Informazioni";
_l.miniApp_deploymentSectionTitle = "Deployment";
_l.miniApp_displaySectionTitle = "Visualizzazione";
_l.miniApp_editAppTitle = "Modifica mini-app";
_l.miniApp_editDescriptionIntro = "Tutti i dati indicati nel modulo (id, name) devono corrispondere ai campi del manifest (b_manifest).";
_l.miniApp_editDescriptionAuthor = "Il campo 'author' nel manifest deve corrispondere all'utente che aggiunge questa applicazione (il proprietario).";
_l.miniApp_editDescriptionScope = "Se modifichi lo scope (dominio), assicurati che il nuovo dominio contenga i file necessari: b_manifest (un file JSON che descrive l'applicazione) e b_icon.png (l'icona PNG), disponibile all'indirizzo https://[scope]/b_icon.png.";
_l.miniApp_editDescriptionId = "Modificare l'id equivale di fatto a creare una nuova mini-app, quindi in genere è meglio non cambiarlo se stai solo aggiornando un'app esistente.";
_l.miniApp_editDescriptionOutro = "Dopo aver apportato le modifiche necessarie, non dimenticare di fare clic su Salva perché le informazioni aggiornate abbiano effetto.";
_l.miniApp_tagsEditInstruction = "Puoi aggiungere o rimuovere tag.";
_l.miniApp_fieldsLockedInfo = "L'ID, il nome e lo scope della tua applicazione non possono essere modificati dopo la creazione.";
_l.juryCaptionPost = "La pubblicazione viola le regole di pubblicazione dei contenuti su "+appname+"?";
_l.juryCaptionComment = "Il commento viola le regole di pubblicazione dei contenuti su "+appname+"?";
_l.juryCaptionUser = "Il profilo dell'utente viola le regole di pubblicazione dei contenuti su "+appname+"?";
_l.juryCaptionCollection = "La raccolta (titolo, descrizione, copertina) viola le regole di pubblicazione dei contenuti su "+appname+"?";
_l.juryCaptionReason = "Motivo";
_l.juryYes = "Sì, le viola";
_l.juryNo = "No, non le viola";
_l.shareOnBastyon = "Condividi su Bastyon";
_l.askdefaultapplink = function(appname){ return "Aprire questo link nella mini-app "+ appname + "?"};
_l.nomoreaskdefaultapplink = function({name, scope}){ return "Apri sempre i link di "+scope+" nella mini-app "+name+""};
_l.redirectminiappsuccess = function(appname){ return "Link aperto nella mini-app "+appname+""};
_l.chat = "Chat";
_l.emptyntime1 = 'Seleziona la data e l\'ora di pubblicazione';
_l.postWaitDelayed = function(time){
    return 'La pubblicazione verrà pubblicata: ' + time
};
_l.fordevelopers = "Per gli sviluppatori";
_l.interfacemobilelayoutmenu = "Pulsante della chat al centro della barra inferiore";
_l.interface = "Interfaccia";
_l.chatenabled = "Attiva la chat";
_l.managePaidSubscription = "Iscrizioni privilegiate";
_l.paidsubscription_condition_caption = "Configurazione delle iscrizioni privilegiate";
_l.paidsubscription_condition_text = "Imposta il prezzo di un'iscrizione privilegiata al tuo canale: potrai così fare pubblicazioni riservate solo agli utenti che ti sostengono. Perché un utente veda i tuoi contenuti, la somma dei suoi trasferimenti nel periodo deve essere pari o superiore al livello da te impostato.";
_l.paidsubscription_condition_hyvalue = "In sei mesi";
_l.paidsubscription_condition_yvalue = "All'anno";
_l.paidsubscription_condition_value = "Costo mensile dell'iscrizione privilegiata";
_l.paidsubscription_removecondition = "Disattiva le iscrizioni privilegiate";
_l.paidsubscription_removecondition_question = "Vuoi davvero disattivare le iscrizioni privilegiate? I tuoi contenuti saranno allora visibili a tutti gli utenti.";
_l.paidsubscription_addcondition = "Aggiungi condizioni di iscrizione privilegiata";
_l.paidsubscription_updatecondition = "Aggiorna le condizioni della tua iscrizione privilegiata";
_l.paidsubscription_updatecondition_question = "Vuoi davvero aggiornare il prezzo della tua iscrizione privilegiata? Le condizioni di visualizzazione verranno aggiornate anche per i contenuti precedenti.";
_l.paidsubscription_updatecondition_success = "Le condizioni della tua iscrizione privilegiata sono state modificate. Le modifiche verranno applicate agli utenti entro un giorno.";
_l.visibleonlytopaid = "Visibile solo agli iscritti privilegiati";
_l.sharevisibility_paid = 'Per gli iscritti privilegiati';
_l.sharevisibilitylabel_paid_post = "L'autore ha deciso di rendere questa <b>pubblicazione</b> visibile solo agli iscritti privilegiati";
_l.sharevisibilitylabel_paid_article = "L'autore ha deciso di rendere questo <b>articolo</b> visibile solo agli iscritti privilegiati";
_l.sharevisibilitylabel_paid_video = "L'autore ha deciso di rendere questo <b>video</b> visibile solo agli iscritti privilegiati";
_l.sharevisibilitylabel_paid_error = "Non siamo riusciti a verificare che tu abbia un'iscrizione premium. Riprova più tardi.";
_l.getpaidsubscription = 'Diventa iscritto privilegiato';
_l.getpaidsubscription2 = 'Diventa iscritto privilegiato';
_l.getpaidsubscription3 = "Richiedi un'iscrizione privilegiata";
_l.getpaidsubscription_text = "Ottieni un'iscrizione privilegiata e accedi a tutte le pubblicazioni dell'autore!";
_l.getpaidsubscription_acceptQuestion = 'Confermi le seguenti azioni: ';
_l.getpaidsubscription_acceptQuestion_paid = function({name, amount}){return 'Trasferimento a <b>' + name +'</b> di <b>' + amount +' PKOIN</b> per l\'iscrizione privilegiata' };
_l.getpaidsubscription_acceptQuestion_subscribe = function({name}){return 'Iscriviti a <b>' + name +'</b>'};
_l.getpaidsubscription_option_1m = "Acquista un'iscrizione di 1 mese";
_l.getpaidsubscription_option_6m = "Acquista un'iscrizione di 6 mesi";
_l.getpaidsubscription_option_1y = "Acquista un'iscrizione di 1 anno";
_l.getpaidsubscription_option_1m_p = "Paga la differenza per un'iscrizione di 1 mese";
_l.getpaidsubscription_option_6m_p = "Paga la differenza per un'iscrizione di 6 mesi";
_l.getpaidsubscription_option_1y_p = "Paga la differenza per un'iscrizione di 1 anno";
_l.getpaidsubscription_select_option = "Seleziona l'opzione di pagamento dell'iscrizione premium";
_l.getpaidsubscription_option_p = function(date){ return "L'iscrizione terminerà il " + date + ", ma potrà essere rinnovata in seguito a un prezzo inferiore." };
_l.getPaidSubscription = "Iscrizione privilegiata";
_l.fastmessagepaidsubscription = "come pagamento per un'iscrizione privilegiata";
_l.getpaidsubscription_paidsuccess_text = "La tua iscrizione privilegiata è già stata pagata.";
_l.getpaidsubscription_paidsuccess_until= function(date){ return 'Iscrizione pagata fino al <b>' + date + '</b>'};
_l.getpaidsubscription_paidsuccess_text_relation="L'accesso ai contenuti per gli iscritti privilegiati è già stato pagato, resta solo da iscriversi all'autore";
_l.fastmessagepaidsubscription_share = 'Pubblicazione per iscritti privilegiati';
_l.uploadwallpappercaption = "Imposta la copertina del profilo";
_l.uploadwallpapperuploadTitle = "Seleziona un'immagine di copertina per il profilo";
_l.uploadwallpapperGiferror = "Le immagini GIF non sono consentite";
_l.setcoverquestion = 'Vuoi salvare questa foto come copertina del profilo?';
_l.setcoverquestionyes = 'Sì, imposta la copertina';
_l.setcoverquestionno = 'No';
_l.hiddenCommentLabelLink = "Il commento è stato nascosto perché contiene un link a una risorsa esterna da parte di un utente con valutazione insufficiente.";
_l.getpaidsubscription_paidsuccess_removecodition_text = "L'autore ha disattivato la possibilità di concedere un accesso privilegiato. Pertanto i contenuti pubblicati in precedenza per gli iscritti privilegiati sono disponibili gratuitamente per tutti.";
_l.buypkoinexchnage="Acquista da un cambiavalute";
_l.buypkoinexchnage_info='Acquista peer-to-peer tramite mini-app';
_l.buypkoinexchnagep2p='Acquista tramite PKOIN Exchange';
_l.appsdisclaimer="Ogni app è già un wallet per PKOIN. Tranne quella per iOS";
_l.fortaBannerDesc = "Scarica il nuovo messenger Forta Chat per Android o visita il sito per maggiori informazioni.";
_l.downloadapk = "Scarica APK";
_l.fortaVisitSite = "Visita forta.chat";
_l.gotobarteron = "Vai su Barteron";
_l.gotofortachat = "Vai su Forta Chat";
_l.windows7 = "Scarica per Windows 7";
_l.miniapps = "Mini-app";
_l.sysmodbas="Sistema di moderazione dei contenuti su Bastyon";
_l.torHintStateRunning = "Il modulo TOR è in funzione";
_l.torHintStateStarting = "Il modulo TOR si sta avviando";
_l.imageerror = "Si è verificato un errore durante il caricamento delle immagini. Riprova";
_l.ratingsAndReviews = "Valutazioni e recensioni";
_l.allReviews = "Tutte le recensioni";
_l.rateApp = "Valuta";
_l.writeComment = "Scrivi un commento";
_l.yourRating = "La tua valutazione";
_l.youAlreadyRated = "Hai già valutato questa app";
_l.noReviewsYet = "Ancora nessuna recensione. Lascia tu il primo commento!";
_l.noRatingsYet = "Ancora nessuna valutazione";
_l.beFirstToRate = "Installa l'app e sii il primo a valutarla!";
_l.commentMinLength = "Il commento deve contenere almeno 10 caratteri";
_l.commentSent = "Commento inviato! Comparirà poco dopo l'elaborazione sulla blockchain.";
_l.ratingSent = "Valutazione inviata! Comparirà poco dopo l'elaborazione sulla blockchain.";
_l.commentSendError = "Errore durante l'invio del commento. Riprova.";
_l.tellAboutExperience = "Raccontaci la tua esperienza con l'app...";
_l.yourComment = "Il tuo commento";
_l.submitReview = "Invia recensione";
_l.cancel = "Annulla";
_l.all = "Tutto";
_l.howDoYouRate = "Come valuti questa app?";
_l.clickStarToRate = "Fai clic su una stella per valutare";
_l.outOf5 = "su 5";
_l.ratings = "valutazioni";
_l.submitRating = "Valuta";
_l.mustInstallToComment = "Devi installare l'app prima di scrivere una recensione";
_l.mustInstallToRate = "Devi installare l'app prima di valutarla";
_l.reviewsAndRatingsMenu = "Recensioni e valutazioni";
_l.rateAppPromptMessage = "Ti piace questa app? Dedica un momento a valutarla!";
_l.rateAppButton = "Valuta l'app";
