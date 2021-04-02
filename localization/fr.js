if(typeof loclib == 'undefined' || !loclib)
loclib = {};

loclib.fr = {};

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
____loclib.today = "Aujourd'hui �";	

//authorization

____loclib.id0 = "Connectez-vous � un compte existant";	
____loclib.id1 = "Si vous �tes d�j� inscrit, veuillez vous connecter";	
____loclib.loadqrcode = "Télécharger le code QR";
____loclib.stay = "Rester connecté";
____loclib.signin = "Se connecter";
____loclib.orcreate = "Ou cr�ez un nouveau compte";
____loclib.createnew = "Cr�er un nouveau compte";
____loclib.staysafe = "Ce n'est pas s�r. Voulez-vous continuer?";

// Register a New Account
____loclib.id71 = "Cr�er un nouveau compte";
____loclib.id72 = "D�j� membre? Se connecter";

____loclib.rtip1 = "Prenez note de votre cl� de connexion priv�e!";
____loclib.rtip2 = function(mobile){
var h = "Voici votre mot de passe de cl� priv�e. �crivez-le et assurez-vous d'enregistrer votre code QR" 

if(mobile){ h += 'device' } else { h+='PC' }

h+=' et assurez-vous de ne pas le perdre. Nous ne stockons pas vos donn�es personnelles. La cl� priv�e ne peut pas �tre r�cup�r�e en cas de perte!'

return h 
}

____loclib.generatepkey = "G�n�rer la cl� priv�e";
____loclib.rtip3 = "Notez cette cl� de connexion et enregistrez-la sous forme de code QR. Nous ne stockons pas vos donn�es personnelles. Il ne peut pas �tre r�cup�r� s'il est perdu!";
____loclib.saveqrcode = "Enregistrer le code Qr" 
____loclib.copyprivkey = "Copier la cl� priv�e"
____loclib.rcontinue = "Continuer"
____loclib.idle = "Inactif depuis un certain temps"
____loclib.congratulations = 'Toutes nos f�licitations! Tu es dans <span class="pnlabel">Pocketnet</span>'
____loclib.creatingpreloader = 'La cr�ation du compte'
____loclib.removepaste = "Nous avons supprim� l'option coller pour cette entr�e."
____loclib.filedamaged = "Le fichier ne contient pas de cl� priv�e valide"
____loclib.keysnotmatch = 'La cl� de connexion priv�e ne correspond pas'
____loclib.confirmkey = "Saisissez votre cl� de connexion priv�e ou t�l�chargez le code QR de l'�tape pr�c�dente"
____loclib.successfullycopied = "La cl� a �t� copi�e avec succ�s"
____loclib.urlsuccesscopied = "Le lien a �t� copi� avec succ�s"

____loclib.confirmkeyLabel = "Veuillez confirmer votre cl� priv�e. Saisissez la cl� dans le formulaire ou <b>t�l�chargez le code QR</b>"
____loclib.repeatetocreate = "R�p�tez pour cr�er � nouveau la cl� priv�e"
____loclib.confirmcreate = "Cr�er un compte"


//user activation

____loclib.useractivation = "Activation utilisateur";	
____loclib.wesentmoney = "Nous vous avons envoy� quelques pi�ces pour vous inscrire";	
____loclib.wesentmoneym = "Nous vous avons d�j� envoy� quelques pi�ces pour vous inscrire";


____loclib.wesentmoneydelay = "Le processus prend plus de temps que d'habitude, veuillez patienter un peu plus longtemps";

____loclib.funetworkproblems = "Il y a quelques probl�mes avec la connexion. Merci d'essayer plus tard";

____loclib.pleasewait = "S'il vous pla�t, attendez";	
____loclib.next = "Suivant";	
____loclib.welcometopocketnet = "Bienvenue sur Pocketnet";	
____loclib.continue = "continuer";	

//user page

____loclib.rstate = "R�putation";	
____loclib.rprofile = "Profil";	
____loclib.rsettings = "R�glages";	
____loclib.rwallet = 'Portefeuille';	
____loclib.raccounts = 'Comptes';	
____loclib.rsystem = 'Syst�me';
____loclib.rconnection = 'Connexion';
____loclib.pnetAddress = 'Adresse Pocketnet';	
____loclib.profile = 'Profil';	
____loclib.signout = 'D�connexion';

//send

____loclib.postlabel = "Don pour poste";	
____loclib.donationlabel = "Don";	
____loclib.donationwel = "Si vous souhaitez remercier l'auteur, vous pouvez utiliser une transaction Pocketnet";
____loclib.donationwela = "Transaction Pocketnet";	
____loclib.donationwelan = "Ou vous pouvez utiliser un autre syst�me de paiement crypt�";	
____loclib.successfullycopiedaddress = "L'adresse a �t� copi�e avec succ�s";	

//wallet

____loclib.wrecieve = "Recevoir des pi�ces en partageant l'adresse";	
____loclib.wcopyshare = "Copier et partager l'adresse:";	
____loclib.wqrcode = "code Qr";		
____loclib.wcopeaddress = "Copier l'adresse";	
____loclib.wcreatelink = "Ou cr�ez un lien pour votre paiement";	
____loclib.required = "Requis";	
____loclib.wgetlink = "Obtenir le lien";	
____loclib.waddresses = "Adresses";	
____loclib.waddress = "Adress";	
____loclib.wbalance = "Solde";	
____loclib.wpercente = "Pour cent";	
____loclib.waddaddress = "Explorer une nouvelle adresse Google Wallet";	
____loclib.wrecieve = "Recevoir";	
____loclib.wrecieveon = "Recevoir sur";	
____loclib.wcopyshareorcreate = "Copier et partager l'adresse ou cr�er un lien de paiement";
____loclib.wdgetlink = "Obtenir le lien";	
____loclib.wdqrcode = "code Qr";
____loclib.wdcopyaddress = "Copie l'Adresse";	
____loclib.wdpleasefill = "Veuillez remplir ces champs";
____loclib.wduseqr = "Utilisez ce code QR pour recevoir des fonds";	
____loclib.wdaddress = "Adresse";
____loclib.wdamount = "Quantit�";	
____loclib.wdlabel = "�tiquette";	
____loclib.wdmessage = "Message";	
____loclib.wsend = "Envoyer";
____loclib.calcfeesandsend = "Calculer les frais et envoyer";	
____loclib.wstrfees = "Les frais de transaction";	
____loclib.wsfees = "Frais";	

____loclib.wssendto = "ENVOYER DES PI�CES �";	
____loclib.wssendb = "ENVOYER";	

____loclib.tacaddress = 'Adresse du compte';	
____loclib.twallet = "Portefeuille";	
____loclib.twalletaddresses = "Adresses de portefeuille";	
____loclib.tTotal = "Total";	
____loclib.wsselect = "S�lectionnez la source dans le menu";	
____loclib.wsenter = "Entrez l'adresse ou s�lectionnez dans le menu";	
____loclib.wsreciever = "Adresse du destinataire";	
____loclib.wsamount = "Montant";	
____loclib.wsamountof = "Montant de votre transaction";	
____loclib.wsincludefees = "Inclure les frais dans le montant";	
____loclib.wsrecieverpay = '� payer par le s�questre';	
____loclib.wssenderpay = "� payer par l'exp�diteur";	
____loclib.wdselectfrom = "S�lectionnez dans le menu";	

____loclib.wdenteramount = "Mettre le montant";	
____loclib.wdmessageplaceholder = "A quoi sert cette transaction?";
____loclib.wrenteraddress = "mettre l'adresse";
____loclib.wrenteraddressselect = "Mettez l'adresse ou s�lectionnez dans le menu";
____loclib.wreturntoeallet = "RETOUR AU PORTEFEUILLE";	
____loclib.linkCreated = 'LIEN CR��';
____loclib.waddresswascop = "L'adresse a �t� copi�e avec succ�s";
____loclib.wqrcodecreated = 'CODE QR CR��';
____loclib.wlinkcreating = 'CR�ATION DE LIENS';
____loclib.wqrcodecreating = 'CR�ATION DE CODE QR';
____loclib.wdoptions = 'OPTIONS';
____loclib.wssuccessfully = "Transaction envoy�e avec succ�s";
____loclib.wscalculatefees = 'CALCULER LES FRAIS';
____loclib.wsaddressnotv = "L'adresse n'est pas valide";

//user profile
____loclib.uaddaddressdona = "Ajouter une adresse pour les dons";
____loclib.uaddaddressdonaplace = "Mettre l'adresse";
____loclib.uchangeicon = "Importer une image de profil";
____loclib.utip1 = "Vous devez cr�er un nom et un avatar sur la blockchain avant d'utiliser Pocketnet";
____loclib.utip2 = "Il ne vous reste plus qu'un pas";
____loclib.upicset = "D�finir l'ic�ne de profil";
____loclib.upic = "Ic�ne de Profil";
____loclib.uuserinfo = "informations de l'utilisateur";
____loclib.usave = "Enregistrer";
____loclib.ucancel = "Annuler";
____loclib.uwaitb = "Attendez la confirmation pour enregistrer les informations ";
____loclib.uchanges = "Il n'y a aucun changement";
____loclib.uchangesvalid = "Vous devez t�l�charger une image de profil et cr�er un nom d'utilisateur";
____loclib.uname = "Nom";
____loclib.unickname = "Surnom";
____loclib.ulanguage = "Langue";
____loclib.uabout = "� propos de moi";
____loclib.uwebsite = "Site web";
____loclib.uaddresesd = "Adresses pour les dons";
____loclib.usavechanges = "Voulez-vous enregistrer vos modifications?";

//ustate
____loclib.sreps = "R�putation et limitations";
____loclib.sdisconnected = "D�connect� du n�ud";
____loclib.suseractivation = "Activation utilisateur";
____loclib.sprofile = "Profil";
____loclib.spc = "Nombre de messages";
____loclib.ssc = "Les �toiles comptent";
____loclib.ccc = "Les commentaires comptent";
____loclib.crc = "Nombre de taux de commentaires";
____loclib.stp = "P�riode d'essai";
____loclib.srep = "R�putation";

//accounts
____loclib.aaddedacc = "Comptes ajout�s";
____loclib.acure = "Actuel";
____loclib.aaddacc = "Ajouter un compte";
____loclib.ascheduler = "Planificateur";
____loclib.aused = "Cette adresse est d�j� utilis�e dans un autre pool d'adresses";


//author
____loclib.sub = "S'abonner";
____loclib.unsub = "Se d�sabonner";
____loclib.joined = "Rejoint Pocketnet";
____loclib.shares = "ACTIONS";
____loclib.uposts = "POSTS";
____loclib.myuposts = "MES POSTS";
____loclib.followers = "SUIVEURS";
____loclib.following = "SUIVANT";
____loclib.settings = "G�RER";
____loclib.anofollowers = "Cet utilisateur n'a pas d'abonn�s";
____loclib.aynofollowers = "Vous n'avez pas d'abonn�s";
____loclib.anofollowing = "Cet utilisateur ne suit personne";
____loclib.aynofollowing = "Tu ne suis personne";

//lenta
____loclib.lloadmore = "Chargez plus de messages impressionnants!";
____loclib.lloadprev = "Charger de nouveaux articles g�niaux";


____loclib.lend = "Fin des messages";
____loclib.zerop = "Il n'y a actuellement aucun message de cet auteur";
____loclib.zeroy = "Vous n'avez pas encore de publications, partagez quelque chose!";



____loclib.llogin = 'Vous devez vous connecter avant de pouvoir continuer';
____loclib.lcomlaindialog = "Voulez-vous vraiment signaler ce message?";
____loclib.lunsubscribe = "Voulez-vous vraiment vous d�sabonner de ce compte?";
____loclib.lprivatepublic = "Voulez-vous faire un abonnement priv� ou public?";
____loclib.lprivate = "Priv�";
____loclib.lpublic = "Public";

//share
____loclib.newShare = "Nouveau post";
____loclib.firstShare = "Partagez votre premier message dans Pocketnet";
____loclib.scaption = "Caption";
____loclib.whatsnew = "Quoi de neuf?";
____loclib.saddlink = "Ajouter un lien vers un site externe ou une vid�o";
____loclib.saddimages = "Ajouter des images � la publication";
____loclib.sarticle = "Ecrire un article";
____loclib.stelegram = "Envoyer au t�l�gramme"
____loclib.stimes = "Supprimer le message"


____loclib.snothing = "Rien";
____loclib.sposttime = "Publier par heure";
____loclib.spostnow = "Publier maintenant";
____loclib.stimenotselected = "Heure non s�lectionn�e";
____loclib.spost = "Post";
____loclib.sdate = "Date";
____loclib.stime = "Temps";
____loclib.snotags = "Ajouter une �tiquette";
____loclib.expandvideo = "Cliquez pour agrandir";
____loclib.emptymessage = "Le message est vide";
____loclib.emptytags = "Veuillez ajouter des �tiquettes";
____loclib.emptyutxo = "pas d'argent";
____loclib.networkerror = "erreur r�seau";
____loclib.maximages = "Vous avez droit � un maximum de 6 images";
____loclib.sharenow = "Voulez-vous partager ce contenu maintenant?";
____loclib.pastdate = 'Date pass�e';
____loclib.timenotselected = 'Heure non s�lectionn�e';
____loclib.addtags = 'Ajouter des �tiquettes';
____loclib.tnews = "nouvelles";
____loclib.timages = "images";
____loclib.tvideos = "vid�os";
____loclib.tmarket = "march�";
____loclib.tsport = "sports";

//menu
____loclib.signinmenu = "se connecter";
____loclib.signupmenu = "S'inscrire";
____loclib.aboutmenu = "apprendre encore plus";

//footer
____loclib.aboutus = "� propos de nous";



// Dialog Box Options
____loclib.daccept = "Accepter";
____loclib.dcancel = "Annuler";
____loclib.dyes = "Oui";
____loclib.dno = "Non";
____loclib.dsa = "Ne plus montrer";


// Messages

____loclib.coinbaseSuccess = function(v){
return "F�licitations! Vous avez gagn� " + v + " Pocketcoin pour votre derni�re activit�!"
}
____loclib.coinbaseSuccesspost = function(v){
return "F�licitations! Vous avez gagn� " + v + " Pocketcoin pour vos derniers posts!"
}
____loclib.coinbaseSuccesscomment = function(v){
return "F�licitations! Vous avez gagn� " + v + " Pocketcoin pour vos derniers commentaires!"
}
____loclib.userSent = function(v){
return "envoy� <b>" + v + " POC</b> � vous"
}




____loclib.refferalUserMessage = "F�licitations! Vous avez sauv� quelqu'un du Web censur�. Certaines pi�ces sont en route!"

____loclib.subscribeUserMessage = "t'a suivi"
____loclib.unsubscribeUserMessage = "ne vous suit plus"
____loclib.gotoprofileMessage = "aller au profil"
____loclib.upvoteShareMessage = "a vot� pour votre post"

____loclib.upvoteCommentMessage = " a aim� votre commentaire"

// Errors

____loclib.error = "Erreur";
____loclib.checkScoreError = "Vous devez remplir les informations de profil requises avant d'utiliser Pocketnet. Voulez-vous le faire maintenant?";
____loclib.checkScoreErrorLight = "Le compte n'est pas activ�";
____loclib.timestamperror = "L'heure dans l'application et dans le n�ud ne correspond pas";

// Error Page 404
____loclib.e404 = "ERREUR 404";	
____loclib.e404e = "Page non trouv�e. Retour � la page principale";	
____loclib.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " publications sur une p�riode de 24 heures";
}
____loclib.postLimitLight = function(v){
return "Vous avez atteint votre limite de " + (v || 15) + " classement sur une p�riode de 24 heures";
}

____loclib.doubleLimitLight = "Vous avez d�j� not� ceci";	

____loclib.SelfSubscribeError = "Impossible de s'abonner � vous-m�me";
____loclib.DoubleSubscribeError = "Vous suivez d�j� cet utilisateur";
____loclib.InvalideSubscribeError = "Vous n'�tes pas abonn� � cet utilisateur";
____loclib.ChangeInfoLimitError = "Vous ne pouvez modifier votre profil qu'une fois par heure. Veuillez patienter et r�essayer. ";
____loclib.SelfScoreError = "Vous ne pouvez pas �valuer votre propre message";

____loclib.unexperror10 = "Erreur inconnue (10)";
____loclib.unexperror11 = "Erreur inconnue (11)";
____loclib.unexperror12 = "Erreur inconnue (12)";

____loclib.networkerror = "Il y a quelques probl�mes avec le n�ud";

____loclib.canSpendError = "Vous devez attendre que votre transaction pr�c�dente soit effac�e dans la blockchain. S'il vous pla�t, attendez";
____loclib.noMoneyError  = "Vous ne pouvez pas effectuer d'actions avec un solde de compte nul";



____loclib.waitConf = "Vous devez attendre que votre transaction pr�c�dente soit effac�e dans la blockchain";
____loclib.postWaitConf = "La publication attend une confirmation de la blockchain";



// notifications

____loclib.ntnow = "Maintenant"
____loclib.ntlasthour = "Cette heure"
____loclib.nttoday = "Aujourd'hui"
____loclib.ntmounth = "Ce mois-ci"
____loclib.ntearlier = "Plus t�t"


____loclib.nodeWalletAdd = "L'ajout d'une adresse peut prendre un certain temps. Continuer?"
____loclib.nodeEnableNoteHeader = 'Note'
____loclib.nodeEnableNote = "L'activation d'un n�ud peut prendre jusqu'� 5 Go de RAM. Assurez-vous que vous en avez assez. Bon jalonnement!"


/// 1301

____loclib.address = "Adresse"
____loclib.privatekey = "Cl� priv�e"
____loclib.qrcode = "Code QR"
____loclib.addaccount = "Ajouter un compte"
____loclib.entermnimo = "Entrez une phrase mn�motechnique ou une cl� priv�e"
____loclib.add = "Ajouter"
____loclib.e13011 = "Vous allez maintenant continuer votre enregistrement apr�s avoir install� Pocketnet Desktop."
____loclib.e13012 = "Si Pocketnet pour Windows n'a pas d�marr� le t�l�chargement, veuillez cliquer ici pour l'installer."
____loclib.e13013 = "Saisissez la l�gende de l'image (facultatif)"
____loclib.e13014 = "Ce fichier n'est pas dans un format pris en charge:"
____loclib.e13015 = "Ce fichier est trop gros:"
____loclib.e13016 = "Collez un lien YouTube, Vimeo et appuyez sur Entr�e"
____loclib.e13017 = "Chargement dans Blockchain"
____loclib.e13018 = "Voulez-vous vraiment supprimer cet article?"
____loclib.e13019 = "Nouveau"
____loclib.e13020 = "Escribir art�culo nuevo"
____loclib.youarefollowing = "Estas siguiendo"
____loclib.follow = "S'abonner"
____loclib.blocked = "Bloqu�"
____loclib.e13021 = "Montrer plus"
____loclib.blockuser = "Bloquer l'utilisateur"
____loclib.unblockuser = "D�bloquer l'utilisateur"
____loclib.e13022 = "Voulez-vous vraiment ne plus suivre l'utilisateur?"
____loclib.unfollow = "Se d�sabonner"
____loclib.unblock = "D�bloquer"
____loclib.share = "Partager"
____loclib.info = "Info"
____loclib.e13023 = "Voulez-vous vraiment d�bloquer l'utilisateur?"
____loclib.e13024 = "Votre cl� de connexion priv�e"
____loclib.e13025 = "Cr�er un nouveau compte"
____loclib.e13026 = "Rejoignez Pocketnet - L'avenir du Web gratuit"

____loclib.e13027 = "Restez sign�"
____loclib.e13028 = "Vous avez entr� une cl� priv�e non valide"
____loclib.e13029 = "Le message est vide"
____loclib.e13030 = "Les commentaires ont une limite de 1000 caract�res par commentaire"
____loclib.e13031 = "Partager ce commentaire"
____loclib.e13032 = "Voulez-vous vraiment supprimer votre commentaire?"
____loclib.e13033 = "Le commentaire a �t� supprim�"
____loclib.e13034 = "Oui"
____loclib.e13035 = "Non, annuler"
____loclib.hide = "Cacher"
____loclib.e13036 = "Afficher les commentaires pr�c�dents"
____loclib.e13037 = "r�ponses"
____loclib.remove = "Retirer"
____loclib.e13038 = "Commentez maintenant et gagnez en r�putation"
____loclib.e13039 = "Commentez maintenant et gagnez en r�putation"
____loclib.e13040 = "Vous n'avez pas de privil�ges de commentaire"
____loclib.complain = "Se plaindre"
____loclib.next = "Suivant"
____loclib.post = "Poster"
____loclib.e13041 = "Connexion Pocketnet"
____loclib.e13042 = "Proxy Pocketnet"

____loclib.e13043 = "N�uds Pocketnet"
____loclib.e13044 = "Ajouter un n�ud"
____loclib.e13045 = "N�uds introuvables"
____loclib.e13046 = "Adresse"
____loclib.e13047 = "WS"
____loclib.e13048 = "Nom"
____loclib.e13049 = "Statut"
____loclib.e13050 = "Proxies introuvables"
____loclib.e13051 = "N'utilisez pas de proxy"
____loclib.e13052 = "Impossible de se connecter au proxy"
____loclib.e13053 = "Impossible de se connecter au n�ud"
____loclib.e13054 = "Ajouter un proxy"
____loclib.e13055 = "Modifier le proxy"
____loclib.save = "Sauver"
____loclib.e13056 = "N�ud h�te"
____loclib.close = "Fermer"
____loclib.e13057 = "Merci de compl�ter tous les champs"
____loclib.e13058 = "Vous avez d�j� ce proxy dans la liste."
____loclib.delete = "Supprimer"
____loclib.e13059 = "Voulez-vous vraiment supprimer ce proxy de la liste?"
____loclib.e13060 = "Liste des proxys"
____loclib.e13061 = "Voulez-vous vraiment arr�ter d'utiliser Proxy. C'est dangereux (connexion Http)"

____loclib.e13062 = "Modifier le n�ud"
____loclib.onproxy = "Sur proxy"
____loclib.locally = "Localement"
____loclib.nodehost = "N�ud h�te"
____loclib.e13063 = "Port RPC"
____loclib.e13064 = "Port WS"
____loclib.e13065 = "Nom du n�ud"
____loclib.e13066 = "Veuillez saisir le nom du n�ud"
____loclib.e13067 = "Connexion RPC"
____loclib.e13068 = "Connectez-vous pour obtenir une autorisation PRC"
____loclib.e13069 = "Mot de passe RPC"
____loclib.e13070 = "Mot de passe pour l'autorisation PRC"
____loclib.e13071 = "Merci de compl�ter tous les champs"
____loclib.e13072 = "Merci de compl�ter tous les champs"
____loclib.e13073 = "Voulez-vous vraiment arr�ter d'utiliser Proxy. C'est dangereux (connexion Http)"
____loclib.notselected = "Non s�l�ctionn�"
____loclib.donation = "don"
____loclib.e13074 = "En attente de fonds. L'adresse sera valide pour"
____loclib.sminutes = "minutes"
____loclib.e13075 = "Le d�lai pour cet accord a expir�."
____loclib.reactivate = "R�activer"
____loclib.e13076 = "Scannez ce code pour envoyer"
____loclib.back = "Avant"
____loclib.e13077 = "Ajoutez votre profil � la liste des donateurs"
____loclib.e13078 = "Pourquoi demandons-nous des dons?"
____loclib.e13079 = "Nous avons pass� plus de 14 mois � temps libre � partir d'emplois � temps plein � apporter Pocketnet aux gens. En plus du temps et des efforts, nous avons investi notre propre argent pour aider au lancement de la plateforme. Maintenant, nous avons besoin que la communaut� s'intensifie et nous aide � grandir."
____loclib.e13080 = "Comment les fonds seront-ils utilis�s?"
____loclib.e13081 = "Les fonds seront utilis�s pour acheter de la publicit� et embaucher des experts en la mati�re pour rendre Pocketnet encore plus s�r. L'�quipe de d�veloppement actuelle ne recevra aucun de ces dons. Dans la mesure du possible, nous publierons ici comment nous avons utilis� les fonds. "
____loclib.e13082 = "Ce que vous obtiendrez pour votre don en plus de savoir que vous avez soutenu la libert� "
____loclib.e13083 = "En signe de gratitude pour le don, vous recevrez un cadeau d'une certaine quantit� de Pocketcoin"
____loclib.e13084 = "De plus, lorsque nous construisons une discussion de groupe, vous serez membre d'un groupe sp�cial de donateurs qui auront un acc�s direct � l'�quipe Pocketnet, m�me � mesure que la plate-forme se d�veloppe."
____loclib.e13085 = "Le lien vers votre profil Pocketnet sera r�pertori� ci-dessous, attirant plus de personnes vers vos publications (sauf si vous nous demandez de ne pas le faire)"
____loclib.e13086 = "Soutenez le Web d�centralis� maintenant"
____loclib.e13087 = "Bitcoin, Litecoin, Monero"

____loclib.e13088 = "Membres Pocketnet qui ont fait un don pour soutenir Pocketnet"
____loclib.thankyou = "Merci!"
____loclib.e13089 = "Si vous souhaitez que nous inscrivions votre profil Pocketnet dans la liste des donateurs, veuillez nous envoyer des informations sur votre don"
____loclib.e13090 = "Ajoutez-moi � la liste des donateurs"
____loclib.e13091 = "Ou vous pouvez nous envoyer un e-mail �"
____loclib.e13092 = "avec votre cl� publique et votre montant."
____loclib.finish = "terminer"
____loclib.e13093 = "Veuillez choisir le mode de don"
____loclib.e13094 = "Un probl�me est survenu. Veuillez recharger la page et r�essayer (erreur: 0001)"
____loclib.e13095 = 'Merci de soutenir notre travail pour la libert�. Nous nous assurerons que chaque centime compte.'
____loclib.e13096 = 'Veuillez indiquer le montant du don'
____loclib.e13097 = "Un probl�me est survenu. Veuillez recharger la page et r�essayer (erreur: 0002)"
____loclib.e13098 = "Ajouter un lien vers un site ou une ressource externe"
____loclib.e13099 = "Importer des images"
____loclib.e13100 = "Cliquez ici pour s�lectionner les fichiers � t�l�charger"
____loclib.e13101 = "ou glisser-d�poser"
____loclib.e13102 = "Ajouter un lien vers un site externe"
____loclib.e13103 = "L'URL n'est pas valide"
____loclib.e13104 = "Max 6 images autoris�es"
____loclib.e13105 = "Gestion des n�uds"
____loclib.e13106 = "N�ud Pocketnet"
____loclib.e13107 = "La gestion des n�uds peut �tre effectu�e avec Application"
____loclib.e13108 = "Il n'y a pas de connexion avec l'interface proxy Electron"

____loclib.e13109 = "Veuillez entrer les mots dans l'image pour recevoir Pocketcoin et continuer l'inscription"
____loclib.e13110 = "Entrez les mots"
____loclib.next = "Suivant"
____loclib.refresh = "Rafra�chir"
____loclib.e13111 = "Ajoutez votre e-mail pour obtenir les derni�res mises � jour Pocketnet"
____loclib.e13112 = "Entrer votre email"
____loclib.e13113 = "Ajouter un email"
____loclib.skip = "Passer"
____loclib.e13114 = "Il y a un probl�me avec votre inscription en raison d'une activit� �trange."
____loclib.e13115 = "S'il vous pla�t envoyer un courriel"
____loclib.e13116 = "pour recevoir des pi�ces et ouvrir votre compte."
____loclib.e13117 = "V�rifier le solde"
____loclib.joinnow = "Inscrivez-vous maintenant"
____loclib.loading = "Chargement"
____loclib.e13118 = "Les mots ne correspondent pas"
____loclib.e13119 = "Ajouter un e-mail et continuer"
____loclib.e13120 = "Applications"
____loclib.e13121 = "Il n'y a pas d'images ici"
____loclib.e13122 = "Derniers Commentaires"

____loclib.e13123 = "Afficher plus de messages"
____loclib.e13124 = "Plus de messages Pocketnet impressionnants!"
____loclib.e13125 = "La section des meilleurs messages est vide!"
____loclib.e13126 = "Les messages des personnes que vous suivez seront affich�s ici"
____loclib.e13127 = "Les messages des personnes que vous suivez seront affich�s ici "
____loclib.e13128 = "Les messages des personnes que vous suivez seront affich�s ici"
____loclib.registration = "enregistrement"
____loclib.editpost = "Modifier le post"
____loclib.removepost = "Supprimer le post"


____loclib.reportpost = "D�noncer ce post"
____loclib.donate = "Faire un don"
____loclib.blockuser = "Bloquer un utilisateur"
____loclib.more = "Plus"
____loclib.showmore = "Montrer plus"
____loclib.e13129 = "Images jointes"
____loclib.e13130 = "Edit�"
____loclib.e13131 = "Vous avez bloqu� cet utilisateur"
____loclib.e13132 = "not�"
____loclib.e13133 = "Partager ceci"
____loclib.e13134 = "Il n'y a aucun r�sultat pour cette cha�ne de recherche"
____loclib.e13135 = "L'utilisateur n'a pas de cl� priv�e"
____loclib.e13136 = "Tous les messages"
____loclib.e13137 = "Votre poche"
____loclib.e13138 = "Top posts"
____loclib.e13139 = "RECHERCHE SUR POCKETNET"
____loclib.e13140 = "RECHERCHE SUR"
____loclib.notifications = "Notifications"
____loclib.showall = "Afficher tout"
____loclib.e13141 = "Vous n'avez pas de notifications"

____loclib.recommendations = "Recommandations"
____loclib.e13142 = "J'ai gard� ma cl�, ne me le rappelle plus"
____loclib.e13143 = "Important!"
____loclib.e13144 = "Copier le texte"
____loclib.e13145 = "Enregistrer la cl� sur l'appareil"
____loclib.e13146 = "Fin des messages"
____loclib.e13147 = "Partagez ceci"
____loclib.e13148 = "Voulez-vous vraiment vous plaindre de ce post?"
____loclib.e13149 = "�valuations des utilisateurs"
____loclib.e13150 = "�valuation du message"
____loclib.e13151 = "Personne n'a �valu� ce message"
____loclib.e13152 = "Scores des utilisateurs"
____loclib.e13153 = "Passer et acc�der au site Web"
____loclib.e13154 = "Vos informations de connexion"
____loclib.e13155 = "Pour utiliser Pocketnet, vous devez g�n�rer votre cl� cryptographique priv�e qui remplace le login et le mot de passe des r�seaux sociaux centralis�s."
____loclib.users = "Utilisateurs"
____loclib.userstx = "Utilisateurs"
____loclib.user = "Utilisateurs"
____loclib.postscount = "Nombre de posts"
____loclib.about = "� propos"
____loclib.e13156 = "R�sultats suivants"
____loclib.posts = "Posts"
____loclib.e13157 = "Recherch� par"
____loclib.e13158 = "n'a aucun r�sultat"
____loclib.e13159 = "La phrase de recherche est vide"
____loclib.repost = "Republier"
____loclib.e13160 = "Bonjour Pocketeers!"

____loclib.e13161 = "Ajouter des �tiquettes pour votre message"
____loclib.e13162 = "Vous pouvez saisir moins de 30 �tiquettes"
____loclib.e13163 = "Il n'y a pas de changements dans la publication"
____loclib.e13164 = "Veuillez ajouter quelques mots pour informer Pocketpeople de votre lien. De quoi s'agit-il? Pourquoi c'est important? Quel est ton opinion?"
____loclib.e13165 = "Votre lien vers la vid�o n'est pas valide. Veuillez charger une URL vid�o valide."
____loclib.e13166 = "Vous avez sauv�"
____loclib.e13167 = "les gens du web censur�"
____loclib.e13168 = "Gagnez Pocketcoin pour chaque inscription via votre lien"
____loclib.e13169 = "Lien direct"
____loclib.copy = "Copier"
____loclib.e13170 = "Inclure un appel � l'action pour l'inscription Pocketnet "
____loclib.more = "Plus"
____loclib.e13171 = "Bonne nouvelle. J'ai gagn� mon ind�pendance des monopoles des m�dias sociaux, venez me rejoindre sur pocketnet.app afin que nous puissions partager et discuter de mani�re ind�pendante sur la blockchain. Rejoignez-moi ici"
____loclib.e13172 = "Je souhaite partager cela � partir d'une plate-forme de blockchain d�centralis�e Pocketnet avec vous. J'esp�re que vous le trouverez utile et si vous vous inscrivez, nous aurons tous les deux un bonus de crypto-monnaie Pocketcoin!"
____loclib.e13173 = "Envoy� par email"
____loclib.e13174 = "Partage social"
____loclib.e13175 = "�tiquettes populaires"
____loclib.e13176 = "Type d'adresse"
____loclib.e13177 = "Envoyer la photo"

____loclib.requiredfields = "Champs obligatoires"
____loclib.e13178 = "Non li� � votre profil"
____loclib.e13179 = "Liste non d�pens�e"
____loclib.e13180 = "Votre facture a �t� cr��e avec succ�s"
____loclib.e13181 = "Une erreur s'est produite lors du processus de cr�ation de l'offre"
____loclib.e13182 = "Explorateur de blocs"
____loclib.e13183 = "Centre d'aide"
____loclib.e13184 = "Continuer l'inscription"
____loclib.e13185 = "Connexion perdue"
____loclib.e13186 = "Editer le profil"
____loclib.e13187 = "Contenus"
____loclib.e13188 = "Veuillez enregistrer votre cl� cryptographique priv�e qui remplace le login et le mot de passe des r�seaux sociaux centralis�s"
____loclib.e13189 = "Laissez et perdez ma cl� pour toujours!"
____loclib.e13190 = "Th�me Pocketnet"
____loclib.e13191 = "D�finir le th�me"
____loclib.e13192 = "Niveau"
____loclib.e13193 = "BONUS"
____loclib.e13194 = "R�putation et r�compenses"
____loclib.e13195 = "Limitations"
____loclib.e13196 = "Cela prend beaucoup de temps"
____loclib.e13197 = "Recevoir des Pocketcoins"
____loclib.e13198 = "Le temps d'attente approximatif est"
____loclib.e13199 = "Rejoignez Pocketnet maintenant"

____loclib.e13200 = "Retour � Pocketnet"
____loclib.e13201 = "REJOIGNEZ B�TA"
____loclib.e13202 = "Le test b�ta de Pocketnet d�butera le 24 janvier"
____loclib.e13203 = "Merci d'avoir rejoint la liste de diffusion du test b�ta de Pocketnet. Il n'est pas n�cessaire d'utiliser Pocketnet, cependant, nous utiliserons cet e-mail pour envoyer vos sondages afin d'am�liorer la plateforme. Merci d'avoir contribu� � fa�onner l'avenir d'Internet."
____loclib.e13204 = "Adresse de r�ception Pocketnet"
____loclib.e13205 = "Param�tres"
____loclib.e13206 = "Recevoir un montant Pocketcoin"
____loclib.e13207 = "Envoyer le montant"
____loclib.e13208 = "Disponible"
____loclib.e13209 = "Liste de financement participatif"
____loclib.e13210 = "Nouvelle offre"
____loclib.e13211 = "Copier le lien et partager"
____loclib.amount = "Montant"
____loclib.label = "�tiquette"
____loclib.message = "Message"
____loclib.copylink = "Copier le lien"
____loclib.e13211 = "Veuillez remplir ces champs"
____loclib.e13212 = "Cr�er un code Qr"
____loclib.e13213 = "Recevoir l'adresse"
____loclib.process = "Processus"
____loclib.source = "Source"
____loclib.yourmessage = "Votre message"
____loclib.e13214 = "Montant Pocketcoin"
____loclib.currency = "Devise"


____loclib.e13215 = "S�lectionnez la devise"
____loclib.e13216 = "Montant en devise"
____loclib.e13217 = "Le d�lai pour cet accord a expir�."
____loclib.e13218 = "En attente des confirmations de la blockchain"
____loclib.e13219 = "Vous envoyer des Pocketcoins"
____loclib.e13220 = 'Pocketcoins livr�s'
____loclib.errorreload = "Un probl�me est survenu. Veuillez actualiser la page et r�essayer"
____loclib.e13221 = "Voulez-vous vraiment supprimer des informations sur cette offre? L'accord ne peut pas �tre arr�t�"
____loclib.e13222 = "T�l�chargez l'application de bureau - c'est le moyen le plus r�sistant � la censure d'utiliser Pocketnet. M�me si les sites Web sont ferm�s, l'application de bureau fonctionnera toujours directement via les n�uds."
____loclib.e13223 = "T�l�chargez Pocketnet pour Windows"
____loclib.e13224 = "T�l�charger Pocketnet pour Linux"
____loclib.e13225 = "N�ud Pocketnet"
____loclib.e13226 = 'T�l�charger le n�ud'
____loclib.e13227 = "T�l�chargez Pocketnet Node pour Windows"
____loclib.e13228 = "T�l�charger Pocketnet Node pour Linux"
____loclib.e13229 = 'Cl� priv�e non valide'
____loclib.e13230 = 'Erreur de connexion non d�finie'

____loclib.e13231 = "Connexion perdue"
____loclib.e13232 = "Impossible de se connecter au n�ud"
____loclib.e13233 = 'Ce commentaire a �t� supprim�'
____loclib.e13234 = 'Erreur Opreturn / 41'
____loclib.e13235 = 'Vous ne pouvez pas �valuer le commentaire deux fois'
____loclib.e13236 = 'Ce commentaire a �t� supprim�'
____loclib.e13237 = 'Vous ne pouvez pas vous �valuer'
____loclib.e13238 = "Erreur d'envoi de commentaire. Veuillez patienter et r�essayer / 37"
____loclib.e13239 = "Erreur d'envoi de commentaire / 35"
____loclib.e13240 = "Le commentaire auquel vous r�pondez a �t� supprim� par l'utilisateur"
____loclib.e13241 = 'Ce commentaire est trop long, veuillez le casser'
____loclib.e13242 = "Vous avez �t� bloqu� par cette personne, vous ne pourrez pas commenter ses messages"
____loclib.e13243 = "Vous avez atteint votre limite de commentaires positifs sur une p�riode de 24 heures"
____loclib.e13244 = "Vous avez atteint votre limite de modification des commentaires sur une p�riode de 24 heures"
____loclib.e13245 = "Vous avez atteint votre limite d'envoi de commentaires sur une p�riode de 24 heures"
____loclib.e13246 = "Vous essayez de modifier le message de quelqu'un d'autre"
____loclib.e13247 = "Vous avez atteint votre limite de modification de 5 articles par p�riode de 24 heures"
____loclib.e13248 = "Vous ne pouvez modifier qu'une seule fois par bloc de blockchain. Veuillez patienter une minute, puis r�essayer"
____loclib.e13249 = 'Tu ne peux pas te bloquer'
____loclib.e13250 = 'Vous avez d�j� bloqu� cet utilisateur'
____loclib.e13251 = "Vous n'avez pas bloqu� cet utilisateur"
____loclib.e13252 = 'La transaction est mal form�e'
____loclib.e13253 = 'Vous ne pouvez pas vous r�f�rer'
____loclib.e13254 = "Ce nom d'utilisateur est trop long"
____loclib.e13255 = "Ce nom d'utilisateur est d�j� utilis�"
____loclib.e13256 = 'Ce message est trop long, veuillez le s�parer.'
____loclib.e13257 = "Votre score de r�putation Pocketnet ne permet pas encore l'enregistrement de r�clamations"
____loclib.e13258 = 'Vous avez atteint la limite des r�clamations sur une p�riode de 24 heures'

____loclib.e13259 = 'Je ne peux pas me plaindre de votre propre message'
____loclib.e13260 = 'Vous avez d�j� enregistr� votre r�clamation concernant ce message'
____loclib.e13261 = "Enregistrer la cl�"
____loclib.e13262 = "Plus tard"
____loclib.e13263 = "Abonnez-vous et activez les notifications de cet utilisateur"
____loclib.e13264 = "Abonnez-vous sans notifications"
____loclib.e13265 = 'Votre nom n`est plus disponible, veuillez en choisir un autre'
____loclib.e13266 = "Th�me blanc"
____loclib.e13267 = "Th�me sombre"
____loclib.e13268 = 'Coinstake gagne'
____loclib.e13269 = 'Les transactions re�oivent'
____loclib.e13270 = 'Les votes positifs re�oivent'
____loclib.e13271 = 'Comment recevoir'
____loclib.e13272 = 'R�pondre re�u'
____loclib.e13273 = 'Nouveaux adeptes'
____loclib.e13274 = 'Utilisateurs sauv�s'
____loclib.e13275 = 'Score du commentaire'
____loclib.e13276 = 'Afficher les vid�os int�gr�es'
____loclib.e13277 = 'Vid�os en lecture automatique'
____loclib.e13278 = 'D�marrez Pocketnet automatiquement'
____loclib.e13279 = 'Chat'
____loclib.e13280 = '�tiquettes'
____loclib.e13281 = 'Derniers commentaires'
____loclib.e13282 = "Jeton de robot de t�l�gramme"
____loclib.e13283 = "Message de la cha�ne Telegram"
____loclib.e13284 = "Ajouter le bot au chat et s�lectionner"
____loclib.e13285 = 'Demander avant de poster du t�l�gramme'
____loclib.e13286 = 'Demander avant d`envoyer au t�l�gramme'
____loclib.e13287 = "Envoyer vers le canal de t�l�gramme"
____loclib.video = "Vid�o"
____loclib.e13288 = "Vidgets de la page principale"
____loclib.e13289 = "Int�gration avec Telegram"

____loclib.system = "Syst�me"
____loclib.e13290 = "Souhaitez-vous suivre"
____loclib.e13291 = "Voulez-vous vraiment envoyer un message � Telegram?"
____loclib.send = "Envoyer"
____loclib.e13292 = "Vous avez d�j� un n�ud sur cet h�te"
____loclib.e13293 = "Erreur interne"
____loclib.e13294 = 'Activation de la base de donn�es PGSQL'
____loclib.e13295 = 'H�te DB'
____loclib.e13296 = 'Port DB'
____loclib.e13297 = 'DB Max'
____loclib.e13298 = 'D�lai d`inactivit� DB, ms'
____loclib.e13298 = 'DB Nom'
____loclib.e13300 = 'DB Utilisateur'
____loclib.e13031 = 'DB Mot de Passe'
____loclib.e13302 = 'Serveur proxy activ�'
____loclib.e13303 = 'Port du serveur proxy https'
____loclib.e13304 = 'Port du serveur proxy wss'
____loclib.e13305 = 'Cl� SSL du serveur, pem'
____loclib.e13306 = 'Certificat SSL du serveur, pem'
____loclib.e13307 = 'Phrase de passe SSL du serveur'
____loclib.e13308 = 'SDK d`administration Firebase'
____loclib.e13309 = 'Votre adresse de grue'
____loclib.e13310 = 'Captcha activ�'
____loclib.e13311 = 'Activation du limiteur IP'
____loclib.e13312 = "Serveur"

____loclib.e13313 = "Base de donn�es, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Autre"
____loclib.e13316 = 'Activer'
____loclib.e13317 = 'Chemin binaire'
____loclib.e13318 = 'Chemin de configuration'
____loclib.e13319 = 'Chemin de donn�es'
____loclib.e13320 = 'Adresse de jalonnement'
____loclib.e13321 = 'Importez l`adresse du compte sur le n�ud pour l`empilage'
____loclib.e13322 = 'Etat'
____loclib.e13323 = 'Adresses de jalonnement'
____loclib.e13324 = 'Dernier bloc'
____loclib.control = "Contr�le"
____loclib.setup = "Installer"
____loclib.e13325 = "Voulez-vous vraiment poster des messages de Telegram?"
____loclib.e13326 = "Post"
____loclib.e13327 = 'Voulez-vous vraiment utiliser � nouveau le proxy?'
____loclib.e13328 = 'aim� votre commentaire!'
____loclib.e13329 = "Nouveau commentaire comme"
____loclib.e13330 = "a partag� votre message:"
____loclib.e13331 = "a partag� votre post:"
____loclib.e13332 = "a un tout nouveau post:"
____loclib.e13333 = "Transaction entrante"
____loclib.e13334 = "F�licitations! Vous avez gagn�"
____loclib.e13335 = "Pocketcoin pour votre dernier"
____loclib.e13336 = "avec message:"
____loclib.e13337 = "a comment� votre message:"
____loclib.e13338 = "answered on your comment:"
____loclib.reply = "R�pondre"
____loclib.e13339 = "Vous avez sauv� quelqu'un du Web censur�. Certaines pi�ces sont en route!"
____loclib.e13340 = 'F�licitations !'
____loclib.e13341 = "t'a suivi"
// <%=e('e13337')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13337')
____loclib.e13342 = "Nouvel abonn�"
____loclib.e13343 = "a vot� pour votre message"
____loclib.e13344 = "Nouveau vote favorable"
____loclib.e13345 = "vous a envoy� un message priv�"
____loclib.e13346 = "Vous avez de nouveaux messages"
____loclib.e13347 = "Des mises � jour de Pocketnet sont disponibles. Appliquer les mises � jour maintenant?"
____loclib.e13348 = "Au plus tard"
____loclib.e13349 = "Des mises � jour de Pocketnet sont disponibles. Aller � la page pour t�l�charger la nouvelle version?"
____loclib.e13350 = 'Rejoignez Pocketnet et gagnez Pocketcoin maintenant'
____loclib.e13351 = 'Please write a few words about yourself to help people decide if they want to follow you'
