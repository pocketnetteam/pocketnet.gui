if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{
	app = new Application({

		/*ws : 'wss://bear:8088',
		apiproxy : 'https://bear:8888',*/

		ws : 'wss://localhost:8088',
		apiproxy : 'https://localhost:8888',

		/*rtcws : 'wss://localhost:9090',
		rtchttp : 'https://localhost:9091'*/
	});
	app.deviceReadyInit();
}

topPreloader(100);