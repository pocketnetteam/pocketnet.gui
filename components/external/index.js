var external = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, balanceMode, loading = false;
		var balanceModes = [{id : 'all', label : 'external_tTotal'}, {id : 'user', label : 'tacaddress'}, {id : 'wallet', label : 'twallet'}]
		var expiredInterval = null;
		var countryList = {"US": "United States", "RU": "Russia", "BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}

		var countryValues = _.map(countryList, (c, i) => {return i})
		var countryLabels = _.map(countryList, (c, i) => {return c + ' (' + i + ')'})

		var shipmentsCache = {}
		var shipmentsCacheLoading = {}

		var inputs = {
			email : new Parameter({
				name : 'Email',
				placeholder : 'Email',
				id : 'email',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			phone : new Parameter({
				name : self.app.localization.e('phone'),
				placeholder : self.app.localization.e('phone'),
				id : 'phone',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			name : new Parameter({
				name : self.app.localization.e('name'),
				placeholder : self.app.localization.e('name'),
				id : 'email',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			country : new Parameter({
				type : "VALUES",
				name : self.app.localization.e("country"),
				placeholder : self.app.localization.e('country'),
				id : 'country',
				possibleValues : countryValues, 
				possibleValuesLabels : countryLabels
			}),

			

			address : new Parameter({
				name : self.app.localization.e('address'),
				placeholder : self.app.localization.e('address'),
				id : 'address',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
				
			}),

			address2 : new Parameter({
				name : self.app.localization.e('address2'),
				placeholder : self.app.localization.e('address2'),
				id : 'address2',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			city : new Parameter({
				name : self.app.localization.e('city'),
				placeholder : self.app.localization.e('city'),
				id : 'city',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			state : new Parameter({
				name : self.app.localization.e('state'),
				placeholder : self.app.localization.e('state'),
				id : 'state',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

			zipcode : new Parameter({
				name : self.app.localization.e('zipcode'),
				placeholder : self.app.localization.e('zipcode'),
				id : 'zipcode',
				type : "STRINGANY",

				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),

		}

		var shipments = {
		}
		
		var events = {
			
		}

		var renders = {
			loading : function(statusText){

				loading = statusText ? true : false
				if(!el.c) return

				if(statusText){
					el.c.addClass('wait')
					el.c.find('.loading .text').html(self.app.localization.e(statusText))
				}

				else{
					el.c.removeClass('wait')
				}
			},
			balance : function(value, clbk){

				self.shell({
					name :  'balance',
					data : {
						formattedValue : self.app.platform.mp.coin(value),
						value : value,
						balanceMode
					},

					el : el.c.find('.balanceWrapper')

				}, function(_p){

					if (clbk)
						clbk(_p);
				})
			},

			shipment : function(_el, parameters, lsdata, clbk){

				var hp = [inputs.name, inputs.country, inputs.address, inputs.address2, inputs.city, inputs.state, inputs.zipcode]

				_.each(hp, (input) => {
					input.value = lsdata.shipment ? lsdata.shipment[input.id] || '' : ''
				})

				if (inputs.country.value != 'US'){
					hp = _.filter(hp, (input) => {
						return input.id != 'address2' && input.id != 'state'
					})
				}

				/*if(lsdata.shipment){
					_.each(lsdata.shipment, (sh, i) => {
						if(!_.find(hp, (input) => {
							return i == input.id
						})){
							lsdata.shipment[i] = ''
						}
					})
				}*/
				

				self.shell({
					name :  'shipment',
					data : {
						parameters,
						lsdata,
						inputs : hp
					},
					insertimmediately : true,
					el : _el

				}, function(_p){


					ParametersLive(hp, _p.el)

					_.each(hp, (p, i) => {

						p._onChange = function(v){
							if(!lsdata.shipment) lsdata.shipment = {}

							lsdata.shipment[p.id] = v
							lsdata.account = self.app.user.address.value

							state.save(lsdata, parameters.hash)

							/////bug with make

							if (p.id != 'name') make(() => {
								if (i + 1 < hp.length){
									hp[i + 1].el.focus()
								}
								//_scrollTo(_p.el.find('[parameter="'+p.id+'"]'), el.c.closest('.customscroll'), 0)
							})
						}

						
					})

					if (clbk)
						clbk(_p);
				})
			},

			pay : function(_el, parameters, lsdata, clbk){

				helpers.clearExpInterval()

				var customerClbk = function(response){

					successCheck()
					renders.loading(null)
					lsdata.customersend = response
					state.save(lsdata, parameters.hash)

					make()

				}
				
				var txclbk = function(txid){
					var cbpw = helpers.callbackPayWay(parameters)

					///

					lsdata.txid = txid
					lsdata.account = self.app.user.address.value

					state.save(lsdata, parameters.hash)

					/// saveHashInfo

					if (cbpw == 'redirect'){
						renders.loading('external_paySucc_redirect')

						helpers.callbackPay(parameters, txid, lsdata).then((w) => {
							setTimeout(() => {
								customerClbk(w)
							}, 700)
						})

						
					}

					if(cbpw == 'fetch'){
						renders.loading('external_paySucc_fetch')

						helpers.callbackPay(parameters, txid, lsdata).then((w) => {
							customerClbk(w)
						})

					}

					if(!cbpw){
						customerClbk(true)
					}
				}

				var expiredIn = function(){
					if(!lsdata.txid){
						if (parameters.date && parameters.expired){

							return  (parameters.date + Number(parameters.expired * 1000)) - (new Date()).getTime() 
						}
					}

					return 0
				}

				var hp = []


				if(parameters.email) {hp.push(inputs.email); inputs.email.value = lsdata.email || ""} else inputs.email.value = ''
				if(parameters.phone) {hp.push(inputs.phone); inputs.phone.value = lsdata.phone || ""} else inputs.phone.value = ''

				var bms = helpers.getBalanceModes(parameters)
				var expired = false
				

				if(!lsdata.txid){
					if (parameters.date && parameters.expired){
						expired = true
					}
				}

				
				var balanceModeParameter = new Parameter({
					type : "VALUES",
					name : self.app.localization.e("external_source"),
					placeholder : self.app.localization.e('external_source'),
					id : 'balanceMode',
					possibleValues : _.map(bms, (bm) => {return bm.id}), 
					possibleValuesLabels : _.map(bms, (bm) => {return self.app.localization.e(bm.label)}),
					defaultValue : balanceMode,
					value : balanceMode
				})

				var alladdresses = (self.app.platform.sdk.addresses.storage.addresses || []).concat(self.app.user.address.value)
				var myaddress = false

				if(alladdresses.indexOf(parameters.address) > -1){
					myaddress = true
				}

				self.shell({
					name :  'pay',
					data : {
						parameters,
						lsdata,
						inputs : hp,
						balanceModeParameter,
						expired,
						expiredIn : expiredIn(),
						myaddress
					},

					insertimmediately : parameters.s_url ? true : false,

					el : _el

				}, function(_p){

					var expfunc = function(){
						var _expiredIn = expiredIn() 

						if (_expiredIn <= 0){
							renders.pay(_el, parameters, lsdata, clbk)
						}
						else{
							_p.el.find('.expiredIn').html(moment(parameters.date + Number(parameters.expired * 1000)).fromNow())
						}
					}

					if (expired && expiredIn() > 0 && !myaddress){

						expfunc()

						expiredInterval = setInterval(() => {
							expfunc()
						}, 1000)
					}

					ParametersLive(hp, _p.el)
					ParametersLive([balanceModeParameter], _p.el)

					

					_.each(hp, (p, i) => {

						p._onChange = function(v){
							lsdata[p.id] = v
							state.save(lsdata, parameters.hash)
						}
						
					})

					balanceModeParameter._onChange = function(v){
						balanceMode = v

						make()
					}

					_p.el.find('.getqrcode').on('click', function(){
						var payment = self.app.platform.sdk.payments.make({
							payment : {
								...parameters, 
							}
						})

						console.log("ASD")

						payment.makeQR().then(q => {
							console.log(q)

							self.app.nav.api.load({
								open : true,
								href : 'imagegallery',
								inWnd : true,
								essenseData : {
									idName : 'src',
									images : [{src : q}]
								},
			
								clbk : function(){
								
								}
							})

						})
					})

					_p.el.find('.close').on('click', function(){
						self.closeContainer()
					})

					_p.el.find('.share').on('click', function(){

						var payment = self.app.platform.sdk.payments.make({
							payment : {
								...parameters, 
								shipmentValue : lsdata.shipmentValue
							}
						}) 

						var hash = payment.makeURLHash()

						var l = 'index?ext=' + hash + (lsdata.txid ? '&etxid='+lsdata.txid : '')

						self.app.platform.ui.socialshare(l)
					})

					if(parameters.tx){
						_p.el.find('.sendtx').on('click', function(){

							if (loading) return

							if (document.activeElement && document.activeElement.blur)
								document.activeElement.blur()

							if (parameters.email && !lsdata.email){
								sitemessage(self.app.localization.e('external_email_required'))
								return
							}

							if (parameters.phone && !lsdata.phone){
								sitemessage(self.app.localization.e('external_phone_required'))
								return
							}

							if (parameters.s_url && typeof parameters.shipmentValue == 'undefined'){
								sitemessage(self.app.localization.e('external_shipmentValueEmpty'))
								return
							}
							
							renders.loading('external_prepareTransaction')

							helpers.sendTransaction(parameters.tx, parameters.fees).then((txid) => {

								renders.loading()

								txclbk(txid)

							}).catch(e => {
								renders.loading()
								console.error(e)
								sitemessage(e)

							})

						})
					}

					if (lsdata.txid){
						self.app.platform.papi.transaction(lsdata.txid, _p.el.find('.txBody'), null, null, {verify : (tx) => {

							if(!ed.completedTransaction){
								return true
							}

							var opr = self.app.platform.sdk.node.transactions.getOpreturn(tx)

							var payment = self.app.platform.sdk.payments.make({payment : parameters})

							//parameters.address

							var amount = _.reduce(tx.vout, (m, out) => {
								var as = deep(out, 'scriptPubKey.addresses')

								if (as && as.length == 1 && as[0] == parameters.address){
									return m + out.value
								}

								return m
							}, 0)

							console.log("VERIFY", amount, tx, parameters.paymentHash, opr, payment, payment.getHash(), parameters)

							if (amount = (parameters.value || 0) + (parameters.shipmentValue || 0)){
								if (opr.replace('pay_', '') == payment.getHash()){
									return true
								}
							}

							return false
						}})
					}
					
					if (lsdata.txid && !lsdata.customersend){
						txclbk(lsdata.txid)
					}

					_p.el.find('.recieverrow').on('click', () => {
						copycleartext(parameters.address)

						sitemessage(self.app.localization.e('waddresswascop'))
					})

					renders.recieverProfile(_p.el.find('.forReciever'), parameters.address)

					if (parameters.s_url){
						renders.shipment(_el.find('.shipmentWrapper'), parameters, lsdata, () => {
							if (clbk)
								clbk(_p);
						})
					}
					else{
						if (clbk)
							clbk(_p);
					}

					
				})
			},

			recieverProfile : function(el, address){
				self.sdk.users.get(address, function(){
					var profile = self.psdk.userInfo.get(address)

					if (profile){
						self.shell({
							name :  'recieverProfile',
							data : {
								profile
							},
		
							el : el
		
						}, function(_p){
	
						})
					}

					
				})
			},

			auth : function(_el, parameters, clbk){
				self.shell({
					name :  'auth',
					data : {
						parameters
					},

					el : _el

				}, function(_p){

					_p.el.find('.allow').on('click', function(){
						var signature = self.app.user.signature('auth:' + parameters.host)

						renders.loading('external_loading')

						helpers.callbackAuth(parameters, signature).then(() => {
							self.closeContainer()

							successCheck()
					
						}).catch(e => {
							sitemessage(e)
						}).finally(() => {
							renders.loading(null)
						})
					})

					_p.el.find('.cancel').on('click', function(){
						self.closeContainer()
					})

					if(clbk) clbk()
				})
			},

			emptyAction : function(_el, clbk){
				self.shell({
					name :  'empty',
					data : {
						
					},

					el : _el

				}, function(_p){
					_p.el.find('.cancel').on('click', function(){
						self.closeContainer()
					})
					
					if(clbk) clbk()
				})
			}
		}

		var state = {
			save : function(lsdata, hash){
				self.app.platform.sdk.payments.save(lsdata, hash)
			},
			load : function(hash){
				return self.app.platform.sdk.payments.load(hash)
			},

			getLastShipment: function(){
				return self.app.platform.sdk.payments.getLastShipment()
			}
		}

		var initEvents = function(){
			self.app.platform.actions.clbk('change', 'external', actions.balance)
		}

		var ways = {
			pay : function(clbk){

				var lsdata = state.load(ed.parameters.hash)

				if(!lsdata.txid && ed.completedTransaction) {
					lsdata.txid = ed.completedTransaction
					lsdata.customersend = true
				}

				if (lsdata.txid){
					renders.pay(el.cnt, {...ed.parameters}, lsdata, clbk)
					return
				}


				if (ed.parameters.s_url){
					if(!lsdata.shipment){
						lsdata.shipment = state.getLastShipment()
					}
				}

				

				

				renders.loading('external_loading')

				helpers.getShipment(ed.parameters, lsdata.shipment).then(shipmentValue => {

					if (typeof shipmentValue != 'undefined'){
						lsdata.shipmentValue = shipmentValue || 0
						state.save(lsdata, ed.parameters.hash)
					}

					var tx = null

					try{
						tx = helpers.getTransaction(ed.parameters.value + (shipmentValue || 0) /*- (ed.parameters.discount || 0)*/, ed.parameters.address, ed.parameters)
					}
					catch(e){

					}
					
					console.log("VER", tx)

					helpers.getFees(tx).then(fees => {

						renders.pay(el.cnt, {...ed.parameters, tx, fees, shipmentValue}, lsdata, clbk)
					}).catch(e => {
						renders.pay(el.cnt, {...ed.parameters, error : e, shipmentValue}, lsdata, clbk)
					})
					
				}).catch(e => {

					renders.pay(el.cnt, {...ed.parameters, error : e}, lsdata, clbk)

				}).finally(() => {
					renders.loading(null)
				})
				
			},

			auth : function(clbk){
				renders.auth(el.cnt, {...ed.parameters}, clbk)
			}
		}

		var helpers = {

			clearExpInterval : function(){
				if(expiredInterval){
					clearInterval(expiredInterval)
					expiredInterval = null
				}
			},

			getBalanceModes : function(parameters){
				if(parameters.anonimus) return _.filter(balanceModes, (bm) => {
					return bm.id == 'wallet'
				})


				return balanceModes
			},

			getShipmentFields : function(shipment){
				var fields = {}

				_.each(shipment, (v, i) => {

					if(shipment.country != 'US' && (i == 'state' || i == 'address2')){

					}
					else{
						fields[i] = v

					}
				})

				return fields
			},

			getShipment : function(parameters, shipment){
				
				if(parameters.shipmentValue) return Promise.resolve(shipmentValue)
				if(!parameters.s_url) return Promise.resolve()

				shipment = helpers.getShipmentFields(shipment)

				if(!shipment || !shipment.country || !shipment.city || !shipment.address || !shipment.zipcode){
					return Promise.reject({
						error : 'missing:shipment',
						text : self.app.localization.e('external_fill_shipment') 
					})
				}

				try{
					var er = false

					var data = {
						shipment,
						locale : self.app.localization.key,
						payload : parameters.payload || {}
					}

					var datahash = $.md5(JSON.stringify(data))

					if(!shipmentsCache[parameters.hash]) shipmentsCache[parameters.hash] = {}
					if(!shipmentsCacheLoading[parameters.hash]) shipmentsCacheLoading[parameters.hash] = {}

					if (shipmentsCache[parameters.hash][datahash]) return shipmentsCache[parameters.hash][datahash]
					if (shipmentsCacheLoading[parameters.hash][datahash]) return shipmentsCacheLoading[parameters.hash][datahash]

					var headers = _.extend({
						'Accept': 'application/json',
						'Content-Type': 'application/json;charset=utf-8'
					})

					

					shipmentsCacheLoading[parameters.hash][datahash] = fetch(parameters.s_url, {

						method: 'POST',
						mode: 'cors',
						headers: headers,
						body: JSON.stringify(data)

					}).then(r => {

						if(!r.ok){
							
							er = true
						}

						return r.json()
					}).then(result => {

						/*return Promise.reject({
							error : 'missing:ship',
							text : 'Delivery to this region is not possible'
						})*/

						if (er || result.error){
							return Promise.reject(result.error)
						}

						if(!_.isNumber(result.value)) return Promise.reject('NaN')

						shipmentsCache[parameters.hash][datahash] = Number(result.value)

						/*
							test
						

						return Number(0.05)
						*/

						return shipmentsCache[parameters.hash][datahash]

					}).catch(e => {
						return Promise.reject(e)
					}).finally(() => {
						delete shipmentsCacheLoading[parameters.hash][datahash]
					})

					return shipmentsCacheLoading[parameters.hash][datahash]
				}
				catch(e){
					return Promise.reject(e)
				}
			},
			
			callbackPayWay : function(parameters){
				if(!parameters.c_url){
					return 
				}

				if(parameters.c_url_type == 'redirect') return 'redirect'

				return 'fetch'
			},

			redirect : function(url){

				if (window.cordova){

					cordova.InAppBrowser.open(url, '_system');

					return Promise.resolve()
				}

				if (typeof _Electron != 'undefined'){

					electron = require('electron');
					electron.shell().openExternal(url);

					return Promise.resolve()
				}

				window.open(url)

				return Promise.resolve('redirect')
			},

			fetch : function(url, data){

				var headers = _.extend({
					'Accept': 'application/json',
					'Content-Type': 'application/json;charset=utf-8'
				})

				try{
					return fetch(url, {

						method: 'POST',
						mode: 'cors',
						headers: headers,
						body: JSON.stringify(data)

					}).then(r => {
						if(!r.ok){
							return Promise.reject(r.status)
						}

						///// TODO: save response

						return r.json()
					})
				}
				catch(e){
					return Promise.reject(e)
				}
			},

			callbackPay : function(parameters, tx, lsdata){
				var way = helpers.callbackPayWay(parameters)

				if (way == 'redirect'){

					var Url = new URL(parameters.c_url)

					Url.searchParams.append('tx', tx);

					_.each(parameters.payload || {}, (d, i) => {

						if(i == 'tx') return

						Url.searchParams.append(i, d);
					})

					if(lsdata.phone) Url.searchParams.append('phone', encodeURIComponent(lsdata.phone));
					if(lsdata.email) Url.searchParams.append('email', encodeURIComponent(lsdata.email));

					if(lsdata.shipment) {
						_.each(helpers.getShipmentFields(parameters.shipment), (d, i) => {
							Url.searchParams.append(i, encodeURIComponent(d));
						})
					}


					return helpers.redirect(Url.toString())
				}

				if (way == 'fetch'){

					var data = {tx : tx}

					_.each(parameters.payload || {}, (d, i) => {

						if(i == 'tx') return

						data[i] = d
					})

					if(lsdata.phone) data.phone = lsdata.phone
					if(lsdata.email) data.email = lsdata.email
					if(lsdata.shipment) data.shipment = helpers.getShipmentFields(lsdata.shipment) 

					if(!parameters.anonimus)
						data.account = self.app.user.address.value

					return helpers.fetch(parameters.c_url, data)

					

				}

				return Promise.resolve('noway')
			},

			

			callbackAuth : function(parameters, signature){
				var way = helpers.callbackPayWay(parameters)

				if (way == 'redirect'){

					var Url = new URL(parameters.c_url)

					_.each(signature, (d, i) => {
						Url.searchParams.append(i, d);
					})

					return helpers.redirect(Url.toString())
				}

				if (way == 'fetch'){

					var data = {signature}

					return helpers.fetch(parameters.c_url, data).then(result => {
						if (result.redirect){
							return helpers.redirect(Url.toString())
						}

						return Promise.reject('noredirect')
					})

				}

				return Promise.resolve('noway')
			},

			getaddresses : function(){
				var addresses = []

				if (balanceMode == 'all') addresses = [].concat([self.app.user.address.value]).concat(self.app.platform.sdk.addresses.storage.addresses)
				if (balanceMode == 'user') addresses = [self.app.user.address.value]
				if (balanceMode == 'wallet') addresses = self.app.platform.sdk.addresses.storage.addresses

				if(!addresses) throw 'wrong:balanceMode'

				return addresses
			},

			getFees : function(transaction){

				if(!transaction){
					return Promise.resolve(0)
				}

				var account = self.psdk.actions.getCurrentAccount()

				if (account){

					var action = account.prepareAction(transaction)

					return action.prepareTransaction(0).then(txdata => {
						return Promise.resolve(txdata.calculatedFee)
					})
				}

				return Promise.resolve(0)
			},

			getTransaction : function(amount, reciever, parameters = {}){
				var addresses = helpers.getaddresses()

				var transaction = new Transaction()
				
					transaction.source.set(addresses)
					transaction.reciever.set([
						{
							address : reciever,
							amount : amount
						}
					])

					transaction.feemode.set('exclude')

					if (parameters.paymentHash){
						transaction.message.set('pay_' + parameters.paymentHash)
					}
					else {
						transaction.message.set(parameters.paymentHash)
					}

				
				return transaction
			},

			sendTransaction : function(transaction, fees = 0){

				if(!transaction) return Promise.reject('missing:transaction')

				return self.app.platform.actions.addActionAndSendIfCan(transaction, 1, null, {
					calculatedFee : fees,
					rejectIfError : true
				}).then(action => {
					return Promise.resolve(action.transaction)
				})
			}
		}

		var actions = {

			balance : function(){
				var account = self.app.platform.actions.getCurrentAccount()
				var value = 0

				if(!account){
					
				}
				else{

					var balance = account.actualBalance(helpers.getaddresses())

					value = balance.actual

				}

				renders.balance(value)
			}
		}

		var make = function(clbk){

			actions.balance()

			if (ways[ed.action]){
				ways[ed.action](clbk)
			}

			else{
				renders.emptyAction(el.cnt, clbk)
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				ed.completedTransaction = parameters().etxid

				var userinfo = self.psdk.userInfo.getmy()

				var data = {
					ed, userinfo
				};
				
				balanceMode = 'all'

				if (ed.action == 'pay' && ed.parameters.anonimus){
					balanceMode = 'wallet'
				}

				shipmentsCache = {}

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};

				self.nav.api.history.removeParameters(['ext', 'etxid'])

				self.app.platform.actions.clbk('change', 'external', null)

				helpers.clearExpInterval()
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.extcnt')

				initEvents();

				make(() => {
					p.clbk(null, p)
				})

				
			},

			wnd : {
				class : 'withoutButtons extwindow normalizedmobile maxheight externalwindow',
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
	module.exports = external;
}
else{

	app.modules.external = {};
	app.modules.external.module = external;

}