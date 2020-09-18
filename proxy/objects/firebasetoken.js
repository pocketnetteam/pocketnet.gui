var Obj = require("./object");
var Any = require("./any");

var Firebasetoken = function(p, connect){
	if(!p) p = {};

		p.parameters = _.clone(connect.parameters || {});
		p.name = 	"firebasetoken";
		p.tname = 	"firebasetokens";

	var token = p.token,
		device = p.device,
		address = p.address;
	
	var self = new Obj(p, connect);

		self._status = {
			1 : 'active'
		}

		self.revokeToken = function(clbk){

			var where = {} 

				where['firebasetokens.token'] = {
					v : token,
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

		self.revokeOtherTokens = function(clbk){

			var where = {} 
				where['firebasetokens.device'] = {
					v : device,
					r : '='
				}

				where['firebasetokens.token'] = {
					v : token,
					r : '!='
				}

			self.sql.data.delete((err, results) => {

					clbk(err, results)				

				},
				{
					where : where,
				}
			)

		}

		self.revokeDevice = function(clbk){

			var where = {} 
				where['firebasetokens.device'] = {
					v : device,
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

		self.create = function(clbk){

			self.sql.data.insert({
				token : token,
				device : device,
				address : address
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

		/*self.select = function(p, clbk){

			var where = {}
			
				where['orders.status'] = {
					v : '00000000',
					r : '>'
				}

			var join = [
				{
					type : "RIGHT",
					table : "orderItems",
					on : {
						'orderItems.orderid' : {
							c : self.tname + '.id'
						}
					}
				},
				{
					type : "RIGHT",
					table : "itemExperiments",
					on : {
						'orderItems.id' : {
							c : 'itemExperiments.orderitem'
						}
					}
				},
				{
					type : "LEFT",
					table : "innerTransactions",
					on : {
						'innerTransactions.orderitem' : {
							c : 'itemExperiments.orderitem'
						},
						'innerTransactions.experimentitem' : {
							c : 'itemExperiments.id'
						}
					}
				},
				{
					type : "LEFT",
					table : "images",
					on : {
						'orderItems.resource' : {
							c : 'images.id'
						},
						'orderItems.resourcetype' : {
							c : 'images.type'
						},
					}
				}
			]

			var _set = [

					{
						column : 'orders.owner',
						as : 'owner'
					},
					{
						column : 'orders.date',
						as : 'date'
					},
					{
						column : 'orderItems.orderid',
						as : 'orderid'
					},
					{
						column : 'orders.status',
						as : 'orderStatus'
					},
					'resource',
					'resourcetype',
					//'count',
					'value',

					{
						column : 'innerTransactions.cancellation',
						as : 'cancellation'
					},
					{
						column : 'itemExperiments.type',
						as : 'type'
					},
					{
						column : 'itemExperiments.id',
						as : 'experimentitem'
					},
					{
						column : 'itemExperiments.orderitem',
						as : 'orderitem'
					},
					{
						column : 'images.filename',
						as : 'filename'
					},
					{
						column : 'images.name',
						as : 'imagename'
					},
					{
						column : 'images.date',
						as : 'imagedate'
					},

				]

			if(p.orderId) 	where['orders.id'] = p.orderId;
			if(p.user) 		where['orders.owner'] = p.user.data.id;
			if(p.status)	where['orders.status'] = p.status;
			if(p.joinadd) 	join = join.concat(p.joinadd);
			if(p.setadd) 	_set = _set.concat(p.setadd);

		
			self.sql.data.select(
				(err, results) => {

					console.log("SELECT CLBK", err)

					if(!err){

						var ungroup = results;

						if(p.groupBy)
							results = groupBy(results, p.groupBy, p.groupByParams);

						if(p.cost){

							var onid = groupBy(ungroup, 'orderid');

							_.each(onid, function(orderData, id){
								self.cost(onid[id].items);
							})
						}

						clbk(null, results, ungroup)
						
					}
					else
					{
						clbk(err, null)
					}

				},
				{
					set : _set,
					where : where,
					join : join
				}
			)
		}*/

		self.updateStatus = function(id, status, clbk){
			self.sql.data.update({
				status : status
			},
				(err, results) => {

					clbk(err, results)				

				},
				{
					where : {
						id : id,
					},
				}
			)
		}

		self.all = function(clbk){
			var where = {}
			
				where['deleted'] = {
					v : 'FALSE',
					r : '='
				}

			var _set = [
				'id', 'date', 'device', 'address'
			]

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

module.exports = Firebasetoken;