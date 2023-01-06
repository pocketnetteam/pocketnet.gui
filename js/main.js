if(typeof _Node == 'undefined') _Node = false;
if(typeof _OpenApi == 'undefined') _OpenApi = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{	

	var _listofproxies =  [

		{
			host : '127.0.0.1',
			port : 8887,
			wss : 8087
		},
			
		/*{
			host : 'pocketnet.app',
			port : 8899,
			wss : 8099
	    },*/
	
	    {
			host : '1.pocketnet.app',
			port : 8899,
			wss : 8099
		},

		{
			host : '2.pocketnet.app',
			port : 8899,
			wss : 8099
		},

		{
			host : '3.pocketnet.app',
			port : 8899,
			wss : 8099
		},

		{
			host : '4.pocketnet.app',
			port : 8899,
			wss : 8099
		},


		{
			host : '5.pocketnet.app',
			port : 8899,
			wss : 8099
		},

		/*{
			host : '6.pocketnet.app',
			port : 8899,
			wss : 8099
		}*/

	]

	/* test */

	if(window.cordova){
		_listofproxies.push({
			host : '6.pocketnet.app',
			port : 8899,
			wss : 8099
		})
	}


	var matrix = 'matrix.pocketnet.app'

	if (window.testpocketnet){
		_listofproxies = [{
			host : 'test.pocketnet.app',
			port : 8899,
			wss : 8099
	    },
			{
				host : '127.0.0.1',
				port : 8887,
				wss : 8087
			},
		]

		matrix = 'test.matrix.pocketnet.app'
	}
		
	if (window.location.host === 'pre.pocketnet.app') {
		_listofproxies = [
			{
				host : 'pre.pocketnet.app',
				port : 8899,
				wss : 8099
			},
			{
				host : '6.pocketnet.app',
				port : 8899,
				wss : 8099
			},
		];

	}

	window.projects_meta = {
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
		},
	
		BastyonPapp : {
		  fullname : "Bastyon",
		  url : "pocketnet.app",
		  turl : "test.pocketnet.app",
		  protocol : 'bastyon',
		  blockexplorer : 'https://pocketnet.app/blockexplorer/'
		}
	  }


	app = new Application({
		listofproxies : _listofproxies,
		matrix : matrix
	});

	app.preapi()

	// Prepare notifications
	//app.notifications = new Notifications(app);

	retry(function(){
		return (window.pocketnetVendorLoaded && window.pocketnetJoinLoaded ) || (window.design && typeof window.Platform != 'undefined')
	}, function(){

		app.deviceReadyInit({
			clbk : function(){

				if(_OpenApi){

					var p = parameters()

					var el = $('#content')

					var action = p.action || ''
					var id = p.id || ''
					var ids = p.ids || ''

					var embeddingSettigns = {}
					
					try{
						embeddingSettigns = JSON.parse(hexDecode(p.embeddingSettigns || "7B7D"))
					}catch(e){}


					if(embeddingSettigns.black){
						$('html').addClass('stblack')
					}

					if (embeddingSettigns.ref){
						app.ref = embeddingSettigns.ref

						$('.openapipromolink').each(function(){
							var h = $(this).attr('href')

							h += '?ref=' + app.ref 

							$(this).attr('href', h)
						})
					}
					
					embeddingSettigns.openapi = true
					
					if (app.platform.papi[action] && (id || ids)){
						app.platform.papi[action](id || ids.split(','), el, function() {
							setTimeout(function() {
								$('html').addClass('openapiready')
							}, 500)
						}, embeddingSettigns)
					}

				}
			}
		});
		
	}, 5)


	window.POCKETNETINSTANCE = app
}

topPreloader(100);