

if(typeof loclib == 'undefined' || !loclib)
	loclib = {};

	loclib.en = {};

var ____loclib = loclib.en;


//authorization

____loclib.id0 = "Login to an existing account";	
____loclib.id1 = "If you are already registered, please sign in";	
____loclib.loadqrcode = "Upload QR Code";
____loclib.stay = "Stay Signed In";
____loclib.signin = "Sign In";
____loclib.orcreate = "Or create a new account";
____loclib.createnew = "Create a new account";
____loclib.staysafe = "It is not safe. Do you want to proceed?";

// Register a New Account
____loclib.id71 = "Create a New Account";
____loclib.id72 = "Already a Member? Sign In";

____loclib.rtip1 = "Take Note of Your Private Login Key!";
____loclib.rtip2 = function(mobile){
	var h = 'Below is your Private Key passphrase. Write it down and make sure to save your QR code' 

	if(mobile){ h += 'device' } else { h+='PC' }

	h+=' and be sure not to lose it. We do not store your personal data. Private Key cannot be recovered if lost!'

	return h 
}

____loclib.generatepkey = "Generate Private Key";
____loclib.rtip3 = "Write this login key down and save it as a QR code. We do not store your personal data. It cannot be recovered if lost! ";
____loclib.saveqrcode = "Save Qr Code" 
____loclib.copyprivkey = "Copy Private Key"
____loclib.rcontinue = "Continue"
____loclib.idle = "Idle for some time"
____loclib.congratulations = 'Congratulations! You are in <span class="pnlabel">Pocketnet</span>'
____loclib.creatingpreloader = 'Creating Account'
____loclib.removepaste = 'We removed paste possibility for this input.'
____loclib.filedamaged = "File is damaged"
____loclib.keysnotmatch = 'Private login key does not match'
____loclib.confirmkey = 'Type your Private Login Key here for confirmation'
____loclib.successfullycopied = "Key was successfully copied"
____loclib.urlsuccesscopied = "Link was successfully copied"

____loclib.confirmkeyLabel = "Please Confirm Your Private Key. Type Key in form or <b>upload QR code</b>"
____loclib.repeatetocreate = "Repeat to create private key again"
____loclib.confirmcreate = "Create Account"


//user activation

____loclib.useractivation = "User activation";	
____loclib.wesentmoney = "We sent you a few coins for registration";	
____loclib.wesentmoneym = "We have already sent you a few coins for registration";


____loclib.wesentmoneydelay = "The process is taking more time than usual, please just a little longer";

____loclib.funetworkproblems = "There are some problems with the connection. Please try later";

____loclib.pleasewait = "Please Wait";	
____loclib.next = "Next";	
____loclib.welcometopocketnet = "Welcome to Pocketnet";	
____loclib.continue = "continue";	

//user page

____loclib.rstate = "Reputation";	
____loclib.rprofile = "Profile";	
____loclib.rsettings = "Settings";	
____loclib.rwallet = 'Wallet';	
____loclib.raccounts = 'Accounts';	
____loclib.pnetAddress = 'Pocketnet Address';	
____loclib.profile = 'Profile';	
____loclib.signout = 'Sign out';

//send

____loclib.postlabel = "Donation for post";	
____loclib.donationlabel = "Donation";	
____loclib.donationwel = "If you want to thank the author you can use Pocketnet transaction";
____loclib.donationwela = "Pocketnet transaction";	
____loclib.donationwelan = "Or you can use another crypto payment system";	
____loclib.successfullycopiedaddress = "Address was successfully copied";	

//wallet

____loclib.wrecieve = "Receive Coins By Sharing Address";	
____loclib.wcopyshare = "Copy & Share Address:";	
____loclib.wqrcode = "Qr code";		
____loclib.wcopeaddress = "Copy Address";	
____loclib.wcreatelink = "Or Create Link For Your Payment";	
____loclib.required = "Required";	
____loclib.wgetlink = "Get Link";	
____loclib.waddresses = "Addresses";	
____loclib.waddress = "Address";	
____loclib.wbalance = "Balance";	
____loclib.wpercente = "Percente";	
____loclib.waddaddress = "Explore a new Wallet address";	
____loclib.wrecieve = "Receive";	
____loclib.wrecieveon = "Receive on";	
____loclib.wcopyshareorcreate = "Copy & Share Address or Create Payment Link";
____loclib.wdgetlink = "Get Link";	
____loclib.wdqrcode = "Qr code";
____loclib.wdcopyaddress = "Copy Address";	
____loclib.wdpleasefill = "Please fill in these fields";
____loclib.wduseqr = "Use this QR code to receive funds";	
____loclib.wdaddress = "Address";
____loclib.wdamount = "Amount";	
____loclib.wdlabel = "Label";	
____loclib.wdmessage = "Message";	
____loclib.wsend = "Send";
____loclib.calcfeesandsend = "Calculate Fees And Send";	
____loclib.wstrfees = "Transaction Fees";	
____loclib.wsfees = "Fees";	

____loclib.wssendto = "SEND COINS TO";	
____loclib.wssendb = "SEND";	

____loclib.tacaddress = 'Account Address';	
____loclib.twallet = "Wallet";	
____loclib.twalletaddresses = "Wallet addresses";	
____loclib.tTotal = "Total";	
____loclib.wsselect = "Select Source From Menu";	
____loclib.wsenter = "Enter Address Or Select From Menu";	
____loclib.wsreciever = "Receiver address";	
____loclib.wsamount = "Amount";	
____loclib.wsamountof = "Amount of your transaction";	
____loclib.wsincludefees = "Include Fees in Amount";	
____loclib.wsrecieverpay = 'To be paid by Receiver';	
____loclib.wssenderpay = 'To be paid by Sender';	
____loclib.wdselectfrom = "Select From menu";	

____loclib.wdenteramount = "Enter Amount";	
____loclib.wdmessageplaceholder = "What is this transaction for?";
____loclib.wrenteraddress = 'Enter Address';
____loclib.wrenteraddressselect = "Enter Address Or Select From menu";
____loclib.wreturntoeallet = "RETURN TO WALLET";	
____loclib.linkCreated = 'LINK CREATED';
____loclib.waddresswascop = "Address was successfully copied";
____loclib.wqrcodecreated = 'QR CODE CREATED';
____loclib.wlinkcreating = 'LINK CREATING';
____loclib.wqrcodecreating = 'QR CODE CREATING';
____loclib.wdoptions = 'OPTIONS';
____loclib.wssuccessfully = "Transaction has sent successfully";
____loclib.wscalculatefees = 'CALCULATE FEES';
____loclib.wsaddressnotv = "Address is not valid";

//user profile
____loclib.uaddaddressdona = "Add address For Donations";
____loclib.uaddaddressdonaplace = "Enter Address";
____loclib.uchangeicon = "Upload Profile Icon";
____loclib.utip1 = "You must create name & avatar on blockchain before using Pocketnet";
____loclib.upicset = "Set Profile Icon";
____loclib.upic = "Profile Icon";
____loclib.uuserinfo = "User Information";
____loclib.usave = "Save";
____loclib.ucancel = "Cancel";
____loclib.uwaitb = "Wait for confirmation to save information ";
____loclib.uchanges = "There are no changes";
____loclib.uchangesvalid = "You need to create a name & avatar";

____loclib.uname = "Name";
____loclib.ulanguage = "Language";
____loclib.uabout = "About myself";
____loclib.uwebsite = "Web Site";
____loclib.uaddresesd = "Addresses for Donations";
____loclib.usavechanges = "Do you want to save your changes?";

//ustate
____loclib.sreps = "Reputation and Limitations";
____loclib.sdisconnected = "Disconnected from node";
____loclib.suseractivation = "User Activation";
____loclib.sprofile = "Profile";
____loclib.spc = "Post count";
____loclib.ssc = "Stars count";
____loclib.stp = "Trial period";
____loclib.srep = "Reputation";

//accounts
____loclib.aaddedacc = "Added Accounts";
____loclib.acure = "Current";
____loclib.aaddacc = "Add Account";
____loclib.ascheduler = "Scheduler";
____loclib.aused = "This address already use in another addresses pool";


//author
____loclib.sub = "Follow";
____loclib.unsub = "Unfollow";
____loclib.joined = "Joined Pocketnet";
____loclib.shares = "SHARES";
____loclib.uposts = "POSTS";
____loclib.myuposts = "MY POSTS";
____loclib.followers = "FOLLOWERS";
____loclib.following = "FOLLOWING";
____loclib.settings = "MANAGE";
____loclib.anofollowers = "This user has't followers yet";
____loclib.aynofollowers = "You haven't followers yet";
____loclib.anofollowing = "This user has't following yet";
____loclib.aynofollowing = "You haven't following yet";

//lenta
____loclib.lloadmore = "Load More Awesome Posts!";
____loclib.lloadprev = "Load New Awesome Posts";


____loclib.lend = "End of Posts";
____loclib.zerop = "There currently no posts by this author";
____loclib.zeroy = "You do not have any publications yet, share something!";



____loclib.llogin = 'You must login before you can proceed';
____loclib.lcomlaindialog = "Are you sure you want to report this post?";
____loclib.lunsubscribe = "Do you really want to unfollow this account?";
____loclib.lprivatepublic = "Do you want to make a Private or Public subscription?";
____loclib.lprivate = "Private";
____loclib.lpublic = "Public";

//share
____loclib.newShare = "New Share";
____loclib.scaption = "Caption";
____loclib.whatsnew = "What's new?";
____loclib.saddlink = "Add link to external site or video";
____loclib.saddimages = "Add Images to Post";
____loclib.sarticle = "To write an article";


____loclib.snothing = "Nothing";
____loclib.sposttime = "Post By Time";
____loclib.spostnow = "Post Now";
____loclib.stimenotselected = "Time Not Selected";
____loclib.spost = "Post";
____loclib.sdate = "Date";
____loclib.stime = "Time";
____loclib.snotags = "Add tag";
____loclib.expandvideo = "Click to expand";
____loclib.emptymessage = "Message is empty";
____loclib.emptytags = "Please add Tags";
____loclib.emptyutxo = "no money";
____loclib.networkerror = "network error";
____loclib.maximages = "You are alowed a maximum or 6 Images";
____loclib.sharenow = "Do you want to share this content now?";
____loclib.pastdate = 'Past Date';
____loclib.timenotselected = 'Time Not Selected';
____loclib.addtags = 'Add tags';
____loclib.tnews = "news";
____loclib.timages = "images";
____loclib.tvideos = "videos";
____loclib.tmarket = "market";
____loclib.tsport = "sports";

//menu
____loclib.signinmenu = "Sign in";
____loclib.signupmenu = "Sign up";
____loclib.aboutmenu = "learn more";

//footer
____loclib.aboutus = "About us";



// Dialog Box Options
____loclib.daccept = "Accept";
____loclib.dcancel = "Cancel";
____loclib.dyes = "Yes";
____loclib.dno = "No";
____loclib.dsa = "Do not Show Anymore";


// Messages

____loclib.coinbaseSuccess = function(v){
	return "Congratulations, you have won " + v + " Pocketcoin for your latest post!"
}
____loclib.userSent = function(v){
	return "sent <b>" + v + " POC</b> to you"
}




____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web. Some coins are on their way!"

____loclib.subscribeUserMessage = "has followed to your account"
____loclib.unsubscribeUserMessage = "has unfollowed from your account"
____loclib.gotoprofileMessage = "go to profile"
____loclib.upvoteShareMessage = "has upvoted your post"


// Errors

____loclib.checkScoreError = "You must fill in required profile info before using Pocketnet. Do you want to do it now?";
____loclib.checkScoreErrorLight = "Account is not activated";
____loclib.timestamperror = "Time in application and in node do not match";


____loclib.postLimitLight = function(v){
	return "You have reached your limit of " + (v || 15) + " posts in a 24 hour period";
}
____loclib.postLimitLight = function(v){
	return "You have reached your limit of " + (v || 15) + " grading in a 24 hour period";
}

____loclib.doubleLimitLight = "You have already rated this";	

____loclib.SelfSubscribeError = "Cannot subscribe to yourself";
____loclib.DoubleSubscribeError = "You already follow this user";
____loclib.InvalideSubscribeError = "You are not subscribed to this user";
____loclib.ChangeInfoLimitError = "You can only edit your profile once an hour. Please wait and try again. ";
____loclib.SelfScoreError = "You cannot rate your own post";

____loclib.unexperror10 = "Unknown Error (10)";
____loclib.unexperror11 = "Unknown Error (11)";
____loclib.unexperror12 = "Unknown Error (12)";

____loclib.networkerror = "There are some problems with node";

____loclib.canSpendError = "Your money has not been unlocked just yet. Please wait";
____loclib.noMoneyError = "You do not have any money";



____loclib.waitConf = "You have to wait for your previous transaction to clear in the blockchain";
____loclib.postWaitConf = "Post is waiting for a blockchain confirmation";

