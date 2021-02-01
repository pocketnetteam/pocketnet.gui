
 /*_____*/ 
var pkview=function(){function i(n){var e,i=deep(n,"history"),a={},t={qrcode:function(n,e){return new QRCode(n[0],{text:e,width:256,height:256})},mnemonic:function(n){var o="",t=(a.mnemonicMask.length*n/100).toFixed(0);return _.each(a.mnemonicKey,function(n,e){var i=_.indexOf(a.mnemonicMask,e);o+=i<t||" "==n?n:c.app.platform.values.alph[rand(0,c.app.platform.values.alph.length-1)]}),o},mnemonicEffect:function(i,n,e){var o=indexArray(101);n&&o.reverse(),lazyEach({array:o,sync:!0,action:function(n){var e=n.item;i.html(t.mnemonic(e)),h=i.height(),setTimeout(n.success,rand(1,5))},all:{success:function(){e&&e()}}})},key:function(o){c.shell({name:"key",el:e.c.find(".keywrapper"),data:a,animation:{id:"slide"}},function(e){var n=e.el.find(".mnemonicKey");t.mnemonicEffect(n,!1,function(){});var i=t.qrcode(e.el.find(".qrcode"),a.mk);e.el.find(".copy").on("click",function(){copyText(e.el.find(".hiddenMnemonicKey")),sitemessage(c.app.localization.e("successfullycopied"))}),e.el.find(".save").on("click",function(){var n=e.el.find(".qrcode img").attr("src");saveAs({file:n,format:"png",name:"pocketnetkey"})}),window.cordova&&e.el.find(".qrcode").on("click",function(){menuDialog({items:[{text:c.app.localization.e("e13145"),class:"itemmain",action:function(n){var e=b64toBlob(i._oDrawing._elImage.currentSrc.split(",")[1],"image/png",512);saveAsWithCordova(e,"pkey"+c.app.platform.currentTime()+".png",function(){n()})}}]})}),o&&o(e)})},dontshowagain:function(){e.c.find(".dontshowagain").addClass("active")}},o=function(){};return{primary:i,getdata:function(n,e){n({})},destroy:function(){e={}},init:function(n){o(),(e={}).c=n.el.find("#"+c.map.id),e.c.find(".dontshowagain").on("click",function(){c.closeContainer(),c.app.platform.sdk.registrations.remove(),isMobile()&&app.nav.api.load({open:!0,href:"index",history:!0})}),function(){a={};var n=localStorage.mnemonic;n&&c.app.platform.cryptography.api.aeswc.decryption(n,c.app.options.fingerPrint,{},function(n){if(n){if(bitcoin.bip39.validateMnemonic(n)){var e=c.app.user.keysFromMnemo(trim(n));a.mk=e.privateKey.toString("hex")}else a.mk=n;a.mnemonicKey=n,a.mnemonicMask=_.shuffle(indexArray(a.mnemonicKey.length)),a.mnemonicContent=a.mnemonicKey.split(" "),t.key(),setTimeout(function(){t.dontshowagain()},2e3)}})}(),n.clbk(null,n)},wnd:{class:"allscreen black withoutButtons pkviewwnd"}}}var c=new nModule,o={};return c.run=function(n){var e=c.addEssense(o,i,n);c.init(e,n)},c.stop=function(){_.each(o,function(n){n.destroy()})},c}();"undefined"!=typeof module?module.exports=pkview:(app.modules.pkview={},app.modules.pkview.module=pkview);
 /*_____*/ 
var about=function(){function n(e){var n,t,a,i=deep(e,"history"),o=null,s=null,c={videoWidth:function(e){var t=560,n=315,a=e.width(),i=a/(t/n);e.find("iframe").width(a),e.find("iframe").height(i)},time:function(){today=new Date,today=Math.floor((t-today)/1e3),tsec=today%60,today=Math.floor(today/60),tsec<0?tsec="00":tsec<10&&(tsec="0"+tsec),tmin=today%60,today=Math.floor(today/60),tmin<0?tmin="00":tmin<10&&(tmin="0"+tmin),thour=today%24,today=Math.floor(today/24),thour<0&&(thour="00"),today<0&&(today="00"),n.days.html(today),n.seconds.html(tsec),n.minutes.html(tmin),n.hours.html(thour)},fixed:function(){var e=$(window).scrollTop();n.main.offset().top+n.main.height()<e?n.fixed.addClass("active"):n.fixed.removeClass("active")},explore:function(){var e=n.c.find(".faq");_scrollToTop(e)},validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,t,n,a){a=a||"4";var i={Email:e,Name:t};i.Action||(i.Action="ADDTOMAILLIST"),i.TemplateID||(i.TemplateID=a),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:i,dataType:"json",success:function(){n&&n()}})},joinSuccess:function(e){p.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){p.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var t=e.el.find(".email"),n=e.el.find(".name"),a=t.val(),i=n.val();if(c.validateEmail(a)&&i)return c.saveEmail(a,i),c.joinSuccess(a,i),!0},clbk:function(e){function t(){var e=a.val(),t=n.val();return c.validateEmail(e)&&t?(i.removeClass("disabled"),!0):(i.addClass("disabled"),!1)}var n=e.find(".name"),a=e.find(".email"),i=e.find(".btn1");i.addClass("disabled"),i.on("click",function(){}),n.focus(),n.on("change",t),n.on("keyup",t),a.on("change",t),a.on("keyup",t)},class:"one joinbeta"})},{action:e})},whitepaperSuccess:function(){p.fastTemplate("whitepaperSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})})},whitepaper:function(){p.fastTemplate("whitepaper",function(e){dialog({html:e,wrap:!0,success:function(e){var t=e.el.find("input").val();if(c.validateEmail(t))return c.saveEmail(t,"",null,"5"),c.whitepaperSuccess(),!0},clbk:function(e){function t(){var e=$(this).val();return c.validateEmail(e)?(n.removeClass("disabled"),!0):(n.addClass("disabled"),!1)}var n=e.find(".btn1");n.addClass("disabled"),n.on("click",function(){});var a=e.find("input");a.focus(),a.on("change",t),a.on("keyup",t)},class:"one joinbeta"})})}},l=function(){c.whitepaper()},d=function(){c.join()},r=function(){var e=$(this).attr("answer");e&&s.send(e,function(){f.survey()})},u=[{name:"Twitter",icon:'<i class="fab fa-twitter"></i>',href:"https://twitter.com/Pocket_Net"},{name:"Telegram",icon:'<i class="fab fa-telegram"></i>',href:"https://t.me/PocketRep"},{name:"Facebook",icon:'<i class="fab fa-facebook"></i>',href:"https://www.facebook.com/PocketNet"},{name:"Minds",image:"https://cdn-assets.minds.com/front/dist/assets/logos/bulb.svg",href:"https://www.minds.com/PocketNet"},{name:"Linkedin",icon:'<i class="fab fa-linkedin"></i>',href:"https://www.linkedin.com/company/cryptolo-io"},{name:"Mastodon",icon:'<i class="fab fa-mastodon"></i>',href:"https://mastodon.social/@PocketRep"},{name:"Gab",image:"https://gab.com/assets/img/logo-dec.png",href:"https://gab.com/PocketNet"},{name:"Sola",image:"https://web.solacore.net/img/logo_medium-3_mNF.png",href:"https://sola.ai/cryptolo_io"},{name:"Medium",icon:'<i class="fab fa-medium"></i>',href:"https://medium.com/@cryptolo.io"}],f={survey:function(t){p.shell({name:"survey",el:n.survey,data:{survey:s},animation:"fadeIn"},function(e){e.el.find(".sendanswer").on("click",r),e.el.find(".resultpercent").each(function(){var e=$(this);e.animate({width:e.attr("w")+"%"},130)}),t&&t()})},tes:function(){var e=n.c.find(".tes");lazyEach({array:e,sync:!0,action:function(e){var t=$(e.item),n=t.attr("time")||600;t.addClass("show"),setTimeout(function(){e.success()},n)}})},lenta:function(){p.nav.api.load({open:!0,id:"lenta",el:n.lenta,animation:!1,mid:"about",essenseData:{author:"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",byauthor:!0,authAction:function(e){c.join(e)},notscrollloading:!0},clbk:function(e,t){o=t}})}},m=function(){};return{primary:i,getdata:function(e){o=null,s=new sQuestion({id:"pocketnetlanding",ajax:p.app.ajax,question:"Are you fed up with traditional social media like Facebook, Twitter and others?",answers:[{t:"Yes, very",v:1},{t:"Yes, somewhat",v:2},{t:"Facebook and Twitter are just great",v:3}]}),e({socials:u,survey:s})},destroy:function(){a&&clearInterval(a),o&&(o.destroy(),o=null),window.removeEventListener("scroll",c.fixed),n={}},init:function(e){m(),(n={}).c=e.el.find("#"+p.map.id),n.lenta=e.el.find(".lenta"),n.main=n.c.find(".main"),n.fixed=n.c.find(".fixedButton"),n.join=n.c.find(".ejoin"),n.whitepaper=n.c.find(".whitepaper"),n.days=e.el.find(".days"),n.seconds=e.el.find(".seconds"),n.minutes=e.el.find(".minutes"),n.hours=e.el.find(".hours"),n.survey=e.el.find(".survey"),t=new Date(2019,0,23,23,59),a=setInterval(c.time,1e3),n.join.on("click",d),n.whitepaper.on("click",l),n.c.find(".exploremore").on("click",c.explore),window.addEventListener("scroll",c.fixed),f.tes(),f.lenta(),s.init(function(){f.survey()}),c.videoWidth(n.c.find(".videoContent")),e.clbk(null,e)}}}var p=new nModule,a={};return p.run=function(e){var t=p.addEssense(a,n,e);p.init(t,e)},p.stop=function(){_.each(a,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=about:(app.modules.about={},app.modules.about.module=about);
 /*_____*/ 
var terms=function(){function e(n){var t,e=deep(n,"history"),o=function(){i.shell({name:i.app.localization.key,el:t.c,data:{}},function(n){})},u=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){t={}},init:function(n){u(),(t={}).c=n.el.find("#"+i.map.id),o(),n.clbk(null,n)},wnd:{class:"withoutButtons allscreen black a100"}}}var i=new nModule,o={};return i.run=function(n){var t=i.addEssense(o,e,n);i.init(t,n)},i.stop=function(){_.each(o,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=terms:(app.modules.terms={},app.modules.terms.module=terms);
 /*_____*/ 
var anothersite=function(){function t(n){var e=deep(n,"history"),t=function(){};return{primary:e,getdata:function(n,e){n({link:e.settings.essenseData.link})},destroy:function(){({})},init:function(n){t(),{}.c=n.el.find("#"+i.map.id),n.clbk(null,n)},wnd:{header:"Another site",class:"transparent small anothersite"}}}var i=new nModule,o={};return i.run=function(n){var e=i.addEssense(o,t,n);i.init(e,n)},i.stop=function(){_.each(o,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=anothersite:(app.modules.anothersite={},app.modules.anothersite.module=anothersite);
 /*_____*/ 
var registration=function(){function i(n){var r,i,t,e=deep(n,"history"),a={last:!1,end:!1},s=null,o={type:"STRING",name:"keyInput",id:"keyInput",placeholder:v.app.localization.e("confirmkey"),autoSearch:function(e,n,i){if(0==a.mnemonicKey.indexOf(e)&&" "!=e[e.length-1]){var t=e.split(" "),o=t.length-1;t[o];i(_.filter(a.mnemonicContent,function(e,n){if(n<=o)return!0}).join(" "))}}};isMobile()&&delete o.autoSearch;var c=new Parameter(o),l={download:function(o){a.os&&a.os.github&&$.get(a.os.github.url,{},function(e){var n=deep(e,"assets")||[],i=_.find(n,function(e){return e.name==a.os.github.name});if(i){v.app.platform.m.log("registration_application_download",a.os.github.name);var t=document.createElement("a");t.setAttribute("href",i.browser_download_url),t.setAttribute("download","download"),t.click(),o&&o(i.browser_download_url)}})},validation:function(){var e=trim(c.value);return e!=a.mnemonicKey&&e!=a.mk?(r.c.find(".note").html(v.app.localization.e("keysnotmatch")),r.c.addClass("error"),!1):(r.c.removeClass("error"),r.c.find(".note").html(""),!0)},registration:function(){l.validation()&&(localStorage.stay="1",v.app.user.stay=1,v.user.signin(a.mnemonicKey,function(e){if(!e)return r.c.find.note.html(v.app.localization.e("id98")),void r.c.addClass("error");a.end=!0,g.confirm(function(){g.success(function(){setTimeout(function(){if("_this"==deep(i,"successHref"))if(v.app.user.validate()){var e=deep(t,"container.close");e&&e(),i.signInClbk&&i.signInClbk()}else v.nav.api.loadSameThis("filluser",n);else i.nav||(i.nav={}),i.nav.history=!0,i.nav.reload=!1,v.app.reload({href:i.successHref||"filluser",nav:i.nav})},2e3)})})}))},generate:function(){r.c.removeClass("begin");var i=bitcoin.bip39.generateMnemonic();l.testqrcodeandkey(i,function(e){if(console.log("result",e),e){a.mnemonicKey=i,a.mnemonicMask=_.shuffle(indexArray(a.mnemonicKey.length)),a.mnemonicContent=a.mnemonicKey.split(" ");var n=v.app.user.keysFromMnemo(a.mnemonicKey);a.mainAddress=app.platform.sdk.address.pnet(n.publicKey).address,a.mk=n.privateKey.toString("hex"),g.key()}else l.generate()})},repeat:function(){a.last=!1,g.confirm(function(){g.tips(function(){setTimeout(function(){r.c.removeClass("last"),setTimeout(function(){l.generate()},300)},300)})})},continue:function(){var e=r.c.find(".mnemonicKey");r.c.find(".keyStep").removeClass("showedPanel"),g.mnemonicEffect(e,!0,function(){a.last=!0,g.key(function(){setTimeout(function(){g.tips(),r.c.addClass("last"),setTimeout(function(){g.confirm()},300)},300)})})},removeDisabled:function(e){e.find(".continue").removeClass("disabled"),e.find(".preloader").remove(),e.find(".save").addClass("black"),e.find(".copy").addClass("black")},testqrcodeandkey:function(e,n){var i=v.app.user.keysFromMnemo(trim(e)).privateKey.toString("hex"),t=g.qrcode(r.c.find(".hiddenqrcode"),i)._oDrawing._oContext.canvas.toDataURL("image/jpeg");grayscaleImage(t,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?n&&n(!1):n&&n(!0)},qrscanner.q.decode(e)})}},d=function(){l.registration()},f=function(){l.generate()},u=function(){$(this).hasClass("disabled")||l.continue()},p=function(){l.repeat()},m=function(){l.download(function(e){r.c.find(".osStep").addClass("rundownloading"),r.c.find(".skipositem").html('<div class="downloadstart">'+v.app.localization.e("e13011")+'</div><div><a href="'+e+'"><b>'+v.app.localization.e("e13012")+"</b></a></div>")})},g={os:function(n){var e=os();v.app.platform.m.log("registration_application"),e&&v.app.platform.applications[e]&&"undefined"==typeof _Electron&&!window.cordova&&!v.app.ref?(a.os=v.app.platform.applications[e],g.step("os",function(e){e.el.find(".downloadOs").on("click",m),e.el.find(".skip").on("click",function(){n&&n()})})):n()},step:function(e,n){v.shell({name:e,el:r.c.find("."+e+"Step"),data:a,animation:{id:"slide"}},function(e){n&&n(e)})},success:function(n){g.step("success",function(e){v.app.platform.m.log("registration_success"),n&&n()})},tips:function(n){v.app.platform.m.log("registration_tips"),g.step("tips",function(e){e.el.find(".generate").on("click",f),n&&n()})},confirm:function(n){c.value="",a.keyInput=c,g.step("confirm",function(e){e.el.find(".repeat").on("click",p),e.el.find(".registrationButton").on("click",d),n?n():(ParametersLive([c],e.el),_scrollTo(e.el,s),initUpload({el:e.el.find(".uploadFile"),ext:["txt","png","jpeg","jpg"],notexif:!0,dropZone:r.c.find(".confirm"),action:function(e,n){if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)grayscaleImage(e.base64,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?(v.app.platform.m.log("registration_qr_damaged"),r.c.find(".note").html(v.app.localization.e("filedamaged"))):(v.app.platform.m.log("registration_qr_success"),c.value=trim(e),c.el.val(c.value),l.registration())},qrscanner.q.decode(e)});else{var i=e.base64.split(",")[1],t=b64_to_utf8(i).split("/");t[1]?(c.value=trim(t[1]),c.el.val(c.value),l.registration()):r.c.find(".note").html(v.app.localization.e("filedamaged"))}}}),setTimeout(function(){e.el.find('input[type="text"]').on("focus",function(){e.el.find(".inputTable").addClass("typeactive")}),e.el.find('input[type="text"]').on("blur",function(){e.el.find(".inputTable").removeClass("typeactive")}),isMobile()||e.el.find(".autosearchInputCnt input").focus()},600))})},qrcode:function(e,n){return new QRCode(e[0],{text:n,width:256,height:256})},key:function(c){g.step("key",function(n){v.app.platform.m.log("registration_key");var e=n.el.find(".mnemonicKey"),i=r.c.find(".keyStep");i.removeClass("showedPanel");var t=n.el.find(".hiddenMnemonicKey").html();if(t)var o=v.app.user.keysFromMnemo(trim(t)).privateKey.toString("hex"),a=g.qrcode(n.el.find(".qrcode"),o);g.mnemonicEffect(e,!1,function(){i.addClass("showedPanel")}),n.el.find(".continue").on("click",u),setTimeout(function(){l.removeDisabled(n.el)},2e3),v.app.platform.clbks._focus.registration=function(){l.removeDisabled(n.el)},n.el.find(".copy").on("click",function(){copyText(n.el.find(".hiddenMnemonicKey")),sitemessage(v.app.localization.e("successfullycopied")),l.removeDisabled(n.el)}),n.el.find(".save").on("click",function(){var e=n.el.find(".qrcode img").attr("src");saveAs({file:e,format:"png",name:"pocketnetkey"})}),window.cordova&&n.el.find(".qrcode").on("click",function(){menuDialog({items:[{text:"Save key on device",class:"itemmain",action:function(e){var n=b64toBlob(a._oDrawing._elImage.currentSrc.split(",")[1],"image/png",512);saveAsWithCordova(n,"pkey"+v.app.platform.currentTime()+".png",function(){e()})}}]})}),c?c():_scrollTo(n.el,s)})},mnemonicEffect:function(i,e,n){var t=indexArray(101);e&&t.reverse();var o=i.height();i.css("min-height",o+"px"),lazyEach({array:t,sync:!0,action:function(e){var n=e.item;i.html(g.mnemonic(n)),o=i.height(),i.css("min-height",o+"px"),setTimeout(e.success,rand(1,5))},all:{success:function(){i.css("min-height","0px"),n&&n()}}})},mnemonic:function(e){var t="",o=(a.mnemonicMask.length*e/100).toFixed(0);return _.each(a.mnemonicKey,function(e,n){var i=_.indexOf(a.mnemonicMask,n);t+=i<o||" "==e?e:v.app.platform.values.alph[rand(0,v.app.platform.values.alph.length-1)]}),t}};return{primary:e,getdata:function(e,n){v.nav.api.load({open:!0,href:"filluserfast"})},destroy:function(){delete v.app.platform.clbks._focus.registration,r={}},init:function(e){(r={}).c=e.el.find("#"+v.map.id),r.registrationButton=r.c.find(".registrationButton"),r.toAuthorization=r.c.find(".toAuthorization"),r.login=r.c.find(".loginValue"),r.ler=r.c.find(".ler"),r.key=r.c.find(".key"),i=e.essenseData||{},t=e,(s=r.c.closest(".wndcontent")).length||(s=null),g.os(function(){g.tips()}),function(e){r.toAuthorization.on("click",function(){v.nav.api.loadSameThis("authorization",e)})}(e),e.clbk(null,e)},wnd:{class:"withoutButtons allscreen"}}}var v=new nModule,t={};return v.run=function(e){var n=v.addEssense(t,i,e);v.init(n,e)},v.stop=function(){_.each(t,function(e){e.destroy()})},v}();"undefined"!=typeof module?module.exports=registration:(app.modules.registration={},app.modules.registration.module=registration);
 /*_____*/ 
var filluserfast=function(){function t(e){function s(n){return _.findIndex(i,function(e){return e==n})}var r,t,a,n=deep(e,"history"),o={},c=null,l={settings:{id:"settings",nextindex:"captcha",prev:function(e){e()},render:"settings",after:function(e,n){},next:!0},captcha:{id:"captcha",render:"captcha",nextindex:"welcome",prev:function(t){var e=k.sdk.address.pnet().address;k.app.settings.get(e,"request")||""?p.next():d.check(function(e){e?p.next():k.sdk.captcha.get(function(e,n){console.log("captcha, error",e,n),n?p.to("network"):e.done?d.request(function(e){e&&p.next()}):(l.captcha.current=e,t())},!0)},!0)},after:function(e,n){var t=e.find(".ucaptchainput"),a=e.find(".redo"),o=e.find(".addCaptcha"),i="";t.focus();function s(e){return!!/^[a-zA-Z0-9]{4,}$/.test(e)}t.on("keyup",function(){i=$(this).val(),s(i)?o.removeClass("disabled"):o.addClass("disabled")}),o.on("click",function(){var e=t.val();s(e)&&k.sdk.captcha.make(e,function(e,n){if("captchashots"==e)return sitemessage(k.app.localization.e("e13118")),void p.redo();e?sitemessage(k.app.localization.e("e13118")):n.done&&d.request(function(e){e&&p.next()})},!0)}),a.one("click",function(){p.redo()})}},welcome:{id:"welcome",prev:function(e){k.app.platform.sdk.theme.set("black"),t.welcomepart&&t.welcomepart(),e()},render:"welcome",after:function(e){function n(){if("_this"==deep(t,"successHref")){var e=deep(a,"container.close");e&&e(),t.signInClbk&&t.signInClbk()}else k.nav.api.go({href:"index?r=recommended",history:!0,open:!0});k.app.platform.ui.showmykeyfast()}setTimeout(function(){n()},1500),e.find(".welcome").on("click",function(){n()})}},network:{id:"network",prev:function(e){e()},render:"network",after:function(e){k.app.errors.clbks.filluserfast=function(){app.errors.state.proxy||app.errors.state.proxymain||("network"!=c||k.app.platform.loadingWithErrors||p.to("captcha"),delete k.app.errors.clbks.filluserfast)}}},moneyfail:{id:"moneyfail",prev:function(e){e()},render:"moneyfail",after:function(n){function t(){k.app.platform.sdk.node.transactions.get.allBalance(function(e){n.find(".balance").html("Balance: "+k.app.platform.mp.coin(e)+" PKOIN")})}t(),n.find(".check").on("click",function(){topPreloader(20),k.app.platform.sdk.node.transactions.get.allBalance(function(e){topPreloader(100),0<e&&("moneyfail"==c&&p.to("settings"),delete k.app.platform.sdk.node.transactions.clbks.moneyfail),t()}),k.app.platform.sdk.node.transactions.clbks.moneyfail=function(){k.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&("moneyfail"==c&&p.to("welcome"),delete k.app.platform.sdk.node.transactions.clbks.moneyfail)})}})}}},i=_.map(l,function(e,n){return n}),d={request:function(o){k.sdk.users.requestFreeMoney(function(e,n){var t=k.sdk.address.pnet().address,a=k.app.settings.get(t,"request")||"";e||a?(k.app.settings.set(t,"request","true"),k.sdk.registrations.add(t,3),o&&o(!0)):("captcha"==n&&(!0,"money"!=c&&"captcha"!=c||p.to("captcha")),"error"==n&&(!0,"money"!=c&&"captcha"!=c||p.to("moneyfail")),o&&o(!1,"err"))})},check:function(n,e){k.app.platform.sdk.node.transactions.get.allBalance(function(e){n&&n(0<e)},e)},follow:function(){k.app.platform.sdk.node.transactions.clbks.filluser||(k.app.platform.sdk.node.transactions.clbks.filluser=function(){delete k.app.platform.sdk.node.transactions.clbks.filluser,d.check(function(e){e?"money"==c&&p.next():d.follow()})})}},p={preloader:function(e){e?r.c.addClass("loading"):r.c.removeClass("loading")},signin:function(n){k.user.signin(o.mnemonicKey,function(e){n&&n()})},to:function(e,n){c=e,p.makeStep(n)},redo:function(e){p.makeStep(function(){})},next:function(e){if(c)c=l[c].nextindex;else{var n=deep(app,"platform.sdk.user.storage.me");c=n&&n.relay?l.captcha.id:l.settings.id}c&&p.makeStep(function(){})},makeStep:function(e){var t=l[c];t&&(p.preloader(!0),t.prev(function(){r.c&&(r.c.attr("step",t.id),u.panel(t,function(n){u.step(t,function(e){p.preloader(!1),_scrollTop(e,scrollel),n.find(".elpanel").addClass("active"),t.after(e,n)})}))}))},testqrcodeandkey:function(e,n){console.log("HM",e);var t=k.app.user.keysFromMnemo(trim(e)).privateKey.toString("hex"),a=u.qrcode(r.c.find(".hiddenqrcode"),t)._oDrawing._oContext.canvas.toDataURL("image/jpeg");grayscaleImage(a,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?n&&n(!1):n&&n(!0)},qrscanner.q.decode(e)})},generate:function(t){if(o.mnemonicKey)t&&t();else{var a=bitcoin.bip39.generateMnemonic();p.testqrcodeandkey(a,function(e){if(e){o.mnemonicKey=a,o.mnemonicMask=_.shuffle(indexArray(o.mnemonicKey.length)),o.mnemonicContent=o.mnemonicKey.split(" ");var n=k.app.user.keysFromMnemo(o.mnemonicKey);o.mainAddress=app.platform.sdk.address.pnetsimple(n.publicKey).address,o.mk=n.privateKey.toString("hex"),t&&t()}else p.generate()})}},waitgeneration:function(e){retry(function(){if(o.mnemonicKey)return!0},e,40)}},f=function(){if(c){var e=l[c],n=r.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),t=r.c.find(".stepsWrapperLine"),a=n.closest(".stepsWrapper").width();r.c.find(".step").width(a),t.css("margin-left","-"+s(c)*a+"px"),t.width(a*_.toArray(l).length)}},u={qrcode:function(e,n){return new QRCode(e[0],{text:n,width:256,height:256})},step:function(e,a){r.c.find(".step").removeClass("active");var n=r.c.find('.step[step="'+e.id+'"] .stepBody'),o=n.closest(".step"),i=r.c.find(".stepsWrapperLine");u[e.render](n,function(e){var n=o.closest(".stepsWrapper").width();r.c.find(".step").width(n),i.width(n*_.toArray(l).length);var t="-"+s(c)*n+"px";i.css("margin-left",t),o.closest(".step").addClass("active"),a&&a(e)})},panel:function(e,n){k.shell({name:"panel",el:r.panel,turi:"filluser",data:{step:e}},function(e){n&&n(e.el)})},captcha:function(e,n){k.shell({name:"captcha",el:e,turi:"filluser",data:{captcha:l.captcha.current}},function(e){n&&n(e.el)})},email:function(e,n){k.shell({name:"email",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},welcome:function(e,n){k.shell({name:"welcome",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},moneyfail:function(e,n){k.shell({name:"moneyfail",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){k.shell({name:"network",el:e,turi:"filluser",data:{}},function(e){n&&n(e.el)})},money:function(e,n){k.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,a,e){k.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:r.panel,presave:function(e){p.waitgeneration(function(){p.signin(function(){k.sdk.registrations.add(o.mainAddress,1),e&&e()})})},relay:function(){return o.mainAddress},success:function(e){o.info=e,k.sdk.registrations.add(o.mainAddress,2),m.save(),p.next()}},clbk:function(e,n){ext=n,a&&a(t)}})}},m={save:function(){console.log("kkk",o)},load:function(){}};return{primary:n,getdata:function(e,n){n.state&&"fuf"!=k.user.validateVay()?k.app.nav.api.load({open:!0,href:"index",history:!0}):(!1,t=deep(n,"settings.essenseData")||{},c=null,e({steps:l,inauth:deep(n,"settings.essenseData.inauth")||!1}))},destroy:function(){window.removeEventListener("resize",f),delete k.app.platform.sdk.node.transactions.clbks.moneyfail,delete k.app.errors.clbks.filluserfast,delete k.app.platform.sdk.node.transactions.clbks.filluser,r={}},init:function(e){m.load(),(r={}).c=e.el.find("#"+k.map.id),r.panel=r.c.find(".panelWrapper"),a=e,scrollel=r.c.closest(".wndcontent"),scrollel.length||(scrollel=null),window.addEventListener("resize",f),k.app.user.isState(function(e){e?(o={}).mainAddress=k.app.user.address.value:setTimeout(function(){p.generate(function(){})},1e3),p.next()}),e.clbk(null,e)}}}var k=new nModule,a={};return k.run=function(e){var n=k.addEssense(a,t,e);k.init(n,e)},k.stop=function(){_.each(a,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=filluserfast:(app.modules.filluserfast={},app.modules.filluserfast.module=filluserfast);
 /*_____*/ 

var usersettings = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, composed, controlller;


		var actions = {

		}

		var events = {
			
		}

		var renders = {
			options : function(){

				self.shell({
					name :  'options',
					el : el.options,
					data : {
						composed : composed.c,
						themes : self.app.platform.sdk.theme.all,
						current : self.app.platform.sdk.theme.current,
					}					

				}, function(p){
					ParametersLive(composed.o, p.el)

					p.el.find('.themewrapper').on('click', function(){

						var e = $(this)

						if (e.hasClass('active')) return

						var t = e.attr('theme')

						p.el.find('.themewrapper').removeClass('active')

						e.addClass('active')

						self.app.platform.sdk.theme.set(t)
						
					})

					var input = p.el.find('.parameterMaketWrapper[parameter=telegram] input')

					
					input.on('blur', function(){

						renders.options();

					})

					var value = input.val();

					self.app.platform.sdk.system.get.telegramGetMe(value, true, make, add);



					// const bot = (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || "no z"
					// self.app.platform.sdk.system.get.telegramGetMe(bot);
				})
				
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			const rerender = () => {

				renders.options();

			}


			//if (self.app.user.features.telegram){

			controller = self.app.platform.sdk.system.get.telegramUpdateAbort;

			controller.abort(); 
			self.app.platform.sdk.system.get.telegramUpdateAbort = new AbortController();

			
			// self.app.platform.sdk.system.get.telegramGetMe(null, rerender);


			//}
		}

		var make = function(){

			renders.options()

		}

		var add = function(check){

			const addIcon = (icon, color) => {

				const div = document.createElement('div');
				div.classList.add("iWrapper");
				const i = document.createElement('i');
				const telegramInputWrapper = document.querySelector("div[parameter='telegram']");
				div.classList.add("iWrapper");

				if (telegramInputWrapper) {

					telegramInputWrapper.setAttribute("style", "display: flex");

					div.setAttribute("style", `color:${color}; display:inline-block; font-size:30px; padding: 5px; margin-left: 1em`);
					i.classList.add("fa");
					i.classList.add(icon);
					div.appendChild(i);
					telegramInputWrapper.appendChild(div);

				}
			}

			if (check){
				addIcon("fa-check-circle", "green")

			} else {

				addIcon("fa-times", "red");	

			}


		}

		return {
			primary : primary,

			getdata : function(clbk){

				composed = self.app.platform.sdk.usersettings.compose(make)
				var data = {};

				clbk(data);



			},

			destroy : function(){
				el = {};

				if (self.app.user.features.telegram){

					console.log('destroyed?');
					controller.abort(); 
					controller = new AbortController();
					self.app.platform.sdk.system.get.telegramUpdates();

				}
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.options = el.c.find('.options')

				initEvents();

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

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = usersettings;
}
else{

	app.modules.usersettings = {};
	app.modules.usersettings.module = usersettings;

}
 /*_____*/ 
var test=function(){function s(e){var t,d,o,s,a=deep(e,"history"),n=!1,i={language:h.app.localization.key||"en"},p={saveemail:function(e,n){var r={Email:e};r.Action||(r.Action="ADDTOMAILLIST"),r.TemplateID="1005",r.ref="",function(a){h.app.ref?h.sdk.users.get(h.app.ref,function(){var e=deep(h,"sdk.users.storage."+h.app.ref+".name");a&&a(e)}):a&&a(null)}(function(e){var a="";e&&(r.ref+=e,a+='<p><a href="https://pocketnet.app/author?address='+h.app.ref+'">Referrer: '+e+"</a></p>");var s=deep(document,"referrer");s&&(a+='<p><a href="'+s+'">From: '+s+"</a></p>"),r.body=encodeURIComponent(a),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:r,dataType:"json",success:function(){n&&n()}})})},valid:function(e,a){if(!p.equal(e,a)&&trim(e.name)&&e.image)return!0},equal:function(e,a){function s(e){return"name:"+(trim(e.name)||"")+"image:"+(e.image||"")+"about:"+(trim(e.about)||"")+"site:"+(trim(e.site)||"")+"language:"+(e.language||"")+"addresses:"+JSON.stringify(e.addresses||[])}return s(e)==s(a)},cancel:function(){p.userOptions(),p.upanel(),v.icon(),v.options()},ref:function(e){console.log("ref1221211212",o,n,e),o&&n&&(localStorage[h.app.platform.sdk.address.pnet().address+"subscribeRef"]=o.address)},save:function(e){function r(){t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100),a?h.nav.api.go({href:"index",history:!0,open:!0}):d.success?d.success():e&&e()}h.sdk.users.checkFreeRef(h.app.platform.sdk.address.pnet()?h.app.platform.sdk.address.pnet().address:"",function(s,e){if(!t.c.find(".userPanel").hasClass("loading"))if(p.equal(i,h.app.platform.sdk.user.storage.me))sitemessage(h.app.localization.e("uchanges"));else if(p.valid(i,h.app.platform.sdk.user.storage.me)){var a=new UserInfo;if(a.name.set(trim(i.name)),a.language.set(i.language),a.about.set(trim(i.about)),a.site.set(trim(i.site)),a.image.set(i.image),a.addresses.set(i.addresses),a.ref.set(deep(o,"address")||""),e=a.validation())return t.c.find(".errorname").fadeIn(),"namelength"==e&&t.c.find(".errorname span").html("The name length can be more than 20 symbols"),"pocketnet"==e&&t.c.find(".errorname span").html("To avoid user confusion using Pocketnet in name is reserved"),(n=t.c.find('[parameter="name"] input')).focus(),_scrollTo(n),!1;topPreloader(30),t.c.find(".userPanel").addClass("loading"),t.upanel.addClass("loading"),h.app.platform.sdk.users.nameExist(a.name.v,function(e){!e||h.app.platform.sdk.address.pnet()&&e==h.app.platform.sdk.address.pnet().address?(topPreloader(50),d.presave(function(){t.c.find(".errorname").fadeOut(),topPreloader(70),a.uploadImage(function(){if(d.makeuser)return topPreloader(100),t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),void d.makeuser(a);var e=i.email;e&&p.saveemail(e),h.sdk.node.transactions.create.commonFromUnspent(a,function(e,a){e?(successCheck(),delete h.sdk.usersl.storage[h.app.platform.sdk.address.pnet().address],delete h.sdk.users.storage[h.app.platform.sdk.address.pnet().address],h.app.platform.sdk.user.storage.me=e,i=_.clone(h.app.platform.sdk.user.storage.me),p.upanel(),p.ref(s),h.app.platform.sdk.users.getone(h.app.platform.sdk.address.pnet().address,function(){h.app.reloadModules(function(){d.presuccess?d.presuccess(r):r()})})):(h.app.platform.errorHandler(a,!0),t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100))},{relay:!!d.relay&&d.relay()})})})):(t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100),t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("This username is taken in Pocketnet"))})}else{if(sitemessage(h.app.localization.e("uchangesvalid")),trim(i.name)){if(!i.image){var n=t.c.find(".fileUploader");_scrollTo(n)}}else(n=t.c.find('[parameter="name"] input')).focus(),_scrollTo(n)}})},upload:function(e,n){topPreloader(20);var a=[{original:e.base64,index:0}];h.nav.api.load({open:!0,id:"imageGalleryEdit",inWnd:!0,essenseData:{edit:!0,initialValue:0,images:a,apply:!0,crop:{aspectRatio:1,style:"round apply",autoCropArea:.9},success:function(e,s){a[0].original,resize(a[0].original,100,100,function(e){var a=e.split(",");s(),a[1]?(i.image=e,v.icon(),p.upanel(),n&&n()):topPreloader(100)})}}})},upanel:function(){t.upanel&&(0<_.toArray(h.app.platform.sdk.node.transactions.temp.userInfo||{}).length||h.app.platform.sdk.address.pnet()&&0<deep(h.sdk.relayTransactions.storage,h.app.platform.sdk.address.pnet().address+".userInfo.length")?(t.upanel.addClass("wait"),t.c.find(".caption").remove()):(t.upanel.removeClass("wait"),p.equal(i,h.app.platform.sdk.user.storage.me)||!p.valid(i,h.app.platform.sdk.user.storage.me)?t.upanel.removeClass("changes"):t.upanel.addClass("changes")))},clear:function(){p.userOptions(),v.caption()},userOptions:function(){i=_.clone(h.app.platform.sdk.user.storage.me),_.each(r,function(s,n){var e=h.app.platform.sdk.user.storage.me[s.id];"addresses"==n&&(e=_.clone(h.app.platform.sdk.user.storage.me[s.id])),s.value=e||s.defaultValue||"",i[s.id]=s.value,s._onChange=function(e){if(i[s.id]="addresses"==n?_.clone(e):trim(e),p.upanel(),"language"==n){var a=h.app.localization.available[e];a&&a.key!=h.app.localization.key&&h.app.localization.lightSet(a.key)}if("name"==n){if(-1<i[s.id].toLowerCase().replace(/[^a-z]/g,"").indexOf("pocketnet"))return t.c.find(".errorname").fadeIn(),void t.c.find(".errorname span").html("To avoid user confusion using Pocketnet in name is reserved");20<i[s.id].length?(t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("The name length can be more than 20 symbols")):h.app.platform.sdk.users.nameExist(i[s.id],function(e){!e||h.app.platform.sdk.address.pnet()&&e==h.app.platform.sdk.address.pnet().address?t.c.find(".errorname").fadeOut():(t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("This username is taken in Pocketnet"))})}}})},signout:function(){h.app.user.signout(),h.app.reload({href:"authorization"})}},r={name:new Parameter({name:h.app.localization.e("unickname"),id:"name",type:"NICKNAME",require:!0}),email:new Parameter({name:"Email",id:"email",type:"EMAIL",onType:!0}),language:new Parameter({name:h.app.localization.e("ulanguage"),id:"language",type:"VALUES",defaultValue:h.app.localization.key||"en",possibleValues:["en","ru"],possibleValuesLabels:["English","Русский"]}),about:new Parameter({name:h.app.localization.e("uabout"),id:"about",type:"TEXT",onType:!0,placeholder:h.app.localization.e("e13351")}),site:new Parameter({name:h.app.localization.e("uwebsite"),id:"site",type:"STRINGANY",onType:!0,value:""}),addresses:new function(){var n=this;return n.id="addresses",n.name=h.app.localization.e("uaddresesd"),n.value=[],n.defaultValue=[],n.remove=function(e,a){removeEqual(n.value,{currency:e,address:a}),n._onChange&&n._onChange(n.value),n.addedAddresses()},n.add=function(e){n.value.push(e),n._onChange&&n._onChange(n.value),n.addedAddresses()},n.addDialog=function(){function t(e,a){return 0<a.length}y.fastTemplate("addaddress",function(e){dialog({html:e,wrap:!0,success:function(e){var a=e.el.find(".currency").val(),s=e.el.find(".address").val();if(t(0,s))return n.add({currency:a,address:s}),!0},clbk:function(e){function a(){s.val();var e=n.val();return t(0,e)?(r.removeClass("disabled"),!0):(r.addClass("disabled"),!1)}var s=e.find(".currency"),n=e.find(".address"),r=e.find(".btn1");n.focus(),n.on("change",a),n.on("keyup",a),s.on("change",a),s.on("keyup",a),a()},class:"one addaddressDialog zindex"})},{})},n.removeEvent=function(){var e=$(this).closest(".addedAddress").attr("currency"),a=$(this).closest(".addedAddress").attr("address");n.remove(e,a)},n.addedAddresses=function(){var a="";_.each(n.value,function(e){e&&e.currency&&(a+='<div class="addedAddressWrapper">',a+='<div class="addedAddress table" currency="'+e.currency+'" address="'+e.address+'">',a+='<div class="currencyWrapper">',a+=e.currency.toUpperCase(),a+="</div>",a+='<div class="addressWrapper">',a+=e.address,a+="</div>",a+='<div class="panelWrapper">',a+='<div class="item remove">',a+='<i class="far fa-times-circle"></i>',a+="</div>",a+="</div>",a+="</div>",a+="</div>")}),n.el.find(".addedAddressesWrapper").html(a),n.el.find(".addedAddressesWrapper .remove").on("click",n.removeEvent)},n.init=function(e){n.defaultValue=[],n.el=e.find(".adressesInput"),n.addedAddresses(),n.el.find(".addaddress").on("click",n.addDialog)},n.input=function(){return'<div class="adressesInput">','<div class="addaddressWrapper">','<div class="addaddress">','<i class="fas fa-plus"></i>',"</div>","</div>",'<div class="addedAddressesWrapper">',"</div>","</div>",'<div class="adressesInput"><div class="addaddressWrapper"><div class="addaddress"><i class="fas fa-plus"></i></div></div><div class="addedAddressesWrapper"></div></div>'},n}},l=function(){p.signout()},u=function(){p.save()},c=function(){p.cancel()},f=function(){var e=h.app.platform.sdk.address.pnet();topPreloader(30),h.app.platform.sdk.node.account.import(e.address,function(){topPreloader(100),sitemessage("Address "+e.address+" was successfully imported")})},m=null,g=null,v={options:function(a){h.shell({name:"options",el:t.options,data:{tempInfo:i,userOptions:r}},function(e){ParametersLive(_.toArray(r),e.el),r.addresses.init(e.el),a&&a()})},icon:function(a){h.shell({name:"icon",el:t.icon,data:{tempInfo:i,ed:d}},function(e){initUpload({el:e.el.find(".pgroup"),ext:["png","jpeg","jpg"],dropZone:t.c,multiple:!1,action:function(e,a){p.upload(e,function(){s&&s.destroy(),console.log("el.c.find('.nickname input')",t.c.find(".nickname input")),_scrollTo(t.c.find(".nickname input").focus()),a&&a()})}}),d.wizard&&!i.image&&(s=h.app.platform.api.plissing({el:e.el.find(".iconWrapper"),text:"Upload Profile Image"})),a&&a()})},unspent:function(e,a){h.shell({name:"unspent",el:t.unspent,data:{unspent:e}},function(e){a&&a()})},caption:function(e,a){},address:function(){t.c.find(".adr").html(bitcoin.payments[h.app.platform.addressType]({pubkey:h.app.user.key.value}))}},k=function(){};return{primary:a,getdata:function(s,e){!(o=null),(d=e.settings.essenseData||{}).presave||(d.presave=function(e){e&&e()}),h.app.platform.sdk.user.get(function(){if(_.isEmpty(h.app.platform.sdk.user.storage.me)){n=!0;var e=h.app.ref;e&&e!=h.app.platform.sdk.address.pnet()&&(o=e)}!function(){var e=_.map(h.app.platform.nodes,function(e,a){return a.toString()}),a=_.map(h.app.platform.nodes,function(e,a){return e.full});(m=new Parameter({type:"VALUES",name:"setNode",id:"setNode",possibleValues:e,possibleValuesLabels:a,defaultValue:"1"})).value=h.app.platform.nodeid,m._onChange=function(e){h.app.platform.nodeid=e,h.app.platform.state.save()},(g=new Parameter({type:"VALUES",name:"setAddressType",id:"setAddressType",possibleValues:h.app.platform.addressTypes,possibleValuesLabels:["P2PKH","P2SH"],defaultValue:"p2sh"})).value=h.app.platform.addressType,g._onChange=function(e){h.app.platform.addressType=e,h.app.platform.state.save(),h.user.address.set(h.app.platform.sdk.address.pnet().address),h.app.reload()},p.userOptions()}();var a={};a.p2pkh=h.app.platform.sdk.address.pnet(),a.setNode=m,a.setAddressType=g,a.userOptions=r,a.tempInfo=i,a.firstTime=n,a.ref=o,a.caption=d.caption,o?h.sdk.users.get(o,function(){var e=o;(o=h.sdk.users.storage[e]||null)&&(o.address=e),a.ref=o,s(a)}):s(a)})},destroy:function(){return t={},h.app.platform.sdk.user.storage.me&&!p.equal(i,h.app.platform.sdk.user.storage.me)?function(e){function a(){delete h.app.platform.ws.messages.transaction.clbks.utemp,e()}dialog({html:h.app.localization.e("usavechanges"),btn1text:h.app.localization.e("dyes"),btn2text:h.app.localization.e("dno"),success:function(){p.save(a)},fail:function(){i=_.clone(h.app.platform.sdk.user.storage.me),a()}})}:null},init:function(e){k(),(t={}).c=e.el.find("#"+h.map.id),t.transaction=e.el.find(".transactionInfo"),t.unspent=e.el.find(".unspentlist"),t.showhidetestpanel=e.el.find(".showhidetestpanel"),t.import=e.el.find(".import"),t.caption=t.c.find(".bgCaption"),t.icon=t.c.find(".pgroupIconWrapper"),t.usericon=t.c.find(".usericon"),t.options=t.c.find(".optionsParameters"),t.upanel=d.panel||t.c.find(".upanel"),t.signout=t.c.find(".signout"),t.import.on("click",f),t.showhidetestpanel.on("click",function(){$(this).closest(".testPanel").toggleClass("active")}),t.upanel.find(".cancel").on("click",c),t.upanel.find(".save").on("click",u),ParametersLive([m,g],t.c),t.signout.on("click",l),t.c.find(".refRemove").on("click",function(){o=null,delete localStorage.ref,t.c.find(".referalMaketWrapper").remove()}),p.upanel(),v.caption(),v.icon(),v.options(),h.sdk.node.transactions.get.unspent(function(e){v.unspent(e)}),h.app.platform.ws.messages.transaction.clbks.utemp=function(e){e.temp&&"userInfo"==e.temp.type&&p.upanel()},e.clbk(null,e)},wnd:{class:"withoutButtons allscreen testwindow"}}}var h=new nModule,y=h,n={};return h.run=function(e){var a=h.addEssense(n,s,e);h.init(a,e)},h.stop=function(){var s=null;if(_.each(n,function(e){var a=e.destroy();a&&(s=a)}),s)return{action:s}},h}();"undefined"!=typeof module?module.exports=test:(app.modules.test={},app.modules.test.module=test);
 /*_____*/ 
var accounts=function(){function n(e){var s,n,t,o,a=deep(e,"history"),d=function(t){k.app.platform.sdk.pool.expand(n,function(e){var a=_.indexOf(e.addresses,t);if(-1<a){var n=e.private[a],s=k.app.user.stay;k.app.user.signout(function(){k.app.user.stay=s,k.user.signin(n,function(e){k.app.reloadLight(function(){var e="userpage?id=accounts&s="+makeid(),a=!1;k.app.user.validate()||(e="filluser",a=!0),k.app.nav.api.load({open:!0,href:e,history:a})})})})}})},i=function(s){k.app.platform.sdk.pool.expand(n,function(e){var a=_.indexOf(e.addresses,s);if(-1<a){var n=e.private[a];m.dumpkey(s,n)}})},p=function(e){k.app.platform.sdk.pool.remove(n,e),k.app.platform.sdk.pool.save(),m.addresses()},c=function(){5<=deep(n,"addresses.length")?sitemessage("You have reached a maximum of 5 accounts. No more can be added "):k.app.nav.api.load({open:!0,id:"addaccount",inWnd:!0,essenseData:{success:function(a){k.app.platform.sdk.pool.expand(n,function(e){k.app.platform.sdk.pool.add(e,a,function(e,a){a?dialog({html:k.app.localization.e("aused"),class:"one"}):k.app.platform.sdk.pool.export(e,function(e){k.app.platform.sdk.pool.current.packs[t]=e,k.app.platform.sdk.pool.save(),n=e,k.app.platform.sdk.pool.info(e,function(){m.addresses()})})})})}}})},r=function(){s.dumpkey.html(""),s.c.find(".dumpaddress").html(""),s.c.removeClass("privatedump")},u=function(){var e=$(this).closest(".addressTable").attr("address");dialog({html:"Do you really want to see your private key?",btn1text:"See Private Key",btn2text:"Cancel",class:"zindex",success:function(){i(e)}})},l=function(){var e=$(this).closest(".addressTable").attr("address");dialog({html:"Do you really want to remove this address from this device?",btn1text:"Remove",btn2text:"Cancel",class:"zindex",success:function(){p(e)}})},f=function(){var e=$(this).closest(".addressTable").attr("address");d(e)},m={qrcode:function(e,a){new QRCode(e[0],{text:a,width:256,height:256})},dumpkeyabout:function(){},dumpkey:function(e,a){var n="";s.c.addClass("privatedump"),s.c.find(".dumpaddress").html(e);try{n=bitcoin.ECPair.fromPrivateKey(Buffer.from(a,"hex")).toWIF().toString("hex")}catch(e){}k.shell({name:"dumpkey",el:s.dumpkey,data:{private:a,address:e,privateWif:n},animation:"fadeIn"},function(e){m.qrcode(e.el.find(".code"),a),e.el.find(".copyvalue").on("click",function(){var e=$(this).closest(".infotable").find(".value");copyText(e),sitemessage("Value was successfully copied")})})},addresses:function(a){k.shell({name:"addresses",el:s.addresses,data:{current:k.app.platform.sdk.address.pnet().address,pack:n},animation:"fadeIn"},function(e){e.el.find(".remove").on("click",l),e.el.find(".dumpkey").on("click",u),e.el.find(".ncurrent .label").on("click",f),a&&a()})}},v=function(){};return{primary:a,getdata:function(e,a){o=deep(a,"settings.essenseData")||{},t=n=null;e({})},destroy:function(){s={}},init:function(e){v(),(s={}).c=e.el.find("#"+k.map.id),s.addresses=s.c.find(".addresses"),s.dumpkey=s.c.find(".dumpkey"),s.c.find(".add").on("click",c),s.c.find(".back").on("click",r),function(){var e=k.app.platform.sdk.address.pnet().address,a=k.app.platform.sdk.pool.getPack(e);a?(n=a[0],t=a[1],k.app.platform.sdk.pool.info(n,function(){m.addresses(function(){o.dumpkey&&i(e)})})):sitemessage("ERROR")}(),e.clbk(null,e)}}}var k=new nModule,s={};return k.run=function(e){var a=k.addEssense(s,n,e);k.init(a,e)},k.stop=function(){_.each(s,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=accounts:(app.modules.accounts={},app.modules.accounts.module=accounts);
 /*_____*/ 
var page404=function(){function o(n){var e=deep(n,"history"),o=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}}var t=new nModule,u={};return t.run=function(n){var e=t.addEssense(u,o,n);t.init(e,n)},t.stop=function(){_.each(u,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=page404:(app.modules.page404={},app.modules.page404.module=page404);
 /*_____*/ 
var filluser=function(){function t(e){function l(n){x.app.ref?x.sdk.users.get(x.app.ref,function(){var e=deep(x,"sdk.users.storage."+x.app.ref+".name");n&&n(e)}):n&&n(null)}function c(){var e=x.app.ref||"",n="Overall";return-1<e.indexOf("author")&&(n="Account"),(-1<e.indexOf("&s=")||-1<e.indexOf("&v="))&&(n="Post"),n}function r(n){return _.findIndex(m,function(e){return e==n})}var s,o,a,n,t=deep(e,"history"),i=null,p=!1,f=!1,d={captcha:{id:"captcha",render:"captcha",nextindex:"email",prev:function(t){var e=x.sdk.address.pnet().address;x.app.settings.get(e,"request")||""?k.next():v.check(function(e){e?k.next():x.sdk.captcha.get(function(e,n){n?k.to("network"):e.done?(k.next(),v.request()):(d.captcha.current=e,t())},!0)},!0)},after:function(e,n){var t=e.find(".ucaptchainput"),a=e.find(".redo"),o=e.find(".addCaptcha"),i="";setTimeout(function(){t.focus()},150);function r(e){return!!/^[a-zA-Z0-9]{4,}$/.test(e)}t.on("keyup",function(){i=$(this).val(),r(i)?o.removeClass("disabled"):o.addClass("disabled")}),o.on("click",function(){var e=t.val();r(e)&&x.sdk.captcha.make(e,function(e,n){if("captchashots"==e)return sitemessage(x.app.localization.e("e13118")),void k.redo();e?sitemessage(x.app.localization.e("e13118")):n.done&&(k.next(),v.request())},!0)}),a.one("click",function(){x.app.platform.m.log("userwisard_captcha_redo"),k.redo()})}},email:{id:"email",nextindex:"money",prev:function(e){h.referral(),localStorage.uei?k.next():e()},render:"email",after:function(e,n,t){function a(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)}var o=e.find(".uemailinput"),i=e.find(".skip"),r=e.find(".addEmail"),s="";o.focus(),o.on("keyup",function(){s=$(this).val(),a(s)?(r.removeClass("disabled"),i.addClass("hidden"),r.html(x.app.localization.e("e13119"))):(r.addClass("disabled"),i.removeClass("hidden"),r.html(x.app.localization.e("e13113")))}),r.on("click",function(){var e=o.val();a(e)&&(x.app.platform.m.log("userwisard_email_add"),k.next(),localStorage.uei=!0,function(e,a){topPreloader(20);var o={Email:e};o.Action||(o.Action="ADDTOMAILLIST"),o.TemplateID="1005",o.ref="",l(function(e){var n="";o.ref+=c(),e&&(o.ref+=", "+e,n+='<p><a href="https://pocketnet.app/author?address='+x.app.ref+'">Referrer: '+e+"</a></p>");var t=deep(document,"referrer");t&&(n+='<p><a href="'+t+'">From: '+t+"</a></p>"),o.body=encodeURIComponent(n),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:o,dataType:"json",success:function(){topPreloader(100),a&&a()}})})}(e,function(){}))}),i.one("click",function(){x.app.platform.m.log("userwisard_email_skip"),localStorage.uei=!0,k.next()})}},money:{id:"money",nextindex:"settings",prev:function(n){v.check(function(e){if(e)k.next();else{if(p)return void k.to("captcha");if(f)return void k.to("moneyfail");n()}})},ret:!1,render:"money",after:function(n,t,e){k.timer(n.find(".time"),e||59,function(){v.check(function(e){!e||"money"!=u&&"captcha"!=u?(x.app.platform.m.log("userwisard_modey_delay"),n.find(".subcaption").html(x.app.localization.e("wesentmoneydelay")),d.money.after(n,t,30)):(x.app.platform.m.log("userwisard_money_success"),k.next())},!0)})}},settings:{id:"settings",nextindex:"welcome",prev:function(e){e(),x.app.platform.m.log("userwisard_account")},render:"settings",after:function(e,n){},next:!0},welcome:{id:"welcome",prev:function(e){e()},render:"welcome",after:function(e){x.app.platform.m.log("userwisard_success"),setTimeout(function(){x.nav.api.go({href:"index?r=recommended",history:!0,open:!0})},1500),e.find(".welcome").on("click",function(){if("_this"==deep(a,"successHref")){var e=deep(n,"container.close");e&&e(),a.signInClbk&&a.signInClbk()}else x.nav.api.go({href:"index?r=recommended",history:!0,open:!0})})}},network:{id:"network",prev:function(e){x.app.platform.m.log("userwisard_network_fail"),e()},render:"network",after:function(e){x.app.errors.clbks.filluser=function(){app.errors.state.proxy||app.errors.state.proxymain||("network"!=u||x.app.platform.loadingWithErrors||k.to("captcha"),delete x.app.errors.clbks.filluser)}}},moneyfail:{id:"moneyfail",prev:function(e){e()},render:"moneyfail",after:function(n){function t(){x.app.platform.sdk.node.transactions.get.allBalance(function(e){n.find(".balance").html("Balance: "+x.app.platform.mp.coin(e)+" PKOIN")})}t(),n.find(".check").on("click",function(){topPreloader(20),x.app.platform.sdk.node.transactions.get.allBalance(function(e){topPreloader(100),0<e&&("moneyfail"==u&&k.to("settings"),delete x.app.platform.sdk.node.transactions.clbks.moneyfail),t()}),x.app.platform.sdk.node.transactions.clbks.moneyfail=function(){x.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&("moneyfail"==u&&k.to("settings"),delete x.app.platform.sdk.node.transactions.clbks.moneyfail)})}})}}},u=null,m=_.map(d,function(e,n){return n}),h={referral:function(){l(function(e){var n=c(),t=deep(document,"referrer");x.app.platform.m.log("registration_referal_name",e),x.app.platform.m.log("registration_referal_type",n),t&&x.app.platform.m.log("registration_referal_referrer",t)})}},v={request:function(o){x.sdk.users.requestFreeMoney(function(e,n){var t=x.sdk.address.pnet().address,a=x.app.settings.get(t,"request")||"";e||a?(x.app.settings.set(t,"request","true"),v.follow(),o&&o(!0)):("captcha"==n&&(p=!0,"money"!=u&&"captcha"!=u||k.to("captcha")),"error"==n&&(f=!0,"money"!=u&&"captcha"!=u||k.to("captcha")),o&&o(!1,"err"))})},check:function(n,e){x.app.platform.sdk.node.transactions.get.allBalance(function(e){n&&n(0<e)},e)},follow:function(){x.app.platform.sdk.node.transactions.clbks.filluser||(x.app.platform.sdk.node.transactions.clbks.filluser=function(){delete x.app.platform.sdk.node.transactions.clbks.filluser,v.check(function(e){e?"money"==u&&(x.app.platform.m.log("userwisard_money_success"),k.next()):v.follow()})})}},k={to:function(e,n){u=e,k.makeStep(n)},redo:function(e){k.makeStep(function(){})},next:function(e){(u=u?d[u].nextindex:d.captcha.id)&&k.makeStep(function(){})},makeStep:function(e){var t=d[u];t&&t.prev(function(){s.c&&(s.c.attr("step",t.id),y.panel(t,function(n){y.step(t,function(e){_scrollTop(e,i),n.find(".elpanel").addClass("active"),t.after(e,n)})}))})},timer:function(a,o,e){var i=new CircularProgress({radius:120,strokeStyle:"#00A3F7",lineCap:"round",lineWidth:1,font:"100 56px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#5D5D5D",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});a.find(".circle").html(i.el);function n(e){var n=secInTime(e/1e3).split(":");a.find(".t .min").html(n[0]),a.find(".t .sec").html(n[1]),i.options.text={value:""};var t=100*(1-e/(1e3*o));t<0&&(t=0),i.update(t)}timer=new Timer({ontick:function(){n(timer.getDuration())},onend:function(){e&&e()}}),timer.start(o),n(timer.getDuration())}},g=function(){if(u){var e=d[u],n=s.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),t=s.c.find(".stepsWrapperLine"),a=n.closest(".stepsWrapper").width();s.c.find(".step").width(a),t.css("margin-left","-"+r(u)*a+"px"),t.width(a*_.toArray(d).length)}},y={step:function(e,a){s.c.find(".step").removeClass("active");var n=s.c.find('.step[step="'+e.id+'"] .stepBody'),o=n.closest(".step"),i=s.c.find(".stepsWrapperLine");y[e.render](n,function(e){var n=o.closest(".stepsWrapper").width();s.c.find(".step").width(n),i.width(n*_.toArray(d).length);var t="-"+r(u)*n+"px";i.css("margin-left",t),o.closest(".step").addClass("active"),a&&a(e)})},panel:function(e,n){x.shell({name:"panel",el:s.panel,data:{step:e}},function(e){n&&n(e.el)})},captcha:function(e,n){x.shell({name:"captcha",el:e,data:{captcha:d.captcha.current}},function(e){n&&n(e.el)})},email:function(e,n){x.shell({name:"email",el:e,data:{}},function(e){n&&n(e.el)})},welcome:function(e,n){x.shell({name:"welcome",el:e,data:{}},function(e){n&&n(e.el)})},moneyfail:function(e,n){x.shell({name:"moneyfail",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){x.shell({name:"network",el:e,data:{}},function(e){n&&n(e.el)})},money:function(e,n){x.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,a,e){x.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:s.panel,success:function(){k.next()}},clbk:function(e,n){o=n,a&&a(t)}})}},w=function(){};return{primary:t,getdata:function(n,e){f=p=!1,a=e.settings.essenseData||{},u=null;var t={steps:d};x.app.user.validate()?x.app.nav.api.load({open:!0,href:"index",history:!0}):x.app.errors.connection()?x.app.nav.api.load({open:!0,href:"userpage?id=test",history:!0}):x.fastTemplate("panel",function(e){n(t)})},destroy:function(){window.removeEventListener("resize",g),o&&o.destroy(),o=null,s={},$("html").removeClass("fillinguser")},init:function(e){w(),(s={}).c=e.el.find("#"+x.map.id),s.panel=s.c.find(".panelWrapper"),window.addEventListener("resize",g),n=e,k.next(),(i=s.c.closest(".wndcontent")).length||(i=null),$("html").addClass("fillinguser"),e.clbk(null,e)}}}var x=new nModule,a={};return x.run=function(e){var n=x.addEssense(a,t,e);x.init(n,e)},x.stop=function(){_.each(a,function(e){e.destroy()})},x}();"undefined"!=typeof module?module.exports=filluser:(app.modules.filluser={},app.modules.filluser.module=filluser);
 /*_____*/ 
var uploadpeertube=function(){function o(e){var d,r=deep(e,"history"),s={},o=function(){};return{primary:r,getdata:function(e,r){s=r.settings.essenseData.actions;e({})},destroy:function(){d={}},init:function(e){o(),(d={}).c=e.el.find("#"+l.map.id),d.videoInput=d.c.find(".upload-video-file"),d.videoWallpaper=d.c.find(".upload-video-wallpaper"),d.videoError=d.c.find(".file-type-error"),d.wallpaperError=d.c.find(".wallpaper-type-error"),d.uploadProgress=d.c.find(".upload-progress-container"),d.videoInput.change(function(e){var r=e.target.files[0].name;d.videoError.text(r.slice(0,20)+(20<r.length?"...":"")),d.videoError.removeClass("error-message")}),d.videoWallpaper.change(function(e){var r=e.target.files[0].name;d.wallpaperError.text(r.slice(0,20)+(20<r.length?"...":"")),d.wallpaperError.removeClass("error-message")}),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fas fa-upload"></i> Upload',fn:function(e,r){var o=d.videoInput.prop("files"),a=d.videoWallpaper.prop("files"),n=e.find(".upload-video-name").val(),i=e.find(".name-type-error");i.text("");var t={};if(!o[0])return d.videoError.text("No video selected"),void d.videoError.addClass("error-message");if(!o[0].type.includes("video"))return d.videoError.text("Incorrect video format"),void d.videoError.addClass("error-message");if(t.video=o[0],a[0]){if(console.log(a[0].type),"image/jpeg"!==a[0].type&&"image/jpg"!==a[0].type)return d.wallpaperError.text("Incorrect wallpaper format. Supported: .jpg, .jpeg"),void d.wallpaperError.addClass("error-message");t.image=a[0]}n?(t.name=n,t.uploadFunction=function(e){var r=e.toFixed(2);d.uploadProgress.find(".upload-progress-bar").css("width",r+"%"),d.uploadProgress.find(".upload-progress-percentage").text(r+"%")},t.successFunction=function(e){"error"!==e?(s.added(e),r.close()):sitemessage("Uploading error")},d.uploadProgress.removeClass("hidden"),l.app.peertubeHandler.uploadVideo(t)):i.text("Name is empty")}}},close:function(){},success:function(e,r){wndObj=r,wnd=e},offScroll:!0,noInnerScroll:!0,class:"uploadpeertube",swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30}}}var l=new nModule,a={};return l.run=function(e){var r=l.addEssense(a,o,e);l.init(r,e)},l.stop=function(){_.each(a,function(e){e.destroy()})},l}();"undefined"!=typeof module?module.exports=uploadpeertube:(app.modules.uploadpeertube={},app.modules.uploadpeertube.module=uploadpeertube);
 /*_____*/ 
var token=function(){function n(e){var t=deep(e,"history"),o=function(){var e=parameters().token||null;return{type:parameters().type||null,token:e}};return{primary:t,getdata:function(t){var n=o();if("activate"!=n.type)a.app.platform.ws.addBlock();else{var e=a.app.platform.ws.messages.CUSTOMER.ACTIVE;delete e.clbks.successDialog,e.clbks.success=function(){var e=deep(a,"app.modules.menu.module");e&&e.restart()}}a.app.platform.sdk.tokens.check(n.token,function(e){n.result=e,t(n)})},destroy:function(){a.app.platform.ws.removeBlock(),{}},init:function(e){o(),{}.c=e.el.find("#"+a.map.id),e.clbk(null,e)}}}var a=new nModule,o={};return a.run=function(e){var t=a.addEssense(o,n,e);a.init(t,e)},a.stop=function(){_.each(o,function(e){e.destroy()})},a}();"undefined"!=typeof module?module.exports=token:(app.modules.token={},app.modules.token.module=token);
 /*_____*/ 
var applications=function(){function t(n){var t,i,o=deep(n,"history"),a=function(a,e){a&&a.github&&$.get(a.github.url,{},function(n){var o=deep(n,"assets")||[],t=_.find(o,function(n){return n.name==a.github.name});if(t){r.app.platform.m.log("registration_application_download",a.github.name);var i=document.createElement("a");i.setAttribute("href",t.browser_download_url),i.setAttribute("download","download"),i.click(),e&&e(t.browser_download_url)}})},e=function(n){var o=os();r.app.platform.m.log("registration_application"),o&&r.app.platform.applications[i.key][o]&&"undefined"==typeof _Electron&&!window.cordova?l.os(r.app.platform.applications[i.key][o],n):n&&n()},l={os:function(o){r.shell({turi:"registration",name:"os",el:t.c.find(".currentos"),data:{os:o,last:!1}},function(n){n.el.find(".downloadOs").on("click",function(){a(o,function(n){t.c.find(".os").addClass("rundownloading"),t.c.find(".skipositem").html('<div class="downloadstart">'+r.app.localization.e("e13011")+'</div><div><a href="'+n+'"><b>'+r.app.localization.e("e13012")+"</b></a></div>")})})})}},d=function(){};return{primary:o,getdata:function(n,o){(i=deep(o,"settings.essenseData")||{}).key||(i.key="ui");n({})},destroy:function(){t={}},init:function(n){d(),(t={}).c=n.el.find("#"+r.map.id),e(),n.clbk(null,n)}}}var r=new nModule,i={};return r.run=function(n){var o=r.addEssense(i,t,n);r.init(o,n)},r.stop=function(){_.each(i,function(n){n.destroy()})},r}();"undefined"!=typeof module?module.exports=applications:(app.modules.applications={},app.modules.applications.module=applications);
 /*_____*/ 
var lastcomments=function(){function s(n){var s,t=deep(n,"history"),e=function(n,t,s){l.app.platform.app.nav.api.load({open:!0,href:"post?s="+n,inWnd:!0,clbk:function(n,t){app.nav.wnds.post=t},essenseData:{share:n,hr:"index?",reply:{answerid:t,parentid:s||"",noaction:!0}}})},o=function(){var n=$(this).attr("id"),t=$(this).attr("pid"),s=$(this).closest(".commentgroup").attr("share");e(s,n,t)},a=function(n){l.shell({name:"lastcommentslist",el:s.c,data:{comments:n}},function(n){n.el.find(".comment").on("click",o),n.el.find(".image").imagesLoaded({background:!0},function(n){})})},c=function(){},i=function(){!function(c){l.app.platform.sdk.comments.last(function(t,o){var a=group(t,function(n){return n.txid}),n=_.map(a,function(n,t){return t});l.app.platform.sdk.node.shares.getbyid(n,function(n,s){var e=[];_.each(t,function(n){var t=app.platform.sdk.node.shares.storage.trx[n.txid];t&&n&&(e.push(t.address),e.push(n.address))}),e=_.uniq(e),l.sdk.users.get(e,function(n,t){c&&c(a,o||s||t)},!0)})})}(function(n,t){if(t)return l.iclbks.main=i,void s.c.addClass("hidden");s.c.removeClass("hidden"),a(n)})};return{primary:t,getdata:function(n){n({})},destroy:function(){s={},delete l.app.platform.ws.messages.newblocks.clbks.lastcomments,delete l.app.platform.ws.messages["new block"].clbks.lastcomments,delete l.app.platform.clbks._focus.lastcomments},init:function(n){c(),(s={}).c=n.el.find("#"+l.map.id),l.app.platform.ws.messages.newblocks.clbks.lastcomments=l.app.platform.ws.messages["new block"].clbks.lastcomments=function(){i()},l.app.platform.clbks._focus.lastcomments=function(n){120<n&&"undefined"!=typeof _Electron&&i()},i(),n.clbk(null,n)}}}var l=new nModule,e={};return l.run=function(n){var t=l.addEssense(e,s,n);l.init(t,n)},l.stop=function(){_.each(e,function(n){n.destroy()})},l}();"undefined"!=typeof module?module.exports=lastcomments:(app.modules.lastcomments={},app.modules.lastcomments.module=lastcomments);
 /*_____*/ 
var articles=function(){function n(a){var t,n=deep(a,"history"),e=function(){f.nav.api.load({open:!0,href:"article?aid="+makeid(),inWnd:!0,history:!0,essenseData:{save:function(t){f.app.platform.sdk.articles.storage||(f.app.platform.sdk.articles.storage=[]),_.find(f.app.platform.sdk.articles.storage,function(a){if(t.id==a.id)return!0})||f.app.platform.sdk.articles.storage.unshift(t),f.app.platform.sdk.articles.save()},close:function(){d.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},i=function(a){f.nav.api.load({open:!0,href:"article?aid="+a.id,inWnd:!0,history:!0,essenseData:{art:a,save:function(a){f.app.platform.sdk.articles.save()},close:function(){d.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},o=function(a){removeEqual(f.app.platform.sdk.articles.storage,{id:a}),t.c.find('.art[art="'+a+'"]').remove(),f.app.platform.sdk.articles.save(),d.ini()},r=function(){var a=$(this).closest(".art").attr("art");dialog({html:f.app.localization.e("e13018"),btn1text:f.app.localization.e("dyes"),btn2text:f.app.localization.e("dno"),class:"zindex",success:function(){o(a)}})},s=function(){e()},c=function(){var t=$(this).closest(".art").attr("art"),a=_.find(f.app.platform.sdk.articles.storage,function(a){return a.id==t});i(a)},l=function(){f.nav.api.load({open:!0,href:"author?address="+f.app.user.address.value.toString("hex"),history:!0}),f.closeContainer()},d={ini:function(){f.app.platform.sdk.articles.storage.length?t.c.removeClass("initial"):t.c.addClass("initial")},articles:function(){d.ini(),f.shell({name:"articles",el:t.articles.find(".artwrapper"),data:{articles:f.app.platform.sdk.articles.storage}},function(a){a.el.find(".artcnt").on("click",c),a.el.find(".remove").on("click",r)})}},p=function(){};return{primary:n,auto:function(){var t=parameters(),a=null;t.marticle&&!f.app.nav.wnds.article&&(t.aid&&(a=_.find(f.app.platform.sdk.articles.storage,function(a){return a.id==t.aid})),a?i(a):e())},getdata:function(a){a({})},destroy:function(){t={}},init:function(a){p(),(t={}).c=a.el.find("#"+f.map.id),t.articles=t.c.find(".articles"),t.add=t.c.find(".add"),t.add.on("click",s),t.c.find(".top").on("click",l),d.articles(),a.clbk(null,a)},wnd:{class:"allscreen a100 article "}}}var f=new nModule,e={};return f.run=function(a){var t=f.addEssense(e,n,a);f.init(t,a)},f.stop=function(){_.each(e,function(a){a.destroy()})},f}();"undefined"!=typeof module?module.exports=articles:(app.modules.articles={},app.modules.articles.module=articles);
 /*_____*/ 
var video=function(){function i(e){var n,a,i=deep(e,"history"),l=[{key:"gMrKZfHJSxA",width:560,height:315,source:"youtube",loc:{en:{title:"Pocketnet - Decentralized Social Network on the Blockchain",id:"gMrKZfHJSxA",description:"Pocketnet is a fully decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity.No corporation behind it to take fruits of your labor. All advertising revenue is split equally between node operators and those who publish highly rated content. Your subscribers always see your content, unless they decide to unsubscribe. Pocketnet is self-policed by the platform participants with good reputation. Nobody records your keystrokes, viewing habits or searches. Join The New Peer-To-Peer Internet: Go to Pocketnet.app and join for free now"}}}],r={validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,n,i,o){o=o||"4";var t={Email:e,Name:n};t.Action||(t.Action="ADDTOMAILLIST"),t.TemplateID||(t.TemplateID=o),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:t,dataType:"json",success:function(){i&&i()}})},joinSuccess:function(e){c.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){c.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var n=e.el.find(".email"),i=e.el.find(".name"),o=n.val(),t=i.val();if(r.validateEmail(o)&&t)return r.saveEmail(o,t),r.joinSuccess(o,t),!0},clbk:function(e){function n(){var e=o.val(),n=i.val();return r.validateEmail(e)&&n?(t.removeClass("disabled"),!0):(t.addClass("disabled"),!1)}var i=e.find(".name"),o=e.find(".email"),t=e.find(".btn1");t.addClass("disabled"),t.on("click",function(){}),i.focus(),i.on("change",n),i.on("keyup",n),o.on("change",n),o.on("keyup",n)},class:"one joinbeta"})},{action:e})}},o=function(){r.join()},t=function(){var e='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+a.id+'?rel=0&amp;autoplay=1" frameborder="0" allow="autoplay;" allowfullscreen></iframe>';"vimeo"==a.source&&(e='<iframe src="https://player.vimeo.com/video/'+a.id+'?title=0&byline=0&portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),"bitchute"==a.source&&(e='<iframe width="560" height="315" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://www.bitchute.com/embed/'+a.id+'/"></iframe>'),"peertube"==a.source&&(e='<iframe width="560" height="315" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://peer.tube/videos/embed/'+a.id+'/"></iframe>'),n.c.find(".container").html(e),a.description&&n.c.find(".description").html(a.description)};return{primary:i,getdata:function(e,n){var i=parameters();i.v||(i.v="gMrKZfHJSxA");function o(){c.nav.api.load({open:!0,href:"page404",history:!0})}var t=_.find(l,function(e){return e.key==i.v});t?(c.app.el.menu.addClass("logoview").addClass("landing"),function(e){var n=deep(e,"loc.en")||null;n&&(e=_.extend(e,n))}(a=_.clone(t)),a.id?e(a):o()):o()},destroy:function(){n={},c.app.el.menu.removeClass("logoview").removeClass("landing"),c.app.el.app.removeClass("videoActive")},init:function(e){(n={}).c=e.el.find("#"+c.map.id),n.container=n.c.find(".container"),n.c.click&&n.c.click(),c.app.el.app.addClass("videoActive"),n.c.find(".joinbeta").on("click",o),setTimeout(function(){t(),function(e,n){var i=n.width(),o=i/(e.width/e.height);n.find("iframe").width(i),n.find("iframe").height(o)}(a,n.container),n.container.find("iframe").fadeIn(200),n.c.find(".description").fadeIn(200),e.clbk(null,e)},100)},animation:!1}}var c=new nModule,o={};return c.run=function(e){var n=c.addEssense(o,i,e);c.init(n,e)},c.stop=function(){_.each(o,function(e){e.destroy()})},c}();"undefined"!=typeof module?module.exports=video:(app.modules.video={},app.modules.video.module=video);
 /*_____*/ 
var article=function(){function t(e){var s,c,r,a,t,n=deep(e,"history"),o=/[,.!?;:()<> \n\r]/g,p={message:g.app.localization.e("emptymessage")},d={newart:function(){return g.app.platform.sdk.articles.empty()},complete:function(){r.save&&r.save(c),i.close(),r.complete&&r.complete(c)},change:function(e){c.content=e,c.time=Math.floor((new Date).getTime()/1e3),r.save&&r.save(c)},changecaption:function(e){c.caption.value=e,c.time=Math.floor((new Date).getTime()/1e3),r.save&&r.save(c)},trx:function(o,i){console.log("trx",o,i,e),s.c&&s.c.addClass("loading"),r.share&&(o.aliasid=r.share.aliasid),g.sdk.node.transactions.create.commonFromUnspent(o,function(e,a){if(topPreloader(100),s.c&&s.c.removeClass("loading"),e)try{var t=new pShare;console.log("_import alias",e),t._import(e,!0),t.temp=!0,t.address=e.address,o.aliasid&&(t.edit="true"),g.app.platform.sdk.node.shares.add(t),console.log("alias",t),console.log("_alias",e),console.log("art.",c),c.txid=t.txid,c.ptime=Math.floor((new Date).getTime()/1e3),g.app.platform.sdk.user.survey(),d.complete()}catch(e){console.log(e)}else if(i)i(!1,p[a]);else{var n=g.app.platform.errorHandler(a,!0);n&&sitemessage(n)}},e)},fromShare:function(e){var a=g.app.platform.sdk.articles.empty();return a.caption.value=e.caption.v,a.content=[{value:e.message.v}],a},add:function(){var e=new Share,a=g.app.platform.sdk.articles.echo(c),t=(new Date).getTime();console.log("art",c,"text",a,t),e.message.set(a),e.caption.set(c.caption.value),e.images.set(g.app.platform.sdk.articles.getImages(a));var n=d.tagsFromText(a);e.tags.set(n),e.settings.v="a",e.settings.videos=g.app.platform.sdk.articles.getVideos(a),console.log("article share share share",e);var o=e.validation();if(o)p[o]&&sitemessage(p[o]);else{var i="Do you really want to publish this article?";r.share&&(i="Do you really want to change and publish this article?"),dialog({html:i,btn1text:g.app.localization.e("dyes"),btn2text:g.app.localization.e("dno"),class:"zindex",success:function(){a=filterXSS(a,{stripIgnoreTag:!0,whiteList:{a:["href","title","target"],br:["style"],b:["style"],span:["style"],figure:["style"],figcaption:["style","class"],i:["style"],img:["src","width","height"],div:["class","data-plyr-provider","data-plyr-embed-id"],p:[],ul:[],ol:[],li:[],h2:[],h1:[],h3:[],h4:[],h5:[],em:[],u:[],blockquote:[],strong:[],picture:["img-type"],source:["srcset","type"],strike:[]}}),e.message.set(a),console.log("init",e,a),d.trx(e)}})}},tagsFromText:function(e){var a=e.split(o),t=_.filter(a,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))});return _.each(t,function(e,a){t[a]=e.replace(/\#/g,"")}),t}},i={authorclose:function(){g.nav.api.load({open:!0,href:"author?address="+g.app.user.address.value.toString("hex"),history:!0}),g.closeContainer(),r.closeContainer&&r.closeContainer()},changecaption:function(){var e=$(this).val();d.changecaption(e)},change:function(){t=slowMade(function(){console.log("editor",a),console.log("serilize",a.serialize());var e=g.app.platform.sdk.articles.lightVideo(a.serialize());console.log("cnt",e),d.change(e)},t,300)},close:function(){r.close&&r.close(),g.closeContainer()},add:function(){d.add()},goto:function(){c.txid&&(g.closeContainer(),r.closeContainer&&r.closeContainer(),g.nav.api.load({open:!0,href:"index?s="+c.txid,history:!0}))}},f=function(e,a){s.caption.val(e.caption.value)},u=function(){};return{primary:n,getdata:function(e,a){r=a.settings.essenseData||{},c=r.art||d.newart(parameters().aid),r.share&&(c=d.fromShare(r.share)),console.log(c),e({art:c,ed:r})},destroy:function(){g.app.nav.api.history.removeParameters(["aid"]),s={}},init:function(e){u(),(s={}).c=e.el.find("#"+g.map.id),s.caption=s.c.find(".caption"),s.content=s.c.find(".content"),s.back=s.c.find(".back"),s.add=s.c.find(".add"),s.goto=s.c.find(".goto"),s.back.on("click",i.close),s.caption.on("keyup",i.changecaption),s.add.on("click",i.add),s.goto.on("click",i.goto),s.c.find(".uic").on("click",i.authorclose),s.c.find(".username").on("click",i.authorclose),function(e){a=new MediumEditor(".edt",{delay:500,targetBlank:!0,toolbar:{buttons:["bold","italic","underline","anchor","quote"],diffLeft:25,diffTop:10},anchor:{placeholderText:"Type a link",customClassOption:"btn",customClassOptionText:"Create Button"},paste:{cleanPastedHTML:!0,cleanAttrs:["style","dir"],cleanTags:["label","meta"]},anchorPreview:{hideDelay:300},placeholder:{text:"Text",hideOnClick:!1}}),$(function(){$(".edt").mediumInsert({editor:a,addons:{images:{label:'<span class="fas fa-camera"></span>',deleteScript:function(e,a){g.sdk.imagesH.delete(e)},fileDeleteOptions:{},preview:!0,captions:!0,captionPlaceholder:g.app.localization.e("e13013"),autoGrid:3,formData:{},upload:function(e,n){resize(e,1080,1080,function(e){var a=e.split(",");a[1]&&g.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:a[1]},success:function(e){var a=deep(e,"data.link");if(a){var t=deep(e,"data.deletehash");t&&g.sdk.imagesH.add(a,t)}else a="https://pocketnet.app/img/imagenotuploaded.jpg";n&&n(a)},fail:function(){l="https://pocketnet.app/img/imagenotuploaded.jpg",n&&n(l)}})})},fileUploadOptions:{acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i},styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'},grid:{label:'<span class="fa fa-th"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}},messages:{acceptFileTypesError:g.app.localization.e("e13014")+" ",maxFileSizeError:g.app.localization.e("e13015")+" "},uploadCompleted:function(e,a){i.change()},uploadFailed:function(e,a){}},embeds:{label:'<span class="fas fa-play"></span>',placeholder:g.app.localization.e("e13016"),styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}}}}}),a.subscribe("editableKeyup",function(){i.change()}),a.subscribe("editablePaste",function(){i.change()}),a.subscribe("editableBlur",function(){i.change()}),f(c),Plyr.setup(".js-player",function(e){}),e&&e()})}(),e.clbk(null,e)},wnd:{class:"allscreen a100 article articlebtn"}}}var g=new nModule,n={};return g.run=function(e){var a=g.addEssense(n,t,e);g.init(a,e)},g.stop=function(){_.each(n,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=article:(app.modules.article={},app.modules.article.module=article);
 /*_____*/ 
var system16 = (function() {

    var self = new nModule();

    var essenses = {};

    var Essense = function(p) {

        var proxy = {
            parameters: function() {



            }
        }

        var primary = deep(p, 'history');

        var el;

        var actions = {

        }



        var events = {

        }


        var renders = {

            nodeControl: function(clbk) {
                var composed = null;

                if (self.sdk.system16.tickstate) {
                    var state = deep(self, 'sdk.system16.tickstate.settings.node')
                    composed = self.sdk.system16.node.settings.compose(state)
                }

                renders.options(composed, el.nodecontrolcnt, function(p) {

                    p.el.find('input[pid="Enable"]').on('change', function(e) {
                        if (e.target.checked) {
                            dialog({
                                html: self.app.localization.e('nodeEnableNote'),
                                header: self.app.localization.e('nodeEnableNoteHeader'),
                                btn1text: self.app.localization.e('daccept'),
                                btn2text: self.app.localization.e('dcancel'),
                                success: function() {
                                    self.sdk.system16.request('node.enable', { v: e.target.checked }, function(data) {})
                                },
                                fail: function() {}
                            })
                        } else {
                            self.sdk.system16.request('node.enable', { v: e.target.checked }, function(data) {})
                        }
                    });


                    p.el.find('button[pid="binPath_Selector"]').on('click', function(e) {
                        self.sdk.system16.request('node.setBinPath', {}, function(er, msg) {
                            p.el.find('input[pid="binPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="dataPath_Selector"]').on('click', function(e) {
                        self.sdk.system16.request('node.setDataPath', {}, function(er, msg) {
                            p.el.find('input[pid="dataPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="confPath_Selector"]').on('click', function(e) {
                        self.sdk.system16.request('node.setConfPath', {}, function(er, msg) {
                            p.el.find('input[pid="confPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="setPrivateKey"]').on('click', function(e) {
                        e.preventDefault()

                        dialog({
                            html: self.app.localization.e('nodeWalletAdd'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('dno'),
                            success: function() {

                                let private = bitcoin.ECPair.fromPrivateKey(self.app.user.private.value).toWIF()
                                self.sdk.system16.request('node.setWallet', { private: private }, function(err, msg) {
                                    if (err) {
                                        dialog({
                                            html: msg,
                                            header: self.app.localization.e('error'),
                                            btn1text: self.app.localization.e('daccept'),
                                            class: 'one'
                                        })
                                    }
                                })

                            },
                            fail: function() {


                            }
                        })


                    });

                })
            },

            proxyOptions: function(clbk) {

                var composed = null;

                if (self.sdk.system16.tickstate) {
                    composed = self.sdk.system16.proxy.settings.compose(deep(self, 'sdk.system16.tickstate.settings'))
                }

                renders.options(composed, el.proxyoptions, clbk)
            },

            options: function(composed, _el, clbk) {

                self.shell({
                    name: 'options',
                    el: _el,
                    data: {
                        composed: composed
                    }

                }, function(p) {
                    ParametersLive(composed.o, p.el)
                    if (clbk) clbk(p)
                })
            },

            download: function() {
                if (el.downloadElectron.length) {

                    self.nav.api.load({
                        open: true,
                        id: 'applications',
                        el: el.downloadElectron,

                        eid: 'applications_ui',

                        essenseData: {

                        },

                        clbk: function(e, p) {

                            if (!el.c) return

                        }
                    })

                }
            }

        }

        var state = {
            save: function() {

            },
            load: function() {

            }
        }

        var initEvents = function() {

            self.sdk.system16.clbks.tick.system16 = function(settings, changed) {
                if (changed) {
                    renders.proxyOptions()
                    // renders.nodeControl()
                }
            }

        }

        var make = function() {
            renders.download()
            renders.proxyOptions()
            renders.nodeControl()
        }

        return {
            primary: primary,

            getdata: function(clbk) {

                var data = {};

                clbk(data);

            },

            destroy: function() {

                delete self.sdk.system16.clbks.tick.system16

                el = {};
            },

            init: function(p) {

                state.load();

                el = {};
                el.c = p.el.find('#' + self.map.id);

                el.downloadElectron = el.c.find('.downloadApplication.ui')
                el.proxyoptions = el.c.find('.proxyoptions')
                el.nodecontrolcnt = el.c.find('.nodecontrolcnt')

                initEvents();

                make()

                p.clbk(null, p);
            }
        }
    };



    self.run = function(p) {

        var essense = self.addEssense(essenses, Essense, p);

        self.init(essense, p);

    };

    self.stop = function() {

        _.each(essenses, function(essense) {

            essense.destroy();

        })

    }

    return self;
})();


if (typeof module != "undefined") {
    module.exports = system16;
} else {

    app.modules.system16 = {};
    app.modules.system16.module = system16;

}
 /*_____*/ 
var help=function(){function a(e){var a,n,t,o=deep(e,"history"),i={roadmap:[{d:"February 2019",n:"Social Network Beta Test Starts",r:!0},{d:"March 2019",n:"Windows Desktop App",r:!0},{d:"March 2019",n:"Search users, posts",r:!1},{d:"July 2019",n:"Linux Desktop App",r:!1},{d:"July 2019",n:"Android App",r:!1},{d:"August 2019",n:"Search by tags, recommended users, poll transactions",r:!1},{d:"August 2019",n:"Personal link Pocketnet.app/username plus history of personal posts and ability to search users’ posts (decentralized free blog hosting on Pocketnet blockchain)",r:!1},{d:"September 2019",n:"WebTorrent hosting of videos/images",r:!1},{d:"October 2019",n:"Boost posts for Pocketcoin",r:!1},{d:"June 2019",n:"Chinese, French, German, Russian, Spanish versions",r:!1},{d:"July 2020",n:"Peer-to-peer encrypted chat, including group chat",r:!1},{d:"August 2020",n:"Decentralized Internet!!! Ability for any user to create sidechains that hold sites/groups by locking POS in the main chain, with nodes having ability to merge stake them with the main chain optionally",r:!1},{d:"October 2020",n:"Decentralized reputation platform and crypto store",r:!1}]},c=function(e){t&&(t.destroy(),t=null),a.menuitem.removeClass("active"),a.c.find('.tipitem[page="'+e+'"]').addClass("active"),n=e,d.save(),s[e]?s[e](e):s.page(e)},r=function(){var e=$(this).attr("page");c(e)},s={application:function(n){this.page(n,function(e){console.log("PAGE",n)})},faq:function(n){this.page(n,function(e){console.log("PAGE",n),p.nav.api.load({open:!0,id:"faq",el:e.find(".faqWrapper"),clbk:function(e,n){console.log("EXTERNAL",n),t=n}})})},node:function(e){this.page(e,function(e){p.app.platform.papi.post("fe88f86430a018803921b338a7e629f9c9a52a2b4e3a36056d2adc0f0c74b5b4",e.find(".lenta"),function(e,n){t=n})})},videos:function(e){this.page(e,function(e){p.nav.api.load({open:!0,id:"lenta",el:e.find(".lenta"),animation:!1,mid:"videos",essenseData:{byauthor:!0,notscrollloading:!0,nocomments:!0,txids:["9f73a1efbfb4b0feb88c134740afa0ab293f8072a80ecbe9fe65ed85591910e6","ad9067c72a7be97c1752a00566940f372e5b526291278cf9bc203b99f81bbaf0","df4064b9e2c8b311fd097804f36802ceb68337dca396bfdea732c0f94c977a3a","986a6acba795482894876ac87440124e176cc02cff40558a3ec3d423850e2e93"]},clbk:function(e,n){t=n}})})},page:function(e,n){p.shell({name:e,el:a.page,data:{c:i}},function(e){n&&n(e.el)})}},d={save:function(){p.app.nav.api.history.addParameters({page:n})},load:function(){n=parameters().page||"faq"}};return{primary:o,getdata:function(e){d.load();var n=null;"undefined"!=typeof _Electron&&(n=require("electron").remote.app.getVersion());e({version:n})},destroy:function(){console.log("help"),t&&(t.destroy(),t=null),a={}},init:function(e){d.load(),(a={}).c=e.el.find("#"+p.map.id),a.page=a.c.find(".page"),a.menuitem=a.c.find(".tipitem"),a.caption=a.c.find(".bgCaption"),a.menuitem.on("click",r),a.caption.find(".checkversion").on("click",function(){if("undefined"!=typeof _Electron){a.caption.find(".checking").addClass("active");var e=require("electron");setTimeout(function(){e.ipcRenderer.send("electron-checkForUpdates"),e.ipcRenderer.on("updater-message",function(e,n){("update-downloaded"==n.msg||"update-not-available"==n.msg||n.linux&&"update-available"==n.msg)&&a.caption.find(".checking").removeClass("active")})},100)}}),c(n),e.clbk(null,e)}}}var p=new nModule,t={};return p.run=function(e){var n=p.addEssense(t,a,e);p.init(n,e)},p.stop=function(){_.each(t,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=help:(app.modules.help={},app.modules.help.module=help);
 /*_____*/ 
var proxylogs=function(){function s(n){var o,t=deep(n,"history"),e={requests:{ws:{path:"ws",name:"Websocket connections",color:"#006CFF"},requests:{path:"requestsIp",name:"Https requests ip",color:"#FF004E"}},blacklists:{black:{path:"iplimiter.black",name:"Black list ip count",color:"#20C02B"},tblack:{path:"iplimiter.black",name:"Temp Black list ip count",color:"#00C0FF"}}},r=function(n){n.find(".expandall").on("click",function(){$(this).closest(".report").toggleClass("active")})},l=function(n){var t={type:"spline",xtype:"datetime"};return"requests"==n&&(t.caption="Connections"),"blacklists"==n&&(t.caption="Black list"),t},a=function(n,t){var o=[],s=e[n];return _.each(s,function(s){var e={color:s.color,data:[],name:s.name};_.each(t,function(n){var t=deep(n,s.path)||0;e.data.push({y:t,x:new Date(n.time)})}),o.push(e)}),o},i={prepare:function(n,t,s){var e=l(n),o=a(n,t);console.log(n,o,t);var r=new f.app.platform.objects.graph({el:s,shell:f.shell,chart:e});return r.series=o,r},make:function(n,t,s,e){var o=i.prepare(n,t,s);o.render({maxPointsCount:100},function(){e&&e(o)})}},c={users:function(n){var t=[],s=n.find(".loadaddress");s.each(function(){var n=$(this).attr("address");n&&t.push(n)}),t.length&&f.shell({name:"user",data:{}},function(n){console.log(n),f.app.platform.sdk.users.get(t,function(n,t){s.each(function(){var n=$(this).attr("address");n&&($(this).removeAttr("address"),f.shell({name:"user",data:{address:n},el:$(this)},function(n){}))})})})},logs:function(e,t){f.shell({name:"logs",data:{logs:e},el:o.logs},function(n){r(n.el),n.el.find(".expand").on("click",function(){var n=$(this).closest(".log"),t=n.attr("ip"),s=_.find(e,function(n){return n.ip==t});n.hasClass("active")?n.toggleClass("active"):c.wslogs(n.find(".wslogswrp"),deep(s,"ws"),function(){n.toggleClass("active")},!0)}),t&&t()})},ws:function(t,s){f.shell({name:"ws",data:{ws:t},el:o.ws},function(n){r(n.el),c.wslogs(n.el.find(".wslogswrp"),t),s&&s()})},block:function(n,t){f.shell({name:"block",data:{block:n},el:o.block},function(n){r(n.el),t&&t()})},wslogs:function(n,t,s,e){f.shell({name:"wslogs",data:{ws:t,users:e},el:n},function(n){e&&c.users(n.el),n.el.find(".clickload").on("click",function(){c.users($(this).closest(".address"))}),s&&s()})},error:function(t){f.shell({name:"error",data:{},el:o.error},function(n){t&&t()})},stats:function(t,s){f.shell({name:"stats",data:{stats:t},el:o.stats},function(n){c.statsChart("requests",t,n.el.find(".chartswrapper")),c.statsChart("blacklists",t,n.el.find(".chartswrapper")),s&&s()})},statsChart:function(n,t,s,e){var o=$("<div></div>",{class:"chartWrapperbs"});s.append(o),i.make(n,t,o,e)}},s=function(e){f.app.platform.sdk.system.get.info(function(n,l){if(console.log(n),l){var a=[],t={},s=group(l.logs,function(n){return n.ip});_.each(s,function(n,s){var t=_.filter(l.ws,function(n){if(n.ip==s)return n.using=!0});t=_.sortBy(t,function(n){return-(n.ws_clients+n.ws_nodes)});var e=_.find(l.iplimiter,function(n,t){if(t==s)return n.using=!0}),o={},r=group(n,function(n){return n.s});_.each(r,function(n,t){o[t]=group(n,function(n){return deep(n,"p.method")||deep(n,"pn")||"others"})}),a.push({ws:t,requests:o,ip:s,block:e,count:n.length})}),a=_.sortBy(a,function(n){return-(n.count+10*n.ws.length)}),t.logs=a,t.ws=_.filter(l.ws,function(n){return!n.using}),t.ws=_.sortBy(t.ws,function(n){return-(n.ws_clients+n.ws_nodes)}),t.blocks=_.filter(l.iplimiter,function(n,t){return n.ip=t,!n.using}),e&&e(t)}else e&&e(null)})},u=function(s){f.app.platform.sdk.system.get.stats(function(n,t){n?s&&s(null):s&&s(t)})},p=function(){};return{primary:t,getdata:function(n){n({})},destroy:function(){o={}},init:function(n){p(),(o={}).c=n.el.find("#"+f.map.id),o.logs=n.el.find(".logsWrapper"),o.ws=n.el.find(".wsWrapper"),o.block=n.el.find(".blockWrapper"),o.stats=n.el.find(".statsWrapper"),o.error=n.el.find(".errorWrapper"),u(function(t){t&&c.stats(t),s(function(n){n&&(c.logs(n.logs),c.ws(n.ws),c.block(n.blocks)),t||n||c.error()})}),n.clbk(null,n)}}}var f=new nModule,e={};return f.run=function(n){var t=f.addEssense(e,s,n);f.init(t,n)},f.stop=function(){_.each(e,function(n){n.destroy()})},f}();"undefined"!=typeof module?module.exports=proxylogs:(app.modules.proxylogs={},app.modules.proxylogs.module=proxylogs);
 /*_____*/ 
var esystem = (function() {

    var self = new nModule();

    var essenses = {};

    var Essense = function(p) {

        var proxy = {
            parameters: function() {



            }
        }

        var primary = deep(p, 'history');

        var el;

        var actions = {

        }



        var events = {

        }


        var renders = {

            nodeControl: function(clbk) {
                var composed = null;

                if (self.sdk.esystem.tickstate) {
                    let state = deep(self, 'sdk.esystem.tickstate.settings.node')
                    composed = self.sdk.esystem.node.settings.compose(state)
                }

                renders.options(composed, el.nodecontrolcnt, function(p) {

                    p.el.find('input[pid="Enable"]').on('change', function(e) {
                        if (e.target.checked) {
                            dialog({
                                html: self.app.localization.e('nodeEnableNote'),
                                header: self.app.localization.e('nodeEnableNoteHeader'),
                                btn1text: self.app.localization.e('daccept'),
                                btn2text: self.app.localization.e('dcancel'),
                                success: function() {
                                    self.sdk.esystem.request('node.enable', { v: e.target.checked }, function(data) {})
                                },
                                fail: function() {}
                            })
                        } else {
                            self.sdk.esystem.request('node.enable', { v: e.target.checked }, function(data) {})
                        }
                    });


                    p.el.find('button[pid="binPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setBinPath', {}, function(er, msg) {
                            p.el.find('input[pid="binPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="dataPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setDataPath', {}, function(er, msg) {
                            p.el.find('input[pid="dataPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="confPath_Selector"]').on('click', function(e) {
                        self.sdk.esystem.request('node.setConfPath', {}, function(er, msg) {
                            p.el.find('input[pid="confPath"]').prop('value', msg)
                        })
                    });

                    p.el.find('button[pid="setPrivateKey"]').on('click', function(e) {
                        e.preventDefault()

                        dialog({
                            html: self.app.localization.e('nodeWalletAdd'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('dno'),
                            success: function() {

                                let private = bitcoin.ECPair.fromPrivateKey(self.app.user.private.value).toWIF()
                                self.sdk.esystem.request('node.setWallet', { private: private }, function(err, msg) {
                                    if (err) {
                                        dialog({
                                            html: msg,
                                            header: self.app.localization.e('error'),
                                            btn1text: self.app.localization.e('daccept'),
                                            class: 'one'
                                        })
                                    }
                                })

                            },
                            fail: function() {


                            }
                        })


                    });

                })
            },

            proxyOptions: function(clbk) {

                var composed = null;

                if (self.sdk.esystem.tickstate) {
                    composed = self.sdk.esystem.proxy.settings.compose(deep(self, 'sdk.esystem.tickstate.settings'))
                }

                renders.options(composed, el.proxyoptions, clbk)
            },

            options: function(composed, _el, clbk) {

                self.shell({
                    name: 'options',
                    el: _el,
                    data: {
                        composed: composed
                    }

                }, function(p) {
                    ParametersLive(composed.o, p.el)
                    if (clbk) clbk(p)
                })
            },

            download: function() {
                if (el.downloadElectron.length) {

                    self.nav.api.load({
                        open: true,
                        id: 'applications',
                        el: el.downloadElectron,

                        eid: 'applications_ui',

                        essenseData: {

                        },

                        clbk: function(e, p) {

                            if (!el.c) return

                        }
                    })

                }
            }

        }

        var state = {
            save: function() {

            },
            load: function() {

            }
        }

        var initEvents = function() {

            self.sdk.esystem.clbks.tick.esystem = function(settings, changed) {
                if (changed) {
                    renders.proxyOptions()
                    // renders.nodeControl()
                }
            }

        }

        var make = function() {
            renders.download()
            renders.proxyOptions()
            renders.nodeControl()
        }

        return {
            primary: primary,

            getdata: function(clbk) {

                var data = {};

                clbk(data);

            },

            destroy: function() {

                delete self.sdk.esystem.clbks.tick.esystem

                el = {};
            },

            init: function(p) {

                state.load();

                el = {};
                el.c = p.el.find('#' + self.map.id);

                el.downloadElectron = el.c.find('.downloadApplication.ui')
                el.proxyoptions = el.c.find('.proxyoptions')
                el.nodecontrolcnt = el.c.find('.nodecontrolcnt')

                initEvents();

                make()

                p.clbk(null, p);
            }
        }
    };



    self.run = function(p) {

        var essense = self.addEssense(essenses, Essense, p);

        self.init(essense, p);

    };

    self.stop = function() {

        _.each(essenses, function(essense) {

            essense.destroy();

        })

    }

    return self;
})();


if (typeof module != "undefined") {
    module.exports = esystem;
} else {

    app.modules.esystem = {};
    app.modules.esystem.module = esystem;

}
 /*_____*/ 
var connection=function(){function o(e){var i,a=deep(e,"history"),o=function(e,o){var a=y.app.platform.apiproxy;y.app.platform.apiproxy=e,y.app.platform.sdk.proxy.info(function(e,a){o&&o(!a)}),y.app.platform.nodeid=a},l=function(e,o){var a=y.app.platform.nodeid;y.app.platform.nodeid=e,y.app.platform.sdk.node.get.time(function(e,a){o&&o(!a)}),y.app.platform.nodeid=a},c=function(e,a){o(e,function(e){e?a&&a(!0):(dialog({html:y.app.localization.e("e13052"),class:"one zindex"}),a&&a(!1))})},n=function(e,a){l(e,function(e){e?a&&a(!0):(dialog({html:y.app.localization.e("e13053"),class:"one zindex"}),a&&a(!1))})},r={preloader:function(e){e?i.c.addClass("loading"):i.c.removeClass("loading")},addproxy:function(t,p){var s=!1,i="create",e=y.app.localization.e("e13054"),a=y.app.localization.e("add");t&&(s=!0,i="update",e=y.app.localization.e("e13055"),a=y.app.localization.e("save")),t=t||{};var r={host:new Parameter({type:"STRING",name:y.app.localization.e("e13056"),id:"host",defaultValue:t.host||"",placeholder:"0.0.0.0",require:!0}),port:new Parameter({type:"STRING",name:"RPC Port",id:"port",defaultValue:t.port||"8888",placeholder:"8888",require:!0}),ws:new Parameter({type:"STRING",name:"WS Port",id:"ws",defaultValue:t.ws||"8088",placeholder:"8088",require:!0})},o={close:{class:"close",html:'<i class="fas fa-times"></i> '+y.app.localization.e("close"),fn:function(e,a){a.close()}},success:{class:"success",html:'<i class="fas fa-check"></i> '+a,fn:function(o,l){var n={},a=!0;if(_.each(r,function(e){n[e.id]=e.value||t[e.id],e.value||(a=!1)}),a){n.user=!0,n.id=y.app.platform.sdk.proxy.makeid(n);var e=y.app.platform.sdk.proxy.all();_.find(e,function(e){return e.id==n.id})?sitemessage(y.app.localization.e("e13058")):(o.find(".addproxy").addClass("loading"),c(n,function(e){if(o.find(".addproxy").removeClass("loading"),e){var a=y.app.platform.sdk.proxy[i](n,t.id);s||(y.app.platform.apiproxy=n,a=!0),p&&p(n,a),l.close()}}))}else sitemessage(y.app.localization.e("e13057"))}}};s&&(o.delete={class:"delete ghost",html:'<i class="fas fa-trash"></i> '+y.app.localization.e("delete"),fn:function(e,a){dialog({class:"zindex",html:y.app.localization.e("e13059"),success:function(){var e=y.app.platform.sdk.proxy.remove(t.id);p&&p(null,e),a.close()}})}}),y.shell({destroy:function(){},insert:"wnd",name:"addproxy",data:{parameters:r},wnd:{header:e,buttons:o,noInnerScroll:!0,class:"addproxywnd"}},function(e){ParametersLive(_.toArray(r),e.el),e.el.find(".host input").focus()})},proxieslist:function(e,n){function t(e){e.close(),r.connectproxy()}var a=y.app.platform.sdk.proxy.all(),o={close:{class:"close",html:'<i class="fas fa-times"></i> '+y.app.localization.e("close"),fn:function(e,a){console.log("close"),a.close()}},success:{class:"success",html:'<i class="fas fa-plus"></i> '+y.app.localization.e("e13054"),fn:function(o,l){r.addproxy(null,function(e,a){a?t(l):u.proxieslist(o,l)})}}},p={destroy:function(){},name:"proxieslist",data:{proxies:a,proxy:y.app.platform.apiproxy,ele:r.ele()},wnd:{header:y.app.localization.e("e13060"),noInnerScroll:!0,class:"proxieslistwnd",buttons:o}};e?p.el=e:p.insert="wnd",y.shell(p,function(l){l.el.find(".proxy").length?l.el.find(".proxieslist").removeClass("empty"):l.el.find(".proxieslist").addClass("empty"),l.el.find(".name").on("click",function(){var e=$(this).closest(".proxy").hasClass("active"),a=$(this).closest(".proxy").attr("pid");if(!e)if("none"==a)dialog({html:y.app.localization.e("e13061"),class:"zindex",success:function(){r.using(!0),u.active(),(l.container||n).close()}});else{var o=y.app.platform.sdk.proxy.find(a);l.el.find(".proxieslist").addClass("loading"),c(o,function(e){l.el.find(".proxieslist").removeClass("loading"),e&&y.app.platform.sdk.proxy.changeWithDialog(o,function(){(l.container||n).close(),u.proxy(),u.active()})})}}),l.el.find(".edit").on("click",function(){var e=$(this).closest(".proxy").attr("pid"),a=y.app.platform.sdk.proxy.find(e);a&&r.addproxy(a,function(e,a){a?t(l.container||n):r.proxieslist(p.el)})})})},addnode:function(t,e){var p=!1,a="create",o=y.app.localization.e("e13044"),l=y.app.localization.e("add");t&&(p=!0,a="update",o=y.app.localization.e("e13062"),l=y.app.localization.e("save")),t=t||{};var s={saveto:new Parameter({type:"VALUES",name:y.app.localization.e("save"),id:"saveto",defaultValue:"proxy",possibleValues:["proxy","locally"],possibleValuesLabels:[y.app.localization.e("onproxy"),y.app.localization.e("locally")],require:!0}),host:new Parameter({type:"STRING",name:y.app.localization.e("nodehost"),id:"host",defaultValue:t.host||"",placeholder:"0.0.0.0",require:!0}),port:new Parameter({type:"STRING",name:y.app.localization.e("e13063"),id:"port",defaultValue:t.port||"38081",placeholder:"38081",require:!0}),ws:new Parameter({type:"STRING",name:y.app.localization.e("e13064"),id:"ws",defaultValue:t.ws||"8087",placeholder:"8087",require:!0}),nodename:new Parameter({type:"STRING",name:y.app.localization.e("e13065"),id:"nodename",defaultValue:(t.nodename||(y.app.platform.api.clearname(deep(app,"platform.sdk.user.storage.me.name"))||"New")+" node").replace(/\+/g," "),placeholder:y.app.localization.e("e13066"),require:!0}),rpcuser:new Parameter({type:"STRING",name:y.app.localization.e("e13067"),id:"rpcuser",placeholder:y.app.localization.e("e13068"),defaultValue:t.rpcuser||"",require:!0}),rpcpwd:new Parameter({type:"STRING",name:y.app.localization.e("e13069"),id:"rpcpwd",defaultValue:t.rpcpwd||"",placeholder:y.app.localization.e("e13070"),require:!0})};!y.app.platform.dontuseapiproxy&&y.app.platform.apiproxy||(s.saveto=new Parameter({type:"VALUES",name:y.app.localization.e("save"),id:"saveto",defaultValue:"locally",possibleValues:["locally"],possibleValuesLabels:[y.app.localization.e("locally")],require:!0})),console.log("ap",s);var n={close:{class:"close",html:'<i class="fas fa-times"></i> '+y.app.localization.e("close"),fn:function(e,a){a.close()}},success:{class:"success",html:'<i class="fas fa-check"></i> '+l,fn:function(e,o){var l=_.clone(t);if(t.host=s.host.value,t.port=s.port.value,t.ws=s.ws.value,t.nodename=s.nodename.value,t.rpcuser="",t.rpcpwd="","locally"==s.saveto.value?(t.rpcuser=s.rpcuser.value||"",t.rpcpwd=s.rpcpwd.value||"",t.locally=!0):(delete t.rpcuser,delete t.rpcpwd),t.host&&t.port&&t.ws&&t.nodename){var n=_.clone(t);delete n.addedby,delete n.date,n.locally||delete n.locally,y.app.platform.sdk.node.sys[a+s.saveto.value](n,function(e,a){e?(t=_.clone(l),sitemessage(e)):(p?(i.list.html(""),u.nodes(y.app.platform.nodes)):(y.app.platform.nodes||(y.app.platform.nodes=[]),y.app.platform.nodes.push(a),u.nodes([a])),y.app.platform.nodeid&&y.app.platform.nodeid.host!=n.host?o.close():r.connectnode(n,function(){o.close()}),u.active())})}else sitemessage(y.app.localization.e("e13071"))}}};p&&(s.host.disabled=!0,s.saveto.hidden=!0,t.locally?s.saveto.value="locally":s.saveto.value="proxy",n.delete={class:"delete ghost",html:'<i class="fas fa-trash"></i> '+y.app.localization.e("delete"),fn:function(e,o){dialog({class:"zindex",html:y.app.localization.e("e13072"),success:function(){var e="revoke";e=t.locally?"revokelocally":"revokeproxy",y.app.platform.sdk.node.sys[e]({host:t.host},function(e,a){e?sitemessage(e):(i.list.find('.node[host="'+t.host+'"]').closest(".nodewrapepr").remove(),u.empty(),t.host==y.app.platform.nodeid.host?r.connectnode(null,function(){o.close()}):o.close())})}})}}),y.shell({destroy:function(){},insert:"wnd",name:"addnode",data:{parameters:s},wnd:{header:o,buttons:n,noInnerScroll:!0,class:"addnodewnd"}},function(e){ParametersLive(_.toArray(s),e.el);function a(){e.el.find(".addnode").attr("saveto",s.saveto.value)}a(),s.saveto._onChange=function(){a()}})},connectproxy:function(e){y.app.platform.nodeid=null,y.app.platform.nodes=null,y.app.errors.clear(),y.app.platform.state.save(),y.app.platform.restart(function(){app.reload(function(){}),e&&e()})},connectnode:function(a,o){r.preloader(!0),n(a,function(e){e?(y.app.platform.nodeid=a,y.app.platform.state.save(),u.active(),y.app.errors.clear(),y.app.platform.restart(function(){r.preloader(!1),app.reload(function(){}),o&&o()})):r.preloader(!1)})},ele:function(){return"undefined"!=typeof _Electron},using:function(e){y.app.platform.dontuseapiproxy=e,y.app.platform.sdk.proxy.save(),u.proxy(),r.connectproxy()}},t=function(){y.app.platform.dontuseapiproxy?r.using(!y.app.platform.dontuseapiproxy):dialog({html:y.app.localization.e("e13073"),class:"zindex",success:function(){r.using(!y.app.platform.dontuseapiproxy)}})},p=function(){r.proxieslist()},s=function(){r.addnode()},d=function(){var a=$(this).closest(".node").attr("host"),o=$(this).closest(".node").attr("locally");o="true"==o;var e=_.find(y.app.platform.nodes,function(e){return e.host==a&&e.locally==o});e&&r.addnode(e)},f=function(){var e=$(this).closest(".node");if(!e.hasClass("active")){var a=e.attr("host"),o=e.attr("locally");o="true"==o;var l=_.find(y.app.platform.nodes,function(e){return e.host==a&&e.locally==o});r.connectnode(l)}},u={nodes:function(e,a){y.shell({inner:append,name:"nodes",data:{nodes:e},el:i.list},function(){u.empty(),u.active(),a&&a()})},empty:function(){i.list.find(".node").length?i.nodes.removeClass("empty"):i.nodes.addClass("empty")},active:function(){i.list.find(".node").removeClass("active"),y.app.platform.nodeid&&i.list.find('.node[host="'+y.app.platform.nodeid.host+'"][locally="'+(y.app.platform.nodeid.locally||"false")+'"]').addClass("active")},proxy:function(){y.app.platform.dontuseapiproxy?(i.cc.removeClass("useproxy"),i.cc.addClass("shownodes"),i.currentproxy.html(y.app.localization.e("e13051"))):(i.cc.addClass("useproxy"),y.app.platform.apiproxy?(i.cc.addClass("shownodes"),i.currentproxy.html("https://"+app.platform.apiproxy.host+":"+app.platform.apiproxy.port+"; wss:"+app.platform.apiproxy.ws)):(i.cc.removeClass("shownodes"),i.currentproxy.html(y.app.localization.e("notselected"))))}},m=function(){};return{primary:a,getdata:function(e){var a={ele:r.ele()};window.cordova,e(a)},destroy:function(){i={}},init:function(e){m(),(i={}).c=e.el.find("#"+y.map.id),i.list=i.c.find(".list"),i.add=i.c.find(".addnewNode"),i.nodes=i.c.find(".nodespart"),i.cc=i.c.find(".connection"),i.currentproxy=i.c.find(".current"),i.add.on("click",s),i.c.on("click",".edit",d),i.c.on("click",".connectnode",f),i.c.find(".openproxielist").on("click",p),i.c.find(".usingproxy").on("click",t),u.proxy(),i.nodes.addClass("loading"),y.app.platform.sdk.system.get.nodes(!0,function(){i.nodes.removeClass("loading"),u.nodes(y.app.platform.nodes)}),e.clbk(null,e)}}}var y=new nModule,l={};return y.run=function(e){var a=y.addEssense(l,o,e);y.init(a,e)},y.stop=function(){_.each(l,function(e){e.destroy()})},y}();"undefined"!=typeof module?module.exports=connection:(app.modules.connection={},app.modules.connection.module=connection);
 /*_____*/ 
var donations=function(){function t(n){var i,e=deep(n,"history"),t=["PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5","PTziv8ym7eJRUfyfAFBejJgEYemTdUgFzH","PBE1MLbsFoY3o1YW6t3Goi6spS1y9GY1vj","PRV1eoYkhA5PGkASm2tyD12xwdQnigbpkp","PRCeHituQ5WN2EXRZz4t9qTYyCBqTc4g4M","P9V67HjuApdEhj4DZxNnibxEqSnmCPbxvB","PA57U1QmmowNzSaz6ThG2EPs34QCsLyksL","PL7RNWypccYBPsDAygW3H4aKfzGBwMeWyt","PDUGAwFmRRSnSVTtcAuyVrTLAREm6HN2BC","PPvPW1sUAA1KPxcwbVKVk2EEp3uWkAKn2U","PWkUgSod6FEyVq8Ve1dWChWMC8HcXJcLro"],a={amount:new Parameter({name:f.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:f.app.localization.e("wsamountof"),format:{Precision:6}})},o=[{id:"btc",name:"Bitcoin",action:function(n){u.ways.ltcbtc(n)},qrname:"bitcoin"},{id:"ltc",name:"Litecoin",qrname:"litecoin",action:function(n){u.ways.ltcbtc(n)}},{id:"xmr",name:"Monero",qrname:"monero",action:function(n){u.ways.xmr(n)}}],s={},c=null,u={checkFunds:function(n,e,t){u.status(n,e,function(n,e){t&&t(e)})},waitfunds:function(e,t,a,o){s[e]=t,r.save(),l.address(e,t,o,a,function(n){c=setInterval(function(){u.checkFunds(e,t,function(n){"AWAITINGFUNDS"!=n.Status&&"AWAITINGDONATION"!=n.Status&&(clearInterval(c),c=null),"AWAITINGFUNDS"==n.Status||"AWAITINGDONATION"==n.Status||"EXPIREDAWAITINGFUNDS"==n.Status?l.address(e,t,o,n):l.thankyou(o,!1,a)})},6e4)})},ways:{ltcbtc:function(t){var a=t.id;s[a]?(console.log("cur, storage[cur]",a,s[a]),u.status(a,s[a],function(n,e){"AWAITINGFUNDS"==e.Status||"AWAITINGDONATION"==e.Status?u.waitfunds(a,s[a],e,t):"EXPIREDAWAITINGFUNDS"==e.Status?u.address(a,function(n,e){u.waitfunds(a,n,e,t)}):(delete s[a],r.save(),l.thankyou(t,!0,e))})):u.address(a,function(n,e){u.waitfunds(a,n,e,t)})},xmr:function(n){l.xmraddress(n,function(n){})},paypal:function(n){window.open("https://www.paypal.me/pocketnet","_blank").focus(),l.thankyou(n)}},donate:function(){u.hidepage(function(){l.ways()})},hidepage:function(n){i.c.find(".hideprocess").fadeOut(200,n)},showpage:function(n){i.c.find(".hideprocess").fadeIn(200,n)},status:function(n,e,t){f.app.platform.sdk.exchanges.status(n,e,t)},address:function(n,t){f.app.ajax.run({data:{Action:"GETADDRESSFORDONATION",Currency:n.toUpperCase()},success:function(n){var e=deep(n,"Address.Address");e?t&&t(e,n.Address):sitemessage(f.app.localization.e("e13094"))},fail:function(){sitemessage(f.app.localization.e("e13094"))}})}},d=function(){u.donate()},l={thankyou:function(e,t,n){_scrollTop(0),a.amount.value=deep(n,"Amount")||0,f.shell({name:"thankyou",inner:html,el:i.process.find(".step"),data:{second:t,curobj:e,info:n,parameters:a}},function(n){ParametersLive(_.toArray(a),n.el),n.el.find(".send").on("click",function(){0<a.amount.value?$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:{Action:"ADDTOMAILLIST",TemplateID:100,Email:f.app.platform.sdk.address.pnet().address,Name:(e.name||"NAN0")+", "+(a.amount.value||0)},dataType:"json",success:function(){n.el.html(""),setTimeout(function(){u.showpage()},100),dialog({html:f.app.localization.e("e13095"),class:"one"})}}):sitemessage(f.app.localization.e("e13096"))}),n.el.find(".back").on("click",function(){t?(n.el.html(""),setTimeout(function(){e.action(e)},100)):(n.el.html(""),setTimeout(function(){u.showpage()},100))})})},xmraddress:function(e,t){_scrollTop(0),f.shell({name:"xmraddress",inner:html,el:i.process.find(".step"),data:{curobj:e}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){l.ways()},100)}),n.el.find(".next").on("click",function(){l.thankyou(e,!0)}),n.el.on("click",".copyaddress",function(){copyText(n.el.find(".aw")),sitemessage(f.app.localization.e("waddresswascop"))}),t&&t(n.el)})},address:function(t,a,o,s,e){f.shell({name:"address",inner:html,el:i.process.find(".step"),data:{curobj:o,address:a,currency:t,info:s}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){l.ways()},100),c&&(clearInterval(c),c=null)}),n.el.on("click",".copyaddress",function(){copyText(n.el.find(".aw")),sitemessage(f.app.localization.e("waddresswascop"))}),n.el.find(".reactivate").on("click",function(){f.app.platform.sdk.exchanges.reactivate({address:a,currency:t},function(n,e){n?sitemessage(f.app.localization.e("e13097")):u.waitfunds(t,a,s,o)})}),n.el.find(".next").on("click",function(){l.thankyou(o,!0),c&&(clearInterval(c),c=null)}),e&&e(n.el)})},ways:function(e){_scrollTop(0),f.shell({name:"ways",inner:html,el:i.process.find(".step"),data:{ways:o}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){u.showpage()},100)}),n.el.find(".way").on("click",function(){var e=$(this).attr("way"),n=_.find(o,function(n){return n.id==e});n&&n.action(n)}),e&&e()})}},r={save:function(){f.app.settings.set(f.map.uri,"storage",JSON.stringify(s))},load:function(){s=JSON.parse(f.app.settings.get(f.map.uri,"storage")||"{}")}};return{primary:e,getdata:function(n){r.load(),f.sdk.users.get(t,function(){n({donated:t})},!0)},destroy:function(){c&&(clearInterval(c),c=null),i={}},init:function(n){(i={}).c=n.el.find("#"+f.map.id),i.process=i.c.find(".process"),i.donate=i.c.find(".donate"),i.donate.on("click",d),n.clbk(null,n)}}}var f=new nModule,a={};return f.run=function(n){var e=f.addEssense(a,t,n);f.init(e,n)},f.stop=function(){_.each(a,function(n){n.destroy()})},f}();"undefined"!=typeof module?module.exports=donations:(app.modules.donations={},app.modules.donations.module=donations);
 /*_____*/ 
var embeding=function(){function i(e){var s,a,n,i=deep(e,"history"),o=null,t={url:new Parameter({type:"URL",id:"url",placeholder:m.app.localization.e("e13102"),onType:!0}),images:{isValid:function(){return!0},value:[]}},l={url:m.app.localization.e("e13103"),imagesLength:m.app.localization.e("e13104")},c={check:function(e){if(t[e].isValid(t[e].value))return s.error.html(""),!0;s.error.html(l[e])},removeImage:function(e){removeEqual(t.images.value,{id:e}),d.images(),s.error.html("")},add:{url:function(){c.check("url")&&(a.added(t.url.value),m.closeContainer())},images:function(){if(c.check("images")){var n=[];_.each(t.images.value,function(e){e.base64&&n.push(e.base64)}),a.added(n),m.closeContainer()}}},slowUploadGif:function(e,n){e.id=makeid(),e.slow=!0,e.base64=e.base64,t.images.value.push(e),n&&n()},slowUpload:function(i,a){resize(i.base64,1080,1080,function(e){var n=e.split(",");console.log(i),n[1]&&(i.id=makeid(),i.slow=!0,i.base64=e,t.images.value.push(i)),a&&a()})},upload:function(i,a){resize(i.base64,1080,1080,function(e){var n=e.split(",");if(n[1]){5<t.images.value.length?s.error.html(l.imagesLength):(s.error.html(""),i.id=makeid(),i.loading=!0,t.images.value.push(i),d.images(),m.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:n[1]},success:function(e){i.loading=!1,i.src=deep(e,"data.link")||"https://pocketnet.app/img/imagenotuploaded.jpg",d.images(),a&&a()},fail:function(){i.src="https://pocketnet.app/img/imagenotuploaded.jpg",d.images(),a&&a()}}))}})}},u=function(){var e=$(this).attr("action")||o;c.add[e]()},r=function(){var e=$(this).closest(".imageContainer").attr("value");c.removeImage(e)},d={images:function(e,n){(e=e||t.images.value).length&&m.shell({name:"images",el:s.images,data:{images:e}},function(e){e.el.find(".remove").on("click",r),e.el.find(".image").each(function(){$(this)}),n&&n()})}},g=function(){};return{primary:i,getdata:function(e,i){o=i.settings.essenseData.type,a=i.settings.essenseData.on,n=i.settings.essenseData,i.settings.essenseData.subtype||null,i.settings.essenseData.storage&&_.each(t,function(e,n){e.value=i.settings.essenseData.storage[n],"images"==n&&(e.value=[])}),e({type:o,options:t})},destroy:function(){s={}},init:function(e){g(),(s={}).c=e.el.find("#"+m.map.id),s.error=s.c.find(".error"),s.action=s.c.find(".action"),s.upload=s.c.find(".upload"),s.images=s.c.find(".imagesMi"),function(){if(s.c.find("input").focus().on("change",u),s.action.on("click",u),"images"==o){if(d.images(),n.value){var e={base64:n.value};c.slowUpload(e)}initUpload({el:s.upload,ext:["png","jpeg","jpg","gif"],dropZone:s.c.closest(".wnd"),multiple:!0,action:function(e,n){console.log("DSD"),"gif"==e.ext?c.slowUploadGif(e,n):c.slowUpload(e,n)},onSuccess:function(){c.add.images()}})}else ParametersLive([t[o]],s.c)}(),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-check"></i> '+m.app.localization.e("finish"),fn:function(e,n){c.add[o]()}}},close:function(){n.on.close&&n.on.close()},success:function(e,n){wndObj=n,wnd=e},offScroll:!0,noInnerScroll:!0,class:"embeding",swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30}}}var m=new nModule,a={};return m.run=function(e){var n=m.addEssense(a,i,e);m.init(n,e)},m.stop=function(){_.each(a,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=embeding:(app.modules.embeding={},app.modules.embeding.module=embeding);
 /*_____*/ 
var faq = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, vt;

		var faqcontent = [


			{
		
				name : self.app.localization.e('e14003'),
				id : 'technical',
		
				group : [
		
					{
						id : 'downloadclient',
						q : self.app.localization.e('e14004'),
						a : `<div><a href="https://github.com/pocketnetteam/pocketnet.gui/releases/latest">https://github.com/pocketnetteam/pocketnet.gui/releases/latest</a></div><div>${self.app.localization.e('e14006')}</div>`,
					},

					{
						id : 'downloadclient',
						q : self.app.localization.e('e14005'),
						a : `<div><a href="https://github.com/pocketnetteam/pocketnet.core/releases/latest">https://github.com/pocketnetteam/pocketnet.core/releases/latest</a></div><div>${self.app.localization.e('e14007')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14008'),
				id : 'roadmap',
		
				group : [
		
					{
						id : 'walletaddresses',
						q : self.app.localization.e('e14009'),
						a : `<div>${self.app.localization.e('e14010')}</div><div>${self.app.localization.e('e14011')}</div>`,
					},
		
					{
						id : 'linktoprofile',
						q : self.app.localization.e('e14012'),
						a : `<div>${self.app.localization.e('e14013')}</div>\
							<div>${self.app.localization.e('e14014')}</div>`,
					},
					{
						id : 'starsystem',
						q : self.app.localization.e('e14015'),
						a : `<div>${self.app.localization.e('e14016')}</div>`,
					},
		
		
					{
						id : 'updateprofiletime',
						q : self.app.localization.e('e14017'),
						a : `<div>${self.app.localization.e('e14018')}</div>`,
					},
		
		
					{
						id : 'linuxdesktop',
						q : self.app.localization.e('e14019'),
						a : `<div>${self.app.localization.e('e14020')}</div>`,
					},
		
					{
						id : 'savevideo',
						q : self.app.localization.e('e14021'),
						a : `<div>${self.app.localization.e('e14022')}</div>`,
					},
		
		
					{
						id : 'mobileapp',
						q : self.app.localization.e('e14023'),
						a : `<div>${self.app.localization.e('e14024')}</div>`,
					},
		
					{
						id : 'postinglimit',
						q : self.app.localization.e('e14025'),
						a : `<div>${self.app.localization.e('e14026')}</div>`,
					},
		
					{
						id : 'reputation',
						q : self.app.localization.e('e14027'),
						a : `<div>${self.app.localization.e('e14028')}</div>\
						<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>${self.app.localization.e('e14029')} 2+2-2=2</div>`,
					},
		
					{
						id : 'deletepostoruser',
						q : self.app.localization.e('e14030'),
						a : `<div>${self.app.localization.e('e14031')}</div>`,
					},
		
					{
						id : 'usersearch',
						q : self.app.localization.e('e14032'),
						a : `<div>${self.app.localization.e('e14033')}</div>`,
					},
					{
						id : 'follow',
						q : self.app.localization.e('e14034'),
						a : `<div>${self.app.localization.e('e14035')}</div>`,
					},
		
		
					{
						id : 'otherbrowsers',
						q : self.app.localization.e('e14036'),
						a : `<div>${self.app.localization.e('e14037')}</div>`,
					},
		
					{
						id : 'replypost',
						q : self.app.localization.e('e14038'),
						a : `<div>${self.app.localization.e('e14039')}</div>`,
					},
		
					{
						id : 'addtags',
						q : self.app.localization.e('e14040'),
						a : `<div>${self.app.localization.e('e14041')}</div>`,
					},
		
					{
						id : 'usepublicaddress',
						q : self.app.localization.e('e14042'),
						a : `<div>${self.app.localization.e('e14043')}</div>`,
					},
					{
						id : 'desktopmac',
						q : self.app.localization.e('e14044'),
						a : `<div>${self.app.localization.e('e14045')}</div>`,
					}
		
		
				]
		
		
			},
		
		
			{
		
				name : self.app.localization.e('e14046'),
				id : 'pocketcoin',
		
				group : [
		
					
		
					{
						id : 'pocketcoin',
						q : self.app.localization.e('e14047'),
						a : `<div>${self.app.localization.e('e14048')}</div>`,
					},
		
		
					{
						id : 'pocketcoinstock',
						q : self.app.localization.e('e14049'),
						a : `<div>${self.app.localization.e('e14050')}</div>`,
					},
		
					{
						id : 'pocketcoinbuy',
						q : self.app.localization.e('e14051'),
						a : `'<div>${self.app.localization.e('e14052')}</div>`,
					},
		
					{
						id : 'pocketcoinbuyfiat',
						q : self.app.localization.e('e14053'),
						a : `<div>${self.app.localization.e('e14054')}</div>`,
					},
				]
			},
			{
		
				name : self.app.localization.e('e14055'),
				id : 'privacy',
		
				group : [
					
		
					{
						id : 'anonymous',
						q : self.app.localization.e('e14056'),
						a : `<div>${self.app.localization.e('e14057')}</div>`,
					},
		
					{
						id : 'viewoutside',
						q : self.app.localization.e('e14058'),
						a : `<div>${self.app.localization.e('e14059')}</div>`,
					},
		
		
					{
						id : 'walletid',
						q : self.app.localization.e('e14060'),
						a : `<div>${self.app.localization.e('e14061')}</div>`,
					},
		
					{
						id : 'runnode',
						q : self.app.localization.e('e14062'),
						a : `<div>${self.app.localization.e('e14063')}</div>`,
					},
		
					{
						id : 'signback',
						q :  self.app.localization.e('e14064'),
						a : `<div>${self.app.localization.e('e14065')}</div>`,
					}
				]
			},
			{
		
				name : self.app.localization.e('e14066'),
				id : 'curation',
		
				group : [
		
					{
						id : 'content',
						q : self.app.localization.e('e14067'),
						a : `<div>${self.app.localization.e('e14068')}</div>`,
					},
					{
						id : 'specific',
						q : self.app.localization.e('e14069'),
						a : `<div>${self.app.localization.e('e14070')}</div>`,
					},
					{
						id : 'racism',
						q : self.app.localization.e('e14071'),
						a : `<div>${self.app.localization.e('e14072')}</div>`,
					},
		
		
				]
		
			},

			{
		
				name : self.app.localization.e('e14073'),
				id : 'specificscuration',
		
				group : [
		
					{
						id : 'trolls',
						q : self.app.localization.e('e14074'),
						a : `<div>${self.app.localization.e('e14075')}</div>`,
					},
					{
						id : 'flagging',
						q : self.app.localization.e('e14076'),
						a : `<div>${self.app.localization.e('e14077')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14078'),
				id : 'differents',
		
				group : [
		
					{
						id : 'differents1',
						q : self.app.localization.e('e14079'),
						a : `<div>${self.app.localization.e('e14080')}</div>`,
					},
					{
						id : 'differents2',
						q : self.app.localization.e('e14081'),
						a : `<div>${self.app.localization.e('e14082')}</div>`,
					},
					{
						id : 'differents3',
						q : self.app.localization.e('e14083'),
						a : `<div>${self.app.localization.e('e14084')}</div>`,
					},
					{
						id : 'differents4',
						q : self.app.localization.e('e14085'),
						a : `<div>${self.app.localization.e('e14086')}</div>`,
					}
		
				]
		
			},
		
			{
		
				name : self.app.localization.e('e14087'),
				id : 'ecosystem',
		
				group : [
		
					{
						id : 'ecosystem1',
						q : self.app.localization.e('e14088'),
						a : `<div>${self.app.localization.e('e14089')}</div>`,
					},
					{
						id : 'ecosystem2',
						q : self.app.localization.e('e14090'),
						a : `<div>${self.app.localization.e('e14091')}</div>`,
					},
					{
						id : 'ecosystem3',
						q : self.app.localization.e('e14092'),
						a : `<div>${self.app.localization.e('e14093')}</div>`,
					},
					{
						id : 'ecosystem4',
						q : self.app.localization.e('e14094'),
						a : `<div>${self.app.localization.e('e14095')}</div>`,
					},
					{
						id : 'ecosystem5',
						q : self.app.localization.e('e14096'),
						a : `<div>${self.app.localization.e('e14097')}</div><div>${self.app.localization.e('e14098')}</div><div>${self.app.localization.e('e14099')} </div>`,
					},
					
				]
		
			}
			
		
		]









		var mp = {};

		var actions = {
			question : function(id){
				_scrollToTop(el.c.find('.faqcnt .question[question="'+id+'"]'), null, null, -110)
			},
			contents : function(group){

				_scrollToTop(el.c.find('.faqcnt .group[group="'+group+'"]'), null, null, -110)

			},

			share : function(id){

				console.log(mp, id)

				var question = mp[id]

				var url = 'https://pocketnet.app/help?page=faq&id='+id+'&ref=' + self.app.platform.sdk.address.pnet().address

				var m = question.q;

				self.nav.api.load({
					open : true,
					href : 'socialshare',
					history : true,
					inWnd : true,

					essenseData : {
						url : url,
						caption : 'Share FAQ answer in social',
						title : m
					}
				})
			},

			inview : function(){

				//vt = slowMade(function(){

					
					var h = $(window).height() / 4

					var inv = inView(el.c.find('.faqcnt .group'), {
						offsetTop : h,
						offsetBottom : h,
						mode : 'line',
					})

					var id = null;

					if (inv.length > 0){

						var vel = $(inv[0]);

						id = vel.attr('group')	

						el.contens.removeClass('active')

						var e = el.c.find('.contens .item[group="'+id+'"]')
						
						e.addClass('active')
					}


				//}, vt, 30)
				
			}
		}

		var events = {
			contens : function(){
				var group = $(this).attr('group')

				actions.contents(group)
			},

			share : function(){
				var id = $(this).closest('.question').attr('question')

				actions.share(id);
			}
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			el.contens.on('click', events.contens)

			el.c.find('.share').on('click', events.share)

			el.c.find('.question .questionName').on('click', function(){
				$(this).closest('.question').toggleClass('opened')
			})

			window.addEventListener('scroll', actions.inview);
			
	

			el.c.find('.contens').hcSticky({
				stickTo: '#faq',
				top : 65
			});

		}

		return {
			primary : primary,

			getdata : function(clbk){

				mp = {}

				_.each(faqcontent, function(f){
					_.each(f.group, function(q){
						mp[q.id] = q;
					})
				})

				var data = {
					groups : faqcontent
				};

				clbk(data);

			},

			destroy : function(){

				console.log("DESTROY")


				window.removeEventListener('scroll', actions.inview);

				//self.app.nav.api.history.removeParameters(['id'])

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.contens = el.c.find('.contens .item')

				initEvents();

				var id = parameters().id;

				if (id) actions.question(id)

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
	module.exports = faq;
}
else{

	app.modules.faq = {};
	app.modules.faq.module = faq;

}
 /*_____*/ 
var embeding20=function(){function a(e){var l,n=deep(e,"history"),i={},t={url:d.app.localization.e("e13103"),imagesLength:d.app.localization.e("e13104")},a=function(e,n){if(l.c){var a=l.c.find("."+e+"Part .partPreloader");n?a.fadeIn(200):a.fadeOut(200)}},o=function(e,n){var a={};5<i.images.value.length?sitemessage(t.imagesLength):(a.id=makeid(),a.src=e,i.images.value.push(a),c.images()),n&&n()},u=function(e,n){var a={};resize(e,1080,1080,function(e){if(e.split(",")[1]){5<i.images.value.length?sitemessage(t.imagesLength):(a.id=makeid(),a.base64=e,i.images.value.push(a),c.images())}n&&n()})},r=function(e){removeEqual(i.images.value,{id:e}),c.images()},s=function(){var e=$(this).closest(".imageContainer").attr("value");r(e)},c={url:function(n,a){var i=d.app.platform.parseUrl(n);console.log("METATYPE",i);var t=d.app.platform.sdk.remote.storage[n];d.shell({name:"url",inner:html,el:l.url,data:{url:n,og:t,remove:!0},turi:"share"},function(e){n&&!t&&("youtube"==i.type||"vimeo"==i.type||"bitchute"==i.type||"peertube"==i.type?Plyr.setup(".js-player",function(e){}):d.app.platform.sdk.remote.get(i.url,function(e){e&&c.url(n)})),a&&a()})},images:function(e,n){(e=e||i.images.value).length&&d.shell({name:"images",el:l.images,data:{images:e}},function(e){e.el.find(".remove").on("click",s),e.el.find(".image").each(function(){}),n&&n()})}},m=function(){};return{primary:n,getdata:function(e){(i={url:new Parameter({type:"URL",id:"url",placeholder:d.app.localization.e("e13102"),value:""}),images:{isValid:function(){return!0},value:[]}}).url._onChange=function(e){a("left",!0),checkUrlForImage(e)?o(e,function(){a("left",!1),i.url.value="",i.url.el.val("")}):c.url(e,function(){a("left",!1)})},i.images.value=[],i.url.value="",e({options:i})},destroy:function(){l={}},init:function(e){m(),(l={}).c=e.el.find("#"+d.map.id),l.upload=l.c.find(".upload"),l.images=l.c.find(".images"),l.error=l.c.find(".error"),l.url=l.c.find(".url"),ParametersLive([i.url],l.c),initUpload({el:l.upload,ext:["png","jpeg","jpg"],dropZone:l.c.closest(".wnd"),multiple:!0,action:function(e,n){u(e.base64,n)},onSuccess:function(){l.c.addClass("right"),l.c.removeClass("left")}}),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-times"></i> '+d.app.localization.e("close"),fn:function(e,n){}}},close:function(){},success:function(e,n){wndObj=n,wnd=e},noInnerScroll:!0,class:"embeding20"}}}var d=new nModule,i={};return d.run=function(e){var n=d.addEssense(i,a,e);d.init(n,e)},d.stop=function(){_.each(i,function(e){e.destroy()})},d}();"undefined"!=typeof module?module.exports=embeding20:(app.modules.embeding20={},app.modules.embeding20.module=embeding20);
 /*_____*/ 
var userpage=function(){function n(e){var r,a,i,t=deep(e,"history"),s=null,p=null,l=!1,o=null,c=[],u={eachReport:function(i,e,t){var r=function(e,o,a){o=o||0,a=a||"",_.each(e,function(e,t){var n=a;n&&(n+="_"),n+=e.id,e.reports?i.group(e,o,n,function(){r(e.reports,o+1,n)},t):i.report(e,o,n)})};r(e=e||c,0,t)},findReport:function(e){var a=function(e,t){var n=t.split("_");if(!n.length)return null;t=n[0];var o=_.find(e||[],function(e){return e.id==t});return o?(n.splice(0,1),(t=n.join("_"))&&o.reports?a(o.reports,t):o):null};return a(c,e)},mobileReports:function(){var a=[];return u.eachReport({group:function(e,t,n,o){e.mobile&&a.push(e),o()},report:function(e){e.mobile&&a.push(e)}}),a.push({name:h.app.localization.e("signout"),id:"signout"}),a},selector:function(){var e=u.mobileReports(),t=_.map(e,function(e){return e.id}),n=_.map(e,function(e){return e.text||e.name}),o=new Parameter({type:"VALUES",name:h.app.localization.e("e13187"),id:"contents",possibleValues:t,possibleValuesLabels:n,defaultValue:t[0]});return o.value=parameters().id||t[0],o._onChange=function(e){if("signout"==e)d.signout();else{var t=u.findReport(e),n=parameters();n.report=t.report,n.id=t.id;var o="userpage"+collectParameters(n);h.nav.api.load({open:!0,href:o,history:!0})}},o}},d={closeGroup:function(e){var t=u.findReport(e);if(t){t.active=!t.active;var n=r.c.find('[levelid="'+e+'"]');t.active?n.addClass("active"):n.removeClass("active")}},openTree:function(i){u.eachReport({group:function(e,t,n,o){var a=r.c.find('[levelid="'+n+'"]');0==i.indexOf(n)?(e.active=!0,a.addClass("active"),o()):(e.active=!1,a.find(".openReport").removeClass("active"))},report:function(e,t,n){var o=r.c.find('[id="'+n+'"]');i==n?(e.active=!0,o.addClass("active")):(e.active=!1,o.removeClass("active"))}})},closeReport:function(){r.report.html("")},openReport:function(e,t){r.c.find(".openReport").removeClass("active"),r.c.find('[rid="'+e+'"]').addClass("active"),d.openTree(e),v.report(e),t&&(h.nav.api.history.addParameters({id:e},{removefromback:!1}),h.app.nav.clbks.history.navigation&&h.app.nav.clbks.history.navigation())},signout:function(){function e(){h.app.user.signout(),h.app.reload({href:"authorization"})}if(h.app.platform.sdk.address.pnet()){var t=h.app.platform.sdk.address.pnet().address,n=h.app.platform.sdk.registrations.storage[t];if(n&&n<=5)return void h.app.platform.ui.showmykey({text:h.app.localization.e("e13188"),faillabel:h.app.localization.e("e13189"),fail:function(){e()}})}e()}},f=function(){var e=$(this).closest("[levelid]").attr("levelid");d.closeGroup(e)},m=function(){var e=$(this).attr("rid");isMobile()&&v.contents(null,e),d.openReport(e,!0)},v={bgcaption:function(e){u.selector();r&&r.bgcaption&&(h.app.user.validate()?h.shell({name:"bgcaption",el:r.bgcaption,data:{}},function(e){}):r.bgcaption.html('<div class="bgCaptionSpacer"></div>'))},contents:function(n,e){if(r.contents){var o=u.selector();e&&isMobile()?(r.contents.html(""),n&&n()):h.app.platform.sdk.node.transactions.get.allBalance(function(e){var t=h.app.platform.sdk.node.transactions.tempBalance();i=e+t,h.shell({name:"contents",el:r.contents,data:{reports:c,each:u.eachReport,selector:o}},function(e){e.el.find(".groupNamePanelWrapper").on("click",f),e.el.find(".openReport").on("click",m),ParametersLive([o],e.el),_scrollTop(0),l&&r.contents.hcSticky("refresh"),n&&n()})})}},userslist:function(e,t,n,o,a){h.nav.api.load({open:!0,id:"userslist",el:e,animation:!1,essenseData:{addresses:t,empty:n,caption:o},clbk:function(e,t){a&&a(e,t)}})},followers:function(e,t){var n=deep(h,"app.user.address.value");if(n){var o=deep(h,"sdk.users.storage."+n),a=_.map(deep(o,"subscribers")||[],function(e){return e}),i=h.app.localization.e("anofollowers");h.user.isItMe(o.address)&&(i=h.app.localization.e("aynofollowers")),v.userslist(e,a,i,h.app.localization.e("followers"),t)}},following:function(e,t){var n=deep(h,"app.user.address.value");if(n){var o=deep(h,"sdk.users.storage."+n),a=_.map(deep(o,"subscribes")||[],function(e){return e.adddress}),i=h.app.localization.e("anofollowing");h.user.isItMe(o.address)&&(i=h.app.localization.e("aynofollowing")),v.userslist(e,a,i,h.app.localization.e("following"),t)}},fillUser:function(e,t){h.shell({name:"fillUser",el:e,data:{}},function(e){t&&t()})},report:function(e,n){s&&s.destroy();function o(e,t){_scrollTop(0),s=t,p&&p.apply(),n&&n()}var t=u.findReport(e);h.shell({name:"report",el:r.report,data:{}},function(e){v[t.report]?(v[t.report](e.el.find(".reportCnt"),o),l&&r.contents.hcSticky("refresh")):h.nav.api.load({open:!0,id:t.report,el:e.el.find(".reportCnt"),animation:!1,primary:!0,essenseData:{sub:t.sub,dumpkey:a.dumpkey},clbk:function(e,t){o(0,t),l&&r.contents.hcSticky("refresh")}})})}},n=function(){};function b(e){var t=parameters().id;isMobile()||(t=t||(h.app.user.validate()?"ustate":"test")),v.contents(function(){t?d.openReport(t):d.closeReport(),e&&e()},t)}h.authclbk=function(){v.bgcaption()};var g=function(e){v.bgcaption(),b(e),h.app.user.validate()||(r.c.addClass("validate"),h.app.errors.connectionRs()&&(h.iclbks.mn=function(){delete h.iclbks.mn,g()})),isMobile()||(r.contents.hcSticky({stickTo:"#userpagestick",top:77,bottom:177}),l=!0)};return{primary:t,parametersHandler:function(){b()},getdata:function(t,e){a=deep(e,"settings.essenseData")||{},function(){if(c=[],!h.app.user.validate()){var e=h.app.localization.e("e13184");h.app.errors.connection()&&(e=h.app.localization.e("e13185")),c.push({name:e,id:"test",report:"fillUser",mobile:!0})}c.push({name:h.app.localization.e("notifications"),id:"notifications",report:"notifications",mobile:!0}),c.push({name:h.app.localization.e("rstate"),id:"ustate",report:"ustate",mobile:!0,add:function(){if(isMobile()&&deep(o,"reputation"))return o.reputation.toFixed(1)}}),c.push({name:h.app.localization.e("rwallet"),id:"wallet",report:"wallet",mobile:!0,add:function(){if(isMobile()&&i)return h.app.platform.mp.coin(i)}}),c.push({name:h.app.localization.e("followers"),id:"followers",report:"followers",mobile:!0,if:function(){return isMobile()},add:function(){var e=deep(h,"app.user.address.value");if(e){var t=deep(h,"sdk.users.storage."+e+".subscribers.length");if(isMobile()&&t)return t}}}),c.push({name:h.app.localization.e("following"),id:"following",report:"following",mobile:!0,if:function(){return isMobile()},add:function(){var e=deep(h,"app.user.address.value");if(e){var t=deep(h,"sdk.users.storage."+e+".subscribes.length");if(isMobile()&&t)return t}}}),h.app.user.validate()&&c.push({name:h.app.localization.e("e13186"),id:"test",report:"test",mobile:!0}),c.push({name:h.app.localization.e("rsettings"),id:"usersettings",report:"usersettings",mobile:!0}),c.push({name:h.app.localization.e("raccounts"),id:"accounts",report:"accounts",mobile:!0}),c.push({name:h.app.localization.e("rsystem"),id:"system16",report:"system16",mobile:!1});var t=app.user.address.value;-1<_.indexOf(["PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82","PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz","PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd"],t)&&c.push({name:h.app.localization.e("rconnection"),id:"connection",report:"connection",mobile:!1})}();var n={};e=parameters();n.p2pkh=h.app.platform.sdk.address.pnet(),h.app.platform.sdk.ustate.me(function(e){console.log("_mestate",e),o=e,t(n)})},destroy:function(){delete h.iclbks.mn,l=!1,s&&s.destroy(),s=null,p&&p.destroy(),p=null,$("#menu").removeClass("abs"),r={}},init:function(e){n(),(r={}).c=e.el.find("#"+h.map.id),r.contents=r.c.find(".contents"),r.report=r.c.find(".report"),r.bgcaption=r.c.find(".bgCaptionWrapper"),$("#menu").addClass("abs"),new Caption({container:r.c,caption:r.c.find(".captionfwrapper"),offset:[0,0]}).init(),r.c.on("click",".signout",function(){d.signout()}),g(function(){e.clbk(null,e)})}}}var h=new nModule,o={};return h.run=function(e){var t=h.addEssense(o,n,e);h.init(t,e)},h.stop=function(){_.each(o,function(e){e.destroy()})},h}();"undefined"!=typeof module?module.exports=userpage:(app.modules.userpage={},app.modules.userpage.module=userpage);
 /*_____*/ 
var chat=function(){function n(e){var m,i,t=deep(e,"history"),n=makeid(),l={},d=null,f=null,a=null,u=null,p=null,h={},g={},v={preloader:function(e){e?m.c.addClass("loading"):m.c.removeClass("loading")},close:function(){b.removeEssense(r,n),l.closeClbk&&l.closeClbk()},sendClbk:function(e,t,n){var a=m.messages.find("#"+e.EncryptedMessageID);t?(e.EncryptedMessageID=t,e.result="success",e.Message=n.note||"",e.Attachment=n.attachment||"",e.AttachmentName=n.attachmentName||"",e.AttachmentPreview=n.attachmentPreview||"",a.attr("id",e.EncryptedMessageID)):e.result="fail",a.removeClass("sending"),a.addClass(e.result)},mobileBuildHeight:function(){if("buildin"==l.view&&isMobile()){var e=m.c.find(".chatwindow").height(),t=$(window).height(),n=m.c.find(".chatmessages").height();e<=t-175&&n<e?m.c.find(".chatwindow").height(t-175):m.c.find(".chatwindow").css("height","auto")}},spacer:function(){if(v.mobileBuildHeight(),isTablet()){var e=0;0<m.messages.find(".chatmessage").length&&(m.c.find(".spacer").height(0),(e=m.c.find(".chatwindow").height()-m.c.find(".chatmessages").height()-10)<0&&(e=0),m.spacer.height(e+"px"))}},send:function(e){e&&u.rtc.send(e)},sendAttachment:function(e,n){b.app.platform.sdk.chats.send({attachment:e.attachment,attachmentName:e.attachmentName,attachmentPreview:e.attachmentPreview,temp:n},u.ThreadID,function(e,t){v.sendClbk(n,e,t)})},addTempMessage:function(e){var t=new Date;b.app.platform.timeDifference&&(t=t.addSeconds(b.app.platform.timeDifference/1e3));var n={Created:dateToStrUtcS(t),ThreadID:u.ThreadID,EncryptedMessageID:makeid(!0),temp:!0,UserID:b.app.user.data.id,decrypted:{Message:e.note,AttachmentName:e.attachmentName,AttachmentPreview:e.attachmentPreview}};return u.messages.push(n),o.messages(null,[n],!0),n},clearTempMessages:function(){m.messages.find(".temp").remove()},scrollToPx:function(e,t){if(!v.checkState())return!1;if(null!==t){var n=null,a=null,s="position";if("buildin"==l.view?(n=$(window),a=$("html"),s="offset"):(n=m.c.find(".chatwindow"),a=m.c.find(".chatmessages")),"toLast"==e||"toLast"==t){var i=m.messages.find(".chatmessage:nth-last-child(1)");if(i[s]()){var c=70;isMobile()&&(c=115),t=i[s]().top+i.height()+c-n.height(),n.scrollTop(t,200)}}else{var o=a.height();n.scrollTop(o-t,200)}}},scrollPx:function(e){if(m.c){var t=null,n=null,a=null;if(n="buildin"==l.view?(t=$(window),$("html")):(t=m.c.find(".chatwindow"),m.c.find(".chatmessages")),"toLast"==e)a="toLast";else{var s=m.messages.find(".chatmessage:nth-last-child(1)"),i="position";"buildin"==l.view&&(i="offset");inView(s,{inel:t,offset:-20,mode:"partall"});if(s&&s[i]()){var c=n.height(),o=t.scrollTop();a=c-s.height()-150,a=o+t.height()>a?"toLast":null}}return a}},saveAttachment:function(e){topPreloader(30);var t=c.findEl(e);t&&t.addClass("saveAttachment"),b.app.platform.sdk.chats.getAttachment(e,function(e){topPreloader(100),t&&t.removeClass("saveAttachment"),e?e.ChatMessageAttach&&saveAs({download:e.decrypted.AttachmentName,file:e.ChatMessageAttach,noA:!0}):console.log("ERROR")})},openGallery:function(e){var t={idName:"EncryptedMessageID",initialValue:e.EncryptedMessageID,getImages:function(){return _.filter(u.messages,function(e){var t=deep(e,"decrypted.AttachmentName");if(t&&(-1<t.indexOf(".jpg")||-1<t.indexOf(".png")||-1<t.indexOf(".jpeg")))return!0})},getImage:function(e,n){e.ChatMessageAttach?n&&n({src:e.ChatMessageAttach,name:e.decrypted.AttachmentName}):b.app.platform.sdk.chats.getAttachment(e,function(e){var t={src:e.ChatMessageAttach,name:e.decrypted.AttachmentName};n&&n(t)})}};o.gallery(t)},getPreview:function(e){b.app.platform.sdk.chats.getPreview(e,function(e){_.each(e,function(e){var t=c.findEl(e);o.messages(null,[e],!0,t)})})},read:function(){},countUnread:function(){m.countUnread&&m.countUnread.html("")},checkState:function(){if(m.c&&!m.c.hasClass("minimized"))return!0}},w={minimize:function(){m.c.addClass("minimized"),l.minimizeClbk&&l.minimizeClbk(),d.clear(),f.clear(),m.type.blur()},expand:function(){m.c.removeClass("minimized"),l.expandClbk&&l.expandClbk(),isTablet()||m.type.focus(),v.spacer(),setTimeout(function(){v.scrollToPx("toLast","toLast")},100)},out:function(){b.app.modules.chats.module.api.add(u.ThreadID)},close:function(){v.close()},type:function(e,t){var n=this.getText();if(13==t.which||13==t.keyCode)return n&&(this.setText(""),v.send(n),$(this).val("")),!1},resizeWindow:function(){d&&d.setOffset([0,0]),f&&f.setOffset([50,100])},getAttachment:function(){var e=$(this).closest(".chatmessage"),t=e.attr("id");if(!e.hasClass("sending")){var n=c.findMessage(t);if(n.decrypted&&n.decrypted.AttachmentName){var a=n.decrypted.AttachmentName.toLowerCase();-1<a.indexOf(".jpg")||-1<a.indexOf(".png")||-1<a.indexOf(".jpeg")?v.openGallery(n):v.saveAttachment(n)}}},messagesInView:function(){a=slowMade(function(){if(!v.checkState())return!1;var e,t=m.messages.find(".chatmessage"),n=m.messages.find(".chatmessage:nth-last-child(1)");"buildin"==l.view&&(e=$(window)),"fixedin"==l.view&&(e=m.c.find(".chatwindow"));var a=inView(t,{inel:e}),s=inView(n,{inel:e});if(0<a.length)_.map(a,function(e){var t=$(e).attr("id");return c.findMessage(t)});0<s.length&&v.read()},a,100)}},c={findMessage:function(t){return _.find(u.messages,function(e){return e.EncryptedMessageID==t})},findEl:function(e){return m.c.find("#"+(e.tm+e.f))}},o={gallery:function(e){e=e||{},b.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:e})},safemessages:function(e,t){var s=_.map(g,function(e,t){return{m:e,t:t}});s=_.sortBy(s,function(e){return Number(e.t)});var i=[];_.each(s,function(t,n){var a={newmessages:[],oldmessage:t};_.each(e,function(e){(Number(e.tm)<Number(t.t)||n==s.length-1)&&(!n||Number(s[n-1].t)>Number(e.tm))&&a.newmessages.push(e)}),a.newmessages.length&&(a.newmessages.push(a.oldmessage.m),a.newmessages=_.sortBy(a.newmessages,function(e){return Number(t.t)}),i.push(a))}),i.length?lazyEach({array:i,action:function(e){var t=e.item,n=c.findEl(t.oldmessage);o.messages(e.success,t.newmessages,null,n)},all:{success:t}}):o.messages(t,e)},messages:function(t,a,n,e){if(m.c){a=_.filter(a,function(e,t){var n=e.tm;if(17==e.tm.length&&(e.tm=n+"0"),!(p&&p.tm>e.tm))return!(a.length-50>t)});var s="toLast";a&&(s="fixed");var i=v.scrollPx(s);a=a||[],a=_.filter(a,function(e){var t=e.tm+e.f;return!!e.tm&&(h[t]?void 0:(h[t]=!0,g[e.tm]=e,!0))});var c=_.sortBy(a,function(e){var t=e.tm;return 17==e.tm.length&&(e.tm=t+"0"),Number(e.tm)});n||v.clearTempMessages();var o=append,r=m.messages;e&&(o=replaceWith,r=e),a.length?(p=c[c.length-1],b.shell({name:"messages",el:r,data:{chat:u,messages:c},inner:o},function(e){l.messagesClbk&&l.messagesClbk(),m.messages.find(".attachment").off("click"),m.messages.find(".attachment").on("click",w.getAttachment),w.messagesInView(),0<m.messages.find(".chatmessage").length?m.c.find(".other").fadeOut(1):m.c.find(".other").fadeIn(1),n&&(i="toLast"),v.spacer(),setTimeout(function(){v.scrollToPx(s,i)},20),d&&d.action(),f&&f.action(),v.countUnread(),t&&t()})):t&&t()}}},s=function(){};return{primary:t,getdata:function(t,e){var n={},a=deep(e,"settings.essenseData.chat");if(!a){var s=parameters().chatid;a=b.app.platform.sdk.discussions.fromChatId(s)}deep(e,"settings.essenseData");a&&(u=a.chat,b.app.platform.sdk.chats.info([a.chat],function(e){n.chat=a,b.app.platform.sdk.tempmessenger.getChat(a.chat),n.canEnc=!0,b.app.platform.sdk.ustate.me(function(e){i=e,n.mestate=i,t(n)})}))},destroy:function(){console.log("exel",m),m.type&&m.type.blur(),$("html").off("mousemove",w.messagesInView),window.removeEventListener("scroll",w.messagesInView),window.removeEventListener("resize",w.resizeWindow),function(){b.app.platform.ws;$(window).off("focus",v.read),$(window).off("mousemove",v.read),delete u.rtc.clbks.receive.message.messenger,delete u.rtc.clbks.receive.messages.messenger,delete u.rtc.clbks.send.message.messenger}(),a&&clearTimeout(a),m={},d&&d.destroy(),f&&f.destroy(),d=f=null,u&&(u.rtc.leave(),u=null),clearInterval(null),0,$("#tawkchat-container").fadeIn(),l.destroyClbk&&l.destroyClbk()},init:function(e){console.log("INICHAT"),h={},g={},(l=e.essenseData||{}).view||(l.view="buildin"),s(),(m={}).c=e.el.find("#"+b.map.id),m.messages=m.c.find(".chatmessages"),m.type=m.c.find(".type"),m.attachement=m.c.find(".attachement"),m.countUnread=m.c.find(".countUnread"),m.spacer=m.c.find(".spacer"),m.c.addClass(l.view),function(){if("buildin"==l.view){isMobile()||(d=new Caption({container:m.c.find(".chatWrapper"),caption:m.c.find(".captionfwrapper"),offset:[0,0]}).init());var e=0;isMobile()&&(e=50),f=new Caption({container:m.c.find(".chatWrapper"),caption:m.c.find(".bcaptionfwrapper"),offset:[e,2*e],pos:"bottom"}).init(),m.c.find(".out").on("click",w.out),window.addEventListener("scroll",w.messagesInView),window.addEventListener("resize",w.resizeWindow),$("html").on("mousemove",w.messagesInView)}"fixedin"==l.view&&(m.c.find(".close").on("click",w.close),m.c.find(".chatwindow").on("scroll",w.messagesInView),$("html").on("mousemove",w.messagesInView)),m.c.find(".minimize").on("click",w.minimize),m.c.find(".expand").on("click",w.expand),m.countUnread.on("click",function(){w.expand()}),m.type.emojioneArea({pickerPosition:"top",search:!1,tones:!1,attributes:{spellcheck:!0,autocomplete:"on"},events:{keyup:w.type,onLoad:function(e,t){}}}),initUpload({el:m.attachement,ext:["png","jpeg","jpg","pdf"],multiple:!0,maxFileSize:5,dropZone:m.c.find(".chatWrapper"),beforeUpload:function(e){var a=deep(e,"file.name");if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)resize(e.base64,200,200,function(t){var n=v.addTempMessage({attachmentName:a,attachmentPreview:t});resize(e.base64,1600,1600,function(e){v.sendAttachment({attachment:e,attachmentName:a,attachmentPreview:t},n)})});else{var t=v.addTempMessage({attachmentName:a});v.sendAttachment({attachment:e.base64,attachmentName:a},t)}}})}(),function(){if(u.rtc.clbks.receive.message.messenger=function(e){!b.app.platform.focus&&b.app.platform.titleManager&&b.app.platform.titleManager.add("You have new messages"),p=e,b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,[e])})},u.rtc.clbks.receive.messages.messenger=function(e){console.log("messages",e),0,b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,e,!0)})},u.rtc.clbks.send.message.messenger=function(e){b.app.platform.sdk.messenger.load.messages(e,function(){p=e,o.messages(null,[e],!0)})},u){var e=_.toArray(u.rtc.storage._db||{});b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,e,!0)}),u.rtc.connect(function(){})}}(),function(){b.app.platform.ws;$(window).on("focus",v.read),$(window).on("mousemove",v.read)}(),v.countUnread(),e.clbk(null,e)},id:n,api:w}}var b=new nModule,r={};return b.run=function(e){var t=b.addEssense(r,n,e);b.init(t,e)},b.stop=function(){_.each(r,function(e){e.destroy()})},b}();"undefined"!=typeof module?module.exports=chat:(app.modules.chat={},app.modules.chat.module=chat);
 /*_____*/ 
var wallet=function(){function t(e){function a(e,c){lazyEach({array:_.toArray(i),sync:!0,action:function(o){var i=o.item,e=i.addresses();b.app.platform.sdk.node.transactions.get.balance(function(l){b.app.platform.sdk.node.transactions.get.canSpend(e,function(e,a){var t="#414244",n=100,s=b.app.platform.sdk.node.transactions.tempBalance();a&&("pnetwallet"!=i.id&&"total"!=i.id||(a=s+a),n=100*e/a,t="#0F8623");var r={positive:{summary:n,color:t}};e<a&&(r.neutral={summary:100-n,color:"#414244"}),"pnetwallet"!=i.id&&"total"!=i.id||(l=s+l),h.total({label:i.label,id:i.id,balance:l,move:r,update:c},o.success)})},e)},all:{success:function(){e&&e()}}})}var o,t=deep(e,"history"),s={},i={pnetwallet:{label:b.app.localization.e("tacaddress"),alabel:b.app.localization.e("tacaddress"),id:"pnetwallet",addresses:function(){return[b.app.platform.sdk.address.pnet().address]}},wallet:{label:b.app.localization.e("twallet"),id:"wallet",addresses:function(){return b.app.platform.sdk.addresses.storage.addresses||[]},caption:b.app.localization.e("twalletaddresses")},total:{label:b.app.localization.e("tTotal"),id:"total",addresses:function(){return[b.app.platform.sdk.address.pnet().address].concat(b.app.platform.sdk.addresses.storage.addresses||[])}}},d={parameters:{source:new Parameter({name:b.app.localization.e("source"),type:"VALUES",id:"source",defaultValue:"pnetwallet",possibleValuesLabels:[b.app.localization.e("twallet"),b.app.localization.e("tacaddress"),b.app.localization.e("tTotal")],possibleValues:["wallet","pnetwallet","total"],placeholder:b.app.localization.e("wsselect")}),reciever:new Parameter({name:b.app.localization.e("wsreciever"),type:"VALUESCUSTOM",id:"reciever",possibleValuesLabels:[],possibleValues:[],placeholder:b.app.localization.e("wsenter"),onType:!0}),amount:new Parameter({name:b.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:b.app.localization.e("wsamountof"),format:{Precision:6}}),message:new Parameter({name:b.app.localization.e("message"),id:"message",type:"stringany",placeholder:b.app.localization.e("yourmessage"),format:{Length:80}}),fees:new Parameter({name:b.app.localization.e("wsincludefees"),type:"VALUES",id:"fees",defaultValue:"include",possibleValuesLabels:[b.app.localization.e("wsrecieverpay"),b.app.localization.e("wssenderpay")],possibleValues:["include","exclude"]})}},n={wallet:b.app.localization.e("twallet"),pnetwallet:b.app.localization.e("tacaddress")},r={active:!1,parameters:{deposit:new Parameter({name:b.app.localization.e("wrecieveon"),type:"VALUES",id:"deposit",defaultValue:"wallet",possibleValuesLabels:[b.app.localization.e("twallet"),b.app.localization.e("tacaddress")],possibleValues:["wallet","pnetwallet"],placeholder:b.app.localization.e("wdselectfrom")}),depositamount:new Parameter({name:b.app.localization.e("wdamount"),id:"depositamount",type:"NUMBER",placeholder:b.app.localization.e("wdenteramount"),onType:!0,format:{Precision:6}}),message:new Parameter({name:b.app.localization.e("wdmessage"),id:"message",type:"TEXT",placeholder:b.app.localization.e("wdmessageplaceholder"),onType:!0}),label:new Parameter({name:b.app.localization.e("wdlabel"),id:"label",type:"STRING",onType:!0})}},l={active:!1,parameters:{reciever:new Parameter({name:b.app.localization.e("wrecieveon"),type:"VALUES",id:"reciever",defaultValue:"pnetwallet",possibleValuesLabels:[b.app.localization.e("tacaddress")],possibleValues:["pnetwallet"],placeholder:b.app.localization.e("wdselectfrom")}),amount:new Parameter({name:b.app.localization.e("e13214"),id:"amount",type:"NUMBER",placeholder:b.app.localization.e("wsamountof"),format:{Precision:6}}),currency:new Parameter({name:b.app.localization.e("currency"),id:"currency",type:"VALUES",defaultValue:"btc",possibleValuesLabels:["BTC","LTC"],possibleValues:["btc","ltc"],placeholder:b.app.localization.e("e13215")}),currencyAmount:new Parameter({name:b.app.localization.e("e13216"),id:"currencyAmount",type:"NUMBER",placeholder:b.app.localization.e("wsamountof"),format:{Precision:6}})},segments:[{id:"AWAITINGFUNDS",time:180,exclude:"all",label:function(e,a,t){if(e==this.id)return'<div class="todeal">'+t.currency.toUpperCase()+": "+a.Address+' <i class="fas fa-chevron-circle-right"></i> </div>'},currentLabel:function(e){return"Awaitng Funds. Address will be valid for <b>"+e.MinutesLeft+" minutes</b>"}},{id:"EXPIREDAWAITINGFUNDS",class:"bad",finish:!0,exclude:"all",label:function(e,a){return b.app.localization.e("e13217")},currentLabel:function(e){return b.app.localization.e("e13217")+' <div class="reactivate">'+b.app.localization.e("reactivate")+"</div>"}},{id:"CONFIRMATIONS0",time:10,currentLabel:function(e){return b.app.localization.e("e13218")+" (0/4)"}},{id:"CONFIRMATIONS1",time:10,currentLabel:function(e){return b.app.localization.e("e13218")+" (1/4)"}},{id:"CONFIRMATIONS2",time:10,currentLabel:function(e){return b.app.localization.e("e13218")+" (2/4)"}},{id:"CONFIRMATIONS3",time:10,currentLabel:function(e){return b.app.localization.e("e13218")+" (3/4)"}},{id:"POCSENT",time:4,currentLabel:function(e){return b.app.localization.e("e13219")}},{id:"POCDELEVERED",finish:!0,currentLabel:function(e){return b.app.localization.e("e13220")}}]},c=[],p=[],u=0,m={showCrInStep:function(a,e,t,n){h.step(function(e){h.crowdfunding(function(e){a&&m[a](e,n),h.stepC(e,t)},e)},e,{class:"crowdfunding",view:a})},olddeal:function(e,a){h.crDeal(a,b.app.platform.sdk.exchanges.info[a.info.address],e.find(".actionbody"))},newdeal:function(n){var e={currency:l.parameters.currency.value,address:l.parameters.reciever.value,amount:l.parameters.amount.value,currencyAmount:l.parameters.currencyAmount.value};m.pocAddress(e,function(e,a,t){e?sitemessage(b.app.localization.e("errorreload")+" (error: 0003)"):h.crDeal(a,t,n.find(".actionbody"))})},showListcount:function(t){b.app.platform.sdk.exchanges.statuses(function(e,a){e?sitemessage(b.app.localization.e("errorreload")+" (error: 0004)"):h.showListcount(a,t.find(".actionbody"))})},status:function(){},pocAddress:function(e,n){(e=e||{}).reciever&&"pnetwallet"!=e.reciever||(e.address=b.app.platform.sdk.address.pnet().address),"wallet"==e.reciever&&(e.address=b.app.platform.sdk.addresses.storage.addresses[0]),e.currency&&e.address?b.app.platform.sdk.exchanges.address(e,function(e,a,t){e?n&&n("fail",null):n&&n(null,a,t)}):n&&n("no data",null)},sendAddresses:function(){var e=d.parameters.source.value;return i[e].addresses()},canChangeSend:function(){if(d.parameters.reciever.value){var t=null;if(_.find(n,function(e,a){return t=a,d.parameters.reciever.value==e||d.parameters.reciever.value==a}))return t}return null},sendParameters:function(){var t=d.parameters.source.value;d.parameters.reciever.possibleValues=[],d.parameters.reciever.possibleValuesLabels=[],_.each(n,function(e,a){a!=t&&"total"!=t&&(d.parameters.reciever.possibleValues.push(a),d.parameters.reciever.possibleValuesLabels.push(e))}),"total"!=t||_.find(n,function(e,a){return d.parameters.reciever.value==e||d.parameters.reciever.value==a})&&(d.parameters.reciever.value="");d.parameters.reciever.value!=t&&d.parameters.reciever.value!=n[t]||(d.parameters.reciever.value=d.parameters.reciever.possibleValuesLabels[0]),d.parameters.reciever.possibleValues.length?d.parameters.reciever.placeholder=b.app.localization.e("wrenteraddressselect"):d.parameters.reciever.placeholder=b.app.localization.e("wrenteraddress");var e=m.sendAddresses();b.app.platform.sdk.node.transactions.get.balance(function(e){d.parameters.amount.value>e&&(d.parameters.amount.value=e)},e,null,!0)},addaddress:function(){var e=b.app.platform.sdk.addresses.storage.addresses.length;b.app.platform.sdk.addresses.addWalletAddress(e),b.app.platform.sdk.addresses.save(),topPreloader(0),k(function(){topPreloader(100)})},linkValidation:function(){return 0<r.parameters.depositamount.value&&trim(r.parameters.message.value)&&trim(r.parameters.label.value)},linkValidationQr:function(){return 0<r.parameters.depositamount.value},showDepositInStep:function(a,e,t){h.step(function(e){h.deposit(function(e){m[a](e),h.stepB(e,t)},e)},e,{class:"deposit"})},showQrResult:function(e){r.address&&m.linkValidationQr()&&h.qrResultForDeposit(r.address,e.find(".actionbody"))},showLinkResult:function(e){r.address&&m.linkValidation()&&h.linkResultForDeposit(r.address,e.find(".actionbody"))},showLinkMaker:function(e){r.address&&h.linkMakerForDeposit(r.address,e.find(".actionbody"))},showQrMaker:function(e){r.address&&h.qrMakerForDeposit(r.address,e.find(".actionbody"))},showDeposit:function(a){r.address="";var e=r.parameters.deposit.value,t="";if(r.active=!0,"pnetwallet"==e)return t=b.app.platform.sdk.address.pnet().address,r.address=t,void h.addressForDeposit(t,a.find(".actionbody"));"wallet"!=e||b.app.platform.sdk.addresses.addNewWalletAddress(function(e){b.app.platform.sdk.addresses.save(),t=e,r.address=t,h.addresses(),h.addressForDeposit(t,a.find(".actionbody"))})},showSendInStep:function(a,e,t){h.step(function(e){h.send(function(e){m[a](e),h.stepB(e,t)},e)},e,{class:"send"})},calculateFee:function(a){b.app.platform.sdk.node.fee.estimate(function(e){h.sendFees(a.find(".actionbody"),e)})},validSend:function(){var e=d.parameters.amount.value,a=d.parameters.reciever.value;return!!(0<e&&a)},prepareTransaction:function(i,c){function a(r,l,o){b.app.platform.sdk.wallet.txbase(r,_.clone(l),0,o,function(e,a,t){if(e)sitemessage(e);else{var n=b.app.platform.sdk.node.transactions.create.wallet(a,t),s=Math.min(n.virtualSize()*i,.0999);c&&c(r,l,s,o)}})}var t=d.parameters.amount.value,n=d.parameters.fees.value,e=d.parameters.message.value,s=m.sendAddresses(),r=[],l=d.parameters.reciever.value;if("pnetwallet"==l||l==b.app.localization.e("tacaddress"))return r.push({address:b.app.platform.sdk.address.pnet().address,amount:t}),void a(s,r,n);"wallet"!=l&&l!=b.app.localization.e("twallet")?(r.push({address:l,amount:t}),b.sdk.wallet.embed(r,e),a(s,r,n)):b.app.platform.sdk.addresses.addNewWalletAddress(function(e){r.push({address:e,amount:t}),b.app.platform.sdk.addresses.save(),a(s,r,n)})}},f=function(){m.addaddress()},v=function(){$(this).closest(".actionbody").html("")},h={clearMain:function(e){b.shell({animation:{id:"fadeInByElement",selector:".fadeInByElement",timeouts:150},clear:!0,el:o.c.find(".animationWrapper")},e)},clearStep:function(e){b.shell({animation:{id:"fadeInByElement",selector:".fadeInByElementStep",timeouts:150},clear:!0,el:o.step},e)},mainWithClear:function(e){c=[],p=[],h.clearStep(function(){h.main(function(){k()})})},main:function(e){b.shell({name:"main",el:o.main,data:{},animation:"fadeIn"},function(){o.total=o.c.find(".total .tttl"),o.totaler=o.c.find(".total .tttlforerror"),o.addresses=o.c.find(".addresses"),o.send=o.c.find(".send"),o.deposit=o.c.find(".deposit"),o.crowdfunding=o.c.find(".crowdfunding"),b.iclbks.main=function(){console.log("ACLK",b.app.errors.connection()),b.app.errors.connection()?o.totaler.addClass("active"):o.totaler.removeClass("active")},e&&e()})},stepC:function(e,a){e.find("._stepback").html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>'),e.find("._stepclose").html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+b.app.localization.e("wreturntoeallet")+"</span></div>"),e.find("._subcaptionlevel span").html(a||"")},stepB:function(e,a){e.find("._stepback").html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>'),e.find("._stepclose").html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+b.app.localization.e("wreturntoeallet")+"</span></div>"),e.find("._subcaptionlevel span").html(a||"")},step:function(t,e,n){n=n||{},u==e?t&&t(o.c.find(".step")):(c[u=e]=t,p[e]=n,h.clearMain(function(){_scrollToTop(o.step,0,200,-70),setTimeout(function(){b.shell({name:"step",el:o.step,data:{},animation:"fadeIn"},function(e){var a=e.el.find(".step");n.class&&a.addClass(n.class),n.view?a.attr("view",n.view):a.removeAttr("view"),t&&t(a)})},200)}))},showListcount:function(e,a){var t=b.app.platform.sdk.exchanges.get();b.shell({name:"listcr",el:a,data:{list:t,c:l}},function(s){function r(e,a){b.app.platform.sdk.exchanges.remove(e.currency,e.info.address),a.remove(),(t=b.app.platform.sdk.exchanges.get()).length||h.step(c[u-1],u-1,p[u-1])}s.el.find(".removecr").on("click",function(){var t=$(this).closest(".item"),e=t.attr("item"),n=b.app.platform.sdk.exchanges.find(e);b.app.platform.sdk.exchanges.status(n.currency,n.info.address,function(e,a){e?sitemessage(b.app.localization.e("errorreload")+" (error: 0006)"):"AWAITINGFUNDS"==a.Status||"EXPIREDAWAITINGFUNDS"==a.Status?r(n,t):dialog({html:b.app.localization.e("e13221"),success:function(){r(n,t)}})})}),s.el.find(".updatecr").on("click",function(){var t=$(this).closest(".item"),e=t.attr("item"),n=b.app.platform.sdk.exchanges.find(e);n?b.app.platform.sdk.exchanges.status({address:n.info.address,currency:n.currency},function(e,a){e?sitemessage(b.app.localization.e("errorreload")+" (error: 0002)"):h.crStatus(n,a,t.find(".status"))}):sitemessage(b.app.localization.e("errorreload")+" (error: 0001)")}),s.el.on("click",".todeal",function(){var e=$(this).closest(".item").attr("item"),a=b.app.platform.sdk.exchanges.find(e);m.showCrInStep("olddeal",u+1,"Deal",a)}),lazyEach({array:t,action:function(e){var a=e.item,t=s.el.find('[item="'+a.info.address+'"] .status'),n=b.app.platform.sdk.exchanges.info[a.info.address];h.crStatus(a,n,t)}})})},listcount:function(e){var a="",t=b.app.platform.sdk.exchanges.get(),n=e.find(".listcountWrapper");0<t.length?(a="("+t.length+")",e.find(".listcount").html(a),n.fadeIn()):n.fadeOut()},crdealstatusstep:function(e,a,t){b.shell({name:"crdealstatusstep",el:t,data:{addressobject:e,info:a}},function(e){})},crDeal:function(n,s,e){b.shell({name:"crdeal",el:e,data:{addressobject:n}},function(t){h.crStatus(n,s,t.el.find(".status")),h.crdealstatusstep(n,s,t.el.find(".crdealstatusstep")),t.el.on("click",".copyaddress1",function(){copyText(t.el.find(".forcopyaddress1")),sitemessage(b.app.localization.e("waddresswascop"))}),t.el.on("click",".copyaddress2",function(){copyText(t.el.find(".forcopyaddress2")),sitemessage(b.app.localization.e("waddresswascop"))}),t.el.on("click",".reactivate",function(){b.app.platform.sdk.exchanges.reactivate({address:n.info.address,currency:n.currency},function(e,a){e?sitemessage(b.app.localization.e("errorreload")+" (error: 0002)"):(s=a,h.crStatus(n,s,t.el.find(".status")),h.crdealstatusstep(n,s,t.el.find(".crdealstatusstep")))})})})},applyStatus:function(n,s){_.find(l.segments,function(e){var a=s.find('.segment[segment="'+e.id+'"]');if(e.id==n.Status){var t=100*Math.min((Number(e.time)-Number(n.MinutesLeft))/Number(e.time),.99);return a.find(".line").css("width",t+"%"),a.addClass("active"),e.class&&a.addClass(e.class),e.finish&&(a.addClass("ended"),a.find(".line").css("width","100%")),!e.finish&&"all"!=e.exclude||s.find(".current").html(e.currentLabel(n)),!0}a.addClass("ended"),a.find(".line").css("width","100%")})},crStatus:function(e,a,t,n){b.shell({name:"pocstatus",el:t,data:{addressobject:e,info:a,segments:l.segments}},function(e){h.applyStatus(a,t),n&&n()})},crowdRate:function(e,a,t){e.find(".rate .value").html("<b>1 PKOIN = "+a[t].toFixed(6)+" "+t.toUpperCase()+"</b>")},crowdCurrencyLabel:function(e,a){e.find(".currencyAmountLabel").html(a.toUpperCase()+" "+b.app.localization.e("amount")+"</b>")},crowdfunding:function(e,a){2==u&&(c[1]=function(e){m.showCrInStep("",1,"")},p[1]={class:"crowdfunding"}),l.parameters.currency||(l.parameters.currency.value="btc"),b.app.platform.sdk.exchanges.rates(function(n){b.app.platform.sdk.node.transactions.get.balance(function(t){t=Math.min(t/3,1e3),b.shell({name:"crowdfunding",el:a||o.crowdfunding,data:{d:l,amount:t}},function(a){ParametersLive(_.toArray(l.parameters),a.el),a.el.on("click",".closeAdditional",v),h.crowdRate(a.el,n,l.parameters.currency.value),h.crowdCurrencyLabel(a.el,l.parameters.currency.value),h.listcount(a.el),l.parameters.amount._onChange=function(e){l.parameters.amount.value<0&&(l.parameters.amount.value=0),l.parameters.amount.value>t&&(l.parameters.amount.value=t),l.parameters.currencyAmount.value=l.parameters.amount.value*n[l.parameters.currency.value],l.parameters.amount.el.closest(".inputWrapper").html(l.parameters.amount.input()),l.parameters.currencyAmount.el.closest(".inputWrapper").html(l.parameters.currencyAmount.input()),ParametersLive([l.parameters.amount,l.parameters.currencyAmount],a.el)},l.parameters.currency._onChange=function(e){b.app.platform.sdk.exchanges.rates(function(e){n=e,h.crowdRate(a.el,n,l.parameters.currency.value),h.crowdCurrencyLabel(a.el,l.parameters.currency.value)})},l.parameters.currencyAmount._onChange=function(e){l.parameters.currencyAmount.value<0&&(l.parameters.currencyAmount.value=0),l.parameters.currencyAmount.value/n[l.parameters.currency.value]>t&&(l.parameters.currencyAmount.value=Number((t*n[l.parameters.currency.value]).toFixed(6))),l.parameters.amount.value=l.parameters.currencyAmount.value/n[l.parameters.currency.value],l.parameters.amount.el.closest(".inputWrapper").html(l.parameters.amount.input()),l.parameters.currencyAmount.el.closest(".inputWrapper").html(l.parameters.currencyAmount.input()),ParametersLive([l.parameters.amount,l.parameters.currencyAmount],a.el)},a.el.find(".listcountWrapper").on("click",function(){m.showCrInStep("showListcount",2,"List of deals")}),a.el.find(".newdeal").on("click",function(){0<l.parameters.amount.value?(m.showCrInStep("newdeal",2,"Deal"),a.el.find(".required").addClass("hidden")):a.el.find(".required").removeClass("hidden")}),e&&e(a.el)})},"PFF7PevK753eYTwWBScdEAbWQrgu36AdUA",!0,!0)})},qrResultForDeposit:function(e,a,t){b.shell({name:"depositqrresult",el:a,data:{address:e,d:r}},function(e){})},linkResultForDeposit:function(e,a,t){b.shell({name:"depositlinkresult",el:a,data:{address:e,d:r}},function(e){e.el.find(".copylink").on("click",function(){copyText(e.el.find(".linkInTextArea")),sitemessage(b.app.localization.e("waddresswascop"))})})},linkMakerForDeposit:function(e,a,t){b.shell({name:"depositlinkmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){m.linkValidation()?a.removeClass("disabled"):a.addClass("disabled")}}),m.linkValidation()&&a.removeClass("disabled"),a.on("click",function(){m.linkValidation()&&m.showDepositInStep("showLinkResult",3,b.app.localization.e("linkCreated"))})})},qrMakerForDeposit:function(e,a,t){b.shell({name:"depositqrmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){m.linkValidationQr()?a.removeClass("disabled"):a.addClass("disabled")}}),m.linkValidationQr()&&a.removeClass("disabled"),a.on("click",function(){m.linkValidationQr()&&m.showDepositInStep("showQrResult",3,b.app.localization.e("wqrcodecreated"))})})},addressForDeposit:function(e,a,t){b.shell({name:"depositaddress",el:a,data:{address:e,d:r}},function(e){e.el.find(".getlink").on("click",function(){m.showDepositInStep("showLinkMaker",2,b.app.localization.e("wlinkcreating"))}),e.el.find(".qrcode").on("click",function(){m.showDepositInStep("showQrMaker",2,b.app.localization.e("wqrcodecreating"))}),e.el.find(".copyaddress").on("click",function(){copyText(e.el.find(".adr")),sitemessage(b.app.localization.e("waddresswascop"))})})},deposit:function(e,a){b.shell({name:"deposit",el:a||o.deposit,data:{d:r}},function(t){ParametersLive([r.parameters.deposit],t.el),r.parameters.deposit._onChange=function(e){b.app.settings.set(b.map.uri,"deposit",e);var a=r.parameters.deposit.labelByValue(e);t.el.find(".type").html(a),m.showDepositInStep("showDeposit",1,b.app.localization.e("wdoptions"))},t.el.find(".recieveaddress").on("click",function(){m.showDepositInStep("showDeposit",1,b.app.localization.e("wdoptions"))}),t.el.on("click",".closeAdditional",v),e&&e(t.el)})},sendFees:function(s,e,a){if(m.validSend()){var r=e.feerate||1e-6;m.prepareTransaction(r,function(e,a,t,n){b.shell({name:"sendfees",el:s,data:{fees:t,d:d}},function(e){ParametersLive([d.parameters.fees],e.el),d.parameters.fees._onChange=function(e){b.app.settings.set(b.map.uri,"feesMode",e)},e.el.find(".sendtransaction").on("click",function(){m.prepareTransaction(r,function(e,a,t,n){b.app.platform.sdk.wallet.txbase(e,_.clone(a),t,n,function(e,n,a){if(e)sitemessage(e);else{var t=b.app.platform.sdk.node.transactions.create.wallet(n,a);_.each(n,function(e){e.cantspend=!0}),b.app.platform.sdk.node.transactions.send(t,function(e,a){if(a)b.app.platform.sdk.node.transactions.releaseCS(n),sitemessage(a);else{var t=_.map(n,function(e){return e.txid});b.app.platform.sdk.node.transactions.clearUnspents(t),u=0,h.mainWithClear(),sitemessage(b.app.localization.e("wssuccessfully"))}})}})})})})})}},send:function(a,e){m.sendParameters(),b.shell({name:"send",el:e||o.send,data:{d:d}},function(t){ParametersLive(_.toArray(d.parameters),t.el);function n(){m.canChangeSend()?e.removeClass("hidden"):e.addClass("hidden")}var e=t.el.find(".change");d.parameters.amount._onChange=function(e){var a=m.sendAddresses();b.app.platform.sdk.node.transactions.get.balance(function(e){d.parameters.amount.value<0&&(d.parameters.amount.value=0),d.parameters.amount.value>e&&(d.parameters.amount.value=e),d.parameters.amount.el.closest(".inputWrapper").html(d.parameters.amount.input()),ParametersLive([d.parameters.amount],t.el),1==u&&m.showSendInStep("calculateFee",1,b.app.localization.e("wscalculatefees"))},a,null,!0)},d.parameters.source._onChange=function(e){m.sendParameters(),d.parameters.reciever.el.closest(".inputWrapper").html(d.parameters.reciever.input()),d.parameters.amount.el.closest(".inputWrapper").html(d.parameters.amount.input()),ParametersLive([d.parameters.reciever,d.parameters.amount],t.el),n(),1==u&&m.showSendInStep("calculateFee",1,b.app.localization.e("wscalculatefees"))},d.parameters.reciever._onChange=function(e){if(n(),!m.canChangeSend()&&e){var a=!0;try{bitcoin.address.fromBase58Check(e)}catch(e){a=!1}if(!a)return void t.el.find(".notvalidaddress").html(b.app.localization.e("wsaddressnotv"));t.el.find(".notvalidaddress").html(""),e[0]}else t.el.find(".notvalidaddress").html("")},e.on("click",function(){var e=m.canChangeSend();e&&(d.parameters.source.value=e,d.parameters.source._onChange(),d.parameters.source.el.closest(".inputWrapper").html(d.parameters.source.input()),ParametersLive([d.parameters.source],t.el))}),t.el.find(".calculateFee").on("click",function(){m.validSend()?(m.showSendInStep("calculateFee",1,b.app.localization.e("wscalculatefees")),t.el.find(".required").addClass("hidden")):t.el.find(".required").removeClass("hidden")}),n(),a&&a(t.el)})},addresses:function(s){var r=i.total.addresses(),l={};b.app.platform.sdk.node.transactions.get.unspents(function(n){b.app.platform.sdk.node.transactions.get.balance(function(e){_.each(n,function(e,a){l[a]=_.reduce(e,function(e,a){return e+Number(a.amount)},0)});var a=[i.pnetwallet,i.wallet],t=_.map(a,function(e){var a=_.map(e.addresses(),function(e){return{balance:l[e],address:e}});return{caption:e.caption,details:a,label:e.alabel}},r);b.shell({name:"addresses",el:o.addresses,data:{addressesGroup:t,total:e}},function(e){e.el.find(".addaddress").on("click",f),s&&s()})},r)},r)},updateTotal:function(e,a){h.datasets(e,s[e.id].data.datasets),s[e.id].update(),o.total.find('.totalItem[item="'+e.id+'"] .balanceWrapper').html(b.app.platform.mp.coinwithsmall(e.balance)),a&&a()},datasets:function(e,a){var t=[],n=_.map(e.move,function(e){return t.push(e.color),Number(e.summary||0)}),s=[],r=[],l=[],o=[],i="#F1F1F1";$("html").hasClass("stblack")&&(i="rgb(9, 20, 34)"),_.each(e.move,function(e){_.each(e.items,function(e){s.push(Number(e.value)),r.push(e.color),l.push(i),o.push(8)})});var c=[{data:n,backgroundColor:t,borderColor:[i,i],borderWidth:[8,8]},{data:s,backgroundColor:r,borderColor:l,borderWidth:o}];return _.each(a,function(e,a){e.data=c[a].data}),c},total:function(t,n){t.update?h.updateTotal(t,n):b.shell({name:"total",el:o.total,inner:append,data:{item:t}},function(e){var a=e.el.find("#chart"+t.id)[0].getContext("2d");s[t.id]=new Chart(a,{type:"doughnut",data:{datasets:h.datasets(t)},options:{rotation:.5*Math.PI,cutoutPercentage:85}}),n&&n()})}},w=function(){},k=function(e){o.total.html(""),a(function(){lazyActions([h.send,h.deposit,h.addresses],e),b.app.platform.sdk.node.transactions.clbks.circles=function(){a(null,!0)},b.app.platform.sdk.node.transactions.clbks.walletaddresses=function(){h.addresses()}}),b.app.platform.sdk.node.transactions.get.allBalance(null,!0)};return{primary:t,getdata:function(e){var a={};a.p2pkh=b.app.platform.sdk.address.pnet(),r.parameters.deposit.value=b.app.settings.get(b.map.uri,"deposit")||r.parameters.deposit.defaultValue,d.parameters.source.value=b.app.settings.get(b.map.uri,"source")||d.parameters.source.defaultValue,d.parameters.reciever.value="",d.parameters.fees.value=b.app.settings.get(b.map.uri,"feesMode")||d.parameters.fees.defaultValue,r.active=!1,u=0,c=[],p=[],e(a)},destroy:function(){delete b.app.platform.sdk.node.transactions.clbks.circles,delete b.app.platform.sdk.node.transactions.clbks.walletaddresses,delete b.iclbks.main,o={}},init:function(a){s={},w(),(o={}).c=a.el.find("#"+b.map.id),o.step=o.c.find(".actionstep"),o.main=o.c.find(".mainstep"),function(){if(o.c.on("click","._stepclose",function(){u=0,h.mainWithClear()}),o.c.on("click","._stepback",function(){1<u?h.step(c[u-1],u-1,p[u-1]):(u=0,h.mainWithClear())}),isMobile()){var t=o.c.find(".circularprogress"),n=new CircularProgress({radius:30,strokeStyle:"#00A3F7",lineCap:"round",lineWidth:1,font:"100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#00A3F7",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});n.update(70),o.c.find(".circularprogressWrapper").html(n.el);var e=$(window),a=new SwipeParallax({el:o.c.find(".ntf"),allowPageScroll:"vertical",directions:{down:{cancellable:!0,positionclbk:function(e){var a=Math.abs(e)/200;0<=e&&(n.options.text={value:""},n.update(100*a),t.height(220*a+"px"))},constraints:function(){if(0==e.scrollTop())return!0},restrict:!0,trueshold:200,clbk:function(){b.app.platform.sdk.notifications.getNotifications(),b.app.platform.sdk.node.transactions.get.allBalanceUpdate(function(){k(),a.renew()})}}}}).init()}}(),h.main(function(){k(function(){var e=parameters();e.action&&("send"==e.action&&(d.parameters.amount.value=Number(e.amount.replace(/,/g,"")),d.parameters.reciever.value=e.address,d.parameters.amount._onChange(),m.showSendInStep("calculateFee",1,b.app.localization.e("wscalculatefees"))),"recieve"==e.action&&m.showDepositInStep("showDeposit",1,b.app.localization.e("wdoptions"))),a.clbk(null,a)})})}}}var b=new nModule,n={};return b.run=function(e){var a=b.addEssense(n,t,e);b.init(a,e)},b.stop=function(){_.each(n,function(e){e.destroy()})},b}();"undefined"!=typeof module?module.exports=wallet:(app.modules.wallet={},app.modules.wallet.module=wallet);
 /*_____*/ 
var tagcloud=function(){function o(n){var o,t=deep(n,"history"),a=function(n,t){n.length?(o.c.removeClass("hidden"),d.shell({name:"tags",el:o.tags,data:{tags:n}},function(n){n.el.find(".showhidealltags").on("click",function(){console.log("sad"),o.c.toggleClass("showedalltags")}),t&&t()})):o.c.addClass("hidden")},e=function(){},l=function(){!function(o){d.app.platform.sdk.tags.cloud(function(n,t){n=d.app.platform.sdk.tags.filterEx(n),o&&o(n,t)})}(function(n,t){t&&(d.iclbks.main=l),a(n)})};return{primary:t,getdata:function(n){n({})},destroy:function(){delete d.iclbks.main,o={}},init:function(n){e(),(o={}).c=n.el.find("#"+d.map.id),o.tags=o.c.find(".tags"),l(),n.clbk(null,n)}}}var d=new nModule,a={};return d.run=function(n){var t=d.addEssense(a,o,n);d.init(t,n)},d.stop=function(){_.each(a,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=tagcloud:(app.modules.tagcloud={},app.modules.tagcloud.module=tagcloud);
 /*_____*/ 
var share = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var wordsRegExp = /[,.!?;:() \n\r]/g

		var displayTimes = false

		var primary = deep(p, 'history');

		var el, currentShare = null, essenseData;

		var focusfixed = false, external = null, pliss;

		var intro = false;

		var m = self.app.localization.e('e13160')

		var actions = {

			language : function(_clbk){
				var items = []

				_.each(self.app.localization.available, function(a){
					items.push({
						text : a.name,
						action : function (clbk) {

							var na = app.localization.findByName(a.name);


							if (na && na.key != currentShare.language.v)
							{
								currentShare.language.set(na.key)
							}

							clbk()

							renders.postline();

							if(_clbk) _clbk()

						}
					})
				})

				menuDialog({

                    items: items
				})
			},

			toggleTimesDisplay : function(){

				var checkEntity = currentShare.message.v || currentShare.caption.v || currentShare.repost.v || currentShare.url.v || currentShare.images.v.length || currentShare.tags.v.length;

				if (el.times){

					if (checkEntity){

						el.times.removeClass('hide');
						
					}
	
					if (!checkEntity){
	
						el.times.addClass('hide');
	
					}
				}

			},

			tooltips : function(){
				if(!actions.tooltip){

					if(pliss) pliss.destroy()

				}
			},

			tooltip : function(){
				if(!intro) return;

				if(!currentShare.message.v){

					return
				}

				if(!currentShare.tags.length){

					pliss = self.app.platform.api.plissing({
						el : el.tagSearch,
						text : self.app.localization.e('e13161')
					})

					return true
				}
			},

			unfocus : function(){
				if (el.c)
					el.c.addClass('unfocus').removeClass('focus')
			},

			waitActions : function(){
				self.app.platform.sdk.user.waitActions(function(r){

					if(!el.c) return

					if(!r || r == 'inf'){

						el.c.removeClass('waitActions')

					}
					else
					{
						el.c.addClass('waitActions')
					}
				})
			},

			autoFilled : function(){

				actions.filled('i', currentShare.images.v.length != 0)
				actions.filled('u', currentShare.url.v)
				actions.filled('t',  currentShare.tags.v.length!= 0)					
				actions.filled('cm', currentShare.message.v || currentShare.caption.v)

			},

			filled : function(key, f){
				var _el = el.c.find('.draggablepart[part="'+key+'"]');

				if (f){
					_el.addClass('filled');
				}
				else{
					_el.removeClass('filled');
				}

				
			},
			checkUrlForImage : function(url){

				var ex = ['.jpg', '.gif', '.png', '.jpeg']


				url = url.split("?")[0].toLowerCase();

				var m = _.find(ex, function(e){
					if(url.indexOf(e) > -1){
						return true;
					}
				})

				if(m) return true;
			},
			embeding20 : function(value){

				var storage = currentShare.export(true)

				self.nav.api.load({
					open : true,
					id : 'embeding20',
					inWnd : true,

					essenseData : {
						storage : storage,
						value : value,
						on : {
							added : function(value){

								if(type == 'url' && value && actions.checkUrlForImage(value)){

									type = 'images';
									value = value
								}

								currentShare[type].set(value)

								if (renders[type])
									renders[type]();
							}
						}
					}
				})
			},
			embeding : function(type, value){
				var storage = currentShare.export(true)

				if (type === 'addVideo') {

					self.nav.api.load({
						open : true,
						id : 'uploadpeertube',
						inWnd : true,

						history : true,

						essenseData : {
							storage : storage,
							value : value,
							actions : {
								added : function(link){
									var type = 'url';

									console.log('Finished!', link, new Date());
									var result = currentShare[type].set(link)

									if(!essenseData.share){
										state.save()
									}

									if(!result && errors[type]){

										sitemessage(errors[type])

									}								

									if (renders[type])
										renders[type]();
									
								}
							}
						},

						clbk : function(p){
							external = p
						}
					})
					return true;
				} 

				if(type == 'article'){
					self.nav.api.load({
						open : true,
						id : 'articles',
						inWnd : true,

						history : true,

						essenseData : {
							storage : storage,
							value : value,
							on : {
								added : function(value){

									
								}
							}
						},

						clbk : function(p){
							external = p
						}
					})

					return
				}

				if(type == 'times'){

					dialog({
						html : self.app.localization.e('e14002'),
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),

						success : function(){

							currentShare.clear();
							currentShare.language.set(self.app.localization.key)
							make();
							
						},

						fail : function(){
						}
					})

					

					return

				}
				
				
				if(type == 'url' || type == 'images'){
					focusfixed = true;

					self.nav.api.load({
						open : true,
						id : 'embeding',
						inWnd : true,

						essenseData : {
							type : type,
							storage : storage,
							value : value,
							on : {
							
								added : function(value){

									var result = true;

									if(type == 'url' && value && actions.checkUrlForImage(value)){

										type = 'images';
										value = value
									}

									if(!_.isArray(value)) value = [value]

									_.each(value, function(v, i){

										result = currentShare[type].set(v)

										if(!essenseData.share){
											state.save()
										}
									})

									if(!result && errors[type]){

										sitemessage(errors[type])

									}								

									if (renders[type])
										renders[type]();
								}
							}
						},

						clbk : function(s, p){
							external = p

						}
					})
				}

				
			},
			addTag : function(tag){

				//tag = tag.replace(/#/g, '')

				if(!currentShare.tags.set(tag)){

					el.error.html(self.app.localization.e('e13162'))

					/*dialog({
						html : ,
						class : "one"
					})*/
				}
				else
				{

					el.error.html('')

					if(!essenseData.share){
						state.save()
					}
				}

			},
			editImage : function(r){
				var m = _.map(currentShare.images.v, function(src, i){

					return {
						original : src,
						index : i
					}
					
				})

				var f = _.filter(m, function(f){
					if(f.original.indexOf('data:image') > -1){
						return true;
					}
				})

				focusfixed = true;

				self.nav.api.load({
					open : true,
					id : 'imageGalleryEdit',
					inWnd : true,

					essenseData : {
						edit : true,
						initialValue : r,
						images : f,

						/*apply : true,

						crop : {
							aspectRatio : 1 / 1,
							style : 'round apply',
							autoCropArea : 0.9,
						},*/

						close : function(){
							setTimeout(function(){
								focusfixed = false;
							}, 200)
						},

						success : function(images, clbk){
							_.each(currentShare.images.v, function(img, i){

								var edited = _.find(f, function(eimg){
									if(eimg.index == i) return true;
								})

								if (edited){
									currentShare.images.v[i] = edited.original
								}

							})

							if(!essenseData.share){
								state.save()
							}

							renders.images(clbk);
						}
					}
				})
			},
			removeImage : function(r){

				var image = currentShare.images.v.splice(r, 1)[0];

				el.c.find('.imageContainer').each(function(){
					var el = $(this)

					var v = el.attr('value');

					if (v > r){
						el.attr('value', v - 1)
					}

					if(v == r){
						el.remove();
					}
				})

				var elimages = el.c.find('.imagesEmbWr')

				elimages.isotope()

				//renders.images()

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split(image).join('');

				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
			},
			removelink : function(){

				var l = currentShare.url.v

				currentShare.url.set();

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split(l).join('');


				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
				/*el.message.val(text);
				el.message.change();*/
			},
			removeTag : function(tag){
				currentShare.tags.remove(tag)

				var text = el.eMessage[0].emojioneArea.getText();

				text = text.split('#' + tag).join(tag);

				el.eMessage[0].emojioneArea.setText(text);

				if(!essenseData.share){
					state.save()
				}
			},

			applyText : function(text){
				currentShare.message.set(text);
			},

			caption : function(caption){
				currentShare.caption.set(caption);
			},

			linksFromText : function(text){

				console.log(text, 'text');

				if(!currentShare.url.v){
					var r = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi; 
					

					var matches = text.match(r);


					if(matches && matches.length > 0){

						_.each(matches, function(url){
							if(actions.checkUrlForImage(url)){

								if (currentShare.images.v.indexOf(url) == -1){
									currentShare.images.set(url)

									renders['images']()
								}

							}
							else
							{
								if(currentShare.url.v) return;
								console.log('preparedUrl', url);
								currentShare.url.set(url)

								renders['url']()
							}
						})

						

						
					}
				}
			},

			tagsFromText : function(text){
				var words = text.split(wordsRegExp);

				var newtags = _.filter(words, function(w){
					if(w[0] == '#'){

						w = w.replace(/#/g, '')

						if(!w) return false

						return !currentShare.tags.have(w)

					}
				})

				if(newtags.length){

					_.each(newtags, function(tag){

						tag = tag.replace(/\#/g, '')

						if(!currentShare.tags.set(tag)){
							
						}
					})

					renders.tags()

				}
				
			},

			post : function(clbk, p){

				console.log('into post', currentShare)


				el.postWrapper.removeClass('showError');

				if(essenseData.hash == currentShare.shash()){

					el.postWrapper.addClass('showError');
					el.error.html(self.app.localization.e('e13163'))
					return
				}

				el.c.addClass('loading')
				topPreloader(50)

		
				//currentShare.language.set(self.app.localization.key)

				currentShare.uploadImages(self.app, function(){

					self.sdk.node.transactions.create.commonFromUnspent(

						currentShare,

						function(_alias, error){

							topPreloader(100)

							el.c.removeClass('loading')

							if(!_alias){
								

								if (clbk){
									clbk(false, errors[error])
								}
								else{
									el.postWrapper.addClass('showError');

									var t = self.app.platform.errorHandler(error, true);

									if (t)

										el.error.html(t)
								}
							}
							else
							{
								//sitemessage("Success")

								try{

									var alias = new pShare();
										alias._import(_alias, true)
										alias.temp = true;
										alias.address = _alias.address

									if(currentShare.aliasid) alias.edit = "true"	
									if(currentShare.time) alias.time = currentShare.time

									self.app.platform.sdk.node.shares.add(alias)

									if(!essenseData.notClear){
										currentShare.clear();

										self.app.nav.api.history.removeParameters(['repost'])

										if(!essenseData.share){
											state.save()
										}

										make();	
									}

																	

								}

								catch (e){
									console.log(e)
								}

								self.app.platform.sdk.user.get(function(u){
									u.postcnt++
								})

								intro = false

								if (essenseData.post){
									essenseData.post()
								}
								else{

									if(isMobile()){
										self.app.nav.api.load({
											open : true,
											href : 'index',
											history : true
										})
									}
									else{
										_scrollTop(0);
									}

									

								}

								if (clbk)
									clbk(true)


								actions.unfocus();
								
								successCheck()
								
								
							}

						},

						p
					)

				})

			},
			error : function(onlyremove){
				var error = currentShare.validation();

				actions.toggleTimesDisplay();

				if (error && !onlyremove){

					if (el.postWrapper)
						el.postWrapper.addClass('showError')

					el.error.html(errors[error])

					if(error == 'message'){
						el.c.find('.emojionearea-editor').focus()
					}

					if(error == 'tags'){
						el.c.find('.tgs input').focus()
					}

					

					return true
				}
				else
				{
					if (el.postWrapper)
						el.postWrapper.removeClass('showError')

					el.error.html('')

					return false
				}
			},

			eTextChange : function(c){
				console.log('c text', c)
				var text = c.getText();

				actions.tagsFromText(text);

				actions.applyText(text);

				actions.linksFromText(text);

				renders.caption();

				if(!essenseData.share){
					state.save()
				}
			},

			
		}

		var errors = {
			message : self.app.localization.e('emptymessage'),
			tags : self.app.localization.e('emptytags'),
			images : self.app.localization.e('maximages'),
            url : self.app.localization.e('e13164'),
            error_video : self.app.localization.e('e13165')
		}

		var events = {
			unfocus : function(e){

				

				if (el.c.hasClass('focus') && !focusfixed && el.c.has(e.target).length === 0){
					actions.unfocus();
				}
		
			},
			selectTime : function(){

				var d = new Date()

					d = d.addMinutes(10);

				var date = {
					day : null,
					hour : d.getHours(),
					minutes : d.getMinutes()
				}

				if(essenseData.time){
					date.day = essenseData.time.yyyymmdd()
					date.hour = essenseData.time.getHours()
					date.minutes = essenseData.time.getMinutes()
				}

				self.fastTemplate('sharedate', function(html){

					dialog({
						html : html,

						btn1text : self.app.localization.e('daccept'),

						class : "one sharedate",

						clbk : function(d){


						},	

						wrap : true,

						success : function(d){
							var day = d.el.find('.day').val()
							var hours = d.el.find('.hours').val()
							var minutes = d.el.find('.minutes').val()

							var date = strToDateSmall(day)

								date = date.addHours(hours)

								date = date.addMinutes(minutes)

							var now = new Date();

							if (now < date){

								essenseData.time = date;

								el.selectTime.find('.selectedTime').html(convertDate(dateToStr(date)))

								if (essenseData.selectTime)
									essenseData.selectTime(date)

								return true;
							}
							else
							{

								sitemessage(self.app.localization.e('pastdate'))

								return false;
							}
						}
					})

					html

				}, {
					date : date
				})

				
			},
			changePostTime : function(){

				var _el = $(this);
				var type = $(this).val();

				if (type == 'p'){

					dialog({
						html : self.app.localization.e('sharenow'),
						btn1text : self.app.localization.e('dyes'),
						btn2text : self.app.localization.e('dno'),

						success : function(){

							if (essenseData.type)
								essenseData.type(type)


							
						},

						fail : function(){
							_el.val('w')
						}
					})
					

					return;
				}
				
				if (type == 't'){
					var error = actions.error();

					if (error){
						_el.val('w')
					}

					else
					{
						if(essenseData.time && essenseData.time < new Date()){

							essenseData.time = null;

							el.selectTime.find('.selectedTime').html(self.app.localization.e('timenotselected'))							

							if (essenseData.selectTime)
								essenseData.selectTime(null)

						}
					}
				}

				type = $(this).val();

				if (essenseData.type){
					essenseData.type(type)
				}

			},
			changeAddress : function(){
				var address = $(this).val();

				var icon = el.c.find('.usericon')

				var src = deep(app, 'platform.sdk.users.storage.'+address+'.image') || '';

				if(src){
					icon.html('');

					icon.attr('image', src);

					bgImages(el.c.find('.icon'))
				}
				else
				{
					icon.html('<svg width="30" height="30" data-jdenticon-value="'+address+'"></svg>')

					icon.attr('image', '');
					icon.css('background', '#F9F6F6');

					icon.css('background-image', '');
					icon.css('background-size', '');
					icon.css('background-position', '');
					icon.css('background-repeat', '');

					el.c.find('[data-jdenticon-value]').each(function(){
						var t = $(this);
						var v = t.data('jdenticon-value')

						t.html(jdenticon.toSvg(v, t.width()))
					})
				}

				

				if (essenseData.address){
					essenseData.address(address)
				}

			},

			change : function(){
				actions.error(true);

				actions.autoFilled()
			},

			post : function(){
				var error = actions.error();

				if (!error){
					actions.post()
				}
				
			},
			embeding : function(){
				var type = $(this).attr('embeding')

				if (type == 'language'){

					actions.language()

					return
				}

				if (type == 'embeding20'){
					actions.embeding20()
				}
				else
				{
					actions.embeding(type)
				}

				
			},
			addTag : function(tag){

				actions.addTag(tag)

			 	renders.tags()
			},
			caption : function(){
				var caption = $(this).val()

				actions.caption(caption)
			},

			eTextChange : function(editor, event){

				var c = this;

				actions.eTextChange(c)
				
			},

			textChange : function(){
				var text = $(this).val();

				actions.tagsFromText(text);

				actions.applyText(text);

				actions.linksFromText(text);

				renders.caption();
			},
			eText : function(editor, e){

				var char = String.fromCharCode(e.keyCode || e.which);
				var text = this.getText();

				if ((wordsRegExp).test(char)) {

					
					actions.tagsFromText(text);
					actions.linksFromText(text);

				}

				actions.applyText(text);

				renders.caption();

				if(!essenseData.share){
					state.save()
				}

				
			},
			text : function(e){

				var char = String.fromCharCode(e.keyCode || e.which);
				var text = $(this).val()

				if ((wordsRegExp).test(char)) {

					
					actions.tagsFromText(text);
					actions.linksFromText(text);

				}

				actions.applyText(text);

				renders.caption();

				
			},
			removeTag : function(){
				var tag = $(this).closest('.tag').attr('tag')

				actions.removeTag(tag)

				$(this).closest('.tag').remove()
			},

			removelink : function(){
				actions.removelink()

				renders.url();
			}


		}

		var renders = {

			postline : function(clbk){

				self.shell({
					name :  'postline',
					el : el.postline,
					data : {
						share : currentShare,
						essenseData : essenseData,
						lkey : self.app.localization.key
					},

				}, function(p){

					el.panel = el.c.find('.panel .item');
					el.postWrapper = el.c.find('.postWrapper');					
					el.changePostTime = el.c.find('.postTime')
					el.selectTime = el.c.find('.selectedTimeWrapper')
					el.post = el.c.find('.post')
					el.times = el.c.find('.panel .times')

					el.changePostTime.on('change', events.changePostTime)
					el.selectTime.on('click', events.selectTime)
					el.panel.on('click', events.embeding)
					el.post.on('click', events.post)

					el.peertube = el.c.find('.peertube');

					el.peertube.on('click', async function() {
						console.log('>>>>>>>>usertoken', self.app.peertubeHandler.userToken);
					});


					p.el.find('.cancelediting').on('click', function(){
						self.closeContainer();
		
						if (essenseData.close){
							essenseData.close()
						}
					})


					actions.toggleTimesDisplay();

					if (clbk)
						clbk();
				})

			},

			tgs : function(clbk){

				self.shell({
					name :  'tgs',
					el : el.tgsWrapperMain,
					data : {
						share : currentShare
					},

				}, function(p){


						el.tags = el.c.find('.tagsCont');
						el.tagSearch = el.c.find('.searchWrapper');

						search(el.tagSearch, {
							placeholder : self.app.localization.e('addtags'),
			
							clbk : function(el){
			
							
							},
			
							time : 0,
						
							events : {
								/*blur : function(value){
									events.addTag(value)
								},*/
								fastsearch : function(value, clbk, e){
						
									if(e){
										var char = String.fromCharCode(e.keyCode || e.which);
			
										if ((/[,.!?;:() ]/).test(char)) {
			
											events.addTag(value.replace(/#/g,'').replace(/ /g,''))
			
											el.tagSearch.find('input').val('').focus()
			
											clbk(null)
			
											return
										}
									}
			
			
									self.app.platform.sdk.tags.search(value, function(data){
										
										renders.tagsResults(data, function(tpl){
			
											clbk(tpl, function(_el, helpers){
			
												_el.find('.result').on('click', function(){
			
													var tag = $(this).attr('result')
			
													helpers.closeResults();
													helpers.clear();
			
													events.addTag(tag)
			
												})
			
												_el.find('.empty').on('click', function(){
			
													var tag = trim(el.tagSearch.find('input').val())
			
													if (tag){
														helpers.closeResults();
														helpers.clear();
			
														events.addTag(tag)
													}
			
													
			
												})
			
											})
			
										})
			
									})
								},
			
								search : function(value, clbk, helpers){
			
									value = value.replace(/#/g, ' ');
			
									value = value.split(" ");
			
									value = _.filter(value, function(v){
										return v
									})
			
									if (value.length == 1){
										value = value[0]
									}
			
									events.addTag(value)
			
									helpers.clear();
			
									if (clbk)
										clbk()
								}
							},
			
							last : {
								get : function(){
									return [
										self.app.localization.e('tnews'), 
										self.app.localization.e('timages'), 
										self.app.localization.e('tvideos'), 
										self.app.localization.e('tmarket'), 
										self.app.localization.e('tsport')
									]
								},
			
								tpl : function(data, clbk){
									renders.tagsResults(data, function(tpl){
			
										clbk(tpl, function(el, helpers){
			
											el.find('.result').on('click', function(){
			
												var tag = $(this).attr('result')
			
												helpers.closeResults();
												helpers.clear();
			
												events.addTag(tag)
			
											})
			
										})
			
									})
								}
							}
							
						})


					if (clbk)
						clbk();
				})
			},

			tags : function(clbk){

				if (el.tags){
					el.tags.find('.tag').remove()

					self.shell({
						name :  'tags',
						inner : append,
						el : el.tags,
						data : {
							tags : currentShare.tags.get(),
							share : currentShare
						},

					}, function(p){

						if (p.el)
							p.el.find('.remove').on('click', events.removeTag)

						if (clbk)
							clbk();
					})
				}
			},

			tagsResults : function(results, clbk){

				self.shell({
					name :  'tagsResult',
					data : {
						results : results
					},

				}, function(_p){
					if (clbk)
						clbk(_p.rendered);
				})
			},

			all : function(){

				el.eMessage[0].emojioneArea.setText(currentShare.message.v);
				el.cpt.find('input').val(currentShare.caption.v || "")

				el.cpt.val();

				renders.tgs(renders.tags);
				
				renders.url();

				renders.caption();

				renders.images();

				renders.repost();

				renders.postline();

			},

			caption : function(){

				if(currentShare.caption.v/* || currentShare.message.v.length > 100*/){

					if(!el.cpt.hasClass('active'))
						el.cpt.addClass('active');

				}
				else
				{
					el.cpt.removeClass('active');
				}
			},

			url : function(clbk){

				var url = currentShare.url.v;

				var meta = self.app.platform.parseUrl(url);

				var og = self.app.platform.sdk.remote.storage[url];

				
				self.shell({
					name :  'url',
					inner : html,
					el : el.urlWrapper,
					data : {
						url : currentShare.url.v,
						og : og,
						remove : true,

						share : currentShare
					},

				}, function(p){

					if(currentShare.url.v && !og){

						if (meta.type == 'youtube' || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube') {

                            Plyr.setup('.js-player', function(player) {

								player.muted = false
							});

						} else {
							self.app.platform.sdk.remote.get(meta.url, function(og){

								if(og){
									renders.url()
								}

							})
						}
					}

					else{
						if(og){

							var images = p.el.find('img');

								p.el.find('img').imagesLoaded({ background: true }, function(image) {

									_.each(image.images, function(i, index){
										if(i.isLoaded){
											$(images[index]).addClass('active')

											if(i.img.naturalWidth > 500){
												p.el.addClass('bigimageinlink')
											}
										}
										else
										{
											$(images[index]).closest('.image').css('display', 'none')
										}
									})
									
								});

								p.el.find('.removeImage').on('click', function(){

									focusfixed = true;

									currentShare.settings.image = 'r'

									renders.url()

									state.save()

									setTimeout(function(){
										focusfixed = false;
									}, 200)
								})

						}
					}

					p.el.find('.removelink').on('click', events.removelink)

					if (clbk)
						clbk();
				})
				
			},

			images : function(clbk){
				self.shell({
					name :  'images',
					turi : 'embeding',
					inner : html,
					el : el.images,
					data : {
						images : _.map(currentShare.images.v || [], function(i, index){
							return {
								src : i,
								id : index
							}
						})
					},

				}, function(p){

					p.el.find('.remove').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.removeImage(r)
					})

					p.el.find('.edit').on('click', function(){
						var r = $(this).closest('.imageContainer').attr('value');

						actions.editImage(r)
					})

					p.el.find('.image').on('click', function(){

						var src = $(this).attr('i')

						if(!src) return

						var images = _.map(currentShare.images, function(i){

							return {
								src : i
							}
						})

						self.app.nav.api.load({
							open : true,
							id : 'imageGallery',
							inWnd : true,

							essenseData : {
								initialValue : src,
								idName : 'src',
								images : images
							}
						})
					})

					p.el.find('.image').imagesLoaded({ background: true }, function(image) {

						if(!isMobile()){
							var elimages = el.images.find('.imagesEmbWr')


						  	elimages.isotope({

								layoutMode: 'packery',
								itemSelector: '.imageContainer',
								packery: {
									gutter: 20
								},
								initLayout: false
							});


							elimages.on('arrangeComplete', function(){

								if (clbk)
									clbk();
			
								el.images.addClass('active')

							});

							elimages.isotope()
						}
						else
						{
							if (clbk)
								clbk();
			
							el.images.addClass('active')
						}

						


					});

					
				})
			},

			repost : function(clbk){
				var repost = currentShare.repost.v;

				self.app.platform.sdk.node.shares.getbyid([repost], function(){

					var share = self.app.platform.sdk.node.shares.storage.trx[repost] 
						
					self.shell({
						name :  'repost',
						inner : html,
						el : el.repostWrapper,
						data : {
							repost : share,
							share : currentShare,
							level : 0
						},
	
					}, function(_p){	

						if(repost){
							self.app.platform.papi.post(repost, _p.el.find('.repostShare'), function(){

							}, {
								repost : true,
								eid : "share"
							})

							_p.el.find('.repostCaption').on('click', function(){

								currentShare.repost.set()

								state.save()

								self.app.nav.api.history.removeParameters(['repost'])

								
								renders.repost(function(){
									renders.tgs(renders.tags);
									renders.postline();
								});

							})
		
							
						}

						if (clbk)
							clbk();

						
					})

					
				
				})
			}

		}

		var state = {
			save : function(){

				if(!currentShare){
					self.app.settings.set(self.map.id, 'currentShare', '');
				}
				else
				{
					var exp = currentShare.export(true)

					if (exp.message == m) exp.message = ''

					var scs = self.app.settings.set(self.map.id, 'currentShare', exp);

					if(!scs){
						//self.app.settings.set(self.map.id, 'currentShare', '');
					}
				}

				
			},
			load : function(){
				var last = self.app.settings.get(self.map.id, 'currentShare')

				if (last)
					currentShare.import(last)

				return last
			}
		}

		var make = function(){
			renders.all()
		}

		var initEvents = function(){

					

			el.changeAddress.on('change', events.changeAddress)			


		   	el.eMessage.emojioneArea({
		    	pickerPosition : 'bottom',
		    	
		    	search : false,
		    	tones : false,
		    	autocomplete : false,

		    	attributes: {
			        spellcheck : true,
			    },

				filters : {
					smileys_people: {
						icon: "yum",
						title: "Smileys & People",
						emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down " +
						"wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum " +
						"stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses " +
						"cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown " +
						"frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth " +
						"no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream " +
						"fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking " +
						"shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face " +
						"head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader " +
						"robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
						"pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist " +
						"right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up " +
						"raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie " +
						"nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette " +
						"busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman " +
						"man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer " +
						"woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker " +
						"man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer " +
						"woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist " +
						"woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist " +
						"man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge " +
						"man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing " +
						"man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok " +
						"man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging " +
						"man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut " +
						"woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying " +
						"men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple " +
						"bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire " +
						"mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie " +
						"womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat " +
						"tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses " +
						"closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
					},
				},

		    	events : {
		    		change : events.eTextChange,
		    		click : events.eTextChange,
		    		keyup : events.eText,

		    		onLoad : function(c,d){

		    			if (parameters().newshare){
		    				el.c.find('.emojionearea-editor').focus()
		    			}
			
						el.c.find('.emojionearea-editor').pastableContenteditable();

						console.log('pastable');

						el.c.find('.emojionearea-editor').on('pasteImage', function (ev, data){

							topPreloader(100)


							var r  = currentShare.images.set(data.dataURL)

							if(!r){
								sitemessage(errors.images)
							}
							else
							{
								if (renders.images)
									renders.images();
							}

							


						}).on('pasteImageStart', function(){

							topPreloader(30)

						}).on('pasteImageError', function(ev, data){

						 	topPreloader(100)

						}).on('pasteText', function (ev, data){

							actions.eTextChange(el.eMessage[0].emojioneArea)

						});


						/*if(typeof _Electron != 'undefined'){
							const electronSpellchecker = require('electron-spellchecker');

							// Retrieve required properties
							const SpellCheckHandler = electronSpellchecker.SpellCheckHandler;
							const ContextMenuListener = electronSpellchecker.ContextMenuListener;
							const ContextMenuBuilder = electronSpellchecker.ContextMenuBuilder;
					
							// Configure the spellcheckhandler
							window.spellCheckHandler = new SpellCheckHandler();
							window.spellCheckHandler.attachToInput();
					
							// Start off as "US English, America"
							window.spellCheckHandler.switchLanguage('en-US');
					
							// Create the builder with the configured spellhandler
							var contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);
					
							// Add context menu listener
							var contextMenuListener = new ContextMenuListener((info) => {
								contextMenuBuilder.showPopupMenu(info);
							});
						}*/

						

		    		}
		    	}
		    });
			
			el.caption.on('keyup', events.caption)

			currentShare.on.change.edit = events.change;
			
			//autosize(el.c.find('textarea'));

			if(!isMobile())

				el.c.find('.tooltip').tooltipster({
	                theme: 'tooltipster-light',
	                maxWidth : 600,
	                zIndex : 20,
	            }); 

			
			
			var ps = {
				animation: 150,
				swapThreshold : 0.5,
				draggable : '.draggablepart',
				onUpdate: function (evt){

					var na = [];
				   
					var ps = $(list).find('.draggablepart');

					$.each(ps, function(){
						na.push($(this).attr('part'))
					})

					currentShare.settings.a = na

					if(!essenseData.share){
						state.save()
					}

					if (essenseData.changeArrange){
						essenseData.changeArrange()
					}
				},
				forceFallback : true
			}
		
			ps.handle = '.marker'
			
			var list = document.getElementById("sortableBody");

			if (list && !isMobile()){
				Sortable.create(list, ps); 
			}
			
			actions.autoFilled()

			self.app.platform.ws.messages.transaction.clbks.share = actions.waitActions

			el.c.on('click', function(){

				el.c.addClass('focus').removeClass('unfocus')

			})

			$('html').on('click', events.unfocus);

			actions.toggleTimesDisplay();

			
		}




		return {
			primary : primary,

			post : actions.post,

			make : function(){
				state.load();
				
				make();

			},

			auto : function(){
				var _p = parameters();

				if (_p.marticles && !self.app.nav.wnds['articles']){
					actions.embeding('article', null)
				}
				
			},

			getdata : function(clbk, p){

				intro = false;
				external = null

				currentShare = deep(p, 'settings.essenseData.share') || new Share(self.app.localization.key);

				essenseData = deep(p, 'settings.essenseData') || {};

				self.app.platform.sdk.user.get(function(u){

					if(!essenseData.share){

						state.load()

						if (u.postcnt === 0 && !currentShare.message.v && essenseData.hello){
							currentShare.message.v = m

							intro = true;
						}
					}

					if (parameters().repost) 
						currentShare.repost.set(parameters().repost)


					var data = {
						essenseData : essenseData,
						share : currentShare,
						postcnt : u.postcnt,
						
					};
					
					

					clbk(data);



				})


			},

			destroy : function(){

				if (external){
					external.module.closeContainer()
				}

				external = null

				$('html').off('click', events.unfocus);

				delete self.app.platform.ws.messages.transaction.clbks.share;

				if (el.c)

					el.c.find('.emojionearea-editor').off('pasteImage')

				el = {};

				if (Sortable && Sortable.destroy)
					Sortable.destroy()
			},
			
			init : function(p){

				

				el = {};
				el.c = p.el.find('#' + self.map.id);

				
				el.tgsWrapperMain = el.c.find('.tgsWrapperMain')
				
				el.message = el.c.find('.message');

				el.eMessage = el.c.find('#emjcontainer');
				el.error = el.c.find('.error');		
				

				
				el.urlWrapper = el.c.find('.urlWrapper')
				el.caption = el.c.find('.captionshare');
				el.cpt = el.c.find('.cpt')
				el.images = el.c.find('.imagesWrapper')

				el.changeAddress = el.c.find('.changeAddress')

				el.repostWrapper = el.c.find('.repostWrapper')
				el.postline = el.c.find('.postlineWrapper')


				


				initEvents();

				make();

				//p.noscroll = self.app.actions.scrollBMenu()

				p.clbk(null, p);

				actions.waitActions();

			},

			wnd : {
				close : function(){
					if (essenseData.close){
						essenseData.close()
					}
				},
				class : "smallWnd withoutButtons wndsharepost"
			},

			id : p._id
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
	module.exports = share;
}
else{

	app.modules.share = {};
	app.modules.share.module = share;

}
 /*_____*/ 
var imageGalleryEdit=function(){function a(e){var a,n,i=deep(e,"history"),t=null,r=0,l=!1,p=null,o=null,s=null,c={normal:{name:"Normal"},vintage:{name:"Vintage"},oldBoot:{name:"Old Boot"},clarity:{name:"Clarity"},sunrise:{name:"Sunrise"},crossProcess:{name:"Cross Process"},orangePeel:{name:"Orange Peel"},love:{name:"Love"},jarques:{name:"Jarques"},pinhole:{name:"Pinhole"}},d={},f={back:function(){--r<0&&(r=n.images.length-1),y()},next:function(){++r>=n.images.length&&(r=0),y()},initialValue:function(){n.initialValue&&(r=n.initialValue)},filters:function(){return(l=!l)?(a.c.addClass("filters"),h.filters()):a.c.removeClass("filters"),u.resize(),l},caman:function(e,i){var a="#galleryImage";i&&(a=i),o&&!i?e&&e(o):Caman(a,function(){i||(o=this),e&&e(this)})},crop:function(){return p?(p.destroy(),p=null,!1):(f.caman(function(){var e=a.imagesWrapper.find("#galleryImage"),i=e.parent();t=o,n.crop||(n.crop={}),p=new Cropper(e[0],{aspectRatio:n.crop.aspectRatio||null,autoCropArea:n.crop.autoCropArea||.9,checkOrientation:!1,crop:function(e){var i=o.width,a=o.height,n={x:e.detail.x/i,y:e.detail.y/a,w:e.detail.width/i,h:e.detail.height/a};d.crop=n},ready:function(){i.find(".cropper-container").addClass(n.crop.style||""),i.find(".cropper-crop-box").append('<div class="applyCrop center" action="apply">\t\t\t\t\t\t\t\t\t<span class="fa fa-check" aria-hidden="true"></span>\t\t\t\t\t\t\t\t</div>'),i.find(".applyCrop").on("click",function(){f.apply("crop"),h.savePanel()})}})}),!0)},camanFilter:function(e,i,a){e.revert(!1),"normal"!=i&&e.newLayer(function(){this.opacity(50),this.copyParent(),this.filter[i]()}),e.render(a)},previewFilter:function(e,i){var a=e.attr("filter"),n=e.attr("imageId");Caman("#"+n,function(){f.camanFilter(this,a,function(){e.animate({opacity:1})})}),e.on("click",function(){f.caman(function(){f.camanFilter(o,a,function(){t=o,d.filter=a,h.savePanel(),u.resize()})})})},applyFilters:function(t,e,r,l){"crop"!=e?"filter"==e&&f.caman(function(e){f.camanFilter(e,t,function(){l&&l()})},r):f.caman(function(e){var i=e.canvas.width,a=e.canvas.height,n={x:t.x*i,y:t.y*a,width:t.w*i,height:t.h*a};e.crop(n.width,n.height,n.x,n.y),e.resize({width:n.width,height:n.height}),e.render(function(){e.resetOriginalPixelData(),e.cropped=!1,e.cropCoordinates={x:0,y:0},e.originalHeight=n.height,e.originalWidth=n.width,e.preScaledHeight=n.height,e.preScaledWidth=n.width,e.resized=!1,r||u.resize(),l&&l()})},r)},apply:function(e,i){e&&d[e]&&(f.applyFilters(d[e],e,i),f[e](),a.c.find('[action="'+e+'"]').removeClass("active"))},close:function(){n.success?(topPreloader(20),n.success(n.images,function(){topPreloader(100),P.closeContainer()})):P.closeContainer()},exit:function(){n.apply&&(f.apply("crop"),f.save(!0)),f.close()},cancel:function(){d={},h.savePanel(),h.image({image:s})},save:function(e){f.checkUpdates()&&(s.original=o.toBase64(),d={},e||(h.savePanel(),h.image({image:s})))},checkUpdates:function(){return!!(d.filter&&"normal"!=d.filter||d.crop)}},u={resize:function(){u.bestFit(a.imagesWrapper.find(".image"),t)},bestFit:function(e,i){var a=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=i.naturalWidth||i.width,r=i.naturalHeight||i.height,l=r/t;e.css("padding-top","0px");var o=e.width(),s=e.height(),c=a.width(),d=a.height();c<o&&(o=c),d<s&&(s=d),o<t&&(r=(t=o)*l),s<=r&&(t=(r=s)/l);var f=(s-r)/2;e.css("padding-top",f+"px"),i.canvas?(i.resize({width:t,height:r}),i.render()):(i.width=t,i.height=r,$(i).attr("data-camanwidth",t),$(i).attr("data-camanheight",r),$(i).css("opacity","1")),n.width(t),n.height(r),p&&p.resize({width:t,height:r})},nFormat:function(e){return e<10&&(e="0"+e),e}},m=function(){var e=$(this).attr("action");f[e]()},g=function(){var e=$(this).attr("action"),i=$(this);f[e]()?i.addClass("active"):i.removeClass("active")},h={savePanel:function(){(d.filter&&"normal"!=d.filter||d.crop)&&!n.apply?a.exitPanel.fadeOut(200,function(){a.savePanel.fadeIn(200)}):a.savePanel.fadeOut(200,function(){a.exitPanel.fadeIn(200)})},image:function(i){o=t=null,d={},h.savePanel(),p&&(p.destroy(),p=null,a.editPanel.find('.eitem[action="crop"]').removeClass("active")),a.imageNavigation.find(".number").html(u.nFormat(Number(r)+1)),$(window).off("resize",u.resize),i=i||{},P.shell({name:"image",el:a.images,inner:html,display:"table",animation:!1,data:{data:n,image:i.image}},function(e){e.el.find("img").imagesLoaded(function(e){t=deep(e,"images.0.img"),s=i.image,u.resize(),$(window).on("resize",u.resize),l&&(l=!l,f.filters()),i.clbk&&i.clbk()})})},filters:function(i){(i=i||{}).image||(i.image=n.images[r]),a.filters.html(""),resizeFit(i.image.original,80,80,function(e){P.shell({name:"filters",el:a.filters,data:{data:n,image:e,filters:c}},function(e){e.el.find(".preview").each(function(){f.previewFilter($(this),i.image)});var l=e.el.find(".filtersSwipe");swipedetect(l[0],function(e,i,a,n){var t=Number(l.css("margin-left").replace("px",""))+Number(1.7*i),r=-l.find(".filtersList").width()+l.closest(".filtersWrapperOvf").width();0<t&&(t=0),t<r&&(t=r),l.css("margin-left",t+"px")})})})}},v=function(){},y=function(){h.image({image:n.images[r],clbk:function(){n.apply&&(f.filters(),f.crop())}})},w=function(e){n.edit?P.nav.api.loadRelations({relations:[{src:"js/vendor/caman.full.min.js",f:"js",require:function(){Caman=require("../../js/vendor/caman.full.min.js").Caman}},{src:"js/vendor/cropper.js",f:"js",require:function(){Cropper=require("../../js/vendor/cropper.js")}},{src:"css/cropper.min.css",f:"css"}]},e):e&&e()};return{primary:i,getdata:function(e){e({})},destroy:function(){$(window).off("resize",u.resize),console.log("ASDSADDSA"),a={}},init:function(e){console.log("ASDSADDS122121A"),s=t=o=null,l=!1,d={},n=e.essenseData||{},v(),f.initialValue(),(a={}).c=e.el.find("#"+P.map.id),a.imagesWrapper=e.el.find(".imagesWrapper"),a.images=e.el.find(".images"),a.imageNavigation=e.el.find(".imageNavigation"),a.arrows=a.imageNavigation.find(".arrow"),a.editPanel=a.c.find(".editPanel"),a.savePanel=a.c.find(".panel .savePanel"),a.exitPanel=a.c.find(".panel .exitPanel"),a.filters=a.c.find(".filters"),w(function(){y(),a.arrows.on("click",m),a.editPanel.find(".eitem").on("click",g),a.savePanel.find(".sitem").on("click",g),a.exitPanel.find(".sitem").on("click",g),e.clbk(null,e)})},wnd:{close:function(){n.close&&n.close()},class:"allscreen black withoutButtons imageGalleryEdit"}}}var P=new nModule,n={};return P.run=function(e){var i=P.addEssense(n,a,e);P.init(i,e)},P.stop=function(){_.each(n,function(e){e.destroy()})},P}();"undefined"!=typeof module?module.exports=imageGalleryEdit:(app.modules.imageGalleryEdit={},app.modules.imageGalleryEdit.module=imageGalleryEdit);
 /*_____*/ 
var comments=function(){function t(e){function o(a,t,i){var e=t.el.find(".leaveComment"),s=t.el.find(".postbody");W.process(a.id||"0"),e.emojioneArea({pickerPosition:"top",search:!1,tones:!1,autocomplete:!1,attributes:{spellcheck:!0},filters:{smileys_people:{icon:"yum",title:"Smileys & People",emoji:"grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "}},events:{"emojibtn.click":S.emessage,change:S.emessage,click:S.emessage,keydown:function(e,n){if(n.ctrlKey&&13==n.keyCode){if(s.hasClass("sending"))return;return s.addClass("sending"),W.post(a.id||"0",a.pid,a.aid,a.editid),n.preventDefault(),!1}},keyup:function(e,n){var t=String.fromCharCode(n.keyCode||n.which),i=this.getText();b.test(t)&&W.links(i),n.ctrlKey&&13==n.keyCode||(W.message(a.id||"0",i),j.limits(s,i))},onLoad:function(e,n){(p.init||a.init)&&(t.el.find(".emojionearea-editor").focus(),t.el.addClass("active"),p.init=!1),a.value&&this.setText(a.value),!a.images||a.editid&&a.images.length&&(f[a.editid].images.v=_.clone(a.images),j.images(a.editid,a));i&&i(this,t.el.find(".emojionearea-editor"))}}}),t.el.find(".emojionearea-editor").on("focus",function(){W.process(a.id||"0"),t.el.addClass("active")}),t.el.find(".emojionearea-editor").on("blur",function(){setTimeout(function(){t.el.removeClass("active")},150)}),t.el.find(".postaction").on("click",function(){s.hasClass("sending")||(s.addClass("sending"),W.post(a.id||"0",a.pid,a.aid,a.editid))}),a.id&&t.el.find(".closeEdit").on("click",function(){W.closeEdit(a.id)}),t.el.find(".closeAnswer").on("click",function(){W.removeForm(a.id||"0")})}function n(n){function e(){var e=_.map(C.levels,function(e){return e});e.length?lazyEach({array:e,action:function(n){var e=n.item;L.level(e,function(e){n.success()})},all:{success:function(){n&&n()}}}):n&&n()}c&&!g?e():L.level(null,function(){e()})}var d,m,p,l,t,i,a,r,s=deep(e,"history"),f={},c=!1,u=!1,g=!1,h=!1,v={content:I.app.localization.e("e13029"),messagelength:I.app.localization.e("e13030"),images:I.app.localization.e("maximages")},w={},k={},y=null,C={},b=/[,.!?;:() \n\r]/g,x=function(e,n,t,i){if(n&&n.txid==m){var a=d.c.find("#"+n.id),s=a.find(">div.commentPaddingWrapper>div.commentWrapper>div.commentBody>div.cbodyWrapper");i==I.app.platform.sdk.address.pnet().address&&(a.addClass("rated"),0<t&&s.find(".scoreUp").addClass("ratedScore"),t<0&&s.find(".scoreDown").addClass("ratedScore")),n.scoreUp&&s.find(".scoreUp .commentScore").html(compressedNumber(n.scoreUp,1)),n.scoreDown&&s.find(".scoreDown .commentScore").html(compressedNumber(n.scoreDown,1))}},z=function(e,n,t,i,a,s,o,l){if(t==m&&(d.c.find(".sending").removeClass("sending"),!e)){D.save(),d.c.find(".emojionearea-editor").blur(),d.c.find(".att").html("");var r={comments:[n]};if(u&&(p.lastComment=I.app.platform.sdk.comments.toLastComment(n)),delete f[o],"0"==o&&(r.class="firstcomment"),"0"==o)k[o]&&k[o].setText(""),d.c.find(".post .newcommentimages").html("");else{var c=d.c.find("#"+o);s?(c.find(".edit").html(""),n.timeUpd=n.timeUpd.addMinutes(1),n.parentid||(r.class="firstcomment"),delete k[o],delete w[o],c.removeClass("editing"),r.inner=replaceWith,r.el=c):(c.find(".answer").html(""),c.find(".repliescount").html(Number(c.find(".repliescount").html()||"0")+1),c.find(".replies").removeClass("hidden"),r.el=d.c.find("#"+o+" .answers"),delete k[o])}r.newcomments="newcomments",j.list(r,function(){l&&W.tocomment(n.id)}),!s&&p.send&&p.send(n),s||(p.comments&&p.comments++,W.showhideLabel())}},W={myscores:function(){_.each(w,function(e,n){var t=deep(I.app.platform.sdk,"comments.storage.all."+n);t&&x(null,t,Number(t.myScore),I.app.platform.sdk.address.pnet().address)})},stateAction:function(n){I.app.user.isState(function(e){e?n():I.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{fast:!0,loginText:I.app.localization.e("llogin"),successHref:"_this",signInClbk:function(){retry(function(){return!h},function(){n&&n()})}}})})},sharesocial:function(e){var n,t=findAndReplaceLink(filterXSS(e.message,{whiteList:[],stripIgnoreTag:!0}),!0),i=emojione.toImage(t);n=nl2br(trimrn(i));var a=p.hr+"&commentid="+e.id;e.parentid&&"0"!=e.parentid&&(a=a+"&parentid="+e.parentid),I.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:a,caption:I.app.localization.e("e13031"),image:deep(app,"platform.sdk.usersl.storage."+e.address+".image"),title:deep(app,"platform.sdk.usersl.storage."+e.address+".name"),text:n}})},editImage:function(t,e,i){var a=f[t],s=_.map(a.images.v,function(e,n){return{original:e,index:n}});focusfixed=!0,I.nav.api.load({open:!0,id:"imageGalleryEdit",inWnd:!0,essenseData:{edit:!0,initialValue:e,images:s,close:function(){},success:function(e,n){_.each(a.images.v,function(e,n){var t=_.find(s,function(e){if(e.index==n)return!0});t&&(a.images.v[n]=t.original)}),j.images(t,i,n)}}})},removeImage:function(e,t,n){f[e].images.v.splice(t,1)[0];n.el.find(".imageContainer").each(function(){var e=$(this),n=e.attr("value");t<n&&e.attr("value",n-1),n==t&&e.remove()}),n.el.find(".imagesEmbWr").isotope()},embedimages:function(i,n){i=i||"0",W.process(i),k[i]&&(k[i].___inited=!0);var e=f[i].export(!0);I.nav.api.load({open:!0,id:"embeding",inWnd:!0,essenseData:{type:"images",storage:e,on:{added:function(e){var t=!0;_.isArray(e)||(e=[e]),_.each(e,function(e,n){t=f[i].images.set(e)}),!t&&v[type]&&sitemessage(v[type]),j.images(i,n)}}},clbk:function(e,n){y=n}})},removeForm:function(e){delete k[e],d.c.find("#"+e+" .answer").html(""),d.c.find("#"+e+" .edit").html("")},post:function(e,n,t,i){var a=f[e=e||"0"];if(a){var s=a.validation();if(s)d.c.find(".sending").removeClass("sending"),sitemessage(v[s]);else{if(a.loading)return;a.loading=!0,a.uploadImages(I.app,function(){W.send(a,function(e,n){a.loading=!1,e||successCheck()},n,t,i,e)})}}else d.c.find(".sending").removeClass("sending"),sitemessage(v.content)},send:function(e,t,n,i,a,s){I.app.platform.sdk.comments.send(m,e,n,i,function(e,n){d.c&&d.c.find(".sending").removeClass("sending"),e?(I.app.platform.errorHandler(e,!0),t&&t(e,null)):t&&t(null,n)},a,s)},links:function(e,n){var t=f[e=e||"0"];if(t&&!t.url.v){var i=null,a=n.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);a&&0<a.length&&(i=a[0]),i&&t.url.set(i)}},process:function(e){f[e=e||"0"]||(f[e]=new Comment(m))},message:function(e,n){f[e=e||"0"]&&f[e].message.set(n),D.save()},emessage:function(e,n){var t=n.getText();W.links(e,t),W.message(e,t),k[e]&&(k[e].___inited=!0)},fastreply:function(n){n&&W.replies(n.parentid||n.answerid,!0,function(){if(n.noaction){W.tocomment(n.answerid);var e=d.c.find("#"+n.answerid);e.addClass("newcommentsn"),setTimeout(function(){e.removeClass("newcommentsn")},2500)}else W.reply(n.parentid||n.answerid,n.answerid)})},reply:function(o,l){W.stateAction(function(){var e=d.c.find("#"+o).find(".answer");j.post(function(e,n){var t="0";l!=o&&(t=o);var i=I.app.platform.sdk.comments.address(m,l,t)||deep(p,"lastComment.address"),a=deep(I.app,"platform.sdk.usersl.storage."+i+".name")||i,s="@"+a+",  ";i!=I.app.platform.sdk.address.pnet().address&&a||(s=""),e.setText(s),k[o]=e,n.focus(),n.closest(".answer").addClass("active"),s.length&&ecaretPosition(n,0,s.length)},{placeholder:"Send Reply",el:e,answer:"answer",pid:o,aid:l,id:o})})},hideallReplies:function(){_.each(deep(I,"app.platform.sdk.comments.storage."+m+".0"),function(e,n){W.replies(n,!1)}),p.lastComment&&W.replies(p.lastComment.id,!1)},replies:function(n,e,t,i){if(i=i||{},"0"!=n){var a={};a.in=i.in,a.el=d.c.find("#"+n+" .answers");var s=d.c.find("#"+n);void 0===e&&(s.hasClass("showedreplies")?e=!1:(e=!0,s.find(".repliesloaderWrapper").removeClass("hidden"))),e?L.level(n,function(e){s.find(".repliesloaderWrapper").addClass("hidden"),a.comments=I.app.platform.sdk.comments.storage[m][n],s.addClass("showedreplies"),j.list(a,function(){l||j.caption(),t&&t()},n)}):(delete C.levels[n],_.each(I.app.platform.sdk.comments.storage[m][n],function(e){delete w[e.id]}),s.removeClass("showedreplies"),W.removeForm(n),a.el.html(""))}else t&&t()},getid:function(e){if(e.attr("answer")){(n=e.closest(".comment")).attr("id");return e.closest(".firstcomment").attr("id")}if(e.attr("edit")){var n;(n=e.closest(".comment")).attr("aid"),n.attr("pid");return n.attr("id")}return"0"},tocomment:function(e){_scrollTo(d.c.find("#"+e),t)},closeEdit:function(e){var n=d.c.find("#"+e);n.removeClass("editing"),n.find(".commentBody").removeClass("editing"),W.removeForm(e)},delete:function(e,t){var n=e.delete();I.app.platform.sdk.comments.delete(m,n,function(e,n){e?(I.app.platform.errorHandler(e,!0),t&&t(e,null)):t&&t(null,n)})},update:function(e){var n={},t=null;t=e?d.c.find("#"+e+" .answers"):(n.class="firstcomment",d.c.find(".list")),L.level(e,function(e){t.html(""),n.comments=e,j.list(n)})},hiddenCounts:function(e){0<e?d.showall.find(".ccounts").html("("+e+")"):d.showall.find(".ccounts").html()},showall:function(){g=!0,d.c.addClass("showedall"),W.showhideLabel(),p.showall=!0,u?(d.c.removeClass("listpreview"),d.c.find(".loaderWrapper").removeClass("hidden"),L.level(null,function(e,n){if(n)return I.app.platform.errorHandler(n,!0),d.c.addClass("listpreview"),d.c.find(".loaderWrapper").addClass("hidden"),g=!1,d.c.removeClass("showedall"),void W.showhideLabel();u=!1,j.caption(),w={};var t={};t.comments=I.app.platform.sdk.comments.storage[m][0],t.class="firstcomment",t.inner=html,j.list(t,function(){d.c.find(".loaderWrapper").addClass("hidden")})})):j.caption()},showhideLabel:function(){if(d.showall)if(g)d.showall.addClass("hidden");else{var e=deep(I.app.platform,"sdk.node.shares.storage.trx."+m+".comments")||0,n=deep(I.app.platform,"sdk.node.shares.storage.trx."+m+".lastComment.children")||0;u?1<e-n?(d.showall.removeClass("hidden"),W.hiddenCounts(e-n-1)):d.showall.addClass("hidden"):5<e?(d.showall.removeClass("hidden"),W.hiddenCounts(e-5)):d.showall.addClass("hidden")}},openGallery:function(e,n,t){var i=_.map(e.images,function(e){return{src:e}}),a=findIndex(i,function(e){if(e.src==n)return!0});I.app.nav.api.load({open:!0,href:"imagegallery?s="+m+"&num="+(a||0)+"&com="+e.id,inWnd:!0,history:!0,essenseData:{initialValue:n,idName:"src",images:i,gid:m+e.id},clbk:function(){t&&t()}})},upvoteComment:function(t,i){W.stateAction(function(){var e=deep(I.app.platform.sdk,"comments.storage.all."+i);if(e&&e.address!=I.app.platform.sdk.address.pnet().address){var n=e.upvote(t);I.app.platform.sdk.comments.upvote(n,function(e,n){e&&I.app.platform.errorHandler(e,!0)})}})}},S={upvoteComment:function(){if(!$(this).closest(".comment").hasClass("rated")){var e=0;e="scoreUp"==$(this).attr("score")?1:-1;var n=$(this).closest(".comment").attr("id"),t=$(this).closest(".comment").attr("pid");W.upvoteComment(e,n,t)}},openGallery:function(){var e=$(this),n=e.closest(".comment"),t=n.attr("id"),i=n.attr("pid"),a=I.app.platform.sdk.comments.find(m,t,i);u&&p.lastComment&&(a=I.app.platform.sdk.comments.ini([p.lastComment])[0]),W.openGallery(a,e.attr("i"))},replyandreplies:function(){var e=$(this).closest(".firstcomment").attr("id");W.replies(e,!0);var n=$(this).closest(".comment"),t=(e=$(this).closest(".firstcomment").attr("id"),n.attr("id"));W.reply(e,t)},replies:function(){var e=$(this).closest(".firstcomment").attr("id");W.replies(e)},emessage:function(e,n){var t=this.getText(),i=W.getid(e.closest(".postbody"));W.emessage(i,this),j.limits(e.closest(".postbody"),t),console.log("SAD")},message:function(){var e=$(this).val(),n=W.getid(editor.closest(".postbody"));W.links(n,e),W.message(n,e)},reply:function(){var e=$(this).closest(".comment"),n=$(this).closest(".firstcomment").attr("id"),t=e.attr("id");W.reply(n,t)},tocomment:function(){var e=$(this).attr("comment");W.tocomment(e)},metmenu:function(){var t=$(this),e=t.closest(".comment"),i=t.closest(".commentBody"),n=e.attr("id"),a=e.attr("pid"),s=I.app.platform.sdk.comments.find(m,n,a),o={address:I.app.user.address.value,caddress:I.app.platform.sdk.comments.address(m,n,a)};u&&p.lastComment&&!a&&(s=I.app.platform.sdk.comments.ini([p.lastComment])[0],o.caddress=s.address),I.fastTemplate("metmenu",function(e,n){I.app.platform.api.tooltip(t,function(){return n(o)},function(e){e.find(".edit").on("click",function(){j.edit(i,s),t.tooltipster("hide")}),e.find(".remove").on("click",function(){dialog({html:I.app.localization.e("e13032"),success:function(){W.delete(s,function(e){if(!e){var n=d.c.find("#"+s.id);n.addClass("deleted"),d.c.find("#"+s.id+" >div.commentPaddingWrapper .commentmessage div").html("<div>"+I.app.localization.e("e13033")+"</div>"),n.find(".panel").remove(),n.find(".commentimages").remove(),n.find(".reply").remove()}})},btn1text:I.app.localization.e("e13034"),btn2text:I.app.localization.e("e13035")}),t.tooltipster("hide")}),e.find(".socialshare").on("click",function(){W.sharesocial(s),t.tooltipster("hide")})},{theme:"zindex lighttooltip"})},o)}},j={images:function(n,i,a){var s=f[n];I.shell({name:"images",turi:"embeding",inner:html,el:i.el.find(".newcommentimages"),data:{images:_.map(s.images.v||[],function(e,n){return{src:e,id:n}})}},function(t){t.el.find(".remove").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");W.removeImage(n,e,i)}),t.el.find(".edit").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");W.editImage(n,e,i)}),t.el.find(".image").on("click",function(){var e=$(this).attr("i");if(e){var n=_.map(s.images,function(e){return{src:e}});I.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:{initialValue:e,idName:"src",images:n}})}}),t.el.find(".image").imagesLoaded({background:!0},function(e){if(isMobile())a&&a(),i.el.find(".newcommentimages").addClass("active");else{var n=t.el.find(".imagesEmbWr");n.isotope({layoutMode:"packery",itemSelector:".imageContainer",packery:{gutter:10},initLayout:!1}),n.on("arrangeComplete",function(){a&&a(),i.el.find(".newcommentimages").addClass("active")}),n.isotope()}})})},limits:function(e,n){var t=1e3-n.length;e.find(".limits").removeClass("bad"),t<500?0<t?e.find(".limits").addClass("active").html(t+" "+pluralform(t,["Character","Characters"])+" Available"):e.find(".limits").addClass("active").addClass("bad").html("You are "+-t+" characters over"):e.find(".limits").removeClass("active")},cpreview:function(e){e=e||p.caption,d.caption&&(d.caption.find(".captionPreview").html(e),bgImages(d.caption.find(".captionPreview")))},caption:function(n){p.caption&&I.shell({name:"caption",el:d.caption,data:{ed:p}},function(e){j.cpreview(),l=new Caption({container:d.c,caption:d.c.find(".captionfwrapper"),offset:[i,-100],removeSpacer:!0,iniHeight:!0,_in:t}).init(),e.el.find(".close .cact").on("click",function(){p.close&&p.close()}),e.el.find(".top .cact").on("click",function(){_scrollToTop(d.c.find(".list"),t,void 0,-150)}),e.el.find(".bottom .cact").on("click",function(){_scrollToBottom(d.c.find(".list"),t,void 0,-150)}),n&&n()})},edit:function(e,n){e.addClass("editing");var t={value:n.message,images:n.images,init:!0,edit:"edit",el:e.find(">div.edit"),pid:n.parentid,aid:n.answerid,id:n.id,editid:n.id};j.post(function(e,n){},t)},post:function(a,s){I.app.user.isState(function(i){(s=s||{}).el||(s.el=d.post);var e=c&&!s.answer&&!s.editid;I.shell({name:"post",el:s.el,data:{placeholder:s.placeholder||"",answer:s.answer||"",edit:s.edit||"",preview:e,mestate:r}},function(n){function t(t){if(c){c=!1,s.init=!0,d.c.removeClass("preview");o(s,n,function(e,n){a(e,n),t&&t(e,n)})}}if(n.el.find(".embedimages").off("click").on("click",function(){var e=W.getid(n.el.find(".postbody"));i?(W.embedimages(e,s),s.answer||s.editid||t()):W.stateAction(function(){})}),e)return n.el.find("textarea").on("click",function(){$(this).blur(),I.app.user.isState(function(e){e?t():W.stateAction(function(){})})}),void n.el.find(".embedEmojiPrivew").on("click",function(){i?t(function(e,n){e.showPicker()}):W.stateAction(function(){})});o(s,n,a)})})},commentimages:function(e,n){if(d.c){var t=d.c.find("#"+e.id),i=t.find(".commentimages .image"),r=t.find(".commentimages");if(!r.hasClass("active")&&i.length&&r.length){var c=t.height();i.imagesLoaded({background:!0},function(l){_.each(l.images,function(e,n){var t=e.img,i=$(l.elements[n]).closest(".imagesWrapper"),a="",s=i.width();i.height();if(t.width>t.height&&!isMobile()){a="w2";var o=s*(t.width/t.height);o>r.width()&&(o=r.width(),c=o*(t.height/t.width),i.height(c)),i.width(o)}(t.height>t.width||isMobile())&&(a="h2",i.height(s*(t.height/t.width))),a&&i.addClass(a)});r.isotope({layoutMode:"packery",itemSelector:".imagesWrapper",packery:{gutter:10},initLayout:!1}),r.on("arrangeComplete",function(){r.addClass("active"),i.addClass("active"),p.renderClbk&&p.renderClbk(),n&&n()}),r.isotope()})}else n&&n()}},list:function(n,t,e){(n=n||{}).comments=_.filter(n.comments||[],function(e){if(!w[e.id])return w[e.id]=!0});var i=append;p.fromtop&&!n.el?(n.comments=_.sortBy(n.comments,function(e){return-e.time}),i=prepend):n.comments=_.sortBy(n.comments,function(e){return e.time}),e&&(C.levels[e]=e),n.in&&(i=n.in),n.el||(n.el=d.list),I.shell({name:"list",el:n.el||d.list,inner:n.inner||i,data:{comments:n.comments||[],_class:n.class||"",newcomments:n.newcomments||"",replaceName:function(e,n){return'<span class="tocomment" comment="'+n.comment+'">'+e+"</span>"},replaceNameNoComment:function(e,n){return'<span class="tocommentno">'+e+"</span>"},mestate:r},additionalActions:function(){p.additionalActions()}},function(e){d.list.find(".reply").off("click").on("click",S.replyandreplies),d.list.find(".replies").off("click").on("click",S.replies),d.list.find(".panel").off("click").on("click",S.metmenu),d.list.find(".tocomment").off("click").on("click",S.tocomment),d.list.find(".imageCommentOpen").off("click").on("click",S.openGallery),setTimeout(function(){d.list&&d.list.find(".newcomments").removeClass("newcomments")},600),bgImages(d.list),lazyEach({array:n.comments,action:function(e){j.commentimages(e.item,e.success)}}),p.renderClbk&&p.renderClbk(),t&&t()})}},A=function(n){var t={};j.post(function(e){k[0]=e}),L.preview(function(e){t.comments=e,t.class="firstcomment",W.showhideLabel(),d.list.html(""),j.list(t,function(){n&&n()})})},T=function(n){var t={};L.level(null,function(e){t.comments=I.app.platform.sdk.comments.storage[m][0],t.class="firstcomment",W.showhideLabel(),d.list.html(""),j.list(t,function(){d.c.find(".loaderWrapper").addClass("hidden"),j.post(function(e){if(k[0]=e,p.reply)W.fastreply(p.reply);else{var n=parameters(),t={};n.commentid&&(t.answerid=n.commentid,t.parentid=n.parentid||"",t.noaction=!0,W.fastreply(t))}}),n&&n()})})},L={preview:function(e){var n=[];p.lastComment&&(n=I.app.platform.sdk.comments.ini([p.lastComment])),I.sdk.comments.users(n,function(){e&&e(n)})},level:function(e,t){I.app.platform.sdk.comments.get(m,e||"",function(e,n){t&&t(e,n)})}},D={save:function(){},load:function(){var e=I.app.settings.get(I.map.id,m);e&&f[0].import(e)}};return{primary:s,getdata:function(n,e){if(a=e.settings.eid,w={},f={},C={reply:null,levels:{}},p=e.settings.essenseData||{},c=p.preview||!1,u=c,g=!1,m=p.txid||null,f[0]=new Comment(m),m){var t={};t.ed=p,I.app.platform.sdk.ustate.me(function(e){r=e,n(t)})}},authclbk:function(){d&&d.c&&(h=!0,I.app.platform.sdk.ustate.me(function(e){r=e,n(function(){W.myscores(),h=!1}),j.post(function(e){k[0]=e})}))},destroy:function(){delete I.app.platform.sdk.comments.sendclbks[a],delete I.app.platform.ws.messages.comment.clbks[a],delete I.app.platform.sdk.comments.upvoteClbks[a],delete I.app.platform.ws.messages.cScore.clbks[a],h=!1,y&&y.destroy(),l&&l.destroy(),d={}},init:function(e){(d={}).c=e.el.find("#"+I.map.id),d.post=d.c.find(".post"),d.list=d.c.find(".list"),d.caption=d.c.find(".captionCnt"),d.showall=d.c.find(".showall"),t=d.c.closest(".wndcontent"),i=t.length?0:(t=null,65),c?(d.c.find(".loaderWrapper").addClass("hidden"),d.c.addClass("preview"),d.c.addClass("listpreview"),A()):(T(),p.showall&&W.showall()),d.c.find(".showall").on("click",function(){W.showall()}),I.app.platform.sdk.comments.sendclbks[a]=z,I.app.platform.sdk.comments.upvoteClbks[a]=x,I.app.platform.ws.messages.comment.clbks[a]=function(e){if(e.posttxid==m){var n={};if(n.comments=[e.comment],e.parentid){var t=d.c.find("#"+e.parentid);if(n.el=t.find(".answers"),t.find(".repliescount").html(Number(t.find(".repliescount").html()||"0")+1),t.find(".replies").removeClass("hidden"),!t.hasClass("showedreplies"))return}else n.el=d.c.find(".list"),n.class="firstcomment";j.list(n)}},I.app.platform.ws.messages.cScore.clbks[a]=function(e){e.comment.txid==m&&x(null,e.comment,e.upvoteVal||e.value,e.addrFrom)},d.c.on("click",".upvoteComment",S.upvoteComment),e.clbk(null,e)},freeze:function(){l&&l.destroy()},hideall:function(e){g=!1,void 0!==e&&(u=e||!1),u?(d.c.addClass("listpreview"),l&&l.destroy(),l=null):d.c.removeClass("listpreview"),d.c.removeClass("showedall"),W.hideallReplies(),W.showhideLabel()},changein:function(e,n){e?(t=e,i=n,l&&(l.addscroll=!0,l.setOffset([i,0]),l.setIn(t))):(t=d.c.closest(".wndcontent"),i=t.length?0:(t=null,65),l&&(l.addscroll=!!t,l.setOffset([i,0]),l.setIn(t)))}}}var I=new nModule,i={};return I.run=function(e){var n=I.addEssense(i,t,e);I.init(n,e)},I.authclbk=function(){_.each(i,function(e){e.authclbk()})},I.stop=function(){_.each(i,function(e){e.destroy()})},I}();"undefined"!=typeof module?module.exports=comments:(app.modules.comments={},app.modules.comments.module=comments);
 /*_____*/ 
var send=function(){function a(n){function e(){a.c.find(".send").on("click",s.send),a.am.on("change",function(){var n=$(this).val();t.amount=n}),function(){var n={alias:"numeric",groupSeparator:",",radixPoint:".",digits:6,digitsOptional:!1,autoGroup:!0,allowMinus:!1};0<n.digits&&(n.placeholder="0.000000"),a.am.inputmask(n),parameters().setammount||a.am.blur()}()}var a,t,i=deep(n,"history"),s={stateAction:function(e,a){d.app.user.isState(function(n){n?a():d.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{loginText:d.app.localization.e("llogin"),successHref:e,signInClbk:function(){a&&a()}}})})},send:function(){s.stateAction("_this",function(){d.nav.api.load({open:!0,history:!0,href:"userpage?id=wallet&action=send&address="+t.address+"&amount="+t.amount})})}},o=function(){};return{primary:i,getdata:function(n){var e=parameters();t={},e.address&&bitcoin.address.fromBase58Check(e.address)&&(t.address=e.address),e.amount&&(t.amount=Number(e.amount)),e.label&&(t.label=clearScripts(donottrustLink(findAndReplaceLink(e.label,!0)))),e.message&&(t.message=clearScripts(donottrustLink(findAndReplaceLink(hexDecode(e.message,!0))))),t.amount&&t.address&&t.message?n(t):d.nav.api.load({open:!0,href:"page404",history:!0})},destroy:function(){a={}},init:function(n){o(),(a={}).c=n.el.find("#"+d.map.id),a.am=a.c.find(".amredit"),e(),n.clbk(null,n)}}}var d=new nModule,t={};return d.run=function(n){var e=d.addEssense(t,a,n);d.init(e,n)},d.stop=function(){_.each(t,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=send:(app.modules.send={},app.modules.send.module=send);
 /*_____*/ 
var s=function(){function t(s){var n,a,o,r,i,e=deep(s,"history"),t=0,u=10,l="list",c={clickNext:function(){h("users",t+=u,30),c.displayArrows()},clickArrow:function(s){"left"==s&&(t-=u)<0&&(t=0),"right"==s&&((t+=u)>=o.users.count&&(t=o.users.count-1),h("users",t,u)),c.slideCarousel()},displayArrows:function(){0<t?c.displayArrow("left",!0):c.displayArrow("left",!1),t+u<o.users.count?(c.displayArrow("right",!0),c.displayNext(!0)):(c.displayArrow("right",!1),c.displayNext(!1))},displayNext:function(s){s?n.unext.addClass("active"):n.unext.removeClass("active")},displayArrow:function(s,e){var t=n.ea;s&&(t=n["u"+s]),e?t.addClass("active"):t.removeClass("active")},slideCarousel:function(){var s=n.c.find(".user").width(),e=t*s;n.userslist.css("margin-left","-"+e+"px"),c.displayArrows()},applyCarousel:function(){if("list"==l){var s=n.c.find(".user").width(),e=n.c.find(".userslistwrapper").width();u=Math.min(Number((e/s).toFixed(0)),10),n.c.find(".user").width((e/u).toFixed(0)+"px"),n.userslist.width((o.users.data.length*(e/u)).toFixed(0)+1),c.slideCarousel()}else n.userslist.css("margin-left","0px"),n.userslist.css("width","auto"),n.c.find(".user").css("width","auto")},changeUsersView:function(){"list"==l?l="full":(l="list",t=0),n.users.attr("view",l),c.applyCarousel()}},d=function(){var s=$(this).attr("arrow");c.clickArrow(s)},p=function(){c.clickNext()},f={users:function(s,e){v.shell({name:"userslist",el:n.users.find(".userslist"),data:{users:s},inner:append,bgImages:{clbk:function(s){$(s.elements[0]).addClass("active")}}},function(s){"list"==l&&c.applyCarousel(),e&&e(s)})},posts:function(){var s=!1;v.nav.api.load({open:!0,id:"lenta",el:n.lenta,animation:!1,mid:"search",essenseData:{search:!0,hr:"index?",searchValue:a,loader:function(t){function e(s){var e=v.app.platform.sdk.node.shares.transform(s);t&&t(e,null,{count:10})}s?h("posts",o.posts.data.length,10,function(s){e(s)}):(s=!0,e(o.posts.data))}},clbk:function(s,e){i=e}})}},h=function(e,s,t,n){var a=o[e].data.length,r=o[e].count;if(!(s+t<=a)){if(s<a){var i=a-s;s=a,t-=i}r<s+t&&(t=r-s),t<=0||m[e](function(s){n?n(s):f[e](s)},s,t)}},m={users:function(e,s,t){v.app.platform.sdk.search.get(a,"users",s,t,r,function(s){e(s.data)})},posts:function(e,s,t){v.app.platform.sdk.search.get(a,"posts",s,t,r,function(s){e(s.data)})}},w=function(){};return{primary:e,getdata:function(t){var n={};i=null,a=(parameters().ss||"").replace("tag:","#");var s=deep(v,"app.modules.menu.module.showsearch");s&&s(a),v.app.platform.sdk.search.clear(),v.app.platform.sdk.search.get(a,"all",0,10,null,function(s,e){r=e,o=s,n.result=s,n.value=a,t(n)})},destroy:function(s){if(s!=v.app.nav.current.href){var e=deep(v,"app.modules.menu.module.closesearch");e&&e()}i&&i.destroy(),i=null,n={}},init:function(s){t=0,u=10,w(),(n={}).c=s.el.find("#"+v.map.id),n.users=n.c.find(".users"),n.userslist=n.c.find(".userslist"),n.posts=n.c.find(".posts"),n.uleft=n.c.find(".uleft"),n.uright=n.c.find(".uright"),n.ua=n.c.find(".arrow"),n.showmore=n.c.find(".showmore"),n.unext=n.c.find(".nextpage"),n.lenta=n.c.find(".lentasearch"),n.ua.on("click",d),n.showmore.on("click",c.changeUsersView),n.userslist.swipe({swipe:function(s,e,t,n,a,r){console.log(e,t)}}),n.unext.on("click",p),deep(o,"users.data.length")&&f.users(o.users.data),deep(o,"posts.data.length")&&f.posts(),s.clbk(null,s)}}}var v=new nModule,n={};return v.run=function(s){var e=v.addEssense(n,t,s);v.init(e,s)},v.stop=function(e){_.each(n,function(s){s.destroy(e)})},v}();"undefined"!=typeof module?module.exports=s:(app.modules.s={},app.modules.s.module=s);
 /*_____*/ 
var imagegallery=function(){function i(e){var n,t,a,i=deep(e,"history"),r=null,o=0,l={back:function(){1<t.images.length&&(l.prepareImages(),--o<0&&(o=t.images.length-1),d())},next:function(){1<t.images.length&&(l.prepareImages(),++o>=t.images.length&&(o=0),d())},initialValue:function(){l.prepareImages(),t.initialValue&&(o=findIndex(t.images,function(e){var a="name";if(t.idName&&(a=t.idName),e[a]==t.initialValue)return!0}))},prepareImages:function(){t.getImages&&(t.images=t.getImages())},prepareImage:function(e,a){t.getImage?t.getImage(e,function(e){a&&a(e)}):a&&a(e)}},s={resize:function(){s.bestFit(n.imagesWrapper.find(".image"),r)},bestFit:function(e,a){var i=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=a.naturalWidth||a.width,r=a.naturalHeight||a.height,o=r/t;e.css("padding-top","0px");var l=e.width(),s=e.height(),c=i.width(),g=i.height();c<l&&(l=c),g<s&&(s=g),l<t&&(r=(t=l)*o),s<=r&&(t=(r=s)/o);var m=(s-r)/2;e.css("padding-top",m+"px"),a.width=t,a.height=r,$(a).attr("data-camanwidth",t),$(a).attr("data-camanheight",r),$(a).animate({opacity:1}),n.width(t),n.height(r)},nFormat:function(e){return e<10&&(e="0"+e),e}},c=function(){if(!a){var e=$(this).attr("action");return l[e](),!1}},g=function(e){a||e.pageY<80||(action="next",e.pageX<$(window).width()/2&&(action="back"),l[action]())},m=function(e){n.imageNavigation.find(".number").html(s.nFormat(o+1)),$(window).off("resize",s.resize),e=e||{},p.shell({name:"image",el:n.images,inner:html,display:"table",data:{data:t,image:e.image}},function(e){e.el.find("img").imagesLoaded(function(e){n.c.removeClass("loading"),a=!1,(r=deep(e,"images.0.img"))&&(s.resize(),$(window).on("resize",s.resize))})})},u=function(){},d=function(){n.c.addClass("loading"),a=!0;var e=t.images[o];p.app.nav.api.history.addParameters({num:o.toString()}),l.prepareImage(e,function(e){m({image:e})})};return{primary:i,parametersHandler:function(){var e=parameters().num;void 0!==e&&(o=Number(e),l.prepareImages(),d())},getdata:function(e){e({})},destroy:function(){r=null,$(window).off("resize",s.resize),a=!1,n={}},clearparameters:["i","num","s","com"],init:function(e){r=null,a=!1,t=e.essenseData||{},u(),l.initialValue(),(n={}).c=e.el.find("#"+p.map.id),n.imagesWrapper=e.el.find(".imagesWrapper"),n.images=e.el.find(".images"),n.imageNavigation=e.el.find(".imageNavigation"),n.arrows=n.imageNavigation.find(".arrow"),d(),function(){n.arrows.on("click",c),n.c.on("click",g);var i=n.c.find(".imagesTableWrapper").closest(".wnd"),e={up:{trueshold:150,mintrueshold:50,cancellable:!0,positionclbk:function(e){var a=(150-Math.abs(e))/150;0<a&&i.css("opacity",a)},clbk:function(){p.closeContainer()}}};1<t.images.length&&(e.left={trueshold:100,mintrueshold:50,cancellable:!0,restrict:!0,positionclbk:function(e){Math.abs(e)},clbk:function(){console.log("SSS2"),l.next(),setTimeout(a.renew,200)}},e.right={trueshold:100,mintrueshold:50,cancellable:!0,restrict:!0,positionclbk:function(e){Math.abs(e)},clbk:function(){console.log("SSS"),l.back(),setTimeout(a.renew,200)}});var a=new SwipeParallax({el:n.c.find(".imagesTableWrapper"),directions:e}).init()}(),e.clbk(null,e)},wnd:{class:"allscreen black withoutButtons imageGallery"}}}var p=new nModule,n={};return p.run=function(e){var a=p.addEssense(n,i,e);p.init(a,e)},p.stop=function(){_.each(n,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=imagegallery:(app.modules.imagegallery={},app.modules.imagegallery.module=imagegallery);
 /*_____*/ 
var aboutus=function(){function o(n){var u=deep(n,"history"),o=function(){};return{primary:u,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}}var t=new nModule,e={};return t.run=function(n){var u=t.addEssense(e,o,n);t.init(u,n)},t.stop=function(){_.each(e,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=aboutus:(app.modules.aboutus={},app.modules.aboutus.module=aboutus);
 /*_____*/ 
var menu=function(){function a(){function e(){l&&l.placeholder(u.app.localization.e("e13139")),r=null}var c,n=null,t=null,a=null,r=null,l=null,o=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),format:{right:!0},_onChange:function(e){var n=app.localization.findByName(e);n&&n.key!=app.localization.key&&app.localization.set(n.key)}}),s={autoUpdate:function(){u.app.user.isState(function(e){})},elswidth:function(){c.c.find(".autowidth.active").each(function(){s.setWidth($(this))})},setWidth:function(e){if(!isMobile()&&e.offset()){var n=e.offset().left,a=e.width(),t=n-(c.c.width()-n-a);e.width(a+t)}},ah:function(e,n){0<n?e.addClass("amountHave"):e.removeClass("amountHave"),e.find(".amount").html(n)},sitenameToNav:function(){i.navinit.el&&(a=slowMade(function(){var e=u.app.nav.current.href;if(("index"==e||"author"==e)&&45<$(window).scrollTop()){c.nav.addClass("active"),c.c.addClass("menupanelactive"),c.nav.find(".pcenterLabel").removeClass("active");var n=parameters(u.app.nav.current.completeHref,!0).r||"empty";"index"==e&&c.nav.find('.pcenterLabel[r="'+n+'"]').addClass("active")}else c.c.removeClass("menupanelactive"),c.nav.removeClass("active");s.elswidth()},a,10))}},i={navinit:{init:function(e){isTablet()||($(window).on("scroll",s.sitenameToNav),u.app.nav.clbks.history.menu=function(e){s.sitenameToNav()})},destroy:function(){$(window).off("scroll",s.sitenameToNav),delete u.app.nav.clbks.history.menu}},sitename:{click:function(){u.app.user.isState(function(e){if("index"!=u.app.nav.get.pathname()){var n=localStorage.lentakey||"index";parameters().r==n&&(n="index"),"index"!=n&&(n="index?r="+n),e||(n="index"),u.nav.api.go({href:n,history:!0,open:!0,handler:!0})}})}},activate:{click:function(){dialog({header:u.app.localization.e("id167"),html:u.app.localization.e("id168"),class:"one",btn1text:u.app.localization.e("id169"),success:function(){u.app.platform.sdk.user.activateWithDialogs(function(e){})}})}},keyexport:{click:function(){u.app.platform.ui.showmykey()},init:function(a){u.app.platform.sdk.registrations.clbks.menu=function(){if(u.sdk.address.pnet()){var e=u.sdk.address.pnet().address,n=u.app.platform.sdk.registrations.storage[e];if(n&&n<=4)return}a.closest(".keyexportWrapper").remove(),delete u.app.platform.sdk.registrations.clbks.menu}}},notifications:{init:function(n){function a(){return _.filter(u.app.platform.sdk.notifications.storage.notifications,function(e){if(!e.seen)return!0})}var t=null;"undefined"!=typeof cordova&&(t=deep(cordova,"plugins.notification.badge")),u.app.platform.sdk.notifications.init(function(){var e=a().length;s.ah(n,e),t&&t.set(e),u.app.platform.api.electron.notifications(e,"notifications"),isMobile()||u.nav.api.load({open:!0,id:"notifications",el:n,inTooltip:!0})}),u.app.platform.sdk.notifications.clbks.added.menu=u.app.platform.sdk.notifications.clbks.seen.menu=function(){var e=a().length;t&&t.set(e),s.ah(n,e),u.app.platform.api.electron.notifications(e,"notifications")}},click:function(e){isMobile()&&u.nav.api.go({href:"userpage?id=notifications&report=notifications",history:!0,open:!0})}},messenger:{init:function(e){function n(){var a=0;return _.each(t.storage.chat,function(e,n){a+=e.messages.unreaded}),a}var t=u.app.platform.clientrtc.rtchttp;u.app.platform.clientrtc.rtchttp.info.allchats(function(){s.ah(e,n())}),u.app.platform.sdk.messenger.clbks.menu=function(){s.ah(e,n())}},click:function(e){isMobile()?u.nav.api.load({href:"messenger",history:!0,open:!0}):u.nav.api.go({href:"userpage?id=messenger&report=messenger",history:!0,open:!0})}},savecross:{init:function(a){var e=deep(u.app,"platform.sdk.user.storage.me.rc")||0;s.ah(a,e),u.app.platform.ws.messages.event.clbks.menusave=function(e){if("userInfo"==e.mesType){var n=deep(u.app,"platform.sdk.user.storage.me.rc")||0;s.ah(a,n)}}},click:function(){u.app.platform.m.log("sharing_opened_menu","0"),u.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{rescue:!0}})}},search:{click:function(){c.c.toggleClass("searchactive"),c.c.hasClass("searchactive")?(searchBackAction=null,c.postssearch.find("input").focus(),c.postssearch.addClass("active"),n&&(clearTimeout(n),n=null)):(c.postssearch.removeClass("active"),c.postssearch.find("input").val(""),r&&r.clear()),s.elswidth()}},searchinit:{init:function(i){function o(e){"s"!=u.app.nav.current.href||e?(i.find("input").val(""),c.c.removeClass("searchactive"),s()):searchBackAction&&(searchBackAction(),searchBackAction=null)}var s=function(){n&&(clearTimeout(n),n=null)};l=new search(c.postssearch,{placeholder:u.app.localization.e("e13139"),clbk:function(e){e.find("input").on("blur",function(){n=slowMade(function(){o()},n,200)})},last:{get:function(){return[]},tpl:function(e,n){}},events:{fastsearch:function(n,a){u.app.platform.sdk.search.get(n,"fs",null,null,null,function(e){p.results(e||{},n,function(e){a(e,function(e,t){bgImages(e),e.find(".result").on("click",function(){var e=$(this).attr("result");i.find("input").val(e);var n="s?ss="+e.replace("#","tag:");r&&(n="?report=shares&ss="+e.replace("#","tag:"),r.clear(!0));var a={href:n,history:!0,open:!0};r&&(a.handler=!0),u.nav.api.go(a),t.closeResults(),s()}),e.find(".user").on("click",function(){var e=$(this).attr("address");u.nav.api.go({href:"author?address="+e,history:!0,open:!0}),t.closeResults(),o(),s()})})})})},search:function(e,n,a,t){var i="s?ss="+e.replace("#","tag:");r&&(i="?report=shares&ss="+e.replace("#","tag:"),r.clear(!0));var o={href:i,history:!0,open:!0};r&&(o.handler=!0),u.nav.api.go(o),t.closeResults(),s(),n&&n(!0)},clear:function(e){e||(i.find("input").blur(),setTimeout(function(){o(!0),s()},100))}}})}},newaccount:{click:function(){u.nav.api.go({href:"registration",history:!0,open:!0})}},state:{init:function(e){function n(){_.isEmpty(u.app.errors.state)?e.addClass("hidden"):e.removeClass("hidden")}n(),u.app.errors.clbks.menu=function(){n()},e.tooltipster({theme:"tooltipster-light",maxWidth:300,zIndex:200})}},wallets:{click:function(){u.nav.api.go({open:!0,href:"userpage?id=wallet",history:!0})},init:function(a){function e(){u.app.platform.sdk.node.transactions.get.allBalance(function(e){var n=(e+=u.app.platform.sdk.node.transactions.tempBalance())-o;t&&(n=0,o=e),t=!1,function(t,e){a.removeClass("hidden"),0==e?(i.text(u.app.platform.mp.coin(t)),s.elswidth()):i.animateNumber({number:e,numberStep:function(e,n){s.elswidth();var a=Number(t+e).toFixed(8);$(n.elem).text(u.app.platform.mp.coin(a))}},rand(400,1200),function(){a.removeClass("good")})}(o,n),o=e,u.app.platform.sdk.wallet.drawSpendLine(a.find(".numberWrp"))})}function n(){e()}var i=a.find(".number"),t=!0,o=0;(u.app.platform.sdk.node.transactions.clbks.menu=n)()}},signout:{click:function(){u.app.user.signout(),u.app.reload({href:"authorization"})}},signin:{init:function(e){},click:function(){u.nav.api.go({href:"authorization",history:!0,open:!0})}},signup:{init:function(e){},click:function(){u.nav.api.go({href:"registration",history:!0,open:!0})}}},p={results:function(e,n,a){u.shell({name:"results",data:{results:e,value:n}},function(e){a&&a(e.rendered)})}};return{getdata:function(e,n){var a={};if(o.value=app.localization.current().name,a.loc=o,a._SEO=_SEO,a.lkey=app.localization.current(),n.state){var t=u.sdk.address.pnet().address,i=u.app.platform.sdk.registrations.storage[t];i&&i<=5&&(a.key=!0),u.app.platform.sdk.users.getone(t,function(){e(a)})}else e(a)},destroy:function(){e(),l=null,$(window).off("resize",s.elswidth),delete u.app.platform.sdk.node.transactions.clbks.menu,delete u.app.platform.ws.messages.event.clbks.menusave,delete u.app.platform.sdk.notifications.clbks.seen.menu,delete u.app.platform.sdk.notifications.clbks.added.menu,delete u.app.platform.sdk.messenger.clbks.menu,delete u.app.errors.clbks.menu,delete u.app.platform.sdk.registrations.clbks.menu,t&&clearInterval(t),_.each(i,function(e){delete e.el,e.destroy&&e.destroy()}),c={}},closesearch:function(){c.c&&c.c.removeClass("searchactive")},showsearch:function(e,n){c.c.addClass("searchactive"),c.postssearch.find("input").val(e.replace("tag:","#")),searchBackAction=n||null,s.elswidth(),setTimeout(function(){s.elswidth()},2)},initauthorsearch:function(e){e.data&&function(e){l&&l.placeholder(u.app.localization.e("e13140")+" "+e.data.name.toUpperCase()),r=e}(e)},destroyauthorsearch:function(){e()},init:function(e){(c={}).c=e.el.find("#"+u.map.id),c.a=e.el.find(".additionalbar"),c.cart=c.c.find(".cart"),c.likes=c.c.find(".favorites"),c.messagesCount=c.c.find(".dialogs .count"),c.notificationsCount=c.c.find(".notifications .count"),c.walletsAmount=c.c.find(".wallets .amount"),c.notactive=c.c.find(".notactive"),c.currency=c.c.find(".currencyWrapper"),c.postssearch=c.c.find(".postssearch"),c.nav=c.c.find(".menutoppanel"),function(){if(c.c.find(".localizationicon").on("click",function(){var e=[];console.log("LANGUAGES!",u.app.localization.available),_.each(u.app.localization.available,function(a){e.push({text:a.name,action:function(e){var n=app.localization.findByName(a.name);console.log("na",n,u.app.localization.key),n&&n.key!=u.app.localization.key&&(console.log("LANGUAGE SET!!!"),u.app.localization.set(n.key)),e()}})}),menuDialog({items:e})}),c.c.find("[events]").each(function(){var a=$(this),e=a.attr("events");i[e]&&(i[e].el=a,_.each(i[e],function(e,n){"init"==n?e(a):a.on(n,e)}))}),$(window).on("resize",s.elswidth),ParametersLive([o],c.c),t=setInterval(s.autoUpdate,100),"undefined"!=typeof _Electron){function n(){a.getCurrentWindow().isFullScreen()?c.c.addClass("fullscreen"):c.c.removeClass("fullscreen")}var a=require("electron").remote;c.c.find(".closeApp").on("click",function(){a.getCurrentWindow().close()}),c.c.find(".miniizeApp").on("click",function(){a.getCurrentWindow().minimize()}),c.c.find(".toggleMinMax").on("click",function(){var e=a.getCurrentWindow();e.setFullScreen(!e.isFullScreen()),n()}),n()}}(),u.app.user.isState(function(e){parameters().ss&&(isMobile()||"s"==u.app.nav.get.pathname())&&(c.c.addClass("searchactive"),c.c.find(".postssearch").addClass("active"),s.elswidth(),c.postssearch.find("input").val(parameters().ss.replace("tag:","#")))}),e.clbk(null,e)}}}var u=new nModule,t={};return u.run=function(e){var n=u.addEssense(t,a,e);u.init(n,e)},u.stop=function(){_.each(t,function(e){e.destroy()})},u.initauthorsearch=function(n){_.each(t,function(e){e.initauthorsearch(n)})},u.destroyauthorsearch=function(){_.each(t,function(e){e.destroyauthorsearch()})},u.closesearch=function(){_.each(t,function(e){e.closesearch()})},u.showsearch=function(n){_.each(t,function(e){e.showsearch(n)})},u}();"undefined"!=typeof module?module.exports=menu:(app.modules.menu={},app.modules.menu.module=menu);
 /*_____*/ 
var toppanel=function(){function a(e){var t,n=deep(e,"history"),o={index:"index",sub:"index?r=sub",recommended:"index?r=recommended"},i=function(){var e=_.toArray(o),n=parameters(r.app.nav.current.completeHref,!0).r||"index",a=new Parameter({type:"VALUES",name:"Contents",id:"contents",possibleValues:e,possibleValuesLabels:[r.app.localization.e("e13136"),r.app.localization.e("e13137"),r.app.localization.e("e13138")],defaultValue:o[n]});return a.value=o[n],a._onChange=function(e){var n=e;r.nav.api.load({open:!0,href:n,history:!0})},a},a=function(n){var a=i();r.app.user.isState(function(e){e&&isMobile()&&"index"!=n?t.c.addClass("hidden"):(t.c.removeClass("hidden"),r.shell({name:"menu",el:t.menu,data:{pathname:n,state:e,mobile:isTablet(),selector:a}},function(e){ParametersLive([a],e.el)}))})},p=function(){};return{primary:n,getdata:function(e){e({})},destroy:function(){delete r.app.nav.clbks.history.toppanel,t={}},init:function(e){p(),(t={}).c=e.el.find("#"+r.map.id),t.menu=t.c.find(".panelitems"),r.app.nav.clbks.history.toppanel=function(e){a(app.nav.current.href)},a(r.app.nav.current.href),e.clbk(null,e)}}}var r=new nModule,t={};return r.run=function(e){var n=r.addEssense(t,a,e);r.init(n,e)},r.stop=function(){_.each(t,function(e){e.destroy()})},r}();"undefined"!=typeof module?module.exports=toppanel:(app.modules.toppanel={},app.modules.toppanel.module=toppanel);
 /*_____*/ 
var navigation=function(){function o(n){var i,o,e=deep(n,"history"),a=function(){250<o.scrollTop()?i.c.addClass("scrolled"):i.c.removeClass("scrolled")},t=function(){console.log("asdsadsadasd"),_scrollTop(0,null,0)},d=function(n){var e=localStorage.lentakey||"index?b=true";"index"==e&&(e="index?b=true"),-1==e.indexOf("?")&&(e="index?r="+e);var o=s.app.nav.api.backChainGet();s.shell({name:"menu",inner:html,el:i.menu,data:{back:o,href:n,lentakey:e}},function(n){n.el.find(".toup").on("click",t)})},l=function(){console.log("INIEVC1"),i.c&&i.c.closest("#navigationWrapper").addClass("hidden")},r=function(){console.log("INIEVC2"),i.c&&i.c.closest("#navigationWrapper").removeClass("hidden")},c=function(){};return{primary:e,getdata:function(n,e){o=$(window),n({})},destroy:function(){window.removeEventListener("scroll",a),window.cordova&&(window.removeEventListener("keyboardWillShow",l),window.removeEventListener("keyboardWillHide",r)),delete s.app.nav.clbks.history.navigation,i&&(i.c&&i.c.remove(),i={})},init:function(n){c(),(i={}).c=n.el.find("#"+s.map.id),i.menu=i.c.find(".nmenu"),s.app.nav.clbks.history.navigation=function(n){d(s.app.nav.get.pathname())},window.addEventListener("scroll",a),window.cordova&&(console.log("INIEVC"),window.addEventListener("keyboardWillShow",l),window.addEventListener("keyboardWillHide",r)),n.clbk(null,n),d(s.app.nav.get.pathname())}}}var s=new nModule,i={};return s.run=function(n){var e=s.addEssense(i,o,n);s.init(e,n)},s.stop=function(){_.each(i,function(n){n.destroy()})},s}();"undefined"!=typeof module?module.exports=navigation:(app.modules.navigation={},app.modules.navigation.module=navigation);
 /*_____*/ 
var footer=function(){function o(a){var e,o=deep(a,"history"),n=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),possibleValuesLabels:app.localization.availableMap("name"),format:{right:!0},_onChange:function(a){var e=app.localization.findByName(a);e&&e.key!=app.localization.key&&app.localization.set(e.key)}}),i=function(){};return{primary:o,getdata:function(a){var e={};e._SEO=_SEO,e.loc=n,a(e)},destroy:function(){e={}},init:function(a){i(),(e={}).c=a.el.find("#"+t.map.id),ParametersLive([n],e.c),a.clbk(null,a)}}}var t=new nModule,n={};return t.run=function(a){var e=t.addEssense(n,o,a);t.init(e,a)},t.stop=function(){_.each(n,function(a){a.destroy()})},t}();"undefined"!=typeof module?module.exports=footer:(app.modules.footer={},app.modules.footer.module=footer);
 /*_____*/ 
var notifications=function(){function i(t){var s,i,e,n=deep(t,"history"),o="",c=function(){var n=s.c.find(".notification:not(.seen)");n.length&&(i=slowMade(function(){if(f.app.platform.sdk.notifications.seenall(),0<n.length){n.addClass("seen")}},i,50))},a=function(){f.nav.api.go({href:"userpage?id=notifications&report=notifications",history:!0,open:!0}),f.closeContainer()},r=function(){c()},d={notifications:function(i,n){var t=(i=i||{}).notifications||f.app.platform.sdk.notifications.storage.notifications,o=!1;if(console.log("_notifications",t),i.el=s.new,i.el){f.app.platform.currentTime();i.seenFilter;var e=-t.length+(i.notifications||f.app.platform.sdk.notifications.storage.notifications).length;t=_.sortBy(t,function(n){return Number(-n.nblock)});var a=new Date,r=group(t,function(n){if(i.now)return"ntnow";var t=new Date(1e3*n.time);return t.addMinutes(60)>a?"ntlasthour":dateToStrSmall(t)==dateToStrSmall(a)?"nttoday":t.getFullYear().toString()+(t.getMonth()+1).toString()==a.getFullYear().toString()+(a.getMonth()+1).toString()?"ntmounth":"ntearlier"});if(i.now){var l=i.el.find('.group[index="ntnow"]');l.length&&(i.el=l.find(".groupContent")),o=!0}f.shell({name:"notifications",el:i.el,data:{notifications:t,ws:f.app.platform.ws,now:i.now,grou:r,rnow:o},inner:prepend},function(i){d.loadingAndEmpty(),e&&s.c.find(".more").html("("+e+")");var o=f.app.platform.ws;_.each(t,function(n){var t=null;n.mesType&&(t=o.messages[n.mesType]),n.msg&&!t&&(t=o.messages[n.msg]),t&&t.fastMessageEvents&&t.fastMessageEvents(n,{el:i.el.find('.notification[notification="'+n.txid+'"]')})}),f.app.nav.api.links(null,s.c,function(){f.closeContainer()}),c()})}},loadingAndEmpty:function(){if(f.app.errors.connection())return s.loader.addClass("hidden"),s.empty.addClass("hidden"),void s.error.removeClass("hidden");s.error.addClass("hidden"),f.app.platform.sdk.notifications.loading?s.loader.removeClass("hidden"):(s.loader.addClass("hidden"),s.c.find(".notification").length?s.empty.removeClass("hidden"):s.loader.addClass("hidden"))}},l=function(){};return{primary:n,getdata:function(n){n({})},destroy:function(){s={},o="",i&&clearTimeout(i),i=null,e.removeEventListener("scroll",r),delete f.app.platform.sdk.notifications.clbks.added["notifications"+o],delete f.iclbks.lenta},init:function(n){l(),(s={}).c=n.el.find("#"+f.map.id),s.new=s.c.find(".newWrapper"),s.loader=s.c.find(".loader"),s.empty=s.c.find(".empty"),s.error=s.c.find(".error"),"tooltip"==n.insert?(e=s.c.find(".nabsContentWrapper")[0],o="tt"):(o="",e=window),jinel=$(e),d.loadingAndEmpty(),function(){if(s.c.find(".showAll").on("click",a),e.addEventListener("scroll",r),s.c.find(".closecontainer").on("click",function(){f.closeContainer()}),f.iclbks.lenta=function(){d.loadingAndEmpty()},isMobile()){var i=s.c.find(".circularprogress"),o=new CircularProgress({radius:30,strokeStyle:"#00A3F7",lineCap:"round",lineWidth:1,font:"100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#00A3F7",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});o.update(70),s.c.find(".circularprogressWrapper").html(o.el);var n=$(window),t=new SwipeParallax({el:s.c.find(".ntf"),allowPageScroll:"vertical",directions:{down:{cancellable:!0,positionclbk:function(n){var t=Math.abs(n)/200;0<=n&&(o.options.text={value:""},o.update(100*t),i.height(220*t+"px"))},constraints:function(){if(0==n.scrollTop())return!0},restrict:!0,trueshold:200,clbk:function(){f.app.platform.sdk.notifications.getNotifications(function(){t.renew()})}}}}).init()}}(),n.insert,d.notifications({seenFilter:t.inTooltip}),f.app.platform.sdk.notifications.clbks.added["notifications"+o]=function(n,t){d.notifications({notifications:n,now:t})},n.clbk(null,n)},tooltip:{options:{theme:"lighttooltip notificationTolltip",position:"left",zIndex:50,distance:-47,functionPosition:function(n,t,i){return i.coord.top=0,i.coord.left=0,i},arrow:!1,trigger:"custom",triggerOpen:{click:!0},triggerClose:{}},event:"click"}}}var f=new nModule,o={};return f.run=function(n){var t=f.addEssense(o,i,n);f.init(t,n)},f.stop=function(){_.each(o,function(n){n.destroy()})},f}();"undefined"!=typeof module?module.exports=notifications:(app.modules.notifications={},app.modules.notifications.module=notifications);
 /*_____*/ 
var authorization=function(){function o(e){var i,a,t,s=deep(e,"history"),n="secondary",o=null;s&&(n="primary"),e.inWnd&&(n="window");var l=new Parameter({type:"BOOLEAN",name:"stay",id:"stay",name:u.app.localization.e("e13027"),_onChange:function(e){e||(console.log("stayH"),localStorage.stay="0",localStorage.mnemonic,u.app.user.stay=0)}}),r={login:function(){var o={},e=trim(i.login.val());localStorage.stay=boolToNumber(l.value).toString(),u.user.stay=l.value,u.user.signin(e,function(e){if(e){u.app.platform.sdk.registrations.remove();var n={};n.href=a.successHref,!n.href&&s&&(n.href=function(){return u.app.user.validate()?"index":u.app.errors.connection()?"userpage?id=test":"filluser"}),n.nav=a.nav,n.clbk=function(){topPreloader(100);var e=deep(t,"container.close");e&&e(),a.signInClbk&&a.signInClbk()},"_this"==deep(a,"successHref")?u.app.reloadModules(function(){if(u.app.user.validate()){var e=deep(t,"container.close");e&&e(),a.signInClbk&&a.signInClbk()}else u.nav.api.loadSameThis("filluser",o)}):u.app.reload(n)}else sitemessage(u.app.localization.e("e13028"))})}},c=function(){u.nav.api.load({open:!0,id:"filluserfast",el:i.c.find(".filluserform"),essenseData:{inauth:!0,successHref:a.successHref,welcomepart:function(){i.c.addClass("welcomepnet")},signInClbk:function(){var e=deep(t,"container.close");e&&e(),a.signInClbk()}},clbk:function(e,n){o=n}})};return{primary:s,id:n,getdata:function(e,n){if(n.state&&s)u.nav.api.load({open:!0,href:"index",history:!0});else{l.value=numberToBool(u.app.user.stay);localStorage.mnemonic;e({stay:l,mnemonic:"",fast:deep(n,"settings.essenseData.fast")||!1})}},destroy:function(){i={},o&&(o.destroy(),o=null)},init:function(e){(i={}).c=e.el.find("#"+u.map.id),i.login=i.c.find(".loginValue"),i.pwd=i.c.find(".pwdValue"),i.enter=i.c.find(".enter"),i.toRegistration=i.c.find(".toRegistration"),i.forgotPassword=i.c.find(".forgotPassword"),a=e.essenseData||{},function(e){i.enter.on("click",r.login),i.toRegistration.on("click",function(){u.nav.api.loadSameThis("registration",e)}),i.c.find(".showformh").on("click",function(){i.c.toggleClass("signinshow")}),initUpload({el:i.c.find(".uploadFile"),ext:["txt","png","jpeg","jpg"],notexif:!0,dropZone:i.c,action:function(e,n){if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)console.log("QRSCANNER"),grayscaleImage(e.base64,function(e){qrscanner.q.debug=!0,qrscanner.q.callback=function(e){console.log(e),"error decoding QR Code"==e?sitemessage(u.app.localization.e("filedamaged")):(i.login.val(trim(e)),r.login())},qrscanner.q.decode(e)});else{var o=e.base64.split(",")[1],a=b64_to_utf8(o).split("/");a[1]?(i.login.val(trim(a[1])),r.login()):sitemessage(u.app.localization.e("filedamaged"))}}}),i.c.find(".loginValue").on("focus",function(){i.c.find(".inputTable").addClass("typeactive")}),i.c.find(".loginValue").on("blur",function(){i.c.find(".inputTable").removeClass("typeactive")})}(t=e),function(){var e=parameters();ParametersLive([l],i.c),e.restore&&r.forgotPassword(),a.fast&&c()}(),e.clbk(null,e)},tooltip:{options:{position:"left",functionPosition:function(e,n,o){return o.coord.top=10,o.coord.left+=10,o}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen authwindow"}}}var u=new nModule,a={};return u.run=function(e){var n=u.addEssense(a,o,e);u.init(n,e)},u.stop=function(){_.each(a,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=authorization:(app.modules.authorization={},app.modules.authorization.module=authorization);
 /*_____*/ 
var panel=function(){function s(n){var u,e=deep(n,"history"),s=null,t=null,i=null,a=null,o={tags:function(){d.nav.api.load({open:!0,id:"tagcloud",el:u.tags,animation:!1,clbk:function(n,e){t=e}})},recommendationslist:function(n,e){n.length&&u.c&&d.shell({name:"recommendationslist",el:u.r.find(".userslist"),data:{users:n},bgImages:{clbk:function(n){$(n.elements[0]).addClass("active")}}},function(n){e&&e()})},lastcomments:function(n,e){d.nav.api.load({open:!0,id:"lastcomments",el:u.comments,animation:!1,clbk:function(n,e){e}})},recommendations:function(c,n){c.length&&u.c?d.shell({name:"recommendations",el:u.r,data:{users:c}},function(r){o.recommendationslist(c,function(){var s=0,t=4,i=r.el.find(".userslist"),a=r.el.find(".arrow"),o={uleft:r.el.find(".uleft"),uright:r.el.find(".uright")},l={clickArrow:function(n){"left"==n&&(s-=t)<0&&(s=0),"right"==n&&(s+=t)>=c.count&&(s=c.count-1),l.slideCarousel()},displayArrows:function(){0<s?l.displayArrow("left",!0):l.displayArrow("left",!1),s+t<c.length?l.displayArrow("right",!0):l.displayArrow("right",!1)},displayArrow:function(n,e){var s=a;n&&(s=o["u"+n]),e?s.addClass("active"):s.removeClass("active")},slideCarousel:function(){var n=u.c.find(".user").width(),e=s*n;i.css("margin-left","-"+e+"px"),l.displayArrows()},applyCarousel:function(){var n=r.el.find(".user").width(),e=r.el.find(".userslistwrapper").width();t=Math.min(Number((e/n).toFixed(0)),4),u.c.find(".user").width((e/t).toFixed(0)+"px"),i.width((c.length*(e/t)).toFixed(0)+1),l.slideCarousel()}},n=function(){var n=$(this).attr("arrow");l.clickArrow(n)};l.applyCarousel(),r.el.find(".arrow").on("click",n)})}):u.r.html("")},discussions:function(){var n=a.discussions||{};n.view="fixedin",d.nav.api.load({open:!0,id:"discussions",el:u.cnt,animation:!1,essenseData:n,clbk:function(n,e){s=e}})},_discussions:function(){d.user.isState(function(n){if(n){var e=d.app.platform.sdk.users.storage[d.app.platform.sdk.address.pnet().address];e.relay||e.temp||o.discussions()}})}},l=function(s){d.app.user.isState(function(n){if(n){var e=d.sdk.address.pnet().address;d.sdk.users.get(e,function(){var n=deep(d,"sdk.users.storage."+e+".recomendedSubscribes");n&&n.length?d.sdk.users.get(n,function(){s&&s(n)}):s&&s([])})}else s&&s([])})},r=function(){};return{primary:e,getdata:function(n,e){a=e.settings.essenseData||{};n({})},destroy:function(){delete d.app.platform.clbks.api.actions.subscribe.panelrec,delete d.app.platform.ws.messages.event.clbks.panel,s&&(s.destroy(),s=null),t&&(t.destroy(),t=null),i&&(i.destroy(),i=null),u={}},authclbk:function(){},init:function(n){r(),(u={}).c=n.el.find("#"+d.map.id),u.cnt=u.c.find(".panelcnt"),u.tags=u.c.find(".tagscnt"),u.comments=u.c.find(".lastcommentscnt"),u.r=u.c.find(".recommendationscnt"),d.app.platform.clbks.api.actions.subscribe.panelrec=function(){l(function(n){o.recommendations(n)})},d.app.platform.ws.messages.event.clbks.panel=function(n){"userInfo"==n.mesType&&o._discussions()},d.app.platform.sdk.usersettings.meta.vidgetchat.value&&o._discussions(),d.app.platform.sdk.usersettings.meta.vidgettags.value&&o.tags(),d.app.platform.sdk.usersettings.meta.vidgetlastcomments.value&&o.lastcomments(),n.clbk(null,n)}}}var d=new nModule,t={};return d.authclbk=function(){_.each(t,function(n){n.authclbk()})},d.run=function(n){var e=d.addEssense(t,s,n);d.init(e,n)},d.stop=function(){_.each(t,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=panel:(app.modules.panel={},app.modules.panel.module=panel);
 /*_____*/ 
var discussions=function(){function i(s){var d,u,l,n,i=deep(s,"history"),t={},o={},e={},f=null,a=!1,c=null,r=null,p={preloader:function(s){d.c&&(s?d.c.addClass("loading"):d.c.removeClass("loading"))},inView:function(s,n,i){if(_.toArray(u).length&&d.c){var t=d.c.find(n||".discussion"),o="offset";"fixedin"==f.view&&(o="position");var e=inView(t,{inel:l,offset:0,mode:"part",f:o});if(0<e.length){var a={},c=_.map(e,function(s){var n=$(s).attr("chat");return a[n]=!0,u[n]});if(i){var r=[];_.each(u,function(s,n){a[n]||r.push(s)}),i(r)}s&&s(c)}}},chatp:function(s){u[s]&&(p.preloader(!0),retry(function(){if(o[s]||!t[s])return!0},function(){p.chat(u[s])}))},chat:function(n){r=!0,p.closeAll(function(){y.app.platform.sdk.chats.save();var s={open:!0,href:"chat",animation:!1,history:!0};"fixedin"==f.view?(s.history=!1,s.el=d.c.find(".chatWrapper"),s.essenseData={view:"fixedin",chat:n,destroyClbk:function(){c&&(r=!1,p.preloader(!0),d.c&&d.c.removeClass("forChat"),s.el.html(""),h.discussions(null,function(){c=null,p.preloader(!1),l.scrollTop(0),setTimeout(function(){p.openInView()},100)}))}},s.clbk=function(s,n){c=n,d.c.addClass("forChat"),p.preloader(!1)}):s.href="chat?chatid="+n.chat.id,y.nav.api.load(s)})},open:function(s,n){},remove:function(s){p.preloader(!0),p.close(s,function(){p.preloader(!1),y.app.platform.sdk.chats.remove(s),u=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),d.c.find('.discussion[chat="'+s+'"]').remove(),h.empty()})},openInView:function(s){p.inView(function(s){_.map(s,function(s){return s.chat.id});_.each(s,function(s){p.open(s)})},".discussion:not(.dempty)",function(s){var n=_.map(s,function(s){return s.chat.id});p.closeMany(n)})},close:function(s,n){e[s]?retry(function(){if(!e[s])return!0},n):(e[s]=!0,retry(function(){if(o[s])return!0},function(){y.app.platform.rtc.destroy(s),delete e[s],delete o[s],delete t[s],n()}))},closeMany:function(s,n){lazyEach({array:s,action:function(s){var n=s.item;t[n]?p.close(n,s.success):s.success()},all:{success:function(){n&&n()}}})},closeAll:function(s){var n=_.map(t,function(s,n){return n});lazyEach({array:n,action:function(s){var n=s.item;p.close(n,s.success)},all:{success:function(){t={},o={},e={},s&&s()}}})}},m={inViewScroll:function(){n=slowMade(function(){r||(m.inView(),p.openInView())},n,200)},inView:function(){a||p.inView(function(s){a=!0,y.app.platform.sdk.discussions.info(s,function(s){h.fdiscussions(s,function(){a=!1}),u=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author)})},".discussion.dempty")},chat:function(){var s=$(this).closest(".discussion").attr("chat");p.chatp(s)},remove:function(){var s=$(this).closest(".discussion").attr("chat");p.remove(s)}},h={empty:function(){_.toArray(u).length?d.c.removeClass("sempty"):d.c.addClass("sempty")},message:function(s,n){y.shell({name:"message",inner:html,el:d.list.find('[chat="'+n+'"] .lastMessage'),data:{message:s}},function(s){})},discussion:function(s,n){var i=d.list.find('[chat="'+s.chat.id+'"]');s.share&&s.author?y.shell({name:"discussion",inner:html,el:i,data:{discussion:s}},function(s){i.removeClass("dempty"),s.el.find(".discussioncnt").on("click",m.chat),s.el.find(".remove").on("click",m.remove),n&&n()}):(i.remove(),n&&n())},fdiscussions:function(s,n){lazyEach({array:_.toArray(s),action:function(s){var n=s.item;h.discussion(n,s.success)},all:{success:function(){p.openInView(),n&&n()}}})},discussions:function(s,n,i){s=s||u;var t=_.toArray(s);t=_.sortBy(t,function(s){return-s.chat.time}),y.shell({name:"discussions",inner:i||html,el:d.list,data:{discussions:t}},function(s){m.inView(),n&&n()})},discussionTemp:function(i,t,o){y.shell({name:"discussions",el:d.temp,data:{discussions:i}},function(s){var n=s.el.find(".discussion");y.app.platform.sdk.discussions.info(i,function(s){y.shell({name:"discussion",inner:html,el:n,data:{discussion:i[0],c:t}},function(s){n.removeClass("dempty"),n.on("click",function(){y.app.platform.sdk.chats.add(i[0].chat.id,"share")}),o&&o()})})})}},v=function(){};return{primary:i,getdata:function(s,n){f=n.settings.essenseData||{},a=!1;var i=y.app.platform.sdk.address.pnet().address+"addedtochat";localStorage[i]=!0,y.app.platform.sdk.chats.add("6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd","share");var t={};u=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),t.discussions=u,s(t)},destroy:function(){console.log("DESTROYCHAT"),l&&l.off("scroll",m.inViewScroll),delete y.app.platform.sdk.chats.clbks.discussions,p.closeAll(),c&&(c.destroy(),c=null),d={}},init:function(s){s,t={},opened={},r=!(o={}),v(),(d={}).c=s.el.find("#"+y.map.id),l="fixedin"==f.view?d.c.find(".discussionsWrapper"):$(window),d.list=d.c.find(".list"),d.temp=d.c.find(".gotoDisscussion"),l.on("scroll",m.inViewScroll),y.app.platform.sdk.chats.clbks.discussions=function(s,n,i){if("removeTemp"==n)return d.temp.html(""),void d.temp.fadeOut(1);var t=_.toArray(y.app.platform.sdk.discussions.fromChats([s]));"add"==n&&(u=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),h.empty(),h.discussions(t,function(){p.chatp(t[0].chat.id)},prepend)),"addTemp"==n&&h.discussionTemp(t,i,function(){}),"addtwice"==n&&(h.discussions(),p.chatp(t[0].chat.id))},p.chatp("6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd"),s.clbk(null,s)}}}var y=new nModule,t={};return y.run=function(s){var n=y.addEssense(t,i,s);y.init(n,s)},y.stop=function(){_.each(t,function(s){s.destroy()})},y}();"undefined"!=typeof module?module.exports=discussions:(app.modules.discussions={},app.modules.discussions.module=discussions);
 /*_____*/ 
var addaccount=function(){function o(n){var i,e,o=deep(n,"history"),t="secondary";o&&(t="primary"),n.inWnd&&(t="window");var a=function(){var n=trim(i.login.val());e.success&&e.success(n),c.closeContainer()};return{primary:o,id:t,getdata:function(n,e){n({})},destroy:function(){i={}},init:function(n){(i={}).c=n.el.find("#"+c.map.id),i.login=i.c.find(".loginValue"),i.enter=i.c.find(".enter"),e=n.essenseData||{},n,i.enter.on("click",a),i.login.on("focus",function(){i.c.find(".inputTable").addClass("typeactive")}),i.login.on("blur",function(){i.c.find(".inputTable").removeClass("typeactive")}),initUpload({el:i.c.find(".uploadFile"),notexif:!0,ext:["txt","png","jpeg","jpg"],dropZone:i.c,action:function(n,e){if("png"==n.ext||"jpeg"==n.ext||"jpg"==n.ext)grayscaleImage(n.base64,function(n){qrscanner.q.callback=function(n){"error decoding QR Code"==n?sitemessage(c.app.localization.e("filedamaged")):(i.login.val(trim(n)),a())},qrscanner.q.decode(n)});else{var o=n.base64.split(",")[1],t=b64_to_utf8(o).split("/");t[1]?(i.login.val(trim(t[1])),a()):sitemessage(c.app.localization.e("filedamaged"))}}}),n.clbk(null,n)},tooltip:{options:{position:"left",functionPosition:function(n,e,o){return o.coord.top=10,o.coord.left+=10,o}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen"}}}var c=new nModule,t={};return c.run=function(n){var e=c.addEssense(t,o,n);c.init(e,n)},c.stop=function(){_.each(t,function(n){n.destroy()})},c}();"undefined"!=typeof module?module.exports=addaccount:(app.modules.addaccount={},app.modules.addaccount.module=addaccount);
 /*_____*/ 
var postscores=function(){function t(s){var r,n,o,i,e=deep(s,"history"),d=function(s,t){if(n.address!=u.user.address.value){var e=n.upvote(s);if(!e)return u.app.platform.errorHandler("4",!0),void(t&&t(!1));u.sdk.node.transactions.create.commonFromUnspent(e,function(s,e){topPreloader(100),s?t&&t(!0):(n.myVal=null,u.app.platform.errorHandler(e,!0),t&&t(!1))})}},t=function(){var a=$(this).attr("value");u.app.user.isState(function(s){if(s){var t=$(this).closest(".stars");if(t.attr("value"))return;t.attr("value",a),t.addClass("liked"),d(a,function(s){if(s){n.scnt||(n.scnt=0),n.score||(n.score=0),n.scnt++,n.score=Number(n.score||0)+Number(a);var e=Number(n.score)/Number(n.scnt);t.find(".tstarsov").css("width",e/5*100+"%"),t.closest(".itemwr").find(".count span.v").html(e.toFixed(1)),l.stars(),o.push({address:u.user.address.value,value:a}),l.details(),l.userlist(),i.like&&i.like(n)}else t.removeAttr("value"),t.removeClass("liked")})}else u.nav.api.load({open:!0,href:"authorization",history:!0})})},l={userlist:function(t){o=_.filter(o,function(s){return 1<=s.value});var s=_.map(o,function(s){return s.address}),a={};_.each(o,function(s){a[s.address]=s.value}),u.nav.api.load({open:!0,id:"userslist",el:r.users,animation:!1,essenseData:{addresses:s,empty:u.app.localization.e("e13151"),caption:u.app.localization.e("e13152"),extra:function(s){var e="";return e=(e+='<div class="userscore">')+a[s]+' <i class="fas fa-star"></i>',e+="</div>"}},clbk:function(s,e){t&&t(s,e)}})},mystars:function(s){if(void 0===n.myVal){var e=[n.txid];u.app.platform.sdk.likes.get(e,function(){l.stars()})}},stars:function(e){u.shell({turi:"lenta",name:"stars",el:r.stars,data:{share:n}},function(s){fastars(s.el.find(".stars")),s.el.find(".stars i").on("click",t),e&&e()})},details:function(e){u.shell({name:"details",el:r.details,data:{share:n,scores:o}},function(s){s.el.find(".line").each(function(){var s=$(this);s.width(s.attr("awidth")+"%")}),e&&e()})}},a=function(){};return{primary:e,getdata:function(e,s){var t=deep(s,"settings.essenseData.share");i=deep(s,"settings.essenseData"),u.app.platform.sdk.node.shares.getbyid([t],function(){if(!(n=u.app.platform.sdk.node.shares.storage.trx[t])){var s=_.find(u.sdk.node.transactions.temp.share,function(s){return s.txid==t});s&&((n=new pShare)._import(s,!0),n.temp=!0,n.address=u.app.platform.sdk.address.pnet().address)}n&&u.app.platform.sdk.postscores.get(t,function(){o=u.sdk.postscores.storage[t]||[],e({share:n})})})},destroy:function(){r={}},clearparameters:["p"],init:function(s){a(),(r={}).c=s.el.find("#"+u.map.id),r.stars=r.c.find(".forstars"),r.details=r.c.find(".details"),r.users=r.c.find(".users"),l.stars(function(){l.details(),l.userlist(),l.mystars()}),s.clbk(null,s)},wnd:{class:"postscoreswnd",nooverflow:!0,swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30,buttons:{}}}}var u=new nModule,a={};return u.run=function(s){var e=u.addEssense(a,t,s);u.init(e,s)},u.stop=function(){_.each(a,function(s){s.destroy()})},u}();"undefined"!=typeof module?module.exports=postscores:(app.modules.postscores={},app.modules.postscores.module=postscores);
 /*_____*/ 
var scheduler=function(){function t(e){function a(){function e(){u.tasks();var e=c.taskForTime();u.time(),u.ready(),e.length&&c.missed(e)}var a=p.app.platform.sdk.address.pnet().address,t=p.app.platform.sdk.pool.getPack(a);t?(r=t[0],p.app.platform.sdk.pool.info(r,function(){e()})):e()}var s,r,t=deep(e,"history"),n=[],i=null,o=function(a){return _.find(n,function(e){return e.id==a})},d=function(a){return findIndex(n,function(e){return e.id==a})},c={postInterval:function(){i=setInterval(function(){var e=c.taskForTime();u.time(),e.length&&lazyEach({array:e,sync:!0,action:function(e){var a=e.item;p.app.platform.sdk.node.transactions.get.unspent(function(){c.post(a,function(){e.success()})},null,!0)}})},6e4)},missed:function(e){dialog({html:"You have <b>"+e.length+"</b> missed posts. Do you want to share it?",btn1text:"Yes",btn2text:"No",success:function(){_.each(e,function(e){c.post(e)})},fail:function(){_.each(e,function(e){e.time=null,u.task(e,null,!0)})}})},taskForTime:function(){var a=new Date;return _.filter(n,function(e){if(e.time&&e.ready&&a>e.time&&!e.remove)return!0})},post:function(n,s){if(n.share){var e=n.share.validation();e?(sitemessage(e),c.failPost(n.id),s&&s(!1)):p.app.platform.sdk.pool.dumpKey(r,n.address,function(e){if(e){var a=bitcoin.ECPair.fromPrivateKey(Buffer.from(e,"hex")),t=bitcoin.payments.p2pkh({pubkey:a.publicKey});n.module.post(function(e,a){e?c.successPost(n.id):(sitemessage(a),c.failPost(n.id)),s&&s(e)},{address:t,keys:a})}else sitemessage("noprivateley")})}else sitemessage("error"),c.failPost(n.id),s&&s(!1)},add:function(){var e={time:null,id:makeid(),share:new Share,address:p.app.platform.sdk.address.pnet().address,ready:!1};e.share.on.change.scheduler=function(){f.save()},n.push(e),u.task(e),f.save()},remove:function(e){var a=d(e);n.splice(a,1),f.save(),s.c.find('.shareAppendWrapper[t="'+e+'"]').remove()},failPost:function(a){var e=o(a);e.time=null,u.task(e,function(){u.ready();var e=s.c.find('.shareAppendWrapper[t="'+a+'"] .result');e.html('<i class="fas fa-exclamation-circle"></i>'),e.addClass("bad")},!0)},successPost:function(e){o(e).remove=!0;var a=s.c.find('.shareAppendWrapper[t="'+e+'"] .result');a.html('<i class="far fa-check-circle"></i>'),a.addClass("good"),u.ready(),f.save()}},l=function(){function e(){c.remove(a)}var a=$(this).closest(".shareTimeWrapper").attr("task"),t=o(a);t&&(t.share.validation()?e():dialog({html:"Do you really want to remove this task?",btn1text:"Yes",btn2text:"No",success:e}))},u={tasks:function(e){lazyEach({array:n,action:function(e){var a=e.item;u.task(a,e.success)},sync:!0,all:{success:e}})},task:function(t,n,e){e||s.tasks.append('<div class="shareAppendWrapper" t="'+t.id+'">'),_el=s.tasks.find('.shareAppendWrapper[t="'+t.id+'"]'),p.shell({name:"task",el:_el,data:{task:t}},function(e){e.el.find(".remove").on("click",l);var a=e.el.find('.shareTimeWrapper[task="'+t.id+'"] .shareContainer');p.nav.api.load({open:!0,id:"share",el:a,animation:!1,_id:t.id,essenseData:{daddress:t.address||p.app.platform.sdk.address.pnet().address,dtype:t.ready,share:t.share,exoprtByTime:!0,pack:r||{},time:t.time,notClear:!0,changeArrange:function(){f.save()},selectTime:function(e){t.time=e,u.ready(),f.save()},address:function(e){t.address=e,u.ready(),f.save()},type:function(e){"p"==e&&c.post(t,function(){}),"t"==e&&(t.ready=!0),"w"==e&&(t.ready=!1),u.time(),u.ready(),f.save()}},clbk:function(e,a){t.module=a,n&&n()}})})},time:function(){var e=new Date;s.c.find(".timeCellWrapper .time").html(e.getHours()+":"+e.getMinutes())},ready:function(){var a=new Date,e=_.filter(n,function(e){if(e.time&&e.ready&&a<e.time&&!e.remove)return!0});s.c.find(".activeTasks .count").html(e.length)}},f={save:function(){var e=_.filter(n,function(e){if(!e.remove)return!0}),a=_.map(e,function(e){var a=null;return e.time&&(a=dateToStr(e.time)),{time:a,id:e.id,share:e.share.export(!0),address:e.address,ready:e.ready}});localStorage.tasks=JSON.stringify(a)},load:function(){var e=JSON.parse(localStorage.tasks||"[]");n=_.map(e,function(e){var a=new Share;a.import(e.share),a.on.change.scheduler=function(){f.save()};var t=null;return e.time&&(t=strToDate(e.time)),{time:t,id:e.id,share:a,address:e.address,ready:e.ready||!1}})}};return{primary:t,getdata:function(e){f.load(),e({tasks:n})},destroy:function(){s={},i&&clearInterval(i),i=null},init:function(e){f.load(),(s={}).c=e.el.find("#"+p.map.id),s.tasks=s.c.find(".shares"),s.add=s.c.find(".addshare"),s.add.on("click",c.add),c.postInterval(),a(),e.clbk(null,e)}}}var p=new nModule,n={};return p.run=function(e){var a=p.addEssense(n,t,e);p.init(a,e)},p.stop=function(){_.each(n,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=scheduler:(app.modules.scheduler={},app.modules.scheduler.module=scheduler);
 /*_____*/ 
var complain=function(){function i(e){var t,i,a,o,s,n=deep(e,"history"),r={post:[{name:"Sexual content",gid:1,group:[{name:"Graphic sexual activity",id:"1"},{name:"Nudity",id:"2"},{name:"Suggestive, but without nudity",id:"3"},{name:"Content involving minors",id:"4"},{name:"Abusive title or description",id:"5"},{name:"Other sexual content",id:"6"}]},{name:"Violent or repulsive content",gid:2,group:[{name:"Adults fighting",id:"7"},{name:"Physical attack",id:"8"},{name:"Youth violence",id:"9"},{name:"Animal abuse",id:"10"}]},{name:"Hateful or abusive content",gid:3,group:[{name:"Promotes hatred or violence",id:"11"},{name:"Abusing vulnerable individuals",id:"12"},{name:"Bullying",id:"13"},{name:"Abusive title or description",id:"14"}]},{name:"Harmful dangerous acts",gid:4,group:[{name:"Pharmaceutical or drug abuse",id:"19"},{name:"Abuse of fire or explosives",id:"20"},{name:"Suicide or self injury",id:"21"},{name:"Other dangerous acts",id:"22"}]},{name:"Child abuse",id:"23"},{name:"Promotes terrorism",id:"24"},{name:"Spam or misleading",gid:6,group:[{name:"Mass advertising",id:"25"},{name:"Pharmaceutical drugs for sale",id:"26"},{name:"Misleading text",id:"27"},{name:"Misleading thumbnail",id:"28"},{name:"Scams / fraud",id:"29"}]},{name:"Infringes my rights",gid:7,group:[{name:"Infringes my copyright",id:"30"},{name:"Invades my privacy",id:"31"},{name:"Other legal claim",id:"32"}]}]},d=function(n){return _.find(r[i],function(e){return(e.gid||e.id)==n})},l=function(i){var e=a.complain(o);topPreloader(30),h.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){console.log(e,n),topPreloader(100),e?i&&i(!0):(h.app.platform.errorHandler(n,!0),i&&i())})},u=function(){o?t.next.removeClass("disabled"):t.next.addClass("disabled")},c=function(){h.closeContainer()},m=function(){!t.next.hasClass("disabled")&&o&&l(function(e){e&&(h.closeContainer(),s.success&&s.success())})},p=function(){var e=$(this).attr("reason"),n=d(e);n&&($(this).hasClass("active")||(t.c.find(".reason").removeClass("active"),o=null,$(this).addClass("active"),n.group?f.selector(n):o=n.id,u()))},f={reasons:function(){h.shell({name:"reasons",inner:html,el:t.reasons,data:{reasons:r[i]}},function(e){e.el.find(".reason").on("click",p)})},selector:function(e){var n=t.c.find('.reason[reason="'+e.gid+'"] .reasongroupIn'),i=_.map(e.group,function(e){return e.name}),a=_.map(e.group,function(e){return e.id}),s=new Parameter({type:"VALUES",name:e.name,id:e.gid,possibleValues:a,possibleValuesLabels:i,placeholder:"Choose one"});s._onChange=function(e){o=e||null,u()},h.shell({name:"selector",inner:html,el:n,data:{selector:s}},function(e){ParametersLive([s],e.el)})}},g=function(){};return{primary:n,getdata:function(e,n){o=null,i=deep(n,"settings.essenseData.item")||"post",a=deep(n,"settings.essenseData.obj")||null,s=n.settings.essenseData||{},a&&e({ess:i})},destroy:function(){t={}},init:function(e){g(),(t={}).c=e.el.find("#"+h.map.id),t.reasons=t.c.find(".reasons"),t.next=t.c.find(".next"),t.c.find(".cancel").on("click",c),t.next.on("click",m),f.reasons(),e.clbk(null,e)},wnd:{class:"withoutButtons transparent small complain"}}}var h=new nModule,a={};return h.run=function(e){var n=h.addEssense(a,i,e);h.init(n,e)},h.stop=function(){_.each(a,function(e){e.destroy()})},h}();"undefined"!=typeof module?module.exports=complain:(app.modules.complain={},app.modules.complain.module=complain);
 /*_____*/ 
var surveyiframe=function(){function r(e){var n,r=deep(e,"history"),i=function(e){"endsurvey"==(e.originalEvent.data||{}).message&&o.closeContainer()},a=function(){};return{primary:r,getdata:function(e){e({})},destroy:function(){n={}},init:function(e){localStorage.survey1=!0,a(),(n={}).c=e.el.find("#"+o.map.id),$(n.c.find("iframe")[0].contentWindow).on("message",i),e.clbk(null,e)},wnd:{class:"allscreen black surveyiframe"}}}var o=new nModule,i={};return o.run=function(e){var n=o.addEssense(i,r,e);o.init(n,e)},o.stop=function(){_.each(i,function(e){e.destroy()})},o}();"undefined"!=typeof module?module.exports=surveyiframe:(app.modules.surveyiframe={},app.modules.surveyiframe.module=surveyiframe);
 /*_____*/ 
var support=function(){function t(n){var o,t=deep(n,"history"),e={send:function(){var n=e.values();n?(o.c.removeClass("showError"),topPreloader(20),r.app.platform.sdk.user.support(n,function(){topPreloader(100),dialog({html:r.app.localization.e("contactSuccess"),class:"one"}),$.each(o.inputs,function(){$(this).val("")})})):o.c.addClass("showError")},values:function(){var e={},s=!0;return $.each(o.inputs,function(){var n=$(this),o=n.val(),t=n.attr("systemId");o?e[t]=o:s=!1}),s?e:null}},s=function(){e.send()},u=function(){};return{primary:t,getdata:function(n){n({})},destroy:function(){o={}},init:function(n){u(),(o={}).c=n.el.find("#"+r.map.id),o.send=o.c.find(".send"),o.inputs=o.c.find(".forminput"),o.send.on("click",s),n.clbk(null,n)}}}var r=new nModule,e={};return r.run=function(n){var o=r.addEssense(e,t,n);r.init(o,n)},r.stop=function(){_.each(e,function(n){n.destroy()})},r}();"undefined"!=typeof module?module.exports=support:(app.modules.support={},app.modules.support.module=support);
 /*_____*/ 
var author=function(){function t(e){var r,a,l,t,n=deep(e,"history"),o=null,s=null,c=!1,i=null,p={subscribeLabel:function(){var e=g.app.user,n=!1;if(!(e.address.value&&r.address==e.address.value)&&e.address.value){var t=deep(g.app,"platform.sdk.users.storage."+e.address.value);t&&t.relation(r.address,"subscribes")&&(n=!0)}if(l.c){var o=l.caption.find(".subscribebuttonstop");n?o.addClass("following"):o.removeClass("following")}},showmoreabout:function(){var e=filterXSS(clearScripts(findAndReplaceLink(deep(r,"data.about"),!0)));l.c.find(".aboutwrapper").html(e),l.c.find(".showmoreabout").remove()},showHideUp:function(){200<l.w.scrollTop()?l.up.addClass("active"):l.up.removeClass("active")},panelTopPosition:function(){if(!isMobile()){var e=$(window).scrollTop();l.caption.height()+20<e?l.fxd.addClass("dfxd"):l.fxd.removeClass("dfxd"),p.panelPosition()}},panelPosition:function(){if(!isMobile()){var e=l.fxd,n=l.panel.closest(".mwork"),t=$(window).width(),o=(t-1280)/2;o<0&&(o=0);var a=t-(n.offset().left+n.width())+0,s=t-a-350+0+0;e.css("right",a+"px"),e.css("left",s+"px")}},destroy:function(){_.each(d,function(e){e.active=!1,e.module&&e.module.destroy()})}},u={showHideUp:function(){s=slowMade(function(){p.showHideUp()},s,30)},up:function(){_scrollTop(0)},unsubscribe:function(){dialog({html:g.app.localization.e("e13022"),btn1text:g.app.localization.e("unfollow"),btn2text:g.app.localization.e("ucancel"),class:"zindex",success:function(){g.app.platform.api.actions.unsubscribe(r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)})}})},subscribe:function(){g.app.platform.api.actions.subscribeWithDialog(r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)})},subscribePrivate:function(){var e="notificationsTurnOn";$(this).hasClass("turnon")&&(e="notificationsTurnOff"),g.app.platform.api.actions[e](r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)})}},d={shares:{name:g.app.localization.e("uposts"),mobile:'<i class="fas fa-align-justify"></i>',id:"shares",render:"lenta",history:!0,count:function(){return 0}},post:{if:function(){return!1},id:"post",render:"post",count:function(){return 0}},followers:{name:g.app.localization.e("followers"),mobile:'<i class="fas fa-users"></i>',id:"followers",render:"followers",history:!0,count:function(){return deep(r,"data.subscribers.length")||0}},following:{name:g.app.localization.e("following"),id:"following",mobile:'<i class="fas fa-user-plus"></i>',render:"following",history:!0,count:function(){return deep(r,"data.subscribes.length")||0}},share:{name:g.app.localization.e("share").toUpperCase()+' <i class="fas fa-share-alt"></i>',mobile:'<i class="fas fa-share-alt"></i>',id:"share",if:function(){return!0},events:{click:function(){g.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0})}}},settings:{name:g.app.localization.e("settings")+' <i class="fas fa-cog"></i>',mobile:'<i class="fas fa-cog"></i>',id:"settings",href:function(){return g.app.user.validate()?"userpage?id=ustate":"userpage"},class:"tosettings",if:function(){if(g.user.isItMe(r.address)&&!isMobile())return!0}},more:{name:'<i class="fas fa-ellipsis-h"></i>',mobile:'<i class="fas fa-ellipsis-h"></i>',id:"more",class:"more",if:function(){if(!g.user.isItMe(r.address)&&a)return!0},events:{click:function(){f.metmenu($(this))}}},info:{name:g.app.localization.e("info")+' <i class="fas fa-info-circle"></i>',mobile:'<i class="fas fa-info-circle"></i>',id:"info",class:"info",render:"info",history:!0,if:function(){if(isMobile())return!0}}},f={contents:function(e,n){var t=parameters().mt,o={name:"contents",el:l.contents,data:{contents:e,author:r,selected:t}};g.shell(o,function(e){e.el.find(".hasmore .captiontable").on("click",function(){$(this).closest(".hasmore").toggleClass("showedmore")}),n&&n()})},metmenu:function(t){var o={};g.fastTemplate("metmenu",function(e,n){g.app.platform.api.tooltip(t,function(){return o.author=r,n(o)},function(e){e.find(".donate").on("click",function(){p.donate(id),t.tooltipster("hide")}),e.find(".block").on("click",function(){g.app.platform.api.actions.blocking(r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)}),t.tooltipster("hide")}),e.find(".unblock").on("click",function(){g.app.platform.api.actions.unblocking(r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)}),t.tooltipster("hide")})})},o)},panel:function(){var e={};g.user.isItMe(r.address)||(e.author=r.address),g.nav.api.load({open:!0,id:"panel",el:l.panel,animation:!1,essenseData:{discussions:e},clbk:function(e,n){o=n,p.panelPosition(),window.addEventListener("resize",u.panelPosition),window.addEventListener("scroll",p.panelTopPosition)}})},report:function(e,n,t){if(p.destroy(),!e.active&&e.history){var o=["mt"];"shares"==e.id&&!n||o.push("ss"),t||g.app.nav.api.history.addRemoveParameters(o,{report:e.id})}e.active=!0,f[e.render]&&(f[e.render](l.lenta,e),f.menulight(),g.app.platform.sdk.contents.get(r.address,function(e){f.contents(e)}))},menulight:function(){l.menu.find(".usermenuitem").removeClass("active");var e=_.find(d,function(e){return e.active});e&&l.menu.find(".usermenuitem .c"+e.class).addClass("active")},menu:function(e){g.shell({name:"menu",el:l.menu,data:{reports:d}},function(o){o.el.find(".usermenuitem").swipe({tap:function(){var e=$(this).attr("menuitem");d[e]&&f.report(d[e])}}),_.each(d,function(e,n){if(e.events){var t=o.el.find('[menuitem="'+n+'"]');_.each(e.events,function(e,n){"click"==n&&isMobile()?t.swipe({tap:e}):t.on(n,e)})}}),e&&e()})},userslist:function(e,n,t,o,a){g.nav.api.load({open:!0,id:"userslist",el:e,animation:!1,essenseData:{addresses:n,empty:t,caption:o},clbk:function(e,n){a&&a(e,n)}})},info:function(e){g.shell({name:"info",el:e,data:{author:r},animation:"fadeIn"},function(e){e.el.find(".showmoreabout").on("click",p.showmoreabout)})},followers:function(e,t){var n=_.map(deep(r,"data.subscribers")||[],function(e){return e}),o=g.app.localization.e("anofollowers");g.user.isItMe(r.address)&&(o=g.app.localization.e("aynofollowers")),f.userslist(e,n,o,"Followers",function(e,n){t.module=n})},following:function(e,t){var n=_.map(deep(r,"data.subscribes")||[],function(e){return e.adddress}),o=g.app.localization.e("anofollowing");g.user.isItMe(r.address)&&(o=g.app.localization.e("aynofollowing")),f.userslist(e,n,o,"Following",function(e,n){t.module=n})},post:function(s,e){var i=parameters().mt;g.app.platform.sdk.contents.get(r.address,function(e){var n=g.app.platform.sdk.contents.getsorteditems(e),t=_.map(n,function(e){return e.txid}),o=_.indexOf(t,i),a={currentindex:o+1,allength:t.length,leftid:null,rightid:null};0<o&&(a.leftid=t[o-1]),o<t.length-1&&(a.rightid=t[o+1]),g.shell({name:"post",el:s,data:a},function(t){var e="author?address="+r.address,n=app.platform.api.name(r.address);n&&(e=n.toLowerCase()+"?"),g.app.platform.papi.post(i,t.el.find(".postcnt"),function(e,n){external=n,c&&l.c.find(".contentswrapper").hcSticky("refresh"),t.el.find(".postauarrows").addClass("active")},{hr:e})})})},lenta:function(t,o){function a(){var e={name:"lenta",el:t,data:{}};g.shell(e,function(e){if(g.nav.api.load({open:!0,id:"lenta",el:t.find(".authorlentawrapper"),animation:!1,mid:r.address,essenseData:s,clbk:function(e,n){o.module=n,c&&l.c.find(".contentswrapper").hcSticky("refresh")}}),!isMobile()&&r.data&&r.data.name){var n=e.el.find(".authorlentawrappermain");e.el.find(".authorsearchicon .icon").on("click",function(){n.toggleClass("searchactive"),n.hasClass("searchactive")?n.find(".search input").focus():(n.find(".search input").val(""),b())}),new search(e.el.find(".authorsearch"),{placeholder:"SEARCH ON "+r.data.name.toUpperCase(),clbk:function(e){},last:{get:function(){return[]},tpl:function(e,n){}},events:{search:function(e,n,t,o){var a="?report=shares&ss="+e.replace("#","tag:");b(!0);var s={href:a,history:!0,open:!0,handler:!0};g.nav.api.go(s),n&&n(!0)},clear:function(e){}}}),parameters().ss&&(n.addClass("searchactive"),n.find(".search input").val(parameters().ss))}})}var e="author?address="+r.address,n=app.platform.api.name(r.address);n&&(e=n.toLowerCase()+"?");var s={author:r.address,byauthor:!0,hr:e,renderclbk:function(){c&&l.c.find(".contentswrapper").hcSticky("refresh")}};"b"==parameters().r?(e=n.toLowerCase()+"?r=b&mt="+parameters().mt,s.beginmaterial=parameters().mt,s.contents=!0,g.app.platform.sdk.contents.get(r.address,function(e){var n=g.app.platform.sdk.contents.getsorteditems(e);s.txids=_.map(n,function(e){return e.txid}),a()})):(parameters().ss&&(s.search=!0,s.searchValue=parameters().ss,s.loader=function(t){v("posts",deep(h,"data.length")||0,10,function(e){!function(e){var n=g.app.platform.sdk.node.shares.transform(e);t&&t(n,null,{count:10})}(e)})}),a())}},m=function(){},h=null,b=function(e){parameters().ss&&(g.app.platform.sdk.search.clear(),i=h=null,e||f.report(d.shares,!0))},v=function(e,n,t,o){var a=0,s=10;if(h&&(a=h.data.length,s=h.count),console.log(n,t,deep(h,"data.length")),!(n+t<=a)){if(n<a){var i=a-n;n=a,t-=i}s<n+t&&(t=s-n),t<=0||w[e](function(e){o&&o(e)},n,t)}},w={posts:function(t,e,n){g.app.platform.sdk.search.get(parameters().ss,"posts",e,n,i||null,function(e,n){console.log("RESULT",e,h),i=n,t((h=h||e).data)},r.address)}};return{primary:n,parametersHandler:function(){var e=parameters().report||"shares";f.report(d[e],null,!0),f.menu()},authclbk:function(){var e=_.find(d,function(e){return e.active});e&&"shares"!=e.id&&f.report(e,null,!0),p.subscribeLabel()},getdata:function(n,e){r={},g.app.platform.sdk.search.clear();var t=e.settings.essenseData||{},o=parameters();a=e.state,o.address||(o.address=t.address),c=!1,h=i=null,g.sdk.users.addressByName(o.address,function(e){e&&(r.address=e,g.sdk.users.get(r.address,function(){g.sdk.ustate.get(r.address,function(){if(g.app.platform.sdk.address.pnet()&&r.address==g.app.platform.sdk.address.pnet().address){if(d.shares.name=g.app.localization.e("myuposts"),!g.app.user.validate())return void g.nav.api.go({href:"userpage?id=test",history:!0,open:!0})}else d.shares.name=g.app.localization.e("uposts");r.data=g.sdk.users.storage[r.address],r.state=g.sdk.ustate.storage[r.address],n({author:r})})}))})},destroy:function(){t&&t.destroy(),t=null,o&&o.destroy(),window.removeEventListener("resize",u.panelPosition),window.removeEventListener("scroll",p.panelTopPosition),window.removeEventListener("scroll",u.showHideUp),delete g.app.platform.ws.messages.event.clbks.author,delete g.app.platform.clbks.api.actions.subscribe.author,delete g.app.platform.clbks.api.actions.unsubscribe.author,delete g.app.platform.clbks.api.actions.subscribePrivate.author,p.destroy();var e=deep(g,"app.modules.menu.module.destroyauthorsearch");e&&isMobile()&&e(),l={}},init:function(e){setTimeout(function(){var e=deep(g,"app.modules.menu.module.initauthorsearch");e&&isMobile()&&(r.clear=b,e(r))},300),m(),(l={}).c=e.el.find("#"+g.map.id),l.lenta=l.c.find(".lentaWrapper"),l.menu=l.c.find(".usermenu"),l.panel=l.c.find(".panel"),l.caption=l.c.find(".bgCaption"),l.fxd=l.c.find(".fxd"),l.subscribe=l.c.find(".subscribebuttonstop"),l.up=l.c.find(".upbuttonwrapper"),l.w=$(window),l.contents=l.c.find(".contentswrapper"),l.info=l.c.find(".authorinfoWrapper"),function(e){var n=parameters().report||"shares";d[n].active=!0,f.report(d[n],null,e),f.menu(),g.app.user.isState(function(e){if(e){var n=g.app.platform.sdk.users.storage[g.app.platform.sdk.address.pnet().address];n&&n.relation(r.address,"blocking")&&l.caption.addClass("blocking")}}),t=g.app.platform.api.upbutton(l.up,{top:function(){return"65px"},class:"light",rightEl:l.c.find(".leftpanelcell")}),g.app.platform.sdk.contents.get(r.address,function(e){f.contents(e)}),isMobile()||f.info(l.info)}(!0),l.up.on("click",u.up),l.subscribe.find(".subscribe").on("click",u.subscribe),l.subscribe.find(".unsubscribe").on("click",u.unsubscribe),l.c.find(".notificationturn").on("click",u.subscribePrivate),l.caption.find(".unblocking").on("click",function(){dialog({html:g.app.localization.e("e13023"),btn1text:g.app.localization.e("unblock"),btn2text:g.app.localization.e("ucancel"),class:"zindex",success:function(){g.app.platform.api.actions.unblocking(r.address,function(e,n){e||g.app.platform.errorHandler(n,!0)})}})}),g.app.platform.ws.messages.event.clbks.author=function(e){"subscribe"!=e.mesType&&"unsubscribe"!=e.mesType||(l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count()))},g.app.platform.clbks.api.actions.subscribe.author=function(e){e==r.address&&(l.subscribe.addClass("following"),l.c.find(".notificationturn").removeClass("turnon"),l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count())),g.app.user.address.value.toString("hex")==r.address&&(l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count()))},g.app.platform.clbks.api.actions.subscribePrivate.author=function(e){e==r.address&&(l.subscribe.addClass("following"),l.c.find(".notificationturn").addClass("turnon"),l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count())),g.app.user.address.value.toString("hex")==r.address&&(l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count()))},g.app.platform.clbks.api.actions.unsubscribe.author=function(e){e==r.address&&(l.subscribe.removeClass("following"),l.c.find(".notificationturn").removeClass("turnon"),l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count())),g.app.user.address.value.toString("hex")==r.address&&(l.c.find('.toReport[report="followers"] .count').html(d.followers.count()),l.c.find('.toReport[report="following"] .count').html(d.following.count()))},g.app.platform.clbks.api.actions.blocking.author=function(e){e==r.address&&(l.caption.addClass("blocking"),l.c.find(".notificationturn").removeClass("turnon"))},g.app.platform.clbks.api.actions.unblocking.author=function(e){e==r.address&&l.caption.removeClass("blocking")},g.user.isItMe(r.address)&&g.app.nav.api.backChainClear(),e.clbk(null,e)}}}var g=new nModule,o={};return g.run=function(e){var n=g.addEssense(o,t,e);g.init(n,e)},g.stop=function(){_.each(o,function(e){e.destroy()})},g.authclbk=function(){_.each(o,function(e){e.authclbk()})},g}();"undefined"!=typeof module?module.exports=author:(app.modules.author={},app.modules.author.module=author);
 /*_____*/ 
var ustate=function(){function n(e){function t(n){r.app.platform.sdk.user.waitActions(function(t){r.app.platform.sdk.ustate.me(function(e){s=t,l=e,c.uscnt(function(){o.ustatecontent=o.c.find(".ustatecontent"),c.ustatecontent(),c.reputationsteps(),n&&n()})},!0)})}var o,l,s,n=deep(e,"history"),a=makeid(),i={post:{key:"post",vis:"scale",name:r.app.localization.e("spc"),bad:function(e){if(e<=2)return!0}},score:{key:"score",vis:"scale",name:r.app.localization.e("ssc"),bad:function(e){if(e<=10)return!0}},comment:{key:"comment",vis:"scale",name:r.app.localization.e("ccc"),bad:function(e){if(e<=10)return!0}},comment_score:{key:"comment_score",vis:"scale",name:r.app.localization.e("crc"),bad:function(e){if(e<=10)return!0}}},c={gifts:function(a){console.log("renders"),r.app.platform.sdk.processes.get(function(e){r.app.platform.sdk.processes.gifts(function(o){console.log(e,o,r.app.platform.sdk.processes.level(l.reputation));var s=r.app.platform.sdk.processes.level(l.reputation);s&&_.each(e,function(t){if(t.level){var e=a.find('.level[level="'+t.level+'"]');if(t.level<s.level){var n=_.find(o,function(e){return e.amount==1e8*t.bonus});console.log(n,1e8*t.bonus,o),n?e.removeClass("waitgift"):e.addClass("waitgift")}}})})})},currentLevel:function(a){r.app.platform.sdk.processes.get(function(e){var s=r.app.platform.sdk.processes.level(l.reputation);s&&_.each(e,function(e){if(e.level){var t=a.find('.level[level="'+e.level+'"]'),n="next",o=t.find(".line");e.level<s.level&&(n="completed",o.removeAttr("width")),e.level==s.level&&(n="current",o.width(100*s.perc+"%")),e.level>s.level&&(next="next",o.removeAttr("width")),t.attr("state",n)}})})},reputationsteps:function(n){r.app.platform.sdk.processes.get(function(e){var t=r.app.platform.sdk.processes.level(l.reputation);r.shell({name:"reputation",el:o.c.find(".ustatecontentrep"),data:{reputation:l.reputation,level:t,levels:e}},function(e){c.currentLevel(e.el),c.gifts(e.el),e.el.find(".tooltip").tooltipster({theme:"tooltipster-light",maxWidth:600,zIndex:20}),n&&n()})})},uscnt:function(t){r.shell({name:"uscnt",el:o.c.find(".mwork"),data:{mestate:l,metrics:i}},function(e){t&&t()})},ustatecontent:function(t){var e=i;r.shell({name:"ustatecontentnew",el:o.ustatecontent,data:{metrics:e,mestate:l,waitActions:s}},function(e){t&&t()})}},p=function(){};return{primary:n,getdata:function(e){({});e({})},destroy:function(){o={},delete r.app.platform.ws.messages["new block"].clbks.ustate,delete r.app.platform.sdk.ustate.clbks[a]},init:function(e){p(),(o={}).c=e.el.find("#"+r.map.id),(r.app.platform.sdk.ustate.clbks[a]=t)(function(){r.app.platform.ws.messages["new block"].clbks.ustate=function(e){r.app.platform.sdk.user.waitActions(function(e){s=e,c.ustatecontent()})},e.clbk(null,e)})},tooltip:{options:{minWidth:380,position:"left",functionPosition:function(e,t,n){return n.coord.top=10,n.coord.left+=10,n},theme:"tooltipster-light zindex ustatetooltip"}}}}var r=new nModule,o={};return r.run=function(e){var t=r.addEssense(o,n,e);r.init(t,e)},r.stop=function(){_.each(o,function(e){e.destroy()})},r}();"undefined"!=typeof module?module.exports=ustate:(app.modules.ustate={},app.modules.ustate.module=ustate);
 /*_____*/ 
var socialshare=function(){function i(e){var t,a,i=deep(e,"history"),n=(m.app.localization.e("e13171"),m.app.localization.e("e13172")+"\r\n"),o={},s=!1,c="",r=deep(window,"plugins.socialsharing"),l=function(){return console.log("calltoActionUserText",c),!t||s?"":c||n},p=function(){m.shell({name:"sharebuttons",el:a.c.find(".sharebuttons"),data:{socials:d()}},function(e){g()})},d=function(){return _.filter(f,function(e){if(!e.if||e.if())return!0})},f=[{n:"Email",i:'<i class="far fa-envelope"></i> '+m.app.localization.e("e13173"),t:"email",c:"#f82a53"},{n:"SMS",i:"SMS",t:"sms",c:"#143e50",s:"shareViaSMS",if:function(){return deep(window,"plugins.socialsharing.canShareVia")}},{n:"Facebook",i:'<i class="fab fa-facebook-f"></i>',t:"facebook",c:"#3b5999",if:function(){return deep(window,"plugins.socialsharing.canShareVia")||!window.cordova}},{n:"Instagram",i:'<i class="fab fa-instagram"></i>',t:"instagram",c:"#fd1d1d",s:"shareViaInstagram",if:function(){return deep(window,"plugins.socialsharing.canShareVia")}},{n:"Twitter",i:'<i class="fab fa-twitter"></i>',t:"twitter",c:"#55acee",if:function(){return deep(window,"plugins.socialsharing.canShareVia")||!window.cordova}},{n:"Reddit",i:'<i class="fab fa-reddit-alien"></i>',t:"reddit",c:"#ff5700"},{n:"Pinterest",i:'<i class="fab fa-pinterest-p"></i>',t:"pinterest",c:"#bd081c"},{n:"LinkedIn",i:'<i class="fab fa-linkedin-in"></i>',t:"linkedin",c:"#0077B5"},{n:"Whatsapp",i:'<i class="fab fa-whatsapp"></i>',t:"whatsapp",c:"#075e54",s:"shareViaWhatsApp",if:function(){return deep(window,"plugins.socialsharing.canShareVia")||!window.cordova}}],u=function(){m.app.settings.set(m.map.id,"calltoActionNotInclude",s),m.app.settings.set(m.map.id,"calltoActionUserText",c)},h=function(){c=m.app.settings.get(m.map.id,"calltoActionUserText")||"",s=m.app.settings.get(m.map.id,"calltoActionNotInclude")||!1},g=function(){a.c.find(".socialsharebtn").each(function(){var e=$(this);if(e.hasClass("s_email"))e.on("click",function(){var e=l()+"\r\n"+o.title+"\r\n\r\n"+o.text+"\r\n\r\n\r\n"+o.url;deep(app,"platform.sdk.user.storage.me.name")&&(e+="\r\n\r\nBest,\r\n"+deep(app,"platform.sdk.user.storage.me.name"));var a="";a+="mailto:",a+="?subject="+o.title,a+="&body=",a+=encodeURIComponent(e),window.location.href=a,m.app.platform.m.log("sharing_by","email")});else{var a=o.text,i=o.title;a=trim(l()+" "+a);var t=function(a){return _.find(f,function(e){return e.t==a})}(e.data("type"));if(t&&t.s&&window.cordova&&r){var n=t.s;e.on("click",function(){"shareViaFacebook"!=n&&"shareViaTwitter"!=n&&"shareViaWhatsApp"!=n||r[n](a,o.image,o.url),"shareViaInstagram"==n&&r[n](a,o.image),"shareViaSMS"==n&&r[n]({message:a+" "+o.url,subject:i,image:o.image})})}else e.ShareLink({title:i,text:a,image:o.image,url:o.url,class_prefix:"s_",width:640,height:480});e.on("click",function(){var e=$(this).data("type");m.app.platform.m.log("sharing_by",e)})}})};return{primary:i,getdata:function(e,a){if(t=a.state,o=a.settings.essenseData||{},h(),o.title||(o.title="Pocketnet"),o.text||(o.text=m.app.localization.e("e13171")),o.image||(o.image="https://pocketnet.app/img/logobigpadding.png"),!o.url)if("undefined"!=typeof _Electron||window.cordova){var i=(a=window.location.pathname.split("/"))[a.length-1];o.url="https://pocketnet.app/"+i+window.location.search}else o.url="https://pocketnet.app/"+m.app.nav.get.href();m.app.platform.sdk.address.pnet()&&(o.url=m.app.nav.api.history.addParametersToHref(o.url,{ref:m.app.platform.sdk.address.pnet().address})),e({socials:d(),url:o.url,rescue:o.rescue||!1,caption:o.caption,calltoActionUserText:c||n,calltoActionNotInclude:s})},destroy:function(){a={}},init:function(e){h(),(a={}).c=e.el.find("#"+m.map.id),a.url=a.c.find(".url"),a.c.find(".copycell").on("click",function(){copyText(a.url.find(".urlcell")),sitemessage(m.app.localization.e("urlsuccesscopied"))}),a.c.find(".changecallto").on("click",function(){s=!s,$(".additionalwrapper").toggleClass("checked"),s&&a.c.removeClass("textshowed"),u(),p()}),a.c.find(".morecell").on("click",function(){a.c.toggleClass("textshowed"),a.c.closest(".wnd").toggleClass("textshowedwnd")}),a.c.find(".calltoActionUserText").on("keyup",function(){(c=$(this).val())==n&&(c=""),u(),p()}),a.c.find(".calltoActionUserText").on("change",function(){c||a.c.find(".calltoActionUserText").val(n)}),p(),e.clbk(null,e)},wnd:{swipeClose:!0,swipeMintrueshold:30,header:m.app.localization.e("e13174"),class:"sharingwindow"}}}var m=new nModule,t={};return m.run=function(e){var a=m.addEssense(t,i,e);m.init(a,e)},m.stop=function(){_.each(t,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=socialshare:(app.modules.socialshare={},app.modules.socialshare.module=socialshare);
 /*_____*/ 
var post=function(){function a(s){var i,r,d,o,a=deep(s,"history")||deep(s,"primary"),p="",l=null,c=0,t=!1,u={authclbk:function(){t=!0;var e=r.txid;W.app.platform.sdk.node.shares.getbyid(e,function(){delete(r=W.app.platform.sdk.node.shares.storage.trx[e]).myVal,u.subscribeLabel(),D.mystars(function(){t=!1})})},subscribeLabel:function(){var e=W.app.user,s=!1;if(!(e.address.value&&r.address==e.address.value)&&e.address.value){var a=deep(W.app,"platform.sdk.users.storage."+e.address.value);a&&a.relation(r.address,"subscribes")&&(s=!0)}if(i.c){var t=i.share.find(".shareTable");s?t.addClass("subscribed"):t.removeClass("subscribed")}},stateAction:function(s){W.app.user.isState(function(e){e?s():W.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{fast:!0,loginText:W.app.localization.e("llogin"),successHref:"_this",signInClbk:function(){retry(function(){return!t},function(){s&&s()})}}})})},postscores:function(e){W.app.nav.api.load({open:!0,href:"postscores?p="+r.txid,inWnd:!0,history:!0,essenseData:{share:r.txid,like:function(e){D.stars(),d.like&&d.like()}},clbk:function(){e&&e()}})},repost:function(s){u.stateAction(function(){var e="index";isMobile()&&(e="share"),W.closeContainer(),W.nav.api.load({open:!0,href:e+"?repost="+s,history:!0,handler:!0,essenseData:{},clbk:function(e){}})})},next:function(){i.wnd.off("scroll");var s=i.c.find(".nextpost");s.html('<div class="loader"><div class="preloader5"><span></span><span></span><span></span></div></div>'),d.next(r.txid,function(e){e?W.nav.api.load({open:!0,href:"post?s="+e,eid:"nextpost"+e,el:s,clbk:function(){},essenseData:{share:e,hr:d.hr,like:d.like,next:d.next,removemargin:!0}}):s.html('<div class="ended">'+W.app.localization.e("e13146")+"</div>")})},sharesocial:function(e){var s="https://pocketnet.app/"+(d.hr||"index?")+"s="+r.txid+"&mpost=true&ref="+W.app.platform.sdk.address.pnet().address;parameters().address&&(s+="&address="+(parameters().address||""));var a=r.message,t=trimHtml(a,130).replace(/ &hellip;/g,"...").replace(/&hellip;/g,"..."),n=r.images[0];if(!n&&r.url){var i=videoImage(r.url);i&&(n=i)}var o="Post";"a"==r.settings.v&&(o="Article"),W.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:s,caption:W.app.localization.e("e13147")+" "+o,image:n,title:r.caption||deep(app,"platform.sdk.usersl.storage."+r.address+".name"),text:t}})},donate:function(e){var s=deep(app,"platform.sdk.usersl.storage."+r.address)||{address:r.address,addresses:[]},a="send?address="+r.address+"&amount=1&message="+hexEncode(W.app.localization.e("postlabel")+" &mdash; "+(r.caption||r.message).substr(0,20)+"...")+"&label="+(s.name||s.address)+"&setammount=true";W.fastTemplate("donation",function(e){dialog({html:e,class:"one donation",btn1text:W.app.localization.e("dcancel"),clbk:function(e,s){e.find(".pnetdnt").on("click",function(){W.nav.api.load({open:!0,href:a,history:!0}),W.closeContainer(),s.destroy()}),e.find(".copy").on("click",function(){var e=$(this).closest(".address").find(".addr");copyText(e),sitemessage(W.app.localization.e("successfullycopiedaddress"))})}})},{userinfo:s})},position:function(){if(!isMobile()&&!a&&!d.removemargin){var e=($(window).height()-i.wr.height())/2;0<e?i.wr.css("margin-top",e+"px"):i.wr.css("margin-top","0px")}},initVideo:function(a){if(console.log("ADDED VIDEO 1"),!W.app.platform.sdk.usersettings.meta.embedvideo||W.app.platform.sdk.usersettings.meta.embedvideo.value){var e=i.c.find(".js-player, [data-plyr-provider][data-plyr-embed-id]");if(e.length){var t={resetOnEnd:!0,muted:!1};$.each(e,function(e,s){console.log("ADDED VIDEO 2"),PlyrEx(s,t,function(e){e.on("ready",function(){a&&a()})})})}}},likeWithR:function(e,s){},like:function(e,a){var s=r.upvote(e);if(!s)return W.app.platform.errorHandler("4",!0),void(a&&a(!1));W.sdk.node.transactions.create.commonFromUnspent(s,function(e,s){topPreloader(100),e?a&&a(!0):(r.myVal=null,W.app.platform.errorHandler(s,!0),a&&a(!1))})},complain:function(e){W.nav.api.load({open:!0,id:"complain",inWnd:!0,essenseData:{item:"post",obj:r,success:function(){}},clbk:function(){}})},unsubscribe:function(a){W.app.platform.api.actions.unsubscribe(r.address,function(e,s){e||W.app.platform.errorHandler(s,!0),a&&a(e,s)})},subscribe:function(a){W.app.platform.api.actions.subscribe(r.address,function(e,s){e||W.app.platform.errorHandler(s,!0),a&&a(e,s)})},openGalleryRec:function(a,e){var t=[],n=function(e,a){_.each(e.images,function(e){t.push(e)}),e.repost?W.app.platform.sdk.node.shares.getbyid(e.repost,function(e){var s=e[0];s?n(s,a):a&&a()}):a&&a()};n(r,function(){var e=_.map(t,function(e){return{src:e}}),s=findIndex(e,function(e){if(e.src==a)return!0});W.app.nav.api.load({open:!0,href:"imagegallery?i="+r.txid+"&num="+(s||0),inWnd:!0,history:"true",essenseData:{initialValue:a,idName:"src",images:e}})})},openGallery:function(s){var e=_.map(r.images,function(e){return{src:e}}),a=findIndex(e,function(e){if(e.src==s)return!0});W.app.nav.api.load({open:!0,href:"imagegallery?i="+r.txid+"&num="+(a||0),inWnd:!0,history:"true",essenseData:{initialValue:s,idName:"src",images:e}})}},n=function(){u.postscores()},f=function(){u.repost(r.txid)},m=function(){var e=$(this),s=r.txid;W.app.platform.api.metmenu(e,s,u)},h=function(e){u.unsubscribe(function(){tx&&i.share.find(".shareTable").removeClass("subscribed")})},b=function(){var e="notificationsTurnOn";$(this).hasClass("turnon")&&(e="notificationsTurnOff"),W.app.platform.api.actions[e](r.address,function(e,s){e||W.app.platform.errorHandler(s,!0)})},v=function(e){u.stateAction(function(){W.app.platform.api.actions.subscribeWithDialog(r.address,function(e,s){e?i.share.find(".shareTable").addClass("subscribed"):W.app.platform.errorHandler(s,!0)})})},g=function(){W.app.platform.sdk.node.transactions.get.tx(r.txid)},k=function(){var t=$(this).attr("value");u.stateAction(function(){if(W.app.platform.sdk.address.pnet()&&r.address!=W.app.platform.sdk.address.pnet().address){var a=$(this).closest(".stars");a.attr("value")||(a.attr("value",t),a.addClass("liked"),u.like(t,function(e){if(e){r.scnt||(r.scnt=0),r.score||(r.score=0),r.scnt++,r.score=Number(r.score||0)+Number(t);var s=Number(r.score)/Number(r.scnt);a.find(".tstarsov").css("width",s/5*100+"%"),a.closest(".itemwr").find(".count span.v").html(s.toFixed(1)),D.stars(),d.like&&d.like(r)}else a.removeAttr("value"),a.removeClass("liked")}))}})},y=function(){dialog({html:W.app.localization.e("e13148"),btn1text:W.app.localization.e("dyes"),btn2text:W.app.localization.e("dno"),success:function(){i.share.addClass("complained"),topPreloader(30),u.complain(function(e){topPreloader(100),e||s.removeClass("hidden")})}})},x=function(){var e=$(this).attr("i");u.openGalleryRec(e)},w=function(){W.app.platform.m.log("sharing_opened_post",r.txid),u.sharesocial()},C=function(){u.donate()},D={comments:function(n){!d.repost||d.fromempty?W.fastTemplate("commentspreview",function(e){var s=i.c.find(".commentsWrapper"),a="";W.app.platform.sdk.address.pnet()&&(a="&ref="+W.app.platform.sdk.address.pnet().address);var t="https://pocketnet.app/"+(d.hr||"index?")+"s="+r.txid+"&mpost=true"+a;parameters().address&&(t+="&address="+(parameters().address||"")),W.nav.api.load({open:!0,id:"comments",el:s,eid:(d.eid||"")+r.txid+"post",essenseData:{hr:t,totop:i.c,caption:e,send:function(){var e=i.c.find(".commentsAction .count span");e.html(Number(e.html()||"0")+1)},txid:r.txid,reply:d.reply,showall:!d.fromempty,init:d.fromempty||!1,preview:d.fromempty||!1,fromtop:!d.fromempty,fromempty:d.fromempty,lastComment:d.fromempty?r.lastComment:null,additionalActions:function(){W.closeContainer()}},clbk:function(e,s){u.position(),o=s,n&&n()}})},{share:r}):n&&n()},empty:function(){W.shell({name:"empty",el:i.share},function(e){u.position()})},images:function(e){var s=i.c.find(".image"),a=i.c.find(".images");!a.hasClass("active")&&s.length&&a.length?s.imagesLoaded({background:!0},function(i){"a"!=r.settings.v&&_.each(i.images,function(e,s){var a=e.img,t=$(i.elements[s]).closest(".imagesWrapper"),n=t.width();t.height(),a.width,a.height;a.width<t.width()?(t.find(".image").width(a.width),t.find(".image").height(a.height)):t.height(n*(a.height/a.width))}),a.addClass("active"),s.addClass("active"),e&&e()}):e&&e()},share:function(s){W.shell({turi:"lenta",name:"share",el:i.share,additionalActions:function(){W.closeContainer()},data:{share:r,all:!0,mestate:{},repost:d.repost,fromempty:d.fromempty}},function(e){i.stars=i.share.find(".forstars"),u.position(),i.wr.addClass("active"),D.stars(function(){D.mystars(function(){}),D.url(function(){D.repost(),u.position(),D.urlContent(function(){u.position(),u.initVideo(),D.images(function(){d.repost||(u.position(),i.share.find(".complain").on("click",y),i.share.on("click",".image",x),i.share.on("click",".forrepost",f),i.share.find(".txid").on("click",g),i.share.find(".donate").on("click",C),i.share.find(".sharesocial").on("click",w),i.share.find(".asubscribe").on("click",v),i.share.find(".aunsubscribe").on("click",h),i.share.find(".metmenu").on("click",m),i.share.find(".notificationturn").on("click",b)),s&&s()})})})})})},wholike:function(s){console.log("share",r);var e=r.who||[];W.shell({turi:"lenta",name:"wholike",el:i.share.find(".wholikes"),data:{scores:Number(r.scnt),wholikes:e},bgImages:{}},function(e){e.el.find(".wholikesTable").on("click",n),s&&s()})},mystars:function(e){if(void 0===r.myVal){var s=[r.txid];W.app.platform.sdk.likes.get(s,function(){D.stars(),D.wholike(e)})}else e&&e()},stars:function(s){W.shell({turi:"lenta",name:"stars",el:i.stars,data:{share:r}},function(e){fastars(e.el.find(".stars")),i.share.find(".stars i").on("click",k),s&&s()})},repost:function(e){r.repost&&W.shell({turi:"lenta",name:"repost",el:i.c.find(".repostWrapper"),data:{repost:r.repost,level:c,share:r}},function(e){u.position(),e.el&&e.el.length&&W.app.platform.papi.post(r.repost,e.el.find(".repostShare"),function(e){l=e,u.position()},{repost:!0,eid:p+r.txid,level:c,fromempty:r.isEmpty()})})},url:function(s){var e=r.url,a=W.app.platform.sdk.remote.storage[e];W.shell({turi:"share",name:"url",el:i.c.find(".url"),data:{url:e,og:a,share:r},additionalActions:function(){W.closeContainer()}},function(a){var t=a.el.find("img");a.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,s){e.isLoaded?($(t[s]).addClass("active"),500<e.img.naturalWidth&&a.el.addClass("bigimageinlink")):$(t[s]).closest(".image").css("display","none")}),s&&s()})})},urlContent:function(s){var e=r.url;if(e){var a=W.app.platform.parseUrl(e),t=W.app.platform.sdk.remote.storage[e];e&&!t?"youtube"==a.type||"vimeo"==a.type||"bitchute"==a.type||"peertube"==a.type?s&&s():W.app.platform.sdk.remote.get(e,function(e){e?D.url(s):s&&s()}):s&&s()}else s&&s()}},T=function(){};return{primary:a,getdata:function(t,n){l=null,p=n.settings.eid||"";var s=deep(n,"settings.essenseData.share")||parameters().s;d=deep(n,"settings.essenseData")||{},r=null,c=(d.level||-1)+1,W.app.platform.sdk.node.shares.getbyid([s],function(){if(!(r=W.app.platform.sdk.node.shares.storage.trx[s])){var e=_.find(W.sdk.node.transactions.temp.share,function(e){return e.txid==s});e&&((r=new pShare)._import(e,!0),r.temp=!0,r.address=W.app.platform.sdk.address.pnet().address)}r&&W.app.platform.sdk.node.shares.users([r],function(e,s){var a={ed:deep(n,"settings.essenseData")||{}};t(a)})})},authclbk:function(){void 0!==i&&i.c&&u.authclbk()},destroy:function(e){i={},d.close&&d.close(),o&&o.destroy(),delete W.app.platform.ws.messages.event.clbks.post,delete W.app.platform.ws.messages.transaction.clbks.temppost,delete W.app.platform.clbks.api.actions.subscribePrivate.post,delete W.app.platform.clbks.api.actions.unsubscribe.post,delete W.app.platform.clbks.api.actions.subscribe.post,t=!1,l&&(l.destroy(),l=null)},clearparameters:["s","commentid","parentid"],init:function(e){T(),(i={}).c=e.el.find("#"+W.map.id),i.share=i.c.find(".share"),i.wr=i.c.find(".postWrapper"),i.wnd=i.c.closest(".wndcontent"),r?D.share(function(){D.comments(function(){})}):D.empty(),e.clbk(null,e),W.app.platform.ws.messages.transaction.clbks.temppost=function(e){e.temp&&r.txid==e.temp.txid&&(r.temp=!1,r.scnt="0",r.score="0",r.myVal=0,D.share())},W.app.platform.ws.messages.event.clbks.post=function(e){"upvoteShare"==e.mesType&&e.share&&r.txid==e.share.txid&&D.stars(function(){})},W.app.platform.clbks.api.actions.subscribePrivate.post=function(e){if(e==r.address){i.c.find('.shareTable[address="'+e+'"]').addClass("subscribed");var s=deep(W.app,"platform.sdk.users.storage."+W.user.address.value.toString("hex"));if(s){var a=s.relation(e,"subscribes");i.c.find('.shareTable[address="'+e+'"] .notificationturn').removeClass("turnon"),!a||"true"!=a.private&&!0!==a.private?i.c.find('.shareTable[address="'+e+'"] .notificationturn').removeClass("turnon"):i.c.find('.shareTable[address="'+e+'"] .notificationturn').addClass("turnon")}}},W.app.platform.clbks.api.actions.subscribe.post=function(e){e==r.address&&(i.c.find('.shareTable[address="'+e+'"]').addClass("subscribed"),i.c.find('.shareTable[address="'+e+'"] .notificationturn').removeClass("turnon"))},W.app.platform.clbks.api.actions.unsubscribe.post=function(e){e==r.address&&(i.c.find(".shareTable").removeClass("subscribed"),i.c.find('.shareTable[address="'+e+'"] .notificationturn').removeClass("turnon"))}},wnd:{class:"withoutButtons postwindow",swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30,close:function(){}}}}var W=new nModule,t={};return W.authclbk=function(){_.each(t,function(e){e.authclbk()})},W.run=function(e){var s=W.addEssense(t,a,e);W.init(s,e)},W.stop=function(){_.each(t,function(e){e.destroy()})},W}();"undefined"!=typeof module?module.exports=post:(app.modules.post={},app.modules.post.module=post);
 /*_____*/ 
var main=function(){function a(n){function e(n,e){localStorage.lentakey=parameters().r||"index",f.lenta(n,e),v(),h.app.user.isState(function(n){isMobile()||f.panel(),f.addpanel()}),f.smallpanel()}var t,a,o=deep(n,"history"),i=null,l=null,r=null,s=null,d="common",c=!1,p={addbutton:function(){h.nav.api.load({open:!0,id:"share",inWnd:!0,eid:"postin",clbk:function(n,e){h.app.platform.m.log("share_openbutton","button")},essenseData:{close:function(){r.make()},post:function(){r.make(),h.app.platform.m.log("share","button")},hello:!0,absolute:!0}})},addbuttonscroll:function(){400<$(window).scrollTop()?t.addbutton.addClass("scrollactive"):t.addbutton.removeClass("scrollactive")},panelTopPosition:function(){},panelPosition:function(){},currentMode:function(){"recommended"==d?h.nav.api.history.addParameters({r:"recommended"}):"sub"==d?h.nav.api.history.addParameters({r:"sub"}):h.nav.api.history.removeParameters(["r"]),f.lenta(),v(),f.smallpanel()}},u=function(){d=$(this).attr("lenta"),p.currentMode()},m=function(){p.panelPosition()},f={addpanel:function(){h.app.user.isState(function(n){n&&(n&&!isMobile()?t.addbutton.addClass("active"):t.addbutton.removeClass("active"))})},smallpanel:function(){t.smallpanel.find(".item").removeClass("active"),t.smallpanel.find('.item[lenta="'+d+'"]').addClass("active")},share:function(){isMobile()||h.nav.api.load({open:!0,id:"share",el:t.share,animation:!1,clbk:function(n,e){r=e,c&&t.panel.hcSticky("refresh")},essenseData:{post:function(){h.app.platform.m.log("share","normal")}}})},panel:function(){h.nav.api.load({open:!0,id:"panel",el:t.panel,animation:!1,clbk:function(n,e){a=e,p.panelPosition(),window.addEventListener("resize",m),window.addEventListener("scroll",p.panelTopPosition),t.panel.hcSticky({stickTo:"#main",top:76,bottom:177})}})},lenta:function(a,e){e=e||{},f.addpanel(),h.app.user.isState(function(n){h.nav.api.load({open:!0,id:"lenta",el:t.lenta,animation:!1,mid:"main",essenseData:{hr:"index?",goback:e.goback,r:null,renderclbk:function(){c&&t.panel.hcSticky("refresh")}},clbk:function(n,e){s=s||h.app.platform.api.upbutton(t.up,{top:function(){return"65px"},rightEl:t.c.find(".lentacell")}),l=e,a&&a()}})})}},b=function(){},v=function(){h.app.user.isState(function(n){n&&(isMobile()||("common"==d?(f.share(),t.c.find(".bgCaption").removeClass("hidden")):(t.share.html(""),t.c.find(".bgCaption").addClass("hidden"))))})};return{primary:o,parametersHandler:function(n){var e=d;localStorage.lentakey=parameters().r||"index",e=parameters().r?parameters().r:"common",d!=e&&(d=e,l&&l.destroy(),f.lenta()),v(),n&&n()},authclbk:function(){void 0!==t&&t.c&&(t.c.find(".bgCaption").removeClass("hidden"),v(),c&&t.panel.hcSticky("refresh"))},getdata:function(n,e){c=!1;var a=parameters();if(d=a.r?a.r:"common",beginmaterial=a.s||a.i||a.v||null,console.log("TEST"),e.state&&o&&!h.app.user.validate())h.nav.api.load({open:!0,href:"userpage?id=test",history:!0});else{n({})}},destroy:function(){s&&s.destroy(),s=null,window.removeEventListener("scroll",p.panelTopPosition),window.removeEventListener("resize",m),window.removeEventListener("scroll",p.addbuttonscroll),i&&i.destroy(),l&&l.destroy(),r&&r.destroy(),a&&a.destroy(),l=i=a=null},init:function(n){l=i=null,b(),(t={}).c=n.el.find("#"+h.map.id),t.share=t.c.find(".share"),t.lenta=t.c.find(".lentaWrapper"),t.panel=t.c.find(".panel"),t.up=t.c.find(".upbuttonwrapper"),t.smallpanel=t.c.find(".smallpanell"),t.addbutton=t.c.find(".addbutton"),t.w=$(window),window.addEventListener("scroll",p.addbuttonscroll),t.smallpanel.find(".item").on("click",u),t.addbutton.on("click",p.addbutton),e(function(){n.clbk(null,n)},n)}}}var h=new nModule,t={};return h.run=function(n){var e=h.addEssense(t,a,n);h.init(e,n)},h.stop=function(){var a=null;return _.each(t,function(n){var e=n.destroy();e&&(a=e)}),a},h.authclbk=function(){_.each(t,function(n){n.authclbk()})},h}();"undefined"!=typeof module?module.exports=main:(app.modules.main={},app.modules.main.module=main);
 /*_____*/ 
var lenta=function(){function n(e){function t(){if(isMobile()&&v){var n=c.c.find(".circularprogress"),a=new CircularProgress({radius:30,strokeStyle:"#00A3F7",lineCap:"round",lineWidth:1,font:"100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#00A3F7",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});a.update(70),c.c.find(".circularprogressWrapper").html(a.el);var s=c.c.find(".loadprev"),e=new SwipeParallax({el:c.c.find(".shares"),allowPageScroll:"vertical",directions:{down:{cancellable:!0,positionclbk:function(e){var t=Math.abs(e)/200;0<=e&&(a.options.text={value:""},a.update(100*t),n.height(220*t+"px"),s.css("opacity",1-4*t))},constraints:function(){if(0==d.scrollTop()&&!W)return!0},restrict:!0,trueshold:200,clbk:function(){fe.app.platform.sdk.notifications.getNotifications(),z.loadprev(function(){e.renew()})}}}}).init()}function t(e){if(!L&&"recommended"!=o&&!p.author&&!p.search){var t=_.toArray(fe.sdk.node.transactions.temp.share||{}),n=0;t.length&&!o&&(n-=t.length),0<(e||0)+n&&(S=S+(e||0)+n,c.c.addClass("showprev"),c.c.find(".countnew").html("("+S+")"))}}window.addEventListener("scroll",B),window.addEventListener("scroll",G),window.addEventListener("resize",F),p.notscrollloading||window.addEventListener("scroll",O),c.c.on("click",".wholikesTable",j),c.c.on("click",".stars i",q),c.c.on("click",".complain",Z),c.c.on("click",".imageOpen",K),c.c.on("click",".txid",U),isMobile()||(c.c.on("click",".sharecaption",ne),c.c.on("click",".message",ne)),c.c.on("click",".showMore",ne),c.c.on("click",".forrepost",H),c.c.on("click",".videoTips",te),c.c.on("click",".videoOpen",te),c.c.on("click",".exitFull",ee),c.c.on("click",".additional",J),c.c.on("click",".asubscribe",X),c.c.on("click",".aunsubscribe",Y),c.c.on("click",".notificationturn",Q),c.c.on("click",".donate",se),c.c.on("click",".sharesocial",ae),c.c.on("click",".discussion",ie),c.c.on("click",".metmenu",N),c.c.find(".loadmore button").on("click",re),c.c.find(".loadprev button").on("click",oe),c.c.on("click",".showmorebyauthor",D),c.c.on("click",".commentsAction",R),p.txids||(fe.app.platform.sdk.node.shares.clbks.added.lenta=function(e){e.txidEdit?(delete m[e.txidEdit],delete g[e.txidEdit],delete b[e.txidEdit],replaceEqual(y,{txid:e.txidEdit},e)&&le.shares([e],function(){le.sharesInview([e],function(){})},{inner:replaceWith,el:c.shares.find("#"+e.txidEdit),ignoresw:!0})):le.shares([e],function(){le.sharesInview([e],function(){})},{inner:prepend})},fe.app.platform.ws.messages.transaction.clbks.temp=function(t){if(t.temp){var e=_.find(y,function(e){if(e.txid==t.temp.txid)return!0});e&&(e.temp=!1,e.scnt="0",e.score="0",e.myVal=0,e.time=new Date,g[e.txid]=!1,le.sharesInview([e],function(){}))}},fe.app.platform.ws.messages.event.clbks.lenta=function(t){if("upvoteShare"==t.mesType&&t.share){var e=_.find(y,function(e){if(e.txid==t.share.txid)return!0});e&&le.stars(e,function(){})}}),fe.app.platform.clbks._focus.lenta=function(e){window.cordova&&!p.txids&&!l&&120<e&&(z.loadprev(),_scrollTop(0))},fe.app.platform.ws.messages.newblocks.clbks.newsharesLenta=function(e){l||L||p.author||p.txids||t("sub"==o?e.cntsubscr:e.cntposts)},fe.app.platform.ws.messages["new block"].clbks.newsharesLenta=function(e){l||L||p.author||p.txids||t("sub"==o?e.sharesSubscr:deep(e,"sharesLang."+fe.app.localization.key))},fe.app.platform.ws.messages.comment.clbks.lenta=function(e){if(g[e.posttxid]){var t=c.c.find("#"+e.posttxid+" .commentsAction .count span");t.html(Number(t.html()||"0")+1)}},fe.app.platform.clbks.api.actions.subscribe.lenta=function(e){var t=c.c.find('.shareTable[address="'+e+'"]');t.addClass("subscribed"),t.find(".notificationturn").removeClass("turnon")},fe.app.platform.clbks.api.actions.subscribePrivate.lenta=function(e){var t=c.c.find('.shareTable[address="'+e+'"]'),n=deep(fe.app,"platform.sdk.users.storage."+fe.user.address.value.toString("hex"));if(n){var a=n.relation(e,"subscribes");!a||"true"!=a.private&&!0!==a.private?t.find(".notificationturn").removeClass("turnon"):t.find(".notificationturn").addClass("turnon")}t.addClass("subscribed")},fe.app.platform.clbks.api.actions.unsubscribe.lenta=function(e){var t=c.c.find('.shareTable[address="'+e+'"]');t.removeClass("subscribed"),t.find(".notificationturn").removeClass("turnon")},fe.app.platform.clbks.api.actions.blocking.lenta=function(e){c.c.find('.shareTable[address="'+e+'"]').closest(".share").addClass("blocking")},fe.app.platform.clbks.api.actions.unblocking.lenta=function(e){c.c.find('.shareTable[address="'+e+'"]').closest(".share").removeClass("blocking")}}var c,d,p,o,s,n,a,i=deep(e,"history"),r=e.mid,l=!1,f=!1,u=[],m={},v=!1,g={},b={},k=!1,x=!1,w={},y=[],C=!1,T=0,E=null,S=0,V={},P={},W=!1,I=0,L=null,A=!1,M=!1,z={authclbk:function(){M=!0;var e=_.map(g,function(e,t){return t});fe.app.platform.sdk.node.shares.getbyid(e,function(e){_.each(e,function(e){delete e.myVal}),le.mystars(e,function(){M=!1}),z.subscribeLabels()})},subscribeLabels:function(){_.each(g,function(e,t){var n=fe.app.platform.sdk.node.shares.storage.trx[t];n&&z.subscribeLabel(n)})},subscribeLabel:function(e){var t=fe.app.user,n=!1;if(!(t.address.value&&e.address==t.address.value)&&t.address.value){var a=deep(fe.app,"platform.sdk.users.storage."+t.address.value);a&&a.relation(e.address,"subscribes")&&(n=!0)}if(c.c){var s=c.c.find("#"+e.txid+" .shareTable");n?s.addClass("subscribed"):s.removeClass("subscribed")}},repost:function(t){z.stateAction("_this",function(){var e="index";isMobile()&&(e="share"),fe.nav.api.load({open:!0,href:e+"?repost="+t,history:!0,handler:!0,essenseData:{}})})},loadprev:function(e){c.c.find(".shares").html('<div class="bspacer"></div>'),c.c.removeClass("showprev"),c.c.removeClass("loading"),c.c.removeClass("sharesEnded"),c.c.removeClass("sharesZero"),z.clear(),pe(e)},clear:function(){_.each(g,function(e,t){delete fe.app.platform.sdk.node.shares.storage.trx[t]}),_.each(w,function(e){e.p.destroy()}),_.each(m,function(e){e&&e.destroy()}),_.each(P,function(e){e&&e.destroy()}),P={},M=!(u=[]),g={},b={},V={},x=k=W=!(m={}),L=E=n=null,loaded=x=A=C=!(y=[]),l=!(w={}),S=T=I=0},next:function(t,n){var e=nextElH(y,function(e){if(e.txid==t)return!0});e?n&&n(e.txid):x?n&&n(null):z.loadmore(function(e){n&&n(deep(e,"0.txid")||null)})},loadmore:function(n){ce.shares(function(e,t){if(t)return l=!1,fe.app.errors.connection()&&c.c.addClass("networkError"),void(fe.app.errors.connectionRs()&&(fe.iclbks.lenta=z.loadmore));c.c.removeClass("networkError"),e&&le.shares(e,function(){le.sharesInview(e,function(){})},{index:y.length}),n&&n(e)})},removeAdditionalByScroll:function(){if(E){var e=$(window).scrollTop();150<Math.abs(e-T)&&z.additional(E,!1)}},additional:function(e,t){t?(e.addClass("showAdditional"),e.find(".subscribeWrapper").fadeIn(),T=$(window).scrollTop(),E=e,window.addEventListener("scroll",z.removeAdditionalByScroll)):(e.removeClass("showAdditional"),e.find(".subscribeWrapper").fadeOut(),window.removeEventListener("scroll",z.removeAdditionalByScroll))},applyheight:function(e,t,n){var a=d.scrollTop(),s=a+Number(t-e);a==s||e<t||d.scrollTop(s)},applyheightEl:function(e,t,n){if(c&&c.shares&&e&&t.length){var a=t[0].offsetHeight;return t.length&&d.scrollTop()>t.offset().top&&z.applyheight(e,a,n),a}},stateAction:function(t,n){fe.app.user.isState(function(e){e?n():fe.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{fast:!0,loginText:fe.app.localization.e("llogin"),successHref:t,signInClbk:function(){retry(function(){return!M},function(){n&&n()})}}})})},initVideo:function(e,t){if(!fe.app.platform.sdk.usersettings.meta.embedvideo||fe.app.platform.sdk.usersettings.meta.embedvideo.value){var n=e.find(".js-player"),a=e.find(".videoWrapper");if(n.length){var s={muted:!0,resetOnEnd:!0,controls:["play-large","play","progress","current-time","mute","volume","fullscreen"],speed:{selected:1,options:[1]}};"a"==t.settings.v&&(s.muted=!1,s.autoplay=!1),isMobile()&&(s.controls=["play","progress","current-time","fullscreen"]),PlyrEx(n[0],s,function(e){w[t.txid]||(w[t.txid]={}),w[t.txid].p=e,w[t.txid].initing=!0,w[t.txid].el=a,w[t.txid].id=a.attr("pid"),e.on("ready",function(){w[t.txid]&&(n.find("iframe").attr("disable-x-frame-options","disable-x-frame-options"),w[t.txid].inited=!0)})})}}},openPost:function(n,a){if(isMobile()){var e=fe.app.platform.sdk.node.shares.storage.trx[n];delete m[n],le.share(e,null,!0)}else fe.app.user.isState(function(e){var t={share:n,hr:p.hr,like:function(e){le.stars(e)},next:z.next,close:function(){p.renderclbk&&p.renderclbk()}};fe.nav.api.load({open:!0,href:"post?s="+n,inWnd:!0,history:!0,clbk:function(){p.renderclbk&&p.renderclbk(),a&&a()},essenseData:t})})},sharesocial:function(e,t){var n=fe.app.platform.sdk.node.shares.storage.trx[e];if(n){var a="";fe.app.platform.sdk.address.pnet()&&(a="&ref="+fe.app.platform.sdk.address.pnet().address);var s="https://pocketnet.app/"+(p.hr||"index?")+"s="+e+"&mpost=true"+a;parameters().address&&(s+="&address="+(parameters().address||""));var i=n.message,r=trimHtml(i,130).replace(/ &hellip;/g,"...").replace(/&hellip;/g,"..."),o=n.images[0];if(!o&&n.url){var l=videoImage(n.url);l&&(o=l)}var c="Post";"a"==n.settings.v&&(c="Article"),fe.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:s,caption:fe.app.localization.e("e13133")+" "+c,image:o||deep(app,"platform.sdk.usersl.storage."+n.address+".image"),title:n.caption||deep(app,"platform.sdk.usersl.storage."+n.address+".name"),text:r}})}},donate:function(e,t){var n=fe.app.platform.sdk.node.shares.storage.trx[e];if(n){var a=deep(app,"platform.sdk.usersl.storage."+n.address)||{address:n.address,addresses:[]},s="send?address="+n.address+"&amount=1&message="+hexEncode(fe.app.localization.e("postlabel")+" &mdash; "+(n.caption||n.message).substr(0,20)+"...")+"&label="+(a.name||a.address)+"&setammount=true";fe.fastTemplate("donation",function(e){dialog({html:e,class:"one donation",btn1text:fe.app.localization.e("dcancel"),clbk:function(e,t){e.find(".pnetdnt").on("click",function(){fe.nav.api.load({open:!0,href:s,history:!0}),t.destroy()}),e.find(".copy").on("click",function(){var e=$(this).closest(".address").find(".addr");copyText(e),sitemessage(fe.app.localization.e("successfullycopiedaddress"))})}})},{userinfo:a})}},videoPosition:function(e){var t=e.find(".work");if(e.hasClass("fullScreenVideo")){var n=($(window).height()-(e.find(".videoWrapper").height()+100))/2;0<n?t.css("margin-top",n+"px"):t.css("margin-top","0px")}else t.css("margin-top","0px")},fullScreenVideoMobile:function(e){w[e]&&(w[e].p.fullscreen.enter(),w[e].p.playing||w[e].p.play(),w[e].p.muted=!1)},fullScreenVideo:function(e,t){if(w[e]){var n=c.c.find("#"+e);n.addClass("fullScreenVideo"),z.videoPosition(n),fe.app.nav.api.history.addParameters({v:e});var a=w[e];a.p.playing||a.p.play(),a.p.muted=!1,f=!fe.app.actions.offScroll(),m[e]&&m[e].changein(c.c.find("#"+e),0),le.comments(e,!1,!0),W=!0,t&&t()}},exitFullScreenVideo:function(e){var t=c.c.find("#"+e);t.removeClass("fullScreenVideo"),z.videoPosition(t),w[e].p.muted=!0,fe.app.nav.api.history.removeParameters(["v"]),fe.app.actions.onScroll(),W=!1,m[e]&&(m[e].changein(null),m[e].hideall(!0))},postscores:function(e,t){fe.app.nav.api.load({open:!0,href:"postscores?p="+e,inWnd:!0,history:!0,essenseData:{share:e,like:function(e){le.stars(e)}},clbk:function(){t&&t()}})},like:function(n,e,a){var s=n.upvote(e);if(!s)return fe.app.platform.errorHandler("4",!0),void(a&&a(!1));fe.sdk.node.transactions.create.commonFromUnspent(s,function(e,t){topPreloader(100),e?a&&a(!0):(s.myVal=null,n.myVal=0,fe.app.platform.errorHandler(t,!0),a&&a(!1))})},block:function(e,t){},complain:function(e){fe.nav.api.load({open:!0,id:"complain",inWnd:!0,essenseData:{item:"post",obj:fe.app.platform.sdk.node.shares.storage.trx[e],success:function(){}},clbk:function(){}})},openGalleryRec:function(n,a,s){var i=[],r=function(e,n){_.each(e.images,function(e){i.push(e)}),e.repost?fe.app.platform.sdk.node.shares.getbyid(e.repost,function(e){var t=e[0];t?r(t,n):n&&n()}):n&&n()};r(n,function(){var e=_.map(i,function(e){return{src:e}}),t=findIndex(e,function(e){if(e.src==a)return!0});(1<e.length||n.url&&e.length&&parseVideo(n.url).type||!isMobile())&&fe.app.nav.api.load({open:!0,href:"imagegallery?i="+n.txid+"&num="+(t||0),inWnd:!0,history:!0,essenseData:{initialValue:a,idName:"src",images:e,gid:n.txid},clbk:function(){s&&s()}})})},openGallery:function(e,t,n){var a=_.map(e.images,function(e){return{src:e}}),s=findIndex(a,function(e){if(e.src==t)return!0});(1<a.length||e.url&&a.length&&parseVideo(e.url).type||!isMobile())&&fe.app.nav.api.load({open:!0,href:"imagegallery?i="+e.txid+"&num="+(s||0),inWnd:!0,history:!0,essenseData:{initialValue:t,idName:"src",images:a,gid:e.txid},clbk:function(){n&&n()}})},videosInview:function(e,i,r){var o=_.filter(e,function(e){if(e.inited&&!e.playing&&!e.stopped&&e.el)return!0});o.length&&(n=slowMade(function(){o=_.filter(o,function(e){return e.el});_.map(o,function(e){return e.el[0]});var e=inView(c.c.find(".videoWrapper"),{offset:$(window).height()/10,mode:"all"}),t=null;if(0<e.length){var n=$(e[0]);t=n.attr("pid");var a=_.find(o,function(e){return e.id==t});if(!t||!a)return;a&&setTimeout(function(){inView(n,{offset:-100,mode:"all"}).length&&i(a,n)},320)}var s=_.filter(o,function(e){return e.id!=t});s.length&&r(s)},n,30))},scrollToPost:function(e){_scrollTo($("#"+e))},sharesInview:function(r,o,l){d.scrollTop();r.length&&!C&&(a=slowMade(function(){var e=c.c.find(".share"),t=d,n=$(window).height()/4,a=inView(e,{inel:t,offsetTop:n,offsetBottom:n});if(0<a.length){var s={},i=_.map(a,function(e){var t=$(e).attr("id");return s[t]=!0,_.find(r,function(e){return e.txid==t})});i=_.filter(i,function(e){if(e&&!e.temp)return!0}),!0,o(i,a,function(){if(!1,l){var e=_.filter(r,function(e){if(!s[e.txid])return!0});l(e)}})}},a,30))}},H=function(){var e=$(this).closest(".share").attr("id");z.repost(e)},D=function(){$(this).closest(".authorgroup").find(".share").removeClass("hidden"),$(this).remove(),le.sharesInview(y,function(e){},function(){})},N=function(){var e=$(this),t=$(this).closest(".share").attr("id");fe.app.platform.api.metmenu(e,t,z)},F=function(){var e=c.c.find(".fullScreenVideo");0<e.length&&z.videoPosition(e)},O=function(){$(window).scrollTop()+$(window).height()>c.c.height()-400&&!k&&!x&&"recommended"!=o&&z.loadmore()},B=function(e){z.sharesInview(y,function(e,t,n){var a=_.filter(e,function(e){return!g[e.txid]});p.contents&&0<a.length&&(p.beginmaterial=e[0].txid,ce.shares(function(e){le.sharesInview(e,function(){})})),_.each(e,function(e){c.c.find("#"+e.txid).addClass("vstars")}),n&&n()},function(e){_.each(e,function(e){c.c.find("#"+e.txid).removeClass("vstars")})})},G=function(e){z.videosInview(w,function(e,t,n){fe.app.platform.sdk.usersettings.meta.videoautoplay&&!fe.app.platform.sdk.usersettings.meta.videoautoplay.value||t.closest(".share").hasClass("showAdditional")||e.p.play()},function(e){_.each(e,function(e){e.p.muted=!0,e.p.playing&&e.p.stop()})})},R=function(){var e=$(this).closest(".share").attr("id");le.comments(e,!0)},U=function(){var e=$(this).closest(".share").attr("id");fe.app.platform.sdk.node.transactions.get.tx(e)},j=function(){var e=$(this).closest(".share").attr("id");z.postscores(e)},q=function(){var a=$(this).closest(".stars");if(!a.attr("value")){var e=$(this).closest(".share").attr("id"),s=$(this).attr("value");z.stateAction("_this",function(){fe.app.platform.sdk.node.shares.getbyid(e,function(){var n=fe.app.platform.sdk.node.shares.storage.trx[e];fe.app.platform.sdk.address.pnet()&&n.address==fe.app.platform.sdk.address.pnet().address||(a.attr("value",s),a.addClass("liked"),z.like(n,s,function(e){if(e){n.scnt||(n.scnt=0),n.score||(n.score=0),n.scnt++,n.score=Number(n.score||0)+Number(s);var t=Number(n.score)/Number(n.scnt);a.find(".tstarsov").css("width",t/5*100+"%"),a.closest(".itemwr").find(".count span.v").html(t.toFixed(1)),le.stars(n)}else a.removeAttr("value"),a.removeClass("liked")}))})})}},Z=function(){var e=$(this).closest(".share").attr("id");z.complain(e)},J=function(){var e=$(this).closest(".share");z.additional(e,!e.hasClass("showAdditional"))},K=function(){var t=$(this).closest(".shareinlenta").attr("id"),e=$(this).attr("i"),n=fe.app.platform.sdk.node.shares.storage.trx[t];if(!n){var a=_.find(fe.sdk.node.transactions.temp.share,function(e){return e.txid==t});(n=new pShare)._import(a),n.temp=!0,n.address=fe.app.platform.sdk.address.pnet().address}z.openGalleryRec(n,e)},Q=function(){var e=$(this),t=e.hasClass("turnon"),n=e.closest(".shareTable").attr("address"),a="notificationsTurnOn";t&&(a="notificationsTurnOff"),fe.app.platform.api.actions[a](n,function(e,t){e||fe.app.platform.errorHandler(t,!0)})},X=function(){var e=$(this).closest(".shareTable").attr("address");$(this).closest(".share");z.stateAction("_this",function(){fe.app.platform.api.actions.subscribeWithDialog(e,function(e,t){e||fe.app.platform.errorHandler(t,!0)})})},Y=function(){var e=$(this).closest(".shareTable").attr("address"),n=$(this).closest(".share");dialog({html:fe.app.localization.e("e13022"),btn1text:fe.app.localization.e("unsub"),btn2text:fe.app.localization.e("ucancel"),class:"zindex",success:function(){fe.app.platform.api.actions.unsubscribe(e,function(e,t){e?n.find(".shareTable").removeClass("subscribed"):fe.app.platform.errorHandler(t,!0)})}})},ee=function(){var e=$(this).closest(".share").attr("id");z.exitFullScreenVideo(e)},te=function(){var e=$(this).closest(".share").attr("id");z.fullScreenVideo(e)},ne=function(e){if(!deep(e,"target.href")){var t=$(this).closest(".shareinlenta").attr("id");z.openPost(t)}},ae=function(){var e=$(this).closest(".shareinlenta").attr("id");fe.app.platform.m.log("sharing_opened_button",e),z.sharesocial(e)},se=function(){var e=$(this).closest(".share").attr("id");z.donate(e)},ie=function(){var e=$(this).closest(".share").attr("id"),t=fe.app.platform.sdk.node.shares.getWithTemp(e);isMobile()?fe.nav.api.load({open:!0,id:"discussions",history:!0,clbk:function(){fe.app.platform.sdk.chats.add(e+"_"+t.address,"share")}}):fe.app.platform.sdk.chats.add(e+"_"+t.address,"share")},re=function(){z.loadmore()},oe=function(){z.loadprev()},le={comments:function(a,s,i,r){if(!p.nocomments&&!m[a]&&c.c){var o=c.c.find("#"+a+" .commentsWrapper"),l=deep(fe.app.platform,"sdk.node.shares.storage.trx."+a);setTimeout(function(){fe.fastTemplate("commentspreview",function(e){if(c.c){var t="";fe.app.platform.sdk.address.pnet()&&(t="&ref="+fe.app.platform.sdk.address.pnet().address);var n="https://pocketnet.app/"+(p.hr||"index?")+"s="+a+"&mpost=true"+t;parameters().address&&(n+="&address="+(parameters().address||"")),fe.nav.api.load({open:!0,id:"comments",el:o,eid:a+"lenta",essenseData:{close:function(){m[a]&&m[a].hideall(!0),_scrollToTop(o,0,0,-65)},totop:c.c.find("#"+a),caption:e,send:function(){var e=c.c.find("#"+a+" .commentsAction .count span");e.html(Number(e.html()||"0")+1)},txid:a,init:s,showall:i,preview:r,lastComment:l.lastComment,count:l.comments,hr:n,renderClbk:function(){p.renderclbk&&p.renderclbk()}},clbk:function(e,t){c.c&&((e=c.c.find("#"+a)).hasClass("fullScreenVideo")&&t.changein(e,0),t&&(m[a]=t),p.renderclbk&&p.renderclbk())}})}},{share:l})},30)}},roomsinfo:function(e){_.each(e,function(e){var t=deep(fe.app.platform,"rtc.storage.info."+e+".d.users_count"),n=e.split("_")[0];void 0!==t&&c.c&&c.c.find("#"+n+" .discussion .count").html(function(e){return e?"<b>"+e+"</b>":""}(t))})},shareSpacers:function(e){_.each(e,function(e){le.shareSpacer(e)})},shareSpacer:function(e){if(g[e.txid]&&!b[e.txid]){var t=c.shares.find("#"+e.txid),n=t.find(".work").outerHeight();w[e.txid]&&w[e.txid].inited&&(w[e.txid].p.destroy(),w[e.txid].el=null,w[e.txid].inited=!1),g[e.txid]=!1,c.shares.css("height",c.shares.outerHeight()),t.html('<div class="shareSpacer added"></div>'),t.find(".shareSpacer").outerHeight(n),V[e.txid]=z.applyheightEl(V[e.txid],t,"space")}},share:function(t,n,e){var a=c.shares.find("#"+t.txid);V[t.txid]=0,a[0]&&(V[t.txid]=a[0].offsetHeight);a.find(".added");b[t.txid]=!0,fe.shell({name:"share",el:a,data:{share:t,ed:p,mestate:s,all:e||!1}},function(e){a.find(".work");g[t.txid]=!0,V[t.txid]=z.applyheightEl(V[t.txid],a,"share"),le.stars(t),t.temp||le.comments(t.txid,!1,!1,!0),le.repost(e.el,t.repost,t.txid,t.isEmpty()),le.url(e.el.find(".url"),t.url,t,function(){le.urlContent(t,function(){p.searchValue&&e.el.find(".canmark").mark(p.searchValue),z.initVideo(e.el,t),b[t.txid]=!1,n&&n()})}),le.images(t,function(){})})},mystars:function(e,t){var n=_.filter(e,function(e){if(void 0===e.myVal)return!0}),a=_.map(n,function(e){return e.txid});fe.app.platform.sdk.likes.get(a,function(){_.each(e,function(e){le.stars(e),le.wholike(e)}),t&&t()})},wholike:function(e,t){if(c.shares){var n=c.shares.find("#"+e.txid);if(n.length){var a=e.who;fe.shell({name:"wholike",el:n.find(".wholikes"),data:{scores:Number(e.scnt),wholikes:a||[]},bgImages:{}},function(e){t&&t()})}}},stars:function(e,t){if(c.shares){var n=c.shares.find("#"+e.txid);n.length&&fe.shell({name:"stars",el:n.find(".forstars"),data:{share:e}},function(e){fastars(e.el.find(".stars")),t&&t()})}},sharesInview:function(e,t){e=_.filter(e,function(e){return!$("#"+e.txid).hasClass("hidden")});var n=_.sortBy(e,function(e){return-e.time});lazyEach({array:n,action:function(e){var t=e.item;g[t.txid]?e.success():(g[t.txid]=!0,le.share(t,e.success))},sync:isMobile(),all:{success:function(){le.mystars(e),t()}}})},shares:function(t,n,e){(e=e||{}).inner||(e.inner=append);var a="groupshares";(p.author||o||p.txids||p.search)&&(a="shares"),"recommended"==o&&(t=_.sortBy(t,function(e){return-e.time})),e.ignoresw||(t=_.filter(t,function(t){return!_.find(y,function(e){return e.txid==t.txid})})),fe.shell({name:a,inner:e.inner,el:e.el||c.shares,data:{shares:t||[],index:e.index||0},animation:!1},function(e){e.inner==append?y=y.concat(t):e.inner!=replaceWith&&(y=t.concat(y)),y=_.uniq(y,function(e){return e.txid}),p.renderclbk&&p.renderclbk(),n&&n()})},videoPreview:function(e,t){var n=c.c.find("#"+e.txid);if("a"==e.settings.v){var a=n.find("[data-plyr-provider][data-plyr-embed-id]"),s=[];$.each(a,function(){var e=$(this),t={type:e.attr("provider"),id:e.attr("eid")};s.push(videoImage(t))})}else t&&t()},images:function(n,a){var s=n;if(c.c){var i=c.c.find("#"+n.txid),r=i.find(".image"),l=i.find(".images");!l.hasClass("active")&&r.length&&l.length?r.imagesLoaded({background:!0},function(o){"a"!=n.settings.v&&_.each(o.images,function(e,t){var n=e.img,a=$(o.elements[t]).closest(".imagesWrapper"),s="",i=a.width();a.height();if(n.width>n.height&&!isMobile()){s="w2";var r=i*(n.width/n.height);r>l.width()&&(r=l.width(),h=r*(n.height/n.width),a.height(h)),a.width(r)}(n.height>n.width||isMobile())&&(s="h2",a.height(i*(n.height/n.width))),s&&a.addClass(s)}),V[s.txid]=z.applyheightEl(V[s.txid],i);function e(){l.addClass("active"),r.addClass("active"),V[s.txid]=z.applyheightEl(V[s.txid],i),p.renderclbk&&p.renderclbk(),a&&a()}if("a"!=n.settings.v&&1<o.images.length){var t=20;isMobile&&(t=5),l.isotope({layoutMode:"packery",itemSelector:".imagesWrapper",packery:{gutter:t},initLayout:!1}),l.on("arrangeComplete",function(){e()}),l.isotope()}else e()}):a&&a()}},repost:function(e,t,n,a,s){t&&fe.shell({name:"repost",el:e.find(".repostWrapper"),data:{repost:t,share:deep(fe.app.platform,"sdk.node.shares.storage.trx."+n),level:1}},function(e){e.el&&e.el.length&&fe.app.platform.papi.post(t,e.el.find(".repostShare"),function(e){P[n]=e},{repost:!0,eid:n+"lenta",level:1,fromempty:a})})},url:function(e,t,s,i){if(p.nourlload)i&&i();else{var n=fe.app.platform.sdk.remote.storage[t],r=e.closest(".share");fe.shell({turi:"share",name:"url",el:e,data:{url:t,og:n,share:s}},function(n){fe.app.nav.api.links(null,n.el,function(e){e.stopPropagation()}),V[s.txid]=z.applyheightEl(V[s.txid],r,"url");var a=n.el.find("img");p.renderclbk&&p.renderclbk(),n.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,t){e.isLoaded?($(a[t]).addClass("active"),500<e.img.naturalWidth&&n.el.addClass("bigimageinlink")):$(a[t]).closest(".image").css("display","none")}),V[s.txid]=z.applyheightEl(V[s.txid],r,"url"),p.renderclbk&&p.renderclbk()}),i&&i()})}},urlContent:function(t,n){if(c.c){var a=t.url;if(a){var s=c.c.find("#"+t.txid+" .url"),e=fe.app.platform.parseUrl(a),i=fe.app.platform.sdk.remote.storage[a];a&&!i?"youtube"==e.type||"vimeo"==e.type||"bitchute"==e.type||"peertube"==e.type?n&&n():fe.app.platform.sdk.remote.get(a,function(e){e?le.url(s,a,t,n):n&&n()}):n&&n()}else n&&n()}},urlsContent:function(e){_.each(e,function(e){le.urlContent(e)})},urls:function(e,t){lazyEach({array:e,sync:!0,action:function(e){le.url(e.item.el,e.item.url,e.item.share,e.success)},all:{success:function(){t&&t()}}})},spacers:function(e,t){var n=_.map(e,function(e){return{txid:e,author:p.author}});this.shares(n,t,{noview:!0})}},ce={recomended:function(t,n){c.loader.fadeIn(),c.c.addClass("loading"),u=[],p.author||L?t&&t(u):fe.app.platform.sdk.node.shares.recomended({},function(e){u=_.filter(e,function(t){if(!_.find(n,function(e){if(e.txid==t)return!0}))return!0}),fe.app.platform.sdk.node.shares.users(e,function(){t&&t(u)})})},txids:function(e,t){A?t([]):fe.app.platform.sdk.node.shares.getbyid(e,function(e){A=!0,t(e)})},begin:function(t){!L||A||o&&"sub"!=o?t([]):fe.app.platform.sdk.node.shares.getbyid(L,function(e){A=!0,t(e)})},sstuff:function(n,a,s,i){var r=p.author;fe.app.platform.sdk.node.shares.users(n,function(e,t){I+=n.length,k=!1,c.c&&(a||t||n&&n.length&&!(n.length<s.count)&&"recommended"!=o||(L||I?(n.length<s.count||"recommended"==o)&&(o||r||p.search)&&setTimeout(function(){c.c&&c.c.addClass("sharesEnded")},1e3):c.c.addClass("sharesZero"),n.length<s.count&&(o||r||p.search)&&(x=!0)),c.loader.fadeOut(),i&&i(n,a||t))})},shares:function(i,r){k||x&&(!p.contents||p.txids.length==_.toArray(g).length)||(c.loader.fadeIn(),c.c.addClass("loading"),k=!0,p.loader?p.loader(function(e,t,n){ce.sstuff(e,t,n,i)}):fe.app.user.isState(function(s){ce.begin(function(a){var e=p.author,t="common",n=L;if(o)if("recommended"==o)t="recommended";else if("b"==o)t="getbyidsp",n=p.beginmaterial;else if(t="common",e="1",!s)return void ce.sstuff([],null,{count:0},i);p.txids&&"b"!=o&&(t="txids"),fe.app.platform.sdk.node.shares[t]({author:e,begin:n||"",txids:p.txids},function(t,e,n){_.each(a,function(e){e&&t.unshift(e)}),p.filter&&(t=_.filter(t,p.filter)),ce.sstuff(t,e,n,i),"b"==o&&(L="")},r)})}))}},de=function(){},pe=function(a,s){var e="clear",n=l=!0;p.goback&&(e="cache"),p.contents&&(c.c.find(".shares").html(""),le.spacers(p.txids,function(){z.scrollToPost(p.beginmaterial)}),n=!1),ce.shares(function(e,t){if(t)return l=!1,fe.app.errors.connection()&&c.c.addClass("networkError"),void(fe.iclbks.lenta=function(){pe(null,s)});c.c.removeClass("networkError"),e?(L&&!o&&c.c.addClass("showprev"),n&&c.c.find(".shares").html(""),le.shares(e,function(){le.sharesInview(e,function(){l=!1,B();var e=parameters();if(e.s&&z.openPost(e.s,function(){z.scrollToPost(e.p)}),e.i){var t=deep(fe.app.platform,"sdk.node.shares.storage.trx."+e.i),n=null;t&&(e.num&&(n=deep(t,"images."+e.num)),z.openGalleryRec(t,n))}e.v&&(z.scrollToPost(e.v),z.fullScreenVideo(e.v,function(){})),e.p&&z.postscores(e.p,function(){z.scrollToPost(e.p)}),a&&a(),p.goback&&s.clbk&&(p.goback=!1,s.clbk(null,s))})})):l=!1},e)};return{id:r,primary:i,getdata:function(n,e){f=!1,S=0,m={},p=e.settings.essenseData||{},z.clear();var t=parameters();L=t.s||t.i||t.v||t.p||null,o=!!t.r&&t.r,void 0!==p.r&&null!=p.r&&(o=p.r),p.txids&&"b"!=o&&(o=!1),v=!p.txids||!1,fe.app.platform.sdk.ustate.me(function(e){s=e||{};var t={beginmaterial:L,author:p.author,recommended:o};fe.loadTemplate({name:"share"},function(){fe.loadTemplate({turi:"share",name:"url"},function(){fe.loadTemplate({name:"stars"},function(){n(t)})})})})},destroy:function(){_.each(g,function(e,t){delete fe.app.platform.sdk.node.shares.storage.trx[t]}),_.each(w,function(e){e.p.destroy()}),f&&fe.app.actions.onScroll(),_.each(m,function(e){e.destroy()}),m={},delete fe.iclbks.lenta,delete fe.app.platform.ws.messages.comment.clbks.lenta,delete fe.app.platform.sdk.node.shares.clbks.added.lenta,delete fe.app.platform.ws.messages.transaction.clbks.temp,delete fe.app.platform.ws.messages.event.clbks.lenta,delete fe.app.platform.ws.messages["new block"].clbks.newsharesLenta,delete fe.app.platform.clbks.api.actions.subscribe.lenta,delete fe.app.platform.clbks.api.actions.unsubscribe.lenta,delete fe.app.platform.clbks.api.actions.subscribePrivate.lenta,delete fe.app.platform.clbks.api.actions.blocking.lenta,delete fe.app.platform.clbks.api.actions.unblocking.lenta,delete fe.app.platform.clbks._focus.lenta,fe.app.platform.sdk.chats.removeTemp(),window.removeEventListener("scroll",G),window.removeEventListener("scroll",B),window.removeEventListener("scroll",O),window.removeEventListener("resize",F),c={}},authclbk:function(){void 0!==c&&c.c&&z.authclbk()},init:function(e){d=$(window),de(),(c={}).c=e.el.find("#"+fe.map.id),c.shares=c.c.find(".shares"),c.loader=c.c.find(".loader"),c.lentacnt=c.c.find(".lentacell .cnt"),t(),pe(null,e),p.goback||e.clbk(null,e)}}}var fe=new nModule,a={};return fe.authclbk=function(){_.each(a,function(e){e.authclbk()})},fe.run=function(e){var t=fe.addEssense(a,n,e);fe.init(t,e)},fe.stop=function(){_.each(a,function(e){e.destroy()})},fe}();"undefined"!=typeof module?module.exports=lenta:(app.modules.lenta={},app.modules.lenta.module=lenta);
 /*_____*/ 
var userslist=function(){function t(s){var t,e,n=deep(s,"history"),i=[],o=!1,a=null,r=0,c=function(s){dialog({html:h.app.localization.e("e13022"),btn1text:h.app.localization.e("unsub"),btn2text:h.app.localization.e("ucancel"),class:"zindex",success:function(){h.app.platform.api.actions.unsubscribe(s,function(s,n){s||h.app.platform.errorHandler(n,!0)})}})},u=function(s){h.app.platform.api.actions.subscribeWithDialog(s,function(s,n){s||h.app.platform.errorHandler(n,!0)})},l=function(s,n){var t="notificationsTurnOn";n&&(t="notificationsTurnOff"),h.app.platform.api.actions[t](s,function(s,n){s||h.app.platform.errorHandler(n,!0)})},d=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!e&&!o&&k()},p=function(){var s=$(this).closest(".user").attr("address");c(s)},f=function(){var s=$(this).closest(".user").attr("address");u(s)},b=function(){var s=$(this).closest(".user").attr("address"),n=$(this).hasClass("turnon");l(s,n)},m=function(s,n){h.shell({name:"users",el:t.users,data:{addresses:s,extra:a},inner:append},function(s){n&&n()})},g=function(s,n){e||(e=!0,topPreloader(80),t.c.addClass("loading"),h.sdk.users.get(s,function(){t.c.removeClass("loading"),e=!1,topPreloader(100),n&&n()}))},k=function(s){var n=_.filter(i,function(s,n){if(50*r<=n&&n<50*(r+1))return!0});n.length?(g(n,function(){m(n,s)}),r++):o=!0},v=function(){};return{primary:n,getdata:function(s,n){r=0,e=o=!1;var t={};i=deep(n.settings,"essenseData.addresses")||[],t.addresses=i,t.empty=deep(n.settings,"essenseData.empty"),t.caption=deep(n.settings,"essenseData.caption"),a=deep(n.settings,"essenseData.extra"),s(t)},destroy:function(){window.removeEventListener("scroll",d),delete h.app.platform.clbks.api.actions.subscribe.userlist,delete h.app.platform.clbks.api.actions.subscribePrivate.userlist,delete h.app.platform.clbks.api.actions.unsubscribe.userlist,delete h.app.platform.clbks.api.actions.blocking.userlist,t={}},init:function(s){v(),(t={}).c=s.el.find("#"+h.map.id),t.users=t.c.find(".users"),h.app.platform.clbks.api.actions.subscribe.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},h.app.platform.clbks.api.actions.subscribePrivate.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').addClass("turnon")},h.app.platform.clbks.api.actions.unsubscribe.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').removeClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},h.app.platform.clbks.api.actions.blocking.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("blocking"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},h.app.platform.clbks.api.actions.unblocking.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').removeClass("blocking")},t.c.on("click",".subscribe",f),t.c.on("click",".unsubscribe",p),t.c.on("click",".unblocking",p),t.c.on("click",".notificationturn",b),k(function(){window.addEventListener("scroll",d)}),s.clbk(null,s)}}}var h=new nModule,e={};return h.run=function(s){var n=h.addEssense(e,t,s);h.init(n,s)},h.stop=function(){_.each(e,function(s){s.destroy()})},h}();"undefined"!=typeof module?module.exports=userslist:(app.modules.userslist={},app.modules.userslist.module=userslist);
 /*_____*/ 
var dust=function(){function t(e){function t(){var e=deep(r,"pk.value");r={pk:new Parameter({name:"Private Key",type:"string",id:"pk",placeholder:"Private Key",value:e||""}),reciever:new Parameter({name:i.app.localization.e("wsreciever"),type:"string",id:"reciever",placeholder:i.app.localization.e("wsenter")}),amount:new Parameter({name:i.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:i.app.localization.e("wsamountof"),format:{Precision:6}}),outputs:new Parameter({name:"Count of outputs",id:"outputs",type:"NUMBER",placeholder:"Count of outputs",defaultValue:1,format:{Precision:0,Min:1,Max:200}}),message:new Parameter({name:"Message",id:"message",type:"stringany",placeholder:"Your message",format:{Length:80}})}}var n,a=deep(e,"history"),r={},s={sendWrapper:function(){if(r.reciever.value){var a=!0;try{bitcoin.address.fromBase58Check(r.reciever.value)}catch(e){a=!1}a?r.amount.value?r.pk.value?s.send(r.pk.value):dialog({html:"Do you want to send coins from current acount?",btn1text:"Yes",btn2text:"No, cancel",success:function(){console.log(";self.app.user.private.value.toString()",i.app.user.private.value.toString()),s.send(i.app.user.private.value.toString("hex"))}}):sitemessage("You must enter Amount"):sitemessage("Address is not valid")}else sitemessage("You Must Enter Reciever Address")},send:function(e){n.c.find(".loader").fadeIn(),i.app.platform.sdk.wallet.sendmanyoutputs(e,r.reciever.value,r.amount.value,r.outputs.value,function(e,a){n.c.find(".loader").fadeOut(),e?i.app.platform.errorHandler(e,!0):(t(),o.parameters(),sitemessage("Success!"))},r.message.value)}},o={parameters:function(){i.shell({name:"parameters",el:n.c.find(".parametersWrapper"),data:{d:{parameters:r}}},function(e){ParametersLive(_.toArray(r),e.el),e.el.find(".sends").on("click",s.sendWrapper)})}},u=function(){};return{primary:a,getdata:function(e){e({})},destroy:function(){n={}},init:function(e){u(),(n={}).c=e.el.find("#"+i.map.id),t(),o.parameters(),e.clbk(null,e)}}}var i=new nModule,n={};return i.run=function(e){var a=i.addEssense(n,t,e);i.init(a,e)},i.stop=function(){_.each(n,function(e){e.destroy()})},i}();"undefined"!=typeof module?module.exports=dust:(app.modules.dust={},app.modules.dust.module=dust);