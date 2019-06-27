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

		/*ws : 'wss://localhost:8089',
		apiproxy : 'https://localhost:8889',*/

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091'*/

		listofnodes : [

			/*{
				full : '84.52.69.110:58081',
				host : '84.52.69.110',
				port : 58081,
				ws : 8080,
				path : '',
	
				name : 'spb1'
			},*/
	
	
	
			{
				full : '216.108.237.11:38081',
				host : '216.108.237.11',
				port : 38081,
				ws : 8087,
				path : '',
	
				name : 'spb1'
			},
	
			
	
			/*{
				full : '84.52.69.110:37071',
				host : '84.52.69.110',
				port : 37071,
				ws : 8080,
				path : '',
	
				name : 'spbtest'
			}*/
	
		]
		
	});

	app.deviceReadyInit();
}

topPreloader(100);