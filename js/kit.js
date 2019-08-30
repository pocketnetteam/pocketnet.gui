SubscribePrivate = function(){
	var self = this;

	self.address = {
		set : function(_v){
			this.v = _v
		},
		v : '',
	};

	self.encrypted = {
		set : function(_v){
			this.v = _v
		},
		v : '',
	};


	self.opreturn = function(){
		return self.encrypted.v
	}

	self.validation = function(){

		if(!self.address.v){
			return 'address';
		}

		if(!self.encrypted.v){
			return 'encrypted';
		}

	}

	self.serialize = function(){
		return self.address.v
	}

	self.export = function(){
		return {
			vsaddress : self.encrypted.v
		}
	}
	

	self.type = 'subscribePrivate'

	return self;
}

Subscribe = function(){
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

	self.type = 'subscribe'

	return self;
}

Unsubscribe = function(){
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

	self.type = 'unsubscribe'

	return self;
}

Blocking = function(){
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

	self.type = 'blocking'

	return self;
}

Unblocking = function(){
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

	self.type = 'unblocking'

	return self;
}

Comment = function(txid){
	var self = this;

	self.txid = txid;

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

					if(this.v.images > 9){
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

		if(!self.images.v.length && !self.url.v && !self.message.v) {
			return 'content'
		}

		if(self.message.v && encodeURIComponent(self.message.v).length > 1000){
			return 'messagelength'
		}

		return null;
	}

	self.serialize = function(){
		return encodeURIComponent(self.message.v) + self.images.v.join(',') + encodeURIComponent(self.url.v || '')
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

							}
						})


					}
				}
				else
				{
					index++;
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

	self.export = function(extend){

		if(extend){
			return {
				message : self.message.v,
				url : self.url.v,
				images : self.images.v,
			} 
		}

		return {
			m : encodeURIComponent(self.message.v),
			u : encodeURIComponent(self.url.v),
			i : self.images.v,
		}
	}

	self.import = function(v){
		self.url.set(v.u || v.url)
		self.message.set(v.m || v.message)
		self.images.set(v.i || v.images)
	}

	self.alias = function(id, time, timeupd, children, address){
		var comment = new pComment();
			comment._import(self.export())

			comment.id = id
			comment.txid = self.txid
			comment.children = children
			comment.address = address

			comment.setTime(time, timeupd)

		return comment;
	}

	self.type = 'comment'

	return self;
}

UpvoteShare = function(){
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

	self.export = function(){
		return {
			share : self.share.v,
			value : self.value.v
		}
	}

	self.type = 'upvoteShare'

	return self;
}

ComplainShare = function(){
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

	self.type = 'complainShare'

	return self;
}

Share = function(){

	var self = this;

	self.clear = function(){
		self.message.set()
		self.images.set()
		self.tags.set()
		self.url.set()
		self.caption.set()

		_.each(self.settings, function(s, k){
			self.settings[k] = null;
		})
	}

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

	self.ustate = 'post'

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

					if(tags.length > 30){
						return false;
					}

					tags = _.map(tags, function(t){
						return t.replace("#", '')
					})

					this.v = tags;
				}

				else{

					if(!tags) return;

						tags = tags.replace("#", '')

					if(this.v.length > 29){
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
		a : ['cm', 'i', 'u'],
		v : 'p',
		videos : [],
		image : 'a'
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : ''
	}

	/*_.each(self.default, function(s, k){
		self.settings[k] = _.clone(s)
	})*/

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

							}
						})


					}
				}
				else
				{
					index++;
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

		if(!self.message.v && !self.caption.v){
			return 'message'
		}

		if(self.url.v && self.url.v.length){

			var l = trim((trim(self.message.v) + trim(self.caption.v)).replace(self.url.v.length, '')).length

			if (l < 30 && !self.images.v.length){
				return 'url'
			}

			
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
	}

	self.shash = function(){
		return bitcoin.crypto.sha256(self.serialize()).toString('hex')
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

				txidEdit : self.aliasid || ""
			} 
		}

		return {
			c : encodeURIComponent(self.caption.v),
			m : encodeURIComponent(self.message.v),
			u : encodeURIComponent(self.url.v),
			t : _.map(self.tags.v, function(t){ return encodeURIComponent(t) }),
			i : self.images.v,
			s : _.clone(self.settings),
			txidEdit : self.aliasid || ""

		}
	}

	self.import = function(v){
		self.caption.set(v.c || v.caption)
		self.url.set(v.u || v.url)
		self.tags.set(v.t || v.tags)
		self.message.set(v.m || v.message)
		self.images.set(v.i || v.images)

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
			if(v.settings){
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

	self.typeop = function(){

		if(self.aliasid){
			return 'shareedit'
		}

		return self.type
	}

	self.type = 'share'

	return self;
}

UserInfo = function(){

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

		console.log('hash, ', hash, hash.indexOf('pocketnet'))

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

pUserInfo = function(){

	var self = this;

	self.name = ''
	self.image = ''
	self.language = ''
	self.about = ''
	self.site = ''
	self.txid = '';
	self.ref = '';
	self.postcnt = 0;

	self.subscribes = [];
	self.subscribers = [];
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

		if (v.subscribes) self.subscribes = v.subscribes;
		if (v.subscribers) self.subscribers = v.subscribers;


		if (v.blocking) self.blocking = v.blocking;

		if (v.txid)
			self.txid = v.txid;

		self.addresses = JSON.parse(v.b || v.addresses || "[]")

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

pShare = function(){

	var self = this;

	self.url = ''
	self.tags = []
	self.message = ''
	self.caption = ''
	self.images = [];
	self.txid = '';
	self.time = null;

	self.comments = 0;
	self.lastComment = null;

	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}

	self.default = {
		a : ['cm', 'i', 'u'],
		v : 'p',
		videos : [],
		image : 'a'
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : ''
	}
	
	self.findComment = function(id){
		return _.find(self.comments, function(c){
			return c.txid == id
		})
	}

	self._import = function(v, notdecode){

		
		if(v.i && !_.isArray(v.i)) v.i = [v.i]
		if(v.t && !_.isArray(v.t)) v.t = [v.t]

		if(notdecode){
			self.message = v.m || v.message || ""
			self.caption = v.c || v.caption || ""
			self.tags = v.t || v.tags || []
			self.url = v.u || v.url || '';

		}
		else
		{	
			self.url = decodeURIComponent(v.u || v.url || '');
			self.message = decodeURIComponent((v.m || v.message || "").replace(/\+/g, " "))
			self.caption = decodeURIComponent((v.c || v.caption || "").replace(/\+/g, " "))
			self.tags = _.map(v.t || v.tags || [], function(t){ return decodeURIComponent(t) })
		}

		if(v.myVal) self.myVal = Number(v.myVal)
		
		self.images = v.i || v.images || [];

		if (v.txid)
			self.txid = v.txid;

		if (v.txidEdit)
			self.txidEdit = v.txidEdit;	

		self.temp = v.temp || null;

		if(v._time)
			self._time = v._time

		if(v.comments)
			self.comments = v.comments
		
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

		return v
	}

	self.import = function(v){

		v = JSON.parse(v)

		self._import(v)
	}

	self.renders = {
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

		return share;
	}

	self.type = 'share'

	return self;
}

pComment = function(){

	var self = this;

	self.url = ''
	self.message = ''
	self.images = [];

	self.txid = '';
	self.time = 0;
	self.timeupd = 0;
	self.children = 0;

	self.address = '';
	self.parentid = '';
	self.answerid = ''


	self._import = function(v){
		self.url = decodeURIComponent(v.u || v.url || "");
		self.message = decodeURIComponent((v.m || v.message || "").replace(/\+/g, " "))
		self.images = v.i || v.images || [];
	}

	self.import = function(v){
		v = JSON.parse(v)

		self._import(v)
	}

	self.export = function(){

		var v = {}
		
		v.m = encodeURIComponent(self.message)
		v.u = encodeURIComponent(self.url)
		v.i = _.clone(self.images)

		return v
	}

	self.serialize = function(){
		return encodeURIComponent(self.message) + self.images.join(',') + encodeURIComponent(self.url || '')
	}


	self.upvote = function(){
		var upvoteShare = new UpvoteShare();

		upvoteShare.share.set(self.txid);

		return upvoteShare;
	}

	self.setTime = function(t, tu){
		self.time = new Date()
		self.time.setTime(t * 1000);

		self.timeupd = new Date()
		self.timeupd.setTime(tu * 1000);
	}	

	self.renders = {
		
		preview : function(){
			var l = filterXSS(self.message, {
				whiteList: [],
				stripIgnoreTag: true
			})

			var m = emojione.toImage(trimHtml(l, 90))

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

Img = function(p){
	if(!p) p = {};
 
	var self = this;

		self.type = p.type;
		self.name = p.name;
		self.app = p.app;
		self.refId = p.refId;

	return self;	
}

kits = {
	ini : {

	},
	alias : {
		userInfo : pUserInfo,
		share : pShare,
		comment : pComment
	}
}


/////////////////////////////////////
/*
var test = new UserInfo()
	test.import({
		"txid":"5741a02961547b401f9f9be17bd2c220bc6a98b4ff4d7909543e44adf3cb57e9",
		"block":63667,
		"time":1553571415,
		"address":"PLNAsiX7JiE2iSR5CmmLdc8s9SYZCLH1P9",
		"name":"pedro420",
		"birthday":0,
		"gender":0,
		"regdate":1553198159,
		"image": "https://i.imgur.com/ejgmvLz.jpg",
		"about":"Ghost in the machine",
		"language":"en",
		"site":"",
		"pubkey":"",
		"addresses":"[]",
		"ref":"",
		"id":227
	})

var data = Buffer.from(bitcoin.crypto.hash256(test.serialize()), 'utf8');

var opreturnData = [Buffer.from(test.type, 'utf8'), data];

if (test.opreturn){
	opreturnData.push(Buffer.from(test.opreturn()))
}*/
