var https =     require("https");
var http = 		require("http");
var url = 		require("url");
var _ = 		require('underscore');

var Server = function(_p){

	var self = this;
	var server = null;


	var sockets = {}, nextSocketId = 0;



	var onRequest = function(request, response) {

		console.log("REQUEST")

		var p = _.clone(_p);

		var u = url.parse(request.url);
		
		//

		p.data = "";
		p.pathname = u.pathname.substr(1).replace(/\//g, ".");

		p.request = request;
		p.response = response;		
		p.parameters = parameters(decodeURIComponent(u.search || ''), true);

		//
		
		p.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

	    p.request.setEncoding("utf8");

	    p.request.addListener("data", function(data) {
			p.data += data;
	    });

	    p.request.addListener("end", function() {
	    	
			p.parameters = _.extend(p.parameters, parameters(decodeURIComponent(p.data) || ''));
	    	
			p.route(p);

	    });

	} 

	self.start = function() {

		server = https.createServer(_p.https_options, onRequest).listen(_p.port || 8888);

		server.on('connection', function (socket) {
			var socketId = nextSocketId++;

			sockets[socketId] = socket;
		  
			socket.on('close', function () {
			  delete sockets[socketId];
			});
		  
		});

	}

	self.stop = function(){

		if (server){

			server.close(function () { console.log('Server closed!'); });
			server = null
		}
		
		
		for (var socketId in sockets) {
			sockets[socketId].destroy();

			delete sockets[socketId]
		}

		nextSocketId = 0

	}

	self.info = function(){

		if (server){

			return {
				sockets : _.toArray(sockets).length
			}

		}

		return null

	}


	return self;
}



module.exports = Server