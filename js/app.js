if(typeof require != 'undefined' && typeof __map == 'undefined')
{
	var __map = require("./_map.js");
}

if(typeof _Electron != 'undefined' && _Electron){

	imagesLoaded = require('imagesloaded');

	jdenticon = require('jdenticon')
	emojione = require('emojione')

	var Isotope = require('isotope-layout'); require('isotope-packery')

	var jquerytextcomplete = require('jquery-textcomplete')

	animateNumber = require('./js/vendor/jquery.animate-number.js')
	touchSwipe = require('./js/vendor/jquery.touchSwipe.js')
	

	MessageStorage = require('./js/vendor/rtc/db.js')
	RTCMultiConnection = require('./js/vendor/rtc/RTCMultiConnection.js')

	io = require('./js/vendor/rtc/socket.io.js')

	MediumEditor = require('medium-editor').MediumEditor
	/*pickadate = require('pickadate/lib/picker.js');
	require('pickadate/lib/picker.date.js');*/


	jQueryBridget = require('jquery-bridget');
	jQueryBridget( 'isotope', Isotope, $ );
	jQueryBridget( 'textcomplete', jquerytextcomplete, $ );


	Mark = require('./js/vendor/jquery.mark.js');

	emojionearea = require('./js/vendor/emojionearea.js')
	filterXss = require('./js/vendor/xss.min.js')

	const electronSpellchecker = require('electron-spellchecker');

	// Retrieve required properties
	const SpellCheckHandler = electronSpellchecker.SpellCheckHandler;
	const ContextMenuListener = electronSpellchecker.ContextMenuListener;
	const ContextMenuBuilder = electronSpellchecker.ContextMenuBuilder;

	// Configure the spellcheckhandler
	window.spellCheckHandler = new SpellCheckHandler();
	window.spellCheckHandler.attachToInput();

	// Start off as "US English, America"
	window.spellCheckHandler.switchLanguage('en-US');

	// Create the builder with the configured spellhandler
	var contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);

	// Add context menu listener
	var contextMenuListener = new ContextMenuListener((info) => {
		contextMenuBuilder.showPopupMenu(info);
    });


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

	self.options = {
		

		nav : {
			navPrefix : '/pocketnet/',
		},

		name : 'PCRB',
		fullName : "pocketnet",
		localStoragePrefix : 'pocketnet',

		//////////////

		//apiproxy : p.apiproxy || 'https://pocketnet.app:8888',
		apimproxy : p.apimproxy || 'https://pocketnet.app:8888',
		
		server : p.server || 'https://pocketnet.app/Shop/AJAXMain.aspx',

		//////////////
		
		firebase : p.firebase || 'https://pocketnet.app:8888',

		//////////////

		imageServer : p.imageServer || 'https://api.imgur.com/3/',
		imageStorage : 'https://api.imgur.com/3/images/',

		//////////////
		//ws : p.ws || "wss://pocketnet.app:8088",
		rtc : p.rtc || 'https://pocketnet.app:9001/',

		//////////////

		rtcws : p.rtcws || 'wss://pocketnet.app:9090',
		rtchttp : p.rtchttp || 'https://pocketnet.app:9091',

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091',*/
		
		listofnodes : p.listofnodes || null,
		listofproxies : p.listofproxies || null,
		fingerPrint : null,

		unathorizated : function(ignoreDialog){

			self.user.isState(function(state){


				if(state){

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

			if(error && !self.errors.state[error]){

				self.errors.state[error] = true;

				_.each(self.errors.clbks, function(c){
					c(self.errors.state)
				})

			}


			return error;
	
		}
		
	};


	self.errors = {
		clear : function(){
			this.state = {};

			self.platform.loadingWithErrors = false

			self.errors.autocheck(false)

		},
		state : {},
		clbks : {

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

					if (self.platform.focus)
						self.errors.check()

				}, 5000))

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

				self.platform.sdk.node.get.time(function(t, error){
						
				})

			if (self.errors.state.proxymain){

				self.platform.sdk.proxy.info(function(t, error){
						
				}, true)

			}
		},

		connection : function(){
			return this.state.node || this.state.proxy || this.state.offline
		},

		connectionRs : function(){
			return (this.state.node || this.state.proxy || this.state.offline) && !self.platform.loadingWithErrors
		}
	}

	self.el = {
		content : 		$('#content'),
		app : 			$('#application'),
		header : 		$('#headerWrapper'),
		menu : 			$('#menuWrapper'),
		toppanel : 		$('#panelWrapper'),
		navigation : 	$('#navigationWrapper'),
		footer : 		$('#footerWrapper'),
		chats : 		$('.chats')
	};

	self.id = makeid();
	self.map = __map;
	self.modules = {};

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
			childrens : ['userpage', 'share', 'author', 'post']
		}

	}

	self.options.backmap = self.backMap

	var prepareMap = function(){

		_.each(self.map, function(m, id){
			m.id = id;
		})

	}

	if(typeof window != 'undefined')

		self.options.address = window.location.protocol + "//" + window.location.host; 

	var checkJSErrors = function(){
		if(typeof window != "undefined")
		{
			var errormessages = function(e){

				if(!e.error || window.design) return;

				/*
				

					Логирование ошибок
				

				 */
			}

			window.removeEventListener('error', errormessages);
			window.addEventListener('error', errormessages);
		}		
	}

	var newObjects = function(p){

		self.localization = new Localization(self);
		
		self.settings = new settingsLocalstorage(self);
		self.nav = new Nav(self);	
		
		self.ajax = new AJAX(self.options);	
		self.user = new User(self);	
		self.ajax.set.user(self.user);

		self.platform = new Platform(self, self.options.listofnodes);

		self.options.platform = self.platform

		self.platform.sdk.users.addressByName(self.ref, function(r){
			if(r){
				self.ref = r;
				localStorage['ref'] = self.ref
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

	self.init = function(p){

		if (typeof localStorage == 'undefined')
			localStorage = {};

		if(!p) p = {};
		
		p.nav || 		(p.nav = {})
		p.nav.clbk || 	(p.nav.clbk = self.initClbk || null)

		prepareMap();

		newObjects(p);

		self.realtime();

		if(!_Node)
		{
			checkJSErrors();
		}

		var fprintClbk = function(){

			self.localization.init(function(){

				self.user.isState(function(state){

					self.platform.prepare(function(){


						if(state && self.platform.sdk.address.pnet()){

							var addr = self.platform.sdk.address.pnet().address

							var regs = self.platform.sdk.registrations.storage[addr];

							if (regs && regs >= 5){
								
								self.platform.ui.showmykey()
								
							}

							

						}


						self.platform.m.log('enter', state)
						
						self.nav.init(p.nav);

						if (p.clbk) 
							p.clbk();

					}, state)
					
				})

				

			})

		}

		if(typeof Fingerprint2 != 'undefined'){

			new Fingerprint2.get({

				excludes: {
					userAgent: true, 
					language: true,
					enumerateDevices : true,
					screenResolution : true,
					pixelRatio : true,
					fontsFlash : true,
					doNotTrack : true,
					timezoneOffset : true,
					timezone : true,
					webdriver : true,
					hardwareConcurrency : true,
					hasLiedLanguages : true,
					hasLiedResolution : true,
					hasLiedOs : true,
					hasLiedBrowser : true
				}

			},function(components, r){

				var values = components.map(function (component) { return component.value })
    			var murmur = Fingerprint2.x64hash128(values.join(''), 31)

				self.options.fingerPrint = hexEncode('fakefingerprint');
				
				fprintClbk()
			});
		}

		else
		{
			self.options.fingerPrint = hexEncode('fingerPrint')

			fprintClbk()
		}

		
		
	}


	self.reload = function(p){
		if(!p) p = {};

			p.nav || (p.nav = {})


		if(typeof p.nav.reload == 'undefined')
			p.nav.reload = true;

		if(p.href) p.nav.href = p.href;
		if(p.current) p.nav.href = self.nav.get.href()

		self.destroyModules();

		//self.stopModules()
		
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

				if (m && m.module.inited && m.module.restart && mobj.reload) {

					m.module.restart();
				}


				if (m && mobj.now) {

					m.module.restart();

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

		self.user.isState(function(state){	

			self.reloadModules(function(){
				if (clbk)
					clbk();
			})
		})

	}

	self.deviceReadyInit = function(p){

		if(typeof window.cordova != 'undefined')
		{
			document.addEventListener('deviceready', function(){
				window.screen.orientation.lock('portrait')

				p || (p = {});

				p.clbk = function(){
					navigator.splashscreen.hide();
				}

				self.init(p)

			}, false);
		}
		else
		{
			self.init(p);
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

			console.log("STOPMODULE", module.module)

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

	self.logger = function(Function, Message){
		/*self.ajax.run({
			data : {
				Action : "LOG",
				Function : Function,
				Message : Message
			}
		})*/
	}

	self.geolocation = function(){

		var byIp = function(){

			$.getJSON("https://ip-api.com/json/?callback=?", function(data) {
	           console.log(data)
	        });

		}

		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position){

			}, function(error){

			},{
				enableHighAccuracy: true,
			 	maximumAge: 60000
			});

		}

		else
		{
			
		}
	}

	self.scrollRemoved = false;

	var winScrollTop = 0;

	self.actions = {
		up : _scrollTop,

		wscroll : function(){

			$(window).scrollTop(winScrollTop);
			
		},

		offScroll : function(js){


			if (self.scrollRemoved){
				return false
			}

			self.scrollRemoved = true

			if(!js){

				$('html').addClass('nooverflow')
			}
			else
			{
				winScrollTop = $(window).scrollTop();

				$(window).bind('scroll', self.actions.wscroll);
			}

			return true
			
		},

		onScroll : function(){

			$('html').removeClass('nooverflow')
			$(window).unbind('scroll', self.actions.wscroll);


			self.scrollRemoved = false;
		},

		scrollBMenu : function(){

			if(isMobile()){
				var h = $('#toppanel').height()


				if (h > 0){
					$(window).scrollTop(h);

					return true
				}
			}

		}
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

	self.renewModules = function(map){
	
	}

	self.name = self.options.name;

	self.reltime = function(time){
		var tt = convertDateRel(time)

		if (tt[0]) {
			tt[0] = self.localization.e(tt[0], tt[2])
			tt[2] = ''
		}

		tt = _.filter(tt, function(t){
			return t;
		})

		return tt.join(' ')
	}

	self.realtime = function(){

		if (realtimeInterval) 
			clearInterval(realtimeInterval)

		if(typeof window != 'undefined' && typeof $ != 'undefined'){

		}

		realtimeInterval = setInterval(function(){

			var realtimeelements = $('.realtime');


			realtimeelements.each(function(){
				var el = $(this);

				var time = el.attr('time');
				var utc =  el.attr('utc');


				var ctime = null;

				if (utc && utc == 'true'){
					ctime = self.platform.convertUTCSSrel(time)
				}
				else{
					ctime = self.reltime(new Date(time))
				}

				el.html(ctime)

			})
		}, 30000)

	}


	if(!_Node){

		self.ref = localStorage['ref'] || parameters().ref;

		self.options.device = localStorage['device'] || makeid();

		localStorage['device'] = self.options.device

		if(typeof window != 'undefined'){

			self.fref = deep(window, 'location.href')

		}

	}

	return self;
}

if(typeof module != "undefined")
{
	module.exports = Application;
}


topPreloader(85);