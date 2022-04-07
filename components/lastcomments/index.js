var lastcomments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, loadinterval = null;

		var ed = null;

		var actions = {
			show : function(posttxid, commentid, parentid){
				self.app.platform.app.nav.api.load({
					open : true,
					href : 'post?s=' + posttxid,
					inWnd : true,
					history : true,
					clbk : function(d, p){									
						app.nav.wnds['post'] = p
					},

					essenseData : {
						share : posttxid,
						hr : 'index?',

						reply : {
							answerid : commentid,
							parentid : parentid || "",
							noaction : true
						}
					}
				})
			}
		}

		var events = {
			show : function(){
				var commentid = $(this).attr('id')
				var parentid = $(this).attr('pid')
				var posttxid = $(this).closest('.commentgroup').attr('share')

				actions.show(posttxid, commentid, parentid)
			}
		}

		var renders = {
			comments : function(comments){

				self.shell({
					name :  'lastcommentslist',
					el : el.c,
					data : {
						comments : comments
					}					

				}, function(p){
					p.el.find('.comment').on('click', events.show)

					/*p.el.find('.image').imagesLoadedPN({ imageAttr: true }, function(image) {

						if(ed.renderclbk) ed.renderclbk()

					}, self.app);*/


					if(ed.renderclbk) ed.renderclbk()

				})

			}
		}

		var load = function(clbk){
			self.app.platform.sdk.comments.last(function(c, error){

				var bytx = group(c, function(c){
					return c.txid
				})

				var txids = _.map(bytx, function(g, id){
					return id;
				})

				self.app.platform.sdk.node.shares.getbyid(txids, function(l, error2){

					var au = [];

					_.each(c, function(comment){ 
    
						var share = app.platform.sdk.node.shares.storage.trx[comment.txid]

						if(share && comment){
							au.push(share.address)
							au.push(comment.address)
						}

						

					})

					au = _.uniq(au)

					self.sdk.users.get(au, function(l, error3){

						if (clbk)
							clbk(bytx, error || error2 || error3)

					}, true)

					
				})

				
			})
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		
		var initEvents = function(){
			
			self.app.platform.ws.messages['newblocks'].clbks['lastcomments'] =
			self.app.platform.ws.messages['new block'].clbks['lastcomments'] = function(data, p){
				
				if(self.app.platform.focus){
					if(!rand(0, 5)){
						make()
					}
					
				}

				//multimake()
				

			}

			/*self.app.platform.clbks._focus.lastcomments = function(time){

				if(time > 120 && typeof _Electron != 'undefined'){
					console.log("CLBKS2")
					make()

					
				}
			}*/


		}

		var make = function(){
			load(function(comments, error){

				if(!el.c) return

				if (error){

					self.iclbks.main = make

					el.c.addClass('hidden')

					return
				}

				el.c.removeClass('hidden')

				renders.comments(comments)
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				ed = p.settings.essenseData || {}
				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};

				delete self.app.platform.ws.messages['newblocks'].clbks['lastcomments'];
				delete self.app.platform.ws.messages['new block'].clbks['lastcomments'];
				delete self.app.platform.clbks._focus.lastcomments;
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

				
				//multimake()
				

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
	module.exports = lastcomments;
}
else{

	app.modules.lastcomments = {};
	app.modules.lastcomments.module = lastcomments;

}