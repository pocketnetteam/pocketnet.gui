__map =  { 

	__sources : [

		"js/functions.js",     	
		"js/user.js",
		"js/module.js",
		"js/navn.js",
		"js/validation.js",
		"js/_map.js",
		"js/localization.js",
		"js/kit.js",
		"js/satolist.js",
		"js/app.js",
		"js/main.js",
	],

	__css : [
		"css/tooltipster.core.min.css",
		"css/tooltipster.bundle.min.css",
		"css/main.css",
	],

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
			{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},
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
				auth : 'authorization'
			},
			relationsSunc : true,

			relations : [
				{src : 'js/vendor/circular-progress.js',			   f : 'js'},
			],
			
		},

		usersettings : {
			uri : "usersettings",
			href : "usersettings",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'authorization',
				validate : 'filluser'
			},
			
			
		},

		test : {
			uri : "test",
			href : "test",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'authorization'
			},
			relationsSunc : true,

			relations : [

				{src : 'js/vendor/exif.js', f : 'js', 

					require : function(){

						EXIF = require('./js/vendor/exif.js')

				}},

				{src : 'js/vendor/picker.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/picker.date.js', 		f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},
				{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},	
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
				validate : 'filluser'
			},
		},

		messenger : {
			uri : "messenger",
			href : "messenger",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'authorization',
				validate : 'filluser'
			},
			
			
		},

		/*rep : {
			uri : "rep",
			href : "rep",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'index'
			}
		},
		addrep : {
			uri : "addrep",
			href : "addrep",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'index'
			}
		},*/

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

		help : {
			uri : "help",
			href : "help",
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
		
		embeding20 : {
			uri : "embeding20",
			href : "embeding20",
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
				{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},					
		
			],

			
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

			},
			relations : [
				{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},					
		
			],

			
		},

		userpage : {
			uri : "userpage",
			href : "userpage",
			add : {
				el : 'content'
			},
			redirect : {
				auth : 'authorization'
			}
			
		},
		chat : {
			uri : "chat",
			href : "chat",
			add : {
				el : 'content'
			},
			anonimus : true,

			relations : [
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js'},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	
			],
			redirect : {
				auth : 'authorization',
				validate : 'filluser'
			}
		},

		mchat : {
			uri : "mchat",
			href : "mchat",
			add : {
				el : 'content'
			},
			anonimus : true,

			relations : [
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js'},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	
			],
			redirect : {
				auth : 'authorization',
				validate : 'filluser'
			}
		},

		wallet : {
			uri : "wallet",
			href : "wallet",
			add : {
				el : 'content'
			},

			relations : [
				{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},	
				{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
					Chart = require('./js/vendor/Chart.js')
				}},			
					
			],

			relationsSunc : true,

			
		},

		share : {
			uri : "share",
			href : "share",
			add : {
				el : 'content'
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
				{src : 'js/vendor/isotope.pkgd.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},			
				
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	

		
			],
		},

		lenta : {
			uri : "lenta",
			href : "lenta",
			add : {
				el : 'content'
			},
			relations : [
			
				{src : 'js/vendor/isotope.pkgd.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},			
			
			],
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

			relations : [
			
				{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},
				
			],
			
			

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
		renew : true
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

		}
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

		}
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
		redirect : {
			auth : 'authorization',
				validate : 'filluser'
		}
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

			
			{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},	
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

	
			{src : 'js/vendor/jquery.inputmask.bundle.min.js',			   f : 'js'},	
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
		
	},
	
	post : {
		uri : "post",
		href : "post",
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

		}
	},

	

};


if(typeof module != "undefined") module.exports = __map;