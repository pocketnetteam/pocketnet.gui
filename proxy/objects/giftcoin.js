var Obj = require("./object");
var Any = require("./any");

var Giftcoin = function(p, connect){

	if(!connect) connect = {};

	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});
		p.name = 	"giftcoin";
		p.tname = 	"giftcoins";

    var address = p.address, 
		amount = p.amount,
		ip = p.ip;
	
	var self = new Obj(p, connect);

		self._status = {
			1 : 'active'
		}

		self.get = {
			address : function(address, clbk){
				var where = {}

					where['address'] = {
						v : address,
						r : '='
					}

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
			},

			ip : function(ip, clbk){
				var where = {}
			
					where['ip'] = {
						v : ip,
						r : '='
					}

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
						where : where,
						orderBy : {
							by : 'date',
							order : "DESC"
						},
						limit : 1
					}
				)
			}
		}

		self.check = {

			all : function(address, ip, clbk){
				self.check.address(address, function(r1){
					self.check.ip(ip, function(r2){
						if (clbk)
							clbk(r1 && r2)
					})	
				})
			},

			address : function(address, clbk){

				self.get.address(address, function(err, a){

					var result = true;
					
					if (err){
						result = false;
					}
					else{
						result = !!!a.length;
					}

					if (clbk)
						clbk(result)
				})

			},

			ip : function(ip, clbk){
				self.get.ip(ip, function(err, res){
					var result = true;

					if (err){
						result = false;
					}

					else{
						if (res.length > 5){
	
							if(res[res.length - 1].date > (new Date).addDays(-10)){
	
								result = false
	
							}
	
						}
					}

					

					if (clbk)
						clbk(result)
				})
			}
		}

		self.create = function(txid, clbk){

			self.sql.data.insert({
                address : address,
                txid : txid,
				amount : amount,
				ip : ip              

			},
				(err, results) => {

					console.log(err)

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
		

			self.sql.data.select(
				(err, results) => {

					console.log(err, results)

					if(!err){

						clbk(null, results || [])
						
					}
					else
					{
						clbk(err, null)
					}

				},
				{
				
				}
			)
		}

	return self;
}

module.exports = Giftcoin;