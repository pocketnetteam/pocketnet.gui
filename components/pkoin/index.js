var pkoin = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var el, optionsValue = 'pkoinComment', shareId, receiver, valSum, valComment, disabled, userinfo, boost = [], share = null, hiddenBlocks = false, balance = 0;

		var renders = {

			fields: function(){

				var account = self.app.platform.actions.getCurrentAccount()

				if (account){
					var b = account.actualBalance()
					var total = b.actual
					balance = b.actual - b.tempbalance

					var my = (share.address == self.app.user.address.value)
	
					var values = ['pkoinComment', 'sendToAuthor']
					var labels = [self.app.localization.e('pkoinComment'), self.app.localization.e('sendToAuthor')]

					var blocked = self.app.platform.sdk.user.reputationBlocked(share.address)

					if (self.app.boost && my){
						values = []
						labels = []

						optionsValue = 'liftUpThePost'
					}

					if (self.app.boost && !app.pkoindisable && !blocked && optionsValue === 'liftUpThePost'){
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
							total: total.toFixed(2),
							balance : balance.toFixed(2),
							userinfo: userinfo

						},

					}, function(_p){

						ParametersLive([options], _p.el);

						el.inputSum = _p.el.find('#inputSum');
	
						el.errorWrapper = _p.el.find('#errorWrapper');
						
						el.inputSum.on('keyup', function(e){

							valSum = Number(e.target.value);

							actions.checkSum();

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

				}
				

			},

			boostinfo : function(boost){

				if (!valSum) valSum = 0;

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

				const getAudience = function(probability){
					return (probability * (share.language === 'en' ? 7000 : share.language === 'ru' ? 78750 : 0)).toFixed(0);
				}

				const getSum = (probability) => {

					// Convert percentage to a ratio in the range 0-1
					const probabilityRatio = probability / 100;

					// If there are no boosts yet, any amount will give 100% probability.
					// Return 0 in this edge-case to avoid division by zero.
					if (!total) return 0;

					const prevboost = _.find(boost, r => r.txid == shareId);
					const currentBoost = prevboost ? Number(prevboost.boost || 0) : 0;

					// Required satoshi (1 PKOIN = 1e8 satoshi) to reach the target probability
					const vsRequired = Math.min(probabilityRatio, 1) * total / 3;

					// Additional satoshi still needed after accounting for an existing boost
					const vsToAdd = Math.max(vsRequired - currentBoost, 0);

					// Convert satoshi back to PKOIN amount
					return Number((vsToAdd / 100000000).toFixed(2));
				}

				var audience = getAudience(probability);

				//el.tutorial.removeClass('show');

				self.shell({

					name :  'boostinfo',
					el :   el.c.find('.boostinfo'),
					data : {
						probability,
						share,
						language : share.language,
						hiddenBlocks: hiddenBlocks,
						audience: audience
					},

				}, function(_p){

					_p.el.find('.showMore').on('click', function(){

						var boostinfoblocks = _p.el.find('.boostinfoblocks');

						if (boostinfoblocks.hasClass('hiddenBlocks')){
							hiddenBlocks = false;
						} else {
							hiddenBlocks = true;
						}

						boostinfoblocks.toggleClass('hiddenBlocks')
					})

					el.inputProbability = _p.el.find('#inputProbability');

					el.valAudience = _p.el.find('#valAudience');
						
					el.inputProbability.on('keyup', function(e){

						var probabilityPercent = Number(e.target.value);

						if (probabilityPercent > 100){
							probabilityPercent = 100;
							el.inputProbability.val(probabilityPercent);
						}

						valSum = getSum(probabilityPercent);
						el.inputSum.val(valSum);

						probability = probabilityPercent / 100;

						audience = getAudience(probability);
						el.valAudience.text(audience);

						actions.checkSum();

					})
					
				})
					
				

			}
		}

		var actions = {

			checkSum : function(){
				
				if (valSum > Number(balance)){

					el.errorWrapper.text(self.app.localization.e('incoins'));
					disabled = true;
					el.send.addClass('disabled');

				} else if (valSum < 2.5){

					el.errorWrapper.text(self.app.localization.e('minPkoin', 2.5));
					disabled = true;
					el.send.addClass('disabled');


				} else {

					el.errorWrapper.text('');
					disabled = false;
					el.send.removeClass('disabled');

				}
			},

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

				globalpreloader(true, null, true)

				self.app.platform.actions.addActionAndSendIfCan(booster).then(action => {
                  
					successCheck()

					if (clbk) clbk()
  
				}).catch(e => {

					self.app.platform.errorHandler(e, true)

				}).finally(() => {
					globalpreloader(false)
				})

				/*self.sdk.node.transactions.create.commonFromUnspent(

					booster,

					function (_alias, error) {

						globalpreloader(false)

						successCheck()

						clbk()

					}
				)*/
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

			
			el.playVideo.on('click', function(){

				
				self.nav.api.load({
					open: true,
					id: 'boost',
					inWnd: true,

					essenseData: {
						autoplay: true,
						minimal: true
					}
				})
				
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
					
					var account = self.app.platform.actions.getCurrentAccount()

					if (account){
						var b = account.actualBalance()
						var total = b.actual
						var balance = (b.actual - b.tempbalance).toFixed(2);

						valSum = Number(el.inputSum.val());
	
						if (valSum){
	
							if (valSum && valSum < 2.5){
	
								sitemessage(self.app.localization.e('minPkoin', 2.5))
	
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

					}

				}

				
			})

			renders.fields();

		}


		return {
			primary : primary,

			getdata : function(clbk, p){

				var essenseData = p.settings.essenseData;
				var format = essenseData.format;
				var userinfo = essenseData.userinfo;


					receiver = userinfo.address;
					optionsValue = 'pkoinComment';

				if (format){
					optionsValue = format;
				}

				var data = {
					userinfo: userinfo,
					format: format
				}

				boost = null
				shareId = essenseData.id;

				self.app.platform.sdk.node.shares.getbyid([shareId], function () {

					share = self.psdk.share.get(shareId)
					
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
				el.playVideo = el.c.find('#playVideo');

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

			window.rifticker.add(() => {
				essense.destroy();
			})

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