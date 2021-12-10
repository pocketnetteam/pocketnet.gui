var pkoin = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var el, optionsValue = 'donateToTheAuthor'

		var renders = {
			fields: function(){

			
				var options = new Parameter({

					type : "VALUES",
					name : "Localization",
					id : 'localization',
					defaultValue : optionsValue,
					possibleValues : ['donateToTheAuthor', 'pkoinComment', 'liftUpThePost'],
					possibleValuesLabels : [self.app.localization.e('donateToTheAuthor'), self.app.localization.e('pkoinComment'), self.app.localization.e('liftUpThePost')],

		
					_onChange : function(value){
						optionsValue = value;

						renders.fields();
					},
		
				})

				var sum = new Parameter({

					type : "INPUT",
					name : "Localization",
					id : 'localization',
					format : {
					},
		
					_onChange : function(value){
						console.log('value!!!')
					},
		
				})


				
				var sum = new Parameter({

					type : "NUMBER",
					name : "Localization",
					id : 'localization',
					format : {
					},
		
					_onChange : function(value){
						console.log('value!!!')
					},
		
				})


				self.shell({

					name :  'fields',
					el :   el.fields,
					data : {
						options : options,
						sum : sum,
						optionsValue: optionsValue
						
					},

				}, function(_p){

					console.log('p!!')

					ParametersLive([options], _p.el)

					
				})

			}
		}


		var initEvents = function(){



			renders.fields();

		}


		return {
			primary : primary,

			getdata : function(clbk, p){

				var essenseData = p.settings.essenseData;
				var userinfo = essenseData.userinfo


				var data = {
					address : userinfo.address,
					balance : essenseData.balance
				}

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.fields = el.c.find("#fieldsWrapper");


				initEvents();
			
				p.clbk(null, p);
			},

			wnd : {
				swipeClose : true,
				trueshold : 1,
				swipeCloseDir : 'down',
				class : 'sharingwindow2 normalizedmobile',
				type : 'pkoin'
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
	module.exports = pkoin;
}
else{

	app.modules.pkoin = {};
	app.modules.pkoin.module = pkoin;

}