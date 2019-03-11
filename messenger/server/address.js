var address = function(p){
	if(!p) p =  {}

	var self = this;

	
	var devices = {}

	var chats = []

	self.id = p.address

	self.devices = {
		get : devices,

		add : function(user){
			if(!devices[user.id]){
				devices[user.id] = user

				return true
			}

			return false;			
		},

		remove : function(id){
			if (devices[id]){
				
				delete devices[id]

				//remove from online
				_.each(chats, function(chat){

					chat.users.remove(id)
				})
				

				return true
			}

			return false;			
		},
	}

	self.chats = {
		get : chats,

		add : function(chat){

			if(!this.find(chat.id)){
				chats.push(chat)
			}

		},

		find : function(id){
			return _.find(chats, function(c){

				return c.id == id
			})
		}
	}

	self.info = {
		chat : function(id){
			var info = {}

			var chat = self.chats.find(id)

			if (chat){
				info.messages = chat.messages.info(self.id);
				info.users = chat.allow;
				info.online = chat.users.online;
			}

			return info
		},

		chats : function(ids){
			var info = {};

			_.each(ids, function(id){

				info[chat.id] = self.info.chat(chat.id)

			})

			return info
		},

		allchats : function(){
			var info = {};

			_.each(chats, function(chat, id){

				info[chat.id] = self.info.chat(chat.id) 

			})

			return info
		}
	}

	return self
}	

module.exports = address