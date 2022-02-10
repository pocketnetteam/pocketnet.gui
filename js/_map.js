var insertingfunc = function(settings, p){

	if(p.inWnd)
	{
		return {
			insert : 'wnd'
		}
	}

	if(p.inTooltip)
	{
		return {
			insert : 'tooltip'
		}
	}
	
	return {
		el : 'content'
	}

}

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
		"js/vendor/moment.locale.js", //?
		"js/vendor/jquery.inputmask.bundle.js",
		"js/vendor/axios.js", //
		"js/vendor/isotope.pkgd.js", //
		"js/vendor/circular-progress.js", //
		/*"js/vendor/swiper-bundle.min.js",*/ // very hard
		"js/vendor/workbox-v6.1.5/workbox-sw.js",
		"js/vendor/ion.sound/ion.sound.js",
		"js/vendor/hammer.min.js",
		"js/vendor/owl/owl.carousel.min.js"

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
		"js/peertube.js",
		"js/widgets.js",
		"js/logger.js"
	],

	__css : [
		"css/normalize.css",
		"css/tooltipster.core.min.css",
		"css/tooltipster.bundle.min.css",
		"css/main.css",
		"css/stblack.css",
		"css/plyr.css",
		"css/pniframe.css",
		"js/vendor/DateTimePicker.min.css",
		/*"css/swiper-bundle.min.css",*/
		"peertube/video-embed.css",
		"js/vendor/emojionearea.min.css",
		"js/vendor/owl/assets/owl.carousel.min.css",
		"js/vendor/owl/assets/owl.theme.default.min.css",
	],

	
	__templates : [
		{ c : 'navigation', n : 'menu' },
		{ c : 'menu', n : 'index' },
		{ c : 'share', n : 'body' },
		{ c : 'toppanel', n : 'index' },
		{ c : 'navigation', n : 'index' },
		{ c : 'footer', n : 'index' },
		{ c : 'toppanel', n : 'menu' },
		{ c : 'main', n : 'index' },
		{ c : 'panel', n : 'index' },
		{ c : 'leftpanel', n : 'index' },
		{ c : 'lastcomments', n : 'index' },
		{ c : 'tagcloud', n : 'index' },
		{ c : 'userpage', n : 'index' },
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
		{ c : 'author', n : 'authorcaption'},
		{ c : 'post', n : 'preshell'}

	],

    pkview  : {
		uri : "pkview",
		href : "pkview",
		add : insertingfunc,

		relations : [
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},
			{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
				QRCode = require('./js/vendor/qrcode.min.js')
			}},	

		],
	},      

	
	easynode : {
		uri : "easynode",
		href : "easynode",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true
	},

	about : {
		uri : "about",
		href : "about",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true
	},

	aboutHome : {
		uri : "aboutHome",
		href : "aboutHome",
		add : {
			el : 'content'
		},
		anonimus : true,
		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},

	aboutYoutube : {
		uri : "aboutYoutube",
		href : "aboutYoutube",
		add : {
			el : 'content'
		},
		anonimus : true,
		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},

	aboutFacebook : {
		uri : "aboutFacebook",
		href : "aboutFacebook",
		add : {
			el : 'content'
		},
		anonimus : true,
		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},

	aboutContentCreators : {
		uri : "aboutContentCreators",
		href : "aboutContentCreators",
		add : {
			el : 'content'
		},
		anonimus : true,

	
	},

	aboutHIW : {
		uri : "aboutHIW",
		href : "aboutHIW",
		add : {
			el : 'content'
		},
		anonimus : true,

	
	},

	aboutTwitter : {
		uri : "aboutTwitter",
		href : "aboutTwitter",
		add : {
			el : 'content'
		},
		anonimus : true,

	
	},

	applications : {
		uri : "applications",
		href : "applications",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true
	},


	terms : {
		uri : "terms",
		href : "terms",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true
	},

	
	page404 : {
		uri : "page404",
		href : "page404",
		add : {
			el : 'content'
		},
		anonimus : true,
		relationsSunc : true,
		electronDontOpen : true
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
					insert : 'bstntooltip'
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
		add : insertingfunc,
		anonimus : true,

		relations : [
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},
			{src : 'js/validation.js',			   f : 'js'},		
			{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
				QRCode = require('./js/vendor/qrcode.min.js')
			}},	

		],
		electronDontOpen : true
	},

	anothersite : {
		uri : "anothersite",
		href : "anothersite",
		add : insertingfunc,
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
			add : insertingfunc,

			

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
			add : insertingfunc,
			redirect : {
				auth : 'welcome'
			},
			
			
		},

		usersettings : {
			uri : "usersettings",
			href : "usersettings",
			add : insertingfunc,
			anonimus : true,
			/*redirect : {
				auth : 'authorization',
				//validate : 'filluser'
			},*/
		
		},

		popup : {
			uri : "popup",
			href : "popup",
			add : insertingfunc,
			anonimus : true
		},

		test : {
			uri : "test",
			href : "test",
			add : insertingfunc,
			anonimus : true,
			/*redirect : {
				auth : 'authorization'
			},*/
			relationsSunc : true,
			electronDontOpen : true,
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
			add : insertingfunc,

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
			add : insertingfunc,

			/*relations : [
				{src : 'js/vendor/ffmpeg.min.js',			   f : 'js'},	
			],*/

			
		},

		streampeertube : {
			uri : "streampeertube",
			href : "streampeertube",
			add : insertingfunc,
		},

		
		tagcloud : {
			uri : "tagcloud",
			href : "tagcloud",
			add : insertingfunc,
			anonimus : true,
		},
		
		taginput : {
			uri : "taginput",
			href : "taginput",
			add : insertingfunc,
			anonimus : true,
		},
		
		categories : {
			uri : "categories",
			href : "categories",
			add : insertingfunc,
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
			add : insertingfunc,
			anonimus : true,
		},	

		recommendedusers : {
			uri : "recommendedusers",
			href : "recommendedusers",
		
			add : insertingfunc,
			anonimus : true,
		},
		
		topusers : {
			uri : "topusers",
			href : "topusers",
		
			add : insertingfunc,
			anonimus : true,
		},

		bestposts : {
			uri : "bestposts",
			href : "bestposts",
			
			add : insertingfunc,
			anonimus : true,
		},

		lastcomments : {
			uri : "lastcomments",
			href : "lastcomments",
			add : insertingfunc,
			anonimus : true,
		},

		pkoin : {
			uri : "pkoin",
			href : "pkoin",
			add : insertingfunc,
			anonimus : true,
		},
		articles : {
			uri : "articles",
			href : "articles",
			add : insertingfunc,

			electronDontOpen : true
		},	
		article : {
			uri : "article",
			href : "article",
			add : insertingfunc,
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
			relationsSunc : true,

			electronDontOpen : true
		},	

		articlesv : {
			uri : "articlesv",
			href : "articlesv",
			add : insertingfunc,

			electronDontOpen : true
		},	
		articlev : {
			uri : "articlev",
			href : "articlev",
			add : insertingfunc,
			
			relations : [
				{src : 'js/vendor/editor/editor.js',			   f : 'js'},
				{src : 'js/vendor/editor/embed.js',			   f : 'js'},
				{src : 'js/vendor/editor/carousel.js',			   f : 'js'},
				{src : 'js/vendor/editor/paragraph.js',			   f : 'js'},
				{src : 'js/vendor/editor/header.js',			   f : 'js'},
				{src : 'js/vendor/editor/imageloader.js',			   f : 'js'},
				{src : 'js/vendor/editor/delimiter.js',			   f : 'js'},
				{src : 'js/vendor/editor/link.js',			   f : 'js'},
				{src : 'js/vendor/editor/list.js',			   f : 'js'},
				{src : 'js/vendor/editor/quote.js',			   f : 'js'},
				{src : 'js/vendor/editor/warning.js',			   f : 'js'},
				{src : 'js/vendor/editor/inlinecode.js',			   f : 'js'}
			],

			electronDontOpen : true
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
			add : insertingfunc,
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
			add : insertingfunc
		},

		userpage : {
			uri : "userpage",
			href : "userpage",
			preshell : true,
			add : insertingfunc,
			anonimus : true,
			redirect : {
				auth : 'welcome'
			},
			electronDontOpen : true
			
		},
	

		wallet : {
			uri : "wallet",
			href : "wallet",
			add : insertingfunc,

			relations : [
				{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
					Chart = require('./js/vendor/Chart.js')
				}}
			],

			relationsSunc : true,

			electronDontOpen : true
		},

		share : {
			uri : "share",
			href : "share",
			add : insertingfunc,

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
			electronDontOpen : true
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
			add : insertingfunc,
			anonimus : true,
		},
		imagegallery : {
			uri : "imagegallery",
			href : "imagegallery",
			add : insertingfunc,
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

	
	
	// electronnav
	
	/*electronnav : {
		uri : "electronnav",
		href : "electronnav",
		add : {
			el : 'electronnav'
		},
		now : typeof _Electron != 'undefined' && _Electron,
		anonimus : true,
		renew : true,
		reload : true
	},*/

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

	/*support : {
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
	},*/

	

	notifications : {
		uri : "notifications",
		href : "notifications",
		add : insertingfunc,

		
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
		add : insertingfunc,
		anonimus : true,
	},

	leftpanel : {
		uri : "leftpanel",
		href : "leftpanel",
		add : insertingfunc,
		anonimus : true,
	},

	nodecontrol : {
		uri : "nodecontrol",
		href : "nodecontrol",
		add : insertingfunc,
		
		anonimus : true,
	},

	bastyonhelper : {
		uri : "bastyonhelper",
		href : "bastyonhelper",
		add : insertingfunc,
		
		anonimus : true,
	},

	authorization : {
		uri : "authorization",
		href : "authorization",
		add : insertingfunc,
		relations : [

			
			{src : 'js/validation.js',			   f : 'js'},
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},				
			
		],
		anonimus : true,
		electronDontOpen : true
	},

	addaccount : {
		uri : "addaccount",
		href : "addaccount",
		add : insertingfunc,
		relations : [

		
			{src : 'js/validation.js',			   f : 'js'},				
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},	
			
		]
	},

	complain : {
		uri : "complain",
		href : "complain",
		add : insertingfunc
	},

	postscores : {
		uri : "postscores",
		href : "postscores",
		add : insertingfunc
	},

	scheduler : {
		uri : "scheduler",
		href : "scheduler",
		add : insertingfunc
	},

	surveyiframe : {
		uri : "surveyiframe",
		href : "surveyiframe",
		add : insertingfunc
	},

	socialshare : {
		uri : "socialshare",
		href : "socialshare",
		add : insertingfunc,

		anonimus : true,

		relations : [
			{src : 'js/vendor/SocialShare.min.js',			   f : 'js'},
		],
	},

	socialshare2 : {
		uri : "socialshare2",
		href : "socialshare2",
		add : insertingfunc,

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

		electronDontOpen : function(){
			var _p = parameters()

			if(!_p.s && !_p.v) return true
		}
	},

	author : {
		uri : "author",
		href : "author",
		add : insertingfunc,
		anonimus : true,
		preshell : true,
		//exhandler : true
		
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
		add : insertingfunc,
		anonimus : true,
		//exhandler : true
	},
	userslist : {
		uri : "userslist",
		href : "userslist",
		add : insertingfunc,
		anonimus : true,
	},
	ustate : {
		uri : "ustate",
		href : "ustate",
		add : insertingfunc,

		relations : [
			{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
				Chart = require('./js/vendor/Chart.js')
			}},	
		]

		
	},
	videoCabinet : {
		uri : "videoCabinet",
		href : "videoCabinet",
		add : insertingfunc,
	},

	dust : {
		uri : "dust",
		href : "dust",
		add : insertingfunc,

		relations : [
			{src : 'js/validation.js',			   f : 'js'},	
		]
	},

	testApi : {
		uri : "testApi",
		href : "testApi",
		add : insertingfunc,

		relations : [
			{src : 'js/validation.js',			   f : 'js'},	
		]
	},

};



if(typeof module != "undefined") module.exports = __map;