
 /*_____*/ 
var about=function(){var p=new nModule,n={},a=function(t){var n,e,a,i=deep(t,"history"),o=null,s=null,c={time:function(){today=new Date,today=Math.floor((e-today)/1e3),tsec=today%60,today=Math.floor(today/60),tsec<0?tsec="00":tsec<10&&(tsec="0"+tsec),tmin=today%60,today=Math.floor(today/60),tmin<0?tmin="00":tmin<10&&(tmin="0"+tmin),thour=today%24,today=Math.floor(today/24),thour<0&&(thour="00"),today<0&&(today="00"),n.days.html(today),n.seconds.html(tsec),n.minutes.html(tmin),n.hours.html(thour)},fixed:function(){var t=$(window).scrollTop();n.main.offset().top+n.main.height()<t?n.fixed.addClass("active"):n.fixed.removeClass("active")},explore:function(){var t=n.c.find(".faq");console.log("SD"),_scrollToTop(t)},validateEmail:function(t){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(t)},saveEmail:function(t,e,n){n||(n="4");var a={Email:t,Name:""};a.Action||(a.Action="ADDTOMAILLIST"),a.TemplateID||(a.TemplateID=n),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:a,dataType:"json",success:function(){e&&e()}})},joinSuccess:function(t){p.fastTemplate("joinSuccess",function(t){dialog({html:t,class:"one joinbeta",btn1text:"Okay"})},{email:t})},whitepaperSuccess:function(){p.fastTemplate("whitepaperSuccess",function(t){dialog({html:t,class:"one joinbeta",btn1text:"Okay"})})},whitepaper:function(){p.fastTemplate("whitepaper",function(t){dialog({html:t,wrap:!0,success:function(t){var e=t.el.find("input").val();if(c.validateEmail(e))return c.saveEmail(e,null,"5"),c.whitepaperSuccess(),!0},clbk:function(t){var e=function(){var t=$(this).val();return c.validateEmail(t)?(n.removeClass("disabled"),!0):(n.addClass("disabled"),!1)},n=t.find(".btn1");n.addClass("disabled"),n.on("click",function(){});var a=t.find("input");a.focus(),a.on("change",e),a.on("keyup",e)},class:"one joinbeta"})})},join:function(t){p.fastTemplate("join",function(t){dialog({html:t,wrap:!0,success:function(t){var e=t.el.find("input").val();if(c.validateEmail(e))return c.saveEmail(e),c.joinSuccess(e),!0},clbk:function(t){var e=function(){var t=$(this).val();return c.validateEmail(t)?(n.removeClass("disabled"),!0):(n.addClass("disabled"),!1)},n=t.find(".btn1");n.addClass("disabled"),n.on("click",function(){});var a=t.find("input");a.focus(),a.on("change",e),a.on("keyup",e)},class:"one joinbeta"})},{action:t})}},l=function(){c.whitepaper()},d=function(){c.join()},r=function(){var t=$(this).attr("answer");t&&s.send(t,function(){f.survey()})},u=[{name:"Twitter",icon:'<i class="fab fa-twitter"></i>',href:"hhttps://twitter.com/Pocket_Net"},{name:"Telegram",icon:'<i class="fab fa-telegram"></i>',href:"https://t.me/PocketRep"},{name:"Facebook",icon:'<i class="fab fa-facebook"></i>',href:"https://www.facebook.com/PocketNet"},{name:"Minds",image:"https://cdn-assets.minds.com/front/dist/assets/logos/bulb.svg",href:"https://www.minds.com/PocketNet"},{name:"Linkedin",icon:'<i class="fab fa-linkedin"></i>',href:"https://www.linkedin.com/company/cryptolo-io"},{name:"Mastodon",icon:'<i class="fab fa-mastodon"></i>',href:"https://mastodon.social/@PocketRep"},{name:"Gab",image:"https://gab.com/assets/img/logo-dec.png",href:"https://gab.com/PocketNet"},{name:"Sola",image:"https://web.solacore.net/img/logo_medium-3_mNF.png",href:"https://sola.ai/cryptolo_io"},{name:"Medium",icon:'<i class="fab fa-medium"></i>',href:"https://medium.com/@cryptolo.io"}],f={survey:function(e){console.log("survey",s),p.shell({name:"survey",el:n.survey,data:{survey:s},animation:"fadeIn"},function(t){t.el.find(".sendanswer").on("click",r),t.el.find(".resultpercent").each(function(){var t=$(this);t.animate({width:t.attr("w")+"%"},130)}),e&&e()})},tes:function(){var t=n.c.find(".tes");lazyEach({array:t,sync:!0,action:function(t){var e=$(t.item),n=e.attr("time")||600;e.addClass("show"),setTimeout(function(){t.success()},n)}})},lenta:function(){p.nav.api.load({open:!0,id:"lenta",el:n.lenta,animation:!1,mid:"about",essenseData:{author:"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",byauthor:!0,authAction:function(t){c.join(t)},notscrollloading:!0},clbk:function(t,e){o=e}})}},m=function(){};return{primary:i,getdata:function(t){o=null,s=new sQuestion({id:"pocketnetlanding",ajax:p.app.ajax,question:"Are you fed up with traditional social media like Facebook, Twitter and others?",answers:[{t:"Yes, very",v:1},{t:"Yes, somewhat",v:2},{t:"Facebook and Twitter are just great",v:3}]}),t({socials:u,survey:s})},destroy:function(){a&&clearInterval(a),o&&(o.destroy(),o=null),window.removeEventListener("scroll",c.fixed),n={}},init:function(t){m(),(n={}).c=t.el.find("#"+p.map.id),n.lenta=t.el.find(".lenta"),n.main=n.c.find(".main"),n.fixed=n.c.find(".fixedButton"),n.join=n.c.find(".ejoin"),n.whitepaper=n.c.find(".whitepaper"),n.days=t.el.find(".days"),n.seconds=t.el.find(".seconds"),n.minutes=t.el.find(".minutes"),n.hours=t.el.find(".hours"),n.survey=t.el.find(".survey"),e=new Date(2019,0,13,23,59),a=setInterval(c.time,1e3),n.join.on("click",d),n.whitepaper.on("click",l),n.c.find(".exploremore").on("click",c.explore),window.addEventListener("scroll",c.fixed),f.tes(),f.lenta(),s.init(function(){f.survey()}),t.clbk(null,t)}}};return p.run=function(t){var e=p.addEssense(n,a,t);p.init(e,t)},p.stop=function(){_.each(n,function(t){t.destroy()})},p}();"undefined"!=typeof module?module.exports=about:(app.modules.about={},app.modules.about.module=about);
 /*_____*/ 
var terms=function(){var i=new nModule,e={},o=function(n){var t,e=deep(n,"history"),o=function(){i.shell({name:i.app.localization.key,el:t.c,data:{}},function(n){})},u=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){t={}},init:function(n){u(),(t={}).c=n.el.find("#"+i.map.id),o(),n.clbk(null,n)},wnd:{class:"withoutButtons allscreen black a100"}}};return i.run=function(n){var t=i.addEssense(e,o,n);i.init(t,n)},i.stop=function(){_.each(e,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=terms:(app.modules.terms={},app.modules.terms.module=terms);
 /*_____*/ 
var page404=function(){var t=new nModule,o={},u=function(n){var e=deep(n,"history"),o=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}};return t.run=function(n){var e=t.addEssense(o,u,n);t.init(e,n)},t.stop=function(){_.each(o,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=page404:(app.modules.page404={},app.modules.page404.module=page404);
 /*_____*/ 
var registration=function(){var v=new nModule,i={},t=function(n){var a,i,t,o=deep(n,"history"),c={last:!1,end:!1},l=null;console.log("scrollel=null");var s=new Parameter({type:"STRING",name:"keyInput",id:"keyInput",placeholder:v.app.localization.e("confirmkey"),autoSearch:function(e,n,i){if(0==c.mnemonicKey.indexOf(e)&&(console.log("v[v.length - 1]",e[e.length-1])," "!=e[e.length-1])){var t=e.split(" "),o=t.length-1;t[o];i(_.filter(c.mnemonicContent,function(e,n){if(n<=o)return!0}).join(" "))}}}),r={validation:function(){return trim(s.value)!=c.mnemonicKey?(a.c.find(".note").html(v.app.localization.e("keysnotmatch")),a.c.addClass("error"),!1):(a.c.removeClass("error"),a.c.find(".note").html(""),!0)},registration:function(){r.validation()&&v.user.signin(c.mnemonicKey,function(e){if(!e)return a.c.find.note.html(v.app.localization.e("id98")),void a.c.addClass("error");c.end=!0,p.confirm(function(){p.success(function(){setTimeout(function(){if("_this"==deep(i,"successHref"))if(v.app.user.validate()){var e=deep(t,"container.close");e&&e(),i.signInClbk&&i.signInClbk()}else v.nav.api.loadSameThis("filluser",n);else v.app.reload({href:i.successHref||"filluser",nav:i.nav})},2e3)})})})},generate:function(){a.c.removeClass("begin"),c.mnemonicKey=bitcoin.bip39.generateMnemonic(),c.mnemonicMask=_.shuffle(indexArray(c.mnemonicKey.length)),c.mnemonicContent=c.mnemonicKey.split(" ");var e=v.app.user.keysFromMnemo(c.mnemonicKey);c.mainAddress=app.platform.sdk.address.pnet(e.publicKey).address,p.key()},repeat:function(){c.last=!1,p.confirm(function(){p.tips(function(){setTimeout(function(){a.c.removeClass("last"),setTimeout(function(){r.generate()},300)},300)})})},continue:function(){var e=a.c.find(".mnemonicKey");a.c.find(".keyStep").removeClass("showedPanel"),p.mnemonicEffect(e,!0,function(){c.last=!0,p.key(function(){setTimeout(function(){p.tips(),a.c.addClass("last"),setTimeout(function(){p.confirm()},300)},300)})})},removeDisabled:function(e){e.find(".continue").removeClass("disabled"),e.find(".preloader").remove(),e.find(".save").addClass("black"),e.find(".copy").addClass("black")}},f=function(){r.registration()},u=function(){r.generate()},d=function(){$(this).hasClass("disabled")||r.continue()},m=function(){r.repeat()},p={step:function(e,n){v.shell({name:e,el:a.c.find("."+e+"Step"),data:c,animation:{id:"slide"}},function(e){n&&n(e)})},success:function(n){p.step("success",function(e){n&&n()})},tips:function(n){p.step("tips",function(e){e.el.find(".generate").on("click",u),n&&n()})},confirm:function(e){s.value="",c.keyInput=s,p.step("confirm",function(n){n.el.find(".repeat").on("click",m),n.el.find(".registrationButton").on("click",f),e?e():(ParametersLive([s],n.el),_scrollTo(n.el,l),initUpload({el:n.el.find(".uploadFile"),ext:["txt","png"],dropZone:a.c.find(".confirm"),action:function(e,n){if("png"==e.ext)grayscaleImage(e.base64,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?a.c.find(".note").html(v.app.localization.e("filedamaged")):(s.value=trim(e),s.el.val(s.value),r.registration())},qrscanner.q.decode(e)});else{var i=e.base64.split(",")[1],t=b64_to_utf8(i).split("/");t[1]?(s.value=trim(t[1]),s.el.val(s.value),r.registration()):a.c.find(".note").html(v.app.localization.e("filedamaged"))}}}),setTimeout(function(){n.el.find("input").bind("paste",function(e){n.el.find(".note").html(v.app.localization.e("removepaste")),e.preventDefault()}),n.el.find("input").on("focus",function(){n.el.find(".inputTable").addClass("typeactive")}),n.el.find("input").on("blur",function(){n.el.find(".inputTable").removeClass("typeactive")}),isMobile()||n.el.find(".autosearchInputCnt input").focus()},600))})},qrcode:function(e,n){console.log(n);new QRCode(e[0],{text:n,width:256,height:256})},key:function(o){p.step("key",function(n){var e=n.el.find(".mnemonicKey"),i=a.c.find(".keyStep");i.removeClass("showedPanel");var t=n.el.find(".hiddenMnemonicKey").html();t&&p.qrcode(n.el.find(".qrcode"),trim(t)),p.mnemonicEffect(e,!1,function(){i.addClass("showedPanel")}),n.el.find(".continue").on("click",d),setTimeout(function(){r.removeDisabled(n.el)},1e4),v.app.platform.clbks._focus.registration=function(){r.removeDisabled(n.el)},n.el.find(".copy").on("click",function(){copyText(n.el.find(".hiddenMnemonicKey")),sitemessage(v.app.localization.e("successfullycopied")),r.removeDisabled(n.el)}),n.el.find(".save").on("click",function(){var e=n.el.find(".qrcode img").attr("src");saveAs({file:e,format:"png",name:"pocketnetkey"})}),o?o():_scrollTo(n.el,l)})},mnemonicEffect:function(i,e,n){var t=indexArray(101);e&&t.reverse();var o=i.height();i.css("min-height",o+"px"),lazyEach({array:t,sync:!0,action:function(e){var n=e.item;i.html(p.mnemonic(n)),o=i.height(),i.css("min-height",o+"px"),setTimeout(e.success,rand(1,5))},all:{success:function(){i.css("min-height","0px"),n&&n()}}})},mnemonic:function(e){var t="",o=(c.mnemonicMask.length*e/100).toFixed(0);return _.each(c.mnemonicKey,function(e,n){var i=_.indexOf(c.mnemonicMask,n);t+=i<o||" "==e?e:v.app.platform.values.alph[rand(0,v.app.platform.values.alph.length-1)]}),t}};return{primary:o,getdata:function(e,n){if(n.state&&o)v.nav.api.load({open:!0,id:"index",history:!0});else{c={last:!1,end:!1};e({})}},destroy:function(){delete v.app.platform.clbks._focus.registration,a={}},init:function(e){var n;(a={}).c=e.el.find("#"+v.map.id),a.registrationButton=a.c.find(".registrationButton"),a.toAuthorization=a.c.find(".toAuthorization"),a.login=a.c.find(".loginValue"),a.ler=a.c.find(".ler"),a.key=a.c.find(".key"),i=e.essenseData||{},t=e,(l=a.c.closest(".wndcontent")).length||(l=null),p.tips(),n=e,a.toAuthorization.on("click",function(){v.nav.api.loadSameThis("authorization",n)}),e.clbk(null,e)},wnd:{class:"withoutButtons allscreen"}}};return v.run=function(e){var n=v.addEssense(i,t,e);v.init(n,e)},v.stop=function(){_.each(i,function(e){e.destroy()})},v}();"undefined"!=typeof module?module.exports=registration:(app.modules.registration={},app.modules.registration.module=registration);
 /*_____*/ 
var anothersite=function(){var i=new nModule,t={},o=function(n){var e=deep(n,"history"),t=function(){};return{primary:e,getdata:function(n,e){n({link:e.settings.essenseData.link})},destroy:function(){({})},init:function(n){t(),{}.c=n.el.find("#"+i.map.id),n.clbk(null,n)},wnd:{header:"Another site",class:"transparent small anothersite"}}};return i.run=function(n){var e=i.addEssense(t,o,n);i.init(e,n)},i.stop=function(){_.each(t,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=anothersite:(app.modules.anothersite={},app.modules.anothersite.module=anothersite);
 /*_____*/ 
var token=function(){var a=new nModule,n={},o=function(e){var t=deep(e,"history"),o=function(){var e=parameters().token||null;return{type:parameters().type||null,token:e}};return{primary:t,getdata:function(t){var n=o();if("activate"!=n.type)a.app.platform.ws.addBlock();else{var e=a.app.platform.ws.messages.CUSTOMER.ACTIVE;delete e.clbks.successDialog,e.clbks.success=function(){var e=deep(a,"app.modules.menu.module");e&&e.restart()}}a.app.platform.sdk.tokens.check(n.token,function(e){n.result=e,t(n)})},destroy:function(){a.app.platform.ws.removeBlock(),{}},init:function(e){o(),{}.c=e.el.find("#"+a.map.id),e.clbk(null,e)}}};return a.run=function(e){var t=a.addEssense(n,o,e);a.init(t,e)},a.stop=function(){_.each(n,function(e){e.destroy()})},a}();"undefined"!=typeof module?module.exports=token:(app.modules.token={},app.modules.token.module=token);
 /*_____*/ 
var filluser=function(){var m=new nModule,t={},i=function(e){var a,o,i,n,t=deep(e,"history"),s=null,l={money:{id:"money",prev:function(n){m.app.platform.sdk.ustate.me(function(e){e?m.sdk.users.requestFreeMoney(function(e){e?(m.app.platform.sdk.node.transactions.clbks.filluser=function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&0==r&&f.next()})},n()):m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e?f.next():f.to(4)})}):f.to(3)})},ret:!1,render:"money",after:function(n,t,e){f.timer(n.find(".time"),e||59,function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0!=r&&4!=r||(1<e?f.to(1):(n.find(".subcaption").html(m.app.localization.e("wesentmoneydelay")),l.money.after(n,t,30)))},!0)})}},settings:{id:"settings",prev:function(n){m.app.platform.sdk.ustate.me(function(e){e?n():f.to(3)})},render:"settings",after:function(e,n){},next:!0},welcome:{id:"welcome",prev:function(e){e()},render:"welcome",after:function(e){e.find(".welcome").on("click",function(){if("_this"==deep(i,"successHref")){var e=deep(n,"container.close");e&&e(),i.signInClbk&&i.signInClbk()}else m.nav.api.go({href:"index",history:!0,open:!0})})}},network:{id:"network",prev:function(e){e()},render:"network",after:function(e){console.log("AFTER"),n&&clearInterval(n);var n=setInterval(function(){m.app.platform.sdk.ustate.me(function(e){e&&(clearInterval(n),f.to(0))})},2e3)}}};l.moneym={id:"moneym",prev:function(e){m.app.platform.sdk.node.transactions.clbks.filluserm=function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&4==r&&f.to(1)})},e()},ret:l.money.ret,render:"moneym",after:l.money.after};var r=-1,c=["money","settings","welcome","network","moneym"],f={to:function(e,n){r=e,f.makeStep(n)},next:function(e){r++,f.makeStep(e)},makeStep:function(e){var t=l[c[r]];t&&t.prev(function(){a.c.attr("step",t.id),d.panel(t,function(n){d.step(t,function(e){_scrollTo(e,s),n.find(".elpanel").addClass("active"),t.after(e,n)})})})},timer:function(i,o,e){var a=new CircularProgress({radius:120,strokeStyle:"#ff1975",lineCap:"round",lineWidth:1,font:"100 56px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#5D5D5D",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});i.find(".circle").html(a.el);var n=function(e){var n=secInTime(e/1e3).split(":");i.find(".t .min").html(n[0]),i.find(".t .sec").html(n[1]),a.options.text={value:""};var t=100*(1-e/(1e3*o));t<0&&(t=0),a.update(t)};timer=new Timer({ontick:function(){n(timer.getDuration())},onend:function(){e&&e()}}),timer.start(o),n(timer.getDuration())}},p=function(){if(!(r<0)){var e=l[c[r]],n=a.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),t=a.c.find(".stepsWrapperLine"),i=n.closest(".stepsWrapper").width();a.c.find(".step").width(i),t.css("margin-left","-"+r*i+"px"),t.width(i*c.length)}},d={step:function(e,t){a.c.find(".step").removeClass("active");var n=a.c.find('.step[step="'+e.id+'"] .stepBody'),i=n.closest(".step"),o=a.c.find(".stepsWrapperLine");d[e.render](n,function(e){var n=i.closest(".stepsWrapper").width();a.c.find(".step").width(n),o.css("margin-left","-"+r*n+"px"),o.width(n*c.length),i.closest(".step").addClass("active"),t&&t(e)})},panel:function(e,n){m.shell({name:"panel",el:a.panel,data:{step:e}},function(e){n&&n(e.el)})},welcome:function(e,n){m.shell({name:"welcome",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){m.shell({name:"network",el:e,data:{}},function(e){n&&n(e.el)})},money:function(e,n){m.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},moneym:function(e,n){m.shell({name:"moneym",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,i,e){m.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:a.panel,success:function(){f.next()}},clbk:function(e,n){o=n,i&&i(t)}})}},u=function(){};return{primary:t,getdata:function(e,n){i=n.settings.essenseData||{},r=-1;var t={steps:l};m.app.user.validate()?m.app.nav.api.load({open:!0,href:"index"}):e(t)},destroy:function(){window.removeEventListener("resize",p),o&&o.destroy(),o=null,a={}},init:function(e){u(),(a={}).c=e.el.find("#"+m.map.id),a.panel=a.c.find(".panelWrapper"),window.addEventListener("resize",p),n=e,f.next(),(s=a.c.closest(".wndcontent")).length||(s=null),e.clbk(null,e)}}};return m.run=function(e){var n=m.addEssense(t,i,e);m.init(n,e)},m.stop=function(){_.each(t,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=filluser:(app.modules.filluser={},app.modules.filluser.module=filluser);
 /*_____*/ 
var usersettings=function(){var u=new nModule,t={},o=function(n){var e,t,o=deep(n,"history"),s=function(){u.shell({name:"options",el:e.options,data:{composed:t.c}},function(n){ParametersLive(t.o,n.el)})},i=function(){};return{primary:o,getdata:function(n){t=u.app.platform.sdk.usersettings.compose();n({})},destroy:function(){e={}},init:function(n){i(),(e={}).c=n.el.find("#"+u.map.id),e.options=e.c.find(".options"),s(),n.clbk(null,n)}}};return u.run=function(n){var e=u.addEssense(t,o,n);u.init(e,n)},u.stop=function(){_.each(t,function(n){n.destroy()})},u}();"undefined"!=typeof module?module.exports=usersettings:(app.modules.usersettings={},app.modules.usersettings.module=usersettings);
 /*_____*/ 
var test = (function(){

	var self = new nModule();

	var mdl = self;

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, lastTransaction, ed; 

		var tempInfo = {
			language : self.app.localization.key || 'en'
		}

		var changedLoc = false;

		var actions = {		

			valid : function(v1, v2){
				if(!actions.equal(v1, v2)){

					if(v1.name && v1.image) return true

				}
			},

			equal : function(v1, v2){

				var a = function(o){
					return 'name:' + (o.name || "") + 'image:' + (o.image || "") + 'about:' + (o.about || "") + 'site:' + (o.site || "")  + 'language:' + (o.language || "") + "addresses:" + JSON.stringify(o.addresses || [])
				}

				return a(v1) == a(v2)
			},
			cancel : function(){
				actions.userOptions()

				actions.upanel();

				renders.icon();

				renders.options();
			},
			save : function(clbk){

				if(actions.equal(tempInfo, self.app.platform.sdk.user.storage.me)){
					sitemessage(self.app.localization.e('uchanges'))

					return
				}

				if(!actions.valid(tempInfo, self.app.platform.sdk.user.storage.me)){
					sitemessage(self.app.localization.e('uchangesvalid'))

					return
				}

				var userInfo = new UserInfo();

					userInfo.name.set(tempInfo.name);
					userInfo.language.set(tempInfo.language);
					userInfo.about.set(tempInfo.about);
					userInfo.site.set(tempInfo.site);
					userInfo.image.set(tempInfo.image);
					userInfo.addresses.set(tempInfo.addresses);

				topPreloader(40)

				el.c.find('.userPanel').addClass('loading')

				userInfo.uploadImage(function(){


					self.sdk.node.transactions.create.commonFromUnspent(

						userInfo,

						function(tx, error){

							el.c.find('.userPanel').removeClass('loading')

							topPreloader(100)

							if(!tx){

								self.app.platform.errorHandler(error, true)	
							}
							else
							{

								self.app.platform.sdk.user.storage.me = tx
								
								tempInfo = _.clone(self.app.platform.sdk.user.storage.me)
								
								actions.upanel()

								self.app.reloadModules(function(){


									if (primary){

										self.nav.api.go({
											href : 'index',
											history : true,
											open : true
										})	

									}
									else
									{

										if (ed.success){
											ed.success()
										}
										else
										{
											if (clbk)
												clbk()
										}

										

									}

									

								})

								
							}

						},

						/*{
							pseudo : true
						}*/
					
					)
				})
				
		
			},
			upload	: function(file, clbk){

				topPreloader(20);

				var images = [{
					original : file.base64,
					index : 0
				}]

				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,

					essenseData : {
						edit : true,
						initialValue : 0,
						images : images,

						apply : true,

						crop : {
							aspectRatio : 1 / 1,
							style : 'round apply',
							autoCropArea : 0.9,
						},

						success : function(i, editclbk){

							images[0].original

							resize(images[0].original, 100, 100, function(resized){
								var r = resized.split(',');

								editclbk();

								if (r[1]){

									tempInfo.image = resized;

									renders.icon()

									actions.upanel()

									

								}
								else
								{
									topPreloader(100);
								}
							})

						}
					}
				})


				
			},
			upanel : function(){

				if(_.toArray((self.app.platform.sdk.node.transactions.temp.userInfo || {})).length > 0){

					el.upanel.addClass('wait')

				}
				else{
					el.upanel.removeClass('wait')

					if(actions.equal(tempInfo, self.app.platform.sdk.user.storage.me) || !actions.valid(tempInfo, self.app.platform.sdk.user.storage.me)){
						
						el.upanel.removeClass('changes')
					}
					else
					{
						el.upanel.addClass('changes')
					}
				}

				
				
			},

			clear : function(){
				actions.userOptions();
				renders.caption();
			},

			userOptions : function(){
				tempInfo = _.clone(self.app.platform.sdk.user.storage.me)

				_.each(userOptions, function(parameter, id){
					var value = self.app.platform.sdk.user.storage.me[parameter.id];
					
					parameter.value = value || parameter.defaultValue || ''
				

					parameter._onChange = function(value){
						tempInfo[parameter.id] = value;

						actions.upanel()

						if (id == 'language'){
							var a = self.app.localization.available[value];

							if (a && a.key != self.app.localization.key)
							{
								self.app.localization.lightSet(a.key);
							}
						}
					}
				})
			},

			signout : function(){
				self.app.user.signout();

				self.app.reload({
					href : 'authorization'
				});
			}
		}

		var userOptions = {
			name : new Parameter({
				name : self.app.localization.e('uname'),
				id : 'name',
				type : "STRING",
				onType : true
			}),

			language : new Parameter({
				name : self.app.localization.e('ulanguage'),
				id : 'language',
				type : "VALUES",
				defaultValue : self.app.localization.key || 'en',
				possibleValues : ['en', 'ru'],
				possibleValuesLabels : ['English', 'Русский'],
			}),

			about : new Parameter({
				name : self.app.localization.e('uabout'),
				id : 'about',
				type : "TEXT",
				onType : true
			}),

			site : new Parameter({
				name : self.app.localization.e('uwebsite'),
				id : 'site',
				type : "STRING",
				onType : true,
				value : ''
			}),

			addresses : new function(){

				var _self = this;

				_self.id = 'addresses';
				_self.name = self.app.localization.e('uaddresesd')
				_self.value = [];

				_self.defaultValue = [];

				_self.remove = function(currency, address){
					removeEqual(_self.value, {
						currency : currency,
						address : address
					})

					if (_self._onChange)
						_self._onChange(_self.value)

					_self.addedAddresses();
				}

				_self.add = function(v){


					_self.value.push(v)

					if (_self._onChange)
						_self._onChange(_self.value)

					_self.addedAddresses();

				}

				_self.addDialog = function(){

					var validate = function(cur, address){

						if(address.length > 0){
							return true
						}
						else
						{
							return false
						}

						
					}

					mdl.fastTemplate('addaddress', function(rendered){

						dialog({
							html : rendered,

							wrap : true,

							success : function(d){

								var currency = d.el.find('.currency').val();
								var address = d.el.find('.address').val();

								if(validate(currency, address)){


									_self.add({
										currency : currency,
										address : address
									})

									return true;

								}
							},

							clbk : function(_el){

								var currency = _el.find('.currency');
								var address = _el.find('.address');
								var b = _el.find('.btn1');


								var vl = function(){
									var c = currency.val();
									var a = address.val();

									if(validate(c, a)){
										b.removeClass('disabled')

										return true;
									}
									else
									{
										b.addClass('disabled')
										return false;
									}
								}

								address.focus()
								address.on('change', vl)
								address.on('keyup', vl)

								currency.on('change', vl)
								currency.on('keyup', vl)

								vl()
							},

							class : "one addaddressDialog"
						})

					}, {
					})
				}

				_self.removeEvent = function(){
					var currency = $(this).closest('.addedAddress').attr('currency')
					var address = $(this).closest('.addedAddress').attr('address')

					_self.remove(currency, address)
				}

				_self.addedAddresses = function(){

					/* 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX */

					var h = '';

					_.each(_self.value, function(v){
					
						if(!v || !v.currency) return

						h += '<div class="addedAddressWrapper">'
							h += '<div class="addedAddress table" currency="'+v.currency+'" address="'+v.address+'">'

							h += 	'<div class="currencyWrapper">'	
							h += 		v.currency.toUpperCase()
							h += 	'</div>'

							h += 	'<div class="addressWrapper">'	
							h += 		v.address
							h += 	'</div>'

							h += 	'<div class="panelWrapper">'	
							h += 		'<div class="item remove">'	
							h += 			'<i class="far fa-times-circle"></i>'	
							h += 		'</div>'
							h += 	'</div>'

							h += '</div>'
						h += '</div>'
					})
					
					_self.el.find('.addedAddressesWrapper').html(h)

					_self.el.find('.addedAddressesWrapper .remove').on('click', _self.removeEvent)
				}



				_self.init = function(_el){

					_self.defaultValue = [];

					_self.el = _el.find('.adressesInput')

					_self.addedAddresses();

					_self.el.find('.addaddress').on('click', _self.addDialog)
				}	

				_self.input = function(){
					var h = ''

					h += '<div class="adressesInput">'
					h += 	'<div class="addaddressWrapper">'
					h += 		'<div class="addaddress">'
					h += 			'<i class="fas fa-plus"></i>'
					h += 		'</div>'
					h += 	'</div>'
					h += 	'<div class="addedAddressesWrapper">'
					h += 	'</div>'
					h += '</div>'

					return h;
				}

				return _self
			}

			/*birthday : new Parameter({
				name : "Date of Birthday",
				id : 'birthday',
				type : "DATE"
			}), */

			
		}

		var privateInformation = {
			/*sex : new Parameter({
				name : "Sex",
				id : 'sex',
				type : "VALUES",
				defaultValue : 'notspecified',
				possibleValues : ['men', 'woman', 'notspecified'],
				possibleValuesLabels : ['Not Specified', 'Man', 'Woman'],
			})*/
		}

		var events = {
			signout : function(){
				actions.signout()
			},
			save : function(){
				actions.save()
			},
			cancel : function(){
				actions.cancel()
			},
			importAddress : function(){

				var address = self.app.platform.sdk.address.pnet()
				
				topPreloader(30);

				self.app.platform.sdk.node.account.import(address.address, function(){

					topPreloader(100);

					sitemessage("Address " + address.address + " was successfully imported")

				})
			}
		}

		var setNode = null;
		var setAddressType = null;

		var renders = {
			options : function(clbk){

				self.shell({

					name :  'options',
					el :   el.options,
					data : {
						tempInfo : tempInfo,
						userOptions : userOptions
					},

				}, function(_p){

					ParametersLive(_.toArray(userOptions), _p.el)

					userOptions.addresses.init(_p.el)

					if (clbk)
						clbk();

				})
			},
			icon : function(clbk){
				self.shell({

					name :  'icon',
					el :   el.icon,
					data : {
						tempInfo : tempInfo
					},

				}, function(_p){

					initUpload({
						el : _p.el.find('.uploadPhoto'),
			
						ext : ['png', 'jpeg', 'jpg'],

						dropZone : el.c,

						multiple : false,

						action : function(file, clbk){

							actions.upload(file, function(){								

								if (clbk)
									clbk();

							})
							
						}
					})

					if (clbk)
						clbk();

				})
			},
			unspent : function(unspent, unspentOld, clbk){
				self.shell({

					name :  'unspent',
					el :   el.unspent,
					data : {
						unspent : unspent,
						unspentOld : unspentOld
					},

				}, function(_p){

					if (clbk)
						clbk();

				})
			},

			caption : function(unspent, clbk){

				return

				self.shell({

					name :  'caption',
					el :   el.caption,
					data : {
						p2pkh : self.app.platform.sdk.address.pnet(),
						tempInfo : tempInfo
					},

				}, function(_p){					

					if (clbk)
						clbk();

				})
			},

			address : function(){
				el.c.find('.adr').html(bitcoin.payments[self.app.platform.addressType]({ pubkey: self.app.user.key.value}))
			}
			
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.import.on('click', events.importAddress)
			el.showhidetestpanel.on('click', function(){
				$(this).closest('.testPanel').toggleClass('active')
			})

			el.upanel.find('.cancel').on('click', events.cancel)
			el.upanel.find('.save').on('click', events.save)

			ParametersLive([setNode, setAddressType], el.c)			

			el.signout.on('click', events.signout)

			
		}

		var make = function(){

			renders.caption()

			renders.icon();

			renders.options();

			self.sdk.node.transactions.get.unspent(function(unspent){
				self.sdk.node.transactions.get._unspent(function(unspentOld){
					renders.unspent(unspent, unspentOld)
				})
			})
		}

		var prepare = function(){

			var pv = _.map(self.app.platform.nodes, function(n, i){
				return i.toString()
			})

			var pvl = _.map(self.app.platform.nodes, function(n, i){
				return n.full
			})

			setNode = new Parameter({
				type : "VALUES",
				name : "setNode",
				id : 'setNode',
				possibleValues : pv,
				possibleValuesLabels : pvl,
				defaultValue : "1",
			}),

			setNode.value = self.app.platform.nodeid

			setNode._onChange = function(value){
				self.app.platform.nodeid = value;

				self.app.platform.state.save()
			}

			setAddressType = new Parameter({
				type : "VALUES",
				name : "setAddressType",
				id : 'setAddressType',
				possibleValues : self.app.platform.addressTypes,
				possibleValuesLabels : ['P2PKH', 'P2SH'/*, 'P2WPKH'*/],

				defaultValue : "p2sh"
			}),

			setAddressType.value = self.app.platform.addressType
			

			setAddressType._onChange = function(value){

				self.app.platform.addressType = value;

				self.app.platform.state.save()

				self.user.address.set(self.app.platform.sdk.address.pnet().address)

				self.app.reload();

			}

			actions.userOptions()

		}

		var freeMoney = function(){			

			self.app.platform.sdk.users.checkFreeMoney(self.app.platform.sdk.address.pnet().address, function(res){
				
			})
		}

		
		return {
			primary : primary,

			getdata : function(clbk, p){

				changedLoc = true;

				ed = p.settings.essenseData;

				self.app.platform.sdk.user.get(function(){

					prepare();

					var data = {};

						data.p2pkh = self.app.platform.sdk.address.pnet()

						data.setNode = setNode;
						data.setAddressType = setAddressType;
						data.userOptions = userOptions;
						data.tempInfo = tempInfo

					clbk(data);

				})

			},

			destroy : function(){
				el = {};

				if(self.app.platform.sdk.user.storage.me && !actions.equal(tempInfo, self.app.platform.sdk.user.storage.me)){
					
					return function(clbk){


						/*var locF = function(){

							if(changedLoc){
								self.app.reloadModules(clbk)
							}
							else
							{
								clbk()
							}

						}*/

						dialog({
							html : self.app.localization.e('usavechanges'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
							success : function(){
								actions.save(clbk)
							},

							fail : function(){

								tempInfo = _.clone(self.app.platform.sdk.user.storage.me)
								
								clbk()
							}
						})

					}

				}

				return null;
			},
			
			init : function(p){

			
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.transaction = p.el.find('.transactionInfo');
				el.unspent = p.el.find('.unspentlist');
				el.showhidetestpanel = p.el.find('.showhidetestpanel')
				el.import = p.el.find('.import');
				el.caption = el.c.find('.bgCaption');
				el.icon = el.c.find('.iconParameters');

				el.usericon = el.c.find('.usericon');
				el.options = el.c.find('.optionsParameters');
				el.upanel = ed.panel || el.c.find('.upanel');

				el.signout = el.c.find('.signout')

				initEvents();

				actions.upanel();

				make();

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		var s = null

		_.each(essenses, function(essense){

			var d = essense.destroy();

			if (d){
				s = d;
			}

		})

		if(!s) return;

		return {
			action : s
		};

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = test;
}
else{

	app.modules.test = {};
	app.modules.test.module = test;

}
 /*_____*/ 
var accounts=function(){var u=new nModule,n={},e=function(a){var e,d,o,s=deep(a,"history"),n=function(o){u.app.platform.sdk.pool.expand(d,function(a){var s=_.indexOf(a.addresses,o);if(-1<s){var n=a.private[s],e=u.app.user.stay;u.app.user.signout(),u.app.user.stay=e,u.user.signin(n,function(a){u.app.reloadLight(function(){var a="userpage?id=accounts&s="+makeid();u.app.user.validate()||(a="filluser"),u.app.nav.api.load({open:!0,href:a})})})}})},p=function(a){u.app.platform.sdk.pool.remove(d,a),u.app.platform.sdk.pool.save(),c.addresses()},t=function(){u.app.nav.api.load({open:!0,id:"addaccount",inWnd:!0,essenseData:{success:function(s){u.app.platform.sdk.pool.expand(d,function(a){u.app.platform.sdk.pool.add(a,s,function(a,s){s?dialog({html:u.app.localization.e("aused"),class:"one"}):u.app.platform.sdk.pool.export(a,function(a){u.app.platform.sdk.pool.current.packs[o]=a,u.app.platform.sdk.pool.save(),d=a,c.addresses()})})})}}})},r=function(){var a=$(this).closest(".addressTable").attr("address");p(a)},i=function(){var a=$(this).closest(".addressTable").attr("address");n(a)},c={addresses:function(s){u.shell({name:"addresses",el:e.addresses,data:{current:u.app.platform.sdk.address.pnet().address,pack:d},animation:"fadeIn"},function(a){a.el.find(".remove").on("click",r),a.el.find(".ncurrent .label").on("click",i),s&&s()})}},l=function(){};return{primary:s,getdata:function(a){o=d=null;a({})},destroy:function(){e={}},init:function(a){var s,n;l(),(e={}).c=a.el.find("#"+u.map.id),e.addresses=e.c.find(".addresses"),e.c.find(".add").on("click",t),s=u.app.platform.sdk.address.pnet().address,(n=u.app.platform.sdk.pool.getPack(s))?(d=n[0],o=n[1],u.app.platform.sdk.pool.info(d,function(){c.addresses()})):sitemessage("ERROR"),a.clbk(null,a)}}};return u.run=function(a){var s=u.addEssense(n,e,a);u.init(s,a)},u.stop=function(){_.each(n,function(a){a.destroy()})},u}();"undefined"!=typeof module?module.exports=accounts:(app.modules.accounts={},app.modules.accounts.module=accounts);
 /*_____*/ 
var articles=function(){var f=new nModule,n={},e=function(t){var a,n=deep(t,"history"),e=function(){f.nav.api.load({open:!0,id:"article",inWnd:!0,essenseData:{save:function(a){_.find(f.app.platform.sdk.articles.storage,function(t){if(a.id==t.id)return!0})||f.app.platform.sdk.articles.storage.unshift(a),f.app.platform.sdk.articles.save()},close:function(){l.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},i=function(t){f.nav.api.load({open:!0,id:"article",inWnd:!0,essenseData:{art:t,save:function(t){f.app.platform.sdk.articles.save()},close:function(){l.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},o=function(t){removeEqual(f.app.platform.sdk.articles.storage,{id:t}),a.c.find('.art[art="'+t+'"]').remove(),f.app.platform.sdk.articles.save(),l.ini()},c=function(){var t=$(this).closest(".art").attr("art");dialog({html:"Do You really want to remove this article?",btn1text:f.app.localization.e("dyes"),btn2text:f.app.localization.e("dno"),class:"zindex",success:function(){o(t)}})},r=function(){e()},s=function(){var a=$(this).closest(".art").attr("art"),t=_.find(f.app.platform.sdk.articles.storage,function(t){return t.id==a});i(t)},l={ini:function(){f.app.platform.sdk.articles.storage.length?a.c.removeClass("initial"):a.c.addClass("initial")},articles:function(){l.ini(),f.shell({name:"articles",el:a.articles.find(".artwrapper"),data:{articles:f.app.platform.sdk.articles.storage}},function(t){t.el.find(".artcnt").on("click",s),t.el.find(".remove").on("click",c)})}},d=function(){};return{primary:n,getdata:function(t){t({})},destroy:function(){a={}},init:function(t){d(),(a={}).c=t.el.find("#"+f.map.id),a.articles=a.c.find(".articles"),a.add=a.c.find(".add"),a.add.on("click",r),l.articles(),t.clbk(null,t)},wnd:{class:"allscreen a100 article "}}};return f.run=function(t){var a=f.addEssense(n,e,t);f.init(a,t)},f.stop=function(){_.each(n,function(t){t.destroy()})},f}();"undefined"!=typeof module?module.exports=articles:(app.modules.articles={},app.modules.articles.module=articles);
 /*_____*/ 
var article=function(){var u=new nModule,t={},n=function(a){var i,o,t,n,e,s=deep(a,"history"),c=/[,.!?;:() \n\r]/g,l={message:u.app.localization.e("emptymessage")},r={newart:function(){return u.app.platform.sdk.articles.empty()},complete:function(){t.save&&t.save(o),d.close(),t.complete&&t.complete(o)},change:function(e){o.content=e,o.time=Math.floor((new Date).getTime()/1e3),t.save&&t.save(o)},changecaption:function(e){o.caption.value=e,o.time=Math.floor((new Date).getTime()/1e3),t.save&&t.save(o)},trx:function(e){i.c.addClass("loading"),u.sdk.node.transactions.create.commonFromUnspent(e,function(e,a){if(topPreloader(100),i.c.removeClass("loading"),e)try{var t=new pShare;t._import(e,!0),t.temp=!0,t.address=e.address,u.app.platform.sdk.node.shares.add(t),o.txid=t.txid,o.ptime=Math.floor((new Date).getTime()/1e3),r.complete()}catch(e){console.log(e)}else if(clbk)clbk(!1,l[a]);else{var n=u.app.platform.errorHandler(a,!0);n&&sitemessage(n)}},a)},add:function(){var e=new Share,a=u.app.platform.sdk.articles.echo(o);e.message.set(a),e.caption.set(o.caption.value),e.images.set(o.images),e.tags.set(r.tagsFromText(a)),e.settings.v="a";var t=e.validation();t?l[t]&&sitemessage(l[t]):dialog({html:"Do you really want to publish this article?",btn1text:u.app.localization.e("dyes"),btn2text:u.app.localization.e("dno"),class:"zindex",success:function(){r.trx(e)}})},tagsFromText:function(e){var a=e.split(c),t=_.filter(a,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))});return _.each(t,function(e){e=e.replace(/\#/g,"")}),t}},d={changecaption:function(){var e=$(this).html();r.changecaption(e)},change:function(){e=slowMade(function(){r.change(n.serialize())},e,300)},close:function(){t.close&&t.close(),u.closeContainer()},add:function(){r.add()},goto:function(){o.txid&&(u.closeContainer(),t.closeContainer&&t.closeContainer(),u.nav.api.load({open:!0,href:"index?s="+o.txid,history:!0}))}},p=function(e,a){i.caption.html(e.caption.value)},f=function(){};return{primary:s,getdata:function(e,a){t=a.settings.essenseData||{},e({art:o=t.art||r.newart()})},destroy:function(){i={}},init:function(e){var a;f(),(i={}).c=e.el.find("#"+u.map.id),i.caption=i.c.find(".caption"),i.content=i.c.find(".content"),i.back=i.c.find(".back"),i.add=i.c.find(".add"),i.goto=i.c.find(".goto"),i.back.on("click",d.close),i.caption.on("keyup",d.changecaption),i.add.on("click",d.add),i.goto.on("click",d.goto),n=new MediumEditor(".edt",{delay:500,targetBlank:!0,toolbar:{buttons:["bold","italic","underline","anchor","quote"],diffLeft:25,diffTop:10},anchor:{placeholderText:"Type a link",customClassOption:"btn",customClassOptionText:"Create Button"},paste:{cleanPastedHTML:!0,cleanAttrs:["style","dir"],cleanTags:["label","meta"]},anchorPreview:{hideDelay:300},placeholder:{text:"Text",hideOnClick:!1}}),$(function(){$(".edt").mediumInsert({editor:n,addons:{images:{label:'<span class="fas fa-camera"></span>',fileDeleteOptions:{},preview:!0,captions:!0,captionPlaceholder:"Type caption for image (optional)",autoGrid:3,formData:{},upload:function(e,t){resize(e,1080,1080,function(e){var a=e.split(",");a[1]&&u.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:a[1]},success:function(e){var a=deep(e,"data.link");a&&o.images.push(a),console.log(o),t&&t(a)}})})},fileUploadOptions:{acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i},styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'},grid:{label:'<span class="fa fa-th"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}},messages:{acceptFileTypesError:"This file is not in a supported format: ",maxFileSizeError:"This file is too big: "},uploadCompleted:function(e,a){d.change()},uploadFailed:function(e,a){}},embeds:{label:'<span class="fab fa-youtube"></span>',placeholder:"Paste a YouTube, Vimeo link and press Enter",oembedProxy:"https://medium.iframe.ly/api/oembed?iframe=1",styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}}}}}),n.subscribe("editableKeyup",function(){d.change()}),n.subscribe("editablePaste",function(){d.change()}),n.subscribe("editableBlur",function(){d.change()}),p(o),a&&a()}),e.clbk(null,e)},wnd:{class:"allscreen a100 article articlebtn"}}};return u.run=function(e){var a=u.addEssense(t,n,e);u.init(a,e)},u.stop=function(){_.each(t,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=article:(app.modules.article={},app.modules.article.module=article);
 /*_____*/ 
var embeding20=function(){var f=new nModule,a={},i=function(e){var t,n=deep(e,"history"),i={},l="Max 6 Images Allowed",a=function(e,n){if(t.c){var a=t.c.find("."+e+"Part .partPreloader");n?a.fadeIn(200):a.fadeOut(200)}},u=function(e,n){var a={};5<i.images.value.length?sitemessage(l):(a.id=makeid(),a.src=e,i.images.value.push(a),c.images()),n&&n()},o=function(e,n){var a={};resize(e,1080,1080,function(e){if(e.split(",")[1]){5<i.images.value.length?sitemessage(l):(a.id=makeid(),a.base64=e,i.images.value.push(a),c.images())}n&&n()})},r=function(e){removeEqual(i.images.value,{id:e}),c.images()},s=function(){var e=$(this).closest(".imageContainer").attr("value");r(e)},c={url:function(n,a){var i=f.app.platform.parseUrl(n),l=f.app.platform.sdk.remote.storage[n];f.shell({name:"url",inner:html,el:t.url,data:{url:n,og:l,remove:!0},turi:"share"},function(e){if(n&&!l)if("youtube"==i.type||"vimeo"==i.type)Plyr.setup(".js-player");else f.app.platform.sdk.remote.get(i.url,function(e){e&&c.url(n)});a&&a()})},images:function(e,n){e||(e=i.images.value),e.length&&f.shell({name:"images",el:t.images,data:{images:e}},function(e){e.el.find(".remove").on("click",s),e.el.find(".image").each(function(){}),n&&n()})}},d=function(){};return{primary:n,getdata:function(e){(i={url:new Parameter({type:"URL",id:"url",placeholder:"Add link to external site",value:""}),images:{isValid:function(){return!0},value:[]}}).url._onChange=function(e){a("left",!0),checkUrlForImage(e)?u(e,function(){a("left",!1),i.url.value="",i.url.el.val("")}):c.url(e,function(){a("left",!1)})},i.images.value=[],i.url.value="",e({options:i})},destroy:function(){t={}},init:function(e){d(),(t={}).c=e.el.find("#"+f.map.id),t.upload=t.c.find(".upload"),t.images=t.c.find(".images"),t.error=t.c.find(".error"),t.url=t.c.find(".url"),ParametersLive([i.url],t.c),initUpload({el:t.upload,ext:["png","jpeg","jpg"],dropZone:t.c.closest(".wnd"),multiple:!0,action:function(e,n){o(e.base64,n)},onSuccess:function(){t.c.addClass("right"),t.c.removeClass("left")}}),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-times"></i> Close',fn:function(e,n){}}},close:function(){},success:function(e,n){wndObj=n,wnd=e},noInnerScroll:!0,class:"embeding20"}}};return f.run=function(e){var n=f.addEssense(a,i,e);f.init(n,e)},f.stop=function(){_.each(a,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=embeding20:(app.modules.embeding20={},app.modules.embeding20.module=embeding20);
 /*_____*/ 
var embeding=function(){var g=new nModule,a={},i=function(e){var s,i,n,a=deep(e,"history"),t=null,o={url:new Parameter({type:"URL",id:"url",placeholder:"Add link to external site",onType:!0}),images:{isValid:function(){return!0},value:[]}},l={url:"Url doesn't valid",imagesLength:"Max 6 Images Allowed"},u={check:function(e){if(o[e].isValid(o[e].value))return s.error.html(""),!0;s.error.html(l[e])},removeImage:function(e){removeEqual(o.images.value,{id:e}),r.images(),s.error.html("")},add:{url:function(){u.check("url")&&(i.added(o.url.value),g.closeContainer())},images:function(){if(u.check("images")){var n=[];_.each(o.images.value,function(e){e.base64&&n.push(e.base64)}),i.added(n),g.closeContainer()}}},slowUploadGif:function(e,n){e.id=makeid(),e.slow=!0,e.base64=e.base64,o.images.value.push(e),n&&n()},slowUpload:function(n,a){resize(n.base64,1080,1080,function(e){e.split(",")[1]&&(n.id=makeid(),n.slow=!0,n.base64=e,o.images.value.push(n)),a&&a()})},upload:function(a,i){resize(a.base64,1080,1080,function(e){var n=e.split(",");if(n[1]){5<o.images.value.length?s.error.html(l.imagesLength):(s.error.html(""),a.id=makeid(),a.loading=!0,o.images.value.push(a),r.images(),g.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:n[1]},success:function(e){a.loading=!1,a.src=deep(e,"data.link"),r.images(),i&&i()}}))}})}},c=function(){var e=$(this).attr("action")||t;u.add[e]()},d=function(){var e=$(this).closest(".imageContainer").attr("value");u.removeImage(e)},r={images:function(e,n){e||(e=o.images.value),e.length&&g.shell({name:"images",el:s.images,data:{images:e}},function(e){e.el.find(".remove").on("click",d),e.el.find(".image").each(function(){$(this)}),n&&n()})}},m=function(){};return{primary:a,getdata:function(e,a){t=a.settings.essenseData.type,i=a.settings.essenseData.on,n=a.settings.essenseData,a.settings.essenseData.subtype||null,a.settings.essenseData.storage&&_.each(o,function(e,n){e.value=a.settings.essenseData.storage[n],"images"==n&&(e.value=[])}),e({type:t,options:o})},destroy:function(){s={}},init:function(e){m(),(s={}).c=e.el.find("#"+g.map.id),s.error=s.c.find(".error"),s.action=s.c.find(".action"),s.upload=s.c.find(".upload"),s.images=s.c.find(".imagesMi"),function(){if(s.c.find("input").focus().on("change",c),s.action.on("click",c),"images"==t){if(r.images(),n.value){var e={base64:n.value};u.slowUpload(e)}initUpload({el:s.upload,ext:["png","jpeg","jpg","gif"],dropZone:s.c.closest(".wnd"),multiple:!0,action:function(e,n){console.log(e),"gif"==e.ext?u.slowUploadGif(e,n):u.slowUpload(e,n)},onSuccess:function(){u.add.images()}})}else ParametersLive([o[t]],s.c)}(),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-check"></i> Finish',fn:function(e,n){u.add[t]()}}},close:function(){},success:function(e,n){wndObj=n,wnd=e},offScroll:!0,noInnerScroll:!0,class:"embeding"}}};return g.run=function(e){var n=g.addEssense(a,i,e);g.init(n,e)},g.stop=function(){_.each(a,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=embeding:(app.modules.embeding={},app.modules.embeding.module=embeding);
 /*_____*/ 
var userpage=function(){var f=new nModule,t={},o=function(e){var i,n=deep(e,"history"),o=null,a=null,r=null,p=[],s={eachReport:function(r,e,n){e||(e=p);var i=function(e,o,a){o||(o=0),a||(a=""),_.each(e,function(e,n){var t=a;t&&(t+="_"),t+=e.id,e.reports?r.group(e,o,t,function(){i(e.reports,o+1,t)},n):r.report(e,o,t)})};i(e,0,n)},findReport:function(e){var a=function(e,n){var t=n.split("_");if(!t.length)return null;n=t[0];var o=_.find(e||[],function(e){return e.id==n});return o?(t.splice(0,1),(n=t.join("_"))&&o.reports?a(o.reports,n):o):null};return a(p,e)},mobileReports:function(){var a=[];return s.eachReport({group:function(e,n,t,o){e.mobile&&a.push(e),o()},report:function(e){e.mobile&&a.push(e)}}),a.push({name:f.app.localization.e("signout"),id:"signout"}),a},selector:function(){var e=s.mobileReports(),n=_.map(e,function(e){return e.id}),t=_.map(e,function(e){return e.text||e.name}),o=new Parameter({type:"VALUES",name:"Contents",id:"contents",possibleValues:n,possibleValuesLabels:t,defaultValue:n[0]});return o.value=parameters().id||"summary",o._onChange=function(e){if("signout"==e)c.signout();else{var n=s.findReport(e),t=parameters();t.report=n.report,t.id=n.id;var o="userpage"+collectParameters(t);f.nav.api.load({open:!0,href:o,history:!0})}},o}},c={closeGroup:function(e){var n=s.findReport(e);if(n){n.active=!n.active;var t=i.c.find('[levelid="'+e+'"]');n.active?t.addClass("active"):t.removeClass("active")}},openTree:function(r){s.eachReport({group:function(e,n,t,o){var a=i.c.find('[levelid="'+t+'"]');0==r.indexOf(t)?(e.active=!0,a.addClass("active"),o()):(e.active=!1,a.find(".openReport").removeClass("active"))},report:function(e,n,t){var o=i.c.find('[id="'+t+'"]');r==t?(e.active=!0,o.addClass("active")):(e.active=!1,o.removeClass("active"))}})},openReport:function(e,n){i.c.find(".openReport").removeClass("active"),i.c.find('[rid="'+e+'"]').addClass("active"),c.openTree(e),t.report(e),n&&f.nav.api.history.addParameters({id:e})},signout:function(){f.app.user.signout(),f.app.reload({href:"authorization"})}},l=function(){var e=$(this).closest("[levelid]").attr("levelid");c.closeGroup(e)},u=function(){var e=$(this).attr("rid");c.openReport(e,!0)},t={bgcaption:function(e){s.selector();i&&i.bgcaption&&f.shell({name:"bgcaption",el:i.bgcaption.find(".bgCaptionInner"),data:{}},function(e){})},contents:function(n){var t=s.selector();f.shell({name:"contents",el:i.contents,data:{reports:p,each:s.eachReport,selector:t}},function(e){e.el.find(".groupNamePanelWrapper").on("click",l),e.el.find(".openReport").on("click",u),ParametersLive([t],e.el),n&&n()})},report:function(e,t){o&&o.destroy();var n=s.findReport(e);f.shell({name:"report",el:i.report,data:{}},function(e){f.nav.api.load({open:!0,id:n.report,el:e.el.find(".reportCnt"),animation:!1,primary:!0,essenseData:{sub:n.sub},clbk:function(e,n){o=n,a&&a.apply(),t&&t()}})})}},d=function(){};f.authclbk=function(){t.bgcaption()};return{primary:n,getdata:function(n){(p=[]).push({name:f.app.localization.e("rstate"),id:"ustate",report:"ustate",mobile:!0,if:function(){if(r)return!0}}),p.push({name:f.app.localization.e("rwallet"),id:"wallet",report:"wallet",mobile:!0}),p.push({name:f.app.localization.e("rprofile"),id:"test",report:"test",mobile:!0}),p.push({name:f.app.localization.e("rsettings"),id:"usersettings",report:"usersettings",mobile:!0}),p.push({name:f.app.localization.e("raccounts"),id:"accounts",report:"accounts",mobile:!0});var t={};parameters();t.p2pkh=f.app.platform.sdk.address.pnet(),f.app.platform.sdk.ustate.me(function(e){r=e,n(t)})},destroy:function(){o&&o.destroy(),o=null,a&&a.destroy(),a=null,$("#menu").removeClass("abs"),i={}},init:function(e){d(),(i={}).c=e.el.find("#"+f.map.id),i.contents=i.c.find(".contents"),i.report=i.c.find(".report"),i.bgcaption=i.c.find(".bgCaption"),$("#menu").addClass("abs"),new Caption({container:i.c,caption:i.c.find(".captionfwrapper"),offset:[0,0]}).init(),i.c.on("click",".signout",function(){c.signout()}),function(e){t.bgcaption();var n=parameters().id||"ustate";t.contents(function(){c.openReport(n),e&&e()}),isMobile()||(a=new Roller({selector:".roller",inner:".cnt",cnt:i.c.find(".maketsWrapper"),offset:65}).init().apply())}(function(){e.clbk(null,e)})}}};return f.run=function(e){var n=f.addEssense(t,o,e);f.init(n,e)},f.stop=function(){_.each(t,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=userpage:(app.modules.userpage={},app.modules.userpage.module=userpage);
 /*_____*/ 
var wallet=function(){var k=new nModule,t={},s=function(e){var o,a=deep(e,"history"),n={},d={pnetwallet:{label:k.app.localization.e("tacaddress"),alabel:k.app.localization.e("tacaddress"),id:"pnetwallet",addresses:function(){return[k.app.platform.sdk.address.pnet().address]}},wallet:{label:k.app.localization.e("twallet"),id:"wallet",addresses:function(){return k.app.platform.sdk.addresses.storage.addresses||[]},caption:k.app.localization.e("twalletaddresses")},total:{label:k.app.localization.e("tTotal"),id:"total",addresses:function(){return[k.app.platform.sdk.address.pnet().address].concat(k.app.platform.sdk.addresses.storage.addresses||[])}}},l={parameters:{source:new Parameter({name:"Source",type:"VALUES",id:"source",defaultValue:"pnetwallet",possibleValuesLabels:[k.app.localization.e("twallet"),k.app.localization.e("tacaddress"),k.app.localization.e("tTotal")],possibleValues:["wallet","pnetwallet","total"],placeholder:k.app.localization.e("wsselect")}),reciever:new Parameter({name:k.app.localization.e("wsreciever"),type:"VALUESCUSTOM",id:"reciever",possibleValuesLabels:[],possibleValues:[],placeholder:k.app.localization.e("wsenter"),onType:!0}),amount:new Parameter({name:k.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:k.app.localization.e("wsamountof"),format:{Precision:6}}),fees:new Parameter({name:k.app.localization.e("wsincludefees"),type:"VALUES",id:"fees",defaultValue:"include",possibleValuesLabels:[k.app.localization.e("wsrecieverpay"),k.app.localization.e("wssenderpay")],possibleValues:["include","exclude"]})}},s={wallet:k.app.localization.e("twallet"),pnetwallet:k.app.localization.e("tacaddress")},r={active:!1,parameters:{deposit:new Parameter({name:k.app.localization.e("wrecieveon"),type:"VALUES",id:"deposit",defaultValue:"wallet",possibleValuesLabels:[k.app.localization.e("twallet"),k.app.localization.e("tacaddress")],possibleValues:["wallet","pnetwallet"],placeholder:k.app.localization.e("wdselectfrom")}),depositamount:new Parameter({name:k.app.localization.e("wdamount"),id:"depositamount",type:"NUMBER",placeholder:k.app.localization.e("wdenteramount"),onType:!0,format:{Precision:6}}),message:new Parameter({name:k.app.localization.e("wdmessage"),id:"message",type:"TEXT",placeholder:k.app.localization.e("wdmessageplaceholder"),onType:!0}),label:new Parameter({name:k.app.localization.e("wdlabel"),id:"label",type:"STRING",onType:!0})}},i=[],p=[],c=0,u={sendAddresses:function(){var e=l.parameters.source.value;return d[e].addresses()},canChangeSend:function(){if(l.parameters.reciever.value){var t=null;if(_.find(s,function(e,a){return t=a,l.parameters.reciever.value==e||l.parameters.reciever.value==a}))return t}return null},sendParameters:function(){var t=l.parameters.source.value;(l.parameters.reciever.possibleValues=[],l.parameters.reciever.possibleValuesLabels=[],_.each(s,function(e,a){a!=t&&"total"!=t&&(l.parameters.reciever.possibleValues.push(a),l.parameters.reciever.possibleValuesLabels.push(e))}),"total"==t)&&(_.find(s,function(e,a){return l.parameters.reciever.value==e||l.parameters.reciever.value==a})&&(l.parameters.reciever.value=""));l.parameters.reciever.value!=t&&l.parameters.reciever.value!=s[t]||(l.parameters.reciever.value=l.parameters.reciever.possibleValuesLabels[0]),l.parameters.reciever.possibleValues.length?l.parameters.reciever.placeholder=k.app.localization.e("wrenteraddressselect"):l.parameters.reciever.placeholder=k.app.localization.e("wrenteraddress");var e=u.sendAddresses();k.app.platform.sdk.node.transactions.get.balance(function(e){l.parameters.amount.value>e&&(l.parameters.amount.value=e)},e,null,!0)},addaddress:function(){var e=k.app.platform.sdk.addresses.storage.addresses.length;k.app.platform.sdk.addresses.addWalletAddress(e),k.app.platform.sdk.addresses.save(),topPreloader(0),w(function(){topPreloader(100)})},linkValidation:function(){return 0<r.parameters.depositamount.value&&trim(r.parameters.message.value)},linkValidationQr:function(){return 0<r.parameters.depositamount.value},showDepositInStep:function(a,e,t){v.step(function(e){v.deposit(function(e){u[a](e),v.stepB(e,t)},e)},e,{class:"deposit"})},showQrResult:function(e){r.address&&u.linkValidationQr()&&v.qrResultForDeposit(r.address,e.find(".actionbody"))},showLinkResult:function(e){r.address&&u.linkValidation()&&v.linkResultForDeposit(r.address,e.find(".actionbody"))},showLinkMaker:function(e){r.address&&v.linkMakerForDeposit(r.address,e.find(".actionbody"))},showQrMaker:function(e){r.address&&v.qrMakerForDeposit(r.address,e.find(".actionbody"))},showDeposit:function(a){r.address="";var e=r.parameters.deposit.value,t="";if(r.active=!0,"pnetwallet"==e)return t=k.app.platform.sdk.address.pnet().address,r.address=t,void v.addressForDeposit(t,a.find(".actionbody"));"wallet"!=e||k.app.platform.sdk.addresses.addNewWalletAddress(function(e){k.app.platform.sdk.addresses.save(),t=e,r.address=t,v.addresses(),v.addressForDeposit(t,a.find(".actionbody"))})},showSendInStep:function(a,e,t){v.step(function(e){v.send(function(e){u[a](e),v.stepB(e,t)},e)},e,{class:"send"})},calculateFee:function(a){k.app.platform.sdk.node.fee.estimate(function(e){v.sendFees(a.find(".actionbody"),e)})},validSend:function(){var e=l.parameters.amount.value,a=l.parameters.reciever.value;return!!(0<e&&a)},prepareTransaction:function(i,d){var a=function(r,l,o){k.app.platform.sdk.wallet.txbase(r,_.clone(l),0,o,function(e,a,t){if(e)sitemessage(e);else{var s=k.app.platform.sdk.node.transactions.create.wallet(a,t),n=Math.min(s.virtualSize()*i,.0999);d&&d(r,l,n,o)}})},t=l.parameters.amount.value,s=l.parameters.fees.value,n=u.sendAddresses(),r=[],e=l.parameters.reciever.value;if("pnetwallet"==e||e==k.app.localization.e("tacaddress"))return r.push({address:k.app.platform.sdk.address.pnet().address,amount:t}),void a(n,r,s);"wallet"!=e&&e!=k.app.localization.e("twallet")?(r.push({address:e,amount:t}),a(n,r,s)):k.app.platform.sdk.addresses.addNewWalletAddress(function(e){r.push({address:e,amount:t}),k.app.platform.sdk.addresses.save(),a(n,r,s)})}},m=function(){u.addaddress()},f=function(){$(this).closest(".actionbody").html("")},v={clearMain:function(e){k.shell({animation:{id:"fadeInByElement",selector:".fadeInByElement",timeouts:150},clear:!0,el:o.c.find(".animationWrapper")},e)},clearStep:function(e){k.shell({animation:{id:"fadeInByElement",selector:".fadeInByElementStep",timeouts:150},clear:!0,el:o.step},e)},mainWithClear:function(e){i=[],p=[],v.clearStep(function(){v.main(function(){w()})})},main:function(e){k.shell({name:"main",el:o.main,data:{},animation:"fadeIn"},function(){o.total=o.c.find(".total"),o.addresses=o.c.find(".addresses"),o.send=o.c.find(".send"),o.deposit=o.c.find(".deposit"),e&&e()})},stepB:function(e,a){e.find("._stepback").html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>'),e.find("._stepclose").html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+k.app.localization.e("wreturntoeallet")+"</span></div>"),e.find("._subcaptionlevel span").html(a||"")},step:function(t,e,s){s||(s={}),c==e?t&&t(o.c.find(".step")):(i[c=e]=t,p[e]=s,v.clearMain(function(){_scrollToTop(o.step,0,200,-70),setTimeout(function(){k.shell({name:"step",el:o.step,data:{},animation:"fadeIn"},function(e){var a=e.el.find(".step");s.class&&a.addClass(s.class),t&&t(a)})},200)}))},qrResultForDeposit:function(e,a,t){k.shell({name:"depositqrresult",el:a,data:{address:e,d:r}},function(e){})},linkResultForDeposit:function(e,a,t){k.shell({name:"depositlinkresult",el:a,data:{address:e,d:r}},function(e){e.el.find(".copylink").on("click",function(){copyText(e.el.find(".linkInTextArea")),sitemessage(k.app.localization.e("waddresswascop"))})})},linkMakerForDeposit:function(e,a,t){k.shell({name:"depositlinkmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){u.linkValidation()?a.removeClass("disabled"):a.addClass("disabled")}}),u.linkValidation()&&a.removeClass("disabled"),a.on("click",function(){u.linkValidation()&&u.showDepositInStep("showLinkResult",3,k.app.localization.e("linkCreated"))})})},qrMakerForDeposit:function(e,a,t){k.shell({name:"depositqrmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){u.linkValidationQr()?a.removeClass("disabled"):a.addClass("disabled")}}),u.linkValidationQr()&&a.removeClass("disabled"),a.on("click",function(){u.linkValidationQr()&&u.showDepositInStep("showQrResult",3,k.app.localization.e("wqrcodecreated"))})})},addressForDeposit:function(e,a,t){k.shell({name:"depositaddress",el:a,data:{address:e,d:r}},function(e){e.el.find(".getlink").on("click",function(){u.showDepositInStep("showLinkMaker",2,k.app.localization.e("wlinkcreating"))}),e.el.find(".qrcode").on("click",function(){u.showDepositInStep("showQrMaker",2,k.app.localization.e("wqrcodecreating"))}),e.el.find(".copyaddress").on("click",function(){copyText(e.el.find(".adr")),sitemessage(k.app.localization.e("waddresswascop"))})})},deposit:function(e,a){k.shell({name:"deposit",el:a||o.deposit,data:{d:r}},function(t){ParametersLive([r.parameters.deposit],t.el),r.parameters.deposit._onChange=function(e){k.app.settings.set(k.map.uri,"deposit",e);var a=r.parameters.deposit.labelByValue(e);t.el.find(".type").html(a),u.showDepositInStep("showDeposit",1,k.app.localization.e("wdoptions"))},t.el.find(".recieveaddress").on("click",function(){u.showDepositInStep("showDeposit",1,k.app.localization.e("wdoptions"))}),t.el.on("click",".closeAdditional",f),e&&e(t.el)})},sendFees:function(n,e,a){if(u.validSend()){var r=e.feerate||1e-6;u.prepareTransaction(r,function(e,a,t,s){k.shell({name:"sendfees",el:n,data:{fees:t,d:l}},function(e){ParametersLive([l.parameters.fees],e.el),l.parameters.fees._onChange=function(e){k.app.settings.set(k.map.uri,"feesMode",e)},e.el.find(".sendtransaction").on("click",function(){u.prepareTransaction(r,function(e,n,a,t){k.app.platform.sdk.wallet.txbase(e,_.clone(n),a,t,function(e,s,a){if(e)sitemessage(e);else{var t=k.app.platform.sdk.node.transactions.create.wallet(s,a);console.log(t,n),k.app.platform.sdk.node.transactions.send(t,function(e,a){if(a)sitemessage(a);else{var t=_.map(s,function(e){return e.txid});k.app.platform.sdk.node.transactions.clearUnspents(t),c=0,v.mainWithClear(),sitemessage(k.app.localization.e("wssuccessfully"))}})}})})})})})}},send:function(a,e){u.sendParameters(),k.shell({name:"send",el:e||o.send,data:{d:l}},function(t){ParametersLive(_.toArray(l.parameters),t.el);var e=t.el.find(".change"),s=function(){u.canChangeSend()?e.removeClass("hidden"):e.addClass("hidden")};l.parameters.amount._onChange=function(e){var a=u.sendAddresses();k.app.platform.sdk.node.transactions.get.balance(function(e){l.parameters.amount.value<0&&(l.parameters.amount.value=0),l.parameters.amount.value>e&&(l.parameters.amount.value=e),l.parameters.amount.el.closest(".inputWrapper").html(l.parameters.amount.input()),ParametersLive([l.parameters.amount],t.el),1==c&&u.showSendInStep("calculateFee",1,k.app.localization.e("wscalculatefees"))},a,null,!0)},l.parameters.source._onChange=function(e){u.sendParameters(),l.parameters.reciever.el.closest(".inputWrapper").html(l.parameters.reciever.input()),l.parameters.amount.el.closest(".inputWrapper").html(l.parameters.amount.input()),ParametersLive([l.parameters.reciever,l.parameters.amount],t.el),s(),1==c&&u.showSendInStep("calculateFee",1,k.app.localization.e("wscalculatefees"))},l.parameters.reciever._onChange=function(e){if(s(),!u.canChangeSend()&&e){var a=!0;try{bitcoin.address.fromBase58Check(e)}catch(e){a=!1}if(!a)return void t.el.find(".notvalidaddress").html(k.app.localization.e("wsaddressnotv"));t.el.find(".notvalidaddress").html(""),e[0]}else t.el.find(".notvalidaddress").html("")},e.on("click",function(){var e=u.canChangeSend();e&&(l.parameters.source.value=e,l.parameters.source._onChange(),l.parameters.source.el.closest(".inputWrapper").html(l.parameters.source.input()),ParametersLive([l.parameters.source],t.el))}),t.el.find(".calculateFee").on("click",function(){u.validSend()?(u.showSendInStep("calculateFee",1,k.app.localization.e("wscalculatefees")),t.el.find(".required").addClass("hidden")):t.el.find(".required").removeClass("hidden")}),s(),a&&a(t.el)})},addresses:function(n){var r=d.total.addresses(),l={};k.app.platform.sdk.node.transactions.get.unspents(function(s){k.app.platform.sdk.node.transactions.get.balance(function(e){_.each(s,function(e,a){l[a]=_.reduce(e,function(e,a){return e+Number(a.amount)},0)});var a=[d.pnetwallet,d.wallet],t=_.map(a,function(e){var a=_.map(e.addresses(),function(e){return{balance:l[e],address:e}});return{caption:e.caption,details:a,label:e.alabel}},r);k.shell({name:"addresses",el:o.addresses,data:{addressesGroup:t,total:e}},function(e){e.el.find(".addaddress").on("click",m),n&&n()})},r)},r)},updateTotal:function(e,a){v.datasets(e,n[e.id].data.datasets),n[e.id].update(),o.total.find('.totalItem[item="'+e.id+'"] .balanceWrapper').html(k.app.platform.mp.coinwithsmall(e.balance)),a&&a()},datasets:function(e,a){var t=[],s=_.map(e.move,function(e){return t.push(e.color),Number(e.summary||0)}),n=[],r=[],l=[],o=[],i="#F1F1F1";_.each(e.move,function(e){_.each(e.items,function(e){n.push(Number(e.value)),r.push(e.color),l.push(i),o.push(8)})});var d=[{data:s,backgroundColor:t,borderColor:[i,i],borderWidth:[8,8]},{data:n,backgroundColor:r,borderColor:l,borderWidth:o}];return _.each(a,function(e,a){e.data=d[a].data}),d},total:function(t,s){t.update?v.updateTotal(t,s):k.shell({name:"total",el:o.total,inner:append,data:{item:t}},function(e){var a=e.el.find("#chart"+t.id)[0].getContext("2d");n[t.id]=new Chart(a,{type:"doughnut",data:{datasets:v.datasets(t)},options:{rotation:.5*Math.PI,cutoutPercentage:85}}),s&&s()})}},t=function(){},h=function(e,i){lazyEach({array:_.toArray(d),sync:!0,action:function(l){var o=l.item,e=o.addresses();k.app.platform.sdk.node.transactions.get.balance(function(r){k.app.platform.sdk.node.transactions.get.canSpend(e,function(e,a){var t="#414244",s=100;a&&(s=100*e/a,t="#0F8623");var n={positive:{summary:s,color:t}};e<a&&(n.neutral={summary:100-s,color:"#414244"}),v.total({label:o.label,id:o.id,balance:r,move:n,update:i},l.success)})},e)},all:{success:function(){e&&e()}}})},w=function(e){o.total.html(""),h(function(){lazyActions([v.send,v.deposit,v.addresses],e),k.app.platform.sdk.node.transactions.clbks.circles=function(){h(null,!0)},k.app.platform.sdk.node.transactions.clbks.walletaddresses=function(){v.addresses()}})};return{primary:a,getdata:function(e){var a={};a.p2pkh=k.app.platform.sdk.address.pnet(),r.parameters.deposit.value=k.app.settings.get(k.map.uri,"deposit")||r.parameters.deposit.defaultValue,l.parameters.source.value=k.app.settings.get(k.map.uri,"source")||l.parameters.source.defaultValue,l.parameters.reciever.value="",l.parameters.fees.value=k.app.settings.get(k.map.uri,"feesMode")||l.parameters.fees.defaultValue,r.active=!1,c=0,i=[],p=[],e(a)},destroy:function(){delete k.app.platform.sdk.node.transactions.clbks.circles,delete k.app.platform.sdk.node.transactions.clbks.walletaddresses,o={}},init:function(a){n={},t(),(o={}).c=a.el.find("#"+k.map.id),o.step=o.c.find(".actionstep"),o.main=o.c.find(".mainstep"),o.c.on("click","._stepclose",function(){c=0,v.mainWithClear()}),o.c.on("click","._stepback",function(){1<c?v.step(i[c-1],c-1,p[c-1]):(c=0,v.mainWithClear())}),v.main(function(){w(function(){var e=parameters();e.action&&"send"==e.action&&(l.parameters.amount.value=Number(e.amount.replace(/,/g,"")),l.parameters.reciever.value=e.address,l.parameters.amount._onChange(),u.showSendInStep("calculateFee",1,k.app.localization.e("wscalculatefees"))),a.clbk(null,a)})})}}};return k.run=function(e){var a=k.addEssense(t,s,e);k.init(a,e)},k.stop=function(){_.each(t,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=wallet:(app.modules.wallet={},app.modules.wallet.module=wallet);
 /*_____*/ 
var share=function(){var u=new nModule,t={},n=function(e){var s,o,i=/[,.!?;:() \n\r]/g,a=deep(e,"history"),r=null,l={autoFilled:function(){l.filled("i",0!=r.images.v.length),l.filled("u",r.url.v),l.filled("t",0!=r.tags.v.length),l.filled("cm",r.message.v||r.caption.v)},filled:function(e,a){var t=s.c.find('.draggablepart[part="'+e+'"]');a?t.addClass("filled"):t.removeClass("filled")},checkUrlForImage:function(a){if(a=a.split("?")[0].toLowerCase(),_.find([".jpg",".gif",".png",".jpeg"],function(e){if(-1<a.indexOf(e))return!0}))return!0},embeding20:function(e){var a=r.export(!0);u.nav.api.load({open:!0,id:"embeding20",inWnd:!0,essenseData:{storage:a,value:e,on:{added:function(e){"url"==type&&e&&l.checkUrlForImage(e)&&(type="images",e=e),r[type].set(e),g[type]&&g[type]()}}}})},embeding:function(n,e){var a=r.export(!0);"article"==n?u.nav.api.load({open:!0,id:"articles",inWnd:!0,essenseData:{storage:a,value:e,on:{added:function(e){}}}}):u.nav.api.load({open:!0,id:"embeding",inWnd:!0,essenseData:{type:n,storage:a,value:e,on:{added:function(e){var t=!0;"url"==n&&e&&l.checkUrlForImage(e)&&(n="images",e=e),_.isArray(e)||(e=[e]),_.each(e,function(e,a){t=r[n].set(e),o.share||p.save()}),!t&&c[n]&&sitemessage(c[n]),g[n]&&g[n]()}}}})},addTag:function(e){r.tags.set(e)?o.share||p.save():dialog({html:" < 30",class:"one"})},editImage:function(e){var a=_.map(r.images.v,function(e,a){return{original:e,index:a}}),n=_.filter(a,function(e){if(-1<e.original.indexOf("data:image"))return!0});u.nav.api.load({open:!0,id:"imageGalleryEdit",inWnd:!0,essenseData:{edit:!0,initialValue:e,images:n,success:function(e,a){_.each(r.images.v,function(e,a){var t=_.find(n,function(e){if(e.index==a)return!0});t&&(r.images.v[a]=t.original)}),o.share||p.save(),g.images(a)}}})},removeImage:function(t){var e=r.images.v.splice(t,1)[0];s.c.find(".imageContainer").each(function(){var e=$(this),a=e.attr("value");t<a&&e.attr("value",a-1),a==t&&e.remove()}),s.c.find(".imagesEmbWr").isotope();var a=s.eMessage[0].emojioneArea.getText();a=a.split(e).join(""),s.eMessage[0].emojioneArea.setText(a),o.share||p.save()},removelink:function(){var e=r.url.v;r.url.set();var a=s.eMessage[0].emojioneArea.getText();a=a.split(e).join(""),s.eMessage[0].emojioneArea.setText(a),o.share||p.save()},removeTag:function(e){r.tags.remove(e);var a=s.eMessage[0].emojioneArea.getText();a=a.split("#"+e).join(e),s.eMessage[0].emojioneArea.setText(a),o.share||p.save()},applyText:function(e){r.message.set(e)},caption:function(e){r.caption.set(e)},linksFromText:function(e){if(!r.url.v){var a=e.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi);a&&0<a.length&&_.each(a,function(e){if(l.checkUrlForImage(e))-1==r.images.v.indexOf(e)&&(r.images.set(e),g.images());else{if(r.url.v)return;r.url.set(e),g.url()}})}},tagsFromText:function(e){var a=e.split(i),t=_.filter(a,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))&&!r.tags.have(e)});t.length&&(_.each(t,function(e){e=e.replace(/\#/g,""),r.tags.set(e)}),g.tags())},post:function(i,e){topPreloader(50),r.uploadImages(u.app,function(){u.sdk.node.transactions.create.commonFromUnspent(r,function(e,a){if(topPreloader(100),s.c.removeClass("loading"),e){try{var t=new pShare;t._import(e,!0),t.temp=!0,t.address=e.address,u.app.platform.sdk.node.shares.add(t),o.notClear||(r.clear(),o.share||p.save(),m())}catch(e){console.log(e)}i&&i(!0)}else if(i)i(!1,c[a]);else{s.postWrapper.addClass("showError");var n=u.app.platform.errorHandler(a,!0);n&&s.error.html(n)}},e)})},error:function(e){var a=r.validation();return a&&!e?(s.postWrapper.addClass("showError"),s.error.html(c[a]),"message"==a&&s.c.find(".emojionearea-editor").focus(),"tags"==a&&s.c.find(".tgs input").focus(),!0):(s.postWrapper.removeClass("showError"),s.error.html(""),!1)},eTextChange:function(e){var a=e.getText();l.tagsFromText(a),l.applyText(a),l.linksFromText(a),g.caption(),console.log(a),o.share||p.save()}},c={message:u.app.localization.e("emptymessage"),tags:u.app.localization.e("emptytags"),images:u.app.localization.e("maximages")},d={selectTime:function(){var e=new Date,a={day:null,hour:(e=e.addMinutes(10)).getHours(),minutes:e.getMinutes()};o.time&&(a.day=o.time.yyyymmdd(),a.hour=o.time.getHours(),a.minutes=o.time.getMinutes()),u.fastTemplate("sharedate",function(e){dialog({html:e,btn1text:u.app.localization.e("daccept"),class:"one sharedate",clbk:function(e){},wrap:!0,success:function(e){var a=e.el.find(".day").val(),t=e.el.find(".hours").val(),n=e.el.find(".minutes").val(),i=strToDateSmall(a);return i=(i=i.addHours(t)).addMinutes(n),new Date<i?(o.time=i,s.selectTime.find(".selectedTime").html(convertDate(dateToStr(i))),o.selectTime&&o.selectTime(i),!0):(sitemessage(u.app.localization.e("pastdate")),!1)}})},{date:a})},changePostTime:function(){var e=$(this),a=$(this).val();if("p"!=a){if("t"==a)l.error()?e.val("w"):o.time&&o.time<new Date&&(o.time=null,s.selectTime.find(".selectedTime").html(u.app.localization.e("timenotselected")),o.selectTime&&o.selectTime(null));a=$(this).val(),o.type&&o.type(a)}else dialog({html:u.app.localization.e("sharenow"),btn1text:u.app.localization.e("dyes"),btn2text:u.app.localization.e("dno"),success:function(){o.type&&o.type(a)},fail:function(){e.val("w")}})},changeAddress:function(){var e=$(this).val(),a=s.c.find(".usericon"),t=deep(app,"platform.sdk.users.storage."+e+".image")||"";t?(a.html(""),a.attr("image",t),bgImages(s.c.find(".icon"))):(a.html('<svg width="30" height="30" data-jdenticon-value="'+e+'"></svg>'),a.attr("image",""),a.css("background","#F9F6F6"),a.css("background-image",""),a.css("background-size",""),a.css("background-position",""),a.css("background-repeat",""),s.c.find("[data-jdenticon-value]").each(function(){var e=$(this),a=e.data("jdenticon-value");e.html(jdenticon.toSvg(a,e.width()))})),o.address&&o.address(e)},change:function(){l.error(!0),l.autoFilled()},post:function(){l.error()||l.post()},embeding:function(){var e=$(this).attr("embeding");"embeding20"==e?l.embeding20():l.embeding(e)},addTag:function(e){l.addTag(e),g.tags()},caption:function(){var e=$(this).val();l.caption(e)},eTextChange:function(e,a){l.eTextChange(this)},textChange:function(){var e=$(this).val();l.tagsFromText(e),l.applyText(e),l.linksFromText(e),g.caption()},eText:function(e,a){var t=String.fromCharCode(a.keyCode||a.which),n=this.getText();i.test(t)&&(l.tagsFromText(n),l.linksFromText(n)),l.applyText(n),g.caption(),o.share||p.save()},text:function(e){var a=String.fromCharCode(e.keyCode||e.which),t=$(this).val();i.test(a)&&(l.tagsFromText(t),l.linksFromText(t)),l.applyText(t),g.caption()},removeTag:function(){var e=$(this).closest(".tag").attr("tag");l.removeTag(e),$(this).closest(".tag").remove()},removelink:function(){l.removelink(),g.url()}},g={tags:function(a){s.tags.find(".tag").remove(),u.shell({name:"tags",inner:append,el:s.tags,data:{tags:r.tags.get()}},function(e){e.el.find(".remove").on("click",d.removeTag),a&&a()})},tagsResults:function(e,a){u.shell({name:"tagsResult",data:{results:e}},function(e){a&&a(e.rendered)})},all:function(){s.eMessage[0].emojioneArea.setText(r.message.v),g.tags(),g.url(),g.caption(),g.images()},caption:function(){r.caption.v||100<r.message.v.length?s.cpt.hasClass("active")||s.cpt.addClass("active"):s.cpt.removeClass("active")},url:function(a){var e=r.url.v,n=u.app.platform.parseUrl(e),i=u.app.platform.sdk.remote.storage[e];u.shell({name:"url",inner:html,el:s.urlWrapper,data:{url:r.url.v,og:i,remove:!0}},function(e){if(r.url.v&&!i)if("youtube"==n.type||"vimeo"==n.type)Plyr.setup(".js-player");else u.app.platform.sdk.remote.get(n.url,function(e){e&&g.url()});else if(i){var t=e.el.find("img");e.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,a){e.isLoaded?$(t[a]).addClass("active"):$(t[a]).closest(".image").css("display","none")})})}e.el.find(".removelink").on("click",d.removelink),a&&a()})},images:function(t){u.shell({name:"images",turi:"embeding",inner:html,el:s.images,data:{images:_.map(r.images.v||[],function(e,a){return{src:e,id:a}})}},function(e){e.el.find(".remove").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");l.removeImage(e)}),e.el.find(".edit").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");l.editImage(e)}),e.el.find(".image").on("click",function(){var e=$(this).attr("i");if(e){var a=_.map(r.images,function(e){return{src:e}});u.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:{initialValue:e,idName:"src",images:a}})}}),e.el.find(".image").imagesLoaded({background:!0},function(e){if(isMobile())t&&t(),s.images.addClass("active");else{var a=s.images.find(".imagesEmbWr");a.isotope({layoutMode:"packery",itemSelector:".imageContainer",packery:{gutter:20},initLayout:!1}),a.on("arrangeComplete",function(){t&&t(),s.images.addClass("active")}),a.isotope()}})})}},p={save:function(){r?u.app.settings.set(u.map.id,"currentShare",r.export(!0)):u.app.settings.set(u.map.id,"currentShare","")},load:function(){var e=u.app.settings.get(u.map.id,"currentShare");e&&r.import(e)}},m=function(){g.all()};return{primary:a,post:l.post,getdata:function(e,a){console.log("GETDATA",a),r=deep(a,"settings.essenseData.share")||new Share,(o=deep(a,"settings.essenseData")||{}).share||p.load(),e({share:r})},destroy:function(){s.c.find(".emojionearea-editor").off("pasteImage"),s={},Sortable&&Sortable.destroy&&Sortable.destroy()},init:function(e){(s={}).c=e.el.find("#"+u.map.id),s.tagSearch=s.c.find(".searchWrapper"),s.tags=s.c.find(".tagsCont"),s.message=s.c.find(".message"),s.eMessage=s.c.find("#emjcontainer"),s.panel=s.c.find(".panel .item"),s.error=s.c.find(".error"),s.postWrapper=s.c.find(".postWrapper"),s.post=s.c.find(".post"),s.urlWrapper=s.c.find(".urlWrapper"),s.caption=s.c.find(".captionshare"),s.cpt=s.c.find(".cpt"),s.images=s.c.find(".imagesWrapper"),s.changeAddress=s.c.find(".changeAddress"),s.changePostTime=s.c.find(".postTime"),s.selectTime=s.c.find(".selectedTimeWrapper"),function(){s.changeAddress.on("change",d.changeAddress),s.changePostTime.on("change",d.changePostTime),s.selectTime.on("click",d.selectTime),s.panel.on("click",d.embeding),s.post.on("click",d.post),console.log("initEvents"),s.eMessage.emojioneArea({pickerPosition:"bottom",search:!1,tones:!1,events:{change:d.eTextChange,click:d.eTextChange,keyup:d.eText,onLoad:function(e,a){parameters().newshare&&s.c.find(".emojionearea-editor").focus(),s.c.find(".emojionearea-editor").pastableContenteditable(),s.c.find(".emojionearea-editor").on("pasteImage",function(e,a){topPreloader(100),r.images.set(a.dataURL)?g.images&&g.images():sitemessage(c.images)}).on("pasteImageStart",function(){topPreloader(30)}).on("pasteImageError",function(e,a){topPreloader(100)}).on("pasteText",function(e,a){l.eTextChange(s.eMessage[0].emojioneArea)})}}}),s.caption.on("keyup",d.caption),r.on.change.edit=d.change,isMobile()||s.c.find(".tooltip").tooltipster({theme:"tooltipster-light",maxWidth:600,zIndex:20}),search(s.tagSearch,{placeholder:u.app.localization.e("addtags"),clbk:function(e){},events:{fastsearch:function(e,a,t){if(t){var n=String.fromCharCode(t.keyCode||t.which);if(/[,.!?;:() ]/.test(n))return d.addTag(e),void a(null)}u.app.platform.sdk.tags.search(e,function(e){g.tagsResults(e,function(e){a(e,function(e,a){e.find(".result").on("click",function(){var e=$(this).attr("result");a.closeResults(),a.clear(),d.addTag(e)})})})})},search:function(e,a,t){d.addTag(e),t.clear(),a&&a()}},last:{get:function(){return[u.app.localization.e("tnews"),u.app.localization.e("timages"),u.app.localization.e("tvideos"),u.app.localization.e("tmarket"),u.app.localization.e("tsport")]},tpl:function(e,a){g.tagsResults(e,function(e){a(e,function(e,a){e.find(".result").on("click",function(){var e=$(this).attr("result");a.closeResults(),a.clear(),d.addTag(e)})})})}}});var e={animation:150,swapThreshold:.5,draggable:".draggablepart",onUpdate:function(e){var a=[],t=$(n).find(".draggablepart");$.each(t,function(){a.push($(this).attr("part"))}),r.settings.a=a,o.share||p.save(),o.changeArrange&&o.changeArrange()},forceFallback:!0,handle:".marker"},n=document.getElementById("sortableBody");n&&Sortable.create(n,e),l.autoFilled()}(),m(),e.clbk(null,e)},id:e._id}};return u.run=function(e){var a=u.addEssense(t,n,e);u.init(a,e)},u.stop=function(){_.each(t,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=share:(app.modules.share={},app.modules.share.module=share);
 /*_____*/ 
var lenta=function(){var J=new nModule,t={},a=function(e){var c,i,d,n,t=deep(e,"history"),a=e.mid,s={},o=[],r={},u={},f={},l=!1,p=!1,h={},m=[],v=0,g=null,b=0,k=null,w=!1,x={comments:{content:"message empty",share:"hasn't share",messagelength:">140",money:"hasn't money",network:"network error"},upvote:{share:"hasn't share",network:"network error"},complain:{share:"hasn't share",network:"network error"}},y={clear:function(){o=[],s={},u={},p=l=!(f={}),h={},v=b=0,k=g=n=null,p=w=!(m=[]),loaded=!1},loadmore:function(){j.shares(function(e,n){e&&R.shares(e,function(){R.sharesInview(e,function(){})},{index:m.length})})},removeAdditionalByScroll:function(){if(g){var e=$(window).scrollTop();150<Math.abs(e-v)&&y.additional(g,!1)}},additional:function(e,n){n?(e.addClass("showAdditional"),e.find(".subscribeWrapper").fadeIn(),v=$(window).scrollTop(),g=e,window.addEventListener("scroll",y.removeAdditionalByScroll)):(e.removeClass("showAdditional"),e.find(".subscribeWrapper").fadeOut(),window.removeEventListener("scroll",y.removeAdditionalByScroll))},applyheight:function(e,n,t){},applyheightEl:function(e,n,t){if(c&&c.shares&&e&&n.length){var a=n.height();return n.length&&i.scrollTop()>n.offset().top?(y.applyheight(e,a,t),c.shares.css("height","auto")):c.shares&&c.shares.css("height","auto"),a}},stateAction:function(n,t){J.app.user.isState(function(e){e?t():J.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{loginText:J.app.localization.e("llogin"),successHref:n,signInClbk:function(){t&&t()}}})})},initVideo:function(e,n){var t=e.find(".js-player"),a=e.find(".videoWrapper");if(t.length){var i=e.height(),s=new Plyr(t[0],{muted:!0,autoplay:!0,resetOnEnd:!0});h[n.txid]||(h[n.txid]={}),h[n.txid].p=s,h[n.txid].initing=!0,h[n.txid].el=a,h[n.txid].id=a.attr("pid"),s.on("ready",function(){h[n.txid].inited=!0,h[n.txid].inited=!0,i=y.applyheightEl(i,e,"video")})}},linksFromText:function(e){var n=e.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);if(n&&0<n.length)return n[0]},sendComment:function(e,t){var n=e.share.v,a=c.c.find("#"+n).find(".error");J.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){topPreloader(100),e?t&&t(e):(a.html(x.comments[n]),t&&t(!1))})},initCommentProcess:function(t){r[t]=!0,s[t]||(s[t]=new CommentShare,s[t].share.set(t));var a=c.c.find("#"+t),n=a.find(".error"),i=a.find("textarea");i.off("keyup"),i.on("keyup",function(){var e=$(this).val();if(s[t].message.set(e),!s[t].url.v){var n=y.linksFromText(e);n&&(s[t].url.set(n),R.newCommentAttachement(t,"url"))}}),i.off("change"),i.on("change",function(){var e=$(this).val();if(!s[t].url.v){var n=y.linksFromText(e);n&&(s[t].url.set(n),R.newCommentAttachement(t,"url"))}}),a.find(".leaveCommentCnt .panel .item").off("click").on("click",function(){var e=$(this).attr("embeding");y.embeding(t,e)}),a.find(".leaveCommentCnt .post").off("click").on("click",function(){var e=s[t].validation();e?n.html(x.comments[e]):(a.find(".leaveCommentCnt").addClass("loading"),n.html(""),y.sendComment(s[t],function(e){if(a.find(".leaveCommentCnt").removeClass("loading"),e){var n=s[t].alias(e);J.app.platform.sdk.node.shares.storage.trx[t].comment(n),delete s[t],i.blur(),i.val(""),a.find(".att").html(""),y.initCommentProcess(t)}}))})},embeding:function(n,t){var e=s[n].export(!0);J.nav.api.load({open:!0,id:"embeding",inWnd:!0,essenseData:{type:t,storage:e,on:{added:function(e){s[n][t].set(e),R.newCommentAttachement(n,t)}}}})},openPost:function(e,n){J.nav.api.load({open:!0,id:"post",inWnd:!0,clbk:function(){n&&n()},essenseData:{share:e}})},donate:function(e,n){var t=J.app.platform.sdk.node.shares.storage.trx[e];if(t){var a=deep(app,"platform.sdk.usersl.storage."+t.address)||{address:t.address,addresses:[]},i="send?address="+t.address+"&amount=1&message="+hexEncode(J.app.localization.e("postlabel")+" &mdash; "+(t.caption||t.message).substr(0,20)+"...")+"&label="+(a.name||a.address)+"&setammount=true";J.fastTemplate("donation",function(e){dialog({html:e,class:"one donation",btn1text:J.app.localization.e("dcancel"),clbk:function(e,n){e.find(".pnetdnt").on("click",function(){J.nav.api.load({open:!0,href:i,history:!0}),n.destroy()}),e.find(".copy").on("click",function(){var e=$(this).closest(".address").find(".addr");copyText(e),sitemessage(J.app.localization.e("successfullycopiedaddress"))})}})},{userinfo:a})}},videoPosition:function(e){var n=e.find(".work");if(e.hasClass("fullScreenVideo")){var t=($(window).height()-(e.find(".videoWrapper").height()+100))/2;0<t?n.css("margin-top",t+"px"):n.css("margin-top","0px")}else n.css("margin-top","0px")},fullScreenVideo:function(e,n){if(h[e]){var t=c.c.find("#"+e);t.addClass("fullScreenVideo"),y.videoPosition(t),J.app.nav.api.history.addParameters({v:e});var a=h[e];a.p.playing||a.p.play(),a.p.muted=!1,J.app.actions.offScroll(),n&&n()}},exitFullScreenVideo:function(e){var n=c.c.find("#"+e);n.removeClass("fullScreenVideo"),y.videoPosition(n),h[e].p.muted=!0,J.app.nav.api.history.removeParameters(["v"]),J.app.actions.onScroll()},like:function(e,n,t){var a=e.upvote(n);J.sdk.node.transactions.create.commonFromUnspent(a,function(e,n){topPreloader(100),e?t&&t(!0):(a.myVal=null,J.app.platform.errorHandler(n,!0),t&&t(!1))})},complain:function(e,t){var n=e.complain();J.sdk.node.transactions.create.commonFromUnspent(n,function(e,n){topPreloader(100),e?(dialog({html:"<b>TXID:</b> "+e.txid,class:"one"}),t&&t(!0)):(c.postWrapper.addClass("showError"),J.app.platform.errorHandler(n,!0),t&&t())})},unsubscribe:function(a,i){var e=new Unsubscribe;e.address.set(a),topPreloader(10),J.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){if(e){var t=deep(app,"platform.sdk.users.storage."+J.user.address.value.toString("hex"));t&&t.removeRelation({adddress:a})}topPreloader(100),i(e,n)})},subscribe:function(a,i){var e=new Subscribe;e.address.set(a),topPreloader(10),J.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){if(e){var t=deep(app,"platform.sdk.users.storage."+J.user.address.value.toString("hex"));t&&t.addRelation({adddress:a,private:!1})}topPreloader(100),i(e,n)})},subscribePrivate:function(a,i){var e=new SubscribePrivate;e.address.set(a),topPreloader(10),J.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){if(e){var t=deep(app,"platform.sdk.users.storage."+J.user.address.value.toString("hex"));t&&t.addRelation({adddress:a,private:!0})}topPreloader(100),i(e,n)})},openGallery:function(e,n,t){var a=_.map(e.images,function(e){return{src:e}});J.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:{initialValue:n,idName:"src",images:a,gid:e.txid},clbk:function(){t&&t()}})},videosInview:function(e,s,o){var r=_.filter(e,function(e){if(e.inited&&!e.playing&&!e.stopped&&e.el)return!0});r.length&&(n=slowMade(function(){r=_.filter(r,function(e){return e.el});_.map(r,function(e){return e.el[0]});var e=inView(c.c.find(".videoWrapper"),{offset:$(window).height()/10,mode:"all"}),n=null;if(0<e.length){var t=$(e[0]);n=t.attr("pid");var a=_.find(r,function(e){return e.id==n});if(!n||!a)return;a&&setTimeout(function(){inView(t,{offset:-100,mode:"all"}).length&&s(a,t)},320)}var i=_.filter(r,function(e){return e.id!=n});i.length&&o(i)},n,30))},scrollToPost:function(e){_scrollTo($("#"+e))}},C=function(){var e=c.c.find(".fullScreenVideo");0<e.length&&y.videoPosition(e)},P=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!l&&!p&&y.loadmore()},S=function(e){y.videosInview(h,function(e,n,t){n.closest(".share").hasClass("showAdditional")||e.p.play()},function(e){_.each(e,function(e){e.p.muted=!0,e.p.playing&&e.p.stop()})})},E=function(){var e=$(this).closest(".comment").attr("id"),n=$(this).closest(".share").attr("id");y.like(J.app.platform.sdk.node.shares.storage.trx[n].findComment(e)),$(this).addClass("active")},A=function(){var e=$(this).closest(".share"),n=e.attr("id");s[n]||(e.find(".leavewrapper").addClass("active"),y.initCommentProcess(n))},T=function(){var e=$(this).closest(".share").attr("id");J.app.platform.sdk.node.transactions.get.tx(e)},z=function(){if(d.authAction)d.authAction("like");else{var t=$(this).closest(".stars");if(!t.attr("value")){var e=$(this).closest(".share").attr("id"),a=$(this).attr("value"),i=J.app.platform.sdk.node.shares.storage.trx[e];y.stateAction("_this",function(){y.like(i,a,function(e){if(e){t.attr("value",a),t.addClass("liked"),i.scnt||(i.scnt=0),i.score||(i.score=0),i.scnt++,i.score=Number(i.score||0)+Number(a);var n=Number(i.score)/Number(i.scnt);t.find(".tstarsov").css("width",n/5*100+"%"),t.closest(".itemwr").find(".count span").html(n.toFixed(1))}})})}}},V=function(){var n=$(this).closest(".share"),e=n.attr("id");dialog({html:J.app.localization.e("lcomlaindialog"),btn1text:J.app.localization.e("dyes"),btn2text:J.app.localization.e("dno"),success:function(){n.addClass("hidden"),topPreloader(30),y.complain(J.app.platform.sdk.node.shares.storage.trx[e],function(e){topPreloader(100),e||n.removeClass("hidden")})}})},L=function(){var e=$(this).closest(".share");y.additional(e,!e.hasClass("showAdditional"))},W=function(){var n=$(this).closest(".share").attr("id"),e=$(this).attr("i"),t=J.app.platform.sdk.node.shares.storage.trx[n];if(!t){var a=_.find(J.sdk.node.transactions.temp.share,function(e){return e.txid==n});(t=new pShare)._import(a),t.temp=!0,t.address=J.app.platform.sdk.address.pnet().address}y.openGallery(t,e)},F=function(){var e=$(this).closest(".shareTable").attr("address"),t=$(this).closest(".share");y.subscribePrivate(e,function(e,n){e?t.find(".shareTable").addClass("subscribed"):J.app.platform.errorHandler(n,!0)})},H=function(){var e=$(this).closest(".shareTable").attr("address"),t=$(this).closest(".share");y.subscribe(e,function(e,n){e?t.find(".shareTable").addClass("subscribed"):J.app.platform.errorHandler(n,!0)})},I=function(){var e=$(this).closest(".shareTable").attr("address"),t=$(this).closest(".share");y.unsubscribe(e,function(e,n){e?t.find(".shareTable").removeClass("subscribed"):J.app.platform.errorHandler(n,!0)})},M=function(){var t=$(this),e=t.attr("address");if(t.addClass("loading"),t.hasClass("subscription")){var n=function(e,n){t.removeClass("loading"),e?t.removeClass("subscription"):sitemessage(n)};dialog({html:J.app.localization.e("lunsubscribe"),btn1text:J.app.localization.e("dyes"),btn2text:J.app.localization.e("dno"),success:function(){y.unsubscribe(e,n)}})}else{var a=function(e,n){t.removeClass("loading"),e?t.addClass("subscription"):sitemessage(n)};dialog({class:"bigbuttons big centertext",html:J.app.localization.e("lprivatepublic"),btn1text:'<i class="far fa-eye-slash"></i> '+J.app.localization.e("lprivate"),btn2text:'<i class="far fa-eye"></i> '+J.app.localization.e("lpublic"),success:function(){y.subscribePrivate(e,a)},fail:function(){y.subscribe(e,a)}})}},U=function(){var e=$(this).closest(".share").attr("id");y.exitFullScreenVideo(e)},D=function(){var e=$(this).closest(".share").attr("id");y.fullScreenVideo(e)},N=function(){if(d.authAction)d.authAction("like");else if(!isMobile()){var e=$(this).closest(".share").attr("id");y.openPost(e)}},G=function(){if(d.authAction)d.authAction("donate");else{var e=$(this).closest(".share").attr("id");y.donate(e)}},O=function(){d.authAction&&d.authAction("discussion")},Z=function(){y.loadmore()},B=function(){c.c.find(".shares").html('<div class="bspacer"></div>'),c.c.find(".loadprev").remove(),c.c.removeClass("loading"),c.c.removeClass("sharesEnded"),c.c.removeClass("sharesZero"),y.clear(),q()},R={newCommentAttachement:function(e,n){c.c.find("#"+e+" ."+n+"Wrapper")},shareSpacers:function(e){_.each(e,function(e){R.shareSpacer(e)})},shareSpacer:function(e){if(u[e.txid]&&!f[e.txid]){var n=c.shares.find("#"+e.txid),t=n.height(),a=n.find(".work").outerHeight();h[e.txid]&&h[e.txid].inited&&(h[e.txid].p.destroy(),h[e.txid].el=null,h[e.txid].inited=!1),u[e.txid]=!1,c.shares.css("height",c.shares.outerHeight()),n.html('<div class="shareSpacer added"></div>'),n.find(".shareSpacer").outerHeight(a),t=y.applyheightEl(t,n,"space")}},share:function(i,s){var o=c.shares.find("#"+i.txid),r=o.height();c.shares.css("height",c.shares.outerHeight());var e=o.find(".added"),l=0;e.length&&(l=e.outerHeight()),f[i.txid]=!0,J.shell({name:"share",el:o,data:{share:i,ed:d}},function(e){var n=o.find(".work");l&&n.outerHeight(l),u[i.txid]=!0,r=y.applyheightEl(r,o,"share");var t=function(e){u[i.txid]?e():a()},a=function(){n.css("height","auto"),f[i.txid]=!1,s&&s()};t(function(){R.url(e.el.find(".url"),i.url,i,function(){t(function(){R.urlContent(i,function(){y.initVideo(e.el,i),a(),t(function(){R.images(i,function(){})})})})})}),fastars(e.el.find(".stars"))})},sharesInview:function(e,n){lazyEach({array:e,action:function(e){var n=e.item;u[n.txid]?e.success():(u[n.txid]=!0,R.share(n,e.success))},all:{success:function(){n()}}})},shares:function(n,t,e){e||(e={}),e.inner||(e.inner=append),J.shell({name:"shares",inner:e.inner,el:c.shares,data:{shares:n||[],index:e.index||0},animation:!1},function(e){m=e.inner==append?m.concat(n):n.concat(m),t&&t()})},images:function(n,t){if(c.c){var a=c.c.find("#"+n.txid),i=a.find(".image"),s=a.find(".images");if(!s.hasClass("active")&&i.length&&s.length){var r=a.height();i.imagesLoaded({background:!0},function(o){"a"!=n.settings.v&&_.each(o.images,function(e,n){var t=e.img,a=$(o.elements[n]).closest(".imagesWrapper"),i="",s=a.width();a.height();if(t.width>1.2*t.height&&!isMobile()){i="w2";t.width,t.height;a.width(s*(t.width/t.height))}(t.height>1.2*t.width||isMobile())&&(i="h2",a.height(s*(t.height/t.width))),i&&a.addClass(i)}),r=y.applyheightEl(r,a);var e=function(){s.addClass("active"),i.addClass("active"),r=y.applyheightEl(r,a),t&&t()};isMobile()||"a"==n.settings.v?e():(s.isotope({layoutMode:"packery",itemSelector:".imagesWrapper",packery:{gutter:20},initLayout:!1}),s.on("arrangeComplete",function(){e()}),s.isotope())})}else t&&t()}},leavecomment:function(e,t){J.shell({name:"leavecomment",el:c.shares.find("#"+e+" .leaveCommentCnt"),data:{}},function(e){var n=e.el.find("textarea");n.on("focus",A),autosize(n),t&&t(n)})},commentslist:function(e,n,t){n||(n={}),J.shell({name:"commentslist",el:c.shares.find("#"+e+" .commentsCnt"),inner:n.inner||append,data:{comments:n.comments||[]}},function(e){e.el.find(".commentLikeAction").on("click",E),e.el.find(".usericoncmt").off("click").on("click",M),t&&t()})},comments:function(n,t,a){t||(t={}),t.comments||(t.comments=lastEls(J.app.platform.sdk.node.shares.storage.trx[n].comments||[])),t.init||(t.init=!1),J.shell({name:"comments",el:c.shares.find("#"+n+" .commentsWrapper"),data:{}},function(e){t.init?(R.leavecomment(n,a),R.commentslist(n,t)):a&&a()})},url:function(e,n,t,a){if(d.nourlload)a&&a();else{var i=J.app.platform.sdk.remote.storage[n],s=e.closest(".share"),o=s.height();J.shell({turi:"share",name:"url",el:e,data:{url:n,og:i,share:t}},function(e){o=y.applyheightEl(o,s,"url");var t=e.el.find("img");e.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,n){e.isLoaded?$(t[n]).addClass("active"):$(t[n]).closest(".image").css("display","none")}),o=y.applyheightEl(o,s,"url"),a&&a()})})}},urlContent:function(n,t){var a=n.url;if(a){var i=c.c.find("#"+n.txid+" .url"),e=J.app.platform.parseUrl(a),s=J.app.platform.sdk.remote.storage[a];a&&!s?"youtube"==e.type||"vimeo"==e.type?t&&t():J.app.platform.sdk.remote.get(a,function(e){e?R.url(i,a,n,t):t&&t()}):t&&t()}else t&&t()},urlsContent:function(e){_.each(e,function(e){R.urlContent(e)})},urls:function(e,n){lazyEach({array:e,sync:!0,action:function(e){R.url(e.item.el,e.item.url,e.item.share,e.success)},all:{success:function(){n&&n()}}})}},j={recomended:function(n,t){c.loader.fadeIn(),c.c.addClass("loading"),o=[],d.author||k?n&&n(o):J.app.platform.sdk.node.shares.recomended({},function(e){o=_.filter(e,function(n){if(!_.find(t,function(e){if(e.txid==n)return!0}))return!0}),J.app.platform.sdk.node.shares.users(e,function(){n&&n(o)})})},begin:function(n){k&&!w?J.app.platform.sdk.node.shares.getbyid(k,function(e){w=!0,n(e)}):n([])},shares:function(i,e){l||p||(c.loader.fadeIn(),c.c.addClass("loading"),l=!0,j.begin(function(a){J.app.platform.sdk.node.shares.common({author:d.author,begin:k||""},function(n,e,t){_.each(a,function(e){e&&n.unshift(e)}),d.filter&&(n=_.filter(n,d.filter)),J.app.platform.sdk.node.shares.users(n,function(){b+=n.length,l=!1,c.c&&((!n||!n.length||n.length<t.count)&&(k||b?c.c.addClass("sharesEnded"):c.c.addClass("sharesZero"),p=!0),c.loader.fadeOut(),i&&i(n,e))})},e)}))}},X=function(){},q=function(){j.shares(function(e,n){e&&R.shares(e,function(){R.sharesInview(e,function(){var e=parameters();if(e.s&&y.openPost(e.s,function(){y.scrollToPost(e.p)}),e.i){var n=deep(J.app.platform,"sdk.node.shares.storage.trx."+e.i),t=null;n&&(e.num&&(t=deep(n,"images."+e.num)),y.openGallery(n,t))}e.v&&(y.scrollToPost(e.v),y.fullScreenVideo(e.v,function(){}))})})},"clear")};return{id:a,primary:t,getdata:function(e,n){delete J.app.platform.sdk.node.shares.clbks.added.lenta,d=n.settings.essenseData||{},y.clear();var t=parameters(),a={beginmaterial:k=t.s||t.i||t.v||null,author:d.author};J.loadTemplate({name:"share"},function(){e(a)})},destroy:function(){window.removeEventListener("scroll",S),window.removeEventListener("scroll",P),window.removeEventListener("resize",C),c={}},init:function(e){i=$(window),X(),(c={}).c=e.el.find("#"+J.map.id),c.shares=c.c.find(".shares"),c.loader=c.c.find(".loader"),console.log("initEventsLENTA"),window.addEventListener("scroll",S),window.addEventListener("resize",C),d.notscrollloading||window.addEventListener("scroll",P),c.c.on("click",".stars i",z),c.c.on("click",".complain",V),c.c.on("click",".imageOpen",W),c.c.on("click",".txid",T),c.c.on("click",".sharecaption",N),c.c.on("click",".message",N),c.c.on("click",".showMore",N),c.c.on("click",".videoTips",D),c.c.on("click",".exitFull",U),c.c.on("click",".subscribe",M),c.c.on("click",".additional",L),c.c.on("click",".asubscribe",H),c.c.on("click",".asubscribePrivate",F),c.c.on("click",".aunsubscribe",I),c.c.on("click",".donate",G),c.c.on("click",".discussion",O),c.c.find(".loadmore button").on("click",Z),c.c.find(".loadprev button").on("click",B),J.app.platform.sdk.node.shares.clbks.added.lenta=function(e){R.shares([e],function(){R.sharesInview([e],function(){})},{inner:prepend})},q(),e.clbk(null,e)}}};return J.run=function(e){var n=J.addEssense(t,a,e);J.init(n,e)},J.stop=function(){_.each(t,function(e){e.destroy()})},J}();"undefined"!=typeof module?module.exports=lenta:(app.modules.lenta={},app.modules.lenta.module=lenta);
 /*_____*/ 
var send=function(){var d=new nModule,a={},t=function(n){var e,a,t=deep(n,"history"),i={stateAction:function(e,a){d.app.user.isState(function(n){n?a():d.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{loginText:d.app.localization.e("llogin"),successHref:e,signInClbk:function(){a&&a()}}})})},send:function(){i.stateAction("_this",function(){d.nav.api.load({open:!0,history:!0,href:"userpage?id=wallet&action=send&address="+a.address+"&amount="+a.amount})})}},s=function(){},o=function(){var n;e.c.find(".send").on("click",i.send),e.am.on("change",function(){var n=$(this).val();a.amount=n}),0<(n={alias:"numeric",groupSeparator:",",radixPoint:".",digits:6,digitsOptional:!1,autoGroup:!0,allowMinus:!1}).digits&&(n.placeholder="0.000000"),e.am.inputmask(n),parameters().setammount||e.am.blur()};return{primary:t,getdata:function(n){var e=parameters();a={},e.address&&bitcoin.address.fromBase58Check(e.address)&&(a.address=e.address),e.amount&&(a.amount=Number(e.amount)),e.label&&(a.label=clearScripts(donottrustLink(findAndReplaceLink(e.label,!0)))),e.message&&(a.message=clearScripts(donottrustLink(findAndReplaceLink(hexDecode(e.message,!0))))),a.amount&&a.address&&a.message?n(a):d.nav.api.load({open:!0,href:"page404",history:!0})},destroy:function(){e={}},init:function(n){s(),(e={}).c=n.el.find("#"+d.map.id),e.am=e.c.find(".amredit"),o(),n.clbk(null,n)}}};return d.run=function(n){var e=d.addEssense(a,t,n);d.init(e,n)},d.stop=function(){_.each(a,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=send:(app.modules.send={},app.modules.send.module=send);
 /*_____*/ 
var imageGalleryEdit=function(){var P=new nModule,a={},n=function(e){var a,n,i=deep(e,"history"),t=null,r=0,l=!1,p=null,o=null,s=null,c={normal:{name:"Normal"},vintage:{name:"Vintage"},oldBoot:{name:"Old Boot"},clarity:{name:"Clarity"},sunrise:{name:"Sunrise"},crossProcess:{name:"Cross Process"},orangePeel:{name:"Orange Peel"},love:{name:"Love"},jarques:{name:"Jarques"},pinhole:{name:"Pinhole"}},d={},f={back:function(){--r<0&&(r=n.images.length-1),y()},next:function(){++r>=n.images.length&&(r=0),y()},initialValue:function(){n.initialValue&&(r=n.initialValue)},filters:function(){return(l=!l)?(a.c.addClass("filters"),h.filters()):a.c.removeClass("filters"),m.resize(),l},caman:function(e,i){var a="#galleryImage";i&&(a=i),o&&!i?e&&e(o):Caman(a,function(){i||(o=this),e&&e(this)})},crop:function(){return p?(p.destroy(),p=null,!1):(f.caman(function(){var e=a.imagesWrapper.find("#galleryImage"),i=e.parent();t=o,n.crop||(n.crop={}),p=new Cropper(e[0],{aspectRatio:n.crop.aspectRatio||null,autoCropArea:n.crop.autoCropArea||.9,crop:function(e){var i=o.width,a=o.height,n={x:e.detail.x/i,y:e.detail.y/a,w:e.detail.width/i,h:e.detail.height/a};d.crop=n},ready:function(){i.find(".cropper-container").addClass(n.crop.style||""),i.find(".cropper-crop-box").append('<div class="applyCrop center" action="apply">\t\t\t\t\t\t\t\t\t<span class="fa fa-check" aria-hidden="true"></span>\t\t\t\t\t\t\t\t</div>'),i.find(".applyCrop").on("click",function(){f.apply("crop"),h.savePanel()})}})}),!0)},camanFilter:function(e,i,a){e.revert(!1),"normal"!=i&&e.newLayer(function(){this.opacity(50),this.copyParent(),this.filter[i]()}),e.render(a)},previewFilter:function(e,i){var a=e.attr("filter"),n=e.attr("imageId");Caman("#"+n,function(){f.camanFilter(this,a,function(){e.animate({opacity:1})})}),e.on("click",function(){f.caman(function(){f.camanFilter(o,a,function(){t=o,d.filter=a,h.savePanel(),m.resize()})})})},applyFilters:function(t,e,r,l){"crop"!=e?"filter"==e&&f.caman(function(e){f.camanFilter(e,t,function(){l&&l()})},r):f.caman(function(e){var i=e.canvas.width,a=e.canvas.height,n={x:t.x*i,y:t.y*a,width:t.w*i,height:t.h*a};e.crop(n.width,n.height,n.x,n.y),e.resize({width:n.width,height:n.height}),e.render(function(){e.resetOriginalPixelData(),e.cropped=!1,e.cropCoordinates={x:0,y:0},e.originalHeight=n.height,e.originalWidth=n.width,e.preScaledHeight=n.height,e.preScaledWidth=n.width,e.resized=!1,r||m.resize(),l&&l()})},r)},apply:function(e,i){e&&d[e]&&(f.applyFilters(d[e],e,i),f[e](),a.c.find('[action="'+e+'"]').removeClass("active"))},close:function(){n.success?(topPreloader(20),n.success(n.images,function(){topPreloader(100),P.closeContainer()})):P.closeContainer()},exit:function(){n.apply&&(f.apply("crop"),f.save(!0)),f.close()},cancel:function(){d={},h.savePanel(),h.image({image:s})},save:function(e){f.checkUpdates()&&(s.original=o.toBase64(),d={},e||(h.savePanel(),h.image({image:s})))},checkUpdates:function(){return!!(d.filter&&"normal"!=d.filter||d.crop)}},m={resize:function(){m.bestFit(a.imagesWrapper.find(".image"),t)},bestFit:function(e,i){var a=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=i.naturalWidth||i.width,r=i.naturalHeight||i.height,l=r/t;console.log("w, h",t,r),e.css("padding-top","0px");var o=e.width(),s=e.height(),c=a.width(),d=a.height();c<o&&(o=c),d<s&&(s=d),o<t&&(r=(t=o)*l),s<=r&&(t=(r=s)/l),console.log(t,r,o,s,e.height(),a.height());var f=(s-r)/2;e.css("padding-top",f+"px"),i.canvas?(console.log(t,r),i.resize({width:t,height:r}),i.render()):(i.width=t,i.height=r,$(i).attr("data-camanwidth",t),$(i).attr("data-camanheight",r),$(i).css("opacity","1")),n.width(t),n.height(r),p&&p.resize({width:t,height:r})},nFormat:function(e){return e<10&&(e="0"+e),e}},u=function(){var e=$(this).attr("action");f[e]()},g=function(){var e=$(this).attr("action"),i=$(this);f[e]()?i.addClass("active"):i.removeClass("active")},h={savePanel:function(){(d.filter&&"normal"!=d.filter||d.crop)&&!n.apply?a.exitPanel.fadeOut(200,function(){a.savePanel.fadeIn(200)}):a.savePanel.fadeOut(200,function(){a.exitPanel.fadeIn(200)})},image:function(i){o=t=null,d={},h.savePanel(),p&&(p.destroy(),p=null,a.editPanel.find('.eitem[action="crop"]').removeClass("active")),a.imageNavigation.find(".number").html(m.nFormat(Number(r)+1)),$(window).off("resize",m.resize),i||(i={}),P.shell({name:"image",el:a.images,inner:html,display:"table",animation:!1,data:{data:n,image:i.image}},function(e){e.el.find("img").imagesLoaded(function(e){t=deep(e,"images.0.img"),s=i.image,m.resize(),$(window).on("resize",m.resize),l&&(l=!l,f.filters()),i.clbk&&i.clbk()})})},filters:function(i){i||(i={}),i.image||(i.image=n.images[r]),a.filters.html(""),resizeFit(i.image.original,80,80,function(e){P.shell({name:"filters",el:a.filters,data:{data:n,image:e,filters:c}},function(e){e.el.find(".preview").each(function(){f.previewFilter($(this),i.image)});var l=e.el.find(".filtersSwipe");swipedetect(l[0],function(e,i,a,n){console.log(l.css("margin-left").replace("px",""));var t=Number(l.css("margin-left").replace("px",""))+Number(1.7*i),r=-l.find(".filtersList").width()+l.closest(".filtersWrapperOvf").width();0<t&&(t=0),t<r&&(t=r),l.css("margin-left",t+"px")})})})}},v=function(){},y=function(){h.image({image:n.images[r],clbk:function(){n.apply&&(f.filters(),f.crop())}})},w=function(e){n.edit?P.nav.api.loadRelations({relations:[{src:"js/vendor/caman.full.min.js",f:"js"},{src:"js/vendor/cropper.js",f:"js"},{src:"css/cropper.min.css",f:"css"}]},e):e&&e()};return{primary:i,getdata:function(e){e({})},destroy:function(){console.log("destroy"),$(window).off("resize",m.resize),a={}},init:function(e){s=t=o=null,l=!1,d={},n=e.essenseData||{},v(),f.initialValue(),(a={}).c=e.el.find("#"+P.map.id),a.imagesWrapper=e.el.find(".imagesWrapper"),a.images=e.el.find(".images"),a.imageNavigation=e.el.find(".imageNavigation"),a.arrows=a.imageNavigation.find(".arrow"),a.editPanel=a.c.find(".editPanel"),a.savePanel=a.c.find(".panel .savePanel"),a.exitPanel=a.c.find(".panel .exitPanel"),a.filters=a.c.find(".filters"),w(function(){y(),a.arrows.on("click",u),a.editPanel.find(".eitem").on("click",g),a.savePanel.find(".sitem").on("click",g),a.exitPanel.find(".sitem").on("click",g),e.clbk(null,e)})},wnd:{class:"allscreen black withoutButtons imageGalleryEdit"}}};return P.run=function(e){var i=P.addEssense(a,n,e);P.init(i,e)},P.stop=function(){_.each(a,function(e){e.destroy()})},P}();"undefined"!=typeof module?module.exports=imageGalleryEdit:(app.modules.imageGalleryEdit={},app.modules.imageGalleryEdit.module=imageGalleryEdit);
 /*_____*/ 
var imageGallery=function(){var u=new nModule,i={},n=function(e){var a,i,n,t=deep(e,"history"),r=null,o=0,s={back:function(){s.prepareImages(),--o<0&&(o=i.images.length-1),p()},next:function(){s.prepareImages(),++o>=i.images.length&&(o=0),p()},initialValue:function(){s.prepareImages(),i.initialValue&&(o=findIndex(i.images,function(e){var a="name";if(i.idName&&(a=i.idName),e[a]==i.initialValue)return!0}))},prepareImages:function(){i.getImages&&(i.images=i.getImages())},prepareImage:function(e,a){i.getImage?i.getImage(e,function(e){a&&a(e)}):a&&a(e)}},m={resize:function(){m.bestFit(a.imagesWrapper.find(".image"),r)},bestFit:function(e,a){var i=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=a.naturalWidth||a.width,r=a.naturalHeight||a.height,o=r/t;e.css("padding-top","0px");var s=e.width(),m=e.height(),g=i.width(),l=i.height();g<s&&(s=g),l<m&&(m=l),s<t&&(r=(t=s)*o),m<=r&&(t=(r=m)/o);var d=(m-r)/2;e.css("padding-top",d+"px"),a.width=t,a.height=r,$(a).attr("data-camanwidth",t),$(a).attr("data-camanheight",r),$(a).animate({opacity:1}),n.width(t),n.height(r)},nFormat:function(e){return e<10&&(e="0"+e),e}},g=function(){if(!n){var e=$(this).attr("action");s[e]()}},l=function(e){a.imageNavigation.find(".number").html(m.nFormat(o+1)),$(window).off("resize",m.resize),e||(e={}),u.shell({name:"image",el:a.images,inner:html,display:"table",data:{data:i,image:e.image}},function(e){e.el.find("img").imagesLoaded(function(e){a.c.removeClass("loading"),n=!1,(r=deep(e,"images.0.img"))&&(m.resize(),$(window).on("resize",m.resize))})})},d=function(){},p=function(){a.c.addClass("loading"),n=!0;var e=i.images[o];u.app.nav.api.history.addParameters({num:o.toString()}),s.prepareImage(e,function(e){l({image:e})})};return{primary:t,getdata:function(e){e({})},destroy:function(){r=null,$(window).off("resize",m.resize),n=!1,console.log("DESTROY"),u.app.nav.api.history.removeParameters(["i"]),u.app.nav.api.history.removeParameters(["num"]),a={}},init:function(e){r=null,n=!1,i=e.essenseData||{},d(),s.initialValue(),(a={}).c=e.el.find("#"+u.map.id),a.imagesWrapper=e.el.find(".imagesWrapper"),a.images=e.el.find(".images"),a.imageNavigation=e.el.find(".imageNavigation"),a.arrows=a.imageNavigation.find(".arrow"),i.gid&&u.app.nav.api.history.addParameters({i:i.gid}),p(),a.arrows.on("click",g),e.clbk(null,e)},wnd:{class:"allscreen black withoutButtons imageGallery"}}};return u.run=function(e){var a=u.addEssense(i,n,e);u.init(a,e)},u.stop=function(){_.each(i,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=imageGallery:(app.modules.imageGallery={},app.modules.imageGallery.module=imageGallery);
 /*_____*/ 
var aboutus=function(){var t=new nModule,o={},e=function(n){var u=deep(n,"history"),o=function(){};return{primary:u,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}};return t.run=function(n){var u=t.addEssense(o,e,n);t.init(u,n)},t.stop=function(){_.each(o,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=aboutus:(app.modules.aboutus={},app.modules.aboutus.module=aboutus);
 /*_____*/ 
var menu=function(){var r=new nModule,t={},i=function(){var i,a=null,t=null,e=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),format:{right:!0},_onChange:function(n){var a=app.localization.findByName(n);a&&a.key!=app.localization.key&&app.localization.set(a.key)}}),o=function(){r.app.nav.clbks.history.menu=l.hambclose.click},c=function(){r.app.user.isState(function(n){})},s=function(){if(i.postssearch.offset()){var n=i.postssearch.offset().left,a=i.postssearch.width(),t=n-(i.c.width()-n-a);i.postssearch.width(a+t)}},l={activate:{click:function(){dialog({header:r.app.localization.e("id167"),html:r.app.localization.e("id168"),class:"one",btn1text:r.app.localization.e("id169"),success:function(){r.app.platform.sdk.user.activateWithDialogs(function(n){})}})}},search:{click:function(){i.c.toggleClass("searchactive"),i.c.hasClass("searchactive")&&(i.postssearch.find("input").focus(),s(),a&&(clearTimeout(a),a=null))}},searchinit:{init:function(n){search(i.postssearch,{placeholder:"SEARCH ON POCKETNET...",clbk:function(n){n.find("input").on("blur",function(){a=slowMade(function(){i.c.removeClass("searchactive")},a,200)})},last:{get:function(){return[]},tpl:function(n,a){}},events:{fastsearch:function(n,a){a(null)},search:function(n,a){}}})}},newaccount:{click:function(){r.nav.api.go({href:"registration",history:!0,open:!0})}},ustate:{click:function(){isMobile()&&r.nav.api.go({href:"userpage?id=ustate&report=ustate",history:!0,open:!0})},init:function(a){isMobile()||r.nav.api.load({open:!0,id:"ustate",el:a,inTooltip:!0});var n=function(){r.app.platform.sdk.ustate.attention(1,function(n){n||!r.app.user.validate()?a.removeClass("hidden"):a.addClass("hidden"),r.app.platform.sdk.ustate.me(function(n){n?a.removeClass("disconected"):a.addClass("disconected")})})};n(),r.app.platform.sdk.ustate.clbks.menu=n}},wallets:{click:function(){r.nav.api.go({open:!0,href:"userpage?id=wallet",history:!0})},init:function(o){var a=o.find(".number"),t=!0,i=0,e=function(i,n){var e="good";o.removeClass("hidden"),n<0&&(e="bad"),a.animateNumber({number:n,numberStep:function(n,a){s(),o.addClass(e);var t=Number(i+n).toFixed(8);$(a.elem).text(r.app.platform.mp.coin(t))}},rand(400,1200),function(){o.removeClass(e)})},c=function(a){var n=i;t||void 0===a?(t=!1,r.app.platform.sdk.node.transactions.get.allBalance(function(n){e(n,a),i=n,r.app.platform.sdk.wallet.drawSpendLine(o.find(".numberWrp"))})):(e(n,a),i=n+a)},n=function(n){c(n)};(r.app.platform.sdk.node.transactions.clbks.menu=n)(0)}},signout:{click:function(){r.app.user.signout(),r.app.reload({href:"authorization"})}},signin:{init:function(n){},click:function(){r.nav.api.go({href:"authorization",history:!0,open:!0})}},signup:{init:function(n){},click:function(){r.nav.api.go({href:"registration",history:!0,open:!0})}},hamb:{click:function(){i.c.hasClass("active")?(i.c.removeClass("active"),r.app.actions.onScroll()):(i.c.addClass("active"),r.app.actions.offScroll())}},hambclose:{click:function(){i.c.removeClass("active"),r.app.actions.onScroll()}}};return{getdata:function(n,a){var t={};e.value=app.localization.current().name,t.loc=e,t._SEO=_SEO,a.state,n(t)},destroy:function(){$(window).off("resize",s),delete r.app.platform.sdk.node.transactions.clbks.menu,t&&clearInterval(t),i={}},init:function(n){(i={}).c=n.el.find("#"+r.map.id),i.a=n.el.find(".additionalbar"),i.cart=i.c.find(".cart"),i.likes=i.c.find(".favorites"),i.messagesCount=i.c.find(".dialogs .count"),i.notificationsCount=i.c.find(".notifications .count"),i.walletsAmount=i.c.find(".wallets .amount"),i.notactive=i.c.find(".notactive"),i.currency=i.c.find(".currencyWrapper"),i.postssearch=i.c.find(".postssearch"),console.log("initEventsMENU"),o(),r.app.user.isState(function(n){}),i.c.find("[events]").each(function(){var t=$(this),n=t.attr("events");l[n]&&_.each(l[n],function(n,a){"init"==a?n(t):t.on(a,n)})}),$(window).on("resize",s),ParametersLive([e],i.c),t=setInterval(c,100),n.clbk(null,n)}}};return r.run=function(n){var a=r.addEssense(t,i,n);r.init(a,n)},r.stop=function(){_.each(t,function(n){n.destroy()})},r}();"undefined"!=typeof module?module.exports=menu:(app.modules.menu={},app.modules.menu.module=menu);
 /*_____*/ 
var navigation=function(){var t=new nModule,o={},a=function(n){var i=deep(n,"history"),o=function(){};return{primary:i,getdata:function(n,i){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}};return t.run=function(n){var i=t.addEssense(o,a,n);t.init(i,n)},t.stop=function(){_.each(o,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=navigation:(app.modules.navigation={},app.modules.navigation.module=navigation);
 /*_____*/ 
var footer=function(){var t=new nModule,o={},n=function(a){var e,o=deep(a,"history"),n=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),possibleValuesLabels:app.localization.availableMap("name"),format:{right:!0},_onChange:function(a){var e=app.localization.findByName(a);e&&e.key!=app.localization.key&&app.localization.set(e.key)}}),i=function(){};return{primary:o,getdata:function(a){var e={};e._SEO=_SEO,e.loc=n,a(e)},destroy:function(){e={}},init:function(a){i(),(e={}).c=a.el.find("#"+t.map.id),ParametersLive([n],e.c),a.clbk(null,a)}}};return t.run=function(a){var e=t.addEssense(o,n,a);t.init(e,a)},t.stop=function(){_.each(o,function(a){a.destroy()})},t}();"undefined"!=typeof module?module.exports=footer:(app.modules.footer={},app.modules.footer.module=footer);
 /*_____*/ 
var support=function(){var r=new nModule,t={},e=function(n){var o,t=deep(n,"history"),e={send:function(){var n=e.values();n?(o.c.removeClass("showError"),topPreloader(20),r.app.platform.sdk.user.support(n,function(){topPreloader(100),dialog({html:r.app.localization.e("contactSuccess"),class:"one"}),$.each(o.inputs,function(){$(this).val("")})})):o.c.addClass("showError")},values:function(){var e={},s=!0;return $.each(o.inputs,function(){var n=$(this),o=n.val(),t=n.attr("systemId");o?e[t]=o:s=!1}),s?e:null}},s=function(){e.send()},u=function(){};return{primary:t,getdata:function(n){n({})},destroy:function(){o={}},init:function(n){u(),(o={}).c=n.el.find("#"+r.map.id),o.send=o.c.find(".send"),o.inputs=o.c.find(".forminput"),o.send.on("click",s),n.clbk(null,n)}}};return r.run=function(n){var o=r.addEssense(t,e,n);r.init(o,n)},r.stop=function(){_.each(t,function(n){n.destroy()})},r}();"undefined"!=typeof module?module.exports=support:(app.modules.support={},app.modules.support.module=support);
 /*_____*/ 
var notifications=function(){var f=new nModule,t={},o=function(n){var o,i=deep(n,"history"),t=function(n,i){"invoice"==i&&f.nav.api.load({open:!0,href:"connection?id="+n+"&invoice=true",history:!0}),"deal"==i&&f.nav.api.load({open:!0,href:"deal?id="+n,history:!0}),f.closeContainer()},e=function(){var n=$(this).attr("type"),i=$(this).attr("id");t(i,n)},a=function(n,i){n||(n={});var t=[];n.seen?n.el=o.seen:n.el=o.new,t=f.app.platform.sdk.notifications.filter("INVOICE",n.seen),console.log(t),t=_.sortBy(t,function(n){return-n.Created}),f.shell({name:"notifications",el:n.el,data:{notifications:t,sdk:f.app.platform.sdk.deals,users:f.app.platform.sdk.users.storage.info}},function(n){0<n.el.find(".notification").length?o.c.find(".empty").fadeOut(1):o.c.find(".empty").fadeIn(1),n.el.find(".notification").on("click",e)})},s=function(){};return{primary:i,getdata:function(i){f.app.platform.sdk.notifications.get(function(n){i({})})},destroy:function(){o={},delete f.app.platform.ws.messages.INVOICE.clbks.notificationsPage},init:function(n){s(),(o={}).c=n.el.find("#"+f.map.id),o.seen=o.c.find(".seenWrapper"),o.new=o.c.find(".newWrapper"),a({seen:!0}),a({}),f.app.platform.ws.messages.INVOICE.clbks.notificationsPage=function(){a()},n.clbk(null,n)},tooltip:{options:{theme:"lighttooltip notificationTolltip",position:"left",zIndex:50,functionPosition:function(n,i,t){return t.coord.top=15,t.coord.left+=10,t}},event:"click"}}};return f.run=function(n){var i=f.addEssense(t,o,n);f.init(i,n)},f.stop=function(){_.each(t,function(n){n.destroy()})},f}();"undefined"!=typeof module?module.exports=notifications:(app.modules.notifications={},app.modules.notifications.module=notifications);
 /*_____*/ 
var panel=function(){var a=new nModule,i={},o=function(n){var e,i=deep(n,"history"),o=function(){a.nav.api.load({open:!0,id:"discussions",el:e.cnt,animation:!1,clbk:function(n,e){}})},t=function(){};return{primary:i,getdata:function(n){n({})},destroy:function(){e={}},init:function(n){t(),(e={}).c=n.el.find("#"+a.map.id),e.cnt=e.c.find(".panelcnt"),o(),n.clbk(null,n)}}};return a.run=function(n){var e=a.addEssense(i,o,n);a.init(e,n)},a.stop=function(){_.each(i,function(n){n.destroy()})},a}();"undefined"!=typeof module?module.exports=panel:(app.modules.panel={},app.modules.panel.module=panel);
 /*_____*/ 
var discussions=function(){var o=new nModule,i={},u=function(n){var s=deep(n,"history"),i=function(){};return{primary:s,getdata:function(n){n({})},destroy:function(){({})},init:function(n){i(),{}.c=n.el.find("#"+o.map.id),n.clbk(null,n)}}};return o.run=function(n){var s=o.addEssense(i,u,n);o.init(s,n)},o.stop=function(){_.each(i,function(n){n.destroy()})},o}();"undefined"!=typeof module?module.exports=discussions:(app.modules.discussions={},app.modules.discussions.module=discussions);
 /*_____*/ 
var authorization=function(){var c=new nModule,a={},t=function(e){var o,t,i,l=deep(e,"history"),n="secondary";l&&(n="primary"),e.inWnd&&(n="window");var a=function(){localStorage.stay="",localStorage.mnemonic,c.app.user.stay=!1},s=new Parameter({type:"BOOLEAN",name:"stay",id:"stay",name:"Stay Signed",_onChange:function(e){console.log(e),e?dialog({html:c.app.localization.e("staysafe"),btn1text:c.app.localization.e("dyes"),btn2text:c.app.localization.e("dno"),fail:function(){s.value=0,s.el.removeAttr("checked"),a()},class:"yesnodialog"}):a()}}),r={login:function(){var e,a={},n=trim(o.login.val());(e=n,bitcoin.bip39.validateMnemonic(e))&&(localStorage.stay=s.value,c.user.stay=s.value,c.user.signin(n,function(e){if(e){var n={};n.href=t.successHref,!n.href&&l&&(n.href=function(){return c.app.user.validate()?"index":"filluser"}),n.nav=t.nav,n.clbk=function(){topPreloader(100);var e=deep(i,"container.close");e&&e(),t.signInClbk&&t.signInClbk()},"_this"==deep(t,"successHref")?c.app.reloadModules(function(){if(c.app.user.validate()){var e=deep(i,"container.close");e&&e(),t.signInClbk&&t.signInClbk()}else c.nav.api.loadSameThis("filluser",a)}):c.app.reload(n)}else dialog({class:"one",header:c.app.localization.e("id98"),html:c.app.localization.e("id99"),btn1text:c.app.localization.e("daccept"),btn2text:c.app.localization.e("dcancel")})}))}};return{primary:l,id:n,getdata:function(e,n){if(n.state&&l)c.nav.api.load({open:!0,href:"index",history:!0});else{s.value=localStorage.stay||0;var a=localStorage.mnemonic||"";s.value||(a=""),e({stay:s,mnemonic:a})}},destroy:function(){o={}},init:function(e){var n,a;(o={}).c=e.el.find("#"+c.map.id),o.login=o.c.find(".loginValue"),o.pwd=o.c.find(".pwdValue"),o.enter=o.c.find(".enter"),o.toRegistration=o.c.find(".toRegistration"),o.forgotPassword=o.c.find(".forgotPassword"),t=e.essenseData||{},n=i=e,o.enter.on("click",r.login),o.toRegistration.on("click",function(){c.nav.api.loadSameThis("registration",n)}),initUpload({el:o.c.find(".uploadFile"),ext:["txt","png"],dropZone:o.c,action:function(e,n){if("png"==e.ext)grayscaleImage(e.base64,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?sitemessage(c.app.localization.e("filedamaged")):(o.login.val(trim(e)),r.login())},qrscanner.q.decode(e)});else{var a=e.base64.split(",")[1],t=b64_to_utf8(a).split("/");t[1]?(o.login.val(trim(t[1])),r.login()):sitemessage(c.app.localization.e("filedamaged"))}}}),o.c.find("input").on("focus",function(){o.c.find(".inputTable").addClass("typeactive")}),o.c.find("input").on("blur",function(){o.c.find(".inputTable").removeClass("typeactive")}),a=parameters(),ParametersLive([s],o.c),a.restore&&r.forgotPassword(),dialog({html:"<p>Pocketnet.app is still under development.</p><p>You may experience outages due to development work. <b>Beta test starts on Jan 3, 2019</b>.</p>",id:"betasign",class:"betasign"}),e.clbk(null,e)},tooltip:{options:{position:"left",functionPosition:function(e,n,a){return a.coord.top=10,a.coord.left+=10,a}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen"}}};return c.run=function(e){var n=c.addEssense(a,t,e);c.init(n,e)},c.stop=function(){_.each(a,function(e){e.destroy()})},c}();"undefined"!=typeof module?module.exports=authorization:(app.modules.authorization={},app.modules.authorization.module=authorization);
 /*_____*/ 
var addaccount=function(){var c=new nModule,o={},t=function(n){var i,o,e=deep(n,"history"),t="secondary";e&&(t="primary"),n.inWnd&&(t="window");var a=function(){var n,e=trim(i.login.val());(n=e,bitcoin.bip39.validateMnemonic(n))&&(o.success&&o.success(e),c.closeContainer())};return{primary:e,id:t,getdata:function(n,e){n({})},destroy:function(){i={}},init:function(n){(i={}).c=n.el.find("#"+c.map.id),i.login=i.c.find(".loginValue"),i.enter=i.c.find(".enter"),o=n.essenseData||{},n,i.enter.on("click",a),initUpload({el:i.c.find(".uploadFile"),ext:["txt","png"],dropZone:i.c,action:function(n,e){if("png"==n.ext)grayscaleImage(n.base64,function(n){qrscanner.q.callback=function(n){"error decoding QR Code"==n?sitemessage(c.app.localization.e("filedamaged")):(i.login.val(trim(n)),a())},qrscanner.q.decode(n)});else{var o=n.base64.split(",")[1],t=b64_to_utf8(o).split("/");t[1]?(i.login.val(trim(t[1])),a()):sitemessage(c.app.localization.e("filedamaged"))}}}),n.clbk(null,n)},tooltip:{options:{position:"left",functionPosition:function(n,e,o){return o.coord.top=10,o.coord.left+=10,o}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen"}}};return c.run=function(n){var e=c.addEssense(o,t,n);c.init(e,n)},c.stop=function(){_.each(o,function(n){n.destroy()})},c}();"undefined"!=typeof module?module.exports=addaccount:(app.modules.addaccount={},app.modules.addaccount.module=addaccount);
 /*_____*/ 
var scheduler=function(){var f=new nModule,t={},n=function(e){var s,r,a=deep(e,"history"),t=[],n=null,i=function(a){return _.find(t,function(e){return e.id==a})},o=function(a){return findIndex(t,function(e){return e.id==a})},d={postInterval:function(){n=setInterval(function(){var e=d.taskForTime();l.time(),e.length&&lazyEach({array:e,sync:!0,action:function(e){var a=e.item;f.app.platform.sdk.node.transactions.get.unspent(function(){d.post(a,function(){e.success()})},null,!0)}})},6e4)},missed:function(e){dialog({html:"You have <b>"+e.length+"</b> missed posts. Do you want to share it?",btn1text:"Yes",btn2text:"No",success:function(){_.each(e,function(e){d.post(e)})},fail:function(){_.each(e,function(e){e.time=null,l.task(e,null,!0)})}})},taskForTime:function(){var a=new Date;return _.filter(t,function(e){if(e.time&&e.ready&&a>e.time&&!e.remove)return!0})},post:function(n,s){if(n.share){var e=n.share.validation();e?(sitemessage(e),d.failPost(n.id),s&&s(!1)):f.app.platform.sdk.pool.dumpKey(r,n.address,function(e){if(e){var a=bitcoin.ECPair.fromPrivateKey(Buffer.from(e,"hex")),t=bitcoin.payments.p2pkh({pubkey:a.publicKey});n.module.post(function(e,a){e?d.successPost(n.id):(sitemessage(a),d.failPost(n.id)),s&&s(e)},{address:t,keys:a})}else sitemessage("noprivateley")})}else console.log("task",n),sitemessage("error"),d.failPost(n.id),s&&s(!1)},add:function(){var e={time:null,id:makeid(),share:new Share,address:f.app.platform.sdk.address.pnet().address,ready:!1};e.share.on.change.scheduler=function(){u.save()},t.push(e),l.task(e),u.save()},remove:function(e){var a=o(e);t.splice(a,1),u.save(),s.c.find('.shareAppendWrapper[t="'+e+'"]').remove()},failPost:function(a){var e=i(a);e.time=null,l.task(e,function(){l.ready();var e=s.c.find('.shareAppendWrapper[t="'+a+'"] .result');e.html('<i class="fas fa-exclamation-circle"></i>'),e.addClass("bad")},!0)},successPost:function(e){i(e).remove=!0;var a=s.c.find('.shareAppendWrapper[t="'+e+'"] .result');a.html('<i class="far fa-check-circle"></i>'),a.addClass("good"),l.ready(),u.save()}},c=function(){var e=$(this).closest(".shareTimeWrapper").attr("task"),a=i(e),t=function(){d.remove(e)};a&&(a.share.validation()?t():dialog({html:"Do you really want to remove this task?",btn1text:"Yes",btn2text:"No",success:t}))},l={tasks:function(e){lazyEach({array:t,action:function(e){var a=e.item;l.task(a,e.success)},sync:!0,all:{success:e}})},task:function(t,n,e){e||s.tasks.append('<div class="shareAppendWrapper" t="'+t.id+'">'),_el=s.tasks.find('.shareAppendWrapper[t="'+t.id+'"]'),f.shell({name:"task",el:_el,data:{task:t}},function(e){e.el.find(".remove").on("click",c);var a=e.el.find('.shareTimeWrapper[task="'+t.id+'"] .shareContainer');f.nav.api.load({open:!0,id:"share",el:a,animation:!1,_id:t.id,essenseData:{daddress:t.address||f.app.platform.sdk.address.pnet().address,dtype:t.ready,share:t.share,exoprtByTime:!0,pack:r||{},time:t.time,notClear:!0,changeArrange:function(){u.save()},selectTime:function(e){t.time=e,l.ready(),u.save()},address:function(e){t.address=e,l.ready(),u.save()},type:function(e){"p"==e&&d.post(t,function(){}),"t"==e&&(t.ready=!0),"w"==e&&(t.ready=!1),l.time(),l.ready(),u.save()}},clbk:function(e,a){t.module=a,n&&n()}})})},time:function(){var e=new Date;s.c.find(".timeCellWrapper .time").html(e.getHours()+":"+e.getMinutes())},ready:function(){var a=new Date,e=_.filter(t,function(e){if(e.time&&e.ready&&a<e.time&&!e.remove)return!0});s.c.find(".activeTasks .count").html(e.length)}},u={save:function(){var e=_.filter(t,function(e){if(!e.remove)return!0}),a=_.map(e,function(e){var a=null;return e.time&&(a=dateToStr(e.time)),{time:a,id:e.id,share:e.share.export(!0),address:e.address,ready:e.ready}});localStorage.tasks=JSON.stringify(a)},load:function(){var e=JSON.parse(localStorage.tasks||"[]");t=_.map(e,function(e){var a=new Share;a.import(e.share),a.on.change.scheduler=function(){u.save()};var t=null;return e.time&&(t=strToDate(e.time)),{time:t,id:e.id,share:a,address:e.address,ready:e.ready||!1}})}};return{primary:a,getdata:function(e){u.load(),e({tasks:t})},destroy:function(){s={},n&&clearInterval(n),n=null},init:function(e){var a,t,n;u.load(),(s={}).c=e.el.find("#"+f.map.id),s.tasks=s.c.find(".shares"),s.add=s.c.find(".addshare"),s.add.on("click",d.add),d.postInterval(),a=f.app.platform.sdk.address.pnet().address,t=f.app.platform.sdk.pool.getPack(a),n=function(){l.tasks();var e=d.taskForTime();l.time(),l.ready(),e.length&&d.missed(e)},t?(r=t[0],f.app.platform.sdk.pool.info(r,function(){n()})):n(),e.clbk(null,e)}}};return f.run=function(e){var a=f.addEssense(t,n,e);f.init(a,e)},f.stop=function(){_.each(t,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=scheduler:(app.modules.scheduler={},app.modules.scheduler.module=scheduler);
 /*_____*/ 
var main=function(){var d=new nModule,e={},i=function(n){var a,i=deep(n,"history"),e=null,t=null,o=function(){isMobile()||d.nav.api.load({open:!0,id:"share",el:a.share,animation:!1,clbk:function(n,a){e&&e.apply()}})},u=function(){d.nav.api.load({open:!0,id:"lenta",el:a.lenta,animation:!1,mid:"main",clbk:function(n,a){t=a,e&&e.apply()}})},l=function(){},c=function(){o()};return{primary:i,authclbk:function(){c(),a.c.find(".bgCaption").removeClass("hidden")},getdata:function(n,a){a.state;n({})},destroy:function(){e&&e.destroy(),t&&t.destroy(),t=e=null},init:function(n){t=e=null,l(),(a={}).c=n.el.find("#"+d.map.id),a.share=a.c.find(".share"),a.lenta=a.c.find(".lentaWrapper"),a.panel=a.c.find(".panel"),u(),d.app.user.isState(function(n){n&&c()})}}};return d.run=function(n){var a=d.addEssense(e,i,n);d.init(a,n)},d.stop=function(){var i=null;return _.each(e,function(n){var a=n.destroy();a&&(i=a)}),i},d.authclbk=function(){_.each(e,function(n){n.authclbk()})},d}();"undefined"!=typeof module?module.exports=main:(app.modules.main={},app.modules.main.module=main);
 /*_____*/ 
var author=function(){var m=new nModule,a={},n=function(e){var o,a,s=deep(e,"history"),n=function(){_.each(c,function(e){e.active=!1,e.module&&e.module.destroy()})},r=function(n){var e=new Unsubscribe;e.address.set(o.address),topPreloader(10),m.sdk.node.transactions.create.commonFromUnspent(e,function(e,s){if(e){var a=deep(app,"platform.sdk.users.storage."+m.user.address.value.toString("hex"));a&&a.removeRelation({adddress:o.address})}topPreloader(100),n(e,s)})},t=function(n){var e=new Subscribe;e.address.set(o.address),topPreloader(10),m.sdk.node.transactions.create.commonFromUnspent(e,function(e,s){if(e){var a=deep(app,"platform.sdk.users.storage."+m.user.address.value.toString("hex"));a&&a.addRelation({adddress:o.address,private:!1})}topPreloader(100),n(e,s)})},i=function(n){var e=new SubscribePrivate;e.address.set(o.address),topPreloader(10),m.sdk.node.transactions.create.commonFromUnspent(e,function(e,s){if(e){var a=deep(app,"platform.sdk.users.storage."+m.user.address.value.toString("hex"));a&&a.addRelation({adddress:o.address,private:!0})}topPreloader(100),n(e,s)})},d=function(){r(function(e,s){e?a.subscribe.removeClass("subscribed"):sitemessage(s)})},u=function(){t(function(e,s){e?a.subscribe.addClass("subscribed"):sitemessage(s)})},l=function(){i(function(e,s){e?a.subscribe.addClass("subscribed"):sitemessage(s)})},c={shares:{name:m.app.localization.e("uposts"),mobile:'<i class="fas fa-align-justify"></i>',id:"shares",render:"lenta",count:function(){return 0}},followers:{name:m.app.localization.e("followers"),mobile:'<i class="fas fa-users"></i>',id:"followers",render:"followers",count:function(){return 0}},following:{name:m.app.localization.e("following"),id:"following",mobile:'<i class="fas fa-user-plus"></i>',render:"following",count:function(){return deep(o,"data.subscribes.length")||0}},settings:{name:m.app.localization.e("settings")+' <i class="fas fa-cog"></i>',mobile:'<i class="fas fa-cog"></i>',id:"settings",href:"userpage?id=test",class:"tosettings",if:function(){if(m.user.isItMe(o.address))return!0}}},p={report:function(e){n(),e.active=!0,m.app.nav.api.history.addParameters({report:e.id}),p[e.render](a.lenta,e),p.menu()},menu:function(s){m.shell({name:"menu",el:a.menu,data:{reports:c},animation:"fadeIn"},function(e){e.el.find(".toReport").on("click",function(){var e=$(this).attr("report");p.report(c[e])}),s&&s()})},userslist:function(e,s,a,n,o){m.nav.api.load({open:!0,id:"userslist",el:e,animation:!1,essenseData:{addresses:s,empty:a,caption:n},clbk:function(e,s){o&&o(e,s)}})},followers:function(e,a){var s=_.map(deep(o,"data.followers")||[],function(e){return e.adddress}),n=m.app.localization.e("anofollowers");m.user.isItMe(o.address)&&(n=m.app.localization.e("aynofollowers")),p.userslist(e,s,n,"Followers",function(e,s){a.module=s})},following:function(e,a){var s=_.map(deep(o,"data.subscribes")||[],function(e){return e.adddress}),n=m.app.localization.e("anofollowing");m.user.isItMe(o.address)&&(n=m.app.localization.e("aynofollowing")),p.userslist(e,s,n,"Following",function(e,s){a.module=s})},lenta:function(e,a){m.nav.api.load({open:!0,id:"lenta",el:e,animation:!1,mid:o.address,essenseData:{author:o.address,byauthor:!0},clbk:function(e,s){a.module=s}})}},f=function(){};return{primary:s,getdata:function(e){o={};var s=parameters();o.address=s.address,m.sdk.users.get(o.address,function(){m.sdk.ustate.get(o.address,function(){m.app.platform.sdk.address.pnet()&&o.address==m.app.platform.sdk.address.pnet().address?c.shares.name=m.app.localization.e("myuposts"):c.shares.name=m.app.localization.e("uposts"),o.data=m.sdk.users.storage[o.address],o.state=m.sdk.ustate.storage[o.address],e({author:o})})})},destroy:function(){n(),a={}},init:function(e){var s;f(),(a={}).c=e.el.find("#"+m.map.id),a.lenta=a.c.find(".lentaWrapper"),a.menu=a.c.find(".usermenu"),a.subscribe=a.c.find(".subscribebuttons"),s=parameters().report||"shares",p.report(c[s]),p.menu(),a.subscribe.find(".subscribe").on("click",u),a.subscribe.find(".unsubscribe").on("click",d),a.subscribe.find(".subscribeprivate").on("click",l),e.clbk(null,e)}}};return m.run=function(e){var s=m.addEssense(a,n,e);m.init(s,e)},m.stop=function(){_.each(a,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=author:(app.modules.author={},app.modules.author.module=author);
 /*_____*/ 
var post=function(){var p=new nModule,t={},a=function(n){var a,o,e=deep(n,"history"),t={additional:function(e,n){n?(e.addClass("showAdditional"),e.find(".subscribeWrapper").fadeIn()):(e.removeClass("showAdditional"),e.find(".subscribeWrapper").fadeOut())},position:function(){var e=($(window).height()-a.wr.height())/2;0<e?a.wr.css("margin-top",e+"px"):a.wr.css("margin-top","0px")},initVideo:function(e){var n=a.c.find(".js-player");n.length&&new Plyr(n[0],{autoplay:!0,resetOnEnd:!0}).on("ready",function(){e&&e()})},like:function(e,t){var n=o.upvote(e);p.sdk.node.transactions.create.commonFromUnspent(n,function(e,n){console.log(e,n),topPreloader(100),e?(dialog({html:"<b>TXID:</b> "+e.txid,class:"one"}),t&&t()):sitemessage(errors.upvote[n])})},complain:function(t){var e=o.complain();p.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){console.log(e,n),topPreloader(100),e?(dialog({html:"<b>TXID:</b> "+e.txid,class:"one"}),t&&t(!0)):(a.postWrapper.addClass("showError"),sitemessage(errors.complain[n]),t&&t())})},unsubscribe:function(e,t){var n=new Unsubscribe;n.address.set(e),topPreloader(10),p.sdk.node.transactions.create.commonFromUnspent(n,function(e,n){topPreloader(100),t(e,n)})},subscribe:function(e,t){var n=new Subscribe;n.address.set(e),topPreloader(10),p.sdk.node.transactions.create.commonFromUnspent(n,function(e,n){console.log(e,n),topPreloader(100),t(e,n)})},subscribePrivate:function(e,t){var n=new SubscribePrivate;n.address.set(e),topPreloader(10),p.sdk.node.transactions.create.commonFromUnspent(n,function(e,n){console.log(e,n),topPreloader(100),t(e,n)})},openGallery:function(e){var n=_.map(o.images,function(e){return{src:e}});p.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:{initialValue:e,idName:"src",images:n}})}},s=function(){p.app.platform.sdk.node.transactions.get.tx(o.txid)},i=function(){var e=$(this).closest(".stars");if(!e.attr("value")){var n=$(this).attr("value");t.stateAction("_this",function(){t.like(n),e.attr("value",n),e.addClass("liked"),_scrollTo(e)})}},r=function(){dialog({html:"Do yor really want to complain on this post?",btn1text:"Yes",btn2text:"No",success:function(){a.share.addClass("complained"),topPreloader(30),t.complain(function(e){topPreloader(100),e||n.removeClass("hidden")})}})},d=function(){var e=$(this).attr("i");t.openGallery(e)},c={empty:function(){p.shell({name:"empty",el:a.share},function(e){t.position()})},images:function(e){var n=a.c.find(".image"),t=a.c.find(".images");!t.hasClass("active")&&n.length&&t.length?n.imagesLoaded({background:!0},function(s){"a"!=o.settings.v&&_.each(s.images,function(e,n){var t=e.img,a=$(s.elements[n]).closest(".imagesWrapper"),o=a.width();a.height(),t.width,t.height;a.height(o*(t.height/t.width))}),t.addClass("active"),n.addClass("active"),e&&e()}):e&&e()},share:function(n){p.shell({turi:"lenta",name:"share",el:a.share,data:{share:o,all:!0}},function(e){t.position(),a.wr.addClass("active"),c.url(function(){t.position(),c.urlContent(function(){t.position(),t.initVideo(),c.images(function(){t.position(),n&&n()})})})})},url:function(n){var e=o.url,t=p.app.platform.sdk.remote.storage[e];p.shell({turi:"share",name:"url",el:a.c.find(".url"),data:{url:e,og:t,share:o}},function(e){var t=e.el.find("img");e.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,n){e.isLoaded?$(t[n]).addClass("active"):$(t[n]).closest(".image").css("display","none")}),n&&n()})})},urlContent:function(n){var e=o.url;if(e){var t=p.app.platform.parseUrl(e),a=p.app.platform.sdk.remote.storage[e];e&&!a?"youtube"==t.type||"vimeo"==t.type?n&&n():p.app.platform.sdk.remote.get(e,function(e){e?c.url(n):n&&n()}):n&&n()}else n&&n()}},l=function(){};return{primary:e,getdata:function(e,n){var t=deep(n,"settings.essenseData.share");if(o=null,t&&!(o=p.app.platform.sdk.node.shares.storage.trx[t])){var a=_.find(p.sdk.node.transactions.temp.share,function(e){return e.txid==t});(o=new pShare)._import(a),o.temp=!0,o.address=p.app.platform.sdk.address.pnet().address}e({})},destroy:function(){a={},p.app.nav.api.history.removeParameters(["s"])},init:function(e){l(),(a={}).c=e.el.find("#"+p.map.id),a.share=a.c.find(".share"),a.wr=a.c.find(".postWrapper"),a.c.on("click",".stars i",i),a.c.on("click",".complain",r),a.c.on("click",".image",d),a.c.on("click",".txid",s),o?c.share():c.empty(),p.app.nav.api.history.addParameters({s:o.txid}),e.clbk(null,e)},wnd:{class:"withoutButtons postwindow",close:function(){p.app.nav.api.history.removeParameters(["s"])}}}};return p.run=function(e){var n=p.addEssense(t,a,e);p.init(n,e)},p.stop=function(){_.each(t,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=post:(app.modules.post={},app.modules.post.module=post);
 /*_____*/ 
var userslist=function(){var f=new nModule,s={},t=function(e){var s,t,n=deep(e,"history"),i=[],o=!1,r=0,u=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!t&&!o&&c()},d=function(e,n){f.shell({name:"users",el:s.users,data:{addresses:e,commonkey:"subscribes"},inner:append},function(e){n&&n()})},a=function(e,n){t||(t=!0,topPreloader(80),f.sdk.users.get(e,function(){t=!1,topPreloader(100),n&&n()}))},c=function(e){var n=_.filter(i,function(e,n){if(10*r<=n&&n<10*(r+1))return!0});n.length?(a(n,function(){d(n,e)}),r++):o=!0},l=function(){};return{primary:n,getdata:function(e,n){r=0,t=o=!1;var s={};i=deep(n.settings,"essenseData.addresses")||[],s.addresses=i,s.empty=deep(n.settings,"essenseData.empty"),s.caption=deep(n.settings,"essenseData.caption"),e(s)},destroy:function(){window.removeEventListener("scroll",u),s={}},init:function(e){l(),(s={}).c=e.el.find("#"+f.map.id),s.users=s.c.find(".users"),c(function(){window.addEventListener("scroll",u)}),e.clbk(null,e)}}};return f.run=function(e){var n=f.addEssense(s,t,e);f.init(n,e)},f.stop=function(){_.each(s,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=userslist:(app.modules.userslist={},app.modules.userslist.module=userslist);
 /*_____*/ 
var ustate=function(){var c=new nModule,n={},o=function(t){var n,o,e=deep(t,"history"),a=makeid(),i={profileInfo:{vis:"profileInfo",name:c.app.localization.e("sprofile"),bad:function(){return!c.app.user.validate()}},post:{key:"post",vis:"scale",name:c.app.localization.e("spc"),bad:function(t){if(t<=2)return!0}},score:{key:"score",vis:"scale",name:c.app.localization.e("ssc"),bad:function(t){if(t<=8)return!0}},reputation:{key:"reputation",vis:"number",name:c.app.localization.e("srep"),bad:function(t){return!1}}},s=function(e){c.shell({name:"uscnt",el:n.c,data:{mestate:o,metrics:i}},function(t){e&&e()})},u=function(e){var t=i;i.profileInfo.bad()&&(t={profileInfo:i.profileInfo,reputation:i.reputation}),c.shell({name:"ustatecontent",el:n.ustatecontent,data:{metrics:t,mestate:o}},function(t){e&&e()})},p=function(){},r=function(){c.app.platform.sdk.ustate.me(function(t){o=t,console.log("mestate",o),s(function(){n.ustatecontent=n.c.find(".ustatecontent"),u()})})};return{primary:e,getdata:function(t){t({})},destroy:function(){n={},delete c.app.platform.sdk.ustate.clbks[a]},init:function(t){p(),(n={}).c=t.el.find("#"+c.map.id),(c.app.platform.sdk.ustate.clbks[a]=r)()},tooltip:{options:{minWidth:380,position:"left",functionPosition:function(t,e,n){return n.coord.top=10,n.coord.left+=10,n},theme:"tooltipster-light zindex ustatetooltip"}}}};return c.run=function(t){var e=c.addEssense(n,o,t);c.init(e,t)},c.stop=function(){_.each(n,function(t){t.destroy()})},c}();"undefined"!=typeof module?module.exports=ustate:(app.modules.ustate={},app.modules.ustate.module=ustate);