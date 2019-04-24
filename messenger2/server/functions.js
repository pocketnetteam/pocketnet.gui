deep = function(obj, key){
	var  _key = key.split(".");

	var tkey = _key[0];

	if(typeof obj == 'undefined' || !obj) return undefined;

	if(typeof obj[tkey] != 'undefined')
	{
		_key.splice(0, 1);

		if(_key.length == 0)
		{
			return obj[tkey];
		}
		else
		{
			return deep(obj[tkey], _key.join("."))
		}
	}
	else
	{
		return undefined;
	}
}

retry = function(_function, clbk, time, notClear){
	if(!time) time = 20;

	var interval = setInterval(function(){

		if(_function()){

			if(!notClear)
				clearInterval(interval);

			if(clbk) clbk();

		}
		
	}, time);

	return interval;
}

timestamp = function(){
	return new Date().getTime();
}

addZero = function(n){
	
	if (Number(n) < 10)
	{
		n = "0" + n;
	}

	return n;
	
}

dateToStrUTCSS = function (d) {
	var now = d || new Date();

	var M = addZero((now.getUTCMonth() + 1).toString());

	var d = addZero(now.getUTCDate().toString());

	var y = addZero(now.getUTCFullYear().toString());

	var h = addZero(now.getUTCHours().toString());

	var m = addZero(now.getUTCMinutes().toString());

	var s = addZero(now.getUTCSeconds().toString());

	var S = addZero(now.getUTCMilliseconds().toString());


	return y + M + d + h + m + s + S;
}

parameters = function(uri, split){

	if(!uri && typeof window != 'undefined') {

		if(_SEO)
		{
			uri = _SEOuri.split('?')[1];
		}

		else
		{
			uri = window.location.search.substr(1);
		}

		
	}
	else{
		if(split){

			var up = uri.split('?');

			if (up[1]){
				uri = up[1];
			}
			else{
				uri = ''
			}

			
		}
	}

	if(/^([A-Za-z0-9]*)$/.test(uri)) return uri || {};

	var r = {};
	uParts = uri.split('&');
	for (p in uParts)
	{	
		uParts[p] = uParts[p].split('=');

		var p2 = _.clone(uParts[p]);

		p2.splice(0, 1);

		try{
			r[uParts[p][0]] = decodeURI(p2.join("=").replace(/!!/g, "&"));
		}
		catch (e){

		}

		
	}

	return r;
}

hexEncode= function(text)
{
    var ch = 0;
    var result = "";
    for (var i = 0; i < text.length; i++)
    {
        ch = text.charCodeAt(i);
        if (ch > 0xFF) ch -= 0x350;
        ch = ch.toString(16);
        while (ch.length < 2) ch = "0" + ch;
        result += ch;
    }
    return result;
}
hexDecode= function(hex)
{
    var ch = 0;
    var result = "";
    hex = trim(hex);
    for (var i = 2; i <= hex.length; i += 2)
    {
        ch = parseInt(hex.substring(i - 2, i), 16);
        if (ch >= 128) ch += 0x350;
        ch = String.fromCharCode("0x" + ch.toString(16));
        result += ch;
    }
    return result;
} 

trim = function(s)
{

  return rtrim(ltrim(s));
}

ltrim = function(s)
{
  return (s || "").replace(/^\s+/, ''); 
}

rtrim = function(s)
{
  return (s || "").replace(/\s+$/, ''); 
}

collectParameters = function(uParts, exclude){
	var uri ='?'; 

	_.each(uParts, function(part, _part){
		if((!exclude || _.indexOf(exclude, _part) == -1) && part)
		{
			uri += _part + '=' + part + '&'; 
		}
	})

	uri = uri.slice(0, -1);

	return uri;
}

rand = function(min, max){
	min = parseInt(min);
	max = parseInt(max);
	return Math.floor( Math.random() * (max - min + 1) ) + min;
}