var serverPath = 'https://rixtrema.net/RixtremaWS/AJAXPCT.aspx';
var sendt = 
{
	action : 'GETQUESTIONNAIREANSWERS',
	uid : 'tdfo2109'
}
function fresp(item) {return true;
	return true;
}

$.ajax({
	type: 'POST',
	url: serverPath,
	data: sendt,
	dataType: 'json',
	success: function(r){
		if(r.PCT.Answers) 
		var answers = r.PCT.Answers
			.filter(fresp);
			
			console.log(answers);
	}
});