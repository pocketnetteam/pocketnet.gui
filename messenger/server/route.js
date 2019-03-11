function zip(status, data, p){
	if(!data) data = {};

	var error = p.settings.errors[status];

	if (typeof error == "function") error = error(p)

	var result = {
		statusCode : status,
		status : '',
		data : data,
		token : p.token || null,
		error : error || null
	};

	if(status == 200){
		result.status = "success";
	}
	else
	{
		result.status = "fail";
	}


	return  JSON.stringify(result);
}


function route(p) {

	if(!p) p = {};

	p.responseFail = function(status, p){
		
		p.response.writeHead(status.toString(), p.settings.headers);

		p.response.write(zip(status, p.data, p));

		p.response.end();
	}

	p.responseSuccess = function(response){

		response.status 	|| (response.status = 200);			
		response.headers || (response.headers = {});
		response.headers = _.extend(p.settings.headers, response.headers);

		p.response.writeHead(response.status.toString(), response.headers);
		p.response.write(zip(response.status, response.data, p));
	    p.response.end();	    
	}

	var handle = deep(p.handles, p.pathname)

	if (typeof handle === 'object' && handle.action) {

		p.handle = handle;
		
		p.handle.action(p)

	} 
	else 
	{
		p.responseFail(404, p);		
	}

}

module.exports = route