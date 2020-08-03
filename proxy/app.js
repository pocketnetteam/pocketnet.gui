Application = function(p)
{	

	if(!p) p = {}

	var self = this;

	self.options = {

		name : 'PCRB',
		fullName : "Pocketrepbtc",
		apiproxy : {

			host: "localhost",
			id: "localhost:8888:8088:user",
			port: "8888",
			ws: "8088"

		},
		
		server : p.server || 'https://getbitcoins.io/Shop/AJAXMain.aspx',
		imageServer : 'https://api.imgur.com/3/',
		imageStorage : 'https://api.imgur.com/3/images/',
		//ws : p.ws || "wss://localhost:8089",	

		listofnodes : p.listofnodes || []
	};

	
	self.id = makeid();

	var newObjects = function(p){
		
		self.ajax = new AJAX(self.options);	
		self.user = new User(self);	
		self.ajax.set.user(self.user);
		self.platform = new Platform(self, self.options.listofnodes);
		self.options.platform = self.platform

		self.platform.apiproxy = self.options.apiproxy
	}

	
	self.init = function(_p){

		if (typeof localStorage == 'undefined')
			localStorage = {};

		if(!_p) _p = {};

		newObjects(_p);

		self.user.isState(function(){

			self.platform.prepareApi(function(){
				
				if (_p.clbk) 
					_p.clbk(self);

			})
			
		})
		
	}

	self.reload = function(p){
		if(!p) p = {};
		
		self.user.isState(function(){

			if (p.clbk) 
				p.clbk();
			
		})
	}


	self.destroy = function(){

		self.ajax = null;

	}


	self.name = self.options.name;

	return self;
}

if(typeof _Node == 'undefined') _Node = false;
if(typeof _SEO == 'undefined')  _SEO = false;

if(!_Node)
{
    app = new Application();
    app.deviceReadyInit();
}

module.exports = Application;

