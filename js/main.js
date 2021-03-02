if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{
	app = new Application({


		listofproxies : [
			
			{
				host : 'pocketnet.app',
				port : 8899,
				wss : 8099
		   },
		   {
				host : '1.pocketnet.app',
				port : 8899,
				wss : 8099
			},

		],
		
	});

	app.deviceReadyInit();

	window.POCKETNETINSTANCE = app
}

topPreloader(100);