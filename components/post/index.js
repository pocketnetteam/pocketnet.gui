var post = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history') || deep(p, 'primary');

		console.log('primary', p)

		var el, share, ed;

		var actions = {

			sharesocial : function(clbk){
		
				var url = 'https://pocketnet.app/'+self.app.nav.get.pathname()+'?s='+share.txid+'&mpost=true' + '&ref=' + self.app.platform.sdk.address.pnet().address + '&address=' + (parameters().address || "")

				var m = share.caption || share.message;

				var nm = trimHtml(m, 20);

				var image = share.images[0];

				if (!image && share.url){
					var v = videoImage(share.url)

					if (v){
						image = v;
					}
				}

				self.nav.api.load({
					open : true,
					href : 'socialshare',
					history : true,
					inWnd : true,

					essenseData : {
						url : url,
						caption : 'Share publication in social',
						image : image,
						title : nm
					}
				})
			
			},

			donate : function(clbk){

				var userinfo = deep(app, 'platform.sdk.usersl.storage.' + share.address) || {
					address : share.address,
					addresses : []
				}

				var link = 'send?address=' + share.address + '&amount=1&message='
				+hexEncode(self.app.localization.e('postlabel') + ' &mdash; ' + (share.caption || share.message).substr(0, 20) + "...")
				+'&label=' + (userinfo.name || userinfo.address) + '&setammount=true'


				self.fastTemplate('donation', function(rendered){
					dialog({
						html : rendered,
						class : "one donation",

						btn1text : self.app.localization.e('dcancel'),

						clbk : function(el,d ){

							el.find('.pnetdnt').on('click', function(){
								self.nav.api.load({
									open : true,
									href : link,
									history : true
								})

								self.closeContainer()

								d.destroy()
							})

							el.find('.copy').on('click', function(){
								var a = $(this).closest('.address').find('.addr')

								copyText(a)

								sitemessage(self.app.localization.e('successfullycopiedaddress'))
							})

						}
					})
				}, {
					userinfo : userinfo
				})
				

			
			},
			
			position : function(){

				if(primary) return


				var h = $(window).height();

				var wh = el.wr.height();

				var d = (h - wh) / 2

				if (d > 0){
					el.wr.css('margin-top', d + 'px')
				}
				else
				{
					el.wr.css('margin-top', 0 + 'px')
				}

			},
			initVideo : function(clbk){
				var pels = el.c.find('.js-player');

				if (pels.length)
				{		
					var player = new Plyr(pels[0], {						
						autoplay : true,
						resetOnEnd : true
					})

					player.on('ready', function(){

						if (clbk)
							clbk()

					})
				}
			},

			///
			///
			
			like : function(value, clbk){

				var upvoteShare = share.upvote(value);

				if(!upvoteShare){
					self.app.platform.errorHandler('4', true)	

					if(clbk)
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

			complain : function(clbk){

				var complainShare = share.complain();

			
				self.sdk.node.transactions.create.commonFromUnspent(

					complainShare,

					function(tx, error){

						console.log(tx, error)

						topPreloader(100)

						if(!tx){

							el.postWrapper.addClass('showError');

							sitemessage(errors.complain[error])
							
							if (clbk)
								clbk()
						}
						else
						{

							dialog({
								html : "<b>TXID:</b> " + tx.txid,
								class : "one"
							})

							if (clbk)
								clbk(true)
						}

					}
				)
			},			

			unsubscribe : function(clbk){
				self.app.platform.api.actions.unsubscribe(share.address, function(tx, error){
					if(!tx){
						self.app.platform.errorHandler(error, true)	
					}

					if (clbk)
						clbk(tx, error)
				})	
			},

			subscribe : function(clbk){

				self.app.platform.api.actions.subscribe(share.address, function(tx, error){
					if(!tx){
						self.app.platform.errorHandler(error, true)	
					}

					if (clbk)
						clbk(tx, error)
				})

		
			},

			

			openGallery : function(initialValue){
				
				var images = _.map(share.images, function(i){
					return {
						src : i
					}
				})

				var num = findIndex(images, function(image){

					if (image.src == initialValue) return true;						

				})

				self.app.nav.api.load({
					open : true,

					href : 'imagegallery?i=' + share.txid + '&num=' + (num || 0),

					inWnd : true,
					history : 'true',
					essenseData : {
						initialValue : initialValue,
						idName : 'src',
						images : images
					}
				})
			},
		}

		var events = {
			unsubscribe : function(clbk){
				actions.unsubscribe(function(){
					if (tx)
						el.share.find('.shareTable').removeClass('subscribed');
				})	
			},

			subscribe : function(clbk){

				actions.subscribe(function(tx){
					if (tx)
						el.share.find('.shareTable').addClass('subscribed');
				})

		
			},
			getTransaction : function(){
				self.app.platform.sdk.node.transactions.get.tx(share.txid)
			},

			like : function(){

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

						var value = $(this).attr('value')


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

								if (ed.like)
									ed.like(share)

								//_scrollTo(p)
							}
							else
							{
								p.removeAttr('value')
								p.removeClass('liked')
							}
						})
					}
				})

				

		


				/*actions.stateAction('_this', function(){
					actions.like(value)

					p.attr('value', value)
					p.addClass('liked')

					_scrollTo(p)
				})*/


			},

			complain : function(){				

				dialog({
					html : "Do yor really want to complain on this post?",
					btn1text : "Yes",
					btn2text : "No",

					success : function(){
						el.share.addClass('complained')

						topPreloader(30);

						actions.complain(function(r){
							topPreloader(100);
							if(!r){
								p.removeClass('hidden')
							}
						})
					}
				})

					
			},

			

			openGallery : function(){
				var src = $(this).attr('i')

				actions.openGallery(src)
			},

			sharesocial : function(){

				actions.sharesocial()
			},

			donate : function(){
				

				actions.donate()
			},

		}

		var renders = {
			empty : function(){
				self.shell({
					name :  'empty',
					el : el.share,

				}, function(_p){

					actions.position()


				})
			},
			images : function(clbk){

				var _el = el.c.find(".image");
				var images = el.c.find(".images");

				if(images.hasClass('active') || !_el.length || !images.length){

					if (clbk)
						clbk()

				}
				else
				{
					_el.imagesLoaded({ background: true }, function(image) {

						if(share.settings.v != 'a'){

							_.each(image.images, function(img, n){

								var _img = img.img;

								var el = $(image.elements[n]).closest('.imagesWrapper');
								var ac = '';

								var _w = el.width();
								var _h = el.height()

								var w = _w * (_img.width / _img.height);

								el.height(_w * (_img.height / _img.width))
								
							})

						}

						

						images.addClass('active')

						_el.addClass('active')

						if (clbk)
							clbk()

					});
				}

				
				
			},
			share : function(clbk){

				self.shell({
					turi : 'lenta',
					name :  'share',
					el : el.share,
					data : {
						share : share,
						all : true,
						mestate : {}
					},

				}, function(_p){

					actions.position();

					el.wr.addClass('active')

					renders.stars(function(){

						renders.url(function(){

							actions.position()
							
							renders.urlContent(function(){

								actions.position()

								actions.initVideo()

								renders.images(function(){

									actions.position()


									if (clbk)
										clbk()
									
								})


							});
					

						})

					})

				})
			},
			stars : function(clbk){


				self.shell({
					turi : 'lenta',
					name :  'stars',
					el : el.share.find('.forstars'),
					data : {
						share : share
					}					

				}, function(p){


					fastars(p.el.find('.stars'))

					if (clbk)
						clbk()

				})
				
			},
			url : function(clbk){

				var url = share.url

				var og = self.app.platform.sdk.remote.storage[url];


				self.shell({
					turi : 'share',
					name :  'url',
					el : el.c.find('.url'),
					data : {
						url : url,
						og : og,
						share : share
					},

				}, function(_p){

					var images = _p.el.find('img');

					_p.el.find('img').imagesLoaded({ background: true }, function(image) {

						_.each(image.images, function(i, index){
							if(i.isLoaded){
								$(images[index]).addClass('active')

								if(i.img.naturalWidth > 500){
									_p.el.addClass('bigimageinlink')
								}
							}
							else
							{
								$(images[index]).closest('.image').css('display', 'none')
							}
						})

						if (clbk)
							clbk()

					});

					

					

				})
			},

			urlContent : function(clbk){
				

				var url = share.url;

				if (url){

					var meta = self.app.platform.parseUrl(url);
					var og = self.app.platform.sdk.remote.storage[url];

					if (url && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo'){
							if (clbk)
								clbk()
						}
						else
						{
							self.app.platform.sdk.remote.get(url, function(og){

								if(og){
									renders.url(clbk)
								}
								else
								{
									if (clbk)
										clbk()
								}

							})
						}
					}

					else
					{
						if(clbk)
							clbk()
					}

				}	

				else
				{
					if(clbk)
						clbk()
				}			

			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.c.on('click', '.stars i', events.like)

			el.c.on('click', '.complain', events.complain)

			el.c.on('click', '.image', events.openGallery)

			el.c.on('click', '.txid', events.getTransaction)

			el.c.on('click', '.donate', events.donate)

			el.c.on('click', '.sharesocial', events.sharesocial)

			el.c.on('click', '.asubscribe', events.subscribe)
			el.c.on('click', '.aunsubscribe', events.unsubscribe)

			self.app.platform.ws.messages.transaction.clbks.temppost = function(data){

				if(data.temp){

					if(share.txid == data.temp.txid){

						share.temp = false
						share.scnt = "0"
						share.score = "0"
						share.myVal = 0

						renders.share()

						
					}

				}
				
			}

			self.app.platform.ws.messages.event.clbks.post = function(data){

				if(data.mesType == 'upvoteShare' && data.share){

					if(share.txid == data.share.txid){
						renders.stars(function(){
							
						})
					}

				

				}
				
			}

			self.app.platform.clbks.api.actions.subscribe.post = function(address){

				if(address == share.address){

					el.c.find('.shareTable').addClass('subscribed');

				}

				
			}

			self.app.platform.clbks.api.actions.unsubscribe.post = function(address){

				if(address == share.address){

					el.c.find('.shareTable').removeClass('subscribed');

				}
			}
		}

		var make = function(){

			if (share){
				renders.share()
			}
			else
			{
				renders.empty()
			}

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p ){

				var id = deep(p, 'settings.essenseData.share');

					ed = deep(p, 'settings.essenseData') || {};

					share = null;

				if (id){
					share = self.app.platform.sdk.node.shares.storage.trx[id] 


					if(!share){
						var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
							return s.txid == id
						})

						share = new pShare();
						share._import(temp);
						share.temp = true;
						share.address = self.app.platform.sdk.address.pnet().address
					}
				}

				/*self.app.nav.api.history.addParameters({
					s : share.txid
				})*/

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};

				delete self.app.platform.ws.messages.event.clbks.post
				
				delete self.app.platform.ws.messages.transaction.clbks.temppost
				
				self.app.nav.api.history.removeParameters(['s'])
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.share = el.c.find('.share');
				el.wr = el.c.find('.postWrapper')
				initEvents();

				make()

				

				p.clbk(null, p);
			},

			wnd : {
				class : 'withoutButtons postwindow',

				close : function(){
					//self.app.nav.api.history.removeParameters(['s'])
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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = post;
}
else{

	app.modules.post = {};
	app.modules.post.module = post;

}