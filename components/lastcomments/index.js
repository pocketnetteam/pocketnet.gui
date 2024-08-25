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



					if(ed.renderclbk) ed.renderclbk()

				})

			}
		}

		var load = function(clbk){
			self.app.platform.sdk.comments.last(function(c, error){

				var me = app.platform.sdk.user.me()

				c = _.filter(c, (c) => {

					if (c.deleted) return false

					if (me && me.relation(c.address, 'blocking')) {
                        return false
                    }

					if (me && me.relation(c.commentTo, 'blocking')) {
                        return false
                    }

					return c.message && c.commentTo && c.address != 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82' && c.commentTo != 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82'
				})

				c = _.uniq(c, (c) => c.address)

				var au = [];

				_.each(c, (c) => {
					au.push(c.address)
					au.push(c.commentTo)
				})


				self.sdk.users.get(au, function(l, error3){

					c = _.filter(c, (comment) => {

						var commentUserInfo = self.psdk.userInfo.getShortForm(comment.address)
						var commentToUserInfo = self.psdk.userInfo.getShortForm(comment.commentTo)

						if(!commentUserInfo || commentUserInfo.deleted || self.app.platform.sdk.user.reputationBlocked(comment.address)) return false
						if(!commentToUserInfo || commentToUserInfo.deleted || self.app.platform.sdk.user.reputationBlocked(comment.commentTo)) return false


						return true
					})

					var bytx = group(c, function(c){
						return c.postid
					})

					if (clbk)
						clbk(bytx, error || error3)

				}, true)

				
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
					make()
				}

				//multimake()
				

			}

			/*self.app.platform.clbks._focus.lastcomments = function(time){

				if(time > 120 && typeof _Electron != 'undefined'){
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

			window.rifticker.add(() => {
				essense.destroy();
			})

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