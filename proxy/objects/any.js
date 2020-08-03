var Obj = require("./object");
var schemas = require("./schemas");

var toPlural = function(name){

	var exceptions = {

	} 

	if(exceptions[name]) return exceptions[name];

	return name + "s";
}

var any = function(p, connect){
	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});

	var self = new Obj(p, connect);


	if(!self.tname){
		self.tname = toPlural(self.name);
	}

	
	setId(self.schema.columns);

	return self;
}

module.exports = any;