if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{
	app = new Application({
		/*ws : 'wss://localhost:8088',
		apiproxy : 'https://localhost:8888'*/
	});
	app.deviceReadyInit();
}

topPreloader(100);