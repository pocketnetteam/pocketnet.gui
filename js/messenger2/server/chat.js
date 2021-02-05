var chat = function(p){

	if(!p) p = {}

	var self = this;

	var users = {};

	var addresses = {};

	self.allow = p.addresses || [];
	self.ini = p.ini || null;

	self.id = p.id || null;

	self.get = {
		allAddresses : function(){
			var all = {};

			_.each(self.allow, function(address){
				all[address] = 0
			})

			_.each(addresses, function(i, address){
				all[address] = i
			})

			return all
		}
	}

	self.messages = {
		count : {},
		readed : {},
		storage : [],

		add : function(m){
			this.storage.push(m);

			if (this.storage.length > 50){
				this.storage.splice(0, this.storage.length - 50)
			}
			
		},

		adds : function(ms){
			var s = this.storage

			_.each(ms, function(m){

				m.m = decodeURIComponent(m.m)

				s.push(m);
			})

			this.storage = _.sortBy(this.storage, function(msg){

				if(!msg.tm) return false

				var t = msg.tm

				if(msg.tm.length == 17) msg.tm = t + '0'

				return Number(msg.tm)
		
			})

			if (this.storage.length > 50){
				this.storage.splice(0, this.storage.length - 50)
			}
			
		},

		read : function(id){
			self.messages.readed[id] || (self.messages.readed[id] = 0)

			self.messages.readed[id]++
		},

		readAll : function(id){
			self.messages.readed[id] = this.allcount() - (self.messages.count[id] || 0)
		},

		info : function(address){
			return {
				count : this.allcount(),
				unreaded : this.allcount() - (self.messages.count[address] || 0) - (this.readed[address] || 0),
				readed : this.readed[address],

				_c : this.count,
				_r : this.readed
			}
		},

		get : function(){
			return this.storage
		},

		allcount : function(){
			return _.reduce(this.count, function(m, c, a){
				return m + c
			}, 0)
		}
	}

	self.addresses = {
		get : addresses,

		add : function(address){
			addresses[address] || (addresses[address] = 0)
			addresses[address] ++
		},

		remove : function(address){

			addresses[address] || (addresses[address] = 1)
			addresses[address] --


			if(!addresses[address]){
				delete addresses[address]
			}
		}
	}

	self.users = {
		add : function(user){

			if(self.allow == 'all' || !self.allow.length || _.indexOf(self.allow, user.address) > -1){

				if(!users[user.id]){
         			users[user.id] = user

         			return true
         		}

         			

			}
			else
			{
				return false
			}

		},

		remove : function(id){

			if (users[id]){

				self.addresses.remove(users[id].address)
				
				delete users[id]

				return true

			} 

			return false;
		},

		online : function(){

			var online = []

			_.each(self.users, function(u, id){

				online.push({
					id : id,
					address : u.address
				})

			})

			return online
		},

		get : users
	}

	return self
}

module.exports = chat