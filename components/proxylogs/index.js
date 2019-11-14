var proxylogs = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var cp = {
			requests : {
				ws : {
					path : 'ws',
					name : "Websocket connections",
					color : "#006CFF",
				},
				requests : {
					path : 'requestsIp',
					name : "Https requests ip",
					color : "#FF004E",
				},
			},

			blacklists : {
				black : {
					path : 'iplimiter.black',
					name : "Black list ip count",
					color : "#20C02B",
				},

				tblack : {
					path : 'iplimiter.black',
					name : "Temp Black list ip count",
					color : "#00C0FF",
				},
			}
		}

		var events = {
			reports : function(el){
				el.find('.expandall').on('click', function(){
					$(this).closest('.report').toggleClass('active')
				})
			}
		}

		var helpers = {
			chart : function(type){

				var c = {					
					type : 'spline',
					xtype : 'datetime'
				}

				if(type == 'requests') c.caption = 'Connections'
				if(type == 'blacklists') c.caption = 'Black list'
			
				return c;
			},

			series :  function(type, data){
				var s = [];

				var _cp = cp[type]

				_.each(_cp, function(m){
					var serie = {
						color : m.color,
						data : [],
						name : m.name
					}

					_.each(data, function(d){
						var v = deep(d, m.path) || 0;

						serie.data.push({
							y : v,
							x : new Date(d.time),
						})
					})

					s.push(serie)
				})

				return s
			}
		}

		var chart = {
			prepare : function(type, data, el){

				var chart = helpers.chart(type);
				var series = helpers.series(type, data);

				console.log(type, series, data)
				var graph = new self.app.platform.objects.graph({
					el : el,
					shell : self.shell,
					chart : chart,
					
				})

				graph.series = series; 

				return graph
			},
			make : function(type, data, el, clbk){
				
				var graph = chart.prepare(type, data, el)

				graph.render({

					maxPointsCount : 100

				}, function(){

					
					if (clbk)
						clbk(graph);

				});
			},
		}


		var renders = {
			users : function(el){
				var addr = [];
				var els = el.find('.loadaddress');

				els.each(function(){
					var a = $(this).attr('address')

					if (a){
						addr.push(a)
					}
				})

				if(addr.length){

					self.shell({

						name : 'user',
						data : {
						}
	
					},
					function(p){

						console.log(p)

						self.app.platform.sdk.users.get(addr, function(r, e){
						
							els.each(function(){
								var a = $(this).attr('address')
								var h = '';
			
								if (a){
									$(this).removeAttr('address')
	
									self.shell({

										name : 'user',
										data : {
											address : a
										},

										el : $(this)
					
									},
									function(p){

									})
								}
							})
	
						})

					})

					
				}
			},
			logs : function(logs, clbk){
				self.shell({

					name : 'logs',
					data : {
						logs : logs
					},

					el : el.logs

				},
				function(p){
					events.reports(p.el)

					p.el.find('.expand').on('click', function(){

						var l = $(this).closest('.log');

						var ip = l.attr('ip')

						var wsl = _.find(logs, function(l){
							return l.ip == ip;
						})

						if(!l.hasClass('active')){
							renders.wslogs(l.find('.wslogswrp'), deep(wsl, 'ws'), function(){

								l.toggleClass('active')

							}, true)
						}
						else{
							l.toggleClass('active')
						}

						
					})

					if (clbk)
						clbk()
				})
			},
			ws : function(ws, clbk){
				self.shell({

					name : 'ws',
					data : {
						ws : ws
					},

					el : el.ws

				},
				function(p){
					events.reports(p.el)

					renders.wslogs(p.el.find('.wslogswrp'), ws)

					if (clbk)
						clbk()
				})
			},

			block : function(block, clbk){
				self.shell({

					name : 'block',
					data : {
						block : block
					},

					el : el.block

				},
				function(p){
					events.reports(p.el)

					if (clbk)
						clbk()
				})
			},

			wslogs : function(el, ws, clbk, users){

				self.shell({

					name : 'wslogs',
					data : {
						ws : ws,
						users : users
					},

					el : el

				},
				function(p){
					if (users)
						renders.users(p.el)

					p.el.find('.clickload').on('click', function(){
						renders.users($(this).closest('.address'))
					})

					if (clbk)
						clbk()
				})
				
			},

			error : function(clbk){



				self.shell({

					name : 'error',
					data : {
					},

					el : el.error

				},
				function(p){


					if (clbk)
						clbk()
				})
			},

			stats : function(stats, clbk){
				self.shell({

					name : 'stats',
					data : {
						stats : stats
					},

					el : el.stats

				},
				function(p){

					renders.statsChart('requests', stats, p.el.find('.chartswrapper'))
					renders.statsChart('blacklists', stats, p.el.find('.chartswrapper'))

					if (clbk)
						clbk()
				})
			},

			statsChart : function(type, stats, el, clbk){

				var d = $('<div></div>', {
					class : 'chartWrapperbs'
				})

				el.append(d)

				
					
				chart.make(type, stats, d, clbk)

					
			}
		}

		var load = {
			users : function(){

			},
			info : function(clbk){
				self.app.platform.sdk.system.get.info(function(err, info){

					console.log(err)

					if(info){

						var logsFormat = [];
						var allinfo = {}

						var groupped = group(info.logs, function(l){
							return l.ip
						})


						_.each(groupped, function(gr, ip){

							var ws = _.filter(info.ws, function(ws){
								if(ws.ip == ip){

									ws.using = true

									return true
								}
							})

							ws = _.sortBy(ws, function(ws){
								return -(ws.ws_clients + ws.ws_nodes)
							})

							var block = _.find(info.iplimiter, function(iplim, _ip){
								if (_ip == ip){
									
									iplim.using = true

									return true
								}
							})

							var requests = {}

							var bystatus = group(gr, function(l){
								return l.s
							})

							_.each(bystatus, function(rs, status){
								requests[status] = group(rs, function(r){

									return deep(r, 'p.method') ||  deep(r, 'pn') || 'others'

								})
							})

							logsFormat.push({
								ws : ws,
								requests : requests,
								ip : ip,
								block : block,

								count : gr.length
							})

						})

						logsFormat = _.sortBy(logsFormat, function(l){
							return -(l.count + (l.ws.length * 10))
						})

						allinfo.logs = logsFormat

						allinfo.ws = _.filter(info.ws, function(ws){
							return !ws.using
						})

						allinfo.ws = _.sortBy(allinfo.ws, function(ws){
							return -(ws.ws_clients + ws.ws_nodes)
						})

						allinfo.blocks = _.filter(info.iplimiter, function(iplim, ip){

							iplim.ip = ip

							return !iplim.using
						})

						if(clbk) clbk(allinfo)
					}
					else{

						if(clbk) clbk(null)


					}
				})
			},

			stats : function(clbk){
				self.app.platform.sdk.system.get.stats(function(err, info){
					if(!err){

						if(clbk) clbk(info)

					}
					else{
						if(clbk) clbk(null)
					}
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
			

		}

		var make = function(){
			

			load.stats(function(stats){

				if (stats)
					renders.stats(stats)

				load.info(function(info){

					if(info){
						renders.logs(info.logs)
						renders.ws(info.ws)
						renders.block(info.blocks)
					}

					if(!stats && !info){
						renders.error()
					}
	
				})
			})
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.logs = p.el.find('.logsWrapper')
				el.ws = p.el.find('.wsWrapper')
				el.block = p.el.find('.blockWrapper');
				el.stats = p.el.find('.statsWrapper');
				el.error = p.el.find('.errorWrapper');

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
	module.exports = proxylogs;
}
else{

	app.modules.proxylogs = {};
	app.modules.proxylogs.module = proxylogs;

}