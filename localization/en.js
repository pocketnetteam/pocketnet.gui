
var appname = window.pocketnetproject || "Pocketnet"

if(typeof loclib == "undefined" || !loclib)
loclib = {};

loclib.en = {};

var ____loclib = loclib.en;

//time

____loclib.fewseconds = "Few seconds ago";
____loclib.oneminute = "One minute ago";

____loclib.minutes = function(v){
return v + " minutes ago"
}

____loclib.tenminutes = "Ten minutes ago";
____loclib.halfanhour = "An hour ago";
____loclib.anhour = "An hour ago";
____loclib.today = "Today at";

//authorization

____loclib.id0 = "Login to an existing account";
____loclib.id1 = "If you are already registered, please sign in";
____loclib.loadqrcode = "Upload QR Code";
____loclib.stay = "Stay Signed In";
____loclib.signin = "Sign In";
____loclib.orcreate = "Or create a new account";
____loclib.createnew = "Create a new account";
____loclib.staysafe = "It is not safe. Do you want to proceed?";
____loclib.or = "or";

// Register a New Account
____loclib.id71 = "Create a New Account";
____loclib.id72 = "Already a Member? Sign In";

____loclib.rtip1 = "Take Note of Your Private Login Key!";
____loclib.rtip2 = function(mobile){
var h = "Below is your Private Key passphrase. Write it down and make sure to save your QR code"

if(mobile){ h += "device" } else { h+="PC" }

h+=" and be sure not to lose it. We do not store your personal data. Private Key cannot be recovered if lost!"

return h
}

____loclib.generatepkey = "Generate Private Key";
____loclib.rtip3 = "Write this login key down. We do not store your personal data. It cannot be recovered if lost! ";
____loclib.saveqrcode = "Save Qr Code"
____loclib.copyprivkey = "Copy Private Key"
____loclib.rcontinue = "Continue"
____loclib.idle = "Idle for some time"
____loclib.congratulations = "Congratulations! You are in <span class='pnlabel'>"+appname+"</span>"
____loclib.creatingpreloader = "Creating Account"
____loclib.removepaste = "We removed the paste option for this input."
____loclib.filedamaged = "File doesn't contain a valid private key"
____loclib.keysnotmatch = "Private login key does not match"
____loclib.confirmkey = "Type Your Private Login Key or Upload QR Code From Previous Step"
____loclib.successfullycopied = "Key was successfully copied"
____loclib.urlsuccesscopied = "Link was successfully copied"
____loclib.successcopied = "Text was successfully copied"

____loclib.confirmkeyLabel = "Please Confirm Your Private Key. Type Key in form or <b>upload QR code</b>"
____loclib.repeatetocreate = "Repeat to create private key again"
____loclib.confirmcreate = "Create Account"


//user activation

____loclib.useractivation = "User activation";
____loclib.wesentmoney = "We sent you a few coins for registration";
____loclib.wesentmoneym = "We have already sent you a few coins for registration";


____loclib.wesentmoneydelay = "The process is taking more time than usual, please wait a little longer";

____loclib.funetworkproblems = "There are some problems with the connection. Please try later";

____loclib.pleasewait = "Please Wait";
____loclib.next = "Next";
____loclib.welcome = "Welcome";
____loclib.welcometopocketnet = "Welcome to "+appname+"";
____loclib.continue = "continue";

____loclib.chooseThemes = "Choose interesting themes";
//user page

____loclib.rstate = "Reputation";
____loclib.rprofile = "Profile";
____loclib.rsettings = "Settings";
____loclib.rwallet = "Wallet";
____loclib.raccounts = "Accounts";
____loclib.rsystem = "System";
____loclib.rconnection = "Connection";
____loclib.pnetAddress = ""+appname+" Address";
____loclib.profile = "Profile";
____loclib.signout = "Sign out";

//send

____loclib.postlabel = "Donation for post";
____loclib.donationlabel = "Donation";
____loclib.donationwel = "If you want to thank the author you can use a "+appname+" transaction";
____loclib.donationwela = ""+appname+" transaction";
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

____loclib.tacaddress = "Account Address";
____loclib.twallet = "Wallet";
____loclib.twalletaddresses = "Wallet addresses";
____loclib.tTotal = "Total";
____loclib.wsselect = "Select Source From Menu";
____loclib.wsenter = "Enter Address Or Select From Menu";
____loclib.wsreciever = "Receiver address";
____loclib.wsamount = "Amount";
____loclib.wsamountof = "Amount of your transaction";
____loclib.wsincludefees = "Include Fees in Amount";
____loclib.wsrecieverpay = "To be paid by Receiver";
____loclib.wssenderpay = "To be paid by Sender";
____loclib.wdselectfrom = "Select From menu";

____loclib.wdenteramount = "Enter Amount";
____loclib.wdmessageplaceholder = "What is this transaction for?";
____loclib.wrenteraddress = "Enter Address";
____loclib.wrenteraddressselect = "Enter Address Or Select From menu";
____loclib.wreturntoeallet = "RETURN TO WALLET";
____loclib.linkCreated = "LINK CREATED";
____loclib.waddresswascop = "Address was successfully copied";
____loclib.wqrcodecreated = "QR CODE CREATED";
____loclib.wlinkcreating = "LINK CREATING";
____loclib.wqrcodecreating = "QR CODE CREATING";
____loclib.wdoptions = "OPTIONS";
____loclib.wssuccessfully = "Transaction sent successfully";
____loclib.wscalculatefees = "CALCULATE FEES";
____loclib.wsaddressnotv = "Address is not valid";

//user profile
____loclib.uaddaddressdona = "Add address For Donations";
____loclib.uaddaddressdonaplace = "Enter Address";
____loclib.uchangeicon = "Upload Profile Image";
____loclib.utip1 = "You must create name on blockchain before using "+appname+"";
____loclib.utip2 = "You have only one step left";
____loclib.upicset = "Set Profile Icon";
____loclib.upic = "Profile Icon";
____loclib.uuserinfo = "User Information";
____loclib.usave = "Save";
____loclib.ucancel = "Cancel";
____loclib.uwaitb = "Wait for confirmation to save information ";
____loclib.uchanges = "There are no changes";
____loclib.uchangesvalid = "You need to type username";
____loclib.uname = "Name";
____loclib.unickname = "Nickname";
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
____loclib.spv = "Video Post count";
____loclib.ssc = "Stars count";
____loclib.ccc = "Comments count";
____loclib.crc = "Comment Rate count";

____loclib.stp = "Beginner";
____loclib.stpg = "Top";
____loclib.stpreal = "Verified";
____loclib.stpdev = "Bastyon developer";

____loclib.trialreputationtip = "To become a top user you need to have a valid reputation. It requires at least 100 different people with top reputation to upvote your content (after 3 months this requirement is relaxed to 30). The second requirement is minimum 100 overall reputation.";
____loclib.trialreputationtipaction = "Learn more about reputation here"


____loclib.srep = "Reputation";
____loclib.ccpl = "Complains count";

//accounts
____loclib.aaddedacc = "Change Account";
____loclib.acure = "Current";
____loclib.aaddacc = "Add Account";
____loclib.ascheduler = "Scheduler";
____loclib.aused = "This address is already use in another addresses pool";

____loclib.accfailedkeypair = "Wrong Private Key";
____loclib.acchasinthispack = "This address is already added";
____loclib.acchasinanotherpack = "This address is already use in another addresses pool";


//author
____loclib.sub = "Follow";
____loclib.subi = "Following";
____loclib.unsub = "Unfollow";
____loclib.joined = "Joined";
____loclib.shares = "SHARES";
____loclib.uposts = "POSTS";
____loclib.myuposts = "MY POSTS";
____loclib.followers = "FOLLOWERS";
____loclib.followers2 = "Followers";
____loclib.following = "FOLLOWING";
____loclib.following2 = "Following";
____loclib.settings = "MANAGE";
____loclib.anofollowers = "This user has no followers";
____loclib.aynofollowers = "You have no followers";
____loclib.anofollowing = "This user is not following anyone";
____loclib.aynofollowing = "You are not following anyone";

____loclib.blockedusers = "Blocked Users";
____loclib.anoblocked = "This user is not blocked anyone";
____loclib.aynoblocked = "You are not blocked anyone";

//lenta
____loclib.lloadmore = "Load More Awesome Posts!";
____loclib.lloadprev = "Load New Awesome Posts";


____loclib.lend = "End of Posts";
____loclib.zerop = "There currently no posts by this author";


____loclib.zeroy = "You do not have any publications yet, share something!";



____loclib.llogin = "You must login before you can proceed";
____loclib.lcomlaindialog = "Are you sure you want to report this post?";
____loclib.lunsubscribe = "Do you really want to unfollow this account?";
____loclib.lprivatepublic = "Do you want to make a Private or Public subscription?";
____loclib.lprivate = "Private";
____loclib.lpublic = "Public";

//share
____loclib.newShare = "New Post";
____loclib.firstShare = "Share Your First Post in "+appname+"";
____loclib.scaption = "Caption";
____loclib.whatsnew = "What's new?";
____loclib.whatsnewrepost = "What's new?";



____loclib.saddlink = "Add link to external site or video";
____loclib.saddimages = "Add Images to Post";
____loclib.sarticle = "To write an article";
____loclib.stelegram = "Send to telegram"
____loclib.stimes = "Clear post"


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
____loclib.maximages = "You are alowed a maximum or 10 Images";
____loclib.sharenow = "Do you want to share this content now?";
____loclib.pastdate = "Past Date";
____loclib.timenotselected = "Time Not Selected";
____loclib.addtags = "Add tags";
____loclib.tnews = "news";
____loclib.timages = "images";
____loclib.tlinks = "links";
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
____loclib.dcode = "Code"
____loclib.dcopyToClipboard = "Copy to ClipBoard"
____loclib.dwarning = "Warning"
____loclib.dyesclose = "Yes, close"


// Messages

____loclib.transactionCome = "Incoming transaction";

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

____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web. Some coins are on their way!"

____loclib.subscribeUserMessage = "followed you"
____loclib.unsubscribeUserMessage = "unfollowed you"
____loclib.gotoprofileMessage = "go to profile"
____loclib.upvoteShareMessage = "upvoted your post"

____loclib.upvoteCommentMessage = " liked your comment"

// Errors

____loclib.error = "Error";
____loclib.checkScoreError = "Your account was not found on the blockchain. You must fill in required profile info before using "+appname+". Do you want to do it now?";
____loclib.checkScoreErrorLight = "Account is not activated";
____loclib.timestamperror = "Time in application and in node do not match";

// Error Page 404
____loclib.e404 = "404";
____loclib.e404e = "Page not Found. Return to Main Page";
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

____loclib.canSpendError = "You have to wait for your previous transaction to clear in the blockchain. Please wait";
____loclib.noMoneyError  = "You can't doing actions with zero account balance";

____loclib.scoreLimitLight = "You have reached your rating limit";

____loclib.waitConf = "You have to wait for your previous transaction to clear in the blockchain";
____loclib.postWaitConf = "Post is waiting for a blockchain confirmation";
____loclib.actionWaitConf = "Action is waiting for a blockchain confirmation";


// notifications

____loclib.ntnow = "Now"
____loclib.ntlasthour = "This hour"
____loclib.nttoday = "Today"
____loclib.ntyesterday = "Yesterday"

____loclib.ntmounth = "This month"
____loclib.ntearlier = "Earlier"


____loclib.nodeWalletAdd = "Adding an address may take some time. Continue?"
____loclib.nodeEnableNoteHeader = "Note"
____loclib.nodeEnableNote = "That turning on a node may take up to 5GB of RAM. Make sure you have enough. Happy staking!"


/// 1301

____loclib.address = "Address"
____loclib.privatekey = "Private Key"
____loclib.qrcode = "QR Code"
____loclib.addaccount = "Add Account"
____loclib.entermnimo = "Enter Mnemonic Phrase or Private Key"
____loclib.add = "Add"
____loclib.e13011 = "You will now continue your registration after you install "+appname+" Desktop."
____loclib.e13012 = "If "+appname+" did not start downloading, please click here to install it."
____loclib.e13013 = "Type caption for image (optional)"
____loclib.e13014 = "This file is not in a supported format:"
____loclib.e13015 = "This file is too big:"
____loclib.e13016 = "Paste a YouTube, Vimeo link and press Enter"
____loclib.e13017 = "Loading to Blockchain"
____loclib.e13018 = "Do You really want to remove this article?"
____loclib.e13019 = "New"
____loclib.e13020 = "Write New Article"
____loclib.youarefollowing = "You are Following"
____loclib.follow = "Follow"
____loclib.blocked = "Blocked"
____loclib.e13021 = "Show more"

____loclib.blockuser = "Block User"
____loclib.unblockuser = "Unblock User"
____loclib.e13022 = "Do you really want to unfollow user?"
____loclib.unfollow = "Unfollow"
____loclib.unblock = "Unblock"
____loclib.share = "Share"
____loclib.info = "Info"
____loclib.copyLink = "Copy direct Link"
____loclib.includeRefLink = "Include Referal Link"
____loclib.shareVia = "Share via"
____loclib.embedding = "Embedding"
____loclib.copyEmbeddingCode = "Copy Embedding Code"
____loclib.showCode = "Show Code"
____loclib.embeddingSettings = "Embedding Settings"
____loclib.blackTheme = "Black Theme"
____loclib.includeComments = "Include comments"
____loclib.showOnlyLast = "Show Only last comment"
____loclib.showAll = "Show all comments"
____loclib.dontShow = "Don't show comments"
____loclib.removeDescription = "Remove description"
____loclib.preview = "Preview"
____loclib.autoplayVideo = "Autoplay Video"
____loclib.onlyVideo = "Only video"

____loclib.e13023 = "Do you really want to unblock user?"
____loclib.e13024 = "Your Private Login Key"
____loclib.e13025 = "Create a new account"
____loclib.e13026 = "Registration "+appname+""

____loclib.e13027 = "Stay Signed"
____loclib.e13028 = "You entered not valid private key"
____loclib.e13029 = "Message is empty"
____loclib.e13030 = "Comments have 1000 character limit per comment"
____loclib.e13031 = "Share Comment"
____loclib.e13032 = "Do you really want to delete your comment?"
____loclib.e13033 = "Comment has been removed"
____loclib.postRemoved = "Post has been removed"
____loclib.postNotFound = "Post not found"


____loclib.e13034 = "Yes"
____loclib.e13035 = "No, cancel"
____loclib.hide = "Hide"
____loclib.e13036 = "Show comments"
____loclib.e13037 = "Replies"
____loclib.remove = "Remove"
____loclib.e13038 = "Comment Now"
____loclib.e13039 = "Comment Now"
____loclib.e13040 = "You do not have commenting priviliges"
____loclib.complain = "Complain"
____loclib.next = "Next"
____loclib.post = "Post"
____loclib.e13041 = ""+appname+" Connection"
____loclib.e13042 = ""+appname+" Proxy"

____loclib.e13043 = ""+appname+" Nodes"
____loclib.e13044 = "Add node"
____loclib.e13045 = "Nodes not found"
____loclib.e13046 = "Address"
____loclib.e13047 = "WS"
____loclib.e13048 = "Name"
____loclib.e13049 = "Status"
____loclib.e13050 = "Proxies not found"
____loclib.e13051 = "Don't use proxy"
____loclib.e13052 = "Unable connect to proxy"
____loclib.e13053 = "Unable connect to node"
____loclib.e13054 = "Add Proxy"
____loclib.e13055 = "Edit Proxy"
____loclib.save = "Save"
____loclib.e13056 = "Node Host"
____loclib.close = "Close"
____loclib.e13057 = "Please fill all fields"
____loclib.e13058 = "You alredy have this proxy in list."
____loclib.delete = "Delete"
____loclib.e13059 = "Do you really want to delete this proxy from list?"
____loclib.e13060 = "Proxies list"
____loclib.e13061 = "Do you really want to stop use Proxy. It is usafe (Http connection)"

____loclib.e13062 = "Edit Node"
____loclib.onproxy = "On Proxy"
____loclib.locally = "Locally"
____loclib.nodehost = "Node Host"
____loclib.e13063 = "RPC Port"
____loclib.e13064 = "WS Port"
____loclib.e13065 = "Name Of Node"
____loclib.e13066 = "Please enter Node Name"
____loclib.e13067 = "RPC login"
____loclib.e13068 = "Login for PRC authorization"
____loclib.e13069 = "RPC password"
____loclib.e13070 = "Password for PRC authorization"
____loclib.e13071 = "Please fill all fields"
____loclib.e13072 = "Do you really want to delete this node from list?"
____loclib.e13073 = "Do you really want to stop use Proxy. It is usafe (Http connection)"
____loclib.notselected = "Not selected"
____loclib.donation = "donation"
____loclib.e13074 = "Awaitng Funds. Address will be valid for"
____loclib.sminutes = "minutes"
____loclib.e13075 = "Time to this deal has been expired."
____loclib.reactivate = "Reactivate"
____loclib.e13076 = "Scan this code to send"
____loclib.back = "Back"
____loclib.e13077 = "Add your profile to Donors List"
____loclib.e13078 = "Why are we asking for donations?"
____loclib.e13079 = "We have spent 14+ months in spare time from full time jobs bringing "+appname+" to people. In addition to time and effort, we have put in our own money to help launch the platform. Now we need the community to step up and help us with growth."
____loclib.e13080 = "How will the funds be used?"
____loclib.e13081 = "Funds will be used to purchase advertising and hire some specific subject matter experts to make "+appname+" even more secure. Current development team will not get any of these donations. Wherever possible, we will post here how we used the funds. "
____loclib.e13082 = "What you will get for your donation besides knowing you supported freedom:"
____loclib.e13083 = "As a sign of our gratitude for donation, you will receive a gift in some amount of Pocketcoin"
____loclib.e13084 = "Also, when we build group chat, you will be a member of a special group of donors that will have direct access to "+appname+" team, even as the platform grows"
____loclib.e13085 = "Link to your "+appname+" profile will be listed below driving more people to your posts (unless you ask us to not do that)"
____loclib.e13086 = "Support Decentralized Web Now"
____loclib.e13087 = "Bitcoin, Litecoin"

____loclib.e13088 = ""+appname+" members who donated to support "+appname+""
____loclib.thankyou = "Thank you!"
____loclib.e13089 = "If you would like us to list your "+appname+" profile in the list of donors, please send us information about your donation"
____loclib.e13090 = "Add me to donors list"
____loclib.e13091 = "Or you can send us an email to"
____loclib.e13092 = "with your public key and amount."
____loclib.finish = "Finish"
____loclib.e13093 = "Please choose donation way"
____loclib.e13094 = "Something went wrong. Please reload page and try again (error: 0001)"
____loclib.e13095 = "Thank you for supporting our work for freedom. We will make sure every penny counts."
____loclib.e13096 = "Please fill amount of donation"
____loclib.e130961 = "How much do you want to send?"
____loclib.e130962 = "Available balance:"

____loclib.e13097 = "Something went wrong. Please reload page and try again (error: 0002)"
____loclib.e13098 = "Add link to external site or resource"
____loclib.e13099 = "Upload Images"
____loclib.e13100 = "Click here to select files for uploading"
____loclib.e13101 = "or drag & drop"
____loclib.e13102 = "Add link to external site"
____loclib.e13103 = "Url doesn't valid"
____loclib.e13104 = "Max 6 Images Allowed"
____loclib.e13105 = "Node management"
____loclib.e13106 = ""+appname+" Node"
____loclib.e13107 = "Node management may be carried out with Application"
____loclib.e13108 = "There isn't connection with Electron proxy interface"

____loclib.e13109 = "Please enter the words in the picture to receive Pocketcoin and continue registration"
____loclib.e13110 = "Enter words"
____loclib.poll = "Create poll"
____loclib.next = "Next"
____loclib.refresh = "Refresh"
____loclib.e13111 = "Add your email to get the latest "+appname+" updates"
____loclib.e13112 = "Enter email"
____loclib.e13113 = "Add email"
____loclib.skip = "Skip"
____loclib.e13114 = "There is some problem with your registration due to strange activity."
____loclib.e13115 = "Please email"
____loclib.e13116 = "to receive coins and open your account."
____loclib.e13117 = "Check balance"
____loclib.joinnow = "Join Now"
____loclib.loading = "Loading"
____loclib.e13118 = "Words doesn't match"
____loclib.e13119 = "Add email and continue"
____loclib.e13120 = "Download Application"
____loclib.e13121 = "There aren't Images Here"
____loclib.e13122 = "Latest Comments"

____loclib.e13123 = "Show more posts"
____loclib.e13124 = "More Awesome "+appname+" Posts!"
____loclib.e13125 = "Top posts section is empty!"
____loclib.e13126 = "Posts from people you follow will be shown here"
____loclib.e13127 = "Posts from people you follow will be shown here "
____loclib.e13128 = "Posts from people you follow will be shown here"
____loclib.registration = "Registration"
____loclib.editpost = "Edit Post"
____loclib.removepost = "Remove Post"
____loclib.removePostDialog = "Do you really want to remove post?"
____loclib.opennewwindow = "Open Post in New Window"
____loclib.opennew = "Open Post"
____loclib.pin = "Pin Post"
____loclib.pinned = "pinned"
____loclib.pinPostDialog = "Do you realy want to pin this post?"
____loclib.unpin = "Unpin Post"
____loclib.unpinPostDialog = "Do you realy want to unpin this post?"


____loclib.unsubscribe = "Unsubscribe"
____loclib.startchat = "Chat"
____loclib.reportpost = "Report Post"
____loclib.reportuser = "Report User"

____loclib.donate = "Donate"
____loclib.blockuser = "Block User"
____loclib.more = "More"
____loclib.showmore = "Show More"
____loclib.e13129 = "Attached images"
____loclib.e13130 = "Edited"
____loclib.e13131 = "You have blocked this User"
____loclib.e13132 = "rated"
____loclib.e13133 = "Share"
____loclib.e13134 = "There aren't any results for this search string"
____loclib.e13135 = "User haven't private key"
____loclib.e13136 = "All Posts"
____loclib.e13137 = "My Subscriptions" // This is the equivalent of a ‘News feed’. Don’t change the word ‘Pocket’ however, it’s a feature of "+appname+".
____loclib.e13138 = "Top posts"
____loclib["Top Posts Over"] = "Top Posts Over"
____loclib.bestFirst = "The best first"
____loclib.topnext = "Next"
____loclib.topprevious = "Previous"
____loclib.topactual = "Return to the latest"
____loclib.e13139 = "Search on "+appname+""
____loclib.e13140 = "Search on"
____loclib.notifications = "Notifications"
____loclib.showall = "Show all"
____loclib.e13141 = "You have no notifications"

____loclib.recommendations = "Recommendations"
____loclib.e13142 = "I saved my key, do not remind me anymore"
____loclib.e13143 = "Important!"
____loclib.e13144 = "Copy Text"
____loclib.e13145 = "Save key on device"
____loclib.e13146 = "End of posts"
____loclib.e13147 = "Share"
____loclib.e13148 = "Do yor really want to complain on this post?"
____loclib.e13149 = "user ratings"
____loclib.e13150 = "Post Rating"
____loclib.totalLikes = "Total likes"
____loclib.e13151 = "Nobody rate this post"
____loclib.e13152 = "User scores"
____loclib.e13153 = "Skip and proceed to website"
____loclib.e13154 = "Your Login Information"
____loclib.e13155 = "To use "+appname+" you need to generate your private cryptographic key which replaces login plus password from centralized social networks."
____loclib.users = "Users"
____loclib.userstx = "Users"
____loclib.user = "User"
____loclib.postscount = "Posts count"
____loclib.about = "About"
____loclib.e13156 = "Next Results"
____loclib.posts = "Posts"
____loclib.disablePreview = "Disable link preview"
____loclib.e13157 = "Search by"
____loclib.e13158 = "hasn't any results"
____loclib.e13159 = "The search phrase is empty"
____loclib.repost = "Repost"
____loclib.reposted = "Repost"
____loclib.e13160 = "Hello Pocketeers!"

____loclib.e13161 = "Add Tags For Your Post"
____loclib.e13162 = "You can enter less than 5 tags"
____loclib.e13163 = "There aren't changes in Post"
____loclib.e13164 = "Please add a few words to tell Pocketpeople about your link. What is it about? Why is it important? What is your opinion?"
____loclib.e13165 = "Your link to video is invalid. Please load valid video URL."
____loclib.e13166 = "You rescued"
____loclib.e13167 = "people from the censored web"
____loclib.e13168 = "Earn Pocketcoin for each signup through your link"
____loclib.e13169 = "Direct link"
____loclib.copy = "Copy"
____loclib.e13170 = "Include "+appname+" sign up call-to-action "
____loclib.more = "More"
____loclib.e13171 = "Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here"
____loclib.e13172 = "I want to invite you to a new decentralized blockchain social called "+appname+"! You will find a ton of interesting stuff and if you sign up, both of us will get Pocketcoin cryptocurrency bonus!"
____loclib.e13173 = "Send by email"
____loclib.e13174 = "Social sharing"
____loclib.e13175 = "Popular Tags"
____loclib.e13176 = "Address Type"
____loclib.e13177 = "Upload Photo"

____loclib.requiredfields = "required fields"
____loclib.e13178 = "Not linked to your profile"
____loclib.e13179 = "Unspent List"
____loclib.e13180 = "Your Invoice has Been Successfully Created"
____loclib.e13181 = "An Error has Occurred During the offer creating process"
____loclib.e13182 = "Block Explorer"
____loclib.e13183 = "Help center"
____loclib.e13184 = "Continue Registration"
____loclib.e13185 = "Connection Lost"
____loclib.e13186 = "Edit profile"
____loclib.e13187 = "Contents"
____loclib.e13188 = "Please save your private cryptographic key which replaces login plus password from centralized social networks"
____loclib.e13189 = "Leave and lose my key forever!"
____loclib.e13190 = ""+appname+" theme"
____loclib.e13191 = "Set Theme"
____loclib.uiScaleSetting = "Interface scaling"
____loclib.uiScaleSettingTitle = "Set scaling"
____loclib.e13192 = "Level"
____loclib.e13193 = "BONUS"
____loclib.e13194 = "Reputation and Status"
____loclib.e13195 = "Limitations"
____loclib.с= "It much take up"
____loclib.e13197 = "Recieve Pocketcoins"
____loclib.e13198 = "Approximate waiting time is"
____loclib.e13199 = "Join "+appname+" Now"

____loclib.e13200 = "Back To "+appname+""
____loclib.e13201 = "JOIN BETA"
____loclib.e13202 = ""+appname+" beta test will start on Jan 24"
____loclib.e13203 = "Thank you for joining "+appname+" beta test email list. It is not required to use "+appname+", however, we will use this email to send your surveys to improve the platform. Thank you for helping to shape the future of internet."
____loclib.e13204 = ""+appname+" Recieve Address"
____loclib.e13205 = "Parameters"
____loclib.e13206 = "Recieve Pocketcoin Amount"
____loclib.e13207 = "Send Amount"
____loclib.e13208 = "Available"
____loclib.e13209 = "Crowdfunding List"
____loclib.e13210 = "New deal"
____loclib.e13211 = "Copy Link And Share"
____loclib.amount = "Amount"
____loclib.label = "Label"
____loclib.message = "Message"
____loclib.copylink = "Copy Link"
____loclib.sendMessenger = "Send via messenger"
____loclib.e13211 = "Please fill this fields"
____loclib.e13212 = "Create Qr Code"
____loclib.e13213 = "Recieve Address"
____loclib.process = "Process"
____loclib.source = "Source"
____loclib.yourmessage = "Your message"
____loclib.e13214 = "Pocketcoin Amount"
____loclib.currency = "Currency"


____loclib.e13215 = "Select currency"
____loclib.e13216 = "Currency Amount"
____loclib.e13217 = "Time to this deal has been expired."
____loclib.e13218 = "Waiting blockchain confirmations"
____loclib.e13219 = "Send Pocketcoins to You"
____loclib.e13220 = "Pocketcoins delivered"
____loclib.errorreload = "Something went wrong. Please reload page and try again"
____loclib.e13221 = "Do you really want to delete information about this deal? Deal can't be stop"
____loclib.e13222 = "Download Desktop App - this is the most censorship resistant way to use "+appname+". Even if websites are shut down, desktop application will still run directly through the nodes."



____loclib.e13223 = "Download "+appname+" for Windows"
____loclib.e132232 = "Download "+appname+" for macOs"
____loclib.e13224 = "Download "+appname+" for Linux"

____loclib.e132233 = "Download "+appname+" for Android"
____loclib.e132221 = "Download Mobile App - this is the most usefull way to use "+appname+"."

____loclib.e13225 = ""+appname+" Node"
____loclib.e13226 = "Download Node"
____loclib.e13227 = "Download "+appname+" Node for Windows"
____loclib.e13228 = "Download "+appname+" Node for Linux"
____loclib.e13229 = "Invalid Private Key"
____loclib.e13230 = "Undefined connection error"

____loclib.e13231 = "Connection lost"
____loclib.e13232 = "Unable to connect with node"
____loclib.e13233 = "This comment was removed"
____loclib.e13234 = "Opreturn error/41"
____loclib.e13235 = "You cannot rate comment twice"
____loclib.e13236 = "This comment was removed"
____loclib.e13237 = "You cannot rate yourself"
____loclib.e13238 = "Comment sending error. Please wait and try again/ 37"
____loclib.e13239 = "Comment sending error. You are replying to a comment that was deleted"
____loclib.e13240 = "The comment you are replying to has been deleted by the user"
____loclib.e13241 = "This comment is too long, please break it up"
____loclib.e13242 = "You have been blocked by this person, you will be unable to comment on their posts"
____loclib.e13243 = "You have reached your limit of upvote comments in a 24 hour period"
____loclib.e13244 = "You have reached your limit of editing comments in a 24 hour period"
____loclib.e13245 = "You have reached your limit of sending comments in a 24 hour period"

____loclib.e13246 = "You are trying to edit someone else's post"
____loclib.e13247 = "You have reached your limit of editing 5 posts in a 24 hour period"
____loclib.saveSettingsLimit = "You have reached your limit of saving settings in a 24 hour period"

____loclib.e13248 = "You can only edit once per blockchain block. Please wait a minute, then try again"
____loclib.e13249 = "You cannot block yourself"
____loclib.e13250 = "You have already blocked this user"
____loclib.e13251 = "You have not blocked this user"
____loclib.e13252 = "Transaction is malformed"
____loclib.e13253 = "You cannot refer yourself"
____loclib.e13254 = "This username is too long"
____loclib.e13255 = "This username is already in use"
____loclib.e13256 = "This post is too long, please break it up."
____loclib.e13257 = "Your "+appname+" reputation score does not allow for registering of complaints yet"
____loclib.e13257_1 = "Your "+appname+" reputation score does not allow you to put negative ratings on publications"

____loclib.e13258 = "You have reached the limit of complaints in a 24 hour period"
____loclib.e2000 = "Connection error. Please try again"

____loclib.e13259 = "Cannot complain about your own post"
____loclib.e13260 = "You have already registered your complaint about this post"
____loclib.e13261 = "Save Key"
____loclib.e13262 = "Later"
____loclib.e13263 = "Subscribe and Turn On notifications from this user"
____loclib.e13264 = "Subscribe without notifications"
____loclib.e13265 = "Your name is no longer available, please choose another one"
____loclib.e13266 = "White Theme"
____loclib.e13267 = "Dark Theme"
____loclib.e13268 = "Coinstake win"
____loclib.e13269 = "Transactions receive"
____loclib.e13270 = "Upvotes receive"
____loclib.e13271 = "Comment receive"
____loclib.e13272 = "Answer receive"
____loclib.e13273 = "New Followers"
____loclib.e13274 = "Rescued Users"
____loclib.e13275 = "Comment Score"
____loclib.e13276 = "Show embed videos"
____loclib.e13277 = "Autoplay videos"
____loclib.e13278 = "Start "+appname+" Automatically"
____loclib.e13279 = "Chat"
____loclib.e13280 = "Tags"
____loclib.e13281 = "Last Comments"
____loclib.e132812 = "Comments"
____loclib.e13282 = "Telegram bot token"
____loclib.e13283 = "Post from Telegram channel"
____loclib.e13284 = "Add bot into chat and select"
____loclib.e13285 = "Ask before post from telegram"
____loclib.e13286 = "Ask before send to telegram"
____loclib.e13287 = "Send to telegram channel"
____loclib.video = "Video"
____loclib.e13288 = "Main Widgets Page"
____loclib.e13289 = "Integration with Telegram"

____loclib.sound = "Sound"
____loclib.system = "System"
____loclib.e13290 = "Would do you like to follow"
____loclib.e13291 = "Do you really want send message to Telegram?"
____loclib.send = "Send"
____loclib.e13292 = "You already have node on this host"
____loclib.e13293 = "Internal Error"
____loclib.e13294 = "PGSQL Database Enable"
____loclib.e13295 = "DB Host"
____loclib.e13296 = "DB Port"
____loclib.e13297 = "DB Max"
____loclib.e13298 = "DB Idle Timeout, ms"
____loclib.e13298 = "DB Name"
____loclib.e13300 = "DB User"
____loclib.e13031 = "DB Password"
____loclib.e13302 = "Proxy server on"
____loclib.e13303 = "Proxy https server port"
____loclib.e13304 = "Proxy wss server port"
____loclib.e13305 = "Server SSL Key, pem"
____loclib.e13306 = "Server SSL Cert, pem"
____loclib.e13307 = "Server SSL Passphrase"
____loclib.e13308 = "Firebase admin SDK"
____loclib.e13309 = "Your Crane Address"
____loclib.e13310 = "Captcha Enable"
____loclib.e13311 = "Ip limiter enable"
____loclib.e13312 = "Server"

____loclib.e13313 = "Data Base, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Other"
____loclib.e13316 = "Enable"
____loclib.e13317 = "Binary path"
____loclib.e13318 = "Config path"
____loclib.e13319 = "Data path"
____loclib.e13320 = "Staking Address"
____loclib.e13321 = "Import the account address to the node for stacking"
____loclib.e13322 = "State"
____loclib.e13323 = "Staking addresses"
____loclib.e13324 = "Last Block"
____loclib.control = "Control"
____loclib.setup = "Setup"
____loclib.e13325 = "Do you really want post messages from Telegram?"
____loclib.e13326 = "Post"
____loclib.e13327 = "Do you really want use proxy again?"
____loclib.e13328 = "liked your comment!"
____loclib.e13329 = "New Comment Like"
____loclib.e13330 = "shared your post"
____loclib.e13331 = "shared your post"
____loclib.e13332 = "has a brand new post"
____loclib.e13332v = "has a brand new video"
____loclib.e13333 = "Incoming transaction"
____loclib.e13334 = "Congratulations, you have won"
____loclib.e13335 = "Pocketcoin for your latest"
____loclib.e13336 = "with message"
____loclib.e13337 = "commented your post"
____loclib.e13338 = "answered on your comment"
____loclib.reply = "Reply"
____loclib.e13339 = "You rescued someone from the censored web. Some coins are on their way!"
____loclib.e13340 = "Congrats!"
____loclib.e13341 = "followed you"
// <%=e("e13352")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13337")
____loclib.e13342 = "New Follower"
____loclib.e13343 = "upvoted your post"
____loclib.e13344 = "New Upvote"
____loclib.e13345 = "sent you private message"

____loclib.e13346 = "You have new messages"
____loclib.e13347 = "Updates to "+appname+" are available. Apply the updates now?"
____loclib.e13348 = "No, later"
____loclib.e13349 = "Updates to "+appname+" are available. Go to the page to download the new version?"
____loclib.e13350 = "Join "+appname+" & Earn Pocketcoin Now"
____loclib.e133512 = "Please write a few words about yourself to help people decide if they want to follow you"
____loclib.e13351 = ""+appname+" chat"
____loclib.e13352 = "You do not have chat priviliges"

____loclib.e14001 = "Language of publication"
____loclib.e14002 = "Are you sure you want to clear the post?"
____loclib.e14003 = "Technical"
____loclib.e14004 = "Where do I download the client?"
____loclib.e14005 = "Where do I download the node?"
____loclib.e14006 = "Click on "+appname+"Setup.exe"
____loclib.e14007 = "With any questions email core@pocketnet.app"
____loclib.e14008 = ""+appname+""
____loclib.e14009 = "I see a PN address and a wallet address... are both these addresses on the PN blockchain?"
____loclib.e14010 = "PN address is the one used for posting content and using social network in general. It also keeps coins that you win for your highly rated posts."
____loclib.e14011 = "Wallet addresses are to keep the rest of coins."
____loclib.e14012 = "Can I link to my profile? or my 'page'? So that i can post it into my community to bring members over."
____loclib.e14013 = "In the browser, go to your profile by clicking on avatar in the upper right and just copy the browser address, everyone who will sign up from that link will follow you automatically and you will actually get rewards."
____loclib.e14014 = "On the desktop,  from a desktop application go to your profile,  once there, there will be three icons to the right of your avatar first there will be a wallet with number of coins, then a bell with notifications and a third is a green cross icon click on that green cross  and click copy,  send that link around everyone who subscribes will follow you and you will get rewards."
____loclib.e14015 = "The star system. is there a limit on how many stars a person has to give people?"
____loclib.e14016 = "There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you get 100 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 200 ratings a day."
____loclib.e14017 = "How long until I&rsquo;m able to update my profile? "
____loclib.e14018 = "You are able to update your profile once every hour."
____loclib.e14019 = "Is there a Linux Desktop?"
____loclib.e14020 = "Yes! It is in the works 2-3 weeks as the beta test progresses."
____loclib.e14021 = "Where do you save the video content?"
____loclib.e14022 = "We are working on video storage, in the meantime you can share from Bitchute, Youtube, Vimeo and other video sources."
____loclib.e14023 = "Is there a mobile app?"
____loclib.e14024 = "Yes. But we strongly encourage everyone to also download the desktop app, since, unlike Android or iPhone app, it cannot be taken away from you by Google or Apple."
____loclib.e14025 = "Can you tell me what is the limit for posting each day or hour?"
____loclib.e14026 = "We do have some limitations, but after testing it we have increased our limits. At the outset you can make 15 posts and issue 100 ratings every 24 hours. Once your reputation grows above 50, you will be able to make up to 30 posts and 200 ratings every 24 hours."
____loclib.e14027 = "What is reputation and how is it calculated?"
____loclib.e14028 = "Your reputation is the sum of your ratings calculated in the following way. Note, that users with reputation below 50 do not affect anyone`s reputation or coin winnings. They can rate the content, but it does not affect reputation."
____loclib.e14029 = "So, if you have two 5 star ratings and one 1 star rating, the total will be"
____loclib.e14030 = "Is there a way to delete or edit a post?"
____loclib.e14031 = "Not at this point, as it is baked into blockchain. However, we are working on a feature to create an overwrite transaction as well &#10075;hide&#10076; transaction, which would effectively translate to edit or delete."
____loclib.e14032 = "Is there a way to search for a user?"
____loclib.e14033 = "Click the search magnifying glass on the top and search by username or by keywords."
____loclib.e14034 = "How do you follow someone?"
____loclib.e14035 = "Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts chronologically, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)"
____loclib.e14036 = "Can it be used on Brave or Duck Duck go browsers?"
____loclib.e14037 = ""+appname+" should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab "+appname+"Setup.exe here: https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta). It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe."
____loclib.e14038 = "Can we reply to our own/and other&rsquo;s posts?"
____loclib.e14039 = "Yes, commenting is live below each post.."
____loclib.e14040 = "How to add a tag to a post?"
____loclib.e14041 = "Just type in the field tag and press enter. No need to specify #, it will be added automatically."
____loclib.e14042 = "How can I use the public address?"
____loclib.e14043 = "Your public address is what "+appname+" uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. "+appname+" uses the same exact cryptography as Bitcoin."
____loclib.e14044 = "Will there be a downloadable executable for Mac?"
____loclib.e14045 = "Yes - we are working of Mac platform. Target is for mid-April."
____loclib.e14046 = "Pocketcoin"
____loclib.e14047 = "What can I do with Pocketcoin?"
____loclib.e14048 = "Currently you can win it or send as a gift. However, if and when "+appname+" takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token."
____loclib.e14049 = "Is Pocketcoin like a share of stock in "+appname+"?"
____loclib.e14050 = "Definitely no. "+appname+" is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, "+appname+" will include a marketplace where goods and services will be sold directly for Pocketcoin"
____loclib.e14051 = "Can I buy additional Pocketcoin?"
____loclib.e14052 = "Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise "+appname+" to the world. So, by buying a Pocketcoin you are positioning yourself for success of "+appname+", but just as importantly you are helping "+appname+" achieve this success. All major social networks had billion dollar advertising budgets. "+appname+" was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now."
____loclib.e14053 = "Can I buy Pocketcoin for US Dollars or other fiat currency?"
____loclib.e14054 = "No."
____loclib.e14055 = "Privacy"
____loclib.e14056 = "Are people who do not enter their real names anonymous?"
____loclib.e14057 = "Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates."
____loclib.e14058 = "Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?"
____loclib.e14059 = "Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power."
____loclib.e14060 = "Is my public key like a wallet ID that I enter on my profile and people can send points to?"
____loclib.e14061 = "Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!"
____loclib.e14062 = "Can I run a node on my headless server?"
____loclib.e14063 = "We will put the node&rsquo;s sources into GitHub. Instructions for running a node will be made available in early April."
____loclib.e14064 = "How can I sign back in?"
____loclib.e14065 = "You can use your private 12-word key or a QR code to sign in."
____loclib.e14066 = "Curation of content"
____loclib.e14067 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?"
____loclib.e14068 = "This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley."
____loclib.e14069 = "Specifics of curation on "+appname+"."
____loclib.e14070 = "When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community)."
____loclib.e140701 = "We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?"
____loclib.e140702 = "Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries."
____loclib.e140703 = "We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials."
____loclib.e14071 = "Important Note on Racism."
____loclib.e14072 = "Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn "+appname+" into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on "+appname+". Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. "+appname+" team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on "+appname+". Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic."
____loclib.e14073 = "Specifics of curation on "+appname+"."
____loclib.e14074 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?"
____loclib.e14075 = "Sometimes we can have a user who comes in with a specific purpose to attack "+appname+" by posting a series of vile images. To protect against that we have a following mechanism. If someone’s reputation reaches -50 (negative 50), their account is automatically blocked. Getting a reputation of -50 is equivalent to having 25 one star ratings and no four or five star ratings. This is nearly impossible to achieve without having lots of bad posts."
____loclib.e14076 = "Flagging a specific post"
____loclib.e14077 = "When your reputation gets to 50 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials."
____loclib.e14078 = "How is "+appname+" different from..."
____loclib.e14079 = "Twitter, Facebook, Reddit & other centralized platforms?"
____loclib.e14080 = "There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users."
____loclib.e14081 = "Decentralized platforms like Minds.com and Sola?"
____loclib.e14082 = "Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor."
____loclib.e14083 = "From Steemit?"
____loclib.e14084 = "Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that."
____loclib.e14085 = "Decentralized platforms like Mastodon and others?"
____loclib.e14086 = "While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. "+appname+" features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge."
____loclib.e14087 = ""+appname+" ecosystem"
____loclib.e14088 = "How is "+appname+" develpment funded?"
____loclib.e14089 = ""+appname+" is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch "+appname+" will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner."
____loclib.e14090 = "What is Pocketcoin?"
____loclib.e14091 = "Pocketcoin is a network token. It is used exclusively to buy advertising from "+appname+" contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of "+appname+" and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes."
____loclib.e14092 = "How are content creators and node operators rewarded?"
____loclib.e14093 = ""+appname+" features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless."
____loclib.e14094 = "What if users post illegal content, pornography and SPAM?"
____loclib.e14095 = ""+appname+" is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag illegal content OR content that threatens mass adoption of "+appname+", not simply the content they find offensive. To make sure that "+appname+" is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media."
____loclib.e14096 = "Who runs the "+appname+"?"
____loclib.e14097 = "There is no corporate entity or single individual who owns or controls the "+appname+"."
____loclib.e14098 = "The Designer of the "+appname+", Daniel Sachkov changed his main focus in the Summer of 2019 he is now doing research on further decentralization of blockchain technology that will benefit everyone. He handed control of the Project in accordance with the idea of a full decentralized social media architecture and design over to the community and the Nodes who run the Network."
____loclib.e14099 = "A team of capable, changing developers and community volunteers is working on the realisation of his Vision ever since. "

____loclib.e14100 = "Help Center"
____loclib.e14101 = "Block Explorer"
____loclib.e14102 = "F.A.Q."
____loclib.e14103 = "Roadmap"
____loclib.e14104 = "Node Setup"
____loclib.e14105 = "Videos"
____loclib.e14106 = "Applications"
____loclib.e14107 = "Check for updates"
____loclib.e14108 = "Share answer"
____loclib.e14109 = "Where do I download the Android App?"
____loclib.e14110 = "Google Play Market"


____loclib.peertubeAddVideo = "Upload Video"
____loclib.peertubeAddStream = "Add live stream to post"

____loclib.e14111 = "There was a problem with loading images"
____loclib.editcomment = "Edit Comment"
____loclib.system16 = {
    charts : {

    }
}


____loclib.downvoteShareMessage = "downvoted your post"

____loclib.shareviagroupemail = "Email"
____loclib.shareviagroupmessenger = "Messengers"
____loclib.shareviagroupsocial = "Social networks"
____loclib.shareviagroupblog = "Blogs"

____loclib.anotherSiteCaption = "You follow an external link to a third-party site"
____loclib.anotherSiteDisc = "We are not responsible for the content of the site and strongly recommend that you do not provide any of your personal data on third-party sites."

____loclib.Categories = "Categories"
____loclib.addtagsCategories = "Categories and tags"
____loclib.addcategory = "Add Category"
____loclib.categoryname = "Category name"
____loclib.entercategoryname = "Enter category name"
____loclib.categoryfilter = "Category filter"
____loclib.emptycategoryname = "Please enter name of category."
____loclib.doublename = "Category with this name already exist. Please choose another name."

____loclib.showmoreusers = "Show more users"
____loclib.zeron = "Nothing found";
____loclib.maxtags = "Only 5 tags maximum allowed";

____loclib.videotitle = "Enter video/stream title";
____loclib.videodesc = "Enter video/stream description";
____loclib.entervideocaption = "Please, enter video title";

____loclib.period = "Period";
____loclib.periodday = "One Day";
____loclib.period3day = "Three Days";
____loclib.period7day = "One week";
____loclib.period31day = "One Month";
____loclib.period182day = "Half of year";

____loclib.shareBareLink = "Share Video Link";
____loclib.videoCopied = "Video link successfully copied to clipboard";

____loclib.editWallpaper = "Change Preview Image";
____loclib.removeVideo = "Remove Video";

____loclib.removeVideoDialog = "Are you sure you want to delete this video?"

____loclib.pterror_meta = "Peertube: Undefined request"
____loclib.pterror_host = "Peertube: Peertube server not found"
____loclib.pterror_link = "Peertube: Unknown Peertube link"
____loclib.pterror_removeerror = "Peertube: Unable to remove video. Pleasy try again"
____loclib.pterror_updateempty = "Peertube: No changes found to update"
____loclib.pterror_uploaderror = "Peertube: Video has not been uploaded"
____loclib.pterror_dailyquotalimit = "Peertube: You have reached your video upload limit"
____loclib.pterror_videoQuotaUsedDaily = "Peertube: Failed to get channel information (quota)"
____loclib.pterror_usersMe = "Peertube: Failed to get channel information"
____loclib.pterror_oauthClientsLocal = "Peertube: Failed to get oAuth information from server"
____loclib.pterror_pocketnetAuth = "Peertube: Peertube-"+appname+" authorization failed"
____loclib.pterror_getToken = "Peertube: Unable to get Token"
____loclib.pterror_videonotselected = "Peertube: Video not Selected"


____loclib.videoTranscodingError = "There was an error with processing your video"
____loclib.videoUploadingFinish = "Finishing uploading..."
____loclib.uploadNewVideo = "Upload New Pocketvideo"
____loclib.selectVideoFile = "Select video file"
____loclib.uploadVideoProgress_binaries = "Preparing binaries:"
____loclib.uploadVideoProgress_processing = "Processing video:"
____loclib.uploadVideoProgress_uploading = "Uploading video:"










____loclib.pbp_1 = "Bastyon Bonus Program"
____loclib.pbp_2 = "Criteria for bonus for original content:"
____loclib.pbp_3 = "Every 15k views + 1500 five star ratings from unique users  + 1500 referral users"
____loclib.pbp_4 = "PKOIN Equivalent:"
____loclib.pbp_5 = "1,000 USDT"
____loclib.pbp_6 = "How You Speed Up Your Bonus?"
____loclib.pbp_7 = "Embed your Bastyon video to external websites (click Share and choose Embed)"
____loclib.pbp_8 = "Share your video to social networks and via email"
____loclib.pbp_9 = "Share the link to your personal page (go to your profile and click Share). You can create special posts that are exclusive only for your Bastyon subscribers. When creating a post choose an option Visible Only for Subscribers. Exclusive materials will increase the number of referrals."
____loclib.pbp_10 = "If you invite a video blogger and can prove it, you get a bonus equal to 25% of their earnings from the first 4 bonuses."
____loclib.pbp_11 = "For any questions, email"

____loclib.pbp_6_1 = ""
____loclib.pbp_6_2 = ""
____loclib.pbp_6_3 = ""



____loclib["Top Videos"] = "Top Videos"
____loclib["More videos by this author"] = "More videos by this author"

____loclib["pdirectdialog"] = "External proxies are not responding, would you like to switch to a local proxy?"


____loclib.goLive = "Go Live"
____loclib.streamInfo = "Stream Info"
____loclib.streamCreating = "Creating Stream"

____loclib.importFromExternal = "or import from YouTube"


____loclib.importHeading = "Import Video from YouTube"
____loclib.importInputPlaceholder = "Paste link to your YouTube video"
____loclib.importInputLabel = "Video Url"

____loclib.capitalWarning = "Stream quality limitations"
____loclib.streamSettingsWarn = "For optimal performance, please use streaming settings no higher than following: 2000 kb/s bitrate, 1920x1080p resolution. Otherwise your live could be terminated or unstable"

____loclib.keygeneration = "Cryptography keys generation"

____loclib.failedStreamGeneration = "Unable to start stream"

____loclib.hideallnotifications = "Hide all notifications"

____loclib.e133452 = "sent you message"
____loclib.e133453 = "invite you in chat"


____loclib.createnewcontinue = "Continue creating account";


____loclib.transactionnotfound = "Transaction not found";

____loclib.donateself = "You can't donate yourself";
____loclib.donated = "commented your post and donated"
____loclib.incoins = "Enough coins"
____loclib.yourbalance = "Your balance"
____loclib.sumoftransaction = "Sum of transaction"


____loclib.videoBitrateError = "Video bitrate is too high. Please, use file with lower quality/resolution"
____loclib.videoQualityInfo = "Maximum allowed video bitrate  - 8 Mbit/s. If your file exceeds this limit, the download would be terminated. Maximum allowed resolution - 720p. <br/> Recommended bitrates: <br/> <b>1080p:</b> 5081 Kbps <br/> <b>720p:</b>  2680 Kbps <br/> <b>480p:</b>  1300 Kbps <br/> <b>360p:</b>  700 Kbps"
____loclib.videoQualityCaption = "Video quality limitations"
____loclib.videoFormats = "List of supported video formats: .mp4, .mkv, .mov, .avi, .wmv, .flv, .f4v, .3g2, .3gp, .mts, .m2ts, .mxf, .nut"
____loclib.videoSizeError = "Selected video file exceeds the limit of 4 Gb per video. Please compress it or select another one."
____loclib.videoSizeAtt = "Maximum allowed file size: 4 Gb."



____loclib.streamLinks = "Streaming software links"
____loclib.linkRTMP = "RTMP Url"
____loclib.linkStreamKey = "Stream Key"



____loclib.videoCabinet = "My Videos";
____loclib.uploadQuota = "Daily Uploading Quota";
____loclib.attachVideoToPost = "Create Post With This Video";

____loclib.linkToPost = "Link to Post";
____loclib.attachVideoToPostShort = "Post";

____loclib.totalStars = "Average rating (Total Votes)";
____loclib.totalComments = "Total Comments";
____loclib.totalViews = "Video Views";

____loclib.enterVideoName = "Search by video name";

____loclib.videoTranscoding = "Video is being processed and may not work properly / induce extended traffic consumption. Do you still want to post it?";
____loclib.waitForTranscoding = "Wait for processing";

____loclib.bonusProgram = "Bonus Program Status";
____loclib.bonusProgramViews = "Total Video Views";
____loclib.bonusProgramRatings = "Total Ratings";

____loclib.sortBy = "Sort by:";
____loclib.sortDirection = "Sort direction:";
____loclib.sortDirectionAsc = "Ascending";
____loclib.sortDirectionDesc = "Descending";
____loclib.sortByName = "Name";
____loclib.sortByCreatedAt = "Creation Date";
____loclib.sortByDuration = "Duration";
____loclib.sortByViews = "Views";

____loclib.unableToAuthorize = "Unable to authorize";
____loclib.unableToAuthorizeBody = "Unfortunately, the application cannot authenticate this account on the video server. You need at least 5 PKOIN or 50 reputation to upload videos.";

____loclib.unableToAuthorizeConnection = "Unable to authorize";
____loclib.unableToAuthorizeConnectionBody = "Unfortunately, the application cannot authenticate this account on the video server.  Please try again later";




____loclib.download = "Download";
____loclib.downloaded = "Downloaded";
____loclib.downloadedEmpty = "Downloaded posts will be shown here";
____loclib.emptyDescription = "Description is empty";
____loclib.transcodingShort = "Processing";
____loclib.editVideoDescription = "Edit video name/description";
____loclib.errorChangingDescription = "Unable to change video name/description";
____loclib.downloadVideo = "Save video";
____loclib.downloadingVideo = "Saving video";
____loclib.deleteSavedVideo = "Delete saved video";

____loclib.downloadShare = "Save Share";
____loclib.deleteSavedShare = "Delete Share";

____loclib.selectQuality = "Select the quality of the uploaded video";
____loclib.downloadedVideos = "Downloaded videos";
____loclib.deleteAllDownloadedVideos = "Delete all downloaded videos";
____loclib.noDownloadedVideos = "No downloaded videos";
____loclib.deleteVideoDialog = "Delete saved video";
____loclib.deleteAllVideoDialog = "Are you sure you want to delete all the videos?";
____loclib.videosDeleted = "Videos deleted!";

____loclib.enterVideoName = "Enter video name";
____loclib.enterVideoDescription = "Enter video description";


____loclib.doyouwantseepk = "Do you really want to see your private key?";
____loclib.copycode = "Copy Private Key";
____loclib.privatekeyqr = "Private key QR code";
____loclib.saveimage = "Save image";

____loclib.showAllButton = "Show all";
____loclib.hideAllButton = "Hide";

____loclib.UniqueUsers = "Unique Raters";
____loclib.ErrorLoadingRates = "Loading Error";

____loclib.userGuides = "Guides";
____loclib.liveSreamingGuide = "Live Streaming";

____loclib.bastyonhelperTitle1 = "Pocketnet has moved",
____loclib.bastyonhelperTitle2 = "Bastyon of Free Speech";
____loclib.bastyonhelperSubtitle1 = "Pocketnet is now";
____loclib.bastyonhelperSubtitle2 = "Please, follow the link bellow";


____loclib.videotranscodingwait = "Please wait, this video is being processed. This may take some time, after it is transcoded, you will be able to post it on Bastyon.";
____loclib.views = "Views";


____loclib.saveshare = "Add videos to saved";
____loclib.successdownloaded = "Video saved";


____loclib.logoutaccount = "Sign out of your account";
____loclib.closeapplication = "Exit the application";


____loclib.attachVideoLenta = "Attach video to post";
____loclib.attachVideoLentaShort = "Attach";

____loclib.linkToPostLenta = "Already posted"

____loclib.ReferralUsers = "Referral Users. Total/From&nbsp;01.11.2021"
____loclib.lockedaccount = "Your account is locked due to reputation below -30"
____loclib.lockedaccounta = "Author Account is locked due to reputation below -30"

____loclib.lockedaccountacomment = "Comment author Account is locked due to reputation below -30"
____loclib.hiddenCommentLabel = "Comment hidden due to low rating"

____loclib.blockedbymeHiddenCommentLabel = "Comment hidden because you have blocked a user"
____loclib.hiddenCommentsLabel = "Comment hidden due to low ratings of the commenter"

____loclib.showhiddenComment = "Show"

____loclib.visibletoeveryone = 'Visible for everyone'
____loclib.visibleonlytosubscribers = 'Visible only for subscribers'
____loclib.visibleonlytoregistered = 'Visible only for Bastyon users'

____loclib.sharevisibility_sub = 'For subscribers'
____loclib.sharevisibility_reg = 'For Bastyon users'

____loclib.sharevisibilitylabel_sub_post = 'Author chose to make this <b>post</b> available only for subscribers'
____loclib.sharevisibilitylabel_reg_post = 'Author chose to make this <b>post</b> available only for registered Bastyon users'
____loclib.sharevisibilitylabel_sub_article = 'Author chose to make this <b>article</b> available only for subscribers'
____loclib.sharevisibilitylabel_reg_article = 'Author chose to make this <b>article</b> available only for registered Bastyon users'
____loclib.sharevisibilitylabel_sub_video = 'Author chose to make this <b>video</b> available only for subscribers'
____loclib.sharevisibilitylabel_reg_video = 'Author chose to make this <b>video</b> available only for registered Bastyon users'

____loclib.buy = 'Buy';

____loclib.topAuthors = 'Recommended Authors';
____loclib.recommendedPosts = 'Recommended Posts';
____loclib.rating = 'Rating';
____loclib.setupVideoNodeGuide = 'Setup Video Node'
____loclib.subscribers3 = 'Subscribers';

____loclib.MainBoard = 'Stand up to censorship &';
____loclib.MainBoard1 = 'gain financial independence';
____loclib.MainBoard2 = 'The first censorship-resistant social network protocol';
____loclib.MainBoard3 = 'Based on Blockchain technology, decentralized and secure.';
____loclib.MainBoard4 = 'No corporation, no centralized servers, moderated by the community ';
____loclib.MainBoard5 = 'Powered by Pocketcoin (PKOIN) to reward creators and contributors';
____loclib.MainBoard55 = 'Open-source & transparent rules that are the same for everyone';
____loclib.MainBoard6 = 'Get it on';
____loclib.MainBoard7 = 'Google Play';
____loclib.MainBoard8 = 'Download for';




____loclib.works = 'We Believe in Freedom';
____loclib.works1 = 'Bastyon is an innovative network that can bypass common censorship tactics, such as blocking of domains and banning bloggers for dissent';
____loclib.works2 = 'Bastyon is also a video sharing platform that, unlike traditional and mainstream social media, gives your privacy and freedom from arbitrary censorship';
____loclib.works3 = 'Bastyon is also a private and freedom-oriented financial system powered by Pocketcoin (PKOIN) that is used to promote content and goods';
____loclib.works4 = 'We are driven by FREEDOM';
____loclib.works5 = 'Does not depend on corporate entities';
____loclib.works6 = 'Does not depend on banks for financing and operations';
____loclib.works7 = 'Does not depend on any domain or website which can be easily blocked';


//aboutHome
____loclib.aboutServices = 'NO CENSORSHIP';

____loclib.aboutServices1 = 'Censorship resistant';
____loclib.aboutServices2 = 'Bastyon exists on decentralized node computers around the world run by users. Every node computer runs on the same exact transparent set of rules, preventing someone from arbitrarily banning content. Not even Bastyon developers can ban anyone, the platform is user moderated';
____loclib.aboutServices3 = 'Not even Bastyon developers can ban anyone, the platform is user moderated';

____loclib.aboutServices4 = 'Bitcoin of Social Media';
____loclib.aboutServices5 = 'Bastyon runs on the on the blockchain and does not depend on any website or a domain. As long as there are several nodes running somewhere in the world, the network can operate and creators will have access to the followers and users to content. ';
____loclib.aboutServices6 = 'Bastyon is the “Bitcoin of social media”';

____loclib.aboutServices7 = 'Privacy Protection';
____loclib.aboutServices8 = 'Bastyon account is not tied to your identity or a phone number, only email verification is required. Multiple accounts are permitted to protect your privacy. No personal data is ever acquired or stored. Bastyon also features a peer-to-peer encrypted messenger. ';
____loclib.aboutServices9 = 'Your privacy is the main goal of Bastyon. Your private key is known only to you and cannot be recovered even by the developers.';
____loclib.aboutServices10 = 'In addition, hackers cannot enter your account and change your password.';

____loclib.aboutServices11 = 'Earn with Bastyon';
____loclib.aboutServices12 = 'You can get paid 1,000 USD';
____loclib.aboutServices13 = 'There are many ways of monetizing your content using Pocketcoin (PKOIN). Unlike You earn PKOIN for popular content, users can attach PKOIN to featured comments. A decentralized ad marketplace with 100% proceeds going to bloggers is set to be released in December 2021.  ';

____loclib.aboutServices14 = 'Upload your videos';
____loclib.aboutServices15 = 'Bastyon lets you';
____loclib.aboutServices16 = 'share your posts and videos';
____loclib.aboutServices17 = ', Upload them safely, import them from YouTube (contact us so that we can help!), make sure to let them visible to everyone. Forever. No one will be able to remove or ban them.';


____loclib.aboutServices18 = 'Open Source';
____loclib.aboutServices19 = 'We believe that';
____loclib.aboutServices20 = 'privacy and security';
____loclib.aboutServices21 = 'have to pass through Open Source projects. The entire project is available on GitHub so that you can check that there are no backdoors and that Bastyon is not storing any personal data.';


____loclib.aboutNewBlock = 'How to Earn with Bastyon';
____loclib.aboutNewBlock1 = 'Popular Content & Featured Comments ';
____loclib.aboutNewBlock2 = 'You earn PKOIN for votes from users that are active on the platform. So, if you bring over your audience, you will be protected from censorship, while earning for their interaction with your content. Your followers can also add PKOIN to their comments to feature them under your post, 100% of proceeds go to you, because there is no corporate entity.';
____loclib.aboutNewBlock3 = 'Bonus Program';
____loclib.aboutNewBlock4 = 'Bastyon has a limited time bonus program for video bloggers with 1,000 USD earnings for each 15k video views, 1000 invited users and 1,250 interactions. The bonus is paid in Bitcoin or PKOIN, depending on blogger preference. This is a limited time program.';
____loclib.aboutNewBlock5 = 'Decentralized Ads ';
____loclib.aboutNewBlock6 = 'A decentralized ad marketplace slated for release in December 2021 will allow advertisers to create posts and offer them to bloggers. A blogger can examine the ad post and repost if appropriate. All interactions on bloggers’ channel will go directly to blogger’s wallet, 100% of ad proceeds.';



____loclib.aboutOpen = 'Discover Bastyon';
____loclib.aboutOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.aboutOpen2 = 'Official Website';
____loclib.aboutOpen3 = 'Contact us';
____loclib.aboutOpen4 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';
____loclib.aboutOpen5 = 'Source Code';
____loclib.aboutOpen5_1 = 'Email us at:';

/////////////aboutYoutube
____loclib.aboutMainBoard = 'Bastyon - the best alternative to YouTube';
____loclib.aboutYoutubeMainDescription1 = 'Some people ask us:';
____loclib.aboutYoutubeMainDescription2 = '"Why should I use Bastyon?"';
____loclib.aboutYoutubeMainDescription3 = 'The real question is:';
____loclib.aboutYoutubeMainDescription4 = '"Why should you use YouTube?!"';
____loclib.aboutYoutubeMainDescription5 = 'YOUTUBE HAS BEEN BANNING AND DEMONETIZING THOUSANDS OF ACCOUNTS';
____loclib.aboutYoutubeMainDescription6 = 'PEOPLE WITH HUNDREDS OF THOUSANDS OF SUBSCRIBERS';
____loclib.aboutYoutubeMainDescription7 = 'EVEN WHEN NOT BANNED, AUTHORS ARE SHADOWBANNED OR DEMONETIZED';

____loclib.aboutYoutubeThreeColumn1 = 'Imagine: one day you have 20k, 100k or even 1M subscribers on your YouTube channel.';
____loclib.aboutYoutubeThreeColumn2 = 'The following day your account does not exist anymore.';
____loclib.aboutYoutubeThreeColumn3 = 'Banned, forever. No chance to appeal.';
____loclib.aboutYoutubeThreeColumn4 = 'You know, you have not only lost your subscribers.';
____loclib.aboutYoutubeThreeColumn5 = 'You have lost a constant passive income generated by the ADS on your videos.';
____loclib.aboutYoutubeThreeColumn6 = 'You have lost thousands of people that used to follow you and share your videos.';
____loclib.aboutYoutubeThreeColumn7 = "You have lost access to your videos if you didn't have a backup.";
____loclib.aboutYoutubeThreeColumn8 = 'The worst thing is: YouTube decisions are arbitrary and are typically final';
____loclib.aboutYoutubeThreeColumn9 = 'The worst thing is: YouTube decisions are typically final.';
____loclib.aboutYoutubeThreeColumn10 = "You have no way at all to get back your channel, subscribers and money. They're gone, forever.";
____loclib.aboutYoutubeThreeColumn11 = 'Move to Bastyon before it’s too late. We can import your videos without effort, and you can get paid 1,000 $ for each 15,000 views! (plus 1,250 interactions and 1000 invited users to your channel)';
____loclib.aboutYoutubeThreeColumn12 = 'What are you waiting for?!';

____loclib.aboutYoutubeH3Section = "Building a community of followers on YouTube is like building a home on a land you don't own.";

____loclib.aboutYoutubeImgAndText1 = "EARN WITH BASTYON NO DEMONETIZATION";
____loclib.aboutYoutubeImgAndText2 = 'Bastyon pays you to post videos and for each interaction (like/comment) that you get. Right now Bastyon has a bonus program that gives you 1,000 $ (in crypto currency) for each 15,000 views + 1,250 interactions + 1,000 invited users to your channel';
____loclib.aboutYoutubeImgAndText3 = 'And you can talk about "sensitive" topics. You will never be blocked or demonetized, if you do not post pornography or illegal content that will be moderated by the community. In addition, if you bring your subscribers, you get referrals, too.'
____loclib.aboutYoutubeImgAndText4 = 'Free Speech Zone – Moderated by the Community ';
____loclib.aboutYoutubeImgAndText5 = 'On Bastyon you can talk about sensitive topics (and they are multiplying by the day): COVID, politics, climate change, first and second amendment. Community of users moderates Bastyon and the only topics that are blocked are pornography and illicit content.';
____loclib.aboutYoutubeImgAndText6 = 'We believe in real freedom of speech and community of users does not ban or moderate content based on disagreement of opinions. And Bastyon is not owned by a corporation and is independent of the banking system.';
____loclib.aboutYoutubeImgAndText7 = 'PRIVATE AND SECURE';
____loclib.aboutYoutubeImgAndText8 = 'Bastyon does not collect any personal information. No name, no phone number, no IP address, not your identity. Your login to the Bastyon account is your private key, only you have control over it, even developers could not access or restore it, if lost.';
____loclib.aboutYoutubeImgAndText9 = 'NO CENSORSHIP';
____loclib.aboutYoutubeImgAndText10 = 'Bastyon will not censor your videos. Not even admins can block your account and ban you. Your account is YOURS and your subscribers will always be free to follow you.';
____loclib.aboutYoutubeImgAndText11 = 'Bastyon is based on the blockchain: there is no way, at all, to remove accounts and videos';
____loclib.aboutYoutubeImgAndText12 = 'Each video is registered on the blockchain and, for its nature, it cannot be removed. By anyone.';
____loclib.aboutYoutubeImgAndText13 = 'Each video you publish will be there forever. No one, really, can censor them. No one can remove your videos, subscribers and account.';
____loclib.aboutYoutubeImgAndText14 = 'Censorship Resistance ';
____loclib.aboutYoutubeImgAndText15 = "Bastyon runs on a network of nodes on users’ machines. Even if the main website Bastyon.com is blocked, the platform still runs normally through a desktop app. Because there is no corporation, nobody can impose censorship on Bastyon that users do not want.";
____loclib.aboutYoutubeImgAndText16 = 'Bastyon is a Protocol, Not a Company or a Social Network  ';
____loclib.aboutYoutubeImgAndText17 = 'Unlike Facebook and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon';

____loclib.aboutYoutubeSecondBoard1 = 'Bastyon - the best alternative to YouTube';
____loclib.aboutYoutubeSecondBoard2 = 'Your personal data is not sold to external companies';
____loclib.aboutYoutubeSecondBoard3 = 'No one can block your account or remove your videos and subscribers';
____loclib.aboutYoutubeSecondBoard4 = 'No personal info from users';
____loclib.aboutYoutubeSecondBoard5 = 'Access is always possible from any country and region of the world, even if the domain is not accessible.';
____loclib.aboutYoutubeSecondBoard6 = 'Keep your subscribers forever, they are yours';
____loclib.aboutYoutubeSecondBoard7 = 'Bastyon will not remove your subscribers, videos and money!';
____loclib.aboutYoutubeSecondBoard8 = 'You will never get DEMONETIZED and you keep 100% of ad proceeds. Freedom of speech is real.';
____loclib.aboutYoutubeSecondBoard9 = 'You will earn MORE to post your videos!';


____loclib.aboutYoutubeThirdBoard1 = 'Account ownership';
____loclib.aboutYoutubeThirdBoard2 = 'Property of YouTube.';
____loclib.aboutYoutubeThirdBoard3 = 'Your Private Key Belongs to You';
____loclib.aboutYoutubeThirdBoard4 = 'Censorship';
____loclib.aboutYoutubeThirdBoard5 = `Yes, selective and arbitrary censorship`;
____loclib.aboutYoutubeThirdBoard6 = 'Community moderates content with only a few topics such as pornography and illicit content moderated';
____loclib.aboutYoutubeThirdBoard7 = 'Open Sourced Code';
____loclib.aboutYoutubeThirdBoard8 = 'NO.';
____loclib.aboutYoutubeThirdBoard9 = 'Yes, open to everyone';
____loclib.aboutYoutubeThirdBoard10 = 'Same Rules for Everyone';
____loclib.aboutYoutubeThirdBoard11 = 'Yes, based on open source code';
____loclib.aboutYoutubeThirdBoard12 = 'Monetization';
____loclib.aboutYoutubeThirdBoard13 = 'YouTube shares what it wants';
____loclib.aboutYoutubeThirdBoard14 = '100% to blogger';
____loclib.aboutYoutubeThirdBoard15 = 'What if Domain Blocked in Some Country?';
____loclib.aboutYoutubeThirdBoard16 = 'YouTube inaccessible';
____loclib.aboutYoutubeThirdBoard17 = 'Bastyon works directly with nodes';
____loclib.aboutYoutubeThirdBoard18 = 'Internal Cryptocurency for Monetization & Payments';
____loclib.aboutYoutubeThirdBoard19 = 'No';
____loclib.aboutYoutubeThirdBoard20 = 'Yes';
____loclib.aboutYoutubeThirdBoard21 = 'Ability to Send Crypto in Chat Messages';
____loclib.aboutYoutubeThirdBoard22 = 'No';
____loclib.aboutYoutubeThirdBoard23 = 'Yes';
____loclib.aboutYoutubeThirdBoard24 = 'Personal Information';
____loclib.aboutYoutubeThirdBoard25 = 'Name, phone number';
____loclib.aboutYoutubeThirdBoard26 = 'No';






____loclib.aboutYoutubeThirdBoard18 = 'Reporting videos';
____loclib.aboutYoutubeThirdBoard19 = 'YES, YouTube algorithms analyze videos and remove or block them automatically if they believe that they are against the policy. In addition YouTube can remove posts and ban users at its sole discretion.';
____loclib.aboutYoutubeThirdBoard20 = `YES, however only users with a high reputation can report post and a post is made "invisible" on the feed page (but remains available on the user's profile page) only if several tens of high reputation users report it (reports can be made only for racism, hate speech and pornography).`;
____loclib.aboutYoutubeThirdBoard21 = 'Hashtags to classify videos';
____loclib.aboutYoutubeThirdBoard22 = 'Videoa can be shared on multiple platforms';
____loclib.aboutYoutubeThirdBoard23 = 'Dictatorship bans';
____loclib.aboutYoutubeThirdBoard24 = 'Way too many!';
____loclib.aboutYoutubeThirdBoard25 = 'Bastyon pays you way more than YouTube!';
____loclib.aboutYoutubeThirdBoard26 = 'You can earn money with Bastyon.';
____loclib.aboutYoutubeThirdBoard27 = 'Bastyon uses its own Cryptocurrency:';
____loclib.aboutYoutubeThirdBoard28 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
____loclib.aboutYoutubeThirdBoard29 = 'Each time one of your videos gets 15k views, plus 1250 reactions and 1000 referral users, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
____loclib.aboutYoutubeThirdBoard30 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
____loclib.aboutYoutubeThirdBoard31 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';

____loclib.aboutYoutubeOpenBoard1 = 'Discover Bastyon';
____loclib.aboutYoutubeOpenBoard2 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.aboutYoutubeOpenBoard3 = 'Official Website';

____loclib.sourceCode = 'Source Code';

____loclib.aboutYoutubeDiscover1 = 'Join Bastyon Today and Own Your Destiny!';
____loclib.aboutYoutubeDiscover2 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

____loclib.aboutMainBoard = 'Bastyon, The best alternative to Twitter. Leave behind the bans and suspensions.';
____loclib.aboutMainBoard1 = 'Free, private and secure social network';

____loclib.aboutTwitterMainDescriptionText1 = 'Some people ask us:';
____loclib.aboutTwitterMainDescriptionText2 = '"Why should I use Bastyon?"';
____loclib.aboutTwitterMainDescriptionText3 = 'The real question is:';
____loclib.aboutTwitterMainDescriptionText4 = '"Why should you use Twitter?!"';
____loclib.aboutTwitterMainDescriptionText5 = 'TWITTER IS ACTING LIKE A DICTATORSHIP GOVERNMENT';
____loclib.aboutTwitterMainDescriptionText6 = 'Yes, we know that this is a strong statement.';
____loclib.aboutTwitterMainDescriptionText7 = 'But unfortunately, this is what has been happening on Twitter.';

____loclib.aboutTwitterThreeColumn1 = 'Many, way too many accounts have been banned in the past few years. Some of them without any reason.';
____loclib.aboutTwitterThreeColumn2 = 'Others just because they were from a specific political side (conservative)';
____loclib.aboutTwitterThreeColumn3 = 'Here below you can find a short list of accounts that have been banned or suspended by Twitter, along with the reason.';
____loclib.aboutTwitterThreeColumn4 = 'You can make your own considerations: you can easily realize how Twitter has been banning people for several unspecified reasons, for simply saying that the leader of Talibans was pro-sharia, for supporting the "Occupy" movement without breaking any policy.';
____loclib.aboutTwitterThreeColumn5 = 'This is the kind of censorship that we do not want on Bastyon, and that is why the protocol was created in the first place';

____loclib.aboutTitterBannedAcc1 = "Building a community on Twitter is like building a home on a land you don't own.";
____loclib.aboutTitterBannedAcc2 = 'Click here to see the list of the accounts banned by Twitter in 2019';
____loclib.aboutTitterBannedAcc3 = 'Account';
____loclib.aboutTitterBannedAcc4 = 'Wikipedia';
____loclib.aboutTitterBannedAcc5 = 'Individual/account';
____loclib.aboutTitterBannedAcc6 = 'Description';
____loclib.aboutTitterBannedAcc7 = 'Date';
____loclib.aboutTitterBannedAcc8 = 'Duration';
____loclib.aboutTitterBannedAcc9 = 'Reason for suspension';
____loclib.aboutTitterBannedAcc10 = 'Followers at the time of suspension';
____loclib.aboutTitterBannedAcc11 = '“Darren Mills” ';
____loclib.aboutTitterBannedAcc12 = 'Russian-linked account ';
____loclib.aboutTitterBannedAcc13 = '43285';
____loclib.aboutTitterBannedAcc14 = 'Permanent';
____loclib.aboutTitterBannedAcc15 = 'Unmasked as a fictitious person operated by a Russian troll factory.';



____loclib.aboutTitterH3Section1 = 'Why Bastyon?';
____loclib.aboutTitterH3Section2 = 'NO GOVERNMENT CONTROL';
____loclib.aboutTitterH3Section3 = 'Bastyon runs on a network of nodes that no government can block or limit. Even if the main website Bastyon.com is made unaccessible or compromised, the platform still runs normally. A government cannot impose its censorship or limitations on Bastyon.';
____loclib.aboutTitterH3Section4 = 'PRIVATE AND SECURE';
____loclib.aboutTitterH3Section5 = 'Bastyon does not collect any personal information. No IP Address, no email, no phone number. We believe in real privacy protection and data security.';



____loclib.aboutTitterImgAndText1 = 'NO CENSORSHIP';
____loclib.aboutTitterImgAndText2 = 'Bastyon will not censor your posts and videos. Not even admins can block your account and ban you.';
____loclib.aboutTitterImgAndText3 = 'Unlike Twitter, Bastyon does not apply a dictatorship-like method to remove content and users. There is a loooong list of people that have been banned, temporarily or permanently, by Twitter for shallow reasons or for no apparent reason at all.';
____loclib.aboutTitterImgAndText4 = 'On Bastyon bans are simply impossible: it is based on the blockchain and no one has the power to cancel a block from it. Every post will always remain there. Even if an admin or a user wants to ban your posts, he will never be able to do so.';
____loclib.aboutTitterImgAndText5 = 'Censorship is banned by the technology itself. Even if one day Bastyon`s creators want to shut down the platform, the posts will always be there and the social network can be re-created again from the same point it was left.';
____loclib.aboutTitterImgAndText6 = 'NO COMPANY BEHIND BASTYON';
____loclib.aboutTitterImgAndText7 = 'Unlike Twitter and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon. No bans, no censorship.';
____loclib.aboutTitterImgAndText8 = 'Unlike Twitter...';
____loclib.aboutTitterImgAndText9 = 'You will never be blocked or banned for simply supporting your ideas, religions, movements without hurting other people.';
____loclib.aboutTitterImgAndText10 = 'No one can block your account or remove your posts';
____loclib.aboutTitterImgAndText11 = 'Privacy is complete and guaranteed';
____loclib.aboutTitterImgAndText12 = 'Access is always possible from any country and region of the world';
____loclib.aboutTitterImgAndText13 = 'Chat sessions are entirely private and encrypted and not even Bastyon can access them. Not even with a court warrant.';
____loclib.aboutTitterImgAndText14 = 'Your posts can be longer';



____loclib.aboutTitterTable1 = 'TWITTER';
____loclib.aboutTitterTable2 = 'BASTYON';
____loclib.aboutTitterTable3 = 'Account ownership';
____loclib.aboutTitterTable4 = 'Property of Twitter';
____loclib.aboutTitterTable5 = 'Your Private Key Belongs to You';
____loclib.aboutTitterTable6 = 'Your access to your audience';
____loclib.aboutTitterTable7 = 'Not all of your followers see your post, Facebook controls the proportion of the audience that sees it';
____loclib.aboutTitterTable8 = 'Every follower sees your post';
____loclib.aboutTitterTable9 = 'Censorship';
____loclib.aboutTitterTable10 = 'Yes, selective and arbitrary censorship, lots of shadowbanning';
____loclib.aboutTitterTable11 = 'Community moderates content with only a few topics such as pornography and illicit content moderated';
____loclib.aboutTitterTable12 = 'Open Sourced Code ';
____loclib.aboutTitterTable13 = 'No';
____loclib.aboutTitterTable14 = 'Yes, open to everyone';
____loclib.aboutTitterTable15 = 'Same Rules for Everyone';
____loclib.aboutTitterTable16 = 'No';
____loclib.aboutTitterTable17 = 'Yes, based on open source code';
____loclib.aboutTitterTable18 = 'Monetization';
____loclib.aboutTitterTable19 = 'Twitter shares what it wants';
____loclib.aboutTitterTable20 = '100% to blogger through PKOIN';
____loclib.aboutTitterTable21 = 'What if Domain Blocked in Some Country?';
____loclib.aboutTitterTable22 = 'Twiter inaccessible';
____loclib.aboutTitterTable23 = 'Bastyon works directly with nodes';
____loclib.aboutTitterTable24 = 'Personal Messages';
____loclib.aboutTitterTable25 = 'Twitter can read every message';
____loclib.aboutTitterTable26 = 'Bastyon uses peer-to-peer encryption for 1-on-1 chats, nobody can read them';
____loclib.aboutTitterTable27 = 'Internal Cryptocurency for Monetization & Payments';
____loclib.aboutTitterTable28 = 'No';
____loclib.aboutTitterTable29 = 'Yes';
____loclib.aboutTitterTable30 = 'Ability to Send Crypto in Chat Messages';
____loclib.aboutTitterTable31 = 'No';
____loclib.aboutTitterTable32 = 'Yes';
____loclib.aboutTitterTable33 = 'Personal Information';
____loclib.aboutTitterTable34 = 'Name, phone number';
____loclib.aboutTitterTable35 = 'No';



____loclib.aboutTitterMainBoard31 = 'And there`s more! Bastyon pays you.';
____loclib.aboutTitterMainBoard32 = 'You can earn money with Bastyon.';
____loclib.aboutTitterMainBoard33 = 'Bastyon uses its own Cryptocurrency:';
____loclib.aboutTitterMainBoard34 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
____loclib.aboutTitterMainBoard35 = 'Each time one of your videos gets 15,000 views + 1,250 reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
____loclib.aboutTitterMainBoard36 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
____loclib.aboutTitterMainBoard37 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';


____loclib.aboutTitterOpen1 = 'Discover Bastyon';
____loclib.aboutTitterOpen2 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.aboutTitterOpen3 = 'Official Website';
____loclib.aboutTitterOpen4 = 'Source Code';
____loclib.aboutTitterOpen5 = 'Contact us';
____loclib.aboutTitterOpen6 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';


/////////////aboutFacebook
____loclib.aboutFbMainBoard = 'Bastyon - the best alternative to Facebook';
____loclib.aboutFbMainBoard1 = 'Social and financial protocol';

____loclib.aboutFbMainDesc = '"Bastyon is not an alternative to Facebook.';
____loclib.aboutFbMainDesc1 = 'Bastyon is the Anti-Facebook.';
____loclib.aboutFbMainDesc2 = '-- John Milton';


____loclib.aboutFbH3Section = 'Why Bastyon?';
____loclib.aboutFbH3Section1 = 'NO GOVERNMENT CONTROL';
____loclib.aboutFbH3Section2 = 'Bastyon runs on a network of nodes that no government can block or limit. Even if the main website Bastyon.com is made unaccessible or compromised, the platform still runs normally. A government cannot impose its censorship or limitations on Bastyon.';
____loclib.aboutFbH3Section3 = 'PRIVATE AND SECURE';
____loclib.aboutFbH3Section4 = 'Bastyon does not collect any personal information. No IP Address, no email, no phone number. We believe in real privacy protection and data security.';



____loclib.aboutFbImgAndText = 'NO CENSORSHIP';
____loclib.aboutFbImgAndText2 = 'Bastyon will not censor your posts and videos. Not even admins can block your account and ban you.';
____loclib.aboutFbImgAndText3 = 'Bastyon is based on the blockchain: there is no way, at all, to remove posts. Each post is registered on the blockchain and, for its nature, it cannot be removed. By anyone.';
____loclib.aboutFbImgAndText4 = 'NO COMPANY BEHIND BASTYON';
____loclib.aboutFbImgAndText5 = 'Unlike Facebook and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon. No bans, no censorship.';
____loclib.aboutFbImgAndText6 = 'Unlike Facebook...';
____loclib.aboutFbImgAndText7 = 'Your personal data is not sold to external companies';
____loclib.aboutFbImgAndText8 = 'No arbitrary censorship';
____loclib.aboutFbImgAndText9 = 'Does not take personal information';
____loclib.aboutFbImgAndText10 = 'No corporation behind it';
____loclib.aboutFbImgAndText11 = 'Chat sessions are entirely private and encrypted and not even Bastyon can access them.';
____loclib.aboutFbImgAndText12 = 'Mark Zuckerberg won’t bother you!';



____loclib.aboutFbTable = 'FACEBOOK';
____loclib.aboutFbTable1 = 'BASTYON';
____loclib.aboutFbTable2 = 'Account ownership';
____loclib.aboutFbTable3 = 'Property of Facebook ';
____loclib.aboutFbTable4 = 'Your Private Key Belongs to You';
____loclib.aboutFbTable5 = 'Your access to your audience';
____loclib.aboutFbTable6 = 'Not all of your followers see your post, Facebook controls the proportion of the audience that sees it';
____loclib.aboutFbTable7 = 'Every follower sees your post';
____loclib.aboutFbTable8 = 'Censorship';
____loclib.aboutFbTable9 = 'Yes, selective and arbitrary censorship';
____loclib.aboutFbTable10 = 'Community moderates content with only a few topics such as pornography and illicit content moderated';
____loclib.aboutFbTable11 = 'Open Sourced Code ';
____loclib.aboutFbTable12 = 'No';
____loclib.aboutFbTable13 = 'Yes, open to everyone';
____loclib.aboutFbTable14 = 'Same Rules for Everyone';
____loclib.aboutFbTable15 = 'No';
____loclib.aboutFbTable16 = 'Yes, based on open source code';
____loclib.aboutFbTable17 = 'Monetization';
____loclib.aboutFbTable18 = 'Facebook shares what it wants';
____loclib.aboutFbTable19 = '100% to blogger through PKOIN';
____loclib.aboutFbTable20 = 'What if Domain Blocked in Some Country?';
____loclib.aboutFbTable21 = 'Facebook inaccessible';
____loclib.aboutFbTable22 = 'Bastyon works directly with nodes';
____loclib.aboutFbTable23 = 'Personal Messages';
____loclib.aboutFbTable24 = 'Facebook can read every message';
____loclib.aboutFbTable25 = 'Bastyon uses peer-to-peer encryption for 1-on-1 chats, nobody can read them';
____loclib.aboutFbTable26 = 'Mark Zuckerberg';
____loclib.aboutFbTable27 = 'Always besides you';
____loclib.aboutFbTable28 = 'NO!';
____loclib.aboutFbTable29 = 'Internal Cryptocurency for Monetization & Payments';
____loclib.aboutFbTable30 = 'No';
____loclib.aboutFbTable31 = 'Yes';
____loclib.aboutFbTable32 = 'Ability to Send Crypto in Chat Messages';
____loclib.aboutFbTable33 = 'No';
____loclib.aboutFbTable34 = 'Yes';
____loclib.aboutFbTable35 = 'Personal Information';
____loclib.aboutFbTable36 = 'Name, phone number';
____loclib.aboutFbTable37 = 'No';



____loclib.aboutFbMainBoard3 = 'And there`s more! Bastyon pays you.';
____loclib.aboutFbMainBoard31 = 'You can earn money with Bastyon.';
____loclib.aboutFbMainBoard32 = 'Bastyon uses its own Cryptocurrency: ';
____loclib.aboutFbMainBoard33 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
____loclib.aboutFbMainBoard34 = 'Each time one of your videos gets 15,000 views + 1,250 reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
____loclib.aboutFbMainBoard34 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
____loclib.aboutFbMainBoard35 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';


____loclib.aboutFbOpen = 'Discover Bastyon';
____loclib.aboutFbOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.aboutFbOpen2 = 'Official Website';
____loclib.aboutFbOpen3 = 'Source Code';
____loclib.aboutFbOpen4 = 'Contact us';
____loclib.aboutFbOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';


/////aboutHIW

____loclib.aboutHowItWMainBoard = 'HOW DOES BASTYON RESIST CENSORSHIP?';
____loclib.aboutHowItWMainBoard1 = 'FREE, PRIVATE, SECURE AND WITHOUT CORPORATE CONTROL.';
____loclib.aboutHowItWMainBoard2 = 'ENJOY THE FRESH AIR OF BASTYON.';



____loclib.aboutHowItWMD = '"Bastyon is the Bitcoin of social networks."';



____loclib.aboutHowItWImgAndText = 'Blockchain based';
____loclib.aboutHowItWImgAndText1 = 'What is the blockchain?';
____loclib.aboutHowItWImgAndText2 = 'As Wikipedia mentions, “A blockchain is a growing list of records, called blocks, that are linked together using cryptography.';
____loclib.aboutHowItWImgAndText3 = 'It’s also described as a “trustless and fully decentralized peer-to-peer immutable data storage” that is spread over a network of participants often referred to as nodes. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.';
____loclib.aboutHowItWImgAndText4 = 'The timestamp proves that the transaction data existed when the block was published in order to get into its hash.';
____loclib.aboutHowItWImgAndText5 = 'As blocks each contain information about the block previous to it, they form a chain, with each additional block reinforcing the ones before it.';
____loclib.aboutHowItWImgAndText6 = 'Therefore, blockchains are resistant to modification of their data because once recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.”';
____loclib.aboutHowItWImgAndText7 = 'So, how does the blockchain  protects from censorship?';
____loclib.aboutHowItWImgAndText8 = 'From Bitcoins to Bastyon.';
____loclib.aboutHowItWImgAndText9 = 'The blockchain is the technology behind all the cryptocurrencies. Bitcoins, Ethereum, Dogecoins and so on are all powered by the Blockchain.';
____loclib.aboutHowItWImgAndText10 = 'The principle is simple: what happens on the blockchain, stays on the blockchain. Forever.';
____loclib.aboutHowItWImgAndText11 = 'All the existing blocks of the blockchain are immutable and permanent. ';
____loclib.aboutHowItWImgAndText12 = 'Think about cryptocurrency: when you send some Bitcoins (or parts of it) to someone, the transaction is registered on the blockchain.';
____loclib.aboutHowItWImgAndText13 = 'From that moment the transaction cannot be reverted, modified, changed, removed, suspended, edited in any of its parts. It is there and stays there forever. And you can explore the blocks on the blockchain to see all the transactions.';
____loclib.aboutHowItWImgAndText14 = 'Bastyon works EXACTLY the same way. Each post, each account, each video is recorded on the blockchain. And once there, it cannot be removed.';
____loclib.aboutHowItWImgAndText15 = 'Indeed, Bastyon works on a fork of the original Bitcoin blockchain.';
____loclib.aboutHowItWImgAndText16 = 'Censorship-resistant';
____loclib.aboutHowItWImgAndText17 = 'Not only the Blockchain.';
____loclib.aboutHowItWImgAndText18 = 'Bastyon is not owned by a corporation';
____loclib.aboutHowItWImgAndText19 = 'Bastyon is an open-source project';
____loclib.aboutHowItWImgAndText20 = 'Bastyon runs on a network of decentralized nodes, if you are using the Bastyon desktop app, it speaks directly to the nodes around the world';
____loclib.aboutHowItWImgAndText21 = 'In addition, even if a government wants to remove a post, it is technically impossible.';
____loclib.aboutHowItWImgAndText22 = 'Likewise, since it runs on a network of nodes, there is no way to limit the access to Bastyon. Even in the event of a government blocking access to https://bastyon.com, you will always be able to access it using the mobile or desktop app, which connects directly to the nodes.';
____loclib.aboutHowItWImgAndText23 = 'Privacy protection,';
____loclib.aboutHowItWImgAndText24 = 'for your security';
____loclib.aboutHowItWImgAndText25 = 'Bastyon does not know who you are.';
____loclib.aboutHowItWImgAndText26 = 'Bastyon DOES NOT collect any personal information.';
____loclib.aboutHowItWImgAndText27 = ' You can register without revealing your phone number (only email is required)';
____loclib.aboutHowItWImgAndText28 = 'Bastyon does not ask for your real name to protect dissent';
____loclib.aboutHowItWImgAndText29 = 'Bastyon does not collect IP addresses and does not track you';
____loclib.aboutHowItWImgAndText291 = 'Bastyon allows multiple accounts for different purposes';
____loclib.aboutHowItWImgAndText30 = 'Bastyon will never know who you are, unless you explicitly share your personal data.';
____loclib.aboutHowItWImgAndText31 = 'If you don’t share your data, no one, no company, no government, can know who you are.';


____loclib.aboutHowItWImgAndText51 = 'Why is Cryptocurrency Good for Freedom?';
____loclib.aboutHowItWImgAndText52 = 'Some people think that digital currency is a tool for enslavement. Ironically, many of those people are carrying bank cards with a microship in their pockets. Bank cards that track every purchase and tie directly to your identity. The reason cryptocurrency is good for freedom is that it is not tied to your identity. Both in Bitcoin and Pocketcoin, each user can create millions of addresses and change them as much as necessary.';



____loclib.HIVTable1 = 'Credit Cards';
____loclib.HIVTable2 = 'Cash';
____loclib.HIVTable3 = 'Cryptocurrency';
____loclib.HIVTable4 = 'Tied to your identity';
____loclib.HIVTable5 = 'Yes';
____loclib.HIVTable6 = 'No';
____loclib.HIVTable7 = 'No';
____loclib.HIVTable8 = 'Government controls money supply';
____loclib.HIVTable9 = 'Yes';
____loclib.HIVTable10 = 'Yes';
____loclib.HIVTable11 = 'No';
____loclib.HIVTable12 = 'Anonimity';
____loclib.HIVTable13 = 'Non-Anonymous';
____loclib.HIVTable14 = 'Anonymous';
____loclib.HIVTable15 = 'Pseudonymous';
____loclib.HIVTable16 = 'Easy to pay over large distances';
____loclib.HIVTable17 = 'Yes';
____loclib.HIVTable18 = 'No';
____loclib.HIVTable19 = 'Yes';
____loclib.HIVTable20 = 'Transparent, open to public';
____loclib.HIVTable21 = 'No';
____loclib.HIVTable22 = 'No';
____loclib.HIVTable23 = 'Yes';




____loclib.aboutHowItWImgAndText32 = 'And there`s more!';
____loclib.aboutHowItWImgAndText33 = 'Bastyon pays you';
____loclib.aboutHowItWImgAndText34 = 'You can earn money with Bastyon.';
____loclib.aboutHowItWImgAndText35 = 'Bastyon uses its own Cryptocurrency:';
____loclib.aboutHowItWImgAndText36 = 'Each time your posts receive comments and likes, you get PKOIN.';
____loclib.aboutHowItWImgAndText37 = 'Each time your video gets 15,000 views + 750 “5 stars” reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!! ';
____loclib.aboutHowItWImgAndText38 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
____loclib.aboutHowItWImgAndText39 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';
____loclib.aboutHowItWImgAndText40 = 'Next step: contact us to get your Bastyon account verified and to access the bonus program.';
____loclib.aboutHowItWImgAndText41 = 'Contact Us Now';


____loclib.aboutHowItWOpen = 'Discover Bastyon';
____loclib.aboutHowItWOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.aboutHowItWOpen2 = 'Official Website';
____loclib.aboutHowItWOpen3 = 'Source Code';
____loclib.aboutHowItWOpen4 = 'Contact us';
____loclib.aboutHowItWOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

//aboutContentCreator

____loclib.ContentCreatorsMainBoard = 'Great Bonus Program for Content Creators';
____loclib.ContentCreatorsMainBoard1 = '"There are many ways to earn money with Bastyon..."';


____loclib.ContentCreatorsImgAndText = 'Post your videos';
____loclib.ContentCreatorsImgAndText1 = 'Post your videos on Bastyon';
____loclib.ContentCreatorsImgAndText2 = '15,000 vides, 1250 reactions from different users and 1000 invited users to your channel';
____loclib.ContentCreatorsImgAndText3 = 'Earns you $1,000 paid in Bitcoin or PKOIN';
____loclib.ContentCreatorsImgAndText4 = 'Next step: contact us to get your Bastyon account verified and to access the bonus program.';
____loclib.ContentCreatorsImgAndText5 = 'Contact Us Now ';
____loclib.ContentCreatorsImgAndText6 = 'Invite your followers';
____loclib.ContentCreatorsImgAndText7 = 'Share your personal referral link';
____loclib.ContentCreatorsImgAndText8 = 'Invite your followers from other platforms (Youtube, Instagram, Facebook, Twitter...)';
____loclib.ContentCreatorsImgAndText9 = 'Earn from the posts of your followers!';
____loclib.ContentCreatorsImgAndText10 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
____loclib.ContentCreatorsImgAndText11 = 'Contact Us Now ';
____loclib.ContentCreatorsImgAndText12 = 'Earn from every post';
____loclib.ContentCreatorsImgAndText13 = 'Each time your post gets a like or a comment, you receive a small reward';
____loclib.ContentCreatorsImgAndText14 = 'The more you post, the more your earn';
____loclib.ContentCreatorsImgAndText15 = 'The more followers you have, the more your earn';
____loclib.ContentCreatorsImgAndText16 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
____loclib.ContentCreatorsImgAndText17 = 'Contact Us Now';
____loclib.ContentCreatorsImgAndText18 = 'Earn with Decentralized Ads';
____loclib.ContentCreatorsImgAndText19 = 'Ads comes to you through Bastyon Ad Marketplace';
____loclib.ContentCreatorsImgAndText20 = 'You can choose which ads to repost to your channel';
____loclib.ContentCreatorsImgAndText21 = '100% of ad proceeds from interactions to go your wallet';
____loclib.ContentCreatorsImgAndText22 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
____loclib.ContentCreatorsImgAndText23 = 'Contact Us Now';
____loclib.ContentCreatorsImgAndText24 = 'Earn with Featured Comments';
____loclib.ContentCreatorsImgAndText25 = 'Your followers can attach PKOIN to comments';
____loclib.ContentCreatorsImgAndText26 = 'Comments with PKOIN are featured under your post';
____loclib.ContentCreatorsImgAndText27 = 'You can mention comments on air encouraging users to add PKOIN';
____loclib.ContentCreatorsImgAndText28 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
____loclib.ContentCreatorsImgAndText29 = 'Contact Us Now';



____loclib.ContentCreatorsOpen = 'Discover Bastyon';
____loclib.ContentCreatorsOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
____loclib.ContentCreatorsOpen2 = 'Official Website';
____loclib.ContentCreatorsOpen3 = 'Source Code';
____loclib.ContentCreatorsOpen4 = 'Contact us';
____loclib.ContentCreatorsOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

///about menu
____loclib.contentCreators = 'For content creators';
____loclib.howItWorks = 'How it works';
____loclib.insteadOf = 'Instead of';
____loclib.alternativeTo = 'Alternative to...';


____loclib.pkoin_commerce_tag_share_error = 'The "pkoin_commerce" tag can only be used as a separate tag. A post with this tag cannot contain videos or images'

____loclib.pkoin_commerce_info = 'Any peer-to-peer PKOIN transactions are not moderatred and at your own risk.'


____loclib.buyforcrypto = 'Buy for crypto'
____loclib.buywithcreditcard = 'Buy with credit card'
____loclib.buylogo = 'Buy Pocketcoin (PKOIN)'

____loclib.comment = 'Comment';
____loclib.sendToAuthor = 'Send to author';
____loclib.pkoinComment = 'PKOIN comment';
____loclib.liftUpThePost = 'Lift up the post';

____loclib.buypeertopeer = 'Buy Peer-to-Peer'


____loclib.comments_interesting = 'Interesting at first'
____loclib.comments_timeup = 'New first'
____loclib.comments_time = 'Old first'
____loclib.comments_next = 'Show next'

____loclib.create = 'Create'
____loclib.drafts = 'Drafts'

____loclib.repostyourown = 'You cannot repost your own post'


____loclib.reachedlimits = 'You reached your daily limit of actions. To increase your limit you need to have at least 50 PKOIN in your account or have a valid reputation.'

____loclib.closestreachedlimits = 'You are close to hitting your daily action limit. To increase your limit you need to have at least 50 PKOIN in your account or have a valid reputation.'


____loclib.sendUserStatistics = 'Send anonimous report of errors to Bastyon Team'
____loclib.captionUserStats = 'Statistics'

____loclib.editarticledraft = 'Edit article Draft'
____loclib.deletearticledraft = 'Delete article Draft'
____loclib.previewarticledraft = 'View article Draft'
____loclib.deletedraftquestion = 'Are you sure you want to delete the draft article? Recovery is impossible'
____loclib.publishquestion = 'Are you sure you want to public this article?'

____loclib.etc = 'And so on...'
____loclib.openlinkssettings = 'Do not open links in the desktop application'
____loclib.nametaken = 'This username is taken in Bastyon'

____loclib.accountnotfound = 'We could not find your account on the blockchain. Perhaps the registration process was not completed, or there is no Internet connection'


____loclib.name20symbols = "The name length can't be more than 20 symbols"
____loclib.namereservedpn = 'To avoid user confusion using Pocketnet in name is reserved'
____loclib.namereservedbn = 'To avoid user confusion using Bastyon in name is reserved'

____loclib.photohassizegreater = function(v){
    return "Your photo has size greater than "+v+"MB. Please upload a photo under "+v+"MB in size."
}
____loclib.invalidformat = "Invalid format of picture. Only png and jpeg are allowed"
____loclib.downloadDesctApp = "Download Bastyon for desktop"
____loclib.downloadMobileApp = "Install Mobile Application"


____loclib.easyNode_e10000 = "Node"
____loclib.easyNode_e10001 = "Download and install node"
____loclib.easyNode_e10002 = "Bastyon Node"
____loclib.easyNode_e10003 = "Loading"
____loclib.easyNode_e10004 = "Node Installing"
____loclib.easyNode_e10005 = "Node Removing"
____loclib.easyNode_e10006 = "System Requirements"
____loclib.easyNode_e10007 = "Node control is not yet available for your operating system"
____loclib.easyNode_e10008 = "Synchronization"
____loclib.easyNode_e10009 = "Configuration"
____loclib.easyNode_e10010 = "Enabled"
____loclib.easyNode_e10011 = "Daemon Path"
____loclib.easyNode_e10012 = "Data Path"
____loclib.easyNode_e10013 = "Set Paths to Default"
____loclib.easyNode_e10014 = "To Default"
____loclib.easyNode_e10015 = "Update Node"
____loclib.easyNode_e10016 = "No Updates Available"
____loclib.easyNode_e10017 = "Delete"
____loclib.easyNode_e10018 = "Delete Daemon"
____loclib.easyNode_e10019 = "Delete Daemon and Data"
____loclib.easyNode_e10020 = "Wallet"
____loclib.easyNode_e10021 = "Status"
____loclib.easyNode_e10022 = "Requesting..."
____loclib.easyNode_e10023 = "Staking"
____loclib.easyNode_e10024 = "Node can't stake now. Add at least 50 PKOIN or wait for 60 minutes to activate coins"
____loclib.easyNode_e10025 = "Balance"
____loclib.easyNode_e10026 = "Control"
____loclib.easyNode_e10027 = "Deposit"
____loclib.easyNode_e10028 = "Withdraw"
____loclib.easyNode_e10029 = "Export Wallet"
____loclib.easyNode_e10030 = "Import Wallet"
____loclib.easyNode_e10031 = "Active"
____loclib.easyNode_e10032 = "Version"
____loclib.easyNode_e10033 = "Chain"
____loclib.easyNode_e10034 = "Description"
____loclib.easyNode_e10035 = "Height"
____loclib.easyNode_e10036 = "Less than an hour left"
____loclib.easyNode_e10037 = function(v) { return `${v} hour(s) remaining` }
____loclib.easyNode_e10038 = "Block Hash"
____loclib.easyNode_e10039 = "Disable Node"
____loclib.easyNode_e10040 = "Enable Node"
____loclib.easyNode_e10041 = "Your wallet saved to"
____loclib.easyNode_e10042 = "Your wallet imported"
____loclib.easyNode_e10043 = "Your new node address"
____loclib.easyNode_e10044 = "Input Address and Amount for transfer PKOIN"
____loclib.easyNode_e10045 = "Destination Address"
____loclib.easyNode_e10046 = "Amount"
____loclib.easyNode_e10047 = "Invalid arguments"
____loclib.easyNode_e10048 = 'Invalid destination address'
____loclib.easyNode_e10049 = "Invalid amount"
____loclib.easyNode_e10050 = "Created transaction"
____loclib.easyNode_e10051 = "Do you really want to Stop Node and Update It?"
____loclib.easyNode_e10052 = "Make sure that you have made a backup of the wallet. Do you really want to delete the node and data directory?"
____loclib.easyNode_e10053 = "Do you really want to remove Node Daemon?"
____loclib.easyNode_e10054 = "Do you really want to install the node?"
____loclib.easyNode_e10055 = "Do you really want to set Data Path to Default?"
____loclib.easyNode_e10056 = "Gb free RAM"
____loclib.easyNode_e10058 = "Gb free disk space"
____loclib.easyNode_e10059 = "Mb/s internet speed"
____loclib.easyNode_e10060 = "SSD drive"
____loclib.easyNode_e10061 = "Your node is running. Close the app anyway?"
____loclib.easyNode_e10062 = "Node update is available. Download a new version?"
____loclib.easyNode_e10063 = "Node has been successfully updated"

____loclib.IHave = "I have";
____loclib.downloadNode = "Download Windows Desktop Node";
____loclib.months = "Months";
____loclib.year = "Year";
____loclib.stakingCalculator = "Staking Calculator - calculate how much you earn by putting Pocketcoin (PKOIN) into a node."
____loclib.easyNode_e2000 = "Defend Freedom of Speech & "
____loclib.easyNode_e2000_1 = "Earn"
____loclib.easyNode_e2000_2 = " Cryptocurrency"
____loclib.easyNode_e2001 = "What is Pocketcoin? Pocketcoin is a cryptocurrency that powers the decentralized social platform Bastyon. It is used to reward content creators, to boost posts and comments, to pay for ads and to unlock special features on Bastyon."
____loclib.easyNode_e2002 = "What is a  node?  A node is a computer owned by any user of Bastyon that supports the network and"
____loclib.easyNode_e2002_1 = " earns "
____loclib.easyNode_e2002_2 = "Pocketcoin. Your computer can be one of those nodes, assuming you have at least 50 GB of free SSD space and a decent internet connection.  Node has to lock some Pocketcoin in it to"
____loclib.easyNode_e2002_2_1 = " earn "
____loclib.easyNode_e2002_2_2 = "more Pocketcoin. That is called staking in cryptocurency."
____loclib.minPkoin = function (p){
	return  String(p) + " PKOIN Minimum"
}
____loclib.maxPkoin = function (p){
	return  String(p) + " PKOIN Maximum"
}

____loclib.topPosts = "Top posts";
____loclib.videop2psettings = "Use p2p when watching videos"

____loclib.art_validatetags = "Please add Tags For Your Longread"
____loclib.art_validatecover = "Please add Cover For Your Longread"
____loclib.art_validatecaption = "Please add Caption For Your Longread"
____loclib.art_validatecontent = "Please add Content of Your Longread"
____loclib.art_nothingchange = "No changes"
____loclib.art_newarticle = "New Longread"
____loclib.art_myarticles = "My Longreads"
____loclib.art_changecover = "Upload Cover"
____loclib.art_removecover = "Remove Cover"
____loclib.art_publish = "Publish"
____loclib.art_editing = "Editing"
____loclib.art_draftsaved = "Draft saved"
____loclib.art_gotolastdraft = "go to last draft"
____loclib.art_categoriestags = "Categories and tags"
____loclib.art_preview = "Preview"
____loclib.art_caption = "Caption of new Longread"
____loclib.art_placeholder = "Let`s write an awesome story!"

____loclib.art_newarticlecreation = "Create a new Longread"
____loclib.art_editingsh = "Editing a published Longread"
____loclib.art_saveedited = "Save"

____loclib.art_wordscount = "Number of words"
____loclib.art_volumepercent = "Article size limit"
____loclib.art_goback = "Come back"

____loclib.downloadingUpdate = "Downloading the update"
____loclib.hasnotupdates = "No updates available"
____loclib.cantmanageupdate = "Unable to manage update"

____loclib.updateapplication = "Update Application"
____loclib.applicationversion = "Application version"
____loclib.installedusinggps = "The application was not installed using Google Play."

____loclib.downloadplaystore = "Google Play Download"
____loclib.downloadgithub = "Download APK"

____loclib.empty = "Empty"

____loclib.reputation = "Reputation";
____loclib.subscriptions = "Subscriptions";
____loclib.tothetop = "To the top"
____loclib.menu = "Menu"

____loclib.donotshowagain = "Do not show again"


____loclib.postby = "Post by"
____loclib.continueon = "Сontinue on"
____loclib.bestwishes = "Best,"

____loclib.ratings123 = "Only users with high reputation at least 10 publications in the feed can give 1, 2, 3 star ratings, make comments, give negative ratings on comments. This is done to protect authors, because Bastyon does NOT require any personal information for registration."

____loclib.ratingss3 = "Only users with high reputation can give 1, 2, 3 star ratings. This is done to protect authors, because Bastyon does NOT require any personal information for registration."

____loclib.clearcategories = "Do you really want to clear category filters?"
____loclib.cleartags = "Do you really want to clear tags filters?"
____loclib.fromsh = "From"

____loclib.hodoiearnmore = "How do I earn more Pocketcoin?"


____loclib.removeaddress = "Do you really want to remove this address from this device?"
____loclib.wanttoseekey = "Do you really want to see your private key?"
____loclib.seeprivatekey = "See Private Key"
____loclib.max5acc = "You have reached a maximum of 5 accounts. No more can be added"


____loclib.longreads = "Long Reads"
____loclib.readarticle = "Read"

____loclib.filters = "Filters"
____loclib.dataenteredincorrectly = "Data entered incorrectly"

____loclib.lloadprevwithtags = "Refresh Feed"

____loclib.newRepost = "Make repost"
____loclib.whatsnewrepost = "Your commentary"

____loclib.art_goback = "Come back"

____loclib.writesupport = "Write to support"
____loclib.submitapplication = "Submit your application"

____loclib.submitapplicationVideo = "Request PKOIN for video"
____loclib.submitapplicationVideoSmall = "Send & request PKOIN"

____loclib.videobloggerRequest = "If you are a blogger with an established audience, you can get a gift of PKOIN to load video. Click the button below if you are a blogger:"


____loclib.videobloggerRequest_pl1 = "Link to existing channel 1"
____loclib.videobloggerRequest_pl2 = "Link to existing channel 2"
____loclib.videobloggerRequest_pl3 = "Link to existing channel 3"

____loclib.videobloggerRequest_pl_notes = "Notes: any additional information"
____loclib.videobloggerRequest_pl_email = "Contact email"

____loclib.videobloggerRequest_caption = "Fill out this form to receive PKOIN"

____loclib.videobloggerRequest_er_link = "Provide at least one link to an existing channel"
____loclib.videobloggerRequest_er_info = "Additional information required"
____loclib.videobloggerRequest_er_email = "Leave an email for feedback"

____loclib.videobloggerRequest_submitted = "Thank you for contacting us, we will review your application"

____loclib.canuseipsetting = "Allow connection via ip over http directly. Not safe"

____loclib.optimizationtip = function(v){
    return v + ' hidden viewed posts'
}

____loclib.optimizationtip_show = "Show"
