var faqcontent = [

	/*{
			
					name : 'Technical',
					id : 'technical',
				
					group : [
				
						{
							id : 'downloadclient',
							q : 'Where do I download the client?',
							a : '<div><a href="https://github.com/pocketnetteam/pocketnet.gui/releases/latest">https://github.com/pocketnetteam/pocketnet.gui/releases/latest</a></div><div>Click on '+self.app.meta.fullname+'Setup.exe</div>',
						},
						
						{
							id : 'downloadclient',
							q : 'Where do I download the node?',
							a : '<div><a href="https://github.com/pocketnetteam/pocketnet.core/releases/latest">https://github.com/pocketnetteam/pocketnet.core/releases/latest</a></div><div>With any questions email core@pocketnet.app</div>',
						}
				
					]
				
				},*/
		{
	
			name : self.app.localisation.e('e14003'),
			id : 'technical',
	
			group : [
	
				{
					id : 'downloadclient',
					q : 'Where do I download the client?',
					a : '<div><a href="https://github.com/pocketnetteam/pocketnet.gui/releases/latest">https://github.com/pocketnetteam/pocketnet.gui/releases/latest</a></div><div>Click on PocketnetSetup.exe</div>',
				}
	
	
			]
	
		},
	
		{
	
			name : 'Pocketnet Roadmap',
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
					a : '<div>In the browser, go to your profile by clicking on avatar in the upper right and just copy the browser address, everyone who will sign up from that link will follow you automatically and you will actually get rewards.</div>\
						<div>On the desktop,  from a desktop application go to your profile,  once there, there will be three icons to the right of your avatar first there will be a wallet with number of coins, then a bell with notifications and a third is a green cross icon click on that green cross  and click copy,  send that link around everyone who subscribes will follow you and you will get rewards.</div>',
				},
				{
					id : 'starsystem',
					q : 'The star system. is there a limit on how many stars a person has to give people?',
					a : '<div>There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you can 10 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 45 ratings a day.</div>',
				},
	
	
				{
					id : 'updateprofiletime',
					q : 'How long until I&rsquo;m able to update my profile? ',
					a : '<div>You are able to update your profile once every hour.</div>',
				},
	
	
				{
					id : 'linuxdesktop',
					q : 'Is there a Linux Desktop?',
					a : '<div>Yes! It is in the works 2-3 weeks as the beta test progresses.</div>',
				},
	
				{
					id : 'savevideo',
					q : 'Where do you save the video content?',
					a : '<div>We are working on video storage, in the meantime you can share from Bitchute, Youtube, Vimeo and other video sources.</div>',
				},
	
	
				{
					id : 'mobileapp',
					q : 'Is there a mobile app?',
					a : '<div>Mobile app is not ready yet. We plan it for June 2019. But we strongly encourage everyone to also download the desktop app, since, unlike Android or iPhone app, it cannot be taken away from you by Google or Apple.</div>',
				},
	
				{
					id : 'postinglimit',
					q : 'Can you tell me what is the limit for posting each day or hour?',
					a : '<div>We do have some limitations, but after testing it we have increased our limits. At the outset you can make 15 posts and issue 45 ratings every 24 hours. Once your reputation grows above 50, you will be able to make up to 30 posts and 90 ratings every 24 hours.</div>',
				},
	
				{
					id : 'reputation',
					q : 'What is reputation and how is it calculated?',
					a : '<div>Your reputation is the sum of your ratings calculated in the following way.</div>\
					<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>So, if you have two 5 start ratings and one 1 star rating, the total will be 2+2-2=2</div>',
				},
	
				{
					id : 'deletepostoruser',
					q : 'Is there a way to delete or edit a post?',
					a : '<div>Not at this point, as it is baked into blockchain. However, we are working on a feature to create an overwrite transaction as well &#10075;hide&#10076; transaction, which would effectively translate to edit or delete.</div>',
				},
	
				{
					id : 'usersearch',
					q : 'Is there a way to search for a user?',
					a : '<div>We are going to release this feature before the end of March.</div>',
				},
				{
					id : 'follow',
					q : 'How do you follow someone?',
					a : '<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts chronologically, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)</div>',
				},
	
	
				{
					id : 'otherbrowsers',
					q : 'Can it be used on Brave or Duck Duck go browsers?',
					a : '<div>Those browsers are not yet fully supported. Our developers are aware of the issue and are working on making pocketnet work on them. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app. It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.</div>',
				},
	
				{
					id : 'replypost',
					q : 'Can we reply to our own/and other&rsquo;s posts?',
					a : '<div>That feature is being worked on by our developers. No timeline yet.</div>',
				},
	
				{
					id : 'addtags',
					q : 'How to add a tag to a post?',
					a : '<div>Just type in the field tag and press enter. No need to specify #, it will be added automatically.</div>',
				},
	
				{
					id : 'usepublicaddress',
					q : 'How can I use the public address?',
					a : '<div>Your public address is what Pocketnet uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. Pocketnet uses the same exact cryptography as Bitcoin.</div>',
				},
				{
					id : 'desktopmac',
					q : 'Will there be a downloadable executable for Mac?',
					a : '<div>Yes - we are working of Mac platform. Target is for mid-April.</div>',
				}
	
	
			]
	
	
		},
	
	
		{
	
			name : 'Pocketcoin',
			id : 'pocketcoin',
	
			group : [
	
				
	
				{
					id : 'pocketcoin',
					q : 'What can I do with Pocketcoin?',
					a : '<div>Currently you can win it or send as a gift. However, if and when Pocketnet takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token.</div>',
				},
	
	
				{
					id : 'pocketcoinstock',
					q : 'Is Pocketcoin like a share of stock in Pocketnet?',
					a : '<div>Definitely no. Pocketnet is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, Pocketnet will include a marketplace where goods and services will be sold directly for Pocketcoin</div>',
				},
	
				{
					id : 'pocketcoinbuy',
					q : 'Can I buy additional Pocketcoin?',
					a : '<div>Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise Pocketnet to the world. So, by buying a Pocketcoin you are positioning yourself for success of Pocketnet, but just as importantly you are helping Pocketnet achieve this success. All major social networks had billion dollar advertising budgets. Pocketnet was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now.</div>',
				},
	
				{
					id : 'pocketcoinbuyfiat',
					q : 'Can I buy Pocketcoin for US Dollars or other fiat currency?',
					a : '<div>No.</div>',
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
	
				// {
				// 	id : 'viewoutside',
				// 	q : 'Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?',
				// 	a : '<div>Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.</div>',
				// },
	
	
				// {
				// 	id : 'walletid',
				// 	q : 'Is my public key like a wallet ID that I enter on my profile and people can send points to?',
				// 	a : '<div>Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!</div>',
				// },
	
				{
					id : 'runnode',
					q : 'Can I run a node on my headless server?',
					a : '<div>We will put the node&rsquo;s sources into GitHub. Instructions for running a node will be made available in early April.</div>',
				},
	
				{
					id : 'signback',
					q : 'How can I sign back in?',
					a : '<div>You can use your private 12-word key or a QR code to sign in.</div>',
				}
			]
		},
		{
	
			name : 'Curation of content',
			id : 'curation',
	
			group : [
	
				{
					id : 'content',
					q : 'Is any content allowed on Pocketnet? If some content is not allowed, can the platform still be called free speech?',
					a : '<div>This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.</div>',
				},
				{
					id : 'specific',
					q : 'Specifics of curation on Pocketnet.',
					a : '<div>When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn Pocketnet into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of Pocketnet as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, Pocketnet will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.</div> ',
				},
				{
					id : 'racism',
					q : 'Important Note on Racism.',
					a : '<div>Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn Pocketnet into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on Pocketnet. Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. Pocketnet team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on Pocketnet. Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic.</div>',
				},
	
	
			]
	
		},
	
		{
	
			name : 'How is Pocketnet different from...',
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
					a : '<div>While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. Pocketnet features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.</div>',
				}
	
			]
	
		},
	
		{
	
			name : 'Pocketnet ecosystem',
			id : 'ecosystem',
	
			group : [
	
				{
					id : 'ecosystem1',
					q : 'How is Pocketnet develpment funded?',
					a : '<div>Pocketnet is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch Pocketnet will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner.</div>',
				},
				{
					id : 'ecosystem2',
					q : 'What is Pocketcoin?',
					a : '<div>Pocketcoin is a network token. It is used exclusively to buy advertising from Pocketnet contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of Pocketnet and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes.</div>',
				},
				{
					id : 'ecosystem3',
					q : 'How are content creators and node operators rewarded?',
					a : '<div>Pocketnet features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.</div>',
				},
				{
					id : 'ecosystem4',
					q : 'What if users post illegal content, pornography and SPAM?',
					a : '<div>Pocketnet is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag only illegal content, not simply the content they find offensive. To make sure that Pocketnet is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.</div>',
				},
				
			]
	
		},
		
		
	
	]
		
	
	
	
	
	
	
	