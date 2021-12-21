var faq = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, vt;

		self.app.meta.fullname

		var faqcontent = [
			{
		
				name : 'How does '+self.app.meta.fullname+' work?',
				id : 'how-it-works',
		
				group : [
		
					{
						id : 'what-is',
						q : 'What is ' +self.app.meta.fullname+'?',
						a : '<div><p>' +self.app.meta.fullname+' is an innovative social network and video sharing platform. Unlike the mainstream social networks, there is no corporation behind it, it is based on the Bitcoin model. Bastyon is an open source project run by a team of developers and experts, and its goal is to provide a community moderated platform where the freedom of speech is seriously respected.&nbsp;</p><p>The project was originally created by&nbsp;Daniel Satchkov, but now encompasses over 25 developers and many volunteers across the globe. Bastyon is more of a protocol than a platform, since any developer can build its own app on it. The platform does not run on a single server but on a network of <em>user nodes</em> that are located all throughout the world.&nbsp;</p><p>This means that users are always able to get information and communicate, see the content and post as long as they have an internet connection and only a handful of nodes somewhere in the world are operational,.</p><p>This overcomes the limitations that censors put in place to block or limit communication and spread of information. Information wants to move freely. While, for example, in China some social networks can be used only behind a VPN, there is no need for that with '+self.app.meta.fullname+'.&nbsp;</p><p>In addition,&nbsp;'+self.app.meta.fullname+' does not collect personal information: users register without any email or phone number and no personal data like the IP or MAC address are stored in any way. Note, that while Bastyon does not collect any IPs (as can be seen in open code), it is not possible to hide your IP completely when using the internet, unless you are using a VPN.&nbsp;</p><p>By doing so,&nbsp;'+self.app.meta.fullname+' enables users to discuss issues freely. Today, anonymity is a requirement for security and privacy and&nbsp;'+self.app.meta.fullname+' is able to guarantee it.&nbsp;</p><p>Furthermore, in order to deliver completely private and anonymous communication,&nbsp;'+self.app.meta.fullname+' provides an encrypted chat system, not associated to any phone number or personal data, protected with peer-to-peer encryption model (note, that group chats are not encrypted, only 1-on-1 chats). No one except the two users involved in the chat session can access the messages. All the claims are easy to verify, since Bastyon app and Pocketnet blockchain are both completely open-source, with code visible to everyone. Moreover, all the chat messages are automatically deleted after 7 day.</p><p>'+self.app.meta.fullname+' is a censorship-resistant pseudonymous social platform where people can chat, communicate and share contents with others transparent rules that are the same for every user and developer.</p></div>',
						
					},
					
					{
						id : 'how-it-words',
						q : 'How do I get started?',
						a : '<div><p>'+self.app.meta.fullname+" is pretty simple to use: you just have to create an account and you can immediately start posting contents, follow other users and chat.</p><p>During the registration you just need to create a username (it must be unique!) and upload a picture or a photo (not necessarily your own photo!). No email (you can leave an email for the mailing list, but it is not connected to your account on Bastyon), no phone number, no verifications. Not even a password: the system will generate a passphrase that you have to use to login, this passprhase is your private key which replaces both the login and password, it is the only thing you need to login. If you lose the private key, nobody can recover it, even developers don't have access to users' accounts..&nbsp;</p></div>",
					},
						
					{
						id : 'signback',
						q : 'What is the difference between the 12-word passphrase and a private key?',
						a : '<div><p>The first time you use '+self.app.meta.fullname+' you need to create an account, composed only of your unique username.</p><p><strong>There is no password. </strong></p><p>Instead, you will be given a unique 12-words key (passphrase). Alternatively, you can use a private key, which is a long number (those two are equivalent). <strong>Keep this data safe and NEVER reveal it to anyone.</strong></p><p>Then, when you need to log in, you just need to input your passphrase (or scan the QR from the app).&nbsp;</p><p><strong>Remember</strong>: if you lose your passphrase, your account is locked forever. There is no way to restore the password, there is no way for '+self.app.meta.fullname+' to let you log in again. Your passphrase or private key code are the only ways to access your account, plase write it down on a piece of paper somewhere. You can find it in your profile under Accounts (click the symbol of a key).&nbsp;</p></div>',
					},
					
					
					{
						id : 'behind-scenes',
						q : 'How does it work behind the scenes? Where are the servers?',
						a : '<div><p>'+self.app.meta.fullname+' is modeled on decentralized a cryptocurrency Bitcoin, because it has no central authority and uses the blockchain to make transactions and ensure security.&nbsp;</p><p>There is no central server: instead, the platform relies on a network of nodes, located all over the world. Every person in the world with a computer can actually run a node (and be rewarded to do so by using coinstaking with Pocketcoin).&nbsp;</p><p>Hash of each post, each comment, each interaction (except chat messages!) is stored on the <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. The posts and comments themselves are not in the blockchain, but in a companion database tied to a blockchain.</p><p>'+self.app.meta.fullname+' usesa dedicated blockchain, derived directly from the Bitcoin chain.&nbsp;</p></div>',
					},
						
					{
						id : 'blocks',
						q : 'What would happen if some country (ies) blocks access to Bastyon.com?',
						a : '<div><p>Nothing.</p><p>You would still be able to use Bastyon as if nothing happened if you use a desktop app, because the Bastyon desktop app speaks directly to the nodes and does not use websites.</p><p>This is the power of censorship resistance. <br />You can verify this yourself by simulating a disappearance of the domain name bastyon.com. <br /><br /><strong>On Windows:</strong><br />just open this file:<br />Windows/System32/hosts<br /><br /><strong>On Linux/Ubuntu:</strong><br />Open this file<br />/etc/hosts<br /><br />Then add this row: <br />127.0.0.1 bastyon.com</p><p>This would ensure that bastyon.com is pointing to your local machine, which means that it is not pointing to any outside IP address.<br /><br />Then launch the desktop app and you will be able to continue using Bastyon has if nothing happened. <br />Cool huh?</p></div>',
					}
			
				]
		
			
			},
			
			{
			
				name : self.app.meta.fullname,
				id : 'roadmap',
			
				group : [
			
					{
						id : 'walletaddresses',
						q : 'I see a PN address and a wallet address... are both these addresses on the PN blockchain?',
						a : '<div>PN address is the one used for posting content and using social network in general. It also keeps coins that you win for your highly rated posts.</div><div>Wallet addresses are to keep the rest of coins.</div>',
					},
			
					{
						id : 'linktoprofile',
						q : 'Can I link to my profile? or my "page"? So that i can post it into my community to bring members over.',
						a : '<div>In the browser, go to your profile by clicking on avatar in the upper right and click Share, then select Use Referral Link checkmark, everyone who will sign up from the link that is generated will be offered to follow you automatically when signing up. For every referral that signs up through you link, you will get a bonus equal to 20% of the Pocketcoin (PKOIN) they earn through posting and commenting for the first 6 months. To be clear, your referral does not earn less, you get a bonus.</div>\
							<div>On the desktop, </div>',
					},
					{
						id : 'starsystem',
						q : 'The star system. Is there a limit on how many stars a person has to give people?',
						a : '<div>There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you get 100 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 200 ratings a day.</div>',
					},
			
			
					{
						id : 'updateprofiletime',
						q : 'How often can I update my profile? ',
						a : '<div>You are able to update your profile once every hour.</div>',
					},  
			
					{
						id : 'mobileapp',
						q : 'Is there a mobile app?',
						a : '<div>There is an Android app, you can download it here: https://play.google.com/store/apps/details?id=pocketnet.app  iPhone app is not available, because Apple required us to censor any content on 24 hour notice. In Bastyon even developers cannot remove content, it is moderated by the users. Batyon is optimized for mobile browsers like Safari on the iPhone.</div>',
					},
			
					{
						id : 'postinglimit',
						q : 'Can you tell me what is the limit for posts and ratings each day or hour?',
						a : '<div>We do have some limitations, but after testing it we have increased our limits. At the outset you can make 5 posts and issue 15 ratings every 24 hours. Once your reputation grows above 100 and there at least 100 high reputation users who upvoted you (or 30 users after 3 months), you will be able to make up to 30 posts and 200 ratings, plus 300 comments every 24 hours.</div>',
					},
			
					{
						id : 'reputation',
						q : 'What is reputation and how is it calculated?',
						a : "<div>Your reputation is the sum of your ratings calculated in the following way. Note, that users with reputation below 50 do not affect anyone's reputation or coin winnings. They can rate the content, but it does not affect reputation.</div>\
						<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>So, if you have two 5 start ratings and one 1 star rating, the total will be 2+2-2=2</div>",
					},
			
					{
						id : 'deletepostoruser',
						q : 'Is there a way to delete or edit a post?',
						a : '<div>Yes, you can edit and delete posts.</div>',
					},
			
					{
						id : 'usersearch',
						q : 'Is there a way to search for a user?',
						a : '<div>Click the search magnifying glass on the top and search by username or by keywords.</div>',
					},
					{
						id : 'follow',
						q : 'How do you follow someone?',
						a : '<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see My Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)</div>',
					},
			
			
					{
						id : 'otherbrowsers',
						q : 'Can it be used on Brave or Duck Duck go browsers?',
						a : '<div>'+self.app.meta.fullname+' should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab '+self.app.meta.fullname+'Setup.exe here: https://bastyon.com/help?page=applications). The desktop app cannot be blocked ever (even if <%- app.meta.url %> is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.</div>',
					},
			
					{
						id : 'replypost',
						q : 'Can we reply to our own/and other&rsquo;s posts?',
						a : '<div>Yes, commenting is live below each post..</div>',
					},
			
					{
						id : 'addtags',
						q : 'How to add a tag to a post?',
						a : '<div>Select a category or type in the field tag and press enter. No need to specify #, it will be added automatically.</div>',
					},
			
					{
						id : 'usepublicaddress',
						q : 'How can I use the public address?',
						a : '<div>Your public address is what '+self.app.meta.fullname+' uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. '+self.app.meta.fullname+' uses the same exact cryptography as Bitcoin.</div>',
					},
					{
						id : 'desktopmac',
						q : 'Will there be a downloadable executable for Mac?',
						a : '<div>Yes - you can find it here https://bastyon.com/help?page=applications. </div>',
					},
					{
						id : 'dark-mode',
						q : 'How do I change the theme to Dark Mode?',
						a : "<div>If you're on browser click your profile picture > Manage > Settings. If you're on mobile click the three lines on the bottom right > Settings </div>",
					},
					{
						id : 'banning',
						q : 'Can people be banned?',
						a : '<div>Yes, Bastyon is a community moderated platform, however, there are only certain topics that community will flag like pornography, narcotics and direct threats of violence. You will never be banned for an opinion or free speech, and even for specific banned topics there has to be a consensus of experienced users without other users defending the content. Currently, users with rep below -30 are losing their account privileges, but this is a temporary system. By the end of 2021, Bastyon is releasing a new moderation system where posts are initially flagged by any high rep user, but account can be blocked only by a certain group of jurors who are selected using a blockchain lottery. Thus, nobody can choose to attack someone for an opinion, jurors will be selected to moderate certain content and they have to all agree. Account cannot be banned until two sets of jurors decided and they cannot be the same. This system protects against any kind of mob rule on Bastyon, while protecting the platform from unsavory content.</div>',
					},        
					{
						id : 'Apple App',
						q : 'When will Bastyon be added to Apple?',
						a : '<div>Apple decided not to allow Bastyon due to lack of centralized censorship opportunities by Apples, we wear it as a badge of honor. </div>',
					},
					{
						id : 'Missing PKCOIN',
						q : 'Help! I am missing my PKOIN!',
						a : '<div>If for some reason it seems like your PKOIN has gone missing, please first check the blockexplorer via<a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> to that your coins are still there. Just search your wallet address in the search bar and it will show you the balance of your account. </div>',
					},
			
				]
			
			
			},
				{
			
				name : 'Video',
				id : 'video',
			
				group : [
					{
						id : 'savevideo',
						q : 'Where do you save the video content?',
						a : '<div>'+self.app.meta.fullname+' uses a modified open source platform called PeerTube, connected to the Pocketnet blockchain and the Bastyon app. PeerTube is fully integrated with '+self.app.meta.fullname+' authorization, each video server is registered on the blockchain.</div>',
					},
			
					{
						id : 'permissions',
						q : 'Who can load video in Bastyon?',
						a : '<div> Bastyon does not have centralized servers or venture capital financing, all video is stored on servers maintained by users. Therefore, we cannot allow everyone to load video, servers will fill up quickly. To load video you need to have 5 PKOIN (500 MB) or 50 PKOIN (5 GB) in your account. You can buy PKOIN from other users if you select a category PKOIN/Peer-to-Peer. </div>',
					},
					{
						id : 'stats',
						q : 'Where can I see my video stats?',
						a : '<div> Go to your profile and see My Videos. </div> ',
					},
					 {
						id : 'technology',
						q : 'What player do you use to play the video?',
						a : '<div> Bastyon has its own player, which is a significantly modified version of PeerTube. Same as PeerTube it uses WebTorrent technology to reduce the load on the server. This means that users watching the video are sharing it. Note, that in some cases it means users can see IP addresses of each other. Bastyon servers do not have any mechanism to record these IP addresses, however, if you really care about exposing your IP address, you should use a reliable VPN provider. If you want to minimize any peer-to-peer sharing, you can use download video function in Bastyon. </div> ',
					},
					{
						id : 'taking time',
						q : 'Why is the video taking time to upload?',
						a : "<div> Again, Bastyon does not have the resources the Google has. Video needs to be loaded to one of the video nodes and it also needs to be transcoded. Remember, YouTube is not free, it extracts value by using your private information and monetizing it. Bastyon is run by the community and a little bit of a delay is a small price to pay for privace and freedom. Besides, Bastyon devs have made the process of loading super-easy and much more robust than other freedom oriented platforms (they frequently don't even do transcoding for different qualities). </div>",
					},
			
			
				]
			
			},
			
			
			
			{
			
				name : 'Pocketcoin',
				id : 'pocketcoin',
			
				group : [
			
					
			
					 {
						id : 'app-store',
						q : 'What can be expected to purchase with PKOIN?',
						a : '<div>PKOIN has a multitude of uses on Bastyon. First, 50 PKOIN in your account removes all posting limitations and allows you to load video. PKOIN can be used to boost comments, making your comments visible to everyone. The PKOIN from boosted comments goes to the blogger, and bloggers should reply or feature such comments to encourage such boosts. You can boost a post to move it up in the feed. It is used for staking in nodes, you can run a node and earn more PKOIN by staking PKOIN. It will be used in a Decentralized Ad Marketplace with 100% of proceeds going to bloggers. It will also be used to buy special wallpaper profiles, animated profile images etc. </div>',
					},
			
			
					{
						id : 'pocketcoinstock',
						q : 'Is Pocketcoin like a share of stock in '+self.app.meta.fullname+'?',
						a : '<div>Definitely no. '+self.app.meta.fullname+' is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, '+self.app.meta.fullname+' will include a marketplace where goods and services will be sold directly for Pocketcoin</div>',
					},
			
					{
						id : 'pocketcoinbuy',
						q : 'Can I buy additional Pocketcoin?',
						a : '<div>Yes, currently you can buy Pocketcoin on the following exchanges: DigiFinex, Bitforex, Mercatox. You can also buy it for 19 different cryptos at https://pkoin.net/ and there is a Category within Bastyon called PKOIN/Peer-to-Peer where you can buy and sell it with other users. </div>',
					},
			
					{
						id : 'pocketcoinbuyfiat',
						q : 'Can I buy Pocketcoin for US Dollars or other fiat currency?',
						a : '<div>Yes, you can buy it under the category PKOIN/Peer-to-Peer or through a company called Indacoin at https://buy.pkoin.indacoin.io/ Indacoin has nothing to do with Bastyon, they are just selling PKOIN for credit cards after buying it on exchanges.</div>',
					},
					
					{
						id : 'pocketcoinbuyfiat',
						q : 'Why do I need to buy Pocketcoin?',
						a : "<div>Bastyon has no backing by bankers or venture capitalists, it is a decentralized social platform that is supported by PKOIN. When you use Bastyon, you are using users' nodes, video nodes, they all have to pay for computers, internet and electricity. Bloggers need to earn for content. The only way Bastyon can function is if users own and support PKOIN. So, buying PKOIN is a way to support decentralization and freedom. However, there is one other important reason to own Pocketcoin. Soon it is very possible that even having a bank account will be tied to submitting your freedom, to some QR code. Pocketcoin is not tied to your name or passport, it is a way to do commerce in a world where financial censorship reigns, it might be the only way to buy food soon without a certain certificate or a QR code. So, buy some PKOIN for freedom. </div>",
					}
				]
			},
			{
			
				name : 'Privacy',
				id : 'privacy',
			
				group : [
					
			
					{
						id : 'anonymous',
						q : 'Are people who do not enter their real names anonymous?',
						a : '<div>Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates.</div>',
					},
			
					{
						id : 'viewoutside',
						q : 'Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?',
						a : '<div>Since the whole blockchain and all the posts are in open-source anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts and switch between them. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.</div>',
					},
			
			
					{
						id : 'walletid',
						q : 'Is my public key like a wallet ID that I enter on my profile and people can send points to?',
						a : '<div>Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!</div>',
					},
			
					{
						id : 'runnode',
						q : 'Can I run a node on my headless server?',
						a : '<div> Instructions are here https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md </div>',
					},
			
					{
						id : 'signback',
						q : 'How can I sign back in?',
						a : '<div>You can use your private 12-word key or a private key that consists of letters and numbers.</div>',
					}
				]
			},
			{
			
				name : 'Curation of content',
				id : 'curation',
			
				group : [
			
					{
						id : 'content',
						q : 'Is any content allowed on '+self.app.meta.fullname+'? If some content is not allowed, can the platform still be called free speech?',
						a : '<div>This is a very important question. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.</div>',
					},
					{
						id : 'specific',
						q : 'Specifics of curation on '+self.app.meta.fullname+'.',
						a : '<div> Currently the moderation of content is done through 1 star votes by high reputation  users. When reputation reaches -30, the access to the account is restricted. However, there is a completely new moderation algorithm that will be released by the end of 2021. Under the new algorithms, there will be an option to flag a user or a post by any high rep user, but that is not goign to affect the account directly. After certain numbers of flags a lottery on the blockchain will be drawn and a group of juror moderators will be chosen for that account. Jurors have to agree that this user posted pornography, narcotics or a direct threat to violence. Any other opinion or a disagreement is not a grounds for flagging or any sanctions.</div> ',
					},
					{
						id : 'racism',
						q : 'Important Note on Racism.',
						a : '<div>Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn '+self.app.meta.fullname+' into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on '+self.app.meta.fullname+'. Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. '+self.app.meta.fullname+' team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on '+self.app.meta.fullname+'. Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. You can make posts on this topic under the tag Bastyon/Pocketnet.</div>',
					},
			
			
				]
			
			},
			
			
			{
			
				name : 'How is '+self.app.meta.fullname+' different from...',
				id : 'differents',
			
				group : [
			
					{
						id : 'differents1',
						q : 'Twitter, Facebook, Reddit & other centralized platforms?',
						a : '<div>There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users.</div>',
					},
					{
						id : 'differents2',
						q : 'Decentralized platforms like Minds.com and Sola?',
						a : '<div>Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor.</div>',
					},
					{
						id : 'differents3',
						q : 'From Steemit?',
						a : '<div>Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that.</div>',
					},
					{
						id : 'differents4',
						q : 'Decentralized platforms like Mastodon and others?',
						a : '<div>While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. '+self.app.meta.fullname+' features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.</div>',
					}
			
				]
			
			},
			
			{
			
				name : ''+self.app.meta.fullname+' ecosystem',
				id : 'ecosystem',
			
				group : [
			
					{
						id : 'ecosystem1',
						q : 'How is '+self.app.meta.fullname+' development funded?',
						a : '<div>'+self.app.meta.fullname+' is open sourced and is currently run by the group of volunteers experts in programming and math. After launch '+self.app.meta.fullname+' will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working for Pocketcoin donated by large owners of PKOIN.</div>',
					},
					{
						id : 'ecosystem2',
						q : 'What is Pocketcoin?',
						a : '<div>Pocketcoin is a network token. It is used exclusively to buy advertising from '+self.app.meta.fullname+' contributors and to pay transaction fees for such payments. It is also used for boosting comments, posts and to buy privileges for your account. In Pocketent all of the revenue is split between content creators and nodes.</div>',
					},
					{
						id : 'ecosystem3',
						q : 'How are content creators and node operators rewarded?',
						a : '<div>'+self.app.meta.fullname+' features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.</div>',
					},
					{
						id : 'ecosystem4',
						q : 'What if users post illegal content, pornography and SPAM?',
						a : '<div>'+self.app.meta.fullname+' is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is moderated by the users. Any illegal content is flagged and removed from the platform. This means that users with highest reputation can moderate the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Moderators for content are chosen randomly using a lottery on the blockchain to avoid any kind of mob rule. Also, users are explicitly encouraged to illicit content, NOT simply the content they find offensive. To make sure that '+self.app.meta.fullname+' is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.</div>',
					},
					{
						id : 'ecosystem5',
						q : 'Who runs the '+self.app.meta.fullname+'?',
						a : '<div>There is no corporate entity or single individual who owns or controls the '+self.app.meta.fullname+'. Pocketnet blockchain and Bastyon are run by a group of programmers, but this group is growing and changing all the time. If any set of programmers takes a wrong turn and violates the principles on which Bastyon is founded, other programmers can simply fork an open-source code and continue the censorship resistant platform. </div></div>',
						
					},
					
				]
			
			},
			{
			
				name : 'How do I find the private key?',
				id : 'privatekey',
			
				group : [
			
					{
						id : 'privatekey1',
						q : 'Click your avatar icon in the top right corner',
						a : '',
						img: '<img src="img/privatekey1.jpg" alt="" />'
					},
					{
						id : 'privatekey2',
						q : 'Then, click “Manage” button',
						a : '',
						img: '<img src="img/privatekey2.jpg" alt="" />'
					},
					{
						id : 'privatekey3',
						q : 'Click “private key” button.',
						a : '',
						img: '<img src="img/privatekey3.jpg" alt="" />'
					},
					{
						id : 'privatekey4',
						q : 'Then, click “Yes”',
						a : '',
						img: '<img src="img/privatekey4.jpg" alt="" />'
					},
					{
						id : 'privatekey5',
						q : 'Then, you can see your private key. Keep it in a safe place. This key cannot be restored if it’s lost',
						a : '',
						img: '<img src="img/privatekey5.jpg" alt="" />'
					},	
					
					
				]
			
			},
			{
			
				name : 'Uploading videos',
				id : 'Uploading',
			
				group : [
			
					{
						id : 'Uploading1',
						q : '  ',
						a : 'Important: The uploading video function is available for users who have at least 5 PKOIN, or high enough rating. If you have 50 PKOIN you can upload 4 Gb video per day, with 50 PKOIN you can upload up to 5 GB. Note, you do not spend PKOIN, it just has to be in your account to verify that you are not a bot.',
						img: ''
					},
					{
						id : 'Uploading2',
						q : 'Click to the “What`s new?” section on the “All Posts” tab.',
						a : '',
						img: '<img src="img/Uploading2.jpg" alt="" />'
					},
					{
						id : 'Uploading3',
						q : 'Then, click “Upload Video” button and in the popup click “Select video file” button. After that, chose necessary video file from your PC and wait for uploading to be finished.',
						a : '',
						img: '<img src="img/Uploading3.jpg" alt="" />',
						
					},
					{
						id : 'Uploading4',
						q : '',
						a : '',
						img: '<img src="img/Uploading4.jpg" alt="" />'
					},
					{
						id : 'Uploading5',
						q : 'Click to the “What`s new?” section on the “All Posts” tab.',
						a : '',
						img: '<img src="img/Uploading5.jpg" alt="" />'
					},
					{
						id : 'Uploading6',
						q : 'Then, when uploading ends, add title, description, category and choose visibility for your post: <br>			“Visible for everyone”, <br> “Visible only for subscribers”, <br> “Visible only for Bastyon users”, <br> After that, click “Post” button.',
						a : '',
						img: '<img src="img/Uploading6.jpg" alt="" />'
					},
					{
						id : 'Uploading7',
						q : '',
						a : '',
						img: '<img src="img/Uploading7.jpg" alt="" />'
					},
					
					
				]
			
			},
			{
			
				name : 'How I can buy PKOIN?',
				id : 'buy-pkoin',
			
				group : [
			
					{
						id : 'buy-pkoin1',
						q : '  ',
						a : 'You can buy PKOIN in the following ways: <br>	Select PKOIN/Peer-to-Peer Category on the right and look for ads, then connect in chat <br> <a target="_blank" href="https://www.bitforex.com/en/spot/pkoin_usdt">https://www.bitforex.com/en/spot/pkoin_usdt</a> <br> <a target="_blank" href="https://www.digifinex.com/en-ww/trade/USDT/PKOIN">https://www.digifinex.com/en-ww/trade/USDT/PKOIN</a>  <br> <a target="_blank" href="https://pkoin.net/">https://pkoin.net/</a> - you can buy PKOIN for cryptocurrencies <br>		<a target="_blank" href="https://buy.pkoin.indacoin.io/">https://buy.pkoin.indacoin.io/</a> - you can buy PKOIN for credit cards.',
						img: ''
					},
					{
						id : 'buy-pkoin2',
						q : 'Pkoin.net  ',
						a : 'Choose a cryptocurrency and enter amount of the crypto into the left field. After that, enter your own PKOIN wallet address.',
						img: '<img src="img/buy-pkoin2.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin3',
						q : '  ',
						a : 'Your PKOIN wallet address is placed in your account. <br>For looking that Click your avatar icon into the right top corner',
						img: '<img src="img/buy-pkoin3.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin4',
						q : '  ',
						a : 'Then click to PKOIN address for copy',
						img: '<img src="img/buy-pkoin4.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin5',
						q : '  ',
						a : 'Then, you should to enter your PKOIN wallet address in the above field and click “Purchase” button.',
						img: '<img src="img/buy-pkoin5.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin6',
						q : '  ',
						a : 'After that you should to send your BTC (or another crypto which was chosen) to this address',
						img: '<img src="img/buy-pkoin6.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin7',
						q : ' <a href="Buy.pkoin.indacoin.io">Buy.pkoin.indacoin.io</a>     ',
						a : 'First step – choose currency, enter amount, your email address and PKOIN address.  Then click “Buy PKOIN ” button.',
						img: '<img src="img/buy-pkoin7.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin8',
						q : '  ',
						a : 'Then you can see “Buy PKOIN with credit or debit card” window. Click “Continue” button',
						img: '<img src="img/buy-pkoin8.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin9',
						q : '  ',
						a : 'Then, enter your Address, ZIP and your Country',
						img: '<img src="img/buy-pkoin9.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin10',
						q : '  ',
						a : 'Then enter your Full Name, Country, Date of berth',
						img: '<img src="img/buy-pkoin10.jpg" alt="" />'
					},
					{
						id : 'buy-pkoin11',
						q : '  ',
						a : 'Then, enter your card data and click “Continue” button',
						img: '<img src="img/buy-pkoin11.jpg" alt="" />'
					},
					
					
					
					
				]
			
			},
			{
			
				name : 'My Videos',
				id : 'Myvideos',
			
				group : [
			
					{
						id : 'Myvideos1',
						q : '  ',
						a : 'Click your avatar icon in the top right corner',
						img: '<img src="img/Myvideos1.jpg" alt="" />'
					},
					{
						id : 'Myvideos2',
						q : ' ',
						a : 'Then, click “Manage” button',
						img: '<img src="img/Myvideos2.jpg" alt="" />'
					},
					{
						id : 'Myvideos3',
						q : '  ',
						a : 'Then, click “My Videos”',
						img: '<img src="img/Myvideos3.jpg" alt="" />'
					},
					{
						id : 'Myvideos4',
						q : '  ',
						a : 'Then, you can see your video cabinet, which contain information about your uploaded videos, average rating, video views and video settings.',
						img: '<img src="img/Myvideos4.jpg" alt="" />'
					},
					{
						id : 'Myvideos5',
						q : '  ',
						a : 'If you want to change the video description, name or a preview image, click the three dots and choose necessary action.',
						img: '<img src="img/Myvideos5.jpg" alt="" />'
					},
					{
						id : 'Myvideos6',
						q : '  ',
						a : 'On the top of the video cabinet page you can see your Daily Uploading Quota, Total Referral Users, Total Ratings, Total Video Views, Unique Raters, Search Field and also you can sort your videos.',
						img: '<img src="img/Myvideos6.jpg" alt="" />'
					},
					
				]
			
			}
			
			
		]

		if (!window.cordova){

			faqcontent[0].group.splice(1, 0, {
				id : 'downloadandroid',
				q : self.app.localization.e('e14109'),
				a : `<div><a elementsid="https://play.google.com/store/apps/details?id=pocketnet.app" href="https://play.google.com/store/apps/details?id=pocketnet.app">https://play.google.com/store/apps/details?id=pocketnet.app</a></div><div>${self.app.localization.e('e14110')}</div>`,
			})
		}

		var mp = {};

		var actions = {
			question : function(id){
				_scrollToTop(el.c.find('.faqcnt .question[question="'+id+'"]'), null, null, -110)
			},
			contents : function(group){

				_scrollToTop(el.c.find('.faqcnt .group[group="'+group+'"]'), null, null, -110)

			},

			share : function(id){


				var question = mp[id]

				var url = 'https://'+self.app.options.url+'/help?page=faq&id='+id

				var r = ''

				if (self.app.platform.sdk.address.pnet()){
					r = '&ref=' + self.app.platform.sdk.address.pnet().address
					url = url + r
				}

				var m = question.q;

				var l = filterXSS(question.a, {
					whiteList: [],
					stripIgnoreTag: true
				})

				self.nav.api.load({
					open : true,
					href : 'socialshare2',
					history : true,
					inWnd : true,

					essenseData : {
						url : url,
						sharing : {
							image : '',
							images : [],
							title : m,
							html : {
								body : question.a,
								preview : trimHtml(question.a, 160)
							},

							text : {
								body : l,
								preview : trimHtml(l, 160)
							}
						},
						caption : 'Share FAQ answer in social networks',
					}
				})
			},

			inview : function(){

				//vt = slowMade(function(){

					
					var h = $(window).height() / 4

					var inv = inView(el.c.find('.faqcnt .group'), {
						offsetTop : h,
						offsetBottom : h,
						mode : 'line',
					})

					var id = null;

					if (inv.length > 0){

						var vel = $(inv[0]);

						id = vel.attr('group')	

						el.contens.removeClass('active')

						var e = el.c.find('.contens .item[group="'+id+'"]')
						
						e.addClass('active')
					}


				//}, vt, 30)
				
			}
		}

		var events = {
			contens : function(){
				var group = $(this).attr('group')

				actions.contents(group)
			},

			share : function(){
				var id = $(this).closest('.question').attr('question')

				actions.share(id);
			}
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.contens.on('click', events.contens)

			el.c.find('.share').on('click', events.share)

			el.c.find('.question .questionName').on('click', function(){
				$(this).closest('.question').toggleClass('opened')
			})

			window.addEventListener('scroll', actions.inview);
			
	

			el.c.find('.contens').hcSticky({
				stickTo: '#faq',
				top : 65
			});

		}

		return {
			primary : primary,

			getdata : function(clbk){

				mp = {}

				_.each(faqcontent, function(f){
					_.each(f.group, function(q){
						mp[q.id] = q;
					})
				})

				var data = {
					groups : faqcontent
				};

				clbk(data);

			},

			destroy : function(){



				window.removeEventListener('scroll', actions.inview);

				//self.app.nav.api.history.removeParameters(['id'])

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.contens = el.c.find('.contens .item')

				initEvents();

				var id = parameters().id;

				if (id) actions.question(id)

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = faq;
}
else{

	app.modules.faq = {};
	app.modules.faq.module = faq;

}