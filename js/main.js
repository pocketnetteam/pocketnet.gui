if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{

	var _listofproxies =  [
			
		{
			host : 'pocketnet.app',
			port : 8899,
			wss : 8099
	    },
	    {
			host : '1.pocketnet.app',
			port : 8899,
			wss : 8099
		}

	]

	if (window.testpocketnet){
		_listofproxies = [{
			host : 'test.pocketnet.app',
			port : 8899,
			wss : 8099
	    },]
	}

	app = new Application({
		listofproxies : _listofproxies,
	});

	app.preapi()

	console.log("PREPARED", Math.floor(Date.now()))

	retry(function(){
		return (window.pocketnetVendorLoaded && window.pocketnetJoinLoaded ) || window.design
	}, function(){

		console.log('deviceReadyInit', Math.floor(Date.now()))

		app.deviceReadyInit();
		
	})
	
	window.POCKETNETINSTANCE = app
}

topPreloader(100);