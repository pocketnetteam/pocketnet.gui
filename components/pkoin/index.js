var pkoin = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var el, optionsValue = 'pkoinComment', shareId, receiver, valSum, valComment, disabled, userinfo, boost = [], share = null;

		var renders = {

			fields: function(){
				
				self.app.platform.sdk.node.transactions.get.allBalance(function (total) {

					self.app.platform.sdk.node.transactions.get.canSpend(self.sdk.address.pnet().address, function (balance) {
	
						var my = (share.address == self.app.user.address.value)
	
						var values = ['pkoinComment', 'sendToAuthor']
						var labels = [self.app.localization.e('pkoinComment'), self.app.localization.e('sendToAuthor')]
	
						var blocked = self.app.platform.sdk.user.reputationBlocked(share.address)
	
						if (my){
							values = []
							labels = []
	
							optionsValue = 'liftUpThePost'
						}
	
						if (self.app.boost && !blocked){
							values.push('liftUpThePost')
							labels.push(self.app.localization.e('liftUpThePost'))
						}
	
						var options = new Parameter({
	
							type : "VALUES",
							name : "Localization",
							id : 'localization',
							defaultValue : optionsValue,
							possibleValues : values,
							possibleValuesLabels : labels,
	
							_onChange : function(value){
	
								optionsValue = value;
	
								renders.fields();
							},
	
							onFocus : function(el){
								_scrollTo(el, el.c.closest('.customscroll'), 0)
							}
				
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
								valComment : valComment,
								total: total.toFixed(3),
								balance : balance.toFixed(3),
								userinfo: userinfo
	
							},
	
						}, function(_p){
	
							ParametersLive([options], _p.el);
	
							el.inputSum = _p.el.find('#inputSum');
		
							var errorWrapper = _p.el.find('#errorWrapper');
							
							el.inputSum.on('keyup', function(e){
								valSum = Number(e.target.value);
								
								if (valSum > Number(balance)){
	
									errorWrapper.text(self.app.localization.e('incoins'));
									disabled = true;
									el.send.addClass('disabled');
	
								} else if (valSum < 0.5){
	
									errorWrapper.text(self.app.localization.e('minPkoin', 0.5));
									disabled = true;
									el.send.addClass('disabled');
	
	
								} else {
	
									errorWrapper.text('');
									disabled = false;
									el.send.removeClass('disabled');
	
								}
			
								
	
								if(optionsValue === 'liftUpThePost') {
									renders.boostinfo(boost)
								}
	
							})
	
							if(optionsValue === 'liftUpThePost') {
	
								self.app.platform.sdk.node.shares.getboost({
									lang: share.language,
									count : 10,
				
								}, function(_boost ,err){
	
									boost = _boost
	
									renders.boostinfo(boost)
	
								}, boost ? 'cache' : null)
							}
	
							el.textareaComment = _p.el.find('#textareaComment');
	
							el.textareaComment.on('focus', function(){
								_scrollTo(el.textareaComment, el.c.closest('.customscroll'), 0)
							})
						})
	
					});

				})

			},

			boostinfo : function(boost){
				
				if(!valSum){

					el.c.find('.boostinfo').html('')

				}
				else{
						
					var vs = 100000000 * valSum

					var prevboost = _.find(boost, function(r){
						if(r.txid == shareId){
							return true
						}
					})

					if (prevboost){
						vs += prevboost.boost
					}

					var total = _.reduce(boost, function(sum, r){ 

						if(r.txid == shareId){
							return sum
						}

						return sum + Number(r.boost || 0) 
					}, 0)

					var probability = Math.min(!total ? 1 : 3 * (vs / total), 1)

					self.shell({

						name :  'boostinfo',
						el :   el.c.find('.boostinfo'),
						data : {
							probability,
							share,
							language : share.language
						},

					}, function(_p){
						
					})
					
				}

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
						sitemessage(err);

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

						successCheck()

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

					disabled = false;

				}

				if (!disabled){

					
					self.app.platform.sdk.node.transactions.get.canSpend(self.sdk.address.pnet().address, function (amount) {


						balance = amount.toFixed(3);
						valSum = Number(el.inputSum.val());
	
						if (valSum){
	
	
							if (valSum && valSum < 0.05){
	
								sitemessage(self.app.localization.e('minPkoin', 0.05))
	
							} else if (valSum < Number(balance)){

								disabled = true;
	
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
				var userinfo = essenseData.userinfo;


					receiver = userinfo.address;
					optionsValue = 'pkoinComment';

				var data = {
					userinfo: userinfo
				}

				boost = null
				shareId = essenseData.id;

				self.app.platform.sdk.node.shares.getbyid([shareId], function () {

					share = self.app.platform.sdk.node.shares.storage.trx[shareId]


					clbk(data);

				})

			},

			destroy : function(){

				valSum = null;
				valComment = null;
				boost = []
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
				class : 'pkoinwindow normalizedmobile maxheight',
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