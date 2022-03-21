var pkoin = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var el, optionsValue = 'pkoinComment', shareId, receiver, valSum, valComment, disabled;

		var renders = {

			fields: function(){

			
				var options = new Parameter({

					type : "VALUES",
					name : "Localization",
					id : 'localization',
					defaultValue : optionsValue,
					possibleValues : ['pkoinComment', 'sendToAuthor'/*, 'liftUpThePost'*/],
					possibleValuesLabels : [self.app.localization.e('pkoinComment'), self.app.localization.e('sendToAuthor')/*, self.app.localization.e('liftUpThePost')*/],

		
					_onChange : function(value){

						optionsValue = value;

						renders.fields();
					},
		
				})


				if (el.textareaComment){
					valComment = el.textareaComment.val();
				}

				self.shell({

					name :  'fields',
					el :   el.fields,
					data : {
						options : options,
						optionsValue: optionsValue,
						valSum : valSum,
						valComment : valComment
					},

				}, function(_p){

					self.app.platform.sdk.node.transactions.get.balance(function(balance){

						ParametersLive([options], _p.el);

						el.inputSum = _p.el.find('#inputSum');
	
						var errorWrapper = _p.el.find('#errorWrapper');
						
						el.inputSum.on('keyup', function(e){
							valSum = Number(e.target.value);
							
							if (valSum >= Number(balance)){

								errorWrapper.text(self.app.localization.e('maxPkoin', balance.toFixed(3)));
								disabled = true;
								el.send.addClass('disabled');

							} else if (valSum < 0.05){

								errorWrapper.text(self.app.localization.e('minPkoin', 0.05));
								disabled = true;
								el.send.addClass('disabled');


							} else {

								errorWrapper.text('');
								disabled = false;
								el.send.removeClass('disabled');

							}
							
						});
	
						el.textareaComment = _p.el.find('#textareaComment');


					})

					
				})

			}
		}

		var actions = {

			links : function(current, text){
				
				if (current)

					if(!current.url.v){
						
						var l = null
						var r = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 

						var matches = text.match(r);

						if(matches && matches.length > 0){
							l = matches[0]
						}

						if (l)
							current.url.set(l)

					}
				
			},
			donate : function(comment, clbk){	

				globalpreloader(true);

				self.app.platform.sdk.comments.send(shareId, comment, null, null, function(err, alias){

					globalpreloader(false)

					if(!err){
						if (clbk)
							clbk(null, alias)
					}

					else
					{
						self.app.platform.errorHandler(err, true)

						if (clbk){
							clbk(err, null)

							// if (err === 'tosmallamount'){
							// 	actions.removeDonate(id, p)
							// }
						}
					}

				}, null, "0");
			},
			liftUp : function(booster, clbk){	

				globalpreloader(true);

				self.sdk.node.transactions.create.commonFromUnspent(

					booster,

					function (_alias, error) {

						globalpreloader(false)

						clbk()

					}
				)
			}

		}

		var events = {
			donate : function(clbk){

				
				var comment = new Comment(shareId);
				comment.message.set(valComment);

				comment.donate.set({
					address: receiver,
					amount: valSum
				})
				

				actions.donate(comment, clbk);

			},

			liftUp : function(clbk){

				
				var contentBoost = new ContentBoost(shareId);

				contentBoost.amount.set(valSum);

				actions.liftUp(contentBoost, clbk);

			}
		}


		var initEvents = function(_p){


			var closeContainer = function(){

				valSum = null;
				valComment = null;

				if (_p.container && _p.container.close){
	
					_p.container.close();

				}
			}

			el.buy.on('click', function(){

				self.app.platform.ui.wallet.buy();


				setTimeout(function(){
					closeContainer()
				}, 200)

				
			})

			el.send.on('click', function(){


				var final = function(err, data){

					if (!err){

						new Audio('sounds/donate.mp3').play();

						setTimeout(function(){
							closeContainer()
						}, 200)
					}

				}

				if (!disabled){

					self.app.platform.sdk.node.transactions.get.balance(function(amount){

						balance = amount.toFixed(3);
						valSum = Number(el.inputSum.val());
	
						if (valSum){
	
	
							if (valSum && valSum < 0.05){
	
								sitemessage(self.app.localization.e('minPkoin', 0.05))
	
							} else if (valSum < Number(balance)){
	
								if (optionsValue === 'pkoinComment'){
	
									if (el.textareaComment){
										valComment = el.textareaComment.val();
									}
	
									if (valComment){
	
										events.donate(final);
	
									} else {
	
										sitemessage(self.app.localization.e('e13057'))
									}
		
								}
	
								
								if (optionsValue === 'liftUpThePost'){
	
	
									events.liftUp(final);
			
		
								}
		
								if (optionsValue === 'sendToAuthor'){
		
							
									self.app.platform.ui.wallet.send({
										address : receiver,
										amount: valSum
									})
		
									setTimeout(function(){
										closeContainer()
									}, 200)
			
								}
		
							} else {
		
								sitemessage(self.app.localization.e('incoins'))
							}
						} else {
	
							sitemessage(self.app.localization.e('e13057'))
	
						}
						
					
					})

				}

				
			})

			renders.fields();

		}


		return {
			primary : primary,

			getdata : function(clbk, p){

				var essenseData = p.settings.essenseData;
				var userinfo = essenseData.userinfo
				receiver = userinfo.address;

				var data = {
					address : userinfo.address,
					balance : essenseData.balance
				}



				shareId = essenseData.id;

				clbk(data);

			},

			destroy : function(){

				valSum = null;
				valComment = null;
				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.fields = el.c.find("#fieldsWrapper");
				el.send = el.c.find('.sendButton');
				el.buy = el.c.find('#buyButton');


				initEvents(p);
			
				p.clbk(null, p);
			},

			wnd : {
				swipeClose : true,
				trueshold : 1,
				swipeCloseDir : 'down',
				class : 'pkoinwindow normalizedmobile',
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