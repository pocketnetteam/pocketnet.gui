var schemas = require("./schemas");

var Obj = function(p, connect) {
	if(!p) p = {};

	var self = this;
		self.name = p.name || '';
		self.tname = p.tname || '';
		self.parameters = p.parameters || {};
		self.p = connect;
		self.schema = schemas[self.name] || {
			columns : {},
			
		};


	self.tools = {
		schema : {
			columns : {
				find : function(eq){

					var r = _.filter(self.schema.columns, function(column){

						if(isEqual(column, eq)) return true;

					})

					return r;

				}
			}
		},
		sql : {
			objToValues : function(obj, p, beginindex){
				if(!p) p = {};

				var schema = self.schema.columns;


				if(_.isArray(obj)){
					var _r = [];

					_.each(obj, function(obj, i){

						var index = 1;

						if (i > 0){
							index = _r[i - 1].lastIndex;
						}

						_r.push(self.tools.sql.objToValues(obj, p, index ))
					})

					return _r;
				}

				var a = _.toArray(obj);

				if(p.filter)
				{
					if(p.filter.notEqual)
						schema = self.filters.notEqual(schema, p.filter.notEqual);
				}

				var r = {
					keys : _.keys(schema),
					indexes : [],
					values : a
				}

				var index = beginindex || 1;

				_.each(schema, function(column, key){

					if(typeof obj[key] == 'undefined')
					{				
						r.indexes.push("DEFAULT");				
					}

					else
					{
						r.indexes.push("$" + index);
						index++;
					}
					
				})

				r.lastIndex = index;

				return r;
			},
			objOrKeyToValues : function(obj, p){

				if(_.isObject(obj)){

					return objToValuesForSQL(obj, p);

				}
				else
				{
					var c = self.tools.schema.columns.find({
						constraints : ["PRIMARY KEY"]
					})

					if(c.length == 1){

						var _obj = {};

						_onj[c[0].id] = obj;

						return objToValuesForSQL(_obj, p);
					}
				}
			},
			tableNames : function(p, arrange){

				var tnames = [];

				_.each(arrange, function(index){

					if(!p[index]) return;

					if (index == 'from'){
						tnames = tnames.concat(primitiveToArray(p.from));

						return;
					}

					tnames = tnames.concat(getAllValuesByKey(p[index], ['table', 'from']));		
					
				})

				return tnames;
			},
			replaceTableNames : function(tableNames, sql , values){
			
				_.each(tableNames, function(tname, index){

					sql = sql.replaceAll("_t" + (index + 1), tname);


					if(values){

						_.each(values, function(value, _index){

							if (value.replaceAll)

								values[_index] = value.replaceAll("_t" + (index + 1), tname);
							
						})

					}

				})

				return sql;
			},
			valuesToArgs : function(values){

				if(_.isArray(values))
				{
					var args = [];

					_.each(values, function(v){

						_.each(v.values, function(v){
							args.push(v)
						})

					})

					return args;
				}
				else
				{
					return values.values
				}

			}
		},	
	}

	self.filters = {
		bySchema : function(obj, p){
			if(!p) p  = {}


			if(_.isArray(obj))
			{
				var aObj = [];

				_.each(obj, function(obj){
					aObj.push(self.filters.bySchema(obj))
				})

				return aObj;
			}

			var _obj = {};

			_.each(obj, function(value, key){

				if(p.keyTransform) key = self.p.db.uncrypt(key);

				var column = self.schema.columns[key];

				if(p.filter && typeof column != 'undefined' && !p.filter(column, value, key)) return;

				_obj[key] = value;

			})		

			return _obj;
		},
		notEqual : function(obj, c){

			var _obj = {};

			_.each(obj, function(value, key){

				var column = self.schema.columns[key]

				if(column && isEqual(column, c)) return;

				_obj[key] = value;

			})		

			return _obj;
		}
	}

	self.prepare = {
		select : function(results){
			if(!results.rows || _.isEmpty(results.rows)) return [];

			var rows = [];

			_.each(results.rows, function(row, index){

				row = self.filters.bySchema(row, {

					filter : function(column){

						if(column.export) return true;

					},
					keyTransform : true

				})

				rows.push(row)
			})

			return rows;
		}
	}

	self.sql = {
		table : {
			drop : function(clbk, p){

				if(!p) p = {};

				p.tname || (p.tname = self.tname);

				var sql = self.p.db.tools.drop(p)

				self.p.db.query(sql, [], function(err, results){

					if (err) err.status = 602;

					if (clbk)

						clbk(err, results);

				});
			},
			create : function(clbk, p){

				if(!p) p = {};

				p.tname || (p.tname = self.tname);

				var sql = self.p.db.tools.create(self.schema.columns, p)


				self.p.db.query(sql, [], function(err, results){

					if (err) err.status = 601;

					if (clbk)

						clbk(err, results);

				});
			}
		},
		data : {
			insert : function(obj, clbk, p){
				if(!p) p = {};

				obj = self.filters.bySchema(obj);

				p.values = self.tools.sql.objToValues(obj);
				p.tname || (p.tname = self.tname);

				var sql = self.p.db.tools.insert(obj, p);

				console.log(sql, self.tools.sql.valuesToArgs(p.values))

				self.p.db.query(sql, self.tools.sql.valuesToArgs(p.values), function(err, results){

					var data = null;

					if (err) err.status = 603;	
					else data = self.prepare.select(results);

					if (clbk)

						clbk(err, data);

				});
			},
			delete : function(clbk, p){

				if(!p) p = {};

				p.table || (p.table = self.tname);
				p.values = [];

				sql = self.p.db.tools.delete(p);

				self.p.db.query(sql, p.values, function(err, results){

					if (err) err.status = 606;

					if (clbk)
					{
						clbk(err, results);
					}

				});
			},
			update : function(obj, clbk, p){

				if(!p) p = {};

				p.values = [];

				p.table || (p.table = self.tname);

				obj = self.filters.bySchema(obj);

				sql = self.p.db.tools.update(obj, p);
	

				self.p.db.query(sql, p.values, function(err, results){

					var data = null;

					if (err) err.status = 605;
					else data = self.prepare.select(results);

					if (clbk)
					{
						clbk(err, data);
					}

				});

			},
			select : function(clbk, p){

				if(!p) p = {};
				p.from || (p.from = self.tname);				

				var values = [];

				var tableNames = self.tools.sql.tableNames(p, self.p.db.arranges.select);

				p.where || (p.where = {});


				sql = self.p.db.tools.select(p, {
					values : values
				});

				sql = self.tools.sql.replaceTableNames(tableNames, sql, values);	

				self.p.db.query(sql, values, function(err, results){

					var data = null;

					if (err) err.status = 604;	
					else data = self.prepare.select(results);


					if (clbk)
					{
						clbk(err, data);
					}

				});

			}
		}
		
	}

	return self;
}

module.exports = Obj;