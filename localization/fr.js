if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.fr = {};
var appname = ((window.projects_meta || {})[window.pocketnetproject || "Bastyon"] || {}).fullname || 'Bastyon'

var _l = loclib.fr;

//time

_l.fewseconds = "Il y a quelques secondes";	
_l.oneminute = "Il y a une minute";	

_l.minutes = function(v){
return v + " il y a quelques minutes"
}

_l.tenminutes = "Il y a dix minutes";	
_l.halfanhour = "Il y a une heure";	
_l.anhour = "Il y a une heure";	
_l.today = "Aujourd'hui à";	

//authorization

_l.id0 = "Connectez-vous à un compte existant";	
_l.id1 = "Si vous êtes déjà inscrit, veuillez vous connecter";	
_l.loadqrcode = "Télécharger le code QR";
_l.stay = "Rester connecté";
_l.signin = "Se connecter";
_l.orcreate = "Ou créez un nouveau compte";
_l.createnew = "Créer un nouveau compte";
_l.staysafe = "Ce n'est pas sur. Voulez-vous continuer?";
_l.or = "ou";

// Register a New Account
_l.id71 = "Créer un nouveau compte";
_l.id72 = "Déjà membre? Se connecter";

_l.rtip1 = "Prenez note de votre clé de connexion privée!";
_l.rtip2 = function(mobile){
var h = "Voici votre mot de passe de clé privée, notez-le et assurez-vous de sauvegarder votre code QR. Et assurez-vous de ne pas le perdre. Nous ne stockons pas vos données personnelles. La clé privée ne peut pas être récupérée en cas de perte!" 

return h 
}

_l.generatepkey = "Générer la clé privée";
_l.rtip3 = "Notez cette clé de connexion et enregistrez-la sous forme de code QR. Nous ne stockons pas vos données personnelles. Il ne peut pas être restauré s'il est perdu!";
_l.saveqrcode = "Enregistrer le code Qr" 
_l.copyprivkey = "Copier la clé privée"
_l.rcontinue = "Continuer"
_l.idle = "Inactif depuis un certain temps"
_l.congratulations = 'Toutes nos félicitations! Tu es dans <span class="pnlabel">'+appname+'</span>'
_l.creatingpreloader = 'La création du compte'
_l.removepaste = "Nous avons supprimé l'option coller pour cette entrée."
_l.filedamaged = "Le fichier ne contient pas de clé privée valide"
_l.keysnotmatch = 'La clé de connexion privée ne correspond pas'
_l.confirmkey = "Entrez votre clé de connexion privée ou téléchargez le code QR de l'étape précédente"
_l.successfullycopied = "La clé a été copiée avec succès"
_l.urlsuccesscopied = "Lien copié avec succès"

_l.confirmkeyLabel = "Veuillez confirmer votre clé privée. Saisissez la clé dans le formulaire ou <b>téléchargez le code QR</b>"
_l.repeatetocreate = "Répétez pour créer à nouveau la clé privée"
_l.confirmcreate = "Créer un compte"


//user activation

_l.useractivation = "Activation utilisateur";	
_l.wesentmoney = "Nous vous avons envoyé quelques pièces pour vous inscrire";	
_l.wesentmoneym = "Nous vous avons déjà envoyé plusieurs pièces pour inscription.";


_l.wesentmoneydelay = "Le processus prend plus de temps que d'habitude, veuillez patienter un peu plus longtemps";

_l.funetworkproblems = "Il y a quelques problémes avec la connexion. Merci d'essayer plus tard";

_l.pleasewait = "S'il vous plaît, attendez";	
_l.next = "Suivant";	
_l.welcometopocketnet = "Bienvenue sur "+appname+"";	
_l.continue = "continuer";	

//user page

_l.rstate = "Réputation";	
_l.rprofile = "Profil";	
_l.rsettings = "Réglages";	
_l.rwallet = 'Portefeuille';	
_l.raccounts = 'Comptes';	
_l.rsystem = 'Système';
_l.rconnection = 'Connexion';
_l.pnetAddress = "Adresse "+appname+"";	
_l.profile = 'Profil';	
_l.signout = 'Déconnexion';

//send

_l.postlabel = "Don pour poste";	
_l.donationlabel = "Don";	
_l.donationwel = "Si vous souhaitez remercier l'auteur, vous pouvez utiliser une transaction "+appname+"";
_l.donationwela = "Transaction "+appname+"";	
_l.donationwelan = "Ou vous pouvez utiliser un autre système de paiement cryptè";	
_l.successfullycopiedaddress = "Adresse copiée avec succès";	

//wallet

_l.wrecieve = "Recevoir des pièces en partageant l'adresse";	
_l.wcopyshare = "Copier et partager l'adresse:";	
_l.wqrcode = "code Qr";		
_l.wcopeaddress = "Copier l'adresse";	
_l.wcreatelink = "Ou créer un lien pour votre paiement";	
_l.required = "Requis";	
_l.wgetlink = "Obtenir le lien";	
_l.waddresses = "Adresses";	
_l.waddress = "Adress";	
_l.wbalance = "Solde";	
_l.wpercente = "Pour cent";	
_l.waddaddress = "Explorer une nouvelle adresse Google Wallet";	
_l.wrecieve = "Recevoir";	
_l.wrecieveon = "Recevoir sur";	
_l.wcopyshareorcreate = "Copier et partager l'adresse ou créer un lien de paiement";
_l.wdgetlink = "Obtenir le lien";	
_l.wdqrcode = "code Qr";
_l.wdcopyaddress = "Copie l'Adresse";	
_l.wdpleasefill = "Veuillez remplir ces champs";
_l.wduseqr = "Utilisez ce code QR pour recevoir des fonds";	
_l.wdaddress = "Adresse";
_l.wdamount = "Quantité";	
_l.wdlabel = "Étiquette";	
_l.wdmessage = "Message";	
_l.wsend = "Envoyer";
_l.calcfeesandsend = "Calculer les frais et envoyer";	
_l.wstrfees = "Les frais de transaction";	
_l.wsfees = "Frais";	

_l.wssendto = "ENVOYER DES PIÈCES";	
_l.wssendb = "ENVOYER";	

_l.tacaddress = 'Adresse du compte';	
_l.twallet = "Portefeuille";	
_l.twalletaddresses = "Adresses de portefeuille";	
_l.tTotal = "Total";	
_l.wsselect = "Sélectionner la source dans le menu";	
_l.wsenter = "Entrez l'adresse ou sélectionnez dans le menu";	
_l.wsreciever = "Adresse du destinataire";	
_l.wsamount = "Montant";	
_l.wsamountof = "Montant de votre transaction";	
_l.wsincludefees = "Inclure les frais dans le montant";	
_l.wsrecieverpay = 'À payer par le séquestre';	
_l.wssenderpay = "A payer par l'expéditeur";	
_l.wdselectfrom = "Sélectionnez dans le menu";	

_l.wdenteramount = "Mettre le montant";	
_l.wdmessageplaceholder = "A quoi sert cette transaction?";
_l.wrenteraddress = "mettre l'adresse";
_l.wrenteraddressselect = "Mettez l'adresse ou sélectionnez dans le menu";
_l.wreturntoeallet = "RETOUR AU PORTEFEUILLE";	
_l.linkCreated = 'LIEN CRÉÉ';
_l.waddresswascop = "L'adresse a été copiée avec succès";
_l.wqrcodecreated = 'CODE QR CRÉÉ';
_l.wlinkcreating = 'CRÉATION DE LIENS';
_l.wqrcodecreating = 'CRÉATION DE CODE QR';
_l.wdoptions = 'OPTIONS';
_l.wssuccessfully = "Transaction envoyée avec succès";
_l.wscalculatefees = 'CALCULER LES FRAIS';
_l.wsaddressnotv = "L'adresse n'est pas valide";

//user profile
_l.uaddaddressdona = "Ajouter une adresse pour les dons";
_l.uaddaddressdonaplace = "Mettre l'adresse";
_l.uchangeicon = "Importer une image de profil";
_l.utip1 = "Vous devez créer un nom sur la blockchain avant d'utiliser "+appname+"";
_l.utip2 = "Il ne vous reste plus qu'un pas";
_l.upicset = "Definir l'icone de profil";
_l.upic = "Icone de Profil";
_l.uuserinfo = "informations de l'utilisateur";
_l.usave = "Enregistrer";
_l.ucancel = "Annuler";
_l.uwaitb = "Attendez la confirmation pour enregistrer les informations ";
_l.uchanges = "Il n'y a aucun changement";
_l.uchangesvalid = "Vous devez créer un nom d'utilisateur";
_l.uname = "Nom";
_l.unickname = "Surnom";
_l.ulanguage = "Langue";
_l.uabout = "À propos de moi";
_l.uwebsite = "Site web";
_l.uaddresesd = "Adresses pour les dons";
_l.usavechanges = "Voulez-vous enregistrer vos modifications?";

//ustate

_l.sreps = "Réputation et limites";
_l.sdisconnected = "Déconnecté du nœud";
_l.suseractivation = "Activation utilisateur";
_l.sprofile = "Profil";
_l.spc = "Nombre de messages";
_l.ssc = "Les toiles comptent";
_l.ccc = "Les commentaires comptent";
_l.crc = "Nombre de taux de commentaires";
_l.artc = "Nombre d'articles";



_l.stp = "Période d'essai";
_l.srep = "Réputation";

//accounts
_l.aaddedacc = "Comptes ajoutés";
_l.acure = "Actuel";
_l.aaddacc = "Ajouter un compte";
_l.ascheduler = "Planificateur";
_l.aused = "Cette adresse est déjà utilisée dans un autre pool d'adresses";


//author
_l.sub = "S'abonner";
_l.unsub = "Se désabonner";
_l.joined = "Rejoint "+appname+"";
_l.shares = "PARUTIONS";
_l.uposts = "POSTS";
_l.myuposts = "MES POSTS";
_l.followers = "ABONNES";
_l.following = "ABONNEMENTS";
_l.settings = "GÉRER";
_l.anofollowers = "Cet utilisateur n'a pas d'abonnés";
_l.aynofollowers = "Vous n'avez pas d'abonnés";
_l.anofollowing = "Cet utilisateur ne suit personne";
_l.aynofollowing = "Tu ne suis personne";

//lenta
_l.lloadmore = "Chargez plus de messages impressionnants!";
_l.lloadprev = "Charger de nouveaux articles géniaux";


_l.lend = "Fin des messages";
_l.zerop = "Il n'y a actuellement aucun message de cet auteur";
_l.zeroy = "Vous n'avez pas encore de publications, partagez quelque chose!";



_l.llogin = 'Vous devez vous connecter avant de pouvoir continuer';
_l.lcomlaindialog = "Voulez-vous vraiment signaler ce message?";
_l.lunsubscribe = "Voulez-vous vraiment vous désabonner de ce compte?";
_l.lprivatepublic = "Voulez-vous faire un abonnement privé ou public?";
_l.lprivate = "Privée";
_l.lpublic = "Public";

//share
_l.newShare = "Nouveau post";
_l.firstShare = "Partagez votre premier message dans "+appname+"";
_l.scaption = "Caption";
_l.whatsnew = "Quoi de neuf?";
_l.saddlink = "Ajouter un lien vers un site externe ou une vidéo";
_l.saddimages = "Ajouter des images à la publication";
_l.sarticle = "Ecrire un article";
_l.stelegram = "Envoyer au télégramme"
_l.stimes = "Supprimer le message"


_l.snothing = "Rien";
_l.sposttime = "Publier par heure";
_l.spostnow = "Publier maintenant";
_l.stimenotselected = "Heure non sélectionnée";
_l.spost = "Post";
_l.sdate = "Date";
_l.stime = "Temps";
_l.snotags = "Ajouter une étiquette";
_l.expandvideo = "Cliquez pour agrandir";
_l.emptymessage = "Le message est vide";
_l.emptytags = "Veuillez ajouter des étiquettes";
_l.emptyutxo = "pas d'argent";
_l.networkerror = "erreur réseau";
_l.maximages = "Vous avez droit à un maximum de 10 images";
_l.sharenow = "Voulez-vous partager ce contenu maintenant?";
_l.pastdate = 'Pâte de datte';
_l.timenotselected = 'Heure non sélectionnée';
_l.addtags = 'Ajouter des étiquettes';
_l.tnews = "nouvelles";
_l.timages = "images";
_l.tvideos = "vidéos";
_l.tmarket = "marché";
_l.tsport = "sports";

//menu
_l.signinmenu = "se connecter";
_l.signupmenu = "S'inscrire";
_l.aboutmenu = "apprendre encore plus";

//footer
_l.aboutus = "À propos de nous";



// Dialog Box Options
_l.daccept = "Accepter";
_l.dcancel = "Annuler";
_l.dyes = "Oui";
_l.dno = "Non";
_l.dsa = "Ne plus montrer";


// Messages

_l.coinbaseSuccess = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour votre derniere activite!"
}
_l.coinbaseSuccesspost = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour vos derniers posts!"
}
_l.coinbaseSuccesscomment = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour vos derniers commentaires!"
}
_l.userSent = function(v){
return "envoyé <b>" + v + " POC</b> pour vous"
}




_l.refferalUserMessage = "Félicitations Vous avez sauvé quelqu'un du Web censur. Certaines pièces sont en route!"

_l.subscribeUserMessage = "t'a suivi"
_l.unsubscribeUserMessage = "ne vous suit plus"
_l.gotoprofileMessage = "aller au profil"
_l.upvoteShareMessage = "a voté pour votre post"

_l.upvoteCommentMessage = " a aimé votre commentaire"

// Errors

_l.error = "Erreur";
_l.checkScoreError = "Vous devez remplir les informations de profil requises avant d'utiliser "+appname+". Voulez-vous le faire maintenant?";
_l.checkScoreErrorLight = "Le compte n'est pas activé.";
_l.timestamperror = "L'heure dans l'application et dans le nœud ne correspond pas";

// Error Page 404
_l.e404 = "ERREUR 404";	
_l.e404e = "Page non trouvée. Retour à la page principale";	
_l.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " publications sur une période de 24 heures";
}
_l.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " classement sur une période de 24 heures";
}

_l.doubleLimitLight = "Vous l'avez déjà noté";	

_l.SelfSubscribeError = "Impossible de s'abonner a vous-même";
_l.DoubleSubscribeError = "Vous suivez déjà cet utilisateur";
_l.InvalideSubscribeError = "Vous n'êtes pas abonné à cet utilisateur";
_l.ChangeInfoLimitError = "Vous ne pouvez modifier votre profil qu'une fois par heure. Veuillez patienter et ressayer. ";
_l.SelfScoreError = "Vous ne pouvez pas évaluer votre propre message";

_l.unexperror10 = "Erreur inconnue (10)";
_l.unexperror11 = "Erreur inconnue (11)";
_l.unexperror12 = "Erreur inconnue (12)";

_l.networkerror = "Il y a quelques problèmes avec le nœud";

_l.canSpendError = "Vous devez attendre que votre transaction précédente soit effacée dans la blockchain. S'il vous plaît, attendez";
_l.noMoneyError  = "Vous ne pouvez pas effectuer d'actions avec un solde de compte nul";



_l.waitConf = "Vous devez attendre que votre précédente transaction soit effacée dans la blockchain";
_l.postWaitConf = "La publication attend une confirmation de la blockchain";



// notifications

_l.ntnow = "Maintenant"
_l.ntlasthour = "Cette heure"
_l.nttoday = "Aujourd'hui"
_l.ntmounth = "Ce mois-ci"
_l.ntearlier = "Plus tôt"


_l.nodeWalletAdd = "L'ajout d'une adresse peut prendre un certain temps. Continuer?"
_l.nodeEnableNoteHeader = 'Note'
_l.nodeEnableNote = "L'activation d'un noeud peut prendre jusqu'a 5 Go de RAM. Assurez-vous que vous en avez assez. Bon jalonnement!"


/// 1301

_l.address = "Adresse"
_l.privatekey = "Clé privée"
_l.qrcode = "Code QR"
_l.addaccount = "Ajouter un compte"
_l.entermnimo = "Entrez une phrase mnémotechnique ou une clé privée"
_l.add = "Ajouter"
_l.e13011 = "Vous allez maintenant continuer votre enregistrement après avoir installé "+appname+" Desktop."
_l.e13012 = "Si "+appname+" n'a pas changé le téléchargement, veuillez cliquer ici pour l'installateur."
_l.e13013 = "Saisissez la légende de l'image (facultatif)"
_l.e13014 = "Ce fichier n'est pas dans un format pris en charge:"
_l.e13015 = "Ce fichier est trop gros:"
_l.e13016 = "Collez un lien YouTube, Vimeo et appuyez sur Entrée"
_l.e13017 = "Chargement dans Blockchain"
_l.e13018 = "Voulez-vous vraiment supprimer cet article?"
_l.e13019 = "Nouveau"
_l.e13020 = "Escribir artículo nuevo"
_l.youarefollowing = "Estas siguiendo"
_l.follow = "S'abonner"
_l.blocked = "Bloque"
_l.e13021 = "Montrer plus"
_l.block = "Bloquer"
_l.blockuser = "Bloquer l'utilisateur"
_l.unblockuser = "Débloquer l'utilisateur"
_l.e13022 = "Voulez-vous vraiment ne plus suivre l'utilisateur?"
_l.unfollow = "Se désabonner"
_l.unblock = "Débloquer"
_l.share = "Partager"
_l.info = "Info"
_l.signToComment = "Pour afficher ou publier des commentaires, vous devez vous connecter ou vous inscrire"
_l.e13023 = "Voulez-vous vraiment débloquer l'utilisateur?"
_l.e13024 = "Votre clé de connexion privée"
_l.e13025 = "Créer un nouveau compte"
_l.e13026 = "Rejoignez "+appname+""

_l.e13027 = "Restez signé"
_l.e13028 = "Vous avez entré une clé privée non valide"
_l.e13029 = "Le message est vide"
_l.e13030 = "Les commentaires ont une limite de 1000 caractères par commentaire"
_l.e13031 = "Partager ce commentaire"
_l.e13032 = "Voulez-vous vraiment supprimer votre commentaire?"
_l.e13033 = "Le commentaire a été supprimé"
_l.e13034 = "Oui"
_l.e13035 = "Non, annuler"
_l.hide = "Cacher"
_l.e13036 = "Afficher les commentaires précédents"
_l.e13037 = "réponses"
_l.remove = "Retirer"
_l.e13038 = "Commentez maintenant et gagnez en réputation"
_l.e13039 = "Commentez maintenant et gagnez en réputation"
_l.e13040 = "Vous n'avez pas de priviléges de commentaire"
_l.complain = "Se plaindre"
_l.next = "Suivant"
_l.post = "Poster"
_l.e13041 = "Connexion "+appname+""
_l.e13042 = "Proxy "+appname+""

_l.e13043 = "Nœuds "+appname+""
_l.e13044 = "Ajouter un nœud"
_l.e13045 = "Nœuds introuvables"
_l.e13046 = "Adresse"
_l.e13047 = "WS"
_l.e13048 = "Nom"
_l.e13049 = "Statut"
_l.e13050 = "Proxies introuvables"
_l.e13051 = "N'utilisez pas de proxy"
_l.e13052 = "Impossible de se connecter au proxy"
_l.e13053 = "Impossible de se connecter au nœud"
_l.e13054 = "Ajouter un proxy"
_l.e13055 = "Modifier le proxy"
_l.save = "Sauver"
_l.e13056 = "Nœud hôte"
_l.close = "Fermer"
_l.e13057 = "Merci de compléter tous les champs"
_l.e13058 = "Vous avez déjà ce proxy dans la liste."
_l.delete = "Supprimer"
_l.e13059 = "Voulez-vous vraiment supprimer ce proxy de la liste?"
_l.e13060 = "Liste des proxys"
_l.e13061 = "Voulez-vous vraiment arrêter d'utiliser Proxy. C'est dangereux (connexion Http)"

_l.e13062 = "Modifier le nœud"
_l.onproxy = "Sur proxy"
_l.locally = "Localement"
_l.nodehost = "Nœud hote"
_l.e13063 = "Port RPC"
_l.e13064 = "Port WS"
_l.e13065 = "Nom du nœud"
_l.e13066 = "Veuillez saisir le nom du nœud"
_l.e13067 = "Connexion RPC"
_l.e13068 = "Connectez-vous pour obtenir une autorisation PRC"
_l.e13069 = "Mot de passe RPC"
_l.e13070 = "Mot de passe pour l'autorisation PRC"
_l.e13071 = "Merci de compléter tous les champs"
_l.e13072 = "Merci de compléter tous les champs"
_l.e13073 = "Voulez-vous vraiment arrêter d'utiliser Proxy. C'est dangereux (connexion Http)"
_l.notselected = "Non selection"
_l.donation = "don"
_l.e13074 = "En attente de fonds. L'adresse sera valide pour"
_l.sminutes = "minutes"
_l.e13075 = "Le delai pour cet accord a expiry."
_l.reactivate = "Réactiver"
_l.e13076 = "Scannez ce code pour envoyer"
_l.back = "Avant"
_l.e13077 = "Ajoutez votre profil a la liste des donateurs"
_l.e13078 = "Pourquoi demandons-nous des dons?"
_l.e13079 = "Nous avons passé plus de 14 mois de temps libre à partir d'emplois à temps plein à apporter "+appname+" aux gens. En plus du temps et des efforts, nous avons investi notre propre argent pour aider au lancement de la plateforme. Maintenant, nous avons besoin de la communauté pour nous aider à grandir."
_l.e13080 = "Comment les fonds seront-ils utilisés?"
_l.e13081 = "Les fonds seront utilisés pour acheter de la publicité et embaucher des experts en la matière pour rendre "+appname+" encore plus sûr. L'équipe de développement actuelle ne reçoit aucun de ces dons. Dans la mesure du possible, nous publierons ici comment nous avons utilisé les fonds. "
_l.e13082 = "Ce que vous obtiendrez pour votre don en plus de savoir que vous avez soutenu la liberté "
_l.e13083 = "En signe de gratitude pour le don, vous recevez un cadeau d'une certaine quantité de Pocketcoin"
_l.e13084 = "De plus, lorsque nous construisons une discussion de groupe, vous serez membre d'un groupe spécial de donateurs qui ont un accès direct à l'équipe "+appname+", même si la plate-forme se développe."
_l.e13085 = "Le lien vers votre profil "+appname+" sera répertorié ci-dessous, attirant plus de personnes vers vos publications (sauf si vous nous demandez de ne pas le faire)"
_l.e13086 = "Soutenez maintenant le Webm décentralisé"
_l.e13087 = "Bitcoin, Litecoin, Monero"

_l.e13088 = "Membres "+appname+" qui ont fait un don pour soutenir "+appname+""
_l.thankyou = "Merci!"
_l.e13089 = "Si vous souhaitez que nous inscrivions votre profil "+appname+" dans la liste des donateurs, veuillez nous envoyer des informations sur votre don"
_l.e13090 = "Ajoutez-moi a la liste des donateurs"
_l.e13091 = "Ou vous pouvez nous envoyer un e-mail à"
_l.e13092 = "avec votre clé publique et votre montant."
_l.finish = "terminer"
_l.e13093 = "Veuillez choisir le mode de don"
_l.e13094 = "Un problème est survenu. Veuillez recharger la page et réessayer (erreur: 0001)"
_l.e13095 = 'Merci de soutenir notre travail pour la libertè. Nous nous assurerons que chaque centime compte.'
_l.e13096 = 'Veuillez indiquer le montant du don'
_l.e13097 = "Un problème est survenu. Veuillez recharger la page et rèessayer (erreur: 0002)"
_l.e13098 = "Ajouter un lien vers un site ou une ressource externe"
_l.e13099 = "Importer des images"
_l.e13100 = "Cliquez ici pour sèlectionner les fichiers a tèlècharger"
_l.e13101 = "ou glisser-deposer"
_l.e13102 = "Ajouter un lien vers un site externe"
_l.e13103 = "L'URL n'est pas valide"
_l.e13104 = "Max 6 images autorisèes"
_l.e13105 = "Gestion des nœuds"
_l.e13106 = "Nœud "+appname+""
_l.e13107 = "La gestion des nœuds peut ètre effectuèe avec Application"
_l.e13108 = "Il n'y a pas de connexion avec l'interface proxy Electron"

_l.e13109 = "Veuillez entrer les mots dans l'image pour recevoir Pocketcoin et continuer l'inscription"
_l.e13110 = "Entrez les mots"
_l.next = "Suivant"
_l.refresh = "Rafraîchir"
_l.e13111 = "Ajoutez votre e-mail pour obtenir les dernières mises à jour "+appname+""
_l.e13112 = "Entrer votre email"
_l.e13113 = "Ajouter un email"
_l.skip = "Passer"
_l.e13114 = "Il y a un problème avec votre inscription en raison d'une activité étrange."
_l.e13115 = "S'il vous plaît envoyer un courriel"
_l.e13116 = "pour recevoir des pièces et ouvrir votre compte."
_l.e13117 = "Verifier le solde"
_l.joinnow = "Inscrivez-vous maintenant"
_l.loading = "Chargement"
_l.e13118 = "Les mots ne correspondent pas"
_l.e13119 = "Ajouter un e-mail et continuer"
_l.e13120 = "Applications"
_l.e13121 = "Il n'y a pas d'images ici"
_l.e13122 = "Derniers Commentaires"

_l.e13123 = "Afficher plus de messages"
_l.e13124 = "Plus de messages "+appname+" impressionnants!"
_l.e13125 = "La section des meilleurs messages est vide!"
_l.e13126 = "Les messages des personnes que vous suivez seront affichés icis"
_l.e13127 = "Les messages des personnes que vous suivez seront affichés icis "
_l.e13128 = "Les messages des personnes que vous suivez seront affichés icis"
_l.registration = "enregistrement"
_l.editpost = "Modifier le post"
_l.removepost = "Supprimer le post"


_l.reportpost = "Dènoncer ce post"
_l.donate = "Faire un don"
_l.blockuser = "Bloquer un utilisateur"
_l.more = "Plus"
_l.showmore = "Montrer plus"
_l.e13129 = "Images jointes"
_l.e13130 = "Editè"
_l.e13131 = "Vous avez bloquè cet utilisateur"
_l.e13132 = "notè"
_l.e13133 = "Partager ceci"
_l.e13134 = "Il n'y a aucun rèsultat pour cette chaîne de recherche"
_l.e13135 = "L'utilisateur n'a pas de clè privèe"
_l.e13136 = "Tous les messages"
_l.e13137 = "Votre poche"
_l.e13138 = "Top messages"
_l.discussed = "Les Plus Discutés"
_l["Most Discussed Over"] = "Pour la période"
_l.e13139 = "RECHERCHE SUR "+appname.toUpperCase()+""
_l.e13140 = "RECHERCHE SUR"
_l.notifications = "Notifications"
_l.showall = "Afficher tout"
_l.e13141 = "Vous n'avez pas de notifications"

_l.recommendations = "Recommandations"
_l.e13142 = "J'ai gardè ma clè, ne me le rappelle plus"
_l.e13143 = "Important!"
_l.e13144 = "Copier le texte"
_l.e13145 = "Enregistrer la clè sur l'appareil"
_l.e13146 = "Fin des messages"
_l.e13147 = "Partagez ceci"
_l.e13148 = "Voulez-vous vraiment vous plaindre de ce post?"
_l.e13149 = "évaluations des utilisateurs"
_l.e13150 = "évaluation du message"
_l.e13151 = "Personne n'a vu ce message"
_l.e13152 = "Scores des utilisateurs"
_l.e13153 = "Passer et accéder au site Web"
_l.e13154 = "Vos informations de connexion"
_l.e13155 = "Pour utiliser "+appname+", vous devez générer votre clé cryptographique privée qui remplace l'identifiant et le mot de passe des réseaux sociaux centralisés."
_l.users = "Utilisateurs"
_l.userstx = "Utilisateurs"
_l.user = "Utilisateurs"
_l.postscount = "Nombre de posts"
_l.about = "Sur"
_l.e13156 = "Rèsultats suivants"
_l.posts = "Posts"
_l.e13157 = "Recherchè par"
_l.e13158 = "n'a aucun rèsultat"
_l.e13159 = "La phrase de recherche est vide"
_l.repost = "Republier"
_l.e13160 = "Bonjour Pocketeers!"

_l.e13161 = "Ajouter des étiquettes pour votre message"
_l.e13162 = "Vous pouvez saisir moins de 15 étiquettes"
_l.e13163 = "Il n'y a pas de changements dans la publication"
_l.e13164 = "Veuillez ajouter quelques mots pour informer Pocketpeople de votre lien. De quoi s'agit-il? Pourquoi c'est important? Quel est ton opinion?"
_l.e13165 = "VNotre lien vers la vidéo n'est pas valide. Veuillez mettre en ligne une URL de vidéo valide."
_l.e13166 = "Tu as sauvegardé"
_l.e13167 = "internautes censurés"
_l.e13168 = "Gagnez Pocketcoin pour chaque inscription via votre lien"
_l.e13169 = "Lien direct"
_l.copy = "Copier"
_l.e13170 = "Incluez un appel à l'action pour l'inscription "+appname+" "
_l.more = "Plus"
_l.e13171 = "Bonnes nouvelles. J'ai gagné mon indépendance des monopoles des réseaux sociaux, venez me rejoindre sur pocketnet.app pour que nous puissions partager et discuter de manière indépendante sur la blockchain. Rejoignez-moi ici"
_l.e13172 = "Je souhaite partager cela à partir d'une plate-forme de blockchain "+appname+" décentralisée avec vous. J'espère que vous le trouverez utile et si vous vous inscrivez, nous obtiendrons tous les deux des bonus de crypto-monnaie Pocketcoin!"
_l.e13173 = "Envoyé par e-mail"
_l.e13174 = "Partage social"
_l.e13175 = "Etiquettes populaires"
_l.e13176 = "Type d'adresse"
_l.e13177 = "Envoyer la photo"

_l.requiredfields = "Champs obligatoires"
_l.e13178 = "Non lié à votre profil"
_l.e13179 = "Liste non dépensée"
_l.e13180 = "Votre facture a été créée avec succès"
_l.e13181 = "Une erreur s'est produite lors du processus de crèation de l'offre"
_l.e13182 = "Explorateur de blocs"
_l.e13183 = "Centre d'aide"
_l.e13184 = "Continuer l'inscription"
_l.e13185 = "Connexion perdue"
_l.e13186 = "Editer le profil"
_l.e13187 = "Contenus"
_l.e13188 = "Veuillez enregistrer votre clé cryptographique privée qui remplace l'identifiant et le mot de passe des réseaux sociaux centralisés"
_l.e13189 = "Laissez et perdez ma clè pour toujours!"
_l.e13190 = "Thème "+appname+""
_l.e13191 = "Définissez le thème"
_l.e13192 = "Niveau"
_l.e13193 = "BONUS"
_l.e13194 = "Réputation et récompenses"
_l.e13195 = "Limitations"
_l.e13196 = "Cela prend beaucoup de temps"
_l.e13197 = "Recevoir des Pocketcoins"
_l.e13198 = "Le temps d'attente approximatif est"
_l.e13199 = "Rejoignez "+appname+" maintenant"

_l.e13200 = "Retour à "+appname+""
_l.e13201 = "REJOIGNEZ BETA"
_l.e13202 = "Le test bêta de "+appname+" démarre le 24 janvier"
_l.e13203 = "Merci d'avoir rejoint la liste de diffusion du test bêta de "+appname+". Il n'est pas nécessaire d'utiliser "+appname+", cependant, nous utilisons cet e-mail pour envoyer vos sondages afin d'améliorer la plateforme. Merci d'avoir contribué à façonner l'avenir d'Internet."
_l.e13204 = "Adresse de reception "+appname+""
_l.e13205 = "Parametres"
_l.e13206 = "Recevoir un montant Pocketcoin"
_l.e13207 = "Envoyer le montant"
_l.e13208 = "Disponible"
_l.e13209 = "Liste de financement participatif"
_l.e13210 = "Nouvelle offre"
_l.e13211 = "Copier le lien et partager"
_l.amount = "Montant"
_l.label = "Etiquette"
_l.message = "Message"
_l.copylink = "Copier le lien"
_l.e13211 = "Veuillez remplir ces champs"
_l.e13212 = "Créer un code QR"
_l.e13213 = "Recevoir l'adresse"
_l.process = "Processus"
_l.source = "Source"
_l.yourmessage = "Votre message"
_l.e13214 = "Montant Pocketcoin"
_l.currency = "Devise"


_l.e13215 = "Sélectionnez la devise"
_l.e13216 = "Montant en devise"
_l.e13217 = "La date limite pour cet accord est expirée."
_l.e13218 = "En attente des confirmations de la blockchain"
_l.e13219 = "Vous envoyer des Pocketcoins"
_l.e13220 = 'Pocketcoins livrès'
_l.errorreload = "Un problème est survenu. Veuillez actualiser la page et réessayer"
_l.e13221 = "Voulez-vous vraiment supprimer les informations relatives à cette offre? L'accord ne peut pas être arrêté"
_l.e13222 = "Téléchargez l'application de bureau - c'est le moyen le plus résistant à la censure d'utiliser "+appname+". Même si les sites Web sont fermés, l'application de bureau fonctionnera toujours directement via les nœuds."
_l.e13223 = "Tèlèchargez "+appname+" pour Windows"
_l.e132232 = "Tèlèchargez "+appname+" pour macOS"
_l.e13224 = "Tèlèchargez "+appname+" pour Linux"
_l.e13225 = "Nœud "+appname+""
_l.e13226 = 'Tèlèchargez le nœud'
_l.e13227 = "Tèlèchargez "+appname+" Node pour Windows"
_l.e13228 = "Tèlèchargez "+appname+" Node pour Linux"
_l.e13229 = 'Clè privèe non valide'
_l.e13230 = 'Erreur de connexion non dèfinie'

_l.e13231 = "Connexion perdue"
_l.e13232 = "Impossible de se connecter au nœud"
_l.e13233 = 'Ce commentaire a été supprimé'
_l.e13234 = 'Erreur Opreturn / 41'
_l.e13235 = 'Vous ne pouvez pas evaluer le commentaire deux fois'
_l.e13236 = 'Ce commentaire a été supprimé'
_l.e13237 = 'Vous ne pouvez pas vous évaluer'
_l.e13238 = "Erreur lors de l'envoi du commentaire. Veuillez patienter et réessayer / 37"
_l.e13239 = "Erreur d'envoi de commentaire / 35"
_l.e13240 = "Le commentaire auquel vous répondez a été supprimé par l'utilisateur"
_l.e13241 = 'Ce commentaire est trop long, veuillez le casser'
_l.e13242 = "Vous avez été bloqué par cette personne, vous ne pourrez pas commenter ses messages"
_l.e13243 = "Vous avez atteint votre limite de commentaires positifs sur une période de 24 heures"
_l.e13244 = "Vous avez atteint votre limite de modification des commentaires sur une période de 24 heures"
_l.e13245 = "Vous avez atteint votre limite d'envoi de commentaires sur une période de 24 heures"
_l.e13246 = "Vous essayez de modifier le message de quelqu'un d'autre"
_l.e13247 = "Vous avez atteint votre limite de modification de 5 articles par période de 24 heures"
_l.e13248 = "Vous ne pouvez modifier qu'une seule fois par bloc de blockchain. Veuillez patienter une minute, puis réessayer"
_l.e13249 = 'Tu ne peux pas te bloquer'
_l.e13250 = 'Vous avez déjà bloqué cet utilisateur'
_l.e13251 = "Vous n'avez pas bloqué cet utilisateur"
_l.e13252 = 'La transaction est mal formée'
_l.e13253 = 'Vous ne pouvez pas vous référer à vous-même'
_l.e13254 = "Ce nom d'utilisateur est trop long"
_l.e13255 = "Ce nom d'utilisateur est déjà utilisé"
_l.e13256 = 'Ce message est trop long, veuillez le séparer.'
_l.e13257 = "Votre score de réputation "+appname+" ne permet pas encore l'enregistrement des réclamations"
_l.e13258 = 'Vous avez atteint la limite de réclamation dans un délai de 24 heures'

_l.e13259 = 'Je ne peux pas me plaindre de votre propre message'
_l.e13260 = 'Vous avez déjà déposé une plainte contre cet utilisateur.'
_l.e13261 = "Enregistrer la clé"
_l.e13262 = "Plus tard"
_l.e13263 = "Abonnez-vous et activez les notifications de cet utilisateur"
_l.e13264 = "Abonnez-vous sans notifications"
_l.e13265 = 'Votre nom n`est plus disponible, veuillez en choisir un autre'
_l.e13266 = "Théme blanc"
_l.e13267 = "Théme sombre"
_l.e13268 = 'Coinstake gagne'
_l.e13269 = 'Les transactions reçoivent'
_l.e13270 = 'Les votes positifs reçoivent'
_l.e13271 = 'Comment recevoir'
_l.downvote = "Évaluation négative"
_l.e13272 = 'Répondre reçu'
_l.e13273 = 'Nouveaux adeptes'
_l.e13274 = 'Utilisateurs enregistrés'
_l.e13275 = 'Score du commentaire'
_l.e13276 = 'Afficher les vidéos intégrées'
_l.e13277 = 'Vidéos en lecture automatique'
_l.e13278 = 'Démarrez '+appname+' automatiquement'
_l.e13279 = 'Chat'
_l.e13280 = 'Etiquettes'
_l.e13281 = 'Derniers commentaires'
_l.e13282 = "Jeton de robot télégramme"
_l.e13283 = "Message de chaîne de télégramme"
_l.e13284 = "Ajouter le bot au chat et sélectionner"
_l.e13285 = 'Demander avant de poster du télégramme'
_l.e13286 = 'Demander avant d`envoyer au télégramme'
_l.e13287 = "Envoyer vers le canal de télégramme"
_l.video = "Vidéo"
_l.audio = "Audio"
_l.e13288 = "Vidgets de la page principale"
_l.e13289 = "Intagration avec Telegram"

_l.system = "Systéme"
_l.e13290 = "Souhaitez-vous suivre"
_l.e13291 = "Voulez-vous vraiment envoyer un message a Telegram?"
_l.send = "Envoyer"
_l.e13292 = "Vous avez déjà un nœud sur cet hôte"
_l.e13293 = "Erreur interne"
_l.e13294 = 'Activation de la base de données PGSQL'
_l.e13295 = 'Hôte DB'
_l.e13296 = 'Port DB'
_l.e13297 = 'DB Max'
_l.e13298 = 'Délai d`inactivité DB, ms'
_l.e13298 = 'DB Nom'
_l.e13300 = 'DB Utilisateur'
_l.e13031 = 'DB Mot de Passe'
_l.e13302 = 'Serveur proxy activé'
_l.e13303 = 'Port du serveur proxy https'
_l.e13304 = 'Port du serveur proxy wss'
_l.e13305 = 'Clé SSL du serveur, pem'
_l.e13306 = 'Certificat SSL du serveur, pem'
_l.e13307 = 'Phrase de passe SSL du serveur'
_l.e13308 = 'SDK d`administration Firebase'
_l.e13309 = 'Votre adresse de grue'
_l.e13310 = 'Captcha activé'
_l.e13311 = 'Activation du limiteur IP'
_l.e13312 = "Serveur"

_l.e13313 = "Base de données, PG sql"
_l.e13314 = "Firebase"
_l.e13315 = "Autre"
_l.e13316 = 'Activer'
_l.e13317 = 'Chemin binaire'
_l.e13318 = 'Chemin de configuration'
_l.e13319 = 'Chemin de données'
_l.e13320 = 'Adresse de jalonnement'
_l.e13321 = 'Importez l`adresse du compte sur le nœud pour l`empilage'
_l.e13322 = 'Etat'
_l.e13323 = 'Adresses de jalonnement'
_l.e13324 = 'Dernier bloc'
_l.control = "Contrôler"
_l.setup = "Installer"
_l.e13325 = "Voulez-vous vraiment poster des messages de Telegram?"
_l.e13326 = "Post"
_l.e13327 = 'Voulez-vous vraiment utiliser un nouveau proxy?'
_l.e13328 = 'aimé votre commentaire!'
_l.e13329 = "Nouveau commentaire comme"
_l.e13330 = "un message partagé:"
_l.e13331 = "un post partagé:"
_l.e13332 = "a un tout nouveau post:"
_l.e13333 = "Transaction entrante"
_l.e13334 = "Félicitations! Vous avez gagné"
_l.e13335 = "Pocketcoin pour votre dernier"
_l.e13336 = "avec message:"
_l.e13337 = "a commenté votre message:"
_l.e13338 = "answered on your comment:"
_l.reply = "Répondre"
_l.e13339 = "Vous avez sauvé quelqu'un du Web censuré. Certaines pièces sont en route!"
_l.e13340 = 'Félicitations !'
_l.e13341 = "t'a suivi"
// <%=e('e13337')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13337')
_l.e13342 = "Nouvel abonné"
_l.e13343 = "un vote pour votre message"
_l.e13344 = "Nouveau vote favorable"
_l.e13345 = "vous a envoyé un message privé"
_l.e13346 = "Vous avez de nouveaux messages"
_l.e13347 = "Des mises à jour "+appname+" sont disponibles. Appliquer les mises à jour maintenant?"
_l.e13348 = "Au plus tard"
_l.e13349 = "Des mises à jour "+appname+" sont disponibles. Allez sur la page pour télécharger la nouvelle version?"
_l.e13350 = 'Rejoignez '+appname+' et gagnez Pocketcoin maintenant'
_l.e133512 = 'Please write a few words about yourself to help people decide if they want to follow you'

_l.downloaded = "Téléchargés";
_l.downloadedEmpty = "Les posts téléchargés s'afficheront ici";
_l.downloadVideo = "Télécharger vidéo";
_l.selectQuality = "Sélectionnez la qualité:";
_l.downloadedVideos = "Vidéos téléchargées";
_l.deleteAllDownloadedVideos = "Supprimer les vidéos téléchargées";
_l.deleteVideoDialog = "Etes-vous sûr de vouloir supprimer cette vidéo ?";
_l.deleteAllVideoDialog = "Etes-vous sûr de vouloir supprimer toutes les vidéos ?";
_l.videosDeleted = "Vidéos supprimées!";
_l.noDownloadedVideos = "Aucune vidéos téléchargées";

_l.buy = 'Acheter';

_l.MainBoard = 'Levez-vous contre la censure &';
_l.MainBoard1 = 'Obtenez une indépendance financière';
_l.MainBoard2 = 'Le premier protocole de réseau social résistant à la censure';
_l.MainBoard3 = 'Basé sur la technologie Blockchain, décentralisé et sécurisé.';
_l.MainBoard4 = 'Pas de société, pas de serveurs centralisés, modéré par la communauté'
_l.MainBoard5 = 'Propulsé par Pocket coin (PKOIN) pour récompenser les créateurs et les contributeurs' ;
_l.MainBoard55 = 'Règles Open-source & transparentes qui sont les mêmes pour tout le monde' ; 
_l.MainBoard6 = 'Commencez';
_l.MainBoard7 = 'Google Play';
_l.MainBoard8 = 'Télécharger pour';
_l.works = 'Nous croyons à la liberté';
_l.works1 = 'Bastyon est un réseau innovant qui peut contourner les tactiques de censure courantes, telles que le blocage des domaines et l’interdiction des blogueurs pour dissidence';
_l.works2 = 'Bastyon est également une plate-forme de partage de vidéos qui, contrairement aux médias sociaux traditionnels et traditionnels, donne votre vie privée et la liberté de la censure arbitraire';  
_l.works3 = 'Bastyon est également un système financier privé et axé sur la liberté alimenté par Pocketcoin (PKOIN) qui est utilisé pour promouvoir le contenu et les biens';
_l.works4 = 'Nous sommes motivés par la LIBERTÉ';
_l.works5 = 'Ne dépend pas des entités corporatives' ;
_l.works6 = 'Ne dépend pas des banques pour le financement et les opérations' ;
_l.works7 = 'Ne dépend d’aucun domaine ou site web qui peut être facilement bloqué';
 _l.contentCreators = 'Pour les créateurs de contenu';
_l.howItWorks = 'Comment cela fonctionne';
_l.insteadOf = 'Au lieu de';
_l.alternativeTo = 'Une alternative à...';


_l.aboutServices = 'AUCUNE CENSURE';

_l.aboutServices1 = 'Résistant à la censure';
_l.aboutServices2 = 'Bastyon existe sur des ordinateurs à nœuds décentralisés dans le monde entier gérés par des utilisateurs. Chaque ordinateur nœud fonctionne sur le même ensemble de règles transparentes, empêchant quelqu’un d’interdire arbitrairement le contenu. Même les développeurs de Bastyon ne peuvent interdire qui que ce soit, la plate-forme est modérée par l’utilisateur';
_l.aboutServices3 = 'Même les développeurs de Bastyon ne peuvent interdire une personne, la plate-forme est modérée par l’utilisateur';
_l.aboutServices4 = 'Bitcoin des médias sociaux';
_l.aboutServices5 = 'Bastyon fonctionne sur la blockchain et ne dépend d’aucun site Web ou domaine. Tant qu’il y a plusieurs nœuds en cours d’exécution quelque part dans le monde, le réseau peut fonctionner et les créateurs auront accès aux abonnés et aux utilisateurs au contenu.';
_l.aboutServices6 = 'Bastyon est le “Bitcoin des médias sociaux”';

_l.aboutServices7 = 'Protection de la vie privée';
_l.aboutServices8 = 'Le compte Bastyon n’est pas lié à votre identité ou à un numéro de téléphone, seule la vérification par courriel est requise. Plusieurs comptes sont autorisés pour protéger votre vie privée. Aucune donnée personnelle n’est jamais acquise ou stockée. Bastyon dispose également d’un messager crypté peer-to-peer. ';
_l.aboutServices9 = 'Votre vie privée est l’objectif principal de Bastyon. Votre clé privée n’est connue que de vous et ne peut pas être récupérée même par les développeurs.';
_l.aboutServices10 = 'De plus, les pirates informatiques ne peuvent pas entrer dans votre compte ni modifier votre mot de passe.';

_l.aboutServices11 = 'Gagnez avec Bastyon';
_l.aboutServices12 = 'Vous pouvez être payé 1,000 USD';
_l.aboutServices13 = 'Il existe de nombreuses façons de monétiser votre contenu en utilisant Pocketcoin (PKOIN). Contrairement à You earn PKOIN pour le contenu populaire, les utilisateurs peuvent joindre PKOIN aux commentaires en vedette. Un marché de l’annonce décentralisé dont les recettes sont reversées à 100% aux blogueurs devrait être lancé en décembre 2021.  ';

_l.aboutServices14 = 'Téléchargez vos vidéos';
_l.aboutServices15 = 'Bastyon vous permet';
_l.aboutServices16 = 'partagez vos publications et vidéos';
_l.aboutServices17 = ', Téléchargez-les en toute sécurité, importez-les depuis YouTube (contactez-nous pour que nous puissions vous aider!), assurez-vous de les rendre visibles à tous. Pour toujours. Personne ne pourra les supprimer ou les interdire.' ;


_l.aboutServices18 = 'Source ouverte';
_l.aboutServices19 = 'Nous croyons que';
_l.aboutServices20 = 'Confidentialité et sécurité';
_l.aboutServices21 = 'doivent passer par des projets Source Ouverte. L’ensemble du projet est disponible sur GitHub afin que vous puissiez vérifier qu’il n’y a pas de portes dérobées et que Bastyon ne stocke aucune donnée personnelle' ;

_l.aboutNewBlock = 'Comment gagner avec Bastyon';
_l.aboutNewBlock1 = 'Contenu populaire et commentaires en vedette';
_l.aboutNewBlock2 = 'Vous gagnez des PKOIN pour les votes des utilisateurs actifs sur la plateforme. Ainsi, si vous amenez votre public, vous serez protégé de la censure, tout en gagnant pour leur interaction avec votre contenu. Vos abonnés peuvent également ajouter des PKOIN à leurs commentaires pour les présenter sous votre message, 100% des recettes vous reviennent, car il n’y a pas d’entité corporative.';
_l.aboutNewBlock3 = 'Programme de bonus';
_l.aboutNewBlock4 = 'Bastyon a un programme de bonus à durée limitée pour les blogueurs vidéo avec des gains de 1 000 USD pour chaque 15k vues de vidéos, 1000 utilisateurs invités et 1 250 interactions. Le bonus est payé en Bitcoin ou PKOIN, selon la préférence du blogueur. Il s’agit d’un programme à durée limitée.';
_l.aboutNewBlock5 = 'Annonces décentralisées';
_l.aboutNewBlock6 = 'Un marché publicitaire décentralisé dont la sortie est prévue pour décembre 2021 permettra aux annonceurs de créer des publications et de les proposer aux blogueurs. Un blogueur peut examiner la publication de l’annonce et la republier, le cas échéant. Toutes les interactions sur le canal des blogueurs iront directement au portefeuille du blogueur, 100% du produit de l’annonce.';



_l.aboutOpen = 'Découvrez Bastyon';
_l.aboutOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutOpen2 = 'Site internet officiel';
_l.aboutOpen3 = 'Contactez-nous';
_l.aboutOpen4 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
_l.aboutOpen5 = 'Code Source';

/////////////aboutYoutube
_l.aboutMainBoard = 'Bastyon – la meilleure alternative à YouTube';
_l.aboutYoutubeMainDescription1 = 'Certaines personnes nous demandent:';
_l.aboutYoutubeMainDescription2 = '"Pourquoi devrais-je utiliser Bastyon?"';
_l.aboutYoutubeMainDescription3 = 'La vraie question est:';
_l.aboutYoutubeMainDescription4 = '"Pourquoi devriez-vous utiliser YouTube?!"';
_l.aboutYoutubeMainDescription5 = 'YOUTUBE A BANNI ET DÉMONÉTISÉ DES MILLIERS DE COMPTES';
_l.aboutYoutubeMainDescription6 = 'DES PERSONNES AVEC DES CENTAINES DE MILLIERS D’ABONNÉS';
_l.aboutYoutubeMainDescription7 = 'MÊME LORSQU’ILS NE SONT PAS INTERDITS, LES AUTEURS SONT BANNIS OU DEMONÉTISER';

_l.aboutYoutubeThreeColumn1 = 'Imagine: un jour vous avez 20k, 100k ou même 1M d’abonnés sur votre chaîne YouTube.';
_l.aboutYoutubeThreeColumn2 = 'Le lendemain, votre compte n’existe plus.';
_l.aboutYoutubeThreeColumn3 = 'Banni, pour toujours. Aucune chance de faire appel.';
_l.aboutYoutubeThreeColumn4 = 'Vous savez, vous n’avez pas seulement perdu vos abonnés.';
_l.aboutYoutubeThreeColumn5 = 'Vous avez perdu un revenu passif constant généré par l’ADS sur vos vidéos.';
_l.aboutYoutubeThreeColumn6 = 'Vous avez perdu des milliers de personnes qui vous suivaient et partageaient vos vidéos.';
_l.aboutYoutubeThreeColumn7 = 'Vous avez perdu l’accès à vos vidéos si vous n’aviez pas de sauvegarde.';
_l.aboutYoutubeThreeColumn8 = 'Le pire, c’est que les décisions de YouTube sont arbitraires et sont généralement finales';
_l.aboutYoutubeThreeColumn9 = 'Le pire, c’est que les décisions de YouTube sont généralement finales.';
_l.aboutYoutubeThreeColumn10 = 'Vous n’avez aucun moyen de récupérer votre chaîne, vos abonnés et votre argent. Ils sont partis, pour toujours.' ;
_l.aboutYoutubeThreeColumn11 = 'Déplacez-vous vers Bastyon avant qu’il ne soit trop tard. Nous pouvons importer vos vidéos sans effort, et vous pouvez être payé 1 000 $ pour chaque 15 000 visionnements ! (Plus de 1 250 interactions et 1 000 utilisateurs invités sur votre chaîne) ' ;
_l.aboutYoutubeThreeColumn12 = 'Qu’attendez-vous?!';

_l.aboutYoutubeH3Section = 'Construire une communauté d’abonnés sur YouTube, c’est comme construire une maison sur un terrain que vous ne possédez pas.';

_l.aboutYoutubeImgAndText1 = 'GAGNEZ AVEC BASTYON PAS DE DÉMONÉTISATION';

_l.aboutYoutubeImgAndText2 =  'Bastyon vous paie pour poster des vidéos et pour chaque interaction (like/commentaire) que vous obtenez. À l’heure actuelle, Bastyon a un programme de bonus qui vous donne 1 000 $ (en crypto-monnaie) pour chaque 15 000 vues + 1 250 interactions + 1 000 utilisateurs invités sur votre chaîne';
_l.aboutYoutubeImgAndText3 = 'Et vous pouvez parler de sujets « sensibles ». Vous ne serez jamais bloqué ou démonétisé, si vous ne publiez pas de pornographie ou de contenu illégal qui sera modéré par la communauté. De plus, si vous amenez vos abonnés, vous obtenez également des références.'
_l.aboutYoutubeImgAndText4 = 'Zone de liberté d’expression – Modéré par la communauté';
_l.aboutYoutubeImgAndText5 = 'Sur Bastyon, vous pouvez parler de sujets sensibles (et ils se multiplient de jour en jour): COVID, politique, changement climatique, premier et deuxième amendement. La communauté d’utilisateurs modère Bastyon et les seuls sujets bloqués sont la pornographie et les contenus illicites.' ;
_l.aboutYoutubeImgAndText6 = 'Nous croyons en une véritable liberté d’expression et la communauté des utilisateurs n’interdit ni ne modère le contenu en fonction d’un désaccord d’opinions. Et Bastyon n’appartient pas à une société et est indépendante du système bancaire.'
_l.aboutYoutubeImgAndText7 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutYoutubeImgAndText8 = 'Bastyon ne collecte aucune information personnelle. Pas de nom, pas de numéro de téléphone, pas d’adresse IP, pas votre identité. Votre connexion au compte Bastyon est votre clé privée, vous seul avez le contrôle sur elle, même les développeurs ne pourraient pas y accéder ou la restaurer, en cas de perte.' ;
_l.aboutYoutubeImgAndText9 = 'AUCUNE CENSURE';
_l.aboutYoutubeImgAndText10 = 'Bastyon ne censurera pas vos vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir. Votre compte est LE VÔTRE et vos abonnés seront toujours libres de vous suivre.' ;
_l.aboutYoutubeImgAndText11 = 'Bastyon est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des comptes et des vidéos';
_l.aboutYoutubeImgAndText12 = 'Chaque vidéo est enregistrée sur la blockchain et, pour sa nature, elle ne peut pas être supprimée. Par n’importe qui.' ;
_l.aboutYoutubeImgAndText13 = 'Chaque vidéo que vous publiez sera là pour toujours. Personne, vraiment, ne peut les censurer. Personne ne peut supprimer vos vidéos, vos abonnés et votre compte.' ;
_l.aboutYoutubeImgAndText14 = 'Résistance à la censure';
_l.aboutYoutubeImgAndText15 = 'Bastyon s’exécute sur un réseau de nœuds sur les machines des utilisateurs. Même si le site Web principal Bastyon.com est bloqué, la plate-forme fonctionne toujours normalement via une application de bureau. Parce qu’il n’y a pas de société, personne ne peut imposer à Bastyon une censure dont les utilisateurs ne veulent pas.' ;
_l.aboutYoutubeImgAndText16 = 'Bastyon est un protocole, pas une entreprise ou un réseau social';
_l.aboutYoutubeImgAndText17 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas de société derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon';

_l.aboutYoutubeSecondBoard1 = 'Bastyon - la meilleure alternative à YouTube';
_l.aboutYoutubeSecondBoard2 = 'Vos données personnelles ne sont pas vendues à des sociétés externes';
_l.aboutYoutubeSecondBoard3 =  'Personne ne peut bloquer votre compte ou supprimer vos vidéos et abonnés';
_l.aboutYoutubeSecondBoard4 = 'Aucune information personnelle des utilisateurs';
_l.aboutYoutubeSecondBoard5 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde, même si le domaine n’est pas accessible.';
_l.aboutYoutubeSecondBoard6 = 'Gardez vos abonnés pour toujours, ils sont à vous';
_l.aboutYoutubeSecondBoard7 = 'Bastyon ne supprimera pas vos abonnés, vos vidéos et votre argent!';
_l.aboutYoutubeSecondBoard8 = 'Vous ne serez jamais DÉMONÉTISÉ et vous conservez 100% du produit de l’annonce. La liberté d’expression est réelle.' ;
_l.aboutYoutubeSecondBoard9 = 'Vous gagnerez PLUS pour poster vos vidéos!';

_l.aboutYoutubeThirdBoard1 = 'Propriété du compte';
_l.aboutYoutubeThirdBoard2 = 'Propriété de YouTube.';
_l.aboutYoutubeThirdBoard3 = 'Votre clé privée vous appartient';
_l.aboutYoutubeThirdBoard4 = 'Censure';
_l.aboutYoutubeThirdBoard5 = 'Oui, censure sélective et arbitraire';
_l.aboutYoutubeThirdBoard6 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modéré';
_l.aboutYoutubeThirdBoard7 = 'Code de source ouverte';
_l.aboutYoutubeThirdBoard8 = 'NON.';
_l.aboutYoutubeThirdBoard9 = 'Oui, ouvert à tous';
_l.aboutYoutubeThirdBoard10 = 'Mêmes règles pour tous' ;
_l.aboutYoutubeThirdBoard11 = 'Oui, basé sur du code open source';
_l.aboutYoutubeThirdBoard12 = 'Monétisation';
_l.aboutYoutubeThirdBoard13 = 'YouTube partage ce qu’il veut';
_l.aboutYoutubeThirdBoard14 = '100% au blogueur';
_l.aboutYoutubeThirdBoard15 = 'Et si le domaine était bloqué dans un pays?';
_l.aboutYoutubeThirdBoard16 = 'YouTube est inaccessible';
_l.aboutYoutubeThirdBoard17 = 'Bastyon fonctionne directement avec les nœuds';
_l.aboutYoutubeThirdBoard18 = 'Cryptomonnaie interne pour la monétisation et les paiements';
_l.aboutYoutubeThirdBoard19 = 'Non';
_l.aboutYoutubeThirdBoard20 = 'Oui';
_l.aboutYoutubeThirdBoard21 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
_l.aboutYoutubeThirdBoard22 = 'Non';
_l.aboutYoutubeThirdBoard23 = 'Oui';
_l.aboutYoutubeThirdBoard24 = 'Informations personelles';
_l.aboutYoutubeThirdBoard25 = 'Nom, numéro de téléphone';
_l.aboutYoutubeThirdBoard26 = 'Non';






_l.aboutYoutubeThirdBoard18 = 'Signaler des vidéos';
_l.aboutYoutubeThirdBoard19 = 'OUI, les algorithmes YouTube analysent les vidéos et les suppriment ou les bloquent automatiquement s’ils estiment qu’ils sont contraires à la politique. En outre, YouTube peut supprimer des publications et bannir des utilisateurs à sa seule discrétion.'
_l.aboutYoutubeThirdBoard20 = 'OUI, mais seuls les utilisateurs ayant une grande réputation peuvent signaler une publication et une publication est rendue « invisible » sur la page de flux (mais reste disponible sur la page de profil de l’utilisateur) uniquement si plusieurs dizaines d’utilisateurs de grande réputation le signalent (les rapports ne peuvent être faits que pour racisme, discours de haine et pornographie).';
_l.aboutYoutubeThirdBoard21 = 'Hashtags pour classer les vidéos';
_l.aboutYoutubeThirdBoard22 = 'Les vidéos peuvent être partagés sur plusieurs plateformes';
_l.aboutYoutubeThirdBoard23 = 'Interdictions de dictature';
_l.aboutYoutubeThirdBoard24 = 'Beaucoup trop!';
_l.aboutYoutubeThirdBoard25 = 'Bastyon vous paie beaucoup plus que YouTube!';
_l.aboutYoutubeThirdBoard26 = 'Vous pouvez gagner de l’argent avec Bastyon.';
_l.aboutYoutubeThirdBoard27 = 'Bastyon utilise sa propre crypto-monnaie:';
_l.aboutYoutubeThirdBoard28 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutYoutubeThirdBoard29 = 'Chaque fois qu’une de vos vidéos obtient 15k vues, plus 1250 réactions et 1000 utilisateurs référents, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!!';
_l.aboutYoutubeThirdBoard30 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutYoutubeThirdBoard31 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';

_l.aboutYoutubeOpenBoard1 = 'Découvrez Bastyon';
_l.aboutYoutubeOpenBoard2 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutYoutubeOpenBoard3 = 'Site internet officiel';

_l.sourceCode = 'Code Source';

_l.aboutYoutubeDiscover1 = 'Rejoignez Bastyon aujourd’hui et appropriez-vous votre destin!';
_l.aboutYoutubeDiscover2 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
////////////////////////////////////////////////////Twitter
_l.aboutMainBoard = 'Bastyon, La meilleure alternative à Twitter. Laissez derrière vous les interdictions et les suspensions.' ;
_l.aboutMainBoard1 = 'Réseau social gratuit, privé et sécurisé';

_l.aboutTwitterMainDescriptionText1 = 'Certaines personnes nous demandent:';
_l.aboutTwitterMainDescriptionText2 = '"Pourquoi devrais-je utiliser Bastyon?"';
_l.aboutTwitterMainDescriptionText3 = 'La vraie question est:';
_l.aboutTwitterMainDescriptionText4 = '"Pourquoi devriez-vous utiliser Twitter?!"';
_l.aboutTwitterMainDescriptionText5 =  'TWITTER AGIT COMME UN GOUVERNEMENT DICTATORIQUE';
_l.aboutTwitterMainDescriptionText6 = 'Oui, nous savons que c’est une déclaration forte.';
_l.aboutTwitterMainDescriptionText7 =  'Mais malheureusement, c’est ce qui s’est passé sur Twitter.';

_l.aboutTwitterThreeColumn1 = 'Beaucoup, beaucoup trop de comptes ont été interdits ces dernières années. Certains d’entre eux sans aucune raison.' ;
_l.aboutTwitterThreeColumn2 = 'Autres simplement parce qu’ils étaient d’un côté politique spécifique (conservateur)';
_l.aboutTwitterThreeColumn3 = 'Ici, vous trouverez ci-dessous une courte liste des comptes qui ont été interdits ou suspendus par Twitter, ainsi que la raison.' ;
_l.aboutTwitterThreeColumn4 = 'Vous pouvez faire vos propres considérations: vous pouvez facilement réaliser comment Twitter a banni des gens pour plusieurs raisons non spécifiées, pour avoir simplement dit que le chef des talibans était pro-charia, pour avoir soutenu le mouvement « Occupé » sans enfreindre aucune politique.' ;
_l.aboutTwitterThreeColumn5 = 'C’est le genre de censure que nous ne voulons pas sur Bastyon, et c’est pourquoi le protocole a été créé en premier lieu';

_l.aboutTitterBannedAcc1 = 'Construire une communauté sur Twitter, c’est comme construire une maison sur un terrain que vous ne possédez pas.';
_l.aboutTitterBannedAcc2 = 'Cliquez ici pour voir la liste des comptes interdits par Twitter en 2019';
_l.aboutTitterBannedAcc3 = 'Compte';
_l.aboutTitterBannedAcc4 = 'Wikipédia';
_l.aboutTitterBannedAcc5 = 'Individuel/compte';
_l.aboutTitterBannedAcc6 = 'Description';
_l.aboutTitterBannedAcc7 = 'Date';
_l.aboutTitterBannedAcc8 = 'Durée';
_l.aboutTitterBannedAcc9 = 'Raison de la suspension';
_l.aboutTitterBannedAcc10 = 'Abonnés au moment de la suspension';
_l.aboutTitterBannedAcc11 = '“Darren Mills” ';
_l.aboutTitterBannedAcc12 = 'Compte lié à la Russie ';

_l.aboutTitterBannedAcc13 = '43285';
_l.aboutTitterBannedAcc14 = 'Permanent';
_l.aboutTitterBannedAcc15 = 'Démasqué en tant que personne fictive exploitée par une usine de trolls russe.';

_l.aboutTitterH3Section1 = 'Pourquoi Bastyon?';
_l.aboutTitterH3Section2 = 'AUCUN CONTROL GOUVERNEMENTAL';
_l.aboutTitterH3Section3 = 'Bastyon fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal Bastyon.com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à Bastyon.' ;
_l.aboutTitterH3Section4 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutTitterH3Section5 = 'Bastyon ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;
_l.aboutTitterImgAndText1 = 'AUCUNE CENSURE';
_l.aboutTitterImgAndText2 ='Bastyon ne censurera pas vos publications et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.'
_l.aboutTitterImgAndText3 = 'Contrairement à Twitter, Bastyon n’applique pas une méthode de type dictature pour supprimer le contenu et les utilisateurs. Il existe une liste longue de personnes qui ont été bannies, temporairement ou définitivement, par Twitter pour des raisons superficielles ou sans raison apparente du tout.' ;
_l.aboutTitterImgAndText4 = 'Sur Bastyon, les interdictions sont tout simplement impossibles: elles sont basées sur la blockchain et personne n’a le pouvoir d’en annuler un blocage. Chaque message restera toujours là. Même si un administrateur ou un utilisateur veut interdire vos publications, il ne pourra jamais le faire.' ;
_l.aboutTitterImgAndText5 = 'La censure est interdite par la technologie elle-même. Même si un jour les créateurs de Bastyon veulent fermer la plateforme, les messages seront toujours là et le réseau social pourra être recréé à partir du même point où il a été laissé.' ;
_l.aboutTitterImgAndText6 = 'AUCUNE ENTREPRISE DERRIÈRE BASTYON';
_l.aboutTitterImgAndText7 = 'Contrairement à Twitter et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon. Pas d’interdictions, pas de censure.' ;
_l.aboutTitterImgAndText8 = 'Contrairement à Twitter...';
_l.aboutTitterImgAndText9 = 'Vous ne serez jamais bloqué ou banni pour avoir simplement soutenu vos idées, vos religions, vos mouvements sans blesser les autres.' ;
_l.aboutTitterImgAndText10 = 'Personne ne peut bloquer votre compte ou supprimer vos publications. ' ;
_l.aboutTitterImgAndText11 = 'La confidentialité est complète et garantie' ;
_l.aboutTitterImgAndText12 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde' ;
_l.aboutTitterImgAndText13 = 'Les sessions de chat sont entièrement privées et cryptées et même Bastyon ne peut y accéder. Pas même avec un mandat d’arrêt du tribunal.' ;
_l.aboutTitterImgAndText14 = 'Vos publications peuvent être plus longues';



_l.aboutTitterTable1 = 'TWITTER';
_l.aboutTitterTable2 = 'BASTYON';
_l.aboutTitterTable3 = 'Propriété du compte';
_l.aboutTitterTable4 = 'Propriété de Twitter';
_l.aboutTitterTable5 = 'Votre clé privée vous appartient';
_l.aboutTitterTable6 = 'Vous accédez à votre audience';
_l.aboutTitterTable7 = 'Tous vos abonnés ne voient pas votre publication, Facebook contrôle la proportion de l’audience qui la voit';
_l.aboutTitterTable8 = 'Chaque abonné voit votre publication';
_l.aboutTitterTable9 = 'Censure';
_l.aboutTitterTable10 = 'Oui, censure sélective et arbitraire, beaucoup de shadowbanning';
_l.aboutTitterTable11 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modérés';
_l.aboutTitterTable12 = 'Code de source ouverte ';
_l.aboutTitterTable13 = 'Non';
_l.aboutTitterTable14 = 'Oui, ouvert à tous';
_l.aboutTitterTable15 = 'Les mêmes règles pour tous';
_l.aboutTitterTable16 = 'Non';
_l.aboutTitterTable17 = 'Oui, basé sur du code open source';
_l.aboutTitterTable18 = 'Monétisation';
_l.aboutTitterTable19 = "Twitter partage ce qu'il veut";
_l.aboutTitterTable20 = '100% au blogueur via PKOIN';
_l.aboutTitterTable21 = 'Et si le domaine était bloqué dans un pays?';
_l.aboutTitterTable22 = 'Twitter est inaccessible';
_l.aboutTitterTable23 = 'Bastyon fonctionne directement avec les nœuds';
_l.aboutTitterTable24 = 'Messages personnels';
_l.aboutTitterTable25 = 'Twitter peut lire tous les messages';
_l.aboutTitterTable26 = 'Bastyon utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
_l.aboutTitterTable27 = 'Cryptomonnaie interne pour la monétisation et les paiements';
_l.aboutTitterTable28 = 'Non';
_l.aboutTitterTable29 = 'Oui';
_l.aboutTitterTable30 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
_l.aboutTitterTable31 = 'Non';
_l.aboutTitterTable32 = 'Oui';
_l.aboutTitterTable33 = 'information personnelle';
_l.aboutTitterTable34 = 'Nom, numéro de téléphone';
_l.aboutTitterTable35 = 'Non';



_l.aboutTitterMainBoard31 = 'Et il y a plus! Bastyon vous paie. »';
_l.aboutTitterMainBoard32 = 'Vous pouvez gagner de l’argent avec Bastyon.';
_l.aboutTitterMainBoard33 = 'Bastyon utilise sa propre crypto-monnaie:';
_l.aboutTitterMainBoard34 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutTitterMainBoard35 = 'Chaque fois qu’une de vos vidéos obtient 15 000 vues + 1 250 réactions, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!! »';
_l.aboutTitterMainBoard36 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutTitterMainBoard37 = 'Contactez-nous pour en savoir plus et pour activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';


_l.aboutTitterOpen1 = 'Découvrez Bastyon';
_l.aboutTitterOpen2 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.’';
_l.aboutTitterOpen3 = 'Site internet officiel';
_l.aboutTitterOpen4 = 'Code Source';
_l.aboutTitterOpen5 = 'Contactez-nous';
_l.aboutTitterOpen6 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';


/////////////aboutFacebook
_l.aboutFbMainBoard = 'Bastyon – la meilleure alternative à Facebook';
_l.aboutFbMainBoard1 = 'Protocole financier et social';

_l.aboutFbMainDesc = '"Bastyon n’est pas une alternative à Facebook. »';
_l.aboutFbMainDesc1 = 'Bastyon est Anti-Facebook.';
_l.aboutFbMainDesc2 = '-- John Milton';


_l.aboutFbH3Section = 'Pourquoi Bastyon';
_l.aboutFbH3Section1 = 'AUCUN CONTROL GOUVERNEMENTAL';
_l.aboutFbH3Section2 = 'Bastyon fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal Bastyon.com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à Bastyon. '
_l.aboutFbH3Section3 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutFbH3Section4 = 'Bastyon ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;



_l.aboutFbImgAndText = 'AUCUNE CENSURE';
_l.aboutFbImgAndText2 = 'Bastyon ne censurera pas vos messages et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.' ;
_l.aboutFbImgAndText3 = 'Bastyon est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des messages. Chaque message est enregistré sur la blockchain et, pour sa nature, il ne peut pas être supprimé. Par n’importe qui.';
_l.aboutFbImgAndText4 = 'AUCUNE ENTREPRISE DERRIÈRE BASTYON';
_l.aboutFbImgAndText5 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon. Pas d’interdictions, pas de censure.' ;
_l.aboutFbImgAndText6 = 'Contrairement à Facebook…';
_l.aboutFbImgAndText7 = 'Vos données personnelles ne sont pas vendues à des sociétés externes ' ;
_l.aboutFbImgAndText8 = 'Pas de censure arbitraire ';
_l.aboutFbImgAndText9 = 'Ne prends aucune information personnelle';
_l.aboutFbImgAndText10 = 'Aucune société derrière cela ';
_l.aboutFbImgAndText11 = 'Les sessions de chat sont entièrement privées et cryptées et même Bastyon ne peut y accéder. ';
_l.aboutFbImgAndText12 = 'Mark Zuckerberg ne vous dérangera pas!';



_l.aboutFbTable = 'FACEBOOK';
_l.aboutFbTable1 = 'BASTYON';
_l.aboutFbTable2 = 'Propriété du compte';
_l.aboutFbTable3 = 'Propriété de Facebook';
_l.aboutFbTable4 = 'Votre clé privée vous appartient';
_l.aboutFbTable5 = 'Vous accédez à votre audience';
_l.aboutFbTable6 = 'Tous vos abonnés ne voient pas votre publication, Facebook contrôle la proportion de l’audience qui la voit';
_l.aboutFbTable7 = 'Chaque abonné voit votre publication';
_l.aboutFbTable8 = 'Censure';
_l.aboutFbTable9 = 'Oui, censure sélective et arbitraire';
_l.aboutFbTable10 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modérés';
_l.aboutFbTable11 = 'Code de source ouverte ';
_l.aboutFbTable12 = 'Non';
_l.aboutFbTable13 = 'Oui, ouvert à tous';
_l.aboutFbTable14 = 'Les mêmes règles pour tous';
_l.aboutFbTable15 = 'Non';
_l.aboutFbTable16 = 'Oui, basé sur du code open source';
_l.aboutFbTable17 = 'Monétisation';
_l.aboutFbTable18 = 'Facebook partage ce qu’il veut';
_l.aboutFbTable19 = '100% au blogueur via PKOIN';
_l.aboutFbTable20 = 'Et si le domaine était bloqué dans un pays?';
_l.aboutFbTable21 = 'Facebook est inaccessible';
_l.aboutFbTable22 = 'Bastyon fonctionne directement avec les nœuds';
_l.aboutFbTable23 = 'Messages personnels';
_l.aboutFbTable24 = 'Facebook peut lire chaque message';
_l.aboutFbTable25 = 'Bastyon utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
_l.aboutFbTable26 = 'Mark Zuckerberg';
_l.aboutFbTable27 = 'Toujours à vos côtés';
_l.aboutFbTable28 = 'NON!';
_l.aboutFbTable29 = 'Cryptomonnaie interne pour la monétisation et les paiements'
_l.aboutFbTable30 = 'Non';
_l.aboutFbTable31 = 'Oui';
_l.aboutFbTable32 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
_l.aboutFbTable33 = 'Non';
_l.aboutFbTable34 = 'Oui';
_l.aboutFbTable35 = 'informations personnelles';
_l.aboutFbTable36 = 'Nom, numéro de téléphone';
_l.aboutFbTable37 = 'Non';



_l.aboutFbMainBoard3 = 'Et il y a plus! Bastyon vous paie.' ;
_l.aboutFbMainBoard31 = 'Vous pouvez gagner de l’argent avec Bastyon.';
_l.aboutFbMainBoard32 = 'Bastyon utilise sa propre crypto-monnaie: ';
_l.aboutFbMainBoard33 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutFbMainBoard34 = 'Chaque fois qu’une de vos vidéos obtient 15 000 vues + 1 250 réactions, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!! ';
_l.aboutFbMainBoard34 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutFbMainBoard35 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez poster un nombre illimité de vidéos et être payé!';


_l.aboutFbOpen = 'Découvrez Bastyon';
_l.aboutFbOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.’'; 
_l.aboutFbOpen2 = 'Site internet officiel';
_l.aboutFbOpen3 = 'Code Source';
_l.aboutFbOpen4 = 'Contactez-nous';
_l.aboutFbOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!'; 


/////aboutHIW

_l.aboutHowItWMainBoard = 'COMMENT BASTYON RÉSISTE-T-IL À LA CENSURE?';
_l.aboutHowItWMainBoard1 = 'GRATUIT, PRIVÉ, SÉCURISÉ ET SANS CONTRÔLE D’ENTREPRISE.';
_l.aboutHowItWMainBoard2 = 'PROFITEZ DE L’AIR FRAIS DE BASTYON.';



_l.aboutHowItWMD = '"Bastyon est le Bitcoin des réseaux sociaux."';



_l.aboutHowItWImgAndText = 'Basé sur le Blockchain';
_l.aboutHowItWImgAndText1 = 'Qu’est-ce qu’un blockchain?';
_l.aboutHowItWImgAndText2 = 'Comme le mentionne Wikipédia, « Une blockchain est une liste croissante d’enregistrements, appelés blocs, qui sont liés entre eux à l’aide de la cryptographie. ';

_l.aboutHowItWImgAndText3 = 'Il est également décrit comme un « stockage de données immuable peer-to-peer sans confiance et entièrement décentralisé » qui est réparti sur un réseau de participants souvent appelés nœuds. Chaque bloc contient un hachage cryptographique du bloc précédent, un horodatage et des données de transaction.' ;
_l.aboutHowItWImgAndText4 = 'L’horodatage prouve que les données de transaction existaient lorsque le bloc a été publié afin d’entrer dans son hachage.';
_l.aboutHowItWImgAndText5 = 'Comme les blocs contiennent chacun des informations sur le bloc précédent, ils forment une chaîne, chaque bloc supplémentaire renforçant ceux qui le précèdent.';
_l.aboutHowItWImgAndText6 = 'Par conséquent, les blockchains sont résistantes à la modification de leurs données car une fois enregistrées, les données d’un bloc donné ne peuvent pas être modifiées rétroactivement sans modifier tous les blocs suivants."';
_l.aboutHowItWImgAndText7 = 'Alors, comment la blockchain protège-t-elle de la censure?';
_l.aboutHowItWImgAndText8 = 'Des Bitcoins à Bastyon.';
_l.aboutHowItWImgAndText9 = 'La blockchain est la technologie derrière toutes les crypto-monnaies. Bitcoins, Ethereum, Dogecoins et ainsi de suite sont tous alimentés par la Blockchain.';
_l.aboutHowItWImgAndText10 = 'Le principe est simple: ce qui se passe sur la blockchain, reste sur la blockchain. Pour toujours.' ;
_l.aboutHowItWImgAndText11 = 'Tous les blocs existants de la blockchain sont immuables et permanents. ';
_l.aboutHowItWImgAndText12 = 'Pensez à la crypto-monnaie: lorsque vous envoyez des Bitcoins (ou des parties de ceux-ci) à quelqu’un, la transaction est enregistrée sur la blockchain.';
_l.aboutHowItWImgAndText13 = 'À partir de ce moment, la transaction ne peut plus être annulée, modifiée, modifiée, supprimée, suspendue, modifiée dans aucune de ses parties. Il est là et y reste pour toujours. Et vous pouvez explorer les blocs de la blockchain pour voir toutes les transactions.' ;
_l.aboutHowItWImgAndText14 = 'Bastyon fonctionne EXACTEMENT de la même manière. Chaque publication, chaque compte, chaque vidéo est enregistrée sur la blockchain. Et une fois sur le site, il ne peut pas être enlevé.' ;
_l.aboutHowItWImgAndText15 = 'En effet, Bastyon travaille sur un fork de la blockchain Bitcoin originale.';
_l.aboutHowItWImgAndText16 = 'Résistant à la censure';
_l.aboutHowItWImgAndText17 = 'Pas seulement le Blockchain.';
_l.aboutHowItWImgAndText18 = 'Bastyon n’appartient pas à une société';
_l.aboutHowItWImgAndText19 = 'Bastyon est un projet open-source';
_l.aboutHowItWImgAndText20 = 'Bastyon fonctionne sur un réseau de nœuds décentralisés, si vous utilisez l’application de bureau Bastyon, elle parle directement aux nœuds du monde entier';
_l.aboutHowItWImgAndText21 = 'De plus, même si un gouvernement veut supprimer un message, c’est techniquement impossible.';
_l.aboutHowItWImgAndText22 = 'De même, comme il fonctionne sur un réseau de nœuds, il n’y a aucun moyen de limiter l’accès à Bastyon. Même dans le cas où un gouvernement bloque l’accès à https://bastyon.com, vous pourrez toujours y accéder à l’aide de l’application mobile ou de bureau, qui se connecte directement aux nœuds.' ;
_l.aboutHowItWImgAndText23 = 'Protection de la vie privée,';
_l.aboutHowItWImgAndText24 = 'pour votre sécurité';
_l.aboutHowItWImgAndText25 = 'Bastyon ne sait pas qui vous êtes.';
_l.aboutHowItWImgAndText26 = 'Bastyon NE collecte AUCUNE information personnelle.';
_l.aboutHowItWImgAndText27 = 'Vous pouvez vous inscrire sans révéler votre numéro de téléphone (seul l’e-mail est requis)' ;
_l.aboutHowItWImgAndText28 = 'Bastyon ne demande pas votre vrai nom pour protéger la dissidence';
_l.aboutHowItWImgAndText29 = 'Bastyon ne collecte pas d’adresses IP et ne vous suit pas' ;
_l.aboutHowItWImgAndText291 = 'Bastyon autorise plusieurs comptes à des fins différentes ';
_l.aboutHowItWImgAndText30 ='Bastyon ne saura jamais qui vous êtes, à moins que vous ne partagiez explicitement vos données personnelles.';
_l.aboutHowItWImgAndText31 = 'Si vous ne partagez pas vos données, personne, aucune entreprise, aucun gouvernement, ne peut savoir qui vous êtes.';


_l.aboutHowItWImgAndText51 = 'Pourquoi la crypto-monnaie est-elle bonne pour la liberté?';
_l.aboutHowItWImgAndText52 = 'Certaines personnes pensent que la monnaie numérique est un outil d’esclavage. Ironiquement, beaucoup de ces personnes portent des cartes bancaires avec un micro-navire dans leurs poches. Cartes bancaires qui suivent chaque achat et sont directement liées à votre identité. La raison pour laquelle la crypto-monnaie est bonne pour la liberté est qu’elle n’est pas liée à votre identité. Tant dans Bitcoin que dans Pocketcoin, chaque utilisateur peut créer des millions d’adresses et les modifier autant que nécessaire.' ;


_l.HIVTable1 = 'Carte de crédit';
_l.HIVTable2 = 'Argent';
_l.HIVTable3 = 'Crypto-monnaie';
_l.HIVTable4 = 'Lié à votre identité';
_l.HIVTable5 = 'Oui';
_l.HIVTable6 = 'Non';
_l.HIVTable7 = 'Non';
_l.HIVTable8 = 'Le gouvernement contrôle la masse monétaire';
_l.HIVTable9 = 'Oui';
_l.HIVTable10 = 'Oui';
_l.HIVTable11 = 'Non';
_l.HIVTable12 = 'Anonymement';
_l.HIVTable13 = 'Non-Anonyme';
_l.HIVTable14 = 'Anonyme';
_l.HIVTable15 = 'Pseudonyme';
_l.HIVTable16 = 'Facile à payer sur de grandes distances';
_l.HIVTable17 = 'Oui';
_l.HIVTable18 = 'Non';
_l.HIVTable19 = 'Oui';
_l.HIVTable20 = 'Transparent, ouvert au public';
_l.HIVTable21 = 'Non';
_l.HIVTable22 = 'Non';
_l.HIVTable23 = 'Oui';




_l.aboutHowItWImgAndText32 = 'Et il y a plus!';
_l.aboutHowItWImgAndText33 = 'Bastyon vous paie';
_l.aboutHowItWImgAndText34 = 'Vous pouvez gagner de l’argent avec Bastyon.';
_l.aboutHowItWImgAndText35 = 'Bastyon utilise sa propre crypto-monnaie:';
_l.aboutHowItWImgAndText36 = 'Chaque fois que vos messages reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutHowItWImgAndText37 = 'Chaque fois que votre vidéo obtient 15 000 vues + 750 réactions « 5 étoiles », vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE D’UNE DURÉE LIMITÉE!!! ';
_l.aboutHowItWImgAndText38 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutHowItWImgAndText39 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';
_l.aboutHowItWImgAndText40 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte Bastyon et accéder au programme de bonus.';
_l.aboutHowItWImgAndText41 = 'Contactez-nous maintenant!';


_l.aboutHowItWOpen = 'Découvrez Bastyon';
_l.aboutHowItWOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutHowItWOpen2 = 'Site internet officiel';
_l.aboutHowItWOpen3 = 'Code Source';
_l.aboutHowItWOpen4 = 'Contactez-nous';
_l.aboutHowItWOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';

//aboutContentCreator

_l.ContentCreatorsMainBoard = 'Excellent programme de bonus pour les créateurs de contenu';
_l.ContentCreatorsMainBoard1 = '"Il existe de nombreuses façons de gagner de l’argent avec Bastyon..."';


_l.ContentCreatorsImgAndText = 'Publiez vos vidéos';
_l.ContentCreatorsImgAndText1 = 'Publiez vos vidéos sur Bastyon';
_l.ContentCreatorsImgAndText2 = '15 000 vides, 1250 réactions de différents utilisateurs et 1000 utilisateurs invités sur votre chaîne';
_l.ContentCreatorsImgAndText3 = 'Vous rapporte 1 000 $ payés en Bitcoin ou PKOIN';
_l.ContentCreatorsImgAndText4 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte Bastyon et accéder au programme de bonus.';
_l.ContentCreatorsImgAndText5 = 'Contactez-nous maintenant!';
_l.ContentCreatorsImgAndText6 = 'Invitez vos abonnés';
_l.ContentCreatorsImgAndText7 = 'Partagez votre lien de parrainage personnel';
_l.ContentCreatorsImgAndText8 = 'Invitez vos followers depuis d’autres plateformes (Youtube, Instagram, Facebook, Twitter...)';
_l.ContentCreatorsImgAndText9 = 'Gagnez à partir des publications de vos abonnés!';
_l.ContentCreatorsImgAndText10 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
_l.ContentCreatorsImgAndText11 = 'Contactez-nous maintenant!';
_l.ContentCreatorsImgAndText12 = 'Gagnez de chaque publication';
_l.ContentCreatorsImgAndText13 = 'Chaque fois que votre message reçoit un like ou un commentaire, vous recevez une petite récompense';
_l.ContentCreatorsImgAndText14 = 'Plus vous publiez, plus vous gagnez';
_l.ContentCreatorsImgAndText15 = 'Plus vous avez d’abonnés, plus vous gagnez';
_l.ContentCreatorsImgAndText16 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
_l.ContentCreatorsImgAndText17 = 'Contactez-nous maintenant!';
_l.ContentCreatorsImgAndText18 = 'Gagnez avec des publicités décentralisées';
_l.ContentCreatorsImgAndText19 = 'Les annonces vous arrivent via Bastyon Ad Marketplace';
_l.ContentCreatorsImgAndText20 = 'Vous pouvez choisir les annonces à republier sur votre chaîne';
_l.ContentCreatorsImgAndText21 = '100% du produit de l’annonce provenant des interactions pour aller dans votre portefeuille';
_l.ContentCreatorsImgAndText22 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
_l.ContentCreatorsImgAndText23 = 'Contactez-nous maintenant!';
_l.ContentCreatorsImgAndText24 = 'Gagner avec les commentaires en vedette';
_l.ContentCreatorsImgAndText25 = 'Vos abonnés peuvent joindre PKOIN aux commentaires';
_l.ContentCreatorsImgAndText26 = 'Les commentaires avec PKOIN sont présentés sous votre message';
_l.ContentCreatorsImgAndText27 = 'Vous pouvez mentionner des commentaires sur l’air encourageant les utilisateurs à ajouter PKOIN';
_l.ContentCreatorsImgAndText28 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus. ';
_l.ContentCreatorsImgAndText29 = 'Contactez-nous maintenant!';



_l.ContentCreatorsOpen = 'Découvrez Bastyon';
_l.ContentCreatorsOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.ContentCreatorsOpen2 = 'Site internet officiel';
_l.ContentCreatorsOpen3 = 'Code Source';
_l.ContentCreatorsOpen4 = 'Contactez-nous';
_l.ContentCreatorsOpen5 = "Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!";

_l.lowstar1 = "L'équipe Bastyon met en place un moratoire temporaire sur les classifications 1 et 2 étoiles, à l'exception du contenu interdit. Le contenu interdit est :"
_l.lowstar_reason_1 = "Érotique/Porno"
_l.lowstar_reason_2 = "L'exploitation des enfants"
_l.lowstar_reason_3 = "Menace directe de violence"
_l.lowstar_reason_4 = "Drogues illégales"
_l.lowstar2 = "Veuillez ne pas utiliser les classements 1 et 2 étoiles pour d'autres raisons. Après la publication de la nouvelle modération à la mi-journée, vous pourrez utiliser les classements bas pour d'autres raisons"
_l.lowstaragree = "Je confirme que ce message contient l'un des quatre types de contenu interdit"

_l.androidPopupTitle = "Obtenir des informations non censurées dans l'application mobile Bastyon"
_l.androidPopupAgree = "Basculer vers l'application"
_l.androidPopupDisagree = "Pas maintenant"

_l.desktopPopupTitle = "Obtenir des informations non censurées dans l'application de bureau Bastyon"
_l.desktopPopupAgree = "Télécharger l'application"
_l.desktopPopupDisagree = "Pas maintenant"

_l.profanity_tag = 'impiété'

_l.saved = "Sauvegardé"
_l.savePost = "Sauvegarder le post"
_l.postsaved = "Post sauvegardé"
_l.deleteSavedPost = "Supprimer le post enregistré"
_l.doYouDownloadVideo = "Voulez-vous télécharger la vidéo sur votre appareil ?"
_l.gotosaved2 = "Afficher les posts"
_l.yes = "Oui"
_l.no = "Non"