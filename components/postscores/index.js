var postscores = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, share, scores, ed;

		var actions = {
			like : function(value, clbk){

				if (share.address == self.user.address.value) return

				if (value <= 3){
					if(self.app.platform.sdk.user.scamcriteria()){

						if (clbk)
							clbk(false)

							dialog({
								html : self.app.localization.e('ratings123'),
								btn1text :  self.app.localization.e('daccept'),
								btn2text : self.app.localization.e('ucancel'),
			
								class : 'zindex one',
			
								success : function(){
								}
							})

						return
					}

					if(self.app.platform.sdk.user.upvotevalueblockcriteria(value)){
						if (clbk)
							clbk(false)

						sitemessage(self.app.localization.e('ratingss3'))

						return
					}
				}

				var upvoteShare = share.upvote(value);

				if(!upvoteShare){
					self.app.platform.errorHandler('4', true)	

					if (clbk)
						clbk(false)

					return
				}

				self.sdk.node.transactions.create.commonFromUnspent(

					upvoteShare,

					function(tx, error){

						topPreloader(100)

						if(!tx){							

							share.myVal = null;		

							self.app.platform.errorHandler(error, true)	

							if (clbk)
								clbk(false)
							
						}
						else
						{

							if (clbk)
								clbk(true)
						}

					}
				)
			},
		}

		var events = {
			like : function(){

				var value = $(this).attr('value')
				
				self.app.user.isState(function(state){
					if(!state){
						self.nav.api.load({
							open : true,
							href : 'authorization',
							history : true
						})
					}
					else
					{
						var p = $(this).closest('.stars');

						if (p.attr('value')){
							return
						}

						p.attr('value', value)
						p.addClass('liked')
						
						actions.like(value, function(r){
							if(r){
								share.scnt || (share.scnt = 0)
								share.score || (share.score = 0)

								share.scnt++;
								share.score = Number(share.score || 0) + Number(value);

								var v = Number(share.score) / Number(share.scnt) 


								p.find('.tstarsov').css('width', ((v / 5) * 100) + '%')
								p.closest('.itemwr').find('.count span.v').html(v.toFixed(1))

								renders.stars()

								scores.push({
									address : self.user.address.value,
									value : value
								})

								renders.details()
								renders.userlist()

								if (ed.like)
									ed.like(share)

							}
							else
							{
								p.removeAttr('value')
								p.removeClass('liked')
							}
						})
					}
				})


			},
		}

		var renders = {

			userlist : function(clbk){

				scores = _.filter(scores, function(s){
					return s.value >= Number(1)
				})

				var addresses = _.map(scores, function(s){
					return s.address
				}).filter(function(value, index, self){
					return self.indexOf(value) === index;
				})

				console.log('scores', scores, addresses)

				var map = {};

				_.each(scores, function(s){
					map[s.address] = s.value
				})

				self.nav.api.load({

					open : true,
					id : 'userslist',
					el : el.users,
					animation : false,

					essenseData : {
						addresses : addresses,
						empty : self.app.localization.e('e13151'),
						caption : self.app.localization.e('e13152'),
						cnt : el.c.find('#fordetailsusers'),
						sort : 'commonuserrelation',
						extra : function(address){

							var h = ''

							h = h + '<div class="userscore">'

							h = h + map[address] + ' <i class="fas fa-star"></i>'

							h = h + '</div>'

							return h;
						}
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})

			},

			mystars : function(clbk){

				if(typeof share.myVal == 'undefined'){
					var ids = [share.txid]

					self.app.platform.sdk.likes.get(ids, function(){

						renders.stars()

					})
				}
				
			},
			stars : function(clbk){

				self.shell({
					turi : 'lenta',
					name :  'stars',
					el : el.stars,
					data : {
						share : share,
						hideCount : true
					}					

				}, function(p){					

					fastars(p.el.find('.stars'))

					p.el.find('.stars i').on('click', events.like)

					if (clbk)
						clbk()

				})

				
			},

			details: function(clbk){

				self.shell({
					name :  'details',
					el : el.details,
					data : {
						share : share,
						scores : scores
					}					

				}, function(p){

					p.el.find('.line').each(function(){
						var l = $(this)

						l.width(l.attr('awidth') + "%")
					})

					if (clbk)
						clbk()

				})

				
			},
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
			renders.stars(function(){
				renders.details()
				renders.userlist()
				renders.mystars()
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var shareid = deep(p, 'settings.essenseData.share')

				ed = deep(p, 'settings.essenseData')

				self.app.platform.sdk.node.shares.getbyid([shareid], function(){

					share = self.app.platform.sdk.node.shares.storage.trx[shareid] 
						

					if(!share){
						var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
							return s.txid == shareid
						})

						if (temp){
							share = new pShare();
							share._import(temp, true);
							share.temp = true;
							share.address = self.app.platform.sdk.address.pnet().address
						}

					}

					if (share){

						self.app.platform.sdk.postscores.get(shareid, function(){

							scores = self.sdk.postscores.storage[shareid] || []

							var data = {
								share : share
							};
		
							clbk(data);
		
						})

					}
				
				})

				
				

			},

			destroy : function(){
				el = {};
			},
			clearparameters : ['p'],
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.stars = el.c.find('.forstars');
				el.details = el.c.find('.details');
				el.users = el.c.find('.users')

				initEvents();

				make();

				p.clbk(null, p);
			},

			wnd : {
				class : 'postscoreswnd normalizedmobile maxheight'
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
	module.exports = postscores;
}
else{

	app.modules.postscores = {};
	app.modules.postscores.module = postscores;

}