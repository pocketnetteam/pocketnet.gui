var lastcomments = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, loadinterval = null;

		var actions = {
			show : function(posttxid, commentid, parentid){
				self.app.platform.app.nav.api.load({
					open : true,
					href : 'post?s=' + posttxid,
					inWnd : true,
					//history : true,
					clbk : function(d, p){									
						app.nav.wnds['post'] = p
					},

					essenseData : {
						share : posttxid,

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
				})

			}
		}

		var load = function(clbk){
			self.app.platform.sdk.comments.last(function(c){

				var bytx = group(c, function(c){
					return c.txid
				})

				var txids = _.map(bytx, function(g, id){
					return id;
				})

				self.app.platform.sdk.node.shares.getbyid(txids, function(){

					var au = [];

					_.each(c, function(comment){ 
    
						var share = app.platform.sdk.node.shares.storage.trx[comment.txid]

						au.push(share.address)
						au.push(comment.address)

					})

					au = _.uniq(au)

					self.sdk.users.get(au, function(){
						if (clbk)
							clbk(bytx)
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
			
			loadinterval = setInterval(function(){

				make()

			}, 60000)

		}

		var make = function(){
			load(function(comments){
				renders.comments(comments)
			})
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};

				if(loadinterval){
					clearInterval(loadinterval);
					loadinterval = null;
				}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make()

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