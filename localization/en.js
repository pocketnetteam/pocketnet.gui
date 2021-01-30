if(typeof loclib == 'undefined' || !loclib)
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
____loclib.removepaste = 'We removed the paste option for this input.'
____loclib.filedamaged = "File doesn't contain a valid private key"
____loclib.keysnotmatch = 'Private login key does not match'
____loclib.confirmkey = 'Type Your Private Login Key or Upload QR Code From Previous Step'
____loclib.successfullycopied = "Key was successfully copied"
____loclib.urlsuccesscopied = "Link was successfully copied"

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
____loclib.welcometopocketnet = "Welcome to Pocketnet";	
____loclib.continue = "continue";	

//user page

____loclib.rstate = "Reputation";	
____loclib.rprofile = "Profile";	
____loclib.rsettings = "Settings";	
____loclib.rwallet = 'Wallet';	
____loclib.raccounts = 'Accounts';	
____loclib.rsystem = 'System';
____loclib.rconnection = 'Connection';
____loclib.pnetAddress = 'Pocketnet Address';	
____loclib.profile = 'Profile';	
____loclib.signout = 'Sign out';

//send

____loclib.postlabel = "Donation for post";	
____loclib.donationlabel = "Donation";	
____loclib.donationwel = "If you want to thank the author you can use a Pocketnet transaction";
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
____loclib.wssuccessfully = "Transaction sent successfully";
____loclib.wscalculatefees = 'CALCULATE FEES';
____loclib.wsaddressnotv = "Address is not valid";

//user profile
____loclib.uaddaddressdona = "Add address For Donations";
____loclib.uaddaddressdonaplace = "Enter Address";
____loclib.uchangeicon = "Upload Profile Image";
____loclib.utip1 = "You must create name & avatar on blockchain before using Pocketnet";
____loclib.utip2 = "You have only one step left";
____loclib.upicset = "Set Profile Icon";
____loclib.upic = "Profile Icon";
____loclib.uuserinfo = "User Information";
____loclib.usave = "Save";
____loclib.ucancel = "Cancel";
____loclib.uwaitb = "Wait for confirmation to save information ";
____loclib.uchanges = "There are no changes";
____loclib.uchangesvalid = "You need to upload profile image & create username";
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
____loclib.ssc = "Stars count";
____loclib.ccc = "Comments count";
____loclib.crc = "Comment Rate count";
____loclib.stp = "Trial period";
____loclib.srep = "Reputation";

//accounts
____loclib.aaddedacc = "Added Accounts";
____loclib.acure = "Current";
____loclib.aaddacc = "Add Account";
____loclib.ascheduler = "Scheduler";
____loclib.aused = "This address is already use in another addresses pool";


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
____loclib.anofollowers = "This user has no followers";
____loclib.aynofollowers = "You have no followers";
____loclib.anofollowing = "This user is not following anyone";
____loclib.aynofollowing = "You are not following anyone";

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
____loclib.newShare = "New Post";
____loclib.firstShare = "Share Your First Post in Pocketnet";
____loclib.scaption = "Caption";
____loclib.whatsnew = "What's new?";
____loclib.saddlink = "Add link to external site or video";
____loclib.saddimages = "Add Images to Post";
____loclib.sarticle = "To write an article";
____loclib.stelegram = "Send to telegram"
____loclib.stimes = "Remove post"


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
return "Congratulations, you have won " + v + " Pocketcoin for your latest activity!"
}
____loclib.coinbaseSuccesspost = function(v){
return "Congratulations, you have won " + v + " Pocketcoin for your latest posts!"
}
____loclib.coinbaseSuccesscomment = function(v){
return "Congratulations, you have won " + v + " Pocketcoin for your latest comments!"
}
____loclib.userSent = function(v){
return "sent <b>" + v + " PKOIN</b> to you"
}




____loclib.refferalUserMessage = "Congrats! You rescued someone from the censored web. Some coins are on their way!"

____loclib.subscribeUserMessage = "followed you"
____loclib.unsubscribeUserMessage = "unfollowed you"
____loclib.gotoprofileMessage = "go to profile"
____loclib.upvoteShareMessage = "upvoted your post"

____loclib.upvoteCommentMessage = " liked your comment"

// Errors

____loclib.error = "Error";
____loclib.checkScoreError = "You must fill in required profile info before using Pocketnet. Do you want to do it now?";
____loclib.checkScoreErrorLight = "Account is not activated";
____loclib.timestamperror = "Time in application and in node do not match";

// Error Page 404
____loclib.e404 = "ERROR 404";	
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



____loclib.waitConf = "You have to wait for your previous transaction to clear in the blockchain";
____loclib.postWaitConf = "Post is waiting for a blockchain confirmation";



// notifications

____loclib.ntnow = "Now"
____loclib.ntlasthour = "This hour"
____loclib.nttoday = "Today"
____loclib.ntmounth = "This month"
____loclib.ntearlier = "Earlier"


____loclib.nodeWalletAdd = 'Adding an address may take some time. Continue?'
____loclib.nodeEnableNoteHeader = 'Note'
____loclib.nodeEnableNote = 'That turning on a node may take up to 5GB of RAM. Make sure you have enough. Happy staking!'


/// 1301

____loclib.address = "Address"
____loclib.privatekey = "Private Key"
____loclib.qrcode = "QR Code"
____loclib.addaccount = "Add Account"
____loclib.entermnimo = "Enter Mnemonic Phrase or Private Key"
____loclib.add = "Add"
____loclib.e13011 = "You will now continue your registration after you install Pocketnet Desktop."
____loclib.e13012 = "If Pocketnet for Windows did not start downloading, please click here to install it."
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
____loclib.e13023 = "Do you really want to unblock user?"
____loclib.e13024 = "Your Private Login Key"
____loclib.e13025 = "Create a new account"
____loclib.e13026 = "Join Pocketnet - The Future of the Free Web"

____loclib.e13027 = "Stay Signed"
____loclib.e13028 = "You entered not valid private key"
____loclib.e13029 = "Message is empty"
____loclib.e13030 = "Comments have 1000 character limit per comment"
____loclib.e13031 = "Share this Comment"
____loclib.e13032 = "Do you really want to delete your comment?"
____loclib.e13033 = "Comment has been removed"
____loclib.e13034 = "Yes"
____loclib.e13035 = "No, cancel"
____loclib.hide = "Hide"
____loclib.e13036 = "Show previous comments"
____loclib.e13037 = "Replies"
____loclib.remove = "Remove"
____loclib.e13038 = "Comment Now & Earn Reputation"
____loclib.e13039 = "Comment Now & Earn Reputation"
____loclib.e13040 = "You do not have commenting priviliges"
____loclib.complain = "Complain"
____loclib.next = "Next"
____loclib.post = "Post"
____loclib.e13041 = "Pocketnet Connection"
____loclib.e13042 = "Pocketnet Proxy"

____loclib.e13043 = "Pocketnet Nodes"
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
____loclib.e13079 = "We have spent 14+ months in spare time from full time jobs bringing Pocketnet to people. In addition to time and effort, we have put in our own money to help launch the platform. Now we need the community to step up and help us with growth."
____loclib.e13080 = "How will the funds be used?"
____loclib.e13081 = "Funds will be used to purchase advertising and hire some specific subject matter experts to make Pocketnet even more secure. Current development team will not get any of these donations. Wherever possible, we will post here how we used the funds. "
____loclib.e13082 = "What you will get for your donation besides knowing you supported freedom:"
____loclib.e13083 = "As a sign of our gratitude for donation, you will receive a gift in some amount of Pocketcoin"
____loclib.e13084 = "Also, when we build group chat, you will be a member of a special group of donors that will have direct access to Pocketnet team, even as the platform grows"
____loclib.e13085 = "Link to your Pocketnet profile will be listed below driving more people to your posts (unless you ask us to not do that)"
____loclib.e13086 = "Support Decentralized Web Now"
____loclib.e13087 = "Bitcoin, Litecoin, Monero"

____loclib.e13088 = "Pocketnet members who donated to support Pocketnet"
____loclib.thankyou = "Thank you!"
____loclib.e13089 = "If you would like us to list your Pocketnet profile in the list of donors, please send us information about your donation"
____loclib.e13090 = "Add me to donors list"
____loclib.e13091 = "Or you can send us an email to"
____loclib.e13092 = "with your public key and amount."
____loclib.finish = "Finish"
____loclib.e13093 = "Please choose donation way"
____loclib.e13094 = "Something went wrong. Please reload page and try again (error: 0001)"
____loclib.e13095 = 'Thank you for supporting our work for freedom. We will make sure every penny counts.'
____loclib.e13096 = 'Please fill amount of donation'
____loclib.e13097 = "Something went wrong. Please reload page and try again (error: 0002)"
____loclib.e13098 = "Add link to external site or resource"
____loclib.e13099 = "Upload Images"
____loclib.e13100 = "Click here to select files for uploading"
____loclib.e13101 = "or drag & drop"
____loclib.e13102 = "Add link to external site"
____loclib.e13103 = "Url doesn't valid"
____loclib.e13104 = "Max 6 Images Allowed"
____loclib.e13105 = "Node management"
____loclib.e13106 = "Pocketnet Node"
____loclib.e13107 = "Node management may be carried out with Application"
____loclib.e13108 = "There isn't connection with Electron proxy interface"

____loclib.e13109 = "Please enter the words in the picture to receive Pocketcoin and continue registration"
____loclib.e13110 = "Enter words"
____loclib.next = "Next"
____loclib.refresh = "Refresh"
____loclib.e13111 = "Add your email to get the latest Pocketnet updates"
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
____loclib.e13120 = "Applications"
____loclib.e13121 = "There aren't Images Here"
____loclib.e13122 = "Latest Comments"

____loclib.e13123 = "Show more posts"
____loclib.e13124 = "More Awesome Pocketnet Posts!"
____loclib.e13125 = "Top posts section is empty!"
____loclib.e13126 = "Posts from people you follow will be shown here"
____loclib.e13127 = "Posts from people you follow will be shown here "
____loclib.e13128 = "Posts from people you follow will be shown here"
____loclib.registration = "Registration"
____loclib.editpost = "Edit Post"
____loclib.removepost = "Remove Post"


____loclib.reportpost = "Report Post"
____loclib.donate = "Donate"
____loclib.blockuser = "Block User"
____loclib.more = "More"
____loclib.showmore = "Show More"
____loclib.e13129 = "Attached images"
____loclib.e13130 = "Edited"
____loclib.e13131 = "You have blocked this User"
____loclib.e13132 = "rated"
____loclib.e13133 = "Share this"
____loclib.e13134 = "There aren't any results for this search string"
____loclib.e13135 = "User haven't private key"
____loclib.e13136 = "All Posts"
____loclib.e13137 = "Your Pocket"
____loclib.e13138 = "Top posts"
____loclib.e13139 = "SEARCH ON POCKETNET"
____loclib.e13140 = "SEARCH ON"
____loclib.notifications = "Notifications"
____loclib.showall = "Show all"
____loclib.e13141 = "You haven't notifications"

____loclib.recommendations = "Recommendations"
____loclib.e13142 = "I saved my key, do not remind me anymore"
____loclib.e13143 = "Important!"
____loclib.e13144 = "Copy Text"
____loclib.e13145 = "Save key on device"
____loclib.e13146 = "End of posts"
____loclib.e13147 = "Share this"
____loclib.e13148 = "Do yor really want to complain on this post?"
____loclib.e13149 = "user ratings"
____loclib.e13150 = "Post Rating"
____loclib.e13151 = 'Nobody rate this post'
____loclib.e13152 = "User scores"
____loclib.e13153 = "Skip and proceed to website"
____loclib.e13154 = "Your Login Information"
____loclib.e13155 = "To use Pocketnet you need to generate your private cryptographic key which replaces login plus password from centralized social networks."
____loclib.users = "Users"
____loclib.userstx = "Users"
____loclib.user = "User"
____loclib.postscount = "Posts count"
____loclib.about = "About"
____loclib.e13156 = "Next Results"
____loclib.posts = "Posts"
____loclib.e13157 = "Search by"
____loclib.e13158 = "hasn't any results"
____loclib.e13159 = "The search phrase is empty"
____loclib.repost = "Repost"
____loclib.e13160 = "Hello Pocketeers!"

____loclib.e13161 = "Add Tags For Your Post"
____loclib.e13162 = "You can enter less that 30 tags"
____loclib.e13163 = "There aren't changes in Post"
____loclib.e13164 = "Please add a few words to tell Pocketpeople about your link. What is it about? Why is it important? What is your opinion?"
____loclib.e13165 = 'Your link to video is invalid. Please load valid video URL.'
____loclib.e13166 = "You rescued"
____loclib.e13167 = "people from the censored web"
____loclib.e13168 = "Earn Pocketcoin for each signup through your link"
____loclib.e13169 = "Direct link"
____loclib.copy = "Copy"
____loclib.e13170 = "Include Pocketnet sign up call-to-action "
____loclib.more = "More"
____loclib.e13171 = "Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here"
____loclib.e13172 = "I want to share this from a decentralized blockchain platform Pocketnet with you. Hope you find it useful and if you sign up, both of us will get Pocketcoin cryptocurrency bonus!"
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
____loclib.e13190 = "Pocketnet theme"
____loclib.e13191 = "Set Theme"
____loclib.e13192 = "Level"
____loclib.e13193 = "BONUS"
____loclib.e13194 = "Reputation and Rewards"
____loclib.e13195 = "Limitations"
____loclib.e13196 = "It much take up"
____loclib.e13197 = "Recieve Pocketcoins"
____loclib.e13198 = "Approximate waiting time is"
____loclib.e13199 = "Join Pocketnet Now"

____loclib.e13200 = "Back To Pocketnet"
____loclib.e13201 = "JOIN BETA"
____loclib.e13202 = "Pocketnet beta test will start on Jan 24"
____loclib.e13203 = "Thank you for joining Pocketnet beta test email list. It is not required to use Pocketnet, however, we will use this email to send your surveys to improve the platform. Thank you for helping to shape the future of internet."
____loclib.e13204 = "Pocketnet Recieve Address"
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
____loclib.e13220 = 'Pocketcoins delivered'
____loclib.errorreload = "Something went wrong. Please reload page and try again"
____loclib.e13221 = "Do you really want to delete information about this deal? Deal can't be stop"
____loclib.e13222 = "Download Desktop App - this is the most censorship resistant way to use Pocketnet. Even if websites are shut down, desktop application will still run directly through the nodes."
____loclib.e13223 = "Download Pocketnet for Windows"
____loclib.e13224 = "Download Pocketnet for Linux"
____loclib.e13225 = "Pocketnet Node"
____loclib.e13226 = 'Download Node'
____loclib.e13227 = "Download Pocketnet Node for Windows"
____loclib.e13228 = "Download Pocketnet Node for Linux"
____loclib.e13229 = 'Invalid Private Key'
____loclib.e13230 = 'Undefined connection error'

____loclib.e13231 = "Connection lost"
____loclib.e13232 = "Unable to connect with node"
____loclib.e13233 = 'This comment was removed'
____loclib.e13234 = 'Opreturn error/41'
____loclib.e13235 = 'You cannot rate comment twice'
____loclib.e13236 = 'This comment was removed'
____loclib.e13237 = 'You cannot rate yourself'
____loclib.e13238 = 'Comment sending error. Please wait and try again/ 37'
____loclib.e13239 = 'Comment sending error/ 35'
____loclib.e13240 = 'The comment you are replying to has been deleted by the user'
____loclib.e13241 = 'This comment is too long, please break it up'
____loclib.e13242 = "You have been blocked by this person, you will be unable to comment on their posts"
____loclib.e13243 = "You have reached your limit of upvote comments in a 24 hour period"
____loclib.e13244 = "You have reached your limit of editing comments in a 24 hour period"
____loclib.e13245 = "You have reached your limit of sending comments in a 24 hour period"
____loclib.e13246 = "You are trying to edit someone else's post"
____loclib.e13247 = "You have reached your limit of editing 5 posts in a 24 hour period"
____loclib.e13248 = 'You can only edit once per blockchain block. Please wait a minute, then try again'
____loclib.e13249 = 'You cannot block yourself'
____loclib.e13250 = 'You have already blocked this user'
____loclib.e13251 = 'You have not blocked this user'
____loclib.e13252 = 'Transaction is malformed'
____loclib.e13253 = 'You cannot refer yourself'
____loclib.e13254 = 'This username is too long'
____loclib.e13255 = 'This username is already in use'
____loclib.e13256 = 'This post is too long, please break it up.'
____loclib.e13257 = 'Your Pocketnet reputation score does not allow for registering of complaints yet'
____loclib.e13258 = 'You have reached the limit of complaints in a 24 hour period'

____loclib.e13259 = 'Cannot complain about your own post'
____loclib.e13260 = 'You have already registered your complaint about this post'
____loclib.e13261 = "Save Key"
____loclib.e13262 = "Later"
____loclib.e13263 = "Subscribe and Turn On notifications from this user"
____loclib.e13264 = "Subscribe without notifications"
____loclib.e13265 = 'Your name is no longer available, please choose another one'
____loclib.e13266 = "White Theme"
____loclib.e13267 = "Dark Theme"
____loclib.e13268 = 'Coinstake win'
____loclib.e13269 = 'Transactions receive'
____loclib.e13270 = 'Upvotes receive'
____loclib.e13271 = 'Comment receive'
____loclib.e13272 = 'Answer receive'
____loclib.e13273 = 'New Followers'
____loclib.e13274 = 'Rescued Users'
____loclib.e13275 = 'Comment Score'
____loclib.e13276 = 'Show embed videos'
____loclib.e13277 = 'Autoplay videos'
____loclib.e13278 = 'Start Pocketnet Automatically'
____loclib.e13279 = 'Chat'
____loclib.e13280 = 'Tags'
____loclib.e13281 = 'Last Comments'
____loclib.e13282 = "Telegram bot token"
____loclib.e13283 = "Post from Telegram channel"
____loclib.e13284 = "Add bot into chat and select"
____loclib.e13285 = 'Ask before post from telegram'
____loclib.e13286 = 'Ask before send to telegram'
____loclib.e13287 = "Send to telegram channel"
____loclib.video = "Video"
____loclib.e13288 = "Main Page Vidgets"
____loclib.e13289 = "Integration with Telegram"

____loclib.system = "System"
____loclib.e13290 = "Would do you like to follow"
____loclib.e13291 = "Do you really want send message to Telegram?"
____loclib.send = "Send"
____loclib.e13292 = "You already have node on this host"
____loclib.e13293 = "Internal Error"
____loclib.e13294 = 'PGSQL Database Enable'
____loclib.e13295 = 'DB Host'
____loclib.e13296 = 'DB Port'
____loclib.e13297 = 'DB Max'
____loclib.e13298 = 'DB Idle Timeout, ms'
____loclib.e13298 = 'DB Name'
____loclib.e13300 = 'DB User'
____loclib.e13031 = 'DB Password'
____loclib.e13302 = 'Proxy server on'
____loclib.e13303 = 'Proxy https server port'
____loclib.e13304 = 'Proxy wss server port'
____loclib.e13305 = 'Server SSL Key, pem'
____loclib.e13306 = 'Server SSL Cert, pem'
____loclib.e13307 = 'Server SSL Passphrase'
____loclib.e13308 = 'Firebase admin SDK'
____loclib.e13309 = 'Your Crane Address'
____loclib.e13310 = 'Captcha Enable'
____loclib.e13311 = 'Ip limiter enable'
____loclib.e13312 = "Server"

____loclib.e13313 = "Data Base, PG sql"
____loclib.e13314 = "Firebase"
____loclib.e13315 = "Other"
____loclib.e13316 = 'Enable'
____loclib.e13317 = 'Binary path'
____loclib.e13318 = 'Config path'
____loclib.e13319 = 'Data path'
____loclib.e13320 = 'Staking Address'
____loclib.e13321 = 'Import the account address to the node for stacking'
____loclib.e13322 = 'State'
____loclib.e13323 = 'Staking addresses'
____loclib.e13324 = 'Last Block'
____loclib.control = "Control"
____loclib.setup = "Setup"
____loclib.e13325 = "Do you really want post messages from Telegram?"
____loclib.e13326 = "Post"
____loclib.e13327 = 'Do you really want use proxy again?'
____loclib.e13328 = 'liked your comment!'
____loclib.e13329 = "New Comment Like"
____loclib.e13330 = "shared your post:"
____loclib.e13331 = "shared your post:"
____loclib.e13332 = "has a brand new post:"
____loclib.e13333 = "Incoming transaction"
____loclib.e13334 = "Congratulations, you have won"
____loclib.e13335 = "Pocketcoin for your latest"
____loclib.e13336 = "with message:"
____loclib.e13337 = "commented your post:"
____loclib.e13338 = "answered on your comment:"
____loclib.reply = "Reply"
____loclib.e13339 = "You rescued someone from the censored web. Some coins are on their way!"
____loclib.e13340 = 'Congrats!'
____loclib.e13341 = "followed you"
// <%=e('e13352')%> <%=e('e13037').toUpperCase()%> <%=e('')%> self.app.localization.e('e13337')
____loclib.e13342 = "New Follower"
____loclib.e13343 = "upvoted your post"
____loclib.e13344 = "New Upvote"
____loclib.e13345 = "sent you private message"
____loclib.e13346 = "You have new messages"
____loclib.e13347 = "Updates to Pocketnet are available. Apply the updates now?"
____loclib.e13348 = "No, later"
____loclib.e13349 = "Updates to Pocketnet are available. Go to the page to download the new version?"
____loclib.e13350 = 'Join Pocketnet & Earn Pocketcoin Now'
____loclib.e13351 = 'Please write a few words about yourself to help people decide if they want to follow you'
____loclib.e13351 = 'Pocketnet chat'
____loclib.e13352 = 'You do not have chat priviliges'

____loclib.e14001 = 'Language of publication'
____loclib.e14002 = 'Are you sure you want to clear the post?'