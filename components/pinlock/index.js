var pinlock = (function(){

	var self = new nModule();

	var essenses = {};

	var RINGLENGTH = 301.6; // 2 * PI * 48, ring circle in templates/index.html

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, mode, steps, step, buffer, firstpin, busy, blockedTimer, forgotTimer, wrongTimer, longpressTimer, clbkid;

		var e = function(key, args){
			return self.app.localization.e('pinlock_' + key, args)
		}

		var core = function(){
			return self.app.pinlock
		}

		var modes = {
			unlock : ['current'],
			set : ['new', 'repeat', 'done'],
			change : ['current', 'new', 'repeat'],
			disable : ['current']
		}

		var titles = {
			current : 'current',
			new : 'new',
			repeat : 'repeat',
			done : 'done'
		}

		var formatTime = function(ms){
			var s = Math.max(Math.ceil(ms / 1000), 0)
			var m = Math.floor(s / 60)

			s = s % 60

			return m + ':' + (s < 10 ? '0' : '') + s
		}

		var actions = {

			vibrate : function(){
				self.app.mobile.vibration.small(true)
			},

			addDigit : function(d){
				if (busy || actions.blocked() || step == 'done') return
				if (buffer.length >= core().pinlength) return

				buffer += d

				actions.vibrate()
				renders.dots()

				if (buffer.length == core().pinlength) actions.submit()
			},

			removeDigit : function(all){
				if (busy || actions.blocked() || !buffer.length) return

				buffer = all ? '' : buffer.slice(0, -1)

				renders.dots()
			},

			blocked : function(){
				return core().info().blockedUntil > Date.now()
			},

			submit : function(){
				var pin = buffer

				if (step == 'new'){
					firstpin = pin
					return actions.goto('repeat')
				}

				if (step == 'repeat'){
					if (pin != firstpin) return actions.mismatch()

					return actions.save(pin)
				}

				if (step == 'current'){
					return actions.current(pin)
				}
			},

			current : function(pin){
				actions.busy(true)

				var after = function(err, info){
					actions.busy(false)

					if (!el.c) return

					if (err) return actions.error(err, info)

					if (mode == 'unlock') return actions.success()

					if (mode == 'disable'){
						core().clear()
						return actions.finish('disabled')
					}

					actions.goto('new')
				}

				if (mode == 'unlock') core().unlock(pin, after)
				else core().verify(pin, after)
			},

			save : function(pin){
				actions.busy(true)

				core().set(pin, function(err){
					actions.busy(false)

					if (!el.c) return

					if (err) return actions.error(err)

					if (mode == 'set') return actions.goto('done')

					actions.finish('changed')
				})
			},

			busy : function(v){
				busy = v

				if (el.c) el.c.toggleClass('busy', v)
			},

			mismatch : function(){
				firstpin = ''

				renders.message(e('mismatch'), true)

				actions.shake(function(){
					actions.goto('new', true)
				})
			},

			error : function(err, info){
				if (err == 'blocked') {
					actions.shake()
					return renders.blocked()
				}

				if (err == 'wrong'){
					var text = e('wrong')

					if (info && info.fails >= 3 && info.left > 0) text += ' · ' + e('attemptsleft', info.left)

					renders.message(text, true)

					return actions.shake()
				}

				renders.message(e('error'), true)
				actions.shake()
			},

			shake : function(clbk){
				buffer = ''

				if (!el.c) return

				if (window.cordova && navigator.vibrate) navigator.vibrate([40, 60, 40])

				el.c.addClass('error')

				clearTimeout(wrongTimer)

				wrongTimer = setTimeout(function(){
					if (!el.c) return

					el.c.removeClass('error')

					renders.dots()

					if (clbk) clbk()
				}, 600)
			},

			success : function(){
				if (el.c) el.c.addClass('success')
			},

			goto : function(s, keepmessage){
				step = s
				buffer = ''

				renders.step(keepmessage)
			},

			finish : function(result){
				if (result) sitemessage(e(result))

				if (ed.onsuccess) ed.onsuccess(result)

				actions.close()
			},

			close : function(){
				if (!el.c) return

				var wnd = el.c.closest('.wnd')

				if (wnd.length) wnd.find('._close').click()
			},

			signout : function(){
				self.app.user.signout()
				self.app.reload({
					href : 'authorization'
				})
			}
		}

		var events = {

			key : function(evt){
				if (!el.c || !el.c.is(':visible')) return
				if (el.forgot && el.forgot.hasClass('active')) return
				if (mode != 'unlock' && core().locked()) return

				var key = evt.key

				if (/^[0-9]$/.test(key)){
					evt.preventDefault()
					evt.stopPropagation()

					renders.press(key)

					return actions.addDigit(key)
				}

				if (key == 'Backspace'){
					evt.preventDefault()
					evt.stopPropagation()

					renders.press('backspace')

					return actions.removeDigit()
				}
			},

			digit : function(){
				actions.addDigit($(this).attr('digit'))
			},

			backspace : function(){
				actions.removeDigit()
			},

			backspacedown : function(){
				clearTimeout(longpressTimer)

				longpressTimer = setTimeout(function(){
					actions.removeDigit(true)
				}, 600)
			},

			backspaceup : function(){
				clearTimeout(longpressTimer)
			},

			timeout : function(){
				var v = Number($(this).attr('value'))

				core().setTimeout(v)

				el.c.find('.timeoutchip').removeClass('active').attr('aria-checked', 'false')
				$(this).addClass('active').attr('aria-checked', 'true')
			},

			done : function(){
				actions.finish('enabled')
			},

			cancel : function(){
				actions.close()
			},

			forgot : function(){
				renders.forgot(true)
			},

			forgotcancel : function(){
				renders.forgot(false)
			},

			forgotsignout : function(){
				if ($(this).hasClass('disabled')) return

				actions.signout()
			},

			corestate : function(){
				if (!el.c) return

				if (actions.blocked()) renders.blocked()
			}
		}

		var renders = {

			dots : function(){
				if (!el.c) return

				var n = buffer.length

				el.dots.find('.dot').each(function(i){
					$(this).toggleClass('filled', i < n)
				})

				el.dots.attr('aria-label', e('entered', n))

				el.c.attr('filled', n)
			},

			message : function(text, bad){
				if (!el.message) return

				el.message.text(text || '').toggleClass('bad', !!bad)
			},

			step : function(keepmessage){
				if (!el.c) return

				el.c.attr('step', step)

				if (steps.length > 1){
					el.c.find('.stepdot').each(function(i){
						$(this).toggleClass('active', i <= _.indexOf(steps, step))
					})
				}

				if (mode != 'unlock') el.subtitle.text(e(titles[step]))

				if (!keepmessage) renders.message('')

				renders.dots()
			},

			press : function(key){
				var b = el.c.find('.key[digit="' + key + '"], .key.' + key)

				b.addClass('pressed')

				setTimeout(function(){
					b.removeClass('pressed')
				}, 150)
			},

			blocked : function(){
				clearInterval(blockedTimer)

				var tick = function(){
					if (!el.c) return clearInterval(blockedTimer)

					var info = core().info()
					var left = info.blockedUntil - Date.now()

					if (left <= 0){
						clearInterval(blockedTimer)

						el.c.removeClass('blocked')
						el.c.find('.countdown').text('')
						el.ring.css('stroke-dashoffset', '')

						return renders.message('')
					}

					var total = Math.max(info.blockedFor || 0, left)
					var time = formatTime(left)

					el.c.addClass('blocked')
					el.c.find('.countdown').text(time)
					el.ring.css('stroke-dashoffset', RINGLENGTH * (1 - left / total))

					renders.message(e('blocked', time), true)
				}

				buffer = ''

				renders.dots()
				tick()

				blockedTimer = setInterval(tick, 1000)
			},

			forgot : function(show){
				clearTimeout(forgotTimer)

				var button = el.forgot.find('.forgotsignout')

				el.forgot.toggleClass('active', show)

				if (!show) return

				button.addClass('disabled')

				forgotTimer = setTimeout(function(){
					button.removeClass('disabled')
				}, 2000)

				el.forgot.find('.forgotcancel').focus()
			}
		}

		var initEvents = function(){

			el.c.on('click', '.key[digit]', events.digit)
			el.c.on('click', '.key.backspace', events.backspace)
			el.c.on('pointerdown', '.key.backspace', events.backspacedown)
			el.c.on('pointerup pointerleave', '.key.backspace', events.backspaceup)
			el.c.on('click', '.timeoutchip', events.timeout)
			el.c.on('click', '.donebutton', events.done)
			el.c.on('click', '.cancelbutton', events.cancel)
			el.c.on('click', '.forgotlink', events.forgot)
			el.c.on('click', '.forgotcancel, .forgotShade', events.forgotcancel)
			el.c.on('click', '.forgotsignout', events.forgotsignout)

			document.addEventListener('keydown', events.key, true)

			core().clbks.state[clbkid] = events.corestate
		}

		var userdata = function(clbk){
			var address = self.app.user.address.value

			if (!address) return clbk({})

			var done = false

			var make = function(){
				if (done) return

				done = true

				var info = self.psdk.userInfo.get(address) || {}
				var name = self.app.platform.api.clearname(info.name || '', true) || ''

				clbk({
					name : name,
					image : info.image || '',
					letter : (name || address)[0] || ''
				})
			}

			setTimeout(make, 2000)

			self.app.platform.sdk.users.getone(address, make)
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				mode = modes[ed.mode] ? ed.mode : 'unlock'
				steps = modes[mode]
				step = steps[0]
				buffer = ''
				firstpin = ''
				busy = false
				clbkid = 'pinlock_' + mode

				var data = {
					mode : mode,
					steps : steps,
					timeouts : core().timeouts(),
					timeout : core().getTimeout(),
					touch : !!(window.cordova || isTablet() || self.app.mobileview),
					user : {}
				}

				if (mode != 'unlock') return clbk(data)

				userdata(function(user){
					data.user = user
					clbk(data)
				})
			},

			destroy : function(){
				clearInterval(blockedTimer)
				clearTimeout(forgotTimer)
				clearTimeout(wrongTimer)
				clearTimeout(longpressTimer)

				document.removeEventListener('keydown', events.key, true)

				if (core() && clbkid) delete core().clbks.state[clbkid]

				el = {}
				ed = {}
			},

			init : function(p){

				el = {}
				el.c = p.el.find('#' + self.map.id)
				el.dots = el.c.find('.dots')
				el.message = el.c.find('.message')
				el.subtitle = el.c.find('.subtitle')
				el.ring = el.c.find('.ring .progress')
				el.forgot = el.c.find('.forgot')

				lightCircles(el.c.find('.bokehField')[0], { quantity : 10 })

				initEvents()

				renders.step()

				if (actions.blocked()) renders.blocked()

				p.clbk(null, p)
			},

			wnd : {
				class : 'pinlockwnd withoutButtons normalizedmobile'
			}
		}
	};

	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = pinlock;
}
else{

	app.modules.pinlock = {};
	app.modules.pinlock.module = pinlock;

}
