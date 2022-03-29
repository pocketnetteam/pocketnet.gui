/*
if(typeof require != 'undefined' && typeof __map == 'undefined')
{
	var __map = require("./_map.js");
}*/

if (typeof _OpenApi == 'undefined') _OpenApi = false;

if(typeof _Electron != 'undefined' && _Electron){

	imagesLoaded = require('./js/vendor/imagesloaded.pkgd.min.js');

	emojione = require('emojione')

	var Isotope = require('isotope-layout'); require('isotope-packery');

	var jquerytextcomplete = require('jquery-textcomplete')

	animateNumber = require('./js/vendor/jquery.animate-number.js')
	touchSwipe = require('./js/vendor/jquery.touchSwipe.js')
	
	ImageUploader = require('./js/image-uploader.js');



	jQueryBridget = require('jquery-bridget');
	jQueryBridget( 'isotope', Isotope, $ );
	jQueryBridget( 'textcomplete', jquerytextcomplete, $ );

	Mark = require('./js/vendor/jquery.mark.js');

	EmojioneArea = require('./js/vendor/emojionearea.js')
	filterXss = require('./js/vendor/xss.min.js')

}

if(typeof _Node == 'undefined') _Node = false;

/////////////////////////////////////////////
///

chrsz = 8;

Application = function(p)
{	

	if(!p) p = {}

	var self = this;
	var realtimeInterval = null;
	var baseorientation = typeof getbaseorientation != undefined ? getbaseorientation() : 'portrait'

	self._meta = {
		Pocketnet : {
			url : "pocketnet.app",
			turl : "test.pocketnet.app",
			fullname : "Pocketnet",
			protocol : 'pocketnet',
			blockexplorer : 'https://pocketnet.app/blockexplorer/'
		},

		Bastyon : {
			fullname : "Bastyon",
			url : "bastyon.com",
			turl : "test.pocketnet.app",
			protocol : 'bastyon',
			blockexplorer : 'https://pocketnet.app/blockexplorer/'
		}
	}

	self.meta = self._meta.Pocketnet

	if (window.pocketnetproject && self._meta[window.pocketnetproject]){
		self.meta = self._meta[window.pocketnetproject]
	}

	var url = window.pocketnetdomain

	if (window.testpocketnet){
		self.test = true
	}

	self.options = {
		
		url : url,

		matrix : p.matrix,

		nav : {
			navPrefix : window.pocketnetpublicpath || '/pocketnet',
		},

		name : 'PCRB',
		fullName : self.meta.protocol,
		localStoragePrefix : self.meta.protocol,

		
		server : p.server || 'https://pocketnet.app/Shop/AJAXMain.aspx', //donations will be removed

		//////////////
		
		firebase : p.firebase || 'https://'+url+':8888', /// will be removed

		//////////////

		peertubeServer : 'https://test.peertube2.pocketnet.app/api/v1/',


		//////////////

		imageServer : p.imageServer || 'https://api.imgur.com/3/',
		imageStorage : 'https://api.imgur.com/3/images/',

		//imageServerup1 : p.imageServerup1 || 'https://'+url+':8092/up', // will be part of proxy
		imageServerup1 : p.imageServerup1 || 'https://pocketnet.app:8092/up',
		rtc : p.rtc || 'https://'+url+':9001/',
		rtcws : p.rtcws || 'wss://pocketnet.app:9090',
		rtchttp : p.rtchttp || 'https://pocketnet.app:9091',
		
		listofnodes : p.listofnodes || null,
		listofproxies : p.listofproxies || null,

		unathorizated : function(ignoreDialog){

			self.user.isState(function(state){

				if (state){

					self.user.signout();

					self.reload({
						href : 'authorization'
					});

					if(!ignoreDialog)
						dialog({
							html : self.localization.e('id189_1'),
							class : 'accepting one',
							btn1text : "Okay",
							btn2text : self.localization.e('dcancel'),
						})

					

				}

			})

			
		},

		/////////

		successHandler : function(p){

			var ca = {}
			var change = false;

			if (p.rpc){
				ca.proxy = true;
				ca.node = true;
				ca.offline = true;
			}

			if (p.api){
				ca.proxy = true;
				ca.offline = true;
			}

			if (p.apim){
				ca.proxymain = true;
				ca.offline = true;
			}

			if (p.online){
				ca.offline = true
			}

			ca.offline = true;

			_.each(ca, function(t, i){

				if (self.errors.state[i]){
					delete self.errors.state[i]

					change = true
				}

			})

			if(change){
				_.each(self.errors.clbks, function(c){
					c(self.errors.state)
				})
			}

		},


		///////////

		errorHandler : function(error, p){

			if(!error) {

				if (p.rpc || p.api)

					error = 'proxy'

				if (p.apim)
					error = 'proxymain'

			}

			else
			{
				if(error == 'fail') error = ''
				//error = 'node'
			}


			if((error == 'proxy' || error == 'proxymain') && self.platform && !self.platform.online){
				error = 'offline'
			}

			self.app.api.changeProxyIfNeed()

			if(error && !self.errors.state[error]){

				self.errors.state[error] = true;

				_.each(self.errors.clbks, function(c){
					c(self.errors.state)
				})

			}


			return error;
	
		}
		
	};

	var isonline = function(){

		if (window.cordova){
			if(navigator.connection.type === 'none') return false
		}
	
		if(typeof window.navigator && window.navigator.onLine === false){
			return window.navigator.onLine
		}
	
		return true
	}
	

	var istouchstyle = function(){

		let isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;

		self.mobileview = (isIpad || self.el.html.hasClass('mobile') || self.el.html.hasClass('ipad') || self.el.html.hasClass('tablet') || window.cordova || self.width < 768)

		if ((typeof _Electron != 'undefined' && _Electron)){
			self.mobileview = false
		}

		if(self.mobileview){
			self.el.html.addClass('mobileview').removeClass('wsview')
		}
		else{
			self.el.html.removeClass('mobileview').addClass('wsview')
		}
	}

	self.secure = function(){
		return location.protocol != 'http:'
	}

	self.canuseip = function(){
		if(self.test && (!self.secure() || (typeof _Electron != 'undefined' && _Electron))){
			return true
		}
	}

	self.useip = function(){
		return self.canuseip() && self.platform.sdk.usersettings.meta.canuseip.value
	}

	self.isonline = isonline

	///////////////
	self.errors = {
		clear : function(){
			this.state = {};

			self.platform.loadingWithErrors = false

			self.errors.autocheck(false)

		},
		state : {},
		clbks : {

			/*_platform : function(change){
				if(!self.errors.connection() && !self.platform.loadingWithErrors){
					self.prepareUserData()
				}
			},*/

			_modules : function(change){


				if(!self.errors.connection() && !self.platform.loadingWithErrors){

					_.each(self.modules, function(m){

						_.each(m.module.iclbks, function(c){
	
							c(change)
	
						})
						
					})

				}
				
			},

			check : function(){
				if (self.errors.connection()){
					self.errors.autocheck(true)
				}

				else
				{
					self.errors.autocheck(false)
				}
			}

		},

		_autocheck : null,

		autocheck : function(enable){
			if (enable){

				if(!self.platform || !this.connection()) return

				self.errors._autocheck || (self.errors._autocheck = setInterval(function(){

					if (self.platform.focus && isonline()){
						self.errors.check()
					}

				}, 10000))

			}
			else{

				if(self.errors._autocheck){

					clearInterval(self.errors._autocheck)
					self.errors._autocheck = null;

				}

			}
		},

		check : function(clbk){
			if (self.errors.state.node || self.errors.state.proxy)
				self.platform.sdk.node.get.time(function(t, error){})

			if (self.errors.state.proxymain){
				self.platform.sdk.proxy.info(function(t, error){}, true)
			}
		},

		connection : function(){
			return this.state.node || this.state.proxy || this.state.offline
		},

		connectionRs : function(){
			return (this.state.node || this.state.proxy || this.state.offline) && !self.platform.loadingWithErrors
		}
	}

	self.apiHandlers = {
		success : function(p){

			var ca = {}
			var change = false;

			if (p.rpc){
				ca.proxy = true;
				ca.node = true;
			}

			if (p.api){
				ca.proxy = true;
			}

			ca.offline = true;


			_.each(ca, function(t, i){

				if (self.errors.state[i]){
					delete self.errors.state[i]

					change = true
				}

			})

			if (change){
				_.each(self.errors.clbks, function(c){
					c(self.errors.state)
				})
			}

		},

		///////////

		error : function(p){
			var error = null

			if (p.rpc){
				error = 'node'
			}

			if (p.api){
				error = 'proxy'
			}

			if((error == 'proxy') && (self.platform && !self.platform.online)){
				error = 'offline'
			}


			if(error && !self.errors.state[error]){

				self.errors.state[error] = true;

				_.each(self.errors.clbks, function(c){
					c(self.errors.state)
				})

			}
			

			return error;
	
		}
	}

	self.el = {}

	self.id = makeid();
	self.map = __map;
	self.modules = {};

	self.curation = function(){

		//if(window.cordova && typeof isios != 'undefined' && isios()) return true
		return false
	}

	self.letters = {
		videoblogger : function({
			link1 = '',
			link2 = '',
			link3 = '',
			info = '',
			email = '',
			address = ''
		}, clbk){

			var _p = {
				link1,
				link2,
				link3,
				info,
				address, 
				email
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2001'

			var body = ''

				body += '<p><a href="https://'+self.options.url+'/author?address='+address+'">User ('+address+') require PKOIN</a></p>'

				if(link1)
					body += '<p>Link: <a href="'+link1+'">'+link1+'</a></p>'

				if(link2)
					body += '<p>Link: <a href="'+link2+'">'+link2+'</a></p>'

				if(link3)
					body += '<p>Link: <a href="'+link2+'">'+link2+'</a></p>'

				body += '<p>Info: '+info+'</p>'
				body += '<p>Email: '+email+'</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success : function(){

					if (clbk)
						clbk(true);

				},

				error : function(){

					if (clbk)
						clbk(true);
				}
			});

		}
	}

	self.complainletters = {

		post : function({
			address,
			postid,
			reason
		}, clbk){

			if(!address || !reason || !postid){
				clbk(false)
				return
			}

			var _p = {
				address,
				reason,
				postid
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
				body += '<p><a elementsid="https://'+self.options.url+'/author?address='+address+'" href="https://'+self.options.url+'/author?address='+address+'">User('+address+')</a> complaint post <a elementsid="https://'+self.options.url+'/post?s='+postid+'" href="https://'+self.options.url+'/post?s='+postid+'">Post ('+postid+')</a></p>'
				body += '<p>Reason: '+reason+'</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success : function(){


					if (clbk)
						clbk(true);

				},

				error : function(){

					if (clbk)
						clbk(true);
				}
			});
		},

		user : function({
			address1,
			address2,
			email,
			reason
		}, clbk){

			if(!address1 || !address2 || !reason){
				clbk(false)

				return
			}

			var _p = {
				address1 : address1,
				address2 : address2,
				email : email || ''
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
				body += '<p><a href="https://'+self.options.url+'/author?address='+address1+'">User('+address1+')</a> complaint another <a href="https://'+self.options.url+'/author?address='+address2+'">user('+address2+')</a></p>'
				body += '<p>Reason: '+reason+'</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success : function(){


					if (clbk)
						clbk(true);

				},

				error : function(){

					if (clbk)
						clbk(true);
				}
			});

		},
		common : function({address1, reason, email},  clbk){
			if(!address1 || !reason){
				clbk(false)

				return
			}

			var _p = {
				address1 : address1,
				email : email
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
				body += '<p>Common complaint</p>'

				body += '<p>Reason: '+reason+'</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success : function(){

					if (clbk)
						clbk(true);

				},

				error : function(){

					if (clbk)
						clbk(true);
				}
			});
		},
		room : function({address1, roomid, reason}, clbk){
			if(!address1 || !roomid || !reason){
				clbk(false)

				return
			}

			var _p = {
				address1 : address1,
				roomid : roomid
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
				body += '<p><a elementsid="https://'+self.options.url+'/author?address='+address1+'" href="https://'+self.options.url+'/author?address='+address1+'">User('+address1+')</a> complaint room ('+roomid+')</a></p>'

				body += '<p>Reason: '+reason+'</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success : function(){

					if (clbk)
						clbk(true);

				},

				error : function(){

					if (clbk)
						clbk(true);
				}
			});
		}

	} 

	self.relations = {};

	self.backmap = {


		index : {
			href : 'index',
			childrens : ['author', 'chat', 's', 'share', 'userpage']
		},

		s : {
			href : 's',
			childrens : ['author', 'chat', 's', 'share','userpage']
		},

		author : {
			href : 'author',
			childrens : ['author', 's', 'chat', 'share', 'userpage']
		},

		userpage : {
			href : 'userpage',
			childrens : ['userpage', 'share', 'author', 'post', 'authorization', 'registration', 'pkview']
		}

	}

	if(self.curation()){
		delete self.backmap.index
	}

	self.options.backmap = self.backMap

	var prepareMap = function(){

		_.each(self.map, function(m, id){
			m.id = id;
		})

	}

	if (typeof window != 'undefined')
		self.options.address = window.location.protocol + "//" + window.location.host; 


	self.preapi = function(){

		if(self.preapied) return
			
		self.api = new Api(self)
		self.api.initIf()

		self.localization = new Localization(self);
		self.localization.init()

		self.preapied = true
		
	}
	
	var newObjects = function(p){
		
		self.settings = new settingsLocalstorage(self);
		self.nav = new Nav(self);	
		
		self.ajax = new AJAX(self.options);	
		self.user = new User(self);	
		self.ajax.set.user(self.user);

		self.platform = new Platform(self, self.options.listofnodes);

		self.imageUploader = new ImageUploader(self);

		self.options.platform = self.platform

		if (self.ref)
			self.platform.sdk.users.addressByName(self.ref, function(r){
				if(r){
					self.setref(r)
					/*self.ref = r;
					localStorage['ref'] = self.ref*/
				}

			})

		self.nav.dynamic = function(p, clbk){
			

			self.platform.sdk.users.addressByName((p.href), function(r){

				if (r){
					if (clbk)
						clbk(null, {

							id : 'author',
							extra : {
								address : r
							}

						})
				}
				else{
					if (clbk)
						clbk('notfound')
				}

			})

		}

	}

	self.module = function(id){

		var checkedId = deep(self, 'map.' + id + ".id");

		var module = null;

		if (checkedId)

			module = deep(self, 'modules.' + checkedId + ".module") || null;

		return module;
	}

	self.initTest = function(mnemokey, clbk,){
		if (typeof localStorage == 'undefined') localStorage = {};

		prepareMap();

		newObjects();

		self.platform.nodeid = 0;

		self.user.setKeysPair(self.user.keysFromMnemo(mnemokey));

		self.user.isState(function(state){

			self.localization.init(function(){

				self.platform.prepare(function(){
					if (clbk)
						clbk(state)
				})

			})

			
		})
	}

	self.initTestFromPrivate = function(private, clbk,){
		if (typeof localStorage == 'undefined') localStorage = {};

		prepareMap();

		newObjects();

		self.platform.nodeid = 0;

		self.user.setKeysPairFromPrivate(private);

		self.user.isState(function(state){

			self.localization.init(function(){

				self.platform.prepare(function(){
					if (clbk)
						clbk(state)
				})

			})

			
		})
	}

	self.showuikeysfirstloading = function(){

		self.user.isState(function(state){

			if(state && self.platform.sdk.address.pnet()){

				self.user.usePeertube = self.platform.sdk.usersettings.meta.enablePeertube ? self.platform.sdk.usersettings.meta.enablePeertube.value : false;


				if (self.platform.sdk.registrations.showprivate()){
					self.platform.ui.showmykey({
						showsavelabel : true
					})
				}
			}

		})
	}

	self.init = function(p){

		if (navigator.webdriver && !self.test && !parameters().webdrivertest) return

		if (typeof localStorage == 'undefined')
			localStorage = {};

		if(!p) p = {};
		
		p.nav || 		(p.nav = {})
		p.nav.clbk || 	(p.nav.clbk = self.initClbk || null)

		prepareMap();

		self.options.fingerPrint = hexEncode('fakefingerprint');
		
		self.localization.init(function(){

			newObjects(p);

			lazyActions([
				self.platform.prepare
			], function(){

				self.realtime();

				if (typeof hideSplashScreen != 'undefined'){
					hideSplashScreen();
				}	
				else{
					$('#splashScreen').remove()
				}

                // TODO (brangr): DEBUG!
                //p.nav.href = "userpage?id=system16"
				
				self.nav.init(p.nav);

				if (p.clbk) 
					p.clbk();

				if(!_OpenApi)
					self.showuikeysfirstloading()

				
			
				self.mobile.update.needmanagecheck().then(r => {
					if (r){
						self.mobile.update.hasupdatecheck()
					}
						
				})

				try{
					self.mobile.reload.initparallax()
				}catch(e){
					console.error(e)
				}

			})

		})

		self.mobile.inputs.init()

	}

	self.reload = function(p){
		if(!p) p = {};

			p.nav || (p.nav = {})


		if(typeof p.nav.reload == 'undefined')
			p.nav.reload = true;

		if(p.href) p.nav.href = p.href;
		if(p.history) p.nav.history = p.history;
		if(p.current) p.nav.href = self.nav.get.href()

		if (typeof _Electron != 'undefined' && _Electron) {
			p.nav.href = 'index'
		}

		self.destroyModules();
		
		self.user.isState(function(s){

			p.nav.clbk = p.clbk;

			if(typeof p.nav.href == 'function') p.nav.href = p.nav.href()

			self.nav.init(p.nav);
			
		})
	}

	self.reloadModules = function(clbk){
		self.destroyModules();
		
		self.user.isState(function(){

			var mp = _.filter(self.map, function(mobj, i){

				var m = self.modules[i]

				if (m && m.module.inited && m.module.authclbk){
					m.module.authclbk()
				}

				if (m && m.module.inited && m.module.restart && (mobj.reload && !mobj.now) ) {
					m.module.restart();
				}

				if (m && mobj.now) {
					//m.module.restart();

					return true;
				}
			})

			self.nav.api.ini(function(){
				if (clbk)
					clbk()
			}, mp)

			
		})
	}

	self.reloadLight = function(clbk){

		self.reloadModules(function(){
			if (clbk)
				clbk();
		})

	}

	self.chatposition = function(ab){
		var attr = ab ? 'above' : 'under'

		self.el.html.attr('chatposition', attr)
	}

	self.deviceReadyInit = function(p){

		self.el = {
			content : 		$('#content'),
			app : 			$('#application'),
			header : 		$('#headerWrapper'),
			menu : 			$('#menuWrapper'),
			toppanel : 		$('#panelWrapper'),
			navigation : 	$('#navigationWrapper'),
			footer : 		$('#footerWrapper'),
			chats : 		$('.chats'),
			html : 			$('html'),
			window : 		$(window),
			windows : 		$('#windowsContainer'),
			electronnav : 	$('#electronnavContainer'),
			preloader : 	$('#globalpreloader'),
			topsmallpreloader : 	$('#topsmallpreloader'),
		};



		if (self.test){
			$('html').addClass('testpocketnet') /// bstn
		}

		initevents()

		moment.locale(self.localization.key)

		if(typeof window.cordova != 'undefined')
		{
			document.addEventListener('deviceready', function(){

				self.el.html.addClass('cordova')

				if(self.curation()){
					self.el.html.addClass('curation')
				}

				if (window.cordova && !isMobile()){
					self.el.html.addClass('tablet')
				}

				
				if(isTablet() && !isMobile()) baseorientation = null

				self.mobile.screen.lock()

				p || (p = {});

				p.clbk = function(){

					self.appready = true

					if (navigator.splashscreen)
						navigator.splashscreen.hide();
				}

				self.mobile.pip.init()

				

				if (window.Keyboard && window.Keyboard.disableScroll){
					window.Keyboard.disableScroll(false)
				}

				if (cordova.plugins && cordova.plugins.backgroundMode)
					cordova.plugins.backgroundMode.on('activate', function() {
						cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
					});

				self.init(p)

			}, false);
		}
		else
		{

			

			self.init(p);

			setTimeout(function(){
				self.appready = true

			
			}, 2000)
		}


	}

	self.destroyModules = function(){
		_.each(self.modules, function(module){
			if (module.module.inited) {
				if (module.module.destroy)
					module.module.destroy();
			}
				
		})
	}

	self.stopModules = function(){
		_.each(self.modules, function(module){

			if (module.module.inited) {
				module.module.stop();
			}
				
		})
	}

	self.destroy = function(){

		self.destroyModules();

		self.modules = {};
		self.ajax = null;

		self.nav = null;
	}

	self.renewModules = function(map){}
	self.logger = function(Function, Message){}

	self.scrollRemoved = 0;
	self.scrollTop = 0
	self.lastScrollTop = 0

	self.height = 0
	self.width = 0
	self.inputfocused = false
	self.fullscreenmode = false
	self.pseudofullscreenmode = false
	self.playingvideo = null
	self.pipwindow = null

	var blockScroll = false
	var scrollmodechanging = false
	var optimizeTimeout = null

	self.actions = {
		
		pipwindow : function(p){
			
			if (self.pipwindow) {
				self.pipwindow.destroy()
				self.pipwindow = null
			}

			if(!p) {
				return
			}

			var clbk = p.clbk

			p.open = true
			p.pip = true
			p.inWnd = true
			p.history = false
			p.open = true

			p.eid = p.mid = makeid()

			if (p.essenseData){
				p.essenseData.eid = p.eid
			}

			p.clbk = function(c,b){
				self.pipwindow = b


				/*console.log('elf.pipwin', self.pipwindow)

				setTimeout(function(){
					console.log('self.pipwindow.playerstatus()',self.pipwindow.playerstatus())
				},2000)*/

				if(clbk) clbk(c,b)
			}

			p.onclose = function(){
				self.pipwindow = null
			}


			self.nav.api.load(p)

		},

		emoji : function(text){
			if(self.mobileview) return text

			return joypixels.toImage(text)
		},

		restore : function(){

			return

			if (optimizeTimeout) clearTimeout(optimizeTimeout)

				optimizeTimeout = null

			/*self.el.content.css('width', '')
			self.el.content.css('height', '')
			self.el.content.css('contain', '')*/
			/*self.el.footer.css('display', '')
			self.el.content.css('display', '')*/
		},

		optimize : function(){

			
			return

			if (optimizeTimeout) clearTimeout(optimizeTimeout)

				optimizeTimeout = setTimeout(function(){
					/*self.el.content.css('width', self.width)
					self.el.content.css('height', self.height)
					self.el.content.css('contain', 'strict')*/
					/*self.el.content.css('display', 'none')
					self.el.footer.css('display', 'none')*/
				}, 300)

			
		},

		playingvideo : function(v){

			if (self.playingvideo && self.playingvideo.playing){

				try{
					self.playingvideo.pause()
				}
				catch(e){

				}
				
			}

			self.playingvideo = v

			if(self.playingvideo){

				setTimeout(function(){

					var scrollTop = self.actions.getScroll()
	
					if (self.playingvideo && self.playingvideo.playing){

						if (scrollTop >= 65) self.el.html.addClass('scrollmodedown')
						
					}
	
				}, 1000)
			}
			
			setTimeout(function(){

				var duration = deep(self.playingvideo, 'embed.details.duration') || 0

				self.mobile.backgroundMode(self.playingvideo && self.playingvideo.playing && (!duration || duration > 60)/* && self.platform.sdk.videos.volume*/)

			}, 1000)
			

		},

		up : function(scrollTop, el, time){
			_scrollTop(scrollTop, el, time)
		},

		wscroll : function(){
			self.actions.scroll(self.scrollTop)
		},

		scrollToTop: function(){
			self.actions.scroll(0)
		},

		backupscroll : function(){
			self.actions.scroll(self.lastScrollTop)
		},

		scroll : function(to){

			blockScroll = true

			self.el.window.scrollTop(to)
			self.scrollTop = to

			setTimeout(function(){
				blockScroll = false
			}, 100)
			
		},

		getScroll : function(){

			var s = window.pageYOffset || document.documentElement.scrollTop;

			if(!self.fullscreenmode){
				self.lastScrollTop = s
			}

			return s
		},

		offScroll : function(target){

			if(self.scrollRemoved < 0) self.scrollRemoved = 0

			self.scrollRemoved++

			console.log('self.scrollRemoved1', self.scrollRemoved)

			if (self.scrollRemoved > 1){
				return false
			}

			scrollmodechanging = true

			self.el.html.css('overflow', 'hidden')

			/*if (self.mobileview && window.bodyScrollLock && target){

				window.bodyScrollLock.disableBodyScroll(target[0])
				self.scrolltarget = target
			}*/

			//self.el.html.addClass('nooverflow')

			if (window.Keyboard && window.Keyboard.disableScroll){
				window.Keyboard.disableScroll(true)
			}

			setTimeout(function(){
				scrollmodechanging = false
			}, 100)

			return true
			
		},

		onScroll : function(target){

			if (self.scrollRemoved < 1) self.scrollRemoved = 1

			if (self.scrollRemoved){
				self.scrollRemoved--
			}

			

			if(!self.scrollRemoved){

				scrollmodechanging = true

				self.el.html.css('overflow', '')

				/*if (self.mobileview && window.bodyScrollLock && self.scrolltarget){
					window.bodyScrollLock.enableBodyScroll(self.scrolltarget[0])
					self.scrolltarget = null
				}*/

				///
				//self.el.html.removeClass('nooverflow')
				///

				if (window.Keyboard && window.Keyboard.disableScroll){
					window.Keyboard.disableScroll(false)
				}

				setTimeout(function(){
					scrollmodechanging = false
				}, 100)
			}

		},

	}

	var initevents = function(){

		self.height = self.el.window.height()
		self.width = self.el.window.width()

		document.documentElement.style.setProperty('--vh', `${self.height * 0.01}px`);

	

		istouchstyle()

		var showPanel = '1'

		var cr = self.curation()

		var scrolling = _.throttle(function(){

			if(!self.el.window) return
			if (self.fullscreenmode) return
			if (scrollmodechanging) return
			if (self.blockScroll) return

			var lastScrollTop = self.lastScrollTop

			var scrollTop = self.actions.getScroll()

			_.each(self.events.scroll, function(s){
				s(scrollTop, blockScroll)
			})

			if(self.mobileview && !cr){

				var cs = (lastScrollTop + 40 < scrollTop || lastScrollTop - 40 < scrollTop)

				var scrollTopH = 900

				if(self.playingvideo) scrollTopH = 65

				if (scrollTop < scrollTopH){

					showPanel = '1'

					if (self.el.html.hasClass('scrollmodedown')){
						self.el.html.removeClass('scrollmodedown')
					}

					return
				}

				if (scrollTop > scrollTopH && cs){
					if(lastScrollTop + 40 < scrollTop){
						showPanel = '2'

						if(!self.el.html.hasClass('scrollmodedown')){
							self.el.html.addClass('scrollmodedown')
							if(self.modules.menu.module) self.modules.menu.module.blursearch()
						}
							

						
					}
				}
				else{
					showPanel = '3'
				}

			}

		}, 100)

		var dbscrolling = _.debounce(function(){

			if(!self.el.window) return
			if (self.fullscreenmode) return
			if (scrollmodechanging) return
			if (self.blockScroll) return
			
			_.each(self.events.delayedscroll, function(s){
				s(self.lastScrollTop, blockScroll)
			})

			if(!t && self.mobileview){

				if (showPanel == '2' && !self.el.html.hasClass('scrollmodedown')){
					self.el.html.addClass('scrollmodedown')
				}
	
				if (showPanel == '3' && self.el.html.hasClass('scrollmodedown'))
					self.el.html.removeClass('scrollmodedown')
					
				showPanel = '1'
			}

		}, 100)

		var dbresize = _.debounce(function(){

			if(!self.el.window) return
			if (self.fullscreenmode) return
			if (self.inputfocused) return


			var scrollTop = self.actions.getScroll(),
				height = self.el.window.height(),
				width = self.el.window.width();

				self.height = height
				self.width = width

			_.each(self.events.resize, function(s){
				s({
					scrollTop : scrollTop,
					height : height,
					width : width
				})
			})

			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);

		}, 100)

		var t = false

		window.addEventListener('touchstart', function(e){
			t = true
		})

		window.addEventListener('touchend', function(e){
			t = false
		})

		window.addEventListener('touchcancel', function(e){
			t = false
		})

		window.addEventListener('scroll', function(){
			scrolling()
			dbscrolling()
		})

        window.addEventListener('resize', function(){
			dbresize()
		})
	}

	self.events = {
		scroll : {},
		resize : {},
		delayedscroll : {}
	}

	self.loadModules = function(p){

		lazyEach({
			array : p.modules,
			action : function(p){

				self.nav.p.open({
					nohistory : true,
					load : true,
					uri : p.item,
					success : p.success,
					psname : true
				})

			},
			each : {
				after : p.after
			},
			all : {
				success : function(){

					p.success(p.modules);
				}
			}
		})

	}

	self.name = self.options.name;

	self.reltime = function(time){

		var value = time || new Date()

		if ((moment().diff(value, 'days')) === 0) {

			if((moment().diff(value, 'hours') < 12 )) 
				return moment(moment.utc(value).toDate()).local().fromNow();

			return new Date(value).toLocaleTimeString([], {hour: '2-digit', minute: "2-digit", hour12: false})
		} 

		if (moment().year() === moment(value).year()) 
			return moment(value).local().format('D MMMM')

		return moment(value).local().format('D MMMM YYYY')
	}

	self.realtime = function(){

		if (realtimeInterval) 
			clearInterval(realtimeInterval)

		realtimeInterval = setInterval(function(){

			var realtimeelements = $('.realtime');

			if(realtimeelements.length > 30 || isMobile()) return

			realtimeelements.each(function(){
				var el = $(this);

				var time = el.attr('time');
				var utc =  el.attr('utc');
				var _ctime = el.html();

				var ctime = null;

				if (utc && utc == 'true'){
					ctime = self.platform.convertUTCSSrel(time)
				}
				else{
					ctime = self.reltime(new Date(time))
				}

				if(_ctime != ctime){
					el.html(ctime)
				}

				

				el = null

			})

			realtimeelements = null
		}, isMobile() ? 90000 : 30000)

	}

	self.storage = {

		getStorageLocation: function() {

			if (!device || !device.platform || !cordova || !cordova.file)
				return undefined;

			return (window.cordova.file.externalDataDirectory) ? window.cordova.file.externalDataDirectory : window.cordova.file.dataDirectory;
			
		},
	
		getStorageDirectory: function() {
			return 'internal';
		},
	
		saveFile: function(url, blob) {

			if(!window.resolveLocalFileSystemURL){
				return Promise.resolve()
			}

			return new Promise((resolve, reject) => {
				var storageLocation = self.storage.getStorageLocation();
				// var blob = new Blob([file], { type: "image/png" });
				var name = $.md5(url);

				window.resolveLocalFileSystemURL(storageLocation, function (fileSystem) {
					fileSystem.getDirectory(self.storage.getStorageDirectory(), {
						create: true,
						exclusive: false
					},
					function (directory) {
						directory.getFile(name, { create: true, exclusive: false }, function (entry) {
							var myFileUrl = entry.toURL();
							entry.createWriter(function (writer) {
								writer.onwriteend = function () {
									return resolve(myFileUrl);
								};
								writer.seek(0);
								writer.write(blob);
							}, function (error) {
								return reject(error);
							});
						}, function (error) {
							return reject(error);
						});
					}, function (error) {
						return reject(error);
					});
				}, function (evt) {
					return reject(evt);
				});
			});
		},
	
		loadFile: function(url) {
			
			if(!window.resolveLocalFileSystemURL){
				return Promise.reject()
			}

			return new Promise((resolve, reject) => {
				var storageLocation = self.storage.getStorageLocation();
				var name = $.md5(url);
				window.resolveLocalFileSystemURL(storageLocation, function (fileSystem) {
					fileSystem.getDirectory(self.storage.getStorageDirectory(), {
						create: true,
						exclusive: false
					},
					function (directory) {
						directory.getFile(name, { create: false }, function (entry) {

							entry.file(function(file) {

								var reader = new FileReader();

								reader.onloadend = function() {
						
									var blob = new Blob([new Uint8Array(this.result)], { type: file.type || "file" });

									return resolve(blob);
								};
						
								reader.readAsArrayBuffer(file);

								

							}, function(error) {
								return reject(error);
							});


						}, function (error) {
							return reject(error);
						});
					}, function (error) {
						return reject(error);
					});
				}, function (evt) {
					return reject(evt);
				});
			});
		},
	
		// Delete the file if it is older than the time passed as parameter
		deleteFileIfTooOld: function(fileEntry, time) {
			return new Promise((resolve, reject) => {
				if (fileEntry.isFile) {
					fileEntry.file((file) => {
						// If file is older than the date passed as parameter
						if (file.lastModifiedDate <= time.getTime()) {
							// Delete the file
							fileEntry.remove(function() {
								return resolve();
							}, function(error) {
								return resolve();
							});
						} else
							return resolve();
					}, function(error) {
						return resolve();
					}); 
				} else
					return resolve();
			});
		},
	
		clearStorage: function(time) {
			return new Promise((resolve, reject) => {
				if (!time || !time.getTime)
					return reject('Invalid date object');
				var nbEntries, nbDone = 0;
				var incrementAndCheckNbDone = function() {
					nbDone += 1;
					if (nbDone >= nbEntries)
						resolve();
				}
				var storageLocation = self.storage.getStorageLocation();
				window.resolveLocalFileSystemURL(storageLocation, function (fileSystem) {
					fileSystem.getDirectory(self.storage.getStorageDirectory(), {
						create: true,
						exclusive: false
					},
					function (directory) {
						var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							nbEntries = entries.length;
							// For each file inside the directory
							for (var i = 0; i < nbEntries; i++) {
								self.storage.deleteFileIfTooOld(entries[i], time).then(() => {
									incrementAndCheckNbDone();
								});
							}
						}, function(error) {
							return reject(error);
						});
					}, function (error) {
						return reject(error);
					});
				});
			});
		}
	
	}

	self.mobile = {

		pip : {

			element : null,
			enabled : false,
			loading : false,
			checkIfHere : function(){
				if (window.PictureInPicture && window.PictureInPicture.leavePip){
					window.PictureInPicture.isPip(function(res){

						console.log("IN PIP", res)

						if(res == 'true'){
							window.PictureInPicture.leavePip()
						}
					})
				}
			},
			enable : function(htmlElement) {

				if(self.mobile.pip.loading){
					return Promise.resolve()
				}

				var aspectratio = 1

				if (!window.PictureInPicture || !window.PictureInPicture.enter) return Promise.resolve();

				if (htmlElement){
					aspectratio = htmlElement.height() / htmlElement.width()
				}

				var width = 400, height = width * (aspectratio || 1);

				self.mobile.pip.loading = true

				return new Promise((resolve, reject) => {

					PictureInPicture.enter(width, height, function(d) {

						if (self.mobile.pip.element){
							self.mobile.pip.element.removeClass('pipped')
						}

						self.mobile.pip.element = htmlElement

						if (self.mobile.pip.element)
							self.mobile.pip.element.addClass('pipped')

						self.mobile.pip.loading = false

						// PIP mode started
						resolve(d)
					}, function(error) {

						self.mobile.pip.loading = false

						reject(error)
					});

				})
				
			},

			init : function(){

				if (window.PictureInPicture && window.PictureInPicture.onPipModeChanged){
					window.PictureInPicture.onPipModeChanged(function(res){

						res = (res == 'true')

						if (res){
							if(!self.el.html.hasClass('pipmode')) self.el.html.addClass('pipmode')
						}
						else{

							if (self.el.html.hasClass('pipmode')) self.el.html.removeClass('pipmode')

							if (self.mobile.pip.element){
								self.mobile.pip.element.removeClass('pipped')
								self.mobile.pip.element = null
							}
						}

						self.mobile.pip.enabled = res

						self.platform.matrixchat.changePip()
					})
				}

				self.mobile.pip.checkIfHere()
				
			}
		},

		saveImages : {
			save : function(base64, nms, clbk){
				var nm = nms.split('.')

				var name = nm[0],
					format = nm[1]

				var mt = {
					png : 'image/png',
					jpg : 'image/jpeg'
				}

				var ms = mt[format] || 'image/' + format

				if (window.cordova){

					var image = b64toBlob(base64.split(',')[1], 'image/' + ms);	

					p_saveAsWithCordova(image, name + '.' + format, function(d, e){
						if (clbk)
							clbk(d, e)
					})

				}

				else{
					p_saveAs({
						file : base64,
						format : format,
						name : name
					})

					if (clbk)
						clbk({name})
				}
			},
			dialog : function(name, src){
				

				var items = [
					{
						text : app.localization.e('saveimage'),
						class : 'itemmain',
						action : function(clbk){

							globalpreloader(true, true)

							srcToData(src, function(base64){

								imagetojpegifneed({base64, name}).then(({base64, name})=> {

									self.mobile.saveImages.save(base64, name, function(d, err){

										globalpreloader(false)
	
										if (d){
											successCheck()
										}
										else{
											sitemessage( self.localization.e('e13230')  )
										}

										clbk()
	
										
									})

								})

								

							})
						}
					}
				]

				menuDialog({
					items : items
				})
				
			},
			init : function(_el){

				if(self.mobileview){
					_el.swipe({
						longTap : function(){


							self.mobile.vibration.small()

							var name = this.attr('save')
							var src = this.attr('src') || this.attr('i')


							setTimeout(function(){
								self.mobile.saveImages.dialog(name, src)
							}, 200)

							return false
							
						}
					})
				}

				
			}
		},
		vibration : {
            small : function(android){

				if(!window.cordova) return

                if(isios()){

                    if(typeof TapticEngine != 'undefined')
                        TapticEngine.impact({
                            style: "medium"
                        });

                    return
                }

                if (navigator.vibrate && android){
                    navigator.vibrate(50)
                }
            }
        },
		statusbar : {
			background : function(){

				var colors = {
					white : "#FFF",
					black : "#030F1B",
					gray : '#1e1d1a'
				}

				if (window.StatusBar) {
					self.platform.sdk.theme.current == 'white' ? window.StatusBar.styleDefault() : window.StatusBar.styleLightContent()
					window.StatusBar.backgroundColorByHexString(colors[self.platform.sdk.theme.current] || "#FFF");
				}

				if (window.NavigationBar)
					window.NavigationBar.backgroundColorByHexString(colors[self.platform.sdk.theme.current] || "#FFF", self.platform.sdk.theme.current != 'white');
			},

			gallerybackground : function(){


				if (window.StatusBar) {
					window.StatusBar.styleLightContent()
					window.StatusBar.backgroundColorByHexString("#030F1B");
				}

				if (window.NavigationBar)
					window.NavigationBar.backgroundColorByHexString("#030F1B", true);
					
			},

			hide : function(){
				if (window.StatusBar) {
					window.StatusBar.hide()
					window.StatusBar.overlaysWebView(true);
				}

				if (window.NavigationBar){
					window.NavigationBar.hide()
				}
			},
			show : function(){
				if (window.StatusBar) {
					window.StatusBar.show()
					window.StatusBar.overlaysWebView(false);
				}

				if (window.NavigationBar){
					window.NavigationBar.show()
				}

				self.mobile.statusbar.background()
			},	
		},

		unsleep : function(t){

			if (window.plugins && window.plugins.insomnia){

				if(t) window.plugins.insomnia.keepAwake()
				else window.plugins.insomnia.allowSleepAgain()
			}
				
		},

		backgroundMode : function(t){

			if (window.cordova){
				if (window.cordova.plugins && window.cordova.plugins.backgroundMode){

					if(t) {
						cordova.plugins.backgroundMode.enable()
					}
					else {
						cordova.plugins.backgroundMode.disable()
					}
				}
			}
			
				
		},


		fullscreenmode : function(v){
			v ? self.mobile.screen.unlock() : self.mobile.screen.lock()
			v ? self.mobile.statusbar.hide() : self.mobile.statusbar.show()

			self.mobile.unsleep(v)
			
			//v ? self.el.html.addClass('fullscreen') : self.el.html.removeClass('fullscreen')


			if(!v){
				setTimeout(function(){
					self.fullscreenmode = v
					self.actions.scroll(self.lastScrollTop)
				}, 10)
			}
			else{
				self.fullscreenmode = v

				
			}
		},

		reload : {
			parallax : null,
			reloading : false,
			destroyparallax : function(){

				if (self.mobile.reload.parallax) {
					self.mobile.reload.parallax.destroy()
					self.mobile.reload.parallax = null
				}

			},
			initparallax : function(){

				if(isTablet() || isMobile()){

					self.mobile.reload.destroyparallax()

					self.mobile.reload.parallax = new SwipeParallaxNew({

						el : self.el.content,

						allowPageScroll : 'vertical',
						preventDefaultEvents : false,
		
						directions : {
							down : {
								cancellable : true,						

								positionclbk : function(px){
									var percent = easeOutQuint(Math.abs(px) / 200);

									if (px >= 5){

										if(!self.el.topsmallpreloader.hasClass('show'))
											self.el.topsmallpreloader.addClass('show')

								
										self.el.topsmallpreloader.css('transform', 'translateY('+(100 * percent)+'%)')
									}
									else{

										self.el.topsmallpreloader.removeClass('show')
										self.el.topsmallpreloader.css('transform', '')
									}

								},

								constraints : function(e){

									if(self.platform.preparingUser) return false

									if(_.find(e.path, function(el){

                                        return el.className && (el.className.indexOf('noswipepnt') > -1 || el.className.indexOf('fullScreenVideo') > -1)

                                    })) return false

									if(self.lastScrollTop <= 0 && !self.mobile.reload.reloading){
										return true;
									}


								},

								restrict : true,
								//distance : 150,
								trueshold : 70,
								clbk : function(){

									self.mobile.reload.reloading = true
									self.el.topsmallpreloader.css('transform', '')
									self.el.topsmallpreloader.removeClass('show')

									globalpreloader(true)

									setTimeout(function(){
		
										self.user.isState(function(state){
											if(state){
												self.platform.sdk.node.transactions.get.allBalanceUpdate(function(){
													self.platform.sdk.notifications.getNotifications()
												})
											}
											
										})

										if (self.nav.current.module)
											self.nav.current.module.restart()

										setTimeout(function(){
											globalpreloader(false)
											
											self.mobile.reload.reloading = false
										}, 200)

										
									}, 100)

									
								}
		
							}
						}
						
		
					}).init()

				}
			}
		},

		screen : {

			lock : function(){
				if (window.cordova && baseorientation)
					window.screen.orientation.lock(baseorientation)
			},
			unlock : function(){
				if (window.cordova)
					window.screen.orientation.unlock()
			},

			destroy : function(){
				if (window.cordova)
					window.screen.orientation.removeEventListener('change')
				self.mobile.screen.clbks = {}
			},

			init : function(){
				self.mobile.screen.clbks = {}

				

				if (window.cordova)
					window.screen.orientation.addEventListener('change', function(){

						_.each(self.mobile.screen.clbks, function(c){
							c(screen.orientation.type)
						})

					});
			},

			clbks : {}
		},

		update : {
			needmanage : false,
			hasupdate : false,

			playstore : false, 

			downloadAndInstall : function(){

				if(!self.mobile.update.hasupdate){
					return Promise.reject({text : 'hasnotupdates'})
				}

				if(!self.mobile.update.needmanage){
					return Promise.reject({text : 'cantmanageupdate'})
				}

				self.mobile.update.updating = true

				return self.mobile.update.download(self.mobile.update.hasupdate).then(r => {

					return window.ApkUpdater.install()

				}).then( r => {
					self.mobile.update.updating = false

					return Promise.resolve()
				}).catch(e => {

					self.mobile.update.updating = false

					return Promise.reject(e)
				})

			},
		
			download : function(l){

				return window.ApkUpdater.download(l, {
					onDownloadProgress: function(e){
						topPreloader2(e.progress, self.localization.e('downloadingUpdate'))
					}
				}).then(r => {
					topPreloader2(100)

					return Promise.resolve()
				}).catch(e => {
					topPreloader2(100)

					return Promise.reject(e)
				})
				

			},
			hasupdatecheck : function(){

				if(!self.platform) return Promise.resolve()

				var os = self.platform.__applications().ui.android

				return new Promise((resolve, reject) => {

					$.get(os.github.url, {}, function(d){

						if(!d.prerelease && numfromreleasestring(d.name) > numfromreleasestring(window.packageversion)) {
							var assets = deep(d, 'assets') || [];
	
							var l = _.find(assets, function(a){
								return a.name == os.github.name
							})

							if(l){
								self.mobile.update.hasupdate = l.browser_download_url
							}
						}
	
					})

				})
	
				
	
			},
			needmanagecheck : function(){

				if(window.plugins && window.plugins.packagemanager && window.ApkUpdater){

					return new Promise((resolve, reject) => {

						window.plugins.packagemanager.getInstallerPackageName(function(d){

							self.mobile.update.needmanage = d && d.indexOf('com.android.vending') > -1 ? false : true
							self.mobile.update.needmanageinfo = d

							resolve(self.mobile.update.needmanage)

						}, function(e){

							self.mobile.update.needmanage = false
							self.mobile.update.needmanageinfo = e

							resolve(self.mobile.update.needmanage)
						});

					})

				}
				else{

					return Promise.resolve(self.mobile.update.needmanage)
				}
				
			}

		},

		inputs : {
		
			init : function(){
				$(document).on('focus blur', 'select, textarea, input, [contenteditable="true"]', function(e){

					if(e.type == 'focusin'){
						self.inputfocused = true
					}

					if(e.type == 'focusout'){
						self.inputfocused = false
					}
					
					console.log("E", e)
				});
			}
		}
	}

	self.thislink = function(_url){

		var url = {}

		try{
			url = new URL(_url)
		}
		catch(e){
			url.host = ''
		}

		var groups = {
			p : ['pocketnet.app', 'bastyon.com'],
			pt : ['test.pocketnet.app', 'test.bastyon.com']
		}

		if (_url.indexOf('bastyon://') > -1) return true
		if (_url.indexOf('pocketnet://') > -1) return true

		var domain = self.options.url

		var m = _.find(groups, function(g){
			return _.indexOf(g, url.host) > -1 &&  _.indexOf(g, domain) > -1
		})

		if(m) return true

	}

	self.setref = function(r, na){

		if(na && self.ref) return

		self.ref = r;
		localStorage['ref'] = self.ref

	}

	self.ref = null;
	
	try{
		self.ref = parameters().ref || localStorage['ref'];
	}catch(e){}
	

	self.options.device = localStorage['device'] || makeid();

	localStorage['device'] = self.options.device

	if(typeof window != 'undefined'){ self.fref = deep(window, 'location.href') }

	return self;
}

topPreloader(85);

if(typeof module != "undefined")
{
	module.exports = Application;
}


