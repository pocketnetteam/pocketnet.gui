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

	MessageStorage = require('./js/vendor/rtc/db.js')
	RTCMultiConnection = require('./js/vendor/rtc/RTCMultiConnection.js')

	io = require('./js/vendor/rtc/socket.io.js')

	MediumEditor = require('medium-editor').MediumEditor
	/*pickadate = require('pickadate/lib/picker.js');
	require('pickadate/lib/picker.date.js');*/


	jQueryBridget = require('jquery-bridget');
	jQueryBridget( 'isotope', Isotope, $ );
	jQueryBridget( 'textcomplete', jquerytextcomplete, $ );
	//jQueryBridget( 'mark', Mark, $ );


	Mark = require('./js/vendor/jquery.mark.js');

	emojionearea = require('./js/vendor/emojionearea.js')
	

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

	console.log('window.spellCheckHandler' ,window.spellCheckHandler)

	// Create the builder with the configured spellhandler
	var contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);

		delete contextMenuBuilder.stringTable.searchGoogle

	// Add context menu listener
	var contextMenuListener = new ContextMenuListener((info) => {

		console.log('info', info, contextMenuBuilder)

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

	self.options = {

		nav : {
			navPrefix : '/',
		},

		name : 'PCRB',
		fullName : "pocketnet",
		localStoragePrefix : 'pocketnet',

		//apiproxy : 'https://localhost:8888',
		apiproxy : p.apiproxy || 'https://pocketnet.app:8888',
		server : p.server || 'https://pocketnet.app/Shop/AJAXMain.aspx',
		imageServer : p.imageServer || 'https://api.imgur.com/3/',
		imageStorage : 'https://api.imgur.com/3/images/',

		//ws : p.ws || "wss://localhost:8088",
		ws : p.ws || "wss://pocketnet.app:8088",

		rtc : p.rtc || 'https://pocketnet.app:9001/',

		rtcws : p.rtcws || 'wss://pocketnet.app:9090',
		rtchttp : p.rtchttp || 'https://pocketnet.app:9091',

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091',*/
		

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

			
		}
		
	};

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

		self.platform = new Platform(self);

		self.options.platform = self.platform

		self.platform.sdk.users.addressByName(self.ref, function(r){
			if(r){
				self.ref = r;
				localStorage['ref'] = self.ref
			}

		})

	}

	self.module = function(id){

		var checkedId = deep(self, 'map.' + id + ".id");

		var module = null;

		if (checkedId)

			module = deep(self, 'modules.' + checkedId + ".module") || null;

		return module;
	}

	self.initTest = function(mnemokey, clbk){
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

	self.init = function(p){

		if (typeof localStorage == 'undefined')
			localStorage = {};

		if(!p) p = {};
		
		p.nav || 		(p.nav = {})
		p.nav.clbk || 	(p.nav.clbk = self.initClbk || null)

		prepareMap();

		newObjects(p);

		if(!_Node)
		{
			checkJSErrors();
		}

		var fprintClbk = function(){

			self.localization.init(function(){

				self.user.isState(function(state){

					self.platform.prepare(function(){

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

				//console.log(components, r)

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

			p.nav.reload = true;

		if(p.href) p.nav.href = p.href;
		if(p.current) p.nav.href = self.nav.get.href()

		self.destroyModules();
		
		self.user.isState(function(s){

			p.nav.clbk = p.clbk;

			//self.platform.clear()
			//self.platform.prepareUser(function(){

				if(typeof p.nav.href == 'function') p.nav.href = p.nav.href()

				self.nav.init(p.nav);

			//}, s)
			
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

					return true;
				}
			})

			if (clbk)
				clbk()
		})
	}

	self.reloadLight = function(clbk){

		self.user.isState(function(state){	

			/*self.platform.clear()
			self.platform.prepareUser(function(){*/

				self.reloadModules(function(){
					if (clbk)
						clbk();
				})
			//}, state)
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
			if (module.module.inited && module.module.destroy) 
				module.module.destroy();
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

			/*$.ajax({
				type : "GET",
				url : 'https://ip-api.com/json/',
				success : function(data){
					console.log('ip', data)
				}
			})*/

		}

		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position){

				console.log('position', position)

				//примагнититься к близкому большому городу

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

	self.actions = {
		up : _scrollTop,

		wscroll : function(){

			$(window).scrollTop(winScrollTop);
			
		},

		offScroll : function(js){

			if(self.scrollRemoved){
				return false
			}

			self.scrollRemoved = true

			if(!js){

				$('html').addClass('nooverflow')

				
			}
			else
			{
				var winScrollTop = $(window).scrollTop();

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


	if(!_Node)
		self.ref = localStorage['ref'] || parameters().ref;




	return self;
}

if(typeof module != "undefined")
{
	module.exports = Application;
}


topPreloader(85);