var faqcontent = [
    {
		
        name : 'How does '+self.app.meta.fullname+' work?',
        id : 'how-it-works',

        group : [

            {
                id : 'what-is',
                q : 'What is ' +self.app.meta.fullname+'?',
                a : '<div><p>' +self.app.meta.fullname+' is an innovative social network and video sharing platform. Unlike the mainstream social networks, it is not ruled by a company. It is an open source project run by a team of developers and experts, and its scope is to provide a censorship-free platform where the freedom of speech is seriously respected.&nbsp;</p><p>The project was created by&nbsp;Daniel Satchkov and is a decentralized social media platform without any central authority. The platform does not run on a single server but on a network of <em>nodes</em> that are located all throughout the world.&nbsp;</p><p>This means, in practical terms, that users are always able to connect to it, see the content and post as long as they have an internet connection.</p><p>This overcomes the limitations that some governments put in place to block or limit the use of social medias. While for example in China some social networks can be used only behind a VPN, there is no need for that with '+self.app.meta.fullname+'.&nbsp;</p><p>In addition,&nbsp;'+self.app.meta.fullname+' grants complete anonymity: users register without any email or phone number and no personal data like the IP or MAC address are stored in any way.&nbsp;</p><p>By doing so,&nbsp;'+self.app.meta.fullname+' removes the chance for governments to track specific users and to associate an identity to users. Today, anonymity is a requirement for security and privacy and&nbsp;'+self.app.meta.fullname+' is able to guarantee it.&nbsp;</p><p>Furthermore, in order to deliver completely private and anonymous communication,&nbsp;'+self.app.meta.fullname+' provides an encrypted chat system, not associated to any phone number or personal data, protected with 1 to 1 encryption model. No one except the two persons involved in the chat session can access the messages and governments have no way to look into the database since the communication is encrypted and there are no backdoors and no "master keys" that can be used for decryption. Moreover, all the chat messages are automatically deleted after 7 day.</p><p>'+self.app.meta.fullname+' wants to deliver a completly free, safe and anonymous social platform where people can chat, communicate and share contents without the risk of being controlled, limited or censored by governments or corporations.</p></div>',
            },
            
            {
                id : 'how-it-words',
                q : 'How does it work?',
                a : '<div><p>'+self.app.meta.fullname+' is pretty simple to use: you just have to create an account and you can immediately start posting contents, follow other users and chat.</p><p>During the registration you just need to create a username (it must be unique!) and upload a picture or a photo (not necessarily your own photo!). No email, no phone number, no verifications. Not even a password: the system will generate a passphrase that you have to use to login.&nbsp;</p></div>',
            },
                
            {
                id : 'signback',
                q : 'How do I register and log in?',
                a : '<div><p>The first time you use '+self.app.meta.fullname+' you need to create an account, composed only of your unique username.</p><p><strong>There is no password. </strong></p><p>Instead, you will be given a unique 12-words key (passphrase) and a QR code. <strong>Keep this data safe and NEVER reveal it to anyone.</strong></p><p>Then, when you need to log in, you just need to input your passphrase (or scan the QR from the app).&nbsp;</p><p><strong>Remember</strong>: if you lose your passphrase, your account is locked forever. There is no way to restore the password, there is no way for '+self.app.meta.fullname+' to let you log in again. Your passphrase and QR code are the only ways to access your account.&nbsp;</p></div>',
            },
            
            
            {
                id : 'behind-scenes',
                q : 'How does it work behind the scenes? Where are the servers?',
                a : '<div><p>'+self.app.meta.fullname+' is modelled on the style of cryptocurrency (like Bitcoin and Ethereum), because it has no central authority and uses the blockchain to make transactions and ensure security.&nbsp;</p><p>There is no central server: instead, the platform relies on a network of nodes, located all over the world. Every person in the world with a computer can actually run a node (and be rewarded to do so).&nbsp;</p><p>Each post, each comment, each interaction (except chat messages!) is stored on the <a href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. This means that there is no way to remove a post or to censor it. Every post is and will always be available on the blockchain and no authority, government or corporation can remove it.</p><p>'+self.app.meta.fullname+' usesa dedicated blockchain, derived directly from the Bitcoin chain.&nbsp;</p></div>',
            },
                
            {
                id : 'blocks',
                q : 'What would happen if my government blocks access to Bastyon.com?',
                a : '<div><p>Nothing.</p><p>You would still be able to use Bastyon as if nothing happened.</p><p>This is the power of censorship resistance. <br />You can verify this yourself by simulating a disappearance of the domain name bastyon.com. <br /><br /><strong>On Windows:</strong><br />just open this file:<br />Windows/System32/hosts<br /><br /><strong>On Linux/Ubuntu:</strong><br />Open this file<br />/etc/hosts<br /><br />Then add this row: <br />127.0.0.1 bastyon.com</p><p>This would ensure that bastyon.com is pointing to your local machine, which means that it is not pointing to any outside IP address.<br /><br />Then launch the desktop app and you will be able to continue using Bastyon has if nothing happened. <br />Cool huh?</p></div>',
            }
    
        ]

    
    },
    {

        name : 'Desktop app, mobile app and Web version',
        id : 'download',
    
        group : [
            {
                id : 'download',
                q : 'Can I use '+self.app.meta.fullname+' from my browser or should I download an app?',
                a : '<div>You can use '+self.app.meta.fullname+' from your browser. However, to improve the security and anonymity we strongly recommend to download the app on your phone (Android) or on your computer (Windows, MacOS or Linux/Ubuntu). See the next questions for the instructions.</div>',
            },
            {
                id : 'downloadclient',
                q : 'Where do I download the client?',
                a : '<div><p>If you would like to install '+self.app.meta.fullname+' on your computer, you can download the client from this page: <a href="https://github.com/' +self.app.meta.fullname+'team/'+self.app.meta.fullname+'.gui/releases/latest">https://github.com/'+self.app.meta.fullname+'team/'+self.app.meta.fullname+'.gui/releases/latest</a></p><div>Depending on your operating system make sure to download and install the proper file:</div><ul><li>For Window: select&nbsp;'+self.app.meta.fullname+'Setup.exe</li><li>For Mac OS: select&nbsp;'+self.app.meta.fullname+'Setup.dmg</li><li>For Linux/Ubuntu: select&nbsp;'+self.app.meta.fullname+'Setup.deb</li></ul><p>For Android devices you can download '+self.app.meta.fullname+' from Google Play</p><p><a href="https://play.google.com/store/apps/details?id='+self.app.meta.fullname+'.app&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="194" height="75" /></a></p><p>You can also download the source code and compile your own version.&nbsp;</p><p>Please remember that '+self.app.meta.fullname+' is Open Source and you can find the complete documentation and source code <a href="https://github.com/'+self.app.meta.fullname+'team">on GitHub.</a></p><p>We strongly recommend installing the app to use '+self.app.meta.fullname+' instead of passing through the website, for increased security and privacy.&nbsp;</p></div>',
            },
            
            
            {
                id : 'iPhone-App',
                q : 'When will '+self.app.meta.fullname+' have a mobile app for iOS?',
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
                q : 'Can I share a link to my profile or my "page"? I would like to bring my friends / followers on '+self.app.meta.fullname+'',
                a : '<div>Definitely.<div>Just follow these steps (valid for the Android app, the Desktop app and the Web-browser app):</div><ol><li>Go to your profile by clicking on your Avatar</li><li>Click on the "Share" icon and you will see a list of options to share your profle.&nbsp;</li><li>Share it with your friends and followers. You will automatically get rewarded (NOTE: MISSING FAQ ABOUT REWARDS)</li></ol></div>',
            },
            
            {
                id : 'starsystem',
                q : 'How does the "star rating" system works? Is there a limit on how many stars a person can give?',
                a : '<div>The Star rating is used in '+self.app.meta.fullname+' to "like" and "dislike" videos and posts.</div><div>Each post and video can be rated by every user, from 1 to 5. There are some limitations to the number of stars that you can give. For example, new users can rate up to 15 posts per day. However, you can give more stars&nbsp;as your reputation grows. The more you get rated, the more your reputation grows (NOTE: MISSING FAQ ABOUT REPUTATION)</div></div>',
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
                a : '<div>On '+self.app.meta.fullname+' we have some limitations, in fact. New users can create 5 posts each date and give 30 start rating per day. Once your reputation grows, the limits become higher.</div>',
            },
    
            {
                id : 'reputation',
                q : 'What is the "Reputation" and how is it calculated?',
                a : "<div>Your reputation is the sum of your ratings calculated in the following way.</div><div>&nbsp;</div><table><tbody><tr><td>Star Rating</td><td>Reputation Points</td></tr><tr><td style='text-align: center;'>5</td><td style='text-align: center;'>2</td></tr><tr><td style='text-align: center;'>4</td><td style='text-align: center;'>1</td></tr><tr><td style='text-align: center;'>3</td><td style='text-align: center;'>0</td></tr><tr><td style='text-align: center;'>2</td><td style='text-align: center;'>-1</td></tr><tr><td style='text-align: center;'>1</td><td style='text-align: center;'>-2</td></tr></tbody></table><div>&nbsp;</div><div>So, if one post has two 5 stars ratings and one 2 stars rating, the total for that post will be 2+2-1=3. Your reputation will therefore be increased by 3.</div><div>&nbsp;</div><div>Note: users with reputation below 50 do not affect anyone's reputation or coin winnings. They can rate the content, but it does not affect reputation.</div><div>&nbsp;</div>",
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
                a : '<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. <br>The main feed will show all the posts, in chronological order, on '+self.app.meta.fullname+'. Subscriptions feed will only contain posts from people you follow. So you can use the general feed to search for good content, however you may not like everything. Then you can select those you want to keep (follow). <br>Just like fishing in your own pond :)</div>',
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
                a : '<div>PKOIN is the <strong>network token</strong> used by '+self.app.meta.fullname+'.</div><div>It is a Cryptocurrency that relies on its own Blockchain.</div><div>&nbsp;</div><div>PKOIN emission depends on the number of users of '+self.app.meta.fullname+' and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In&nbsp;'+self.app.meta.fullname+' all of the revenue is split between content creators and owners of nodes.<br>From your Profile page you can see your account balance: you will get PKOIN based on the number of likes your receive and on several other actions. You can receive and send PKOIN from your profile page. PKOIN can be also converted to other cryptocurrencies and to fiat money (USD, EUR...) from some exchanges that support this function.<br> Your Account has an Account address and several Wallet addresses (see the next questions for more details).</div>',
            },
            
            {
                id : 'walletaddresses',
                q : 'I see an "Account address" and several "Wallet addresses". Are all these addresses on the PN blockchain?',
                a : '<div>The <strong>Account address</strong> is the main address used by '+self.app.meta.fullname+' and it is where you PKOIN are added when your posts get voted, for example. It is mainly for internal use inside '+self.app.meta.fullname+'. You can instead use the other <strong>Wallet addresses</strong> to receive and store PKOIN separately. These addresses are NOT used by '+self.app.meta.fullname+', they are your own private wallets.</div>',
            },
            
                        
            {
                id : 'walletid',
                q : 'Is my public key like a wallet ID that I enter on my profile and people can send PKOIN to?',
                a : '<div>Exactly. The Public Key is safe to reveal. However, remember that the Secret phrase is personal and it is exclusively yours. Keep it safe and NEVER reveal it to anyone!</div>',
            },

    
            {
                id : 'pkoin-usage',
                q : 'What can I purchase with PKOIN?',
                a : '<div>Soon there will be a way to boost posts in the feed and to Top Posts using PKOIN. In addition, there will be special emojis, themes and badges. In addition, PKOIN will be used for advertising within '+self.app.meta.fullname+'. <p>Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities.</p><p>This will be a trustless endeavor (neither side can cheat), because of "multi-signature contracts".</p><p>Multi-signature contracts require a digital signature of both parties to be valid:</p><ol><li>When an advertiser offers an ads to the content creator, he creates the first of two required signatures.</li><li>He signs the actual ads and the amount bid.</li><li>The Content creator reviews this partially signed contact.</li><li>If he accepts, he appends the second signature.</li><li>When the blockchain detects both signatures, the content creator is automatically paid and an the ads is shown on creator&rsquo;s channel.</li></ol><p>These transactions will only be done through PKOIN.&nbsp;</p><p>Finally, you can convert your PKOIN to other Cryptocurrencies on several exchanges.</p></div>',
            },
                
            {
                id : 'Missing PKCOIN',
                q : 'Help! I am missing my PKOIN!',
                a : '<div>If for some reason it seems like your PKOIN has gone missing, please first check the blockexplorer via<a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> to verify whether your coins are still there. Just search your wallet address in the search bar and it will show you the balance of your account along with all the transactions. <br>If you have questions, contact our official page on '+self.app.meta.fullname+'</div>',
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
    
        name : 'Contents and freedom of speech',
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
                a : '<div>We know that free thought and free speech is under attack on mainstream social platforms and in the media.</div><div>&nbsp;</div><div>We need to speak the truth and this platform is non-corporate and decentralized for that very reason.</div><div>&nbsp;</div><div>But we ask everyone to make your point without attacking people&rsquo;s nationality or race.</div><div>You can make your point based on evidence.</div><div>&nbsp;</div><div>We cannot afford to turn '+self.app.meta.fullname+' into a marginal platform.</div><div>Speak the truth, but please avoid racism and attacks against specific nationalities on the whole.</div><div>Let&rsquo;s be honest and clear: you have no credit or blame for the color of your skin.&nbsp;</div><div>&nbsp;</div><div>We know that Silicon Valley and mainstream social media have turned the issue of racism into their playing card and they constantly use this topic to ban users and posts.</div><div>&nbsp;</div><div>Even more, for this reason, we should be measured and discuss on evidence-based facts.</div><div>&nbsp;</div><div>If we are not, if we tolerate irrational racism, we are just dogs barking at the corner of the room. If we want to let people evaluate the corruption of values of traditional medias we should discuss on facts, evidences and data. No irrational politically correct, but no prejudices and biases.</div><div>&nbsp;</div><div>Please keep that in mind, so that free speech can thrive and we can overcome the traditional social medias.</div><div>&nbsp;</div><div>Ultimately, it is the community that will determine the direction of the platform.</div><div>Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats.</div><div>&nbsp;</div><div>However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright.</div><div>&nbsp;</div><div>'+self.app.meta.fullname+' team has noticed, just after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on '+self.app.meta.fullname+' itself.</div><div>&nbsp;</div><div>Keep it up!</div><div>&nbsp;</div><div>Please get involved in the discussion on the topics that interest you: This is a community platform and we want our users to participate.</div><div>&nbsp;</div><div>We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic.</div>',
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
        id : 'differences',
    
        group : [
    
            {
                id : 'differences1',
                q : 'How is '+self.app.meta.fullname+' different from Twitter, Facebook, Reddit and other platforms?',
                a : '<div>Unlike the mainstream platforms, there is no central authority or corporation behind '+self.app.meta.fullname+'.</div><div>&nbsp;</div><div>In addition, the platform does not run on a single server controlled by a company: it runs on "nodes" on a blockchain. The "nodes" are distributed worldwide and can be directly accessed, without passing through a website.</div><div>This is crucial, since it guarantees that everyone can access the platform at any time, even if the website is down, not available or blocked in his country.</div><div>&nbsp;</div><div>Furthermore, since no corporation controls '+self.app.meta.fullname+', there is no way to censor users and there is no way for a government to force the plaform to remove unwanted contents.</div><div>Likewise, since everything is anonymous, governments cannot track users and know the identity of people using '+self.app.meta.fullname+".</div><div>&nbsp;</div><div>Finally, all the revenue generated is split between node operators and content creators. There are no shareholders. Half of the PKOIN generated in each block go to content creators based on their content's ratings.&nbsp;</div><div>&nbsp;</div><div>So,&nbsp;"+self.app.meta.fullname+" is a decentralized platform controlled by its own users.</div>",
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
                id : 'ecosystem5',
                q : 'Who runs the '+self.app.meta.fullname+'?',
                a : '<div>There is no corporate entity or single individual who owns or controls '+self.app.meta.fullname+'.</div><div>&nbsp;</div><div>It is an open source project that involves tens of developers, mathematicians and economists from all over the world. The platform runs on a network of decentralized nodes. As a consequence it is impossible to one entity, company or government to impose its censorship or limits.</div>',
            },
            
        ]
    
    }
    
    
]
