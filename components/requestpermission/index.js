var requestpermission = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

		}

		var events = {
			
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.c.find('.granted').on('click', () => {
				ed.success('granted')

				self.closeContainer()
			})

			el.c.find('.once').on('click', () => {
				ed.success('once')

				self.closeContainer()

			})

			el.c.find('.forbid').on('click', () => {
				ed.fail('forbid')

				self.closeContainer()
			})
		}

		var getdata = {
			payment : function(data){

				return new Promise((resolve, reject) => {

					var result = {}

					var recievers = _.map(data.recievers, (a) => {
						return a.address
					})

					self.sdk.users.get(recievers, function(){
						result.recieversInfo = _.map(recievers, (r) => {
							return self.psdk.userInfo.get(r)
						})

						var unloaded = _.find(recievers, (r) => {
							return !_.find(result.recieversInfo, (reciever) => {
								return reciever.address == r
							})
						})

						if (unloaded){
							return reject('unableGetData:recieverInfo:' + unloaded)
						}

						resolve(result)
					})
				})
				
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = {...p.settings.essenseData || {}}

				var pr = getdata[ed.permission] ? getdata[ed.permission](ed.data) : Promise.resolve({})

				pr.then((additional) => {
					//application, meta, permission, data

					var data = {
						ed,
						additional
					};

					clbk(data);
				}).catch(e => {
					console.error('e', e)
					if(ed.fail) ed.fail('error')

					self.closeContainer()
				})



				//// 

			},

			destroy : function(){
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				class : 'requestpermissionWindow normalizedmobile maxheight withoutButtons',

				closecross : function(){
					if(ed.fail) ed.fail('cancel')
				}
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
	module.exports = requestpermission;
}
else{

	app.modules.requestpermission = {};
	app.modules.requestpermission.module = requestpermission;

}