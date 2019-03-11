var response = function(err, results, p)
{
	if(err)
	{
		p.data = results;
		p.responseFail(err.status || err, p);
	}
	else
	{
		p.data = results;
		p.responseSuccess(p)
	}
}


var handles = {

	info : {

		address : {
			chat : {
				action : function(connect){
					
					var address = connect.rtc.addresses[connect.parameters.address];

					if (address){

						var data = address.info.chat[connect.parameters.chatid]

						response(null, data, connect)
					}
					else
					{
						response(500, "Address hasn't been founded", connect)
					}	
					
				}
			},
			chats : {
				action : function(connect){

					
					var address = connect.rtc.addresses(connect.parameters.address);

					if (address){

						var data = address.info.chats(connect.parameters.ids)

						response(null, data, connect)
					}
					else
					{
						response(500, "Address hasn't been founded", connect)
					}	
					
				}
			},
			allchats : {
				action : function(connect){

					
					var address = connect.rtc.addresses[connect.parameters.address];
					

					if (address){

						var data = address.info.allchats()

						response(null, data, connect)
					}
					else
					{
						response(500, "Address hasn't been founded", connect)
					}	
					
				}
			}
		},

		relay : {
			address : function(){
				var a = connect.parameters.address;
				var r = connect.relay;

				var result = {
					direct : [],
					relay : []
				}

				if (r[a]){
					_.each(r[a], function(chats, from){

						if(connect.users[from]){

							result.direct.push({
								id : from,
								chatid : _.map(chats, function(c, k){
									return k
								})
							})

						}

						else
						{
							_.each(chats, function(devices, chatid){

								var online = {}

								_.each(devices, function(number, device){

									if(!_.isEmpty(p.connect.devices[device])){
										online[device] = {
											number : number,
											devices : p.connect.devices[device]
										}
									}

								})

								var candidate = _.max(online, function(d){
									return d.number
								})


								/// connect with candidate

							})
						}

					})
				}
				
			}
		}

		
	}
}



_.each(handles, function(handle, index){

	exports[index] = handle

})