var donateAnimations = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;
		
		/* Animations */
		class Animation {
			#queue = [];
			#timeout;
			#donate;
			#animations = [
				{
					src: "./components/donateAnimations/Coins3.gif",
					height: 300,
					width: 300,
					length: 2000
				}
			];

			constructor() {
				el.img = el.c.find(".image");
				el.snd = el.c.find(".sender");
				el.amt = el.c.find(".amount");
				el.msg = el.c.find(".message");
			}

			#start() {
				if (!this.#donate) {
					this.#donate = this.#queue.shift();

					if (this.#donate) {
						const animation = this.#animations[0];

						el.c.removeClass("fadeOut");
						el.c.addClass("fadeIn");

						/* Fill sender, amount and message */
						el.snd.text(this.#donate.senderName);
						el.amt.text(`${ this.#donate.value } PKOIN`);
						el.msg.text(this.#donate.senderMessage);

						/* Make animation */
						el.img[0].src = animation.src;
						el.c.css({ height: animation.height || 0, width: animation.width || 0 });

						/* Finish animation */
						clearTimeout(this.#timeout);
						this.#timeout = setTimeout(() => this.#end(), animation.length);
					}
				}
			}

			#end() {
				el.c.removeClass("fadeIn");
				el.c.addClass("fadeOut");

				/* Finish fade */
				clearTimeout(this.#timeout);
				this.#timeout = setTimeout(() => {
					el.c.removeClass("fadeOut");
					el.img[0].src = "";
					this.#donate = null;
					if (this.#queue.length) this.#start();
				}, 250);
			}
		
			inqueue({ senderName, senderMessage, value }) {
				this.#queue.push({
					senderName,
					senderMessage,
					value
				});

				const index = this.#queue.length - 1;
				this.#start();

				return index;
			}

			dequeue(id) {
				const removed = Object.assign({}, this.#queue[id]);
				if (removed) this.#queue = this.#queue.slice(id);

				return removed;
			}

			destroy() {
				clearTimeout(this.#timeout);
				this.#queue =
				this.#timeout =
				this.#donate =
				this.#animations = null;
				
				return this;
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){
				el = {};
				self.app.platform.donateAnimation.destroy();
				self.app.platform.donateAnimation = null;
			},
			
			init : function(p){
				el = {};
				el.c = p.el.find('#' + self.map.id);
				
				self.app.platform.donateAnimation = new Animation();

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
	module.exports = donateAnimations;
}
else{

	app.modules.donateAnimations = {};
	app.modules.donateAnimations.module = donateAnimations;

}