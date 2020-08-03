
var Obj = require("./object");
var Any = require("./any");

var Node = function(p, connect){
	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});
		p.name = 	"node";
		p.tname = 	"nodes";

	var host = p.host,
        port = p.port,
        ws = p.ws,
        path = p.path || '',
		nodename = p.nodename,
		rpcuser = p.rpcuser,
		rpcpwd = p.rpcpwd,
        addedby = p.addedby;

	
	var self = new Obj(p, connect);

		self._status = {
			1 : 'active'
		}

		self.revoke = function(clbk){

			var where = {} 

				where['nodes.host'] = {
					v : host,
					r : '='
                }
                
                where['nodes.addedby'] = {
					v : addedby,
					r : '='
				}

			self.sql.data.delete((err, results) => {

					clbk(err, results)				

				},
				{
					where : where,
				}
			)

        }
        
        self.update = function(clbk){
            self.sql.data.update({
               
				port : port,
				ws : ws,
				path : path,
				nodename : nodename
               
            },
				(err, results) => {

					if(!err){

						var result = results[0];	

						clbk(err, result)

					}
					else
					{
						clbk(err, null)		
					}

				},
				{
					returning : "*",

					where : {
						host : {
							v : host,
							r : '='
						},
	
						addedby : {
							v : addedby,
							r : '='
						},
					}
				}
			)
        }

		self.create = function(clbk){

			self.sql.data.insert({
				host : host,
				port : port,
                ws : ws,
                path : path,
                nodename : nodename,
				addedby : addedby,
				/*rpcuser : rpcuser,
				rpcpwd : rpcpwd*/
			},
				(err, results) => {

					if(!err){

						var result = results[0];	

						clbk(err, result)

					}
					else
					{
						clbk(err, null)		
					}

				},
				{
					returning : "*"
				}
			)
		}


		self.all = function(clbk){
			var where = {}
			
           
		
			self.sql.data.select(
				(err, results) => {

					if(!err){

						clbk(null, results || [])
						
					}
					else
					{
						clbk(err, null)
					}

				},
				{
					where : where
				}
			)
		}

	return self;
}

module.exports = Node;