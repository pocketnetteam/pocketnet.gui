var faq = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, vt;

		var faqLangs = {
			en : [
				{
			
					name : 'How does '+self.app.meta.fullname+' work?',
					id : 'how-it-works',
			
					group : [
			
						{
							id : 'what-is',
							q : 'What is ' +self.app.meta.fullname+'?',
							a : '<div><p>' +self.app.meta.fullname+' is an innovative social network and video sharing platform. Unlike the mainstream social networks, there is no corporation behind it, it is based on the Bitcoin model. Bastyon is an open source project run by a team of developers and experts, and its goal is to provide a community moderated platform where the freedom of speech is seriously respected.</p><p>The project was originally created byDaniel Satchkov, but now encompasses over 25 developers and many volunteers across the globe. Bastyon is more of a protocol than a platform, since any developer can build its own app on it. The platform does not run on a single server but on a network of <em>user nodes</em> that are located all throughout the world.</p><p>This means that users are always able to get information and communicate, see the content and post as long as they have an internet connection and only a handful of nodes somewhere in the world are operational,.</p><p>This overcomes the limitations that censors put in place to block or limit communication and spread of information. Information wants to move freely. While, for example, in China some social networks can be used only behind a VPN, there is no need for that with '+self.app.meta.fullname+'.</p><p>In addition,'+self.app.meta.fullname+' does not collect personal information: users register without any email or phone number and no personal data like the IP or MAC address are stored in any way. Note, that while Bastyon does not collect any IPs (as can be seen in open code), it is not possible to hide your IP completely when using the internet, unless you are using a VPN.</p><p>By doing so,'+self.app.meta.fullname+' enables users to discuss issues freely. Today, anonymity is a requirement for security and privacy and'+self.app.meta.fullname+' is able to guarantee it.</p><p>Furthermore, in order to deliver completely private and anonymous communication,'+self.app.meta.fullname+' provides an encrypted chat system, not associated to any phone number or personal data, protected with peer-to-peer encryption model (note, that group chats are not encrypted, only 1-on-1 chats). No one except the two users involved in the chat session can access the messages. All the claims are easy to verify, since Bastyon app and Pocketnet blockchain are both completely open-source, with code visible to everyone. Moreover, all the chat messages are automatically deleted after 7 day.</p><p>'+self.app.meta.fullname+' is a censorship-resistant pseudonymous social platform where people can chat, communicate and share contents with others transparent rules that are the same for every user and developer.</p></div>',
							
						},
						
						{
							id : 'how-it-words',
							q : 'How do I get started?',
							a : '<div><p>'+self.app.meta.fullname+" is pretty simple to use: you just have to create an account and you can immediately start posting contents, follow other users and chat.</p><p>During the registration you just need to create a username (it must be unique!) and upload a picture or a photo (not necessarily your own photo!). No email (you can leave an email for the mailing list, but it is not connected to your account on Bastyon), no phone number, no verifications. Not even a password: the system will generate a passphrase that you have to use to login, this passprhase is your private key which replaces both the login and password, it is the only thing you need to login. If you lose the private key, nobody can recover it, even developers don't have access to users' accounts.</p></div>",
						},
							
						{
							id : 'signback',
							q : 'What is the difference between the 12-word passphrase and a private key?',
							a : '<div><p>The first time you use '+self.app.meta.fullname+' you need to create an account, composed only of your unique username.</p><p><strong>There is no password. </strong></p><p>Instead, you will be given a unique 12-words key (passphrase). Alternatively, you can use a private key, which is a long number (those two are equivalent). <strong>Keep this data safe and NEVER reveal it to anyone.</strong></p><p>Then, when you need to log in, you just need to input your passphrase (or scan the QR from the app).</p><p><strong>Remember</strong>: if you lose your passphrase, your account is locked forever. There is no way to restore the password, there is no way for '+self.app.meta.fullname+' to let you log in again. Your passphrase or private key code are the only ways to access your account, plase write it down on a piece of paper somewhere. You can find it in your profile under Accounts (click the symbol of a key).</p></div>',
						},
						
						
						{
							id : 'behind-scenes',
							q : 'How does it work behind the scenes? Where are the servers?',
							a : '<div><p>'+self.app.meta.fullname+' is modeled on decentralized a cryptocurrency Bitcoin, because it has no central authority and uses the blockchain to make transactions and ensure security.</p><p>There is no central server: instead, the platform relies on a network of nodes, located all over the world. Every person in the world with a computer can actually run a node (and be rewarded to do so by using coinstaking with Pocketcoin).</p><p>Hash of each post, each comment, each interaction (except chat messages!) is stored on the <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. The posts and comments themselves are not in the blockchain, but in a companion database tied to a blockchain.</p><p>'+self.app.meta.fullname+' usesa dedicated blockchain, derived directly from the Bitcoin chain.</p></div>',
						},
							
						{
							id : 'blocks',
							q : 'What would happen if some country (ies) blocks access to Bastyon.com?',
							a : '<div><p>Nothing.</p><p>You would still be able to use Bastyon as if nothing happened if you use a desktop app, because the Bastyon desktop app speaks directly to the nodes and does not use websites.</p><p>This is the power of censorship resistance. <br />You can verify this yourself by simulating a disappearance of the domain name bastyon.com. <br /><br /><strong>On Windows:</strong><br />just open this file:<br />Windows/System32/hosts<br /><br /><strong>On Linux/Ubuntu:</strong><br />Open this file<br />/etc/hosts<br /><br />Then add this row: <br />127.0.0.1 bastyon.com</p><p>This would ensure that bastyon.com is pointing to your local machine, which means that it is not pointing to any outside IP address.<br /><br />Then launch the desktop app and you will be able to continue using Bastyon has if nothing happened. <br />Cool huh?</p></div>',
						}
				
					]
			
				
				},

				{

                    name : 'Desktop app, mobile app and Web version',
                    id : 'download',
                
                    group : [
                        {
                            id : 'download',
                            q : 'Can I use 'self.app.meta.fullname+' from my browser or should I download an app?',
                            a : '<div>You can use 'self.app.meta.fullname+' from your browser. However, to improve the security and anonymity we strongly recommend to download the app on your phone (Android) or on your computer (Windows, MacOS or Linux/Ubuntu). See the next questions for the instructions.</div>',
                        },
                        {
                            id : 'downloadclient',
                            q : 'Where do I download the client?',
                            a : '<div><p>If you would like to install 'self.app.meta.fullname+' on your computer, you can download the client from this page: <a href="https://github.com/'self.app.meta.fullname+'team/'self.app.meta.fullname+'.gui/releases/latest">https://github.com/'self.app.meta.fullname+'team/'self.app.meta.fullname+'.gui/releases/latest</a></p><div>Depending on your operating system make sure to download and install the proper file:</div><ul><li>For Window: select&nbsp;'self.app.meta.fullname+'Setup.exe</li><li>For Mac OS: select&nbsp;'self.app.meta.fullname+'Setup.dmg</li><li>For Linux/Ubuntu: select&nbsp;'self.app.meta.fullname+'Setup.deb</li></ul><p>For Android devices you can download 'self.app.meta.fullname+' from Google Play</p><p><a href="https://play.google.com/store/apps/details?id='self.app.meta.fullname+'.app&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="194" height="75" /></a></p><p>You can also download the source code and compile your own version.&nbsp;</p><p>Please remember that 'self.app.meta.fullname+' is Open Source and you can find the complete documentation and source code <a href="https://github.com/'self.app.meta.fullname+'team">on GitHub.</a></p><p>We strongly recommend installing the app to use 'self.app.meta.fullname+' instead of passing through the website, for increased security and privacy.&nbsp;</p></div>',
                        },
                        
                        
                        {
                            id : 'iPhone-App',
                            q : 'When will 'self.app.meta.fullname+' have a mobile app for iOS?',
                            a : '<div>We expect to release it in late 2021.</div>',
                        },
                        
                        {
                            id : 'otherbrowsers',
                            q : 'Does '+self.app.meta.fullname+' work on any browser? Also on Brave or Duck Duck go browsers?',
                            a : '<div>'+self.app.meta.fullname+' should work on any browsers. It is fully functional on Chrome and Firefox and we do not have bug reports about Brave and Duck Duck go. <br>However, we strongly encourage everyone to download the desktop app (available here here: https://github.com/'self.app.meta.fullname+'team/'self.app.meta.fullname+'.gui/releases/tag/v0.0.33-beta) or or Android app. We strongly recommend using the app since it cannot be blocked, even if <%- app.meta.url %> is down or blocked for some reason. This is a serious consideration in totalitarian and quasi-totalitarian countries and in places where the internet in under the control of the governemnt. As we all know, unfortunately, this is happening more and more often.</div>',
                        },
                        

                        {
                            id : 'downloadnode',
                            q : 'Can I run a node on my headless server? Where do I download the node code?',
                            a : '<div>If you want to run your own node you can follow the instructions at this link:</div><div><a href="https://github.com/pocketnetteam/pocketnet.core/releases/latest">https://github.com/pocketnetteam/pocketnet.core/releases/latest</a></div><div>Please reach out to our team if you have questions or issues during the installations at this email: core@pocketnet.app</div>',
                        }
                
                    ]
                
                },


                {
                
                    name : 'Profile, comments, stars',
                    id : 'general-questions',
                
                    group : [
                
                        {
                            id : 'linktoprofile',
                            q : 'Can I share a link to my profile or my "page"? I would like to bring my friends / followers on 'self.app.meta.fullname+'',
                            a : '<div>Definitely.<div>Just follow these steps (valid for the Android app, the Desktop app and the Web-browser app):</div><ol><li>Go to your profile by clicking on your Avatar</li><li>Click on the "Share" icon and you will see a list of options to share your profle.&nbsp;</li><li>Share it with your friends and followers. You will automatically get rewarded</li></ol></div>',
                        },
                        
                        {
                            id : 'starsystem',
                            q : 'How does the "star rating" system works? Is there a limit on how many stars a person can give?',
                            a : '<div>The Star rating is used in 'self.app.meta.fullname+' to "like" and "dislike" videos and posts.</div><div>Each post and video can be rated by every user, from 1 to 5. There are some limitations to the number of stars that you can give. For example, new users can rate up to 15 posts per day. However, you can give more stars&nbsp;as your reputation grows. The more you get rated, the more your reputation grows (NOTE: MISSING FAQ ABOUT REPUTATION)</div></div>',
                        },
                
                
                        {
                            id : 'updateprofiletime',
                            q : 'I have just updated my profile and it seems that I cannot update it anymore. Is this normal?',
                            a : '<div>Yes, you can update your profile only once per hour. Just wait one hour and you should be able to update it again...</div>',
                        },
                
                        {
                            id : 'savevideo',
                            q : 'Where do you save the video content?',
                            a : '<div>'+self.app.meta.fullname+' uses open source platform called PeerTube. PeerTube is fully integrated with '+self.app.meta.fullname+' authorization, each video server is registered on the blockchain. Details of the algorithm are coming.</div>',
                        },
                
                
                        {
                            id : 'postinglimit',
                            q : 'What is the limit for posting each day or hour?',
                            a : '<div>On 'self.app.meta.fullname+' we have some limitations, in fact. New users can create 5 posts each date and give 30 start rating per day. Once your reputation grows, the limits become higher.</div>',
                        },
                
                        {
                            id : 'reputation',
                            q : 'What is the "Reputation" and how is it calculated?',
                            a : "<div>Your reputation is the sum of your ratings calculated in the following way.</div><div>&nbsp;</div><table><tbody><tr><td>Star Rating</td><td>Reputation Points</td></tr><tr><td style="text-align: center;">5</td><td style="text-align: center;">2</td></tr><tr><td style="text-align: center;">4</td><td style="text-align: center;">1</td></tr><tr><td style="text-align: center;">3</td><td style="text-align: center;">0</td></tr><tr><td style="text-align: center;">2</td><td style="text-align: center;">-1</td></tr><tr><td style="text-align: center;">1</td><td style="text-align: center;">-2</td></tr></tbody></table><div>&nbsp;</div><div>So, if one post has two 5 stars ratings and one 2 stars rating, the total for that post will be 2+2-1=3. Your reputation will therefore be increased by 3.</div><div>&nbsp;</div><div>Note: users with reputation below 50 do not affect anyone's reputation or coin winnings. They can rate the content, but it does not affect reputation.</div><div>&nbsp;</div>",
                        },
                
                        {
                            id : 'deletepostoruser',
                            q : 'Is there a way to delete or edit a post?',
                            a : '<div>No, this is not possible right now. Each post is included into blockchain and there is no way to edit it. </br>However, we are working on a feature to create an "overwrite transaction" and a way to hide a transaction, which would effectively translate to edit or delete a post.</div>',
                        },
                
                        {
                            id : 'usersearch',
                            q : 'Is there a way to search for a user?',
                            a : '<div>Yes. Click the search magnifying glass on the top and search by username or by keywords.</div>',
                        },
                        {
                            id : 'follow',
                            q : 'How do you follow someone?',
                            a : '<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. <br>The main feed will show all the posts, in chronological order, on 'self.app.meta.fullname+'. Subscriptions feed will only contain posts from people you follow. So you can use the general feed to search for good content, however you may not like everything. Then you can select those you want to keep (follow). <br>Just like fishing in your own pond :)</div>',
                        },
                
                
                        {
                            id : 'replypost',
                            q : 'Can I reply to my own/and other&rsquo;s posts?',
                            a : '<div>Yes, you can comment below each post.</div>',
                        },
                
                        {
                            id : 'addtags',
                            q : 'How to add a tag to a post?',
                            a : '<div>Just type in the field tag and press enter. No need to specify #, it will be added automatically.</div>',
                        },

                
                        {
                            id : 'usepublicaddress',
                            q : 'What is the Public address?',
                            a : '<div>Your public address is what '+self.app.meta.fullname+' uses to verify your identity. Essentially, your private key is a really large number, represented with a 12 word sequence or a QR code. <br>This number gets multiplied by another one, called a base pointc, to obtain the "public key". When you enter your private key, it is multiplied by the base point to get your public key and we can match it against the public address. <br>If they match, we know it is you. It is impossible to perform the opposite process, therefore finding the private key from the public key is technically not possible. </div><div>In cryptography this operation is unidirectional and cannot be reversed. '+self.app.meta.fullname+' uses the same exact cryptography as Bitcoin.</div>',
                        },
                        
                        {
                            id : 'dark-mode',
                            q : 'How do I change the theme to Dark Mode?',
                            a : "<div>Click on you profile picture > Manage > Settings. </div>",
                        },

                
                    ]
                
                
                },

                {
                
                    name : 'PKOIN',
                    id : 'pocketcoin',
                
                    group : [
                                    
                        {
                            id : 'what-pkoin',
                            q : 'What is PKOIN?',
                            a : '<div>PKOIN is the <strong>network token</strong> used by 'self.app.meta.fullname+'.</div><div>It is a Cryptocurrency that relies on its own Blockchain.</div><div>&nbsp;</div><div>PKOIN emission depends on the number of users of '+self.app.meta.fullname+' and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In&nbsp;'self.app.meta.fullname+' all of the revenue is split between content creators and owners of nodes.<br>From your Profile page you can see your account balance: you will get PKOIN based on the number of likes your receive and on several other actions. You can receive and send PKOIN from your profile page. PKOIN can be also converted to other cryptocurrencies and to fiat money (USD, EUR...) from some exchanges that support this function.<br> Your Account has an Account address and several Wallet addresses (see the next questions for more details).</div>',
                        },
                        
                        {
                            id : 'walletaddresses',
                            q : 'I see an "Account address" and several "Wallet addresses". Are all these addresses on the PN blockchain?',
                            a : '<div>The <strong>Account address</strong> is the main address used by 'self.app.meta.fullname+' and it is where you PKOIN are added when your posts get voted, for example. It is mainly for internal use inside 'self.app.meta.fullname+'. You can instead use the other <strong>Wallet addresses</strong> to receive and store PKOIN separately. These addresses are NOT used by 'self.app.meta.fullname+', they are your own private wallets.</div>',
                        },
                        
                                    
                        {
                            id : 'walletid',
                            q : 'Is my public key like a wallet ID that I enter on my profile and people can send PKOIN to?',
                            a : '<div>Exactly. The Public Key is safe to reveal. However, remember that the Secret phrase is personal and it is exclusively yours. Keep it safe and NEVER reveal it to anyone!</div>',
                        },

                
                        {
                            id : 'pkoin-usage',
                            q : 'What can I purchase with PKOIN?',
                            a : '<div>Soon there will be a way to boost posts in the feed and to Top Posts using PKOIN. In addition, there will be special emojis, themes and badges. In addition, PKOIN will be used for advertising within 'self.app.meta.fullname+'. <p>Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities.</p><p>This will be a trustless endeavor (neither side can cheat), because of "multi-signature contracts".</p><p>Multi-signature contracts require a digital signature of both parties to be valid:</p><ol><li>When an advertiser offers an ads to the content creator, he creates the first of two required signatures.</li><li>He signs the actual ads and the amount bid.</li><li>The Content creator reviews this partially signed contact.</li><li>If he accepts, he appends the second signature.</li><li>When the blockchain detects both signatures, the content creator is automatically paid and an the ads is shown on creator&rsquo;s channel.</li></ol><p>These transactions will only be done through PKOIN.&nbsp;</p><p>Finally, you can convert your PKOIN to other Cryptocurrencies on several exchanges.</p></div>',
                        },
                            
                        {
                            id : 'Missing PKCOIN',
                            q : 'Help! I am missing my PKOIN!',
                            a : '<div>If for some reason it seems like your PKOIN has gone missing, please first check the blockexplorer via<a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> to verify whether your coins are still there. Just search your wallet address in the search bar and it will show you the balance of your account along with all the transactions. <br>If you have questions, contact our official page on 'self.app.meta.fullname+'</div>',
                        },
                
                        {
                            id : 'pocketcoinstock',
                            q : 'Is Pocketcoin like a share of stock in '+self.app.meta.fullname+'?',
                            a : '<div>No. '+self.app.meta.fullname+' is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. PKOIN is a token that facilitates value exchange, specifically advertising transactions. In addition, '+self.app.meta.fullname+' will include a marketplace where goods and services will be sold directly in PKOIN</div>',
                        },
                
                        {
                            id : 'pkoin-buy',
                            q : 'Can I buy additional Pocketcoin?',
                            a : '<div><p>Yes, currently you can buy Pocketcoin on the following exchanges: <a href="https://www.bilaxy.com/">Bilaxy</a>, <a href="https://mercatox.com/">Mercatox</a>, <a href="https://btcpop.co/home.php">BTCPOP</a>.</p></div>',
                        },
                
                        {
                            id : 'pocketcoinbuyfiat',
                            q : 'Can I buy Pocketcoin for US Dollars or other fiat currency?',
                            a : '<div>Yes,some exchanges allow that.</div>',
                        },
                    ]
                },


                {
                
                    name : 'Privacy',
                    id : 'privacy',
                
                    group : [
                        
                
                        {
                            id : 'anonymous',
                            q : 'Can I create an anonymous account?',
                            a : '<div>Yes. Definitely.<br>When you create an account we do not ask for any names, phones, email address. You can add an email address but it is NOT connected to your account in any way: if you add it you can receive our regular newsletter but it is not linked to your account.</div>',
                        },
                
                        {
                            id : 'viewoutside',
                            q : 'Can someone view my profile (someone&rsquo;s posts) even if he does not follow me? Is my profile public?',
                            a : '<div>Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address but no one will know who you are. In practice, you can have multiple accounts. Anonymity is a great tool to protect free speech from abuse of power and we believe in censorship-free communication.</div>',
                        },
                    
                        
                        {
                            id : 'banning',
                            q : 'Can people or content be banned?',
                            a : '<div>Generally speaking, no. <br>If someone posts prohibited content (pornography for example) then people will rate their content low causing their reputation to fall. If the reputation falls below -50, then the user is "shadowed". This means that he can still post but no one will see their contents unless directly on his profile.</div>',
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
							a : '<div>This is a very important question.</div><div>&nbsp;</div><div>We will be releasing many videos and articles about it, as well as looking for your input.</div><div>&nbsp;</div><div>Not all types of content are allowed: illegal contents, like pornography for example, are hidden.</div><div>&nbsp;</div><div>However, and this is crucial, <strong>the enforcement is transparent and up to the community.</strong>&nbsp;Enforcement is done by the community, with no hidden shadow bans or selective banning, like the ones typically practiced by the Silicon Valley companies.</div>',
						},
						{
							id : 'reporting',
							q : 'How does the reporting works?',
							a : '<div>When your reputation gets to 100 you can flag inappropriate posts. If you click on the three dots in the upper right corner of any post, you will see an option to Complain.</div><div>&nbsp;</div><div>If several users report the same post, it will not be shown anymore.</div><div>&nbsp;</div><div>When someone has more than 2 posts that are reported by many users within 24 hours, the users cannot post for 48 hours from the latter.</div><div>&nbsp;</div><div>A post is banned with the number of complaints is at least 1/3 of the sum of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>&nbsp;</div><div>This means that if a post has thirty 4 stars and twenty-six 5 stars ratings, at least 19 complaints should be reported:</div><div>(30+26)/3 = 18.67 = 19</div><div>&nbsp;</div><div>We are extremely and passionately pro-speech. However, we do not want to turn '+self.app.meta.fullname+' into a marginal forum where lunatics reign or where illegal content is posted. Freedom of speech does not mean lack of logic and moral.</div>',
						},
                        {
                            id : 'what-to-report',
                            q : 'What should I report?',
                            a : '<div><p>You should NOT complain and report posts that you simply don not agree with or that you do not like..&nbsp;</p><p>That is not a high enough bar.</p><p>In that case, simply do not follow people who offend you, but do not complain about them. You can also block them and you will no longer see their posts.</p><p>Instead you should report posts that threaten long term viability of '+self.app.meta.fullname+' as a mass communication platform that intends to reach to all levels of society in many countries.</p><p><br />1. We strongly recommend that you report <strong>porn posts</strong> of any kind. <br />There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. This is just not the right place, you can for sure find porn somewhere else.</p><p>2. Any sort of <strong>direct threat</strong> should be reported and clear examples of <strong>racism and hate</strong> should be reported, too.&nbsp;<br />If we allow mainstream social media to link our name to racism or violence directly, '+self.app.meta.fullname+' will cease to exist before we can even get it out there. <br />Just because&nbsp;we see a lot of "politically correct" news about fake racism, doesn&rsquo;t mean we should prove them right by tolerating racism and violence in our platform. This would detract from what we are really trying to achieve, which is to challenge new totalitarianism created by the alliance of media, finance and governments, and to give freedom of speech to anyone. But again, freedom of speech does not mean free violence, irrational racism and illogical hate.</p>',
                        },
						{
							id : 'racism',
							q : 'Important Note on Racism.',
							a : '<div>Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn '+self.app.meta.fullname+' into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on '+self.app.meta.fullname+'. Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. '+self.app.meta.fullname+' team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on '+self.app.meta.fullname+'. Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. You can create posts on this topic under the tag Bastyon/Pocketnet.</div>',
						},
                        {
                            id : 'trolls',
                            q : 'How do you deal with Trolls?',
                            a : '<div>Sometimes we can have a user who comes in with a specific purpose to attack '+self.app.meta.fullname+' and its users by posting series of images or contents that are clearly against the spirit of the platform.</div><div>&nbsp;</div><div>To protect against that we have a following mechanism:</div><div>If someone&rsquo;s reputation reaches -50 (negative 50), their account is automatically blocked: they can post but their posts will be invisible, except if you visit their personal page.</div><div>&nbsp;</div><div>Getting a reputation of -50 is equivalent to having 25 one star ratings and no four or five star ratings. This is nearly impossible to achieve without having lots of bad posts.</div><div>&nbsp;</div><div>In addition, you can block Trolls and you will no longer see their posts.</div>',
                        },
                        {
                            id : 'freedom',
                            q : 'If some content is not allowed, can the platform still be called free speech?',
                            a : '<div>Yes, the freedom of speech is something that has a wider and higher meaning that simply allowing each monkey to shout in the forest.&nbsp;</div><div>&nbsp;</div><div>Freedom of speech and expression is <strong>fundamental</strong> human right, playing vital role in exercising and protecting other rights. Possibility to express opinion and to share information is a value indicator for the democratic capacity and institutional commitment to democracy in the societies.</div><div>&nbsp;</div><div>However, freedom of expression can be abused in certain situations and it transfers into a completely opposite phenomenon.</div><div>&nbsp;</div><div>Certain individuals and groups can express ideas on superiority of a certain race, religion or nation, with the intention to humiliate all those not belonging to <em>their </em>group, as well as to incite to exile, isolation and even genocide.</div><div>&nbsp;</div><div>In such cases, freedom of expression is interpreted too broadly and transfers into a<strong> hate speech.</strong> These phenomena highlight the discussion on freedom of expression, its limitations and abuse of this freedom.</div><div>&nbsp;</div><div>The transition we are in and the situation with the media, including the poor &ldquo;word&rdquo; culture, is fertile ground for such public dissemination or fuelling of hatred, without any sense of responsibility for the uttered word, which becomes the main generator of the social climate of intolerance and prejudice on national, ethnic and other grounds, which is emerging as a general psychological framework for expansion of all forms of hate crimes, from physical to verbal and psychological violence.</div><div>&nbsp;</div>',
                        },

				
				
					]
				
				},
				
				
				{
				
					name : 'How is '+self.app.meta.fullname+' different from...',
					id : 'differents',
				
					group : [
				
						{
                            id : 'differences1',
                            q : 'How is '+self.app.meta.fullname+' different from Twitter, Facebook, Reddit and other platforms?',
                            a : '<div>Unlike the mainstream platforms, there is no central authority or corporation behind '+self.app.meta.fullname+'.</div><div>&nbsp;</div><div>In addition, the platform does not run on a single server controlled by a company: it runs on "nodes" on a blockchain. The "nodes" are distributed worldwide and can be directly accessed, without passing through a website.</div><div>This is crucial, since it guarantees that everyone can access the platform at any time, even if the website is down, not available or blocked in his country.</div><div>&nbsp;</div><div>Furthermore, since no corporation controls '+self.app.meta.fullname+', there is no way to censor users and there is no way for a government to force the plaform to remove unwanted contents.</div><div>Likewise, since everything is anonymous, governments cannot track users and know the identity of people using '+self.app.meta.fullname+'.</div><div>&nbsp;</div><div>Finally, all the revenue generated is split between node operators and content creators. There are no shareholders. Half of the PKOIN generated in each block go to content creators based on the ratings of their content.</div>So, '+self.app.meta.fullname+' is a decentralized platform controlled by its own users.</div>,
                        },
                        {
                            id : 'differences2',
                            q : 'How is '+self.app.meta.fullname+' different from decentralized platforms like Minds.com and Sola?',
                            a : "<div>Both of those platforms, while great, <strong>are not self-contained. </strong></div><div>Both are highly dependent on the <strong>Ethereum</strong> platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees, which are constantly increasing.</div><div>&nbsp;</div><div>In addition, those entities have <strong>corporations</strong> behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. And, as you know, corporations must adhere to governements' laws and regulations and are therefore exceedingly easy to censor.</div>",
                        },
                        {
                            id : 'differences3',
                            q : 'How is '+self.app.meta.fullname+' different from  from Steemit?',
                            a : '<div><p>Steemit has its own blockchain, but it is a corporate entity (Steemit, Inc., a privately held company based in New York City and with head quarter in Virginia) with all of the centralization that comes from that.</p><p>It is subject to the US laws, their servers can be controlled by the government and they collect personal data, as mentioned inside their privacy policy (available here:&nbsp;<a href="https://steemit.com/privacy.html">https://steemit.com/privacy.html</a>)</p><p>&nbsp;</p><p>'+self.app.meta.fullname+' instead is not a company or a corporation, but an open source project. There is no centralized organization behind. In addition, since there are no centralized servers, no government can apply its regulations and legislation on&nbsp;'+self.app.meta.fullname+' and on the contents posted.</p>',
                        },
                        {
                            id : 'differences4',
                            q : 'How is '+self.app.meta.fullname+' different from  decentralized platforms like Mastodon and others?',
                            a : '<div><p>While Mastodon is a fully decentralized platform, users must have high technical skills in order to use the platform.</p><p>This presents a great limit to potential widespread acceptance.</p><p>Instead, '+self.app.meta.fullname+' comes with a web-app, a desktop application for Linux, Windows and MacOS and an Android app.&nbsp;Users can easily log in from any device and start using the platform immediately without any technial knowledge.</p>',
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
							a : '<div>'+self.app.meta.fullname+' is open source and is currently run by the group of volunteers with some serious programming and math skills.</div><div>&nbsp;</div><div>After its launch, '+self.app.meta.fullname+' will attract top programming talent based on its promise of creating a decentralized, fair and censorship-free social network.</div><div>&nbsp;</div><div>Programmers and marketers working on the project receive 5% of the emissions of PKOIN, the cryptocurrency used within the platform. The rewards are assigned to developers and marketers in a transparent manner.</div>',
						},
                        {
                            id : 'ecosystem3',
                            q : 'How does the Ads market works?',
                            a : '<div>'+self.app.meta.fullname+' features a unique Direct Marketplace where content creators can sell advertising to Ads buyers.</div><div>&nbsp;</div><div>Content creators set their price and can accept mass-produced Ads or can offer highly valued custom placements (creators pitching the product in their own way).</div><div>&nbsp;</div><div>Direct Marketplace is essentially an exchange for advertising that allows Ads buyers to target specific audiences without any intermediaries. All Ads buys and the Ads themselves are linked on the blockchain, thus making the Ads market completely transparent.</div>',
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
							img: '<img src="img/per-to-per2.jpg" alt="" />'
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
				
				
			],
			ru : [
				{
			
				name : 'Как '+self.app.meta.fullname+' работает?',
				id : 'how-it-works',
			
				group : [
			
				{
				id : 'what-is',
				q : 'Что такое ' +self.app.meta.fullname+'?',
				a : '<div><p>' +self.app.meta.fullname+' это инновационная социальная сеть и платформа для обмена видео. В отличие от обычных социальных сетей, за ними нет корпорации, они основаны на модели Биткойн. Bastion - это проект с открытым исходным кодом, которым управляет группа разработчиков и экспертов, и его цель - предоставить модерируемую сообществом платформу, в которой серьезно соблюдается свобода слова.  </p> <p> Проект изначально создавался автор:  Даниэля Сатчкова, но сейчас это более 25 разработчиков и множество волонтеров по всему миру. Bastion - это скорее протокол, чем платформа, поскольку любой разработчик может создать на нем собственное приложение. Платформа работает не на одном сервере, а в сети из <em> пользовательских узлов </em>, расположенных по всему миру.  </p> <p> Это означает, что пользователи всегда могут получать информацию и общаться, просматривать контент и публиковать сообщения, пока у них есть подключение к Интернету и только несколько узлов где-то в мире работают. </p> <p> Это преодолевает ограничения, которые цензоры устанавливают для блокировки или ограничения коммуникация и распространение информации. Информация хочет свободно перемещаться. Хотя, например, в Китае некоторые социальные сети можно использовать только через VPN, в этом нет необходимости с '+ self.app.meta.fullname +'. </p> <p> Кроме того, '+ self.app.meta.fullname +' не собирает личную информацию: пользователи регистрируются без какого-либо адреса электронной почты или номера телефона, и никакие личные данные, такие как IP или MAC-адрес, никоим образом не сохраняются. Обратите внимание: хотя Bastyon не собирает никаких IP-адресов (как видно из открытого кода), невозможно полностью скрыть ваш IP-адрес при использовании Интернета, если только вы не используете VPN. </p> <p> Таким образом, '+ self.app.meta.fullname +' позволяет пользователям свободно обсуждать проблемы. Сегодня анонимность является требованием безопасности и конфиденциальности, и '+ self.app.meta.fullname +' может это гарантировать.  </p> <p> Кроме того, чтобы обеспечить полностью конфиденциальное и анонимное общение, '+ self.app.meta.fullname +' обеспечивает зашифрованную систему чата, не связанную с каким-либо номером телефона или личными данными, защищенную сквозным шифрованием  (обратите внимание, что групповые чаты не шифруются, только 1-на -1 чаты). Никто, кроме двух пользователей, участвующих в сеансе чата, не может получить доступ к сообщениям. Все утверждения легко проверить, поскольку приложение Bastion и блокчейн Pocketnet имеют полностью открытый исходный код, а код виден всем. Более того, все сообщения чата автоматически удаляются через 7 дней. </p> <p> '+ self.app.meta.fullname +' - устойчивая к цензуре псевдонимная социальная платформа, где люди могут общаться, общаться и делиться контентом с другими прозрачно правила, одинаковые для всех пользователей и разработчиков. </p> </div> ', 
				},
				
				{
				id : 'как это-слова',
				q : 'Как мне начать?',
				a : '<div><p>'+self.app.meta.fullname+' прост в использовании: вам просто нужно создать учетную запись, и вы можете сразу же начать публиковать контент, подписываться на других пользователей и общаться в чате. </p> <p> Во время регистрации вам просто нужно создать электронную почту (она должна быть уникальной! ) и загрузите картинку или фотографию (не обязательно свою фотографию!). Ни электронной почты (вы можете оставить электронное письмо для списка рассылки, но оно не связано с вашей учетной записью на Bastion), ни номера телефона, ни проверок. Даже пароль: система сгенерирует парольную фразу, которую вы должны использовать для входа в систему, эта парольная фраза - ваш личный ключ, который заменяет логин и пароль, это единственное, что вам нужно для входа в систему. Если вы потеряете личный ключ ключ, никто не может его восстановить, даже разработчики не имеют доступа к учетным записям пользователей.</p></div>',
				},
				
				{
				id : 'подписаться',
				q : 'В чем разница между парольной фразой из 12 слов и закрытым ключом?',
				a : '<div><p>При первом использовании '+ self.app.meta.fullname +' вам необходимо создать учетную запись, состоящую только из вашего уникального имени пользователя. </p> <p> <strong> Нет пароля. </strong> </p> <p> Вместо этого вам будет предоставлен уникальный ключ из 12 слов (кодовая фраза). В качестве альтернативы вы можете использовать закрытый ключ, представляющий собой длинное число (эти два эквивалента). <strong> Храните эти данные в безопасности и НИКОГДА не раскрывайте их никому. </strong> </p> <p> Затем, когда вам нужно войти в систему, вам просто нужно ввести кодовую фразу (или отсканировать QR из приложения). </p> <p> <strong> Помните </strong>: если вы потеряете кодовую фразу, ваша учетная запись будет заблокирована навсегда. Невозможно восстановить пароль, нет возможности для '+ self.app.meta.fullname +' позволить вам снова войти в систему. Ваша кодовая фраза или код закрытого ключа - единственный способ получить доступ к вашей учетной записи, пожалуйста, запишите его где-нибудь на листе бумаги. Вы можете найти его в своем профиле в разделе «Учетные записи» (щелкните символ ключа). </p> </div> ',
				},
				
				
				{
				id : 'закулисный',
				q : 'Как это работает за кадром? Где серверы?',
				a : '<div><p>'+self.app.meta.fullname+' построен на основе децентрализованной криптовалюты Биткойн, поскольку не имеет центральной власти и использует цепочку блоков для совершения транзакций и обеспечения безопасности.  </p> <p> Центрального сервера нет: вместо этого платформа полагается на сеть узлов, расположены по всему миру. Каждый человек в мире, имеющий компьютер, может фактически запустить узел (и получить за это вознаграждение, используя ставку монет с помощью Pocketcoin). </p> <p> Хеш каждого сообщения, каждого комментария, каждого взаимодействия (кроме чата сообщения!) хранится в <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain"> блокчейне </a>. Сами сообщения и комментарии находятся не в блокчейне, а в сопутствующей базе данных, привязанной к блокчейну. </p> <p> '+ self.app.meta.fullname +' использует выделенный блокчейн, полученный непосредственно из цепочки биткойнов.  </p> </div> ',
				},
				
				{
				id : 'блоки',
				q : 'Что произойдет, если какая-то страна (страны) заблокирует доступ к Bastyon.com?',
				a : '<div><p>Bastyon.com перестанет работать,  но приложение для компьютера будет работать точно также после любых блокировок сайта.</p><p>Вы все равно сможете использовать Bastyon, как будто ничего не произошло, если бы вы использовали приложение для компьютера, потому что настольное приложение Bastyon обращается напрямую к узлам и не использует веб-сайты. </p> <p> В этом сила сопротивления цензуре. <br /> Вы можете убедиться в этом сами, смоделировав исчезновение доменного имени bastyon.com. <br /> <br /> <strong> В Windows: </strong> <br /> просто откройте этот файл: <br /> Windows / System32 / hosts <br /> <br /> <strong> В Linux / Ubuntu: </strong> <br /> Откройте этот файл <br /> / etc / hosts <br /> <br /> Затем добавьте эту строку: <br /> 127.0.0.1 bastyon.com </p> <p > Это гарантирует, что bastyon.com указывает на ваш локальный компьютер, а это означает, что он не указывает ни на какой внешний IP-адрес. <br /> <br /> Затем запустите настольное приложение, и вы сможете продолжить использование Bastyon если ничего не произошло. <br /> Круто, да? </p> </div> <br /> <a href="https://github.com/pocketnetteam/pocketnet.gui/releases/">Скачать Приложение Для Компьютера</a> ',
				
				}
				
				]
			
				
				},
				
				{
				
				name: self.app.meta.fullname,
				id: 'дорожная карта',
				
				group : [
				
				{
				id : 'адреса кошельков',
				q : 'Я вижу адрес PN и адрес кошелька ... оба эти адреса находятся в цепочке блоков PN? ',
				a: '<div> PN-адрес - это адрес, который используется для публикации контента и использования социальных сетей в целом. В нем также хранятся монеты, которые вы выигрываете за свои публикации с высоким рейтингом. </div> <div> Адреса кошельков предназначены для хранения остальных монет.</div>',
				},
				
				{
				id : 'ссылка на профиль',
				q : 'Могу ли я сделать ссылку на свой профиль? или моя "страничка"? Чтобы я мог опубликовать его в своем сообществе, чтобы пригласить участников. ',
				a: '<div> В браузере перейдите в свой профиль, щелкнув аватар в правом верхнем углу и нажмите «Поделиться», затем установите флажок «Использовать реферальную ссылку», всем, кто зарегистрируется по созданной ссылке, будет предложено подписаться на вас автоматически при регистрации. За каждого реферала, который зарегистрируется по вашей ссылке, вы получите бонус, равный 20% от Pocketcoin (PKOIN), который они зарабатывают, публикуя сообщения и комментируя в течение первых 6 месяцев. Чтобы было понятно, ваш реферал не зарабатывает меньше, вы получаете бонус.</div><div>На рабочем столе, </div>',
				},
				// {
				// id : 'звездная система',
				// q : 'Система оценок. Есть ли ограничение на количество звезд, которые человек должен дать людям?',
				// a : '<div>Есть некоторые ограничения. Но по мере роста вашей репутации вы можете голосовать все больше и больше. Это сделано, поэтому боты не ломают нашу цепочку блоков. Первоначально вы получаете 100 оценок каждые 24 часа. По мере роста вашей репутации (это происходит благодаря публикациям и получению оценок) вы делаете 200 оценок в день.</div>',
				// },
				
				
				{
				id : 'время обновления профиля',
				q : 'Как часто я могу обновлять свой профиль? ',
				a : '<div>Вы можете обновлять свой профиль один раз в час.</div>',
				},  
				
				{
				id : 'мобильное приложение',
				q : 'Есть ли мобильное приложение?',
				a : '<div>Есть приложение для Android, вы можете скачать его <a href="https://play.google.com/store/apps/details?id=pocketnet.app">здесь:</a> <br />  Приложение для iPhone недоступно, потому что Apple требовала от нас цензуры любого контента в круглосуточном режиме. час уведомление. В Bastion даже разработчики не могут удалять контент, он модерируется пользователями. Bastyon оптимизирован для мобильных браузеров, таких как Safari на iPhone.</div>',
				},
				
				{
				id : 'лимит публикации',
				q : 'Можете ли вы сказать мне, каков лимит публикаций и оценок каждый день или час?',
				a : '<div>У нас есть некоторые ограничения, но после тестирования мы увеличили наши ограничения. Вначале вы можете размещать 5 постов и выставлять 15 оценок каждые 24 часа. Как только ваша репутация превысит 100 и будет по крайней мере 100 пользователей с высокой репутацией, которые проголосовали за вас (или 30 пользователей через 3 месяца), вы сможете делать до 30 сообщений и 200 оценок, а также 300 комментариев каждые 24 часа.</div>',
				},
				
				{
				id : 'репутация',
				q : 'Что такое репутация и как она рассчитывается?',
				a : "<div>Ваша репутация - это сумма ваших рейтингов, рассчитываемых следующим образом. Обратите внимание, что пользователи с репутацией ниже 50 не влияют на чью-либо репутацию или выигрыш монет. Они могут оценивать контент, но это не влияет на репутацию. </div> \
				<div> 5 = 2 <br> 4 = 1 <br> 3 = 0 <br> 2 = -1 <br> 1 = -2 </div> <div> Итак, если у вас есть два стартовых рейтинга 5 и один 1 звездочка, сумма будет 2 + 2-2 = 2 </div> ",
				},
				
				{
				id : 'удалить сообщение или пользователя',
				q : 'Есть ли способ удалить или отредактировать сообщение?',
				a : '<div>Да, вы можете редактировать и удалять сообщения.</div>',
				},
				
				{
				id : 'поиск пользователей',
				q : 'Есть ли способ найти пользователя?',
				a : '<div>Щелкните значок лупы поиска вверху и выполните поиск по имени пользователя или ключевым словам.</div>',
				},
				{
				id : 'следить',
				q : 'Как вы следите за кем-то?',
				a : '<div>Далее, чтобы опубликовать автора (вверху поста) есть ссылка Follow, вы можете найти его посты в топ постов (красный огонь вверху страницы). Вы также скоро увидите ленту «Мои подписки», которая будет отличаться от основной ленты. Основным фидом будет все, что кто-либо публикует, но фид подписок будет содержать только сообщения людей, на которых вы подписаны. Итак, вы будете заходить в общую ленту в поисках хорошего контента, хотя вам может не все нравиться. Затем выберите те, которые хотите сохранить. Вроде как на рыбалке:)</div>',
				},
				
				
				{
				id : 'другие браузеры',
				q : 'Можно ли его использовать в браузерах Brave или Duck Duck go?',
				a : '<div>'+self.app.meta.fullname + 'должен работать в этих браузерах. Он полностью функционален в Chrome и Firefox. Но мы настоятельно рекомендуем всем загрузить настольное приложение (загрузите '+ self.app.meta.fullname +' Setup.exe здесь: https://bastyon.com/help?page=applications). Настольное приложение невозможно заблокировать (даже если <% - app.meta.URL%> не работает или заблокирован по какой-либо причине). Это серьезное соображение в тоталитарных и квазитоталитарных странах, которые, если задуматься, начинают включать все больше и больше земного шара.</div>',
				},
				
				{
				id : 'ответ на сообщение',
				q : 'Можем ли мы отвечать на собственные / и другие сообщения?',
				a : '<div>Да, комментирование доступно под каждым постом..</div>',
				},
				
				{
				id : 'добавить теги',
				q : 'Как добавить тег к посту?',
				a : '<div>Выберите категорию или введите тег поля и нажмите клавишу ВВОД. # Указывать не нужно, он будет добавлен автоматически.</div>',
				},
				
				{
				id : 'использовать публичный адрес',
				q : 'Как я могу использовать публичный адрес?',
				a : '<div>Ваш публичный адрес - это то, что '+ self.app.meta.fullname +' использует для проверки вашей личности. По сути, ваш закрытый ключ - это действительно большое число (которое может быть представлено последовательностью из 12 слов или QR-кодом). Это число умножается на другое, известное всем (называемое базовой точкой), и мы получаем открытый ключ. Когда вы вводите свой закрытый ключ, мы можем умножить его на базовую точку, чтобы получить ваш открытый ключ и сопоставить его с общедоступным адресом. Если они совпадают, мы знаем, что это вы. Невозможно вернуться назад, т.е. разделить открытый ключ на базовую точку, чтобы получить свой закрытый ключ. В криптографии умножение работает только в одну сторону и не может быть отменено, поэтому ваш ключ в безопасности. '+ self.app.meta.fullname +' использует ту же самую криптографию, что и Биткойн. </div>',
				},
				{
				id : 'настольный Mac',
				q : 'Будет ли загружаемый исполняемый файл для Mac?',
				a : '<div>Да, вы можете найти его здесь https://bastyon.com/help?page=applications.</div>',
				},
				{
				id : 'темный режим',
				q : 'Как изменить тему на темный режим?',
				a : "<div>Если вы находитесь в браузере, щелкните изображение своего профиля> Управление> Настройки. Если вы используете мобильный телефон, щелкните три строки в правом нижнем углу> Настройки. </div>",
				},
				{
				id : 'запрет ',
				q : 'Можно ли банить людей?',
				a : '<div>Да, Bastion - это платформа, модерируемая сообществом, однако есть только определенные темы, которые будут отмечены сообществом, такие как порнография, наркотики и прямые угрозы насилия. Вас никогда не забанят за свое мнение или свободу слова, и даже по конкретным запрещенным темам должен быть консенсус опытных пользователей, при этом другие пользователи не защищают контент. В настоящее время пользователи с репутацией ниже -30 теряют свои привилегии учетной записи, но это временная система. К концу 2021 года Bastion выпускает новую систему модерации, в которой сообщения изначально помечаются любым пользователем с высоким уровнем репутации, но учетные записи могут быть заблокированы только определенной группой присяжных, выбранных с помощью лотереи блокчейна. Таким образом, никто не может атаковать кого-то за мнение, присяжные будут выбраны для модерации определенного контента, и все они должны согласиться. Аккаунт не может быть заблокирован до тех пор, пока не будет определено два состава присяжных, и они не могут быть одинаковыми. Эта система защищает от любых правил мафии на Bastion, одновременно защищая платформу от сомнительного контента.</div>',
				},	
				{
				id : 'Приложение Apple',
				q : 'Когда в Apple добавят Bastion?',
				a : '<div>Apple решила не допускать Bastion из-за отсутствия у Apple возможностей централизованной цензуры, мы носим это как знак чести.</div>',
				},
				{
				id : 'Отсутствует PKCOIN',
				q : 'Помощь! Мне не хватает моего PKOIN!',
				a : '<div>Если по какой-то причине кажется, что ваш PKOIN пропал, сначала проверьте обозреватель блоков через <a href="https://'+self.app.options.url+'/blockexplorer/"> BlockExplorer. </a> к тому, что ваши монеты все еще там. Просто найдите адрес своего кошелька в строке поиска, и он покажет вам баланс вашей учетной записи. </div>',
				},
				
				]
				
				
				},
				{
				
				name : 'Видео',
				id : 'видео',
				
				group : [
				{
				id : 'сохранить видео',
				q : 'Где вы сохраняете видеоконтент?',
				a : '<div>'+self.app.meta.fullname + 'использует модифицированную платформу с открытым исходным кодом под названием PeerTube, подключенную к блокчейну Pocketnet и приложению Bastion. PeerTube полностью интегрирован с авторизацией '+ self.app.meta.fullname +', каждый видеосервер зарегистрирован в блокчейне.</div>',
				},
				
				{
				id : 'разрешения',
				q : 'Кто может загружать видео в Bastion?',
				a : '<div> Bastion не имеет централизованных серверов или венчурного финансирования, все видео хранится на серверах, обслуживаемых пользователями. Поэтому мы не можем позволить всем загружать видео, серверы быстро заполнятся. Для загрузки видео вам необходимо иметь в аккаунте 5 PKOIN (500 МБ) или 50 PKOIN (5 ГБ). Вы можете купить PKOIN у других пользователей, если выберете категорию PKOIN / Peer-to-Peer. </div>',
				},
				{
				id : 'статистика',
				q : 'Где я могу посмотреть статистику моих видео?',
				a : '<div> Зайдите в свой профиль и посмотрите Мои видео. </div> ',
				},
				{
				id : 'технологии',
				q : 'Какой плеер вы используете для воспроизведения видео?',
			
				a : '<div> В Бостионе есть собственный плеер, который представляет собой значительно модифицированную версию PeerTube. Как и PeerTube, он использует технологию WebTorrent для снижения нагрузки на сервер. Это означает, что пользователи, просматривающие видео, делятся им. Обратите внимание, что в некоторых случаях это означает, что пользователи могут видеть IP-адреса друг друга. Серверы Bastion не имеют никакого механизма для записи этих IP-адресов, однако, если вы действительно заботитесь о раскрытии своего IP-адреса, вам следует использовать надежного поставщика VPN. Если вы хотите минимизировать одноранговое совместное использование, вы можете использовать функцию загрузки видео в Bastyon.</div> ',
				},
				{
				id : 'время',
				q : 'Почему для загрузки видео требуется время?',
				a : '<div> Опять же, у Bastion нет ресурсов, которые есть у Google. Видео необходимо загрузить в один из видеоузлов, а также его необходимо перекодировать. Помните, что YouTube не является бесплатным, он извлекает ценность, используя вашу личную информацию и монетизируя ее. Bastion находится в ведении сообщества, и небольшая задержка - небольшая плата за конфиденциальность и свободу. Кроме того, разработчики Bastion сделали процесс загрузки сверхлегким и гораздо более надежным, чем другие платформы, ориентированные на свободу (часто они даже не перекодируют файлы различного качества.). </div>',
				},
				
				
				]
				
				},
				
				
				
				{
				
				name : 'Pocketcoin',
				id : 'pocketcoin',
				
				group : [
				
				
				
				{
				id : 'магазин приложений',
				q : 'Что можно ожидать от покупок с помощью PKOIN?',
				a : '<div>PKOIN имеет множество применений на Bastion. Во-первых, 50 PKOIN в вашем аккаунте снимают все ограничения на публикацию и позволяют загружать видео. PKOIN можно использовать для усиления комментариев, делая ваши комментарии видимыми для всех. PKOIN от повышенных комментариев достается блоггеру, и блоггеры должны отвечать или размещать такие комментарии, чтобы поощрять такие повышения. Вы можете поднять пост, чтобы продвинуть его вверх в ленте. Он используется для ставок в узлах, вы можете запустить узел и заработать больше PKOIN, поставив PKOIN. Он будет использоваться на децентрализованной торговой площадке рекламы, при этом 100% доходов будут поступать блоггерам. Также на него можно будет купить специальные профили обоев, анимированные изображения профиля и т. д. </div>',
				},
				
				
				{
				id : 'pocketcoinstock',
				q : 'Pocketcoin похож на долю акций в '+self.app.meta.fullname+' ?',
				a : '<div>Definitely no. '+self.app.meta.fullname+' даже не корпорация и не имеет никакой собственности. Это открытый код, который может скопировать и запустить каждый. Pocketcoin - это токен, который облегчает обмен ценностями, в частности, рекламные транзакции. Кроме того, '+ self.app.meta.fullname +' будет включать торговую площадку, где товары и услуги будут продаваться напрямую за Pocketcoin.</div>',
				},
				
				// {
				// id : 'pocketcoinbuy',
				// q : 'Могу ли я купить дополнительный Pocketcoin?',
				// a : '<div>Да, в настоящее время вы можете купить Pocketcoin на следующих биржах: DigiFinex, Bitforex, Mercatox. Вы также можете купить его за 19 различных криптовалют на https://pkoin.net/, а в Bastyon есть категория PKOIN / Peer-to-Peer, где вы можете покупать и продавать ее другим пользователям.</div>',
				// },
				
				{
				id : 'pocketcoinbuyfiat',
				q : 'Могу ли я купить Pocketcoin за доллары США или другую фиатную валюту? ',
				a: '<div> Да, вы можете купить его в категории PKOIN / Peer-to-Peer или через компанию под названием Indacoin по адресу https://buy.pkoin.indacoin.io/ Indacoin не имеет ничего общего с Bastyon, они просто продают PKOIN за кредитные карты после покупки на биржах.</div>',
				},
				
				{
				id : 'pocketcoinbuyfiat',
				q : 'Зачем мне покупать Pocketcoin?',
				a : '<div>У Bastyon нет поддержки со стороны банкиров или венчурных капиталистов, это децентрализованная социальная платформа, поддерживаемая PKOIN. Когда вы используете Bastyon, вы используете пользовательские узлы, видео узлы, все они должны платить за компьютеры, Интернет и электричество. Блогерам нужно зарабатывать на контенте. Bastyon может работать только в том случае, если пользователи владеют и поддерживают PKOIN. Итак, покупка PKOIN - это способ поддержать децентрализацию и свободу. Однако есть еще одна важная причина для владения Pocketcoin. Вскоре вполне возможно, что даже наличие банковского счета будет связано с предоставлением вашей свободы какому-то QR-коду. Pocketcoin не привязан к вашему имени или паспорту, это способ заниматься коммерцией в мире, где царит финансовая цензура, это может быть единственный способ вскоре купить еду без определенного сертификата или QR-кода. Итак, купите немного PKOIN для свободы. </div>',
				},
				]
				},
				{
				
				name : 'Конфиденциальность',
				id : 'Конфиденциальность',
				
				group : [
				
				
				{
				id : 'анонимный',
				q : 'Анонимны ли люди, которые не вводят свои настоящие имена?',
				a : '<div>Да - ни имена, ни телефоны, ни электронная почта НЕ связаны с вашей учетной записью, она просто вводится необязательно для получения обновлений информационных бюллетеней.</div>',
				},
				
				{
				id : 'вид снаружи',
				q : 'Может ли кто-нибудь просматривать профиль (чьи-то сообщения) за пределами сада? Это обнесенный стеной сад?',
				a : '<div>Поскольку весь блокчейн и все сообщения находятся в открытом доступе, любой может иметь доступ к вашим сообщениям и профилю. Они просто знают, что это связано с вашим публичным адресом. На практике вы можете иметь несколько учетных записей и переключаться между ними. Вы можете использовать одни со своим настоящим именем, а другие анонимно. Анонимность - отличный инструмент для защиты свободы слова от злоупотребления властью.</div>',
				},
				
				
				{
				id : 'walletid',
				q : 'Похож ли мой открытый ключ на идентификатор кошелька, который я ввожу в моем профиле и на который люди могут отправлять баллы?',
				a : '<div>Exactly. И это безопасно. Но не секретная фраза - береги!</div>',
				},
				
				{
				id : 'узел',
				q : 'Могу ли я запустить узел на моем автономном сервере?',
				a : '<div> Инструкции здесь https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md </div>',
				},
				
				{
				id : 'подписка ',
				q : 'Как я могу войти снова? ',
				a : '<div>Вы можете использовать свой закрытый ключ из 12 слов или закрытый ключ, состоящий из букв и цифр.</div>',
				}
				]
				},
				{
				
				name : 'Курирование контента',
				id : 'курирование',
				
				group : [
				
				{
				id : 'содержание',
				q : 'Разрешен ли какой-либо контент на '+ self.app.meta.fullname +'? Если какой-то контент запрещен, можно ли назвать платформу свободой слова?',
				a : '<div>Это очень важный вопрос. Начнем с того, что разрешены не все типы контента. Однако, и это очень важно, обеспечение соблюдения прозрачно и зависит от сообщества, как мы объясним ниже. Правоприменение осуществляется сообществом и открыто, без скрытых теневых запретов или выборочных запретов, практикуемых Кремниевой долиной.</div>',
				},
				{
				id : 'конкретный',
				q : 'Особенности курирования на '+self.app.meta.fullname+'.',
				a : '<div> В настоящее время модерация контента осуществляется с помощью оценок в 1 звезду пользователями с высокой репутацией. Когда репутация достигает -30, доступ к аккаунту ограничивается. Однако существует совершенно новый алгоритм модерации, который будет выпущен к концу 2021 года. Согласно новым алгоритмам, будет возможность пометить пользователя или сообщение любым высокопоставленным пользователем, но это не повлияет на счет напрямую. После того, как будет установлено определенное количество флагов, на блокчейне будет разыграна лотерея, и для этой учетной записи будет выбрана группа модераторов присяжных заседателей. Присяжные должны согласиться с тем, что этот пользователь разместил порнографию, наркотики или прямую угрозу насилия. Любое иное мнение или несогласие не является основанием для пометки или каких-либо санкций.</div> ',
				},
				{
				id : 'взаимный',
				q : 'Разрешено ли взаимное голосование?',
				a : '<div> Взаимность - нормальное человеческое поведение, поэтому в этом смысле с этим нет проблем. Однако механизмы курирования во многом зависят от того факта, что как высокие, так и низкие оценки связаны с контентом и не являются взаимными. Таким образом, Бастион ограничит ответные голоса двумя способами. Во-первых, вы не сможете вернуть пять или одну звезду в течение определенного периода времени. Кроме того, те, кто угрожает возмездием за голоса в одну звезду или обещают награду за голоса в пять звезд, считаются участниками запрещенного поведения. Другие пользователи могут отмечать такие случаи, и псевдослучайная лотерея создаст жюри для их рассмотрения. Хотя такое поведение не будет иметь тех же штрафов, что и незаконный контент, пользователям, задействованным в нем, могут быть предоставлены временные блокировки алгоритмом консенсуса узла. </div> ',
				},
				{
				id : 'расизм',
				q : 'Важное примечание о расизме.',
				a : '<div>Свобода мысли и свобода слова подвергаются нападкам со стороны основных социальных платформ и средств массовой информации. Мы должны говорить правду, и именно по этой причине эта платформа не является корпоративной и децентрализованной. Но мы просим всех высказывать свою точку зрения, не нападая на национальность или расу людей. Вы можете обосновать свою точку зрения на доказательствах. Мы не можем позволить себе превратить' + self.app.meta.fullname + 'в маргинальную платформу. Говорите правду, но, пожалуйста, избегайте расизма и нападок на определенные национальности в целом. Мы знаем, что Кремниевая долина и МСМ превратили проблему расизма в свою игральную карту, и они постоянно плачут как волк. Более того, причина, по которой мы должны быть измерены и основаны на доказательствах, и не позволять им опорочивать нас этим. В противном случае мы не позволим большинству населения взвесить доказательства коррупции в МСМ, представленные на '+ self.app.meta.fullname +'. Пожалуйста, имейте это в виду, чтобы свобода слова могла процветать, и мы могли победить фэйсбокков мира. </div> <div> В конечном счете, именно сообщество будет определять направление платформы. Иметь кучу снежинок, которые жалуются на то, что их оскорбляет, так же плохо, как и когда люди хотят озвучить прямые насильственные угрозы. Однако первым признаком является то, что первые пользователи платформы, как правило, умны и основаны на доказательствах, поэтому будущее выглядит невероятно светлым. Команда '+ self.app.meta.fullname +' заметила после нескольких дней бета-тестирования, что мы перестали читать даже альтернативные новости, потому что на '+ self.app.meta.fullname +' было так много интересного контента. Так держать! </div> <div> Пожалуйста, примите участие в обсуждении этих тем. Это платформа сообщества. Мы всегда стремимся повысить прозрачность платформы, и вы должны сообщить нам, как мы можем улучшить контроль и контроль контента. Вы можете публиковать сообщения по этой теме в теге Bastyon / Pocketnet.</div>',
				},
				
				
				]
				
				},
				
				
				{
				
				name : 'Как '+self.app.meta.fullname+' отличается от...',
				id : 'разные',
				
				group : [
				
				{
				id : 'разные1',
				q : 'Twitter, Facebook, Reddit и другие централизованные платформы?',
				a : '<div>Нет центральной власти или корпорации. Платформа управляется равными узлами в цепочке блоков. Вся прибыль делится между операторами узлов и создателями контента. Операторы узлов делают ставку на Pocketcoin, чтобы чеканить блоки с вознаграждениями и комиссиями за транзакции. Половина вознаграждений в каждом блоке достается создателям контента на основе оценок, которые их контент собирает от пользователей.</div>',
				},
				{
				id : 'разные2',
				q : 'Децентрализованные платформы, такие как Minds.com и Sola?',
				a : '<div>Обе эти платформы, хотя и великолепны, не являются самодостаточными. Обе сильно зависят от платформы Ethereum, поскольку их токены основаны на стандарте ERC-20 Ethereum. Это означает, что за операции с токенами взимается плата за газ эфира. Кроме того, за этими организациями стоят корпорации, и корпорация всегда будет точкой централизации из-за своей экономической логики роста прибыли. Кроме того, корпорации очень легко подвергнуть цензуре.</div>',
				},
				{
				id : 'разные s3',
				q : 'От Steemit?',
				a : '<div>У Steemit есть собственный блокчейн, но это корпоративная структура со всей вытекающей из этого централизацией.</div>',
				},
				{
				id : 'разные ps4',
				q : 'Децентрализованные платформы, такие как Mastodon и другие?',
				a : '<div>Хотя Mastodon - полностью децентрализованная платформа, для ее использования требуются большие технические знания. Это является большим препятствием для потенциального широкого признания. '+ self.app.meta.fullname +' включает веб-приложения и настольные приложения, и пользователи могут входить в систему с любого устройства, извлекать свои личные настройки из цепочки блоков и сразу же начинать использовать платформу без каких-либо технических знаний.</div>',
				}
				
				]
				
				},
				
				{
				
				name : ''+self.app.meta.fullname+' экосистема',
				id : 'экосистема',
				
				group : [
				
				{
				id : 'экосистема 1',
				q : 'Как '+self.app.meta.fullname+' развитие финансируется?',
				a : '<div>'+self.app.meta.fullname+'имеет открытый исходный код и в настоящее время управляется группой добровольцев-экспертов по программированию и математике. После запуска'+self.app.meta.fullname+' привлечет талантливых программистов, обещая создать децентрализованную социальную сеть. Программисты и маркетологи, работающие на Pocketcoin, пожертвованы крупными владельцами PKOIN.</div>',
				},
				{
				id : 'экосистема 2',
				q : 'Что такое Pocketcoin?',
				a : '<div>Pocketcoin - это сетевой токен. Он используется исключительно для покупки рекламы у '+self.app.meta.fullname+' вкладчиков и платить комиссию за такие платежи. Он также используется для повышения комментариев, публикаций и покупки привилегий для вашей учетной записи. В Pocketent весь доход делится между создателями контента и узлами.</div>',
				},
				{
				id : 'экосистема 3',
				q : 'Как вознаграждаются создатели контента и операторы узлов?',
				a : '<div>'+self.app.meta.fullname+' имеет уникальную прямую торговую площадку, где создатели контента могут продавать рекламу покупателям рекламы. Создатели контента устанавливают свою цену и могут принимать массовую рекламу или могут предлагать высоко ценимые персонализированные места размещения (создатели продвигают продукт по-своему). Прямая торговая площадка - это, по сути, биржа для рекламы, которая позволяет покупателям рекламы нацеливаться на определенную аудиторию без каких-либо посредников. Все покупки рекламы и сама реклама связаны в блокчейне, поэтому покупка рекламы полностью ненадежна.</div>',
				},
				{
				id : 'экосистема 4',
				q : 'Что, если пользователи размещают незаконный контент, порнографию и СПАМ?',
				a : '<div>'+self.app.meta.fullname+' это не платформа даркнета или какой-то порнухаб. Хотя он децентрализован и устойчив к цензуре, он модерируется пользователями. Любой незаконный контент помечается и удаляется с платформы. Это означает, что модерировать платформу могут пользователи с наивысшей репутацией. Однако существуют гарантии (в рамках открытого исходного кода) от той же или очень похожей группы (групп) людей, неоднократно голосующих за контент за пределами платформы. Модераторы контента выбираются случайным образом с помощью лотереи на блокчейне, чтобы избежать каких-либо правил мафии. Кроме того, пользователей явно поощряют к незаконному контенту, а НЕ просто к контенту, который они считают оскорбительным. Чтобы убедиться, что '+ self.app.meta.fullname +' является платформой для свободы слова, мы призываем вас начать участвовать, повышать свою репутацию и надлежащим образом контролировать платформу без цензуры, которая в настоящее время распространена в централизованных социальных сетях.</div>',
				},
				{
				id : 'экосистема 5',
				q : 'Кто управляет '+self.app.meta.fullname+'?',
				a : '<div>Нет юридического лица или отдельного лица, которое владеет или контролирует '+self.app.meta.fullname+'. Блокчейн Pocketnet и Bastyon управляются группой программистов, но эта группа постоянно растет и меняется. Если какая-то группа программистов ошибется и нарушит принципы, на которых основан Bastyon, другие программисты могут просто разветвить открытый исходный код и продолжить платформу, устойчивую к цензуре. </div></div>',
				},
				
				]
				
				},
				{
				
					name : 'Как мне найти приватный ключ?',
					id : 'privatekey',
				
					group : [
				
						{
							id : 'privatekey1',
							q : 'Кликните по своей иконке, находящейся в правом верхнем углу',
							a : '',
							img: '<img src="img/prkey1.jpg" alt="" />'
						},
						{
							id : 'privatekey2',
							q : 'Далее, нажмите кнопку «управление»',
							a : '',
							img: '<img src="img/prkey2.jpg" alt="" />'
						},
						{
							id : 'privatekey3',
							q : 'Далее, нажмите кнопку «приватный ключ».',
							a : '',
							img: '<img src="img/prkey3.jpg" alt="" />'
						},
						{
							id : 'privatekey4',
							q : 'Далее, нажмите «Да»',
							a : '',
							img: '<img src="img/prkey4.jpgg" alt="" />'
						},
						{
							id : 'privatekey5',
							q : 'Вы можете увидеть ваш приватный ключ. Держите его в сохранности (сохраните в надежном месте, запишите на листок). Приватный ключ не может быть восстановлен в случае его утраты.',
							a : '',
							img: '<img src="img/prkey5.jpg" alt="" />'
						},	
						
						
					]
				
				},
				{
				
					name : 'Загрузка видео',
					id : 'Uploading',
				
					group : [
				
						{
							id : 'Uploading1',
							q : '  ',
							a : 'Важно! Функция загрузки видео доступна для пользователей, которые имеют не менее 5 PKOIN, либо не менее 100 рейтингов. При этом 5 PKOIN позволяют загружать не более 500 Мб в сутки. Если у вас есть 50 PKOIN, ваши лимиты загрузки увеличатся до 5 Гб в сутки. При этом вы должны постоянно иметь не менее 5/50 PKOIN, чтобы вы не были верифицированы как бот.',
							img: ''
						},
						{
							id : 'Uploading2',
							q : 'Нажмите «Что нового?» во вкладке «Вся лента»',
							a : '',
							img: '<img src="img/upl1.jpg" alt="" />'
						},
						{
							id : 'Uploading3',
							q : 'Далее, нажмите «Загрузить видео», а затем во всплывающем окне нажмите «Выбрать файл». Выберите на персональном компьютере необходимый файл и ожидайте окончания загрузки видео. ',
							a : '',
							img: '<img src="img/upl2.jpg" alt="" />',
							
						},
						{
							id : 'Uploading4',
							q : '',
							a : '',
							img: '<img src="img/upl3.jpg" alt="" />'
						},
						{
							id : 'Uploading5',
							q : '',
							a : '',
							img: '<img src="img/upl4.jpg" alt="" />'
						},
						{
							id : 'Uploading6',
							q : '',
							a : 'Далее, когда загрузка видео будет окончена, добавьте заголовок и описание, категорию, а так же выберите видимость поста: <br />«Видимо для всех»<br />«Видимо только для подписчиков»<br />«Видно только для пользователей Бастиона»',
							img: '<img src="img/upl5.jpg" alt="" />'
						},
						{
							id : 'Uploading7',
							q : '',
							a : '',
							img: '<img src="img/upl6.jpg" alt="" />'
						},
						
						
						
					]
				
				},
				{
				
					name : 'Как я могу купить PKOIN?',
					id : 'buy-pkoin',
				
					group : [
				
						{
							id : 'buy-pkoin1',
							q : '  ',
							a : 'Вы можете купить PKOIN следующими способами: Выберите категорию «PKOIN/Из рук в руки» и посмотрите на предложения о купле/продаже PKOIN, либо сами разместите свое предложение о купле/продаже PKOIN.	Покупку PKOIN также можно осуществить на следующих сайтах. 	<br> <a target="_blank" href="https://www.bitforex.com/en/spot/pkoin_usdt">https://www.bitforex.com/en/spot/pkoin_usdt</a> <br> <a target="_blank" href="https://www.digifinex.com/en-ww/trade/USDT/PKOIN">https://www.digifinex.com/en-ww/trade/USDT/PKOIN</a>  <br> <a target="_blank" href="https://pkoin.net/">https://pkoin.net/</a> - здесь приобрести  PKOIN можно за другие криптовалюты. <br>		<a target="_blank" href="https://buy.pkoin.indacoin.io/">https://buy.pkoin.indacoin.io/</a> - здесь приобрести PKOIN можно за кредитную карту.',
							img: '<img src="img/per-to-per.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin2',
							q : 'Pkoin.net  ',
							a : 'Выберите криптовалюту, за которую вы хотите приобрести PKOIN, укажите приобретаемое количество PKOIN а также введите адрес своего кошелька.',
							img: '<img src="img/buy-pkoin2.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin3',
							q : '  ',
							a : 'Адрес вашего PKOIN-кошелька находится в вашем аккаунте на Бастионе. Чтобы его найти – кликните иконку вашего аватара, которая расположена в правом верхнем углу.',
							img: '<img src="img/upl1.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin4',
							q : '  ',
							a : 'Далее кликните по адресу PKOIN, чтобы его скопировать.',
							img: '<img src="img/upl7.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin5',
							q : '  ',
							a : 'Далее, вам нужно ввести адрес вашего PKOIN-кошелька в соответствующее поле и нажать кнопку “Purchase”.',
							img: '<img src="img/buy-pkoin5.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin6',
							q : '  ',
							a : 'После этого вы должны отправить BTC (или другую криптовалюту, которую вы выбрали) на предоставленный вам адрес. ',
							img: '<img src="img/buy-pkoin6.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin7',
							q : ' Купить PKOIN с помощью кредитной карты на <a href="Buy.pkoin.indacoin.io">indacoin.io</a>     ',
							a : 'Во-первых, выберите валюту, введите количество, ваш электронный адрес и адрес кошелька PKOIN. Далее, нажмите «Купить PKOIN»',
							img: '<img src="img/buy-pkoin7.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin8',
							q : '  ',
							a : 'Вы увидите окно «Купить PKOIN с кредитной или дебетовой картой», нажмите  «Далее»',
							img: '<img src="img/buy-pkoin8.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin9',
							q : '  ',
							a : 'Далее, введите ваш адрес, почтовый индекс и укажите вашу страну. ',
							img: '<img src="img/buy-pkoin9.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin10',
							q : '  ',
							a : 'Далее, введите ваше имя, страну, номер телефона, дату рождения',
							img: '<img src="img/buy-pkoin10.jpg" alt="" />'
						},
						{
							id : 'buy-pkoin11',
							q : '  ',
							a : 'Введите номер вашей карты и нажмите «Далее».',
							img: '<img src="img/buy-pkoin11.jpg" alt="" />'
						},
						
						
						
						
					]
				
				},
				{
				
					name : 'Мои видео',
					id : 'Myvideos',
				
					group : [
				
						{
							id : 'Myvideos1',
							q : '  ',
							a : 'Нажмите иконку вашего аватара в правом верхнем углу.',
							img: '<img src="img/prkey1.jpg" alt="" />'
						},
						{
							id : 'Myvideos2',
							q : ' ',
							a : 'Далее, нажмите кнопку «управление»',
							img: '<img src="img/prkey2.jpg" alt="" />'
						},
						{
							id : 'Myvideos3',
							q : '  ',
							a : 'Далее, нажмите «Мои видео»',
							img: '<img src="img/myvid.jpg" alt="" />'
						},
						{
							id : 'Myvideos4',
							q : '  ',
							a : 'Вы окажетесь в видео кабинете, в котором содержится информация о размещенных вами видео, среднем рейтинге, общем количестве просмотров видео, а также настройки видео.',
							img: '<img src="img/Myvideos4.jpg" alt="" />'
						},
						{
							id : 'Myvideos5',
							q : '  ',
							a : 'Если вы хотите изменить описание или заголовок видео, превью видео, нажмите на три точки и выберите необходимое действие.',
							img: '<img src="img/chsec.jpg" alt="" />'
						},
						{
							id : 'Myvideos6',
							q : '  ',
							a : 'В верхней части видеостраницы вы можете увидеть дневные лимиты на загрузку видео, количество реферальных пользователей, общее количество просмотров видео, количество уникальных посетителей, поле для поиска видео, также вы можете произвести сортировку.',
							img: '<img src="img/chsec2.jpg" alt="" />'
						},
	
						
						
					]
				
				}
				

				
				
			],
			fr : [
				{
			
					name : "Comment "+self.app.meta.fullname+" fonctionne-t`il?",
					id : "how-it-works",
			
					group : [
			
						{
							id : "What is it",
							q : "Qu`est-ce que c`est " +self.app.meta.fullname+"?",
							a : "<div><p>" +self.app.meta.fullname+" est un réseau social innovant et une plateforme de partage de vidéos. Contrairement aux réseaux sociaux grand public, il n'y a pas de société derrière cela, il est basé sur le modèle Bitcoin. Bastyon est un projet open source géré par une équipe de développeurs et d'experts, et son objectif est de fournir une plate-forme modérée par la communauté où la liberté d'expression est sérieusement respectée.</p><p>Le projet a été créé à l'origine by Daniel Satchkov, mais englobe désormais plus de 25 développeurs et de nombreux bénévoles à travers le monde. Bastyon est plus un protocole qu'une plate-forme, puisque tout développeur peut y créer sa propre application. La plateforme ne fonctionne pas sur un seul serveur mais sur un réseau de <em>user nodes</em> répartis dans le monde entier.</p><p>Cela signifie que les utilisateurs sont toujours en mesure d'obtenir des informations et communiquer, voir le contenu et publier tant qu'ils ont une connexion Internet et que seule une poignée de nœuds quelque part dans le monde sont opérationnels.</p><p>Cela surmonte les limitations que les censeurs ont mises en place pour bloquer ou limiter la communication et la diffusion de l'information. L'information peut circuler librement. Alors qu'en Chine, par exemple, certains réseaux sociaux ne peuvent être utilisés que derrière un VPN, cela n'est pas nécessaire avec "+self.app.meta.fullname+".</p><p>De plus, "+self.app.meta.fullname+" ne collecte pas d'informations personnelles : les utilisateurs s'enregistrent sans e-mail ni numéro de téléphone et aucune donnée personnelle telle que l'adresse IP ou MAC n'est stockée de quelque manière que ce soit. Notez que même si Bastyon ne collecte aucune IP (comme on peut le voir dans le code ouvert), il n'est pas possible de masquer complètement votre IP lorsque vous utilisez Internet, sauf si vous utilisez un VPN. </p><p> Ce faisant,"+self.app.meta.fullname+" permet aux utilisateurs de discuter librement des problèmes. Aujourd'hui, l'anonymat est une exigence de sécurité et de confidentialité et"+self.app.meta.fullname+" est en mesure de le garantir.</p><p>En outre, afin de fournir une communication totalement privée et anonyme,"+self.app.meta.fullname+" fournit un système de discussion crypté, non associé à un numéro de téléphone ou à des données personnelles, protégé par un modèle de cryptage peer-to-peer (notez que les discussions de groupe ne sont pas cryptées, seulement 1-on -1 tchat). Personne, à l'exception des deux utilisateurs impliqués dans la session de discussion, ne peut accéder aux messages. Toutes les affirmations sont faciles à vérifier, car l'application Bastyon et la blockchain Pocketnet sont toutes deux entièrement open source, avec un code visible par tous. De plus, tous les messages de discussion sont automatiquement supprimés après 7 jours.</p><p>"+self.app.meta.fullname+" est une plate-forme sociale pseudonyme résistante à la censure où les gens peuvent discuter, communiquer et partager du contenu avec d'autres de manière transparente; règles qui sont les mêmes pour chaque utilisateur et développeur.</p></div>",
						},
						
						{
							id : "How does it work",
							q : "Comment puis-je débuter?",
							a : "<div><p>"+self.app.meta.fullname+" est facile à utiliser: vous avez seulement qu'à créer un compte et vous pourrez commencer immédiatement à publier du contenu, suivre d'autres utilisateurs et utiliser le chats.</p><p>Pendant l'enregistrement, vous devez créer un nom d'utilisateur (il doit être unique) et télécharger une image ou une photo (il n'est pas nécessaire que ce soit votre photo!). Aucun courriel (Vous pouvez laisser votre courriel sur la liste d'envoi, mais il ne sera pas connecté à votre compte Bastyon), aucun numéro de téléphone, aucunes vérifications. Même pas de mot de passe: le système génèrera une phrase que vous devrez utiliser pour vous connecter, cette phrase est votre clé secrète qui remplecera votre identifiant et votre mot de passe, la seule chose dont vous avez besoin pour vous connecter. Si vous perdez cette clé secrète. Personne ne peut la retrouvée, même les développeurs n'ont pas accès aux comptes d'utilisateurs.</p></div>",
						},
							
						{
							id : "signback",
							q : "Quelle est la différence entre une paraphrase de 12 mots et une clé secrète?",
							a : "<div><p>La première fois que vous utilisez "+self.app.meta.fullname+" vous devez vous créer un compte, composé seulement de votre identifiant unique.</p><p><strong>Il n'y a pas de mot de passe. </strong></p><p>Au lieu de cela, vous recevrez une phrase de 12 mots (paraphrase). Alternativement, vous pouvez utiliser une clé secrète, qui est un long numéro(les deux sont équivalents). <strong>Gardez cette donnée SURE et ne la révelez jamais à personne.</strong></p><p>Par la suite, lorsque vous devez vous connecter, vous n'avez qu'à entrer la paraphrase(ou scanner le code QR de l'application).</p><p><strong>Remember</strong>: si vous perdez votre phrase, votre compte sera vérouillé à jamais. Il n'existe aucun moyen de restaurer le mot de passe, il n'existe aucun moyen "+self.app.meta.fullname+" de vous connecter. Votre paraphrase ou votre clé secrète sont les seuls moyens d'accèder à votre compte, veuillez l'inscrire sur un morceau de papier quelque part. Vous pouvez le trouver dans votre profil sous l'onglet Comptes (cliquez sur le symbole de clé).</p></div>",
						},
						
						
						{
							id : "behind-scenes",
							q : "Comment cela fonctionne en coulisse? Ou sont les serveurs?",
							a : '<div><p>'+self.app.meta.fullname+' est calqué sur une crypto-monnaie Bitcoin décentralisée, car elle n`a pas d`autorité centrale et utilise la blockchain pour effectuer des transactions et assurer la sécurité.</p><p>Il n`y a pas de serveur central : à la place, la plateforme s`appuie sur un réseau de nœuds , situé partout dans le monde. Chaque personne dans le monde avec un ordinateur peut réellement exécuter un nœud (et être récompensée pour le faire en utilisant des pièces de monnaie avec Pocketcoin).</p><p>Hash de chaque publication, chaque commentaire, chaque interaction (sauf les messages de chat !) est stocké sur la <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. Les publications et les commentaires eux-mêmes ne sont pas dans la blockchain, mais dans une base de données associée liée à une blockchain.</p><p>'+ self.app.meta.fullname +' utilise une blockchain dédiée, dérivée directement de la chaîne Bitcoin.</p></div>',
						},
							
						{
							id : "blocks",
							q : "Qu'arriverait-il si certains pays bloquent l'accès à Bastyon.com?",
							a : "<div><p>Nothing.</p><p>Vous seriez toujours en mesure d'utiliser Bastyon comme si de rien n'était si vous utilisiez une application de bureau, car l'application de bureau Bastyon parle directement aux nœuds et n'utilise pas de sites Web.</p><p>C'est le pouvoir de la résistance à la censure. <br />Vous pouvez le vérifier vous-même en simulant une disparition du nom de domaine bastyon.com. <br /><br /><strong>Under Windows :</strong><br />il suffit d'ouvrir ce fichier :<br />Windows/System32/hosts<br /><br /><strong>Sous Linux/ Ubuntu :</strong><br />Ouvrez ce fichier<br />/etc/hosts<br /><br />Ensuite, ajoutez cette ligne : <br />127.0.0.1 bastyon.com</p><p >Cela garantirait que bastyon.com pointe vers votre machine locale, ce qui signifie qu'il ne pointe vers aucune adresse IP extérieure.<br /><br />Ensuite, lancez l'application de bureau et vous pourrez continuer à utiliser Bastyon a si rien ne s'est passé. <br />Cool hein ?</p></div>",
						}
				
					]
			
				
				},
				
				{
				
					name : self.app.meta.fullname,
					id : "roadmap",
				
					group : [
				
						{
							id : "walletaddresses",
							q : "Je vois une adresse PN et une adresse de porte-feuille... est-ce que ces deux adresses sont sur la blockchain PN?",
							a : "<div>L'adresse PN est celle utilisée pour publier du contenu et utiliser les réseaux sociaux en général. Elle conserve également les pièces que vous gagnez pour vos publications les mieux notées.</div><div>Les adresses de portefeuille doivent conserver le reste des pièces.</div>",
						},
				
						{
							id : "linktoprofile",
							q : 'Est-ce que je peux lier mon profile? ou ma "page"? Pour que je puisse publier dans ma communauté pour apporter plus de gens.',
							a : "<div>Dans le navigateur, accédez à votre profil en cliquant sur l'avatar en haut à droite et cliquez sur Partager, puis cochez la case Utiliser le lien de parrainage, toutes les personnes qui s'inscriront à partir du lien généré se verront proposer de vous suivre automatiquement lors de l'inscription. Pour chaque parrainage qui s'inscrit via votre lien, vous recevrez un bonus égal à 20% du Pocketcoin (PKOIN) qu'ils gagnent en publiant et en commentant pendant les 6 premiers mois. Pour être clair, votre parrainage ne rapporte pas moins, vous bénéficiez d'un bonus.</div>\
								<div>On the desktop, </div>",
						},
						{
							id : "starsystem",
							q : "Le système Star. Est-ce qu'il y a une limite de combien d'étoiles une personne peut donner aux autres?",
							a : "<div>Il y a des limites. Mais au fur que votre réputation augmente, vous pouvez voter de plus en plus. Cela est fait, pour que les robots don&rsquo;t brisent la blockchain. Initiallement, vous recevez 100 notes par 24 hours. A mesure que votre réputation augement (ce qui arrive en publiant et en recevant des notes), vous pourrez obtenir 200 notes par jour.</div>",
						},
				
				
						{
							id : "updateprofiletime",
							q : "À quelle fréquence puis-je mettre mon profil à jour? ",
							a : "<div>Vous êtes en mesure de mettre à jour votre profil à chaque heure.</div>",
						},  
				
						{
							id : "mobileapp",
							q : "Est-ce qu`il y a une application mobile?",
							a : "<div>T=Il y a une application Android, que vous pouvez télécharger ici: https://play.google.com/store/apps/details?id=pocketnet.app  L'application IPhone n'est pas disponible, parce qu'Apple nous demande de censurer du contenu avec un délai de 24 hours. Chez Bastyon, même les développeurs ne peuvent supprimer de contenu, il est modéré par l'utilisateur. Batyon est optimisé pour les navigateurs comme Safari sur le iPhone.</div>",
						},
				
						{
							id : "postinglimit",
							q : "Pouvez-vous me dire quelle est la limite de publications et de notes par jour et heure?",
							a : "<div>Nous avons quelques limitations, mais apres l`avoir testé, nous avons augmenté nos limites. Vous pouvez faire 5 publications et noter 15 fois par 24 heures. Une fois que votre réputation est au-delà de 100, il y a au moins 100 utilisateurs à haute réputation qui peuvent vous notez (or 30 utilisateurs après 3 mois), vous pourrez faire 30 publication et 200 notes, plus 300 commentaires chaque 24 heures.</div>",
						},
				
						{
							id : "reputation",
							q : "Qu`est-ce que la réputation et comment est-elle calculée?",
							a : "<div>Votre réputation est la somme de vos notes calculée de la manière suivante. À noter que les utilisateurs avec une réputation de moins de 50 ne peuvent affecter la réputation des autres ou l'obtention de monnaie. Ils peuvent noter le contenu, mais cela n'affectera pas votre réputation.</div>\
							<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>Donc, si vous avez des notes de 5 étoiles et une note d'une étoile, le total sera de 2+2-2=2</div>",
						},
				
						{
							id : "deletepostoruser",
							q : "Existe-t`il un moyen de supprimer ou modifier une publication?",
							a : "<div>Oui, vous pouvez modifier et supprimer les publications.</div>",
						},
				
						{
							id : "usersearch",
							q : "Est-ce qu`il existe une manière de rechercher un utilisateur?",
							a : "<div>Cliquez sur la loupe dans le coin en haut et recherchez par nom d`utilisateurs ou par mots-clés.</div>",
						},
						{
							id : "follow",
							q : "Comment puis-je suivre quelqu`un?",
							a : "<div>À coté de l`auteur de la publication(sur le dessus de la publication) il y a un lieu pour suivre, vous pouvez trouver ses publications sous les publications Hot (flamme rouge en-haut de la page). Vous pouvez aussi voir Mon Fil d'abonnement, qui sera différent du fil principal. Le fil principal sera tout ce que n'importe qui publie, mais le fil d'abbonnement contiendra seulement les publications des personnes que vous suivez. Donc, vous pouvez aller dans le fil général pour trouver du bon contenu, mais vous pourriez ne pas tout aimer. Par la suite, sélectionnez ce que vous aimer. C'est un peu comme la pêche :)</div>",
						},
				
				
						{
							id : "otherbrowsers",
							q : "Est-ce que cela fonctionne sur les navigateurs Brave ou Duck Duck?",
							a : "<div>"+self.app.meta.fullname+" devrait fonctionner sur ces navigateurs. Il est pleinement fonctionnel sur Chrome et Firefox. Mais nous vous encourageons fortement à télécharger l'application de bureau (prenez "+self.app.meta.fullname+"Setup.exe ici: https://bastyon.com/help?page=applications). L'application de bureau ne pourra jamais être bloquée (même si <%- app.meta.url %> est à l'arrêt ou bloquée). C'est une considération sérieuse dans les pays totalitaires et quasi-totalitaires qui, si on y pense, commencent à inclure de plus en plus le globe.</div>",
						},
				
						{
							id : "replypost",
							q : "Est-ce que nous pouvons répondre à nos propres/et les autres&rsquo;s publications?",
							a : "<div>Oui, vous pouvez commenter sous chaque publication..</div>",
						},
				
						{
							id : "addtags",
							q : "Comment puis-je identifier une publication?",
							a : "<div>Selectionnz une catégorie ou un type dans la barre de recherche et pressez entrer. Pas besoin de spécifier le #, il sera ajouté automatiquement.</div>",
						},
				
						{
							id : "usepublicaddress",
							q : "Comment puis-je utiliser l`adresse publique?",
							a : "<div>Votre adresse publique est ce "+self.app.meta.fullname+" qui est utilisé pour confirmer votre identité. Essentiellement, votre clé privée est un très grand nombre (qui peut être représenté par une séquence de 12 mots ou un code QR). Ce nombre est multiplié par un autre que tout le monde connaît (appelé point de base) et nous obtenons une clé publique. Lorsque vous entrez votre clé privée, nous pouvons la multiplier par le point de base pour obtenir votre clé publique et nous pouvons la comparer à l`adresse publique. S`ils correspondent, nous savons que c`est vous. Il est impossible de revenir en arrière, c`est-à-dire de diviser la clé publique par le point de base pour obtenir votre clé privée. La façon dont la multiplication fonctionne en cryptographie est à sens unique et ne peut pas être inversée, votre clé est donc en sécurité. "+self.app.meta.fullname+" utilise exactement la même cryptographie que Bitcoin.</div>",
						},
						{
							id : "desktopmac",
							q : "Y aura-t-il un exécutable téléchargeable pour Mac?",
							a : "<div>Oui, vous pouvez le trouver ici https://bastyon.com/help?page=applications. </div>",
						},
						{
							id : "dark-mode",
							q : "Comment puis-je changer pour le thème sombre?",
							a : "<div>Si vous êtes sur un navigateur, cliquez sur votre photo de profil > Gérer > Paramètres. Si vous êtes sur mobile, cliquez sur les trois lignes en bas à droite > Paramètres </div>",
						},
						{
							id : "banning",
							q : "Est-ce que les gens peuvent être bannis?",
							a : "<div>Oui, Bastyon est une plate-forme modérée par la communauté, cependant, il n`y a que certains sujets que la communauté signalera comme la pornographie, les stupéfiants et les menaces directes de violence. Vous ne serez jamais banni pour une opinion ou une liberté d`expression, et même pour des sujets interdits spécifiques, il doit y avoir un consensus d`utilisateurs expérimentés sans que d`autres utilisateurs défendent le contenu. Actuellement, les utilisateurs dont la représentation est inférieure à -30 perdent leurs privilèges de compte, mais il s`agit d`un système temporaire. D`ici la fin de 2021, Bastyon lancera un nouveau système de modération dans lequel les publications sont initialement signalées par tout utilisateur de haut niveau, mais le compte ne peut être bloqué que par un certain groupe de jurés sélectionnés à l`aide d`une loterie blockchain. Ainsi, personne ne peut choisir d`attaquer quelqu`un pour un avis, les jurés seront sélectionnés pour modérer certains contenus et ils doivent tous être d`accord. Le compte ne peut pas être interdit jusqu`à ce que deux groupes de jurés aient décidé et ils ne peuvent pas être les mêmes. Ce système protège contre tout type de règle de foule sur Bastyon, tout en protégeant la plate-forme des contenus peu recommandables.</div>",
						},        
						{
							id : "Apple App",
							q : "Est-ce que Bastyon peut être ajouté à Apple?",
							a : "<div>Apple a décidé de ne pas autoriser Bastyon en raison du manque d`opportunités de censure centralisée par Apple, nous le portons comme un insigne d`honneur. </div>",
						},
						{
							id : "Missing PKCOIN",
							q : "À L`AIDE! Il me manque des PKOIN!",
							a : '<div>Si, pour une raison quelconque, il semble que votre PKOIN a disparu, veuillez d`abord vérifier l`explorateur de blocs via<a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> à ce que vos coins soient encore là. Recherchez simplement l`adresse de votre portefeuille dans la barre de recherche et il vous montrera le solde de votre compte. </div>',
						},
				
					]
				
				
				},
				{
				
					name : "Vidéo",
					id : "video",
				
					group : [
						{
							id : "savevideo",
							q : "Oû puis-je sauvegarder ma vidéo?",
							a : "<div>"+self.app.meta.fullname+" utilise une plate-forme open source modifiée appelée PeerTube, connectée à la blockchain Pocketnet et à l`application Bastyon. PeerTube est entièrement intégré avec l`autorisation "+self.app.meta.fullname+", chaque serveur vidéo est enregistré sur la blockchain.</div>",
						},
				
						{
							id : "permissions",
							q : "Qui peut télécharger un vidéo sur Bastyon?",
							a : "<div> Bastyon n`a pas de serveurs centralisés ni de financement par capital-risque, toutes les vidéos sont stockées sur des serveurs gérés par les utilisateurs. Par conséquent, nous ne pouvons pas permettre à tout le monde de charger la vidéo, les serveurs se rempliront rapidement. Pour charger une vidéo, vous devez avoir 5 PKOIN (500 Mo) ou 50 PKOIN (5 Go) sur votre compte. Vous pouvez acheter du PKOIN auprès d`autres utilisateurs si vous sélectionnez une catégorie PKOIN/Peer-to-Peer. </div>",
						},
						{
							id : "stats",
							q : "Oû puis-je voir les statistiques de ma vidéo?",
							a : "<div> Allez sur votre profil et voir MES VIDÉOS. </div> ",
						},
						 {
							id : "technology",
							q : "Quel lecteur utilisez-vous pour lire la vidéo?",
							a : "<div> Bastyon a son propre lecteur, qui est une version considérablement modifiée de PeerTube. Identique à PeerTube, il utilise la technologie WebTorrent pour réduire la charge sur le serveur. Cela signifie que les utilisateurs qui regardent la vidéo la partagent. Notez que dans certains cas, cela signifie que les utilisateurs peuvent voir les adresses IP les uns des autres. Les serveurs Bastyon ne disposent d`aucun mécanisme pour enregistrer ces adresses IP, cependant, si vous vous souciez vraiment d`exposer votre adresse IP, vous devez utiliser un fournisseur VPN fiable. Si vous souhaitez minimiser tout partage peer-to-peer, vous pouvez utiliser la fonction de téléchargement de vidéo dans Bastyon.</div> ",
						},
						{
							id : "taking time",
							q : "Pourquoi est-ce que la vidéo prend du temps à télécharger?",
							a : "<div> Encore une fois, Bastyon n`a pas les ressources dont dispose Google. La vidéo doit être chargée sur l`un des nœuds vidéo et elle doit également être transcodée. N`oubliez pas que YouTube n`est pas gratuit, il extrait de la valeur en utilisant vos informations privées et en les monétisant. Bastyon est géré par la communauté et un petit retard est un petit prix à payer pour la vie privée et la liberté. En outre, les développeurs de Bastyon ont rendu le processus de chargement super facile et beaucoup plus robuste que les autres plates-formes orientées vers la liberté (ils ne font même souvent pas de transcodage pour différentes qualités). </div>",
						},
				
				
					]
				
				},
				
				
				
				{
				
					name : "Pocketcoin",
					id : "pocketcoin",
				
					group : [
				
						
				
						 {
							id : "app-store",
							q : "À quoi peut-on s`attendre pour acheter avec PKOIN?",
							a : "<div>PKOIN a une multitude d`utilisations sur Bastyon. Tout d`abord, 50 PKOIN dans votre compte supprime toutes les limitations de publication et vous permet de charger la vidéo. PKOIN peut être utilisé pour booster les commentaires, rendant vos commentaires visibles pour tout le monde. Le PKOIN des commentaires boostés va au blogueur, et les blogueurs doivent répondre ou présenter de tels commentaires pour encourager de tels boosts. Vous pouvez booster une publication pour la déplacer vers le haut dans le fil. Il est utilisé pour le jalonnement dans des nœuds, vous pouvez exécuter un nœud et gagner plus de PKOIN en jalonnant PKOIN. Il sera utilisé dans un marché publicitaire décentralisé et 100 % des bénéfices seront reversés aux blogueurs. Il sera également utilisé pour acheter des profils de papier peint spéciaux, des images de profil animées, etc. </div>",
						},
				
				
						{
							id : "pocketcoinstock",
							q : "Est-ce que Pocketcoin est comme une action dans "+self.app.meta.fullname+"?",
							a : "<div>Définitivement non. "+self.app.meta.fullname+" n`est même pas une société et n`a aucun droit de propriété. C`est un code open source que n`importe qui peut copier et exécuter. Pocketcoin est un jeton qui facilite l`échange de valeur, en particulier les transactions publicitaires. De plus, "+self.app.meta.fullname+" inclura un marché où les biens et services seront vendus directement pour Pocketcoin</div>",
						},
				
						{
							id : "pocketcoinbuy",
							q : "Est-ce que je peux acheter des Pocketcoin additionnels?",
							a : "<div>Oui, actuellement, vous pouvez acheter des Pocketcoin sur les bourses suivantes : DigiFinex, Bitforex, Mercatox. Vous pouvez également l`acheter pour 19 cryptos différents sur https://pkoin.net/ et il existe une catégorie au sein de Bastyon appelée PKOIN/Peer-to-Peer où vous pouvez l`acheter et le vendre avec d`autres utilisateurs. </div>",
						},
				
						{
							id : "pocketcoinbuyfiat",
							q : "Est-ce que je peux acheter des Pocketcoin pour des Dollars US ou d`autres devises?",
							a : "<div>Oui, vous pouvez l`acheter dans la catégorie PKOIN/Peer-to-Peer ou via une société appelée Indacoin à l`adresse https://buy.pkoin.indacoin.io/ Indacoin n`a rien à voir avec Bastyon, ils vendent simplement du PKOIN à crédit cartes après l`avoir acheté sur les échanges.</div>",
						},
						
						{
							id : "pocketcoinbuyfiat",
							q : "Pourquoi dois-je acheter des Pocketcoin?",
							a : "<div>Bastyon n`a aucun soutien de banquiers ou de capital-risqueurs, c`est une plate-forme sociale décentralisée qui est soutenue par PKOIN. Lorsque vous utilisez Bastyon, vous utilisez des nœuds d`utilisateurs, des nœuds vidéo, ils doivent tous payer pour les ordinateurs, Internet et l`électricité. Les blogueurs doivent gagner pour le contenu. Bastyon ne peut fonctionner que si les utilisateurs possèdent et prennent en charge PKOIN. Ainsi, acheter PKOIN est un moyen de soutenir la décentralisation et la liberté. Cependant, il existe une autre raison importante de posséder Pocketcoin. Bientôt, il est très possible que même avoir un compte bancaire soit lié à la soumission de votre liberté, à un code QR. Pocketcoin n`est pas lié à votre nom ou à votre passeport, c`est un moyen de faire du commerce dans un monde où règne la censure financière, c`est peut-être le seul moyen d`acheter de la nourriture bientôt sans un certain certificat ou un code QR. Alors, achetez du PKOIN pour la liberté. </div>",
						},
					]
				},
				{
				
					name : "Confidentialité",
					id : "privacy",
				
					group : [
						
				
						{
							id : "anonymous",
							q : "Est-ce que les personnes qui n`entrent pas leurs vrais noms sont anonymes?",
							a : "<div>Oui - aucun nom, téléphone, e-mail n`est connecté à votre compte de quelque manière que ce soit, il est simplement entré en option pour recevoir les mises à jour de la newsletter.</div>",
						},
				
						{
							id : "viewoutside",
							q : "Est-ce que quelqu`un peut voir un profil (someone&rsquo;s posts) hors du jardin? Is it a walled garden?",
							a : "<div>Étant donné que l`ensemble de la blockchain et toutes les publications sont en open source, tout le monde peut avoir accès à vos publications et à votre profil. Ils savent juste qu`il est lié à votre adresse publique. En pratique, vous pouvez avoir plusieurs comptes et basculer entre eux. Vous pouvez en utiliser certains avec votre vrai nom et d`autres de manière anonyme. L`anonymat est un excellent outil pour protéger la liberté d`expression contre les abus de pouvoir.</div>",
						},
				
				
						{
							id : "walletid",
							q : "Ma clé publique ressemble-t-elle à un identifiant de portefeuille que j`entre sur mon profil et auquel les gens peuvent envoyer des points ?",
							a : "<div>Exactement. Et il est sécure de la réveler. Mais pas la phrase secrète -gardez-la pour vous!</div>",
						},
				
						{
							id : "runnode",
							q : "Puis-je exécuter un nœud sur mon serveur headless ?",
							a : "<div> Les instructions sont ici https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md </div>",
						},
				
						{
							id : "signback",
							q : "Comment puis-je me reconnecter?",
							a : "<div>Vous pouvez utiliser une clée privée de 12 caractères consituées de chiffres et de lettres.</div>",
						}
					]
				},
				{
				
					name : "Curation du contenu",
					id : "curation",
				
					group : [
				
						{
							id : "content",
							q : "Est-ce qu`il y a du contenu autorisé sur "+self.app.meta.fullname+"? Si du contenu n`est pas autorisé, est-ce que la plate-forme peut être quand même appelé libre d`expression?",
							a : "<div>C`est une question très importante. Pour commencer, tous les types de contenu ne sont pas autorisés. Cependant, et cela est crucial, l`application est transparente et relève de la communauté de la manière que nous expliquerons ci-dessous. L`application est effectuée par la communauté et est ouverte, sans interdiction cachée ni interdiction sélective pratiquée par la Silicon Valley.</div>",
						},
						{
							id : "specific",
							q : "Caractéristiques de la curation "+self.app.meta.fullname+".",
							a : "<div> Actuellement, la modération du contenu se fait par le biais de votes 1 étoile par des utilisateurs de haute réputation. Lorsque la réputation atteint -30, l`accès au compte est restreint. Cependant, il existe un tout nouvel algorithme de modération qui sera publié d`ici la fin de 2021. Sous les nouveaux algorithmes, il y aura une option pour signaler un utilisateur ou un message par n`importe quel utilisateur de haute réputation, mais cela ne va pas affecter le compte directement. Après un certain nombre de drapeaux, une loterie sur la blockchain sera tirée et un groupe de modérateurs jurés sera choisi pour ce compte. Les jurés doivent convenir que cet utilisateur a publié de la pornographie, des stupéfiants ou une menace directe de violence. Tout autre avis ou désaccord ne constitue pas un motif de signalement ni de sanction.</div> ",
						},
							{
							id : "reciprocal",
							q : "Est-ce que le vote reciproque est autorisé?",
							a : "<div> La réciprocité est un comportement humain normal, donc en ce sens, cela ne pose aucun problème. Cependant, les mécanismes de conservation dépendent fortement du fait que les notes élevées et faibles sont liées au contenu et ne sont pas réciproques. Ainsi, Bastyon limitera les votes réciproques de deux manières. Premièrement, vous ne pourrez pas retourner un vote cinq étoiles ou une étoile dans un certain délai. En outre, ceux qui menacent de se venger d`une étoile ou promettent une récompense pour cinq étoiles sont considérés comme se livrant à un comportement interdit. D`autres utilisateurs peuvent signaler de tels cas et une loterie pseudo-aléatoire créera un jury pour le juger. Bien qu`un tel comportement n`entraîne pas les mêmes sanctions qu`un contenu illicite, les utilisateurs qui l`utilisent peuvent se voir imposer des blocages temporaires par l`algorithme de consensus de nœud. </div> ",
						},
						{
							id : "racism",
							q : "Note importante sur le racisme.",
							a : "<div>La liberté de pensée et la liberté d`expression sont attaquées sur les plateformes sociales grand public et dans les médias. Nous devons dire la vérité et cette plate-forme n`est pas une entreprise et est décentralisée pour cette raison même. Mais nous demandons à chacun de faire valoir son point de vue sans attaquer la nationalité ou la race des gens. Vous pouvez faire valoir votre point de vue sur la base de preuves. Nous ne pouvons pas nous permettre de transformer "+self.app.meta.fullname+" en une plate-forme marginale. Dites la vérité, mais évitez s`il vous plaît le racisme et les attaques contre des nationalités spécifiques dans l`ensemble. Nous savons que la Silicon Valley et les MSM ont fait de la question du racisme leur carte à jouer et ils crient constamment au loup. C`est encore plus la raison pour laquelle nous devons être mesurés et fondés sur des preuves et ne pas les laisser nous salir avec cela. Si ce n`est pas le cas, nous ne permettons pas à la plupart de la population d`évaluer les preuves de la corruption des HSH présentées sur "+self.app.meta.fullname+". Veuillez garder cela à l`esprit, afin que la liberté d`expression puisse prospérer et que nous puissions battre les facebokks du monde.</div><div>En fin de compte, c`est la communauté qui déterminera la direction de la plate-forme. Avoir un tas de flocons de neige qui se plaignent de choses qui les offensent est tout aussi mauvais que lorsque les gens veulent exprimer des menaces violentes directes. Cependant, la première indication est que les premiers utilisateurs de la plate-forme sont généralement intelligents et basés sur des preuves, donc l`avenir s`annonce incroyablement brillant. L`équipe "+self.app.meta.fullname+" a remarqué après quelques jours de test bêta, que nous avons arrêté de lire même les nouvelles alternatives, car il y avait tellement de contenu intéressant sur "+self.app.meta.fullname+". Continuez comme ça !</div><div>Veuillez vous impliquer dans la discussion sur ces sujets. Il s`agit d`une plateforme communautaire. Nous sommes toujours désireux d`améliorer la transparence de la plate-forme et vous devez nous faire savoir comment nous pouvons améliorer notre curation de contenu et notre police. Vous pouvez publier des articles sur ce sujet sous le tag Bastyon/Pocketnet.</div>",
						},
				
				
					]
				
				},
				
				
				{
				
					name : "Comment "+self.app.meta.fullname+" est-il différent de...",
					id : "differents",
				
					group : [
				
						{
							id : "differents1",
							q : "Twitter, Facebook, Reddit & d`autres plate-formes centralisées?",
							a : "<div>Il n`y a pas d`autorité centrale ou de corporation. La plate-forme est gérée par des nœuds égaux sur une blockchain. Tous les revenus sont répartis entre les opérateurs de nœuds et les créateurs de contenu. Les opérateurs de nœuds misent sur Pocketcoin afin de créer des blocs avec des récompenses et des frais de transaction. La moitié des récompenses de chaque bloc vont aux créateurs de contenu en fonction des évaluations que leur contenu recueille auprès des utilisateurs.</div>",
						},
						{
							id : "differents2",
							q : "Des plate-formes décentralisées comme Minds.com et Sola?",
							a : "<div>Ces deux plates-formes, bien qu`excellentes, ne sont pas autonomes. Les deux dépendent fortement de la plate-forme Ethereum, car leurs jetons sont basés sur la norme ERC-20 Ethereum. Cela signifie que les opérations avec des jetons entraînent des frais de gaz Ether. De plus, ces entités ont des sociétés derrière elles et une société sera toujours un point de centralisation en raison de sa logique économique de croissance des profits. De plus, les entreprises sont extrêmement faciles à censurer.</div>",
						},
						{
							id : "differents3",
							q : "De Steemit?",
							a : "<div>Steemit a sa propre blockchain, mais est une personne morale avec toute la centralisation qui en découle.</div>",
						},
						{
							id : "differents4",
							q : "Des plate-formes décentralisées comme Mastodon et autres?",
							a : "<div>Bien que Mastodon soit une plate-forme entièrement décentralisée, son utilisation nécessite de nombreuses connaissances techniques. Cela présente un grand obstacle à une acceptation généralisée potentielle. "+self.app.meta.fullname+" propose des applications Web et de bureau et les utilisateurs peuvent se connecter à partir de n`importe quel appareil, extraire leurs paramètres personnels de la blockchain et commencer à utiliser la plate-forme immédiatement sans aucune connaissance technique.</div>",
						}
				
					]
				
				},
				
				{
				
					name : ""+self.app.meta.fullname+" écosysteme",
					id : "ecosystem",
				
					group : [
				
						{
							id : "ecosystem1",
							q : "Comment le développement de "+self.app.meta.fullname+" est-il financé?",
							a : "<div>"+self.app.meta.fullname+" est open source et est actuellement géré par le groupe d`experts bénévoles en programmation et en mathématiques. Après le lancement, "+ self.app.meta.fullname +" attirera les meilleurs talents en programmation sur la base de sa promesse de créer un réseau social décentralisé et équitable. Programmeurs et spécialistes du marketing travaillant pour Pocketcoin donnés par de grands propriétaires de PKOIN.</div>",
						},
						{
							id : "ecosystem2",
							q : "Qu`est-ce que Pocketcoin?",
							a : "<div>Pocketcoin est un jeton de réseau. Il est utilisé exclusivement pour acheter de la publicité auprès des contributeurs de " +self.app.meta.fullname+ " et pour payer les frais de transaction pour de tels paiements. Il est également utilisé pour booster les commentaires, les publications et pour acheter des privilèges pour votre compte. Dans Pocketent, tous les revenus sont répartis entre les créateurs de contenu et les nœuds.</div>",
						},
						{
							id : "ecosystem3",
							q : "Comment les créateurs de contenu et les opérateurs de nœuds sont-ils récompensés?",
							a : "<div>"+self.app.meta.fullname+" propose un marché direct unique où les créateurs de contenu peuvent vendre de la publicité aux acheteurs d`annonces. Les créateurs de contenu fixent leur prix et peuvent accepter des publicités produites en série ou peuvent proposer des emplacements personnalisés de grande valeur (les créateurs présentent le produit à leur manière). Direct Marketplace est essentiellement un échange publicitaire qui permet aux acheteurs d`nnonces de cibler des publics spécifiques sans aucun intermédiaire. Tous les achats d`annonces et les annonces elles-mêmes sont liées sur la blockchain, donc l`achat d`annonces est totalement sans confiance.</div>",
						},
						{
							id : "ecosystem4",
							q : "Et si les utilisateurs publients du contenu illégal, de la pornographie ou des SPAM?",
							a : "<div>"+self.app.meta.fullname+" n`est pas une plate-forme darknet ou une sorte de pornhub. Bien qu`il soit décentralisé et résistant à la censure, il est modéré par les utilisateurs. Tout contenu illégal est signalé et supprimé de la plateforme. Cela signifie que les utilisateurs ayant la plus haute réputation peuvent modérer la plate-forme. Cependant, des garanties sont en place (dans le code source ouvert) du même groupe ou de groupes très similaires de personnes votant à plusieurs reprises du contenu hors de la plate-forme. Les modérateurs du contenu sont choisis au hasard à l`aide d`une loterie sur la blockchain pour éviter tout type de règle de foule. De plus, les utilisateurs sont explicitement encouragés à faire du contenu illicite, PAS simplement le contenu qu`ils trouvent offensant. Pour vous assurer que "+self.app.meta.fullname+" est une plate-forme de liberté d`expression, nous vous encourageons à commencer à participer, à développer votre réputation et à contrôler correctement la plate-forme sans la censure actuellement répandue dans les médias sociaux centralisés.</div>",
						},
						{
							id : "ecosystem5",
							q : "Qui gère "+self.app.meta.fullname+"?",
							a : "<div>Aucune personne morale ou personne physique ne possède ou ne contrôle le " +self.app.meta.fullname+ ". La blockchain Pocketnet et Bastyon sont gérés par un groupe de programmeurs, mais ce groupe grandit et change tout le temps. Si un groupe de programmeurs prend une mauvaise direction et viole les principes sur lesquels Bastyon est fondé, d`autres programmeurs peuvent simplement forger un code open source et continuer la plate-forme résistante à la censure. </div></div>",
						},
						
					]
				
				}
				
				
			]
		}

		self.app.meta.fullname;

		var mp = {};

		var actions = {
			question : function(id){


				var _el = el.c.find('.faqcnt .question[question="'+id+'"]')

				_scrollToTop(_el, null, null, -110)


				_el.addClass('opened')
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
						app : self.app
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

				var k =  self.app.localization.key;

				if(!faqLangs[k]) k = 'en';

				var faqcontent = faqLangs[k];
				
				if (!window.cordova){

					faqcontent[0].group.splice(1, 0, {
						id : 'downloadandroid',
						q : self.app.localization.e('e14109'),
						a : `<div><a elementsid="https://play.google.com/store/apps/details?id=pocketnet.app" href="https://play.google.com/store/apps/details?id=pocketnet.app">https://play.google.com/store/apps/details?id=pocketnet.app</a></div><div>${self.app.localization.e('e14110')}</div>`,
					})
				}

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

				setTimeout(function(){
					if (id) 
						actions.question(id)
				}, 300)
				

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
