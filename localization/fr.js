if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.fr = {};
var appname = ((app || {}).meta || {}).fullName || "Pocketnet"
var ____loclib = loclib.fr;

//time

____loclib.fewseconds = "Il y a quelques secondes";	
____loclib.oneminute = "Il y a une minute";	

____loclib.minutes = function(v){
return v + " il y a quelques minutes"
}

____loclib.tenminutes = "Il y a dix minutes";	
____loclib.halfanhour = "Il y a une heure";	
____loclib.anhour = "Il y a une heure";	
____loclib.today = "Aujourd'hui à";	

//authorization

____loclib.id0 = "Connectez-vous à un compte existant";	
____loclib.id1 = "Si vous êtes déjà inscrit, veuillez vous connecter";	
____loclib.loadqrcode = "Télécharger le code QR";
____loclib.stay = "Rester connecté";
____loclib.signin = "Se connecter";
____loclib.orcreate = "Ou créez un nouveau compte";
____loclib.createnew = "Créer un nouveau compte";
____loclib.staysafe = "Ce n'est pas sur. Voulez-vous continuer?";
____loclib.or = "ou";

// Register a New Account
____loclib.id71 = "Créer un nouveau compte";
____loclib.id72 = "Déjà membre? Se connecter";

____loclib.rtip1 = "Prenez note de votre clé de connexion privée!";
____loclib.rtip2 = function(mobile){
var h = "Voici votre mot de passe de clé privée, notez-le et assurez-vous de sauvegarder votre code QR. Et assurez-vous de ne pas le perdre. Nous ne stockons pas vos données personnelles. La clé privée ne peut pas être récupérée en cas de perte!" 

return h 
}

____loclib.generatepkey = "Générer la clé privée";
____loclib.rtip3 = "Notez cette clé de connexion et enregistrez-la sous forme de code QR. Nous ne stockons pas vos données personnelles. Il ne peut pas être restauré s'il est perdu!";
____loclib.saveqrcode = "Enregistrer le code Qr" 
____loclib.copyprivkey = "Copier la clé privée"
____loclib.rcontinue = "Continuer"
____loclib.idle = "Inactif depuis un certain temps"
____loclib.congratulations = 'Toutes nos félicitations! Tu es dans <span class="pnlabel">'+appname+'</span>'
____loclib.creatingpreloader = 'La création du compte'
____loclib.removepaste = "Nous avons supprimé l'option coller pour cette entrée."
____loclib.filedamaged = "Le fichier ne contient pas de clé privée valide"
____loclib.keysnotmatch = 'La clé de connexion privée ne correspond pas'
____loclib.confirmkey = "Entrez votre clé de connexion privée ou téléchargez le code QR de l'étape précédente"
____loclib.successfullycopied = "La clé a été copiée avec succès"
____loclib.urlsuccesscopied = "Lien copié avec succès"

____loclib.confirmkeyLabel = "Veuillez confirmer votre clé privée. Saisissez la clé dans le formulaire ou <b>téléchargez le code QR</b>"
____loclib.repeatetocreate = "Répétez pour créer à nouveau la clé privée"
____loclib.confirmcreate = "Créer un compte"


//user activation

____loclib.useractivation = "Activation utilisateur";	
____loclib.wesentmoney = "Nous vous avons envoyé quelques pièces pour vous inscrire";	
____loclib.wesentmoneym = "Nous vous avons déjà envoyé plusieurs pièces pour inscription.";


____loclib.wesentmoneydelay = "Le processus prend plus de temps que d'habitude, veuillez patienter un peu plus longtemps";

____loclib.funetworkproblems = "Il y a quelques problémes avec la connexion. Merci d'essayer plus tard";

____loclib.pleasewait = "S'il vous plaît, attendez";	
____loclib.next = "Suivant";	
____loclib.welcometopocketnet = "Bienvenue sur "+appname+"";	
____loclib.continue = "continuer";	

//user page

____loclib.rstate = "Réputation";	
____loclib.rprofile = "Profil";	
____loclib.rsettings = "Réglages";	
____loclib.rwallet = 'Portefeuille';	
____loclib.raccounts = 'Comptes';	
____loclib.rsystem = 'Système';
____loclib.rconnection = 'Connexion';
____loclib.pnetAddress = "Adresse "+appname+"";	
____loclib.profile = 'Profil';	
____loclib.signout = 'Déconnexion';

//send

____loclib.postlabel = "Don pour poste";	
____loclib.donationlabel = "Don";	
____loclib.donationwel = "Si vous souhaitez remercier l'auteur, vous pouvez utiliser une transaction "+appname+"";
____loclib.donationwela = "Transaction "+appname+"";	
____loclib.donationwelan = "Ou vous pouvez utiliser un autre système de paiement cryptè";	
____loclib.successfullycopiedaddress = "Adresse copiée avec succès";	

//wallet

____loclib.wrecieve = "Recevoir des pièces en partageant l'adresse";	
____loclib.wcopyshare = "Copier et partager l'adresse:";	
____loclib.wqrcode = "code Qr";		
____loclib.wcopeaddress = "Copier l'adresse";	
____loclib.wcreatelink = "Ou créer un lien pour votre paiement";	
____loclib.required = "Requis";	
____loclib.wgetlink = "Obtenir le lien";	
____loclib.waddresses = "Adresses";	
____loclib.waddress = "Adress";	
____loclib.wbalance = "Solde";	
____loclib.wpercente = "Pour cent";	
____loclib.waddaddress = "Explorer une nouvelle adresse Google Wallet";	
____loclib.wrecieve = "Recevoir";	
____loclib.wrecieveon = "Recevoir sur";	
____loclib.wcopyshareorcreate = "Copier et partager l'adresse ou créer un lien de paiement";
____loclib.wdgetlink = "Obtenir le lien";	
____loclib.wdqrcode = "code Qr";
____loclib.wdcopyaddress = "Copie l'Adresse";	
____loclib.wdpleasefill = "Veuillez remplir ces champs";
____loclib.wduseqr = "Utilisez ce code QR pour recevoir des fonds";	
____loclib.wdaddress = "Adresse";
____loclib.wdamount = "Quantité";	
____loclib.wdlabel = "Étiquette";	
____loclib.wdmessage = "Message";	
____loclib.wsend = "Envoyer";
____loclib.calcfeesandsend = "Calculer les frais et envoyer";	
____loclib.wstrfees = "Les frais de transaction";	
____loclib.wsfees = "Frais";	

____loclib.wssendto = "ENVOYER DES PIÈCES";	
____loclib.wssendb = "ENVOYER";	

____loclib.tacaddress = 'Adresse du compte';	
____loclib.twallet = "Portefeuille";	
____loclib.twalletaddresses = "Adresses de portefeuille";	
____loclib.tTotal = "Total";	
____loclib.wsselect = "Sélectionner la source dans le menu";	
____loclib.wsenter = "Entrez l'adresse ou sélectionnez dans le menu";	
____loclib.wsreciever = "Adresse du destinataire";	
____loclib.wsamount = "Montant";	
____loclib.wsamountof = "Montant de votre transaction";	
____loclib.wsincludefees = "Inclure les frais dans le montant";	
____loclib.wsrecieverpay = 'À payer par le séquestre';	
____loclib.wssenderpay = "A payer par l'expéditeur";	
____loclib.wdselectfrom = "Sélectionnez dans le menu";	

____loclib.wdenteramount = "Mettre le montant";	
____loclib.wdmessageplaceholder = "A quoi sert cette transaction?";
____loclib.wrenteraddress = "mettre l'adresse";
____loclib.wrenteraddressselect = "Mettez l'adresse ou sélectionnez dans le menu";
____loclib.wreturntoeallet = "RETOUR AU PORTEFEUILLE";	
____loclib.linkCreated = 'LIEN CRÉÉ';
____loclib.waddresswascop = "L'adresse a été copiée avec succès";
____loclib.wqrcodecreated = 'CODE QR CRÉÉ';
____loclib.wlinkcreating = 'CRÉATION DE LIENS';
____loclib.wqrcodecreating = 'CRÉATION DE CODE QR';
____loclib.wdoptions = 'OPTIONS';
____loclib.wssuccessfully = "Transaction envoyée avec succès";
____loclib.wscalculatefees = 'CALCULER LES FRAIS';
____loclib.wsaddressnotv = "L'adresse n'est pas valide";

//user profile
____loclib.uaddaddressdona = "Ajouter une adresse pour les dons";
____loclib.uaddaddressdonaplace = "Mettre l'adresse";
____loclib.uchangeicon = "Importer une image de profil";
____loclib.utip1 = "Vous devez créer un nom et un avatar sur la blockchain avant d'utiliser "+appname+"";
____loclib.utip2 = "Il ne vous reste plus qu'un pas";
____loclib.upicset = "Definir l'icone de profil";
____loclib.upic = "Icone de Profil";
____loclib.uuserinfo = "informations de l'utilisateur";
____loclib.usave = "Enregistrer";
____loclib.ucancel = "Annuler";
____loclib.uwaitb = "Attendez la confirmation pour enregistrer les informations ";
____loclib.uchanges = "Il n'y a aucun changement";
____loclib.uchangesvalid = "Vous devez télécharger une image de profil et créer un nom d'utilisateur";
____loclib.uname = "Nom";
____loclib.unickname = "Surnom";
____loclib.ulanguage = "Langue";
____loclib.uabout = "À propos de moi";
____loclib.uwebsite = "Site web";
____loclib.uaddresesd = "Adresses pour les dons";
____loclib.usavechanges = "Voulez-vous enregistrer vos modifications?";

//ustate
____loclib.sreps = "Réputation et limites";
____loclib.sdisconnected = "Déconnecté du nœud";
____loclib.suseractivation = "Activation utilisateur";
____loclib.sprofile = "Profil";
____loclib.spc = "Nombre de messages";
____loclib.ssc = "Les toiles comptent";
____loclib.ccc = "Les commentaires comptent";
____loclib.crc = "Nombre de taux de commentaires";
____loclib.stp = "Période d'essai";
____loclib.srep = "Réputation";

//accounts
____loclib.aaddedacc = "Comptes ajoutés";
____loclib.acure = "Actuel";
____loclib.aaddacc = "Ajouter un compte";
____loclib.ascheduler = "Planificateur";
____loclib.aused = "Cette adresse est déjà utilisée dans un autre pool d'adresses";


//author
____loclib.sub = "S'abonner";
____loclib.unsub = "Se désabonner";
____loclib.joined = "Rejoint "+appname+"";
____loclib.shares = "PARUTIONS";
____loclib.uposts = "POSTS";
____loclib.myuposts = "MES POSTS";
____loclib.followers = "ABONNES";
____loclib.following = "ABONNEMENTS";
____loclib.settings = "GÉRER";
____loclib.anofollowers = "Cet utilisateur n'a pas d'abonnés";
____loclib.aynofollowers = "Vous n'avez pas d'abonnés";
____loclib.anofollowing = "Cet utilisateur ne suit personne";
____loclib.aynofollowing = "Tu ne suis personne";

//lenta
____loclib.lloadmore = "Chargez plus de messages impressionnants!";
____loclib.lloadprev = "Charger de nouveaux articles géniaux";


____loclib.lend = "Fin des messages";
____loclib.zerop = "Il n'y a actuellement aucun message de cet auteur";
____loclib.zeroy = "Vous n'avez pas encore de publications, partagez quelque chose!";



____loclib.llogin = 'Vous devez vous connecter avant de pouvoir continuer';
____loclib.lcomlaindialog = "Voulez-vous vraiment signaler ce message?";
____loclib.lunsubscribe = "Voulez-vous vraiment vous désabonner de ce compte?";
____loclib.lprivatepublic = "Voulez-vous faire un abonnement privé ou public?";
____loclib.lprivate = "Privée";
____loclib.lpublic = "Public";

//share
____loclib.newShare = "Nouveau post";
____loclib.firstShare = "Partagez votre premier message dans "+appname+"";
____loclib.scaption = "Caption";
____loclib.whatsnew = "Quoi de neuf?";
____loclib.saddlink = "Ajouter un lien vers un site externe ou une vidéo";
____loclib.saddimages = "Ajouter des images à la publication";
____loclib.sarticle = "Ecrire un article";
____loclib.stelegram = "Envoyer au télégramme"
____loclib.stimes = "Supprimer le message"


____loclib.snothing = "Rien";
____loclib.sposttime = "Publier par heure";
____loclib.spostnow = "Publier maintenant";
____loclib.stimenotselected = "Heure non sélectionnée";
____loclib.spost = "Post";
____loclib.sdate = "Date";
____loclib.stime = "Temps";
____loclib.snotags = "Ajouter une étiquette";
____loclib.expandvideo = "Cliquez pour agrandir";
____loclib.emptymessage = "Le message est vide";
____loclib.emptytags = "Veuillez ajouter des étiquettes";
____loclib.emptyutxo = "pas d'argent";
____loclib.networkerror = "erreur réseau";
____loclib.maximages = "Vous avez droit à un maximum de 6 images";
____loclib.sharenow = "Voulez-vous partager ce contenu maintenant?";
____loclib.pastdate = 'Pâte de datte';
____loclib.timenotselected = 'Heure non sélectionnée';
____loclib.addtags = 'Ajouter des étiquettes';
____loclib.tnews = "nouvelles";
____loclib.timages = "images";
____loclib.tvideos = "vidéos";
____loclib.tmarket = "marché";
____loclib.tsport = "sports";

//menu
____loclib.signinmenu = "se connecter";
____loclib.signupmenu = "S'inscrire";
____loclib.aboutmenu = "apprendre encore plus";

//footer
____loclib.aboutus = "À propos de nous";



// Dialog Box Options
____loclib.daccept = "Accepter";
____loclib.dcancel = "Annuler";
____loclib.dyes = "Oui";
____loclib.dno = "Non";
____loclib.dsa = "Ne plus montrer";


// Messages

____loclib.coinbaseSuccess = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour votre derniere activite!"
}
____loclib.coinbaseSuccesspost = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour vos derniers posts!"
}
____loclib.coinbaseSuccesscomment = function(v){
return "Félicitations! Vous avez gagné " + v + " Pocketcoin pour vos derniers commentaires!"
}
____loclib.userSent = function(v){
return "envoyé <b>" + v + " POC</b> pour vous"
}




____loclib.refferalUserMessage = "Félicitations Vous avez sauvé quelqu'un du Web censur. Certaines pièces sont en route!"

____loclib.subscribeUserMessage = "t'a suivi"
____loclib.unsubscribeUserMessage = "ne vous suit plus"
____loclib.gotoprofileMessage = "aller au profil"
____loclib.upvoteShareMessage = "a voté pour votre post"

____loclib.upvoteCommentMessage = " a aimé votre commentaire"

// Errors

____loclib.error = "Erreur";
____loclib.checkScoreError = "Vous devez remplir les informations de profil requises avant d'utiliser "+appname+". Voulez-vous le faire maintenant?";
____loclib.checkScoreErrorLight = "Le compte n'est pas activé.";
____loclib.timestamperror = "L'heure dans l'application et dans le nœud ne correspond pas";

// Error Page 404
____loclib.e404 = "ERREUR 404";	
____loclib.e404e = "Page non trouvée. Retour à la page principale";	
____loclib.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " publications sur une période de 24 heures";
}
____loclib.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " classement sur une période de 24 heures";
}

____loclib.doubleLimitLight = "Vous l'avez déjà noté";	

____loclib.SelfSubscribeError = "Impossible de s'abonner a vous-même";
____loclib.DoubleSubscribeError = "Vous suivez déjà cet utilisateur";
____loclib.InvalideSubscribeError = "Vous n'êtes pas abonné à cet utilisateur";
____loclib.ChangeInfoLimitError = "Vous ne pouvez modifier votre profil qu'une fois par heure. Veuillez patienter et ressayer. ";
____loclib.SelfScoreError = "Vous ne pouvez pas évaluer votre propre message";

____loclib.unexperror10 = "Erreur inconnue (10)";
____loclib.unexperror11 = "Erreur inconnue (11)";
____loclib.unexperror12 = "Erreur inconnue (12)";

____loclib.networkerror = "Il y a quelques problèmes avec le nœud";

____loclib.canSpendError = "Vous devez attendre que votre transaction précédente soit effacée dans la blockchain. S'il vous plaît, attendez";
____loclib.noMoneyError  = "Vous ne pouvez pas effectuer d'actions avec un solde de compte nul";



____loclib.waitConf = "Vous devez attendre que votre précédente transaction soit effacée dans la blockchain";
____loclib.postWaitConf = "La publication attend une confirmation de la blockchain";



// notifications

____loclib.ntnow = "Maintenant"
____loclib.ntlasthour = "Cette heure"
____loclib.nttoday = "Aujourd'hui"
____loclib.ntmounth = "Ce mois-ci"
____loclib.ntearlier = "Plus tôt"


____loclib.nodeWalletAdd = "L'ajout d'une adresse peut prendre un certain temps. Continuer?"
____loclib.nodeEnableNoteHeader = 'Note'
____loclib.nodeEnableNote = "L'activation d'un noeud peut prendre jusqu'a 5 Go de RAM. Assurez-vous que vous en avez assez. Bon jalonnement!"


/// 1301

____loclib.address = "Adresse"
____loclib.privatekey = "Clé privée"
____loclib.qrcode = "Code QR"
____loclib.addaccount = "Ajouter un compte"
____loclib.entermnimo = "Entrez une phrase mnémotechnique ou une clé privée"
____loclib.add = "Ajouter"
____loclib.e13011 = "Vous allez maintenant continuer votre enregistrement après avoir installé "+appname+" Desktop."
____loclib.e13012 = "Si "+appname+" n'a pas changé le téléchargement, veuillez cliquer ici pour l'installateur."
____loclib.e13013 = "Saisissez la légende de l'image (facultatif)"
____loclib.e13014 = "Ce fichier n'est pas dans un format pris en charge:"
____loclib.e13015 = "Ce fichier est trop gros:"
____loclib.e13016 = "Collez un lien YouTube, Vimeo et appuyez sur Entrée"
____loclib.e13017 = "Chargement dans Blockchain"
____loclib.e13018 = "Voulez-vous vraiment supprimer cet article?"
____loclib.e13019 = "Nouveau"
____loclib.e13020 = "Escribir artículo nuevo"
____loclib.youarefollowing = "Estas siguiendo"
____loclib.follow = "S'abonner"
____loclib.blocked = "Bloque"
____loclib.e13021 = "Montrer plus"
____loclib.blockuser = "Bloquer l'utilisateur"
____loclib.unblockuser = "Débloquer l'utilisateur"
____loclib.e13022 = "Voulez-vous vraiment ne plus suivre l'utilisateur?"
____loclib.unfollow = "Se désabonner"
____loclib.unblock = "Débloquer"
____loclib.share = "Partager"
____loclib.info = "Info"
____loclib.e13023 = "Voulez-vous vraiment débloquer l'utilisateur?"
____loclib.e13024 = "Votre clé de connexion privée"
____loclib.e13025 = "Créer un nouveau compte"
____loclib.e13026 = "Rejoignez "+appname+""

____loclib.e13027 = "Restez signé"
____loclib.e13028 = "Vous avez entré une clé privée non valide"
____loclib.e13029 = "Le message est vide"
____loclib.e13030 = "Les commentaires ont une limite de 1000 caractères par commentaire"
____loclib.e13031 = "Partager ce commentaire"
____loclib.e13032 = "Voulez-vous vraiment supprimer votre commentaire?"
____loclib.e13033 = "Le commentaire a été supprimé"
____loclib.e13034 = "Oui"
____loclib.e13035 = "Non, annuler"
____loclib.hide = "Cacher"
____loclib.e13036 = "Afficher les commentaires précédents"
____loclib.e13037 = "réponses"
____loclib.remove = "Retirer"
____loclib.e13038 = "Commentez maintenant et gagnez en réputation"
____loclib.e13039 = "Commentez maintenant et gagnez en réputation"
____loclib.e13040 = "Vous n'avez pas de priviléges de commentaire"
____loclib.complain = "Se plaindre"
____loclib.next = "Suivant"
____loclib.post = "Poster"
____loclib.e13041 = "Connexion "+appname+""
____loclib.e13042 = "Proxy "+appname+""

____loclib.e13043 = "Nœuds "+appname+""
____loclib.e13044 = "Ajouter un nœud"
____loclib.e13045 = "Nœuds introuvables"
____loclib.e13046 = "Adresse"
____loclib.e13047 = "WS"
____loclib.e13048 = "Nom"
____loclib.e13049 = "Statut"
____loclib.e13050 = "Proxies introuvables"
____loclib.e13051 = "N'utilisez pas de proxy"
____loclib.e13052 = "Impossible de se connecter au proxy"
____loclib.e13053 = "Impossible de se connecter au nœud"
____loclib.e13054 = "Ajouter un proxy"
____loclib.e13055 = "Modifier le proxy"
____loclib.save = "Sauver"
____loclib.e13056 = "Nœud hôte"
____loclib.close = "Fermer"
____loclib.e13057 = "Merci de compléter tous les champs"
____loclib.e13058 = "Vous avez déjà ce proxy dans la liste."
____loclib.delete = "Supprimer"
____loclib.e13059 = "Voulez-vous vraiment supprimer ce proxy de la liste?"
____loclib.e13060 = "Liste des proxys"
____loclib.e13061 = "Voulez-vous vraiment arrêter d'utiliser Proxy. C'est dangereux (connexion Http)"

____loclib.e13062 = "Modifier le nœud"
____loclib.onproxy = "Sur proxy"
____loclib.locally = "Localement"
____loclib.nodehost = "Nœud hote"
____loclib.e13063 = "Port RPC"
____loclib.e13064 = "Port WS"
____loclib.e13065 = "Nom du nœud"
____loclib.e13066 = "Veuillez saisir le nom du nœud"
____loclib.e13067 = "Connexion RPC"
____loclib.e13068 = "Connectez-vous pour obtenir une autorisation PRC"
____loclib.e13069 = "Mot de passe RPC"
____loclib.e13070 = "Mot de passe pour l'autorisation PRC"
____loclib.e13071 = "Merci de compléter tous les champs"
____loclib.e13072 = "Merci de compléter tous les champs"
____loclib.e13073 = "Voulez-vous vraiment arrêter d'utiliser Proxy. C'est dangereux (connexion Http)"
____loclib.notselected = "Non selection"
____loclib.donation = "don"
____loclib.e13074 = "En attente de fonds. L'adresse sera valide pour"
____loclib.sminutes = "minutes"
____loclib.e13075 = "Le delai pour cet accord a expiry."
____loclib.reactivate = "Réactiver"
____loclib.e13076 = "Scannez ce code pour envoyer"
____loclib.back = "Avant"
____loclib.e13077 = "Ajoutez votre profil a la liste des donateurs"
____loclib.e13078 = "Pourquoi demandons-nous des dons?"
____loclib.e13079 = "Nous avons passé plus de 14 mois de temps libre à partir d'emplois à temps plein à apporter "+appname+" aux gens. En plus du temps et des efforts, nous avons investi notre propre argent pour aider au lancement de la plateforme. Maintenant, nous avons besoin de la communauté pour nous aider à grandir."
____loclib.e13080 = "Comment les fonds seront-ils utilisés?"
____loclib.e13081 = "Les fonds seront utilisés pour acheter de la publicité et embaucher des experts en la matière pour rendre "+appname+" encore plus sûr. L'équipe de développement actuelle ne reçoit aucun de ces dons. Dans la mesure du possible, nous publierons ici comment nous avons utilisé les fonds. "
____loclib.e13082 = "Ce que vous obtiendrez pour votre don en plus de savoir que vous avez soutenu la liberté "
____loclib.e13083 = "En signe de gratitude pour le don, vous recevez un cadeau d'une certaine quantité de Pocketcoin"
____loclib.e13084 = "De plus, lorsque nous construisons une discussion de groupe, vous serez membre d'un groupe spécial de donateurs qui ont un accès direct à l'équipe "+appname+", même si la plate-forme se développe."
____loclib.e13085 = "Le lien vers votre profil "+appname+" sera répertorié ci-dessous, attirant plus de personnes vers vos publications (sauf si vous nous demandez de ne pas le faire)"
____loclib.e13086 = "Soutenez maintenant le Webm décentralisé"
____loclib.e13087 = "Bitcoin, Litecoin, Monero"

____loclib.e13088 = "Membres "+appname+" qui ont fait un don pour soutenir "+appname+""
____loclib.thankyou = "Merci!"
____loclib.e13089 = "Si vous souhaitez que nous inscrivions votre profil "+appname+" dans la liste des donateurs, veuillez nous envoyer des informations sur votre don"
____loclib.e13090 = "Ajoutez-moi a la liste des donateurs"
____loclib.e13091 = "Ou vous pouvez nous envoyer un e-mail à"
____loclib.e13092 = "avec votre clé publique et votre montant."
____loclib.finish = "terminer"
____loclib.e13093 = "Veuillez choisir le mode de don"
____loclib.e13094 = "Un problème est survenu. Veuillez recharger la page et réessayer (erreur: 0001)"
____loclib.e13095 = 'Merci de soutenir notre travail pour la libertè. Nous nous assurerons que chaque centime compte.'
____loclib.e13096 = 'Veuillez indiquer le montant du don'
____loclib.e13097 = "Un problème est survenu. Veuillez recharger la page et rèessayer (erreur: 0002)"
____loclib.e13098 = "Ajouter un lien vers un site ou une ressource externe"
____loclib.e13099 = "Importer des images"
____loclib.e13100 = "Cliquez ici pour sèlectionner les fichiers a tèlècharger"
____loclib.e13101 = "ou glisser-deposer"
____loclib.e13102 = "Ajouter un lien vers un site externe"
____loclib.e13103 = "L'URL n'est pas valide"
____loclib.e13104 = "Max 6 images autorisèes"
____loclib.e13105 = "Gestion des nœuds"
____loclib.e13106 = "Nœud "+appname+""
____loclib.e13107 = "La gestion des nœuds peut ètre effectuèe avec Application"
____loclib.e13108 = "Il n'y a pas de connexion avec l'interface proxy Electron"

____loclib.e13109 = "Veuillez entrer les mots dans l'image pour recevoir Pocketcoin et continuer l'inscription"
____loclib.e13110 = "Entrez les mots"
____loclib.next = "Suivant"
____loclib.refresh = "Rafraîchir"
____loclib.e13111 = "Ajoutez votre e-mail pour obtenir les dernières mises à jour "+appname+""
____loclib.e13112 = "Entrer votre email"
____loclib.e13113 = "Ajouter un email"
____loclib.skip = "Passer"
____loclib.e13114 = "Il y a un problème avec votre inscription en raison d'une activité étrange."
____loclib.e13115 = "S'il vous plaît envoyer un courriel"
____loclib.e13116 = "pour recevoir des pièces et ouvrir votre compte."
____loclib.e13117 = "Verifier le solde"
____loclib.joinnow = "Inscrivez-vous maintenant"
____loclib.loading = "Chargement"
____loclib.e13118 = "Les mots ne correspondent pas"
____loclib.e13119 = "Ajouter un e-mail et continuer"
____loclib.e13120 = "Applications"
____loclib.e13121 = "Il n'y a pas d'images ici"
____loclib.e13122 = "Derniers Commentaires"

____loclib.e13123 = "Afficher plus de messages"
____loclib.e13124 = "Plus de messages "+appname+" impressionnants!"
____loclib.e13125 = "La section des meilleurs messages est vide!"
____loclib.e13126 = "Les messages des personnes que vous suivez seront affichés icis"
____loclib.e13127 = "Les messages des personnes que vous suivez seront affichés icis "
____loclib.e13128 = "Les messages des personnes que vous suivez seront affichés icis"
____loclib.registration = "enregistrement"
____loclib.editpost = "Modifier le post"
____loclib.removepost = "Supprimer le post"


____loclib.reportpost = "Dènoncer ce post"
____loclib.donate = "Faire un don"
____loclib.blockuser = "Bloquer un utilisateur"
____loclib.more = "Plus"
____loclib.showmore = "Montrer plus"
____loclib.e13129 = "Images jointes"
____loclib.e13130 = "Editè"
____loclib.e13131 = "Vous avez bloquè cet utilisateur"
____loclib.e13132 = "notè"
____loclib.e13133 = "Partager ceci"
____loclib.e13134 = "Il n'y a aucun rèsultat pour cette chaîne de recherche"
____loclib.e13135 = "L'utilisateur n'a pas de clè privèe"
____loclib.e13136 = "Tous les messages"
____loclib.e13137 = "Votre poche"
____loclib.e13138 = "Top messages"
____loclib.e13139 = "RECHERCHE SUR POCKETNET"
____loclib.e13140 = "RECHERCHE SUR"
____loclib.notifications = "Notifications"
____loclib.showall = "Afficher tout"
____loclib.e13141 = "Vous n'avez pas de notifications"

____loclib.recommendations = "Recommandations"
____loclib.e13142 = "J'ai gardè ma clè, ne me le rappelle plus"
____loclib.e13143 = "Important!"
____loclib.e13144 = "Copier le texte"
____loclib.e13145 = "Enregistrer la clè sur l'appareil"
____loclib.e13146 = "Fin des messages"
____loclib.e13147 = "Partagez ceci"
____loclib.e13148 = "Voulez-vous vraiment vous plaindre de ce post?"
____loclib.e13149 = "évaluations des utilisateurs"
____loclib.e13150 = "évaluation du message"
____loclib.e13151 = "Personne n'a vu ce message"
____loclib.e13152 = "Scores des utilisateurs"
____loclib.e13153 = "Passer et accéder au site Web"
____loclib.e13154 = "Vos informations de connexion"
____loclib.e13155 = "Pour utiliser "+appname+", vous devez générer votre clé cryptographique privée qui remplace l'identifiant et le mot de passe des réseaux sociaux centralisés."
____loclib.users = "Utilisateurs"
____loclib.userstx = "Utilisateurs"
____loclib.user = "Utilisateurs"
____loclib.postscount = "Nombre de posts"
____loclib.about = "Sur"
____loclib.e13156 = "Rèsultats suivants"
____loclib.posts = "Posts"
____loclib.e13157 = "Recherchè par"
____loclib.e13158 = "n'a aucun rèsultat"
____loclib.e13159 = "La phrase de recherche est vide"
____loclib.repost = "Republier"
____loclib.e13160 = "Bonjour Pocketeers!"

____loclib.e13161 = "Ajouter des étiquettes pour votre message"
____loclib.e13162 = "Vous pouvez saisir moins de 5 étiquettes"
____loclib.e13163 = "Il n'y a pas de changements dans la publication"
____loclib.e13164 = "Veuillez ajouter quelques mots pour informer Pocketpeople de votre lien. De quoi s'agit-il? Pourquoi c'est important? Quel est ton opinion?"
____loclib.e13165 = "VNotre lien vers la vidéo n'est pas valide. Veuillez mettre en ligne une URL de vidéo valide."
____loclib.e13166 = "Tu as sauvegardé"
____loclib.e13167 = "internautes censurés"
____loclib.e13168 = "Gagnez Pocketcoin pour chaque inscription via votre lien"
____loclib.e13169 = "Lien direct"
____loclib.copy = "Copier"
____loclib.e13170 = "Incluez un appel à l'action pour l'inscription "+appname+" "
____loclib.more = "Plus"
____loclib.e13171 = "Bonnes nouvelles. J'ai gagné mon indépendance des monopoles des réseaux sociaux, venez me rejoindre sur pocketnet.app pour que nous puissions partager et discuter de manière indépendante sur la blockchain. Rejoignez-moi ici"
____loclib.e13172 = "Je souhaite partager cela à partir d'une plate-forme de blockchain "+appname+" décentralisée avec vous. J'espère que vous le trouverez utile et si vous vous inscrivez, nous obtiendrons tous les deux des bonus de crypto-monnaie Pocketcoin!"
____loclib.e13173 = "Envoyé par e-mail"
____loclib.e13174 = "Partage social"
____loclib.e13175 = "Etiquettes populaires"
____loclib.e13176 = "Type d'adresse"
____loclib.e13177 = "Envoyer la photo"

____loclib.requiredfields = "Champs obligatoires"
____loclib.e13178 = "Non lié à votre profil"
____loclib.e13179 = "Liste non dépensée"
____loclib.e13180 = "Votre facture a été créée avec succès"
____loclib.e13181 = "Une erreur s'est produite lors du processus de crèation de l'offre"
____loclib.e13182 = "Explorateur de blocs"
____loclib.e13183 = "Centre d'aide"
____loclib.e13184 = "Continuer l'inscription"
____loclib.e13185 = "Connexion perdue"
____loclib.e13186 = "Editer le profil"
____loclib.e13187 = "Contenus"
____loclib.e13188 = "Veuillez enregistrer votre clé cryptographique privée qui remplace l'identifiant et le mot de passe des réseaux sociaux centralisés"
____loclib.e13189 = "Laissez et perdez ma clè pour toujours!"
____loclib.e13190 = "Thème "+appname+""
____loclib.e13191 = "Définissez le thème"
____loclib.e13192 = "Niveau"
____loclib.e13193 = "BONUS"
____loclib.e13194 = "Réputation et récompenses"
____loclib.e13195 = "Limitations"
____loclib.e13196 = "Cela prend beaucoup de temps"
____loclib.e13197 = "Recevoir des Pocketcoins"
____loclib.e13198 = "Le temps d'attente approximatif est"
____loclib.e13199 = "Rejoignez "+appname+" maintenant"

____loclib.e13200 = "Retour à "+appname+""
____loclib.e13201 = "REJOIGNEZ BETA"
____loclib.e13202 = "Le test bêta de "+appname+" démarre le 24 janvier"
____loclib.e13203 = "Merci d'avoir rejoint la liste de diffusion du test bêta de "+appname+". Il n'est pas nécessaire d'utiliser "+appname+", cependant, nous utilisons cet e-mail pour envoyer vos sondages afin d'améliorer la plateforme. Merci d'avoir contribué à façonner l'avenir d'Internet."
____loclib.e13204 = "Adresse de reception "+appname+""
____loclib.e13205 = "Parametres"
____loclib.e13206 = "Recevoir un montant Pocketcoin"
____loclib.e13207 = "Envoyer le montant"
____loclib.e13208 = "Disponible"
____loclib.e13209 = "Liste de financement participatif"
____loclib.e13210 = "Nouvelle offre"
____loclib.e13211 = "Copier le lien et partager"
____loclib.amount = "Montant"
____loclib.label = "Etiquette"
____loclib.message = "Message"
____loclib.copylink = "Copier le lien"
____loclib.e13211 = "Veuillez remplir ces champs"
____loclib.e13212 = "Créer un code QR"
____loclib.e13213 = "Recevoir l'adresse"
____loclib.process = "Processus"
____loclib.source = "Source"
____loclib.yourmessage = "Votre message"
____loclib.e13214 = "Montant Pocketcoin"
____loclib.currency = "Devise"


____loclib.e13215 = "Sélectionnez la devise"
____loclib.e13216 = "Montant en devise"
____loclib.e13217 = "La date limite pour cet accord est expirée."
____loclib.e13218 = "En attente des confirmations de la blockchain"
____loclib.e13219 = "Vous envoyer des Pocketcoins"
____loclib.e13220 = 'Pocketcoins livrès'
____loclib.errorreload = "Un problème est survenu. Veuillez actualiser la page et réessayer"
____loclib.e13221 = "Voulez-vous vraiment supprimer les informations relatives à cette offre? L'accord ne peut pas être arrêté"
____loclib.e13222 = "Téléchargez l'application de bureau - c'est le moyen le plus résistant à la censure d'utiliser "+appname+". Même si les sites Web sont fermés, l'application de bureau fonctionnera toujours directement via les nœuds."
____loclib.e13223 = "Tèlèchargez "+appname+" pour Windows"
____loclib.e132232 = "Tèlèchargez "+appname+" pour macOS"
____loclib.e13224 = "Tèlèchargez "+appname+" pour Linux"
____loclib.e13225 = "Nœud "+appname+""
____loclib.e13226 = 'Tèlèchargez le nœud'
____loclib.e13227 = "Tèlèchargez "+appname+" Node pour Windows"
____loclib.e13228 = "Tèlèchargez "+appname+" Node pour Linux"
____loclib.e13229 = 'Clè privèe non valide'
____loclib.e13230 = 'Erreur de connexion non dèfinie'

____loclib.e13231 = "Connexion perdue"
____loclib.e13232 = "Impossible de se connecter au nœud"
____loclib.e13233 = 'Ce commentaire a été supprimé'
____loclib.e13234 = 'Erreur Opreturn / 41'
____loclib.e13235 = 'Vous ne pouvez pas evaluer le commentaire deux fois'
____loclib.e13236 = 'Ce commentaire a été supprimé'
____loclib.e13237 = 'Vous ne pouvez pas vous évaluer'
____loclib.e13238 = "Erreur lors de l'envoi du commentaire. Veuillez patienter et réessayer / 37"
____loclib.e13239 = "Erreur d'envoi de commentaire / 35"
____loclib.e13240 = "Le commentaire auquel vous répondez a été supprimé par l'utilisateur"
____loclib.e13241 = 'Ce commentaire est trop long, veuillez le casser'
____loclib.e13242 = "Vous avez été bloqué par cette personne, vous ne pourrez pas commenter ses messages"
____loclib.e13243 = "Vous avez atteint votre limite de commentaires positifs sur une période de 24 heures"
____loclib.e13244 = "Vous avez atteint votre limite de modification des commentaires sur une période de 24 heures"
____loclib.e13245 = "Vous avez atteint votre limite d'envoi de commentaires sur une période de 24 heures"
____loclib.e13246 = "Vous essayez de modifier le message de quelqu'un d'autre"
____loclib.e13247 = "Vous avez atteint votre limite de modification de 5 articles par période de 24 heures"
____loclib.e13248 = "Vous ne pouvez modifier qu'une seule fois par bloc de blockchain. Veuillez patienter une minute, puis réessayer"
____loclib.e13249 = 'Tu ne peux pas te bloquer'
____loclib.e13250 = 'Vous avez déjà bloqué cet utilisateur'
____loclib.e13251 = "Vous n'avez pas bloqué cet utilisateur"
____loclib.e13252 = 'La transaction est mal formée'
____loclib.e13253 = 'Vous ne pouvez pas vous référer à vous-même'
____loclib.e13254 = "Ce nom d'utilisateur est trop long"
____loclib.e13255 = "Ce nom d'utilisateur est déjà utilisé"
____loclib.e13256 = 'Ce message est trop long, veuillez le séparer.'
____loclib.e13257 = "Votre score de réputation "+appname+" ne permet pas encore l'enregistrement des réclamations"
____loclib.e13258 = 'Vous avez atteint la limite de réclamation dans un délai de 24 heures'

____loclib.e13259 = 'Je ne peux pas me plaindre de votre propre message'
____loclib.e13260 = 'Vous avez déjà enregistré votre réclamation concernant ce message'
____loclib.e13261 = "Enregistrer la clé"
____loclib.e13262 = "Plus tard"
____loclib.e13263 = "Abonnez-vous et activez les notifications de cet utilisateur"
____loclib.e13264 = "Abonnez-vous sans notifications"
____loclib.e13265 = 'Votre nom n`est plus disponible, veuillez en choisir un autre'
____loclib.e13266 = "Théme blanc"
____loclib.e13267 = "Théme sombre"
____loclib.e13268 = 'Coinstake gagne'
____loclib.e13269 = 'Les transactions reçoivent'
____loclib.e13270 = 'Les votes positifs reçoivent'
____loclib.e13271 = 'Comment recevoir'
____loclib.e13272 = 'Répondre reçu'
____loclib.e13273 = 'Nouveaux adeptes'
____loclib.e13274 = 'Utilisateurs enregistrés'
____loclib.e13275 = 'Score du commentaire'
____loclib.e13276 = 'Afficher les vidéos intégrées'
____loclib.e13277 = 'Vidéos en lecture automatique'
____loclib.e13278 = 'Démarrez '+appname+' automatiquement'
____loclib.e13279 = 'Chat'
____loclib.e13280 = 'Etiquettes'
____loclib.e13281 = 'Derniers commentaires'
____loclib.e13282 = "Jeton de robot télégramme"
____loclib.e13283 = "Message de chaîne de télégramme"
____loclib.e13284 = "Ajouter le bot au chat et sélectionner"
____loclib.e13285 = 'Demander avant de poster du télégramme'
____loclib.e13286 = 'Demander avant d`envoyer au télégramme'
____loclib.e13287 = "Envoyer vers le canal de télégramme"
____loclib.video = "Vidéo"
____loclib.e13288 = "Vidgets de la page principale"
____loclib.e13289 = "Intagration avec Telegram"

____loclib.system = "Systéme"
____loclib.e13290 = "Souhaitez-vous suivre"
____loclib.e13291 = "Voulez-vous vraiment envoyer un message a Telegram?"
____loclib.send = "Envoyer"
____loclib.e13292 = "Vous avez déjà un nœud sur cet hôte"
____loclib.e13293 = "Erreur interne"
____loclib.e13294 = 'Activation de la base de données PGSQL'
____loclib.e13295 = 'Hôte DB'
____loclib.e13296 = 'Port DB'
____loclib.e13297 = 'DB Max'
____loclib.e13298 = 'Délai d`inactivité DB, ms'
____loclib.e13298 = 'DB Nom'
____loclib.e13300 = 'DB Utilisateur'
____loclib.e13031 = 'DB Mot de Passe'
____loclib.e13302 = 'Serveur proxy activé'
____loclib.e13303 = 'Port du serveur proxy https'
____loclib.e13304 = 'Port du serveur proxy wss'
____loclib.e13305 = 'Clé SSL du serveur, pem'
____loclib.e13306 = 'Certificat SSL du serveur, pem'
____loclib.e13307 = 'Phrase de passe SSL du serveur'
____loclib.e13308 = 'SDK d`administration Firebase'
____loclib.e13309 = 'Votre adresse de grue'
____loclib.e13310 = 'Captcha activé'
____loclib.e13311 = 'Activation du limiteur IP'
____loclib.e13312 = "Serveur"

____loclib.e13313 = "Base de données, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Autre"
____loclib.e13316 = 'Activer'
____loclib.e13317 = 'Chemin binaire'
____loclib.e13318 = 'Chemin de configuration'
____loclib.e13319 = 'Chemin de données'
____loclib.e13320 = 'Adresse de jalonnement'
____loclib.e13321 = 'Importez l`adresse du compte sur le nœud pour l`empilage'
____loclib.e13322 = 'Etat'
____loclib.e13323 = 'Adresses de jalonnement'
____loclib.e13324 = 'Dernier bloc'
____loclib.control = "Contrôler"
____loclib.setup = "Installer"
____loclib.e13325 = "Voulez-vous vraiment poster des messages de Telegram?"
____loclib.e13326 = "Post"
____loclib.e13327 = 'Voulez-vous vraiment utiliser un nouveau proxy?'
____loclib.e13328 = 'aimé votre commentaire!'
____loclib.e13329 = "Nouveau commentaire comme"
____loclib.e13330 = "un message partagé:"
____loclib.e13331 = "un post partagé:"
____loclib.e13332 = "a un tout nouveau post:"
____loclib.e13333 = "Transaction entrante"
____loclib.e13334 = "Félicitations! Vous avez gagné"
____loclib.e13335 = "Pocketcoin pour votre dernier"
____loclib.e13336 = "avec message:"
____loclib.e13337 = "a commenté votre message:"
____loclib.e13338 = "answered on your comment:"
____loclib.reply = "Répondre"
____loclib.e13339 = "Vous avez sauvé quelqu'un du Web censuré. Certaines pièces sont en route!"
____loclib.e13340 = 'Félicitations !'
____loclib.e13341 = "t'a suivi"
// <%=e('e13337')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13337')
____loclib.e13342 = "Nouvel abonné"
____loclib.e13343 = "un vote pour votre message"
____loclib.e13344 = "Nouveau vote favorable"
____loclib.e13345 = "vous a envoyé un message privé"
____loclib.e13346 = "Vous avez de nouveaux messages"
____loclib.e13347 = "Des mises à jour "+appname+" sont disponibles. Appliquer les mises à jour maintenant?"
____loclib.e13348 = "Au plus tard"
____loclib.e13349 = "Des mises à jour "+appname+" sont disponibles. Allez sur la page pour télécharger la nouvelle version?"
____loclib.e13350 = 'Rejoignez '+appname+' et gagnez Pocketcoin maintenant'
____loclib.e133512 = 'Please write a few words about yourself to help people decide if they want to follow you'
