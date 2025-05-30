/* DATE */


getWeek = function(date){
	var onejan = new Date(date.getFullYear(), 0, 1);
	return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

secInTime = function (sec) {

	var h = sec / 3600 ^ 0;
	var m = (sec - h * 3600) / 60 ^ 0;
	var s = sec - h * 3600 - m * 60;

	var result = [];

	if (h) {
		result.push(addZero(h.toFixed(0)))
	}

	result.push(addZero(m.toFixed(0)))
	result.push(addZero(s.toFixed(0)))

	return result.join(":")
}

getWeekNumber = function(d){
	// Copy date so don't modify original
	d = new Date(+d);
	d.setHours(0, 0, 0, 0);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	// Get first day of year
	var yearStart = new Date(d.getFullYear(), 0, 1);
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
	// Return array of year and week number
	return [d.getFullYear(), weekNo];
}
  
weeksInYear = function(year){
	var month = 11,
	  day = 31,
	  week;

	var result = []
	var end = moment.utc(new Date(year + 1, 0, 1)).unix();
  
	// Find week that 31 Dec is in. If is first week, reduce date until
	// get previous week.
	do {
	  var d = new Date(year, month, day--);

	  week = getWeekNumber(d)[1];

	} while (week == 1);

	for(var i = 1; i <= week; i++){

		var ds = moment.utc(year + "W" + addZero(i))
		var de = moment(ds).add(7, 'days').unix()

		if (de > end) de = end

		result.push({
			n : i,
			date : ds.unix(),
			end : de
		})
	}
  
	return result;
}

monthsInYear = function(year){

	var result = []
	var end = moment.utc(new Date(year + 1, 0, 1)).unix();

	for (var i = 0; i < 12; i++){
		var d = moment.utc(new Date(year, i, 1))
		var e = moment.utc(new Date(year, i + 1, 1))

		result.push({
			n : i + 1,
			date : d.unix(),
			end : e.unix()
		})
	}
  
	return result;
}


addZero = function (n) {
	if (Number(n) < 10) {
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

dateToStrUtc = function (d) {
	var now_utc = nowDateUtc(d);

	return dateToStr(now_utc)
}

dateToStrUtcS = function (d) {
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

utcnow = function (date) {
	var now = date || (new Date);
	var UTCseconds = (now.getTime() + now.getTimezoneOffset() * 60 * 1000);
	var d = new Date(UTCseconds);
	d.toString();

	return d
}

fromutc = function (date) {
	var now = date || (new Date);
	var UTCseconds = (now.getTime() - now.getTimezoneOffset() * 60 * 1000);
	var d = new Date(UTCseconds);
	d.toString();

	return d
}


utcStrToDate = function (str) {
	var date = strToDate(str);

	var n = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

	n = new Date(n);

	n = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());

	return n;
}



nowDateUtc = function (d) {

	var now = d || new Date();
	var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

	return now_utc;
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

		else {
			res += 'H';
		}
	}


	return res;
}



/* ______________________________ */

/* WINDOWS, MESSAGES */


successCheck = function (p) {
	if (!p) p = {};

	var self = this,
		el = p.el || $('body');

	var ch = null;


	var render = function () {

		var h = '<div class="successCheckWrapper "><div><div class="chw">\
		   <svg viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">\
			   <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#a4a4a4" fill="transparent"/>\
		   </svg>\
	   </div><div class="text">SUCCESS</div></div></div>'

		ch = $("<div>", {
			"class": "successCheck",
			"html": h
		});

		window.rifticker.add(() => {
			el.append(ch);
			ch.find('svg')[0].classList.add('animate')

			window.rifticker.add(() => {
				ch.addClass('active')
			})
		})

		setTimeout(function () {

			window.rifticker.add(() => {
				ch.removeClass('active')
			})

			setTimeout(function () {
				window.rifticker.add(() => {
					ch.remove()
				})
				
			}, 300)

		}, 900)

	}

	render();

	return self
}

/*setInterval(function(){
   successCheck()
}, 3000)*/


easeOutQuint = function (x) {
	return 1 - Math.pow(1 - x, 10);
}

wnd = function (p) {

	if (!p) p = {};

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

	var find = function (s) {
		if (wnd) return wnd.find(s);
	}

	var pippositions = ['default', 'bottom']

	self.independent = p.pip

	self.redraw = function () {

		var scrollers = [];

		if (p.scrollers) {
			scrollers = _.map(find(p.scrollers), function (el) {
				return $(el).scrollTop();
			})
		}

		find(".wndcontent").html(content);

		if (p.scrollers) {
			$.each(find(p.scrollers), function (index) {
				$(this).scrollTop(scrollers[index])
			})
		}

		if (p.success)
			p.success(wnd, self, true);
	}

	var wndfixed = function () {
		/*wnd.css('top', app.lastScrollTop)*/
	}

	var templates = {
		statebuttons: function () {
			return '<div class="changeStateButtons"><div class="hideButton changeButton roundclosebutton"><i class="fas fa-minus"></i></div><div class="closeButton changeButton roundclosebutton"><i class="fas fa-times"></i></div><div class="changeButton expandButton"><i class="fas fa-expand-arrows-alt"></i></div></div>'
		},

		pipbuttons: function () {
			return '<div class="_expand roundclosebutton"><i class="fas fa-expand"></i></div><div class="_changeplace roundclosebutton"><i class="fas fa-angle-down"></i></div>'
		},

		roundclose: function () {
			return '<div class="_close roundclosebutton tvfocusedzoom"><i class="fa fa-times" aria-hidden="true"></i></div><div class="closeline"></div>'
		}
	}

	var render = function (clbk) {

		if (!p.type) p.type = ''

		var h = '<div class="wndback" id=' + id + '></div>' + (p.pip ? templates.pipbuttons() : '') + (p.allowHide ? templates.statebuttons() : templates.roundclose()) + '<div class="wndinner ' + p.type + '">';

		if (p.leftbg)
			h += '<div class="leftbg"><div>' + p.leftbg + '</div></div>';

		if (p.header) {
			h += '<div class="wndheader">' + (app.localization.e(p.header) || p.header) + '</div>';
		}


		h += '<div class="wndcontent customscroll content">' + content + '</div>';

		if (!p.noButtons) {
			h += '<div class="buttons windowmainbuttons">';

			_.each(p.buttons, function (button, i) {

				var txt = (button.html ? button.html :
					(app ? (app.localization.e(button.text) || button.text || '') :
						(button.text || '')))

				var hb = '<div class="button ' + (button.class || "") + '" bi="' + i + '">' + txt + '</div>'

				h += hb

			})

			h += '</div>';
		}

		wnd = $("<div>", {
			"class": "wnd",
			"html": h
		});

		if (!p.header) wnd.addClass('noheader')

		if (p.pip) {
			wnd.addClass('pipmini')
			wnd.attr('position', localStorage['pipposition'] || 'default')
		}

		var hiddenState = el.find('.hiddenState')

		if (!nooverflow) {
			app.actions.offScroll(wnd);
		}

		window.rifticker.add(() => {

			if (hiddenState.length) {
				hiddenState.before(wnd)
			}
			else {
				el.append(wnd);
			}


			wnd.find("._close").on('click', function () {
				actions["close"](true);
			});

			wnd.find("._expand").on('click', function () {
				actions["expand"](true);
			});

			wnd.find("._changeplace").on('click', function () {

				var cur = localStorage['pipposition'] || 'default'

				cur = nextElCircle(pippositions, cur)

				localStorage['pipposition'] = cur

				wnd.attr('position', cur)

			});

			if (!p.noButtons) {
				_.each(p.buttons, function (button, i) {
					var _el = wnd.find('.wndinner>div.buttons .button[bi="' + i + '"]')

					var fn = button.fn || actions[button.action] || actions["close"];

					_el.on('click', function () { fn(wnd, self) });
				})
			}

			//app.actions.playingvideo(null);

			if (p.class) wnd.addClass(p.class);

			wnd.css("display", "block");
			wnd.addClass('asette')

			if (p.showbetter) wnd.addClass('showbetter')


			setTimeout(function () {
				window.rifticker.add(() => {
					wnd.addClass('sette')
				})

				
			}, 20)

			setTimeout(function () {
				window.rifticker.add(() => {
					if (wnd)
						wnd.removeClass('asette')
				})


				if (wnd && (wnd.hasClass('normalizedmobile'))) {


					setTimeout(function () {

		
						if (clbk && !p.fastClbk) clbk()


						setTimeout(function () {
							window.rifticker.add(() => {


								if (wnd)
									wnd.find('.wndcontent>div').css('opacity', 1)
							})
						}, 100)
						

					

					}, 30)

				}

			}, 220)

			if (wnd.hasClass('normalizedmobile') && !p.fastClbk) {

			}
			else {
				if (clbk) clbk()
			}

		})


	}

	var resize = function () {

	}

	////TODO

	var wndcontentscrollmobile = function (e) {

		var cc = cnt.scrollTop()

		if (cc > showmoremobilevalue && !showmoremobile) {
			wnd.addClass('showbetter')
			showmoremobile = true
		}

		if (cc < showmoremobilevalue && showmoremobile) {
			showmoremobile = false
			wnd.removeClass('showbetter')
		}

	}

	var destroySwipable = function () {
		if (parallax) {
			parallax.clear()
			parallax.destroy()
			parallax = null
		}
	}

	var initSwipable = function () {


		if (isTablet() && !parallax && penable) {

			var trueshold = 20

			var down = {
				cancellable: true,

				positionclbk: function (px, e) {
					var percent = Math.abs(px) / trueshold;
				},

				constraints: function (e) {

					var i = false

					var sel = _.find(e.path, function (p) {

						if (p.id == 'windowsContainer') {
							i = true
						}

						if (i) return null

						return p.classList.contains('customscroll');
					})

					if (!sel) {
						return true;
					}

					if (sel.scrollTop == 0) {

						if (isios())
							sel.scrollTop = 1

						return true
					}
				},

				restrict: true,
				trueshold: trueshold,
				distance: 100,
				clbk: function () {
					actions.close(true)
				}

			}

			var directions = {}

			if (p.reversePrlx) {
				directions.up = down
			}
			else {
				directions.down = down
			}


			parallax = new SwipeParallaxNew({

				el: wnd.find(p.parallaxselector || '.wndinner'),
				transformel: wnd.find('.wndinner'),
				allowPageScroll: 'auto',
				directions: directions


			}).init()
		}

	}

	var scrolling = function () {
		if (cntj) {
			if (!cntj.scrollTop || (isios() && cntj.scrollTop <= 1)) {
				initSwipable()
			}
			else {
				destroySwipable()
			}
		}
	}

	var initevents = function () {

		if (!p.noCloseBack)
			wnd.find('.wndback').one('click', function () {

				if (p.allowHide && self.minimizeOnBgClick) {
					actions.hide()
				}
				else {
					actions.close(true)
				}

			});

		if (p.allowHide) {
			wnd.find('.hideButton').on('click', actions.hide);
			wnd.find('.closeButton').on('click', actions.close);
			wnd.find('.expandButton').on('click', actions.show);
		}



		if (isTablet() && (wnd.hasClass('normalizedmobile'))) {

			cnt = wnd.find('.wndcontent')

			if (!wnd.hasClass('fromtop')) {
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

	var clearmem = function () {
		wnd = null;
		cnt = null
		cntj = null

		self.el = null
		self.close = null

		_.each(p.buttons, function (button) {
			delete button.el
		})

		el = null
		app = null

		self.essenseDestroy = null

		p = {}
	}

	var closing = false

	var actions = {

		expand: function () {

			var expand = p.expand

			actions.close()

			setTimeout(function () {

				if (expand) {
					expand()
				}

			}, 200)

		},

		close: function (cl, key) {

			if (closing) return

			closing = true



			if (cl) {
				if (p.closecross) p.closecross(wnd, self);
			}

			if (p.close) p.close(wnd, self);

			delete app.events.resize[id]
			delete app.events.scroll[id]

			window.rifticker.add(() => {
				destroySwipable()

				wnd.addClass('asette')
				wnd.removeClass('sette')

				
			})

			if (!nooverflow)
				app.actions.onScroll();


			var cl = function () {

				if (self.essenseDestroy) self.essenseDestroy(key)

				window.rifticker.add(() => {

					wnd.remove();

					clearmem();
				})

			}

			if (!isMobile() || !wnd.hasClass('normalizedmobile')) {
				cl()
			}
			else {
				setTimeout(cl, 220)
			}

			if (p.onclose) p.onclose()

		},

		hide: function (cl, key) {

			if (!wnd) return

			wnd.find('.buttons').addClass('hidden');
			wnd.addClass('hiddenState');

			wnd.find('.wndcontent > div').addClass('rolledUp');

			if (!nooverflow) {
				app.actions.onScroll();
			}
		},

		show: function (cl, key) {

			if (!wnd) return

			wnd.find('.buttons').removeClass('hidden');
			wnd.removeClass('hiddenState');
			wnd.find('.wndcontent > div').removeClass('rolledUp');


			if (!nooverflow) {
				app.actions.offScroll(wnd);
			}
		},
	}

	self.unhidenormalized = function () {

		if (app.mobileview && wnd && (wnd.hasClass('normalizedmobile'))) {
			wnd.find('.wndcontent>div').css('opacity', 1)
		}
	}

	self.buttonState = function (index, state) {

		var _class = 'disabled';

		if (typeof state == 'function') state = state();

		if (state) {
			p.buttons[index].el.removeClass(_class)
		}
		else {
			p.buttons[index].el.addClass(_class)
		}


	}

	var init = function () {

		if (p.preloader) preloader(true);

		if (!p.buttons) p.buttons = {};

		if (!p.buttons.close && !p.noCloseButton)

			p.buttons.close = {
				action: close,
				html: app ? app.localization.e('close') : 'Close',
				class: "close"
			};


		var success = function () {

			if (p.preloader) preloader(false);

			render(function () {
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

		if (content) success();

	}

	init();

	self.find = find;
	self.close = actions.close;
	self.el = wnd;
	self.hide = actions.hide;
	self.show = actions.show;


	return self;
}

tooltipMobileDialog = function (p) {
	if (!p) p = {};

	p.wrap = true;

	p.class = 'tooltipMobileDialog';

	p.html = '<div class="mobiledialogcontent">' + (p.html || '') + '</div><div class="closeButton"><button class="button ghost"><i class="far fa-times-circle"></i> ' + app.localization.e('close') + '</button></div>'

	var c = p.clbk || function () { }

	var statusbg = ''

	p.clbk = function (el) {

		el.find('.closeButton').on('click', function () {
			self.destroy()
		})

		setTimeout(function () {
			el.addClass('animend')
		}, 20)

		if (p.app){

			statusbg = p.app.mobile.statusbar.status

			p.app.mobile.statusbar.gallerybackground()
		}

		c(el)
	}

	p.onDestroy = function(){
		if (p.app && statusbg && p.app.mobile.statusbar[statusbg]){
			p.app.mobile.statusbar[statusbg]()
		}
	}

	

	var self = new dialog(p);

	return self;
}

menuDialog = function (p) {
	if (!p) p = {};

	p.wrap = true;

	p.class = 'menudialog';

	/*p.items.push({
		class : 'itemclose',
		text : '<i class="fas fa-times-circle"></i>'
	})*/

	var ehtml = function () {
		var h = ''

		h += '<div class="mobiledialogcontent customscroll">'

		_.each(p.items, function (item, i) {
			h += '<div class="item ' + (item.class || "") + '" item="' + i + '">'
			h += item.text
			h += '</div>'
		})

		h += '</div>'


		h += '<div class="closeButton">'
		h += '<div class="item itemclose">'
		h += '<i class="far fa-times-circle"></i> ' + app.localization.e('close') + ''
		h += '</div>'
		h += '</div>'



		return h;
	}

	p.html = ehtml()

	p.clbk = function (el) {
		el.find('.item').on('click', function () {

			var i = $(this).attr('item')

			if (!i || !p.items[i].action) {
				self.destroy()
			}
			else {
				p.items[i].action(function () {
					self.destroy()
				})
			}



			return false

		})

		el.on('click', function () {
			self.destroy()
		})
	}

	var self = new dialog(p);

	return self;
}

inputDialogNew = function (p) {
	if (!p) p = {};

	p.alert || (p.alert = "Please enter values");
	p.class = (p.class || "") + " input";
	p.wrap = true;

	var validation;

	var moneyparam = p.mmoneyparam;
	var percentparam = p.percentparam;

	var mask = function (value, _value) {
		if (value.dollars) {
			moneyparam.value = _value.toString();
			_value = maskValue(moneyparam);
		}

		if (value.percent) {
			percentparam.value = _value.toString();
			_value = maskValue(percentparam);
		}

		if (value.convertIn) {
			_value = value.convertIn(_value);
		}

		return _value;
	}

	p.html = '<div class="caption">' + p.caption + '</div>';
	p.html += '<div class="values">';
	_.each(p.values, function (value, index) {

		if (value.time) {
			p.html += "<div class='timeselector' index='" + index + "'>"
			p.html += "</div>"

			return
		}

		var _class = '';
		var classValue = ''

		if (value.dollars) _class = "dollars";
		if (value.percent) _class = "percent";

		if (value.slider) classValue = 'hasslider'

		p.html += '<div class="value ' + classValue + '">';

		if (!value.checkbox) {

			p.html += '<div class="label">';
			p.html += value.label;
			p.html += '</div>';
		}

		p.html += '<div class="v">';

		if (value.checkbox) {

			p.html += '<input class="checkbox" type="checkbox" index="' + index + '" id="value' + index + '" ';

			if (value.defValue == true) {
				p.html += 'checked';
			}

			p.html += '><label for="value' + index + '">' + value.label + '</label>';


		}
		else

			if (value.text) {
				p.html += '<textarea elementsid="textarea_' + index + '" placeholder="' + (value.placeholder || value.label || '') + '" class="' + _class + '" index="' + index + '">' + (value.defValue || '') + '</textarea>';

			}

			else

				if (value.upload) {
					p.html += '<div class="upload" index="' + index + '">'
					p.html += value.placeholder
					p.html += '<div class="uploaded"></div>'
					p.html += '</div>'
				}

				else

					if (value.select) {
						p.html += '<select index="' + index + '">';

						_.each(value.select.values, function (v) {

							var selected = '';

							if (v.v == value.select.default) selected = 'selected';

							p.html += '<option  value="' + v.v + '" ' + selected + '>';
							p.html += v.l;
							p.html += '</option>';

						})

						p.html += '</select>';
					}
					else {
						if (value.defValue && value.defValue.toFixed)
							value.defValue = value.defValue.toFixed(p.precision || 0)

						p.html += '<input placeholder="' + (value.placeholder || value.label || '') + '" class="' + _class + '" index="' + index + '" data-validate="' + (value.validate || 'name') + '" type="' + (value.type || 'text') + '" value="' + (value.defValue || '') + '" ' + (value.allowNull ? 'allow-null="true"' : '') + '></input>';
					}

		p.html += '</div>';

		if (value.slider) {
			p.html += "<div class='sliderWrapper' index='" + index + "'>";

			p.html += "<div class='sliderTableWrapper'>"

			p.html += "<div class='min'>" + mask(value, value.slider.min) + "</div>";

			p.html += "<div class='sliderc'>"
			p.html += "<div class='slider'></div>"
			p.html += "</div>"

			p.html += "<div class='max'>" + mask(value, value.slider.max) + "</div>";
			p.html += "</div>"

			p.html += "</div>"

		}



		p.html += '</div>';
	})

	p.html += '</div>';

	if (p.additional) {
		p.html += p.additional;
	}

	p.html += '<div class="alert" style="display:none">' + p.alert + '</div>';

	var success = p.success;
	var clbk = p.clbk;
	var uploaded = {}


	p.clbk = function (wnd) {
		validation = new Validation({
			form: wnd,
			success: function () {

			}
		});

		if (moneyparam)
			wnd.find('.dollars').maskMoney(moneyparam);
		if (percentparam)
			wnd.find('.percent').maskMoney(percentparam);


		_.each(p.values, function (value, index) {

			if (value.slider) {
				var input = wnd.find('input[index="' + index + '"]');
				var slider = wnd.find('.sliderWrapper[index="' + index + '"] .slider');

				var sliderp = {
					slide: function (e, ui) {
						var _value = ui.value;

						var precision = p.precision || 0;

						if (value.dollars) precision = moneyparam.precision || 0;
						if (value.percent) precision = moneyparam.precision || 0;

						_value = _value.toFixed(precision);

						input.val(mask(value, _value));
					},
					value: value.defValue
				}

				if (_.isObject(value.slider)) {
					sliderp = _.extend(sliderp, value.slider)
				}

				slider.slider(sliderp);

				input.on('change', function () {

					var v = $(this).val();

					if (value.dollars) v = input.maskMoney('unmasked', moneyparam)[0].value;
					if (value.percent) v = input.maskMoney('unmasked', percentparam)[0].value;

					if (v > value.slider.max) v = value.slider.max
					if (v < value.slider.min) v = value.slider.min


					slider.slider('value', v);

					$(this).val(mask(value, v))


				})
			}

			if (value.text) {

				var txt = wnd.find('textarea[index="' + index + '"]');

				txt.on('keyup', function () {

					if (this.scrollTop > 0) {
						this.style.height = (this.scrollHeight + 10) + "px";
					}

				});

			}

			if (value.upload) {
				var input = wnd.find('.upload[index="' + index + '"]');

				initUpload({
					el: input,

					ext: value.upload.ext || ['png', 'jpeg', 'jpg'],

					dropZone: input,

					multiple: false,

					action: function (file, clbk) {

						uploaded[index] = file

						input.find('.uploaded').html(file.file.name + ' <i class="fas fa-check-circle"></i>')

						if (value.onchange) {
							value.onchange(file, self)
						}
					}
				})
			}

			if (value.time) {
				var input = wnd.find('.timeselector[index="' + index + '"]');

				input.timingfield({
					daysText: 'Days',
					hoursText: 'Hours',
					minutesText: 'Minutes',
					secondsText: 'Seconds',

					defaults: value.default
				})
			}

			if (value.checkbox) {
				var input = wnd.find('input[index="' + index + '"]');

				if (value.onchange) {

					input.on('change', function () {
						var v = $(this).is(":checked");

						value.onchange(v, self)
					})

				}
			}
		})

		if (clbk) clbk();
	}

	p.success = function (wnd) {

		if (!validation.validation({
			manual: true
		})) return false;

		var _values = {},
			arr = true;


		_.each(p.values, function (value, index) {

			if (value.time) {
				var input = wnd.el.find('.timeselector[index="' + index + '"]');

				var v = input.find('.timingfield').val()

				var v = {
					d: Number(input.find('.timingfield_days input').val() || '0'),
					h: Number(input.find('.timingfield_hours input').val() || '0'),
					m: Number(input.find('.timingfield_minutes input').val() || '0'),
					s: Number(input.find('.timingfield_seconds input').val() || '0')
				};
			}
			else
				if (value.upload) {
					var v = uploaded[index]
					var id = index
				}
				else {

					var i = wnd.el.find(".values [index='" + index + "']");

					var v = i.val();

					if (value.checkbox) {
						v = i.is(":checked");
					}

					if (value.dollars) v = i.maskMoney('unmasked', moneyparam)[0].value;
					if (value.percent) v = i.maskMoney('unmasked', percentparam)[0].value;

					var id = value.id || index;

					if (value.id) arr = false;
				}

			_values[id] = v;
		})

		if (arr) _values = _.toArray(_values);

		var r = success(_values);

		if (typeof r != 'undefined') return r

		return true
	}

	var self = new dialog(p);

	return self;
}

dialog = function (p) {

	var self = this,
		ids,
		$el,
		removescroll = p.removescroll && p.app;

	var destroyed = false;

	self.nomoreask = false;

	if(p.nomoreask) self.nomoreask = true

	if ($('html').hasClass('nooverflow')) removescroll = false;

	if (!p.success) p.success = false;
	if (!p.fail) p.fail = false;
	if (!p.close) p.close = false;
	if (!p.destroy) p.destroy = false;


	if (!p.btn1text) p.btn1text = app.localization.e('daccept');
	if (!p.btn2text) p.btn2text = app.localization.e('dcancel');

	if (p.id) {
		if (typeof localStorage == 'undefined') return;

		p.btn2text || (p.btn2text = "Don't Show Anymore");

		ids = JSON.parse(localStorage["qu_rx"] || "{}");

		if (ids[p.id]) {

			if (p.alltrue) p.success();

			return;
		}
	}

	var init = function () {


		var html = '<div class="wrapper table"><div class="secondwrapper"><div class="thwrapper">';

		if (p.header) {
			html += '<div class="header"><div class="text">' + p.header + '</div></div>';
		}

		if (p.poll) {

			var poll = '<div class="poll">';

			poll += '<div class="question description">Question</div>'

			poll += '<div class="title"><input elementsid="input_poll_title" class="input" type="text"><i class="fas fa-times-circle"></i></div>'

			poll += '<div class="options description">Poll options</div>';

			for (var i = 0; i < 5; i++) {
				poll += `<div class="poll-item" id="poll-item-${i + 1}"><input elements="poll-input-item-${i + 1}" class="input" type="text"><i class="fas fa-times-circle"></i></div>`;
			}

			poll += "</div>";

			html += poll;

		}

		if (p.html) {
			html += '<div class="body"><div class="text">' + (p.html || "") + '</div></div>';
		}

		if (p.nomoreask){
			html += '<div class="nomoreaskWrapper"><i class="fas '+ (self.nomoreask ? 'fa-check-circle' : 'fa-circle') + '"></i> ' +p.nomoreask+ '</div>';

		}

		html += '<div class="buttons">\
					   <div class="btn2wr"><button elementsid="dialog_btn2" class="btn2 medium">'+ p.btn2text + '</button></div>\
					   <div class="btn1wr"><button elementsid="dialog_btn1" class="btn1 medium">'+ p.btn1text + '</button></div>\
				   </div><div elementsid="dialog_close" class="_close"><i class="fa fa-times" aria-hidden="true"></i></div>\
				   </div>\
				   </div></div>'

		$el = $("<div/>", { "class": "dialog " + (p.class || "") });

		$el.html(html);

		$('body').append($el);
		if (p.class) $el.addClass(p.class);

		$el.find

		$el.find('.btn1').on('click', function () { response(p.success) });
		$el.find('.btn2').on('click', function () { response(p.fail, true) });
		$el.find('._close').on('click', function () { response(p.close, true) });
		$el.find('.nomoreaskWrapper').on('click', function(){
			self.nomoreask = !self.nomoreask
			var icon = $(this).find('i')

			icon.removeClass('fa-check-circle')
			icon.removeClass('fa-circle')

			if(self.nomoreask){
				icon.addClass('fa-check-circle')
			}
			else{
				icon.addClass('fa-circle')
			}
			
		})

		setTimeout(() => initOutsideClickEvent(), 500);

		var title = $el.find('.poll .title');

		title.find('i').on('click', function () {

			title.find('.input').val('');
		})

		for (var i = 0; i < 5; i++) {

			let item = $el.find(`#poll-item-${i + 1}`);

			item.find('i').on('click', function () {


				item.find('.input').val('');
			})

		}

		if (p.clbk) p.clbk($el, self);

		if (removescroll) {
			app.actions.offScroll();
		}

		if (p.render) {
			p.render($el);
		}

		$el.fadeIn(200);

		bgImages($el)


	}
	var response = function (func, remId) {
		if (typeof func === 'function') {
			if (func(self) && p.wrap) destroy();
		}
		else {
			destroy();
		}

		if (remId && p.id) {
			ids[p.id] = true;

			localStorage["qu_rx"] = JSON.stringify(ids);
		}

		if (!p.wrap) destroy();

	}
	var destroy = function () {

		if (destroyed) return;

		if (typeof p.destroy === 'function')
			p.destroy(self);

		destroyed = true;

		$el.remove();

		if (removescroll) {
			app.actions.onScroll();
		}

		if(p.onDestroy) p.onDestroy()
	}

	var initOutsideClickEvent = function (e) {
		let isOutside = false;

		$el.on('mousedown', e => {
			isOutside = e.target.classList.contains('secondwrapper');
		});

		$el.on('mouseup', e => {
			if (isOutside) {
				destroy();
			}

			isOutside = false;
		});
	}

	init();

	self.el = $el;
	self.destroy = destroy;
	self.replacehtml = function(html){
		$el.find('.body .text').html(html)
	}
	return self;
}

tooltip = function (p) {
	if (!p) p = {};

	var self = this;

	var content = p.content || "";
	var el = p.el;
	var event = p.event || 'click';
	var options = p.options || {};

	var render = function () {

		if (el.hasClass('tooltipstered')) return;

		options.debug = false;
		options.contentAsHTML = true;
		options.interactive = true;
		options.interactiveTolerance = 400;
		options.onlyOne = true;

		options.delay = 100;

		if (event != 'mouseenter') {

			options.trigger || (options.trigger = event);
		}
		else {
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

			self.el = function () {
				return _el
			}

			if (event != 'click') {
				_or.on('click', function () {
					instance.close()
				})
			}


			if (p.clbk) {
				p.clbk({
					el: _el
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

	var initEvents = function () {

		render();

	}

	var init = function () {

		if (p.render)

			render();

		initEvents();
	}

	self.close = function () {
		if (self.instance)
			self.instance.close();
	}

	init();

	return self;
}

sitemessage = function (message, func, delay = 5000, p = {}) {

	
	var m = "<div>" + clearStringXss(message) + "</div>"

	if (p.action) {
		m += '<div class="action"><button class="black">' + p.action.text + '</button></div>'
	}

	var messageel = $("<div/>", {
		"class": "sitemessage remove_now removing " + (p.class || ""),
		html: m

	})

	var destroyed = false

	var destroy = function () {
		if (destroyed) return
		messageel.addClass('removing')

		destroyed = true

		if (typeof func === 'function') func();

		setTimeout(function () {

			messageel.remove();

			messageel = null

		}, 300)
	}

	if (!p) p = {}

	messageel.appendTo("body")


	if (p.action) {
		messageel.find('button').on('click', function () {
			p.action.do()
			destroy()
		})
	}

	setTimeout(function () {
		messageel.removeClass('removing')
	})

	if (delay != 'inf')

		setTimeout(function () {
			destroy()
		}, delay)


	return destroy
}
/* ______________________________ */

/* IMAGES */
bgImagesClear = function (el) {
	el.css({
		'background-image': '',
		'background-size': 'cover',
		'background-position': 'center center',
		'background-repeat': 'no-repeat'
	});
}

bgImages = function (el, p) {

	if (!p) p = {};

	var els = el.find('[image]')

	if (!els.length) {

		if (typeof p.clbk === 'function') p.clbk();

		return
	}

	try {

		els.imagesLoadedPN({ imageAttr: true }, function (image) {
			if (typeof p.clbk === 'function') p.clbk(image);
		});

	}

	catch (e) {

		console.error(e)

	}


}

var imagesLoadedCache = {}
var imagesLoadingCache = {}

bgImagesClApply = function (el, src) {
	el.setAttribute('image', '*')
	el.setAttribute('imageloaded', 'true')
	el.style['background-image'] = 'url(' + src + ')';
	el.style['background-size'] = 'cover';
	el.style['background-position'] = 'center center';
	el.style['background-repeat'] = 'no-repeat';
}

bgImagesClApplyTemplate = function (src) {

	src = clearStringXss(src || "");
	src = replaceArchiveInImage(src);

	if (src.includes('www.youtube.com')) {
		const videoId = src.match(/\/(shorts|embed)\/(.*|)\?/)[2];

		src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
	}

	if (src && imagesLoadedCache[src]) {
		return 'image="*" imageloaded="true" style="background-image:url(' + imagesLoadedCache[src] + ');background-size:cover;background-position:center center;background-repeat:no-repeat"'
	}
	else {
		return 'image="' + (src || "*") + '"'
	}
}

bgImagesCl = function (el, p) {

	if (!p) p = {};

	var els = el.find('[image]')

	if (!els.length) {

		if (typeof p.clbk === 'function') p.clbk();

		return
	}

	return Promise.all(els.map((i, el) => {

		return new Promise((resolve) => {

			var src = el.getAttribute('image')

			if (!src || src == '*') {
				window.rifticker.add(() => {
					el.setAttribute('imageloaded', 'true')
				})
				return Promise.resolve()
			}

			el.setAttribute('data-image', src)

			var image = new Image()
			var disablegifplay = false

			

			src = replaceArchiveInImage(src)

			if (src.includes('www.youtube.com')) {
				const videoId = src.match(/\/(shorts|embed)\/(.*|)\?/)[2];

				src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
			}

			if (src.indexOf('.gif') > -1 && typeof app != 'undefined' && app.disablegif){
				disablegifplay = app.disablegif()
			}

			var rclbk = function(){
				if(!imagesLoadedCache[src] || imagesLoadedCache[src] == '*'){
					window.rifticker.add(() => {
						el.setAttribute('image', '*')
					})
				}
				else{
					window.rifticker.add(() => {

						bgImagesClApply(el, imagesLoadedCache[src])

					})
				}

				resolve()
			}

			var dclbk = function(tsrc){

				return new Promise((resolve, reject) => {
					
					image.src = tsrc

					image.onerror = (e) => {
						console.error(tsrc, e)

						imagesLoadedCache[src] = '*'
	
						/*window.rifticker.add(() => {
							el.setAttribute('image', '*')
						})*/
	
						resolve(false)
					}
	
					image.onload = () => {
	
						imagesLoadedCache[src] = tsrc
	
						/*window.rifticker.add(() => {
	
							bgImagesClApply(el, tsrc)
	
						})*/
	
						resolve(true)
					}
				})
			
				
			}

			if (imagesLoadedCache[src]) {

				window.rifticker.add(() => {
					bgImagesClApply(el, imagesLoadedCache[src])
				})

				resolve()
			}
			else {

				if (imagesLoadingCache[src]){
					return imagesLoadingCache[src].then((r) => {
						rclbk()
					})
				}
				
				imagesLoadingCache[src] = new Promise((resolve) => {

					
					if(disablegifplay){

						return convertimages([src]).then((imgs) => {
							return dclbk(imgs[0]).then(() => {
								rclbk()
								resolve()
							})
						})
	
					}
					else{
						return dclbk(src).then(() => {
							rclbk()
							resolve()
						})
					}
				}).then(() => {
					delete imagesLoadingCache[src]

					return Promise.resolve()
				})
				

			}

			

		})

	})).then(() => {
		if (typeof p.clbk === 'function') p.clbk(image);
	})

}

carousel = function (el, _items, _container) {

	var self = this

	var items = el.find(_items)
	var container = el.find(_container)

	var markershtml = ''
	var markers = null
	var currentscroll = 0
	var currentitem = 0

	window.rifticker.add(() => {
		if (!container.hasClass('carousel')) container.addClass('carousel')

		for (var i = 0; i < items.length; i++) {
			markershtml += '<div index="' + i + '" class="' + (!i ? 'active' : '') + '"><div></div></div>'
		}

		el.append('<div class="carousel_markers">' + markershtml + '</div>')

		items.addClass('carousel_item')

		markers = el.find('.carousel_markers >div')

		markers.on('click', function () {
			gotoslide(this.getAttribute('index'))
		})

	})

	var findactive = function () {

		var activeindex = -1


		_.find(items, (item, index) => {


			if (Math.abs(currentscroll - item.offsetLeft) < 1) {
				activeindex = index

				return true
			}
		})

		return activeindex

	}

	var setactive = function (index) {

		if (index == currentitem) return

		currentitem = index

		if (markers) {
			markers.removeClass('active')
			markers[index].classList.add('active')
		}
	}

	var gotoslide = function (index) {
		window.rifticker.add(() => {

			container[0].scrollLeft = items[index].offsetLeft

		})

		//container.scrollTo(items[index].offsetLeft)

	}

	var scrollevent = _.throttle((el) => {

		currentscroll = el.scrollLeft

		window.rifticker.add(() => {
			var activeindex = findactive()

			if (activeindex > -1) {
				setactive(activeindex)
			}
		})

	}, 50)

	container.on('scroll', () => {
		scrollevent(container[0])
	})


	self.destroy = function () {
		container.off('scroll')
		markers.off('click')
		el = null
		container = null
		items = null
		markers = null
	}

	return self
}



nameFromScr = function (src) {
	var srcs = src.split('/')

	return srcs[srcs.length - 1]
}

srcToData = function (url, callback) {

	if (url.indexOf('data:') > -1) {
		callback(url);

		return
	}

	var xhr = new XMLHttpRequest();

	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};

	xhr.onerror = function () {
	}

	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}

resizeFit = function (srcData, width, height, clbk, format, quality) {
	var imageObj = new Image(),
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext('2d'),
		xStart = 0,
		yStart = 0,
		aspectRadio,
		newWidth,
		newHeight;

	imageObj.crossOrigin = "Anonymous"
	imageObj.src = srcData;

	format || (format = 'jpeg');


	imageObj.onload = function () {

		aspectRadio = imageObj.height / imageObj.width;
		newHeight = imageObj.height;
		newWidth = imageObj.width;

		if (newHeight <= height && newWidth <= width && !quality) {
			clbk(srcData);
			return
		}
		else {
			if (newWidth > width) {
				newWidth = width;
				newHeight = width * aspectRadio;
			}

			if (newHeight > height) {
				newHeight = height;
				newWidth = newHeight / aspectRadio
			}

			var c = Math.max(((height - newHeight) / newHeight), ((width - newWidth) / newWidth))

			if (c > 0) {
				newHeight = newHeight * (c + 1)
				newWidth = newWidth * (c + 1)
			}

		}

		canvas.width = newWidth;
		canvas.height = newHeight;


		ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);

		console.log("QU image", width, height, imageObj.width, imageObj.height, newWidth, newHeight)

		var url = canvas.toDataURL("image/" + format, quality || 0.85);

		$(canvas).remove();

		clbk(url);

	}


}

resize = function (srcData, width, height, clbk, format, quality) {
	/**/

	var imageObj = new Image(),
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext('2d'),
		xStart = 0,
		yStart = 0,
		aspectRadio,
		newWidth,
		newHeight;

	imageObj.crossOrigin = "Anonymous"
	imageObj.src = srcData;

	format || (format = 'jpeg');

	imageObj.onload = function () {

		aspectRadio = imageObj.height / imageObj.width;
		newHeight = imageObj.height;
		newWidth = imageObj.width;

		if (newHeight <= height && newWidth <= width && !quality) {
			clbk(srcData);
			return
		}
		else {
			if (newWidth > width) {
				newWidth = width;
				newHeight = width * aspectRadio;
			}

			if (newHeight > height) {
				newHeight = height;
				newWidth = newHeight / aspectRadio
			}

		}

		canvas.width = newWidth;
		canvas.height = newHeight;


		ctx.drawImage(imageObj, 0, 0, newWidth, newHeight);
		
		console.log("QU image f", width, height, imageObj.width, imageObj.height, newWidth, newHeight)


		var url = canvas.toDataURL("image/" + format, quality || 0.85);

		$(canvas).remove();

		clbk(url);

	}


}

resizePromise = function(srcData, width, height, format) {
	return new Promise((resolve) => {
		resize(srcData, width, height, resolve, format)
	})
}

imagetojpegifneed = function ({ base64, name }) {

	var _name = ''
	var _format = ''

	if(name){
		var nm = name.split('.')

		_name = nm[0]
		_format = nm[1]
	
		if (_format == 'png' || _format == 'jpg' || _format == 'jpeg') {
			return Promise.resolve({ base64, name });
		}
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

			return resolve({ base64: url, name: (_name || makeid()) + '.jpg' });
		};

	});
}

convertimages = function(images){
	return Promise.all(_.map(images, (src) => {

		return new Promise((resolve, reject) => {
			srcToData(src, function (base64) {
				imagetojpegifneed({ base64 }).then(({ base64, name }) => {
					resolve(base64)
				})
			})
		})

		
	}))
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


dataURLtoFile = function (dataurl, filename) {

	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new (window.wFile || window.File)([u8arr], filename, { type: mime });
}

toDataURL = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
});


grayscaleImage = function (srcData, clbk) {

	var image = new Image()

	image.src = srcData;

	image.onload = function () {

		var myCanvas = document.createElement("canvas");
		var myCanvasContext = myCanvas.getContext("2d");

		var imgWidth = image.width;
		var imgHeight = image.height;

		myCanvas.width = imgWidth;
		myCanvas.height = imgHeight;

		myCanvasContext.drawImage(image, 0, 0);

		var imageData = myCanvasContext.getImageData(0, 0, imgWidth, imgHeight);

		var j = 0, i = 0;

		// This loop gets every pixels on the image and
		for (i = 0; i < imageData.height; i++) {
			for (j = 0; j < imageData.width; j++) {
				var index = (i * 4) * imageData.width + (j * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var average = (3 * red + green + blue) / 3;

				imageData.data[index] = average;
				imageData.data[index + 1] = average;
				imageData.data[index + 2] = average;
				imageData.data[index + 3] = alpha;
			}
		}

		myCanvasContext.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);

		if (clbk) {
			clbk(myCanvas.toDataURL())
		}

	}
}

/* ______________________________ */

/* COLOR */


/* ______________________________ */

/* FILTERS */

/* ______________________________ */

/* ARRAYS */

indexArray = function (length) {

	length || (length = 0)

	var a = [];

	for (var i = 0; i < length; i++) {
		a.push(i)
	}

	return a

}

b64_to_utf8 = function (str) {

	///??? TEST

	return decodeURIComponent(window.atob(str));
}

convertStringToArrayBuffer = function (base64) {
	var binary_string = atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array(len);
	for (var i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}
convertArrayBufferToString = function (arrayBuffer) {
	var byteArray = new Uint8Array(arrayBuffer)
	var byteString = '';
	for (var i = 0; i < byteArray.byteLength; i++) {
		byteString += String.fromCharCode(byteArray[i]);
	}
	return btoa(byteString);
}





apply = function (value, _function) {

	if (_.isArray(value)) {

		_.each(value, function (_v, i) {

			apply(value[i], _function)

		})

	}

	else {
		_function(value)
	}
}
/*
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
}*/

findIndex = function (array, f) {
	var index = -1;

	var _f = function (el) {

		index++;

		if (f(el)) return true;
	}

	var _el = _.find(array, _f);

	if (!_el) index = -1;

	return index;
}


replaceEqual = function (arr, el, wi) {
	var _index = -1;
	var _el = _.find(arr, function (__el, index) {
		if (isEqual(__el, el, false)) {
			_index = index;
			return __el;
		}
	})

	if (_index > -1) {
		arr.splice(_index, 1, wi);
		return _el;
	}

	return false;
}

removeEqualRIObj = function (arr, el) {
	var _index = -1;
	var _el = _.find(arr, function (__el, index) {
		if (isEqual(__el, el, false)) {
			_index = index;
			return __el;
		}
	})

	if (_index > -1) {
		arr.splice(_index, 1);
		return {

			el: _el,
			index: _index

		};
	}

	return null;
}

removeEqual = function (arr, el) {
	var _index = -1;
	var _el = _.find(arr, function (__el, index) {
		if (isEqual(__el, el, false)) {
			_index = index;
			return __el;
		}
	})

	if (_index > -1) {
		arr.splice(_index, 1);
		return _el;
	}

	return false;
}


lazyEach = function (p) {

	var progressMap = {
		"after": ["success", "fail", "after"]
	}

	var failbool = false;

	var progressIncrease = function (name) {

		if (name == "fail") failbool = true;

		var newName;

		_.find(progressMap, function (item, _name) {
			if (_.indexOf(item, name) > -1) {
				newName = _name;
				return true;
			}
		})

		if (newName) {
			if (!i[newName]) i[newName] = 0;

			i[newName]++;
		}
	}

	var calcProgress = function (i) {
		return _.reduce(i, function (sum, value) {
			return sum + value;
		}, 0)
	}

	var go = function (index) {
		var each = extendFunctions(p.array[index], p.each, index);

		each.item = p.array[index];

		p.action(each, index);
	}

	var extendFunctions = function (item, each, index) {
		var newEach = {};


		_.each(each, function (_each, name) {

			if (typeof _each === 'function' && (name == "success" || name == "fail" || name == "after")) {
				newEach[name] = function () {

					var _arguments = arguments;

					var callback = function () {

						var proggressend = function () {

							if (p.all.success && !failbool) p.all.success(p);
							if (p.all.fail && failbool) p.all.fail(p);

							//else
							if (p.all.after) p.all.after(p);
						}

						progressIncrease(name);
						progress = calcProgress(i);

						_each(item, progress, l, _arguments, index);

						if (p.sync) {

							if (p.array[index + 1]) {
								go(index + 1);
							}
							else {
								proggressend();
							}
						}
						else
							if (progress == l) proggressend();
					}

					if (!p.syncCallbacks || progress >= index || p.sync) {

						callback();
					}
					else {
						var interval = setInterval(function () {

							if (progress >= index) {
								callback();
								clearInterval(interval);
							}

						}, 10)
					}
				}
			}
			else {
				newEach[name] = _each;
			}
		})

		return newEach;
	}

	if (!p) p = {};

	p.array || (p.array = []);
	p.each || (p.each = {});
	p.all || (p.all = {});

	p.each.success || (p.each.success = function () { });
	p.each.fail || (p.each.fail = function () { });

	if (!p.array || p.array.length == 0) {
		if (p.all.success) {
			p.all.success();
		}

		return;
	}

	var l = p.array.length,
		i = {};

	var progress = 0;

	if (p.all.before)
		p.all.before(p);

	if (!p.sync) {
		_.each(p.array, function (item, index) {
			go(index)
		})
	}
	else {
		go(0);
	}
}

lazyActions = function (farray, clbk) {

	lazyEach({
		array: farray,
		action: function (p) {

			p.item(function () {

				p.success()
			})
		},

		all: {
			success: clbk
		}
	})

}

isVal = function (val) {
	if (!_.isObject(val) || (typeof val.v != 'undefined' && !_.isObject(val.v))
		|| (typeof val.c != 'undefined' && !_.isObject(val.c))
	)
		return true;

	else
		return false;
}

prevEl = function (array, el) {
	var index = _.indexOf(array, el);

	if (index > 0) {
		return array[index - 1]
	}

	else {
		return array[0]
	}
}

nextEl = function (array, el) {
	var index = _.indexOf(array, el);

	if (index > -1 && index < array.length - 1) {
		return array[index + 1]
	}

	else {
		return array[array.length - 1]
	}
}

prevElCircle = function (array, el) {
	var index = _.indexOf(array, el);

	if (index > 0) {
		return array[index - 1]
	}

	else {
		return array[array.length - 1]
	}
}

nextElCircle = function (array, el) {
	var index = _.indexOf(array, el);

	if (index > -1 && index < array.length - 1) {
		return array[index + 1]
	}

	else {
		return array[0]
	}
}

nextElH = function (array, el) {
	var index = findIndex(array, el);

	if (index > -1 && index < array.length - 1) {
		return array[index + 1]
	}

	else {
		return null
	}
}

firstEl = function (array) {
	var l = deep(array, 'length');

	if (l) {
		return array[0]
	}
	else {
		return null;
	}
}

lastEl = function (array) {
	var l = deep(array, 'length');

	if (l) {
		return array[l - 1]
	}
	else {
		return null;
	}
}

lastEls = function (array, l) {
	var length = array.length

	l = Math.min(l, length);

	if (!l) {
		return [];
	}

	else {
		return _.filter(array, function (e, i) {
			if (i >= length - l) return e;
		})
	}

}

lastelements = function (arr, length, eq) {

	if (!length) length = 100
	if (!eq) eq = 0

	var d = arr.length - length


	if (d > eq) {
		arr = arr.splice(d)
	}

	return arr
}

firstEls = function (array, l) {
	var length = array.length

	l = Math.min(l, length);

	if (!l) {
		return [];
	}

	else {
		return _.filter(array, function (e, i) {
			if (i < l) return e;
		})
	}

}

getRandomValues = function (arr) {

	for (var i = 0; i < arr.length; i++) {
		arr[i] = Math.random() * 256 | 0
	}

	return arr
}

/* ______________________________ */

/* OBJECTS */

equalhash = function (v1, v2) {
	return $.md5(JSON.stringify(v1)) === $.md5(JSON.stringify(v2))
}

rot13 = function (str) {
	var re = new RegExp("[a-z]", "i");
	var min = 'A'.charCodeAt(0);
	var max = 'Z'.charCodeAt(0);
	var factor = 13;
	var result = "";
	str = str.toUpperCase();

	for (var i = 0; i < str.length; i++) {
		result += (re.test(str[i]) ?
			String.fromCharCode((str.charCodeAt(i) - min + factor) % (max - min + 1) + min) : str[i]);
	}

	return result;
}

getMethods = function (obj) {
	var Obj = {};
	for (prop in obj) {
		if (typeof obj[prop] === 'function')
			Obj[prop] = obj[prop];
	}
	return Obj;
}

getVars = function (obj) {
	var Obj = {};
	for (prop in obj) if (obj.hasOwnProperty(prop)) {
		Obj[prop] = obj[prop];
	}
	return Obj;
}

toDeepKey = function (obj) {
	return _.toArray(obj).sort().join(".");
}



deepInsert = function (obj, key, _insert) {
	if (!key) return;

	var _key = key.split(".");

	var tkey = _key[0];

	if (_key.length == 1) {
		obj[tkey] = _insert;
	}
	else {
		if (!obj[tkey]) {
			obj[tkey] = {};
		}

		_key.splice(0, 1);

		return deepInsert(obj[tkey], _key.join("."), _insert)
	}
}

isEqual = function (obj1, obj2, b) {

	if (typeof b == "undefined") b = true;

	var pEqual = !b;

	if (typeof obj1 == "undefined" && typeof obj2 == "undefined") return true;

	if (typeof obj1 == "undefined" || typeof obj2 == "undefined") return false;

	if (typeof obj1 != typeof obj2 && typeof obj2 != "function") return false;

	if (typeof obj2 == "function") {
		return obj2(obj1);
	}

	if (!_.isObject(obj2)) {

		if (obj2 == obj1) {
			return true;
		}

		return false;
	}

	if (_.isArray(obj2)) {

		_.each(obj2, function (param, index) {

			var e = (isEqual(obj1[index], param, b));

			if (!e) e = false;
			else e = true;

			pEqual = pEqual || e;

		})

		return pEqual;
	}

	else

		if (_.isObject(obj2)) {

			_.each(obj2, function (param, n) {

				var e = (isEqual(obj1[n], param, b));

				if (!e) e = false;
				else e = true;

				if (b) pEqual = pEqual || e;
				else pEqual = pEqual && e;
			})

			return pEqual;
		}

	return false;
}
/*
clear = function(obj){
   _.each(obj, function(k,i){
	   delete obj[i];
   })
}*/


boolnum = function (n) {
	if (n == 0 || n == '0' || !n) return false

	return true
}

toFixed = function(n, d){
	return Number(n.toFixed(d))
}

/* ______________________________ */

/* HELPERS */

//IE11


dround = function (n, d) {
	var digits = + "1".padEnd(d + 1, "0");

	return Math.round(n * digits) / digits;
}

ParametersLive = function (parameters, el, p) {

	if (!el) return
	if (!p) p = {};

	_.each(parameters, function (parameter) {

		if (!parameter || !parameter.type) return


		var _el = el.find('[pid="' + parameter.id + '"]')

		if (_el) {
			parameter.el = _el;

			_el.find('.operatorselect').off('change')

			_el.find('.operatorselect').on('change', function () {
				parameter.operator = $(this).val();

				parameter.set('___nochange')
			})

			if (parameter.type == 'cash') {

				_el.find("input").on('change', function () {
					var value = $(this).val();

					if (parameter.isValid(value)) {
						_el.removeClass('error')
					}
					else {
						_el.addClass('error')
					}

					parameter.set(value)
				})

				_el.find("input").on('keyup', function () {

					var value = $(this).val()

					_el.find('.convertValue').html(parameter.app.store.cash.toBTC(value, parameter.currency, true))

				})

				return;

			}

			if (parameter.type == 'cashrange') {

				_el.find("input").on('change', function () {
					var value = $(this).val();

					var index = $(this).attr('index');

					if (parameter.isValid(value)) {
						_el.removeClass('error')
					}
					else {
						_el.addClass('error')
					}

					parameter.set(value, index)
				})

				_el.find("input").on('keyup', function () {

					var value = $(this).val();
					var index = $(this).attr('index');
				})

				return;

			}

			if (parameter.type == 'numberrange') {

				_el.find("input").on('change', function () {
					var value = $(this).val();

					var index = $(this).attr('index');

					if (parameter.isValid(value)) {
						_el.removeClass('error')
					}
					else {
						_el.addClass('error')
					}

					parameter.set(value, index)
				})

				return;

			}

			if (parameter.type == 'html' && !_Node) {
				_el.trumbowyg({
					btns: [['bold', 'italic'], ['link']]
				});

				_el.on('tbwblur', function () {

					var value = _el.trumbowyg('html');

					parameter.set(value)

				})


				return
			}

			if (parameter.type == 'image' || parameter.type == 'file') {


				var uploadElement = _el.find('.addImage'),
					previewElement = _el.find('.imagesContainer'),
					previews = _el.find('.imageContainer')

				parameter.upload.el = uploadElement;

				if (parameter.onLive) {
					parameter.onLive(previews, parameter)
				}

				parameter.upload.beforeUpload = function (fileObject, processId) {

					if (parameter.previewTemplate) {

						previewElement.append(parameter.previewTemplate({
							file: fileObject,
							processId: processId
						}))

					}
				}

				parameter.upload.onUpload = function (response, processId) {

					if (parameter.previewTemplate) {

						var preview = deep(response, parameter.previewPath || '');

						var el = previewElement.find('[processId="' + processId + '"]');

						var insertEl = previewElement,
							insertKey = 'append';

						if (el.length > 0) {
							insertEl = el;
							insertKey = 'replaceWith';
						}

						insertEl[insertKey](parameter.previewTemplate({
							src: preview,
							processId: processId,

							options: parameter.upload
						}))

						el = previewElement.find('[processId="' + processId + '"]');

						parameter.onLive(el, parameter);

					}

					parameter.set(preview)

					if (parameter.upload._onUpload)
						parameter.upload._onUpload(response)
				}

				initUpload(parameter.upload)
			}

			if (parameter.type == 'valuesmultitree') {

				var inieve = function (__el) {
					_el.on(clickAction(), '.vmt_panel_wrapper', function () {

						var id = $(this).closest('[groupid]').attr('groupid')

						closeGroup(id);
						checking()

					})

					_el.on('change', 'input[type="checkbox"]', function () {

						var id = $(this).attr('value');
						var checked = $(this).is(":checked") ? 1 : 0;

						var value = parameter.treemap[id];

						var add = {};
						var remove = {};

						var total = [];

						var uptoParent = function () {
							if (value.parent) {
								if (parameter.childselected(value.parent, add, remove)) {

									value = value.parent;

									add = {};
									add[value.id] = true

									uptoParent();

								}
								else {

								}

							}
						}

						var uptoParentUncheck = function (value) {
							if (value.parent) {
								remove[value.parent.id] = true
								uptoParentUncheck(value.parent)

							}
						}

						var preuptoParentUncheck = function (value) {
							if (value.parent) {
								var selectedParent = parameter.parentselected(value.parent, [], []);

								if (selectedParent) {

									remove[selectedParent.id] = true;

									_.each(value.parent.values, function (v) {

										if (v.id != value.id) {
											add[v.id] = true
										}
									})
								}

							}
						}

						if (checked) {

							add[value.id] = true

							uptoParent();

							if (value.values) {
								parameter.every({
									group: function (v, l, i, n) {

										remove[v.id] = true

										//if(parameter.value.indexOf(v.id) > -1)

										n();
									},
									value: function (v) {
										remove[v.id] = true
									}
								}, value.values)
							}

						}
						else {
							preuptoParentUncheck(value)

							remove[value.id] = true

							uptoParentUncheck(value)
						}

						var ptotal = parameter.composeValues(add, remove);

						total = _.map(ptotal, function (r, i) {
							return i;
						})

						parameter.set(total);


						checking();
					})
				}

				var checking = function () {

					_el.find('.checkbox').prop('checked', false);

					var values = _.map(parameter.value, function (id) {
						return parameter.treemap[id];
					})

					//var tree = parameter.composeValues({},{});


					parameter.every({
						group: function (g, l, i, next) {
							//if(tree[g.id])
							_el.find('[value="' + g.id + '"]').prop('checked', true);

							if (g.active)

								next()
						},

						value: function (v, l, u) {
							//if(tree[v.id])
							_el.find('[value="' + v.id + '"]').prop('checked', true);
						}
					}, values)

				}

				var closeGroup = function (id, act) {

					var group = parameter.treemap[id];

					_closeGroup(group, act)
				}

				var _closeGroup = function (group, act) {

					if (group) {

						if (typeof act === 'undefined') act = !!!group.active

						group.active = act;


						var pl = _el.find('[groupid="' + group.id + '"]')
						var el = pl.find('.vmt_group_params');
						var level = pl.attr('level')

						if (group.active) {
							el.html(parameter.renderLevel(group.values, level + 1))

							pl.removeClass('hidden');
							pl.addClass('active');
						}
						else {
							el.html('')
							pl.removeClass('active');
						}
					}


				}

				var closeAll = function () {
					_.each(parameter.treemap, function (p) {
						p.active = false;

					})

					/*_el.find('.vmt_group_params').html('');
 
					_el.find('[groupid]').removeClass('active').addClass('hidden')*/

				}



				_el.find('.vmt_showMore').on(clickAction(), function () {

					_el.addClass('showedMore')
				})

				_el.find('.vmt_hideMore').on(clickAction(), function () {

					_el.removeClass('showedMore')
				})

				_el.find('.autoSearch').on('keyup', function (e) {
					var v = $(this).val();


					if (v && v.length > 1) {

						if ((e.keyCode || e.which) == 13) {

							var _v = parameter.treemap[v]

							if (_v) {

								removeEqual(parameter.value, _v.id)

								_el.find('input[value="' + _v.id + '"]').prop('checked', true).change();

								$(this).val('');

								closeAll();

								var h = parameter.renderLevel(null, 0)

								_el.find('.chinputsv').html(h);

								checking();
							}

						}

						else {
							closeAll();

							var r = parameter.searchValues(v)

							var openmap = {};

							_.each(r, function (value) {
								_.each(value.parents, function (parent) {

									openmap[parent.id] = true

								})
							})

							var h = parameter.renderLevel(null, 0, {
								group: function (group) {
									if (openmap[group.id]) {
										group.active = true;
										return true;
									}
								},

								value: function (value) {

									if (r[value.id]) return true;

								}
							})

							_el.find('.chinputsv').html(h);
							checking();
						}
					}
					else {
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

			if (parameter.type == 'valuesmulti') {
				_el.find('input').on('change', function () {

					var value = $(this).attr('val');
					var checked = $(this).is(":checked") ? 1 : 0;

					parameter.set(value, checked);

					_el.removeClass('error')
				})

				_el.find('.vm_showMore').on(clickAction(), function () {

					_el.addClass('showedMore')
				})

				_el.find('.vm_hideMore').on(clickAction(), function () {

					_el.removeClass('showedMore')
				})

				return;
			}

			if (parameter.type == 'valuescustom' || parameter.type == 'values' || parameter.type == 'valuesmultibig') {

				var bkp = null;

				var input = _el.find('.vc_inputWrapper input');

				var take = function () {
					if (parameter.type == 'valuesmultibig') {
						return _el.find('.vc_valuecustom')
					}
					else {
						return _el;
					}
				}

				var open = function () {

					take().toggleClass('opened');

					_el.find('.vc_value').removeClass('hidden')


					if (take().hasClass('opened')) {
						$('html').on(clickAction(), closeclick)

						window.addEventListener('scroll', close);

						_el.find('.vc_selectInput').scrollTop(0)
					}
					else {
						close()
					}
				}

				var close = function () {

					if (bkp) {
						input.val(bkp)
					}

					take().removeClass('opened');

					$('html').off(clickAction(), closeclick)

					window.removeEventListener('scroll', close);
				}

				var closeclick = function (e) {
					if (_el.has(e.target).length === 0 && take().hasClass('opened')) {
						close();
					}
				}

				if (!parameter.disabled) {

					if (parameter.type == 'valuescustom' || parameter.autoSearch) {
						_el.find('.vc_iconWrapper').on(clickAction(), function () {
							open()

							if (parameter.autoSearch) {

								setTimeout(function () {
									input.focus();
									bkp = input.val()
									input.val('')

								}, 200)

							}
						})

						_el.find('.vc_inputWrapperClick').on(clickAction(), function () {
							open()
						})

						_el.find('input').on('focus', function () {
							$(this).select();
						})
					}

					if (parameter.type == 'values' && !parameter.autoSearch) {
						_el.find('.vc_textInput').on(clickAction(), function () {

							if (window.cordova && window.plugins.actionsheet) {

								var items = _.map(parameter.possibleValues, (value) => {
									var label = parameter.labelByValue(value);

									return {
										label,
										value
									}
								})

								app.mobile.menu(_.map(items, (i) => { return i.label })).then((i) => {

									bkp = null;

									input.val(items[i].value);
									input.change();

								}).catch(e => {
									console.error('e', e)
								})

							}
							else {
								open()
							}


						})
					}


					_el.find('.vc_value').on('click', function () {
						bkp = null;

						var value = $(this).attr('value');

						input.val(value);
						input.change();

						take().removeClass('opened');
						take().removeClass('error')
					})

					_el.find('.vc_selected_value_icon').on('click', function () {
						var value = $(this).closest('.vc_selected_value').attr('value');

						parameter.set(value);

						_el.parent().html(parameter.input())

						ParametersLive([parameter], el, p)
					})


					if (parameter.autoSearch) {

						input.focus(function () {
							this.select();
						});

						input.on('keyup', function (e) {
							bkp = null;

							var value = $(this).val().toLowerCase();

							if (!take().hasClass('opened')) {
								open();
							}

							if ((e.keyCode || e.which) == 13) {

								var firstel = _el.find('.vc_value:not(.hidden)');

								if (firstel.length > 0) {
									value = firstel.attr('value')
								}

								$(this).val(value);
								$(this).change();


								return false;

							}

							if (!value) {
								_el.find('.vc_value').removeClass('hidden')
							}

							else {

								$.each(_el.find('.vc_value'), function () {

									var el = $(this);

									var _value = el.attr('value').toLowerCase();
									var text = el.text().toLowerCase();

									if (_value.indexOf(value) > -1 || text.indexOf(value) > -1) {
										el.removeClass('hidden')
									}

									else {
										el.addClass('hidden')
									}



								})
							}
						})
					}

				}

				var _change = function () {
					var __el = $(this)

					var value = __el.val();

					if (parameter.autoSearch) {

						var valid = parameter.isValid(value);


						if (value && !valid) {

							setTimeout(function () {

								if (__el.val() == value) {

									if (parameter.require) {

										$(__el).val(parameter.defaultValue);


										$(__el).change();

									}

								}


							}, 150)



							return
						}

						if (valid) {
							value = valid
						}

					}

					parameter.set(value);

					var label = parameter.labelByValue(value)

					if (parameter.labelToInput) {
						__el.val(parameter.labelToInput(label))

						_el.parent().html(parameter.input())

						ParametersLive([parameter], el, p)

						return
					}
					else {
						__el.val(label)
					}

					if (parameter.type == 'valuesmultibig') {

						_el.parent().html(parameter.input())

						ParametersLive([parameter], el, p)
					}

					_el.removeClass('error');
				}

				input.on('change', _change)

				if (parameter.onType) {
					input.on('keyup', _change)
				}

				return;
			}

			if (parameter.type == 'location') {

				parameter.options.inputBinding || (parameter.options.inputBinding = {})

				parameter.options.inputBinding.locationNameInput = _el.find('.place input')
				parameter.options.inputBinding.radiusInput = _el.find('.radius select')

				parameter.options.onchanged = function (currentLocation, radius, isMarkerDropped) {

					var context = $(this).locationpicker('map')

					var addressComponents = context.location.addressComponents;

					var l = {}; _.clone(currentLocation);


					l.latitude = currentLocation.latitude;
					l.longitude = currentLocation.longitude;
					l.radius = radius;
					l.country = addressComponents.country;
					l.zip = addressComponents.postalCode;
					l.place = context.location.formattedAddress;



					parameter.set(l)

				}

				parameter.options.location = {
					latitude: parameter.value.latitude,
					longitude: parameter.value.longitude
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

				_el.find('.locationInputUse input').on('change', function () {
					var using = $(this).is(":checked") ? true : false;

					_el.toggleClass('notused');

					if (!using) {
						_el.find('.place input').attr('disabled', 'disabled')
						_el.find('.radius select').attr('disabled', 'disabled')
					}
					else {
						_el.find('.place input').removeAttr('disabled')
						_el.find('.radius select').removeAttr('disabled')
					}


					parameter.set({
						using: using
					})

				})

				return;
			}

			if (parameter.type == 'color') {

				_el.simpleColor({
					boxWidth: 60,
					cellWidth: 30,
					cellHeight: 30,
					columns: 4,
					cellMargin: 2,
					colors: parameter.possibleValues,
					onSelect: function (color) {
						parameter.set(color)
					}
				});

			}

			if (parameter.type == 'date') {

				_el.pickadate({
					today: '',
					onSet: function (c) {

						if (c.select) {
							var d = dateToStrSmall(new Date(c.select))

							parameter.set(d)
						}
						else {
							parameter.set()
						}



					},
					selectYears: true,
					selectMonths: true,
					format: 'dddd, dd mmm, yyyy',
					formatSubmit: 'yyyymmdd',
					min: parameter.options.min || undefined,
					max: parameter.options.max || undefined,
				})

				var pickadate = _el.pickadate('picker')

				if (parameter.value)
					pickadate.set('select', strToDateArr(parameter.value))

			}

			if (parameter.type == 'daterange') {

				var pickadatef;
				var pickadatet;

				var applydate = function () {

					if (parameter.value[0]) {
						pickadatet.set('min', strToDateArr(parameter.value[0]))
					}
					else {
						pickadatet.set('min', parameter.options.min || false)
					}

					if (parameter.value[1]) {

						pickadatef.set('max', strToDateArr(parameter.value[1]))
					}
					else {
						pickadatef.set('max', parameter.options.max || false)
					}

				}

				var pic = {
					selectYears: true,
					selectMonths: true,
					today: '',
					format: 'dddd, dd mmm, yyyy',
					formatSubmit: 'yyyymmdd',
					min: parameter.options.min || undefined,
					max: parameter.options.max || undefined
				}

				var from = _.clone(pic);
				var to = _.clone(pic);

				var set = function (c, index) {
					var d = '';

					if (c.select)

						d = dateToStrSmall(new Date(c.select))

					if (typeof c.select != 'undefined' || typeof c.clear != 'undefined') {
						parameter.set(d, index)

						applydate();
					}


				}

				from.onSet = function (c) {

					set(c, 0)

				};

				to.onSet = function (c) {
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

			if (parameter.type == 'hours') {
				_el.find('.dayrow select').on('change', function () {

					var value = $(this).val();

					var index2 = $(this).closest('.trange').attr('index');

					var index = $(this).closest('.dayrow').attr('day');

					if (value == 'false')
						value = null;

					parameter.set(value, index, index2)

					_el.removeClass('error')

				})

				return;
			}

			if (parameter.type == 'category') {


				_el.on(clickAction(), function () {


					parameter.app.nav.api.load({
						open: true,
						id: 'postSelectCategory',
						inWnd: true,

						essenseData: {
							header: "Select Category",
							path: _el.attr('parent'),

							validation: 'canCreateItem',

							onSelectCategory: function (category) {

								parameter.set(category.path())

							}
						}
					})

				})

				return

			}

			if (parameter.type == 'phone') {

				_el.mask("(999) 999-9999");
			}


			if (parameter.type == 'string' && parameter.autoSearch) {

				var placeholder = _el.closest('.vc_autosearchInput').find('.placeholderghost');

				var neutral = '&nbsp;'

				var slowMadeTimer;

				_el.on('keydown', function (e) {

					var __el = $(this);

					var v = __el.val();

					if ((e.keyCode || e.which) == 39 /*|| (e.keyCode || e.which) == 13*/) {
						var v = placeholder.html()

						if (v != neutral) {
							placeholder.html(neutral);

							__el.val(placeholder.attr('value'));
							__el.change()
						}
					}
					else {
						placeholder.html(v || neutral)
					}

				})

				var act = function (e) {
					var __el = $(this)

					var v = __el.val();



					placeholder.html(v || neutral)

					if (v && (e.keyCode || e.which) != 13) {


						parameter.autoSearch(v, parameter, function (text) {

							if (__el.val() != v) return;

							placeholder.html(v || neutral)


							if (v && text && text.toLowerCase().indexOf(v.toLowerCase()) == 0) {
								placeholder.html(v + text.substr(v.length)).attr('value', text)
							}


						})


					}

				}

				_el.on('keyup', act)
				_el.on('focus', act)
				_el.on('blur', function () {
					placeholder.html(neutral)
				})


			}

			var _change = function () {
				var value = $(this).val();

				if (parameter.type == 'boolean')
					value = $(this).is(":checked") ? 1 : 0;

				if (parameter.type == 'email') {
					if (value == '_@_._') value = ''
				}

				if (parameter.type == 'nickname') {
					value = pstranslit(value)

					$(this).val(value);
				}

				if (parameter.type == 'number') {

					if (!isNaN(Number(value))) {
						value = dround(value, deep(parameter, 'format.Precision') || 0)
					}
					else {
						value = ''
					}

					$(this).val(value);
				}

				if (parameter.isValid(value)) {
					_el.removeClass('error')
				}
				else {
					_el.addClass('error')
				}


				parameter.set(value)
			}

			_el.on('change', _change)

			if (parameter.onFocus) _el.on('focus', function () {
				parameter.onFocus(_el, parameter)
			})

			if (parameter.onType) {
				_el.on('keyup', _change)
			}

			if (parameter.type == 'number') {
				_el.on('change', function (e) {

					if (e.originalEvent.key == '.' || e.originalEvent.key == ',' || e.originalEvent.key == 'Backspace') {
						return false
					}

					var value = $(this).val();


					if (!value || value == '0') {

						return false
					}

					if (value.length > 1) {

						if (value[0] == '0') value = value.substr(1)

						var l = value[value.length - 1]

						var hassep = value.indexOf('.') > -1 || value.indexOf(',') > -1


						if (l == '.' || (l == '0' && hassep) || l == ',') {
							return false
						}
					}


					if (!isNaN(Number(value))) {

						var max = deep(parameter, 'format.max')
						var min = deep(parameter, 'format.min')

						if (typeof max != 'undefined' && max < value) value = max
						if (typeof min != 'undefined' && min > value) value = min

						value = dround(value, deep(parameter, 'format.Precision') || 0)

						$(this).val(value);
					}


				})
			}
		}

	})

	if (el.find('input').inputmask) {

		$.each(el.find('input'), function () {
			var i = $(this);

			if (i.attr('data-inputmask') && !i.attr('notmasked')) {
				i.inputmask({});
			}
		})

	}
}

var pstranslit = function (word) {
	var answer = '';
	var converter = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
		'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
		'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
		'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
		'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
		'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
		'э': 'e', 'ю': 'yu', 'я': 'ya',

		'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
		'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
		'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
		'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
		'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
		'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
		'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
	};

	for (var i = 0; i < word.length; ++i) {
		if (converter[word[i]] == undefined) {
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}

	return answer;
}


Parameter = function (p) {

	if (!p) p = {};

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


	if (self.type.indexOf('range') > -1) self.dbFunc = 'fromto'

	self.removeImage = function (p) {
		var img = new Img({
			type: self.upload.data.essense,
			name: p.value,
			app: self.app,
			refId: self.upload.data.essense.RefID
		})

		img.remove(function (r) {

			removeEqual(self.value, p.value);

			if (p.clbk)
				p.clbk(r);
		})
	}

	self.isValid = function (value) {

		if (typeof value == 'undefined')
			value = self.value;

		var mask = self.mask();

		if (self.type == 'number' || self.type == 'cash') {
			value = Number(value).toFixed(deep(self, 'format.Precision') || 0)
		}

		if (self.type == 'label') {
			return true;
		}

		if (self.type == 'hours') {
			return true;
		}

		if (self.type == 'color') {
			return true;
		}

		if (self.type == 'date' || self.type == 'daterange') {
			return true;
		}

		if (self.type == 'html' || self.type == 'text') {
			if (self.require && !value)

				return false;

			return true;
		}

		var ptest = true;

		_.each(self.patterns, function (p) {

			if (!p.test(value)) ptest = false;


		})

		if (!ptest) return false;

		if ((self.type == 'values' || self.type == 'valuesmultibig') && self.autoSearch) {

			var _v = _.find(self.possibleValues, function (_v) {

				if (_v.toLowerCase() == value.toLowerCase()) return true;

			})

			if (!_v) return false;

			else {
				return _v.toUpperCase();
			}
		}


		if (self.type == 'boolean') return true

		if (!self.require && (!value || value == 0)) return true

		var isValid = Inputmask.isValid(value.toString(), mask);

		if (self.require && (!value || value == 0)) isValid = false;

		if ((self.type == 'number' || self.type == 'cash') && !_.isNumber(Number(value))) isValid = false;

		return isValid;
	}

	self.openGallery = function (p) {

		if (!p) p = {};

		var images = _.map(self.value, function (v) {
			return new Img({
				type: self.upload.data.essense,
				name: v,
				app: self.app
			})
		})

		p = _.extend(p, {
			images: images,
			essense: self.upload.data.essense,
			size: 'full',
			smallSize: 'thumbnail',
			edit: true
		})

		self.app.nav.api.load({
			open: true,
			id: 'imageGallery',
			inWnd: true,

			essenseData: p
		})
	}


	self.default = function () {

		var def = {
			string: '',
			number: 0,
			percent: 0,
			dollars: 0,
			text: '',
			category: 0,
			html: '',
			location: {

				country: "US",
				latitude: 40.73387539871257,
				longitude: -73.98949970898434,
				place: "New York, NY 10003, USA",
				radius: 10000,
				zip: "10003",

				using: true

			},
			valuesmulti: [],
			values: '',
			boolean: false,
			cash: 0,
			image: [],
			numberrange: ['', ''],
			cashrange: ['', ''],
			hours: {},
			valuesmultibig: [],
			valuescustom: '',
			valuesmultitree: [],
			phone: '',
			color: '#1E3DF7',
			date: '',
			daterange: ['', ''],
			email: '',
			stringany: '',
			nickname: '',
			image: '',
			password: '',
			file: ''
		}

		if (typeof self.defaultValue != 'undefined') return self.defaultValue;

		if (self.type && typeof def[self.type] != 'undefined') {

			return def[self.type];

		}

		else
			return 0;
	}

	self.renders = {
		category: function (clear) {
			var category = self.app.store.categories.find(self.value || '0');

			if (category) {
				return category.htmlpath();
			}
			else {
				return '';
			}
		},
		boolean: function (clear) {
			var input = '';
			var checked = '';

			if (self.value && self.value != '0') checked = 'checked';

			input += '<input elementsid="' + self.id + '" pid="' + self.id + '" type="checkbox" disabled id="checkbox_' + self.id + '"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
			input += '<label for="checkbox_' + self.id + '"></label>';

			return input;
		},

		numberrange: function (clear, index) {
			return self.value[index]
		},

		cashrange: function (clear, index) {
			return self.value[index]
		},
	}
	self.mask = function (tohtml) {

		var f = self.format || {}

		var masked = false;

		var mask = {
			rightAlign: false,
			autoUnmask: true,
			showMaskOnHover: false,
			showMaskOnFocus: false,
			clearMaskOnLostFocus: true,
		}

		if (self.type == 'number' || self.type == 'cash') {


			return null

			mask.alias = 'numeric';
			mask.groupSeparator = typeof f.groupSeparator != 'undefined' ? f.groupSeparator : ',';
			mask.radixPoint = '.';
			mask.digits = deep(self, 'format.Precision');
			mask.digitsOptional = !1;
			mask.autoGroup = true;
			mask.allowMinus = deep(self, 'format.AllowMinus') || false;

			if (deep(self, 'format.Min')) mask.min = deep(self, 'format.Min')
			if (deep(self, 'format.Max')) mask.max = deep(self, 'format.Max')

			if (mask.digits > 0) {
				mask.placeholder = "0.00"
			}

			masked = true;
		}



		if (self.type == 'numberrange' || self.type == 'cashrange') {
			mask.alias = 'numeric';
			mask.nullable = true;
			mask.groupSeparator = ',';
			mask.autoGroup = true;

			mask.digits = deep(self, 'format.Precision');

			masked = true;
		}

		if (self.type == 'email') {
			mask.alias = 'email';

			masked = true;
		}

		if (self.type == 'string') {

			var limits = [0, ''];

			if (self.require) limits[0] = 1;
			if (self.format.Length) limits[1] = self.format.Length;

			mask.regex = "[а-яА-Яa-zA-Z0-9 ,-.&]{" + limits.join(',') + "}";

			masked = true;

		}

		if (self.type == 'nickname') {

			var limits = [0, ''];

			if (self.require) limits[0] = 1;
			if (self.format.Length) limits[1] = self.format.Length;

			mask.regex = "[а-яА-Яa-zA-Z0-9_]{" + limits.join(',') + "}";

			masked = true;

		}

		if (self.type == 'stringany') {

			var limits = [0, ''];

			if (self.require) limits[0] = 1;
			if (self.format.Length) limits[1] = self.format.Length;

			mask.regex = "[^|]{" + limits.join(',') + "}";

			masked = true;

		}

		if (masked) {

			if (tohtml) {
				mask = JSON.stringify(mask);
				mask = mask.substring(1);
				mask = mask.substring(0, mask.length - 1).replace(/"/g, "'");
				mask = 'data-inputmask="' + mask + '"';
			}

			return mask;
		}
		else {
			if (tohtml) {
				return '';
			}

			return null;
		}
	}

	self.labelByValue = function (v) {
		var index = _.indexOf(self.possibleValues, v);

		if (index > -1) {
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

	self.operatorInput = function () {

		if (!self.operatorSelect) {
			return ''
		}

		var input = '<div class="operator"><select class="operatorselect">';

		_.each(self.operatorSelect, function (operator) {

			var selected = '';

			if (operator.id == self.operator) selected = 'selected'

			input += '<option ' + selected + ' + value="' + operator.id + '">' + operator.name + '</option>'
		})

		input += '</select></div>'

		return input;
	},

		self.input = function (inputp) {

			var __disabled = ''

			if (self.disabled) {
				__disabled = 'disabled="disabled"'
			}

			if (!inputp) inputp = {};

			var m = self.mask(true);

			if (self.type == 'image' || self.type == 'file') {

				if (self.uploadTemplate && self.upload && self.previewTemplate) {

					return self.uploadTemplate(self)

				}
			}

			if (self.type == 'location') {

				var checked = 'checked';
				var notused = '';
				var disabled = ''

				if (!self.value.using) {
					checked = '';
					notused = 'notused';
					disabled = 'disabled="disabled"'
				}


				return '<div pid="' + self.id + '" class="locationInputWrapper ' + notused + '"><div class="table locationInputs">' +
					'<div class="locationInputUse"><input elementsid="locationInputUse" type="checkbox" id="checkbox_' + self.id + '_location" ' + checked + ' class="checkbox nolabel" />' +

					'<label for="checkbox_' + self.id + '_location"></label>' + '</div>' +
					'<div class="locationInput place"><input elementsid="locationInputPlace" type="text" notmasked="notmasked" placeholder="Name Of Place"></div><div class="locationInput radius">' +
					'<select>' +
					'<option value="1000">1 mi</option><option value="5000">5 mi</option><option value="10000">10 mi</option><option value="20000">20 mi</option><option value="50000">50 mi</option><option value="100000">100 mi</option><option value="500000">500 mi</option>'
					+ '</select>'

					+ '</div>' +
					'</div><div class="mapwr"><div class="map"></div><div class="mapbwoverlay"></div></div></div>'
			}

			if (self.type == 'valuescustom' || self.type == 'values' || self.type == 'valuesmultibig') {

				var disabled = '';



				var displayValue = self.value

				if (self.type == 'valuesmultibig') displayValue = ''

				if (self.type == 'values' && !self.autoSearch) {
					disabled = 'disabled';
				}

				if (self.disabled) disabled = 'disabled'

				if (self.type == 'values' || self.type == 'valuescustom') {
					displayValue = self.labelByValue(self.value)

					if (self.labelToInput) {
						displayValue = self.labelToInput(displayValue)
					}
				}

				var caret = '';

				caret += '<div class="vc_iconWrapper">';
				caret += '<div class="vc_iconSpinWrapper">';
				caret += '<i class="fa fa-caret-down" aria-hidden="true"></i>';
				caret += '</div>';
				caret += '</div>';

				var input = '';

				if (self.type == 'valuesmultibig') {
					input += '<div class="vc_valuecustom_multibig" pid="' + self.id + '">';
					input += '<div class="vc_valuecustom tvfocusedopacity">';
				}
				else {
					input += '<div class="vc_valuecustom tvfocusedopacity" pid="' + self.id + '">';
				}

				input += '<div class="vc_textInput table">';

				if (self.format.right)
					input += caret;

				input += '<div class="vc_inputWrapper '+(disabled ? 'vc_inputWrapperClick' : '')+'">';
				input += '<input elementsid="vs_input" ' + disabled + '  type="text" value="' + displayValue + '" placeholder="' + self.placeholder + '">';
				if(disabled){
					input += '<div class="displaceholder"></div>'
				}
				input += '</div>';

				if (!self.format.right)
					input += caret;



				input += '</div>';


				input += '<div class="vc_selectInput customscroll">';

				if (self.defaultValuesTemplate) {
					input += self.defaultValuesTemplate(self)
				}
				else {
					if (!self.defaultValue) {
						input += '<div class="vc_value" value="">';
						input += '&nbsp;';
						input += '</div>';
					}

					_.each(self.possibleValues, function (value, index) {


						//if(self.value == value) return

						//if(self.possibleValuesLabels[index]) label = self.possibleValuesLabels[index]

						if (self.type == 'valuesmultibig') {

							if (_.indexOf(self.value, value.toUpperCase()) > -1) return
						}

						var label = self.labelByValue(value);

						input += '<div class="vc_value" value="' + value + '">';

						if (self.defaultValueTemplate) {
							input += self.defaultValueTemplate(label, value, self)

						}
						else {
							input += label;
						}


						input += '</div>';

					});
				}



				input += '</div>';
				input += '</div>';

				if (self.type == 'valuesmultibig') {
					input += '<div class="vc_selected_values">';

					_.each(self.value, function (value, index) {

						var label = self.labelByValue(value);

						input += '<div class="vc_selected_value table" value="' + value + '">';
						input += '<div class="vc_selected_value_icon">';
						input += '<i class="fas fa-times-circle"></i>';
						input += '</div>';

						input += '<div class="vc_selected_value_value">';
						input += label;
						input += '</div>';
						input += '</div>';
					})

					input += '</div>';

					if (self.value.length > 1) {
						input += self.operatorInput();
					}

					input += '</div>';

				}



				return input;
			}

			if (self.type == 'text' || self.type == 'html') {

				var input = '<textarea elementsid="textarea_' + self.id + '" placeholder="' + self.placeholder + '" notmasked="notmasked" pid="' + self.id + '" class="' + self.type + ' ">' + self.render(true) + '</textarea>';

				return input;
			}

			if (self.type == 'category') {

				var category = self.app.store.categories.find(self.value || '0');

				if (category && category.canCreateItem()) {

					var input = '<div parent="' + category.parent.path() + '" pid="' + self.id + '" class="editCategoryPath">' + category.htmlpath() + '</div>';

				}
				else {
					var input = '<button pid="' + self.id + '" class="selectCategoryPath">Select Category</button>';
				}

				return input;
			}

			if (self.type == 'valuesmulti') {

				var input = '<div class="vm_valuesmulti" pid="' + self.id + '">';

				_.each(self.possibleValues, function (value, index) {

					var checked = '';
					var label = value;

					if (self.possibleValuesLabels[index]) label = self.possibleValuesLabels[index]

					if (self.options.valueTemplate)

						label = self.options.valueTemplate(value, label)

					if (_.indexOf(self.value, value) > -1) checked = 'checked';

					if (index == 5) {
						input += '<div class="vm_showMore">Show More</div>'
						input += '<div class="vm_hidden">'
						input += '<div class="vm_hideMore">Hide</div>'
					}

					input += '<div class="vm_value">'
					input += '<input elementsid="checkbox_' + self.id + '_' + value + '" val="' + value + '" type="checkbox" id="checkbox_' + self.id + '_' + value + '"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
					input += '<label for="checkbox_' + self.id + '_' + value + '">' + label + '</label>';

					input += '</div>'

				})

				if (self.possibleValues.length >= 6) {
					input += '<div class="vm_hideMore">Hide</div>'
					input += '</div>'
				}


				input += '</div>'


				return input;

			}

			if (self.type == 'valuesmultitree') {

				var filters = null;

				var input = '<div class="vmt_valuesmultitree" pid="' + self.id + '">';

				if (self.autoSearch) {
					input += '<div class="autoSearchWrapper"><input elementsid="autoSearch_input"  type="text" class="autoSearch" placeholder="Search Code"></div>'
				}

				if (inputp.init) {

					var openmap = {};
					var r = {}

					_.each(self.value, function (id) {

						var value = self.treemap[id]

						if (!value) return

						r[id] = value


						_.each(value.parents, function (parent) {

							openmap[parent.id] = true

						})
					})

					filters = {
						group: function (group) {
							if (openmap[group.id]) {

								group.active = true;

								return true;
							}
						},

						value: function (value) {

							return true;

						}
					}
				}

				self.renderLevel = function (values, level, filters) {

					var input = '';

					input += '<div class="nextlevel">'

					var sh = false;

					self.every({
						group: function (group, level, index, next) {

							/*if (index == 5 && !level && !inputp.showall){
								input += '<div class="vmt_showMore">Show More</div>'
								input += '<div class="vmt_hidden">'
								input += '<div class="vmt_hideMore">Hide</div>'
 
								sh = true;
							}*/

							var v = group.name;
							var active = group.active || (filters && filters.group(group));

							if (self.options.valueTemplate)

								v = self.options.valueTemplate(group)

							if (!active && filters) {
								if (!filters.value(group)) return
							}

							input += '<div class="vmt_group " level="' + level + '" groupid="' + group.id + '">'
							input += '<div class="vmt_name table">'
							input += '<div class="vmt_checkbox">'
							input += '<input elementsid="checkbox_' + self.id + group.id + '" type="checkbox" value="' + group.id + '" id="checkbox_' + self.id + group.id + '" class="checkbox" />'
							input += '<label for="checkbox_' + self.id + group.id + '">' + v + '</label>';
							input += '</div>'
							input += '<div class="vmt_panel">'
							input += '<div class="vmt_panel_wrapper">'
							input += '<i class="fa fa-angle-up" aria-hidden="true"></i>'
							input += '</div>'
							input += '</div>'
							input += '</div>'
							input += '<div class="vmt_group_params">'

							if (active) {
								input += '<div class="nextlevel">'
								next();
								input += '</div>'

							}

							input += '</div>'

							input += '</div>'
						},
						value: function (value, level, index) {

							/*if (index == 5 && !level && !inputp.showall && !sh){
								input += '<div class="vmt_showMore">Show More</div>'
								input += '<div class="vmt_hidden">'
								input += '<div class="vmt_hideMore">Hide</div>'
 
								sh = true;
							}*/

							if (filters && !filters.value(value)) return;

							var v = value.name;

							if (self.options.valueTemplate)
								v = self.options.valueTemplate(value)

							input += '<div class="vmt_value" level="' + level + '" groupid="' + value.id + '">'
							input += '<div class="vmt_checkbox">'
							input += '<input elementsid="checkbox_' + self.id + value.id + '" type="checkbox" value="' + value.id + '" id="checkbox_' + self.id + value.id + '" class="checkbox" />'
							input += '<label for="checkbox_' + self.id + value.id + '">' + v + '</label>';
							input += '</div>'
							input += '</div>'

						},
					},

						values,

						level
					)

					input += '</div>'

					return [input, sh];
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

				if (self.value && self.value != '0') checked = 'checked';

				input += '<input elementsid="' + self.id + '" pid="' + self.id + '" type="checkbox" id="checkbox_' + self.id + '"' + checked + ' class="checkbox nolabel ' + self.type + '" />'
				input += '<label for="checkbox_' + self.id + '"></label>';


				return input;

			}

			if (self.type == 'cash') {

				var input = '<div class="cashWrapper" pid="' + self.id + '">';

				input += '<div class="inputCashWrapper">';

				input += '<input elementsid="input_cash" ' + m + ' class="' + self.type + ' input"  value="' + self.render(true) + '">';

				input += '</div>';

				if (self.currency) {

					input += '<div class="convertCashWrapper">'
					input += '<div class="convertValue">' + self.app.store.cash.toBTC(self.value, self.currency, true) + '</div>'
					input += '</div>'

				}

				input += '</div>'

				return input;

			}

			if (self.type == 'cashrange') {

				var input = '<div class="cashrangeWrapper" pid="' + self.id + '">';

				input += '<div class="inputsCashrangeWrapper">';

				input += '<div class="inputCashrangeWrapper">';

				input += '<input  elementsid="input_cashrange" index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

				input += '</div>';

				input += '<div class="inputCashrangeWrapper">';

				input += '<input  elementsid="input_cashrange_2" index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

				input += '</div>';

				input += '</div>';

				if (self.currency) {

					input += '<div class="convertsCashrangeWrapper">'

					input += '<div class="convertCashrangeWrapper">'

					input += '<div class="convertValue" index="0">' + self.app.store.cash.toBTC(self.value[0], self.currency, true) + '</div>'

					input += '</div>'

					input += '<div class="convertCashrangeWrapper">'

					input += '<div class="convertValue" index="1">' + self.app.store.cash.toBTC(self.value[1], self.currency, true) + '</div>'

					input += '</div>'

					input += '</div>'

				}

				input += '</div>'

				return input;

			}

			if (self.type == 'numberrange') {

				var input = '<div class="numberrangeWrapper" pid="' + self.id + '">';

				input += '<div class="inputNumberrangeWrapperFrom">';

				input += '<input  elementsid="input_numberrangefrom" index="0" ' + m + ' class="' + self.type + ' input" placeholder="From" value="' + self.render(true, 0) + '">';

				input += '</div>';

				input += '<div class="inputNumberrangeWrapperTo">';

				input += '<input  elementsid="input_numberrangeto" index="1" ' + m + ' class="' + self.type + ' input" placeholder="To" value="' + self.render(true, 1) + '">';

				input += '</div>';

				input += '</div>'

				return input;
			}

			if (self.type == 'color') {
				var input = '<input  elementsid="input_cashrange" notmasked="notmasked" pid="' + self.id + '" class="simpleColor input" value="' + self.value + '">';

				return input

			}

			if (self.type == 'daterange') {

				var input = '<div class="numberrangeWrapper" pid="' + self.id + '">';

				input += '<div class="inputNumberrangeWrapperFrom">';

				input += '<input  elementsid="input_numberrangefrom_"' + self.id + ' notmasked="notmasked" pid="' + self.id + '" class="datePicker input from" placeholder="From">'

				input += '</div>';

				input += '<div class="inputNumberrangeWrapperTo">';

				input += '<input  elementsid="input_numberrangeto_"' + self.id + ' notmasked="notmasked" pid="' + self.id + '" class="datePicker input to" placeholder="To">'

				input += '</div>';

				input += '</div>'

				return input;

			}

			if (self.type == 'daterange') {
				var input = '<input  elementsid="input_numberrange_"' + self.id + ' notmasked="notmasked" pid="' + self.id + '" class="datePicker input">';

				return input

			}

			if (self.type == 'phone') {


				var input = '<input  elementsid="input_numberrange_"' + self.id + ' notmasked="notmasked" pid="' + self.id + '" class="' + self.type + ' input" value="' + self.render(true) + '" type="text">';;

				return input

			}

			if (self.autoSearch) {

				var input = '<div class="vc_autosearchInput">\
		   <div class="placeholder"><div class="placeholderghost">&nbsp;</div></div>\
		   <div class="autosearchInputCnt">\
		   <input  elementsid="input_autosearch_"' + self.id + ' notmasked="notmasked" ' + m + ' pid="' + self.id + '" class="' + self.type + ' input" placeholder="' + (self.placeholder || "") + '" value="' + self.render(true) + '" type="text">\
		   </div></div>';


				return input
			}

			if (self.type == 'password') {
				var input = '<input  elementsid="input_numberrangepassword_"' + self.id + ' ' + __disabled + ' pid="' + self.id + '" class="' + self.type + ' input" placeholder="' + (self.placeholder || "") + '" value="' + self.render(true) + '" type="password">';

				return input;

			}

			if (self.type == 'label') {
				return `<div elementsid="${self.id}" ${__disabled} ${m} pid="${self.id}" class="simpleColor inpLabel">${self.value}</div>`
			}

			if (self.type == 'file_select') {
				return `
			   <input  elementsid="input_file_select_${self.id}" ${__disabled} ${m} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">
			   <button elementsid="button_file_select_${self.id}" ${__disabled} ${m} pid="${self.id}_Selector" class="simpleColor inpButton btn_select">...</button>
		   `;
			}

			if (self.type == 'button') {
				return `<button elementsid="button_${self.id}" ${__disabled} ${m} pid="${self.id}" class="simpleColor inpButton" value="${self.value}">${self.text}</button>`
			}

			if (self.type == 'number') {
				return `<input  elementsid="button_${self.id}_2" ${__disabled} step="${deep(self, 'format.Step') || ''}" min="${deep(self, 'format.Min') || ''}" max="${deep(self, 'format.Max') || ''}" pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="number">`
			}

			var input = `<input  elementsid="button_${self.id}_2" ${__disabled} ${m ? m : ''} pid="${self.id}" class="${self.type} input" placeholder="${(self.placeholder || "")}" value="${self.render(true)}" type="text">`

			return input;
		}

	self.render = function (clear, index) {

		if (self.renders[self.type]) {
			return self.renders[self.type](clear, index);
		}
		else {
			if (_.isArray(self.value) && typeof index != 'undefined') {
				return self.value[index] || ''
			}
			return self.value;
		}

	}

	self.sets = {
		hours: function (value, index, index2) {

			if (!self.value[index])
				self.value[index] = {
					start: null,
					end: null
				}

			self.value[index][index2] = value;

		},
		location: function (value) {

			if (value) {
				if (value.country) self.value.country = value.country
				if (value.latitude) self.value.latitude = value.latitude
				if (value.longitude) self.value.longitude = value.longitude
				if (value.place) self.value.place = value.place
				if (value.radius) self.value.radius = value.radius
				if (value.zip) self.value.zip = value.zip
				if (typeof value.using != 'undefined') self.value.using = value.using
			}
			else {
				self.value = self.default()
			}


			/*self.value = value;*/
		},
		number: function (value) {

			value = Number(value)

			self.value = value;

		},
		numberrange: function (value, index) {



			if (value !== '')

				value = Number(value)

			if (!_.isNumber(value)) value = '';

			self.value[index] = value;
		},
		cash: function (value) {

			value = Number(value)

			if (!_.isNumber(value)) value = null;

			self.value = value;

		},
		cashrange: function (value, index) {
			if (value !== '')

				value = Number(value)

			if (!_.isNumber(value)) value = '';

			self.value[index] = value;
		},
		daterange: function (value, index) {

			self.value[index] = value;

		},
		image: function (value) {
			if (typeof value == 'array' || !value) {
				self.value = value;
			}
			else {
				self.value.push(value);
			}
		},
		valuesmulti: function (value) {


			if (_.indexOf(self.value, value) > -1) {
				removeEqual(self.value, value)
			}
			else {
				self.value.push(value)
			}

		},

		valuesmultibig: function (value) {


			if (_.indexOf(self.value, value) > -1) {
				removeEqual(self.value, value)
			}
			else {
				self.value.push(value)
			}

		},

		valuesmultitree: function (value) {
			self.value = value;
		}
	}

	self.set = function (value, index, additional) {

		if (value == '___nochange') {

		}
		else {
			if (typeof value == 'undefined')

				self.value = self.default();

			else {

				if (self.calculation) value = self.calculation(value);

				if (!self.sets[self.type]) {
					self.value = value;
				}
				else {
					self.sets[self.type](value, index, additional);
				}

			}
		}



		if (self._onChange)
			self._onChange(self.value, self);

		if (self.onChange)
			self.onChange(self.value, self);

	}

	self.get = function () {

		if (self.dbConvert) return self.dbConvert(self.value)

		return self.value;

	}

	if (self.type == 'valuesmultitree') {

		self.clear = function () {
			_.each(self.treemap, function (m) {
				m.active = false
			})

		}

		self.convertValuesToAll = function (key, withgroup) {
			if (!key) key = 'id';

			if (key == 'names') key = 'name'

			var values = _.map(self.value, function (id) {
				var value = self.treemap[id];

				return value;
			})


			var result = [];

			self.every({
				group: function (i, j, k, n) {

					if (withgroup) {
						result.push(i[key])
					}

					n()
				},
				value: function (v) {
					result.push(v[key])
				}
			}, values)

			return result
		}

		self.convertValues = function (key) {
			if (!key) key = 'id';

			if (key == 'names') key = 'name'

			return _.map(self.value, function (id) {
				var value = self.treemap[id];

				return value[key];
			})
		}

		self.composeValues = function (adding, removing) {
			var n = {};

			_.each(self.value, function (v, i) {
				if (!removing[v]) n[v] = true;
			})

			_.each(adding, function (v, i) {
				if (!removing[i]) n[i] = true;
			})

			return n;
		}

		self.childselected = function (value, adding, removing) {

			var n = self.composeValues(adding, removing);

			var v = _.filter(value.values, function (v) {
				if (n[v.id]) return true;
			})

			return value.values.length == v.length

		}

		self.parentselected = function (value, adding, removing) {

			var n = self.composeValues(adding, removing);

			var step = function (value) {
				if (n[value.id]) return value;

				if (value.parent) {
					return step(value.parent)
				}
				else {
					return null;
				}
			}

			if (!value) return null;

			return step(value)


		}

		self.every = function (actions, values, level) {

			var onlevel = function (values, level) {

				var l = values.length;

				for (var index = 0; index < l; index++) {
					value = values[index]

					if (value) {
						if (value.values) {

							actions.group(value, level, index, function () {

								onlevel(value.values, level + 1);

							}, index)

						}
						else {
							actions.value(value, level, index)
						}
					}


				}

			}

			if (!values) values = self.possibleValues
			if (!level) level = 0

			onlevel(values, 0);
		}

		self.preparemap = function () {

			self.treemap = {};

			self.every({
				value: function (v, l) {
					v.active = false;
					self.treemap[v.id] = v;
				},
				group: function (v, l, index, next) {
					self.treemap[v.id] = v;

					_.each(v.values, function (value) {
						value.parent = v;

						value.parents || (value.parents = [v]);

						_.each(v.parents || [], function (p) {
							value.parents.push(p)
						})


					})



					next()
				}
			})

		}

		self.preparemap()

	}

	self.searchValues = function (str) {

		str = str.toLowerCase()

		var res = {};

		var a = function (v) {
			if (v.id == str || (v.name.toLowerCase().indexOf(str) > -1)) {
				res[v.id] = v

			}
		}

		self.every({
			group: function (v, l, i, clbk) {
				a(v);

				clbk()
			},
			value: a
		})

		return res

	}



	if (self.value === null)
		self.value = self.default();



	return self;
}

flb = function (str) {

	if (!str) return ""
	if (!str[0]) return str
	if (!str.substr) return str

	return str[0].toUpperCase() + str.substr(1);
}

emptyFunction = function () {
	return true;
}

var ___mobile = undefined
var ___tablet = undefined

isMobile = function () {

	if (typeof ___mobile != 'undefined') {
		return ___mobile
	}

	___mobile = $('html').hasClass('mobile');

	return ___mobile
}

isTablet = function () {

	if (typeof ___tablet != 'undefined') {
		return ___tablet
	}

	___tablet = $('html').hasClass('mobile') || $('html').hasClass('tablet');

	return ___tablet

}

clickAction = function () {

	return 'click'

	/*if (isTablet()) return 'touchend'

	return 'click'*/
}


os = function () {
	var os = null;


	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "macos";
	if (navigator.appVersion.indexOf("iPhone") != -1) os = "ios";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	if (navigator.appVersion.indexOf("Android") != -1) os = "android";

	return os
}




collectParameters = function (uParts, exclude) {
	var uri = '?';

	_.each(uParts, function (part, _part) {
		if ((!exclude || _.indexOf(exclude, _part) == -1) && part) {
			uri += _part + '=' + part + '&';
		}
	})

	uri = uri.slice(0, -1);

	return uri;
}


maskValue = function (p) {
	if (!p) p = {};

	p.decimal || (p.decimal = '.');
	p.allowNegative || (p.allowNegative = true);
	p.precision || (p.precision = 0);
	p.thousands || (p.thousands = ',');
	p.prefix || (p.prefix = '');
	p.suffix || (p.suffix = '');

	if (p.value) p.value = "" + p.value;
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

Math.log2 = Math.log2 || function (x) {
	return Math.log(x) / Math.LN2;
};


/* ______________________________ */

/* LOADERS */

GetBrowser = function () {
	var N = navigator.appName,
		ua = navigator.userAgent,
		tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
	M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
	return M[0];
}

_saveAs = function (p) {


	if (window.navigator.msSaveOrOpenBlob) {
		var file = new Blob([decodeURIComponent(p.file)], { type: "text/" + p.format + ";charset=utf-8;" });

		window.navigator.msSaveOrOpenBlob(file, p.name + "." + p.format);
	}
	else {

		saveAs(p)

	}
}

p_saveAs = function (p) {
	if (GetBrowser().toLowerCase() == 'msie') {
		message('Internet Explorer does not support this operation.');
		return false;
	}

	if (!p) p = {};

	var save = document.createElement('a');
	document.body.appendChild(save);

	save.download = p.download || ((p.name || 'unknown') + "." + p.format.toLowerCase());

	save.target = '_blank';

	if (!p.noA) {
		if (p.format.toLowerCase() == 'xlsx') p.file = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + p.file;
		if (p.format.toLowerCase() == 'csv') p.file = 'data:text/csv;charset=utf-8,' + p.file;
		if (p.format.toLowerCase() == 'pdf') p.file = 'data:application/pdf;base64,' + p.file;

		if (p.format.toLowerCase() == 'txt') p.file = 'data:text;charset=utf-8,' + p.file;
	}


	save.href = p.file;
	save.click();

	//save.remove();

	return true;
}

b64toBlob = function (b64Data, contentType, sliceSize) {
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
	var blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

p_saveAsWithCordova = function (file, name, clbk, todownloads) {

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

		fileSystem.getDirectory('Download', { exclusive: false, create : true }, function (directory) {

			directory.getFile(name, { create: true, exclusive: false }, function (entry) {
				// After you save the file, you can access it with this URL
				var myFileUrl = entry.toURL();
				var haserror = false

				entry.createWriter(function (writer) {

					writer.onwriteend = function (evt) {
						if(haserror) return
						//sitemessage("File " + name + " successfully downloaded");

						if (window.galleryRefresh) {

							window.galleryRefresh.refresh(myFileUrl, function (msg) {

							}, function (err) {


							})

						}

						if (clbk)
							clbk({
								name,
								url: myFileUrl
							})
					};

					writer.onerror = function (e) {
						haserror = true
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

					if (clbk) clbk(null, error)

				});
			}, function (error) {

				/*dialog({
					html : "Error: Could not create file, " + error.code,
					class : "one"
				})*/

				if (clbk) clbk(null, error)

			});

		})
	}

	var onerror = function (evt) {
		if (clbk) clbk(null, evt)
	}

	if (todownloads) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			onsuccess(fileSystem.root)
		}, function(){

			p_saveAsWithCordova(file, name, clbk)
			
		})
	}
	else {
		window.resolveLocalFileSystemURL(storageLocation, onsuccess, onerror)
	}

}

//Da_Ki

saveBase64File = function(name, base64, type){
		
	return new Promise((resolve, reject) => {

		var format = fkit.extensionBase64(base64)

		if (window.cordova) {

			var fl = b64toBlob(base64.split(',')[1], type);

			p_saveAsWithCordova(fl, name + '.' + format, function (d, e) {
	
				if(e) return reject(e)

				return resolve(d)
				
			}, true)
	
		}
	
		else {
			p_saveAs({
				file: base64,
				format: format,
				name: name
			})

			return resolve({name})
		}
	})
	
}

downloadFileByUrl = function(url){

	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function () {

			var type = xhr.getResponseHeader("content-type");
			var blob = new Blob([xhr.response], { type: type, name: "file" })

			getBase64(blob).then((base64) => {

				resolve({
					base64,
					type
				})

			})

		};

		xhr.onerror = function (e) {
			console.error(e, url);
			reject(new TypeError("Request failed"));
		};

		xhr.open("GET", url);
		xhr.responseType = "arraybuffer";
		xhr.send(null);
	});

}

/* ______________________________ */

/* NAVIGATION */




_scrollTop = function (scrollTop, el, time, direction) {

	if (!direction) direction = 'Top'

	if (!el || el.attr('id') == 'application') {
		el = $("body,html");
	}

	if (typeof time == 'undefined') {
		time = 200;
	}

	if (time) {

		var a = {}

		a['scroll' + direction] = scrollTop

		el.animate(a, time);
	}
	else {
		el['scroll' + direction](scrollTop)
	}


}

_scrollTo = function (to, el, time, ofs, direction) {

	if (!direction) direction = 'Top'

	if (!to) to = $(this);

	var ofssetObj = to.offset();

	var offset = 0

	if (direction == 'Top') {
		offset = (to.height() - $(window).height()) / 2;

		if (window.cordova && !isios()) {
			offset = offset + $(window).height() / 4
		}
	}

	if (direction == 'Left') offset = (to.width() - $(el).width()) / 2;

	if (ofssetObj) {
		var scrollTop = ofssetObj[direction.toLowerCase()] + offset;

		if (el) scrollTop = scrollTop + el['scroll' + direction]() - el.offset()[direction.toLowerCase()]

		scrollTop = scrollTop + (ofs || 0)

		_scrollTop(scrollTop, el, time, direction);
	}

}

_scrollToTop = function (to, el, time, offset) {

	if (!to) to = $(this);

	if (!offset) offset = 0;

	var ofssetObj = to.offset();

	if (ofssetObj) {
		var scrollTop = ofssetObj.top + offset;

		if (el) {
			try {
				scrollTop = scrollTop + el.scrollTop() - el.offset().top + offset
			}
			catch (e) { }

		}

		_scrollTop(scrollTop, el, time);
	}

}

_scrollToBottom = function (to, el, time, offset) {

	if (!to) to = $(this);

	if (!offset) offset = 0;

	var ofssetObj = to.offset();

	if (ofssetObj) {
		var scrollTop = ofssetObj.top + offset + to.height();

		if (el) scrollTop = scrollTop + el.scrollTop() - el.offset().top + to.height() + offset

		_scrollTop(scrollTop, el, time);
	}

}


inView = function (els, p) {

	var st = 0,
		sh = 0;

	var w = 'auto'

	if (!p) p = {};

	if (!p.inel) {
		p.inel = $(window);
		st = p.app.lastScrollTop;
		sh = p.app.height;
		w = p.app.width;
	}

	else {

		inel = p.inel

		try {
			p.elOffset = p.inel[p.f]().top
		}
		catch (e) {
			p.elOffset = 0;
		}

		st = inel.scrollTop()
		sh = inel.height()
		w = inel.width()
	}

	if (!p.offset) {
		p.offset = 0;
	}

	p.f || (p.f = 'offset')

	p.elOffset = 0;

	if (!p.mode) p.mode = "part";

	var inel = p.inel // $(p.inel);

	var range = {
		top: st - p.offset,
		bottom: st + sh + p.offset
	}

	var rangeLine = {
		top: st + p.offsetTop,
		bottom: st + sh - p.offsetBottom
	}

	var _fels = els.filter(function () {

		var el = $(this);

		var offsetTop = p.cache && el.data('c_' + w + '_' + p.f) ? el.data('c_' + w + '_' + p.f) : el[p.f]().top,
			height = p.cache && el.data('c_' + w + '_height') ? el.data('c_' + w + '_height') : el.height(),
			bottom = offsetTop + height;

		el.data('c_' + w + p.f, offsetTop)
		el.data('c_' + w + '_height', height)

		var _part = offsetTop >= range.top && offsetTop < range.bottom ||
			bottom <= range.bottom && bottom > range.top;

		var _all = offsetTop >= range.top &&
			bottom <= range.bottom

		if (p.mode == 'line') {
			var line = offsetTop - st < rangeLine.top && offsetTop + height > rangeLine.bottom
			return line
		}

		if (p.mode == 'partall') {
			if (_all) {
				el.data('inView', 'all');
				return true;
			}

			if (_part) {
				el.data('inView', 'part');
				return true;
			}
		}

		if (p.mode == "part") {
			if (_part)

				return true;
		}

		if (p.mode == "all") {

			if (_all)
				return true;
		}
	})

	if (p.mode == 'partall') {
		_fels = _fels.sort(function (a, b) {

			a = $(a);
			b = $(b);

			if (a.data('inView') == b.data('inView')) return 0;

			if (a.data('inView') == 'all') return -1;

			if (a.data('inView') == 'part') return 1;
		})
	}

	return _fels;
}



var ease = {
	linear: function (t) { return t },
	// accelerating from zero velocity
	inQuad: function (t) { return t * t },
	// decelerating to zero velocity
	outQuad: function (t) { return t * (2 - t) },
	// acceleration until halfway, then deceleration
	inOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
	// accelerating from zero velocity
	inCubic: function (t) { return t * t * t },
	// decelerating to zero velocity
	outCubic: function (t) { return (--t) * t * t + 1 },
	// acceleration until halfway, then deceleration
	inOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
	// accelerating from zero velocity
	inQuart: function (t) { return t * t * t * t },
	// decelerating to zero velocity
	outQuart: function (t) { return 1 - (--t) * t * t * t },
	// acceleration until halfway, then deceleration
	inOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
	// accelerating from zero velocity
	inQuint: function (t) { return t * t * t * t * t },
	// decelerating to zero velocity
	outQuint: function (t) { return 1 + (--t) * t * t * t * t },
	// acceleration until halfway, then deceleration
	inOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}


SwipeParallaxNew = function (p) {
	if (!p) p = {};

	p.directions || (p.directions = {})

	_.each(p.directions, function (d, i) {
		d.i = i
	})

	var self = this;
	var needclear = false

	self.destroyed = false

	var throttle = isios() ? 0 : 50
	var transitionstr = throttle ? '' + throttle + 'ms linear' : 'none'


	let ticking = false;

	var directiontoprop = function (direction, value) {

		if (direction == 'up') return 'y'
		if (direction == 'down') return 'y'
		if (direction == 'left') return 'x'
		if (direction == 'right') return 'x'

	}

	var ms = false

	var set = function (direction, value) {

		var __el = (p.transformel || p.el)[0]

		var prop = directiontoprop(direction);
		var pd = 'left'
		var pb = 'top'

		var scaledifmax = 0.1
		var scaledif = scaledifmax * Math.min(Math.abs(value), 100) / 100
		var scale = (1 - scaledif).toFixed(3)

		if (direction == 'up' || direction == 'left') {
			value = -value
			pd = 'right'
			pb = 'bottom'
		}

		if (p.directions[direction] && p.directions[direction].basevalue) value = value + p.directions[direction].basevalue()

		if (p.directions[direction] && p.directions[direction].scale100) scale = 1

		if (!value) value = 0

		value = value.toFixed(0)

		if (prop == 'x') {
			__el.style["transform"] = "translate3d(" + value + "px, 0, 0)"

			//if(!ms)
			//__el.style['transform-origin'] = pd + ' center'
		}

		if (prop == 'y') {
			__el.style["transform"] = "translate3d(0, " + value + "px, 0)"

			//if(!ms)
			//__el.style['transform-origin'] = 'center ' + pb
		}

		if (!ms) {

			__el.style["-moz-transition"] = transitionstr
			__el.style["-o-transition"] = transitionstr
			__el.style["-webkit-transition"] = transitionstr
			__el.style["transition"] = transitionstr

			__el.style["-webkit-overflow-scrolling"] = 'touch'
		}

		ms = true

	}

	var applyDirection = function (direction, v, e) {
		if (direction.positionclbk) {
			needclear = true
			direction.positionclbk(v, e)
		}
	}

	self.clear = function () {

		if (needclear) {

			var __el = p.transformel || p.el


			__el.css({ "transform": "" });

			__el.css({ "-moz-transition": transitionstr });
			__el.css({ "-o-transition": transitionstr });
			__el.css({ "-webkit-transition": transitionstr });
			__el.css({ "transition": transitionstr });


			__el.css({ "-webkit-overflow-scrolling": '' });

			_.each(p.directions, function (d) {
				applyDirection(d, 0)
			})


			setTimeout(() => {
				__el.css({ "-moz-transition": "" });
				__el.css({ "-o-transition": "" });
				__el.css({ "-webkit-transition": "" });
				__el.css({ "transition": "" });

				__el = null
			}, 100)
		}

		ms = false
		needclear = false
	}

	self.init = function () {

		var mainDirection = null;

		var statusf = function (e, phase, direction, distance) {

			//if(phase == 'start' && !direction) return // ?

			if (self.destroyed) return

			if (mainDirection && mainDirection.i != direction) {
				phase = 'cancel'
				direction = mainDirection.i
			}

			if (phase == 'cancel' || phase == 'end') {

				if (mainDirection) {

					if ((phase == 'end' || mainDirection.distance < 50 && phase == 'cancel') && mainDirection.clbk && direction == mainDirection.i) {

						if ((!mainDirection.distance || mainDirection.distance < distance)) {
							mainDirection.clbk()
						}

					}
				}

				self.clear()
				document.ontouchmove = () => true

				return

			}


			if (!direction || !p.directions[direction]) {
				return true
			}

			var dir = p.directions[direction]

			if (dir.constraints && !dir.constraints(e)) {

				if (mainDirection) {
					mainDirection = null;
				}

				if (e.cancelable !== false) {
					e.stopPropagation();
					e.preventDefault();
				}

				return false
			}

			if (e.cancelable !== false) {
				e.stopPropagation();
				e.preventDefault();
			}

			if (phase == 'start') {
				mainDirection = null

				document.ontouchmove = (e) => {

					e.stopPropagation();
					e.preventDefault();

					return false
				}
			}

			if (phase == 'move') {

				if (distance > (dir.trueshold || 30)) {

					mainDirection = dir

					applyDirection(mainDirection, distance, e)

					set(mainDirection.i, distance)

					if(mainDirection.endmove){
						if ((!mainDirection.distance || mainDirection.distance < distance)) {
							mainDirection.clbk()
							self.clear()
							document.ontouchmove = () => true
						}
					}

				}

				

				if (e.cancelable !== false) {
					e.stopPropagation();
					e.preventDefault();
				}

				return true
			}

		}

		p.el.swipe({
			preventDefaultEvents: p.preventDefaultEvents,
			allowPageScroll: p.allowPageScroll,
			swipeStatus: throttle ? _.throttle(statusf, throttle) : statusf,
		})

		return self
	}

	self.destroy = function () {

		p.el.swipe('destroy')
		p = {}
		needclear = false

		self.destroyed = true

	}

	return self;
}

/* TODO_REF_ACTIONS */
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

	if (p._in) {
		tp = 'position'
	}

	var self = this;
	self.addscroll = false;

	if (p._in) {
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

		if (!p.removeSpacer) {
			spacer = $("<div>", {
				class: classes.spacer + " " + id,
				height: p.spacerHeight || caption.height(),
				width: caption.width()
			})

			caption.before(spacer);

			w = spacer.width();
		}

		else {
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

		if (self.addscroll) {
			top = top + s
			bottom = bottom + s
		}

		if (typeof p.iniHeight != 'undefined') {
			bottom = bottom - p.iniHeight
		}
		else {
			bottom = bottom - caption.height();
		}

		var sh = s + _in.height()


		if (p.calculations) {
			if (p.calculations.bottom)
				bottom = p.calculations.bottom(caption, offset);

			if (p.calculations.top)
				top = p.calculations.top(caption, offset);
		}


		if ((pos == 'top' && s > top && s < bottom) || (pos == 'bottom' && sh > top && sh < bottom + caption.height())) {
			if (!fixed)
				toFixed();
		}
		else {
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

		if (!container) {
			container = caption.parent();
		}

		initEvents();

		return self;
	}

	self.setOffset = function (_offset) {
		offset = _offset;
		clear();
		action();
	}

	self.setIn = function (__in) {

		if (!__in) {
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

						try{
							data = JSON.parse(r.responseText);

							if(typeof p.errors == 'undefined' || p.errors == true)
							{
								e = error(data.status, p, data.data);
							}
							
						}catch(e){
							e = error(null, p);
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

				try{

					// Get or refresh access token
					var xmlHttp = new XMLHttpRequest();

				
					xmlHttp.open("POST", p.url + 'users/token', false);
					xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					
	
					xmlHttp.onload = function() {

						try{
							var res = JSON.parse(xmlHttp.responseText), auth;
							// Set auth header
							if (res && res.access_token) {
								auth = 'Bearer ' + res.access_token;
							}
		
							else{
								if (p.fail)
									p.fail({}, 'network');
		
								return
							}
		
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
						}
						catch(e){
							if (p.fail)
								p.fail({}, 'network');
		
								return
						}
	
						
	
					}
	
					xmlHttp.onerror = function(e) {
						if (p.fail)
							p.fail({}, 'network');
					};
	
					xmlHttp.send(toUrlEncoded({
						grant_type: 'password',
						...app.peertubeCreds
					}));
				}

				catch(e){
					if (p.fail)
						p.fail({}, 'network');
				}

				

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

/* ______________________________ */

/* DOM */

before = function (el, h) {
	el.before(h);
}
after = function (el, h) {
	el.after(h);
}
html = function (el, h) {
	el.html(h);
}
append = function (el, h) {
	el.append(h);
}

replaceWith = function (el, h) {

	var hj = $(h)

	el.replaceWith(hj);

	return hj
}

prepend = function (el, h) {
	el.prepend(h);
}


decodeSeoLinks = function (link) {
	link = link.replace(/;equal;/g, "=")
	link = link.replace(/;ques;/g, "?")

	return link
}

encodeSeoLinks = function (link) {
	link = link.replace(/=/g, ";equal;")
	link = link.replace(/\?/g, ";ques;")

	return link
}
var copycleartext = function (text) {
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
var copyText = function (el) {

	var text = trim(el.attr('text') || el.text() || el.val());

	copycleartext(text)
}

/* ______________________________ */

/* INPUTS */


function ecaretPosition(_el, i, j) {
	var el = _el[0];
	var range = document.createRange();
	var sel = window.getSelection();

	range.setStart(el.childNodes[i], j);

	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}



fastars = function (el) {

	/*el.find('i').on('mouseenter', function () {

		var _el = $(this).closest('.stars')

		if (_el.attr('value')) return;

		var v = $(this).attr('value')

		_el.attr('tempValue', v)
	})

	el.find('i').on('mouseleave', function () {
		var _el = $(this).closest('.stars')
		_el.removeAttr('tempValue')
	})*/

}


mobsearch = function (el, p) {

	if (p.mobileSearch && p.app) {
		window.rifticker.add(() => {

			el.html('<div class="mobsearch tvfocusedopacity">' + (p.icon || p.placeholder) + '</div>')
			el.find('div').on('click', function () {
				p.app.platform.ui.mobilesearch(p)
			})

		})

		return null

	}
	else {
		return new search(el, p)
	}

}

search = function (el, p) {

	var self = this;

	if (!p) p = {};

	p.events || (p.events = {})

	var searchEl = null;
	var fastResult = null;

	var bsActive = false;
	var fsActive = false;

	var currentFastId = '0';

	self.placeholder = function (placeholder) {
		el.find('input').attr('placeholder', placeholder)
	}

	self.setvalue = function (value) {
		el.find('input').val(value)

		if (value)
			searchEl.addClass('searchFilled')
		else
			searchEl.removeClass('searchFilled')
	}

	var template = function () {

		p.class || (p.class = "")

		var elements = [

			'<div elementsid="template_searchIconLabel_' +  (p.id || p.placeholder) + '" class="searchIconLabel tvfocusedopacity">' + (p.icon ||
				'<i class="fa fa-search" aria-hidden="true"></i>' +
				'<i class="fas fa-circle-notch fa-spin"></i>') +
			'</div>',

			'<div class="searchInputWrapper">' +
				'<input  elementsid="sminputsearch_' + (p.id || p.placeholder) + '" class="sminput" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="' + (p.placeholder || "Search") + '">' +
			'</div>',

			'<div class="searchPanel">' +
				'<div class="searchPanelWrapper">' +
					'<div class="searchPanelItem tvfocusedopacity" event="clear">' +
						'<i class="fa fa-times-circle" aria-hidden="true"></i>' +
					'</div>' +
				'</div>' +
			'</div>'

		]

		if (p.right) {
			elements.reverse();

			p.class += " right";
		}


		if (p.collectresults) {
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
		openResults: function () {

			if (!searchEl.hasClass('fastSearchShow')) {
				searchEl.addClass('fastSearchShow');

				if (!p.closeByHtmlRemove)

					$('html').on('click', helpers.closeclickResults)
			}


		},
		closeResults: function () {

			if (!p.closeByHtmlRemove)
				$('html').off('click', helpers.closeclickResults);

			if (searchEl)
				searchEl.removeClass('fastSearchShow');
		},
		closeclickResults: function (e) {
			if (!searchEl || (searchEl.has(e.target).length === 0 && searchEl.hasClass('fastSearchShow'))) {
				helpers.closeResults();
			}
		},
		clear: function () {
			searchEl.find('.sminput').val('');

			searchEl.removeClass('searchActive');
			searchEl.removeClass('searchFilled');
		}
	}

	var events = {
		active: function () {
			if (p.events.active) p.events.active(self.active);
		},
		clear: function (el) {
			if (!searchEl) return

			var value = searchEl.find('.sminput').val()

			searchEl.find('.sminput').val('');

			searchEl.removeClass('searchActive');
			searchEl.removeClass('searchFilled');

			helpers.closeResults();

			if (p.events.clear) p.events.clear(value);

		},
		search: function (el) {
			var value = el.val();

			currentFastId = 0;

			bsActive = false;

			helpers.closeResults();

			if (p.events.search && value) {

				bsActive = true;

				searchEl.addClass('searchActive')

				p.events.search(value, function (r) {

					if (!searchEl) return

					currentFastId = 0;

					bsActive = false;

					helpers.closeResults();

					searchEl.removeClass('searchActive');

					if (!fsActive)
						searchEl.removeClass('searchActive')

				}, events, helpers);
			}
		},
		showlast: function () {
			var result = p.last.get();

			if (result.length) {

				p.last.tpl(result, function (r, revents) {

					fastResult.html(r);

					helpers.openResults();

					if (revents) {
						revents(fastResult, helpers)
					}

				})
			}
		},
		fastsearch: function (el, e, _currentFastId) {
			var value = el.val();

			if (!searchEl) return

			if (value && p.events && p.events.fastsearch && !bsActive) {

				searchEl.addClass('searchActive')
				fsActive = true;

				currentFastId = (_currentFastId || makeid());

				var thisSearch = currentFastId;

				p.events.fastsearch(value, function (r, revents) {

					if (thisSearch != currentFastId || !el.val() || bsActive) return;

					fsActive = false;

					searchEl.removeClass('searchActive')

					if (r) {

						fastResult.html(r);

						helpers.openResults();

						if (revents) {
							revents(fastResult, helpers)
						}

					}

				}, e);
			}

			if (value) {
				searchEl.addClass('searchFilled')
			}
			else {
				helpers.closeResults();

				searchEl.removeClass('searchFilled');

				if (fsActive)
					searchEl.removeClass('searchActive')

				if (p.last) {
					events.showlast(el)
				}

				if (p.events.clear)
					p.events.clear(true);
			}
		}
	}


	self.clear = events.clear

	self.setactive = function (a) {
		self.active = a

		events.active()
	}

	self.hide = function () {
		searchEl.removeClass('searchActive');
		searchEl.removeClass('searchFilled');

		helpers.closeResults();
	}

	self.blur = function () {
		el.find('input').blur()
	}

	self.focus = function () {
		el.find('input').focus()
	}

	self.getvalue = function () {
		return searchEl.find('.sminput').val()
	}

	self.template = template

	var initEvents = function () {

		var searchInput = el.find('input')

		var slowMadeTimer;

		searchInput.on('keyup', function (e) {

			if ((e.keyCode || e.which) != 13) {

				if (typeof p.time == 'undefined') {
					p.time = 450;
				}

				if (!p.time) {
					events.fastsearch(searchInput, e)
				}
				else {

					var id = makeid()

					slowMadeTimer = slowMade(function () {
						events.fastsearch(searchInput, e, id)
					}, slowMadeTimer, p.time)

				}
			}
			else{
				events.search(searchInput)
				e.stopPropagation()
				e.preventDefault()
				return false
			}

		});

		searchInput.on('focus', function () {

			self.setactive(true)

			if ($(this).val()) { events.fastsearch(searchInput) }

			else
				if (p.last) {
					events.showlast(searchInput)
				}
		})

		searchInput.on('blur', function () {

			if (p.events.blur) p.events.blur($(this).val())

			/*setTimeout(function(){
				self.setactive(false)
			}, 300)*/
		})

		/*searchInput.on('keypress', function (e) {

			if ((e.keyCode || e.which) == 13) {
				events.search(searchInput)
			}

		});*/

		searchEl.find('.searchIconLabel').on('click', function () {

			if (!searchInput.val() && p.events.blank) {
				p.events.blank()
			}
			else

				events.search(searchInput)

		})

		searchEl.find('.searchPanelItem').on('click', function () {

			var panelItem = $(this)

			var event = panelItem.attr('event');

			if (events[event])
				events[event](panelItem)
		})
	}

	var init = function () {

		el.html(template());

		searchEl = el.find('.search');
		fastResult = el.find('.searchFastResultWrapper');

		initEvents();

		if (p.clbk)
			p.clbk(searchEl)

	}

	self.destroy = function () {
		searchEl = null;
		fastResult = null;

		bsActive = null;
		fsActive = null;

		el = null
		p = {}

		$('html').off('click', helpers.closeclickResults);
	}

	self.showlast = events.showlast

	init();

	return self

}


initUpload = function (p) {
	if (!p) p = {};


	var el = p.el,
		multiple = p.multiple || false,
		maxFileSize = (p.maxFileSize || 30) * 1024 * 1024,
		dropZone,
		input,
		mode = p.mode || "FS";

	var app = p.app

	if (!p.data) p.data = {};

	var focusHandler = function () {

		el.find('input').focus(function () {
			el.addClass("focus");
		}).blur(function () {
			el.removeClass("focus");
		});

	}

	var chekcext = function (file) {
		var name = file.name.split('.');
		var ext = name[name.length - 1].toLowerCase();

		if (p.ext) {
			if (_.isArray(p.ext)) {
				if (_.indexOf(p.ext, ext) == -1) return false
			}
			else {
				if (p.ext != ext) return false
			}
		}

		return true;
	}

	var readFile = function (reader, error, file, files, clbk) {

		reader.onloadend = (function (theFile) {
			return function (e) {

				var name = theFile.name.split('.');
				var ext = name[name.length - 1];


				if (clbk)
					clbk({
						base64: e.target.result,
						file: theFile,
						ext: ext,
						filesCount: files.length
					})

			}

		})(file);

		reader.onerror = function(e){
			error(e)
		}
	}

	var errorHandler = function (file, clbk) {
		if (file.size > maxFileSize) {

			clbk('filesize')
		}

		else

			if (!chekcext(file)) {

				clbk('fileext')

			}
			else {
				clbk(false)
			}
	}
	var stateChange = function (event, clbk) {
		if (event.target.readyState == 4) {

			if (event.target.status == 200) {

				var response = JSON.parse(event.target.response);

				clbk(response);

			}
			else {
				clbk()
			}
		}
	}

	var orientation = function (srcData, exifOrientation, clbk) {


		var img = new Image(),
			canvas = document.createElement("canvas"),
			ctx = canvas.getContext('2d');

		img.src = srcData;

		img.onload = function () {

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
	var imageresize = function (file, image, clbk) {
		if ((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jfif')) {
			resize(image, 2048, 2048, clbk)
		}

		else {
			if (clbk)
				clbk(image)
		}
	}

	var autorotation = function (file, image, clbk) {

		if ((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jfif') && !p.notexif && typeof EXIF != 'undefined' && !isios()) {
			EXIF.getData(file, function () {


				var allMetaData = EXIF.getAllTags(this);
				exifOrientation = allMetaData.Orientation;

				if (!exifOrientation) {
					if (clbk)
						clbk(image)
				}
				else {
					orientation(image, exifOrientation, function (image) {
						if (clbk)
							clbk(image)
					})
				}


			})
		}

		else {
			if (clbk)
				clbk(image)
		}
	}

	var upload = function (event) {

		var input = $(this);

		event.stopPropagation();
		event.preventDefault();
		dropZone.removeClass('hover');
		dropZone.addClass('loading');

		var files;

		if (typeof event.dataTransfer === 'undefined')
			files = this.files;
		else
			files = event.dataTransfer.files;

		var end = function () {

			dropZone.removeClass('loading');
			dropZone.removeClass('hover');
			dropZone.removeClass('focus');

			input.val('');
			input[0].value = ''
		}

		_.each(files, function (file) {
			file.id = makeid()
		})

		if (p.onStartUpload) {
			files = p.onStartUpload(files)
		}

		lazyEach({
			sync: true,
			array: files,
			all: {
				success: function () {

					end();

					if (p.onSuccess)
						p.onSuccess()
				},
				fail: function () {
					end();


					if (p.onFail)
						p.onFail()
				}
			},
			action: function (_p) {

				var file = _p.item;

				var processId = makeid();

				errorHandler(file, function (error) {

					var reader = new FileReader();

					var fs = ((maxFileSize / 1024) / 1024).toFixed(0)

					var et = {
						filesize: "Your photo has size greater than " + fs + "MB. Please upload a photo under " + fs + "MB in size.",
						fileext: "Invalid format of picture. Only png and jpeg are allowed"
					}

					if (p.app) {

						et = {
							filesize: self.app.localization.e('photohassizegreater', fs),
							fileext: self.app.localization.e('invalidformat')
						}
					}

					if (error) {
						if (p.onError) {
							p.onError(error, file, et[error]);
						}

						_p.fail();

						return
					}

					readFile(reader, error, file, files, function (fileObject) {
						imageresize(file, fileObject.base64, function (base64) {

							fileObject.base64 = base64;

							autorotation(file, fileObject.base64, function (base64) {

								fileObject.base64 = base64;

								if (error) {
									if (p.onError) {
										p.onError(error, fileObject, file, et[error]);
									}

									_p.fail();
								}
								else {
									

									if (p.beforeUpload) {
										p.beforeUpload(fileObject, processId)
									}

									if (p.server) {

										var fd = new FormData();
											fd.append('file', file);

											_.each(p.data, function (data, key) {

												if (typeof data == 'function') data = data();

												if (key == 'data') {
													if (p.user) {
														p.user.extendAjaxData(data);
													}
												}

												if (_.isArray(data) || _.isObject(data))
													data = JSON.stringify(data);

												fd.append(key, data);
											})
											
										var xhr = new XMLHttpRequest();

										xhr.onreadystatechange = function (e) {
											stateChange(e, function (response) {

												response = deep(response, 'root')

												if (!response || response.Result != 'Success') {
													if (p.onError) {
														p.onError('serverError', fileObject, file);
													}

													_p.fail();
												}
												else {
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

									else {

										if (p.action) {
											p.action(fileObject, _p.success)
										}
										else{
											_p.success();
										}

											
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


	var initEvents = function () {

		if (dropZone[0]) {
			dropZone[0].ondragover = function () {
				dropZone.addClass('hover');
				return false;
			};

			dropZone.on('dragout', function (event) {

				dropZone.removeClass('hover');
				return false;

			});

			dropZone[0].ondrop = upload;
		}


		if (p.uploadImage && app && app.mobile.supportimagegallery()) {

			input.on('click', function (e) {

				app.platform.ui.uploadImage(p)

				e.stopPropagation()

				return false

			});

			return
		}

		input.on('change', upload);

		input.on(clickAction(), function () {

			if (p.onStart)
				p.onStart();

		});
	}

	var init = function () {
		var m = '';

		if (multiple) m = 'multiple';

		var content = el.html();

		el.addClass("upload dropZone");
		el.wrapInner('<div class="fileUploader"><div class="elContent"></div></div>');
		el.find('.fileUploader').append('<div class="spinner"></div><div class="inputWrapper"><input elementsid="fileuploader_input" type="file" ' + m + '></div>');

		dropZone = p.dropZone || el,
			input = el.find('input');

		if (typeof (window.FileReader) == 'undefined') {
			dropZone.text('Не поддерживается браузером!');
			dropZone.addClass('error');
		}

		focusHandler();

		initEvents();
	}

	init();
}



/* ______________________________ */

/* EVENTS */
	globalpreloaderid = null;
	
	globalpreloader = function(show, dark, noremove){

		if(typeof window == 'undefined') return

		var el = $('#globalpreloader');

		var thisid = makeid()


		window.rifticker.add(() => {

			if (dark){
				el.addClass('dark')
			}
			else{
				el.removeClass('dark')
			}

			if(show){
				globalpreloaderid = thisid

				el.addClass('show')

				if(!noremove){
					setTimeout(() => {
						if (globalpreloaderid == thisid){
							globalpreloader(false)
						}
					}, 7000)
				}
				
			}
			else{
				el.removeClass('show')

				globalpreloaderid = null
			}

		})

		
	}



/* ______________________________ */


/* LOCALSTORAGE */

settingsLocalstorage = function (app) {
	var self = this,
		prefix = app.options.localStoragePrefix,
		data = {};

	var init = function () {
		_.each(app.map, function (item) {
			takeData(item.uri);
		})

		return this;
	}

	var takeData = function (uri) {
		if (typeof localStorage != 'undefined' && localStorage[prefix + uri]) {
			data[uri] = JSON.parse(localStorage[prefix + uri]);
		}
		else {
			data[uri] = {};
		}

		return this;
	}

	var putData = function (uri) {

		if (typeof localStorage != 'undefined' && data[uri]) {

			try {
				localStorage[prefix + uri] = JSON.stringify(data[uri])
			}

			catch (e) {
				return null
			}


		}

		return this;
	}

	self.get = function (uri, item) {
		if (uri == false)
			uri = 'general';

		takeData(uri);

		if (typeof item == "undefined")
			if (data[uri])
				return data[uri];
			else;

		else {

			if (typeof data[uri][item] != undefined) {
				return data[uri][item];
			}
		}
	}

	self.setAll = function (uri, _data) {
		if (uri == false) uri = 'general';
		_.each(data[uri], function (item, i) {
			data[uri][i] = _data;
		});

		return putData(uri);

	}

	self.set = function (uri, item, _data) {

		if (uri == false) uri = 'general';

		if (typeof item != "undefined") {
			if (!data[uri])
				data[uri] = {};

			data[uri][item] = _data;
		}
		else
			data[uri] = _data;

		return putData(uri);

	}

	self.delete = function (uri, item) {
		if (uri == false) uri = 'general';

		if (typeof item != "undefined") {

			if (!data[uri])
				data[uri] = {};

			delete data[uri][item];

			putData(uri);
		}



		return this;
	}

	self.clear = function () {
		//
		_.each(getVars(localStorage), function (_storage, uri) {
			if (uri.indexOf(prefix) > -1) localStorage.removeItem(uri);
		})
	}

	init();
	self.prefix = prefix;
	return self;
}



/* ______________________________ */

/* SWIPE */

function swipedetect(el, callback, handlemove) {

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
		handleswipe = callback || function (swipedir) { }

	touchsurface.addEventListener('touchstart', function (e) {
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		//e.preventDefault()
	}, false)

	touchsurface.addEventListener('touchmove', function (e) {



		// e.preventDefault() // prevent scrolling when inside DIV
	}, false)

	touchsurface.addEventListener('touchend', function (e) {
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime) { // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
				swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
				swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
			}
		}

		handleswipe(swipedir, distX, distY, elapsedTime)
		// e.preventDefault()

	}, false)
}

/* ______________________________ */

/* FUNCTIONS */

addToFunction = function (f, action) {

	var newFunction = function () {

		var args = [];

		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i])
		}

		if (f) f.apply(this, arguments);

		if (action) action(this, arguments)

	}

	return newFunction;

}

/* ______________________________ */

/* JQUERY */

if (typeof window != 'undefined') {

	retry(function () {

		return window.jQuery

	}, function () {

		; (function ($) {

			var $event = $.event,
				$special = $event.special,

				dragout = $special.dragout = {

					current_elem: false,

					setup: function (data, namespaces, eventHandle) {
						$('body').on('dragover.dragout', dragout.update_elem)
					},

					teardown: function (namespaces) {
						$('body').off('dragover.dragout')
					},

					update_elem: function(event){
						if( event.target == dragout.current_elem ) return
						if( dragout.current_elem ) {

							var pr = $(dragout.current_elem).parents()

							if (pr && pr.andSelf){
								pr.andSelf().each(function(){
									if($(this).find(event.target).size()==0) $(this).triggerHandler('dragout')
								})
							}

							
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
compressedNumber = function (num, n, N) {


	if (!num) return 0

	if (!N) N = 999

	if (!n) n = 0;

	if (Math.abs(num) < 1) return Number(num).toFixed(n)

	num = Number(num).toFixed(0)



	var keys = ['k', 'm', 'b'],
		kl = keys.length,
		index = false;

	for (var i = 0; i < kl && Math.abs(num) > N; i++) {
		num = (num / 1000);

		if (Number(num.toFixed(n)) == Number(num.toFixed(0))) {
			num = num.toFixed(0);
		}
		else {
			num = num.toFixed(n);
		}


		index = i;
	}

	ret = num;

	if (index !== false) ret += keys[index].toUpperCase();


	return ret;
};



/* ______________________________ */

/* TEXT */
pluralform = function (n, w) {

	if (n == 1) return w[0]

	return w[1];
}

decodeEntities = function (s) {
	const temp = document.createElement('p');
	temp.innerHTML = s;
	var v = temp.textContent || temp.innerText;

	temp.remove()

	return v
}

truncateString = function (str, n, useWordBoundary) {

	if (!str) return str

	if (!useWordBoundary) useWordBoundary = true

	if (str.length <= n) { return str; }
	var subString = str.substr(0, n - 1);
	return decodeEntities(useWordBoundary
		? subString.substr(0, subString.lastIndexOf(' '))
		: subString).replace(/(,|\.|\s)$/, '') + "...";
};

videoImage = function (url) {
	var v = url;

	if (!_.isObject(v)) v = parseVideo(v)

	if (v.type == 'youtube') {
		return 'https://img.youtube.com/vi/' + v.id + '/mqdefault.jpg'
	}

	if(v.type == 'vimeo'){
		return 'https://vumbnail.com/'+v.id+'.jpg'
	}

	if (v.type == 'peertube') {
		return null
	}
}


parseVideo = function(url) {
	if (!url) {
		return {};
	}

	let id = null;
	let type = null;
	let host_name = null;
	let subType = null;

	if (url.startsWith('peertube:')) {
		type = 'peertube';
		url = url.replace('peertube:', 'http:');
	}

	let hostname, pathname, searchParams;

	try {
		const urlParts = new URL(url);

		hostname = urlParts.hostname;
		pathname = urlParts.pathname;
		searchParams = urlParts.searchParams;
	} catch (err) {
		return {};
	}

	const path = pathname.slice(1);
	const pathParts = path.split('/');

	if (type === 'peertube') {
		host_name = hostname;

		if (path.includes('stream')) {
			subType = 'peertubeStream';

			id = pathParts[0];
		} else {
			subType = 'common';
			id = path;
		}
	} else if (hostname.includes('youtube.com')) {
		type = 'youtube';
		url = `https://youtu.be/${id}`;

		if (path.includes('watch')) {
			id = searchParams.get('v');
		} else if (path.includes('shorts')) {
			id = pathParts[1];
		}
	} else if (hostname.includes('youtu.be')) {
		type = 'youtube';
		id = path;
	} else if (hostname.includes('player.vimeo.com')) {
		type = 'vimeo';
		id = pathParts[1];
	} else if (hostname.includes('vimeo.com')) {
		if (!isNaN(path)) {
			type = 'vimeo';
			id = path;
		}
	} else if (hostname.includes('bitchute.com')) {
		type = 'bitchute';

		

		id = pathParts[1];
	} else if (hostname.includes('brighteon.com')) {
		type = 'brighteon';

		var ps = (path || "").split('?')[0]

		var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

		if(!pattern.test(ps)){
			return {}
		}


		id = ps;
	} else if (pathname.includes('/ipfs/')) {
		const ipfsIdRegex = /ipfs\/([A-z0-9]+)/;
		const ipfsId = path.match(ipfsIdRegex)[1];
		const isVideo = (searchParams.get('type') === 'video');

		if (!ipfsId || !isVideo) {
			return {};
		}

		type = 'ipfs';
		id = ipfsId;
	}

	/* else if (hostname.includes('stream.brighteon.com')) {
		type = 'brighteon';
		id = pathname.slice(1);
	}*/

	return { type, url, id, host_name, subType };
}


trimHtml = function (str, num, rowsNumber = 0) {

	var remove = function (tag) {

		var i = _.indexOf(openedTags, tag);

		if (i > -1) {
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

		cr = 0,
		currentTag = "";

	for (var i = 0; i < l && L < num && (!rowsNumber || cr < rowsNumber); i++) {
		var a = str[i];

		if (a == '\n') cr++

		if (a == "<") {
			if (str[i + 1] && str[i + 1] == "/") {
				fr = true;
				fll = true;
			}
			else {
				fl = true;
				fll = true;
			}

			currentTag = "";
		}

		else

			if (a == ">") {
				if (fr) {
					remove(currentTag);
				}

				if (fl & fll) {
					openedTags.push(currentTag);
				}

				fr = false;
				fl = false;
				fll = false;

				currentTag = "";
			}

			else {

				if (fr || fl) {
					if (a != " " & a != "/" & fll) {
						currentTag += a;
					}
					else {
						if (fl & fll) {
							openedTags.push(currentTag);
							fll = false;
						}
					}
				}

				else {
					if (!fll) L++;
				}

			}

		tr++;

	}

	if (str.length > tr) {
		result = str.substr(0, tr) + "...";

		_.each(openedTags, function (tag) {

			if (tag != 'br' && tag != 'img')

				result = result + "</" + tag + ">";
		})
	}

	return result;
}



vis = function (value, vis, fxd, spc) {

	fxd || (fxd = 0);

	var mmoneyparam = {
		thousands: ',',
		decimal: '.',
		allowZero: true,
		precision: 0,
		prefix: '$ ',
		input: false,
		allowNegative: true
	};

	spc || (spc = "&mdash;")

	if (vis) {

		if (typeof value == "undefined") return spc;

		if (vis == "percent") {
			var v = (value * 100).toFixed(fxd) + " %"

			return v
		}

		if (vis == "dollars") {
			mmoneyparam.value = Number(value).toFixed(fxd).toString();
			return maskValue(mmoneyparam)
		}

		if (vis == "dollarshtml") {
			mmoneyparam.prefix = '$&nbsp;'
			mmoneyparam.value = Number(value).toFixed(fxd).toString();
			return maskValue(mmoneyparam)
		}

		if (vis == "dollarslight") {
			mmoneyparam.prefix = '';

			mmoneyparam.value = Number(value).toFixed(fxd).toString();
			return maskValue(mmoneyparam)
		}

		if (vis == "range0-100") {
			var range = {
				0: "0",
				1: "<25%",
				26: "<50%",
				51: "<75%",
				76: ">75%",
			}

			return range[value]
		}

		if (vis == "yesno") {
			if (value == 'yes' || value == 1) return "Yes";

			if (value == 'no' || value == 0) return "No";

			if (!value) return ''
		}

		if (vis == "yesno12") {
			if (value == 'yes' || value == 1) return "Yes";

			if (value == 'no' || value == 2) return "No";

			if (!value) return ''
		}


		if (vis == "number") {
			if (!_.isNumber(Number(value)) || value.toString() == 'NaN' || value.toString() == 'undefined' || value.toString() == 'null') return spc

			value = Number(value).toFixed(fxd);

			mmoneyparam.prefix = '';

			mmoneyparam.precision = fxd;
			mmoneyparam.value = value;

			return maskValue(mmoneyparam)
		}

		if (vis == "date") {


			return convertDate(value)
		}
	}

	return value;
}



checkUrlForImage = function (url) {

	var ex = ['.jpg', '.gif', '.png', '.jpeg']


	url = url.split("?")[0].toLowerCase();

	var m = _.find(ex, function (e) {
		if (url.indexOf(e) > -1) {
			return true;
		}
	})

	if (m) return true;
}

donottrustLink = function (text) {

	return text.replace(/<a /g, '<a donottrust="donottrust" ')

}




boolToNumber = function (v) {

	if (v) return 1;

	else return 0

}


numberToBool = function (v) {

	if (v) return true;

	else return false

}

findAndReplaceLinkClearReverse = function(inputText = ''){
	return findAndReplaceLinkClear(inputText, formatInternalLinkReverse)
}

findAndReplaceLinkClear = function(inputText = '', fu){
	if (typeof linkifyStr != 'undefined') {
		var l = linkifyStr(inputText, {
			formatHref : (value, type) => {
				if (type == 'url'){
					value = (fu || formatInternalLinkHref)(value)
				}

				return value
			},

			render: (v) => {
				var href = deep(v, 'attributes.href') || ''

				href = href.replace('mailto:', '')

				return href
			},
		})

		return l
	}

	return inputText
}

findAndReplaceLink = function (inputText = '', nottrust) {


	if (typeof linkifyHtml != 'undefined') {

		try {

			var s = {
				cordovalink: '_system'
			}

			if (nottrust) {
				s.donottrust = 'true'
			}

			var l = linkifyHtml(inputText, {
				attributes: s,
				truncate: 50,

				format : (value, type) => {


					if(type == 'url'){
						value = formatInternalLink(value)
					}

					if(value.length > 50){
						value = value.slice(0, 50) + "…"
					}

					return value
				},

				formatHref : (value, type) => {


					if (type == 'url'){
						value = formatInternalLinkHref(value)
					}

					return value
				}
			})

			return l
		}

		catch (e) {
		}

	}

	return inputText
}


hideString = function (str) {

	var nstr = ''

	for (var i = 0; i < str.length; i++) {

		if (i < str.length * 0.666) nstr += "*"

		else
			nstr += str[i]

	}

	return nstr

}



/* ______________________________ */

/* CRYPTO */


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
		var c = 0, c1 = 0, c2 = 0, c3 = 0;

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
	extensions: {
		'image/png': 'png',
		'image/jpeg': 'jpg',
		'image/jpg': 'jpg',
		'image/gif': 'gif',
		'image/webp': 'webp',
		'image/jfif': 'jfif'

		//Da_Ki
	},
	extensionBase64: function (base64) {
		if (!base64) return ''

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

simpleRequest = function (url, name) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest

		xhr.onload = function () {

			//resolve(new Blob([xhr.response], { type: xhr.getResponseHeader('content-type'), name }))

			resolve(xhr.response)
		}

		xhr.onerror = function (e) {
			reject(e)
		}

		xhr.open('GET', url)
		//xhr.responseType = "arraybuffer"
		xhr.send(null)
	})
};

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

fetchLocalAppCopy = function (url, name = 'file') {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest

		xhr.onload = function () {

			var type = xhr.getResponseHeader('content-type').replace(' charset=UTF-8', '')

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

toUrlEncoded = function (obj) {

	return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

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


checkConnection = function () {
	if (typeof window != 'undefined') {
		if (window.cordova && navigator.connection && navigator.connection.type) {
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN] = 'UNKNOWN';
			states[Connection.ETHERNET] = 'ETHERNET';
			states[Connection.WIFI] = 'WIFI';
			states[Connection.CELL_2G] = '2G';
			states[Connection.CELL_3G] = '3G';
			states[Connection.CELL_4G] = '4G';
			states[Connection.CELL] = 'CELL';
			states[Connection.NONE] = 'NONE';

			return states[networkState]
		} else if (!window.cordova && navigator.connection && navigator.connection.type) {
			return navigator.connection.type
		} else {
			return ''
		}
	}
}

localSearch = function(s1 = '', s2 = '', level = 0.6){

	if(!s1) return 0
	if(!s2) return 1

	s1 = s1.toLowerCase()
	s2 = s2.toLowerCase()

	if (s1.indexOf(s2) > -1) return 1

	var parts = s1.split(/[ \t\v\r\n\f,.]+/)

	var m = 0
	
	_.each(parts, (part) => {
		var eq = stringEqTrig(part, s2)

		if (eq > level && eq > m) m = eq
	})

	if(m < 0 || !m) m = 0

	return m
}

stringEqTrig = function (s1, s2) {

	if (!s1) s1 = ''
	if (!s2) s2 = ''

	var bw = function (s) {
		return s.split(/[ \t\v\r\n\f,.]+/)
	}

	var hash = function (s) {

		var ps = bw(s).join(' ')

		return ps.toLowerCase().replace(/[^a-zа-я0-9&]*/g, '');
	}

	var makeTr = function (w) {
		var trs = {};

		var takeC = function (index) {
			var c;

			if (index < 0 || index >= w.length) c = "_";

			else c = w[index];

			return c;
		}

		for (var i = -1; i <= w.length; i++) {

			var tr = "";

			for (var j = i - 1; j <= i + 1; j++) {
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

	_.each(t1, function (t, index) {

		if (t2[index]) c++;

	})

	return c / m;


}


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

if (typeof window != 'undefined') {


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
		hideSplashScreen = function () {
			// Set the boolean, so we can stop during the end of the next animation
			stopRotation = true;
		}

		// Function triggered at the end of each rotating animation
		rotatingAnimationEnded = function () {
			
			// Check if we need to stop rotating and fade out
			if (stopRotation) {
				window.requestAnimationFrame(() => {

					if (!splashScreenIcon)
						return;

					splashScreenIcon.classList.remove("rotate");
					splashScreenIcon.classList.add('zoom-out-rotate');
					splashScreen.classList.add('fade-out');
					// When zoom out animation is done, completely remove the splash screen
					setTimeout(() => {
						// Clear interval if needed
						if (splashScreeninterval != undefined) {
							clearInterval(splashScreeninterval);
						}
						// Completely remove the splashscreen
	
						if (splashScreen)
							splashScreen.remove();
						splashScreenIcon = null
	
						splashScreen = null
					}, zoomOutDuration * 2);
				})
				
			}
		
		}

		// Wait until the zoom in is done
		setTimeout(() => {
			if (!splashScreenIcon)
				return;
			// Start rotating the logo
			window.requestAnimationFrame(() => {
				splashScreenIcon.classList.remove('zoom-in');
				splashScreenIcon.classList.add('rotate');
				// Triggered every times we reached the end of the rotating animation
				rotatingAnimationEnded();
				splashScreeninterval = setInterval(rotatingAnimationEnded, rotatingDuration);
			})
		}, zoomInDuration);

	}


}


waitPromise = function (time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}




drawRoundedImage = (url, radius, sWidth, sHeight) => {
	return new Promise(resolve => {
		if (!url) {
			resolve("");
			return;
		}
		
		// Check if URL is external
		const isExternalUrl = url.startsWith('http') && !url.includes(window.location.hostname);
		
		const image = new Image();
		
		// Set crossOrigin only for external URLs
		if (isExternalUrl) {
			image.crossOrigin = "anonymous";
		}
		
		image.onerror = (e) => {
			console.error("Ошибка загрузки изображения:", url, e);
			resolve("");
			return;
		}
		
		image.onload = () => {
			try {
				const canvas = document.createElement('canvas');
				canvas.width = sWidth || image.naturalWidth;
				canvas.height = sHeight || image.naturalHeight;
				const ctx = canvas.getContext('2d');

				const x = 0;
				const y = 0;
				const width = sWidth || image.naturalWidth;
				const height = sHeight || image.naturalHeight;
				const r = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };

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
				
				try {
					resolve(canvas.toDataURL('image/png', 1.0));
					return;
				} catch (exportErr) {
					// If export failed due to CORS, return the original URL
					resolve("");
					return;
				}
				} catch (err) {
				resolve("");
				return;
			}
		}
		
		// Set src after defining handlers to avoid a situation
		// where the image loads before event handlers are declared
		image.src = url;
		
		// Add a timeout in case the image loading hangs
		setTimeout(() => {
			if (!image.complete) {
				resolve("");
				return;
			}
		}, 10000);
	})
}


function getRandomFloat(min, max, decimals) {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);


	return parseFloat(str);
}

randomizer = function (ar, key) {

	if (!key) key = 'probability'

	if (!ar) return null
	if (!ar.length) return null

	ar = _.sortBy(ar, (r) => { return - Number(r[key] || 0) })

	var total = _.reduce(ar, function (sum, r) {
		return sum + Number(r[key] || 0)
	}, 0)

	if (total <= 0) return ar[rand(0, ar.length - 1)]

	var seed = getRandomFloat(0, total, 8)

	var counter = 0

	return _.find(ar, function (a) {

		if (counter + a[key] > seed && counter <= seed) {
			return true
		}

		counter = counter + a[key]

	})

}

randomizerarray = function (ar, count, key) {
	var r = []

	for (var i = 0; i < count; i++) {

		var v = randomizer(ar, key)

		if (v) {


			ar = _.filter(ar, function (_v) {
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

resizeGif = function (app) {
	var self = this
	var workerScript = null

	var transparentThreshold = 127
	var background = null
	var speedMultiplier = 1

	var relations = {}

	var loadworker = async function () {
		if (workerScript) {
			return workerScript;
		}

		const { data } = await axios.get(
			"https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js",
			{
				responseType: "blob"
			}
		);

		const content = await data.text();

		const blob = new Blob([content], {
			type: "application/javascript"
		});

		workerScript = URL.createObjectURL(blob);

		return workerScript;
	}

	var loadlib = function () {

		return new Promise((resolve, reject) => {
			var jsRelations = [
				{ src: 'js/vendor/gif.js', f: 'js' },
				{ src: 'js/vendor/gif-frames.min.js', f: 'js' },
			]

			importScripts(jsRelations, relations, function () {

				resolve();

			}, null, null, app);
		})

	}

	var fixEdgeSmoothing = function (image, options = {}) {
		const { background = null, transparentThreshold = 127 } = options;

		const canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		const ctx = canvas.getContext("2d");

		if (background) {
			ctx.fillStyle = background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0);
		} else {
			const data = image
				.getContext("2d")
				.getImageData(0, 0, canvas.width, canvas.height)
				.data.map((data, index, dataArr) => {
					if (index % 4 === 3) {
						if (_.some(dataArr.slice(index - 3, index), data => data !== 0)) {
							return data <= transparentThreshold ? 0 : 255;
						}
					}

					return data;
				});

			ctx.putImageData(new ImageData(data, canvas.width, canvas.height), 0, 0);
		}

		return canvas;
	}

	var resizeFrame = function (frame, width, height) {
		/*if (
			typeof window.createImageBitmap !== "undefined" &&
			typeof window.chrome !== "undefined"
		) {
			return imageBitmapResize(frame, width, height);
		}*/


		return canvasResize(frame, width, height);
	}

	var imageBitmapResize = async function (src, width, height) {
		const canvas = newCanvas(width, height);

		return createImageBitmap(src, 0, 0, src.width, src.height, {
			premultiplyAlpha: "none",
			resizeWidth: width,
			resizeHeight: height,
			resizeQuality: "high"
		}).then(img => {
			canvas.getContext("2d").drawImage(img, 0, 0);

			return canvas;
		});
	}

	var canvasResize = function (src, width, height) {
		const canvas = newCanvas(width, height);

		var w = src.width, h = src.height, s = w

		if (h < w) s = h


		const ctx = canvas.getContext("2d");
		ctx.drawImage(src, (w - s) / 2, (h - s) / 2, s, s, 0, 0, width, height);

		return Promise.resolve(canvas);
	}

	function newCanvas(width, height) {
		if (typeof OffscreenCanvas !== "undefined") {
			return new OffscreenCanvas(width, height);
		}

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;

		return canvas;
	}

	var getFrames = async function (url) {

		const frames = await gifFrames({
			url,
			frames: "all",
			outputType: "canvas"
		});

		return frames.map(frame => ({
			image: frame.getImage(),
			delay: frame.frameInfo.delay
		}));
	}

	self.prepare = function () {

		return Promise.all([loadlib(), loadworker()])

	}

	self.resize = async function (base64, { width, height }) {
		if (typeof gifFrames == 'undefined') throw new Error('getFrames')
		if (typeof GIF == 'undefined') throw new Error('GIF')


		const frames = await getFrames(base64);
		const resizedFrames = await Promise.all(
			frames.map(({ image }) => resizeFrame(image, width, height))
		).then(images =>
			images.map((image, index) => ({
				image,
				delay: frames[index].delay * 10
			}))
		);


		const blob = await renderGif(resizedFrames, {
			transparentThreshold,
			speedMultiplier
		});

		return getBase64(blob)
	}

	var renderGif = async function (frames, options = {}) {
		const { speedMultiplier = 1, background = null } = options;

		const gif = new GIF({
			workers: 2,
			workerScript,
			quality: 1,
			transparent: background ? null : "rgba(0, 0, 0, 0)"
		});

		frames.forEach(({ image, delay }) =>
			gif.addFrame(fixEdgeSmoothing(image, options), {
				delay: delay / speedMultiplier
			})
		);

		return new Promise((resolve, reject) => {
			gif.on("finished", resolve);

			try {
				gif.render();
			} catch (e) {
				reject(e);
			}
		});
	}

	return self
}

strToNumHash = function(str = '', max = 1){
	var r = 0

	for(var i = 0; i < str.length; i++){
		r += str[i].charCodeAt(0) % max
	}

	return r % max
}

class LoadingBar {
	constructor(barElem, styles) {
		const self = this;

		this.boundOnClick = this.onClick.bind(this);

		this.elem = barElem;
		this.elem.addEventListener('click', this.boundOnClick);

		if (styles) {
			this.setStyles(styles);
		}
	}

	onClick() {
		this.toggleStateChange();

		const hasOnStateChange = (typeof this.onStateChange === 'function');

		if (hasOnStateChange) {
			this.onStateChange({
				stopped: this.stopped,
				value: this.value,
			});
		}
	}

	clearListenStateChange() {
		this.elem.removeEventListener('click', this.boundOnClick);
	}

	listenStateChange(listenerCb) {
		this.onStateChange = listenerCb;
	}

	listenErrors(listenerCb) {
		this.onListenErrors = listenerCb;
	}

	setValue(value) {
		const hasOnListenErrors = (typeof this.onListenErrors === 'function');

		if (this.stopped && hasOnListenErrors) {
			this.onListenErrors({ type: 'warning', text: 'Tried to set value when state is stopped' });
		}

		if (value > 100) {
			value = 100;

			if (hasOnListenErrors) {
				this.onListenErrors({ type: 'warning', text: 'Tried to set value bigger than 100%' });
			}
		}

		this.value = value;
		this.elem.style.setProperty('--percent', value);
	}

	setStyles(styles) {
		if (styles.barColor) {
			this.elem.style.setProperty('--barColor', styles.barColor);
		}

		if (styles.lineColor) {
			this.elem.style.setProperty('--lineColor', styles.lineColor);
		}
	}

	toggleStateChange() {
		if (this.stopped) {
			this.setLoading();
			return;
		}

		this.setPaused();
	}

	setPaused() {
		this.stopped = true;
		this.elem.setAttribute('data-loading', !this.stopped);
	}

	setLoading() {
		this.stopped = false;
		this.elem.setAttribute('data-loading', !this.stopped);
	}
}

/**
 * Converts a buffer to its hexadecimal representation.
 *
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @returns {string} The hexadecimal representation of the buffer.
 */
bufferToHex = (buffer) => {
	return [...new Uint8Array (buffer)]
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');
};

/**
 * Checks if the first bytes of a file match a given magic number
 *
 * @param {Blob | File} file - The file to check
 * @param {number[]} magic - An array of hexadecimal values representing the magic bytes to match
 * @returns {Promise<boolean>} A promise that resolves to true if the magic bytes match, false otherwise
 */
checkMagicBytes = async (file, magic) => {
	const fileBytes = await file.arrayBuffer();
	const firstBytes = new Uint8Array(fileBytes.slice(0, magic.length));
	const firstBytesHex = bufferToHex(firstBytes);
	const magicBytesHex = bufferToHex(magic);

	return firstBytesHex === magicBytesHex;
};

/**
 * Checks if a video file is in the Matroska format based on its magic bytes.
 *
 * @param {Blob | File} videoFile - The video file to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the video file is in Matroska format, false otherwise.
 */
isVideoFormatMatroska = (videoFile) => {
	const magicBytes = [0x1A, 0x45, 0xDF, 0xA3];
	return checkMagicBytes(videoFile, magicBytes);
}

var connectionSpeed = function() 
{
    // Deal with vendor prefixes
    var defaultSpeed = false,
        navigator = window.navigator,
        connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
    if( ! connection )
        return defaultSpeed;

    // assume W3C Editor's Draft 09 October 2014
    if( 'downlinkMax' in connection )
    {
        var downlinkMax = connection.downlinkMax;
        if( ! downlinkMax )
            return defaultSpeed;
        if( ! isFinite(downlinkMax) )
            return defaultSpeed;
        return downlinkMax;
    }
    // assume W3C Working Draft 29 November 2012
    if( 'bandwidth' in connection )
    {
        var bandwidth = connection.bandwidth;
        if( ! bandwidth )
            return defaultSpeed;
        if( isNaN(speed) )
            return defaultSpeed;
        // standardize connection.bandwidth value by converting megabytes per second (MB/s) to megabits per second (Mbit/s)
        return bandwidth * 8;
    }
    // assume W3C Working Draft 07 June 2011
    switch( connection.type )
    {
        // convert connection.type value to approximate downlink values
        // speed estimate is based on the median downlink value for common devices in megabits per second (Mbit/s)
        case 'none':
            return 0;
        case '2g':
            return 0.134;
        case 'bluetooth':
        case 'cellular':
            return 2;
        case '3g':
            return 8.95;
        case '4g':
            return 100;
        case 'ethernet':
            return 550;
        case 'wifi':
            return 600;            
    }
    return defaultSpeed;
};

replaceArchiveInImage = function(src) {
	if(!src) return ''

	var srcNew = src;

	window.project_config.archivedPeertubeServers.map(server => {
		if (srcNew.includes(server)) srcNew = srcNew.replace(server, 'peertube.archive.pocketnet.app');
	});


	return srcNew.replace('bastyon.com:8092', 'pocketnet.app:8092').replace('test.pocketnet', 'pocketnet').replace('https://http://', 'http://');
};

function Circles(params) {

    this.init = function(pobj) {
        // Limits on the radius.
        if ('radius' in pobj) {
            this.radMin = ('min' in pobj.radius) ? pobj.radius.min : 1;
            this.radMax = ('max' in pobj.radius) ? pobj.radius.max : randInt(10,50);
        } else {
            this.radMin = 1;
            this.radMax = randInt(100,300);
        }

        // Limits on the layering.
        if ('zIndex' in pobj) {
            this.zMin = ('min' in pobj.zIndex) ? pobj.zIndex.min : 0;
            this.zMax = ('max' in pobj.zIndex) ? pobj.zIndex.max : 20;
        } else {
            this.zMin = 0;
            this.zMax = 20;
        }

        // The HSLA color, must be between 0 and 359
        if ('hue' in pobj) {
            this.hueMin = ('min' in pobj.hue) ? pobj.hue.min : randInt(0,180);
            this.hueMax = ('max' in pobj.hue) ? pobj.hue.max : randInt(180,359);
        } else {
            this.hueMin = randInt(0,180);
            this.hueMax = randInt(180,359);
        }

        // The HSLA saturation, will be a percentage
        if ('saturation' in pobj) {
            this.satMin = ('min' in pobj.saturation) ? pobj.saturation.min : randInt(50,70);
            this.satMax = ('max' in pobj.saturation) ? pobj.saturation.max : randInt(70,100);
        } else {
            this.satMin = randInt(50,70);
            this.satMax = randInt(70,100);
        }

        // The HSLA light, will be a percentage.
        if ('light' in pobj) {
            this.lgtMin = ('min' in pobj.light) ? pobj.light.min : randInt(40,50);
            this.lgtMax = ('max' in pobj.light) ? pobj.light.max : randInt(50,60);
        } else {
            this.lgtMin = randInt(40,50);
            this.lgtMax = randInt(50,60);
        }

        // The HSLA alpha, will be a percentage.
        if ('alpha' in pobj) {
            this.aMin = ('min' in pobj.alpha) ? pobj.alpha.min : randNum(0.1,0.3);
            this.aMax = ('max' in pobj.alpha) ? pobj.alpha.max : randNum(0.7,0.9);
        } else {
            this.aMin = randNum(0.1,0.3);
            this.aMax = randNum(0.7,0.9);
        }

        // The quantity.
        if ('quantity' in pobj) {
            this.quant = ('quantity' in pobj) ? pobj.quantity : randInt(8,25);
        } else {
            this.quant = (this.radMax < 20) ? randInt(15,45) : randInt(10,25);
        }

        // The fill mode. Appropriate values: fill, ring, rand.
        this.fillMode = ('fillMode' in pobj) ? pobj.fillMode : 'rand';

        this.target = ('target' in pobj) ? pobj.target : document.getElementById('bg-screen');

        this.main();
    };



    this.reset = function() {
        this.current = document.createElement('div');
        this.rad = randInt(this.radMin, this.radMax);
        this.hue = randInt(this.hueMin, this.hueMax);
        this.sat = randInt(this.satMin, this.satMax);
        this.lgt = randInt(this.lgtMin, this.lgtMax);
        this.alf = randNum(this.aMin, this.aMax);
        this.zin = randInt(this.zMin, this.zMax);
    };



    this.main = function() {
        var fillAct = null;
        if (this.fillMode == 'fill') {
            fillAct = this.setFill.bind(this);
        }
        else if (this.fillMode == 'ring') {
            fillAct = this.setRing.bind(this);
        }
        else {
            fillAct = this.setRand.bind(this);
        }

        for (var o = 0; o < this.quant; o++) {
            this.reset();
            this.setBasics();
            fillAct();
            this.target.appendChild(this.current);
        }
    };



    this.setBasics = function() {
        this.current.style.display = 'block';
        this.current.style.position = 'absolute';
        this.current.style.top = randInt(0, 100) + '%';
        this.current.style.left = randInt(0, 100) + '%';
        this.current.style.zIndex = this.zin;
		this.current.setAttribute('circle', 'circle')

        this.current.style.webkitTransform = 'translate(-50%, -50%)';
        this.current.style.mozTransform = 'translate(-50%, -50%)';
        this.current.style.transform = 'translate(-50%, -50%)';
    };



    this.setFill = function() {
        this.current.style.width = this.rad + 'px';
        this.current.style.height = this.rad + 'px';
        this.current.style.borderRadius = this.rad + 'px';
        this.current.style.mozBorderRadius = this.rad + 'px';
        this.current.style.webkitBorderRadius = this.rad + 'px';
        this.current.style.backgroundColor = 'hsla('+ this.hue +', '+ this.sat +'%, '+ this.lgt +'%, '+ this.alf +')';
    };


    this.setRing = function() {
        var x = this.rad - randInt(0, this.rad);
        var y = this.rad - x;

        this.current.style.width = x + 'px';
        this.current.style.height = x + 'px';
        this.current.style.backgroundColor = 'hsla(0,0%,0%,0.0)';

        this.current.style.webkitBorderRadius = this.rad + 'px';
        this.current.style.mozBorderRadius = this.rad + 'px';
        this.current.style.borderRadius = this.rad + 'px';
        this.current.style.border = y + 'px solid';
        this.current.style.borderColor = 'hsla('+ this.hue +', '+ this.sat +'%, '+ this.lgt +'%, '+ this.alf +')';
    };



    this.setRand = function() {
        var chk = Math.random();
        if (chk > 0.49) {this.setRing();}
        else {this.setFill();}
    }



    // This needs to stay down here.
    if (typeof params == 'object') {this.init(params);}
    else {this.init({});}
}
function randInt(min, max) {
    return Math.floor(this.randNum(min, max));
}
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

function randVal(min, max, zeroOk) {
    zeroOk = (zeroOk) ? true : false;
    var val = 0;

    val = ((isInt(min)) && (isInt(max)))
        ? randInt(min, max)
        : randNum(min, max);

    if (val == 0) {
        if (zeroOk) {return val;}
        else {return randVal(min, max);}
    }
    else {
        if (randone()) {return -val;}
        else {return val;}
    }
}

// Clipped this from http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
function isInt(n) {
    return n % 1 === 0;
}

// This will be a random boolean.
function randone() {
    return (Math.round(Math.random()) == 1);
}
