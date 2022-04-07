var easynode = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = (p.history && !p.inWnd) || p.primary;

		var el, amount = 1000, info = null, ed, oss, faqLangs, ext = null;

		
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

				// var r = amount / calc.netstakeweight()
				// var n = 1
				// return amount * Math.pow( (1 + 1440 * 4.75 / calc.netstakeweight() ),  t)
				

				if (amount <  50){

				}

				return amount / calc.netstakeweight() * 4.75 * 1440 * t

			}

		}

		var actions = {

			download : function(os, clbk){
				if (os){
					if(os.github){

						globalpreloader(true)


						$.get(os.github.url, {}, function(d){

							var assets = deep(d, 'assets') || [];

							var l = _.find(assets, function(a){
								return a.name == os.github.name
							})

							if (l){

								var link = document.createElement('a');
							        link.setAttribute('href', l.browser_download_url);
							        link.setAttribute('download','download');
							        link.click();

							    if (clbk)
									clbk(l.browser_download_url)
							}

							globalpreloader(false)


						})

					}

				}
			}

		}

		var events = {

			downloadWindow : function(){

				var os = _.find(oss, (os) => {return 'windows' == os.id})

				actions.download(os);
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
					number: amount + (newvalue - value),

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
						el.err = el.c.find('.errWrapper')
	
						//el.am.focus();

						//window.scrollTo(0, 0)

						el.am.keypress(function(e){ return e.which != 13; });

						el.am.on('keyup', function(){
							var v = $(this).text() || ''

							amount = Number(v.replace(/,/g,''));

							if(amount < 50 && amount !== 0){

								amount = 0;
								el.err.text(self.app.localization.e('minPkoin', 50))

							} else {

								el.err.empty();
							}

							if(amount > 500000) amount = 500000

							renders.updateValues()

							
						})

						// el.am.on('blur', function(){
						// 	var v = $(this).text() || '';

						// 	amount = Number(v.replace(/,/g,''));

						// 	if(amount < 50){

						// 		el.am.text(50);
						// 		amount = 50;

						// 	} 

						// 	if(amount > 500000) amount = 500000

						// 	renders.updateValues()

							
						// })

						if (clbk)
							clbk()
					})




				})

				
			},

			faq : function(){

				var faqLangsFiltered = {};

				for (var l in faqLangs){

					if (l !== 'fr'){


						faqLangsFiltered[l] = faqLangs[l]
						.filter(function(g){

							return g.id === 'buy-pkoin';
	
						})
						.map(function(g){
							
							if (g.id === 'buy-pkoin'){

								var newG = JSON.parse(JSON.stringify(g))

								newG.group = g.group.slice(0, 7)

								return newG;
							}

							return g;
							
						})

					}

				}

				
				var k = self.app.localization.key;

				if(!faqLangsFiltered[k]) k = 'en';

				var faqcontent = faqLangsFiltered[k];


				self.shell({
					name :  'faq',
					el : el.faqWrapper,
					data : {
						groups : faqcontent
					},
					animation : false,				

				}, function(p){

					console.log('pp!!!', p)

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
			

			self.app.platform.papi.post(
				"18399921cc5455b3283322a488f553d0169d00e3501246fc60d2e0c67c98bfc6",
				el.lenta,
				function (e, p) {
					ext = p
				},
			);


			renders.calc();
			renders.faq();
		}

		var initEvents = function(){


			el.c.find('.start').on('click', function(){

				events.downloadWindow();
			})

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

					ed = deep(p, 'settings.essenseData') || {};

					oss = self.app.platform.applications[ed.key || 'ui'];

					faqLangs = self.sdk.faqLangs.get();


				clbk(data);

			},

			destroy : function(){

				if (ext) {
					ext.clearessense()
				}

				ed = {};
				el = {};

				
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.calcWrapper = el.c.find('.calcWrapper');
				el.faqWrapper = el.c.find('.faqWrapper');
				el.lenta = el.c.find('.lenta');

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