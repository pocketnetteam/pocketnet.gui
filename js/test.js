Delete = function(lang){

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
				console.log('poll', f);
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

		if(self.itisvideo()){
			return 'video'
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
		
										self.images.v[index] = 'https://'+app.options.url+':8092/i/' + deep(data, 'data.ident');

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

		if (self.delete){
			return false;
		}

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

		if (self.delete){

			return encodeURIComponent(self.txid)
		}
		
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

		//if(meta.type) return true

		if(meta.type == 'peertube') return true
	}

	self.export = function(extend){

		if (self.delete){

			return {
				txidEdit: self.txid || "",
			}
		}

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

		return self.type	
	}



	self.typeop = function(platform){

        return self.type;

	}

	if(lang) self.language.set(lang)

	self.type = 'contentDelete'

	return self;
}


pDelete = function(){

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

	self.deleted = false;

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

		if(meta.type == 'peertube') return true
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

		if (v.deleted) self.deleted = true


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
		v.deleted = self.deleted

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

	self.delete = function(){
		var c = new Share();

		c.id = self.id
		c.parentid = self.parentid
		c.answerid = self.answerid

		c.delete = true
		

		return c

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
