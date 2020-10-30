if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{
	app = new Application({

		/*ws : 'wss://bear:8088',
		apiproxy : 'https://bear:8888',*/

		/*ws : 'wss://pocketnet.app:8089',	
		apiproxy : 'https://pocketnet.app:8889',
		firebase : 'https://pocketnet.app:8889',*/

		/*ws : 'wss://192.168.0.11:8088',
		apiproxy : 'https://192.168.0.11:8888',
		firebase : 'https://pocketnet.app:8888',*/

		/*ws : 'wss://localhost:8088',
		apimproxy : 'https://localhost:8888',
		firebase : 'https://192.168.0.11:8888',*/

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091'*/

		listofproxies : [
			{
				host : 'pocketnet.app',
				port : 8888,
				ws : 8088,

				id : 'pocketnet.app:8888:8088:'
			},

			// {
			// 	host : 'localhost',
			// 	port : 8888,
			// 	ws : 8088,
			// 	id : 'localhost:8888:8088:'
			// },
			
			{
				host : 'ironbot',
				port : 8888,
				ws : 8088
			}
		],
		
	});

	app.deviceReadyInit();
}

topPreloader(100);