var easynode = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = (p.history && !p.inWnd) || p.primary;

		var el, amount = 1000, info = null, ed;

		
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

		var load = function(clbk){

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

		var calc = {
			netstakeweight : function(){
				return 233319560184587 / 100000000
			},
			point : function(t){

				var r = amount / calc.netstakeweight()
				var n = 1


				return amount * Math.pow( (1 + 1440 * 4.75 / calc.netstakeweight() ),  t)

			}

		}

		var actions = {

		}

		var events = {
			
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

			calc : function(clbk){

				self.shell({
					name :  'calc',
					el : el.calcWrapper,
					data : {
						amount : amount
					},
					animation : false,				

				}, function(p){

					load(function(error){

						if (error){
							self.iclbks.mainstacking = make
						}
		
						//renders.calculator()
		
						renders.updateValues()

						el.am = el.c.find('.amredits');
	
						//el.am.focus();

						//window.scrollTo(0, 0)
						el.am.on('keyup', function(){
							var v = $(this).text() || ''

							amount = Number(v.replace(/,/g,''));

							if(amount < 50) amount = 50
							if(amount > 500000) amount = 500000

							renders.updateValues()

							
						})

						el.am.on('change', function(){
							var v = $(this).text() || ''

							amount = Number(v.replace(/,/g,''));

							if(amount < 50) amount = 50
							if(amount > 500000) amount = 500000

							$(this).val(amount)

							renders.updateValues()
							
						})


						if (clbk)
							clbk()
					})




				})

				
			}

		}

		var state = {
			save : function(){

			},
			load : function(){


				
			}
		}

		var make = function(){
			renders.calc();
		}

		var initEvents = function(){

			el.c.find('.start').on('click', function(){

				if (ed.action){

					ed.action()

					self.closeContainer()

					return

				}
			

				self.nav.api.go({
					href : (isMobile() || !(typeof _Electron != 'undefined' && _Electron)) ? 'nodecontrol' : 'userpage?id=nodecontrol',
					history : true,
					open : true,
					inWnd : isMobile()
				})		

			})

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

					ed = deep(p, 'settings.essenseData') || {}

				clbk(data);

			},

			destroy : function(){

				ed = {};
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.calcWrapper = el.c.find('.calcWrapper');

				initEvents();
				make()

				p.clbk(null, p);
			},

			wnd : {
				class : 'wndeasynode withoutButtons normalizedmobile',
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

				
		$('#panelWrapper').show();
		
		$(document.body).removeClass('removed-menu');

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = easynode;
}
else{

	app.modules.easynode = {};
	app.modules.easynode.module = easynode;

}