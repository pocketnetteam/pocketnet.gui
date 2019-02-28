function message(message, func){
	$("<div/>", {
      "class": "message remove_now",
	  "style": "opacity:0",
      text: message
	  }).appendTo("body")
	    .animate({ opacity: 1 }, 200);
	
	setTimeout(function() { 
		$('.remove_now').animate({ opacity: 0 }, 500);

		if (typeof func === 'function')
			func();
		setTimeout(function() { 
			$('.remove_now').detach(); }
		, 500)
	}, 2200)
}

var scrollUp = function(scroll){
	$("body,html").animate({ scrollTop: scroll }, 200);
}

var messageInC = function(_p){
	if(!_p) _p = {};

	var text = _p.text || 'There not data for this page';

	var h = "<div class='errordata'><div class='textWr'><div class='text'>"+text+"</div></div></div>"
	
	_p.el.append(h);
	_p.el.fadeIn(200);
}
function goTo(el){
	var scroll = $(this).offset().top;
	$('body,html').animate({scrollTop:scroll},300);
}
function progressBar(p){
	if(!p && !p.el) return;

	console.log(p)

	if(!p.progress || p.progress >= 100) 	p.progress = 0;
	if(!p.status   || p.progress >= 100) 	p.status = '';

	p.el.find('.bar').width(p.progress + '%');
	p.el.find('.status').html(p.status);
}
function preloader(key, el){
	if(!el)
		var el = $('#loader-wrapper');

	if(key === false)
		el.fadeOut(200);
	else
		el.fadeIn(50);
}
var importScripts = function(src, storage, callback, appendTo, i){
	if(typeof i == 'undefined') 
		i = 0;
	else
		i++;

	if(i == src.length) callback();
	else{
		if(!storage[src[i]])
		{
			importScript(src[i], function(){
				storage[src[i]] = true;
				importScripts(src, storage, callback, appendTo, i);
			}, appendTo);
		}
		else
		{
			importScripts(src, storage, callback, appendTo, i);
		}
		
	}
}
var importScript = function(src, callback, appendTo) {
    var script = document.createElement('script');

    if (!appendTo) {
        appendTo = document.getElementsByTagName('head')[0];
    }

    if (script.readyState && !script.onload) {
        // IE, Opera
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    }
    else {
        // Rest
        script.onload = callback;
    }

    script.src = src;
    appendTo.appendChild(script);
}

function changeClass(el){
	var change = el.attr('changeClass'),
		_class = el.attr('class');

		el.attr('changeClass', _class);
		el.attr('class', change);
}

function __m(){
	return $('html').hasClass('mobile');
}

var o = {
	getMethods : function(obj){
		var Obj = {};
		for(prop in obj){
			if( typeof obj[prop] === 'function')
			Obj[prop] = obj[prop];
		}
		return Obj;
	},
	getVars: function(obj){
		var Obj = {};
		for(prop in obj) if (obj.hasOwnProperty(prop)) {
			Obj[prop] = obj[prop];
		}
		return Obj;
	},
	each: function(obj, func){
		for(prop in obj) if (obj.hasOwnProperty(prop)) {
			func(obj[prop], prop);
		}
	},
	filter: function(obj, func){
		var _obj = {};
		for(prop in obj) if (obj.hasOwnProperty(prop)) {

		if(func(obj[prop], prop) === true) _obj[prop] = obj[prop];
		}
		return _obj;
	},
	getArray : function(array, items){
		return _.map(array, function(item){
			return _.map(items, function(i){
				return item[i];
			})
		})
	},
	series: function(data, name){
		var r = _.filter(data, function(item){
			return item.Date !== '';
		})


		if(!_.isArray(name))
			r = _.map(r, function(item){
				if(typeof name != 'object')
					return item[name];
				else
				{
					return name.fun(item[name.val]);
				}
			})
		else
			r = _.map(r, function(item){
				return _.map(name, function(p){

					if(typeof p != 'object')
						return item[p];
					else
					{
						if(!p.val) {return p.fun(item); }
						if(p.fun)
							return p.fun(item[p.val]);
						else
							return item[p.val];
					}
				})
			})

		return r;
	},
	srch : function(obj, func){
		for(prop in obj) if (obj.hasOwnProperty(prop)) {
			if (func(obj[prop], prop) == true) return {value : obj[prop], key : prop}
		}

		return{value : null, key : null}
	},
	search : function(array, fun, num){
		var length = array.length,
			find,
			fnum = 0;
		for(var i = 0; i < length && !find; i++){
			if (fun(array[i], i) === true)
			{
				find = array[i];
				fnum = i;
			}
				
		}
		if(num) return {find : find, num : i};
		return find;
	}
}

var search = function(array, fun){
	var length = array.length,
		find;
	for(var i = 0; i < length && !find; i++){
		if (fun(array[i], i) === true)
			find = array[i];
	}

	return find;
}

Date.prototype.addDays = function( d ) {
   this.setDate( this.getDate() + d ) ;
   return this;
};
String.prototype.replaceAll=function(a,b){return a?this.split(a).join(b):this};

function dateUtc(d)
{
	if (!d) 
		var d = new Date;

		MM = d.getUTCMonth(),
		dd = d.getUTCDate(),
		hh = d.getUTCHours(),
		mm = d.getUTCMinutes(),
		ss = d.getUTCSeconds();

		if(MM < 10) MM = '0' + MM;
		if(dd < 10) dd = '0' + dd;
		if(hh < 10) hh = '0' + hh;
		if(mm < 10) mm = '0' + mm;
		if(ss < 10) ss = '0' + ss;

	return {y : d.getUTCFullYear(), m : MM, d : dd, h : hh, min : mm, s :ss};
}
function AJAX(p) {
	/*---------------------------------------------------------------------------------------*/
	/*   Private Variables
	/*---------------------------------------------------------------------------------------*/
	var self = this,
		user = p.user || false,
		server = p.server || false;

	/*---------------------------------------------------------------------------------------*/
	/*   Init
	/*---------------------------------------------------------------------------------------*/

	$.ajaxSetup({
		// Disable caching of AJAX responses
		cache: false
	});

	var set = {
		user : function(u){
			user = u;
		}
	}

	self.template = function(p){
		var url = '_templates/' + p.url + '.html' || false;
		$.ajax({
			url: url,
			success: function(t){
				template = _.template(t);

				if(!p.data) p.data = false;
				p.el.html(template(p.data));
			}
		});
	}

	self.run = function(p) {
		if(!p) p = {};

		var url = p.url || server,
			dataType = p.dataType || 'json',
			type = p.type || 'POST',
			data = p.data || {};

		/*---------------------------------------------------------------------------------------*/
		
		if (user !== false && (!p.anon || p.anon !== true))
			user.extendAjaxData(data);

		/*---------------------------------------------------------------------------------------*/
		var ajaxSuccessJSON = function(data) {
			if (!data.FCT.Result) {
				message('Unknown server error. Please try again.', p.error);
				return;
			}

			if (data.FCT.Result.toLowerCase() != 'login correct' && data.FCT.Result.toLowerCase() != 'success' && data.FCT.Result.toLowerCase() != 'ok') {	
				message(data.FCT.Result, p.error);	

				setTimeout(function() { 
					if(data.FCT.Result.toLowerCase() == "wrong email or password"){
						user.logout();
					}
				}, 2200)	

				return;
			}	

			if (data.FCT.Warning && data.FCT.Warning != '') {
				message('data.FCT.Warning');
			}

			if (p.success) p.success(data.FCT);
		}
		var ajaxSuccessHTML = function(data) {
			if (p.success) p.success(data);
		}
		/*---------------------------------------------------------------------------------------*/
		if (p.before) p.before();
		if (p.preloader) preloader(true);
		$.ajax({
			type: type,
			url: url,
			data: data,
			dataType: dataType,
			success: function(data){
				if (p.preloader) preloader(false);
				if(dataType == 'json') 
					ajaxSuccessJSON(data);
				else
					ajaxSuccessHTML(data);
			},
			error: function(r, s, e) {
				if (p.preloader) preloader(false);
				if (r.responseText) message(s, p.error);

			},
		});
	}
	self.set = set;

	return self;
}

Number.prototype.toFormatString = function(n, x, s, c, d, p) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    var ret = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    if (d) ret = ('$' + ret).replace('$-', '-$');
    if (p) ret += '%';
    return ret;
};
function numFormat(num) {
	var retNumber = 0;

	num += '';
	num = num.replaceAll(' ', '').replace(/\xA0/g, '');
	if (num && num.length > 0 && isNumber(num)) {
		if (num.indexOf(",")>=0) { //  && num.indexOf(".")>=0
			retNumber = num.replace(/\s+/g,"").replaceAll(",","");
		} else if ((num.match(/,/g) || []).length > 1) {
			retNumber = num.replace(/\s+/g,"").replaceAll(",","");
		} else {
			retNumber = num.replace(/\s+/g,"").replaceAll(",",".");
		}
	} else {
		retNumber = 0;
	}

	return retNumber * 1;
}
function isNumber(a){
	var b=a;
	if ((b+'').indexOf(',')>=0)
	 b=b.replaceAll(',','');
	return !isNaN(parseFloat(b)) && isFinite(b);
}
globalEval = function( data ) {
	if ( data && jQuery.trim( data ) ) {		
		return window[ "eval" ].call( window, data );
	}
}

function parameters(uri, split){
	if(!uri) uri = window.location.search.substr(1);
	else{
		if(split)
			uri = uri.split('?')[1];
	}

	if(/^([A-Za-z0-9]*)$/.test(uri)) return uri || {};

	var r = {};
	uParts = uri.split('&');
	for (p in uParts)
	{	
		uParts[p] = uParts[p].split('=');
		r[uParts[p][0]] = decodeURI(uParts[p][1]);
	}

	return r;
}
function collectParameters(uParts, exclude){
	var uri ='?'; 
	_.each(uParts, function(part, _part){
		if(!exclude || _.indexOf(exclude, _part) == -1)
		{
			uri += _part+'='+part+'&'; 
		}
	})
	uri = uri.slice(0, -1);
	return uri;
}

function aoaction(v, f){
	if(_.isArray(v) === true) _.each(v, function(_v){
			if(f.array) f.array(_v);
			if(f.all) f.all(_v);
		})
	else{
		if(f.single) f.single(v);
		if(f.all) f.all(v);
	}
}
function before(el, h){
	$(el).before(h);
}
function after(el, h){
	$(el).after(h);
}
function html(el, h){
	$(el).html(h);
}

function append(el, h){
	$(el).append(h);
}

function prepend(el, h){
	$(el).prepend(h);
}
function cc(){
	var r=Math.floor(Math.random() * (256));
	var g=Math.floor(Math.random() * (256));
	var b=Math.floor(Math.random() * (256));

	var c='rgb(' + r +',' + g + ',' + b +')';

	return c;
}
function rand (min, max)
{
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}
/*
	fun.
*/
var functions = function(obj){
	var funs = {};
	_.each(obj, function(prop, name){
		if(typeof prop === 'function') funs[name] = prop;
 	})
 	return funs;
}
var lazyeach = function(p){

	var collection = [];
	if(!_.isArray(p.collection)) {
		collection.push(p.collection);
	}
	else{
		collection = p.collection;
	}
	if(typeof p._function != 'function') return;

	
	var	_function = p._function;

	var params = p.args || {};
	var param = p.name || 'item';

	var l = collection.length,
		i = {};

	var progress = 0;
	var funs = functions(params);

	if(p.beforeAll) p.beforeAll();

	_.each(collection, function(item){
		if(p.beforeEach) p.beforeEach(item);

		var _params = _.clone(params);

		 _.each(funs, function(f, name){
			_params[name] = function(args){
				if(!i[name]) i[name] = 0;

				i[name]++;

				var progress = _.reduce(i, function(sum, value){
					return sum + value;
				}, 0)

				f(args, {p : progress, i : i[name], l : l});

				if(progress == l)
					p.afterAll({
						collection : collection
					});
			}
		})
		
		_params[param] = item;
		_params[progress] = progress;
		_function(_params);
	})
}

var editable = function(p)
{
	var prevText;
	if(!p) p = {};
	if(!p.el) return;

	p.el.wrap("<div class='editable "+p.class+"'></div>");
	p.el.addClass("editEl");
	var edit = p.el.closest('.editable');
	edit.append("<div class='editForm'><input type='text' value='"+p.el.text()+"'></div>\
				 <label><div class='editButton edt'><i class='fa fa-pencil'></i></div>\
				 <div class='editButton success'><i class='fa fa-check'></i></div>\
				 <div class='editButton fail'><i class='fa fa-times'></i></div></label>");

	edit.find('.edt').on('click', function(){
		prevText = p.el.text();
		edit.find('input').val(prevText);

		edit.addClass('editNow');
	})

	edit.find('.success').on('click', function(){
		var val = edit.find('input').val();
		p.el.text(val);
		edit.removeClass('editNow');

		if(p.success) p.success(val);
	})

	edit.find('.fail').on('click', function(){
		if(p.fail) p.fail(prevText);
		p.el.text(prevText);
		edit.removeClass('editNow');
	})
}
var wnd = function(p){
	if(!p) p = {};
	var self = this,
		template = p.template || null,
		path = p.path || null,
		storage = p.storage || null,
		html = p.html || null,
		data = p.data || null,
		el = p.el || $('body');



	var wnd;

	if(p.module)
	{
		path = p.module.pathlong;
		storage = p.module.templates;
	}

	var find = function(s){
		if (wnd)
			return wnd.find(s);
	}

	var render = function(tpl){
		var h = '<div class="wnd"><div class="wndback"></div><div class="wndinner">\
				 <div class="wndheader">'+p.header+'</div>\
				 <div class="wndcontent">'+tpl(data)+'</div>\
				 <div class="wndclose"><i class="fa fa-times"></i> Close</div></div></div>';
		el.append(h);

		wnd = el.find('.wnd');
		if(p.class) wnd.addClass(p.class);

		wnd.find('.wndcontent').mCustomScrollbar({
	        theme: "light",
	        autoHideScrollbar: false,
	        scrollInertia: 0,
	        contentTouchScroll: true
	    });

	    $('html').addClass('nooverflow');

		wnd.fadeIn(200);
	}

	var initevents = function(){
		wnd.find('.wndclose').one('click', close);
		wnd.find('.wndback').one('click', close);
	}

	var close = function(){
		if(p.close) p.close();
		$('html').removeClass('nooverflow');
		wnd.remove();
	}

	var init = function(){

		if(p.preloader) preloader(true);

		var success = function(tpl){
			if(p.preloader) preloader(false);
			if(p.storage) p.storage[template] = tpl;
			var t = _.template(tpl);

			render(t);

	    	initevents();

			if(p.success) p.success(wnd);
		}


		if(template && path){

			if(p.storage && p.storage[template])
			{
				success(p.storage[template]);
			}
			else{
				var _path = path + '/templates/' + template + '.html';
				$.ajax({
					url : _path,
					type : 'GET',
					dataType : 'html',
					success: success
				});
			}
			
		}
	}

	init();
	self.find = find;
	self.close = close;
	return self;
}/*---------------------------------------------------------------------------------------*/
String.prototype.toNumber=function(){return this&&this.length>0?1*this.replace(/\s+/g,"").replaceAll(",",""):0};
String.prototype.contains=function(){return-1!==String.prototype.indexOf.apply(this,arguments)};


function toDate(str){
	var y = str.substring(0,4),
		m = str.substring(4,6),
		d = str.substring(6,8);

	return Date.UTC(y, m-1, d);
}
function toDateM(str){
	var y = str.substring(0,4),
		m = str.substring(4,6),
		d = str.substring(6,8);

	var ms = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];	


	return y+' '+ms[m-1]+' '+d;
}

