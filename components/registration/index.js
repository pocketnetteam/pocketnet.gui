var registration = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var el = {}, k = {},  gliperror = false, essenseData, initialParameters, ext = null;

		var addresses = [];
		
		var categoryIcons = [
			{
				"id": "c2",
				"icon": "far fa-smile"
			},
			{
				"id": "c3",
				"icon": "fas fa-landmark"
			},
			{
				"id": "c4",
				"icon": "fab fa-bitcoin"
			},
			{
				"id": "c5",
				"icon": "fas fa-microscope"
			},
			{
				"id": "c55",
				"icon": "fas fa-book"
			},
			{
				"id": "c6",
				"icon": "fas fa-dollar-sign"
			},
			{
				"id": "c73",
				"icon": "fas fa-fist-raised"
			},
			{
				"id": "c72",
				"icon": "fas fa-thermometer"
			},
			{
				"id": "c7",
				"icon": "fas fa-flag-checkered"
			},
			{
				"id": "c8",
				"icon": "fas fa-running"
			},
			{
				"id": "c9",
				"icon": "fas fa-gamepad"
			},
			{
				"id": "c10",
				"icon": "fas fa-space-shuttle"
			},
			{
				"id": "c11",
				"icon": "fas fa-music"
			},
			{
				"id": "c12",
				"icon": "fas fa-newspaper"
			},
			{
				"id": "c13",
				"icon": "fas fa-history"
			},
			{
				"id": "c14",
				"icon": "fas fa-bookmark"
			},
			{
				"id": "c15",
				"icon": "fas fa-film"
			},
			{
				"id": "c16",
				"icon": "fas fa-paw"
			},
			{
				"id": "c17",
				"icon": "fas fa-route"
			},
			{
				"id": "c18",
				"icon": "fas fa-pencil-ruler"
			}
		];

		
		var current = null;
		var regproxy = null;

		var subscribe = []

		var getproxyoptions = function(){

			if(regproxy){
				return {
					proxy : regproxy.id
				}
			}

			return {}
		}

		var getbloggers = function(lang){
			var dict = {
				ru : [
					"PDUWW57W8DoV1dMTQYsrkwg66xEuaNckbd",
					"PQDxqrJqKM15weq1mbunEqK2uVNvZy1Z6d",
					'PX7pM9CG9MhMCqJQD52ahLyqSssNK2WxEv',
					'PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s',
					'PXupozgNg1Ee6Nrbapj8DEfMGCVgWi4GB1',
					'P9KXb7sS2JDjV5jnXu4t2WwwbvzYeu6yds',
					'PUXG7rfX19Xoco1FXjXBW8qt6NEZpp8maL',
					'PKwa3jVZXHpaVgG89WvnM8vBfpp745GGNN',
					'PLTjskW3xi3oaLnyqTAwZQa1iAeQ3PzTuF',
					'PDXGoy43t5RSqJY1UJBgswBu6phtW8Knwa',
					'PSBePd5Tx5KG9vxwAzbaDTfjzDbq1GUTYw',
					'PTft97ycE3N6ZKgvixdpbYj8qPxzCe2CxG',
					'PJuW8LKT7LZY88fP7WM35NJURh3rAaeU3o',
					'PBGqJGSrdsBrEsLmiAaeH22bxGg8irX3gC',
					'PVjvMwapTA29biRTsksXUBuVVf2HVwY7ps',
					'PTMFZXMXYFjiN1UuSV4ZckepyEFVWMm6Zy',
					'PWbYmgG6PzqhrNDtuFmWrSaLHTDMwZWc26',
					'P9VXZPHxop1ya7oP1kypubWwGvfYw8QQNK',
					'PQUj7dS2QpamP9vapARCYaJaSqjXpcZk8p',
					'PLfHpn9nJe9hKJ7UqvAuPsPUu9RjNpyTrN',
					'PARV591XENALBB5ApkR7WcQPhEZtLHfi2A',
					'PBvkW9txHLiKtQMX642DG1SmJC2UbBX5wy',
					'P9N7jrhdsotZDz6r56ADxwxwP295HcF9QQ',
					'PJuHmJS2iw9boRhy1Y4DSbe9uNQCBedBze',
					'PMVvs8kvbskq6eVV8Q3oyjotbox9tBfvnp',
					'PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt',
					'PQ4X2NQJD1ZA5Hy58ZU9eHcjpRco7ZMgTz',
					'PHtxzCKFqNEfn8N8FDAUYhUhqSL2qJJZxY',
					'PWyjwnA3Rr8Fuc6HQmcYFb3cYXDeaq679j',
					'PEnqXhQU2MxZc4bFQJ4TSaCCT3f5wbqHJZ',
					'PFCdnHww9UQLf2WQHPF8vtABgNuK4uaiXY',
					'PSXmn4k7BDwwtZkTxdgC7yq1Cwh4Di7GLK',
					'PCVt7H4vgjBDxifLz3uokbc1tD3MZwWwQh',
					'PR3BcnBziYoDgckdyaARgFayiZUiA7agSx',
					'PGFKA1DieVsg9pQK4aBaEp5wpvaXpWtuVJ',
					'PERF5kDM32ebkq8SeSj8ZaLqfCoqz8FRgh',
					'P9i55BxFWpjMyqgHyCKtazDN1HDiZxTSzJ',
					'PCkbxDvFQbFvEzPWnnrraey1QCUro2kMLU',
					'PB1EShZbvkTSQgU8NLxEH8MN5UiKw1CBHb',
					'PWAAzRuHNi5iNxQDaJ8ZVpqEJSoPWFFiRN',
					'PD4pWxVke4Yz2y5UnNWnSsVHd45Vy6izCr',
					'PQi77s3JtrUkavxN9t6Hy5sT3CNnHokNrK',
					'PQ2hAPwkey8aACP548DtgLscQTk9PkAKnP',
					'PFGMWt1cQFm6QEbcqH6YJxfabj4L5rHfLM',
					'PHMjVgWj6HMiLeAhiR8eDLzVrXp8nyF2ji',
					'PUuNT7icKad8fm7ATPRn1s8gd19HXYKDqS',
					'PHsHq6i4RKm9gCqFGhAr3yvF34yDocc5S7',
					'PBw3aSQe6HCzX75xDy5X2SXx9y9JaUP9ke',
					'PCxXVA4quzXVjUM356t3FE2nvWmDVY47J7',
					'PVATJhZqKdYXLp1nmPdrssRhygJApmAALR',
					'PJtnXwKNPDdEpJhaKH2fbPEyLrcS77oj46',
					'PVRWuvwCNfZWUUD5gQzDsqabnTcMXoqgbV',
					'PKXSw8Q4Kdy244Gb1R7GYPvTwiM22JssTf',
					'PSKLx4k7ehAtvipwpo2ohBeCYzpf4SiKHj',
					'PUopiRZvD6BAjF9CcWtMfpeJtxp411dxKM',
					'PMTrhcppMJpaRz4Xnv7CogJPHPMKtcg6bA',
					'PSGSnF7Diww2yJdQefuy3ZvuZEoBw8TGTV',
					'PT4fvQ7jMicg6McC52BmFFkL2M6AEWc7vo',
					'PCkX8n2e6aD6Ji37hSpHCJpqvaaJjVWt1m',
					'PGD5jUBQ7qNnHDuW85RRBxY1msywEdCm7r',
					'PVjhQyjrLur2ZGD5CspSu18ee7R2qsCjo6',
					'PLZATQyqYzM6NLbH8M3LPicSU3cTAqW3SA',
					'PKWM3oo6YTFFn5U2HLaBueqA3fcLd7BP8m',
					'PHnvqSQzg5D3yKo5KgCiXqtFP84bsYyF7G'
	
				],
				en : [
					"PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR",
					"PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw",
					"P9eLPo3gXUqBr7wgxDSSLNfyNMyeDua7cn",
					"PVpSK2qQXmG1SjAMJVMAMRLUkrzMjsJouL",
					"PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA",
					"P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh",
					"PAVjp9nsNtgzUNF1VkUd74YzLaQHpv4g7v",
					"PWvS62zsRm96Bw63qo9Adif97U18mLCpfN",
					"PGQh5JW5c1shJTpi3iC2dkvov1pUqs1SqX",
					"PXsjQA3fYDGCr1WwmNTNmrs9N7VA18gVuB",
					"PUhvX53ueD2Sxa3q7av83vNcEHuS8M7kRS",
					"PCfvhqHEYG3zdWXvLJrjPPDVK2H8qwwXn5",
					"PGegspsgRqvMiZCP8PGufKMYBk3yekDaEE",
					"PB8wu7hQwo5xMsVG4F4HshrW39t2Y4eN37",
					"PKYwaiikhUoPWmpWmYec4Xf3TPWwJQCqUt",
					"PSBhEi8AUasemizUHyJ64t6xXonsxwp73y",
					"PLZsQmsRUDMJGc61pGMLdDQ58UuqQ8kU5Z",
					"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",
					"PLH8biT5rMdvE1zXFhsvNkzphVRK6cNM7p",
					"PL9U1q1JmJezPh8GQb5dj5h5GavuCGcjYk",
					"PHmvLy9b5m2b7fvU7MSTw4mAkdshhdY4Nt",
					"PUYEkLb6szwxjw3cq6FvLxDPmedbyd3foq",
					"PTPVArrxr4wZuget8phZ1eSNFsGmdSXXck",
					"PQ8PDzWy7hDV8gfgSgoP2BCU2CXngMPCvt",
					"PR54hSnPDbhPePLNQZCP4CU77TRFoMxYqg",
					"P9D3ntMdwy4HGjBhg1uQDuQD99MXYZTqg3",
					"PST4P2KEweDQJ2RAtG3scUmXAgPJJ5JJRL",
					"PCYeapWncohMda9vfrFe26EDEiFa89kDZ1",
					"PGnshbCvNGRiBYGxUpVNqLkaM8Ku1xvbaw",
					"PPdfqTLnz2S6F1ng5N7rzMUh19H4e3pfZe",
					"PNQ8drkeMEtZ44g7VyhxPPwPYubBsT6ekt",
					"PCx1LKWdV1pc6TmKwYU8vqEn3CpAeTexDr",
					"PPw4k3Zra7tYRM643QVm3V4UFrcZZb9H6H"
				],
				test : [
					'TEgrDd5Arx9fLPk8gcyr1XLL1GU6dkhHLi',
					'TEcigdCKLj47Rb4Ek5CL7N1N3LpkPZh5pu',
					'TQPBvaNUyEWoK9AfY7mUfx3BXZWE2fRXQd',
					'TYWwKVhh9a1A7oUytZkwec1Ab3XXSUkZgJ',
					'TAxEpqgtHtdbiLZWVfSqTarP99P59rFRkj',
					'TGX3NqKceZqqyNyLZw5Q5JwWeKYgnApofn',
					'TCbUs1HhYr9yE7QzL7xgNDWqFySHYKUtAC',
					'TJ7LTvJcgaK7mq8fBPjJwvNRU6q6X3sgAt',
					'TGZLk6hroZEhgAo8SZXtkdggZHX8BWhNkh',
					'TA4CQv7MSga6o3GwQGqarkSLWopADqrAkq',
					'TA4iXZ6DxtygXuwr1syKiydo1NrMAXhsY9',
					'TQKQ6mXfsPA554STX5YPiLyehA8GJPj2tc',
					'TY2NeHUHVGDZquFzzmWo8QNEFvTTMNupGu',
					'THy6Rd8xv35m8VkNwJQZKDwmCwKL6QYtwz',
					'TBBbasLPUPaWgnb8UGxYA5eoBXxdXMDmw8',
					'TJYKMFZKYhSpU7xT55tuR4jD8gpC1dAZ5c'
				]
			}

			_.each(window.project_config.regAccounts || [], (a) => {
				_.each(dict, (d, k) => {

					if(k == 'test') return

					dict[k].unshift({
						a : a,
						s : true
					})
				})
			})

			return (self.app.test ? dict.test : (dict[self.app.localization.key] || [])) || []
		
		}

		var steps = {
			settings : {
				id : 'settings',
				nextindex : 'bloggers',

				prev : function(clbk){

					clbk()
			
				},

				render : 'settings',

				after : function(el, pel){

					
				},

				next : true				
			},

			welcome : {

				id : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')

					


					clbk()
				},

				render : 'welcome',

				after : function(el){

					self.app.el.app.removeClass('default-scroll')

					var c = false

					var clbk = function(){

						if(c) return

						c = true

						if (deep(essenseData, 'successHref') == '_this'){

							var close = deep(initialParameters, 'container.close')

							if (close)
								close();

							if (essenseData.signInClbk)
								essenseData.signInClbk();

						}
						else
						{
						
							self.nav.api.go({
								href : self.app.platform.sdk.registrations.redirect || 'index',
								history : true,
								open : true
							})	

						}

						try {
							localStorage['regproxy'] = ''
						}
						catch (e) { }

						self.app.platform.sdk.registrations.redirect = null

						/*if (isMobile()){
							self.app.platform.ui.showmykey({
								afterregistration : true
							})
						}
						else{
							self.app.platform.ui.showmykeyfast({
								showsavelabel : true
							})
						}*/
						
					}

					setTimeout(function(){

						clbk()

					}, 1500)

					el.find('.welcome').on('click', function(){

						clbk()
						
					})
				}


			},
			
			categories : {

				id : 'categories',
				nextindex : 'welcome',

				prev : function(clbk){

					//self.app.platform.sdk.theme.set('black')


					clbk();
					
				},

				render : 'categories',

				after : function(el){

					var elCategories = el.find('.cat');
					var next = el.find('.next');
					var skip = el.find('.skip');

					self.app.platform.sdk.categories.clear()
					
					var activeCategories = [];

					elCategories.on('click', function(){

						var cat = $(this);
						var id = cat.attr('cat');

						var activeIdx = activeCategories.findIndex(function(c){
							return c === id;
						})

						if (cat.hasClass('active')){

							cat.removeClass('active')
							if (activeIdx > -1){
								activeCategories.splice(activeIdx, 1);
							}

						} else {

							cat.addClass('active')
							if (activeIdx === -1){
								activeCategories.push(id);
							}
						}

						if (activeCategories.length){

							next.addClass('active')

						} else {

							next.removeClass('active')
						}

					})

					var c = false

					var clbk = function(activeCategories){

						if(c) return

						c = true

						for (var catId of activeCategories){
							self.app.platform.sdk.categories.select(catId);
						}

						

						actions.next()
						
					}

					next.on('click', function(){

						if (activeCategories.length){
							clbk(activeCategories)
						}	
						
					})

					
					skip.on('click', function(){

						clbk([])
						
					})
				}


			},
						
			bloggers : {

				id : 'bloggers',
				nextindex : 'welcome',

				prev : function(clbk){

					var bloggers = getbloggers()

					var addresses = _.map(bloggers, (v) => {

						if(_.isObject(v)){

							if(v.s) {
								subscribe.push(v.a)
								subscribe = _.uniq(subscribe)
							}

							return v.a
						}

						return v

					})

					self.sdk.users.get(addresses, function(data){

						steps.bloggers.current = _.shuffle(self.psdk.userInfo.gets(addresses))

						steps.bloggers.current = _.sortBy(steps.bloggers.current, (u) => {
							if(_.indexOf(subscribe, u.address) > -1){
								return 1
							}

							return 2
						})

						if (steps.bloggers.current.length){

							clbk()
						}
						else{
							actions.to('categories')
						}
						

					}, true)
				},

				render : 'bloggers',

				after : function(el){

					self.app.el.app.addClass('default-scroll')

					var next = el.find('.next');

					el.on('click', '.subscribeButton', events.subscribe);
					el.on('click', '.unsubscribeButton', events.unsubscribe);

					el.on('click', '.user .showMoreAbout', events.showprofile)

					$('body').on('click', events.hideprofiles)

					next.on('click', function(){

						actions.next()
							
					})

					
				}


			},

	

		}

		var arrange = _.map(steps, function(s, i){
			return i;
		})


		var actions = {

			showprofile: function(address){

				self.nav.api.load({
					open : true,
					id : 'channel',
					inWnd : true,
					history : true,

					essenseData : {
						id : address,
						followbutton : true,
					},

					clbk : function(i, p){

						p.el.on('click', '.subscribeButton', function() {actions.subscribe(address, p.container.close)});
						p.el.on('click', '.unsubscribeButton', function(){ actions.unsubscribe(address, p.container.close)});
					}
				})

			},

			unsubscribe : function(address, clbk){

				dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						subscribe = _.filter(subscribe, (a) => {
							return a != address
						})

						el.c.find('.user[address="'+address+'"] .subscribeWrapper').removeClass('following');

						if(clbk) clbk()

					}
				})

				/*dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, err){

							if(tx){
								el.c.find('.user[address="'+address+'"] .subscribeWrapper').removeClass('following');
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}

							if (clbk){
								clbk();
							}
		
						})

					}
				})*/
				
			},
			subscribe : function(address, clbk){

				subscribe.push(address)

				subscribe = _.uniq(subscribe)

				el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')

				if(clbk) clbk()

				/*self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){

					if(tx){

						el.c.find('.user[address="'+address+'"] .subscribeWrapper').addClass('following')
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

					if (clbk){
						clbk();
					}

				})*/
				 
			},

			subscribeList : function(){

				if(!subscribe.length) return

				_.each(subscribe, (address) => {
					self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){
					})
				})

				subscribe = []
			},

			preloader : function(sh){
				window.rifticker.add(() => {
					if(sh){
						el.c.addClass('loading')
					}
					else{
						el.c.removeClass('loading')
					}
				})
				
			},

			signin : function(clbk){

				self.app.user.setstay(1);

				self.user.signin(k.mnemonicKey, function(state){
					if (clbk)
						clbk()

				})		

			},

			to : function(step, clbk){
				current = step;
				actions.makeStep(clbk)
			},

			redo : function(clbk){
				actions.makeStep(function(){

				})
			},

			next : function(clbk){

				if (current) {
					current = steps[current].nextindex

					if(typeof current == 'function') current = current()
				}
				else{
					current = steps.settings.id

					var me = self.psdk.userInfo.getmy()
					var account = self.app.platform.actions.getCurrentAccount()

					if (me/* && me.relay && (account && !account.unspents.willChange && !account.unspents.value.length)*/){
						
						current = steps.bloggers.id
					}
					else{
						current = steps.settings.id
					}
					
				}

				if(!current) return

				actions.makeStep(function(){

				})
			},

			makeStep : function(clbk){

				var step = steps[current];

				if (step){			

					actions.preloader(true)

					setTimeout(() => {
						step.prev(function(){

							if(!el.c){
	
								return
							}
							window.rifticker.add(() => {
								
							})
	
							renders.step(step, function(_el){

								window.rifticker.add(() => {
									_scrollTop(_el, scrollel)
									actions.preloader(false)
									el.c.attr('step', step.id)
									step.after(_el)
								})

							})
	
						})
					}, 300)

					

				}
				else
				{
				}

					
			},

			testqrcodeandkey : function(hm, clbk){

				var keyPair =  self.app.user.keysFromMnemo(trim(hm))  

				var mk = keyPair.privateKey.toString('hex');

				var qrcode = renders.qrcode(el.c.find('.hiddenqrcode'), mk)

				var src = qrcode._oDrawing._oContext.canvas.toDataURL("image/jpeg");

				grayscaleImage(src, function(image){

					qrscanner.q.callback = function(data){

						if(data == 'error decoding QR Code'){

							if(clbk)
								clbk(false)
							
						}
						else
						{
							if(clbk)
								clbk(true)
							
						}
					}

					qrscanner.q.decode(image)
					
				})

			},

			generate : function(clbk){

				if(k.mnemonicKey){

					if (clbk)
						clbk()

				}
				else{
					var key = bitcoin.bip39.generateMnemonic();

					k.mnemonicKey = key;

					var keys = self.app.user.keysFromMnemo(k.mnemonicKey)

					k.mainAddress = app.platform.sdk.address.pnetsimple(keys.publicKey).address;

					k.mk = keys.privateKey.toString('hex');

					if (clbk)
						clbk()
				
				}
				
				
			},

			waitgeneration : function(clbk){				

				retry(function(){

					if(k.mnemonicKey || k.mk) return true;

				}, clbk, 40)

				
			}

		}

		var events = {

			showprofile : function(){

				var user = $(this).closest('.user');
				var address = user.attr('address');

				if (isMobile()){

					actions.showprofile(address);

				} else {

					setTimeout(function(){

						user.addClass('showMore')

					}, 0)


				}
			},


			hideprofiles : function(e){

				var user = $(e.target).closest('.user');
				var isShowed = user.hasClass('showMore');
				var address = user.attr('address');

				$(this).find('.user').each(function(i, user){
					
					var user = $(this);

					if (!(isShowed && user.attr('address') === address)){
						user.removeClass('showMore')
					}

				});


			},
			


			unsubscribe : function(){

				var address = $(this).closest('.user').attr('address')

				actions.unsubscribe(address)
			},

			subscribe : function(){
				
				var address = $(this).closest('.user').attr('address');			

				actions.subscribe(address);
			},

	
		}

		var renders = {
			qrcode : function(el, m){

				var qrcode = new QRCode(el[0], {
					text: m,
					width: 256,
					height: 256
				});

				return qrcode

			},

			step : function(step, clbk){

				el.c.find('.step').removeClass('active');

				var _el = el.c.find('.step .stepBody');

				renders[step.render](_el, function(_el){

					if (clbk)
						clbk(_el)
				})

			},

			welcome : function(el, clbk){
				self.shell({

					name :  'welcome',
					el :   el,
					data : {
						
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			bloggers : function(el, clbk){

				self.shell({

					name :  'bloggers',
					el :   el,
					data : {
						addresses: steps.bloggers.current,
						subscribe : subscribe
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			categories : function(el, clbk){

				var k =  self.app.localization.key;

				if(!self.sdk.categories.data.all[k]) k = 'en';

				var categories = self.sdk.categories.data.all[k].filter(function(k){
					return k.id !== 'c71'
				})

				categories = _.map(categories, function(k){
					var withIcon = categoryIcons.find(function(ki){
						return ki.id === k.id;
					})

					if (withIcon){
						k.icon = withIcon.icon;
					}

					return k;
				})

				var username = (self.psdk.userInfo.getmy() || {}).name

				self.shell({

					name :  'categories',
					el :   el,
					data : {
						categories: categories,
						username : username
					},

				}, function(_p){

					if (clbk)
						clbk(_p.el);

				})
			},

			settings : function(_el, clbk){

				self.shell({

					name :  'useroptions',
					el :   _el,
					data : {
					},

					insertimmediately : true

				}, function(_p){

					self.nav.api.load({

						open : true,
						id : 'test',
						el : _p.el.find('.useroptions'),
	
						essenseData : {
							wizard : true,
	
							events : function(events){
								_p.el.find('.elpanel .save').on('click', events.save)
							},
	
							//panel : el.panel,
						
							presave : function(clbk){
	
								actions.generate(function(){
	
									self.app.user.isState(function(state){
	
										self.sdk.registrations.add(k.mainAddress, 1)
	
										if(!state){
	
											actions.signin(function(){
	
												var account = self.app.platform.actions.addAccount(self.app.user.address.value)
													account.setKeys(app.user.keys())
	
												if(clbk) clbk()
											})	
	
										}
										else{

											
	
											if(clbk) clbk()
										}
									})
									
								})
	
							},
	
							relay : function(){
								return k.mainAddress
							},
	
							success : function(userInfo){
	
								k.info = userInfo
	
								self.sdk.registrations.add(k.mainAddress, 2)
	
								state.save()
	
								actions.next()

								try{
									localStorage['needshowkey_' + self.app.user.address.value] = true
								}catch(e){

								}
	
							}
						},
						
						clbk : function(e, p){
	
							ext = p

							setTimeout(() => {
								window.rifticker.add(() => {
									_p.el.find('.elpanel').removeClass('hidden')

									if (clbk)
										clbk(_el);

								})
								
							}, 300);
	
							
	
						}
	
					})


					

				})
				

			}
		}


		var state = {
			save : function(){
				
			},
			load : function(){
				
			}
		}

		var initEvents = function(p){
			
			el.c.find('.gotohasaccount').on('click', function(){
				self.nav.api.loadSameThis('authorization', p)
			})

		}

		var make = function(){
			self.app.user.isState(function(state){

				if(!state){

					/*setTimeout(function(){
						actions.generate(function(){
						})
					}, 300)	*/
					
				}
				else{

					k = {};
					k.mainAddress = self.app.user.address.value
					k.mk = self.app.user.private.value.toString('hex');
				}

				actions.next();
			})
			

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				if (p.state && self.app.platform.psdk.userState.getmy()){
					
					self.app.nav.api.load({
						open : true,
						href : 'index',
						history : true
					})

					return
				}

				gliperror = false;

				k = {}

				subscribe = []

				essenseData = deep(p, 'settings.essenseData') || {}

				current = null;

				var data = {
					steps : steps,
					inauth : deep(p, 'settings.essenseData.inauth') || false
				};

				//regproxy = self.app.api.get.byid('pocketnet.app:8899:8099')

				try {
					if (localStorage['regproxy']){
						regproxy = self.app.api.get.byid(localStorage['regproxy'])
					}
				}
				catch (e) { }


				self.app.api.get.proxywithwallet().then(r => {

					if(r && !regproxy) {
						regproxy = r
					}

					if (regproxy){
						try {
							localStorage['regproxy'] = regproxy.id
						}
						catch (e) { }
						
					}

					clbk(data);
				}).catch(e => {
					clbk(data);
				})

			},

			destroy : function(){
				//window.removeEventListener('resize', events.width)

				actions.subscribeList()

				self.app.el.app.removeClass('default-scroll')

				delete self.app.errors.clbks.registration

				if (ext) 
					ext.destroy()

				ext = null

				gliperror = false;

				k = {}

				if(el.c) el.c.empty()

				el = {};

				essenseData = {}

				//self.app.platform.ui.showkeyafterregistration()

			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				//el.panel = el.c.find('.panelWrapper')

				initialParameters = p;

				scrollel = el.c.closest('.wndcontent')

				if(!scrollel.length) scrollel = null;

				initEvents(p);
				
				make();

				self.app.Logger.info({
					actionId: 'USER_STARTED_REGISTRATION',
				});

				p.clbk(null, p);

			
			},
			wnd : {
				class : 'withoutButtons regwindow normalizedmobile maxheight'
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = registration;
}
else{

	app.modules.registration = {};
	app.modules.registration.module = registration;

}