SubscribePrivate = function(){
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
				type : self.type,
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
				type : self.type,
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
				type : self.type,
				vsaddress : self.address.v
			}
		}

		return {
			type : self.type,
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
				type : self.type,
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
				type : self.type,
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

Comment = function(txid){
	var self = this;

	self.postid = txid;

	self.id = ''
    self.parentid = ''
    self.answerid = ''

	self.amount = {
		set : function(_v){

			if(!_v){
				this.v = 0
			}
			else

				this.v = _v

			if (self.on.change)
				self.on.change('fees', this.v)
		},
		v : 0
	}

	self.fees = {
		set : function(_v){

			if(!_v){
				this.v = 0
			}
			else

				this.v = _v

			if (self.on.change)
				self.on.change('fees', this.v)
		},
		v : 0
	};

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

	self.info = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else

				this.v = _v

			if (self.on.change)
				self.on.change('info', this.v)
		},
		v : ''
	}

	self.donate = {
		set : function(donate){

			if(!donate){
				this.v = []
			}

			else
			{
				if(_.isArray(donate)){

					this.v = donate;
				}

				else{

					if(!donate) return

					this.v.push(donate)
				}
			}


			if (self.on.change)
				self.on.change('donate', this.v)

			return true;
		},
		remove : function(donate){
			if(!donate){
				this.v = []
			}
			else
			{
				removeEqual(this.v, donate)
			}
		},
		get : function(){
			return _.map(this.v, function(donate){
				return donate
			})
		},
		v : []
	};

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
		self.donate.set()
		self.fees.set()

		self.delete = false
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

		if(self.message.v && (self.message.v).length > 915){
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

					app.imageUploader.upload({
						base64: image,
					}).then( url => {
	
						self.images.v[index] = url
	
						p.success();
	
					}).catch(err => {
	
						p.success();
	
					})

					
				}
				else
				{
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

		var s = self.postid;

		if(!self.delete){

			s += (JSON.stringify({
				
				message : (self.message.v),
				url : (self.url.v),
				images : _.map(self.images.v, function(i){
					return (i)
				}),
				info : (self.info.v || '')

			}))
			
		}
		
		s += (self.parentid || "") + (self.answerid || "")


		return s
	}

	self.export = function(extend){
		var r = {
			postid : self.postid,
			answerid : self.answerid || "",
			parentid : self.parentid || ""
		}

		if(!self.delete){
			if(extend){
				r.msgparsed = {
					message : self.message.v,
					url : self.url.v,
					images : self.images.v,
					info : self.info.v
				}
			}
			else{
				r.msg = JSON.stringify({
					message : (self.message.v),
					url : (self.url.v),
					images : _.map(self.images.v, function(i){
						return (i)
					}),
					info : self.info.v
				})
			}
			
		}
		else{
			r.delete = self.delete
		}

		if(self.id){
			r.id = self.id
		}

		if (self.donate && self.donate.v.length){
			r.donate = self.donate.v
		}

 	
		if(extend){
			r.type = self.type
		}
	
		return r

	}

	self.import = function(v){

		self.postid = v.postid;
		self.answerid = v.answerid;
		self.parentid = v.parentid;

		if (v.msg){
			v.msgparsed = JSON.parse(v.msg)

			self.url.set(decodeURIComponent(v.msgparsed.url))
			self.message.set(decodeURIComponent(v.msgparsed.message))
			self.images.set(_.map(v.msgparsed.images, function(i){
				return decodeURIComponent(i)
			}))
			self.info.set(v.msgparsed.info)
		}

		if (v.msgparsed){
			self.url.set(v.msgparsed.url)
			self.message.set(v.msgparsed.message)
			self.images.set(v.msgparsed.images)
			self.info.set(v.msgparsed.info)

		}
		
		if (v.donate){
			self.donate.set(v.donate)
		}

		if (v.txid || v.id)
			self.id = v.txid || v.id

		if(v.delete) self.delete = v.delete
	}

	self.alias = function(){
		var comment = new pComment();
			comment.import(self.export(true))

			///TODO_REF_ACTIONS remove alias args

			comment.id = self.id
			comment.postid = self.postid

		if(self.delete){
			comment.deleted = true
		}

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

СScore = function(){
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
				type : self.type,
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

	self.export = function(alias){

		if(!alias){
			return {
				share : self.share.v,
				value : self.value.v
			}
		}
		else{
			return {
				type : self.type,
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

	self.export = function(alias){

		if(alias){
			return {
				type : self.type,
				share : self.share.v,
				reason : self.reason.v
			}
			
		}
		else{
			return {
				share : self.share.v,
				reason : self.reason.v
			}
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

ModFlag = function(){
	var self = this;

	self.s2 = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.s3 = {
		set: function(_v){
			this.v = _v
		},
		v : ''
	};

	self.i1 = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	

	self.validation = function(){

		if(!self.s3.v){
			return 'address'
		}

		if(!self.i1.v){
			return 'reason'
		}
	}

	self.serialize = function(){
		// return self.share.v + '_' + self.reason.v
		return self.s2.v + self.s3.v + self.i1.v
	}

	self.export = function(alias){

		if(alias){
			return {
				type : self.type,
				s2 : self.s2.v,
				s3 : self.s3.v,
				i1 : self.i1.v
			}
		}
		else{	
			return {
				s2 : self.s2.v,
				s3 : self.s3.v,
				i1 : self.i1.v
			}
		}


		
	}

	self.import = function(p){

		if (p.s2)
			self.s2.v = p.s2;

		if (p.s3)
			self.s3.v = p.s3;

		if (p.i1)
			self.i1.v = p.i1;
			
	}

	self.type = 'modFlag'
	return self;
}

ModVote = function(){
	var self = this;

	self.s2 = { // id
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.i1 = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	}; //verdict



	self.validation = function(){

		if(!self.s2.v){
			return 'jury'
		}

		if(self.i1.v != 0 && self.i1.v != 1){
			return 'verdict'
		}
	}

	self.serialize = function(){
		return self.s2.v + self.i1.v
	}

	self.export = function(alias){

		if(!alias){
			return {
				s2 : self.s2.v,
				i1 : self.i1.v
			}
		}
		else{
			return {
				type : self.type,
				s2 : self.s2.v,
				i1 : self.i1.v
			}
		}
	}

	self.import = function(p){

		if (p.s2)
			self.s2.v = p.s2;

		if (p.i1)
			self.i1.v = p.i1;

	}

	self.type = 'modVote'
	return self;
}

ContentBoost = function(txid){
	var self = this;
	
	self.txid = txid;

	self.amount = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.ustate = 'contentBoost'

	self.validation = function(){

		if (!self.amount.v){
			return 'amount';
		}

		return false;
	}


	self.serialize = function(){

		return (self.txid)
	}

	self.export = function(alias){

		if(!alias){
			return {
				content : self.txid
			}
		}
		else{
			return {
				type : self.type,
				content : self.txid
			}
		}

	}

	self.import = function(p){

		if (p.amount && p.txid)
			self.amount.v = p.amount
			self.txid = p.txid;


	}


	self.type = 'contentBoost'


	self.typeop = function(){

        return self.type;

	}

	return self;
}

Share = function(lang){

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

		if(self.itisvideo()){
			return 'video'
		}

		if(self.itisaudio()){
			return 'audio'
		}


		if(self.itisarticle()){
			return 'article'
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

					if(typeof app != 'undefined'){

						var bycategories = app.platform.sdk.categories.fromTags(tags, self.language.v)

						if (bycategories.categories.length > 2 + (window.project_config.preferredtags || []).length){
							return false
						}

					}

					if(tags.length > 15){
						return false;
					}

					tags = _.map(tags, function(t){
						return clearTagString(t)
					})

					this.v = tags;
				}

				else{

					if(!tags) return;

					tags = clearTagString(tags)

					var tta = _.uniq(_.clone(this.v).concat(tags))

					if(typeof app != 'undefined'){
						var bycategories = app.platform.sdk.categories.fromTags(tta, self.language.v)

						if (bycategories.categories.length > 2 + (window.project_config.preferredtags || []).length){
							return false
						}
					}

					


					if(tta.length > 15){
						return false;
					}

					this.v = tta

					//removeEqual(this.v, tags)

					//this.v.push(tags)
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
		f : '0',
		c : ''
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : '',
		f : '0',
		c : ''
	}

	self.delayed = function(){

		if(self.settings.t > 1 && ((new Date()).getTime() / 1000) < self.settings.t){
			return new Date(self.settings.t * 1000)
		}

		return null
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

					app.imageUploader.upload({
						base64: image
					}).then( url => {

						self.images.v[index] = url;
						p.success();

					}).catch(err => {

						p.success();
					})
					
				}
				else
				{
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

		if((self.itisvideo() || self.itisaudio()) && !self.caption.v) return 'videocaption'

		if(self.url.v && self.url.v.length && !self.itisvideo() && !self.itisaudio()){

			var l = trim((trim(self.message.v) + trim(self.caption.v)).replace(self.url.v, '')).length

			if (l < 30 && !self.images.v.length){
				return 'url'
			}
			
		}

		if (self.settings.t == 1){
			return 'ntime1'
		}

		if(!self.tags.v.length && !self.repost.v){
			return 'tags'
		}


		if(self.hasexchangetag() &&
		(
			self.tags.v.length > 1 ||
			self.repost.v ||
			self.itisvideo() ||
			self.itisaudio() ||
			(self.url.v && self.url.v.length)
			
			)){

			return 'pkoin_commerce_tag'
		}

	
		return false
	}

	self.serialize = function(){

		var textvalue = self.message.v

		var articleversion2 = self.settings.v == 'a' && self.settings.version && self.settings.version >= 2

		if (articleversion2){
			textvalue = JSON.stringify(textvalue) //  Base64Helper.encode(JSON.stringify(textvalue))
		}
		
		return (self.url.v) 
		
		+ (self.caption.v) 
		+ (articleversion2 ? textvalue : (textvalue))

		+ _.map(self.tags.v, function(t){ return (t) }).join(',')
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
		var ch = self.url.v.replace('peertube://', '').split('/')

		//if(meta.type) return true

		if(meta.type == 'peertube' && (!ch || ch.length <= 0 || ch[ch.length - 1] != 'audio')) return true
	}

	self.itisaudio = function(){

		if(self.settings.v == 'a') return

		if(!self.url.v) return

		var meta = parseVideo(self.url.v)
		var ch = self.url.v.replace('peertube://', '').split('/')

		if(meta.type == 'peertube' && ch && ch.length > 0 && ch[ch.length - 1] == 'audio') return true
	}

	self.itisembed = function(){
		if (self.settings.v === 'a' || !self.url?.v) {
			return;
		}

		const meta = parseVideo(self.url.v);

		const isYoutube = (meta.type === 'youtube');
		const isVimeo = (meta.type === 'vimeo');
		const isBitchute = (meta.type === 'bitchute');
		const isBrighteon = (meta.type === 'brighteon' || meta.type === 'stream.brighteon');
		const isIpfs = (meta.type === 'ipfs');

		return (isYoutube || isVimeo || isBitchute || isBrighteon || isIpfs);
	}

	self.itisipfs = function(){
		if (self.settings.v === 'a' || !self.url?.v) {
			return;
		}

		const meta = parseVideo(self.url.v);

		return (meta.type === 'ipfs');
	}

	self.itisstream = function(){

		

		if(self.settings.v == 'a') return

		if(!self.url.v) return 

		var meta = parseVideo(self.url.v)

		

		if(meta.type == 'peertube' && self.url.v.indexOf('stream') > -1) return true
	}

	self.canSend = function(app, clbk) {
		if (self.itisvideo()) {
			return app.peertubeHandler.checkTranscoding(self.url.v).then(result => clbk(result));
		}

		return clbk(true);
	}

	self.itisarticle = function(){
		return self.settings.v == 'a' && self.settings.version && self.settings.version >= 2
	}

	self.hasexchangetag = function(){
		return self.tags.have('pkoin_commerce')
	}

	self.export = function(extend){

		var textvalue = self.message.v

		var articleversion2 = self.settings.v == 'a' && self.settings.version && self.settings.version >= 2

		if (articleversion2){
			textvalue = textvalue //Base64Helper.encode(JSON.stringify(textvalue))
		}

		if (extend){

			return {
				type : self.type,
				caption : self.caption.v,
				message : textvalue,
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
			c : (self.caption.v),
			m : articleversion2 ? textvalue : (textvalue),
			u : (self.url.v),
			p : _.clone(self.poll.v),
			t : _.map(self.tags.v, function(t){ return (t) }),
			i : self.images.v,
			s : _.clone(self.settings),
			l : self.language.v,
			txidEdit : self.aliasid || "",
			txidRepost : self.repost.v || ""
		}
	}

	self.import = function(v){

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

		var articleversion2 = self.settings.v == 'a' && self.settings.version && self.settings.version >= 2
		var textvalue = v.m || v.message

		self.caption.set(v.c || v.caption)
		self.url.set(v.u || v.url)
		self.tags.set(v.t || v.tags)
		self.message.set(textvalue)
		self.images.set(v.i || v.images)
		self.repost.set(v.r || v.txidRepost || v.repost)
		self.language.set(v.l|| v.language || 'en')
		self.poll.set(v.p || v.poll || {})

		if (v.txidEdit) self.aliasid = v.txidEdit
		
	}

	self.alias = function(txid){
		var share = new pShare();

			share.time = new Date();

			share._import(self.export(true))

			share.txid = txid || self.aliasid

		return share;
	}

	self.optstype = function(){

		if(self.itisvideo()) return 'video'
		if(self.itisaudio()) return 'audio'
		if(self.itisarticle()) return 'article'

		return self.type
	}

	self.typeop = function(){

		if (self.itisvideo()) return 'video'

		if (self.itisaudio()) return 'audio'

		if (self.itisarticle()) return 'article'

		if (self.aliasid){
			return 'share'
		}

		return self.type
	}

	self.size = function(){


		////// base64

		var obj = JSON.stringify(self.export()).replace(/base64,[^ ",]*/g, 'fileinb64').replace(/base64%2C[^ ",]*/g,'fileinb64');

		return obj.length

	}

	self.sizelimit = function(){
		if(self.itisarticle() && !window.testpocketnet){
			return 120000
		}

		return 60000
	}

	if(lang) self.language.set(lang)

	self.type = 'share'

	return self;
}

Collection = function(lang){

	var self = this;

	self.internalid = makeid()

	self.clear = function(){
		
		self.message.set()
		self.images.set()
		self.tags.set()
		self.url.set()
		self.caption.set()
		self.repost.set()
		self.language.set(lang)
		self.aliasid = ""
		
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

	self.ustate = function(){
		if(self.aliasid){
			return ''
		}

		return 'collection'
	}

	self.contentIds = {
		
		set : function(contentIds){

			if(!contentIds){
				this.v = []
			}

			else
			{
				if(_.isArray(contentIds)){
					this.v = contentIds;
				}

				else{

					if(!contentIds) return

					this.v.push(contentIds)
				}
			}

			_.each(self.on.change || {}, function(f){
				f('contentIds', this.v)
			})


			return true;
		},
		remove : function(contentId){
			if(!contentId){
				this.v = []
			}
			else
			{
				removeEqual(this.v, contentId)
			}

			_.each(self.on.change || {}, function(f){
				f('contentIds', this.v)
			})
		},
		get : function(){
			return _.map(this.v, function(contentId){
				return contentId
			})
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
			
			_.each(self.on.change || {}, function(f){
				f('image', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};


	self.on = {
		change : {}
	}

	self.off = function(e){
		delete self.on[e]
	}


	self.checkloaded = function(){
		var notloaded = self.image.v.indexOf('data:image') > -1

		return notloaded
	}

	self.uploadImages = function(app, clbk){

		var image = self.image.v

		if (image.indexOf('data:image') > -1){

			app.imageUploader.upload({
				base64: image
			}).then( url => {

				self.image.v = url;
				clbk();

			}).catch(err => {
				clbk();
			})
			
		}
		else
		{
			clbk();
		}

	}

	self.validation = function(){

		if (self.delete){
			return false;
		}

		/*if(!self.message.v && !self.caption.v){
			return 'message'
		}*/

		if(!self.language.v){
			return 'language'
		}

		if(!self.image.v){
			return 'image'
		}

		if(!self.contentIds.v.length){
			return 'contentIds'
		}

		if(!self.caption.v) return 'caption'

		return false
	}

	self.serialize = function(){
		
		return _.map(self.contentIds.v, function(t){ return (t) }).join(',') + 
		
		(self.language.v) + (self.caption.v) /*+ (self.message.v)*/ + (self.image.v)

		//+ (self.aliasid || "")
	}

	self.shash = function(){
		return bitcoin.crypto.sha256(self.serialize()).toString('hex')
	}

	self.export = function(){

		return {
			type : self.type,
			c : self.caption.v,
			//message : self.message.v,
			i : self.image.v,
			l : self.language.v,
			txidEdit : self.aliasid || "",
			contentIds : self.contentIds.v,
			s : ""
		}

	}

	self.import = function(v){

		self.caption.set(v.c || v.caption)
		//self.message.set(v.message)
		self.image.set(v.i || v.image)
		self.language.set(v.l || v.language || 'en')
		self.contentIds.set(v.contentIds || [])

		if (v.txidEdit) self.aliasid = v.txidEdit
		
	}

	self.alias = function(txid){
		var collection = new pCollection();

			collection.time = new Date();

			collection._import(self.export(true))

			collection.txid = txid || self.aliasid

		return collection;
	}

	self.optstype = function(){
		return self.type
	}

	self.typeop = function(){
		return self.type
	}

	if(lang) self.language.set(lang)

	self.type = 'collection'

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

	self.checkloaded = function(){
		return self.image.v.indexOf('data:image') > -1
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

	self.keys = {
		set : function(_v){

			var mv = this.v;

			if(!_v) this.v = [];

			else
			{
				if(_.isArray(_v)){
					_.each(_v, function(__V){
						if (__V)
							mv.push(__V)
					})
				}
				else
				{
					this.v.push(_v)
				}
				
			}

			if (self.on.change)
				self.on.change('keys', this.v)
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

	self.uploadImage = function(app, clbk){

		var image = self.image.v;

		if (image.indexOf('data:image') > -1){

			var r = image.split(',');

			if (r[1]){

				app.imageUploader.upload({
					base64: image,
					type: 'avatar'
				}).then( url => {

					self.image.v = url;

					if (clbk)
						clbk();

				}).catch(err => {

					if (clbk)
						clbk(err);

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

		if(!app.platform.whiteList.includes(app.user.address.value)) {
			if (hash.indexOf('pocketnet') > -1) return 'pocketnet'
			if (hash.indexOf('bastyon') > -1) return 'bastyon'
		}
		
		return false

	}

	self.serialize = function(){

		return (self.name.v)
		 + (self.site.v)
		 + self.language.v
		 + (self.about.v)
		 + self.image.v + JSON.stringify(self.addresses.v) 
		 + self.ref.v
		 + self.keys.v.join(',')
	}

	self.alias = function(txid){
		var userInfo = new pUserInfo();
		
			userInfo._import(self.export())

			userInfo.subscribers_loaded = true
			userInfo.subscribes_loaded = true
			userInfo.blocking_loaded = true

			userInfo.txid = txid

		return userInfo;
	}

	self.export = function(extend){

		if(extend){
			return {
				type : self.type,
				name : self.name.v,
				about : self.about.v,
				site : self.site.v,
				language : self.language.v,
				image : self.image.v,
				addresses : JSON.stringify(self.addresses.v || []),
				ref : self.ref.v,
				keys : self.keys.v.join(',')
			}
		}

		return {
			n : (self.name.v),
			l : self.language.v,
			a : (self.about.v),
			s : (self.site.v),
			i : self.image.v,
			b : JSON.stringify(self.addresses.v || []),
			r : self.ref.v,
			k : self.keys.v.join(',')
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
		self.keys.set((v.k || v.keys || '').split(','))
	}

	

	self.type = 'userInfo'

	return self;
}

DeleteAccount = function(){
	var self = this;
	
	self.validation = function(){
		return false;
	}

	self.serialize = function(){
		return ''
	}

	self.export = function(alias){
		if(alias){
			return {type : self.type}
		}
		else{
			return {}
			
		}
		
	}

	self.import = function(p){

	}

	self.type = 'accDel'

	self.typeop = function(){
        return self.type;
	}
}

Transaction = function(){
	var self = this;

	self.source = {
		set : function(_v){

			this.v = _v || []

		},
		v : []
	}

	self.reciever = {
		set : function(_v){

			/*{
				address: receiver,
				amount: Number(value)
			}*/

			this.v = _.filter(_v || [], (a) => {

				return a.address && a.amount

			})
		},
		v : []
	};

	self.feemode = {
		set : function(_v){

			this.v = 'exclude'

			if (_v == 'exclude' || _v == 'include'){
				this.v = _v
			}

			
		},
		v : 'exclude'
	};

	self.message = {
		set : function(_v){
			this.v = _v || ''
		},
		v : ''
	};

	
	self.validation = function(){
		return false;
	}

	self.export = function(extend){
		return {
			type : self.type,
			reciever : self.reciever.v,
			feemode : self.feemode.v,
			message : self.message.v,
			source : self.source.v,
		}
	}

	self.import = function(p){
		self.reciever.set(p.reciever)
		self.feemode.set(p.feemode)
		self.message.set(p.message)
		self.source.set(p.source)
	}

	self.type = 'transaction'

}

/* BARTERON */

brtAccount = function(){
	var self = this;

	self.address = '';
	self.tags = [];
	self.geohash = '';
	self.static = false;
	self.radius = 0;
	self.safeDeal = {};

	self.validation = function(){

	}

	self.serialize = function(){
		return self.address +
					 JSON.stringify({
						a: self.tags,
						g: self.geohash,
						s: self.static,
						r: self.radius,
						d: self.safeDeal,
					 });
	}

	self.export = function(alias){
		if(alias){
			return {
				address: self.address,
				tags: self.tags,
				geohash: self.geohash,
				static: self.static,
				radius: self.radius,
				safeDeal: self.safeDeal,
			};
		}

		return {
			s1: self.address,
			p: {
				s4: JSON.stringify({
					a: self.tags,
					g: self.geohash,
					s: self.static,
					r: self.radius,
					d: self.safeDeal,
				})
			}
		};
	}

	self.import = function(d){
		self.address = d.address || app.user.address.value;
		self.tags = d.tags;
		self.geohash = d.geohash;
		self.static = d.static;
		self.radius = d.radius;
		self.safeDeal = d.safeDeal;
	}

	self.type = 'brtaccount';

	return self;
}

brtOffer = function(){
	var self = this;

	self.hash = null;
	self.address = '';
	self.language = '';
	self.caption = '';
	self.description = '';
	self.tag = '';
	self.tags = [];
	self.condition = [];
	self.images = [];
	self.geohash = '';
	self.video = '';
	self.currencyPrice = {};
	self.delivery = {};
	self.videoSettings = {};
	self.safeDeal = {};
	self.price = 0;
	self.published = 'published';

	self.validation = function(){
		if(!self.address) return 'address';
		if(!self.language) return 'language';
		if(!self.caption) return 'caption';
		if(!self.description) return 'description';
		if(!self.tag) return 'tag';
		if(!self.tags) return 'tags';
		if(!self.condition) return 'condition';
		if(!self.images) return 'images';
		if(!self.geohash) return 'geohash';
		if(!(self.price > -1)) return 'price';
	}

	self.serialize = function(){
		return self.address +
					 (self.hash ?? '') +
					 self.language +
					 self.caption +
					 self.description +
					 JSON.stringify({
						t: self.tag,
						a: self.tags,
						c: self.condition,
						p: self.published,
						f: self.currencyPrice,
						d: self.delivery,
						v: self.videoSettings,
						s: self.safeDeal,
					 }) +
					 JSON.stringify(self.images) +
					 self.geohash +
					 self.video +
					 self.price;
	}

	self.export = function(alias){
		if(alias){
			return {
				address: self.address,
				hash: self.hash || null,
				language: self.language,
				caption: self.caption,
				description: self.description,
				tag: self.tag,
				tags: self.tags,
				condition: self.condition,
				images: self.images,
				geohash: self.geohash,
				video: self.video,
				currencyPrice: self.currencyPrice,
				delivery: self.delivery,
				videoSettings: self.videoSettings,
				safeDeal: self.safeDeal,
				price: self.price,
				published: self.published
			};
		}

		return {
			s1: self.address,
			...(self.hash && { s2: self.hash }),
			p: {
				s1: self.language,
				s2: self.caption,
				s3: self.description,
				s4: JSON.stringify({
					t: self.tag,
					a: self.tags,
					c: self.condition,
					p: self.published,
					f: self.currencyPrice,
					d: self.delivery,
					v: self.videoSettings,
					s: self.safeDeal,
				}),
				s5: JSON.stringify(self.images),
				s6: self.geohash,
				s7: self.video,
				i1: self.price
			}
		};
	}

	self.import = function(d){
		self.address = d.address || app.user.address.value;
		self.hash = d.hash || null;
		self.language = d.language;
		self.caption = d.caption;
		self.description = d.description;
		self.tag = d.tag;
		self.tags = d.tags;
		self.condition = d.condition,
		self.images = d.images;
		self.geohash = d.geohash;
		self.video = d.video;
		self.currencyPrice = d.currencyPrice;
		self.delivery = d.delivery;
		self.videoSettings = d.videoSettings;
		self.safeDeal = d.safeDeal;
		self.price = d.price;
		self.published = d.published;
	}

	self.type = 'brtoffer';

	return self;
}


/* ---- */

Miniapp = function(){
	var self = this;

	self.id = null;
	self.hash = ''
	self.address = '';
	self.name = '';
	self.scope = '';
	self.tscope = '';
	self.description = '';
	self.tags = []
	

	self.validation = function(){
		if(!self.id) return 'id';
		if(!self.address) return 'address';
		if(!self.description) return 'description';
		if(!self.name) return 'name';
		if(!self.scope) return 'scope';
		if(!self.tags.length) return 'tags';
	}

	self.serialize = function(){
		return self.address +
				(self.hash ?? '') +
				JSON.stringify({
					n: self.name,
					s: self.scope,
					ts : self.tscope || '',
					d: self.description,
					t: self.tags
				}) +
				self.id
	}

	self.export = function(alias){
		if(alias){
			return {
				address: self.address,
				hash: self.hash || null,
				id : self.id,
				name: self.name,
				description: self.description,
				scope: self.scope,
				tscope : self.tscope || '',
				tags: self.tags
			};
		}

		return {
			s1: self.address,
			...(self.hash && { s2: self.hash }),
			p: {
				s1: JSON.stringify({
					n: self.name,
					s: self.scope,
					ts : self.tscope,
					d: self.description,
					t: self.tags
				}),
				s2: self.id
			}
		};
	}

	self.import = function(d){
		self.address = d.address || '';
		self.hash = d.hash || null;
		self.name = d.name || '';
		self.scope = d.scope || '';
		self.tscope = d.tscope || '';
		self.id = d.id || '';
		self.description = d.description || '';
		self.tags = d.tags || [];
	}

	self.typeop = function(){
		return 'miniapp'
	}

	self.alias = function(){
		var ma = new pMiniapp();

		ma._import(self)

		return ma;
	}

	self.type = 'miniapp';

	return self;
}

pMiniapp = function(){
	var self = this

	self.id = null;
	self.hash = ''
	self.address = '';
	self.name = '';
	self.scope = '';
	self.tscope = '';
	self.description = '';
	self.tags = []

	self._import = function(v){
		self.name = v.name || '';
		self.scope = v.scope || '';
		self.tscope = v.tscope || '';
		self.hash = v.hash || '';
		self.address = v.address || '';
		self.description = v.description || '';
		self.id = v.id || null;
		self.tags = v.tags || [];

		if(v.s1) self.address = v.s1
		if(v.s2) self.hash = v.s2

		if(v.p){
			if(v.p.s1){
				var js = JSON.parse(v.p.s1)

				self.name = js.n || '';
				self.scope = js.s || '';
				self.tscope = js.ts || '';
				self.description = js.d || '';
				self.tags = js.t || [];
			}

			if(v.p.s2){
				self.id = v.p.s2
			}
		}
	}

	self.export = function(){

		var v = {};

		v.name = self.name
		v.scope = self.scope
		v.tscope = self.tscope
		v.hash = self.hash 
		v.id = self.id 
		v.address = self.address 
		v.description = self.description 
		v.tags = _.clone(self.tags)


		return v
	}

	self.import = function(v){
		v = JSON.parse(v)

		self._import(v)
	}
	
	
	self.modFlag = function(reason){
		var modFlag = new ModFlag();

		modFlag.s2.set(self.hash);
		modFlag.s3.set(self.address);
		modFlag.i1.set(reason);

		return modFlag;
	}


	self.upvote = function(value, address){

		if(self.myVal && self.myVal != '0') return null;

		var upvoteShare = new UpvoteShare();

		upvoteShare.share.set(self.hash);
		upvoteShare.value.set(value);
		upvoteShare.address.set(self.address || '')


		return upvoteShare;
	}



	self.type = 'miniapp';
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
	self.reputation = 0;
	self.trial = true;
	self.keys = []
	self.deleted = false

	self.subscribes = [];
	self.subscribers = [];

	self.subscribes_loaded = false
	self.subscribers_loaded = false
	self.blocking_loaded = false;
	self.dev = false


	self.recomendedSubscribes = [];
	self.blocking = [];
	self.regdate = new Date()

	self.subscribers_count = 0
	self.subscribes_count = 0
	self.blockings_count = 0
	self.likers_count = 0
	self.blockers_count = 0

	self.flags = {}
	self.firstFlags = {}

	self.address = ''

	self.rc = 0;
	self.bans = {}
	self.content = {}

	self.objectid = makeid()

	self._import = function(v){
		self.name = v.n || v.name || '';
		self.image = v.i || v.image;
		self.about = v.a || v.about || '';
		self.language = v.l || v.language;
		self.site = v.s || v.site || '';

		self.ref = v.r || v.ref;
		self.rc = v.rc || 0;
		self.postcnt = v.postcnt || 0;
		self.reputation = v.reputation || 0;
		self.deleted = v.deleted || false
		self.bans = v.bans || {}

		if (v.subscribes) {
			self.subscribes = v.subscribes;
		}
		
		if (v.subscribers) {
			self.subscribers = v.subscribers;
		}

		if (v.subscribes_count) self.subscribes_count = v.subscribes_count;
		if (v.subscribers_count) self.subscribers_count = v.subscribers_count;
		

		if (v.recomendedSubscribes) self.recomendedSubscribes = v.recomendedSubscribes;

		if (v.blocking) {
			self.blocking = v.blocking
		}

		if(v.blockings_count) self.blockings_count = v.blockings_count;

		if(v.subscribes_loaded) self.subscribes_loaded = true
		if(v.blockings_loaded) self.blockings_loaded = true
		if(v.subscribers_loaded) self.subscribers_loaded = true
		
		if (v.flags) self.flags = v.flags;
		if (v.hash) self.hash = v.hash;
		if (v.firstFlags) self.firstFlags = v.firstFlags;

		if(v.likers_count) self.likers_count = v.likers_count
		if(v.blockers_count) self.blockers_count = v.blockers_count

		if(v.content) self.content = v.content

		self.keys = (v.k || v.keys || '')

		if(!_.isArray(self.keys)) self.keys = self.keys.split(',')

		self.keys = _.filter(self.keys, function(k){ return k})

		if (v.txid)
			self.txid = v.txid;


		try{
			// self.addresses = JSON.parse(v.b || v.addresses || "[]")

		
			self.addresses = [];

			var extractDeep = str => {

				var parsed = JSON.parse(str);

				if (parsed.length){

					parsed.forEach(obj => {

						if (typeof obj === 'string'){
							extractDeep(obj);
							
						} else if (typeof obj === 'object'){
							self.addresses.push(obj);
							
						}
					})
				}
			}

			extractDeep(v.b || v.addresses || '[]');

		}
		catch (e){
			self.addresses = []
		}

		if(typeof v.trial != 'undefined') self.trial = v.trial
		

		if (v.adr || v.address)
			self.address = v.adr || v.address

		self.temp = v.temp || null;

		self.dev = v.dev;

		if (v.regdate)
			self.regdate.setTime(v.regdate * 1000);


	}

	self.export = function(){

		var v = {};

		v.n = (self.name)
		v.image = self.image
		v.a = (self.about)
		v.l = self.language
		v.s = (self.site)
		v.r = self.ref;
		v.rc = self.rc
		v.b = JSON.stringify(self.addresses || [])
		v.adr = self.address
		v.k = self.keys.join(',')


		v.reputation = self.reputation
		v.subscribers = _.clone(self.subscribers)
		v.subscribes = _.clone(self.subscribes)
		v.recomendedSubscribes = _.clone(self.recomendedSubscribes)
		v.blocking = _.clone(self.blocking)
		v.flags = _.clone(self.flags)
		v.firstFlags = _.clone(self.firstFlags)

		v.subscribes_loaded = self.subscribes_loaded
		v.blockings_loaded = self.blockings_loaded
		v.subscribers_loaded = self.subscribers_loaded

		v.subscribers_count = self.subscribers_count
		v.subscribes_count = self.subscribes_count
		v.blockings_count = self.blockings_count
		v.likers_count = self.likers_count
		v.blockers_count = self.blockers_count
		v.postcnt = self.postcnt
		v.content = _.clone(self.content)

		v.dev = self.dev
		v.bans = self.bans


		if (self.regdate && self.regdate.getTime){
			v.regdate = self.regdate.getTime() / 1000
		}


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

	self.modFlag = function(reason){
		var modFlag = new ModFlag();

		modFlag.s2.set(self.hash);
		modFlag.s3.set(self.address);
		modFlag.i1.set(reason);


		return modFlag;
	}

	self.loadRelations = function(keys, loadFunction){
		return Promise.all(_.map(keys, (k) => {
			return self.loadRelation(k, loadFunction)
		}))
	}

	var loadingRelations = {}

	self.relclbks = {}

	self.loadRelation = function(key, loadFunction){
		if (self[key + '_loaded']){
			return Promise.resolve()
		}

		if(loadingRelations[key]) return loadingRelations[key]

		loadingRelations[key] = loadFunction(self.address, key).then(v => {

			if(v){

				self[key] = v

				self[key + '_loaded'] = true

				_.each(self.relclbks || {}, (c) => {
					c(key, v)
				})
	
				return Promise.resolve(self[key])
			}

			return Promise.resolve(null)

			
		}).catch(e => {

			console.error(e)
			return Promise.resolve(null)
		}).finally(() => {
			delete loadingRelations[key]
		})

		return loadingRelations[key]
	}

	self.relation = function(address, key){
		if(!key) key = 'subscribes'

		return _.find(self[key], function(o){
			return (o.adddress || o.address || o) == address
		})
	}

	self.addRelation = function(obj, key){

		if(!key) key = 'subscribes'

		if (key === 'subscribers'){

			self['subscribers_count'] || (self['subscribers_count'] = 0);
			self['subscribers_count']++;

		}

		if (key === 'subscribes'){

			self['subscribes_count'] || (self['subscribes_count'] = 0);
			self['subscribes_count']++;
			
		}

		if (key === 'blocking'){

			self['blockings_count'] || (self['blockings_count'] = 0);
			self['blockings_count']++;
			
		}
	
		if (self[key]){
			removeEqual(self[key], obj)
			self[key].push(obj)
		}
	}

	self.removeRelation = function(obj, key){

		if(!key) key = 'subscribes'

		if (key === 'subscribers'){
			self['subscribers_count'] || (self['subscribers_count'] = 1);
			self['subscribers_count']--;
		}

		if (key === 'subscribes'){
			self['subscribes_count'] || (self['subscribes_count'] = 1);
			self['subscribes_count']--;
		}

		if (key === 'blocking'){
			self['blockings_count'] || (self['blockings_count'] = 1);
			self['blockings_count']--;
		}

		if (self[key])
			removeEqual(self[key], obj)

	}
	
	self.clone = function(){
		var ui = new pUserInfo()

			ui._import(self.export())

		_.each(loadingRelations, (relfu, key) => {
			ui.setLoadingRelations(relfu, key)
		})

		ui.relclbks[self.objectid] = (key, v) => {

			self[key] = v
			self[key + '_loaded'] = true

			_.each(self.relclbks || {}, (c) => {
				c(key, v)
			})
		}

		ui.cloned = self.objectid

		return ui
	}

	self.setLoadingRelations = function(relfu, key){
		loadingRelations[key] = relfu

		loadingRelations[key].then((result) => {

			if (result){

				self[key] = v
				self[key + '_loaded'] = true

			}

			return Promise.resolve(result)
		}).finally(() => {
			delete loadingRelations[key]
		})

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
	self.repost = '';
	self.language = '';
	self.poll = {};
	self.time = new Date()
	self.___temp = false

	self.comments = 0;
	self.lastComment = null;
	self.reposted = 0;
	self.score = 0
	self.scnt = 0
	self.address = ''

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
		f : '0',
		c : ''
	}

	self.settings = {
		a : '',
		v : '',
		videos : [],
		image : '',
		f : '0',
		c : '',
		t : '0'
	}

	self.delayed = function(){

		console.log('delayed', self)

		if(self.temp || self.relay){
			if(self.settings.t > 1 && ((new Date()).getTime() / 1000) < self.settings.t){
				return new Date(self.settings.t * 1000)
			}
		}

		return null
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
		var ch = self.url.replace('peertube://', '').split('/')

		if(meta.type == 'peertube' && (!ch || ch.length <= 0 || ch[ch.length - 1] != 'audio')) return true
	}

	self.itisaudio = function(){

		if(self.settings.v == 'a') return

		if(!self.url) return

		var meta = parseVideo(self.url)
		var ch = self.url.replace('peertube://', '').split('/')

		if(meta.type == 'peertube' && ch && ch.length > 0 && ch[ch.length - 1] == 'audio') return true
	}

	self.itisembed = function(){
		if (self.settings.v === 'a' || !self.url?.v) {
			return;
		}

		const meta = parseVideo(self.url.v);

		const isYoutube = (meta.type === 'youtube');
		const isVimeo = (meta.type === 'vimeo');
		const isBitchute = (meta.type === 'bitchute');
		const isBrighteon = (meta.type === 'brighteon' || meta.type === 'stream.brighteon');
		const isIpfs = (meta.type === 'ipfs');

		return (isYoutube || isVimeo || isBitchute || isBrighteon || isIpfs);
	}

	self.itisipfs = function(){
		if (self.settings.v === 'a' || !self.url?.v) {
			return;
		}

		const meta = parseVideo(self.url.v);

		return (meta.type === 'ipfs');
	}

	self.itisstream = function(){

		if(self.settings.v == 'a') return

		if(!self.url) return 

		var meta = parseVideo(self.url)

		if(meta.type == 'peertube' && self.url.indexOf('stream') > -1) return true
	}

	self.hasexchangetag = function(){
		return self.tags.indexOf('pkoin_commerce') > -1
	}

	self.itisarticle = function(){
		return self.settings.v == 'a' && self.settings.version && self.settings.version >= 2
	}

	self._import = function(v){

		self.settings = v.s || v.settings || {}

		
		if(v.i && !_.isArray(v.i)) v.i = [v.i]
		if(v.t && !_.isArray(v.t)) v.t = [v.t]
		
	
		self.message = v.m || v.message || ""
		self.caption = v.c || v.caption || ""
		self.tags = v.t || v.tags || []
		self.url = v.u || v.url || '';
		self.poll = v.p || v.poll || {}
	

		if(v.myVal) self.myVal = Number(v.myVal)

		self.language = v.l || v.language || 'en'
		self.images = v.i || v.images || []
		self.repost = v.r || v.repost || v.txidRepost || ''

		self.images = self.images.filter(image => checkIfAllowedImage(image));

		if (v.deleted) self.deleted = true

		if (v.txid)
			self.txid = v.txid;

		if (v.id)
			self.id = v.id;

		if(v.___temp) self.___temp = v.___temp

		if (v.txidEdit){
			self.txidEdit = v.txidEdit;	
			self.edit = true
		}

		if (v.edit){
			self.edit = true
		}

		if(v.scoreSum){
			self.score = Number(v.scoreSum)
		}

		if(v.scoreCnt){
			self.scnt = Number(v.scoreCnt)
		}


		self.temp = v.temp || null;

		if (v._time)
			self._time = v._time

		if (v.comments)
			self.comments = v.comments

		if (v.reposted)
			self.reposted = v.reposted

		if (v.lastComment)
			self.lastComment = v.lastComment.id || v.lastComment

		if(v.address){
			self.address = v.address
		}

		if (v.time)
			self.time.setTime(v.time * 1000);
	}

	self.clone = function(){
		var ui = new pShare()

			ui._import(self.export())

			//ui.lastComment = self.lastComment

		return ui
	}

	self.export = function(){

		var v = {}
		
		v.m = (self.message)
		v.c = (self.caption)
		v.u = (self.url)
		v.t = _.map(self.tags || [], function(t){ return (t) })
		v.i = _.clone(self.images)
		v._time = self._time || self.time;
		v.time = self.time.getTime() / 1000;
		v.s = _.clone(self.settings)
		v.l = self.language
		v.p = self.poll
		v.deleted = self.deleted

		v.scoreCnt = self.scnt
		v.scoreSum = self.score
		v.address = self.address
		v.txid = self.txid
		v.deleted = self.deleted
		v.comments = self.comments
		v.repost = self.repost
		v.txidEdit = self.txidEdit
		v.edit = self.edit
		v.___temp = self.___temp


		if(self.lastComment){
			/*if(self.lastComment.export){
				v.lastComment = self.lastComment.export()
			}
			else{*/
				v.lastComment = self.lastComment
			//}
		}


		return v
	}

	self.import = function(v){

		v = JSON.parse(v)

		self._import(v)
	}

	self.social = function(app){

		var text = self.message.v;
		var name = app.platform.api.name(self.address)

		if (window.cordova && deep(window, 'plugins.socialsharing') && self.message.blocks){

			
			var edjs = new edjsHTML(null, app)
			var message = edjs.apply(self.message, articleDecode)
			text = edjs.text(message);
			text = self.caption + `\n\n` + text;
	
		} else {

			text = self.renders.text(text);

		}

		var s = {
			image : '',
			files : self.images || [],
			title : app.localization.e('postby') + " " + name,
			html : {
				body : self.renders.messagec(),
				preview : trimHtml(self.renders.messagec(), 160).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...')
			},

			text : {
				body : text,
				preview : trimHtml(self.renders.text(), 130).replace(/ &hellip;/g, '...').replace(/&hellip;/g, '...'),
				title: self.caption
			}
		
		}

		if (self.url){
			var v = videoImage(self.url)
			if (v){
				s.image = v;
				//s.images.unshift(v)
			}
		}

		if(!s.image) s.image = self.images[0]

		return s
	}

	self.renders = {
		captionclear : function(c){
			return c || self.caption || ''
		},
		caption : function(c, m){
			if(!c && !self.caption){

				if((self.message).length < 100) {
					return trimrn(m || self.message)
				}

				return ''

			}

			var m = trimrn(c || self.caption);

			return m;
		},

		message : function(c, m){
			if((!c && !self.caption) && (self.message).length < 100){
				return ''
			}

			var m = trimrn(m || self.message)

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

	

		
	}

	self.upvote = function(value){

		if(self.myVal && self.myVal != '0') return null;

		var upvoteShare = new UpvoteShare();

		upvoteShare.share.set(self.txid);
		upvoteShare.value.set(value);
		upvoteShare.address.set(self.address || '')

		//self.myVal = Number(value);		

		return upvoteShare;
	}

	self.complain = function(reason){
		var complainShare = new ComplainShare();

		complainShare.share.set(self.txid);
		complainShare.reason.set(reason);

		return complainShare;
	}
	self.modFlag = function(reason){
		var modFlag = new ModFlag();

		modFlag.s2.set(self.txid);
		modFlag.s3.set(self.address);
		modFlag.i1.set(reason);

		return modFlag;
	}

	self.alias = function(){
		var share = new Share();

		share.import(self)

		share.aliasid = self.txid

		share.time = self.time

		return share;
	}

	self.visibility = function(){

		//if(rand(0, 1)) return 'sub'

		if(!self.settings.f) return null

		if(self.settings.f == '0') return null

		if(self.settings.f == '1') return 'sub'

		if(self.settings.f == '2') return 'reg'

		if(self.settings.f == '3') return 'paid'

		return 'any'
	}

	self.type = 'share'

	return self;
}

pCollection = function(){

	var self = this;

	self.message = ''
	self.caption = ''
	self.image = '';
	self.txid = '';
	self.language = '';
	self.contentIds = [];

	

	self.time = new Date()
	self.___temp = false

	self.address = ''

	self.deleted = false;

	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}

	self._import = function(v){

		self.message = v.message || ""
		self.caption = v.c || v.caption || ""
		self.contentIds = v.contentIds || []

		self.language =  v.l || v.language || 'en'
		self.image = v.i || v.image || ''

		if(self.image){
			if(!checkIfAllowedImage(self.image)) self.image = ''
		}

		if (v.deleted) self.deleted = true

		if (v.txid)
			self.txid = v.txid;

		if (v.id)
			self.id = v.id;

		if(v.___temp) self.___temp = v.___temp

		if (v.txidEdit){
			self.txidEdit = v.txidEdit;	
			self.edit = true
		}

		if (v.edit){
			self.edit = true
		}

		self.temp = v.temp || null;

		if (v._time)
			self._time = v._time

		if (v.time)
			self.time.setTime(v.time * 1000);
	}

	self.clone = function(){
		var ui = new pCollection()

			ui._import(self.export())

		return ui
	}

	self.export = function(){

		var v = {}
		
		v.message = (self.message)
		v.caption = (self.caption)
		v.contentIds = _.map(self.contentIds || [], function(t){ return (t) })
		v.image = _.clone(self.image)
		v._time = self._time || self.time;
		v.time = self.time.getTime() / 1000;
		v.language = self.language
		v.deleted = self.deleted

		v.address = self.address
		v.txid = self.txid
		v.txidEdit = self.txidEdit
		v.edit = self.edit
		v.___temp = self.___temp

		return v
	}

	self.import = function(v){

		v = JSON.parse(v)

		self._import(v)
	}

	self.social = function(app){

		var text = self.renders.text(self.message);
		var name = app.platform.api.name(self.address)


		var s = {
			image : self.image ? self.image : '',
			files : self.image ? [self.image] : [],
			title : app.localization.e('collectionby') + " " + name,
			html : {
				body : text,
				preview : self.renders.caption(self.caption)
			},

			text : {
				body : text,
				preview : self.renders.caption(self.caption),
				title: self.caption
			}
		
		}

		return s
	}

	self.renders = {
		
		caption : function(c){

			var m = trimrn(filterXSS(c || self.caption, {
				whiteList: [],
				stripIgnoreTag: true,
			}))

			return trimrn(c || self.caption);
		},

		message : function(m){

			var m = trimrn(filterXSS(m || self.message, {
				whiteList: [],
				stripIgnoreTag: true,
			}))

			return m
		},
		
	}

	self.alias = function(){
		var collection = new Collection();

		collection.import(self)

		collection.aliasid = self.txid

		collection.time = self.time

		return collection;
	}

	
	self.type = 'collection'

	return self;
}

pComment = function(){

	var self = this;

	self.url = ''
	self.message = ''
	self.images = [];
	self.info = ''

	self.postid = '';
	self.id = '';
	self.time = new Date();
	self.timeUpd = new Date();
	self.children = 0;

	self.amount = 0;


	self.address = '';
	self.parentid = '';
	self.answerid = '';

	self.scoreDown = 0;
	self.scoreUp = 0;
	self.myScore = 0;
	self.deleted = false;
	self.address = ''
	self.blck_cnt_cmt = 0
	self.blck_cmt_cnt = 0

	self.reputation = 0;

	self.my = function(app){

		if(self.address && self.address == app.user.address.value) return true

		return false
	}


	self._import = function(v){

		if (v.msgparsed){
			self.url = v.msgparsed.url;
			self.message = v.msgparsed.message
			self.images = v.msgparsed.images
			self.info = v.msgparsed.info || ''
		}			
		
		self.postid = v.postid;
		self.answerid = v.answerid;
		self.parentid = v.parentid;


		v.blck_cmt_cnt == 1 ? self.blck_cmt_cnt = 1 : self.blck_cmt_cnt = 0
		v.blck_cnt_cmt == 1 ? self.blck_cnt_cmt = 1 : self.blck_cnt_cmt = 0


		self.scoreDown = Number(v.scoreDown || '0');
		self.scoreUp = Number(v.scoreUp || '0');

		//self.donation = v.donation;
		self.amount = Number(v.amount || '0');
		self.children = Number(v.children || '0');

		if(v.donate){
			self.amount = _.reduce(v.donate, (m, n) => {
				return m + n.amount
			}, 0) * 100000000
		}

		self.address = v.address
		self.commentTo = v.commentTo || null

		if(v.addressCommentAnswer && v.addressCommentAnswer != self.address) self.commentTo = v.addressCommentAnswer
		if(!self.commentTo && v.addressCommentParent && v.addressCommentParent != self.address) self.commentTo = v.addressCommentAnswer
		if(!self.commentTo && v.addressContent && v.addressContent != self.address) self.commentTo = v.addressContent

		if (v.rating)
			self.rating = v.rating

		if (v.myScore) self.myScore = v.myScore

		if (v.deleted) self.deleted = true

		if (v.id || v.txid)
			self.id = v.id || v.txid;

		self.setTime(v.time, v.timeUpd)

	}

	self.import = function(v){
			
		/*if (v.msg)
			v.msgparsed = JSON.parse(v.msg)*/

		self._import(v)
	}

	self.export = function(){

		var r = {
			id : self.id,
			postid : self.postid || "",
			answerid : self.answerid || "",
			parentid : self.parentid || "",
			msgparsed : {
				message : self.message,
				url : self.url,
				images : self.images,
				info : self.info
			},
			scoreDown : self.scoreDown,
			scoreUp : self.scoreUp,
			myScore : self.myScore,
			deleted : self.deleted,
			donation: self.donation,
			amount: self.amount,
			address : self.address,
			children : self.children,
			time : self.time.getTime() / 1000,
			timeUpd: self.timeUpd.getTime() / 1000,
			commentTo : self.commentTo,
			blck_cmt_cnt : self.blck_cmt_cnt,
			blck_cnt_cmt : self.blck_cnt_cmt
		}

		return r
	}

	self.clone = function(){
		var ui = new pComment()

			ui._import(self.export())

		return ui
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

	self.modFlag = function(reason){
		var modFlag = new ModFlag();

		modFlag.s2.set(self.id);
		modFlag.s3.set(self.address);
		modFlag.i1.set(reason);

		return modFlag;
	}

	self.delete = function(){
		var c = new Comment(self.postid);

		c.id = self.id
		c.parentid = self.parentid
		c.answerid = self.answerid
		c.delete = true
		

		return c

	}

	self.setTime = function(t, tu){

		if(t){
			self.time = new Date()
			self.time.setTime(t * 1000);
		}
		
		if(tu){
			self.timeUpd = new Date()
			self.timeUpd.setTime(tu * 1000);
		}

		
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
		if(!s.image) s.image = app.platform.psdk.userInfo.getShortForm(self.address).image
		

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



Img = function(p){
	if(!p) p = {};
 
	var self = this;

		self.type = p.type;
		self.name = p.name;
		self.app = p.app;
		self.refId = p.refId;

	return self;
}


Remove = function(){

	var self = this;

	self.clear = function(){
		
		self.txidEdit.set()
		self.s.set()

	}

	self.txidEdit = {
		set : function(_v){
			this.v = _v
		},
		v : ''
	};

	self.ustate = function(){

		return self.type;
	}

	self.on = {
		change : {}
	}
	self.off = function(e){
		delete self.on[e]
	}


	self.checkloaded = function(){
		return false
	}


	self.validation = function(){
		return false
	}

	self.serialize = function(){

        return (self.txidEdit.v)

	}

	self.shash = function(){
		return bitcoin.crypto.sha256(self.serialize()).toString('hex')
	}
	

	self.export = function(extend){

		var r = {
			txidEdit: self.txidEdit.v || "",
		}

		if(extend){
			r.type = self.type
		}
	
		return r

	}

	self.import = function(v){
		self.txidEdit.set(v.txidEdit || ""); 
	}

	self.alias = function(){
		var remove = new pRemove();

            //remove.time = new Date();

			remove._import(self.export())


		return remove;
	}

	self.optstype = function(){

		return self.type
	}



	self.typeop = function(){

        return self.type;

	}

	self.type = 'contentDelete'

	return self;
}


pRemove = function(){

	var self = this;

	self.txidEdit = '';
	self.s = ''

	self.on = {}
	self.off = function(e){
		delete self.on[e]
	}

	self.isEmpty = function(){

		return !self.txidEdit && !self.s
	}

	self._import = function(v, notdecode){

		if (v.txidEdit)
			self.txidEdit = v.txidEdit;

		
		if (v.s)
			self.s = v.s;

	}

	self.export = function(){

		var v = {}
	
		v.txidEdit = self.txidEdit;

		if (v.s){
			v.s = self.s;
		}

		return v
	}

	self.import = function(v){

		v = JSON.parse(v)

		self._import(v)
	}


	/*self.delete = function(){
		var c = new Remove();

		c.txidEdit = self.txidEdit;
		c.c = self.c;
		

		return c

	}*/


	self.alias = function(){
		var remove = new Remove();

		remove.import(self)

		remove.txidEdit = self.txidEdit

		if (remove.s){
			remove.s = self.s;
		}

		return remove;
	}

	self.type = 'contentDelete'

	return self;
}

Settings = function(){

	var self = this;

	self.pin = {
		set : function(_v){

			if(!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('pin', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};

	self.monetization = {
		set : function(_v){

			if (_v !== '' && _v !== false && _v !== true){
				this.v = ''
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('monetization', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};

	self.paidsubscription = {
		set : function(_v){

			if (!_v || _.isNaN(_v)){
				this.v = 0
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('paidsubscription', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};

	self.cover = {
		set : function(_v){

			if (!_v){
				this.v = ''
			}
			else
			{
				this.v = _v
			}

			_.each(self.on.change || {}, function(f){
				f('cover', this.v)
			})

		},
		get : function(){
			return this.v
		},
		v : ''
	};

	self.clear = function(){

		self.pin.set()
		self.monetization.set()
		self.paidsubscription.set()
		self.cover.set()

	}

	self.checkloaded = function(){
		return self.cover.v.indexOf('data:image') > -1
	}

	self.uploadImage = function(app, clbk){

		var image = self.cover.v;

		console.log('image', image)
		console.log('image', image.indexOf('data:image'))

		if (image.indexOf('data:image') > -1){

			var r = image.split(',');

			if (r[1]){

				app.imageUploader.upload({
					base64: image
				}).then( url => {

					self.cover.v = url;

					if (clbk)
						clbk();

				}).catch(err => {

					if (clbk)
						clbk(err);

				})

			}
		}
		else
		{
			if (clbk)
				clbk();
		}

	}

	self.ustate = function(){

		return self.type;
	}

	self.on = {
		change : {}
	}
	self.off = function(e){
		delete self.on[e]
	}


	self.validation = function(){
		return false
	}

	self.serialize = function(){

        return JSON.stringify({
			pin: self.pin.v,
			monetization : self.monetization.v,
			paidsubscription : self.paidsubscription.v,
			cover : self.cover.v
		})

	}

	self.shash = function(){
		return bitcoin.crypto.sha256(self.serialize()).toString('hex')
	}

	self.export = function(alias){

		if(alias){
			return {
				type : self.type,
				d: JSON.stringify({
					pin: self.pin.v || "",
					monetization : (self.monetization.v === "" || self.monetization.v === true || self.monetization.v === false) ? self.monetization.v : "",
					paidsubscription : self.paidsubscription.v,
					cover : self.cover.v
				})
			} 
		}

		return {
			d: JSON.stringify({
				pin: self.pin.v || "",
				monetization : (self.monetization.v === "" || self.monetization.v === true || self.monetization.v === false) ? self.monetization.v : "",
				paidsubscription : self.paidsubscription.v,
				cover : self.cover.v
			})
		}

	}

	self.import = function(v = {}){

		if(!v.d) v.d = "{}"

		var parsed = {}
		
		if(!_.isObject(v.d)){
			try{
				parsed = JSON.parse(v.d)
			}catch(e){
				parsed = {}
			}
		}
		else{
			parsed = v.d
		}

		self.pin.set(parsed.pin || ""); 
		self.monetization.set(parsed.monetization); 
		self.paidsubscription.set(parsed.paidsubscription || 0)
		self.cover.set(parsed.cover || '')

	}

	self.optstype = function(){
		return self.type	
	}

	self.typeop = function(){

        return self.type;

	}

	self.alias = function(){
		var settings = new pSettings();
			settings.import(self.export(true))

		return settings;
	}

	self.type = 'accSet'

	return self;
}

pSettings = function(){

	var self = this;

	self.pin = '';
	self.monetization = ''
	self.paidsubscription = 0
	self.address = ''
	self.cover = ''

	self._import = function(dv = {}){

		var v = dv.d

		if(!v) v = {}

		self.pin = v.pin || ""
		self.monetization = (v.monetization === "" || v.monetization === true || v.monetization === false) ? v.monetization : ""
		self.address = v.address || ""
		self.cover = v.cover || ""
		self.paidsubscription = v.paidsubscription || 0
	}

	self.export = function(){

		var v = {
			d : {
				pin : self.pin,
				monetization : self.monetization,
				address : self.address,
				cover : self.cover,
				paidsubscription : self.paidsubscription
			}
		}

		return v
	}

	self.import = function(v = {}){

		
		if(!v.d) v.d = "{}"

		var parsed = {}
		
		if(!_.isObject(v.d)){
			try{
				parsed = JSON.parse(v.d)
			}catch(e){
				parsed = {}
			}
		}
		else{
			parsed = v.d
		}


		self._import({
			d : parsed
		})
	}

	self.alias = function(){
		var s = new Settings();

		s.import({
			d : {
				pin : self.pin,
				monetization : self.monetization,
				paidsubscription : self.paidsubscription,
				cover : self.cover
			}
		})

		
		return s;
	}

	self.clone = function(){
		var ui = new pSettings()

			ui._import(self.export())

			ui.address = self.address

		return ui
	}

	self.type = 'accSet'

	return self;
}





kits = {
	c : {
		userInfo : UserInfo,
		share : Share,
		complainShare : ComplainShare,
		modFlag : ModFlag,
		modVote : ModVote,
		upvoteShare : UpvoteShare,
		cScore : СScore,
		comment : Comment,
		unblocking : Unblocking,
		blocking : Blocking,
		unsubscribe : Unsubscribe,
		subscribe : Subscribe,
		subscribePrivate : SubscribePrivate,
		contentBoost : ContentBoost,
		deleteAccount : DeleteAccount,
		accDel : DeleteAccount,
		transaction : Transaction,
		contentDelete : Remove,
		accSet : Settings,
		brtoffer : brtOffer,
		brtaccount : brtAccount,
		miniapp : Miniapp

	},

	ini : {

	},
	alias : {
		userInfo : pUserInfo,
		share : pShare,
		comment : pComment,
		contentDelete : pRemove,
		settings : pSettings,
		miniapp : pMiniapp
	}
}

/*


enum TxType
{
	NOT_SUPPORTED = 0,
	TX_DEFAULT = 1,
	TX_COINBASE = 2,
	TX_COINSTAKE = 3,
	ACCOUNT_USER = 100,
	ACCOUNT_SETTING = 103,
	ACCOUNT_DELETE = 170,
	CONTENT_DELETE = 207,
	CONTENT_POST = 200,
	CONTENT_VIDEO = 201,
	CONTENT_ARTICLE = 202,
	CONTENT_STREAM = 209,
	CONTENT_AUDIO = 210,
	CONTENT_COLLECTION = 220,
	CONTENT_COMMENT = 204,
	CONTENT_COMMENT_EDIT = 205,
	CONTENT_COMMENT_DELETE = 206,
	BOOST_CONTENT = 208,
	ACTION_SCORE_CONTENT = 300,
	ACTION_SCORE_COMMENT = 301,
	ACTION_SUBSCRIBE = 302,
	ACTION_SUBSCRIBE_PRIVATE = 303,
	ACTION_SUBSCRIBE_CANCEL = 304,
	ACTION_BLOCKING = 305,
	ACTION_BLOCKING_CANCEL = 306,
	ACTION_COMPLAIN = 307,
	// MODERATOR_REQUEST_SUBS = 400, // Some users have the right to choose a moderator
	// MODERATOR_REQUEST_COIN = 401, // Some users have the right to choose a moderator
	// MODERATOR_REQUEST_CANCEL = 402, // Users have the right to cancel the status of the moderator they have appointed
	// MODERATOR_REGISTER_SELF = 403, // Each moderator must register in the system to perform their functions
	// MODERATOR_REGISTER_REQUEST = 404, // Each moderator must register with request in the system to perform their functions
	// MODERATOR_REGISTER_CANCEL = 405, // Each moderator have the right to cancel self moderation status
	MODERATION_FLAG = 410, // Flags are used to mark content that needs moderation
	MODERATION_VOTE = 420, // Votes is used by moderators in the jury process
	// Barteron transactions
	BARTERON_ACCOUNT = 104,
	BARTERON_OFFER = 211,
};

*/
