var user = function(p){
	if(!p) p =  {}

	var self = this;

	self.connection = p.connection || null;
	self.activity = timestamp();
	self.address = p.address || null;
	self.id = p.id || null;
	self.device = p.device || 0;

	return self
}	

module.exports = user