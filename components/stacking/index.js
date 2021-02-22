var stacking = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, info = null, amount = 1000, graph = null;

		var blocktime = [{
			block : 0,
			label : 'Now'
		},{
			block : 30.5,
			label : '1 Month'
		},{
			block :  182.5,
			label : '6 Months'
		},{
			block :  365,
			label : '1 Year'
		}]

	

		var calc = {
			netstakeweight : function(){
				return (deep(info, 'netstakeweight') || 189015830589274) / 100000000
			},
			point : function(t){

				var r = amount / calc.netstakeweight()
				var n = 1


				return amount * Math.pow( (1 + 1440 * 2.5 / calc.netstakeweight() ),  t)

			},

		}
	

		var actions = {
			
		}

		var events = {
			
		}

		var helpers = {
			series : function(){

				var data = _.map(blocktime, function(bt){
					return {
						y : calc.point(bt.block)
					}
				})

				return [{
					name : "Coins",
					color : '#3176bd',
					data : data
				}]
			}
		}

		var chart = {
			prepare : function(el){
				var graph = new self.app.platform.objects.graph({
					el : el,
					shell : self.shell,
					chart : {
						type : 'column',
						caption : "Coins",
						height : 170,
						removeLegend : true,
						disableYLabels : true,
						yGridLineWidth : 0,
						categories : function(){
							return _.map(blocktime, function(bt){
								return bt.label
							})
						}
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

					console.log('helpers.series()', helpers.series())

					if(clbk) clbk(graph, _el)
				}
				else{
					graph = chart.prepare(_el)

					graph.render({}, function(){

						if (clbk)
							clbk(graph, _el);

					});
				}
				
				
			},
		}

		var renders = {
			calculator : function(){
				var _el = el.c.find('.chart')

				var d = $('<div></div>', {
					class : 'chartWrapper'
				})

				_el.html(d)

				chart.graph(d, function(graph){
				})
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

				if(!amount) amount = 1

				console.log('amount', amount)

				chart.graph()
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

		}

		var make = function(){

			load(function(error){

				if (error){
					self.iclbks.mainstacking = make
				}

				renders.calculator()


			})

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {
					amount : amount
				};

				clbk(data);

			},

			destroy : function(){
				delete self.iclbks.mainstacking;
				graph = null
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.calculator = el.c.find('.calculator');
				el.am = el.c.find('.amredit');
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
	module.exports = stacking;
}
else{

	app.modules.stacking = {};
	app.modules.stacking.module = stacking;

}