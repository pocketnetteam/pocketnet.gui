if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined') 	_SEO = false;

if(!_Node)
{
	app = new Application({
		/*ws : 'wss://216.108.237.11:8088',
		apiproxy : 'https://216.108.237.11:8888'*/
	});
	app.deviceReadyInit();
}

topPreloader(100);