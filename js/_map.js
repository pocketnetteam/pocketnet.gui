__map =  { 

	__vendor : [
		"js/vendor/device.min.js", //
		"js/vendor/modernizr-2.8.3.min.js",//
		"js/vendor/jquery-1.11.3.min.js",//
        "js/vendor/tooltipster.core.js",//
        "js/vendor/tooltipster.bundle.js",//
        /*"js/vendor/jquery-ui.min.js",*/
        "js/vendor/imagesloaded.pkgd.min.js",///
        "js/vendor/timer.js",//
        
		"js/vendor/aesjs.js",//
		"js/vendor/linkify.min.js",
		"js/vendor/linkify-html.min.js",
		
		//new
		"js/lib/pocketnet/btc17.js", //
		"js/lib/pocketnet/htls.js", //
		"js/lib/pocketnet/buffer.js", //
		
		//

        "js/vendor/pbkdf2.js", //
        "js/vendor/sha1.js", //
        "js/vendor/paste.js", //
        "js/vendor/jquery.md5.js",
		"js/vendor/jquery.animate-number.js", //
		"js/vendor/jquery.touchSwipe.js", //
        "js/vendor/joypixels.min.js", //
        "js/vendor/plyr.js", // later
        "js/vendor/reconnectingwebsocket.js", //
        "js/vendor/rtc/db.js", // later
        "js/vendor/xss.min.js", //
		"js/vendor/jquery.mark.js", //?
		"js/vendor/hc-sticky.js", //

		/*"js/vendor/DateTimePicker.min.js",*/
		"js/vendor/moment.min.js", //?
		"js/vendor/jquery.inputmask.bundle.js",
		"js/vendor/axios.js", //
		"js/vendor/isotope.pkgd.js", //
		"js/vendor/circular-progress.js", //
		/*"js/vendor/swiper-bundle.min.js",*/ // very hard
		"js/vendor/workbox-v6.1.5/workbox-sw.js",
		"js/vendor/ion.sound/ion.sound.js",
		"js/vendor/hammer.min.js"
	],

	__sourcesfirst : [
		"js/vendor/underscore-min.js",  
		"js/functionsfirst.js",  
		"js/localization.js",
		//"js/notifications.js",
		"js/lib/client/system16.js",
		"js/lib/client/api.js",
		"js/_map.js",
		"js/app.js",
		"js/main.js"
	],

	__sourceslast : [
		"peertube/video-embed.bundle.js",
	],

	__sources : [
	
		"js/functions.js",     	
		"js/user.js",
		"js/module.js",
		"js/navn.js",
		"js/validation.js",
		"js/kit.js",
		"js/satolist.js",
		"js/messenger2/clientrtc.js",
		"js/peertube.js",
		"js/widgets.js"
	],

	__css : [
		"css/normalize.css",
		"css/tooltipster.core.min.css",
		"css/tooltipster.bundle.min.css",
		"css/main.css",
		"css/stblack.css",
		"css/plyr.css",
		"js/vendor/DateTimePicker.min.css",
		/*"css/swiper-bundle.min.css",*/
		"peertube/video-embed.css",
		"js/vendor/emojionearea.min.css"
	],


	__templates : [
		{ c : 'navigation', n : 'menu' },
		{ c : 'menu', n : 'index' },

		{ c : 'toppanel', n : 'index' },
		{ c : 'navigation', n : 'index' },
		{ c : 'footer', n : 'index' },
		{ c : 'toppanel', n : 'menu' },
		{ c : 'main', n : 'index' },
		{ c : 'panel', n : 'index' },
		{ c : 'leftpanel', n : 'index' },
		{ c : 'panel', n : 'discussiondummy' },
		{ c : 'lastcomments', n : 'index' },
		{ c : 'tagcloud', n : 'index' },
		{ c : 'categories', n : 'index' },
		{ c : 'categories', n : 'categories' },
		{ c : 'lenta', n : 'share' },
		{ c : 'lenta', n : 'shares' },
		{ c : 'lenta', n : 'wholike' },
		{ c : 'lenta', n : 'index' },
		{ c : 'lenta', n : 'sharevideo' },
		{ c : 'lenta', n : 'sharevideolight' },
		{ c : 'share', n : 'url' },
		{ c : 'lenta', n : 'stars' },
		{ c : 'lenta', n : 'groupshares' },
		{ c : 'lenta', n : 'commentspreview' },
		{ c : 'comments', n : 'index' },
		{ c : 'lastcomments', n : 'lastcommentslist'},
		{ c : 'author', n : 'preshell'},
		{ c : 'post', n : 'preshell'}
		/*,
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },
		{ c : '', n : '' },*/
		
	],

    pkview  : {
		uri : "pkview",
		href : "pkview",
		add : function(settings, p){

			if(p.inWnd)

				return {
					insert : 'wnd'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},

		relations : [
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},
			{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
				QRCode = require('./js/vendor/qrcode.min.js')
			}},	

		],
	},      

	about : {
		uri : "about",
		href : "about",
		add : function(settings, p){

			if(p.inWnd)

				return {
					insert : 'wnd'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},

	applications : {
		uri : "applications",
		href : "applications",
		add : function(settings, p){

			if(p.inWnd)

				return {
					insert : 'wnd'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},


	terms : {
		uri : "terms",
		href : "terms",
		add : function(settings, p){

			if(p.inWnd)

				return {
					insert : 'wnd'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},

	
	page404 : {
		uri : "page404",
		href : "page404",
		add : {
			el : 'content'
		},
		anonimus : true,
		relationsSunc : true,
	},

	welcome : {
		uri : "welcome",
		href : "welcome",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		
		anonimus : true
	},

	registration : {
		uri : "registration",
		href : "registration",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,

		relations : [
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},
			{src : 'js/validation.js',			   f : 'js'},		
			{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
				QRCode = require('./js/vendor/qrcode.min.js')
			}},	

		],
	},

	anothersite : {
		uri : "anothersite",
		href : "anothersite",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
		relationsSunc : true,

		relations : [
				
			
		],
	},

	/****/
		token : {
			uri : "token",
			href : "token",
			add : {
				el : 'content'
			},
			anonimus : true,
		},

		filluserfast : {
			uri : "filluserfast",
			href : "filluserfast",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},

			

			anonimus : true,

			relations : [
				{src : 'js/vendor/qrscanner.js',			   f : 'js'},
				{src : 'js/validation.js',			   f : 'js'},		
				{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
					QRCode = require('./js/vendor/qrcode.min.js')
				}},	

			],
			
		},

		filluser : {
			uri : "filluser",
			href : "filluser",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			redirect : {
				auth : 'welcome'
			},
			
			
		},

		usersettings : {
			uri : "usersettings",
			href : "usersettings",
			add : {
				el : 'content'
			},
			anonimus : true,
			/*redirect : {
				auth : 'authorization',
				//validate : 'filluser'
			},*/
		
		},

		test : {
			uri : "test",
			href : "test",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
			/*redirect : {
				auth : 'authorization'
			},*/
			relationsSunc : true,

			relations : [

				{src : 'js/vendor/exif.js', f : 'js', 

					require : function(){

						EXIF = require('./js/vendor/exif.js')

				}},

				{src : 'js/vendor/picker.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/picker.date.js', 		f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},
			],

			
		},

		accounts : {
			uri : "accounts",
			href : "accounts",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'authorization',
				//validate : 'filluser'
			},

			relations : [

				{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
					QRCode = require('./js/vendor/qrcode.min.js')
				}},

			],

		},


		uploadpeertube : {
			uri : "uploadpeertube",
			href : "uploadpeertube",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},

			/*relations : [
				{src : 'js/vendor/ffmpeg.min.js',			   f : 'js'},	
			],*/

			
		},

		streampeertube : {
			uri : "streampeertube",
			href : "streampeertube",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
		},

		
		tagcloud : {
			uri : "tagcloud",
			href : "tagcloud",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},
		
		taginput : {
			uri : "taginput",
			href : "taginput",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},
		
		categories : {
			uri : "categories",
			href : "categories",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},	

		staking : {
			uri : "staking",
			href : "staking",
			relations : [
		
				{src : 'js/vendor/highcharts.js', 		f : 'js', require : function(){
					Highcharts = require('./js/vendor/highcharts.js')
				}},
			],
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},	

		lastcomments : {
			uri : "lastcomments",
			href : "lastcomments",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},

		articles : {
			uri : "articles",
			href : "articles",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
		},	
		article : {
			uri : "article",
			href : "article",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},
			relations : [
				{src : 'js/vendor/medium-editor.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},

				{src : 'js/vendor/mediuminsert/handlebars.runtime.min.js',			   f : 'js', require : function(){
					
				}},
				{
					src : 'js/vendor/mediuminsert/jquery-sortable-min.js',			   f : 'js', require : function(){
					
				}},
				{src : 'js/vendor/mediuminsert/jquery.ui.widget.js',			   f : 'js'},
				{src : 'js/vendor/mediuminsert/jquery.iframe-transport.js',			   f : 'js'},
				{src : 'js/vendor/mediuminsert/jquery.fileupload.js',			   f : 'js'},
				{src : 'js/vendor/mediuminsert/medium-editor-insert-plugin.js',			   f : 'js', require : function(){
					
					var i = require('./js/vendor/mediuminsert/medium-editor-insert-plugin.js')

					var h = require('./js/vendor/mediuminsert/handlebars.runtime.min.js')

					require('./js/vendor/mediuminsert/jquery-sortable-min.js')


					i($, h)

				}},	

				{src : 'css/medium/medium-editor.css',			   f : 'css'},	
				{src : 'css/medium/medium-editor-insert-plugin.css',			   f : 'css'},	
				{src : 'css/medium/beagle.cs',			   f : 'css'},	

				
			],
			relationsSunc : true
		},	

		

		video : {
			uri : "video",
			href : "video",
			add : {
				el : 'content'
			},
			anonimus : true,
		},



		system16: {
			uri : "system16",
			href : "system16",
			add : {
				el : 'content'
			},
			anonimus : true,

			relations : [
				{src : 'js/vendor/highcharts.js', 		f : 'js', require : function(){
					Highcharts = require('./js/vendor/highcharts.js')
				}},
				{src : 'js/vendor/highcharts-more.js', 		f : 'js'}
			],

			relationsSunc : true,
			
		},

		connection : {
			uri : "connection",
			href : "connection",
			add : {
				el : 'content'
			},
			anonimus : true
		},

		proxylogs : {
			uri : "proxylogs",
			href : "proxylogs",
			add : {
				el : 'content'
			},

			relationsSunc : true,
			relations : [
				{src : 'js/vendor/highcharts.js', 		f : 'js', require : function(){
					Highcharts = require('./js/vendor/highcharts.js')
				}},
				{src : 'js/vendor/highcharts-more.js', 		f : 'js'}

			],

			redirect : {
				auth : 'authorization'
			}
		},

		help : {
			uri : "help",
			href : "help",
			add : {
				el : 'content'
			},
			anonimus : true,
		},

		donations : {
			uri : "donations",
			href : "donations",
			add : {
				el : 'content'
			},
			anonimus : true,
		},

		faq : {
			uri : "faq",
			href : "faq",
			add : {
				el : 'content'
			},
			anonimus : true,
		},
		
	
		embeding : {
			uri : "embeding",
			href : "embeding",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			}
		},

		userpage : {
			uri : "userpage",
			href : "userpage",
			preshell : true,
			add : {
				el : 'content'
			},
			anonimus : true,
			redirect : {
				auth : 'welcome'
			}
			
		},
		oldchat : {
			uri : "oldchat",
			href : "oldchat",
			add : {
				el : 'content'
			},
			anonimus : true,

			relations : [
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js'},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	
			]
		},

	

		wallet : {
			uri : "wallet",
			href : "wallet",
			add : function(settings, p){

				if(p.inWnd)
				{
					return {
						insert : 'wnd'
					}
				}
				else
				if(p.inTooltip)
				{
					return {
						insert : 'tooltip'
					}
				}
				else
				{
					return {
						el : 'content'
					}
				}

			},

			relations : [
				{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
					Chart = require('./js/vendor/Chart.js')
				}}
			],

			relationsSunc : true,

			
		},

		share : {
			uri : "share",
			href : "share",
			add : function(settings, p){

				if(p.inWnd)

					return {
						insert : 'wnd'
					}

				else
				{
					return {
						el : 'content'
					}
				}

			},

			relations : [
				{src : 'js/vendor/exif.js', f : 'js', 

					require : function(){

						EXIF = require('./js/vendor/exif.js')

				}},

				{src : 'js/vendor/Sortable.min.js', f : 'js', 

					require : function(){

						Sortable = require('sortablejs')

				}},
			
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	

		
			],
		},

		comments : {
			uri : "comments",
			href : "comments",
			add : {
				el : 'content'
			},

			relations : [
				{src : 'js/vendor/exif.js', f : 'js', 

					require : function(){

						EXIF = require('./js/vendor/exif.js')

				}},
		
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	

		
			],

			anonimus : true,
		},

		tube : {
			uri : "tube",
			href : "tube",
			add : {
				el : 'content'
			},
		
		},

		lenta : {
			uri : "lenta",
			href : "lenta",
			add : {
				el : 'content'
			},
		
			anonimus : true,
		},	

		transactionview : {
			uri : "transactionview",
			href : "transactionview",
			add : {
				el : 'content'
			},
		
			anonimus : true,
		},	

		//search

		s : {
			uri : "s",
			href : "s",
			add : {
				el : 'content'
			},

			anonimus : true,
		},

		send : {
			uri : "send",
			href : "send",
			add : {
				el : 'content'
			},

		
			anonimus : true,
		},

		imageGalleryEdit : {
			uri : "imageGalleryEdit",
			href : "imagesEdit",
			add : function(settings, p){

				if(p.inWnd)

					return {
						insert : 'wnd'
					}

				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
		},
		imagegallery : {
			uri : "imagegallery",
			href : "imagegallery",
			add : function(settings, p){

				if(p.inWnd)

					return {
						insert : 'wnd'
					}

				else
				{
					return {
						el : 'content'
					}
				}

			},
			anonimus : true,
			relationsSunc : true,
		},

		

		aboutus : {
			uri : "aboutus",
			href : "aboutus",
			add : {
				el : 'content'
			},
			anonimus : true,
		},



	/****/

	menu : {
		uri : "menu",
		href : "menu",
		add : {
			el : 'menu'
		},
		now : true,
		anonimus : true,
		renew : true,
		reload : true
	},

	toppanel : {
		uri : "toppanel",
		href : "toppanel",
		add : {
			el : 'toppanel'
		},
		now : true,
		anonimus : true,
		renew : true,
		reload : true
	},

	navigation : {
		uri : "navigation",
		href : "navigation",
		add : {
			el : 'navigation'
		},
		now : true,
		renew : true,
		anonimus : true,
		reload : true
	},

	footer : {
		uri : "footer",
		href : "footer",
		add : {
			el : 'footer'
		},
		now : true,
		anonimus : true,
		reload : true
	},

	support : {
		uri : "support",
		href : "support",
		add : {
			el : 'content'
		},
		relations : [
			
			{src : 'js/validation.js',			   f : 'js'},				
			
		],
		anonimus : true,
		reload : true
	},

	

	notifications : {
		uri : "notifications",
		href : "notifications",
		add : function(settings, p){

			if(p.inTooltip)

				return {
					insert : 'tooltip'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},

		
	},
	/*dialogs : {
		uri : "dialogs",
		href : "dialogs",
		add : function(settings, p){

			if(p.inTooltip)

				return {
					insert : 'tooltip'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		}
	},*/

	panel : {
		uri : "panel",
		href : "panel",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},

	leftpanel : {
		uri : "leftpanel",
		href : "leftpanel",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},

	discussions : {
		uri : "discussions",
		href : "discussions",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		/*redirect : {
			auth : 'authorization',
			validate : 'filluser'
		},*/
		//anonimus : true,
		/*relationsSunc : true,
		relations : [

			
			{src : 'js/vendor/rtc/RTCMultiConnection.min.js',			   f : 'js'},	
			{src : 'js/vendor/rtc/socket.io.js',			   f : 'js'}	

			
		]*/
	},

	

	authorization : {
		uri : "authorization",
		href : "authorization",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		relations : [

			
			{src : 'js/validation.js',			   f : 'js'},
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},				
			
		],
		anonimus : true,
	},

	addaccount : {
		uri : "addaccount",
		href : "addaccount",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		relations : [

		
			{src : 'js/validation.js',			   f : 'js'},				
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},	
			
		]
	},

	complain : {
		uri : "complain",
		href : "complain",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		}
	},

	postscores : {
		uri : "postscores",
		href : "postscores",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		}
	},

	scheduler : {
		uri : "scheduler",
		href : "scheduler",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		}
	},

	surveyiframe : {
		uri : "surveyiframe",
		href : "surveyiframe",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		}
	},

	socialshare : {
		uri : "socialshare",
		href : "socialshare",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},

		anonimus : true,

		relations : [
			{src : 'js/vendor/SocialShare.min.js',			   f : 'js'},
		],
	},

	socialshare2 : {
		uri : "socialshare2",
		href : "socialshare2",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},

		anonimus : true,

		relations : [
			{src : 'js/vendor/SocialShare.min.js',			   f : 'js'},
		],
	},

	main : {
		uri : "main",
		href : "index",
		add : {
			el : 'content'
		},
		anonimus : true,
		
	},

	author : {
		uri : "author",
		href : "author",
		add : {
			el : 'content'
		},
		anonimus : true,
		preshell : true
		
	},

	channel : {
		uri : "channel",
		href : "channel",
		add : {
			el : 'content'
		},
		anonimus : true,
		
	},
	
	post : {
		uri : "post",
		href : "post",
		preshell : true,
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},
	userslist : {
		uri : "userslist",
		href : "userslist",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		anonimus : true,
	},
	ustate : {
		uri : "ustate",
		href : "ustate",
		add : function(settings, p){

			if(p.inTooltip)

				return {
					insert : 'tooltip'
				}

			else
			{
				return {
					el : 'content'
				}
			}

		},

		relations : [
			{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
				Chart = require('./js/vendor/Chart.js')
			}},	
		]

		
	},

	dust : {
		uri : "dust",
		href : "dust",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},

		relations : [
			{src : 'js/validation.js',			   f : 'js'},	
		]
	},

	testApi : {
		uri : "testApi",
		href : "testApi",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'tooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},

		relations : [
			{src : 'js/validation.js',			   f : 'js'},	
		]
	},

};


console.log(JSON.stringify(_.map(__map, function(o,i){
	return i
})))


if(typeof module != "undefined") module.exports = __map;