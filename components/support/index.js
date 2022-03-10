var support = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, template, current, options;

		var actions = {
			showerror : function(error){
				sitemessage(self.app.localization.e('videobloggerRequest_er_' + error.t))

				el.c.find(error.el).focus()
			},

			getvalues : function(options){	
				var values = {}

				_.each(options, function(v, i){
					values[i] = v.value
				})

				return values
			},

			submit : function(){
				var values = actions.getvalues(options)
				var error = current.validation(values)

				if (error){

					actions.showerror(error)

					return
				}

				values.address = self.app.platform.sdk.address.pnet().address

				globalpreloader(true)

				self.app.letters[current.letter](values, function(){

					

					prepare()
					

					setTimeout(function(){

						renders.options()
						
						globalpreloader(false)

						self.closeContainer();

						successCheck();

						dialog({
							html: self.app.localization.e('videobloggerRequest_submitted'),
							btn1text: self.app.localization.e('daccept'),
							btn2text: "Cancel",
							class: 'one zindex',
							success: () => {
							}
						});
						
					}, 1000)

					

				})

			}	
		}

		var events = {
			
		}

		var renders = {
			options : function(){

				self.shell({
					name :  'options',
					el : el.options,
					data : {
						options
					}
	
				}, function(p){
					ParametersLive(options, p.el)
				})
			}
		}

		var prepareParameters = function(tpl){
			var meta = tpl.meta //templates[template].meta
			var r = {}

			_.each(meta, function(m,i){

				var nd = {...m}

				nd.name = self.app.localization.e(nd.name)

				r[i] = new Parameter(nd)
			})

			return r
		}

		var templates = {
			videoblogger : {

				letter : 'videoblogger',
				
				validation : function(values){
					if(!values['link1'] && !values['link2'] && !values['link3']) return {t : 'link', el : '[parameter="link1"] input'}

					if(!values['info']) return {t : 'info', el : '[parameter="info"] textarea'}

					if(!values['email']) return {t : 'email', el : '[parameter="email"] input'}
				},

				meta :{

					link1 : {
						name: 'videobloggerRequest_pl1',
						id: 'link1',
						type: "STRINGANY",
						value: '',
						placeholder : 'https://www.youtube.com/channel/***'
					},

					link2 : {
						name: 'videobloggerRequest_pl2',
						id: 'link2',
						type: "STRINGANY",
						value: '',
						placeholder : 'https://www.instagram.com/***'
					},

					link3 : {
						name: 'videobloggerRequest_pl3',
						id: 'link3',
						type: "STRINGANY",
						value: '',
						placeholder : 'https://twitter.com/***'
					},

					info : {
						name: 'videobloggerRequest_pl_notes',
						id: 'info',
						type: "TEXT",
						value: ''
					},

					email : {
						name: 'videobloggerRequest_pl_email',
						id: 'email',
						type: "STRINGANY",
						value: '',
						placeholder : '*@*.*'
					},
				} 
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.c.find('.submit').on('click', function(){
				actions.submit()
			})
		}

		var prepare = function(){
			current = templates[template];
			options = prepareParameters(templates[template])
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				template = deep(p, 'settings.essenseData.template') || 'common'
				
				prepare()

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.options = el.c.find('.optionsWrapper')

				renders.options()

				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				showbetter : true,
			
				class: 'supportwnd normalizedmobile withoutButtons',
				
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
	module.exports = support;
}
else{

	app.modules.support = {};
	app.modules.support.module = support;

}