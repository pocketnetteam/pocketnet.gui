if(typeof _Node == 'undefined') _Node = false;
if(typeof _OpenApi == 'undefined') _OpenApi = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{	

	var _listofproxies =  [
	
			
		{
			host : 'pocketnet.app',
			port : 8899,
			wss : 8099
	    },

		/*{
			host : 'wellai.health',
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
		}

	]


	var matrix = 'matrix.pocketnet.app'

	if (window.testpocketnet){
		_listofproxies = [{
			host : 'test.pocketnet.app',
			port : 8899,
			wss : 8099
	    }]

		matrix = 'vamily.ru'
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
						app.platform.papi[action](id || ids.split(','), el, null, embeddingSettigns)
					}

				}
			}
		});
		
	})


	window.POCKETNETINSTANCE = app
}

topPreloader(100);