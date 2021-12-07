
var appname = window.pocketnetproject || "Pocketnet"

if(typeof loclib == "undefined" || !loclib)
loclib = {};

loclib.it = {};

var ____loclib = loclib.it;

//time

____loclib.fewseconds = "Pochi secondi fa";
____loclib.oneminute = "Un minuto fa";

____loclib.minutes = function(v){
return v + " minutes ago"
}

____loclib.tenminutes = "Dieci minuti fa";
____loclib.halfanhour = "Mezz'ora fa";
____loclib.anhour = "Un'ora fa";
____loclib.today

//authorization

____loclib.id0 = "Login";
____loclib.id1 = "Se sei già registrato, accedi";
____loclib.loadqrcode = "Carica codice QR";
____loclib.stay = "Resta connesso";
____loclib.signin = "Accedi";
____loclib.orcreate = "O crea un nuovo account";
____loclib.createnew = "Crea un nuovo account";
____loclib.staysafe = "Non è sicuro. Vuoi procedere ugualmente?";
____loclib.or = "o";

// Register a New Account
____loclib.id71 = "Crea un nuovo account";
____loclib.id72 = "Sei già registrato? Accedi";

____loclib.rtip1 = "Segnati la tua chiave di accesso!";
____loclib.rtip2
var h = "Qui sotto trovi la tua chiave di accesso privata (Private Key). Scrivila in un luogo sicuro e assicurati di salvare il tuo codice QR";

____loclib.rtip2 = function(mobile){

    if(mobile){ 

        h += "e ricordati di non perderla. Non salviamo i tuoi dati e non c'è alcun modo per recuperare la tua Private Key se la perdi!";
    }

    return h


}

____loclib.generatepkey = "Genera Private Key";
____loclib.rtip3 = "Scrivi questa chiave di accesso o salvala come codice QR. Non memorizziamo i tuoi dati personali. La Private Key non può essere recuperata se la perdi!";
____loclib.saveqrcode = "Salva codice Qr";
____loclib.copyprivkey = "Copia la chiave privata";
____loclib.rcontinue = "Continua";
____loclib.idle = "Inattivo per qualche tempo";
____loclib.congratulations = "Congratulazioni! Sei in <span class='pnlabel'>"+appname+"</span>";
____loclib.creatingpreloader = "Creazione di un account in corso";
____loclib.removepaste = "Abbiamo rimosso l'opzione incolla per questo input.";
____loclib.filedamaged = "Il file non contiene una chiave privata valida";
____loclib.keysnotmatch = "La chiave privata di accesso non corrisponde";
____loclib.confirmkey = "Digita la tua chiave di accesso privata o carica il codice QR dal passo precedente";
____loclib.successfullycopied = "La chiave è stata copiata con successo";
____loclib.urlsuccesscopied = "Il link è stato copiato con successo";
____loclib.successcopied = "Il testo è stato copiato con successo";

____loclib.confirmkeyLabel = "Per favore, conferma la tua chiave privata. Digita la chiave nel modulo o <b>carica il codice QR</b>";
____loclib.repeatetocreate = "Ripeti per creare nuovamente la chiave privata";
____loclib.confirmcreate = "Crea un account";


//user activation

____loclib.useractivation = "Attivazione utente";
____loclib.wesentmoney = "Ti abbiamo inviato alcuni PKOIN per la registrazione";
____loclib.wesentmoneym = "Ti abbiamo già inviato alcuni PKOIN per la registrazione";


____loclib.wesentmoneydelay = "Il processo sta richiedendo più tempo del solito, si prega di attendere";

____loclib.funetworkproblems = "Ci sono alcuni problemi con la connessione. Si prega di provare più tardi";

____loclib.pleasewait = "Si prega di attendere";
____loclib.next = "Prossimo";
____loclib.welcometopocketnet = "Benvenuto su "+appname+"";
____loclib.continue = "continua";

//user page

____loclib.rstate = "Reputazione";
____loclib.rprofile = "Profilo";
____loclib.rsettings = "Impostazioni";
____loclib.rwallet = "Portafoglio";
____loclib.raccounts = "Conti";
____loclib.rsystem = "Sistema";
____loclib.rconnection = "Connessione";
____loclib.pnetAddress = appname + " Indirizzo";
____loclib.profile = "Profilo";
____loclib.signout = "Esci";

//send

____loclib.postlabel = "Donazione per il post";
____loclib.donationlabel = "Donazione";
____loclib.donationwel = "Se vuoi ringraziare l'autore puoi donare dei PKOIN tramite " +appname+".";
____loclib.donationwela = "Transazione su " + appname + "";
____loclib.donationwelan = "Oppure puoi usare un altro sistema di pagamento di criptovalute";
____loclib.successfullycopiedaddress = "L'indirizzo è stato copiato con successo";

//wallet

____loclib.wrecieve = "Ricevi PKOIN condividendo l'indirizzo";
____loclib.wcopyshare = "Copia e condividi l'indirizzo:";
____loclib.wqrcode = "Codice Qr";
____loclib.wcopeaddress = "Copiare l'indirizzo";
____loclib.wcreatelink = "Oppure crea un link per il tuo pagamento";
____loclib.required = "Richiesto";
____loclib.wgetlink = "Ottieni il link";
____loclib.waddresses = "Indirizzi";
____loclib.waddress = "Indirizzo";
____loclib.wbalance = "Saldo";
____loclib.wpercente = "Percento";
____loclib.waddaddress = "Esplora un nuovo indirizzo Wallet";
____loclib.wrecieve = "Ricevi";
____loclib.wrecieveon = "Ricevi su";
____loclib.wcopyshareorcreate = "Copia e condividi l'indirizzo o crea un link di pagamento";
____loclib.wdgetlink = "Ottenere il link";
____loclib.wdqrcode = "Codice Qr";
____loclib.wdcopyaddress = "Copiare l'indirizzo";
____loclib.wdpleasefill = "Compila questi campi";
____loclib.wduseqr = "Usa questo codice QR per ricevere crypto";
____loclib.wdaddress = "Indirizzo";
____loclib.wdamount = "Importo";
____loclib.wdlabel = "Etichetta";
____loclib.wdmessage = "Messaggio";
____loclib.wsend = "Invia";
____loclib.calcfeesandsend = "Calcola le commissioni e invia";
____loclib.wstrfees = "Spese di transazione";
____loclib.wsfees = "Commissioni";

____loclib.wssendto = "INVIARE CRYPTO A";
____loclib.wssendb = "INVIA";

____loclib.tacaddress = "Indirizzo del conto";
____loclib.twallet = "Portafoglio";
____loclib.twalletaddresses = "Indirizzi del portafoglio";
____loclib.tTotal = "Totale";
____loclib.wsselect = "Seleziona la fonte dal menu";
____loclib.wsenter = "Inserire l'indirizzo o selezionare dal menu";
____loclib.wsreciever = "Indirizzo del destinatario";
____loclib.wsamount = "Importo";
____loclib.wsamountof = "Importo della transazione";
____loclib.wsincludefees = "Includere le tasse nell'importo";
____loclib.wsrecieverpay = "Da pagare da parte del destinatario";
____loclib.wssenderpay = "Da pagare da parte del mittente";
____loclib.wdselectfrom = "Selezionare dal menu";

____loclib.wdenteramount = "Inserisci l'importo";
____loclib.wdmessageplaceholder = "Per cosa è questa transazione?";
____loclib.wrenteraddress = "Inserisci l'indirizzo";
____loclib.wrenteraddressselect = "Inserire l'indirizzo o selezionare dal menu";
____loclib.wreturntoeallet = "TORNA AL PORTAFOGLIO";
____loclib.linkCreated = "LINK CREATO";
____loclib.waddresswascop = "L'indirizzo è stato copiato con successo";
____loclib.wqrcodecreated = "CODICE QR CREATO";
____loclib.wlinkcreating = "LINK CREATO";
____loclib.wqrcodecreating = "CREAZIONE CODICE QR";
____loclib.wdoptions = "OPZIONI";
____loclib.wssuccessfully = "Transazione inviata con successo";
____loclib.wscalculatefees = "CALCOLO COMMISSIONI";
____loclib.wsaddressnotv = "L'indirizzo non è valido";

//user profile
____loclib.uaddaddressdona = "Aggiungi indirizzo Per le donazioni";
____loclib.uaddaddressdonaplace = "Inserisci l'indirizzo";
____loclib.uchangeicon = "Carica l'immagine del profilo";
____loclib.utip1 = "Devi creare nome sulla blockchain prima di usare " + appname + "";
____loclib.utip2 = "Ti rimane solo un passo";
____loclib.upicset = "Imposta l'icona del profilo";
____loclib.upic = "Icona del profilo";
____loclib.uuserinfo = "Informazioni utente";
____loclib.usave = "Salva";
____loclib.ucancel = "Annulla";
____loclib.uwaitb = "Aspetta la conferma per salvare le informazioni";
____loclib.uchanges = "Non ci sono modifiche";
____loclib.uchangesvalid = "È necessario creare il nome utente";
____loclib.uname = "Nome";
____loclib.unickname = "Nickname";
____loclib.ulanguage = "Lingua";
____loclib.uabout = "Su di me";
____loclib.uwebsite = "Sito web";
____loclib.uaddresesd = "Indirizzi per le donazioni";
____loclib.usavechanges = "Vuoi salvare le tue modifiche?";

//ustate
____loclib.sreps = "Reputazione e limitazioni";
____loclib.sdisconnected = "Disconnesso dal nodo";
____loclib.suseractivation = "Attivazione utente";
____loclib.sprofile = "Profilo";
____loclib.spc = "Numero di messaggi";
____loclib.spv = "Conteggio dei messaggi video";
____loclib.ssc = "Conteggio delle stelle";
____loclib.ccc = "Conteggio dei commenti";
____loclib.crc = "Conteggio del tasso di commento";
____loclib.stp = "Periodo di prova";
____loclib.srep = "Reputazione";

//accounts
____loclib.aaddedacc = "Cambia account";
____loclib.acure = "Corrente";
____loclib.aaddacc = "Aggiungi account";
____loclib.ascheduler = "Scheduler";
____loclib.aused = "Questo indirizzo è già utilizzato in un altro pool di indirizzi";


//author
____loclib.sub = "Segui";
____loclib.unsub = "Smetti di seguire";
____loclib.joined = "Iscritto";
____loclib.shares = "CONDIVISIONE";
____loclib.uposts = "POSTI";
____loclib.myuposts = "I MIEI POSTI";
____loclib.followers = "FOLLOWERS";
____loclib.following = "Seguendo";
____loclib.settings = "GESTISCI";
____loclib.anofollowers = "Questo utente non ha followers";
____loclib.aynofollowers = "Non hai followers";
____loclib.anofollowing = "Questo utente non sta seguendo nessuno";
____loclib.aynofollowing = "Non stai seguendo nessuno";

____loclib.blockedusers = "Utenti bloccati";
____loclib.anoblocked = "Questo utente non ha bloccato nessuno";
____loclib.aynoblocked = "Non hai bloccato nessuno";

//lenta
____loclib.lloadmore = "Carica altri fantastici post!";
____loclib.lloadprev = "Carica nuovi fantastici post";


____loclib.lend = "Fine dei messaggi";
____loclib.zerop = "Attualmente non ci sono messaggi di questo autore";


____loclib.zeroy = "Non hai ancora pubblicazioni, condividi qualcosa!";



____loclib.llogin = "Devi effettuare il login prima di poter procedere";
____loclib.lcomlaindialog = "Sei sicuro di voler segnalare questo post?";
____loclib.lunsubscribe = "Vuoi davvero disiscrivere questo account?";
____loclib.lprivatepublic = "Vuoi fare un abbonamento privato o pubblico?";
____loclib.lprivate = "Privato";
____loclib.lpublic = "Pubblico";

//share
____loclib.newShare = "Nuovo post";
____loclib.firstShare = "Condividi il tuo primo post su " + appname + "";
____loclib.scaption = "Didascalia";
____loclib.whatsnew = "Cosa c'è di nuovo?";
____loclib.saddlink = "Aggiungi un link a un sito esterno o un video";
____loclib.saddimages = "Aggiungi immagini al post";
____loclib.sarticle = "Scrivere un articolo";
____loclib.stelegram = "Invia su Telegram";
____loclib.stimes = "Cancella messaggio";


____loclib.snothing = "Niente";
____loclib.sposttime = "Invia per tempo";
____loclib.spostnow = "Invia ora";
____loclib.stimenotselected = "Tempo non selezionato";
____loclib.spost = "Posta";
____loclib.sdate = "Data";
____loclib.stime = "Ora";
____loclib.snotags = "Aggiungi tag";
____loclib.expandvideo = "Clicca per espandere";
____loclib.emptymessage = "Il messaggio è vuoto";
____loclib.emptytags = "Si prega di aggiungere tag";
____loclib.emptyutxo = "nessun denaro";
____loclib.networkerror = "errore di rete";
____loclib.maximages = "Ti è permesso un massimo di 10 immagini";
____loclib.sharenow = "Vuoi condividere questo contenuto adesso?";
____loclib.pastdate = "Data passata";
____loclib.timenotselected = "Ora non selezionata";
____loclib.addtags = "Aggiungi tag";
____loclib.tnews = "notizie";
____loclib.timages = "immagini";
____loclib.tlinks = "link";
____loclib.tvideos = "video";
____loclib.tmarket = "mercato";
____loclib.tsport = "sport";

//menu
____loclib.signinmenu = "Accedi";
____loclib.signupmenu = "Iscriviti";
____loclib.aboutmenu = "scopri di più";

//footer
____loclib.aboutus = "Su di noi";



// Dialog Box Options
____loclib.daccept = "Accetta";
____loclib.dcancel = "Cancella";
____loclib.dyes = "Sì";
____loclib.dno = "No";
____loclib.dsa = "Non mostrare più";


// Messages

____loclib.transactionCome = "Transazione in arrivo";

____loclib.coinbaseSuccess = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest activity!"
}
____loclib.coinbaseSuccesspost = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest posts!"
}
____loclib.coinbaseSuccesscomment = function(v){
return "Congratulations, you have won " + v + " PKOIN for your latest comments!"
}
____loclib.userSent = function(v){
return "sent <b>" + v + " PKOIN</b> to you"
}

____loclib.coinbaseSuccesspostref = function(v){
return "Congrats, your referral just won " + v + " PKOIN for you!"
}
____loclib.coinbaseSuccesscommentref = function(v){
return "Congrats, your referral just won " + v + " PKOIN for you!"
}

____loclib.refferalUserMessage = "Congratulazioni! Hai salvato qualcuno dalla censura del web. Un po' di PKOIN sono in arrivo!";

____loclib.subscribeUserMessage = "ha iniziato a seguirti";
____loclib.unsubscribeUserMessage = "non ti segue più";
____loclib.gotoprofileMessage = "vai al profilo";
____loclib.upvoteShareMessage = "ha votato il tuo post";

____loclib.upvoteCommentMessage = "ha messo like al tuo commento";

// Errors

____loclib.error = "Errore";
____loclib.checkScoreError = "Il tuo account non è stato trovato nella blockchain. Devi riempire le informazioni del profilo richieste prima di usare " +appname+". Vuoi farlo ora?";
____loclib.checkScoreErrorLight = "L'account non è attivato";
____loclib.timestamperror = "Il tempo nell'applicazione e nel nodo non corrispondono";

// Error Page 404
____loclib.e404 = "ERRORE 404";
____loclib.e404e = "Pagina non trovata. Torna alla pagina principale";
____loclib.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " posts in a 24 hour period";
}
____loclib.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " grading in a 24 hour period";
}

____loclib.doubleLimitLight = "Hai già valutato questo";

____loclib.SelfSubscribeError = "Non puoi iscriverti";
____loclib.DoubleSubscribeError = "Segui già questo utente";
____loclib.InvalideSubscribeError = "Non stai ricevendo le notifiche di questo utente";
____loclib.ChangeInfoLimitError = "Puoi modificare il tuo profilo solo una volta all'ora. Per favore aspetta e riprova.";
____loclib.SelfScoreError = "Non puoi valutare il tuo stesso post";

____loclib.unexperror10 = "Errore sconosciuto (10)";
____loclib.unexperror11 = "Errore sconosciuto (11)";
____loclib.unexperror12 = "Errore sconosciuto (12)";

____loclib.networkerror = "Ci sono alcuni problemi con il nodo";

____loclib.canSpendError = "Devi aspettare che la tua precedente transazione si cancelli nella blockchain. Per favore aspetta";
____loclib.noMoneyError = "Non puoi fare azioni con saldo del conto pari a zero";



____loclib.waitConf = "Devi aspettare che la tua precedente transazione si cancelli nella blockchain";
____loclib.postWaitConf = "Il post è in attesa di una conferma nella blockchain";
____loclib.actionWaitConf = "L'azione è in attesa di una conferma sulla blockchain";


// notifications

____loclib.ntnow = "Adesso";
____loclib.ntlasthour = "Nell'ultima ora";
____loclib.nttoday = "Oggi";
____loclib.ntmounth = "Questo mese";
____loclib.ntearlier = "Più di un mese fa";


____loclib.nodeWalletAdd = "L'aggiunta di un indirizzo può richiedere del tempo. Continuare?";
____loclib.nodeEnableNoteHeader = "Nota";
____loclib.nodeEnableNote = "L'accensione di un nodo può richiedere fino a 5GB di RAM. Assicurati di averne abbastanza. Buon mining!";


/// 1301

____loclib.address = "Indirizzo";
____loclib.privatekey = "Chiave privata";
____loclib.qrcode = "Codice QR";
____loclib.addaccount = "Aggiungi account";
____loclib.entermnimo = "Inserisci la frase mnemonica o la chiave privata";
____loclib.add = "Aggiungi";
____loclib.e13011 = "Ora continuerai la registrazione dopo aver installato " +appname+" Desktop.";
____loclib.e13012 = "Se " +appname+" non ha iniziato il download, clicca qui per installarlo.";
____loclib.e13013 = "Scrivi una didascalia per l'immagine";
____loclib.e13014 = "Questo file non è in un formato supportato:";
____loclib.e13015 = "Questo file è troppo grande:";
____loclib.e13016 = "Incolla un link di YouTube o Vimeo e premi Invio";
____loclib.e13017 = "Caricamento sulla Blockchain";
____loclib.e13018 = "Vuoi davvero rimuovere questo articolo?";
____loclib.e13019 = "Nuovo";
____loclib.e13020 = "Scrivi un nuovo articolo";
____loclib.youarefollowing = "Stai seguendo";
____loclib.follow = "Segui";
____loclib.blocked = "Bloccato";
____loclib.e13021 = "Mostra di più";
____loclib.blockuser = "Blocca utente";
____loclib.unblockuser = "Sblocca Utente";
____loclib.e13022 = "Vuoi davvero togliere il follow all'utente?";
____loclib.unfollow = "Deseleziona";
____loclib.unblock = "Sblocca";
____loclib.share = "Condividi";
____loclib.info = "Info";
____loclib.copyLink = "Copia il link diretto";
____loclib.includeRefLink = "Includi link di riferimento";
____loclib.e13023 = "Vuoi davvero sbloccare l'utente?";
____loclib.e13024 = "La tua chiave di accesso privata";
____loclib.e13025 = "Crea un nuovo account";
____loclib.e13026 = "Unisciti a "+appname+"";

____loclib.e13027 = "Resta loggato";
____loclib.e13028 = "Hai inserito una chiave privata non valida";
____loclib.e13029 = "Il messaggio è vuoto";
____loclib.e13030 = "I commenti hanno un limite di 1000 caratteri per commento";
____loclib.e13031 = "Condividi commento";
____loclib.e13032 = "Vuoi davvero cancellare il tuo commento?";
____loclib.e13033 = "Il commento è stato rimosso";
____loclib.e13034 = "Sì";
____loclib.e13035 = "No, cancella";
____loclib.hide = "Nascondi";
____loclib.e13036 = "Mostra i commenti precedenti";
____loclib.e13037 = "Risponde";
____loclib.remove = "Rimuovi";
____loclib.e13038 = "Commenta ora";
____loclib.e13039 = "Commenta ora";
____loclib.e13040 = "Non hai i privilegi per commentare";
____loclib.complain = "Segnala";
____loclib.next = "Prossimo";
____loclib.post = "Invia";
____loclib.e13041 = appname + " - Connessione";
____loclib.e13042 = appname + " Proxy";

____loclib.e13043 = appname+ " - Nodi";
____loclib.e13044 = "Aggiungi nodo";
____loclib.e13045 = "Nodi non trovati";
____loclib.e13046 = "Indirizzo";
____loclib.e13047 = "WS";
____loclib.e13048 = "Nome";
____loclib.e13049 = "Stato";
____loclib.e13050 = "Proxy non trovato";
____loclib.e13051 = "Non usare il proxy";
____loclib.e13052 = "Impossibile connettersi al proxy";
____loclib.e13053 = "Impossibile connettersi al nodo";
____loclib.e13054 = "Aggiungi Proxy";
____loclib.e13055 = "Modifica Proxy";
____loclib.save = "Salva";
____loclib.e13056 = "Nodo Host";
____loclib.close = "Chiudi";
____loclib.e13057 = "Compila tutti i campi";
____loclib.e13058 = "Hai già questo proxy nella lista.";
____loclib.delete = "Cancella";
____loclib.e13059 = "Vuoi davvero cancellare questo proxy dalla lista?";
____loclib.e13060 = "Elenco proxy";
____loclib.e13061 = "Vuoi veramente smettere di usare il Proxy. Non è sicuro (connessione HTTP)";

____loclib.e13062 = "Modifica nodo";
____loclib.onproxy = "Su Proxy";
____loclib.locally = "Localmente";
____loclib.nodehost = "Nodo Host";
____loclib.e13063 = "Porta RPC";
____loclib.e13064 = "Porta WS";
____loclib.e13065 = "Nome del nodo";
____loclib.e13066 = "Inserire il nome del nodo";
____loclib.e13067 = "Accesso RPC";
____loclib.e13068 = "Login per l'autorizzazione RPC";
____loclib.e13069 = "Password RPC";
____loclib.e13070 = "Password per l'autorizzazione PRC";
____loclib.e13071 = "Si prega di compilare tutti i campi";
____loclib.e13072 = "Vuoi davvero cancellare questo nodo dalla lista?";
____loclib.e13073 = "Vuoi veramente smettere di usare il Proxy. Non è sicuro (connessione HTTP)";
____loclib.notselected = "Non selezionato";
____loclib.donation = "donazione";
____loclib.e13074 = "In attesa di fondi. L'indirizzo sarà valido per";
____loclib.sminutes = "minuti";
____loclib.e13075 = "Il tempo per questa transazione è scaduto.";
____loclib.reactivate = "Riattivare";
____loclib.e13076 = "Scansiona questo codice per inviare";
____loclib.back = "Indietro";
____loclib.e13077 = "Aggiungi il tuo profilo alla lista dei donatori";
____loclib.e13078 = "Perché chiediamo donazioni?";
____loclib.e13079 = "Abbiamo trascorso più di 14 mesi nel tempo libero dal lavoro a tempo pieno per portare " +appname+" alle persone. Oltre al tempo e allo sforzo, abbiamo messo i nostri soldi per aiutare a lanciare la piattaforma. Ora abbiamo bisogno che la comunità si faccia avanti e ci aiuti a crescere.";
____loclib.e13080 = "Come verranno utilizzati i fondi?";
____loclib.e13081 = "I fondi saranno utilizzati per acquistare pubblicità e assumere alcuni esperti specifici per rendere " +appname+" ancora più sicuro. L'attuale team di sviluppo non riceverà nessuna di queste donazioni. Ove possibile, pubblicheremo qui come abbiamo usato i fondi. ";
____loclib.e13082 = "Cosa otterrai per la tua donazione oltre a sapere che hai sostenuto la libertà:";
____loclib.e13083 = "Come segno della nostra gratitudine per la donazione, riceverai un regalo in una certa quantità di Pocketcoin";
____loclib.e13084 = "Inoltre, quando costruiremo la chat di gruppo, sarai membro di un gruppo speciale di donatori che avranno accesso diretto al team di " + appname + ", anche quando la piattaforma crescerà";
____loclib.e13085 = "Il link al tuo profilo" + appname + " sarà elencato di seguito portando più persone ai tuoi post (a meno che tu non ci chieda di non farlo)";
____loclib.e13086 = "Supporta il web decentralizzato ora";
____loclib.e13087 = "Bitcoin, Litecoin";

____loclib.e13088 = "Membri "+appname+" che hanno donato per sostenere "+appname+"";
____loclib.thankyou = "Grazie!";
____loclib.e13089 = "Se vuoi che elenchiamo il tuo profilo " +appname+" nella lista dei donatori, per favore inviaci un messaggio con i dettagli della tua donazione";
____loclib.e13090 = "Aggiungimi alla lista dei donatori";
____loclib.e13091 = "Oppure puoi inviarci un'email a";
____loclib.e13092 = "con la tua chiave pubblica e l'importo.";
____loclib.finish = "Finisci";
____loclib.e13093 = "Per favore scegli il modo di donazione";
____loclib.e13094 = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare (errore: 0001)";
____loclib.e13095 = "Grazie per sostenere il nostro lavoro per la libertà. Faremo in modo che ogni centesimo conti.";
____loclib.e13096 = "Si prega di compilare l'importo della donazione";
____loclib.e130961 = "Quanto vuoi inviare?";
____loclib.e130962 = "Saldo disponibile:";

____loclib.e13097 = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare (errore: 0002)";
____loclib.e13098 = "Aggiungi un link a un sito esterno o a una risorsa";
____loclib.e13099 = "Carica immagini";
____loclib.e13100 = "Clicca qui per selezionare i file da caricare";
____loclib.e13101 = "o trascina e rilascia";
____loclib.e13102 = "Aggiungi un link a un sito esterno";
____loclib.e13103 = "Url non valido";
____loclib.e13104 = "Massimo 6 immagini consentite";
____loclib.e13105 = "Gestione del nodo";
____loclib.e13106 = appname + " - Nodo";
____loclib.e13107 = "La gestione dei nodi può essere effettuata con l'applicazione";
____loclib.e13108 = "Non c'è connessione con l'interfaccia proxy Electron";

____loclib.e13109 = "Inserisci le parole nell'immagine per ricevere PKOIN e continuare la registrazione";
____loclib.e13110 = "Inserire le parole";
____loclib.poll = "Crea sondaggio";
____loclib.next = "Avanti";
____loclib.refresh = "Aggiorna";
____loclib.e13111 = "Aggiungi la tua email per ricevere gli ultimi aggiornamenti di " +appname+"";
____loclib.e13112 = "Inserisci l'email";
____loclib.e13113 = "Aggiungi email";
____loclib.skip = "Salta";
____loclib.e13114 = "C'è qualche problema con la tua registrazione a causa di attività sospetta.";
____loclib.e13115 = "Per favore, invia un'email";
____loclib.e13116 = "per ricevere crypto e aprire il tuo conto.";
____loclib.e13117 = "Controlla il saldo";
____loclib.joinnow = "Iscriviti ora";
____loclib.loading = "Caricando";
____loclib.e13118 = "Le parole non corrispondono";
____loclib.e13119 = "Aggiungi l'email e continua";
____loclib.e13120 = "Applicazioni";
____loclib.e13121 = "Non ci sono immagini qui";
____loclib.e13122 = "Ultimi commenti";

____loclib.e13123 = "Mostra altri post";
____loclib.e13124 = "Altri fantastici post di " + appname + "!";
____loclib.e13125 = "La sezione Top Post è vuota!";
____loclib.e13126 = "I post delle persone che segui saranno mostrati qui";
____loclib.e13127 = "I post delle persone che segui saranno mostrati qui";
____loclib.e13128 = "I post delle persone che segui saranno mostrati qui";
____loclib.registration = "Registrazione";
____loclib.editpost = "Modifica post";
____loclib.removepost = "Rimuovi post";
____loclib.opennewwindow = "Apri post in una nuova finestra";


____loclib.unsubscribe = "Cancella l'iscrizione";
____loclib.startchat = "Inizia chat";
____loclib.reportpost = "Segnala post";
____loclib.donate = "Dona";
____loclib.blockuser = "Blocca utente";
____loclib.more = "Altro";
____loclib.showmore = "Mostra di più";
____loclib.e13129 = "Immagini allegate";
____loclib.e13130 = "Modificato";
____loclib.e13131 = "Hai bloccato questo utente";
____loclib.e13132 = "valutato";
____loclib.e13133 = "Condividi";
____loclib.e13134 = "Non ci sono risultati per questa stringa di ricerca";
____loclib.e13135 = "L'utente non ha la chiave privata";
____loclib.e13136 = "Tutti i post";
____loclib.e13137 = "Le mie sottoscrizioni"// Questo è l'equivalente di un 'News feed'. Non cambiare la parola 'Pocket' però, è una caratteristica di "+appname+".";
____loclib.e13138 = "Top post";
____loclib["Top Posts Over"] = "Top post su";
____loclib.topnext = "Prossimo";
____loclib.topprevious = "Precedente";
____loclib.topactual = "Torna agli ultimi";
____loclib.e13139 = "Cerca su " +appname+"";
____loclib.e13140 = "Cerca su";
____loclib.notifications = "Notifiche";
____loclib.showall = "Mostra tutti";
____loclib.e13141 = "Non hai notifiche";

____loclib.recommendations = "Suggerimenti";
____loclib.e13142 = "Ho salvato la mia chiave, non ricordarmelo più";
____loclib.e13143 = "Importante!";
____loclib.e13144 = "Copia";
____loclib.e13145 = "Salva la chiave sul dispositivo";
____loclib.e13146 = "Fine dei post";
____loclib.e13147 = "Condividi";
____loclib.e13148 = "Vuoi davvero segnalare questo post?";
____loclib.e13149 = "valutazioni degli utenti";
____loclib.e13150 = "Valutazione del post";
____loclib.e13151 = "Nessuno ha valutato questo post";
____loclib.e13152 = "Punteggi degli utenti";
____loclib.e13153 = "Salta e vai al sito web";
____loclib.e13154 = "Le tue informazioni di accesso";
____loclib.e13155 = "Per utilizzare "+appname+" è necessario generare la tua chiave crittografica privata che sostituisce il classico login con password dei social network tradizionali.";
____loclib.users = "Utenti";
____loclib.userstx = "Utenti";
____loclib.user = "Utente";
____loclib.postscount = "Numero di Post";
____loclib.about = "Informazioni su";
____loclib.e13156 = "Prossimi risultati";
____loclib.posts = "Post";
____loclib.disablePreview = "Disattivare l'anteprima dei link";
____loclib.e13157 = "Cerca per";
____loclib.e13158 = "non ha risultati";
____loclib.e13159 = "La frase di ricerca è vuota";
____loclib.repost = "Repost";
____loclib.e13160 = "Ciao Bastyards!";

____loclib.e13161 = "Aggiungi tag per il tuo post";
____loclib.e13162 = "Puoi inserire massimo 5 tag";
____loclib.e13163 = "Non ci sono modifiche nel post";
____loclib.e13164 = "Aggiungi qualche parola per spiegare il tuo link. Di cosa si tratta? Perché è importante? Qual è la tua opinione?";
____loclib.e13165 = "Il tuo link al video non è valido. Per favore, carica un URL video valido.";
____loclib.e13166 = "Hai salvato";
____loclib.e13167 = "persone dalla censura del web";
____loclib.e13168 = "Guadagna PKOIN per ogni iscrizione attraverso il tuo link";
____loclib.e13169 = "Collegamento diretto";
____loclib.copy = "Copia";
____loclib.e13170 = "Includere " + appname + " sign up call-to-action";
____loclib.more = "Altro";
____loclib.e13171 = 'Finalmente! Ho detto "basta" ai soliti social media e alle informazioni controllate! Entra anche tu in Bastyon.com e dì addio alla censura. Un social network libero e basato sulla blockchain. Clicca qui per iniziare!';
____loclib.e13172 = "Ti voglio invitare ad un nuovo social network decentralizzato chiamato " + appname + " ! Troverai una tonnellata di cose interessanti e se ti iscrivi, entrambi otterremo un bonus in criptovaluta PKOIN!";
____loclib.e13173 = "Invia per e-mail";
____loclib.e13174 = "Condividi sui social";
____loclib.e13175 = "Tag popolari";
____loclib.e13176 = "Tipo di indirizzo";
____loclib.e13177 = "Carica foto";

____loclib.requiredfields = "campi obbligatori";
____loclib.e13178 = "Non collegato al tuo profilo";
____loclib.e13179 = "Elenco non utilizzato";
____loclib.e13180 = "La tua fattura è stata creata con successo";
____loclib.e13181 = "Si è verificato un errore durante il processo";
____loclib.e13182 = "Blockchain Explorer";
____loclib.e13183 = "Supporto";
____loclib.e13184 = "Continua la registrazione";
____loclib.e13185 = "Connessione persa";
____loclib.e13186 = "Modifica profilo";
____loclib.e13187 = "Contenuti";
____loclib.e13188 = "Salva la tua chiave privata (Private Key) che sostituisce il tradizionale login con password";
____loclib.e13189 = "Esci e dimentica la mia chiave per sempre! ATTENZIONE: IRREVERSIBILE";
____loclib.e13190 = "Tema di " + appname + "";
____loclib.e13191 = "Imposta tema";
____loclib.e13192 = "Livello";
____loclib.e13193 = "BONUS";
____loclib.e13194 = "Reputazione e ricompense";
____loclib.e13195 = "Limitazioni";
____loclib.с = "Occupa molto";
____loclib.e13197 = "Ricevi PKOIN";
____loclib.e13198 = "Il tempo di attesa è circa";
____loclib.e13199 = "Unisciti a " + appname + " Ora";

____loclib.e13200 = "Torna a " + appname + "";
____loclib.e13201 = "ISCRIVITI ALLA VERSIONE BETA";
____loclib.e13202 = "Il beta test di " + appname + " inizierà il 24 gennaio";
____loclib.e13203 = "Grazie per esserti iscritto alla lista e-mail di beta test di " + appname + ". Non è obbligatorio utilizzare "+appname+", tuttavia, useremo questa email per inviare i tuoi sondaggi per migliorare la piattaforma. Grazie per aver contribuito a plasmare il futuro di internet.";
____loclib.e13204 = appname + " indirizzo per ricevere";
____loclib.e13205 = "Parametri";
____loclib.e13206 = "Ricevi l'importo in PKOIN";
____loclib.e13207 = "Invia importo";
____loclib.e13208 = "Disponibile";
____loclib.e13209 = "Elenco crowdfunding";
____loclib.e13210 = "Nuovo contratto";
____loclib.e13211 = "Copia il link e condividi";
____loclib.amount = "Importo";
____loclib.label = "Etichetta";
____loclib.message = "Messaggio";
____loclib.copylink = "Copia collegamento";
____loclib.sendMessenger = "Invia via messenger";
____loclib.e13211 = "Si prega di compilare questi campi";
____loclib.e13212 = "Crea codice QR";
____loclib.e13213 = "Indirizzo per ricevere";
____loclib.process = "Elabora";
____loclib.source = "Fonte";
____loclib.yourmessage = "Il tuo messaggio";
____loclib.e13214 = "Importo in PKOIN";
____loclib.currency = "Valuta";


____loclib.e13215 = "Selezionare la valuta";
____loclib.e13216 = "Importo";
____loclib.e13217 = "Il tempo per questa transazione è scaduto.";
____loclib.e13218 = "In attesa delle conferme della blockchain";
____loclib.e13219 = "Invia PKOIN a te";
____loclib.e13220 = "PKOIN consegnati";
____loclib.errorreload = "Qualcosa è andato storto. Si prega di ricaricare la pagina e riprovare";
____loclib.e13221 = "Vuoi davvero cancellare le informazioni di questa transazione? La transazione non può essere fermata";
____loclib.e13222 = "Scarica Desktop App - questo è il modo più resistente alla censura per utilizzare " +appname+". Anche se i siti web vengono chiusi, l'applicazione desktop verrà comunque eseguita direttamente attraverso i nodi.";
____loclib.e13223 = "Scarica " + appname + " per Windows";
____loclib.e132232 = "Scarica " + appname + " per macOs";
____loclib.e13224 = "Scaricare " + appname+" per Linux";
// #NAME?
____loclib.e13226 = "Scaricare Nodo";
____loclib.e13227 = "Scaricare " + appname + " Node per Windows";
____loclib.e13228 = "Scaricare " + appname + " Nodo per Linux";
____loclib.e13229 = "Chiave privata non valida";
____loclib.e13230 = "Errore di connessione non definito";

____loclib.e13231 = "Connessione persa";
____loclib.e13232 = "Impossibile connettersi con il nodo";
____loclib.e13233 = "Questo commento è stato rimosso";
____loclib.e13234 = "Errore Opreturn/41";
____loclib.e13235 = "Non puoi valutare il commento due volte";
____loclib.e13236 = "Questo commento è stato rimosso";
____loclib.e13237 = "Non puoi valutare te stesso";
____loclib.e13238 = "Errore di invio del commento. Si prega di attendere e riprovare/ 37";
____loclib.e13239 = "Errore nell'invio del commento. Stai rispondendo a un commento che è stato cancellato";
____loclib.e13240 = "Il commento a cui stai rispondendo è stato cancellato dall'utente";
____loclib.e13241 = "Questo commento è troppo lungo, per favore dividilo";
____loclib.e13242 = "Sei stato bloccato da questa persona, non potrai commentare i suoi post";
____loclib.e13243 = "Hai raggiunto il tuo limite di commenti upvote in 24 ore";
____loclib.e13244 = "Hai raggiunto il tuo limite di modifiche ai commenti in 24 ore";
____loclib.e13245 = "Hai raggiunto il tuo limite di commenti in 24 ore";
____loclib.e13246 = "Stai cercando di modificare il post di qualcun altro";
____loclib.e13247 = "Hai raggiunto il limite di modifiche ai post in 24 ore";
____loclib.e13248 = "Puoi modificare solo una volta per blocco. Per favore aspetta un minuto, poi riprova";
____loclib.e13249 = "Non puoi bloccare te stesso";
____loclib.e13250 = "Hai già bloccato questo utente";
____loclib.e13251 = "Non hai bloccato questo utente";
____loclib.e13252 = "La transazione è corrotta";
____loclib.e13253 = "Non puoi taggare a te stesso";
____loclib.e13254 = "Questo nome utente è troppo lungo";
____loclib.e13255 = "Questo nome utente è già in uso";
____loclib.e13256 = "Questo post è troppo lungo, per favore spezzalo.";
____loclib.e13257 = "Il tuo punteggio di reputazione di " + appname + " non permette ancora le segnalazioni";
____loclib.e13258 = "Hai raggiunto il limite di segnalazioni in 24 ore";

____loclib.e13259 = "Non puoi segnalare il tuo stesso post";
____loclib.e13260 = "Hai già segnalato questo post";
____loclib.e13261 = "Salva la chiave";
____loclib.e13262 = "Più tardi";
____loclib.e13263 = "Iscriviti e attiva le notifiche per questo utente";
____loclib.e13264 = "Iscriviti senza notifiche";
____loclib.e13265 = "Il tuo Nickname non è più disponibile, scegline un altro";
____loclib.e13266 = "Tema chiaro";
____loclib.e13267 = "Tema scuro";
____loclib.e13268 = "Coinstake win";
____loclib.e13269 = "Transazioni ricevute";
____loclib.e13270 = "Voti alti ricevuti";
____loclib.e13271 = "Commento ricevuto";
____loclib.e13272 = "Risposta ricevuta";
____loclib.e13273 = "Nuovi followers";
____loclib.e13274 = "Utenti invitati";
____loclib.e13275 = "Punteggio dei commenti";
____loclib.e13276 = "Mostra i video incorporati";
____loclib.e13277 = "Autoplay video";
____loclib.e13278 = "Avvia " + appname + " automaticamente";
____loclib.e13279 = "Chat";
____loclib.e13280 = "Tags";
____loclib.e13281 = "Ultimi commenti";
____loclib.e13282 = "Token per bot di Telegram";
____loclib.e13283 = "Pubblica dal canale Telegram";
____loclib.e13284 = "Aggiungi il bot nella chat e seleziona";
____loclib.e13285 = "Chiedi prima di postare da Telegram";
____loclib.e13286 = "Chiedi prima di inviare a Telegram";
____loclib.e13287 = "Invia al canale Telegram";
____loclib.video = "Video";
____loclib.e13288 = "Pagina principale dei widget";
____loclib.e13289 = "Integrazione con Telegram";

____loclib.system = "Sistema";
____loclib.e13290 = "Vuoi seguire";
____loclib.e13291 = "Vuoi davvero inviare un messaggio a Telegram?";
____loclib.send = "Invia";
____loclib.e13292 = "Hai già un nodo su questo host";
____loclib.e13293 = "Errore interno";
____loclib.e13294 = "Abilitazione del database PGSQL";
____loclib.e13295 = "Host DB";
____loclib.e13296 = "Porta DB";
____loclib.e13297 = "DB Max";
____loclib.e13298 = "DB Idle Timeout, ms";
____loclib.e13298 = "Nome DB";
____loclib.e13300 = "Utente DB";
____loclib.e13031 = "Password del DB";
____loclib.e13302 = "Server proxy su";
____loclib.e13303 = "Porta del server proxy https";
____loclib.e13304 = "Porta del server proxy wss";
____loclib.e13305 = "Chiave SSL del server, pem";
____loclib.e13306 = "Cert SSL del server, pem";
____loclib.e13307 = "Passphrase SSL del server";
____loclib.e13308 = "Firebase admin SDK";
____loclib.e13309 = "Il tuo indirizzo Crane";
____loclib.e13310 = "Abilita Captcha";
____loclib.e13311 = "Abilita il limitatore Ip";
____loclib.e13312 = "Server";

____loclib.e13313 = "Database, PG sql";
____loclib.e13314 = "Firebase";
____loclib.e13315 = "Altro";
____loclib.e13316 = "Abilita";
____loclib.e13317 = "Percorso binario";
____loclib.e13318 = "Percorso di configurazione";
____loclib.e13319 = "Percorso dati";
____loclib.e13320 = "Indirizzo di stacking";
____loclib.e13321 = "Importa l'indirizzo dell'account al nodo per lo stacking";
____loclib.e13322 = "Stato";
____loclib.e13323 = "Indirizzi di stacking";
____loclib.e13324 = "Ultimo blocco";
____loclib.control = "Controllo";
____loclib.setup = "Impostazione";
____loclib.e13325 = "Vuoi davvero pubblicare messaggi da Telegram?";
____loclib.e13326 = "Pubblica";
____loclib.e13327 = "Vuoi davvero usare di nuovo il proxy?";
____loclib.e13328 = "ha messo mi piace al tuo commento!";
____loclib.e13329 = "Nuovo like al tuo commento";
____loclib.e13330 = "ha condiviso il tuo post";
____loclib.e13331 = "ha condiviso il tuo post";
____loclib.e13332 = "ha un nuovo post";
____loclib.e13332v = "ha un nuovo video";
____loclib.e13333 = "Transazione in arrivo";
____loclib.e13334 = "Congratulazioni, hai vinto";
____loclib.e13335 = "PKOIN per il tuo ultimo";
____loclib.e13336 = "con messaggio";
____loclib.e13337 = "ha commentato il tuo post";
____loclib.e13338 = "ha risposto al tuo commento";
____loclib.reply = "Rispondi";
____loclib.e13339 = "Hai salvato qualcuno dalla censura del web. Ci sono dei PKOIN in arrivo!";
____loclib.e13340 = "Congratulazioni!";
____loclib.e13341 = "ti segue";
// <% = "e("e13352")%> <%";
____loclib.e13342 = "Nuovo follwower";
____loclib.e13343 = "ha votato il tuo post";
____loclib.e13344 = "Nuovo voto";
____loclib.e13345 = "ti ha inviato un messaggio privato";

____loclib.e13346 = "Hai nuovi messaggi";
____loclib.e13347 = "Sono disponibili aggiornamenti per " + appname + ". Aggiorna ora?";
____loclib.e13348 = "No, più tardi";
____loclib.e13349 = "Sono disponibili aggiornamenti per " + appname + ". Vai alla pagina per scaricare la nuova versione?";
____loclib.e13350 = "Iscriviti a " + appname + " e guadagna PKOIN adesso.";
____loclib.e133512 = "Scrivi qualche parola su di te per aiutare le persone a decidere se vogliono seguirti";
____loclib.e13351 = appname + " chat";
____loclib.e13352 = "Non puoi accedere alla chat";

____loclib.e14001 = "Lingua dei post";
____loclib.e14002 = "Sei sicuro di voler cancellare il post?";
____loclib.e14003 = "Tecnico";
____loclib.e14004 = "Dove scarico l'app?";
____loclib.e14005 = "Dove scarico il software per il nodo?";
____loclib.e14006 = "Clicca su " + appname + "Setup.exe";
____loclib.e14007 = "Per qualsiasi domanda scrivi a core@pocketnet.app";
____loclib.e14008 = ""+appname+"";
____loclib.e14009 = "Vedo un indirizzo PN e un indirizzo del portafoglio... entrambi questi indirizzi sono sulla blockchain PN?";
____loclib.e14010 = "L'indirizzo PN è quello usato per postare contenuti e usare il social network in generale. Conserva anche le monete che vinci per i tuoi post altamente valutati.";
____loclib.e14011 = "Gli indirizzi del portafoglio servono a conservare il resto delle monete.";
____loclib.e14012 = 'Posso collegarmi al mio profilo o alla mia "pagina"? In modo che io possa pubblicarlo nella mia comunità per attirare i membri.';
____loclib.e14013 = "Nel browser, vai al tuo profilo cliccando sull'avatar in alto a destra e copia semplicemente l'indirizzo del browser, tutti quelli che si iscriveranno da quel link ti seguiranno automaticamente e tu riceverai effettivamente delle ricompense.";
____loclib.e14014 = "Sul desktop, da un'applicazione desktop vai al tuo profilo, una volta lì, ci saranno tre icone a destra del tuo avatar prima ci sarà un portafoglio con il numero di monete, poi una campana con le notifiche e una terza è una croce verde icona clicca su quella croce verde e clicca copia, invia quel link in giro tutti coloro che si iscrivono ti seguiranno e otterrai ricompense.";
____loclib.e14015 = "Il sistema delle stelle. c'è un limite su quante stelle una persona deve dare alla gente?";
____loclib.e14016 = "Ci sono alcuni limiti. Ma man mano che la tua reputazione cresce puoi dare sempre più voti. Questo è fatto, così i bot non rompono la nostra blockchain. Inizialmente si ottengono 100 valutazioni ogni 24 ore. Man mano che la tua reputazione cresce (questo accade postando e ricevendo voti), allora fai 200 valutazioni al giorno.";
____loclib.e14017 = "Tra quanto tempo potrò aggiornare il mio profilo?";
____loclib.e14018 = "Puoi aggiornare il tuo profilo una volta ogni ora.";
____loclib.e14019 = "C'è un Desktop Linux?";
____loclib.e14020 = "Sì, è in lavorazione da 2-3 settimane mentre il beta test procede.";
____loclib.e14021 = "Dove salvate i contenuti video?";
____loclib.e14022 = "Stiamo lavorando sull'archiviazione dei video, nel frattempo puoi condividere da Bitchute, Youtube, Vimeo e altre fonti video.";
____loclib.e14023 = "C'è un'applicazione mobile?";
____loclib.e14024 = "Sì. Ma incoraggiamo fortemente tutti a scaricare anche l'app per il desktop, dato che, a differenza dell'app per Android o iPhone, non può esservi tolta da Google o Apple.";
____loclib.e14025 = "Potete dirmi qual è il limite di post ogni giorno o ora?";
____loclib.e14026 = "Abbiamo alcune limitazioni, ma dopo averla testata abbiamo aumentato i limiti. All'inizio puoi fare 15 post e rilasciare 100 valutazioni ogni 24 ore. Una volta che la tua reputazione supera i 50, potrai fare fino a 30 post e 200 valutazioni ogni 24 ore.";
____loclib.e14027 = "Cos'è la reputazione e come si calcola?";
____loclib.e14028 = "La tua reputazione è la somma delle tue valutazioni calcolate nel modo seguente. Nota che gli utenti con una reputazione inferiore a 50 non influiscono sulla reputazione o sulle vincite di monete di nessuno. Possono valutare il contenuto, ma questo non influisce sulla reputazione.";
____loclib.e14029 = "Quindi, se hai due valutazioni a 5 stelle e una a 1 stella, il totale sarà";
____loclib.e14030 = "C'è un modo per cancellare o modificare un post?";
____loclib.e14031 = "Non a questo punto, in quanto è incorporato nella blockchain. Tuttavia, stiamo lavorando su una funzione per creare una transazione di sovrascrittura così come &#10075hide&#10076 transazione, che si tradurrebbe effettivamente per modificare o cancellare.";
____loclib.e14032 = "C'è un modo per cercare un utente?";
____loclib.e14033 = "Clicca sulla lente d'ingrandimento in alto e cerca per nome utente o per parole chiave.";
____loclib.e14034 = "Come si fa a seguire qualcuno?";
____loclib.e14035 = "Accanto all'autore del post (in cima al post) c'è un link Follow, puoi trovare i suoi post in Top posts (fiamma rossa in cima alla pagina). Presto vedrai anche il feed Subscriptions, che sarà diverso dal feed principale. Il feed principale sarà tutto ciò che chiunque pubblica cronologicamente, ma il feed delle sottoscrizioni conterrà solo i post delle persone che segui. Quindi, andrai nel feed generale alla ricerca di buoni contenuti, anche se potrebbe non piacerti tutto. Poi seleziona quelli che vuoi tenere. Un po' come la pesca :)";
____loclib.e14036 = "Può essere utilizzato su Brave o Duck Duck go browser?";
____loclib.e14037 = appname + " should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab "+appname+"Setup.exe here: https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta). It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.";
____loclib.e14038 = "Possiamo rispondere ai nostri/e altri/e post?";
____loclib.e14039 = "Sì, i commenti sono live sotto ogni post.";
____loclib.e14040 = "Come aggiungere un tag ad un post?";
____loclib.e14041 = "Basta digitare nel campo tag e premere invio. Non c'è bisogno di specificare #, verrà aggiunto automaticamente.";
____loclib.e14042 = "Come posso usare l'indirizzo pubblico?";
____loclib.e14043 = "Your public address is what "+appname+" uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. "+appname+" uses the same exact cryptography as Bitcoin.";
____loclib.e14044 = "Will there be a downloadable executable for Mac?";
____loclib.e14045 = "Yes - we are working of Mac platform. Target is for mid-April.";
____loclib.e14046 = "Pocketcoin";
____loclib.e14047 = "What can I do with Pocketcoin?";
____loclib.e14048 = "Currently you can win it or send as a gift. However, if and when "+appname+" takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token.";
____loclib.e14049 = "Is Pocketcoin like a share of stock in "+appname+"?";
____loclib.e14050 = "Definitely no. " + appname + " is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, "+appname+" will include a marketplace where goods and services will be sold directly for Pocketcoin";
____loclib.e14051 = "Can I buy additional Pocketcoin?";
____loclib.e14052 = "Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise " + appname + " to the world. So, by buying a Pocketcoin you are positioning yourself for success of "+appname+", but just as importantly you are helping "+appname+" achieve this success. All major social networks had billion dollar advertising budgets. "+appname+" was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now.";
____loclib.e14053 = "Can I buy Pocketcoin for US Dollars or other fiat currency?";
____loclib.e14054 = "No.";
____loclib.e14055 = "Privacy";
____loclib.e14056 = "Are people who do not enter their real names anonymous?";
____loclib.e14057 = "Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates.";
____loclib.e14058 = "Can someone view a profile (someone&rsquos posts) outside the garden? Is it a walled garden?";
____loclib.e14059 = "Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.";
____loclib.e14060 = "Is my public key like a wallet ID that I enter on my profile and people can send points to?";
____loclib.e14061 = "Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!";
____loclib.e14062 = "Can I run a node on my headless server?";
____loclib.e14063 = "We will put the node&rsquos sources into GitHub. Instructions for running a node will be made available in early April.";
____loclib.e14064 = "How can I sign back in?";
____loclib.e14065 = "You can use your private 12-word key or a QR code to sign in.";
____loclib.e14066 = "Curation of content";
____loclib.e14067 = "Is any content allowed on " + appname + "? If some content is not allowed, can the platform still be called free speech?";
____loclib.e14068 = "This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.";
____loclib.e14069 = "Specifics of curation on "+appname+".";
____loclib.e14070 = "When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).";
____loclib.e140701 = "We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?";
____loclib.e140702 = "Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.";
____loclib.e140703 = "We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.";
____loclib.e14071 = "Important Note on Racism.";
____loclib.e14072 = "Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquos nationality or race. You can make your point based on evidence. We cannot afford to turn "+appname+" into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on "+appname+". Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. "+appname+" team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on "+appname+". Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic.";
____loclib.e14073 = "Specifics of curation on " + appname + ".";
____loclib.e14074 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?";
____loclib.e14075 = "Sometimes we can have a user who comes in with a specific purpose to attack "+appname+" by posting a series of vile images. To protect against that we have a following mechanism. If someone’s reputation reaches -50 (negative 50), their account is automatically blocked. Getting a reputation of -50 is equivalent to having 25 one star ratings and no four or five star ratings. This is nearly impossible to achieve without having lots of bad posts.";
____loclib.e14076 = "Flagging a specific post";
____loclib.e14077 = "When your reputation gets to 50 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn " + appname + " into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.";
____loclib.e14078 = "How is "+appname+" different from...";
____loclib.e14079 = "Twitter, Facebook, Reddit & other centralized platforms?";
____loclib.e14080 = "There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users.";
____loclib.e14081 = "Decentralized platforms like Minds.com and Sola?";
____loclib.e14082 = "Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor.";
____loclib.e14083 = "From Steemit?";
____loclib.e14084 = "Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that.";
____loclib.e14085 = "Decentralized platforms like Mastodon and others?";
____loclib.e14086 = "While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. "+appname+" features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.";
____loclib.e14087 = appname + " ecosystem";
____loclib.e14088 = "How is " + appname + " develpment funded?";
____loclib.e14089 = appname + " is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch "+appname+" will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner.";
____loclib.e14090 = "What is Pocketcoin?";
____loclib.e14091 = "Pocketcoin is a network token. It is used exclusively to buy advertising from " + appname + " contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of "+appname+" and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes.";
____loclib.e14092 = "How are content creators and node operators rewarded?";
____loclib.e14093 = appname + " features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.";
____loclib.e14094 = "What if users post illegal content, pornography and SPAM?";
____loclib.e14095 = appname + " is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag illegal content OR content that threatens mass adoption of "+appname+", not simply the content they find offensive. To make sure that "+appname+" is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.";
____loclib.e14096 = "Who runs the "+appname+"?";
____loclib.e14097 = "There is no corporate entity or single individual who owns or controls the " + appname + ".";
____loclib.e14098 = "The Designer of the " + appname + ", Daniel Sachkov changed his main focus in the Summer of 2019 he is now doing research on further decentralization of blockchain technology that will benefit everyone. He handed control of the Project in accordance with the idea of a full decentralized social media architecture and design over to the community and the Nodes who run the Network.";
____loclib.e14099 = "A team of capable, changing developers and community volunteers is working on the realisation of his Vision ever since. ";

____loclib.e14100 = "Centro assistenza";
____loclib.e14101 = "Block Explorer";
____loclib.e14102 = "F.A.Q.";
____loclib.e14103 = "Roadmap";
____loclib.e14104 = "Impostazione del nodo";
____loclib.e14105 = "Video";
____loclib.e14106 = "Applicazioni";
____loclib.e14107 = "Controlla gli aggiornamenti";
____loclib.e14108 = "Condividi risposta";
____loclib.e14109 = "Dove posso scaricare l'applicazione per Android?";
____loclib.e14110 = "Google Play Market";


____loclib.peertubeAddVideo = "Carica video";
____loclib.peertubeAddStream = "Aggiungi lo streaming dal vivo al post";

____loclib.e14111 = "C'è stato un problema con il caricamento delle immagini";
____loclib.editcomment = "Modifica Commento";
____loclib.system16 = {
    charts : {

    }
}


____loclib.downvoteShareMessage = "ha votato negativamente il tuo post";

____loclib.shareviagroupemail = "Email";
____loclib.shareviagroupmessenger = "Messengers";
____loclib.shareviagroupsocial = "Social networks";
____loclib.shareviagroupblog = "Blog";

____loclib.anotherSiteCaption = "Segui un link esterno verso un sito terzo";
____loclib.anotherSiteDisc = "Non siamo responsabili del contenuto del sito e ti consigliamo vivamente di non fornire i tuoi dati personali su siti terzi.";

____loclib.Categories = "Categorie";
____loclib.addtagsCategories = "Aggiungi Categorie/Tags";
____loclib.addcategory = "Aggiungi categoria";
____loclib.categoryname = "Nome della categoria";
____loclib.entercategoryname = "Inserisci il nome della categoria";
____loclib.categoryfilter = "Filtro categoria";
____loclib.emptycategoryname = "Inserisci il nome della categoria.";
____loclib.doublename = "La categoria con questo nome esiste già. Per favore scegli un altro nome.";

____loclib.showmoreusers = "Mostra altri utenti";
____loclib.zeron = "Non ho trovato niente";
____loclib.maxtags = "Sono consentiti solo 5 tag al massimo";

____loclib.videotitle = "Inserisci il titolo del video/stream";
____loclib.videodesc = "Inserisci la descrizione del video/stream";
____loclib.entervideocaption = "Per favore, inserisci il titolo del video";

____loclib.period = "Periodo";
____loclib.periodday = "Un giorno";
____loclib.period3day = "Tre giorni";
____loclib.period7day = "Una settimana";
____loclib.period31day = "Un mese";
____loclib.period182day = "Sei mesi";

____loclib.shareBareLink = "Condividi link al video";
____loclib.videoCopied = "Link al video copiato con successo negli appunti";

____loclib.editWallpaper = "Cambia immagine di anteprima";
____loclib.removeVideo = "Rimuovi video";

____loclib.removeVideoDialog = "Sei sicuro di voler eliminare questo video?";

____loclib.pterror_meta = "Peertube: Richiesta non definita";
____loclib.pterror_host = "Peertube: Server Peertube non trovato";
____loclib.pterror_link = "Peertube: Collegamento Peertube sconosciuto";
____loclib.pterror_removeerror = "Peertube: Impossibile rimuovere il video. Riprova per favore";
____loclib.pterror_updateempty = "Peertube: Nessun cambiamento trovato";
____loclib.pterror_uploaderror = "Peertube: Il video non è stato caricato";
____loclib.pterror_dailyquotalimit = "Peertube: Hai raggiunto il tuo limite di caricamento video";
____loclib.pterror_videoQuotaUsedDaily = "Peertube: Impossibile ottenere informazioni sul canale (quota)";
____loclib.pterror_usersMe = "Peertube: Impossibile ottenere informazioni sul canale";
____loclib.pterror_oauthClientsLocal = "Peertube: Impossibile ottenere le informazioni oAuth dal server";
____loclib.pterror_pocketnetAuth = "Peertube: Peertube- "+appname+" autorizzazione fallita";
____loclib.pterror_getToken = "Peertube: Impossibile ottenere il Token";
____loclib.pterror_videonotselected = "Peertube: Video non selezionato";


____loclib.videoUploadingFinish = "Finito il caricamento...";
____loclib.uploadNewVideo = "Carica un nuovo video";
____loclib.selectVideoFile = "Seleziona il file video";
____loclib.uploadVideoProgress = "Progresso:";


____loclib.pbp_1 = appname + " Bonus Program";
____loclib.pbp_2 = "Criteri per ricevere il bonus:";
____loclib.pbp_3 = "Ogni 10k visualizzazioni + 750 valutazioni a cinque stelle da utenti unici";
____loclib.pbp_4 = "Equivalente PKOIN:";
____loclib.pbp_5 = "1.000 USDT";
____loclib.pbp_6 = "Come puoi aumentare le tue visualizzazioni?";
____loclib.pbp_7 = "Incorpora il tuo video " + appname + " in siti esterni (clicca su Condividi e scegli Embed)";
____loclib.pbp_8 = "Condividi il tuo video sui social network e via e-mail";
____loclib.pbp_9 = "Condividi il link alla tua pagina personale (vai al tuo profilo e clicca su Condividi)";
____loclib.pbp_10 = "Se inviti un video blogger e puoi dimostrarlo, ottieni un bonus pari al 25% dei loro guadagni.";
____loclib.pbp_11 = "Per qualsiasi domanda, invia un'e-mail a";


____loclib["Top Videos"] = "Top Video";
____loclib["More videos by this author"] = "Altri video di questo autore";

____loclib["pdirectdialog"] = "I proxy esterni non rispondono, vuoi passare a un proxy locale?";


____loclib.goLive = "Vai in diretta";
____loclib.streamInfo = "Informazioni sul flusso";
____loclib.streamCreating = "Crea Stream";

____loclib.importFromExternal = "o importa da YouTube";


____loclib.importHeading = "Importazione video da YouTube";
____loclib.importInputPlaceholder = "Incolla il link al tuo video di YouTube";
____loclib.importInputLabel = "URL video";

____loclib.capitalWarning = "Limiti di qualità dello streaming";
____loclib.streamSettingsWarn = "Per prestazioni ottimali, si prega di utilizzare impostazioni di streaming non superiori alle seguenti: 2000 kb/s bitrate, risoluzione 1920x1080p. Altrimenti la tua diretta potrebbe essere interrotta o instabile";

____loclib.keygeneration = "Generazione di chiavi di crittografia";

____loclib.failedStreamGeneration = "Impossibile avviare lo streaming";

____loclib.hideallnotifications = "Nascondi tutte le notifiche";

____loclib.e133452 = "ti ha inviato un messaggio";
____loclib.e133453 = "vuole invitarti in chat";


____loclib.createnewcontinue = "Continua a creare un account";


____loclib.transactionnotfound = "Transazione non trovata";

____loclib.donateself = "Non puoi donare a te stesso";
____loclib.donated = "ha commentato il tuo post e ha donato";
____loclib.incoins = "Abbastanza PKOIN";
____loclib.yourbalance = "Il tuo saldo";
____loclib.sumoftransaction = "Somma della transazione";


____loclib.videoBitrateError = "Il bitrate del video è troppo alto. Per favore, usa un file con una qualità/risoluzione inferiore";
____loclib.videoQualityInfo = "Bitrate video massimo consentito - 8 Mbit/s. Se il tuo file supera questo limite, il download sarà terminato.";
____loclib.videoQualityCaption = "Limiti di qualità del video";

____loclib.streamLinks = "Link al software di streaming";
____loclib.linkRTMP = "RTMP Url";
____loclib.linkStreamKey = "Chiave del flusso";



____loclib.videoCabinet = "I miei video";
____loclib.uploadQuota = "Quota giornaliera di caricamento";
____loclib.attachVideoToPost = "Crea un post con questo video";

____loclib.linkToPost = "Collegamento al post";
____loclib.attachVideoToPostShort = "Pubblica";

____loclib.totalStars = "Valutazione media (Voti totali)";
____loclib.totalComments = "Commenti totali";
____loclib.totalViews = "Visualizzazioni video";

____loclib.enterVideoName = "Cerca per nome del video";

____loclib.videoTranscoding = "Il video è in fase di elaborazione e potrebbe non funzionare correttamente / indurre un consumo di traffico prolungato. Vuoi ancora pubblicarlo?";
____loclib.waitForTranscoding = "Aspetta l'elaborazione";

____loclib.bonusProgram = "Stato del programma bonus";
____loclib.bonusProgramViews = "Visualizzazioni totali del video";
____loclib.bonusProgramRatings = "Valutazioni totali";

____loclib.sortBy = "Ordina per:";
____loclib.sortDirection = "Direzione di ordinamento:";
____loclib.sortDirectionAsc = "Ascendente";
____loclib.sortDirectionDesc = "Discendente";
____loclib.sortByName = "Nome";
____loclib.sortByCreatedAt = "Data di creazione";
____loclib.sortByDuration = "Durata";
____loclib.sortByViews = "Visualizzazioni";

____loclib.unableToAuthorize = "Impossibile autorizzare";
____loclib.unableToAuthorizeBody = "Sfortunatamente, l'applicazione non può autenticare questo account sul server video. Hai bisogno di almeno 5 PKOIN o 100 di reputazione per caricare i video. Se ce l'hai, per favore riprova più tardi";

____loclib.downloaded = "Scaricato";
____loclib.downloadedEmpty = "I post scaricati saranno mostrati qui";
____loclib.emptyDescription = "La descrizione è vuota";
____loclib.transcodingShort = "Elaborazione";
____loclib.editVideoDescription = "Modifica nome/descrizione del video";
____loclib.errorChangingDescription = "Impossibile cambiare il nome/descrizione del video";
____loclib.downloadVideo = "Salvare il video";
____loclib.downloadingVideo = "Salvare il video";
____loclib.deleteSavedVideo = "Elimina il video salvato";

____loclib.downloadShare = "Salvare la condivisione";
____loclib.deleteSavedShare = "Eliminare la condivisione";

____loclib.selectQuality = "Seleziona la qualità:";
____loclib.downloadedVideos = "Video scaricati";
____loclib.deleteAllDownloadedVideos = "Elimina tutti i video scaricati";
____loclib.noDownloadedVideos = "Nessun video scaricato";
____loclib.deleteVideoDialog = "Sei sicuro di voler eliminare questo video?";
____loclib.deleteAllVideoDialog = "Sei sicuro di voler eliminare tutti i video?";
____loclib.videosDeleted = "Video cancellati!";

____loclib.enterVideoName = "Inserisci il nome del video";
____loclib.enterVideoDescription = "Inserisci la descrizione del video";


____loclib.doyouwantseepk = "Vuoi davvero vedere la tua chiave privata?";
____loclib.copycode = "Copia la chiave privata";
____loclib.privatekeyqr = "Codice QR della chiave privata";
____loclib.saveimage = "Salva immagine";

____loclib.showAllButton = "Mostra tutto";
____loclib.hideAllButton = "Nascondi";

____loclib.UniqueUsers = "Rating unici";
____loclib.ErrorLoadingRates = "Errore di caricamento";

____loclib.userGuides = "Guide";
____loclib.liveSreamingGuide = "Streaming dal vivo";

____loclib.bastyonhelperTitle1 = "Pocketnet si è spostato,";
____loclib.bastyonhelperTitle2 = "Bastyon, libertà di espressione";
____loclib.bastyonhelperSubtitle1 = "Pocketnet è ora";
____loclib.bastyonhelperSubtitle2 = "Per favore, segui il link qui sotto";

____loclib.buy = 'Acquistare';
