var electron = null

if(typeof _Electron != 'undefined'){
	electron = require('electron');

	var storage = electron.OSBrowser;
}


Platform = function(app){

	var self = this;

		self.app = app;

		self.focus = true;	

		self.salt = 'vd45dzxcsOBWjLe2p4jmSMmMDSp90o01lkxvSl34MspyHG9sbu1092';

		self.currentBlock = 1;

	var blockps = 180000;


	var TXFEE = 1

		self.avblocktime = 45;

		self.mp = {
			dollars : function(value, p){
				if(!p) p = {};

				if(typeof p.precision == 'undefined')
					p.precision = 2;

				p.allowNegative = false;

				if(typeof p.prefix == 'undefined')
					p.prefix = "$&nbsp;";

				p.value = Number(value).toFixed(p.precision);

				return maskValue(p)
			},

			coin : function(value, p){
				if(!p) p = {};

				if(typeof p.precision == 'undefined'){

					p.precision = 2;

					if (value >= 1){
						p.precision = 2;
					}

					/*if (value > 100){
						p.precision = 4;
					}

					if (value > 1000){
						p.precision = 3;
					}

					if (value > 10000){
						p.precision = 2;
					}

					if (value > 100000){
						p.precision = 1;
					}*/

					if (value > 1000000){
						p.precision = 0;
					}

					
				}



				p.allowNegative = false;

				p.value = Number(value).toFixed(p.precision);

				return maskValue(p)
			},

			coinwithsmall : function(value, p){

				if(!p) p = {}

				if(typeof p.precision == 'undefined')
					p.precision = 2;

				if(typeof p.dprecision == 'undefined')
					p.dprecision = 6;

				if(typeof p.suffix == 'undefined')
					p.suffix = "POC";

				var suffix = p.suffix;

				delete p.suffix

				value = Number(Number(value).toFixed(p.dprecision));

				var s = Math.pow(10, p.precision)

				p.allowNegative = false;

				p.value = ((Math.floor(value * s)) / s).toFixed(p.precision);
		

				value = (value - p.value).toFixed(p.dprecision).substr(2 + p.precision);

				var fp = maskValue(p)

				var html = '<div class="table coinwithsmall"><div class="bignum">'

				+fp+

				'</div><div class="svlwr"><div><div div class="smallvalue">'+value+'</div><div class="suffix">'+suffix+'</div></div></div></div>'

				return html;
			}
		}

	self.addressType = 'p2pkh'

	self.addressTypes = ['p2pkh', 'p2sh'/*, 'p2wpkh'*/]

	self.values = {
		alph : [
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'a', 'b', 'c', 'd', 'e', 'f', 'g',
			'h', 'i', 'j', 'k', 'l', 'm', 'n',
			'o', 'p', 'q', 'r', 's', 't', 'u',
			'v', 'w', 'x', 'y', 'z'
		],
	}

	self.applications = {
		windows : {
			text : {
				name : "Windows",
				download : 'Download Desktop App - this is the most censorship resistant way to use Pocketnet. Even if websites are shut down, desktop application will still run directly through the nodes.',
				label : "Download Pocketnet for Windows"
			},

			icon : '<i class="fab fa-windows"></i>',

			github : {
				name : "PocketnetSetup.exe",
                url : 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                page : 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
			} 
		},

		linux : {
			text : {
				name : "Linux",
				download : 'Download Desktop App - this is the most censorship resistant way to use Pocketnet. Even if websites are shut down, desktop application will still run directly through the nodes.',
				label : "Download Pocketnet for Linux"
			},

			icon : '<i class="fab fa-linux"></i>',

			github : {
				name : "Pocketnet_linux.AppImage",
                url : 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                page : 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
			} 
		}
	}

	self.currnetBlock = 0;

	self.errorHandler = function(key, action, akey){

		var eobj = self.errors[key] || self.errors['network'];

		if(!eobj){
			return false;
		}
		else
		{
			var m = eobj.message;

			if (m){
				if(typeof m == 'function') m = m(akey);

				if(!m) return

				sitemessage(m)
			}

			var a = eobj.action

			if (action && a){
				a()
			}

			return (eobj.text || function(){ return '' })()
		}



	}

	self.errors = {

		'money' : {

			action : function(akey){
				
				var adr = self.app.platform.sdk.address.pnet().address;

				topPreloader(10);

				self.sdk.node.transactions.get.balance(function(a){
					topPreloader(30);

					if (a > 0){

						self.sdk.node.transactions.get.canSpend([adr], function(cs){

							topPreloader(100);

							if(!cs){
								dialog({
									html : self.app.localization.e('canSpendError'),
									btn1text : self.app.localization.e('daccept'),

									class : 'one'
								})
							}
							else
							{
								sitemessage(self.errors["network"].message())
							}

						})

					}
					else
					{
						if(!self.app.user.validate()){

							self.app.platform.sdk.ustate.me(function(_mestate){

								topPreloader(40);


								if(_mestate){
									self.app.platform.sdk.users.checkFreeMoney(adr, function(res){

										topPreloader(100);

										if(res){
											self.errors["1"].action()
										}
										else
										{
											dialog({
												html : self.app.localization.e('noMoneyError'),
												btn1text : self.app.localization.e('daccept'),

												class : 'one'
											})
										}
									})
								}
								else
								{
									topPreloader(100);
									sitemessage(self.errors["network"].message())
								}

								

							})

						}
						else
						{
							topPreloader(100);


							self.app.platform.sdk.user.waitActions(function(r){

								if(!r){
									dialog({
										html : self.app.localization.e('noMoneyError'),
										btn1text : self.app.localization.e('daccept'),

										class : 'one'
									})
								}
								else
								{
									dialog({
										html : self.app.localization.e('waitConf'),
										btn1text : self.app.localization.e('daccept'),

										class : 'one'
									})
								}

							})

							
						}
					}

				}, adr)
				
			},
		},

		'network' : {
			message : function(){
				return self.app.localization.e('networkerror')
			}
		},
		"27" : {
			message : function(){
				return "You are trying to edit someone else's post"
			}
		},
		"26" : {
			message : function(){
				return "You have reached your limit of editing 5 posts in a 24 hour period"
			}
		},

		"25" : {
			message : function(){
				return 'You can only edit once per blockchain block. Please wait a minute, then try again'
			}
		},
		"24" : {
			message : function(){
				return 'You cannot block yourself'
			}
		},
		"23" : {
			message : function(){
				return 'You have already blocked this user'
			}
		},
		"22" : {
			message : function(){
				return 'You have not blocked this user'
			}
		},
		"21" : {
			message : function(){
				return 'Transaction is malformed'
			}
		},
		"20" : {
			message : function(){
				return 'You cannot refer yourself'
			}
		},
		"19" : {
			message : function(){
				return 'This username is too long'
			}
		},

		"18" : {
			message : function(){
				return 'This username is already in use'
			}
		},

		"17" : {
			message : function(){
				return 'This post is too long, please break it up.'
			}
		},	

		"16" : {
			message : function(){
				return 'Your Pocketnet reputation score does not allow for registering of complaints yet'
			}
		},	

		"15" : {
			message : function(){
				return 'You have reached the limit of complaints in a 24 hour period'
			}
		},	

		"14" : {
			message : function(){
				return 'Cannot complain about your own post'
			}
		},	

		"13" : {
			message : function(){
				return 'You have already registered your complaint about this post'
			}
		},	

		"12" : {
			message : function(){
				return self.app.localization.e('unexperror12')
			}
		},

		"11" : {
			message : function(){
				return self.app.localization.e('unexperror11')
			}
		},

		"10" : {
			message : function(){
				return self.app.localization.e('unexperror10')
			}
		},	

		"9" : {
			message : function(){
				return self.app.localization.e('SelfSubscribeError')
			}
		},	

		"8" : {
			message : function(){
				return self.app.localization.e('DoubleSubscribeError')
			}
		},	

		"7" : {
			message : function(){
				return self.app.localization.e('InvalideSubscribeError')
			}
		},	

		"6" : {
			message : function(){
				return self.app.localization.e('ChangeInfoLimitError')
			}
		},	

		"5" : {
			message : function(){
				return self.app.localization.e('SelfScoreError')
			}
		},	

		"4" : {
			message : function(){
				return self.app.localization.e('doubleLimitLight')
			}
		},	

		"3" : {
			message : function(){
				var us = self.sdk.ustate.storage[self.sdk.address.pnet().address] || {}

				return self.app.localization.e('scoreLimitLight', (us.score_unspent || 0) + (us.score_spent || 0))
			}
		},	

		"2" : {
			text : function(){

				var us = self.sdk.ustate.storage[self.sdk.address.pnet().address] || {}

				return self.app.localization.e('postLimitLight', (us.post_unspent || 0) + (us.post_spent || 0))
				
			}
		},

		"1" : {
			text : function(){
				return self.app.localization.e('checkScoreErrorLight')
			},
			action : function(akey){

				self.app.platform.sdk.user.waitActions(function(r){

					if(!r){
						dialog({
							html : self.app.localization.e('checkScoreError'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),

							success : function(){

								self.app.nav.api.load({
									open : true,
									href : 'filluser',
									history : true
								})

							},

							fail : function(){

								
							}
						})
						
					}
					else
					{
						dialog({
							html : self.app.localization.e('waitConf'),
							btn1text : self.app.localization.e('daccept'),

							class : 'one'
						})
					}

				})

				
			}

		},

		"-26" : {
			message : function(){

				return self.app.localization.e('Error code: -26')

			}
		}
	}


	self.parseUrl = function(url){


		url = url.replace("http:", "https:").replace("http//", "https://")

		var meta = parseVideo(url);

		var _url = null;

		if(meta.type){ 

			_url = url;

			if(meta.type == 'youtube'){

				if(url.indexOf("watch") > -1){

					var s = url.split("?");

					if (s[1]){


						var v = parameters(s[1]);

						if (v.v){
							_url = 'https://www.youtube.com/embed/' + v.v;

							meta.id = v.v
						}

					}
				}
			}	

			if(meta.type == 'vimeo' && url.indexOf("player") == -1){

				var s = url.split("/");

					s = s[s.length - 1];

				if (/[0-9]+/.test(s)){

					_url = 'https://player.vimeo.com/video/'+s+'?portrait=0';

					meta.id = s
				}

            }	
            
            if(meta.type == 'bitchute' && url.indexOf("player") == -1){

                https://www.bitchute.com/video/1Whwjdm0RIwx/
                var _url = url;
                if (_url.endsWith('/')) _url = _url.substr(0, _url.length - 1)
				var s = _url.split("/");

					s = s[s.length - 1];

				if (s[1]){

					_url = `https://www.bitchute.com/video/${s}/`;

					meta.id = s
				}

			}	

			meta.url = _url;
		}

		else
		{

		}

		return meta;
	}
	
	self.clbks = {

		_focus : {},
		focus : function(){

			//if(isTablet() || 1==1 || electron){

			app.user.isState(function(state){

				if(state){

					self.update();

					_.each(self.clbks._focus, function(f){
						f()
					})
					
				}

			})

			//}

			

		},

		api : {
			actions : {
				subscribe : {},
				unsubscribe : {},

				blocking : {},
				unblocking : {}
			}
		},

		
	}

	self.api = {

		upbutton : function(el, p){

			if(typeof window == 'undefined') return;

			if(!p) p = {};

			var self = this;
			var w = $(window);
			var up = null;

			var currentmode = null;

			var render = function(){
				var h = '';

				h += '<div class="upbutton '+ (p.class || "") +'">'

					h +=	'<div class="full">'

						h +=	'<div class="fulltable table">'
							h +=	'<div class="fullcell icon">'
							h += 		'<i class="fas fa-chevron-up"></i>'
							h += 	'</div>'

							h +=	'<div class="fullcell label">'
								h +=	'To the top'
							h += 	'</div>'

							h +=	'<div class="fullcell label likeicon">'
							h += 	'</div>'

						h += 	'</div>'
						
					h += 	'</div>'

					h +=	'<div class="mini">'
					h += 		'<i class="fas fa-chevron-up"></i>'
					h += 	'</div>'

				h += '</div>'

				el.html(h)
				up = el.find('.upbutton')
			}

			var getmode = function(){
				if(w.width() > 1280){
					return 'full'
				} 
				else{
					return 'mini'
				}
			}

			var actions = {
				clear : function(){
					up.css('right', '')
					up.css('top', '')
					up.css('bottom', '')
					up.css('width', '')
				}
			}

			var events = {
				resize : function(){
					var mode = getmode();

					if (mode != currentmode){
						actions.clear();
					}

					currentmode = mode

					if (mode == 'full'){
						if(p.rightEl){
							up.css('width', p.rightEl.offset().left + "px")
						}

						if (p.top){
							up.css('top', p.top())
						}
					}
					else
					{

					}
				},
				scroll : function(){
					if (w.scrollTop() > (p.scrollTop || 250)){
						up.addClass('active')
					}
					else{
						up.removeClass('active')
					}
				},

				click : function(){
					_scrollTop(0)
				}
			}

			var initEvents = function(){
				window.addEventListener('scroll', events.scroll)
				window.addEventListener('resize', events.resize)

				up.swipe({
					tap : events.click
				})
			}

			var removeEvents = function(){
				window.removeEventListener('scroll', events.scroll)
				window.removeEventListener('resize', events.resize)
			}

			self.init = function(){
				currentmode = getmode()

				render();

				initEvents();

				events.resize();
				events.scroll();
			}

			self.destroy = function(){
				removeEvents()

				el.html('')
			}

			self.init()

			return self;
		},

		plissing : function(p){

			var self = this;

			var render = function(){

				var rt = p.el.find('.plissingCnt');

					p.el.append('<div class="plissingCnt"></div>')

					rt = p.el.find('.plissingCnt');

				var h = ''
					h += '<div class="plissingWrapper">'
					h += '<div class="plissingWrapperTable table">'
					h += '			<div class="plissingWrapperCell">'
					h += '				<div class="pilsing">'
					h += '					<div></div>'
					h += '					<div></div>'
					h += '				</div>'
					h += '			</div>'

					h += '			<div class="plissingTipCell">'
					h += '				<div class="plissingTip all">'
					h += p.text
					h += '				</div>'

					if(p.textHover){	
						h += '				<div class="plissingTip hover">'
						h += p.textHover
						h += '				</div>'
					}

					h += '			</div>'
					h += '	</div>'
					h += '</div>'


				rt.html(h);
			}

			self.init = function(){
				render()
			}

			self.destroy = function(){
				p.el.find('.plissingCnt').remove()
			}

			self.init()

			return self;

		},
		tooltip : function(_el, content, clbk, p){
			if (_el.hasClass('tooltipstered')) return;

			if(!p) p = {};

			var options = {};
		
				options.debug = false;
				options.contentAsHTML = true;
				options.interactive = true;
				options.interactiveTolerance = 400;
				options.onlyOne = true;
				options.delay = 100;
				options.trigger = 'click'
				//options.autoClose = false;

				options.theme = p.theme || "lighttooltip";
				options.position || (options.position = "left");
				options.height || (options.height = 420);
				options.maxWidth || (options.maxWidth = 270);


			options.content = content

			options.functionReady = function (instance, h) {

				if (clbk)
				{
					clbk($(h.tooltip), _el)
				}
			}

			options.functionInit = function (i, h) {
								
			}

			_el.tooltipster(options)	

			_el.tooltipster('show')	

			return _el
		},
		electron : {
			storage : {},

			notifications : function(count, marker){
				if(typeof _Electron != 'undefined'){


					this.storage[marker] = count

					var _count = _.reduce(this.storage, function(m, c){
						return m + c
					}, 0)

					electron.ipcRenderer.send('update-badge', _count || null);
					electron.ipcRenderer.send('update-badge-tray', _count || null);
					
                    
				}
			}
		},
		inputs : {
			user : function(parameter){

				var render = function(info){

					if (parameter.el){

						if(!info){

						}
						else
						{

						}
					}
				}

				var change = function(v){

					if (parameter._onChange)
						parameter._onChange(v)

					var r = false;

					try{
						r = bitcoin.address.fromBase58Check(v);
					}
					catch(e){

					}

					
					if(r){

						self.sdk.users.get(v, function(){

							var info = self.sdk.users.storage[v] || null;
							
							render(info)

						})

						return

					}

					render(null)
					
				}

				parameter.onChange = change;

				return parameter
			}
		},
		actions : {
			unsubscribe : function(address, clbk){
				var unsubscribe = new Unsubscribe();
					unsubscribe.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					unsubscribe,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							var u = self.sdk.users.storage[address];

							if (me) me.removeRelation({
								adddress : address
							})

							if(u){
								u.removeRelation(address, 'subscribers')
							}

							var clbks = deep(self.clbks, 'api.actions.unsubscribe') || {}

							_.each(clbks, function(c){
								c(address)
							})

						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},

			subscribe : function(address, clbk){
				var subscribe = new Subscribe();
					subscribe.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					subscribe,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							var u = self.sdk.users.storage[address];

							if (me) me.addRelation({
								adddress : address,
								private : false
							})

							if(u){
								u.addRelation(address, 'subscribers')
							}

							var clbks = deep(self.clbks, 'api.actions.subscribe') || {}

							_.each(clbks, function(c){
								c(address)
							})
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},

			blocking : function(address, clbk){
				var blocking = new Blocking();
					blocking.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					blocking,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							if (me) me.addRelation(address, 'blocking')

							var clbks = deep(self.clbks, 'api.actions.blocking') || {}

							_.each(clbks, function(c){
								c(address)
							})
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},

			unblocking : function(address, clbk){
				var unblocking = new Unblocking();
					unblocking.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					unblocking,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							var u = self.sdk.users.storage[address];

							if (me) me.removeRelation(address, 'blocking')

							var clbks = deep(self.clbks, 'api.actions.unblocking') || {}

							_.each(clbks, function(c){
								c(address)
							})
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},
		}
	}


	self.sdk = {
		imagesH : {
			storage : {},

			add : function(src, h){
				var t = self.sdk.imagesH;

				t.storage[src] = h

				t.save()
			},

			delete : function(src, clbk){

				var t = self.sdk.imagesH;

				if (t.storage[src]){

					self.app.ajax.run({
						type : "DEL",
						imgur : true,
						data : {
							Action : "image/" + t.storage[src],
						},

						success : function(data){						

							delete t.storage[src]
							
							if (clbk)
								clbk()

						},

						fail : function(){

							if (clbk)
								clbk()
						}
					})

				}
				else
				{
					if (clbk)
						clbk()
				}
			},

			save : function(){
				localStorage['imagesH'] = JSON.stringify(self.sdk.imagesH.storage || {});
			},

			load : function(clbk){
				var s = {};

				try{
					s = JSON.parse(localStorage['imagesH'] || "{}")
				}catch(e){

				}

				self.sdk.imagesH.storage = s;

				if (clbk)
					clbk()

			}
		},
		articles : {

			storage : [],


			empty : function(id){
				return {

					id : id || makeid(),
					caption : {
						value : ''
					},
					images : [],
					content : null,
					u : ''
				}
			},

			copy : function(art){
				var _art = this.empty();

					_art.id = art.id;
					_art.u = art.u;
					_art.caption.value = art.caption.value;

					_art.images = _.clone(art.images);

					_.each(art.content, function(c, i){
						_art.content[i] = _.clone(c);
					})

				return _art;
			},

			getImages : function(cnt){
				var h = $('<div>') 

					h.html(cnt)

				var img = h.find('.medium-insert-images img');

				var _img = [];

				$.each(img, function(){

					var src = $(this).attr('src');

					if (src && src.length < 1000){
						_img.push(src)
					}
					
				})

				return _img
			},

			getVideos : function(cnt){
				var h = $('<div>') 

					h.html(cnt)

				var videos = h.find('.js-player');

				var _videos = [];

				$.each(videos, function(){

					var v = {
						type : $(this).attr('data-plyr-provider'),
						id : $(this).attr('data-plyr-embed-id')
					}

					if (v.type && v.id){

						_videos.push(v)

					}
					
				})

				return _videos
			},

			lightVideo : function(content){

				_.each(content, function(c, i){
					var html = c.value 

					var h = $('<div>') 

					h.html(html)

					var v = h.find('.plyrvideo')

					$.each(v, function(){

						var cnt = $(this);

							cnt.html('<div class="js-player" data-plyr-provider="'+cnt.attr('provider')+'" data-plyr-embed-id="'+cnt.attr('eid')+'"></div>')

					})

					c.value =  h.html()
				})

				return content
			},

			echo : function(art){
				var h = _.reduce(art.content || {}, function(m, el){

					return m + el.value

				}, '')

				return h
			},
			
			save : function(){


				var address = self.sdk.address.pnet().address;

				localStorage[address + 'articles'] = JSON.stringify(self.sdk.articles.storage || []);

			},

			load : function(){

				var articles = {};

				var address = self.sdk.address.pnet().address;

				var local = localStorage[address + 'articles'] || "[]";

				if (local){
					try{
						articles = JSON.parse(local)
					}
					catch (e){
						console.log("ERR", e)
					}
				}

				return articles;
				
			},

			init : function(clbk){
				var articles = self.sdk.articles.load();

				self.sdk.articles.storage = articles;
				
				if (clbk)
					clbk()
			}
		},
		usersettings : {

			meta : {

				win : {
					name : 'Coinstake win',
					id : 'win',
					type : "BOOLEAN",
					value : true

				},

				transactions : {
					name : 'Transactions receive',
					id : 'transactions',
					type : "BOOLEAN",
					value : true
				},

				upvotes : {
					name : 'Upvotes receive',
					id : 'upvotes',
					type : "BOOLEAN",
					value : true
				},

				comments : {
					name : 'Comment receive',
					id : 'comments',
					type : "BOOLEAN",
					value : true
				},

				answers : {
					name : 'Answer receive',
					id : 'answers',
					type : "BOOLEAN",
					value : true
				},

				followers : {
					name : 'New Followers',
					id : 'followers',
					type : "BOOLEAN",
					value : true
				},

				rescued : {
					name : 'Rescued Users',
					id : 'rescued',
					type : "BOOLEAN",
					value : true
				},

				embedvideo : {
					name : 'Show embed videos',
					id : 'embedvideo',
					type : "BOOLEAN",
					value : true
				},

				videoautoplay : {
					name : 'Autoplay videos',
					id : 'videoautoplay',
					type : "BOOLEAN",
					value : true
                },
                
                autostart : {
					name : 'Start Pocketnet Automatically',
					id : 'autostart',
					type : "BOOLEAN",
					value : undefined
                },
			},

			create : function(id){
				var m = self.sdk.usersettings.meta;

				var p = new Parameter(m[id])

				return p;
			},

			createall : function(){
				var create = self.sdk.usersettings.create
				var m = self.sdk.usersettings.meta;

				var options = {};

				_.each(m, function(p, id){
					options[id] = create(id)
				})

				return options
			},

			compose : function(){
				var s = self.sdk.usersettings;

				var options = s.createall()

				var m = s.meta;

				var c = {

					notifications : {
						name : "Notifications",
						options : {

							win : options.win,
							transactions : options.transactions,
							upvotes : options.upvotes,
							comments : options.comments,
							answers : options.answers,
							followers : options.followers,
							rescued : options.rescued

						}
					},

					video : {
						name : "Video",
						options : {
							embedvideo : options.embedvideo,
							videoautoplay : options.videoautoplay

						}
					},

                }
                
                if (electron) {
                    c.system = {
                        name: 'System',
                        options: {
                            autostart: options.autostart
                        }
                    }
                }

				_.each(options, function(o, i){
					o.onChange = function(v) {
						m[i].value = boolnum(v);
                        s.save();
                        
                        if (electron && i == 'autostart') {
                            const AutoLaunch = require('auto-launch');
                            let autoLaunch = new AutoLaunch({
                                name: 'Pocketnet',
                                path: electron.remote.app.getPath('exe'),
                                isHidden: true
                            });

                            if (m[i].value) autoLaunch.enable();
                            else autoLaunch.disable();
                        }
					}
				})

				return {
					c : c,
					o : options
				}

			},

			save : function(){

				var values = {};

				_.each(self.sdk.usersettings.meta, function(o, i){
					values[i] = o.value
				})

				localStorage['usersettings'] = JSON.stringify(values);
			},

			load : function(){

				var values = {};

				var local = localStorage['usersettings'];

				if (local){
					try{
						values = JSON.parse(local)
					}
					catch (e){

					}
				}

				return values;
				
			},

			init : function(clbk){
				var values = self.sdk.usersettings.load();
				var m = self.sdk.usersettings.meta;

				_.each(values, function(v, i){
					m[i].value = v
                })
                
                if (electron) {
                    const AutoLaunch = require('auto-launch');
                    let autoLaunch = new AutoLaunch({
                        name: 'Pocketnet',
                        path: electron.remote.app.getPath('exe'),
                        isHidden: true
                    });

                    // First launch
                    if (m.autostart.value === undefined) {
                        autoLaunch.enable();
                        m.autostart.value = true;
                        self.sdk.usersettings.save();
                    }

                    // Check autostart
                    autoLaunch.isEnabled().then((isEnabled) => {
                        m.autostart.value = isEnabled;

                        if (clbk) {
                            clbk()
                        }
                    });
                }
                else {
				    if (clbk) {
                        clbk()
                    }
                }
			}
		},

		user : {

			storage : {
			},

			survey : function(){

				if(!localStorage['survey1']){

					/*self.app.nav.api.load({
						open : true,
						href : 'surveyiframe',
						inWnd : true
					})*/

				}

        		

			},

			extendMe : function(me){
				var subscribe = deep(self, 'sdk.node.transactions.temp.subscribe')
			},

			meUpdate : function(clbk){
				self.sdk.user.get(clbk, true)
			},

			get : function(clbk, update){

				var storage = this.storage

				if(!storage.me || update)
				{
					storage.me = {};

					var temp = false;

					var ui = deep(self, 'sdk.node.transactions.temp.userInfo')

					if (ui && !_.isEmpty(ui)){

						temp = true;

						var u = new pUserInfo();

							u._import(_.toArray(ui)[0])

						storage.me = u

						if (clbk)
							clbk(storage.me, temp)
					}
					else
					{
						var a = self.sdk.address.pnet().address;

						self.sdk.users.get(a, function(){

							storage.me = self.sdk.users.storage[a] || {};

							if (clbk)
								clbk(storage.me, temp)

						})

						
					}

					
				}
				else
				{
					if (clbk)
						clbk(storage.me)
				}
			},

			waitActions : function(clbk){

				var storage = this.storage
				
				self.sdk.node.transactions.get.unspent(function(utxo){

					var wait = 'inf';

					_.each(utxo, function(tx){
						var _w = self.sdk.node.transactions.waitSpend(tx)

						if (wait == 'inf' || wait > _w){
							wait = _w;
						}
					})

					if(self.sdk.node.transactions.haveTemp()){

						if (wait == 'inf' || wait > 1)
							wait = 1;

					}

					// if (_.toArray(self.sdk.node.transactions.temp['userInfo']).length){
					// 	if(!wait){
					// 		wait = 1;
					// 	}
					// }

					if (clbk)
						clbk(wait)

				})
			},

			subscribeRef : function(clbk){

				var adr = self.app.platform.sdk.address.pnet().address;

				var adrref = localStorage[adr + 'subscribeRef'];

				if (adrref){
					self.sdk.users.get(adrref, function(){

						var r = self.sdk.usersl.storage[adrref]

						if (r){

							delete localStorage[adr + 'subscribeRef'];

							self.sdk.node.transactions.get.unspents(function(unspents){

								self.sdk.node.transactions.get.canSpend([adr], function(cs){

									if(cs){

										var src = r.image

										var h = '<div class="refaddWrapper">'

												h += '<div class="refaddHeader">'
													h += 'Would do you like to follow '+(r.name || adrref)+'?'
												h += '</div>'

												h += '<div class="refaddTable table">'
													h += '<div class="imageCell">'

														h += '<div class="usericon" image="'+ (src || '') + '">'
														
															if(!src){
																h += '<svg width="40" height="40" data-jdenticon-value="'+adrref+'"></svg>'
															}

														h += '</div>'

													h += '</div>'

													h += '<div class="nameCell">'

														h += (r.name || adrref)

													h += '</div>'

												h += '</div>'
											h += '</div>'

										dialog({
											html : h,
											btn1text : self.app.localization.e('dyes'),
											btn2text : self.app.localization.e('dno'),

											class : 'refadd',

											success : function(){



												var subscribe = new Subscribe();
													subscribe.address.set(adrref);

													topPreloader(10)

												self.sdk.node.transactions.create.commonFromUnspent(

													subscribe,

													function(tx, error){

														if(tx){

															

															var me = deep(self.app, 'platform.sdk.users.storage.' + adr)
															var u = self.app.platform.sdk.users.storage[adrref];

															if (me) me.addRelation({
																adddress : adrref,
																private : false
															})

															if(u){
																u.addRelation(adrref, 'subscribers')
															}

															delete localStorage[adr + 'subscribeRef'];
														}

														topPreloader(100)

													}
												)	
									
											},

											fail : function(){
												delete localStorage[adr + 'subscribeRef'];
											},

											close : function(){
												delete localStorage[adr + 'subscribeRef'];
											}
										})
									}
									

									

								})
							})
						}
						

					}, true)
				}
				
				if (clbk){
					clbk()
				}
				

			},

			me : function(){
				var me = null;
				var address = self.app.platform.sdk.address.pnet()

				if (address){
					me = self.app.platform.sdk.users.storage[address.address];

					return me
				}
			}
		},

		ustate : {
			storage : {},

			clbks : {},

			validationcurrent : function(address, parameter, clbk){
				var s = self.sdk.ustate.storage;


				if(!address && state) address = self.sdk.address.pnet().address;

				var info = s[address];
				var result = true;
				var error = false;

				if(!info){
					result = false;
					error = 'info';
				}
				else
				{

					if(!info.trial){
						if(parameter == 'postunspent' && info.post_unspent <= 0){
							result = false;
						}

						if(parameter == 'scoreunspent' && info.score_unspent <= 0){
							result = false;
						}
					}
					else
					{
						result = false;
						error = 'trial';
					}

					if(!result){
						error = parameter
					}
					
				}

				return result, error

			},

			attention : function(num, clbk){

				var s = self.sdk.ustate.storage;
				var address = self.sdk.address.pnet().address;

				self.app.user.isState(function(state){

					if(state){
						var info = s[address];

						var me = self.sdk.user.storage.me

						if(!me || !me.image || !me.name) {
							if (clbk)
								clbk('notuserinfo')

							return
						}

						if(!info){
							if (clbk)
								clbk('notinfo')

							return
						}

						if(info.post_unspent <= num){
							if (clbk)
								clbk('postunspent')

							return
						}

						if(info.score_unspent <= num){
							if (clbk)
								clbk('scoreunspent')

							return
						}

						/*if (info.trial){
							if (clbk)
								clbk('trial')

							return
						}*/
					}

					

					if (clbk)
						clbk(false)

				})

			},

			meUpdate : function(clbk){
				self.sdk.ustate.me(clbk, true)
			},

			me : function(clbk, update){
				var s = self.sdk.ustate.storage;

				self.app.user.isState(function(state){

					if(state){
						var address = self.sdk.address.pnet().address;

						self.sdk.ustate.get(address, function(){
							if (clbk)
								clbk(s[address])
						}, update)
					}
					else
					{
						if (clbk)
								clbk({})	
					}

					
				})

				
			},
			get : function(addresses, clbk, update){
				if(!_.isArray(addresses)) addresses = [addresses]

				var s = this.storage;
				var temp = self.sdk.node.transactions.temp;

				if(!update)

					addresses = _.filter(addresses, function(a){
						if(!s[a]) return true
					})

				addresses = _.uniq(addresses)

				if (addresses.length){

					self.app.ajax.rpc({
						method : 'getuserstate',
						parameters : [(addresses || []).join(',')],
						success : function(d){

							if(d && !_.isArray(d)) d = [d]

							_.each(d || [], function(info){
								s[info.address] = info
							})		

							 
							if (clbk)
								clbk(d)

						},

						fail : function(){
							if (clbk)
								clbk([])
						}
					})

				}
				else
				{
					if (clbk)
						clbk()
				}
			}
			 
		},

		notifications : {
			storage : {},

			inited : false,

			clbks : {
				added : {},
				seen : {}
			},
			load : function(){
				this.import(JSON.parse(localStorage[self.sdk.address.pnet().address + 'notificationsv11'] || "{}"))
			},
			save : function(){

				var e = this.export();


				if (e.notifications.length && e.block > blockps && this.inited == true){

					e.notifications = firstEls(e.notifications, 100)

					localStorage[self.sdk.address.pnet().address + 'notificationsv11'] = JSON.stringify(e)
				}
				
				
			},

			seenall : function(){
				var n = this

				_.each(n.storage.notifications, function(notification){
					if(!notification.seen)
						notification.seen = self.app.platform.currentTime()
				})

				n.save()

				_.each(n.clbks.seen, function(f){
					f()
				})
			},

			seen : function(ids){
				var n = this


				_.each(ids, function(id){

					var notification = _.find(n.storage.notifications, function(n){
						return n.txid == id
					})

					if (notification)
						notification.seen = self.currentTime()
				})

				n.save()

				_.each(n.clbks.seen, function(f){
					f()
				})
			},

			import : function(exported){
				var imported = [];

				_.each(exported.notifications, function(l){
					var imp = {};

					_.each(l, function(attr, i){


						if(attr.exported){
							var alias = new kits.alias[attr.type]()

							alias._import(attr.exported)

							imp[i] = alias
						}
						else
						{
							imp[i] = attr
						}

					})

					imported.push(imp)
				})

				if (imported.length)
					this.storage.notifications = imported

				if (exported.block)
					this.storage.block = exported.block


			},

			export : function(){
				var exported = [];


				_.each(this.storage.notifications, function(n){

					var l = {};

					_.each(n, function(attr, i){

						if(attr.export){
							l[i] = {
								exported : attr.export(),
								type : attr.type
							}
						}
						else{
							l[i] = attr
						}

					})

					exported.push(l)

				})

				return {
					block : this.storage.block,
					notifications : exported
				}
			},

			init : function(clbk){
				this.load();
				this.storage.block || (this.storage.block = 1)

				if(this.storage.block < blockps) this.storage.block = blockps;

				this.storage.notifications || (this.storage.notifications = [])

				_.each(this.storage.notifications, function(n){

					if (n.seen && n.seen.length >=15){
						n.seen = self.currentTime();
					}

				})

				this.getNotifications(clbk)
			},

			wsBlock : function(block){
				this.storage.block = block;

				this.save()
			},

			addFromWs : function(data){

				data.nblock || (data.nblock = self.currentBlock);

				if(data.msg == 'transaction' && data.address == self.sdk.address.pnet().address){
					return
				}

				if (this.storage.notifications){
					this.storage.notifications.unshift(data)

					_.each(this.clbks.added, function(f){
						f([data])
					})

					this.save()
				}
				
			},

			getNotificationsInfo : function(notifications, clbk){
				var n = this;


				notifications = _.filter(notifications, function(ns){
					if(ns.loading || ns.loaded || !self.ws.messages[ns.msg]) return false;

					if(ns.commentid && _.find(n.storage.notifications, function(n){
						return n.commentid == ns.commentid
					})) return false

					return true
				})

				notifications = _.sortBy(notifications, function(n){
					return -Number(n.nblock)
				})

				notifications = lastEls(notifications, 100)

				lazyEach({
					array : notifications, 
					action : function(p){

						var ns = p.item;

						ns.loading = true;

						if (self.ws.messages[ns.msg]){
							self.ws.messages[ns.msg].loadMore(ns, function(){
								ns.loaded = true;

								ns.loading = false;

								p.success()
							}, true)
						}

						else
						{
							p.success()
						}

						

					},
					sync : true,
					all : {
						success : function(){

							var ns = _.filter(notifications, function(no){
								if(no.msg == 'transaction' && no.address == self.sdk.address.pnet().address){
									return
								}

								return true
							})

							_.each(ns, function(no){
								n.storage.notifications.push(no)
							})

							_.each(n.clbks.added, function(f){
								f(ns)
							})

							

							//n.import(n.export())

							if (clbk)
								clbk()
						}
					}
				})
			},

			getNotifications : function(clbk){
				var n = this;

				self.app.ajax.rpc({
					method : 'getmissedinfo',
					parameters : [self.sdk.address.pnet().address, this.storage.block],
					success : function(d){	

						d || (d = [{block : blockps, cntposts : 0}])

						var notifications = (d || []).slice(1)		

						n.getNotificationsInfo(notifications, function(){

							n.inited = true;

							n.storage.block = d[0].block
							n.save()

							if (clbk)
								clbk()

						})		

					},
					fail : function(){

						
					}
				})
			}
		},

		usersl : {
			storage : {},
		},

		users : {
			loading : {},
			storage : {},


			extend : function(u, state){

				var temp = self.sdk.node.transactions.temp;


				if(state && self.sdk.address.pnet() && u.address == self.sdk.address.pnet().address){
          
					_.each(temp.blocking, function(block){
						u.addRelation(block.vsaddress, 'blocking')
					})

					_.each(temp.unblocking, function(block){
						u.removeRelation(block.vsaddress, 'blocking')
					})

					_.each(temp.subscribe, function(s){
						
						u.addRelation({
							adddress : s.vsaddress,
							private : false
						})	
					})

					_.each(temp.unsubscribe, function(s){
						
						u.addRelation({
							adddress : s.vsaddress,
							private : false
						})	
					})
				}
			},

			getone : function(address, clbk, light){
				var s = this.storage;
				var l = this.loading;

				if(!address || s[address]){
					if (clbk)
						clbk()
				}

				else
				{

					if (l[address]){
						retry(function(){

							return !l[address]

						}, function(){

							if (clbk)
								clbk()

						})

						return
					}

					l[address] = true;

					var params = [[address]];

					if (light){
						params.push('1')
					}

					self.app.user.isState(function(state){

						self.app.ajax.rpc({
							method : 'getuserprofile',
							parameters : params,
							success : function(d){

								l[address] = false;

								if(typeof pUserInfo != 'undefined'){

									_.each(d || [], function(data){
										var u = new pUserInfo();

										u._import(data)

										u.regdate = new Date();
										u.regdate.setTime(data.regdate * 1000);	

										u.address = data.address	
										
										self.sdk.users.extend(u, state)

										s[data.address] = u;

										self.sdk.usersl.storage[data.address] = u;


									})

								}
	
								if (clbk)
									clbk()

							},

							fail : function(){

								l[address] = false;

								if (clbk)
									clbk()
							}
						})

					})
				}
			},
			get : function(addresses, clbk, light){

				if(!_.isArray(addresses)) addresses = [addresses]

				var ia = addresses

				var s = this.storage;
				var temp = self.sdk.node.transactions.temp;

				if(light){
					s = self.sdk.usersl.storage
				}

				addresses = _.filter(addresses, function(a){

					if(!a) return false

					if(!s[a]) return true
				})

				addresses = _.uniq(addresses)

				if (addresses.length){

					self.app.user.isState(function(state){

						var params = [(addresses || [])];

						if (light){
							params.push('1')
						}

						self.app.ajax.rpc({
							method : 'getuserprofile',
							parameters : params,
							success : function(d){

								if(typeof pUserInfo != 'undefined'){

									_.each(d || [], function(data){
										var u = new pUserInfo();

										if(state && temp['userInfo'] && !_.isEmpty(temp['userInfo']) && data.address == self.sdk.address.pnet().address) {
											u._import(_.toArray(temp['userInfo'])[0])
										}	
										else
										{
											u._import(data)
										}

										u.address = data.address

										self.sdk.users.extend(u, state)

										u.regdate = new Date();
										u.regdate.setTime(data.regdate * 1000);	

																

										s[data.address] = u;

										self.sdk.usersl.storage[data.address] = u;

									})

								}
	 
								if (clbk)
									clbk()

							},

							fail : function(){
								if (clbk)
									clbk()
							}
						})
					})
				}
				else
				{
					if (clbk)
						clbk()
				}

				
			},


			/////////////// REGISTRATION

				requestFreeMoney : function(clbk){

					var a = self.sdk.address.pnet();

					if (a){
						a = a.address;

						this.checkFreeMoney(a, function(r){
							if(!r){
								if (clbk)
									clbk(null)
							}
							else
							{
								self.app.ajax.api({
									action : 'freeMoney',
									data : {
										address : a
									},
									success : function(d){
										if (clbk)
											clbk(true)

									},
									fail : function(d){

										if (clbk)
											clbk(null, deep(d, 'data') || {})
									}
								})
							}
						})
					}
					else
					{
						if (clbk)
							clbk(null)
					}

					
				},	

				giveFreeMoney : function(toAddress, mnemonic, clbk, amount){

					this.checkFreeMoney(toAddress, function(r){

						if(!r){
							if (clbk)
								clbk('nofree')
						}
						else
						{
							var feerate = 0.000001;

							amount || (amount = 0.3);
							
							var outputs = [{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							},{
								address : toAddress,
								amount : amount
							}]

							var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
							var hash = bitcoin.crypto.sha256(Buffer.from(seed));
							var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
							var keyPair = bitcoin.ECPair.fromWIF(d);
							var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;

							self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function(err, inputs, _outputs){

								if(err){
									if (clbk)
										clbk(err)
								}

								else
								{
									var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
									var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

									

									self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function(err, inputs, _outputs){

										if(err){

											self.sdk.node.transactions.releaseCS(inputs)

											if (clbk)
												clbk(err)
										}
										else
										{
											var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

											self.app.platform.sdk.node.transactions.send(tx, function(d, err){

												if (err){
													self.sdk.node.transactions.releaseCS(inputs)

													if (clbk)
														clbk(err)
												}

												else
												{
													var ids = _.map(inputs, function(i){
														return i.txid
													})

													self.app.platform.sdk.node.transactions.clearUnspents(ids)

													if (clbk)
														clbk(null, d)
												}
											})	
										}
									})
								}
							}, true)
						}

					})
				},	

				checkFreeMoney : function(address, clbk){
					self.sdk.users.get(address, function(){

						var name = deep(self, 'sdk.users.storage2.' + address + '.name');


						if (name){

							if (clbk)
								clbk(false)
						}

						else
						{
							self.sdk.address.registration(address, function(r){

								if(!r){

									self.sdk.node.transactions.get.balance(function(a){

										if(a > 0){
											if (clbk)
												clbk(false)
										}
										else
										{
											if (clbk)
												clbk(true)	
										}

									}, address, true)

								}
								else
								{
									if (clbk)
										clbk(false)
								}
							})
						}

					})
				},

			/////////////// REFERALS
				giveFreeRef : function(refferal, toAddress, mnemonic, clbk, amount){

					this.checkFreeRef(refferal, function(r){

						if(!r){
							if (clbk)
								clbk('nofree')
						}
						else
						{
							var feerate = 0.000001;

							amount || (amount = 3);
							
							var outputs = [{
								address : toAddress,
								amount : amount
							}]

							var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
							var hash = bitcoin.crypto.sha256(Buffer.from(seed));
							var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
							var keyPair = bitcoin.ECPair.fromWIF(d);
							var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;

							self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function(err, inputs, _outputs){

								if(err){
									if (clbk)
										clbk(err)
								}

								else
								{
									var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
									var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

									

									self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function(err, inputs, _outputs){

										if(err){

											self.sdk.node.transactions.releaseCS(inputs)

											if (clbk)
												clbk(err)
										}
										else
										{
											var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

											self.app.platform.sdk.node.transactions.send(tx, function(d, err){

												if (err){
													self.sdk.node.transactions.releaseCS(inputs)

													if (clbk)
														clbk(err)
												}

												else
												{
													var ids = _.map(inputs, function(i){
														return i.txid
													})

													self.app.platform.sdk.node.transactions.clearUnspents(ids)

													if (clbk)
														clbk(null, d)
												}
											})	
										}
									})
								}
							}, true)
						}

					})
				},
				requestFreeRef : function(address, clbk){

					var a = self.sdk.address.pnet();

					if (a){
						a = a.address;

						this.checkFreeRef(a, function(r){
							if(!r){
								if (clbk)
									clbk(null)
							}
							else
							{
								self.app.ajax.api({
									action : 'freeRef',
									data : {
										referal : a,
										referrer : address
									},
									success : function(d){
										if (clbk)
											clbk(true)

									},
									fail : function(d){
										if (clbk)
											clbk(null, deep(d, 'data') || {})
									}
								})
							}
						})
					}
					else
					{
						if (clbk)
							clbk(null)
					}

					
				},

				checkFreeRef : function(address, clbk){

				
					self.sdk.users.get(address, function(){

						var name = deep(self, 'sdk.users.storage2.' + address + '.name');
							
						if (name){
	
							if (clbk)
								clbk(false)
						}
	
						else
						{

							if (clbk)
								clbk(true)

							return

							self.sdk.address.registration(address, function(r){

	
								if(!r){
									if (clbk)
										clbk(true)
								}
								else{
									if (clbk)
										clbk(false)
								}
							})
						}
					})
				
					
				},

			//////////////// ANOTHER

			addressByName : function(name, clbk){


				var valid = true;

				try{
					bitcoin.address.fromBase58Check(name)
				}

				catch (e){
					valid = false;
				}

				if (valid){
					if (clbk)
						clbk(name)
				}
				else
				{

					self.app.ajax.rpc({
						method : 'getuseraddress',
						parameters : [name],
						success : function(d){


							var r = deep(d, '0.address');

							if (clbk)
								clbk(r || null)
						},
						fail : function(){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				}

			},

			nameExist : function(name, clbk){

				self.app.ajax.rpc({
					method : 'getuseraddress',
					parameters : [encodeURIComponent(name)],
					success : function(d){


						var r = deep(d, '0.address');

						if (clbk)
							clbk(r || false)
					},
					fail : function(){

						if (clbk){
					    	clbk(false)
					    }

					}
				})

			},

			replacePattern : function(str, h, p){


				var sreg = /@([^,]+),/g

				var name = str.match(sreg);

				if(!name) 
				{
					return str
				}
				else
				{
					var cname = h(name, p)

					return str.replace(sreg, cname)
				}

			}
		},

		exchanges : {
			storage : {},

			info : {},

			find : function(address){
				var ar = self.sdk.exchanges.get();

				return _.find(ar, function(ao){
					return ao.info.address == address
				})
			},

			get : function(){
				var all = []

				_.each(self.sdk.exchanges.storage, function(addresses, cur){
					_.each(addresses, function(i, pocaddress){

						_.each(i, function(i){


							all.push({

								pocaddress : pocaddress,
								currency : cur,
								info : i,

							})
						})
						
					})
				})

				

				all = _.filter(all, function(a){
					if (a.info) return true
				})

				all = _.sortBy(all, function(a){
					return Number(a.info.time)
				})

				return all;
			},

			load : function(clbk){
				self.sdk.exchanges.storage = JSON.parse(localStorage[self.sdk.address.pnet().address + 'exchanges2'] || "{}");

				if (clbk)
					clbk()
			},

			save : function(clbk){
				localStorage[self.sdk.address.pnet().address + 'exchanges2'] = JSON.stringify(self.sdk.exchanges.storage || {})

				if (clbk)
					clbk()
			},

			remove : function(currency, address){

				var storage = self.sdk.exchanges.storage;

				storage[currency] || (storage[currency] = {})

				_.each(storage[currency], function(a){

					delete a[address]
					
				})

				_.each(storage[currency], function(a, address){
					if(_.isEmpty(a)) delete storage[currency][address]
				})

				

				if(_.isEmpty(storage[currency])) 

					delete storage[currency]


				this.save()
			},

			reactivate : function(p, clbk){
				
				self.app.ajax.run({
					data : {
						Action : 'REACTIVATEPOCDEAL',
						Currency : p.currency.toUpperCase(),
						Address : p.address
					},
					success : function(d){
						self.sdk.exchanges.status(p.currency, p.address, clbk)
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
			},

			address : function(p, clbk){
				var storage = self.sdk.exchanges.storage

				var t = this

				storage[p.currency] || (storage[p.currency] = {})
				storage[p.currency][p.address] || (storage[p.currency][p.address] = {})
				
				self.app.ajax.run({
					data : {
						Action : 'GETADDRESSFORPOC',
						Currency : p.currency,
						address : p.address
					},
					success : function(d){

						if (d.Address){

							storage[p.currency][p.address][d.Address.Address] = {
								address : d.Address.Address,

								amount : p.amount,
								currencyAmount : p.currencyAmount,

								time : self.currentTime()
							};	

							t.save()

							self.sdk.exchanges.info[d.Address.Address] = d.Address


								

							if (clbk)
								clbk(null, {

									pocaddress : p.address,
									currency : p.currency,
									info : storage[p.currency][p.address]
									
								} , d.Address)
						}

						else
						{
							if (clbk)
								clbk('error', null)
						}
						
						

						
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})

				

			},
			statuses : function(clbk, list){

				if(!list) {
					list = [];

					_.each(self.sdk.exchanges.storage, function(addresses, cur){
						_.each(addresses, function(i, pocaddress){

							_.each(i, function(i){
								list.push({
									Currency : cur.toUpperCase(),
									Address : i.address
								})
							})
							
						})
					})
				}


				self.app.ajax.run({
					data : {
						Action : 'GETPOCDEALSTATUS',
						List : JSON.stringify(list)
					},
					success : function(d){

						if (d.Deal){

							if(!_.isArray(d.Deal)) d.Deal = [d.Deal]

							_.each(d.Deal, function(i){
								self.sdk.exchanges.info[i.Address] = i
							})

							if (clbk)
								clbk(null , d.Deal)
						}
						else
						{
							if (clbk)
								clbk('empty', null)
						}
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
				 
			},
			status : function(currency, address, clbk){


				self.app.ajax.run({
					data : {
						Action : 'GETPOCDEALSTATUS',
						Currency : currency,
						Address : address
					},
					success : function(d){


						if (d.Deal){
							if (clbk)
								clbk(null, d.Deal)
						}
						else
						{
							if (clbk)
								clbk('empty', null)
						}
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
				 
			},	

			rates : function(clbk){

				self.app.ajax.run({
					data : {
						Action : 'GETPOCRATES',
					},
					success : function(d){

						var rates = {}

						d.Rate || (d.Rate = [])

						_.each(d.Rate, function(r, i){
							rates[r.Currency.toLowerCase()] = Number(r.Rate) / 100000000
						})

						if (clbk)
							clbk(rates)
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})

			}
		},

		wallet : {
			txbase : function(adresses, outputs, fee, feeMode, clbk, update){


				if(!fee) fee = 0;

				if(!feeMode) feeMode = 'include'

				var total = _.reduce(outputs, function(m, o){
					return m + Number(o.amount)
				}, 0)

				if(feeMode != 'include'){
					total = total + fee;
				}

				if(total <= 0){
					if (clbk)
						clbk('total')

					return
				}

				self.sdk.node.transactions.get.unspents(function(unspents){
					var allunspents = [];

					_.each(unspents, function(ua, i){

						ua = _.filter(ua, self.sdk.node.transactions.canSpend)

						_.each(ua, function(unspent){
							if (unspent.amount)
								allunspents.push(unspent)
						})						
					})

					var totalInWallet = _.reduce(allunspents, function(m, u){
						return m + Number(u.amount)
					}, 0)

					if(!allunspents.length){
						if (clbk)
							clbk('unspents')

						return
					}


					if(totalInWallet < total){
						if (clbk)
							clbk('money')

						return
					}

					var _allunspents = _.sortBy(allunspents, function(u){
						return Math.abs(u.amount - total)
					})

					var inputs = [];
					var _total = 0;

					_.each(_allunspents, function(unspent){

						if(_total < total){

							inputs.push(unspent)

							_total = _total + unspent.amount;

						}

					})

					if(_total > total  && (_total.toFixed(8) - total.toFixed(8)) > 0){

						outputs.push({
							address : inputs[0].address,
							amount : _total - total
						})

					} 

					if(feeMode == 'include'){
						outputs[0].amount = outputs[0].amount - fee;

						if(outputs[0].amount <= 0){
							if (clbk)
								clbk('fee')

							return
						}
					}

					if (clbk)
						clbk(null, inputs, outputs)

				}, adresses, update)

			},

			drawSpendLine : function(el, clbk, addresses){
				self.app.platform.sdk.node.transactions.get.canSpend(addresses || null, function(amount, total){
				
					if(total > 0 && amount < total){

						el.css('position', 'relative')

						if(!el.find('.spendLine').length){
							el.append('<div class="spendLine"><div class="line"></div></div>')
						}
						
						var line = el.find('.spendLine .line');
						var sline = el.find('.spendLine .line');;

						if(amount == 0){
							sline.addClass('bad')
						}
						else
						{
							sline.removeClass('bad')
						}


							line.animate({
								width : (100 * amount / total) + "%",
							}, 140)

					}
					else
					{
						el.find('.spendLine').remove()
					}

					if (clbk)
						clbk()
				})
			},

			txbaseFees : function(address, outputs, keyPair, feerate, clbk){
				self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function(err, inputs, _outputs){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
			 			var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

			 			self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function(err, inputs, _outputs){

							if(err){
								if (clbk)
									clbk(err)
							}
							else
							{
								var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

								self.app.platform.sdk.node.transactions.send(tx, function(d, err){

									if (err){
										if (clbk)
											clbk(err)
									}

									else
									{
										var ids = _.map(inputs, function(i){
											return i.txid
										})

										self.app.platform.sdk.node.transactions.clearUnspents(ids)

										if (clbk)
											clbk(null, d)
									}
								})	
							}
						})
			 		}
			 	}, true)
			},

			sendchecking : function(){
				self.app.ajax.api({
					action : 'send',
					data : {
						value : 0.5,
						address : 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82',
						private : 'drip enhance business garage transfer planet phrase course prosper myth blade sample'
					},
					success : function(d){

					},
					fail : function(d){

					}
				})
			},


			send : function(toAddress, mnemonic, amount, clbk){

				mnemonic = mnemonic.replace(/\+/g, ' ');

				var feerate = 0.000001;

				var outputs = [{
					address : toAddress,
					amount : amount
				}]

				var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
				var hash = bitcoin.crypto.sha256(Buffer.from(seed));
				var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
			    var keyPair = bitcoin.ECPair.fromWIF(d);
			 	var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;


			 	self.sdk.wallet.txbaseFees(address, outputs, keyPair, feerate, function(err, d){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			if (clbk)
							clbk(null, d)
			 		}
			 	}, true)
			
			},

			sendmany : function(mnemonic, outputs, clbk){

				mnemonic = mnemonic.replace(/\+/g, ' ');

				var feerate = 0.000001;

				var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
				var hash = bitcoin.crypto.sha256(Buffer.from(seed));
				var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();	

			    var keyPair = bitcoin.ECPair.fromWIF(d);
			 	var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;


			 	self.sdk.wallet.txbaseFees(address, outputs, keyPair, feerate, function(err, d){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			if (clbk)
							clbk(null, d)
			 		}
			 	}, true)
			
			}
		},
		addresses : {
			storage : {

			},

			init : function(clbk){

				if(!self.sdk.addresses.storage.addresses) self.sdk.addresses.storage.addresses = [];
				if(!self.sdk.addresses.storage.addressesobj) self.sdk.addresses.storage.addressesobj = [];

				var anum = localStorage[self.sdk.address.pnet().address + 'addressesNum'] || 1;

				for(var i = 0;  i < anum; i++){

					self.sdk.addresses.addWalletAddress(i)

				}

				self.sdk.addresses.save()

				if (clbk)
					clbk()
			},

			save : function(){

				if (self.sdk.addresses.storage.addresses.length){
					localStorage[self.sdk.address.pnet().address + 'addressesNum'] = self.sdk.addresses.storage.addresses.length
				}
			},

			addWalletAddress : function(num){

				if(typeof num == 'undefined') num = self.sdk.addresses.storage.addresses.length;

				var address = self.sdk.address.wallet(num)

				self.sdk.addresses.storage.addresses[num] = address.address;
				self.sdk.addresses.storage.addressesobj[num] = address;

				return address.address;
			},

			addNewWalletAddress : function(clbk){
				if (self.sdk.addresses.storage.addresses.length){

					var finded = null;

					lazyEach({
						array : self.sdk.addresses.storage.addresses,
						action : function(p){

							if (finded){
								p.success();

								return 
							}

							var address = p.item;

							self.sdk.node.transactions.get.unspent(function(u){

								if(!u.length){
									finded = address;
								}

								p.success()

							}, address)
						},

						all : {
							success : function(){

								if(!finded){
									finded = self.sdk.addresses.addWalletAddress()
								}	

								if (clbk)
									clbk(finded)

							}
						}
					})

				} 

				else
				{
					var address = self.sdk.addresses.addWalletAddress()

					if (clbk)
						clbk(address)
				}
			}
		},
		address : {
			storage : {

			},
			path : function(n){
				return "m/44'/0'/0'/"+n+"'"
			},
			pnetsimple : function(pubkey){

				var type = 'p2pkh';
				var	a;			

				if(type == 'p2pkh' || type == 'p2wpkh'){
					a = bitcoin.payments[type]({ pubkey: pubkey })

					return a;
				}

			},
			pnet : function(pubkey, type){

				type || (type = self.addressType)


				var pubkeyRefresh = false;

				if(!pubkey) pubkey = self.app.user.key.value;

				else{
					pubkeyRefresh = true;
				}

				if(!pubkey){


					return null
				}

				var _a = this.storage[type], 
					a;

				if (_a && !pubkeyRefresh){
					return _a
				}				

				if(type == 'p2pkh' || type == 'p2wpkh'){
					a = bitcoin.payments[type]({ pubkey: pubkey })

					this.storage[type] = a;

					return a;
				}

				if(type == 'p2sh'){

					a = bitcoin.payments['p2wpkh']({ pubkey: pubkey})

					var p2sh = bitcoin.payments.p2sh({ redeem: a })

					this.storage[type] = p2sh;

					return p2sh;
				}
			},

			wallet : function(n, private){

				var d = bitcoin.bip32.fromSeed(private || self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				var pubkey = keyPair.publicKey;

				var a = bitcoin.payments['p2wpkh']({ pubkey: pubkey })

				var p2sh = bitcoin.payments.p2sh({ redeem: a })

				return p2sh;
				
			},

			dumpKeys : function(n){
				var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				return keyPair;
			},

			dumpPrivKey : function(n){
				var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				return keyPair.privateKey;
			},

			registration : function(address, clbk){
				 

				self.app.ajax.rpc({
					method : 'getaddressregistration',
					parameters : [[address]],
					success : function(d){

						var r = deep(d, '0.date') || 0;

						if (clbk)
							clbk(r > 0)
					},
					fail : function(){

						if (clbk){
					    	clbk(null, 'network')
					    }

					}
				})

			}
		},
		remote : {
			storage : {},
			failed : {},

			get : function(url, clbk, action){

				var s = this.storage;
				var f = this.failed;

				if (f[url]){

					if (clbk)
						clbk(null)

					return 
				}

				if (s[url]){
					if (clbk)
						clbk(s[url])
				}

				else
				{

					s[url] = {};

					self.app.ajax.api({
						action : action || 'urlPreview',
						data : {
							url : hexEncode(url)
						},
						success : function(d){
							var og = deep(d, 'data.og');

							s[url] = og

							if(!s[url])
								f[url] = true

							if (clbk)
								clbk(s[url])
						},
						fail : function(){
							f[url] = true

							if (clbk)
								clbk(null)
						}
					})
				}

				
			}
		},
		tags : {
			storage : {
				all : ['love', 'followback', 'instagramers', 'socialsteeze', 'tweegram', 'photooftheday', '20likes', 'amazing', 'smile', 'follow4follow', 'like4like', 'look', 'instalike', 'igers', 'picoftheday', 'food', 'instadaily', 'instafollow', 'followme', 'girl', 'instagood', 'bestoftheday', 'instacool', 'carryme', 'follow', 'colorful', 'style', 'swag', 'fun', 'instagramers', 'model', 'socialsteeze', 'food', 'smile', 'pretty', 'followme', 'nature', 'lol', 'dog', 'hair', 'sunset', 'swag', 'throwbackthursday', 'instagood', 'beach', 'friends', 'hot', 'funny', 'blue', 'life', 'art', 'photo', 'cool', 'carryme', 'bestoftheday', 'clouds', 'amazing', 'socialsteeze', 'fitness', 'followme', 'all_shots', 'textgram', 'family', 'instago', 'igaddict', 'awesome', 'girls', 'instagood', 'my', 'bored', 'baby', 'music', 'red', 'green', 'water', 'bestoftheday', 'black', 'party', 'white', 'yum', 'flower', 'carryme', 'night', 'instalove', 'photo', 'photos', 'pic', 'pics', 'socialsteeze', 'picture', 'pictures', 'snapshot', 'art', 'beautiful', 'instagood', 'picoftheday', 'photooftheday', 'color', 'all_shots', 'exposure', 'composition', 'focus', 'capture', 'moment', 'hdr', 'hdrspotters', 'hdrstyles_gf', 'hdri', 'hdroftheday', 'hdriphonegraphy', 'hdr_lovers', 'awesome_hdr']
			},

			search : function(str, clbk){

				str = str.toLowerCase().replace(/[^a-z0-9_]/g, '');

				var s = _.filter(this.storage.all, function(t){

					if(t.indexOf(str) > -1) return true; 

				})

				s = _.uniq(s)

				if (clbk)
					clbk(lastEls(s, 7))

			}
		},

		search : {
			storage : {
				all : {},
				fs : {},
				posts : {},
				users : {}
			},

			add : function(fixedBlock, type, result, start, count){
				var s = this.storage;

				if(!s[type][fixedBlock]){
					s[type][fixedBlock] = result;
				}

				else
				{
					for(var i = 0; i < count; i++){

						if (result.data[i])

							s[type][fixedBlock].data[start + i] = result.data[i]
					}
				}
				
			},

			preview : function(fixedBlock, type, start, count){
				var s = this.storage;
				
				if (type != 'fs' && type != 'all'){
					
					for(var i = 0; i < count; i++){

						if(!s[type][fixedBlock].data[start + i])

							s[type][fixedBlock].data[start + i] = {
								preview : true,
								index : start + i
							}
					}

				}
			},

			get : function(value, type, start, count, fixedBlock, clbk, preview){

				var s = self.sdk.search;


				fixedBlock || (fixedBlock = self.currentBlock);

				type || (type = 'fs')
				
				s.preview(fixedBlock, type, start, count)

				value = trim(value.replace(/[^a-zA-Z0-9\# ]+/g, ''))

				if(value.length){
					self.app.ajax.rpc({
						method : 'search',
						parameters : [encodeURIComponent(value), type, fixedBlock, (start || 0).toString(), (count || 10).toString()],
						success : function(d){

							if (type != 'fs'){

								if(type == 'all'){
									_.each(d, function(d, k){
										s.add(fixedBlock, k, d, start, count)
									})
								}
								else
								{
									d = d[type] || {
										data : []
									}

									s.add(fixedBlock, type, d, start, count)
								}

							}

							if (clbk)
								clbk(d, fixedBlock)
						},
						fail : function(){
							if (clbk){
						    	clbk({})
						    }
						}
					})
				}
				else
				{
					if (clbk){
				    	clbk({})
				    }
				}

				

			}
		},

		comments : {
			storage : {},

			sendclbks : {
			},

			find : function(txid, id, pid){
				var s = self.sdk.comments.storage;

				var comments = deep(s, txid + '.' + (pid || '0')) || [];

				var comment = _.find(comments, function(c){
					return c.id == id
				})

				return comment
			},

			address : function(txid, id, pid){

				var comment = self.sdk.comments.find(txid, id, pid);

				if(comment) return comment.address

				return '' 
			},

			users : function(comments, clbk){
				var addresses = _.map(comments, function(r){
					return r.address
				})

				self.sdk.users.get(addresses, function(){
					if (clbk)
						clbk()
				}, true)
			},

			info : function(ids, clbk){
				var s = self.sdk.comments.storage;
				var i = self.sdk.comments.ini;

				self.app.ajax.rpc({
					method : 'getcomments',
					parameters : ['', '', ids],
					success : function(d){

						var m = i(d);

						if (clbk)
							clbk(null, m)
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }
					}
				})
			},

			checkSign : function(comment, signature, pubkey){

				var verify = false

				try {
					var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pubkey, 'hex'))

					var str = comment.serialize();

					var hash = Buffer.from(bitcoin.crypto.hash256(str), 'utf8')

					verify = keyPair.verify(hash, Buffer.from(signature, 'hex'));

					if(!verify)
					{
						//console.log(comment)
						//console.log(str, signature, pubkey)
					}
				}

				catch (e){

				}

				return verify

			},

			toLastComment : function(comment){

				var lc = {
					address : comment.address,
					answerid : comment.answerid,
					parentid : comment.parentid,
					id : comment.id,
					children : comment.children || 0,
					postid : comment.txid,
					block : self.currentBlock,
					msg : JSON.stringify({
						m : comment.message
					}),
					time : comment.time,
					timeupd : comment.timeupd,
					pubkey : comment.pubkey,
					signature : comment.signature
				}

				return  lc;
			},

			ini : function(d){

				var c = _.map(d || [], function(data){
					var comment = new pComment();

					comment.setTime(data.time, data.timeupd)

					comment.txid = data.postid
					comment.children = data.children
					comment.address = data.address;
					comment.id = data.id

					comment.parentid = data.parentid
					comment.answerid = data.answerid

					comment.signature = data.signature
					comment.pubkey = data.pubkey

					var msg = {};

					try{

						msg = JSON.parse(data.msg)

					}
					catch (e){
						msg = {
							m : msg
						}
					}

					comment._import(msg)


					comment.verify = self.sdk.comments.checkSign(comment, data.signature, data.pubkey)

					return comment
				})

				c = _.filter(c, function(comment){
					if(comment.verify) return true
				})

				return c
			},

			get : function(txid, pid, clbk, ccha){

				var s = self.sdk.comments.storage;
				var i = self.sdk.comments.ini;

				s[txid] || (s[txid] = {})


				/*if(!ccha && ((!pid && s[txid]['0']) || s[txid][pid])){

					if (clbk)
						clbk(s[txid][pid])

					return
				}*/


				self.app.ajax.rpc({
					method : 'getcomments',
					parameters : [txid, pid || ''],
					success : function(d){

						var c = i(d)

						s[txid][pid || '0'] = c

						self.sdk.comments.users(c, function(){

							if (clbk)
								clbk(c)

						})

						
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }
					}
				})
			},

			send : function(txid, comment, pid, aid, clbk, editid, fid){

				var s = self.sdk.comments.storage;

				var keyPair = self.app.user.keys();

				//comment.message.v = 'tst'
				//
				

				
				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(comment.serialize()), 'utf8'));	

				var id = editid || makeid();

				var parameters = [
					id,
					txid, 
					self.app.platform.sdk.address.pnet().address, 
					keyPair.publicKey.toString('hex'), 
					signature.toString('hex'), 
					JSON.stringify(comment.export()), 
					pid || '', 
					aid || ''
				];

				var verify = keyPair.verify(
					bitcoin.crypto.hash256(comment.serialize()), 
					Buffer.from(signature.toString('hex'), 'hex')
				);


				self.app.ajax.rpc({
					method : 'sendcomment',
					parameters : parameters,
					success : function(d){

						var temptime = self.currentTime()

						var alias = comment.alias(id, temptime, temptime, 0, self.app.platform.sdk.address.pnet().address);

						var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid);

						if (share && (!pid || pid == '0')) share.comments++

						alias.parentid = pid || ''
						alias.answerid = aid || ''

						alias.pubkey = parameters[3]
						alias.signature = parameters[4]

						s[txid] || (s[txid] = {})

						s[txid][pid || '0'] || (s[txid][pid || '0'] = [])

						var i = findIndex(s[txid][pid || '0'], function(c){
							if(c.id == editid) return true;
						})

						if(!editid || i == -1){
							s[txid][pid || '0'].push(alias)
						}
						else{

							alias.children = s[txid][pid || '0'][i].children

							s[txid][pid || '0'][i] = alias

						}

						

						alias.verify = true

						if (clbk)
							clbk(null, alias)

						_.each(self.sdk.comments.sendclbks, function(c){
							c(null, alias, txid, pid, aid, editid, fid)
						})
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }

					    _.each(self.sdk.comments.sendclbks, function(c){
							c('network')
						})
					}
				})
			}
		},
		
		node : {
			storage : {
				balance : {

				}
			},
			loading : {

			},
			updating : null, 

			update : function(){
				var a = ['get.lastBlockHeader']

				var update = function(){
					self.sdk.node.loading.update = true;

					lazyEach({
						array : a,
						action : function(p){
							var a = deep(self.sdk.node, p.item)

							if(!a){
								p.success()
							}
							else
							{
								a(p.success)
							}
							
						},

						all : {
							success : function(){
								self.sdk.node.loading.update = false;
							}
						}
					})
				}

				update();

				this.updating = retry(function(){

					return !self.sdk.node.loading.update

				}, function(){

					update();

				}, 40000, true)
			},

			get : {

				time : function(clbk){

					self.app.ajax.rpc({
						method : 'getnodeinfo',
						parameters : [],
						success : function(d){

							var t = deep(d, 'time') || 0
							self.currentBlock = localStorage['lastblock'] || deep(d, 'lastblock.height') || 0
							self.timeDifference = 0;

							blockps = self.currentBlock - 5000;

							if (t){

								var d = new Date()
								
								self.timeDifference = t - Math.floor((d.getTime()) / 1000)
								self.timeDifferenceTimeZone = t -  Math.floor((d.getTime() + (d.getTimezoneOffset() * 60000)) / 1000) ;

								console.log('self.timeDifference', self.timeDifference)
							}

							if (clbk)
								clbk()
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})

					
				},

				address : function(){

					if(typeof _Test != 'undefined' && _Test){
						return self.nodes_test[0]
					}

					return self.nodes[1]
				},
				callNode : function(action, clbk, cashe){

					if(cashe && self.sdk.node.loading[cashe]){
						retry(function(){

							return !self.sdk.node.loading[cashe]

						}, function(){

							if (clbk)
								clbk(self.sdk.node.loading[cashe])

						})
					}
					else
					{
						if(cashe)
							self.sdk.node.loading[cashe] = true;

						self.app.ajax.rpc({
							method : action,
							success : function(d){

								if(cashe){
									self.sdk.node.storage[cashe] = d;
									self.sdk.node.loading[cashe] = false;
								}
								

								if (clbk)
									clbk(d)
							},
							fail : function(){
								if (clbk)
									clbk(null)
							}
						})
					}

				},
				
				blockNumber : function(clbk){
					this.callNode('getbestblockhash', function(num){

						self.currnetBlock = num;

					}, 'blocknumber')
				},

				balance : function(address, clbk){

					var s = self.sdk.node.storage.balance;

					self.app.ajax.rpc({
						method : 'getBalance',
						parameters : ["*", 6],
						success : function(d){

							s[address] = d.result;
							
							if (clbk)
								clbk(s[email])
						},
						fail : function(){
							if (clbk){
						    	clbk(s[email])
						    }
						}
					})
				}
			},

			account : {
				import : function(address, clbk){
					self.app.ajax.rpc({
						method : 'importAddress',
						parameters : [address, address, 1],
						success : function(d){
						
							if (clbk)
								clbk()
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})
				},

				get : function(address, clbk){
					self.app.ajax.rpc({
						method : 'getAccount',
						parameters : [address, 1],
						success : function(d){
							if (clbk)
								clbk(d.result)
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})
				},

				getset : function(email, address, clbk){
					self.sdk.node.account.get(address, function(r){
						if(r){
							if (clbk){
						    	clbk()
						    }
						}
						else
						{
							self.sdk.node.account.import(email, address, clbk)
						}
					})
				}
			},

			shares : {
				storage : {

				},
				clbks : {
					added : {

					}
				},

				getWithTemp : function(id){

					var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + id)

					if(!share){
						var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
							return s.txid == id
						})


						share = new pShare();
						share._import(temp, true);
						share.temp = true;
						share.address = self.app.platform.sdk.address.pnet().address
					}

					return share
				},

				users : function(shares, clbk){
					var users = [];

					_.each(shares || [], function(s){

						users.push(s.address) 

						var cuser = deep(s, 'lastComment.address')

						if (cuser)
							users.push(cuser) 
					})

					self.sdk.users.get(users, clbk, true)
				},
				add : function(share){

				////todo

					this.storage[share.txid] = share;

					_.each(this.clbks.added, function(a){
						a(share)
					})
				},

				tempLikes : function(shares){

					_.each(self.sdk.node.transactions.temp.upvoteShare, function(tempShare){

						var txid = tempShare.share;

						_.find(shares, function(share){

							if(share.txid == txid){

								share.upvote(tempShare.value)

								share.scnt || (share.scnt = 0)
								share.score || (share.score = 0)

								share.scnt++;
								share.score = Number(share.score || 0) + Number(tempShare.value);

								return true
							}

							
						})

					})
				},

				txids : function(p, clbk, refresh){
					this.getbyid(p.txids, clbk, refresh)
				},

				getbyid : function(txids, clbk, refresh){

					var storage = this.storage;
						storage.trx || (storage.trx = {})

					var loaded = [];

					if(!_.isArray(txids)) txids = [txids];

					if(!refresh){
						txids = _.filter(txids, function(id){

							if(!storage.trx[id]) {
								return true;
							}
							else
							{
								loaded.push(storage.trx[id])
							}
						})
					}

					if(txids.length){

						var parameters = [txids]

						var temp = self.sdk.node.transactions.temp;

						var a = self.sdk.address.pnet()

						if (a){
							parameters.push(a.address)
						}

						self.app.user.isState(function(state){
							self.app.ajax.rpc({
								method : 'getrawtransactionwithmessagebyid',
								parameters : parameters || [],
								success : function(d){

									if(d && !_.isArray(d)) d = [d];

									d = _.filter(d || [], function(s){
										if(s.address) return true
									})

									var shares = _.map(d || [], function(share){

										var s = new pShare();

											s._import(share);

											s.txid = share.txid;

											s.time = new Date();

											s.address = share.address

											s.time.setTime(share.time * 1000);

											s.score = share.scoreSum;
											s.scnt = share.scoreCnt;

											storage.trx[s.txid] = s;

											if(state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]


										return s

									})

									loaded = loaded.concat(shares)

									self.sdk.node.shares.tempLikes(loaded)

									if (clbk)
										clbk(loaded, null, {
											count : txids.length
										})
								},
								fail : function(){
									if (clbk){
								    	clbk(null, 'network', {})
								    }
								}
							})
						})

					}
					else
					{
						if (clbk)
							clbk(loaded, true)
					}

					
				},	

				transform : function(d, state){
					var storage = this.storage;

						storage.trx || (storage.trx = {})

					var temp = self.sdk.node.transactions.temp;

					d = _.filter(d || [], function(s){
						if(s.address) return true
					})

					var shares = _.map(d || [], function(share){

						var s = new pShare();

							s._import(share);

							s.txid = share.txid;

							s.time = new Date();

							s.address = share.address

							s.time.setTime(share.time * 1000);

							s.score = share.scoreSum;
							s.scnt = share.scoreCnt;

							s.edit = share.edit || false

							if(state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]


						storage.trx[s.txid] = s;

						return s

					})

					self.sdk.node.shares.tempLikes(shares)

					return shares
				},

				get : function(parameters, clbk, method){

					method || (method = 'getrawtransactionwithmessage')

					var storage = this.storage;

					var temp = self.sdk.node.transactions.temp;

						storage.trx || (storage.trx = {})



					self.app.user.isState(function(state){
						self.app.ajax.rpc({
							method : method,
							parameters : parameters || [],
							success : function(d){

								var shares = self.sdk.node.shares.transform(d, state)

								if (clbk)
									clbk(shares)
							},
							fail : function(){
								if (clbk){
							    	clbk([], 'network')
							    }
							}
						})
					})
				},

				/*recomended : function(p, clbk){

					self.app.user.isState(function(state){

						if(state){
							if(!p) p = {};

								p.count || (p.count = '10')

								p.address = self.sdk.address.pnet().address;

							var key = (p.address || "") + "_recomended"

							var storage = self.sdk.node.shares.storage;
							var s = self.sdk.node.shares;

							if (storage[key]){
								if (clbk)
									clbk(storage[key])
							}
							else
							{
								s.get([p.address, p.count], function(shr){

									storage[key] = shr || [];

									if (clbk)
										clbk(storage[key])


								}, 'getrecommendedposts')
							}

						}
						else{
							if (clbk)
								clbk([])
						}

						

					})
				},*/

				recommended : function(p, clbk){

				
					if(!p) p = {};

					self.app.user.isState(function(state){


					
							p.count || (p.count = '30')

							var storage = self.sdk.node.shares.storage
							var key = 'recommended'

							if (storage[key]){

								if (clbk)
									clbk(storage[key], null, p)

							}
							else
							{
								var parameters = [p.count];

								self.sdk.node.shares.get(parameters, function(shares, error){

									if(shares){

										storage[key] = shares;

										if (clbk)
											clbk(storage[key], null, p)
									}

									else{
										if (clbk)
											clbk(shares, error, p)
									}

								}, 'gethotposts')
							}

					})
				},

				common : function(p, clbk, cache){

					self.app.user.isState(function(state){

						if(!p) p = {};

							p.count || (p.count = 10)

						if(state){
							p.address = self.sdk.address.pnet().address;
						}

						var key = (p.address || "") + "_" + (p.author || "") + "_" + (p.begin || "")

						var temp = self.sdk.node.transactions.temp;

						var storage = self.sdk.node.shares.storage

							

						var s = self.sdk.node.shares;

						if (cache == 'cache' && storage[key]){

							console.log('storage[key]', storage[key])

							var tfinded = null;
							var added = 0;

							if(!p.txid) tfinded = true;

							var shares = _.filter(storage[key], function(s, i){
								if(tfinded && added < p.count){

									added++;

									return true;
								}

								if(s.txid == p.txid) {
									tfinded = true;
								}
							})

							if (clbk)
								clbk(storage[key], null, p)

						}
						else
						{

							storage[key] || (storage[key] = [])

							if(cache == 'clear') storage[key] = [];

							if(!p.txid){
								if(storage[key].length){

									if(p.count > 0){
										var st = storage[key][storage[key].length - 1]

										p.txid = st.txid
									}
									else
									{
										var st = storage[key][0]

										p.txid = st.txid
									}

								}
							}

							if(!p.txid) p.txid = p.begin || ''

							var parameters = [p.address, p.author || "", p.txid || "", p.count];

							s.get(parameters, function(shares, error){

								if(shares){
									if(state){


										if(!p.author || p.author == p.address){
											_.each(temp.share, function(ps){


												var s = new pShare();
													s._import(ps, true);
													s.temp = true;
													s.address = ps.address

												if(ps.txidEdit){
													
													replaceEqual(shares, {
														txid : ps.txidEdit
													}, s)
												}

												else{
													shares.unshift(s)
												}

												
											})
										}

										_.each(temp.blocking, function(block){
											_.each(shares, function(s){
												if(s.address == block.address) s.blocking = true;
											})
										})
									}

									_.each(shares || [], function(s){

										if(p.count > 0){
											storage[key].push(s)
										}
										else
										{
											storage[key].unshift(s)
										}

									})
									
									self.sdk.node.transactions.saveTemp()

									if (clbk)
										clbk(shares, null, p)
								}

								else{
									if (clbk)
										clbk(shares, error, p)
								}

							})
							
						
						}
					})
				}
			},

			transactions : {

				unspent : null,

				storage : {},

				loading : {},

				unspentLoading : {},

				temp : {},

				clbks : {

				},

				tempOptions : {
					userInfo : {
						count : 'one'
					}
				},

				kr : function(amount, count, clbk){
					var address = app.platform.sdk.address.pnet().address

					var outputs = [];
					var part = 0;


					app.platform.sdk.node.transactions.get.balance(function(a){

						amount = Math.min(a, amount);

						part = amount / count;

						if(part > 0.01){

							for(var i = 0; i < count; i++){
								outputs.push({
									address : 'PUy71ntJeRaF1NNNnFGrmC8NzkY6ruEHGK',
									amount : part
								})
							}

							app.platform.sdk.wallet.sendmany('', outputs, function(err, r){
								if(err){
									console.log("ERROR, SEND TO KRAN", err)
								}

								else
								{
									console.log("SUCCESS")

									if (clbk)
										clbk()
								}
							})

						}

						else
						{
							console.log("ERROR, DUST")
						}						


					}, address, true, true)
				},

				addressFromScryptSig : function(asm){

					if(!asm) return ''

					var pub = asm.split(" ")[1];

					if(!pub) return ''

					var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pub, 'hex'))

					var a = self.sdk.address.pnetsimple(keyPair.publicKey).address

					return a
				},

				toUT : function(tx, address, n){

					var vout = _.find(tx.vout, function(v){
						return _.find(v.scriptPubKey.addresses, function(a){
							return a == address && (typeof n == 'undefined' || n == v.n)
						})
					})

					var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false


					var t = {
						txid : tx.txid,
						vout : vout.n,
						address : address,
						confirmations : tx.confirmations || 0,
						coinbase : coinbase || tx.coinstake,
						amount : vout.value,
						scriptPubKey : vout.scriptPubKey.hex,
						pockettx : tx.pockettx
					}

					return t
					
				},

				toUTs : function(tx, address){

					var outs = [];

					_.each(tx.vout, function(vout){
						var a = _.find(v.scriptPubKey.addresses, function(a){
							return a == address && (typeof n != 'undefined' && n == vout.n)
						})

						if (a){
							var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false

							var t = {
								txid : tx.txid,
								vout : vout.n,
								address : address,
								confirmations : tx.confirmations,
								coinbase : coinbase || tx.coinstake,
								amount : vout.value,
								scriptPubKey : vout.scriptPubKey.hex,
								pockettx : tx.pockettx
							}

							outs.push(t)

						}
					})

					

					return outs
					
				},

				waitSpend : function(tx){


					if(tx.confirmations <= 11 && tx.pockettx){

						return 11 - tx.confirmations

					}

					if(tx.confirmations == 0 && !tx.coinbase && !tx.coinstake){

						return 1

					}


					if(tx.confirmations < 100 && (tx.coinbase || tx.coinstake)){

						return 100 - tx.confirmations

					}

					return 0
				},


				releaseCS : function(inputs){
					_.each(inputs, function(t){
		 				delete t.cantspend
		 			})
				},


				canSpend : function(tx){
					if (tx.cantspend) return false;

					var wait = self.sdk.node.transactions.waitSpend(tx)

					if(!wait) return true
				},

				sign : function(tx, clbk){
					var hex = tx.toHex();

				   	self.app.ajax.rpc({
						method : 'signrawtransactionwithkey',
						parameters : [hex, ['5x4PRe8jsgQNRykfmvqBbTNzBJZw4P2r5gD4zn1VksE8HRCz1sbE']],
						success : function(d){

							
							if (clbk)
								clbk(d)
						},
						fail : function(){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				   },

				send : function(tx, clbk){
					var hex = tx.toHex();
						   
				   	self.app.ajax.rpc({
						method : 'sendrawtransaction',
						parameters : [hex],
						success : function(d){

							
							if (clbk)
								clbk(d)
						},
						fail : function(d){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				},

				saveTemp : function(clbk){
					var a = self.sdk.address.pnet();

					if (a){
						self.app.settings.set(self.sdk.address.pnet().address, 'temp', JSON.stringify(self.sdk.node.transactions.temp))
					}

					if (clbk)
						clbk()
					
				},

				loadTemp : function(clbk){

					var a = self.sdk.address.pnet();

					if (a){
						self.sdk.node.transactions.temp = JSON.parse(self.app.settings.get(self.sdk.address.pnet().address, 'temp') || "{}")
					}
					else
					{
						self.sdk.node.transactions.temp = {};
					}

					if (clbk)
						clbk()

					
				},

				findTemp : function(txid){
					var t = this.temp;

					var finded = null;

					_.each(t, function(ts){

						if(ts[txid]){

							finded = ts[txid]
						}

							
					})


					return finded
				},

				clearTemp : function(txid){
					var t = this.temp;

					var finded = null;

					_.each(t, function(ts){

						if(ts[txid]){

							finded = ts[txid]

							delete ts[txid]
						}

							
					})


					return finded
				},

				checkTemps : function(clbk){


					var c = this.checkTemp
					var t = this.temp;

					var temps = [];

					var deleted = false;

					_.each(t, function(ts){

						_.each(ts, function(alias){
							temps.push(alias)
						})
					})

					lazyEach({
						array : temps,
						action : function(p){
							c(p.item, function(result){

								if(result){
									_.each(t, function(ts){

										if(ts[p.item.txid]){

											deleted = true

											delete ts[p.item.txid]
										}

											
									})
								}

								self.sdk.node.transactions.saveTemp()

								p.success()
							})
						},

						all : {
							success : function(){

								if(deleted){

									_.each(self.sdk.node.transactions.clbks, function(c){
										c();
									})

								}

								if(clbk)
									clbk()
							}
						}
					})

				},
				checkTemp : function(alias, clbk){
					if (alias && alias.txid){

						self.sdk.node.transactions.get.tx(alias.txid, function(d, _error){

							if (clbk){

								clbk((deep(d, 'data.code') == -5) || (deep(d, 'confirmations') > 0))
							
							}
						})


					}
					else
					{
						if (clbk){
					    	clbk(null)
					    }
					}
				},

				tempInputs : function(){
					var t = this.temp;

					var inputs = [];

					_.each(t, function(ts){

						_.each(ts, function(alias){

							if(alias.inputs){

								_.each(alias.inputs, function(i){
									inputs.push(i)
								})

							}
						})
					})




					return inputs

				},

				tempBalance : function(){
					var inputs = this.tempInputs()

					return _.reduce(inputs, function(m, i){

						return m + i.amount

					}, 0)
				},

				haveTemp : function(){
					var t = this.temp;

					var temps = 0;

					_.each(t, function(ts){

						_.each(ts, function(alias){
							temps++
						})
					})

					return temps
				},

				clearUnspents : function(txids){

					var cleared = false;
					var s = self.sdk.node.transactions;
					var amount = 0;
					var pnet = self.sdk.address.pnet();

					_.each(txids, function(id){				


						_.each(s.unspent, function(unspents, address){



							var r = removeEqual(unspents, {
								txid : id
							}) 

							/*_.find(byuser, function(unspents){

								return removeEqual(unspents, {
									txid : id
								})
							})*/

							if(r){ 
								cleared = true;

								if (pnet && address == pnet.address){
									amount = amount + Number(r.amount)
								}
								
							}

						})			

						
					
					})

					if(cleared){
						_.each(s.clbks, function(c){
							c(-amount);
						})
					}
				},

				get : {

					lenta : {
						common : function(){

						}
					},

					balanceAr : function(clbk, addresses, update, canSpend){
						this.unspents(function(us){

							var total = 0;

							var allunspents = [];

							_.each(us, function(unspent){

								if(canSpend){
									unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

								}

								var amount = _.reduce(unspent, function(m, u){
									return m + Number(u.amount)
								}, 0)

								allunspents = allunspents.concat(unspent)

								total += amount
							})

							if (clbk)
								clbk(total, allunspents)

						}, addresses, update)
					},

					allBalanceUpdate : function(clbk){
						self.sdk.node.transactions.get.allBalance(clbk, true)
					},

					allBalance : function(clbk, update){
						var addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || [])
					
						this.balanceAr(clbk, addresses, update)
					},

					canSpend : function(addresses, clbk){

						addresses || (addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || []))

						if(!_.isArray(addresses)) addresses = [addresses];

						this.balance(function(total, us){

							var usCanSpend = _.filter(us, self.sdk.node.transactions.canSpend);

							var amount = _.reduce(usCanSpend, function(m, u){
								return m + Number(u.amount)
							}, 0)

							if (clbk){
								clbk(amount, total)
							}


						}, addresses)
					},	

					balance : function(clbk, address, update, canSpend){

						if(_.isArray(address)){
							this.balanceAr(clbk, address, update, canSpend)

						}
						else{
							this.unspent(function(unspent){

								if(canSpend){
									unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)
								}

								var amount = _.reduce(unspent, function(m, u){
									return m + Number(u.amount)
								}, 0)

								if (clbk)
									clbk(amount, unspent)

							}, address, update)
						}

						
					},

					

					_unspent : function(clbk){

						var s = self.sdk.node.transactions;

						var p2pkh = self.sdk.address.pnet();
					

						self.app.ajax.rpc({
							method : 'listUnspent',
							parameters : [1, 9999999, [p2pkh.address]],
							success : function(d){							

								if (clbk)
									clbk(d || [])
							},
							fail : function(){
								if (clbk){
							    	clbk([])
							    }
							}
						})
					},

					_unspents : function(clbk, addresses, update){

						var a = {};


						lazyEach({
							array : addresses,

							action : function(p){
								var address = p.item;

								self.sdk.node.transactions.get.unspent(function(u){

									a[address] = u

									p.success()

								}, address, update)
							},

							all : {
								success : function(){


									if (clbk)
										clbk(a)
								}
							}
						})
					},

					unspents : function(clbk, addresses, update){


						var loadingAddressesClbk = function(){
							addresses = _.filter(addresses, function(address){
								if(s.unspent[address] && !update){

									a[address] = s.unspent[address]

									return false;
								}
								else
								{
									s.unspentLoading[address] = true;

									return true;
								}
							})

							if(!addresses.length){
								if (clbk)
									clbk(a)
							}

							else
							{
								self.app.ajax.rpc({
									method : 'txunspent',
									parameters : [addresses, 1, 9999999],
									success : function(d){

										_.each(d, function(u){
											self.sdk.node.transactions.clearTemp(u.txid);
										})

										_.each(addresses, function(address){
											s.unspentLoading[address] = false;
											s.unspent[address] = []

											a[address] = [];
										})

										_.each(d || [], function(tr){

											var address = tr.address


											removeEqual(s.unspent[address], {
												txid : tr.txid,
												vout : tr.vout
											})

											s.unspent[address].push(tr)
											a[address].push(tr)
										})

										_.each(self.sdk.node.transactions.clbks, function(c){
											c()
										})

										if (clbk)
											clbk(a)
									},
									fail : function(){

										_.each(addresses, function(address){

											s.unspent[address] = [];
											s.unspentLoading[address] = false;

											a[address] = [];
										})
										
										if (clbk){
									    	clbk(a)
									    }
									}
								})
							}
						}

						var s = self.sdk.node.transactions;

						if(!s.unspent) 
							s.unspent = {};	

						var a = {};

						var loadingAddresses = _.filter(addresses, function(address){
							if(s.unspentLoading[address])

								return true;
						})

						if(loadingAddresses.length){

							retry(function(){

								var _loadingAddresses = _.filter(addresses, function(address){
									if(s.unspentLoading[address])

										return true;
								})

								if(!_loadingAddresses.length) return true;

							}, function(){

								loadingAddressesClbk()

							}, 10)

						}
						else
						{
							loadingAddressesClbk()
						}

						

					},
					
					unspent : function(clbk, address, update){

						var s = self.sdk.node.transactions;

						if(!s.unspent) 
							s.unspent = {};						

						address || (address = self.sdk.address.pnet().address);

						if (s.unspentLoading[address]){

							retry(function(){

								if(!s.unspentLoading[address]) return true;

							}, function(){

								if (clbk){
							    	clbk(s.unspent[address])
							    }

							}, 10)

							return
						}
					
						if (s.unspent[address] && !update){
							if (clbk)
								clbk(s.unspent[address])
						}
						else
						{
							s.unspentLoading[address] = true;

							self.app.ajax.rpc({
								method : 'txunspent',
								parameters : [[address], 1, 9999999],
								success : function(d){

									s.unspent[address] = d || [];

									s.unspentLoading[address] = false;

									if (clbk)
										clbk(s.unspent[address])
								},
								fail : function(){


									s.unspent[address] = [];

									s.unspentLoading[address] = false;
									
									if (clbk){
								    	clbk(s.unspent[address])
								    }
								}
							})
						}

						
					},

					tx : function(id, clbk){

						if(self.sdk.node.transactions.loading[id]){

							retry(function(){

								if(!self.sdk.node.transactions.loading[id]) return true;

							}, function(){

								if (clbk){
							    	clbk(self.sdk.node.transactions.storage[id])
							    }

							}, 40)


							return
						}	

						if(self.sdk.node.transactions.storage[id]){
							if (clbk)
								clbk(self.sdk.node.transactions.storage[id])
						}

						else
						{
							self.sdk.node.transactions.loading[id] = true;

							self.app.ajax.rpc({
								method : 'getrawtransaction',
								parameters : [id, 1],
								success : function(d){

									self.sdk.node.transactions.loading[id] = false;

									self.sdk.node.transactions.storage[id] = d

									if (clbk)
										clbk(d)
								},
								fail : function(d){

									self.sdk.node.transactions.loading[id] = false;

									if (clbk){
								    	clbk(d, 'network')
								    }
								}
							})
						}


						
					}
				},

				create : {
					
					commonFromUnspent : function(obj, clbk, p){

						if(!p) p = {};

						self.sdk.node.transactions.get.unspent(function(unspent){

							unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

							if(!unspent.length){



								if(!p.update){
									p.update = true;

									self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p)

									return
								}

								if (clbk)
								{
									clbk(null, 'money')
								}

								return;
							}

							var inputs = [{

								txId : unspent[unspent.length - 1].txid,
								vout : unspent[unspent.length - 1].vout,
								amount : unspent[unspent.length - 1].amount

							}]

							self.sdk.node.transactions.create[obj.type](inputs, obj, function(a, er, data){

								if(!a){
									if((er == -26 || er == -25 || er == 16) && !p.update){
										
										p.update = true;

										self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p)

										return
									}
								}
								

								if (clbk){
									clbk(a, er, data)
								}
								

							}, p)

						}, deep(p, 'address.address'), p.update)
					},

					wallet : function(inputs, ouputs, _kp){

						var keyPair = _kp || self.app.user.keys()

						var txb = new bitcoin.TransactionBuilder();

						txb.addNTime(self.timeDifference || 0)

						var amount = 0;
						var k = 100000000;


						_.each(inputs, function(i){

							/*txb.addInput(i.txid, i.vout)
							amount = amount + Number(i.amount);

							return*/

							if(i.address.indexOf("P" == 0)){
								txb.addInput(i.txid, i.vout)
							}

							else
							{

								var index = _.indexOf(self.sdk.addresses.storage.addresses, i.address);

								if (index > -1){

									var address = self.sdk.addresses.storage.addressesobj[index];
								
									txb.addInput(i.txid, i.vout/*, null, address.output*/)
								}

								else
								{
									return
								}
								
							}

					    	amount = amount + Number(i.amount);
					    })

						_.each(ouputs, function(o){
							txb.addOutput(o.address,  Number((k * o.amount).toFixed(0)));
						})
					
						_.each(inputs, function(i, inputindex){


							if(i.address.indexOf("P") == 0){

								txb.sign(inputindex, keyPair);
							}

							else
							{

								var index = _.indexOf(self.sdk.addresses.storage.addresses, i.address);

								if (index > -1){

									var p2sh = self.sdk.addresses.storage.addressesobj[index];

									var dumped = self.sdk.address.dumpKeys(index)

									txb.sign(inputindex, dumped, p2sh.redeem.output, null, Number(i.amount * k).toFixed(0));


								}

								else
								{
									return
								}
								
							}
					    })					
						
						var tx = txb.build()
	
						return tx;

					},	

					common : function(inputs, obj, fees, clbk, p){

						if(!p) p = {};

						var temp = self.sdk.node.transactions.temp;
						var tempOptions = self.sdk.node.transactions.tempOptions;

						var error = obj.validation();



						if (error){

							if (clbk)
								clbk(null, error);

						}

						else
						{
							var keyPair = p.keys || self.app.user.keys()

						    //var p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey});


						    var address = p.address || self.sdk.address.pnet()

						    var txb = new bitcoin.TransactionBuilder();

								   txb.addNTime(self.timeDifference || 0)

								  

							var amount = 0;

						    _.each(inputs, function(i){

						    	if(self.addressType == 'p2pkh' || self.addressType == 'p2sh'){
									txb.addInput(i.txId, i.vout)
								}

								if(self.addressType == 'p2wpkh'){

						    		txb.addInput(i.txId, i.vout, null, address.output)
						    	}

						    	amount = amount + Number(i.amount);
						    })		

						    amount = amount * 100000000;

							var data = Buffer.from(bitcoin.crypto.hash256(obj.serialize()), 'utf8');

							var opreturnData = [Buffer.from( obj.typeop ? obj.typeop() : obj.type, 'utf8'), data];

							if (obj.opreturn){
								opreturnData.push(Buffer.from(obj.opreturn()))
							}

			     			var embed = bitcoin.payments.embed({ data: opreturnData });

			      			txb.addOutput(embed.output, 0);		    

							if(self.addressType == 'p2pkh'){
								txb.addOutput(address.address,  Number((amount - (fees || 0)).toFixed(0)));
								txb.sign(0, keyPair);
							}

							if(self.addressType == 'p2wpkh'){
								txb.addOutput(address.address,  2e4);
								txb.sign(0, keyPair, null, null);								
							}


							if(self.addressType == 'p2sh'){
								txb.addOutput(address.address,   Number((amount - (fees || 0)).toFixed(0)));
								txb.sign(0, keyPair, address.redeem.output, null, '');								
							}	


							var tx = txb.build()

						   	var hex = tx.toHex();

						   	if(p.pseudo){
								var alias = obj.export(true);
									alias.txid = makeid();

								if (clbk)
									clbk(alias, null)
							}
							else
							{
								self.app.ajax.rpc({
									method : 'sendrawtransactionwithmessage',
									parameters : [hex, obj.export(), obj.type],
									success : function(d){

										var alias = obj.export(true);									
											alias.txid = d;
											alias.address = address.address;
											alias.type = obj.type

										var count = deep(tempOptions, obj.type + ".count") || 'many'

										
										if(!temp[obj.type] || count == 'one')
										{
											temp[obj.type] = {};
										}

										temp[obj.type][d] = alias;

										alias.inputs = inputs

										self.sdk.node.transactions.saveTemp()
										
										var ids = _.map(inputs, function(i){
											return i.txId
										})
										
										self.app.platform.sdk.node.transactions.clearUnspents(ids)

										if (obj.ustate){

											var us = self.sdk.ustate.storage;

											if (us[address.address]){
												us[address.address][obj.ustate+"_spent"]++
												us[address.address][obj.ustate+"_unspent"]--
											}

											_.each(self.sdk.ustate.clbks, function(c){
												c()
											})
												

										}
									

										if (clbk)
											clbk(alias)
											
									},
									fail : function(data){


										if (clbk){
										    clbk(null, (deep(data, 'data.code') || deep(data, 'data.message') || 'network').toString(), data)
										}

									}
								})
							}
					
						   
						}
						
					},

					share : function(inputs, share, clbk, p){

						this.common(inputs, share, TXFEE, clbk, p)

					},

					userInfo : function(inputs, userInfo, clbk, p){
						this.common(inputs, userInfo, TXFEE, clbk, p)
					},

					upvoteShare : function(inputs, upvoteShare, clbk, p){
						this.common(inputs, upvoteShare, TXFEE, clbk, p)
					},

					complainShare : function(inputs, complainShare, clbk, p){
						this.common(inputs, complainShare, TXFEE, clbk, p)
					},

					commentShare : function(inputs, commentShare, clbk, p){
						this.common(inputs, commentShare, TXFEE, clbk, p)
					},

					unsubscribe : function(inputs, unsubscribe, clbk, p){
						this.common(inputs, unsubscribe, TXFEE, clbk, p)
					},

					subscribe : function(inputs, subscribe, clbk, p){
						this.common(inputs, subscribe, TXFEE, clbk, p)
					},

					blocking : function(inputs, blocking, clbk, p){
						this.common(inputs, blocking, TXFEE, clbk, p)
					},
					unblocking : function(inputs, unblocking, clbk, p){
						this.common(inputs, unblocking, TXFEE, clbk, p)
					},

					subscribePrivate : function(inputs, subscribe, clbk, p){

						var c = this.common


						self.cryptography.api.aeswc.pwd.encryption(subscribe.address.v, {}, function(encrypted){

							subscribe.encrypted.set(encrypted)

							c(inputs, subscribe, TXFEE, clbk, p)

						})
						
					}
				}

			},

			fee : {
				estimate : function(clbk){

					self.app.ajax.rpc({
						method : 'estimateSmartFee',
						parameters : [1],
						success : function(d){	

							d.feerate = 0.00001

							if (clbk)
								clbk(d)

						},
						fail : function(){
							
							if (clbk){
						    	clbk(null)
						    }

						}
					})

				}
			}

			
			
		}, 

		pool : {
			current : null,

			info : function(pack, clbk){
				self.sdk.users.get(pack.addresses, clbk)
			},

			dumpKey : function(pack, address, clbk){
				this.expand(pack, function(pa){

					var i = _.indexOf(pa.addresses, address)

					if (i == -1){
						if (clbk)
							clbk(null)
					}
					else

						if (clbk)
							clbk(pa.private[i])

					

				})
			},

			expand : function(exportedPack, clbk){

				self.app.user.isState(function(state){

					if(!state){
						if (clbk)
							clbk(null, 'state')
					}
					else
					{
						var address = self.sdk.address.pnet().address;

						var i = _.indexOf(exportedPack.addresses, address);

						if (i > -1){
							var _key = null;
							var aeskey = exportedPack.aes[i];

							var mk = self.app.user.private.value.toString('hex');

							self.cryptography.api.aeswc.decryption(aeskey, mk, {}, function(decrypted){
								_key = decrypted;

								var pack = {
									addresses : exportedPack.addresses,

									private : [],

									aes : exportedPack.aes,

									_key : _key
								}


								lazyEach({
									array : exportedPack.keys, 
									action : function(p, index){
										var privatemk = p.item;

										self.cryptography.api.aeswc.decryption(privatemk, _key, {}, function(mk){
											pack.private[index] = mk;

											p.success()
										})
									},

									sync : true,

									all : {
										success : function(){

											if (clbk)
												clbk(pack)

										}
									}
								})
							})
						}	
						else
						{
							if (clbk)
								clbk(null, 'address')
						}
					}

					

				})
			},

			export : function(pack, clbk){

				var exported = {
					addresses : pack.addresses,
					keys : [],
					aes : pack.aes
				}


				lazyEach({
					array : pack.private, 
					action : function(p, index){
						var private = p.item;

						self.cryptography.api.aeswc.encryption(private, pack._key, {}, function(encrypted){
							exported.keys[index] = encrypted;

							p.success()
						})
					},

					sync : true,

					all : {
						success : function(){

							if (clbk)
								clbk(exported)

						}
					}
				})
			},

			push : function(pack, address, mk, _key, clbk){

				pack.addresses.push(address)
				pack.private.push(mk)				

				self.cryptography.api.aeswc.encryption(_key, mk, {}, function(encrypted){

					pack.aes.push(encrypted)

					if (clbk)
						clbk(pack)

				})
			},

			remove : function(pack, address){
				var s = self.sdk.pool;
				var pool = s.get();

				var i = _.indexOf(pack.addresses, address);

				if (i > -1){

					pack.addresses.splice(i, 1)

					if (pack.private){
						pack.private.splice(i, 1)
					}

					if (pack.keys){
						pack.keys.splice(i, 1)
					}

					if (pack.aes){
						pack.aes.splice(i, 1)
					}

					delete pool.map[address]

					return true
				}

				return false
			},

			add : function(pack, mnemonic, clbk){
				var s = self.sdk.pool;
				var pool = s.get();
				

				var keyPair;

				if(bitcoin.bip39.validateMnemonic(mnemonic)){
				 	keyPair = self.app.user.keysFromMnemo(mnemonic)  
				}
				else
				{
					keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(mnemonic, 'hex'))
				}

				var address = self.sdk.address.pnetsimple(keyPair.publicKey).address;	

				var mk = keyPair.privateKey.toString('hex');

				if (pool.map[address]){

					var id = pool.map[address];
					var _pack = pool.packs[id];

					if (_pack.addresses.length > 1){
						if (clbk)
							clbk(null, 'hasinanotherpack')

						return;
					}
					else
					{
						delete pool.map[address]
						delete pool.packs[id]
					}
					
				}
				
				this.push(pack, address, mk, pack._key, function(){

					s.currentMap();

					if (clbk)
						clbk(pack)

				})
					
			},

			new : function(clbk){

				var s = self.sdk.pool

				var pack = {
					addresses : [],

					private : [],

					aes : [],

					_key : null
				}

				var ps = [null, null]

				self.app.user.isState(function(state){

					if(!state){

						ps[1] = 'state'

					}

					else
					{
						var key = app.user.private.value;

						if (key){

							var mk = key.toString('hex');

							var address = self.sdk.address.pnet().address;	

							pack._key = self.cryptography.api.random.crypto();

							s.push(pack, address, mk, pack._key, function(pack){

								s.export(pack, function(exported){

									ps[0] = exported

									if (clbk)
										clbk(ps[0], ps[1])
								})

								
							})

						

							return
								
						}

						else
						{

							ps[1] = 'key'
						}
					}

					if (clbk)
						clbk(ps[0], ps[1])

				})
			},

			init : function(clbk){

				var s = self.sdk.pool

				self.app.user.isState(function(state){

					if(state && !_Node){
						var pool = s.get();

						var address = self.sdk.address.pnet().address;	

						var packid = pool.map[address];

						s.current = pool;

						if(!packid){
							s.new(function(exportedpack, error){
								if(!exportedpack){
									sitemessage(error);
								}
								else
								{
									var id = makeid();

									pool.map[address] = id;
									pool.packs[id] = exportedpack;

									s.save();
								}

								if (clbk)
									clbk(exportedpack, id)
							})
						}
						else
						{
							if (clbk)
								clbk(pool.packs[packid], packid)
							
						}
					}

					else
					{
						if (clbk)
							clbk()
					}

				})
			},

			get : function(){

				var s = self.sdk.pool

				var pool = s.current;

				if(!pool){
					pool = localStorage['pool'];

					if(pool) pool = JSON.parse(pool)
				}

				if(!pool){
					pool = {
						map : {},
						packs : {}
					};
				}

				return pool;
			},

			getPack : function(address){
				var s = self.sdk.pool;

				var pool = s.get();

				var id = pool.map[address]

				if (id){
					return [pool.packs[id], id]
				}
			},

			currentMap : function(){

				var c = self.sdk.pool.current;

				c.map = {};

				_.each(c.packs, function(pack, packid){
					_.each(pack.addresses, function(address){
						c.map[address] = packid
					})
				})

			},

			save : function(pool){

				var s = self.sdk.pool;

				self.app.user.isState(function(state){

					if(state && s.current){

						s.currentMap();

						localStorage['pool'] = JSON.stringify(s.current)

					}

				})
					
			}
		},

		discussions : {
			fromChatId : function(id){
				var chat = self.sdk.chats.storage[id]

				if (chat){
					var discussion = self.sdk.discussions.fromChats([chat])[id];


					return discussion
				}
				else
				{
					return null;
				}
			},
			fromChats : function(chats, author){
				var d = {};

				_.each(chats || self.sdk.chats.storage, function(chat){

					var id = chat.id;				

					var _d = {
						chat : chat
					}				

					if (chat.type == 'share'){

						var chatAuthor = id.split("_")[1];
						var shareId = id.split("_")[0];

						_d.author = chatAuthor

						if(self.sdk.node.shares.storage.trx){
							_d.share = self.sdk.node.shares.storage.trx[shareId]
						}

						if (author){

							if (chatAuthor != author) return;

						}

					}

					d[id] =_d
				})

				return d
			},

			info : function(discussions, clbk){
				var chats = _.map(discussions, function(d){
					return d.chat
				})

				self.sdk.chats.info(chats, function(){

					var dss = self.sdk.discussions.fromChats(chats);

					if (clbk)
						clbk(dss)
					
				})
			}
		},

		tempmessenger : {
			clbks : {},
			init : function(clbk){
				var address = self.sdk.address.pnet().address
				var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

				var keyPair = self.app.user.keys();

				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));	

				var user = {
					device : id,
					address : address,
					signature : signature.toString('hex'),
					publicKey : keyPair.publicKey.toString('hex'),
				}

				self.clientrtctemp = new platformRTC({
					user : user,
					platform : self
				})

				self.clientrtctemp.init(function(){
					

						/*self.clientrtctemp.clbks.message.messenger = function(p, rtc){

							_.each(self.sdk.tempmessenger.clbks || {}, function(c){
								c('message', rtc)
							})
							
						}*/


				})

				if (clbk)
					clbk()
			},

			getChat : function(chat){

				chat.rtc = self.clientrtctemp.api.getChat(chat.id, chat.users);
			},

			getChats : function(clbk){
				if (self.clientrtctemp)
					self.clientrtctemp.getchats(clbk)
			}
		},


		messenger : {
			clbks : {},
			load : {
				messages : function(messages, clbk){

					if(!_.isArray(messages)) messages = [messages]

					var users = _.map(messages, function(m){
						return m.f
					})

					self.sdk.users.get(users, clbk, true)

					
				},
			},

			getChat : function(chat){
				chat.rtc = self.clientrtc.api.getChat(chat.id, chat.users);
			},

			connectToChat : function(chat, clbk){
				self.clientrtc.api.connectToChat({

					id : chat.id,
					addresses : chat.addresses

				}, function(id, chat){

					if (clbk)
						clbk(id, chat)

				})
			},
			init : function(clbk){

				var address = self.sdk.address.pnet().address
				var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

				var keyPair = self.app.user.keys();

				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));	

				var user = {
					device : id,
					address : address,
					signature : signature.toString('hex'),
					publicKey : keyPair.publicKey.toString('hex'),
				}

				self.clientrtc = new platformRTC({
					user : user,
					platform : self
				})

				var chats = self.app.platform.sdk.chats.get('messenger');

				self.clientrtc.initChats(chats)
				self.clientrtc.init(function(){
					self.clientrtc.api.login(function(){


						self.clientrtc.clbks.chat.messenger = function(p, rtc){


							if(self.sdk.chats.storage[rtc.id]) return

							p || (p = {})

							var chat = self.sdk.chats.empty(rtc.id, 'messenger');
								chat.rtc = rtc;


							if(p.addresses) chat.users = p.addresses

							self.sdk.chats.storage[rtc.id] = chat
							self.sdk.chats.info([chat], function(){

								_.each(self.sdk.messenger.clbks || {}, function(c){
									c('chat', chat)
								})

							})

							self.sdk.chats.save()

							
						}

						self.clientrtc.clbks.message.messenger = function(p, rtc){

							_.each(self.sdk.messenger.clbks || {}, function(c){
								c('message', rtc)
							})
							
						}

						self.clientrtc.api.getRelayed()

					})
				})

				if (clbk)
					clbk()
			}
		},

		chats : {
			clbks : {

			},
			storage : {

			},

			_info : {
				shares : function(chats, clbk){
					var shares = _.filter(chats, function(c){
						if(c.type == 'share') return true;
					})

					var sharesIds = _.map(shares, function(c){
						return c.id.split("_")[0]
					})

					self.sdk.node.shares.getbyid(sharesIds, function(){

						var shares = _.map(sharesIds, function(id){
							return self.sdk.node.shares.storage.trx[id] || null;
						})

							shares = _.filter(shares, function(s){
								return s
							})

						self.app.platform.sdk.node.shares.users(shares, function(){
							if (clbk)
								clbk()
						})

					})
				},

				messenger : function(chats, clbk){
					var users = [];


					_.each(chats, function(c){

						_.each(c.users, function(u){
							users.push(u)
						})

						self.app.platform.sdk.users.get(users, function(){
							if (clbk)
								clbk()
						})

					})
				}
			},

			info : function(chats, clbk){

				var s = this;

				s._info.shares(chats, function(){
					s._info.messenger(chats, function(){

						if (clbk)
							clbk()

					})
				})

			},

			empty : function(id, type){

				var ec = {
					id : id || makeid(),
					type : type || 'sys',

					time : self.currentTime()	
				}

				if(type == 'messenger'){
					ec.users = []
				}

				return ec
			},

			remove : function(id){

				_.each(self.sdk.chats.clbks, function(c){

					c(self.sdk.chats.storage[id], 'remove')

				})

				delete self.sdk.chats.storage[id]

				self.sdk.chats.save()
			},

			removeTemp : function(){
				_.each(self.sdk.chats.clbks, function(c){

					c(null, 'removeTemp')

				})
			},

			addTemp : function(id, type, count){
				
				var e = self.sdk.chats.empty(id, type)

				_.each(self.sdk.chats.clbks, function(c){

					c(e, 'addTemp', count)

				})
				
			},
			add : function(id, type){

				if (self.sdk.chats.storage[id]){

					self.sdk.chats.storage[id].time = self.currentTime()	

					self.sdk.chats.save()

					_.each(self.sdk.chats.clbks, function(c){

						c(self.sdk.chats.storage[id], 'addtwice')

					})

					return self.sdk.chats.storage[id]

				}
				else
				{
					var e = self.sdk.chats.empty(id, type)

					self.sdk.chats.storage[e.id] = e;

					_.each(self.sdk.chats.clbks, function(c){

						c(e, 'add')

					})

					self.sdk.chats.save()

					return e
				}


				
			},

			light : function(){
				var s = {};

				_.each(self.sdk.chats.storage, function(chat, id){
					s[id] = {
						id : chat.id,
						type : chat.type,
						time : chat.time,
						users : chat.users
					}
				})

				return s
			},

			
			save : function(){

				var address = self.sdk.address.pnet().address;

				localStorage[address + 'chats_4'] = JSON.stringify(self.sdk.chats.light());

			},

			load : function(clbk){

				var chats = {};

				var address = self.sdk.address.pnet().address;

				var local = localStorage[address + 'chats_4'] || "{}";

				if (local){
					try{
						chats = JSON.parse(local)
					}
					catch (e){
						console.log("ERR", e)
					}
				}

				self.sdk.chats.storage = chats;
				
				if (clbk)
					clbk()
			},

			get : function(type){
				return _.filter(self.sdk.chats.storage, function(c){

					if(type == 'share'){
						if(c.id == '6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd') return true
						
						//if(c.id == '9560e4555f644956ed40a420f0a327e9b18fb450508108a5a806e74ebe9b011c_PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM') return true
					
							return
					}

					return c.type == type
				})
			}
		}

	
	}

	self.Firebase = function(platform){

		//https://localhost:8889/firebase/token/set?token=cNFk-8w25ZQ:APA91bE4cStVM7B56qhxxl1jgLr9dEeUQsUudtq1zEfazgfM6Y-at8-LTkbV1uyzeJH4ljvkP6GRx4trBiDaIt7wdCSgCixuUN3BuA-wT_RNhZTvfSvGiqsoBfoErvz7Gyi5EaHdMNLJ&address=PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM&device=be4b54d4-a76d-cffc-42a0-4bb89028af9d
		
		//https://localhost:8889/firebase/revokedevice?device=be4b54d4-a76d-cffc-42a0-4bb89028af9d

		var self = this;

		var using = typeof window != 'undefined' && window.cordova && typeof FCMPlugin != 'undefined';

		var device = function(){
			var id = platform.app.options.device

			return id;
		}

		self.api = {

			revoke : function(token, clbk){
				platform.app.ajax.fb({
					action : 'firebase.revoke',

					data : {
						device : device(),
						address : platform.sdk.address.pnet().address
					},

					success : function(){
						if (clbk)
							clbk()
					}
				})
			},

			revokeDevice : function(clbk){
				platform.app.ajax.fb({
					action : 'firebase.revokedevice',

					data : {
						device : device()
					},

					success : function(){
						if (clbk)
							clbk()
					}
				})
			},

			setToken : function(token, clbk){
				platform.app.ajax.fb({
					action : 'firebase.set',

					data : {
						token : token,
						device : device(),
						address : platform.sdk.address.pnet().address
					},

					success : function(){
						if (clbk)
							clbk()
					}
				})
			}
		}

		self.events = function(){

			FCMPlugin.onNotification(function(data){
				if(data.wasTapped){
				  	//Notification was received on device tray and tapped by the user.
					console.log( JSON.stringify(data) );
					  
					platform.ws.destroyMessages()

				}
				else
				{
				  	//Notification was received in foreground. Maybe the user needs to be notified.
					console.log( JSON.stringify(data) );

					if(typeof cordova != 'undefined'){
						var cordovabadge = deep(cordova, 'plugins.notification.badge')
					  
						if (cordovabadge)
							cordovabadge.increase(1, function (badge) {});
					}

					
				}
			});

			FCMPlugin.onTokenRefresh(function(token) {

				console.log("refreshed token", token)

				/*platform.app.ajax.fb({
					action : 'firebase.token.refresh',

					data : {
						token : token,
						device : device(),
						address : platform.sdk.address.pnet().address
					},

					success : function(){

					}
				})*/

			}, function(error) {
				console.error(error);
			});

			FCMPlugin.getToken(function(token) {

				console.log('token', token);

				/*self.api.setToken(token, function(){

				})*/

			
				
			}, function(error) {
				console.error(error);
			});

			

		}

		self.init = function(clbk){


			if(!using) {
				if (clbk)
					clbk()
			}

			else{

				self.events()

				if (clbk)
					clbk()
			}


		}

		self.destroy = function(clbk){
			if(!using){
				if (clbk)
					clbk()
			}
			else{
				self.api.revokeDevice(clbk)
			}
		}

		return self;

	}

	self.WSn = function(platform){
		
		var self = this;
		var app = platform.app;

		var socket;
		var opened = false;
		var closing = false;
		var lost = 0;
		var onlinetnterval = null;
		var wait = null;

		self.connected = {};
		self.online = false;
		self.onlineCheck = false;
		self.fastMessages = [];
		
		self.loadingMissed = false;


		self.tempates = {

			_share : function(share, c){
				var m = share.caption || share.message;

				var nm = emojione.toImage(filterXSS(trimHtml(m, c || 20)));

				return nm
			},

			share : function(share, extra, extendedpreview){
				var h = '';

				var m = share.caption || share.message;

				var symbols = 20;

				if (extendedpreview){
					m = '';

					if(share.caption) m = m + '' + share.caption + ' '

					if(share.message) m = m + '' + share.message + ''

					symbols = 100;
				}

				var nm = filterXSS(trimHtml(m, symbols), {
					stripIgnoreTag : true,
					whiteList: {
						b : ["style"]
					}
				});

				nm = emojione.toImage(share.renders.xssmessage(nm))
			

				var image = share.images[0];
				var video = null;

				var vstyle = false;

				if (share.url){
					video = videoImage(share.url)
					vstyle = true;
				}

				h = '<div class="sharepreview">\
				<div class="shareprwrapper table">'

				if(video || image){
			
					h += '<div class="tcell forimage">'
						h += '<div class="img" image="'+(video || image)+'">'

						if(vstyle){
							h += '<div class="vstyle">'
							h += '<i class="fas fa-play"></i>'
							h += '</div>'
						}

						h += '</div>'
					h += '</div>'

				}

				h += '<div class="tcell fortext">'
				h += '<span>'+nm+'</span>'
				h += '</div>'

				if(extra){
					h += '<div class="tcell extra">'
					h += extra
					h += '</div>'
				}
				

				h+='</div>\
					</div>'


				return h;
			},

			comment : function(comment, share){


				var h = '<div class="commentmessage">'

						h += '<div class="commentmessagewrapper table">'

							h+='<div class="tcell fortext">'

								h += '<div class="commenttext"><span>'
								h += comment.renders.preview()
								h +='</span></div>'

								if(share){
									h += '<div class="commentshare">'
										h += share
									h +='</div>'
								}

							h +='</div>'

							h += '<div class="tcell foranswer">'
							h += 	'<button class="reply ghost">Reply</button>'
							h += '</div>'

						h +='</div>'

					h += '</div>'

				return h;
			},

			star : function(count) {
                
                let _star = '<i class="fas fa-star"></i>';
                if (electron) _star = '★';
				return '<div class="messagestar" count="'+count+'">' + count + ' ' + _star + '</div>'
			},

			_user : function(author){
				return filterXSS(deep(author, 'name') || author.address)
			},

			user : function(author, html, gotoprofile, caption){

				if(!author){
					return html
				}

				var h = '';

				var src = deep(author, 'image')
				

				var link = '<a href="author?address='+author.address+'">'
				var clink = "</a>"

			

			h+='<div class="cwrapper table">\
					<div class="cell cellforimage">\
						<div class="icon">'

						if(gotoprofile) h += link

							h+= '<div class="usericon" image="'+(src || '')+'">'

							if(!src) {
								h+='<svg width="30" height="30" data-jdenticon-value="'+author.address+'"></svg>'
							}

							h+='</div>'

						if(gotoprofile) h += clink

						h+= '</div>\
					</div>\
					<div class="ccell">\
						<div class="infomain">\
							<div class="caption">'
								if(gotoprofile) h += link

									if(caption){
										h += caption + ". "
									}

									h+= '<b class="adr">'+filterXSS(deep(author, 'name') || author.address)+'</b>'
								if(gotoprofile) h += clink

							h+= '</div>\
							<div class="tips">' + (html) + '\
							</div>\
						</div>\
					</div>\
				</div>'

				

				return h;
			},

			subscribe : function(author, html){

				var me = deep(app, 'platform.sdk.users.storage.' + platform.sdk.address.pnet().address)

				var d = ''

				if (me && me.relation(author.address, 'subscribes')){
					d = 'disabled'
				}

				var h = '<div class="subscribeWrapper table">'
						h += '<div class="scell forhtml">'
						h += html
						h += '</div>'
					
						h += '<div class="scell forsubscribe">'
						h += 	'<button class="subscribe ghost + '+d+'">'


						h += '<i class="far fa-check-circle"></i> '
						h += 'Follow</button>'
						h += '</div>'
					
					h+= '</div>'

				return h
			},

			
		}

		self.showedIds = {}

		self.messages = {

			sharepocketnet : {
				loadMore : function(data, clbk, wa){

					data.addrFrom = 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd'
						
					if (data.addrFrom){
						
						platform.sdk.users.get([data.addrFrom], function(){

							data.user = platform.sdk.users.storage[data.addrFrom] || {}

							data.user.address =  data.addrFrom

							var parts = data.txids.split(',')

							data.txids = parts[parts.length - 1]

						
							platform.sdk.node.shares.getbyid(data.txids, function(s, fromcashe){

								s || (s = []);

								if (s[0]){
									data.share = s[0];
								}

								clbk()
							})

						})

						return
					}

					clbk()
				},
				
				refs : {

				},
				audio : {
					unfocus : 'water_droplet',
					if : function(data){

						if(data.share){
							return true
						}

						return false;
					}
				},

				notificationData : function(data){
					var n = {};

					if(data.user && data.share){
						n.caption = self.tempates._user(data.user)
						n.text = self.tempates._share(data.share, 100)
					}

					if(_.isEmpty(n)) 
						return null;

					return n
				},
				
				fastMessage : function(data){	
			
					var text = '';
					var html = '';

					text = self.tempates.share(data.share, null, true)
					
					if(text){
						html += self.tempates.user(data.user, '<a href="author?address=PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd&report=shares&s='+data.share.txid+'&mpost=true"><div class="text">'+text+'</div></a>', true)
					}


					return html;
					
				},
				
				clbks : {
				}
			},

			"transaction" : {
				loadMore : function(data, clbk, wa){

					var _dataclbk = function(tx, err){
						var temp = platform.sdk.node.transactions.clearTemp(data.txid);

						if (temp && !wa){

							data.temp = temp;
							data.temp.temp = false;

							if (temp.type == 'share'){

								var share = new pShare();
									share._import(data.temp, true);
									share.address = platform.sdk.address.pnet().address

									share.scnt = '0'
									share.score = "0"
									share.myVal = 0


								if(!platform.sdk.node.shares.storage.trx)
									platform.sdk.node.shares.storage.trx = {}


								platform.sdk.node.shares.storage.trx[data.txid] = share
								

							}
						}

						if(tx && !err){
							data.tx = platform.sdk.node.transactions.toUT(tx, data.addr, data.nout)
							

							data.amountall = _.reduce(tx.vout, function(m, v){

								var vout = _.find(v.scriptPubKey.addresses, function(a){
									return a == data.addr
								})

								if(!vout){
									return m
								}
								else{
									return m + v.value
								}

							}, 0)

							
							//data.tx = data.pockettx

							data.btx = tx;

							var a = data.addr;

							platform.sdk.node.transactions.unspent || (platform.sdk.node.transactions.unspent = {})
							
							var s = platform.sdk.node.transactions.unspent;
					
							s[a] || (s[a] = []);

							if (!wa){

								removeEqual(s[a], {
									txid : data.tx.txid,
									vout : data.tx.vout
								})

								s[a].push(data.tx)
								
							}									

							data.address = platform.sdk.node.transactions.addressFromScryptSig(deep(data.btx, 'vin.0.scriptSig.asm'))

							platform.sdk.users.getone(data.address || '', function(){

								if (data.address){
									data.user = platform.sdk.usersl.storage[data.address] || {
										address : data.address
									}
								}					
								
								_.each(platform.sdk.node.transactions.clbks, function(c){
									c(data.amountall)
								})

								if(!self.showedIds[data.tx.txid]){
									self.showedIds[data.tx.txid] = true

									if (clbk)
										clbk(data)
								}


							}, true)

							
						}
					}

					if(data.txinfo){
						_dataclbk(data.txinfo)
					}
					else
					{
						platform.sdk.node.transactions.get.tx(data.txid, _dataclbk)
					}

					
				},

				refs : {

				},

				notificationData : function(data, user){
					var n = {};

					if (data.tx){

						
						if(data.tx.coinbase){

							if(platform.sdk.usersettings.meta.win.value)
							{	
								n.caption = "Incoming transaction"
								n.text = "Congratulations, you have won " + platform.mp.coin(data.tx.amount) + " Pocketcoin for your latest post!"
								n.topic = 'pos' 
							}

						}

						else{

							if(data.address != user.address && data.user){

								if(platform.sdk.usersettings.meta.transactions.value)
								{
									n.text = self.tempates._user(data.user) + " sent <b>" + platform.mp.coin(data.tx.amount) + " POC</b> to you"
									n.caption = "Incoming transaction: " + self.tempates._user(data.user)
									n.topic = 'transactions' 
								}
									
							}

						}
					}

					if(_.isEmpty(n)) 
						return null;

					return n
				},
				
				fastMessage : function(data, ld){	
			
					var html = '';

					if (data.tx){

						

						if(data.tx.coinbase){

							if(platform.sdk.usersettings.meta.win.value)
							{
								html += self.tempates.user(platform.sdk.users.storage[platform.sdk.address.pnet().address], '<div class="text">'+platform.app.localization.e('coinbaseSuccess', platform.mp.coin(data.amountall || data.tx.amount)) + '</div>')
							}

						}

						else{

							if(data.address !=  platform.sdk.address.pnet().address){

								if(platform.sdk.usersettings.meta.transactions.value)

									html += self.tempates.user(data.user, '<div class="text">'+platform.app.localization.e('userSent', platform.mp.coin(data.amountall || data.tx.amount)) + '</div>')
							
							}

						}
					}

					return html;
					
				},
				audio : {
					unfocus : 'water_droplet',

					if : function(data){

						if (data.temp){
							return false;
						}

						if (data.tx){
							if(data.tx.coinbase){
								if(!platform.sdk.usersettings.meta.win.value){

									return false;
								}
							}
							else{
								if(data.address != platform.sdk.address.pnet().address){
									if(!platform.sdk.usersettings.meta.transactions.value){
										return false;
									}
								}
								else
								{
									return false;
								}
							}
						}
						else
						{
							return false;
						}

						return true;
					}
				},
				clbks : {
					/*transactions : function(data){

						_.each(platform.sdk.node.transactions.clbks, function(c){
							c(data.tx.amount)
						})

					}*/
				}
			},

			'newblocks' : {
				loadMore : function(data, clbk){

					var s = platform.sdk.node.transactions;

					var dif = platform.currentBlock - data.block

					platform.currentBlock = data.block;

					localStorage['lastblock'] = platform.currentBlock

					//self.reconnected = platform.currentBlock;

					platform.sdk.notifications.wsBlock(data.height)
					
					_.each(s.unspent, function(unspents, address){
						_.each(unspents, function(txu){

							txu.confirmations = (txu.confirmations || 0) + (dif || 0)

						})
					})

					platform.sdk.user.subscribeRef()

					clbk()
				},
				
				refs : {

				},
				fastMessage : function(data){					

					var html = '';

					return html;
					
				},
				
				clbks : {
					transactions : function(){
						_.each(platform.sdk.node.transactions.clbks, function(c){
							c()
						})
					}
				}
			},

			"new block" : {

				loadMore : function(data, clbk){

					if(data.height <= platform.currentBlock) return

					var s = platform.sdk.node.transactions;

					platform.currentBlock = data.height;

					localStorage['lastblock'] = platform.currentBlock

					lost = platform.currentBlock;

					platform.sdk.notifications.wsBlock(data.height)
					
					_.each(s.unspent, function(unspents, address){
						_.each(unspents, function(txu){

							txu.confirmations || (txu.confirmations = 0)

							txu.confirmations++

						})
					})

					platform.sdk.user.subscribeRef()

					clbk()
				},
				
				refs : {

				},
				fastMessage : function(data){					

					var html = '';

					return html;
					
				},
				
				clbks : {
					transactions : function(){
						_.each(platform.sdk.node.transactions.clbks, function(c){
							c()
						})
					}
				}
			},

			comment : {

				fastMessageEvents : function(data, message){

					message.el.find('.commenttext').on('click', function(){

						platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

							platform.app.nav.api.load({
								open : true,
								href : 'post?s=' + data.posttxid,
								inWnd : true,
								//history : true,
								clbk : function(d, p){									
									app.nav.wnds['post'] = p
								},

								essenseData : {
									share : data.posttxid,

									reply : {
										answerid : data.commentid,
										parentid : data.parentid || "",
										noaction : true
									}
								}
							})
						
						})

					})
						
					message.el.find('.reply').on('click', function(){

						platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

							platform.app.nav.api.load({
								open : true,
								href : 'post?s=' + data.posttxid,
								inWnd : true,
								//history : true,
								clbk : function(d, p){									
									app.nav.wnds['post'] = p
								},

								essenseData : {
									share : data.posttxid,

									reply : {
										answerid : data.commentid,
										parentid : data.parentid || ""
									}
								}
							})
						
						})
						
					})

				},

				loadMore : function(data, clbk, wa){

					var getpost = function(pid, clbk){

						if(pid)

							platform.sdk.node.shares.getbyid(pid, function(s, fromcashe){

								s || (s = []);

								if (s[0]){
									data.share = s[0];								
								}

								clbk()
							
							})

						else

							clbk()
					}

					platform.sdk.users.get([data.addrFrom], function(){

						data.user = platform.sdk.users.storage[data.addrFrom] || {}
						data.user.address =  data.addrFrom

						getpost(data.posttxid, function(){

							var ids = [data.commentid]

							data.txid = data.commentid

							/*if (data.answerid) 

								ids.push(data.answerid)*/

							platform.sdk.comments.info(ids, function(error, c){

								if (error || !c.length) return

								if (c.length){
									data.comment = c[0];
								}

								platform.sdk.comments.storage[data.comment.txid] ||

								(platform.sdk.comments.storage[data.comment.txid] = {})

								var pid = data.comment.parentid || '0';

								if (platform.sdk.comments.storage[data.comment.txid][pid]){
									platform.sdk.comments.storage[data.comment.txid][pid].push(data.comment)
								}

								/*if (c.length == 2){
									data.answercomment = c[1];
								}*/

								clbk()
							})
						})

						
					})
				},

				notificationData : function(data){
					var n = {};

					if(data.mesType == 'post' && data.comment && data.share && data.user){
						n.text = data.comment.renders.previewEmojidis() 
						n.topic = 'comments' 

						n.caption = "New comment: " +  self.tempates._user(data.user)
					}

					if(data.mesType == 'answer' && data.comment && data.share && data.user){
						n.text = data.comment.renders.preview() 
						n.topic = 'answers'
						n.caption = "New answer: " +  self.tempates._user(data.user)
					}

					if(_.isEmpty(n)) 
						return null;

					return n
				},

				fastMessage : function(data){	
			
					var text = '';
					var html = '';



					if(data.mesType == 'post' && data.comment && data.share && data.user && 
						(!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)){

						text = self.tempates.comment(data.comment, self.tempates.share(data.share))

						if(text){
							html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', false, 'New comment')
						}
					}

					if(data.mesType == 'answer' && data.comment && data.share && data.user && 
						(!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)){

						text = self.tempates.comment(data.comment, self.tempates.share(data.share))

						if(text){
							html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', false, 'New answer')
						}
					}		


					return html;
					
				},
				refs : {

				},
				audio : {
					unfocus : 'water_droplet',
					if : function(data){

						if(data.mesType == 'post' && data.comment && data.share && data.user && 
							(!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)){

							return true
						}

						if(data.mesType == 'answer' && data.comment && data.share && data.user &&
							(!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)){

							 return true
						}	
					}
				},

				clbks : {
				}
			},

			event : {
				loadMore : function(data, clbk, wa){
						
					if (data.addrFrom){
						
						platform.sdk.users.get([data.addrFrom], function(){

							data.user = platform.sdk.users.storage[data.addrFrom] || {}

							data.user.address =  data.addrFrom

							if(data.mesType == 'userInfo' && !wa){
								var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];

									me.rc++
							}

							if(data.mesType == 'upvoteShare'){
								platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

									s || (s = []);

									if (s[0]){
										data.share = s[0];

										if(fromcashe && !wa){

											data.share.score = Number(data.share.score) + Number(data.upvoteVal)
											data.share.scnt = Number(data.share.scnt) + 1
										}
									}

									clbk()
								})
							}
							else
							{

								if((data.mesType == 'subscribe' || data.mesType == 'unsubscribe') && !wa){
									var u = platform.sdk.users.storage[data.addrFrom];

									var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];


									if (me){

										if(data.mesType == 'subscribe'){
											me.addRelation(data.addrFrom, 'subscribers')											
										}

										if(data.mesType == 'unsubscribe'){
											me.removeRelation(data.addrFrom, 'subscribers')
										}
									}

									if (u){

										if(data.mesType == 'subscribe'){

											u.addRelation({
												adddress : platform.sdk.address.pnet().address,
												private : false
											})	
										}

										if(data.mesType == 'unsubscribe'){

											u.removeRelation({
												adddress : platform.sdk.address.pnet().address,
												private : false
											})
										}

									}
								}

								clbk()
							}
							

						})

						return
					}

					clbk()
				},
				
				refs : {

				},
				audio : {
					unfocus : 'water_droplet',
					if : function(data){

						if(data.mesType == 'upvoteShare' && data.share){

							if(data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)){
							
								return true

							}
						}

						if(data.mesType == 'subscribe'){
							if((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.upvotes.followers)){
								return true
							}
						}

						if(data.mesType == 'userInfo'){

							if((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)){

								return true

							}

							
						}

						

						return false;
					}
				},

				fastMessageEvents : function(data, message){

					if(data.mesType == 'subscribe' && data.user){
						
						message.el.find('.subscribe').on('click', function(){


							var be = $(this)

							if (be.hasClass('disabled')) return;

							be.addClass('disabled');

							platform.api.actions.subscribe(data.user.address, function(tx, error){
								if(tx){
								}	
								else{
									self.app.platform.errorHandler(error, true)	

									be.removeClass('disabled');
								}	
							})
						})

					}
				},
				notificationData : function(data){
					var n = {};

					if(data.mesType == 'userInfo'){
						n.text = "You rescued someone from the censored web. Some coins are on their way!"
						n.topic = 'rescued'

						n.caption = 'Congrats!'
					}

					if(data.mesType == 'subscribe' && data.user){
						n.text = self.tempates._user(data.user) + ' has followed to your account'
						n.topic = 'followers'
						n.caption = "New Follower"
					}
					

					if(data.mesType == 'upvoteShare' && data.share && data.user){

						if(data.upvoteVal > 2){

							n.text =  self.tempates._user(data.user) + " has upvoted your post, " + data.upvoteVal + ' ★'
							n.topic = 'upvotes'
							n.caption = "New Upvote"
						}
					}

				

					if(_.isEmpty(n)) 
						return null;

					return n
				},
				fastMessage : function(data){	
			
					var text = '';
					var html = '';

					if(data.mesType == 'userInfo'){

						if((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)){

							text = platform.app.localization.e('refferalUserMessage')

						}

						
					}


					if(data.mesType == 'subscribe'){

						if((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.followers.value)){

							text = self.tempates.subscribe(data.user, platform.app.localization.e('subscribeUserMessage'))

						}

					}

					if(data.mesType == 'unsubscribe'){
						text = '';

						// platform.app.localization.e('unsubscribeUserMessage')
					}

					if(data.mesType == 'upvoteShare' && data.share){

						if(data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)){

							var star = self.tempates.star(data.upvoteVal)

							text = platform.app.localization.e('upvoteShareMessage') + self.tempates.share(data.share, star)
						}
					}

					if(text){
						html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', true)
					}


					return html;
					
				},
				
				clbks : {
				}
			},

			message : {
				loadMore : function(data, clbk, wa){

						
					if (data.address){
						
						platform.sdk.users.get([data.address], function(){

							data.user = platform.sdk.users.storage[data.address]

							if (data.user){
								data.user.address =  data.address

								clbk()
							}
						})

					}
				},
				
				refs : {

				},
				audio : {
					unfocus : 'water_droplet'
				},

				fastMessageEvents : function(data, message){
						
					message.el.find('.tochat').on('click', function(){

					})

				},
				
				fastMessage : function(data){	
			
					var text = '';
					var html = '';

					text = self.tempates.subscribe(data.user, "sent you private message")

					html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', true)
				

					return html;
					
				},
				
				clbks : {
				}
			}
		}

		var auth = function(clbk){

			app.user.isState(function(state){

				if(state)
				{

					self.addAccount(null, clbk)

				}
				else
				{
					if(clbk)
						clbk(false)
				}

				
			})
		}

		var initOnlineListener = function(){
			if(self.onlineCheck && !_Node){

				onlinetnterval = retry(function(){

					var online = deep(window, 'navigator.onLine');

					if (self.online != online){

						self.online = online;

						return true;

					}
					

				}, function(){

					if(!self.online){

						if (lost < 2)
							lost = platform.currentBlock;	

						self.close();
							
						initOnlineListener();			
					}
					else
					{
						self.getMissed(initOnlineListener);
						
						initconnection();	
					}

					


				}, 50)

			}
		}

		var reconnect = function(){
			if (closing){
				return;
			}

			closing = false;

			socket = null;

			lost = platform.currentBlock;	

			self.close();

			initconnection();
		}

		var initconnection = function(clbk){

			//if(socket) return

			socket = new ReconnectingWebSocket(platform.app.options.ws); 

			socket.onmessage = function(message) { 



			    message = message.data;

	        	var jm = message;

	        	try{

	        		if(jm.indexOf('registered') > -1){
	        			message = message.replace("msg", '"msg"')
	        			message = message.replace("addr", '"addr"')
	        		}
	        		

	        		jm = JSON.parse(message || "{}");

	        	}
	        	catch (e){
	        
	        	}

        		if (jm)

        			self.messageHandler(jm);
			   
			};

			/*socket.onerror = function (error) { 
			   
			   	console.log('error', error)

			   	if (opened)
			   		socket.close()
			   
			};*/

			socket.onopen = function(){
				
				lost = platform.currentBlock || 0;

				opened = true;

				auth()

				if (clbk)
					clbk()
			}

			/*socket.onclose = function(e){

				reconnect()

			}	*/
		} 

		var destroyMessage = function(message, time, noarrange, destroyUser){
			
			if(message.timeout)
				clearTimeout(message.timeout);

			if(platform.focus)
			{

				message.timeout = setTimeout(function(){
					
					message.el.fadeOut(300)

					setTimeout(function(){

						message.el.remove();

						removeEqual(self.fastMessages, {
							id : message.id
						})

						if (message.destroyclbk && destroyUser){
							message.destroyclbk()
						}

						if(!noarrange)
							arrangeMessages()

					}, 300)

				}, time)
			}

			else
			{
				setTimeout(function(){
					destroyMessage(message, time, noarrange)
				}, 100)
				
			}

		}

		var arrangeMessages = function(){

			var offset = 0;

			var maxCount = 4;

			var boffset = 0;

			if(isMobile()){
				maxCount = 1;
			}
			else
			{

				if(typeof _Electron == 'undefined'){
					boffset = 60;
				}

				
			}

			offset = offset + boffset

			var remove = self.fastMessages.length - maxCount;

			_.each(self.fastMessages, function(m, i){

				if(i < remove){
					destroyMessage(m, 1, true)
				}

				else
				{
					if(!isMobile()){
						offset += 10;
					}
					
					if(!window.cordova && !isMobile())

						m.el.css('bottom', offset + 'px');

					offset += m.el.outerHeight();
				}

			})
		}

		self.getMissed = function(clbk){

			if(lost > 1 && self.loadingMissed) return

			if(lost < platform.currentBlock) return

			self.loadingMissed = true;

			platform.app.ajax.rpc({
				method : 'getmissedinfo',
				parameters : [platform.sdk.address.pnet().address, lost],
				success : function(d){			

					d || (d = [{block : 1, cntposts : 0, cntsubscr : 0}])

					var notifications = (d || []).slice(1)	

					var blockInfo = d[0]

					blockInfo.msg = 'newblocks'

					lost = 0;

					self.messageHandler(blockInfo, function(){
						lazyEach({
							array : notifications,
							action : function(p){
								self.messageHandler(p.item, p.success)
							},

							all : {
								success : function(){
									self.loadingMissed = false;
								}
							}
						})
					})

					if (clbk)
						clbk()
		
				},
				fail : function(){

					if (clbk)
						clbk()
					
				}
			})
		}

		self.destroyMessages = function(){
			_.each(self.fastMessages, function(message, i){
				destroyMessage(message, 1)
			})
		}

		self.fastMessage = function(html, destroyclbk){
			var id = makeid(true);

			html = '<div class="fastMessage" id="'+id+'">\
			<div class="fmCnt">' + html + '</div>\
			<div class="close">\
				<i class="fa fa-times" aria-hidden="true"></i>\
			</div>\
			</div>';

			$('body').append(html);

			var el = $('#' + id);

			var message = {
				id : id,
				el : el,
				html : html,
				destroyclbk : destroyclbk
			}

			bgImages(el)

			el.find('[data-jdenticon-value]').each(function(){
				var t = $(this);
				var v = t.data('jdenticon-value')

				t.html(jdenticon.toSvg(v, t.width()))
			})
			

			self.fastMessages.push(message);

			platform.app.nav.api.links(null, el, function(){
				destroyMessage(message, 1)
			});

			destroyMessage(message, 5000, false, true);

			message.el.on('mouseenter', function(){
				clearTimeout(message.timeout);
			})

			message.el.on('mouseleave', function(){
				destroyMessage(message, 5000, false, true);
			})

			message.el.find('.close').on('click', function(){
				destroyMessage(message, 1, false, true);
			})

			if(isMobile()){
				var parallax = new SwipeParallax({

					el : message.el,
					directions : {
						left : {
							trueshold : 70,
							positionclbk : function(px){
								var percent = Math.abs((70 + px) / 70);

								if (percent > 0){

									//progress.update(percent * 100);

									message.el.css('opacity', percent) 
								}

							},

							clbk : function(){

								message.el.remove()

								destroyMessage(message, 1, false, true);
								
							}

						}
					}

				}).init()
			}

			arrangeMessages();



			return message
		}

		self.messageHandler = function(data, clbk){

			if(!data.msg) return

			if (data && data.msg == 'registered'){

				self.connected[data.addr] = true

				return

			}

			if (data.msg){

				var exkey = ''

				if (data.mesType) exkey = '.' + data.mesType;

    			var m = deep(self.messages, (data.msg) + exkey) || deep(self.messages, (data.msg)) || {};

    			if (m.checkHandler){
    				if(!m.checkHandler(data, m)){
    					return
    				}
    			}

    			var clbks = function(loadedData){

    				data.loadedData = true;

    				var audio = deep(m, 'audio')

    				_.each(m.clbks, function(clbk){
        				clbk(data, loadedData);
        			})

        			if(!_Node){
        				if (audio && !window.cordova){

	    					if(!audio.if || audio.if(data, loadedData)){

	    						if (audio.focus && platform.focus){
	    						
		    						ion.sound.play(audio.focus);
		    					}


		    					if (audio.unfocus && !platform.focus){
		    						
		    						ion.sound.play(audio.unfocus);
		    					}

	    					}

	    					
	    				}

	    				if(m.fastMessage && !m.refs.all && !m.refs[data.RefID]){

	    					var html = m.fastMessage(data, loadedData);


	    					if (html){

	    						var message = self.fastMessage(html, function(){
	    							platform.sdk.notifications.seen([data.txid])
	    						});

	    						if (m.fastMessageEvents){
	    							m.fastMessageEvents(data, message)
	    						}

	    						data.loaded = true

	    						platform.sdk.notifications.addFromWs(data)

	    						if (typeof _Electron != 'undefined' && !platform.focus && message.html){
									electron.ipcRenderer.send('electron-notification', message.html);
	    						}
								

	    					}


	    				}	

	    				if (m.header && !platform.focus && platform.titleManager){

	    					var t = m.header(data);

	    					if (t)

	    						platform.titleManager.add(t)

	    				}	
        			}

    				  

    				if (clbk)
    					clbk()      				
    				
    			}


    			
    			if (m.loadMore)
    			{
    				m.loadMore(data, clbks);
    			}

    			else
    			{
    				clbks();
    			}

    			return
    		}
		}		

		/*self.messageHandler(

			{
				addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
				addrFrom: "PFRTSVNts36Zyte1gBhh8ATZpaqMWfBLq3",
				mesType: "subscribe",
				msg: "event",
				txid: "25329f8e74ceb902e92eb41c2824929a27f7988e7c2db1c25c90b6958e825682"
			}

		)*/

		self.send = function(message){

			if (socket)
			{
				try{
					socket.send(message);
				}
				catch(e){

				}
			}

		}

		self.close = function(){

			if(closing) return

			closing = true;
			opened = false;
			wait = null;

			
			self.connected = {};

			if (socket){
				socket.close()
			}

			socket = null;

			closing = false;

		}

		self.destroy = function(){

			self.close()
			self.loadingMissed = false;

			if (onlinetnterval)
				clearInterval(onlinetnterval)


		}


		/////////

			self.wait = function(address, clbk){
				retry(function(){
					if(!wait || !wait[address]) {
						return true
					}

					if(Math.floor((new Date().getTime()) / 1000) > wait[address] + 1){
						return true
					}

					if(self.connected[address]) return true;
				}, clbk)
			}

			self.addAccount = function(keyPair, clbk){

				if(!keyPair){
					keyPair = platform.app.user.keys();
				}

				var key = platform.sdk.address.pnet(keyPair.publicKey).address  + 'addressesNum'

				var num = localStorage[key] || 1;

				var keyPairs = [{
					kp : keyPair,
					n : 0
				}];

				/*for(var i = 1; i <= num; i++){

					var d = bitcoin.bip32.fromSeed(keyPair.privateKey).derivePath(app.platform.sdk.address.path(i)).toWIF() 

					var kp = bitcoin.ECPair.fromWIF(d)	  

					keyPairs.push({
						kp : kp,
						n : i
					})
				}*/

				self.addAddresses(keyPairs, clbk)

			}

			self.addAddresses = function(keyPairs, clbk){

				var success = 0;

				lazyEach({
					array : keyPairs,
					sync : true,
					action : function(p){
						self.addAddress(p.item.kp, p.item.n, function(r){
							
							if(r)
								success++;

							p.success()
						})
					},

					all : {
						success : function(){
							if (clbk)
								clbk(success != 0)

						}
					}
				})
			}

			self.addAddress = function(keyPair, n, clbk){

				/*if(!keyPair){
					keyPair = platform.app.user.keys();
				}*/

				var	address = '';



				if(!n){
					address = platform.sdk.address.pnet(keyPair.publicKey).address
				}
				else{
					address = platform.sdk.address.wallet(n, keyPair.privateKey).address
				}
				
				if (self.connected[address]){

					if (clbk)
						clbk(true)

					return
				}			

				var nonce = Math.round(new Date().getTime() / 1000);

				do{
					nonce = nonce.toString() + '' + rand(0, 9).toString();
				}
				while(nonce.length < 32)

				var signature = keyPair.sign(Buffer.from(nonce))		
		
				var message = {
					addr : address,
					nonce : nonce,
					sgn : signature.toString('hex'),
					pub : keyPair.publicKey.toString('hex'),
					id : platform.app.options.device,

					block : platform.currentBlock || 0
				}

				if(!wait)
					wait = {};

				wait[address] = Math.floor((new Date().getTime()) / 1000);

				self.wait(address, function(){
					if(self.connected[address]){

						if (clbk)
							clbk(true)
					}
					else
					{
						if (clbk)
						clbk(false)
					}
				})

				self.send(JSON.stringify(message))
			}

			self.removeAddresses = function(addresses){

				_.each(addresses, function(i, a){
					self.removeAddress(a)
				})
			}

			self.removeAccount = function(){
				self.destroy()
			}

			self.removeAddress = function(address){

				var message = {
					msg : "unsubscribe", 
					addr : address
				}

				delete self.connected[address]
				delete wait[address]

				self.send(JSON.stringify(message))
			}

		/////////

		self.init = function(clbk){

			closing = false;
			self.onlineCheck = true;

			if(!_Node)

				self.onlineCheck = deep(window, 'navigator.onLine') || false;

			self.online = self.onlineCheck;
			self.connected = {};

			self.lostBlock = platform.currentBlock;

			initOnlineListener();



			initconnection();

			if (clbk)
				clbk()

		}
	}

	self.RTC = function(platform){
		var self = this;

		self.connections = {};

		self.storages = {};		

		self.events = {};

		self.timers = {};

		var me = makeid();

		////

		//self.connection = null;

		self.connect = function(roomid, events, clbk, mstorageid){


			if(!self.storages[roomid]){
				self.storages[roomid] = new MessageStorage({id : mstorageid || roomid});
			}
			else
			{
				
			}

			self.connections[roomid] = new RTCMultiConnection();

			self.settings(self.connections[roomid], roomid)

			self.events[roomid] || (self.events[roomid] = {})

			_.each(events, function(e, id){

				if(!self.events[roomid][id])
					self.events[roomid][id] = {}

				self.events[roomid][id] = e;

			})

			var refresh = false;	

			self.connections[roomid].openOrJoin(roomid, function(){

				self.syncTimer(roomid)

				if (clbk)
					clbk()

			});
				
		}

		self.reconnect = function(roomid){

			if (self.connections[roomid])
				self.connections[roomid].openOrJoin(roomid, function(){

				});

			else{
				return false;
			}

		}

		self.settings = function(connection, roomid){

			var keyPair = platform.app.user.keys();

			var firstPeerConnect = true;

			connection.sessionid = roomid
			connection.channel = roomid
			connection.session = {
			    data: true
			};

			connection.enableLogs = false

			connection.socketURL = platform.app.options.rtc

			//connection.userid = Buffer.from(bitcoin.crypto.hash256(platform.sdk.address.pnet().address + roomid, 'utf8')).toString('hex') 

			connection.userid = platform.sdk.address.pnet().address + "_" + makeid()

			connection.sdpConstraints.mandatory = {
			    OfferToReceiveAudio: false,
			    OfferToReceiveVideo: false
			};


			connection.onopen = function(e){	

				if (self.events[roomid] && self.events[roomid].onopen){
					self.events[roomid].onopen(e)
				}

				if (firstPeerConnect){
					hlp.sendSyncRequest(roomid);
					firstPeerConnect = false;
				}
				
			}

			connection.onclose = function(e){

				if (self.events[roomid] && self.events[roomid].onclose){
					self.events[roomid].onclose(e)
				}

			}

			connection.onEntireSessionClosed = function(event) {
			    //console.info('Entire session is closed: ', event.sessionid, event.extra);
			};

			connection.onmessage = function(e) {

				if (e.data.sync_request) {
			        hlp.receiveSyncRequest(e, roomid);
			        return;			        
			    }

			    if (e.data.sync_answer) {
			        hlp.receiveSyncAnswer(e, roomid);
			        return;
			    }

			    if (e.data.typing) {
			        return;
			    }

			    if (e.data.stoppedTyping) {
			        return;
			    }			    

			    hlp.receiveMessage(e.data, roomid);
			};
		}

		self.send = function(id, message){

			if (self.connections[id]){

				var m = self.message(message);

				if(checkSign(m)){

					self.storages[id].AddMessage(m);

					self.connections[id].send(m);

					if (self.events[id].sendMessage){
						self.events[id].sendMessage(m)
					}

				}
			}
		}

		self.message = function(message, to){


			var m = {
				tm: platform.currentTimeSS(),
		        f: platform.sdk.address.pnet().address,

		        t: to || '',

		        m: message,
		        ex: {
		            s : ''
		        }
			}

			signMessage(m)

			return m
			
		}

		var checkSign = function(message){

			if(!message.ex) return false

			if(!message.ex.s || !message.ex.p) return;

			var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(message.ex.p, 'hex'))

			var str = message.tm + message.f + message.t + message.m;

			var hash = Buffer.from(bitcoin.crypto.hash256(str), 'utf8')

			var verify = keyPair.verify(hash, Buffer.from(message.ex.s, 'hex'));

			return verify

		}

		var signMessage = function(message){

			var keyPair = platform.app.user.keys();

			var str = message.tm + message.f + message.t + message.m;

			var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(str), 'utf8'));	

			message.ex.s = signature.toString('hex');
			message.ex.p = keyPair.publicKey.toString('hex')
		}
		

		var hlp = {
			receiveSyncRequest : function(e, id){

			    var _db_diff = self.storages[id].CompareDB(e.data.hv, e.data.tm_f, e.data.tm_t);

			    if (self.connections[id])
				    self.connections[id].send({
				        sync_answer: 1,
				        msgdb: _db_diff,
				        users: {},
				    }, e.userid);

			},

			receiveSyncAnswer : function(e, id){

			    hlp.receiveMessages(e.data.msgdb, id)			

			},

			sendSyncRequest : function(id, userid){

				if(!self.connections[id]) return
				

			    // TODO - Mark existed syncReq as long
			    var _hv = self.storages[id].HistoryVector();

			    // Random select `peer`
			    var _sync_peer_send = userid;
			    if (_sync_peer_send == null) {
			        var _peers = self.connections[id].peers.getAllParticipants(self.connections[id].userid, 'connected');
			        var _sync_peer_current = Math.floor(Math.random() * _peers.length);
			        _sync_peer_send = _peers[_sync_peer_current];			        
			    }

			    if (self.connections[id] && _sync_peer_send) {
				    self.connections[id].send({
				        sync_request: 1,
				        hv: _hv,
				        tm_f: '',
				        tm_t: '',
				    }, _sync_peer_send);
                }
			},

			receiveMessages : function(msgs, id) {

				msgs = _.filter(msgs, function(msg){
					if(checkSign(msg)) return true
				})

				if (msgs.length){

					self.storages[id].MergeDB(msgs);

					if (self.events[id].receiveMessages){
						self.events[id].receiveMessages(msgs)
					}

				}
				
			},

			receiveMessage : function(msg, id) {

				if(checkSign(msg)){

					self.storages[id].AddMessage(msg);

					if (self.events[id].receiveMessage){
						self.events[id].receiveMessage(msg)
					}

					if (!platform.focus && platform.titleManager){

    					platform.titleManager.add("You have new messages")

    				}	
				}
				

				
			}
		}

		self.storage = {};

		self.load = {
			users : function(messages, clbk){

				if(!_.isArray(messages)) messages = [messages]

				var users = _.map(messages, function(m){
					return m.f
				})

				platform.sdk.users.get(users, clbk, true)

				
			},

			info : function(rooms, clbk){

				if(!self.storage.info)
					self.storage.info = {};

				var set = function(id, data){
					self.storage.info[id] = {
						t : platform.currentTime(),
						d : data
					}
				}


				rooms = _.filter(rooms, function(id){
					if(!self.storage.info[id]) return true;

					else {
						var t = self.storage.info[id].t
						var c = platform.currentTime()

						if (c - t > 8){
							return true
						}
					}
				})


				if(!rooms.length){
					if (clbk)
						clbk()
				}
				else
				{

					_.each(rooms, function(id){
						set(id)
					})

					$.ajax({
						url : platform.app.options.rtc,
						datatype : "application/json",
   						contentType: "application/json",
						data : {
							action : 'room_info',
							room_id : rooms.join(',')
						},

						success : function(d){

							_.each(d, function(data, id){

								set(id, data)

							})

							if (clbk)
								clbk()
						},

						fail : function(d){

							if (clbk)
								clbk()
						},

						type : "GET"
					})
				}

				

			}
		}

		self.syncTimer = function(roomid){

		    self.timers[roomid] = setInterval(function() {
		        hlp.sendSyncRequest(roomid);
		    }, 10000);
			
		}

		self.destroy = function(roomid, clbk){

			if (self.timers[roomid]){

				clearInterval(self.timers[roomid]);

				delete self.timers[roomid]
			}

			if (self.connections[roomid]){

				self.connections[roomid].isInitiator = false;

				self.connections[roomid].getAllParticipants().forEach(function(pid) {
			        self.connections[roomid].disconnectWith(pid);
			    });
				
				self.connections[roomid].attachStreams.forEach(function(stream) {
				    stream.getTracks().forEach(function(track) {
				        track.stop();
				    });
				});

				self.connections[roomid].closeSocket();
				
				self.connections[roomid].close();

				delete self.connections[roomid]

			}

			self.events[roomid] = {}

            if (clbk) clbk();
		}

		self.destoryAll = function(){
			_.each(self.connections, function(c, id){
				self.destroy(id)
			})
		}

		
		return self;
	}

	self.convertUTCSS = function(str){

		var d = utcStrToDate(str);

		if (self.timeDifference){

			d.addSeconds( - self.timeDifference)
		}

		return convertDate(dateToStr(d))
	}

	self.currentTimeSS = function(){
		var created = new Date()

		if (self.timeDifference){

			created.addSeconds(self.timeDifference)
		}

		return dateToStrUTCSS(created)
	}
	
	self.currentTime = function(){
		var created = Math.floor((new Date().getTime()) / 1000)

		if (self.timeDifference){
			created += self.timeDifference
		}

		return created;
	}

	self.Cryptography = function(platform){

		var self = this;
		var mk;
		var mk256;
		var iv = [ 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
		var crypto;
		var currentRsaKeys = null;

		var check = '0101010101010101'

		if(typeof window != 'undefined'){
			crypto = window.crypto || window.msCrypto;
		}
		else
		{
			crypto = _crypto
		}

		self.helpers = {
			keyFromString : function(key, l, clbk){

				if(_Node){
					var derivedKey = PBKDF2.pbkdf2Sync(key, 'helper', 1, 32, 'sha512')

					clbk(key)

				}
				else
				{
					var mypbkdf2 = new PBKDF2(key, 'helper', 1, l);

						mypbkdf2.deriveKey(null, function(key){
							clbk(key)
						});
				}

				
			},

			keyForAes : function(key, clbk){

				var _clbk = function(key){
					
					crypto.subtle.importKey(
					    "raw", 
					    aesjs.utils.utf8.toBytes(key),
					    {   //this is the algorithm options
					        name: "AES-CBC",
					    },
					    false, 
					    ["encrypt", "decrypt"] 
					)
					.then(function(key){

						if (clbk)
							clbk(key)
					   
					})
					.catch(function(err){
					    console.log(err)
					});
				}

				if(key.length >= 128){
					_clbk(key)
				}
				else
				{
					self.helpers.keyFromString(key, 16, function(key){

						_clbk(key)

					})
				}


			}
		}

		self.api = {
			random : {
				crypto : function(clbk, bits){

					bits || (bits = 256)

					var random_num = new Uint8Array(bits / 8); 

					if(crypto.getRandomValues) {

						crypto.getRandomValues(random_num);
					}

					else
					{
						getRandomValues(random_num);
					}

					

					var str = aesjs.utils.hex.fromBytes(random_num)

						if (clbk){
							clbk(str)
						}

					return str;
				}
			},


			rsa : {
				
          		settings : {
          			hashL : "256",
          			name : "RSA-OAEP",
          			length : 4096
          		},
          		createKeys : function(clbk){
          			var settings = this.settings;

          			crypto.subtle.generateKey(
					    {
					        name: settings.name,
					        modulusLength: settings.length, //can be 1024, 2048, or 4096
					        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
					        hash: {name: "SHA-" + settings.hashL}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
					    },
					    true, //whether the key is extractable (i.e. can be used in exportKey)
					    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
					)
					.then(function(keys){

					    if (clbk)
					    	clbk(keys)
					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		exportKeys : function(keys, clbk){
          			var k = ['public' , 'private'];
          			var exporting = {};
          			var m = this.exportKey;

          			lazyEach({
          				array : k,
          				synk : true,
          				action : function(p){

          					m(keys[p.item + 'Key'], p.item, function(keydata){

          						exporting[p.item] = keydata;

          						p.success();
          					})
          				},

          				all : {
          					success : function(){
          						if (clbk)
          							clbk(exporting)
          					}
          				}
          			})
          		},
          		exportKey : function(key, pp, clbk){
          			
          			var m = 'jwk'

          			if(pp == 'public') { m = 'spki' }
          			if(pp == 'private') {m = 'pkcs8' }

          			crypto.subtle.exportKey(
					    m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
					    key //can be a publicKey or privateKey, as long as extractable was true
					)
					.then(function(keydata){
					    //returns the exported key data

					    if (clbk)
					    	clbk(convertArrayBufferToString(keydata))

					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		importKeys : function(importing, clbk){
          			var k = ['public' , 'private'];
          			
          			var m = this.importKey;
          			var keys = {}

          			lazyEach({
          				array : k,
          				action : function(p){

          					m(importing[p.item], p.item, function(key){

          						keys[p.item + 'Key'] = key

          						p.success();
          					})
          				},

          				all : {
          					success : function(){
          						if (clbk)
          							clbk(keys)
          					}
          				}
          			})
          		},
          		importKey : function(keyH, pp, clbk){
          			var settings = self.api.rsa.settings;

          			var _pp = [];
          			var m = 'jwk';

          			if(pp == 'public') {_pp = ["encrypt"]; m = 'spki' }
          			if(pp == 'private') {_pp = ["decrypt"] ; m = 'pkcs8' }

          			crypto.subtle.importKey(
					    m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
					    convertStringToArrayBuffer(keyH),
					    /*{   //this is an example jwk key, other key types are Uint8Array objects
					        kty: "RSA",
					        e: "AQAB",
					        n: keyH,
					        alg: settings.name + "-" + settings.hashL,
					        ext: true,
					    },*/
					    {   //these are the algorithm options
					        name: settings.name,
					        hash: {name: "SHA-" + settings.hashL}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
					    },
					    true, 
					    _pp
					)
					.then(function(key){

					    if (clbk)
					    	clbk(key)

					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		encrypt : function(publicKey, text, clbk){

          			//var data = aesjs.utils.utf8.toBytes(text);
          			//
          			var data = convertStringToArrayBuffer(text);
          		
          			crypto.subtle.encrypt(
					    {
					        name: "RSA-OAEP",
					    },
					    publicKey, 
					    data 
					)
					.then(function(encrypted){

					    if (clbk)
					    	clbk(convertArrayBufferToString(encrypted))
					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		decrypt : function(privateKey, text, clbk){
          			var data = convertStringToArrayBuffer(text);

	          		crypto.subtle.decrypt(
					    {
					        name: "RSA-OAEP",
					       
					    },
					    privateKey,
					    data 
					)
					.then(function(decrypted){


					    //returns an ArrayBuffer containing the decrypted data
					    if (clbk)
						    clbk(convertArrayBufferToString(decrypted))
					})
					.catch(function(err){

						console.error(err);

						if (clbk)
							clbk('')

					    //
					});
          		}
			},

			aeswc : {
				pwd : {
					encryption : function(str, p, clbk){

						self.api.aeswc.encryption(str, mk, p, clbk);
					},

					decryption : function(str, p, clbk){

						self.api.aeswc.decryption(str, mk, p, clbk);

					}
				},

				cryptoPair : function(pair, clbk){

					if(!pair.privateEncrypted)

						self.api.aeswc.pwd.encryption(pair.private, {}, function(privateEncrypted){
							pair.privateEncrypted = privateEncrypted

							if (clbk)
								clbk(pair)
						})
						
					else
					{
						if (clbk)
							clbk(pair)
					}
				},

				uncryptoPair : function(pair, clbk){

					if(!pair.private)

						self.api.aeswc.pwd.decryption(pair.privateEncrypted, {}, function(private){
							pair.private = private

							if (clbk)
								clbk(pair)
						})
						
					else
					{
						if (clbk)
							clbk(pair)
					}

					return pair;
				},
				encryption : function(str, key, p, clbk){

					if(!p) p = {};

						p.charsetEnc = (p.charsetEnc || 'utf8')
						p.charsetDec = (p.charsetDec || 'hex')

					var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

					self.helpers.keyForAes(key, function(akey){
						crypto.subtle.encrypt(
						    {
						        name: "AES-CBC",
						        iv: new Uint8Array(iv)/*window.crypto.getRandomValues(new Uint8Array(16)),*/
						    },
						    akey, //from generateKey or importKey above
						    strBytes //ArrayBuffer of data you want to encrypt
						)
						.then(function(encrypted){

							var _encrypted = aesjs.utils[p.charsetDec].fromBytes(new Uint8Array(encrypted));

							if (clbk)
								clbk(_encrypted)
						})
						.catch(function(err){
						    console.error(err);
						});
					})				
				},

				decryption : function(str, key, p, clbk){
					if(!p) p = {};

						p.charsetEnc = (p.charsetEnc || 'utf8')
						p.charsetDec = (p.charsetDec || 'hex')

					var encryptedBytes = new Uint8Array(aesjs.utils[p.charsetDec].toBytes(str));



					self.helpers.keyForAes(key, function(akey){


						crypto.subtle.decrypt(
						    {
						        name: "AES-CBC",
						        iv: new Uint8Array(iv), //The initialization vector you used to encrypt
						    },
						    akey, //from generateKey or importKey above
						    encryptedBytes //ArrayBuffer of the data
						)
						.then(function(decrypted){

						   
						    var _decrypted = aesjs.utils[p.charsetEnc].fromBytes(new Uint8Array(decrypted));

						    if (clbk)
								clbk(_decrypted)
						})
						.catch(function(err){

						    if (clbk)
								clbk('')
						});

					})

				}
			},


		}

		self.messages = {
			chat : {
				encryptions : function(publicKeys, messages, clbk){

					if(!currentRsaKeys){
						if (clbk)
							clbk()

						return
					}

					var _ar = [];
					var keys = _.map(messages, function(m,k){
						_ar.push(m)
						return k
					})

					var skey = self.api.random.crypto();

					var encryptedMessages = {};
					var encryptedKeys = null;

					lazyEach({
						array : _ar,
						action : function(p, index){
							var message = p.item;
							var key = keys[index];

							if(message){

								self.messages.chat.encryption(publicKeys, message,  function(em){

									if (em){
										encryptedMessages[key] = em.message;
										encryptedKeys = em.keys;

										p.success()
									}

									else
									{
										p.fail()
									}

									

								}, skey)
							}
							else
							{
								encryptedMessages[key] = message;

								p.success()
							}
							
						},
						all : {
							success : function(){

								if (clbk)
									clbk(encryptedMessages, encryptedKeys)
							},
							fail : function(){

								if (clbk)
									clbk()
							}
						}
					})
				},
				encryption : function(publicKeys, message, clbk, skey){

					if(currentRsaKeys){
						publicKeys || (publicKeys = [])

						publicKeys.push({
							key : currentRsaKeys.publicKey,
							user : platform.app.user.data.id
						})


						self.messages.encryption(publicKeys, check + message, clbk, skey)
					}
					else
					{
						if (clbk)
							clbk()
					}

					

				},
				decryptions : function(skey, messages, clbk){

					var _ar = [];

					var keys = _.map(messages, function(m,k){
						_ar.push(m)

						return k
					})

					var decryptedMessages = {};

					lazyEach({
						array : _ar,
						synk : true,
						action : function(p, index){

							var message = p.item;
							var key = keys[index];

							if(message){

								self.messages.chat.decryption(skey, message,  function(message){

									decryptedMessages[key] = message;

									p.success()

								})
							}
							else
							{
								decryptedMessages[key] = message;

								p.success()
							}
							
						},
						all : {
							success : function(){

								clbk(decryptedMessages)
							}
						}
					})
				},
				decryption : function(skey, encryptedMessage, clbk){

					if (currentRsaKeys){
						self.messages.decryption(currentRsaKeys.privateKey, skey, encryptedMessage, function(message){
							if(message.indexOf(check) === 0){

								message = message.substr(check.length)

							}

							else
							{
								message = ''
								//message = "Can't decrypt message"
							}

							if (clbk)
								clbk(message)
						})
					}
					else
					{
						if (clbk)
							clbk('')
					}

					
				}
			},
			decryption : function(privateKey, encryptedKey, encryptedMessage, clbk){

				var decryption = function(privateKey){
					self.api.rsa.decrypt(privateKey, encryptedKey, function(skey){

						var decryptedMessage = self.api.aeswc.decryption(encryptedMessage, skey, {}, clbk);

					})
				}				

				if(!_.isObject(privateKey)){
					self.api.rsa.importKey(privateKey, 'private', function(privateKey){
						decryption(privateKey)
					})
				}
				else
				{
					decryption(privateKey)
				}

			},
			encryption : function(publicKeys, message, clbk, skey){
				skey || (skey = self.api.random.crypto());
			
				var encryptedKeys = [];

				lazyEach({
					array : publicKeys,
					action : function(p, index){
						var key = p.item.key;

						var encryption = function(key){

							self.api.rsa.encrypt(key, skey, function(encryptedKey){
								encryptedKeys[index] = {
									key : encryptedKey,
									user : p.item.user
								}

								p.success();
							})
						}

						if(!_.isObject(key)){
							self.api.rsa.importKey(key, 'public', function(key){
								encryption(key)
							})
						}
						else
						{
							encryption(key)
						}
					},

					all : {
						success : function(){
							
							self.api.aeswc.encryption(message, skey, {}, function(encryptedMessage){
							
								if (clbk)
									clbk({
										keys : encryptedKeys,
										message : encryptedMessage
									})

							});

							
						}
					}
				})
			}
		}

		self.prepare = function(clbk){

			app.user.isState(function(state){
				if (state){

					var key = app.user.private.value;

					if (key){

						mk = key.toString('hex');

						if (clbk)
							clbk(false)

					}

					else{
						if (clbk)
							clbk('key')
					}	
				}

				else
				{
					if (clbk)
						clbk('state')
				}
			})
		}

		

		return self;
	}

	self.autoUpdater = function(){

		if(!electron) return

		var d = null;

		var updateReady = function() {

			if(!d){
				d = dialog({
					html : "Updates to Pocketnet are available. Apply the updates now?",
					btn1text : "Yes",
					btn2text : "No, later",
	
					success : function(){
	
                        electron.ipcRenderer.send('quitAndInstall');
                        d = null;
	
					},
	
					fail : function(){
						d = null;
						setTimeout(updateReady, 86400000)
					}
				})
			}
        }
        
        var updateAvailable = function() {
            if(!d) {
                if (self.app.platform.applications[os()]) {
                    var _os = self.app.platform.applications[os()]
                    if (_os.github && _os.github.url) {
                        d = dialog({
                            html : "Updates to Pocketnet are available. Go to the page to download the new version?",
                            btn1text : "Yes",
                            btn2text : "No, later",
            
                            success : function(){
                                require("electron").shell.openExternal(_os.github.page);
                                d = null;
                            },
            
                            fail : function(){
                                d = null;
                                setTimeout(updateReady, 86400000)
                            }
                        })
                    }
                }
			}
        }

		electron.ipcRenderer.on('updater-message', function(event, data){
			if(data.type == 'info'){
				if(data.msg == 'update-downloaded'){
					updateReady()
				}

				if(data.msg == 'download-progress'){
					console.log('download-progress', data)
                }
                
                if (data.msg == 'update-available' && data.linux) {
                    updateAvailable()
                }
			}

			if(data.type == 'error'){
				console.log('download-progress', data)
			}
		})

	}

	self.autochange = function(){

		var key = 'nodes'

		if(typeof _Test != 'undefined' && _Test){
			key = 'nodes_test'
		}


		self.nodeid++;


		if (self.nodeid >= self[key].length){
			self.nodeid = 0;
		}
	}

	self.Marketing = function(platform){
		var self = this;

		var userid = localStorage['mu'] || makeid();
					 localStorage['mu'] = userid;

		var ab = {};
		var _a = ['a', 'b'];

		var device = function(){
			var device = 'web'

			if(typeof _Electron != 'undefined') device = 'electron'

			if(window.cordova) device = 'cordova'

			else
			{
				if(isMobile()){

					device = 'mobile' + device

				}
			}

			return device 
		}

		self.log = function(action, note, clbk){

			platform.app.ajax.run({
				data : {
					Action : 'ADDLOGS',
					UserID : userid,
					Act : action,
					Note : note || '',
					Device : device(),
					System : 'P'
				},

				success : function(data){
										
					if (clbk)
						clbk()

				},

				fail : function(){

					if (clbk)
						clbk()
				}
			})

		}

		self.ab = {
			send : function(testid, result){

				platform.app.ajax.run({
					data : {
						Action : 'ADDTESTRESULT',
						UserID : userid,
						TestID : testid,
						Note : result || '',
						Device : device()
					},

					success : function(data){
											
						if (clbk)
							clbk()

					},

					fail : function(){

						if (clbk)
							clbk()
					}
				})

			},
			init : function(){	

				ab = JSON.parse(localStorage['ab'] || "{}")
				
			},
			add : function(testid, prev){

				if(ab[testid]){
					return 
				}

				ab[testid] = ab[prev] || _a[rand(0, 1)]

				localStorage['ab'] = JSON.stringify(ab)
			}
		}


		return self;
	}

	self.nodes_test = [
		{
			full : '84.52.69.110:10011',
			host : '84.52.69.110',
			port : 10011,
			ws : 8080,
			path : '',

			test : true,
			name : 'performancetest'
		}

		/*,{
			full : '84.52.69.110:48081',
			host : '84.52.69.110',
			port : 48081,
			ws : 8080,
			path : '',

			test : true,
			name : 'performancetest'
		}*/
	]

	self.nodes = [

		/*{
			full : '84.52.69.110:58081',
			host : '84.52.69.110',
			port : 58081,
			ws : 8080,
			path : '',

			name : 'spb1'
		},*/



		{
			full : '216.108.237.11:38081',
			host : '216.108.237.11',
			port : 38081,
			ws : 8087,
			path : '',

			name : 'spb1'
		},

		

		/*{
			full : '84.52.69.110:37071',
			host : '84.52.69.110',
			port : 37071,
			ws : 8080,
			path : '',

			name : 'spbtest'
		}*/

	]


	self.clear = function(){
		

		self.app.nav.addParameters = null;

		_.each(self.sdk, function(c, id){
				
			if (c.storage){
				c.storage = {}
			}
		})

		self.sdk.search.storage = {
			all : {},
			fs : {},
			posts : {},
			users : {}
		}

		self.sdk.articles.storage = []

		self.sdk.notifications.clbks.seen = {};
		self.sdk.notifications.clbks.added = {};
		self.sdk.notifications.inited = false;

		self.sdk.ustate.clbks = {};

		self.sdk.node.storage = {
			balance : {

			}
		}

		app.platform.sdk.node.shares.storage = {
			trx : {}
		}

		app.platform.sdk.node.transactions.storage = {}
		app.platform.sdk.node.transactions.temp = {}
		
		

		if(electron){
			electron.ipcRenderer.send('update-badge', null);
			electron.ipcRenderer.send('update-badge-tray', null);
		}
		

		if (self.ws)
			self.ws.destroy()

		if (self.clientrtctemp){
			self.clientrtctemp.destroy()
		}

		if (self.focusListener){
			self.focusListener.destroy()
		}
	}

	self.restart = function(clbk){
		self.clear();

		app.user.isState(function(state){

			self.prepare(clbk, state)

		})
	}

	self.update = function(clbk){

		if (self.updating || self.preparingUser || self.preparing) return;

		self.updating = makeid()

		setTimeout(function(){
			self.updating = false;
		}, 90000)

		var methods = [
			'ustate.meUpdate',
			'user.meUpdate',
			'node.transactions.checkTemps',
			'node.transactions.get.allBalanceUpdate',
			'tempmessenger.getChats'
		]	

		var progress = 10;

		//topPreloader(progress);

		lazyEach({
			array : methods,
			action : function(p){
				var m = p.item;

				var f = deep(self.sdk, m);

				f(function(){

					progress = progress + 15;

					//topPreloader(progress);

					p.success();

				})
			},

			all : {
				success : function(){

					//topPreloader(100);


					if (clbk)
						clbk();
				}
			}
		})
	}
	
	self.prepare = function(clbk, state){	

		self.preparing = true;

		self.ws = new self.WSn(self);

		self.firebase = new self.Firebase(self);

		if(!_Node)
		{
			self.state.load();

			self.focusListener = self.FocusListener(self);
			self.focusListener.init();


			self.initSounds();

			//self.rtc = new self.RTC(self);

			self.sdk.node.update()

			self.m = new self.Marketing(self);

			self.titleManager = new self.TitleManager();	

		}

		self.sdk.node.get.time(function(){

			self.preparing = false;
			
			if(!state && !_Node && typeof _Electron == 'undefined' && !window.cordova && !localStorage['popupsignup'] && !_Node){
				setTimeout(function(){

					var href = self.app.nav.get.href();

					self.app.user.isState(function(state){

						if (!state && href != 'registration' && href != 'authorization' && href != 'video'){

							

							var h = '<div class="dimage" image="img/mainbgsmall.jpg"><div class="ppheader"><div class="table"><div>Join now and get a bonus of 5 Pocketcoin cryptocurrency tokens. This offer will end soon, join Pocketnet early and become a pioneer!</div></div></div></div>';

							var d = dialog({
								html : h,
								class  :'popupsignup',

								btn1text : 'Join Pocketnet & Earn Pocketcoin Now',
								btn2text : 'Watch Video',

								success : function(){
									

									self.app.nav.api.load({
										open : true,
										href : 'registration',
										history : true
									})
								},

								fail : function(){
									self.app.nav.api.load({
										open : true,
										href : 'video',
										history : true
									})
								}
							})


						}
					})

				}, 15000)
			}

			self.prepareUser(clbk, state);
			
		})
	}

	self.prepareUser = function(clbk, state){

		self.preparingUser = true;

		var stateclbk = function(state){
			if(state){
				

				lazyActions([

					self.sdk.node.transactions.loadTemp, 
					self.sdk.addresses.init, 
					self.cryptography.prepare, 
					self.sdk.pool.init,
					self.sdk.ustate.me,
					self.sdk.usersettings.init,
					self.sdk.articles.init,
					self.sdk.imagesH.load,
					self.sdk.chats.load,
					self.sdk.user.subscribeRef,
					self.ws.init,
					self.firebase.init,
					self.sdk.tempmessenger.init,
					self.sdk.exchanges.load

					], function(){
					
					self.sdk.node.transactions.checkTemps(function(){

						self.sdk.user.get(function(u){

							//if(Number(u.postcnt) > 0)

								/*setTimeout(function(){
									self.sdk.user.survey()
								}, 300000)*/

							
								/*setTimeout(function(){

									self.sdk.node.transactions.kr(48000, 200, function(){
										console.log("END")
									})

								}, 5000)*/
							

							/*for(var i = 0; i < 1000; i++){
								setTimeout(function(){
									console.log('dateToStrUTCSS()', dateToStrUTCSS())
								},2) 
							}*/

							self.app.nav.addParameters = function(h){
								return self.app.nav.api.history.addParametersToHref(h, {
									ref : self.app.platform.sdk.address.pnet().address
								})
							}

							self.preparingUser = false;
							
							
							if (clbk)
								clbk()
							
						})

						
					})

				})
			}
			else
			{
				self.preparingUser = false;

				if (clbk)
					clbk()
			}

		}

		if(typeof state != 'undefined'){
			stateclbk(state)
		}
		else
		{
			app.user.isState(function(state){

				localStorage['popupsignup'] = 'showed'

				stateclbk(state)
			})
		}
	}

	self.prepareApi = function(clbk, u){

		self.rpc = {};


		_.each(self.nodes, function(n, i){


			var config = {
			    protocol: 'http',
			    user: u.user,
			    pass: u.pass,
			    host: n.host,
			    port: n.port,
			};

			self.rpc[i] = new RpcClient(config);
		})
			
		self.sdk.node.get.time(function(){

			if (clbk)
				clbk()

		})
	
	}

	self.initSounds = function(){

		if(typeof ion != 'undefined')

			ion.sound({
			    sounds: [
			        {
			            name: "water_droplet"
			        }
			    ],
			    volume: 0.5,
			    path: "js/vendor/ion.sound/sounds/",
			    preload: true
			});
	}

	self.FocusListener = function(platform){

		var self = this;

		var f = function(e){

			self.focus = true;

           	self.clbks.focus();

           	if (self.titleManager){
            	self.titleManager.clear();
            }

            if (self.ws){
            	//self.ws.authConnect()
            }

		}

		var uf = function(){
			self.focus = false;

		}

		var missed = function(){
			
			if (platform.ws){
				platform.ws.getMissed()
			}

		}

        window.focus();

		self.focus = true;

		var inited = false;
		

		self.init = function(){

			if (window.cordova){
	
				document.addEventListener("pause", uf, false);
				document.addEventListener("resume", f, false);
				document.addEventListener("resume", missed, false);
			}
	
	
			if(electron){
	
				var w = electron.remote.getCurrentWindow();
	
				w.on('hide', uf)
				w.on('minimize', uf)
				w.on('restore', f)
	
			}     
	
			$(window).on('focus', f);
			$(window).on('blur', uf);  

			inited = true;
		}

		self.destroy = function(){
			if(!inited) return

			if (window.cordova){

				document.removeEventListener("pause", uf, false);
				document.removeEventListener("resume", f, false);
				document.removeEventListener("resume", missed, false);
			}
	
	
			if(electron){
	
				var w = electron.remote.getCurrentWindow();
				
					w.off('hide', uf)
					w.off('minimize', uf)
					w.off('restore', f)
	
			}       
			
			$(window).off('focus', f);
			$(window).off('blur', uf);  

			inited = false;
		}
		
		
		return self;
	}

	self.TitleManager = function(){
		var self = this;

		var initial = '';
		var interval = null;

		self.add = function(text){

			text = $('<div>').html(text).text()

			if (interval)
				clearInterval(interval);

			if(!initial){
				initial = document.title
			}

			var i = 0;

			interval = setInterval(function(){

				i++;

				if (i % 2){
					document.title = text;
				}
				else
				{
					document.title = initial;
				}

			}, 700)
		}

		self.clear = function(){

			if (interval)
				clearInterval(interval);

			interval = null;

			if (initial){
				document.title = initial;
			}

			initial = '';
		}

		document.title

		return self;
	}

	self.state = {
		save : function(){
			localStorage['nodeid'] = self.nodeid || '1';

			if (self.addressType)
				localStorage['addressType'] = self.addressType;
		},
		load : function(){
			self.nodeid =  localStorage['nodeid'] || '1';
			self.addressType =  localStorage['addressType'] || 'p2pkh';

		}
	}

	self.app = app;

	self.cryptography = new self.Cryptography();

	self.autoUpdater()

	return self;

}


if(typeof module != "undefined")
{
	module.exports = Platform;
}

topPreloader(65);