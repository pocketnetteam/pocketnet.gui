var Obj = require("./object");
var Any = require("./any");

var Refbonus = function(p, connect){
	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});
		p.name = 	"refbonus";
		p.tname = 	"refbonuses";

    var address = p.address,
        referrer = p.referrer, 
        level = p.level, 
        amount = p.amount,
        reputation = p.reputation;
	
	var self = new Obj(p, connect);

		self._status = {
			1 : 'active'
		}

		self.create = function(txid, clbk){

			self.sql.data.insert({
                address : address,
                referrer : referrer,
                txid : txid,
				amount : amount * 100000000,
				level : level,
                reputation : reputation,
                

			},
				(err, results) => {

                    console.log("ERROR", err)

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
        
        self.check = function(address, level){
            var where = {}
			
            where['address'] = {
                v : address,
                r : '='
            }

            where['level'] = {
                v : level,
                r : '='
            }

			self.sql.data.select(
				(err, results) => {

					if(!err){

						clbk(null, (results || []).length)
						
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

		self.all = function(clbk){
			var where = {}
			
				where['deleted'] = {
					v : 'FALSE',
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
		}

	return self;
}

module.exports = Refbonus;