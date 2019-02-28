var send = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, data;

		var actions = {
			stateAction : function(link, clbk){
				self.app.user.isState(function(state){

					if(state){
						clbk()
					}

					else
					{
						self.nav.api.load({
							open : true,
							id : 'authorization',
							inWnd : true,

							essenseData : {
								loginText : self.app.localization.e('llogin'),
								successHref : link,
								signInClbk : function(){

									if (clbk)
										clbk()
								}
							}
						})
					}

				})
			},

			send : function(){

				actions.stateAction('_this', function(){

					self.nav.api.load({
						open : true,
						history : true,
						href : 'userpage?id=wallet&action=send&address=' + data.address + '&amount=' + data.amount,
					})

				})

				
			}
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

		var amountmask = function(){
			var mask = {};

				mask.alias = 'numeric';
				mask.groupSeparator = ',';
				mask.radixPoint =  '.';
				mask.digits = 6;
				mask.digitsOptional = !1;
				mask.autoGroup = true;
				mask.allowMinus = false;

				if (mask.digits > 0){
					mask.placeholder = "0.000000"
				}

			el.am.inputmask(mask)

			if(!parameters().setammount) el.am.blur()
		}

		var initEvents = function(){
			
			el.c.find('.send').on('click', actions.send)

			el.am.on('change', function(){
				var v = $(this).val()

				data.amount = v;
			})

			amountmask()
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var p = parameters();

				data = {};

				if(p.address && bitcoin.address.fromBase58Check(p.address)){
					data.address = p.address
				}

				if(p.amount){
					data.amount = Number(p.amount)
				}

				if(p.label){
					data.label = clearScripts(donottrustLink(findAndReplaceLink(p.label, true)))
				}

				if(p.message){
					data.message = clearScripts(donottrustLink(findAndReplaceLink(hexDecode(p.message, true))))
				}

				if(data.amount && data.address && data.message){
					clbk(data);
				}

				else
				{
					self.nav.api.load({
						open : true,
						href : 'page404',
						history : true
					})
				}
				

				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.am = el.c.find('.amredit');

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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = send;
}
else{

	app.modules.send = {};
	app.modules.send.module = send;

}