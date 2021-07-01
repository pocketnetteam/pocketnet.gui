/* PDF */

	var tableAlignmentCenter = function(obj){

		obj.width = 'auto';

		var tobj = {
		    columns: [
		        { width: '*', text: '' },

		        obj,

		        { width: '*', text: '' },
		    ]
		}

		return tobj;
			
	}

/* ______________________________ */

/* DATE */
	var dateFormat = function () {
		var e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, t = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, n = /[^-+\dA-Z]/g, r = function (e, t) {
			e = String(e);
			t = t || 2;
			while (e.length < t)
				e = "0" + e;
			return e
		};
		return function (i, s, o) {
			var u = dateFormat;
			if (arguments.length == 1 && Object.prototype.toString.call(i) == "[object String]" && !/\d/.test(i)) {
				s = i;
				i = undefined
			}
			i = i ? new Date(i) : new Date;
			if (isNaN(i))
				throw SyntaxError("invalid date");
			s = String(u.masks[s] || s || u.masks["default"]);
			if (s.slice(0, 4) == "UTC:") {
				s = s.slice(4);
				o = true
			}
			var a = o ? "getUTC" : "get", f = i[a + "Date"](), l = i[a + "Day"](), c = i[a + "Month"](), h = i[a + "FullYear"](), p = i[a + "Hours"](), d = i[a + "Minutes"](), v = i[a + "Seconds"](), m = i[a + "Milliseconds"](), g = o ? 0 : i.getTimezoneOffset(), y = {d: f, dd: r(f), ddd: u.i18n.dayNames[l], dddd: u.i18n.dayNames[l + 7], m: c + 1, mm: r(c + 1), mmm: u.i18n.monthNames[c], mmmm: u.i18n.monthNames[c + 12], yy: String(h).slice(2), yyyy: h, h: p % 12 || 12, hh: r(p % 12 || 12), H: p, HH: r(p), M: d, MM: r(d), s: v, ss: r(v), l: r(m, 3), L: r(m > 99 ? Math.round(m / 10) : m), t: p < 12 ? "a" : "p", tt: p < 12 ? "am" : "pm", T: p < 12 ? "A" : "P", TT: p < 12 ? "AM" : "PM", Z: o ? "UTC" : (String(i).match(t) || [""]).pop().replace(n, ""), o: (g > 0 ? "-" : "+") + r(Math.floor(Math.abs(g) / 60) * 100 + Math.abs(g) % 60, 4), S: ["th", "st", "nd", "rd"][f % 10 > 3 ? 0 : (f % 100 - f % 10 != 10) * f % 10]};
			return s.replace(e, function (e) {
				return e in y ? y[e] : e.slice(1, e.length - 1)
			})
		}
	}();
	dateFormat.masks = {"default": "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
	dateFormat.i18n = {dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
	
	Date.prototype.addDays = function( d ) {
	   this.setDate( this.getDate() + d ) ;
	   return this;
	};
	Date.prototype.format=function(e,t){return dateFormat(this,e,t)}
	Date.prototype.addMonths=function(b){a=new Date(this.valueOf());a.setMonth(a.getMonth()+b);return a};
	Date.prototype.addDays=function(b){a=new Date(this.valueOf());a.setDate(a.getDate()+b);return a};
	Date.prototype.addHours=function(b){a=new Date(this.valueOf());a.setHours(this.getHours()+b);return a};
	Date.prototype.addMinutes=function(b){a=new Date(this.valueOf());a.setMinutes(this.getMinutes()+b);return a};
	Date.prototype.addSeconds=function(b){a=new Date(this.valueOf());a.setSeconds(this.getSeconds()+b);return a};
	Date.prototype.lastDayOfMonth=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate()};

  	Date.prototype.yyyymmdd = function(d) {
	    var mm = this.getMonth() + 1; // getMonth() is zero-based
	    var dd = this.getDate();

	    return [this.getFullYear(),
	          (mm > 9 ? '' : '0') + mm,
	          (dd > 9 ? '' : '0') + dd
	    ].join(d || '');
 	};

	
	
 	secInTime = function(sec){

 		var h = sec/3600 ^ 0 ;
		var m = (sec-h*3600)/60 ^ 0 ;
		var s = sec-h*3600-m*60;

		var result = [];

		if(h){
			result.push(addZero(h.toFixed(0)))
		}

		result.push(addZero(m.toFixed(0)))
		result.push(addZero(s.toFixed(0)))

		return result.join(":")
 	}

	isios = function () {
		return typeof window != 'undefined' && window.cordova && window.device && deep(window, 'device.platform') == 'iOS'
	}

 
	currentYear = function(){
		var mdate = new Date(); 
		return mdate.getFullYear()
	}
 	monthConvert = function(m){
 		var possibleValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 		var i = _.indexOf(possibleValues, m);

 		if (i == -1) i = 0;

 		return i;
 	}

 	addZero = function(n){
		if (Number(n) < 10)
		{
			n = "0" + n;
		}

		return n;
		
 	}

 	dateToStr = function (d) {
		var now = d || new Date();

		var M = addZero((now.getMonth() + 1).toString());

		var d = addZero(now.getDate().toString());

		var y = addZero(now.getFullYear().toString());

		var h = addZero(now.getHours().toString());

		var m = addZero(now.getMinutes().toString());

		return y + M + d + h + m;
	}

	dateToStrS = function (d) {
		var now = d || new Date();

		var M = addZero((now.getMonth() + 1).toString());

		var d = addZero(now.getDate().toString());

		var y = addZero(now.getFullYear().toString());

		var h = addZero(now.getHours().toString());

		var m = addZero(now.getMinutes().toString());

		var s = addZero(now.getSeconds().toString());

		return y + M + d + h + m + s;
	}


	dateToStrUTCSS = function (d) {
		var now = d || new Date();

		var M = addZero((now.getUTCMonth() + 1).toString());

		var d = addZero(now.getUTCDate().toString());

		var y = addZero(now.getUTCFullYear().toString());

		var h = addZero(now.getUTCHours().toString());

		var m = addZero(now.getUTCMinutes().toString());

		var s = addZero(now.getUTCSeconds().toString());

		var S = now.getUTCMilliseconds().toString();

		var c = 4 - S.length;

		if (c > 0) S = (Number(S) * Math.pow(10, c)).toString()

		return y + M + d + h + m + s + S;
	}

	strToDateArr = function (str) {
		var y = str.substring(0, 4),
			M = str.substring(4, 6),
			d = str.substring(6, 8);

		return [y, M, d]
	}

	dateToStrSmall = function (d) {
		var now = d || new Date();

		var M = addZero((now.getMonth() + 1).toString());

		var d = addZero(now.getDate().toString());

		var y = addZero(now.getFullYear().toString());

		return y + M + d;
	}

	dateToStrUtc = function(d){
		var now_utc = nowDateUtc(d);

		return dateToStr(now_utc)
	}

	dateToStrUtcS = function(d){
		var now_utc = nowDateUtc(d);

		return dateToStrS(now_utc)
	}

 	strToDate = function (str) {
		var y = str.substring(0, 4),
			M = str.substring(4, 6),
			d = str.substring(6, 8);

		var h = str.substring(8, 10),
			m = str.substring(10, 12),
			s = str.substring(12, 14) || 0;

		return new Date(y, M - 1, d, h, m, s);
	}

	strToDateSS = function (str) {
		var y = str.substring(0, 4),
			M = str.substring(4, 6),
			d = str.substring(6, 8);

		var h = str.substring(8, 10),
			m = str.substring(10, 12),
			s = str.substring(12, 14) || 0,
			S = str.substring(14, 17) || 0;

		return new Date(y, M - 1, d, h, m, s, S);
	}

	strToDateSmall = function (str) {
		var y = str.substring(0, 4),
			M = str.substring(4, 6),
			d = str.substring(6, 8);

		return new Date(y, M - 1, d);
	}

	dateNow = function (d) {

		if (!d)
			var d = new Date;

		var MM = d.getMonth() + 1,
			dd = d.getDate(),
			hh = d.getHours(),
			mm = d.getMinutes(),
			ss = d.getSeconds();

		if (MM < 10)
			MM = '0' + MM;
		if (dd < 10)
			dd = '0' + dd;
		if (hh < 10)
			hh = '0' + hh;
		if (mm < 10)
			mm = '0' + mm;
		if (ss < 10)
			ss = '0' + ss;

		return [d.getFullYear(), MM, dd, hh, mm];
	}
	
	dateUtcNow = function (d) {

		if (!d)
			var d = new Date;

		var MM = d.getUTCMonth() + 1,
			dd = d.getUTCDate(),
			hh = d.getUTCHours(),
			mm = d.getUTCMinutes(),
			ss = d.getUTCSeconds();

		if (MM < 10)
			MM = '0' + MM;
		if (dd < 10)
			dd = '0' + dd;
		if (hh < 10)
			hh = '0' + hh;
		if (mm < 10)
			mm = '0' + mm;
		if (ss < 10)
			ss = '0' + ss;

		return d.getUTCFullYear() + "" + MM + "" + dd + "" + hh + "" + mm;
	}

	utcnow = function(date){
		var now = date ||(new Date);
		var UTCseconds = (now.getTime() + now.getTimezoneOffset()*60*1000);
		var d = new Date(UTCseconds);
			d.toString();	
	
		return d
	}

	fromutc = function(date){
		var now = date ||(new Date);
		var UTCseconds = (now.getTime() - now.getTimezoneOffset()*60*1000);
		var d = new Date(UTCseconds);
			d.toString();	
	
		return d
	}

	randomString = function (l) {
		if (!l)
			l = 8;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < l; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	utcStrToDateSS = function(str){
		var date = strToDateSS(str);
	}

	utcStrToDate = function(str){
		var date = strToDate(str);

		var n = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

			n = new Date(n);

			n = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());

		return n;
	}

	utcStrToConvertDate = function(str){
		
		return convertDate(dateToStr(utcStrToDate(str)))
	}

	nowDateUtc = function(d){

		var now = d || new Date();
		var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

		return now_utc;
	}

	nextMonday = function(d){

		var now = d || new Date();

		var date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		var m = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		if(date.getDay())
		{
			m.setDate(date.getDate() + 8 - date.getDay())
		} 
		else 
		{
			m.setDate(date.getDate() + 1)
		}
		
		return m;
	}

	nextMondayUtc = function(d){

		d || (d = new Date())

		var date = nowDateUtc();
		var m = nowDateUtc();

		if(date.getDay()){m.setDate(date.getDate() + 8 - date.getDay())} else {m.setDate(date.getDate() + 1)}
		
		return m;
	}

 	convertDate = function (str) {
		var y = str.substring(0, 4),
			m = str.substring(4, 6),
			d = str.substring(6, 8);

		var h = str.substring(8, 10),
			_m = str.substring(10, 12)

		var ms = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

		var res = y;

		if (m)
			res += ' ' + ms[m - 1];
		if (d)
			res += ' ' + d;

		if (h) {
			res += ', ' + h;

			if (_m)
				res += ':' + _m;

			else
			{
				res += 'H';
			}
		}


		return res;
	}

	convertDateRel = function(date){

		var n = new Date();
		

		if (n.addMinutes(-1) < date) return ['fewseconds']
		if (n.addMinutes(-2) < date) return ['oneminute']

		if (n.addMinutes(-55) < date) {


			return ['minutes', '', ((n.getTime() - date.getTime()) / 60 / 1000).toFixed(0)]
		}

		//if (n.addMinutes(-45) < date) return ['halfanhour']
		if (n.addMinutes(-80) < date) return ['anhour']

		if (dateToStrSmall(n) == dateToStrSmall(date)) return ['today', addZero(date.getHours().toString()) + ":" + addZero(date.getMinutes().toString())]


		return ['', convertDate(dateToStrSmall(date))]
		
	}


/* ______________________________ */

/* WINDOWS, MESSAGES */


	successCheck = function(p){
		if(!p) p = {};
		
		var self = this,
			el = p.el || $('body');
		var _w = $(window);
		var ch = null;


		var render = function(){

			var h = '<div class="successCheckWrapper table"><div><div class="chw">\
				<svg viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">\
					<path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#4AC6F9" fill="transparent"/>\
				</svg>\
			</div><div class="text">SUCCESS</div></div></div>'

			ch = $("<div>",{
				"class" 	: "successCheck",
				"html"	: h
			});

			el.append(ch);	

			ch.fadeIn(300);

			ch.find('svg')[0].classList.add('animate')


			setTimeout(function(){
				ch.fadeOut(300);

				setTimeout(function(){
					ch.remove()
				}, 300)

			}, 900)
				
		}

		render();

		return self
	}

	/*setInterval(function(){
		successCheck()
	}, 3000)*/

	wnd = function(p){

		if(!p) p = {};

		var self = this,
			app = p.app,
			content = p.content || null,

			id = 'w' + makeid().split('-')[0],
			nooverflow = p.nooverflow || $('html').hasClass('nooverflow'),
			el = p.el || $('body');

		var _w = $(window);

		var wnd;

		var find = function(s){
			if (wnd)
				return wnd.find(s);
		}

		self.redraw = function(){

			var scrollers = [];

			if(p.scrollers)
			{
				scrollers = _.map(find(p.scrollers), function(el){
					return $(el).scrollTop();
				})
			}

			find(".wndcontent").html(content);

			if(p.scrollers)
			{
				$.each(find(p.scrollers), function(index){
				
					$(this).scrollTop(scrollers[index])
				})
			}

			if (p.success) 
				p.success(wnd, self, true);
		}

		var wndfixed = function(){

			wnd.css('top', _w.scrollTop())

		}

		var render = function(tpl){

			var h = p.allowHide ? '<div class="wndback" id='+id+'></div><div class="wndinner">' : '<div class="wndback" id='+id+'><div class="_close roundclosebutton '+closedbtnclass+'"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="wndinner">\
					 ';

			var closedbtnclass = ''

				if(p.leftbg) 
					h+='<div class="leftbg"><div>'+p.leftbg+'</div></div>';

				h+=	 p.allowHide ? '<div class="wndcontent content">' + content + '<div class="changeStateButtons"><div class="hideButton changeButton"><i class="fas fa-minus"></i></div><div class="closeButton changeButton"><i class="fas fa-times"></i></div><div class="changeButton expandButton hidden"><i class="fas fa-expand-arrows-alt"></i></div></div></div>' : '<div class="wndcontent content">'+content+'</div>';

				if(p.header) 
				{
					h+='<div class="wndheader">'+p.header+'</div>';
				}
				else
				{	
					closedbtnclass = 'onwhite'
				}

				if (!p.noButtons) {
					h+=	 ' <div class="buttons"></div>';
					h+=	 '</div>';
				}

			wnd = $("<div>",{
			   "class" 	: "wnd",
			   "html"	: h
			   });
			   
			   wnd.css('top', _w.scrollTop())
			   wnd.css('height', _w.height())

		   	if(!p.header) wnd.addClass('noheader')

			el.append(wnd);		

			wnd.find("._close").on('click', function(){
				actions["close"](true);
			});

			_.each(p.buttons, function(button){
				button.el = $("<div>",{
				   "class" 	: "button " + (button.class || ""),
				   "html"	: "<div>" + button.html + "</div>"
			    });

				wnd.find(".wndinner>div.buttons").append(button.el);

				var fn = button.fn || actions[button.action] || actions["close"];
				button.el.on('click', function(){fn(wnd, self)});

			})

			

			if(p.class) wnd.addClass(p.class);

		    if(!nooverflow){

				nooverflow = !app.actions.offScroll(p.offScroll);
				
				
			}
			

			wnd.css("display", "block");
		}

		var resize = function(){
			wnd.css('top', _w.scrollTop())
			wnd.css('height', _w.height())
		}

		var initevents = function(){

			if(!p.noCloseBack)
				wnd.find('.wndback').one('click', function(){
					actions.close(true)
				});

			if(p.swipeClose && isMobile()){

				var dir = p.swipeCloseDir || 'up';

				var directions = {}

				var c = wnd.find('.wndcontent')

				var tr = 1;

					directions[dir] = {
						trueshold : p.trueshold || tr,

						mintrueshold : p.swipeMintrueshold || 1,

						positionclbk : function(px){
							
							

						},

						constraints : function(){
							if(c.scrollTop() == 0) return true
						},

						clbk : function(){

							wnd.fadeOut(tr)

							setTimeout(function(){
								actions.close(true)	
							}, 400)
							
						}

					};

					//if(dir == 'left' || dir == 'right') directions[dir].reverse = true
					
				var parallax = new SwipeParallaxNew({

					allowPageScroll : 'vertical',

					el : c,

					directions : directions

				}).init()


				/*wnd.find('.wndinner').swipe({
					allowPageScroll: "auto", 
					swipeDown : function(e, phase, direction, distance){
						actions.close(true)	
					},
				})*/

				/*wnd.swipe( {
					
					swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

						if(direction == 'up' && distance > 70){
							actions.close(true)	
						}
					},

					threshold:0
				});*/
			}

			if (p.allowHide) {
				wnd.find('.hideButton').on('click', actions.hide);
				wnd.find('.closeButton').on('click', actions.close);
				wnd.find('.expandButton').on('click', actions.show);
			}

			_w.on('resize', resize)

			_w[0].addEventListener('scroll', wndfixed);
		}

		var actions = {
			close : function(cl, key){

				if(cl) if(p.closecross) p.closecross(wnd, self);

				if(p.close) p.close(wnd, self);

				if(!nooverflow)
					app.actions.onScroll();

				if (self.essenseDestroy)
					self.essenseDestroy(key)
				
				wnd.remove();
				_w.off('resize', resize)

				_w[0].removeEventListener('scroll', wndfixed);

				if(!p.noblur)
				{
					/*if(app.el.content) app.el.content.removeClass("blur");
					if(app.el.menu) app.el.menu.removeClass("blur");*/
				}

				
			},

			hide : function(cl, key) {
				// wnd.find('.wndback').css('display', 'none');

				wnd.find('.buttons').addClass('hidden');
				wnd.addClass('hiddenState');
				wnd.find('.wndcontent > div').addClass('rolledUp');

				wnd.find('.expandButton').removeClass('hidden');
				wnd.find('.closeButton').addClass('hidden');
				wnd.find('.hideButton').addClass('hidden');
				// setTimeout(() => wnd.find('.wndinner').one('click', actions.show), 500);

				if(!nooverflow) {
					app.actions.onScroll();
				}
			},

			show : function(cl, key) {
				// wnd.find('.wndback').css('display', 'none');
				wnd.find('.buttons').removeClass('hidden');
				wnd.removeClass('hiddenState');
				wnd.find('.wndcontent > div').removeClass('rolledUp');
				wnd.find('.expandButton').addClass('hidden');
				wnd.find('.closeButton').removeClass('hidden');
				wnd.find('.hideButton').removeClass('hidden');

				if(!nooverflow) {
					app.actions.offScroll();
				}
			},
		}

		self.buttonState = function(index, state){

			var _class = 'disabled';

			if(typeof state == 'function') state = state();

			if(state){
				p.buttons[index].el.removeClass(_class)
			}
			else
			{
				p.buttons[index].el.addClass(_class)
			}

			
		}

		var init = function(){

			if (p.preloader) preloader(true);

			if(!p.buttons)  p.buttons = {};

			if(!p.buttons.close && !p.noCloseButton)

				p.buttons.close = {
					action : close,
					html : 'Close',
					class : "close"
				};


			var success = function(){				

				if(p.preloader) preloader(false);

				render();
				
		    	initevents();

		    	self.el = wnd;

				if (p.postRender) {
					p.postRender(wnd, self, () => {
						if (p.clbk) 
							p.clbk(self, wnd);
					});
				} else {
					if (p.clbk) 
						p.clbk(self, wnd);
				} 
			}

			if(!p.noblur)
			{
				/*if(app.el.content) app.el.content.addClass("blur");
				if(app.el.menu) app.el.menu.addClass("blur");*/
			}

			if(content) success();
			
		}

		init();

		self.find = find;
		self.close = actions.close;
		self.el = wnd;
		self.hide = actions.hide;
		self.show = actions.show;

		return self;
	}

	menuDialog = function(p){
		if(!p) p = {};

		p.wrap = true;

		p.class = 'menudialog';

		p.items.push({
			class : 'itemclose',
			text : 'Close'
		})
		
		var ehtml = function(){
			var h = ''

			_.each(p.items, function(item, i){
				h += '<div class="item ' + item.class + '" item="'+i+'">'

					h += item.text

				h += '</div>'
			})

			return h;
		}

		p.html = ehtml()

		p.clbk = function(el){
			el.find('.item').on('click', function(){

				var i = $(this).attr('item')

				if(!p.items[i].action){
					self.destroy()
				}
				else
				{

					p.items[i].action(function(){
						self.destroy()
					})

				}

				

				return false

			})

			el.on('click', function(){
				self.destroy()
			})
		}

		var self = new dialog(p);

		return self;
	}
	
	inputDialogNew = function(p){
		if(!p) p = {};

		p.alert || (p.alert = "Please enter values");
		p.class = (p.class || "") + " input";
		p.wrap = true;

		var validation;

		var moneyparam = p.mmoneyparam;
		var percentparam = p.percentparam;

		var mask = function(value, _value){
			if(value.dollars) {
				moneyparam.value = _value.toString();
				_value = maskValue(moneyparam);
			}

			if(value.percent) {
				percentparam.value = _value.toString();
				_value = maskValue(percentparam);
			}

			if(value.convertIn){
				_value = value.convertIn(_value);
			}

			return _value;
		}

		p.html = '<div class="caption">' + p.caption + '</div>';
		p.html += '<div class="values">';
		_.each(p.values, function(value, index){

			if(value.time){
				p.html += "<div class='timeselector' index='"+index+"'>"
				p.html += "</div>"

				return
			}

			var _class = '';
			var classValue = ''

			if(value.dollars) _class="dollars";
			if(value.percent) _class="percent";

			if(value.slider) classValue = 'hasslider'

			p.html += '<div class="value '+ classValue +'">';

			if(!value.checkbox)
			{

				p.html += '<div class="label">';
				p.html += value.label;
				p.html += '</div>';
			}

			p.html += '<div class="v">';

			if(value.checkbox)
			{

				p.html += '<input class="checkbox" type="checkbox" index="'+index+'" id="value'+index+'" ';

				if(value.defValue == true)
				{
					p.html += 'checked';
				}

				p.html += '><label for="value'+index+'">'+value.label+'</label>';


			}
			else

			if(value.text)
			{
				p.html += '<textarea placeholder="'+(value.placeholder || value.label || '')+'" class="'+_class+'" index="'+index+'">' + (value.defValue || '') + '</textarea>';

			}

			else

			if (value.upload)
			{	
				p.html += '<div class="upload" index="'+index+'">'
				p.html += value.placeholder
				p.html += '<div class="uploaded"></div>'
				p.html += '</div>'
			}	

			else

			if(value.select)
			{
				p.html += '<select index="'+index+'">';

				_.each(value.select.values, function(v){

					var selected = '';

					if(v.v == value.select.default) selected = 'selected';

					p.html += '<option  value="'+v.v+'" '+selected+'>';
					p.html += v.l;
					p.html += '</option>';

				})

				p.html += '</select>';
			}
			else
			{
				if (value.defValue && value.defValue.toFixed)
					value.defValue = value.defValue.toFixed(p.precision || 0)

				p.html += '<input placeholder="'+(value.placeholder || value.label || '')+'" class="'+_class+'" index="'+index+'" data-validate="'+(value.validate || 'name')+'" type="'+ (value.type || 'text') +'" value="' + (value.defValue || '') + '" ' + (value.allowNull ? 'allow-null="true"' : '') + '></input>';
			}

			p.html += '</div>';

			if(value.slider)
			{
				p.html += "<div class='sliderWrapper' index='"+index+"'>";

				p.html += "<div class='sliderTableWrapper'>"

				p.html += "<div class='min'>"+mask(value, value.slider.min)+"</div>";

				p.html += "<div class='sliderc'>"
				p.html += "<div class='slider'></div>"
				p.html += "</div>"

				p.html += "<div class='max'>"+mask(value, value.slider.max)+"</div>";
				p.html += "</div>"

				p.html += "</div>"

			}



			p.html += '</div>';
		})

		p.html += '</div>';

		if (p.additional){
			p.html += p.additional;
		}

		p.html += '<div class="alert" style="display:none">'+p.alert+'</div>';

		var success = p.success;
		var clbk = p.clbk;
		var uploaded = {}


		p.clbk = function(wnd){
			validation = new Validation({
				form : wnd,
				success : function(){

				}
			});

			if(moneyparam)
				wnd.find('.dollars').maskMoney(moneyparam);
			if(percentparam)
				wnd.find('.percent').maskMoney(percentparam);


			_.each(p.values, function(value, index){

				if(value.slider)
				{
					var input = wnd.find('input[index="'+index+'"]');
					var slider = wnd.find('.sliderWrapper[index="'+index+'"] .slider');

					var sliderp = {
						slide : function(e, ui){
							var _value = ui.value;

							var precision = p.precision || 0;

							if(value.dollars) precision = moneyparam.precision || 0;
							if(value.percent) precision = moneyparam.precision || 0;

							_value = _value.toFixed(precision);

							input.val(mask(value, _value));
						},
						value : value.defValue
					}

					if(_.isObject(value.slider))
					{
						sliderp = _.extend(sliderp, value.slider)
					}

					slider.slider(sliderp);

					input.on('change', function(){

						var v = $(this).val();

						if(value.dollars) v = input.maskMoney('unmasked', moneyparam)[0].value;
						if(value.percent) v = input.maskMoney('unmasked', percentparam)[0].value;

						if(v > value.slider.max) v = value.slider.max
						if(v < value.slider.min) v = value.slider.min


						slider.slider('value', v);

						$(this).val(mask(value, v))


					})
				}

				if(value.text){

					var txt = wnd.find('textarea[index="'+index+'"]');

					txt.on('keyup', function(){

						if (this.scrollTop > 0){
						  	this.style.height = (this.scrollHeight + 10) + "px";
						}

					});

					/*txt.on('change', function(){
						console.log('this.scrollTop', this.scrollTop)

						if (this.scrollTop > 0){
						  	this.style.height = (this.scrollHeight + 10) + "px";
						}

					});

					txt.focus()
					txt.change()*/




				}

				if(value.upload){
					var input = wnd.find('.upload[index="'+index+'"]');

					initUpload({
						el : input,
			
						ext : value.upload.ext || ['png', 'jpeg', 'jpg'],

						dropZone : input,

						multiple : false,

						action : function(file, clbk){

							uploaded[index] = file

							input.find('.uploaded').html(file.file.name + ' <i class="fas fa-check-circle"></i>')

							if (value.onchange){
								value.onchange(file, self)
							}
						}
					})
				}

				if(value.time){
					var input = wnd.find('.timeselector[index="'+index+'"]');

					input.timingfield({
						daysText:      'Days',
						hoursText:      'Hours',
						minutesText:    'Minutes',
						secondsText:    'Seconds',

						defaults : value.default
					})
				}

				if(value.checkbox){
					var input = wnd.find('input[index="'+index+'"]');

					if (value.onchange){

						input.on('change', function(){
							var v = $(this).is(":checked");

							value.onchange(v, self)
						})

					}
				}
			})

			if(clbk) clbk();
		}

		p.success = function(wnd){

			if(!validation.validation({
				manual : true
			})) return false;

			var _values = {},
				arr = true;


			_.each(p.values, function(value, index){

				if(value.time){
					var input = wnd.el.find('.timeselector[index="'+index+'"]');

					var v = input.find('.timingfield').val()

					var v  = {
						d : Number(input.find('.timingfield_days input').val() || '0'),
						h : Number(input.find('.timingfield_hours input').val() || '0'),
						m : Number(input.find('.timingfield_minutes input').val() || '0'),
						s : Number(input.find('.timingfield_seconds input').val() || '0')
					};
				}
				else
				if(value.upload){
					var v = uploaded[index]
					var id = index
				}
				else{

					var i = wnd.el.find(".values [index='"+index+"']");

					var v = i.val();

					if(value.checkbox)
					{
						v = i.is(":checked");
					}

					if(value.dollars) v = i.maskMoney('unmasked', moneyparam)[0].value;
					if(value.percent) v = i.maskMoney('unmasked', percentparam)[0].value;

					var id = value.id || index;

					if(value.id) arr = false;
				}

				_values[id] = v;
			})

			if(arr) _values = _.toArray(_values);

			var r = success(_values);

			if(typeof r != 'undefined') return r

			return true
		}

		var self = new dialog(p);

		return self;
	}
	
	dialog = function(p){

		var self = this,
			ids,
			$el,
			removescroll = p.removescroll && p.app;

		var destroyed = false;

		if($('html').hasClass('nooverflow')) removescroll = false;

		if(!p.success) p.success = false;
		if(!p.fail) p.fail = false;


		if(!p.btn1text) p.btn1text = "Accept";
		if(!p.btn2text) p.btn2text = "Cancel";

		if(p.id)
		{
			if(typeof localStorage == 'undefined') return;

			p.btn2text || (p.btn2text = "Don't Show Anymore");

			ids = JSON.parse(localStorage["qu_rx"] || "{}");

			if(ids[p.id]) {

				if(p.alltrue) p.success();

				return;
			} 
		}

		var init = function()
		{


			var html = '<div class="wrapper table"><div class="secondwrapper"><div class="thwrapper">';

			if(p.header)
			{
				html+= '<div class="header"><div class="text">'+p.header+'</div></div>';
			}

			if (p.poll){
				
				var poll = '<div class="poll">';

				poll += '<div class="question description">Question</div>'

				poll += '<div class="title"><input class="input" type="text"><i class="fas fa-times-circle"></i></div>'

				poll += '<div class="options description">Poll options</div>';

				for (var i = 0; i < 5; i++){
					poll += `<div class="poll-item" id="poll-item-${i + 1}"><input class="input" type="text"><i class="fas fa-times-circle"></i></div>`;
				}

				poll += "</div>";

				html += poll ;
				
			}

			if(p.html)
			{
				html += '<div class="body"><div class="text">'+(p.html || "")+'</div></div>';
			}

			html+=	 '<div class="buttons">\
							<div class="btn2wr"><button class="btn2 medium">'+p.btn2text+'</button></div>\
							<div class="btn1wr"><button class="btn1 medium">'+p.btn1text+'</button></div>\
						</div><div class="_close"><i class="fa fa-times" aria-hidden="true"></i></div>\
						</div>\
						</div></div>'

			$el = $("<div/>",	{"class": "dialog " + (p.class || "")});

			$el.html(html);

			$('body').append($el);
			if(p.class) $el.addClass(p.class);

			$el.find

			$el.find('.btn1').on('click', function(){ response(p.success)});
			$el.find('.btn2').on('click', function(){ response(p.fail, true)});
			$el.find('._close').on('click', function(){ response(p.close, true)});

			
			var title = $el.find('.poll .title');
				
			title.find('i').on('click', function(){

				title.find('.input').val('');
			})

			for (var i = 0; i < 5; i++){
				
				let item = $el.find(`#poll-item-${i + 1}`);

				item.find('i').on('click', function(){


					item.find('.input').val('');
				})

			}


			if(p.clbk) p.clbk($el, self);

			if(removescroll)
			{
		    	app.actions.offScroll();
			}
			
			if (p.render) {
				p.render($el);
			}
			
			$el.fadeIn(200);

			bgImages($el)

			
		}
		var response = function(func, remId)
		{
			if(typeof func==='function')
			{
				if(func(self) && p.wrap) destroy();
			}
			else
			{
				destroy();
			}

			if(remId && p.id)
			{
				ids[p.id] = true;

				localStorage["qu_rx"] = JSON.stringify(ids);
			}	

			if(!p.wrap) destroy();	
			
		}
		var destroy = function(){

			if(destroyed) return;

			destroyed = true;

			$el.fadeOut(200);

			setTimeout(function(){

				$el.remove();

			},200);

			if(removescroll)
			{
		    	app.actions.onScroll();
			}
		}



		init();
		self.el = $el;
		self.destroy = destroy;
		return self;
	}

	tooltip = function(p){
		if(!p) p = {};

		var self = this;

		var content = p.content || "";
		var el = p.el;
		var event = p.event || 'click';
		var options = p.options || {};

		var render = function(){			

			if(el.hasClass('tooltipstered')) return;
			
			options.debug = false;
			options.contentAsHTML = true;
			options.interactive = true;
			options.interactiveTolerance = 400;
			options.onlyOne = true;

			options.delay = 100;

			if (event != 'mouseenter'){
				
				options.trigger || (options.trigger = event);
			}
			else
			{
				options.delay = 400;
			}

			options.autoClose = false;

			options.theme || (options.theme = "lighttooltip");
			options.position || (options.position = "bottom");
			options.height || (options.height = 420);
			options.maxWidth || (options.maxWidth = 600);

			


			options.content = function () {
				return content
			};

			options.functionReady = function (instance, h) {

				self.instance = instance;

				var _el = $(h.tooltip)
				var _or = $(h.origin);

				self.el = function(){
					return _el
				}

				if(event != 'click')
				{
					_or.on('click', function(){
						instance.close()
					})
				}


				if (p.clbk)
				{
					p.clbk({
						el : _el
					})
				}
				
			}

			options.functionInit = function (i, h) {
								
			}

			options.functionAfter = function (i, h) {	
				if (p.destroy)
					p.destroy();
			}

			el.tooltipster(options)	

		}

		var initEvents = function(){

			render();
		
		}

		var init = function(){

			if(p.render)

				render();

			initEvents();
		}

		self.close = function(){
			if (self.instance)
				self.instance.close();
		}

		init();

		return self;
	}

	sitemessage = function (message, func) {
		$("<div/>", {
			"class": "sitemessage remove_now",
			"style": "opacity:0",
			text: message

		}).appendTo("body")
			.animate({opacity: 1}, 200);

		setTimeout(function () {

			$('.remove_now').animate({opacity: 0}, 500);

			if (typeof func === 'function')
				func();

			setTimeout(function () {

				$('.remove_now').detach();
				
			}, 500)

		}, 2200)
	}
/* ______________________________ */

/* IMAGES */

	bgImages = function(el, p){

		if(!p) p = {};

		el.find('[image]').each(function(){

			var _el = $(this);
			var image = _el.attr('image')

			if (image)
			{
				_el.css({
					'background-image': 'url('+image+')',
					'background-size': p.size || 'cover',
					'background-position': p.position || 'center center',
					'background-repeat': p.repeat || 'no-repeat'
				});

				_el.attr('image', '')
			}

			if(p.clbk)
			{
				_el.imagesLoaded({ background: true }, function(image) {

					el.fadeIn({queue: false, duration: 'fast'});

				  	if(typeof p.clbk === 'function')
				  		p.clbk(image);
				});
			}
		})

		
			
	}

	pathFromMD5Name = function(name){

		return name.substr(0, 2) + "/" + name.substr(2, 2) + "/" + name.substr(4) + ".jpg";
	}

	srcToData = function(url, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.onload = function() {
	    var reader = new FileReader();
	    reader.onloadend = function() {
	      callback(reader.result);
	    }
	    reader.readAsDataURL(xhr.response);
	  };

	  xhr.onerror = function(){
	  }

	  xhr.open('GET', url);
	  xhr.responseType = 'blob';
	  xhr.send();
	}

	resizeFit = function(srcData, width, height, clbk, format) {
		var imageObj = new Image(),
			canvas   = document.createElement("canvas"),
			ctx      = canvas.getContext('2d'),
			xStart   = 0,
			yStart   = 0,
			aspectRadio,
			newWidth,
			newHeight;

			imageObj.crossOrigin = "Anonymous"
			imageObj.src  = srcData;

			format || (format = 'jpeg');
			

		imageObj.onload = function(){

			aspectRadio = imageObj.height / imageObj.width;
			newHeight = imageObj.height;
			newWidth = imageObj.width;

			if(newHeight <= height && newWidth <= width)
			{

			}
			else
			{
				if(newWidth > width)
				{
					newWidth = width;
					newHeight = width * aspectRadio;
				}
				
				if(newHeight > height)
				{
					newHeight = height;
					newWidth = newHeight / aspectRadio
				}

				var c = Math.max(((height - newHeight) / newHeight), ((width - newWidth) / newWidth))

				if(c > 0){
					newHeight = newHeight * (c + 1)
					newWidth = newWidth * (c + 1)
				}

			}

			canvas.width  = newWidth;
			canvas.height = newHeight;


				ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);

			var url = canvas.toDataURL("image/" + format, 0.75);

			$(canvas).remove();

			clbk(url);

		}

		
    }

	resize = function(srcData, width, height, clbk, format) {
		var imageObj = new Image(),
			canvas   = document.createElement("canvas"),
			ctx      = canvas.getContext('2d'),
			xStart   = 0,
			yStart   = 0,
			aspectRadio,
			newWidth,
			newHeight;

			imageObj.crossOrigin = "Anonymous"
			imageObj.src  = srcData;

			format || (format = 'jpeg');

		imageObj.onload = function(){

			aspectRadio = imageObj.height / imageObj.width;
			newHeight = imageObj.height;
			newWidth = imageObj.width;

			if(newHeight <= height && newWidth <= width)
			{

			}
			else
			{
				if(newWidth > width)
				{
					newWidth = width;
					newHeight = width * aspectRadio;
				}
				
				if(newHeight > height)
				{
					newHeight = height;
					newWidth = newHeight / aspectRadio
				}

			}

			canvas.width  = newWidth;
			canvas.height = newHeight;


				ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);

			var url = canvas.toDataURL("image/" + format, 0.75);

			$(canvas).remove();

			clbk(url);

		}

		
	}

	resizeNew = function (srcData, width, height, format) {
		return new Promise((resolve, reject) => {
			var imageObj = new Image(),
			  canvas = document.createElement('canvas'),
			  ctx = canvas.getContext('2d'),
			  xStart = 0,
			  yStart = 0,
			  aspectRadio,
			  newWidth,
			  newHeight;
	  
			imageObj.crossOrigin = 'Anonymous';
			imageObj.src = srcData;
	  
			format || (format = 'jpeg');
	  
			imageObj.onload = function () {
			  aspectRadio = imageObj.height / imageObj.width;
			  newHeight = imageObj.height;
			  newWidth = imageObj.width;
	  
			  if (newHeight <= height && newWidth <= width) {
			  } else {
				if (newWidth > width) {
				  newWidth = width;
				  newHeight = width * aspectRadio;
				}
	  
				if (newHeight > height) {
				  newHeight = height;
				  newWidth = newHeight / aspectRadio;
				}
			  }
	  
			  canvas.width = newWidth;
			  canvas.height = newHeight;
	  
			  ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);
	  
			  var url = canvas.toDataURL('image/' + format, 0.75);
	  
			  $(canvas).remove();
	  
			  return resolve(url);
			};
		  });
	}


	dataURLtoFile = function(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

	toDataURL = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});


    grayscaleImage = function (srcData, clbk){

    	var image = new Image()

    		image.src  = srcData;

    	image.onload = function(){

			var myCanvas = document.createElement("canvas");
			var myCanvasContext = myCanvas.getContext("2d");

			var imgWidth = image.width;
			var imgHeight = image.height;
		
			myCanvas.width = imgWidth;
			myCanvas.height = imgHeight;

			myCanvasContext.drawImage(image, 0, 0);

			var imageData = myCanvasContext.getImageData(0,0, imgWidth, imgHeight);

			var j = 0, i = 0;

			// This loop gets every pixels on the image and
			for (i = 0; i < imageData.height; i++)
			{
				for (j = 0; j < imageData.width; j++)
				{
					var index=(i*4)*imageData.width+(j*4);
					var red=imageData.data[index];
					var green=imageData.data[index+1];
					var blue=imageData.data[index+2];
					var alpha=imageData.data[index+3];
					var average = (3 * red + green + blue)/3;

					imageData.data[index]  = average;
					imageData.data[index+1]= average;
					imageData.data[index+2]= average;
					imageData.data[index+3]= alpha;
				}
			}

			myCanvasContext.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);

			if (clbk){
				clbk(myCanvas.toDataURL())
			}

		}
	}

/* ______________________________ */

/* COLOR */
	colorFromGradient = function(p){
		function rgb2hex(rgb){
		 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		 return (rgb && rgb.length === 4) ? "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		}
		p.gradient || (p.gradient = [{
			color : [0,0,0,0],
			image : "red",
			position : 0
		},{
			color : [255,255,255,255],
			image : "green",
			position : 100
		}])

		if(typeof p.value == 'undefined')
		{
			p.value = 50;
		}

		var left = _.find(p.gradient, function(cp, i){
			if(cp.position <= p.value && (!p.gradient[i + 1] || p.gradient[i + 1].position > p.value)) return true;
		})

		var right = _.find(p.gradient, function(cp, i){
			if(cp.position >= p.value  && (!p.gradient[i - 1] || p.gradient[i - 1].position < p.value)) return true;
		})

		var color = [0,0,0,0],
			image = "red";

		if(!right) right 	= p.gradient[p.gradient.length - 1];
		if(!left) left 		= p.gradient[0];

		if(right.position == left.position) 
		{
			color = left.color;
			image = left.image;
			left.opacity = 255;
			right.opacity = 255;
		}
		else
		{
			var proportion = (p.value - left.position) / (right.position - left.position);

			_.each(color, function(cc, i){
				color[i] = (left.color[i] * (1 - proportion) + right.color[i] * proportion).toFixed(0);
			})

			left.opacity = 1 - proportion;
			right.opacity = proportion;
		}

		if(p.mode && p.mode == "pdf") 
			return {
				left : left,
				right : right
			};



			var c = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")"

		if(p.toHex)
		{
			return rgb2hex(c);
		}

		return c;
	}

	randomColor = function(){
		var r=Math.floor(Math.random() * (256));
		var g=Math.floor(Math.random() * (256));
		var b=Math.floor(Math.random() * (256));

		var c='rgb(' + r +',' + g + ',' + b +')';

		return c;
	}

	rgbaOpacity = function(rgba, opacity){
		var clear = rgba.replace("rgba(", '').replace(")", '');

		var points = clear.split(",");

			points[3] = opacity

			rgba = 'rgba(' + points.join(",") + ")";

		return rgba;
	}

/* ______________________________ */

/* FILTERS */
	aviableFilters = {
		values : function(data, valueFilterStorage){

			var filtered = true;

			_.each(valueFilterStorage, function(values, fieldid){

				if(!filtered) return;

				if(values[data[fieldid]] == false) filtered = false;
			})

			return filtered;
		},
		condition : {
			without : {
				name : "Without data",
				id : 'without',
				filter : function(data, cfdata, field){
					if(typeof field == 'undefined' || data[field.id] == '-' || field == null) return true;
				},
				type : 'general',
				values : 0
			},

			with : {
				name : "With data",
				id : 'with',
				filter : function(data, cfdata, field){
					if(typeof field != 'undefined' && field != '-' && field != null) return true;
				},
				type : 'general',
				values : 0
			},
			beginwith : {
				name : "Begin with",
				id : 'beginwith',
				filter : function(data, cfdata, field){

					if(field.toLowerCase().indexOf(cfdata.values[0].toLowerCase()) == 0) return true;
				},
				type : 'string',
				values : 1
			},

			endsat : {
				name : "Ends at",
				id : 'endsat',
				filter : function(data, cfdata, field){
					if(field.toLowerCase().indexOf(cfdata.values[0].toLowerCase()) == field.length - cfdata.values[0].length) return true;
				},
				type : 'string',
				values : 1
			},
			
			contain : {
				name : "Contain",
				id : 'contain',
				filter : function(data, cfdata, field){
					if(field.toLowerCase().indexOf(cfdata.values[0].toLowerCase()) > -1) return true;
				},
				type : 'string',
				values : 1
			},
			equaltext : {
				name : "Equal",
				id : 'equaltext',
				filter : function(data, cfdata, field){
					if(field.toLowerCase() == cfdata.values[0].toLowerCase()) return true;
				},
				type : 'string',
				values : 1
			},
			more : {
				name : "More",
				id : 'more',
				filter : function(data, cfdata, field){

					if(Number(field) > Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},
			moreequal : {
				name : "More and Equal",
				id : 'moreequal',
				filter : function(data, cfdata, field){
					if(Number(field) >= Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},
			less : {
				name : "Less",
				id : 'less',
				filter : function(data, cfdata, field){
					if(Number(field) < Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},
			lessequal : {
				name : "Less and Equal",
				id : 'lessequal',
				filter : function(data, cfdata, field){
					if(Number(field) <= Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},
			equal : {
				name : "Equal",
				id : 'equal',
				filter : function(data, cfdata, field){
					if(Number(field) == Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},
			notequal : {
				name : "Not Equal",
				id : 'notequal',
				filter : function(data, cfdata, field){
					if(Number(field) != Number(cfdata.values[0])) return true;
				},
				type : 'number',
				values : 1
			},		
		}
	}
/* ______________________________ */

/* ARRAYS */
		
	indexArray = function(length){

		length || (length = 0)

		var a = [];

		for(var i = 0; i < length; i++){
			a.push(i)
		}

		return a

	}

	 b64_to_utf8 = function(str) {

		///??? TEST

	    return decodeURIComponent(window.atob(str));
	}

	convertStringToArrayBuffer = function(base64) {
		var binary_string =  atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array( len );
		for (var i = 0; i < len; i++)        {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}
	convertArrayBufferToString = function(arrayBuffer) {
		var byteArray = new Uint8Array(arrayBuffer)
		var byteString = '';
		for (var i=0; i<byteArray.byteLength; i++) {
			byteString += String.fromCharCode(byteArray[i]);
		}
		return btoa(byteString);
	}
	
	

	objmap = function(array, key){

		var _obj = {};

		_.each(array, function(el){
			_obj[el.id] = el;
		})

		return _obj;
	}

	group = function(array, _function){
		var group = {};

		_.each(array, function(el, i){

			var index = _function(el, i);

			if(!index) return;

			if(!group[index])
				group[index] = [];

			group[index].push(el);

		})

		return group;
	}

	apply = function(value, _function){

		if(_.isArray(value)){

			_.each(value, function(_v, i){

				apply(value[i], _function)

			})

		}

		else
		{
			_function(value)
		}
	}

	nextIndex = function(arr, value){
		var index = _.indexOf(arr, value);

		if (index > -1)
		{
			if(index == arr.length - 1)
			{
				index = 0;
			}
			else
			{
				index++;
			}
		}

		return index;
	}

	findIndex = function(array, f){
		var index = -1;

		var _f = function(el){

			index++;

			if(f(el)) return true;
		}

		var _el = _.find(array, _f);

		if(!_el) index = -1;

		return index;
	}

	addSuffixToValue = function(p){

		if(!p.array || !p.field || !p.value) return;

		var object = _.find(p.array, function(obj){
			if(obj[p.field] && obj[p.field] == p.value) return true;
		});

		if (object)
		{
			
			var sreg = new RegExp(
		        "[\(]([0-9]+)[\)]"
		    )

			var suffix = p.value.match(sreg);

			if(!suffix) 
			{
				suffix = [];
				suffix[1] = "0";
			}

			suffix[1] = Number(suffix[1]) + Number(1);	

			p.value = trim(p.value.replace(suffix[0], ""));
			p.value += " (" + suffix[1] + ")";

			return addSuffixToValue(p);
			
		}

		return p.value;
	}

	replaceEqual = function(arr, el, wi){
		var _index = -1;
		var _el = _.find(arr, function(__el, index){
			if(isEqual(__el, el, false))
			{
				_index = index;
				return __el;
			}
		})

		if(_index > -1)
		{
			arr.splice(_index, 1, wi);
			return _el;
		}

		return false;
	}

	removeEqualRIObj = function(arr, el){
		var _index = -1;
		var _el = _.find(arr, function(__el, index){
			if(isEqual(__el, el, false))
			{
				_index = index;
				return __el;
			}
		})

		if(_index > -1)
		{
			arr.splice(_index, 1);
			return {

				el : _el,
				index : _index

			};
		}

		return null;
	}

	removeEqualRI = function(arr, el){
		var _index = -1;
		var _el = _.find(arr, function(__el, index){
			if(isEqual(__el, el, false))
			{
				_index = index;
				return __el;
			}
		})

		if(_index > -1)
		{
			arr.splice(_index, 1);
			return _index;
		}

		return -1;
	}

	removeEqual = function(arr, el){
		var _index = -1;
		var _el = _.find(arr, function(__el, index){
			if(isEqual(__el, el, false))
			{
				_index = index;
				return __el;
			}
		})

		if(_index > -1)
		{
			arr.splice(_index, 1);
			return _el;
		}

		return false;
	}

	instead = function(arr, el){
		var _index = -1;
		var _el = _.find(arr, function(__el, index){
			if(isEqual(__el, el, false))
			{
				_index = index;
				return true;
			}
		})

		if(_index > -1)
		{
			arr.splice(_index, 1);
		}

		arr.unshift(el);
	}

	lazyEach = function(p){

		var progressMap = {
			"after" : ["success", "fail", "after"]
		}

		var failbool = false;

		var progressIncrease = function(name){

			if(name == "fail") failbool = true;

			var newName;

			_.find(progressMap, function(item, _name){
				if(_.indexOf(item, name) > -1){
					newName = _name;
					return true;
				} 
			})

			if(newName){
				if(!i[newName]) i[newName] = 0;

				i[newName]++;
			}
		}

		var calcProgress = function(i){
			return _.reduce(i, function(sum, value){
				return sum + value;
			}, 0)
		}

		var go = function(index){
			var each = extendFunctions(p.array[index], p.each, index);

			each.item = p.array[index];

			p.action(each, index);
		}

		var extendFunctions = function(item, each, index){
			var newEach = {};


			_.each(each, function(_each, name){

				if(typeof _each === 'function' && (name == "success" || name == "fail" || name == "after" ))
				{
					newEach[name] = function(){

						var _arguments = arguments;				

						var callback = function(){

							var proggressend = function(){

								if(p.all.success &&    !failbool) 	p.all.success(p);
								if(p.all.fail &&  		failbool) 	p.all.fail(p);

								//else
								if(p.all.after) p.all.after(p);
							}

							progressIncrease(name);
							progress = calcProgress(i);

							_each(item, progress, l, _arguments, index);

							if(p.sync) 
							{
								
								if(p.array[index + 1])
								{
									go(index + 1);
								}
								else
								{
									proggressend();
								}
							}
							else
								if(progress == l) proggressend();
						}

						if(!p.syncCallbacks || progress >= index || p.sync)
						{

							callback();
						}
						else
						{
							var interval = setInterval(function(){

								if(progress >= index)
								{
									callback();
									clearInterval(interval);
								}

							},10)
						}
					}
				}
				else
				{
					newEach[name] = _each;
				}
			})

			return newEach;
		}

		if(!p) p = {};

		p.array || (p.array = []);
		p.each || (p.each = {});
		p.all || (p.all = {});

		p.each.success || (p.each.success = function(){});
		p.each.fail || (p.each.fail = function(){});	

		if (!p.array || p.array.length == 0)
		{
			if (p.all.success)
			{
				p.all.success();
			}

			return;
		}

		var l = p.array.length,
			i = {};

		var progress = 0;

		if (p.all.before) 
			p.all.before(p);

		if(!p.sync)
		{
			_.each(p.array, function(item, index){					
				go(index)
			})
		}
		else
		{
			go(0);		
		}
	}

	lazyActions = function(farray, clbk){

		lazyEach({
			array : farray,
			action : function(p){

				p.item(function(){


					p.success()

				})
			},

			all : {
				success : clbk
			}
		})

	}

	primitiveToArray = function(value){
		var _value;

		if(!_.isArray(value)) _value = [value];

		else _value = value;

		return _value;
	}

	actionsByType = function(obj, p){
		if(isVal(obj))
		{
			if(p.value)
				return p.value(obj);
		}
		else
		if(_.isArray(obj))
		{
			if(p.array)
				return p.array(obj);
		}
		else
		{

			if(p.object)
				return p.object(obj);
		}

		return null;
	}

	isVal = function(val){
		if(!_.isObject(val) || (typeof val.v != 'undefined' && !_.isObject(val.v))
							|| (typeof val.c != 'undefined' && !_.isObject(val.c))
			)
			return true;

		else 
			return false;
	}

	prevEl = function(array, el){
		var index = _.indexOf(array, el);

		if (index > 0){
			return array[index - 1]
		}

		else
		{
			return array[0]
		}
	}

	nextEl = function(array, el){
		var index = _.indexOf(array, el);

		if (index > -1 && index < array.length - 1){
			return array[index + 1]
		}

		else
		{
			return array[array.length - 1]
		}
	}

	nextElH = function(array, el){
		var index = findIndex(array, el);

		if (index > -1 && index < array.length - 1){
			return array[index + 1]
		}

		else
		{
			return null
		}
	}

	firstEl = function(array){
		var l = deep(array, 'length');

		if (l){
			return array[0]
		}
		else
		{
			return null;
		}
	}

	lastEl = function(array){
		var l = deep(array, 'length');

		if (l){
			return array[l - 1]
		}
		else
		{
			return null;
		}
	}

	lastEls = function(array, l){
		var length = array.length

			l = Math.min(l, length);

		if(!l){
			return [];
		}

		else
		{
			return _.filter(array, function(e, i){
				if(i >= length - l) return e;
			})
		}

	}

	lastelements = function(arr, length, eq){
		if(!length) length = 100
		if(!eq) eq = 0
	
		var d = arr.length - length

	
		if (d > eq){
			arr = arr.splice(d)
		}
	
		return arr
	}

	firstEls = function(array, l){
		var length = array.length

			l = Math.min(l, length);

		if(!l){
			return [];
		}

		else
		{
			return _.filter(array, function(e, i){
				if(i < l) return e;
			})
		}

	}

	getRandomValues = function(arr) {

        for (var i = 0; i < arr.length; i++) {
        arr[i] = Math.random() * 256 | 0
        }

        return arr
    }

/* ______________________________ */

/* OBJECTS */

	equalhash = function(v1, v2){
		return $.md5(JSON.stringify(v1)) === $.md5(JSON.stringify(v2))
	}

	getMethods = function(obj){
		var Obj = {};
		for(prop in obj){
			if( typeof obj[prop] === 'function')
			Obj[prop] = obj[prop];
		}
		return Obj;
	}

	getVars = function(obj){
		var Obj = {};
		for(prop in obj) if (obj.hasOwnProperty(prop)) {
			Obj[prop] = obj[prop];
		}
		return Obj;
	}

	toDeepKey  = function(obj){
		return _.toArray(obj).sort().join(".");
	}

	

	deepInsert = function(obj, key, _insert){
		if(!key) return;

		var  _key = key.split(".");

		var tkey = _key[0];

		if(_key.length == 1)
		{
			obj[tkey] = _insert;
		}
		else
		{
			if(!obj[tkey])
			{
				obj[tkey] = {};
			}

			_key.splice(0, 1);

			return deepInsert(obj[tkey], _key.join("."), _insert)
		}
	}

	isEqual = function(obj1, obj2, b){

		if(typeof b == "undefined") b = true;

		var pEqual = !b;

		if(typeof obj1 == "undefined" && typeof obj2 == "undefined") return true;

		if(typeof obj1 == "undefined" || typeof obj2 == "undefined") return false;

		if(typeof obj1 != typeof obj2 && typeof obj2 != "function") return false;

		if(typeof obj2 == "function")
		{		
			return obj2(obj1);
		}

		if(!_.isObject(obj2)){

			if(obj2 == obj1) {
				return true;
			}

			return false;
		}

		if(_.isArray(obj2)){
			
			_.each(obj2, function(param, index){

				var e = (isEqual(obj1[index], param, b));

				if(!e) 	e = false;
				else 	e = true;

				pEqual = pEqual || e;

			})

			return pEqual;
		}

		else

		if(_.isObject(obj2)){

			_.each(obj2, function(param, n){

				var e = (isEqual(obj1[n], param, b));

				if(!e) 	e = false;
				else 	e = true;
					
				if(b) 	pEqual = pEqual || e;
				else 	pEqual = pEqual && e;
			})

			return pEqual;
		}

		return false;
	}

	clear = function(obj){
		_.each(obj, function(k,i){
			delete obj[i];
		})
	}

	executeIfCan = function(obj){

		if(typeof obj == 'function')
		{
			return(obj())
		}
		else
		{
			return obj;
		}

	}

	convertBits = function(i, collection){


		i = _.toArray(Number(i).toString(2));

		var l = i.length;

		return _.filter(collection, function(item, index){

			var binindex = _.toArray(Number(item.bit).toString(2));

			if(i[i.length - binindex.length] == 1) return true;
		})
		

	}

	convertBitsToMap = function(i, collection){
		var f = convertBits(i, collection)

		return _.map(f, function(f){return f.bit})
	}

	convertToBits = function(values){
		return _.reduce(values, function(m, v){
			return m + Number(v)
		}, 0)
	}

	boolnum = function(n){
		if(n == 0 || n == '0' || !n) return false

		return true
	}

/* ______________________________ */

/* HELPERS */

	//IE11
	if (typeof FileReader != 'undefined' && FileReader.prototype.readAsBinaryString === undefined) {
	    FileReader.prototype.readAsBinaryString = function (fileData) {
	        var binary = "";
	        var pt = this;
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var bytes = new Uint8Array(reader.result);
	            var length = bytes.byteLength;
	            for (var i = 0; i < length; i++) {
	                binary += String.fromCharCode(bytes[i]);
	            }
	            //pt.result  - readonly so assign content to another property
	            pt.content = binary;
	            $(pt).trigger('onload');
	        }
	        reader.readAsArrayBuffer(fileData);
	    }
	}

	ParametersLive = function(parameters, el, p){


		if(!p) p = {};

		_.each(parameters, function(parameter){

			if(!parameter || !parameter.type) return


			var _el = el.find('[pid="'+parameter.id+'"]')

			if (_el)
			{
				parameter.el = _el;

				_el.find('.operatorselect').off('change')

				_el.find('.operatorselect').on('change', function(){
					parameter.operator = $(this).val();

					parameter.set('___nochange')
				})

				if (parameter.type == 'cash'){

					_el.find("input").on('change', function(){
						var value = $(this).val(); 

						if (parameter.isValid(value))
						{
							_el.removeClass('error')
						}
						else
						{
							_el.addClass('error')
						}

						parameter.set(value)
					})

					_el.find("input").on('keyup', function(){

						var value = $(this).val()
						
						_el.find('.convertValue').html(parameter.app.store.cash.toBTC(value, parameter.currency, true))

					})

					return;

				}

				if (parameter.type == 'cashrange'){

					_el.find("input").on('change', function(){
						var value = $(this).val(); 

						var index = $(this).attr('index');

						if (parameter.isValid(value))
						{
							_el.removeClass('error')
						}
						else
						{
							_el.addClass('error')
						}

						parameter.set(value, index)
					})

					_el.find("input").on('keyup', function(){

						var value = $(this).val();
						var index = $(this).attr('index');
					})

					return;

				}

				if (parameter.type == 'numberrange'){

					_el.find("input").on('change', function(){
						var value = $(this).val(); 

						var index = $(this).attr('index');

						if (parameter.isValid(value))
						{
							_el.removeClass('error')
						}
						else
						{
							_el.addClass('error')
						}

						parameter.set(value, index)
					})

					return;

				}

				if (parameter.type == 'html' && !_Node)
				{
					_el.trumbowyg({
						btns: [['bold', 'italic'], ['link']]
					});

					_el.on('tbwblur', function(){

						var value = _el.trumbowyg('html');

						parameter.set(value)

					})


					return
				}

				if (parameter.type == 'image' || parameter.type == 'file'){


					var uploadElement = _el.find('.addImage'),
						previewElement = _el.find('.imagesContainer'),
						previews = _el.find('.imageContainer')					

						parameter.upload.el = uploadElement;

						if(parameter.onLive)
						{
							parameter.onLive(previews, parameter)
						}					

						parameter.upload.beforeUpload = function(fileObject, processId){

							if (parameter.previewTemplate){

								previewElement.append(parameter.previewTemplate({
									file : fileObject,
									processId :processId
								}))

							}
						}

						parameter.upload.onUpload = function(response, processId){

							if (parameter.previewTemplate){

								var preview = deep(response, parameter.previewPath || '');

								var el = previewElement.find('[processId="'+processId+'"]');

								var insertEl = previewElement,
									insertKey = 'append';

								if (el.length > 0){
									insertEl = el;
									insertKey = 'replaceWith';
								}

								insertEl[insertKey](parameter.previewTemplate({
									src : preview,
									processId : processId,

									options : parameter.upload
								}))

								el = previewElement.find('[processId="'+processId+'"]'); 

								parameter.onLive(el, parameter);

							}

							parameter.set(preview)

							if (parameter.upload._onUpload)
								parameter.upload._onUpload(response)
						}

					initUpload(parameter.upload)
				}

				if(parameter.type == 'valuesmultitree'){

					var inieve = function(__el){
						_el.on('click', '.vmt_panel_wrapper', function(){

							var id = $(this).closest('[groupid]').attr('groupid')
							
							closeGroup(id);
							checking()

						})

						_el.on('change', 'input[type="checkbox"]', function(){

							var id = $(this).attr('value');
							var checked = $(this).is(":checked") ? 1 : 0;
							
							var value = parameter.treemap[id];

							var add = {};
							var remove = {};

							var total = [];

							var uptoParent = function(){
								if (value.parent){
									if(parameter.childselected(value.parent, add, remove)){

										value = value.parent;

											add = {};
											add[value.id] = true

										uptoParent();

									}
									else
									{
										
									}
									
								}
							}

							var uptoParentUncheck = function(value){
								if (value.parent){
									remove[value.parent.id] = true
									uptoParentUncheck(value.parent)
									
								}
							}

							var preuptoParentUncheck = function(value){
								if (value.parent){
									var selectedParent = parameter.parentselected(value.parent, [], []);

									if (selectedParent){
										
										remove[selectedParent.id] = true;

										_.each(value.parent.values, function(v){

											if(v.id != value.id)
											{
												add[v.id] = true
											}
										})
									}

								}
							}

							if (checked){

								add[value.id] = true

								uptoParent();

								if(value.values){
									parameter.every({
										group : function(v,l,i,n){

											remove[v.id] = true

											//if(parameter.value.indexOf(v.id) > -1)

												n();
										},
										value : function(v){
											remove[v.id] = true
										}
									}, value.values)
								}
								
							}
							else
							{
								preuptoParentUncheck(value)

								remove[value.id] = true

								uptoParentUncheck(value)
							}

							var ptotal = parameter.composeValues(add, remove);

							total = _.map(ptotal, function(r, i){
								return i;
							})
						
							parameter.set(total);

							
							checking();
						})
					}

					var checking = function(){
						
						_el.find('.checkbox').prop('checked', false);

						var values = _.map(parameter.value, function(id){
							return parameter.treemap[id];
						})

						//var tree = parameter.composeValues({},{});


						parameter.every({
							group : function(g, l, i, next){
								//if(tree[g.id])
									_el.find('[value="'+g.id+'"]').prop('checked', true);

								if(g.active)

									next()
							},

							value : function(v, l, u){
								//if(tree[v.id])
									_el.find('[value="'+v.id+'"]').prop('checked', true);
							}
						}, values)

					}					

					var closeGroup = function(id, act){

						var group = parameter.treemap[id];

						_closeGroup(group, act)	
					}

					var _closeGroup = function(group, act){

						if (group){

							if(typeof act === 'undefined') act = !!!group.active

							group.active = act;


							var pl = _el.find('[groupid="'+group.id+'"]')
							var el = pl.find('.vmt_group_params');
							var level = pl.attr('level')

							if (group.active){
								el.html(parameter.renderLevel(group.values, level + 1))

								pl.removeClass('hidden');
								pl.addClass('active');
							}
							else{
								el.html('')
								pl.removeClass('active');
							}
						}	

						
					}

					var closeAll = function(){
						_.each(parameter.treemap, function(p){
							p.active = false;
							
						})

						/*_el.find('.vmt_group_params').html('');

						_el.find('[groupid]').removeClass('active').addClass('hidden')*/

					}

					

					_el.find('.vmt_showMore').on('click', function(){

						_el.addClass('showedMore')
					})

					_el.find('.vmt_hideMore').on('click', function(){

						_el.removeClass('showedMore')
					})

					_el.find('.autoSearch').on('keyup', function(e){
						var v = $(this).val();


						if (v && v.length > 1){

							if ((e.keyCode || e.which) == 13) {

								var _v = parameter.treemap[v]

								if(_v){

									removeEqual(parameter.value, _v.id)

									_el.find('input[value="'+_v.id+'"]').prop('checked', true).change();

									$(this).val('');

									closeAll();

									var h = parameter.renderLevel(null, 0)

									_el.find('.chinputsv').html(h);

									checking();
								}

							}

							else
							{
								closeAll();

								var r = parameter.searchValues(v)

								var openmap = {};

								_.each(r, function(value){
									_.each(value.parents, function(parent){

										openmap[parent.id] = true

									})
								})

								var h = parameter.renderLevel(null, 0, {
									group : function(group){	
										if(openmap[group.id]) {
											group.active = true;
											return true;
										}
									},

									value : function(value){

										if(r[value.id]) return true;

									}
								})

								_el.find('.chinputsv').html(h);
								checking();
							}
						}
						else
						{
							closeAll();
							var h = parameter.renderLevel()

							_el.find('.chinputsv').html(h);

							checking();
						}
						
					})

					inieve(_el);

					checking();

					return;
				}

				if (parameter.type == 'valuesmulti')
				{
					_el.find('input').on('change', function(){

						var value = $(this).attr('val');
						var checked = $(this).is(":checked") ? 1 : 0;

						parameter.set(value, checked);

						_el.removeClass('error')
					})

					_el.find('.vm_showMore').on('click', function(){

						_el.addClass('showedMore')
					})

					_el.find('.vm_hideMore').on('click', function(){

						_el.removeClass('showedMore')
					})

					return;
				}

				if (parameter.type == 'valuescustom' || parameter.type == 'values' || parameter.type == 'valuesmultibig'){
										
					var bkp = null;

					var input = _el.find('.vc_inputWrapper input');

					var take = function(){
						if(parameter.type == 'valuesmultibig'){
							return _el.find('.vc_valuecustom')
						}
						else
						{
							return _el;
						}
					}

					var open = function(){

						take().toggleClass('opened');

						_el.find('.vc_value').removeClass('hidden')


						if(take().hasClass('opened')){
							$('html').on('click', closeclick)

							window.addEventListener('scroll', close);

							_el.find('.vc_selectInput').scrollTop(0)
						}
						else
						{
							close()
						}
					}

					var close = function(){

						if(bkp){
							input.val(bkp)
						}

						take().removeClass('opened');

						$('html').off('click', closeclick)
						
						window.removeEventListener('scroll', close);
					}

					var closeclick = function(e){

						

						if (_el.has(e.target).length === 0 && take().hasClass('opened')) {
							
							close();

						}
					}

					if(parameter.type == 'valuescustom' || parameter.autoSearch)
					{
						_el.find('.vc_iconWrapper').on('click', function(){
							open()

							if (parameter.autoSearch){

								setTimeout(function(){
									input.focus();
									bkp = input.val()
									input.val('')

								}, 200)
								
							}
						})

						_el.find('input').on('focus', function(){
							$(this).select();
						})

						
					}

					if(parameter.type == 'values' && !parameter.autoSearch)
					{
						_el.find('.vc_textInput').on('click', function(){
							open()
						})
					}


					_el.find('.vc_value').on('click', function(){
						bkp = null;

						var value = $(this).attr('value');

							input.val(value);
							input.change();

						take().removeClass('opened');
						take().removeClass('error')
					})

					_el.find('.vc_selected_value_icon').on('click', function(){
						var value = $(this).closest('.vc_selected_value').attr('value');

						parameter.set(value);

						_el.parent().html(parameter.input())

						ParametersLive([parameter], el, p)
					})


					if (parameter.autoSearch){

						input.focus(function(){
							this.select();
						});

						input.on('keyup', function(e){
							bkp = null;

							var value = $(this).val().toLowerCase(); 

							if(!take().hasClass('opened')){
								open();		
							}

							if ((e.keyCode || e.which) == 13) {

								var firstel = _el.find('.vc_value:not(.hidden)');

								if (firstel.length > 0){
									value = firstel.attr('value')
								}

								$(this).val(value);
								$(this).change();


								return false;
								
							}	

							if(!value){
								_el.find('.vc_value').removeClass('hidden')
							}

							else
							{

								$.each(_el.find('.vc_value'), function(){

									var el = $(this);

									var _value = el.attr('value').toLowerCase();
									var text = el.text().toLowerCase();

									if (_value.indexOf(value) > -1 || text.indexOf(value) > -1){
										el.removeClass('hidden')
									}

									else
									{
										el.addClass('hidden')
									}



								})
							}
						})
					}

					var _change = function(){
						var __el = $(this)

						var value = __el.val(); 

						if(parameter.autoSearch){

							var valid = parameter.isValid(value);


							if (value && !valid){

								setTimeout(function(){

									if (__el.val() == value){

										if(parameter.require){

											$(__el).val(parameter.defaultValue);


											$(__el).change();

										}

									}

									
								}, 150)

								

								return
							}

							if (valid){
								value = valid
							}

						}

						parameter.set(value);

						var label = parameter.labelByValue(value)

						if (parameter.labelToInput){
							__el.val(parameter.labelToInput(label))

							_el.parent().html(parameter.input())

							ParametersLive([parameter], el, p)

							return
						}
						else
						{
							__el.val(label)
						}

						console.log('value', value, label)

						

						if (parameter.type == 'valuesmultibig'){							

							_el.parent().html(parameter.input())

							ParametersLive([parameter], el, p)
						}

						_el.removeClass('error');
					}

					input.on('change', _change)

					if (parameter.onType){
						input.on('keyup', _change)
					}

					return;
				}

				if (parameter.type == 'location'){

					parameter.options.inputBinding || (parameter.options.inputBinding = {})

					parameter.options.inputBinding.locationNameInput = _el.find('.place input')
					parameter.options.inputBinding.radiusInput = _el.find('.radius select')

					parameter.options.onchanged = function (currentLocation, radius, isMarkerDropped) {

						var context = $(this).locationpicker('map')

				    	var addressComponents = context.location.addressComponents;

				    	var l =  {}; _.clone(currentLocation);


				    		l.latitude = currentLocation.latitude;
				    		l.longitude= currentLocation.longitude;
				    		l.radius = radius;
				    		l.country = addressComponents.country;
				    		l.zip = addressComponents.postalCode;
				    		l.place = context.location.formattedAddress;



				    	parameter.set(l)

				    }

				    parameter.options.location = {
				    	latitude : parameter.value.latitude,
				    	longitude : parameter.value.longitude
				    }

				    parameter.options.enableAutocomplete = true;

				    parameter.options.autocompleteOptions = {
				    	types: ['(regions)'],
				    	componentRestrictions: {
					      country: "us"
					    }
				    }
				    

				    parameter.options.enableAutocompleteBlur = true;

                    parameter.options.radius = parameter.value.radius;

                    if (parameter.options.radius > 5000) {
                    	parameter.options.zoom = 10
                    }
                    if (parameter.options.radius > 10000) {
                    	parameter.options.zoom = 9
                    }
                    if (parameter.options.radius > 20000) {
                    	parameter.options.zoom = 8
                    }
                    if (parameter.options.radius > 50000) {
                    	parameter.options.zoom = 7
                    }
                    if (parameter.options.radius > 100000) {
                    	parameter.options.zoom = 6
                    }
                    if (parameter.options.radius > 250000) {
                    	parameter.options.zoom = 5
                    }
                    if (parameter.options.radius >= 500000) {
                    	parameter.options.zoom = 4
                    }

					_el.find('.map').locationpicker(parameter.options);

					_el.find('.locationInputUse input').on('change', function(){
						var using = $(this).is(":checked") ? true : false;

						_el.toggleClass('notused');

						if(!using){
							_el.find('.place input').attr('disabled', 'disabled')
							_el.find('.radius select').attr('disabled', 'disabled')
						}
						else
						{
							_el.find('.place input').removeAttr('disabled')
							_el.find('.radius select').removeAttr('disabled')
						}
						

						parameter.set({
							using : using
						})

					})

					return;
				}

				if(parameter.type == 'color'){

					_el.simpleColor({
						boxWidth : 60,
						cellWidth : 30,
						cellHeight : 30,
						columns : 4,
						cellMargin : 2,
						colors : parameter.possibleValues,
						onSelect : function(color){
							parameter.set(color)
						}
					});

				}

				if(parameter.type == 'date'){

					_el.pickadate({
						today: '',
						onSet : function(c){

							if(c.select){
								var d = dateToStrSmall(new Date(c.select))

								parameter.set(d)
							}
							else
							{
								parameter.set()
							}

							

						},
						selectYears : true,
						selectMonths : true,
						format: 'dddd, dd mmm, yyyy',
						formatSubmit: 'yyyymmdd',
						min : parameter.options.min || undefined,
						max : parameter.options.max || undefined,
					})

					var pickadate = _el.pickadate('picker')

					if (parameter.value)
						pickadate.set('select', strToDateArr(parameter.value))

				}

				if(parameter.type == 'daterange'){

					var pickadatef;
					var pickadatet;

					var applydate = function(){

						if(parameter.value[0]){
							pickadatet.set('min', strToDateArr(parameter.value[0]))
						}
						else
						{
							pickadatet.set('min', parameter.options.min || false)
						}

						if(parameter.value[1]){

							pickadatef.set('max', strToDateArr(parameter.value[1]))
						}
						else
						{
							pickadatef.set('max', parameter.options.max || false)
						}

					}

					var pic = {
						selectYears : true,
						selectMonths : true,
						today: '',
						format: 'dddd, dd mmm, yyyy',
						formatSubmit: 'yyyymmdd',
						min : parameter.options.min || undefined,
						max : parameter.options.max || undefined
					}

					var from = _.clone(pic);
					var to = _.clone(pic);

					var set = function(c, index){
						var d = '';

						if(c.select) 

							d = dateToStrSmall(new Date(c.select))

						if(typeof c.select != 'undefined' || typeof c.clear != 'undefined'){
							parameter.set(d, index)

							applydate();
						}

						
					}

					from.onSet = function(c){

						set(c, 0)

					};

					to.onSet = function(c){
						set(c, 1)	
					}

					_el.find('.from').pickadate(from)
					_el.find('.to').pickadate(to)

					pickadatef = _el.find('.from').pickadate('picker')
					pickadatet = _el.find('.to').pickadate('picker')

					if (parameter.value[0])
						pickadatef.set('select', strToDateArr(parameter.value[0]))

					if (parameter.value[1])
						pickadatet.set('select', strToDateArr(parameter.value[1]))

					applydate();

					return;

				}

				if(parameter.type == 'hours')
				{
					_el.find('.dayrow select').on('change', function(){

						var value = $(this).val();

						var index2 = $(this).closest('.trange').attr('index');

						var index = $(this).closest('.dayrow').attr('day');

						if (value == 'false') 
							value = null;

						parameter.set(value, index, index2)

						_el.removeClass('error')
							
					})

					return ;
				}

				if (parameter.type == 'category'){


					_el.on('click', function(){


						parameter.app.nav.api.load({
							open : true,
							id : 'postSelectCategory',
							inWnd : true,

							essenseData : {
								header : "Select Category",
								path : _el.attr('parent'),

								validation : 'canCreateItem',

								onSelectCategory : function(category){

									parameter.set(category.path())

								}
							}
						})

					})

					return

				}

				if (parameter.type == 'phone'){
					
					_el.mask("(999) 999-9999");
				}


				if (parameter.type == 'string' && parameter.autoSearch){

					var placeholder = _el.closest('.vc_autosearchInput').find('.placeholderghost');

					var neutral = '&nbsp;'

					var slowMadeTimer;

					_el.on('keydown', function(e){

						var __el = $(this);						

						var v = __el.val();

						if ((e.keyCode || e.which) == 39 /*|| (e.keyCode || e.which) == 13*/) {			
							var v = placeholder.html()

							if (v != neutral)
							{
								placeholder.html(neutral);

								__el.val(placeholder.attr('value'));
								__el.change()
							}
						}
						else
						{
							placeholder.html(v || neutral)
						}

					})

					var act = function(e){
						var __el = $(this)

						var v = __el.val();



						placeholder.html(v || neutral)

						if(v && (e.keyCode || e.which) != 13){

							
								parameter.autoSearch(v, parameter, function(text){

									if(__el.val() != v) return;

									placeholder.html(v || neutral)
									

									if(v && text && text.toLowerCase().indexOf(v.toLowerCase()) == 0){
										placeholder.html(v + text.substr(v.length)).attr('value', text)
									}


								})

							
						}
						
					}

					_el.on('keyup', act)
					_el.on('focus', act)
					_el.on('blur', function(){
						placeholder.html(neutral)
					})


				}

				var _change = function(){
					var value = $(this).val(); 	
		

					if(parameter.type == 'boolean') 
						value = $(this).is(":checked") ? 1 : 0;

					if(parameter.type == 'email'){
						if(value == '_@_._') value = ''
					}

					if (parameter.isValid(value))
					{
						_el.removeClass('error')
					}
					else
					{
						_el.addClass('error')
					}


					parameter.set(value)
				}
 
				_el.on('change', _change)

				if (parameter.onType){
					_el.on('keyup', _change)
				}
			}

		})

		if (el.find('input').inputmask){

			$.each(el.find('input'), function(){
				var i = $(this);

				if(!i.attr('notmasked')){
					i.inputmask({});
				}
			})

		}
	}


	Parameter = function(p){

		if(!p) p = {};

		var self = this;

			self.type = (p.type || "NUMBER").toLowerCase();
			self.name = p.name || '';
			self.id = p.id || makeid();
			self.defaultValue = p.defaultValue;
			self.order = p.order || 0;
			self.require = p.require || false;
			self.options = p.options || {}; 
			self.canClear = true;
			self.patterns = p.patterns || [];
			if (p.canClear === false) self.canClear = p.canClear;

		
			self.possibleValues = p.possibleValues || [];
			self.possibleValuesLabels = p.possibleValuesLabels || [];
			self.value = p.value || null;
			self.defaultValuesTemplate = p.defaultValuesTemplate || null;
			self.defaultValueTemplate = p.defaultValueTemplate || null;
			self.labelToInput = p.labelToInput || null; 
			self.currency = p.currency || null;
			self.disabled = p.disabled;

			self.app = p.app;

			self.upload = p.upload;
			self.uploadTemplate = p.uploadTemplate;
			self.previewTemplate = p.previewTemplate;
			self.previewPath = p.previewPath;
			self.onLive = p.onLive;

			self.hidden = p.hidden || false;
			self.groupId = p.groupId || 0;

			self.dbId = p.dbId || null;
			self.convert = p.convert || null;
			self.dbConvert = p.dbConvert || null;
			self.dbType = p.dbType || null;
			self.dbFunc = p.dbFunc || 'equal';

			self._onChange = p._onChange || null;
			self.onType = p.onType || null;

			self.description = p.description || ''

			self.format = p.format || {};

			self.placeholder = p.placeholder || '';

			self.autoSearch = p.autoSearch || false;
			self.html = p.html || false;

			self.operatorSelect = p.operatorSelect || null;
			self.operator = p.operator || null;
            self.if = p.if || null;
            
            self.text = p.text || null;

		if(self.type.indexOf('range') > -1) self.dbFunc = 'fromto'

		self.removeImage = function(p){
			var img = new Img({
				type : self.upload.data.essense,
				name : p.value,
				app : self.app,
				refId : self.upload.data.essense.RefID
			})

			img.remove(function(r){

				removeEqual(self.value, p.value);

				if (p.clbk)
					p.clbk(r);
			})
		}

		self.isValid = function(value){

			if(typeof value == 'undefined')
				value = self.value;

			var mask = self.mask();

			if(self.type == 'number' || self.type == 'cash')
			{
				value = Number(value).toFixed(deep(self, 'format.Precision') || 0)
            }
            
            if(self.type == 'label')
			{
				return true;
			}

			if(self.type == 'hours')
			{
				return true;
			}

			if(self.type == 'color')
			{
				return true;
			}

			if(self.type == 'date' || self.type == 'daterange')
			{
				return true;
			}

			if(self.type == 'html' || self.type == 'text')
			{
				if(self.require && !value)

					return false;

				return true;
			}

			var ptest = true;

			_.each(self.patterns, function(p){

				if(!p.test(value)) ptest = false;
				

			})

			if(!ptest) return false;

			if((self.type == 'values' || self.type == 'valuesmultibig') && self.autoSearch){

				var _v = _.find (self.possibleValues, function(_v){

					if(_v.toLowerCase() == value.toLowerCase()) return true;

				})

				if (!_v) return false;

				else
				{
					return _v.toUpperCase();
				}
			}


			if(self.type == 'boolean') return true

			if (!self.require && (!value || value == 0)) return true

			var isValid = Inputmask.isValid(value.toString(), mask);

			if (self.require && (!value || value == 0)) isValid = false;

			if ((self.type == 'number' || self.type == 'cash') && !_.isNumber(Number(value)))  isValid = false;

			return isValid;
		}

		self.openGallery = function(p){

			if(!p) p = {};

			var images = _.map(self.value, function(v){
				return new Img({
					type : self.upload.data.essense,
					name : v,
					app : self.app
				})
			})

			p = _.extend(p, {
				images : images,
				essense : self.upload.data.essense,
				size : 'full',
				smallSize : 'thumbnail',
				edit : true
			})

			self.app.nav.api.load({
				open : true,
				id : 'imageGallery',
				inWnd : true,

				essenseData : p
			})
		}


		self.default = function(){

			var def = {
				string : '',
				number : 0,
				percent : 0,
				dollars : 0,
				text : '',
				category : 0,
				html : '',
				location : {

                    country:"US",
                    latitude:40.73387539871257,
                    longitude:-73.98949970898434,
                    place:"New York, NY 10003, USA",
                    radius:10000,
                    zip:"10003",

                    using : true
 
				},
				valuesmulti : [],
				values : '',
				boolean : false,
				cash : 0,
				image : [],
				numberrange : ['', ''],
				cashrange : ['', ''],
				hours : {},
				valuesmultibig : [],
				valuescustom : '',
				valuesmultitree : [],
				phone : '',
				color : '#1E3DF7',
				date : '',
				daterange : ['', ''],
				email : '',
				stringany : '',
				nickname : '',
				image : '',
				password : '',
				file : ''
			}

			if(typeof self.defaultValue != 'undefined') return self.defaultValue;	

			if(self.type && typeof def[self.type] != 'undefined'){

				return def[self.type];

			}

			else
				return 0;
		}

		self.renders = {
			category : function(clear){
				var category = self.app.store.categories.find(self.value || '0');

				if (category){
					return category.htmlpath();
				}
				else
				{
					return '';
				}
			},
			boolean : function(clear){
				var input = '';
				var checked = '';

				if(self.value && self.value != '0') checked = 'checked';

				input += '<input pid="'+self.id+'" type="checkbox" disabled id="checkbox_'+self.id+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
				input += '<label for="checkbox_'+self.id+'"></label>';
				
				return input;
			},

			numberrange : function(clear, index){
				return self.value[index]
			},

			cashrange : function(clear, index){
				return self.value[index]
			},
		}
		self.mask = function(tohtml){

			var f = self.format || {}

			var masked = false;

			var mask = {
				rightAlign : false,
				autoUnmask : true,
				showMaskOnHover: false,
				showMaskOnFocus: false,
				clearMaskOnLostFocus: true,
			}

			if(self.type == 'number' || self.type == 'cash')
			{
				mask.alias = 'numeric';
				mask.groupSeparator = typeof f.groupSeparator != 'undefined' ? f.groupSeparator : ',';
				mask.radixPoint =  '.';
				mask.digits = deep(self, 'format.Precision');
				mask.digitsOptional = !1;
				mask.autoGroup = true;
				mask.allowMinus = deep(self, 'format.AllowMinus') || false;

				if(deep(self, 'format.Min')) mask.min = deep(self, 'format.Min')
				if(deep(self, 'format.Max')) mask.max = deep(self, 'format.Max')

				if (mask.digits > 0){
					mask.placeholder = "0.00"
				}
				
				masked = true;
			}



			if(self.type == 'numberrange' || self.type == 'cashrange'){
				mask.alias = 'numeric';
				mask.nullable = true;
				mask.groupSeparator = ',';
				mask.autoGroup = true;

				mask.digits = deep(self, 'format.Precision');
				
				masked = true;
			}

			if(self.type == 'email')
			{
				mask.alias = 'email';

				masked = true;
			}

			if(self.type == 'string'){

				var limits = [0,''];

				if (self.require) limits[0] = 1;
				if (self.format.Length) limits[1] = self.format.Length;

				mask.regex = "[а-яА-Яa-zA-Z0-9 ,-.&]{"+limits.join(',')+"}";

				masked = true;
				
			}

			if(self.type == 'nickname'){

				var limits = [0,''];

				if (self.require) limits[0] = 1;
				if (self.format.Length) limits[1] = self.format.Length;

				mask.regex = "[a-zA-Z0-9_]{"+limits.join(',')+"}";

				masked = true;
				
			}

			if(self.type == 'stringany'){

				var limits = [0,''];

				if (self.require) limits[0] = 1;
				if (self.format.Length) limits[1] = self.format.Length;

				mask.regex = "[^|]{"+limits.join(',')+"}";

				masked = true;
				
			}

			if (masked)
			{

				if(tohtml)
				{
					mask = JSON.stringify(mask);
					mask = mask.substring(1);
					mask = mask.substring(0, mask.length - 1).replace(/"/g,"'");
					mask = 'data-inputmask="'+mask+'"';
				}

				return mask;
			}
			else
			{
				if(tohtml)
				{
					return '';
				}

				return null;
			}
		}

		self.labelByValue = function(v){
			var index = _.indexOf(self.possibleValues, v);

			if (index > -1){
				return self.possibleValuesLabels[index]
			}

			/*index = _.indexOf(self.possibleValues, function(_v){
				if(_v && _v.address) return _v.address == v
			});

			if (index > -1){
				return self.possibleValuesLabels[index]
			}*/

			return v;
		}

		self.operatorInput = function(){

			if(!self.operatorSelect){
				return ''
			}

			var input = '<div class="operator"><select class="operatorselect">';

			_.each(self.operatorSelect, function(operator){

				var selected = '';
				
				if(operator.id == self.operator) selected = 'selected'

				input += '<option '+selected+' + value="'+operator.id+'">'+operator.name+'</option>'
			})
				
				input += '</select></div>'

			return input;
		},

		self.input = function (inputp) {

			var __disabled = ''

			if(self.disabled) {
				__disabled = 'disabled="disabled"'
			}

			if(!inputp) inputp = {};

			var m = self.mask(true);

			if (self.type == 'image' || self.type == 'file') {

				if(self.uploadTemplate && self.upload && self.previewTemplate){

					return self.uploadTemplate(self)

				}
			}

			if (self.type == 'location'){

				var checked = 'checked';
				var notused = '';
				var disabled = ''

				if(!self.value.using) {
					checked = '';
					notused = 'notused';
					disabled = 'disabled="disabled"'
				}


				return '<div pid="'+self.id+'" class="locationInputWrapper '+notused+'"><div class="table locationInputs">'+
				'<div class="locationInputUse"><input type="checkbox" id="checkbox_'+self.id+'_location" ' + checked + ' class="checkbox nolabel" />'+

				'<label for="checkbox_'+self.id+'_location"></label>'+'</div>'+
					'<div class="locationInput place"><input type="text" notmasked="notmasked" placeholder="Name Of Place"></div><div class="locationInput radius">'+
					'<select>'+
					'<option value="1000">1 mi</option><option value="5000">5 mi</option><option value="10000">10 mi</option><option value="20000">20 mi</option><option value="50000">50 mi</option><option value="100000">100 mi</option><option value="500000">500 mi</option>'
					+ '</select>'

					+'</div>' +
				'</div><div class="mapwr"><div class="map"></div><div class="mapbwoverlay"></div></div></div>'
			}

			if (self.type == 'valuescustom' || self.type == 'values' || self.type == 'valuesmultibig') {

				var disabled = '';

				

				var displayValue = self.value

				if (self.type == 'valuesmultibig') displayValue = ''

				if (self.type == 'values' && !self.autoSearch)
				{
					disabled = 'disabled';

					
				}

				if (self.type == 'values' || self.type == 'valuescustom'){
					displayValue = self.labelByValue(self.value)

					if(self.labelToInput){
						displayValue = self.labelToInput(displayValue)
					}
				}

				var caret = '';

					caret += 		'<div class="vc_iconWrapper">';
					caret += 			'<div class="vc_iconSpinWrapper">';
					caret += 				'<i class="fa fa-caret-down" aria-hidden="true"></i>';
					caret += 			'</div>';
					caret += 		'</div>';

				var input = '';

				if(self.type == 'valuesmultibig'){
					input += '<div class="vc_valuecustom_multibig" pid="'+self.id+'">';
					input += '<div class="vc_valuecustom">';
				}
				else
				{
					input += '<div class="vc_valuecustom" pid="'+self.id+'">';
				}
					
					input += 	'<div class="vc_textInput table">';

					if(self.format.right)
						input += caret;

					input += 		'<div class="vc_inputWrapper">';
					input += 			'<input '+disabled+' type="text" value="'+displayValue+'" placeholder="'+self.placeholder+'">';
					input += 		'</div>';

					if(!self.format.right)
						input += caret;



					input += 	'</div>';

					input += 	'<div class="vc_selectInput">';

					if (self.defaultValuesTemplate)
					{
						input += self.defaultValuesTemplate(self)
					}
					else
					{
						if(!self.defaultValue)
						{
							input += '<div class="vc_value" value="">';
							input += '&nbsp;';
							input += '</div>';
						}

						_.each(self.possibleValues, function (value, index) {

							//if(self.possibleValuesLabels[index]) label = self.possibleValuesLabels[index]

							if(self.type == 'valuesmultibig'){

								if(_.indexOf(self.value, value.toUpperCase()) > -1) return
							}

							var label = self.labelByValue(value);

							input += '<div class="vc_value" value="' + value + '">';

							if (self.defaultValueTemplate)
							{
								input += self.defaultValueTemplate(label, value, self)

							}
							else{
								input += label;
							}
							
							
							input += '</div>';

					  	});
					}

					

				  	input += '</div>';
				  	input += '</div>';

				  	if (self.type == 'valuesmultibig'){
				  		input += '<div class="vc_selected_values">';
				  		
				  		_.each(self.value, function(value, index){

				  			var label = self.labelByValue(value);
				  			
				  			input += '<div class="vc_selected_value table" value="'+value+'">';
				  				input += '<div class="vc_selected_value_icon">';
				  				input += '<i class="fas fa-times-circle"></i>';
				  				input += '</div>';

				  				input += '<div class="vc_selected_value_value">';
				  				input += label;
				  				input += '</div>';
				  			input += '</div>';
				  		})

				  		input += '</div>';

				  		if(self.value.length > 1){
				  			input += self.operatorInput();
				  		}

				  		input += '</div>';
				  		
				  	}

					

				return input;
			}

			if (self.type == 'text' || self.type == 'html') {

				var input = '<textarea placeholder="'+self.placeholder+'" notmasked="notmasked" pid="'+self.id+'" class="' + self.type + ' ">' + self.render(true) + '</textarea>';

				return input;
			}

			if (self.type == 'category') {

				var category = self.app.store.categories.find(self.value || '0');

				if (category && category.canCreateItem()){

					var input = '<div parent="'+category.parent.path()+'" pid="'+self.id+'" class="editCategoryPath">' + category.htmlpath() + '</div>';

				}
				else
				{
					var input = '<button pid="'+self.id+'" class="selectCategoryPath">Select Category</button>';
				}

				return input;
			}

			if (self.type == 'valuesmulti'){

				var input = '<div class="vm_valuesmulti" pid="'+self.id+'">';

					_.each(self.possibleValues, function (value, index) {

						var checked = '';
						var label = value;

						if(self.possibleValuesLabels[index]) label = self.possibleValuesLabels[index]

						if(self.options.valueTemplate) 

							label = self.options.valueTemplate(value, label)

						if(_.indexOf(self.value, value) > -1) checked = 'checked';

						if(index == 5){
							input += '<div class="vm_showMore">Show More</div>'
							input += '<div class="vm_hidden">'
							input += '<div class="vm_hideMore">Hide</div>'
						}

						input += '<div class="vm_value">'
							input += '<input val="'+value+'" type="checkbox" id="checkbox_'+self.id+'_'+value+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
						input += '<label for="checkbox_'+self.id+'_'+value+'">'+label+'</label>';

						input+= '</div>'

					})

					if(self.possibleValues.length >= 6){
						input += '<div class="vm_hideMore">Hide</div>'
						input+= '</div>'
					}


					input+= '</div>'


				return input;

			}

			if(self.type == 'valuesmultitree'){

				var filters = null;

				var input = '<div class="vmt_valuesmultitree" pid="'+self.id+'">';

				if(self.autoSearch){
					input += '<div class="autoSearchWrapper"><input type="text" class="autoSearch" placeholder="Search Code"></div>'
				}

				if(inputp.init){

					var openmap = {};
					var r = {}

					_.each(self.value, function(id){

						var value = self.treemap[id]

						if(!value) return

						r[id] = value


						_.each(value.parents, function(parent){

							openmap[parent.id] = true

						})
					})

					filters = {
						group : function(group){	
							if (openmap[group.id]) {

								group.active = true;

								return true;
							}
						},

						value : function(value){

							return true;

						}
					}
				}

				self.renderLevel = function(values, level, filters){

					var input = '';

					input += '<div class="nextlevel">'

					var sh = false;

					self.every({
							group : function(group, level, index, next){

								/*if (index == 5 && !level && !inputp.showall){
									input += '<div class="vmt_showMore">Show More</div>'
									input += '<div class="vmt_hidden">'
									input += '<div class="vmt_hideMore">Hide</div>'

									sh = true;
								}*/

								var v = group.name;
								var active = group.active || (filters && filters.group(group));

								if(self.options.valueTemplate) 

									v = self.options.valueTemplate(group)

								if(!active && filters){
									if(!filters.value(group)) return
								}

								input += '<div class="vmt_group " level="'+level+'" groupid="'+group.id+'">'
									input += '<div class="vmt_name table">'
										input += '<div class="vmt_checkbox">'
											input += '<input type="checkbox" value="'+group.id+'" id="checkbox_' + self.id + group.id + '" class="checkbox" />'
											input += '<label for="checkbox_' + self.id + group.id + '">'+v+'</label>';
										input += '</div>'
										input += '<div class="vmt_panel">'
											input += '<div class="vmt_panel_wrapper">'
												input += '<i class="fa fa-angle-up" aria-hidden="true"></i>'
											input += '</div>'	
										input += '</div>'
									input += '</div>'
									input += '<div class="vmt_group_params">'

									if(active){
										input += '<div class="nextlevel">'
											next();
										input += '</div>'
										
									}

									input += '</div>'
									
								input += '</div>'
							},
							value : function(value, level, index){

								/*if (index == 5 && !level && !inputp.showall && !sh){
									input += '<div class="vmt_showMore">Show More</div>'
									input += '<div class="vmt_hidden">'
									input += '<div class="vmt_hideMore">Hide</div>'

									sh = true;
								}*/

								if(filters && !filters.value(value)) return;

								var v = value.name;

								if(self.options.valueTemplate) 
									v = self.options.valueTemplate(value)

								input += '<div class="vmt_value" level="'+level+'" groupid="'+value.id+'">'
									input += '<div class="vmt_checkbox">'
										input += '<input type="checkbox" value="'+value.id+'" id="checkbox_'+ self.id + value.id + '" class="checkbox" />'
										input += '<label for="checkbox_'+self.id + value.id + '">'+v+'</label>';
									input += '</div>'
								input += '</div>'

							},
						},

						values, 

						level
					)

					input +='</div>'

					return [input,sh];
				}

				
				var shi = self.renderLevel(null, 0, filters);

				input += '<div class="chinputsv">';
				input += shi[0]
				input += "</div>"

				/*if (shi[1]){
					input += '<div class="vmt_hideMore">Hide</div>'
					input+= '</div>'
				}*/

				input += "</div>"

				return input;

			}

			if (self.type == 'boolean') {

				var input = '';
				var checked = '';

				if(self.value && self.value != '0') checked = 'checked';

				input += '<input pid="'+self.id+'" type="checkbox" id="checkbox_'+self.id+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
				input += '<label for="checkbox_'+self.id+'"></label>';
				

				return input;

			}

			if (self.type == 'cash') {

				var input = '<div class="cashWrapper" pid="'+self.id+'">';

					input += '<div class="inputCashWrapper">';

					input += '<input ' + m + ' class="' + self.type + ' input" value="' + self.render(true) + '">';

					input += '</div>';

				if(self.currency){

					input += '<div class="convertCashWrapper">'
					input += 	'<div class="convertValue">'+self.app.store.cash.toBTC(self.value, self.currency, true)+'</div>'
					input += '</div>'

				}

					input += '</div>'

				return input;

			}

			if (self.type == 'cashrange') {

				var input = '<div class="cashrangeWrapper" pid="'+self.id+'">';

					input += '<div class="inputsCashrangeWrapper">';

						input += '<div class="inputCashrangeWrapper">';

						input += '<input index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

						input += '</div>';

						input += '<div class="inputCashrangeWrapper">';

						input += '<input index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

						input += '</div>';

					input += '</div>';

				if(self.currency){

					input += '<div class="convertsCashrangeWrapper">'

						input += '<div class="convertCashrangeWrapper">'

						input += 	'<div class="convertValue" index="0">'+self.app.store.cash.toBTC(self.value[0], self.currency, true)+'</div>'
					
						input += '</div>'

						input += '<div class="convertCashrangeWrapper">'

						input += 	'<div class="convertValue" index="1">'+self.app.store.cash.toBTC(self.value[1], self.currency, true)+'</div>'
					
						input += '</div>'

					input += '</div>'

				}

					input += '</div>'

				return input;

			}

			if (self.type == 'numberrange') {

				var input = '<div class="numberrangeWrapper" pid="'+self.id+'">';

					input += '<div class="inputNumberrangeWrapperFrom">';

					input += '<input index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

					input += '</div>';

					input += '<div class="inputNumberrangeWrapperTo">';

					input += '<input index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

					input += '</div>';

					input += '</div>'

				return input;
			}			

			if(self.type == 'color'){
				var input = '<input notmasked="notmasked" pid="'+self.id+'" class="simpleColor input" value="' + self.value + '">';
				
				return input

			}

			if(self.type == 'daterange'){

				var input = '<div class="numberrangeWrapper" pid="'+self.id+'">';

					input += '<div class="inputNumberrangeWrapperFrom">';

					input += '<input notmasked="notmasked" pid="'+self.id+'" class="datePicker input from" placeholder="From">'

					input += '</div>';

					input += '<div class="inputNumberrangeWrapperTo">';

					input += '<input notmasked="notmasked" pid="'+self.id+'" class="datePicker input to" placeholder="To">'

					input += '</div>';

					input += '</div>'

				return input;

			}

			if(self.type == 'daterange'){
				var input = '<input notmasked="notmasked" pid="'+self.id+'" class="datePicker input">';
				
				return input

			}

			if(self.type == 'phone'){


				var input = '<input notmasked="notmasked" pid="'+self.id+'" class="' + self.type + ' input" value="' + self.render(true) + '" type="text">';;
				
				return input

			}

			if(self.autoSearch){

				var input = '<div class="vc_autosearchInput">\
				<div class="placeholder"><div class="placeholderghost">&nbsp;</div></div>\
				<div class="autosearchInputCnt">\
				<input notmasked="notmasked" ' + m + ' pid="'+self.id+'" class="' + self.type + ' input" placeholder="'+(self.placeholder || "")+'" value="' + self.render(true) + '" type="text">\
				</div></div>';


				return input
			}

			if(self.type == 'password'){
				var input = '<input '+__disabled+' pid="'+self.id+'" class="' + self.type + ' input" placeholder="'+(self.placeholder || "")+'" value="' + self.render(true) + '" type="password">';

				return input; 

            }
            
            if(self.type == 'label'){
				return `<div ${__disabled} ${m} pid="${self.id}" class="simpleColor inpLabel">${self.value}</div>`
            }

            if(self.type == 'file_select'){
                return `
                    <input ${__disabled} ${m} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">
                    <button ${__disabled} ${m} pid="${self.id}_Selector" class="simpleColor inpButton btn_select">...</button>
                `;
            }
            
            if(self.type == 'button'){
				return `<button ${__disabled} ${m} pid="${self.id}" class="simpleColor inpButton" value="${self.value}">${self.text}</button>`
			}

			var input = `<input ${__disabled} ${m} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">`

			return input; 
		}

		self.render = function(clear, index){		

			if(self.renders[self.type])
			{
				return self.renders[self.type](clear, index);
			}
			else
			{
				if(_.isArray(self.value) && typeof index != 'undefined'){
					return self.value[index] || ''
				}
				return self.value;
			}

		}

		self.sets = {
			hours : function(value, index, index2){

				if(!self.value[index])
					self.value[index] = {
						start : null,
						end : null
					}

				self.value[index][index2] = value;

			},
			location : function(value){

				if(value){
					if(value.country) self.value.country = value.country
					if(value.latitude) self.value.latitude = value.latitude
					if(value.longitude) self.value.longitude = value.longitude
					if(value.place) self.value.place = value.place
					if(value.radius) self.value.radius = value.radius
					if(value.zip) self.value.zip = value.zip
					if(typeof value.using != 'undefined') self.value.using = value.using
				}
				else
				{
					self.value = self.default()
				}
			

				/*self.value = value;*/
			},
			number : function(value){

				value = Number(value)

				self.value = value;

			},
			numberrange : function(value, index){

				
			
				if (value !== '')

					value = Number(value)

				if(!_.isNumber(value)) value = '';

				self.value[index] = value;
			},
			cash : function(value){

				value = Number(value)

				if(!_.isNumber(value)) value = null;

				self.value = value;

			},
			cashrange : function(value, index){
				if (value !== '')

					value = Number(value)

				if(!_.isNumber(value)) value = '';

				self.value[index] = value;
			},
			daterange : function(value, index){

				self.value[index] = value;

			},
			image : function(value){
				if(typeof value == 'array' || !value){
					self.value = value;
				}
				else{
					self.value.push(value);
				}
			},
			valuesmulti : function(value){


				if(_.indexOf(self.value, value) > -1){
					removeEqual(self.value, value)
				}
				else
				{
					self.value.push(value)
				}

			},

			valuesmultibig : function(value){


				if(_.indexOf(self.value, value) > -1){
					removeEqual(self.value, value)
				}
				else
				{
					self.value.push(value)
				}

			},

			valuesmultitree : function(value){
				self.value = value;
			}
		}

		self.set = function(value, index, additional){

			if(value == '___nochange'){

			}
			else
			{
				if(typeof value == 'undefined') 

					self.value = self.default();

				else
				{

					if(self.calculation) value = self.calculation(value);

					if(!self.sets[self.type])
					{
						self.value = value;
					}
					else
					{
						self.sets[self.type](value, index, additional);
					}

				}
			}
	
			

			if (self._onChange) 
				self._onChange(self.value, self);
			
			if (self.onChange) 
				self.onChange(self.value, self);

		}

		self.get = function(){

			if(self.dbConvert) return self.dbConvert(self.value)

			return self.value;

        }

            if(self.type == 'valuesmultitree'){

			self.clear = function(){
				_.each(self.treemap, function(m){
					m.active = false
				})

			}

			self.convertValuesToAll = function(key, withgroup){
				if(!key) key = 'id';

				if(key == 'names') key = 'name'

				var values = _.map(self.value, function(id){
					var value = self.treemap[id];

					return value;
				})


				var result = [];

				self.every({
					group : function(i,j,k, n){

						if(withgroup){
							result.push(i[key])
						}

						n()
					},
					value : function(v){
						result.push(v[key])
					}
				}, values)

				return result
			}

			self.convertValues = function(key){
				if(!key) key = 'id';

				if(key == 'names') key = 'name'

				return _.map(self.value, function(id){
					var value = self.treemap[id];

					return value[key];
				})
			}

			self.composeValues = function(adding, removing){
				var n = {};

				_.each(self.value, function(v, i){
					if(!removing[v]) n[v] = true;
				})

				_.each(adding, function(v, i){
					if(!removing[i]) n[i] = true;
				})

				return n;
			}

			self.childselected = function(value, adding, removing){

				var n = self.composeValues(adding, removing);

				var v = _.filter(value.values, function(v){
					if(n[v.id]) return true;
				})
					
				return value.values.length == v.length

			}

			self.parentselected = function(value, adding, removing){

				var n = self.composeValues(adding, removing);

				var step = function(value){
					if (n[value.id]) return value;

					if (value.parent){
						return step(value.parent)
					}
					else
					{
						return null;
					}
				}

				if(!value) return null;

				return step(value)
				

			}

			self.every = function(actions, values, level){

				var onlevel = function(values, level){

					var l = values.length;

					for(var index = 0; index < l; index++){
						value = values[index]

						if(value){
							if(value.values){

								actions.group(value, level, index, function(){

									onlevel(value.values, level + 1);

								}, index)

							}
							else
							{
								actions.value(value, level, index)
							}
						}

						
					}
					
				}

				if(!values) values = self.possibleValues
				if(!level) level = 0

				onlevel(values, 0);
			}

			self.preparemap = function(){

				self.treemap = {};

				self.every({
					value : function(v, l){
						v.active = false;
						self.treemap[v.id] = v;
					},
					group : function(v, l, index, next){
						self.treemap[v.id] = v;

						_.each(v.values, function(value){
							value.parent = v;

							value.parents || (value.parents = [v]);

							_.each(v.parents || [], function(p){
								value.parents.push(p)
							})

							
						})



						next()
					}
				})

			}

			self.preparemap()

		}

		self.searchValues = function(str){

			str = str.toLowerCase()

			var res = {};

			var a = function(v){
				if(v.id == str || (v.name.toLowerCase().indexOf(str) > -1)){
					res[v.id] = v

				}
			}

			self.every({
				group : function(v, l, i, clbk){
					a(v);

					clbk()
				},
				value : a
			})

			return res
			
		}


		
		if (self.value === null) 
			self.value = self.default();

		

		return self;
	}


	Composite = function(p){
		if(!p) p = {};

			p.type = 'composite';


		var self = new Parameter(p);
			self.content = {};
			self.template = p.template;

		self.add = function(index, p){
			self.content[index] = p;

			p._onChange = function(){
				self.collectValues()
			}
		}

		_.each(p.parameters, function(p, index){

			self.add(index, p)

		})

		self.collectValues = function(){
			var value = {};
			
			_.each(self.content, function(p, index){
				if(p.value){
					value[index] = p.value;
				}
			})
			
			self.set(value)
		}

		self.applyValues = function(){

			_.each(self.content, function(p, index){

				var value = self.value[index]

				if(typeof value != 'undefined'){
					p.value = value

					if (p.applyValues)
						p.applyValues()
				}
				
			})

		}
		

		self.isValid = function(v, adderror){
			var valid = true;

			_.each(self.content, function(p){

				var pv = p.isValid(undefined, adderror)

					valid = valid && pv;


				if(!pv && pv.type != 'composite' && adderror && p.require){

					p.el.addClass('error')

				}
				else
					p.el.removeClass('error')
			})

			return valid;
		}

		self.input = function(){


			var input = '<div class="composite" pid="'+self.id+'">';

				input += self.template({
					content : self.content
				});

				input += '</div>';

			return input;
		}

		self.render = self.input;

		return self;
	}

	

	flb = function (str) {

		if(!str) return ""
		if(!str[0]) return str
		if(!str.substr) return str

		return str[0].toUpperCase() + str.substr(1);
	}

	emptyFunction = function(){
		return true;
	}

	var ___mobile = undefined
	var ___tablet = undefined

	isMobile = function(){

		if(typeof ___mobile != 'undefined'){
			return ___mobile
		}

		___mobile = $('html').hasClass('mobile');

		return ___mobile
	}

	isTablet = function(){

		if(typeof ___tablet != 'undefined'){
			return ___tablet
		}

		___tablet = $('html').hasClass('mobile') || $('html').hasClass('tablet');

		return ___tablet

	}

	convertToBase64 = function(dataURI) {

		var BASE64_MARKER = ';base64,';

		var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		var base64 = dataURI.substring(base64Index);
		var raw = window.atob(base64);
				
		return raw;
	}

	os = function() {
		var os = null;

		if (navigator.appVersion.indexOf("Win")!=-1) os = "windows";
		if (navigator.appVersion.indexOf("Mac")!=-1) os = "macos";
		if (navigator.appVersion.indexOf("X11")!=-1) os = "unix";
		if (navigator.appVersion.indexOf("Linux")!=-1) os = "linux";

		return os
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

	addtouri = function(uri, p, v){

		var s = p + "=" + v;

		if (uri.indexOf('?') > -1){
			uri += "&" + s
		}
		else{
			uri += "?" + s
		}

		return uri
	}

	rand = function(min, max){
	  min = parseInt(min);
	  max = parseInt(max);
	  return Math.floor( Math.random() * (max - min + 1) ) + min;
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

	ltrimrn = function(s)
	{
	  return (s || "").replace(/^[\r\n\t ]+/, ''); 
	}

	rtrimrn = function(s)
	{
	  return (s || "").replace(/[\r\n\t ]+$/, ''); 
	}

	trimrn = function(s)
	{
	  return rtrimrn(ltrimrn(s));
	}

	returnDaysInRange = function(k){
		var days;

		if(k == 'ytd') {
			var today = new Date();
			var startdate = new Date(dateUtc(today).y, 0, 1);
			days = ((today.getTime() - startdate.getTime())/1000/60/60/24).toFixed(0);
		}
		if(k == '5d') days  = 5;
		if(k == '1m') days  = 31;
		if(k == '2m') days  = 62;
		if(k == '3m') days  = 93;
		if(k == '6m') days  = 186;
		if(k == '1y') days  = 365;
		if(k == '2y') days  = 730;
		if(k == '3y') days  = 1096;
		if(k == '5y') days  = 1825;
		if(k == '10y') days  = 3652;
		if(k == 'max') days = 100000;

		return days;
	}

	maskValue = function(p) {
		if(!p) p = {};

		p.decimal || (p.decimal = '.');
		p.allowNegative || (p.allowNegative = true);
		p.precision || (p.precision = 0);
		p.thousands || (p.thousands = ',');
		p.prefix || (p.prefix = '');
		p.suffix || (p.suffix = '');

		if (p.value)	p.value = ""+p.value;
		var value = p.value || '0';

	    var negative = (value.indexOf("-") > -1 && p.allowNegative) ? "-" : "",
	        onlyNumbers = value.replace(/[^0-9]/g, ""),
	        integerPart = onlyNumbers.slice(0, onlyNumbers.length - p.precision),
	        newValue,
	        decimalPart,
	        leadingZeros;

	    // remove initial zeros
	    integerPart = integerPart.replace(/^0*/g, "");
	    // put settings.thousands every 3 chars
	    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, p.thousands);
	    if (integerPart === "") {
	        integerPart = "0";
	    }

	    newValue = integerPart;

	    if (p.precision > 0) {
	        decimalPart = onlyNumbers.slice(onlyNumbers.length - p.precision);
	        leadingZeros = new Array((p.precision + 1) - decimalPart.length).join(0);
	        newValue += p.decimal + leadingZeros + decimalPart;
	    }

	    var operator = "";
	    if (value.indexOf("-") > -1) {
	        value = value.replace("-", "");
	        operator = "-";
	    }

	    return negative + p.prefix + newValue + p.suffix;
	}

	Math.log2 = Math.log2 || function(x) {
	  return Math.log(x) / Math.LN2;
	};

	progressBar = function(p){
		if(!p && !p.el) return;

		if(p.progress >= 100) 	p.progress = 0;
		if(p.progress >= 100) 	p.status = '';
		if(p.progress >= 100) 	p.addStatus = '';

		if(typeof p.progress != undefined) p.el.find('.bar').width(p.progress + '%');
		if(typeof p.status != undefined) p.el.find('.status').html(p.status);
		if(typeof p.addStatus != undefined) p.el.find('.addStatus').html(p.addStatus);
	}

/* ______________________________ */

/* LOADERS */

	GetBrowser = function() {
		var N = navigator.appName,
			ua = navigator.userAgent,
			tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
		return M[0];
	}

	_saveAs = function(p) {


	    if (window.navigator.msSaveOrOpenBlob){
	    	var file = new Blob([decodeURIComponent(p.file)], {type: "text/" + p.format + ";charset=utf-8;"});

	    	window.navigator.msSaveOrOpenBlob( file, p.name + "." + p.format);
	    }
	    else { 

	    	saveAs(p)
	       
	    }
	}

	saveAs = function(p) {
		if (GetBrowser().toLowerCase() == 'msie') {
			message('Internet Explorer does not support this operation.');
			return false;
		}

		if(!p) p = {};

		var save = document.createElement('a');
		document.body.appendChild(save);

		save.download = p.download || ((p.name || 'unknown') + "." + p.format.toLowerCase());

		save.target = '_blank';

		if(!p.noA)
		{
			if(p.format.toLowerCase() == 'xlsx')  	p.file = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +  p.file;
			if(p.format.toLowerCase() == 'csv')  	p.file = 'data:text/csv;charset=utf-8,' + p.file;
			if(p.format.toLowerCase() == 'pdf')  	p.file = 'data:application/pdf;base64,' + p.file;

			if(p.format.toLowerCase() == 'txt')  	p.file = 'data:text;charset=utf-8,' + p.file;
		}
		

		save.href = p.file;
		save.click();

		//save.remove();

		return true;
	}

	b64toBlob = function(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;
		var byteCharacters = atob(b64Data);
		var byteArrays = [];
		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}
		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}

	saveAsWithCordova = function(file, name, clbk){


		var storageLocation = 'file:///storage/emulated/0/';
	


		window.resolveLocalFileSystemURL(storageLocation, function (fileSystem) {
			
			fileSystem.getDirectory('Download', {
				//create: true,
				exclusive: false
			},
			function (directory) {


				directory.getFile(name, { create: true, exclusive: false }, function (entry) {
					// After you save the file, you can access it with this URL
					var myFileUrl = entry.toURL();


					entry.createWriter(function (writer) {


						writer.onwriteend = function (evt) {
							sitemessage("File " + name + " successfully downloaded");

							if (window.galleryRefresh){

								window.galleryRefresh.refresh(myFileUrl, function (msg) {
									
								}, function (err) {

									
								})

							}
							else
							{
							}


							if (clbk)
								clbk(myFileUrl)
						};
						// Write to the file
						writer.seek(0);
						writer.write(file);
					}, function (error) {
						
						dialog({
							html : "Error: Could not create file writer, " + error.code,
							class : "one"
						})

					});
				}, function (error) {

					dialog({
						html : "Error: Could not create file, " + error.code,
						class : "one"
					})

				});

			}, function (error) {

				dialog({
					html : "Error: access to download folder, " + error.code,
					class : "one"
				})

			})


			
		}, function (evt) {

			dialog({
				html : "Error: Could not create file, " + evt.target.error.code,
				class : "one"
			})

		});
	
	}

/* ______________________________ */

/* NAVIGATION */

	initUp = function(el, p){

		if(!p) p = {};

		var self = this;
		var w = $(window);

		var actions = {
			up : function(){
				if (p.scrollTop){
					p.scrollTop()
				}
				else
				{
					_scrollTop(0);
				}
			}
		}

		var events = {
			up : actions.up,

			view : function(){
				if(w.scrollTop() > 200){
					el.fadeIn(100);
				}
				else
				{
					el.fadeOut(100);
				}
			}
		}

			self.destroy = function(){
				el.off('click', events.up)

				window.removeEventListener('scroll', events.view);
			}

			self.init = function(){
				el.on('click', events.up)

				window.addEventListener('scroll', events.view);

				return self;
			}

		return self;

	}

	_scrollTop = function(scrollTop, el, time){

		if(!el) {
			el = $("body,html");
		}

		if(typeof time == 'undefined') {
			time = 200;
		}

		if(time){
			el.animate({ scrollTop: scrollTop }, time);
		}
		else{
			el.scrollTop(scrollTop)
		}

		
	}

	_scrollTo = function(to, el, time, _if){
		
		if(!to) to = $(this);

		var ofssetObj = to.offset();

		var offset = (to.height() - $(window).height()) / 2;

		if(ofssetObj)
		{
			var scrollTop = ofssetObj.top + offset;

			if (el) scrollTop = scrollTop + el.scrollTop() - el.offset().top


			_scrollTop(scrollTop, el, time);
		}

	}

	_scrollToTop = function(to, el, time, offset){
		
		if(!to) to = $(this);

		if(!offset) offset = 0;

		var ofssetObj = to.offset();

		if (ofssetObj)
		{
			var scrollTop = ofssetObj.top + offset;

			if (el) {
				try{
					scrollTop = scrollTop + el.scrollTop() - el.offset().top + offset
				}
				catch(e){}
				
			}

			_scrollTop(scrollTop, el, time);
		}

	}

	_scrollToBottom = function(to, el, time, offset){
		
		if(!to) to = $(this);

		if(!offset) offset = 0;

		var ofssetObj = to.offset();

		if (ofssetObj)
		{
			var scrollTop = ofssetObj.top + offset + to.height();

			if (el) scrollTop = scrollTop + el.scrollTop() - el.offset().top  + to.height() + offset

			_scrollTop(scrollTop, el, time);
		}

	}

	offScroll = function(){
		if(typeof window == 'undefined') return;

		var winScrollTop = $(window).scrollTop();

		$(window).bind('scroll', function(){

			$(window).scrollTop(winScrollTop);

		});
	}

	onScroll = function(){
	
		if(typeof window == 'undefined') return;
		$(window).unbind('scroll');
	}

	inView = function(els, p){

		if(!p) p = {};

		if(!p.inel) p.inel = window;
		if(!p.offset) {
			p.offset = 0;
		}

		p.f || (p.f = 'offset')

		p.elOffset = 0;

		try{
			p.elOffset = p.inel[p.f]().top
		}
		catch (e){
			p.elOffset = 0;
		}

		if(!p.mode) p.mode = "part";

		var inel = $(p.inel);

		var st = inel.scrollTop()
		var sh = inel.height()

		var range = {
			top : st - p.offset,
			bottom : st + sh + p.offset
		}

		var rangeLine = {
			top : st + p.offsetTop,
			bottom : st + sh - p.offsetBottom
		}

		var _fels = els.filter(function(){

			var el = $(this);

			var offsetTop = el[p.f]().top,
				height = el.height(),
				bottom = offsetTop + height;

			var _part = offsetTop >= range.top && offsetTop < range.bottom || 
				bottom <= range.bottom && bottom > range.top;

			var _all = offsetTop >= range.top && 
				bottom <= range.bottom 

				

			if (p.mode == 'line'){

				var line = offsetTop - st < rangeLine.top && offsetTop + height > rangeLine.bottom

				return line
			}

			if (p.mode == 'partall')
			{
				if (_all){
					el.data('inView', 'all');
					return true;
				}

				if (_part){
					el.data('inView', 'part');
					return true;
				}
			}

			if(p.mode == "part")
			{

				if (_part)

					return true;
			}

			if(p.mode == "all")
			{

				if (_all)
					return true;
			}
		})

		if(p.mode == 'partall')
		{
			_fels = _fels.sort(function(a, b){

				a = $(a);
				b = $(b);

				if(a.data('inView') == b.data('inView')) return 0;

				if(a.data('inView') == 'all') return -1;

				if(a.data('inView') == 'part') return 1;
			})
		}

		return _fels;
	}


	
	var ease = {
		linear: function (t) { return t },
		// accelerating from zero velocity
		inQuad: function (t) { return t*t },
		// decelerating to zero velocity
		outQuad: function (t) { return t*(2-t) },
		// acceleration until halfway, then deceleration
		inOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
		// accelerating from zero velocity 
		inCubic: function (t) { return t*t*t },
		// decelerating to zero velocity 
		outCubic: function (t) { return (--t)*t*t+1 },
		// acceleration until halfway, then deceleration 
		inOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
		// accelerating from zero velocity 
		inQuart: function (t) { return t*t*t*t },
		// decelerating to zero velocity 
		outQuart: function (t) { return 1-(--t)*t*t*t },
		// acceleration until halfway, then deceleration
		inOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
		// accelerating from zero velocity
		inQuint: function (t) { return t*t*t*t*t },
		// decelerating to zero velocity
		outQuint: function (t) { return 1+(--t)*t*t*t*t },
		// acceleration until halfway, then deceleration 
		inOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}


	SwipeParallax = function(p){
		if(!p) p = {};

			p.directions || (p.directions = {})

			p.prop || (p.prop = 'translate')

			_.each(p.directions, function(d,i){
				d.i = i
			})

			/*p.direction || (p.direction = 'up');
			p.trueshold || (p.trueshold = 90);
			p.iniMargin || (p.iniMargin = 0);*/

		var self = this;

		var animationInterval = null;

		var animateduration = 400;
		var animatedurations = (animateduration / 1000) + 's'

		var directiontoprop = function(direction, value){

			if (p.prop == 'translate'){
				if(direction == 'up') return 'y'
				if(direction == 'down') return 'y'
				if(direction == 'left') return 'x'
				if(direction == 'right') return 'x'
			}

			if (p.prop == 'margin'){
				if(direction == 'up') return 'margin-bottom'
				if(direction == 'down') return 'margin-top'
				if(direction == 'left') return 'margin-left'
				if(direction == 'right') return 'margin-right'
			}

			if (p.prop == 'padding'){
				if(direction == 'up') return 'padding-bottom'
				if(direction == 'down') return 'padding-top'
				if(direction == 'left') return 'padding-left'
				if(direction == 'right') return 'padding-right'
			}

			if (p.prop == 'position'){
				if(direction == 'up') return direction.position || 'top'
				if(direction == 'down') return direction.position || 'top'
				if(direction == 'left') return direction.position || 'left'
				if(direction == 'right') return direction.position || 'left'
			}
			
		}

		var medium = function(fingerData){
			var n = {
				end : {
					x : 0,
					y : 0
				},
				start : {
					x : 0,
					y : 0
				},
				last : {
					x : 0,
					y : 0
				}
			}

			var l = _.toArray(fingerData).length

			_.each(fingerData, function(f){
				_.each(f, function(fd, i){
					n[i].x += fd.x / l
					n[i].y += fd.y / l
				})
			})

			return n;
		}

		var nullbydirection = function(_d, direction){
			var d = _.clone(_d)


			if(direction == 'up') {
				if(d.y > 0) d.y = 0
				
				if (p.prop == 'margin' || p.prop == 'padding')
					d.y = Math.abs(d.y)

				d.x = 0
			}

			if(direction == 'down') {
				if(d.y < 0) d.y = 0

				if (p.prop == 'margin' || p.prop == 'padding')
					d.y = Math.abs(d.y)

				d.x = 0
			}

			if(direction == 'left') {
				if(d.x > 0) d.x = 0

				if (p.prop == 'margin' || p.prop == 'padding')
					d.x = Math.abs(d.x)

				d.y = 0
			}

			if(direction == 'right') {
				if(d.x < 0) d.x = 0

				if (p.prop == 'margin' || p.prop == 'padding')
					d.x = Math.abs(d.x)

				d.y = 0
			}

			return d;
			
		}

		var findDirection = function(_d){

			return _.max(p.directions, function(direction, i){
				var d = nullbydirection(_d, i)	

				return Math.abs((d.x || d.y))
			})
		}

		var gettransform = function(obj){
			
			var transformMatrix = obj.css("-webkit-transform") ||
			  obj.css("-moz-transform")    ||
			  obj.css("-ms-transform")     ||
			  obj.css("-o-transform")      ||
			  obj.css("transform");
			var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');

			var x = matrix[12] || matrix[4];
			var y = matrix[13] || matrix[5];


			return {
				x : x,
				y : y
			}

		}

		var animation = function(ap, options, direction){

			if(!options) options = {}

			
			if (self.animation){
				self.animation.stop()
			}
			
			if(p.prop == 'translate'){

				var v = (ap.x || ap.y || 0);

				/*p.el.css({transition: "transform " + animatedurations + " ease"});*/

				/*if (ap.y){
					p.el.css("transform","translate3d(0, "+ap.y+", 0)");
				}
				else{
					p.el.css("transform","translate3d("+ap.x+", 0, 0)");
				}*/

				p.el.css({transform: ""});
				p.el.css({transition: ""});
				

				/*var td = 16;
				var stepd = 16 / animateduration;
				var step = 0;

				self.animation = {

					interval : setInterval(function(){

						var z = (v || '0').replace('px', '')

						if (options.step){

							var s = z //ease.inOutCubic(step * stepd * z / p.directions[direction].trueshold)

							//s = s * p.directions[direction].trueshold

							options.step(s)	
						}

						step++

					}, td),

					stop : function(){

						if(!options.dontstop){
							p.el.css({transform: ""});
							p.el.css({transition: ""});
						}

						if(self.animation.interval){
							clearInterval(self.animation.interval)
							self.animation.interval = null;
						}
						
					}
				}*/


					/*if (self.animation)
						self.animation.stop()*/;

					if (options.complete)
						options.complete()


			}


			/*else{
				self.animation = p.el.animate(ap, options);	
			}*/
		}

		var parseStart = function(direction){
			if(p.prop != 'translate'){
				v = p.el.css(directiontoprop(direction)) || '0px'
			}
			else
			{
				var tr = gettransform(p.el)

				var prop = directiontoprop(direction)

				v = tr[prop]
			}

			if(!v) v = '0'

			v = Number(v.replace('px', '').replace('%', ''))

			return v
		}

		var set = function(direction, _value){

			var prop = directiontoprop(direction);

			var value = _value// ease.inOutCubic(_value / p.directions[direction].trueshold)

			//value = value * p.directions[direction].trueshold

			if (p.prop != 'translate'){
				p.el.css(prop, value + 'px');	
			}
			else{

				if(prop == 'x'){
					p.el.css("transform","translate3d("+(value || 0)+"px, 0, 0)");
				}

				if(prop == 'y'){
					p.el.css("transform","translate3d(0, "+(value || 0)+"px, 0)");
				}
			}
		}

		self.goup = function(direction){			

			var css = directiontoprop(direction)
			var upborder = (p.directions[direction].trueshold || 90) * 5

			if((css == 'top' || (direction == 'up' && css=='y')) && (p.prop == 'position' || p.prop == 'translate')) upborder = -upborder
			if(css == 'left' && (p.prop == 'position' || p.prop == 'translate')) upborder = -upborder

			var ap = {}
				ap[css] =  upborder + 'px'

			animation(ap, {
				dontstop : true,
				compele : function(){
					self.renew()
				}
			}, direction)
		}

		self.backfast = function(){

			_.each(p.directions, function(d){
				if (d.positionclbk)
					d.positionclbk(0)
			})
		}

		self.backup = function(direction){

			self.lastDirection = direction;

			var css = directiontoprop(direction)
			//var upborder = Number(p.el.css(directiontoprop(direction) || '0px').replace('px', ''))

			var ap = {}
				ap[css] =  '0px'

			var d = p.directions[direction]	


			animation(ap, {
				step : function(now, fx){

					if (d && d.positionclbk){
						d.positionclbk(now)
					}
				},
				compele : function(){
					self.renew()
				}
			}, direction)
		}

		self.lastDirection = null;
		self.animation = null;

		self.ended = false;

		self.renew = function(){
			self.lastDirection = null;
			self.animation = null;

			self.ended = false;

			if (self.animation)
				self.animation.stop();
		}

		self.opposite = function(dir, dir2){
			if(dir == 'up' && dir2 == 'down') return true;
			if(dir == 'down' && dir2 == 'up') return true;

			if(dir == 'left' && dir2 == 'right') return true;
			if(dir == 'right' && dir2 == 'left') return true;
		}

		self.init = function(){

			var startMargin = 0;
			var mainDirection = null;

			var mintruesholdGone = false;
			console.log("p", p)
			p.el.swipe({

				allowPageScroll : p.allowPageScroll,
					
				/*swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

					if(direction == 'up' && distance - startMargin > p.trueshold){
						actions.close(true)	
					}
				},*/

				swipeStatus:function(event, phase, _direction, distance, duration, fingers, fingerData, currentDirection){


					if (self.ended) return false	


					console.log('phase', phase)

					if (phase == 'start'){

						mintruesholdGone = false

						startMargin = 0;

						self.renew()

						/*console.log('self.lastDirection', self.lastDirection)
						if (self.lastDirection){
							startMargin = parseStart(self.lastDirection) 

							self.animation.stop();
							self.renew()
						}*/

						
						return true
					}


					if(phase != 'cancel' && phase != 'end'){

						var m = medium(fingerData)

						var _d = {
							x : m.last.x - m.start.x + startMargin,
							y : m.last.y - m.start.y + startMargin
						}

						if(!_d.x && !_d.y) return true

						var direction = findDirection(_d)

						if (direction){

							if (direction.constraints && !direction.constraints()) {

								if (mainDirection){
									self.backup(mainDirection.i)	
									mainDirection = null;
								}

								return false
							}

							if (mainDirection && (mainDirection.i != direction.i)){

								th = false;

								if (direction.mintrueshold){
									var dcur = nullbydirection(_d, direction.i)
									var dprev = nullbydirection(_d, mainDirection.i)

									var dth = Math.abs((dcur.x || dcur.y || 0) - (dprev.x || dprev.y || 0))

									if(dth < direction.mintrueshold){
										th = true
									}
								}

								if(!th){
									self.backup(mainDirection.i)

									if(direction.cancellable) {
										mainDirection = null;
										return false
									}
								}
								else{
									direction = mainDirection
								}

								
							}

							mainDirection = direction
							var d = nullbydirection(_d, direction.i)	

							var dp = (d.x || d.y || 0);

							if (!mintruesholdGone && Math.abs(dp + startMargin) < (direction.mintrueshold || 0)){
								return true
							}

							mintruesholdGone = true;

							/*if (Math.abs(dp) >= (direction.trueshold || 1)){

								self.ended = true

								if(!direction.restrict)
									self.goup(mainDirection.i)
								else{
									self.backup(mainDirection.i)
								}
								

								mainDirection = null;

								return false;
							}*/

							if (direction.positionclbk){
								direction.positionclbk(dp)
							}

							if(direction.reverse){
								dp = -dp
							}

							set(mainDirection.i, dp)

						}
						else{

							mainDirection = null;
						}

					}

					if(phase == 'cancel' || phase == 'end'){

						
						if (mainDirection){

							console.log('_direction == mainDirection', _direction, mainDirection)
							

							if(phase == 'end' && mainDirection.clbk && _direction == mainDirection.i){

								
								mainDirection.clbk()
							}
								
							if (mainDirection.positionclbk)
								mainDirection.positionclbk(0)

							self.backup(mainDirection.i)	
							
						}

						else{
							self.backfast()
						}

						mainDirection = null

					}

					
					
				},

			});

			return self
		}

		return self;
	}


	SwipeParallaxNew = function(p){
		if(!p) p = {};

			p.directions || (p.directions = {})

			_.each(p.directions, function(d,i){
				d.i = i
			})

		var self = this;
		
		var directiontoprop = function(direction, value){

			if(direction == 'up') return 'y'
			if(direction == 'down') return 'y'
			if(direction == 'left') return 'x'
			if(direction == 'right') return 'x'
			
		}
		
		var set = function(direction, value){

			var prop = directiontoprop(direction);

			if(direction == 'up' || direction == 'left') value = -value

			if (prop == 'x'){
				p.el.css("transform","translate3d("+(value || 0)+"px, 0, 0)");
			}

			if (prop == 'y'){
				p.el.css("transform","translate3d(0, "+(value || 0)+"px, 0)");
			}
		}

		var applyDirection = function(direction, v){
			if (direction.positionclbk){
				direction.positionclbk(v)
			}
		}

		self.clear = function(){
			p.el.css({transform: ""});
			p.el.css({transition: ""});
			
			_.each(p.directions, function(d){
				applyDirection(d, 0)
			})
		}

		self.backfast = function(){

			_.each(p.directions, function(d){
				if (d.positionclbk)
					d.positionclbk(0)
			})
		}

		self.init = function(){

			var mainDirection = null;

			p.el.swipe({
				allowPageScroll : p.allowPageScroll,
				swipeStatus : function(e, phase, direction, distance){

					if (mainDirection && mainDirection.i != direction){
						phase = 'cancel'
						direction = mainDirection.i
					}

					if(phase == 'cancel' || phase == 'end'){

						if (mainDirection){

							if(phase == 'end' && mainDirection.clbk && direction == mainDirection.i){
								mainDirection.clbk()
							}
							
						}

						self.clear()	

					}

					if(!direction) return

					if(!p.directions[direction]){
						return
					}

					var dir = p.directions[direction]

					if (dir.constraints && !dir.constraints()) {

						if (mainDirection){
							mainDirection = null;
						}

						return false
					}

					if (phase == 'start'){
						mainDirection = null
					}
					
					if (phase == 'move'){
						if (distance > 20){
							mainDirection = dir

							applyDirection(mainDirection, distance)

							set(mainDirection.i, distance)
						}
					}

					
					

				},
			})

			return self
		}

		return self;
	}

	Roller = function (p) {

		if (!p)
			p = {};

		var self = this;
			self.inner = p.inner || '.cnt';
			self.selector = p.selector || '.roller';
			self.elements = p.elements;
			self.offset = p.offset || 0;

		var cnt = p.cnt;

		var elements = {};
		var pre = {};
		var offset = 0;
		var _in = $(window);

		var timeout;

		var inRange = function (el, id) {
			
			var offsetTop = el.offset().top;		

			var diff = _in.scrollTop() - offsetTop + self.offset;

			if (diff > 0)
				return diff;

			return 0;		

		}

		var lastd = {};

		var sortByHeight = function(){
			var _els = [];

			_.each(elements, function(e, id){
				_els.push({
					id : id,
					e : e
				})
			})

			_els = _.sortBy(_els, function(_e){
				var h = 0;

				var c = _e.e.find(self.inner);

				h = c.height();

				return -h;
			})

			return _els
		}

		var scroll = function () {

			var mel = maxContent(),
				s = mel.offset().top,
				h = mel.height(),
				b = s + h;


			var wh = _in.height();

			var sorted = sortByHeight();

			_.each(sorted, function (_e) {

				var e = _e.e;
				var id = _e.id;

				if (e != mel)
				{
					var c = e.find(self.inner);
					var d = inRange(e, id);

					var cHeight = c.height();

					var dw = cHeight - (wh - self.offset);

					if(dw > 0)

						d = d - dw
					
					if (d + cHeight <= h)
					{

					} 
					else
					{
						d = h - cHeight;
					}

					

					if (d < 0) 
						d = 0;				
					
					pre[id].height(d);

					lastd[id] = d;
					
				}
				else
				{
					pre[id].height(0);
				}
			})
		}

		var maxContent = function () {
			return _.max(elements, function (e) {

				var c = e.find(self.inner);

				return c.height();

			})
		}

		var initEvents = function () {
			
			window.addEventListener('scroll', scroll);
		}

		self.clear = function () {
			_.each(pre, function (e) {
				e.height(0);
			})
		}

		self.init = function () {

			self.elements || (self.elements = cnt.find(self.selector)); 

			self.elements.each(function () {
				var e = $(this);
				var c = e.find(self.inner);
				var id = e.attr('roller');

				elements[id] = e;

				pre[id] = $("<div>", {
					"class": 'pre',
				});

				c.before(pre[id]);
			})

			initEvents();

			

			return self;
		}

		self.apply = function () {
			self.clear();

			scroll();

			return self;
		};

		self.destroy = function(){
			self.clear();
			
			window.removeEventListener('scroll', scroll);
		}

		return self;
	}

	Caption = function (p) {

		
		
		var container = p.container,
			caption = p.caption,
			offset = p.offset || [0, 0],
			fixed = false,
			_in = p._in || $(window),
			spacer = null;

		var id = makeid(true);

		var pos = p.pos || 'top'

		var classes = {
			spacer: "cf_spacer",
			caption: "cf_caption"
		}

		var tp = 'offset'

		if (p._in){
			tp = 'position'
		}

		var self = this;
			self.addscroll = false;

		if (p._in){
			self.addscroll = true;
		}


		var clear = function () {
			if (spacer)
				spacer.remove();

			spacer = null;

			container.find("." + classes.spacer + "." + id).remove();

			caption.removeClass(classes.caption);

			caption.width('auto');

			caption.css(pos, '0')

			fixed = false;
		}

		var resize = function () {
			if (fixed) {

				caption.width(container.width());

			} 
		}

		var toFixed = function () {

			if (fixed) {

				resize();
				return;
			} 

			clear();

			fixed = true;

			var w = 0;

			if(!p.removeSpacer){
				spacer = $("<div>", {
					class: classes.spacer + " " + id,
					height: p.spacerHeight || caption.height(),
					width: caption.width()
				})

				caption.before(spacer);

				w = spacer.width();
			}

			else
			{
				w = container.width();
			}

			

			caption.addClass(classes.caption);

			caption.css(pos, offset[0] + 'px');
			caption.css('z-index', '100');

			caption.width(w);

		}

		var action = function () {

			if (!container.is(":visible"))
				return;

			var s = _in.scrollTop(),
				top = container[tp]().top - offset[0],
				bottom = container[tp]().top + container.height() - offset[0] + offset[1];

			if (self.addscroll){
				top = top + s 
				bottom = bottom + s 
			}

			if(typeof p.iniHeight != 'undefined'){
				bottom = bottom - p.iniHeight
			}
			else
			{
				bottom = bottom - caption.height();
			}

			var sh = s + _in.height()


			if (p.calculations)
			{
				if (p.calculations.bottom)
					bottom = p.calculations.bottom(caption, offset);

				if (p.calculations.top)
					top = p.calculations.top(caption, offset);
			}


			if ((pos=='top' && s > top && s < bottom) || (pos == 'bottom' && sh > top && sh < bottom + caption.height()))
			{
				if(!fixed)
					toFixed();
			} 
			else
			{
				if (fixed)
					clear();
			}
		}

		var initEvents = function () {

			_in[0].addEventListener('scroll', action);

			window.addEventListener('resize', resize);

		}

		var removeEvents = function () {

			_in[0].removeEventListener('scroll', action);

			window.removeEventListener('resize', resize);
		}

		self.destroy = function () {
			clear();

			removeEvents();
		}

		self.init = function () {

			if (!container)
			{
				container = caption.parent();
			}

			initEvents();

			return self;
		}

		self.setOffset = function(_offset){
			offset = _offset;
			clear();
			action();
		}

		self.setIn = function(__in){

			if(!__in){
				__in = $(window)
			}

			_in = __in;

			removeEvents();
			initEvents();

			clear();
			action();
		}

		self.action = action;
		self.clear = clear;

		return self;
	}

/* ______________________________ */

/* AJAX */

	AJAX = function(p) {

		/*---------------------------------------------------------------------------------------*/
		/*   Private Variables
		/*---------------------------------------------------------------------------------------*/
		var self = this,
			user = p.user || false,
			server = p.server || false,
			app = p;

		var cashe = {};

		/*---------------------------------------------------------------------------------------*/
		/*   Init
		/*---------------------------------------------------------------------------------------*/

		var error = function(res, p, errorData){	

			if(!p) p = {}

			if (errorData && errorData.code) return errorData.code

			if (app.errorHandler && p.errorHandler)
			{
				var h = app.errorHandler(res, p);

				if (h)
				{
					return h;
				}
			}	
			
			
			return res
			
		}

		if(!_Node)
			$.ajaxSetup({
				// Disable caching of AJAX responses
				cache: false
			});

		self.set = {
			user : function(u){
				user = u;
			}
		}

		self.clearCashe = function(){
			cashe = {};
		}

		self.run = function(p) {
			if(!p) p = {};

			var url = p.url || server,
				dataType = p.dataType || 'json',
				type = p.type || 'POST',
				dataCashe = p.dataCashe || false,
				parseJson = false,
				data = p.data || {};

			var deepkey = p.action + "." + toDeepKey(data);
			//	data.system = app.name;
			
			/*---------------------------------------------------------------------------------------*/
			if (user !== false && user.extendAjaxData &&  (!p.anon || p.anon !== true) && !p.imgur && !p.up1) user.extendAjaxData(data, url);		
			/*---------------------------------------------------------------------------------------*/

			/*---------------------------------------------------------------------------------------*/
			if (user !== false && user.signature &&  p.signature) data.signature = user.signature();		
			/*---------------------------------------------------------------------------------------*/

			/*if (app.fingerPrint)
				data.fingerPrint = app.fingerPrint;*/

			if(dataCashe){
				
				var responsedata = deep(cashe, deepkey);

				if (responsedata)
				{
					if (p.success)
						p.success(_.clone(responsedata));

					return;
				}
			}

			if(typeof performance != 'undefined')

				var time = performance.now();
		
			

			var success = {
				json : function(data){			

					var storage = data;
					var status;
					var e = ''

					if (storage.root) storage = storage.root;

					if(!p.imgur && !p.up1){
						status = (storage.Result || storage.status || "").toLowerCase();

						if(!status && storage.result && !storage.error){
							status = 'success'
						}
					}
					else
					{
						if (storage.success){
							status = 'success'
						}
					}

					if(!status) {
						
						e = error("noresult", p);

						if (p.fail) 
							p.fail(null, e || 'network');

					}

					else
					{
						if(status != 'success' && status != 'ok'){	

							if(typeof p.errors == 'undefined' || p.errors == true)
							{
								e = error(status, p);
							}		

							if(status == 'wrong token'){


								if (app.unathorizated){
									app.unathorizated();
								}
							}


							if (p.fail) 
								p.fail(storage, e || 'network');				

						}	

						else
						{

							if(app.successHandler && p.errorHandler)
							{
								var h = app.successHandler(p);

								if (h)
								{
									return;
								}
							}	

							if (dataCashe)
							{
								deepInsert(cashe, deepkey, _.clone(storage));
							}

							if (p.success){

								if (user !== false && !p.noExtend && user.extendFromAjaxData) user.extendFromAjaxData(storage);
								
								p.success(storage);	
							}
						}	
					}	
				},
				html : function(data){

					if (p.success) 	
						p.success(data);

				}
			}

			var checkTime = function(clbk){

				if(typeof performance == 'undefined')
				{
					clbk();

					return;
				}

				time = performance.now() - time;

				if (p.timeout && p.timeout > time){
					setTimeout(function(){

						clbk();

					}, p.timeout - time)
				}
				else
				{
					clbk();
				}
			}

			/*---------------------------------------------------------------------------------------*/
			if (p.before) 
				p.before();

			if (p.preloader) 
				preloader(true);	

			if(_Node) {

				//data.node = "NODE";

				

				var _d = {
					method: type, 
			    	uri: url, 
			    	rejectUnauthorized: false, 
				}

				if(data){

					_d.body = collectParameters(data).substr(1)

				}

				request(_d,
			    function (_error, response, body) {


			    	if(_error)
			    	{
			    		error(_error);

			    		if(_SEO){
			    			self.run(p);

			    			return;
			    		}

			    		else

			    		if (p.fail) 
							p.fail(null);
			    	}
			    	else
			    	{
			    		if(dataType == 'json') 
			    		{
			    			try
			    			{
			    				body = JSON.parse(body)
			    			}
			    			catch (e)
			    			{
			    				error("Unexpected end of input TE");

			    				if (p.fail) 
									p.fail(null);
			    			}

							success.json(body);
			    		}
						else
							success.html(body);
			    	}
			    })
			}
			else
			{
				

				var ap = {
					type: type,
					url: url,
					data: data,
					dataType: dataType,
					headers : p.headers,
					beforeSend: p.beforeSend,

					success: function(data){
						if (p.preloader) preloader(false);

						checkTime(function(){

							success[dataType](data);

						})
						
					},
					error: function(r, s, e) {
						
						var data = null;
						var e = ''

						if (p.preloader) preloader(false);

						if (r.responseText) {

							data = JSON.parse(r.responseText);			

							if(typeof p.errors == 'undefined' || p.errors == true)
							{
								e = error(data.status, p, data.data);

							}
										
						} 
						else
						{
							e = error(null, p);
						}


						if (p.fail) 
							p.fail(data, e || 'network');

					},
				}

				if (p.imgur){
					ap.url = app.imageServer + data.Action;
					delete data.Action;

					if(user){
						var auth;

					    if (user.imgur.token) auth = 'Bearer ' + user.imgur.token;
					    else auth = 'Client-ID ' + user.imgur.clientId;

						ap.headers = {
					        Authorization: auth,
					        Accept: 'application/json'
					    }
					}
					
				}

				if (p.up1){

					ap.url = 'https://pocketnet.app:8092/up'


					//ap.url = app.imageServerup1;
					delete data.Action;

					if(user){

						data.api_key = 'c61540b5ceecd05092799f936e277552'

					}
					
				}



				$.ajax(ap);

			}

		}

		self.api = function(p){

			if (p.main){

				self.apim(p)

				return
			}

			if (typeof p.errorHandler == 'undefined')
				p.errorHandler = true
			
			if (app.platform.apiproxy){

				p.url = 'https://' + app.platform.apiproxy.host + ":" + app.platform.apiproxy.port + "/" + (p.action || "")
				p.api = true
				self.run(p)

			}
			else{

				

				if (p.fail)
				 	p.fail(null, error('proxy', p) || 'network')
			}

		}

		self.apim = function(p){

			if (typeof p.errorHandler == 'undefined')
				p.errorHandler = true
						
			p.url = app.apimproxy + "/" + (p.action || "")
			p.apim = true

			self.run(p)

		}

		self.fb = function(p){
			
			p.url = app.firebase + "/" + (p.action || "").split('.').join('/');
			p.fb = true

			self.run(p)
		}

		self.rtchttp = function(p){
			
			p.url = app.rtchttp + "/" + (p.action || "").split('.').join('/')
			p.rtchttp = true

			self.run(p)
		}

		self.rpc = function(p){

			p.rpc = true

		
			if(typeof p.nodeFix == 'undefined' && app.platform.nodeid != 'undefined'){

				var fail = p.fail || function(){}

				p.nodeFix = app.platform.nodeid;
				p.fail = function(r){

					if(r && (r.statusCode == 500 || r.statusCode == 521) && (!r.data || _.isEmpty(r.data))){
						app.platform.autochange()


						if(app.platform.nodeid == p.nodeFix){
							fail(r)
						}
						else
						{
							self.rpc(p)
						}
					}
					else
					{
						fail(r)
					}
					
				}
			}	

        	if(app.platform.dontuseapiproxy){

        		var id = parseInt(Math.random() * 100000)


				p.url = app.platform.sdk.system.nodeexdirect();
				p.nodedirect = true;
				
				if (p.url){

					p.data = JSON.stringify({
						method: p.method,
						params: p.parameters,
						id: id
					})

					
					var success = p.success;
	
					p.success =  function(storage){
						success(deep(storage, 'result') || storage)
					}
	
					self.run(p)
				}

				else{

					if (p.fail)
						p.fail(null, 'nodedirect')	
						 
				}       	
				

		        return

		       
        	}
        	else
        	{
        		p.action = 'rpc-' + p.method

				p.data = {
					method : p.method,
					parameters : hexEncode(JSON.stringify(p.parameters || ""))
				}


				if(app.platform.nodeid){

					app.platform.sdk.system.nodeex(p.data)
				}

				var success = p.success;

				p.success =  function(storage){

					success(deep(storage, 'data.result') || storage)

				}

				

        	}


			self.api(p)
		}


		return self;
	}

	jsonrpc = {};

	jsonrpc.CallStack = function (enterFn, enterScope, exitFn, exitScope) {
		this._counter = 0;
		this._enterFn = enterFn;
		this._exitFn = exitFn;
		this._enterScope = enterScope;
		this._exitScope = exitScope;
	};

	jsonrpc.CallStack.prototype = {
		enter: function () {
			this._counter = (this._counter < 0 ? 1 : this._counter + 1);
			if (this._counter === 1) {
				this._enterFn.apply(this._enterScope, arguments);
			}
		},

		exit: function (fn) {
			this._counter -= 1;
			if (this._counter === 0) {
				this._exitFn.apply(this._exitScope, arguments);
			}
		}
	};

	jsonrpc.DelayedTask = function (fn, scope, args) {
		this._fn = fn || function () {};
		this._scope = scope || undefined;
		this._args = args || [];
		this._id = null;
	};

	jsonrpc.DelayedTask.prototype = {
		delay: function (delay, fn, scope, args) {
			var me = this;

			this._fn = fn || this._fn;
			this._scope = scope || this._scope;
			this._args = args || this._args;
			this.cancel();
			this._id = window.setInterval(function () {
				window.clearInterval(me._id);
				me._id = null;
				me._fn.apply(me._scope, me._args);
			}, delay);
		},

		cancel: function () {
			if (this._id) {
				window.clearInterval(this._id);
				this._id = null;
			}
		}
	};

	jsonrpc.JsonRpc = function (url) {
		this._url = url;
		this.loading = new jsonrpc.Observable();
		this.loaded = new jsonrpc.Observable();
		this.unhandledFailure = new jsonrpc.Observable();
		this._loadingState = new jsonrpc.CallStack(this.loading.trigger, this.loading, this.loaded.trigger, this.loaded);
		this._requests = [];
		this._batchingMilliseconds = 10;
		this._delayedTask = new jsonrpc.DelayedTask();
	};

	jsonrpc.JsonRpc.prototype = {
		setBatchingMilliseconds: function (value) {
			this._batchingMilliseconds = value;
		},

		call: function () {
			var args = this._getParams.apply(this, arguments);

			this._loadingState.enter();
			this._requests.push(args);

			if (this._batchingMilliseconds) {
				this._delayedTask.delay(this._batchingMilliseconds, this._sendRequests, this);
			} else {
				this._sendRequests();
			}
		},

		_sendRequests: function () {
			var me = this,
				requests = this._requests,
				data = [],
				i;

			this._requests = [];

			for (i = 0; i < requests.length; i += 1) {
				requests[i].request.id = i;
				data.push(requests[i].request);
			}

			if (data.length === 1) {
				data = data[0];
			}

			me._doJsonPost(me._url, data, function (htmlSuccess, htmlResponse) {
				var responses;
				if (htmlSuccess) {
					responses = (me._isArray(htmlResponse) ? htmlResponse : [htmlResponse]);
				} else {
					responses = [];
					for (i = 0; i < requests.length; i += 1) {
						responses[i] = { id: i, error: { message: htmlResponse } };
					}
				}
				me._handleResponses(requests, responses);
			});
		},

		_handleResponses: function (requests, responses) {
			var i, response, request;
			for (i = 0; i < responses.length; i += 1) {
				response = responses[i];
				request = requests[response.id];
				this._handleResponse(request, response);
			}
		},

		_handleResponse: function (request, response) {
			var success = !response.error,
				ret = (success ? response.result : response.error.message);

			this._loadingState.exit();

			if (success) {
				request.success.call(request.scope, ret);
			} else {
				request.failure.call(request.scope, ret);
			}
			request.callback.call(request.scope, success, ret);
		},

		_getParams: function () {
			var me = this,
				args = Array.prototype.slice.call(arguments),
				ret = {
					request: {
						jsonrpc: '2.0',
						method: args.shift()
					}
				};

			ret.request.params = [];
			while (args.length > 1 && !this._isFunction(args[0])) {

				var a = args.shift();
				if (a)

					ret.request.params.push(a);
			}

			if (this._isFunction(args[0])) {
				ret.success = args[0];
				ret.scope = args[1];
			} else {
				ret.success = args[0].success;
				ret.failure = args[0].failure;
				ret.callback = args[0].callback;
				ret.scope = args[0].scope;
			}
			ret.success = ret.success || function () { return; };
			ret.failure = ret.failure || function () { me.unhandledFailure.trigger.apply(me.unhandledFailure, arguments); };
			ret.callback = ret.callback || function () { return; };

			return ret;
		},

		_isArray: function (v) {
			return Object.prototype.toString.apply(v) === '[object Array]';
		},

		_isFunction: function (v) {
			return Object.prototype.toString.apply(v) === '[object Function]';
		},

		_doJsonPost: function (url, data, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
					return;
				}

				var contentType = xhr.getResponseHeader('Content-Type');

				if (xhr.status !== 200) {
					callback(false, 'Expected HTTP response "200 OK", found "' + xhr.status + ' ' + xhr.statusText + '"');
				} else if (contentType.indexOf('application/json') !== 0) {
					callback(false, 'Expected JSON encoded response, found "' + contentType + '"');
				} else {
					callback(true, JSON.parse(this.responseText));
				}
			};

			xhr.send(JSON.stringify(data));
		}
	};

	jsonrpc.Observable = function () {
		this._listeners = [];
	};

	jsonrpc.Observable.prototype = {
		bind: function (fn, scope) {
			var token = { fn: fn, scope: scope || this };
			this._listeners.push(token);
			return token;
		},

		unbind: function (token) {
			var idx = this._listeners.indexOf(token);
			if (idx !== -1) {
				this._listeners.splice(idx, 1);
			}
		},

		trigger: function () {
			var i;
			for (i = 0; i < this._listeners.length; i += 1) {
				this._listeners[i].fn.apply(this._listeners[i].scope, arguments);
			}
		}
	};

/* ______________________________ */

/* DOM */

	before = function(el, h){
		el.before(h);
	}
	after = function(el, h){
		el.after(h);
	}
	html = function(el, h){
		//console.log("E", el)
		el.html(h);
	}
	append = function(el, h){
		el.append(h);
	}

	replaceWith = function(el, h){
		el.replaceWith(h);
	}

	prepend = function(el, h){
		el.prepend(h);
	}

	offsetElement = function(elem) {
	    var top=0, left=0

	    while(elem) {
	        top = top + parseFloat(elem.offsetTop);
	        left = left + parseFloat(elem.offsetLeft);
	        elem = elem.offsetParent;        
	    }
	    
	    return {top: Math.round(top), left: Math.round(left)}
	}

	getXPathForElement = function(el, xml) {
		var xpath = '';
		var pos, tempitem2;
		
		while(el !== xml.documentElement) {		
			pos = 0;
			tempitem2 = el;
			while(tempitem2) {
				if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
					pos += 1;
				}
				tempitem2 = tempitem2.previousSibling;
			}

			if(el.nodeName[0] != "#")
			
				xpath = el.nodeName+"[position() = "+pos+']'+'/'+xpath;

			else

				xpath =  el.nodeName.substr(1)+'()/'+xpath;

			el = el.parentNode;
		}
		xpath = './' + xml.documentElement.nodeName+'/'+xpath;
		xpath = xpath.replace(/\/$/, '');
		return xpath;
	}

	decodeSeoLinks = function(link){
		link = link.replace(/;equal;/g, "=")
		link = link.replace(/;ques;/g, "?")

		return link
	}

	encodeSeoLinks = function(link){
		link = link.replace(/=/g, ";equal;")
		link = link.replace(/\?/g, ";ques;")

		return link
	}
	var copycleartext = function(text){
		if (window.clipboardData && window.clipboardData.setData) {
	        // IE specific code path to prevent textarea being shown while dialog is visible.
	        return clipboardData.setData("Text", text); 

	    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
	        var textarea = document.createElement("textarea");
	        textarea.textContent = text
	        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
	        document.body.appendChild(textarea);
	        textarea.select();
	        try {
	            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
	        } catch (ex) {
	            return false;
	        } finally {
	            document.body.removeChild(textarea);
	        }
	    }
	} 	
	var copyText = function(el) {

		var text = trim(el.attr('text') || el.text() || el.val());

	    copycleartext(text)
	}

/* ______________________________ */

/* INPUTS */
	
	
	function ecaretPosition(_el, i, j){
		var el = _el[0];
		var range = document.createRange();
		var sel = window.getSelection();

		range.setStart(el.childNodes[i], j);

		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}

	

	fastars = function(el){

		$.each(el, function(){

			var _el = $(this)

			_el.find('i').on('mouseenter', function(){

				if(_el.attr('value')) return;

				var v = $(this).attr('value')

				_el.attr('tempValue', v)
			})

			_el.find('i').on('mouseleave', function(){

				_el.removeAttr('tempValue')
			})

		})

		
	}

	sQuestion = function(p){
		var self = this;

		self.question = p.question;
		self.answers = p.answers;
		var ajax = p.ajax;

		self.value = null;
		self.user = null;
		self.id = p.id || makeid()

		self.results = [];

		self.save = function(){

			if (self.user)
			{
				localStorage['sQuestionUser'] = self.user
				localStorage['sQuestionValue'] = self.value || ''
			}
			else{
				localStorage['sQuestionUser'] = ''
				localStorage['sQuestionValue'] = ''
			}

		}

		self.summary = function(){
			return _.reduce(self.results || [], function(m, r){
				return m + r.count
			},0)
		}

		self.findResult = function(v){
			return _.find(self.results, function(r){
				return r.v == v 
			})
		}

		self.send = function(value, clbk){

			if(self.user){

				app.ajax.run({
					data : {
						Action : 'ADDSURVEY',
						ID  : self.id,
						UserID : self.user,
						OptionID : value
					},
					success : function(d){

						self.value = value;

						self.save();

						var r = self.findResult(self.value);

						if (r) 
							r.count++
						else{
							self.results.push({
								v : self.value,
								count : 1
							})
						}

						if (clbk)
							clbk();

					}
				})
			}		
			else
			{
				if (clbk)
					clbk(false)
			}

		}

		self.results = function(clbk){
			app.ajax.run({
				data : {
					Action : 'GETSURVEY',
					ID  : self.id
				},
				success : function(d){

					self.results = _.map(d.Survey || [], function(r){
						return {
							v : r.OptionID,
							count : Number(r.count)
						}
					});

					if (clbk)
						clbk();

				}
			})
		}

		self.init = function(clbk){

			self.user = localStorage['sQuestionUser'] || makeid();
			self.value = localStorage['sQuestionValue'] || null;

			self.save();

			self.results(clbk)
		}

		return self;

	}

	search = function(el, p){

		var self = this;

		if(!p) p = {};

			p.events || (p.events = {})

		var searchEl = null;
		var fastResult = null;

		var bsActive = false;
		var fsActive = false;

		var currentFastId = '0';

		self.placeholder = function(placeholder){
			el.find('input').attr('placeholder', placeholder)
		}

		var template = function(){

			p.class || (p.class = "")

			var elements = [

				'<div class="searchIconLabel">' + (p.icon ||
					'<i class="fa fa-search" aria-hidden="true"></i>' +
					'<i class="fas fa-circle-notch fa-spin"></i>') + 
				'</div>',

				'<div class="searchInputWrapper">' +
					'<input class="sminput" tabindex="2" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="' + (p.placeholder || "Search") + '">' +
				'</div>',

				'<div class="searchPanel">' +
					'<div class="searchPanelWrapper">' +
						'<div class="searchPanelItem" event="clear">' +
							'<i class="fa fa-times-circle" aria-hidden="true"></i>' +
						'</div>' +
					'</div>' +
				'</div>'

			]

			if (p.right){
				elements.reverse();

				p.class += " right";
			}


			if(p.collectresults){
				elements[1] = '<div class="searchInputWrapper">' +
					'<div class="sminput" contenteditable="true" tabindex="2" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="' + (p.placeholder || "Search") + '"></div>' +
				'</div>'
			}


			var h = '<div class="search ' + (p.class || "") + '">' +
						'<div class="searchInput">' +
							'<div class="searchInputIcon">' +
								elements.join(" ") + 
							'</div>' +
						'</div>' +
						'<div class="searchFastResultWrapper">'
						'</div>' +			
					'</div>'

			return h;
		}

		var helpers = {
			openResults : function(){

				if(!searchEl.hasClass('fastSearchShow')){
					searchEl.addClass('fastSearchShow');

					$('html').on('click', helpers.closeclickResults)
				}

				
			},
			closeResults : function(){
				$('html').off('click', helpers.closeclickResults);
				searchEl.removeClass('fastSearchShow');
			},
			closeclickResults : function(e){
				if (searchEl.has(e.target).length === 0 && searchEl.hasClass('fastSearchShow')) {
							
					helpers.closeResults();

				}
			},
			clear : function(){
				searchEl.find('.sminput').val('');

				searchEl.removeClass('searchActive');
				searchEl.removeClass('searchFilled');
			}
		}

		

		var events = {
			clear : function(el){

				searchEl.find('.sminput').val('');

				searchEl.removeClass('searchActive');
				searchEl.removeClass('searchFilled');

				helpers.closeResults();

				if (p.events.clear)
					p.events.clear();

			},
			search : function(el){
				var value = el.val();

				currentFastId = 0;

				bsActive = false;

				helpers.closeResults();

				if (p.events.search && value){

					bsActive = true;

					searchEl.addClass('searchActive')

					p.events.search(value, function(r){

						currentFastId = 0;

						bsActive = false;

						helpers.closeResults();

						searchEl.removeClass('searchActive');

						if(!fsActive)
							searchEl.removeClass('searchActive')

					}, events, helpers);
				}
			},
			showlast : function(el){
				var result = p.last.get();

				if (result.length){

					p.last.tpl(result, function(r, revents){

						fastResult.html(r);
								
						helpers.openResults();

						if (revents){
							revents(fastResult, helpers)
						}

					})
				}
			},
			fastsearch : function(el, e, _currentFastId){
				var value = el.val();

				if (value && p.events.fastsearch &&!bsActive){

					searchEl.addClass('searchActive')
					fsActive = true;

					currentFastId = (_currentFastId || makeid());

					var thisSearch = currentFastId;

					p.events.fastsearch(value, function(r, revents){

						if(thisSearch != currentFastId || !el.val() || bsActive) return;

						fsActive = false;

						searchEl.removeClass('searchActive')

						if (r){

							fastResult.html(r);
							
							helpers.openResults();

							if (revents){
								revents(fastResult, helpers)
							}

						}

					}, e);
				}

				if (value){
					searchEl.addClass('searchFilled')
				}
				else
				{
					helpers.closeResults();

					searchEl.removeClass('searchFilled');

					if (fsActive)
						searchEl.removeClass('searchActive')

					if (p.last){
						events.showlast(el)
					}

					if (p.events.clear)
						p.events.clear(true);
				}
			}
		}

		self.clear = events.clear
		self.blur = function(){
			el.find('input').blur()
		}

		var initEvents = function(){

			var searchInput = searchEl.find('.sminput')

			var slowMadeTimer;



			//searchInput.on('change', function(){events.search(searchInput)});
			searchInput.on('keyup', function(e){

				if ((e.keyCode || e.which) != 13) {		

					if(typeof p.time == 'undefined'){

						p.time = 100;

					}	


					if(!p.time){

						events.fastsearch(searchInput, e)
					}
					else
					{

						var id = makeid()

						slowMadeTimer = slowMade(function(){
							events.fastsearch(searchInput, e, id)
						}, slowMadeTimer, p.time)	
					}
				}
				
			});

			searchInput.on('focus', function(){

				self.active = true

				if($(this).val()){
					events.fastsearch(searchInput)
				}

				else

					if(p.last){
						events.showlast(searchInput)
					}

			})

			searchInput.on('blur', function(){
				self.active = false

			})

			searchInput.on('keypress', function(e) {

				if ((e.keyCode || e.which) == 13) {
					events.search(searchInput)
				}

	        });

	        searchEl.find('.searchIconLabel')
	        	.on('click', function(){

	        		if(!searchInput.val() && p.events.blank){
	        			p.events.blank()
	        		}
	        		else

	        			events.search(searchInput)

	        	})

	        searchEl.find('.searchPanelItem').on('click', function(){

	        	var panelItem = $(this)

	        	var event = panelItem.attr('event');

	        	if (events[event])
	        		events[event](panelItem)
	        })
		}

		var init = function(){

			el.html(template());

			searchEl = el.find('.search');
			fastResult = el.find('.searchFastResultWrapper');

			initEvents();

			if (p.clbk)
				p.clbk(searchEl)
		}


		init();

		return self

	}

	thinput = function(el){
		$.each(el, function(){
			var _el = $(this);

			var map = {
				'-1' : '1',
				'1'  : '0',
				'0'  : '-1'
			}
			_el.on('click', function(){
				var value = $(this).attr('value');

				$(this).attr('value', map[value]);

				
			})
		})
	}

	editable = function(p){
		var prevText;
		if(!p) p = {};
		if(!p.el) return;

		$.each(p.el, function(){
			var el = $(this);

			el.wrap("<div class='editable "+p.class+"'></div>");
			el.addClass("editEl");

			var edit = el.closest('.editable');

			edit.append("<div class='editForm'><input type='text' value='"+p.el.text()+"'></div>\
						 <label><div class='lwr'><div class='editButton edt'><i class='fa fa-pencil'></i></div>\
						 <div class='editButton success'><i class='fa fa-check'></i></div>\
						 <div class='editButton fail'><i class='fa fa-times'></i></div></div></label>");

			var mmp = p.mmoneyparam || null;


			if(mmp)
			{
				edit.find('input').maskMoney(mmp);
			}

			edit.find('.edt').on('click', function(){

				prevText = el.text();

				if(!p.synk)
				{		

					edit.find('input').val(prevText);
					edit.addClass('editNow');
				}
				else
				{
					p.el.closest('.editable').find('input').val(prevText);
					p.el.closest('.editable').addClass('editNow');
				}
				

			})

			edit.find('.success').on('click', function(){
				var val = edit.find('input').val();

				if(!p.synk)
				{
					el.text(val);
					edit.removeClass('editNow');
				}

				else
				{
					p.el.text(val);
					p.el.closest('.editable').removeClass('editNow');
				}

				

				if(p.success) p.success(val);
			})

			edit.find('.fail').on('click', function(){

				el.text(prevText);


				if (p.fail) 
					p.fail(prevText, p);

					

				edit.removeClass('editNow');
			})

			edit.find('input')[0].addEventListener('keyup', function(){
				if(p.input){
					if(mmp)
					{
						p.input(edit.find('input').maskMoney('unmasked', mmp)[0].value);
					}
					else
						p.input(edit.find('input').val());
				}

				
			})

			edit.find('input').on('input', function(){
				if(p.synk)
				{
					p.el.closest('.editable').find('input').val(edit.find('input').val())
				}
			})		
		})	
	}
	
	initUpload = function(p){
		if(!p) p = {};

		var el = p.el,
			multiple = p.multiple || false,
			maxFileSize = (p.maxFileSize || 10) * 1024 * 1024,
			dropZone,
			input,
			mode = p.mode || "FS";

		if(!p.data) p.data = {};

		var focusHandler = function(){
		   
		    el.find('input').focus(function(){
		        el.addClass("focus");
		    }).blur(function(){
		        el.removeClass("focus");
		    });

		}

		var chekcext = function(file){
			var name = file.name.split('.');
			var ext = name[name.length - 1].toLowerCase();

			if(p.ext){
				if(_.isArray(p.ext))
				{
					if(_.indexOf(p.ext, ext) == -1) return false
				}
				else
				{
					if(p.ext != ext) return false
				}
			}
			
			return true;
		}

		var readFile = function(reader, error, file, files, clbk){

			reader.onload = (function(theFile) {
				return function(e) {

					var name = theFile.name.split('.');
					var ext = name[name.length - 1]; 


					if (clbk) 
						clbk({
							base64 : e.target.result,
							file : theFile,
							ext : ext,
							filesCount : files.length
						})

				}

			})(file);
		}

		var errorHandler = function(file, clbk){
			if (file.size > maxFileSize) {
					    
			    clbk('filesize')
			}

			else

			if(!chekcext(file)){

				clbk('fileext')

			}
			else
			{
				clbk(false)
			}
		}
		var stateChange = function(event, clbk) {
		    if (event.target.readyState == 4) {

		        if (event.target.status == 200) {

		        	var response = JSON.parse(event.target.response);
		        	
		        	clbk(response);

		        } 
		        else 
		        {
		            clbk()
		        }
		    }
		}

		var orientation = function(srcData, exifOrientation, clbk) {


			var img = new Image(),
				canvas   = document.createElement("canvas"),
				ctx      = canvas.getContext('2d');
				
				img.src  = srcData;

			img.onload = function(){

				var width = img.width,
	            	height = img.height;
		
		        // set proper canvas dimensions before transform & export
		        if ($.inArray(exifOrientation, [5, 6, 7, 8]) > -1) {
		            canvas.width = height;
		            canvas.height = width;
		        } else {
		            canvas.width = width;
		            canvas.height = height;
				}
				
		        // transform context before drawing image
		        switch (exifOrientation) {
		            case 1:
          				// normal
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 2:
						// flip horizontal
						ctx.translate(width, 0);
						ctx.scale(-1, 1);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 3:
						// rotate 180
						ctx.translate(width, height);
						ctx.rotate(Math.PI);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 4:
						// flip vertical
						ctx.translate(0, height);
						ctx.scale(1, -1);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 5:
						// flip vertical, rotate 90 clockwise
						ctx.rotate(Math.PI / 2);
						ctx.scale(1, -1);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 6:
						// rotate 90 clockwise
						ctx.rotate(Math.PI / 2);
						ctx.translate(0, -height);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 7:
						// flip horizontal, rotate 90 counter clockwise
						ctx.rotate(Math.PI / 2);
						ctx.translate(width, -height);
						ctx.scale(-1, 1);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					case 8:
						// rotate 90 counter clockwise
						ctx.rotate(-Math.PI / 2);
						ctx.translate(-width, 0);
						ctx.drawImage(this, 0, 0, width, height);
					break;
					default:
						// normal
						ctx.drawImage(this, 0, 0, width, height);
					return;
		        }
		
		        // Draw img into canvas
		       	// ctx.drawImage(img, 0, 0, width, height);

				var url = canvas.toDataURL("image/jpeg", 0.95);

				$(canvas).remove();

				clbk(url);

			}
	
	    }
		var imageresize = function(file, image, clbk){
			if((file.type == 'image/jpeg' || file.type == 'image/png'|| file.type == 'image/jfif')){
				resize(image, 2048, 2048, clbk)
			}

			else
			{
				if (clbk)
					clbk(image)
			}
		}

		var autorotation = function(file, image, clbk){

			if((file.type == 'image/jpeg' || file.type == 'image/png'|| file.type == 'image/jfif') && !p.notexif && typeof EXIF != 'undefined'){
				EXIF.getData(file, function() {

					
					var allMetaData = EXIF.getAllTags(this);
						exifOrientation = allMetaData.Orientation;

	            	if(!exifOrientation){
	            		if (clbk)
							clbk(image)
	            	}
	            	else
	            	{
	            		orientation(image, exifOrientation, function(image){
	            			if (clbk)
								clbk(image)
	            		})
	            	}

            		
				})
			}

			else
			{
				if (clbk)
					clbk(image)
			}
		}

		var upload = function(event){

			var input = $(this);

			event.stopPropagation();
			event.preventDefault();
		    dropZone.removeClass('hover');
		    dropZone.addClass('loading');

		    var files;

		  	if(typeof event.dataTransfer === 'undefined')
		    	files = this.files;
		    else 
		    	files = event.dataTransfer.files;

		    var end = function(){
		    	
		    	dropZone.removeClass('loading');
    			dropZone.removeClass('hover');
    			dropZone.removeClass('focus');

    			input.val('');
				input[0].value = ''
		    }

		    _.each(files, function(file){
		    	file.id = makeid()
		    })

		    if (p.onStartUpload){
		    	files = p.onStartUpload(files)
		    }

		    lazyEach({
		    	sync : true,
		    	array : files,
		    	all : {
		    		success : function(){
		    			end();

		    			if (p.onSuccess)
							p.onSuccess()
		    		},
		    		fail : function(){
		    			end();

		    			if (p.onFail)
							p.onFail()
		    		}
		    	},
		    	action : function(_p){

		    		var file = _p.item;

		    		var processId = makeid();

		    		errorHandler(file, function(error){

		    			var reader = new FileReader();

						var fs = ((maxFileSize / 1024 ) / 1024).toFixed(0)

						var et = {
							filesize : "Your photo has size greater than "+fs+"MB. Please upload a photo under "+fs+"MB in size.",
							fileext : "Invalid format of picture. Only png and jpeg are allowed"
						}

						if(error){
							if (p.onError){
								p.onError(error, file, et[error]);
							}

							_p.fail();

							return
						}

        				readFile(reader, error, file, files, function(fileObject){


							imageresize(file, fileObject.base64, function(base64){

								fileObject.base64 = base64;


								autorotation(file, fileObject.base64, function(base64){

									fileObject.base64 = base64;
									
									if(error)
									{
										if(p.onError)
										{
											p.onError(error, fileObject, file, et[error]);
										}

										_p.fail();
									}
									else
									{
										var fd = new FormData();		    	
											fd.append('file', file);

										_.each(p.data, function(data, key){

											if(typeof data == 'function') data = data();

											if(key == 'data')
											{
												if (p.user)
												{
													p.user.extendAjaxData(data);
												}
											}

											if(_.isArray(data) || _.isObject(data)) 
												data = JSON.stringify(data);

											fd.append(key, data);
										})

										if (p.beforeUpload){
											p.beforeUpload(fileObject, processId)
										}

										if(p.server)
										{
											var xhr = new XMLHttpRequest();

											xhr.onreadystatechange = function(e){
												stateChange(e, function(response){

													response = deep(response, 'root')

													if(!response || response.Result != 'Success'){
														if(p.onError)
														{
															p.onError('serverError', fileObject, file);
														}

														_p.fail();
													}
													else
													{
														_p.success(response);

														if (p.onUpload)
															p.onUpload(response, processId)
													}

												})
											};



											xhr.open('POST', p.server);
											xhr.send(fd);

											/*setTimeout(function(){

												_p.success();

											},800)*/
											
										}

										else
										{

											if (p.action){
												p.action(fileObject, _p.success)
											}
											else

												_p.success();
										}


									}
								})

							})

        				})

        				reader.readAsDataURL(file);

		    		})
		    	}
		    })

		}
		

		var initEvents = function(){

			if(!dropZone[0]) return

			dropZone[0].ondragover = function() {
			    dropZone.addClass('hover');
			    return false;
			};
			    
		/*	dropZone[0].ondragleave = function() {
			    dropZone.removeClass('hover');
			    return false;
			};*/

			dropZone.on('dragout',function(event){ 

				dropZone.removeClass('hover');
			    return false;

			});

			dropZone[0].ondrop = upload;
			input.on('change', upload);

			input.on('click', function(){
				if (p.onStart)
					p.onStart();
			});
		}

		var init = function(){
			var m = '';

			if(multiple) m = 'multiple';

			var content = el.html();

			el.addClass("upload dropZone");
			el.wrapInner('<div class="fileUploader"><div class="elContent"></div></div>');
			el.find('.fileUploader').append('<div class="spinner"></div><div class="inputWrapper"><input type="file" '+ m +'></div>');

			dropZone = p.dropZone || el,
			input = el.find('input');
			
			if (typeof(window.FileReader) == 'undefined') {
			    dropZone.text('Не поддерживается браузером!');
			    dropZone.addClass('error');
			}

			focusHandler();

			initEvents();
		}

		init();
	}

	checkboxValue = function(el, value){

		if (value){

			el.prop('checked', true);
		}
		else
		{
			el.prop('checked', false);
		}

	}

/* ______________________________ */

/* EVENTS */

	globalpreloader = function(show, dark){

		if(typeof window == 'undefined') return
 
		var el = $('#globalpreloader');

		if (dark){
			el.addClass('dark')
		}
		else{
			el.removeClass('dark')
		}

		if(show){
			el.addClass('show')
		}
		else{
			el.removeClass('show')
		}
	}	

	

	onlyNumbers = function(event){

		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
		     // Разрешаем: Ctrl+A
		    (event.keyCode == 65 && event.ctrlKey === true) || 
		    (event.keyCode == 110 || event.keyCode == 190 || event.keyCode == 189 || event.keyCode == 109 || event.keyCode == 188) || 
		     // Разрешаем: home, end, влево, вправо
		    (event.keyCode >= 35 && event.keyCode <= 39)) {
		         // Ничего не делаем
		         return;
		}
		else {
		    // Обеждаемся, что это цифра, и останавливаем событие keypress
		    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		        event.preventDefault(); 
		    }   
		}
	}

/* ______________________________ */


/* LOCALSTORAGE */

	settingsLocalstorage = function(app){
		var self = this,
			prefix = app.options.localStoragePrefix,
			data = {};

		var init = function(){
			_.each(app.map, function(item){
				takeData(item.uri);
			})

			return this;
		}

		var takeData = function(uri){
			if(typeof localStorage != 'undefined' && localStorage[prefix+uri]){
				data[uri] = JSON.parse(localStorage[prefix+uri]);
			} 
			else {
				data[uri] = {};
			}

			return this;
		}

		var putData = function(uri){

			if(typeof localStorage != 'undefined' && data[uri]){

				try{
					localStorage[prefix+uri] = JSON.stringify(data[uri])
				}

				catch (e){
					return null
				}
				
				
			}

			return this;
		}

		self.get = function(uri, item){
			if(uri == false) 
				uri = 'general';
			
			takeData(uri);

			if (typeof item == "undefined")
				if (data[uri]) 
					return data[uri]; 
				else ;

			else{

				if (typeof data[uri][item] != undefined) {
					return data[uri][item];
				}
			}
		}

		self.setAll = function(uri, _data){
			if(uri == false) uri = 'general';
			_.each(data[uri], function(item,i){
				data[uri][i] = _data;
			});

			return putData(uri);

		}

		self.set = function(uri, item, _data){

			if(uri == false) uri = 'general';

			if(typeof item != "undefined") {
				if(!data[uri]) 
					data[uri] = {};

				data[uri][item] = _data;
			}
			else
				data[uri] = _data;

			return putData(uri);

		}

		self.delete = function(uri, item){
			if(uri == false) uri = 'general';

			if(typeof item != "undefined") {
				
				if(!data[uri]) 
					data[uri] = {};

				delete data[uri][item];

				putData(uri);
			}

			

			return this;
		}

		self.clear = function(){
			//
			_.each(getVars(localStorage), function(_storage, uri){
				if(uri.indexOf(prefix) > -1) localStorage.removeItem(uri); 
			})			
		}

		init();
		self.prefix = prefix;
		return self;
	}

/* ______________________________ */




/* MOUSE */
	mouse = {

		getX: function(e)
		{
			if (e.pageX)
			{
				return e.pageX;
			}
			else if (e.clientX)
			{
				return e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
			}

			return 0;
		},

		getY: function(e)
		{
			if (e.pageY)
			{
				return e.pageY;
			}
			else if (e.clientY)
			{
				return e.clientY+(document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
			}

			return 0;
		}
	}

	fixWhich = function(e) {
		if (!e.which && e.button) { // если which нет, но есть button... (IE8-)
			if (e.button & 1) e.which = 1; // левая кнопка
			else if (e.button & 4) e.which = 2; // средняя кнопка
			else if (e.button & 2) e.which = 3; // правая кнопка
		}
	}

	fakeClick = function(event, objId) {
	var obj=document.getElementById(objId);
	  if (obj.click) {
	    obj.click()
	  } else if(document.createEvent) {
	    if(event.target !== obj) {
	      var evt = document.createEvent("MouseEvents"); 
	      evt.initMouseEvent("click", true, true, window, 
	          0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	      var allowDefault = obj.dispatchEvent(evt);
	      // check allowDefault for false to see event.
	    }
	  }
	}

/* ______________________________ */

/* SWIPE */

	function swipedetect(el, callback, handlemove){
  
	    var touchsurface = el,
	    swipedir,
	    startX,
	    startY,
	    distX,
	    distY,
	    threshold = 150, //required min distance traveled to be considered swipe
	    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	    allowedTime = 300, // maximum time allowed to travel that distance
	    elapsedTime,
	    startTime,
	    handleswipe = callback || function(swipedir){}
	  
	    touchsurface.addEventListener('touchstart', function(e){
	        var touchobj = e.changedTouches[0]
	        swipedir = 'none'
	        dist = 0
	        startX = touchobj.pageX
	        startY = touchobj.pageY
	        startTime = new Date().getTime() // record time when finger first makes contact with surface
	        //e.preventDefault()
	    }, false)
	  
	    touchsurface.addEventListener('touchmove', function(e){

	    	

	       // e.preventDefault() // prevent scrolling when inside DIV
	    }, false)
	  
	    touchsurface.addEventListener('touchend', function(e){
	        var touchobj = e.changedTouches[0]
	        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
	        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
	        elapsedTime = new Date().getTime() - startTime // get time elapsed
	        if (elapsedTime <= allowedTime){ // first condition for awipe met
	            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
	                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
	            }
	            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
	                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
	            }
	        }

	        handleswipe(swipedir, distX, distY, elapsedTime)
	       // e.preventDefault()

	    }, false)
	}

/* ______________________________ */

/* FUNCTIONS */

	addToFunction = function(f, action){

		var newFunction = function(){

			var args = [];

			for (var i = 0; i < arguments.length; i++) {
			    args.push(arguments[i])
			}

			if(f) f.apply(this, arguments);

			if(action) action(this, arguments)

		}

		return newFunction;

	}

/* ______________________________ */

/* JQUERY */

	if(typeof window != 'undefined')
	{

		retry(function(){

			return window.jQuery

		}, function(){

			;(function($){

				var $event = $.event, 
				$special = $event.special,
		
				dragout = $special.dragout = {
					
					current_elem: false,
					
					setup: function( data, namespaces, eventHandle ) {
						$('body').on('dragover.dragout',dragout.update_elem)
					},
					
					teardown: function( namespaces ) {
						$('body').off('dragover.dragout')
					},
					
					update_elem: function(event){
						if( event.target == dragout.current_elem ) return
						if( dragout.current_elem ) {
							$(dragout.current_elem).parents().andSelf().each(function(){
								if($(this).find(event.target).size()==0) $(this).triggerHandler('dragout')
							})
						}
						dragout.current_elem = event.target
						event.stopPropagation()
					}
					
				}
		
				if (!$.browser) {
					$.browser = {};
					$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
					$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
					$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
					$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
				}
		
				})(window.jQuery);
		})

		
	}

/* ______________________________ */

/* NUMBERS */
	compressedNumber = function(num, n, N) {

		
		
		num = Number(num).toFixed(0)


		if(!N) N = 999

		if(!n) n = 0 ;

		var keys = ['k', 'm', 'b'],
			kl = keys.length,
			index = false;

		for(var i = 0; i < kl && Math.abs(num) > N; i++)
		{
			num = (num /1000);

			if(Number(num.toFixed(n)) == Number(num.toFixed(0))){
				num = num.toFixed(0);
			}
			else
			{
				num = num.toFixed(n);
			}

			
			index = i;
		}

		ret = num;

	    if (index !== false) ret+=keys[index].toUpperCase();
		

	    return ret;
	};
	
	phoneecho = function(str){

		if(str.length != 10){
			return str;
		}

		var code = str.substr(0,3);
		var sec = str.substr(3,3);
		var l1 = str.substr(6,2);
		var l2 = str.substr(8,2);

		return "(" + code + ")" + " " + sec + "-" + l1 + "" + l2
	}

	numclass = function(n){

		if(!n || !Number(n)) return 'neutral'

		if(Number(n) > 0) return 'good';

		return 'bad';

	}

	numclasscolor = function(n, c ){

		if(!n || !Number(n)) return c['neutral']

		if(Number(n) > 0) return c['good'];

		return c['bad'];

	}

/* ______________________________ */

/* TEXT */
	pluralform = function(n, w){
			
		if(n <= 1) return w[0]

		return w[1];
	}
	
	videoImage = function(url){
		var v = url;

		if(!_.isObject(v)) v = parseVideo(v)

		if (v.type == 'youtube'){
			return 'https://img.youtube.com/vi/'+v.id+'/mqdefault.jpg'
		}

		if(v.type == 'vimeo'){
			return 'https://i.vimeocdn.com/video/'+v.id+'_320.jpg'
		}

		if(v.type == 'peertube'){
			return null
		}
	}


	hashFnv32a = function(str, asString, seed) {
	    /*jshint bitwise:false */
	    var i, l,
	        hval = (seed === undefined) ? 0x811c9dc5 : seed;

	    for (i = 0, l = str.length; i < l; i++) {
	        hval ^= str.charCodeAt(i);
	        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	    }
	    if( asString ){
	        // Convert to 8 digit hex string
	        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
	    }

	    return hval >>> 0;
	}

	hash_32b_to_16b = function(val32b) {
	    var rightBits = val32b & 0xffff; // Left-most 16 bits
	    var leftBits = val32b & 0xffff0000; // Right-most 16 bits

	    leftBits = leftBits >>> 16; // Shift the left-most 16 bits to a 16-bit value

	    return rightBits ^ leftBits; // XOR the left-most and right-most bits
	}

	parseVideo = function(url) {
		var _url = url;

	    var test = _url.match(/(peertube:\/\/)?(http:\/\/|https:\/\/|)?(player.|www.)?(pocketnetpeertube[0-9]*\.nohost\.me|peer\.tube|vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|bitchute\.com)\/((videos?\/|embed\/|watch\/?)*(\?v=|v\/)?)*([A-Za-z0-9._%-]*)(\&\S+)?/);
	    var type = null
		var id = null
		var host_name = null
		
	    // if(test && url.indexOf('channel') == -1 && url.indexOf("user") == -1){}

	    	if(test && test[2] || (_url && _url.indexOf('peertube://') > -1)){

				if (test.indexOf('youtube.com') > -1 || test.indexOf('youtu.be') > -1) {
					type = 'youtube'
			        id = test[9]
					url = 'https://youtu.be/' + id
			    }
				if (test.indexOf('vimeo.com') > -1) {
					type = 'vimeo'
                    id = test[9]
			    }
				if (test.indexOf('bitchute.com') > -1) {
					type = 'bitchute'
					id = test[9]	
			    }
				if (test.indexOf('peertube://') > -1) {
					var params = _url.split('?')[1] || '';

					type = 'peertube'
			        id = `${test[9]}` //?${params}
					host_name = test[4]

			    }
			}
			
	    return {
	        type: type,
	        url : url,
	        id : id,
			host_name : host_name
	    };
	}
	nl2br = function(str){	
		return str.replace(/\n/g, '<br/>');
	}

	trimHtml = function(str, num){

		var remove = function(tag){

			var i = _.indexOf(openedTags, tag);

			if(i > -1)
			{
				openedTags.splice(i, 1);
			}

		}

		var openedTags = [];

		var l = str.length,
			result = str,
			L = 0,
			tr = 0,
			fll = false,
			fl = false, // в теге открытом
			fr = false, // в теге закрытом

			point40 = false,

			currentTag = "";

		for(var i = 0; i < l && L < num; i++)
		{
			var a = str[i];

			if (a == "<")
			{
				if(str[i + 1] && str[i + 1] == "/")
				{
					fr = true;
					fll = true;
				}
				else
				{
					fl = true;
					fll = true;
				}

				currentTag = "";
			}

			else

			if (a == ">")
			{
				if(fr)
				{
					remove(currentTag);
				}

				if(fl & fll)
				{
					openedTags.push(currentTag);
				}

				fr = false;
				fl = false;
				fll = false;

				currentTag = "";
			}

			else
			{

				if(fr || fl)
				{
					if(a != " " & a != "/" & fll)
					{
						currentTag += a;
					}
					else
					{
						if(fl & fll)
						{
							openedTags.push(currentTag);
							fll = false;
						}
					}
				}

				else
				{
					if(!fll) L++;
				}

			}

			tr++;

		}

		if (str.length > tr){
			result = str.substr(0, tr) + "&hellip;";

			_.each(openedTags, function(tag){

				if(tag != 'br' && tag!= 'img')

				result = result + "</" + tag + ">";
			})
		}
		
		return result;
	}


	extMessageForL2 = function(input){
		if(input.length % 2 !== 0){
			input = input + "0"
		}

		return input
	}

	vis = function(value, vis, fxd, spc){

		fxd || (fxd = 0);

		var mmoneyparam = {
			thousands:',',
			decimal:'.',
			allowZero: true,
			precision: 0,
			prefix : '$ ',
			input : false,
			allowNegative : true
		};

		spc || (spc = "&mdash;")

		if(vis)
		{			

			if(typeof value == "undefined") return spc;

			if(vis == "percent")
			{
				var v = (value * 100).toFixed(fxd) + " %"

				return v
			}

			if(vis == "dollars")
			{
				mmoneyparam.value = Number(value).toFixed(fxd).toString();
				return maskValue(mmoneyparam)
			}

			if(vis == "dollarshtml")
			{
				mmoneyparam.prefix = '$&nbsp;'
				mmoneyparam.value = Number(value).toFixed(fxd).toString();
				return maskValue(mmoneyparam)
			}

			if(vis == "dollarslight")
			{
				mmoneyparam.prefix = '';

				mmoneyparam.value = Number(value).toFixed(fxd).toString();
				return maskValue(mmoneyparam)
			}

			if(vis == "range0-100")
			{
				var range = {
					0 : "0",
					1 : "<25%",
					26 : "<50%",
					51: "<75%",
					76: ">75%",
				}
				
				return range[value]
			}
			
			if(vis == "yesno")
			{
				if(value == 'yes' || value == 1) return "Yes";

				if(value == 'no' || value == 0) return "No";

				if(!value) return ''
			}

			if(vis == "yesno12")
			{
				if(value == 'yes' || value == 1) return "Yes";

				if(value == 'no' || value == 2) return "No";

				if(!value) return ''
			}


			if(vis == "number")
			{
				if(!_.isNumber(Number(value)) || value.toString() == 'NaN' || value.toString() == 'undefined' || value.toString() == 'null') return spc

				value = Number(value).toFixed(fxd);

				mmoneyparam.prefix = '';

				mmoneyparam.precision = fxd;
				mmoneyparam.value = value;

				return maskValue(mmoneyparam)
			}

			if(vis == "date")
			{
				

				return convertDate(value)
			}
		}				

		return value;
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

	checkUrlForImage = function(url){

		var ex = ['.jpg', '.gif', '.png', '.jpeg']


		url = url.split("?")[0].toLowerCase();

		var m = _.find(ex, function(e){
			if(url.indexOf(e) > -1){
				return true;
			}
		})

		if(m) return true;
	}

	donottrustLink = function(text){

		return text.replace(/<a /g, '<a donottrust="donottrust" ')

	}

	clearScripts = function(text){
		return text.replace(/<script[^>]*?>[^<]*<\/script[^>]*?>/igm, "");
	}

	boolToNumber = function(v){

		if(v) return 1;

		else return 0

	}

	numberToBool = function(v){

		if(v) return true;

		else return false

	}

	findAndReplaceLink = function (inputText) {



		if(typeof linkifyHtml != 'undefined'){

			try{
				var l = linkifyHtml(inputText, {
					attributes : {
						cordovalink : '_system'
					}
				})
		
				return l
			}

			catch(e){
				
			}

			
		}

	
	    function indexOf(arr, value, from) {
	        for (var i = from || 0, l = (arr || []).length; i < l; i++) {
	            if (arr[i] == value) return i;
	        }
	        return -1;
	    }

	    function clean(str) {
	        return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
	    }

	    function replaceEntities(str) {
	        return se('<textarea>' + ((str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').value;
	    }
	    function se(html) {return ce('div', {innerHTML: html}).firstChild;}
	    function ce(tagName, attr, style) {
	        var el = document.createElement(tagName);
	        if (attr) extend(el, attr);
	        if (style) setStyle(el, style);
	        return el;
	    }
	    function setStyle(elem, name, value){
	        elem = ge(elem);
	        if (!elem) return;
	        if (typeof name == 'object') return each(name, function(k, v) { setStyle(elem,k,v); });
	        if (name == 'opacity') {
	            if (browser.msie) {
	                if ((value + '').length) {
	                    if (value !== 1) {
	                        elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
	                    } else {
	                        elem.style.filter = '';
	                    }
	                } else {
	                    elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
	                }
	                elem.style.zoom = 1;
	            };
	            elem.style.opacity = value;
	        } else {
	            try{
	                var isN = typeof(value) == 'number';
	                if (isN && (/height|width/i).test(name)) value = Math.abs(value);
	                elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
	            } catch(e){debugLog('setStyle error: ', [name, value], e);}
	        }
	    }
	    function extend() {
	        var a = arguments, target = a[0] || {}, i = 1, l = a.length, deep = false, options;

	        if (typeof target === 'boolean') {
	            deep = target;
	            target = a[1] || {};
	            i = 2;
	        }

	        if (typeof target !== 'object' && !isFunction(target)) target = {};

	        for (; i < l; ++i) {
	            if ((options = a[i]) != null) {
	                for (var name in options) {
	                    var src = target[name], copy = options[name];

	                    if (target === copy) continue;

	                    if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
	                        target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
	                    } else if (copy !== undefined) {
	                        target[name] = copy;
	                    }
	                }
	            }
	        }

	        return target;
		}



	    var replacedText = (inputText || '').replace(/(^|[^A-Za-z0-9А-Яа-яёЁ\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9А-Яа-яёЁ](?:[A-Za-z\$0-9\-\_А-Яа-яёЁ]*[A-Za-z\$0-9А-Яа-яёЁ])?\.){1,5}[A-Za-z\$рфуконлайнстРФУКОНЛАЙНСТ\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#%\@&\?+\/\$.~=;:]+|\[[A-Za-z0-9А-Яа-яёЁ\-\_#\@%&\?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#\@%&\?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#\@%&\?+\/\$.~=;:]*[A-Za-z0-9А-Яа-яёЁ\_#\@%&\?+\/\$~=]|\[[A-Za-z0-9А-Яа-яёЁ\-\_#\@%&\?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#\@%&\?+\/\$.,~=;:]*\)))?)?)/ig,
	            function () { // copied to notifier.js:3401
	                var matches = Array.prototype.slice.apply(arguments),
	                    prefix = matches[1] || '',
	                    protocol = matches[2] || 'http://',
	                    domain = matches[3] || '',
	                    url = domain + (matches[4] || ''),
	                    full = (matches[2] || '') + matches[3] + matches[4];

	                if (domain.indexOf('.') == -1 || domain.indexOf('..') != -1) return matches[0];
	                var topDomain = domain.split('.').pop();
	                if (topDomain.length > 6 || indexOf('info,name,aero,arpa,coop,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,рф,укр,сайт,онлайн,срб,cat,pro,local'.split(','), topDomain) == -1) {
	                    if (!/^[a-zA-Z]+$/.test(topDomain) || !matches[2]) {
	                        return matches[0];
	                    }
	                }

	                if (matches[0].indexOf('@') != -1) {

	                    //return matches[0];
					}
					
	                try {
	                    full = decodeURIComponent(full);
	                } catch (e){}

	                if (full.length > 55) {
	                    full = full.substr(0, 53) + '..';
	                }
	                full = clean(full).replace(/&amp;/g, '&');

						url = replaceEntities(url).replace(/([^a-zA-Z0-9#\@%;_\-.\/?&=\[\]])/g, encodeURIComponent);
						
						var tryUrl = url, hashPos = url.indexOf('#/');
						
	                    if (hashPos >= 0) {
	                        tryUrl = url.substr(hashPos + 1);
	                    } else {
	                        hashPos = url.indexOf('#!');
	                        if (hashPos >= 0) {
	                            tryUrl = '/' + url.substr(hashPos + 2).replace(/^\//, '');
	                        }
	                    }

	                   

	                    return prefix + '<a cordovalink="_system" href="'+ (protocol + url).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" target="_blank">' + full + '</a>';
	            });

	    return replacedText;
	}


	hideString = function(str){

		var nstr = ''

		for(var i = 0; i < str.length; i++){

			if(i < str.length * 0.666) nstr += "*"

				else
					nstr += str[i]

		}

		return nstr

	}

/* ______________________________ */

/* CRYPTO */


checkAddress = function(address){
	var check = function(address) {
	  var decoded = base58_decode(address);     
	  if (decoded.length != 25) return false;

	  var cksum = decoded.substr(decoded.length - 4); 
	  var rest = decoded.substr(0, decoded.length - 4);  

	  var good_cksum = hex2a(sha256_digest(hex2a(sha256_digest(rest)))).substr(0, 4);

	  if (cksum != good_cksum) return false;
	  return true;
	}

	var base58_decode = function(string) {
	  var table = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
	  var table_rev = new Array();

	  var i;
	  for (i = 0; i < 58; i++) {
	    table_rev[table[i]] = int2bigInt(i, 8, 0);
	  } 

	  var l = string.length;
	  var long_value = int2bigInt(0, 1, 0);  

	  var num_58 = int2bigInt(58, 8, 0);

	  var c;
	  for(i = 0; i < l; i++) {
	    c = string[l - i - 1];
	    long_value = add(long_value, mult(table_rev[c], pow(num_58, i)));
	  }

	  var hex = bigInt2str(long_value, 16);  

	  var str = hex2a(hex);  

	  var nPad;
	  for (nPad = 0; string[nPad] == table[0]; nPad++);  

	  var output = str;
	  if (nPad > 0) output = repeat("\0", nPad) + str;

	  return output;
	}

	var hex2a = function(hex) {
	    var str = '';
	    for (var i = 0; i < hex.length; i += 2)
	        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	    return str;
	}

	var a2hex = function(str) {
	    var aHex = "0123456789abcdef";
	    var l = str.length;
	    var nBuf;
	    var strBuf;
	    var strOut = "";
	    for (var i = 0; i < l; i++) {
	      nBuf = str.charCodeAt(i);
	      strBuf = aHex[Math.floor(nBuf/16)];
	      strBuf += aHex[nBuf % 16];
	      strOut += strBuf;
	    }
	    return strOut;
	}

	var pow = function(big, exp) {
	    if (exp == 0) return int2bigInt(1, 1, 0);
	    var i;
	    var newbig = big;
	    for (i = 1; i < exp; i++) {
	        newbig = mult(newbig, big);
	    }

	    return newbig;
	}

	var repeat = function(s, n){
	    var a = [];
	    while(a.length < n){
	        a.push(s);
	    }
	    return a.join('');
	}

	return check(address)
}


/* ______________________________ */

/* EXTRA */

superXSS = function(str, p){

	var l = str.length;

	var nstr = filterXSS(str, p)

	if(!nstr.length || l == nstr.length){
		return nstr
	}
	else{
		return superXSS(nstr, p)
	}

}

clearStringXss = function(nm){

	return filterXSS(nm, {
		whiteList: [],
		stripIgnoreTag: true,
	})
}

getBase64 = function (file) {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onload = () => resolve(reader.result);
	  reader.onerror = (error) => reject(error);
	});
};

findResponseError = (response) => {
	const ERRORS_PATHS = [
		'response.data.errors',
		'response.data.error',
	];

	const error = ERRORS_PATHS.map(path => deep(response, path)).filter(error => error)[0] || {};

	return (typeof error === 'object') ? (Object.values(error)[0] || {}).msg : error;
}
serialize = function (obj) {
	var str = [];
	for (var p in obj)
	  if (obj.hasOwnProperty(p)) {
		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	  }
	return str.join('&');
  };
  

checkConnection = function() {
	if (typeof window != 'undefined') {
		if (window.cordova && navigator.connection && navigator.connection.type) {
			var networkState = navigator.connection.type;
	
			var states = {};
			states[Connection.UNKNOWN]  = 'UNKNOWN';
			states[Connection.ETHERNET] = 'ETHERNET';
			states[Connection.WIFI]     = 'WIFI';
			states[Connection.CELL_2G]  = '2G';
			states[Connection.CELL_3G]  = '3G';
			states[Connection.CELL_4G]  = '4G';
			states[Connection.CELL]     = 'CELL';
			states[Connection.NONE]     = 'NONE';
	
			return states[networkState]
		} else if (!window.cordova && navigator.connection && navigator.connection.type) {
			return navigator.connection.type
		} else {
			return ''
		}
	}
}

stringEqTrig = function(s1, s2){

	if(!s1) s1 = ''
	if(!s2) s2 = ''

	var bw = function(s){
		return s.split(/[ \t\v\r\n\f,.]+/)
	}

	var hash = function(s){

		var ps = bw(s).join(' ')

		return ps.toLowerCase().replace(/[^a-zа-я0-9&]*/g, '');
	}

	

	var makeTr = function(w){
		var trs = {};

		var takeC = function(index){
			var c;

			if(index < 0 || index >= w.length) c = "_";

			else c = w[index];



			return c;
		}

		for(var i = -1; i <= w.length; i++){

			var tr = "";

			for(var j = i - 1; j <= i + 1; j++){
				tr = tr + takeC(j);
			}


			trs[tr] = 1;
		}

		return trs;
	}


	var t1 = makeTr(hash(s1)),
        t2 = makeTr(hash(s2));
        

	var c = 0,
		m = Math.max(_.toArray(t1).length, _.toArray(t2).length)

	_.each(t1, function(t, index){

		if(t2[index]) c++;

	})

	return c / m;


}
/* */

if(typeof window != 'undefined'){



	var splashScreen = document.getElementById('splashScreen');

	if (splashScreen) {


		var splashScreenImg = document.getElementById('splashScreenImg');
		var stopRotation = false;

		// Logos variant color
		var logos = ['img/splashscreen/pocketnet-logo-16.svg', 'img/splashscreen/pocketnet-logo-17.svg', 'img/splashscreen/pocketnet-logo-15.svg',
						'img/splashscreen/pocketnet-logo-14.svg', 'img/splashscreen/pocketnet-logo-18.svg', 'img/splashscreen/pocketnet-logo-19.svg'];
		// Index in the array for the next logo variant
		var nextLogoIndex = 0;
		// Duration of all animations (in ms)
		var zoomInDuration = 500, rotatingDuration = 1000, zoomOutDuration = 500;
		// Interval
		var splashScreeninterval;

		// Function to start the ending process of the splash screen
		hideSplashScreen = function() {
			// Set the boolean, so we can stop during the end of the next animation
			stopRotation = true;
		}

		// Function triggered at the end of each rotating animation
		rotatingAnimationEnded = function() {
			if (!splashScreenImg)
				return;
			// Check if we need to stop rotating and fade out
			if (stopRotation) {
				splashScreenImg.classList.remove("rotate");
				splashScreenImg.classList.add('zoom-out-rotate');
				splashScreen.classList.add('fade-out');
				// When zoom out animation is done, completely remove the splash screen
				setTimeout(() => {
					// Clear interval if needed
					if (splashScreeninterval != undefined){
						clearInterval(splashScreeninterval);
					}
					// Completely remove the splashscreen
					splashScreen.remove();
				}, zoomOutDuration * 2);
			}
			// Wait until half the rotation is done
			setTimeout(() => {
				// Change the logo image
				splashScreenImg.src = logos[nextLogoIndex];
				// Increase index
				nextLogoIndex = (nextLogoIndex >= (logos.length - 1)) ? 0 : nextLogoIndex + 1;
			}, rotatingDuration * 0.5);
		}

		// Wait until the zoom in is done
		setTimeout(() => {
			if (!splashScreenImg)
				return;
			// Start rotating the logo
			splashScreenImg.classList.remove('zoom-in');
			splashScreenImg.classList.add('rotate');
			// Triggered every times we reached the end of the rotating animation
			rotatingAnimationEnded();
			splashScreeninterval = setInterval(rotatingAnimationEnded, rotatingDuration);
		}, zoomInDuration);

	}
		

}