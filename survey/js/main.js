var serverPath = 'https://rixtrema.net/RixtremaWS/AJAXPCT.aspx';
var sendt = 
{
	action : 'GETQUESTIONNAIREANSWERS',
}
function fresp(item) {
	if ('UID' in item && item.UID == "pocketnetuid") {
		return true;
	} else {
		return false;
	}
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