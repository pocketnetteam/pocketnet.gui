if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.fr = {};
var appname = (window.project_config || {}).fullname || 'Bastyon'

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

_l.settings_save = "Sauver les modifications";
_l.settings_discard = "Annuler les modifications";

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
_l.e13086 = "Soutenez maintenant "+appname +""
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
_l.e13109h = "Cliquez sur les hexagones pour assembler l'image, puis saisissez du texte sur l'image résultante"

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
_l.e13178 = "Facultatif"
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
_l.works1 = ""+appname +" est un réseau innovant qui peut contourner les tactiques de censure courantes, telles que le blocage des domaines et l’interdiction des blogueurs pour dissidence";
_l.works2 = ""+appname +" est également une plate-forme de partage de vidéos qui, contrairement aux médias sociaux traditionnels et traditionnels, donne votre vie privée et la liberté de la censure arbitraire";  
_l.works3 = ""+appname +" est également un système financier privé et axé sur la liberté alimenté par Pocketcoin (PKOIN) qui est utilisé pour promouvoir le contenu et les biens";
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
_l.aboutServices2 = '"+appname +" existe sur des ordinateurs à nœuds décentralisés dans le monde entier gérés par des utilisateurs. Chaque ordinateur nœud fonctionne sur le même ensemble de règles transparentes, empêchant quelqu’un d’interdire arbitrairement le contenu. Même les développeurs de "+appname +" ne peuvent interdire qui que ce soit, la plate-forme est modérée par l’utilisateur';
_l.aboutServices3 = 'Même les développeurs de "+appname +" ne peuvent interdire une personne, la plate-forme est modérée par l’utilisateur';
_l.aboutServices4 = 'Bitcoin des médias sociaux';
_l.aboutServices5 = '"+appname +" fonctionne sur la blockchain et ne dépend d’aucun site Web ou domaine. Tant qu’il y a plusieurs nœuds en cours d’exécution quelque part dans le monde, le réseau peut fonctionner et les créateurs auront accès aux abonnés et aux utilisateurs au contenu.';
_l.aboutServices6 = '"+appname +" est le “Bitcoin des médias sociaux”';

_l.aboutServices7 = 'Protection de la vie privée';
_l.aboutServices8 = 'Le compte "+appname +" n’est pas lié à votre identité ou à un numéro de téléphone, seule la vérification par courriel est requise. Plusieurs comptes sont autorisés pour protéger votre vie privée. Aucune donnée personnelle n’est jamais acquise ou stockée. "+appname +" dispose également d’un messager crypté peer-to-peer. ';
_l.aboutServices9 = 'Votre vie privée est l’objectif principal de "+appname +". Votre clé privée n’est connue que de vous et ne peut pas être récupérée même par les développeurs.';
_l.aboutServices10 = 'De plus, les pirates informatiques ne peuvent pas entrer dans votre compte ni modifier votre mot de passe.';

_l.aboutServices11 = 'Gagnez avec "+appname +"';
_l.aboutServices12 = 'Vous pouvez être payé 1,000 USD';
_l.aboutServices13 = 'Il existe de nombreuses façons de monétiser votre contenu en utilisant Pocketcoin (PKOIN). Contrairement à You earn PKOIN pour le contenu populaire, les utilisateurs peuvent joindre PKOIN aux commentaires en vedette. Un marché de l’annonce décentralisé dont les recettes sont reversées à 100% aux blogueurs devrait être lancé en décembre 2021.  ';

_l.aboutServices14 = 'Téléchargez vos vidéos';
_l.aboutServices15 = '"+appname +" vous permet';
_l.aboutServices16 = 'partagez vos publications et vidéos';
_l.aboutServices17 = ', Téléchargez-les en toute sécurité, importez-les depuis YouTube (contactez-nous pour que nous puissions vous aider!), assurez-vous de les rendre visibles à tous. Pour toujours. Personne ne pourra les supprimer ou les interdire.' ;


_l.aboutServices18 = 'Source ouverte';
_l.aboutServices19 = 'Nous croyons que';
_l.aboutServices20 = 'Confidentialité et sécurité';
_l.aboutServices21 = 'doivent passer par des projets Source Ouverte. L’ensemble du projet est disponible sur GitHub afin que vous puissiez vérifier qu’il n’y a pas de portes dérobées et que "+appname +" ne stocke aucune donnée personnelle' ;

_l.aboutNewBlock = 'Comment gagner avec "+appname +"';
_l.aboutNewBlock1 = 'Contenu populaire et commentaires en vedette';
_l.aboutNewBlock2 = 'Vous gagnez des PKOIN pour les votes des utilisateurs actifs sur la plateforme. Ainsi, si vous amenez votre public, vous serez protégé de la censure, tout en gagnant pour leur interaction avec votre contenu. Vos abonnés peuvent également ajouter des PKOIN à leurs commentaires pour les présenter sous votre message, 100% des recettes vous reviennent, car il n’y a pas d’entité corporative.';
_l.aboutNewBlock3 = 'Programme de bonus';
_l.aboutNewBlock4 = '';
_l.aboutNewBlock5 = 'Annonces décentralisées';
_l.aboutNewBlock6 = 'Un marché publicitaire décentralisé dont la sortie est prévue pour décembre 2021 permettra aux annonceurs de créer des publications et de les proposer aux blogueurs. Un blogueur peut examiner la publication de l’annonce et la republier, le cas échéant. Toutes les interactions sur le canal des blogueurs iront directement au portefeuille du blogueur, 100% du produit de l’annonce.';



_l.aboutOpen = 'Découvrez "+appname +"';
_l.aboutOpen1 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutOpen2 = 'Site internet officiel';
_l.aboutOpen3 = 'Contactez-nous';
_l.aboutOpen4 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
_l.aboutOpen5 = 'Code Source';

/////////////aboutYoutube
_l.aboutMainBoard = '"+appname +" – la meilleure alternative à YouTube';
_l.aboutYoutubeMainDescription1 = 'Certaines personnes nous demandent:';
_l.aboutYoutubeMainDescription2 = '"Pourquoi devrais-je utiliser "+appname +"?"';
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
_l.aboutYoutubeThreeColumn11 = ' ' ;
_l.aboutYoutubeThreeColumn12 = 'Qu’attendez-vous?!';

_l.aboutYoutubeH3Section = 'Construire une communauté d’abonnés sur YouTube, c’est comme construire une maison sur un terrain que vous ne possédez pas.';

_l.aboutYoutubeImgAndText1 = 'GAGNEZ AVEC "+appname +" PAS DE DÉMONÉTISATION';

_l.aboutYoutubeImgAndText2 =  '';
_l.aboutYoutubeImgAndText3 = 'Et vous pouvez parler de sujets « sensibles ». Vous ne serez jamais bloqué ou démonétisé, si vous ne publiez pas de pornographie ou de contenu illégal qui sera modéré par la communauté. De plus, si vous amenez vos abonnés, vous obtenez également des références.'
_l.aboutYoutubeImgAndText4 = 'Zone de liberté d’expression – Modéré par la communauté';
_l.aboutYoutubeImgAndText5 = 'Sur "+appname +", vous pouvez parler de sujets sensibles (et ils se multiplient de jour en jour): COVID, politique, changement climatique, premier et deuxième amendement. La communauté d’utilisateurs modère "+appname +" et les seuls sujets bloqués sont la pornographie et les contenus illicites.' ;
_l.aboutYoutubeImgAndText6 = 'Nous croyons en une véritable liberté d’expression et la communauté des utilisateurs n’interdit ni ne modère le contenu en fonction d’un désaccord d’opinions. Et "+appname +" n’appartient pas à une société et est indépendante du système bancaire.'
_l.aboutYoutubeImgAndText7 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutYoutubeImgAndText8 = '"+appname +" ne collecte aucune information personnelle. Pas de nom, pas de numéro de téléphone, pas d’adresse IP, pas votre identité. Votre connexion au compte "+appname +" est votre clé privée, vous seul avez le contrôle sur elle, même les développeurs ne pourraient pas y accéder ou la restaurer, en cas de perte.' ;
_l.aboutYoutubeImgAndText9 = 'AUCUNE CENSURE';
_l.aboutYoutubeImgAndText10 = '"+appname +" ne censurera pas vos vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir. Votre compte est LE VÔTRE et vos abonnés seront toujours libres de vous suivre.' ;
_l.aboutYoutubeImgAndText11 = '"+appname +" est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des comptes et des vidéos';
_l.aboutYoutubeImgAndText12 = 'Chaque vidéo est enregistrée sur la blockchain et, pour sa nature, elle ne peut pas être supprimée. Par n’importe qui.' ;
_l.aboutYoutubeImgAndText13 = 'Chaque vidéo que vous publiez sera là pour toujours. Personne, vraiment, ne peut les censurer. Personne ne peut supprimer vos vidéos, vos abonnés et votre compte.' ;
_l.aboutYoutubeImgAndText14 = 'Résistance à la censure';
_l.aboutYoutubeImgAndText15 = '"+appname +" s’exécute sur un réseau de nœuds sur les machines des utilisateurs. Même si le site Web principal "+appname +".com est bloqué, la plate-forme fonctionne toujours normalement via une application de bureau. Parce qu’il n’y a pas de société, personne ne peut imposer à "+appname +" une censure dont les utilisateurs ne veulent pas.' ;
_l.aboutYoutubeImgAndText16 = '"+appname +" est un protocole, pas une entreprise ou un réseau social';
_l.aboutYoutubeImgAndText17 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas de société derrière "+appname +". C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur "+appname +"';

_l.aboutYoutubeSecondBoard1 = '"+appname +" - la meilleure alternative à YouTube';
_l.aboutYoutubeSecondBoard2 = 'Vos données personnelles ne sont pas vendues à des sociétés externes';
_l.aboutYoutubeSecondBoard3 =  'Personne ne peut bloquer votre compte ou supprimer vos vidéos et abonnés';
_l.aboutYoutubeSecondBoard4 = 'Aucune information personnelle des utilisateurs';
_l.aboutYoutubeSecondBoard5 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde, même si le domaine n’est pas accessible.';
_l.aboutYoutubeSecondBoard6 = 'Gardez vos abonnés pour toujours, ils sont à vous';
_l.aboutYoutubeSecondBoard7 = '"+appname +" ne supprimera pas vos abonnés, vos vidéos et votre argent!';
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
_l.aboutYoutubeThirdBoard17 = '"+appname +" fonctionne directement avec les nœuds';
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
_l.aboutYoutubeThirdBoard25 = '"+appname +" vous paie beaucoup plus que YouTube!';
_l.aboutYoutubeThirdBoard26 = 'Vous pouvez gagner de l’argent avec "+appname +".';
_l.aboutYoutubeThirdBoard27 = '"+appname +" utilise sa propre crypto-monnaie:';
_l.aboutYoutubeThirdBoard28 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutYoutubeThirdBoard29 = '';
_l.aboutYoutubeThirdBoard30 = 'Chaque fois que quelqu’un rejoint "+appname +" avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutYoutubeThirdBoard31 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';

_l.aboutYoutubeOpenBoard1 = 'Découvrez "+appname +"';
_l.aboutYoutubeOpenBoard2 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutYoutubeOpenBoard3 = 'Site internet officiel';

_l.sourceCode = 'Code Source';

_l.aboutYoutubeDiscover1 = 'Rejoignez "+appname +" aujourd’hui et appropriez-vous votre destin!';
_l.aboutYoutubeDiscover2 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
////////////////////////////////////////////////////Twitter
_l.aboutMainBoard = '"+appname +", La meilleure alternative à Twitter. Laissez derrière vous les interdictions et les suspensions.' ;
_l.aboutMainBoard1 = 'Réseau social gratuit, privé et sécurisé';

_l.aboutTwitterMainDescriptionText1 = 'Certaines personnes nous demandent:';
_l.aboutTwitterMainDescriptionText2 = '"Pourquoi devrais-je utiliser "+appname +"?"';
_l.aboutTwitterMainDescriptionText3 = 'La vraie question est:';
_l.aboutTwitterMainDescriptionText4 = '"Pourquoi devriez-vous utiliser Twitter?!"';
_l.aboutTwitterMainDescriptionText5 =  'TWITTER AGIT COMME UN GOUVERNEMENT DICTATORIQUE';
_l.aboutTwitterMainDescriptionText6 = 'Oui, nous savons que c’est une déclaration forte.';
_l.aboutTwitterMainDescriptionText7 =  'Mais malheureusement, c’est ce qui s’est passé sur Twitter.';

_l.aboutTwitterThreeColumn1 = 'Beaucoup, beaucoup trop de comptes ont été interdits ces dernières années. Certains d’entre eux sans aucune raison.' ;
_l.aboutTwitterThreeColumn2 = 'Autres simplement parce qu’ils étaient d’un côté politique spécifique (conservateur)';
_l.aboutTwitterThreeColumn3 = 'Ici, vous trouverez ci-dessous une courte liste des comptes qui ont été interdits ou suspendus par Twitter, ainsi que la raison.' ;
_l.aboutTwitterThreeColumn4 = 'Vous pouvez faire vos propres considérations: vous pouvez facilement réaliser comment Twitter a banni des gens pour plusieurs raisons non spécifiées, pour avoir simplement dit que le chef des talibans était pro-charia, pour avoir soutenu le mouvement « Occupé » sans enfreindre aucune politique.' ;
_l.aboutTwitterThreeColumn5 = 'C’est le genre de censure que nous ne voulons pas sur "+appname +", et c’est pourquoi le protocole a été créé en premier lieu';

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

_l.aboutTitterH3Section1 = 'Pourquoi "+appname +"?';
_l.aboutTitterH3Section2 = 'AUCUN CONTROL GOUVERNEMENTAL';
_l.aboutTitterH3Section3 = '"+appname +" fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal "+appname +".com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à "+appname +".' ;
_l.aboutTitterH3Section4 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutTitterH3Section5 = '"+appname +" ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;
_l.aboutTitterImgAndText1 = 'AUCUNE CENSURE';
_l.aboutTitterImgAndText2 ='"+appname +" ne censurera pas vos publications et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.'
_l.aboutTitterImgAndText3 = 'Contrairement à Twitter, "+appname +" n’applique pas une méthode de type dictature pour supprimer le contenu et les utilisateurs. Il existe une liste longue de personnes qui ont été bannies, temporairement ou définitivement, par Twitter pour des raisons superficielles ou sans raison apparente du tout.' ;
_l.aboutTitterImgAndText4 = 'Sur "+appname +", les interdictions sont tout simplement impossibles: elles sont basées sur la blockchain et personne n’a le pouvoir d’en annuler un blocage. Chaque message restera toujours là. Même si un administrateur ou un utilisateur veut interdire vos publications, il ne pourra jamais le faire.' ;
_l.aboutTitterImgAndText5 = 'La censure est interdite par la technologie elle-même. Même si un jour les créateurs de "+appname +" veulent fermer la plateforme, les messages seront toujours là et le réseau social pourra être recréé à partir du même point où il a été laissé.' ;
_l.aboutTitterImgAndText6 = 'AUCUNE ENTREPRISE DERRIÈRE "+appname +"';
_l.aboutTitterImgAndText7 = 'Contrairement à Twitter et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière "+appname +". C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur "+appname +". Pas d’interdictions, pas de censure.' ;
_l.aboutTitterImgAndText8 = 'Contrairement à Twitter...';
_l.aboutTitterImgAndText9 = 'Vous ne serez jamais bloqué ou banni pour avoir simplement soutenu vos idées, vos religions, vos mouvements sans blesser les autres.' ;
_l.aboutTitterImgAndText10 = 'Personne ne peut bloquer votre compte ou supprimer vos publications. ' ;
_l.aboutTitterImgAndText11 = 'La confidentialité est complète et garantie' ;
_l.aboutTitterImgAndText12 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde' ;
_l.aboutTitterImgAndText13 = 'Les sessions de chat sont entièrement privées et cryptées et même "+appname +" ne peut y accéder. Pas même avec un mandat d’arrêt du tribunal.' ;
_l.aboutTitterImgAndText14 = 'Vos publications peuvent être plus longues';



_l.aboutTitterTable1 = 'TWITTER';
_l.aboutTitterTable2 = '"+appname +"';
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
_l.aboutTitterTable23 = '"+appname +" fonctionne directement avec les nœuds';
_l.aboutTitterTable24 = 'Messages personnels';
_l.aboutTitterTable25 = 'Twitter peut lire tous les messages';
_l.aboutTitterTable26 = '"+appname +" utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
_l.aboutTitterTable27 = 'Cryptomonnaie interne pour la monétisation et les paiements';
_l.aboutTitterTable28 = 'Non';
_l.aboutTitterTable29 = 'Oui';
_l.aboutTitterTable30 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
_l.aboutTitterTable31 = 'Non';
_l.aboutTitterTable32 = 'Oui';
_l.aboutTitterTable33 = 'information personnelle';
_l.aboutTitterTable34 = 'Nom, numéro de téléphone';
_l.aboutTitterTable35 = 'Non';



_l.aboutTitterMainBoard31 = 'Et il y a plus! "+appname +" vous paie. »';
_l.aboutTitterMainBoard32 = 'Vous pouvez gagner de l’argent avec "+appname +".';
_l.aboutTitterMainBoard33 = '"+appname +" utilise sa propre crypto-monnaie:';
_l.aboutTitterMainBoard34 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutTitterMainBoard35 = '';
_l.aboutTitterMainBoard36 = 'Chaque fois que quelqu’un rejoint "+appname +" avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutTitterMainBoard37 = 'Contactez-nous pour en savoir plus et pour activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';


_l.aboutTitterOpen1 = 'Découvrez "+appname +"';
_l.aboutTitterOpen2 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.’';
_l.aboutTitterOpen3 = 'Site internet officiel';
_l.aboutTitterOpen4 = 'Code Source';
_l.aboutTitterOpen5 = 'Contactez-nous';
_l.aboutTitterOpen6 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';


/////////////aboutFacebook
_l.aboutFbMainBoard = '"+appname +" – la meilleure alternative à Facebook';
_l.aboutFbMainBoard1 = 'Protocole financier et social';

_l.aboutFbMainDesc = '""+appname +" n’est pas une alternative à Facebook. »';
_l.aboutFbMainDesc1 = '"+appname +" est Anti-Facebook.';
_l.aboutFbMainDesc2 = '-- John Milton';


_l.aboutFbH3Section = 'Pourquoi "+appname +"';
_l.aboutFbH3Section1 = 'AUCUN CONTROL GOUVERNEMENTAL';
_l.aboutFbH3Section2 = '"+appname +" fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal "+appname +".com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à "+appname +". '
_l.aboutFbH3Section3 = 'PRIVÉ ET SÉCURISÉ';
_l.aboutFbH3Section4 = '"+appname +" ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;



_l.aboutFbImgAndText = 'AUCUNE CENSURE';
_l.aboutFbImgAndText2 = '"+appname +" ne censurera pas vos messages et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.' ;
_l.aboutFbImgAndText3 = '"+appname +" est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des messages. Chaque message est enregistré sur la blockchain et, pour sa nature, il ne peut pas être supprimé. Par n’importe qui.';
_l.aboutFbImgAndText4 = 'AUCUNE ENTREPRISE DERRIÈRE "+appname +"';
_l.aboutFbImgAndText5 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière "+appname +". C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur "+appname +". Pas d’interdictions, pas de censure.' ;
_l.aboutFbImgAndText6 = 'Contrairement à Facebook…';
_l.aboutFbImgAndText7 = 'Vos données personnelles ne sont pas vendues à des sociétés externes ' ;
_l.aboutFbImgAndText8 = 'Pas de censure arbitraire ';
_l.aboutFbImgAndText9 = 'Ne prends aucune information personnelle';
_l.aboutFbImgAndText10 = 'Aucune société derrière cela ';
_l.aboutFbImgAndText11 = 'Les sessions de chat sont entièrement privées et cryptées et même "+appname +" ne peut y accéder. ';
_l.aboutFbImgAndText12 = 'Mark Zuckerberg ne vous dérangera pas!';



_l.aboutFbTable = 'FACEBOOK';
_l.aboutFbTable1 = '"+appname +"';
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
_l.aboutFbTable22 = '"+appname +" fonctionne directement avec les nœuds';
_l.aboutFbTable23 = 'Messages personnels';
_l.aboutFbTable24 = 'Facebook peut lire chaque message';
_l.aboutFbTable25 = '"+appname +" utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
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



_l.aboutFbMainBoard3 = 'Et il y a plus! "+appname +" vous paie.' ;
_l.aboutFbMainBoard31 = 'Vous pouvez gagner de l’argent avec "+appname +".';
_l.aboutFbMainBoard32 = '"+appname +" utilise sa propre crypto-monnaie: ';
_l.aboutFbMainBoard33 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutFbMainBoard34 = '';
_l.aboutFbMainBoard34 = 'Chaque fois que quelqu’un rejoint "+appname +" avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutFbMainBoard35 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez poster un nombre illimité de vidéos et être payé!';


_l.aboutFbOpen = 'Découvrez "+appname +"';
_l.aboutFbOpen1 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.’'; 
_l.aboutFbOpen2 = 'Site internet officiel';
_l.aboutFbOpen3 = 'Code Source';
_l.aboutFbOpen4 = 'Contactez-nous';
_l.aboutFbOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!'; 


/////aboutHIW

_l.aboutHowItWMainBoard = 'COMMENT "+appname +" RÉSISTE-T-IL À LA CENSURE?';
_l.aboutHowItWMainBoard1 = 'GRATUIT, PRIVÉ, SÉCURISÉ ET SANS CONTRÔLE D’ENTREPRISE.';
_l.aboutHowItWMainBoard2 = 'PROFITEZ DE L’AIR FRAIS DE "+appname +".';



_l.aboutHowItWMD = '""+appname +" est le Bitcoin des réseaux sociaux."';



_l.aboutHowItWImgAndText = 'Basé sur le Blockchain';
_l.aboutHowItWImgAndText1 = 'Qu’est-ce qu’un blockchain?';
_l.aboutHowItWImgAndText2 = 'Comme le mentionne Wikipédia, « Une blockchain est une liste croissante d’enregistrements, appelés blocs, qui sont liés entre eux à l’aide de la cryptographie. ';

_l.aboutHowItWImgAndText3 = 'Il est également décrit comme un « stockage de données immuable peer-to-peer sans confiance et entièrement décentralisé » qui est réparti sur un réseau de participants souvent appelés nœuds. Chaque bloc contient un hachage cryptographique du bloc précédent, un horodatage et des données de transaction.' ;
_l.aboutHowItWImgAndText4 = 'L’horodatage prouve que les données de transaction existaient lorsque le bloc a été publié afin d’entrer dans son hachage.';
_l.aboutHowItWImgAndText5 = 'Comme les blocs contiennent chacun des informations sur le bloc précédent, ils forment une chaîne, chaque bloc supplémentaire renforçant ceux qui le précèdent.';
_l.aboutHowItWImgAndText6 = 'Par conséquent, les blockchains sont résistantes à la modification de leurs données car une fois enregistrées, les données d’un bloc donné ne peuvent pas être modifiées rétroactivement sans modifier tous les blocs suivants."';
_l.aboutHowItWImgAndText7 = 'Alors, comment la blockchain protège-t-elle de la censure?';
_l.aboutHowItWImgAndText8 = 'Des Bitcoins à "+appname +".';
_l.aboutHowItWImgAndText9 = 'La blockchain est la technologie derrière toutes les crypto-monnaies. Bitcoins, Ethereum, Dogecoins et ainsi de suite sont tous alimentés par la Blockchain.';
_l.aboutHowItWImgAndText10 = 'Le principe est simple: ce qui se passe sur la blockchain, reste sur la blockchain. Pour toujours.' ;
_l.aboutHowItWImgAndText11 = 'Tous les blocs existants de la blockchain sont immuables et permanents. ';
_l.aboutHowItWImgAndText12 = 'Pensez à la crypto-monnaie: lorsque vous envoyez des Bitcoins (ou des parties de ceux-ci) à quelqu’un, la transaction est enregistrée sur la blockchain.';
_l.aboutHowItWImgAndText13 = 'À partir de ce moment, la transaction ne peut plus être annulée, modifiée, modifiée, supprimée, suspendue, modifiée dans aucune de ses parties. Il est là et y reste pour toujours. Et vous pouvez explorer les blocs de la blockchain pour voir toutes les transactions.' ;
_l.aboutHowItWImgAndText14 = '"+appname +" fonctionne EXACTEMENT de la même manière. Chaque publication, chaque compte, chaque vidéo est enregistrée sur la blockchain. Et une fois sur le site, il ne peut pas être enlevé.' ;
_l.aboutHowItWImgAndText15 = 'En effet, "+appname +" travaille sur un fork de la blockchain Bitcoin originale.';
_l.aboutHowItWImgAndText16 = 'Résistant à la censure';
_l.aboutHowItWImgAndText17 = 'Pas seulement le Blockchain.';
_l.aboutHowItWImgAndText18 = '"+appname +" n’appartient pas à une société';
_l.aboutHowItWImgAndText19 = '"+appname +" est un projet open-source';
_l.aboutHowItWImgAndText20 = '"+appname +" fonctionne sur un réseau de nœuds décentralisés, si vous utilisez l’application de bureau "+appname +", elle parle directement aux nœuds du monde entier';
_l.aboutHowItWImgAndText21 = 'De plus, même si un gouvernement veut supprimer un message, c’est techniquement impossible.';
_l.aboutHowItWImgAndText22 = 'De même, comme il fonctionne sur un réseau de nœuds, il n’y a aucun moyen de limiter l’accès à "+appname +". Même dans le cas où un gouvernement bloque l’accès à https://"+appname +".com, vous pourrez toujours y accéder à l’aide de l’application mobile ou de bureau, qui se connecte directement aux nœuds.' ;
_l.aboutHowItWImgAndText23 = 'Protection de la vie privée,';
_l.aboutHowItWImgAndText24 = 'pour votre sécurité';
_l.aboutHowItWImgAndText25 = '"+appname +" ne sait pas qui vous êtes.';
_l.aboutHowItWImgAndText26 = '"+appname +" NE collecte AUCUNE information personnelle.';
_l.aboutHowItWImgAndText27 = 'Vous pouvez vous inscrire sans révéler votre numéro de téléphone (seul l’e-mail est requis)' ;
_l.aboutHowItWImgAndText28 = '"+appname +" ne demande pas votre vrai nom pour protéger la dissidence';
_l.aboutHowItWImgAndText29 = '"+appname +" ne collecte pas d’adresses IP et ne vous suit pas' ;
_l.aboutHowItWImgAndText291 = '"+appname +" autorise plusieurs comptes à des fins différentes ';
_l.aboutHowItWImgAndText30 ='"+appname +" ne saura jamais qui vous êtes, à moins que vous ne partagiez explicitement vos données personnelles.';
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
_l.aboutHowItWImgAndText33 = '"+appname +" vous paie';
_l.aboutHowItWImgAndText34 = 'Vous pouvez gagner de l’argent avec "+appname +".';
_l.aboutHowItWImgAndText35 = '"+appname +" utilise sa propre crypto-monnaie:';
_l.aboutHowItWImgAndText36 = 'Chaque fois que vos messages reçoivent des commentaires et des likes, vous obtenez PKOIN.';
_l.aboutHowItWImgAndText37 = ' ';
_l.aboutHowItWImgAndText38 = 'Chaque fois que quelqu’un rejoint "+appname +" avec votre lien de parrainage, vous obtenez PKOIN.';
_l.aboutHowItWImgAndText39 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';
_l.aboutHowItWImgAndText40 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte "+appname +" et accéder au programme de bonus.';
_l.aboutHowItWImgAndText41 = 'Contactez-nous maintenant!';


_l.aboutHowItWOpen = 'Découvrez "+appname +"';
_l.aboutHowItWOpen1 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.aboutHowItWOpen2 = 'Site internet officiel';
_l.aboutHowItWOpen3 = 'Code Source';
_l.aboutHowItWOpen4 = 'Contactez-nous';
_l.aboutHowItWOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';

//aboutContentCreator

_l.ContentCreatorsMainBoard = 'Excellent programme de bonus pour les créateurs de contenu';
_l.ContentCreatorsMainBoard1 = '"Il existe de nombreuses façons de gagner de l’argent avec "+appname +"..."';


_l.ContentCreatorsImgAndText = 'Publiez vos vidéos';
_l.ContentCreatorsImgAndText1 = 'Publiez vos vidéos sur "+appname +"';
_l.ContentCreatorsImgAndText2 = '';
_l.ContentCreatorsImgAndText3 = '';
_l.ContentCreatorsImgAndText4 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte "+appname +" et accéder au programme de bonus.';
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
_l.ContentCreatorsImgAndText19 = 'Les annonces vous arrivent via "+appname +" Ad Marketplace';
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



_l.ContentCreatorsOpen = 'Découvrez "+appname +"';
_l.ContentCreatorsOpen1 = 'Vous pouvez utiliser "+appname +" à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
_l.ContentCreatorsOpen2 = 'Site internet officiel';
_l.ContentCreatorsOpen3 = 'Code Source';
_l.ContentCreatorsOpen4 = 'Contactez-nous';
_l.ContentCreatorsOpen5 = "Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!";

_l.lowstar1 = "L'équipe "+appname +" met en place un moratoire temporaire sur les classifications 1 et 2 étoiles, à l'exception du contenu interdit. Le contenu interdit est :"
_l.lowstar_reason_1 = "Érotique/Porno"
_l.lowstar_reason_2 = "L'exploitation des enfants"
_l.lowstar_reason_3 = "Menace directe de violence"
_l.lowstar_reason_4 = "Drogues illégales"
_l.lowstar2 = "Veuillez ne pas utiliser les classements 1 et 2 étoiles pour d'autres raisons. Après la publication de la nouvelle modération à la mi-journée, vous pourrez utiliser les classements bas pour d'autres raisons"
_l.lowstaragree = "Je confirme que ce message contient l'un des quatre types de contenu interdit"

_l.androidPopupTitle = "Obtenir des informations non censurées dans l'application mobile "+appname +""
_l.androidPopupAgree = "Basculer vers l'application"
_l.androidPopupDisagree = "Pas maintenant"

_l.desktopPopupTitle = "Obtenir des informations non censurées dans l'application de bureau "+appname +""
_l.desktopPopupAgree = "Télécharger l'application"
_l.desktopPopupDisagree = "Pas maintenant"

_l.profanity_tag = 'impiété'

_l.copybuiltfrom = "Numéro d'assemblage copié"

_l.saved = "Sauvegardé"
_l.savePost = "Sauvegarder le post"
_l.postsaved = "Post sauvegardé"
_l.deleteSavedPost = "Supprimer le post enregistré"
_l.doYouDownloadVideo = "Voulez-vous télécharger la vidéo sur votre appareil ?"
_l.gotosaved2 = "Afficher les posts"
_l.yes = "Oui"
_l.no = "Non"

_l.torusing_neveruse = "Jamais";
_l.torusing_auto = "Auto";
_l.torusing_always = "Toujours";

_l.torusing_directProxy = "Proxy intégré";
_l.torusing_notdirectProxy = "Proxy externe";

_l.torusing_changedirectProxy = "Passer à un proxy externe";
_l.torusing_changenotdirectProxy = "Passer à un proxy intégré";

_l.torusing_disclaimer = "Cette fonction ne fonctionne que lors de l'utilisation d'un proxy intégré.";

_l.torusing_Networking = "Réseau";
_l.torusing_proxyCaption = "Sélection d'un serveur proxy";
_l.torusing_useTor = "Utiliser TOR";
_l.torusing_useSnowflakeBridge = "Utiliser Snowflake";

_l.torusing_stat_currentbytesLength = "Maintenant, les requêtes directs"
_l.torusing_stat_torbytesLength = "Maintenant, TOR requêtes"
_l.torusing_stat_directBytes = "Total, appels directs"
_l.torusing_stat_totalTorBytes = "Total, TOR requêtes"
_l.torusing_settings = "Paramètres TOR"
_l.torusing_stats = "Statistiques sur les requêtes"
_l.torusing_proxychangequestion = "Êtes-vous sûr de vouloir changer de proxy?"

/** ↓ Component UpdateNotifier ↓ */
_l.updateNotifier_topHeading1 = 'Version';
_l.updateNotifier_topHeading2 = 'Disponible';
_l.updateNotifier_mainHeading = 'Nous avons actualisé';
_l.updateNotifier_mainText = 'Nous vous recommandons de maintenir l\'application à jour. De nouvelles fonctionnalités et de meilleures performances vous attendent!';
_l.updateNotifier_button1 = 'Installer';
_l.updateNotifier_button2 = 'Plus tard...';
_l.updateNotifier_stateStart = 'Starting...';
_l.updateNotifier_stateDownload = 'Téléchargé';
_l.updateNotifier_stateError = 'Une erreur s\'est produite' ;
_l.updateNotifier_availableSilent = "Mise à jour disponible"
/** ↑ Component UpdateNotifier ↑ */

/** Collections */
_l.collections = "Collections"
_l.emptycollections = "Aucune collection"
_l.collectionemptymessage = "La description de la collection est vide"
_l.collectioncaption = "Le nom de la collection est obligatoire"
_l.collectionshares = "Ajoutez au moins une publication"
_l.collectionimage = "La couverture de la collection est obligatoire"
_l.collectionby = "Collection de"
_l.collectionLabel = "Collection"
_l.collectionEdit = "Modifier"
_l.collectionOpen = "Ouvrir la collection"
_l.collectionEditing = "Enregistrement des modifications…"
_l.collectionnochanges = "Aucune modification dans la collection"
_l.collectionNotFound = "Collection introuvable"
_l.collectionDeleted = "Collection supprimée"
_l.newcollection = "Créer"
_l.newcollectionex = "Créer une nouvelle collection"
_l.edcollectionex = "Modifier la collection"
_l.savecollection = "Enregistrer"
_l.deletecollection = "Supprimer"
_l.removeCollectionDialog = "Voulez-vous vraiment supprimer cette collection ?"
_l.cancelcollection = "Annuler"
_l.collectionInputCaption = "Nom de la collection"
_l.collectionInputDescription = "Description de la collection"
_l.collectionInputImage = "Couverture de la collection"
_l.collectionInputImageChange = "Changer la couverture de la collection"
_l.collectionMaterialsAdd = "Ajouter des publications"
_l.collectionMaterials = "Publications"
_l.collectionsShowAll = "Afficher toutes les collections"
_l.collectionAuthorCollections = "Collections de l'auteur"
_l.collectionMaterialsUnavailable = "Certaines publications ne sont pas disponibles"
_l.enabledEditModeCollections = "Sélectionnez dans l'interface les publications à inclure dans cette collection"
_l.collectionMode = "Mode d'édition de la collection"
_l.removeFromCollection = "Retirer de la collection"
_l.addToCollection = "Ajouter à la collection"
_l.addToCollectionHint = "Choisissez une collection pour cette publication"
_l.collectionNewItem = "Nouvelle collection"
_l.collectionContains = "Déjà dans cette collection"
_l.collectionAlreadyContains = "Impossible d'ajouter cette publication, elle est déjà dans la collection"
_l.collectionCoverAdd = "Ajouter une couverture"
_l.collectionCoverHint = "Cliquez ou déposez une image. Une image carrée est idéale"
_l.collectionCoverChange = "Modifier"
_l.collectionInputCaptionPlaceholder = "Par exemple : Le meilleur du mois"
_l.collectionInputDescriptionPlaceholder = "De quoi parle cette collection ?"
_l.collectionOptional = "(facultatif)"
_l.collectionMaterialsEmpty = "Aucune publication pour le moment"
_l.collectionMaterialsEmptyHint = "Ajoutez des publications à la collection. Vous pouvez modifier leur ordre par glisser-déposer"
_l.collectionMaterialsDragHint = "Faites glisser pour changer l'ordre"
_l.clearcollection = "Effacer"
_l.clearCollectionDialog = "Voulez-vous vraiment effacer la collection ?"
_l.collectionsEmptyHint = "Regroupez des publications dans des collections thématiques et partagez-les"
_l.collectionTypeArticle = "Article"
_l.collectionTypeStream = "Diffusion"
_l.collectionTypePoll = "Sondage"
_l.collectionTypePost = "Publication"
_l.collectionTypePaid = "Pour les abonnés"
_l.collectionInRelay = "La collection est en cours de publication…"
_l.collectionWaitConf = "La collection est en cours de publication…"
_l.collectionPublishError = "Erreur de publication"

//pin lock

_l.pinlock_title = "Verrouillage par code PIN"
_l.pinlock_welcome = function(v){
	return "Bon retour, " + v
}
_l.pinlock_welcomeanon = "Bon retour"
_l.pinlock_enter = "Saisissez le code PIN"
_l.pinlock_current = "Saisissez le code PIN actuel"
_l.pinlock_new = "Créez un code PIN"
_l.pinlock_repeat = "Répétez le code PIN"
_l.pinlock_done = "Terminé"
_l.pinlock_mismatch = "Les codes PIN ne correspondent pas"
_l.pinlock_wrong = "Code PIN incorrect"
_l.pinlock_attemptsleft = function(v){
	return "tentatives restantes : " + v
}
_l.pinlock_blocked = function(v){
	return "Trop de tentatives. Réessayez dans " + v
}
_l.pinlock_error = "Une erreur s'est produite. Veuillez réessayer"
_l.pinlock_entered = function(v){
	return v + " sur 4 saisis"
}
_l.pinlock_digit = function(v){
	return "Chiffre " + v
}
_l.pinlock_delete = "Effacer"
_l.pinlock_keyboardhint = "Vous pouvez saisir au clavier"
_l.pinlock_forgot = "Code PIN oublié ?"
_l.pinlock_forgotwarning = "Pour vous reconnecter, vous aurez besoin de votre phrase mnémonique ou de votre clé privée. Sans elles, l'accès au compte sera définitivement perdu."
_l.pinlock_signout = "Se déconnecter"
_l.pinlock_purpose = "Le code PIN protège l'application contre les personnes qui y ont accès. Il ne remplace pas la sauvegarde de votre phrase mnémonique."
_l.pinlock_enabled = "Code PIN défini"
_l.pinlock_changed = "Code PIN modifié"
_l.pinlock_disabled = "Code PIN désactivé"
_l.pinlock_lockafter = "Verrouiller après"
_l.pinlock_minutes = function(v){
	return v + " min"
}
_l.pinlock_security = "Sécurité"
_l.pinlock_settingname = "Code PIN"
_l.pinlock_stateon = "Activé"
_l.pinlock_stateoff = "Désactivé"
_l.pinlock_set = "Définir un code PIN"
_l.pinlock_change = "Modifier le code PIN"
_l.pinlock_disable = "Désactiver le code PIN"
_l.pinlock_locknow = "Verrouiller maintenant"

_l.successcopied = "Le texte a été copié avec succès";
_l.welcome = "Bienvenue";
_l.continuewithbarteron="Continuer avec Barteron";
_l.chooseThemes = "Choisissez des thèmes intéressants";
_l.bloggers = "Blogueurs";
_l.chooseBloggers = "Suivez des blogueurs populaires";
_l.showmorebloggers = "Afficher plus de blogueurs";
_l.ractivities = "Mon activité";
_l.rall = "Tout";
_l.rinteractions = "Interactions";
_l.rblocking = "Blocage";
_l.rblockinglist = "Liste des utilisateurs bloqués";
_l.rcomment = "Commentaires";
_l.rsubscriber = "Abonnements";
_l.a_unabledvideo = "La vidéo n'est pas disponible pour le moment";
_l.rvideo = "Vidéos";
_l.contentscore = "Vous avez noté la publication";
_l.commentscorelike = "Vous avez aimé le commentaire.";
_l.commentscoredislike = "Vous n'aimez pas le commentaire";
_l.commented = "Vous avez commenté la publication";
_l.ranswer= "Vous avez répondu au commentaire";
_l.sentmoney = "Vous avez transféré des fonds à";
_l.a_unsubscribe = "Vous vous êtes désabonné de";
_l.a_subscribe = "Vous vous êtes abonné à";
_l.a_collection = "Vous avez créé une collection";
_l.a_block = function(c){
    return c ? `Vous avez bloqué ${c} utilisateurs` : `Vous avez bloqué`
};
_l.a_unblock= "Vous avez débloqué";
_l.a_boost = "Vous avez boosté la publication ";
_l.a_empty = "Aucune statistique pour les 3 derniers mois";
_l.rstatistic = "Statistiques";
_l.totalBalance = "Solde total";
_l.referralsCount = 'Utilisateurs ayant utilisé le lien de parrainage.';
_l.commentatorsCount = function(limit){
    return "Utilisateurs qui vous ont commenté plus de " + limit + (limit === 1 ? ' fois' : ' fois')
};
_l.from = 'Période : ';
_l.to = 'à';
_l.empty = "Vide";
_l.apply = 'Appliquer';
_l.spv = "Nombre de publications vidéo";
_l.spa = "Nombre de publications audio";
_l.stpg = "Top";
_l.stpreal = "Vérifié";
_l.stpdev = "Développeur de "+appname+"";
_l.stpmoderator = "Modérateur";
_l.trialreputationtip = "Pour devenir un utilisateur top, vous devez avoir une réputation valide. Il faut qu'au moins 100 personnes différentes ayant une réputation top votent positivement pour votre contenu (après 3 mois, cette exigence est ramenée à 30). La deuxième condition est une réputation globale d'au moins 100.";
_l.trialreputationtipaction = "En savoir plus sur la réputation ici";
_l.ccpl = "Nombre de plaintes";
_l.accfailedkeypair = "Clé privée incorrecte";
_l.acchasinthispack = "Cette adresse est déjà ajoutée";
_l.acchasinanotherpack = "Cette adresse est déjà utilisée dans un autre groupe d'adresses";
_l.subi = "Abonnements";
_l.followers2 = "Abonnés";
_l.following2 = "Abonnements";
_l.blockedusers = "Utilisateurs bloqués";
_l.anoblocked = "Cet utilisateur n'a bloqué personne";
_l.aynoblocked = "Vous n'avez bloqué personne";
_l.commentBannerTitle = "Commentez cette publication";
_l.commentBannerDescription = "Commenter débloque des fonctionnalités sur "+appname+" et vous aide à trouver des amis 😀";
_l.commentBannerTitle2 = function(v){ return "Suivez " + v + " pour voir plus de ses publications"};
_l.commentBannerDescription2 = function(v){ return "Suivre " + v + " affichera plus de contenus de ce type dans votre fil." };
_l.dontShowAgain = "Ne plus afficher";
_l.whatsnewrepost = "Votre commentaire";
_l.tlinks = "liens";
_l.dcode = "Code";
_l.dcopyToClipboard = "Copier dans le presse-papiers";
_l.dwarning = "Avertissement";
_l.dyesclose = "Oui, fermer";
_l.transactionCome = "Transaction entrante";
_l.coinbaseSuccesspostref = function(v){
    return "Félicitations, votre filleul vient de vous faire gagner " + v + " PKOIN !"
    };
_l.coinbaseSuccesscommentref = function(v){
    return "Félicitations, votre filleul vient de vous faire gagner " + v + " PKOIN !"
};
_l.scoreLimitLight = "Vous avez atteint votre limite de notes";
_l.actionWaitConf = "L'action attend une confirmation de la blockchain";
_l.ntyesterday = "Hier";
_l.copyLink = "Copier le lien direct";
_l.includeRefLink = "Inclure le lien de parrainage";
_l.shareVia = "Partager via";
_l.embedding = "Intégration";
_l.copyEmbeddingCode = "Copier le code d'intégration";
_l.showCode = "Afficher le code";
_l.embeddingSettings = "Paramètres d'intégration";
_l.blackTheme = "Thème noir";
_l.includeComments = "Inclure les commentaires";
_l.showOnlyLast = "Afficher uniquement le dernier commentaire";
_l.inclueComments = "Commentaires";
_l.showAll = "Afficher tous les commentaires";
_l.dontShow = "Ne pas afficher les commentaires";
_l.removeDescription = "Supprimer la description";
_l.preview = "Aperçu";
_l.autoplayVideo = "Lecture automatique de la vidéo";
_l.learnMoreBoost = "En savoir plus sur le Boost";
_l.onlyVideo = "Vidéo uniquement";
_l.blockUserQ = "Voulez-vous bloquer cet utilisateur ?";
_l.postRemoved = "La publication a été supprimée";
_l.postNotFound = "Publication introuvable";
_l.complain_success =  "Votre plainte a été envoyée avec succès";
_l.ok = "OK";
_l.supportFormTitle = "Vous souhaitez faire un don d'une autre manière ou vous avez d'autres questions ? Contactez-nous";
_l.addrNotAvailable = function(cur){
    return "L'adresse pour " + cur + " n'est pas disponible pour le moment";
};
_l.subject = "Objet";
_l.e130961 = "Combien de PKOIN voulez-vous envoyer ?";
_l.e130962 = "Solde disponible";
_l.e13109lg = "Veuillez saisir les mots de l'image pour continuer";
_l.poll = "Créer un sondage";
_l.removePostDialog = "Voulez-vous vraiment supprimer la publication ?";
_l.opennewwindow = "Ouvrir la publication dans une nouvelle fenêtre";
_l.opennew = "Ouvrir la publication";
_l.pin = "Épingler la publication";
_l.pinned = "épinglée";
_l.pinning = "épinglage";
_l.pinPostDialog = "Voulez-vous vraiment épingler cette publication ?";
_l.unpin = "Désépingler la publication";
_l.unpinPostDialog = "Voulez-vous vraiment désépingler cette publication ?";
_l.unsubscribe = "Se désabonner";
_l.startchat = "Discuter";
_l.reportuser = "Signaler l'utilisateur";
_l.reportminiapp = "Signaler";
_l["Top Posts Over"] = "Meilleures publications sur";
_l["Top videos"] = "Meilleures vidéos";
_l.bestFirst = "Les meilleurs d'abord";
_l.topnext = "Suivant";
_l.topprevious = "Précédent";
_l.topactual = "Revenir aux plus récentes";
_l.totalLikes = "Total des j'aime";
_l.disablePreview = "Désactiver l'aperçu du lien";
_l.reposted = "Repartage";
_l.uiScaleSetting = "Mise à l'échelle de l'interface";
_l.uiScaleSettingTitle = "Définir l'échelle";
_l.с= "Cela peut prendre";
_l.sendMessenger = "Envoyer via une messagerie";
_l.e132233 = "Télécharger "+appname+" pour Android";
_l.e132221 = "Téléchargez l'application mobile : c'est la façon la plus pratique d'utiliser "+appname+".";
_l.installpwa = "Installer";
_l.step1 = "Étape 1 :";
_l.step2 = "Étape 2 :";
_l.installios_instruction3 = "en bas de l'écran";
_l.e132233ios = "Installer "+appname+" pour iPhone";
_l.installios_caption =  "Installer "+appname+" pour iPhone";
_l.installios_empty =  "Ceci est la page d'installation de l'application pour iPhone. Les applications pour les autres systèmes d'exploitation se trouvent ici";
_l.installios_empty_button =  "Aller à la page de l'application";
_l.installios_instruction1 = 'appuyez sur';
_l.installios_instruction2 = 'puis sur « Sur l\'écran d\'accueil »';
_l.saveSettingsLimit = "Vous avez atteint votre limite d'enregistrement des paramètres sur une période de 24 heures";
_l.e13257_1 = "Votre réputation sur "+appname+" ne vous permet pas de donner des notes négatives aux publications";
_l.e2000 = "Erreur de connexion. Veuillez réessayer";
_l.e13270d = "Votes négatifs reçus";
_l.e132812 = "Commentaires";
_l.sound = "Son";
_l.e13332v = "a publié une toute nouvelle vidéo";
_l.e13351 = "Chat "+appname+"";
_l.e13352 = "Vous n'avez pas les droits pour le chat";
_l.e14001 = "Langue de la publication";
_l.e14002 = "Voulez-vous vraiment effacer la publication ?";
_l.e14003 = "Technique";
_l.e14004 = "Où puis-je télécharger le client ?";
_l.e14005 = "Où puis-je télécharger le nœud ?";
_l.e14006 = "Cliquez sur "+appname+"Setup.exe";
_l.e14007 = "Pour toute question, écrivez à core@pocketnet.app";
_l.e14008 = ""+appname+"";
_l.e14009 = "Je vois une adresse PN et une adresse de portefeuille... ces deux adresses sont-elles sur la blockchain PN ?";
_l.e14010 = "L'adresse PN est celle utilisée pour publier du contenu et utiliser le réseau social en général. Elle conserve aussi les pièces que vous gagnez grâce à vos publications bien notées.";
_l.e14011 = "Les adresses de portefeuille servent à conserver le reste des pièces.";
_l.e14012 = "Puis-je mettre un lien vers mon profil ou ma « page » ? Pour pouvoir le publier dans ma communauté et faire venir des membres.";
_l.e14013 = "Dans le navigateur, allez sur votre profil en cliquant sur l'avatar en haut à droite et copiez simplement l'adresse du navigateur. Toute personne qui s'inscrira via ce lien vous suivra automatiquement et vous recevrez même des récompenses.";
_l.e14014 = "Dans l'application de bureau, allez sur votre profil ; vous y verrez trois icônes à droite de votre avatar : d'abord un portefeuille avec le nombre de pièces, puis une cloche avec les notifications, et enfin une croix verte. Cliquez sur cette croix verte puis sur copier. Diffusez ce lien : toute personne qui s'inscrit vous suivra et vous recevrez des récompenses.";
_l.e14015 = "Le système d'étoiles : y a-t-il une limite au nombre d'étoiles qu'une personne peut donner ?";
_l.e14016 = "Il y a quelques limites. Mais à mesure que votre réputation augmente, vous pouvez voter de plus en plus. Cela permet d'éviter que des bots ne saturent notre blockchain. Au départ, vous disposez de 100 notes toutes les 24 heures. Lorsque votre réputation augmente (en publiant et en étant noté), vous pouvez donner 200 notes par jour.";
_l.e14017 = "Combien de temps avant de pouvoir mettre à jour mon profil ? ";
_l.e14018 = "Vous pouvez mettre à jour votre profil une fois par heure.";
_l.e14019 = "Existe-t-il une version de bureau pour Linux ?";
_l.e14020 = "Oui ! Elle est en préparation, d'ici 2 à 3 semaines selon l'avancement du test bêta.";
_l.e14021 = "Où le contenu vidéo est-il stocké ?";
_l.e14022 = "Nous travaillons sur le stockage vidéo ; en attendant, vous pouvez partager depuis Bitchute, YouTube, Vimeo et d'autres sources vidéo.";
_l.e14023 = "Existe-t-il une application mobile ?";
_l.e14024 = "Oui. Mais nous encourageons vivement tout le monde à télécharger aussi l'application de bureau car, contrairement aux applications Android ou iPhone, elle ne peut pas vous être retirée par Google ou Apple.";
_l.e14025 = "Quelle est la limite de publications par jour ou par heure ?";
_l.e14026 = "Nous avons certaines limites, mais après des tests nous les avons augmentées. Au départ, vous pouvez faire 15 publications et donner 100 notes toutes les 24 heures. Une fois votre réputation supérieure à 50, vous pourrez faire jusqu'à 30 publications et 200 notes toutes les 24 heures.";
_l.e14027 = "Qu'est-ce que la réputation et comment est-elle calculée ?";
_l.e14028 = "Votre réputation est la somme de vos notes, calculée de la manière suivante. Notez que les utilisateurs ayant une réputation inférieure à 50 n'affectent ni la réputation ni les gains en pièces de quiconque. Ils peuvent noter le contenu, mais cela n'affecte pas la réputation.";
_l.e14029 = "Ainsi, si vous avez deux notes de 5 étoiles et une note de 1 étoile, le total sera de";
_l.e14030 = "Est-il possible de supprimer ou de modifier une publication ?";
_l.e14031 = "Pas pour le moment, car elle est inscrite dans la blockchain. Cependant, nous travaillons sur une fonctionnalité permettant de créer une transaction de remplacement ainsi qu'une transaction &#10075;masquer&#10076;, ce qui équivaudrait en pratique à modifier ou supprimer.";
_l.e14032 = "Est-il possible de rechercher un utilisateur ?";
_l.e14033 = "Cliquez sur la loupe de recherche en haut et recherchez par nom d'utilisateur ou par mots-clés.";
_l.e14034 = "Comment suivre quelqu'un ?";
_l.e14035 = "À côté de l'auteur de la publication (en haut de la publication), il y a un lien Suivre. Vous pouvez trouver ses publications dans Meilleures publications (la flamme rouge en haut de la page). Vous verrez aussi bientôt le fil Abonnements, qui sera différent du fil principal. Le fil principal contiendra tout ce que n'importe qui publie, par ordre chronologique, tandis que le fil Abonnements ne contiendra que les publications des personnes que vous suivez. Vous irez donc dans le fil général à la recherche de bons contenus, même si tout ne vous plaira pas, puis vous choisirez ceux que vous voulez garder. Un peu comme à la pêche :)";
_l.e14036 = "Peut-on l'utiliser avec les navigateurs Brave ou DuckDuckGo ?";
_l.e14037 = ""+appname+" devrait fonctionner sur ces navigateurs. Il est entièrement fonctionnel sur Chrome et Firefox. Mais nous encourageons vivement tout le monde à télécharger l'application de bureau (téléchargez "+appname+"Setup.exe ici : https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta). Elle ne peut jamais être bloquée (même si pocketnet.app est hors service ou bloqué pour une raison quelconque). C'est un point essentiel dans les pays totalitaires et quasi totalitaires qui, à bien y réfléchir, couvrent une part de plus en plus grande du globe.";
_l.e14038 = "Peut-on répondre à nos propres publications et à celles des autres ?";
_l.e14039 = "Oui, les commentaires sont disponibles sous chaque publication.";
_l.e14040 = "Comment ajouter un tag à une publication ?";
_l.e14041 = "Il suffit de le saisir dans le champ des tags et d'appuyer sur Entrée. Inutile d'indiquer #, il sera ajouté automatiquement.";
_l.e14042 = "Comment puis-je utiliser l'adresse publique ?";
_l.e14043 = "Votre adresse publique est ce que "+appname+" utilise pour vérifier votre identité. En substance, votre clé privée est un très grand nombre (qui peut être représenté par une suite de 12 mots ou un code QR). Ce nombre est multiplié par un autre que tout le monde connaît (appelé point de base) et l'on obtient une clé publique. Lorsque vous saisissez votre clé privée, nous pouvons la multiplier par le point de base pour obtenir votre clé publique et la comparer à l'adresse publique. Si elles correspondent, nous savons que c'est vous. Il est impossible de faire le chemin inverse, c'est-à-dire de diviser la clé publique par le point de base pour obtenir votre clé privée. En cryptographie, la multiplication ne fonctionne que dans un sens et ne peut pas être inversée, votre clé est donc en sécurité. "+appname+" utilise exactement la même cryptographie que Bitcoin.";
_l.e14044 = "Y aura-t-il un exécutable téléchargeable pour Mac ?";
_l.e14045 = "Oui, nous travaillons sur la plateforme Mac. L'objectif est la mi-avril.";
_l.e14046 = "Pocketcoin";
_l.e14047 = "Que puis-je faire avec le Pocketcoin ?";
_l.e14048 = "Actuellement, vous pouvez en gagner ou en offrir. Cependant, si "+appname+" décolle, le Pocketcoin sera le principal moyen d'acheter de la publicité sur la plateforme. Les annonceurs pourront facilement trouver des auteurs ayant le bon public et leur proposer des opportunités publicitaires. Cela fonctionnera sans confiance mutuelle (c'est-à-dire qu'aucune partie ne peut tricher), grâce à ce que l'on appelle les contrats multisignatures. Un contrat multisignature nécessite la signature numérique des deux parties pour être valide. Lorsque l'annonceur propose une publicité au créateur de contenu, il crée la première des deux signatures requises. Il signe la publicité elle-même et le montant proposé. Le créateur de contenu examine ce contrat partiellement signé et, s'il l'accepte, y ajoute la seconde signature. Lorsque la blockchain voit les deux signatures, le créateur de contenu est automatiquement payé et la publicité est automatiquement affichée sur sa chaîne. Ces transactions se feront uniquement en Pocketcoin. Ainsi, si le Pocketcoin prend de l'ampleur, ce sera un jeton extrêmement précieux.";
_l.e14049 = "Le Pocketcoin est-il comme une action de "+appname+" ?";
_l.e14050 = "Certainement pas. "+appname+" n'est même pas une société et n'a aucun propriétaire. C'est un code open source que chacun peut copier et exécuter. Le Pocketcoin est un jeton qui facilite l'échange de valeur, en particulier les transactions publicitaires. De plus, "+appname+" comprendra une place de marché où des biens et services seront vendus directement contre des Pocketcoins";
_l.e14051 = "Puis-je acheter des Pocketcoins supplémentaires ?";
_l.e14052 = "Oui, nous créerons sur pocketnet.app un moyen d'acheter des Pocketcoins contre du Bitcoin et quelques autres cryptomonnaies. Tous les revenus des ventes serviront à faire connaître "+appname+" dans le monde. Ainsi, en achetant des Pocketcoins, vous misez sur le succès de "+appname+", mais, tout aussi important, vous aidez "+appname+" à atteindre ce succès. Tous les grands réseaux sociaux ont disposé de budgets publicitaires de plusieurs milliards de dollars. "+appname+" a été financé par ses fondateurs et les développeurs ont travaillé uniquement pour des Pocketcoins. Nous avons besoin de vous pour faire passer le message. Pour aller plus loin, pensez à acheter quelques Pocketcoins pour nous aider à promouvoir le site. Pour acheter des Pocketcoins, vous devrez d'abord acheter du Bitcoin ou une autre cryptomonnaie, ce qui est désormais très facile.";
_l.e14053 = "Puis-je acheter des Pocketcoins en dollars américains ou dans une autre monnaie fiduciaire ?";
_l.e14054 = "Non.";
_l.e14055 = "Confidentialité";
_l.e14056 = "Les personnes qui ne saisissent pas leur vrai nom sont-elles anonymes ?";
_l.e14057 = "Oui : aucun nom ni numéro de téléphone, et l'e-mail n'est lié à votre compte d'aucune façon ; il est seulement saisi, de manière facultative, pour recevoir la newsletter.";
_l.e14058 = "Quelqu'un peut-il voir un profil (les publications de quelqu'un) de l'extérieur ? Est-ce un jardin clos ?";
_l.e14059 = "Comme toute la blockchain et toutes les publications sont ouvertes, n'importe qui peut accéder à vos publications et à votre profil. On sait seulement qu'ils sont liés à votre adresse publique. En pratique, vous pouvez avoir plusieurs comptes. Vous pouvez en utiliser certains sous votre vrai nom et d'autres de façon anonyme. L'anonymat est un excellent outil pour protéger la liberté d'expression contre les abus de pouvoir.";
_l.e14060 = "Ma clé publique est-elle comme un identifiant de portefeuille que j'indique sur mon profil et auquel les gens peuvent envoyer des points ?";
_l.e14061 = "Exactement. Et on peut la révéler sans risque. Mais pas la phrase secrète : gardez-la en sécurité !";
_l.e14062 = "Puis-je faire tourner un nœud sur mon serveur sans interface graphique ?";
_l.e14063 = "Nous publierons les sources du nœud sur GitHub. Les instructions pour faire tourner un nœud seront disponibles début avril.";
_l.e14064 = "Comment puis-je me reconnecter ?";
_l.e14065 = "Vous pouvez utiliser votre clé privée de 12 mots ou un code QR pour vous connecter.";
_l.e14066 = "Curation du contenu";
_l.e14067 = "Tout contenu est-il autorisé sur "+appname+" ? Si certains contenus ne le sont pas, peut-on encore parler d'une plateforme de liberté d'expression ?";
_l.e14068 = "C'est une question très importante et nous publierons de nombreuses vidéos et de nombreux articles à ce sujet, tout en sollicitant votre avis. Pour commencer, tous les types de contenu ne sont pas autorisés. Cependant, et c'est essentiel, l'application des règles est transparente et dépend de la communauté, comme nous l'expliquerons ci-dessous. Elle est assurée par la communauté, de manière ouverte, sans shadow bans cachés ni bannissements sélectifs comme ceux pratiqués par la Silicon Valley.";
_l.e14069 = "Particularités de la curation sur "+appname+".";
_l.e14070 = "Lorsque votre réputation atteint 100 et que vous cliquez sur les points en haut à droite d'une publication, vous verrez l'option Se plaindre. Si suffisamment de plaintes sont reçues, la publication ne sera plus affichée. Lorsqu'une personne a plus de 2 publications retirées de la plateforme par vote en 24 heures, elle ne peut plus publier pendant 48 heures après la deuxième publication. Une plainte aboutit lorsque le nombre de plaintes atteint au moins ⅓ du nombre de notes de 4 et 5 étoiles, avec un minimum de 10 plaintes (ce seuil sera ajusté au fil du temps en concertation avec la communauté).";
_l.e140701 = "Nous sommes extrêmement et passionnément favorables à la liberté d'expression. Cependant, nous ne voulons pas transformer "+appname+" en un forum marginal où règnent les fous. Qu'est-ce qui devrait vous pousser à vous plaindre ?";
_l.e140702 = "NE vous plaignez PAS de choses qui ne vous plaisent tout simplement pas ou qui vous offensent. Ce n'est pas un critère suffisant. Ne suivez pas les personnes qui vous offensent (nous aurons bientôt une fonction pour ne plus voir leurs publications), mais ne vous plaignez pas d'elles. Plaignez-vous uniquement de ce qui menace la viabilité à long terme de "+appname+" en tant que plateforme de communication de masse qui entend toucher toutes les couches de la société dans de nombreux pays.";
_l.e140703 = "Nous vous recommandons vivement de vous plaindre de toute pornographie ou nudité. Il existe de nombreux sites pornographiques sur le web, nous ne voulons pas mêler cela à notre projet de liberté d'expression. Nous encourageons vivement la communauté à retirer par vote la pornographie et la nudité. Deuxièmement, toute menace directe doit être retirée, tout comme les exemples flagrants de racisme. Si nous laissons les médias dominants nous associer directement au racisme ou à la violence, "+appname+" cessera d'exister avant même que nous ayons pu le faire connaître. Ce n'est pas parce que les médias dominants crient au loup à propos d'un prétendu racisme que nous devons leur donner raison en le tolérant sur notre plateforme. Cela nous détournerait de ce que nous cherchons à accomplir : contester le nouveau totalitarisme créé par l'alliance contre nature des médias, de la finance et de fonctionnaires corrompus.";
_l.e14071 = "Remarque importante sur le racisme.";
_l.e14072 = "La liberté de pensée et d'expression est attaquée sur les grandes plateformes sociales et dans les médias. Nous devons dire la vérité, et c'est précisément pour cela que cette plateforme est non commerciale et décentralisée. Mais nous demandons à chacun de défendre son point de vue sans s'en prendre à la nationalité ou à l'origine des gens. Vous pouvez argumenter en vous appuyant sur des preuves. Nous ne pouvons pas nous permettre de faire de "+appname+" une plateforme marginale. Dites la vérité, mais évitez le racisme et les attaques contre des nationalités entières. Nous savons que la Silicon Valley et les médias dominants ont fait du racisme leur carte maîtresse et crient constamment au loup. Raison de plus pour rester mesurés, nous appuyer sur des preuves et ne pas les laisser nous salir avec cela. Sinon, nous empêcherons la majorité de la population d'évaluer les preuves de la corruption des médias dominants présentées sur "+appname+". Gardez cela à l'esprit, afin que la liberté d'expression puisse prospérer et que nous puissions battre les Facebook de ce monde.</div><div>En fin de compte, c'est la communauté qui déterminera l'orientation de la plateforme. Avoir une foule de personnes hypersensibles qui se plaignent de tout ce qui les offense est tout aussi néfaste que des gens qui veulent proférer des menaces violentes directes. Cependant, les premiers signes montrent que les premiers utilisateurs de la plateforme sont généralement intelligents et s'appuient sur des faits, l'avenir s'annonce donc incroyablement prometteur. Après quelques jours de test bêta, l'équipe de "+appname+" a remarqué que nous avions arrêté de lire même les médias alternatifs, tant il y avait de contenus intéressants sur "+appname+". Continuez comme ça !</div><div>Participez à la discussion sur ces sujets. C'est une plateforme communautaire. Nous cherchons toujours à améliorer la transparence de la plateforme et vous devriez nous dire comment améliorer la curation et la modération des contenus. Utilisez le chat de groupe, écrivez à support(at)pocketnet*dot*app ou publiez des articles complets sur ce sujet.";
_l.e14073 = "Particularités de la curation sur "+appname+".";
_l.e14074 = "Tout contenu est-il autorisé sur "+appname+" ? Si certains contenus ne le sont pas, peut-on encore parler d'une plateforme de liberté d'expression ?";
_l.e14075 = "Il arrive qu'un utilisateur vienne dans le but précis d'attaquer "+appname+" en publiant une série d'images ignobles. Pour nous en protéger, nous avons le mécanisme suivant. Si la réputation de quelqu'un atteint -50 (moins 50), son compte est automatiquement bloqué. Avoir une réputation de -50 équivaut à recevoir 25 notes d'une étoile sans aucune note de quatre ou cinq étoiles. C'est presque impossible sans avoir beaucoup de mauvaises publications.";
_l.e14076 = "Signaler une publication précise";
_l.e14077 = "Lorsque votre réputation atteint 50 et que vous cliquez sur les points en haut à droite d'une publication, vous verrez l'option Se plaindre. Si suffisamment de plaintes sont reçues, la publication ne sera plus affichée. Une plainte aboutit lorsque le nombre de plaintes atteint au moins ⅓ du nombre de notes de 4 et 5 étoiles, avec un minimum de 10 plaintes (ce seuil sera ajusté au fil du temps en concertation avec la communauté).</div><div>Nous sommes extrêmement et passionnément favorables à la liberté d'expression. Cependant, nous ne voulons pas transformer "+appname+" en un forum marginal où règnent les fous. Qu'est-ce qui devrait vous pousser à vous plaindre ?</div><div>NE vous plaignez PAS de choses qui ne vous plaisent tout simplement pas ou qui vous offensent. Ce n'est pas un critère suffisant. Ne suivez pas les personnes qui vous offensent (nous aurons bientôt une fonction pour ne plus voir leurs publications), mais ne vous plaignez pas d'elles. Plaignez-vous uniquement de ce qui menace la viabilité à long terme de "+appname+" en tant que plateforme de communication de masse qui entend toucher toutes les couches de la société dans de nombreux pays.</div><div>Nous vous recommandons vivement de vous plaindre de toute pornographie ou nudité. Il existe de nombreux sites pornographiques sur le web, nous ne voulons pas mêler cela à notre projet de liberté d'expression. Nous encourageons vivement la communauté à retirer par vote la pornographie et la nudité. Deuxièmement, toute menace directe doit être retirée, tout comme les exemples flagrants de racisme. Si nous laissons les médias dominants nous associer directement au racisme ou à la violence, "+appname+" cessera d'exister avant même que nous ayons pu le faire connaître. Ce n'est pas parce que les médias dominants crient au loup à propos d'un prétendu racisme que nous devons leur donner raison en le tolérant sur notre plateforme. Cela nous détournerait de ce que nous cherchons à accomplir : contester le nouveau totalitarisme créé par l'alliance contre nature des médias, de la finance et de fonctionnaires corrompus.";
_l.e14078 = "En quoi "+appname+" est-il différent de...";
_l.e14079 = "Twitter, Facebook, Reddit et autres plateformes centralisées ?";
_l.e14080 = "Il n'y a ni autorité centrale ni société. La plateforme est gérée par des nœuds égaux sur une blockchain. Tous les revenus sont partagés entre les opérateurs de nœuds et les créateurs de contenu. Les opérateurs de nœuds mettent en staking des Pocketcoins pour produire des blocs avec récompenses et frais de transaction. La moitié des récompenses de chaque bloc revient aux créateurs de contenu, en fonction des notes que leurs contenus reçoivent des utilisateurs.";
_l.e14081 = "Plateformes décentralisées comme Minds.com et Sola ?";
_l.e14082 = "Ces deux plateformes, bien qu'excellentes, ne sont pas autonomes. Elles dépendent fortement de la plateforme Ethereum, car leurs jetons reposent sur la norme ERC-20 d'Ethereum. Cela signifie que les opérations sur les jetons entraînent des frais de gas en Ether. De plus, ces entités ont des sociétés derrière elles, et une société sera toujours un point de centralisation en raison de sa logique économique de croissance des profits. En outre, les sociétés sont extrêmement faciles à censurer.";
_l.e14083 = "De Steemit ?";
_l.e14084 = "Steemit possède sa propre blockchain, mais c'est une entité commerciale avec toute la centralisation que cela implique.";
_l.e14085 = "Plateformes décentralisées comme Mastodon et autres ?";
_l.e14086 = "Bien que Mastodon soit une plateforme entièrement décentralisée, son utilisation exige beaucoup de connaissances techniques. C'est un frein important à une adoption à grande échelle. "+appname+" propose des applications web et de bureau, et les utilisateurs peuvent se connecter depuis n'importe quel appareil, récupérer leurs paramètres personnels depuis la blockchain et commencer immédiatement à utiliser la plateforme sans aucune connaissance technique.";
_l.e14087 = "Écosystème "+appname+"";
_l.e14088 = "Comment le développement de "+appname+" est-il financé ?";
_l.e14089 = ""+appname+" est open source et est actuellement géré par un groupe de bénévoles possédant de solides compétences en programmation et en mathématiques. Après son lancement, "+appname+" attirera les meilleurs talents en programmation grâce à sa promesse de créer un réseau social décentralisé et équitable. Les programmeurs et spécialistes du marketing qui travaillent sur le Pocketcoin reçoivent 5 % de l'émission. Les récompenses des développeurs et des spécialistes du marketing seront attribuées par un vote transparent des nœuds.";
_l.e14090 = "Qu'est-ce que le Pocketcoin ?";
_l.e14091 = "Le Pocketcoin est le jeton du réseau. Il sert exclusivement à acheter de la publicité auprès des contributeurs de "+appname+" et à payer les frais de transaction de ces paiements. L'émission de Pocketcoin dépend du nombre d'utilisateurs de "+appname+" et comporte des facteurs algorithmiques qui lient sa valeur à long terme au revenu annuel par utilisateur (ARPU). L'ARPU est un terme de la publicité numérique qui désigne le revenu total qu'une plateforme perçoit pour un utilisateur actif par an. Dans Pocketnet, l'ensemble des revenus est partagé entre les créateurs de contenu et les nœuds.";
_l.e14092 = "Comment les créateurs de contenu et les opérateurs de nœuds sont-ils récompensés ?";
_l.e14093 = ""+appname+" dispose d'une place de marché directe unique où les créateurs de contenu peuvent vendre de la publicité aux annonceurs. Les créateurs fixent leur prix et peuvent accepter des publicités standardisées ou proposer des placements personnalisés à forte valeur (où ils présentent le produit à leur manière). La place de marché directe est en substance une bourse publicitaire qui permet aux annonceurs de cibler des audiences précises sans intermédiaire. Tous les achats publicitaires et les publicités elles-mêmes sont liés dans la blockchain, l'achat de publicité ne nécessite donc aucune confiance.";
_l.e14094 = "Et si des utilisateurs publient du contenu illégal, de la pornographie/nudité ou du SPAM ?";
_l.e14095 = ""+appname+" n'est pas une plateforme du darknet ni une sorte de site pornographique. Bien qu'elle soit décentralisée et résistante à la censure, elle est modérée par ses utilisateurs. Tout contenu illégal est signalé et retiré de la plateforme selon le modèle de Wikipédia. Cela signifie que les utilisateurs ayant la meilleure réputation peuvent modérer la plateforme. Cependant, des garde-fous existent (dans le code open source) pour empêcher qu'un même groupe de personnes, ou un groupe très similaire, ne retire de manière répétée du contenu de la plateforme. De plus, les utilisateurs sont explicitement encouragés à signaler les contenus illégaux OU ceux qui menacent l'adoption massive de "+appname+", et pas simplement les contenus qu'ils trouvent choquants. Pour que "+appname+" reste une plateforme de liberté d'expression, nous vous encourageons à participer, à développer votre réputation et à modérer la plateforme correctement, sans la censure qui prévaut actuellement dans les réseaux sociaux centralisés.";
_l.e14096 = "Qui dirige "+appname+" ?";
_l.e14097 = "Aucune société ni aucune personne ne possède ou ne contrôle "+appname+".";
_l.e14098 = "Le concepteur de "+appname+", Daniel Sachkov, a changé d'orientation à l'été 2019 : il mène désormais des recherches sur la décentralisation accrue de la technologie blockchain au profit de tous. Conformément à l'idée d'une architecture et d'une conception de réseau social entièrement décentralisées, il a confié le contrôle du projet à la communauté et aux nœuds qui font fonctionner le réseau.";
_l.e14099 = "Depuis, une équipe de développeurs compétents, qui évolue au fil du temps, et de bénévoles de la communauté travaille à la concrétisation de sa vision. ";
_l.e14100 = "Centre d'aide";
_l.e14101 = "Explorateur de blocs";
_l.e14102 = "FAQ";
_l.e14103 = "Feuille de route";
_l.e14104 = "Installation du nœud";
_l.e14105 = "Vidéos";
_l.e14106 = "Applications";
_l.e14107 = "Rechercher des mises à jour";
_l.e14108 = "Partager la réponse";
_l.e141081 = "Menu";
_l.e14109 = "Où puis-je télécharger l'application Android ?";
_l.e14110 = "Google Play Market";
_l.peertubeAddVideo = "Téléverser une vidéo";
_l.peertubeAddAudio = "Téléverser un audio";
_l.peertubeAddStream = "Ajouter un direct à la publication";
_l.e14111 = "Un problème est survenu lors du chargement des images";
_l.editcomment = "Modifier le commentaire";
_l.system16 = {
    charts : {

    }
};
_l.selectnode = function(a) {
    return `Voulez-vous vraiment vous reconnecter au nœud ${a} sélectionné ?`
};
_l.downvoteShareMessage = "a voté contre votre publication";
_l.shareviagroupemail = "E-mail";
_l.shareviagroupmessenger = "Messageries";
_l.shareviagroupsocial = "Réseaux sociaux";
_l.shareviagroupblog = "Blogs";
_l.anotherSiteCaption = "Vous suivez un lien externe vers un site tiers";
_l.anotherSiteDisc = "Nous ne sommes pas responsables du contenu de ce site et vous recommandons vivement de ne communiquer aucune donnée personnelle sur des sites tiers.";
_l.Categories = "Catégories";
_l.addtagsCategories = "Catégories et tags";
_l.addcategory = "Ajouter une catégorie";
_l.categoryname = "Nom de la catégorie";
_l.entercategoryname = "Saisissez le nom de la catégorie";
_l.categoryfilter = "Filtre de catégories";
_l.emptycategoryname = "Veuillez saisir le nom de la catégorie.";
_l.doublename = "Une catégorie portant ce nom existe déjà. Veuillez choisir un autre nom.";
_l.showmoreusers = "Afficher plus d'utilisateurs";
_l.zeron = "Aucun résultat";
_l.maxtags = "5 tags maximum autorisés";
_l.videotitle = "Saisissez le titre de la vidéo/du direct";
_l.videodesc = "Saisissez la description de la vidéo/du direct";
_l.entervideocaption = "Veuillez saisir le titre de la vidéo";
_l.period = "Période";
_l.periodday = "Un jour";
_l.period3day = "Trois jours";
_l.period7day = "Une semaine";
_l.period31day = "Un mois";
_l.period182day = "Six mois";
_l.shareBareLink = "Partager le lien de la vidéo";
_l.videoCopied = "Lien de la vidéo copié dans le presse-papiers";
_l.editWallpaper = "Modifier l'image d'aperçu";
_l.removeVideo = "Supprimer le média";
_l.removeVideoDialog = "Voulez-vous vraiment supprimer cette vidéo ?";
_l.pterror_meta = "Peertube : requête indéfinie";
_l.pterror_host = "Peertube : serveur Peertube introuvable";
_l.pterror_link = "Peertube : lien Peertube inconnu";
_l.pterror_removeerror = "Peertube : impossible de supprimer le média. Veuillez réessayer";
_l.pterror_updateempty = "Peertube : aucune modification à mettre à jour";
_l.pterror_uploaderror = "Peertube : la vidéo n'a pas été téléversée";
_l.pterror_dailyquotalimit = "Peertube : vous avez atteint votre limite de téléversement de vidéos";
_l.pterror_videoQuotaUsedDaily = "Peertube : impossible d'obtenir les informations de la chaîne (quota)";
_l.pterror_usersMe = "Peertube : impossible d'obtenir les informations de la chaîne";
_l.pterror_oauthClientsLocal = "Peertube : impossible d'obtenir les informations OAuth du serveur";
_l.pterror_pocketnetAuth = "Peertube : échec de l'autorisation Peertube-"+appname+"";
_l.pterror_getToken = "Peertube : impossible d'obtenir le jeton";
_l.pterror_videonotselected = "Peertube : aucune vidéo sélectionnée";
_l.settingsTranscoding = "Transcoder la vidéo sur mon appareil lors du téléversement";
_l.videoTranscodingNotOptimal = "Résultat de transcodage non optimal. Poursuite avec la vidéo d'origine";
_l.videoTranscodingError = "Une erreur est survenue lors du traitement de votre vidéo";
_l.videoUploadingFinish = "Finalisation du téléversement...";
_l.uploadNewVideo = "Téléverser une nouvelle vidéo";
_l.uploadNewAudio = "Téléverser un nouvel audio";
_l.selectVideoFile = "Sélectionner un fichier vidéo";
_l.selectAudioFile = "Sélectionner un fichier audio";
_l.uploadVideoProgress_binaries = "Préparation des binaires :";
_l.uploadVideoProgress_processing = "Traitement de la vidéo :";
_l.uploadVideoProgress_uploading = "Téléversement de la vidéo :";
_l.uploadVideoProgress = "Progression :";
_l.uploadAudioProgress_uploading = "Téléversement de l'audio :";
_l.uploadVideoProgress_start = "Initialisation du téléversement de la vidéo :";
_l.uploadAudioProgress_start = "Initialisation du téléversement de l'audio :";
_l.uploadCanceled = "Téléversement annulé";
_l.pleaseTryAgain = "Un problème est survenu. Veuillez réessayer";
_l.pbp_1 = "Programme de bonus "+appname+"";
_l.pbp_2 = "Critères du bonus pour le contenu original :";
_l.pbp_3 = "Toutes les 15 000 vues + 1250 notes cinq étoiles d'utilisateurs uniques + 1500 filleuls";
_l.pbp_4 = "Équivalent en PKOIN :";
_l.pbp_5 = "1 000 USDT";
_l.pbp_6 = "Comment accélérer votre bonus ?";
_l.pbp_7 = "Intégrez votre vidéo "+appname+" sur des sites externes (cliquez sur Partager et choisissez Intégrer)";
_l.pbp_8 = "Partagez votre vidéo sur les réseaux sociaux et par e-mail";
_l.pbp_9 = "Partagez le lien vers votre page personnelle (allez sur votre profil et cliquez sur Partager). Vous pouvez créer des publications spéciales, exclusivement réservées à vos abonnés "+appname+". Lors de la création d'une publication, choisissez l'option Visible uniquement par les abonnés. Les contenus exclusifs augmenteront le nombre de filleuls.";
_l.pbp_10 = "Si vous invitez un vidéoblogueur et pouvez le prouver, vous recevez un bonus égal à 25 % de ses gains sur ses 4 premiers bonus.";
_l.pbp_11 = "Pour toute question, écrivez à";
_l.pbp_6_1 = "";
_l.pbp_6_2 = "";
_l.pbp_6_3 = "";
_l["Top Videos"] = "Meilleures vidéos";
_l["More videos by this author"] = "Plus de vidéos de cet auteur";
_l["pdirectdialog"] = "Les proxys externes ne répondent pas, voulez-vous passer à un proxy local ?";
_l.goLive = "Passer en direct";
_l.streamInfo = "Infos du direct";
_l.streamCreating = "Création du direct";
_l.importFromExternal = "ou importer depuis YouTube";
_l.importHeading = "Importer une vidéo depuis YouTube";
_l.importInputPlaceholder = "Collez le lien de votre vidéo YouTube";
_l.importInputLabel = "URL de la vidéo";
_l.capitalWarning = "Limites de qualité du direct";
_l.streamSettingsWarn = "Pour des performances optimales, utilisez des paramètres de diffusion ne dépassant pas : débit de 2000 kb/s, résolution de 1920x1080p. Sinon, votre direct pourrait être interrompu ou instable";
_l.keygeneration = "Génération des clés cryptographiques";
_l.failedStreamGeneration = "Impossible de démarrer le direct";
_l.hideallnotifications = "Masquer toutes les notifications";
_l.e133452 = "vous a envoyé un message";
_l.e133453 = "vous invite dans un chat";
_l.createnewcontinue = "Continuer la création du compte";
_l.transactionnotfound = "Transaction introuvable";
_l.donateself = "Vous ne pouvez pas vous faire un don à vous-même";
_l.donated = "a commenté votre publication et fait un don";
_l.incoins = "Pas assez de pièces";
_l.yourbalance = "Votre solde";
_l.sumoftransaction = "Montant de la transaction";
_l.videoBitrateError = "Le débit de la vidéo est trop élevé. Veuillez utiliser un fichier de qualité/résolution inférieure";
_l.videoQualityInfo = "Débit vidéo maximal autorisé : 8 Mbit/s. Si votre fichier dépasse cette limite, le téléversement sera interrompu. Résolution maximale autorisée : 720p. <br/> Débits recommandés : <br/> <b>1080p :</b> 5081 Kbps <br/> <b>720p :</b>  2680 Kbps <br/> <b>480p :</b>  1300 Kbps <br/> <b>360p :</b>  700 Kbps";
_l.videoQualityCaption = "Limites de qualité vidéo";
_l.videoFormats = "Liste des formats vidéo pris en charge : .mp4, .mkv, .mov, .avi, .wmv, .flv, .f4v, .3g2, .3gp, .mts, .m2ts, .mxf, .nut";
_l.videoSizeError = "Le fichier vidéo sélectionné dépasse la limite de 4 Go par vidéo. Veuillez le compresser ou en choisir un autre.";
_l.videoSizeAtt = "Taille de fichier maximale autorisée : 4 Go.";
_l.videoFormatError = "Format vidéo incorrect";
_l.videoSelectError = "Aucune vidéo sélectionnée";
_l.removevideoShareQuestion = "La vidéo téléversée reste disponible dans votre espace vidéo. Voulez-vous supprimer complètement la vidéo ?";
_l.removevideoShareQuestionDelete = "Supprimer la vidéo";
_l.removevideoShareQuestionLeave = "Non";
_l.importingVideo = "Chargement de la vidéo";
_l.importingVideoSuccess = "Vidéo chargée. Vous pouvez continuer la publication";
_l.streamLinks = "Liens pour le logiciel de diffusion";
_l.linkRTMP = "URL RTMP";
_l.linkStreamKey = "Clé de diffusion";
_l.videoCabinet = "Mes vidéos";
_l.uploadQuota = "Quota de téléversement quotidien";
_l.attachVideoToPost = "Créer une publication avec cette vidéo";
_l.linkToPost = "Lien vers la publication";
_l.attachVideoToPostShort = "Publication";
_l.totalStars = "Note moyenne (total des votes)";
_l.totalComments = "Total des commentaires";
_l.totalViews = "Vues de la vidéo";
_l.enterVideoName = "Saisissez le nom de la vidéo";
_l.videoTranscoding = "La vidéo est en cours de traitement et peut ne pas fonctionner correctement ou entraîner une consommation de données accrue. Voulez-vous quand même la publier ?";
_l.waitForTranscoding = "Attendre la fin du traitement";
_l.bonusProgram = "Statut du programme de bonus";
_l.bonusProgramViews = "Total des vues vidéo";
_l.bonusProgramRatings = "Total des notes";
_l.sortBy = "Trier par :";
_l.sortDirection = "Ordre de tri :";
_l.sortDirectionAsc = "Croissant";
_l.sortDirectionDesc = "Décroissant";
_l.sortByName = "Nom";
_l.sortByCreatedAt = "Date de création";
_l.sortByDuration = "Durée";
_l.sortByViews = "Vues";
_l.unableToAuthorize = "Autorisation impossible";
_l.unableToAuthorizeBody = "Malheureusement, vous ne pouvez pas encore téléverser de vidéos sur "+appname+" via le site web. Il vous faut au moins 5 PKOIN ou 100 de réputation pour téléverser des vidéos. Vous pouvez aussi utiliser l'application "+appname+"";
_l.unableToAuthorizeConnection = "Autorisation impossible";
_l.unableToAuthorizeConnectionBody = "Malheureusement, l'application ne parvient pas à authentifier ce compte sur le serveur vidéo. Veuillez réessayer plus tard";
_l.download = "Télécharger";
_l.emptyDescription = "La description est vide";
_l.transcodingShort = "Traitement";
_l.editVideoDescription = "Modifier le nom/la description de la vidéo";
_l.errorChangingDescription = "Impossible de modifier le nom/la description de la vidéo";
_l.downloadingVideo = "Enregistrement de la vidéo";
_l.deleteSavedVideo = "Supprimer la vidéo enregistrée";
_l.downloadShare = "Enregistrer la publication";
_l.deleteSavedShare = "Supprimer la publication";
_l.enterVideoDescription = "Saisissez la description de la vidéo";
_l.doyouwantseepk = "Voulez-vous vraiment afficher votre clé privée ?";
_l.copycode = "Copier la clé privée";
_l.privatekeyqr = "Code QR de la clé privée";
_l.saveimage = "Enregistrer l'image";
_l.showAllButton = "Tout afficher";
_l.hideAllButton = "Masquer";
_l.UniqueUsers = "Évaluateurs uniques";
_l.ErrorLoadingRates = "Erreur de chargement";
_l.userGuides = "Guides";
_l.liveSreamingGuide = "Diffusion en direct";
_l.bhelperTitle1 = "Pocketnet a déménagé";
_l.bhelperTitle2 = ""+appname+" de la liberté d'expression";
_l.bhelperSubtitle1 = "Pocketnet s'appelle désormais";
_l.bhelperSubtitle2 = "Veuillez suivre le lien ci-dessous";
_l.videotranscodingwait = "Veuillez patienter, cette vidéo est en cours de traitement. Cela peut prendre un certain temps ; une fois transcodée, vous pourrez la publier sur "+appname+".";
_l.views = "Vues";
_l.viewers = "Spectateurs";
_l.saveshare = "Télécharger la vidéo";
_l.gotosaved = "Aller aux téléchargements";
_l.successdownloaded = "Vidéo téléchargée";
_l.logoutaccount = "Se déconnecter du compte";
_l.closeapplication = "Quitter l'application";
_l.attachVideoLenta = "Joindre la vidéo à la publication";
_l.attachVideoLentaShort = "Joindre";
_l.linkToPostLenta = "Déjà publiée";
_l.ReferralUsers = "Filleuls. Total/Depuis le&nbsp;01.11.2021";
_l.lockedaccount = "Votre compte a été bloqué suite à des plaintes d'utilisateurs ou à une décision du jury";
_l.lockedaccounta = "Le compte de l'auteur a été bloqué suite à des plaintes d'utilisateurs ou à une décision du jury";
_l.lockedaccountacomment = "Le compte de l'auteur du commentaire a été bloqué suite à des plaintes d'utilisateurs ou à une décision du jury";
_l.hiddenCommentLabel = "Le commentaire est masqué en raison d'une note faible ou parce que l'auteur a bloqué l'utilisateur";
_l.blockedbymeHiddenCommentLabel = "Commentaire masqué car vous avez bloqué l'utilisateur";
_l.hiddenCommentsLabel = "Commentaire masqué en raison des notes faibles de son auteur";
_l.showhiddenComment = "Afficher";
_l.showhiddenPost = "Afficher la publication";
_l.visibletoeveryone = 'Visible par tous';
_l.visibleonlytosubscribers = 'Visible uniquement par les abonnés';
_l.visibleonlytoregistered = "Visible uniquement par les utilisateurs de "+appname+"";
_l.sharevisibility_sub = 'Pour les abonnés';
_l.sharevisibility_reg = "Pour les utilisateurs de "+appname+"";
_l.sharevisibilitylabel_sub_post = "L'auteur a choisi de rendre cette <b>publication</b> accessible uniquement aux abonnés";
_l.sharevisibilitylabel_reg_post = "L'auteur a choisi de rendre cette <b>publication</b> accessible uniquement aux utilisateurs inscrits de "+appname+"";
_l.sharevisibilitylabel_sub_article = "L'auteur a choisi de rendre cet <b>article</b> accessible uniquement aux abonnés";
_l.sharevisibilitylabel_reg_article = "L'auteur a choisi de rendre cet <b>article</b> accessible uniquement aux utilisateurs inscrits de "+appname+"";
_l.sharevisibilitylabel_sub_video = "L'auteur a choisi de rendre cette <b>vidéo</b> accessible uniquement aux abonnés";
_l.sharevisibilitylabel_reg_video = "L'auteur a choisi de rendre cette <b>vidéo</b> accessible uniquement aux utilisateurs inscrits de "+appname+"";
_l.topAuthors = 'Auteurs recommandés';
_l.recommendedPosts = 'Publications recommandées';
_l.rating = "note";
_l.setupVideoNodeGuide = 'Installer un nœud vidéo';
_l.subscribers3 = 'Abonnés';
_l.aboutOpen5_1 = 'Écrivez-nous à :';
_l.HIVTable24 = "Il s'agit de cryptomonnaies décentralisées comme Bitcoin ou Pocketcoin";
_l.pkoin_commerce_tag_share_error = "Le tag « pkoin_commerce » ne peut être utilisé que seul. Une publication avec ce tag ne peut pas contenir de vidéos ni d'images";
_l.pkoin_commerce_info = "Les transactions de PKOIN entre utilisateurs ne sont pas modérées et se font à vos propres risques.";
_l.buyforcrypto = "Acheter avec des cryptomonnaies";
_l.buywithcreditcard = "Acheter par carte bancaire";
_l.buylogo = "Acheter des Pocketcoins (PKOIN)";
_l.comment = "Commentaire";
_l.sendToAuthor = "Envoyer à l'auteur";
_l.pkoinComment = "Commentaire PKOIN";
_l.liftUpThePost = "Mettre en avant la publication";
_l.buypeertopeer = "Acheter de pair à pair";
_l.commentsOrder = "Tri par défaut des commentaires";
_l.commentsOrderPlaceholder = "Choisir le tri";
_l.comments_interesting = "Les plus intéressants d'abord";
_l.comments_timeup = "Les plus récents d'abord";
_l.comments_time = "Les plus anciens d'abord";
_l.comments_next = "Afficher la suite";
_l.create = "Créer";
_l.drafts = "Brouillons";
_l.repostyourown = "Vous ne pouvez pas repartager votre propre publication";
_l.reachedlimits = "Vous avez atteint votre limite quotidienne d'actions. Pour l'augmenter, vous devez avoir une réputation valide.";
_l.closestreachedlimits = "Vous êtes proche de votre limite quotidienne d'actions. Pour l'augmenter, vous devez avoir une réputation valide.";
_l.sendUserStatistics = "Envoyer des rapports d'erreurs anonymes à l'équipe "+appname+"";
_l.captionUserStats = "Statistiques";
_l.editarticledraft = "Modifier le brouillon de l'article";
_l.deletearticledraft = "Supprimer le brouillon de l'article";
_l.previewarticledraft = "Voir le brouillon de l'article";
_l.deletedraftquestion = "Voulez-vous vraiment supprimer le brouillon de l'article ? Il ne pourra pas être récupéré";
_l.publishquestion = "Voulez-vous vraiment publier cet article ?";
_l.etc = "Et ainsi de suite...";
_l.openlinkssettings = "Ne pas ouvrir les liens dans l'application de bureau";
_l.nametaken = "Ce nom d'utilisateur est déjà pris sur "+appname+"";
_l.accountnotfound = "Nous n'avons pas trouvé votre compte dans la blockchain. Peut-être que l'inscription n'a pas été finalisée ou qu'il n'y a pas de connexion Internet";
_l.name20symbols = "Le nom ne peut pas dépasser 20 caractères";
_l.namereservedpn = "Pour éviter toute confusion, l'utilisation de Pocketnet dans le nom est réservée";
_l.namereservedbn = "Pour éviter toute confusion, l'utilisation de "+appname+" dans le nom est réservée";
_l.photohassizegreater = function(v){
    return "Votre photo dépasse "+v+" Mo. Veuillez téléverser une photo de moins de "+v+" Mo."
};
_l.invalidformat = "Format d'image non valide. Seuls png et jpeg sont autorisés";
_l.downloadDesctApp = "Télécharger "+appname+" pour ordinateur";
_l.downloadMobileApp = "Installer l'application mobile";
_l.easyNode_learnPkoin = "En savoir plus sur le PKOIN";
_l.easyNode_e10000 = "Nœud";
_l.easyNode_e10001 = "Télécharger et installer le nœud";
_l.easyNode_e10002 = "Nœud "+appname+"";
_l.easyNode_e10003 = "Chargement";
_l.easyNode_e10004 = "Installation du nœud";
_l.easyNode_e10005 = "Suppression du nœud";
_l.easyNode_e10006 = "Configuration requise";
_l.easyNode_e10007 = "La gestion du nœud n'est pas encore disponible pour votre système d'exploitation";
_l.easyNode_e10008 = "Synchronisation";
_l.easyNode_e10009 = "Configuration";
_l.easyNode_e10010 = "Activé";
_l.easyNode_e10011 = "Chemin du daemon";
_l.easyNode_e10012 = "Chemin des données";
_l.easyNode_e10013 = "Rétablir les chemins par défaut";
_l.easyNode_e10014 = "Par défaut";
_l.easyNode_e10015 = "Mettre à jour le nœud";
_l.easyNode_e10016 = "Aucune mise à jour disponible";
_l.easyNode_e10017 = "Supprimer";
_l.easyNode_e10018 = "Supprimer le daemon";
_l.easyNode_e10019 = "Supprimer le daemon et les données";
_l.easyNode_e10020 = "Portefeuille";
_l.easyNode_e10021 = "Statut";
_l.easyNode_e10022 = "Requête en cours...";
_l.easyNode_e10023 = "Staking";
_l.easyNode_e10024 = "Si vous avez déjà ajouté des PKOIN au nœud, attendez que la hauteur soit entièrement synchronisée";
_l.easyNode_e10025 = "Solde";
_l.easyNode_e10026 = "Contrôle";
_l.easyNode_e10027 = "Déposer";
_l.easyNode_e10028 = "Retirer";
_l.easyNode_e10029 = "Exporter le portefeuille";
_l.easyNode_e10030 = "Importer le portefeuille";
_l.easyNode_e10031 = "Actif";
_l.easyNode_e10032 = "Version";
_l.easyNode_e10033 = "Chaîne";
_l.easyNode_e10034 = "Description";
_l.easyNode_e10035 = "Hauteur";
_l.easyNode_e10036 = "Moins d'une heure restante";
_l.easyNode_e10037 = function(v) { return v + " heure(s) restante(s)" };
_l.easyNode_e10038 = "Hash du bloc";
_l.easyNode_e10039 = "Désactiver le nœud";
_l.easyNode_e10040 = "Activer le nœud";
_l.easyNode_e10041 = "Votre portefeuille a été enregistré dans";
_l.easyNode_e10042 = "Votre portefeuille a été importé";
_l.easyNode_e10043 = "La nouvelle adresse de votre nœud";
_l.easyNode_e10044 = "Saisissez l'adresse et le montant pour transférer des PKOIN";
_l.easyNode_e10045 = "Adresse de destination";
_l.easyNode_e10046 = "Montant";
_l.easyNode_e10047 = "Arguments non valides";
_l.easyNode_e10048 = "Adresse de destination non valide";
_l.easyNode_e10049 = "Montant non valide";
_l.easyNode_e10050 = "Transaction créée";
_l.easyNode_e10051 = "Voulez-vous vraiment arrêter le nœud et le mettre à jour ?";
_l.easyNode_e10052 = "Assurez-vous d'avoir sauvegardé le portefeuille. Voulez-vous vraiment supprimer le nœud et le dossier de données ?";
_l.easyNode_e10053 = "Voulez-vous vraiment supprimer le daemon du nœud ?";
_l.easyNode_e10054 = "Voulez-vous vraiment installer le nœud ?";
_l.easyNode_e10055 = "Voulez-vous vraiment rétablir le chemin des données par défaut ?";
_l.easyNode_e10056 = "Go de RAM libre";
_l.easyNode_e10058 = "Go d'espace disque libre";
_l.easyNode_e10059 = "Mb/s de débit Internet";
_l.easyNode_e10060 = "Disque SSD";
_l.easyNode_e10061 = "Votre nœud est en cours d'exécution. Fermer l'application quand même ?";
_l.easyNode_e10062 = "Une mise à jour du nœud est disponible. Télécharger la nouvelle version ?";
_l.easyNode_e10063 = "Le nœud a été mis à jour avec succès";
_l.easyNode_e10064 = "Assistance";
_l.easyNode_e10065 = "Exportez votre portefeuille et conservez-le en lieu sûr avant de recharger votre solde !";
_l.IHave = "J'ai";
_l.downloadNode = "Télécharger le nœud de bureau pour Windows";
_l.months = "Mois";
_l.year = "Année";
_l.stakingCalculator = "Calculateur de staking : calculez combien vous gagnez en plaçant des Pocketcoins (PKOIN) dans un nœud.";
_l.easyNode_e2000 = "Défendez la liberté d'expression et ";
_l.easyNode_e2000_1 = "gagnez";
_l.easyNode_e2000_2 = " des cryptomonnaies";
_l.easyNode_e2001 = "Qu'est-ce que le Pocketcoin ? Le Pocketcoin est une cryptomonnaie qui alimente la plateforme sociale décentralisée "+appname+". Elle sert à récompenser les créateurs de contenu, à mettre en avant des publications et des commentaires, à payer des publicités et à débloquer des fonctionnalités spéciales sur "+appname+".";
_l.easyNode_e2002 = "Qu'est-ce qu'un nœud ? Un nœud est un ordinateur appartenant à n'importe quel utilisateur de "+appname+", qui soutient le réseau et";
_l.easyNode_e2002_1 = " gagne ";
_l.easyNode_e2002_2 = "des Pocketcoins. Votre ordinateur peut être l'un de ces nœuds, à condition d'avoir au moins 50 Go d'espace SSD libre et une connexion Internet correcte. Le nœud doit bloquer des Pocketcoins pour";
_l.easyNode_e2002_2_1 = " gagner ";
_l.easyNode_e2002_2_2 = "encore plus de Pocketcoins. C'est ce qu'on appelle le staking en cryptomonnaie.";
_l.minPkoin = function (p){
	return  "Minimum " + String(p) + " PKOIN"
};
_l.maxPkoin = function (p){
	return  "Maximum " + String(p) + " PKOIN"
};
_l.topPosts = "Meilleures publications";
_l.videop2psettings = "Utiliser le p2p pour regarder les vidéos";
_l.art_validatetags = "Veuillez ajouter des tags à votre article long";
_l.art_validatecover = "Veuillez ajouter une couverture à votre article long";
_l.art_validatecaption = "Veuillez ajouter un titre à votre article long";
_l.art_validatecontent = "Veuillez ajouter du contenu à votre article long";
_l.art_nothingchange = "Aucune modification";
_l.art_newarticle = "Nouvel article long";
_l.art_myarticles = "Mes articles longs";
_l.art_changecover = "Téléverser une couverture";
_l.art_removecover = "Supprimer la couverture";
_l.art_publish = "Publier";
_l.art_editing = "Modification";
_l.art_draftsaved = "Brouillon enregistré";
_l.art_gotolastdraft = "aller au dernier brouillon";
_l.art_categoriestags = "Catégories et tags";
_l.art_preview = "Aperçu";
_l.art_caption = "Titre du nouvel article long";
_l.art_placeholder = "Écrivons une histoire géniale !";
_l.art_newarticlecreation = "Créer un nouvel article long";
_l.art_editingsh = "Modifier un article long publié";
_l.art_saveedited = "Enregistrer";
_l.art_wordscount = "Nombre de mots";
_l.art_volumepercent = "Limite de taille de l'article";
_l.art_goback = "Revenir";
_l.downloadingUpdate = "Téléchargement de la mise à jour";
_l.hasnotupdates = "Aucune mise à jour disponible";
_l.cantmanageupdate = "Impossible de gérer la mise à jour";
_l.updateapplication = "Mettre à jour l'application";
_l.applicationversion = "Version de l'application";
_l.installedusinggps = "L'application n'a pas été installée via Google Play.";
_l.downloadplaystore = "Télécharger sur Google Play";
_l.downloadgithub = "Télécharger l'APK";
_l.reputation = "Réputation";
_l.subscriptions = "Abonnements";
_l.tothetop = "Vers le haut";
_l.menu = "Menu";
_l.donotshowagain = "Ne plus afficher";
_l.postby = "Publication de";
_l.continueon = "Continuer sur";
_l.bestwishes = "Cordialement,";
_l.ratings123 = "Seuls les utilisateurs ayant une réputation élevée et au moins 10 publications dans le fil peuvent donner des notes de 1, 2 ou 3 étoiles, commenter et noter négativement les commentaires. Cela vise à protéger les auteurs, car "+appname+" ne demande AUCUNE information personnelle pour l'inscription.";
_l.ratingss3 = "Seuls les utilisateurs ayant une réputation élevée peuvent donner des notes de 1, 2 ou 3 étoiles. Cela vise à protéger les auteurs, car "+appname+" ne demande AUCUNE information personnelle pour l'inscription.";
_l.clearfilters = "Effacer les filtres";
_l.installedApps = "Installées";
_l.installedBadge = "Installée";
_l.clearcategories = "Voulez-vous vraiment effacer les filtres de catégories ?";
_l.cleartags = "Voulez-vous vraiment effacer les filtres de tags ?";
_l.fromsh = "De";
_l.hodoiearnmore = "Comment gagner plus de Pocketcoins ?";
_l.removeaddress = "Voulez-vous vraiment supprimer cette adresse de cet appareil ?";
_l.wanttoseekey = "Voulez-vous vraiment afficher votre clé privée ?";
_l.seeprivatekey = "Afficher la clé privée";
_l.max5acc = "Vous avez atteint le maximum de 5 comptes. Impossible d'en ajouter davantage";
_l.longreads = "Articles longs";
_l.readarticle = "Lire";
_l.filters = "Filtres";
_l.dataenteredincorrectly = "Données saisies incorrectement";
_l.lloadprevwithtags = "Actualiser le fil";
_l.newRepost = "Repartager";
_l.writesupport = "Écrire au support";
_l.submitapplication = "Envoyer votre demande";
_l.submitapplicationVideo = "Demander des PKOIN pour une vidéo";
_l.submitapplicationVideoSmall = "Envoyer et demander des PKOIN";
_l.videobloggerRequest = "Si vous êtes un blogueur avec une audience établie, vous pouvez recevoir des PKOIN en cadeau pour téléverser des vidéos";
_l.videobloggerRequest_pl1 = "Lien vers une chaîne existante 1";
_l.videobloggerRequest_pl2 = "Lien vers une chaîne existante 2";
_l.videobloggerRequest_pl3 = "Lien vers une chaîne existante 3";
_l.videobloggerRequest_pl_notes = "Remarques : toute information complémentaire";
_l.videobloggerRequest_pl_email = "E-mail de contact";
_l.videobloggerRequest_caption = "Remplissez ce formulaire pour recevoir des PKOIN";
_l.videobloggerRequest_er_link = "Indiquez au moins un lien vers une chaîne existante";
_l.videobloggerRequest_er_info = "Informations complémentaires requises";
_l.videobloggerRequest_er_email = "Laissez un e-mail pour que nous puissions vous répondre";
_l.videobloggerRequest_submitted = "Merci de nous avoir contactés, nous allons examiner votre demande";
_l.canuseipsetting = "Autoriser la connexion directe par IP via http. Connexion non sécurisée";
_l.optimizationtip = function(v){
    return v + " publications vues masquées"
};
_l.optimizationtip_show = "Afficher";
_l.thankTheAuthor = "Remercier l'auteur";
_l.encourageAuthor = "Soutenir l'auteur";
_l.gotoProfile2 = "Aller au profil";
_l.countviews = "Vues";
_l.countview = "Vue";
_l.popup_applications_header = "Important ! Veuillez télécharger l'application "+appname+"";
_l.popup_applications_feature_1 = "L'application de bureau est le moyen le plus résistant à la censure d'utiliser "+appname+"";
_l.popup_applications_feature_2 = "L'application de bureau ne dépend pas de "+appname+".com";
_l.popup_applications_feature_3 = "L'application de bureau, c'est comme un VPN intégré";
_l.popup_applications_button = " Téléchargez-la ici";
_l.norecommendedvideos = "Aucune vidéo recommandée trouvée";
_l.boosted = "Boosté";
_l.probability = "Probabilité";
_l.probabilitytext = function(lang){
	return "Probabilité qu'une publication apparaisse parmi les <b>30</b> premières publications du fil en langue <b>"+lang+"</b> pendant environ <b>1</b> jour"
};
_l.probabilitytexterror = "Impossible de calculer la probabilité de mise en avant";
_l.reachtexterror = "Impossible de calculer la portée";
_l.image = "Image";
_l.file = "Fichier";
_l.othervideos = "Autres vidéos";
_l.starssendcomments = "Laissez un commentaire à l'auteur";
_l.starssendcommentn = "Laissez un commentaire à l'auteur";
_l.starssendcommentp = "Laissez un commentaire à l'auteur";
_l.savevideo = "Télécharger la vidéo";
_l.useanimations = "Activer les animations";
_l.welcomecaption1 = ""+appname+" de la liberté d'expression";
_l.welcomecaption2 = "Lisez les contenus bannis par les géants de la tech";
_l.welcomecaption3 = "Discutez en privé avec vos amis, sans carte SIM";
_l.shareexternal = "Une autre fenêtre est ouverte";
_l.shareexternaluploadpeertube = "La fenêtre de téléversement des médias est ouverte";
_l.removeimageswhenvideo = "Les images jointes à la publication seront supprimées si vous continuez le téléversement de la vidéo. Passer au téléversement de la vidéo ?";
_l.lowstar_reason_5 = "Contenu protégé par le droit d'auteur";
_l.lowstar_reason_6 = "Spam";
_l.lowstar3 = "Si vous donnez 1 ou 2 étoiles pour des raisons autres que celles indiquées ci-dessus, après la mise en place de l'algorithme de modération, les membres du jury vous retireront définitivement l'ancienneté de votre compte.";
_l.usetor = "Connexion via le réseau Tor";
_l.torHintStateEnabled = "État du réseau Tor : activé";
_l.torHintStateDisabled = "État du réseau Tor : désactivé";
_l.torHintStateLoading = "État du réseau Tor : chargement";
_l.videotranscodingdelayedpost = "Cette vidéo est en cours de traitement et sera publiée dès la fin du transcodage. Veuillez ne pas fermer l'onglet d'ici là.";
_l.postInRelay = "Cette publication est en cours de traitement avant sa publication dans la blockchain";
_l.continuesubscribefeedCaption = "Voulez-vous continuer à voir les publications des personnes que vous suivez ?";
_l.continuesubscribefeedButton = "Continuer dans le fil des abonnements";
_l['dust (code 64)'] = "Vous essayez d'envoyer un montant trop faible, c'est impossible";
_l.videoNameIsIncorrectShort = "Le nom de la vidéo doit contenir au moins 3 caractères";
_l.videoNameIsIncorrectLong = "Le nom de la vidéo ne doit pas dépasser 120 caractères";
_l.recommended = "Recommandé";
_l.removeaccount = "Supprimer le compte";
_l.removeAccountQuestion = "Voulez-vous vraiment supprimer définitivement votre compte ? Cette action est irréversible.";
_l.removeAccountYes = "Oui, supprimer le compte";
_l.removeAccount_prepare = "Préparation";
_l.removeAccount_removePeertube = "Suppression des données des serveurs vidéo";
_l.removeAccount_removeMatrix = "Suppression des données du serveur de chat";
_l.removeAccount_removeBB = "Suppression du compte de la blockchain";
_l.removeAccount_finish = "Terminé";
_l.removeAccount_success = "La suppression de votre compte a réussi. La procédure devrait être entièrement terminée d'ici 10 minutes.";
_l.removeAccount_notprepared = "Compte introuvable dans la blockchain, il faudra peut-être patienter un peu";
_l.removeAccount_balance = "Il est impossible de supprimer le compte dans cette situation. Pour effectuer cette action, vous devez disposer d'un solde minimal de PKOIN";
_l.removeAccount_undefinedError = "Une erreur inattendue est survenue lors de la suppression de votre compte. Veuillez redémarrer l'application et réessayer";
_l.deletedAccount_temp = "Le compte est en cours de suppression";
_l.deletedAccount_deleted = "Compte supprimé";
_l.deletedAccount_true = "Compte supprimé";
_l.deletedAccountName = "Compte supprimé";
_l.utipdeleted = "Votre compte a été supprimé. Vous ne pouvez utiliser que le portefeuille";
_l.applydonate = "Appliquer";
_l.imagegallery = "Galerie d'images";
_l.useselected = "Utiliser la sélection";
_l.pkoindisabledisclaimer = "Dans l'application, vous pouvez uniquement recevoir de l'argent sur un portefeuille crypto, mais vous ne pourrez pas en envoyer";
_l.txbase_total = _l.txbase_unspents = _l.txbase_err_money = "Fonds insuffisants pour le transfert, compte tenu des frais";
_l.recommendations_menu_caption = "Informations sur les recommandations";
_l.recommendations_caption_tags = "Recommandations basées sur les tags";
_l.recommendations_caption_users = "Recommandations basées sur les interactions avec d'autres utilisateurs";
_l.recommendations_caption_disclamer = "Les statistiques sont stockées uniquement sur votre appareil, ne sont pas envoyées aux serveurs de "+appname+" et ne sont pas transmises à des tiers";
_l.recommendations_tags_table_caption = "Tag, probabilité, points, date de la dernière interaction";
_l.recommendations_tags_completed_caption = "Recommandations demandées";
_l.recommendations_tags_anotherShares = "Autres publications recommandées par ces tags";
_l.addAccessToLibrary = "Autoriser l'accès à la galerie";
_l.cameranotavailable = "Caméra non disponible";
_l.photolibrarylimited = "Vous avez accordé un accès limité à vos photos.";
_l.photolibrarymanage = "Sélectionner plus de photos";
_l.photolibrarylimitedempty = "Vous n'avez encore sélectionné aucune photo";
_l.photolibraryempty = "Votre galerie ne contient aucune photo";
_l.rtip4 = "Cette clé est votre mot de passe ! Ne la perdez pas.";
_l.removecategory = "Supprimer";
_l.removecategoryQestion = "Voulez-vous vraiment supprimer cette catégorie ?";
_l.searchbytext = "Recherche par texte :";
_l.searchbytags = "Recherche par tags :";
_l.boost_c1 = "Faites de la publicité avec des PKOIN et obtenez dès aujourd'hui des prospects pour votre projet crypto";
_l.boost_c2 = "Web 2.0";
_l.boost_c3 = ""+appname+" Web 3.0";
_l.boost_c4 = "Vous cherchez à vous faire entendre sur Internet ?";
_l.boost_c5 = "Voulez-vous présenter votre contenu ou votre produit à un nouveau public dynamique pour moins cher que sur les grands réseaux publicitaires ?";
_l.boost_c6 = ""+appname+", le réseau social basé sur la blockchain, vient de lancer un moyen de promouvoir des contenus, y compris des vidéos.";
_l.boost_c7 = "Le coût d'une impression sur "+appname+" est bien plus faible que sur les réseaux publicitaires traditionnels.";
_l.boost_c8 = "Booster des publications sur "+appname+" est très simple : il vous suffit de quelques Pocketcoins, la cryptomonnaie native de "+appname+". Cliquez sur Boost sous la publication, saisissez le montant et votre publication passe en haut !";
_l.boost_c9 = ""+appname+" compte des millions de visiteurs, et ce n'est pas fini. Votre contenu sera vu !";
_l.boost_c10 = "Si vous êtes un auteur en devenir qui souhaite élargir son audience, le boost de publications sur "+appname+" peut vous être utile !";
_l.boost_c11 = "Si vous êtes un annonceur à la recherche d'une plateforme pour promouvoir votre produit, vous pouvez lancer rapidement votre publicité et obtenir des conversions.";
_l.boost_c12 = "Open source";
_l.boost_c13 = "Téléversez vos vidéos";
_l.boost_c14 = "Gagnez avec "+appname+"";
_l.boost_c15 = "Protection de la vie privée";
_l.boost_c16 = "Le Bitcoin des réseaux sociaux";
_l.boost_c17 = "Résistant à la censure";
_l.boost_c18 = "Acheter des PKOIN de pair à pair";
_l.boost_c19 = "Pour acheter des Pocketcoins « de la main à la main », triez le fil par la catégorie « PKOIN/peer-to-peer »";
_l.boost_c20 = "CPM incroyablement bas :";
_l.boost_c21 = " le coût pour mille impressions est de 28 centimes !";
_l.boost_c22 = "Publicité en Pocketcoin : une audience à moindre coût";
_l.boost_c23 = "Vous cherchez à vous faire entendre sur Internet ?";
_l.boost_c24 = "Voulez-vous présenter votre contenu ou votre produit à un nouveau public dynamique pour moins cher que sur les grands réseaux publicitaires ?";
_l.boost_c25 = ""+appname+", le réseau social basé sur la blockchain, vient de lancer un moyen de promouvoir des contenus, y compris des vidéos.";
_l.boost_c26 = "Le coût d'une impression sur "+appname+" est bien plus faible que sur les réseaux publicitaires traditionnels.";
_l.boost_c27 = "Booster des publications sur "+appname+" est très simple : il vous suffit de quelques Pocketcoins, la cryptomonnaie native de "+appname+". Cliquez sur Boost sous la publication, saisissez le montant et votre publication passe en haut !";
_l.boost_c28 = ""+appname+" compte des millions de visiteurs, et ce n'est pas fini. Votre contenu sera vu !";
_l.boost_c29 = "Si vous êtes un auteur en devenir qui souhaite élargir son audience, le boost de publications sur "+appname+" peut vous être utile !";
_l.boost_c30 = "Si vous êtes un annonceur à la recherche d'une plateforme pour promouvoir votre produit, vous pouvez lancer rapidement votre publicité et obtenir des conversions.";
_l.boost_c31 = "Où acheter des PKOIN ?";
_l.boost_c32 = "Les PKOIN peuvent être achetés sur les sites suivants.";
_l.boost_c33 = "- ici, vous pouvez acheter des PKOIN contre d'autres cryptomonnaies.";
_l.boost_c45 = "CPM incroyablement bas";
_l.boost_c34 = "Acheter des PKOIN de pair à pair sur "+appname+"";
_l.boost_c35 = "Il est possible d'acheter des PKOIN auprès d'autres utilisateurs de "+appname+". Vous pouvez convenir des conditions d'achat/de vente en conversation privée avec le vendeur ou l'acheteur, que vous trouverez dans le fil sous la catégorie « PKOIN/peer-to-peer »";
_l.boost_c36 = "Comment commencer à faire de la publicité ?";
_l.boost_c37 = "Lancer des publicités sur "+appname+" est très simple. Pour cela, vous devez :";
_l.boost_c38 = "Préparer une publication publicitaire (vidéo, publication ou article)";
_l.boost_c39 = "Acheter des PKOIN";
_l.boost_c40 = "Déposer le montant de PKOIN nécessaire pour lancer la publicité";
_l.boost_c41 = "Cliquer sur l'icône en forme d'éclair en bas à droite de la publication choisie :";
_l.boost_c42 = "Saisir les PKOIN dans le champ « Montant » et cliquer sur « Envoyer » :";
_l.boost_c43 = "Félicitations ! Vous avez lancé une publicité sur "+appname+" !";
_l.boost_c44 = "Je veux lancer une publicité sur "+appname+" !";
_l.boost_c44_subject = "Bonjour, j'aimerais en savoir plus sur le lancement de mes publicités sur "+appname+".";
_l.reach = "Portée";
_l.reachAudience = "Audience approximative basée sur les statistiques de "+appname+" provenant de Semrush.com et Github.com";
_l.reachDescription = "Le coût moyen pour mille impressions (CPM) est de 28 centimes";
_l.boost_c46 = "Le coût pour mille impressions est de 28 centimes !";
_l.boost_c47 = "(le CPM moyen des grands réseaux dépasse 1 $)";
_l.boost_c48 = "(Comment est-ce calculé ?)";
_l.boost_c49 = ""+appname+" compte environ 1,68 MILLION de visiteurs uniques par mois. Un visiteur moyen vient 5 fois par mois, et le fil en anglais représente 10 % de "+appname+", donc le NOMBRE TOTAL DE VISITES MENSUELLES = 	840 000";
_l.boost_c50 = "ÉTAPES DU CALCUL DU CPM SUR "+appname+"";
_l.boost_c51 = "*Il y a AU TOTAL 1,68 MILLION de visiteurs uniques par mois (1,4 M sur "+appname+".com, 130 000 sur Android, 100 000 sur l'application de bureau)";
_l.boost_c52 = "ÉTAPE 1.";
_l.boost_c53 = "1,4 M sur "+appname+".com (données SEMRUSH)";
_l.boost_c54 = "ÉTAPE 2.";
_l.boost_c55 = "Le nombre d'utilisateurs Android actifs dépasse 130 000";
_l.boost_c56 = "ÉTAPE 3.";
_l.boost_c57 = "Le nombre d'utilisateurs de l'application de bureau dépasse 150 000";
_l.boost_c58 = "(Après chaque mise à jour, les utilisateurs mettent progressivement à jour l'application de bureau ; environ la moitié le fait dans la semaine qui suit)";
_l.boost_c59 = "*cette capture montre que 76 000 utilisateurs ont mis à jour leur application dès le premier jour ; seule la moitié des gens met à jour aussi vite, le nombre réel est donc d'environ 150 000 utilisateurs";
_l.boost_c60 = "ÉTAPE 4.";
_l.boost_c61 = "Calculer le CPM";
_l.boost_c62 = "Chaque publicité boostée dure 3 heures. Nous divisons donc le total des visites mensuelles par 30 jours puis par 8 pour obtenir des intervalles de 3 heures";
_l.boost_c63 = "Total des visites mensuelles = 8,4 millions";
_l.boost_c64 = "Total des visites quotidiennes = 28 000";
_l.boost_c65 = "Le fil en anglais représente 10 % de tous les visiteurs";
_l.boost_c66 = "Total des visites sur un intervalle de 3 heures = 28 000/8 = 3500 ";
_l.boost_c67 = "Le coût moyen d'une publicité est de 1 $ ";
_l.boost_c68 = "CPM = 0,28 $";
_l.boost_c69 = "28 centimes en moyenne, c'est un CPM très bas";
_l.boost_c70 = ""+appname+" est un réseau social décentralisé nouveau et en forte croissance, avec des millions d'utilisateurs et une publicité très rentable";
_l.boost_c71 = "Répartition par pays";
_l.boost_c72 = "Situation professionnelle";
_l.boost_c73 = "Audience";
_l.howtobuy_c1 = "Comment acheter";
_l.howtobuy_c2 = "PKOIN";
_l.howtobuy_c3 = "Plateformes d'échange de cryptomonnaies";
_l.howtobuy_c4 = "Acheter avec Visa/Mastercard";
_l.howtobuy_c5 = "Acheter des PKOIN avec des cryptomonnaies";
_l.howtobuy_c6 = "Acheter des PKOIN de pair à pair sur "+appname+"";
_l.howtobuy_c7 = "Acheter par carte en Russie/Ukraine/Biélorussie";
_l.howtobuy_c8 = "Ensuite, choisissez un profil approprié proposant l'achat/la vente de PKOIN. Soyez prudent lors des achats de la main à la main. Consultez les avis et n'échangez pas de gros montants.";
_l.howtobuy_c9 = "Ensuite, allez dans le chat et discutez des conditions de l'échange";
_l.howtobuy_c10 = "Trouver des vendeurs de pair à pair";
_l.howtobuy_c11 = "(sauf cartes de la Fédération de Russie)";
_l.howtobuy_c12 = "";
_l.howtobuy_c13 = "";
_l.howtobuy_c14 = "";
_l.howtobuy_c15 = "";
_l.howtobuy_c16 = "";
_l.howtobuy_c17 = "";
_l.howtobuy_c18 = "";
_l.howtobuy_c19 = "";
_l.howtobuy_c20 = "";
_l.gotopage = "Aller à la page";
_l.postedVideos = "Vidéos publiées";
_l.unPostedVideos = "Vidéos non publiées";
_l.videoIsPosting = "Publication en cours";
_l.noUnposted = "Aucune vidéo non publiée";
_l.sortByComments = "Commentaires";
_l.sortByRating = "Nombre de notes";
_l.noPosted = "Aucune vidéo publiée";
_l.unpostedFooter = "Les vidéos non publiées sont supprimées du serveur après 3 semaines d'attente";
_l.diagnosticsPage = "Diagnostic";
_l.startDiagnose = "Lancer le diagnostic";
_l.videoServerName = "URL du serveur";
_l.videoServerReachable = "Accessibilité";
_l.serversTestingProgress = "Progression du diagnostic :";
_l.videoServerVideo = "Infos vidéo";
_l.goToDiagnose = "Aller au diagnostic";
_l.connectingTo = "Connexion à";
_l.earnings = "Gains totaux";
_l.earnings2 = "Gains totaux";
_l.amountLottery = "Reçu de la loterie de la blockchain";
_l.amountDonation = "Dons reçus";
_l.amountTransfer = "Transferts effectués";
_l.endedCall = "Appel terminé";
_l.incomingCall = "Appel entrant";
_l.authHeading = "Authentification";
_l.terms = "Conditions générales de "+appname+"";
_l.sendToChat = "Envoyer un message dans le chat";
_l.createPost = "Créer et publier la publication";
_l.txtNotLinked = "La transaction ne sera pas liée à votre profil";
_l.anotherSupport = "Soutenir "+appname+" autrement";
_l.supportTicketSuccess = "Votre message a été envoyé et des bénévoles vous contacteront. Merci de vouloir soutenir "+appname+" !";
_l.commentBannedWarning = function(name){
	return name + " vous a bloqué. Vous ne pourrez pas commenter.";
};
_l.captchanotequal_angles = "Les segments du captcha doivent être tournés au bon angle";
_l.permissions_name_account = "Accès aux informations du compte";
_l.permissions_descriptions_account = "Cette autorisation permet à l'application d'accéder à l'adresse de votre compte et aux autres informations publiques associées à cette adresse";
_l.permissions_name_sign = "Signature numérique des données";
_l.permissions_descriptions_sign = "Vous autorisez la signature des données avec votre signature unique";
_l.permissions_name_payment = "Effectuer un paiement";
_l.permissions_descriptions_payment = "L'application demande l'autorisation d'effectuer un paiement en PKOIN";
_l.permissions_name_messaging = "Affichage de messages";
_l.permissions_descriptions_messaging = "Autorisez l'application à afficher un message d'information";
_l.permissions_name_mobilecamera = "Possibilité de téléverser une photo";
_l.permissions_descriptions_mobilecamera = "Autorisez l'application à ouvrir la galerie du mobile";
_l.permissions_name_zaddress = "Obtenir l'une des adresses du portefeuille";
_l.permissions_descriptions_zaddress = "Montre au widget l'une des adresses de votre portefeuille";
_l.permissions_name_notifications = "Recevoir des notifications";
_l.permissions_descriptions_notifications = "Autorisez l'application à vous envoyer des mises à jour et des alertes importantes";
_l.permissions_ask = "demande une autorisation";
_l.permissions_allow = "Autoriser";
_l.permissions_allow_once = "Autoriser une fois";
_l.permissions_forbid = "Refuser";
_l.permissions = "Autorisations";
_l.deleteapplication = "Supprimer l'application";
_l.installpplication = "Ouvrir l'application";
_l.complainapplication = "Signaler l'application";
_l.searchbyapplications = "Trouver une application";
_l.actions_reason_registration = "Pour terminer l'inscription, vous devez résoudre le captcha";
_l.actions_reason_balance = "Pour effectuer des actions sur "+appname+", vous devez résoudre le captcha";
_l.commonsubmitapplicationVideoSmall = "Envoyer";
_l.commonRequest_pl_notes = "Remarques : toute information complémentaire";
_l.commonRequest_pl_email = "E-mail de contact";
_l.commonRequest_caption = "Demande d'assistance";
_l.commonRequest_er_info = "Informations complémentaires requises";
_l.commonRequest_er_email = "Laissez un e-mail pour que nous puissions vous répondre";
_l.registration_e13114 = "Un problème est survenu avec votre inscription en raison d'une activité inhabituelle.";
_l.balance_e13114 = "Un problème est survenu lors de l'envoi de vos actions en raison d'une activité inhabituelle.";
_l.solutionbalance_1 = "Pour continuer à interagir avec "+appname+", vous pouvez recharger vous-même le solde de votre portefeuille";
_l.solutionbalance_2 = "ou contacter l'assistance";
_l.solutionbalance_3 = "Pour continuer à interagir avec "+appname+", vous pouvez contacter l'assistance";
_l.commonRequest_submitted = "Merci de nous avoir contactés, nous allons examiner votre demande";
_l.listeners = "Auditeurs";
_l.enterTheAmount = "Saisissez le montant en PKOIN pour voir la portée de votre publicité et la lancer";
_l.boost = "Boost";
_l.howToBuy = "Comment acheter des PKOIN";
_l.clearLocal = "Vider le stockage local";
_l.clearLocalActions = "Effacer les informations de transaction";
_l.clearLocalQuestion = "Voulez-vous vraiment vider le stockage local ?";
_l.registration_not_in_progress = "Votre inscription n'a pas encore commencé : vous devez soit résoudre le captcha, soit avoir des PKOIN sur l'adresse de votre compte";
_l.registration_not_in_progress_no_processing = "Votre inscription n'a pas encore commencé";
_l.registration_undefined_status= "Les informations d'inscription de votre compte ne sont pas disponibles, vous n'êtes peut-être pas connecté à Internet";
_l.registration_in_progress_transaction= "La transaction d'inscription du compte a été envoyée à la blockchain";
_l.registration_in_progress_hasUnspents= "La transaction d'inscription du compte sera bientôt envoyée à la blockchain";
_l.registration_in_progress_wait_unspents= "La transaction d'inscription du compte sera bientôt envoyée à la blockchain";
_l.rpending = "En attente";
_l.object_comment = "Commentaire";
_l.object_userInfo = "Informations utilisateur";
_l.object_upvoteShare = "Noter la publication";
_l.object_cScore = "Note du commentaire";
_l.object_subscribePrivate = "S'abonner avec notifications";
_l.object_subscribe = "S'abonner";
_l.object_unsubscribe = "Se désabonner";
_l.object_blocking = "Blocage";
_l.object_unblocking = "Déblocage";
_l.object_complainShare = "Plainte";
_l.object_modFlag = "Modération";
_l.object_contentBoost = "Boost de la publication";
_l.object_share = "Publication";
_l.object_accDel = "Suppression du compte";
_l.object_transaction = "Transaction";
_l.actions_noinputs_wallet = "Fonds insuffisants pour le transfert, compte tenu des frais";
_l.actions_noinputs = "Vous n'avez pas assez de pièces pour effectuer l'opération";
_l.actions_noinputs_on_address = "Vous n'avez pas assez de pièces sur les adresses sélectionnées pour effectuer l'opération";
_l.actions_noinputs_wait = "Vous n'avez pas assez de pièces pour effectuer l'opération maintenant. Veuillez patienter";
_l.actions_noinputs_wait_comment = "Vous n'avez pas assez de pièces actives pour publier un commentaire. Veuillez patienter";
_l.actions_totalAmountZero = "Le montant total de la transaction est nul ou inférieur aux frais";
_l.actions_totalAmountSmaller_amount = "Vous avez moins d'argent sur votre compte que ce que vous voulez envoyer.";
_l.actions_totalAmountSmaller_amount_wait = "Vous avez moins d'argent sur votre compte que ce que vous voulez envoyer. Veuillez patienter.";
_l.actions_totalAmountSmaller_amount_fee = "Vous avez moins d'argent sur votre compte que ce que vous voulez envoyer (frais compris).";
_l.actions_totalAmountSmaller_amount_fee_wait = "Vous avez moins d'argent sur votre compte que ce que vous voulez envoyer (frais compris). Veuillez patienter.";
_l.actions_rejected = "L'opération a échoué pour une raison inconnue";
_l.actions_rejectedFromNodes = "L'opération a été rejetée par le réseau";
_l.actions_waitConfirmation = "Opération en attente de confirmation";
_l.actions_completed = "Opération terminée";
_l.actions_alreadyCheckConfirmation = "L'opération a été envoyée à la blockchain";
_l.actions_alreadySent = "Opération déjà envoyée";
_l.actions_alreadySending = "L'opération est déjà en cours";
_l.actions_waitUserStatus = "L'opération sera envoyée au réseau une fois l'inscription de l'utilisateur terminée";
_l.actions_rejectedByTime = "Opération annulée en raison du délai dépassé";
_l.actions_resourses = "Les ressources n'ont pas été chargées";
_l.actions_alreadyCheck = "Le chargement des ressources a déjà été vérifié";
_l.actions_checkFail = "Les ressources ne sont pas encore chargées";
_l.actions_collision = "L'opération a été remplacée par une autre";
_l.actions_actionId = "Impossible d'annuler l'opération, identifiant manquant";
_l.actions_address = "Adresse manquante, utilisateur non inscrit";
_l.actions_noAddress = "Impossible d'annuler l'opération, adresse manquante";
_l.actions_userInteractive = "Action de l'utilisateur requise";
_l.actions_waitUserInteractive = "En attente d'une action de l'utilisateur";
_l.actions_rejectedByUser = "Annulé par l'utilisateur";
_l.actions_rejectedByUser_question = "Voulez-vous annuler l'opération ?";
_l.actions_no_pending_actions = "Aucune opération en attente";
_l.reason_changeUserName = "Désolé, le nom de compte choisi est déjà pris, veuillez en choisir un autre";
_l.info_actions_checkFail = "La publication sera envoyée dès que les ressources téléversées auront été traitées. Restez un moment dans l'application.";
_l.e28error = "Patientez avant d'effectuer une action";
_l.postInRelay2 = "Cette publication sera bientôt envoyée à la blockchain";
_l.err47 = "Erreur inconnue lors de la suppression de la publication";
_l.donatebalancenotenouth = "Vous n'avez pas assez de fonds pour faire un don";
_l.error408 = "Erreur, problème de connexion";
_l.watchstream = "Regarder le direct";
_l.anotherSiteHeader = "Autre site";
_l.openOriginal = "Ouvrir l'original";
_l.registration_blocked = _l.lockedaccount;
_l.horizontalSearchUsers = "Comptes";
_l.information = "Informations";
_l.sendcoins = "Envoyer des PKOIN";
_l.notificationsTurnOffQ = "Voulez-vous vraiment désactiver les notifications de cet utilisateur ?";
_l.showblockedusers = "Afficher les utilisateurs bloqués";
_l.cleartempactions = "Voulez-vous vraiment effacer les informations temporaires de l'application sur vos actions ?";
_l.captiontempactions = "Informations sur les transactions du stockage local";
_l.labeltempactions = "Nombre de transactions en attente";
_l.labeltempactionszero = "Aucune transaction en attente";
_l.deleteapplicationQuestion = "Voulez-vous vraiment supprimer l'application ?";
_l.deleteapplicationQuestionDevelop = "Voulez-vous vraiment supprimer l'application ? Pour les applications en mode développement, cette fonction simule seulement la désinstallation et réinitialise les paramètres jusqu'au prochain lancement.";
_l.application_settings = "Paramètres";
_l.application_close = "Revenir à " + appname;
_l.application_notexist = "Application introuvable ou serveur de l'application ne répondant pas";
_l.permissions_descriptions_chat = "Envoyer des messages dans le chat "+appname+", créer des groupes et des discussions";
_l.permissions_name_chat = "Chat " + appname;
_l.permissions_name_geolocation = "Accès à la position";
_l.permissions_descriptions_geolocation = "L'application demande l'autorisation d'accéder à votre position";
_l.permissions_name_externallink = "Ouverture de liens externes";
_l.permissions_descriptions_externallink = "L'application demande l'autorisation d'ouvrir des liens externes dans le navigateur ou d'autres applications";
_l.limits = "Limites";
_l.pay = "Payer";
_l.external_prepareTransaction = "Le paiement est en cours de traitement";
_l.external_paySucc_nocbpw = "Le paiement a été effectué, la fenêtre va se fermer";
_l.external_paySucc_fetch = "Le paiement a été effectué, nous transmettons les données au vendeur";
_l.external_paySucc_redirect = "Le paiement a été effectué, accédez à la page du vendeur";
_l.external_email_required = "Saisissez votre adresse e-mail";
_l.external_phone_required = "Saisissez votre numéro de téléphone";
_l.external_shipmentValueEmpty = "Les frais de livraison n'ont pas été calculés. Vérifiez que les champs sont correctement remplis ou contactez le vendeur";
_l.external_fill_shipment = "Remplissez tous les champs nécessaires au calcul des frais de livraison";
_l.anonymous_purchase = "Achat anonyme";
_l.anonymous_purchase_text = "Dans ce cas, le vendeur n'a pas besoin d'informations sur le compte et son titulaire pour le paiement, mais vous ne pouvez pas payer l'achat depuis l'adresse du compte, uniquement depuis les adresses du portefeuille.";
_l.phone="Téléphone";
_l.country="Pays";
_l.name="Nom";
_l.city="Ville";
_l.state="État/Région";
_l.zipcode="Code postal";
_l.external_loading = "Chargement";
_l.external_paySucc_details = "Le paiement a été effectué. Détails de la transaction";
_l.address2 = "Complément d'adresse";
_l.total = "Total";
_l.shipment = "Livraison";
_l.external_linkWillExpired = "Le lien de paiement expire";
_l.external_linkExpired = "Le lien de paiement a expiré";
_l.payLink = "Lien de paiement";
_l.authLink = "Lien d'autorisation";
_l.undefinedLink = "Lien inconnu";
_l.receiver_address = "Destinataire";
_l.authText = "Voulez-vous vraiment vous connecter au site via "+appname+" ?";
_l.authAllow = "Se connecter via "+appname;
_l.paymentsOnDevice = "Paiements";
_l.scanqrcode = "Scanner un code QR";
_l.free = "Gratuit";
_l.discount = "Réduction";
_l.tax = "Taxes";
_l.external_paylink_reg = "Vous avez ouvert le lien de paiement. Pour effectuer un paiement, vous devez vous inscrire ou vous connecter à votre compte.";
_l.payment_myaddress = "Ce lien de paiement indique votre utilisateur comme bénéficiaire. Sélectionnez un autre utilisateur pour l'utiliser";
_l.external_source = "D'où envoyer les PKOIN";
_l.external_tTotal = "Compte ou portefeuille";
_l.description = "Description";
_l.getqrcode = "Afficher le code QR";
_l.stakelogo = "WPKOIN";
_l.stakewrap = "Acheter via Metamask";
_l.pkoin_stake_info = "Connectez votre portefeuille à Metamask et achetez des WPKOIN";
_l.stakewpkoin = "Acheter des WPKOIN via Metamask";
_l.pkoin_application_info = "Acheter via la mini-application Swipelux";
_l.buyswipelux = "Acheter via Swipelux";
_l.buycard = "VISA/Mastercard";
_l.buyusers = "Acheter auprès d'utilisateurs";
_l.buyviacrypto = "Acheter avec des cryptomonnaies";
_l.installApplication = "Installez l'application "+appname+" pour téléverser des vidéos";
_l.boostlabel= "Comment faire de la publicité sur Bastyon";
_l.monetization_Period = "Période";
_l.monetization_Publications = "Publications";
_l.monetization_Ratings = "Notes";
_l.monetization_Comments = "Commentaires";
_l.monetization_Reward = "Récompense";
_l.monetization_start = "Lancer le programme de monétisation";
_l.monetization_Monetization = "Monétisation";
_l.monetization_enable = "Activer la monétisation";
_l.monetization_monetizationText = "Activez la monétisation et percevez des revenus chaque semaine";
_l.monetization_disable =  "Désactiver le programme";
_l.monetization_disable_question = "Voulez-vous vraiment arrêter de participer au programme de monétisation ?";
_l.monetization_exchange = "Échanger des Pocketcoins";
_l.monetization_buychat = "Contacter par chat";
_l.advertising_Period = "Période";
_l.advertising_Publications = "Publications";
_l.advertising_Boostscount = "Boosts";
_l.advertising_Ratings = "Notes";
_l.advertising_Comments = "Commentaires";
_l.advertising_Amount = "Dépensé";
_l.advertising_Advertising = "Publicité";
_l.advertising_exchange = "Acheter des cryptomonnaies";
_l.advertising_buychat = "Contacter par chat";
_l.advertising_Date = "Date";
_l.boosts_title = "Boosts";
_l.boosts_both = "Tous";
_l.boosts_sent = "Envoyés";
_l.boosts_received = "Reçus";
_l.boosts_sent_badge = "Envoyé";
_l.boosts_received_badge = "Reçu";
_l.boosts_date = "Date";
_l.boosts_direction = "Type";
_l.boosts_amount = "Montant";
_l.boosts_amount_loaded = "Montant chargé";
_l.boosts_participants = "Participants";
_l.boosts_booster = "Booster";
_l.boosts_contentauthor = "Auteur";
_l.boosts_content = "Contenu";
_l.boosts_transaction = "Transaction";
_l.boosts_height = "Hauteur";
_l.boosts_loaded = "Chargés";
_l.boosts_empty = "Aucun boost trouvé";
_l.boosts_error = "L'historique des boosts n'est pas disponible";
_l.boosts_loadmore = "Charger plus";
_l.boosts_me = "moi";
_l.boosts_show = "Afficher";
_l.boosts_txcopied = "Transaction copiée";
_l.boosts_summary_stat = function(p){ p = p || {}; return (p.count || 0) + ' boosts · ' + (p.amount || 0) + ' PKOIN' };
_l.grouping = "Regrouper par";
_l.groupBy_shares = "publications";
_l.groupBy_months = "mois";
_l.monetization_disable_time = "Vous serez retiré du programme de monétisation d'ici vingt minutes.";
_l.fastmessagemonetization = "en tant que don";
_l.sendcoinssm = "Envoyer";
_l.fastmessagedonate = "en tant que don";
_l.e130961donate = "Combien de PKOIN voulez-vous donner ?";
_l.statsWallet = "Informations du portefeuille";
_l.paymentsDate = "Date";
_l.paymentsValue = "Montant";
_l.paymentsInformation = "Description";
_l.showtransactionhistory = "Historique des transactions";
_l.transactionloading = "En attente de confirmation de la transaction";
_l.gototransaction = "Afficher la transaction";
_l.external_authlink_reg = "Vous avez ouvert le lien d'autorisation. Pour vous autoriser via "+appname+", vous devez vous inscrire ou vous connecter à votre compte.";
_l.external_sharelink_reg = "Vous avez ouvert le lien de partage. Pour partager, vous devez vous inscrire ou vous connecter à votre compte.";
_l.foreground_service_mediaPlayback_title = appname;
_l.foreground_service_mediaPlayback_text = ""+appname+" lit une vidéo";
_l.foreground_service_mediaUploading_title = appname;
_l.foreground_service_mediaUploading_text = ""+appname+" téléverse une vidéo";
_l.stateactionDefault = "Pour effectuer cette action, vous devez vous inscrire ou vous connecter à votre compte.";
_l.incomingVideoCall = "Appel vidéo entrant";
_l.incomingAudioCall = "Appel audio entrant";
_l.connecting = "Connexion";
_l.quotanow = function(v){
	return "Vous pouvez téléverser une vidéo d'une taille maximale de"
};
_l.jury = "Jury";
_l.juryQuestionPost = "Pouvez-vous confirmer que cette publication n'a pas sa place sur "+appname+" pour la raison suivante";
_l.juryQuestionComment = "Pouvez-vous confirmer que ce commentaire n'a pas sa place sur "+appname+" pour la raison suivante";
_l.juryQuestionUser = "Pouvez-vous confirmer que cet utilisateur enfreint les règles de "+appname+" pour la raison suivante";
_l.juryvote_success =  "Votre vote a été enregistré avec succès";
_l.juryconfirm = "Confirmez-vous votre décision ?";
_l.openin = "Ouvrir";
_l.monet_title = "Depuis le 9 septembre, un nouveau programme de publicité et de monétisation pour les blogueurs a été lancé sur Bastyon.";
_l.monet_subtitle = "En quoi consiste ce programme, comment fonctionne-t-il, qui peut y participer, comment les gains sont-ils calculés et à quoi sert-il ?";
_l.monet_howworks_title = "Comment ça marche :";
_l.monet_howworks_text_1 = "Les annonceurs font la promotion de leurs produits ou services sur Bastyon (les informations pour les annonceurs se trouvent sur bastyon.com/boost). Les publicités apparaissent dans le fil principal et sur les chaînes des auteurs. Tous les revenus du fil principal vont aux nœuds (pour savoir comment gagner avec un nœud simple : bastyon.com/easynode), tandis que les revenus des chaînes d'auteurs vont directement aux auteurs. Bastyon n'est pas une société et ne poursuit pas de but lucratif, donc tous les revenus publicitaires des chaînes reviennent aux auteurs.";
_l.monet_participation_title = "Qui participe et quels sont les paiements :";
_l.monet_participation_text_1 = "Dans un premier temps, la monétisation ne fonctionne que sur les chaînes d'auteurs vérifiées. Avec le temps, le programme s'étendra à d'autres chaînes très actives. Les auteurs peuvent désactiver la monétisation, ce qui supprime les publicités et les prive de leurs paiements.";
_l.monet_participation_text_2 = `Si vous avez une chaîne en dehors de Bastyon avec plus de 1 000 abonnés, vous pouvez écrire à <a href="mailto:support@bastyon.com">support@bastyon.com</a> pour demander la vérification.`;
_l.monet_participation_text_3 = "IMPORTANT : les auteurs gagnent proportionnellement à l'activité et au nombre de personnes sur leur chaîne. Plus il y a de commentaires et de notes, plus les paiements issus du fonds publicitaire sont élevés. Les auteurs disposent dans leurs paramètres d'un tableau de bord de monétisation où ils peuvent consulter l'historique de leurs paiements. Les paiements sont effectués à la fin de chaque semaine pour l'activité sur les publications des deux dernières semaines.";
_l.monet_monet_withdrawal_title = "Comment les auteurs peuvent retirer leurs gains (très simple) :";
_l.monet_monet_withdrawal_text_1 = `Les auteurs peuvent retirer leurs PKOIN via des plateformes comme Tapbit, ХТ, ou via des échanges de pair à pair en roubles, en dollars ou dans toute autre devise. Pour plus de commodité, certaines plateformes historiques sont directement accessibles dans le tableau de bord de monétisation. D'autres plateformes ayant au moins un an d'activité y seront ajoutées. Pour toute question sur les retraits, contactez l'assistance à <a href="mailto:support@bastyon.com">support@bastyon.com</a>`;
_l.monet_calculation_title = "Comment les paiements sont-ils calculés ?";
_l.monet_calculation_text1 = "Les gains varient selon le volume de publicité de la semaine et le montant payé par les annonceurs. L'argent des annonceurs est réparti entre les auteurs, mais le montant dépend des revenus publicitaires totaux et de l'activité sur la chaîne (notes et commentaires). La croissance de l'audience attire de nouveaux annonceurs, ce qui augmente les gains. Les chaînes actives peuvent gagner l'équivalent de 50 à 75 $ par semaine, voire plus.";
_l.monet_increaseearnings_title = "Comment augmenter ses gains :";
_l.monet_increaseearnings_text1 = "Créez davantage de contenu";
_l.monet_increaseearnings_text2 = "Invitez plus de personnes à participer";
_l.monet_increaseearnings_text3 = "La durée des vidéos n'a pas d'importance sur Bastyon car les publicités n'interrompent pas la vidéo : c'est l'engagement sous les publications qui compte";
_l.monet_footer_1 = "Économie interne de Bastyon - Monétisation - Pocketcoin (PKOIN)";
_l.monet_signup = "INSCRIVEZ-VOUS SUR BASTYON";
_l.monet_footer_2 = `*Écrivez à <a href="mailto:support@bastyon.com">support@bastyon.com</a> pour commencer à gagner grâce à la publicité sur votre chaîne`;
_l.miniApp_publishMessage = "Publication de la mini-application : {0}";
_l.miniApp_requiredMessage = "Ce champ ne peut pas être vide";
_l.miniApp_deleteConfirmation = "Voulez-vous vraiment supprimer cette mini-application ?";
_l.miniApp_publishConfirmation = "Voulez-vous vraiment publier l'application ? Si vous n'êtes pas sur le réseau de test, des frais de 50 seront prélevés.";
_l.miniApp_yesButton = "Oui";
_l.miniApp_noButton = "Annuler";
_l.miniApp_deleteSuccessMessage = "La mini-application a été supprimée avec succès.";
_l.miniApp_deleteErrorMessage = "Impossible de supprimer l'application. Veuillez réessayer plus tard.";
_l.miniApp_loadErrorMessage = "Impossible de modifier l'application. Veuillez réessayer plus tard.";
_l.miniApp_installErrorMessage = "Impossible d'installer l'application. Veuillez réessayer.";
_l.miniApp_editErrorMessage = "Impossible de modifier l'application. Veuillez réessayer plus tard.";
_l.miniApp_guideLink = "Guide des mini-applications Bastyon";
_l.miniApp_supportLinkText = "Des questions ou des idées d'amélioration ? Contactez l'assistance";
_l.miniApp_iconAltText = "Icône de l'application";
_l.miniApp_iconErrorMessage = "Impossible de charger l'icône. Vérifiez la disponibilité du fichier sur votre domaine :";
_l.miniApp_publishButton = "Publier";
_l.miniApp_editButton = "Modifier";
_l.miniApp_deleteButton = "Supprimer";
_l.miniApp_authorLabel = "Auteur";
_l.miniApp_permissionsLabel = "Autorisations";
_l.miniApp_idLabel = "ID";
_l.miniApp_linkLabel = "Lien de l'application";
_l.miniApp_goToAppLinkText = "Aller à l'application";
_l.miniApp_descriptionUnavailable = "Description indisponible";
_l.miniApp_editTitle = "Modifier l'application <%= id %>";
_l.miniApp_saveButton = "Enregistrer";
_l.miniApp_cancelButton = "Annuler";
_l.miniApp_importManifestError = "Erreur d'import du manifeste. Assurez-vous que le fichier b_manifest.json existe et contient un JSON valide. Vérifiez que le serveur envoie les en-têtes CORS nécessaires et que la connexion HTTPS n'est pas bloquée par un certificat non fiable (approuvez-le dans le navigateur si nécessaire).";
_l.miniApp_importIconError = "Erreur d'import de l'icône de l'application. Cela peut se produire si le fichier `b_icon.png` est absent ou inaccessible.";
_l.miniApp_brokenManifestError = "Erreur d'import du manifeste depuis le domaine indiqué. Vérifiez l'existence et la validité du fichier `b_manifest.json`. Si HTTPS est utilisé avec un certificat auto-signé, autorisez l'accès dans votre navigateur.";
_l.miniApp_brokenPermissionsError = "Autorisations non valides ou vides dans le manifeste. Assurez-vous que les autorisations sont correctement indiquées.";
_l.miniApp_missingIdError = "L'ID de l'application est absent du manifeste. Le champ `id` doit être renseigné.";
_l.miniApp_missingNameError = "Le nom de l'application est absent du manifeste. Le champ `name` doit être renseigné.";
_l.miniApp_missingVersionError = "La version de l'application est absente du manifeste. Le champ `version` doit être renseigné.";
_l.miniApp_missingDescriptionEnError = "La description de l'application en anglais est absente de la section `descriptions`.";
_l.miniApp_missingScopeError = "L'information `scope` est absente du manifeste. Assurez-vous qu'une valeur `scope` valide est fournie.";
_l.miniApp_missingDescriptionError = "La description de l'application est absente du fichier `b_manifest`. Assurez-vous que le champ `descriptions['en']` ou `description` est renseigné.";
_l.miniApp_brokenAuthorError = "Auteur de l'application non valide. Cela peut être dû à un champ `author` absent ou mal formaté (une adresse Base58 est attendue).";
_l.miniApp_discrepancyIdError = "L'ID de l'application dans le manifeste ne correspond pas à l'ID indiqué lors de l'installation.";
_l.miniApp_discrepancyDevelopError = "Le statut de développement (`develop`) du manifeste ne correspond pas à celui de l'application indiquée.";
_l.miniApp_discrepancyAuthorError = "Ajout impossible : l'auteur de l'application indiqué dans le manifeste ne correspond pas à votre adresse. Vous ne pouvez pas ajouter des applications qui ne vous appartiennent pas.";
_l.miniApp_conflictIdAlreadyExistsError = "Conflit : une application avec cet ID existe déjà. Vérifiez l'ID de la nouvelle application ou supprimez l'application existante.";
_l.miniApp_permissionDeniedError = "L'utilisateur a refusé l'autorisation demandée par l'application.";
_l.miniApp_permissionMissingError = "L'une des autorisations demandées par l'application est absente du manifeste.";
_l.miniApp_permissionsEmptyError = "La liste des autorisations demandées est vide. L'application doit demander au moins une autorisation.";
_l.miniApp_parametersMissingError = "Un ou plusieurs paramètres obligatoires sont manquants lors de l'exécution de l'action.";
_l.miniApp_locationNotAvailableError = "Impossible de récupérer les données de localisation. Vérifiez les autorisations ou l'état du GPS.";
_l.miniApp_messageEmptyError = "Le message d'alerte est vide. Assurez-vous qu'un texte est fourni.";
_l.miniApp_versionError = "La version du manifeste ne correspond pas à la version installée de l'application.";
_l.miniApp_userAuthorizedError = "L'utilisateur est déjà autorisé. L'inscription est impossible.";
_l.miniApp_imagesMax10Error = "Le nombre maximal d'images téléversées (10) a été dépassé.";
_l.miniApp_brokenZAddressesError = "Impossible de récupérer les adresses z de l'utilisateur. Les données sont peut-être manquantes ou non valides.";
_l.miniApp_mobileCameraNotSupportedError = "La caméra de l'appareil mobile n'est pas prise en charge par l'application.";
_l.miniApp_mobileCameraCancelError = "L'utilisateur a annulé l'accès à la caméra ou le téléversement de l'image.";
_l.miniApp_permissionNotExistInManifestError = "L'autorisation demandée est absente du manifeste de l'application.";
_l.miniApp_permissionRequestError = "Erreur lors de la demande d'autorisation à l'utilisateur. Assurez-vous que l'autorisation est correctement indiquée.";
_l.miniApp_errorCodeAppDataError = "Erreur dans les données du stockage local de l'application.";
_l.miniApp_missingApplicationError = "L'application est introuvable dans la liste des applications installées. Elle a peut-être été supprimée ou l'ID est incorrect.";
_l.miniApp_publishSuccessMessage = "L'application a été publiée avec succès.";
_l.miniApp_publishErrorMessage = "Une erreur est survenue lors de la publication de l'application.";
_l.miniApp_publishOnlyTestNetworkMessage = "Pour le moment, la publication n'est disponible que sur le réseau de test.";
_l.miniApp_localhostScopeWarningMessage = "La publication d'une application avec un scope local ('localhost') n'est pas autorisée. Veuillez modifier le scope dans l'onglet d'édition.";
_l.miniApp_createTitle = "Créer une nouvelle mini-application";
_l.miniApp_tagsRequiredMessage = "Veuillez indiquer des tags pour l'application.";
_l.miniApp_scopeInvalidMessage = "Ce champ doit être au format d'un sous-domaine, par exemple app.pocketnet. Utilisez uniquement des lettres minuscules, des chiffres et des points, sans les préfixes https:// ou www.";
_l.miniApp_idInvalidMessage = "L'ID doit être au format d'un nom de domaine, par exemple app.pocketnet ou example.app. Utilisez uniquement des lettres minuscules et au moins un point.";
_l.miniApp_extendedTags = "Le nombre maximal de tags que vous pouvez ajouter est de ";
_l.miniApp_devModeLabel = "Environnement de développement :";
_l.miniApp_documentationButtonLabel = "Documentation";
_l.miniApp_createButtonLabel = "Créer une mini-application";
_l.miniApp_myAppsButtonLabel = "Créées par moi";
_l.miniApp_appsButtonLabel = "Applications";
_l.miniApp_heroTitle = "Une plateforme puissante pour vos projets";
_l.miniApp_heroSubtitle = "Développez des applications et exploitez toutes les possibilités de Bastyon pour votre activité.";
_l.miniApp_heroCtaButton = "Commencer";
_l.miniApp_featuresTitle = "Fonctionnalités";
_l.miniApp_featureDecentralizedTitle = "Décentralisé";
_l.miniApp_featureDecentralizedDescription = "Créez des applications sans contrôle centralisé, en gardant vos données en sécurité.";
_l.miniApp_featureScalableTitle = "Évolutif";
_l.miniApp_featureScalableDescription = "Profitez du réseau de Bastyon pour des applications de toute taille.";
_l.miniApp_featureCryptoIntegrationTitle = "Intégration facile des paiements en cryptomonnaie";
_l.miniApp_featureCryptoIntegrationDescription = "Intégrez des paiements en cryptomonnaie à vos applications pour le confort des utilisateurs.";
_l.miniApp_featureApiAccessTitle = "Accès complet à l'API de Bastyon";
_l.miniApp_featureApiAccessDescription = "Utilisez toutes les fonctionnalités de l'API de Bastyon pour créer des applications fonctionnelles et innovantes.";
_l.miniApp_createDescription = "Assurez-vous que toutes les données correspondent aux champs indiqués dans le fichier b_manifest.json de l'application. Toute divergence peut provoquer des erreurs lors de l'installation.";
_l.miniApp_instructionsTitle = "Instructions de déploiement";
_l.miniApp_instructionsIntro = "Déployer l'application est assez simple. Vous devez fournir deux fichiers : b_manifest et b_icon.";
_l.miniApp_instructionsFilesNeeded = "Pour réussir le déploiement, assurez-vous que les fichiers suivants sont disponibles sur votre domaine :";
_l.miniApp_instructionsManifest = "b_manifest : fichier JSON contenant des informations sur l'application.";
_l.miniApp_instructionsIcon = "b_icon.png : l'icône de l'application au format PNG, disponible à l'URL https://[scope]/b_icon.png, où scope est votre domaine.";
_l.miniApp_instructionsManifestExample = "Exemple de contenu du fichier b_manifest :";
_l.miniApp_instructionsDataMatch =
  "Important : toutes les données du formulaire (id, name) doivent correspondre exactement aux champs du fichier b_manifest. " +
  "Le champ 'author' doit correspondre à l'utilisateur actuel qui ajoute l'application. " +
  "Si le champ 'Domaine de développement' est rempli, le champ 'Domaine' peut rester vide lors de la création. " +
  "L'application peut d'abord fonctionner dans l'environnement de test sur le domaine de développement, et le domaine principal peut être indiqué plus tard via l'onglet d'édition pour la publication. " +
  "'Domaine' désigne l'adresse principale accessible à tous les utilisateurs, tandis que 'Domaine de développement' sert aux tests (par ex. 'localhost:3333' ou 'test.example.com'). " +
  "Le domaine de développement n'est accessible qu'à l'auteur de l'application, et le changement d'environnement s'effectue dans l'application elle-même.";
_l.miniApp_instructionsDevMode = "Après l'enregistrement, votre mini-application sera créée en mode développement (dev mode). Elle ne sera disponible que pour vous, localement. Vous pourrez ensuite la publier pour tous les utilisateurs via le panneau de gestion.";
_l.miniApp_nameLabel = "Nom";
_l.miniApp_scopeLabel = "Domaine";
_l.miniApp_tScopeLabel = "Domaine de développement";
_l.miniApp_tagsLabel = "Tags";
_l.miniApp_idInstructions = "L'ID doit être au format d'un nom de domaine, comme app.pocketnet ou example.app. Utilisez uniquement des lettres minuscules et au moins un point.";
_l.miniApp_nameInstructions = "Saisissez un nom clair que les utilisateurs verront (par ex. Demo).";
_l.miniApp_scopeDescription =
  "Saisissez le nom de domaine sans protocole (par ex. 'example.com'). " +
  "L'application doit prendre en charge le protocole HTTPS : si vous saisissez 'example.com', " +
  "elle doit être accessible à l'adresse https://example.com. " +
  "N'incluez pas 'https://' ni d'autres préfixes. Seuls les lettres minuscules, " +
  "les chiffres et les points sont autorisés (par ex. 'my-app.bastyonapps.com' ou 'subdomain.example.com').";
_l.miniApp_tScopeInstructions =
  "Ce domaine sert uniquement au développement ou aux tests de votre application. " +
  "Indiquez un domaine local (par ex. 'localhost:8080') ou un domaine de test (par ex. 'test.example.com'). " +
  "Si vous voulez d'abord tester l'application, utilisez uniquement le 'Domaine de développement'. " +
  "Le domaine principal pourra être indiqué plus tard pour publier l'application.";
_l.miniApp_iconInstructions = "Dans la section affichage, vous configurez l'apparence de votre application. L'icône est chargée automatiquement depuis l'URL https://[scope]/b_icon.png, où [scope] est le domaine de votre application (par ex. example.com). Assurez-vous que le fichier b_icon.png est accessible et au format PNG.";
_l.miniApp_iconLabelInstructions = "Après avoir saisi le domaine, vous verrez un aperçu de l'icône chargée. Si le fichier est absent ou si le domaine est incorrect, un message d'erreur s'affichera.";
_l.miniApp_showManifestButton = "Afficher le contenu de b_manifest";
_l.miniApp_tagsCountRequirement = "Ajoutez 2 tags qui décrivent votre application.";
_l.miniApp_tagsInstructions = "Les tags aident les utilisateurs à trouver votre application.";
_l.miniApp_placeholderId = "Par exemple : example.app";
_l.miniApp_placeholderName = "Par exemple : My Super App";
_l.miniApp_placeholderScope = "Par exemple : demo.bastyonapps.com";
_l.miniApp_placeholderTScope = "Par exemple : localhost:8080 ou test.example.com";
_l.miniApp_infoSectionTitle = "Informations";
_l.miniApp_deploymentSectionTitle = "Déploiement";
_l.miniApp_displaySectionTitle = "Affichage";
_l.miniApp_editAppTitle = "Modifier la mini-application";
_l.miniApp_editDescriptionIntro = "Toutes les données indiquées dans le formulaire (id, name) doivent correspondre aux champs du manifeste (b_manifest).";
_l.miniApp_editDescriptionAuthor = "Le champ 'author' du manifeste doit correspondre à l'utilisateur qui ajoute cette application (le propriétaire).";
_l.miniApp_editDescriptionScope = "Si vous modifiez le scope (domaine), assurez-vous que le nouveau domaine contient les fichiers requis : b_manifest (un fichier JSON décrivant l'application) et b_icon.png (l'icône PNG), disponible à l'adresse https://[scope]/b_icon.png.";
_l.miniApp_editDescriptionId = "Modifier l'id revient à créer une nouvelle mini-application ; il vaut donc généralement mieux ne pas le changer si vous mettez simplement à jour une application existante.";
_l.miniApp_editDescriptionOutro = "Après avoir effectué les modifications nécessaires, n'oubliez pas de cliquer sur Enregistrer pour que les informations mises à jour prennent effet.";
_l.miniApp_tagsEditInstruction = "Vous pouvez ajouter ou supprimer des tags.";
_l.miniApp_fieldsLockedInfo = "L'ID, le nom et le scope de votre application ne peuvent pas être modifiés après sa création.";
_l.juryCaptionPost = "La publication enfreint-elle les règles de publication de contenu sur "+appname+" ?";
_l.juryCaptionComment = "Le commentaire enfreint-il les règles de publication de contenu sur "+appname+" ?";
_l.juryCaptionUser = "Le profil de l'utilisateur enfreint-il les règles de publication de contenu sur "+appname+" ?";
_l.juryCaptionCollection = "La collection (titre, description, couverture) enfreint-elle les règles de publication de contenu sur "+appname+" ?";
_l.juryCaptionReason = "Raison";
_l.juryYes = "Oui, elle les enfreint";
_l.juryNo = "Non, elle ne les enfreint pas";
_l.shareOnBastyon = "Partager sur Bastyon";
_l.askdefaultapplink = function(appname){ return "Ouvrir ce lien dans la mini-application "+ appname + " ?"};
_l.nomoreaskdefaultapplink = function({name, scope}){ return "Toujours ouvrir les liens "+scope+" dans la mini-application "+name+""};
_l.redirectminiappsuccess = function(appname){ return "Lien ouvert dans la mini-application "+appname+""};
_l.chat = "Chat";
_l.emptyntime1 = "Veuillez choisir la date et l'heure de publication";
_l.postWaitDelayed = function(time){
    return "La publication sera publiée : " + time
};
_l.fordevelopers = "Pour les développeurs";
_l.interfacemobilelayoutmenu = "Bouton de chat au milieu de la barre inférieure";
_l.interface = "Interface";
_l.chatenabled = "Activer le chat";
_l.managePaidSubscription = "Abonnements privilégiés";
_l.paidsubscription_condition_caption = "Configuration des abonnements privilégiés";
_l.paidsubscription_condition_text = "Définissez le prix d'un abonnement privilégié à votre chaîne : vous pourrez alors publier des contenus réservés aux utilisateurs qui vous soutiennent. Pour qu'un utilisateur voie votre contenu, le montant de ses transferts sur la période doit être égal ou supérieur au niveau que vous avez fixé.";
_l.paidsubscription_condition_hyvalue = "Sur six mois";
_l.paidsubscription_condition_yvalue = "Par an";
_l.paidsubscription_condition_value = "Coût mensuel de l'abonnement privilégié";
_l.paidsubscription_removecondition = "Désactiver les abonnements privilégiés";
_l.paidsubscription_removecondition_question = "Voulez-vous vraiment désactiver les abonnements privilégiés ? Vos contenus seront alors visibles par tous les utilisateurs.";
_l.paidsubscription_addcondition = "Ajouter des conditions d'abonnement privilégié";
_l.paidsubscription_updatecondition = "Mettre à jour les conditions de votre abonnement privilégié";
_l.paidsubscription_updatecondition_question = "Voulez-vous vraiment modifier le prix de votre abonnement privilégié ? Les conditions d'accès aux publications seront également mises à jour pour les contenus précédents.";
_l.paidsubscription_updatecondition_success = "Les conditions de votre abonnement privilégié ont été modifiées. Les changements seront appliqués aux utilisateurs sous un jour.";
_l.visibleonlytopaid = "Visible uniquement par les abonnés privilégiés";
_l.sharevisibility_paid = "Pour les abonnés privilégiés";
_l.sharevisibilitylabel_paid_post = "L'auteur a décidé de rendre cette <b>publication</b> visible uniquement par les abonnés privilégiés";
_l.sharevisibilitylabel_paid_article = "L'auteur a décidé de rendre cet <b>article</b> visible uniquement par les abonnés privilégiés";
_l.sharevisibilitylabel_paid_video = "L'auteur a décidé de rendre cette <b>vidéo</b> visible uniquement par les abonnés privilégiés";
_l.sharevisibilitylabel_paid_error = "Nous n'avons pas pu vérifier que vous disposez d'un abonnement premium. Veuillez réessayer plus tard.";
_l.getpaidsubscription = "Devenir abonné privilégié";
_l.getpaidsubscription2 = "Devenir abonné privilégié";
_l.getpaidsubscription3 = "Demander un abonnement privilégié";
_l.getpaidsubscription_text = "Prenez un abonnement privilégié et accédez à toutes les publications de l'auteur !";
_l.getpaidsubscription_acceptQuestion = "Confirmez-vous les actions suivantes : ";
_l.getpaidsubscription_acceptQuestion_paid = function({name, amount}){return 'Transfert à <b>' + name +'</b> de <b>' + amount +' PKOIN</b> pour l\'abonnement privilégié' };
_l.getpaidsubscription_acceptQuestion_subscribe = function({name}){return "S'abonner à <b>" + name +'</b>'};
_l.getpaidsubscription_option_1m = "Acheter un abonnement d'1 mois";
_l.getpaidsubscription_option_6m = "Acheter un abonnement de 6 mois";
_l.getpaidsubscription_option_1y = "Acheter un abonnement d'1 an";
_l.getpaidsubscription_option_1m_p = "Payer le complément pour un abonnement d'1 mois";
_l.getpaidsubscription_option_6m_p = "Payer le complément pour un abonnement de 6 mois";
_l.getpaidsubscription_option_1y_p = "Payer le complément pour un abonnement d'1 an";
_l.getpaidsubscription_select_option = "Veuillez choisir l'option de paiement de l'abonnement premium";
_l.getpaidsubscription_option_p = function(date){ return "L'abonnement prendra fin le " + date + ", mais pourra être renouvelé plus tard pour moins cher." };
_l.getPaidSubscription = "Abonnement privilégié";
_l.fastmessagepaidsubscription = "en paiement d'un abonnement privilégié";
_l.getpaidsubscription_paidsuccess_text = "Votre abonnement privilégié est déjà payé.";
_l.getpaidsubscription_paidsuccess_until= function(date){ return "Abonnement payé jusqu'au <b>" + date + '</b>'};
_l.getpaidsubscription_paidsuccess_text_relation="L'accès aux contenus pour abonnés privilégiés est déjà payé, il ne reste plus qu'à vous abonner à l'auteur";
_l.fastmessagepaidsubscription_share = "Publication pour abonnés privilégiés";
_l.uploadwallpappercaption = "Définir la couverture du profil";
_l.uploadwallpapperuploadTitle = "Choisissez une image de couverture pour le profil";
_l.uploadwallpapperGiferror = "Les images GIF ne sont pas autorisées";
_l.setcoverquestion = "Voulez-vous enregistrer cette photo comme couverture de votre profil ?";
_l.setcoverquestionyes = "Oui, définir la couverture";
_l.setcoverquestionno = "Non";
_l.hiddenCommentLabelLink = "Le commentaire a été masqué car il contient un lien vers une ressource externe provenant d'un utilisateur dont la note est insuffisante.";
_l.getpaidsubscription_paidsuccess_removecodition_text = "L'auteur a désactivé la possibilité d'accorder un accès privilégié. Les contenus publiés auparavant pour les abonnés privilégiés sont donc accessibles gratuitement à tous.";
_l.buypkoinexchnage="Acheter auprès d'un bureau de change";
_l.buypkoinexchnage_info="Acheter de pair à pair via une mini-application";
_l.buypkoinexchnagep2p="Acheter via PKOIN Exchange";
_l.appsdisclaimer="Chaque application est déjà un portefeuille PKOIN. Sauf celle pour iOS";
_l.fortaBannerDesc = "Téléchargez la nouvelle messagerie Forta Chat pour Android ou visitez le site pour en savoir plus.";
_l.downloadapk = "Télécharger l'APK";
_l.fortaVisitSite = "Visiter forta.chat";
_l.gotobarteron = "Aller sur Barteron";
_l.gotofortachat = "Aller sur Forta Chat";
_l.windows7 = "Télécharger pour Windows 7";
_l.miniapps = "Mini-applications";
_l.sysmodbas="Système de modération des contenus sur Bastyon";
_l.torHintStateRunning = "Le module TOR fonctionne";
_l.torHintStateStarting = "Le module TOR démarre";
_l.imageerror = "Une erreur est survenue lors du chargement des images. Veuillez réessayer";
_l.ratingsAndReviews = "Notes et avis";
_l.allReviews = "Tous les avis";
_l.rateApp = "Noter";
_l.writeComment = "Écrire un commentaire";
_l.yourRating = "Votre note";
_l.youAlreadyRated = "Vous avez déjà noté cette application";
_l.noReviewsYet = "Aucun avis pour l'instant. Soyez le premier à laisser un commentaire !";
_l.noRatingsYet = "Aucune note pour l'instant";
_l.beFirstToRate = "Installez l'application et soyez le premier à la noter !";
_l.commentMinLength = "Le commentaire doit contenir au moins 10 caractères";
_l.commentSent = "Commentaire envoyé ! Il apparaîtra peu après son traitement dans la blockchain.";
_l.ratingSent = "Note envoyée ! Elle apparaîtra peu après son traitement dans la blockchain.";
_l.commentSendError = "Erreur lors de l'envoi du commentaire. Veuillez réessayer.";
_l.tellAboutExperience = "Parlez-nous de votre expérience avec l'application...";
_l.yourComment = "Votre commentaire";
_l.submitReview = "Envoyer l'avis";
_l.cancel = "Annuler";
_l.all = "Tout";
_l.howDoYouRate = "Comment notez-vous cette application ?";
_l.clickStarToRate = "Cliquez sur une étoile pour noter";
_l.outOf5 = "sur 5";
_l.ratings = "notes";
_l.submitRating = "Noter";
_l.mustInstallToComment = "Vous devez installer l'application avant de rédiger un avis";
_l.mustInstallToRate = "Vous devez installer l'application avant de la noter";
_l.reviewsAndRatingsMenu = "Avis et notes";
_l.rateAppPromptMessage = "Vous aimez cette application ? Prenez un instant pour la noter !";
_l.rateAppButton = "Noter l'application";
