var staking = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, info = null, amount = 1000, graph = null, history;

		var currency = 'USD',
			// exchange = 'mercatox'
			exchange = 'bilaxy'

		var market_keys = {
			'mercatox' : 'last_price',
			'bilaxy' : 'close'
		}

		var charts = {}

		var currencies = {
			USD : {
				id : 'USD',
				key : 'USD',
				view : function(v){
					return self.app.platform.mp.dollars(v, {prefix : ''})
				}
			},

			USDT : {
				id : 'USDT',
				key : 'USDT',
				view : function(v){
					return self.app.platform.mp.dollars(v, {prefix : ''})
				}
			},

			BTC : {
				id : 'BTC',
				key : 'BTC',
				view : function(v){
					return self.app.platform.mp.acoin(v)
				}
			}
		}

		var blocktime = [{
			block : 0,
			label : 'Now',
			id : 'now'
		},{
			block : 30.5,
			label : '1 Month',
			id : '1m'
		},{
			block :  182.5,
			label : '6 Months',
			id : '6m'
		},{
			block :  365,
			label : '1 Year',
			id : '1y'
		}]


		var parameters = {
			currency : new Parameter({
				name : self.app.localization.e('source'),
				type : "VALUES",
				id : 'source',
				defaultValue : "USD",
				possibleValuesLabels : ['USD', 'USDT', 'BTC'],
				possibleValues : ['USD', 'USDT', 'BTC'],
				format : {
					right : true
				},
			})
		}

		var calc = {
			netstakeweight : function(){
				return (deep(info, 'netstakeweight') || 189015830589274) / 100000000
			},
			point : function(t){

				var r = amount / calc.netstakeweight()
				var n = 1


				return amount * Math.pow( (1 + 1440 * 2.5 / calc.netstakeweight() ),  t)

			},

			price : function(c){ //00
				if(!c) c = 0

				if(history && history[exchange] && history[exchange].length > c){

					var lexc = history[exchange][history[exchange].length - 1 + c]

					if (lexc && lexc.prices[currency]){
						return Number(lexc.prices[currency].data[market_keys[exchange]]|| '0')
					} 

					if(lexc && !lexc.prices[currency]) {

						var markets = Object.keys(market_keys)
						var index = markets.indexOf(exchange)


						if(index >= 0) {
							markets.splice(index, 1)
						}

						var max_result = markets.map(item => {

							var price_log = history[item][history[item].length - 1]

							return Number(price_log.prices[currency].data[market_keys[item]] || '0')
						})
						max_result.push(0)

						return Math.max.apply(null, max_result)
					}

				}

				return 0
			},

			prevprice : function(){
				var i = -1
				var prevprice = 0
				var price = this.price()

				do{
					prevprice = this.price(i)
					i--
				}
				while(prevprice > 0 && (prevprice - price == 0))

				return prevprice
			},	

			prices : function(){
				var p = []

				if(history && history[exchange] && history[exchange].length){

					p = _.filter(history[exchange], function(p){
						return p
					})

					p = _.map(p, function(pn){

						if(pn.prices[currency]) {
							return {
								x : fromutc(new Date(pn.date)),
								y : Number(pn.prices[currency].data[market_keys[exchange]])
							}
						}

					})

					
				}

				return p
			}

		}
	

		var actions = {
			loadhistory : function(clbk){ //00
				self.app.api.fetch('exchanges/history').then(result => {

					history = result.prices

					if(clbk) clbk()
				})
			}
		}

		var events = {
			
		}

		var helpers = {
			series : function(){



				/*var data = _.map(blocktime, function(bt, i){
					return {
						y : calc.point(bt.block),
						x :i 
					}
				})*/
				return [{
					name : "Coins",
					color : '#00A3F7',
					data : calc.prices()
				}]
			}
		}

		var chart = {
			prepare : function(el){
				var graph = new self.app.platform.objects.graph({
					el : el,
					shell : self.shell,
					chart : {
						caption : "Coins",
						height : 70,
						width : 70,
						type : 'spline',
						xtype : 'datetime',
						removeLegend : true,
						disableYLabels : true,
						disableXLabels : true,
						yGridLineWidth : 0,
						ypadding : 0,
						disableTooltip : true
						
					},
				})

				graph.series = helpers.series(); 

				return graph
			},
			graph : function(_el, clbk){
				if (graph){

					graph.chart.update({
						series: helpers.series()
					});

					if(clbk) clbk(graph, _el)
				}
				else{
					graph = chart.prepare(_el)

					graph.render({
						maxPointsCount : 10,
						prepareOptions : function(p){
							p.plotOptions.series = {
								states : {
									inactive: {
										opacity: 1
									},
									enableMouseTracking: false,
									hover : {
										halo: {
											size: 0,
										},
										enabled : false
									}
								}
							}

							p.plotOptions.spline = {
								animation: false,
								lineWidth: 1,
								marker: {
									enabled: false
								},
								states: {
									hover: {
										lineWidth: 1,
										lineWidthPlus: 0,
										marker: {
											fillColor: "#000",
											lineColor: "#000"
										},
										halo: {
											opacity: 0
										}
									},
	
								}
							}
							
						}
					}, function(){

						if (clbk)
							clbk(graph, _el);

					});
				}
				
				
			},


			pricechart : function(){

			}
		}

		var renders = {
			updateValues : function(){
				this.updateValue(blocktime[2])
				this.updateValue(blocktime[3])
				this.updateValue(blocktime[0])
			},
			updateValue : function(item){

				var al = el.c.find('.blv[item="'+item.id+'"]')

				var value = Number((al.text() || '0').replace(/,/g,''));

				if(value < 0) value = 0

				var newvalue = calc.point(item.block)

				al.animateNumber({
					number: newvalue - value,

					numberStep: function(now, tween) {

						var number = Number(value + now).toFixed(8),
							target = $(tween.elem);

							if(number < 0) number = - number
					   
						target.text(self.app.platform.mp.coin(number));

					},

				}, rand(400, 1200), function(){
				});
			},
			lastPrice : function(){
				graph = null
				var text = ''
				
				var price = calc.price(0)
				var prevprice = calc.prevprice(0)


				var change = {
					value : 0,
					percent : 0
				}

				if (price){


					text = currencies[currency].view(price)

				}

				if (prevprice && price){
					var v = price - prevprice

					change.value = v
					change.percent = v / price
				}

				self.shell({
					inner : html,
					name : 'lastprice',
					data : {
						price : text,
						currency : currencies[currency],
						change : change,
					},

					el : el.c.find('.lastpriceCnt')

				},
				function(p){
					renders.pricechart()
				})

				
			},
			pricechart : function(){
				var _el = el.c.find('.chart')

				var d = $('<div></div>', {
					class : 'chartWrapper'
				})

				_el.html(d)

				chart.graph(d, function(graph){
				})
			},
			updateTotal : function(item, clbk){

				renders.datasets(item)

				charts[item.id].update();

				el.c.find('.totalItem[item="'+item.id+'"] .balanceWrapper').html(self.app.platform.mp.coinwithsmall(calc.point(item.block)))
			
				if (clbk)
					clbk()

			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			
			el.am.on('keyup', function(){
				var v = $(this).val() || ''
				
				amount = Number(v.replace(/,/g,''));

				if(amount < 50) amount = 50
				if(amount > 500000) amount = 500000

				renders.updateValues()

				
			})

			el.am.on('change', function(){
				var v = $(this).val() || ''
				
				amount = Number(v.replace(/,/g,''));

				if(amount < 50) amount = 50
				if(amount > 500000) amount = 500000

				$(this).val(amount)

				renders.updateValues()
				
			})

			ParametersLive(_.toArray(parameters), el.c)

			parameters.currency._onChange = function(v){
				currency = v

				actions.loadhistory(function(){
					renders.lastPrice()
				})
			}

			el.c.find('.earnlabel').on('click', function(){

				var url = 'https://'+self.app.options.url+''

				var r = ''

				if (self.app.platform.sdk.address.pnet()){
					r = '?&ref=' + self.app.platform.sdk.address.pnet().address
					url = url + r
				}
				

				self.nav.api.load({
					open : true,
					href : 'socialshare',
					history : true,
					inWnd : true,

					essenseData : {
						url : url, 
						style : 'smallcaption',
						caption : 'The best way to earn Pocketcoin (PKOIN) is to invite people to the platform. You will get 20% of their PKOIN earnings for the first three months. Send the link below to anyone via email, social media, messenger.'
					}
				})
			})

			amountmask()
		}

		var load = function(clbk){

			if (info){
				if(clbk) clbk(info)

				return
			}

			self.app.platform.sdk.node.get.info(function(d, e){
				if(d){
					info = d
				}

				//renders.totals()

				if(clbk){
					clbk(d, e)
				}
			})

		}

		var amountmask = function(){
			var mask = {};

				mask.alias = 'numeric';
				mask.groupSeparator = ',';
				mask.radixPoint =  '.';
				mask.digits = 0;
				mask.digitsOptional = !1;
				mask.autoGroup = true;
				mask.allowMinus = false;

				if (mask.digits > 0){
					mask.placeholder = "0"
				}

			el.am.inputmask(mask)
			el.am.blur()

		}

		var make = function(){

			actions.loadhistory(function(){
				renders.lastPrice()
			})

			load(function(error){

				if (error){
					self.iclbks.mainstacking = make
				}

				//renders.calculator()

				renders.updateValues()
			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {
					amount : amount,
					parameters : parameters
				};

				clbk(data);

			},

			destroy : function(){
				delete self.iclbks.mainstacking;
				graph = null
				charts = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.calculator = el.c.find('.calculator');
				el.am = el.c.find('.amredits');
				initEvents();

				make()

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = staking;
}
else{

	app.modules.staking = {};
	app.modules.staking.module = staking;

}