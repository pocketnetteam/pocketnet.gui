const pg = require('pg');

var db = function(p){
	var self = this;

		self.key = "";

	var addPhrase = function(phrases, val){
		if(val) phrases.push(val);
	}

	self.query = function(query, argsArray, callback){

	    self.pool.connect((err, client, done) => {
	    	
	        if (err) {
	            done();
	            callback(err);

	            return;
	        }

	        client.query(query, argsArray, (err, results) => {
	            done(); 
	            callback(err, results); 
	        });
	    });
	}

	self.crypt = function(name){

		if(_.isArray(name)){
			var crynames = []

			_.each(name, function(_name){

				crynames.push(self.crypt(_name));
			})

			return crynames;
		}

		if(name.indexOf('.') > -1){
			var n = name.split(".");

			return self.key + n[0] + "." + self.key + n[1]
		}

		return self.key + name;
	}

	self.uncrypt = function(cryname){

		if(_.isArray(cryname)){
			var uncrynames = []

			_.each(cryname, function(_name){
				uncrynames.push(self.uncrypt(_name));
			})

			return uncrynames;
		}

		return cryname.substr(self.key.length);
	}

	self.stor = function(value, values){

		var _value = value.c || value.v || value;

		if(typeof value.c == 'undefined')
		{

			if(typeof values != 'undefined' && _.isArray(values)){
				_value = "$" + values.push(_value);				
			}
		}
		else
		{
			_value = self.crypt(_value);
		}

		return _value;
	}

	self.wstor = function(value, values){
		if(typeof value.c != 'undefined'){

			return self.stor(value, values) + " " + (value.r || '') + " " + self.stor(value.c, values)

		}
		else
		{
			return self.stor(value, values);
		}
	}

	self.logicalCondition = function(obj, p){

		if(!p) p = {};

		var lastkey = '';

		var translate = {
			value : function(val){
				if(!_.isObject(val)) 
				{
					val = {
						v : val
					}
				}

				return self.crypt(lastkey) + " " + (val.r || "=") + " " + self.stor(val, p.values);
			},
			object : function(obj){
				var sqlpart = '';

				_.each(obj, function(val, index){
					lastkey = index;

					sqlpart += action(val, true) + " AND ";
				})	

				return sqlpart.substr(0, sqlpart.length - 4);
			},
			array : function(arr){
				var sqlpart = '';

				_.each(arr, function(val, index){
					sqlpart += action(val, true) + " OR ";
				})	

				return sqlpart.substr(0, sqlpart.length - 3);

			}
		}

		var action = function(obj, secondlevel){
			
			var sqlpart = '';

			if(isVal(obj))
			{
				sqlpart += translate.value(obj);
			}
			else
			if(_.isArray(obj))
			{
				var part = translate.array(obj);

				if(!secondlevel && obj.length > 1) part = brackets(part);

				sqlpart += " " + part;
			}
			else
			{
				var part = '',
					_sub = false;

				_.each(self.subqueries, function(sub, index){

					if(obj[index]){
						part = sub(obj[index], p);
						_sub = true;

					}

				})


				if(!_sub)
				{
					part = translate.object(obj);
					if(secondlevel && _.toArray(obj).length > 1) part = brackets(part);
				}


				sqlpart += " " + part;
			}

			return sqlpart;
		}

		return action(obj);

	}

	self.arranges = {
		select : ['set', 'from', 'join', 'where', 'groupBy', 'having', 'orderBy', 'limit']
	}

	self.subqueries = {
		in : function(obj, p){
			return "\n" + self.tools.subquery(obj, p , 'IN');
		},

		notin : function(obj, p){
			return self.tools.subquery(obj, p, true, 'NOT IN');
		},

		exist : function(obj, p){
			return "\n" + self.tools.subquery(obj, p , 'EXIST');
		},

		notexist : function(obj, p){
			return self.tools.subquery(obj, p, true, 'NOT EXIST');
		},
	}

	self.tools = {
		/**
		 * 	
		 * @param  {[object]} obj [example : {
		 *                           		age : {
		 *                           			v : 12,
		 *                           			r : '<>' // if not exist -> '='	
		 *                           		},
		 *                           		name : [
		 *                           			{
		 *                           				v : 'max'
		 *                           			},
		 *                           			{
		 *                           				v : 'ira'
		 *                           			}
		 *                           		]
		 *                            	}]
		 * @return {[string]}        [sql part]
		 */
		where : function(obj, p){	
			if(!obj) return '';
			if(!p) p = {};

			var sql = '';

		/*
		
		 */
			//WHERE (fd = 5 AND (gt = 6 OR hy = 7)) OR (r = 5 AND gt = 5)


			if (obj && !_.isEmpty(obj))
			{
				sql = "\nWHERE" + self.logicalCondition(obj, p);
			}

			return sql;
		},

		having : function(obj, p){	
			if(!obj) return '';
			if(!p) p = {};

			var sql = '';

		/*
		
		 */
			//WHERE (fd = 5 AND (gt = 6 OR hy = 7)) OR (r = 5 AND gt = 5)


			if (obj && !_.isEmpty(obj))
			{
				sql = "\nHAVING" + self.logicalCondition(obj, p);
			}

			return sql;
		},

		groupBy : function(obj, p){
			if(!obj) return '';

			if(!_.isArray(obj)) obj = [obj];

			var sql = ' GROUP BY ' + obj.join(", ");

			return sql;
		},
		/**
		 * [limit description]
		 * @param  {[object]} obj [{
		 *                        	count,
		 *                        	offset // LIKE postgessql
		 * }]
		 * @param  {[object]} p  [settings]
		 * @return {[type]}     [sql part]
		 */
		limit : function(obj, p){
			if(!obj) return '';

			if(!p) p = {};

			if(!_.isObject(obj)) obj = {count : obj}

			var sql = ' LIMIT';

				sql += " " + self.stor(obj.count, p.values);

			if (obj.offset) 

				sql += " " + self.stor(obj.offset, p.values);

			return "\n" + sql;
		},
		orderBy : function(obj){

			if(!obj) return '';

			var sql = ' ORDER BY';

			var by = obj.by;

			if(!_.isArray(by)){
				by = [by];
			}

			sql += " " + self.crypt(by.join(", "));

			if(obj.order) sql+= " " + obj.order.toUpperCase();

			return "\n" + sql;
		},

		from : function(from){

			from = primitiveToArray(from);

			return " FROM " + self.crypt(from).join(", ");
		},

		subquery : function(obj, p, inphrase){

		
			var sql = ' ' + obj.expression + " " + inphrase;

			if(obj.values){
				sql += " " + brackets(obj.values.join(", "));
			}
			else
			if(obj.select)
			{
				sql += " " + brackets(self.tools.select(obj.select, p));
			}

			return sql;
		},

		delete : function(p){

			if(!p) p = {};

			var sql = "DELETE FROM";
				sql += " " + self.crypt(p.table);

				sql += self.tools.where(p.where, p);

				console.log(sql, p)

			return sql;

		},

		select : function(obj, p){
			if(!p) p = {};

			var sql = "SELECT";

			_.each(self.arranges.select, function(key){

				if(self.tools[key])
				{
					var part = self.tools[key](obj[key], p);
					sql += part;
				}
			})

			return sql;
		},

		update : function(obj, p){
			if(!p) p = {};

			var sql = "UPDATE";
			
				sql += " " + self.crypt(p.table);

				sql += self.tools.updateSet(obj, p.values);

				sql += self.tools.where(p.where, p);

				sql += self.tools.returning(p.returning);

			return sql;

		},

		updateSet : function(obj, values){
			var sql = " ";

			var parts = [];

			_.each(obj, function(value, column){

				parts.push(" " + self.crypt(column) + " = " + self.wstor(value, values));

			})

			return " SET" + parts.join(", ");
		},

		set : function(obj){

			var sql = " ";

			if(!obj) sql += "*";

			else
			{

				var parts = [];

				var action = function(obj){

					actionsByType(obj, {

						value : function(value){
							parts.push(self.crypt(value));
						},

						array : function(array){
							_.each(array, function(obj){
								return action(obj);
							})
						},

						object : function(obj){
							parts.push(" " + self.crypt(obj.column) + " AS " + obj.as);
						}

					})

				}

				action(obj);

				sql += parts.join(", "); 
			}

			return sql;
		},

		/**
		 * [join description]
		 * @param  {[type]} obj [example : 
		 *                      	[{
		 *                      		type : "LEFT",
		 *                      		inner : true,
		 *                      		table : "images",
		 *                      		on : {
		 *                      			
		 *                      		}
		 *                      	}]
		 *                      ]
		 * @return {[type]}     [description]
		 */
		join : function(obj){


			if(!obj) return '';

			var sql = "\n\t",
				joinParts = [];


			var action = function(obj){

				actionsByType(obj, {

					array : function(array){
						_.each(array, function(obj){
							return action(obj);
						})
					},

					object : function(obj){

						var innerouter = '';
						var phrases = [];						

						if(!obj.type && obj.inner) innerouter = "INNER";
						if(obj.type  && obj.type != "CROSS" && obj.inner === false) innerouter = "OUTER";

						addPhrase(phrases, obj.type);
						addPhrase(phrases, innerouter);
						addPhrase(phrases, "JOIN");						
						addPhrase(phrases, self.crypt(obj.table));

						if(obj.on){
							addPhrase(phrases, 'on');
							addPhrase(phrases, self.logicalCondition(obj.on));
						}

						addPhrase(joinParts, phrases.join(" "));
					}

				})
			}

			action(obj);

			return sql + joinParts.join("\n\t");

		},
		
		insert : function(obj, p){
			var sql = "INSERT INTO " + self.crypt(p.tname);

				sql += self.tools.keys(p.values)

				sql += self.tools.values(p.values)

				sql += self.tools.returning(p.returning)

			return sql;
		},
		keys : function(values){
			if(_.isArray(values))
			{
				values = values[0]
			}

			return " " + brackets(self.crypt(values.keys).join(", "));
		},
		values : function(values){
			var sql = " VALUES";

			if(_.isArray(values))
			{
				var m = _.map(values, function(v){

					return brackets(v.indexes.join(", "));

				})

				sql += " " + m.join(", ");
			}
			else
			{
				sql += " " + brackets(values.indexes.join(", "));
			}

			return sql;

			
		},
		returning : function(returning){

			if(!returning) return '';

			if(!_.isArray(returning)) returning = [returning];

			return " RETURNING " + returning.join(", ");

		},
		create : function(_columns, p){
			var sql = "CREATE TABLE IF NOT EXISTS " + self.crypt(p.tname);

			var columns = [];
			var primary = {}
			
			_.each(_columns, function(c, index){
				if((c.constraints || []).indexOf('PRIMARY KEY') > -1){
					primary[index] = c
				}
			})

			if(_.toArray(primary).length > 1){
				_.each(primary, function(c){
					removeEqual(c.constraints, 'PRIMARY KEY')
				})
			}

			_.each(_columns, function(column, index){

				var columnsqul = ""

				columnsqul += self.crypt(index) + " " + column.type;

				if(column.size) columnsqul += brackets(column.size)

				if(column.constraints) {
					columnsqul += " " + column.constraints.join(' ');
				}

				if(typeof column.default != 'undefined') 
					columnsqul += " DEFAULT " + column.default;

				columns.push(columnsqul);
			})


			if(_.toArray(primary).length > 1){

				var map = _.map(primary, function(c, i){
					return i
				})

				columns.push('CONSTRAINT '+self.crypt(p.tname)+'_pkey PRIMARY KEY ('+map.join(', ')+')')
			}

			sql += " " + brackets(columns.join(", "));


			return sql;
		},
		drop : function(p){
			var sql = "DROP TABLE IF EXISTS " + self.crypt(p.tname);

			return sql;
		}
	}

	self.init = function(){

		self.pool = new pg.Pool(p.db);

	}

	self.check = function(callback){
		self.pool.connect((err, client, done) => {
	    	
	        if (err) {
	            done();
	            callback(err);

	            return;
			}
			
			done();
			callback();
	    });
	}

	self.destroy = function(){

		return pool.end()

	}

	return self;
}

module.exports = db;