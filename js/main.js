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

		ws : 'wss://localhost:8088',
		apiproxy : 'https://localhost:8888',
		firebase : 'https://pocketnet.app:8888',

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091'*/

		listofnodes : [

	
			{
				full : '216.108.237.11:38081',
				host : '216.108.237.11',
				port : 38081,
				ws : 8087,
				path : '',
	
				name : 'spb1'
			},
	
		]
		
	});

	app.deviceReadyInit();
}

topPreloader(100);