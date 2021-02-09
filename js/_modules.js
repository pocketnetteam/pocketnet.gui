
 /*_____*/ 
var pkview=function(){function i(n){var e,n=deep(n,"history"),t={},a={qrcode:function(n,e){return new QRCode(n[0],{text:e,width:256,height:256})},mnemonic:function(n){var i="",o=(t.mnemonicMask.length*n/100).toFixed(0);return _.each(t.mnemonicKey,function(n,e){e=_.indexOf(t.mnemonicMask,e);i+=e<o||" "==n?n:c.app.platform.values.alph[rand(0,c.app.platform.values.alph.length-1)]}),i},mnemonicEffect:function(i,n,e){var o=indexArray(101);n&&o.reverse(),lazyEach({array:o,sync:!0,action:function(n){var e=n.item;i.html(a.mnemonic(e)),h=i.height(),setTimeout(n.success,rand(1,5))},all:{success:function(){e&&e()}}})},key:function(o){c.shell({name:"key",el:e.c.find(".keywrapper"),data:t,animation:{id:"slide"}},function(e){var n=e.el.find(".mnemonicKey");a.mnemonicEffect(n,!1,function(){});var i=a.qrcode(e.el.find(".qrcode"),t.mk);e.el.find(".copy").on("click",function(){copyText(e.el.find(".hiddenMnemonicKey")),sitemessage(c.app.localization.e("successfullycopied"))}),e.el.find(".save").on("click",function(){var n=e.el.find(".qrcode img").attr("src");saveAs({file:n,format:"png",name:"pocketnetkey"})}),window.cordova&&e.el.find(".qrcode").on("click",function(){menuDialog({items:[{text:c.app.localization.e("e13145"),class:"itemmain",action:function(n){var e=b64toBlob(i._oDrawing._elImage.currentSrc.split(",")[1],"image/png",512);saveAsWithCordova(e,"pkey"+c.app.platform.currentTime()+".png",function(){n()})}}]})}),o&&o(e)})},dontshowagain:function(){e.c.find(".dontshowagain").addClass("active")}},i=function(){};return{primary:n,getdata:function(n,e){n({})},destroy:function(){e={}},init:function(n){i(),(e={}).c=n.el.find("#"+c.map.id),e.c.find(".dontshowagain").on("click",function(){c.closeContainer(),c.app.platform.sdk.registrations.remove(),isMobile()&&app.nav.api.load({open:!0,href:"index",history:!0})}),function(){t={};var n=localStorage.mnemonic;n&&c.app.platform.cryptography.api.aeswc.decryption(n,c.app.options.fingerPrint,{},function(n){var e;n&&(bitcoin.bip39.validateMnemonic(n)?(e=c.app.user.keysFromMnemo(trim(n)),t.mk=e.privateKey.toString("hex")):t.mk=n,t.mnemonicKey=n,t.mnemonicMask=_.shuffle(indexArray(t.mnemonicKey.length)),t.mnemonicContent=t.mnemonicKey.split(" "),a.key(),setTimeout(function(){a.dontshowagain()},2e3))})}(),n.clbk(null,n)},wnd:{class:"allscreen black withoutButtons pkviewwnd"}}}var c=new nModule,o={};return c.run=function(n){var e=c.addEssense(o,i,n);c.init(e,n)},c.stop=function(){_.each(o,function(n){n.destroy()})},c}();"undefined"!=typeof module?module.exports=pkview:(app.modules.pkview={},app.modules.pkview.module=pkview);
 /*_____*/ 
var applications=function(){function t(n){var t,i,n=deep(n,"history"),e=function(t,i){t&&t.github&&$.get(t.github.url,{},function(n){var o=deep(n,"assets")||[],n=_.find(o,function(n){return n.name==t.github.name});n&&((o=document.createElement("a")).setAttribute("href",n.browser_download_url),o.setAttribute("download","download"),o.click(),i&&i(n.browser_download_url))})},o=function(n){var o=os();o&&s.app.platform.applications[i.key][o]&&"undefined"==typeof _Electron&&!window.cordova?a.os(s.app.platform.applications[i.key][o],n):n&&n()},a={os:function(o){s.shell({turi:"registration",name:"os",el:t.c.find(".currentos"),data:{os:o,last:!1}},function(n){n.el.find(".downloadOs").on("click",function(){e(o,function(n){t.c.find(".os").addClass("rundownloading"),t.c.find(".skipositem").html('<div class="downloadstart">'+s.app.localization.e("e13011")+'</div><div><a href="'+n+'"><b>'+s.app.localization.e("e13012")+"</b></a></div>")})})})}},d=function(){};return{primary:n,getdata:function(n,o){(i=deep(o,"settings.essenseData")||{}).key||(i.key="ui");n({})},destroy:function(){t={}},init:function(n){d(),(t={}).c=n.el.find("#"+s.map.id),o(),n.clbk(null,n)}}}var s=new nModule,i={};return s.run=function(n){var o=s.addEssense(i,t,n);s.init(o,n)},s.stop=function(){_.each(i,function(n){n.destroy()})},s}();"undefined"!=typeof module?module.exports=applications:(app.modules.applications={},app.modules.applications.module=applications);
 /*_____*/ 
var anothersite=function(){function t(n){var n=deep(n,"history"),e=function(){};return{primary:n,getdata:function(n,e){n({link:e.settings.essenseData.link})},destroy:function(){0},init:function(n){e(),{}.c=n.el.find("#"+i.map.id),n.clbk(null,n)},wnd:{header:"Another site",class:"transparent small anothersite"}}}var i=new nModule,o={};return i.run=function(n){var e=i.addEssense(o,t,n);i.init(e,n)},i.stop=function(){_.each(o,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=anothersite:(app.modules.anothersite={},app.modules.anothersite.module=anothersite);
 /*_____*/ 
var registration=function(){function i(n){var c,i,t,e=deep(n,"history"),o={last:!1,end:!1},r=null,a={type:"STRING",name:"keyInput",id:"keyInput",placeholder:g.app.localization.e("confirmkey"),autoSearch:function(e,n,i){var t;0==o.mnemonicKey.indexOf(e)&&" "!=e[e.length-1]&&((e=e.split(" "))[t=e.length-1],i(_.filter(o.mnemonicContent,function(e,n){if(n<=t)return!0}).join(" ")))}};isMobile()&&delete a.autoSearch;var s=new Parameter(a),l={download:function(i){o.os&&o.os.github&&$.get(o.os.github.url,{},function(e){var n=deep(e,"assets")||[],e=_.find(n,function(e){return e.name==o.os.github.name});e&&((n=document.createElement("a")).setAttribute("href",e.browser_download_url),n.setAttribute("download","download"),n.click(),i&&i(e.browser_download_url))})},validation:function(){var e=trim(s.value);return e!=o.mnemonicKey&&e!=o.mk?(c.c.find(".note").html(g.app.localization.e("keysnotmatch")),c.c.addClass("error"),!1):(c.c.removeClass("error"),c.c.find(".note").html(""),!0)},registration:function(){l.validation()&&(localStorage.stay="1",g.app.user.stay=1,g.user.signin(o.mnemonicKey,function(e){return e?(o.end=!0,void v.confirm(function(){v.success(function(){setTimeout(function(){var e;"_this"==deep(i,"successHref")?g.app.user.validate()?((e=deep(t,"container.close"))&&e(),i.signInClbk&&i.signInClbk()):g.nav.api.loadSameThis("filluser",n):(i.nav||(i.nav={}),i.nav.history=!0,i.nav.reload=!1,g.app.reload({href:i.successHref||"filluser",nav:i.nav}))},2e3)})})):(c.c.find.note.html(g.app.localization.e("id98")),void c.c.addClass("error"))}))},generate:function(){c.c.removeClass("begin");var n=bitcoin.bip39.generateMnemonic();l.testqrcodeandkey(n,function(e){e?(o.mnemonicKey=n,o.mnemonicMask=_.shuffle(indexArray(o.mnemonicKey.length)),o.mnemonicContent=o.mnemonicKey.split(" "),e=g.app.user.keysFromMnemo(o.mnemonicKey),o.mainAddress=app.platform.sdk.address.pnet(e.publicKey).address,o.mk=e.privateKey.toString("hex"),v.key()):l.generate()})},repeat:function(){o.last=!1,v.confirm(function(){v.tips(function(){setTimeout(function(){c.c.removeClass("last"),setTimeout(function(){l.generate()},300)},300)})})},continue:function(){var e=c.c.find(".mnemonicKey");c.c.find(".keyStep").removeClass("showedPanel"),v.mnemonicEffect(e,!0,function(){o.last=!0,v.key(function(){setTimeout(function(){v.tips(),c.c.addClass("last"),setTimeout(function(){v.confirm()},300)},300)})})},removeDisabled:function(e){e.find(".continue").removeClass("disabled"),e.find(".preloader").remove(),e.find(".save").addClass("black"),e.find(".copy").addClass("black")},testqrcodeandkey:function(e,n){e=g.app.user.keysFromMnemo(trim(e)).privateKey.toString("hex"),e=v.qrcode(c.c.find(".hiddenqrcode"),e)._oDrawing._oContext.canvas.toDataURL("image/jpeg");grayscaleImage(e,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?n&&n(!1):n&&n(!0)},qrscanner.q.decode(e)})}},d=function(){l.registration()},u=function(){l.generate()},f=function(){$(this).hasClass("disabled")||l.continue()},p=function(){l.repeat()},m=function(){l.download(function(e){c.c.find(".osStep").addClass("rundownloading"),c.c.find(".skipositem").html('<div class="downloadstart">'+g.app.localization.e("e13011")+'</div><div><a href="'+e+'"><b>'+g.app.localization.e("e13012")+"</b></a></div>")})},v={os:function(n){var e=os();e&&g.app.platform.applications[e]&&"undefined"==typeof _Electron&&!window.cordova&&!g.app.ref?(o.os=g.app.platform.applications[e],v.step("os",function(e){e.el.find(".downloadOs").on("click",m),e.el.find(".skip").on("click",function(){n&&n()})})):n()},step:function(e,n){g.shell({name:e,el:c.c.find("."+e+"Step"),data:o,animation:{id:"slide"}},function(e){n&&n(e)})},success:function(n){v.step("success",function(e){n&&n()})},tips:function(n){v.step("tips",function(e){e.el.find(".generate").on("click",u),n&&n()})},confirm:function(n){s.value="",o.keyInput=s,v.step("confirm",function(e){e.el.find(".repeat").on("click",p),e.el.find(".registrationButton").on("click",d),n?n():(ParametersLive([s],e.el),_scrollTo(e.el,r),initUpload({el:e.el.find(".uploadFile"),ext:["txt","png","jpeg","jpg"],notexif:!0,dropZone:c.c.find(".confirm"),action:function(e,n){"png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext?grayscaleImage(e.base64,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?c.c.find(".note").html(g.app.localization.e("filedamaged")):(s.value=trim(e),s.el.val(s.value),l.registration())},qrscanner.q.decode(e)}):(e=e.base64.split(",")[1],(e=b64_to_utf8(e).split("/"))[1]?(s.value=trim(e[1]),s.el.val(s.value),l.registration()):c.c.find(".note").html(g.app.localization.e("filedamaged")))}}),setTimeout(function(){e.el.find('input[type="text"]').on("focus",function(){e.el.find(".inputTable").addClass("typeactive")}),e.el.find('input[type="text"]').on("blur",function(){e.el.find(".inputTable").removeClass("typeactive")}),isMobile()||e.el.find(".autosearchInputCnt input").focus()},600))})},qrcode:function(e,n){return new QRCode(e[0],{text:n,width:256,height:256})},key:function(a){v.step("key",function(n){var e=n.el.find(".mnemonicKey"),i=c.c.find(".keyStep");i.removeClass("showedPanel");var t,o=n.el.find(".hiddenMnemonicKey").html();o&&(o=g.app.user.keysFromMnemo(trim(o)).privateKey.toString("hex"),t=v.qrcode(n.el.find(".qrcode"),o)),v.mnemonicEffect(e,!1,function(){i.addClass("showedPanel")}),n.el.find(".continue").on("click",f),setTimeout(function(){l.removeDisabled(n.el)},2e3),g.app.platform.clbks._focus.registration=function(){l.removeDisabled(n.el)},n.el.find(".copy").on("click",function(){copyText(n.el.find(".hiddenMnemonicKey")),sitemessage(g.app.localization.e("successfullycopied")),l.removeDisabled(n.el)}),n.el.find(".save").on("click",function(){var e=n.el.find(".qrcode img").attr("src");saveAs({file:e,format:"png",name:"pocketnetkey"})}),window.cordova&&n.el.find(".qrcode").on("click",function(){menuDialog({items:[{text:"Save key on device",class:"itemmain",action:function(e){var n=b64toBlob(t._oDrawing._elImage.currentSrc.split(",")[1],"image/png",512);saveAsWithCordova(n,"pkey"+g.app.platform.currentTime()+".png",function(){e()})}}]})}),a?a():_scrollTo(n.el,r)})},mnemonicEffect:function(i,e,n){var t=indexArray(101);e&&t.reverse();var o=i.height();i.css("min-height",o+"px"),lazyEach({array:t,sync:!0,action:function(e){var n=e.item;i.html(v.mnemonic(n)),o=i.height(),i.css("min-height",o+"px"),setTimeout(e.success,rand(1,5))},all:{success:function(){i.css("min-height","0px"),n&&n()}}})},mnemonic:function(e){var i="",t=(o.mnemonicMask.length*e/100).toFixed(0);return _.each(o.mnemonicKey,function(e,n){n=_.indexOf(o.mnemonicMask,n);i+=n<t||" "==e?e:g.app.platform.values.alph[rand(0,g.app.platform.values.alph.length-1)]}),i}};return{primary:e,getdata:function(e,n){g.nav.api.load({open:!0,href:"filluserfast"})},destroy:function(){delete g.app.platform.clbks._focus.registration,c={}},init:function(e){var n;(c={}).c=e.el.find("#"+g.map.id),c.registrationButton=c.c.find(".registrationButton"),c.toAuthorization=c.c.find(".toAuthorization"),c.login=c.c.find(".loginValue"),c.ler=c.c.find(".ler"),c.key=c.c.find(".key"),i=e.essenseData||{},t=e,(r=c.c.closest(".wndcontent")).length||(r=null),v.os(function(){v.tips()}),n=e,c.toAuthorization.on("click",function(){g.nav.api.loadSameThis("authorization",n)}),e.clbk(null,e)},wnd:{class:"withoutButtons allscreen"}}}var g=new nModule,t={};return g.run=function(e){var n=g.addEssense(t,i,e);g.init(n,e)},g.stop=function(){_.each(t,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=registration:(app.modules.registration={},app.modules.registration.module=registration);
 /*_____*/ 
var page404=function(){function o(n){var n=deep(n,"history"),e=function(){};return{primary:n,getdata:function(n){n({})},destroy:function(){0},init:function(n){e(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}}var t=new nModule,u={};return t.run=function(n){var e=t.addEssense(u,o,n);t.init(e,n)},t.stop=function(){_.each(u,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=page404:(app.modules.page404={},app.modules.page404.module=page404);
 /*_____*/ 
var terms=function(){function e(n){var t,n=deep(n,"history"),e=function(){u.shell({name:u.app.localization.key,el:t.c,data:{}},function(n){})},o=function(){};return{primary:n,getdata:function(n){n({})},destroy:function(){t={}},init:function(n){o(),(t={}).c=n.el.find("#"+u.map.id),e(),n.clbk(null,n)},wnd:{class:"withoutButtons allscreen black a100"}}}var u=new nModule,o={};return u.run=function(n){var t=u.addEssense(o,e,n);u.init(t,n)},u.stop=function(){_.each(o,function(n){n.destroy()})},u}();"undefined"!=typeof module?module.exports=terms:(app.modules.terms={},app.modules.terms.module=terms);
 /*_____*/ 
var filluser=function(){function t(e){function l(n){w.app.ref?w.sdk.users.get(w.app.ref,function(){var e=deep(w,"sdk.users.storage."+w.app.ref+".name");n&&n(e)}):n&&n(null)}function c(){var e=w.app.ref||"",n="Overall";return-1<e.indexOf("author")&&(n="Account"),n=-1<e.indexOf("&s=")||-1<e.indexOf("&v=")?"Post":n}function i(n){return _.findIndex(t,function(e){return e==n})}var r,o,a,n,e=deep(e,"history"),s=null,p=!1,f=!1,d={captcha:{id:"captcha",render:"captcha",nextindex:"email",prev:function(t){var e=w.sdk.address.pnet().address;w.app.settings.get(e,"request")||""?k.next():h.check(function(e){e?k.next():w.sdk.captcha.get(function(e,n){n?k.to("network"):e.done?(k.next(),h.request()):(d.captcha.current=e,t())},!0)},!0)},after:function(e,n){var t,a=e.find(".ucaptchainput"),o=e.find(".redo"),i=e.find(".addCaptcha");setTimeout(function(){a.focus()},150);function r(e){return!!/^[a-zA-Z0-9]{4,}$/.test(e)}a.on("keyup",function(){t=$(this).val(),r(t)?i.removeClass("disabled"):i.addClass("disabled")}),i.on("click",function(){var e=a.val();r(e)&&w.sdk.captcha.make(e,function(e,n){return"captchashots"==e?(sitemessage(w.app.localization.e("e13118")),void k.redo()):void(e?sitemessage(w.app.localization.e("e13118")):n.done&&(k.next(),h.request()))},!0)}),o.one("click",function(){w.app.platform.m.log("userwisard_captcha_redo"),k.redo()})}},email:{id:"email",nextindex:"money",prev:function(e){m.referral(),localStorage.uei?k.next():e()},render:"email",after:function(e,n,t){function a(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)}var o,i=e.find(".uemailinput"),r=e.find(".skip"),s=e.find(".addEmail");i.focus(),i.on("keyup",function(){o=$(this).val(),a(o)?(s.removeClass("disabled"),r.addClass("hidden"),s.html(w.app.localization.e("e13119"))):(s.addClass("disabled"),r.removeClass("hidden"),s.html(w.app.localization.e("e13113")))}),s.on("click",function(){var e=i.val();a(e)&&(w.app.platform.m.log("userwisard_email_add"),k.next(),localStorage.uei=!0,function(e,t){topPreloader(20);var a={Email:e};a.Action||(a.Action="ADDTOMAILLIST"),a.TemplateID="1005",a.ref="",l(function(e){var n="";a.ref+=c(),e&&(a.ref+=", "+e,n+='<p><a href="https://pocketnet.app/author?address='+w.app.ref+'">Referrer: '+e+"</a></p>");e=deep(document,"referrer");e&&(n+='<p><a href="'+e+'">From: '+e+"</a></p>"),a.body=encodeURIComponent(n),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:a,dataType:"json",success:function(){topPreloader(100),t&&t()}})})}(e,function(){}))}),r.one("click",function(){w.app.platform.m.log("userwisard_email_skip"),localStorage.uei=!0,k.next()})}},money:{id:"money",nextindex:"settings",prev:function(n){h.check(function(e){e?k.next():p?k.to("captcha"):f?k.to("moneyfail"):n()})},ret:!1,render:"money",after:function(n,t,e){k.timer(n.find(".time"),e||59,function(){h.check(function(e){!e||"money"!=u&&"captcha"!=u?(w.app.platform.m.log("userwisard_modey_delay"),n.find(".subcaption").html(w.app.localization.e("wesentmoneydelay")),d.money.after(n,t,30)):(w.app.platform.m.log("userwisard_money_success"),k.next())},!0)})}},settings:{id:"settings",nextindex:"welcome",prev:function(e){e(),w.app.platform.m.log("userwisard_account")},render:"settings",after:function(e,n){},next:!0},welcome:{id:"welcome",prev:function(e){e()},render:"welcome",after:function(e){w.app.platform.m.log("userwisard_success"),setTimeout(function(){w.nav.api.go({href:"index?r=recommended",history:!0,open:!0})},1500),e.find(".welcome").on("click",function(){var e;"_this"==deep(a,"successHref")?((e=deep(n,"container.close"))&&e(),a.signInClbk&&a.signInClbk()):w.nav.api.go({href:"index?r=recommended",history:!0,open:!0})})}},network:{id:"network",prev:function(e){e()},render:"network",after:function(e){w.app.errors.clbks.filluser=function(){app.errors.state.proxy||app.errors.state.proxymain||("network"!=u||w.app.platform.loadingWithErrors||k.to("captcha"),delete w.app.errors.clbks.filluser)}}},moneyfail:{id:"moneyfail",prev:function(e){e()},render:"moneyfail",after:function(n){function t(){w.app.platform.sdk.node.transactions.get.allBalance(function(e){n.find(".balance").html("Balance: "+w.app.platform.mp.coin(e)+" PKOIN")})}t(),n.find(".check").on("click",function(){topPreloader(20),w.app.platform.sdk.node.transactions.get.allBalance(function(e){topPreloader(100),0<e&&("moneyfail"==u&&k.to("settings"),delete w.app.platform.sdk.node.transactions.clbks.moneyfail),t()}),w.app.platform.sdk.node.transactions.clbks.moneyfail=function(){w.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&("moneyfail"==u&&k.to("settings"),delete w.app.platform.sdk.node.transactions.clbks.moneyfail)})}})}}},u=null,t=_.map(d,function(e,n){return n}),m={referral:function(){l(function(e){var n=c(),t=deep(document,"referrer");w.app.platform.m.log("registration_referal_name",e),w.app.platform.m.log("registration_referal_type",n),t&&w.app.platform.m.log("registration_referal_referrer",t)})}},h={request:function(o){w.sdk.users.requestFreeMoney(function(e,n){var t=w.sdk.address.pnet().address,a=w.app.settings.get(t,"request")||"";e||a?(w.app.settings.set(t,"request","true"),h.follow(),o&&o(!0)):("captcha"==n&&(p=!0,"money"!=u&&"captcha"!=u||k.to("captcha")),"error"==n&&(f=!0,"money"!=u&&"captcha"!=u||k.to("captcha")),o&&o(!1,"err"))})},check:function(n,e){w.app.platform.sdk.node.transactions.get.allBalance(function(e){n&&n(0<e)},e)},follow:function(){w.app.platform.sdk.node.transactions.clbks.filluser||(w.app.platform.sdk.node.transactions.clbks.filluser=function(){delete w.app.platform.sdk.node.transactions.clbks.filluser,h.check(function(e){e?"money"==u&&(w.app.platform.m.log("userwisard_money_success"),k.next()):h.follow()})})}},k={to:function(e,n){u=e,k.makeStep(n)},redo:function(e){k.makeStep(function(){})},next:function(e){(u=u?d[u].nextindex:d.captcha.id)&&k.makeStep(function(){})},makeStep:function(e){var t=d[u];t&&t.prev(function(){r.c&&(r.c.attr("step",t.id),g.panel(t,function(n){g.step(t,function(e){_scrollTop(e,s),n.find(".elpanel").addClass("active"),t.after(e,n)})}))})},timer:function(t,a,e){var o=new CircularProgress({radius:120,strokeStyle:"#00A3F7",lineCap:"round",lineWidth:1,font:"100 56px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#5D5D5D",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});t.find(".circle").html(o.el);function n(e){var n=secInTime(e/1e3).split(":");t.find(".t .min").html(n[0]),t.find(".t .sec").html(n[1]),o.options.text={value:""},(e=100*(1-e/(1e3*a)))<0&&(e=0),o.update(e)}timer=new Timer({ontick:function(){n(timer.getDuration())},onend:function(){e&&e()}}),timer.start(a),n(timer.getDuration())}},v=function(){var e,n;u&&(e=d[u],n=r.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),e=r.c.find(".stepsWrapperLine"),n=n.closest(".stepsWrapper").width(),r.c.find(".step").width(n),e.css("margin-left","-"+i(u)*n+"px"),e.width(n*_.toArray(d).length))},g={step:function(e,t){r.c.find(".step").removeClass("active");var n=r.c.find('.step[step="'+e.id+'"] .stepBody'),a=n.closest(".step"),o=r.c.find(".stepsWrapperLine");g[e.render](n,function(e){var n=a.closest(".stepsWrapper").width();r.c.find(".step").width(n),o.width(n*_.toArray(d).length);n="-"+i(u)*n+"px";o.css("margin-left",n),a.closest(".step").addClass("active"),t&&t(e)})},panel:function(e,n){w.shell({name:"panel",el:r.panel,data:{step:e}},function(e){n&&n(e.el)})},captcha:function(e,n){w.shell({name:"captcha",el:e,data:{captcha:d.captcha.current}},function(e){n&&n(e.el)})},email:function(e,n){w.shell({name:"email",el:e,data:{}},function(e){n&&n(e.el)})},welcome:function(e,n){w.shell({name:"welcome",el:e,data:{}},function(e){n&&n(e.el)})},moneyfail:function(e,n){w.shell({name:"moneyfail",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){w.shell({name:"network",el:e,data:{}},function(e){n&&n(e.el)})},money:function(e,n){w.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,a,e){w.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:r.panel,success:function(){k.next()}},clbk:function(e,n){o=n,a&&a(t)}})}},y=function(){};return{primary:e,getdata:function(n,e){f=p=!1,a=e.settings.essenseData||{},u=null;var t={steps:d};w.app.user.validate()?w.app.nav.api.load({open:!0,href:"index",history:!0}):w.app.errors.connection()?w.app.nav.api.load({open:!0,href:"userpage?id=test",history:!0}):w.fastTemplate("panel",function(e){n(t)})},destroy:function(){window.removeEventListener("resize",v),o&&o.destroy(),o=null,r={},$("html").removeClass("fillinguser")},init:function(e){y(),(r={}).c=e.el.find("#"+w.map.id),r.panel=r.c.find(".panelWrapper"),window.addEventListener("resize",v),n=e,k.next(),(s=r.c.closest(".wndcontent")).length||(s=null),$("html").addClass("fillinguser"),e.clbk(null,e)}}}var w=new nModule,a={};return w.run=function(e){var n=w.addEssense(a,t,e);w.init(n,e)},w.stop=function(){_.each(a,function(e){e.destroy()})},w}();"undefined"!=typeof module?module.exports=filluser:(app.modules.filluser={},app.modules.filluser.module=filluser);
 /*_____*/ 
var filluserfast=function(){function t(e){function i(n){return _.findIndex(l,function(e){return e==n})}var s,t,a,e=deep(e,"history"),o={},r=null,c={settings:{id:"settings",nextindex:"captcha",prev:function(e){e()},render:"settings",after:function(e,n){},next:!0},captcha:{id:"captcha",render:"captcha",nextindex:"welcome",prev:function(t){var e=m.sdk.address.pnet().address;m.app.settings.get(e,"request")||""?p.next():d.check(function(e){e?p.next():m.sdk.captcha.get(function(e,n){n?p.to("network"):e.done?d.request(function(e){e&&p.next()}):(c.captcha.current=e,t())},!0)},!0)},after:function(e,n){var t,a=e.find(".ucaptchainput"),o=e.find(".redo"),i=e.find(".addCaptcha");a.focus();function s(e){return!!/^[a-zA-Z0-9]{4,}$/.test(e)}a.on("keyup",function(){t=$(this).val(),s(t)?i.removeClass("disabled"):i.addClass("disabled")}),i.on("click",function(){var e=a.val();s(e)&&m.sdk.captcha.make(e,function(e,n){return"captchashots"==e?(sitemessage(m.app.localization.e("e13118")),void p.redo()):void(e?sitemessage(m.app.localization.e("e13118")):n.done&&d.request(function(e){e&&p.next()}))},!0)}),o.one("click",function(){p.redo()})}},welcome:{id:"welcome",prev:function(e){m.app.platform.sdk.theme.set("black"),t.welcomepart&&t.welcomepart(),e()},render:"welcome",after:function(e){function n(){var e;"_this"==deep(t,"successHref")?((e=deep(a,"container.close"))&&e(),t.signInClbk&&t.signInClbk()):m.nav.api.go({href:"index?r=recommended",history:!0,open:!0}),m.app.platform.ui.showmykeyfast()}setTimeout(function(){n()},1500),e.find(".welcome").on("click",function(){n()})}},network:{id:"network",prev:function(e){e()},render:"network",after:function(e){m.app.errors.clbks.filluserfast=function(){app.errors.state.proxy||app.errors.state.proxymain||("network"!=r||m.app.platform.loadingWithErrors||p.to("captcha"),delete m.app.errors.clbks.filluserfast)}}},moneyfail:{id:"moneyfail",prev:function(e){e()},render:"moneyfail",after:function(n){function t(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){n.find(".balance").html("Balance: "+m.app.platform.mp.coin(e)+" PKOIN")})}t(),n.find(".check").on("click",function(){topPreloader(20),m.app.platform.sdk.node.transactions.get.allBalance(function(e){topPreloader(100),0<e&&("moneyfail"==r&&p.to("settings"),delete m.app.platform.sdk.node.transactions.clbks.moneyfail),t()}),m.app.platform.sdk.node.transactions.clbks.moneyfail=function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&("moneyfail"==r&&p.to("welcome"),delete m.app.platform.sdk.node.transactions.clbks.moneyfail)})}})}}},l=_.map(c,function(e,n){return n}),d={request:function(o){m.sdk.users.requestFreeMoney(function(e,n){var t=m.sdk.address.pnet().address,a=m.app.settings.get(t,"request")||"";e||a?(m.app.settings.set(t,"request","true"),m.sdk.registrations.add(t,3),o&&o(!0)):("captcha"==n&&("money"!=r&&"captcha"!=r||p.to("captcha")),"error"==n&&("money"!=r&&"captcha"!=r||p.to("moneyfail")),o&&o(!1,"err"))})},check:function(n,e){m.app.platform.sdk.node.transactions.get.allBalance(function(e){n&&n(0<e)},e)},follow:function(){m.app.platform.sdk.node.transactions.clbks.filluser||(m.app.platform.sdk.node.transactions.clbks.filluser=function(){delete m.app.platform.sdk.node.transactions.clbks.filluser,d.check(function(e){e?"money"==r&&p.next():d.follow()})})}},p={preloader:function(e){e?s.c.addClass("loading"):s.c.removeClass("loading")},signin:function(n){m.user.signin(o.mnemonicKey,function(e){n&&n()})},to:function(e,n){r=e,p.makeStep(n)},redo:function(e){p.makeStep(function(){})},next:function(e){var n;(r=r?c[r].nextindex:((n=deep(app,"platform.sdk.user.storage.me"))&&n.relay?c.captcha:c.settings).id)&&p.makeStep(function(){})},makeStep:function(e){var t=c[r];t&&(p.preloader(!0),t.prev(function(){s.c&&(s.c.attr("step",t.id),f.panel(t,function(n){f.step(t,function(e){p.preloader(!1),_scrollTop(e,scrollel),n.find(".elpanel").addClass("active"),t.after(e,n)})}))}))},testqrcodeandkey:function(e,n){e=m.app.user.keysFromMnemo(trim(e)).privateKey.toString("hex"),e=f.qrcode(s.c.find(".hiddenqrcode"),e)._oDrawing._oContext.canvas.toDataURL("image/jpeg");grayscaleImage(e,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?n&&n(!1):n&&n(!0)},qrscanner.q.decode(e)})},generate:function(n){var t;o.mnemonicKey?n&&n():(t=bitcoin.bip39.generateMnemonic(),p.testqrcodeandkey(t,function(e){e?(o.mnemonicKey=t,o.mnemonicMask=_.shuffle(indexArray(o.mnemonicKey.length)),o.mnemonicContent=o.mnemonicKey.split(" "),e=m.app.user.keysFromMnemo(o.mnemonicKey),o.mainAddress=app.platform.sdk.address.pnetsimple(e.publicKey).address,o.mk=e.privateKey.toString("hex"),n&&n()):p.generate()}))},waitgeneration:function(e){retry(function(){if(o.mnemonicKey)return!0},e,40)}},n=function(){var e,n;r&&(e=c[r],n=s.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),e=s.c.find(".stepsWrapperLine"),n=n.closest(".stepsWrapper").width(),s.c.find(".step").width(n),e.css("margin-left","-"+i(r)*n+"px"),e.width(n*_.toArray(c).length))},f={qrcode:function(e,n){return new QRCode(e[0],{text:n,width:256,height:256})},step:function(e,t){s.c.find(".step").removeClass("active");var n=s.c.find('.step[step="'+e.id+'"] .stepBody'),a=n.closest(".step"),o=s.c.find(".stepsWrapperLine");f[e.render](n,function(e){var n=a.closest(".stepsWrapper").width();s.c.find(".step").width(n),o.width(n*_.toArray(c).length);n="-"+i(r)*n+"px";o.css("margin-left",n),a.closest(".step").addClass("active"),t&&t(e)})},panel:function(e,n){m.shell({name:"panel",el:s.panel,turi:"filluser",data:{step:e}},function(e){n&&n(e.el)})},captcha:function(e,n){m.shell({name:"captcha",el:e,turi:"filluser",data:{captcha:c.captcha.current}},function(e){n&&n(e.el)})},email:function(e,n){m.shell({name:"email",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},welcome:function(e,n){m.shell({name:"welcome",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},moneyfail:function(e,n){m.shell({name:"moneyfail",turi:"filluser",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){m.shell({name:"network",el:e,turi:"filluser",data:{}},function(e){n&&n(e.el)})},money:function(e,n){m.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,a,e){m.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:s.panel,presave:function(e){p.waitgeneration(function(){p.signin(function(){m.sdk.registrations.add(o.mainAddress,1),e&&e()})})},relay:function(){return o.mainAddress},success:function(e){o.info=e,m.sdk.registrations.add(o.mainAddress,2),u.save(),p.next()}},clbk:function(e,n){ext=n,a&&a(t)}})}},u={save:function(){},load:function(){}};return{primary:e,getdata:function(e,n){n.state&&"fuf"!=m.user.validateVay()?m.app.nav.api.load({open:!0,href:"index",history:!0}):(0,t=deep(n,"settings.essenseData")||{},r=null,e({steps:c,inauth:deep(n,"settings.essenseData.inauth")||!1}))},destroy:function(){window.removeEventListener("resize",n),delete m.app.platform.sdk.node.transactions.clbks.moneyfail,delete m.app.errors.clbks.filluserfast,delete m.app.platform.sdk.node.transactions.clbks.filluser,s={}},init:function(e){u.load(),(s={}).c=e.el.find("#"+m.map.id),s.panel=s.c.find(".panelWrapper"),a=e,scrollel=s.c.closest(".wndcontent"),scrollel.length||(scrollel=null),window.addEventListener("resize",n),m.app.user.isState(function(e){e?(o={}).mainAddress=m.app.user.address.value:setTimeout(function(){p.generate(function(){})},1e3),p.next()}),e.clbk(null,e)}}}var m=new nModule,a={};return m.run=function(e){var n=m.addEssense(a,t,e);m.init(n,e)},m.stop=function(){_.each(a,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=filluserfast:(app.modules.filluserfast={},app.modules.filluserfast.module=filluserfast);
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
var test=function(){function n(e){var t,o,d,n,a=deep(e,"history"),r=!1,i={language:h.app.localization.key||"en"},p={saveemail:function(e,n){var a,s={Email:e};s.Action||(s.Action="ADDTOMAILLIST"),s.TemplateID="1005",s.ref="",a=function(e){var a="";e&&(s.ref+=e,a+='<p><a href="https://pocketnet.app/author?address='+h.app.ref+'">Referrer: '+e+"</a></p>");e=deep(document,"referrer");e&&(a+='<p><a href="'+e+'">From: '+e+"</a></p>"),s.body=encodeURIComponent(a),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:s,dataType:"json",success:function(){n&&n()}})},h.app.ref?h.sdk.users.get(h.app.ref,function(){var e=deep(h,"sdk.users.storage."+h.app.ref+".name");a&&a(e)}):a&&a(null)},valid:function(e,a){if(!p.equal(e,a)&&trim(e.name)&&e.image)return!0},equal:function(e,a){function n(e){return"name:"+(trim(e.name)||"")+"image:"+(e.image||"")+"about:"+(trim(e.about)||"")+"site:"+(trim(e.site)||"")+"language:"+(e.language||"")+"addresses:"+JSON.stringify(e.addresses||[])}return n(e)==n(a)},cancel:function(){p.userOptions(),p.upanel(),v.icon(),v.options()},ref:function(e){d&&r&&(localStorage[h.app.platform.sdk.address.pnet().address+"subscribeRef"]=d.address)},save:function(e){function r(){t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100),a?h.nav.api.go({href:"index",history:!0,open:!0}):o.success?o.success():e&&e()}h.sdk.users.checkFreeRef(h.app.platform.sdk.address.pnet()?h.app.platform.sdk.address.pnet().address:"",function(n,e){if(!t.c.find(".userPanel").hasClass("loading"))if(p.equal(i,h.app.platform.sdk.user.storage.me))sitemessage(h.app.localization.e("uchanges"));else{if(!p.valid(i,h.app.platform.sdk.user.storage.me))return sitemessage(h.app.localization.e("uchangesvalid")),void(trim(i.name)?i.image||(s=t.c.find(".fileUploader"),_scrollTo(s)):((s=t.c.find('[parameter="name"] input')).focus(),_scrollTo(s)));var a=new UserInfo;a.name.set(trim(i.name)),a.language.set(i.language),a.about.set(trim(i.about)),a.site.set(trim(i.site)),a.image.set(i.image),a.addresses.set(i.addresses),a.ref.set(deep(d,"address")||"");var s,e=a.validation();if(e)return t.c.find(".errorname").fadeIn(),"namelength"==e&&t.c.find(".errorname span").html("The name length can be more than 20 symbols"),"pocketnet"==e&&t.c.find(".errorname span").html("To avoid user confusion using Pocketnet in name is reserved"),(s=t.c.find('[parameter="name"] input')).focus(),_scrollTo(s),!1;topPreloader(30),t.c.find(".userPanel").addClass("loading"),t.upanel.addClass("loading"),h.app.platform.sdk.users.nameExist(a.name.v,function(e){!e||h.app.platform.sdk.address.pnet()&&e==h.app.platform.sdk.address.pnet().address?(topPreloader(50),o.presave(function(){t.c.find(".errorname").fadeOut(),topPreloader(70),a.uploadImage(function(){if(o.makeuser)return topPreloader(100),t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),void o.makeuser(a);var e=i.email;e&&p.saveemail(e),h.sdk.node.transactions.create.commonFromUnspent(a,function(e,a){e?(successCheck(),delete h.sdk.usersl.storage[h.app.platform.sdk.address.pnet().address],delete h.sdk.users.storage[h.app.platform.sdk.address.pnet().address],h.app.platform.sdk.user.storage.me=e,i=_.clone(h.app.platform.sdk.user.storage.me),p.upanel(),p.ref(n),h.app.platform.sdk.users.getone(h.app.platform.sdk.address.pnet().address,function(){h.app.reloadModules(function(){o.presuccess?o.presuccess(r):r()})})):(h.app.platform.errorHandler(a,!0),t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100))},{relay:!!o.relay&&o.relay()})})})):(t.upanel.removeClass("loading"),t.c.find(".userPanel").removeClass("loading"),topPreloader(100),t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("This username is taken in Pocketnet"))})}})},upload:function(e,s){topPreloader(20);var a=[{original:e.base64,index:0}];h.nav.api.load({open:!0,id:"imageGalleryEdit",inWnd:!0,essenseData:{edit:!0,initialValue:0,images:a,apply:!0,crop:{aspectRatio:1,style:"round apply",autoCropArea:.9},success:function(e,n){a[0].original,resize(a[0].original,100,100,function(e){var a=e.split(",");n(),a[1]?(i.image=e,v.icon(),p.upanel(),s&&s()):topPreloader(100)})}}})},upanel:function(){t.upanel&&(0<_.toArray(h.app.platform.sdk.node.transactions.temp.userInfo||{}).length||h.app.platform.sdk.address.pnet()&&0<deep(h.sdk.relayTransactions.storage,h.app.platform.sdk.address.pnet().address+".userInfo.length")?(t.upanel.addClass("wait"),t.c.find(".caption").remove()):(t.upanel.removeClass("wait"),p.equal(i,h.app.platform.sdk.user.storage.me)||!p.valid(i,h.app.platform.sdk.user.storage.me)?t.upanel.removeClass("changes"):t.upanel.addClass("changes")))},clear:function(){p.userOptions(),v.caption()},userOptions:function(){i=_.clone(h.app.platform.sdk.user.storage.me),_.each(l,function(a,n){var e=h.app.platform.sdk.user.storage.me[a.id];"addresses"==n&&(e=_.clone(h.app.platform.sdk.user.storage.me[a.id])),a.value=e||a.defaultValue||"",i[a.id]=a.value,a._onChange=function(e){if(i[a.id]="addresses"==n?_.clone(e):trim(e),p.upanel(),"language"!=n||(e=h.app.localization.available[e])&&e.key!=h.app.localization.key&&h.app.localization.lightSet(e.key),"name"==n){if(-1<i[a.id].toLowerCase().replace(/[^a-z]/g,"").indexOf("pocketnet"))return t.c.find(".errorname").fadeIn(),void t.c.find(".errorname span").html("To avoid user confusion using Pocketnet in name is reserved");20<i[a.id].length?(t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("The name length can be more than 20 symbols")):h.app.platform.sdk.users.nameExist(i[a.id],function(e){!e||h.app.platform.sdk.address.pnet()&&e==h.app.platform.sdk.address.pnet().address?t.c.find(".errorname").fadeOut():(t.c.find(".errorname").fadeIn(),t.c.find(".errorname span").html("This username is taken in Pocketnet"))})}}})},signout:function(){h.app.user.signout(),h.app.reload({href:"authorization"})}},l={name:new Parameter({name:h.app.localization.e("unickname"),id:"name",type:"NICKNAME",require:!0}),email:new Parameter({name:"Email",id:"email",type:"EMAIL",onType:!0}),language:new Parameter({name:h.app.localization.e("ulanguage"),id:"language",type:"VALUES",defaultValue:h.app.localization.key||"en",possibleValues:["en","ru"],possibleValuesLabels:["English","Русский"]}),about:new Parameter({name:h.app.localization.e("uabout"),id:"about",type:"TEXT",onType:!0,placeholder:h.app.localization.e("e13351")}),site:new Parameter({name:h.app.localization.e("uwebsite"),id:"site",type:"STRINGANY",onType:!0,value:""}),addresses:new function(){var n=this;return n.id="addresses",n.name=h.app.localization.e("uaddresesd"),n.value=[],n.defaultValue=[],n.remove=function(e,a){removeEqual(n.value,{currency:e,address:a}),n._onChange&&n._onChange(n.value),n.addedAddresses()},n.add=function(e){n.value.push(e),n._onChange&&n._onChange(n.value),n.addedAddresses()},n.addDialog=function(){function r(e,a){return 0<a.length}y.fastTemplate("addaddress",function(e){dialog({html:e,wrap:!0,success:function(e){var a=e.el.find(".currency").val(),e=e.el.find(".address").val();if(r(0,e))return n.add({currency:a,address:e}),!0},clbk:function(e){var a=e.find(".currency"),n=e.find(".address"),s=e.find(".btn1"),e=function(){a.val();var e=n.val();return r(0,e)?(s.removeClass("disabled"),!0):(s.addClass("disabled"),!1)};n.focus(),n.on("change",e),n.on("keyup",e),a.on("change",e),a.on("keyup",e),e()},class:"one addaddressDialog zindex"})},{})},n.removeEvent=function(){var e=$(this).closest(".addedAddress").attr("currency"),a=$(this).closest(".addedAddress").attr("address");n.remove(e,a)},n.addedAddresses=function(){var a="";_.each(n.value,function(e){e&&e.currency&&(a+='<div class="addedAddressWrapper">',a+='<div class="addedAddress table" currency="'+e.currency+'" address="'+e.address+'">',a+='<div class="currencyWrapper">',a+=e.currency.toUpperCase(),a+="</div>",a+='<div class="addressWrapper">',a+=e.address,a+="</div>",a+='<div class="panelWrapper">',a+='<div class="item remove">',a+='<i class="far fa-times-circle"></i>',a+="</div>",a+="</div>",a+="</div>",a+="</div>")}),n.el.find(".addedAddressesWrapper").html(a),n.el.find(".addedAddressesWrapper .remove").on("click",n.removeEvent)},n.init=function(e){n.defaultValue=[],n.el=e.find(".adressesInput"),n.addedAddresses(),n.el.find(".addaddress").on("click",n.addDialog)},n.input=function(){return'<div class="adressesInput"><div class="addaddressWrapper"><div class="addaddress"><i class="fas fa-plus"></i></div></div><div class="addedAddressesWrapper"></div></div>'},n}},s=function(){p.signout()},u=function(){p.save()},c=function(){p.cancel()},f=function(){var e=h.app.platform.sdk.address.pnet();topPreloader(30),h.app.platform.sdk.node.account.import(e.address,function(){topPreloader(100),sitemessage("Address "+e.address+" was successfully imported")})},m=null,g=null,v={options:function(a){h.shell({name:"options",el:t.options,data:{tempInfo:i,userOptions:l}},function(e){ParametersLive(_.toArray(l),e.el),l.addresses.init(e.el),a&&a()})},icon:function(a){h.shell({name:"icon",el:t.icon,data:{tempInfo:i,ed:o}},function(e){initUpload({el:e.el.find(".pgroup"),ext:["png","jpeg","jpg"],dropZone:t.c,multiple:!1,action:function(e,a){p.upload(e,function(){n&&n.destroy(),_scrollTo(t.c.find(".nickname input").focus()),a&&a()})}}),o.wizard&&!i.image&&(n=h.app.platform.api.plissing({el:e.el.find(".iconWrapper"),text:"Upload Profile Image"})),a&&a()})},unspent:function(e,a){h.shell({name:"unspent",el:t.unspent,data:{unspent:e}},function(e){a&&a()})},caption:function(e,a){},address:function(){t.c.find(".adr").html(bitcoin.payments[h.app.platform.addressType]({pubkey:h.app.user.key.value}))}},k=function(){};return{primary:a,getdata:function(s,e){d=null,(o=e.settings.essenseData||{}).presave||(o.presave=function(e){e&&e()}),h.app.platform.sdk.user.get(function(){var e,a;_.isEmpty(h.app.platform.sdk.user.storage.me)&&(r=!0,(a=h.app.ref)&&a!=h.app.platform.sdk.address.pnet()&&(d=a)),e=_.map(h.app.platform.nodes,function(e,a){return a.toString()}),a=_.map(h.app.platform.nodes,function(e,a){return e.full}),(m=new Parameter({type:"VALUES",name:"setNode",id:"setNode",possibleValues:e,possibleValuesLabels:a,defaultValue:"1"})).value=h.app.platform.nodeid,m._onChange=function(e){h.app.platform.nodeid=e,h.app.platform.state.save()},(g=new Parameter({type:"VALUES",name:"setAddressType",id:"setAddressType",possibleValues:h.app.platform.addressTypes,possibleValuesLabels:["P2PKH","P2SH"],defaultValue:"p2sh"})).value=h.app.platform.addressType,g._onChange=function(e){h.app.platform.addressType=e,h.app.platform.state.save(),h.user.address.set(h.app.platform.sdk.address.pnet().address),h.app.reload()},p.userOptions();var n={};n.p2pkh=h.app.platform.sdk.address.pnet(),n.setNode=m,n.setAddressType=g,n.userOptions=l,n.tempInfo=i,n.firstTime=r,n.ref=d,n.caption=o.caption,d?h.sdk.users.get(d,function(){var e=d;(d=h.sdk.users.storage[e]||null)&&(d.address=e),n.ref=d,s(n)}):s(n)})},destroy:function(){return t={},h.app.platform.sdk.user.storage.me&&!p.equal(i,h.app.platform.sdk.user.storage.me)?function(e){function a(){delete h.app.platform.ws.messages.transaction.clbks.utemp,e()}dialog({html:h.app.localization.e("usavechanges"),btn1text:h.app.localization.e("dyes"),btn2text:h.app.localization.e("dno"),success:function(){p.save(a)},fail:function(){i=_.clone(h.app.platform.sdk.user.storage.me),a()}})}:null},init:function(e){k(),(t={}).c=e.el.find("#"+h.map.id),t.transaction=e.el.find(".transactionInfo"),t.unspent=e.el.find(".unspentlist"),t.showhidetestpanel=e.el.find(".showhidetestpanel"),t.import=e.el.find(".import"),t.caption=t.c.find(".bgCaption"),t.icon=t.c.find(".pgroupIconWrapper"),t.usericon=t.c.find(".usericon"),t.options=t.c.find(".optionsParameters"),t.upanel=o.panel||t.c.find(".upanel"),t.signout=t.c.find(".signout"),t.import.on("click",f),t.showhidetestpanel.on("click",function(){$(this).closest(".testPanel").toggleClass("active")}),t.upanel.find(".cancel").on("click",c),t.upanel.find(".save").on("click",u),ParametersLive([m,g],t.c),t.signout.on("click",s),t.c.find(".refRemove").on("click",function(){d=null,delete localStorage.ref,t.c.find(".referalMaketWrapper").remove()}),p.upanel(),v.caption(),v.icon(),v.options(),h.sdk.node.transactions.get.unspent(function(e){v.unspent(e)}),h.app.platform.ws.messages.transaction.clbks.utemp=function(e){e.temp&&"userInfo"==e.temp.type&&p.upanel()},e.clbk(null,e)},wnd:{class:"withoutButtons allscreen testwindow"}}}var h=new nModule,y=h,s={};return h.run=function(e){var a=h.addEssense(s,n,e);h.init(a,e)},h.stop=function(){var a=null;if(_.each(s,function(e){e=e.destroy();e&&(a=e)}),a)return{action:a}},h}();"undefined"!=typeof module?module.exports=test:(app.modules.test={},app.modules.test.module=test);
 /*_____*/ 
var streampeertube=function(){function n(e){var o,e=deep(e,"history"),n=function(){};return{primary:e,getdata:function(e,o){t=o.settings.essenseData,t.actions;e({})},destroy:function(){o={}},init:function(e){n(),(o={}).c=e.el.find("#"+r.map.id),o.videoInput=o.c.find(".upload-video-file"),o.videoWallpaper=o.c.find(".upload-video-wallpaper"),o.videoError=o.c.find(".file-type-error"),o.wallpaperError=o.c.find(".wallpaper-type-error"),o.uploadProgress=o.c.find(".upload-progress-container"),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fas fa-upload"></i> Upload',fn:function(e,o){o.close()}}},close:function(){t.closeClbk&&t.closeClbk()},success:function(e,o){wndObj=o,wnd=e},offScroll:!0,noInnerScroll:!0,class:"streampeertube",swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30}}}var r=new nModule,s={},t={};return r.run=function(e){var o=r.addEssense(s,n,e);r.init(o,e)},r.stop=function(){_.each(s,function(e){e.destroy()})},r}();"undefined"!=typeof module?module.exports=streampeertube:(app.modules.streampeertube={},app.modules.streampeertube.module=streampeertube);
 /*_____*/ 
var tagcloud=function(){function a(n){var a,n=deep(n,"history"),o=function(n,t){n.length?(a.c.removeClass("hidden"),d.shell({name:"tags",el:a.tags,data:{tags:n}},function(n){n.el.find(".showhidealltags").on("click",function(){a.c.toggleClass("showedalltags")}),t&&t()})):a.c.addClass("hidden")},t=function(){},e=function(){var a;a=function(n,t){t&&(d.iclbks.main=e),o(n)},d.app.platform.sdk.tags.cloud(function(n,t){n=d.app.platform.sdk.tags.filterEx(n),a&&a(n,t)})};return{primary:n,getdata:function(n){n({})},destroy:function(){delete d.iclbks.main,a={}},init:function(n){t(),(a={}).c=n.el.find("#"+d.map.id),a.tags=a.c.find(".tags"),e(),n.clbk(null,n)}}}var d=new nModule,o={};return d.run=function(n){var t=d.addEssense(o,a,n);d.init(t,n)},d.stop=function(){_.each(o,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=tagcloud:(app.modules.tagcloud={},app.modules.tagcloud.module=tagcloud);
 /*_____*/ 
var uploadpeertube=function(){function o(e){var n,e=deep(e,"history"),d={},r=function(){};return{primary:e,getdata:function(e,r){i=r.settings.essenseData,d=i.actions;e({})},destroy:function(){n={}},init:function(e){r(),(n={}).c=e.el.find("#"+s.map.id),n.videoInput=n.c.find(".upload-video-file"),n.videoWallpaper=n.c.find(".upload-video-wallpaper"),n.videoError=n.c.find(".file-type-error"),n.wallpaperError=n.c.find(".wallpaper-type-error"),n.uploadProgress=n.c.find(".upload-progress-container"),n.videoInput.change(function(e){e=e.target.files[0].name;n.videoError.text(e.slice(0,20)+(20<e.length?"...":"")),n.videoError.removeClass("error-message")}),n.videoWallpaper.change(function(e){e=e.target.files[0].name;n.wallpaperError.text(e.slice(0,20)+(20<e.length?"...":"")),n.wallpaperError.removeClass("error-message")}),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fas fa-upload"></i> Upload',fn:function(e,r){r.hide();var o=n.videoInput.prop("files"),a=n.videoWallpaper.prop("files"),i=e.find(".upload-video-name").val(),l=e.find(".name-type-error");l.text("");e={};if(!o[0])return n.videoError.text("No video selected"),void n.videoError.addClass("error-message");if(!o[0].type.includes("video"))return n.videoError.text("Incorrect video format"),void n.videoError.addClass("error-message");if(e.video=o[0],a[0]){if(console.log(a[0].type),"image/jpeg"!==a[0].type&&"image/jpg"!==a[0].type)return n.wallpaperError.text("Incorrect wallpaper format. Supported: .jpg, .jpeg"),void n.wallpaperError.addClass("error-message");e.image=a[0]}i?(e.name=i,e.uploadFunction=function(e){e=e.toFixed(2);n.uploadProgress.find(".upload-progress-bar").css("width",e+"%"),n.uploadProgress.find(".upload-progress-percentage").text(e+"%")},e.successFunction=function(e){"error"!==e?(d.added(e),r.close()):sitemessage("Uploading error")},n.uploadProgress.removeClass("hidden"),s.app.peertubeHandler.uploadVideo(e)):l.text("Name is empty")}}},close:function(){i.closeClbk&&i.closeClbk()},success:function(e,r){wndObj=r,wnd=e},offScroll:!0,noInnerScroll:!0,class:"uploadpeertube",swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30}}}var s=new nModule,a={},i={};return s.run=function(e){var r=s.addEssense(a,o,e);s.init(r,e)},s.stop=function(){_.each(a,function(e){e.destroy()})},s}();"undefined"!=typeof module?module.exports=uploadpeertube:(app.modules.uploadpeertube={},app.modules.uploadpeertube.module=uploadpeertube);
 /*_____*/ 
var about=function(){function n(e){var n,t,a,e=deep(e,"history"),i=null,o=null,s={videoWidth:function(e){var t=560,n=315,a=e.width(),n=a/(t/n);e.find("iframe").width(a),e.find("iframe").height(n)},time:function(){today=new Date,today=Math.floor((t-today)/1e3),tsec=today%60,today=Math.floor(today/60),tsec<0?tsec="00":tsec<10&&(tsec="0"+tsec),tmin=today%60,today=Math.floor(today/60),tmin<0?tmin="00":tmin<10&&(tmin="0"+tmin),thour=today%24,today=Math.floor(today/24),thour<0&&(thour="00"),today<0&&(today="00"),n.days.html(today),n.seconds.html(tsec),n.minutes.html(tmin),n.hours.html(thour)},fixed:function(){var e=$(window).scrollTop();n.main.offset().top+n.main.height()<e?n.fixed.addClass("active"):n.fixed.removeClass("active")},explore:function(){var e=n.c.find(".faq");_scrollToTop(e)},validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,t,n,a){a=a||"4";t={Email:e,Name:t};t.Action||(t.Action="ADDTOMAILLIST"),t.TemplateID||(t.TemplateID=a),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:t,dataType:"json",success:function(){n&&n()}})},joinSuccess:function(e){m.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){m.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var t=e.el.find(".email"),e=e.el.find(".name"),t=t.val(),e=e.val();if(s.validateEmail(t)&&e)return s.saveEmail(t,e),s.joinSuccess(t,e),!0},clbk:function(e){function t(){var e=a.val(),t=n.val();return s.validateEmail(e)&&t?(i.removeClass("disabled"),!0):(i.addClass("disabled"),!1)}var n=e.find(".name"),a=e.find(".email"),i=e.find(".btn1");i.addClass("disabled"),i.on("click",function(){}),n.focus(),n.on("change",t),n.on("keyup",t),a.on("change",t),a.on("keyup",t)},class:"one joinbeta"})},{action:e})},whitepaperSuccess:function(){m.fastTemplate("whitepaperSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})})},whitepaper:function(){m.fastTemplate("whitepaper",function(e){dialog({html:e,wrap:!0,success:function(e){e=e.el.find("input").val();if(s.validateEmail(e))return s.saveEmail(e,"",null,"5"),s.whitepaperSuccess(),!0},clbk:function(e){function t(){var e=$(this).val();return s.validateEmail(e)?(n.removeClass("disabled"),!0):(n.addClass("disabled"),!1)}var n=e.find(".btn1");n.addClass("disabled"),n.on("click",function(){});e=e.find("input");e.focus(),e.on("change",t),e.on("keyup",t)},class:"one joinbeta"})})}},c=function(){s.whitepaper()},l=function(){s.join()},d=function(){var e=$(this).attr("answer");e&&o.send(e,function(){u.survey()})},r=[{name:"Twitter",icon:'<i class="fab fa-twitter"></i>',href:"https://twitter.com/Pocket_Net"},{name:"Telegram",icon:'<i class="fab fa-telegram"></i>',href:"https://t.me/PocketRep"},{name:"Facebook",icon:'<i class="fab fa-facebook"></i>',href:"https://www.facebook.com/PocketNet"},{name:"Minds",image:"https://cdn-assets.minds.com/front/dist/assets/logos/bulb.svg",href:"https://www.minds.com/PocketNet"},{name:"Linkedin",icon:'<i class="fab fa-linkedin"></i>',href:"https://www.linkedin.com/company/cryptolo-io"},{name:"Mastodon",icon:'<i class="fab fa-mastodon"></i>',href:"https://mastodon.social/@PocketRep"},{name:"Gab",image:"https://gab.com/assets/img/logo-dec.png",href:"https://gab.com/PocketNet"},{name:"Sola",image:"https://web.solacore.net/img/logo_medium-3_mNF.png",href:"https://sola.ai/cryptolo_io"},{name:"Medium",icon:'<i class="fab fa-medium"></i>',href:"https://medium.com/@cryptolo.io"}],u={survey:function(t){m.shell({name:"survey",el:n.survey,data:{survey:o},animation:"fadeIn"},function(e){e.el.find(".sendanswer").on("click",d),e.el.find(".resultpercent").each(function(){var e=$(this);e.animate({width:e.attr("w")+"%"},130)}),t&&t()})},tes:function(){var e=n.c.find(".tes");lazyEach({array:e,sync:!0,action:function(e){var t=$(e.item),n=t.attr("time")||600;t.addClass("show"),setTimeout(function(){e.success()},n)}})},lenta:function(){m.nav.api.load({open:!0,id:"lenta",el:n.lenta,animation:!1,mid:"about",essenseData:{author:"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",byauthor:!0,authAction:function(e){s.join(e)},notscrollloading:!0},clbk:function(e,t){i=t}})}},f=function(){};return{primary:e,getdata:function(e){i=null,o=new sQuestion({id:"pocketnetlanding",ajax:m.app.ajax,question:"Are you fed up with traditional social media like Facebook, Twitter and others?",answers:[{t:"Yes, very",v:1},{t:"Yes, somewhat",v:2},{t:"Facebook and Twitter are just great",v:3}]}),e({socials:r,survey:o})},destroy:function(){a&&clearInterval(a),i&&(i.destroy(),i=null),window.removeEventListener("scroll",s.fixed),n={}},init:function(e){f(),(n={}).c=e.el.find("#"+m.map.id),n.lenta=e.el.find(".lenta"),n.main=n.c.find(".main"),n.fixed=n.c.find(".fixedButton"),n.join=n.c.find(".ejoin"),n.whitepaper=n.c.find(".whitepaper"),n.days=e.el.find(".days"),n.seconds=e.el.find(".seconds"),n.minutes=e.el.find(".minutes"),n.hours=e.el.find(".hours"),n.survey=e.el.find(".survey"),t=new Date(2019,0,23,23,59),a=setInterval(s.time,1e3),n.join.on("click",l),n.whitepaper.on("click",c),n.c.find(".exploremore").on("click",s.explore),window.addEventListener("scroll",s.fixed),u.tes(),u.lenta(),o.init(function(){u.survey()}),s.videoWidth(n.c.find(".videoContent")),e.clbk(null,e)}}}var m=new nModule,a={};return m.run=function(e){var t=m.addEssense(a,n,e);m.init(t,e)},m.stop=function(){_.each(a,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=about:(app.modules.about={},app.modules.about.module=about);
 /*_____*/ 
var token=function(){function n(e){var e=deep(e,"history"),o=function(){var e=parameters().token||null;return{type:parameters().type||null,token:e}};return{primary:e,getdata:function(t){var e,n=o();"activate"!=n.type?a.app.platform.ws.addBlock():(delete(e=a.app.platform.ws.messages.CUSTOMER.ACTIVE).clbks.successDialog,e.clbks.success=function(){var e=deep(a,"app.modules.menu.module");e&&e.restart()}),a.app.platform.sdk.tokens.check(n.token,function(e){n.result=e,t(n)})},destroy:function(){a.app.platform.ws.removeBlock(),0},init:function(e){o(),{}.c=e.el.find("#"+a.map.id),e.clbk(null,e)}}}var a=new nModule,o={};return a.run=function(e){var t=a.addEssense(o,n,e);a.init(t,e)},a.stop=function(){_.each(o,function(e){e.destroy()})},a}();"undefined"!=typeof module?module.exports=token:(app.modules.token={},app.modules.token.module=token);
 /*_____*/ 
var article=function(){function t(e){var s,o,c,t,a,n=deep(e,"history"),i=/[,.!?;:()<> \n\r]/g,r={message:g.app.localization.e("emptymessage")},p={newart:function(){return g.app.platform.sdk.articles.empty()},complete:function(){c.save&&c.save(o),d.close(),c.complete&&c.complete(o)},change:function(e){o.content=e,o.time=Math.floor((new Date).getTime()/1e3),c.save&&c.save(o)},changecaption:function(e){o.caption.value=e,o.time=Math.floor((new Date).getTime()/1e3),c.save&&c.save(o)},trx:function(n,i){s.c&&s.c.addClass("loading"),c.share&&(n.aliasid=c.share.aliasid),g.sdk.node.transactions.create.commonFromUnspent(n,function(e,a){if(topPreloader(100),s.c&&s.c.removeClass("loading"),e)try{var t=new pShare;t._import(e,!0),t.temp=!0,t.address=e.address,n.aliasid&&(t.edit="true"),g.app.platform.sdk.node.shares.add(t),o.txid=t.txid,o.ptime=Math.floor((new Date).getTime()/1e3),g.app.platform.sdk.user.survey(),p.complete()}catch(e){console.log(e)}else i?i(!1,r[a]):(a=g.app.platform.errorHandler(a,!0))&&sitemessage(a)},e)},fromShare:function(e){var a=g.app.platform.sdk.articles.empty();return a.caption.value=e.caption.v,a.content=[{value:e.message.v}],a},add:function(){var e=new Share,a=g.app.platform.sdk.articles.echo(o);(new Date).getTime();e.message.set(a),e.caption.set(o.caption.value),e.images.set(g.app.platform.sdk.articles.getImages(a));var t=p.tagsFromText(a);e.tags.set(t),e.settings.v="a",e.settings.videos=g.app.platform.sdk.articles.getVideos(a);t=e.validation();t?r[t]&&sitemessage(r[t]):(t="Do you really want to publish this article?",c.share&&(t="Do you really want to change and publish this article?"),dialog({html:t,btn1text:g.app.localization.e("dyes"),btn2text:g.app.localization.e("dno"),class:"zindex",success:function(){a=filterXSS(a,{stripIgnoreTag:!0,whiteList:{a:["href","title","target"],br:["style"],b:["style"],span:["style"],figure:["style"],figcaption:["style","class"],i:["style"],img:["src","width","height"],div:["class","data-plyr-provider","data-plyr-embed-id"],p:[],ul:[],ol:[],li:[],h2:[],h1:[],h3:[],h4:[],h5:[],em:[],u:[],blockquote:[],strong:[],picture:["img-type"],source:["srcset","type"],strike:[]}}),e.message.set(a),p.trx(e)}}))},tagsFromText:function(e){var e=e.split(i),t=_.filter(e,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))});return _.each(t,function(e,a){t[a]=e.replace(/\#/g,"")}),t}},d={authorclose:function(){g.nav.api.load({open:!0,href:"author?address="+g.app.user.address.value.toString("hex"),history:!0}),g.closeContainer(),c.closeContainer&&c.closeContainer()},changecaption:function(){var e=$(this).val();p.changecaption(e)},change:function(){a=slowMade(function(){var e=g.app.platform.sdk.articles.lightVideo(t.serialize());p.change(e)},a,300)},close:function(){c.close&&c.close(),g.closeContainer()},add:function(){p.add()},goto:function(){o.txid&&(g.closeContainer(),c.closeContainer&&c.closeContainer(),g.nav.api.load({open:!0,href:"index?s="+o.txid,history:!0}))}},f=function(e,a){s.caption.val(e.caption.value)},u=function(){};return{primary:n,getdata:function(e,a){c=a.settings.essenseData||{},o=c.art||p.newart(parameters().aid),e({art:o=c.share?p.fromShare(c.share):o,ed:c})},destroy:function(){g.app.nav.api.history.removeParameters(["aid"]),s={}},init:function(e){var a;u(),(s={}).c=e.el.find("#"+g.map.id),s.caption=s.c.find(".caption"),s.content=s.c.find(".content"),s.back=s.c.find(".back"),s.add=s.c.find(".add"),s.goto=s.c.find(".goto"),s.back.on("click",d.close),s.caption.on("keyup",d.changecaption),s.add.on("click",d.add),s.goto.on("click",d.goto),s.c.find(".uic").on("click",d.authorclose),s.c.find(".username").on("click",d.authorclose),t=new MediumEditor(".edt",{delay:500,targetBlank:!0,toolbar:{buttons:["bold","italic","underline","anchor","quote"],diffLeft:25,diffTop:10},anchor:{placeholderText:"Type a link",customClassOption:"btn",customClassOptionText:"Create Button"},paste:{cleanPastedHTML:!0,cleanAttrs:["style","dir"],cleanTags:["label","meta"]},anchorPreview:{hideDelay:300},placeholder:{text:"Text",hideOnClick:!1}}),$(function(){$(".edt").mediumInsert({editor:t,addons:{images:{label:'<span class="fas fa-camera"></span>',deleteScript:function(e,a){g.sdk.imagesH.delete(e)},fileDeleteOptions:{},preview:!0,captions:!0,captionPlaceholder:g.app.localization.e("e13013"),autoGrid:3,formData:{},upload:function(e,t){resize(e,1080,1080,function(e){e=e.split(",");e[1]&&g.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:e[1]},success:function(e){var a=deep(e,"data.link");a?(e=deep(e,"data.deletehash"))&&g.sdk.imagesH.add(a,e):a="https://pocketnet.app/img/imagenotuploaded.jpg",t&&t(a)},fail:function(){l="https://pocketnet.app/img/imagenotuploaded.jpg",t&&t(l)}})})},fileUploadOptions:{acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i},styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'},grid:{label:'<span class="fa fa-th"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}},messages:{acceptFileTypesError:g.app.localization.e("e13014")+" ",maxFileSizeError:g.app.localization.e("e13015")+" "},uploadCompleted:function(e,a){d.change()},uploadFailed:function(e,a){}},embeds:{label:'<span class="fas fa-play"></span>',placeholder:g.app.localization.e("e13016"),styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}}}}}),t.subscribe("editableKeyup",function(){d.change()}),t.subscribe("editablePaste",function(){d.change()}),t.subscribe("editableBlur",function(){d.change()}),f(o),Plyr.setup(".js-player",function(e){}),a&&a()}),e.clbk(null,e)},wnd:{class:"allscreen a100 article articlebtn"}}}var g=new nModule,n={};return g.run=function(e){var a=g.addEssense(n,t,e);g.init(a,e)},g.stop=function(){_.each(n,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=article:(app.modules.article={},app.modules.article.module=article);
 /*_____*/ 
var video=function(){function i(e){var t,l,e=deep(e,"history"),r=[{key:"gMrKZfHJSxA",width:560,height:315,source:"youtube",loc:{en:{title:"Pocketnet - Decentralized Social Network on the Blockchain",id:"gMrKZfHJSxA",description:"Pocketnet is a fully decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity.No corporation behind it to take fruits of your labor. All advertising revenue is split equally between node operators and those who publish highly rated content. Your subscribers always see your content, unless they decide to unsubscribe. Pocketnet is self-policed by the platform participants with good reputation. Nobody records your keystrokes, viewing habits or searches. Join The New Peer-To-Peer Internet: Go to Pocketnet.app and join for free now"}}}],a={validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,n,i,o){o=o||"4";n={Email:e,Name:n};n.Action||(n.Action="ADDTOMAILLIST"),n.TemplateID||(n.TemplateID=o),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:n,dataType:"json",success:function(){i&&i()}})},joinSuccess:function(e){s.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){s.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var n=e.el.find(".email"),e=e.el.find(".name"),n=n.val(),e=e.val();if(a.validateEmail(n)&&e)return a.saveEmail(n,e),a.joinSuccess(n,e),!0},clbk:function(e){function n(){var e=o.val(),n=i.val();return a.validateEmail(e)&&n?(t.removeClass("disabled"),!0):(t.addClass("disabled"),!1)}var i=e.find(".name"),o=e.find(".email"),t=e.find(".btn1");t.addClass("disabled"),t.on("click",function(){}),i.focus(),i.on("change",n),i.on("keyup",n),o.on("change",n),o.on("keyup",n)},class:"one joinbeta"})},{action:e})}},n=function(){a.join()},c=function(){var e='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+l.id+'?rel=0&amp;autoplay=1" frameborder="0" allow="autoplay;" allowfullscreen></iframe>';"vimeo"==l.source&&(e='<iframe src="https://player.vimeo.com/video/'+l.id+'?title=0&byline=0&portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),"bitchute"==l.source&&(e='<iframe width="560" height="315" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://www.bitchute.com/embed/'+l.id+'/"></iframe>'),"peertube"==l.source&&(e='<iframe width="560" height="315" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="https://pocketnetpeertube1.nohost.me/videos/embed/'+l.id+'/"></iframe>'),t.c.find(".container").html(e),l.description&&t.c.find(".description").html(l.description)};return{primary:e,getdata:function(e,n){var i=parameters();i.v||(i.v="gMrKZfHJSxA");function o(){s.nav.api.load({open:!0,href:"page404",history:!0})}var t,a=_.find(r,function(e){return e.key==i.v});a?(s.app.el.menu.addClass("logoview").addClass("landing"),l=_.clone(a),t=l,(a=deep(t,"loc.en")||null)&&(t=_.extend(t,a)),l.id?e(l):o()):o()},destroy:function(){t={},s.app.el.menu.removeClass("logoview").removeClass("landing"),s.app.el.app.removeClass("videoActive")},init:function(o){(t={}).c=o.el.find("#"+s.map.id),t.container=t.c.find(".container"),t.c.click&&t.c.click(),s.app.el.app.addClass("videoActive"),t.c.find(".joinbeta").on("click",n),setTimeout(function(){var e,n,i;c(),e=l,n=t.container,i=n.width(),e=i/(e.width/e.height),n.find("iframe").width(i),n.find("iframe").height(e),t.container.find("iframe").fadeIn(200),t.c.find(".description").fadeIn(200),o.clbk(null,o)},100)},animation:!1}}var s=new nModule,o={};return s.run=function(e){var n=s.addEssense(o,i,e);s.init(n,e)},s.stop=function(){_.each(o,function(e){e.destroy()})},s}();"undefined"!=typeof module?module.exports=video:(app.modules.video={},app.modules.video.module=video);
 /*_____*/ 
var accounts=function(){function n(e){var s,o,t,d,e=deep(e,"history"),a=function(t){k.app.platform.sdk.pool.expand(o,function(e){var a,n,s=_.indexOf(e.addresses,t);-1<s&&(a=e.private[s],n=k.app.user.stay,k.app.user.signout(function(){k.app.user.stay=n,k.user.signin(a,function(e){k.app.reloadLight(function(){var e="userpage?id=accounts&s="+makeid(),a=!1;k.app.user.validate()||(e="filluser",a=!0),k.app.nav.api.load({open:!0,href:e,history:a})})})}))})},i=function(n){k.app.platform.sdk.pool.expand(o,function(e){var a=_.indexOf(e.addresses,n);-1<a&&(a=e.private[a],f.dumpkey(n,a))})},n=function(e){k.app.platform.sdk.pool.remove(o,e),k.app.platform.sdk.pool.save(),f.addresses()},p=function(){5<=deep(o,"addresses.length")?sitemessage("You have reached a maximum of 5 accounts. No more can be added "):k.app.nav.api.load({open:!0,id:"addaccount",inWnd:!0,essenseData:{success:function(a){k.app.platform.sdk.pool.expand(o,function(e){k.app.platform.sdk.pool.add(e,a,function(e,a){a?dialog({html:k.app.localization.e("aused"),class:"one"}):k.app.platform.sdk.pool.export(e,function(e){k.app.platform.sdk.pool.current.packs[t]=e,k.app.platform.sdk.pool.save(),o=e,k.app.platform.sdk.pool.info(e,function(){f.addresses()})})})})}}})},c=function(){s.dumpkey.html(""),s.c.find(".dumpaddress").html(""),s.c.removeClass("privatedump")},r=function(){var e=$(this).closest(".addressTable").attr("address");dialog({html:"Do you really want to see your private key?",btn1text:"See Private Key",btn2text:"Cancel",class:"zindex",success:function(){i(e)}})},l=function(){var e=$(this).closest(".addressTable").attr("address");dialog({html:"Do you really want to remove this address from this device?",btn1text:"Remove",btn2text:"Cancel",class:"zindex",success:function(){n(e)}})},u=function(){var e=$(this).closest(".addressTable").attr("address");a(e)},f={qrcode:function(e,a){new QRCode(e[0],{text:a,width:256,height:256})},dumpkeyabout:function(){},dumpkey:function(e,a){var n="";s.c.addClass("privatedump"),s.c.find(".dumpaddress").html(e);try{n=bitcoin.ECPair.fromPrivateKey(Buffer.from(a,"hex")).toWIF().toString("hex")}catch(e){}k.shell({name:"dumpkey",el:s.dumpkey,data:{private:a,address:e,privateWif:n},animation:"fadeIn"},function(e){f.qrcode(e.el.find(".code"),a),e.el.find(".copyvalue").on("click",function(){var e=$(this).closest(".infotable").find(".value");copyText(e),sitemessage("Value was successfully copied")})})},addresses:function(a){k.shell({name:"addresses",el:s.addresses,data:{current:k.app.platform.sdk.address.pnet().address,pack:o},animation:"fadeIn"},function(e){e.el.find(".remove").on("click",l),e.el.find(".dumpkey").on("click",r),e.el.find(".ncurrent .label").on("click",u),a&&a()})}},m=function(){};return{primary:e,getdata:function(e,a){d=deep(a,"settings.essenseData")||{},t=o=null;e({})},destroy:function(){s={}},init:function(e){var a,n;m(),(s={}).c=e.el.find("#"+k.map.id),s.addresses=s.c.find(".addresses"),s.dumpkey=s.c.find(".dumpkey"),s.c.find(".add").on("click",p),s.c.find(".back").on("click",c),a=k.app.platform.sdk.address.pnet().address,(n=k.app.platform.sdk.pool.getPack(a))?(o=n[0],t=n[1],k.app.platform.sdk.pool.info(o,function(){f.addresses(function(){d.dumpkey&&i(a)})})):sitemessage("ERROR"),e.clbk(null,e)}}}var k=new nModule,s={};return k.run=function(e){var a=k.addEssense(s,n,e);k.init(a,e)},k.stop=function(){_.each(s,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=accounts:(app.modules.accounts={},app.modules.accounts.module=accounts);
 /*_____*/ 
var lastcomments=function(){function s(n){var s,n=deep(n,"history"),e=function(n,t,s){l.app.platform.app.nav.api.load({open:!0,href:"post?s="+n,inWnd:!0,clbk:function(n,t){app.nav.wnds.post=t},essenseData:{share:n,hr:"index?",reply:{answerid:t,parentid:s||"",noaction:!0}}})},t=function(){var n=$(this).attr("id"),t=$(this).attr("pid"),s=$(this).closest(".commentgroup").attr("share");e(s,n,t)},o=function(n){l.shell({name:"lastcommentslist",el:s.c,data:{comments:n}},function(n){n.el.find(".comment").on("click",t),n.el.find(".image").imagesLoaded({background:!0},function(n){})})},a=function(){},i=function(){var c;c=function(n,t){return t?(l.iclbks.main=i,void s.c.addClass("hidden")):(s.c.removeClass("hidden"),void o(n))},l.app.platform.sdk.comments.last(function(t,o){var a=group(t,function(n){return n.txid}),n=_.map(a,function(n,t){return t});l.app.platform.sdk.node.shares.getbyid(n,function(n,s){var e=[];_.each(t,function(n){var t=app.platform.sdk.node.shares.storage.trx[n.txid];t&&n&&(e.push(t.address),e.push(n.address))}),e=_.uniq(e),l.sdk.users.get(e,function(n,t){c&&c(a,o||s||t)},!0)})})};return{primary:n,getdata:function(n){n({})},destroy:function(){s={},delete l.app.platform.ws.messages.newblocks.clbks.lastcomments,delete l.app.platform.ws.messages["new block"].clbks.lastcomments,delete l.app.platform.clbks._focus.lastcomments},init:function(n){a(),(s={}).c=n.el.find("#"+l.map.id),l.app.platform.ws.messages.newblocks.clbks.lastcomments=l.app.platform.ws.messages["new block"].clbks.lastcomments=function(){i()},l.app.platform.clbks._focus.lastcomments=function(n){120<n&&"undefined"!=typeof _Electron&&i()},i(),n.clbk(null,n)}}}var l=new nModule,e={};return l.run=function(n){var t=l.addEssense(e,s,n);l.init(t,n)},l.stop=function(){_.each(e,function(n){n.destroy()})},l}();"undefined"!=typeof module?module.exports=lastcomments:(app.modules.lastcomments={},app.modules.lastcomments.module=lastcomments);
 /*_____*/ 
var articles=function(){function n(a){var t,a=deep(a,"history"),n=function(){p.nav.api.load({open:!0,href:"article?aid="+makeid(),inWnd:!0,history:!0,essenseData:{save:function(t){p.app.platform.sdk.articles.storage||(p.app.platform.sdk.articles.storage=[]),_.find(p.app.platform.sdk.articles.storage,function(a){if(t.id==a.id)return!0})||p.app.platform.sdk.articles.storage.unshift(t),p.app.platform.sdk.articles.save()},close:function(){l.articles()},complete:function(){p.closeContainer()},closeContainer:function(){p.closeContainer()}}})},e=function(a){p.nav.api.load({open:!0,href:"article?aid="+a.id,inWnd:!0,history:!0,essenseData:{art:a,save:function(a){p.app.platform.sdk.articles.save()},close:function(){l.articles()},complete:function(){p.closeContainer()},closeContainer:function(){p.closeContainer()}}})},i=function(a){removeEqual(p.app.platform.sdk.articles.storage,{id:a}),t.c.find('.art[art="'+a+'"]').remove(),p.app.platform.sdk.articles.save(),l.ini()},o=function(){var a=$(this).closest(".art").attr("art");dialog({html:p.app.localization.e("e13018"),btn1text:p.app.localization.e("dyes"),btn2text:p.app.localization.e("dno"),class:"zindex",success:function(){i(a)}})},r=function(){n()},s=function(){var t=$(this).closest(".art").attr("art"),a=_.find(p.app.platform.sdk.articles.storage,function(a){return a.id==t});e(a)},c=function(){p.nav.api.load({open:!0,href:"author?address="+p.app.user.address.value.toString("hex"),history:!0}),p.closeContainer()},l={ini:function(){p.app.platform.sdk.articles.storage.length?t.c.removeClass("initial"):t.c.addClass("initial")},articles:function(){l.ini(),p.shell({name:"articles",el:t.articles.find(".artwrapper"),data:{articles:p.app.platform.sdk.articles.storage}},function(a){a.el.find(".artcnt").on("click",s),a.el.find(".remove").on("click",o)})}},d=function(){};return{primary:a,auto:function(){var t=parameters(),a=null;t.marticle&&!p.app.nav.wnds.article&&((a=t.aid?_.find(p.app.platform.sdk.articles.storage,function(a){return a.id==t.aid}):a)?e(a):n())},getdata:function(a){a({})},destroy:function(){t={}},init:function(a){d(),(t={}).c=a.el.find("#"+p.map.id),t.articles=t.c.find(".articles"),t.add=t.c.find(".add"),t.add.on("click",r),t.c.find(".top").on("click",c),l.articles(),a.clbk(null,a)},wnd:{class:"allscreen a100 article "}}}var p=new nModule,e={};return p.run=function(a){var t=p.addEssense(e,n,a);p.init(t,a)},p.stop=function(){_.each(e,function(a){a.destroy()})},p}();"undefined"!=typeof module?module.exports=articles:(app.modules.articles={},app.modules.articles.module=articles);
 /*_____*/ 
var proxylogs=function(){function s(n){var o,n=deep(n,"history"),s={requests:{ws:{path:"ws",name:"Websocket connections",color:"#006CFF"},requests:{path:"requestsIp",name:"Https requests ip",color:"#FF004E"}},blacklists:{black:{path:"iplimiter.black",name:"Black list ip count",color:"#20C02B"},tblack:{path:"iplimiter.black",name:"Temp Black list ip count",color:"#00C0FF"}}},r=function(n){n.find(".expandall").on("click",function(){$(this).closest(".report").toggleClass("active")})},l=function(n){var t={type:"spline",xtype:"datetime"};return"requests"==n&&(t.caption="Connections"),"blacklists"==n&&(t.caption="Black list"),t},a=function(n,t){var o=[],n=s[n];return _.each(n,function(s){var e={color:s.color,data:[],name:s.name};_.each(t,function(n){var t=deep(n,s.path)||0;e.data.push({y:t,x:new Date(n.time)})}),o.push(e)}),o},i={prepare:function(n,t,s){var e=l(n),o=a(n,t);console.log(n,o,t);e=new p.app.platform.objects.graph({el:s,shell:p.shell,chart:e});return e.series=o,e},make:function(n,t,s,e){var o=i.prepare(n,t,s);o.render({maxPointsCount:100},function(){e&&e(o)})}},c={users:function(n){var t=[],s=n.find(".loadaddress");s.each(function(){var n=$(this).attr("address");n&&t.push(n)}),t.length&&p.shell({name:"user",data:{}},function(n){console.log(n),p.app.platform.sdk.users.get(t,function(n,t){s.each(function(){var n=$(this).attr("address");n&&($(this).removeAttr("address"),p.shell({name:"user",data:{address:n},el:$(this)},function(n){}))})})})},logs:function(e,t){p.shell({name:"logs",data:{logs:e},el:o.logs},function(n){r(n.el),n.el.find(".expand").on("click",function(){var n=$(this).closest(".log"),t=n.attr("ip"),s=_.find(e,function(n){return n.ip==t});n.hasClass("active")?n.toggleClass("active"):c.wslogs(n.find(".wslogswrp"),deep(s,"ws"),function(){n.toggleClass("active")},!0)}),t&&t()})},ws:function(t,s){p.shell({name:"ws",data:{ws:t},el:o.ws},function(n){r(n.el),c.wslogs(n.el.find(".wslogswrp"),t),s&&s()})},block:function(n,t){p.shell({name:"block",data:{block:n},el:o.block},function(n){r(n.el),t&&t()})},wslogs:function(n,t,s,e){p.shell({name:"wslogs",data:{ws:t,users:e},el:n},function(n){e&&c.users(n.el),n.el.find(".clickload").on("click",function(){c.users($(this).closest(".address"))}),s&&s()})},error:function(t){p.shell({name:"error",data:{},el:o.error},function(n){t&&t()})},stats:function(t,s){p.shell({name:"stats",data:{stats:t},el:o.stats},function(n){c.statsChart("requests",t,n.el.find(".chartswrapper")),c.statsChart("blacklists",t,n.el.find(".chartswrapper")),s&&s()})},statsChart:function(n,t,s,e){var o=$("<div></div>",{class:"chartWrapperbs"});s.append(o),i.make(n,t,o,e)}},e=function(s){p.app.platform.sdk.system.get.info(function(n,l){var a,t;console.log(n),l?(a=[],t={},n=group(l.logs,function(n){return n.ip}),_.each(n,function(n,s){var t=_.filter(l.ws,function(n){if(n.ip==s)return n.using=!0}),t=_.sortBy(t,function(n){return-(n.ws_clients+n.ws_nodes)}),e=_.find(l.iplimiter,function(n,t){if(t==s)return n.using=!0}),o={},r=group(n,function(n){return n.s});_.each(r,function(n,t){o[t]=group(n,function(n){return deep(n,"p.method")||deep(n,"pn")||"others"})}),a.push({ws:t,requests:o,ip:s,block:e,count:n.length})}),a=_.sortBy(a,function(n){return-(n.count+10*n.ws.length)}),t.logs=a,t.ws=_.filter(l.ws,function(n){return!n.using}),t.ws=_.sortBy(t.ws,function(n){return-(n.ws_clients+n.ws_nodes)}),t.blocks=_.filter(l.iplimiter,function(n,t){return n.ip=t,!n.using}),s&&s(t)):s&&s(null)})},t=function(s){p.app.platform.sdk.system.get.stats(function(n,t){n?s&&s(null):s&&s(t)})},u=function(){};return{primary:n,getdata:function(n){n({})},destroy:function(){o={}},init:function(n){u(),(o={}).c=n.el.find("#"+p.map.id),o.logs=n.el.find(".logsWrapper"),o.ws=n.el.find(".wsWrapper"),o.block=n.el.find(".blockWrapper"),o.stats=n.el.find(".statsWrapper"),o.error=n.el.find(".errorWrapper"),t(function(t){t&&c.stats(t),e(function(n){n&&(c.logs(n.logs),c.ws(n.ws),c.block(n.blocks)),t||n||c.error()})}),n.clbk(null,n)}}}var p=new nModule,e={};return p.run=function(n){var t=p.addEssense(e,s,n);p.init(t,n)},p.stop=function(){_.each(e,function(n){n.destroy()})},p}();"undefined"!=typeof module?module.exports=proxylogs:(app.modules.proxylogs={},app.modules.proxylogs.module=proxylogs);
 /*_____*/ 
var system16=function(){function t(e){function n(e){a&&(delete a.clbks.tick.components,delete a.system.clbks.tick.components),(a=e).clbks.tick.components=u.tick,a.system.clbks.tick.components=u.ticksettings,i=null,s=[],r={},a?a.get.info().then(e=>((i=e.info).server.listening&&i.wss.listening&&(d.charts.server.showed=!0),s=[{info:i,time:utcnow()}],x.proxycurrent(),a.get.stats())).then(e=>{if(s=e.stats,setTimeout(function(){x.stats()},500),u.admin())return a.system.request("get.settings").then(e=>{o=e,b.allsettings()})}).catch(e=>{}):b.proxycurrent()}var c,e=deep(e,"history"),t=null,a=null,i=null,s=[],o=null,r={},l=["#F0810F","#011A27","#4897D8","#E6DF44","#063852","#486824"],d={charts:{nodes:{type:"rating"},server:{type:"connections"},wallets:{type:"distribution"}}},p={nodeenabled:function(){if(!o.node.enabled)return a.system.request("set.node.enabled",{enabled:!0}).then(e=>{});menuDialog({items:[{text:"Disable Pocketnet Node",action:function(n){return a.system.request("set.node.enabled",{enabled:!1}).then(e=>{n()})}}]}),console.log("sd")}},u={admin:function(){var e=k.app.platform.sdk.address.pnet();if(a&&i)return a.direct||-1<_.indexOf(i.admins,e.address)},ticksettings:function(e,n,t){t&&(o=e,b.allsettings())},tick:function(e){i=e;e=s[s.length-1];(!e||new Date(e.time).addSeconds(10)<utcnow())&&(s.push({info:i,time:utcnow()}),s=lastEls(s,1e3)),c.c&&(b.nodecontentstate(c.c),b.nodescontenttable(c.c)),setTimeout(function(){x.stats(!0)},200)},addnode:function(s,e){var i=!1,n="create",t=k.app.localization.e("e13044"),a=k.app.localization.e("add");s&&(i=!0,n="update",t=k.app.localization.e("e13062"),a=k.app.localization.e("save")),s=s||{};var r={host:new Parameter({type:"STRING",name:k.app.localization.e("nodehost"),id:"host",defaultValue:s.host||"",placeholder:"0.0.0.0",require:!0}),port:new Parameter({type:"STRING",name:k.app.localization.e("e13063"),id:"port",defaultValue:s.port||"38081",placeholder:"38081",require:!0}),ws:new Parameter({type:"STRING",name:k.app.localization.e("e13064"),id:"ws",defaultValue:s.ws||"8087",placeholder:"8087",require:!0}),nodename:new Parameter({type:"STRING",name:k.app.localization.e("e13065"),id:"nodename",defaultValue:(s.nodename||(k.app.platform.api.clearname(deep(app,"platform.sdk.user.storage.me.name"))||"New")+" node").replace(/\+/g," "),placeholder:k.app.localization.e("e13066"),require:!0})},a={close:{class:"close",html:'<i class="fas fa-times"></i> '+k.app.localization.e("close"),fn:function(e,n){n.close()}},success:{class:"success",html:'<i class="fas fa-check"></i> '+a,fn:function(e,t){var a,o=_.clone(s);s.host=r.host.value,s.port=r.port.value,s.ws=r.ws.value,s.nodename=r.nodename.value,s.rpcuser="",s.rpcpwd="","locally"==r.saveto.value?(s.rpcuser=r.rpcuser.value||"",s.rpcpwd=r.rpcpwd.value||"",s.locally=!0):(delete s.rpcuser,delete s.rpcpwd),s.host&&s.port&&s.ws&&s.nodename?(delete(a=_.clone(s)).addedby,delete a.date,a.locally||delete a.locally,k.app.platform.sdk.node.sys[n+r.saveto.value](a,function(e,n){e?(s=_.clone(o),sitemessage(e)):(i?(c.list.html(""),b.nodes(k.app.platform.nodes)):(k.app.platform.nodes||(k.app.platform.nodes=[]),k.app.platform.nodes.push(n),b.nodes([n])),k.app.platform.nodeid&&k.app.platform.nodeid.host!=a.host?t.close():u.connectnode(a,function(){t.close()}),b.active())})):sitemessage(k.app.localization.e("e13071"))}}};i&&(a.delete={class:"delete ghost",html:'<i class="fas fa-trash"></i> '+k.app.localization.e("delete"),fn:function(e,t){dialog({class:"zindex",html:k.app.localization.e("e13072"),success:function(){var e="revoke",e=s.locally?"revokelocally":"revokeproxy";k.app.platform.sdk.node.sys[e]({host:s.host},function(e,n){e?sitemessage(e):(c.list.find('.node[host="'+s.host+'"]').closest(".nodewrapepr").remove(),b.empty(),s.host==k.app.platform.nodeid.host?u.connectnode(null,function(){t.close()}):t.close())})}})}}),k.shell({destroy:function(){},insert:"wnd",name:"addnode",data:{parameters:r},wnd:{header:t,buttons:a,noInnerScroll:!0,class:"addnodewnd"}},function(e){ParametersLive(_.toArray(r),e.el)})},settings:function(e){e.find("[sys]").on("click",function(){var e=$(this).attr("sys");!e||(e=deep(p,e))&&e()})}},m={nodes:{responsetime:{caption:"Nodes Response Time",series:[{name:"Median Response Time",path:"statistic.time",id:"ct"}]},rate:{caption:"Nodes Rate",series:[{name:"Requestes per seconds",path:"statistic.rate",id:"cr"}]},probability:{caption:"Probability",series:[{name:"Probability to select",path:"probability",id:"spr"}]},difference:{caption:"Block Height Difference",series:[{name:"Difference",path:"status.difference",id:"cd"}]},rating:{caption:"Nodes Rating",series:[{name:"Rating",path:"rating",id:"cr"}]},allcount:{caption:"Count of requestes to nodes",series:[{name:"Count of requestes",path:"statistic.allcount",type:"spline",id:"cr"},{name:"Success Count",path:"statistic.success",type:"areaspline",id:"cp"}]}},server:{connections:{caption:"Connections",series:[{path:"wss.users",name:"Websocket Connections",id:"wss"},{path:"server.middle.requestsIp",name:"Https requests IP",id:"requests"}]},cache:{caption:"Cache Size",objects:"server.cache.meta",series:[{path:"size",name:"Size",id:"size"}]}},wallets:{distribution:{caption:"Registration Address Distribution",series:[{path:"wallet.registration.queue",name:"Users Queue Size",id:"queue"},{path:"wallet.registration.unspents",name:"Unspents Count",id:"unspents"}]},balance:{caption:"Registration Address Balance",series:[{path:"wallet.registration.balance",name:"Address Balance",id:"balance"}]}}},f={server:function(e){var n=d.charts.server.type,a=m.server[n],t={type:"spline",xtype:"datetime",caption:a.caption},o={},s=0,n=[i];return a.objects&&(n=deep(i,a.objects)),_.each(n,function(e,n){var t=n?n+".":"";a.objects&&(t=a.objects+"."+t),_.each(a.series,function(e){o[e.id+n]={name:e.name+": "+n,path:t+e.path,color:l[s%l.length],type:e.type},s++})}),{meta:t,series:o}},nodes:function(e){var n=d.charts.nodes.type,t=m.nodes[n],n={type:"spline",xtype:"datetime",caption:t.caption},a={},o=0;return _.each(i.nodeManager.nodes,function(e,n){_.each(t.series,function(e){a[e.id+n]={name:e.name+": "+n,path:"nodeManager.nodes.'"+n+"'."+e.path,color:l[o%l.length],type:e.type},o++})}),{meta:n,series:a}},wallets:function(e){var n=d.charts.wallets.type,a=m.wallets[n],t={type:"spline",xtype:"datetime",caption:a.caption},o={},s=0,n=[i];return a.objects&&(n=deep(i,a.objects)),_.each(n,function(e,n){var t=n?n+".":"";a.objects&&(t=a.objects+"."+t),_.each(a.series,function(e){o[e.id+n]={name:e.name+": "+n,path:t+e.path,color:l[s%l.length],type:e.type},s++})}),{meta:t,series:o}}},h=function(e,n){return"function"==typeof f[e]?f[e](n):f[e]},y=function(e){return _.clone(e.meta)},g=function(e,n){var o=[],t=e.series;return _.each(t,function(t){var a={color:t.color,data:[],name:t.name,type:t.type||e.meta.type};_.each(n,function(e){var n=deep(e.info,t.path)||0;a.data.push({y:n,x:new Date(e.time)})}),o.push(a)}),o},w={prepare:function(e,n,t){var a=h(e,n),e=y(a),n=g(a,n),e=new k.app.platform.objects.graph({el:t,shell:k.shell,chart:e});return e.series=n,e},graph:function(a,e,n,t){var o=w.prepare(a,e,n);h(a,e);o.render({height:250,maxPointsCount:50},function(){d.charts[a].showed&&n.find(".graphWrapper").addClass("showed"),n.find(".showgraphwrapper").on("click",function(){n.find(".graphWrapper").toggleClass("showed"),d.charts[a].showed=n.find(".graphWrapper").hasClass("showed"),o.chart.reflow()}),n.find(".subcaptiongraph").on("click",function(){var t=[];_.each(m[a],function(e,n){t.push({text:n,action:function(e){d.charts[a].type=n,w.make(a,s),e()}})}),menuDialog({items:t})}),t&&t(o,n)})},make:function(n,e,t,a){var o,s;r[n]&&a?(o=h(n,e),s=g(o,e),s=r[n].rarefied(s,50),r[n].chart.update({series:s})):(o=c.c.find("."+n+"chart"),s=$("<div></div>",{class:"chartWrapper"}),o.html(s),w.graph(n,e,s,function(e){r[n]=e,t&&t()},a))}},b={allsettings:function(){c.c&&b.nodecontentmanage(c.c)},proxycurrent:function(e){k.shell({inner:html,name:"proxycurrent",data:{proxies:t.get.proxies(),current:a,admin:u.admin()},el:c.proxycurrent},function(){e&&e()})},proxycontent:function(n){k.shell({inner:html,name:"proxycontent",data:{info:i,proxy:a,admin:u.admin()},el:c.proxycontent},function(e){b.servercontent(e.el),b.nodescontent(e.el),b.nodecontent(e.el),n&&n()})},servercontent:function(e,n){k.shell({inner:html,name:"servercontent",data:{info:i,proxy:a,admin:u.admin()},el:e.find(".serverWrapper")},function(){b.webservercontent(e),b.webadminscontent(e),b.webdistributioncontent(e),n&&n()})},webservercontent:function(e,n){k.shell({inner:html,name:"webservercontent",data:{info:i,proxy:a,admin:u.admin()},el:e.find(".webServerWrapper")},function(){n&&n()})},webadminscontent:function(e,n){k.app.platform.sdk.users.get(i.admins,function(){k.shell({inner:html,name:"webadminscontent",data:{admins:i.admins,info:i,proxy:a,admin:u.admin()},el:e.find(".webAdminsWrapper")},function(){n&&n()})})},webdistributioncontent:function(e,n){k.shell({inner:html,name:"webdistributioncontent",data:{wallets:i.wallet,info:i,proxy:a,admin:u.admin()},el:e.find(".webDistributionWrapper")},function(){n&&n()})},nodescontent:function(e,n){k.shell({inner:html,name:"nodescontent",data:{info:i,manager:i.nodeManager,proxy:a,admin:u.admin()},el:e.find(".nodesWrapper")},function(){e.find(".addnode").on("click",function(){u.addnode()}),b.nodescontenttable(e),n&&n()})},nodescontenttable:function(e,n){k.shell({inner:html,name:"nodescontenttable",data:{info:i,manager:i.nodeManager,proxy:a,admin:u.admin()},el:e.find(".nodesWrapper .nodes")},function(){n&&n()})},nodecontent:function(e,n){u.admin()?k.shell({inner:html,name:"nodecontent",data:{info:i,manager:i.nodeManager,nodestate:i.nodeControl.state,proxy:a,admin:u.admin()},el:e.find(".localnodeWrapper")},function(){b.nodecontentstate(e),n&&n()}):n&&n()},nodecontentmanage:function(e,n){u.admin()&&(console.log("system",o),k.shell({inner:html,name:"nodecontentmanage",data:{info:i,manager:i.nodeManager,nodestate:i.nodeControl.state,proxy:a,admin:u.admin(),system:o},el:e.find(".localnodeWrapper .manage")},function(e){u.settings(e.el),n&&n()}))},nodecontentstate:function(e,n){u.admin()&&k.shell({inner:html,name:"nodecontentstate",data:{info:i,manager:i.nodeManager,nodestate:i.nodeControl.state,proxy:a,admin:u.admin()},el:e.find(".localnodeWrapper .state")},function(){n&&n()})}},v=function(){},x={stats:function(e){s&&(w.make("server",s,null,e),w.make("nodes",s,null,e),w.make("wallets",s,null,e))},proxycurrent:function(){b.proxycurrent(function(){x.proxycontent()})},proxycontent:function(){b.proxycontent(function(){})}};return{primary:e,getdata:function(e){t=k.app.api;e({})},destroy:function(){c={}},init:function(e){v(),(c={}).c=e.el.find("#"+k.map.id),c.proxycurrent=c.c.find(".proxycurrentWrapper"),c.proxycontent=c.c.find(".proxycontentWrapper"),n(t.get.current()),e.clbk(null,e)}}}var k=new nModule,a={};return k.run=function(e){var n=k.addEssense(a,t,e);k.init(n,e)},k.stop=function(){_.each(a,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=system16:(app.modules.system16={},app.modules.system16.module=system16);
 /*_____*/ 
var connection=function(){function o(e){var i,e=deep(e,"history"),o=function(e,o){var a=m.app.platform.apiproxy;m.app.platform.apiproxy=e,m.app.platform.sdk.proxy.info(function(e,a){o&&o(!a)}),m.app.platform.nodeid=a},l=function(e,o){var a=m.app.platform.nodeid;m.app.platform.nodeid=e,m.app.platform.sdk.node.get.time(function(e,a){o&&o(!a)}),m.app.platform.nodeid=a},c=function(e,a){o(e,function(e){e?a&&a(!0):(dialog({html:m.app.localization.e("e13052"),class:"one zindex"}),a&&a(!1))})},n=function(e,a){l(e,function(e){e?a&&a(!0):(dialog({html:m.app.localization.e("e13053"),class:"one zindex"}),a&&a(!1))})},r={preloader:function(e){e?i.c.addClass("loading"):i.c.removeClass("loading")},addproxy:function(t,p){var s=!1,i="create",e=m.app.localization.e("e13054"),a=m.app.localization.e("add");t&&(s=!0,i="update",e=m.app.localization.e("e13055"),a=m.app.localization.e("save")),t=t||{};var r={host:new Parameter({type:"STRING",name:m.app.localization.e("e13056"),id:"host",defaultValue:t.host||"",placeholder:"0.0.0.0",require:!0}),port:new Parameter({type:"STRING",name:"RPC Port",id:"port",defaultValue:t.port||"8888",placeholder:"8888",require:!0}),ws:new Parameter({type:"STRING",name:"WS Port",id:"ws",defaultValue:t.ws||"8088",placeholder:"8088",require:!0})},a={close:{class:"close",html:'<i class="fas fa-times"></i> '+m.app.localization.e("close"),fn:function(e,a){a.close()}},success:{class:"success",html:'<i class="fas fa-check"></i> '+a,fn:function(a,o){var e,l={},n=!0;_.each(r,function(e){l[e.id]=e.value||t[e.id],e.value||(n=!1)}),n?(l.user=!0,l.id=m.app.platform.sdk.proxy.makeid(l),e=m.app.platform.sdk.proxy.all(),_.find(e,function(e){return e.id==l.id})?sitemessage(m.app.localization.e("e13058")):(a.find(".addproxy").addClass("loading"),c(l,function(e){a.find(".addproxy").removeClass("loading"),e&&(e=m.app.platform.sdk.proxy[i](l,t.id),s||(m.app.platform.apiproxy=l,e=!0),p&&p(l,e),o.close())}))):sitemessage(m.app.localization.e("e13057"))}}};s&&(a.delete={class:"delete ghost",html:'<i class="fas fa-trash"></i> '+m.app.localization.e("delete"),fn:function(e,a){dialog({class:"zindex",html:m.app.localization.e("e13059"),success:function(){var e=m.app.platform.sdk.proxy.remove(t.id);p&&p(null,e),a.close()}})}}),m.shell({destroy:function(){},insert:"wnd",name:"addproxy",data:{parameters:r},wnd:{header:e,buttons:a,noInnerScroll:!0,class:"addproxywnd"}},function(e){ParametersLive(_.toArray(r),e.el),e.el.find(".host input").focus()})},proxieslist:function(e,n){function t(e){e.close(),r.connectproxy()}var a=m.app.platform.sdk.proxy.all(),o={close:{class:"close",html:'<i class="fas fa-times"></i> '+m.app.localization.e("close"),fn:function(e,a){console.log("close"),a.close()}},success:{class:"success",html:'<i class="fas fa-plus"></i> '+m.app.localization.e("e13054"),fn:function(o,l){r.addproxy(null,function(e,a){a?t(l):f.proxieslist(o,l)})}}},p={destroy:function(){},name:"proxieslist",data:{proxies:a,proxy:m.app.platform.apiproxy,ele:r.ele()},wnd:{header:m.app.localization.e("e13060"),noInnerScroll:!0,class:"proxieslistwnd",buttons:o}};e?p.el=e:p.insert="wnd",m.shell(p,function(l){l.el.find(".proxy").length?l.el.find(".proxieslist").removeClass("empty"):l.el.find(".proxieslist").addClass("empty"),l.el.find(".name").on("click",function(){var a,e=$(this).closest(".proxy").hasClass("active"),o=$(this).closest(".proxy").attr("pid");e||("none"==o?dialog({html:m.app.localization.e("e13061"),class:"zindex",success:function(){r.using(!0),f.active(),(l.container||n).close()}}):(a=m.app.platform.sdk.proxy.find(o),l.el.find(".proxieslist").addClass("loading"),c(a,function(e){l.el.find(".proxieslist").removeClass("loading"),e&&m.app.platform.sdk.proxy.changeWithDialog(a,function(){(l.container||n).close(),f.proxy(),f.active()})})))}),l.el.find(".edit").on("click",function(){var e=$(this).closest(".proxy").attr("pid"),e=m.app.platform.sdk.proxy.find(e);e&&r.addproxy(e,function(e,a){a?t(l.container||n):r.proxieslist(p.el)})})})},addnode:function(t,e){var p=!1,a="create",o=m.app.localization.e("e13044"),l=m.app.localization.e("add");t&&(p=!0,a="update",o=m.app.localization.e("e13062"),l=m.app.localization.e("save")),t=t||{};var s={saveto:new Parameter({type:"VALUES",name:m.app.localization.e("save"),id:"saveto",defaultValue:"proxy",possibleValues:["proxy","locally"],possibleValuesLabels:[m.app.localization.e("onproxy"),m.app.localization.e("locally")],require:!0}),host:new Parameter({type:"STRING",name:m.app.localization.e("nodehost"),id:"host",defaultValue:t.host||"",placeholder:"0.0.0.0",require:!0}),port:new Parameter({type:"STRING",name:m.app.localization.e("e13063"),id:"port",defaultValue:t.port||"38081",placeholder:"38081",require:!0}),ws:new Parameter({type:"STRING",name:m.app.localization.e("e13064"),id:"ws",defaultValue:t.ws||"8087",placeholder:"8087",require:!0}),nodename:new Parameter({type:"STRING",name:m.app.localization.e("e13065"),id:"nodename",defaultValue:(t.nodename||(m.app.platform.api.clearname(deep(app,"platform.sdk.user.storage.me.name"))||"New")+" node").replace(/\+/g," "),placeholder:m.app.localization.e("e13066"),require:!0}),rpcuser:new Parameter({type:"STRING",name:m.app.localization.e("e13067"),id:"rpcuser",placeholder:m.app.localization.e("e13068"),defaultValue:t.rpcuser||"",require:!0}),rpcpwd:new Parameter({type:"STRING",name:m.app.localization.e("e13069"),id:"rpcpwd",defaultValue:t.rpcpwd||"",placeholder:m.app.localization.e("e13070"),require:!0})};!m.app.platform.dontuseapiproxy&&m.app.platform.apiproxy||(s.saveto=new Parameter({type:"VALUES",name:m.app.localization.e("save"),id:"saveto",defaultValue:"locally",possibleValues:["locally"],possibleValuesLabels:[m.app.localization.e("locally")],require:!0})),console.log("ap",s);l={close:{class:"close",html:'<i class="fas fa-times"></i> '+m.app.localization.e("close"),fn:function(e,a){a.close()}},success:{class:"success",html:'<i class="fas fa-check"></i> '+l,fn:function(e,o){var l,n=_.clone(t);t.host=s.host.value,t.port=s.port.value,t.ws=s.ws.value,t.nodename=s.nodename.value,t.rpcuser="",t.rpcpwd="","locally"==s.saveto.value?(t.rpcuser=s.rpcuser.value||"",t.rpcpwd=s.rpcpwd.value||"",t.locally=!0):(delete t.rpcuser,delete t.rpcpwd),t.host&&t.port&&t.ws&&t.nodename?(delete(l=_.clone(t)).addedby,delete l.date,l.locally||delete l.locally,m.app.platform.sdk.node.sys[a+s.saveto.value](l,function(e,a){e?(t=_.clone(n),sitemessage(e)):(p?(i.list.html(""),f.nodes(m.app.platform.nodes)):(m.app.platform.nodes||(m.app.platform.nodes=[]),m.app.platform.nodes.push(a),f.nodes([a])),m.app.platform.nodeid&&m.app.platform.nodeid.host!=l.host?o.close():r.connectnode(l,function(){o.close()}),f.active())})):sitemessage(m.app.localization.e("e13071"))}}};p&&(s.host.disabled=!0,s.saveto.hidden=!0,t.locally?s.saveto.value="locally":s.saveto.value="proxy",l.delete={class:"delete ghost",html:'<i class="fas fa-trash"></i> '+m.app.localization.e("delete"),fn:function(e,o){dialog({class:"zindex",html:m.app.localization.e("e13072"),success:function(){var e="revoke",e=t.locally?"revokelocally":"revokeproxy";m.app.platform.sdk.node.sys[e]({host:t.host},function(e,a){e?sitemessage(e):(i.list.find('.node[host="'+t.host+'"]').closest(".nodewrapepr").remove(),f.empty(),t.host==m.app.platform.nodeid.host?r.connectnode(null,function(){o.close()}):o.close())})}})}}),m.shell({destroy:function(){},insert:"wnd",name:"addnode",data:{parameters:s},wnd:{header:o,buttons:l,noInnerScroll:!0,class:"addnodewnd"}},function(e){ParametersLive(_.toArray(s),e.el);function a(){e.el.find(".addnode").attr("saveto",s.saveto.value)}a(),s.saveto._onChange=function(){a()}})},connectproxy:function(e){m.app.platform.nodeid=null,m.app.platform.nodes=null,m.app.errors.clear(),m.app.platform.state.save(),m.app.platform.restart(function(){app.reload(function(){}),e&&e()})},connectnode:function(a,o){r.preloader(!0),n(a,function(e){e?(m.app.platform.nodeid=a,m.app.platform.state.save(),f.active(),m.app.errors.clear(),m.app.platform.restart(function(){r.preloader(!1),app.reload(function(){}),o&&o()})):r.preloader(!1)})},ele:function(){return"undefined"!=typeof _Electron},using:function(e){m.app.platform.dontuseapiproxy=e,m.app.platform.sdk.proxy.save(),f.proxy(),r.connectproxy()}},a=function(){m.app.platform.dontuseapiproxy?r.using(!m.app.platform.dontuseapiproxy):dialog({html:m.app.localization.e("e13073"),class:"zindex",success:function(){r.using(!m.app.platform.dontuseapiproxy)}})},t=function(){r.proxieslist()},p=function(){r.addnode()},s=function(){var a=$(this).closest(".node").attr("host"),o="true"==(o=$(this).closest(".node").attr("locally")),e=_.find(m.app.platform.nodes,function(e){return e.host==a&&e.locally==o});e&&r.addnode(e)},d=function(){var a,o,e=$(this).closest(".node");e.hasClass("active")||(a=e.attr("host"),o="true"==(o=e.attr("locally")),e=_.find(m.app.platform.nodes,function(e){return e.host==a&&e.locally==o}),r.connectnode(e))},f={nodes:function(e,a){m.shell({inner:append,name:"nodes",data:{nodes:e},el:i.list},function(){f.empty(),f.active(),a&&a()})},empty:function(){i.list.find(".node").length?i.nodes.removeClass("empty"):i.nodes.addClass("empty")},active:function(){i.list.find(".node").removeClass("active"),m.app.platform.nodeid&&i.list.find('.node[host="'+m.app.platform.nodeid.host+'"][locally="'+(m.app.platform.nodeid.locally||"false")+'"]').addClass("active")},proxy:function(){m.app.platform.dontuseapiproxy?(i.cc.removeClass("useproxy"),i.cc.addClass("shownodes"),i.currentproxy.html(m.app.localization.e("e13051"))):(i.cc.addClass("useproxy"),m.app.platform.apiproxy?(i.cc.addClass("shownodes"),i.currentproxy.html("https://"+app.platform.apiproxy.host+":"+app.platform.apiproxy.port+"; wss:"+app.platform.apiproxy.ws)):(i.cc.removeClass("shownodes"),i.currentproxy.html(m.app.localization.e("notselected"))))}},u=function(){};return{primary:e,getdata:function(e){var a={ele:r.ele()};window.cordova,e(a)},destroy:function(){i={}},init:function(e){u(),(i={}).c=e.el.find("#"+m.map.id),i.list=i.c.find(".list"),i.add=i.c.find(".addnewNode"),i.nodes=i.c.find(".nodespart"),i.cc=i.c.find(".connection"),i.currentproxy=i.c.find(".current"),i.add.on("click",p),i.c.on("click",".edit",s),i.c.on("click",".connectnode",d),i.c.find(".openproxielist").on("click",t),i.c.find(".usingproxy").on("click",a),f.proxy(),i.nodes.addClass("loading"),m.app.platform.sdk.system.get.nodes(!0,function(){i.nodes.removeClass("loading"),f.nodes(m.app.platform.nodes)}),e.clbk(null,e)}}}var m=new nModule,l={};return m.run=function(e){var a=m.addEssense(l,o,e);m.init(a,e)},m.stop=function(){_.each(l,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=connection:(app.modules.connection={},app.modules.connection.module=connection);
 /*_____*/ 
var help=function(){function a(e){var a,n,t,e=deep(e,"history"),i={roadmap:[{d:"February 2019",n:"Social Network Beta Test Starts",r:!0},{d:"March 2019",n:"Windows Desktop App",r:!0},{d:"March 2019",n:"Search users, posts",r:!1},{d:"July 2019",n:"Linux Desktop App",r:!1},{d:"July 2019",n:"Android App",r:!1},{d:"August 2019",n:"Search by tags, recommended users, poll transactions",r:!1},{d:"August 2019",n:"Personal link Pocketnet.app/username plus history of personal posts and ability to search users’ posts (decentralized free blog hosting on Pocketnet blockchain)",r:!1},{d:"September 2019",n:"WebTorrent hosting of videos/images",r:!1},{d:"October 2019",n:"Boost posts for Pocketcoin",r:!1},{d:"June 2019",n:"Chinese, French, German, Russian, Spanish versions",r:!1},{d:"July 2020",n:"Peer-to-peer encrypted chat, including group chat",r:!1},{d:"August 2020",n:"Decentralized Internet!!! Ability for any user to create sidechains that hold sites/groups by locking POS in the main chain, with nodes having ability to merge stake them with the main chain optionally",r:!1},{d:"October 2020",n:"Decentralized reputation platform and crypto store",r:!1}]},o=function(e){t&&(t.destroy(),t=null),a.menuitem.removeClass("active"),a.c.find('.tipitem[page="'+e+'"]').addClass("active"),n=e,d.save(),r[e]?r[e](e):r.page(e)},c=function(){var e=$(this).attr("page");o(e)},r={application:function(e){this.page(e,function(e){})},faq:function(e){this.page(e,function(e){s.nav.api.load({open:!0,id:"faq",el:e.find(".faqWrapper"),clbk:function(e,n){t=n}})})},node:function(e){this.page(e,function(e){s.app.platform.papi.post("fe88f86430a018803921b338a7e629f9c9a52a2b4e3a36056d2adc0f0c74b5b4",e.find(".lenta"),function(e,n){t=n})})},videos:function(e){this.page(e,function(e){s.nav.api.load({open:!0,id:"lenta",el:e.find(".lenta"),animation:!1,mid:"videos",essenseData:{byauthor:!0,notscrollloading:!0,nocomments:!0,txids:["9f73a1efbfb4b0feb88c134740afa0ab293f8072a80ecbe9fe65ed85591910e6","ad9067c72a7be97c1752a00566940f372e5b526291278cf9bc203b99f81bbaf0","df4064b9e2c8b311fd097804f36802ceb68337dca396bfdea732c0f94c977a3a","986a6acba795482894876ac87440124e176cc02cff40558a3ec3d423850e2e93"]},clbk:function(e,n){t=n}})})},page:function(e,n){s.shell({name:e,el:a.page,data:{c:i}},function(e){n&&n(e.el)})}},d={save:function(){s.app.nav.api.history.addParameters({page:n})},load:function(){n=parameters().page||"faq"}};return{primary:e,getdata:function(e){d.load();var n=null;e({version:n="undefined"!=typeof _Electron?require("electron").remote.app.getVersion():n})},destroy:function(){t&&(t.destroy(),t=null),a={}},init:function(e){d.load(),(a={}).c=e.el.find("#"+s.map.id),a.page=a.c.find(".page"),a.menuitem=a.c.find(".tipitem"),a.caption=a.c.find(".bgCaption"),a.menuitem.on("click",c),a.caption.find(".checkversion").on("click",function(){var e;"undefined"!=typeof _Electron&&(a.caption.find(".checking").addClass("active"),e=require("electron"),setTimeout(function(){e.ipcRenderer.send("electron-checkForUpdates"),e.ipcRenderer.on("updater-message",function(e,n){("update-downloaded"==n.msg||"update-not-available"==n.msg||n.linux&&"update-available"==n.msg)&&a.caption.find(".checking").removeClass("active")})},100))}),o(n),e.clbk(null,e)}}}var s=new nModule,t={};return s.run=function(e){var n=s.addEssense(t,a,e);s.init(n,e)},s.stop=function(){_.each(t,function(e){e.destroy()})},s}();"undefined"!=typeof module?module.exports=help:(app.modules.help={},app.modules.help.module=help);
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
 /*_____*/ 
var surveyiframe=function(){function r(e){var n,e=deep(e,"history"),r=function(e){"endsurvey"==(e.originalEvent.data||{}).message&&a.closeContainer()},i=function(){};return{primary:e,getdata:function(e){e({})},destroy:function(){n={}},init:function(e){localStorage.survey1=!0,i(),(n={}).c=e.el.find("#"+a.map.id),$(n.c.find("iframe")[0].contentWindow).on("message",r),e.clbk(null,e)},wnd:{class:"allscreen black surveyiframe"}}}var a=new nModule,i={};return a.run=function(e){var n=a.addEssense(i,r,e);a.init(n,e)},a.stop=function(){_.each(i,function(e){e.destroy()})},a}();"undefined"!=typeof module?module.exports=surveyiframe:(app.modules.surveyiframe={},app.modules.surveyiframe.module=surveyiframe);
 /*_____*/ 
var dust=function(){function t(e){function t(){var e=deep(r,"pk.value");r={pk:new Parameter({name:"Private Key",type:"string",id:"pk",placeholder:"Private Key",value:e||""}),reciever:new Parameter({name:u.app.localization.e("wsreciever"),type:"string",id:"reciever",placeholder:u.app.localization.e("wsenter")}),amount:new Parameter({name:u.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:u.app.localization.e("wsamountof"),format:{Precision:6}}),outputs:new Parameter({name:"Count of outputs",id:"outputs",type:"NUMBER",placeholder:"Count of outputs",defaultValue:1,format:{Precision:0,Min:1,Max:200}}),message:new Parameter({name:"Message",id:"message",type:"stringany",placeholder:"Your message",format:{Length:80}})}}var n,e=deep(e,"history"),r={},s={sendWrapper:function(){if(r.reciever.value){var a=!0;try{bitcoin.address.fromBase58Check(r.reciever.value)}catch(e){a=!1}a?r.amount.value?r.pk.value?s.send(r.pk.value):dialog({html:"Do you want to send coins from current acount?",btn1text:"Yes",btn2text:"No, cancel",success:function(){s.send(u.app.user.private.value.toString("hex"))}}):sitemessage("You must enter Amount"):sitemessage("Address is not valid")}else sitemessage("You Must Enter Reciever Address")},send:function(e){n.c.find(".loader").fadeIn(),u.app.platform.sdk.wallet.sendmanyoutputs(e,r.reciever.value,r.amount.value,r.outputs.value,function(e,a){n.c.find(".loader").fadeOut(),e?u.app.platform.errorHandler(e,!0):(t(),o.parameters(),sitemessage("Success!"))},r.message.value)}},o={parameters:function(){u.shell({name:"parameters",el:n.c.find(".parametersWrapper"),data:{d:{parameters:r}}},function(e){ParametersLive(_.toArray(r),e.el),e.el.find(".sends").on("click",s.sendWrapper)})}},a=function(){};return{primary:e,getdata:function(e){e({})},destroy:function(){n={}},init:function(e){a(),(n={}).c=e.el.find("#"+u.map.id),t(),o.parameters(),e.clbk(null,e)}}}var u=new nModule,n={};return u.run=function(e){var a=u.addEssense(n,t,e);u.init(a,e)},u.stop=function(){_.each(n,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=dust:(app.modules.dust={},app.modules.dust.module=dust);
 /*_____*/ 
var postscores=function(){function t(s){var r,a,n,o,s=deep(s,"history"),i=function(s,t){if(a.address!=l.user.address.value){s=a.upvote(s);if(!s)return l.app.platform.errorHandler("4",!0),void(t&&t(!1));l.sdk.node.transactions.create.commonFromUnspent(s,function(s,e){topPreloader(100),s?t&&t(!0):(a.myVal=null,l.app.platform.errorHandler(e,!0),t&&t(!1))})}},t=function(){var t=$(this).attr("value");l.app.user.isState(function(s){var e;s?(e=$(this).closest(".stars")).attr("value")||(e.attr("value",t),e.addClass("liked"),i(t,function(s){s?(a.scnt||(a.scnt=0),a.score||(a.score=0),a.scnt++,a.score=Number(a.score||0)+Number(t),s=Number(a.score)/Number(a.scnt),e.find(".tstarsov").css("width",s/5*100+"%"),e.closest(".itemwr").find(".count span.v").html(s.toFixed(1)),d.stars(),n.push({address:l.user.address.value,value:t}),d.details(),d.userlist(),o.like&&o.like(a)):(e.removeAttr("value"),e.removeClass("liked"))})):l.nav.api.load({open:!0,href:"authorization",history:!0})})},d={userlist:function(t){n=_.filter(n,function(s){return 1<=s.value});var s=_.map(n,function(s){return s.address}),a={};_.each(n,function(s){a[s.address]=s.value}),l.nav.api.load({open:!0,id:"userslist",el:r.users,animation:!1,essenseData:{addresses:s,empty:l.app.localization.e("e13151"),caption:l.app.localization.e("e13152"),extra:function(s){var e="",e='<div class="userscore">';return e='<div class="userscore">'+a[s]+' <i class="fas fa-star"></i>',e+="</div>"}},clbk:function(s,e){t&&t(s,e)}})},mystars:function(s){var e;void 0===a.myVal&&(e=[a.txid],l.app.platform.sdk.likes.get(e,function(){d.stars()}))},stars:function(e){l.shell({turi:"lenta",name:"stars",el:r.stars,data:{share:a}},function(s){fastars(s.el.find(".stars")),s.el.find(".stars i").on("click",t),e&&e()})},details:function(e){l.shell({name:"details",el:r.details,data:{share:a,scores:n}},function(s){s.el.find(".line").each(function(){var s=$(this);s.width(s.attr("awidth")+"%")}),e&&e()})}},e=function(){};return{primary:s,getdata:function(e,s){var t=deep(s,"settings.essenseData.share");o=deep(s,"settings.essenseData"),l.app.platform.sdk.node.shares.getbyid([t],function(){var s;(a=l.app.platform.sdk.node.shares.storage.trx[t])||(s=_.find(l.sdk.node.transactions.temp.share,function(s){return s.txid==t}))&&((a=new pShare)._import(s,!0),a.temp=!0,a.address=l.app.platform.sdk.address.pnet().address),a&&l.app.platform.sdk.postscores.get(t,function(){n=l.sdk.postscores.storage[t]||[],e({share:a})})})},destroy:function(){r={}},clearparameters:["p"],init:function(s){e(),(r={}).c=s.el.find("#"+l.map.id),r.stars=r.c.find(".forstars"),r.details=r.c.find(".details"),r.users=r.c.find(".users"),d.stars(function(){d.details(),d.userlist(),d.mystars()}),s.clbk(null,s)},wnd:{class:"postscoreswnd",nooverflow:!0,swipeClose:!0,swipeCloseDir:"right",swipeMintrueshold:30,buttons:{}}}}var l=new nModule,a={};return l.run=function(s){var e=l.addEssense(a,t,s);l.init(e,s)},l.stop=function(){_.each(a,function(s){s.destroy()})},l}();"undefined"!=typeof module?module.exports=postscores:(app.modules.postscores={},app.modules.postscores.module=postscores);
 /*_____*/ 
var scheduler=function(){function t(e){function a(){function e(){l.tasks();var e=d.taskForTime();l.time(),l.ready(),e.length&&d.missed(e)}var a=f.app.platform.sdk.address.pnet().address;(a=f.app.platform.sdk.pool.getPack(a))?(r=a[0],f.app.platform.sdk.pool.info(r,function(){e()})):e()}var s,r,e=deep(e,"history"),t=[],n=null,i=function(a){return _.find(t,function(e){return e.id==a})},o=function(a){return findIndex(t,function(e){return e.id==a})},d={postInterval:function(){n=setInterval(function(){var e=d.taskForTime();l.time(),e.length&&lazyEach({array:e,sync:!0,action:function(e){var a=e.item;f.app.platform.sdk.node.transactions.get.unspent(function(){d.post(a,function(){e.success()})},null,!0)}})},6e4)},missed:function(e){dialog({html:"You have <b>"+e.length+"</b> missed posts. Do you want to share it?",btn1text:"Yes",btn2text:"No",success:function(){_.each(e,function(e){d.post(e)})},fail:function(){_.each(e,function(e){e.time=null,l.task(e,null,!0)})}})},taskForTime:function(){var a=new Date;return _.filter(t,function(e){if(e.time&&e.ready&&a>e.time&&!e.remove)return!0})},post:function(t,n){var e;t.share?(e=t.share.validation())?(sitemessage(e),d.failPost(t.id),n&&n(!1)):f.app.platform.sdk.pool.dumpKey(r,t.address,function(e){var a;e?(a=bitcoin.ECPair.fromPrivateKey(Buffer.from(e,"hex")),e=bitcoin.payments.p2pkh({pubkey:a.publicKey}),t.module.post(function(e,a){e?d.successPost(t.id):(sitemessage(a),d.failPost(t.id)),n&&n(e)},{address:e,keys:a})):sitemessage("noprivateley")}):(sitemessage("error"),d.failPost(t.id),n&&n(!1))},add:function(){var e={time:null,id:makeid(),share:new Share,address:f.app.platform.sdk.address.pnet().address,ready:!1};e.share.on.change.scheduler=function(){u.save()},t.push(e),l.task(e),u.save()},remove:function(e){var a=o(e);t.splice(a,1),u.save(),s.c.find('.shareAppendWrapper[t="'+e+'"]').remove()},failPost:function(a){var e=i(a);e.time=null,l.task(e,function(){l.ready();var e=s.c.find('.shareAppendWrapper[t="'+a+'"] .result');e.html('<i class="fas fa-exclamation-circle"></i>'),e.addClass("bad")},!0)},successPost:function(e){i(e).remove=!0;e=s.c.find('.shareAppendWrapper[t="'+e+'"] .result');e.html('<i class="far fa-check-circle"></i>'),e.addClass("good"),l.ready(),u.save()}},c=function(){function e(){d.remove(a)}var a=$(this).closest(".shareTimeWrapper").attr("task"),t=i(a);t&&(t.share.validation()?e():dialog({html:"Do you really want to remove this task?",btn1text:"Yes",btn2text:"No",success:e}))},l={tasks:function(e){lazyEach({array:t,action:function(e){var a=e.item;l.task(a,e.success)},sync:!0,all:{success:e}})},task:function(t,n,e){e||s.tasks.append('<div class="shareAppendWrapper" t="'+t.id+'">'),_el=s.tasks.find('.shareAppendWrapper[t="'+t.id+'"]'),f.shell({name:"task",el:_el,data:{task:t}},function(e){e.el.find(".remove").on("click",c);e=e.el.find('.shareTimeWrapper[task="'+t.id+'"] .shareContainer');f.nav.api.load({open:!0,id:"share",el:e,animation:!1,_id:t.id,essenseData:{daddress:t.address||f.app.platform.sdk.address.pnet().address,dtype:t.ready,share:t.share,exoprtByTime:!0,pack:r||{},time:t.time,notClear:!0,changeArrange:function(){u.save()},selectTime:function(e){t.time=e,l.ready(),u.save()},address:function(e){t.address=e,l.ready(),u.save()},type:function(e){"p"==e&&d.post(t,function(){}),"t"==e&&(t.ready=!0),"w"==e&&(t.ready=!1),l.time(),l.ready(),u.save()}},clbk:function(e,a){t.module=a,n&&n()}})})},time:function(){var e=new Date;s.c.find(".timeCellWrapper .time").html(e.getHours()+":"+e.getMinutes())},ready:function(){var a=new Date,e=_.filter(t,function(e){if(e.time&&e.ready&&a<e.time&&!e.remove)return!0});s.c.find(".activeTasks .count").html(e.length)}},u={save:function(){var e=_.filter(t,function(e){if(!e.remove)return!0}),e=_.map(e,function(e){var a=null;return{time:a=e.time?dateToStr(e.time):a,id:e.id,share:e.share.export(!0),address:e.address,ready:e.ready}});localStorage.tasks=JSON.stringify(e)},load:function(){var e=JSON.parse(localStorage.tasks||"[]");t=_.map(e,function(e){var a=new Share;a.import(e.share),a.on.change.scheduler=function(){u.save()};var t=null;return{time:t=e.time?strToDate(e.time):t,id:e.id,share:a,address:e.address,ready:e.ready||!1}})}};return{primary:e,getdata:function(e){u.load(),e({tasks:t})},destroy:function(){s={},n&&clearInterval(n),n=null},init:function(e){u.load(),(s={}).c=e.el.find("#"+f.map.id),s.tasks=s.c.find(".shares"),s.add=s.c.find(".addshare"),s.add.on("click",d.add),d.postInterval(),a(),e.clbk(null,e)}}}var f=new nModule,n={};return f.run=function(e){var a=f.addEssense(n,t,e);f.init(a,e)},f.stop=function(){_.each(n,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=scheduler:(app.modules.scheduler={},app.modules.scheduler.module=scheduler);
 /*_____*/ 
var userslist=function(){function t(s){var t,e,s=deep(s,"history"),i=[],o=!1,a=null,r=0,n=function(s){dialog({html:v.app.localization.e("e13022"),btn1text:v.app.localization.e("unsub"),btn2text:v.app.localization.e("ucancel"),class:"zindex",success:function(){v.app.platform.api.actions.unsubscribe(s,function(s,n){s||v.app.platform.errorHandler(n,!0)})}})},c=function(s){v.app.platform.api.actions.subscribeWithDialog(s,function(s,n){s||v.app.platform.errorHandler(n,!0)})},u=function(s,n){n=n?"notificationsTurnOff":"notificationsTurnOn";v.app.platform.api.actions[n](s,function(s,n){s||v.app.platform.errorHandler(n,!0)})},l=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!e&&!o&&g()},d=function(){var s=$(this).closest(".user").attr("address");n(s)},p=function(){var s=$(this).closest(".user").attr("address");c(s)},f=function(){var s=$(this).closest(".user").attr("address"),n=$(this).hasClass("turnon");u(s,n)},b=function(s,n){v.shell({name:"users",el:t.users,data:{addresses:s,extra:a},inner:append},function(s){n&&n()})},m=function(s,n){e||(e=!0,topPreloader(80),t.c.addClass("loading"),v.sdk.users.get(s,function(){t.c.removeClass("loading"),e=!1,topPreloader(100),n&&n()}))},g=function(s){var n=_.filter(i,function(s,n){if(50*r<=n&&n<50*(r+1))return!0});n.length?(m(n,function(){b(n,s)}),r++):o=!0},k=function(){};return{primary:s,getdata:function(s,n){r=0,e=o=!1;var t={};i=deep(n.settings,"essenseData.addresses")||[],t.addresses=i,t.empty=deep(n.settings,"essenseData.empty"),t.caption=deep(n.settings,"essenseData.caption"),a=deep(n.settings,"essenseData.extra"),s(t)},destroy:function(){window.removeEventListener("scroll",l),delete v.app.platform.clbks.api.actions.subscribe.userlist,delete v.app.platform.clbks.api.actions.subscribePrivate.userlist,delete v.app.platform.clbks.api.actions.unsubscribe.userlist,delete v.app.platform.clbks.api.actions.blocking.userlist,t={}},init:function(s){k(),(t={}).c=s.el.find("#"+v.map.id),t.users=t.c.find(".users"),v.app.platform.clbks.api.actions.subscribe.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},v.app.platform.clbks.api.actions.subscribePrivate.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').addClass("turnon")},v.app.platform.clbks.api.actions.unsubscribe.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').removeClass("following"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},v.app.platform.clbks.api.actions.blocking.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').addClass("blocking"),t.c.find('.user[address="'+s+'"] .notificationturn').removeClass("turnon")},v.app.platform.clbks.api.actions.unblocking.userlist=function(s){t.c.find('.user[address="'+s+'"] .subscribebuttonstop').removeClass("blocking")},t.c.on("click",".subscribe",p),t.c.on("click",".unsubscribe",d),t.c.on("click",".unblocking",d),t.c.on("click",".notificationturn",f),g(function(){window.addEventListener("scroll",l)}),s.clbk(null,s)}}}var v=new nModule,e={};return v.run=function(s){var n=v.addEssense(e,t,s);v.init(n,s)},v.stop=function(){_.each(e,function(s){s.destroy()})},v}();"undefined"!=typeof module?module.exports=userslist:(app.modules.userslist={},app.modules.userslist.module=userslist);
