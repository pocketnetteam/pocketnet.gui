if(typeof _Node == 'undefined') _Node = false;
if(typeof _OpenApi == 'undefined') _OpenApi = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

window.project_config || (window.project_config = {})

if(!_Node)
{

	var developapps = window.project_config.developapps || [] 
	
	/*[{
		"id" : "demo.pocketnet.app",
		"version": "0.0.1",
		"scope" : "localhost:8081",
		"cantdelete" : true,
		"name" : "Demo application",
		"grantedPermissions" : ["account"],
		"access" : ["PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82"]
	}]*/

	var servers = ((window.project_config || {}).servers || {})[window.testpocketnet ? 'test' : 'production'] || {}

	var translateApiProxy = servers.translateProxy || null
	
	var _listofproxies = servers.proxy || []

	var matrix = servers.matrix || ""
		
	if (window.location.host === 'pre.pocketnet.app') {
		_listofproxies = [
			{
				host : 'pre.pocketnet.app',
				port : 8899,
				wss : 8099
			}
		];

	}

	if(!_OpenApi){
		if (window.parent.frames.length > 0) {
			window.stop();
		}
	}

	app = new Application({
		listofproxies : _listofproxies,
		matrix : matrix,
		developapps,
		translateApiProxy
	});

	app.preapi()

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

				else{
					
				}
			}
		});
		
	}, 5)


	window.POCKETNETINSTANCE = app
}

topPreloader(100);
