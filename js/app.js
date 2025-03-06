/*
if(typeof require != 'undefined' && typeof __map == 'undefined')
{
	var __map = require("./_map.js");
}*/


if (typeof _OpenApi == 'undefined') _OpenApi = false;

if (typeof _Electron != 'undefined' && _Electron) {

	imagesLoaded = require('./js/vendor/imagesloaded.pkgd.js');

	emojione = require('emojione')

	var Isotope = require('isotope-layout'); require('isotope-packery');

	var jquerytextcomplete = require('jquery-textcomplete')

	animateNumber = require('./js/vendor/jquery.animate-number.js')
	touchSwipe = require('./js/vendor/jquery.touchSwipe.js')

	ImageUploader = require('./js/image-uploader.js');

	VideoUploader = require('./js/video-uploader.js');

	jQueryBridget = require('jquery-bridget');
	jQueryBridget('isotope', Isotope, $);
	jQueryBridget('textcomplete', jquerytextcomplete, $);

	Mark = require('./js/vendor/jquery.mark.js');

	EmojioneArea = require('./js/vendor/emojionearea.js')
	filterXss = require('./js/vendor/xss.min.js')

	Broadcaster = require('./js/broadcaster.js');

	swBroadcaster = new Broadcaster('ServiceWorker');

	swBroadcaster.handle('AltTransportActive', async (url) => {
		function isWhitelisted(url) {
			const { hostname } = new URL(url);

			const whitelistHosts = [
				/.*\.?youtube\.com/,
				/.*\.?vimeocdn\.com/,
				/.*\.?vimeo\.com/,
				/.*\.?bitchute\.com/,
				/photos\.brighteon\.com/,
			];

			for (let i = 0; i < whitelistHosts.length; i++) {
				if (whitelistHosts[i].test(hostname)) {
					return true;
				}
			}

			return false;
		}

		if (isWhitelisted(url)) {
			return false;
		}

		const wait = (seconds, returnValue) => new Promise(r => (
			setTimeout(() => r(returnValue), seconds * 1000)
		));

		const proxy = self.app.api.get.current();

		if (!proxy.direct) {
			return false;
		}

		const proxyInfo = await proxy.get.info();

		if (proxyInfo.info?.tor?.enabled === 'always') {
			return true;
		}

		const transportCheck = electron.ipcRenderer.invoke('AltTransportActive', url);

		return await Promise.race([transportCheck, wait(1, false)]);
	});

}

if (typeof _Node == 'undefined') _Node = false;

/////////////////////////////////////////////
///

chrsz = 8;

if (window)
	window.HELP_IMPROVE_VIDEOJS = false;

Application = function (p) {

	if (!p) p = {}

	var self = this;
	var realtimeInterval = null;
	var baseorientation = typeof getbaseorientation != undefined ? getbaseorientation() : 'portrait'
	var electron = null

	self.developapps = p.developapps

	if (typeof _Electron != 'undefined' && _Electron) {
		electron = require('electron');
	}

	if (p.monetization && typeof window.Monetization != 'undefined'){
		self.monetization = new window.Monetization(self, p.monetization)
	}
	
	//self._meta = window.projects_meta
	self.meta = window.project_config || {}
	
	/*self._meta.Pocketnet

	if (window.pocketnetproject && self._meta[window.pocketnetproject]) {
		self.meta = self._meta[window.pocketnetproject]
	}*/

	var url = window.pocketnetdomain

	if ((typeof _Electron != 'undefined' && _Electron) || window.cordova) { } else {
		url = window.location.hostname + window.pocketnetpublicpath.substring(0, window.pocketnetpublicpath.length - 1)
	}

	if (window.testpocketnet) {
		self.test = true
	}

	self.television = typeof istelevision == 'undefined' ? false : istelevision()
	self.boost = !(window.cordova && isios());
	self.pkoindisable = self.television || (window.cordova && isios());
	self.paidsubscriptiondisable = window.cordova && isios();
	self.cutversion = window.cordova && isios();

	self.electronview = typeof _Electron != 'undefined' && _Electron

	self.margintop = 0
	
	self.caneditdelaypost = false


	if (self.test) {
		self.publishapps = true
	}

	if (self.test) {
		self.delaypost = true
	}

	try{
		if(localStorage['testdelaypost']){
			self.delaypost = true
		}
		
	}catch(e){

	}

	self.options = {

		url: url,

		matrix: p.matrix,
		matrixMirrors : p.matrixMirrors,

		nav: {
			navPrefix: window.pocketnetpublicpath || '/pocketnet',
		},

		name: 'PCRB',
		fullName: self.meta.protocol,
		localStoragePrefix: self.meta.protocol,


		server: p.server || 'https://pocketnet.app/Shop/AJAXMain.aspx', //donations will be removed

		//////////////

		firebase: p.firebase || 'https://' + url + ':8888', /// will be removed

		//////////////

		peertubeServer: '',
		peertubeCreds: {
			username: 'test_bastyon',
			password: 'test_bastyon'
		},


		//////////////

		imageServer: p.imageServer || 'https://api.imgur.com/3/',
		imageStorage: 'https://api.imgur.com/3/images/',

		//imageServerup1 : p.imageServerup1 || 'https://'+url+':8092/up', // will be part of proxy
		imageServerup1: p.imageServerup1 || 'https://pocketnet.app:8092/up',
		rtc: p.rtc || 'https://' + url + ':9001/',
		rtcws: p.rtcws || 'wss://pocketnet.app:9090',
		rtchttp: p.rtchttp || 'https://pocketnet.app:9091',

		listofnodes: p.listofnodes || null,
		listofproxies: p.listofproxies || null,
		translateApiProxy : p.translateApiProxy,

		unathorizated: function (ignoreDialog) {

			self.user.isState(function (state) {

				if (state) {

					self.user.signout();

					self.reload({
						href: 'authorization'
					});

					if (!ignoreDialog)
						dialog({
							html: self.localization.e('id189_1'),
							class: 'accepting one',
							btn1text: "Okay",
							btn2text: self.localization.e('dcancel'),
						})



				}

			})


		},

		/////////

		successHandler: function (p) {

			var ca = {}
			var change = false;

			if (p.rpc) {
				ca.proxy = true;
				ca.node = true;
				ca.offline = true;
			}

			if (p.api) {
				ca.proxy = true;
				ca.offline = true;
			}

			if (p.apim) {
				ca.proxymain = true;
				ca.offline = true;
			}

			if (p.online) {
				ca.offline = true
			}

			ca.offline = true;

			_.each(ca, function (t, i) {

				if (self.errors.state[i]) {
					delete self.errors.state[i]

					change = true
				}

			})

			if (change) {
				_.each(self.errors.clbks, function (c) {
					c(self.errors.state)
				})
			}

		},


		///////////

		errorHandler: function (error, p) {

			if (!error) {

				if (p.rpc || p.api)

					error = 'proxy'

				if (p.apim)
					error = 'proxymain'

			}

			else {
				if (error == 'fail') error = ''
				//error = 'node'
			}


			if ((error == 'proxy' || error == 'proxymain') && self.platform && !self.platform.online) {
				error = 'offline'
			}

			self.app.api.changeProxyIfNeed()

			if (error && !self.errors.state[error]) {

				self.errors.state[error] = true;

				_.each(self.errors.clbks, function (c) {
					c(self.errors.state)
				})

			}


			return error;

		}

	};

	var isonline = function () {

		if (window.cordova) {
			if (navigator.connection.type === 'none') return false
		}

		if (typeof window.navigator && window.navigator.onLine === false) {
			return window.navigator.onLine
		}

		return true
	}

	var istouchstylecalculate = function () {
		let isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;

		var mobileview = (isIpad || self.el.html.hasClass('mobile') || self.el.html.hasClass('ipad') || self.el.html.hasClass('tablet') || window.cordova || self.width < 768)


		if ((typeof _Electron != 'undefined' && _Electron)) {
			mobileview = false
		}

		if (self.television){
			mobileview = false
		}

		return mobileview
	}

	var istouchstyle = function () {
		
		self.mobileview = istouchstylecalculate()
		

		var id = window.rifticker.add(() => {

			if (self.mobileview) {
				self.el.html.addClass('mobileview').removeClass('wsview')
			}
			else {
				self.el.html.removeClass('mobileview').addClass('wsview')
			}

		})

	}

	var checkTouchStyle = function () {
		var mobileview = istouchstylecalculate()

		if (self.mobileview != mobileview) {
			istouchstyle()

			self.platform.matrixchat.changeMobile()
			self.platform.matrixchat.initevents()

			_.each(self.modules, function (m) {

				if (m.module.map.viewchangereload) {
					m.module.restart()
				}

			})

			_.each(self.nav.wnds, (w) => {
				var wnd = deep(w, 'module.container')

				if (wnd) {
					if (self.mobileview)
						wnd.unhidenormalized()
				}
			})
		}
	}

	self.secure = function () {
		return location.protocol != 'http:'
	}

	self.canuseip = function () {
		return false

		
		if ((!self.secure() || (typeof _Electron != 'undefined' && _Electron))) {
			return true
		}
	}

	self.savesupported = function () {
		var isElectron = (typeof _Electron !== 'undefined' && !!window.electron);
		if(self.television) return false
		return isElectron || (window.cordova);
	}

	self.savesupportedForBrowser = function () {
		return !self.savesupported() && localStorage;
	}

	self.useip = function () {
		return self.canuseip() && self.platform.sdk.usersettings.meta.canuseip.value
	}

	self.isonline = isonline

	///////////////
	self.errors = {
		clear: function () {
			this.state = {};

			self.platform.loadingWithErrors = false

			self.errors.autocheck(false)

		},
		state: {},
		clbks: {

			_modules: function (change) {


				if (!self.errors.connection() && !self.platform.loadingWithErrors) {

					_.each(self.modules, function (m) {

						_.each(m.module.iclbks, function (c) {

							c(change)

						})

					})

				}

			},

			check: function () {
				if (self.errors.connection()) {
					self.errors.autocheck(true)
				}

				else {
					self.errors.autocheck(false)
				}
			}

		},

		_autocheck: null,

		autocheck: function (enable) {
			if (enable) {

				if (!self.platform || !this.connection()) return

				self.errors._autocheck || (self.errors._autocheck = setInterval(function () {

					if (self.platform.focus && isonline()) {
						self.errors.check()
					}

				}, 10000))

			}
			else {

				if (self.errors._autocheck) {

					clearInterval(self.errors._autocheck)
					self.errors._autocheck = null;

				}

			}
		},

		check: function (clbk) {
			if (self.errors.state.node || self.errors.state.proxy)
				self.platform.sdk.node.get.time(function (t, error) { })

			if (self.errors.state.proxymain) {
				self.platform.sdk.proxy.info(function (t, error) { }, true)
			}
		},

		connection: function () {
			return this.state.node || this.state.proxy || this.state.offline
		},

		connectionRs: function () {
			return (this.state.node || this.state.proxy || this.state.offline) && !self.platform.loadingWithErrors
		}
	}

	self.apiHandlers = {
		success: function (p) {

			var ca = {}
			var change = false;

			if (p.rpc) {
				ca.proxy = true;
				ca.node = true;
			}

			if (p.api) {
				ca.proxy = true;
			}

			ca.offline = true;


			_.each(ca, function (t, i) {

				if (self.errors.state[i]) {
					delete self.errors.state[i]

					change = true
				}

			})

			if (change) {
				_.each(self.errors.clbks, function (c) {
					c(self.errors.state)
				})
			}

		},

		///////////

		error: function (p) {
			var error = null

			if (p.rpc) {
				error = 'node'
			}

			if (p.api) {
				error = 'proxy'
			}

			if ((error == 'proxy') && (self.platform && !self.platform.online)) {
				error = 'offline'
			}


			if (error && !self.errors.state[error]) {

				self.errors.state[error] = true;

				_.each(self.errors.clbks, function (c) {
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

	self.isElectron = function () {
		return typeof _Electron != 'undefined' && _Electron
	}

	self.curation = function () {

		//if(window.cordova && typeof isios != 'undefined' && isios()) return true
		return false
	}

	self.letters = {
		common: function ({ email, info, address }, clbk, data = {}) {

			var template = data.template || 'general'

			var json = "{}"
			try {
				json = JSON.stringify(data)
			} catch (e) {
				console.error(e)
			}

			var _p = {
				info,
				email,
				address,
				json,
				template,
				lang: localization.key
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2002'

			var body = ''

			body += '<p><a href="https://' + self.options.url + '/authorn?address=' + address + '">User (' + address + ')</a> contact support (' + template + ')</p>'

			if (address) {
				body += '<p>Address: ' + (address) + '</p>'
			}

			if (info) {
				body += '<p>Info: ' + (info) + '</p>'
			}

			if (json) {
				body += '<p>JSON: ' + (json) + '</p>'
			}

			body += '<p>Email: ' + email + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {
					if (clbk)
						clbk(true);
				},

				error: function () {
					if (clbk)
						clbk(true);
				}
			});


		},
		videoblogger: function ({
			link1 = '',
			link2 = '',
			link3 = '',
			info = '',
			email = '',
			address = ''
		}, clbk) {

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

			body += '<p><a href="https://' + self.options.url + '/authorn?address=' + address + '">User (' + address + ') require PKOIN</a></p>'

			if (link1)
				body += '<p>Link: <a href="' + link1 + '">' + link1 + '</a></p>'

			if (link2)
				body += '<p>Link: <a href="' + link2 + '">' + link2 + '</a></p>'

			if (link3)
				body += '<p>Link: <a href="' + link2 + '">' + link2 + '</a></p>'

			body += '<p>Info: ' + info + '</p>'
			body += '<p>Email: ' + email + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {

					if (clbk)
						clbk(true);

				},

				error: function () {

					if (clbk)
						clbk(true);
				}
			});

		}
	}

	self.complainletters = {

		post: function ({
			i1,
			s3,
			s2
		}, clbk) {
			if (!s3 || !s2 || !i1) {
				clbk(false)
				return
			}

			var _p = {
				s3,
				i1,
				s2
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2002'

			var body = ''
			body += '<p><a elementsid="https://' + self.options.url + '/authorn?address=' + s3 + '" href="https://' + self.options.url + '/authorn?address=' + s3 + '">User(' + s3 + ')</a> complaint post <a elementsid="https://' + self.options.url + '/post?s=' + s2 + '" href="https://' + self.options.url + '/post?s=' + s2 + '">Post (' + s2 + ')</a></p>'
			body += '<p>Reason: ' + i1 + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {


					if (clbk)
						clbk(true);

				},

				error: function () {

					if (clbk)
						clbk(true);
				}
			});
		},
		user: function ({
			address1,
			address2,
			email,
			reason
		}, clbk) {

			if (!address1 || !address2 || !reason) {
				clbk(false)

				return
			}

			var _p = {
				address1: address1,
				address2: address2,
				email: email || ''
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
			body += '<p><a href="https://' + self.options.url + '/authorn?address=' + address1 + '">User(' + address1 + ')</a> complaint another <a href="https://' + self.options.url + '/authorn?address=' + address2 + '">user(' + address2 + ')</a></p>'
			body += '<p>Reason: ' + reason + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {


					if (clbk)
						clbk(true);

				},

				error: function () {

					if (clbk)
						clbk(true);
				}
			});

		},
		common: function ({ address1, reason, email }, clbk) {
			if (!address1 || !reason) {
				clbk(false)

				return
			}

			var _p = {
				address1: address1,
				email: email
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
			body += '<p>Common complaint</p>'

			body += '<p>Reason: ' + reason + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {

					if (clbk)
						clbk(true);

				},

				error: function () {

					if (clbk)
						clbk(true);
				}
			});
		},
		room: function ({ address1, roomid, reason }, clbk) {
			if (!address1 || !roomid || !reason) {
				clbk(false)

				return
			}

			var _p = {
				address1: address1,
				roomid: roomid
			}

			_p.Action || (_p.Action = 'ADDTOMAILLIST');
			_p.TemplateID = '2000'

			var body = ''
			body += '<p><a elementsid="https://' + self.options.url + '/authorn?address=' + address1 + '" href="https://' + self.options.url + '/authorn?address=' + address1 + '">User(' + address1 + ')</a> complaint room (' + roomid + ')</a></p>'

			body += '<p>Reason: ' + reason + '</p>'

			_p.body = encodeURIComponent(body)

			$.ajax({
				type: 'POST',
				url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
				data: _p,
				dataType: 'json',
				success: function () {

					if (clbk)
						clbk(true);

				},

				error: function () {

					if (clbk)
						clbk(true);
				}
			});
		}

	}

	self.relations = {};

	self.backmap = {


		index: {
			href: 'index',
			childrens: ['author', 'authorn', 'chat', 's', 'share', 'userpage', 'post', 'application', 'home'],
		},

		s: {
			href: 's',
			childrens: ['author', 'authorn', 'chat', 's', 'share', 'userpage', 'post', 'application', 'home']
		},

		author: {
			href: 'author',
			childrens: ['author', 'authorn', 's', 'chat', 'share', 'userpage', 'post', 'post', 'application', 'home']
		},

		authorn: {
			href: 'authorn',
			childrens: ['author', 'authorn', 's', 'chat', 'share', 'userpage', 'post', 'post', 'application', 'home']
		},

		userpage: {
			href: 'userpage',
			childrens: ['userpage', 'share', 'authorn', 'author', 'post', 'authorization', 'registration', 'pkview', 'application', 'home']
		},

		home : {
			href : 'home',
			childrens : ['application']
		}


	}

	self.options.backmap = self.backMap

	var prepareMap = function () {

		_.each(self.map, function (m, id) {
			m.id = id;
		})

	}

	if (typeof window != 'undefined')
		self.options.address = window.location.protocol + "//" + window.location.host;

	var acceleration = function () {

		self.api.wait.ready('use', 1000).then(r => {

			var canuse = self.api.ready.use()

			if (canuse) {

				self.api.getPeertubeserversList()

				var stateAdresses = []
				var infoAdresses = []
				var share = ''

				var hrefParameters = parameters()

				try {
					var ua = localStorage['useraddress'] || ''

					stateAdresses.push(ua)
					infoAdresses.push(ua)
				} catch (e) { }

				infoAdresses.push(hrefParameters.address || '')

				share = hrefParameters.v || hrefParameters.s || hrefParameters.p || hrefParameters.i || ''


				stateAdresses = _.filter(stateAdresses, (s) => s)
				infoAdresses = _.filter(infoAdresses, (s) => s)

				if (share) {
					self.psdk.share.load([share]).then(() => {
					}).catch(e => {
						console.error(e)
					})
				}

				if (stateAdresses.length) {

					self.psdk.userState.load(stateAdresses).then(() => {
					}).catch(e => {
						console.error(e)
					})

				}

				if (infoAdresses.length) {

					self.psdk.userInfo.load(infoAdresses, true).then(() => {
					}).catch(e => {
						console.error(e)
					})

				}

			}
		})
	}


	self.preapi = function () {

		if (self.preapied) return

		self.api = new Api(self)
		self.api.initIf(() => {
			acceleration()
			
		}).then(() => {

		})

		self.localization = new Localization(self);
		self.localization.init()

		self.Actions = new Actions(self, self.api)
		self.psdk = new pSDK({ app: self, api: self.api, actions: self.Actions })

		/*var rt = performance.now()

		self.psdk.preInitIndexedDb().then(() => {
			console.log("DBINITED",  performance.now() - rt)
		})*/

		self.Actions.psdk = self.psdk





		self.preapied = true



	}

	var newObjects = function (p) {

		self.settings = new settingsLocalstorage(self);
		self.nav = new Nav(self);

		self.ajax = new AJAX(self.options);
		self.user = new User(self);
		self.ajax.set.user(self.user);

		self.platform = new Platform(self, self.options.listofnodes);

		self.imageUploader = new ImageUploader(self);

		self.options.platform = self.platform

		self.mobile.keyboard.style()

		self.gifResizer = new resizeGif(self)

		if (self.ref)
			self.platform.sdk.users.addressByName(self.ref, function (r) {
				if (r) {
					self.setref(r)
					/*self.ref = r;
					localStorage['ref'] = self.ref*/
				}

			})

		self.nav.dynamic = function (p, clbk) {

			self.platform.sdk.users.addressByName((p.href), function (r) {

				if (r) {
					if (clbk)
						clbk(null, {

							id: 'authorn',
							extra: {
								address: r
							}

						})
				}
				else {
					if (clbk) clbk('notfound')
				}

			})

		}

	}

	self.module = function (id) {

		var checkedId = deep(self, 'map.' + id + ".id");

		var module = null;

		if (checkedId)

			module = deep(self, 'modules.' + checkedId + ".module") || null;

		return module;
	}

	self.initTest = function (mnemokey, clbk,) {
		if (typeof localStorage == 'undefined') localStorage = {};

		prepareMap();

		newObjects();

		self.platform.nodeid = 0;

		self.user.setKeysPair(self.user.keysFromMnemo(mnemokey));

		self.user.isState(function (state) {

			self.localization.init(function () {

				self.platform.prepare(function () {
					if (clbk)
						clbk(state)
				})

			})


		})
	}

	self.initTestFromPrivate = function (_private, clbk,) {
		if (typeof localStorage == 'undefined') localStorage = {};

		prepareMap();

		newObjects();

		self.platform.nodeid = 0;

		self.user.setKeysPairFromPrivate(_private);

		self.user.isState(function (state) {

			self.localization.init(function () {

				self.platform.prepare(function () {
					if (clbk)
						clbk(state)
				})

			})


		})
	}

	self.showuikeysfirstloading = function () {

		self.user.isState(function (state) {

			if (state) {

				self.user.usePeertube = self.platform.sdk.usersettings.meta.enablePeertube ? self.platform.sdk.usersettings.meta.enablePeertube.value : false; ////TODO_REF


				if (self.platform.sdk.registrations.showprivate()) {
					self.platform.ui.showmykey({
						showsavelabel: true
					})
				}
			}

		})
	}

	self.initvideodb = function () {



		if (typeof VideoTransport != 'undefined') {

			self.videotransport = new VideoTransport(self, electron ? electron.ipcRenderer : null)
			self.videotransport.init()
		}

	}


	self.init = function (p) {

		self.boost = !(window.cordova && isios());

		if (navigator.webdriver && !self.test && !parameters().webdrivertest) return

		if (typeof localStorage == 'undefined')
			localStorage = {};

		if (!p) p = {};

		p.nav || (p.nav = {})
		p.nav.clbk || (p.nav.clbk = self.initClbk || null)

		prepareMap();

		self.options.fingerPrint = hexEncode('fakefingerprint');

		self.initvideodb()

		self.localization.init(function () {

			newObjects(p);

			lazyActions([
				self.platform.prepare
			], function () {

				retry(function () {
					return typeof linkify != 'undefined'
				}, function () {
					if (typeof linkify != 'undefined') {
						linkify.registerCustomProtocol('pocketnet')
						linkify.registerCustomProtocol('bastyon')
					}
				}, 20000)


				/*self.platform.ui.support('balance', {
					error : 'uniq',
					additionalData : {}
				})*/

				self.realtime();

				// TODO (brangr): DEBUG!
				//p.nav.href = "userpage?id=system16"
				if (!_OpenApi)
					self.nav.init(p.nav, function () {

						if (typeof hideSplashScreen != 'undefined') {
							hideSplashScreen();
						}
						else {
							$('#splashScreen').remove()
						}
					});

				if (p.clbk)
					p.clbk();

				if (!_OpenApi)
					self.showuikeysfirstloading()
				else {
					$('#splashScreen').remove()
				}



				self.mobile.update.needmanagecheck().then(r => {
					if (r) {
						self.mobile.update.hasupdatecheck()
					}

				})

				

				/*setInterval(() => {
					self.apps.emit('test', {
						success : true
					})
				}, 2000)*/

			})

		})

		self.mobile.inputs.init()
		self.mobile.reload.initparallax()

		/**
		 * Launch Shadow Popups located in popups/index.js
		 * all conditions of appearing contains each popup
		 * i.e. self-checking for android and self-checking
		 * for desktop popup before we had created popup
		 * conditional checking in appear method of instance
		 */
		
	}

	self.initApplications = function(){

		if (self.apps) {
			self.apps.destroy()
		}

		self.apps = new BastyonApps(self)
		self.apps.init()


		self.platform.actions.clbk('change', 'apps', () => {
			var account = self.platform.actions.getCurrentAccount()

			if (account) {
				var balance = account.actualBalance([account.address])

				self.apps.emit('balance', balance)
			}
		})

		self.platform.actions.on('actionFiltered', ({ action, address, status }) => {

			if (action.settings && action.settings.application) {
				self.apps.emit('action', action.export(), action.settings.application)
			}

		})

		self.platform.actionListeners['apps'] = function({type, alias, status}){

			if (type == 'userInfo'){

				var account = self.platform.actions.getCurrentAccount()

				if (account && alias.address == account.address) {
					self.apps.emit('accountStatus', account.getStatus())
				}
				
			}
			
		}

	}

	self.reload = function (p) {
		if (!p) p = {};

		p.nav || (p.nav = {})


		if (typeof p.nav.reload == 'undefined')
			p.nav.reload = true;

		if (p.href) p.nav.href = p.href;
		if (p.history) p.nav.history = p.history;
		if (p.current) p.nav.href = self.nav.get.href()

		if (typeof _Electron != 'undefined' && _Electron) {
			p.nav.href = 'index'
		}

		self.destroyModules();

		self.user.isState(function (s) {

			p.nav.clbk = p.clbk;

			if (typeof p.nav.href == 'function') p.nav.href = p.nav.href()

			self.nav.init(p.nav);

		})
	}

	self.reloadModules = function (clbk) {
		self.destroyModules();

		self.user.isState(function () {

			var mp = _.filter(self.map, function (mobj, i) {

				var m = self.modules[i]

				if (m && m.module.inited && m.module.authclbk) {
					m.module.authclbk()
				}

				if (m && m.module.inited && m.module.restart && (mobj.reload && !mobj.now)) {
					m.module.restart();
				}

				if (m && mobj.now) {
					//m.module.restart();

					return true;
				}
			})

			self.nav.api.ini(function () {
				if (clbk)
					clbk()
			}, mp)


		})
	}

	self.reloadLight = function (clbk) {

		self.reloadModules(function () {
			if (clbk)
				clbk();
		})

	}

	self.chatposition = function (ab) {
		return
		var attr = ab ? 'above' : 'under'

		self.el.html.attr('chatposition', attr)
	}

	self.deviceReadyInit = function (p) {

		self.el = {
			camera: $('#camera'),
			content: $('#content'),
			miniapps: $('#miniappscnt'),
			app: $('#application'),
			header: $('#headerWrapper'),
			menu: $('#menuWrapper'),
			toppanel: $('#panelWrapper'),
			navigation: $('#navigationWrapper'),
			footer: $('#footerWrapper'),
			chats: $('.chats'),
			html: $('html'),
			window: $(window),
			windows: $('#windowsContainer'),
			electronnav: $('#electronnavContainer'),
			preloader: $('#globalpreloader'),
			topsmallpreloader: $('#topsmallpreloader'),
		};



		if (self.test) {
			$('html').addClass('testpocketnet') /// bstn
		}

		if (self.television){
			self.el.html.addClass('television')
		}

		initevents()

		moment.locale(self.localization.key)

		if (typeof window.cordova != 'undefined') {
			document.addEventListener('deviceready', function () {

				self.el.html.addClass('cordova')

				

				if (self.curation()) {
					self.el.html.addClass('curation')
				}

				if (window.cordova && !isMobile()) {
					self.el.html.addClass('tablet')
				}


				if (isTablet() && !isMobile()) baseorientation = null

				self.mobile.screen.lock()
				if (navigator.splashscreen) navigator.splashscreen.hide();

				p || (p = {});

				p.clbk = function () {

					self.appready = true

					if (!window.pocketnetstore && !isios()) {
						setTimeout(() => {
							self.mobile.update.hasupdatecheck()
								.then((updateInfo) => {
									if (!updateInfo) {
										return;
									}

									const skippedUpdate = JSON.parse(localStorage.updateNotifier || '{}');

									if ('version' in skippedUpdate) {
										const skippedVersion = numfromreleasestring(skippedUpdate.version);
										const showAfterTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
										const nextNotifyReached = (skippedUpdate.notified + showAfterTime > Date.now());
										const updateVersion = numfromreleasestring(updateInfo.version);

										if (skippedVersion >= updateVersion || nextNotifyReached) {
											return;
										}

										delete localStorage.updateNotifier;
									}

									app.nav.api.load({
										open: true,
										id: 'updatenotifier',
										essenseData: { updateInfo },
										inWnd: true,
										clbk: (e, p) => { },
									});
								})
								.catch((err) => console.error(err))
						}, 10000);
					}
				}

				self.mobile.statusbar.initial()
				self.mobile.pip.init()
				self.mobile.keyboard.init()
				self.mobile.memory()
				self.mobile.webviewchecker()
				self.mobile.safearea()


				if (window.Keyboard && window.Keyboard.disableScroll) {
					window.Keyboard.disableScroll(false)
				}

				if (cordova.plugins && cordova.plugins.backgroundMode)
					cordova.plugins.backgroundMode.on('activate', function () {
						cordova.plugins.backgroundMode.disableWebViewOptimizations();
					});

				self.init(p)

			}, false);
		}
		else {

			self.mobile.keyboard.init()
			self.mobile.safearea()
			self.init(p);

			setTimeout(function () {
				self.appready = true
			}, 2000)
		}


	}

	self.destroyModules = function () {
		_.each(self.modules, function (module) {
			if (module.module.inited) {

				if (!!module.module.closeContainer()) {
					if (module.module.destroy)
						module.module.destroy();
				}

			}

		})
	}

	self.stopModules = function () {
		_.each(self.modules, function (module) {

			if (module.module.inited) {
				module.module.stop();
			}

		})
	}

	self.destroy = function () {

		self.destroyModules();

		self.modules = {};
		self.ajax = null;

		self.nav = null;
	}

	self.renewModules = function (map) { }
	self.logger = function (Function, Message) { }

	self.Logger = new FrontendLogger(
		navigator.userAgent,
		JSON.stringify(navigator.userAgentData),
		location.href,
		//'timezone/undefined',
		Intl.DateTimeFormat().resolvedOptions().timeZone,
		self
	);

	self.scrollRemoved = 0;
	self.scrollTop = 0
	self.lastScrollTop = 0

	self.height = 0
	self.width = 0

	self.fullscreenmode = false
	self.pseudofullscreenmode = false
	self.playingvideo = null
	self.playingvideocollisions = {}
	self.pipwindow = null

	var blockScroll = false
	var scrollmodechanging = false
	var optimizeTimeout = null
	var scrollrif = null

	self.actions = {
		closepip: function () {
			if (self.pipwindow) {
				self.pipwindow.container.close()
				self.pipwindow = null
			}
		},
		pipwindow: function (p) {

			if (self.pipwindow) {
				self.pipwindow.container.close()
				self.pipwindow = null
			}

			if (!p) {
				return
			}

			var clbk = p.clbk

			p.open = true
			p.pip = true
			p.inWnd = true
			p.history = false
			p.open = true
			p.independent = true
			p.eid = p.mid = makeid()

			if (p.essenseData) {
				p.essenseData.eid = p.eid
			}

			p.clbk = function (c, b) {
				self.pipwindow = b

				if (clbk) clbk(c, b)
			}

			p.onclose = function () {
				self.pipwindow = null
			}


			self.nav.api.load(p)

		},

		emoji: function (text) {

			//if(self.mobileview) return text

			return joypixels.toImage(text)
		},

		restore: function () {

			return

			if (optimizeTimeout) clearTimeout(optimizeTimeout)

			optimizeTimeout = null

			/*self.el.content.css('width', '')
			self.el.content.css('height', '')
			self.el.content.css('contain', '')*/
			/*self.el.footer.css('display', '')
			self.el.content.css('display', '')*/
		},

		optimize: function () {


			return

			if (optimizeTimeout) clearTimeout(optimizeTimeout)

			optimizeTimeout = setTimeout(function () {
				/*self.el.content.css('width', self.width)
				self.el.content.css('height', self.height)
				self.el.content.css('contain', 'strict')*/
				/*self.el.content.css('display', 'none')
				self.el.footer.css('display', 'none')*/
			}, 300)


		},

		

		playingvideo: function (v, from) {

			if(from && from.player_id){
				if(self.playingvideocollisions[from.player_id]){
					delete self.playingvideocollisions[from.player_id]
					return
				}
			}

			if (self.playingvideo && self.playingvideo.playing) {

				try {
					self.playingvideo.pause()

					if (self.playingvideo.player_id){
						var i = self.playingvideo.player_id

						self.playingvideocollisions[i] = true

						setTimeout(() => {
							delete self.playingvideocollisions[i]
						}, 20)
					}

					
				}
				catch (e) {
				}

			}


			self.playingvideo = v

			if (self.playingvideo) {

				setTimeout(function () {

					var scrollTop = self.actions.getScroll()

					if (self.playingvideo && self.playingvideo.playing) {

						if (scrollTop >= 65) {
							window.requestAnimationFrame(() => {
								self.el.html.addClass('scrollmodedown')
							})

						}

					}

				}, 1000)
			}

			setTimeout(function () {

				var duration = deep(self.playingvideo, 'embed.details.duration') || 0
				var unsleep = self.playingvideo && self.playingvideo.playing && (!duration || duration > 60)

				self.mobile.unsleep(unsleep)
				self.mobile.backgroundMode(unsleep && self.platform.sdk.videos.volume && !self.mobile.pip.element ? 'mediaPlayback' : false)

			}, 1000)


		},

		up: function (scrollTop, el, time) {
			_scrollTop(scrollTop, el, time)
		},

		wscroll: function () {
			self.actions.scroll(self.scrollTop)
		},

		scrollToTop: function () {
			self.actions.scroll(0)
		},

		backupscroll: function () {
			self.actions.scroll(self.lastScrollTop)
		},

		scroll: function (to) {

			if (scrollrif){
				cancelAnimationFrame(scrollrif)
			}
			
			
			scrollrif = window.requestAnimationFrame(() => {
				blockScroll = true
				scrollrif = null

				self.el.window.scrollTop(to)

				self.scrollTop = to

				setTimeout(function () {
					blockScroll = false
				}, 100)
			})



		},

		getScroll: function () {

			var s = window.pageYOffset || document.documentElement.scrollTop;

			if (!self.fullscreenmode) {
				self.lastScrollTop = s
			}

			return s
		},

		offScroll: function (target) {

			if (self.scrollRemoved < 0) self.scrollRemoved = 0

			self.scrollRemoved++

			if (self.scrollRemoved > 1) {
				return false
			}

			scrollmodechanging = true

			window.requestAnimationFrame(() => {
				if (self.scrollRemoved) {
					self.el.html.css('overflow', 'hidden')
				}
			})


			/*if (self.mobileview && window.bodyScrollLock && target){
	  
			  window.bodyScrollLock.disableBodyScroll(target[0])
			  self.scrolltarget = target
			}*/

			//self.el.html.addClass('nooverflow')

			if (window.Keyboard && window.Keyboard.disableScroll && !isios()) {
				window.Keyboard.disableScroll(true)
			}

			setTimeout(function () {
				scrollmodechanging = false
			}, 100)

			return true

		},

		onScroll: function (target) {

			if (self.scrollRemoved < 1) self.scrollRemoved = 1

			if (self.scrollRemoved) {
				self.scrollRemoved--
			}



			if (!self.scrollRemoved) {

				scrollmodechanging = true

				window.requestAnimationFrame(() => {
					if (!self.scrollRemoved) {
						self.el.html.css('overflow', '')
					}
				})


				/*if (self.mobileview && window.bodyScrollLock && self.scrolltarget){
				  window.bodyScrollLock.enableBodyScroll(self.scrolltarget[0])
				  self.scrolltarget = null
				}*/

				///
				//self.el.html.removeClass('nooverflow')
				///

				if (window.Keyboard && window.Keyboard.disableScroll && !isios()) {
					window.Keyboard.disableScroll(false)
				}

				setTimeout(function () {
					scrollmodechanging = false
				}, 100)
			}

		},

	}

	var initevents = function () {

		self.height = self.el.window.height()
		self.width = self.el.window.width()



			document.documentElement.style.setProperty('--vh', `${self.height * 0.01}px`);
			document.documentElement.style.setProperty('--keyboardheight', `0px`);


		if(!window.cordova || isios()){
			document.documentElement.style.setProperty('--app-margin-bottom-default', `40px`);
		}else{
			document.documentElement.style.setProperty('--app-margin-bottom-default', `0px`);
		}
			

		istouchstyle()

		var showPanel = '1'

		var cr = self.curation()

		var scrolling = _.throttle(function () {

			if (!self.el.window) return
			if (self.fullscreenmode) return
			if (scrollmodechanging) return
			if (self.blockScroll) return

			var lastScrollTop = self.lastScrollTop

			var scrollTop = self.actions.getScroll()

			_.each(self.events.scroll, function (s) {
				s(scrollTop, blockScroll)
			})


			if (!scrollTop) {
				self.mobile.reload.initparallax()
			}
			else {
				self.mobile.reload.destroyparallax()
			}

			if (showPanel == '2' && !self.el.html.hasClass('scrollmodedown')) {
				window.requestAnimationFrame(() => {
					self.el.html.addClass('scrollmodedown')
				})
			}

			if (showPanel == '3' && self.el.html.hasClass('scrollmodedown')) {
				window.requestAnimationFrame(() => {
					self.el.html.removeClass('scrollmodedown')
				})
			}


			if(scrollTop > 120){
				if(!self.el.html.hasClass('scroll65')){
					window.requestAnimationFrame(() => {
						self.el.html.addClass('scroll65')

						if (self.mobile.statusbar.status != 'background'){
							self.mobile.statusbar.background()
						}
					})
				}
			}
			else{
				if(self.el.html.hasClass('scroll65')){
					window.requestAnimationFrame(() => {
						self.el.html.removeClass('scroll65')

						if (self.el.html.hasClass('allcontent') && self.mobile.statusbar.status != 'topfadebackground'){
							self.mobile.statusbar.topfadebackground()
						}

						
					})
				}
			}


			if (self.mobileview && !cr) {

				var cs = (lastScrollTop + 40 < scrollTop || lastScrollTop - 40 < scrollTop)

				var scrollTopH = 900

				if (self.playingvideo) scrollTopH = 65

				if (scrollTop < scrollTopH) {

					showPanel = '1'

					if (self.el.html.hasClass('scrollmodedown')) {
						window.requestAnimationFrame(() => {
							self.el.html.removeClass('scrollmodedown')
						})
					}

					return
				}

				if (scrollTop > scrollTopH && cs) {
					if (lastScrollTop + 40 < scrollTop) {
						showPanel = '2'

						if (!self.el.html.hasClass('scrollmodedown')) {

							window.requestAnimationFrame(() => {
								self.el.html.addClass('scrollmodedown')
							})

							if (self.modules.menu.module) self.modules.menu.module.blursearch()
						}



					}
				}
				else {
					showPanel = '3'
				}

			}

		}, 100)

		var dbscrolling = _.debounce(function () {


			if (!self.el.window) return
			if (self.fullscreenmode) return
			if (scrollmodechanging) return
			if (self.blockScroll) return

			window.requestAnimationFrame(() => {
				_.each(self.events.delayedscroll, function (s) {
					s(self.lastScrollTop, blockScroll)
				})
			})

			if (!t && self.mobileview) {

				if (showPanel == '2' && !self.el.html.hasClass('scrollmodedown')) {
					window.requestAnimationFrame(() => {
						self.el.html.addClass('scrollmodedown')
					})
				}

				if (showPanel == '3' && self.el.html.hasClass('scrollmodedown')) {
					window.requestAnimationFrame(() => {
						self.el.html.removeClass('scrollmodedown')
					})
				}


				showPanel = '1'
			}

		}, 100)

		var dbresize = _.debounce(function () {

			if (!self.el.window) return
			if (self.fullscreenmode) return
			if (self.mobile.inputs.focused) return


			var scrollTop = self.actions.getScroll(),
				height = self.el.window.height(),
				width = self.el.window.width();

			self.height = height
			self.width = width

			let vh = window.innerHeight * 0.01;

			window.requestAnimationFrame(() => {
				document.documentElement.style.setProperty('--vh', `${vh}px`);

				_.each(self.events.resize, function (s) {
					s({
						scrollTop: scrollTop,
						height: height,
						width: width
					})
				})
			})

			setTimeout(() => {
				self.blockScroll = false
			}, 100)
			

			checkTouchStyle()

		}, 100)

		var t = false

		window.addEventListener('touchstart', function (e) {
			t = true
		})

		window.addEventListener('touchend', function (e) {
			t = false
		})

		window.addEventListener('touchcancel', function (e) {
			t = false
		})

		window.addEventListener('scroll', function () {
			scrolling()
			dbscrolling()
		})

		window.addEventListener('resize', function () {
			self.blockScroll = true
			dbresize()
		})
	}

	self.events = {
		scroll: {},
		resize: {},
		delayedscroll: {}
	}

	self.loadModules = function (p) {

		lazyEach({
			array: p.modules,
			action: function (p) {

				self.nav.p.open({
					nohistory: true,
					load: true,
					uri: p.item,
					success: p.success,
					psname: true
				})

			},
			each: {
				after: p.after
			},
			all: {
				success: function () {

					p.success(p.modules);
				}
			}
		})

	}

	self.name = self.options.name;

	self.reltime = function (time) {

		var value = time || new Date()
		var today = moment()

		if ((today.diff(value, 'days')) === 0 && moment(value).day() == today.day()) {

			if ((today.diff(value, 'hours') < 12)) return moment(moment.utc(value).toDate()).local().fromNow();

			return  new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
		}

		var mvalue = moment(value)

		if (today.year() === mvalue.year())
			return mvalue.local().format('D MMMM, HH:mm')

		return mvalue.local().format('D MMMM YYYY')
	}

	self.realtime = function () {

		if (realtimeInterval)
			clearInterval(realtimeInterval)

		realtimeInterval = setInterval(function () {

			var realtimeelements = $('.realtime');

			if (realtimeelements.length > 30 || isMobile()) return

			realtimeelements.each(function () {
				var el = $(this);

				var time = el.attr('time');
				var utc = el.attr('utc');
				var _ctime = el.html();

				var ctime = null;

				if (utc && utc == 'true') {
					ctime = self.platform.convertUTCSSrel(time)
				}
				else {
					ctime = self.reltime(new Date(time))
				}

				if (_ctime != ctime) {
					el.html(ctime)
				}



				el = null

			})

			realtimeelements = null
		}, isMobile() ? 90000 : 30000)

	}

	self.storage = {

		getStorageLocation: function () {

			if (!device || !cordova || !cordova.file)
				return undefined;

			return (window.cordova.file.externalDataDirectory) ? window.cordova.file.externalDataDirectory : window.cordova.file.dataDirectory;

		},

		getStorageDirectory: function () {
			return 'internal';
		},

		saveFile: function (url, blob) {

			if (!window.resolveLocalFileSystemURL) {
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

		loadFile: function (url) {

			if (!window.resolveLocalFileSystemURL) {
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

								entry.file(function (file) {

									var reader = new FileReader();

									reader.onloadend = function () {

										var blob = new Blob([new Uint8Array(this.result)], { type: file.type || "file" });

										return resolve(blob);
									};

									reader.readAsArrayBuffer(file);



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

		// Delete the file if it is older than the time passed as parameter
		deleteFileIfTooOld: function (fileEntry, time) {
			return new Promise((resolve, reject) => {
				if (fileEntry.isFile) {
					fileEntry.file((file) => {
						// If file is older than the date passed as parameter
						if (file.lastModifiedDate <= time.getTime()) {
							// Delete the file
							fileEntry.remove(function () {
								return resolve();
							}, function (error) {
								return resolve();
							});
						} else
							return resolve();
					}, function (error) {
						return resolve();
					});
				} else
					return resolve();
			});
		},

		clearStorage: function (time) {
			return new Promise((resolve, reject) => {
				if (!time || !time.getTime)
					return reject('Invalid date object');
				var nbEntries, nbDone = 0;
				var incrementAndCheckNbDone = function () {
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
							directoryReader.readEntries(function (entries) {
								nbEntries = entries.length;
								// For each file inside the directory
								for (var i = 0; i < nbEntries; i++) {
									self.storage.deleteFileIfTooOld(entries[i], time).then(() => {
										incrementAndCheckNbDone();
									});
								}
							}, function (error) {
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

		removescrollmodedown : function(){
			if (app.el.html.hasClass('scrollmodedown')) {
				window.requestAnimationFrame(() => {
					app.el.html.removeClass('scrollmodedown')
				})
			}
		},

		audiotoggle: function (mode = 'SPEAKER') {

			if (typeof window.AudioToggle != 'undefined') {
				window.AudioToggle.setAudioMode(window.AudioToggle[mode]);
			}

		},

		webviewchecker: function () {

			if (window.plugins && window.plugins.webViewChecker) {
				plugins.webViewChecker.isAndroidWebViewEnabled().then(function (enabled) { console.log('isAndroidWebViewEnabled', enabled); })
					.catch(function (error) { });

				plugins.webViewChecker.getAndroidWebViewPackageInfo().then(function (packageInfo) { console.log('getAndroidWebViewPackageInfo', packageInfo); })
					.catch(function (error) { });
			}

		},

		memory: function () {

			document.addEventListener('memorywarning', function () {
				console.log("MEMORY WARNING")
			});

		},

		menu: function (items) {

			var theme = 'THEME_HOLO_LIGHT'

			if (self.platform.sdk.theme.current != 'white') theme = 'THEME_HOLO_DARK'

			var options = {
				'buttonLabels': items,
				'androidTheme': window.plugins.actionsheet.ANDROID_THEMES[theme],
				'androidEnableCancelButton': true, // default false
				'winphoneEnableCancelButton': true, // default false
				'addCancelButtonWithLabel': self.localization.e('ucancel')
			};

			return new Promise((resolve, reject) => {
				window.plugins.actionsheet.show(options, (i) => {

					i = i - 1

					if (i == items.length) {
						return reject()
					}

					resolve(i)
				});
			})

		},

		supportimagegallery: function () {
			return window.cordova && !isios()
		},

		safearea: function () {
			if (window.cordova && !self.television) {
				document.documentElement.style.setProperty('--app-margin-top-default', `25px`);
				self.margintop = 25
			}
			else {
				document.documentElement.style.setProperty('--app-margin-top-default', `0px`);
			}

		},

		inputs: {

			init: function () {
				$(document).on('focus blur', 'select, textarea, input, [contenteditable="true"]', function (e) {
					if (e.type == 'focusin') {
						self.mobile.inputs.focused = $(e.target)
					}

					if (e.type == 'focusout') {
						self.mobile.inputs.focused = null
					}

				});
			}

		},

		keyboard: {
			height: 0,
			lastheight: 0,
			init: function () {

				if (window.cordova) {

					window.addEventListener('keyboardWillShow', (event) => {

						var h = isios() ? event.keyboardHeight : Math.max(event.keyboardHeight, Math.min(303, window.innerHeight / 2))

						self.mobile.keyboard.height = self.mobile.keyboard.lastheight = h

						document.documentElement.style.setProperty('--keyboardheight', `${h}px`);

						self.apps.emit('keyboard', {
							height : h
						})

					});

					window.addEventListener('keyboardDidShow', (event) => {

					});

					window.addEventListener('keyboardWillHide', () => {
						document.documentElement.style.setProperty('--keyboardheight', `0px`);

						self.mobile.keyboard.height = 0

						self.apps.emit('keyboard', {
							height : self.mobile.keyboard.height
						})
					});
				}
				else {

					if (navigator.virtualKeyboard && isTablet()) {
						navigator.virtualKeyboard.overlaysContent = true;

						navigator.virtualKeyboard.addEventListener('geometrychange', (event) => {
							document.documentElement.style.setProperty('--keyboardheight', `${event.target.boundingRect.height}px`);


							self.apps.emit('keyboard', {
								height : event.target.boundingRect.height
							})
						});
					}

				}



			},

			style: function () {
				if (window.cordova && typeof Keyboard != 'undefined') {
					Keyboard.setKeyboardStyle(self.platform.sdk.theme.current == 'white' ? 'light' : 'dark')
				}

			}
		},

		pip: {

			element: null,
			enabled: false,
			loading: false,
			supported : function(clbk){
				if (window.PictureInPicture && !isios()) {
					window.PictureInPicture.isPipModeSupported(function (res) {

						if (res == 'true') {
							if(clbk) clbk(true)
						}else{
							if(clbk) clbk(false)
						}
					}, (e) => {

					})
				}

				else{
					if(clbk) clbk(false)
				}
			},
			checkIfHere: function () {
				if (window.PictureInPicture && window.PictureInPicture.leavePip) {
					window.PictureInPicture.isPip(function (res) {

						if (res == 'true') {
							window.PictureInPicture.leavePip()
						}
					})
				}
			},
			enable: function (htmlElement) {

				if (self.mobile.pip.loading) {
					return Promise.resolve()
				}

				var aspectratio = 1

				if (!window.PictureInPicture || !window.PictureInPicture.enter) return Promise.resolve();

				if (htmlElement) {
					aspectratio = htmlElement.height() / htmlElement.width()
				}

				var width = 400, height = width * (aspectratio || 1);

				self.mobile.pip.loading = true

				return new Promise((resolve, reject) => {

					PictureInPicture.enter(width, height, function (d) {

						if (self.mobile.pip.element) {
							self.mobile.pip.element.removeClass('pipped')
						}

						self.mobile.pip.element = htmlElement

						if (self.mobile.pip.element)
							self.mobile.pip.element.addClass('pipped')

						self.mobile.pip.loading = false

						// PIP mode started
						resolve(d)
					}, function (error) {

						self.mobile.pip.loading = false

						reject(error)
					});

				})

			},

			init: function () {

				if (window.PictureInPicture && window.PictureInPicture.onPipModeChanged) {
					window.PictureInPicture.onPipModeChanged(function (res) {

						res = (res == 'true')

						if (res) {
							if (!self.el.html.hasClass('pipmode')) self.el.html.addClass('pipmode')
						}
						else {

							if (self.el.html.hasClass('pipmode')) self.el.html.removeClass('pipmode')

							if (self.mobile.pip.element) {
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

		saveImages: {
			save: function (base64, nms, clbk) {
				var nm = nms.split('.')

				var name = nm[0],
					format = nm[1]

				var mt = {
					png: 'image/png',
					jpg: 'image/jpeg'
				}

				var ms = mt[format] || 'image/' + format

				if (window.cordova) {

					var image = b64toBlob(base64.split(',')[1], 'image/' + ms);

					p_saveAsWithCordova(image, name + '.' + format, function (d, e) {

						if (clbk)
							clbk(d, e)
					}, true)

				}

				else {
					p_saveAs({
						file: base64,
						format: format,
						name: name
					})

					if (clbk)
						clbk({ name })
				}
			},
			dialog: function (name, src) {


				var items = [
					{
						text: app.localization.e('saveimage'),
						class: 'itemmain',
						action: function (clbk) {

							globalpreloader(true, true)


							srcToData(src, function (base64) {

								imagetojpegifneed({ base64, name }).then(({ base64, name }) => {

									self.mobile.saveImages.save(base64, name, function (d, err) {

										globalpreloader(false)

										if (d) {
											successCheck()
										}
										else {
											sitemessage(self.localization.e('e13230') + (err && err.code ? (': ' + err.code) : '' ))
										}

										clbk()


									})

								})



							})
						}
					}
				]

				menuDialog({
					items: items
				})

			},
			init: function (_el) {

				if (self.mobileview) {
					_el.swipe({
						longTap: function () {
							self.mobile.vibration.small()

							var name = this.attr('save')
							var src = this.attr('original') || this.attr('src') || this.attr('i')


							setTimeout(function () {
								self.mobile.saveImages.dialog(name, src)
							}, 200)

							return false

						}
					})
				}


			}
		},
		vibration: {
			small: function (android) {

				if (!window.cordova) return

				if (isios()) {

					if (typeof TapticEngine != 'undefined')
						TapticEngine.impact({
							style: "medium"
						});

					return
				}

				if (navigator.vibrate && android) {
					navigator.vibrate(50)
				}
			}
		},
		statusbar: {
			status : 'background',
			initial : function(){
				/*if (window.NavigationBar)
					window.NavigationBar.hide()*/

			
			},
			background: function () {

				var colors = {
					white: "#FFF",
					black: "#121621",
					gray: '#1e1d1a'
				}

				if (window.StatusBar) {
					StatusBar.overlaysWebView(true);
					window.StatusBar.backgroundColorByHexString('#00000000');
					self.platform.sdk.theme.current == 'white' ? window.StatusBar.styleDefault() : window.StatusBar.styleLightContent()
				}

				if (window.NavigationBar){

					var c = self.platform.sdk.theme.current || 'white'

					if(!colors[c]) c = 'white'

					window.NavigationBar.backgroundColorByHexString(colors[c], c == 'white');
				}

				self.mobile.statusbar.status = 'background'
					
			},

			gallerybackground: function () {

				if (window.StatusBar) {

					StatusBar.overlaysWebView(true);
					window.StatusBar.backgroundColorByHexString('#00000000');
					window.StatusBar.styleLightContent()
				}

				if (window.NavigationBar)
					window.NavigationBar.backgroundColorByHexString("#030F1B", true);

				self.mobile.statusbar.status = 'gallerybackground'
				

			},

			topfadebackground: function () {

				if (window.StatusBar) {

					StatusBar.overlaysWebView(true);
					window.StatusBar.backgroundColorByHexString('#00000000');
					window.StatusBar.styleLightContent()
				}

				self.mobile.statusbar.status = 'topfadebackground'
				

			},

			hide: function () {
				if (window.StatusBar) {
					window.StatusBar.hide()
					//window.StatusBar.overlaysWebView(true);
				}

				if (window.NavigationBar) {
					window.NavigationBar.hide()
				}
			},
			show: function () {
				if (window.StatusBar) {
					window.StatusBar.show()
					//window.StatusBar.overlaysWebView(false);
				}

				if (window.NavigationBar) {
					window.NavigationBar.show()
				}

				self.mobile.statusbar.background()
			},
		},

		unsleep: function (t) {

			if (window.plugins && window.plugins.insomnia) {

				if (t) window.plugins.insomnia.keepAwake()
				else window.plugins.insomnia.allowSleepAgain()
			}

		},

		backgroundMode: function (t) {

			if (window.cordova) {
				if (window.cordova.plugins && window.cordova.plugins.backgroundMode) {

					if (t) {

						if(t == 'mediaPlayback') {
							cordova.plugins.backgroundMode.setDefaults({
								foregroundType :    'mediaPlayback',
								title: self.localization.e('foreground_service_mediaPlayback_title'),
								text: self.localization.e('foreground_service_mediaPlayback_text'),
							})
						}

						if(t == 'mediaUploading') {
							cordova.plugins.backgroundMode.setDefaults({
								foregroundType :    'mediaUploading',
								title: self.localization.e('foreground_service_mediaUploading_title'),
								text: self.localization.e('foreground_service_mediaUploading_text'),
							})
						}
							

						cordova.plugins.backgroundMode.enable()
					}
					else {
						cordova.plugins.backgroundMode.disable()
						cordova.plugins.backgroundMode.setDefaults({foregroundType : 'mediaPlayback'})
					}
				}
			}


		},


		//// for video

		fullscreenmode: function (v) {


			if (isios()) {
				
			}
			else {
				window.requestAnimationFrame(() => {

					v ? self.mobile.screen.unlock() : self.mobile.screen.lock()
					v ? self.mobile.statusbar.hide() : self.mobile.statusbar.show()

				})
			}

			self.mobile.unsleep(v)

			if (!v) {
				setTimeout(function () {
					self.fullscreenmode = v
					self.actions.scroll(self.lastScrollTop)
				}, 10)
			}
			else {
				self.fullscreenmode = v
			}

		},

		reload: {
			parallax: null,
			reloading: false,
			destroyparallax: function () {

				if (self.mobile.reload.reloading) return

				if (self.mobile.reload.parallax) {
					self.mobile.reload.parallax.clear()
					self.mobile.reload.parallax.destroy()
					self.mobile.reload.parallax = null
				}

			},

			initdestroyparallaxAuto : function(){
				var scrollTop = self.actions.getScroll()

				if (!scrollTop && _.isEmpty(self.nav.wnds)) {
					self.mobile.reload.initparallax()
				}
				else {
					self.mobile.reload.destroyparallax()
				}
			},

			initparallax: function () {

				if ((isTablet() || isMobile()) && !self.el.html.hasClass('allcontent_application')) {

					if (self.mobile.reload.parallax) return
					if (self.mobile.reload.reloading) return

					self.mobile.reload.parallax = new SwipeParallaxNew({

						el: self.el.content,

						allowPageScroll: 'vertical',
						preventDefaultEvents: false,

						directions: {
							down: {
								cancellable: true,

								positionclbk: function (px) {
									var percent = easeOutQuint(Math.abs(px) / 200);

									if (px >= 5) {

										if (!self.el.topsmallpreloader.hasClass('show'))
											self.el.topsmallpreloader.addClass('show')


										self.el.topsmallpreloader.css('transform', 'translateY(' + (100 * percent) + '%)')
									}
									else {

										self.el.topsmallpreloader.removeClass('show')
										self.el.topsmallpreloader.css('transform', '')
									}

								},

								constraints: function (e) {

									if (self.platform.preparingUser) return false

									if (_.find(e.path, function (el) {

										return el.className && (el.className.indexOf('noswipepnt') > -1 || el.className.indexOf('fullScreenVideo') > -1)

									})) return false

									if (self.lastScrollTop <= 0 && !self.mobile.reload.reloading) {
										return true;
									}

								},

								restrict: true,
								//distance : 150,
								trueshold: 70,
								clbk: function () {



									self.mobile.reload.reloading = true
									self.el.topsmallpreloader.css('transform', '')
									self.el.topsmallpreloader.removeClass('show')

									self.psdk.clearStorageAndObjects()
        							self.psdk.clearIdCacheAll()

									self.platform.sdk.recommendations.init()

									globalpreloader(true)


									lazyActions([
                
										self.platform.sdk.ustate.me,
										self.platform.sdk.user.get,
										self.platform.sdk.usersettings.init
					
									], function () {
										_.each(self.modules, (m) => {
											if(!m.module) return
											_.each(m.module.essenses, (mm) => {
												if(mm.willreload) mm.willreload()
											})
										})
	
										setTimeout(function () {
	
											if (self.platform.loadingWithErrors) {
	
												self.platform.appstate(function () {
	
													setTimeout(function () {
														globalpreloader(false)
	
														self.mobile.reload.reloading = false
	
													}, 200)
	
												})
	
											}
											else {
	
												self.user.isState(function (state) {
	
													if (state) {
	
														var account = self.platform.actions.getCurrentAccount()
	
														if (account) {
															account.updateUnspents()
															account.releaseCheckInAnotherSession()
														}
	
														self.platform.ws.getMissed()
													}
	
												})
	
												if (self.nav.current.module) {
	
													self.nav.current.module.restart({
														essenseData: self.nav.current.essenseData || {},
														primary: true
													})
												}
	
	
												setTimeout(function () {
													globalpreloader(false)
	
													self.mobile.reload.reloading = false
												}, 200)
	
											}
	
	
										}, 100)
									})

									
									


								}

							}
						}


					}).init()

				}
			}
		},

		screen: {

			lock: function (orientation) {
				if (window.cordova && (orientation || baseorientation) && window.screen.orientation.lock)
					window.screen.orientation.lock(orientation || baseorientation)
			},
			unlock: function () {
				if (window.cordova && window.screen.orientation.unlock) {
					window.screen.orientation.unlock()
				}

			},

			destroy: function () {
				if (window.cordova)
					window.screen.orientation.removeEventListener('change')
				self.mobile.screen.clbks = {}
			},

			init: function () {
				self.mobile.screen.clbks = {}


				if (window.cordova) {



					window.screen.orientation.addEventListener('change', function () {

						_.each(self.mobile.screen.clbks, function (c) {
							c(screen.orientation.type)
						})

					});
				}

			},

			clbks: {}
		},

		update: {
			needmanage: false,
			hasupdate: false,

			playstore: window.pocketnetstore || false,  ///// TODO

			downloadAndInstall: function (customPreloader) {

				if (!self.mobile.update.hasupdate) {
					return Promise.reject({ text: 'hasnotupdates' })
				}

				if (!self.mobile.update.needmanage) {
					return Promise.reject({ text: 'cantmanageupdate' })
				}

				self.mobile.update.updating = true

				return self.mobile.update.download(self.mobile.update.hasupdate, customPreloader).then(r => {

					return window.ApkUpdater.install()

				}).then(r => {
					self.mobile.update.updating = false

					return Promise.resolve()
				}).catch(e => {

					self.mobile.update.updating = false

					return Promise.reject(e)
				})

			},

			download: function (l, customPreloader) {
				const preloader = customPreloader || topPreloader2;

				return window.ApkUpdater.download(l, {
					onDownloadProgress: function (e) {
						preloader(e.progress, self.localization.e('downloadingUpdate'))
					}
				}).then(r => {
					preloader(100)

					return Promise.resolve()
				}).catch(e => {
					preloader(100)

					try {
						e = JSON.stringify(e)
					} catch (er) {

					}

					return Promise.reject(e)
				})


			},
			hasupdatecheck: function () {

				if (!self.platform) return Promise.resolve()

				var os = self.platform.__applications().ui.android

				return new Promise((resolve, reject) => {

					$.get(os.github.url, {}, function (d) {

						if (!d.prerelease && numfromreleasestring(d.name) > numfromreleasestring(window.packageversion)) {
							var assets = deep(d, 'assets') || [];

							var l = _.find(assets, function (a) {
								return window.pocketnetgfree ? (a.name == os.github.gfname) : a.name == os.github.name
							})

							if (l) {
								self.mobile.update.hasupdate = l.browser_download_url;
								resolve({
									version: d.tag_name.slice(1),
								});
								return;
							}
						}

						resolve(false);
					})

				})



			},
			needmanagecheck: function () {

				if (window.plugins && window.plugins.packagemanager && window.ApkUpdater) {

					return new Promise((resolve, reject) => {

						window.plugins.packagemanager.getInstallerPackageName(function (d) {

							self.mobile.update.needmanage = d && d.indexOf('com.android.vending') > -1 ? false : true
							self.mobile.update.needmanageinfo = d

							resolve(self.mobile.update.needmanage)

						}, function (e) {

							self.mobile.update.needmanage = false
							self.mobile.update.needmanageinfo = e

							resolve(self.mobile.update.needmanage)
						});

					})

				}
				else {

					return Promise.resolve(self.mobile.update.needmanage)
				}

			}

		},


	}

	self.thislink = thislink

	self.setref = function (r, na) {

		if (na && self.ref) return

		self.ref = r;
		try {
			localStorage['ref'] = self.ref
		} catch (e) { }


	}

	self.dsubref = false
	self.ref = null;

	try {
		
		self.ref = parameters().ref || localStorage['ref'];
		self.dsubref = parameters().dsubref || localStorage['dsubref'];
		localStorage['dsubref'] = self.dsubref
	} catch (e) { 
	}


	
	try {
		
		self.options.device = localStorage['device'] || self.id;
		localStorage['device'] = self.options.device

	} catch (e) { }


	edjsHTML = edjsHTMLCnt(null, self)

	return self;
}

if (typeof module != "undefined") {
	module.exports = Application;
}

