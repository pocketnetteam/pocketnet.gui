if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.fr = {};
var appname = window.pocketnetproject || "Pocketnet"
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
____loclib.utip1 = "Vous devez créer un nom sur la blockchain avant d'utiliser "+appname+"";
____loclib.utip2 = "Il ne vous reste plus qu'un pas";
____loclib.upicset = "Definir l'icone de profil";
____loclib.upic = "Icone de Profil";
____loclib.uuserinfo = "informations de l'utilisateur";
____loclib.usave = "Enregistrer";
____loclib.ucancel = "Annuler";
____loclib.uwaitb = "Attendez la confirmation pour enregistrer les informations ";
____loclib.uchanges = "Il n'y a aucun changement";
____loclib.uchangesvalid = "Vous devez créer un nom d'utilisateur";
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
____loclib.maximages = "Vous avez droit à un maximum de 10 images";
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
____loclib.e13139 = "RECHERCHE SUR "+appname.toUpperCase()+""
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

____loclib.downloaded = "Téléchargés";
____loclib.downloadedEmpty = "Les posts téléchargés s'afficheront ici";
____loclib.downloadVideo = "Télécharger vidéo";
____loclib.selectQuality = "Sélectionnez la qualité:";
____loclib.downloadedVideos = "Vidéos téléchargées";
____loclib.deleteAllDownloadedVideos = "Supprimer les vidéos téléchargées";
____loclib.deleteVideoDialog = "Etes-vous sûr de vouloir supprimer cette vidéo ?";
____loclib.deleteAllVideoDialog = "Etes-vous sûr de vouloir supprimer toutes les vidéos ?";
____loclib.videosDeleted = "Vidéos supprimées!";
____loclib.noDownloadedVideos = "Aucune vidéos téléchargées";

____loclib.buy = 'Acheter';

____loclib.MainBoard = 'Levez-vous contre la censure &';
____loclib.MainBoard1 = 'Obtenez une indépendance financière';
____loclib.MainBoard2 = 'Le premier protocole de réseau social résistant à la censure';
____loclib.MainBoard3 = 'Basé sur la technologie Blockchain, décentralisé et sécurisé.';
____loclib.MainBoard4 = 'Pas de société, pas de serveurs centralisés, modéré par la communauté'
____loclib.MainBoard5 = 'Propulsé par Pocket coin (PKOIN) pour récompenser les créateurs et les contributeurs' ;
____loclib.MainBoard55 = 'Règles Open-source & transparentes qui sont les mêmes pour tout le monde' ; 
____loclib.MainBoard6 = 'Commencez';
____loclib.MainBoard7 = 'Google Play';
____loclib.MainBoard8 = 'Télécharger pour';
____loclib.works = 'Nous croyons à la liberté';
____loclib.works1 = 'Bastyon est un réseau innovant qui peut contourner les tactiques de censure courantes, telles que le blocage des domaines et l’interdiction des blogueurs pour dissidence';
____loclib.works2 = 'Bastyon est également une plate-forme de partage de vidéos qui, contrairement aux médias sociaux traditionnels et traditionnels, donne votre vie privée et la liberté de la censure arbitraire';  
____loclib.works3 = 'Bastyon est également un système financier privé et axé sur la liberté alimenté par Pocketcoin (PKOIN) qui est utilisé pour promouvoir le contenu et les biens';
____loclib.works4 = 'Nous sommes motivés par la LIBERTÉ';
____loclib.works5 = 'Ne dépend pas des entités corporatives' ;
____loclib.works6 = 'Ne dépend pas des banques pour le financement et les opérations' ;
____loclib.works7 = 'Ne dépend d’aucun domaine ou site web qui peut être facilement bloqué';
 ____loclib.contentCreators = 'Pour les créateurs de contenu';
____loclib.howItWorks = 'Comment cela fonctionne';
____loclib.insteadOf = 'Au lieu de';
____loclib.alternativeTo = 'Une alternative à...';


____loclib.aboutServices = 'AUCUNE CENSURE';

____loclib.aboutServices1 = 'Résistant à la censure';
____loclib.aboutServices2 = 'Bastyon existe sur des ordinateurs à nœuds décentralisés dans le monde entier gérés par des utilisateurs. Chaque ordinateur nœud fonctionne sur le même ensemble de règles transparentes, empêchant quelqu’un d’interdire arbitrairement le contenu. Même les développeurs de Bastyon ne peuvent interdire qui que ce soit, la plate-forme est modérée par l’utilisateur';
____loclib.aboutServices3 = 'Même les développeurs de Bastyon ne peuvent interdire une personne, la plate-forme est modérée par l’utilisateur';
____loclib.aboutServices4 = 'Bitcoin des médias sociaux';
____loclib.aboutServices5 = 'Bastyon fonctionne sur la blockchain et ne dépend d’aucun site Web ou domaine. Tant qu’il y a plusieurs nœuds en cours d’exécution quelque part dans le monde, le réseau peut fonctionner et les créateurs auront accès aux abonnés et aux utilisateurs au contenu.';
____loclib.aboutServices6 = 'Bastyon est le “Bitcoin des médias sociaux”';

____loclib.aboutServices7 = 'Protection de la vie privée';
____loclib.aboutServices8 = 'Le compte Bastyon n’est pas lié à votre identité ou à un numéro de téléphone, seule la vérification par courriel est requise. Plusieurs comptes sont autorisés pour protéger votre vie privée. Aucune donnée personnelle n’est jamais acquise ou stockée. Bastyon dispose également d’un messager crypté peer-to-peer. ';
____loclib.aboutServices9 = 'Votre vie privée est l’objectif principal de Bastyon. Votre clé privée n’est connue que de vous et ne peut pas être récupérée même par les développeurs.';
____loclib.aboutServices10 = 'De plus, les pirates informatiques ne peuvent pas entrer dans votre compte ni modifier votre mot de passe.';

____loclib.aboutServices11 = 'Gagnez avec Bastyon';
____loclib.aboutServices12 = 'Vous pouvez être payé 1,000 USD';
____loclib.aboutServices13 = 'Il existe de nombreuses façons de monétiser votre contenu en utilisant Pocketcoin (PKOIN). Contrairement à You earn PKOIN pour le contenu populaire, les utilisateurs peuvent joindre PKOIN aux commentaires en vedette. Un marché de l’annonce décentralisé dont les recettes sont reversées à 100% aux blogueurs devrait être lancé en décembre 2021.  ';

____loclib.aboutServices14 = 'Téléchargez vos vidéos';
____loclib.aboutServices15 = 'Bastyon vous permet';
____loclib.aboutServices16 = 'partagez vos publications et vidéos';
____loclib.aboutServices17 = ', Téléchargez-les en toute sécurité, importez-les depuis YouTube (contactez-nous pour que nous puissions vous aider!), assurez-vous de les rendre visibles à tous. Pour toujours. Personne ne pourra les supprimer ou les interdire.' ;


____loclib.aboutServices18 = 'Source ouverte';
____loclib.aboutServices19 = 'Nous croyons que';
____loclib.aboutServices20 = 'Confidentialité et sécurité';
____loclib.aboutServices21 = 'doivent passer par des projets Source Ouverte. L’ensemble du projet est disponible sur GitHub afin que vous puissiez vérifier qu’il n’y a pas de portes dérobées et que Bastyon ne stocke aucune donnée personnelle' ;

____loclib.aboutNewBlock = 'Comment gagner avec Bastyon';
____loclib.aboutNewBlock1 = 'Contenu populaire et commentaires en vedette';
____loclib.aboutNewBlock2 = 'Vous gagnez des PKOIN pour les votes des utilisateurs actifs sur la plateforme. Ainsi, si vous amenez votre public, vous serez protégé de la censure, tout en gagnant pour leur interaction avec votre contenu. Vos abonnés peuvent également ajouter des PKOIN à leurs commentaires pour les présenter sous votre message, 100% des recettes vous reviennent, car il n’y a pas d’entité corporative.';
____loclib.aboutNewBlock3 = 'Programme de bonus';
____loclib.aboutNewBlock4 = 'Bastyon a un programme de bonus à durée limitée pour les blogueurs vidéo avec des gains de 1 000 USD pour chaque 15k vues de vidéos, 1000 utilisateurs invités et 1 250 interactions. Le bonus est payé en Bitcoin ou PKOIN, selon la préférence du blogueur. Il s’agit d’un programme à durée limitée.';
____loclib.aboutNewBlock5 = 'Annonces décentralisées';
____loclib.aboutNewBlock6 = 'Un marché publicitaire décentralisé dont la sortie est prévue pour décembre 2021 permettra aux annonceurs de créer des publications et de les proposer aux blogueurs. Un blogueur peut examiner la publication de l’annonce et la republier, le cas échéant. Toutes les interactions sur le canal des blogueurs iront directement au portefeuille du blogueur, 100% du produit de l’annonce.';



____loclib.aboutOpen = 'Découvrez Bastyon';
____loclib.aboutOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
____loclib.aboutOpen2 = 'Site internet officiel';
____loclib.aboutOpen3 = 'Contactez-nous';
____loclib.aboutOpen4 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
____loclib.aboutOpen5 = 'Code Source';

/////////////aboutYoutube
____loclib.aboutMainBoard = 'Bastyon – la meilleure alternative à YouTube';
____loclib.aboutYoutubeMainDescription1 = 'Certaines personnes nous demandent:';
____loclib.aboutYoutubeMainDescription2 = '"Pourquoi devrais-je utiliser Bastyon?"';
____loclib.aboutYoutubeMainDescription3 = 'La vraie question est:';
____loclib.aboutYoutubeMainDescription4 = '"Pourquoi devriez-vous utiliser YouTube?!"';
____loclib.aboutYoutubeMainDescription5 = 'YOUTUBE A BANNI ET DÉMONÉTISÉ DES MILLIERS DE COMPTES';
____loclib.aboutYoutubeMainDescription6 = 'DES PERSONNES AVEC DES CENTAINES DE MILLIERS D’ABONNÉS';
____loclib.aboutYoutubeMainDescription7 = 'MÊME LORSQU’ILS NE SONT PAS INTERDITS, LES AUTEURS SONT BANNIS OU DEMONÉTISER';

____loclib.aboutYoutubeThreeColumn1 = 'Imagine: un jour vous avez 20k, 100k ou même 1M d’abonnés sur votre chaîne YouTube.';
____loclib.aboutYoutubeThreeColumn2 = 'Le lendemain, votre compte n’existe plus.';
____loclib.aboutYoutubeThreeColumn3 = 'Banni, pour toujours. Aucune chance de faire appel.';
____loclib.aboutYoutubeThreeColumn4 = 'Vous savez, vous n’avez pas seulement perdu vos abonnés.';
____loclib.aboutYoutubeThreeColumn5 = 'Vous avez perdu un revenu passif constant généré par l’ADS sur vos vidéos.';
____loclib.aboutYoutubeThreeColumn6 = 'Vous avez perdu des milliers de personnes qui vous suivaient et partageaient vos vidéos.';
____loclib.aboutYoutubeThreeColumn7 = 'Vous avez perdu l’accès à vos vidéos si vous n’aviez pas de sauvegarde.';
____loclib.aboutYoutubeThreeColumn8 = 'Le pire, c’est que les décisions de YouTube sont arbitraires et sont généralement finales';
____loclib.aboutYoutubeThreeColumn9 = 'Le pire, c’est que les décisions de YouTube sont généralement finales.';
____loclib.aboutYoutubeThreeColumn10 = 'Vous n’avez aucun moyen de récupérer votre chaîne, vos abonnés et votre argent. Ils sont partis, pour toujours.' ;
____loclib.aboutYoutubeThreeColumn11 = 'Déplacez-vous vers Bastyon avant qu’il ne soit trop tard. Nous pouvons importer vos vidéos sans effort, et vous pouvez être payé 1 000 $ pour chaque 15 000 visionnements ! (Plus de 1 250 interactions et 1 000 utilisateurs invités sur votre chaîne) ' ;
____loclib.aboutYoutubeThreeColumn12 = 'Qu’attendez-vous?!';

____loclib.aboutYoutubeH3Section = 'Construire une communauté d’abonnés sur YouTube, c’est comme construire une maison sur un terrain que vous ne possédez pas.';

____loclib.aboutYoutubeImgAndText1 = 'GAGNEZ AVEC BASTYON PAS DE DÉMONÉTISATION';

____loclib.aboutYoutubeImgAndText2 =  'Bastyon vous paie pour poster des vidéos et pour chaque interaction (like/commentaire) que vous obtenez. À l’heure actuelle, Bastyon a un programme de bonus qui vous donne 1 000 $ (en crypto-monnaie) pour chaque 15 000 vues + 1 250 interactions + 1 000 utilisateurs invités sur votre chaîne';
____loclib.aboutYoutubeImgAndText3 = 'Et vous pouvez parler de sujets « sensibles ». Vous ne serez jamais bloqué ou démonétisé, si vous ne publiez pas de pornographie ou de contenu illégal qui sera modéré par la communauté. De plus, si vous amenez vos abonnés, vous obtenez également des références.'
____loclib.aboutYoutubeImgAndText4 = 'Zone de liberté d’expression – Modéré par la communauté';
____loclib.aboutYoutubeImgAndText5 = 'Sur Bastyon, vous pouvez parler de sujets sensibles (et ils se multiplient de jour en jour): COVID, politique, changement climatique, premier et deuxième amendement. La communauté d’utilisateurs modère Bastyon et les seuls sujets bloqués sont la pornographie et les contenus illicites.' ;
____loclib.aboutYoutubeImgAndText6 = 'Nous croyons en une véritable liberté d’expression et la communauté des utilisateurs n’interdit ni ne modère le contenu en fonction d’un désaccord d’opinions. Et Bastyon n’appartient pas à une société et est indépendante du système bancaire.'
____loclib.aboutYoutubeImgAndText7 = 'PRIVÉ ET SÉCURISÉ';
____loclib.aboutYoutubeImgAndText8 = 'Bastyon ne collecte aucune information personnelle. Pas de nom, pas de numéro de téléphone, pas d’adresse IP, pas votre identité. Votre connexion au compte Bastyon est votre clé privée, vous seul avez le contrôle sur elle, même les développeurs ne pourraient pas y accéder ou la restaurer, en cas de perte.' ;
____loclib.aboutYoutubeImgAndText9 = 'AUCUNE CENSURE';
____loclib.aboutYoutubeImgAndText10 = 'Bastyon ne censurera pas vos vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir. Votre compte est LE VÔTRE et vos abonnés seront toujours libres de vous suivre.' ;
____loclib.aboutYoutubeImgAndText11 = 'Bastyon est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des comptes et des vidéos';
____loclib.aboutYoutubeImgAndText12 = 'Chaque vidéo est enregistrée sur la blockchain et, pour sa nature, elle ne peut pas être supprimée. Par n’importe qui.' ;
____loclib.aboutYoutubeImgAndText13 = 'Chaque vidéo que vous publiez sera là pour toujours. Personne, vraiment, ne peut les censurer. Personne ne peut supprimer vos vidéos, vos abonnés et votre compte.' ;
____loclib.aboutYoutubeImgAndText14 = 'Résistance à la censure';
____loclib.aboutYoutubeImgAndText15 = 'Bastyon s’exécute sur un réseau de nœuds sur les machines des utilisateurs. Même si le site Web principal Bastyon.com est bloqué, la plate-forme fonctionne toujours normalement via une application de bureau. Parce qu’il n’y a pas de société, personne ne peut imposer à Bastyon une censure dont les utilisateurs ne veulent pas.' ;
____loclib.aboutYoutubeImgAndText16 = 'Bastyon est un protocole, pas une entreprise ou un réseau social';
____loclib.aboutYoutubeImgAndText17 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas de société derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon';

____loclib.aboutYoutubeSecondBoard1 = 'Bastyon - la meilleure alternative à YouTube';
____loclib.aboutYoutubeSecondBoard2 = 'Vos données personnelles ne sont pas vendues à des sociétés externes';
____loclib.aboutYoutubeSecondBoard3 =  'Personne ne peut bloquer votre compte ou supprimer vos vidéos et abonnés';
____loclib.aboutYoutubeSecondBoard4 = 'Aucune information personnelle des utilisateurs';
____loclib.aboutYoutubeSecondBoard5 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde, même si le domaine n’est pas accessible.';
____loclib.aboutYoutubeSecondBoard6 = 'Gardez vos abonnés pour toujours, ils sont à vous';
____loclib.aboutYoutubeSecondBoard7 = 'Bastyon ne supprimera pas vos abonnés, vos vidéos et votre argent!';
____loclib.aboutYoutubeSecondBoard8 = 'Vous ne serez jamais DÉMONÉTISÉ et vous conservez 100% du produit de l’annonce. La liberté d’expression est réelle.' ;
____loclib.aboutYoutubeSecondBoard9 = 'Vous gagnerez PLUS pour poster vos vidéos!';

____loclib.aboutYoutubeThirdBoard1 = 'Propriété du compte';
____loclib.aboutYoutubeThirdBoard2 = 'Propriété de YouTube.';
____loclib.aboutYoutubeThirdBoard3 = 'Votre clé privée vous appartient';
____loclib.aboutYoutubeThirdBoard4 = 'Censure';
____loclib.aboutYoutubeThirdBoard5 = 'Oui, censure sélective et arbitraire';
____loclib.aboutYoutubeThirdBoard6 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modéré';
____loclib.aboutYoutubeThirdBoard7 = 'Code de source ouverte';
____loclib.aboutYoutubeThirdBoard8 = 'NON.';
____loclib.aboutYoutubeThirdBoard9 = 'Oui, ouvert à tous';
____loclib.aboutYoutubeThirdBoard10 = 'Mêmes règles pour tous' ;
____loclib.aboutYoutubeThirdBoard11 = 'Oui, basé sur du code open source';
____loclib.aboutYoutubeThirdBoard12 = 'Monétisation';
____loclib.aboutYoutubeThirdBoard13 = 'YouTube partage ce qu’il veut';
____loclib.aboutYoutubeThirdBoard14 = '100% au blogueur';
____loclib.aboutYoutubeThirdBoard15 = 'Et si le domaine était bloqué dans un pays?';
____loclib.aboutYoutubeThirdBoard16 = 'YouTube est inaccessible';
____loclib.aboutYoutubeThirdBoard17 = 'Bastyon fonctionne directement avec les nœuds';
____loclib.aboutYoutubeThirdBoard18 = 'Cryptomonnaie interne pour la monétisation et les paiements';
____loclib.aboutYoutubeThirdBoard19 = 'Non';
____loclib.aboutYoutubeThirdBoard20 = 'Oui';
____loclib.aboutYoutubeThirdBoard21 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
____loclib.aboutYoutubeThirdBoard22 = 'Non';
____loclib.aboutYoutubeThirdBoard23 = 'Oui';
____loclib.aboutYoutubeThirdBoard24 = 'Informations personelles';
____loclib.aboutYoutubeThirdBoard25 = 'Nom, numéro de téléphone';
____loclib.aboutYoutubeThirdBoard26 = 'Non';






____loclib.aboutYoutubeThirdBoard18 = 'Signaler des vidéos';
____loclib.aboutYoutubeThirdBoard19 = 'OUI, les algorithmes YouTube analysent les vidéos et les suppriment ou les bloquent automatiquement s’ils estiment qu’ils sont contraires à la politique. En outre, YouTube peut supprimer des publications et bannir des utilisateurs à sa seule discrétion.'
____loclib.aboutYoutubeThirdBoard20 = 'OUI, mais seuls les utilisateurs ayant une grande réputation peuvent signaler une publication et une publication est rendue « invisible » sur la page de flux (mais reste disponible sur la page de profil de l’utilisateur) uniquement si plusieurs dizaines d’utilisateurs de grande réputation le signalent (les rapports ne peuvent être faits que pour racisme, discours de haine et pornographie).';
____loclib.aboutYoutubeThirdBoard21 = 'Hashtags pour classer les vidéos';
____loclib.aboutYoutubeThirdBoard22 = 'Les vidéos peuvent être partagés sur plusieurs plateformes';
____loclib.aboutYoutubeThirdBoard23 = 'Interdictions de dictature';
____loclib.aboutYoutubeThirdBoard24 = 'Beaucoup trop!';
____loclib.aboutYoutubeThirdBoard25 = 'Bastyon vous paie beaucoup plus que YouTube!';
____loclib.aboutYoutubeThirdBoard26 = 'Vous pouvez gagner de l’argent avec Bastyon.';
____loclib.aboutYoutubeThirdBoard27 = 'Bastyon utilise sa propre crypto-monnaie:';
____loclib.aboutYoutubeThirdBoard28 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
____loclib.aboutYoutubeThirdBoard29 = 'Chaque fois qu’une de vos vidéos obtient 15k vues, plus 1250 réactions et 1000 utilisateurs référents, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!!';
____loclib.aboutYoutubeThirdBoard30 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
____loclib.aboutYoutubeThirdBoard31 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';

____loclib.aboutYoutubeOpenBoard1 = 'Découvrez Bastyon';
____loclib.aboutYoutubeOpenBoard2 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
____loclib.aboutYoutubeOpenBoard3 = 'Site internet officiel';

____loclib.sourceCode = 'Code Source';

____loclib.aboutYoutubeDiscover1 = 'Rejoignez Bastyon aujourd’hui et appropriez-vous votre destin!';
____loclib.aboutYoutubeDiscover2 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';
////////////////////////////////////////////////////Twitter
____loclib.aboutMainBoard = 'Bastyon, La meilleure alternative à Twitter. Laissez derrière vous les interdictions et les suspensions.' ;
____loclib.aboutMainBoard1 = 'Réseau social gratuit, privé et sécurisé';

____loclib.aboutTwitterMainDescriptionText1 = 'Certaines personnes nous demandent:';
____loclib.aboutTwitterMainDescriptionText2 = '"Pourquoi devrais-je utiliser Bastyon?"';
____loclib.aboutTwitterMainDescriptionText3 = 'La vraie question est:';
____loclib.aboutTwitterMainDescriptionText4 = '"Pourquoi devriez-vous utiliser Twitter?!"';
____loclib.aboutTwitterMainDescriptionText5 =  'TWITTER AGIT COMME UN GOUVERNEMENT DICTATORIQUE';
____loclib.aboutTwitterMainDescriptionText6 = 'Oui, nous savons que c’est une déclaration forte.';
____loclib.aboutTwitterMainDescriptionText7 =  'Mais malheureusement, c’est ce qui s’est passé sur Twitter.';

____loclib.aboutTwitterThreeColumn1 = 'Beaucoup, beaucoup trop de comptes ont été interdits ces dernières années. Certains d’entre eux sans aucune raison.' ;
____loclib.aboutTwitterThreeColumn2 = 'Autres simplement parce qu’ils étaient d’un côté politique spécifique (conservateur)';
____loclib.aboutTwitterThreeColumn3 = 'Ici, vous trouverez ci-dessous une courte liste des comptes qui ont été interdits ou suspendus par Twitter, ainsi que la raison.' ;
____loclib.aboutTwitterThreeColumn4 = 'Vous pouvez faire vos propres considérations: vous pouvez facilement réaliser comment Twitter a banni des gens pour plusieurs raisons non spécifiées, pour avoir simplement dit que le chef des talibans était pro-charia, pour avoir soutenu le mouvement « Occupé » sans enfreindre aucune politique.' ;
____loclib.aboutTwitterThreeColumn5 = 'C’est le genre de censure que nous ne voulons pas sur Bastyon, et c’est pourquoi le protocole a été créé en premier lieu';

____loclib.aboutTitterBannedAcc1 = 'Construire une communauté sur Twitter, c’est comme construire une maison sur un terrain que vous ne possédez pas.';
____loclib.aboutTitterBannedAcc2 = 'Cliquez ici pour voir la liste des comptes interdits par Twitter en 2019';
____loclib.aboutTitterBannedAcc3 = 'Compte';
____loclib.aboutTitterBannedAcc4 = 'Wikipédia';
____loclib.aboutTitterBannedAcc5 = 'Individuel/compte';
____loclib.aboutTitterBannedAcc6 = 'Description';
____loclib.aboutTitterBannedAcc7 = 'Date';
____loclib.aboutTitterBannedAcc8 = 'Durée';
____loclib.aboutTitterBannedAcc9 = 'Raison de la suspension';
____loclib.aboutTitterBannedAcc10 = 'Abonnés au moment de la suspension';
____loclib.aboutTitterBannedAcc11 = '“Darren Mills” ';
____loclib.aboutTitterBannedAcc12 = 'Compte lié à la Russie ';

____loclib.aboutTitterBannedAcc13 = '43285';
____loclib.aboutTitterBannedAcc14 = 'Permanent';
____loclib.aboutTitterBannedAcc15 = 'Démasqué en tant que personne fictive exploitée par une usine de trolls russe.';

____loclib.aboutTitterH3Section1 = 'Pourquoi Bastyon?';
____loclib.aboutTitterH3Section2 = 'AUCUN CONTROL GOUVERNEMENTAL';
____loclib.aboutTitterH3Section3 = 'Bastyon fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal Bastyon.com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à Bastyon.' ;
____loclib.aboutTitterH3Section4 = 'PRIVÉ ET SÉCURISÉ';
____loclib.aboutTitterH3Section5 = 'Bastyon ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;
____loclib.aboutTitterImgAndText1 = 'AUCUNE CENSURE';
____loclib.aboutTitterImgAndText2 ='Bastyon ne censurera pas vos publications et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.'
____loclib.aboutTitterImgAndText3 = 'Contrairement à Twitter, Bastyon n’applique pas une méthode de type dictature pour supprimer le contenu et les utilisateurs. Il existe une liste longue de personnes qui ont été bannies, temporairement ou définitivement, par Twitter pour des raisons superficielles ou sans raison apparente du tout.' ;
____loclib.aboutTitterImgAndText4 = 'Sur Bastyon, les interdictions sont tout simplement impossibles: elles sont basées sur la blockchain et personne n’a le pouvoir d’en annuler un blocage. Chaque message restera toujours là. Même si un administrateur ou un utilisateur veut interdire vos publications, il ne pourra jamais le faire.' ;
____loclib.aboutTitterImgAndText5 = 'La censure est interdite par la technologie elle-même. Même si un jour les créateurs de Bastyon veulent fermer la plateforme, les messages seront toujours là et le réseau social pourra être recréé à partir du même point où il a été laissé.' ;
____loclib.aboutTitterImgAndText6 = 'AUCUNE ENTREPRISE DERRIÈRE BASTYON';
____loclib.aboutTitterImgAndText7 = 'Contrairement à Twitter et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon. Pas d’interdictions, pas de censure.' ;
____loclib.aboutTitterImgAndText8 = 'Contrairement à Twitter...';
____loclib.aboutTitterImgAndText9 = 'Vous ne serez jamais bloqué ou banni pour avoir simplement soutenu vos idées, vos religions, vos mouvements sans blesser les autres.' ;
____loclib.aboutTitterImgAndText10 = 'Personne ne peut bloquer votre compte ou supprimer vos publications. ' ;
____loclib.aboutTitterImgAndText11 = 'La confidentialité est complète et garantie' ;
____loclib.aboutTitterImgAndText12 = 'L’accès est toujours possible depuis n’importe quel pays et région du monde' ;
____loclib.aboutTitterImgAndText13 = 'Les sessions de chat sont entièrement privées et cryptées et même Bastyon ne peut y accéder. Pas même avec un mandat d’arrêt du tribunal.' ;
____loclib.aboutTitterImgAndText14 = 'Vos publications peuvent être plus longues';



____loclib.aboutTitterTable1 = 'TWITTER';
____loclib.aboutTitterTable2 = 'BASTYON';
____loclib.aboutTitterTable3 = 'Propriété du compte';
____loclib.aboutTitterTable4 = 'Propriété de Twitter';
____loclib.aboutTitterTable5 = 'Votre clé privée vous appartient';
____loclib.aboutTitterTable6 = 'Vous accédez à votre audience';
____loclib.aboutTitterTable7 = 'Tous vos abonnés ne voient pas votre publication, Facebook contrôle la proportion de l’audience qui la voit';
____loclib.aboutTitterTable8 = 'Chaque abonné voit votre publication';
____loclib.aboutTitterTable9 = 'Censure';
____loclib.aboutTitterTable10 = 'Oui, censure sélective et arbitraire, beaucoup de shadowbanning';
____loclib.aboutTitterTable11 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modérés';
____loclib.aboutTitterTable12 = 'Code de source ouverte ';
____loclib.aboutTitterTable13 = 'Non';
____loclib.aboutTitterTable14 = 'Oui, ouvert à tous';
____loclib.aboutTitterTable15 = 'Les mêmes règles pour tous';
____loclib.aboutTitterTable16 = 'Non';
____loclib.aboutTitterTable17 = 'Oui, basé sur du code open source';
____loclib.aboutTitterTable18 = 'Monétisation';
____loclib.aboutTitterTable19 = "Twitter partage ce qu'il veut";
____loclib.aboutTitterTable20 = '100% au blogueur via PKOIN';
____loclib.aboutTitterTable21 = 'Et si le domaine était bloqué dans un pays?';
____loclib.aboutTitterTable22 = 'Twitter est inaccessible';
____loclib.aboutTitterTable23 = 'Bastyon fonctionne directement avec les nœuds';
____loclib.aboutTitterTable24 = 'Messages personnels';
____loclib.aboutTitterTable25 = 'Twitter peut lire tous les messages';
____loclib.aboutTitterTable26 = 'Bastyon utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
____loclib.aboutTitterTable27 = 'Cryptomonnaie interne pour la monétisation et les paiements';
____loclib.aboutTitterTable28 = 'Non';
____loclib.aboutTitterTable29 = 'Oui';
____loclib.aboutTitterTable30 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
____loclib.aboutTitterTable31 = 'Non';
____loclib.aboutTitterTable32 = 'Oui';
____loclib.aboutTitterTable33 = 'information personnelle';
____loclib.aboutTitterTable34 = 'Nom, numéro de téléphone';
____loclib.aboutTitterTable35 = 'Non';



____loclib.aboutTitterMainBoard31 = 'Et il y a plus! Bastyon vous paie. »';
____loclib.aboutTitterMainBoard32 = 'Vous pouvez gagner de l’argent avec Bastyon.';
____loclib.aboutTitterMainBoard33 = 'Bastyon utilise sa propre crypto-monnaie:';
____loclib.aboutTitterMainBoard34 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
____loclib.aboutTitterMainBoard35 = 'Chaque fois qu’une de vos vidéos obtient 15 000 vues + 1 250 réactions, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!! »';
____loclib.aboutTitterMainBoard36 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
____loclib.aboutTitterMainBoard37 = 'Contactez-nous pour en savoir plus et pour activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';


____loclib.aboutTitterOpen1 = 'Découvrez Bastyon';
____loclib.aboutTitterOpen2 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.’';
____loclib.aboutTitterOpen3 = 'Site internet officiel';
____loclib.aboutTitterOpen4 = 'Code Source';
____loclib.aboutTitterOpen5 = 'Contactez-nous';
____loclib.aboutTitterOpen6 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';


/////////////aboutFacebook
____loclib.aboutFbMainBoard = 'Bastyon – la meilleure alternative à Facebook';
____loclib.aboutFbMainBoard1 = 'Protocole financier et social';

____loclib.aboutFbMainDesc = '"Bastyon n’est pas une alternative à Facebook. »';
____loclib.aboutFbMainDesc1 = 'Bastyon est Anti-Facebook.';
____loclib.aboutFbMainDesc2 = '-- John Milton';


____loclib.aboutFbH3Section = 'Pourquoi Bastyon';
____loclib.aboutFbH3Section1 = 'AUCUN CONTROL GOUVERNEMENTAL';
____loclib.aboutFbH3Section2 = 'Bastyon fonctionne sur un réseau de nœuds qu’aucun gouvernement ne peut bloquer ou limiter. Même si le site Web principal Bastyon.com est rendu inaccessible ou compromis, la plate-forme fonctionne toujours normalement. Un gouvernement ne peut pas imposer sa censure ou ses limites à Bastyon. '
____loclib.aboutFbH3Section3 = 'PRIVÉ ET SÉCURISÉ';
____loclib.aboutFbH3Section4 = 'Bastyon ne collecte aucune information personnelle. Pas d’adresse IP, pas d’e-mail, pas de numéro de téléphone. Nous croyons en une véritable protection de la vie privée et en la sécurité des données.' ;



____loclib.aboutFbImgAndText = 'AUCUNE CENSURE';
____loclib.aboutFbImgAndText2 = 'Bastyon ne censurera pas vos messages et vidéos. Même les administrateurs ne peuvent pas bloquer votre compte et vous bannir.' ;
____loclib.aboutFbImgAndText3 = 'Bastyon est basé sur la blockchain: il n’y a aucun moyen, du tout, de supprimer des messages. Chaque message est enregistré sur la blockchain et, pour sa nature, il ne peut pas être supprimé. Par n’importe qui.';
____loclib.aboutFbImgAndText4 = 'AUCUNE ENTREPRISE DERRIÈRE BASTYON';
____loclib.aboutFbImgAndText5 = 'Contrairement à Facebook et aux principaux réseaux sociaux, il n’y a pas d’entreprise derrière Bastyon. C’est un projet open source. Cela signifie qu’il n’y a pas d’entreprise qui peut contrôler les contenus publiés sur Bastyon. Pas d’interdictions, pas de censure.' ;
____loclib.aboutFbImgAndText6 = 'Contrairement à Facebook…';
____loclib.aboutFbImgAndText7 = 'Vos données personnelles ne sont pas vendues à des sociétés externes ' ;
____loclib.aboutFbImgAndText8 = 'Pas de censure arbitraire ';
____loclib.aboutFbImgAndText9 = 'Ne prends aucune information personnelle';
____loclib.aboutFbImgAndText10 = 'Aucune société derrière cela ';
____loclib.aboutFbImgAndText11 = 'Les sessions de chat sont entièrement privées et cryptées et même Bastyon ne peut y accéder. ';
____loclib.aboutFbImgAndText12 = 'Mark Zuckerberg ne vous dérangera pas!';



____loclib.aboutFbTable = 'FACEBOOK';
____loclib.aboutFbTable1 = 'BASTYON';
____loclib.aboutFbTable2 = 'Propriété du compte';
____loclib.aboutFbTable3 = 'Propriété de Facebook';
____loclib.aboutFbTable4 = 'Votre clé privée vous appartient';
____loclib.aboutFbTable5 = 'Vous accédez à votre audience';
____loclib.aboutFbTable6 = 'Tous vos abonnés ne voient pas votre publication, Facebook contrôle la proportion de l’audience qui la voit';
____loclib.aboutFbTable7 = 'Chaque abonné voit votre publication';
____loclib.aboutFbTable8 = 'Censure';
____loclib.aboutFbTable9 = 'Oui, censure sélective et arbitraire';
____loclib.aboutFbTable10 = 'La communauté modère le contenu avec seulement quelques sujets tels que la pornographie et le contenu illicite modérés';
____loclib.aboutFbTable11 = 'Code de source ouverte ';
____loclib.aboutFbTable12 = 'Non';
____loclib.aboutFbTable13 = 'Oui, ouvert à tous';
____loclib.aboutFbTable14 = 'Les mêmes règles pour tous';
____loclib.aboutFbTable15 = 'Non';
____loclib.aboutFbTable16 = 'Oui, basé sur du code open source';
____loclib.aboutFbTable17 = 'Monétisation';
____loclib.aboutFbTable18 = 'Facebook partage ce qu’il veut';
____loclib.aboutFbTable19 = '100% au blogueur via PKOIN';
____loclib.aboutFbTable20 = 'Et si le domaine était bloqué dans un pays?';
____loclib.aboutFbTable21 = 'Facebook est inaccessible';
____loclib.aboutFbTable22 = 'Bastyon fonctionne directement avec les nœuds';
____loclib.aboutFbTable23 = 'Messages personnels';
____loclib.aboutFbTable24 = 'Facebook peut lire chaque message';
____loclib.aboutFbTable25 = 'Bastyon utilise le cryptage peer-to-peer pour les chats 1 contre 1, personne ne peut les lire';
____loclib.aboutFbTable26 = 'Mark Zuckerberg';
____loclib.aboutFbTable27 = 'Toujours à vos côtés';
____loclib.aboutFbTable28 = 'NON!';
____loclib.aboutFbTable29 = 'Cryptomonnaie interne pour la monétisation et les paiements'
____loclib.aboutFbTable30 = 'Non';
____loclib.aboutFbTable31 = 'Oui';
____loclib.aboutFbTable32 = 'Possibilité d’envoyer des crypto-monnaies dans les messages de chat';
____loclib.aboutFbTable33 = 'Non';
____loclib.aboutFbTable34 = 'Oui';
____loclib.aboutFbTable35 = 'informations personnelles';
____loclib.aboutFbTable36 = 'Nom, numéro de téléphone';
____loclib.aboutFbTable37 = 'Non';



____loclib.aboutFbMainBoard3 = 'Et il y a plus! Bastyon vous paie.' ;
____loclib.aboutFbMainBoard31 = 'Vous pouvez gagner de l’argent avec Bastyon.';
____loclib.aboutFbMainBoard32 = 'Bastyon utilise sa propre crypto-monnaie: ';
____loclib.aboutFbMainBoard33 = 'Chaque fois que vos publications et vidéos reçoivent des commentaires et des likes, vous obtenez PKOIN.';
____loclib.aboutFbMainBoard34 = 'Chaque fois qu’une de vos vidéos obtient 15 000 vues + 1 250 réactions, vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE À DURÉE LIMITÉE !!! ';
____loclib.aboutFbMainBoard34 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
____loclib.aboutFbMainBoard35 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez poster un nombre illimité de vidéos et être payé!';


____loclib.aboutFbOpen = 'Découvrez Bastyon';
____loclib.aboutFbOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.’'; 
____loclib.aboutFbOpen2 = 'Site internet officiel';
____loclib.aboutFbOpen3 = 'Code Source';
____loclib.aboutFbOpen4 = 'Contactez-nous';
____loclib.aboutFbOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!'; 


/////aboutHIW

____loclib.aboutHowItWMainBoard = 'COMMENT BASTYON RÉSISTE-T-IL À LA CENSURE?';
____loclib.aboutHowItWMainBoard1 = 'GRATUIT, PRIVÉ, SÉCURISÉ ET SANS CONTRÔLE D’ENTREPRISE.';
____loclib.aboutHowItWMainBoard2 = 'PROFITEZ DE L’AIR FRAIS DE BASTYON.';



____loclib.aboutHowItWMD = '"Bastyon est le Bitcoin des réseaux sociaux."';



____loclib.aboutHowItWImgAndText = 'Basé sur le Blockchain';
____loclib.aboutHowItWImgAndText1 = 'Qu’est-ce qu’un blockchain?';
____loclib.aboutHowItWImgAndText2 = 'Comme le mentionne Wikipédia, « Une blockchain est une liste croissante d’enregistrements, appelés blocs, qui sont liés entre eux à l’aide de la cryptographie. ';

____loclib.aboutHowItWImgAndText3 = 'Il est également décrit comme un « stockage de données immuable peer-to-peer sans confiance et entièrement décentralisé » qui est réparti sur un réseau de participants souvent appelés nœuds. Chaque bloc contient un hachage cryptographique du bloc précédent, un horodatage et des données de transaction.' ;
____loclib.aboutHowItWImgAndText4 = 'L’horodatage prouve que les données de transaction existaient lorsque le bloc a été publié afin d’entrer dans son hachage.';
____loclib.aboutHowItWImgAndText5 = 'Comme les blocs contiennent chacun des informations sur le bloc précédent, ils forment une chaîne, chaque bloc supplémentaire renforçant ceux qui le précèdent.';
____loclib.aboutHowItWImgAndText6 = 'Par conséquent, les blockchains sont résistantes à la modification de leurs données car une fois enregistrées, les données d’un bloc donné ne peuvent pas être modifiées rétroactivement sans modifier tous les blocs suivants."';
____loclib.aboutHowItWImgAndText7 = 'Alors, comment la blockchain protège-t-elle de la censure?';
____loclib.aboutHowItWImgAndText8 = 'Des Bitcoins à Bastyon.';
____loclib.aboutHowItWImgAndText9 = 'La blockchain est la technologie derrière toutes les crypto-monnaies. Bitcoins, Ethereum, Dogecoins et ainsi de suite sont tous alimentés par la Blockchain.';
____loclib.aboutHowItWImgAndText10 = 'Le principe est simple: ce qui se passe sur la blockchain, reste sur la blockchain. Pour toujours.' ;
____loclib.aboutHowItWImgAndText11 = 'Tous les blocs existants de la blockchain sont immuables et permanents. ';
____loclib.aboutHowItWImgAndText12 = 'Pensez à la crypto-monnaie: lorsque vous envoyez des Bitcoins (ou des parties de ceux-ci) à quelqu’un, la transaction est enregistrée sur la blockchain.';
____loclib.aboutHowItWImgAndText13 = 'À partir de ce moment, la transaction ne peut plus être annulée, modifiée, modifiée, supprimée, suspendue, modifiée dans aucune de ses parties. Il est là et y reste pour toujours. Et vous pouvez explorer les blocs de la blockchain pour voir toutes les transactions.' ;
____loclib.aboutHowItWImgAndText14 = 'Bastyon fonctionne EXACTEMENT de la même manière. Chaque publication, chaque compte, chaque vidéo est enregistrée sur la blockchain. Et une fois sur le site, il ne peut pas être enlevé.' ;
____loclib.aboutHowItWImgAndText15 = 'En effet, Bastyon travaille sur un fork de la blockchain Bitcoin originale.';
____loclib.aboutHowItWImgAndText16 = 'Résistant à la censure';
____loclib.aboutHowItWImgAndText17 = 'Pas seulement le Blockchain.';
____loclib.aboutHowItWImgAndText18 = 'Bastyon n’appartient pas à une société';
____loclib.aboutHowItWImgAndText19 = 'Bastyon est un projet open-source';
____loclib.aboutHowItWImgAndText20 = 'Bastyon fonctionne sur un réseau de nœuds décentralisés, si vous utilisez l’application de bureau Bastyon, elle parle directement aux nœuds du monde entier';
____loclib.aboutHowItWImgAndText21 = 'De plus, même si un gouvernement veut supprimer un message, c’est techniquement impossible.';
____loclib.aboutHowItWImgAndText22 = 'De même, comme il fonctionne sur un réseau de nœuds, il n’y a aucun moyen de limiter l’accès à Bastyon. Même dans le cas où un gouvernement bloque l’accès à https://bastyon.com, vous pourrez toujours y accéder à l’aide de l’application mobile ou de bureau, qui se connecte directement aux nœuds.' ;
____loclib.aboutHowItWImgAndText23 = 'Protection de la vie privée,';
____loclib.aboutHowItWImgAndText24 = 'pour votre sécurité';
____loclib.aboutHowItWImgAndText25 = 'Bastyon ne sait pas qui vous êtes.';
____loclib.aboutHowItWImgAndText26 = 'Bastyon NE collecte AUCUNE information personnelle.';
____loclib.aboutHowItWImgAndText27 = 'Vous pouvez vous inscrire sans révéler votre numéro de téléphone (seul l’e-mail est requis)' ;
____loclib.aboutHowItWImgAndText28 = 'Bastyon ne demande pas votre vrai nom pour protéger la dissidence';
____loclib.aboutHowItWImgAndText29 = 'Bastyon ne collecte pas d’adresses IP et ne vous suit pas' ;
____loclib.aboutHowItWImgAndText291 = 'Bastyon autorise plusieurs comptes à des fins différentes ';
____loclib.aboutHowItWImgAndText30 ='Bastyon ne saura jamais qui vous êtes, à moins que vous ne partagiez explicitement vos données personnelles.';
____loclib.aboutHowItWImgAndText31 = 'Si vous ne partagez pas vos données, personne, aucune entreprise, aucun gouvernement, ne peut savoir qui vous êtes.';


____loclib.aboutHowItWImgAndText51 = 'Pourquoi la crypto-monnaie est-elle bonne pour la liberté?';
____loclib.aboutHowItWImgAndText52 = 'Certaines personnes pensent que la monnaie numérique est un outil d’esclavage. Ironiquement, beaucoup de ces personnes portent des cartes bancaires avec un micro-navire dans leurs poches. Cartes bancaires qui suivent chaque achat et sont directement liées à votre identité. La raison pour laquelle la crypto-monnaie est bonne pour la liberté est qu’elle n’est pas liée à votre identité. Tant dans Bitcoin que dans Pocketcoin, chaque utilisateur peut créer des millions d’adresses et les modifier autant que nécessaire.' ;


____loclib.HIVTable1 = 'Carte de crédit';
____loclib.HIVTable2 = 'Argent';
____loclib.HIVTable3 = 'Crypto-monnaie';
____loclib.HIVTable4 = 'Lié à votre identité';
____loclib.HIVTable5 = 'Oui';
____loclib.HIVTable6 = 'Non';
____loclib.HIVTable7 = 'Non';
____loclib.HIVTable8 = 'Le gouvernement contrôle la masse monétaire';
____loclib.HIVTable9 = 'Oui';
____loclib.HIVTable10 = 'Oui';
____loclib.HIVTable11 = 'Non';
____loclib.HIVTable12 = 'Anonymement';
____loclib.HIVTable13 = 'Non-Anonyme';
____loclib.HIVTable14 = 'Anonyme';
____loclib.HIVTable15 = 'Pseudonyme';
____loclib.HIVTable16 = 'Facile à payer sur de grandes distances';
____loclib.HIVTable17 = 'Oui';
____loclib.HIVTable18 = 'Non';
____loclib.HIVTable19 = 'Oui';
____loclib.HIVTable20 = 'Transparent, ouvert au public';
____loclib.HIVTable21 = 'Non';
____loclib.HIVTable22 = 'Non';
____loclib.HIVTable23 = 'Oui';




____loclib.aboutHowItWImgAndText32 = 'Et il y a plus!';
____loclib.aboutHowItWImgAndText33 = 'Bastyon vous paie';
____loclib.aboutHowItWImgAndText34 = 'Vous pouvez gagner de l’argent avec Bastyon.';
____loclib.aboutHowItWImgAndText35 = 'Bastyon utilise sa propre crypto-monnaie:';
____loclib.aboutHowItWImgAndText36 = 'Chaque fois que vos messages reçoivent des commentaires et des likes, vous obtenez PKOIN.';
____loclib.aboutHowItWImgAndText37 = 'Chaque fois que votre vidéo obtient 15 000 vues + 750 réactions « 5 étoiles », vous obtenez 1 000 $ en PKOIN (vous pouvez les convertir en USD!). IL S’AGIT D’UNE OFFRE D’UNE DURÉE LIMITÉE!!! ';
____loclib.aboutHowItWImgAndText38 = 'Chaque fois que quelqu’un rejoint Bastyon avec votre lien de parrainage, vous obtenez PKOIN.';
____loclib.aboutHowItWImgAndText39 = 'Contactez-nous pour en savoir plus et activer votre compte en tant que « CRÉATEUR » afin que vous puissiez publier un nombre illimité de vidéos et être payé!';
____loclib.aboutHowItWImgAndText40 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte Bastyon et accéder au programme de bonus.';
____loclib.aboutHowItWImgAndText41 = 'Contactez-nous maintenant!';


____loclib.aboutHowItWOpen = 'Découvrez Bastyon';
____loclib.aboutHowItWOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
____loclib.aboutHowItWOpen2 = 'Site internet officiel';
____loclib.aboutHowItWOpen3 = 'Code Source';
____loclib.aboutHowItWOpen4 = 'Contactez-nous';
____loclib.aboutHowItWOpen5 = 'Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!';

//aboutContentCreator

____loclib.ContentCreatorsMainBoard = 'Excellent programme de bonus pour les créateurs de contenu';
____loclib.ContentCreatorsMainBoard1 = '"Il existe de nombreuses façons de gagner de l’argent avec Bastyon..."';


____loclib.ContentCreatorsImgAndText = 'Publiez vos vidéos';
____loclib.ContentCreatorsImgAndText1 = 'Publiez vos vidéos sur Bastyon';
____loclib.ContentCreatorsImgAndText2 = '15 000 vides, 1250 réactions de différents utilisateurs et 1000 utilisateurs invités sur votre chaîne';
____loclib.ContentCreatorsImgAndText3 = 'Vous rapporte 1 000 $ payés en Bitcoin ou PKOIN';
____loclib.ContentCreatorsImgAndText4 = 'Prochaine étape: contactez-nous pour faire vérifier votre compte Bastyon et accéder au programme de bonus.';
____loclib.ContentCreatorsImgAndText5 = 'Contactez-nous maintenant!';
____loclib.ContentCreatorsImgAndText6 = 'Invitez vos abonnés';
____loclib.ContentCreatorsImgAndText7 = 'Partagez votre lien de parrainage personnel';
____loclib.ContentCreatorsImgAndText8 = 'Invitez vos followers depuis d’autres plateformes (Youtube, Instagram, Facebook, Twitter...)';
____loclib.ContentCreatorsImgAndText9 = 'Gagnez à partir des publications de vos abonnés!';
____loclib.ContentCreatorsImgAndText10 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
____loclib.ContentCreatorsImgAndText11 = 'Contactez-nous maintenant!';
____loclib.ContentCreatorsImgAndText12 = 'Gagnez de chaque publication';
____loclib.ContentCreatorsImgAndText13 = 'Chaque fois que votre message reçoit un like ou un commentaire, vous recevez une petite récompense';
____loclib.ContentCreatorsImgAndText14 = 'Plus vous publiez, plus vous gagnez';
____loclib.ContentCreatorsImgAndText15 = 'Plus vous avez d’abonnés, plus vous gagnez';
____loclib.ContentCreatorsImgAndText16 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
____loclib.ContentCreatorsImgAndText17 = 'Contactez-nous maintenant!';
____loclib.ContentCreatorsImgAndText18 = 'Gagnez avec des publicités décentralisées';
____loclib.ContentCreatorsImgAndText19 = 'Les annonces vous arrivent via Bastyon Ad Marketplace';
____loclib.ContentCreatorsImgAndText20 = 'Vous pouvez choisir les annonces à republier sur votre chaîne';
____loclib.ContentCreatorsImgAndText21 = '100% du produit de l’annonce provenant des interactions pour aller dans votre portefeuille';
____loclib.ContentCreatorsImgAndText22 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus.';
____loclib.ContentCreatorsImgAndText23 = 'Contactez-nous maintenant!';
____loclib.ContentCreatorsImgAndText24 = 'Gagner avec les commentaires en vedette';
____loclib.ContentCreatorsImgAndText25 = 'Vos abonnés peuvent joindre PKOIN aux commentaires';
____loclib.ContentCreatorsImgAndText26 = 'Les commentaires avec PKOIN sont présentés sous votre message';
____loclib.ContentCreatorsImgAndText27 = 'Vous pouvez mentionner des commentaires sur l’air encourageant les utilisateurs à ajouter PKOIN';
____loclib.ContentCreatorsImgAndText28 = 'Prochaine étape: contactez-nous pour obtenir votre badge « Vérifié » et accéder au programme de bonus. ';
____loclib.ContentCreatorsImgAndText29 = 'Contactez-nous maintenant!';



____loclib.ContentCreatorsOpen = 'Découvrez Bastyon';
____loclib.ContentCreatorsOpen1 = 'Vous pouvez utiliser Bastyon à partir de votre navigateur ou télécharger l’application mobile et de bureau.';
____loclib.ContentCreatorsOpen2 = 'Site internet officiel';
____loclib.ContentCreatorsOpen3 = 'Code Source';
____loclib.ContentCreatorsOpen4 = 'Contactez-nous';
____loclib.ContentCreatorsOpen5 = "Envoyez-nous un message si vous avez besoin d’aide ou si vous êtes un créateur de contenu, blogueur, influenceur et que vous souhaitez débloquer votre bonus et vérifier votre profil!";
