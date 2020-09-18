var Obj = require("./object");
var Any = require("./any");

var Bonus = function(p, connect){
	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});
		p.name = 	"bonus";
		p.tname = 	"bonuses";

    var address = p.address, 
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
        
        self.best = function(clbk){

            var sql = '';
            
            sql += 'SELECT * '
            sql += 'FROM ('

                sql += 'SELECT *, rank() OVER (PARTITION BY address ORDER BY level DESC) n '
                sql += 'FROM ' + connect.db.crypt(p.tname)

            sql += ' ) A WHERE n=1'

            connect.db.query(sql, [], function(err, results){

                if (err) err.status = 604;

                if (clbk)

                    clbk(err, deep(results, 'rows'));
            })


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
			}

		}

	return self;
}

module.exports = Bonus;