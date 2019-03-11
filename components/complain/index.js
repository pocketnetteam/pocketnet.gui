var complain = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ess, sobj, selected, ed;

		var reasons = {

			post : [

				{
					name : 'Sexual content',

					gid : 1,

					group : [
						{
							name : 'Graphic sexual activity',
							id : '1'						
						},
						{
							name : 'Nudity',
							id : '2'						
						},
						{
							name : 'Suggestive, but without nudity',
							id : '3'						
						},
						{
							name : 'Content involving minors',
							id : '4'						
						},
						{
							name : 'Abusive title or description',
							id : '5'						
						},
						{
							name : 'Other sexual content',
							id : '6'						
						}
						
					]
				},

				{
					name : 'Violent or repulsive content',
					gid : 2,
					group : [
						{
							name : 'Adults fighting',
							id : '7'						
						},
						{
							name : 'Physical attack',
							id : '8'						
						},
						{
							name : 'Youth violence',
							id : '9'						
						},
						{
							name : 'Animal abuse',
							id : '10'						
						}
						
					]
				},

				{
					name : 'Hateful or abusive content',
					gid : 3,
					group : [
						{
							name : 'Promotes hatred or violence',
							id : '11'						
						},
						{
							name : 'Abusing vulnerable individuals',
							id : '12'						
						},
						{
							name : 'Bullying',
							id : '13'						
						},
						{
							name : 'Abusive title or description',
							id : '14'						
						}
						
					]
				},

				

				{
					name : 'Harmful dangerous acts',
					gid : 4,
					group : [
						{
							name : 'Pharmaceutical or drug abuse',
							id : '19'						
						},
						{
							name : 'Abuse of fire or explosives',
							id : '20'						
						},
						{
							name : 'Suicide or self injury',
							id : '21'						
						},
						{
							name : 'Other dangerous acts',
							id : '22'						
						}
						
					]
				},
				{
					name : 'Child abuse',
					id : '23'						
				},

				{
					name : 'Promotes terrorism',
					id : '24'						
				},

				{
					name : 'Spam or misleading',
					gid : 6,
					group : [
						{
							name : 'Mass advertising',
							id : '25'						
						},
						{
							name : 'Pharmaceutical drugs for sale',
							id : '26'						
						},
						{
							name : 'Misleading text',
							id : '27'						
						},
						{
							name : 'Misleading thumbnail',
							id : '28'						
						},
						{
							name : 'Scams / fraud',
							id : '29'						
						}
						
					]
				},

				{
					name : 'Infringes my rights',
					gid : 7,
					group : [
						{
							name : 'Infringes my copyright',
							id : '30'						
						},
						{
							name : 'Invades my privacy',
							id : '31'						
						},
						{
							name : 'Other legal claim',
							id : '32'						
						}
						
					]
				}			

			]

		}

		var actions = {
			find : function(id){
				return _.find(reasons[ess], function(r){
					return (r.gid || r.id) == id
				})
			},			

			complain : function(clbk){

				var complainShare = sobj.complain(selected);

				topPreloader(30);

			
				self.sdk.node.transactions.create.commonFromUnspent(

					complainShare,

					function(tx, error){

						console.log(tx, error)

						topPreloader(100)

						if(!tx){

							self.app.platform.errorHandler(error, true)	
							
							if (clbk)
								clbk()
						}
						else
						{						
							if (clbk)
								clbk(true)
						}

					}
				)
			},	

			nextActive : function(){
				if(selected){

					el.next.removeClass('disabled')

				}
				else
				{
					el.next.addClass('disabled')
				}
			},
		}

		var events = {
			close : function(){
				self.closeContainer();
			},

			complain : function(){

				if(!el.next.hasClass('disabled') && selected){

					actions.complain(function(r){

						if(r){
							self.closeContainer();

							if (ed.success)
								ed.success()
						}
						
					})
				}

			},

			

			select : function(){
				var id = $(this).attr('reason')

				var reason = actions.find(id);

				if (reason){

					if($(this).hasClass('active')){

					}
					else
					{
						el.c.find('.reason').removeClass('active');

						selected = null

						$(this).addClass('active')

						if (reason.group){
							renders.selector(reason)
						}
						else
						{
							selected = reason.id
						}

						actions.nextActive()
					}

				}
			}
		}

		var renders = {
			reasons : function(){
				self.shell({
					name :  'reasons',
					inner : html,
					el : el.reasons,
					data : {
						reasons : reasons[ess]
					},

				}, function(p){
					p.el.find('.reason').on('click', events.select)
				})
			},

			selector : function(rgroup){

				var _el = el.c.find('.reason[reason="'+rgroup.gid+'"] .reasongroupIn')

				var labels = _.map(rgroup.group, function(r){
					return r.name
				})

				var values = _.map(rgroup.group, function(r){
					return r.id
				})

				var param = new Parameter({
					type : "VALUES",
					name : rgroup.name,
					id : rgroup.gid,
					possibleValues : values,
					possibleValuesLabels : labels,
					placeholder : "Choose one"
				})

				param._onChange = function(v){
					selected = v || null

					actions.nextActive()
				}

				self.shell({
					name :  'selector',
					inner : html,
					el : _el,
					data : {
						selector : param
					},

				}, function(p){
					
					ParametersLive([param], p.el)

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
			
			el.c.find('.cancel').on('click', events.close)

			el.next.on('click', events.complain)
		}

		var make = function(){
			renders.reasons()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				selected = null;

				ess = deep(p, 'settings.essenseData.item') || 'post';

				sobj = deep(p, 'settings.essenseData.obj') || null;

				ed = p.settings.essenseData || {};

				if (sobj){
					var data = {
						ess : ess
					};

					clbk(data);
				}

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.reasons = el.c.find('.reasons')
				el.next = el.c.find('.next')

				initEvents();

				make()

				p.clbk(null, p);
			},
			wnd : {
				class : 'withoutButtons transparent small complain'
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
	module.exports = complain;
}
else{

	app.modules.complain = {};
	app.modules.complain.module = complain;

}