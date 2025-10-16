var fastsend = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, text = null, message = null;

		var actions = {

			makeTransaction : function(list, message, clbk, nr){

				var transaction = new Transaction()
				
					transaction.source.set([self.app.user.address.value])
					
					transaction.reciever.set(_.map(list, ({address, value}) => {
						return {address, amount : value}
					}))

					transaction.feemode.set('include')

					if(message) transaction.message.set(message)
					
					globalpreloader(true, null, true)

					self.app.platform.actions.addActionAndSendIfCan(transaction, 1, null, {
						calculatedFee : 0,
						rejectIfError : nr ? false : true
					}).then((action) => {

						text.value = ''
						renders.inputs()
	
						setTimeout(() => {
	
							sitemessage(self.app.localization.e('wssuccessfully'))
			
							successCheck()

							
			
							if(clbk) clbk(action, action.transaction)
	
						}, 300)
	
					}).catch(e => {
	
						sitemessage(e)
	
						if(onerror) onerror(e)
	
					}).finally(() => {
						globalpreloader(false)
					})
			},

			parseList : function(){
				return _.filter(_.map(text.value.split('\n'),(s) => {
					var ps = s.split(' ')

					var address = ps[0]

					var value = ps[1] || 0

					try{
						bitcoin.address.fromBase58Check(address)
						value = Number(Number(value).toFixed(8))
					}
	
					catch (e){
						return {}
					}

					return {
						address,
						value
					}
				}), (v) => {
					return v.address && v.value > 0
				})
			}

		}

		var events = {
			
		}

		var renders = {
			info : function(){

				var list = actions.parseList()

				self.shell({

					name :  'info',
					el :   el.c.find('.infowrapper'),
					data : {
						list, message : message.value
					},

				}, function(_p){

				})
			},
			inputs : function(){

				self.shell({

					name :  'inputs',
					el :   el.c.find('.inputwrapper'),
					data : {
						options : {
							text,
							message
						}
					},

				}, function(_p){
					ParametersLive([text, message], _p.el)
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
			

			el.c.find('.send').on('click', function(){
				var list = actions.parseList()

				var value = _.reduce(list, function(m,v){return m + v.value}, 0).toFixed(8)

				var count = 50

				if (count < 2) count = 2

				if (list.length && value){

					if(list.length < count){
						new dialog({
							html : 'Do you really want to send ' + self.app.platform.mp.coin(value) + ' to ' + list.length + ' addresses',
							class : 'one',

							success : function(){
								actions.makeTransaction(list, message.value, function(){

								})
							}
						})
					}

					else{

						var llist = _.toArray(_.groupBy(list, (l, index) => {
							return Math.floor(index / count)
						}))

						console.log('llist', llist)

						new dialog({
							html : '!IMORTANT! There will be <b>'+llist.length+'</b> transactions. Do you really want to send ' + self.app.platform.mp.coin(value) + ' to ' + list.length + ' addresses',
							class : 'one',

							success : function(){
								_.each(llist, (list) => {

									actions.makeTransaction(list, message.value, function(){

									})

								})

								setTimeout(() => {
									self.nav.api.go({
										open : true,
										href : 'activities',
										inWnd : true,
										history : true,
										essenseData : {
											activityFilter : "pending"
										}
									})
								}, 300)

								
								
							}
						})
					}

					
				}
				else{
					sitemessage('Empty list')
				}
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				text = new Parameter({
					name : 'Recievers',
					id : 'message',
					type : "TEXT",
					onType : true,
					placeholder : 'address amount\naddress amount',
					
				})

				message = new Parameter({
					name : 'Message',
					placeholder : 'exapmle - a:donate',
					id : 'subject',
					type : "STRINGANY",
					onType : true,
					onFocus : function(pn){
					}
				})

				text._onChange = function(){
					renders.info()
				}

				message._onChange = function(){
					renders.info()
				}

				var data = {
					ed,
					
				};

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};

				text = null
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				renders.inputs()

				initEvents();

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

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = fastsend;
}
else{

	app.modules.fastsend = {};
	app.modules.fastsend.module = fastsend;

}