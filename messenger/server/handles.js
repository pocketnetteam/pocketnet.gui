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

		relayed : {
			address : {
				action : function(connect){
					var a = connect.parameters.address;
					var r = connect.relay;

					var result = {
						direct : [],
						relay : []
					}

					if (r[a]){
						_.each(r[a], function(chats, from){

							if(connect.users[from]){

								var rchats = _.map(chats, function(c, k){

									if(connect.chats[k]){
										return {
											chatid : k,
											addresses : connect.chats[k].allow
										}
									}
									else
									{
										return null;
									}

									
								})

								rchats = _.filter(rchats, function(r) {return r})


								result.direct.push({
									id : from,
									address : connect.users[from].address,
									chats : rchats
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
												id : p.connect.devices[device],
												address : p.connect.users[p.connect.devices[device]].address
											}
										}

									})

									if(!_.isEmpty(online)){

										var candidate = _.max(online, function(d){
											return d.number
										})

										candidate.chatid = chatid
										candidate.from = from

										result.relay.push(candidate)

									}

									


									/// connect with candidate

								})
							}

						})
					}

					response(null, result, connect)
					
				}
			}
		}

		
	}
}



_.each(handles, function(handle, index){

	exports[index] = handle

})