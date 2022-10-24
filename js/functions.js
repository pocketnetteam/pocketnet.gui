
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
					<path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#a4a4a4" fill="transparent"/>\
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


	easeOutQuint= function(x){
		return 1 - Math.pow(1 - x, 10);
	}

	wnd = function(p){

		if(!p) p = {};

		var self = this,
			app = p.app,
			content = p.content || null,

			id = 'w' + makeid().split('-')[0],
			nooverflow = (p.nooverflow || /*app.scrollRemoved || */p.pip),
			el = p.el || p.app.el.windows;

		var penable = false

		var parallax = null
		var showmoremobile = false
		var showmoremobilevalue = 75;

		//var _w = $(window);

		var wnd;
		var cnt = null
		var cntj = null

		var find = function(s){
			if (wnd) return wnd.find(s);
		}

		var pippositions = ['default', 'bottom']

		self.independent = p.pip

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
			/*wnd.css('top', app.lastScrollTop)*/
		}

		var templates = {
			statebuttons : function(){
				return '<div class="changeStateButtons"><div class="hideButton changeButton roundclosebutton"><i class="fas fa-minus"></i></div><div class="closeButton changeButton roundclosebutton"><i class="fas fa-times"></i></div><div class="changeButton expandButton"><i class="fas fa-expand-arrows-alt"></i></div></div>'
			},

			pipbuttons : function(){
				return '<div class="_expand roundclosebutton"><i class="fas fa-expand"></i></div><div class="_changeplace roundclosebutton"><i class="fas fa-angle-down"></i></div>'
			},

			roundclose : function(){
				return '<div class="_close roundclosebutton"><i class="fa fa-times" aria-hidden="true"></i></div><div class="closeline"></div>'
			}
		}

		var render = function(clbk){

			if(!p.type) p. type = ''

			var h = '<div class="wndback" id='+id+'></div>'+ (p.pip ? templates.pipbuttons() : '') + (p.allowHide ? templates.statebuttons() : templates.roundclose()) +'<div class="wndinner ' + p.type + '">';

				if(p.leftbg)
					h+='<div class="leftbg"><div>'+p.leftbg+'</div></div>';

				if(p.header)
				{
					h+='<div class="wndheader">'+ (app.localization.e(p.header) || p.header)+'</div>';
				}
				

				h+=	 '<div class="wndcontent customscroll content">'+content+'</div>';

				if (!p.noButtons) {
					h +=	 '<div class="buttons windowmainbuttons">';

					_.each(p.buttons, function(button, i){

						var txt = (button.html ? button.html :
							(app ? ( app.localization.e(button.text) || button.text || '') :
							(button.text || '')) )

						var hb = '<div class="button '+(button.class || "")+'" bi="'+i+'">'+txt+'</div>'

						h += hb

					})

					h+=	 '</div>';
				}

				wnd = $("<div>", {
					"class" : "wnd",
					"html"	: h
				});

		   	if(!p.header) wnd.addClass('noheader')

			if(p.pip) {
				wnd.addClass('pipmini')
				wnd.attr('position', localStorage['pipposition'] || 'default')
			}

			var hiddenState = el.find('.hiddenState')

			window.requestAnimationFrame(() => {

				if (hiddenState.length){
					hiddenState.before(wnd)
				}	
				else{	
					el.append(wnd);
				}
				

				wnd.find("._close").on('click', function(){
					actions["close"](true);
				});

				wnd.find("._expand").on('click', function(){
					actions["expand"](true);
				});

				wnd.find("._changeplace").on('click', function(){

					var cur = localStorage['pipposition'] || 'default'

					cur = nextElCircle(pippositions, cur)

					localStorage['pipposition'] = cur

					wnd.attr('position', cur)

				});

				if (!p.noButtons) {
					_.each(p.buttons, function(button, i){
						var _el = wnd.find('.wndinner>div.buttons .button[bi="'+i+'"]')

						var fn = button.fn || actions[button.action] || actions["close"];

						_el.on('click', function(){fn(wnd, self)});
					})
				}

				app.actions.playingvideo(null);

				if(p.class) wnd.addClass(p.class);

				wnd.css("display", "block");
				wnd.addClass('asette')

				if(p.showbetter) wnd.addClass('showbetter')


				setTimeout(function(){
					window.requestAnimationFrame(() => {
						wnd.addClass('sette')
					})
					
				}, 20)

				setTimeout(function(){
					window.requestAnimationFrame(() => {
						wnd.removeClass('asette')
					})
					

					if(!nooverflow){
						app.actions.offScroll(wnd);
					}

					if((wnd.hasClass('normalizedmobile'))){

						setTimeout(function(){
							if(clbk && !p.fastClbk) clbk()

							setTimeout(function(){
								window.requestAnimationFrame(() => {
									if (wnd)
										wnd.find('.wndcontent>div').css('opacity', 1)
								})
							}, 100)

						}, 30)

					}

				}, 220)

				if(wnd.hasClass('normalizedmobile') && !p.fastClbk){

				}
				else{
					if(clbk) clbk()
				}

			})


		}

		var resize = function(){

		}

		////TODO

		var wndcontentscrollmobile = function(e){

			var cc = cnt.scrollTop()

			if(cc > showmoremobilevalue && !showmoremobile){
				wnd.addClass('showbetter')
				showmoremobile = true
			}

			if(cc < showmoremobilevalue && showmoremobile) {
				showmoremobile = false
				wnd.removeClass('showbetter')
			}

		}

		var destroySwipable = function(){
			if (parallax){
				parallax.clear()
				parallax.destroy()
				parallax = null
			}
		}

		var initSwipable = function(){


			if(isTablet() && !parallax && penable){

				var trueshold = 20

				var down = {
					cancellable : true,

					positionclbk : function(px, e){
						var percent = Math.abs(px) / trueshold;
					},

					constraints : function(e){

						var i = false

						var sel = _.find(e.path, function(p){

							if (p.id == 'windowsContainer'){
								i = true
							}

							if (i) return null

							return p.classList.contains('customscroll');
						})

						if(!sel){
							return true;
						}

						if (sel.scrollTop == 0){

							if (isios())
								sel.scrollTop = 1

							return true
						}
					},

					restrict : true,
					trueshold : trueshold,
					distance : 100,
					clbk : function(){
						actions.close(true)
					}

				}

				var directions = {}

				if(p.reversePrlx){
					directions.up = down
				}
				else{
					directions.down = down
				}


				parallax = new SwipeParallaxNew({

					el : wnd.find(p.parallaxselector || '.wndinner'),
					transformel : wnd.find('.wndinner'),
					allowPageScroll : 'vertical',
					directions : directions
	
	
				}).init()
			}
			
		}

		var scrolling = function(){
			if (cntj){
				if(!cntj.scrollTop || (isios() && cntj.scrollTop <= 1)){
					initSwipable()
				}
				else{
					destroySwipable()
				}
			}	
		}

		var initevents = function(){

			if(!p.noCloseBack)
				wnd.find('.wndback').one('click', function(){

					if(p.allowHide && self.minimizeOnBgClick){
						actions.hide()
					}
					else{
						actions.close(true)
					}
					
				});

			if (p.allowHide) {
				wnd.find('.hideButton').on('click', actions.hide);
				wnd.find('.closeButton').on('click', actions.close);
				wnd.find('.expandButton').on('click', actions.show);
			}

			

			if(isTablet() && (wnd.hasClass('normalizedmobile'))){

				cnt = wnd.find('.wndcontent')

				if(!wnd.hasClass('fromtop')){
					penable = true
				}

				/*if(!p.showbetter)
					cnt.on('scroll', _.throttle(wndcontentscrollmobile, 50))*/

			}

			initSwipable()

			cntj = wnd.find('.wndcontent')[0];

			wnd.find('.wndcontent').on('scroll', _.throttle(scrolling, 50))

			app.events.resize[id] = resize
			app.events.scroll[id] = wndfixed


		}

		var clearmem = function(){
			wnd = null;
			cnt = null
			cntj = null

			self.el = null
			self.close = null

			_.each(p.buttons, function(button){
				delete button.el
			})

			el = null
			app = null

			self.essenseDestroy = null

			p = {}
		}

		var closing = false

		var actions = {

			expand : function(){

				var expand = p.expand

				actions.close()

				setTimeout(function(){

					if (expand){
						expand()
					}

				}, 200)

			},

			close : function(cl, key){

				if(closing) return

				closing = true

				

				if(cl) if(p.closecross) p.closecross(wnd, self);

				if(p.close) p.close(wnd, self);

				delete app.events.resize[id]
				delete app.events.scroll[id]

				window.requestAnimationFrame(() => {
					destroySwipable()

					wnd.addClass('asette')
					wnd.removeClass('sette')

					if(!nooverflow)
						app.actions.onScroll();
				})


				var cl = function(){
					if (self.essenseDestroy) self.essenseDestroy(key)

					window.requestAnimationFrame(() => {
						
						wnd.remove();

						clearmem();
					})

				}

				if (!isMobile()){
					cl()
				}
				else{
					setTimeout(cl,  220)
				}

				if(p.onclose) p.onclose()

			},

			hide : function(cl, key) {

				if(!wnd) return

				wnd.find('.buttons').addClass('hidden');
				wnd.addClass('hiddenState');

				wnd.find('.wndcontent > div').addClass('rolledUp');

				if(!nooverflow) {
					app.actions.onScroll();
				}
			},

			show : function(cl, key) {

				if(!wnd) return

				wnd.find('.buttons').removeClass('hidden');
				wnd.removeClass('hiddenState');
				wnd.find('.wndcontent > div').removeClass('rolledUp');
			

				if(!nooverflow) {
					app.actions.offScroll(wnd);
				}
			},
		}

		self.unhidenormalized = function(){
	
			if (app.mobileview && wnd && (wnd.hasClass('normalizedmobile'))  ){
				wnd.find('.wndcontent>div').css('opacity', 1)
			}
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
					html : app ? app.localization.e('close') : 'Close',
					class : "close"
				};


			var success = function(){

				if(p.preloader) preloader(false);

				render(function(){
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
				});


			}

			if (app.chatposition)
				app.chatposition(false)

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

	tooltipMobileDialog = function(p){
		if(!p) p = {};

		p.wrap = true;

		p.class = 'tooltipMobileDialog';

		p.html = '<div class="mobiledialogcontent">'+(p.html || '')+'</div><div class="closeButton"><button class="button ghost"><i class="far fa-times-circle"></i> '+app.localization.e('close')+'</button></div>'

		var c = p.clbk || function(){}

		p.clbk = function(el){

			el.find('.closeButton').on('click', function(){
				self.destroy()
			})

			setTimeout(function(){
				el.addClass('animend')
			}, 20)


			c(el)
		}

		var self = new dialog(p);

		return self;
	}

	menuDialog = function(p){
		if(!p) p = {};

		p.wrap = true;

		p.class = 'menudialog';

		/*p.items.push({
			class : 'itemclose',
			text : '<i class="fas fa-times-circle"></i>'
		})*/

		var ehtml = function(){
			var h = ''

			h += '<div class="mobiledialogcontent customscroll">'

			_.each(p.items, function(item, i){
				h += '<div class="item ' + (item.class || "") + '" item="'+i+'">'
					h += item.text
				h += '</div>'
			})

			h += '</div>'
			

			h += '<div class="closeButton">'
				h += '<div class="item itemclose">'
					h+='<i class="far fa-times-circle"></i> '+app.localization.e('close')+''
				h += '</div>'
			h += '</div>'



			return h;
		}

		p.html = ehtml()

		p.clbk = function(el){
			el.find('.item').on('click', function(){

				var i = $(this).attr('item')

				if(!i || !p.items[i].action){
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
				p.html += '<textarea elementsid="textarea_'+index+'" placeholder="'+(value.placeholder || value.label || '')+'" class="'+_class+'" index="'+index+'">' + (value.defValue || '') + '</textarea>';

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
		if(!p.close) p.close = false;
		if(!p.destroy) p.destroy = false;


		if(!p.btn1text) p.btn1text = app.localization.e('daccept');
		if(!p.btn2text) p.btn2text = app.localization.e('dcancel');

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

				poll += '<div class="title"><input elementsid="input_poll_title" class="input" type="text"><i class="fas fa-times-circle"></i></div>'

				poll += '<div class="options description">Poll options</div>';

				for (var i = 0; i < 5; i++){
					poll += `<div class="poll-item" id="poll-item-${i + 1}"><input elements="poll-input-item-${i + 1}" class="input" type="text"><i class="fas fa-times-circle"></i></div>`;
				}

				poll += "</div>";

				html += poll ;

			}

			if(p.html)
			{
				html += '<div class="body"><div class="text">'+(p.html || "")+'</div></div>';
			}

			html+=	 '<div class="buttons">\
							<div class="btn2wr"><button elementsid="dialog_btn2" class="btn2 medium">'+p.btn2text+'</button></div>\
							<div class="btn1wr"><button elementsid="dialog_btn1" class="btn1 medium">'+p.btn1text+'</button></div>\
						</div><div elementsid="dialog_close" class="_close"><i class="fa fa-times" aria-hidden="true"></i></div>\
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

			$el.on('click', clickOutsideOfWindow)


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

			if(typeof p.destroy === 'function')
				p.destroy(self);

			destroyed = true;

			$el.remove();

			if(removescroll)
			{
		    	app.actions.onScroll();
			}
		}

		var clickOutsideOfWindow = function(e){
			const clickedElem = e.target;

			const isElem1Clicked = clickedElem.classList.contains('secondwrapper');

			const isClickOutside = (isElem1Clicked);

			if (!isClickOutside) {
				return;
			}

			destroy()

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

	sitemessage = function (message, func, delay = 5000, p = {}) {

		var m = "<div>"+message+"</div>"

		if (p.action){
			m+= '<div class="action"><button class="black">'+p.action.text+'</button></div>'
		}

		var messageel = $("<div/>", {
			"class": "sitemessage remove_now removing " + (p.class || ""),
			html: m

		})

		var destroyed = false

		var destroy = function(){
			if(destroyed) return
			messageel.addClass('removing')

			destroyed = true

			if (typeof func === 'function') func();

			setTimeout(function () {

				messageel.detach();

				messageel = null

			}, 300)
		}

		if(!p) p = {}

		messageel.appendTo("body")


		if (p.action){
			messageel.find('button').on('click', function(){
				p.action.do()
				destroy()
			})
		}

		setTimeout(function(){
			messageel.removeClass('removing')
		})

		if(delay != 'inf')

			setTimeout(function () {
				destroy()
			}, delay)


		return destroy
	}
/* ______________________________ */

/* IMAGES */
	bgImagesClear = function(el){
		el.css({
			'background-image': '',
			'background-size': 'cover',
			'background-position': 'center center',
			'background-repeat':'no-repeat'
		});
	}

	bgImages = function(el, p){

		if(!p) p = {};

		var els = el.find('[image]')

		if(!els.length){

			if(typeof p.clbk === 'function') p.clbk();

			return
		}

		try{

			els.imagesLoadedPN({ imageAttr: true }, function(image) {
				if(typeof p.clbk === 'function') p.clbk(image);
			});

		}

		catch(e){

			console.error(e)

		}


	}

	bgImagesCl = function(el, p){

		if(!p) p = {};

		var els = el.find('[image]')

		if(!els.length){

			if(typeof p.clbk === 'function') p.clbk();

			return
		}

		return Promise.all(els.map((i, el) => {

			return new Promise((resolve) => {

				var src = el.getAttribute('image')

				if(!src || src == '*') {
					el.setAttribute('imageloaded', 'true')
					return Promise.resolve()
				}

				el.setAttribute('data-image', src)

				var image = new Image()

				src = src.replace('bastyon.com:8092', 'pocketnet.app:8092').replace('test.pocketnet', 'pocketnet')
				
				image.src = src
				image.onload = () => {

					window.requestAnimationFrame(() => {
						
						el.setAttribute('image', '*')
						el.setAttribute('imageloaded', 'true')
						el.style['background-image'] = 'url('+src+')';
						el.style['background-size'] = 'cover';
						el.style['background-position'] = 'center center';
						el.style['background-repeat'] = 'no-repeat';

					})

					resolve()
				}

				image.onerror = () => {

					window.requestAnimationFrame(() => {
						el.setAttribute('image', '*')
					})

					resolve()
				}

			})

		})).then(() => {
			if(typeof p.clbk === 'function') p.clbk(image);
		})

	}

	carousel = function(el, _items, _container){

		var self = this

		var items = el.find(_items)
		var container = el.find(_container)

		var markershtml = ''
		var markers = null
		var currentscroll = 0
		var currentitem = 0

		window.requestAnimationFrame(() => {
			if(!container.hasClass('carousel')) container.addClass('carousel')

			for(var i = 0; i < items.length; i++){
				markershtml+= '<div index="'+i+'" class="'+(!i ? 'active' : '')+'"><div></div></div>'
			}

			el.append('<div class="carousel_markers">'+markershtml+'</div>')

			items.addClass('carousel_item')

			markers = el.find('.carousel_markers >div')

			markers.on('click', function() {
				gotoslide(this.getAttribute('index'))
				console.log(this)
			})
	
		})

		var findactive = function(){
			
			var activeindex = -1
			
			
			_.find(items, (item, index) => {


				if (Math.abs(currentscroll - item.offsetLeft) < 1){
					activeindex = index

					return true
				} 
			})

			return activeindex

		}

		var setactive = function(index){

			if(index == currentitem) return

			currentitem = index

			if (markers){
				markers.removeClass('active')
				markers[index].classList.add('active')
			}
		}

		var gotoslide = function(index){
			window.requestAnimationFrame(() => {

				console.log('index', index, items[index].offsetLeft)
				container[0].scrollLeft = items[index].offsetLeft

			})

			//container.scrollTo(items[index].offsetLeft)
			
		}

		var scrollevent = _.throttle((el) => {

			currentscroll = el.scrollLeft

			window.requestAnimationFrame(() => {
				var activeindex = findactive()

				if (activeindex > -1){
					setactive(activeindex)
				}
			})

		}, 50)

		container.on('scroll', () => {
			scrollevent(container[0])
		})

		
		self.destroy = function(){
			container.off('scroll')
			markers.off('click')
			el = null
			container = null
			items = null
			markers = null
		}

		return self
	}

	pathFromMD5Name = function(name){

		return name.substr(0, 2) + "/" + name.substr(2, 2) + "/" + name.substr(4) + ".jpg";
	}

	nameFromScr = function(src){
		var srcs = src.split('/')

		return srcs[srcs.length - 1]
	}

	srcToData = function(url, callback) {

		if(url.indexOf('data:') > -1){
			callback(url);

			return
		}

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

	imagetojpegifneed = function ({base64, name}) {

		var nm = name.split('.')

		var _name = nm[0],
			_format = nm[1]

		if (_format == 'png' || _format == 'jpg' || _format == 'jpeg'){
			return Promise.resolve({base64, name});
		}

		return new Promise((resolve, reject) => {

			var imageObj = new Image(),
			  canvas = document.createElement('canvas'),
			  ctx = canvas.getContext('2d'),
			  newWidth,
			  newHeight;

			imageObj.src = base64;

			imageObj.onload = function () {
			  newHeight = imageObj.height;
			  newWidth = imageObj.width;

			  canvas.width = newWidth;
			  canvas.height = newHeight;

			  ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);

			  var url = canvas.toDataURL('image/jpeg', 1);

			  $(canvas).remove();

			  return resolve({base64 : url, name : _name + '.jpg'});
			};

		});
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

			  var url = canvas.toDataURL('image/' + format, 0.85);

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

        return new (window.wFile || window.File)([u8arr], filename, {type:mime});
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

	prevElCircle = function(array, el){
		var index = _.indexOf(array, el);

		if (index > 0){
			return array[index - 1]
		}

		else
		{
			return array[array.length - 1]
		}
	}

	nextElCircle = function(array, el){
		var index = _.indexOf(array, el);

		if (index > -1 && index < array.length - 1){
			return array[index + 1]
		}

		else
		{
			return array[0]
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

	rot13 = function(str){
		var re = new RegExp("[a-z]", "i");
		var min = 'A'.charCodeAt(0);
		var max = 'Z'.charCodeAt(0);
		var factor = 13;
		var result = "";
		str = str.toUpperCase();

		for (var i=0; i<str.length; i++) {
			result += (re.test(str[i]) ?
			String.fromCharCode((str.charCodeAt(i) - min + factor) % (max-min+1) + min) : str[i]);
		}

		return result;
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

	dround = function (n, d){
		var digits = + "1".padEnd(d + 1, "0");

		return Math.round(n * digits) / digits;
	}

	ParametersLive = function(parameters, el, p){

		if(!el) return
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
						_el.on(clickAction(), '.vmt_panel_wrapper', function(){

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



					_el.find('.vmt_showMore').on(clickAction(), function(){

						_el.addClass('showedMore')
					})

					_el.find('.vmt_hideMore').on(clickAction(), function(){

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

					_el.find('.vm_showMore').on(clickAction(), function(){

						_el.addClass('showedMore')
					})

					_el.find('.vm_hideMore').on(clickAction(), function(){

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
							$('html').on(clickAction(), closeclick)

							window.addEventListener('scroll', close);

							_el.find('.vc_selectInput').scrollTop(0)
						}
						else
						{
							close()
						}
					}

					var close = function(){

						if (bkp){
							input.val(bkp)
						}

						take().removeClass('opened');

						$('html').off(clickAction(), closeclick)

						window.removeEventListener('scroll', close);
					}

					var closeclick = function(e){
						if (_el.has(e.target).length === 0 && take().hasClass('opened')) {
							close();
						}
					}

					if(!parameter.disabled){

						if(parameter.type == 'valuescustom' || parameter.autoSearch)
						{
							_el.find('.vc_iconWrapper').on(clickAction(), function(){
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
							_el.find('.vc_textInput').on(clickAction(), function(){

								if(window.cordova && window.plugins.actionsheet){

									var items = _.map(parameter.possibleValues, (value) => {
										var label = parameter.labelByValue(value);

										return {
											label,
											value
										}
									})

									app.mobile.menu(_.map(items, (i) => {return i.label})).then((i) => {

										console.log("I", i)

										bkp = null;

										input.val(items[i].value);
										input.change();

									}).catch(e => {
										console.error('e', e)
									})
								
								}
								else{
									open()
								}

								
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


					_el.on(clickAction(), function(){


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

					if (parameter.type == 'email'){
						if(value == '_@_._') value = ''
					}

					if (parameter.type == 'nickname'){
						value = pstranslit(value)

						$(this).val(value);
					}

					if (parameter.type == 'number'){

						if(!isNaN(Number(value))){
							value = dround(value, deep(parameter, 'format.Precision') || 0)
						}
						else{
							value = ''
						}

						$(this).val(value);
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

				if (parameter.onFocus) _el.on('focus', function(){
					parameter.onFocus(_el, parameter)
				})

				if (parameter.onType){
					_el.on('keyup', _change)
				}

				if (parameter.type == 'number'){
					_el.on('keyup', function(e){

						if(e.originalEvent.key == '.' || e.originalEvent.key == ',' || e.originalEvent.key == 'Backspace'){
							return false
						}

						var value = $(this).val();

						console.log('value', value)

						if(!value || value == '0') {

							return false
						}

						if(value.length > 1) {

							if (value[0] == '0') value = value.substr(1)

							var l = value[value.length - 1]

							var hassep = value.indexOf('.') > -1 || value.indexOf(',') > -1

							console.log('hassep', hassep)

							if(l == '.' || (l == '0' && hassep) || l == ',') {
								console.log("HERE")
								return false
							}
						}


						if(!isNaN(Number(value))){

							

							var max = deep(parameter, 'format.max')
							var min = deep(parameter, 'format.min')

							console.log('max', max)
							console.log('min', min)

							if(typeof max != 'undefined' && max < value) value = max
							if(typeof min != 'undefined' && min > value) value = min

							value = dround(value, deep(parameter, 'format.Precision') || 0)

							$(this).val(value);
						}


					})
				}
			}

		})

		if (el.find('input').inputmask){

			$.each(el.find('input'), function(){
				var i = $(this);

				if (i.attr('data-inputmask') && !i.attr('notmasked')){
					i.inputmask({});
				}
			})

		}
	}

	var pstranslit = function(word){
		var answer = '';
		var converter = {
			'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
			'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
			'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
			'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
			'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
			'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
			'э': 'e',    'ю': 'yu',   'я': 'ya',

			'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
			'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
			'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
			'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
			'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
			'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
			'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
		};

		for (var i = 0; i < word.length; ++i ) {
			if (converter[word[i]] == undefined){
				answer += word[i];
			} else {
				answer += converter[word[i]];
			}
		}

		return answer;
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
			self.onFocus = p.onFocus || null;

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

				input += '<input elementsid="'+self.id+'" pid="'+self.id+'" type="checkbox" disabled id="checkbox_'+self.id+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
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


				return null

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

				mask.regex = "[а-яА-Яa-zA-Z0-9_]{"+limits.join(',')+"}";

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
				'<div class="locationInputUse"><input elementsid="locationInputUse" type="checkbox" id="checkbox_'+self.id+'_location" ' + checked + ' class="checkbox nolabel" />'+

				'<label for="checkbox_'+self.id+'_location"></label>'+'</div>'+
					'<div class="locationInput place"><input elementsid="locationInputPlace" type="text" notmasked="notmasked" placeholder="Name Of Place"></div><div class="locationInput radius">'+
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

				if(self.disabled) disabled = 'disabled'

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
					input += 			'<input elementsid="vs_input" '+disabled+'  type="text" value="'+displayValue+'" placeholder="'+self.placeholder+'">';
					input += 		'</div>';

					if(!self.format.right)
						input += caret;



					input += 	'</div>';


					input += 	'<div class="vc_selectInput customscroll">';

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


							//if(self.value == value) return

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

				var input = '<textarea elementsid="textarea_'+self.id+'" placeholder="'+self.placeholder+'" notmasked="notmasked" pid="'+self.id+'" class="' + self.type + ' ">' + self.render(true) + '</textarea>';

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
							input += '<input elementsid="checkbox_'+self.id+'_'+value+'" val="'+value+'" type="checkbox" id="checkbox_'+self.id+'_'+value+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
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
					input += '<div class="autoSearchWrapper"><input elementsid="autoSearch_input"  type="text" class="autoSearch" placeholder="Search Code"></div>'
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
											input += '<input elementsid="checkbox_' + self.id + group.id + '" type="checkbox" value="'+group.id+'" id="checkbox_' + self.id + group.id + '" class="checkbox" />'
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
										input += '<input elementsid="checkbox_'+ self.id + value.id + '" type="checkbox" value="'+value.id+'" id="checkbox_'+ self.id + value.id + '" class="checkbox" />'
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

				input += '<input elementsid="'+self.id+'" pid="'+self.id+'" type="checkbox" id="checkbox_'+self.id+'"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
				input += '<label for="checkbox_'+self.id+'"></label>';


				return input;

			}

			if (self.type == 'cash') {

				var input = '<div class="cashWrapper" pid="'+self.id+'">';

					input += '<div class="inputCashWrapper">';

					input += '<input elementsid="input_cash" ' + m + ' class="' + self.type + ' input"  value="' + self.render(true) + '">';

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

						input += '<input  elementsid="input_cashrange" index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

						input += '</div>';

						input += '<div class="inputCashrangeWrapper">';

						input += '<input  elementsid="input_cashrange_2" index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

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

					input += '<input  elementsid="input_numberrangefrom" index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

					input += '</div>';

					input += '<div class="inputNumberrangeWrapperTo">';

					input += '<input  elementsid="input_numberrangeto" index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

					input += '</div>';

					input += '</div>'

				return input;
			}

			if(self.type == 'color'){
				var input = '<input  elementsid="input_cashrange" notmasked="notmasked" pid="'+self.id+'" class="simpleColor input" value="' + self.value + '">';

				return input

			}

			if(self.type == 'daterange'){

				var input = '<div class="numberrangeWrapper" pid="'+self.id+'">';

					input += '<div class="inputNumberrangeWrapperFrom">';

					input += '<input  elementsid="input_numberrangefrom_"' + self.id + ' notmasked="notmasked" pid="'+self.id+'" class="datePicker input from" placeholder="From">'

					input += '</div>';

					input += '<div class="inputNumberrangeWrapperTo">';

					input += '<input  elementsid="input_numberrangeto_"' + self.id + ' notmasked="notmasked" pid="'+self.id+'" class="datePicker input to" placeholder="To">'

					input += '</div>';

					input += '</div>'

				return input;

			}

			if(self.type == 'daterange'){
				var input = '<input  elementsid="input_numberrange_"' + self.id + ' notmasked="notmasked" pid="'+self.id+'" class="datePicker input">';

				return input

			}

			if(self.type == 'phone'){


				var input = '<input  elementsid="input_numberrange_"' + self.id + ' notmasked="notmasked" pid="'+self.id+'" class="' + self.type + ' input" value="' + self.render(true) + '" type="text">';;

				return input

			}

			if(self.autoSearch){

				var input = '<div class="vc_autosearchInput">\
				<div class="placeholder"><div class="placeholderghost">&nbsp;</div></div>\
				<div class="autosearchInputCnt">\
				<input  elementsid="input_autosearch_"' + self.id + ' notmasked="notmasked" ' + m + ' pid="'+self.id+'" class="' + self.type + ' input" placeholder="'+(self.placeholder || "")+'" value="' + self.render(true) + '" type="text">\
				</div></div>';


				return input
			}

			if(self.type == 'password'){
				var input = '<input  elementsid="input_numberrangepassword_"' + self.id + ' '+__disabled+' pid="'+self.id+'" class="' + self.type + ' input" placeholder="'+(self.placeholder || "")+'" value="' + self.render(true) + '" type="password">';

				return input;

            }

            if(self.type == 'label'){
				return `<div elementsid="${self.id}" ${__disabled} ${m} pid="${self.id}" class="simpleColor inpLabel">${self.value}</div>`
            }

            if(self.type == 'file_select'){
                return `
                    <input  elementsid="input_file_select_${self.id}" ${__disabled} ${m} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">
                    <button elementsid="button_file_select_${self.id}" ${__disabled} ${m} pid="${self.id}_Selector" class="simpleColor inpButton btn_select">...</button>
                `;
            }

            if(self.type == 'button'){
				return `<button elementsid="button_${self.id}" ${__disabled} ${m} pid="${self.id}" class="simpleColor inpButton" value="${self.value}">${self.text}</button>`
			}

			if(self.type == 'number'){
				return `<input  elementsid="button_${self.id}_2" ${__disabled} step="${deep(self, 'format.Step') || ''}" min="${deep(self, 'format.Min') || ''}" max="${deep(self, 'format.Max') || ''}" pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="number">`
			}

			var input = `<input  elementsid="button_${self.id}_2" ${__disabled} ${m ? m : ''} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">`

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

		if (typeof ___mobile != 'undefined'){
			return ___mobile
		}

		___mobile = $('html').hasClass('mobile');

		return ___mobile
	}

	isTablet = function(){

		if (typeof ___tablet != 'undefined'){
			return ___tablet
		}

		___tablet = $('html').hasClass('mobile') || $('html').hasClass('tablet');

		return ___tablet

	}

	clickAction = function(){

		if(isTablet()) return 'touchend'

		return 'click'
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
		if (navigator.appVersion.indexOf("iPhone")!=-1) os = "ios";
		if (navigator.appVersion.indexOf("X11")!=-1) os = "unix";
		if (navigator.appVersion.indexOf("Linux")!=-1) os = "linux";
		if (navigator.appVersion.indexOf("Android")!=-1) os = "android";

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

	p_saveAs = function(p) {
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

	p_saveAsWithCordova = function(file, name, clbk, todownloads){

		var storageLocation = "";

		switch (device.platform) {
			case "Android":
				storageLocation = 'file:///storage/emulated/0/'; //LocalFileSystem.PERSISTENT
				break;
			case "iOS":
				storageLocation = cordova.file.cacheDirectory;
				break;
		}


		var onsuccess = function (fileSystem) {

			fileSystem.getDirectory('Download', { exclusive: false }, function (directory) {

				directory.getFile(name, { create: true, exclusive: false }, function (entry) {
					// After you save the file, you can access it with this URL
					var myFileUrl = entry.toURL();


					entry.createWriter(function (writer) {

						writer.onwriteend = function (evt) {
							//sitemessage("File " + name + " successfully downloaded");

							if (window.galleryRefresh){

								window.galleryRefresh.refresh(myFileUrl, function (msg) {

								}, function (err) {


								})

							}

							if (clbk)
								clbk({
									name,
									url : myFileUrl
								})
						};

						writer.onerror = function (e) {

							if (clbk)
								clbk(null, e)

						};

						// Write to the file
						writer.seek(0);

						writer.write(file);

					}, function (error) {

						/*dialog({
							html : "Error: Could not create file writer, " + error.code,
							class : "one"
						})*/

						if(clbk) clbk(null, error)

					});
				}, function (error) {

					/*dialog({
						html : "Error: Could not create file, " + error.code,
						class : "one"
					})*/

					if(clbk) clbk(null, error)

				});

			})
		}

		var onerror = function (evt) {
			if(clbk) clbk(null, evt)
		}
		
		if(todownloads){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){

				onsuccess(fileSystem.root)
			}, onerror)
		}
		else{
			window.resolveLocalFileSystemURL(storageLocation, onsuccess, onerror)
		}

	}

/* ______________________________ */

/* NAVIGATION */



	_scrollTop = function(scrollTop, el, time, direction){

		if(!direction) direction = 'Top'

		if(!el || el.attr('id') == 'application') {
			el = $("body,html");
		}

		if(typeof time == 'undefined') {
			time = 200;
		}

		if(time){

			var a = {}

			a['scroll' + direction] = scrollTop

			el.animate(a, time);
		}
		else{
			el['scroll' + direction](scrollTop)
		}


	}

	_scrollTo = function(to, el, time, ofs, direction){

		if(!direction) direction = 'Top'

		if(!to) to = $(this);

		var ofssetObj = to.offset();

		var offset = 0

		if (direction == 'Top') {
			offset = (to.height() - $(window).height()) / 2;

			if(window.cordova && !isios()){
				offset = offset + $(window).height() / 4
			}
		}

		if (direction == 'Left') offset = (to.width() - $(el).width()) / 2;

		if (ofssetObj)
		{
			var scrollTop = ofssetObj[direction.toLowerCase()] + offset;

			if (el) scrollTop = scrollTop + el['scroll' + direction]() - el.offset()[direction.toLowerCase()]

			scrollTop = scrollTop + (ofs || 0)

			_scrollTop(scrollTop, el, time, direction);
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



	inViewClear = function(){

	}

	inView = function(els, p){

		var st = 0,
			sh = 0;

		var w = 'auto'

		if(!p) p = {};

		if(!p.inel) {
			p.inel = $(window);
			st = p.app.lastScrollTop;
			sh = p.app.height;
			w = p.app.width;
		}

		else{

			inel = p.inel

			try{
				p.elOffset = p.inel[p.f]().top
			}
			catch (e){
				p.elOffset = 0;
			}

			st = inel.scrollTop()
			sh = inel.height()
			w = inel.width()
		}

		if(!p.offset) {
			p.offset = 0;
		}

		p.f || (p.f = 'offset')

		p.elOffset = 0;

		if(!p.mode) p.mode = "part";

		var inel = p.inel // $(p.inel);

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

			var offsetTop = p.cache && el.data('c_' + w + '_' + p.f) ? el.data('c_' + w + '_' + p.f) : el[p.f]().top,
				height = p.cache && el.data('c_'+ w + '_height') ? el.data('c_'+ w + '_height') : el.height(),
				bottom = offsetTop + height;

			el.data('c_' + w + p.f, offsetTop)
			el.data('c_'+ w + '_height', height)

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


	SwipeParallaxNew = function(p){
		if(!p) p = {};

			p.directions || (p.directions = {})

			_.each(p.directions, function(d,i){
				d.i = i
			})

		var self = this;
		var needclear = false

		self.destroyed = false

		var throttle = isios() ? 0 : 50
		var transitionstr = throttle ? ''+throttle+'ms linear' : 'none'


		let ticking = false;

		var directiontoprop = function(direction, value){

			if(direction == 'up') return 'y'
			if(direction == 'down') return 'y'
			if(direction == 'left') return 'x'
			if(direction == 'right') return 'x'

		}

		var ms = false

		var set = function(direction, value){

			var __el = (p.transformel || p.el)[0]

			var prop = directiontoprop(direction);
			var pd = 'left'
			var pb = 'top'

			var scaledifmax = 0.1
			var scaledif = scaledifmax * Math.min(Math.abs(value), 100) / 100
			var scale = (1 - scaledif).toFixed(3)

			if(direction == 'up' || direction == 'left') {
				value = -value
				pd = 'right'
				pb = 'bottom'
			}

			if(p.directions[direction] && p.directions[direction].basevalue) value = value + p.directions[direction].basevalue()

			if(p.directions[direction] && p.directions[direction].scale100) scale = 1

			if(!value) value = 0

			value = value.toFixed(0)

			if (prop == 'x'){
				__el.style["transform"] = "translate3d("+value+"px, 0, 0)"

				//if(!ms)
					//__el.style['transform-origin'] = pd + ' center'
			}

			if (prop == 'y'){
				__el.style["transform"] = "translate3d(0, "+value+"px, 0)"

				//if(!ms)
					//__el.style['transform-origin'] = 'center ' + pb
			}

			if(!ms){

				__el.style["-moz-transition"] = transitionstr
				__el.style["-o-transition"] = transitionstr
				__el.style["-webkit-transition"] = transitionstr
				__el.style["transition"] = transitionstr

				__el.style["-webkit-overflow-scrolling"] = 'touch'
			}

			ms = true

		}

		var applyDirection = function(direction, v, e){
			if (direction.positionclbk){
				needclear = true
				direction.positionclbk(v, e)
			}
		}

		self.clear = function(){

			if (needclear){

				var __el = p.transformel || p.el


				__el.css({"transform": ""});

				__el.css({"-moz-transition": transitionstr});
				__el.css({"-o-transition": transitionstr});
				__el.css({"-webkit-transition": transitionstr});
				__el.css({"transition": transitionstr});


				__el.css({"-webkit-overflow-scrolling": ''});

				_.each(p.directions, function(d){
					applyDirection(d, 0)
				})


				setTimeout(() => {
					__el.css({"-moz-transition": ""});
					__el.css({"-o-transition": ""});
					__el.css({"-webkit-transition": ""});
					__el.css({"transition": ""});

					__el = null
				}, 100)
			}

			ms = false
			needclear = false
		}

		self.init = function(){

			var mainDirection = null;

			var statusf = function(e, phase, direction, distance){

				//if(phase == 'start' && !direction) return // ?

				if (self.destroyed) return

				if (mainDirection && mainDirection.i != direction){
					phase = 'cancel'
					direction = mainDirection.i
				}

				if (phase == 'cancel' || phase == 'end'){

					if (mainDirection){

						if(phase == 'end' && mainDirection.clbk && direction == mainDirection.i){

							if((!mainDirection.distance || mainDirection.distance < distance)){
								mainDirection.clbk()
							}

						}
					}

					self.clear()
					document.ontouchmove = () => true

					return

				}


				if(!direction || !p.directions[direction]) {
					return true
				}

				var dir = p.directions[direction]

				if (dir.constraints && !dir.constraints(e)) {

					if (mainDirection){
						mainDirection = null;
					}

					if (e.cancelable !== false){
						e.stopPropagation();
						e.preventDefault();
					}

					return false
				}

				if (e.cancelable !== false){
					e.stopPropagation();
					e.preventDefault();
				}

				if (phase == 'start'){
					mainDirection = null

					document.ontouchmove = (e) => {

						e.stopPropagation();
						e.preventDefault();

						return false
					}
				}

				if (phase == 'move'){

					if (distance > (dir.trueshold || 30)){

						mainDirection = dir

						applyDirection(mainDirection, distance, e)

						set(mainDirection.i, distance)

					}

					if (e.cancelable !== false){
						e.stopPropagation();
						e.preventDefault();
					}

					return true
				}

			}

			p.el.swipe({
				preventDefaultEvents : p.preventDefaultEvents,
				allowPageScroll : p.allowPageScroll,
				swipeStatus : throttle ? _.throttle(statusf, throttle) : statusf,
			})

			return self
		}

		self.destroy = function(){

			p.el.swipe('destroy')
			p = {}
			needclear = false

			self.destroyed = true

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
			caption.css('z-index', p.zIndex || '3');

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

		/*if(!_Node)
			$.ajaxSetup({
				// Disable caching of AJAX responses
				cache: false
			});*/

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

				if (p.peertubeImage) {

					// Prepare URL
					/*var url = new URL(app.peertubeServer);

					if (data.ipAddress) {
						url.hostname = data.ipAddress;
						url.protocol = 'http:';
						delete data.ipAddress;
					}*/

					ap.url = p.url + 'images/' + data.Action;

					delete data.Action;

					if (data.type && data.type.length > 0)
						ap.url += '?type=' + data.type;

					delete data.type;

					// Get or refresh access token
					var xmlHttp = new XMLHttpRequest();

					xmlHttp.open("POST", p.url + 'users/token', false);
					xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					xmlHttp.send(toUrlEncoded({
						grant_type: 'password',
						...user.peertube
					}));
					var res = JSON.parse(xmlHttp.responseText), auth;
					// Set auth header
					if (res && res.access_token) auth = 'Bearer ' + res.access_token;

						ap.headers = {
							Authorization: auth
						}

					// Prepare image data for request
					const mimeType = ap.data.base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

					const blob = b64toBlob(ap.data.base64.split(',')[1], mimeType);

					var formData = new FormData();
						formData.append("imagefile", blob);

					ap.data = formData;
					ap.processData = false;
					ap.contentType = false;

					$.ajax(ap);

					return;

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

		el.find('i').on('mouseenter', function(){

			var _el = $(this).closest('.stars')

			if(_el.attr('value')) return;

			var v = $(this).attr('value')

			_el.attr('tempValue', v)
		})

		el.find('i').on('mouseleave', function(){
			var _el = $(this).closest('.stars')
			_el.removeAttr('tempValue')
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

	mobsearch = function(el, p){

		if(p.mobileSearch && p.app){
			window.requestAnimationFrame(() => {

				el.html('<div class="mobsearch">'+(p.icon || p.placeholder)+'</div>')
				el.find('div').on('click', function(){
					p.app.platform.ui.mobilesearch(p)
				})

			})

			return null
			
		}
		else{
			return new search(el, p)
		}

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

		self.setvalue = function(value){
			el.find('input').val(value)

			if (value)
				searchEl.addClass('searchFilled')
			else
				searchEl.removeClass('searchFilled')
		}

		var template = function(){

			p.class || (p.class = "")

			var elements = [

				'<div elementsid="template_searchIconLabel_' +  (p.id || p.placeholder) + '" class="searchIconLabel">' + (p.icon ||
					'<i class="fa fa-search" aria-hidden="true"></i>' +
					'<i class="fas fa-circle-notch fa-spin"></i>') +
				'</div>',

				'<div class="searchInputWrapper">' +
					'<input  elementsid="sminputsearch_' + (p.id || p.placeholder) + '" class="sminput" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="' + (p.placeholder || "Search") + '">' +
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
					'<div class="sminput"  contenteditable="true"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="' + (p.placeholder || "Search") + '"></div>' +
				'</div>'
			}


			var h = '<div class="search ' + (p.class || "") + '">' +
						'<div class="searchInput">' +
							'<div class="searchInputIcon">' +
								elements.join(" ") +
							'</div>' +
						'</div>' +
						'<div class="searchFastResultWrapper customscroll">'
						'</div>' +
					'</div>'

			return h;
		}

		var helpers = {
			openResults : function(){

				if(!searchEl.hasClass('fastSearchShow')){
					searchEl.addClass('fastSearchShow');

					if(!p.closeByHtmlRemove)

						$('html').on('click', helpers.closeclickResults)
				}


			},
			closeResults : function(){
				
				if(!p.closeByHtmlRemove)	
					$('html').off('click', helpers.closeclickResults);

				searchEl.removeClass('fastSearchShow');
			},
			closeclickResults : function(e){
				if (!searchEl || (searchEl.has(e.target).length === 0 && searchEl.hasClass('fastSearchShow'))) {
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
			active : function(){
				if (p.events.active) p.events.active(self.active);
			},
			clear : function(el){

				var value = searchEl.find('.sminput').val()

				searchEl.find('.sminput').val('');

				searchEl.removeClass('searchActive');
				searchEl.removeClass('searchFilled');

				helpers.closeResults();

				if (p.events.clear) p.events.clear(value);

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

						if(!searchEl) return

						currentFastId = 0;

						bsActive = false;

						helpers.closeResults();

						searchEl.removeClass('searchActive');

						if(!fsActive)
							searchEl.removeClass('searchActive')

					}, events, helpers);
				}
			},
			showlast : function(){
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

				if(!searchEl) return

				if (value && p.events && p.events.fastsearch &&!bsActive){

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

		self.setactive = function(a){
			self.active = a

			events.active()
		}

		self.hide = function(){
			searchEl.removeClass('searchActive');
			searchEl.removeClass('searchFilled');

			helpers.closeResults();
		}

		self.blur = function(){
			el.find('input').blur()
		}

		self.focus = function(){
			el.find('input').focus()
		}

		self.getvalue = function(){
			return searchEl.find('.sminput').val()
		}

		self.template = template

		var initEvents = function(){

			var searchInput = el.find('input')

			var slowMadeTimer;

			searchInput.on('keyup', function(e){

				if ((e.keyCode || e.which) != 13) {

					if(typeof p.time == 'undefined'){
						p.time = 250;
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

				self.setactive(true)

				if($(this).val()){ events.fastsearch(searchInput) }

				else
					if(p.last){
						events.showlast(searchInput)
					}
			})

			searchInput.on('blur', function(){

				if(p.events.blur) p.events.blur($(this).val())

				/*setTimeout(function(){
					self.setactive(false)
				}, 300)*/
			})

			searchInput.on('keypress', function(e) {

				if ((e.keyCode || e.which) == 13) {
					events.search(searchInput)
				}

	        });

	        searchEl.find('.searchIconLabel').on('click', function(){

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

		self.destroy = function(){
			searchEl = null;
			fastResult = null;

			bsActive = null;
			fsActive = null;

			el = null
			p = {}
		}

		self.showlast = events.showlast

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
			_el.on(clickAction(), function(){
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

			edit.append("<div class='editForm'><input elementsid='editable_input' type='text' value='"+p.el.text()+"'></div>\
						 <label><div class='lwr'><div elementsid='editable_edt' class='editButton edt'><i class='fa fa-pencil'></i></div>\
						 <div elementsid='editButton_success' class='editButton success'><i class='fa fa-check'></i></div>\
						 <div elementsid='editButton_fail' class='editButton fail'><i class='fa fa-times'></i></div></div></label>");

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
			maxFileSize = (p.maxFileSize || 30) * 1024 * 1024,
			dropZone,
			input,
			mode = p.mode || "FS";

		var app = p.app

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

			reader.onloadend = (function(theFile) {
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

			if((file.type == 'image/jpeg' || file.type == 'image/png'|| file.type == 'image/jfif') && !p.notexif && typeof EXIF != 'undefined' && !isios()){
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

						if(p.app){

							et = {
								filesize : self.app.localization.e('photohassizegreater', fs),
								fileext : self.app.localization.e('invalidformat')
							}
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

			if (dropZone[0]) {
				dropZone[0].ondragover = function() {
					dropZone.addClass('hover');
					return false;
				};
	
				dropZone.on('dragout',function(event){
	
					dropZone.removeClass('hover');
					return false;
	
				});
	
				dropZone[0].ondrop = upload;
			}

			if(p.uploadImage && app && app.mobile.supportimagegallery()){

				input.on('click', function(e){

					app.platform.ui.uploadImage(p)

					e.stopPropagation()

					return false
	
				});

				return
			}
			
			input.on('change', upload);

			input.on(clickAction(), function(){

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
			el.find('.fileUploader').append('<div class="spinner"></div><div class="inputWrapper"><input elementsid="fileuploader_input" type="file" '+ m +'></div>');

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

		if(n == 1) return w[0]

		return w[1];
	}

	decodeEntities = function(s){
		const temp = document.createElement('p');
		temp.innerHTML = s;
		return temp.textContent || temp.innerText;
	}

	truncateString = function(str, n, useWordBoundary ){
		
		if(!str) return str

		if(!useWordBoundary) useWordBoundary = true

		if (str.length <= n) { return str; }
		var subString = str.substr(0, n-1);
		return decodeEntities(useWordBoundary
			? subString.substr(0, subString.lastIndexOf(' '))
			: subString).replace(/(,|\.|\s)$/, '') + "...";
	};

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

	    var test = _url.match(/(peertube:\/\/)?(http:\/\/|https:\/\/|)?(player.|www.)?(pocketnetpeertube[0-9]*\.nohost\.me|peer\.tube|vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|bitchute\.com|brighteon\.com|stream\.brighteon\.com)\/((videos?\/|embed\/|watch\/?)*(\?v=|v\/)?)*([A-Za-z0-9._%-]*)(\&\S+)?/);
	    var type = null
		var id = null
		var host_name = null

		if(_url && _url.indexOf('peertube://') > -1){
			var ch = _url.replace('peertube://', '').split('/');
			id = ch[1]
			type = 'peertube'
			host_name = ch[0]

		}
		else{
			if(test && test[2]){

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
				if (test.indexOf('brighteon.com') > -1) {
					type = 'brighteon'
					id = test[9]
				}
				if (test.indexOf('stream.brighteon.com') > -1) {
					type = 'stream.brighteon'
					let tempUrl = url;
					if (tempUrl.indexOf('/live/') != -1)
						tempUrl = tempUrl.replace('/live/', '/embed/');
					id = url.substring(url.lastIndexOf('/') + 1);
				}

			}
		}

	    // if(test && url.indexOf('channel') == -1 && url.indexOf("user") == -1){}



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

	nl2space = function(str){
		return str.replace(/\n/g, ' ');
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

	clearTagString = function(t){

		return trim(t.substr(0, 25).toLowerCase().replace(/[\-=!"#%&'*{},.\/:;?\(\)\[\]@\\$\^*+<>~`\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g, "")).replace(/[ ]+/g, ' ').replace(/ /g, '_')
	}
	

	boolToNumber = function(v){

		if(v) return 1;

		else return 0

	}


	numberToBool = function(v){

		if(v) return true;

		else return false

	}

	oldfindAndReplaceLink = function(inputText, nottrust){
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



				return prefix + '<a elementsid="href_cordovalink_systel" cordovalink="_system" href="'+ (protocol + url).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" target="_blank">' + full + '</a>';
		});

	    return replacedText;
	}

	findAndReplaceLink = function(inputText, nottrust) {

		if(typeof linkifyHtml != 'undefined'){

			try{

				var s = {
					cordovalink : '_system'
				}

				if (nottrust) {
					s.donottrust = 'true'
				}



				var l = linkifyHtml(inputText, {
					attributes : s,
					truncate: 80
				})


				return l
			}

			catch(e){
			}

		}

		return oldfindAndReplaceLink(inputText, nottrust)

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


Base64Helper = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64Helper._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
				Base64Helper._keyStr.charAt(enc1) + Base64Helper._keyStr.charAt(enc2) +
				Base64Helper._keyStr.charAt(enc3) + Base64Helper._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64Helper._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64Helper._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64Helper._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64Helper._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64Helper._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    },

    fromFile: file => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }),

	fromFileToBase64: file => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsBinaryString(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }),

    toFileFetch: function (base64) {
        return fetch(base64).then(res => {
            return res.blob()
        }).then(blob => {
            return new (window.wFile || window.File)([blob], "File name", { type: "image/png" })
        })
    },

    toFile: function (base64) {

        try {
            var arr = base64.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            var file = new (window.wFile || window.File)([u8arr], "Filename", { type: mime });

            return Promise.resolve(file)
        }
        catch (e) {
            return Promise.reject(e)
        }



    }



}

var fkit = {
    extensions : {
        'image/png' : 'png',
        'image/jpeg' : 'jpg',
        'image/jpg' : 'jpg',
		'image/gif' : 'gif',
        'image/webp' : 'webp',
        'image/jfif' : 'jfif'
    },
	extensionBase64 : function(base64){
		if(!base64) return ''

		return fkit.extensions[base64.split(';')[0].replace('data:', '')] || ''

	},
    getExtension: function (file) {
        var name = file.name.split('.');
        var ext = name[name.length - 1].toLowerCase();

        return ext;
    },
    getName: function (file) {
        var name = file.name.split('.');
            name.pop()

        return name.join('.');
    },
    checkExtension: function (file, extensions = []) {

        if (extensions.length) {
            if (_.indexOf(extensions, fkit.getExtension(file)) == -1) return false
        }

        return true;
    }
}

fetchLocal = function (url, name = 'file') {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest

        xhr.onload = function () {

            var type = xhr.getResponseHeader('content-type')

            name = name + fkit.extensions[type] ? ('.' + fkit.extensions[type]) : ''

            resolve({
                data: new Blob([xhr.response], { type: type, name: name })
            })

            // resolve()
        }

        xhr.onerror = function () {
            reject(new TypeError('Local request failed'))
        }

        xhr.open('GET', url)
        xhr.responseType = "arraybuffer";
        xhr.send(null)
    })
};

/* ______________________________ */

/* EXTRA */

toUrlEncoded = function(obj){

	return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

}

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

edjsHTML = function() {
    "use strict";

	var c_xss = function(text){

		var ftext = filterXSS(text, {
			stripIgnoreTag : true,
			whiteList: {
				a: ["href", "title", "target", 'cordovalink'],
				br : ["style"],
				b : ["style"],
				span : ["style"],
				figure : ["style"],
				figcaption : ["style"/*, "class"*/],
				i : ["style"],
				img : ["src"/*, "width", "height"*/],
				div : [ /*"class",*/"data-plyr-provider", "data-plyr-embed-id"],
				p : [],
				ul : [],
				ol : [],
				li : [],
				h2 : [],
				h1 : [],
				h3 : [],
				h4 : [],
				h5 : [],
				em : [],
				u : [],
				blockquote : [],
				strong : [],
				picture : ['img-type'],
				source : ['srcset', 'type'],
				strike : []
			}

		})

		return ftext
	}

    var e = {
        delimiter: function() {
            return '<div class="article_delimiter"><i class="fas fa-asterisk"></i><i class="fas fa-asterisk"></i><i class="fas fa-asterisk"></i></div>'
        },

        header: function(e) {
            var t = e.data;
            return "<h" + _.escape(t.level) + ">" + c_xss(t.text) + "</h" + _.escape(t.level) + ">"
        },

        paragraph: function(e) {

            return "<p>" + c_xss(e.data.text) + "</p>"
        },

        list: function(e) {
            var t = e.data,
                r = "unordered" === t.style ? "ul" : "ol",

                n = function(e, t) {

                    var r = e.map((function(e) {
                        if (!e.content && !e.items) return "<li>" + c_xss(e) + "</li>";
                        var r = "";
                        return e.items && (r = n(e.items, t)), e.content ? "<li> " + c_xss(e.content) + " </li>" + r : void 0
                    }));

                    return "<" + t + ">" + r.join("") + "</" + t + ">"
                };
            return '<div class="article_list">' + n(t.items, r) + '</div>'
        },

        image: function(e) {
            var t = e.data,

                r = c_xss(t.caption || "");


			var cl = []

			if(t.withBackground) cl.push('withBackground')
			if(t.withBorder) cl.push('withBorder')
			if(t.stretched) cl.push('stretched')

			var src = t.file && t.file.url ? t.file.url : t.file

			return '<div class="article_image '+ cl.join(' ') +'"><img src="' + _.escape(src) + '" alt="' + (r) + '" />' +

			(r ? ('<div class="article_image_caption">' + r + '</div>') : '')

			+ '</div>'

        },

        quote: function(e) {

            var t = e.data;

            return '<div class="article_quote"><div class="article_quote_text">' + c_xss(t.text) + '</div><div class="article_quote_author">' + c_xss(t.caption) +' </div></div>'
        },

        code: function(e) {
            return "<pre><code>" + _.escape(e.data.code) + "</code></pre>"
        },

        embed: function(e) {
            var t = e.data;


            switch (t.service) {

				case "vimeo":
                    return '<div class="js-player" data-plyr-provider="vimeo" data-plyr-embed-id="'+_.escape(t.embed)+'"></div>';

				case "youtube":
					return '<div class="js-player" data-plyr-provider="youtube" data-plyr-embed-id="'+_.escape(t.embed)+'"></div>';

				default:
					//console.log(t)
					//return '<iframe src="'+t.embed+'"></iframe>'
					return '<div class="unsupportedplayer">Only Youtube and Vimeo Embeds are supported right now.</div>';
            }
        },

		warning : function(e){

			var t = e.data;

			if (!t.title || !t.message){
				return this.error('warning', e)
			}

			return '<div class="article_warning"><div class="article_warning_icon"><i class="fas fa-exclamation-triangle"></i></div><div class="article_warning_content"><div class="article_warning_title">' + c_xss(t.title || '') + '</div><div class="article_warning_message">' + c_xss(t.message || '') + '</div></div></div>'
		},

		carousel: function(e){

			var imageshtml = _.map(e.data, function(i){
				return '<div class="img" image="' + _.escape(i.url) + '" i="' + _.escape(i.url) + '" save="' + _.escape(i.url) + '"></div>'
			}).join('')


			return '<div class="article_carousel">'+imageshtml+'</div>'
		},

		linkTool : function(e){
			var t = e.data;

			if (!t.link){
				return this.error('link', e)
			}

			var url = {}

			try{
				url = new URL(t.link)
			}
			catch(e){
				url.host = ''
			}

			if (app.thislink(t.link)){
				return '<div class="article_this_embed" href="'+_.escape(t.link)+'"></div>'
			}
			else{

				var img = ''

				if (deep(t, 'meta.image.url'))
					img = '<div class="article_link_custom_image"><div class="img" image="' + _.escape(deep(t, 'meta.image.url'))+'"></div></div>'

				return '<a href="'+t.link+'" donottrust="true"><div class="article_link_custom">'+img+'<div class="article_link_custom_content"><div class="article_link_custom_title">' + _.escape(deep(t, 'meta.title') || url.host || 'Undefined Link') + '</div><div class="article_link_custom_description">' + _.escape(deep(t, 'meta.description') || '') + '</div><div class="article_link_custom_href">' + _.escape(t.link) + '</div></div></div></a>'
			}


		},

		error : function(type, e){
			return '<div class="article_error">' + 'Error:' + _.escape(type) + '</div>'
		}
    };

	var encdec = {
		header: function(data, fu) {

			return {
				level : data.level,
				text : fu(data.text)
			}

        },

        paragraph: function(data, fu) {

			return {
				text : fu(data.text)
			}

        },

        list: function(data, fu) {

			var n = function(e){


				if(!e.content && !e.items) return fu(e)

				var nd = {...e}

				if (nd.content)
					nd.content = fu(nd.content)

				if (nd.items){
					nd.items = _.map(nd.items, function(i){
						return n(i)
					})
				}

				return nd
			}

			return n(data)

        },

		carousel: function(data, fu) {


			return _.map(data, function(i){
				var nd = {...i}

				nd.url = fu(nd.url)

				if(nd.caption) nd.caption = fu(nd.caption)

				return nd
			})

        },

        image: function(data, fu) {

			var nd = {...data}

			if (nd.caption) nd.caption = fu(nd.caption)

			if (data.file){
				nd.file = {...data.file}
				nd.file.url = fu(nd.file.url)
			}

			return nd

        },

        quote: function(data, fu) {

			return {
				caption : fu(data.caption),
				text : fu(data.text)
			}

        },

        code: function(data, fu) {
			return {
				code : fu(data.code)
			}
        },

		warning : function(data, fu) {

			return {
				title : fu(data.title),
				message : fu(data.message),
			}

		},

		linkTool : function(data, fu) {

			var nd = {...data}

			nd.link = fu(nd.link)

			if (data.meta){
				nd.meta = {...data.meta}
				nd.meta.title = fu(nd.meta.title)
				nd.meta.description = fu(nd.meta.description)

				if (data.meta.image){
					nd.meta.image = {...data.meta.image}
					nd.meta.image.url = fu(nd.meta.image.url)
				}
			}

			return nd

		},

		embed : function(data, fu) {

			var nd = {...data}

				nd.embed = fu(nd.embed)
				nd.source = fu(nd.source)

				if(nd.caption) nd.caption = fu(nd.caption)

			return nd
        },
	}

    function t(e) {
        return new Error('[31m The Parser function of type "' + _.escape(e) + '" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m')
    }

    var r = function(n, app) {

        void 0 === n && (n = {});

        var i = Object.assign({}, e, n);

        return {

			words : function(_e){

				var r = 0

				var add = function(str){

					r += (str || "").split(/\s+/).length
				}


				if (_e && _e.blocks){
					_e.blocks.map((function(e) {

						if(encdec[e.type]){
							encdec[e.type](e.data, add)
						}

					}))
				}

				return r
			},

			apply : function(_e, fu){

				if(!fu) fu = encodeURIComponent

				var e = {..._e};

				if (e.blocks){
					e.blocks = e.blocks.map((function(e) {

						return {
							type : e.type,
							id : e.id,
							data : encdec[e.type] ? encdec[e.type](e.data, fu) : _.clone(e.data)
						}

					}))
				}



				return e
			},

            parse: function(e) {
                return '<div class="article_body">' + e.blocks.map((function(e) {
                    return i[e.type] ? i[e.type](e) : t(e.type)
                })).join('') + '</div>'
            },

            parseBlock: function(e) {
                return i[e.type] ? i[e.type](e) : t(e.type)
            },

            parseStrict: function(e) {
                var n = e.blocks,
                    o = r(i).validate({
                        blocks: n
                    });
                if (o.length) throw new Error("Parser Functions missing for blocks: " + o.toString());
                for (var a = [], u = 0; u < n.length; u++) {
                    if (!i[n[u].type]) throw t(n[u].type);
                    a.push(i[n[u].type](n[u]))
                }
                return a
            },

            validate: function(e) {
                var t = e.blocks.map((function(e) {
                        return e.type
                    })).filter((function(e, t, r) {
                        return r.indexOf(e) === t
                    })),
                    r = Object.keys(i);
                return t.filter((function(e) {
                    return !r.includes(e)
                }))
            }
        }
    };
    return r
}();

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
/* */

if(typeof window != 'undefined'){


	var splashScreen = document.getElementById('splashScreen');

	if (splashScreen) {


		var splashScreenIcon = document.querySelector('#splashScreen .icon');
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
			if (!splashScreenIcon)
				return;
			// Check if we need to stop rotating and fade out
			if (stopRotation) {
				splashScreenIcon.classList.remove("rotate");
				splashScreenIcon.classList.add('zoom-out-rotate');
				splashScreen.classList.add('fade-out');
				// When zoom out animation is done, completely remove the splash screen
				setTimeout(() => {
					// Clear interval if needed
					if (splashScreeninterval != undefined){
						clearInterval(splashScreeninterval);
					}
					// Completely remove the splashscreen

					if (splashScreen)
						splashScreen.remove();
						splashScreenIcon = null

					splashScreen = null
				}, zoomOutDuration * 2);
			}
			// Wait until half the rotation is done
			/*setTimeout(() => {
				// Change the logo image
				if (splashScreenIcon)
					splashScreenIcon.style.backgroundImage = `url('${logos[nextLogoIndex]}')`;
				// Increase index
				nextLogoIndex = (nextLogoIndex >= (logos.length - 1)) ? 0 : nextLogoIndex + 1;
			}, rotatingDuration * 0.5);*/
		}

		// Wait until the zoom in is done
		setTimeout(() => {
			if (!splashScreenIcon)
				return;
			// Start rotating the logo
			splashScreenIcon.classList.remove('zoom-in');
			splashScreenIcon.classList.add('rotate');
			// Triggered every times we reached the end of the rotating animation
			rotatingAnimationEnded();
			splashScreeninterval = setInterval(rotatingAnimationEnded, rotatingDuration);
		}, zoomInDuration);

	}


}


waitPromise = function(time){
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}


errortostring = function(error){
	try{
		if(error.toString) {

			var s = error.toString()

			if (s != '[object Object]')
				return s
		}

		if(_.isObject(error)) return JSON.stringify(error)
	}

	catch(e){
		return ''
	}

}


drawRoundedImage = (url, radius,sWidth, sHeight)=>{
	return new Promise(resolve => {
		if(!url){
			resolve("");
		}
		const image = new Image();
		image.src = url
		image.onload = ()=> {
			const canvas = document.createElement('canvas');
			canvas.width = sWidth;
			canvas.height = sHeight;
			const ctx = canvas.getContext('2d');

			const x = 0;
			const y = 0;
			const width = sWidth || image.naturalWidth;
			const height = sHeight || image.naturalHeight;
			const r = {topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0};

			var imgSize = Math.min(image.naturalWidth, image.naturalHeight);
			var left = (image.width - imgSize) / 2;
			var top = (image.height - imgSize) / 2;

			if (!Array.isArray(radius)) {
				radius = [radius];
			}
			r.topLeft = radius[0];
			r.topRight = radius[1] || (radius[1] === undefined) * radius[0];
			r.bottomRight = radius[2] || (radius[2] === undefined) * radius[0];
			r.bottomLeft = radius[3] || (radius[3] === undefined) * (radius[1] || (radius[1] === undefined) * radius[0]);
			ctx.beginPath();
			ctx.arc(x + r.topLeft, y + r.topLeft, r.topLeft, Math.PI, Math.PI + Math.PI / 2);
			ctx.lineTo(x + width - r.topRight, y);
			ctx.arc(x + width - r.topRight, y + r.topRight, r.topRight, Math.PI + Math.PI / 2, Math.PI * 2);
			ctx.lineTo(x + width, y + height - r.bottomRight);
			ctx.arc(x + width - r.bottomRight, y + height - r.bottomRight, r.bottomRight, Math.PI * 2, Math.PI / 2);
			ctx.lineTo(x + r.bottomLeft, y + height);
			ctx.arc(x + r.bottomLeft, y + height - r.bottomLeft, r.bottomLeft, Math.PI / 2, Math.PI);
			ctx.closePath();
			ctx.save();
			ctx.clip();

			ctx.drawImage(image, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);

			ctx.restore();
			resolve(ctx.canvas.toDataURL('image/png', 1.0))
		}
		image.onerror= (e)=>{
			resolve("");
		}
	})
}


function getRandomFloat(min, max, decimals) {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);


	return parseFloat(str);
}

randomizer = function(ar, key){

	if(!key) key = 'probability'

    if(!ar) return null
    if(!ar.length) return null

    ar = _.sortBy(ar, (r) => {return - Number(r[key] || 0) })

    var total = _.reduce(ar, function(sum, r){
        return sum + Number(r[key] || 0)
    }, 0)

    if (total <= 0) return ar[rand(0, ar.length - 1)]

    var seed = getRandomFloat(0, total, 8)

    var counter = 0

    return _.find(ar, function(a){

        if(counter + a[key] > seed && counter <= seed){
            return true
        }

        counter = counter + a[key]

    })

}

randomizerarray = function(ar, count, key){
	var r = []

	for (var i = 0; i < count; i++){

		var v = randomizer(ar, key)

		if (v) {


			ar = _.filter(ar, function(_v){
				return !isEqual(_v, v, false)
			})

			r.push(v)
		}
	}

	return r
}

/**
 * Function code is kindly provided by
 * http://detectmobilebrowsers.com/
 */
isDeviceMobile = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

