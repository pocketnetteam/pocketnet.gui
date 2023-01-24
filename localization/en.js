var appname = ((window.projects_meta || {})[window.pocketnetproject || "Bastyon"] || {}).fullname || 'Bastyon'


console.log('window.projects_meta', window.projects_meta)

if(typeof loclib == "undefined" || !loclib)
loclib = {};

loclib.en = {};

var _l = loclib.en;

//time

_l.fewseconds = "Few seconds ago";
_l.oneminute = "One minute ago";

_l.minutes = function(v){
return v + " minutes ago"
}

_l.tenminutes = "Ten minutes ago";
_l.halfanhour = "An hour ago";
_l.anhour = "An hour ago";
_l.today = "Today at";

//authorization

_l.id0 = "Login to an existing account";
_l.id1 = "If you are already registered, please sign in";
_l.loadqrcode = "Upload QR Code";
_l.stay = "Stay Signed In";
_l.signin = "Sign In";
_l.orcreate = "Or create a new account";
_l.createnew = "Create a new account";
_l.staysafe = "It is not safe. Do you want to proceed?";
_l.or = "or";

// Register a New Account
_l.id71 = "Create a New Account";
_l.id72 = "Already a Member? Sign In";

_l.rtip1 = "Take Note of Your Private Login Key!";
_l.rtip2 = function(mobile){
var h = "Below is your Private Key passphrase. Write it down and make sure to save your QR code"

if(mobile){ h += "device" } else { h+="PC" }

h+=" and be sure not to lose it. We do not store your personal data. Private Key cannot be recovered if lost!"

return h
}

_l.generatepkey = "Generate Private Key";
_l.rtip3 = "Write this login key down. We do not store your personal data. It cannot be recovered if lost! ";
_l.saveqrcode = "Save Qr Code"
_l.copyprivkey = "Copy Private Key"
_l.rcontinue = "Continue"
_l.idle = "Idle for some time"
_l.congratulations = "Congratulations! You are in <span class='pnlabel'>"+appname+"</span>"
_l.creatingpreloader = "Creating Account"
_l.removepaste = "We removed the paste option for this input."
_l.filedamaged = "File doesn't contain a valid private key"
_l.keysnotmatch = "Private login key does not match"
_l.confirmkey = "Type Your Private Login Key or Upload QR Code From Previous Step"
_l.successfullycopied = "Key was successfully copied"
_l.urlsuccesscopied = "Link was successfully copied"
_l.successcopied = "Text was successfully copied"

_l.confirmkeyLabel = "Please Confirm Your Private Key. Type Key in form or <b>upload QR code</b>"
_l.repeatetocreate = "Repeat to create private key again"
_l.confirmcreate = "Create Account"


//user activation

_l.useractivation = "User activation";
_l.wesentmoney = "We sent you a few coins for registration";
_l.wesentmoneym = "We have already sent you a few coins for registration";


_l.wesentmoneydelay = "The process is taking more time than usual, please wait a little longer";

_l.funetworkproblems = "There are some problems with the connection. Please try later";

_l.pleasewait = "Please Wait";
_l.next = "Next";
_l.welcome = "Welcome";
_l.welcometopocketnet = "Welcome to "+appname+"";
_l.continue = "continue";

_l.chooseThemes = "Choose interesting themes";
_l.bloggers = "Bloggers";
_l.chooseBloggers = "Follow Popular Bloggers";
_l.showmorebloggers = "Show more bloggers";
//user page


_l.rstate = "Reputation";
_l.rprofile = "Profile";
_l.rsettings = "Settings";
_l.rwallet = "Wallet";
_l.rstatistic = "Statistic";
_l.raccounts = "Accounts";
_l.rsystem = "System";
_l.rconnection = "Connection";
_l.pnetAddress = ""+appname+" Address";
_l.profile = "Profile";
_l.signout = "Sign out";

//send

_l.postlabel = "Donation for post";
_l.donationlabel = "Donation";
_l.donationwel = "If you want to thank the author you can use a "+appname+" transaction";
_l.donationwela = ""+appname+" transaction";
_l.donationwelan = "Or you can use another crypto payment system";
_l.successfullycopiedaddress = "Address was successfully copied";

//wallet

_l.wrecieve = "Receive Coins By Sharing Address";
_l.wcopyshare = "Copy & Share Address:";
_l.wqrcode = "Qr code";
_l.wcopeaddress = "Copy Address";
_l.wcreatelink = "Or Create Link For Your Payment";
_l.required = "Required";
_l.wgetlink = "Get Link";
_l.waddresses = "Addresses";
_l.waddress = "Address";
_l.wbalance = "Balance";
_l.wpercente = "Percente";
_l.waddaddress = "Explore a new Wallet address";
_l.wrecieve = "Receive";
_l.wrecieveon = "Receive on";
_l.wcopyshareorcreate = "Copy & Share Address or Create Payment Link";
_l.wdgetlink = "Get Link";
_l.wdqrcode = "Qr code";
_l.wdcopyaddress = "Copy Address";
_l.wdpleasefill = "Please fill in these fields";
_l.wduseqr = "Use this QR code to receive funds";
_l.wdaddress = "Address";
_l.wdamount = "Amount";
_l.wdlabel = "Label";
_l.wdmessage = "Message";
_l.wsend = "Send";
_l.calcfeesandsend = "Calculate Fees And Send";
_l.wstrfees = "Transaction Fees";
_l.wsfees = "Fees";

_l.wssendto = "SEND COINS TO";
_l.wssendb = "SEND";


_l.tacaddress = "Account Address";
_l.twallet = "Wallet";
_l.twalletaddresses = "Wallet addresses";
_l.tTotal = "Total";
_l.totalBalance = "Total balance";
_l.wsselect = "Select Source From Menu";
_l.wsenter = "Enter Address Or Select From Menu";
_l.wsreciever = "Receiver address";
_l.wsamount = "Amount";
_l.wsamountof = "Amount of your transaction";
_l.wsincludefees = "Include Fees in Amount";
_l.wsrecieverpay = "To be paid by Receiver";
_l.wssenderpay = "To be paid by Sender";
_l.wdselectfrom = "Select From menu";

_l.wdenteramount = "Enter Amount";
_l.wdmessageplaceholder = "What is this transaction for?";
_l.wrenteraddress = "Enter Address";
_l.wrenteraddressselect = "Enter Address Or Select From menu";
_l.wreturntoeallet = "RETURN TO WALLET";
_l.linkCreated = "LINK CREATED";
_l.waddresswascop = "Address was successfully copied";
_l.wqrcodecreated = "QR CODE CREATED";
_l.wlinkcreating = "LINK CREATING";
_l.wqrcodecreating = "QR CODE CREATING";
_l.wdoptions = "OPTIONS";
_l.wssuccessfully = "Transaction sent successfully";
_l.wscalculatefees = "CALCULATE FEES";
_l.wsaddressnotv = "Address is not valid";

//user profile
_l.uaddaddressdona = "Add address For Donations";
_l.uaddaddressdonaplace = "Enter Address";
_l.uchangeicon = "Upload Profile Image";
_l.utip1 = "You must create name on blockchain before using "+appname+"";
_l.utip2 = "You have only one step left";
_l.upicset = "Set Profile Icon";
_l.upic = "Profile Icon";
_l.uuserinfo = "User Information";
_l.usave = "Save";
_l.ucancel = "Cancel";
_l.uwaitb = "Wait for confirmation to save information ";
_l.uchanges = "There are no changes";
_l.uchangesvalid = "You need to type username";
_l.uname = "Name";
_l.unickname = "Nickname";
_l.ulanguage = "Language";
_l.uabout = "About myself";
_l.uwebsite = "Web Site";
_l.uaddresesd = "Addresses for Donations";
_l.usavechanges = "Do you want to save your changes?";

//statistic

_l.referralsCount = 'Users who have used the referral link.';
_l.commentatorsCount = function(limit){
    return "Users have commented on you more than " + limit + (limit === 1 ? ' time' : ' times')
};
_l.from = 'Period: ';
_l.to = 'to';
_l.empty = 'Information not found';
_l.apply = 'Apply';


_l.sreps = "Reputation and Limitations";
_l.sdisconnected = "Disconnected from node";
_l.suseractivation = "User Activation";
_l.sprofile = "Profile";
_l.spc = "Post count";
_l.spv = "Video Post count";
_l.ssc = "Stars count";
_l.ccc = "Comments count";
_l.crc = "Comment Rate count";
_l.artc = "Articles count";

_l.stp = "Beginner";
_l.stpg = "Top";
_l.stpreal = "Verified";
_l.stpdev = "Bastyon developer";

_l.trialreputationtip = "To become a top user you need to have a valid reputation. It requires at least 100 different people with top reputation to upvote your content (after 3 months this requirement is relaxed to 30). The second requirement is minimum 100 overall reputation.";
_l.trialreputationtipaction = "Learn more about reputation here"


_l.srep = "Reputation";
_l.ccpl = "Complains count";

//accounts
_l.aaddedacc = "Change Account";
_l.acure = "Current";
_l.aaddacc = "Add Account";
_l.ascheduler = "Scheduler";
_l.aused = "This address is already use in another addresses pool";

_l.accfailedkeypair = "Wrong Private Key";
_l.acchasinthispack = "This address is already added";
_l.acchasinanotherpack = "This address is already use in another addresses pool";


//author
_l.sub = "Follow";
_l.subi = "Following";
_l.unsub = "Unfollow";
_l.joined = "Joined";
_l.shares = "SHARES";
_l.uposts = "POSTS";
_l.myuposts = "MY POSTS";
_l.followers = "FOLLOWERS";
_l.followers2 = "Followers";
_l.following = "FOLLOWING";
_l.following2 = "Following";
_l.settings = "MANAGE";
_l.anofollowers = "This user has no followers";
_l.aynofollowers = "You have no followers";
_l.anofollowing = "This user is not following anyone";
_l.aynofollowing = "You are not following anyone";

_l.blockedusers = "Blocked Users";
_l.anoblocked = "This user is not blocked anyone";
_l.aynoblocked = "You are not blocked anyone";

//lenta
_l.lloadmore = "Load More Awesome Posts!";
_l.lloadprev = "Load New Awesome Posts";


_l.lend = "End of Posts";
_l.zerop = "There currently no posts by this author";


_l.zeroy = "You do not have any publications yet, share something!";



_l.llogin = "You must login before you can proceed";
_l.lcomlaindialog = "Are you sure you want to report this post?";
_l.lunsubscribe = "Do you really want to unfollow this account?";
_l.lprivatepublic = "Do you want to make a Private or Public subscription?";
_l.lprivate = "Private";
_l.lpublic = "Public";

//inviteComment
_l.commentBannerTitle = "Comment on this post";
_l.commentBannerDescription = "Commenting unlocks features on Bastyon and helps you find friends 😀";
_l.commentBannerTitle2 = function(v){ return "Follow " + v + " to see more posts for them"};
_l.commentBannerDescription2 = function(v){ return "Following " + v + " will show more content like this in your feed." };
_l.dontShowAgain = "Don't show again";

//share
_l.newShare = "New Post";
_l.firstShare = "Share Your First Post in "+appname+"";
_l.scaption = "Caption";
_l.whatsnew = "What's new?";
_l.whatsnewrepost = "What's new?";



_l.saddlink = "Add link to external site or video";
_l.saddimages = "Add Images to Post";
_l.sarticle = "To write an article";
_l.stelegram = "Send to telegram"
_l.stimes = "Clear post"


_l.snothing = "Nothing";
_l.sposttime = "Post By Time";
_l.spostnow = "Post Now";
_l.stimenotselected = "Time Not Selected";
_l.spost = "Post";
_l.sdate = "Date";
_l.stime = "Time";
_l.snotags = "Add tag";
_l.expandvideo = "Click to expand";
_l.emptymessage = "Message is empty";
_l.emptytags = "Please add Tags";
_l.emptyutxo = "no money";
_l.networkerror = "network error";
_l.maximages = "You are alowed a maximum or 10 Images";
_l.sharenow = "Do you want to share this content now?";
_l.pastdate = "Past Date";
_l.timenotselected = "Time Not Selected";
_l.addtags = "Add tags";
_l.tnews = "news";
_l.timages = "images";
_l.tlinks = "links";
_l.tvideos = "videos";
_l.tmarket = "market";
_l.tsport = "sports";

//menu
_l.signinmenu = "Sign in";
_l.signupmenu = "Sign up";
_l.aboutmenu = "learn more";

//footer
_l.aboutus = "About us";



// Dialog Box Options
_l.daccept = "Accept";
_l.dcancel = "Cancel";
_l.dyes = "Yes";
_l.dno = "No";
_l.dsa = "Do not Show Anymore";
_l.dcode = "Code"
_l.dcopyToClipboard = "Copy to ClipBoard"
_l.dwarning = "Warning"
_l.dyesclose = "Yes, close"


// Messages

_l.transactionCome = "Incoming transaction";

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

_l.refferalUserMessage = "Congrats! You rescued someone from the censored web. Some coins are on their way!"

_l.subscribeUserMessage = "followed you"
_l.unsubscribeUserMessage = "unfollowed you"
_l.gotoprofileMessage = "go to profile"
_l.upvoteShareMessage = "upvoted your post"

_l.upvoteCommentMessage = " liked your comment"

// Errors

_l.error = "Error";
_l.checkScoreError = "Your account was not found on the blockchain. You must fill in required profile info before using "+appname+". Do you want to do it now?";
_l.checkScoreErrorLight = "Account is not activated";
_l.timestamperror = "Time in application and in node do not match";

// Error Page 404
_l.e404 = "404";
_l.e404e = "Page not Found. Return to Main Page";
_l.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " posts in a 24 hour period";
}
_l.postLimitLight = function(v){
return "You have reached your limit of " + (v || 15) + " grading in a 24 hour period";
}

_l.doubleLimitLight = "You have already rated this";

_l.SelfSubscribeError = "Cannot subscribe to yourself";
_l.DoubleSubscribeError = "You already follow this user";
_l.InvalideSubscribeError = "You are not subscribed to this user";
_l.ChangeInfoLimitError = "You can only edit your profile once an hour. Please wait and try again. ";
_l.SelfScoreError = "You cannot rate your own post";

_l.unexperror10 = "Unknown Error (10)";
_l.unexperror11 = "Unknown Error (11)";
_l.unexperror12 = "Unknown Error (12)";

_l.networkerror = "There are some problems with node";

_l.canSpendError = "You have to wait for your previous transaction to clear in the blockchain. Please wait";
_l.noMoneyError  = "You can't doing actions with zero account balance";

_l.scoreLimitLight = "You have reached your rating limit";

_l.waitConf = "You have to wait for your previous transaction to clear in the blockchain";
_l.postWaitConf = "Post is waiting for a blockchain confirmation";
_l.actionWaitConf = "Action is waiting for a blockchain confirmation";


// notifications

_l.ntnow = "Now"
_l.ntlasthour = "This hour"
_l.nttoday = "Today"
_l.ntyesterday = "Yesterday"

_l.ntmounth = "This month"
_l.ntearlier = "Earlier"


_l.nodeWalletAdd = "Adding an address may take some time. Continue?"
_l.nodeEnableNoteHeader = "Note"
_l.nodeEnableNote = "That turning on a node may take up to 5GB of RAM. Make sure you have enough. Happy staking!"


/// 1301


_l.address = "Address"
_l.privatekey = "Private Key"
_l.qrcode = "QR Code"
_l.addaccount = "Add Account"
_l.entermnimo = "Enter Mnemonic Phrase or Private Key"
_l.add = "Add"
_l.e13011 = "You will now continue your registration after you install "+appname+" Desktop."
_l.e13012 = "If "+appname+" did not start downloading, please click here to install it."
_l.e13013 = "Type caption for image (optional)"
_l.e13014 = "This file is not in a supported format:"
_l.e13015 = "This file is too big:"
_l.e13016 = "Paste a YouTube, Vimeo link and press Enter"
_l.e13017 = "Loading to Blockchain"
_l.e13018 = "Do You really want to remove this article?"
_l.e13019 = "New"
_l.e13020 = "Write New Article"
_l.youarefollowing = "You are Following"
_l.follow = "Follow"
_l.blocked = "Blocked"
_l.e13021 = "Show more"

_l.block = "Block"
_l.blockuser = "Block User"
_l.unblockuser = "Unblock User"
_l.e13022 = "Do you really want to unfollow user?"
_l.unfollow = "Unfollow"
_l.unblock = "Unblock"
_l.share = "Share"
_l.info = "Info"
_l.copyLink = "Copy direct Link"
_l.includeRefLink = "Include Referal Link"
_l.shareVia = "Share via"
_l.embedding = "Embedding"
_l.copyEmbeddingCode = "Copy Embedding Code"
_l.showCode = "Show Code"
_l.embeddingSettings = "Embedding Settings"
_l.blackTheme = "Black Theme"
_l.includeComments = "Include comments"
_l.showOnlyLast = "Show Only last comment"
_l.showAll = "Show all comments"
_l.dontShow = "Don't show comments"
_l.removeDescription = "Remove description"
_l.preview = "Preview"
_l.autoplayVideo = "Autoplay Video"
_l.onlyVideo = "Only video"
_l.signToComment = "To view or post comments, you need to login or register"

_l.blockUserQ = "Do you really want to block user?"
_l.e13023 = "Do you really want to unblock user?"
_l.e13024 = "Your Private Login Key"
_l.e13025 = "Create a new account"
_l.e13026 = "Registration "+appname+""

_l.e13027 = "Stay Signed"
_l.e13028 = "You entered not valid private key"
_l.e13029 = "Message is empty"
_l.e13030 = "Comments have 1000 character limit per comment"
_l.e13031 = "Share Comment"
_l.e13032 = "Do you really want to delete your comment?"
_l.e13033 = "Comment has been removed"
_l.postRemoved = "Post has been removed"
_l.postNotFound = "Post not found"


_l.e13034 = "Yes"
_l.e13035 = "No, cancel"
_l.hide = "Hide"
_l.e13036 = "Show comments"
_l.e13037 = "Replies"
_l.remove = "Remove"
_l.e13038 = "Comment Now"
_l.e13039 = "Comment Now"
_l.e13040 = "You do not have commenting priviliges"
_l.complain = "Complain"
_l.complain_success =  "Your complaint has been successfully submitted"
_l.next = "Next"
_l.post = "Post"
_l.e13041 = ""+appname+" Connection"
_l.e13042 = ""+appname+" Proxy"

_l.e13043 = ""+appname+" Nodes"
_l.e13044 = "Add node"
_l.e13045 = "Nodes not found"
_l.e13046 = "Address"
_l.e13047 = "WS"
_l.e13048 = "Name"
_l.e13049 = "Status"
_l.e13050 = "Proxies not found"
_l.e13051 = "Don't use proxy"
_l.e13052 = "Unable connect to proxy"
_l.e13053 = "Unable connect to node"
_l.e13054 = "Add Proxy"
_l.e13055 = "Edit Proxy"
_l.save = "Save"
_l.e13056 = "Node Host"
_l.close = "Close"
_l.e13057 = "Please fill all fields"
_l.e13058 = "You alredy have this proxy in list."
_l.delete = "Delete"
_l.e13059 = "Do you really want to delete this proxy from list?"
_l.e13060 = "Proxies list"
_l.e13061 = "Do you really want to stop use Proxy. It is usafe (Http connection)"

_l.e13062 = "Edit Node"
_l.onproxy = "On Proxy"
_l.locally = "Locally"
_l.nodehost = "Node Host"
_l.e13063 = "RPC Port"
_l.e13064 = "WS Port"
_l.e13065 = "Name Of Node"
_l.e13066 = "Please enter Node Name"
_l.e13067 = "RPC login"
_l.e13068 = "Login for PRC authorization"
_l.e13069 = "RPC password"
_l.e13070 = "Password for PRC authorization"
_l.e13071 = "Please fill all fields"
_l.e13072 = "Do you really want to delete this node from list?"
_l.e13073 = "Do you really want to stop use Proxy. It is usafe (Http connection)"
_l.notselected = "Not selected"
_l.donation = "donation"
_l.e13074 = "Awaitng Funds. Address will be valid for"
_l.sminutes = "minutes"
_l.e13075 = "Time to this deal has been expired."
_l.reactivate = "Reactivate"
_l.e13076 = "Scan this code to send"
_l.back = "Back"
_l.e13077 = "Add your profile to Donors List"
_l.e13078 = "Why are we asking for donations?"
_l.e13079 = "We have spent 14+ months in spare time from full time jobs bringing "+appname+" to people. In addition to time and effort, we have put in our own money to help launch the platform. Now we need the community to step up and help us with growth."
_l.e13080 = "How will the funds be used?"
_l.e13081 = "Funds will be used to purchase advertising and hire some specific subject matter experts to make "+appname+" even more secure. Current development team will not get any of these donations. Wherever possible, we will post here how we used the funds. "
_l.e13082 = "What you will get for your donation besides knowing you supported freedom:"
_l.e13083 = "As a sign of our gratitude for donation, you will receive a gift in some amount of Pocketcoin"
_l.e13084 = "Also, when we build group chat, you will be a member of a special group of donors that will have direct access to "+appname+" team, even as the platform grows"
_l.e13085 = "Link to your "+appname+" profile will be listed below driving more people to your posts (unless you ask us to not do that)"
_l.e13086 = "Support Decentralized Web Now"
_l.e13087 = "Bitcoin, Litecoin"

_l.e13088 = ""+appname+" members who donated to support "+appname+""
_l.thankyou = "Thank you!"
_l.e13089 = "If you would like us to list your "+appname+" profile in the list of donors, please send us information about your donation"
_l.e13090 = "Add me to donors list"
_l.e13091 = "Or you can send us an email to"
_l.e13092 = "with your public key and amount."
_l.finish = "Finish"
_l.e13093 = "Please choose donation way"
_l.e13094 = "Something went wrong. Please reload page and try again (error: 0001)"
_l.e13095 = "Thank you for supporting our work for freedom. We will make sure every penny counts."
_l.e13096 = "Please fill amount of donation"
_l.e130961 = "How much do you want to donate?"
_l.e130962 = "Available balance"

_l.e13097 = "Something went wrong. Please reload page and try again (error: 0002)"
_l.e13098 = "Add link to external site or resource"
_l.e13099 = "Upload Images"
_l.e13100 = "Click here to select files for uploading"
_l.e13101 = "or drag & drop"
_l.e13102 = "Add link to external site"
_l.e13103 = "Url doesn't valid"
_l.e13104 = "Max 6 Images Allowed"
_l.e13105 = "Node management"
_l.e13106 = ""+appname+" Node"
_l.e13107 = "Node management may be carried out with Application"
_l.e13108 = "There isn't connection with Electron proxy interface"

_l.e13109 = "Please enter the words in the picture to receive Pocketcoin and continue registration"
_l.e13109lg = "Please enter the words in the picture to continue registration"
_l.e13110 = "Enter words"
_l.poll = "Create poll"
_l.next = "Next"
_l.refresh = "Refresh"
_l.e13111 = "Add your email to get the latest "+appname+" updates"
_l.e13112 = "Enter email"
_l.e13113 = "Add email"
_l.skip = "Skip"
_l.e13114 = "There is some problem with your registration due to strange activity."
_l.e13115 = "Please email"
_l.e13116 = "to receive coins and open your account."
_l.e13117 = "Check balance"
_l.joinnow = "Join Now"
_l.loading = "Loading"
_l.e13118 = "Words doesn't match"
_l.e13119 = "Add email and continue"
_l.e13120 = "Download Application"
_l.e13121 = "There aren't Images Here"
_l.e13122 = "Latest Comments"

_l.e13123 = "Show more posts"
_l.e13124 = "More Awesome "+appname+" Posts!"
_l.e13125 = "Top posts section is empty!"
_l.e13126 = "Posts from people you follow will be shown here"
_l.e13127 = "Posts from people you follow will be shown here "
_l.e13128 = "Posts from people you follow will be shown here"
_l.registration = "Registration"
_l.editpost = "Edit Post"
_l.removepost = "Remove Post"
_l.removePostDialog = "Do you really want to remove post?"
_l.opennewwindow = "Open Post in New Window"
_l.opennew = "Open Post"
_l.pin = "Pin Post"
_l.pinned = "pinned"
_l.pinPostDialog = "Do you realy want to pin this post?"
_l.unpin = "Unpin Post"
_l.unpinPostDialog = "Do you realy want to unpin this post?"


_l.unsubscribe = "Unsubscribe"
_l.startchat = "Chat"
_l.reportpost = "Report Post"
_l.reportuser = "Report User"

_l.donate = "Donate"
_l.blockuser = "Block User"
_l.more = "More"
_l.showmore = "Show More"
_l.e13129 = "Attached images"
_l.e13130 = "Edited"
_l.e13131 = "You have blocked this User"
_l.e13132 = "rated"
_l.e13133 = "Share"
_l.e13134 = "There aren't any results for this search string"
_l.e13135 = "User haven't private key"
_l.discussed = "Most Discussed"
_l.e13136 = "All Posts"
_l.e13137 = "My Subscriptions" // This is the equivalent of a ‘News feed’. Don’t change the word ‘Pocket’ however, it’s a feature of "+appname+".
_l.e13138 = "Top posts"
_l["Top Posts Over"] = "Top Posts Over"
_l.bestFirst = "The best first"
_l.topnext = "Next"
_l.topprevious = "Previous"
_l.topactual = "Return to the latest"
_l.e13139 = "Search on "+appname+""
_l.e13140 = "Search on"
_l.notifications = "Notifications"
_l.showall = "Show all"
_l.e13141 = "You have no notifications"

_l.recommendations = "Recommendations"
_l.e13142 = "I saved my key, do not remind me anymore"
_l.e13143 = "Important!"
_l.e13144 = "Copy Text"
_l.e13145 = "Save key on device"
_l.e13146 = "End of posts"
_l.e13147 = "Share"
_l.e13148 = "Do yor really want to complain on this post?"
_l.e13149 = "user ratings"
_l.e13150 = "Post Rating"
_l.totalLikes = "Total likes"
_l.e13151 = "Nobody rate this post"
_l.e13152 = "User scores"
_l.e13153 = "Skip and proceed to website"
_l.e13154 = "Your Login Information"
_l.e13155 = "To use "+appname+" you need to generate your private cryptographic key which replaces login plus password from centralized social networks."
_l.users = "Users"
_l.userstx = "Users"
_l.user = "User"
_l.postscount = "Posts count"
_l.about = "About"
_l.e13156 = "Next Results"
_l.posts = "Posts"
_l.disablePreview = "Disable link preview"
_l.e13157 = "Search by"
_l.e13158 = "hasn't any results"
_l.e13159 = "The search phrase is empty"
_l.repost = "Repost"
_l.reposted = "Repost"
_l.e13160 = "Hello Pocketeers!"

_l.e13161 = "Add tags for your post"
_l.e13162 = "You can enter a maximum of 15 tags or 2 categories"
_l.e13163 = "There are no changes in the post"
_l.e13164 = "Please add a few words to tell Pocketpeople about your link. What is it about? Why is it important? What is your opinion?"
_l.e13165 = "Your link to video is invalid. Please load valid video URL."
_l.e13166 = "You rescued"
_l.e13167 = "people from the censored web"
_l.e13168 = "Earn Pocketcoin for each signup through your link"
_l.e13169 = "Direct link"
_l.copy = "Copy"
_l.e13170 = "Include "+appname+" sign up call-to-action "
_l.more = "More"
_l.e13171 = "Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here"
_l.e13172 = "I want to invite you to a new decentralized blockchain social called "+appname+"! You will find a ton of interesting stuff and if you sign up, both of us will get Pocketcoin cryptocurrency bonus!"
_l.e13173 = "Send by email"
_l.e13174 = "Social sharing"
_l.e13175 = "Popular tags"
_l.e13176 = "Address type"
_l.e13177 = "Upload photo"

_l.requiredfields = "required fields"
_l.e13178 = "Not linked to your profile"
_l.e13179 = "Unspent List"
_l.e13180 = "Your Invoice has Been Successfully Created"
_l.e13181 = "An Error has Occurred During the offer creating process"
_l.e13182 = "Block Explorer"
_l.e13183 = "Help center"
_l.e13184 = "Continue Registration"
_l.e13185 = "Connection Lost"
_l.e13186 = "Edit profile"
_l.e13187 = "Contents"
_l.e13188 = "Please save your private cryptographic key which replaces login plus password from centralized social networks"
_l.e13189 = "Leave and lose my key forever!"
_l.e13190 = ""+appname+" theme"
_l.e13191 = "Set Theme"
_l.uiScaleSetting = "Interface scaling"
_l.uiScaleSettingTitle = "Set scaling"
_l.e13192 = "Level"
_l.e13193 = "BONUS"
_l.e13194 = "Reputation and Status"
_l.e13195 = "Limitations"
_l.с= "It much take up"
_l.e13197 = "Recieve Pocketcoins"
_l.e13198 = "Approximate waiting time is"
_l.e13199 = "Join "+appname+" Now"

_l.e13200 = "Back To "+appname+""
_l.e13201 = "JOIN BETA"
_l.e13202 = ""+appname+" beta test will start on Jan 24"
_l.e13203 = "Thank you for joining "+appname+" beta test email list. It is not required to use "+appname+", however, we will use this email to send your surveys to improve the platform. Thank you for helping to shape the future of internet."
_l.e13204 = ""+appname+" Recieve Address"
_l.e13205 = "Parameters"
_l.e13206 = "Recieve Pocketcoin Amount"
_l.e13207 = "Send Amount"
_l.e13208 = "Available"
_l.e13209 = "Crowdfunding List"
_l.e13210 = "New deal"
_l.e13211 = "Copy Link And Share"
_l.amount = "Amount"
_l.label = "Label"
_l.message = "Message"
_l.copylink = "Copy Link"
_l.sendMessenger = "Send via messenger"
_l.e13211 = "Please fill this fields"
_l.e13212 = "Create Qr Code"
_l.e13213 = "Recieve Address"
_l.process = "Process"
_l.source = "Source"
_l.yourmessage = "Your message"
_l.e13214 = "Pocketcoin Amount"
_l.currency = "Currency"


_l.e13215 = "Select currency"
_l.e13216 = "Currency Amount"
_l.e13217 = "Time to this deal has been expired."
_l.e13218 = "Waiting blockchain confirmations"
_l.e13219 = "Send Pocketcoins to You"
_l.e13220 = "Pocketcoins delivered"
_l.errorreload = "Something went wrong. Please reload page and try again"
_l.e13221 = "Do you really want to delete information about this deal? Deal can't be stop"
_l.e13222 = "Download Desktop App - this is the most censorship resistant way to use "+appname+". Even if websites are shut down, desktop application will still run directly through the nodes."



_l.e13223 = "Download "+appname+" for Windows"
_l.e132232 = "Download "+appname+" for macOs"
_l.e13224 = "Download "+appname+" for Linux"

_l.e132233 = "Download "+appname+" for Android"
_l.e132221 = "Download Mobile App - this is the most usefull way to use "+appname+"."
_l.installpwa = "Install"

_l.step1 = "Step 1:"
_l.step2 = "Step 2:"
_l.installios_instruction3 = "at the bottom of the screen"

_l.e132233ios = "Install "+appname+" for Iphone"

_l.installios_caption =  "Install "+appname+" for Iphone"
_l.installios_empty =  "This is the page to install the Application for iPhone. Applications for other operating systems can be found here"
_l.installios_empty_button =  "Go to application page"
_l.installios_instruction1 = 'tap'
_l.installios_instruction2 = 'then "Add to home screen"'


_l.e13225 = ""+appname+" Node"
_l.e13226 = "Download Node"
_l.e13227 = "Download "+appname+" Node for Windows"
_l.e13228 = "Download "+appname+" Node for Linux"
_l.e13229 = "Invalid Private Key"
_l.e13230 = "Undefined connection error"

_l.e13231 = "Connection lost"
_l.e13232 = "Unable to connect with node"
_l.e13233 = "This comment was removed"
_l.e13234 = "Opreturn error/41"
_l.e13235 = "You cannot rate comment twice"
_l.e13236 = "This comment was removed"
_l.e13237 = "You cannot rate yourself"
_l.e13238 = "Comment sending error. Please wait and try again/ 37"
_l.e13239 = "Comment sending error. You are replying to a comment that was deleted"
_l.e13240 = "The comment you are replying to has been deleted by the user"
_l.e13241 = "This comment is too long, please break it up"
_l.e13242 = "You have been blocked by this person, you will be unable to comment on their posts"
_l.e13243 = "You have reached your limit of upvote comments in a 24 hour period"
_l.e13244 = "You have reached your limit of editing comments in a 24 hour period"
_l.e13245 = "You have reached your limit of sending comments in a 24 hour period"

_l.e13246 = "You are trying to edit someone else's post"
_l.e13247 = "You have reached your limit of editing 5 posts in a 24 hour period"
_l.saveSettingsLimit = "You have reached your limit of saving settings in a 24 hour period"

_l.e13248 = "You can only edit once per blockchain block. Please wait a minute, then try again"
_l.e13249 = "You cannot block yourself"
_l.e13250 = "You have already blocked this user"
_l.e13251 = "You have not blocked this user"
_l.e13252 = "Transaction is malformed"
_l.e13253 = "You cannot refer yourself"
_l.e13254 = "This username is too long"
_l.e13255 = "This username is already in use"
_l.e13256 = "This post is too long, please break it up."
_l.e13257 = "Your "+appname+" reputation score does not allow for registering of complaints yet"
_l.e13257_1 = "Your "+appname+" reputation score does not allow you to put negative ratings on publications"

_l.e13258 = "You have reached the limit of complaints in a 24 hour period"
_l.e2000 = "Connection error. Please try again"

_l.e13259 = "Cannot complain about your own post"
_l.e13260 = "You have already filed a complaint against this user."
_l.e13261 = "Save Key"
_l.e13262 = "Later"
_l.e13263 = "Subscribe and Turn On notifications from this user"
_l.e13264 = "Subscribe without notifications"
_l.e13265 = "Your name is no longer available, please choose another one"
_l.e13266 = "White Theme"
_l.e13267 = "Dark Theme"
_l.e13268 = "Coinstake win"
_l.e13269 = "Transactions receive"
_l.e13270 = "Upvotes receive"
_l.e13270d = "Downvotes receive"

_l.e13271 = "Comment receive"
_l.e13272 = "Answer receive"
_l.e13273 = "New Followers"
_l.e13274 = "Rescued Users"
_l.e13275 = "Comment Score"
_l.e13276 = "Show embed videos"
_l.e13277 = "Autoplay videos"
_l.e13278 = "Start "+appname+" Automatically"
_l.e13279 = "Chat"
_l.e13280 = "Tags"
_l.e13281 = "Last Comments"
_l.e132812 = "Comments"
_l.e13282 = "Telegram bot token"
_l.e13283 = "Post from Telegram channel"
_l.e13284 = "Add bot into chat and select"
_l.e13285 = "Ask before post from telegram"
_l.e13286 = "Ask before send to telegram"
_l.e13287 = "Send to telegram channel"
_l.video = "Video"
_l.audio = "Audio"
_l.e13288 = "Main Widgets Page"
_l.e13289 = "Integration with Telegram"

_l.sound = "Sound"
_l.system = "System"
_l.e13290 = "Would do you like to follow"
_l.e13291 = "Do you really want send message to Telegram?"
_l.send = "Send"
_l.e13292 = "You already have node on this host"
_l.e13293 = "Internal Error"
_l.e13294 = "PGSQL Database Enable"
_l.e13295 = "DB Host"
_l.e13296 = "DB Port"
_l.e13297 = "DB Max"
_l.e13298 = "DB Idle Timeout, ms"
_l.e13298 = "DB Name"
_l.e13300 = "DB User"
_l.e13031 = "DB Password"
_l.e13302 = "Proxy server on"
_l.e13303 = "Proxy https server port"
_l.e13304 = "Proxy wss server port"
_l.e13305 = "Server SSL Key, pem"
_l.e13306 = "Server SSL Cert, pem"
_l.e13307 = "Server SSL Passphrase"
_l.e13308 = "Firebase admin SDK"
_l.e13309 = "Your Crane Address"
_l.e13310 = "Captcha Enable"
_l.e13311 = "Ip limiter enable"
_l.e13312 = "Server"

_l.e13313 = "Data Base, PG sql"
_l.e13314 = "Firebase"
_l.e13315 = "Other"
_l.e13316 = "Enable"
_l.e13317 = "Binary path"
_l.e13318 = "Config path"
_l.e13319 = "Data path"
_l.e13320 = "Staking Address"
_l.e13321 = "Import the account address to the node for stacking"
_l.e13322 = "State"
_l.e13323 = "Staking addresses"
_l.e13324 = "Last Block"
_l.control = "Control"
_l.setup = "Setup"
_l.e13325 = "Do you really want post messages from Telegram?"
_l.e13326 = "Post"
_l.e13327 = "Do you really want use proxy again?"
_l.e13328 = "liked your comment!"
_l.e13329 = "New Comment Like"
_l.e13330 = "shared your post"
_l.e13331 = "shared your post"
_l.e13332 = "has a brand new post"
_l.e13332v = "has a brand new video"
_l.e13333 = "Incoming transaction"
_l.e13334 = "Congratulations, you have won"
_l.e13335 = "Pocketcoin for your latest"
_l.e13336 = "with message"
_l.e13337 = "commented your post"
_l.e13338 = "answered on your comment"
_l.reply = "Reply"
_l.e13339 = "You rescued someone from the censored web. Some coins are on their way!"
_l.e13340 = "Congrats!"
_l.e13341 = "followed you"
// <%=e("e13352")%> <%=e("e13037").toUpperCase()%> <%=e("")%> self.app.localization.e("e13337")
_l.e13342 = "New Follower"
_l.e13343 = "upvoted your post"
_l.e13344 = "New Upvote"
_l.e13345 = "sent you private message"

_l.e13346 = "You have new messages"
_l.e13347 = "Updates to "+appname+" are available. Apply the updates now?"
_l.e13348 = "No, later"
_l.e13349 = "Updates to "+appname+" are available. Go to the page to download the new version?"
_l.e13350 = "Join "+appname+" & Earn Pocketcoin Now"
_l.e133512 = "Please write a few words about yourself to help people decide if they want to follow you"
_l.e13351 = ""+appname+" chat"
_l.e13352 = "You do not have chat priviliges"

_l.e14001 = "Language of publication"
_l.e14002 = "Are you sure you want to clear the post?"
_l.e14003 = "Technical"
_l.e14004 = "Where do I download the client?"
_l.e14005 = "Where do I download the node?"
_l.e14006 = "Click on "+appname+"Setup.exe"
_l.e14007 = "With any questions email core@pocketnet.app"
_l.e14008 = ""+appname+""
_l.e14009 = "I see a PN address and a wallet address... are both these addresses on the PN blockchain?"
_l.e14010 = "PN address is the one used for posting content and using social network in general. It also keeps coins that you win for your highly rated posts."
_l.e14011 = "Wallet addresses are to keep the rest of coins."
_l.e14012 = "Can I link to my profile? or my 'page'? So that i can post it into my community to bring members over."
_l.e14013 = "In the browser, go to your profile by clicking on avatar in the upper right and just copy the browser address, everyone who will sign up from that link will follow you automatically and you will actually get rewards."
_l.e14014 = "On the desktop,  from a desktop application go to your profile,  once there, there will be three icons to the right of your avatar first there will be a wallet with number of coins, then a bell with notifications and a third is a green cross icon click on that green cross  and click copy,  send that link around everyone who subscribes will follow you and you will get rewards."
_l.e14015 = "The star system. is there a limit on how many stars a person has to give people?"
_l.e14016 = "There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you get 100 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 200 ratings a day."
_l.e14017 = "How long until I&rsquo;m able to update my profile? "
_l.e14018 = "You are able to update your profile once every hour."
_l.e14019 = "Is there a Linux Desktop?"
_l.e14020 = "Yes! It is in the works 2-3 weeks as the beta test progresses."
_l.e14021 = "Where do you save the video content?"
_l.e14022 = "We are working on video storage, in the meantime you can share from Bitchute, Youtube, Vimeo and other video sources."
_l.e14023 = "Is there a mobile app?"
_l.e14024 = "Yes. But we strongly encourage everyone to also download the desktop app, since, unlike Android or iPhone app, it cannot be taken away from you by Google or Apple."
_l.e14025 = "Can you tell me what is the limit for posting each day or hour?"
_l.e14026 = "We do have some limitations, but after testing it we have increased our limits. At the outset you can make 15 posts and issue 100 ratings every 24 hours. Once your reputation grows above 50, you will be able to make up to 30 posts and 200 ratings every 24 hours."
_l.e14027 = "What is reputation and how is it calculated?"
_l.e14028 = "Your reputation is the sum of your ratings calculated in the following way. Note, that users with reputation below 50 do not affect anyone`s reputation or coin winnings. They can rate the content, but it does not affect reputation."
_l.e14029 = "So, if you have two 5 star ratings and one 1 star rating, the total will be"
_l.e14030 = "Is there a way to delete or edit a post?"
_l.e14031 = "Not at this point, as it is baked into blockchain. However, we are working on a feature to create an overwrite transaction as well &#10075;hide&#10076; transaction, which would effectively translate to edit or delete."
_l.e14032 = "Is there a way to search for a user?"
_l.e14033 = "Click the search magnifying glass on the top and search by username or by keywords."
_l.e14034 = "How do you follow someone?"
_l.e14035 = "Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts chronologically, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)"
_l.e14036 = "Can it be used on Brave or Duck Duck go browsers?"
_l.e14037 = ""+appname+" should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab "+appname+"Setup.exe here: https://github.com/pocketnetteam/pocketnet.gui/releases/tag/v0.0.33-beta). It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe."
_l.e14038 = "Can we reply to our own/and other&rsquo;s posts?"
_l.e14039 = "Yes, commenting is live below each post.."
_l.e14040 = "How to add a tag to a post?"
_l.e14041 = "Just type in the field tag and press enter. No need to specify #, it will be added automatically."
_l.e14042 = "How can I use the public address?"
_l.e14043 = "Your public address is what "+appname+" uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. "+appname+" uses the same exact cryptography as Bitcoin."
_l.e14044 = "Will there be a downloadable executable for Mac?"
_l.e14045 = "Yes - we are working of Mac platform. Target is for mid-April."
_l.e14046 = "Pocketcoin"
_l.e14047 = "What can I do with Pocketcoin?"
_l.e14048 = "Currently you can win it or send as a gift. However, if and when "+appname+" takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token."
_l.e14049 = "Is Pocketcoin like a share of stock in "+appname+"?"
_l.e14050 = "Definitely no. "+appname+" is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, "+appname+" will include a marketplace where goods and services will be sold directly for Pocketcoin"
_l.e14051 = "Can I buy additional Pocketcoin?"
_l.e14052 = "Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise "+appname+" to the world. So, by buying a Pocketcoin you are positioning yourself for success of "+appname+", but just as importantly you are helping "+appname+" achieve this success. All major social networks had billion dollar advertising budgets. "+appname+" was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now."
_l.e14053 = "Can I buy Pocketcoin for US Dollars or other fiat currency?"
_l.e14054 = "No."
_l.e14055 = "Privacy"
_l.e14056 = "Are people who do not enter their real names anonymous?"
_l.e14057 = "Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates."
_l.e14058 = "Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?"
_l.e14059 = "Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power."
_l.e14060 = "Is my public key like a wallet ID that I enter on my profile and people can send points to?"
_l.e14061 = "Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!"
_l.e14062 = "Can I run a node on my headless server?"
_l.e14063 = "We will put the node&rsquo;s sources into GitHub. Instructions for running a node will be made available in early April."
_l.e14064 = "How can I sign back in?"
_l.e14065 = "You can use your private 12-word key or a QR code to sign in."
_l.e14066 = "Curation of content"
_l.e14067 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?"
_l.e14068 = "This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley."
_l.e14069 = "Specifics of curation on "+appname+"."
_l.e14070 = "When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community)."
_l.e140701 = "We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?"
_l.e140702 = "Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries."
_l.e140703 = "We strongly recommend that you complain about porn/nudity of any kind. There are plenty of porn/nudity sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn/nudity. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials."
_l.e14071 = "Important Note on Racism."
_l.e14072 = "Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn "+appname+" into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on "+appname+". Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. "+appname+" team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on "+appname+". Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic."
_l.e14073 = "Specifics of curation on "+appname+"."
_l.e14074 = "Is any content allowed on "+appname+"? If some content is not allowed, can the platform still be called free speech?"
_l.e14075 = "Sometimes we can have a user who comes in with a specific purpose to attack "+appname+" by posting a series of vile images. To protect against that we have a following mechanism. If someone’s reputation reaches -50 (negative 50), their account is automatically blocked. Getting a reputation of -50 is equivalent to having 25 one star ratings and no four or five star ratings. This is nearly impossible to achieve without having lots of bad posts."
_l.e14076 = "Flagging a specific post"
_l.e14077 = "When your reputation gets to 50 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn "+appname+" into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of "+appname+" as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn/nudity of any kind. There are plenty of porn/nudity sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn/nudity. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, "+appname+" will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials."
_l.e14078 = "How is "+appname+" different from..."
_l.e14079 = "Twitter, Facebook, Reddit & other centralized platforms?"
_l.e14080 = "There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users."
_l.e14081 = "Decentralized platforms like Minds.com and Sola?"
_l.e14082 = "Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor."
_l.e14083 = "From Steemit?"
_l.e14084 = "Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that."
_l.e14085 = "Decentralized platforms like Mastodon and others?"
_l.e14086 = "While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. "+appname+" features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge."
_l.e14087 = ""+appname+" ecosystem"
_l.e14088 = "How is "+appname+" develpment funded?"
_l.e14089 = ""+appname+" is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch "+appname+" will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner."
_l.e14090 = "What is Pocketcoin?"
_l.e14091 = "Pocketcoin is a network token. It is used exclusively to buy advertising from "+appname+" contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of "+appname+" and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes."
_l.e14092 = "How are content creators and node operators rewarded?"
_l.e14093 = ""+appname+" features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless."
_l.e14094 = "What if users post illegal content, porn/nudity and SPAM?"
_l.e14095 = ""+appname+" is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag illegal content OR content that threatens mass adoption of "+appname+", not simply the content they find offensive. To make sure that "+appname+" is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media."
_l.e14096 = "Who runs the "+appname+"?"
_l.e14097 = "There is no corporate entity or single individual who owns or controls the "+appname+"."
_l.e14098 = "The Designer of the "+appname+", Daniel Sachkov changed his main focus in the Summer of 2019 he is now doing research on further decentralization of blockchain technology that will benefit everyone. He handed control of the Project in accordance with the idea of a full decentralized social media architecture and design over to the community and the Nodes who run the Network."
_l.e14099 = "A team of capable, changing developers and community volunteers is working on the realisation of his Vision ever since. "

_l.e14100 = "Help Center"
_l.e14101 = "Block Explorer"
_l.e14102 = "F.A.Q."
_l.e14103 = "Roadmap"
_l.e14104 = "Node Setup"
_l.e14105 = "Videos"
_l.e14106 = "Applications"
_l.e14107 = "Check for updates"
_l.e14108 = "Share answer"
_l.e141081 = "Menu"
_l.e14109 = "Where do I download the Android App?"
_l.e14110 = "Google Play Market"


_l.peertubeAddVideo = "Upload Video"
_l.peertubeAddAudio = "Upload Audio"
_l.peertubeAddStream = "Add live stream to post"

_l.e14111 = "There was a problem with loading images"
_l.editcomment = "Edit Comment"
_l.system16 = {
    charts : {

    }
}
_l.selectnode = function(a) {
    return `Do you really want reconnect to selected ${a} Node?`
}


_l.downvoteShareMessage = "downvoted your post"

_l.shareviagroupemail = "Email"
_l.shareviagroupmessenger = "Messengers"
_l.shareviagroupsocial = "Social networks"
_l.shareviagroupblog = "Blogs"

_l.anotherSiteCaption = "You follow an external link to a third-party site"
_l.anotherSiteDisc = "We are not responsible for the content of the site and strongly recommend that you do not provide any of your personal data on third-party sites."

_l.Categories = "Categories"
_l.addtagsCategories = "Categories and tags"
_l.addcategory = "Add Category"
_l.categoryname = "Category name"
_l.entercategoryname = "Enter category name"
_l.categoryfilter = "Category filter"
_l.emptycategoryname = "Please enter name of category."
_l.doublename = "Category with this name already exist. Please choose another name."

_l.showmoreusers = "Show more users"
_l.zeron = "Nothing found";
_l.maxtags = "Only 5 tags maximum allowed";

_l.videotitle = "Enter video/stream title";
_l.videodesc = "Enter video/stream description";
_l.entervideocaption = "Please, enter video title";

_l.period = "Period";
_l.periodday = "One Day";
_l.period3day = "Three Days";
_l.period7day = "One week";
_l.period31day = "One Month";
_l.period182day = "Half of year";

_l.shareBareLink = "Share Video Link";
_l.videoCopied = "Video link successfully copied to clipboard";

_l.editWallpaper = "Change Preview Image";
_l.removeVideo = "Remove Video";

_l.removeVideoDialog = "Are you sure you want to delete this video?"

_l.pterror_meta = "Peertube: Undefined request"
_l.pterror_host = "Peertube: Peertube server not found"
_l.pterror_link = "Peertube: Unknown Peertube link"
_l.pterror_removeerror = "Peertube: Unable to remove video. Pleasy try again"
_l.pterror_updateempty = "Peertube: No changes found to update"
_l.pterror_uploaderror = "Peertube: Video has not been uploaded"
_l.pterror_dailyquotalimit = "Peertube: You have reached your video upload limit"
_l.pterror_videoQuotaUsedDaily = "Peertube: Failed to get channel information (quota)"
_l.pterror_usersMe = "Peertube: Failed to get channel information"
_l.pterror_oauthClientsLocal = "Peertube: Failed to get oAuth information from server"
_l.pterror_pocketnetAuth = "Peertube: Peertube-"+appname+" authorization failed"
_l.pterror_getToken = "Peertube: Unable to get Token"
_l.pterror_videonotselected = "Peertube: Video not Selected"


_l.settingsTranscoding = "On video upload transcode it on my device"
_l.videoTranscodingNotOptimal = "Not optimal transcoding result. Continuing with original video"
_l.videoTranscodingError = "There was an error with processing your video"
_l.videoUploadingFinish = "Finishing uploading..."
_l.uploadNewVideo = "Upload New Pocketvideo"
_l.uploadNewAudio = "Upload New Pocketaudio"
_l.selectVideoFile = "Select video file"
_l.selectAudioFile = "Select audio file"
_l.uploadVideoProgress_binaries = "Preparing binaries:"
_l.uploadVideoProgress_processing = "Processing video:"
_l.uploadVideoProgress_uploading = "Uploading video:"
_l.uploadAudioProgress_uploading = "Uploading audio:"
_l.uploadVideoProgress_start = "Video download initialization:"
_l.uploadAudioProgress_start = "Audio download initialization:"
_l.uploadCanceled = "Upload canceled"

_l.pleaseTryAgain = "Something was wrong there. Please try again"










_l.pbp_1 = "Bastyon Bonus Program"
_l.pbp_2 = "Criteria for bonus for original content:"
_l.pbp_3 = "Every 15k views + 1500 five star ratings from unique users  + 1500 referral users"
_l.pbp_4 = "PKOIN Equivalent:"
_l.pbp_5 = "1,000 USDT"
_l.pbp_6 = "How You Speed Up Your Bonus?"
_l.pbp_7 = "Embed your Bastyon video to external websites (click Share and choose Embed)"
_l.pbp_8 = "Share your video to social networks and via email"
_l.pbp_9 = "Share the link to your personal page (go to your profile and click Share). You can create special posts that are exclusive only for your Bastyon subscribers. When creating a post choose an option Visible Only for Subscribers. Exclusive materials will increase the number of referrals."
_l.pbp_10 = "If you invite a video blogger and can prove it, you get a bonus equal to 25% of their earnings from the first 4 bonuses."
_l.pbp_11 = "For any questions, email"

_l.pbp_6_1 = ""
_l.pbp_6_2 = ""
_l.pbp_6_3 = ""



_l["Top Videos"] = "Top Videos"
_l["More videos by this author"] = "More videos by this author"

_l["pdirectdialog"] = "External proxies are not responding, would you like to switch to a local proxy?"


_l.goLive = "Go Live"
_l.streamInfo = "Stream Info"
_l.streamCreating = "Creating Stream"

_l.importFromExternal = "or import from YouTube"


_l.importHeading = "Import Video from YouTube"
_l.importInputPlaceholder = "Paste link to your YouTube video"
_l.importInputLabel = "Video Url"

_l.capitalWarning = "Stream quality limitations"
_l.streamSettingsWarn = "For optimal performance, please use streaming settings no higher than following: 2000 kb/s bitrate, 1920x1080p resolution. Otherwise your live could be terminated or unstable"

_l.keygeneration = "Cryptography keys generation"

_l.failedStreamGeneration = "Unable to start stream"

_l.hideallnotifications = "Hide all notifications"

_l.e133452 = "sent you message"
_l.e133453 = "invite you in chat"


_l.createnewcontinue = "Continue creating account";


_l.transactionnotfound = "Transaction not found";

_l.donateself = "You can't donate yourself";
_l.donated = "commented your post and donated"
_l.incoins = "Not enough coins";
_l.yourbalance = "Your balance"
_l.sumoftransaction = "Sum of transaction"

_l.videoBitrateError = "Video bitrate is too high. Please, use file with lower quality/resolution"
_l.videoQualityInfo = "Maximum allowed video bitrate  - 8 Mbit/s. If your file exceeds this limit, the download would be terminated. Maximum allowed resolution - 720p. <br/> Recommended bitrates: <br/> <b>1080p:</b> 5081 Kbps <br/> <b>720p:</b>  2680 Kbps <br/> <b>480p:</b>  1300 Kbps <br/> <b>360p:</b>  700 Kbps"
_l.videoQualityCaption = "Video quality limitations"
_l.videoFormats = "List of supported video formats: .mp4, .mkv, .mov, .avi, .wmv, .flv, .f4v, .3g2, .3gp, .mts, .m2ts, .mxf, .nut"
_l.videoSizeError = "Selected video file exceeds the limit of 4 Gb per video. Please compress it or select another one."
_l.videoSizeAtt = "Maximum allowed file size: 4 Gb."
_l.videoFormatError = "Incorrect video format";
_l.videoSelectError = "No video selected";

_l.removevideoShareQuestion = "The uploaded video remains available in the video cabinet. Do you want to delete the video completely?";
_l.removevideoShareQuestionDelete = "Delete video"
_l.removevideoShareQuestionLeave = "No"
_l.importingVideo = "Video is loading"
_l.importingVideoSuccess = "Video loaded. You can continue posting"

_l.streamLinks = "Streaming software links"
_l.linkRTMP = "RTMP Url"
_l.linkStreamKey = "Stream Key"



_l.videoCabinet = "My Videos";
_l.uploadQuota = "Daily Uploading Quota";
_l.attachVideoToPost = "Create Post With This Video";

_l.linkToPost = "Link to Post";
_l.attachVideoToPostShort = "Post";

_l.totalStars = "Average rating (Total Votes)";
_l.totalComments = "Total Comments";
_l.totalViews = "Video Views";

_l.enterVideoName = "Search by video name";

_l.videoTranscoding = "Video is being processed and may not work properly / induce extended traffic consumption. Do you still want to post it?";
_l.waitForTranscoding = "Wait for processing";

_l.bonusProgram = "Bonus Program Status";
_l.bonusProgramViews = "Total Video Views";
_l.bonusProgramRatings = "Total Ratings";

_l.sortBy = "Sort by:";
_l.sortDirection = "Sort direction:";
_l.sortDirectionAsc = "Ascending";
_l.sortDirectionDesc = "Descending";
_l.sortByName = "Name";
_l.sortByCreatedAt = "Creation Date";
_l.sortByDuration = "Duration";
_l.sortByViews = "Views";

_l.unableToAuthorize = "Unable to authorize";
_l.unableToAuthorizeBody = "Unfortunately, the application cannot authenticate this account on the video server. You need at least 5 PKOIN or 100 reputation to upload videos.";

_l.unableToAuthorizeConnection = "Unable to authorize";
_l.unableToAuthorizeConnectionBody = "Unfortunately, the application cannot authenticate this account on the video server.  Please try again later";




_l.download = "Download";
_l.downloaded = "Downloaded";
_l.downloadedEmpty = "Downloaded posts will be shown here";
_l.emptyDescription = "Description is empty";
_l.transcodingShort = "Processing";
_l.editVideoDescription = "Edit video name/description";
_l.errorChangingDescription = "Unable to change video name/description";
_l.downloadVideo = "Save video";
_l.downloadingVideo = "Saving video";
_l.deleteSavedVideo = "Delete saved video";

_l.downloadShare = "Save Share";
_l.deleteSavedShare = "Delete Share";

_l.selectQuality = "Select the quality of the uploaded video";
_l.downloadedVideos = "Downloaded videos";
_l.deleteAllDownloadedVideos = "Delete all downloaded videos";
_l.noDownloadedVideos = "No downloaded videos";
_l.deleteVideoDialog = "Delete saved video";
_l.deleteAllVideoDialog = "Are you sure you want to delete all the videos?";
_l.videosDeleted = "Videos deleted!";

_l.enterVideoName = "Enter video name";
_l.enterVideoDescription = "Enter video description";


_l.doyouwantseepk = "Do you really want to see your private key?";
_l.copycode = "Copy Private Key";
_l.privatekeyqr = "Private key QR code";
_l.saveimage = "Save image";

_l.showAllButton = "Show all";
_l.hideAllButton = "Hide";

_l.UniqueUsers = "Unique Raters";
_l.ErrorLoadingRates = "Loading Error";

_l.userGuides = "Guides";
_l.liveSreamingGuide = "Live Streaming";

_l.bastyonhelperTitle1 = "Pocketnet has moved",
_l.bastyonhelperTitle2 = "Bastyon of Free Speech";
_l.bastyonhelperSubtitle1 = "Pocketnet is now";
_l.bastyonhelperSubtitle2 = "Please, follow the link bellow";


_l.videotranscodingwait = "Please wait, this video is being processed. This may take some time, after it is transcoded, you will be able to post it on Bastyon.";
_l.views = "Views";


_l.saveshare = "Download video";
_l.gotosaved = "Go to downloaded";
_l.successdownloaded = "Video downloaded";


_l.logoutaccount = "Sign out of your account";
_l.closeapplication = "Exit the application";


_l.attachVideoLenta = "Attach video to post";
_l.attachVideoLentaShort = "Attach";

_l.linkToPostLenta = "Already posted"

_l.ReferralUsers = "Referral Users. Total/From&nbsp;01.11.2021"
_l.lockedaccount = "Your account has been blocked due to a decrease in reputation or due to user complaints"
_l.lockedaccounta = "Author account has been blocked due to a decrease in reputation or due to user complaints"

_l.lockedaccountacomment = "Comment author account has been blocked due to a decrease in reputation or due to user complaints"
_l.hiddenCommentLabel = "Comment hidden due to low rating"

_l.blockedbymeHiddenCommentLabel = "Comment hidden because you have blocked a user"
_l.hiddenCommentsLabel = "Comment hidden due to low ratings of the commenter"

_l.showhiddenComment = "Show"

_l.visibletoeveryone = 'Visible for everyone'
_l.visibleonlytosubscribers = 'Visible only for subscribers'
_l.visibleonlytoregistered = 'Visible only for Bastyon users'

_l.sharevisibility_sub = 'For subscribers'
_l.sharevisibility_reg = 'For Bastyon users'

_l.sharevisibilitylabel_sub_post = 'Author chose to make this <b>post</b> available only for subscribers'
_l.sharevisibilitylabel_reg_post = 'Author chose to make this <b>post</b> available only for registered Bastyon users'
_l.sharevisibilitylabel_sub_article = 'Author chose to make this <b>article</b> available only for subscribers'
_l.sharevisibilitylabel_reg_article = 'Author chose to make this <b>article</b> available only for registered Bastyon users'
_l.sharevisibilitylabel_sub_video = 'Author chose to make this <b>video</b> available only for subscribers'
_l.sharevisibilitylabel_reg_video = 'Author chose to make this <b>video</b> available only for registered Bastyon users'

_l.buy = 'Buy';

_l.topAuthors = 'Recommended Authors';
_l.recommendedPosts = 'Recommended Posts';
_l.rating = 'Rating';
_l.setupVideoNodeGuide = 'Setup Video Node'
_l.subscribers3 = 'Subscribers';

_l.MainBoard = 'Stand up to censorship &';
_l.MainBoard1 = 'gain financial independence';
_l.MainBoard2 = 'The first censorship-resistant social network protocol';
_l.MainBoard3 = 'Based on Blockchain technology, decentralized and secure.';
_l.MainBoard4 = 'No corporation, no centralized servers, moderated by the community ';
_l.MainBoard5 = 'Powered by Pocketcoin (PKOIN) to reward creators and contributors';
_l.MainBoard55 = 'Open-source & transparent rules that are the same for everyone';
_l.MainBoard6 = 'Get it on';
_l.MainBoard7 = 'Google Play';
_l.MainBoard8 = 'Download for';




_l.works = 'We Believe in Freedom';
_l.works1 = 'Bastyon is an innovative network that can bypass common censorship tactics, such as blocking of domains and banning bloggers for dissent';
_l.works2 = 'Bastyon is also a video sharing platform that, unlike traditional and mainstream social media, gives your privacy and freedom from arbitrary censorship';
_l.works3 = 'Bastyon is also a private and freedom-oriented financial system powered by Pocketcoin (PKOIN) that is used to promote content and goods';
_l.works4 = 'We are driven by FREEDOM';
_l.works5 = 'Does not depend on corporate entities';
_l.works6 = 'Does not depend on banks for financing and operations';
_l.works7 = 'Does not depend on any domain or website which can be easily blocked';


//aboutHome
_l.aboutServices = 'NO CENSORSHIP';

_l.aboutServices1 = 'Censorship resistant';
_l.aboutServices2 = 'Bastyon exists on decentralized node computers around the world run by users. Every node computer runs on the same exact transparent set of rules, preventing someone from arbitrarily banning content. Not even Bastyon developers can ban anyone, the platform is user moderated';
_l.aboutServices3 = 'Not even Bastyon developers can ban anyone, the platform is user moderated';

_l.aboutServices4 = 'Bitcoin of Social Media';
_l.aboutServices5 = 'Bastyon runs on the on the blockchain and does not depend on any website or a domain. As long as there are several nodes running somewhere in the world, the network can operate and creators will have access to the followers and users to content. ';
_l.aboutServices6 = 'Bastyon is the “Bitcoin of social media”';

_l.aboutServices7 = 'Privacy Protection';
_l.aboutServices8 = 'Bastyon account is not tied to your identity or a phone number, only email verification is required. Multiple accounts are permitted to protect your privacy. No personal data is ever acquired or stored. Bastyon also features a peer-to-peer encrypted messenger. ';
_l.aboutServices9 = 'Your privacy is the main goal of Bastyon. Your private key is known only to you and cannot be recovered even by the developers.';
_l.aboutServices10 = 'In addition, hackers cannot enter your account and change your password.';

_l.aboutServices11 = 'Earn with Bastyon';
_l.aboutServices12 = 'You can get paid 1,000 USD';
_l.aboutServices13 = 'There are many ways of monetizing your content using Pocketcoin (PKOIN). Unlike You earn PKOIN for popular content, users can attach PKOIN to featured comments. A decentralized ad marketplace with 100% proceeds going to bloggers is set to be released in December 2021.  ';

_l.aboutServices14 = 'Upload your videos';
_l.aboutServices15 = 'Bastyon lets you';
_l.aboutServices16 = 'share your posts and videos';
_l.aboutServices17 = ', Upload them safely, import them from YouTube (contact us so that we can help!), make sure to let them visible to everyone. Forever. No one will be able to remove or ban them.';


_l.aboutServices18 = 'Open Source';
_l.aboutServices19 = 'We believe that';
_l.aboutServices20 = 'privacy and security';
_l.aboutServices21 = 'have to pass through Open Source projects. The entire project is available on GitHub so that you can check that there are no backdoors and that Bastyon is not storing any personal data.';


_l.aboutNewBlock = 'How to Earn with Bastyon';
_l.aboutNewBlock1 = 'Popular Content & Featured Comments ';
_l.aboutNewBlock2 = 'You earn PKOIN for votes from users that are active on the platform. So, if you bring over your audience, you will be protected from censorship, while earning for their interaction with your content. Your followers can also add PKOIN to their comments to feature them under your post, 100% of proceeds go to you, because there is no corporate entity.';
_l.aboutNewBlock3 = 'Bonus Program';
_l.aboutNewBlock4 = 'Bastyon has a limited time bonus program for video bloggers with 1,000 USD earnings for each 15k video views, 1000 invited users and 1,250 interactions. The bonus is paid in Bitcoin or PKOIN, depending on blogger preference. This is a limited time program.';
_l.aboutNewBlock5 = 'Decentralized Ads ';
_l.aboutNewBlock6 = 'A decentralized ad marketplace slated for release in December 2021 will allow advertisers to create posts and offer them to bloggers. A blogger can examine the ad post and repost if appropriate. All interactions on bloggers’ channel will go directly to blogger’s wallet, 100% of ad proceeds.';



_l.aboutOpen = 'Discover Bastyon';
_l.aboutOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.aboutOpen2 = 'Official Website';
_l.aboutOpen3 = 'Contact us';
_l.aboutOpen4 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';
_l.aboutOpen5 = 'Source Code';
_l.aboutOpen5_1 = 'Email us at:';

/////////////aboutYoutube
_l.aboutMainBoard = 'Bastyon - the best alternative to YouTube';
_l.aboutYoutubeMainDescription1 = 'Some people ask us:';
_l.aboutYoutubeMainDescription2 = '"Why should I use Bastyon?"';
_l.aboutYoutubeMainDescription3 = 'The real question is:';
_l.aboutYoutubeMainDescription4 = '"Why should you use YouTube?!"';
_l.aboutYoutubeMainDescription5 = 'YOUTUBE HAS BEEN BANNING AND DEMONETIZING THOUSANDS OF ACCOUNTS';
_l.aboutYoutubeMainDescription6 = 'PEOPLE WITH HUNDREDS OF THOUSANDS OF SUBSCRIBERS';
_l.aboutYoutubeMainDescription7 = 'EVEN WHEN NOT BANNED, AUTHORS ARE SHADOWBANNED OR DEMONETIZED';

_l.aboutYoutubeThreeColumn1 = 'Imagine: one day you have 20k, 100k or even 1M subscribers on your YouTube channel.';
_l.aboutYoutubeThreeColumn2 = 'The following day your account does not exist anymore.';
_l.aboutYoutubeThreeColumn3 = 'Banned, forever. No chance to appeal.';
_l.aboutYoutubeThreeColumn4 = 'You know, you have not only lost your subscribers.';
_l.aboutYoutubeThreeColumn5 = 'You have lost a constant passive income generated by the ADS on your videos.';
_l.aboutYoutubeThreeColumn6 = 'You have lost thousands of people that used to follow you and share your videos.';
_l.aboutYoutubeThreeColumn7 = "You have lost access to your videos if you didn't have a backup.";
_l.aboutYoutubeThreeColumn8 = 'The worst thing is: YouTube decisions are arbitrary and are typically final';
_l.aboutYoutubeThreeColumn9 = 'The worst thing is: YouTube decisions are typically final.';
_l.aboutYoutubeThreeColumn10 = "You have no way at all to get back your channel, subscribers and money. They're gone, forever.";
_l.aboutYoutubeThreeColumn11 = 'Move to Bastyon before it’s too late. We can import your videos without effort, and you can get paid 1,000 $ for each 15,000 views! (plus 1,250 interactions and 1000 invited users to your channel)';
_l.aboutYoutubeThreeColumn12 = 'What are you waiting for?!';

_l.aboutYoutubeH3Section = "Building a community of followers on YouTube is like building a home on a land you don't own.";

_l.aboutYoutubeImgAndText1 = "EARN WITH BASTYON NO DEMONETIZATION";
_l.aboutYoutubeImgAndText2 = 'Bastyon pays you to post videos and for each interaction (like/comment) that you get. Right now Bastyon has a bonus program that gives you 1,000 $ (in crypto currency) for each 15,000 views + 1,250 interactions + 1,000 invited users to your channel';
_l.aboutYoutubeImgAndText3 = 'And you can talk about "sensitive" topics. You will never be blocked or demonetized, if you do not post porn/nudity or illegal content that will be moderated by the community. In addition, if you bring your subscribers, you get referrals, too.'
_l.aboutYoutubeImgAndText4 = 'Free Speech Zone – Moderated by the Community ';
_l.aboutYoutubeImgAndText5 = 'On Bastyon you can talk about sensitive topics (and they are multiplying by the day): COVID, politics, climate change, first and second amendment. Community of users moderates Bastyon and the only topics that are blocked are porn/nudity and illicit content.';
_l.aboutYoutubeImgAndText6 = 'We believe in real freedom of speech and community of users does not ban or moderate content based on disagreement of opinions. And Bastyon is not owned by a corporation and is independent of the banking system.';
_l.aboutYoutubeImgAndText7 = 'PRIVATE AND SECURE';
_l.aboutYoutubeImgAndText8 = 'Bastyon does not collect any personal information. No name, no phone number, no IP address, not your identity. Your login to the Bastyon account is your private key, only you have control over it, even developers could not access or restore it, if lost.';
_l.aboutYoutubeImgAndText9 = 'NO CENSORSHIP';
_l.aboutYoutubeImgAndText10 = 'Bastyon will not censor your videos. Not even admins can block your account and ban you. Your account is YOURS and your subscribers will always be free to follow you.';
_l.aboutYoutubeImgAndText11 = 'Bastyon is based on the blockchain: there is no way, at all, to remove accounts and videos';
_l.aboutYoutubeImgAndText12 = 'Each video is registered on the blockchain and, for its nature, it cannot be removed. By anyone.';
_l.aboutYoutubeImgAndText13 = 'Each video you publish will be there forever. No one, really, can censor them. No one can remove your videos, subscribers and account.';
_l.aboutYoutubeImgAndText14 = 'Censorship Resistance ';
_l.aboutYoutubeImgAndText15 = "Bastyon runs on a network of nodes on users’ machines. Even if the main website Bastyon.com is blocked, the platform still runs normally through a desktop app. Because there is no corporation, nobody can impose censorship on Bastyon that users do not want.";
_l.aboutYoutubeImgAndText16 = 'Bastyon is a Protocol, Not a Company or a Social Network  ';
_l.aboutYoutubeImgAndText17 = 'Unlike Facebook and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon';

_l.aboutYoutubeSecondBoard1 = 'Bastyon - the best alternative to YouTube';
_l.aboutYoutubeSecondBoard2 = 'Your personal data is not sold to external companies';
_l.aboutYoutubeSecondBoard3 = 'No one can block your account or remove your videos and subscribers';
_l.aboutYoutubeSecondBoard4 = 'No personal info from users';
_l.aboutYoutubeSecondBoard5 = 'Access is always possible from any country and region of the world, even if the domain is not accessible.';
_l.aboutYoutubeSecondBoard6 = 'Keep your subscribers forever, they are yours';
_l.aboutYoutubeSecondBoard7 = 'Bastyon will not remove your subscribers, videos and money!';
_l.aboutYoutubeSecondBoard8 = 'You will never get DEMONETIZED and you keep 100% of ad proceeds. Freedom of speech is real.';
_l.aboutYoutubeSecondBoard9 = 'You will earn MORE to post your videos!';


_l.aboutYoutubeThirdBoard1 = 'Account ownership';
_l.aboutYoutubeThirdBoard2 = 'Property of YouTube.';
_l.aboutYoutubeThirdBoard3 = 'Your Private Key Belongs to You';
_l.aboutYoutubeThirdBoard4 = 'Censorship';
_l.aboutYoutubeThirdBoard5 = 'Yes, selective and arbitrary censorship';
_l.aboutYoutubeThirdBoard6 = 'Community moderates content with only a few topics such as porn/nudity and illicit content moderated';
_l.aboutYoutubeThirdBoard7 = 'Open Sourced Code';
_l.aboutYoutubeThirdBoard8 = 'NO.';
_l.aboutYoutubeThirdBoard9 = 'Yes, open to everyone';
_l.aboutYoutubeThirdBoard10 = 'Same Rules for Everyone';
_l.aboutYoutubeThirdBoard11 = 'Yes, based on open source code';
_l.aboutYoutubeThirdBoard12 = 'Monetization';
_l.aboutYoutubeThirdBoard13 = 'YouTube shares what it wants';
_l.aboutYoutubeThirdBoard14 = '100% to blogger';
_l.aboutYoutubeThirdBoard15 = 'What if Domain Blocked in Some Country?';
_l.aboutYoutubeThirdBoard16 = 'YouTube inaccessible';
_l.aboutYoutubeThirdBoard17 = 'Bastyon works directly with nodes';
_l.aboutYoutubeThirdBoard18 = 'Internal Cryptocurency for Monetization & Payments';
_l.aboutYoutubeThirdBoard19 = 'No';
_l.aboutYoutubeThirdBoard20 = 'Yes';
_l.aboutYoutubeThirdBoard21 = 'Ability to Send Crypto in Chat Messages';
_l.aboutYoutubeThirdBoard22 = 'No';
_l.aboutYoutubeThirdBoard23 = 'Yes';
_l.aboutYoutubeThirdBoard24 = 'Personal Information';
_l.aboutYoutubeThirdBoard25 = 'Name, phone number';
_l.aboutYoutubeThirdBoard26 = 'No';






_l.aboutYoutubeThirdBoard18 = 'Reporting videos';
_l.aboutYoutubeThirdBoard19 = 'YES, YouTube algorithms analyze videos and remove or block them automatically if they believe that they are against the policy. In addition YouTube can remove posts and ban users at its sole discretion.';
_l.aboutYoutubeThirdBoard20 = "YES, however only users with a high reputation can report post and a post is made \"invisible\" on the feed page (but remains available on the user's profile page) only if several tens of high reputation users report it (reports can be made only for racism, hate speech and porn/nudity).";
_l.aboutYoutubeThirdBoard21 = 'Hashtags to classify videos';
_l.aboutYoutubeThirdBoard22 = 'Videoa can be shared on multiple platforms';
_l.aboutYoutubeThirdBoard23 = 'Dictatorship bans';
_l.aboutYoutubeThirdBoard24 = 'Way too many!';
_l.aboutYoutubeThirdBoard25 = 'Bastyon pays you way more than YouTube!';
_l.aboutYoutubeThirdBoard26 = 'You can earn money with Bastyon.';
_l.aboutYoutubeThirdBoard27 = 'Bastyon uses its own Cryptocurrency:';
_l.aboutYoutubeThirdBoard28 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
_l.aboutYoutubeThirdBoard29 = 'Each time one of your videos gets 15k views, plus 1250 reactions and 1000 referral users, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
_l.aboutYoutubeThirdBoard30 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
_l.aboutYoutubeThirdBoard31 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';

_l.aboutYoutubeOpenBoard1 = 'Discover Bastyon';
_l.aboutYoutubeOpenBoard2 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.aboutYoutubeOpenBoard3 = 'Official Website';

_l.sourceCode = 'Source Code';

_l.aboutYoutubeDiscover1 = 'Join Bastyon Today and Own Your Destiny!';
_l.aboutYoutubeDiscover2 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

_l.aboutMainBoard = 'Bastyon, The best alternative to Twitter. Leave behind the bans and suspensions.';
_l.aboutMainBoard1 = 'Free, private and secure social network';

_l.aboutTwitterMainDescriptionText1 = 'Some people ask us:';
_l.aboutTwitterMainDescriptionText2 = '"Why should I use Bastyon?"';
_l.aboutTwitterMainDescriptionText3 = 'The real question is:';
_l.aboutTwitterMainDescriptionText4 = '"Why should you use Twitter?!"';
_l.aboutTwitterMainDescriptionText5 = 'TWITTER IS ACTING LIKE A DICTATORSHIP GOVERNMENT';
_l.aboutTwitterMainDescriptionText6 = 'Yes, we know that this is a strong statement.';
_l.aboutTwitterMainDescriptionText7 = 'But unfortunately, this is what has been happening on Twitter.';

_l.aboutTwitterThreeColumn1 = 'Many, way too many accounts have been banned in the past few years. Some of them without any reason.';
_l.aboutTwitterThreeColumn2 = 'Others just because they were from a specific political side (conservative)';
_l.aboutTwitterThreeColumn3 = 'Here below you can find a short list of accounts that have been banned or suspended by Twitter, along with the reason.';
_l.aboutTwitterThreeColumn4 = 'You can make your own considerations: you can easily realize how Twitter has been banning people for several unspecified reasons, for simply saying that the leader of Talibans was pro-sharia, for supporting the "Occupy" movement without breaking any policy.';
_l.aboutTwitterThreeColumn5 = 'This is the kind of censorship that we do not want on Bastyon, and that is why the protocol was created in the first place';

_l.aboutTitterBannedAcc1 = "Building a community on Twitter is like building a home on a land you don't own.";
_l.aboutTitterBannedAcc2 = 'Click here to see the list of the accounts banned by Twitter in 2019';
_l.aboutTitterBannedAcc3 = 'Account';
_l.aboutTitterBannedAcc4 = 'Wikipedia';
_l.aboutTitterBannedAcc5 = 'Individual/account';
_l.aboutTitterBannedAcc6 = 'Description';
_l.aboutTitterBannedAcc7 = 'Date';
_l.aboutTitterBannedAcc8 = 'Duration';
_l.aboutTitterBannedAcc9 = 'Reason for suspension';
_l.aboutTitterBannedAcc10 = 'Followers at the time of suspension';
_l.aboutTitterBannedAcc11 = '“Darren Mills” ';
_l.aboutTitterBannedAcc12 = 'Russian-linked account ';
_l.aboutTitterBannedAcc13 = '43285';
_l.aboutTitterBannedAcc14 = 'Permanent';
_l.aboutTitterBannedAcc15 = 'Unmasked as a fictitious person operated by a Russian troll factory.';



_l.aboutTitterH3Section1 = 'Why Bastyon?';
_l.aboutTitterH3Section2 = 'NO GOVERNMENT CONTROL';
_l.aboutTitterH3Section3 = 'Bastyon runs on a network of nodes that no government can block or limit. Even if the main website Bastyon.com is made unaccessible or compromised, the platform still runs normally. A government cannot impose its censorship or limitations on Bastyon.';
_l.aboutTitterH3Section4 = 'PRIVATE AND SECURE';
_l.aboutTitterH3Section5 = 'Bastyon does not collect any personal information. No IP Address, no email, no phone number. We believe in real privacy protection and data security.';



_l.aboutTitterImgAndText1 = 'NO CENSORSHIP';
_l.aboutTitterImgAndText2 = 'Bastyon will not censor your posts and videos. Not even admins can block your account and ban you.';
_l.aboutTitterImgAndText3 = 'Unlike Twitter, Bastyon does not apply a dictatorship-like method to remove content and users. There is a loooong list of people that have been banned, temporarily or permanently, by Twitter for shallow reasons or for no apparent reason at all.';
_l.aboutTitterImgAndText4 = 'On Bastyon bans are simply impossible: it is based on the blockchain and no one has the power to cancel a block from it. Every post will always remain there. Even if an admin or a user wants to ban your posts, he will never be able to do so.';
_l.aboutTitterImgAndText5 = 'Censorship is banned by the technology itself. Even if one day Bastyon`s creators want to shut down the platform, the posts will always be there and the social network can be re-created again from the same point it was left.';
_l.aboutTitterImgAndText6 = 'NO COMPANY BEHIND BASTYON';
_l.aboutTitterImgAndText7 = 'Unlike Twitter and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon. No bans, no censorship.';
_l.aboutTitterImgAndText8 = 'Unlike Twitter...';
_l.aboutTitterImgAndText9 = 'You will never be blocked or banned for simply supporting your ideas, religions, movements without hurting other people.';
_l.aboutTitterImgAndText10 = 'No one can block your account or remove your posts';
_l.aboutTitterImgAndText11 = 'Privacy is complete and guaranteed';
_l.aboutTitterImgAndText12 = 'Access is always possible from any country and region of the world';
_l.aboutTitterImgAndText13 = 'Chat sessions are entirely private and encrypted and not even Bastyon can access them. Not even with a court warrant.';
_l.aboutTitterImgAndText14 = 'Your posts can be longer';



_l.aboutTitterTable1 = 'TWITTER';
_l.aboutTitterTable2 = 'BASTYON';
_l.aboutTitterTable3 = 'Account ownership';
_l.aboutTitterTable4 = 'Property of Twitter';
_l.aboutTitterTable5 = 'Your Private Key Belongs to You';
_l.aboutTitterTable6 = 'Your access to your audience';
_l.aboutTitterTable7 = 'Not all of your followers see your post, Facebook controls the proportion of the audience that sees it';
_l.aboutTitterTable8 = 'Every follower sees your post';
_l.aboutTitterTable9 = 'Censorship';
_l.aboutTitterTable10 = 'Yes, selective and arbitrary censorship, lots of shadowbanning';
_l.aboutTitterTable11 = 'Community moderates content with only a few topics such as porn/nudity and illicit content moderated';
_l.aboutTitterTable12 = 'Open Sourced Code ';
_l.aboutTitterTable13 = 'No';
_l.aboutTitterTable14 = 'Yes, open to everyone';
_l.aboutTitterTable15 = 'Same Rules for Everyone';
_l.aboutTitterTable16 = 'No';
_l.aboutTitterTable17 = 'Yes, based on open source code';
_l.aboutTitterTable18 = 'Monetization';
_l.aboutTitterTable19 = 'Twitter shares what it wants';
_l.aboutTitterTable20 = '100% to blogger through PKOIN';
_l.aboutTitterTable21 = 'What if Domain Blocked in Some Country?';
_l.aboutTitterTable22 = 'Twiter inaccessible';
_l.aboutTitterTable23 = 'Bastyon works directly with nodes';
_l.aboutTitterTable24 = 'Personal Messages';
_l.aboutTitterTable25 = 'Twitter can read every message';
_l.aboutTitterTable26 = 'Bastyon uses peer-to-peer encryption for 1-on-1 chats, nobody can read them';
_l.aboutTitterTable27 = 'Internal Cryptocurency for Monetization & Payments';
_l.aboutTitterTable28 = 'No';
_l.aboutTitterTable29 = 'Yes';
_l.aboutTitterTable30 = 'Ability to Send Crypto in Chat Messages';
_l.aboutTitterTable31 = 'No';
_l.aboutTitterTable32 = 'Yes';
_l.aboutTitterTable33 = 'Personal Information';
_l.aboutTitterTable34 = 'Name, phone number';
_l.aboutTitterTable35 = 'No';



_l.aboutTitterMainBoard31 = 'And there`s more! Bastyon pays you.';
_l.aboutTitterMainBoard32 = 'You can earn money with Bastyon.';
_l.aboutTitterMainBoard33 = 'Bastyon uses its own Cryptocurrency:';
_l.aboutTitterMainBoard34 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
_l.aboutTitterMainBoard35 = 'Each time one of your videos gets 15,000 views + 1,250 reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
_l.aboutTitterMainBoard36 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
_l.aboutTitterMainBoard37 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';


_l.aboutTitterOpen1 = 'Discover Bastyon';
_l.aboutTitterOpen2 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.aboutTitterOpen3 = 'Official Website';
_l.aboutTitterOpen4 = 'Source Code';
_l.aboutTitterOpen5 = 'Contact us';
_l.aboutTitterOpen6 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';


/////////////aboutFacebook
_l.aboutFbMainBoard = 'Bastyon - the best alternative to Facebook';
_l.aboutFbMainBoard1 = 'Social and financial protocol';

_l.aboutFbMainDesc = '"Bastyon is not an alternative to Facebook.';
_l.aboutFbMainDesc1 = 'Bastyon is the Anti-Facebook.';
_l.aboutFbMainDesc2 = '-- John Milton';


_l.aboutFbH3Section = 'Why Bastyon?';
_l.aboutFbH3Section1 = 'NO GOVERNMENT CONTROL';
_l.aboutFbH3Section2 = 'Bastyon runs on a network of nodes that no government can block or limit. Even if the main website Bastyon.com is made unaccessible or compromised, the platform still runs normally. A government cannot impose its censorship or limitations on Bastyon.';
_l.aboutFbH3Section3 = 'PRIVATE AND SECURE';
_l.aboutFbH3Section4 = 'Bastyon does not collect any personal information. No IP Address, no email, no phone number. We believe in real privacy protection and data security.';



_l.aboutFbImgAndText = 'NO CENSORSHIP';
_l.aboutFbImgAndText2 = 'Bastyon will not censor your posts and videos. Not even admins can block your account and ban you.';
_l.aboutFbImgAndText3 = 'Bastyon is based on the blockchain: there is no way, at all, to remove posts. Each post is registered on the blockchain and, for its nature, it cannot be removed. By anyone.';
_l.aboutFbImgAndText4 = 'NO COMPANY BEHIND BASTYON';
_l.aboutFbImgAndText5 = 'Unlike Facebook and the main Social Networks, there is no company behind Bastyon. It is an open source project. This means that there is no company that can control the contents posted on Bastyon. No bans, no censorship.';
_l.aboutFbImgAndText6 = 'Unlike Facebook...';
_l.aboutFbImgAndText7 = 'Your personal data is not sold to external companies';
_l.aboutFbImgAndText8 = 'No arbitrary censorship';
_l.aboutFbImgAndText9 = 'Does not take personal information';
_l.aboutFbImgAndText10 = 'No corporation behind it';
_l.aboutFbImgAndText11 = 'Chat sessions are entirely private and encrypted and not even Bastyon can access them.';
_l.aboutFbImgAndText12 = 'Mark Zuckerberg won’t bother you!';



_l.aboutFbTable = 'FACEBOOK';
_l.aboutFbTable1 = 'BASTYON';
_l.aboutFbTable2 = 'Account ownership';
_l.aboutFbTable3 = 'Property of Facebook ';
_l.aboutFbTable4 = 'Your Private Key Belongs to You';
_l.aboutFbTable5 = 'Your access to your audience';
_l.aboutFbTable6 = 'Not all of your followers see your post, Facebook controls the proportion of the audience that sees it';
_l.aboutFbTable7 = 'Every follower sees your post';
_l.aboutFbTable8 = 'Censorship';
_l.aboutFbTable9 = 'Yes, selective and arbitrary censorship';
_l.aboutFbTable10 = 'Community moderates content with only a few topics such as porn/nudity and illicit content moderated';
_l.aboutFbTable11 = 'Open Sourced Code ';
_l.aboutFbTable12 = 'No';
_l.aboutFbTable13 = 'Yes, open to everyone';
_l.aboutFbTable14 = 'Same Rules for Everyone';
_l.aboutFbTable15 = 'No';
_l.aboutFbTable16 = 'Yes, based on open source code';
_l.aboutFbTable17 = 'Monetization';
_l.aboutFbTable18 = 'Facebook shares what it wants';
_l.aboutFbTable19 = '100% to blogger through PKOIN';
_l.aboutFbTable20 = 'What if Domain Blocked in Some Country?';
_l.aboutFbTable21 = 'Facebook inaccessible';
_l.aboutFbTable22 = 'Bastyon works directly with nodes';
_l.aboutFbTable23 = 'Personal Messages';
_l.aboutFbTable24 = 'Facebook can read every message';
_l.aboutFbTable25 = 'Bastyon uses peer-to-peer encryption for 1-on-1 chats, nobody can read them';
_l.aboutFbTable26 = 'Mark Zuckerberg';
_l.aboutFbTable27 = 'Always besides you';
_l.aboutFbTable28 = 'NO!';
_l.aboutFbTable29 = 'Internal Cryptocurency for Monetization & Payments';
_l.aboutFbTable30 = 'No';
_l.aboutFbTable31 = 'Yes';
_l.aboutFbTable32 = 'Ability to Send Crypto in Chat Messages';
_l.aboutFbTable33 = 'No';
_l.aboutFbTable34 = 'Yes';
_l.aboutFbTable35 = 'Personal Information';
_l.aboutFbTable36 = 'Name, phone number';
_l.aboutFbTable37 = 'No';



_l.aboutFbMainBoard3 = 'And there`s more! Bastyon pays you.';
_l.aboutFbMainBoard31 = 'You can earn money with Bastyon.';
_l.aboutFbMainBoard32 = 'Bastyon uses its own Cryptocurrency: ';
_l.aboutFbMainBoard33 = 'Each time your posts and videos receive comments and likes, you get PKOIN.';
_l.aboutFbMainBoard34 = 'Each time one of your videos gets 15,000 views + 1,250 reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!!';
_l.aboutFbMainBoard34 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
_l.aboutFbMainBoard35 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';


_l.aboutFbOpen = 'Discover Bastyon';
_l.aboutFbOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.aboutFbOpen2 = 'Official Website';
_l.aboutFbOpen3 = 'Source Code';
_l.aboutFbOpen4 = 'Contact us';
_l.aboutFbOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';


/////aboutHIW

_l.aboutHowItWMainBoard = 'HOW DOES BASTYON RESIST CENSORSHIP?';
_l.aboutHowItWMainBoard1 = 'FREE, PRIVATE, SECURE AND WITHOUT CORPORATE CONTROL.';
_l.aboutHowItWMainBoard2 = 'ENJOY THE FRESH AIR OF BASTYON.';



_l.aboutHowItWMD = '"Bastyon is the Bitcoin of social networks."';



_l.aboutHowItWImgAndText = 'Blockchain based';
_l.aboutHowItWImgAndText1 = 'What is the blockchain?';
_l.aboutHowItWImgAndText2 = 'As Wikipedia mentions, “A blockchain is a growing list of records, called blocks, that are linked together using cryptography.';
_l.aboutHowItWImgAndText3 = 'It’s also described as a “trustless and fully decentralized peer-to-peer immutable data storage” that is spread over a network of participants often referred to as nodes. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.';
_l.aboutHowItWImgAndText4 = 'The timestamp proves that the transaction data existed when the block was published in order to get into its hash.';
_l.aboutHowItWImgAndText5 = 'As blocks each contain information about the block previous to it, they form a chain, with each additional block reinforcing the ones before it.';
_l.aboutHowItWImgAndText6 = 'Therefore, blockchains are resistant to modification of their data because once recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.”';
_l.aboutHowItWImgAndText7 = 'So, how does the blockchain  protects from censorship?';
_l.aboutHowItWImgAndText8 = 'From Bitcoins to Bastyon.';
_l.aboutHowItWImgAndText9 = 'The blockchain is the technology behind all the cryptocurrencies. Bitcoins, Ethereum, Dogecoins and so on are all powered by the Blockchain.';
_l.aboutHowItWImgAndText10 = 'The principle is simple: what happens on the blockchain, stays on the blockchain. Forever.';
_l.aboutHowItWImgAndText11 = 'All the existing blocks of the blockchain are immutable and permanent. ';
_l.aboutHowItWImgAndText12 = 'Think about cryptocurrency: when you send some Bitcoins (or parts of it) to someone, the transaction is registered on the blockchain.';
_l.aboutHowItWImgAndText13 = 'From that moment the transaction cannot be reverted, modified, changed, removed, suspended, edited in any of its parts. It is there and stays there forever. And you can explore the blocks on the blockchain to see all the transactions.';
_l.aboutHowItWImgAndText14 = 'Bastyon works EXACTLY the same way. Each post, each account, each video is recorded on the blockchain. And once there, it cannot be removed.';
_l.aboutHowItWImgAndText15 = 'Indeed, Bastyon works on a fork of the original Bitcoin blockchain.';
_l.aboutHowItWImgAndText16 = 'Censorship-resistant';
_l.aboutHowItWImgAndText17 = 'Not only the Blockchain.';
_l.aboutHowItWImgAndText18 = 'Bastyon is not owned by a corporation';
_l.aboutHowItWImgAndText19 = 'Bastyon is an open-source project';
_l.aboutHowItWImgAndText20 = 'Bastyon runs on a network of decentralized nodes, if you are using the Bastyon desktop app, it speaks directly to the nodes around the world';
_l.aboutHowItWImgAndText21 = 'In addition, even if a government wants to remove a post, it is technically impossible.';
_l.aboutHowItWImgAndText22 = 'Likewise, since it runs on a network of nodes, there is no way to limit the access to Bastyon. Even in the event of a government blocking access to https://bastyon.com, you will always be able to access it using the mobile or desktop app, which connects directly to the nodes.';
_l.aboutHowItWImgAndText23 = 'Privacy protection,';
_l.aboutHowItWImgAndText24 = 'for your security';
_l.aboutHowItWImgAndText25 = 'Bastyon does not know who you are.';
_l.aboutHowItWImgAndText26 = 'Bastyon DOES NOT collect any personal information.';
_l.aboutHowItWImgAndText27 = ' You can register without revealing your phone number (only email is required)';
_l.aboutHowItWImgAndText28 = 'Bastyon does not ask for your real name to protect dissent';
_l.aboutHowItWImgAndText29 = 'Bastyon does not collect IP addresses and does not track you';
_l.aboutHowItWImgAndText291 = 'Bastyon allows multiple accounts for different purposes';
_l.aboutHowItWImgAndText30 = 'Bastyon will never know who you are, unless you explicitly share your personal data.';
_l.aboutHowItWImgAndText31 = 'If you don’t share your data, no one, no company, no government, can know who you are.';


_l.aboutHowItWImgAndText51 = 'Why is Cryptocurrency Good for Freedom?';
_l.aboutHowItWImgAndText52 = 'Some people think that digital currency is a tool for enslavement. Ironically, many of those people are carrying bank cards with a microship in their pockets. Bank cards that track every purchase and tie directly to your identity. The reason cryptocurrency is good for freedom is that it is not tied to your identity. Both in Bitcoin and Pocketcoin, each user can create millions of addresses and change them as much as necessary.';



_l.HIVTable1 = 'Credit Cards';
_l.HIVTable2 = 'Cash';
_l.HIVTable3 = 'Cryptocurrency';
_l.HIVTable4 = 'Tied to your identity';
_l.HIVTable5 = 'Yes';
_l.HIVTable6 = 'No';
_l.HIVTable7 = 'No';
_l.HIVTable8 = 'Government controls money supply';
_l.HIVTable9 = 'Yes';
_l.HIVTable10 = 'Yes';
_l.HIVTable11 = 'No';
_l.HIVTable12 = 'Anonimity';
_l.HIVTable13 = 'Non-Anonymous';
_l.HIVTable14 = 'Anonymous';
_l.HIVTable15 = 'Pseudonymous';
_l.HIVTable16 = 'Easy to pay over large distances';
_l.HIVTable17 = 'Yes';
_l.HIVTable18 = 'No';
_l.HIVTable19 = 'Yes';
_l.HIVTable20 = 'Transparent, open to public';
_l.HIVTable21 = 'No';
_l.HIVTable22 = 'No';
_l.HIVTable23 = 'Yes';




_l.aboutHowItWImgAndText32 = 'And there`s more!';
_l.aboutHowItWImgAndText33 = 'Bastyon pays you';
_l.aboutHowItWImgAndText34 = 'You can earn money with Bastyon.';
_l.aboutHowItWImgAndText35 = 'Bastyon uses its own Cryptocurrency:';
_l.aboutHowItWImgAndText36 = 'Each time your posts receive comments and likes, you get PKOIN.';
_l.aboutHowItWImgAndText37 = 'Each time your video gets 15,000 views + 750 “5 stars” reactions, you get 1,000 $ in PKOIN (you can convert them in USD!). THIS IS A LIMITED TIME OFFER!!! ';
_l.aboutHowItWImgAndText38 = 'Each time someone joins Bastyon with your referral link, you get PKOIN.';
_l.aboutHowItWImgAndText39 = 'Contact us to learn more and to activate your account as “CREATOR” so that you can post unlimited videos and get paid!';
_l.aboutHowItWImgAndText40 = 'Next step: contact us to get your Bastyon account verified and to access the bonus program.';
_l.aboutHowItWImgAndText41 = 'Contact Us Now';


_l.aboutHowItWOpen = 'Discover Bastyon';
_l.aboutHowItWOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.aboutHowItWOpen2 = 'Official Website';
_l.aboutHowItWOpen3 = 'Source Code';
_l.aboutHowItWOpen4 = 'Contact us';
_l.aboutHowItWOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

//aboutContentCreator

_l.ContentCreatorsMainBoard = 'Great Bonus Program for Content Creators';
_l.ContentCreatorsMainBoard1 = '"There are many ways to earn money with Bastyon..."';


_l.ContentCreatorsImgAndText = 'Post your videos';
_l.ContentCreatorsImgAndText1 = 'Post your videos on Bastyon';
_l.ContentCreatorsImgAndText2 = '15,000 vides, 1500 reactions from different users and 1500 invited users to your channel';
_l.ContentCreatorsImgAndText3 = 'Earns you $1,000 paid in Bitcoin or PKOIN';
_l.ContentCreatorsImgAndText4 = 'Next step: contact us to get your Bastyon account verified and to access the bonus program.';
_l.ContentCreatorsImgAndText5 = 'Contact Us Now ';
_l.ContentCreatorsImgAndText6 = 'Invite your followers';
_l.ContentCreatorsImgAndText7 = 'Share your personal referral link';
_l.ContentCreatorsImgAndText8 = 'Invite your followers from other platforms (Youtube, Instagram, Facebook, Twitter...)';
_l.ContentCreatorsImgAndText9 = 'Earn from the posts of your followers!';
_l.ContentCreatorsImgAndText10 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
_l.ContentCreatorsImgAndText11 = 'Contact Us Now ';
_l.ContentCreatorsImgAndText12 = 'Earn from every post';
_l.ContentCreatorsImgAndText13 = 'Each time your post gets a like or a comment, you receive a small reward';
_l.ContentCreatorsImgAndText14 = 'The more you post, the more your earn';
_l.ContentCreatorsImgAndText15 = 'The more followers you have, the more your earn';
_l.ContentCreatorsImgAndText16 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
_l.ContentCreatorsImgAndText17 = 'Contact Us Now';
_l.ContentCreatorsImgAndText18 = 'Earn with Decentralized Ads';
_l.ContentCreatorsImgAndText19 = 'Ads comes to you through Bastyon Ad Marketplace';
_l.ContentCreatorsImgAndText20 = 'You can choose which ads to repost to your channel';
_l.ContentCreatorsImgAndText21 = '100% of ad proceeds from interactions to go your wallet';
_l.ContentCreatorsImgAndText22 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
_l.ContentCreatorsImgAndText23 = 'Contact Us Now';
_l.ContentCreatorsImgAndText24 = 'Earn with Featured Comments';
_l.ContentCreatorsImgAndText25 = 'Your followers can attach PKOIN to comments';
_l.ContentCreatorsImgAndText26 = 'Comments with PKOIN are featured under your post';
_l.ContentCreatorsImgAndText27 = 'You can mention comments on air encouraging users to add PKOIN';
_l.ContentCreatorsImgAndText28 = 'Next step: contact us to get your "Verified" badge and to access the bonus program.';
_l.ContentCreatorsImgAndText29 = 'Contact Us Now';



_l.ContentCreatorsOpen = 'Discover Bastyon';
_l.ContentCreatorsOpen1 = 'You can use Bastyon from your browser or dowload the mobile and desktop app.';
_l.ContentCreatorsOpen2 = 'Official Website';
_l.ContentCreatorsOpen3 = 'Source Code';
_l.ContentCreatorsOpen4 = 'Contact us';
_l.ContentCreatorsOpen5 = 'Send us a message if you need help or if you are a content creator, blogger, influencer and would like to unlock your bonus and verify your profile!';

///about menu
_l.contentCreators = 'For content creators';
_l.howItWorks = 'How it works';
_l.insteadOf = 'Instead of';
_l.alternativeTo = 'Alternative to...';


_l.pkoin_commerce_tag_share_error = 'The "pkoin_commerce" tag can only be used as a separate tag. A post with this tag cannot contain videos or images'

_l.pkoin_commerce_info = 'Any peer-to-peer PKOIN transactions are not moderatred and at your own risk.'


_l.buyforcrypto = 'Buy for crypto'
_l.buywithcreditcard = 'Buy with credit card'
_l.buylogo = 'Buy Pocketcoin (PKOIN)'

_l.comment = 'Comment';
_l.sendToAuthor = 'Send to author';
_l.pkoinComment = 'PKOIN comment';
_l.liftUpThePost = 'Lift up the post';

_l.buypeertopeer = 'Buy Peer-to-Peer'

_l.commentsOrder = 'Default sorting of comments';
_l.commentsOrderPlaceholder = 'Choose sorting';

_l.comments_interesting = 'Interesting at first'
_l.comments_timeup = 'New first'
_l.comments_time = 'Old first'
_l.comments_next = 'Show next'

_l.create = 'Create'
_l.drafts = 'Drafts'

_l.repostyourown = 'You cannot repost your own post'


_l.reachedlimits = 'You reached your daily limit of actions. To increase your limit you need to have a valid reputation.'

_l.closestreachedlimits = 'You are close to hitting your daily action limit. To increase your limit you need to have a valid reputation.'


_l.sendUserStatistics = 'Send anonimous report of errors to Bastyon Team'
_l.captionUserStats = 'Statistics'

_l.editarticledraft = 'Edit article Draft'
_l.deletearticledraft = 'Delete article Draft'
_l.previewarticledraft = 'View article Draft'
_l.deletedraftquestion = 'Are you sure you want to delete the draft article? Recovery is impossible'
_l.publishquestion = 'Are you sure you want to public this article?'

_l.etc = 'And so on...'
_l.openlinkssettings = 'Do not open links in the desktop application'
_l.nametaken = 'This username is taken in Bastyon'

_l.accountnotfound = 'We could not find your account on the blockchain. Perhaps the registration process was not completed, or there is no Internet connection'


_l.name20symbols = "The name length can't be more than 20 symbols"
_l.namereservedpn = 'To avoid user confusion using Pocketnet in name is reserved'
_l.namereservedbn = 'To avoid user confusion using Bastyon in name is reserved'

_l.photohassizegreater = function(v){
    return "Your photo has size greater than "+v+"MB. Please upload a photo under "+v+"MB in size."
}
_l.invalidformat = "Invalid format of picture. Only png and jpeg are allowed"
_l.downloadDesctApp = "Download Bastyon for desktop"
_l.downloadMobileApp = "Install Mobile Application"


_l.easyNode_e10000 = "Node"
_l.easyNode_e10001 = "Download and install node"
_l.easyNode_e10002 = "Bastyon Node"
_l.easyNode_e10003 = "Loading"
_l.easyNode_e10004 = "Node Installing"
_l.easyNode_e10005 = "Node Removing"
_l.easyNode_e10006 = "System Requirements"
_l.easyNode_e10007 = "Node control is not yet available for your operating system"
_l.easyNode_e10008 = "Synchronization"
_l.easyNode_e10009 = "Configuration"
_l.easyNode_e10010 = "Enabled"
_l.easyNode_e10011 = "Daemon Path"
_l.easyNode_e10012 = "Data Path"
_l.easyNode_e10013 = "Set Paths to Default"
_l.easyNode_e10014 = "To Default"
_l.easyNode_e10015 = "Update Node"
_l.easyNode_e10016 = "No Updates Available"
_l.easyNode_e10017 = "Delete"
_l.easyNode_e10018 = "Delete Daemon"
_l.easyNode_e10019 = "Delete Daemon and Data"
_l.easyNode_e10020 = "Wallet"
_l.easyNode_e10021 = "Status"
_l.easyNode_e10022 = "Requesting..."
_l.easyNode_e10023 = "Staking"
_l.easyNode_e10024 = "Node can't stake now. Add at least 50 PKOIN or wait for 60 minutes to activate coins"
_l.easyNode_e10025 = "Balance"
_l.easyNode_e10026 = "Control"
_l.easyNode_e10027 = "Deposit"
_l.easyNode_e10028 = "Withdraw"
_l.easyNode_e10029 = "Export Wallet"
_l.easyNode_e10030 = "Import Wallet"
_l.easyNode_e10031 = "Active"
_l.easyNode_e10032 = "Version"
_l.easyNode_e10033 = "Chain"
_l.easyNode_e10034 = "Description"
_l.easyNode_e10035 = "Height"
_l.easyNode_e10036 = "Less than an hour left"
_l.easyNode_e10037 = function(v) { return v + " hour(s) remaining" }
_l.easyNode_e10038 = "Block Hash"
_l.easyNode_e10039 = "Disable Node"
_l.easyNode_e10040 = "Enable Node"
_l.easyNode_e10041 = "Your wallet saved to"
_l.easyNode_e10042 = "Your wallet imported"
_l.easyNode_e10043 = "Your new node address"
_l.easyNode_e10044 = "Input Address and Amount for transfer PKOIN"
_l.easyNode_e10045 = "Destination Address"
_l.easyNode_e10046 = "Amount"
_l.easyNode_e10047 = "Invalid arguments"
_l.easyNode_e10048 = 'Invalid destination address'
_l.easyNode_e10049 = "Invalid amount"
_l.easyNode_e10050 = "Created transaction"
_l.easyNode_e10051 = "Do you really want to Stop Node and Update It?"
_l.easyNode_e10052 = "Make sure that you have made a backup of the wallet. Do you really want to delete the node and data directory?"
_l.easyNode_e10053 = "Do you really want to remove Node Daemon?"
_l.easyNode_e10054 = "Do you really want to install the node?"
_l.easyNode_e10055 = "Do you really want to set Data Path to Default?"
_l.easyNode_e10056 = "Gb free RAM"
_l.easyNode_e10058 = "Gb free disk space"
_l.easyNode_e10059 = "Mb/s internet speed"
_l.easyNode_e10060 = "SSD drive"
_l.easyNode_e10061 = "Your node is running. Close the app anyway?"
_l.easyNode_e10062 = "Node update is available. Download a new version?"
_l.easyNode_e10063 = "Node has been successfully updated"

_l.IHave = "I have";
_l.downloadNode = "Download Windows Desktop Node";
_l.months = "Months";
_l.year = "Year";
_l.stakingCalculator = "Staking Calculator - calculate how much you earn by putting Pocketcoin (PKOIN) into a node."
_l.easyNode_e2000 = "Defend Freedom of Speech & "
_l.easyNode_e2000_1 = "Earn"
_l.easyNode_e2000_2 = " Cryptocurrency"
_l.easyNode_e2001 = "What is Pocketcoin? Pocketcoin is a cryptocurrency that powers the decentralized social platform Bastyon. It is used to reward content creators, to boost posts and comments, to pay for ads and to unlock special features on Bastyon."
_l.easyNode_e2002 = "What is a  node?  A node is a computer owned by any user of Bastyon that supports the network and"
_l.easyNode_e2002_1 = " earns "
_l.easyNode_e2002_2 = "Pocketcoin. Your computer can be one of those nodes, assuming you have at least 50 GB of free SSD space and a decent internet connection.  Node has to lock some Pocketcoin in it to"
_l.easyNode_e2002_2_1 = " earn "
_l.easyNode_e2002_2_2 = "more Pocketcoin. That is called staking in cryptocurency."
_l.minPkoin = function (p){
	return  String(p) + " PKOIN Minimum"
}
_l.maxPkoin = function (p){
	return  String(p) + " PKOIN Maximum"
}

_l.topPosts = "Top posts";
_l.videop2psettings = "Use p2p when watching videos"

_l.art_validatetags = "Please add Tags For Your Longread"
_l.art_validatecover = "Please add Cover For Your Longread"
_l.art_validatecaption = "Please add Caption For Your Longread"
_l.art_validatecontent = "Please add Content of Your Longread"
_l.art_nothingchange = "No changes"
_l.art_newarticle = "New Longread"
_l.art_myarticles = "My Longreads"
_l.art_changecover = "Upload Cover"
_l.art_removecover = "Remove Cover"
_l.art_publish = "Publish"
_l.art_editing = "Editing"
_l.art_draftsaved = "Draft saved"
_l.art_gotolastdraft = "go to last draft"
_l.art_categoriestags = "Categories and tags"
_l.art_preview = "Preview"
_l.art_caption = "Caption of new Longread"
_l.art_placeholder = "Let`s write an awesome story!"

_l.art_newarticlecreation = "Create a new Longread"
_l.art_editingsh = "Editing a published Longread"
_l.art_saveedited = "Save"

_l.art_wordscount = "Number of words"
_l.art_volumepercent = "Article size limit"
_l.art_goback = "Come back"

_l.downloadingUpdate = "Downloading the update"
_l.hasnotupdates = "No updates available"
_l.cantmanageupdate = "Unable to manage update"

_l.updateapplication = "Update Application"
_l.applicationversion = "Application version"
_l.installedusinggps = "The application was not installed using Google Play."

_l.downloadplaystore = "Google Play Download"
_l.downloadgithub = "Download APK"

_l.empty = "Empty"

_l.reputation = "Reputation";
_l.subscriptions = "Subscriptions";
_l.tothetop = "To the top"
_l.menu = "Menu"

_l.donotshowagain = "Do not show again"


_l.postby = "Post by"
_l.continueon = "Сontinue on"
_l.bestwishes = "Best,"

_l.ratings123 = "Only users with high reputation at least 10 publications in the feed can give 1, 2, 3 star ratings, make comments, give negative ratings on comments. This is done to protect authors, because Bastyon does NOT require any personal information for registration."

_l.ratingss3 = "Only users with high reputation can give 1, 2, 3 star ratings. This is done to protect authors, because Bastyon does NOT require any personal information for registration."

_l.clearfilters = "Clear filters"
_l.clearcategories = "Do you really want to clear category filters?"
_l.cleartags = "Do you really want to clear tags filters?"
_l.fromsh = "From"

_l.hodoiearnmore = "How do I earn more Pocketcoin?"


_l.removeaddress = "Do you really want to remove this address from this device?"
_l.wanttoseekey = "Do you really want to see your private key?"
_l.seeprivatekey = "See Private Key"
_l.max5acc = "You have reached a maximum of 5 accounts. No more can be added"


_l.longreads = "Long Reads"
_l.readarticle = "Read"

_l.filters = "Filters"
_l.dataenteredincorrectly = "Data entered incorrectly"

_l.lloadprevwithtags = "Refresh Feed"

_l.newRepost = "Make repost"
_l.whatsnewrepost = "Your commentary"

_l.art_goback = "Come back"

_l.writesupport = "Write to support"
_l.submitapplication = "Submit your application"

_l.submitapplicationVideo = "Request PKOIN for video"
_l.submitapplicationVideoSmall = "Send & request PKOIN"

_l.videobloggerRequest = "If you are a blogger with an established audience, you can get a gift of PKOIN to load video. Click the button below if you are a blogger:"


_l.videobloggerRequest_pl1 = "Link to existing channel 1"
_l.videobloggerRequest_pl2 = "Link to existing channel 2"
_l.videobloggerRequest_pl3 = "Link to existing channel 3"

_l.videobloggerRequest_pl_notes = "Notes: any additional information"
_l.videobloggerRequest_pl_email = "Contact email"

_l.videobloggerRequest_caption = "Fill out this form to receive PKOIN"

_l.videobloggerRequest_er_link = "Provide at least one link to an existing channel"
_l.videobloggerRequest_er_info = "Additional information required"
_l.videobloggerRequest_er_email = "Leave an email for feedback"

_l.videobloggerRequest_submitted = "Thank you for contacting us, we will review your application"

_l.canuseipsetting = "Allow connection via ip over http directly. Insecure connection"

_l.optimizationtip = function(v){
    return v + ' hidden viewed posts'
}

_l.optimizationtip_show = "Show"

_l.thankTheAuthor = 'Thank the author';

_l.encourageAuthor = "Encourage author";

_l.gotoProfile2 = "Go to Profile";

_l.countviews = "Views";
_l.countview = "View";

_l.popup_applications_header = "Important! Please download Bastyon Application";

_l.popup_applications_feature_1 = "Desktop application is the most censorship resistant way to use Bastyon";
_l.popup_applications_feature_2 = "Desktop application doesn't depend on bastyon.com";
_l.popup_applications_feature_3 = "Desktop is like a built-in VPN";

_l.popup_applications_button = " Download here";
_l.norecommendedvideos = "No recommended videos found";

_l.boosted = "Boosted";


_l.probability = "Probability";

_l.probabilitytext = function(lang){
	return "Probability that a post will appear among the first <b>30</b> posts in the feed by language <b>"+lang+"</b> for approximately <b>300</b> minutes"
};

_l.probabilitytexterror = "Unable to calculate promotion probability";

_l.image = "Image";
_l.file = "File";

_l.othervideos = "Other videos";

_l.starssendcomments = "Leave a comment for the author";
_l.starssendcommentn = "Leave a comment for the author";
_l.starssendcommentp = "Leave a comment for the author";

_l.savevideo = "Download video";

_l.useanimations = "Enable animations";

_l.welcomecaption1 = "Bastyon of Free Speech";
_l.welcomecaption2 = "Read Content Banned by Big Tech";
_l.welcomecaption3 = "Chat privately with friends - no SIM card";



_l.shareexternal = "Another window is open";
_l.shareexternaluploadpeertube = "Video upload window open";

_l.removeimageswhenvideo = "The images attached to the post will be deleted if you continue to upload the video. Go to uploading video?";


_l.lowstar1 = "Bastyon team is implementing a temporary moratorium on 1 and 2 star ratings, except prohibited content. Prohibited content is:"
_l.lowstar_reason_1 = "Erotic/Porn"
_l.lowstar_reason_2 = "Child exploitation"
_l.lowstar_reason_3 = "Direct threat of violence"
_l.lowstar_reason_4 = "Illegal narcotics"
_l.lowstar2 = "Please do not use 1 and 2 star ratings for other reasons. After the new moderation is released in mid. May you will be able to use low ratings for other reasons"
_l.lowstaragree = "I confirm that this post contains one of four types of prohibited content"

_l.usetor = "Connection via Tor network"

_l.videotranscodingdelayedpost = "This video is being processed and will be posted as soon as the transcoding process ends. Please, do not close the tab untill then."

_l.postInRelay = "This post is being processed before publishing to blockchain"


_l.continuesubscribefeedCaption = "Would you like to continue seeing posts from the people you follow?"
_l.continuesubscribefeedButton = "Continue in the subscription feed"

_l['dust (code 64)'] = "You are trying to send an amount too small, it cannot be done"


_l.videoNameIsIncorrectShort = "Video name should be at least 3 characters long"
_l.videoNameIsIncorrectLong = "Video name should be no more than 120 characters long"

_l.androidPopupTitle = "Get uncensored information in Bastyon mobile app"
_l.androidPopupAgree = "Switch to the app"
_l.androidPopupDisagree = "Not now"

_l.desktopPopupTitle = "Get uncensored information in Bastyon desktop app"
_l.desktopPopupAgree = "Download the app"
_l.desktopPopupDisagree = "Not now"


_l.recommended = 'Recommended'

_l.removeaccount = 'Remove Account'
_l.removeAccountQuestion = 'Are you sure you want to permanently delete your account? This action cannot be undone.'
_l.removeAccountYes = 'Yes, remove account'

_l.removeAccount_prepare = 'Preparing'

_l.removeAccount_removePeertube = 'Deleting data from video servers'
_l.removeAccount_removeMatrix = 'Deleting data from the chat server'
_l.removeAccount_removeBastyon = 'Removing an account from the blockchain'
_l.removeAccount_finish = 'Success'
_l.removeAccount_success = 'Deleting your account was successful. Within 10 minutes, the procedure should be completed completely.'


_l.removeAccount_notprepared = 'Account not found on the blockchain, may need to wait a while'
_l.removeAccount_balance = 'A situation has occurred in which it is impossible to delete an account. In order to perform an action, you must have a minimum balance of PKOIN'


_l.removeAccount_undefinedError = 'An unexpected error occurred while deleting your account, please try restarting the app and performing the action again'

_l.deletedAccount_temp = "Account is in the process of being deleted"
_l.deletedAccount_deleted = "Account deleted"

_l.utipdeleted = "Your Account Deleted. You can use only wallet"
_l.applydonate = "Apply"

_l.imagegallery = "Image gallery"
_l.useselected = "Use selected"
_l.pkoindisabledisclaimer = 'In the application, you can only receive money for a crypto wallet, but you will not be able to send it'

_l.txbase_total = _l.txbase_unspents = _l.txbase_err_money = 'Insufficient funds for the transfer, taking into account the commission'


_l.recommendations_menu_caption = 'Recommendation Information'

_l.recommendations_caption_tags = 'Tag based recommendation'
_l.recommendations_caption_users = 'Recommendations based on information about interactions with other users'


_l.recommendations_caption_disclamer = "Statistics are stored only on your device, are not sent to the Bastyon servers, are not transferred to third parties"

_l.recommendations_tags_table_caption = 'Tag, probability, points, last interaction date'
_l.recommendations_tags_completed_caption = 'Requested recommendations'

_l.recommendations_tags_anotherShares = 'Other publications recommended by these tags'

_l.profanity_tag = 'profanity'
_l.addAccessToLibrary = 'Grant access to the gallery'
_l.cameranotavailable = 'Camera not available'

_l.rtip4 = 'This key is your password! Do not lose it.'

_l.removecategory = 'Remove'
_l.removecategoryQestion = 'Do you really want to remove this category?'


_l.searchbytext = "Search by text:"
_l.searchbytags = "Search by tags:"

_l.boost_c1 = 'Advertise with PKOIN & get leads for your crypto project today'
_l.boost_c2 = 'Web 2.0'
_l.boost_c3 = 'Bastyon Web 3.0'
_l.boost_c4 = 'Are you trying to be heard on the internet?'
_l.boost_c5 = 'Would you like to get your content or product in front of a new dynamic audience for less than major ad networks?'
_l.boost_c6 = 'Bastyon, the blockchain social network has just released a way of promoting content, including videos.'
_l.boost_c7 = 'The cost of an impression on Bastyon is many times lower than on traditional ad networks.'
_l.boost_c8 = 'Boosting posts on Bastyon is very simple, you just need some Pocketcoin, a native cryptocurrency of Bastyon. Click Boost below the post and enter the amount and your post is moved to the top!'
_l.boost_c9 = 'Bastyon has millions of visitors and growing. Your content will be seen!'
_l.boost_c10 = 'If you are an aspiring author who wants to increase your audience, Bastyon boosting of posts can work for you!'
_l.boost_c11 = 'If you are an advertiser looking for a platform to promote your product, you can quickly get your ad up and running and get conversions.'
_l.boost_c12 = 'Open source'
_l.boost_c13 = 'Upload your videos'
_l.boost_c14 = 'Earn with Bastyon'
_l.boost_c15 = 'Privacy protection'
_l.boost_c16 = 'Bitcoin of social media'
_l.boost_c17 = 'Censorship resistant'
_l.boost_c18 = 'Buying PKOIN peer-to-peer'
_l.boost_c19 = 'To buy a Pocketcoin "from hand to hand", you need to sort the news feed by category "PKOIN/peer-to-peer"'

_l.boost_c20 = 'Find Your Audience'
_l.boost_c21 = 'Profitable Advertising on the Fast-Growing Blockchain Social Network'
_l.boost_c22 = 'Advertising for Pocketcoin - Cost-Effective Coverage'
_l.boost_c23 = 'Are you trying to be heard on the internet?'
_l.boost_c24 = 'Would you like to get your content or product in front of a new dynamic audience for less than major ad networks?'
_l.boost_c25 = 'Bastyon, the blockchain social network has just released a way of promoting content, including videos.'
_l.boost_c26 = 'The cost of an impression on Bastyon is many times lower than on traditional ad networks.'
_l.boost_c27 = 'Boosting posts on Bastyon is very simple, you just need some Pocketcoin, a native cryptocurrency of Bastyon. Click Boost below the post and enter the amount and your post is moved to the top!'
_l.boost_c28 = 'Bastyon has millions of visitors and growing. Your content will be seen!'
_l.boost_c29 = 'If you are an aspiring author who wants to increase your audience, Bastyon boosting of posts can work for you!'
_l.boost_c30 = 'If you are an advertiser looking for a platform to promote your product, you can quickly get your ad up and running and get conversions.'
_l.boost_c31 = 'Where to buy PKOIN?'
_l.boost_c32 = 'PKOIN can be purchased on the following sites.'
_l.boost_c33 = '- here you can buy PKOIN for other cryptocurrencies.'
_l.boost_c45 = ' - here you can purchase PKOIN using a bank card.'
_l.boost_c34 = 'Buying PKOIN from hand to hand on Bastyon'
_l.boost_c35 = 'PKOIN purchase is possible from other Bastyon users. You can agree on the terms of purchase/sale in personal correspondence with the seller / buyer, whom you can find in the news feed under the category "PKOIN/peer-to-peer"'
_l.boost_c36 = 'How do I start advertising?'
_l.boost_c37 = 'Launching ads on Bastion is very simple. To do this, you need:'
_l.boost_c38 = 'Prepare an advertising publication (video, post or article)'
_l.boost_c39 = 'Buy PKOIN'
_l.boost_c40 = 'Deposit the required amount of PKOIN to start advertising'
_l.boost_c41 = 'Click the lightning bolt icon in the lower right corner of the selected post:'
_l.boost_c42 = 'Enter PKOIN in the "Amount" field and click "Send":'
_l.boost_c43 = 'Congratulations! You have launched an advertisement on Bastyon!'
_l.boost_c44 = 'Learn more about ads on Bastyon'
_l.boost_c44_subject = 'Hi, I would like to learn more about launching my ads on Bastyon.';

_l.reach = 'Reach'
_l.reachDescription = 'Average cost of thousand impressions (CPM) is 20 cents'


_l.gotopage = 'Go to page'

_l.saved = "Saved"
_l.savePost = "Save post"
_l.postsaved = "Post saved"
_l.deleteSavedPost = "Delete saved post"
_l.doYouDownloadVideo = "Do you want to download the video on your device ?"
_l.gotosaved2 = "Go to saved"
_l.yes = "Yes"
_l.no = "No"

_l.postedVideos = "Posted Videos"
_l.unPostedVideos = "Unposted Videos"
_l.videoIsPosting = "Posting"
_l.noUnposted = "No Unposted Videos"

_l.sortByComments = "Comments";
_l.sortByRating = "Number of ratings";

_l.noPosted = "No posted Videos"
_l.unpostedFooter = "Unposted videos are deleted from the server after 3-weeks of waiting"

_l.diagnosticsPage = "Diagnostics";
_l.startDiagnose = "Run Diagnostics";
_l.videoServerName = "Server URL";
_l.videoServerReachable = "Reachability";
_l.serversTestingProgress = "Progress of Diagnosing:";
_l.videoServerVideo = "Video Info";
_l.goToDiagnose = "Go to Diagnostics";
_l.connectingTo = "Connecting to";
_l.earnings = "Total earnings";



_l.authHeading = "Auth";

_l.terms = 'Terms and Conditions for Bastyon';
_l.daccept = "Accept and continue";

_l.sendToChat = "Send message to chat";
_l.createPost = "Create and publish the post";


