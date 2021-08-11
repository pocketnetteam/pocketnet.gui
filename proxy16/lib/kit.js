var SubscribePrivate = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.validation = function(){
		if(!self.address.v){
			return 'address';
		}
	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(alias){

		if(alias){
			return {
				vsaddress : self.address.v
			}
		}

		return {
			address : self.address.v
		}
	}

	self.import = function(p){

		if (p.address)
			self.address.v = p.address

		if (p.vsaddress)
			self.address.v =  p.vsaddress
			
	}

	self.type = 'subscribePrivate'

	return self;
}

var Subscribe = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.validation = function(){
		if(!self.address.v){
			return 'address';
		}
	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(alias){

		if(alias){
			return {
				vsaddress : self.address.v
			}
		}

		return {
			address : self.address.v
		}
	}

	self.import = function(p){

		if (p.address)
			self.address.v = p.address

		if (p.vsaddress)
			self.address.v =  p.vsaddress
			
	}

	self.type = 'subscribe'

	return self;
}

var Unsubscribe = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.validation = function(){
		if(!self.address.v){
			return 'address';
		}
	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(alias){

		if(alias){
			return {
				vsaddress : self.address.v
			}
		}

		return {
			address : self.address.v
		}
	}

	self.import = function(p){

		if (p.address)
			self.address.v = p.address

		if (p.vsaddress)
			self.address.v =  p.vsaddress
			
	}

	self.type = 'unsubscribe'

	return self;
}

var Blocking = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.validation = function(){
		if(!self.address.v){
			return 'address';
		}
	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(alias){

		if(alias){
			return {
				vsaddress : self.address.v
			}
		}

		return {
			address : self.address.v
		}
	}

	self.import = function(p){

		if (p.address)
			self.address.v = p.address

		if (p.vsaddress)
			self.address.v =  p.vsaddress
			
	}

	self.type = 'blocking'

	return self;
}

var Unblocking = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.validation = function(){
		if(!self.address.v){
			return 'address';
		}
	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(alias){

		if(alias){
			return {
				vsaddress : self.address.v
			}
		}

		return {
			address : self.address.v
		}
	}

	self.import = function(p){

		if (p.address)
			self.address.v = p.address

		if (p.vsaddress)
			self.address.v =  p.vsaddress
			
	}

	self.type = 'unblocking'

	return self;
}

var Comment = function(txid){
	var self = this;

	self.txid = txid;

	self.id = ''
    self.parentid = ''
    self.answerid = ''

	self.message = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else

				this.v = _v

			if (self.on.change)
				self.on.change('message', this.v)
		},
		v : ''
	};

	self.images = {
		
		set : function(images){

			if(!images){
				this.v = []
			}

			else
			{
				if(_.isArray(images)){

					if(images.length > 10){
						return false;
					}

					this.v = images;
				}

				else{

					if(!images) return

					if(this.v.length > 9){
						return false;
					}

					this.v.push(images)
				}
			}


			if (self.on.change)
				self.on.change('images', this.v)

			return true;
		},
		remove : function(image){
			if(!image){
				this.v = []
			}
			else
			{
				removeEqual(this.v, image)
			}
		},
		get : function(){
			return _.map(this.v, function(image){
				return image
			})
		},
		v : []
	}

	self.url = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else

				this.v = _v

			if (self.on.change)
				self.on.change('url', this.v)
		},
		v : ''
	};

	self.clear = function(){
		self.message.set()
		self.images.set()
		self.url.set()
	}

	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}	

	self.validation = function(){

		if(self.delete && self.id){
			return false
		}

		if(!self.images.v.length && !self.url.v && !self.message.v) {
			return 'content'
		}

		if(self.message.v && (self.message.v).length > 1000){
			return 'messagelength'
		}

		return null;
	}

	
	self.checkloaded = function(){
		var notloaded = _.find(self.images.v, function(i){
			return i.indexOf('data:image') > -1
		})

		return notloaded
	}

	self.uploadImages = function(app, clbk){


		lazyEach({
			//sync : true,
			array : self.images.v,
			action : function(p, index){

				var image = p.item;

				if (image.indexOf('data:image') > -1){

					var r = image.split(',');

				if (r[1]){

						app.ajax.run({
							type : "POST",
							imgur : true,
							data : {
								Action : "image",
								image : r[1]
							},

							success : function(data){

								self.images.v[index] = deep(data, 'data.link');
								
								p.success();

							},

							fail : function(d){

								app.ajax.run({
									type : "POST",
									up1 : true,
									data : {
										file : r[1]
									},
		
									success : function(data){
		
										self.images.v[index] = 'https://pocketnet.app:8092/i/' + deep(data, 'data.ident');

										p.success();
		
									},
		
									fail : function(d){
		
										//self.images.v[index] = ''
		
										//index++;
		
										p.success();
									}
								})
							}
						})


					}
				}
				else
				{
					//index++;
					p.success();
				}

				

			},

			all : {
				success : function(){
					if (clbk)
						clbk()
				}
			}
		})
	}

	self.serialize = function(){

		var s = self.txid;

		if(!self.delete){

			s += (JSON.stringify({
				
				message : encodeURIComponent(self.message.v),
				url : encodeURIComponent(self.url.v),
				images : _.map(self.images.v, function(i){
					return encodeURIComponent(i)
				}),

			}))
			
		}
		
		s += (self.parentid || "") + (self.answerid || "")


		return s
	}

	self.export = function(extend){
		var r = {
			postid : self.txid,
			answerid : self.answerid || "",
			parentid : self.parentid || ""
		}

		if(!self.delete){
			r.msg = JSON.stringify({
				message : encodeURIComponent(self.message.v),
				url : encodeURIComponent(self.url.v),
				images : _.map(self.images.v, function(i){
					return encodeURIComponent(i)
				}),
			})
		}


		if(self.id){
			r.id = self.id
		}

		return r
	}

	self.import = function(v){

		self.txid = v.postid;
		self.answerid = v.answerid;
		self.parentid = v.parentid;

		v.msgparsed = JSON.parse(v.msg)

		self.url.set(decodeURIComponent(v.msgparsed.url))
		self.message.set(decodeURIComponent(v.msgparsed.message))
		self.images.set(_.map(v.msgparsed.images, function(i){
			return decodeURIComponent(i)
		}))


		if (v.txid || v.id)
			self.id = v.txid || v.id
	}

	self.alias = function(id){
		var comment = new pComment();
			comment.import(self.export())


			comment.id = id
			comment.txid = self.txid



		return comment;
	}

	self.typeop = function(){

		if(self.id){
			if(self.delete){
				return 'commentDelete'
			}
			else{
				return 'commentEdit'
			}

			
		}

		return self.type
	}

	self.ustate = 'comment'



	self.type = 'comment'

	return self;
}

var СScore = function(){
	var self = this;

	self.comment = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.value = {
		set : function(_v){
			this.v = _v
		},
		v : 0
	};

	self.ustate = 'comment_score'

	self.opreturn = function(){

		return self.address.v + " " + self.value.v
	}

	self.validation = function(){
		if(!self.comment.v || !self.address.v){
			return 'comment'
		}
	}

	self.serialize = function(){

		return self.comment.v + self.value.v
	}

	self.export = function(alias){
		if(!alias){
			return {
				commentid : self.comment.v,
				value : self.value.v.toString()
			}
		}
		else{
			return {
				commentid : self.comment.v,
				value : self.value.v.toString(),
				vsaddress : self.address.v
			}
		}
		
	}

	self.import = function(p){

		if(p.commentid)
			self.comment.v = p.commentid

		if (p.value)
			self.value.v = Number(p.value)

		if (p.vsaddress)
			self.address.v = p.vsaddress

	}

	self.type = 'cScore'

	return self;
}

var UpvoteShare = function(){
	var self = this;

	self.share = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.value = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.ustate = 'score'

	self.opreturn = function(){

		return self.address.v + " " + self.value.v
	}

	self.validation = function(){
		if(!self.share.v || !self.value.v){
			return 'share'
		}
	}

	self.serialize = function(){

		return self.share.v + self.value.v
	}

	self.export = function(alias){

		if(!alias){
			return {
				share : self.share.v,
				value : self.value.v
			}
		}
		else{
			return {
				share : self.share.v,
				value : self.value.v,
				vsaddress : self.address.v
			}
		}

	}

	self.import = function(p){

		if (p.share)
			self.share.v =  p.share

		if (p.value)
			self.value.v = p.value

		if (p.vsaddress)
			self.address.v = p.vsaddress

	}

	self.type = 'upvoteShare'

	return self;
}

var ComplainShare = function(){
	var self = this;

	self.share = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.reason = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	

	self.validation = function(){
		if(!self.share.v){
			return 'share'
		}

		if(!self.reason.v){
			return 'reason'
		}
	}

	self.serialize = function(){
		return self.share.v + '_' + self.reason.v
	}

	self.export = function(){
		return {
			share : self.share.v,
			reason : self.reason.v
		}
	}

	self.import = function(p){

		if (p.share)
			self.share.v =  p.share

		if (p.reason)
			self.reason.v = p.reason
			
	}

	self.type = 'complainShare'

	return self;
}

var Share = function(lang){

	var self = this;

	self.clear = function(){
		
		self.message.set()
		self.images.set()
		self.tags.set()
		self.url.set()
		self.caption.set()
		self.repost.set()
		self.language.set(lang)
		self.aliasid = ""

		_.each(self.settings, function(s, k){
			self.settings[k] = null;
		})
	}

	self.repost = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('repost', this.v)
			})
			

		},
		v : '',

		drag : false
	};

	self.caption = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('caption', this.v)
			})
			

		},
		v : '',

		drag : false
	};
	
	self.message = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			
			_.each(self.on.change || {}, function(f){
				f('message', this.v)
			})

		},
		v : '',

		drag : true
	};

	self.language = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			
			_.each(self.on.change || {}, function(f){
				f('language', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};

	self.poll = {
		set : function(_v){

			if(!_v){
				this.v = {}
			}
			else
			{
				this.v = _v
			}
			
			_.each(self.on.change || {}, function(f){
				f('poll', this.v)
			})

		},
		remove : function(poll){
			if(!poll){
				this.v = {}
			}
			else
			{
				removeEqual(this.v, poll)
			}

			_.each(self.on.change || {}, function(f){
				f('poll', this.v)
			})
		},
		get : function(){
			return this.v;
		},
		v : {},
		drag : true
	};

	self.ustate = function(){
		if(self.aliasid){
			return ''
		}

		return 'post'
	} 

	self.tags = {
		have : function(tag){
			if(this.v.indexOf(tag) > -1){
				return true
			}
			else
			{
				return false
			}
		},
		set : function(tags){

			if(typeof tags == 'undefined'){
				this.v = [];
			}
			else{
				if(_.isArray(tags)){

					if(tags.length > 5){
						return false;
					}

					tags = _.map(tags, function(t){
						return t.replace("#", '').toLowerCase()
					})

					this.v = tags;
				}

				else{

					if(!tags) return;

						tags = tags.replace("#", '').toLowerCase()

					if(this.v.length > 4){
						return false;
					}

					removeEqual(this.v, tags)

					this.v.push(tags)
				}
			}

			_.each(self.on.change || {}, function(f){
				f('tags', this.v)
			})


			return true;
		},
		remove : function(tag){
			if(!tag){
				this.v = []
			}
			else
			{


				removeEqual(this.v, tag)

				_.each(self.on.change || {}, function(f){
					f('tags', this.v)
				})

			}
		},
		get : function(){
			return _.map(this.v, function(tag){
				return tag
			})
		},
		v : []
	}	

	self.images = {
		
		set : function(images){

			if(!images){
				this.v = []
			}

			else
			{
				if(_.isArray(images)){

					if(images.length > 10){
						return false;
					}

					this.v = images;
				}

				else{

					if(!images) return

					if(this.v.length > 9){
						return false;
					}

					this.v.push(images)
				}
			}

			_.each(self.on.change || {}, function(f){
				f('images', this.v)
			})


			return true;
		},
		remove : function(image){
			if(!image){
				this.v = []
			}
			else
			{
				removeEqual(this.v, image)
			}

			_.each(self.on.change || {}, function(f){
				f('images', this.v)
			})
		},
		get : function(){
			return _.map(this.v, function(image){
				return image
			})
		},
		v : [],

		drag : true
	}

	self.url = {
		set : function(_v){
			if(!_v){
				this.v = ''
			}
			else

				this.v = _v

			self.settings.image = ''

			_.each(self.on.change || {}, function(f){
				f('url', this.v)
			})

			return true
		},
		v : '',

		drag : true
	};

	self.on = {
		change : {}
	}
	self.off = function(e){
		delete self.on[e]
	}

	self.default = {
		a : ['cm', 'r', 'i', 'u', 'p'],
		v : 'p',
		videos : [],
		image : 'a',
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : '',
	}

	self.checkloaded = function(){
		var notloaded = _.find(self.images.v, function(i){
			return i.indexOf('data:image') > -1
		})

		return notloaded
	}

	self.uploadImages = function(app, clbk){


		lazyEach({
			//sync : true,
			array : self.images.v,
			action : function(p, index){

				var image = p.item;

				if (image.indexOf('data:image') > -1){

					var r = image.split(',');

				if (r[1]){

						app.ajax.run({
							type : "POST",
							imgur : true,
							data : {
								Action : "image",
								image : r[1]
							},

							success : function(data){

								self.images.v[index] = deep(data, 'data.link');
								
								p.success();

							},

							fail : function(d){


								app.ajax.run({
									type : "POST",
									up1 : true,
									data : {
										file : r[1]
									},
		
									success : function(data){
		
										self.images.v[index] = 'https://pocketnet.app:8092/i/' + deep(data, 'data.ident');

										p.success();
		
									},
		
									fail : function(d){
		
										//self.images.v[index] = ''
		
										//index++;
		
										p.success();
									}
								})
								

								
							}
						})


					}
				}
				else
				{
					//index++;
					p.success();
				}

				

			},

			all : {
				success : function(){
					if (clbk)
						clbk()
				}
			}
		})
	}

	self.validation = function(){

		if(!self.message.v && !self.caption.v && !self.repost.v){
			return 'message'
		}

		if(!self.language.v){
			return 'language'
		}

		if(self.itisvideo() && !self.caption.v) return 'videocaption'

		if(self.url.v && self.url.v.length && !self.itisvideo()){

			var l = trim((trim(self.message.v) + trim(self.caption.v)).replace(self.url.v.length, '')).length

			if (l < 30 && !self.images.v.length){
				return 'url'
			}
			
		}

		if(!self.tags.v.length && !self.repost.v){
			return 'tags'
		}

		/*if(!self.tags.v.length && self.settings.v != 'a'){

			return 'tags'
		}*/

		return false
	}

	self.serialize = function(){
		return encodeURIComponent(self.url.v) 
		
		+ encodeURIComponent(self.caption.v) 
		+ encodeURIComponent(self.message.v) 

		+ _.map(self.tags.v, function(t){ return encodeURIComponent(t) }).join(',')
		+ self.images.v.join(',')

		+ (self.aliasid || "")
		+ (self.repost.v || "")		
	}

	self.shash = function(){
		return bitcoin.crypto.sha256(self.serialize() + (self.repost.v || "") ).toString('hex')
	}
	
	self.itisvideo = function(){

		if(self.settings.v == 'a') return

		if(!self.url.v) return

		var meta = parseVideo(self.url.v)

		if(meta.type) return true

		//if(meta.type == 'peertube') return true
	}

	self.export = function(extend){

		if(extend){
			return {
				caption : self.caption.v,
				message : self.message.v,
				url : self.url.v,
				tags : self.tags.v,
				images : self.images.v,
				settings : _.clone(self.settings),
				language : self.language.v,
				txidEdit : self.aliasid || "",
				txidRepost : self.repost.v || "",
				poll : self.poll.v || {}
			} 
		}

		return {
			c : encodeURIComponent(self.caption.v),
			m : encodeURIComponent(self.message.v),
			u : encodeURIComponent(self.url.v),
			p : _.clone(self.poll.v),
			t : _.map(self.tags.v, function(t){ return encodeURIComponent(t) }),
			i : self.images.v,
			s : _.clone(self.settings),
			l : self.language.v,
			txidEdit : self.aliasid || "",
			txidRepost : self.repost.v || ""

		}
	}

	self.import = function(v){
		self.caption.set(v.c || v.caption)
		self.url.set(v.u || v.url)
		self.tags.set(v.t || v.tags)
		self.message.set(v.m || v.message)
		self.images.set(v.i || v.images)
		self.repost.set(v.r || v.txidRepost || v.repost)
		self.language.set(v.l|| v.language || 'en')
		self.poll.set(v.p || v.poll || {})

		if (v.txidEdit) self.aliasid = v.txidEdit

		if (v.s){
			
			try{
				self.settings = v.s
			}
			catch(e){
				
			}
		}
		else
		{
			if (v.settings){
				self.settings = v.settings
			}
		}

		
	}

	self.alias = function(txid){
		var share = new pShare();

			share.time = new Date();

			share._import(self.export())

			share.txid = txid || self.aliasid

		return share;
	}

	self.optstype = function(platform){

		if(self.itisvideo() && platform && platform.videoenabled) return 'video'

		return self.type	
	}

	self.typeop = function(platform){

		if (self.itisvideo() && platform && platform.videoenabled) return 'video'

		if (self.aliasid){
			return 'share'
		}

		return self.type
	}


	if(lang) self.language.set(lang)

	self.type = 'share'

	return self;
}

var UserInfo = function(){

	var self = this;

	self.clear = function(){
		self.image.set()
		self.name.set()
		self.language.set()
		self.about.set()
		self.site.set()
		self.addresses.set()
	}

	self.addresses = {
		set : function(_v){

			var mv = this.v;

			if(!_v) this.v = [];

			else
			{
				if(_.isArray(_v)){
					_.each(_v, function(__V){
						mv.push(__V)
					})
				}
				else
				{
					this.v.push(_v)
				}
				
			}

			if (self.on.change)
				self.on.change('addresses', this.v)
		},
		v : []
	}

	self.image = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('image', this.v)
		},
		v : ''
	};
	
	self.name = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('name', this.v)
		},
		v : ''
	};

	self.ref = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('ref', this.v)
		},
		v : ''
	};

	self.language = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('language', this.v)
		},
		v : ''
	};

	self.about = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('about', this.v)
		},
		v : ''
	};

	self.site = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}
			

			if (self.on.change)
				self.on.change('site', this.v)
		},
		v : ''
	};

	self.uploadImage = function(clbk){

		var image = self.image.v;

		if (image.indexOf('data:image') > -1){

			var r = image.split(',');

			if (r[1]){

				app.ajax.run({
					type : "POST",
					imgur : true,
					data : {
						Action : "image",
						image : r[1]
					},

					success : function(data){

						self.image.v = deep(data, 'data.link');
						
						if (clbk)
							clbk();

					},
					fail : function(d){


						app.ajax.run({
							type : "POST",
							up1 : true,
							data : {
								file : r[1]
							},

							success : function(data){

								self.image.v = 'https://pocketnet.app:8092/i/' + deep(data, 'data.ident');

								if (clbk)
									clbk();

							},

							fail : function(d){
												
								if (clbk)
									clbk(d);
							}
						})

		
					}
				})


			}
		}
		else
		{
			if (clbk)
				clbk();
		}

	}

	


	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}

	self.validation = function(){

		if(self.name.v.length > 20) return 'namelength'

		var hash = self.name.v.toLowerCase().replace(/[^a-z]/g,'')


		if (hash.indexOf('pocketnet') > -1) return 'pocketnet'
		
		return false

	}

	self.serialize = function(){
		return encodeURIComponent(self.name.v)
		 + encodeURIComponent(self.site.v)
		 + self.language.v
		 + encodeURIComponent(self.about.v)
		 + self.image.v + JSON.stringify(self.addresses.v) + self.ref.v
	}

	self.alias = function(txid){
		var userInfo = new pUserInfo();

			userInfo._import(self.export())

			userInfo.txid = txid

		return userInfo;
	}

	self.export = function(extend){

		if(extend){
			return {
				name : self.name.v,
				about : self.about.v,
				site : self.site.v,
				language : self.language.v,				
				image : self.image.v,
				addresses : JSON.stringify(self.addresses.v || []),
				ref : self.ref.v
			} 
		}

		return {
			n : encodeURIComponent(self.name.v),
			l : self.language.v,
			a : encodeURIComponent(self.about.v),
			s : encodeURIComponent(self.site.v),
			i : self.image.v,
			b : JSON.stringify(self.addresses.v || []),
			r : self.ref.v
		}
	}

	self.import = function(v){
		self.name.set(v.c || v.name)
		self.language.set(v.l || v.language)
		self.about.set(v.a || v.about)	
		self.site.set(v.s || v.site)	
		self.image.set(v.i || v.image)
		self.addresses.set( JSON.parse(v.b || v.addresses || "[]"))
		self.ref.set(v.r || v.ref)
	}

	

	self.type = 'userInfo'

	return self;
}

var pUserInfo = function(){

	var self = this;

	self.name = ''
	self.image = ''
	self.language = ''
	self.about = ''
	self.site = ''
	self.txid = '';
	self.ref = '';
	self.postcnt = 0;
	self.reputation = 0;

	self.subscribes = [];
	self.subscribers = [];
	self.recomendedSubscribes = [];
	self.blocking = [];

	self.address = ''

	self.rc = 0;
	


	self._import = function(v){

		self.name = decodeURIComponent(v.n || v.name || '');
		self.image = v.i || v.image;
		self.about = decodeURIComponent(v.a || v.about || '');
		self.language = v.l || v.language;
		self.site = decodeURIComponent(v.s || v.site || '');

		self.ref = v.r || v.ref;
		self.rc = v.rc || 0;
		self.postcnt = v.postcnt || 0;
		self.reputation = v.reputation || 0;

		if (v.subscribes) self.subscribes = v.subscribes;
		if (v.subscribers) self.subscribers = v.subscribers;
		if (v.recomendedSubscribes) self.recomendedSubscribes = v.recomendedSubscribes;

		if (v.blocking) self.blocking = v.blocking;

		if (v.txid)
			self.txid = v.txid;

			
		try{
			self.addresses = JSON.parse(v.b || v.addresses || "[]")
		}
		catch (e){
			
		}
		

		if (v.adr || v.address)
			self.address = v.adr || v.address

		self.temp = v.temp || null;

	}

	self.export = function(){

		var v = {};

		v.n = encodeURIComponent(self.name)
		v.image = self.image
		v.a = encodeURIComponent(self.about)
		v.l = self.language
		v.s = encodeURIComponent(self.site)
		v.r = self.ref;
		v.rc = self.rc
		v.b = JSON.stringify(self.addresses || [])

		v.adr = self.address

		return v
	}

	self.social = function(){
		var s = {
			image : self.image,
			images : [self.image],
			title : self.name,
			html : {
				body : self.about,
				preview : self.about
			},

			text : {
				body : self.about,
				preview : self.about
			}
		
		}

		return s
	}

	self.import = function(v){
		v = JSON.parse(v)

		self._import(v)
	}

	self.relation = function(address, key){
		if(!key) key = 'subscribes'

		return _.find(self[key], function(o){
			return o.adddress == address || o.address == address || o == address
		})
	}

	self.addRelation = function(obj, key){
		if(!key) key = 'subscribes'

		self[key] || (self[key] = [])

		self[key].push(obj)	
	}

	self.removeRelation = function(obj, key){
		if(!key) key = 'subscribes'

		removeEqual(self[key], obj)
	}
	

	self.type = 'userInfo'

	return self;
}

var pShare = function(){

	var self = this;

	self.url = ''
	self.tags = []
	self.message = ''
	self.caption = ''
	self.images = [];
	self.txid = '';
	self.time = null;
	self.repost = '';
	self.language = '';
	self.poll = {};

	self.comments = 0;
	self.lastComment = null;
	self.reposted = 0;

	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}

	self.default = {
		a : ['cm', 'i', 'u', 'p'],
		v : 'p',
		videos : [],
		image : 'a',
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : '',
	}

	self.isEmpty = function(){

		return !self.message && !self.caption && (self.tags.length == 0) && (self.images.length == 0) && !self.url
	}
	
	self.findComment = function(id){
		return _.find(self.comments, function(c){
			return c.txid == id
		})
	}

	self.itisvideo = function(){

		if(self.settings.v == 'a') return

		if(!self.url) return 

		var meta = parseVideo(self.url)

		if (meta.type) return true
	}

	self._import = function(v, notdecode){

		
		if(v.i && !_.isArray(v.i)) v.i = [v.i]
		if(v.t && !_.isArray(v.t)) v.t = [v.t]

		if(notdecode){
			self.message = v.m || v.message || ""
			self.caption = v.c || v.caption || ""
			self.tags = v.t || v.tags || []
			self.url = v.u || v.url || '';
			self.poll = v.p || v.poll || {}
			
		}
		else
		{	
			self.url = decodeURIComponent(v.u || v.url || '');
			self.message = decodeURIComponent((v.m || v.message || "").replace(/\+/g, " "))
			self.caption = decodeURIComponent((v.c || v.caption || "").replace(/\+/g, " "))
			self.tags = _.map(v.t || v.tags || [], function(t){ return decodeURIComponent(t) })
			self.poll = v.p || v.poll || {}

		}

		if(v.myVal) self.myVal = Number(v.myVal)

		self.language = v.l || v.language || 'en'
		self.images = v.i || v.images || [];
		self.repost = v.r || v.repost || v.txidRepost || ''


		if (v.txid)
			self.txid = v.txid;

		if (v.txidEdit)
			self.txidEdit = v.txidEdit;	

		self.temp = v.temp || null;

		if(v._time)
			self._time = v._time

		if(v.comments)
			self.comments = v.comments

		if(v.reposted)
			self.reposted = v.reposted

		
		if(v.lastComment)
			self.lastComment = v.lastComment

		if (v.s){

			try{
				self.settings = v.s 
			}
			catch(e){

			}
		}
		else
		{
			if(v.settings){
				self.settings = v.settings
			}
		}

	}

	self.export = function(){

		var v = {}
		
		v.m = encodeURIComponent(self.message)
		v.c = encodeURIComponent(self.caption)
		v.u = encodeURIComponent(self.url)
		v.t = _.map(self.tags || [], function(t){ return encodeURIComponent(t) })
		v.i = _.clone(self.images)
		v._time = self._time;
		v.s = _.clone(self.settings)
		v.l = self.language
		v.p = self.poll

		return v
	}

	self.import = function(v){

		v = JSON.parse(v)

		self._import(v)
	}

	self.social = function(app){

		var name = app.platform.api.name(self.address)

		var s = {
			image : '',
			images : self.images || [],
			title : "Post by " + name,
			html : {
				body : self.renders.xssmessagec(),
				preview : trimHtml(self.renders.xssmessagec(), 160).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...')
			},

			text : {
				body : self.renders.text(),
				preview : trimHtml(self.renders.text(), 130).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...')
			}
		
		}

		if (self.url){
			var v = videoImage(self.url)
			if (v){
				s.image = v;
				s.images.unshift(v)
			}
		}

		if(!s.image) s.image = self.images[0]

		return s
	}

	self.renders = {
		captionclear : function(){
			return self.caption || ''
		},
		caption : function(){
			if(!self.caption){

				if(self.message.length < 100) {
					return trimrn(self.message)
				}

				return ''

			}

			var m = trimrn(self.caption);

			//if(self.url) m = m.replace(self.url, '')

			return m;
		},

		message : function(){
			if(!self.caption && self.message.length < 100){
				return ''
			}

			var m = trimrn(self.message)

			//if(self.url) m = m.replace(self.url, '')

			return m
		},

		messagec : function(){
		
			var m = self.caption || trimrn(self.message)

			return m
		},

		text : function(nm){
			if(!nm) nm = self.renders.messagec() 

			nm = (trimrn(filterXSS(nm, {
				whiteList: [],
				stripIgnoreTag: true,
			})));	

			return nm
		},

		xssmessagec : function(){
			var nm = self.renders.messagec()

			return self.renders.xssmessage(nm)
		},

		xssmessage : function(nm){

			if(!nm) nm = self.renders.message()

			if(self.settings.v != 'a'){

				nm = nl2br(trimrn(findAndReplaceLink(filterXSS(nm, {
					whiteList: [],
					stripIgnoreTag: true,
				}))));	

			}
			else
			{

				var whiteclass = {'js-player' : true, 'plyr' : true, 'medium-insert-images' : true, 'medium-insert-images-grid' : true, 'medium-insert-embeds' : true}

				/*nm = nm.replace(/sharecaption/g, '')
				.replace(/canmark/g, '')
				.replace(/paddingWrapper/g, '')
				.replace(/message/g, '')
				.replace(/showMorePW/g, '')*/

				nm = filterXSS(nm, {
					stripIgnoreTag : true,
					whiteList: {
						a: ["href", "title", "target", 'cordovalink'],
						br : ["style"],
						b : ["style"],
						span : ["style"],
						figure : ["style"],
						figcaption : ["style"/*, "class"*/],
						i : ["style"],
						img : ["src"/*, "width", "height"*/],
						div : [ /*"class",*/"data-plyr-provider", "data-plyr-embed-id"],
						p : [],
						ul : [],
						ol : [],
						li : [],
						h2 : [],
						h1 : [],
						h3 : [],
						h4 : [],
						h5 : [],
						em : [],
						u : [],
						blockquote : [],
						strong : [],
						picture : ['img-type'],
						source : ['srcset', 'type'],
						strike : []

					},

					onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
						if (name === "class") {
						  var v = value.split(' ');

							v = _.filter(v, function(v){
								return whiteclass[v]
							})

						  return name + '="' + v.join(' ') + '"';
						}
					}

				})

				nm = nm.replace(/http:\/\//g, 'https://')
			}

			return trimrn(nm)
		}
	}

	self.upvote = function(value){

		if(self.myVal && self.myVal != '0') return null;

		var upvoteShare = new UpvoteShare();

		upvoteShare.share.set(self.txid);
		upvoteShare.value.set(value);
		upvoteShare.address.set(self.address || '')

		self.myVal = Number(value);		

		return upvoteShare;
	}

	self.complain = function(reason){
		var complainShare = new ComplainShare();

		complainShare.share.set(self.txid);
		complainShare.reason.set(reason);

		return complainShare;
	}

	self.alias = function(){
		var share = new Share();

		share.import(self)

		share.aliasid = self.txid

		share.time = self.time

		return share;
	}

	self.type = 'share'

	return self;
}

var pComment = function(){

	var self = this;

	self.url = ''
	self.message = ''
	self.images = [];

	self.txid = '';
	self.id = '';
	self.time = 0;
	self.timeUpd = 0;
	self.children = 0;

	self.address = '';
	self.parentid = '';
	self.answerid = '';

	self.scoreDown = 0;
	self.scoreUp = 0;
	self.myScore = 0;
	self.deleted = false;

	self.my = function(app){

		var ao = app.platform.sdk.address.pnet();

		if(self.address && ao && self.address == ao.address) return true

		return false
	}


	self._import = function(v){

		if (v.msgparsed){

			try {	
				self.url = decodeURIComponent(v.msgparsed.url || "");
				self.message = decodeURIComponent((v.msgparsed.message || "").replace(/\+/g, " "))
				self.images = _.map(v.msgparsed.images || [], function(i){

					return decodeURIComponent(i)
				});
			}

			catch(e){
				console.log("ERROR", e, v.msgparsed)
			}

			
		}			
		
		self.txid = v.postid;
		self.answerid = v.answerid;
		self.parentid = v.parentid;

		self.scoreDown = Number(v.scoreDown || '0');
		self.scoreUp = Number(v.scoreUp || '0');

		if (v.myScore) self.myScore = v.myScore

		if (v.deleted) self.deleted = true

		if (v.id || v.txid)
			self.id = v.id || v.txid;
	}

	self.import = function(v){
			
		if (v.msg)
			v.msgparsed = JSON.parse(v.msg)

		self._import(v)
	}

	self.export = function(){

		var r = {
			id : self.id,
			postid : self.txid || "",
			answerid : self.answerid || "",
			parentid : self.parentid || "",
			msgparsed : {
				message : self.message,
				url : self.url,
				images : self.images,
			},
			scoreDown : self.scoreDown,
			scoreUp : self.scoreUp,
			myScore : self.myScore,
			deleted : self.deleted
		}

		return r
	}

	self.upvote = function(value){

		if(self.myVal && self.myVal != '0') return null;

		var upvoteComment = new СScore();

		upvoteComment.comment.set(self.id);
		upvoteComment.address.set(self.address || '');
		upvoteComment.value.set(value);

		self.myScore = Number(value);

		return upvoteComment;
	}

	self.delete = function(){
		var c = new Comment();

		c.id = self.id
		c.parentid = self.parentid
		c.answerid = self.answerid

		c.delete = true
		

		return c

	}

	self.setTime = function(t, tu){
		self.time = new Date()
		self.time.setTime(t * 1000);

		self.timeUpd = new Date()
		self.timeUpd.setTime(tu * 1000);
	}	

	self.social = function(app){

		var name = app.platform.api.name(self.address)

		var s = {
			image : '',
			images : self.images || [],
			title : "Comment by " + name,
			html : {
				body : self.renders.text(),
				preview : trimHtml(self.renders.text(), 160).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...')
			},

			text : {
				body : self.renders.text(),
				preview : trimHtml(self.renders.text(), 130).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...')
			}
		
		}

		if(!s.image) s.image = self.images[0]
		if(!s.image) s.image = deep(app, 'platform.sdk.usersl.storage.'+self.address+'.image')

		return s

	}

	self.renders = {

		text : function(){
			var l = trimrn(filterXSS(self.message, {
				whiteList: [],
				stripIgnoreTag: true
			}))

			return l
		},	
		
		preview : function(){
			var l = filterXSS(self.message, {
				whiteList: [],
				stripIgnoreTag: true
			})

			var m = joypixels.toImage(trimHtml(l, 90))

			return nl2br(trimrn(m))
		},

		previewEmojidis : function(){
			var l = filterXSS(self.message, {
				whiteList: [],
				stripIgnoreTag: true
			})


			var m = trimHtml(l, 90)

			return nl2br(trimrn(m))
		}
	}

	self.type = 'comment'

	return self;
}

var Img = function(p){
	if(!p) p = {};
 
	var self = this;

		self.type = p.type;
		self.name = p.name;
		self.app = p.app;
		self.refId = p.refId;

	return self;	
}

var kits = {
	c : {
		userInfo : UserInfo,
		share : Share,
		complainShare : ComplainShare,
		upvoteShare : UpvoteShare,
		cScore : СScore,
		comment : Comment,
		unblocking : Unblocking,
		blocking : Blocking,
		unsubscribe : Unsubscribe,
		subscribe : Subscribe,
		subscribePrivate : SubscribePrivate
	},

	ini : {

	},
	alias : {
		userInfo : pUserInfo,
		share : pShare,
		comment : pComment,
	}
}


module.exports = kits